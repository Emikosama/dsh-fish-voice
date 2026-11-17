function voiceInputText(event) {
  const data = event.type === 'user/message' && event.surfaceOp === 'append' ? event.data : null
  if (data?.source?.kind !== 'whale-ear' || !Array.isArray(data.content)) return ''
  return data.content.filter(block => block.type === 'text' && typeof block.text === 'string').map(block => block.text).join('\n')
}

/** A local title hint for an already verified voice root without a native title. */
export async function readVoiceTitleHint(persistence, rootId, createdAt, signal) {
  if (typeof persistence?.open !== 'function') return null
  const handle = await persistence.open(rootId, 'read', { signal })
  try {
    const header = handle.header
    if (header?.id !== rootId || header.createdAt !== createdAt || header.parentSession !== undefined || header.origin === 'subagent' || header.isSeeded === true) return null
    const { events } = await handle.read(0, 96, { signal })
    for (const event of events) {
      const text = voiceInputText(event).replace(/[\u0000-\u001f\u007f\s]+/gu, ' ').trim()
      if (text) {
        const chars = Array.from(text.slice(0, 192))
        return chars.slice(0, 38).join('') + (chars.length > 38 ? '…' : '')
      }
    }
    return null
  } finally { await handle.close() }
}

/** Read only the already-persisted native voice root. No new transcript store. */
export async function readNativeVoiceHistory({ persistence, rootSessionId, generation, assertCurrent, cursor, signal }) {
  assertCurrent(); signal?.throwIfAborted()
  let boundary
  if(cursor!==undefined){
    if(typeof cursor!=='string'||!/^\d+:\d+$/.test(cursor))throw new Error('记录页码无效')
    const [stamp,offset]=cursor.split(':').map(Number)
    if(stamp!==generation||!Number.isSafeInteger(offset)||offset<0)throw new Error('记录已改变，请重新打开')
    boundary=offset
  }
  const handle=await persistence.open(rootSessionId,'read',{signal})
  try {
    assertCurrent()
    if(handle.header?.id!==rootSessionId||handle.header.parentSession!==undefined||handle.header.isSeeded===true||handle.header.origin==='subagent')throw new Error('语音记录来源无效')
    const read=async(offset,length)=>{assertCurrent();signal?.throwIfAborted();const result=await handle.read(offset,length,{signal});assertCurrent();signal?.throwIfAborted();if(!Array.isArray(result?.events)||result.events.length>length||result.events.some((event,index)=>event.seq!==offset+index))throw new Error('宿主记录分页无效');return result.events}
    // Native stat's eventCount is optional (JSONL may only expose byte size).
    // Probe single events, then binary search the end without copying a full log.
    if(boundary===undefined){
      let low=0,high=1
      while((await read(high-1,1)).length){low=high;high*=2;if(!Number.isSafeInteger(high))throw new Error('宿主记录长度无效')}
      while(low<high){const mid=Math.floor((low+high)/2);if((await read(mid,1)).length)low=mid+1;else high=mid}
      boundary=low
    }
    const start=Math.max(0,boundary-100), events=await read(start,boundary-start), items=[]
    for(const event of events){
      const data=event.data
      const text=voiceInputText(event)
      if(text.trim()){
        items.push({id:data.id,role:'user',text:text.slice(0,8000),state:'delivered',at:event.time})
      }else if(event.type==='tool/call'&&['speak','whale_voice_speak'].includes(data?.name)&&typeof data.arguments==='string'&&data.arguments.length<=16384){
        let args;try{args=JSON.parse(data.arguments)}catch{continue}
        if(typeof args?.text==='string'&&args.text.trim()&&args.text.length<=8000)items.push({id:`tool:${data.callId}`,role:'assistant',text:args.text.trim(),state:'speech-requested',at:event.time})
      }
    }
    // A call itself is evidence of requested speech, never acoustic playback.
    // Only results in the current bounded event page refine that state.
    for(const event of events)if(event.type==='tool/result'){
      const row=items.find(item=>item.id===`tool:${event.data?.message?.toolCallId}`)
      if(row){const data=event.data;row.state=data.message.isError?(['ABORTED','ABORTED_BEFORE_DISPATCH'].includes(data.error?.code)?'interrupted':'speech-failed'):'reply'}
    }
    assertCurrent()
    return {rootSessionId,generation,revision:boundary,scope:'voice-session',items,nextCursor:start>0?`${generation}:${start}`:null,truncated:false}
  } finally {await handle.close()}
}
