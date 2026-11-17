import test from 'node:test'
import assert from 'node:assert/strict'
import { createFloatingGeometry } from '../src/geometry.mjs'

function fixture() {
  const calls = [], captured = new Set()
  const element = { style: {}, dataset: {}, width:320, height:304, closest:()=>null,
    getBoundingClientRect(){return {width:this.width,height:this.height}},
    hasAttribute(name){return name==='data-collapsed'&&this.dataset.collapsed!==undefined},
    setPointerCapture(id){captured.add(id)},hasPointerCapture:id=>captured.has(id),releasePointerCapture(id){captured.delete(id)} }
  const win={innerWidth:1000,innerHeight:800,getComputedStyle:()=>({getPropertyValue:()=> '20'}),addEventListener(){},removeEventListener(){},ResizeObserver:class{observe(){}disconnect(){}}}
  const geometry=createFloatingGeometry(win)
  let registration
  const service={version:1,register(value){registration=value;calls.push('register');return Object.fromEntries(['beginDrag','move','endDrag','resize','detach','dispose'].map(name=>[name,()=>calls.push(name)]))}}
  const event=(extra={})=>({pointerType:'mouse',button:0,pointerId:1,clientX:700,clientY:500,currentTarget:element,preventDefault(){},...extra})
  return {geometry,element,win,service,calls,captured,event,get registration(){return registration}}
}

test('optional service waits for the live frame and only receives bounded layout data',()=>{
  const f=fixture();f.geometry.useLayoutService(f.service);assert.deepEqual(f.calls,[])
  f.geometry.ref(f.element);assert.deepEqual(f.calls,['register'])
  assert.equal(f.registration.id,'whale-voice')
  const read=f.registration.read();assert.deepEqual(Object.keys(read).sort(),['bounds','collapsed','rect'])
  assert.deepEqual(read.bounds,{x:12,y:32,width:976,height:756})
  assert.equal(read.collapsed,false)
  f.registration.apply({x:-200,y:9999,owner:'ignored'})
  assert.equal(f.element.style.left,'12px');assert.equal(f.element.style.top,'484px')
  f.registration.apply({x:NaN,y:10});assert.equal(f.element.style.left,'12px')
})

test('drag delegates group ownership to the service and commits once on pointer release',()=>{
  const f=fixture();f.geometry.ref(f.element);f.geometry.useLayoutService(f.service);f.calls.length=0
  f.geometry.pointerDown(f.event());f.geometry.pointerMove(f.event({clientX:620}));f.geometry.pointerEnd(f.event({type:'pointerup'}));f.geometry.pointerEnd(f.event({type:'lostpointercapture'}))
  assert.deepEqual(f.calls,['resize','beginDrag','move','endDrag']);assert.equal(f.captured.size,0)
  f.geometry.pointerDown(f.event());f.geometry.pointerEnd(f.event({type:'pointercancel'}));assert.equal(f.calls.at(-1),'detach')
})

test('collapse and resize only notify geometry and docking never changes independent controls',()=>{
  const f=fixture();f.geometry.ref(f.element);f.geometry.useLayoutService(f.service)
  f.element.dataset.collapsed='true';f.element.width=216;f.element.height=44;f.geometry.fit()
  assert.equal(f.calls.at(-1),'resize');assert.equal(f.registration.read().collapsed,true)
  f.registration.onDock({peer:'whale-watch',edge:'bottom',phase:'preview'})
  assert.equal(f.element.dataset.whaleDockPhase,'preview')
  f.registration.onDock({peer:'whale-watch',edge:'left',phase:'docked'})
  assert.equal(f.element.dataset.whaleDockEdge,'left');assert.equal(f.element.dataset.collapsed,'true')
  f.registration.onDock(null);assert.equal(f.element.dataset.whaleDockPhase,undefined);assert.equal(f.element.dataset.collapsed,'true')
  f.registration.onFront(true);assert.equal(f.element.style.zIndex,'901')
  f.registration.onFront(false);assert.equal(f.element.style.zIndex,'900')
  f.geometry.activate();assert.notEqual(f.calls.at(-1),'dispose','older v1 providers without activate remain usable')
  f.geometry.dispose();assert.equal(f.element.style.zIndex,'')
})

