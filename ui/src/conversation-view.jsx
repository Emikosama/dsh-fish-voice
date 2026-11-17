import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Button, Input } from '@deepseek-ai/dsh-client-ui-primitives'
import { Icon } from './icons.jsx'
import { mergeConversationItems, recentTurns, nearConversationBottom } from './conversation-view.mjs'
import css from './panel.module.css'

function AssistantName({name, save, t}) {
  const [editing,setEditing] = useState(false), [draft,setDraft] = useState(name)
  const composing = useRef(false), input = useRef(null), trigger = useRef(null)
  const restoreFocus = useRef(false)
  useLayoutEffect(() => {
    if (editing) {
      input.current?.focus({ preventScroll: true })
      input.current?.select()
    } else if (restoreFocus.current) {
      restoreFocus.current = false
      trigger.current?.focus({ preventScroll: true })
    }
  }, [editing])
  const cancel=()=>{setEditing(false);setDraft(name)}
  const commit=()=>{const value=draft.trim();if(value && value.length<=40){save?.(value);restoreFocus.current=true;setEditing(false)}}
  return editing ? <Input ref={input} className={css.assistantNameInput} aria-label={t('assistantName')} value={draft} maxLength={40} data-no-drag
    onChange={event=>setDraft(event.target.value)} onCompositionStart={()=>{composing.current=true}} onCompositionEnd={()=>{composing.current=false}}
    onBlur={cancel} onKeyDown={event=>{
      event.stopPropagation()
      if (composing.current || event.nativeEvent.isComposing) return
      if (event.key === 'Escape') { event.preventDefault(); restoreFocus.current=true; cancel() }
      if (event.key === 'Enter') { event.preventDefault(); commit() }
    }}/>
    : <button ref={trigger} type="button" className={css.assistantName} data-no-drag title={t('renameAssistant')} onClick={()=>{setDraft(name);setEditing(true)}}>{name}</button>
}

/** A stable, local scroll owner: updates never steal a reader's position. */
export function ConversationView({conversation, history, historyLoading, historyError, historyRetryCursor, loadHistory, assistantName, setAssistantName, close, t}) {
  const [all,setAll] = useState(false), [unread,setUnread] = useState(0)
  const list=useRef(null), following=useRef(true), previous=useRef(null), anchor=useRef(null)
  const root=conversation.rootSessionId
  const combined=mergeConversationItems(history?.rootSessionId===root ? history.items : [],conversation.items)
  const heldStart=!following.current&&previous.current?.firstId
  const heldIndex=heldStart?combined.findIndex(row=>row.id===heldStart):-1
  const items=all ? combined : heldIndex>=0 ? combined.slice(heldIndex) : recentTurns(combined)
  const remember=()=>{
    const node=list.current;if(!node)return
    const box=node.getBoundingClientRect(), row=[...node.querySelectorAll('[data-message-id]')].find(el=>el.getBoundingClientRect().bottom>=box.top)
    anchor.current=row ? {id:row.dataset.messageId,offset:row.getBoundingClientRect().top-box.top} : null
  }
  const scrollToLatest=()=>{const node=list.current;if(node)node.scrollTop=node.scrollHeight;following.current=true;setUnread(0);remember()}
  const needsRecentPage=!all && combined.filter(row=>row.role==='user').length<10 && Boolean(history?.nextCursor)
  useEffect(()=>{if(needsRecentPage&&!historyLoading&&!historyError)void loadHistory?.(history.nextCursor)},[needsRecentPage,history?.nextCursor,historyLoading,historyError,root])
  useLayoutEffect(()=>{
    const node=list.current;if(!node)return
    const prior=previous.current
    if(!prior||prior.root!==root){following.current=true;setUnread(0)}
    if(following.current)node.scrollTop=node.scrollHeight
    else {
      const saved=anchor.current, row=saved&&[...node.querySelectorAll('[data-message-id]')].find(el=>el.dataset.messageId===saved.id)
      if(row)node.scrollTop+=row.getBoundingClientRect().top-node.getBoundingClientRect().top-saved.offset
      else if(prior)node.scrollTop=Math.min(prior.top,node.scrollHeight-node.clientHeight)
      if(prior){const newer=conversation.items.filter(row=>row.at>=prior.lastAt&&!prior.ids.has(row.id)).length;if(newer)setUnread(value=>value+newer)}
    }
    previous.current={root,firstId:items[0]?.id,top:node.scrollTop,lastAt:Math.max(0,...combined.map(row=>row.at)),ids:new Set(combined.map(row=>row.id))}
    remember()
  },[conversation,history,all,unread])
  return <section className={css.quickConversation} data-dropdown="conversation" data-no-drag role="region" aria-label={t('recentConversation')} onKeyDown={event=>{if(event.key==='Escape'){event.stopPropagation();close()}}}>
    <div className={css.conversationHeader}><strong>{t(all?'allRecords':'recentTenTurns')}</strong><div>
      <button type="button" onClick={()=>{if(all){following.current=true;anchor.current=null;previous.current=null;setUnread(0)}else remember();setAll(value=>!value)}}>{t(all?'collapseToTen':'showAllRecords')}</button>
      <Button className={css.iconButton} aria-label={t('close')} title={t('collapseConversation')} onClick={close}><Icon name="up"/></Button>
    </div></div>
    {all&&<p className={css.historyScope}>{t('currentVoiceRecords')}{history?.truncated?' · '+t('historyTruncated'):''}</p>}
    <div ref={list} className={css.recentMessages} data-conversation-messages tabIndex={0} aria-label={t('conversationMessages')}
      onWheel={event=>{if(event.deltaY<0)following.current=false}}
      onScroll={()=>{const node=list.current;following.current=nearConversationBottom(node);if(following.current)setUnread(0);if(previous.current)previous.current.top=node.scrollTop;remember()}}>
      {all&&history?.nextCursor&&<button className={css.loadHistory} disabled={historyLoading} onClick={()=>{remember();void loadHistory?.(history.nextCursor)}}>{t(historyLoading?'readingHistory':'loadEarlier')}</button>}
      {historyError&&<button className={css.loadHistory} disabled={historyLoading} onClick={()=>void loadHistory?.(historyRetryCursor??undefined)}>{t('retryHistory')}</button>}
      {items.map(item=><div key={item.id} data-message-id={item.id} data-role={item.role} className={css.message}>
        <div className={css.messageName}>{item.role==='user'?<span>{t('you')}</span>:<AssistantName name={assistantName} save={setAssistantName} t={t}/>}</div>
        <p>{item.text}</p>{['speech-failed','interrupted'].includes(item.state)&&<small>{t(item.state==='speech-failed'?'speechFailed':'speechInterrupted')}</small>}
      </div>)}
      {!items.length&&<p className={css.hint}>{t(historyLoading||needsRecentPage?'readingHistory':'noConversation')}</p>}
    </div>
    {unread>0&&<button className={css.newMessages} onClick={scrollToLatest}><Icon name="down"/>{unread} {t('newMessages')}</button>}
  </section>
}
