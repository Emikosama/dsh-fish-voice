import test from 'node:test'
import assert from 'node:assert/strict'
import {createController} from '../src/controller.mjs'
import {decodeReply} from '../src/protocol.mjs'
const tick=()=>new Promise(resolve=>setImmediate(resolve))
const snapshot=(completed=false,granted=false)=>({schema:1,revision:'r1',completed,granted,usageAgreement:{version:1,accepted:completed,text:[]},blockedOperations:[],revocationUnconfirmed:false,scopes:[{id:'microphone',title:'麦克风',description:'允许主动开麦，不会现在开启',allowed:granted}],modelSources:[],restrictions:['系统提示另行处理']})
const client=extra=>({subscribe(){return()=>{}},...extra})
test('one-click authorization works without a selected session and never starts audio',async()=>{
 let state=snapshot(),writes=0
 const c=createController(()=>{throw Error('No session action')})
 c.attachConversationClient(client({readAuthorization:async()=>state,saveAuthorization:async request=>{assert.deepEqual(request,{revision:'r1',grant:true});writes++;return state=snapshot(true,true)}}))
 await tick();assert.equal(c.getSnapshot().authorizationOpen,true)
 assert.equal(await c.saveAuthorization(true),true);assert.equal(writes,1);assert.equal(c.getSnapshot().authorizationOpen,false)
 c.dispose()
 const restored=createController(()=>{throw Error('No session action')});restored.attachConversationClient(client({readAuthorization:async()=>state}));await tick();assert.equal(restored.getSnapshot().authorizationOpen,false);restored.dispose()
})
test('accepted agreement with revoked permissions is not prompted on every load; permissions remain accessible',async()=>{
 const c=createController();c.attachConversationClient(client({readAuthorization:async()=>snapshot(true,false)}));await tick();assert.equal(c.getSnapshot().authorizationOpen,false)
 await c.openAuthorization();assert.equal(c.getSnapshot().authorizationOpen,true);assert.equal(c.closeAuthorization(),true);assert.equal(c.getSnapshot().authorizationOpen,false);c.dispose()
})
test('lost authorization response is read back once, never replayed',async()=>{
 let state=snapshot(),writes=0,reads=0
 const c=createController();c.attachConversationClient(client({readAuthorization:async()=>{reads++;return state},saveAuthorization:async()=>{writes++;state=snapshot(true,true);throw Error('lost')}}));await tick()
 assert.equal(await c.saveAuthorization(true),true);assert.equal(writes,1);assert.equal(reads,2);assert.equal(c.getSnapshot().authorization.granted,true);c.dispose()
})
test('unconfirmed authorization blocks further submissions until explicit readback',async()=>{
 let writes=0
 const c=createController();c.attachConversationClient(client({readAuthorization:async()=>snapshot(),saveAuthorization:async()=>{writes++;throw Error('lost')}}));await tick()
 assert.equal(await c.saveAuthorization(true),false);assert.equal(c.getSnapshot().authorizationUncertain,true)
 await c.saveAuthorization(true);assert.equal(writes,1);await c.refreshAuthorization();assert.equal(c.getSnapshot().authorizationUncertain,false);c.dispose()
})
test('authorization snapshots reject malformed permission records',()=>{
 for(const v of [{...snapshot(),granted:'yes'},{...snapshot(),scopes:[{id:'microphone',allowed:true}]},{...snapshot(),modelSources:[{modelId:'m',source:'x',licenseUrls:[],licenseNote:3}]}])assert.throws(()=>decodeReply('authorization',v))
})

test('unconfirmed previous revocation is visible after restart',async()=>{const c=createController();c.attachConversationClient(client({readAuthorization:async()=>({...snapshot(true,false),revocationUnconfirmed:true})}));await tick();assert.equal(c.getSnapshot().authorizationOpen,true);assert.equal(c.getSnapshot().authorization.revocationUnconfirmed,true);c.dispose()})

test('reconnect or explicit refresh during authorization cannot leave the write lock stuck',async()=>{
 let state=snapshot(),release,writes=0
 const pending=new Promise(resolve=>release=resolve)
 const c=createController()
 const old=client({readAuthorization:async()=>state,saveAuthorization:async()=>{writes++;await pending;return state=snapshot(true,true)}})
 c.attachConversationClient(old);await tick();const saving=c.saveAuthorization(true)
 c.attachConversationClient(client({readAuthorization:async()=>state,saveAuthorization:async r=>{writes++;return state=snapshot(true,r.grant)}}))
 await c.refreshAuthorization();release();await saving;await tick()
 assert.equal(c.getSnapshot().authorizationBusy,false);assert.equal(c.getSnapshot().authorizationLoading,false)
 assert.equal(c.getSnapshot().authorization.granted,true);assert.equal(writes,1)
 assert.equal(await c.saveAuthorization(false),true);assert.equal(writes,2);c.dispose()
})

test('declining first use closes onboarding without writing or revoking permissions',async()=>{
 let writes=0
 const c=createController(()=>{throw Error('No session action')})
 c.attachConversationClient(client({readAuthorization:async()=>snapshot(),saveAuthorization:async()=>{writes++;throw Error('No authorization write')}}))
 await tick();assert.equal(c.getSnapshot().authorizationOpen,true)
 assert.equal(c.closeAuthorization(),true);assert.equal(c.getSnapshot().authorizationOpen,false)
 await c.refreshAuthorization();assert.equal(c.getSnapshot().authorizationOpen,false)
 assert.equal(c.getSnapshot().authorization.usageAgreement.accepted,false);assert.equal(writes,0)
 await c.openAuthorization();assert.equal(c.getSnapshot().authorizationOpen,true);c.dispose()
})