test('peer unload restores standalone dragging and stale disposal cannot drop a new service',()=>{
  const f=fixture();f.geometry.ref(f.element)
  const first=f.geometry.useLayoutService(f.service), second=f.geometry.useLayoutService({...f.service})
  const disposals=f.calls.filter(x=>x==='dispose').length;first();assert.equal(f.calls.filter(x=>x==='dispose').length,disposals)
  second();assert.equal(f.calls.at(-1),'dispose')
  const count=f.calls.length;f.geometry.pointerDown(f.event());f.geometry.pointerMove(f.event({clientX:600}));f.geometry.pointerEnd(f.event())
  assert.equal(f.calls.length,count);assert.equal(f.element.style.left,'560px')
  f.geometry.dispose();assert.equal(f.captured.size,0)
})

test('unsupported, malformed or throwing peer layout cannot break the voice frame',()=>{
  const f=fixture();f.geometry.ref(f.element)
  f.geometry.useLayoutService({version:2,register(){throw Error('must not call')}})
  f.geometry.useLayoutService({version:1,register(){throw Error('peer unavailable')}})
  f.geometry.useLayoutService({version:1,register(){return{dispose(){throw Error('disposed')}}}})
  const peer={...f.service,register(value){return {...f.service.register(value),resize(){throw Error('peer failed')}}}}
  f.geometry.useLayoutService(peer);assert.doesNotThrow(()=>f.geometry.fit());assert.equal(f.calls.at(-1),'dispose')
  f.geometry.pointerDown(f.event());f.geometry.pointerMove(f.event({clientX:0}));assert.equal(f.element.style.left,'12px')
})

test('production geometry and the exact watch coordinator dock all four sides and preserve independent collapse',async()=>{
  const {createFloatingLayout}=await import('./fixtures/floating-layout.mjs')
  const f=fixture();f.element.height=200;f.geometry.ref(f.element)
  const service=createFloatingLayout();let peer={x:400,y:300,width:200,height:120},peerFront=false
  const watch=service.register({id:'whale-watch',read:()=>({rect:{...peer},bounds:{x:12,y:32,width:f.win.innerWidth-24,height:f.win.innerHeight-44},collapsed:false}),apply:next=>{peer={...peer,...next}},onFront:value=>{peerFront=value}})
  const remove=f.geometry.useLayoutService(service)
  const move=(x,y)=>{const start={x:parseFloat(f.element.style.left),y:parseFloat(f.element.style.top)};f.geometry.pointerDown(f.event());f.geometry.pointerMove(f.event({clientX:700+x-start.x,clientY:500+y-start.y}));f.geometry.pointerEnd(f.event())}
  const targets={left:[74,300],right:[606,300],top:[400,94],bottom:[400,426]}
  for(const [edge,[x,y]] of Object.entries(targets)){
    watch.detach()
    move(x+(edge==='left'?8:edge==='right'?-8:0),y+(edge==='top'?8:edge==='bottom'?-8:0))
    assert.equal(f.element.dataset.whaleDockEdge,edge);assert.equal(f.element.dataset.whaleDockPhase,'docked')
    assert.equal(parseFloat(f.element.style.left),x);assert.equal(parseFloat(f.element.style.top),y)
  }
  f.element.dataset.collapsed='true';f.element.width=216;f.element.height=44;f.geometry.fit()
  assert.equal(f.element.dataset.whaleDockPhase,'docked');assert.deepEqual(peer,{x:400,y:300,width:200,height:120})
  f.geometry.activate();assert.equal(f.element.style.zIndex,'901');assert.equal(peerFront,false)
  watch.activate();assert.equal(f.element.style.zIndex,'900');assert.equal(peerFront,true)
  remove();assert.equal(f.element.style.zIndex,'');assert.equal(f.element.dataset.whaleDockPhase,undefined);assert.equal(f.element.dataset.collapsed,'true')
  watch.dispose();service.dispose()
})


