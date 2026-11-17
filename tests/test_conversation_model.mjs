import test from 'node:test'
import assert from 'node:assert/strict'
import {conversationModels, assertConversationModel,validateConversationModel} from '../voice-conversation-model.mjs'
const llm={listProviders:()=>[{id:'real',name:'Real',secret:'not-projected'}],listModels:async()=>[{provider:'real',id:'model',name:'Model',apiKey:'not-projected'}]}
test('catalog uses registered adapters and projects only bounded labels',async()=>{
 assert.deepEqual(await conversationModels(llm),{providers:[{id:'real',name:'Real',models:[{id:'model',name:'Model'}]}]})
 await assertConversationModel(llm,{mode:'manual',provider:'real',model:'model'})
 await assert.rejects(assertConversationModel(llm,{mode:'manual',provider:'real',model:'missing'}))
 await assert.rejects(conversationModels({}))
 await assert.rejects(conversationModels({...llm,listModels:async()=>[{provider:'other',id:'x',name:'X'}]}))
 assert.throws(()=>validateConversationModel({mode:'auto',provider:'real',model:null}))
})
