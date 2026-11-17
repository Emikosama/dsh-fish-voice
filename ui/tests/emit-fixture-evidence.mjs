/** Emergency retrieval of synthetic screenshots only, when Actions artifact storage is full. */
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
const names=['01-microphone-off.png','02-microphone-on.png','03-all-records-scrolled.png','04-capsule-listening.png','05-narrow-off.png','failure.png','report.json']
for(const name of names){
 let bytes;try{bytes=await readFile(new URL(`../test-results/chat/${name}`,import.meta.url))}catch(error){if(error.code==='ENOENT')continue;throw error}
 if(bytes.length>512*1024)throw Error(`Synthetic fixture evidence exceeds 512KiB: ${name}`)
 const encoded=bytes.toString('base64'),sha256=createHash('sha256').update(bytes).digest('hex'),chunks=Math.ceil(encoded.length/8192)
 for(let index=0;index<chunks;index++)console.log('WHALE_SYNTHETIC_EVIDENCE '+JSON.stringify({name,index,chunks,sha256,base64:encoded.slice(index*8192,(index+1)*8192)}))
}