async function pairedFixture() {
  const {createFloatingLayout}=await import('./fixtures/floating-layout.mjs')
  const f=fixture();f.element.height=200;f.geometry.ref(f.element)
  const service=createFloatingLayout()
  let peer={x:400,y:300,width:200,height:120},peerDock
  const watch=service.register({id:'whale-watch',read:()=>({rect:{...peer},bounds:{x:12,y:32,width:f.win.innerWidth-24,height:f.win.innerHeight-44},collapsed:false}),apply:next=>{peer={...peer,...next}},onDock:value=>{peerDock=value}})
  f.geometry.useLayoutService(service)
  const voice=()=>({x:parseFloat(f.element.style.left),y:parseFloat(f.element.style.top),width:f.element.width,height:f.element.height})
  const voiceMove=(dx,dy,end=true)=>{f.geometry.pointerDown(f.event());f.geometry.pointerMove(f.event({clientX:700+dx,clientY:500+dy}));if(end)f.geometry.pointerEnd(f.event())}
  const watchMove=(dx,dy)=>{watch.beginDrag();peer.x+=dx;peer.y+=dy;watch.move();watch.endDrag()}
  voiceMove(598-voice().x,300-voice().y)
  const assertPair=()=>{assert.equal(f.element.dataset.whaleDockPhase,'docked');assert.equal(peerDock?.phase,'docked');assert.equal(voice().x-peer.x-peer.width,6);assert.equal(voice().y,peer.y)}
  assertPair()
  return {...f,service,watch,voice,voiceMove,watchMove,assertPair,get peer(){return {...peer}},cleanup(){f.geometry.dispose();watch.dispose();service.dispose()}}
}

for(const driver of ['voice','watch']) test(`real geometry keeps both panels together when dragging ${driver}`,async()=>{
  const f=await pairedFixture();const before=f.peer
  f[driver+'Move'](-80,45);f.assertPair()
  assert.equal(f.peer.x,before.x-80);assert.equal(f.peer.y,before.y+45)
  // Repeated drags must start at the coordinator-applied location, not stale CSS.
  f[driver+'Move'](25,-15);f.assertPair();assert.equal(f.peer.x,before.x-55)
  f.cleanup()
})

for(const driver of ['voice','watch']) test(`real geometry clamps the whole pair at viewport edges from ${driver}`,async()=>{
  const f=await pairedFixture()
  f[driver+'Move'](-2000,-2000);f.assertPair();assert.equal(f.peer.x,12);assert.equal(f.peer.y,32)
  f[driver+'Move'](2000,2000);f.assertPair();assert.equal(f.voice().x+f.voice().width,988);assert.equal(f.voice().y+f.voice().height,788)
  f[driver+'Move'](-30,-30);f.assertPair();assert.equal(f.voice().x+f.voice().width,958)
  f.cleanup()
})

test('real geometry resize retains a fitting pair and detaches when the viewport cannot fit it',async()=>{
  const f=await pairedFixture()
  f.element.width=216;f.element.height=44;f.element.dataset.collapsed='true';f.geometry.fit();f.assertPair()
  assert.equal(f.element.dataset.collapsed,'true');assert.equal(f.peer.width,200)
  f.win.innerWidth=600;f.geometry.fit();f.assertPair();assert.ok(f.voice().x+f.voice().width<=588)
  f.win.innerWidth=390;f.geometry.fit();assert.equal(f.element.dataset.whaleDockPhase,undefined)
  assert.ok(f.voice().x>=12&&f.voice().x+f.voice().width<=378);assert.ok(f.peer.x>=12&&f.peer.x+f.peer.width<=378)
  f.cleanup()
})

test('explicit detach separates the pair and peer unload during a drag leaves voice independently usable',async()=>{
  const f=await pairedFixture();f.watch.detach();const before=f.peer
  f.voiceMove(-550,-250);assert.deepEqual(f.peer,before);assert.equal(f.element.dataset.whaleDockPhase,undefined)
  f.voiceMove(598-f.voice().x,300-f.voice().y);f.assertPair()
  f.voiceMove(-20,-20,false);f.assertPair();f.watch.dispose()
  assert.equal(f.element.dataset.whaleDockPhase,undefined)
  f.geometry.pointerMove(f.event({clientX:640,clientY:440}));f.geometry.pointerEnd(f.event())
  assert.equal(f.captured.size,0);const x=f.voice().x;f.voiceMove(-30,0);assert.equal(f.voice().x,x-30)
  f.cleanup()
})

test('cancelling a grouped pointer drag clears capture and restores independent movement',async()=>{
  const f=await pairedFixture();f.voiceMove(-40,20,false);f.assertPair()
  f.geometry.pointerEnd(f.event({type:'pointercancel'}))
  assert.equal(f.captured.size,0);assert.equal(f.element.dataset.whaleDockPhase,undefined)
  const before=f.peer;f.voiceMove(-550,-250);assert.deepEqual(f.peer,before)
  f.cleanup()
})
