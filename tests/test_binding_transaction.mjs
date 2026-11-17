import test from 'node:test'
import assert from 'node:assert/strict'
import { applyBindingTransaction } from '../voice-binding-transaction.mjs'
function fixture({active=true,failAt=null,status='prepared',abortFails=false}={}) {
 const calls=[];let saved=false
 return {calls,get saved(){return saved},transaction:{prepare(){calls.push('prepare');return{active,expectedSessionId:'owner',expectedSessionEpoch:'epoch',pttMouse:1,pttKeyboard:null}},assertCurrent(){calls.push('fence')},persist(){calls.push('persist');saved=true},rollback(){calls.push('rollback');saved=false}},async rpc(op,args){calls.push(op);if(op===failAt)throw Error('lost reply');if(op==='bindings-status')return{...args,phase:status,confirmed:true};if(op==='bindings-abort'&&abortFails)throw Error('old hook stuck');return{...args,phase:({'bindings-prepare':'prepared','bindings-commit':'committed','bindings-abort':'aborted'})[op],confirmed:true}}}
}
test('active binding transaction neither disables nor replaces the voice grant',async()=>{const f=fixture();await applyBindingTransaction(f);assert.deepEqual(f.calls,['prepare','bindings-prepare','fence','persist','bindings-commit']);assert.equal(f.saved,true)})
test('inactive saves without starting any helper',async()=>{const f=fixture({active:false});await applyBindingTransaction(f);assert.deepEqual(f.calls,['prepare','persist'])})
test('failed commit rolls back only after checking its correlated receipt',async()=>{const f=fixture({failAt:'bindings-commit'});await assert.rejects(applyBindingTransaction(f),/lost reply/);assert.equal(f.saved,false);assert.deepEqual(f.calls.slice(-3),['bindings-status','rollback','bindings-abort'])})
test('lost successful commit is reconciled, never rolled back blindly',async()=>{const f=fixture({failAt:'bindings-commit',status:'committed'});await applyBindingTransaction(f);assert.equal(f.saved,true);assert.equal(f.calls.includes('rollback'),false)})
test('unknown receipt preserves persisted configuration for recovery',async()=>{const f=fixture({failAt:'bindings-commit',status:'unknown'});await assert.rejects(applyBindingTransaction(f),/无法确认/);assert.equal(f.saved,true);assert.equal(f.calls.includes('rollback'),false)})
test('unconfirmed rollback is surfaced fail closed',async()=>{const f=fixture({failAt:'bindings-commit',abortFails:true});await assert.rejects(applyBindingTransaction(f),/PTT 已保持停用/)} )
test('CAS or session fence failure aborts prepared hook without persisting',async()=>{const f=fixture();f.transaction.assertCurrent=()=>{throw Error('stale session')};await assert.rejects(applyBindingTransaction(f),/stale session/);assert.equal(f.saved,false);assert.ok(f.calls.includes('bindings-abort'))})
test('cancel before any prepare sends no binding changes',async()=>{const f=fixture();const c=new AbortController();c.abort();await assert.rejects(applyBindingTransaction({...f,signal:c.signal}));assert.equal(f.saved,false)})
