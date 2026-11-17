/** Retry only a failed read-only transport mount. Healthy connections never poll. */
export function createConnectionRecovery(connect, { onReady, onError, visible = () => true, schedule = setTimeout, unschedule = clearTimeout } = {}) {
  let disposed=false,pending=false,connected=false,timer=null,attempts=0,current=null
  const pause=()=>{if(timer!==null)unschedule(timer);timer=null}
  const start=async()=>{
    if(disposed||pending||connected||!visible())return
    pause();pending=true
    try{
      const client=await connect()
      if(disposed){await client.dispose();return}
      try{onReady(client)}catch(error){await client.dispose();throw error}
      current=client;connected=true;attempts=0
    }catch(error){
      if(disposed)return
      onError(error);attempts++
      if(visible()){timer=schedule(()=>{timer=null;void start()},Math.min(30000,750*2**Math.min(attempts-1,6)));timer?.unref?.()}
    }finally{pending=false}
  }
  return {
    start,
    visibilityChanged(){if(!visible())pause();else void start()},
    refresh(){void start()},
    dispose(){disposed=true;pause();void current?.dispose()},
  }
}
