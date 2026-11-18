window.__ModuleLoader__.load({id:"dsh-fish-voice",factory:(require)=>{var module={exports:{}};var exports=module.exports;
var Sr=Object.defineProperty;var rp=Object.getOwnPropertyDescriptor;var ip=Object.getOwnPropertyNames;var ap=Object.prototype.hasOwnProperty;var qi=(e,n)=>{for(var t in n)Sr(e,t,{get:n[t],enumerable:!0})},sp=(e,n,t,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let r of ip(n))!ap.call(e,r)&&r!==t&&Sr(e,r,{get:()=>n[r],enumerable:!(o=rp(n,r))||o.enumerable});return e};var lp=e=>sp(Sr({},"__esModule",{value:!0}),e);var mg={};qi(mg,{apply:()=>pg,inject:()=>dg});module.exports=lp(mg);var Ft=require("react");var yn={rail:"_2Wn93a_rail",toggle:"_2Wn93a_toggle",range:"_2Wn93a_range",toggleTrack:"_2Wn93a_toggleTrack",input:"_2Wn93a_input",collapse:"_2Wn93a_collapse",fill:"_2Wn93a_fill",thumb:"_2Wn93a_thumb",collapseInner:"_2Wn93a_collapseInner",text:`._2Wn93a_range {
  vertical-align: middle;
  width: 180px;
  max-width: 100%;
  height: 32px;
  display: inline-block;
  position: relative;
  flex: 180px !important;
  min-width: 80px !important;
  margin: 0 !important;
}

._2Wn93a_rail {
  background: var(--dsw-alias-border-l2, #8791a4);
  pointer-events: none;
  border-radius: 999px;
  height: 6px;
  position: absolute;
  inset: 13px 9px;
  min-width: 0 !important;
  margin: 0 !important;
}

._2Wn93a_fill {
  width: var(--whale-range-position);
  background: var(--dsw-alias-brand-primary, #8ba9e7);
  border-radius: inherit;
  transition: width var(--whale-duration, .2s) var(--whale-ease, ease-out);
  position: absolute;
  inset: 0 auto 0 0;
  min-width: 0 !important;
  margin: 0 !important;
}

._2Wn93a_thumb {
  left: var(--whale-range-position);
  background: var(--dsw-alias-bg-layer-1, #fff);
  border: 2px solid var(--dsw-alias-brand-primary, #8ba9e7);
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  transition: left var(--whale-duration, .2s) var(--whale-ease, ease-out),box-shadow .12s;
  border-radius: 50%;
  position: absolute;
  top: -6px;
  translate: -50%;
  box-shadow: 0 1px 3px #0003;
  min-width: 0 !important;
  margin: 0 !important;
}

._2Wn93a_range ._2Wn93a_input {
  opacity: 0;
  cursor: pointer;
  touch-action: pan-y;
  height: 32px;
  margin: 0;
  position: absolute;
  inset: 0;
  width: 100% !important;
}

._2Wn93a_range:focus-within {
  outline: 2px solid var(--dsw-focus-ring-color, #8ba9e7);
  outline-offset: 2px;
  border-radius: 6px;
}

._2Wn93a_range:hover ._2Wn93a_thumb {
  box-shadow: 0 0 0 4px color-mix(in srgb,var(--dsw-alias-brand-primary, #8ba9e7) 18%,transparent);
}

._2Wn93a_range[data-dragging] :is(._2Wn93a_thumb, ._2Wn93a_fill) {
  transition-duration: 40ms;
  transition-timing-function: linear;
}

._2Wn93a_range[data-disabled], ._2Wn93a_toggle[data-disabled] {
  opacity: .5;
}

._2Wn93a_range[data-disabled] ._2Wn93a_input {
  cursor: not-allowed;
}

._2Wn93a_collapse {
  opacity: 0;
  visibility: hidden;
  grid-template-rows: 0fr;
  transition: grid-template-rows .16s ease-out, opacity .12s ease-out, visibility .16s;
  display: grid;
}

._2Wn93a_collapse[data-open="true"] {
  opacity: 1;
  visibility: visible;
  grid-template-rows: 1fr;
}

._2Wn93a_collapseInner {
  min-height: 0;
  overflow: hidden;
}

._2Wn93a_toggle {
  cursor: pointer;
  align-items: center;
  gap: 8px;
  width: fit-content;
  max-width: 100%;
  font-size: 12px;
  display: flex;
  position: relative;
}

._2Wn93a_toggle > input {
  opacity: 0;
  width: 38px;
  height: 24px;
  margin: 0;
  position: absolute;
}

._2Wn93a_toggleTrack {
  pointer-events: none;
  background: var(--dsw-alias-border-l2, #8791a4);
  width: 36px;
  height: 22px;
  transition: background-color var(--whale-duration, .2s);
  border-radius: 999px;
  flex: none;
  position: relative;
}

._2Wn93a_toggleTrack > span {
  background: var(--dsw-alias-bg-layer-1, #fff);
  width: 16px;
  height: 16px;
  transition: left var(--whale-duration, .2s) var(--whale-ease, ease-out);
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
}

._2Wn93a_toggle > input:checked + ._2Wn93a_toggleTrack {
  background: var(--dsw-alias-brand-primary, #8ba9e7);
}

._2Wn93a_toggle > input:checked + ._2Wn93a_toggleTrack > span {
  left: 17px;
}

._2Wn93a_toggle > input:focus-visible + ._2Wn93a_toggleTrack {
  outline: 2px solid var(--dsw-focus-ring-color, #8ba9e7);
  outline-offset: 2px;
}

[data-motion="firm"] :is(._2Wn93a_range, ._2Wn93a_toggle, ._2Wn93a_collapse) {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="firm"] ._2Wn93a_collapse {
  transition-duration: .1s;
}

[data-motion="off"] :is(._2Wn93a_range, ._2Wn93a_toggle, ._2Wn93a_collapse), [data-motion="off"] :is(._2Wn93a_range, ._2Wn93a_toggle, ._2Wn93a_collapse) * {
  transition: none !important;
  animation: none !important;
}

@media (prefers-reduced-motion: reduce) {
  ._2Wn93a_range, ._2Wn93a_toggle, ._2Wn93a_collapse, ._2Wn93a_range *, ._2Wn93a_toggle *, ._2Wn93a_collapse * {
    transition: none !important;
    animation: none !important;
  }
}

@media (forced-colors: active) {
  ._2Wn93a_range ._2Wn93a_input {
    opacity: 1;
    position: relative;
  }

  ._2Wn93a_rail {
    display: none;
  }

  ._2Wn93a_toggleTrack {
    border: 1px solid buttontext;
  }

  ._2Wn93a_toggleTrack > span {
    background: buttontext;
  }

  ._2Wn93a_toggle > input:checked + ._2Wn93a_toggleTrack {
    background: highlight;
  }
}
`};var on=require("react/jsx-runtime"),Wi=yn.text;function Ut({value:e,defaultValue:n=0,min:t=0,max:o=100,disabled:r,onChange:i,onPointerDown:a,onPointerUp:l,onPointerCancel:c,onLostPointerCapture:u,className:d="",style:m,...f}){let[p,y]=(0,Ft.useState)(n),[v,b]=(0,Ft.useState)(!1);(0,Ft.useEffect)(()=>{r&&b(!1)},[r]);let x=Number(e??p),C=Number(t),B=Number(o),D=B>C&&Number.isFinite(x)?Math.max(0,Math.min(1,(x-C)/(B-C))):0,E=$=>z=>{b(!1),$?.(z)};return(0,on.jsxs)("span",{className:yn.range,"data-whale-motion-range":!0,"data-dragging":v&&!r||void 0,"data-disabled":r||void 0,style:{"--whale-range-position":`${D*100}%`},children:[(0,on.jsxs)("span",{className:yn.rail,"aria-hidden":"true",children:[(0,on.jsx)("span",{className:yn.fill}),(0,on.jsx)("span",{className:yn.thumb})]}),(0,on.jsx)("input",{...f,className:`${yn.input} ${d}`,style:m,type:"range",min:t,max:o,value:e??p,disabled:r,onChange:$=>{r||(e===void 0&&y($.target.value),i?.($))},onPointerDown:$=>{r||b(!0),a?.($)},onPointerUp:E(l),onPointerCancel:E(c),onLostPointerCapture:E(u),onBlur:$=>{b(!1),f.onBlur?.($)}})]})}function Ki({open:e,children:n,className:t="",...o}){return(0,on.jsx)("div",{...o,className:`${yn.collapse} ${t}`,"data-open":!!e,"aria-hidden":!e,inert:e?void 0:"",children:(0,on.jsx)("div",{className:yn.collapseInner,children:n})})}function Lt({label:e,checked:n,disabled:t,onChange:o,...r}){return(0,on.jsxs)("label",{className:yn.toggle,"data-disabled":t||void 0,children:[(0,on.jsx)("input",{...r,type:"checkbox",role:"switch",checked:n,disabled:t,onChange:i=>o?.(i.target.checked)}),(0,on.jsx)("span",{className:yn.toggleTrack,"aria-hidden":"true",children:(0,on.jsx)("span",{})}),(0,on.jsx)("span",{children:e})]})}function Ji(e,{onReady:n,onError:t,visible:o=()=>!0,schedule:r=setTimeout,unschedule:i=clearTimeout}={}){let a=!1,l=!1,c=!1,u=null,d=0,m=null,f=()=>{u!==null&&i(u),u=null},p=async()=>{if(!(a||l||c||!o())){f(),l=!0;try{let y=await e();if(a){await y.dispose();return}try{n(y)}catch(v){throw await y.dispose(),v}m=y,c=!0,d=0}catch(y){if(a)return;t(y),d++,o()&&(u=r(()=>{u=null,p()},Math.min(3e4,750*2**Math.min(d-1,6))),u?.unref?.())}finally{l=!1}}};return{start:p,visibilityChanged(){o()?p():f()},refresh(){p()},dispose(){a=!0,f(),m?.dispose()}}}function Ht(e){return e===null||e&&typeof e=="object"&&!Array.isArray(e)&&Object.keys(e).sort().join(",")==="backend,id,name"&&["winmm","portaudio"].includes(e.backend)&&typeof e.id=="string"&&e.id.length>0&&e.id.length<=1024&&typeof e.name=="string"&&e.name.trim().length>0&&e.name.length<=256&&!/[\u0000-\u001f\u007f]/.test(e.id+e.name)}function Xi(e){return e&&e.schema===1&&["input","output"].every(n=>{let t=e[n];return!t||!["available","empty","unavailable"].includes(t.status)||!Array.isArray(t.items)||t.items.length>128||!(t.reason===null||typeof t.reason=="string"&&t.reason.length<=128)?!1:t.items.every(o=>o!==null&&Ht(o))&&new Set(t.items.map(o=>o.backend+":"+o.id)).size===t.items.length&&(t.status==="available"?t.items.length>0:t.items.length===0)})}var ft=Object.freeze(["ptt","always","wake"]),So=e=>({ptt:"pttMode",always:"alwaysMode",wake:"wakeMode"})[e]??"modeUnknown",Yi=e=>["waiting","listening"].includes(e?.state)&&e?.streamOpen!==!0?"unknown":{disabled:"wakeDisabled",starting:"wakeStarting",waiting:"wakeWaiting",listening:"wakeListening",paused:"wakePaused",error:"wakeError"}[e?.state]??"unknown",Qi=e=>e!==null&&typeof e=="object"&&!Array.isArray(e)&&["disabled","starting","waiting","listening","paused","error"].includes(e.state)&&(e.deadlineAt===null||Number.isFinite(e.deadlineAt)&&e.deadlineAt>=0)&&typeof e.streamOpen=="boolean"&&["asr-after-utterance","acoustic-after-utterance"].includes(e.detection),ea=e=>[...new Set(String(e).split(/[,，\n]/).map(n=>n.trim()).filter(Boolean))],zo=e=>Array.isArray(e)&&e.length>=1&&e.length<=8&&new Set(e.map(n=>typeof n=="string"?n.toLowerCase():n)).size===e.length&&e.every(n=>typeof n=="string"&&n.trim()===n&&n.length>=2&&n.length<=24&&!/[\p{C}]/u.test(n)&&/[\p{L}\p{N}]/u.test(n));function na(e){if(!e||typeof e!="object"||Array.isArray(e)||!["unknown","available","empty","unavailable"].includes(e.status)||!Array.isArray(e.items)||e.items.length>128)return!1;if(e.status==="unknown")return e.observedAt===null&&e.items.length===0;if(!Number.isFinite(e.observedAt)||e.observedAt<0)return!1;if(e.status!=="available")return e.items.length===0;let n=new Set;return e.items.length>0&&e.items.every(t=>!t||typeof t!="object"||Array.isArray(t)||!Number.isSafeInteger(t.index)||t.index<0||n.has(t.index)||typeof t.name!="string"||!t.name.trim()||t.name.length>256||/[\u0000-\u001f\u007f]/.test(t.name)?!1:(n.add(t.index),!0))}var ie={};qi(ie,{BIGINT_FORMAT_RANGES:()=>Io,CONSTANT_CATCH:()=>da,Class:()=>Cr,NUMBER_FORMAT_RANGES:()=>Gt,aborted:()=>xn,allowsEval:()=>Mr,assert:()=>fp,assertEqual:()=>cp,assertIs:()=>pp,assertNever:()=>mp,assertNotEqual:()=>up,assignProp:()=>cn,attachSchema:()=>qt,base64ToUint8Array:()=>ca,base64urlToUint8Array:()=>Mp,cached:()=>bt,captureStackTrace:()=>Co,cleanEnum:()=>Tp,cleanRegex:()=>jt,clone:()=>wn,cloneDef:()=>vp,codePointLength:()=>Wt,constantCatch:()=>pa,createTransparentProxy:()=>kp,defineLazy:()=>Nr,defineLazyInternal:()=>fe,derived:()=>Dp,esc:()=>Er,escapeRegex:()=>On,explicitlyAborted:()=>Rr,extend:()=>Ap,finalizeIssue:()=>_n,floatSafeRemainder:()=>Ir,getElementAtPath:()=>bp,getEnumValues:()=>gt,getLengthableOrigin:()=>Kt,getParsedType:()=>_p,getSizableOrigin:()=>la,hexToUint8Array:()=>Op,hide:()=>To,installLazyProp:()=>Fp,isObject:()=>it,isPlainObject:()=>Wn,issue:()=>wt,joinValues:()=>Ao,jsonStringifyReplacer:()=>vt,members:()=>Vr,merge:()=>Pp,mergeDefs:()=>$n,normalizeParams:()=>te,nullish:()=>Pr,numKeys:()=>xp,objectClone:()=>hp,omit:()=>zp,optionalKeys:()=>Or,own:()=>qn,parsedType:()=>Dr,partial:()=>Ip,pick:()=>Sp,prefixIssues:()=>Rn,primitiveTypes:()=>aa,promiseAllObject:()=>yp,propertyKeyTypes:()=>$r,randomString:()=>wp,rawShape:()=>yt,required:()=>Np,safeExtend:()=>Cp,shallowClone:()=>ia,sizeCaps:()=>Eo,slugify:()=>Tr,stringifyPrimitive:()=>Po,toZod:()=>dp,uint8ArrayToBase64:()=>ua,uint8ArrayToBase64url:()=>$p,uint8ArrayToHex:()=>Rp,unwrapMessage:()=>ht});function cp(e){return e}function up(e){return e}function dp(){return e=>e}function pp(e){}function mp(e){throw new Error("Unexpected value in exhaustive check")}function fp(e){}function gt(e){let n=Object.values(e).filter(o=>typeof o=="number");return Object.entries(e).filter(([o,r])=>n.indexOf(+o)===-1).map(([o,r])=>r)}function Ao(e,n="|"){return e.map(t=>Po(t)).join(n)}function vt(e,n){return typeof n=="bigint"?n.toString():n}var Ar=class{constructor(n){this._getter=n,this._value=void 0}get value(){let n=this._getter;return n!==void 0&&(this._value=n(),this._getter=void 0),this._value}};function bt(e){return new Ar(e)}function Pr(e){return e==null}function jt(e){let n=e.startsWith("^")?1:0,t=e.endsWith("$")?e.length-1:e.length;return e.slice(n,t)}function Ir(e,n){let t=e/n,o=Math.round(t),r=4*Number.EPSILON*Math.max(Math.abs(t),1);return Math.abs(t-o)<r?0:t-o}var ta=Symbol("evaluating");function Nr(e,n,t){let o;Object.defineProperty(e,n,{get(){if(o!==ta)return o===void 0&&(o=ta,o=t()),o},set(r){Object.defineProperty(e,n,{value:r})},configurable:!0})}function hp(e){return Object.create(Object.getPrototypeOf(e),Object.getOwnPropertyDescriptors(e))}function cn(e,n,t){Object.defineProperty(e,n,{value:t,writable:!0,enumerable:!0,configurable:!0})}function yt(e){let n=Object.getOwnPropertyDescriptor(e,"shape");return n?.get?n.get.raw:n?.value}function Mn(e){return yt(e._zod.def)??e._zod.def.shape}function oa(e,n,t){Object.defineProperty(e,n,{get(){let o=t();return cn(this,n,o),o},enumerable:!0,configurable:!0})}function ra(e,n,t){n in e?cn(e,n,t):e[n]=t}function rt(e,n,t,o){let r=Mn(n);for(let i of t){let a=Object.getOwnPropertyDescriptor(r,i);a.enumerable&&(a.get?oa(e,i,()=>{let l=n._zod.def.shape[i];return o?o(l,i):l}):ra(e,i,o?o(a.value,i):a.value))}}function gp(e,n){for(let t of Reflect.ownKeys(n)){let o=Object.getOwnPropertyDescriptor(n,t);o.enumerable&&(o.get?oa(e,t,()=>n[t]):ra(e,t,o.value))}}function $n(...e){let n={};for(let t of e){let o=Object.getOwnPropertyDescriptors(t);Object.assign(n,o)}return Object.defineProperties({},n)}function vp(e){return $n(e._zod.def)}function bp(e,n){return n?n.reduce((t,o)=>t?.[o],e):e}function yp(e){let n=Object.keys(e),t=n.map(o=>e[o]);return Promise.all(t).then(o=>{let r={};for(let i=0;i<n.length;i++)r[n[i]]=o[i];return r})}function wp(e=10){let n="abcdefghijklmnopqrstuvwxyz",t="";for(let o=0;o<e;o++)t+=n[Math.floor(Math.random()*n.length)];return t}function Er(e){return JSON.stringify(e)}function Tr(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/[\s_-]+/g,"-").replace(/^-+|-+$/g,"")}var Co="captureStackTrace"in Error?Error.captureStackTrace:(...e)=>{};function it(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}var Mr=bt(()=>{if(rn.jitless||typeof navigator<"u"&&navigator?.userAgent?.includes("Cloudflare"))return!1;try{let e=Function;return new e(""),!0}catch{return!1}});function Wn(e){if(it(e)===!1)return!1;let n=e.constructor;if(n===void 0||typeof n!="function")return!0;let t=n.prototype;return!(it(t)===!1||Object.prototype.hasOwnProperty.call(t,"isPrototypeOf")===!1)}function ia(e){return Wn(e)?{...e}:Array.isArray(e)?[...e]:e instanceof Map?new Map(e):e instanceof Set?new Set(e):e}function xp(e){let n=0;for(let t in e)Object.prototype.hasOwnProperty.call(e,t)&&n++;return n}var _p=e=>{let n=typeof e;switch(n){case"undefined":return"undefined";case"string":return"string";case"number":return Number.isNaN(e)?"nan":"number";case"boolean":return"boolean";case"function":return"function";case"bigint":return"bigint";case"symbol":return"symbol";case"object":return Array.isArray(e)?"array":e===null?"null":e.then&&typeof e.then=="function"&&e.catch&&typeof e.catch=="function"?"promise":typeof Map<"u"&&e instanceof Map?"map":typeof Set<"u"&&e instanceof Set?"set":typeof Date<"u"&&e instanceof Date?"date":typeof File<"u"&&e instanceof File?"file":"object";default:throw new Error(`Unknown data type: ${n}`)}},$r=new Set(["string","number","symbol"]),aa=new Set(["string","number","bigint","boolean","symbol","undefined"]);function On(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function wn(e,n,t){let o=new e._zod.constr(n??e._zod.def);return(!n||t?.parent)&&(o._zod.parent=e),o}function te(e){let n=e;if(!n)return{};if(typeof n=="string")return{error:()=>n};if(n?.message!==void 0){if(n?.error!==void 0)throw new Error("Cannot specify both `message` and `error` params");n.error=n.message}return delete n.message,typeof n.error=="string"?{...n,error:()=>n.error}:n}function kp(e){let n;return new Proxy({},{get(t,o,r){return n??(n=e()),Reflect.get(n,o,r)},set(t,o,r,i){return n??(n=e()),Reflect.set(n,o,r,i)},has(t,o){return n??(n=e()),Reflect.has(n,o)},deleteProperty(t,o){return n??(n=e()),Reflect.deleteProperty(n,o)},ownKeys(t){return n??(n=e()),Reflect.ownKeys(n)},getOwnPropertyDescriptor(t,o){return n??(n=e()),Reflect.getOwnPropertyDescriptor(n,o)},defineProperty(t,o,r){return n??(n=e()),Reflect.defineProperty(n,o,r)}})}function Po(e){return typeof e=="bigint"?e.toString()+"n":typeof e=="string"?`"${e}"`:`${e}`}function Or(e){return Object.keys(e).filter(n=>e[n]._zod.optin!==void 0&&e[n]._zod.optout==="optional")}var Gt={safeint:[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],int32:[-2147483648,2147483647],uint32:[0,4294967295],float32:[-34028234663852886e22,34028234663852886e22],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]},Io={int64:[BigInt("-9223372036854775808"),BigInt("9223372036854775807")],uint64:[BigInt(0),BigInt("18446744073709551615")]};function Sp(e,n){let t=e._zod.def,o=t.checks;if(o&&o.length>0)throw new Error(".pick() cannot be used on object schemas containing refinements");let i={};return rt(i,e,No(e,n)),wn(e,$n(t,{shape:i,checks:[]}))}function No(e,n){let t=Mn(e),o=[];for(let r of Reflect.ownKeys(n)){if(!Object.getOwnPropertyDescriptor(t,r)?.enumerable)throw new Error(`Unrecognized key: "${String(r)}"`);n[r]&&o.push(r)}return o}function zp(e,n){let t=e._zod.def,o=t.checks;if(o&&o.length>0)throw new Error(".omit() cannot be used on object schemas containing refinements");let i=new Set(No(e,n)),a={};return rt(a,e,Reflect.ownKeys(Mn(e)).filter(l=>!i.has(l))),wn(e,$n(t,{shape:a,checks:[]}))}function Ap(e,n){if(!Wn(n))throw new Error("Invalid input to extend: expected a plain object");let t=e._zod.def.checks;if(t&&t.length>0){let r=Mn(e);for(let i of Reflect.ownKeys(n))if(Object.getOwnPropertyDescriptor(r,i)!==void 0)throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.")}return wn(e,$n(e._zod.def,{shape:sa(e,n)}))}function sa(e,n){let t={};return rt(t,e,Reflect.ownKeys(Mn(e))),gp(t,n),t}function Cp(e,n){if(!Wn(n))throw new Error("Invalid input to safeExtend: expected a plain object");return wn(e,$n(e._zod.def,{shape:sa(e,n)}))}function Pp(e,n){if(!n?._zod?.def)throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");if(e._zod.def.checks?.length)throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");let t={};rt(t,e,Reflect.ownKeys(Mn(e))),rt(t,n,Reflect.ownKeys(Mn(n)));let o=$n(e._zod.def,{shape:t,get catchall(){return n._zod.def.catchall},checks:n._zod.def.checks??[]});return wn(e,o)}function Ip(e,n,t,o="partial"){let i=n._zod.def.checks;if(i&&i.length>0)throw new Error(`.${o}() cannot be used on object schemas containing refinements`);let l=t?new Set(No(n,t)):void 0,c={};return rt(c,n,Reflect.ownKeys(Mn(n)),e&&((u,d)=>l&&!l.has(d)?u:new e({type:"optional",innerType:u}))),wn(n,$n(n._zod.def,{shape:c,checks:[]}))}function Np(e,n,t){let o=t?new Set(No(n,t)):void 0,r={};return rt(r,n,Reflect.ownKeys(Mn(n)),(i,a)=>o&&!o.has(a)?i:new e({type:"nonoptional",innerType:i})),wn(n,$n(n._zod.def,{shape:r}))}function xn(e,n=0){if(e.aborted===!0)return!0;for(let t=n;t<e.issues.length;t++)if(e.issues[t]?.continue!==!0)return!0;return!1}function Rr(e,n=0){if(e.aborted===!0)return!0;for(let t=n;t<e.issues.length;t++)if(e.issues[t]?.continue===!1)return!0;return!1}function Rn(e,n){return n.map(t=>{var o;return(o=t).path??(o.path=[]),t.path.unshift(e),t})}function ht(e){return typeof e=="string"?e:e?.message}function Eo(e){let n=[];for(let t of e??[]){let o=t._zod.def;if(!/_(length|size)$|_equals$/.test(o.check))break;let r=o.maximum??o.length??o.size;r>=0&&n.push([r,t])}return n}function qt(e,n,t){var o;for(let r=n;r<e.length;r++)(o=e[r]).schema??(o.schema=t)}function _n(e,n,t){var o;let r=e.inst?._zod?.traits;r?.has("$ZodType")&&(r.has("$ZodCheck")?(o=e).schema??(o.schema=e.inst):e.schema=e.inst);let i=e.schema!==e.inst?e.schema?._zod.def?.error:void 0,a=e.message?e.message:ht(e.inst?._zod.def?.error?.(e))??ht(i?.(e))??ht(n?.error?.(e))??ht(t.customError?.(e))??ht(t.localeError?.(e))??"Invalid input",l={};for(let c of Object.keys(e))c==="inst"||c==="schema"||c==="continue"||c==="input"||c==="__proto__"||(l[c]=e[c]);return l.path??(l.path=[]),l.message=a,n?.reportInput&&(l.input=e.input),l}function la(e){return e instanceof Set?"set":e instanceof Map?"map":e instanceof File?"file":"unknown"}var Ep=/[\uD800-\uDBFF]/;function Wt(e){let n=e.length;if(!Ep.test(e))return n;let t=n;for(let o=0;o<n-1;o++)(e.charCodeAt(o)&64512)===55296&&(e.charCodeAt(o+1)&64512)===56320&&(t--,o++);return t}function Kt(e){return Array.isArray(e)?"array":typeof e=="string"?"string":"unknown"}function Dr(e){let n=typeof e;switch(n){case"number":return Number.isNaN(e)?"nan":"number";case"object":{if(e===null)return"null";if(Array.isArray(e))return"array";let t=e;if(t&&Object.getPrototypeOf(t)!==Object.prototype&&"constructor"in t&&t.constructor)return t.constructor.name}}return n}function wt(...e){let[n,t,o]=e;return typeof n=="string"?{message:n,code:"custom",input:t,inst:o}:{...n}}function Tp(e){return Object.entries(e).filter(([n,t])=>Number.isNaN(Number.parseInt(n,10))).map(n=>n[1])}function ca(e){let n=atob(e),t=new Uint8Array(n.length);for(let o=0;o<n.length;o++)t[o]=n.charCodeAt(o);return t}function ua(e){let n="";for(let t=0;t<e.length;t++)n+=String.fromCharCode(e[t]);return btoa(n)}function Mp(e){let n=e.replace(/-/g,"+").replace(/_/g,"/"),t="=".repeat((4-n.length%4)%4);return ca(n+t)}function $p(e){return ua(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}function Op(e){let n=e.replace(/^0x/,"");if(n.length%2!==0)throw new Error("Invalid hex string length");let t=new Uint8Array(n.length/2);for(let o=0;o<n.length;o+=2)t[o/2]=Number.parseInt(n.slice(o,o+2),16);return t}function Rp(e){return Array.from(e).map(n=>n.toString(16).padStart(2,"0")).join("")}var Cr=class{constructor(...n){}};function Vr(e,n){for(let t in n){let o=Object.getOwnPropertyDescriptor(n,t);o.get?Object.defineProperty(e,t,{...o,enumerable:!1}):Vp(e,t,o.value)}}function qn(e,n,t,o=!0){return Object.defineProperty(e,n,{configurable:!0,writable:!0,enumerable:o,value:t}),t}function To(e,n,t){return qn(e,n,t,!1)}function Dp(e,n){for(let t in e){let o=e[t];Object.defineProperty(n,t,{configurable:!0,enumerable:!0,get(){return qn(this,t,o(this))},set(r){qn(this,t,r)}})}return n}function Vp(e,n,t){Object.defineProperty(e,n,{configurable:!0,get(){return this==null?t:qn(this,n,t.bind(this))},set(o){qn(this,n,o)}})}function Zp(e,n){let t=Object.getPrototypeOf(e);return n in t?void 0:t}var zr,Gn=!1,Bp={configurable:!0,get(){Gn=!0}};function fe(e,n,t){let o=Object.getPrototypeOf(e._zod);if(n in o&&zr!==e._zod){zr=void 0;return}zr=e._zod,Object.defineProperty(o,n,{configurable:!0,get(){Object.defineProperty(this,n,Bp);let r=Gn;Gn=!1;try{let i=t(this);return Gn?delete this[n]:Object.defineProperty(this,n,{configurable:!0,writable:!0,value:i}),Gn=Gn||r,i}catch(i){throw delete this[n],Gn=Gn||r,i}},set(r){Object.defineProperty(this,n,{configurable:!0,writable:!0,value:r})}})}function Fp(e,n,t,o){let r=Zp(e,n);r&&Object.defineProperty(r,n,{configurable:!0,get(){let i={configurable:!0,writable:!0,enumerable:o,value:void 0};return Object.defineProperty(this,n,i),i.value=t(this),Object.defineProperty(this,n,i),i.value},set(i){Object.defineProperty(this,n,{configurable:!0,writable:!0,enumerable:o,value:i})}})}var da="~constantCatch";function pa(e){let n=()=>e;return n[da]=!0,n}var ma;var Zr={value:void 0,enumerable:!1},fa="captureStackTrace"in Error?Error:null;function Up(e){let n=fa;if(n){let t=n.stackTraceLimit;if(typeof t=="number"){try{n.stackTraceLimit=0}catch{return fa=null,new e}try{return new e}finally{n.stackTraceLimit=t}}}return new e}function O(e,n,t,o){let r={};function i(f){this.def=f,this.constr=m,this.traits=new Set}i.prototype=r;let a=t,l=a&&new WeakSet;function c(f,p){if(f._zod){if(f._zod.traits.has(e))return}else{Zr.value=new i(p);try{Object.defineProperty(f,"_zod",Zr)}finally{Zr.value=void 0}}if(f._zod.traits.add(e),n(f,p),l){let v=Object.getPrototypeOf(f),b=f._zod.constr.prototype,x=v;for(;x&&x!==b;)x=Object.getPrototypeOf(x);let C=x??v;l.has(C)||(l.add(C),Vr(C,a))}let y=m.prototype;for(let v in y)Object.prototype.hasOwnProperty.call(y,v)&&(v in f||(f[v]=y[v].bind(f)))}let u=o?.Parent??Object;class d extends u{}Object.defineProperty(d,"name",{value:e});function m(f){let p=o?.Parent?Up(d):this;c(p,f);let y=p._zod.deferred;if(y){for(let b of y)b();p._zod.deferred=void 0}let v=globalThis.__zod_globalConfig?.postProcessor;return v&&v(p),p}return Object.defineProperty(m,"init",{value:c}),Object.defineProperty(m,Symbol.hasInstance,{value:f=>o?.Parent&&f instanceof o.Parent?!0:f?._zod?.traits?.has(e)}),Object.defineProperty(m,"name",{value:e}),m}var kn=class extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}},xt=class extends Error{constructor(n){super(`Encountered unidirectional transform during encode: ${n}`),this.name="ZodEncodeError"}};(ma=globalThis).__zod_globalConfig??(ma.__zod_globalConfig={});var rn=globalThis.__zod_globalConfig;function un(e){return e&&Object.assign(rn,e),rn}function Lp(){let e=this._zod;return e.message??(e.message=JSON.stringify(e.def,vt,2)),e.message}function Hp(e){this._zod.message=e}var jp={get:Lp,set:Hp,enumerable:!0,configurable:!0},Fr={value:void 0,enumerable:!1},ha=new WeakSet([Object.prototype,Error.prototype]),ga=(e,n)=>{e.name="$ZodError",Fr.value=n,Object.defineProperty(e,"issues",Fr),Fr.value=void 0,Object.defineProperty(e,"message",jp);let t=Object.getPrototypeOf(e);ha.has(t)||(ha.add(t),Object.defineProperty(t,"toString",{configurable:!0,enumerable:!1,get(){let o=()=>this.message;return Object.defineProperty(this,"toString",{value:o,configurable:!0,writable:!0}),o},set(o){Object.defineProperty(this,"toString",{value:o,configurable:!0,writable:!0})}}))},va=O("$ZodError",ga),zg=O("$ZodError",ga,void 0,{Parent:Error});function Gp(e,n,t){return Object.prototype.hasOwnProperty.call(e,n)||(n==="__proto__"?Object.defineProperty(e,n,{value:t(),writable:!0,enumerable:!0,configurable:!0}):e[n]=t()),e[n]}function ba(e,n=t=>t.message){let t={},o=[];for(let r of e.issues)r.path.length>0?Gp(t,r.path[0],()=>[]).push(n(r)):o.push(n(r));return{formErrors:o,fieldErrors:t}}function ya(e,n=t=>t.message){let t={_errors:[]},o=(r,i=[])=>{for(let a of r.issues)if(a.code==="invalid_union"&&a.errors.length)a.errors.map(l=>o({issues:l},[...i,...a.path]));else if(a.code==="invalid_key")o({issues:a.issues},[...i,...a.path]);else if(a.code==="invalid_element")o({issues:a.issues},[...i,...a.path]);else{let l=[...i,...a.path];if(l.length===0)t._errors.push(n(a));else{let c=t,u=0;for(;u<l.length;){let d=l[u],m=u===l.length-1;if(d==="_errors"){m&&c._errors.push(n(a)),u++;continue}Object.prototype.hasOwnProperty.call(c,d)||Object.defineProperty(c,d,{value:{_errors:[]},enumerable:!0,writable:!0,configurable:!0});let f=c[d];m&&f._errors.push(n(a)),c=f,u++}}}};return o(e),t}function Mo(e,n){return{callee:n?.callee??e,Err:n?.Err}}var $o=e=>{let n=(t,o,r,i)=>{let a=r?{...r,async:!1}:{async:!1},l=t._zod.run({value:o,issues:[]},a);if(l instanceof Promise)throw new kn;if(l.issues.length){let c=new(i?.Err??e)(l.issues.map(u=>_n(u,a,un())));throw Co(c,i?.callee??n),c}return l.value};return n};var Oo=e=>{let n=async(t,o,r,i)=>{let a=r?{...r,async:!0}:{async:!0},l=t._zod.run({value:o,issues:[]},a);if(l instanceof Promise&&(l=await l),l.issues.length){let c=new(i?.Err??e)(l.issues.map(u=>_n(u,a,un())));throw Co(c,i?.callee??n),c}return l.value};return n};var Ro=e=>(n,t,o)=>{let r=o?{...o,async:!1}:{async:!1},i=n._zod.run({value:t,issues:[]},r);if(i instanceof Promise)throw new kn;return i.issues.length?wa(e,i.issues,r):{success:!0,data:i.value}};function wa(e,n,t){let o;return{success:!1,get error(){return o||(o=new e(n.map(r=>_n(r,t,un()))),n=void 0,t=void 0),o},set error(r){o=r,n=void 0,t=void 0}}}var Do=e=>async(n,t,o)=>{let r=o?{...o,async:!0}:{async:!0},i=n._zod.run({value:t,issues:[]},r);return i instanceof Promise&&(i=await i),i.issues.length?wa(e,i.issues,r):{success:!0,data:i.value}};var qp=Symbol.for("zod.compile.invalid"),Wp=Symbol.for("zod.compile.fallback"),Ur=((e,n,t)=>{let o=e._zod.bag.validator;if(o!==void 0){if(o(n)!==qp)return!0;if(o.definite===!0&&t===void 0)return!1}return Kp(e,n,t)});function Kp(e,n,t){let o=t?{...t,async:!1,abortEarly:!0}:{async:!1,abortEarly:!0},r=e._zod.bag.fallbackRun,i;if(r?(o[Wp]=!0,i=r({value:n,issues:[]},o)):i=e._zod.run({value:n,issues:[]},o),i instanceof Promise)throw new kn;return i.issues.length===0}var Lr=async(e,n,t)=>{let o=t?{...t,async:!0,abortEarly:!0}:{async:!0,abortEarly:!0},r=e._zod.run({value:n,issues:[]},o);return r instanceof Promise&&(r=await r),r.issues.length===0},xa=e=>{let n=$o(e),t=(o,r,i,a)=>{let l=i?{...i,direction:"backward"}:{direction:"backward"};return n(o,r,l,Mo(t,a))};return t};var _a=e=>{let n=$o(e),t=(o,r,i,a)=>n(o,r,i,Mo(t,a));return t};var ka=e=>{let n=Oo(e),t=async(o,r,i,a)=>{let l=i?{...i,direction:"backward"}:{direction:"backward"};return await n(o,r,l,Mo(t,a))};return t};var Sa=e=>{let n=Oo(e),t=async(o,r,i,a)=>await n(o,r,i,Mo(t,a));return t};var za=e=>(n,t,o)=>{let r=o?{...o,direction:"backward"}:{direction:"backward"};return Ro(e)(n,t,r)};var Aa=e=>(n,t,o)=>Ro(e)(n,t,o);var Ca=e=>async(n,t,o)=>{let r=o?{...o,direction:"backward"}:{direction:"backward"};return Do(e)(n,t,r)};var Pa=e=>async(n,t,o)=>Do(e)(n,t,o);var Ia=/^[cC][0-9a-z]{6,}$/,Na=/^[0-9a-z]+$/,Ea=/^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/,Ta=/^[0-9a-vA-V]{20}$/,Ma=/^[A-Za-z0-9]{27}$/,$a=/^[a-zA-Z0-9_-]{21}$/;function Oa(e){return new RegExp(`^[a-zA-Z0-9_-]{${e}}$`)}var Ra=/^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;var Da=/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,jr=e=>e?new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`):/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;var Va=/^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;var Jp="^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";function Za(){return new RegExp(Jp,"u")}var Ba=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,Fa=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;var Ua=/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,La=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,Ha=/^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,ja=/^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/;var Ga=/^https?$/,qa=/^\+[1-9]\d{6,14}$/;var Wa="(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";function Xp(e){return new RegExp(`^${e}$`)}var Ka=Xp(Wa);function Hr(e){let n="(?:[01]\\d|2[0-3]):[0-5]\\d";return typeof e.precision=="number"?e.precision===-1?`${n}`:e.precision===0?`${n}:[0-5]\\d`:`${n}:[0-5]\\d\\.\\d{${e.precision}}`:e.seconds?`${n}:[0-5]\\d(?:\\.\\d+)?`:`${n}(?::[0-5]\\d(?:\\.\\d+)?)?`}function Ja(e){return new RegExp(`^${Hr(e)}$`)}function Xa(e){let n=["Z"];e.offset&&n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");let t=`${Hr({precision:e.precision,seconds:!0})}(?:${n.join("|")})`,o=e.local?`${t}|${Hr({precision:e.precision})}`:t;return new RegExp(`^${Wa}T(?:${o})$`)}var Ya=/^[\s\S]{0,}$/;var Gr=/^-?\d+$/,Jt=/^-?\d+(?:\.\d+)?$/,Qa=/^(?:true|false)$/i,es=/^null$/i;var ns=/^[^A-Z]*$/,ts=/^[^a-z]*$/;var qe=O("$ZodCheck",(e,n)=>{var t;e._zod??(e._zod={}),e._zod.def=n,(t=e._zod).onattach??(t.onattach=[])});var qr=e=>{let n=e.value;return!Pr(n)&&n.length!==void 0},Vo={number:"number",bigint:"bigint",object:"date"},Wr=O("$ZodCheckLessThan",(e,n)=>{qe.init(e,n);let t=Vo[typeof n.value];e._zod.check=o=>{(n.inclusive?o.value<=n.value:o.value<n.value)||o.issues.push({origin:Vo[typeof o.value]??t,code:"too_big",maximum:typeof n.value=="object"?n.value.getTime():n.value,input:o.value,inclusive:n.inclusive,inst:e,continue:!n.abort})}}),Kr=O("$ZodCheckGreaterThan",(e,n)=>{qe.init(e,n);let t=Vo[typeof n.value];e._zod.check=o=>{(n.inclusive?o.value>=n.value:o.value>n.value)||o.issues.push({origin:Vo[typeof o.value]??t,code:"too_small",minimum:typeof n.value=="object"?n.value.getTime():n.value,input:o.value,inclusive:n.inclusive,inst:e,continue:!n.abort})}}),os=O("$ZodCheckMultipleOf",(e,n)=>{qe.init(e,n),e._zod.check=t=>{if(typeof t.value!=typeof n.value)throw new Error("Cannot mix number and bigint in multiple_of check.");(typeof t.value=="bigint"?n.value!==BigInt(0)&&t.value%n.value===BigInt(0):Ir(t.value,n.value)===0)||t.issues.push({origin:typeof t.value,code:"not_multiple_of",divisor:n.value,input:t.value,inst:e,continue:!n.abort})}}),rs=O("$ZodCheckNumberFormat",(e,n)=>{qe.init(e,n),n.format=n.format||"float64";let t=n.format?.includes("int"),o=t?"int":"number",[r,i]=Gt[n.format];e._zod.check=a=>{let l=a.value;if(t){if(!Number.isInteger(l)){a.issues.push({expected:o,format:n.format,code:"invalid_type",continue:!1,input:l,inst:e});return}if(!Number.isSafeInteger(l)){l>0?a.issues.push({input:l,code:"too_big",maximum:Number.MAX_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:o,inclusive:!0,continue:!n.abort}):a.issues.push({input:l,code:"too_small",minimum:Number.MIN_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:o,inclusive:!0,continue:!n.abort});return}}l<r&&a.issues.push({origin:"number",input:l,code:"too_small",minimum:r,inclusive:!0,inst:e,continue:!n.abort}),l>i&&a.issues.push({origin:"number",input:l,code:"too_big",maximum:i,inclusive:!0,inst:e,continue:!n.abort})}});var is=O("$ZodCheckMaxLength",(e,n)=>{var t;qe.init(e,n),(t=e._zod.def).when??(t.when=qr),e._zod.check=o=>{let r=o.value,i=r.length;if((typeof r=="string"&&i>n.maximum?Wt(r):i)<=n.maximum)return;let l=Kt(r);o.issues.push({origin:l,code:"too_big",maximum:n.maximum,inclusive:!0,input:r,inst:e,continue:!n.abort})}}),as=O("$ZodCheckMinLength",(e,n)=>{var t;qe.init(e,n),(t=e._zod.def).when??(t.when=qr),e._zod.check=o=>{let r=o.value,i=r.length;if((typeof r=="string"&&i>=n.minimum&&i<n.minimum*2?Wt(r):i)>=n.minimum)return;let l=Kt(r);o.issues.push({origin:l,code:"too_small",minimum:n.minimum,inclusive:!0,input:r,inst:e,continue:!n.abort})}}),ss=O("$ZodCheckLengthEquals",(e,n)=>{var t;qe.init(e,n),(t=e._zod.def).when??(t.when=qr),e._zod.check=o=>{let r=o.value,i=r.length,a=typeof r=="string"&&i>=n.length&&i<=n.length*2?Wt(r):i;if(a===n.length)return;let l=Kt(r),c=a>n.length;o.issues.push({origin:l,...c?{code:"too_big",maximum:n.length}:{code:"too_small",minimum:n.length},inclusive:!0,exact:!0,input:o.value,inst:e,continue:!n.abort})}}),Yt=O("$ZodCheckStringFormat",(e,n)=>{var t,o;qe.init(e,n),n.pattern?(t=e._zod).check??(t.check=r=>{n.pattern.lastIndex=0,!n.pattern.test(r.value)&&r.issues.push({origin:"string",code:"invalid_format",format:n.format,input:r.value,...n.pattern?{pattern:n.pattern.toString()}:{},inst:e,continue:!n.abort})}):(o=e._zod).check??(o.check=()=>{})}),ls=O("$ZodCheckRegex",(e,n)=>{Yt.init(e,n),e._zod.check=t=>{n.pattern.lastIndex=0,!n.pattern.test(t.value)&&t.issues.push({origin:"string",code:"invalid_format",format:"regex",input:t.value,pattern:n.pattern.toString(),inst:e,continue:!n.abort})}}),cs=O("$ZodCheckLowerCase",(e,n)=>{n.pattern??(n.pattern=ns),Yt.init(e,n)}),us=O("$ZodCheckUpperCase",(e,n)=>{n.pattern??(n.pattern=ts),Yt.init(e,n)}),ds=O("$ZodCheckIncludes",(e,n)=>{qe.init(e,n);let t=On(n.includes),o=new RegExp(typeof n.position=="number"?`^.{${n.position},}${t}`:t);n.pattern=o,e._zod.check=r=>{r.value.includes(n.includes,n.position)||r.issues.push({origin:"string",code:"invalid_format",format:"includes",includes:n.includes,input:r.value,inst:e,continue:!n.abort})}}),ps=O("$ZodCheckStartsWith",(e,n)=>{qe.init(e,n);let t=new RegExp(`^${On(n.prefix)}.*`);n.pattern??(n.pattern=t),e._zod.check=o=>{o.value.startsWith(n.prefix)||o.issues.push({origin:"string",code:"invalid_format",format:"starts_with",prefix:n.prefix,input:o.value,inst:e,continue:!n.abort})}}),ms=O("$ZodCheckEndsWith",(e,n)=>{qe.init(e,n);let t=new RegExp(`.*${On(n.suffix)}$`);n.pattern??(n.pattern=t),e._zod.check=o=>{o.value.endsWith(n.suffix)||o.issues.push({origin:"string",code:"invalid_format",format:"ends_with",suffix:n.suffix,input:o.value,inst:e,continue:!n.abort})}});var fs=O("$ZodCheckOverwrite",(e,n)=>{qe.init(e,n),e._zod.check=t=>{t.value=n.tx(t.value)}});var Zo=class{constructor(n=[],t={}){this.content=[],this.indent=0,this.args=n,this.closed=t}indented(n){this.indent+=1;try{n(this)}finally{this.indent-=1}}write(n){if(typeof n=="function"){n(this,{execution:"sync"}),n(this,{execution:"async"});return}let o=n.split(`
`).filter(a=>a),r=Math.min(...o.map(a=>a.length-a.trimStart().length)),i=o.map(a=>a.slice(r)).map(a=>" ".repeat(this.indent*2)+a);for(let a of i)this.content.push(a)}compile(){let n=Function,t=this?.content??[""];return new n(...Object.keys(this.closed),`return function (${this.args.join(", ")}) {
${t.join(`
`)}
};`)(...Object.values(this.closed))}};var gs={major:4,minor:6,patch:7};var Se=O("$ZodType",(e,n)=>{var t;e??(e={}),e._zod.def=n,e._zod.bag=e._zod.bag||{},e._zod.version=gs;let o=e._zod.def.checks,r=e._zod.traits.has("$ZodCheck")?[e,...o??[]]:o?.length?[...o]:[];for(let i of r)for(let a of i._zod.onattach)a(e);if(r.length===0)(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{let i=(l,c,u)=>{if(l.memo)return l;let d=xn(l),m;for(let f of c){if(f._zod.def.when){if(Rr(l)||!f._zod.def.when(l))continue}else if(d)continue;let p=l.issues.length,y=f._zod.check(l);if(y instanceof Promise&&u?.async===!1)throw new kn;if(m||y instanceof Promise)m=(m??Promise.resolve()).then(async()=>{await y,l.issues.length!==p&&(qt(l.issues,p,e),d||(d=xn(l,p)))});else{if(l.issues.length===p)continue;qt(l.issues,p,e),d||(d=xn(l,p))}}return m?m.then(()=>l):l},a=(l,c,u)=>{if(xn(l))return l.aborted=!0,l;let d=i(c,r,u);if(d instanceof Promise){if(u.async===!1)throw new kn;return d.then(m=>e._zod.parse(m,u))}return e._zod.parse(d,u)};e._zod.run=(l,c)=>{if(c.skipChecks)return e._zod.parse(l,c);if(c.direction==="backward"){let d=e._zod.parse({value:l.value,issues:[]},{...c,skipChecks:!0});return d instanceof Promise?d.then(m=>a(m,l,c)):a(d,l,c)}let u=e._zod.parse(l,c);if(u instanceof Promise){if(c.async===!1)throw new kn;return u.then(d=>i(d,r,c))}return i(u,r,c)}}},{get"~standard"(){return To(this,"~standard",Xr(this))},set"~standard"(e){qn(this,"~standard",e)}}),Cs=(e,n)=>e.issues.length?{issues:e.issues.map(t=>_n(t,n,un()))}:{value:e.value};async function Yp(e,n){let t={async:!0};return Cs(await e._zod.run({value:n,issues:[]},t),t)}function Xr(e){return{validate:n=>{let t={async:!1};try{let o=e._zod.run({value:n,issues:[]},t);if(!(o instanceof Promise))return Cs(o,t)}catch{}return Yp(e,n)},vendor:"zod",version:1}}var Lo=O("$ZodString",(e,n)=>{Se.init(e,n),e._zod.pattern=n.pattern??Ya,e._zod.parse=(t,o)=>{if(n.coerce)try{t.value=String(t.value)}catch{}return typeof t.value=="string"||t.issues.push({expected:"string",code:"invalid_type",input:t.value,inst:e}),t}}),Ae=O("$ZodStringFormat",(e,n)=>{Yt.init(e,n),Lo.init(e,n)}),Ps=O("$ZodGUID",(e,n)=>{n.pattern??(n.pattern=Da),Ae.init(e,n)}),Is=O("$ZodUUID",(e,n)=>{if(n.version){let o={v1:1,v2:2,v3:3,v4:4,v5:5,v6:6,v7:7,v8:8}[n.version];if(o===void 0)throw new Error(`Invalid UUID version: "${n.version}"`);n.pattern??(n.pattern=jr(o))}else n.pattern??(n.pattern=jr());Ae.init(e,n)}),Ns=O("$ZodEmail",(e,n)=>{n.pattern??(n.pattern=Va),Ae.init(e,n)}),Es=1,Fo=2;function Ts(e){try{return typeof URL<"u"&&typeof URL.canParse=="function"?URL.canParse(e):(new URL(e),!0)}catch{return!1}}function Qp(e,n){return!("normalize"in n)&&!("hostname"in n)&&!("protocol"in n)?Ts(e)||Fo:em(e,n)}function em(e,n){if(!n.normalize&&n.protocol?.source===Ga.source&&!/^https?:\/\//i.test(e))return Es;try{if(typeof URL<"u"){let t=URL;if(typeof t.parse=="function")return t.parse(e)??Fo}return new URL(e)}catch{return Fo}}var nm=/[\t\n\r]/g;function vs(e){return e.replace(nm,"")}function tm(e,n){return n.lastIndex=0,n.test(e.hostname)}function om(e,n){return n.lastIndex=0,n.test(e.protocol.endsWith(":")?e.protocol.slice(0,-1):e.protocol)}var Ms=O("$ZodURL",(e,n)=>{Ae.init(e,n),e._zod.check=t=>{try{let o=t.value.trim(),r=Qp(o,n);if(r===Es){t.issues.push({code:"invalid_format",format:"url",note:"Invalid URL format",input:t.value,inst:e,continue:!n.abort});return}if(r===Fo){t.issues.push({code:"invalid_format",format:"url",input:t.value,inst:e,continue:!n.abort});return}if(r===!0){t.value=vs(o);return}n.hostname&&!tm(r,n.hostname)&&t.issues.push({code:"invalid_format",format:"url",note:"Invalid hostname",pattern:n.hostname.source,input:t.value,inst:e,continue:!n.abort}),n.protocol&&!om(r,n.protocol)&&t.issues.push({code:"invalid_format",format:"url",note:"Invalid protocol",pattern:n.protocol.source,input:t.value,inst:e,continue:!n.abort}),t.value=n.normalize?r.href:vs(o);return}catch{t.issues.push({code:"invalid_format",format:"url",input:t.value,inst:e,continue:!n.abort})}}}),$s=O("$ZodEmoji",(e,n)=>{n.pattern??(n.pattern=Za()),Ae.init(e,n)}),Os=O("$ZodNanoID",(e,n)=>{if(n.length!==void 0&&(!Number.isInteger(n.length)||n.length<1))throw new Error(`Invalid nanoid length: ${n.length}`);n.pattern??(n.pattern=n.length===void 0?$a:Oa(n.length)),Ae.init(e,n)}),Rs=O("$ZodCUID",(e,n)=>{n.pattern??(n.pattern=Ia),Ae.init(e,n)}),Ds=O("$ZodCUID2",(e,n)=>{n.pattern??(n.pattern=Na),Ae.init(e,n)}),Vs=O("$ZodULID",(e,n)=>{n.pattern??(n.pattern=Ea),Ae.init(e,n)}),Zs=O("$ZodXID",(e,n)=>{n.pattern??(n.pattern=Ta),Ae.init(e,n)}),Bs=O("$ZodKSUID",(e,n)=>{n.pattern??(n.pattern=Ma),Ae.init(e,n)}),Fs=O("$ZodISODateTime",(e,n)=>{n.pattern??(n.pattern=Xa(n)),Ae.init(e,n)}),Us=O("$ZodISODate",(e,n)=>{n.pattern??(n.pattern=Ka),Ae.init(e,n)}),Ls=O("$ZodISOTime",(e,n)=>{n.pattern??(n.pattern=Ja(n)),Ae.init(e,n)}),Hs=O("$ZodISODuration",(e,n)=>{n.pattern??(n.pattern=Ra),Ae.init(e,n)}),js=O("$ZodIPv4",(e,n)=>{n.pattern??(n.pattern=Ba),Ae.init(e,n)}),rm=/^[0-9a-fA-F:.]+$/;function Gs(e){return rm.test(e)?Ts(`http://[${e}]`):!1}var qs=O("$ZodIPv6",(e,n)=>{n.pattern??(n.pattern=Fa),Ae.init(e,n),e._zod.check=t=>{Gs(t.value)||t.issues.push({code:"invalid_format",format:"ipv6",input:t.value,inst:e,continue:!n.abort})}});var Ws=O("$ZodCIDRv4",(e,n)=>{n.pattern??(n.pattern=Ua),Ae.init(e,n)});function im(e){let n=e.split("/");if(n.length!==2)return!1;let[t,o]=n;if(!o)return!1;let r=Number(o);return`${r}`!==o||r<0||r>128?!1:Gs(t)}var Ks=O("$ZodCIDRv6",(e,n)=>{n.pattern??(n.pattern=La),Ae.init(e,n),e._zod.check=t=>{im(t.value)||t.issues.push({code:"invalid_format",format:"cidrv6",input:t.value,inst:e,continue:!n.abort})}});function Js(e){if(e==="")return!0;if(/\s/.test(e)||e.length%4!==0)return!1;try{return atob(e),!0}catch{return!1}}var Yr=/^[0-9a-zA-Z+/]*={0,2}$/,Xs=O("$ZodBase64",(e,n)=>{n.pattern??(n.pattern=Yr),Ae.init(e,n),e._zod.check=t=>{Js(t.value)||t.issues.push({code:"invalid_format",format:"base64",input:t.value,inst:e,continue:!n.abort})}}),Ho=/^[A-Za-z0-9_-]*$/;function am(e){if(!Ho.test(e))return!1;let n=e.replace(/[-_]/g,o=>o==="-"?"+":"/"),t=n.padEnd(Math.ceil(n.length/4)*4,"=");return Js(t)}var Ys=O("$ZodBase64URL",(e,n)=>{n.pattern??(n.pattern=Ho),Ae.init(e,n),e._zod.check=t=>{am(t.value)||t.issues.push({code:"invalid_format",format:"base64url",input:t.value,inst:e,continue:!n.abort})}}),Qs=O("$ZodE164",(e,n)=>{n.pattern??(n.pattern=qa),Ae.init(e,n)});function sm(e,n=null){try{let t=e.split(".");if(t.length!==3)return!1;let[o]=t;if(!o)return!1;let r=JSON.parse(atob(o));return!("typ"in r&&r?.typ!=="JWT"||!r.alg||n&&(!("alg"in r)||r.alg!==n))}catch{return!1}}var el=O("$ZodJWT",(e,n)=>{Ae.init(e,n),e._zod.check=t=>{sm(t.value,n.alg)||t.issues.push({code:"invalid_format",format:"jwt",input:t.value,inst:e,continue:!n.abort})}});var Qr=O("$ZodNumber",(e,n)=>{Se.init(e,n),e._zod.pattern=Jt,e._zod.parse=(t,o)=>{if(n.coerce)try{t.value=Number(t.value)}catch{}let r=t.value;if(typeof r=="number"&&!Number.isNaN(r)&&Number.isFinite(r))return t;let i=typeof r=="number"?Number.isNaN(r)?"NaN":Number.isFinite(r)?void 0:String(r):void 0;return t.issues.push({expected:"number",code:"invalid_type",input:r,inst:e,...i?{received:i}:{}}),t}}),nl=O("$ZodNumberFormat",(e,n)=>{rs.init(e,n),Qr.init(e,n)}),tl=O("$ZodBoolean",(e,n)=>{Se.init(e,n),e._zod.pattern=Qa,e._zod.parse=(t,o)=>{if(n.coerce)try{t.value=!!t.value}catch{}let r=t.value;return typeof r=="boolean"||t.issues.push({expected:"boolean",code:"invalid_type",input:r,inst:e}),t}});var ol=O("$ZodNull",(e,n)=>{Se.init(e,n),e._zod.pattern=es,e._zod.values=new Set([null]),e._zod.parse=(t,o)=>{let r=t.value;return r===null||t.issues.push({expected:"null",code:"invalid_type",input:r,inst:e}),t}});var rl=O("$ZodUnknown",(e,n)=>{Se.init(e,n),e._zod.parse=t=>t}),il=O("$ZodNever",(e,n)=>{Se.init(e,n),e._zod.parse=(t,o)=>(t.issues.push({expected:"never",code:"invalid_type",input:t.value,inst:e}),t)});function lm(e,n){let t=Eo(e._zod.def.checks);if(!t.length)return;let o=Math.min(...t.map(i=>i[0])),r=e._zod.parse;e._zod.parse=(i,a)=>{let l=n(i.value);if(l>o&&!a?.skipChecks&&a?.direction!=="backward"){for(let[c,u]of Eo(e._zod.def.checks))if(l>c&&u._zod.def.when(i)){let d=i.issues.length;return u._zod.check(i),i.issues[d].continue=!1,qt(i.issues,d,e),i}}return r(i,a)}}var cm=e=>Array.isArray(e)?e.length:-1;function bs(e,n,t){e.issues.length&&n.issues.push(...Rn(t,e.issues)),n.value[t]=e.value}var al=O("$ZodArray",(e,n)=>{Se.init(e,n);let t=rn.memoizer;t?.attach(e),e._zod.parse=(o,r)=>{let i=o.value;if(!Array.isArray(i))return o.issues.push({expected:"array",code:"invalid_type",input:i,inst:e}),o;o.value=t?t.alloc(e,o,Array(i.length),r):Array(i.length);let a=[],l=r?.abortEarly;for(let c=0;c<i.length;c++){let u=i[c],d=n.element._zod.run({value:u,issues:[]},r);if(d instanceof Promise)a.push(d.then(m=>bs(m,o,c)));else if(bs(d,o,c),l&&d.issues.length!==0&&xn(d))break}return a.length?Promise.all(a).then(()=>o):o},lm(e,cm)});function Uo(e,n,t,o,r,i){let a=t in o,l=i==="optional";if(!(!a&&l&&r==="optional")){if(e.issues.length){if(r!==void 0&&l&&!a)return;n.issues.push(...Rn(t,e.issues))}if(!a&&r===void 0){e.issues.length||n.issues.push({code:"invalid_type",expected:"nonoptional",input:void 0,path:[t]});return}e.value===void 0?(a||r==="defaulted"&&!l)&&(n.value[t]=void 0):n.value[t]=e.value}}var um=[];function sl(e){let n=Object.keys(e.shape),t=Object.getOwnPropertySymbols(e.shape),o=t.length?t:um,r=o.length?[...n,...o]:n;for(let a of r)if(!e.shape?.[a]?._zod?.traits?.has("$ZodType"))throw new Error(`Invalid element at key "${String(a)}": expected a Zod schema`);let i=Or(e.shape);return{...e,allKeys:r,symbolKeys:o,keySet:new Set(n),numKeys:n.length,optionalKeys:new Set(i)}}function ll(e,n,t,o,r,i,a){let l=[],c=r.keySet,u=r.catchall._zod,d=u.def.type,m=u.optin,f=u.optout,p=0;for(let y in n){if(a&&t.issues.length!==p){if(xn(t,p))break;p=t.issues.length}if(c.has(y))continue;if(y==="__proto__"){d==="never"&&l.push(y);continue}if(d==="never"){l.push(y);continue}let v=u.run({value:n[y],issues:[]},o);v instanceof Promise?e.push(v.then(b=>Uo(b,t,y,n,m,f))):Uo(v,t,y,n,m,f)}return l.length&&t.issues.push({code:"unrecognized_keys",keys:l,input:n,inst:i,continue:!0}),e.length?Promise.all(e).then(()=>t):t}var dm=O("$ZodObject",(e,n)=>{Se.init(e,n);let t=Object.getOwnPropertyDescriptor(n,"shape"),o=t?.get?t.get.raw:n.shape??{};if(o){let u=()=>{let d={...o};return Object.defineProperty(n,"shape",{value:d}),u.raw=d,d};u.raw=o,Object.defineProperty(n,"shape",{get:u})}let r=bt(()=>sl(n));fe(e,"propValues",u=>{let d=u.def.shape,m={};for(let f in d){let p=d[f]._zod;if(p.values){Object.prototype.hasOwnProperty.call(m,f)||cn(m,f,new Set);for(let y of p.values)m[f].add(y);p.optin!==void 0&&m[f].add(void 0)}}return m});let i=it,a=n.catchall,l,c=rn.memoizer;c?.attach(e),e._zod.parse=(u,d)=>{l??(l=r.value);let m=u.value;if(!i(m))return u.issues.push({expected:"object",code:"invalid_type",input:m,inst:e}),u;u.value=c?c.alloc(e,u,{},d):{};let f=[],p=l.shape,y=d?.abortEarly,v=u.issues.length;for(let b of l.allKeys){if(y&&u.issues.length!==v){if(xn(u,v))break;v=u.issues.length}if(b==="__proto__")continue;let x=p[b],C=x._zod.optin,B=x._zod.optout,D=x._zod.run({value:m[b],issues:[]},d);D instanceof Promise?f.push(D.then(E=>Uo(E,u,b,m,C,B))):Uo(D,u,b,m,C,B)}return a?ll(f,m,u,d,r.value,e,y===!0):f.length?Promise.all(f).then(()=>u):u}}),cl=O("$ZodObjectJIT",(e,n)=>{dm.init(e,n);let t=e._zod.parse,o=bt(()=>sl(n)),r=rn.memoizer,i=p=>{let y=o.value,v=y.symbolKeys,b=new Zo(["payload","ctx"],{shape:p,inst:e,memo:r,syms:v}),x=E=>`shape[${E}]._zod.run({ value: input[${E}], issues: [] }, ctx)`,C=(E,$)=>`
          let ${E}_ab = false;
          for (let i = 0; i < ${E}.issues.length; i++) {
            const iss = ${E}.issues[i];
            iss.path = iss.path ? [${$}, ...iss.path] : [${$}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${E}_ab = true;
          }
          if (${E}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;b.write("const input = payload.value;");let B=Object.create(null),D=0;for(let E of y.allKeys)B[E]=`key_${D++}`;b.write(r?"const newResult = memo.alloc(inst, payload, {}, ctx);":"const newResult = {};");for(let E of y.allKeys){if(E==="__proto__")continue;let $=B[E],z=typeof E=="symbol"?`syms[${v.indexOf(E)}]`:Er(E),M=`${z} in input`,A=p[E],k=A?._zod?.optin,P=k!==void 0,V=A?._zod?.optout==="optional";if(b.write(`const ${$} = ${x(z)};`),P&&V){let S=k==="optional"?`${$}_present`:`${$}.value !== undefined || ${$}_present`;b.write(`
        const ${$}_present = ${M};
        if (!${$}.issues.length || ${$}_present) {
          if (${$}.issues.length) {${C($,z)}
          }

          if (${S}) {
            newResult[${z}] = ${$}.value;
          }
        }

      `)}else P?(b.write(`
        if (${$}.issues.length) {${C($,z)}
        }
      `),k==="defaulted"?b.write(`newResult[${z}] = ${$}.value;`):b.write(`
        if (${$}.value !== undefined || ${M}) {
          newResult[${z}] = ${$}.value;
        }
      `)):b.write(`
        const ${$}_present = ${M};
        if (${$}.issues.length) {${C($,z)}
        }
        if (!${$}_present && !${$}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${z}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${$}_present) {
          newResult[${z}] = ${$}.value;
        }

      `)}return b.write("payload.value = newResult;"),b.write("return payload;"),b.compile()},a,l=it,c=!rn.jitless,d=c&&Mr.value,m=n.catchall,f;e._zod.parse=(p,y)=>{f??(f=o.value);let v=p.value;return l(v)?c&&d&&y?.async===!1&&y.jitless!==!0?(a||(a=i(n.shape)),p=a(p,y),m?ll([],v,p,y,f,e,y?.abortEarly===!0):p):t(p,y):(p.issues.push({expected:"object",code:"invalid_type",input:v,inst:e}),p)}});function ys(e,n,t,o){for(let i of e)if(i.issues.length===0)return n.value=i.value,n;let r=e.filter(i=>!xn(i));return r.length===1?(n.value=r[0].value,r[0]):(n.issues.push({code:"invalid_union",input:n.value,inst:t,errors:e.map(i=>i.issues.map(a=>_n(a,o,un())))}),n)}var ei=O("$ZodUnion",(e,n)=>{Se.init(e,n),fe(e,"optin",o=>o.def.options.some(r=>r._zod.optin==="defaulted")?"defaulted":o.def.options.some(r=>r._zod.optin!==void 0)?"optional":void 0),fe(e,"optout",o=>o.def.options.some(r=>r._zod.optout==="optional")?"optional":void 0),fe(e,"values",o=>{if(o.def.options.every(r=>r._zod.values))return new Set(o.def.options.flatMap(r=>Array.from(r._zod.values)))}),fe(e,"pattern",o=>{if(o.def.options.every(r=>r._zod.pattern)){let r=o.def.options.map(i=>i._zod.pattern);return new RegExp(`^(${r.map(i=>jt(i.source)).join("|")})$`)}});let t=n.options.length===1?n.options[0]._zod.run:null;e._zod.parse=(o,r)=>{if(t)return t(o,r);let i=!1,a=[];for(let l of n.options){let c=l._zod.run({value:o.value,issues:[]},r);if(c instanceof Promise)a.push(c),i=!0;else{if(c.issues.length===0)return c;a.push(c)}}return i?Promise.all(a).then(l=>ys(l,o,e,r)):ys(a,o,e,r)}});function pm(e){let n=new Map;for(let t of e.options){let o=t._zod.propValues?.[e.discriminator];if(!o||o.size===0)throw new Error(`Invalid discriminated union option at index "${e.options.indexOf(t)}"`);for(let r of o)if(n.has(r)){if(r!==void 0)throw new Error(`Duplicate discriminator value "${String(r)}"`);n.set(r,null)}else n.set(r,t)}return n}var ul=O("$ZodDiscriminatedUnion",(e,n)=>{n.inclusive=!1,ei.init(e,n);let t=e._zod.parse;fe(e,"propValues",r=>{let i={},a=0;for(let l of r.def.options){let c=l._zod.propValues;if(!c||Object.keys(c).length===0)throw new Error(`Invalid discriminated union option at index "${r.def.options.indexOf(l)}"`);c[r.def.discriminator]?.has(void 0)&&a++;for(let[u,d]of Object.entries(c)){Object.prototype.hasOwnProperty.call(i,u)||cn(i,u,new Set);for(let m of d)i[u].add(m)}}return!r.def.unionFallback&&a>1&&i[r.def.discriminator]?.delete(void 0),i}),n.options.forEach((r,i)=>{let a=yt(r._zod.def);if(a&&!Object.prototype.hasOwnProperty.call(a,n.discriminator))throw new Error(`Invalid discriminated union option at index "${i}"`)});let o=bt(()=>pm(n));e._zod.parse=(r,i)=>{let a=r.value;if(!it(a))return r.issues.push({code:"invalid_type",expected:"object",input:a,inst:e}),r;let l=a?.[n.discriminator],c=o.value.get(l);return c&&(l!==void 0||i.direction!=="backward")?c._zod.run(r,i):n.unionFallback||i.direction==="backward"?t(r,i):(r.issues.push({code:"invalid_union",errors:[],note:"No matching discriminator",discriminator:n.discriminator,options:Array.from(o.value.keys()).filter(u=>o.value.get(u)!==null),input:a,path:[n.discriminator],inst:e}),r)}}),dl=O("$ZodIntersection",(e,n)=>{Se.init(e,n),e._zod.parse=(t,o)=>{let r=t.value,i=n.left._zod.run({value:r,issues:[]},o),a=n.right._zod.run({value:r,issues:[]},o);return i instanceof Promise||a instanceof Promise?Promise.all([i,a]).then(([c,u])=>ws(t,c,u)):ws(t,i,a)}});function Jr(e,n){if(e===n)return{valid:!0,data:e};if(e instanceof Date&&n instanceof Date&&+e==+n)return{valid:!0,data:e};if(Wn(e)&&Wn(n)){let t=Object.keys(n),o=Object.keys(e).filter(i=>t.indexOf(i)!==-1),r={...e,...n};Object.prototype.hasOwnProperty.call(r,"__proto__")&&delete r.__proto__;for(let i of o){if(i==="__proto__")continue;let a=Jr(e[i],n[i]);if(!a.valid)return{valid:!1,mergeErrorPath:[i,...a.mergeErrorPath]};r[i]=a.data}return{valid:!0,data:r}}if(Array.isArray(e)&&Array.isArray(n)){if(e.length!==n.length)return{valid:!1,mergeErrorPath:[]};let t=[];for(let o=0;o<e.length;o++){let r=e[o],i=n[o],a=Jr(r,i);if(!a.valid)return{valid:!1,mergeErrorPath:[o,...a.mergeErrorPath]};t.push(a.data)}return{valid:!0,data:t}}return{valid:!1,mergeErrorPath:[]}}function ws(e,n,t){let o=new Map,r,i=new Map,a=(u,d)=>{let m;if(u.code==="unrecognized_keys"&&!u.path?.length)r??(r=u),m=u.keys;else if(u.code==="invalid_key"&&u.origin==="record"&&u.path?.length===1){let f=String(u.path[0]);i.has(f)||i.set(f,u),m=[f]}else return!1;for(let f of m)o.has(f)||o.set(f,{}),o.get(f)[d]=!0;return!0};for(let u of n.issues)a(u,"l")||e.issues.push(u);for(let u of t.issues)a(u,"r")||e.issues.push(u);let l=[...o].filter(([,u])=>u.l&&u.r).map(([u])=>u);if(l.length){let u=r?l.filter(d=>r.keys.includes(d)):[];u.length&&e.issues.push({...r,keys:u});for(let d of l)!u.includes(d)&&i.has(d)&&e.issues.push(i.get(d))}let c=Jr(n.value,t.value);if(!c.valid){if(xn(e))return e;throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(c.mergeErrorPath)}`)}return e.value=c.data,e}var pl=O("$ZodRecord",(e,n)=>{Se.init(e,n);let t=rn.memoizer;t?.attach(e),e._zod.parse=(o,r)=>{let i=o.value;if(!Wn(i))return o.issues.push({expected:"record",code:"invalid_type",input:i,inst:e}),o;let a=[],l=n.keyType._zod.values;if(l&&!n.partial){o.value=t?t.alloc(e,o,{},r):{};let c=new Set;for(let d of l)if(typeof d=="string"||typeof d=="number"||typeof d=="symbol"){if(c.add(typeof d=="number"?d.toString():d),d==="__proto__")continue;let m=n.keyType._zod.run({value:d,issues:[]},r);if(m instanceof Promise)throw new Error("Async schemas not supported in object keys currently");if(m.issues.length){o.issues.push({code:"invalid_key",origin:"record",issues:m.issues.map(y=>_n(y,r,un())),input:d,path:[d],inst:e});continue}let f=m.value;if(f==="__proto__")continue;let p=n.valueType._zod.run({value:i[d],issues:[]},r);p instanceof Promise?a.push(p.then(y=>{y.issues.length&&o.issues.push(...Rn(d,y.issues)),o.value[f]=y.value})):(p.issues.length&&o.issues.push(...Rn(d,p.issues)),o.value[f]=p.value)}let u;for(let d in i)if(!c.has(d))if(n.mode==="loose"){if(d==="__proto__")continue;o.value[d]=i[d]}else u=u??[],u.push(d);u&&u.length>0&&o.issues.push({code:"unrecognized_keys",input:i,inst:e,keys:u,continue:!0})}else{o.value=t?t.alloc(e,o,{},r):{};let c;for(let u of Reflect.ownKeys(i)){if(u==="__proto__"||!Object.prototype.propertyIsEnumerable.call(i,u))continue;let d=n.keyType._zod.run({value:u,issues:[]},r);if(d instanceof Promise)throw new Error("Async schemas not supported in object keys currently");if(typeof u=="string"&&Jt.test(u)&&d.issues.length){let y=n.keyType._zod.run({value:Number(u),issues:[]},r);if(y instanceof Promise)throw new Error("Async schemas not supported in object keys currently");y.issues.length===0&&(d=y)}if(d.issues.length){n.mode==="loose"?o.value[u]=i[u]:l?(c=c??[],c.push(u)):o.issues.push({code:"invalid_key",origin:"record",issues:d.issues.map(y=>_n(y,r,un())),input:u,path:[u],inst:e});continue}let f=d.value;if(f==="__proto__")continue;let p=n.valueType._zod.run({value:i[u],issues:[]},r);p instanceof Promise?a.push(p.then(y=>{y.issues.length&&o.issues.push(...Rn(u,y.issues)),o.value[f]=y.value})):(p.issues.length&&o.issues.push(...Rn(u,p.issues)),o.value[f]=p.value)}c&&c.length>0&&o.issues.push({code:"unrecognized_keys",input:i,inst:e,keys:c,continue:!0})}return a.length?Promise.all(a).then(()=>o):o}});var ml=O("$ZodEnum",(e,n)=>{Se.init(e,n);let t=gt(n.entries),o=new Set(t);e._zod.values=o,fe(e,"pattern",r=>{let i=gt(r.def.entries).filter(a=>$r.has(typeof a));return new RegExp(i.length?`^(${i.map(a=>On(a.toString())).join("|")})$`:"^[^\\s\\S]$")}),e._zod.parse=(r,i)=>{let a=r.value;return o.has(a)||r.issues.push({code:"invalid_value",values:t,input:a,inst:e}),r}}),fl=O("$ZodLiteral",(e,n)=>{Se.init(e,n);let t=new Set(n.values);e._zod.values=t,fe(e,"pattern",o=>{let r=o.def.values;return new RegExp(r.length?`^(${r.map(i=>typeof i=="string"?On(i):i?On(i.toString()):String(i)).join("|")})$`:"^[^\\s\\S]$")}),e._zod.parse=(o,r)=>{let i=o.value;return t.has(i)||o.issues.push({code:"invalid_value",values:n.values,input:i,inst:e}),o}});var hl=O("$ZodTransform",(e,n)=>{Se.init(e,n),e._zod.optin="optional",rn.memoizer?.guard(e),e._zod.parse=(t,o)=>{if(o.direction==="backward")throw new xt(e.constructor.name);let r=n.transform(t.value,t);if(o.async)return(r instanceof Promise?r:Promise.resolve(r)).then(a=>(t.value=a,t));if(r instanceof Promise)throw new kn;return t.value=r,t}});function xs(e,n){return e.value=n.issues.length?void 0:n.value,e}var ni=O("$ZodOptional",(e,n)=>{Se.init(e,n),fe(e,"optin",t=>t.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),e._zod.optout="optional",fe(e,"values",t=>{let o=t.def.innerType._zod.values;return o?new Set([...o,void 0]):void 0}),fe(e,"pattern",t=>{let o=t.def.innerType._zod.pattern;return o?new RegExp(`^(${jt(o.source)})?$`):void 0}),e._zod.parse=(t,o)=>{if(t.value===void 0){if(n.innerType._zod.optin!=="defaulted")return t;let r=n.innerType._zod.run({value:t.value,issues:[]},o);return r instanceof Promise?r.then(i=>xs(t,i)):xs(t,r)}return n.innerType._zod.run(t,o)}}),gl=O("$ZodExactOptional",(e,n)=>{ni.init(e,n),fe(e,"values",t=>t.def.innerType._zod.values),fe(e,"pattern",t=>t.def.innerType._zod.pattern),e._zod.parse=(t,o)=>n.innerType._zod.run(t,o)}),vl=O("$ZodNullable",(e,n)=>{Se.init(e,n),fe(e,"optin",t=>t.def.innerType._zod.optin),fe(e,"optout",t=>t.def.innerType._zod.optout),fe(e,"pattern",t=>{let o=t.def.innerType._zod.pattern;return o?new RegExp(`^(${jt(o.source)}|null)$`):void 0}),fe(e,"values",t=>t.def.innerType._zod.values?new Set([...t.def.innerType._zod.values,null]):void 0),e._zod.parse=(t,o)=>t.value===null?t:n.innerType._zod.run(t,o)}),bl=O("$ZodDefault",(e,n)=>{Se.init(e,n),e._zod.optin="defaulted",fe(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,o)=>{if(o.direction==="backward")return n.innerType._zod.run(t,o);if(t.value===void 0)return t.value=n.defaultValue,t;let r=n.innerType._zod.run(t,o);return r instanceof Promise?r.then(i=>_s(i,n)):_s(r,n)}});function _s(e,n){return e.value===void 0&&(e.value=n.defaultValue),e}var yl=O("$ZodPrefault",(e,n)=>{Se.init(e,n),e._zod.optin="defaulted",fe(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,o)=>(o.direction==="backward"||t.value===void 0&&(t.value=n.defaultValue),n.innerType._zod.run(t,o))}),wl=O("$ZodNonOptional",(e,n)=>{Se.init(e,n),fe(e,"values",t=>{let o=t.def.innerType._zod.values;return o?new Set([...o].filter(r=>r!==void 0)):void 0}),e._zod.parse=(t,o)=>{let r=n.innerType._zod.run(t,o);return r instanceof Promise?r.then(i=>ks(i,e)):ks(r,e)}});function ks(e,n){return!e.issues.length&&e.value===void 0&&e.issues.push({code:"invalid_type",expected:"nonoptional",input:e.value,inst:n}),e}function Ss(e,n,t,o){return n.issues.length?(e.value=t.catchValue({...n,value:e.value,error:{issues:n.issues.map(r=>_n(r,o,un()))},input:e.value}),e):(e.value=n.value,n.memo&&(e.memo=!0),e)}var xl=O("$ZodCatch",(e,n)=>{Se.init(e,n),fe(e,"optin",t=>t.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),fe(e,"optout",t=>t.def.innerType._zod.optout),fe(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,o)=>{if(o.direction==="backward")return n.innerType._zod.run(t,o);let r=n.innerType._zod.run({value:t.value,issues:[]},o);return r instanceof Promise?r.then(i=>Ss(t,i,n,o)):Ss(t,r,n,o)}});var _l=O("$ZodPipe",(e,n)=>{Se.init(e,n),fe(e,"values",t=>t.def.in._zod.values),fe(e,"optin",t=>t.def.in._zod.optin),fe(e,"optout",t=>t.def.out._zod.optout),fe(e,"propValues",t=>t.def.in._zod.propValues),e._zod.parse=(t,o)=>{if(o.direction==="backward"){let i=n.out._zod.run(t,o);return i instanceof Promise?i.then(a=>Bo(a,n.in,o)):Bo(i,n.in,o)}let r=n.in._zod.run(t,o);return r instanceof Promise?r.then(i=>Bo(i,n.out,o)):Bo(r,n.out,o)}});function Bo(e,n,t){return e.issues.some(o=>o.code!=="unrecognized_keys")?(e.aborted=!0,e):n._zod.run({value:e.value,issues:e.issues},t)}var kl=O("$ZodReadonly",(e,n)=>{Se.init(e,n),fe(e,"propValues",t=>t.def.innerType._zod.propValues),fe(e,"values",t=>t.def.innerType._zod.values),fe(e,"optin",t=>t.def.innerType?._zod?.optin),fe(e,"optout",t=>t.def.innerType?._zod?.optout),e._zod.parse=(t,o)=>{if(o.direction==="backward")return n.innerType._zod.run(t,o);let r=n.innerType._zod.run(t,o);return r instanceof Promise?r.then(zs):zs(r)}});function zs(e){return e.memo||(e.value=Object.freeze(e.value)),e}var Sl=O("$ZodLazy",(e,n)=>{Se.init(e,n),Nr(e._zod,"innerType",()=>{let t=n;return t._cachedInner||(t._cachedInner=n.getter()),t._cachedInner}),fe(e,"pattern",t=>t.innerType?._zod?.pattern),fe(e,"propValues",t=>t.innerType?._zod?.propValues),fe(e,"optin",t=>t.innerType?._zod?.optin??void 0),fe(e,"optout",t=>t.innerType?._zod?.optout??void 0),e._zod.parse=(t,o)=>e._zod.innerType._zod.run(t,o)}),zl=O("$ZodCustom",(e,n)=>{qe.init(e,n),Se.init(e,n),e._zod.parse=(t,o)=>t,e._zod.check=t=>{let o=t.value,r=n.fn(o);if(r instanceof Promise)return r.then(i=>As(i,t,o,e));As(r,t,o,e)}});function As(e,n,t,o){if(!e){let r={code:"custom",input:t,inst:o,path:[...o._zod.def.path??[]],continue:!o._zod.def.abort};o._zod.def.params&&(r.params=o._zod.def.params),n.issues.push(wt(r))}}var oi=class extends Error{constructor(){super("Cannot parse a reference cycle that closes through a transform"),this.name="ZodCyclicError"}},ri="~memo",Al=[];function Cl(e){return e!==null&&typeof e=="object"}function ti(e){return e.map(n=>n.path?{...n,path:n.path.slice()}:{...n})}var Pl=new WeakMap,Qt=0,qo=1,eo=2;function Wo(e,n,t){let o=Pl.get(e);if(o!==void 0)return o?eo:Qt;if(n.has(e))return eo;n.add(e);let r=Qt,i=d=>{if(r!==eo&&d?._zod){let m=Wo(d,n,t);m>r&&(r=m)}},a=(d,m)=>{let f=Qt;for(let p of Reflect.ownKeys(d)){let y=Object.getOwnPropertyDescriptor(d,p);if(m&&!y.enumerable)continue;let v=y.get?qo:y.value?._zod?Wo(y.value,n,t):Qt;v>f&&(f=v)}return f},l=d=>{d>r&&(r=d)},c=e._zod.def,u=c.type;switch(u){case"object":{let d=yt(c);l(d?a(d,!0):qo),i(c.catchall);break}case"array":i(c.element);break;case"tuple":for(let d of c.items)i(d);i(c.rest);break;case"record":case"map":i(c.keyType),i(c.valueType);break;case"set":i(c.valueType);break;case"union":for(let d of c.options)i(d);break;case"intersection":i(c.left),i(c.right);break;case"optional":case"nullable":case"default":case"prefault":case"catch":case"readonly":case"nonoptional":case"promise":case"success":i(c.innerType);break;case"pipe":i(c.in),i(c.out);break;case"function":i(c.input),i(c.output);break;case"lazy":{let d=c._cachedInner??(t?e._zod.innerType:void 0);l(d?Wo(d,n,!1):qo);break}case"template_literal":case"string":case"number":case"int":case"boolean":case"bigint":case"symbol":case"undefined":case"null":case"void":case"never":case"any":case"unknown":case"date":case"nan":case"enum":case"literal":case"file":case"transform":case"custom":break;default:for(let d in c){let m=Object.getOwnPropertyDescriptor(c,d);if(!m||m.get)continue;let f=m.value;if(!(!f||typeof f!="object")){if(f._zod)i(f);else if(Array.isArray(f))for(let p of f)i(p)}}}return n.delete(e),mm(e,r)}function mm(e,n){return n!==qo&&Pl.set(e,n===eo),n}function fm(e,n){let t=e.buckets.get(n);return t||(t=new WeakMap,e.buckets.set(n,t)),t}var jo,Go=[],hm={alloc(e,n,t){let o=jo;if(!o)return t;jo=void 0;let r={value:t,issues:null};return o.set(n.value,r),Go.push(r),t},guard(e){var n;(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred.push(()=>{let t=e._zod.parse,o=(r,i)=>{if(i.direction!=="backward"&&gm(i,r.value))throw new oi;return t(r,i)};e._zod.parse=o,e._zod.run===t&&(e._zod.run=o)})},attach(e){var n;let t,o=!1,r,i;(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred.push(()=>{let a=e._zod.parse,l=(c,u)=>{if(t===void 0){let x=Wo(e,new Set,!1);if(x===Qt)return e._zod.parse=a,e._zod.run===l&&(e._zod.run=a),a(c,u);x===eo||o?t=!0:o=!0}let d=c.value;if(!Cl(d))return a(c,u);let m=u[ri];m||(m={buckets:new WeakMap,backEdges:void 0},u[ri]=m);let f;r===u?f=i:(f=fm(m,e),r=u,i=f);let p=f.get(d);if(p)return c.value=p.value,p.issues?p.issues.length&&c.issues.push(...ti(p.issues)):(c.memo=!0,m.backEdges??(m.backEdges=new WeakSet),m.backEdges.add(p.value)),c;jo=f;let y=Go.length,v=a(c,u);jo=void 0;let b=Go.length>y?Go.pop():void 0;return v instanceof Promise?v.then(x=>(b&&(b.issues=x.issues.length?ti(x.issues):Al),x)):(b&&(b.issues=v.issues.length?ti(v.issues):Al),v)};e._zod.parse=l,e._zod.run===a&&(e._zod.run=l)})}};function Il(){return hm}function gm(e,n){let t=e[ri]?.backEdges;return t!==void 0&&Cl(n)&&t.has(n)}var vm=()=>{let e={string:{unit:"characters",verb:"to have"},file:{unit:"bytes",verb:"to have"},array:{unit:"items",verb:"to have"},set:{unit:"items",verb:"to have"},map:{unit:"entries",verb:"to have"}};function n(i){return e[i]??null}let t={regex:"input",email:"email address",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO datetime",date:"ISO date",time:"ISO time",duration:"ISO duration",ipv4:"IPv4 address",ipv6:"IPv6 address",mac:"MAC address",cidrv4:"IPv4 range",cidrv6:"IPv6 range",base64:"base64-encoded string",base64url:"base64url-encoded string",json_string:"JSON string",e164:"E.164 number",currency_code:"currency code",credit_card:"credit card number",iban:"IBAN",jwt:"JWT",template_literal:"input"},o={nan:"NaN"};function r(i,a){return i==="number"&&typeof a=="number"&&!Number.isFinite(a)?String(a):o[i]??i}return i=>{switch(i.code){case"invalid_type":{let a=r(i.expected),l=Dr(i.input),c=r(l,i.input);return`Invalid input: expected ${a}, received ${c}`}case"invalid_value":return i.values.length===1?`Invalid input: expected ${Po(i.values[0])}`:`Invalid option: expected one of ${Ao(i.values,"|")}`;case"too_big":{let a=i.exact?"exactly ":i.inclusive?"<=":"<",l=n(i.origin);return l?`Too big: expected ${i.origin??"value"} to have ${a}${i.maximum.toString()} ${l.unit??"elements"}`:`Too big: expected ${i.origin??"value"} to be ${a}${i.maximum.toString()}`}case"too_small":{let a=i.exact?"exactly ":i.inclusive?">=":">",l=n(i.origin);return l?`Too small: expected ${i.origin} to have ${a}${i.minimum.toString()} ${l.unit}`:`Too small: expected ${i.origin} to be ${a}${i.minimum.toString()}`}case"invalid_format":{let a=i;return a.format==="starts_with"?`Invalid string: must start with "${a.prefix}"`:a.format==="ends_with"?`Invalid string: must end with "${a.suffix}"`:a.format==="includes"?`Invalid string: must include "${a.includes}"`:a.format==="regex"?`Invalid string: must match pattern ${a.pattern}`:`Invalid ${t[a.format]??i.format}`}case"not_multiple_of":return`Invalid number: must be a multiple of ${i.divisor}`;case"unrecognized_keys":return`Unrecognized key${i.keys.length>1?"s":""}: ${Ao(i.keys,", ")}`;case"invalid_key":return`Invalid key in ${i.origin}`;case"invalid_union":return i.options&&Array.isArray(i.options)&&i.options.length>0?`Invalid discriminator value. Expected ${i.options.map(l=>`'${l}'`).join(" | ")}`:i.inclusive===!1?"Invalid input: more than one option matched":"Invalid input";case"invalid_element":return`Invalid value in ${i.origin}`;default:return"Invalid input"}}};function Nl(){return{localeError:vm()}}var El;var ii=class{constructor(){this._map=new WeakMap,this._idmap=new Map}add(n,...t){let o=t[0];return this._map.set(n,o),o&&typeof o=="object"&&"id"in o&&this._idmap.set(o.id,n),this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(n){let t=this._map.get(n);return t&&typeof t=="object"&&"id"in t&&this._idmap.delete(t.id),this._map.delete(n),this}get(n){let t=n._zod.parent;if(t){let o={...this.get(t)??{}};delete o.id;let r={...o,...this._map.get(n)};return Object.keys(r).length?r:void 0}return this._map.get(n)}has(n){return this._map.has(n)}};function bm(){return new ii}(El=globalThis).__zod_globalRegistry??(El.__zod_globalRegistry=bm());var at=globalThis.__zod_globalRegistry;function Tl(e){return e.checks&&(e.checks=[...e.checks]),e}function Ml(e,n){return new e(Tl({type:"string",...te(n)}))}function $l(e,n){return new e({type:"string",format:"email",check:"string_format",abort:!1,...te(n)})}function Ol(e,n){return new e({type:"string",format:"guid",check:"string_format",abort:!1,...te(n)})}function Rl(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,...te(n)})}function Dl(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v4",...te(n)})}function Vl(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v6",...te(n)})}function Zl(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v7",...te(n)})}function Bl(e,n){return new e({type:"string",format:"url",check:"string_format",abort:!1,...te(n)})}function Fl(e,n){return new e({type:"string",format:"emoji",check:"string_format",abort:!1,...te(n)})}function Ul(e,n){return new e({type:"string",format:"nanoid",check:"string_format",abort:!1,...te(n)})}function Ll(e,n){return new e({type:"string",format:"cuid",check:"string_format",abort:!1,...te(n)})}function Hl(e,n){return new e({type:"string",format:"cuid2",check:"string_format",abort:!1,...te(n)})}function jl(e,n){return new e({type:"string",format:"ulid",check:"string_format",abort:!1,...te(n)})}function Gl(e,n){return new e({type:"string",format:"xid",check:"string_format",abort:!1,...te(n)})}function ql(e,n){return new e({type:"string",format:"ksuid",check:"string_format",abort:!1,...te(n)})}function Wl(e,n){return new e({type:"string",format:"ipv4",check:"string_format",abort:!1,...te(n)})}function Kl(e,n){return new e({type:"string",format:"ipv6",check:"string_format",abort:!1,...te(n)})}function Jl(e,n){return new e({type:"string",format:"cidrv4",check:"string_format",abort:!1,...te(n)})}function Xl(e,n){return new e({type:"string",format:"cidrv6",check:"string_format",abort:!1,...te(n)})}function Yl(e,n){return new e({type:"string",format:"base64",check:"string_format",abort:!1,...te(n)})}function Ql(e,n){return new e({type:"string",format:"base64url",check:"string_format",abort:!1,...te(n)})}function ec(e,n){return new e({type:"string",format:"e164",check:"string_format",abort:!1,...te(n)})}function nc(e,n){return new e({type:"string",format:"jwt",check:"string_format",abort:!1,...te(n)})}function tc(e,n){return new e({type:"string",format:"datetime",check:"string_format",offset:!1,local:!1,precision:null,...te(n)})}function oc(e,n){return new e({type:"string",format:"date",check:"string_format",...te(n)})}function rc(e,n){return new e({type:"string",format:"time",check:"string_format",precision:null,...te(n)})}function ic(e,n){return new e({type:"string",format:"duration",check:"string_format",...te(n)})}function ac(e,n){return new e(Tl({type:"number",checks:[],...te(n)}))}function sc(e,n){return new e({type:"number",check:"number_format",abort:!1,format:"safeint",...te(n)})}function lc(e,n){return new e({type:"boolean",...te(n)})}function cc(e,n){return new e({type:"null",...te(n)})}function uc(e){return new e({type:"unknown"})}function dc(e,n){return new e({type:"never",...te(n)})}function Ko(e,n){return new Wr({check:"less_than",...te(n),value:e,inclusive:!1})}function no(e,n){return new Wr({check:"less_than",...te(n),value:e,inclusive:!0})}function Jo(e,n){return new Kr({check:"greater_than",...te(n),value:e,inclusive:!1})}function to(e,n){return new Kr({check:"greater_than",...te(n),value:e,inclusive:!0})}function Xo(e,n){return new os({check:"multiple_of",...te(n),value:e})}function Yo(e,n){return new is({check:"max_length",...te(n),maximum:e})}function _t(e,n){return new as({check:"min_length",...te(n),minimum:e})}function Qo(e,n){return new ss({check:"length_equals",...te(n),length:e})}function ai(e,n){return new ls({check:"string_format",format:"regex",...te(n),pattern:e})}function si(e){return new cs({check:"string_format",format:"lowercase",...te(e)})}function li(e){return new us({check:"string_format",format:"uppercase",...te(e)})}function ci(e,n){return new ds({check:"string_format",format:"includes",...te(n),includes:e})}function ui(e,n){return new ps({check:"string_format",format:"starts_with",...te(n),prefix:e})}function di(e,n){return new ms({check:"string_format",format:"ends_with",...te(n),suffix:e})}function Kn(e){return new fs({check:"overwrite",tx:e})}function pi(e){return Kn(n=>n.normalize(e))}function mi(){return Kn(e=>e.trim())}function fi(){return Kn(e=>e.toLowerCase())}function hi(){return Kn(e=>e.toUpperCase())}function gi(){return Kn(e=>Tr(e))}function pc(e,n,t){return new e({type:"array",element:n,...te(t)})}function mc(e,n,t){return new e({type:"custom",check:"custom",fn:n,...te(t)})}function fc(e,n){let t=ym(o=>(o.addIssue=r=>{if(typeof r=="string")o.issues.push(wt(r,o.value,t._zod.def));else{let i=r;i.fatal&&(i.continue=!1),i.code??(i.code="custom"),"input"in i||(i.input=o.value),i.inst??(i.inst=t),i.continue??(i.continue=!t._zod.def.abort),o.issues.push(wt(i))}},e(o.value,o)),n);return t}function ym(e,n){let t=new qe({check:"custom",...te(n)});return t._zod.check=e,t}function oo(e,...n){for(let t of n)for(let o of Reflect.ownKeys(t))Object.prototype.propertyIsEnumerable.call(t,o)&&cn(e,o,t[o]);return e}function bi(e){let n=e?.target??"draft-2020-12";return n==="draft-4"&&(n="draft-04"),n==="draft-7"&&(n="draft-07"),{processors:e.processors??{},metadataRegistry:e?.metadata??at,target:n,unrepresentable:e?.unrepresentable??"throw",override:e?.override??(()=>{}),io:e?.io??"output",counter:0,seen:new Map,sharedDefsExtractedFor:void 0,sharedEmitDoneFor:void 0,cycles:e?.cycles??"ref",reused:e?.reused??"inline",intersections:[],deferred:[],external:e?.external??void 0}}function Dn(e,n,t,o,r){let i=typeof n.unrepresentable=="function"?n.unrepresentable({zodSchema:e,path:o.path,message:r}):n.unrepresentable;if(i==="any")return!1;if(i===void 0||i==="throw")throw new Error(r);return Object.assign(t,i),!0}function Te(e,n,t={path:[],schemaPath:[]}){var o;let r=e._zod.def,i=n.seen.get(e);if(i)return i.count++,t.schemaPath.includes(e)&&(i.cycle=t.path),i.schema;let a={schema:{},count:1,cycle:void 0,path:t.path};n.seen.set(e,a),n.sharedDefsExtractedFor=void 0,n.sharedEmitDoneFor=void 0;let l=e._zod.toJSONSchema?.();if(l)a.schema=l;else{let d={...t,schemaPath:[...t.schemaPath,e],path:t.path};if(e._zod.processJSONSchema)e._zod.processJSONSchema(n,a.schema,d);else{let f=a.schema,p=n.processors[r.type];if(!p)throw new Error(`[toJSONSchema]: Non-representable type encountered: ${r.type}`);p(e,n,f,d)}let m=e._zod.parent;m&&(a.ref||(a.ref=m),Te(m,n,d),n.seen.get(m).isParent=!0)}let c=n.metadataRegistry.get(e);return c&&oo(a.schema,c),n.io==="input"&&en(e)&&(delete a.schema.examples,delete a.schema.default),n.io==="input"&&"_prefault"in a.schema&&((o=a.schema).default??(o.default=a.schema._prefault)),delete a.schema._prefault,n.seen.get(e).schema}function hc(e){return e.replace(/~/g,"~0").replace(/\//g,"~1")}function yi(e,n){let t=e.seen.get(n);if(!t)throw new Error("Unprocessed schema. This is a bug in Zod.");if(e.external&&e.sharedDefsExtractedFor===e.external)return;let o=new Map;for(let a of e.seen.entries()){let l=e.metadataRegistry.get(a[0])?.id;if(l){let c=o.get(l);if(c&&c!==a[0])throw new Error(`Duplicate schema id "${l}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);o.set(l,a[0])}}let r=a=>{let l=e.target==="draft-2020-12"?"$defs":"definitions";if(e.external){let m=e.external.registry.get(a[0])?.id,f=e.external.uri??(y=>y);if(m)return{ref:f(m)};let p=a[1].defId??a[1].schema.id??`schema${e.counter++}`;return a[1].defId=p,{defId:p,ref:`${f("__shared")}#/${l}/${hc(p)}`}}let c="#",u=`${c}/${l}/`;if(a[1]===t&&!a[1].schema.id)return{ref:c};let d=a[1].schema.id??`__schema${e.counter++}`;return{defId:d,ref:u+hc(d)}},i=a=>{if(a[1].schema.$ref)return;let l=a[1],{ref:c,defId:u}=r(a);l.def={...l.schema},u&&(l.defId=u);let d=l.schema;for(let m in d)delete d[m];d.$ref=c};if(e.cycles==="throw")for(let a of e.seen.entries()){let l=a[1];if(l.cycle)throw new Error(`Cycle detected: #/${l.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`)}for(let a of e.seen.entries()){let l=a[1];if(n===a[0]){i(a);continue}if(e.external){let u=e.external.registry.get(a[0])?.id;if(n!==a[0]&&u){i(a);continue}}if(e.metadataRegistry.get(a[0])?.id){i(a);continue}if(l.cycle){i(a);continue}l.count>1&&e.reused==="ref"&&i(a)}e.external&&(e.sharedDefsExtractedFor=e.external)}function bc(e){let n=e.anyOf;if(!Array.isArray(n)||n.length===0||e.type!==void 0)return;let t=[];for(let o of n){if(!o||typeof o!="object")return;bc(o);let r=Object.keys(o);if(r.length!==1||r[0]!=="type")return;let i=o.type;for(let a of Array.isArray(i)?i:[i]){if(typeof a!="string")return;t.includes(a)||t.push(a)}}delete e.anyOf,e.type=t.length===1?t[0]:t}var yc=new Set(["type","properties","required","additionalProperties"]),gc=["oneOf","anyOf"];function vc(e){let n=e.additionalProperties;return n===void 0||n===!1||typeof n!="object"||n===null?null:Object.keys(n).length?n:null}function vi(e){let n=[];for(let i of e){if(typeof i!="object"||i.type!=="object")return null;for(let a in i)if(!yc.has(a))return null;n.push(i)}let t={},o=new Set;for(let i of n){for(let a in i.properties){if(Object.prototype.hasOwnProperty.call(t,a))continue;let l=[];for(let u of n){let d=u.properties?.[a]??vc(u);d!=null&&(l.some(m=>JSON.stringify(m)===JSON.stringify(d))||l.push(d))}let c=l.length===1?l[0]:vi(l)??{allOf:l};cn(t,a,c)}for(let a of i.required??[])o.add(a)}let r={type:"object",properties:t};if(o.size&&(r.required=[...o]),n.every(i=>i.additionalProperties===!1))r.additionalProperties=!1;else{let i=[];for(let a of n){let l=vc(a);l&&!i.some(c=>JSON.stringify(c)===JSON.stringify(l))&&i.push(l)}i.length===1?r.additionalProperties=i[0]:i.length>1&&(r.additionalProperties={allOf:i})}return r}function wm(e){let n=e.allOf;if(!Array.isArray(n)||n.length<2)return;for(let r of yc)if(r in e)return;let t=n.filter(r=>gc.some(i=>Array.isArray(r[i]))),o=null;if(!t.length)o=vi(n);else{let r=t[0],i=gc.find(c=>Array.isArray(r[c]));if(Object.keys(r).length!==1)return;let a=n.filter(c=>c!==r),l=r[i].map(c=>vi([...a,c]));if(l.some(c=>!c))return;o={[i]:l}}o&&(delete e.allOf,oo(e,o))}function wi(e,n){let t=e.seen.get(n);if(!t)throw new Error("Unprocessed schema. This is a bug in Zod.");let o=l=>{let c=e.seen.get(l);if(c.ref===null)return;let u=c.def??c.schema,d={...u},m=c.ref;if(c.ref=null,m){o(m);let p=e.seen.get(m),y=p.schema;if(y.$ref&&(e.target==="draft-07"||e.target==="draft-04"||e.target==="openapi-3.0")?(u.allOf=u.allOf??[],u.allOf.push(y)):oo(u,y),oo(u,d),l._zod.parent===m)for(let b in u)b==="$ref"||b==="allOf"||b in d||delete u[b];if(y.$ref&&p.def)for(let b in u)b==="$ref"||b==="allOf"||b in p.def&&JSON.stringify(u[b])===JSON.stringify(p.def[b])&&delete u[b]}let f=l._zod.parent;if(f&&f!==m){o(f);let p=e.seen.get(f);if(p?.schema.$ref&&(u.$ref=p.schema.$ref,p.def))for(let y in u)y==="$ref"||y==="allOf"||y in p.def&&JSON.stringify(u[y])===JSON.stringify(p.def[y])&&delete u[y]}e.override({zodSchema:l,jsonSchema:u,path:c.path??[]})};if(!e.external||e.sharedEmitDoneFor!==e.external){for(let l of[...e.seen.entries()].reverse())o(l[0]);if(e.target!=="openapi-3.0")for(let l of e.seen.entries())bc(l[1].def??l[1].schema);for(let l of e.deferred)l();if(e.intersections.length){let l=new Map;for(let c of e.seen.values())for(let u of[c.schema,c.def]){let d=u?.allOf;if(!Array.isArray(d))continue;let m=l.get(d);m?m.push(u):l.set(d,[u])}for(let c of e.intersections)for(let u of l.get(c)??[])wm(u)}}let r={};if(e.target==="draft-2020-12"?r.$schema="https://json-schema.org/draft/2020-12/schema":e.target==="draft-07"?r.$schema="http://json-schema.org/draft-07/schema#":e.target==="draft-04"?r.$schema="http://json-schema.org/draft-04/schema#":e.target,e.external?.uri){let l=e.external.registry.get(n)?.id;if(!l)throw new Error("Schema is missing an `id` property");r.$id=e.external.uri(l)}oo(r,t.defId?t.schema:t.def??t.schema);let i=e.metadataRegistry.get(n)?.id;i!==void 0&&r.id===i&&delete r.id;let a=e.external?.defs??{};if(!e.external||e.sharedEmitDoneFor!==e.external)for(let l of e.seen.entries()){let c=l[1];c.def&&c.defId&&(c.def.id===c.defId&&delete c.def.id,cn(a,c.defId,c.def))}e.external&&(e.sharedEmitDoneFor=e.external),e.external||Object.keys(a).length>0&&(e.target==="draft-2020-12"?r.$defs=a:r.definitions=a);try{let l=JSON.parse(JSON.stringify(r));return Object.defineProperty(l,"~standard",{value:{...n["~standard"],jsonSchema:{input:ro(n,"input",e.processors),output:ro(n,"output",e.processors)}},enumerable:!1,writable:!1}),l}catch{throw new Error("Error converting schema to JSON.")}}function en(e,n){let t=n??{seen:new Set};if(t.seen.has(e))return!1;t.seen.add(e);let o=e._zod.def;if(o.type==="transform")return!0;if(o.type==="array")return en(o.element,t);if(o.type==="set")return en(o.valueType,t);if(o.type==="lazy")return en(o.getter(),t);if(o.type==="promise"||o.type==="optional"||o.type==="nonoptional"||o.type==="nullable"||o.type==="readonly"||o.type==="default"||o.type==="prefault"||o.type==="catch")return en(o.innerType,t);if(o.type==="intersection")return en(o.left,t)||en(o.right,t);if(o.type==="record"||o.type==="map")return en(o.keyType,t)||en(o.valueType,t);if(o.type==="pipe")return e._zod.traits.has("$ZodCodec")?!0:en(o.in,t)||en(o.out,t);if(o.type==="object"){for(let r in o.shape)if(en(o.shape[r],t))return!0;return!1}if(o.type==="union"){for(let r of o.options)if(en(r,t))return!0;return!1}if(o.type==="tuple"){for(let r of o.items)if(en(r,t))return!0;return!!(o.rest&&en(o.rest,t))}return!1}var wc=(e,n={})=>t=>{let o=bi({...t,processors:n});return Te(e,o),yi(o,e),wi(o,e)},ro=(e,n,t={})=>o=>{let{libraryOptions:r,target:i}=o??{},a=bi({...r??{},target:i,io:n,processors:t});return Te(e,a),yi(a,e),wi(a,e)};var kt=(e,n,t)=>{(e[n]===void 0||t>e[n])&&(e[n]=t)},St=(e,n,t)=>{(e[n]===void 0||t<e[n])&&(e[n]=t)},xc=(e,n)=>{kt(e,"minimum",n),St(e,"maximum",n)},zc=(e,n)=>{e.multipleOf??(e.multipleOf=[]),e.multipleOf.includes(n)||e.multipleOf.push(n)},Ac=(e,n)=>{e.patterns??(e.patterns=new Set),e.patterns.add(n)},Cc=(e,n)=>{e.mime=e.mime?e.mime.filter(t=>n.includes(t)):[...n]},Pc=(e,n)=>{e.format=n,n.includes("int")&&(e.isInt=!0)},_c=(e,n)=>kt(e,"minimum",n.minimum),kc=(e,n)=>St(e,"maximum",n.maximum),Sc=e=>(n,t)=>{Pc(n,t.format);let[o,r]=e[t.format];kt(n,"minimum",o),St(n,"maximum",r)},xm={greater_than:(e,n)=>kt(e,n.inclusive?"minimum":"exclusiveMinimum",n.value),less_than:(e,n)=>St(e,n.inclusive?"maximum":"exclusiveMaximum",n.value),multiple_of:(e,n)=>zc(e,n.value),number_format:Sc(Gt),bigint_format:Sc(Io),min_length:_c,max_length:kc,length_equals:(e,n)=>xc(e,n.length),min_size:_c,max_size:kc,size_equals:(e,n)=>xc(e,n.size),string_format:(e,n)=>{Pc(e,n.format),n.pattern&&Ac(e,n.pattern),(n.format==="base64"||n.format==="base64url")&&(e.contentEncoding=n.format),(n.local||n.precision===-1)&&(e.laxFormat=!0)},mime_type:(e,n)=>Cc(e,n.mime)};function hn(e){let n={},t=e._zod.def,o=e._zod.traits.has("$ZodCheck")?[e,...t.checks??[]]:t.checks??[];for(let i of o)xm[i._zod.def.check]?.(n,i._zod.def);let r=e._zod.bag;r.minimum!==void 0&&kt(n,"minimum",r.minimum),r.exclusiveMinimum!==void 0&&kt(n,"exclusiveMinimum",r.exclusiveMinimum),r.maximum!==void 0&&St(n,"maximum",r.maximum),r.exclusiveMaximum!==void 0&&St(n,"exclusiveMaximum",r.exclusiveMaximum),r.multipleOf!==void 0&&zc(n,r.multipleOf),r.format!==void 0&&(n.format??(n.format=r.format),r.format.includes("int")&&(n.isInt=!0)),r.mime&&Cc(n,r.mime);for(let i of r.patterns??[])Ac(n,i);return n}var _m={guid:"uuid",url:"uri",datetime:"date-time",json_string:"json-string",regex:""},km=new Map([[Yr,Ha],[Ho,ja]]),Ic=e=>km.get(e)??e,Nc=(e,n,t,o)=>{let r=t;r.type="string";let{minimum:i,maximum:a,format:l,patterns:c,contentEncoding:u,laxFormat:d}=hn(e);if(typeof i=="number"&&(r.minLength=i),typeof a=="number"&&(r.maxLength=a),l&&(r.format=_m[l]??l,r.format===""&&delete r.format,(l==="time"||d)&&delete r.format),u&&(r.contentEncoding=u),c&&c.size>0){let m=[...c].map(Ic);m.length===1?r.pattern=m[0].source:m.length>1&&(r.allOf=[...m.map(f=>({...n.target==="draft-07"||n.target==="draft-04"||n.target==="openapi-3.0"?{type:"string"}:{},pattern:f.source}))])}},Ec=(e,n,t,o)=>{let r=t,{minimum:i,maximum:a,multipleOf:l,exclusiveMaximum:c,exclusiveMinimum:u,isInt:d}=hn(e);r.type=d?"integer":"number";let m=typeof u=="number"&&u>=(i??Number.NEGATIVE_INFINITY),f=typeof c=="number"&&c<=(a??Number.POSITIVE_INFINITY),p=n.target==="draft-04"||n.target==="openapi-3.0";if(m?p?(r.minimum=u,r.exclusiveMinimum=!0):r.exclusiveMinimum=u:typeof i=="number"&&(r.minimum=i),f?p?(r.maximum=c,r.exclusiveMaximum=!0):r.exclusiveMaximum=c:typeof a=="number"&&(r.maximum=a),l){let y=new Set;for(let x of l)Number.isFinite(x)&&x!==0?y.add(Math.abs(x)):Dn(e,n,r,o,`A multipleOf divisor of ${x} cannot be represented in JSON Schema`);let[v,...b]=y;v!==void 0&&(r.multipleOf=v),b.length&&(r.allOf=[...r.allOf??[],...b.map(x=>({multipleOf:x}))])}},Tc=(e,n,t,o)=>{t.type="boolean"};var Mc=(e,n,t,o)=>{n.target==="openapi-3.0"?(t.type="string",t.nullable=!0,t.enum=[null]):t.type="null"};var $c=(e,n,t,o)=>{t.not={}};var Oc=(e,n,t,o)=>{};var Rc=(e,n,t,o)=>{let r=e._zod.def,i=gt(r.entries);if(i.length===0){t.not={};return}i.every(a=>typeof a=="number")&&(t.type="number"),i.every(a=>typeof a=="string")&&(t.type="string"),t.enum=i},Dc=(e,n,t,o)=>{let r=e._zod.def;if(r.values.length===0){t.not={};return}let i=[];for(let a of r.values)if(a===void 0){if(Dn(e,n,t,o,"Literal `undefined` cannot be represented in JSON Schema"))return}else if(typeof a=="bigint"){if(Dn(e,n,t,o,"BigInt literals cannot be represented in JSON Schema"))return;i.push(Number(a))}else i.push(a);if(i.length!==0)if(i.length===1){let a=i[0];t.type=a===null?"null":typeof a,n.target==="draft-04"||n.target==="openapi-3.0"?t.enum=[a]:t.const=a}else i.every(a=>typeof a=="number")&&(t.type="number"),i.every(a=>typeof a=="string")&&(t.type="string"),i.every(a=>typeof a=="boolean")&&(t.type="boolean"),i.every(a=>a===null)&&(t.type="null"),t.enum=i};var Vc=(e,n,t,o)=>{Dn(e,n,t,o,"Custom types cannot be represented in JSON Schema")};var Zc=(e,n,t,o)=>{Dn(e,n,t,o,"Transforms cannot be represented in JSON Schema")};var Bc=(e,n,t,o)=>{let r=t,i=e._zod.def,{minimum:a,maximum:l}=hn(e);typeof a=="number"&&(r.minItems=a),typeof l=="number"&&(r.maxItems=l),r.type="array",r.items=Te(i.element,n,{...o,path:[...o.path,"items"]})};function er(e){let n=e._zod.def;return n.type==="pipe"&&n.in._zod.traits.has("$ZodTransform")?er(n.out):n.type==="catch"?er(n.innerType):e._zod.optin}var Fc=(e,n,t,o)=>{let r=t,i=e._zod.def,a=i.shape;if(Object.getOwnPropertySymbols(a).length&&Dn(e,n,r,o,"Symbol keys cannot be represented in JSON Schema"))return;r.type="object",r.properties={};for(let u in a)cn(r.properties,u,Te(a[u],n,{...o,path:[...o.path,"properties",u]}));let c=[];for(let u of Object.keys(a)){let d=i.shape[u];(n.io==="input"?er(d)===void 0:d._zod.optout===void 0)&&c.push(u)}c.length>0&&(r.required=c),i.catchall?._zod.def.type==="never"?r.additionalProperties=!1:i.catchall?i.catchall&&(r.additionalProperties=Te(i.catchall,n,{...o,path:[...o.path,"additionalProperties"]})):n.io==="output"&&(r.additionalProperties=!1)},Uc=(e,n,t,o)=>{let r=e._zod.def,i=r.inclusive===!1,a=r.options.map((l,c)=>Te(l,n,{...o,path:[...o.path,i?"oneOf":"anyOf",c]}));i?t.oneOf=a:t.anyOf=a},Lc=(e,n,t,o)=>{let r=e._zod.def,i=Te(r.left,n,{...o,path:[...o.path,"allOf",0]}),a=Te(r.right,n,{...o,path:[...o.path,"allOf",1]}),l=u=>"allOf"in u&&Object.keys(u).length===1,c=[...l(i)?i.allOf:[i],...l(a)?a.allOf:[a]];t.allOf=c,n.intersections.push(c)};function xi(e,n,t){if(n.$ref){if(t.has(n))return n;t.add(n);let y=e.get(n)?.def;if(!y)return n;let v=xi(e,y,t);return v===y?n:v}for(let y of["anyOf","oneOf"]){let v=n[y];if(!Array.isArray(v))continue;let b=v.map(x=>xi(e,x,t));b.some((x,C)=>x!==v[C])&&(n={...n,[y]:b})}let o=Array.isArray(n.type)?n.type:[n.type],r=!o.includes("string")&&o.some(y=>y==="number"||y==="integer"),i=n.enum??(n.const!==void 0?[n.const]:void 0);if(!r&&!i?.some(y=>typeof y=="number"))return n;let{minimum:a,maximum:l,exclusiveMinimum:c,exclusiveMaximum:u,multipleOf:d,format:m,id:f,...p}=n;return p.enum?p.enum=p.enum.map(y=>typeof y=="number"?String(y):y):typeof p.const=="number"&&(p.const=String(p.const)),r&&(p.type="string",i||(p.pattern=(o.includes("number")?Jt:Gr).source)),p}var _i=new WeakMap;function Sm(e){let n=new Map;for(let o of e.seen.values())o.def&&!n.has(o.schema)&&n.set(o.schema,o);let t=new Map;for(let o of _i.get(e)??[]){let r=e.seen.get(o),i=(r?.def??r?.schema)?.propertyNames;if(!i||i===!0||t.has(i))continue;let a=xi(n,i,new Set);a!==i&&t.set(i,a)}if(t.size)for(let o of e.seen.values())for(let r of[o.schema,o.def]){let i=r&&t.get(r.propertyNames);i&&(r.propertyNames=i)}}var Hc=(e,n,t,o)=>{let r=t,i=e._zod.def;r.type="object";let a=i.keyType,l=hn(a).patterns;if(i.mode==="loose"&&l&&l.size>0){let d=Te(i.valueType,n,{...o,path:[...o.path,"patternProperties","*"]});r.patternProperties={};for(let m of l)cn(r.patternProperties,Ic(m).source,d)}else{if(n.target==="draft-07"||n.target==="draft-2020-12"){r.propertyNames=Te(i.keyType,n,{...o,path:[...o.path,"propertyNames"]});let d=_i.get(n);d||(d=[],_i.set(n,d),n.deferred.push(()=>Sm(n))),d.push(e)}r.additionalProperties=Te(i.valueType,n,{...o,path:[...o.path,"additionalProperties"]})}let c=a._zod.values,u=n.io==="input"&&er(i.valueType)!==void 0;if(c&&!i.partial&&!u){let d=[...c].filter(m=>typeof m=="string"||typeof m=="number");d.length>0&&(r.required=d.map(String))}},jc=(e,n,t,o)=>{let r=e._zod.def,i=Te(r.innerType,n,o),a=n.seen.get(e);n.target==="openapi-3.0"?(a.ref=r.innerType,t.nullable=!0):t.anyOf=[i,{type:"null"}]},Gc=(e,n,t,o)=>{let r=e._zod.def;Te(r.innerType,n,o);let i=n.seen.get(e);i.ref=r.innerType},ki=Symbol();function qc(e,n,t,o,r){let i=!1,a=JSON.stringify(e,(l,c)=>typeof c!="bigint"?c:(i=!0,null));return i?(Dn(n,t,o,r,"BigInt defaults cannot be represented in JSON Schema"),ki):JSON.parse(a)}var Wc=(e,n,t,o)=>{let r=e._zod.def;Te(r.innerType,n,o);let i=n.seen.get(e);i.ref=r.innerType;let a=qc(r.defaultValue,e,n,t,o);a!==ki&&(t.default=a)},Kc=(e,n,t,o)=>{let r=e._zod.def;Te(r.innerType,n,o);let i=n.seen.get(e);if(i.ref=r.innerType,n.io!=="input")return;let a=qc(r.defaultValue,e,n,t,o);a!==ki&&(t._prefault=a)},Jc=(e,n,t,o)=>{let r=e._zod.def;Te(r.innerType,n,o);let i=n.seen.get(e);i.ref=r.innerType;let a;try{a=r.catchValue(void 0)}catch{Dn(e,n,t,o,"Dynamic catch values are not supported in JSON Schema");return}t.default=a},Xc=(e,n,t,o)=>{let r=e._zod.def,i=r.in._zod.traits.has("$ZodTransform"),a=n.io==="input"?i?r.out:r.in:r.out;Te(a,n,o);let l=n.seen.get(e);l.ref=a},Yc=(e,n,t,o)=>{let r=e._zod.def;Te(r.innerType,n,o);let i=n.seen.get(e);i.ref=r.innerType,t.readOnly=!0};var Si=(e,n,t,o)=>{let r=e._zod.def;Te(r.innerType,n,o);let i=n.seen.get(e);i.ref=r.innerType},Qc=(e,n,t,o)=>{let r=e._zod.innerType;Te(r,n,o);let i=n.seen.get(e);i.ref=r};var eu=new WeakSet([Object.prototype,Error.prototype]);function nr(e,n,t){Object.defineProperty(e,n,{configurable:!0,enumerable:!1,get(){let o=t(this);return Object.defineProperty(this,n,{value:o,configurable:!0,writable:!0}),o},set(o){Object.defineProperty(this,n,{value:o,configurable:!0,writable:!0})}})}var Tm=(e,n)=>{va.init(e,n),e.name="ZodError";let t=Object.getPrototypeOf(e);eu.has(t)||(eu.add(t),nr(t,"format",o=>r=>ya(o,r)),nr(t,"flatten",o=>r=>ba(o,r)),nr(t,"addIssue",o=>r=>{o.issues.push(r),o.message=JSON.stringify(o.issues,vt,2)}),nr(t,"addIssues",o=>r=>{o.issues.push(...r),o.message=JSON.stringify(o.issues,vt,2)}),Object.defineProperty(t,"isEmpty",{configurable:!0,enumerable:!1,get(){return this.issues.length===0}}))};var dn=O("ZodError",Tm,void 0,{Parent:Error});var nu=$o(dn),tu=Oo(dn),ou=Ro(dn),ru=Do(dn),iu=xa(dn),au=_a(dn),su=ka(dn),lu=Sa(dn),cu=za(dn),uu=Aa(dn),du=Ca(dn),pu=Pa(dn);function $m(){rn.localeError||un(Nl())}function or(){rn.memoizer||un({memoizer:Il()})}var Ce=O("ZodType",(e,n)=>($m(),Se.init(e,n),e.def=n,e.type=n.type,e),{check(...e){let n=this.def;return this.clone(ie.mergeDefs(n,{checks:[...n.checks??[],...e.map(t=>typeof t=="function"?{_zod:{check:t,def:{check:"custom"},onattach:[]}}:t)]}),{parent:!0})},with(...e){return this.check(...e)},clone(e,n){return wn(this,e,n)},brand(){return this},register(e,n){return e.add(this,n),this},refine(e,n){return this.check(Mf(e,n))},superRefine(e,n){return this.check($f(e,n))},overwrite(e){return this.check(Kn(e))},optional(){return gu(this)},exactOptional(){return bf(this)},nullable(){return vu(this)},nullish(){return gu(vu(this))},nonoptional(e){return Sf(this,e)},array(){return ze(this)},or(e){return zt([this,e])},and(e){return ff(this,e)},transform(e){return bu(this,vf(e))},default(e){return xf(this,e)},prefault(e){return kf(this,e)},catch(e){return Af(this,e)},pipe(e){return bu(this,e)},readonly(){return If(this)},describe(e){let n=this.clone();return at.add(n,{description:e}),n},meta(...e){if(e.length===0)return at.get(this);let n=this.clone();return at.add(n,e[0]),n},isOptional(){return this.safeParse(void 0).success},isNullable(){return this.safeParse(null).success},apply(e,...n){return n.length===0?e(this):e(this,...n)},get"~standard"(){return ie.hide(this,"~standard",{...Xr(this),jsonSchema:{input:ro(this,"input"),output:ro(this,"output")}})},set"~standard"(e){ie.own(this,"~standard",e)},parse:function e(n,t){return nu(this,n,t,{callee:e})},parseAsync:async function e(n,t){return await tu(this,n,t,{callee:e})},safeParse(e,n){return ou(this,e,n)},async safeParseAsync(e,n){return ru(this,e,n)},get spa(){return this?.safeParseAsync},set spa(e){ie.own(this,"spa",e)},validate(e,n){return Ur(this,e,n)},validateAsync(e,n){return Lr(this,e,n)},encode:function e(n,t){return iu(this,n,t,{callee:e})},decode:function e(n,t){return au(this,n,t,{callee:e})},encodeAsync:async function e(n,t){return await su(this,n,t,{callee:e})},decodeAsync:async function e(n,t){return await lu(this,n,t,{callee:e})},safeEncode(e,n){return cu(this,e,n)},safeDecode(e,n){return uu(this,e,n)},async safeEncodeAsync(e,n){return du(this,e,n)},async safeDecodeAsync(e,n){return pu(this,e,n)},toJSONSchema(e){return wc(this,{})(e)},get description(){return at.get(this)?.description},get _def(){return this._zod.def}}),yu=O("_ZodString",(e,n)=>{Lo.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Nc(e,t,o,r)},ie.derived({format:e=>hn(e).format??null,minLength:e=>hn(e).minimum??null,maxLength:e=>hn(e).maximum??null},{regex(...e){return this.check(ai(...e))},includes(...e){return this.check(ci(...e))},startsWith(...e){return this.check(ui(...e))},endsWith(...e){return this.check(di(...e))},min(...e){return this.check(_t(...e))},max(...e){return this.check(Yo(...e))},length(...e){return this.check(Qo(...e))},nonempty(...e){return this.check(_t(1,...e))},lowercase(e){return this.check(si(e))},uppercase(e){return this.check(li(e))},trim(){return this.check(mi())},normalize(...e){return this.check(pi(...e))},toLowerCase(){return this.check(fi())},toUpperCase(){return this.check(hi())},slugify(){return this.check(gi())}})),Om=O("ZodString",(e,n)=>{Lo.init(e,n),yu.init(e,n)},{email(e){return this.check($l(Bm,e))},url(e){return this.check(Bl(Um,e))},jwt(e){return this.check(nc(of,e))},emoji(e){return this.check(Fl(Lm,e))},guid(e){return this.check(Ol(Fm,e))},uuid(e){return this.check(Rl(tr,e))},uuidv4(e){return this.check(Dl(tr,e))},uuidv6(e){return this.check(Vl(tr,e))},uuidv7(e){return this.check(Zl(tr,e))},nanoid(e){return this.check(Ul(Hm,e))},cuid(e){return this.check(Ll(jm,e))},cuid2(e){return this.check(Hl(Gm,e))},ulid(e){return this.check(jl(qm,e))},base64(e){return this.check(Yl(ef,e))},base64url(e){return this.check(Ql(nf,e))},xid(e){return this.check(Gl(Wm,e))},ksuid(e){return this.check(ql(Km,e))},ipv4(e){return this.check(Wl(Jm,e))},ipv6(e){return this.check(Kl(Xm,e))},cidrv4(e){return this.check(Jl(Ym,e))},cidrv6(e){return this.check(Xl(Qm,e))},e164(e){return this.check(ec(tf,e))},datetime(e){return this.check(tc(Rm,e))},date(e){return this.check(oc(Dm,e))},time(e){return this.check(rc(Vm,e))},duration(e){return this.check(ic(Zm,e))}});function ne(e){return Ml(Om,e)}var Ie=O("ZodStringFormat",(e,n)=>{Ae.init(e,n),yu.init(e,n)}),Rm=O("ZodISODateTime",(e,n)=>{Fs.init(e,n),Ie.init(e,n)}),Dm=O("ZodISODate",(e,n)=>{Us.init(e,n),Ie.init(e,n)}),Vm=O("ZodISOTime",(e,n)=>{Ls.init(e,n),Ie.init(e,n)}),Zm=O("ZodISODuration",(e,n)=>{Hs.init(e,n),Ie.init(e,n)}),Bm=O("ZodEmail",(e,n)=>{Ns.init(e,n),Ie.init(e,n)});var Fm=O("ZodGUID",(e,n)=>{Ps.init(e,n),Ie.init(e,n)});var tr=O("ZodUUID",(e,n)=>{Is.init(e,n),Ie.init(e,n)});var Um=O("ZodURL",(e,n)=>{Ms.init(e,n),Ie.init(e,n)});var Lm=O("ZodEmoji",(e,n)=>{$s.init(e,n),Ie.init(e,n)});var Hm=O("ZodNanoID",(e,n)=>{Os.init(e,n),Ie.init(e,n)});var jm=O("ZodCUID",(e,n)=>{Rs.init(e,n),Ie.init(e,n)});var Gm=O("ZodCUID2",(e,n)=>{Ds.init(e,n),Ie.init(e,n)});var qm=O("ZodULID",(e,n)=>{Vs.init(e,n),Ie.init(e,n)});var Wm=O("ZodXID",(e,n)=>{Zs.init(e,n),Ie.init(e,n)});var Km=O("ZodKSUID",(e,n)=>{Bs.init(e,n),Ie.init(e,n)});var Jm=O("ZodIPv4",(e,n)=>{js.init(e,n),Ie.init(e,n)});var Xm=O("ZodIPv6",(e,n)=>{qs.init(e,n),Ie.init(e,n)});var Ym=O("ZodCIDRv4",(e,n)=>{Ws.init(e,n),Ie.init(e,n)});var Qm=O("ZodCIDRv6",(e,n)=>{Ks.init(e,n),Ie.init(e,n)});var ef=O("ZodBase64",(e,n)=>{Xs.init(e,n),Ie.init(e,n)});var nf=O("ZodBase64URL",(e,n)=>{Ys.init(e,n),Ie.init(e,n)});var tf=O("ZodE164",(e,n)=>{Qs.init(e,n),Ie.init(e,n)});var of=O("ZodJWT",(e,n)=>{el.init(e,n),Ie.init(e,n)});var wu=O("ZodNumber",(e,n)=>{Qr.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Ec(e,t,o,r),e.isFinite=!0},ie.derived({minValue:e=>{let{minimum:n,exclusiveMinimum:t}=hn(e);return Math.max(n??Number.NEGATIVE_INFINITY,t??Number.NEGATIVE_INFINITY)},maxValue:e=>{let{maximum:n,exclusiveMaximum:t}=hn(e);return Math.min(n??Number.POSITIVE_INFINITY,t??Number.POSITIVE_INFINITY)},isInt:e=>{let{isInt:n,multipleOf:t}=hn(e);return!!n||!!t?.some(Number.isSafeInteger)},format:e=>hn(e).format??null},{gt(e,n){return this.check(Jo(e,n))},gte(e,n){return this.check(to(e,n))},min(e,n){return this.check(to(e,n))},lt(e,n){return this.check(Ko(e,n))},lte(e,n){return this.check(no(e,n))},max(e,n){return this.check(no(e,n))},int(e){return this.check(mu(e))},safe(e){return this.check(mu(e))},positive(e){return this.check(Jo(0,e))},nonnegative(e){return this.check(to(0,e))},negative(e){return this.check(Ko(0,e))},nonpositive(e){return this.check(no(0,e))},multipleOf(e,n){return this.check(Xo(e,n))},step(e,n){return this.check(Xo(e,n))},finite(){return this}}));function an(e){return ac(wu,e)}var rf=O("ZodNumberFormat",(e,n)=>{nl.init(e,n),wu.init(e,n)});function mu(e){return sc(rf,e)}var af=O("ZodBoolean",(e,n)=>{tl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Tc(e,t,o,r)});function be(e){return lc(af,e)}var sf=O("ZodNull",(e,n)=>{ol.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Mc(e,t,o,r)});function io(e){return cc(sf,e)}var lf=O("ZodUnknown",(e,n)=>{rl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Oc(e,t,o,r)});function fu(){return uc(lf)}var cf=O("ZodNever",(e,n)=>{il.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,o,r)=>$c(e,t,o,r)});function xu(e){return dc(cf,e)}var uf=O("ZodArray",(e,n)=>{or(),al.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Bc(e,t,o,r),e.element=n.element},{min(e,n){return this.check(_t(e,n))},nonempty(e){return this.check(_t(1,e))},max(e,n){return this.check(Yo(e,n))},length(e,n){return this.check(Qo(e,n))},unwrap(){return this.element}});function ze(e,n){return pc(uf,e,n)}var df=O("ZodObject",(e,n)=>{or(),cl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Fc(e,t,o,r),ie.installLazyProp(e,"shape",t=>t._zod.def.shape,!1)},{keyof(){return se(Object.keys(this._zod.def.shape))},catchall(e){return this.clone(ie.mergeDefs(this._zod.def,{catchall:e}))},passthrough(){return this.clone(ie.mergeDefs(this._zod.def,{catchall:fu()}))},loose(){return this.clone(ie.mergeDefs(this._zod.def,{catchall:fu()}))},strict(){return this.clone(ie.mergeDefs(this._zod.def,{catchall:xu()}))},strip(){return this.clone(ie.mergeDefs(this._zod.def,{catchall:void 0}))},extend(e){return ie.extend(this,e)},safeExtend(e){return ie.safeExtend(this,e)},merge(e){return ie.merge(this,e)},pick(e){return ie.pick(this,e)},omit(e){return ie.omit(this,e)},partial(...e){return ie.partial(ku,this,e[0])},exactPartial(...e){return ie.partial(Su,this,e[0],"exactPartial")},required(...e){return ie.required(zu,this,e[0])}});function J(e,n){return new df({type:"object",shape:e,catchall:xu(),...ie.normalizeParams(n)})}var _u=O("ZodUnion",(e,n)=>{ei.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Uc(e,t,o,r),e.options=n.options});function zt(e,n){return new _u({type:"union",options:e,...ie.normalizeParams(n)})}var pf=O("ZodDiscriminatedUnion",(e,n)=>{_u.init(e,n),ul.init(e,n)});function ao(e,n,t){return new pf({type:"union",options:n,discriminator:e,...ie.normalizeParams(t)})}var mf=O("ZodIntersection",(e,n)=>{dl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Lc(e,t,o,r)});function ff(e,n){return new mf({type:"intersection",left:e,right:n})}var hu=O("ZodRecord",(e,n)=>{or(),pl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Hc(e,t,o,r),e.keyType=n.keyType,e.valueType=n.valueType});function Ci(e,n,t){return!n||!n._zod?new hu({type:"record",keyType:ne(),valueType:e,...ie.normalizeParams(n)}):new hu({type:"record",keyType:e,valueType:n,...ie.normalizeParams(t)})}var Ai=O("ZodEnum",(e,n)=>{ml.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(o,r,i)=>Rc(e,o,r,i),e.enum=n.entries,e.options=[...e._zod.values];let t=new Set(Object.keys(n.entries));e.extract=(o,r)=>{let i={};for(let a of o)if(t.has(a))i[a]=n.entries[a];else throw new Error(`Key ${a} not found in enum`);return new Ai({...n,checks:[],...ie.normalizeParams(r),entries:i})},e.exclude=(o,r)=>{let i={...n.entries};for(let a of o)if(t.has(a))delete i[a];else throw new Error(`Key ${a} not found in enum`);return new Ai({...n,checks:[],...ie.normalizeParams(r),entries:i})}});function se(e,n){let t=Array.isArray(e)?Object.fromEntries(e.map(o=>[o,o])):e;return new Ai({type:"enum",entries:t,...ie.normalizeParams(n)})}var hf=O("ZodLiteral",(e,n)=>{fl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Dc(e,t,o,r),e.values=new Set(n.values),Object.defineProperty(e,"value",{get(){if(n.values.length>1)throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");return n.values[0]}})});function ye(e,n){return new hf({type:"literal",values:Array.isArray(e)?e:[e],...ie.normalizeParams(n)})}var gf=O("ZodTransform",(e,n)=>{or(),hl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Zc(e,t,o,r),e._zod.parse=(t,o)=>{if(o.direction==="backward")throw new xt(e.constructor.name);t.addIssue=i=>{if(typeof i=="string")t.issues.push(ie.issue(i,t.value,n));else{let a=i;a.fatal&&(a.continue=!1),a.code??(a.code="custom"),"input"in a||(a.input=t.value),a.inst??(a.inst=e),t.issues.push(ie.issue(a))}};let r=n.transform(t.value,t);return r instanceof Promise?r.then(i=>(t.value=i,t)):(t.value=r,t)}});function vf(e){return new gf({type:"transform",transform:e})}var ku=O("ZodOptional",(e,n)=>{ni.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Si(e,t,o,r),e.unwrap=()=>e._zod.def.innerType});function gu(e){return new ku({type:"optional",innerType:e})}var Su=O("ZodExactOptional",(e,n)=>{gl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Si(e,t,o,r),e.unwrap=()=>e._zod.def.innerType});function bf(e){return new Su({type:"optional",innerType:e})}var yf=O("ZodNullable",(e,n)=>{vl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,o,r)=>jc(e,t,o,r),e.unwrap=()=>e._zod.def.innerType});function vu(e){return new yf({type:"nullable",innerType:e})}var wf=O("ZodDefault",(e,n)=>{bl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Wc(e,t,o,r),e.unwrap=()=>e._zod.def.innerType,e.removeDefault=e.unwrap});function xf(e,n){return new wf({type:"default",innerType:e,get defaultValue(){return typeof n=="function"?n():ie.shallowClone(n)}})}var _f=O("ZodPrefault",(e,n)=>{yl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Kc(e,t,o,r),e.unwrap=()=>e._zod.def.innerType});function kf(e,n){return new _f({type:"prefault",innerType:e,get defaultValue(){return typeof n=="function"?n():ie.shallowClone(n)}})}var zu=O("ZodNonOptional",(e,n)=>{wl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Gc(e,t,o,r),e.unwrap=()=>e._zod.def.innerType});function Sf(e,n){return new zu({type:"nonoptional",innerType:e,...ie.normalizeParams(n)})}var zf=O("ZodCatch",(e,n)=>{xl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Jc(e,t,o,r),e.unwrap=()=>e._zod.def.innerType,e.removeCatch=e.unwrap});function Af(e,n){return new zf({type:"catch",innerType:e,catchValue:typeof n=="function"?n:ie.constantCatch(n)})}var Cf=O("ZodPipe",(e,n)=>{_l.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Xc(e,t,o,r),e.in=n.in,e.out=n.out});function bu(e,n){return new Cf({type:"pipe",in:e,out:n})}var Pf=O("ZodReadonly",(e,n)=>{kl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Yc(e,t,o,r),e.unwrap=()=>e._zod.def.innerType});function If(e){return new Pf({type:"readonly",innerType:e})}var Nf=O("ZodLazy",(e,n)=>{Sl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Qc(e,t,o,r),e.unwrap=()=>e._zod.def.getter()});function Ef(e){return new Nf({type:"lazy",getter:e})}var Tf=O("ZodCustom",(e,n)=>{zl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Vc(e,t,o,r)});function Mf(e,n={}){return mc(Tf,e,n)}function $f(e,n){return fc(e,n)}function Au(e){let n=Ef(()=>zt([ne(e),an(),be(),io(),ze(n),Ci(ne(),n)]));return n}var rr=Object.freeze(["panel-open","panel-close","panel-move","page-home","page-settings","page-settings-tab","page-model-tab","page-setup","page-authorization","page-repair","page-session-management","open-native-session","open-feedback","change-listen-mode","change-audio-device","edit-choice","commit-form","activate-control","dismiss","details-toggle","keyboard-navigation","ui-connect","ui-reconnect","ui-status-refresh","ui-request","ui-stream","ui-render-error","ui-action-error","ui-read-recovery","manage-session","start-voice","stop-voice","ui-buffer-overflow","session-history-open","session-history-close","subagent-history-open","subagent-history-close","show-subagents","show-main-sessions","open-native-subagent","new-voice-session","bind-current-session","retry-voice-transcript","bind-existing-session","unbind-existing-session","listen-mode-ptt","listen-mode-always","listen-mode-wake","settings-audio","settings-interaction","settings-prompt","settings-models","settings-advanced","settings-pets"]),Cu=64*1024,so=64,Pu=10080*60*1e3;var Pi="whaleConversation",we=(e,n)=>({mode:"strict",typeSymbol:`dsh-fish-voice/conversation#${e}`,create:n}),Ni=we("sessionId",()=>ne().min(1).max(256)),Of=we("settingsSessionId",()=>Ni.create().nullable()),Ru=new Set(["status","read-settings","listen-mode","complete-setup","set-visibility","inspect-tts","save-tts","preview-tts","cancel-tts","save-models","model-installer","inspect-model-compute","plan-model-install","start-model-install","control-model-install","apply-model-install","pick-local-path","enable","disable","new","resume","read-history","read-audio-devices","save-audio-device","save-settings","capture-bindings","save-bindings","save-voice-prompt","conversation-models","save-conversation-model","inspect-performance","set-performance-mode","read-output-volume","set-output-volume"]),Rf=we("volumeRequest",()=>J({revision:an().int().nonnegative(),volume:an().min(0).max(1)})),Iu=J({id:ne(),role:se(["user","assistant"]),text:ne().max(8e3),state:se(["reply","interrupted","delivered","speech-requested","speech-failed"]),at:an()}),Df=J({state:se(["disabled","starting","waiting","listening","paused","error"]),deadlineAt:an().nonnegative().nullable(),streamOpen:be(),detection:se(["asr-after-utterance","acoustic-after-utterance"])}),Du=ne().uuid(),Vf=J({sessionId:Ni.create(),items:ze(J({id:Du,text:ne().max(8e3),state:se(["busy","ready","sending","uncertain"])})).max(8)}),Zf=we("snapshot",()=>J({revision:an().int().nonnegative(),historyGeneration:an().int().nonnegative().optional(),rootSessionId:ne().nullable(),title:io(),latest:Iu.nullable(),items:ze(Iu).max(40),inputActive:be(),inputError:se(["device","recognition","no-speech"]).nullable().optional(),providerError:ne().max(480).optional(),retryTranscripts:Vf.nullable().optional(),playbackConfirmed:ye(!1),wake:Df.optional(),helper:J({online:be(),listenMode:se(["ptt","always","wake"]).nullable()}).refine(e=>e.online||e.listenMode===null).optional()})),Bf=we("volume",()=>J({supported:be(),backend:ye("dsh-speak").nullable(),volume:an().min(0).max(1).nullable(),revision:an().int().nullable(),apply:ye("next-output").nullable(),reason:ne().nullable()})),Y=ne().max(4096),Ue=an().int().nonnegative().max(Number.MAX_SAFE_INTEGER),Ff=J({code:ne().max(64),message:ne().max(512)}),Nu=J({available:be(),reason:Y.nullable(),runtimeLoaded:ye(!1),backend:Y.optional(),provider:Y.optional(),device:Y.optional(),computeType:Y.optional(),supportedComputeTypes:ze(Y).max(32).optional(),deviceCount:Ue.optional(),deviceIndex:Ue.optional(),validation:Y.optional(),note:Y.optional(),providerAdvertised:be().optional()}),Uf=J({schema:ye(1),default:ye("cpu"),observedAt:Y.nullable(),reason:Y.optional(),backends:J({sensevoice:J({cpu:Nu,cuda:Nu}).optional()})}),Lf=J({observedAt:Y,scope:ye("plugin-host"),platform:Y,arch:Y,cpuLogicalCores:Ue.nullable(),totalMemoryBytes:Ue.nullable(),availableMemoryBytes:Ue.nullable(),gpuMemoryBytes:Ue.nullable(),gpuMemoryReason:Y,gpuSource:ye("dxgi").nullable().optional(),gpuAdapters:ze(J({name:ne().min(1).max(256),dedicatedVideoMemoryBytes:Ue,sharedSystemMemoryBytes:Ue})).max(32).optional()}),Hf=J({modelId:Y,confidence:se(["not-assessed","unknown","heuristic-only"]),recommended:be(),badge:Y.nullable(),state:se(["manual-choice","unknown","recommended-pending-runtime-validation","limited-memory","busy-memory","recommended-lightweight"]),reason:Y,policy:Y.optional(),runtimeValidated:ye(!1).optional(),gpuValidated:ye(!1).optional()}),jf=J({release:Y,source:Y,sources:ze(Y).max(16).optional(),redirectHost:Y,platform:Y,arch:Y,executable:Y,licenseUrls:ze(Y).max(20)}),Gf=J({jobId:Y,modelId:Y,status:se(["waiting","verifying","applied","blocked","paused","cancelled"]),reason:Y.nullable()}),qf=J({id:Y,runtime:jf.nullable().optional(),purpose:se(["tts","asr"]).optional(),computeOptions:ze(se(["cpu","auto","cuda","vulkan"])).max(4).optional(),recommendation:Hf,title:Y,backend:Y.nullable(),available:be(),reason:Y.nullable(),totalBytes:Ue.nullable(),source:Y.nullable(),licenseUrls:ze(Y).max(20),licenseNote:Y.nullable(),verification:Y.optional(),runtimeLoaded:ye(!1)}),Wf=J({id:ne().uuid(),modelId:Y,compute:se(["cpu","auto","cuda","vulkan"]),status:se(["queued","running","paused","failed","cancelled","installed"]),stage:se(["queued","running","paused","failed","cancelled","installed","checking-runtime","verifying-local","downloading","verifying","installing"]),createdAt:Y,updatedAt:Y,totalBytes:Ue,receivedBytes:Ue,runtimeLoaded:ye(!1),error:Ff.nullable(),currentFile:Y.nullable().optional(),files:ze(J({name:Y,bytes:Ue,receivedBytes:Ue,verified:be(),reused:be().optional()})).max(200),installedPath:Y.optional(),sourceDirectory:Y.optional(),modelVariant:se(["q4_k_m","q8_0"]).optional(),reused:ye(!0).optional(),reusedBytes:Ue.optional(),purpose:se(["tts","asr"]).optional(),recommendedSettings:zt([J({tts:J({provider:ye("local"),localModelId:Y,localModelPath:Y})}),J({asr:ye("sensevoice"),models:J({sensevoiceDir:Y.optional()}),modelCompute:se(["cpu","auto","cuda"])})]).optional()}),Kf=we("modelSnapshot",()=>J({schema:ye(1),hardware:Lf,compute:Uf,refresh:J({pending:be(),observedAt:ne().max(64).nullable(),attemptedAt:ne().max(64).nullable(),error:ne().max(512).nullable(),intervalMs:ye(3e5)}).optional(),models:ze(qf).max(32),jobs:ze(Wf).max(1e3),ttsInstallIntent:Gf.nullable().optional()})),Jf=we("authorizationRequest",()=>J({revision:ne().min(1).max(256),grant:be()})),Xf=we("senseVoiceAsrRequest",()=>ao("operation",[J({operation:ye("status")}),J({operation:ye("retry")})])),Yf={state:se(["idle","downloading","ready","error"]),receivedBytes:Ue,totalBytes:Ue},Qf=we("senseVoiceAsrResult",()=>J({...Yf,selected:be(),message:ne().max(512).nullable()})),Eu=we("authorization",()=>J({schema:ye(1),revision:ne().min(1).max(256),completed:be(),granted:be(),usageAgreement:J({version:ye(1),accepted:be(),text:ze(Y).max(16)}).optional(),modelSourcesChanged:be().optional(),blockedOperations:ze(Y).max(32),revocationUnconfirmed:be(),scopes:ze(J({id:Y,title:Y,description:Y,allowed:be()})).max(16),modelSources:ze(J({modelId:Y,source:Y,licenseUrls:ze(Y).max(20),licenseNote:Y,runtime:J({source:Y,sources:ze(Y).max(16).optional(),licenseUrls:ze(Y).max(20),redirectHost:Y.nullable()}).optional()})).max(32),restrictions:ze(Y).max(16)})),eh=we("setup",()=>J({version:ye(1),completed:be()})),sn=ne().min(1).max(256),De=ne().min(1).max(256),Tu=se(["cpu","auto","cuda","vulkan"]),Mu={sourceDirectory:ne().min(1).max(4096).optional(),modelVariant:se(["q4_k_m","q8_0"]).optional()},ir=Ci(ne(),Au()),nh=J({provider:se(["deepseek","local"]),deepseekVoice:se(["stella","tide"]),deepseekTextTransmissionAccepted:be(),volume:an().min(0).max(1),localModelId:ne().max(128).nullable(),localModelPath:ne().max(4096).nullable(),referenceAudioPath:ne().max(4096).nullable(),referenceAudioAccepted:be()}),th=J({backend:se(["winmm","portaudio"]),id:ne().min(1).max(1024),name:ne().min(1).max(256)}).nullable(),oh={"read-history":{cursor:ne().max(128).optional()},"read-audio-devices":{},"save-audio-device":{revision:sn,direction:se(["input","output"]),selection:th},"agent-permissions":{},"save-agent-permissions":{revision:sn,allowed:J({"set-performance-mode":be(),"set-visibility":be(),"set-output-volume":be()})},"agent-requests":{},"decide-agent-request":{id:De,approve:be(),acknowledgements:ze(ne().max(80)).max(10)},"model-installer":{},"inspect-model-compute":{},"plan-model-install":{modelId:De,compute:Tu,...Mu},"start-model-install":{modelId:De,compute:Tu,...Mu,planHash:sn,accepted:ye(!0),useWhenReady:be().optional()},"control-model-install":{id:De,operation:se(["pause","resume","cancel"])},"apply-model-install":{id:De,revision:sn},status:{},enable:{expectedOwnerSessionId:De.nullable().optional(),expectedExistingSessionId:De.nullable().optional()},disable:{},"read-settings":{},new:{expectedOwnerSessionId:De.nullable().optional()},"inspect-performance":{},"set-performance-mode":{revision:sn,performanceMode:se(["fast","balanced","high","compatibility"])},"inspect-tts":{},"save-tts":{revision:sn,values:ir},"complete-setup":{revision:sn},"preview-tts":{revision:sn.optional(),values:nh.optional()},"cancel-tts":{},list:{cursor:ne().max(2048).optional()},resume:{id:De},"listen-mode":{mode:se(["ptt","always","wake"])},"set-visibility":{revision:sn,visibility:se(["hidden","workspace"])},"pick-local-path":{kind:se(["referenceAudio","sensevoiceDir","campplus","sourceDirectory"])},"capture-bindings":{operation:se(["begin","end"]),token:De.optional(),inactive:be().optional()},"save-bindings":{revision:sn,values:ir,bindingContext:J({ownerSessionId:De.nullable(),epoch:De.nullable(),rootSessionId:De.nullable()})},"save-voice-prompt":{revision:sn,values:J({text:ne().max(32768)})},"conversation-models":{},"save-conversation-model":{revision:sn,values:J({mode:se(["auto","manual"]),provider:ne().min(1).max(256).nullable(),model:ne().min(1).max(256).nullable()})},"save-settings":{revision:sn,values:ir},"save-models":{revision:sn,values:ir}},rh=we("uiActionRequest",()=>ao("action",Object.entries(oh).map(([e,n])=>J({action:ye(e),...n}))).refine(e=>e.action!=="preview-tts"||Object.hasOwn(e,"revision")===Object.hasOwn(e,"values"),"\u8349\u7A3F\u8BD5\u542C\u5FC5\u987B\u540C\u65F6\u63D0\u4F9B\u914D\u7F6E\u7248\u672C\u548C\u8BBE\u7F6E").refine(e=>JSON.stringify(e).length<=(e.action==="save-voice-prompt"?2e5:8192),"\u64CD\u4F5C\u6570\u636E\u8FC7\u957F")),$u=we("uiActionResult",()=>ne().max(4*1024*1024)),ih=we("sessionManagementRequest",()=>ao("operation",[J({operation:ye("list"),rootId:De.optional(),cursor:ne().max(2048).optional()}),J({operation:ye("unhide"),rootId:De,id:De}),J({operation:ye("restore"),rootId:De,id:De})])),ah=we("presentation",()=>J({shown:ze(zt([J({id:De,parentId:io(),mode:io()}),J({id:De,parentId:De,mode:se(["one-shot","continuable","unknown"])})]))})),Ii=ne().min(1).max(128),sh=we("updateRequest",()=>ao("action",[J({action:ye("check")}),J({action:ye("install"),version:Ii})])),Ou=we("updateSnapshot",()=>J({schema:ye(1),revision:an().int().nonnegative().optional(),currentVersion:Ii,channel:se(["stable","preview"]),status:se(["idle","checking","current","available","incompatible","installing","restart-required","enable-required","installed","error","unsupported"]),checkedAt:ne().max(64).nullable(),release:J({version:Ii,announcement:ne().min(1).max(600),url:ne().startsWith("https://github.com/Emikosama/dsh-fish-voice/releases/tag/v").max(256)}).nullable(),message:ne().max(512).nullable(),canInstall:be()})),ar=Ni.create(),lo=J({sessionId:ar,title:ne().max(256).nullable(),availability:se(["ready","busy","unavailable","archived"]),unavailableReason:se(["managed","subagent"]).optional(),updatedAt:an().int().nonnegative().max(864e13).nullable().optional()}),Vu=ne().min(1).max(512),lh=we("listExistingSessionsRequest",()=>zt([J({sessionId:ar}),J({query:ne().max(128).optional(),cursor:Vu.optional()})])),ch=we("listExistingSessionsResult",()=>J({items:ze(lo).max(100),nextCursor:Vu.nullable(),binding:lo.nullable()})),uh=we("setExistingSessionRequest",()=>J({sessionId:ar.nullable(),expectedSessionId:ar.nullable()})),dh=we("setExistingSessionResult",()=>J({binding:lo.nullable()})),Zu=ne().min(1).max(160).regex(/^[A-Za-z0-9_-]+$/),ph=we("operationLogPageRequest",()=>J({cursor:Zu.optional()})),mh=we("operationLogPage",()=>J({text:ne().max(Cu),nextCursor:Zu.nullable()})),Bu=ne().uuid(),fh=we("operationScopeResult",()=>J({scope:Bu})),hh=we("recordOperationRequest",()=>J({scope:Bu,events:ze(J({id:ne().uuid(),at:Ue,action:se(rr),source:se(["user","ui"]),phase:se(["requested","finished"]).optional(),result:se(["ok","failed","cancelled"]).optional(),count:Ue.positive().optional()}).refine(e=>e.action==="ui-buffer-overflow"?e.source==="ui"&&e.count!==void 0:e.count===void 0)).min(1).max(so)})),gh=we("recordOperationResult",()=>J({accepted:be()})),vh=we("retryVoiceTranscriptRequest",()=>J({id:Du})),bh=we("retryVoiceTranscriptResult",()=>J({accepted:be()})),yh={retryVoiceTranscript:vh,recordClientOperations:hh,readOperationLog:ph,action:rh,saveAuthorization:Jf,manageSessions:ih,senseVoiceAsrAction:Xf,updateAction:sh,listExistingVoiceSessions:lh,setExistingVoiceSession:uh},wh={readClientOperationScope:fh,recordClientOperations:gh,readOperationLog:mh,action:$u,manageSessions:$u,readAuthorization:Eu,saveAuthorization:Eu,senseVoiceAsrAction:Qf,readSetup:eh,followPresentation:ah,followModels:Kf,followUpdates:Ou,updateAction:Ou,listExistingVoiceSessions:ch,setExistingVoiceSession:dh,retryVoiceTranscript:bh},Ze=(e,n,t=!1)=>({id:`dsh-fish-voice#${Pi}/${e}`,service:Pi,namespace:Pi,method:e,invocation:{kind:"direct"},...t?{mode:"stream"}:{},parameters:n.map(o=>({name:o,wire:o,source:"json",codec:o==="sessionId"?Of:yh[e]??Rf})),cancellation:{parameter:"signal"},result:wh[e]??(t?Zf:Bf)}),Fu={package:"dsh-fish-voice/conversation",descriptors:[Ze("action",["sessionId","request"]),Ze("follow",["sessionId"],!0),Ze("followModels",["sessionId"],!0),Ze("followPresentation",[],!0),Ze("followUpdates",[],!0),Ze("updateAction",["request"]),Ze("readSetup",[]),Ze("readAuthorization",[]),Ze("saveAuthorization",["request"]),Ze("senseVoiceAsrAction",["request"]),Ze("manageSessions",["sessionId","request"]),Ze("readClientOperationScope",[]),Ze("recordClientOperations",["request"]),Ze("readOperationLog",["request"]),Ze("listExistingVoiceSessions",["request"]),Ze("setExistingVoiceSession",["request"]),Ze("retryVoiceTranscript",["request"]),Ze("readVolume",["sessionId"]),Ze("setVolume",["sessionId","request"])]};var Le=e=>e!==null&&typeof e=="object"&&!Array.isArray(e),Sn=(e,n=1024)=>typeof e=="string"&&e.length<=n,Jn=e=>typeof e=="number"&&Number.isFinite(e),Je=e=>typeof e=="boolean",Uu=e=>{if(!Sn(e,4096))return!1;try{let n=new URL(e);return["https:","http:"].includes(n.protocol)&&!n.username&&!n.password}catch{return!1}},gn=(e,n=4096)=>e==null||Sn(e,n),Xn=e=>Sn(e,256)&&e.length>0,Me=()=>{throw new Error("\u914D\u7F6E\u63A5\u53E3\u8FD4\u56DE\u4E86\u65E0\u6548\u6570\u636E\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6")};function Ei(e){if(e.onboarding!==void 0&&(!Le(e.onboarding)||e.onboarding.version!==1||!Je(e.onboarding.completed))&&Me(),e.ttsSetup!==void 0){let n=e.ttsSetup;(!Le(n)||!["deepseek","local","off"].includes(n.provider)||!["stella","tide"].includes(n.deepseekVoice)||!Je(n.deepseekTextTransmissionAccepted)||!Jn(n.volume)||n.volume<0||n.volume>1||!(n.localModelId==null||Xn(n.localModelId))||!gn(n.localModelPath)||!gn(n.referenceAudioPath)||!(n.referenceAudioAccepted===void 0||Je(n.referenceAudioAccepted)))&&Me()}if(e.ttsRuntime?.localComputeBackend!=null&&(!["cpu","vulkan","cuda","hip"].includes(e.ttsRuntime.localComputeBackend)||!Je(e.ttsRuntime.localComputeVerified)||!Je(e.ttsRuntime.localComputeFallback))&&Me(),e.ttsRuntime?.localTimings!=null){let n=e.ttsRuntime.localTimings;(!Le(n)||typeof n.modelResident!="boolean"||["preparationMs","deviceSelectionMs","synthesisMs","playbackMs","totalMs","chunks"].some(t=>!Number.isSafeInteger(n[t])||n[t]<0)||n.chunks<1||n.chunks>4e3)&&Me()}return e.ttsRuntime!=null&&(!Le(e.ttsRuntime)||!Sn(e.ttsRuntime.state,64)||!Je(e.ttsRuntime.busy)||!Je(e.ttsRuntime.blocked))&&Me(),e}function Hu(e,n){if(Le(n)||Me(),e==="setup-status"&&(Object.keys(n).some(t=>!["version","completed"].includes(t))||n.version!==1||!Je(n.completed))&&Me(),e==="inspect-tts"&&(!Sn(n.platform,32)||!Je(n.playbackSupported)||!Je(n.deepseekKeyAvailable)||n.autoDownload!==!1||!Je(n.gpuSupported))&&Me(),e==="preview-tts"&&(!["deepseek","local"].includes(n.provider)||n.fallback!==!1||n.acousticConfirmation!==!1||n.playbackCompleted!==!0||n.textOnly!==void 0)&&Me(),e==="cancel-tts"&&!["idle","cancelled","unconfirmed"].includes(n.status)&&Me(),e==="model-installer"){if((n.schema!==1||!Array.isArray(n.models)||n.models.length>100||!Array.isArray(n.jobs)||n.jobs.length>1e3||!Le(n.hardware)||!Le(n.compute))&&Me(),n.refresh!=null){let t=n.refresh;(!Le(t)||!Je(t.pending)||!gn(t.observedAt,64)||!gn(t.attemptedAt,64)||!gn(t.error,512)||!(t.intervalMs===void 0||Jn(t.intervalMs)&&t.intervalMs>0&&t.intervalMs<=36e5))&&Me()}for(let t of n.models)(!Le(t)||!Xn(t.id)||!Je(t.available)||t.runtimeLoaded!==!1||!gn(t.title)||!gn(t.reason)||!(t.totalBytes==null||Jn(t.totalBytes)&&t.totalBytes>=0))&&Me(),t.recommendation!=null&&(!Le(t.recommendation)||!Je(t.recommendation.recommended)||!gn(t.recommendation.reason))&&Me();for(let t of n.jobs)Lu(t);if(n.ttsInstallIntent!=null){let t=n.ttsInstallIntent;(!Le(t)||!Xn(t.jobId)||!Xn(t.modelId)||!["waiting","verifying","applied","blocked","paused","cancelled"].includes(t.status)||!gn(t.reason))&&Me()}}return e==="inspect-model-compute"&&!Le(n.compute)&&!Le(n.backends)&&Me(),e==="plan-model-install"&&(n.reused!==void 0&&(!Je(n.reused)||n.reused!==!0||!Sn(n.sourceDirectory,4096)||!n.sourceDirectory||!["q4_k_m","q8_0"].includes(n.modelVariant)||!Jn(n.reusedBytes)||n.reusedBytes<0)&&Me(),n.reused!==!0&&(n.sourceDirectory!==void 0||n.modelVariant!==void 0||n.reusedBytes!==void 0)&&Me(),Array.isArray(n.files)&&n.files.some(t=>Le(t)&&t.reused!==void 0&&!Je(t.reused))&&Me(),(!Xn(n.modelId)||!["cpu","auto","cuda","vulkan"].includes(n.compute)||!Sn(n.planHash,128)||!Array.isArray(n.files)||n.files.length>200||!Jn(n.totalBytes)||n.totalBytes<0||!Sn(n.destination,4096)||!Array.isArray(n.licenseUrls)||n.licenseUrls.some(t=>!Uu(t))||!gn(n.source)||!gn(n.notice)||!gn(n.licenseNote)||n.files.some(t=>!Le(t)||!Xn(t.name)||!Jn(t.bytes)||t.bytes<0||!Sn(t.sha256,64)||!/^[a-f0-9]{64}$/i.test(t.sha256)||!Uu(t.url)))&&Me()),["start-model-install","control-model-install"].includes(e)&&Lu(n),Ei(n)}function Lu(e){Le(e)&&e.error!=null&&(!Le(e.error)||!Sn(e.error.message,512))&&Me(),(!Le(e)||!Xn(e.id)||!Xn(e.modelId)||!["cpu","auto","cuda","vulkan"].includes(e.compute)||!["queued","running","paused","failed","cancelled","installed"].includes(e.status)||!Sn(e.stage,128)||!Jn(e.receivedBytes)||e.receivedBytes<0||!(e.totalBytes===null||Jn(e.totalBytes)&&e.totalBytes>=0)||e.runtimeLoaded!==!1)&&Me()}function Vn(e,n){let t=i=>i!==null&&typeof i=="object"&&!Array.isArray(i),o=i=>typeof i=="string"&&i.length>0&&i.length<=256,r=i=>i===null||t(i)&&Object.keys(i).sort().join(",")==="code,modifiers"&&typeof i.code=="string"&&/^(F([1-9]|1[0-9]|2[0-4])|Key[A-Z]|Digit[0-9]|Space)$/.test(i.code)&&Array.isArray(i.modifiers)&&i.modifiers.length<=3&&new Set(i.modifiers).size===i.modifiers.length&&i.modifiers.every(a=>["Control","Alt","Shift"].includes(a))&&!(i.code==="F4"&&i.modifiers.includes("Alt"));if(!t(n))throw new Error("Fish Voice UI returned invalid data");if(n.wake!==void 0&&!(n.wake===null&&e!=="conversation")&&!Qi(n.wake))throw new Error("Invalid wake state");if(n.listenMode!==void 0&&n.listenMode!==null&&!ft.includes(n.listenMode))throw new Error("Invalid listening mode");if(["status","enable","disable","new","resume","listen-mode"].includes(e)){if(!(n.ownerSessionId===null||o(n.ownerSessionId))||typeof n.enabled!="boolean"||!t(n.helper)||typeof n.helper.online!="boolean")throw new Error("Fish Voice UI returned an invalid status");if(n.existingVoiceSessionSupported!==void 0&&typeof n.existingVoiceSessionSupported!="boolean")throw new Error("Invalid existing session support");if(n.existingVoiceSession!=null&&!lo.safeParse(n.existingVoiceSession).success)throw new Error("Invalid existing voice session");if(n.helper.lastError!=null&&(typeof n.helper.lastError!="string"||n.helper.lastError.length>512))throw new Error("Invalid audio diagnostic")}else if(["save-voice-prompt","save-conversation-model","save-bindings","read-settings","save-settings","save-audio-device","save-models","set-visibility","set-performance-mode","save-tts","complete-setup","apply-model-install"].includes(e)){if(n.bindingContext!==void 0&&(!t(n.bindingContext)||["ownerSessionId","epoch","rootSessionId"].some(a=>n.bindingContext[a]!==null&&!o(n.bindingContext[a]))))throw new Error("Invalid binding context");let i=n.values;if(typeof n.revision!="string"||!n.revision||!t(i)||![0,1,2].includes(i.pttMouse)||!t(i.speakerVerification)||typeof i.speakerVerification.enabled!="boolean"||!(Ht(i.device)||typeof i.device=="string"&&i.device.length<=256&&!/[\u0000-\u001f\u007f]/.test(i.device)||Number.isSafeInteger(i.device)&&i.device>=0))throw new Error("Fish Voice UI returned invalid settings");if(i.wakeWordAliases!==void 0&&!zo(i.wakeWordAliases))throw new Error("Invalid wake aliases");if(i.wakeListenTimeoutMs!==void 0&&(!Number.isInteger(i.wakeListenTimeoutMs)||i.wakeListenTimeoutMs<3e3||i.wakeListenTimeoutMs>3e4))throw new Error("Invalid wake timeout");if(i.semanticExperimental!==void 0&&typeof i.semanticExperimental!="boolean")throw new Error("Invalid experimental wake setting");if(i.pttKeyboard!==void 0&&!r(i.pttKeyboard))throw new Error("Invalid keyboard binding");if(n.capabilities?.pttKeyboard!==void 0){let a=n.capabilities.pttKeyboard;if(!t(a)||typeof a.supported!="boolean"||a.scope!=="global"||a.platform!=="win32"||!["available","unsupported"].includes(a.status)||!(a.reason==null||typeof a.reason=="string")||a.supported!==(a.status==="available"))throw new Error("Invalid keyboard capability")}if(n.modelSetup!==void 0&&(!t(n.modelSetup)||n.modelSetup.asr!=="sensevoice"||!t(n.modelSetup.models)||n.modelSetup.modelCompute!==void 0&&!["cpu","auto","cuda"].includes(n.modelSetup.modelCompute)||["sensevoiceDir","campplus"].some(a=>typeof n.modelSetup.models[a]!="string")))throw new Error("Fish Voice UI returned invalid model configuration");if(n.capabilities?.turnSignals===!0){let a=i.turnSignals;if(!t(a)||typeof a.enabled!="boolean"||typeof a.headphonesConfirmed!="boolean"||typeof a.experimentalAutomaticBargeIn!="boolean"||typeof a.volume!="number"||!Number.isFinite(a.volume)||a.volume<0||a.volume>1)throw new Error("Fish Voice UI returned invalid turn sound settings")}}else if(e==="list"&&(!Array.isArray(n.items)||n.items.length>50||!(n.nextCursor==null||typeof n.nextCursor=="string"&&n.nextCursor.length<=2048)||n.items.some(i=>!t(i)||!o(i.id)||typeof i.archived!="boolean"||typeof i.available!="boolean"||typeof i.canResume!="boolean"||i.title!==void 0&&typeof i.title!="string"||i.reason!==void 0&&typeof i.reason!="string")))throw new Error("Fish Voice UI returned invalid voice history");if(n.voicePrompt!==void 0){let i=n.voicePrompt;if(!t(i)||typeof i.text!="string"||i.text.length>32768||!["agents","custom"].includes(i.mode)||typeof i.customSupported!="boolean"||!(i.unsupportedReason===null||typeof i.unsupportedReason=="string"&&i.unsupportedReason.length<=512)||i.mode==="custom"&&(!i.text.trim()||!i.customSupported)||i.mode==="agents"&&i.customSupported&&i.text.trim())throw new Error("Invalid voice prompt preference")}if(n.conversationModel!==void 0&&(!t(n.conversationModel)||!["auto","manual"].includes(n.conversationModel.mode)||![n.conversationModel.provider,n.conversationModel.model].every(i=>i===null||o(i))||n.conversationModel.mode==="auto"&&(n.conversationModel.provider!==null||n.conversationModel.model!==null)))throw new Error("Invalid conversation model preference");if(e==="conversation-models"&&(!Array.isArray(n.providers)||n.providers.length>256||new Set(n.providers.map(i=>i?.id)).size!==n.providers.length||n.providers.some(i=>!t(i)||!o(i.id)||!o(i.name)||!Array.isArray(i.models)||i.models.length>2048||new Set(i.models.map(a=>a?.id)).size!==i.models.length||i.models.some(a=>!t(a)||!o(a.id)||!o(a.name)))))throw new Error("Invalid conversation model catalog");if(e==="read-audio-devices"&&!Xi(n))throw new Error("Invalid audio device inventory");if(n.audioDevices!==void 0&&(!t(n.audioDevices)||!Ht(n.audioDevices.output)||!(Ht(n.audioDevices.input)||typeof n.audioDevices.input=="string"||Number.isSafeInteger(n.audioDevices.input))))throw new Error("Invalid audio device preferences");if(e==="inspect-performance"&&(!Array.isArray(n.modes)||n.modes.some(i=>!t(i)||!["fast","balanced","high"].includes(i.performanceMode)||typeof i.available!="boolean")))throw new Error("Invalid performance capabilities");if(e==="read-history"&&(!(n.rootSessionId===null||o(n.rootSessionId))||!Number.isSafeInteger(n.generation)||n.generation<0||!Number.isSafeInteger(n.revision)||n.revision<0||!["voice-session","current-voice-session"].includes(n.scope)||typeof n.truncated!="boolean"||!(n.nextCursor===null||typeof n.nextCursor=="string"&&/^\d+:\d+$/.test(n.nextCursor))||!Array.isArray(n.items)||n.items.length>100||new Set(n.items.map(i=>i?.id)).size!==n.items.length||n.items.some(i=>!t(i)||!o(i.id)||!["user","assistant"].includes(i.role)||typeof i.text!="string"||i.text.length>8e3||!["reply","interrupted","delivered","speech-requested","speech-failed"].includes(i.state)||!Number.isFinite(i.at))))throw new Error("Invalid conversation history");if(e==="conversation"){if(n.helper!==void 0&&(!t(n.helper)||typeof n.helper.online!="boolean"||!(n.helper.listenMode===null||ft.includes(n.helper.listenMode))||!n.helper.online&&n.helper.listenMode!==null))throw new Error("Invalid conversation helper state");if(n.inputError!=null&&!["device","recognition","no-speech"].includes(n.inputError))throw new Error("Invalid input error");if(n.providerError!==void 0&&(typeof n.providerError!="string"||n.providerError.length>480))throw new Error("Invalid provider error");if(!Number.isSafeInteger(n.revision)||n.revision<0||n.title!==null||!(n.rootSessionId===null||o(n.rootSessionId))||!Array.isArray(n.items)||n.items.length>40||typeof n.inputActive!="boolean"||n.playbackConfirmed!==!1||n.items.some(i=>!t(i)||!o(i.id)||!["user","assistant"].includes(i.role)||typeof i.text!="string"||i.text.length>8e3||!["reply","interrupted","delivered","speech-requested","speech-failed"].includes(i.state)||!Number.isFinite(i.at))||n.latest!==null&&(!t(n.latest)||!n.items.some(i=>i.id===n.latest.id&&i.text===n.latest.text&&i.role==="assistant")))throw new Error("Invalid conversation snapshot")}if(e==="output-volume"&&(typeof n.supported!="boolean"||n.supported&&(typeof n.volume!="number"||!Number.isFinite(n.volume)||n.volume<0||n.volume>1||n.revision==null)))throw new Error("Invalid output volume snapshot");if(["agent-permissions","save-agent-permissions"].includes(e)){let i=["set-performance-mode","set-visibility","set-output-volume"];if(n.schema!==1||!o(n.revision)||!Array.isArray(n.items)||n.items.length!==3||new Set(n.items.map(a=>a?.operation)).size!==3||n.items.some(a=>!t(a)||!i.includes(a.operation)||typeof a.allowed!="boolean"||typeof a.title!="string"||a.title.length>128||!(a.reason===null||typeof a.reason=="string"&&a.reason.length<=1024)))throw new Error("Invalid agent permissions")}if(["agent-requests","decide-agent-request"].includes(e)){let i=a=>t(a)&&o(a.id)&&o(a.sourceSessionId)&&o(a.operation)&&typeof a.title=="string"&&a.title.length<=128&&["pending","executing","completed","blocked","unknown","superseded","expired","cancelled","rejected"].includes(a.state)&&Number.isFinite(a.createdAt)&&Number.isFinite(a.expiresAt)&&Number.isSafeInteger(a.humanRevision)&&t(a.request)&&t(a.before)&&Array.isArray(a.acknowledgements)&&a.acknowledgements.length<=10&&a.acknowledgements.every(l=>t(l)&&o(l.id)&&typeof l.text=="string"&&l.text.length<=1024)&&(a.error===null||t(a.error)&&typeof a.error.code=="string"&&typeof a.error.message=="string"&&a.error.message.length<=1024)&&(a.nextAction===null||typeof a.nextAction=="string"&&a.nextAction.length<=1024);if(n.schema!==1||!Number.isSafeInteger(n.humanRevision)||n.humanRevision<0||!Array.isArray(n.items)||n.items.length>100||n.items.some(a=>!i(a))||e==="decide-agent-request"&&(!i(n.lastOutcome)||!n.items.some(a=>a.id===n.lastOutcome.id&&a.state===n.lastOutcome.state)))throw new Error("Invalid agent request snapshot")}if(e==="authorization"){if(n.usageAgreement!==void 0&&(!t(n.usageAgreement)||n.usageAgreement.version!==1||typeof n.usageAgreement.accepted!="boolean"||!Array.isArray(n.usageAgreement.text)||n.usageAgreement.text.length>16||n.usageAgreement.text.some(i=>typeof i!="string"||i.length>4096)))throw new Error("Invalid usage agreement snapshot");if(n.schema!==1||!o(n.revision)||!Array.isArray(n.blockedOperations)||n.blockedOperations.some(i=>typeof i!="string")||typeof n.revocationUnconfirmed!="boolean"||typeof n.completed!="boolean"||typeof n.granted!="boolean"||!Array.isArray(n.scopes)||n.scopes.length>16||new Set(n.scopes.map(i=>i?.id)).size!==n.scopes.length||n.scopes.some(i=>!t(i)||!o(i.id)||typeof i.title!="string"||typeof i.description!="string"||typeof i.allowed!="boolean")||!Array.isArray(n.modelSources)||n.modelSources.length>32||n.modelSources.some(i=>!t(i)||!o(i.modelId)||typeof i.source!="string"||!Array.isArray(i.licenseUrls)||i.licenseUrls.some(a=>typeof a!="string")||typeof i.licenseNote!="string")||!Array.isArray(n.restrictions)||n.restrictions.some(i=>typeof i!="string"))throw new Error("Invalid authorization snapshot")}if(n.inferenceCompute!=null){let i=n.inferenceCompute;if(!t(i)||!["cpu","auto","cuda"].includes(i.requested)||![null,"cpu","cuda"].includes(i.actual)||i.engine!=="sensevoice"||!(i.computeType===null||["int8","float16","int8_float16","int8_float32","float32"].includes(i.computeType))||!(i.deviceIndex===null||Number.isSafeInteger(i.deviceIndex)&&i.deviceIndex>=0&&i.deviceIndex<8)||![null,"gpu-unavailable","gpu-load-failed","gpu-inference-failed","model-gpu-unverified"].includes(i.fallbackReason)||typeof i.validated!="boolean")throw new Error("Invalid inference compute status")}if(n.inputDevices!==void 0&&!na(n.inputDevices))throw new Error("Invalid input device inventory");if(n.ptt?.keyboard!==void 0&&n.ptt.keyboard!==null){let i=n.ptt.keyboard;if(!t(i)||typeof i.supported!="boolean"||i.scope!=="global"||!["unsupported","active","inactive","unknown"].includes(i.status)||typeof i.hookInstalled!="boolean"||typeof i.recording!="boolean"||!(i.observedAt==null||Number.isFinite(i.observedAt)))throw new Error("Invalid keyboard status")}if(n.voiceSession?.recovery!==void 0){let i=n.voiceSession.recovery;if(!t(i)||i.stopVerified!==void 0&&typeof i.stopVerified!="boolean"||i.stopVerified===!0&&(i.kind!=="none"||n.voiceSession.fullyStopped!==!0)||!["none","live-root-conflict","predecessor-cleanup-pending","predecessor-stop-unconfirmed","helper-cleanup-pending","helper-stop-unconfirmed"].includes(i.kind)||!(i.rootSessionId===null||o(i.rootSessionId))||i.kind!=="none"&&n.voiceSession.fullyStopped===!0)throw new Error("Invalid voice recovery state")}if(n.voiceSession?.visibility!==void 0&&!["hidden","workspace"].includes(n.voiceSession.visibility))throw new Error("Fish Voice UI returned invalid visibility");if(n.voiceCapabilities!==void 0){let i=n.voiceCapabilities;if(!t(i)||!(i.configuredVisibility===null||["hidden","workspace"].includes(i.configuredVisibility))||["hidden","workspace"].some(a=>!t(i[a])||typeof i[a].supported!="boolean")||!t(i.taskHandoff)||typeof i.taskHandoff.mode!="string")throw new Error("Fish Voice UI returned invalid host capabilities")}return Ei(n),["setup-status","inspect-tts","preview-tts","cancel-tts","model-installer","inspect-model-compute","plan-model-install","start-model-install","control-model-install"].includes(e)&&Hu(e,n),n}function ju(e,n=10){let t=0;for(let o=e.length-1;o>=0;o--)if(e[o].role==="user"&&++t===n)return e.slice(o);return e}function Gu(e=[],n=[]){let t=new Map(e.map(o=>[o.id,o]));for(let o of n)t.set(o.id,o);return[...t.values()].sort((o,r)=>o.at-r.at)}function qu(e,n=36){return e.scrollHeight-e.scrollTop-e.clientHeight<=n}function Wu({enabled:e,active:n,unknown:t,pending:o}){return t?"unknown":o?"pending":e?n?"listening":"standby":"off"}function co(e){return e?.enabled?e.existingVoiceSession?.sessionId??e.voiceSession?.id??null:null}var Ku=["save-voice-prompt","save-conversation-model","save-bindings","read-settings","save-settings","save-audio-device","save-models","set-visibility","set-performance-mode","save-tts","complete-setup","apply-model-install"],uo=Ku.filter(e=>e!=="read-settings"),po=["status","enable","disable","new","resume","listen-mode"],xh=new Set(["status","enable","disable","listen-mode","read-history"]),_h=["save-bindings","inspect-tts","inspect-model-compute"],Zn=new Set(["conversation-models","status","read-settings","read-output-volume","model-installer","agent-permissions","agent-requests"]),At=["conversation-models","agent-permissions","agent-requests","status","read-settings","list","read-output-volume","inspect-performance","inspect-tts","model-installer","inspect-model-compute","plan-model-install"];function Ju(e,{schedule:n=(r,i)=>globalThis.setTimeout(r,i),unschedule:t=r=>globalThis.clearTimeout(r),observe:o=()=>{}}={}){let r=0,i={conversationHistory:null,conversationHistoryFor:null,conversationHistoryError:null,conversationHistoryLoading:!1,conversationHistoryRequestCursor:null},a={...i,conversationModels:null,conversationModelsFor:null,conversationModelsError:null,authorization:null,authorizationOpen:!1,authorizationLoading:!1,authorizationBusy:!1,authorizationUncertain:!1,authorizationError:null,agentRequests:null,agentRequestsFor:null,busy:!1,interruptibleRead:null,diagnosticStopPending:!1,error:null,status:null,settings:null,settingsFor:null,visibilityUncertain:!1,visibilityReadbackFor:null,catalog:null,checkedFor:null,catalogFor:null,uncertain:!1,performance:null,performanceFor:null,performancePending:!1,performanceError:null,conversation:null,conversationFor:null,conversationError:null,outputVolume:null,outputVolumeFor:null,outputVolumeUncertain:!1,setupStatus:null,setupOpen:!1,panelView:"home",setupError:null,ttsCapabilities:null,ttsCapabilitiesFor:null,ttsPreview:null,ttsPreviewFor:null,ttsCancelling:!1,ttsUncertain:!1,installer:null,installerFor:null,installerError:null,installerUncertain:!1,installPlan:null,installPlanFor:null},l=new Set,c=null,u=!0,d=!0,m=0,f=null,p=null,y=0,v=new Map,b=()=>{for(let w of v.values())w.stale=!0,w.abort.abort();v.clear()},x=()=>{b(),f&&(f.stale=!0,Zn.has(f.action)&&f.abort.abort())},C=!1,B=null,D=!1,E=null,$=0,z=0,M=new Map,A=!0,k=null,P=null,V=null,S,N=null,I=0,G=0,L=!1,H=null,X=null,ce=new Set,ue=new Set,me=new Set,q=new Set,T=w=>{if(!A)return;let _=Object.hasOwn(w,"uncertain")?w.readOnlyFailure===!0:a.readOnlyFailure;a={...a,...w,readOnlyFailure:_};for(let Z of ce)Z()},Q,le,ge=0,$e=w=>["checking","installing"].includes(w?.status),je=(w,_)=>{_?.revision!==void 0&&w.revision<_.revision||(_&&w.revision!==void 0&&(_.revision=w.revision),T({updates:w,updatesUnavailable:!1}))},Oe=()=>{if(!A||!k?.subscribeUpdates||Q||!u)return;let w=k,_={};Q=_,_.stop=w.subscribeUpdates(Z=>{!A||Q!==_||(ge++,Cn("update-stream"),je(Z,_))},()=>{!A||Q!==_||(Q=null,T({updatesUnavailable:!0}),Ge(P,"update-stream"))})},lt=()=>{let w=Q;Q=null,w?.stop?.(),le?.abort(),le=null,T({updates:null,updatePending:null,updatesUnavailable:!1})},Pn=async w=>{if(!A||!k?.updateAction||le)return;let{action:_,version:Z}=w;if(_==="install"&&(a.updatesUnavailable||a.updates?.canInstall!==!0||a.updates?.release?.version!==Z))return;let U=k,W=new AbortController;le=W,Oe();let ee=Q,_e=ge;T({updatePending:_});try{let ve=await U.updateAction(w,W.signal);A&&le===W&&Q===ee&&(ve.revision===void 0&&$e(ve)&&ge!==_e&&!$e(a.updates)||je(ve,ee))}catch{let ve=ge!==_e&&!$e(a.updates);A&&le===W&&Q===ee&&!ve&&T({updatesUnavailable:!0})}finally{le===W&&(le=null,T({updatePending:null}))}},Ee=0,re=w=>{Ee++,T({...w,ttsUncertain:!0})},Fe=()=>a.status?.existingVoiceSession?null:P,We=null,$t=()=>{We=null,T({transcriptRetry:null})},Ot=w=>{if(!We?.receipt||w?.rootSessionId!==We.sessionId)return;let _=w.retryTranscripts?.items.find(Z=>Z.id===We.id);(!_||_.state!=="ready"||We.receipt==="unconfirmed"&&w.revision>We.revision)&&$t()},et=async(w,_)=>{let{status:Z,conversation:U,checkedFor:W,conversationFor:ee,uncertain:_e,busy:ve}=a,Re=Z?.existingVoiceSession?.sessionId;if(!A||!k?.retryVoiceTranscript||We||_e||ve||P!==w||W!==w||ee!==w||!Z?.enabled||!Re||U?.rootSessionId!==Re||U.retryTranscripts?.sessionId!==Re||!U.retryTranscripts.items.some(En=>En.id===_&&En.state==="ready"))return;let Qe=k,Nn=new AbortController,bn=We={id:_,sessionId:Re,revision:U.revision,receipt:null};ue.add(Nn),T({transcriptRetry:{id:_,state:"sending"}});try{let En=await Qe.retryVoiceTranscript({id:_},Nn.signal);if(!A||We!==bn)return;En.accepted===!1?$t():bn.receipt="accepted"}catch{if(!A||We!==bn)return;bn.receipt="unconfirmed"}finally{ue.delete(Nn),We===bn&&(bn.receipt==="unconfirmed"&&T({transcriptRetry:{id:_,state:"uncertain"}}),Ot(a.conversation))}},tn=async(w,_,Z)=>{let U=e??k?.action;if(!U)throw new Error("\u9C7C\u5E94\u754C\u9762\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let W=a.status?.existingVoiceSession&&xh.has(_.action)||a.existingSessionUnconfirmed&&_.action==="status"?null:w,ee=await U(W,_,Z);try{return Vn(_.action,ee)}catch(_e){throw o("ui-render-error","finished","failed"),_e}},An=null,ct=({clear:w=!1}={})=>{let _=An;An=null,_?.abort.abort(),T({audioDevicesPending:!1,audioDevicesError:null,...w?{audioDevices:null,audioDevicesFor:null}:{}})},de=w=>{if(!A||P!==w)return Promise.resolve(!1);if(An?.id===w&&An.client===k)return An.promise;ct();let _={id:w,client:k,scope:z,abort:new AbortController,promise:null};An=_,ue.add(_.abort),T({audioDevicesPending:!0,audioDevicesError:null});let Z=()=>A&&An===_&&P===w&&k===_.client&&z===_.scope;return _.promise=(async()=>{let U;try{let W=new Promise((_e,ve)=>{U=()=>ve(new Error("Device read cancelled")),_.abort.signal.addEventListener("abort",U,{once:!0})}),ee=await Promise.race([tn(w,{action:"read-audio-devices"},_.abort.signal),W]);return Z()?(T({audioDevices:ee,audioDevicesFor:w}),!0):!1}catch(W){return Z()&&!_.abort.signal.aborted&&T({audioDevicesError:String(W?.message??W)}),!1}finally{_.abort.signal.removeEventListener("abort",U),ue.delete(_.abort),Z()&&(An=null,T({audioDevicesPending:!1}))}})(),_.promise},Un=null,Jd=w=>{if(!A||P!==w)return Promise.resolve(!1);if(Un?.id===w&&Un.scope===z)return Un.promise;let _={id:w,scope:z,client:k,promise:null};Un=_;let Z=()=>A&&Un===_&&P===w&&z===_.scope&&k===_.client;return T({modelComputePending:!0,modelComputeError:null}),_.promise=(async()=>{try{if(await tn(w,{action:"inspect-model-compute"}),!Z())return!1;let U=await tn(w,{action:"model-installer"});return Z()?(T({installer:U,installerFor:w,installerError:null}),L||(L=!0,ut(!0)),!0):!1}catch(U){if(!Z())return!1;let W=U?.uncertain||/TTS_TERMINATION_UNCONFIRMED/.test(String(U?.code??"")+" "+String(U?.message??""));return T({modelComputeError:String(U?.message??U),...W?{installerUncertain:!0,installerTerminationUnconfirmed:!0}:{}}),!1}finally{Z()&&(Un=null,T({modelComputePending:!1}))}})(),_.promise},Ln=null,yr=0,Rt=({clear:w=!1}={})=>{yr++;let _=Ln;Ln=null,_?.abort.abort(),T({performancePending:!1,performanceError:null,...w?{performance:null,performanceFor:null}:{}})},Xd=w=>{if(!A||P!==w)return Promise.resolve(!1);if(Ln?.id===w&&Ln.client===k)return Ln.promise;Rt();let _={id:w,client:k,epoch:yr,abort:new AbortController,promise:null};Ln=_,ue.add(_.abort),T({performancePending:!0,performanceError:null});let Z=()=>A&&Ln===_&&_.epoch===yr&&P===w&&k===_.client;return _.promise=(async()=>{let U;try{let W=new Promise((_e,ve)=>{U=()=>ve(new Error("Probe cancelled")),_.abort.signal.addEventListener("abort",U,{once:!0})}),ee=await Promise.race([tn(w,{action:"inspect-performance"},_.abort.signal),W]);return Z()?(T({performance:ee,performanceFor:w}),!0):!1}catch(W){return Z()&&!_.abort.signal.aborted&&T({performanceError:String(W?.message??W)}),!1}finally{_.abort.signal.removeEventListener("abort",U),ue.delete(_.abort),Z()&&(Ln=null,T({performancePending:!1}))}})(),_.promise},Dt=()=>{let w=M.get("conversation-stream");w&&(w.timer!==null&&t(w.timer),w.timer=null,w.ready=!1);let _=++I;if(V?.(),V=null,r++,T({...i,conversation:null,conversationFor:null,conversationError:null,listenModeReceiptRevision:null}),S=void 0,!A||!k)return;let Z=P;S=Fe(),V=k.subscribe(S,(U,W)=>{if(!(!A||_!==I||P!==Z))try{let ee=Vn("conversation",U);W?.initial||Cn("conversation-stream"),a.conversationHistory&&(a.conversationHistory.rootSessionId!==ee.rootSessionId||a.conversationHistory.scope!=="voice-session"&&a.conversationHistory.generation!==ee.historyGeneration)&&(r++,T({...i}));let _e=a.conversationHistory,ve={};if(_e?.rootSessionId&&_e.rootSessionId===ee.rootSessionId){let Re=new Map(_e.items.map(j=>[j.id,j]));for(let j of ee.items)Re.set(j.id,j);let Qe=[...Re.values()].sort((j,ke)=>j.at-ke.at),Nn=Qe.slice(-4e3),bn=Nn.reduce((j,ke)=>j+ke.text.length,0),En=Qe.length>4e3;for(;bn>4*1024*1024;)bn-=Nn.shift().text.length,En=!0;ve={conversationHistory:{..._e,items:Nn,truncated:_e.truncated||En}}}T({...ve,conversation:ee,conversationFor:Z,conversationError:null}),Ot(ee)}catch(ee){r++,T({...i,conversation:null,conversationFor:null,conversationError:String(ee.message)}),Ge(Z,"conversation-stream")}},U=>{A&&_===I&&(r++,T({...i,conversation:null,conversationFor:null,conversationError:String(U?.message??U)}),Ge(Z,"conversation-stream"))})},ut=(w=!1)=>{let _=M.get("model-stream");_&&(_.timer!==null&&t(_.timer),_.timer=null,_.ready=!1);let Z=++G;if(N?.(),N=null,w||T({installer:null,installerFor:null,installerError:null}),!A||!k?.subscribeModels||!L)return;let U=P;N=k.subscribeModels(U,(W,ee)=>{if(!(!A||Z!==G||P!==U||ee?.initial))try{let _e=Vn("model-installer",W),ve=a.installer?.ttsInstallIntent;if(Cn("model-stream"),T({installer:_e,installerFor:U,installerError:null}),_e.ttsInstallIntent&&(ve?.jobId!==_e.ttsInstallIntent.jobId||ve?.status!==_e.ttsInstallIntent.status)){let Re=_e.ttsInstallIntent.status==="applied";T({checkedFor:null}),Ke({settings:Re,force:!0})}}catch(_e){T({installer:null,installerFor:null,installerError:String(_e.message)}),Ge(U,"model-stream")}},W=>{A&&Z===G&&(T({installer:null,installerFor:null,installerError:String(W?.message??W)}),Ge(U,"model-stream"))})},In=()=>{if(X)return X;if(!H)return Promise.resolve(!0);let w=H,_=Ee;return w.cancelled=!0,w.abort.abort(),T({ttsCancelling:!0,ttsPreview:{status:"cancelling"}}),X=(async()=>{let Z=!1;try{let U=await tn(w.id,{action:"cancel-tts"});return U.status==="unconfirmed"?(B=null,re({ttsPreview:U,uncertain:!0,error:"\u65E0\u6CD5\u786E\u8BA4\u6717\u8BFB\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B\u540E\u518D\u8BD5\u3002"}),!1):(Z=!0,T({ttsPreview:U,..._===Ee?{ttsUncertain:!1}:{}}),!0)}catch(U){return B=null,re({ttsPreview:{status:"unconfirmed"},uncertain:!0,error:String(U?.message??U)}),!1}finally{Z&&H===w&&(H=null),T({ttsCancelling:!1}),X=null,queueMicrotask(()=>{xo(),mt()})}})(),X},Cn=w=>{let _=M.get(w);_?.timer!=null&&t(_.timer),M.delete(w)},wr=()=>{for(let w of M.keys())Cn(w)},Ge=(w,_)=>{if(!A||!C||P!==w||!["authorization","setup-status","conversation-stream","model-stream","update-stream"].includes(_)&&!Zn.has(_))return;let Z=M.get(_);Z||(Z={id:w,scope:z,attempts:0,timer:null,ready:!1},M.set(_,Z)),!(Z.timer!==null||Z.ready||!u||!d)&&(Z.attempts++,o("ui-read-recovery","requested"),Z.timer=n(()=>{Z.timer=null,!(!A||P!==w||Z.scope!==z||M.get(_)!==Z)&&(Z.ready=!0,mt())},Math.min(3e4,750*2**Math.min(Z.attempts-1,6))),Z.timer?.unref?.())},Hn=null,yo=0,dt=()=>{Hn!==null&&t(Hn),Hn=null,yo=0},Li=w=>{!A||!u||!d||P!==w||Hn!==null||yo>=10||(Hn=n(()=>{if(Hn=null,!(!A||P!==w||!["predecessor-cleanup-pending","helper-cleanup-pending"].includes(a.status?.voiceSession?.recovery?.kind))){if(a.busy||a.ttsCancelling){Li(w);return}yo++,Ye.run(w,"status")}},1e3),Hn?.unref?.())},Ye,nt=0,wo=null,Vt=null,pt=null,Zt=!1,Yd=async w=>{let _=k,Z=[],U=new Set;if(!A||!_?.readOperationLog)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u672A\u5C31\u7EEA");let W=null;do{w?.throwIfAborted();let ee=await _.readOperationLog(W?{cursor:W}:{},w);if(!A||k!==_||w?.aborted)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u8FDE\u63A5\u5DF2\u53D8\u5316");if(typeof ee?.text!="string"||!(ee.nextCursor===null||typeof ee.nextCursor=="string"&&ee.nextCursor)||U.has(ee.nextCursor))throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u5206\u9875\u65E0\u6548");Z.push(ee.text),W=ee.nextCursor,U.add(W)}while(W);return Z},Qd=async(w,_)=>{if(!A||!k?.manageSessions)throw new Error("\u9C7C\u5E94\u4F1A\u8BDD\u7BA1\u7406\u5C1A\u672A\u5C31\u7EEA");let Z=k,U=await Z.manageSessions(null,w,_);if(!A||k!==Z||_?.aborted)throw new Error("\u4F1A\u8BDD\u7BA1\u7406\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5");return U},ep=async(w,_)=>{if(!A||!k?.listExistingVoiceSessions)throw new Error("DSH \u4F1A\u8BDD\u5217\u8868\u6682\u4E0D\u53EF\u7528");let Z=k,U=await Z.listExistingVoiceSessions(w,_);if(!A||k!==Z||_?.aborted)throw new Error("\u4F1A\u8BDD\u5217\u8868\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5");return U},tt=null,np=async w=>{if(!A||!k?.setExistingVoiceSession||tt||a.existingSessionUnconfirmed)throw new Error("DSH \u4F1A\u8BDD\u7ED1\u5B9A\u6682\u4E0D\u53EF\u7528");let _=k,Z=new AbortController;tt=Z,ue.add(Z);for(let U of[v.get("status"),f])U?.action==="status"&&(U.stale=!0,U.abort.abort());T({existingSessionWritePending:!0});try{let U=await _.setExistingVoiceSession(w,Z.signal);if(!A||k!==_||Z.signal.aborted)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u786E\u8BA4");return a.status&&T({status:{...a.status,existingVoiceSession:U.binding}}),S!==Fe()&&Dt(),U}catch(U){throw T({existingSessionUnconfirmed:!0}),U}finally{ue.delete(Z),tt=null,T({existingSessionWritePending:!1}),Ke({force:!0})}},tp=async(w,_)=>{if(!A||!k?.senseVoiceAsrAction)throw new Error("\u8BC6\u522B\u6A21\u578B\u7BA1\u7406\u6682\u4E0D\u53EF\u7528");let Z=k,U=await Z.senseVoiceAsrAction(w,_);if(!A||k!==Z||_?.aborted)throw new Error("\u8BC6\u522B\u6A21\u578B\u72B6\u6001\u5DF2\u5207\u6362");if(!(ee=>ee&&["idle","downloading","ready","error"].includes(ee.state)&&Number.isSafeInteger(ee.receivedBytes)&&Number.isSafeInteger(ee.totalBytes)&&ee.receivedBytes>=0&&ee.receivedBytes<=ee.totalBytes)(U)||typeof U.selected!="boolean"||U.message!==null&&(typeof U.message!="string"||U.message.length>512))throw new Error("\u8BC6\u522B\u6A21\u578B\u72B6\u6001\u65E0\u6548");return U},jn=async({open:w=!1,initial:_=!1}={})=>{if(!k?.readAuthorization)return!1;if(Vt)return pt={open:w||pt?.open,initial:_||pt?.initial},w&&T({authorizationOpen:!0}),!1;let Z=++nt,U=new AbortController;ue.add(U),wo=U,T({authorizationLoading:!0,authorizationError:null,...w?{authorizationOpen:!0}:{}});try{let W=Vn("authorization",await k.readAuthorization(U.signal));return!A||Z!==nt?!1:(Cn("authorization"),T({authorization:W,authorizationUncertain:W.revocationUnconfirmed,..._&&!Zt&&(!W.completed||W.usageAgreement?.accepted!==!0||W.revocationUnconfirmed)?{authorizationOpen:!0}:{}}),!0)}catch(W){return A&&Z===nt&&(T({authorizationError:String(W?.message??W),authorizationUncertain:!0,..._?{authorizationOpen:!0}:{}}),Ge(P,"authorization")),!1}finally{ue.delete(U),wo===U&&(wo=null,A&&T({authorizationLoading:!1}))}},op=async w=>{if(!k?.saveAuthorization||!a.authorization||a.authorizationBusy||a.authorizationUncertain)return!1;let _=new AbortController,Z=++nt,U=k;ue.add(_),Vt=_,T({authorizationBusy:!0,authorizationError:null});try{let W=Vn("authorization",await U.saveAuthorization({revision:a.authorization.revision,grant:w},_.signal));return!A||Z!==nt||k!==U?!1:(Zt=!1,T({authorization:W,authorizationOpen:W.revocationUnconfirmed,authorizationUncertain:W.revocationUnconfirmed,...W.revocationUnconfirmed?{authorizationError:"\u6743\u9650\u5DF2\u64A4\u56DE\uFF0C\u4F46\u5F53\u524D\u97F3\u9891\u505C\u6B62\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u6838\u67E5\u72B6\u6001\u3002"}:{}}),w&&!W.revocationUnconfirmed&&Ye.openSetup(),Ke({settings:!0,force:!0}),!0)}catch(W){try{let ee=Vn("authorization",await U.readAuthorization(_.signal));if(A&&k===U&&Z===nt&&ee.completed&&ee.granted===w&&!ee.revocationUnconfirmed)return Zt=!1,T({authorization:ee,authorizationOpen:!1,authorizationUncertain:!1}),w&&Ye.openSetup(),!0}catch{}return A&&k===U&&Z===nt&&(T({authorizationUncertain:!0,authorizationError:String(W?.message??W)}),Ge(P,"authorization")),!1}finally{if(ue.delete(_),Vt===_&&(Vt=null,A&&T({authorizationBusy:!1}),A&&(pt||k!==U))){let W=pt??{initial:!0};pt=null,jn(W)}}},ot=null,xr=0,_r=()=>{if(!k?.readSetup||ot)return ot?.promise;let w=k,_=xr,Z=new AbortController,U={promise:null};return ot=U,ue.add(Z),U.promise=(async()=>{try{let W=Vn("setup-status",await w.readSetup(Z.signal));return!A||k!==w?!1:(Cn("setup-status"),T({setupStatus:W,...m===_&&!Zt?{setupOpen:!W.completed}:{},setupError:null}),W.completed?Ke({settings:!0}):xo(),!0)}catch(W){return A&&k===w&&(T({setupError:String(W?.message??W)}),Ge(P,"setup-status")),!1}finally{ue.delete(Z),ot===U&&(ot=null)}})(),U.promise},mt=async()=>{if(!(e||k?.action||k?.readAuthorization||k?.readSetup||k?.subscribeUpdates)||!A||!C||!u||!d||D||tt||a.busy||a.ttsCancelling||!B&&![...M.values()].some(U=>U.ready))return;if(!B){let[U,W]=[...M].find(([,ee])=>ee.ready);if(W.ready=!1,W.id!==P||W.scope!==z){Cn(U);return}D=!0;try{U==="authorization"?await jn():U==="setup-status"?await _r():U==="conversation-stream"?Dt():U==="model-stream"?ut(!0):U==="update-stream"?Oe():await Ye.run(W.id,U)}finally{D=!1,queueMicrotask(()=>{mt()})}return}let w=B;B=null;let _=()=>A&&w.id===P&&w.scope===z;if(!_())return;let Z=()=>_()?!u||!d||tt||a.busy||a.ttsCancelling?(B||(B=w),!0):!1:!0;D=!0;try{if(w.notified||(w.notified=!0,E=w.id,$=Date.now(),T({readRefresh:(a.readRefresh??0)+1})),Z()||(w.settings&&(w.settings=!1,await Ye.run(w.id,"read-settings",{},!0)),Z()))return;w.status&&(w.status=!1,await Ye.run(w.id,"status",{},!0)),_()&&w.id&&!q.has(w.id)&&(q.add(w.id),Ye.run(w.id,"inspect-performance"))}finally{D=!1,queueMicrotask(()=>{mt()})}},Ke=({settings:w=!1,force:_=!1}={})=>{if(Oe(),!(!A||!C)&&!(!_&&!w&&E===P&&Date.now()-$<1500)&&(a.authorizationUncertain&&!wo&&!Vt&&jn(),a.setupError&&!ot&&_r(),!(!P&&!a.setupOpen&&a.setupStatus===null))){a.installerError&&L&&ut(!0);for(let Z of M.values())Z.id===P&&(Z.timer!==null&&t(Z.timer),Z.timer=null,Z.attempts=0,Z.ready=!0);Hn===null&&(yo=0),(!B||B.scope!==z)&&o("ui-status-refresh","requested"),B={id:P,scope:z,settings:!0,status:!0,notified:!1},queueMicrotask(()=>{mt()})}},Hi=()=>{let w=u&&d;if(a.readVisible!==w){if(T({readVisible:w}),!w){b();for(let _ of M.values())_.timer!==null&&t(_.timer),_.timer=null,_.ready=!1;dt();return}Ke({force:!0})}},xo=async()=>{let w=P;!(e||k?.action)||a.setupStatus?.completed!==!1||me.has(w)||a.busy||a.ttsCancelling||(me.add(w),await Ye.run(w,"read-settings")&&P===w&&await Ye.run(w,"status"))};return Ye={getSnapshot:()=>a,async pickPath(w,_,Z){if(!A||P!==w)return null;let U=z,W=e??k?.action;if(!W)throw new Error("\u9C7C\u5E94\u754C\u9762\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let ee=await W(w,{action:"pick-local-path",kind:_},Z);if(!A||P!==w||U!==z||Z?.aborted)return null;if(!ee||!(ee.path===null||typeof ee.path=="string"&&ee.path.length>0&&ee.path.length<=4096&&!/[\u0000-\u001f\u007f]/.test(ee.path)))throw new Error("\u8DEF\u5F84\u9009\u62E9\u7ED3\u679C\u65E0\u6548");return ee.path},async captureBindings(w,_){let Z=await tn(w,{action:"capture-bindings",..._});if(!Z||typeof Z.token!="string"||typeof Z.paused!="boolean")throw new Error("\u6309\u952E\u5F55\u5165\u56DE\u6267\u65E0\u6548");return Z},setReadVisibility(w){u=!!w,Hi()},setPanelVisible(w){d=!!w,Hi()},markSettingsEdited(w="save-settings"){uo.includes(w)&&(l.add(w),T({settingsDraftActions:[...l]}))},discardSettingsDraft(w){w?l.delete(w):l.clear(),T({settingsDraftActions:[...l]}),!l.size&&(c&&T({settings:c,settingsFor:P}),c=null,T({settingsConflict:!1,settingsKey:a.settings?.revision}))},enableAutomaticReads(){C=!0,Ke({settings:!0,force:!0})},refresh:Ke,refreshModelCompute:Jd,subscribe(w){return ce.add(w),()=>ce.delete(w)},setSession(w){P!==w&&(P=w,z++,Un=null,l.clear(),c=null,T({sourcePending:!0,checkedFor:void 0,settingsFor:void 0,modelComputePending:!1,modelComputeError:null,enableError:null,listenModeError:!1,newChatFor:void 0,settingsConflict:!1,settingsDraftActions:[],installPlan:null,installPlanFor:null}),wr(),Rt({clear:!0}),ct({clear:!0}),dt(),In(),x(),Dt(),ut(),Ke({settings:!0,force:!0}),xo())},attachConversationClient(w){k!==w&&(lt(),z++,Un=null,T({modelComputePending:!1,modelComputeError:null}),wr(),Rt({clear:!0}),ct({clear:!0}),x(),q.clear()),k=w,jn({initial:!0}),Dt(),ut(),Ke({settings:!0,force:!0}),k.readSetup&&(ot=null,xr=m,_r())},conversationUnavailable(w){r++,T({...i,error:String(w?.message??w),conversation:null,conversationFor:null,conversationError:String(w?.message??w)})},async dismissSetup(){let w=++m,_=await In();return _&&w===m&&(x(),Ye.discardSettingsDraft(),T({setupOpen:!1})),_&&w===m},async showHome(){let w=++m,_=await In();return _&&w===m&&(x(),Ye.discardSettingsDraft(),T({setupOpen:!1,panelView:"home"}),Ke()),_&&w===m},async openSettings(w="audio",_="conversation"){let Z=++m,U=await In();return U&&Z===m&&(x(),T({setupOpen:!1,panelView:"settings",settingsTab:["audio","interaction","prompt","models","advanced","sessions","pets"].includes(w)?w:"audio",settingsModelTab:_,sessionManagementRoot:null,sessionHistoryOpen:!1}),Ke({settings:!0})),U&&Z===m},readOperationLog:Yd,manageSessions:Qd,listExistingVoiceSessions:ep,retryVoiceTranscript:et,setExistingVoiceSession:np,setSettingsTab(w){w!==a.settingsTab&&T({settingsTab:w,sessionManagementRoot:null,sessionHistoryOpen:!1})},setSettingsModelTab(w){T({settingsModelTab:w})},setSessionManagement({rootId:w=a.sessionManagementRoot,historyOpen:_}){T({sessionManagementRoot:w,sessionHistoryOpen:_})},senseVoiceAsrAction:tp,updateAction:Pn,dismissUpdate(w){w&&T({dismissedUpdateVersion:w})},openSetup(){++m,x(),T({setupOpen:!0}),Ke({settings:!0,force:!0}),!C&&!a.busy&&(async()=>{let w=P;await Ye.run(w,"read-settings")&&P===w&&await Ye.run(w,"status")})()},cancelPreview:In,discardDiagnostics:x,refreshAuthorization:jn,saveAuthorization:op,openAuthorization:()=>jn({open:!0}),closeAuthorization({resumeSetup:w=!1}={}){return!a.authorizationBusy&&!a.authorizationLoading?(Zt=!w,++m,xr=m,T({authorizationOpen:!1,setupOpen:w}),w&&Ke({settings:!0}),!0):!1},async run(w,_,Z={},U=!1){if(!A||tt&&_==="status"||(tt||a.existingSessionUnconfirmed)&&["enable","new","resume"].includes(_))return!1;let W=!!(U&&Zn.has(_)&&!a.uncertain&&a.checkedFor===w&&a.settingsFor===w&&a.status&&a.settings);if(W&&v.has(_))return!1;if(U||b(),_==="read-history"){if(P!==w||a.conversationHistoryLoading)return!1;let j=++r,ke=z,ln=I;T({conversationHistoryLoading:!0,conversationHistoryError:null,conversationHistoryRequestCursor:Z.cursor??null});try{let Ve=await tn(w,{action:_,...Z});if(!A||P!==w||ke!==z||j!==r||ln!==I||a.conversation?.rootSessionId&&(a.conversation.rootSessionId!==Ve.rootSessionId||Ve.scope!=="voice-session"&&a.conversation.historyGeneration!==Ve.generation))return!1;let Tn=a.conversationHistory;if(Z.cursor&&(!Tn||Tn.generation!==Ve.generation||Tn.rootSessionId!==Ve.rootSessionId))return!1;let _o=new Map(Ve.items.map(fn=>[fn.id,fn]));if(Z.cursor)for(let fn of Tn.items)_o.set(fn.id,fn);if(a.conversation?.rootSessionId===Ve.rootSessionId)for(let fn of a.conversation?.items??[])_o.set(fn.id,fn);let Bt=[..._o.values()].sort((fn,kr)=>fn.at-kr.at),ko=Z.cursor?Bt.slice(0,4e3):Bt.slice(-4e3),ji=ko.reduce((fn,kr)=>fn+kr.text.length,0),Gi=Bt.length>4e3;for(;ji>4*1024*1024;)ji-=(Z.cursor?ko.pop():ko.shift()).text.length,Gi=!0;return T({conversationHistory:{...Ve,items:ko,truncated:Ve.truncated||Gi||!!(Z.cursor&&Tn?.truncated)},conversationHistoryFor:w}),!0}catch(Ve){return j===r&&T({conversationHistoryError:String(Ve?.message??Ve)}),!1}finally{j===r&&T({conversationHistoryLoading:!1})}}if(_==="apply-model-install"&&["save-models","save-tts"].some(j=>l.has(j)))return T({error:"\u8BF7\u5148\u4FDD\u5B58\u6216\u653E\u5F03\u6A21\u578B\u8BBE\u7F6E\u8349\u7A3F\uFF0C\u518D\u5207\u6362\u6A21\u578B\u3002"}),!1;if(_==="read-audio-devices")return de(w);if(_==="inspect-performance")return Xd(w);if(_==="cancel-tts"){if(H)return In();try{let j=await tn(w,{action:_});return T({ttsPreview:j,ttsPreviewFor:w}),j.status==="unconfirmed"?(re({uncertain:!0,error:"\u65E0\u6CD5\u786E\u8BA4\u6717\u8BFB\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B\u3002"}),!1):!0}catch(j){return re({error:String(j?.message??j),uncertain:!0}),!1}}let ee=_==="disable"&&f&&!p;if(a.busy&&!ee||a.ttsCancelling||a.settingsConflict&&uo.includes(_)||a.agentPermissionUncertain&&_==="save-agent-permissions"||a.agentRequestUncertain&&_==="decide-agent-request"||a.ttsUncertain&&!At.includes(_)&&_!=="disable"||a.visibilityUncertain&&!At.includes(_)||a.outputVolumeUncertain&&_==="set-output-volume"||a.installerUncertain&&["start-model-install","control-model-install","apply-model-install"].includes(_))return!1;if(!w&&(w!==null||!Ru.has(_)))return T({error:"\u6B64\u64CD\u4F5C\u9700\u8981\u4F1A\u8BDD\u6765\u6E90"}),!1;let _e;if(ee&&(f.stale=!0,Zn.has(f.action)&&f.abort.abort(),_e=p=Symbol("diagnostic-stop")),!At.includes(_)){dt();for(let j of Zn)Cn(j)}(uo.includes(_)||po.includes(_)&&_!=="status")&&Rt({clear:_!=="set-performance-mode"});let ve;(_h.includes(_)||Zn.has(_))&&(ve={id:w,action:_,abort:new AbortController,stale:!1},W?v.set(_,ve):f=ve),W||(y++,T({busy:!0,error:null,..._==="enable"?{enableError:null}:{},..._==="save-bindings"?{bindingError:null}:{},interruptibleRead:f?.action??null,diagnosticStopPending:!!p,..._==="listen-mode"?{listenModePending:Z.mode,listenModeBefore:a.conversation?.helper?.listenMode??a.status?.listenMode}:{},..._!=="status"&&po.includes(_)?{listenModeError:!1}:{}}));let Re,Qe=z,Nn=co(a.status),bn=a.checkedFor,En=Ee;try{if(ve?.stale)return!1;let j;if(["read-output-volume","set-output-volume"].includes(_)){if(!k)throw new Error("\u8BED\u97F3\u8F93\u51FA\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let ke=ve?.abort??new AbortController;ue.add(ke);let ln;try{let Ve=_==="read-output-volume"?k.readVolume(w,ke.signal):k.setVolume(w,Z,ke.signal),Tn=_==="read-output-volume"?await Promise.race([Ve,new Promise((_o,Bt)=>{ln=()=>Bt(new Error("Read cancelled")),ke.signal.addEventListener("abort",ln,{once:!0})})]):await Ve;j=Vn("output-volume",Tn)}finally{ke.signal.removeEventListener("abort",ln),ue.delete(ke)}}else{if(_==="preview-tts"&&(Re={id:w,abort:new AbortController,cancelled:!1},H=Re,T({ttsPreview:{status:"preparing"},ttsPreviewFor:w})),Zn.has(_)){let ke,ln=new Promise((Ve,Tn)=>{ke=()=>Tn(new Error("Read cancelled")),ve.abort.signal.addEventListener("abort",ke,{once:!0})});try{j=await Promise.race([tn(w,{...Z,action:_},ve.abort.signal),ln])}finally{ve.abort.signal.removeEventListener("abort",ke)}}else j=await tn(w,{...Z,action:_},Re?.abort.signal??ve?.abort.signal);if(ve?.stale)return!1}if(ve?.stale||At.includes(_)&&(!A||Qe!==z))return!1;if(Zn.has(_)&&Cn(_),["agent-permissions","save-agent-permissions"].includes(_)&&T({agentPermissions:j,agentPermissionsFor:w,agentPermissionUncertain:!1}),["agent-requests","decide-agent-request"].includes(_)&&(T({agentRequests:j,agentRequestsFor:w,agentRequestUncertain:!1}),_==="decide-agent-request"&&j.lastOutcome?.state==="completed"&&(T({checkedFor:null}),Ke({settings:!0,force:!0})),_==="decide-agent-request"&&j.lastOutcome?.state==="unknown"&&T({uncertain:!0,error:"\u64CD\u4F5C\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u5148\u8BFB\u53D6\u5B9E\u9645\u72B6\u6001\uFF0C\u4E0D\u8981\u91CD\u8BD5\u3002"})),po.includes(_)){if(_==="listen-mode"){if(P!==w||Qe!==z)return!1;if(j.listenMode!==Z.mode)throw new Error("\u8BF4\u8BDD\u65B9\u5F0F\u7684\u56DE\u6267\u5C1A\u672A\u786E\u8BA4")}if(Qe!==z)return!0;if(["status","disable"].includes(_)&&j.ttsRuntime){let Ve=!!(j.ttsRuntime.blocked||a.ttsUncertain&&(j.ttsRuntime.busy||En!==Ee));j.ttsRuntime.blocked&&Ee++,T({ttsUncertain:Ve}),!Ve&&!j.ttsRuntime.busy&&!X&&H?.cancelled&&(H=null)}let ke=a.visibilityUncertain&&!(_==="status"&&a.visibilityReadbackFor===w),ln=Object.hasOwn(j,"existingVoiceSession");!ln&&Object.hasOwn(a.status??{},"existingVoiceSession")&&(j={...j,existingVoiceSession:a.status.existingVoiceSession,existingVoiceSessionSupported:a.status.existingVoiceSessionSupported}),T({status:j,checkedFor:w,uncertain:ke,visibilityUncertain:ke,...ke?{}:{visibilityReadbackFor:null},...W?{error:null}:{},...P===w?{sourcePending:!1}:{},..._==="status"&&ln?{existingSessionUnconfirmed:!1}:{},..._==="listen-mode"?{listenModeReceiptRevision:a.conversation?.revision??null}:{}}),We&&(!j.enabled||j.existingVoiceSession?.sessionId!==We.sessionId)&&$t(),["predecessor-cleanup-pending","helper-cleanup-pending"].includes(j.voiceSession?.recovery?.kind)?Li(w):dt()}if(Ku.includes(_)&&(_!=="read-settings"&&Qe===z&&(l.delete(_),T({settingsDraftActions:[...l]})),_==="read-settings"&&l.size>0&&a.settingsFor===w&&a.settings?.revision!==j.revision?(c=j,T({settingsConflict:!0})):(c=null,T({settings:j,settingsFor:w,settingsConflict:!1,settingsKey:l.size>0?a.settingsKey:j.revision})),j.onboarding&&Cn("setup-status"),T({...j.onboarding?{setupStatus:j.onboarding,setupError:null}:{},..._==="read-settings"&&a.visibilityUncertain&&["hidden","workspace"].includes(j.voiceSession?.visibility)?{visibilityReadbackFor:w}:{}})),_==="read-settings"&&a.visibilityUncertain&&Ge(w,"status"),_==="conversation-models"&&T({conversationModels:j,conversationModelsFor:w,conversationModelsError:null}),_==="inspect-tts"&&T({ttsCapabilities:j,ttsCapabilitiesFor:w}),_==="save-tts"&&j.ttsSetup?.provider==="deepseek"&&j.ttsSetup.deepseekTextTransmissionAccepted&&!a.authorization?.scopes?.some(ke=>ke.id==="deepseek-text"&&ke.allowed)&&jn(),_==="preview-tts"&&!Re.cancelled&&T({ttsPreview:{...j,status:"completed"},ttsPreviewFor:w}),["read-output-volume","set-output-volume"].includes(_)&&T({outputVolume:j,outputVolumeFor:w,outputVolumeUncertain:!1}),["save-voice-prompt","save-conversation-model","set-visibility","set-performance-mode","save-tts","apply-model-install"].includes(_)&&(T({status:null,checkedFor:null,catalog:null,catalogFor:null}),Ke({force:!0})),_==="plan-model-install"&&T({installPlan:j,installPlanFor:w,installPlanRequest:{...Z}}),_==="model-installer"&&(T({installer:j,installerFor:w,installerUncertain:!!a.installerTerminationUnconfirmed}),P===w&&!L&&(L=!0,ut(!0))),_==="inspect-model-compute"&&a.installerFor===w&&a.installer&&T({installer:{...a.installer,compute:j}}),_==="start-model-install"&&T({installPlan:null,installPlanFor:null}),_==="list"){let ke=Z.cursor&&a.catalogFor===w?a.catalog?.items??[]:[];T({catalog:{...j,items:[...new Map([...ke,...j.items].map(ln=>[ln.id,ln])).values()]},catalogFor:w})}return["new","resume","listen-mode"].includes(_)&&T({catalog:null}),["new","resume"].includes(_)&&P===w&&Qe===z&&(r++,T({...i,newChatFor:_==="new"&&Z.expectedOwnerSessionId!==void 0?w:void 0})),_==="listen-mode"&&(a.setupOpen&&T({settingsFor:void 0}),Ke({settings:!0,force:!0})),["status","enable","disable","new","resume"].includes(_)&&P===w&&(_!=="status"||bn!==w||Nn!==co(j)||S!==Fe()||a.conversationError)&&Dt(),!0}catch(j){return _==="listen-mode"&&(P!==w||Qe!==z)||(ve&&(j?.uncertain||/TTS_TERMINATION_UNCONFIRMED/.test(String(j?.code??"")+" "+String(j?.message??"")))&&(_==="inspect-tts"?re({}):T({installerUncertain:!0,installerTerminationUnconfirmed:!0})),ve?.stale||At.includes(_)&&Qe!==z)||Re?.cancelled?!1:(_==="status"&&(dt(),P===w&&Qe===z&&T({sourcePending:!1})),At.includes(_)||(B=null),/AUTHORIZATION_REQUIRED/.test(String(j?.message??j))&&jn({open:!0}),Re&&typeof j?.code=="string"&&j.code.startsWith("TTS_DEEPSEEK_")&&!j.uncertain?(await In()&&T({ttsPreview:{status:"failed",provider:"deepseek",detail:String(j.message).split(`
`)[0].slice(0,256)},ttsPreviewFor:w}),!1):(Re&&await In(),_==="preview-tts"&&Ee++,_==="enable"&&P===w&&Qe===z&&T({enableError:String(j?.message??j)+(j?.code?" ["+j.code+"]":"")}),_==="listen-mode"&&P===w&&Qe===z&&T({listenModeError:!0}),T({error:String(j?.message??j),..._==="conversation-models"?{conversationModelsError:String(j?.message??j),conversationModels:null,conversationModelsFor:w}:{},..._==="save-bindings"?{bindingError:String(j?.message??j)+(j?.code?" ["+j.code+"]":"")}:{},..._==="save-agent-permissions"?{agentPermissionUncertain:!0}:{},..._==="decide-agent-request"?{agentRequestUncertain:!0}:{},..._==="preview-tts"?{ttsPreviewFor:w,ttsUncertain:!0}:{},..._==="set-output-volume"?{outputVolumeUncertain:!0}:{},...uo.includes(_)?{uncertain:!0,visibilityUncertain:!0,visibilityReadbackFor:null}:{},...["start-model-install","control-model-install"].includes(_)?{installerUncertain:!0}:{},...po.includes(_)?{uncertain:!0,readOnlyFailure:_==="status"&&(!a.uncertain||a.readOnlyFailure===!0)}:{}}),Zn.has(_)&&Ge(w,_),uo.includes(_)?(Ge(w,"read-settings"),Ge(w,"status")):po.includes(_)&&_!=="status"?Ge(w,"status"):_==="set-output-volume"?Ge(w,"read-output-volume"):_==="save-agent-permissions"?Ge(w,"agent-permissions"):_==="decide-agent-request"?Ge(w,"agent-requests"):["start-model-install","control-model-install"].includes(_)&&Ge(w,"model-installer"),!1))}finally{v.get(_)===ve&&v.delete(_),Re&&H===Re&&!Re.cancelled&&(H=null),ve&&f===ve&&(f=null),_e&&p===_e&&(p=null),W||(y--,T({busy:y>0,interruptibleRead:f?.action??null,diagnosticStopPending:!!p,..._==="listen-mode"?{listenModePending:null}:{}})),queueMicrotask(()=>{xo(),mt()})}},dispose(){if(A){z++,wr(),l.clear(),c=null,T({settingsConflict:!1,settingsDraftActions:[]}),Rt({clear:!0}),ct({clear:!0}),dt(),In(),x(),f?.abort.abort(),lt(),A=!1,I++,G++,V?.(),N?.();for(let w of ue)w.abort();ue.clear(),ce.clear()}}},Ye}function mo(e,n,t,o=12){let r=n.left+o,i=n.top+o;return{x:Math.max(r,Math.min(e.x,Math.max(r,n.right-t.width-o))),y:Math.max(i,Math.min(e.y,Math.max(i,n.bottom-t.height-o)))}}function Xu(e=window){let n=null,t=null,o=null,r=null,i=null,a=null,l=null,c=null,u=null,d=()=>e.performance?.now?.()??Date.now(),m=e.matchMedia?.("(prefers-reduced-motion: reduce)"),f=()=>{c!==null&&e.cancelAnimationFrame?.(c),c=null,u&&(u=null,A("endDrag"))},p=S=>{if(c=null,!u||!n)return;if(m?.matches||n.dataset?.motion==="off"){f();return}let N=Math.max(0,S-u.time);u.time=S;let I={...r},G=!1;for(let L of["x","y"]){let H=u[L],X=(H.target-r[L])*Math.exp(-N/H.tau);I[L]=Math.abs(X)<.5?H.target:H.target-X,I[L]!==H.target&&(G=!0)}r=mo(I,i.box,i.size),v(),A("move");for(let L of["x","y"])Math.abs(r[L]-I[L])>.01&&(u[L].target=r[L]);!G||S-u.start>=2400?f():c=e.requestAnimationFrame(p)},y=(S,N)=>{n.style[S]!==N&&(n.style[S]=N)},v=()=>{y("left",`${r.x}px`),y("top",`${r.y}px`)},b=null,x=null,C="",B=()=>{let S=(n?.closest("[data-shell-overlay]")??n?.ownerDocument?.querySelector?.("[data-shell-overlay]"))?.getBoundingClientRect(),N=e.visualViewport,I=Math.max(S?.left??0,N?.offsetLeft??0),G=Math.max(S?.top??0,N?.offsetTop??0),L=Math.min(S?.right??e.innerWidth,(N?.offsetLeft??0)+(N?.width??e.innerWidth)),H=Math.min(S?.bottom??e.innerHeight,(N?.offsetTop??0)+(N?.height??e.innerHeight)),X=parseFloat(e.getComputedStyle(n).getPropertyValue("--dsh-frame-top-clearance"))||0;return{left:I,top:G+X,right:L,bottom:H}},D=S=>{if(!n)return;let N=Number.isFinite(S?.width)&&Number.isFinite(S?.height),I=N&&i?i.box:B();y("maxWidth",`${Math.max(1,I.right-I.left-24)}px`),y("maxHeight",`${Math.max(1,I.bottom-I.top-24)}px`);let G=N?S:n.getBoundingClientRect();i={box:I,size:{width:G.width,height:G.height}},r=mo(r??{x:I.right-G.width-20,y:I.bottom-G.height-20},I,G),v(),!o&&!u&&A("resize")},E=()=>{l!==null&&e.cancelAnimationFrame?.(l),l=null},$=()=>{E();let S=a;a=null,!(!o||!n||!S)&&(r=mo(S,i.box,i.size),v(),A("move"))},z=S=>{n?.dataset&&(S&&["left","right","top","bottom"].includes(S.edge)&&["preview","docked"].includes(S.phase)?(n.dataset.whaleDockEdge=S.edge,n.dataset.whaleDockPhase=S.phase):(delete n.dataset.whaleDockEdge,delete n.dataset.whaleDockPhase))},M=()=>{let S=x;x=null;try{S?.dispose()}catch{}z(null),n&&(n.style.zIndex=C)},A=S=>{try{typeof x?.[S]=="function"&&x[S]()}catch{M()}},k=()=>{if(M(),!(!n||b?.version!==1||typeof b.register!="function"))try{x=b.register({id:"whale-voice",read(){let{box:S,size:N}=i;return{rect:{...r,width:N.width,height:N.height},bounds:{x:S.left+12,y:S.top+12,width:Math.max(1,S.right-S.left-24),height:Math.max(1,S.bottom-S.top-24)},collapsed:n.hasAttribute?.("data-collapsed")===!0}},apply(S){!n||!Number.isFinite(S?.x)||!Number.isFinite(S?.y)||(r=mo(S,i.box,i.size),v())},onDock:z,onFront:S=>{n&&(n.style.zIndex=S===!0?"901":"900")}}),["beginDrag","move","endDrag","resize","detach","dispose"].every(S=>typeof x?.[S]=="function")||M()}catch{M()}},P=(S=!1,N=!1)=>{S?$():(E(),a=null);let I=o;o=null,I?.target.hasPointerCapture?.(I.id)&&I.target.releasePointerCapture(I.id);let G=d(),L=I?.samples??[],H=L.at(-1),X=L[0],ce=H&&X?H.time-X.time:0,ue=H?G-H.time:1/0,me=Math.max(0,1-Math.max(0,ue-24)/56),q=ce>0?(H.x-X.x)/ce*me:0,T=ce>0?(H.y-X.y)/ce*me:0;if(I&&N&&!m?.matches&&n?.dataset?.motion!=="off"&&typeof e.requestAnimationFrame=="function"&&Math.hypot(q,T)>.04){let Q=mo({x:r.x+q*240,y:r.y+T*240},i.box,i.size),le=(ge,$e)=>({target:Q[ge],tau:$e?Math.max(1,Math.abs((Q[ge]-r[ge])/$e)):240});u={x:le("x",q),y:le("y",T),time:G,start:G},c=e.requestAnimationFrame(p)}else I&&A(S?"endDrag":"detach")},V=()=>{f(),P(),M(),t?.disconnect(),t=null,e.removeEventListener("resize",D),e.visualViewport?.removeEventListener("resize",D),e.visualViewport?.removeEventListener("scroll",D),n=null,i=null};return{ref(S){if(S===n||(V(),!S))return;n=S,C=S.style.zIndex||"",n.style.transitionProperty="none",t=new e.ResizeObserver(I=>{let G=I?.find?.(H=>H.target===n),L=G?.borderBoxSize?.[0]??G?.borderBoxSize;Number.isFinite(L?.inlineSize)&&Number.isFinite(L?.blockSize)&&I.every(H=>H.target===n)?D({width:L.inlineSize,height:L.blockSize}):D()}),t.observe(n);let N=n.closest("[data-shell-overlay]")??n.ownerDocument?.querySelector?.("[data-shell-overlay]");N&&t.observe(N),e.addEventListener("resize",D),e.visualViewport?.addEventListener("resize",D),e.visualViewport?.addEventListener("scroll",D),D(),k()},useLayoutService(S){return b=S,k(),()=>{b===S&&(M(),b=null,D())}},activate(){f(),A("activate")},pointerDown(S,N=S.currentTarget){S.button!==0||S.pointerType&&S.pointerType!=="mouse"||!n||(f(),D(),A("beginDrag"),o={id:S.pointerId,target:N,x:S.clientX,y:S.clientY,start:{...r},samples:[{x:S.clientX,y:S.clientY,time:d()}]},N.setPointerCapture(S.pointerId),S.preventDefault())},pointerMove(S){if(!o||S.pointerId!==o.id)return;let N=d(),I=[S];try{I=[...S.getCoalescedEvents?.()??[],S]}catch{}for(let X of I){if(!Number.isFinite(X.clientX)||!Number.isFinite(X.clientY))continue;let ce=Number.isFinite(X.timeStamp)&&Number.isFinite(S.timeStamp)?Math.min(0,X.timeStamp-S.timeStamp):0,ue=N+Math.max(-60,ce),me=o.samples.at(-1);if(ue<me.time)continue;let q={x:X.clientX,y:X.clientY,time:ue};ue===me.time?o.samples[o.samples.length-1]=q:o.samples.push(q)}let G=N-60;for(;o.samples.length>2&&o.samples[1].time<=G;)o.samples.shift();let L=o.samples[0],H=o.samples[1];if(H&&L.time<G&&H.time>G){let X=(G-L.time)/(H.time-L.time);o.samples[0]={x:L.x+(H.x-L.x)*X,y:L.y+(H.y-L.y)*X,time:G}}a={x:o.start.x+S.clientX-o.x,y:o.start.y+S.clientY-o.y},typeof e.requestAnimationFrame!="function"?$():l===null&&(l=e.requestAnimationFrame($))},pointerEnd(S){S.pointerId===o?.id&&P(!["pointercancel","lostpointercapture"].includes(S.type),S.type==="pointerup")},keyDown(){},fit:D,dispose:V}}var Ti=Object.freeze({panel:320,settings:660,setup:420,collapsed:216});function Yu(e=window,{onResize:n=()=>{}}={}){let t=null,o=null,r=null,i=null,a=null,l=null,c=null,u=null,d=null,m=null,f=null,p=null,y=null,v=null,b=null,x=null,C={width:0,height:0},B=e.matchMedia?.("(prefers-reduced-motion: reduce)"),D=()=>B?.matches?"off":t?.dataset.motion??"spring",E=S=>Number.parseFloat(S)||0;function $(){let S=e.visualViewport,N=(t.closest?.("[data-shell-overlay]")??t.ownerDocument?.querySelector?.("[data-shell-overlay]"))?.getBoundingClientRect(),I=Math.max(N?.left??0,S?.offsetLeft??0),G=Math.max(N?.top??0,S?.offsetTop??0),L=Math.min(N?.right??e.innerWidth,(S?.offsetLeft??0)+(S?.width??e.innerWidth)),H=Math.min(N?.bottom??e.innerHeight,(S?.offsetTop??0)+(S?.height??e.innerHeight)),X=e.getComputedStyle(t);return{width:Math.max(1,L-I-24),height:Math.max(1,Math.min((H-G)*.6,H-G-24-E(X.getPropertyValue("--dsh-frame-top-clearance")))),chrome:E(X.paddingTop)+E(X.paddingBottom)+E(X.borderTopWidth)+E(X.borderBottomWidth),horizontalChrome:E(X.paddingLeft)+E(X.paddingRight)+E(X.borderLeftWidth)+E(X.borderRightWidth),panelRadius:E(X.getPropertyValue("--dsw-radius-lg"))||12}}function z(){c!==null&&e.cancelAnimationFrame(c),c=null,d=null}function M(){!t||!m||(m.width=Math.max(1,Math.min(m.width,p.width)),m.height=Math.max(1,Math.min(m.height,p.height)),t.style.width=`${m.width.toFixed(3)}px`,t.style.height=`${m.height.toFixed(3)}px`,t.style.setProperty?.("--whale-visible-content",`${Math.max(1,m.height-p.chrome)}px`),x===null?t.style.removeProperty?.("--whale-animated-radius"):t.style.setProperty?.("--whale-animated-radius",`${x.toFixed(2)}px`),n({width:m.width,height:m.height}))}function A(S){if(c=null,!t||!f)return;let N=Math.min(.032,Math.max(.001,d===null?1/60:(S-d)/1e3));d=S;let I=b?560:D()==="firm"?420:360,G=b?47.4:D()==="firm"?41:30,L=!0;for(let H of["width","height"]){for(let X=0;X<4;X++)C[H]+=(I*(f[H]-m[H])-G*C[H])*N/4,m[H]+=C[H]*N/4;(Math.abs(f[H]-m[H])>.25||Math.abs(C[H])>1)&&(L=!1)}if(b){let H=f.height-b.height,X=Math.abs(H)>.25?Math.max(0,Math.min(1,(m.height-b.height)/H)):1,ce=y?f.height/2:p.panelRadius;x=b.radius+(ce-b.radius)*X}(L||D()==="off")&&(m={...f},C={width:0,height:0},d=null,b=x=null),M(),!L&&D()!=="off"&&(c=e.requestAnimationFrame(A))}function k(){if(!t||!o)return;p=$(),t.dataset.compactHeight=p.height<300?"true":"false";let S=t.hasAttribute("data-collapsed")&&t.dataset.collapsed!=="false";if(m&&y!==null&&S!==y){let ge=x??(y?m.height/2:p.panelRadius);b={height:m.height,radius:ge},x=ge,t.style.setProperty?.("--whale-animated-radius",`${ge.toFixed(2)}px`),C={width:0,height:0}}let N=t.dataset.view,I=t.dataset.sourcePending&&N==="home"&&v===N&&!S&&y===S?f?.height:void 0;y=S,v=N;let G=Math.min(p.width,S?Ti.collapsed:Ti[N]??Ti.panel);t.style.boxSizing="border-box",t.style.transitionProperty="none",t.style.overflow="hidden",t.style.maxWidth=`${p.width}px`,t.style.maxHeight=`${p.height}px`;let L=Math.max(1,p.height-p.chrome);o.style.width=`${Math.max(1,G-p.horizontalChrome)}px`,o.style.maxHeight=`${L}px`,o.style.overflowY="hidden",o.style.minHeight="0",t.style.setProperty?.("--whale-content-limit",`${L}px`);let H=!!o.querySelector?.('[data-size-detail="true"]'),X=S?null:N==="setup"?o.querySelector?.("[data-whale-intrinsic]"):N==="home"&&!H?o.querySelector?.("[data-home-controls]"):null,ce=X?.querySelector?.("[data-whale-natural-content]"),ue=ce??X;N==="setup"&&!S&&(o.style.height="auto"),ue!==l&&(a?.disconnect(),u!==null&&e.cancelAnimationFrame(u),u=null,a=null,l=ue,l&&e.ResizeObserver&&(a=new e.ResizeObserver(()=>{u===null&&(u=e.requestAnimationFrame(()=>{u=null,k()}))}),a.observe(l)));let me=X?.getBoundingClientRect?.().height,q=ce?Math.max(0,ce.offsetHeight-ce.parentElement.clientHeight):0,T=me+q,Q=S?44:T>0?Math.ceil(T+p.chrome):N==="home"?H?520:320:480,le=Math.min(p.height,I??Q);(N!=="setup"||S)&&(o.style.height=`${Math.max(1,le-p.chrome)}px`),f={width:G,height:le},!m||D()==="off"?(z(),m={...f},C={width:0,height:0},b=x=null,M()):c===null&&(Math.abs(m.width-G)>.25||Math.abs(m.height-le)>.25)&&(d=e.performance?.now?.()??null,c=e.requestAnimationFrame(A))}function P(){z(),r?.disconnect(),i?.disconnect(),a?.disconnect(),u!==null&&e.cancelAnimationFrame(u),u=null,a=l=null,e.removeEventListener("resize",k),e.visualViewport?.removeEventListener("resize",k),e.visualViewport?.removeEventListener("scroll",k),B?.removeEventListener?.("change",k),r=i=null}function V(){if(P(),!(!t||!o)){if(e.ResizeObserver){r=new e.ResizeObserver(k);let S=t.closest?.("[data-shell-overlay]")??t.ownerDocument?.querySelector?.("[data-shell-overlay]");S&&r.observe(S)}e.MutationObserver&&(i=new e.MutationObserver(k),i.observe(t,{attributes:!0,attributeFilter:["data-view","data-motion","data-collapsed","data-source-pending"]}),i.observe(o,{attributes:!0,attributeFilter:["data-size-detail","data-home-layout"],subtree:!0})),e.addEventListener("resize",k),e.visualViewport?.addEventListener("resize",k),e.visualViewport?.addEventListener("scroll",k),B?.addEventListener?.("change",k),k()}}return{ref(S){t!==S&&(t=S,m=f=y=v=b=x=null,C={width:0,height:0},V())},contentRef(S){o!==S&&(o=S,V())},update:k,dispose(){P(),t=o=m=f=null}}}var Qu=["spring","firm","off"];function ed(e=window){let n="dsh-whale-voice:motion:v1",t="dsh-whale-voice:assistant-name:v1",o=()=>{try{let u=e.localStorage.getItem(t)?.trim();return u&&u.length<=40?u:null}catch{return null}},r=new Set,i=()=>{try{let u=e.localStorage.getItem(n);return Qu.includes(u)?u:"spring"}catch{return"spring"}},a={motion:i(),assistantName:o(),error:null},l=u=>{a=u;for(let d of r)d()},c=u=>{[n,t,null].includes(u.key)&&l({motion:i(),assistantName:o(),error:null})};return e.addEventListener("storage",c),{getSnapshot:()=>a,subscribe(u){return r.add(u),()=>r.delete(u)},setMotion(u){if(!Qu.includes(u))return!1;let d=null;try{e.localStorage.setItem(n,u)}catch{d="storage-unavailable"}return l({...a,motion:u,error:d}),!d},setAssistantName(u){if(typeof u!="string"||!u.trim()||u.trim().length>40)return!1;let d=u.trim(),m=null;try{e.localStorage.setItem(t,d)}catch{m="storage-unavailable"}return l({...a,assistantName:d,error:m}),!m},dispose(){e.removeEventListener("storage",c),r.clear()}}}var kh='button,input,textarea,select,a,label,summary,[role="button"],[role="slider"],[role="tab"],[contenteditable="true"],[data-no-drag]';function nd(e,n){if(!e||!n?.contains(e))return!1;let t=e.closest?.(kh);return!t||t.hasAttribute("data-drag-surface")}function td(e){if(e.repeat||e.metaKey)return null;let n=e.code;return!/^(F([1-9]|1[0-9]|2[0-4])|Key[A-Z]|Digit[0-9]|Space)$/.test(n)||e.altKey&&n==="F4"?null:{code:n,modifiers:[e.ctrlKey&&"Control",e.altKey&&"Alt",e.shiftKey&&"Shift"].filter(Boolean)}}var sr=()=>({revision:0,rootSessionId:null,title:null,latest:null,items:[],inputActive:!1,inputError:null,playbackConfirmed:!1}),Mi=()=>({schema:1,hardware:null,compute:{schema:1,default:"cpu",observedAt:null,backends:{},reason:"\u5C1A\u672A\u68C0\u6D4B\u672C\u5730\u8BA1\u7B97\u540E\u7AEF\u3002"},models:[],jobs:[]});async function od(e,n=()=>{}){let t=await e.remote.$mount(Fu),o,r;try{if(r=e.inject(["remote","remote.whaleConversation"],d=>{o=d.remote.whaleConversation}),await r.await(),!o)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA")}catch(d){throw await r?.dispose(),await t(),d}let i=new Set,a=new Map,l=!1,c=d=>{if(d?.ok!==!0)throw d?.error??new Error("\u8BED\u97F3\u63A5\u53E3\u54CD\u5E94\u65E0\u6548");return d.value},u=async(d,m,f=!0)=>{let p;try{p=await d()}catch(y){throw f&&!l&&n("ui-request","finished",m?.aborted?"cancelled":"failed"),y}return f&&p?.ok!==!0&&p?.error==null&&!m?.aborted&&n("ui-render-error","finished","failed"),c(p)};return{subscribeUpdates(d,m){let f=new AbortController;return i.add(f),Promise.resolve().then(async()=>{if(!f.signal.aborted)try{for await(let p of o.followUpdates(f.signal))f.signal.aborted||d(p);f.signal.aborted||(n("ui-stream","finished","failed"),m())}catch{f.signal.aborted||(n("ui-stream","finished","failed"),m())}finally{i.delete(f)}}),()=>{f.abort(),i.delete(f)}},updateAction(d,m){if(l)throw new Error("\u66F4\u65B0\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.updateAction(d,m),m)},subscribePresentation(d,m){let f=new AbortController;return i.add(f),(async()=>{try{for await(let p of o.followPresentation(f.signal))f.signal.aborted||d(p);f.signal.aborted||(n("ui-stream","finished","failed"),m(new Error("\u4F1A\u8BDD\u663E\u793A\u8FDE\u63A5\u5DF2\u7ED3\u675F")))}catch(p){f.signal.aborted||(n("ui-stream","finished","failed"),m(p))}finally{i.delete(f)}})(),()=>{f.abort(),i.delete(f)}},subscribe(d,m,f=()=>{}){let p=new AbortController;return i.add(p),m(sr(),{initial:!0}),(async()=>{try{for await(let y of o.follow(d,p.signal))p.signal.aborted||m(y);p.signal.aborted||(n("ui-stream","finished","failed"),m(sr(),{initial:!0}),f(new Error("\u8BED\u97F3\u72B6\u6001\u8FDE\u63A5\u5DF2\u7ED3\u675F\uFF0C\u6B63\u5728\u91CD\u65B0\u8FDE\u63A5")))}catch(y){p.signal.aborted||(n("ui-stream","finished","failed"),m(sr(),{initial:!0}),f(y))}finally{i.delete(p)}})(),()=>{p.abort(),i.delete(p),m(sr(),{initial:!0})}},subscribeModels(d,m,f=()=>{}){if(l)return m(Mi(),{initial:!0}),f(new Error("\u6A21\u578B\u8FDB\u5EA6\u63A5\u53E3\u5DF2\u5378\u8F7D")),()=>{};let p=new AbortController,y=!1,v=()=>{y||(y=!0,p.abort(),a.delete(p),m(Mi(),{initial:!0}))};return a.set(p,v),m(Mi(),{initial:!0}),(async()=>{try{for await(let b of o.followModels(d,p.signal))!y&&!l&&!p.signal.aborted&&m(b);!y&&!l&&!p.signal.aborted&&(n("ui-stream","finished","failed"),v(),f(new Error("\u6A21\u578B\u8FDB\u5EA6\u8FDE\u63A5\u5DF2\u7ED3\u675F\uFF0C\u6B63\u5728\u91CD\u65B0\u8FDE\u63A5")))}catch(b){!y&&!l&&!p.signal.aborted&&(n("ui-stream","finished","failed"),v(),f(b))}finally{a.delete(p)}})(),v},async action(d,m,f){if(l)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");let p=await u(()=>o.action(d,m,f),f);try{let y=JSON.parse(p);if(y?.protocol!==1||y.action!==m.action||!y.value||typeof y.value!="object"||Array.isArray(y.value))throw new Error("Fish Voice UI protocol mismatch");return y.value}catch(y){throw n("ui-render-error","finished","failed"),y}},readAuthorization:d=>u(()=>o.readAuthorization(d),d),saveAuthorization:(d,m)=>u(()=>o.saveAuthorization(d,m),m),async senseVoiceAsrAction(d,m){if(l)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.senseVoiceAsrAction(d,m),m)},async manageSessions(d,m,f){if(l)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");return JSON.parse(await u(()=>o.manageSessions(d,m,f),f))},listExistingVoiceSessions(d,m){if(l)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.listExistingVoiceSessions(d,m),m)},setExistingVoiceSession(d,m){if(l)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.setExistingVoiceSession(d,m),m)},retryVoiceTranscript(d,m){if(l)throw new Error("\u8BED\u97F3\u91CD\u53D1\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.retryVoiceTranscript(d,m),m)},readClientOperationScope(d){if(l)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.readClientOperationScope(d),d,!1)},recordClientOperations(d,m){if(l)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.recordClientOperations(d,m),m,!1)},readOperationLog(d,m){if(l)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.readOperationLog(d,m),m,!1)},readSetup:d=>u(()=>o.readSetup(d),d),readVolume:(d,m)=>u(()=>o.readVolume(d,m),m),setVolume:(d,m,f)=>u(()=>o.setVolume(d,m,f),f),async dispose(){l=!0;for(let d of[...a.values()])d();a.clear();for(let d of i)d.abort();i.clear(),await r.dispose(),await t()}}}var ad=new Set(rr),sd=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,rd=256,$i="dsh-fish-voice.pending-operation-log.v1",Oi="ui-buffer-overflow";function Sh(){let e=globalThis.crypto;if(e?.randomUUID)return e.randomUUID();let n=e?.getRandomValues(new Uint8Array(16));if(!n)return null;n[6]=n[6]&15|64,n[8]=n[8]&63|128;let t=Array.from(n,o=>o.toString(16).padStart(2,"0")).join("");return[t.slice(0,8),t.slice(8,12),t.slice(12,16),t.slice(16,20),t.slice(20)].join("-")}function zh(){try{return globalThis.sessionStorage}catch{return}}function id(e,n=!1){if(!e||typeof e.id!="string"||!sd.test(e.id)||!Number.isSafeInteger(e.at)||e.at<0||!ad.has(e.action)||!["user","ui"].includes(e.source)||n!==(e.action===Oi)||n&&(e.source!=="ui"||!Number.isSafeInteger(e.count)||e.count<1))return null;let{id:t,at:o,action:r,source:i}=e;return{id:t,at:o,action:r,source:i,...n?{count:e.count}:{},...["requested","finished"].includes(e.phase)?{phase:e.phase}:{},...["ok","failed","cancelled"].includes(e.result)?{result:e.result}:{}}}function ld({schedule:e=setTimeout,unschedule:n=clearTimeout,now:t=Date.now,identify:o=Sh,storage:r=zh()}={}){let i=[],a=null,l=null,c=null,u=!1,d,m,f,p=0,y=!1,v=()=>{m!==void 0&&(n(m),m=void 0)},b=k=>k&&k.at>=t()-Pu,x=()=>{i=i.filter(b),b(a)||(a=null),b(l)||(l=null)},C=()=>i.length>0||a!==null||l!==null,B=()=>{if(!(!c||!r))try{C()?r.setItem($i,JSON.stringify({scope:c,pending:i,overflow:a,dropped:l})):r.removeItem($i)}catch{}},D=(k,P)=>{l={count:Math.min(Number.MAX_SAFE_INTEGER,(l?.count??0)+k),at:Math.max(l?.at??0,P)}},E=k=>{i.length>=rd?D(1,k.at):i.push(k)},$=k=>{if(c===null){let P;try{P=JSON.parse(r?.getItem($i)??"null")}catch{}if(P?.scope===k){let V=i,S=l,N=Array.isArray(P.pending)?P.pending.slice(0,rd).map(I=>id(I)).filter(b):[];i=[...new Map(N.map(I=>[I.id,I])).values()],a=id(P.overflow,!0),l=P.dropped&&Number.isSafeInteger(P.dropped.count)&&P.dropped.count>0&&Number.isSafeInteger(P.dropped.at)&&b(P.dropped)?{count:P.dropped.count,at:P.dropped.at}:null,S&&D(S.count,S.at);for(let I of V)b(I)&&E(I)}}else c!==k&&(i=[],a=null,l=null);c=k,u=!0,x(),B()},z=(k=160)=>{y||f||m!==void 0||u&&!C()||!d?.readClientOperationScope||!d?.recordClientOperations||(m=e(()=>{m=void 0,M()},k),m?.unref?.())};async function M(){let k=new AbortController,P=d;f=k;let V=()=>!y&&d===P&&f===k;try{let S=AbortSignal.any([k.signal,AbortSignal.timeout(1e4)]);if(!u){let L=await P.readClientOperationScope(S);if(!V())return;if(typeof L?.scope!="string"||!sd.test(L.scope))throw new Error("Operation scope unavailable");$(L.scope)}if(x(),!a&&l){let L=o();L&&(a={id:L,at:l.at,action:Oi,source:"ui",phase:"finished",count:l.count},l=null)}B();let N=a?[a,...i.slice(0,so-1)]:i.slice(0,so);if(!N.length)return;let I=await P.recordClientOperations({scope:c,events:N},S);if(!V())return;if(I?.accepted!==!0)throw new Error("Operation batch was not accepted");let G=new Set(N.map(L=>L.id));i=i.filter(L=>!G.has(L.id)),a&&G.has(a.id)&&(a=null),p=0,B()}catch{V()&&(u=!1,p++)}finally{V()&&(f=void 0,z(p?Math.min(3e4,750*2**Math.min(p-1,6)):160))}}function A(k,P,V,S){if(y||!ad.has(k)||k===Oi)return;let N;try{N=o()}catch{return}N&&(x(),E({id:N,at:t(),action:k,source:P,...V?{phase:V}:{},...S?{result:S}:{}}),B(),z())}return{user(k){A(k,"user")},internal(k,P,V){A(k,"ui",P,V)},attach(k){d===k||y||(v(),f?.abort(),f=void 0,d=k,u=!1,p=0,z(0))},dispose(){y=!0,v(),f?.abort(),i=[],a=null,l=null}}}var Vd=require("react-dom");var Be=require("react"),lr=require("@deepseek-ai/dsh-client-ui-primitives");var h={settingsLayout:"p6Sk5a_settingsLayout",error:"p6Sk5a_error",deviceSelect:"p6Sk5a_deviceSelect",historyScope:"p6Sk5a_historyScope",header:"p6Sk5a_header",conversationOptions:"p6Sk5a_conversationOptions",newMessages:"p6Sk5a_newMessages",homeTargetRow:"p6Sk5a_homeTargetRow",authorizationSteps:"p6Sk5a_authorizationSteps",voicePromptActions:"p6Sk5a_voicePromptActions",existingSessionPicker:"p6Sk5a_existingSessionPicker",whalePreview:"p6Sk5a_whalePreview",updateHeader:"p6Sk5a_updateHeader",quickSegments:"p6Sk5a_quickSegments",disclosureRow:"p6Sk5a_disclosureRow",voiceBars:"p6Sk5a_voiceBars",updateDialog:"p6Sk5a_updateDialog",inlineField:"p6Sk5a_inlineField",quickActions:"p6Sk5a_quickActions",spin:"p6Sk5a_spin",whaleSpin:"p6Sk5a_whaleSpin",sliderLabel:"p6Sk5a_sliderLabel",settingsBody:"p6Sk5a_settingsBody",radios:"p6Sk5a_radios",popoverHeader:"p6Sk5a_popoverHeader",audioDeviceGrid:"p6Sk5a_audioDeviceGrid",bindingActions:"p6Sk5a_bindingActions",newChatButton:"p6Sk5a_newChatButton",bubble:"p6Sk5a_bubble",formActions:"p6Sk5a_formActions",ellipsis:"p6Sk5a_ellipsis",recentMessages:"p6Sk5a_recentMessages",existingSessionList:"p6Sk5a_existingSessionList",message:"p6Sk5a_message",settingsHeader:"p6Sk5a_settingsHeader",guideButton:"p6Sk5a_guideButton",existingSessionTarget:"p6Sk5a_existingSessionTarget",headerActions:"p6Sk5a_headerActions",authorization:"p6Sk5a_authorization",transcriptRetryText:"p6Sk5a_transcriptRetryText",quickHint:"p6Sk5a_quickHint",whaleEnter:"p6Sk5a_whaleEnter",status:"p6Sk5a_status",section:"p6Sk5a_section",keyBindingRow:"p6Sk5a_keyBindingRow",currentDshAction:"p6Sk5a_currentDshAction",conversationChoice:"p6Sk5a_conversationChoice",existingSessionSearch:"p6Sk5a_existingSessionSearch",bubbleBrand:"p6Sk5a_bubbleBrand",settings:"p6Sk5a_settings",whaleFeedback:"p6Sk5a_whaleFeedback",existingSessionHome:"p6Sk5a_existingSessionHome",capabilityRow:"p6Sk5a_capabilityRow",brand:"p6Sk5a_brand",backButton:"p6Sk5a_backButton",currentDshTarget:"p6Sk5a_currentDshTarget",backIcon:"p6Sk5a_backIcon",messageName:"p6Sk5a_messageName",modelHeading:"p6Sk5a_modelHeading",mark:"p6Sk5a_mark",authorizationBody:"p6Sk5a_authorizationBody",settingsBrand:"p6Sk5a_settingsBrand",editNotice:"p6Sk5a_editNotice",transcriptRetries:"p6Sk5a_transcriptRetries",voicePromptCount:"p6Sk5a_voicePromptCount",actions:"p6Sk5a_actions",pageHeading:"p6Sk5a_pageHeading",sessionTitle:"p6Sk5a_sessionTitle",voiceTarget:"p6Sk5a_voiceTarget",primary:"p6Sk5a_primary",transcriptRetryList:"p6Sk5a_transcriptRetryList",pathRow:"p6Sk5a_pathRow",panelContent:"p6Sk5a_panelContent",details:"p6Sk5a_details",caption:"p6Sk5a_caption",bindingEditor:"p6Sk5a_bindingEditor",fullName:"p6Sk5a_fullName",sessionRename:"p6Sk5a_sessionRename",popover:"p6Sk5a_popover",markSmall:"p6Sk5a_markSmall",loadHistory:"p6Sk5a_loadHistory",quickSpeedHeader:"p6Sk5a_quickSpeedHeader",permissionList:"p6Sk5a_permissionList",notice:"p6Sk5a_notice",floating:"p6Sk5a_floating",volumeControl:"p6Sk5a_volumeControl",audioDeviceNotice:"p6Sk5a_audioDeviceNotice",keyBinding:"p6Sk5a_keyBinding",currentModel:"p6Sk5a_currentModel",note:"p6Sk5a_note",updateAnnouncement:"p6Sk5a_updateAnnouncement",whaleInputPulse:"p6Sk5a_whaleInputPulse",audioDevices:"p6Sk5a_audioDevices",bubbleStatus:"p6Sk5a_bubbleStatus",volumeRow:"p6Sk5a_volumeRow",conversationHeader:"p6Sk5a_conversationHeader",assistantNameInput:"p6Sk5a_assistantNameInput",audioDeviceField:"p6Sk5a_audioDeviceField",requestDetails:"p6Sk5a_requestDetails",field:"p6Sk5a_field",voiceStatus:"p6Sk5a_voiceStatus",authorizationActions:"p6Sk5a_authorizationActions",transcriptRetry:"p6Sk5a_transcriptRetry",mouseBinding:"p6Sk5a_mouseBinding",assistantName:"p6Sk5a_assistantName",whalePageEnter:"p6Sk5a_whalePageEnter",segmented:"p6Sk5a_segmented",agreement:"p6Sk5a_agreement",performanceChoice:"p6Sk5a_performanceChoice",inlineActions:"p6Sk5a_inlineActions",homeTargetPicker:"p6Sk5a_homeTargetPicker",modelNav:"p6Sk5a_modelNav",audioDeviceHint:"p6Sk5a_audioDeviceHint",hint:"p6Sk5a_hint",quickSpeed:"p6Sk5a_quickSpeed",settingsPage:"p6Sk5a_settingsPage",voicePromptInput:"p6Sk5a_voicePromptInput",quickConversation:"p6Sk5a_quickConversation",whaleBreathe:"p6Sk5a_whaleBreathe",panelViewport:"p6Sk5a_panelViewport",voicePromptMode:"p6Sk5a_voicePromptMode",iconButton:"p6Sk5a_iconButton",settingsNav:"p6Sk5a_settingsNav",mainAction:"p6Sk5a_mainAction",motionPreview:"p6Sk5a_motionPreview",statusRow:"p6Sk5a_statusRow",placeholder:"p6Sk5a_placeholder",voicePrompt:"p6Sk5a_voicePrompt",openOriginal:"p6Sk5a_openOriginal",text:`.p6Sk5a_floating {
  z-index: 900;
  -webkit-app-region: no-drag;
  box-sizing: border-box;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--whale-animated-radius, var(--dsw-radius-lg));
  background: linear-gradient(var(--dsw-alias-bg-layer-1, var(--whale-solid-base)),var(--dsw-alias-bg-layer-1, var(--whale-solid-base))),var(--whale-solid-base);
  width: 320px;
  color: var(--dsw-alias-label-primary);
  --whale-solid-base: var(--dsw-static-neutral-bluish-00, #fff);
  box-shadow: var(--dsw-elevation-panel, var(--dsw-shadow-lv3));
  font: 13px/1.5 var(--dsw-font-family);
  pointer-events: auto;
  cursor: grab;
  touch-action: auto;
  --whale-duration: var(--ds-transition-duration, .2s);
  --whale-ease: cubic-bezier(.2,1.2,.45,1);
  padding: 12px;
  position: fixed;
  overflow: hidden;
}

[data-ds-dark-theme] .p6Sk5a_floating {
  --whale-solid-base: var(--dsw-static-neutral-bluish-950, #181a1e);
}

.p6Sk5a_floating[data-collapsed] {
  border-radius: var(--whale-animated-radius, 999px);
  corner-shape: round;
  width: 216px;
  padding: 4px;
}

.p6Sk5a_floating[data-view="settings"] {
  width: 660px;
  padding: 0;
}

.p6Sk5a_floating[data-view="setup"]:not([data-collapsed]) {
  width: 420px;
}

.p6Sk5a_floating:active {
  cursor: grabbing;
}

.p6Sk5a_floating[data-whale-dock-phase="preview"] {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

.p6Sk5a_floating [hidden] {
  display: none !important;
}

.p6Sk5a_floating [data-no-drag] {
  cursor: auto;
  touch-action: pan-y;
}

.p6Sk5a_panelViewport {
  overscroll-behavior: contain;
  min-width: 0;
  min-height: 0;
  overflow-x: hidden;
}

.p6Sk5a_panelContent {
  min-width: 0;
  animation: p6Sk5a_whaleEnter var(--whale-duration) var(--whale-ease);
}

.p6Sk5a_mark {
  flex: none;
  width: 24px;
  height: 24px;
}

.p6Sk5a_markSmall {
  flex: none;
  width: 20px;
  height: 20px;
}

.p6Sk5a_brand, .p6Sk5a_header, .p6Sk5a_headerActions, .p6Sk5a_actions, .p6Sk5a_statusRow, .p6Sk5a_caption {
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.p6Sk5a_brand {
  font-size: 15px;
}

.p6Sk5a_header {
  justify-content: space-between;
  margin-bottom: 12px;
}

.p6Sk5a_headerActions {
  gap: 2px;
}

.p6Sk5a_actions {
  flex-wrap: wrap;
}

.p6Sk5a_iconButton {
  flex: none;
  width: 32px;
  min-width: 32px;
  height: 32px;
  padding: 0;
}

.p6Sk5a_newChatButton {
  white-space: nowrap;
  flex: none;
  align-items: center;
  gap: 2px;
  height: 28px;
  min-height: 28px;
  padding: 0 6px;
  font-size: 12px;
  display: inline-flex;
}

.p6Sk5a_newChatButton svg {
  width: 14px;
  height: 14px;
}

.p6Sk5a_ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
}

.p6Sk5a_statusRow {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  margin-bottom: 10px;
  padding: 4px 6px;
}

.p6Sk5a_statusRow[data-recording] {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 19%,var(--dsw-alias-bg-module-platform));
}

.p6Sk5a_statusRow[data-recording] .p6Sk5a_voiceStatus > svg {
  color: var(--dsw-alias-brand-primary);
}

.p6Sk5a_status {
  flex: 1;
  min-width: 0;
  margin: 0;
  font-size: 12px;
  line-height: 18px;
}

.p6Sk5a_voiceTarget {
  flex: 1;
  align-items: center;
  gap: 4px;
  min-width: 0;
  line-height: 18px;
  display: flex;
}

.p6Sk5a_voiceTarget > span, .p6Sk5a_existingSessionHome > span {
  color: var(--dsw-alias-label-secondary);
  flex: none;
  font-size: 11px;
}

.p6Sk5a_voiceTarget strong {
  font-size: 13px;
  font-weight: 600;
}

.p6Sk5a_voiceStatus {
  align-items: center;
  gap: 4px;
  max-width: 47%;
  display: flex;
}

.p6Sk5a_voiceStatus > svg {
  flex: none;
  width: 14px;
  height: 14px;
}

.p6Sk5a_statusRow[data-bound] {
  flex-direction: column;
  align-items: stretch;
  gap: 0;
}

.p6Sk5a_statusRow[data-bound] .p6Sk5a_voiceStatus {
  max-width: 100%;
}

.p6Sk5a_mainAction {
  width: 100%;
  min-height: 36px;
  font-weight: 500;
}

.p6Sk5a_primary {
  color: var(--dsw-alias-label-primary) !important;
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 16%,var(--dsw-alias-bg-layer-2)) !important;
  border: 1px solid var(--dsw-alias-border-l2) !important;
}

.p6Sk5a_bubble {
  corner-shape: round;
  cursor: grab;
  touch-action: none;
  width: 100%;
  max-width: 100%;
  height: 36px;
  animation: p6Sk5a_whaleEnter var(--whale-duration) var(--whale-ease);
  border-radius: 999px;
  justify-content: flex-start;
  gap: 8px;
}

.p6Sk5a_bubble .p6Sk5a_ellipsis {
  text-align: left;
  flex: 1;
}

.p6Sk5a_caption {
  text-align: left;
  justify-content: flex-start;
  width: 100%;
  margin-top: 8px;
  padding: 6px 0;
  font-size: 12px;
}

.p6Sk5a_caption .p6Sk5a_ellipsis {
  flex: 1;
}

.p6Sk5a_openOriginal {
  flex: none;
}

.p6Sk5a_hint, .p6Sk5a_quickHint {
  color: var(--dsw-alias-label-secondary);
  overflow-wrap: anywhere;
  font-size: 12px;
}

.p6Sk5a_hint {
  margin: 6px 0;
}

.p6Sk5a_quickHint {
  margin: 0;
  font-size: 11px;
}

.p6Sk5a_notice, .p6Sk5a_note, .p6Sk5a_error {
  border-radius: var(--dsw-radius-sm);
  overflow-wrap: anywhere;
  background: var(--dsw-alias-bg-module-platform);
  margin: 8px 0;
  padding: 8px 10px;
  font-size: 12px;
}

.p6Sk5a_notice, .p6Sk5a_note {
  border-left: 2px solid var(--dsw-alias-state-warn-primary);
}

.p6Sk5a_error {
  border-left: 2px solid var(--dsw-alias-state-error-primary);
}

.p6Sk5a_error button {
  margin-top: 8px;
}

.p6Sk5a_popover {
  box-sizing: border-box;
  cursor: auto;
  touch-action: auto;
  width: 100%;
  animation: p6Sk5a_whaleEnter var(--whale-duration) var(--whale-ease);
  margin: 0 0 10px;
  padding: 12px;
  position: relative;
  overflow: auto;
}

.p6Sk5a_popoverHeader {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  display: flex;
}

.p6Sk5a_popoverHeader > button {
  width: 28px;
  padding: 0;
}

.p6Sk5a_quickConversation {
  max-height: 160px;
}

.p6Sk5a_recentMessages {
  gap: 6px;
  display: grid;
}

.p6Sk5a_message {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  padding: 5px 8px;
}

.p6Sk5a_message strong {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

.p6Sk5a_message p {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  margin: 3px 0 0;
}

.p6Sk5a_quickActions {
  gap: 6px;
  min-width: 0;
  display: grid;
}

.p6Sk5a_quickSpeed {
  gap: 5px;
  padding-top: 4px;
  display: grid;
}

.p6Sk5a_quickSpeedHeader {
  color: var(--dsw-alias-label-secondary);
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  display: flex;
}

.p6Sk5a_quickSpeedHeader small {
  font-size: 11px;
}

.p6Sk5a_quickSegments {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  gap: 3px;
  padding: 3px;
  display: grid;
}

.p6Sk5a_quickSegments button {
  min-width: 0;
  height: 28px;
  min-height: 28px;
  padding: 0 5px;
  font-size: 12px;
}

.p6Sk5a_quickSegments button[aria-pressed="true"] {
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: 0 1px 3px #0001;
}

.p6Sk5a_settings {
  height: 100%;
  min-height: 0;
  color: var(--dsw-alias-label-primary);
  flex-direction: column;
  display: flex;
  overflow: hidden;
}

.p6Sk5a_settingsHeader {
  box-sizing: border-box;
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 4px 10px;
  display: flex;
}

.p6Sk5a_settingsHeader h2 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.p6Sk5a_settingsBrand {
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 6px;
  min-width: 0;
  display: flex;
}

.p6Sk5a_backButton, .p6Sk5a_guideButton {
  flex: none;
  padding: 0 8px;
  font-size: 12px;
}

.p6Sk5a_backIcon {
  transform: rotate(180deg);
}

.p6Sk5a_settingsLayout {
  flex: 1;
  grid-template-rows: minmax(0, 1fr);
  grid-template-columns: 104px minmax(0, 1fr);
  min-height: 0;
  display: grid;
  overflow: hidden;
}

.p6Sk5a_settingsNav {
  border-right: 1px solid var(--dsw-alias-border-l2);
  background: var(--dsw-alias-bg-module-platform);
  flex-direction: column;
  gap: 3px;
  min-height: 0;
  padding: 8px 6px;
  display: flex;
  overflow-y: auto;
}

.p6Sk5a_settingsNav button {
  justify-content: flex-start;
  min-width: 0;
  min-height: 34px;
  padding: 0 12px;
  font-size: 12px;
}

.p6Sk5a_settingsNav button[aria-pressed="true"] {
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: inset 2px 0 0 var(--dsw-alias-brand-primary);
  font-weight: 600;
}

.p6Sk5a_settingsPage {
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  display: flex;
  overflow: hidden;
}

.p6Sk5a_pageHeading {
  flex: none;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 10px 12px 8px;
  display: flex;
}

.p6Sk5a_pageHeading h3 {
  margin: 0;
  font-size: 15px;
}

.p6Sk5a_pageHeading p {
  color: var(--dsw-alias-label-secondary);
  margin: 3px 0 0;
  font-size: 12px;
}

.p6Sk5a_settingsBody {
  overflow-anchor: none;
  overscroll-behavior: contain;
  scrollbar-gutter: stable;
  outline-offset: -2px;
  flex: 1;
  min-width: 0;
  min-height: 0;
  padding: 4px 12px 12px;
  overflow-y: auto;
}

.p6Sk5a_settingsBody > .p6Sk5a_section, .p6Sk5a_settingsBody > div > .p6Sk5a_section {
  margin: 0 0 12px;
}

.p6Sk5a_section {
  align-content: start;
  gap: 8px;
  min-width: 0;
  display: grid;
}

.p6Sk5a_section h3 {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
}

.p6Sk5a_section p, .p6Sk5a_section > .p6Sk5a_section {
  margin: 0;
}

.p6Sk5a_settingsBody > .p6Sk5a_section + .p6Sk5a_section {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

.p6Sk5a_section summary {
  cursor: pointer;
  padding: 7px 0;
  font-size: 13px;
  font-weight: 500;
}

details.p6Sk5a_section {
  border-top: 1px solid var(--dsw-alias-border-l2);
  display: block;
}

details.p6Sk5a_section > :not(summary) {
  margin-top: 10px;
}

.p6Sk5a_field {
  gap: 6px;
  font-size: 12px;
  display: grid;
}

.p6Sk5a_field input {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}

.p6Sk5a_deviceSelect {
  box-sizing: border-box;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  width: 100%;
  min-width: 0;
  min-height: 36px;
  color: inherit;
  background: var(--dsw-alias-bg-layer-1);
  font: inherit;
  padding: 6px 10px;
}

.p6Sk5a_radios {
  border: 0;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
  margin: 0;
  padding: 0;
  display: flex;
}

.p6Sk5a_radios legend {
  margin-bottom: 6px;
  font-size: 12px;
}

.p6Sk5a_radios label {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  cursor: pointer;
  align-items: center;
  gap: 6px;
  padding: 6px 9px;
  font-size: 12px;
  display: flex;
}

.p6Sk5a_radios input {
  accent-color: var(--dsw-alias-brand-primary);
}

.p6Sk5a_bindingEditor {
  gap: 14px;
  display: grid;
}

.p6Sk5a_keyBinding {
  gap: 6px;
  display: grid;
}

.p6Sk5a_keyBinding > :is(h3, p) {
  margin: 0;
}

.p6Sk5a_keyBindingRow {
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 12px;
  min-width: 0;
  display: flex;
}

.p6Sk5a_keyBindingRow > span {
  overflow-wrap: anywhere;
  min-width: 5em;
  font-size: 13px;
}

.p6Sk5a_mouseBinding legend {
  font-size: 14px;
  font-weight: 600;
}

.p6Sk5a_mouseBinding label {
  white-space: nowrap;
}

.p6Sk5a_bindingActions {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

.p6Sk5a_segmented {
  flex-wrap: wrap;
  gap: 4px;
  display: flex;
}

.p6Sk5a_segmented button {
  min-width: 0;
  font-size: 12px;
}

.p6Sk5a_segmented button[aria-pressed="true"], .p6Sk5a_modelNav button[aria-pressed="true"] {
  background: var(--dsw-alias-interactive-bg-active);
  color: var(--dsw-alias-label-primary);
  box-shadow: inset 0 -2px 0 var(--dsw-alias-brand-primary);
}

.p6Sk5a_modelNav {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  gap: 4px;
  margin-bottom: 12px;
  padding: 0 16px 10px;
  display: flex;
}

.p6Sk5a_modelNav button {
  flex: 1;
  min-width: 0;
  padding: 0 6px;
  font-size: 12px;
}

.p6Sk5a_sliderLabel {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  display: flex;
}

.p6Sk5a_sliderLabel span {
  margin-left: auto;
}

.p6Sk5a_sliderLabel input {
  width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
}

.p6Sk5a_formActions {
  padding-top: 4px;
}

.p6Sk5a_formActions button {
  min-width: 100px;
}

.p6Sk5a_editNotice {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 8px;
  display: flex;
}

.p6Sk5a_editNotice div {
  flex: 1;
  min-width: 0;
}

.p6Sk5a_editNotice strong {
  font-size: 12px;
}

.p6Sk5a_editNotice p {
  color: var(--dsw-alias-label-secondary);
  margin: 3px 0 0;
  font-size: 12px;
}

.p6Sk5a_editNotice button {
  flex: none;
  font-size: 12px;
}

.p6Sk5a_details {
  grid-template-columns: auto minmax(0, 1fr);
  gap: 6px 12px;
  margin: 0;
  font-size: 12px;
  display: grid;
}

.p6Sk5a_details dt {
  color: var(--dsw-alias-label-secondary);
}

.p6Sk5a_details dd {
  overflow-wrap: anywhere;
  margin: 0;
}

.p6Sk5a_capabilityRow {
  display: contents;
}

.p6Sk5a_requestDetails {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  max-height: 200px;
  padding: 8px;
  font-size: 11px;
  overflow: auto;
}

.p6Sk5a_placeholder {
  text-align: center;
  min-height: 140px;
  color: var(--dsw-alias-label-secondary);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  display: flex;
}

.p6Sk5a_placeholder h3, .p6Sk5a_placeholder p {
  margin: 0;
}

.p6Sk5a_placeholder svg {
  width: 32px;
  height: 32px;
}

.p6Sk5a_motionPreview {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  width: 40px;
  height: 32px;
  animation: p6Sk5a_whalePreview var(--whale-duration) var(--whale-ease);
  place-items: center;
  display: grid;
}

.p6Sk5a_settings a {
  color: var(--dsw-alias-link);
  text-underline-offset: 2px;
  overflow-wrap: anywhere;
}

.p6Sk5a_updateDialog {
  box-sizing: border-box;
  cursor: auto;
  width: fit-content;
  min-width: min(396px, 100vw - 32px);
  max-width: min(520px, 100vw - 32px);
  max-height: calc(100dvh - 32px);
  color: inherit;
  background: var(--dsw-alias-bg-layer-1, var(--whale-solid-base));
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-lg);
  box-shadow: var(--dsw-elevation-panel, var(--dsw-shadow-lv3));
  padding: 16px;
  overflow: auto;
}

.p6Sk5a_updateDialog::backdrop {
  background: #0005;
}

.p6Sk5a_updateHeader {
  align-items: center;
  gap: 8px;
  display: flex;
}

.p6Sk5a_updateHeader h2 {
  margin: 0;
  font-size: 16px;
}

.p6Sk5a_updateAnnouncement {
  white-space: pre-line;
  overflow-wrap: anywhere;
}

.p6Sk5a_updateDialog .p6Sk5a_actions {
  margin-top: 12px;
}

.p6Sk5a_updateDialog a {
  color: var(--dsw-alias-link);
  text-underline-offset: 2px;
}

.p6Sk5a_authorization {
  height: auto;
  max-height: min(var(--whale-content-limit, 60vh),var(--whale-visible-content, 60vh));
}

.p6Sk5a_authorization .p6Sk5a_settingsHeader {
  min-height: 42px;
  padding: 0 0 10px;
}

.p6Sk5a_authorization .p6Sk5a_settingsHeader h2 {
  flex: 1;
  font-size: 16px;
}

.p6Sk5a_authorizationBody {
  overscroll-behavior: contain;
  flex: 1;
  min-height: 0;
  padding-right: 6px;
  overflow-y: auto;
}

.p6Sk5a_authorizationActions {
  border-top: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  padding: 10px 0 0;
}

.p6Sk5a_authorizationBody > [data-whale-natural-content] {
  display: flow-root;
}

.p6Sk5a_permissionList {
  gap: 0;
  margin: 12px 0;
  padding: 0;
  list-style: none;
  display: grid;
}

.p6Sk5a_permissionList li {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  padding: 10px 0;
}

.p6Sk5a_permissionList p {
  margin: 3px 0 0;
}

.p6Sk5a_permissionList strong {
  font-size: 13px;
}

.p6Sk5a_sessionTitle {
  overflow-wrap: anywhere;
}

.p6Sk5a_sessionRename {
  gap: 6px;
  margin-top: 8px;
  display: grid;
}

.p6Sk5a_existingSessionHome {
  text-align: left;
  justify-content: flex-start;
  gap: 4px;
  min-width: 0;
  max-width: 100%;
  height: 24px;
  min-height: 24px;
  padding: 0 6px;
  display: flex;
}

.p6Sk5a_existingSessionHome svg {
  flex: none;
  width: 12px;
  height: 12px;
}

.p6Sk5a_existingSessionHome:disabled {
  opacity: 1;
  box-shadow: none;
  cursor: default;
}

.p6Sk5a_existingSessionHome:disabled > svg {
  visibility: hidden;
}

.p6Sk5a_currentDshTarget {
  gap: 4px;
  min-width: 0;
  display: grid;
}

.p6Sk5a_currentDshAction {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-width: 0;
  height: 30px;
  min-height: 30px;
  padding: 0 8px;
  font-size: 12px;
  display: flex;
}

.p6Sk5a_currentDshAction > :first-child {
  white-space: nowrap;
  flex: none;
}

.p6Sk5a_currentDshAction > :last-child {
  min-width: 0;
  color: var(--dsw-alias-label-secondary);
  text-align: right;
}

.p6Sk5a_currentDshTarget > p {
  margin: 0;
}

.p6Sk5a_transcriptRetries {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  max-height: 168px;
  padding: 4px 6px;
  display: flex;
}

.p6Sk5a_transcriptRetries > header {
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 0 4px;
  display: flex;
}

.p6Sk5a_transcriptRetries h2 {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
}

.p6Sk5a_transcriptRetries > header p {
  color: var(--dsw-alias-label-secondary);
  margin: 0;
  font-size: 11px;
  line-height: 16px;
}

.p6Sk5a_transcriptRetryList {
  overscroll-behavior: contain;
  touch-action: pan-y;
  gap: 4px;
  min-height: 0;
  margin: 0;
  padding: 0 2px;
  list-style: none;
  display: grid;
  overflow-y: auto;
}

.p6Sk5a_transcriptRetry {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 6px;
  display: grid;
}

.p6Sk5a_transcriptRetry + .p6Sk5a_transcriptRetry {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 4px;
}

.p6Sk5a_transcriptRetry p {
  margin: 0;
}

.p6Sk5a_transcriptRetryText {
  overflow-wrap: anywhere;
  white-space: pre-wrap;
  user-select: text;
  font-size: 13px;
  line-height: 18px;
}

.p6Sk5a_transcriptRetry button {
  height: 26px;
  min-height: 26px;
  padding: 0 6px;
  font-size: 12px;
}

.p6Sk5a_existingSessionTarget > p {
  margin: 4px 0;
}

.p6Sk5a_existingSessionPicker {
  gap: 8px;
  min-width: 0;
  margin-top: 10px;
  display: grid;
}

.p6Sk5a_existingSessionSearch {
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 6px;
  display: grid;
}

.p6Sk5a_existingSessionSearch input::placeholder {
  color: var(--dsw-alias-label-secondary);
  opacity: 1;
}

.p6Sk5a_existingSessionList {
  max-height: clamp(96px, 26vh, 224px);
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: auto;
}

.p6Sk5a_existingSessionList li {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
}

.p6Sk5a_existingSessionList label {
  cursor: pointer;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: start;
  gap: 6px;
  padding: 6px 4px;
  display: grid;
}

.p6Sk5a_existingSessionList label:has(input:disabled) {
  cursor: default;
}

.p6Sk5a_existingSessionList label:has(input:checked) {
  background: var(--dsw-alias-interactive-bg-active);
}

.p6Sk5a_existingSessionList input {
  accent-color: var(--dsw-alias-brand-primary);
  margin-top: 3px;
}

.p6Sk5a_existingSessionList label span.p6Sk5a_hint {
  overflow-wrap: anywhere;
  margin: 3px 0 0;
  display: block;
}

.p6Sk5a_performanceChoice {
  line-height: 1.1;
}

.p6Sk5a_performanceChoice small {
  white-space: nowrap;
  font-size: .85em;
}

.p6Sk5a_floating [data-whale-setup] {
  min-height: 0;
}

.p6Sk5a_floating :is(button, input, select, textarea, summary, a) {
  touch-action: manipulation;
}

.p6Sk5a_floating button {
  transition: background-color .12s, color .12s;
}

.p6Sk5a_floating :is(button, input, select, summary, a):focus-visible, .p6Sk5a_floating:focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

.p6Sk5a_spin {
  animation: .7s linear infinite p6Sk5a_whaleSpin;
}

.p6Sk5a_mark[data-state="authorized"], .p6Sk5a_markSmall[data-state="authorized"] {
  color: var(--dsw-alias-brand-primary);
}

.p6Sk5a_mark[data-state="unknown"], .p6Sk5a_markSmall[data-state="unknown"] {
  color: var(--dsw-alias-state-warn-primary);
}

.p6Sk5a_mark[data-state="input-active"], .p6Sk5a_markSmall[data-state="input-active"] {
  color: var(--dsw-alias-brand-primary);
  animation: 1.35s ease-in-out infinite p6Sk5a_whaleBreathe;
}

.p6Sk5a_mark[data-state="pending"], .p6Sk5a_markSmall[data-state="pending"] {
  color: var(--dsw-alias-label-secondary);
}

[data-motion="firm"].p6Sk5a_floating {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="off"].p6Sk5a_floating, [data-motion="off"].p6Sk5a_floating * {
  transition: none !important;
  animation: none !important;
}

@keyframes p6Sk5a_whaleEnter {
  from {
    opacity: .4;
    transform: translateY(3px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes p6Sk5a_whalePreview {
  from {
    transform: scale(.88);
  }

  to {
    transform: scale(1);
  }
}

@keyframes p6Sk5a_whaleSpin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes p6Sk5a_whaleBreathe {
  0%, 100% {
    opacity: .65;
  }

  50% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .p6Sk5a_floating, .p6Sk5a_floating * {
    transition: none !important;
    animation: none !important;
  }
}

@media (width <= 520px), (height <= 560px) {
  .p6Sk5a_settingsLayout {
    grid-template-rows: auto minmax(0, 1fr);
    grid-template-columns: minmax(0, 1fr);
  }

  .p6Sk5a_settingsNav {
    border-right: 0;
    border-bottom: 1px solid var(--dsw-alias-border-l2);
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 2px;
    padding: 5px 8px;
    display: grid;
    overflow: hidden;
  }

  .p6Sk5a_settingsNav button {
    justify-content: center;
    height: 30px;
    min-height: 30px;
    padding: 0 2px;
  }

  .p6Sk5a_settingsNav button[aria-pressed="true"] {
    box-shadow: inset 0 -2px 0 var(--dsw-alias-brand-primary);
  }

  .p6Sk5a_settingsHeader {
    gap: 3px;
    min-height: 44px;
    padding: 5px 8px;
  }

  .p6Sk5a_backButton, .p6Sk5a_guideButton {
    padding: 0 5px;
  }

  .p6Sk5a_settingsBrand {
    gap: 4px;
  }

  .p6Sk5a_settingsBrand .p6Sk5a_markSmall {
    display: none;
  }

  .p6Sk5a_pageHeading {
    padding: 10px 12px 8px;
  }

  .p6Sk5a_pageHeading p {
    display: none;
  }

  .p6Sk5a_settingsBody {
    padding: 4px 12px 12px;
  }

  .p6Sk5a_modelNav {
    margin-bottom: 8px;
    padding: 0 10px 7px;
  }

  .p6Sk5a_editNotice {
    flex-wrap: wrap;
  }

  .p6Sk5a_editNotice button {
    width: 100%;
  }
}

@media (height <= 420px) {
  .p6Sk5a_settingsHeader {
    height: 36px;
    min-height: 36px;
    padding: 2px 8px;
  }

  .p6Sk5a_settingsHeader button {
    height: 30px;
    min-height: 30px;
  }

  .p6Sk5a_settingsNav {
    padding: 2px 8px;
  }

  .p6Sk5a_settingsNav button {
    height: 28px;
    min-height: 28px;
  }

  .p6Sk5a_pageHeading {
    box-sizing: border-box;
    min-height: 32px;
    padding: 2px 12px;
  }

  .p6Sk5a_pageHeading .p6Sk5a_iconButton {
    width: 28px;
    min-width: 28px;
    height: 28px;
  }

  .p6Sk5a_modelNav {
    margin-bottom: 4px;
    padding: 0 10px 3px;
  }

  .p6Sk5a_modelNav button {
    height: 28px;
    min-height: 28px;
  }
}

@media (pointer: coarse) {
  .p6Sk5a_field input, .p6Sk5a_deviceSelect {
    font-size: 16px;
  }
}

@media (forced-colors: active) {
  .p6Sk5a_floating, .p6Sk5a_popover {
    outline: 1px solid canvastext;
  }

  .p6Sk5a_settingsNav button[aria-pressed="true"], .p6Sk5a_modelNav button[aria-pressed="true"] {
    outline: 2px solid highlight;
  }
}

.p6Sk5a_floating[data-view="home"] .p6Sk5a_panelViewport, .p6Sk5a_floating[data-collapsed] .p6Sk5a_panelViewport {
  overflow: hidden;
}

.p6Sk5a_floating[data-view="home"]:not([data-collapsed]) {
  padding: 10px;
}

.p6Sk5a_panelContent {
  flex-direction: column;
  gap: 4px;
  height: 100%;
  min-height: 0;
  display: flex;
}

.p6Sk5a_panelContent > :not(.p6Sk5a_quickConversation) {
  flex: none;
}

.p6Sk5a_panelContent > .p6Sk5a_homeTargetPicker {
  flex: 1 1 0;
  min-height: 0;
  padding: 2px;
  display: flex;
}

.p6Sk5a_homeTargetPicker > .p6Sk5a_existingSessionPicker {
  flex-direction: column;
  flex: 1;
  margin-top: 0;
  display: flex;
}

.p6Sk5a_homeTargetPicker .p6Sk5a_existingSessionList {
  overscroll-behavior: contain;
  flex: auto;
  min-height: 0;
  max-height: none;
}

.p6Sk5a_homeTargetRow {
  text-align: left;
  grid-template-columns: minmax(0, 1fr);
  justify-items: start;
  gap: 3px;
  width: 100%;
  height: auto;
  min-height: 38px;
  padding: 6px;
  line-height: 16px;
  display: grid;
}

.p6Sk5a_homeTargetRow:disabled {
  opacity: 1;
  cursor: default;
  color: var(--dsw-alias-label-secondary);
}

.p6Sk5a_homeTargetRow .p6Sk5a_hint {
  overflow-wrap: anywhere;
}

.p6Sk5a_homeTargetPicker :is(.p6Sk5a_existingSessionSearch, .p6Sk5a_actions) {
  flex: none;
}

.p6Sk5a_homeTargetPicker .p6Sk5a_actions {
  margin-top: auto;
}

.p6Sk5a_homeTargetPicker .p6Sk5a_hint {
  margin: 0;
}

.p6Sk5a_panelContent > .p6Sk5a_header {
  height: 28px;
  min-height: 28px;
  margin: 0;
}

.p6Sk5a_panelContent .p6Sk5a_header .p6Sk5a_iconButton {
  width: 28px;
  min-width: 28px;
  height: 28px;
}

.p6Sk5a_panelContent > .p6Sk5a_statusRow {
  box-sizing: border-box;
  min-height: 24px;
  margin: 0;
  padding: 2px 6px;
}

.p6Sk5a_panelContent > .p6Sk5a_hint {
  margin: 0;
  font-size: 12px;
  line-height: 18px;
}

.p6Sk5a_panelContent > .p6Sk5a_error {
  margin: 0;
  padding: 4px 8px;
  line-height: 18px;
}

.p6Sk5a_panelContent .p6Sk5a_quickSpeed {
  gap: 3px;
  padding-top: 0;
}

.p6Sk5a_panelContent .p6Sk5a_quickSpeedHeader {
  line-height: 18px;
}

.p6Sk5a_panelContent .p6Sk5a_quickHint {
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 16px;
  overflow: hidden;
}

.p6Sk5a_panelContent .p6Sk5a_quickHint p {
  text-overflow: ellipsis;
  margin: 0;
  line-height: 16px;
  overflow: hidden;
}

.p6Sk5a_panelContent > .p6Sk5a_caption {
  box-sizing: border-box;
  height: 30px;
  min-height: 30px;
  margin: 0;
  padding: 4px 8px;
  line-height: 18px;
}

.p6Sk5a_panelContent > .p6Sk5a_quickConversation {
  flex-direction: column;
  flex: 1 1 0;
  min-height: 0;
  max-height: none;
  margin: 0;
  padding: 8px;
  display: flex;
  overflow: hidden;
}

.p6Sk5a_quickConversation .p6Sk5a_popoverHeader {
  flex: none;
  min-height: 28px;
  margin-bottom: 6px;
}

.p6Sk5a_quickConversation .p6Sk5a_recentMessages {
  overscroll-behavior: contain;
  min-height: 0;
  overflow-y: auto;
}

.p6Sk5a_floating[data-compact-height="true"] .p6Sk5a_panelContent {
  gap: 2px;
}

.p6Sk5a_floating[data-compact-height="true"] :is(.p6Sk5a_voiceTarget, .p6Sk5a_existingSessionHome) > span {
  font-size: 10px;
}

.p6Sk5a_floating[data-compact-height="true"] .p6Sk5a_voiceTarget strong {
  font-size: 12px;
}

.p6Sk5a_floating[data-compact-height="true"] .p6Sk5a_statusRow[data-bound] .p6Sk5a_status {
  line-height: 16px;
}

.p6Sk5a_floating[data-compact-height="true"] .p6Sk5a_existingSessionHome {
  height: 20px;
  min-height: 20px;
}

.p6Sk5a_floating[data-compact-height="true"] .p6Sk5a_transcriptRetries {
  max-height: max(46px,calc(var(--whale-content-limit) - 137px));
  gap: 1px;
  padding-block: 2px;
}

.p6Sk5a_floating[data-compact-height="true"] [data-has-transcript-retry] > .p6Sk5a_audioDevices, .p6Sk5a_floating[data-compact-height="true"] .p6Sk5a_panelContent:has(.p6Sk5a_currentDshTarget) > :is(.p6Sk5a_audioDevices, .p6Sk5a_quickSpeed), .p6Sk5a_floating[data-compact-height="true"] .p6Sk5a_panelContent > .p6Sk5a_hint:not([data-home-important]), .p6Sk5a_floating[data-compact-height="true"] .p6Sk5a_panelContent .p6Sk5a_quickSpeedHeader, .p6Sk5a_floating[data-compact-height="true"] .p6Sk5a_panelContent .p6Sk5a_quickHint {
  display: none;
}

.p6Sk5a_floating[data-compact-height="true"] .p6Sk5a_quickActions {
  grid-template-columns: minmax(65px, .9fr) minmax(0, 2.1fr);
  align-items: center;
  gap: 4px;
}

.p6Sk5a_floating[data-compact-height="true"] .p6Sk5a_quickActions .p6Sk5a_mainAction {
  white-space: normal;
  height: 30px;
  min-height: 30px;
  padding-inline: 4px;
  font-size: 12px;
  line-height: 1.15;
}

.p6Sk5a_floating[data-compact-height="true"] .p6Sk5a_quickActions .p6Sk5a_quickSegments {
  padding: 2px;
}

.p6Sk5a_floating[data-compact-height="true"] .p6Sk5a_quickActions .p6Sk5a_quickSegments button {
  padding-inline: 2px;
  font-size: 11px;
}

.p6Sk5a_floating[data-compact-height="true"] .p6Sk5a_panelContent[data-size-detail="true"] > .p6Sk5a_quickSpeed {
  display: none;
}

.p6Sk5a_settingsBody {
  container-type: inline-size;
}

.p6Sk5a_section > button {
  justify-self: start;
  max-width: 100%;
}

.p6Sk5a_settingsBody button {
  white-space: normal;
  overflow-wrap: anywhere;
  height: auto;
  min-height: 36px;
}

.p6Sk5a_settingsBody :is(.p6Sk5a_actions, .p6Sk5a_segmented, .p6Sk5a_formActions) > button {
  flex: 0 auto;
}

.p6Sk5a_inlineActions, .p6Sk5a_inlineField, .p6Sk5a_volumeRow, .p6Sk5a_volumeControl {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.p6Sk5a_inlineField {
  font-size: 12px;
}

.p6Sk5a_inlineField .p6Sk5a_deviceSelect {
  text-overflow: ellipsis;
  flex: 0 180px;
  width: 180px;
  max-width: 100%;
}

.p6Sk5a_inlineField input[type="number"] {
  width: 80px;
}

.p6Sk5a_fullName {
  color: var(--dsw-alias-label-secondary);
  min-width: 0;
  font-size: 12px;
}

.p6Sk5a_fullName summary {
  padding: 2px 0;
  font-size: 12px;
  font-weight: 400;
}

.p6Sk5a_fullName p {
  overflow-wrap: anywhere;
  margin-top: 4px;
}

.p6Sk5a_disclosureRow {
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 8px;
  display: flex;
}

.p6Sk5a_disclosureRow > details.p6Sk5a_section {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  flex: 0 auto;
  min-width: 0;
  padding: 0 10px;
}

.p6Sk5a_disclosureRow > details.p6Sk5a_section > summary {
  min-height: 20px;
  padding: 7px 0;
}

.p6Sk5a_disclosureRow > details[open].p6Sk5a_section {
  flex: 100%;
  padding-bottom: 10px;
}

.p6Sk5a_volumeControl {
  flex-wrap: nowrap;
  flex: 0 260px;
}

.p6Sk5a_volumeControl input[type="range"] {
  width: 210px;
  min-width: 80px;
  max-width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
  flex: 210px;
}

.p6Sk5a_volumeControl span {
  text-align: right;
  flex: none;
  min-width: 3em;
  font-size: 12px;
}

.p6Sk5a_field:has( > input[type="number"]) {
  flex-wrap: wrap;
  align-items: center;
  display: flex;
}

.p6Sk5a_field > input[type="number"] {
  width: 80px;
}

.p6Sk5a_authorizationSteps {
  color: var(--dsw-alias-label-secondary);
  margin: 8px 0 12px;
  font-size: 12px;
}

.p6Sk5a_agreement {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  gap: 14px;
  padding: 14px;
  font-size: 13px;
  line-height: 1.6;
  display: grid;
}

.p6Sk5a_agreement p {
  margin: 0;
}

.p6Sk5a_authorizationBody h3 {
  margin: 0 0 10px;
  font-size: 15px;
}

.p6Sk5a_authorizationActions button {
  flex: 0 auto;
  min-height: 36px;
}

@container (width <= 340px) {
  .p6Sk5a_inlineActions {
    align-items: flex-start;
  }

  .p6Sk5a_inlineField .p6Sk5a_deviceSelect {
    flex-basis: 160px;
    width: 160px;
  }

  .p6Sk5a_volumeControl {
    flex-basis: 200px;
  }

  .p6Sk5a_volumeControl input[type="range"] {
    width: 150px;
  }
}

.p6Sk5a_audioDevices {
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  display: flex;
}

.p6Sk5a_audioDeviceGrid {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 8px;
  display: grid;
}

.p6Sk5a_audioDeviceField {
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  font-size: 12px;
  display: flex;
}

.p6Sk5a_audioDeviceField > span {
  align-items: center;
  gap: 4px;
  line-height: 18px;
  display: flex;
}

.p6Sk5a_audioDeviceField svg {
  flex: none;
  width: 14px;
  height: 14px;
}

.p6Sk5a_audioDeviceField select {
  box-sizing: border-box;
  border: 1px solid var(--dsw-alias-border-l2, #c9c9cf);
  background: var(--dsw-alias-bg-layer-1, #fff);
  width: 100%;
  min-width: 0;
  max-width: 100%;
  height: 30px;
  color: inherit;
  font: inherit;
  text-overflow: ellipsis;
  border-radius: 7px;
  padding: 3px 7px;
}

.p6Sk5a_audioDeviceField select[data-device-missing] {
  border-color: #b80;
}

.p6Sk5a_audioDeviceHint, .p6Sk5a_audioDeviceNotice {
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  font-size: 11px;
  line-height: 16px;
  overflow: hidden;
}

.p6Sk5a_audioDeviceHint {
  color: var(--dsw-alias-label-secondary);
}

.p6Sk5a_audioDeviceNotice {
  color: #805500;
}

[data-ds-dark-theme] .p6Sk5a_audioDeviceNotice {
  color: #ffd277;
}

[data-ds-dark-theme] .p6Sk5a_audioDeviceField select {
  color-scheme: dark;
}

.p6Sk5a_floating[data-compact-height="true"] .p6Sk5a_audioDeviceField > span {
  font-size: 11px;
  line-height: 14px;
}

.p6Sk5a_floating[data-compact-height="true"] .p6Sk5a_audioDeviceField select {
  height: 26px;
}

.p6Sk5a_floating[data-compact-height="true"] .p6Sk5a_audioDeviceHint, .p6Sk5a_floating[data-compact-height="true"] .p6Sk5a_audioDeviceNotice, .p6Sk5a_floating[data-compact-height="true"] .p6Sk5a_panelContent:has( > [data-home-important]) .p6Sk5a_audioDeviceField > span {
  display: none;
}

.p6Sk5a_pageHeading.p6Sk5a_modelHeading {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  justify-content: flex-start;
  gap: 10px;
  min-height: 40px;
  margin-bottom: 6px;
  padding: 5px 12px;
}

.p6Sk5a_modelHeading h3 {
  white-space: nowrap;
  font-size: 13px;
}

.p6Sk5a_modelHeading .p6Sk5a_modelNav {
  border: 0;
  flex: 1;
  gap: 3px;
  min-width: 0;
  margin: 0;
  padding: 0;
}

.p6Sk5a_modelHeading .p6Sk5a_modelNav button {
  white-space: nowrap;
  flex: 0 auto;
  height: 28px;
  min-height: 28px;
  padding: 0 6px;
}

.p6Sk5a_currentModel {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  display: flex;
}

.p6Sk5a_pathRow {
  grid-template-columns: 95px minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  font-size: 12px;
  display: grid;
}

.p6Sk5a_pathRow > span {
  min-width: 0;
}

.p6Sk5a_editNotice {
  margin-bottom: 7px;
  padding: 5px 8px;
}

.p6Sk5a_editNotice span {
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
}

.p6Sk5a_editNotice button {
  height: auto;
  min-height: 30px;
}

@media (width <= 360px) {
  .p6Sk5a_pageHeading.p6Sk5a_modelHeading {
    gap: 5px;
    padding: 5px 8px;
  }

  .p6Sk5a_modelHeading .p6Sk5a_modelNav button {
    padding: 0 3px;
    font-size: 11px;
  }

  .p6Sk5a_pathRow {
    grid-template-columns: minmax(0, 1fr);
    gap: 4px;
  }
}

.p6Sk5a_pathRow {
  display: block;
}

.p6Sk5a_pathRow > div:first-child {
  flex-wrap: nowrap !important;
}

.p6Sk5a_pathRow > div:first-child > label {
  flex: 1;
  grid-template-columns: 95px minmax(0, 1fr);
  display: grid !important;
}

.p6Sk5a_pathRow input {
  width: 100% !important;
}

.p6Sk5a_pathRow button {
  flex: none;
  min-height: 32px;
}

@media (width <= 420px) {
  .p6Sk5a_pathRow > div:first-child {
    flex-wrap: wrap !important;
  }

  .p6Sk5a_pathRow > div:first-child > label {
    grid-template-columns: 80px minmax(0, 1fr);
    min-width: 180px !important;
  }
}

.p6Sk5a_floating :is(button, select, input, textarea, summary, a), .p6Sk5a_settings :is(button, select, input, summary, a) {
  transition: background-color .12s ease-out,border-color .12s ease-out,color .12s ease-out,box-shadow .12s ease-out,transform var(--whale-duration, .2s) var(--whale-ease, ease-out);
}

.p6Sk5a_floating :is(button, summary):hover:not(:disabled) {
  background-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,var(--dsw-alias-bg-layer-1));
}

.p6Sk5a_floating button:active:not(:disabled), .p6Sk5a_settings button:active:not(:disabled) {
  transform: scale(.97);
}

.p6Sk5a_floating :is(input, select, textarea):hover:not(:disabled) {
  border-color: var(--dsw-alias-brand-primary);
}

.p6Sk5a_radios label {
  transition: background-color .12s, border-color .12s, box-shadow .12s;
}

.p6Sk5a_radios label:has(input:checked) {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,transparent);
}

.p6Sk5a_authorizationBody, .p6Sk5a_settingsLayout, .p6Sk5a_panelContent > .p6Sk5a_header, .p6Sk5a_settingsBody > div:not([hidden]), .p6Sk5a_section > div:not([hidden])[data-whale-tab-panel], .p6Sk5a_floating [role="tabpanel"]:not([hidden]) {
  animation: p6Sk5a_whalePageEnter var(--whale-duration, .2s) ease-out;
}

.p6Sk5a_floating :is([role="menu"], [role="listbox"]), .p6Sk5a_floating [data-whale-dropdown] {
  transform-origin: top;
  animation: .12s ease-out p6Sk5a_whalePageEnter;
}

.p6Sk5a_floating [data-whale-save-result] {
  animation: .16s ease-out p6Sk5a_whaleFeedback;
}

.p6Sk5a_floating summary {
  list-style: none;
}

.p6Sk5a_floating summary::-webkit-details-marker {
  display: none;
}

.p6Sk5a_floating summary:before {
  content: "\u203A";
  width: 1em;
  transition: transform .16s ease-out;
  display: inline-block;
  transform: rotate(0);
}

.p6Sk5a_floating details[open] > summary:before {
  transform: rotate(90deg);
}

.p6Sk5a_floating details[open] > :not(summary) {
  animation: .16s ease-out p6Sk5a_whalePageEnter;
}

@supports (interpolate-size: allow-keywords) {
  .p6Sk5a_floating details {
    interpolate-size: allow-keywords;
  }

  .p6Sk5a_floating details::details-content {
    block-size: 0;
    transition: block-size .16s ease-out,content-visibility .16s allow-discrete;
    overflow: clip;
  }

  .p6Sk5a_floating details[open]::details-content {
    block-size: auto;
  }
}

@keyframes p6Sk5a_whalePageEnter {
  from {
    translate: 0 4px;
  }

  to {
    translate: 0;
  }
}

@keyframes p6Sk5a_whaleFeedback {
  from {
    opacity: .5;
  }

  to {
    opacity: 1;
  }
}

[data-motion="firm"].p6Sk5a_floating, [data-motion="firm"].p6Sk5a_settings {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="firm"].p6Sk5a_floating details::details-content, [data-motion="firm"].p6Sk5a_floating summary:before {
  transition-duration: .1s;
}

[data-motion="off"].p6Sk5a_floating *, [data-motion="off"].p6Sk5a_settings *, [data-motion="off"].p6Sk5a_floating :before, [data-motion="off"].p6Sk5a_floating details::details-content {
  transition: none !important;
  animation: none !important;
}

[data-motion="off"].p6Sk5a_floating button:active, [data-motion="off"].p6Sk5a_settings button:active {
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .p6Sk5a_floating *, .p6Sk5a_settings *, .p6Sk5a_floating :before, .p6Sk5a_floating details::details-content {
    transition: none !important;
    animation: none !important;
  }

  .p6Sk5a_floating button:active, .p6Sk5a_settings button:active {
    transform: none;
  }
}

.p6Sk5a_conversationChoice {
  gap: 6px;
  min-width: 0;
  display: grid;
  position: relative;
}

.p6Sk5a_conversationChoice > button {
  text-align: left;
  justify-content: space-between;
  width: 100%;
  min-width: 0;
}

.p6Sk5a_conversationOptions {
  overscroll-behavior: contain;
  gap: 3px;
  min-width: 0;
  max-height: 220px;
  padding: 6px;
  animation: .12s ease-out p6Sk5a_whalePageEnter;
  display: grid;
  overflow: auto;
}

.p6Sk5a_conversationOptions [role="option"] {
  text-align: left;
  border-radius: var(--dsw-radius-sm);
  justify-content: space-between;
  width: 100%;
  min-width: 0;
  padding: 7px 10px;
  transition: background-color .12s ease-out, color .12s ease-out;
}

.p6Sk5a_conversationOptions [role="option"][aria-selected="true"] {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 18%,var(--dsw-alias-bg-layer-1));
  font-weight: 600;
}

.p6Sk5a_conversationOptions [role="option"]:is(:hover, :focus-visible) {
  background: var(--dsw-alias-interactive-bg-active);
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: -2px;
}

.p6Sk5a_conversationOptions [role="option"] small {
  color: var(--dsw-alias-label-secondary);
}

.p6Sk5a_settings [data-whale-tab-panel]:not([hidden]) {
  animation: p6Sk5a_whalePageEnter var(--whale-duration, .2s) ease-out;
}

.p6Sk5a_modelHeading .p6Sk5a_modelNav {
  scrollbar-width: thin;
  overflow-x: auto;
}

.p6Sk5a_modelHeading .p6Sk5a_modelNav button {
  flex-shrink: 0;
}

[data-motion="off"].p6Sk5a_settings [data-whale-tab-panel] {
  animation: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .p6Sk5a_settings [data-whale-tab-panel] {
    animation: none !important;
  }
}

.p6Sk5a_panelContent, .p6Sk5a_bubble {
  animation: none;
}

.p6Sk5a_panelContent {
  height: auto;
}

.p6Sk5a_panelContent[data-size-detail="true"] {
  height: 100%;
}

.p6Sk5a_panelContent .p6Sk5a_quickSegments {
  background: none;
  gap: 6px;
  padding: 0;
}

.p6Sk5a_panelContent .p6Sk5a_quickSegments button {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 8px;
  gap: 4px;
  height: 34px;
  min-height: 34px;
}

.p6Sk5a_panelContent .p6Sk5a_quickSegments button[aria-pressed="true"] {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 22%,var(--dsw-alias-bg-layer-1));
  box-shadow: inset 0 0 0 1px var(--dsw-alias-brand-primary);
}

.p6Sk5a_panelContent .p6Sk5a_quickSegments svg {
  width: 15px;
  height: 15px;
}

.p6Sk5a_panelContent > .p6Sk5a_quickConversation {
  border-top: 1px solid var(--dsw-alias-border-l2);
  cursor: auto;
  flex-direction: column;
  flex: 1 1 0;
  min-height: 0;
  margin: 3px 0 0;
  padding: 0;
  display: flex;
  position: relative;
  overflow: hidden;
}

.p6Sk5a_conversationHeader {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  font-size: 12px;
  display: flex;
}

.p6Sk5a_conversationHeader > div {
  align-items: center;
  gap: 2px;
  display: flex;
}

.p6Sk5a_conversationHeader button:not(.p6Sk5a_iconButton), .p6Sk5a_assistantName, .p6Sk5a_loadHistory {
  color: inherit;
  font: inherit;
  cursor: pointer;
  background: none;
  border: 0;
  border-radius: 4px;
  padding: 3px;
}

.p6Sk5a_conversationHeader .p6Sk5a_iconButton {
  width: 26px;
  min-width: 26px;
  height: 28px;
}

.p6Sk5a_historyScope {
  color: var(--dsw-alias-label-secondary);
  flex: none;
  margin: 2px 0;
  font-size: 10px;
  line-height: 14px;
}

.p6Sk5a_quickConversation .p6Sk5a_recentMessages {
  overflow-anchor: none;
  scrollbar-gutter: stable;
  overscroll-behavior: contain;
  flex-direction: column;
  flex: auto;
  gap: 8px;
  min-height: 0;
  padding: 5px 4px 8px;
  display: flex;
  overflow: auto;
}

.p6Sk5a_message {
  background: none;
  border-radius: 0;
  flex-direction: column;
  flex: none;
  align-self: flex-start;
  align-items: flex-start;
  max-width: 92%;
  padding: 0;
  display: flex;
}

.p6Sk5a_message[data-role="user"] {
  align-self: flex-end;
  align-items: flex-end;
}

.p6Sk5a_messageName {
  min-height: 19px;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  line-height: 17px;
}

.p6Sk5a_assistantName {
  overflow-wrap: anywhere;
  max-width: 100%;
  min-height: 19px;
  padding: 0 2px;
  font-size: 11px;
  line-height: 17px;
}

.p6Sk5a_assistantName:hover {
  color: var(--dsw-alias-label-primary);
  text-underline-offset: 3px;
  text-decoration: underline;
}

.p6Sk5a_assistantNameInput {
  box-sizing: border-box;
  width: 140px;
  min-width: 60px;
  max-width: 160px;
  height: 23px !important;
  min-height: 23px !important;
  padding: 1px 5px !important;
  font-size: 12px !important;
}

.p6Sk5a_message p {
  box-sizing: border-box;
  border: 1px solid var(--dsw-alias-border-l2);
  background: var(--dsw-alias-bg-module-platform);
  max-width: 100%;
  color: var(--dsw-alias-label-primary);
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  user-select: text;
  border-radius: 10px;
  margin: 0;
  padding: 6px 9px;
}

.p6Sk5a_message[data-role="user"] p {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 28%,var(--dsw-alias-bg-layer-1));
  border-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 45%,var(--dsw-alias-border-l2));
}

.p6Sk5a_message small {
  color: var(--dsw-alias-label-secondary);
  font-size: 10px;
}

.p6Sk5a_loadHistory {
  align-self: center;
  padding: 5px;
  font-size: 11px;
}

.p6Sk5a_newMessages {
  font: inherit;
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-layer-2, var(--whale-solid-base));
  border: 1px solid var(--dsw-alias-brand-primary);
  cursor: pointer;
  border-radius: 999px;
  align-items: center;
  gap: 4px;
  padding: 5px 9px;
  font-size: 11px;
  display: flex;
  position: absolute;
  bottom: 7px;
  right: 10px;
  box-shadow: 0 2px 6px #0002;
}

.p6Sk5a_bubble {
  gap: 6px;
  padding: 0 7px;
  font-size: 11px;
}

.p6Sk5a_bubbleBrand {
  flex: none;
  font-size: 12px;
  font-weight: 600;
}

.p6Sk5a_bubbleStatus {
  white-space: nowrap;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 3px;
  min-width: 0;
  display: flex;
}

.p6Sk5a_bubbleStatus svg {
  flex: none;
  width: 15px;
  height: 15px;
}

.p6Sk5a_bubble > svg:last-child {
  flex: none;
  width: 14px;
  height: 14px;
}

.p6Sk5a_voiceBars {
  align-items: center;
  gap: 2px;
  height: 16px;
  display: flex;
}

.p6Sk5a_voiceBars i {
  background: var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary));
  opacity: .5;
  border-radius: 1px;
  width: 3px;
  height: 13px;
  transform: scaleY(.31);
}

.p6Sk5a_voiceBars[data-active="true"] i {
  background: var(--dsw-alias-brand-primary);
  opacity: 1;
  animation: .7s ease-in-out infinite alternate p6Sk5a_whaleInputPulse;
}

.p6Sk5a_voiceBars[data-active="true"] i:nth-child(2n) {
  animation-delay: -.3s;
}

.p6Sk5a_voiceBars[data-active="true"] i:nth-child(3) {
  animation-delay: -.5s;
}

@keyframes p6Sk5a_whaleInputPulse {
  from {
    transform: scaleY(.38);
  }

  to {
    transform: scaleY(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .p6Sk5a_voiceBars[data-active="true"] i {
    animation: none;
    transform: scaleY(.69);
  }
}

.p6Sk5a_floating[data-motion="off"] .p6Sk5a_voiceBars[data-active="true"] i {
  animation: none;
  transform: scaleY(.69);
}

@media (forced-colors: active) {
  .p6Sk5a_message p {
    border: 1px solid canvastext;
  }

  .p6Sk5a_quickSegments button[aria-pressed="true"] {
    outline: 2px solid highlight;
  }

  .p6Sk5a_voiceBars i {
    background: canvastext;
  }
}

.p6Sk5a_voicePrompt {
  flex-direction: column;
  gap: 8px;
  display: flex;
}

.p6Sk5a_voicePrompt label {
  font-size: 13px;
  font-weight: 600;
}

.p6Sk5a_voicePrompt label span {
  margin-left: 10px;
  font-weight: 400;
}

.p6Sk5a_voicePromptInput {
  box-sizing: border-box;
  resize: vertical;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md, 10px);
  background: var(--dsw-alias-bg-layer-1);
  width: 100%;
  min-height: 180px;
  color: inherit;
  font: inherit;
  padding: 12px;
  line-height: 1.65;
}

.p6Sk5a_voicePromptInput::placeholder {
  color: var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary));
  opacity: 1;
}

.p6Sk5a_voicePromptInput:disabled {
  opacity: .65;
  cursor: not-allowed;
}

.p6Sk5a_voicePromptInput:focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: 2px;
}

.p6Sk5a_voicePromptCount {
  text-align: right;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
}

.p6Sk5a_voicePromptActions {
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  display: flex;
}

.p6Sk5a_voicePromptActions .p6Sk5a_actions {
  margin: 0;
}

.p6Sk5a_voicePromptMode {
  color: var(--dsw-alias-state-success-primary, var(--dsw-alias-label-secondary));
  white-space: nowrap;
  font-size: 11px;
}

.p6Sk5a_voicePromptMode:before {
  content: "\u2022";
  margin-right: 5px;
}
`};var ae=require("react/jsx-runtime");function Yn({small:e=!1,state:n="idle"}){return(0,ae.jsx)("svg",{viewBox:"0 0 1024 1024","data-state":n,className:e?h.markSmall:h.mark,"aria-hidden":"true",children:(0,ae.jsx)("path",{fill:"currentColor",d:"M 920.377 65.087 C 928.064 63.083 932.973 107.434 932.987 114.072 C 933.092 165.045 924.256 210.594 901.365 256.376 C 855.379 348.348 758.325 392.662 681.124 453.829 C 619.898 502.339 580.980 567.068 558.933 641.286 C 543.187 694.296 538.293 750.695 527.468 804.833 C 520.391 840.227 514.008 874.928 493.687 905.451 C 474.447 934.348 431.832 972.135 393.948 957.487 C 358.248 943.683 373.787 884.228 380.635 856.964 C 401.585 773.552 460.283 657.712 419.105 573.931 C 381.383 497.183 304.815 488.756 234.259 458.353 C 195.522 441.661 157.383 413.822 133.190 378.905 C 115.301 353.087 100.999 326.148 94.423 295.130 C 93.358 290.109 88.245 266.804 93.252 264.337 C 93.759 264.087 133.145 277.445 138.791 278.433 C 174.563 284.693 209.339 281.307 245.016 275.980 C 288.094 269.548 333.679 260.367 376.940 270.872 C 414.858 280.080 448.414 297.981 474.046 327.930 C 483.707 339.219 491.970 352.034 498.604 365.302 C 499.492 367.078 503.519 377.817 505.784 377.367 C 506.966 377.132 507.537 375.084 507.926 374.169 C 513.160 361.862 518.091 349.606 524.078 337.631 C 541.287 303.214 562.597 270.184 592.119 244.919 C 633.676 209.352 683.585 187.330 735.895 172.601 C 770.712 162.797 806.633 155.544 838.984 138.655 C 862.849 126.195 882.544 110.622 901.022 91.328 C 905.036 87.137 916.896 65.995 920.377 65.087 Z"})})}var cd=()=>({pet:(0,ae.jsxs)(ae.Fragment,{children:[(0,ae.jsx)("path",{d:"M5 11c-2-8 4-10 7-8 5-2 9 2 7 8M5 10l4-4 3 3 3-3 4 4v5c0 4-3 6-7 6s-7-2-7-6v-5Z"}),(0,ae.jsx)("path",{d:"M8 13v2m8-2v2m-6 3h4"})]}),settings:(0,ae.jsxs)(ae.Fragment,{children:[(0,ae.jsx)("path",{d:"m9 3 1-1h4l1 1 .5 2 2 .8 2-.6 2 3-.8 1.8.2 2.2 1.3 1.5-2 3-2.1-.2-1.7 1.3-.5 2.2h-4l-.6-2.1-1.8-1.1-2 .3-2-3 1.3-1.7V10L4 8.5l2-3 2 .5L9 3Z"}),(0,ae.jsx)("circle",{cx:"12",cy:"11.5",r:"3"})]}),minus:(0,ae.jsx)("path",{d:"M5 12h14"}),plus:(0,ae.jsx)("path",{d:"M12 5v14M5 12h14"}),down:(0,ae.jsx)("path",{d:"m6 9 6 6 6-6"}),refresh:(0,ae.jsxs)(ae.Fragment,{children:[(0,ae.jsx)("path",{d:"M20 6v5h-5M4 18v-5h5"}),(0,ae.jsx)("path",{d:"M6 7a7 7 0 0 1 12-1l2 5M4 13l2 5a7 7 0 0 0 12-1"})]}),up:(0,ae.jsx)("path",{d:"m6 15 6-6 6 6"}),check:(0,ae.jsx)("path",{d:"m5 12 4 4L19 6"}),micOff:(0,ae.jsx)(ae.Fragment,{children:(0,ae.jsx)("path",{d:"M9 9v3a3 3 0 0 0 5.1 2.1M15 8V6a3 3 0 0 0-5.7-1.3M6 10v2a6 6 0 0 0 10.2 4.3M18 12v-2M12 18v3M9 21h6M3 3l18 18"})}),mic:(0,ae.jsxs)(ae.Fragment,{children:[(0,ae.jsx)("rect",{x:"9",y:"3",width:"6",height:"12",rx:"3"}),(0,ae.jsx)("path",{d:"M6 10v2a6 6 0 0 0 12 0v-2M12 18v3M9 21h6"})]}),volume:(0,ae.jsxs)(ae.Fragment,{children:[(0,ae.jsx)("path",{d:"M3 9h4l5-4v14l-5-4H3Z"}),(0,ae.jsx)("path",{d:"M16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"})]}),chat:(0,ae.jsx)("path",{d:"M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9l-5 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"}),close:(0,ae.jsx)("path",{d:"m6 6 12 12M18 6 6 18"}),search:(0,ae.jsxs)(ae.Fragment,{children:[(0,ae.jsx)("circle",{cx:"10",cy:"10",r:"6"}),(0,ae.jsx)("path",{d:"m15 15 5 5"})]}),chevron:(0,ae.jsx)("path",{d:"m9 5 7 7-7 7"}),warning:(0,ae.jsxs)(ae.Fragment,{children:[(0,ae.jsx)("path",{d:"m12 3 10 18H2L12 3Z"}),(0,ae.jsx)("path",{d:"M12 9v5m0 3v.2"})]})});function He({name:e,className:n=""}){return(0,ae.jsx)("svg",{viewBox:"0 0 24 24",width:"18",height:"18","aria-hidden":"true",className:n,fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round",children:cd()[e]??cd().chat})}var Pe=require("react/jsx-runtime");function Ah({name:e,save:n,t}){let[o,r]=(0,Be.useState)(!1),[i,a]=(0,Be.useState)(e),l=(0,Be.useRef)(!1),c=(0,Be.useRef)(null),u=(0,Be.useRef)(null),d=(0,Be.useRef)(!1);(0,Be.useLayoutEffect)(()=>{o?(c.current?.focus({preventScroll:!0}),c.current?.select()):d.current&&(d.current=!1,u.current?.focus({preventScroll:!0}))},[o]);let m=()=>{r(!1),a(e)},f=()=>{let p=i.trim();p&&p.length<=40&&(n?.(p),d.current=!0,r(!1))};return o?(0,Pe.jsx)(lr.Input,{ref:c,className:h.assistantNameInput,"aria-label":t("assistantName"),value:i,maxLength:40,"data-no-drag":!0,onChange:p=>a(p.target.value),onCompositionStart:()=>{l.current=!0},onCompositionEnd:()=>{l.current=!1},onBlur:m,onKeyDown:p=>{p.stopPropagation(),!(l.current||p.nativeEvent.isComposing)&&(p.key==="Escape"&&(p.preventDefault(),d.current=!0,m()),p.key==="Enter"&&(p.preventDefault(),f()))}}):(0,Pe.jsx)("button",{ref:u,type:"button",className:h.assistantName,"data-no-drag":!0,title:t("renameAssistant"),onClick:()=>{a(e),r(!0)},children:e})}function ud({conversation:e,history:n,historyLoading:t,historyError:o,historyRetryCursor:r,loadHistory:i,assistantName:a,setAssistantName:l,close:c,t:u}){let[d,m]=(0,Be.useState)(!1),[f,p]=(0,Be.useState)(0),y=(0,Be.useRef)(null),v=(0,Be.useRef)(!0),b=(0,Be.useRef)(null),x=(0,Be.useRef)(null),C=e.rootSessionId,B=Gu(n?.rootSessionId===C?n.items:[],e.items),D=!v.current&&b.current?.firstId,E=D?B.findIndex(k=>k.id===D):-1,$=d?B:E>=0?B.slice(E):ju(B),z=()=>{let k=y.current;if(!k)return;let P=k.getBoundingClientRect(),V=[...k.querySelectorAll("[data-message-id]")].find(S=>S.getBoundingClientRect().bottom>=P.top);x.current=V?{id:V.dataset.messageId,offset:V.getBoundingClientRect().top-P.top}:null},M=()=>{let k=y.current;k&&(k.scrollTop=k.scrollHeight),v.current=!0,p(0),z()},A=!d&&B.filter(k=>k.role==="user").length<10&&!!n?.nextCursor;return(0,Be.useEffect)(()=>{A&&!t&&!o&&i?.(n.nextCursor)},[A,n?.nextCursor,t,o,C]),(0,Be.useLayoutEffect)(()=>{let k=y.current;if(!k)return;let P=b.current;if((!P||P.root!==C)&&(v.current=!0,p(0)),v.current)k.scrollTop=k.scrollHeight;else{let V=x.current,S=V&&[...k.querySelectorAll("[data-message-id]")].find(N=>N.dataset.messageId===V.id);if(S?k.scrollTop+=S.getBoundingClientRect().top-k.getBoundingClientRect().top-V.offset:P&&(k.scrollTop=Math.min(P.top,k.scrollHeight-k.clientHeight)),P){let N=e.items.filter(I=>I.at>=P.lastAt&&!P.ids.has(I.id)).length;N&&p(I=>I+N)}}b.current={root:C,firstId:$[0]?.id,top:k.scrollTop,lastAt:Math.max(0,...B.map(V=>V.at)),ids:new Set(B.map(V=>V.id))},z()},[e,n,d,f]),(0,Pe.jsxs)("section",{className:h.quickConversation,"data-dropdown":"conversation","data-no-drag":!0,role:"region","aria-label":u("recentConversation"),onKeyDown:k=>{k.key==="Escape"&&(k.stopPropagation(),c())},children:[(0,Pe.jsxs)("div",{className:h.conversationHeader,children:[(0,Pe.jsx)("strong",{children:u(d?"allRecords":"recentTenTurns")}),(0,Pe.jsxs)("div",{children:[(0,Pe.jsx)("button",{type:"button",onClick:()=>{d?(v.current=!0,x.current=null,b.current=null,p(0)):z(),m(k=>!k)},children:u(d?"collapseToTen":"showAllRecords")}),(0,Pe.jsx)(lr.Button,{className:h.iconButton,"aria-label":u("close"),title:u("collapseConversation"),onClick:c,children:(0,Pe.jsx)(He,{name:"up"})})]})]}),d&&(0,Pe.jsxs)("p",{className:h.historyScope,children:[u("currentVoiceRecords"),n?.truncated?" \xB7 "+u("historyTruncated"):""]}),(0,Pe.jsxs)("div",{ref:y,className:h.recentMessages,"data-conversation-messages":!0,tabIndex:0,"aria-label":u("conversationMessages"),onWheel:k=>{k.deltaY<0&&(v.current=!1)},onScroll:()=>{let k=y.current;v.current=qu(k),v.current&&p(0),b.current&&(b.current.top=k.scrollTop),z()},children:[d&&n?.nextCursor&&(0,Pe.jsx)("button",{className:h.loadHistory,disabled:t,onClick:()=>{z(),i?.(n.nextCursor)},children:u(t?"readingHistory":"loadEarlier")}),o&&(0,Pe.jsx)("button",{className:h.loadHistory,disabled:t,onClick:()=>{i?.(r??void 0)},children:u("retryHistory")}),$.map(k=>(0,Pe.jsxs)("div",{"data-message-id":k.id,"data-role":k.role,className:h.message,children:[(0,Pe.jsx)("div",{className:h.messageName,children:k.role==="user"?(0,Pe.jsx)("span",{children:u("you")}):(0,Pe.jsx)(Ah,{name:a,save:l,t:u})}),(0,Pe.jsx)("p",{children:k.text}),["speech-failed","interrupted"].includes(k.state)&&(0,Pe.jsx)("small",{children:u(k.state==="speech-failed"?"speechFailed":"speechInterrupted")})]},k.id)),!$.length&&(0,Pe.jsx)("p",{className:h.hint,children:u(t||A?"readingHistory":"noConversation")})]}),f>0&&(0,Pe.jsxs)("button",{className:h.newMessages,onClick:M,children:[(0,Pe.jsx)(He,{name:"down"}),f," ",u("newMessages")]})]})}var Qn=require("react"),Ct=require("@deepseek-ai/dsh-client-ui-primitives"),pn=require("react/jsx-runtime");function fo({label:e,value:n,onChange:t,kind:o,pickPath:r,sessionId:i,disabled:a,active:l=!0,scope:c,className:u,placeholder:d}){let[m,f]=(0,Qn.useState)(!1),[p,y]=(0,Qn.useState)(null),v=typeof n=="string"?n.split(/[\\/]/).filter(Boolean).at(-1)??n:"",b=(0,Qn.useRef)(null),x=(0,Qn.useRef)(null),C=()=>{b.current?.abort(),b.current=null,f(!1)};(0,Qn.useEffect)(()=>(C(),y(null),C),[i,a,l,c,n]);let B=async()=>{if(b.current||a||!l||!r)return;let D=new AbortController;b.current=D,f(!0),y(null);try{let E=await r(i,o,D.signal);b.current===D&&!D.signal.aborted&&!x.current?.closest("[hidden]")&&E!==null&&t(E)}catch(E){b.current===D&&!D.signal.aborted&&y(String(E?.message??E))}finally{b.current===D&&(b.current=null,f(!1))}};return(0,pn.jsxs)("div",{ref:x,className:u,"data-native-path":o,children:[(0,pn.jsxs)("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,minWidth:0},children:[(0,pn.jsxs)("label",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,minWidth:0},children:[e,(0,pn.jsx)(Ct.Input,{"aria-label":e,title:n??"",value:v,placeholder:d,disabled:a,readOnly:!0,style:{width:190,maxWidth:"100%",minWidth:0,textOverflow:"ellipsis"}})]}),(0,pn.jsx)(Ct.Button,{variant:"outline",disabled:a||!l||!r||m,onClick:()=>{B()},children:m?"\u7B49\u5F85\u9009\u62E9\u2026":o==="referenceAudio"||o==="campplus"?"\u9009\u62E9\u6587\u4EF6\u2026":"\u9009\u62E9\u6587\u4EF6\u5939\u2026"})]}),o==="campplus"&&n&&(0,pn.jsx)(Ct.Button,{variant:"outline",disabled:a,onClick:()=>{C(),t("")},children:"\u6E05\u9664\u53EF\u9009\u6A21\u578B"}),m&&(0,pn.jsx)(Ct.Button,{variant:"outline",onClick:C,children:"\u53D6\u6D88\u9009\u62E9"}),n&&(0,pn.jsxs)("details",{style:{fontSize:12,minWidth:0},children:[(0,pn.jsx)("summary",{children:"\u67E5\u770B\u5B8C\u6574\u8DEF\u5F84"}),(0,pn.jsx)("p",{style:{margin:"4px 0",overflowWrap:"anywhere"},children:n})]}),p&&(0,pn.jsx)("p",{role:"alert",children:p})]})}var Pt=require("react");var nn=require("react/jsx-runtime"),ho=e=>e&&typeof e=="object"?`${e.backend}:${e.id}`:e==null?"":"__legacy";function dd({state:e,sessionId:n,run:t,t:o}){let r=(0,Pt.useRef)({state:e,sessionId:n,run:t}),i=(0,Pt.useRef)(void 0);r.current={state:e,sessionId:n,run:t},(0,Pt.useEffect)(()=>{!e.settings||e.settingsFor!==n||e.busy||e.audioDevicesPending||i.current===n||(i.current=n,t(n,"read-audio-devices"))},[n,e.settingsFor,e.busy,e.audioDevicesPending]),(0,Pt.useEffect)(()=>{let f=!1,p,y=async()=>{let v=r.current;!f&&v.sessionId===n&&!v.state.busy&&!document.hidden&&(v.state.settingsFor!==n&&await v.run(n,"read-settings"),f||await v.run(n,"read-audio-devices")),f||(p=document.defaultView.setTimeout(y,1e4))};return y(),()=>{f=!0,document.defaultView.clearTimeout(p)}},[n]);let a=!!(e.settings&&e.settingsFor===n),l=a?e.settings:null,c=l?.audioDevices??{input:l?.values?.device??null,output:null},u=e.audioDevicesFor===n?e.audioDevices:null,d=e.checkedFor===n&&!e.uncertain&&e.status?.enabled===!1&&e.status?.ownerSessionId===null&&e.status?.voiceControlBusy===!1&&e.status?.voiceSession?.fullyStopped===!0&&e.status?.voiceSession?.id==null,m=[];return(0,nn.jsxs)("section",{className:h.audioDevices,"aria-label":o("audioDevices"),"data-audio-device-controls":!0,"data-no-drag":!0,children:[(0,nn.jsx)("div",{className:h.audioDeviceGrid,children:["input","output"].map(f=>{let p=c[f],y=u?.[f],v=ho(p),b=y?.items?.some(E=>ho(E)===v),x=p&&typeof p=="object"&&y&&y.status!=="unavailable"&&!b,C=p==null?o("audioSystemDefault"):typeof p=="object"?p.name:String(p),B=f==="output"&&y?.reason==="AUDIO_PLATFORM_UNSUPPORTED",D=!a||e.busy||e.uncertain||e.settingsConflict||B||f==="input"&&!d;return x&&m.push(o(f==="input"?"inputDeviceMissing":"outputDeviceMissing")),(0,nn.jsxs)("label",{className:h.audioDeviceField,children:[(0,nn.jsxs)("span",{children:[(0,nn.jsx)(He,{name:f==="input"?"mic":"volume"}),o(f==="input"?"audioInput":"audioOutput")]}),(0,nn.jsxs)("select",{"aria-label":o(f==="input"?"audioInput":"audioOutput"),"data-device-missing":x||void 0,title:D&&f==="input"&&!d?o("inputDeviceStopFirst"):B?o("outputDeviceUnsupported"):C,disabled:D,value:v,onFocus:()=>{e.audioDevicesPending||t(n,"read-audio-devices")},onChange:E=>{let $=E.target.value;if($==="__legacy"||$===v)return;let z=$===""?null:y?.items?.find(M=>ho(M)===$);z!==void 0&&t(n,"save-audio-device",{revision:l.revision,direction:f,selection:z})},children:[(0,nn.jsx)("option",{value:"",children:o("audioSystemDefault")}),p!=null&&!b&&(0,nn.jsxs)("option",{value:v,children:[C,x?" \xB7 "+o("deviceDisconnected"):typeof p=="object"?"":" \xB7 "+o("deviceSaved")]}),y?.items?.map(E=>(0,nn.jsx)("option",{value:ho(E),children:E.name},ho(E)))]})]},f)})}),m.length>0?(0,nn.jsx)("p",{className:h.audioDeviceNotice,role:"status",children:m.join("\uFF1B")}):e.audioDevicesError||u?.input?.status==="unavailable"||u?.output?.status==="unavailable"&&u?.output?.reason!=="AUDIO_PLATFORM_UNSUPPORTED"?(0,nn.jsx)("p",{className:h.audioDeviceHint,role:"status",children:o("deviceListRetry")}):u?.output?.reason==="AUDIO_PLATFORM_UNSUPPORTED"?(0,nn.jsx)("p",{className:h.audioDeviceHint,children:o("outputDeviceUnsupported")}):!d&&a?(0,nn.jsx)("p",{className:h.audioDeviceHint,children:o("inputDeviceStopFirst")}):null]})}var Ne=require("react"),mn=require("@deepseek-ai/dsh-client-ui-primitives");var oe=require("react/jsx-runtime"),Ch={busy:"\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F",archived:"\u4F1A\u8BDD\u5DF2\u5F52\u6863",unavailable:"\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528"},It=e=>e.title?.trim()||`\u672A\u547D\u540D\u4F1A\u8BDD \xB7 ${e.sessionId.slice(-6).toUpperCase()}`,cr=e=>Ch[e.availability],Bn=e=>["ready","busy"].includes(e?.availability),ur=(e,n)=>e.checkedFor===n&&!e.uncertain&&!e.busy&&!e.ttsCancelling&&!e.existingSessionWritePending&&!e.existingSessionUnconfirmed&&e.status?.voiceControlBusy===!1&&e.status?.voiceSession?.fullyStopped===!0&&e.status?.enabled===!1;function pd({sessionId:e,boundSession:n,state:t,controlContext:o,listExistingVoiceSessions:r,setExistingVoiceSession:i,readState:a,run:l,t:c}){let[u,d]=(0,Ne.useState)(),[m,f]=(0,Ne.useState)(!1),[p,y]=(0,Ne.useState)(!1),v=(0,Ne.useRef)(null),b=(0,Ne.useId)(),x=n?.sessionId??null,C=e===x,B=P=>ur(P,e)&&Object.hasOwn(P.status,"existingVoiceSession")&&(P.status.existingVoiceSession?.sessionId??null)===x,D=()=>o.currentConversation()===e&&o.sourceFor(e)===e;(0,Ne.useEffect)(()=>{let P=new AbortController;return v.current={signal:P.signal,choosing:!1},f(!1),r({sessionId:e},P.signal).then(V=>{P.signal.aborted||!D()||(d(V.items.find(S=>S.sessionId===e)??null),(V.binding?.sessionId??null)!==x&&l(e,"status"))}).catch(()=>{P.signal.aborted||d(null)}),()=>P.abort()},[e,x,o,r]);let E=async()=>{let P=v.current;if(!(!P||P.signal.aborted||P.choosing||!D())&&B(a())){P.choosing=!0,f(!0),y(!1);try{if(C){await i({sessionId:null,expectedSessionId:x});return}let V=await r({sessionId:e},P.signal);if(P.signal.aborted||!D())return;let S=V.items.find(I=>I.sessionId===e),N=(V.binding?.sessionId??null)!==x;if(N||!Bn(S)){d(S??null),y(!0),N&&l(e,"status");return}if(!B(a()))return;await i({sessionId:e,expectedSessionId:x})}catch{P.signal.aborted||y(!0)}finally{P.choosing=!1,P.signal.aborted||f(!1)}}},$=C?n:u,z=u===void 0&&!C,M=C||z||Bn($);if(!M&&!p)return null;let A=c(C?"backToFishVoice":"chooseCurrentDshTarget"),k=z?c("checkingVoiceTarget"):$?It($):"";return(0,oe.jsxs)("div",{className:h.currentDshTarget,"data-whale-current-target":!0,"data-no-drag":!0,children:[M&&(0,oe.jsxs)(mn.Button,{variant:"outline",className:h.currentDshAction,"data-whale-operation":C?"unbind-existing-session":"bind-current-session","aria-label":A,"aria-busy":m||z,"aria-describedby":b,disabled:!B(t)||m||z,onClick:()=>{E()},children:[(0,oe.jsx)("span",{children:A}),(0,oe.jsx)("span",{id:b,className:h.ellipsis,title:k,children:k})]}),p&&(0,oe.jsx)("p",{role:"alert",className:h.hint,children:c("currentDshTargetError")})]})}function Ri({state:e,sessionId:n,listExistingVoiceSessions:t,setExistingVoiceSession:o,openExistingVoiceSession:r,showHome:i,homePickerId:a,closeHomePicker:l,t:c}){let[u,d]=(0,Ne.useState)(null),[m,f]=(0,Ne.useState)(!1),[p,y]=(0,Ne.useState)(""),[v,b]=(0,Ne.useState)(null),[x,C]=(0,Ne.useState)(!1),[B,D]=(0,Ne.useState)(!1),[E,$]=(0,Ne.useState)(null),z=(0,Ne.useRef)(null),M=(0,Ne.useRef)(!1),A=(0,Ne.useId)(),k=!!a,P=k||m,V=e.status,S=Object.hasOwn(V??{},"existingVoiceSession")?V.existingVoiceSession:u?.binding,N=V?.existingVoiceSessionSupported!==!1,I=ur(e,n),G=e.existingSessionWritePending,L=u?.items.find(Q=>Q.sessionId===v),H=I&&!x&&!!S,X=I&&N&&!x&&!B&&!!u,ce=(0,Ne.useCallback)(async(Q="",le)=>{z.current?.abort();let ge=new AbortController;z.current=ge,C(!0),D(!1);try{let $e=await t({...Q?{query:Q}:{},...le?{cursor:le}:{}},ge.signal);if(ge.signal.aborted)return;d(je=>({...$e,query:Q,items:le&&je?[...new Map([...je.items,...$e.items].map(Oe=>[Oe.sessionId,Oe])).values()]:$e.items}))}catch{ge.signal.aborted||D(!0)}finally{z.current===ge&&(z.current=null,C(!1))}},[t]);(0,Ne.useEffect)(()=>(M.current=!0,N?ce():C(!1),()=>{M.current=!1,z.current?.abort(),z.current=null}),[ce,N]);let ue=Q=>{Q.preventDefault(),b(null),$(null),ce(p.trim())},me=async Q=>{if(!(!(Q===null?H:X)||Q===(S?.sessionId??null))){$(null);try{let{binding:le}=await o({sessionId:Q,expectedSessionId:S?.sessionId??null});if(!M.current)return;if(k){l();return}d(ge=>ge&&{...ge,binding:le}),f(!1),b(null),y(""),$({text:le?"\u5DF2\u7ED1\u5B9A\u3002\u70B9\u51FB\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u540E\u5373\u53EF\u7EE7\u7EED\u8BE5\u4F1A\u8BDD\u3002":"\u5DF2\u89E3\u9664\uFF0C\u4E0B\u4E00\u6B21\u5F00\u59CB\u5BF9\u8BDD\u5C06\u4F7F\u7528\u9C7C\u5E94\u4F1A\u8BDD\u3002"}),N&&ce()}catch(le){if(!M.current)return;$({error:!0,text:typeof le?.message=="string"&&le.message?le.message.split(`
`)[0].slice(0,160):"\u4F1A\u8BDD\u7ED1\u5B9A\u672A\u786E\u8BA4\uFF0C\u8BF7\u6838\u5BF9\u5F53\u524D\u7ED1\u5B9A\u3002"}),b(null),N&&ce(P?p.trim():"")}}},q=(0,oe.jsxs)(oe.Fragment,{children:[x&&(0,oe.jsx)("p",{role:"status",className:h.hint,children:c("loadingVoiceTargets")}),B&&(0,oe.jsxs)("div",{role:"alert",className:h.notice,children:[c("voiceTargetListError")," ",(0,oe.jsx)(mn.Button,{variant:"outline",disabled:G,onClick:()=>{ce(p.trim())},children:c("retryVoiceTargets")})]})]}),T=E&&(0,oe.jsx)("p",{role:E.error?"alert":"status",className:E.error?h.notice:h.hint,children:E.text});return(0,oe.jsxs)("section",{id:a,className:k?h.homeTargetPicker:h.section,"data-whale-existing-session":!0,"aria-label":k?c("chooseVoiceTarget"):void 0,"data-no-drag":k||void 0,children:[!k&&(0,oe.jsxs)(oe.Fragment,{children:[(0,oe.jsx)("h3",{children:"\u8BED\u97F3\u5BF9\u8BDD\u76EE\u6807"}),(0,oe.jsxs)("div",{className:h.existingSessionTarget,children:[(0,oe.jsx)("strong",{className:h.sessionTitle,children:S?It(S):"\u9C7C\u5E94\u4F1A\u8BDD"}),(0,oe.jsx)("p",{className:h.hint,children:S?"\u8BED\u97F3\u548C\u56DE\u7B54\u5199\u5165\u6B64\u4F1A\u8BDD\uFF0C\u9C7C\u5E94\u4EC5\u5728\u672C\u673A\u64AD\u62A5\u3002\u5176\u4ED6\u63D2\u4EF6\u7684\u8F6C\u53D1\u7531\u5176\u8BBE\u7F6E\u51B3\u5B9A\u3002":"\u53EF\u7ED1\u5B9A\u5DF2\u6709 DSH \u4F1A\u8BDD\uFF0C\u6CBF\u7528\u539F\u6765\u7684\u4E0A\u4E0B\u6587\u548C\u5386\u53F2\u3002"}),S&&cr(S)&&(0,oe.jsxs)("p",{role:"status",className:h.notice,children:[cr(S),"\u3002\u53EF\u89E3\u9664\u7ED1\u5B9A\u6216\u9009\u62E9\u5176\u4ED6\u4F1A\u8BDD\u3002"]}),!N&&(0,oe.jsx)("p",{role:"status",className:h.notice,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u4E0D\u652F\u6301\u7ED1\u5B9A\u5DF2\u6709\u4F1A\u8BDD\u3002"}),V?.enabled&&(0,oe.jsx)("p",{className:h.hint,children:"\u7ED3\u675F\u8BED\u97F3\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u7ED1\u5B9A\u3002"})]}),(0,oe.jsxs)("div",{className:h.actions,children:[(0,oe.jsx)(mn.Button,{variant:"outline","aria-expanded":P,disabled:!N||G,onClick:()=>{f(!P),b(null),y(""),P||ce()},children:P?"\u5173\u95ED\u4F1A\u8BDD\u5217\u8868":S?"\u66F4\u6362\u7ED1\u5B9A":"\u9009\u62E9\u5DF2\u6709\u4F1A\u8BDD"}),Bn(S)&&r&&(0,oe.jsx)(mn.Button,{variant:"outline","data-whale-operation":"open-native-session",onClick:async()=>{$(null);try{await r(S.sessionId),await i?.()}catch{M.current&&$({error:!0,text:"DSH \u6682\u65F6\u65E0\u6CD5\u6253\u5F00\u539F\u4F1A\u8BDD\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"})}},children:"\u6253\u5F00\u539F\u4F1A\u8BDD"}),S&&(0,oe.jsx)(mn.Button,{variant:"outline","data-whale-operation":"unbind-existing-session",disabled:!H,onClick:()=>{me(null)},children:"\u89E3\u9664\u7ED1\u5B9A"})]})]}),P&&(0,oe.jsxs)("div",{className:h.existingSessionPicker,"aria-busy":x,children:[(0,oe.jsxs)("form",{className:h.existingSessionSearch,onSubmit:ue,children:[(0,oe.jsx)(mn.Input,{type:"search","aria-label":c("searchVoiceTargets"),placeholder:c("searchVoiceTargets"),value:p,maxLength:128,disabled:G,onChange:Q=>y(Q.target.value)}),(0,oe.jsx)(mn.Button,{type:"submit",variant:"outline",disabled:G,children:c("searchVoiceTargetsAction")})]}),u?.items.length>0&&(0,oe.jsx)("ul",{className:h.existingSessionList,"aria-label":c("existingVoiceTargetList"),children:u.items.map(Q=>{let le=S?.sessionId===Q.sessionId,ge=le||!Bn(Q),$e=(0,oe.jsxs)("span",{className:h.hint,children:[le?c("boundVoiceTarget")+" \xB7 ":"",c("voiceTargetAvailability_"+(Q.unavailableReason??Q.availability))," \xB7 ",Q.sessionId]});return(0,oe.jsx)("li",{children:k?(0,oe.jsxs)(mn.Button,{variant:"ghost",className:h.homeTargetRow,"data-whale-operation":"bind-existing-session",title:Q.sessionId,"aria-current":le||void 0,"aria-disabled":!X,disabled:ge,onClick:()=>{me(Q.sessionId)},children:[(0,oe.jsx)("strong",{className:h.sessionTitle,children:It(Q)}),$e]}):(0,oe.jsxs)("label",{title:Q.sessionId,children:[(0,oe.jsx)("input",{type:"radio",name:A,value:Q.sessionId,checked:v===Q.sessionId,disabled:ge||x||G,onChange:()=>{b(Q.sessionId),$(null)}}),(0,oe.jsxs)("span",{children:[(0,oe.jsx)("strong",{className:h.sessionTitle,children:It(Q)}),$e]})]})},Q.sessionId)})}),q,!x&&!B&&u?.items.length===0&&(0,oe.jsx)("p",{role:"status",className:h.hint,children:c(u.query?"voiceTargetNoMatch":"voiceTargetEmptyList")}),L&&(0,oe.jsx)("p",{id:A+"-tts",className:h.hint,children:c("voiceTargetSynthesisNotice")}),T,(!k||u?.nextCursor||S)&&(0,oe.jsxs)("div",{className:h.actions,children:[!k&&(0,oe.jsx)(mn.Button,{variant:"primary","data-whale-operation":"bind-existing-session","aria-describedby":L?A+"-tts":void 0,disabled:!X||!Bn(L)||L.sessionId===S?.sessionId,onClick:()=>{me(v)},children:c(G?"savingVoiceTarget":"bindVoiceTarget")}),!!u?.nextCursor&&(0,oe.jsx)(mn.Button,{variant:"outline",disabled:x||G,onClick:()=>{ce(u.query,u.nextCursor)},children:c("moreVoiceTargets")}),k&&S&&(0,oe.jsx)(mn.Button,{variant:"outline","data-whale-operation":"unbind-existing-session",disabled:!H,onClick:()=>{me(null)},children:c("backToFishVoice")})]})]}),!P&&(0,oe.jsxs)(oe.Fragment,{children:[q,T]})]})}var Et=require("react"),Nt=require("@deepseek-ai/dsh-client-ui-primitives");var pr="dsh-fish-voice";var Di={name:"Emikosama",url:"https://github.com/Emikosama"};var md="https://github.com/Emikosama/dsh-fish-voice",go={url:"https://github.com/Emikosama/dsh-fish-voice/issues"};var xe=require("react/jsx-runtime");function fd(e,n){let t=e.updates;return e.updatePending==="install"?n("update_installing"):e.updatePending==="check"?n("update_checking"):e.updatesUnavailable?n("updateConnection"):t?t.message||n("update_"+t.status):n("update_idle")}function hd({state:e,open:n,t}){let o=e.updates,r=!e.updatesUnavailable&&(o?.release||["restart-required","enable-required","installed"].includes(o?.status));return(0,xe.jsxs)("section",{className:h.section,"data-whale-update-settings":!0,children:[(0,xe.jsx)("h3",{children:t("updateTitle")}),o&&(0,xe.jsxs)("p",{className:h.hint,children:[t("updateCurrentVersion")," ",o.currentVersion," \xB7 ",t("updateChannel_"+o.channel)]}),(0,xe.jsx)("p",{children:fd(e,t)}),(0,xe.jsxs)("div",{className:h.actions,children:[r&&(0,xe.jsx)(Nt.Button,{variant:"outline",onClick:()=>n(!1),children:t("updateDetails")}),(0,xe.jsx)(Nt.Button,{variant:"outline",disabled:!!e.updatePending||!e.updatesUnavailable&&o?.status==="installing",onClick:()=>n(!0),children:t("updateCheck")}),(0,xe.jsx)("a",{href:go.url,"data-whale-operation":"open-feedback",target:"_blank",rel:"noreferrer noopener",children:t("updateFeedback")})]})]})}function gd({state:e,close:n,run:t,t:o}){let r=(0,Et.useRef)(null),i=(0,Et.useId)();(0,Et.useLayoutEffect)(()=>{let p=r.current;return typeof p.showModal=="function"?p.showModal():p.setAttribute("open",""),()=>{p.open&&p.close?.()}},[]);let a=e.updates,l=a?.release,c=!!e.updatePending||!e.updatesUnavailable&&["checking","installing"].includes(a?.status),u=!e.updatesUnavailable&&!c&&a?.canInstall&&l,d=!c&&(e.updatesUnavailable||!["restart-required","enable-required"].includes(a?.status)),m=!e.updatesUnavailable&&["available","incompatible"].includes(a?.status),f=u&&!a.message?null:fd(e,o);return(0,xe.jsxs)("dialog",{ref:r,className:h.updateDialog,"data-whale-update-dialog":!0,"data-no-drag":!0,"aria-labelledby":i,onCancel:p=>{p.preventDefault(),n()},onKeyDown:p=>p.stopPropagation(),children:[(0,xe.jsxs)("header",{className:h.updateHeader,children:[(0,xe.jsx)(Yn,{}),(0,xe.jsx)("h2",{id:i,children:o(m?"updateOfferTitle":"updateTitle")})]}),a&&(0,xe.jsxs)("p",{className:h.hint,children:[o("updateCurrentVersion")," ",a.currentVersion,l&&l.version!==a.currentVersion&&(0,xe.jsxs)(xe.Fragment,{children:[" \xB7 ",o("updateNewVersion")," ",l.version]})," \xB7 ",o("updateChannel_"+a.channel)]}),l?.announcement&&(0,xe.jsx)("p",{className:h.updateAnnouncement,children:l.announcement}),f&&(0,xe.jsx)("p",{className:h.hint,role:"status",children:f}),(0,xe.jsxs)("div",{className:h.actions,children:[(0,xe.jsx)(Nt.Button,{variant:"outline",onClick:n,children:o(m?"updateLater":"close")}),u&&(0,xe.jsx)(Nt.Button,{variant:"primary",className:h.primary,onClick:()=>{t({action:"install",version:l.version})},children:o("updateInstall")}),!u&&d&&(0,xe.jsx)(Nt.Button,{variant:"outline",onClick:()=>{t({action:"check"})},children:o("updateCheck")})]}),(0,xe.jsxs)("footer",{className:h.actions,children:[l?.url?.startsWith("https://")&&(0,xe.jsx)("a",{href:l.url,target:"_blank",rel:"noreferrer noopener",children:o("updateRelease")}),(0,xe.jsx)("a",{href:go.url,"data-whale-operation":"open-feedback",target:"_blank",rel:"noreferrer noopener",children:o("updateFeedback")})]})]})}var Ph=new Map([["audio","settings-audio"],["interaction","settings-interaction"],["prompt","settings-prompt"],["models","settings-models"],["advanced","settings-advanced"],["pets","settings-pets"],["sessions","page-session-management"]]);function Ih(e){if(e.nativeEvent?.isTrusted!==!0)return null;let n=e.target;if(!n?.closest)return null;let t=n.closest("[data-whale-operation-log]");return t&&!(e.type==="click"&&n.closest("summary")?.parentElement===t)?null:n}function vd(e){let n=Ih(e);if(!n)return null;if(e.type==="submit")return"commit-form";if(e.type==="keydown")return e.key==="Escape"?"dismiss":["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key)&&n.closest('[data-settings-nav], [role="listbox"]')?"keyboard-navigation":null;if(e.type==="change")return n.matches('input[type="radio"]')&&["listen-mode-ptt","listen-mode-always","listen-mode-wake"].includes(n.dataset.whaleOperation)?n.dataset.whaleOperation:n.closest("[data-audio-device-controls] select")?"change-audio-device":n.matches('select, input[type="radio"], input[type="checkbox"]')?"edit-choice":null;if(e.type!=="click")return null;let t=n.closest("button, a[href], summary");if(!t||t.type==="submit"&&t.form)return null;let o=t.dataset.whaleOperation;return o==="open-feedback"&&t.matches("summary")&&t.parentElement.open?"dismiss":t.matches("summary")&&["session-history","subagent-history"].includes(o)?o+(t.parentElement.open?"-close":"-open"):o||(t.hasAttribute("data-settings-tab")?Ph.get(t.dataset.settingsTab)??"page-settings-tab":t.closest("[data-whale-session-management], [data-whale-existing-session]")?"manage-session":t.closest("[data-settings-page-heading] nav")?"page-model-tab":t.matches("summary")?"details-toggle":"activate-control")}var Fn=require("react"),Vi=require("@deepseek-ai/dsh-client-ui-primitives");var Xe=require("react/jsx-runtime"),Nh="fish-voice-operation-log.log",bd=256*1024,Eh=(e,n)=>(e+n).slice(-bd);function yd({readOperationLog:e}){let[n,t]=(0,Fn.useState)(!1),[o,r]=(0,Fn.useState)(!1),[i,a]=(0,Fn.useState)(null),[l,c]=(0,Fn.useState)(null),u=(0,Fn.useRef)(null);if((0,Fn.useEffect)(()=>()=>u.current?.abort(),[]),!e)return null;let d=async f=>{if(u.current)return;let p=new AbortController;u.current=p,r(!0),c(null);try{let y=await e(p.signal);if(p.signal.aborted)return;if(f){let v=URL.createObjectURL(new Blob(y,{type:"text/plain;charset=utf-8"})),b=document.createElement("a");b.href=v,b.download=Nh,Th(b),setTimeout(()=>URL.revokeObjectURL(v),1e3),c("\u5DF2\u8BF7\u6C42\u4FDD\u5B58\u8BCA\u65AD\u65E5\u5FD7\u3002")}else a({text:y.reduce(Eh,""),shortened:y.reduce((v,b)=>v+b.length,0)>bd})}catch{p.signal.aborted||c("\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u8BCA\u65AD\u65E5\u5FD7\uFF0C\u8BF7\u91CD\u8BD5\u3002")}finally{u.current===p&&(u.current=null),p.signal.aborted||r(!1)}},m=f=>{let p=f.currentTarget.open;t(p),p||(u.current?.abort(),u.current=null,r(!1),a(null),c(null))};return(0,Xe.jsxs)("details",{className:h.section,"data-whale-operation-log":!0,open:n,onToggle:m,children:[(0,Xe.jsx)("summary",{"data-whale-operation":"open-feedback",children:"\u6392\u67E5\u4E0E\u53CD\u9988"}),n&&(0,Xe.jsxs)(Xe.Fragment,{children:[(0,Xe.jsx)("p",{className:h.hint,children:"\u6700\u8FD1\u4E03\u5929\u7684\u64CD\u4F5C\u65E5\u5FD7\u3002\u53EF\u5148\u67E5\u770B\uFF0C\u518D\u81EA\u884C\u51B3\u5B9A\u662F\u5426\u968F\u53CD\u9988\u63D0\u4EA4\u3002"}),(0,Xe.jsxs)("div",{className:h.actions,children:[(0,Xe.jsx)(Vi.Button,{variant:"outline",disabled:o,onClick:()=>{d(!1)},children:"\u67E5\u770B\u8BCA\u65AD\u65E5\u5FD7"}),(0,Xe.jsx)(Vi.Button,{variant:"outline",disabled:o,onClick:()=>{d(!0)},children:"\u4FDD\u5B58\u8BCA\u65AD\u65E5\u5FD7"}),(0,Xe.jsx)("a",{href:go.url+"/new",target:"_blank",rel:"noreferrer noopener",children:"\u63D0\u4EA4\u53CD\u9988"})]}),o&&(0,Xe.jsx)("p",{role:"status",className:h.hint,children:"\u6B63\u5728\u8BFB\u53D6\u8BCA\u65AD\u65E5\u5FD7\u2026"}),l&&(0,Xe.jsx)("p",{role:"status",className:h.hint,children:l}),i?.shortened&&(0,Xe.jsx)("p",{className:h.hint,children:"\u8FD9\u91CC\u53EA\u663E\u793A\u6700\u8FD1\u4E00\u6BB5\uFF0C\u4FDD\u5B58\u53EF\u53D6\u5F97\u5B8C\u6574\u65E5\u5FD7\u3002"}),i&&(0,Xe.jsx)("pre",{className:h.requestDetails,tabIndex:0,"aria-label":"\u64CD\u4F5C\u65E5\u5FD7\u9884\u89C8",children:i.text||"\u6682\u65E0\u64CD\u4F5C\u65E5\u5FD7\u3002"})]})]})}function Th(e){document.body.append(e);try{e.click()}finally{e.remove()}}var R=require("react"),K=require("@deepseek-ai/dsh-client-ui-primitives");var he=require("react"),pe=require("@deepseek-ai/dsh-client-ui-primitives");var F={job:"MIAVoG_job",plan:"MIAVoG_plan",section:"MIAVoG_section",switcher:"MIAVoG_switcher",jobHeading:"MIAVoG_jobHeading",wizardBody:"MIAVoG_wizardBody",actions:"MIAVoG_actions",modelChoices:"MIAVoG_modelChoices",details:"MIAVoG_details",consentActions:"MIAVoG_consentActions",fullName:"MIAVoG_fullName",primary:"MIAVoG_primary",field:"MIAVoG_field",note:"MIAVoG_note",currentModel:"MIAVoG_currentModel",inlineField:"MIAVoG_inlineField",hint:"MIAVoG_hint",jobs:"MIAVoG_jobs",modelInstaller:"MIAVoG_modelInstaller",wizard:"MIAVoG_wizard",header:"MIAVoG_header",setupEnter:"MIAVoG_setupEnter",hardwareSummary:"MIAVoG_hardwareSummary",choice:"MIAVoG_choice",installPath:"MIAVoG_installPath",sourceChoices:"MIAVoG_sourceChoices",selectedModel:"MIAVoG_selectedModel",installHistory:"MIAVoG_installHistory",switchRow:"MIAVoG_switchRow",choices:"MIAVoG_choices",wizardBodyContent:"MIAVoG_wizardBodyContent",badge:"MIAVoG_badge",text:`.MIAVoG_section {
  min-width: 0;
  color: var(--dsw-alias-label-primary);
  gap: 8px;
  display: grid;
}

.MIAVoG_section h3, .MIAVoG_wizard h2, .MIAVoG_plan h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
}

.MIAVoG_section p, .MIAVoG_wizard p {
  margin: 0;
  line-height: 1.6;
}

.MIAVoG_hint, .MIAVoG_section small, .MIAVoG_wizard small {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 1.6;
}

.MIAVoG_note {
  border-left: 2px solid var(--dsw-alias-state-warn-primary);
  background: var(--dsw-alias-bg-layer-2);
  padding: 8px 12px;
  font-size: 12px;
}

.MIAVoG_actions, .MIAVoG_header {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  display: flex;
}

.MIAVoG_header {
  justify-content: space-between;
  align-items: flex-start;
}

.MIAVoG_choices {
  border: 0;
  gap: 8px;
  min-width: 0;
  margin: 0;
  padding: 0;
  display: grid;
}

.MIAVoG_choices legend {
  color: var(--dsw-alias-label-secondary);
  padding: 0 0 8px;
  font-size: 12px;
}

.MIAVoG_choice {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  cursor: pointer;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 10px;
  display: flex;
}

.MIAVoG_choice[data-selected="true"] {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,var(--dsw-alias-bg-layer-1));
}

.MIAVoG_choice input {
  accent-color: var(--dsw-alias-brand-primary);
  margin: 4px 0 0;
}

.MIAVoG_choice span {
  min-width: 0;
}

.MIAVoG_choice small, .MIAVoG_plan small {
  overflow-wrap: anywhere;
  display: block;
}

.MIAVoG_choice strong {
  font-size: 13px;
}

.MIAVoG_field {
  gap: 6px;
  font-size: 12px;
  display: grid;
}

.MIAVoG_field input, .MIAVoG_field select {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}

.MIAVoG_field select {
  font: inherit;
  color: inherit;
  background: var(--dsw-alias-bg-layer-2);
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  padding: 8px;
}

.MIAVoG_details {
  border-top: 1px solid var(--dsw-alias-border-l2);
  min-width: 0;
  padding-top: 12px;
}

.MIAVoG_details summary {
  cursor: pointer;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

.MIAVoG_details[open] > summary {
  margin-bottom: 12px;
}

.MIAVoG_badge {
  border-radius: var(--dsw-radius-sm);
  color: var(--dsw-alias-label-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,var(--dsw-alias-bg-layer-1));
  margin-left: 8px;
  padding: 2px 6px;
  font-size: 11px;
}

.MIAVoG_plan, .MIAVoG_job {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  gap: 10px;
  min-width: 0;
  padding: 12px;
  display: grid;
}

.MIAVoG_plan dl {
  grid-template-columns: auto minmax(0, 1fr);
  gap: 6px 12px;
  margin: 0;
  font-size: 12px;
  display: grid;
}

.MIAVoG_plan dt {
  color: var(--dsw-alias-label-secondary);
}

.MIAVoG_plan dd {
  overflow-wrap: anywhere;
  margin: 0;
}

.MIAVoG_plan a {
  color: var(--dsw-alias-link);
  overflow-wrap: anywhere;
  font-size: 12px;
}

.MIAVoG_plan ul {
  margin: 0;
  padding-left: 16px;
  font-size: 12px;
}

.MIAVoG_jobs {
  gap: 12px;
  display: grid;
}

.MIAVoG_job progress {
  width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
}

.MIAVoG_wizard {
  box-sizing: border-box;
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-layer-1);
  border-radius: var(--dsw-radius-lg);
}

.MIAVoG_section button, .MIAVoG_wizard button {
  transition: transform var(--ds-transition-duration-fast, .1s) var(--whale-ease, ease-out);
}

.MIAVoG_section button:active:not(:disabled), .MIAVoG_wizard button:active:not(:disabled) {
  transform: scale(.97);
}

.MIAVoG_section :is(button, input, select, a, summary):focus-visible, .MIAVoG_wizard :is(button, summary):focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

[data-motion="firm"] .MIAVoG_wizard {
  --whale-duration: var(--ds-transition-duration-fast, .1s);
  --whale-ease: ease-out;
}

[data-motion="off"] .MIAVoG_wizard, [data-motion="off"] .MIAVoG_wizard *, [data-motion="off"] .MIAVoG_section * {
  transition: none !important;
  animation: none !important;
  transform: none !important;
}

@keyframes MIAVoG_setupEnter {
  from {
    translate: 0 4px;
  }

  to {
    translate: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .MIAVoG_wizard, .MIAVoG_wizard *, .MIAVoG_section * {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
}

@media (width <= 520px) {
  .MIAVoG_wizard {
    padding: 12px;
  }

  .MIAVoG_plan dl {
    grid-template-columns: minmax(0, 1fr);
    gap: 3px;
  }

  .MIAVoG_plan dd {
    margin-bottom: 6px;
  }
}

@media (forced-colors: active) {
  .MIAVoG_choice[data-selected="true"] {
    outline: 2px solid highlight;
  }
}

.MIAVoG_wizard {
  width: 100%;
  max-width: none;
  max-height: min(var(--whale-content-limit, 60vh),var(--whale-visible-content, 60vh));
  box-shadow: none;
  border: 0;
  flex-direction: column;
  gap: 12px;
  padding: 8px;
  display: flex;
  overflow: hidden;
}

.MIAVoG_wizard > .MIAVoG_header, .MIAVoG_wizard > footer {
  flex-shrink: 0;
}

.MIAVoG_wizardBody {
  overscroll-behavior: contain;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.MIAVoG_wizardBodyContent {
  align-content: start;
  gap: 12px;
  display: grid;
}

.MIAVoG_primary {
  color: var(--dsw-alias-label-primary) !important;
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 16%,var(--dsw-alias-bg-layer-2)) !important;
  border: 1px solid var(--dsw-alias-border-l2) !important;
}

.MIAVoG_primary:disabled {
  opacity: .5;
}

.MIAVoG_choices {
  gap: 6px;
}

.MIAVoG_choice {
  box-sizing: border-box;
  align-items: center;
  min-height: 38px;
}

.MIAVoG_choice input {
  flex: none;
  margin: 0;
}

.MIAVoG_choice strong {
  display: block;
}

.MIAVoG_choice:has(input:disabled) {
  cursor: default;
  opacity: .65;
}

.MIAVoG_note p {
  margin: 0;
}

.MIAVoG_note button {
  margin-top: 8px;
}

.MIAVoG_wizard > footer {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

.MIAVoG_wizardBody {
  padding: 2px 4px 8px 0;
}

.MIAVoG_section > button, .MIAVoG_wizardBody > button {
  justify-self: start;
  max-width: 100%;
}

.MIAVoG_section button, .MIAVoG_wizard button {
  white-space: normal;
  max-width: 100%;
  height: auto;
  min-height: 36px;
}

.MIAVoG_actions > button {
  flex: 0 auto;
}

.MIAVoG_sourceChoices {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.MIAVoG_sourceChoices legend {
  grid-column: 1 / -1;
}

.MIAVoG_inlineField {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-width: 0;
  font-size: 12px;
  display: flex;
}

.MIAVoG_inlineField select {
  text-overflow: ellipsis;
  width: 180px;
  min-width: 0;
  max-width: 100%;
  font: inherit;
  color: inherit;
  background: var(--dsw-alias-bg-layer-2);
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  padding: 8px;
}

.MIAVoG_inlineField input[type="number"] {
  width: 80px;
  min-width: 0;
}

.MIAVoG_field:has( > input[type="number"]) {
  flex-wrap: wrap;
  align-items: center;
  display: flex;
}

.MIAVoG_field > input[type="number"] {
  width: 80px;
}

.MIAVoG_details > summary {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  box-sizing: content-box;
  width: fit-content;
  max-width: 100%;
  min-height: 20px;
  padding: 7px 10px;
}

.MIAVoG_fullName {
  min-width: 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

.MIAVoG_fullName summary {
  cursor: pointer;
}

.MIAVoG_fullName p {
  overflow-wrap: anywhere;
}

.MIAVoG_consentActions {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  display: flex;
}

@container (width <= 360px) {
  .MIAVoG_sourceChoices {
    grid-template-columns: minmax(0, 1fr);
  }

  .MIAVoG_inlineField select {
    width: 150px;
  }
}

@media (width <= 420px) {
  .MIAVoG_wizard .MIAVoG_sourceChoices {
    grid-template-columns: minmax(0, 1fr);
  }
}

.MIAVoG_modelChoices {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.MIAVoG_modelChoices > legend {
  grid-column: 1 / -1;
  padding-bottom: 5px;
}

.MIAVoG_modelChoices .MIAVoG_choice {
  gap: 7px;
  min-height: 80px;
  padding: 8px;
}

.MIAVoG_modelChoices .MIAVoG_choice strong {
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  display: flex;
}

.MIAVoG_modelChoices .MIAVoG_badge {
  white-space: nowrap;
  margin-left: 0;
}

.MIAVoG_hardwareSummary {
  color: var(--dsw-alias-label-secondary);
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 2px 10px;
  font-size: 11px;
  display: flex;
}

.MIAVoG_hardwareSummary small {
  font-size: 10px;
}

.MIAVoG_currentModel, .MIAVoG_switchRow, .MIAVoG_jobHeading {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.MIAVoG_currentModel {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  padding: 7px 8px;
  font-size: 12px;
}

.MIAVoG_currentModel > span, .MIAVoG_switchRow > span {
  overflow-wrap: anywhere;
  min-width: 0;
}

.MIAVoG_currentModel button, .MIAVoG_switchRow button {
  flex: none;
  min-height: 30px;
  padding: 0 9px;
}

.MIAVoG_switcher {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  gap: 7px;
  padding: 8px;
  display: grid;
}

.MIAVoG_switchRow small {
  display: block;
}

.MIAVoG_selectedModel {
  border-top: 1px solid var(--dsw-alias-border-l2);
  gap: 7px;
  padding-top: 6px;
  display: grid;
}

.MIAVoG_selectedModel .MIAVoG_details {
  padding-top: 4px;
}

.MIAVoG_selectedModel .MIAVoG_details summary {
  border: 0;
  padding: 3px 0;
}

.MIAVoG_installHistory {
  border-top: 1px solid var(--dsw-alias-border-l2);
}

.MIAVoG_installHistory > summary {
  cursor: pointer;
  padding: 8px 0;
  font-size: 12px;
  display: list-item;
}

.MIAVoG_installHistory > summary small {
  margin-left: 12px;
}

.MIAVoG_installHistory .MIAVoG_job {
  gap: 6px;
  padding: 9px;
}

.MIAVoG_jobHeading {
  flex-wrap: wrap;
}

.MIAVoG_installPath {
  min-width: 0;
  font-size: 11px;
}

.MIAVoG_installPath summary {
  cursor: pointer;
  color: var(--dsw-alias-label-secondary);
}

.MIAVoG_installPath p {
  overflow-wrap: anywhere;
}

.MIAVoG_modelInstaller .MIAVoG_jobs:empty {
  display: none;
}

@container (width <= 300px) {
  .MIAVoG_modelChoices {
    grid-template-columns: minmax(0, 1fr);
  }

  .MIAVoG_currentModel {
    flex-wrap: wrap;
  }
}

.MIAVoG_section[aria-label="\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84"] p {
  overflow-wrap: anywhere;
}

.MIAVoG_choice {
  transition: background-color .12s ease-out, border-color .12s ease-out, box-shadow .12s ease-out;
}

.MIAVoG_choice:hover:has(input:not(:disabled)) {
  border-color: var(--dsw-alias-brand-primary);
}

.MIAVoG_choice:has(input:focus-visible) {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: 2px;
}

.MIAVoG_section :is(button, select, input, summary), .MIAVoG_wizard :is(button, select, input, summary) {
  transition: background-color .12s ease-out,border-color .12s ease-out,color .12s ease-out,transform var(--whale-duration, .2s) var(--whale-ease, ease-out);
}

.MIAVoG_section button:hover:not(:disabled), .MIAVoG_wizard button:hover:not(:disabled) {
  background-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,var(--dsw-alias-bg-layer-1));
}

.MIAVoG_plan, .MIAVoG_switcher, .MIAVoG_selectedModel, .MIAVoG_section [data-whale-save-result], .MIAVoG_wizardBodyContent > section {
  animation: MIAVoG_setupEnter var(--whale-duration, .2s) ease-out;
}

[data-motion="firm"] :is(.MIAVoG_section, .MIAVoG_wizard) {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="off"] :is(.MIAVoG_section, .MIAVoG_wizard), [data-motion="off"] :is(.MIAVoG_section, .MIAVoG_wizard) *, [data-motion="off"] :is(.MIAVoG_section, .MIAVoG_wizard) :before {
  transition: none !important;
  animation: none !important;
}

[data-motion="off"] :is(.MIAVoG_section, .MIAVoG_wizard) button:active {
  transform: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .MIAVoG_section, .MIAVoG_wizard, .MIAVoG_section *, .MIAVoG_wizard *, .MIAVoG_section :before, .MIAVoG_wizard :before {
    transition: none !important;
    animation: none !important;
  }

  .MIAVoG_section button:active, .MIAVoG_wizard button:active {
    transform: none !important;
  }
}
`};var g=require("react/jsx-runtime"),_d=[["deepseek","DeepSeek \u8BED\u97F3\u5408\u6210","\u5B98\u65B9 API \xB7 \u9ED8\u8BA4\u97F3\u8272\u6D77\u661F"],["local","\u672C\u5730\u8BED\u97F3\u6A21\u578B","\u5728\u672C\u673A\u5408\u6210\uFF0C\u9996\u6B21\u9700\u8981\u4E0B\u8F7D"],["off","\u4E0D\u53D1\u58F0","\u53EA\u663E\u793A\u6587\u5B57"]],wd={deepseek:"DeepSeek \u8BED\u97F3\u5408\u6210",local:"\u672C\u5730\u8BED\u97F3\u6A21\u578B"},mr={provider:"deepseek",deepseekVoice:"stella",deepseekTextTransmissionAccepted:!1,volume:.8,localModelId:null,localModelPath:null,referenceAudioPath:null},kd="\u8BF7\u5728 DSH \u7684 DeepSeek API Key \u63D0\u4F9B\u5546\u4E2D\u914D\u7F6E\u5F00\u653E\u5E73\u53F0\u5BC6\u94A5\uFF0C\u518D\u91CD\u65B0\u68C0\u67E5\u3002",Sd="\u6717\u8BFB\u548C\u8BD5\u542C\u4F1A\u5411 DeepSeek \u53D1\u9001\u5F85\u6717\u8BFB\u7684\u6587\u5B57\uFF0C\u6309\u5B57\u7B26\u7528\u91CF\u8BA1\u8D39\u3002",vo=e=>e.authorization?.scopes?.some(n=>n.id==="deepseek-text"&&n.allowed)===!0,Zi=e=>{let n={...e};return delete n.referenceAudioAccepted,n},zd=(e,n)=>({...Zi(e),referenceAudioAccepted:e.referenceAudioPath===n?.referenceAudioPath&&n?.referenceAudioAccepted===!0}),Ad=F.text,Mh=e=>({"restart-requires-resume":"\u5BBF\u4E3B\u5DF2\u91CD\u542F\uFF0C\u8BF7\u7EE7\u7EED\u540E\u91CD\u65B0\u6838\u9A8C\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u8986\u76D6\u8BBE\u7F6E\u3002","authorization-changed":"\u6388\u6743\u5DF2\u6539\u53D8\uFF0C\u8BF7\u5728\u6743\u9650\u4E2D\u6838\u67E5\u540E\u7EE7\u7EED\u3002",MODEL_SOURCE_AUTHORIZATION_REQUIRED:"\u6A21\u578B\u6765\u6E90\u6388\u6743\u5DF2\u53D8\u5316\uFF0C\u8BF7\u8865\u5145\u4E00\u6B21\u6388\u6743\u540E\u7EE7\u7EED\u3002",HUMAN_SETTING_PINNED:"\u8BBE\u7F6E\u6743\u9650\u5DF2\u64A4\u9500\uFF0C\u8BF7\u5728\u6743\u9650\u4E2D\u6838\u67E5\u540E\u7EE7\u7EED\u3002"})[e]??(typeof e=="string"&&/^[A-Z_:-]+$/.test(e)?"\u8FD0\u884C\u68C0\u67E5\u672A\u901A\u8FC7\uFF0C\u8BF7\u68C0\u67E5\u4F9D\u8D56\u6216\u67E5\u770B\u9AD8\u7EA7\u8BBE\u7F6E\u4E2D\u7684\u9519\u8BEF\u3002":e),vn=e=>Number.isFinite(e)&&e>=0?`${(e/1024**2).toFixed(1)} MiB`:"\u672A\u77E5";function Cd(e,n){let t=e.status;return!!(e.checkedFor===n&&e.settingsFor===n&&e.settings?.revision&&!e.ttsCancelling&&!e.ttsUncertain&&!e.uncertain&&!e.settingsConflict&&t?.enabled===!1&&t?.ownerSessionId===null&&t?.voiceControlBusy===!1&&t?.voiceSession?.fullyStopped===!0&&t?.voiceSession?.id===null&&!t?.ttsRuntime?.busy&&!t?.ttsRuntime?.blocked)}function st(e,n){return!e.busy&&Cd(e,n)}function Tt(e,n){let t=(0,he.useRef)(!1),[o,r]=(0,he.useState)(!1),[i,a]=(0,he.useState)(null),[l,c]=(0,he.useState)(0);return[async(d,m)=>{if(t.current)return!1;t.current=!0,r(!0),a(d);try{return await e(n,d,m)}catch{return!1}finally{t.current=!1,r(!1),a(null),c(f=>f+1)}},o,i,{isLocked:()=>t.current,settled:l}]}function Pd({state:e,sessionId:n,run:t}){if(Cd(e,n))return null;let o=e.checkedFor===n&&(e.status?.enabled||e.status?.ownerSessionId);return(0,g.jsxs)("div",{className:F.note,role:"status",children:[(0,g.jsx)("p",{children:e.busy?"\u6B63\u5728\u8BFB\u53D6\u6216\u4FDD\u5B58\uFF0C\u8BF7\u7A0D\u5019\u2026":o?"\u8BF7\u5148\u505C\u6B62\u8BED\u97F3\uFF0C\u518D\u7F16\u8F91\u6216\u8BD5\u542C\u3002":e.ttsUncertain||e.uncertain?"\u6B63\u5728\u6838\u67E5\u4E0A\u6B21\u64CD\u4F5C\u3002":"\u6B63\u5728\u51C6\u5907\u8BBE\u7F6E\u2026"}),o&&n&&t&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:e.busy&&(!e.interruptibleRead||e.diagnosticStopPending)||e.ttsCancelling,onClick:()=>{t(n,"disable")},children:"\u505C\u6B62\u8BED\u97F3\u4EE5\u7F16\u8F91"})]})}function Id(e){let n=e.state.settingsFor===e.sessionId?e.state.settings:null;return(0,g.jsx)($h,{...e,settings:n},`${e.sessionId}:${e.state.settingsKey??n?.revision??"unread"}`)}function Nd({value:e,disabled:n,onChange:t}){return(0,g.jsxs)("label",{className:F.inlineField,children:["DeepSeek \u97F3\u8272",(0,g.jsxs)("select",{"aria-label":"DeepSeek \u97F3\u8272",value:e,disabled:n,onChange:o=>t(o.target.value),children:[(0,g.jsx)("option",{value:"stella",children:"\u6D77\u661F \xB7 \u5973\u58F0"}),(0,g.jsx)("option",{value:"tide",children:"\u6697\u6F6E \xB7 \u7537\u58F0"})]})]})}function $h({state:e,sessionId:n,run:t,settings:o,prepared:r=!1,active:i=!0,markSettingsEdited:a,pickPath:l}){let[c,u]=(0,he.useState)(()=>({...mr,...o?.ttsSetup})),[d,m,f]=Tt(t,n),p=(0,he.useId)(),[y,v]=(0,he.useState)(!1),b=e.ttsCapabilitiesFor===n?e.ttsCapabilities:null,x=e.checkedFor===n?e.status?.ttsRuntime:null,C=e.ttsPreviewFor===n?e.ttsPreview:null,B=e.installerFor===n?e.installer?.jobs?.find(I=>hr(I,o)):null,D=!st(e,n)||m,E=JSON.stringify(c)!==JSON.stringify({...mr,...o?.ttsSetup}),$=c.provider==="deepseek",z=$&&(e.authorizationUncertain||c.deepseekTextTransmissionAccepted&&!e.authorization),M=$&&!z&&!(c.deepseekTextTransmissionAccepted&&vo(e)),A=$&&b?.deepseekKeyAvailable!==!0,k=I=>{a?.("save-tts"),u(G=>({...G,...I}))},P=c.localModelId==="qwen3-tts-base-1.7b-gguf",V=Number(c.volume),S=!A&&!z&&(c.provider!=="local"||!!(c.localModelId&&c.localModelPath)&&(!c.referenceAudioPath||P))&&c.volume!==""&&Number.isFinite(V)&&V>=0&&V<=1,N={...c,volume:V,deepseekTextTransmissionAccepted:$||c.deepseekTextTransmissionAccepted};return(0,g.jsxs)("section",{className:F.section,"aria-label":"\u6717\u8BFB\u8BBE\u7F6E","data-settings-draft":"save-tts",children:[(0,g.jsx)("header",{children:(0,g.jsx)("h3",{children:"\u56DE\u7B54\u600E\u4E48\u53D1\u58F0"})}),(!r||n&&!(e.checkedFor===n&&(e.status?.enabled||e.status?.ownerSessionId)))&&(0,g.jsx)(Pd,{state:e,sessionId:n,run:t}),!$&&(!r||!o||!b||e.uncertain||e.ttsUncertain)&&(0,g.jsx)("div",{className:F.actions,children:(0,g.jsx)(pe.Button,{variant:"outline",disabled:e.busy||m,onClick:()=>d("inspect-tts"),children:"\u68C0\u6D4B\u672C\u673A\u8BED\u97F3"})}),(0,g.jsxs)("fieldset",{className:`${F.choices} ${F.sourceChoices}`,disabled:D||!o,children:[(0,g.jsx)("legend",{children:"\u6717\u8BFB\u6765\u6E90"}),_d.map(([I,G,L])=>(0,g.jsxs)("label",{className:F.choice,"data-selected":c.provider===I,children:[(0,g.jsx)("input",{type:"radio",name:p,checked:c.provider===I,onChange:()=>k({provider:I})}),(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:G}),(0,g.jsx)("small",{children:L})]})]},I))]}),$&&(0,g.jsxs)("div",{className:F.section,children:[(0,g.jsx)("p",{className:F.hint,children:Sd}),z&&(0,g.jsx)("p",{role:"status",className:F.hint,children:"\u6B63\u5728\u8BFB\u53D6 DeepSeek \u6717\u8BFB\u6388\u6743\u2026"}),M&&(0,g.jsx)("p",{className:F.hint,children:"\u542F\u7528\u524D\uFF0C\u56DE\u7B54\u53EA\u663E\u793A\u6587\u5B57\u3002\u8BD5\u542C\u53EA\u53D1\u9001\u56FA\u5B9A\u793A\u4F8B\u3002"}),A&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("p",{role:"status",className:F.hint,children:kd}),(0,g.jsx)(pe.Button,{variant:"outline",disabled:e.busy||m,onClick:()=>d("inspect-tts"),children:b?"\u91CD\u65B0\u68C0\u67E5 DeepSeek API Key":"\u68C0\u67E5 DeepSeek API Key"})]}),(0,g.jsx)(Nd,{value:c.deepseekVoice,disabled:D,onChange:I=>k({deepseekVoice:I})})]}),c.provider==="local"&&(c.localModelId?(0,g.jsxs)("div",{className:F.section,children:[(0,g.jsxs)("div",{className:F.currentModel,children:[(0,g.jsxs)("span",{children:["\u5F53\u524D\u6717\u8BFB\u6A21\u578B ",(0,g.jsx)("strong",{children:c.localModelId.startsWith("qwen3")?"Qwen3-TTS":c.localModelId.includes("melo")?"MeloTTS":c.localModelId})]}),(0,g.jsx)(pe.Button,{variant:"outline","aria-expanded":y,disabled:E,onClick:()=>v(I=>!I),children:"\u5207\u6362\u5F53\u524D\u6A21\u578B"})]}),y&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(Td,{state:e,sessionId:n,run:t,purpose:"tts"}),(0,g.jsxs)("details",{className:F.details,children:[(0,g.jsx)("summary",{children:"\u5B89\u88C5\u5176\u4ED6\u6717\u8BFB\u6A21\u578B"}),(0,g.jsx)(fr,{pickPath:l,state:e,sessionId:n,run:t,active:i})]})]})]}):(0,g.jsx)(fr,{pickPath:l,state:e,sessionId:n,run:t,active:i})),c.provider==="local"&&!E&&B?.modelId==="qwen3-tts-base-1.7b-gguf"&&(0,g.jsxs)("p",{className:F.hint,children:["\u5F53\u524D\u5B89\u88C5\u65B9\u6848\uFF1A",bo(B.compute),"\u3002",B.compute==="cpu"?"\u6B64\u5B89\u88C5\u53EA\u4F7F\u7528 CPU\u3002\u53EF\u5728\u201C\u5207\u6362\u5F53\u524D\u6A21\u578B \u2192 \u5B89\u88C5\u5176\u4ED6\u6717\u8BFB\u6A21\u578B\u201D\u9009\u62E9\u81EA\u52A8 GPU\uFF1B\u4E0B\u8F7D\u8FD0\u884C\u7EC4\u4EF6\u524D\u4ECD\u9700\u786E\u8BA4\u3002":"\u662F\u5426\u5B9E\u9645\u4F7F\u7528 GPU\uFF0C\u4EE5\u5B8C\u6210\u5408\u6210\u540E\u7684\u672C\u5730\u8BA1\u7B97\u72B6\u6001\u4E3A\u51C6\u3002"]}),(0,g.jsxs)("details",{className:F.details,children:[(0,g.jsx)("summary",{children:"\u97F3\u8272\u4E0E\u97F3\u91CF"}),(0,g.jsxs)("div",{className:F.section,children:[c.provider==="local"&&(P||c.referenceAudioPath)&&(0,g.jsxs)("div",{className:F.section,"data-reference-voice":!0,children:[(0,g.jsx)(fo,{className:F.field,label:"\u53C2\u8003\u97F3\u9891\uFF08WAV\uFF09",kind:"referenceAudio",value:c.referenceAudioPath,disabled:D||!P,active:i,scope:c.provider+":"+c.localModelId,pickPath:l,sessionId:n,placeholder:"\u8BF7\u70B9\u51FB\u9009\u62E9\u6587\u4EF6",onChange:I=>k({referenceAudioPath:I.trim()||null})}),c.referenceAudioPath&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:D,onClick:()=>k({referenceAudioPath:null}),children:"\u6E05\u9664\u53C2\u8003\u97F3\u8272"})]}),c.provider!=="local"&&c.referenceAudioPath&&(0,g.jsxs)("div",{className:F.section,children:[(0,g.jsx)("p",{className:F.hint,children:"\u672C\u5730\u53C2\u8003\u97F3\u8272\u5DF2\u4FDD\u7559\u3002"}),(0,g.jsx)(pe.Button,{variant:"outline",disabled:D,onClick:()=>k({referenceAudioPath:null}),children:"\u6E05\u9664\u53C2\u8003\u97F3\u8272"})]}),(0,g.jsxs)("label",{className:F.inlineField,children:["\u6717\u8BFB\u97F3\u91CF",(0,g.jsx)(Ut,{"aria-label":"\u6717\u8BFB\u97F3\u91CF\u6ED1\u5757",min:"0",max:"1",step:"0.05",value:c.volume,disabled:D,onChange:I=>k({volume:Number(I.target.value)})}),(0,g.jsx)(pe.Input,{type:"number",min:"0",max:"1",step:"0.05",value:c.volume,disabled:D,onChange:I=>k({volume:I.target.value})})]})]})]}),(0,g.jsxs)("div",{className:F.actions,children:[(0,g.jsx)(pe.Button,{variant:"primary",className:F.primary,disabled:D||!o||!S||!(E||M),onClick:()=>d("save-tts",{revision:o.revision,values:Zi(N)}),children:m?"\u5904\u7406\u4E2D\u2026":M?"\u542F\u7528 DeepSeek \u6717\u8BFB":"\u4FDD\u5B58\u6717\u8BFB\u8BBE\u7F6E"}),(0,g.jsx)(pe.Button,{variant:"outline",disabled:D||!o?.ttsSetup||!S||c.provider==="off",onClick:()=>d("preview-tts",E||M?{revision:o.revision,values:zd(N,o.ttsSetup)}:void 0),children:M?"\u53D1\u9001\u793A\u4F8B\u5E76\u8BD5\u542C":E?"\u8BD5\u542C\u5F53\u524D\u9009\u62E9":"\u8BD5\u542C\u5DF2\u4FDD\u5B58\u914D\u7F6E"}),(0,g.jsx)(pe.Button,{variant:"outline",disabled:!(x?.busy||x?.blocked||e.ttsUncertain||e.ttsCancelling||C?.status==="preparing"||f==="preview-tts"),onClick:()=>{t(n,"cancel-tts")},children:"\u505C\u6B62\u8BD5\u542C"})]}),C&&(0,g.jsxs)("p",{role:"status",className:F.hint,children:[{preparing:"\u8BD5\u542C\u51C6\u5907\u4E2D",cancelling:"\u6B63\u5728\u505C\u6B62\u8BD5\u542C",cancelled:"\u8BD5\u542C\u5DF2\u53D6\u6D88",idle:"\u8BD5\u542C\u5DF2\u505C\u6B62",completed:"\u8BD5\u542C\u5DF2\u7ED3\u675F",failed:C.detail??"\u8BD5\u542C\u5931\u8D25\uFF0C\u6B63\u5728\u6838\u67E5\u72B6\u6001",unconfirmed:"\u65E0\u6CD5\u786E\u8BA4\u8BD5\u542C\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B"}[C.status]??C.status,wd[C.provider]?` \xB7 ${wd[C.provider]}`:""]}),x&&(0,g.jsxs)("p",{role:"status",className:F.hint,children:[x.blocked?"\u8BD5\u542C\u5C1A\u672A\u505C\u6B62\uFF0C\u8BF7\u91CD\u542F\u5BBF\u4E3B\u3002":`\u6717\u8BFB\u72B6\u6001\uFF1A${{idle:"\u7A7A\u95F2",preparing:"\u51C6\u5907\u4E2D",synthesizing:"\u5408\u6210\u4E2D","playback-requested":"\u5DF2\u8BF7\u6C42\u64AD\u653E","text-only":"\u5DF2\u663E\u793A\u6587\u5B57",completed:"\u8BD5\u542C\u5DF2\u7ED3\u675F",cancelled:"\u5DF2\u53D6\u6D88",failed:"\u5931\u8D25"}[x.state]??x.state}`,x.localComputeBackend?` \xB7 \u672C\u5730\u8BA1\u7B97\uFF1A${x.localComputeBackend.toUpperCase()}${x.localComputeVerified?"\uFF08\u5DF2\u5B8C\u6210\u5408\u6210\uFF09":"\uFF08\u5F85\u9A8C\u8BC1\uFF09"}`:"",x.localComputeFallback?" \xB7 \u5DF2\u56DE\u9000\u540C\u6A21\u578B CPU":""]}),x?.localTimings&&(0,g.jsxs)("details",{className:F.details,children:[(0,g.jsx)("summary",{children:"\u5DF2\u5B8C\u6210\u6717\u8BFB\u7247\u6BB5\u8017\u65F6"}),(0,g.jsxs)("p",{className:F.hint,children:["\u51C6\u5907 ",(x.localTimings.preparationMs/1e3).toFixed(2)," \u79D2 \xB7 \u8BBE\u5907\u9009\u62E9 ",(x.localTimings.deviceSelectionMs/1e3).toFixed(2)," \u79D2 \xB7 \u5408\u6210 ",(x.localTimings.synthesisMs/1e3).toFixed(2)," \u79D2 \xB7 \u64AD\u653E ",(x.localTimings.playbackMs/1e3).toFixed(2)," \u79D2"]}),(0,g.jsxs)("p",{className:F.hint,children:[x.localTimings.chunks," \u6BB5 \xB7 ",x.localTimings.modelResident?"\u4E0A\u6B21\u7247\u6BB5\u7ED3\u675F\u65F6\u6A21\u578B\u4ECD\u9A7B\u7559\uFF0C\u5B8C\u6574\u5408\u6210\u540E\u64AD\u653E\u3002\u51C6\u5907\u5305\u542B\u6587\u4EF6\u6821\u9A8C\uFF1B\u5408\u6210\u5305\u542B\u9996\u6B21\u52A0\u8F7D\u548C\u670D\u52A1\u54CD\u5E94\u3002":"\u5F53\u524D\u672C\u5730\u6A21\u578B\u9010\u6BB5\u542F\u52A8\uFF0C\u5B8C\u6574\u5408\u6210\u540E\u64AD\u653E\u3002\u51C6\u5907\u5305\u542B\u6587\u4EF6\u6821\u9A8C\uFF1B\u5408\u6210\u5305\u542B\u52A0\u8F7D\u4E0E\u5931\u8D25\u91CD\u8BD5\u3002","\u8017\u65F6\u4E0D\u662F\u9996\u97F3\u5EF6\u8FDF\u6216 GPU \u52A0\u901F\u6BD4\u3002"]})]})]})}function hr(e,n){if(e.status!=="installed"||!e.installedPath||!n)return!1;if(e.purpose==="tts"||e.recommendedSettings?.tts)return n.ttsSetup?.provider==="local"&&n.ttsSetup.localModelId===e.modelId&&n.ttsSetup.localModelPath===e.installedPath;let t=e.recommendedSettings;return!t||t.asr!==n.modelSetup?.asr?!1:Object.entries(t.models??{}).some(([o,r])=>r===e.installedPath&&n.modelSetup?.models?.[o]===r)}function Ed(e,n){return(e?.models??[]).map(t=>{let o=(e.jobs??[]).filter(a=>a.modelId===t.id),r=o.filter(a=>a.status==="installed").sort((a,l)=>String(l.updatedAt??l.createdAt??"").localeCompare(String(a.updatedAt??a.createdAt??""))),i=r.find(a=>hr(a,n));return{model:t,jobs:o,installed:r,current:i,preferred:i??r[0],active:o.find(a=>["queued","running","paused","failed"].includes(a.status))}})}var gr=e=>(e?.title??e?.id??"").split(" \xB7 ")[0],bo=e=>({cpu:"CPU",auto:"\u81EA\u52A8 GPU",cuda:"CUDA / HIP",vulkan:"Vulkan"})[e]??e??"\u672A\u77E5",Bi=e=>{let n=new Date(e);return Number.isFinite(n.getTime())?n.toLocaleString():"\u65F6\u95F4\u672A\u77E5"};function Td({state:e,sessionId:n,run:t,purpose:o}){let[r,i]=Tt(t,n),a=e.installerFor===n?e.installer:null,l=e.settingsFor===n?e.settings:null,c=Ed(a,l).filter(d=>(!o||d.model.purpose===o)&&d.preferred),u=st(e,n)&&!i&&!e.settingsDraftActions?.some(d=>["save-models","save-tts"].includes(d));return(0,g.jsxs)("section",{className:F.switcher,"aria-label":"\u5207\u6362\u5DF2\u5B89\u88C5\u6A21\u578B","data-no-settings-draft":!0,children:[a?c.length?c.map(({model:d,preferred:m,current:f})=>(0,g.jsxs)("div",{className:F.switchRow,children:[(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:gr(d)}),(0,g.jsxs)("small",{children:[d.purpose==="tts"?"\u6717\u8BFB":"\u8BC6\u522B"," \xB7 ",bo(m.compute),f?" \xB7 \u5F53\u524D\u914D\u7F6E":""]})]}),(0,g.jsxs)("div",{className:F.actions,children:[d.purpose==="tts"&&!f&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:!u||!m.installedPath,onClick:()=>r("preview-tts",{revision:l.revision,values:zd({...l.ttsSetup,provider:"local",localModelId:d.id,localModelPath:m.installedPath,referenceAudioPath:null},l.ttsSetup)}),children:"\u5148\u8BD5\u542C"}),(0,g.jsx)(pe.Button,{variant:"outline",disabled:!u||!!f,onClick:()=>r("apply-model-install",{id:m.id,revision:l.revision}),children:f?"\u5F53\u524D\u6A21\u578B":"\u9A8C\u8BC1\u5E76\u5207\u6362"})]})]},d.id)):(0,g.jsx)("p",{className:F.hint,children:"\u5C1A\u65E0\u53EF\u5207\u6362\u7684\u5DF2\u5B89\u88C5\u6A21\u578B\uFF0C\u8BF7\u5148\u5728\u6A21\u578B\u4E0B\u8F7D\u4E2D\u5B89\u88C5\u3002"}):(0,g.jsx)("p",{className:F.hint,children:"\u6B63\u5728\u8BFB\u53D6\u5DF2\u5B89\u88C5\u6A21\u578B\u3002"}),!!c.length&&!u&&(0,g.jsx)("p",{className:F.hint,children:"\u5207\u6362\u6A21\u578B\u524D\u9700\u505C\u6B62\u8BED\u97F3\uFF0C\u5DF2\u5B89\u88C5\u6587\u4EF6\u4E0D\u4F1A\u91CD\u65B0\u4E0B\u8F7D\u3002"})]})}function xd({job:e,snapshot:n,settings:t,disabled:o,writable:r,execute:i,history:a=!1}){let l=hr(e,t);return(0,g.jsxs)("article",{className:F.job,"data-model-job":e.id,children:[(0,g.jsxs)("div",{className:F.jobHeading,children:[(0,g.jsx)("strong",{children:gr(n.models.find(c=>c.id===e.modelId))||e.modelId}),(0,g.jsxs)("small",{children:[bo(e.compute)," \xB7 ",Bi(e.createdAt)]})]}),(0,g.jsxs)("p",{role:"status",children:[l?"\u5F53\u524D\u914D\u7F6E \xB7 ":"",{queued:"\u7B49\u5F85\u4E2D",running:"\u5904\u7406\u4E2D",paused:"\u5DF2\u6682\u505C",failed:"\u5931\u8D25",cancelled:"\u5DF2\u53D6\u6D88",installed:"\u5DF2\u5B89\u88C5\uFF0C\u5B57\u8282\u6821\u9A8C\u901A\u8FC7","checking-runtime":"\u68C0\u67E5\u8FD0\u884C\u4F9D\u8D56","verifying-local":"\u6821\u9A8C\u672C\u673A\u5DF2\u6709\u6A21\u578B",downloading:"\u4E0B\u8F7D\u4E2D",verifying:"\u6821\u9A8C\u6587\u4EF6",installing:"\u63D0\u4EA4\u5B89\u88C5"}[e.stage]??e.stage]}),!a&&Number.isFinite(e.totalBytes)&&e.totalBytes>0&&Number.isFinite(e.receivedBytes)&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("progress",{max:e.totalBytes,value:Math.min(e.receivedBytes,e.totalBytes),"aria-label":"\u4E0B\u8F7D\u5B57\u8282\u8FDB\u5EA6"}),(0,g.jsxs)("small",{children:["\u4E0B\u8F7D ",vn(e.receivedBytes)," / ",vn(e.totalBytes)]})]}),e.error&&(0,g.jsx)("p",{role:"alert",children:e.error.message}),a&&e.installedPath&&(0,g.jsxs)("details",{className:F.installPath,children:[(0,g.jsx)("summary",{children:"\u5B89\u88C5\u4F4D\u7F6E"}),(0,g.jsx)("p",{children:e.installedPath})]}),(0,g.jsxs)("div",{className:F.actions,children:[["queued","running"].includes(e.status)&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:o,onClick:()=>i("control-model-install",{id:e.id,operation:"pause"}),children:"\u6682\u505C\uFF0C\u4FDD\u7559\u8FDB\u5EA6"}),["paused","failed"].includes(e.status)&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:o,onClick:()=>i("control-model-install",{id:e.id,operation:"resume"}),children:"\u6062\u590D\u540C\u4E00\u6765\u6E90\u4E0B\u8F7D"}),["queued","running","paused","failed"].includes(e.status)&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:o,onClick:()=>i("control-model-install",{id:e.id,operation:"cancel"}),children:"\u53D6\u6D88\u5E76\u6E05\u9664\u6B64\u4EFB\u52A1\u4E34\u65F6\u6587\u4EF6"}),e.status==="installed"&&!l&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:!r,onClick:()=>i("apply-model-install",{id:e.id,revision:t.revision}),children:"\u9A8C\u8BC1\u5E76\u5207\u6362"})]}),e.status==="installed"&&(0,g.jsx)("small",{children:"\u5207\u6362\u524D\u8BF7\u7ED3\u675F\u5BF9\u8BDD\u3002\u4E0B\u6B21\u5F00\u59CB\u5BF9\u8BDD\u65F6\u4F7F\u7528\u65B0\u6A21\u578B\u3002"})]})}function Md({state:e,sessionId:n,run:t}){let[o,r]=(0,he.useState)(""),[i,a]=(0,he.useState)("cpu"),[l,c]=(0,he.useState)(!1),[u,d]=Tt(t,n),m=e.installerFor===n?e.installer:null,f=e.settingsFor===n?e.settings:null,p=Ed(m,f).filter(z=>z.model.id!=="sensevoice-int8-2024-07-17"||z.active),y=p.find(z=>z.model.id===o),v=y?.model,b=e.installPlanFor===n&&e.installPlan?.modelId===o&&e.installPlan?.compute===i&&!e.installPlan?.sourceDirectory?e.installPlan:null,x=!!e.busy||e.uncertain||e.installerUncertain||d,C=!d&&st(e,n)&&!e.settingsDraftActions?.some(z=>["save-models","save-tts"].includes(z)),B=(0,he.useId)(),D=(m?.jobs??[]).filter(z=>["installed","cancelled"].includes(z.status)).slice().reverse(),E=m?.hardware,$=m?.refresh?.observedAt??m?.compute?.observedAt;return(0,g.jsxs)("section",{className:`${F.section} ${F.modelInstaller}`,"aria-label":"\u6A21\u578B\u5B89\u88C5",children:[(0,g.jsxs)("div",{className:F.hardwareSummary,children:[(0,g.jsxs)("span",{children:["\u5185\u5B58 ",vn(E?.totalMemoryBytes)," \xB7 \u53EF\u7528 ",vn(E?.availableMemoryBytes)," \xB7 \u663E\u5B58 ",vn(E?.gpuMemoryBytes)]}),(0,g.jsxs)("small",{children:[$?"\u66F4\u65B0\u4E8E "+Bi($):"\u7B49\u5F85\u68C0\u6D4B"," \xB7 \u6BCF 5 \u5206\u949F"]})]}),(m?.refresh?.error||e.modelComputeError)&&(0,g.jsxs)("p",{className:F.hint,role:"status",children:[m?.refresh?.error??"\u672C\u6B21\u786C\u4EF6\u68C0\u6D4B\u672A\u5B8C\u6210","\uFF1B\u4FDD\u7559\u4E0A\u6B21\u7ED3\u679C\u3002"]}),e.installerError&&(0,g.jsx)("p",{role:"alert",className:F.note,children:e.installerError}),e.installerUncertain&&(0,g.jsx)("p",{role:"status",className:F.note,children:"\u6B63\u5728\u6838\u67E5\u5B89\u88C5\u72B6\u6001\u3002"}),(0,g.jsxs)("div",{className:F.currentModel,children:[(0,g.jsxs)("span",{children:["\u8BC6\u522B ",(0,g.jsx)("strong",{children:"SenseVoice"})," \xB7 \u6717\u8BFB ",(0,g.jsx)("strong",{children:f?.ttsSetup?.provider==="local"?f.ttsSetup.localModelId?.startsWith("qwen3")?"Qwen3-TTS":f.ttsSetup.localModelId?.startsWith("vits-melo")?"MeloTTS":f.ttsSetup.localModelId??"\u672C\u5730\u6A21\u578B":f?.ttsSetup?.provider==="deepseek"?f.ttsSetup.deepseekTextTransmissionAccepted&&vo(e)?"DeepSeek":"DeepSeek \u5F85\u542F\u7528":{off:"\u4E0D\u53D1\u58F0"}[f?.ttsSetup?.provider]??"\u672A\u914D\u7F6E"})]}),(0,g.jsx)(pe.Button,{variant:"outline","aria-expanded":l,onClick:()=>c(z=>!z),children:"\u5207\u6362\u5F53\u524D\u6A21\u578B"})]}),l&&(0,g.jsx)(Td,{state:e,sessionId:n,run:t}),m?(0,g.jsxs)("fieldset",{className:`${F.choices} ${F.modelChoices}`,disabled:x,children:[(0,g.jsx)("legend",{children:"\u9009\u62E9\u6A21\u578B"}),p.map(({model:z,current:M,preferred:A,active:k})=>(0,g.jsxs)("label",{className:F.choice,"data-selected":o===z.id,children:[(0,g.jsx)("input",{type:"radio",name:B,checked:o===z.id,onChange:()=>{r(z.id),a(z.computeOptions?.includes("auto")?"auto":"cpu")}}),(0,g.jsxs)("span",{children:[(0,g.jsxs)("strong",{children:[gr(z),z.recommendation?.recommended&&(0,g.jsx)("span",{className:F.badge,children:"\u63A8\u8350"})]}),(0,g.jsxs)("small",{children:[z.purpose==="tts"?"\u6717\u8BFB":"\u8BC6\u522B"," \xB7 ",vn(z.totalBytes)]}),(0,g.jsx)("small",{children:M?"\u5F53\u524D\u914D\u7F6E":k?{queued:"\u7B49\u5F85\u4E0B\u8F7D",running:"\u4E0B\u8F7D\u5904\u7406\u4E2D",paused:"\u4E0B\u8F7D\u5DF2\u6682\u505C",failed:"\u4E0B\u8F7D\u5931\u8D25"}[k.status]:A?"\u5DF2\u5B89\u88C5\uFF0C\u53EF\u5207\u6362":z.available?"\u53EF\u51C6\u5907\u5B89\u88C5":"\u6682\u4E0D\u53EF\u5B89\u88C5"}),!z.available&&(0,g.jsx)("small",{children:z.reason??z.recommendation?.reason})]})]},z.id))]}):(0,g.jsx)("p",{className:F.note,children:"\u6B63\u5728\u8BFB\u53D6\u6A21\u578B\u5217\u8868\u3002"}),v&&(0,g.jsxs)("div",{className:F.selectedModel,children:[(0,g.jsxs)("label",{className:F.inlineField,children:["\u63A8\u7406\u8BBE\u5907",(0,g.jsx)("select",{value:i,disabled:x,onChange:z=>a(z.target.value),children:(v.computeOptions??["cpu"]).map(z=>(0,g.jsxs)("option",{value:z,children:[bo(z),z==="cpu"?"":" \xB7 CPU \u515C\u5E95"]},z))})]}),(0,g.jsxs)("div",{className:F.actions,children:[y.preferred&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:!C||!!y.current,onClick:()=>u("apply-model-install",{id:y.preferred.id,revision:f.revision}),children:y.current?"\u5F53\u524D\u6A21\u578B":"\u9A8C\u8BC1\u5E76\u5207\u6362"}),(0,g.jsx)(pe.Button,{variant:"outline",disabled:x||!v.available,onClick:()=>u("plan-model-install",{modelId:o,compute:i}),children:y.preferred?"\u67E5\u770B\u5176\u4ED6\u5B89\u88C5\u65B9\u6848":"\u67E5\u770B\u5B89\u88C5\u8BA1\u5212"})]}),(0,g.jsxs)("details",{className:F.details,children:[(0,g.jsx)("summary",{children:"\u63A8\u8350\u4F9D\u636E\u4E0E\u8BBE\u5907\u8BF4\u660E"}),(0,g.jsx)("p",{className:F.hint,children:v.recommendation?.reason??"\u63A8\u8350\u4F9D\u636E\u672A\u77E5\uFF0C\u53EF\u624B\u52A8\u9009\u62E9\u3002"}),(0,g.jsx)("p",{className:F.hint,children:v.purpose==="tts"?i==="cpu"?"\u4EC5\u51C6\u5907 CPU \u8FD0\u884C\u65F6\u3002":"\u51C6\u5907\u56FA\u5B9A Vulkan \u4E0E CPU \u7EC4\u4EF6\uFF0C\u5B9E\u9645\u53EF\u7528\u6027\u4ECD\u9700\u672C\u673A\u5408\u6210\u9A8C\u8BC1\u3002":"\u6B64\u6A21\u578B\u4F7F\u7528 CPU\u3002"})]})]}),b&&(0,g.jsxs)(pe.MenuSurface,{className:F.plan,"aria-label":"\u6A21\u578B\u5B89\u88C5\u8BA1\u5212",children:[(0,g.jsx)("h4",{children:"\u6A21\u578B\u5B89\u88C5"}),(0,g.jsxs)("dl",{children:[(0,g.jsx)("dt",{children:"\u6A21\u578B"}),(0,g.jsx)("dd",{children:v?.title??b.modelId}),(0,g.jsx)("dt",{children:"\u6765\u6E90"}),(0,g.jsx)("dd",{children:b.source}),(0,g.jsx)("dt",{children:"\u4E0B\u8F7D\u5927\u5C0F"}),(0,g.jsx)("dd",{children:vn(b.totalBytes)}),(0,g.jsx)("dt",{children:"\u4FDD\u5B58\u4F4D\u7F6E"}),(0,g.jsx)("dd",{children:b.destination}),(0,g.jsx)("dt",{children:"\u63A8\u7406\u8BBE\u5907"}),(0,g.jsx)("dd",{children:b.compute})]}),(0,g.jsx)("p",{children:b.licenseNote??"\u8BF7\u9605\u8BFB\u4E0B\u5217\u6A21\u578B\u8BB8\u53EF\u3002"}),b.licenseUrls?.map(z=>(0,g.jsx)("a",{href:z,target:"_blank",rel:"noreferrer",children:z},z)),(0,g.jsx)("p",{className:F.hint,children:b.notice}),(0,g.jsxs)("details",{className:F.details,children:[(0,g.jsx)("summary",{children:"\u6587\u4EF6\u548C\u6821\u9A8C\u8BE6\u60C5"}),(0,g.jsx)("ul",{children:b.files?.map(z=>(0,g.jsxs)("li",{children:[z.name," \xB7 ",vn(z.bytes),(0,g.jsxs)("small",{children:["SHA-256: ",z.sha256]}),(0,g.jsx)("small",{children:z.url})]},z.name))})]}),(0,g.jsx)(pe.Button,{variant:"primary",className:F.primary,disabled:x||!v?.available||!b.planHash,onClick:()=>u("start-model-install",{modelId:b.modelId,compute:b.compute,planHash:b.planHash,accepted:!0}),children:"\u5F00\u59CB\u4E0B\u8F7D"})]}),(0,g.jsx)("div",{className:F.jobs,children:(m?.jobs??[]).filter(z=>!["installed","cancelled"].includes(z.status)).map(z=>(0,g.jsx)(xd,{job:z,snapshot:m,settings:f,disabled:x,writable:C,execute:u},z.id))}),!!D.length&&(0,g.jsxs)("details",{className:F.installHistory,children:[(0,g.jsxs)("summary",{children:["\u5B89\u88C5\u8BB0\u5F55\uFF08",D.length,"\uFF09",(0,g.jsx)("small",{children:"\u65F6\u95F4 \xB7 \u8BBE\u5907 \xB7 \u4F4D\u7F6E"})]}),(0,g.jsx)("div",{className:F.jobs,children:D.map(z=>(0,g.jsx)(xd,{job:z,snapshot:m,settings:f,disabled:x,writable:C,execute:u,history:!0},z.id))})]}),(0,g.jsx)("p",{className:F.hint,children:"\u6A21\u578B\u4E0B\u8F7D\u53EF\u5728\u540E\u53F0\u7EE7\u7EED\u3002\u68C0\u6D4B\u9759\u9ED8\u8FDB\u884C\uFF0C\u8FDB\u5165\u672C\u9875\u7ACB\u5373\u5237\u65B0\u3002"})]})}function fr({state:e,sessionId:n,run:t,active:o=!0,pickPath:r,initialModelId:i=null,initialReuse:a=!1,reuseOnly:l=!1,onboarding:c=!1}){let[u,d,,m]=Tt(t,n),[f,p]=(0,he.useState)(i),[y,v]=(0,he.useState)(null),[b,x]=(0,he.useState)(a),[C,B]=(0,he.useState)(""),[D,E]=(0,he.useState)("q8_0"),$=e.installerFor===n?e.installer:null,z=$?.models?.filter(q=>q.purpose==="tts"||["qwen3-tts-base-1.7b-gguf","vits-melo-tts-zh_en-int8"].includes(q.id))??[],M=z.find(q=>q.recommendation?.recommended&&q.available),A=f??M?.id??z.find(q=>q.available)?.id??z[0]?.id,k=z.find(q=>q.id===A),P=y??(k?.computeOptions?.includes("auto")?"auto":"cpu"),V=b&&A==="qwen3-tts-base-1.7b-gguf",S=V?{sourceDirectory:C,modelVariant:D}:{},N=e.installPlanFor===n&&e.installPlan?.modelId===A&&e.installPlan?.compute===P&&(V?e.installPlan?.reused===!0&&(e.installPlanRequest?.sourceDirectory??e.installPlan?.sourceDirectory)===C&&e.installPlan?.modelVariant===D:!e.installPlan?.sourceDirectory)?e.installPlan:null,I=[...$?.jobs??[]].reverse().find(q=>q.modelId===A&&q.status!=="cancelled"),G=$?.ttsInstallIntent,L=G&&I&&G.modelId===A&&G.jobId===I.id?G:null,H=["waiting","verifying"].includes(G?.status),X=e.settingsFor===n&&e.settings?.ttsSetup?.provider==="local"&&e.settings.ttsSetup.localModelId===A&&I?.status==="installed"&&!!I.installedPath&&e.settings.ttsSetup.localModelPath===I.installedPath,ce=(0,he.useRef)(void 0),ue=(0,he.useRef)(null);(0,he.useEffect)(()=>{!o||$||e.busy||d||m.isLocked()||ce.current===n||(ce.current=n,u("model-installer"))},[o,n,!!$,e.busy,d,m.settled]),(0,he.useEffect)(()=>{let q=n+":"+A+":"+P;V||!o||!k?.available||e.busy||d||m.isLocked()||N||ue.current===q||(ue.current=q,u("plan-model-install",{modelId:A,compute:P}))},[o,n,A,P,k?.available,e.busy,d,!!N,V,m.settled]);let me=d||e.busy||e.installerUncertain;return(0,g.jsxs)("section",{className:F.section,"aria-label":"\u4E0B\u8F7D\u672C\u5730\u8BED\u97F3\u6A21\u578B","data-no-settings-draft":!0,children:[$?(0,g.jsxs)(g.Fragment,{children:[!l&&(0,g.jsxs)("label",{className:F.inlineField,children:["\u8BED\u97F3\u6A21\u578B",(0,g.jsx)("select",{"aria-label":"\u8BED\u97F3\u6A21\u578B",value:A??"",disabled:me||L?.status==="verifying",onChange:q=>{p(q.target.value),v(null)},children:z.map(q=>(0,g.jsxs)("option",{value:q.id,children:[q.title??q.id,q.recommendation?.recommended?" \xB7 \u63A8\u8350":"",q.available?"":" \xB7 \u6682\u4E0D\u53EF\u7528"]},q.id))})]}),!c&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("p",{className:F.hint,children:k?.recommendation?.reason}),(0,g.jsxs)("label",{className:F.inlineField,children:["\u672C\u5730\u8BA1\u7B97",(0,g.jsx)("select",{"aria-label":"\u672C\u5730\u8BA1\u7B97",value:P,disabled:me||H,onChange:q=>v(q.target.value),children:(k?.computeOptions??["cpu"]).map(q=>(0,g.jsx)("option",{value:q,children:{cpu:"CPU",auto:"\u81EA\u52A8 GPU \xB7 CPU \u515C\u5E95",vulkan:"Vulkan \xB7 CPU \u515C\u5E95"}[q]},q))})]})]}),!k?.available&&(0,g.jsx)("p",{role:"status",className:F.note,children:k?.reason??"\u6B64\u8BBE\u5907\u6682\u6CA1\u6709\u517C\u5BB9\u7684\u5B89\u88C5\u5305\u3002\u53EF\u9009\u62E9\u5176\u4ED6\u652F\u6301\u7684\u6A21\u578B\uFF0C\u6216\u5148\u4F7F\u7528\u6587\u5B57\u3002"}),N&&(0,g.jsxs)("div",{className:F.plan,children:[(0,g.jsxs)("strong",{children:["\u4E0B\u8F7D ",vn(N.totalBytes)," \xB7 ",N.compute.toUpperCase()]}),N.reused&&(0,g.jsxs)("p",{children:["\u590D\u7528\u6A21\u578B ",vn(N.reusedBytes)," \xB7 ",N.modelVariant]}),(0,g.jsxs)("details",{className:F.details,children:[(0,g.jsx)("summary",{children:"\u6765\u6E90\u3001\u8BB8\u53EF\u4E0E\u4FDD\u5B58\u4F4D\u7F6E"}),(0,g.jsx)("p",{children:N.source}),N.runtime&&(0,g.jsx)("p",{children:N.runtime.source}),(0,g.jsx)("p",{children:N.notice}),(0,g.jsx)("p",{children:N.verification}),(0,g.jsx)("p",{children:N.licenseNote}),N.licenseUrls?.map(q=>(0,g.jsx)("a",{href:q,target:"_blank",rel:"noreferrer",children:q},q)),(0,g.jsx)("p",{children:N.destination})]})]}),(0,g.jsxs)("div",{className:F.actions,children:[(!I||(V||I.compute!==P)&&I.status==="installed"&&!H)&&(0,g.jsx)(pe.Button,{variant:"primary",className:F.primary,disabled:me||!st(e,n)||!k?.available||!N,onClick:()=>u("start-model-install",{modelId:A,compute:P,planHash:N.planHash,accepted:!0,useWhenReady:!0,...N.reused?{sourceDirectory:N.sourceDirectory,modelVariant:N.modelVariant}:{}}),children:V?"\u9A8C\u8BC1\u5E76\u4F7F\u7528":"\u4E0B\u8F7D\u5E76\u4F7F\u7528"}),A==="qwen3-tts-base-1.7b-gguf"&&!l&&(0,g.jsx)(pe.Button,{variant:"outline","aria-expanded":V,disabled:me||H,onClick:()=>x(q=>!q),children:"\u4F7F\u7528\u672C\u673A\u5DF2\u6709\u6587\u4EF6"})]}),V&&(0,g.jsxs)("div",{className:F.section,children:[(0,g.jsx)(fo,{className:F.field,label:"\u63D2\u4EF6\u6240\u5728\u673A\u5668\u7684\u6A21\u578B\u76EE\u5F55",kind:"sourceDirectory",value:C,disabled:me,active:o,scope:A+":"+D,pickPath:r,sessionId:n,onChange:B}),(0,g.jsxs)("label",{className:F.inlineField,children:["\u5DF2\u6709\u6A21\u578B\u91CF\u5316\u7248\u672C",(0,g.jsxs)("select",{"aria-label":"\u5DF2\u6709\u6A21\u578B\u91CF\u5316\u7248\u672C",value:D,disabled:me,onChange:q=>E(q.target.value),children:[(0,g.jsx)("option",{value:"q8_0",children:"Q8_0"}),(0,g.jsx)("option",{value:"q4_k_m",children:"Q4_K_M"})]})]}),(0,g.jsx)(pe.Button,{variant:"outline",disabled:me||!C.trim()||!k?.available,onClick:()=>u("plan-model-install",{modelId:A,compute:P,...S}),children:"\u68C0\u67E5\u590D\u7528\u8BA1\u5212"})]}),V&&I&&["failed","paused"].includes(I.status)&&(0,g.jsx)("p",{className:F.note,children:"\u5DF2\u6709\u672A\u5B8C\u6210\u7684\u5B89\u88C5\u4EFB\u52A1\u3002\u53EF\u7EE7\u7EED\u91CD\u8BD5\uFF1B\u5982\u9700\u66F4\u6362\u76EE\u5F55\u6216\u91CF\u5316\u7248\u672C\uFF0C\u8BF7\u5148\u53D6\u6D88\u8BE5\u4EFB\u52A1\uFF0C\u518D\u68C0\u67E5\u65B0\u7684\u590D\u7528\u8BA1\u5212\u3002"}),!V&&k?.available&&!N&&!I&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:me,onClick:()=>u("plan-model-install",{modelId:A,compute:P}),children:"\u91CD\u65B0\u8BFB\u53D6\u5B89\u88C5\u8BA1\u5212"}),I&&(0,g.jsxs)("div",{className:F.job,children:[(0,g.jsx)("p",{role:"status",children:L?.status==="verifying"?"\u6B63\u5728\u9A8C\u8BC1\u5408\u6210\uFF0C\u9996\u6B21\u53EF\u80FD\u9700\u8981\u51E0\u5206\u949F":L?.status==="applied"&&X?"\u5408\u6210\u9A8C\u8BC1\u901A\u8FC7\uFF0C\u5DF2\u8BBE\u4E3A\u6717\u8BFB\u6765\u6E90":L?.status==="blocked"?"\u9700\u8981\u5904\u7406\u540E\u518D\u7EE7\u7EED":{queued:"\u7B49\u5F85\u4E0B\u8F7D",running:I.stage==="verifying-local"?"\u6821\u9A8C\u672C\u673A\u5DF2\u6709\u6A21\u578B":"\u4E0B\u8F7D\u5904\u7406\u4E2D",paused:"\u5DF2\u6682\u505C",failed:"\u4E0B\u8F7D\u5931\u8D25",installed:"\u6587\u4EF6\u5DF2\u6821\u9A8C\uFF0C\u5C1A\u672A\u786E\u8BA4\u5408\u6210"}[I.status]??I.status}),I.totalBytes>0&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("progress",{"aria-label":"\u8BED\u97F3\u6A21\u578B\u4E0B\u8F7D\u8FDB\u5EA6",max:I.totalBytes,value:Math.min(I.receivedBytes,I.totalBytes)}),(0,g.jsxs)("small",{children:[vn(I.receivedBytes)," / ",vn(I.totalBytes)]})]}),I.error&&(0,g.jsx)("p",{role:"alert",children:I.error.message}),L?.reason&&(0,g.jsx)("p",{className:F.note,children:Mh(L.reason)}),(0,g.jsxs)("div",{className:F.actions,children:[L?.status==="verifying"&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:me,onClick:()=>u("control-model-install",{id:I.id,operation:"pause"}),children:"\u505C\u6B62\u9A8C\u8BC1"}),["queued","running"].includes(I.status)&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:me,onClick:()=>u("control-model-install",{id:I.id,operation:"pause"}),children:"\u6682\u505C"}),(["paused","failed"].includes(I.status)||L?.status==="blocked"||L?.status==="paused")&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:me,onClick:()=>u("control-model-install",{id:I.id,operation:"resume"}),children:"\u7EE7\u7EED\u4E0B\u8F7D\u5E76\u4F7F\u7528"}),["queued","running","paused","failed"].includes(I.status)&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:me,onClick:()=>u("control-model-install",{id:I.id,operation:"cancel"}),children:"\u53D6\u6D88\u4E0B\u8F7D"}),I.status==="installed"&&!X&&(!L||["applied","cancelled"].includes(L.status))&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:me||H||!st(e,n),onClick:()=>u("apply-model-install",{id:I.id,revision:e.settings.revision}),children:"\u9A8C\u8BC1\u5E76\u4F7F\u7528"})]})]}),X&&(0,g.jsx)("p",{className:F.hint,children:"\u672C\u5730\u6A21\u578B\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u8BD5\u542C\u3002"})]}):(0,g.jsx)(g.Fragment,{children:(0,g.jsx)("p",{className:F.hint,children:"\u6B63\u5728\u8BFB\u53D6\u53EF\u5B89\u88C5\u6A21\u578B\u2026"})}),e.installerError&&(0,g.jsx)("p",{role:"alert",className:F.note,children:e.installerError}),e.installerUncertain&&(0,g.jsx)("p",{role:"status",children:"\u6B63\u5728\u6838\u67E5\u4E0B\u8F7D\u72B6\u6001\u3002"})]})}function $d({state:e,sessionId:n,run:t,pickPath:o,active:r}){let i=e.settingsFor===n?e.settings:null,a=e.installerFor===n?e.installer:null,l=i?.ttsSetup?.localModelPath,[c,u]=Tt(t,n),[d,m]=(0,he.useState)(""),[f,p]=(0,he.useState)(!1),y=(a?.jobs??[]).filter(b=>b.status==="installed"&&(b.purpose==="tts"||b.recommendedSettings?.tts)),v=y.find(b=>b.id===d);return(0,g.jsxs)("section",{className:F.section,"aria-label":"\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84","data-no-settings-draft":!0,children:[(0,g.jsx)("h3",{children:"\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84"}),(0,g.jsx)("p",{className:F.hint,children:l||"\u5C1A\u672A\u914D\u7F6E\u672C\u5730\u6717\u8BFB\u6A21\u578B\u8DEF\u5F84\u3002"}),!!y.length&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("label",{className:F.inlineField,children:["\u5DF2\u5B89\u88C5\u76EE\u5F55",(0,g.jsxs)("select",{value:d,onChange:b=>m(b.target.value),children:[(0,g.jsx)("option",{value:"",children:"\u9009\u62E9\u5DF2\u6821\u9A8C\u7684\u5B89\u88C5\u76EE\u5F55"}),y.map(b=>(0,g.jsxs)("option",{value:b.id,children:[gr(a.models.find(x=>x.id===b.modelId))," \xB7 ",bo(b.compute)," \xB7 ",Bi(b.createdAt)]},b.id))]})]}),v&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("p",{className:F.hint,children:v.installedPath}),(0,g.jsx)(pe.Button,{variant:"outline",disabled:u||!st(e,n)||hr(v,i),onClick:()=>c("apply-model-install",{id:v.id,revision:i.revision}),children:"\u9A8C\u8BC1\u5E76\u4F7F\u7528\u6240\u9009\u8DEF\u5F84"})]})]}),(0,g.jsxs)("details",{className:F.details,onToggle:b=>p(b.currentTarget.open),children:[(0,g.jsx)("summary",{children:"\u590D\u7528\u672C\u673A Qwen \u6A21\u578B\u6587\u4EF6"}),(0,g.jsx)("p",{className:F.hint,children:"\u9009\u62E9\u5DF2\u6709\u6A21\u578B\u76EE\u5F55\u540E\u6821\u9A8C\u6587\u4EF6\uFF1B\u6821\u9A8C\u901A\u8FC7\u540E\u5B89\u88C5\u8FD0\u884C\u7EC4\u4EF6\u3002"}),f&&(0,g.jsx)(fr,{state:e,sessionId:n,run:t,active:r,pickPath:o,initialModelId:"qwen3-tts-base-1.7b-gguf",initialReuse:!0,reuseOnly:!0})]})]})}function Od({state:e,sessionId:n,run:t,onDismiss:o,onMinimize:r,onBackToAuthorization:i,asrStatus:a,pickPath:l}){let[c,u]=Tt(t,n),[d,m]=(0,he.useState)(0),f=(0,he.useRef)(null),p=(0,he.useRef)(0),y=(0,he.useRef)(null);(0,he.useLayoutEffect)(()=>()=>{p.current++},[n]);let v=q=>(p.current++,q?.());(0,he.useLayoutEffect)(()=>{let q=f.current?.closest("[data-whale-content]");q&&(q.scrollTop=0);let T=f.current?.querySelector("[data-wizard-body]");T&&(T.scrollTop=0)},[d]);let b=e.settingsFor===n?e.settings:null,[x,C]=(0,he.useState)(null),[B,D]=(0,he.useState)(null),E=x??b?.listenMode??"ptt",$=b?.ttsSetup?.provider,z=B??$??mr.provider,M=e.ttsCapabilitiesFor===n?e.ttsCapabilities:null,A=typeof M?.deepseekKeyAvailable=="boolean",k=M?.deepseekKeyAvailable===!0,P=`${n??"owner"}:${b?.revision??"unread"}`,[V,S]=(0,he.useState)(null),N=V??b?.ttsSetup?.deepseekVoice??"stella",I=!A&&!u&&y.current===P&&!!e.error,G=()=>{u||e.busy||(y.current=P,c("inspect-tts"))};(0,he.useEffect)(()=>{d!==1||!b||z!=="deepseek"||A||u||e.busy||y.current===P||G()},[d,b,z,A,P,u,e.busy]);let L=z==="deepseek",H=L&&(e.authorizationUncertain||b?.ttsSetup?.deepseekTextTransmissionAccepted===!0&&!e.authorization),X=L&&!H&&!(b?.ttsSetup?.deepseekTextTransmissionAccepted===!0&&vo(e)),ce=u||!st(e,n),ue=b?.ttsSetup?.provider==="local"&&!!b.ttsSetup.localModelId,me=async()=>{let q=p.current,T=()=>p.current===q;if(d===0)await c("listen-mode",{mode:E})===!0&&T()&&m(1);else if(d===1){if(L&&(!k||H))return;let Q=L&&N!==(b.ttsSetup?.deepseekVoice??"stella");if(z===$&&!X&&!Q){m(2);return}let le=Zi({...mr,...b.ttsSetup,provider:z});L&&(le.deepseekTextTransmissionAccepted=!0,le.deepseekVoice=N),await c("save-tts",{revision:b.revision,values:le})===!0&&T()&&m(2)}else await c("complete-setup",{revision:b.revision})===!0&&T()&&o?.()};return(0,g.jsxs)(pe.MenuSurface,{ref:f,className:F.wizard,role:"region","aria-label":"\u9C7C\u5E94\u9996\u6B21\u914D\u7F6E","data-whale-intrinsic":!0,children:[(0,g.jsxs)("header",{className:F.header,children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("h2",{children:"\u5F00\u59CB\u4F7F\u7528\u9C7C\u5E94"}),(0,g.jsxs)("p",{className:F.hint,children:["\u7B2C ",d+1," / 3 \u6B65 \xB7 \u5176\u4F59\u8BBE\u7F6E\u968F\u65F6\u518D\u8C03"]})]}),(0,g.jsx)(pe.Button,{onClick:r,children:"\u7A0D\u540E"})]}),(0,g.jsx)("div",{className:F.wizardBody,"data-wizard-body":!0,"data-no-drag":!0,children:(0,g.jsxs)("div",{className:F.wizardBodyContent,"data-whale-natural-content":!0,children:[(0,g.jsx)(Pd,{state:e,sessionId:n,run:t}),d===0&&(0,g.jsxs)("section",{className:F.section,children:[(0,g.jsx)("h3",{children:"\u600E\u4E48\u8BF4\u8BDD\uFF1F"}),(0,g.jsx)("fieldset",{className:F.choices,disabled:ce,children:[["ptt","\u6309\u952E\u8BF4\u8BDD","\u6309\u4F4F\u5FEB\u6377\u952E\u65F6\u6536\u97F3"],["always","\u81EA\u7531\u9EA6","\u5F00\u59CB\u5BF9\u8BDD\u540E\u6301\u7EED\u542C\u53D6\u8BED\u97F3"],["wake","\u5524\u9192\u8BCD","\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\uFF0C\u518D\u8BF4\u6307\u4EE4"]].map(([q,T,Q])=>(0,g.jsxs)("label",{className:F.choice,"data-selected":E===q,children:[(0,g.jsx)("input",{type:"radio",name:"setup-listen","data-whale-operation":`listen-mode-${q}`,checked:E===q,onChange:()=>C(q)}),(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:T}),(0,g.jsx)("small",{children:Q})]})]},q))})]}),d===1&&(0,g.jsxs)("section",{className:F.section,children:[(0,g.jsx)("h3",{children:"\u600E\u4E48\u542C\u56DE\u7B54\uFF1F"}),(0,g.jsx)("fieldset",{className:F.choices,disabled:ce,children:_d.map(([q,T,Q])=>(0,g.jsxs)("label",{className:F.choice,"data-selected":z===q,children:[(0,g.jsx)("input",{type:"radio",name:"setup-provider",checked:z===q,onChange:()=>D(q)}),(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:T}),(0,g.jsx)("small",{children:Q})]})]},q))}),L&&(0,g.jsxs)("div",{className:F.note,"data-whale-deepseek-setup":!0,children:[(0,g.jsx)("p",{children:Sd}),H&&(0,g.jsx)("p",{role:"status",children:"\u6B63\u5728\u8BFB\u53D6 DeepSeek \u6717\u8BFB\u6388\u6743\u2026"}),!A&&!I&&(0,g.jsx)("p",{role:"status",children:"\u6B63\u5728\u68C0\u67E5 DSH \u4E2D\u4FDD\u5B58\u7684 DeepSeek API Key\u2026"}),A&&!k&&(0,g.jsx)("p",{role:"status",children:kd}),I&&(0,g.jsx)("p",{role:"status",children:"\u6682\u65F6\u65E0\u6CD5\u68C0\u67E5 DeepSeek API Key\u3002"}),(I||A&&!k)&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:ce,onClick:G,children:"\u91CD\u65B0\u68C0\u67E5 DeepSeek API Key"}),(0,g.jsx)(Nd,{value:N,disabled:ce,onChange:S})]}),z==="local"&&(0,g.jsx)(fr,{pickPath:l,state:e,sessionId:n,run:t,initialModelId:ue?b.ttsSetup.localModelId:null,onboarding:!0})]}),d===2&&(0,g.jsxs)("section",{className:F.section,children:[(0,g.jsx)("h3",{children:"\u51C6\u5907\u8BED\u97F3\u8BC6\u522B"}),(0,g.jsx)("p",{children:"\u8BF4\u8BDD\u65B9\u5F0F\u548C\u6717\u8BFB\u914D\u7F6E\u5DF2\u4FDD\u5B58\u3002"}),a]}),(e.error||e.setupError)&&(0,g.jsx)("p",{role:"alert",className:F.note,children:"\u6682\u65F6\u672A\u80FD\u5B8C\u6210\uFF0C\u6B63\u5728\u6838\u67E5\u8BBE\u7F6E\u3002"})]})}),(0,g.jsxs)("footer",{className:F.actions,children:[(0,g.jsx)(pe.Button,{variant:"outline",disabled:u,onClick:()=>d>0?m(d-1):v(i),children:"\u4E0A\u4E00\u6B65"}),(0,g.jsx)(pe.Button,{variant:"primary",className:F.primary,disabled:ce||!b||d===1&&(z==="local"&&!ue||L&&(!k||H)),onClick:()=>{me()},children:u?"\u4FDD\u5B58\u4E2D\u2026":d===2?"\u5B8C\u6210":d===1&&X?"\u542F\u7528 DeepSeek \u8BED\u97F3\u5408\u6210\u5E76\u7EE7\u7EED":"\u4E0B\u4E00\u6B65"})]})]})}var s=require("react/jsx-runtime"),vr=e=>e.setupOpen||e.setupStatus?.completed!==!0,Oh={ARCHIVED:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u5DF2\u5F52\u6863\u3002\u6062\u590D\u539F\u4F1A\u8BDD\u6216\u66F4\u6362\u7ED1\u5B9A\u540E\u518D\u5F00\u59CB\u8BED\u97F3\u3002",BUSY:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F\u3002\u7B49\u8FD9\u8F6E\u7ED3\u675F\u540E\u518D\u5F00\u59CB\u8BED\u97F3\u3002",UNAVAILABLE:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528\u3002\u53EF\u66F4\u6362\u7ED1\u5B9A\u6216\u89E3\u9664\u7ED1\u5B9A\u3002"},Zd=e=>e.authorizationOpen||e.authorizationLoading&&!e.authorization;function Bd(e){let[n,t]=(0,R.useState)(!1),o=(0,R.useRef)(null),r=(0,R.useRef)(null),i=(0,R.useRef)(null),a=(0,R.useRef)(null),l=e.useWhalePreferences(x=>x),c=e.useWhaleUi(x=>x),u=Zd(c),d=u||vr(c)?"setup":c.panelView??"home",m=n&&d!=="settings",f=(0,R.useCallback)(x=>{o.current=x,e.geometry.ref(x),e.sizing.ref(x)},[e.geometry,e.sizing]),p=(0,R.useCallback)(x=>{r.current=x,e.sizing.contentRef(x)},[e.sizing]);(0,R.useEffect)(()=>{e.setPanelVisible?.(!m)},[m]),(0,R.useLayoutEffect)(()=>{r.current&&(r.current.scrollTop=0)},[d]),(0,R.useLayoutEffect)(()=>e.sizing.update(),[d,m,u,c.sourcePending]),(0,R.useEffect)(()=>{let x=o.current,C=x?.ownerDocument;a.current&&x&&C&&(C.activeElement===C.body||x.contains(C.activeElement))&&(d==="home"?x.querySelector("[data-whale-settings-trigger]")?.focus({preventScroll:!0}):d!==a.current&&x.focus({preventScroll:!0})),a.current=d},[d]);let y=x=>{let C=vd(x);C&&e.recordUserOperation?.(C)},v=()=>{t(!0),requestAnimationFrame(()=>o.current?.querySelector("[data-whale-reopen]")?.focus())},b=()=>{e.refresh?.(),t(!1),requestAnimationFrame(()=>o.current?.focus())};return(0,Vd.createPortal)((0,s.jsx)("section",{ref:f,className:h.floating,"data-whale-panel":!0,"data-view":d,"data-collapsed":m||void 0,"data-source-pending":c.sourcePending||void 0,"data-motion":l.motion,tabIndex:0,"aria-label":e.t("drag"),title:e.t("dragHint"),onPointerDownCapture:()=>e.geometry.activate?.(),onFocusCapture:()=>e.geometry.activate?.(),onPointerDown:x=>{if(x.button!==0||x.pointerType&&x.pointerType!=="mouse"||!nd(x.target,x.currentTarget)){i.current=null;return}let C=x.target,B=C.getBoundingClientRect?.();B&&C.scrollHeight>C.clientHeight&&C.offsetWidth>C.clientWidth&&x.clientX>=B.left+C.clientLeft+C.clientWidth||(i.current={id:x.pointerId,x:x.clientX,y:x.clientY,moved:!1},x.target.closest?.("button")||x.currentTarget.focus({preventScroll:!0}),e.geometry.pointerDown(x,x.target.closest?.("[data-drag-surface]")??x.currentTarget))},onPointerMove:x=>{let C=i.current;!C||x.pointerId!==C.id||(Math.hypot(x.clientX-C.x,x.clientY-C.y)>=4&&(C.moved=!0),e.geometry.pointerMove(x))},onPointerUp:x=>{x.nativeEvent?.isTrusted&&i.current?.id===x.pointerId&&i.current.moved&&e.recordUserOperation?.("panel-move"),e.geometry.pointerEnd(x)},onPointerCancel:x=>{e.geometry.pointerEnd(x),i.current=null},onLostPointerCapture:e.geometry.pointerEnd,onClickCapture:x=>{i.current?.moved&&x.detail!==0?(x.preventDefault(),x.stopPropagation()):y(x),i.current=null},onChangeCapture:y,onSubmitCapture:y,onKeyDownCapture:y,onKeyDown:x=>{x.key==="Escape"&&(x.stopPropagation(),d==="setup"&&!m?v():d==="settings"?e.showHome():m||v())},children:(0,s.jsx)("div",{ref:p,className:h.panelViewport,"data-whale-content":!0,children:e.renderSlot("whale-ear.panel.controls",{collapsed:m,collapse:v,expand:b})})}),document.body)}var Rd=()=>()=>{};function Fd(e){let{controlContext:n}=e,t=(0,R.useSyncExternalStore)(n?.subscribe??Rd,()=>n?n.sourceFor(n.selectedSession()):e.sessionId??null),o=(0,R.useSyncExternalStore)(n?.subscribe??Rd,()=>{let f=n?.currentConversation();return f===t?f:null});e={...e,sessionId:t,currentConversationId:o};let r=e.useWhaleUi(f=>f),[i,a]=(0,R.useState)(!1);(0,R.useLayoutEffect)(()=>{e.setSession?.(t)},[t]);let l=Zd(r),c=r.updates?.release?.version,u=!e.collapsed&&!l&&!vr(r)&&r.panelView==="home"&&r.checkedFor===e.sessionId&&r.status?.enabled===!1&&r.status.ownerSessionId===null&&!r.status.voiceControlBusy&&r.status.voiceSession?.fullyStopped!==!1&&!r.busy&&!r.uncertain&&!r.updatesUnavailable&&r.updates?.status==="available"&&c&&c!==r.dismissedUpdateVersion;if((0,R.useEffect)(()=>{u&&a(!0)},[u]),l||vr(r)){let f=vr(r);return(0,s.jsxs)(s.Fragment,{children:[e.collapsed&&(0,s.jsx)(Ud,{t:e.t,expand:e.expand}),l?(0,s.jsx)("div",{hidden:e.collapsed,children:(0,s.jsx)(Rh,{state:r,save:e.saveAuthorization,close:f?e.collapse:e.closeAuthorization,continueSetup:f?()=>e.closeAuthorization({resumeSetup:!0}):null})}):(0,s.jsx)("div",{role:"dialog","aria-modal":"false","aria-label":"\u9C7C\u5E94\u9996\u6B21\u914D\u7F6E","data-whale-setup":!0,hidden:e.collapsed,children:(0,s.jsx)(Od,{pickPath:e.pickPath,state:r,sessionId:e.sessionId,run:e.run,onDismiss:e.dismissSetup,onMinimize:e.collapse,onBackToAuthorization:e.openAuthorization,asrStatus:(0,s.jsx)(Ld,{action:e.senseVoiceAsrAction,active:!e.collapsed})})})]})}let d=f=>{a(!0),f&&e.updateAction?.({action:"check"})},m=()=>{e.dismissUpdate?.(c),a(!1)};return(0,s.jsxs)(s.Fragment,{children:[r.panelView==="settings"?(0,s.jsx)(Kh,{...e,openUpdate:d}):(0,s.jsx)(Dh,{...e}),i&&(0,s.jsx)(gd,{state:r,close:m,run:e.updateAction,t:e.t})]})}function Rh({state:e,save:n,close:t,continueSetup:o}){let r=e.authorization,i=e.authorizationBusy||e.authorizationLoading,a=r?.usageAgreement?.accepted===!0,l=r?.usageAgreement?.text??[];return(0,s.jsxs)("section",{role:"dialog","aria-modal":"false","aria-label":"\u9C7C\u5E94\u4F7F\u7528\u534F\u8BAE","data-whale-authorization":!0,"data-whale-intrinsic":!0,className:`${h.settings} ${h.authorization}`,children:[(0,s.jsxs)("header",{className:h.settingsHeader,children:[(0,s.jsx)(Yn,{}),(0,s.jsx)("h2",{children:a?"\u9C7C\u5E94\u4F7F\u7528\u534F\u8BAE":"\u6B22\u8FCE\u4F7F\u7528\u9C7C\u5E94"}),a&&!o&&(0,s.jsx)(K.Button,{variant:"outline",disabled:i,onClick:t,children:"\u8FD4\u56DE"})]}),(0,s.jsx)("div",{className:h.authorizationBody,"data-whale-authorization-body":!0,"data-no-drag":!0,children:(0,s.jsxs)("div",{"data-whale-natural-content":!0,children:[!a&&(0,s.jsx)("p",{className:h.authorizationSteps,children:"1 \u4F7F\u7528\u534F\u8BAE\u3000\xB7\u30002 \u57FA\u7840\u914D\u7F6E"}),(0,s.jsx)("h3",{children:"\u9C7C\u5E94\u64CD\u4F5C\u8303\u56F4"}),(0,s.jsx)("div",{className:h.agreement,children:l.map(c=>(0,s.jsx)("p",{children:c},c))}),e.authorizationLoading&&!r&&(0,s.jsx)("p",{role:"status",className:h.hint,children:"\u6B63\u5728\u8BFB\u53D6\u2026"}),r&&(0,s.jsxs)("details",{className:h.section,children:[(0,s.jsx)("summary",{children:"\u670D\u52A1\u4E0E\u6A21\u578B\u6765\u6E90"}),(0,s.jsx)("ul",{className:h.permissionList,children:r.scopes.map(c=>(0,s.jsxs)("li",{children:[(0,s.jsx)("strong",{children:c.title}),(0,s.jsx)("p",{className:h.hint,children:c.description})]},c.id))}),r.modelSources.map(c=>(0,s.jsxs)("div",{children:[(0,s.jsx)("strong",{children:c.modelId}),(0,s.jsx)("p",{className:h.hint,children:c.source}),c.runtime&&(0,s.jsxs)("p",{className:h.hint,children:["\u8FD0\u884C\u7EC4\u4EF6\uFF1A",(c.runtime.sources??[c.runtime.source]).join("\u3001")]}),(0,s.jsx)("p",{className:h.hint,children:c.licenseNote}),c.licenseUrls.map(u=>(0,s.jsx)("p",{className:h.hint,children:(0,s.jsx)("a",{href:u,target:"_blank",rel:"noreferrer",children:u})},u))]},c.modelId))]}),(e.authorizationError||r?.revocationUnconfirmed)&&(0,s.jsx)("p",{role:"alert",className:h.error,children:r?.revocationUnconfirmed?"\u505C\u6B62\u8BBE\u5907\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u68C0\u67E5\u6216\u91CD\u542F\u5BBF\u4E3B\u3002":e.authorizationUncertain?"\u4FDD\u5B58\u7ED3\u679C\u5F85\u786E\u8BA4\uFF0C\u6B63\u5728\u6838\u67E5\u3002":"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"})]})}),(0,s.jsxs)("div",{className:`${h.actions} ${h.authorizationActions}`,children:[(0,s.jsx)(K.Button,{className:h.primary,variant:"primary",disabled:!r||i||e.authorizationUncertain,onClick:()=>a&&r?.granted?(o??t)():void n(!0),children:a&&r?.granted?o?"\u7EE7\u7EED\u914D\u7F6E":"\u8FD4\u56DE":"\u4E00\u952E\u6388\u6743\u5E76\u7EE7\u7EED"}),(0,s.jsx)(K.Button,{variant:"outline",disabled:i,onClick:a&&r?.granted&&!o?()=>{n(!1)}:t,children:a&&r?.granted?o?"\u7A0D\u540E":"\u64A4\u9500\u6388\u6743":"\u6682\u4E0D\u4F7F\u7528"})]}),!a&&(0,s.jsx)("p",{className:h.hint,children:"\u4E0B\u4E00\u6B65\uFF1A\u9009\u62E9\u8BF4\u8BDD\u65B9\u5F0F\u4E0E\u8BED\u97F3\u6A21\u578B"})]})}function Ud({t:e,expand:n,markState:t="idle",compactState:o="off",enabled:r=!1}){return(0,s.jsxs)(K.Button,{className:h.bubble,"data-whale-reopen":!0,"data-whale-operation":"panel-open","data-drag-surface":!0,"aria-label":e("reopen"),title:e("title"),onClick:n,children:[(0,s.jsx)(Yn,{small:!0,state:t}),(0,s.jsx)("span",{className:h.bubbleBrand,children:e("title")}),(0,s.jsxs)("span",{className:h.bubbleStatus,"data-voice-state":o,children:[(0,s.jsx)(He,{name:r===!1?"micOff":"mic"}),(0,s.jsx)("span",{children:e("compact_"+o)})]}),(0,s.jsx)("span",{className:h.voiceBars,"data-active":o==="listening"||void 0,"aria-hidden":"true",children:[0,1,2,3,4].map(i=>(0,s.jsx)("i",{},i))}),(0,s.jsx)(He,{name:"down"})]})}function Dh(e){let{t:n,sessionId:t}=e,o=e.useWhaleUi(de=>de),r=o.status,i=o.busy,a=o.checkedFor===t,l=o.uncertain||!a,c=e.useWhalePreferences(de=>de),u=co(r),d=u&&o.conversationFor===t&&o.conversation?.rootSessionId===u&&!l?o.conversation:null,m=o.conversationHistoryFor===t&&!l&&(!r?.enabled||d?.rootSessionId===o.conversationHistory?.rootSessionId)?o.conversationHistory:null,f=d??{rootSessionId:m?.rootSessionId??null,items:[],latest:m?.items?.filter(de=>de.role==="assistant").at(-1)??null},p=!!(r?.enabled&&(o.conversationError||o.conversationFor===t&&o.conversation?.rootSessionId!==u)),y=r?.voiceSession?.recovery?.kind?.startsWith("helper-"),v=["predecessor-cleanup-pending","helper-cleanup-pending"].includes(r?.voiceSession?.recovery?.kind),b=["predecessor-stop-unconfirmed","helper-stop-unconfirmed"].includes(r?.voiceSession?.recovery?.kind)||/VOICE_(PREDECESSOR|HELPER)_STOP_UNCONFIRMED/.test(o.error??""),x=r?.voiceSession?.recovery?.kind==="live-root-conflict"||/VOICE_ROOT_OWNED_ELSEWHERE/.test(o.error??""),C=d?.helper??r?.helper,B=o.listenModePending?o.listenModeBefore:d?.helper&&d.revision!==o.listenModeReceiptRevision?d.helper.listenMode:r?.listenMode,D=!!(r?.enabled&&C?.online===!1),E=p||!!(r?.enabled&&B==null),$=!l&&!D&&!E&&ft.includes(B),z=i||!$||v||b||x||!r?.capabilities?.listenMode||r?.voiceControlBusy||o.visibilityUncertain||o.ttsUncertain||o.ttsCancelling,M=r?.enabled?d?.inputError:null,A=!r?.enabled&&o.enableError,k=Oh[/VOICE_EXISTING_(ARCHIVED|BUSY|UNAVAILABLE)/.exec(A??"")?.[1]],P=/VOICE_EXISTING_BINDING_CHANGED/.test(A??""),V=A&&o.settings?.voiceSession?.performanceMode==="fast"&&/VOICE_EXACT_EFFORT_HOST_REQUIRED|VOICE_FAST_/.test(A),S=t&&r?.ownerSessionId&&r.ownerSessionId!==t&&u!==t,N=r?.existingVoiceSession,I=N?.sessionId,G=o.existingSessionWritePending||o.existingSessionUnconfirmed,L=r&&!l&&o.checkedFor===t&&!G,H=L&&r.existingVoiceSession,X=L?H?It(H):n("dedicatedVoiceTarget"):n("checkingVoiceTarget"),ce=(0,R.useId)(),ue=(0,R.useId)(),me=r?.enabled&&H&&d?.retryTranscripts?.sessionId===H.sessionId?d.retryTranscripts.items:[],q=r?.existingVoiceSessionSupported===!0&&Object.hasOwn(r,"existingVoiceSession")&&e.listExistingVoiceSessions&&e.setExistingVoiceSession,T=q&&ur(o,t),Q=e.currentConversationId&&q&&r.enabled===!1,le=!!(!H&&!G&&o.checkedFor===t&&r&&!i&&!r.voiceControlBusy&&!l&&!o.ttsUncertain&&!o.ttsCancelling&&!v&&!x&&!b&&!S),ge=d?.wake??r?.wake,$e=v?"pending":b||x||l||E||D?"unknown":i?"pending":d?.inputActive===!0?"input-active":r?.enabled?"authorized":"idle",[je,Oe]=(0,R.useState)(null),[lt,Pn]=(0,R.useState)(!1),Ee=je==="targets"&&q&&r.enabled===!1,re=(0,R.useRef)(!1),Fe=o.settingsFor===t?o.settings?.values:null,We=o.settingsFor===t?o.settings?.ttsSetup:null,$t=We?.provider==="deepseek"&&(!We.deepseekTextTransmissionAccepted||o.authorization&&!vo(o)),Ot=Fe?.pttKeyboard?[...Fe.pttKeyboard.modifiers||[],Fe.pttKeyboard.code].join(" + "):Fe?.pttMouse?n("sideButton")+" "+Fe.pttMouse:null,et=(0,R.useRef)({}),tn=()=>{re.current=!0,Oe(null)};(0,R.useLayoutEffect)(()=>{Oe(de=>e.collapsed||de==="targets"?null:de),Pn(!1)},[t,e.collapsed]),(0,R.useEffect)(()=>{Pn(!1),I&&Oe(de=>de==="conversation"?null:de)},[I]),(0,R.useEffect)(()=>{r?.enabled&&Oe(de=>de==="targets"?null:de)},[r?.enabled]),(0,R.useEffect)(()=>{Ee||!T||!re.current||!et.current.targets||(re.current=!1,et.current.targets.focus())},[Ee,T,e.collapsed]),(0,R.useEffect)(()=>{!l&&!I&&je==="conversation"&&r?.enabled===!1&&e.run(t,"read-history")},[je,l,r?.enabled,t,I]);let An=Wu({enabled:r?.enabled,active:d?.inputActive===!0,unknown:!r||l||E||D||b||x||!!M,pending:i||v}),ct=()=>!I&&je==="conversation"&&(0,s.jsx)(ud,{conversation:f,history:m,historyLoading:o.sourcePending||!l&&o.conversationHistoryLoading,historyError:l?null:o.conversationHistoryError,historyRetryCursor:o.conversationHistoryRequestCursor,loadHistory:de=>e.run(t,"read-history",de?{cursor:de}:{}),assistantName:c.assistantName||n("assistant"),setAssistantName:e.setAssistantName,t:n,close:()=>{Oe(null),et.current.conversation?.focus()}},f.rootSessionId??"empty");return e.collapsed?(0,s.jsx)(Ud,{t:n,expand:e.expand,markState:$e,compactState:An,enabled:r?.enabled??null}):(0,s.jsxs)("div",{className:h.panelContent,"data-home-controls":!0,"data-has-transcript-retry":me.length>0||void 0,"data-home-layout":[r?r.enabled?"active":"idle":"loading",br(o,t),!!(o.error||A),!!M,D,v,b,!!H].join(":"),"data-size-detail":je==="conversation"||Ee?"true":"false",onKeyDown:de=>{!Ee||de.key!=="Escape"||(de.preventDefault(),de.stopPropagation(),tn())},children:[(0,s.jsxs)("div",{className:h.header,children:[(0,s.jsxs)("span",{className:h.brand,children:[(0,s.jsx)(Yn,{state:$e}),(0,s.jsx)("strong",{children:n("title")})]}),(0,s.jsxs)("div",{className:h.headerActions,children:[(0,s.jsxs)(K.Button,{className:h.newChatButton,"data-whale-operation":"new-voice-session","aria-label":n("newChat"),title:H?"\u89E3\u9664\u5DF2\u6709\u4F1A\u8BDD\u7ED1\u5B9A\u540E\u53EF\u65B0\u5EFA\u9C7C\u5E94\u4F1A\u8BDD":n(S?"newChatOtherOwner":r?.enabled?"newChatActive":"newChat"),disabled:!le,onClick:()=>{e.run(t,"new",{expectedOwnerSessionId:r.ownerSessionId})},children:[(0,s.jsx)(He,{name:"plus"}),(0,s.jsx)("span",{children:n("newChat")})]}),(0,s.jsx)(K.Button,{"data-whale-settings-trigger":!0,"data-whale-operation":"page-settings",className:h.iconButton,"aria-label":n("settings"),title:n("settings"),onClick:e.openSettings,children:(0,s.jsx)(He,{name:"settings"})}),(0,s.jsx)(K.Button,{"data-whale-operation":"panel-close",className:h.iconButton,"aria-label":n("collapse"),title:n("collapseHint"),onClick:e.collapse,children:(0,s.jsx)(He,{name:"minus"})})]})]}),(0,s.jsxs)("div",{className:h.statusRow,"data-bound":!!H||void 0,"data-recording":$e==="input-active"||void 0,children:[(0,s.jsx)("div",{id:ce,className:h.voiceTarget,"data-whale-voice-target":!0,children:q?(0,s.jsxs)(K.Button,{ref:de=>{et.current.targets=de},variant:"outline",className:h.existingSessionHome,"data-whale-bound-session":H?!0:void 0,"data-whale-target-trigger":!0,title:X,"aria-expanded":!!Ee,"aria-controls":Ee?ue:void 0,disabled:!Ee&&!T,onClick:()=>Ee?tn():Oe("targets"),children:[(0,s.jsx)("span",{children:n("voiceTarget")}),(0,s.jsx)("strong",{className:h.ellipsis,children:X}),(0,s.jsx)(He,{name:Ee?"down":"chevron"})]}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("span",{children:n("voiceTarget")}),(0,s.jsx)("strong",{className:h.ellipsis,title:X,children:X})]})}),(0,s.jsxs)("div",{className:h.voiceStatus,children:[(0,s.jsx)(He,{name:r?.enabled?"mic":"micOff"}),(0,s.jsx)("span",{className:h.status,role:"status",children:o.listenModePending?n(r?.enabled?"modeSwitching":"modeSaving"):i?n("pending"):r?v?n("voiceCleanupPending"):b?n("voiceRestartPending"):x?n("voiceRecoveryPending"):l?n("stale"):D?n("voiceInputUnavailable"):E?n("unknown"):M?n("inputError_"+M):d?.inputActive===!0?n("inputActive"):r.enabled&&B==="wake"?n(Yi(ge)):r.enabled?n("enabled"):n("disabled"):n("unknown")})]})]}),Ee?(0,s.jsx)(Ri,{...e,state:o,homePickerId:ue,closeHomePicker:tn}):(0,s.jsxs)(s.Fragment,{children:[Q&&(0,s.jsx)(pd,{...e,sessionId:e.currentConversationId,boundSession:N,state:o},e.currentConversationId),(0,s.jsxs)("div",{className:h.quickActions,children:[(0,s.jsx)(K.Button,{"data-whale-operation":r?.enabled||x?"stop-voice":"start-voice",className:`${h.mainAction} ${r?.enabled?"":h.primary}`,variant:r?.enabled?"outline":"primary","aria-describedby":ce,disabled:!a||!!G||i&&!(r?.enabled&&o.interruptibleRead&&!o.diagnosticStopPending)||v||b&&!r?.enabled||!r||l&&!x&&!D||!r.enabled&&!x&&(!L||H&&!Bn(H)),title:r?.enabled?n("stopConsequence"):void 0,onClick:()=>{e.run(t,r?.enabled||x?"disable":"enable",r?.enabled||x?{}:{expectedOwnerSessionId:null,expectedExistingSessionId:H?.sessionId??null})},children:v?n("voiceCleanupPending"):b?n(r?.enabled?"endConversation":"voiceRestartPending"):x?n("voiceRecoveryCheck"):r?.enabled?n("endConversation"):n("startConversation")}),(0,s.jsx)("div",{className:h.quickSegments,role:"group","aria-label":n("mode"),"aria-busy":!!o.listenModePending,"data-listen-mode":$?B:"unknown",children:ft.map(de=>(0,s.jsx)(K.Button,{"data-whale-operation":`listen-mode-${de}`,"aria-pressed":$&&B===de,disabled:!!z,onClick:()=>{B!==de&&e.run(t,"listen-mode",{mode:de})},children:n(So(de))},de))})]}),me.length>0&&(0,s.jsx)(Vh,{items:me,pending:o.transcriptRetry,busy:i,retry:de=>e.retryVoiceTranscript?.(t,de),t:n}),(!r||l||v||b||x)&&(0,s.jsx)("p",{className:h.hint,"data-home-important":v||b||x||void 0,children:n(v?y?"voiceHelperCleanupHint":"voiceCleanupHint":b?y?"voiceHelperRestartHint":"voiceRestartHint":x?"voiceRecoveryHint":i?"readingStatus":"statusRetry")}),!l&&(!E||D)&&r?.enabled&&!v&&!b&&(0,s.jsx)("p",{className:h.hint,"data-whale-input-hint":!0,"data-home-important":M||D?!0:void 0,children:D?n("voiceInputRecoveryHint"):M?n("inputHelp_"+M):B==="wake"?n(ge?.streamOpen&&ge.detection==="asr-after-utterance"?"wakeFallbackHint":"wakeHint"):B==="always"?n("alwaysWarning"):Ot?n("holdToSpeak")+" "+Ot:n("bindingMissing")}),r&&!l&&!r.capabilities?.listenMode&&(0,s.jsx)("p",{className:h.hint,children:n("modeUnavailable")}),o.listenModeError&&(0,s.jsx)("p",{role:"alert","data-whale-mode-error":!0,className:h.error,children:n(o.uncertain?"modeSwitchUnconfirmed":"modeSwitchFailed")}),o.readOnlyFailure&&l&&!x&&!b&&(0,s.jsx)(K.Button,{variant:"outline",disabled:i,onClick:()=>{e.run(t,"status")},children:n("retryStatus")}),(o.error||A)&&!o.readOnlyFailure&&!k&&!o.listenModeError&&!x&&!b&&(0,s.jsx)("p",{role:"alert",className:h.error,children:n(P?"voiceTargetChanged":V?"performanceFastUnavailable":!o.uncertain&&A?"enableFailed":"operationUnavailable")}),k&&(0,s.jsxs)("p",{role:"alert",className:h.notice,children:[k," ",(0,s.jsx)(K.Button,{variant:"outline",disabled:!T,onClick:()=>Oe("targets"),children:"\u7BA1\u7406\u7ED1\u5B9A"})]}),/VOICE_SESSION_ARCHIVED/.test(A??o.error??"")&&(0,s.jsxs)("p",{className:h.notice,children:["\u539F\u8BED\u97F3\u4F1A\u8BDD\u5DF2\u5F52\u6863\u3002",(0,s.jsx)(K.Button,{variant:"outline",onClick:()=>{e.openSettings("sessions")},children:"\u6062\u590D\u539F\u4F1A\u8BDD"})]}),/VOICE_ASR_(?:PREPARING|PREPARE_FAILED)/.test(A??o.error??"")&&(0,s.jsxs)("p",{className:h.notice,children:["SenseVoice \u5C1A\u672A\u5C31\u7EEA\u3002",(0,s.jsx)(K.Button,{variant:"outline",onClick:()=>{e.openSettings("models","download")},children:"\u67E5\u770B\u6A21\u578B\u8FDB\u5EA6"})]}),/VOICE_MODEL_REQUIRED/.test(A??o.error??"")&&(0,s.jsxs)("p",{className:h.notice,children:["\u8BF7\u5148\u9009\u62E9\u53EF\u7528\u7684\u5BF9\u8BDD\u6A21\u578B\u3002",(0,s.jsx)(K.Button,{variant:"outline",onClick:()=>{e.openSettings("models","conversation")},children:"\u8BBE\u7F6E\u5BF9\u8BDD\u6A21\u578B"})]}),$t&&(0,s.jsxs)("p",{className:h.notice,"data-home-important":!0,children:["\u6717\u8BFB\u5F85\u542F\u7528\uFF0C\u56DE\u7B54\u4F1A\u663E\u793A\u4E3A\u6587\u5B57\u3002",(0,s.jsx)(K.Button,{variant:"outline",onClick:()=>{e.openSettings("models","voice")},children:"\u8BBE\u7F6E\u6717\u8BFB"})]}),H&&!Bn(H)&&(0,s.jsx)("p",{className:h.hint,"data-home-important":!0,children:cr(H)}),d?.providerError&&(0,s.jsx)("p",{role:"alert","data-home-important":!0,"data-whale-provider-error":!0,className:h.error,children:d.providerError}),(0,s.jsx)(dd,{...e,state:o}),!H&&!o.error&&!M&&!x&&!b&&!v&&!D&&!E&&(0,s.jsx)(Zh,{...e,state:o}),lt&&(0,s.jsx)("p",{role:"alert",className:h.notice,children:"DSH \u6682\u65F6\u65E0\u6CD5\u6253\u5F00\u539F\u4F1A\u8BDD\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"}),Bn(H)&&e.openExistingVoiceSession&&(0,s.jsxs)(K.Button,{className:h.caption,"data-whale-operation":"open-native-session","aria-label":"\u6253\u5F00\u539F\u4F1A\u8BDD",onClick:async()=>{Pn(!1);try{await e.openExistingVoiceSession(H.sessionId)}catch{Pn(!0)}},children:[d?.latest?.text&&(0,s.jsx)("span",{className:h.ellipsis,children:d.latest.text}),(0,s.jsx)("span",{className:h.openOriginal,children:"\u6253\u5F00\u539F\u4F1A\u8BDD"}),(0,s.jsx)(He,{name:"chevron"})]}),r&&!I&&(0,s.jsxs)(K.Button,{ref:de=>{et.current.conversation=de},className:h.caption,onClick:()=>{let de=je!=="conversation";Oe(de?"conversation":null),de&&e.run(t,"read-history")},"aria-label":n("recentConversation"),"aria-expanded":je==="conversation",children:[(0,s.jsxs)("span",{className:h.ellipsis,children:[f.latest?.state==="speech-failed"?n("speechFailed")+": ":f.latest?.state==="interrupted"?n("speechInterrupted")+": ":"",f.latest?.text??n(o.newChatFor===t?"newChatCreated":"viewConversation")]}),(0,s.jsx)(He,{name:"chevron"})]}),ct()]})]})}function Vh({items:e,pending:n,busy:t,retry:o,t:r}){let i=(0,R.useId)();return(0,s.jsxs)("section",{className:h.transcriptRetries,"aria-labelledby":i,"data-whale-transcript-retries":!0,"data-no-drag":!0,children:[(0,s.jsxs)("header",{children:[(0,s.jsx)("h2",{id:i,children:r("retryTranscripts")}),(0,s.jsx)("p",{children:r("endDiscardsRetries")})]}),(0,s.jsx)("ul",{className:h.transcriptRetryList,tabIndex:0,"aria-labelledby":i,children:e.map(a=>{let l=n?.id===a.id&&a.state==="ready"?n.state:a.state,c={busy:"retryTranscriptBusy",sending:"retryTranscriptSending",uncertain:"retryTranscriptUncertain"}[l];return(0,s.jsxs)("li",{className:h.transcriptRetry,"data-retry-state":l,children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:h.transcriptRetryText,children:a.text}),c&&(0,s.jsx)("p",{className:h.hint,role:"status",children:r(c)})]}),(0,s.jsx)(K.Button,{variant:"outline",disabled:t||!!n||l!=="ready",onClick:()=>{o(a.id)},"data-whale-operation":"retry-voice-transcript",children:r("retryTranscript")})]},a.id)})})]})}function br(e,n){let t=e.status;return!!(e.settings?.revision&&e.checkedFor===n&&e.settingsFor===n&&!e.uncertain&&!e.visibilityUncertain&&!e.settingsConflict&&!e.ttsUncertain&&!e.ttsCancelling&&t?.enabled===!1&&t.ownerSessionId===null&&t.voiceControlBusy===!1&&t.voiceSession?.fullyStopped===!0&&t.voiceSession?.id===null)}function Zh({state:e,sessionId:n,t,run:o,readState:r}){let i=(0,R.useRef)(0);(0,R.useEffect)(()=>()=>{i.current++},[n]);let a=br(e,n),l=e.settings?.voiceSession?.performanceMode,c=e.performanceFor===n?e.performance:null,u=["fast","balanced","high"],d=c?.modes?.some(p=>p.performanceMode===l&&!p.available),m=e.busy||e.performancePending||e.uncertain||e.visibilityUncertain||!a,f=async p=>{if(m||p===l)return;let y=++i.current;if(p!=="compatibility"&&!await o(n,"inspect-performance")||y!==i.current)return;let v=r?.();!v||!br(v,n)||v.busy||p!=="compatibility"&&(v.performanceFor!==n||!v.performance?.modes?.find(b=>b.performanceMode===p)?.available)||await o(n,"set-performance-mode",{revision:v.settings.revision,performanceMode:p})};return a?(0,s.jsxs)("section",{className:h.quickSpeed,"aria-label":t("performanceTitle"),children:[(0,s.jsxs)("div",{className:h.quickSpeedHeader,children:[(0,s.jsx)("span",{children:t("performanceTitle")}),l==="compatibility"&&(0,s.jsx)("small",{children:t("performance_compatibility")})]}),(0,s.jsx)("div",{className:h.quickSegments,children:u.map(p=>(0,s.jsxs)(K.Button,{"aria-pressed":l===p,disabled:m||!!Fi(c,p),title:t(Fi(c,p)||(p==="fast"?"performanceFastHint":"performance_"+p)),onClick:()=>{f(p)},children:[l===p&&(0,s.jsx)(He,{name:"check"}),(0,s.jsx)(Hd,{value:p,t})]},p))}),(0,s.jsx)(jd,{capability:c,t,compact:!0,pending:e.performancePending,error:e.performanceError}),d&&(0,s.jsx)(K.Button,{variant:"outline",disabled:m,onClick:()=>{f("compatibility")},children:t("performance_compatibility")})]}):null}function Bh({settings:e,sessionId:n,busy:t,run:o,t:r,status:i,verified:a,statusFresh:l,tab:c,markSettingsEdited:u,discardSettingsDraft:d,bindingError:m,captureBindings:f}){let[p,y]=(0,R.useState)(e.values.device??null),[v,b]=(0,R.useState)(e.values.pttMouse),[x,C]=(0,R.useState)(e.values.pttKeyboard??null),[B,D]=(0,R.useState)(e.values.speakerVerification.enabled),E=e.capabilities?.turnSignals===!0,[$,z]=(0,R.useState)(e.values.turnSignals?.enabled??!1),[M,A]=(0,R.useState)(e.values.turnSignals?.volume?.toString()??""),[k,P]=(0,R.useState)((e.values.wakeWordAliases??["\u5C0F\u9CB8\u9C7C"]).join("\uFF0C")),[V,S]=(0,R.useState)(String((e.values.wakeListenTimeoutMs??1e4)/1e3)),N=ea(k),I=zo(N)&&Number.isInteger(Number(V)*1e3)&&Number(V)>=3&&Number(V)<=30,G=JSON.stringify(N)!==JSON.stringify(e.values.wakeWordAliases??["\u5C0F\u9CB8\u9C7C"])||Number(V)*1e3!==(e.values.wakeListenTimeoutMs??1e4),[L,H]=(0,R.useState)(e.values.semanticExperimental===!0),[X,ce]=(0,R.useState)(e.values.turnSignals?.headphonesConfirmed??!1),[ue,me]=(0,R.useState)(e.values.turnSignals?.experimentalAutomaticBargeIn??!1),q=v!==e.values.pttMouse||JSON.stringify(x)!==JSON.stringify(e.values.pttKeyboard??null),[T,Q]=(0,R.useState)(!1),le=l?i?.inputDevices:null,ge=p!==null&&typeof p=="object",$e=ge||p==null||p===""||le?.items?.some(re=>typeof p=="number"&&re.index===p),je=T==="index"&&(String(p??"").trim()===""||!/^\d+$/.test(String(p).trim())||!Number.isSafeInteger(Number(p))),Oe=t||!l||i?.enabled!==!1||i?.ownerSessionId!==null||i?.voiceControlBusy!==!1||i?.voiceSession?.fullyStopped!==!0,lt=()=>{if(t||!I||je||G&&Oe)return;let re=ge&&!T?p:T==="index"?Number(p):p==null||p===""?null:T==="name"?String(p).trim():typeof p=="number"?p:p.trim();o(n,"save-settings",{revision:e.revision,values:{wakeWordAliases:N,wakeListenTimeoutMs:Number(V)*1e3,semanticExperimental:L,device:re,pttMouse:e.values.pttMouse,...e.capabilities?.pttKeyboard?{pttKeyboard:e.values.pttKeyboard??null}:{},speakerVerification:{enabled:B},...E?{turnSignals:{enabled:$,volume:Number(M),headphonesConfirmed:X,experimentalAutomaticBargeIn:ue}}:{}}})},Pn=(0,s.jsx)(K.Button,{className:h.primary,variant:"primary",disabled:t||!I||je||G&&Oe||E&&(M.trim()===""||!Number.isFinite(Number(M))||Number(M)<0||Number(M)>1),onClick:lt,children:r(t?"pending":"save")}),Ee=ge?p.name:le?.items?.find(re=>re.index===p)?.name??(p==null||p===""?r("deviceDefault"):String(p));return(0,s.jsxs)("div",{className:h.section,"data-settings-draft":"save-settings",children:[(0,s.jsxs)("div",{hidden:c!=="audio",className:h.section,children:[(0,s.jsx)("h3",{children:r("mode")}),(0,s.jsxs)("p",{className:h.hint,children:["\u5F53\u524D\uFF1A",r(So(i?.listenMode??e.listenMode))]}),(0,s.jsx)("div",{className:h.segmented,children:["ptt","always","wake"].map(re=>(0,s.jsx)(K.Button,{"data-whale-operation":`listen-mode-${re}`,variant:"outline","aria-pressed":(i?.listenMode??e.listenMode)===re,disabled:!e.capabilities?.listenMode||!a||t,onClick:()=>{o(n,"listen-mode",{mode:re})},children:r(So(re))},re))}),(!e.capabilities?.listenMode||!a)&&(0,s.jsx)("p",{className:h.hint,children:r(e.capabilities?.listenMode?"modeNeedsGrant":"modeUnavailable")}),(0,s.jsxs)("div",{className:h.inlineActions,children:[(0,s.jsxs)("label",{className:h.inlineField,children:[r("device"),(0,s.jsxs)("select",{title:Ee,className:h.deviceSelect,"aria-label":r("device"),disabled:t,value:T?"__manual-"+T:ge?"__stable":$e?p??"":"__saved",onChange:re=>{let Fe=re.target.value;Fe.startsWith("__manual-")?(Q(Fe.slice(9)),ge&&y("")):Fe!=="__saved"&&Fe!=="__stable"&&(Q(!1),y(Fe===""?null:Number(Fe)))},children:[(0,s.jsx)("option",{value:"",children:r("deviceDefault")}),ge&&(0,s.jsx)("option",{value:"__stable",children:p.name}),le?.items?.map(re=>(0,s.jsxs)("option",{value:String(re.index),children:[re.name," (",re.index,")"]},re.index)),!$e&&(0,s.jsxs)("option",{value:"__saved",children:[r("deviceSaved"),": ",p]}),(0,s.jsx)("option",{value:"__manual-index",children:r("deviceManualIndex")}),(0,s.jsx)("option",{value:"__manual-name",children:r("deviceManualName")})]})]}),Pn]}),Ee.length>22&&(0,s.jsxs)("details",{className:h.fullName,children:[(0,s.jsx)("summary",{children:"\u67E5\u770B\u8BBE\u5907\u5168\u540D"}),(0,s.jsx)("p",{children:Ee})]}),(T||!$e)&&(0,s.jsxs)("label",{className:h.field,children:[r("deviceManual"),(0,s.jsx)(K.Input,{"aria-label":r("deviceManual"),disabled:t,value:p??"",onChange:re=>{T||Q(typeof p=="number"?"index":"name"),y(re.target.value)}})]}),je&&(0,s.jsx)("p",{className:h.notice,children:r("deviceIndexInvalid")}),le?.status!=="available"&&(0,s.jsx)("p",{className:h.hint,children:r(le?.status==="empty"?"deviceEmpty":"deviceUnknown")})]}),(0,s.jsx)("div",{hidden:c!=="interaction",className:h.section,children:(0,s.jsxs)("div",{className:h.bindingEditor,"data-settings-draft":"save-bindings",children:[(0,s.jsx)(Lh,{captureBindings:f,sessionId:n,active:c==="interaction",value:x,onChange:re=>{u?.("save-bindings"),C(re)},capability:e.capabilities?.pttKeyboard,disabled:t||!l,t:r}),(0,s.jsxs)("fieldset",{className:`${h.radios} ${h.mouseBinding}`,disabled:t||!l,children:[(0,s.jsx)("legend",{children:r("sideButton")}),[0,1,2].map((re,Fe)=>(0,s.jsxs)("label",{children:[(0,s.jsx)("input",{type:"radio",name:"whale-ear-mouse",value:re,checked:v===re,onChange:()=>{u?.("save-bindings"),b(re)}}),r(["sideOff","sideOne","sideTwo"][Fe])]},re))]}),m&&(0,s.jsx)("p",{role:"alert",className:h.notice,children:/RECORDING|KEYS_HELD/.test(m)?"\u8BF7\u5148\u677E\u5F00\u6309\u952E\uFF0C\u7B49\u5F85\u5F55\u97F3\u5904\u7406\u5B8C\u6210\uFF0C\u518D\u4FDD\u5B58\u3002":/UNCONFIRMED|STOP_UNCONFIRMED|ROLLBACK_UNCONFIRMED/.test(m)?"\u6309\u952E\u72B6\u6001\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u91CD\u542F DSH \u518D\u6838\u67E5\u6309\u952E\u3002":/STALE|配置已改变|语音会话已改变/.test(m)?"\u914D\u7F6E\u6216\u8BED\u97F3\u4F1A\u8BDD\u5DF2\u6539\u53D8\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6\u540E\u518D\u4FDD\u5B58\u3002":/UNSUPPORTED/.test(m)?"\u5F53\u524D\u7CFB\u7EDF\u4E0D\u652F\u6301\u5728\u5BF9\u8BDD\u4E2D\u66F4\u6362\u5168\u5C40\u6309\u952E\u3002":"\u672A\u80FD\u4FDD\u5B58\u6309\u952E\uFF0C\u8BF7\u67E5\u770B\u9AD8\u7EA7\u8BE6\u60C5\u3002"}),(0,s.jsxs)("div",{className:`${h.actions} ${h.bindingActions}`,children:[(0,s.jsx)(K.Button,{className:h.primary,variant:"primary",disabled:t||!l||!q||!e.bindingContext||x?.code==="F4"&&x.modifiers.includes("Alt"),onClick:()=>{o(n,"save-bindings",{revision:e.revision,bindingContext:e.bindingContext,values:{pttMouse:v,pttKeyboard:x}})},children:r("saveBindings")}),q&&(0,s.jsx)(K.Button,{variant:"outline",disabled:t,onClick:()=>{b(e.values.pttMouse),C(e.values.pttKeyboard??null),d?.("save-bindings")},children:r("discardBindings")})]})]})}),(0,s.jsxs)("div",{hidden:c!=="advanced"||!e.values.speakerVerification.enabled,className:h.section,children:[e.values.speakerVerification.enabled&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(Lt,{label:r("speaker"),checked:B,disabled:t,onChange:D}),(0,s.jsx)("p",{className:h.hint,children:r("speakerHint")})]}),(0,s.jsx)("p",{className:h.hint,children:r("savedHint")})]}),(0,s.jsxs)("div",{hidden:c!=="audio",className:h.disclosureRow,children:[(0,s.jsxs)("details",{className:h.section,children:[(0,s.jsx)("summary",{children:r("wakeSettings")}),(0,s.jsx)("p",{className:h.hint,children:r("wakeMethod")}),(0,s.jsxs)("label",{className:h.field,children:[r("wakeAliases"),(0,s.jsx)(K.Input,{"aria-label":r("wakeAliases"),maxLength:208,value:k,disabled:Oe,onChange:re=>P(re.target.value)})]}),(0,s.jsx)("p",{className:h.hint,children:r("wakeAliasesHint")}),(0,s.jsxs)("label",{className:h.field,children:[r("wakeTimeout"),(0,s.jsx)(K.Input,{"aria-label":r("wakeTimeout"),type:"number",min:"3",max:"30",step:"1",value:V,disabled:Oe,onChange:re=>S(re.target.value)})]}),Oe&&(0,s.jsx)("p",{className:h.hint,children:r("wakeStopToEdit")}),!I&&(0,s.jsx)("p",{role:"alert",className:h.notice,children:r("wakeInvalid")})]}),(0,s.jsxs)("details",{className:h.section,children:[(0,s.jsx)("summary",{children:r("soundTitle")}),(0,s.jsx)(Lt,{label:r("soundEnabled"),checked:$,disabled:!E||t,onChange:z}),(0,s.jsxs)("label",{className:h.field,children:[r("soundVolume"),(0,s.jsx)(Ut,{"aria-label":r("soundVolume")+"\u6ED1\u5757",min:"0",max:"1",step:"0.05",value:M,disabled:!E||t,onChange:re=>A(re.target.value)}),(0,s.jsx)(K.Input,{type:"number",min:"0",max:"1",step:"0.05","aria-label":r("soundVolume"),disabled:!E||t,value:M,onChange:re=>A(re.target.value)})]}),(0,s.jsx)(Lt,{label:"\u5B9E\u9A8C\u6027\u5524\u9192\u5224\u65AD\uFF08\u9ED8\u8BA4\u5173\u95ED\uFF09",checked:L,disabled:t,onChange:H}),(0,s.jsx)("p",{className:h.hint,children:"\u5173\u95ED\u65F6\uFF0C\u81EA\u7531\u9EA6\u76F4\u63A5\u542C\u53D6\u6709\u6548\u8BED\u97F3\uFF1B\u5F00\u542F\u540E\u4F7F\u7528\u5524\u9192\u8BCD\u6216\u8BED\u4E49\u5224\u65AD\uFF0C\u53EF\u80FD\u6F0F\u5524\u9192\u3002\u5EFA\u8BAE\u4F7F\u7528\u8033\u673A\u51CF\u5C11\u56DE\u58F0\u3002"}),(0,s.jsx)(K.Checkbox,{label:r("headphones"),checked:X,disabled:!E||t,onChange:re=>{ce(re),re||me(!1)}}),(0,s.jsx)("p",{className:h.hint,children:r("headphonesHint")}),(0,s.jsx)(Lt,{label:r("automaticBargeIn"),checked:ue,disabled:!E||!X||t,onChange:me}),E&&!X&&(0,s.jsx)("p",{className:h.hint,children:r("headphonesRequired")}),(0,s.jsx)("p",{className:h.hint,children:r(E?"soundAvailable":"soundUnavailable")})]})]}),c==="advanced"&&e.values.speakerVerification.enabled&&(0,s.jsx)("div",{className:h.formActions,children:Pn})]})}function Ld({action:e,active:n}){let[t,o]=(0,R.useState)(null),[r,i]=(0,R.useState)(0),a=(0,R.useRef)(0);if((0,R.useEffect)(()=>{if(!e||!n)return;let u=new AbortController,d,m=async p=>{try{let y=await e({operation:p},u.signal);if(u.signal.aborted)return;o(y),y.selected&&(p==="retry"||["idle","downloading"].includes(y.state))&&(d=setTimeout(()=>{m("status")},1e3))}catch{u.signal.aborted||o({state:"unavailable"})}},f=r>a.current?"retry":"status";return a.current=r,m(f),()=>{clearTimeout(d),u.abort()}},[e,n,r]),!e||!n)return null;let l=t?.totalBytes>0&&t?.state==="downloading",c=u=>(u/1e6).toFixed(1);return(0,s.jsxs)("div",{className:h.section,"data-whale-sensevoice":!0,children:[(0,s.jsx)("h3",{children:"SenseVoice"}),(0,s.jsx)("p",{role:"status",children:t?.selected===!1?"\u4F7F\u7528\u9AD8\u7EA7\u8DEF\u5F84\u4E2D\u6307\u5B9A\u7684\u672C\u5730 SenseVoice \u6A21\u578B\u3002":t?.state==="ready"?"\u5DF2\u5C31\u7EEA\uFF0C\u5728\u672C\u673A\u79BB\u7EBF\u8BC6\u522B\u3002":t?.state==="error"?t.message:t?.state==="unavailable"?"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u6A21\u578B\u72B6\u6001\u3002":l?`\u6B63\u5728\u4E0B\u8F7D \xB7 ${c(t.receivedBytes)} / ${c(t.totalBytes)} MB`:"\u6B63\u5728\u51C6\u5907\u672C\u5730\u8BC6\u522B\u6A21\u578B\u2026"}),l&&(0,s.jsx)("progress",{"aria-label":"SenseVoice \u4E0B\u8F7D\u8FDB\u5EA6",value:t.receivedBytes,max:t.totalBytes}),t?.selected&&t?.state==="error"&&(0,s.jsx)(K.Button,{variant:"outline",onClick:()=>{o(null),i(u=>u+1)},children:"\u91CD\u8BD5\u4E0B\u8F7D"})]})}function Fh({settings:e,sessionId:n,busy:t,run:o,t:r,pickPath:i,active:a,modelTab:l,markSettingsEdited:c,senseVoiceAsrAction:u}){let[d,m]=(0,R.useState)(e.modelSetup.models),f=t,p=()=>c?.("save-models"),y=()=>{o(n,"save-models",{revision:e.revision,values:{asr:"sensevoice",modelCompute:"cpu",models:d}})};return(0,s.jsxs)("section",{className:h.section,"data-settings-draft":"save-models",hidden:!["download","paths"].includes(l),children:[(0,s.jsx)("div",{"data-whale-tab-panel":!0,hidden:l!=="download",children:(0,s.jsx)(Ld,{action:u,active:a&&l==="download"})}),(0,s.jsxs)("div",{hidden:l!=="paths",className:h.section,children:[(0,s.jsx)("h3",{children:"\u8BC6\u522B\u6A21\u578B\u672C\u5730\u8DEF\u5F84"}),(0,s.jsx)("p",{className:h.hint,children:"\u53EF\u5728\u201C\u6A21\u578B\u4E0B\u8F7D\u201D\u67E5\u770B\u51C6\u5907\u8FDB\u5EA6\uFF0C\u6216\u5728\u8FD9\u91CC\u6307\u5B9A\u672C\u673A\u5DF2\u6709\u7684 SenseVoice \u76EE\u5F55\u3002"}),[["sensevoiceDir","sensevoicePath"],["campplus","campplusPath"]].map(([v,b])=>(0,s.jsx)(fo,{className:h.pathRow,label:r(b),kind:v,value:d[v],disabled:f,active:a&&l==="paths",pickPath:i,sessionId:n,scope:"sensevoice",onChange:x=>{p(),m(C=>({...C,[v]:x}))}},v)),(0,s.jsx)(K.Button,{variant:"outline",disabled:f,onClick:y,children:r("saveModels")})]})]})}function Uh({settings:e,state:n,sessionId:t,run:o,t:r}){let[i,a]=(0,R.useState)(e.voiceSession.visibility),l=n.settingsFor===t,c=n.checkedFor===t&&n.status!==null,u=c?n.status.voiceCapabilities:e.voiceCapabilities,d=c?n.status.voiceSession:null,m=c&&(n.status.enabled||n.status.ownerSessionId!==null||d?.id!=null),f=c&&n.status.voiceControlBusy===!1,p=n.busy||n.uncertain||!l||!c||!f||m,y=v=>r(v==="workspace"?"workspaceMode":"hiddenMode");return(0,s.jsxs)("section",{className:h.section,"data-whale-visibility":!0,"data-settings-draft":"set-visibility",children:[(0,s.jsx)("h3",{children:r("capabilityTitle")}),(0,s.jsx)("dl",{className:h.details,children:["hidden","workspace"].map(v=>(0,s.jsxs)("div",{className:h.capabilityRow,children:[(0,s.jsx)("dt",{children:y(v)}),(0,s.jsxs)("dd",{children:[r(u?.[v]?.supported?"supported":"unsupported"),u?.[v]?.reason?` \xB7 ${u[v].reason}`:""]})]},v))}),(0,s.jsxs)("p",{className:h.hint,children:[r("taskCapability"),": ",r(u?.taskHandoff?.supported?"supported":"unsupported")," \xB7 ",u?.taskHandoff?.mode??r("unknown"),u?.taskHandoff?.reason?` \xB7 ${u.taskHandoff.reason}`:""]}),(0,s.jsxs)("p",{children:[r("configuredMode"),": ",y(e.voiceSession.visibility)]}),(0,s.jsx)("p",{className:h.hint,children:c?d?.id?`${r("currentVoiceMode")}: ${d.presentation?.requested?y(d.presentation.requested):r("unknown")} \xB7 ${d.id}`:r("noActiveVoice"):r("modeReadFirst")}),(0,s.jsxs)("fieldset",{className:h.radios,disabled:p,children:[(0,s.jsx)("legend",{children:r("chooseVisibility")}),(0,s.jsxs)("label",{children:[(0,s.jsx)("input",{type:"radio",name:"whale-ear-visibility",checked:i==="hidden",onChange:()=>a("hidden")}),r("hiddenMode")]}),(0,s.jsxs)("label",{children:[(0,s.jsx)("input",{type:"radio",name:"whale-ear-visibility",checked:i==="workspace",disabled:!u?.workspace?.supported,onChange:()=>a("workspace")}),r("workspaceMode")]})]}),(0,s.jsx)("p",{className:h.hint,children:r("workspaceWarning")}),(0,s.jsx)("p",{className:h.hint,children:r("visibilityNoMigration")}),(!l||!c)&&(0,s.jsx)("p",{className:h.hint,children:r("modeReadFirst")}),m&&(0,s.jsx)("p",{className:h.hint,children:r("closeBeforeMode")}),c&&!f&&(0,s.jsx)("p",{className:h.hint,children:r("modeControlPending")}),(0,s.jsx)("div",{children:(0,s.jsx)(K.Button,{variant:"outline",disabled:p||i===e.voiceSession.visibility||i==="workspace"&&!u?.workspace?.supported,onClick:()=>{o(t,"set-visibility",{revision:e.revision,visibility:i})},children:r(i==="workspace"?"saveWorkspace":"saveHidden")})})]})}function Lh({value:e,onChange:n,capability:t,disabled:o,t:r,captureBindings:i,sessionId:a,active:l}){let[c,u]=(0,R.useState)(!1),[d,m]=(0,R.useState)(!1),[f,p]=(0,R.useState)(null),y=(0,R.useRef)(null),v=(0,R.useRef)(0),b=(0,R.useRef)(null),x=(0,R.useRef)(!0),C=async E=>{v.current++,x.current&&u(!1);let $=y.current;if($){x.current&&m(!0);try{await i($.sessionId,{operation:"end",token:$.token}),y.current===$&&(y.current=null),x.current&&E&&n(E),x.current&&p(null)}catch(z){x.current&&p(String(z.message||z))}finally{x.current&&m(!1)}}},B=async()=>{if(y.current||d)return;let E=++v.current;m(!0),p(null);try{let $=await i(a,{operation:"begin"});if(y.current={...$,sessionId:a},!x.current||E!==v.current){await C();return}u(!0),b.current?.focus()}catch($){x.current&&p(String($.message||$))}finally{x.current&&m(!1)}};(0,R.useEffect)(()=>(x.current=!0,()=>{x.current=!1,C()}),[]),(0,R.useEffect)(()=>{(!l||o)&&(v.current++,C())},[l,o,a]),(0,R.useEffect)(()=>{if(!c)return;let E=null,$=!1,z=!1,M=N=>{z||(z=!0,C(N))},A=N=>{if(N.preventDefault(),N.stopPropagation(),N.code==="Escape"){E=null;return}N.repeat||["ControlLeft","ControlRight","AltLeft","AltRight","ShiftLeft","ShiftRight"].includes(N.code)||(E=td(N),$=!1,p(E?null:r("bindingUnsupported")))},k=N=>{if(N.preventDefault(),N.stopPropagation(),N.code==="Escape"){M();return}E&&(N.code===E.code&&($=!0),$&&!N.ctrlKey&&!N.altKey&&!N.shiftKey&&M(E))},P=()=>M(),V=()=>{document.hidden&&P()};window.addEventListener("keydown",A,!0),window.addEventListener("keyup",k,!0),window.addEventListener("blur",P),document.addEventListener("visibilitychange",V);let S=setTimeout(P,1e4);return()=>{clearTimeout(S),window.removeEventListener("keydown",A,!0),window.removeEventListener("keyup",k,!0),window.removeEventListener("blur",P),document.removeEventListener("visibilitychange",V)}},[c]);let D=e?[...e.modifiers||[],e.code].join(" + "):r("bindingOff");return(0,s.jsxs)("section",{className:h.keyBinding,children:[(0,s.jsx)("h3",{children:r("keyboardBinding")}),(0,s.jsxs)("div",{className:h.keyBindingRow,children:[(0,s.jsx)("span",{children:D}),(0,s.jsxs)("div",{className:h.actions,children:[(0,s.jsx)(K.Button,{variant:"outline",ref:b,onBlur:()=>{c&&C()},disabled:o||d||!t?.supported||!i,onClick:()=>c?void C():void B(),children:d?"\u6B63\u5728\u4EA4\u63A5\u2026":c?"\u53D6\u6D88\u5F55\u5165":"\u5F55\u5165\u6309\u952E"}),e&&(0,s.jsx)(K.Button,{variant:"outline",disabled:o||d||c,onClick:()=>n(null),children:r("clearBinding")}),y.current&&!c&&!d&&(0,s.jsx)(K.Button,{variant:"outline",onClick:()=>{C()},children:"\u6062\u590D\u539F\u6309\u952E"})]})]}),c&&(0,s.jsx)("p",{role:"status",className:h.notice,children:"\u6309\u952E\u8BF4\u8BDD\u5DF2\u6682\u505C\u3002\u8BF7\u6309\u4E0B\u7EC4\u5408\u952E\u540E\u5168\u90E8\u677E\u5F00\uFF1BEsc \u53D6\u6D88\u3002"}),!t?.supported&&(0,s.jsx)("p",{className:h.hint,children:t?.reason||r("bindingUnavailable")}),f&&(0,s.jsx)("p",{role:"alert",children:f})]})}function Hd({value:e,t:n}){let t={fast:"performanceNoThinking",balanced:"performanceRecommended"}[e];return(0,s.jsxs)("span",{className:h.performanceChoice,children:[n("performance_"+e),t&&(0,s.jsxs)(s.Fragment,{children:[" ",(0,s.jsx)("small",{children:n(t)})]})]})}function Fi(e,n){let t=e?.modes?.find(o=>o.performanceMode===n);return!t||t.available?null:t.reason==="provider_unsupported"?"performanceUnavailable":t.reason==="unknown"?"performanceProbeUnknown":n==="fast"?"performanceFastUnavailable":"performanceHostUnavailable"}function jd({capability:e,t:n,compact:t=!1,pending:o=!1,error:r=null}){let i=e?.modes??[],a=i.map(v=>v.reason),l=e?.probe?.status,c=l==="unknown"||a.includes("unknown"),u=o||l==="pending"||l==="running",d=!t&&(l==="accepted"||a.includes("accepted")),m=!t&&a.includes("explicit_off"),f=i.some(v=>v.performanceMode==="fast"&&!v.available&&v.reason==="host_contract_blocked"),p=a.includes("provider_unsupported"),y=i.some(v=>v.performanceMode!=="fast"&&!v.available&&v.reason==="host_contract_blocked");if(!c&&!u&&!d&&!m&&!f&&!p&&!y&&!r)return null;if(t){let v=r||n(u?"performanceProbePending":f?"performanceFastUnavailable":p?"performanceUnavailable":c?"performanceProbeUnknown":"performanceHostUnavailable");return(0,s.jsx)("div",{role:"status",className:h.quickHint,"data-whale-probe-status":!0,title:v,children:v})}return(0,s.jsxs)("div",{role:"status",className:h.hint,"data-whale-probe-status":!0,children:[u&&(0,s.jsx)("p",{children:n("performanceProbePending")}),r&&(0,s.jsx)("p",{"data-whale-probe-error":!0,children:r}),f&&(0,s.jsx)("p",{children:n("performanceFastUnavailable")}),p&&(0,s.jsx)("p",{children:n("performanceUnavailable")}),y&&(0,s.jsx)("p",{children:n("performanceHostUnavailable")}),c&&(0,s.jsx)("p",{children:n("performanceProbeUnknown")}),d&&(0,s.jsx)("p",{children:n("performanceProbeAccepted")}),m&&(0,s.jsx)("p",{children:n("performanceFastHint")})]})}function Hh({state:e,sessionId:n,run:t,t:o,markSettingsEdited:r}){let i=e.settings,a=i?.voiceSession?.performanceMode??null,[l,c]=(0,R.useState)(a),u=br(e,n),d=e.performanceFor===n?e.performance:null,m=d?.modes?.find(p=>p.performanceMode===l),f=e.busy||e.performancePending||e.uncertain||!u||!l||l!=="compatibility"&&!m?.available;return u?(0,s.jsxs)("section",{className:h.section,"data-whale-performance":!0,"data-settings-draft":"set-performance-mode",children:[(0,s.jsx)("h3",{children:o("performanceTitle")}),(0,s.jsx)("p",{className:h.hint,children:o("performanceHint")}),(0,s.jsx)("p",{className:h.hint,"data-whale-probe-cost":!0,children:"\u90E8\u5206\u6A21\u578B\u7684\u68C0\u6D4B\u4F1A\u53D1\u9001\u8BA1\u8D39\u77ED\u8BF7\u6C42\u3002"}),(0,s.jsxs)("details",{className:h.details,children:[(0,s.jsx)("summary",{children:"\u68C0\u6D4B\u8303\u56F4\u4E0E\u8D39\u7528"}),(0,s.jsx)("p",{children:o("performanceProbeCost")}),(0,s.jsx)("p",{children:o("performanceProbeScope")})]}),(0,s.jsx)(jd,{capability:d,t:o,pending:e.performancePending,error:e.performanceError}),!d&&(0,s.jsx)("p",{className:h.hint,children:o("performanceReadFirst")}),a&&(0,s.jsxs)("p",{className:h.hint,children:["\u5F53\u524D\uFF1A",o("performance_"+a)]}),(0,s.jsx)("div",{className:h.segmented,children:["fast","balanced","high","compatibility"].map(p=>{let y=p==="compatibility"?null:d?Fi(d,p):"performanceReadFirst";return(0,s.jsx)(K.Button,{title:y?o(y):void 0,"aria-pressed":l===p,disabled:e.busy||e.performancePending||!!y,onClick:()=>{r?.("set-performance-mode"),c(p)},children:(0,s.jsx)(Hd,{value:p,t:o})},p)})}),(0,s.jsxs)("div",{className:h.actions,children:[(0,s.jsx)(K.Button,{variant:"outline",disabled:e.busy||e.performancePending,onClick:()=>{t(n,"inspect-performance")},children:o("inspectPerformance")}),(0,s.jsx)(K.Button,{variant:"outline",disabled:f||l===a,onClick:()=>{t(n,"set-performance-mode",{revision:i.revision,performanceMode:l})},children:o("savePerformance")})]})]}):null}function jh({state:e,sessionId:n,run:t,t:o}){let r=e.outputVolumeFor===n?e.outputVolume:null,[i,a]=(0,R.useState)(null),[l,c]=(0,R.useState)(null),u=i??r?.volume??1,d=i!==null&&l!==r?.revision;return(0,R.useEffect)(()=>{a(null),c(null)},[n]),(0,s.jsxs)("section",{className:h.section,children:[(0,s.jsx)("h3",{children:o("outputVolume")}),r&&!r.supported&&(0,s.jsx)("p",{className:h.hint,children:o("outputVolumeUnavailable")}),r?.supported&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:h.volumeRow,children:[(0,s.jsxs)("label",{className:h.volumeControl,children:[(0,s.jsx)(Ut,{"aria-label":o("outputVolume"),min:"0",max:"1",step:"0.01",value:u,disabled:!r.supported||e.busy||e.outputVolumeUncertain,onChange:m=>{i===null&&c(r.revision),a(Number(m.target.value))}}),(0,s.jsxs)("span",{children:[Math.round(u*100),"%"]})]}),(0,s.jsx)(K.Button,{variant:"outline",disabled:!r.supported||e.busy||e.outputVolumeUncertain||d||i===null,onClick:async()=>{await t(n,"set-output-volume",{revision:l,volume:i})&&a(null)},children:o("saveOutputVolume")})]}),(0,s.jsx)("p",{className:h.hint,children:"\u4E0B\u4E00\u6BB5\u64AD\u653E\u751F\u6548"})]}),d&&(0,s.jsxs)("p",{role:"status",className:h.notice,children:["\u97F3\u91CF\u5DF2\u5728\u522B\u5904\u66F4\u65B0\uFF0C\u5F53\u524D\u9009\u62E9\u5DF2\u4FDD\u7559\u3002",(0,s.jsx)(K.Button,{variant:"outline",disabled:e.busy,onClick:()=>a(null),children:"\u4F7F\u7528\u5F53\u524D\u97F3\u91CF"})]}),!r&&(0,s.jsx)("p",{role:"status",className:h.hint,children:e.busy?o("pending"):o("statusRetry")}),e.outputVolumeUncertain&&(0,s.jsx)("p",{role:"status",className:h.notice,children:o("outputVolumeUnknown")})]})}function Gh({state:e,sessionId:n,run:t,markSettingsEdited:o,discardSettingsDraft:r}){let i=e.settingsFor===n?e.settings:null,a=i?.conversationModel??{mode:"auto",provider:null,model:null},[l,c]=(0,R.useState)(a),[u,d]=(0,R.useState)(""),[m,f]=(0,R.useState)(!1),p=(0,R.useRef)(!1),y=(0,R.useRef)(!0);(0,R.useEffect)(()=>(y.current=!0,()=>{y.current=!1}),[]);let v=e.conversationModelsFor===n?e.conversationModels:null,b=v?.providers??[],x=b.find(A=>A.id===l.provider),C=l.mode==="auto"||!!x?.models.some(A=>A.id===l.model),B=JSON.stringify(l)!==JSON.stringify(a),D=e.status,E=e.checkedFor===n&&!e.uncertain&&D?.enabled===!1&&D?.ownerSessionId===null&&D?.voiceControlBusy===!1&&D?.voiceSession?.fullyStopped===!0&&D?.voiceSession?.id===null,$=!i||!E||e.busy||e.settingsConflict||e.visibilityUncertain||m,z=A=>{o?.("save-conversation-model"),c(k=>({...k,...A})),d("")},M=async()=>{if($||p.current||!B||!C)return;p.current=!0,f(!0),d("");let A=await t(n,"save-conversation-model",{revision:i.revision,values:l.mode==="auto"?{mode:"auto",provider:null,model:null}:l});p.current=!1,y.current&&(f(!1),d(A?"\u9ED8\u8BA4\u5DF2\u4FDD\u5B58\uFF0C\u4E0B\u6B21\u5F00\u542F\u8BED\u97F3\u751F\u6548\u3002":"\u4FDD\u5B58\u672A\u6210\u529F\uFF0C\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002\u8BF7\u6838\u67E5\u63D0\u793A\u540E\u518D\u64CD\u4F5C\u3002"))};return(0,s.jsxs)("section",{className:h.section,"data-conversation-model":!0,"data-settings-draft":"save-conversation-model",children:[(0,s.jsx)("h3",{children:"\u9ED8\u8BA4\u5BF9\u8BDD\u6A21\u578B"}),(0,s.jsx)("p",{className:h.hint,children:"\u63A5\u6536\u8BED\u97F3\u8BC6\u522B\u540E\u7684\u6587\u5B57\uFF0C\u7528\u4E8E\u751F\u6210\u56DE\u7B54\u3002"}),(0,s.jsx)("fieldset",{className:h.radios,disabled:$,"aria-label":"\u5BF9\u8BDD\u6A21\u578B\u9009\u62E9\u65B9\u5F0F",children:[["auto","\u81EA\u52A8"],["manual","\u624B\u52A8\u6307\u5B9A"]].map(([A,k])=>(0,s.jsxs)("label",{children:[(0,s.jsx)("input",{type:"radio",name:"conversation-mode-"+n,checked:l.mode===A,onChange:()=>z(A==="auto"?{mode:A,provider:null,model:null}:{mode:A})}),k]},A))}),l.mode==="auto"&&(0,s.jsxs)("div",{className:h.section,children:[(0,s.jsx)("p",{className:h.hint,children:"\u8DDF\u968F\u5F53\u524D\u5BF9\u8BDD\u6240\u9009\u6A21\u578B\u3002\u7A7A\u767D\u9996\u9875\u4F7F\u7528 DSH \u7684\u9ED8\u8BA4\u6A21\u578B\u3002"}),(0,s.jsx)("p",{children:"\u5F00\u542F\u8BED\u97F3\u65F6\u786E\u5B9A\u6A21\u578B\u6765\u6E90"})]}),(0,s.jsx)(Ki,{open:l.mode==="manual",children:(0,s.jsxs)("div",{className:h.section,"data-conversation-manual":!0,children:[(0,s.jsx)(Dd,{label:"\u4F9B\u5E94\u5546",value:l.provider,options:b,disabled:$||!v,onChange:A=>z({provider:A,model:null})}),(0,s.jsx)(Dd,{label:"\u6A21\u578B",value:l.model,options:x?.models??[],disabled:$||!x,onChange:A=>z({model:A})}),(0,s.jsx)("p",{className:h.hint,children:"\u4EC5\u5217\u51FA\u5BBF\u4E3B\u5DF2\u914D\u7F6E\u7684\u5BF9\u8BDD\u4F9B\u5E94\u5546\u4E0E\u6A21\u578B\uFF0C\u4FDD\u5B58\u65F6\u518D\u6B21\u9A8C\u8BC1\u3002"}),!v&&(0,s.jsx)("p",{role:"status",children:e.conversationModelsError?"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u4F9B\u5E94\u5546\uFF0C\u8BF7\u91CD\u8BD5\u3002":"\u6B63\u5728\u8BFB\u53D6\u4F9B\u5E94\u5546\u2026"}),v&&!b.length&&(0,s.jsx)("p",{role:"status",children:"\u6682\u65E0\u53EF\u7528\u5BF9\u8BDD\u6A21\u578B\uFF0C\u8BF7\u5148\u5728 DSH \u4E2D\u914D\u7F6E\u4F9B\u5E94\u5546\u3002"}),l.provider&&!C&&(0,s.jsx)("p",{role:"status",children:"\u8BF7\u9009\u62E9\u5F53\u524D\u53EF\u7528\u7684\u4F9B\u5E94\u5546\u4E0E\u6A21\u578B\u3002\u539F\u9009\u62E9\u4E0D\u4F1A\u81EA\u52A8\u66FF\u6362\u3002"}),(0,s.jsx)(K.Button,{variant:"outline",disabled:e.busy,onClick:()=>{t(n,"conversation-models")},children:"\u5237\u65B0\u4F9B\u5E94\u5546"})]})}),(0,s.jsxs)("div",{className:h.actions,children:[(0,s.jsx)(K.Button,{variant:"primary",disabled:$||!B||!C,onClick:()=>{M()},children:m?"\u4FDD\u5B58\u4E2D\u2026":"\u4FDD\u5B58\u9ED8\u8BA4"}),(0,s.jsx)(K.Button,{variant:"outline",disabled:$||!B,onClick:()=>{c(a),d(""),r?.("save-conversation-model")},children:"\u53D6\u6D88\u4FEE\u6539"})]}),(0,s.jsx)("p",{role:"status",className:h.hint,children:u||(B?"\u5C1A\u672A\u4FDD\u5B58":a.mode==="auto"?"\u5DF2\u4FDD\u5B58\uFF1A\u81EA\u52A8 \xB7 \u8DDF\u968F\u5F53\u524D\u5BF9\u8BDD":`\u5DF2\u4FDD\u5B58\uFF1A${a.provider} / ${a.model}`)})]})}function Dd({label:e,value:n,options:t,disabled:o,onChange:r}){let[i,a]=(0,R.useState)(!1),[l,c]=(0,R.useState)(0),u=(0,R.useRef)(null),d=(0,R.useRef)(null),m=(0,R.useRef)(null),f=(0,R.useId)(),p=t.find(b=>b.id===n);(0,R.useEffect)(()=>{o&&a(!1)},[o]),(0,R.useEffect)(()=>{i&&m.current?.querySelector('[data-option-index="'+l+'"]')?.focus()},[i,l]);let y=()=>{a(!1),d.current?.focus()},v=b=>{r(b.id),y()};return(0,s.jsxs)("div",{ref:u,className:h.conversationChoice,onBlur:b=>{b.currentTarget.contains(b.relatedTarget)||a(!1)},children:[(0,s.jsx)("span",{id:f+"-label",children:e}),(0,s.jsxs)(K.Button,{ref:d,variant:"outline",className:h.deviceSelect,"aria-label":e,"aria-haspopup":"listbox","aria-expanded":i,"aria-controls":f,disabled:o||!t.length,onClick:()=>{c(Math.max(0,t.findIndex(b=>b.id===n))),a(!i)},onKeyDown:b=>{["ArrowDown","ArrowUp"].includes(b.key)&&(b.preventDefault(),c(Math.max(0,t.findIndex(x=>x.id===n))),a(!0))},children:[p?.name||n||"\u8BF7\u9009\u62E9",(0,s.jsx)("span",{"aria-hidden":"true",children:"\u2304"})]}),i&&(0,s.jsx)(K.MenuSurface,{ref:m,id:f,className:h.conversationOptions,role:"listbox","aria-labelledby":f+"-label",onKeyDown:b=>{b.key==="Escape"?(b.preventDefault(),b.stopPropagation(),y()):["ArrowDown","ArrowUp","Home","End"].includes(b.key)&&(b.preventDefault(),c(x=>b.key==="Home"?0:b.key==="End"?t.length-1:(x+(b.key==="ArrowDown"?1:-1)+t.length)%t.length))},children:t.map((b,x)=>(0,s.jsxs)("button",{type:"button",role:"option","aria-selected":n===b.id,tabIndex:x===l?0:-1,"data-option-index":x,onClick:()=>v(b),children:[b.name,n===b.id&&(0,s.jsx)("span",{"aria-hidden":"true",children:" \u2713"})]},b.id))})]})}function qh({state:e,sessionId:n,run:t,markSettingsEdited:o,discardSettingsDraft:r,t:i}){let a=e.settingsFor===n?e.settings:null,l=a?.voicePrompt,c=l?.text??"",[u,d]=(0,R.useState)(c),[m,f]=(0,R.useState)(!1),[p,y]=(0,R.useState)(""),v=(0,R.useRef)(!1),b=(0,R.useRef)(!0),x=(0,R.useRef)(c),C=(0,R.useId)();(0,R.useEffect)(()=>(b.current=!0,()=>{b.current=!1}),[]),(0,R.useEffect)(()=>{if(x.current!==c){let P=x.current;d(V=>V===P?c:V),x.current=c}},[c]);let B=u.trim()?u:"",D=B!==(c.trim()?c:""),E=e.status,$=e.checkedFor===n&&!e.uncertain&&E?.enabled===!1&&E?.ownerSessionId===null&&E?.voiceControlBusy===!1&&E?.voiceSession?.fullyStopped===!0&&E?.voiceSession?.id===null,z=!a||!$||e.busy||e.settingsConflict||e.visibilityUncertain||m,M=!!B&&l?.customSupported!==!0,A=u.length<=32768&&!M,k=async()=>{if(z||v.current||!D||!A)return;v.current=!0,f(!0),y("");let P=!1;try{P=await t(n,"save-voice-prompt",{revision:a.revision,values:{text:B}})}catch{P=!1}finally{v.current=!1,b.current&&(f(!1),y(i(P?"voicePromptSaved":"voicePromptSaveFailed")))}};return(0,s.jsxs)("section",{className:`${h.section} ${h.voicePrompt}`,"data-voice-prompt":!0,"data-settings-draft":"save-voice-prompt",children:[(0,s.jsxs)("label",{htmlFor:C,children:[i("voicePromptLabel")," ",(0,s.jsx)("span",{className:h.hint,children:i("voicePromptOptional")})]}),(0,s.jsx)("textarea",{id:C,className:h.voicePromptInput,value:u,maxLength:32768,disabled:z,placeholder:i("voicePromptPlaceholder"),"aria-describedby":C+"-count "+C+"-feedback",onChange:P=>{o?.("save-voice-prompt"),d(P.target.value),y("")}}),(0,s.jsxs)("div",{id:C+"-count",className:h.voicePromptCount,children:[u.length.toLocaleString("en-US")," / 32,768"]}),(0,s.jsxs)("div",{className:h.voicePromptActions,children:[(0,s.jsxs)("div",{className:h.actions,children:[(0,s.jsx)(K.Button,{variant:"primary",disabled:z||!D||!A,onClick:()=>{k()},children:i(m?"voicePromptSaving":"voicePromptSave")}),(0,s.jsx)(K.Button,{variant:"outline",disabled:z||u===c,onClick:()=>{d(c),y(""),r?.("save-voice-prompt")},children:i("voicePromptCancel")})]}),(0,s.jsx)("span",{className:h.hint,children:i("voicePromptStopToEdit")})]}),(0,s.jsx)("p",{id:C+"-feedback",role:"status",className:h.hint,children:p||(u.length>32768?i("voicePromptTooLong"):l?.customSupported===!1||M?i("voicePromptUnsupported"):D?i("voicePromptUnsaved"):"")})]})}var Xy=Object.freeze({version:1,available:!1,reason:"planned"}),Mt=["audio","interaction","prompt","models","advanced","sessions","pets"],Wh={audio:"\u9009\u62E9\u9EA6\u514B\u98CE\u3001\u8BF4\u8BDD\u65B9\u5F0F\u4E0E\u63D0\u793A\u97F3\u3002",interaction:"\u8BBE\u7F6E\u6309\u952E\u3001\u56DE\u7B54\u901F\u5EA6\u4E0E\u754C\u9762\u52A8\u753B\u3002",prompt:"\u8BBE\u7F6E\u8BED\u97F3\u5BF9\u8BDD\u7684\u8868\u8FBE\u65B9\u5F0F\u3002",models:"\u9009\u62E9\u6717\u8BFB\u65B9\u5F0F\uFF0C\u6216\u7BA1\u7406\u672C\u5730\u6A21\u578B\u3002",advanced:"\u67E5\u770B\u6743\u9650\u3001\u8BF7\u6C42\u4E0E\u8FD0\u884C\u8BE6\u60C5\u3002",sessions:"\u9009\u62E9\u8BED\u97F3\u5BF9\u8BDD\u76EE\u6807\uFF0C\u67E5\u770B\u9C7C\u5E94\u4F1A\u8BDD\u548C\u5B50\u4EE3\u7406\u3002",pets:"\u684C\u5BA0\u529F\u80FD\u5C1A\u672A\u5F00\u653E\u3002"};function Kh(e){let{t:n,sessionId:t}=e,o=e.useWhaleUi(M=>M),r=e.useWhalePreferences(M=>M),i=o.settingsTab||"audio",a=o.settingsModelTab||"conversation",[l,c]=(0,R.useState)(()=>new Set([o.settingsTab||"audio"])),[u,d]=(0,R.useState)(()=>new Set([o.settingsModelTab||"conversation"])),[m,f]=(0,R.useState)(0),p=(0,R.useRef)(null),y=(0,R.useRef)(null),v=(0,R.useRef)(0),b=(0,R.useRef)(new Set),x=(0,R.useRef)(o.readRefresh),C=(0,R.useId)();(0,R.useLayoutEffect)(()=>{p.current&&(p.current.scrollTop=0)},[i,a]),(0,R.useEffect)(()=>{e.setSession?.(t)},[t]),(0,R.useEffect)(()=>()=>{v.current++,e.cancelPreview?.(),e.discardDiagnostics?.()},[]),(0,R.useEffect)(()=>{b.current.clear()},[t,i,a]),(0,R.useEffect)(()=>{i==="models"&&e.refreshModelCompute?.(t)},[t,i,a]),(0,R.useEffect)(()=>{if(o.busy||o.ttsCancelling||["pets","sessions"].includes(i))return;let M=e.readState?.();if(M?.busy||M?.ttsCancelling)return;if(x.current!==o.readRefresh){x.current=o.readRefresh;for(let V of["read-output-volume","model-installer","agent-requests"])b.current.delete(V)}let P=[...!o.settings||o.settingsFor!==t?["read-settings"]:[],...!o.status||o.checkedFor!==t||i==="advanced"?["status"]:[],...i==="audio"?["read-output-volume"]:[],...i==="models"&&a==="conversation"?["conversation-models"]:[],...t&&i==="advanced"?["agent-requests"]:[],...t&&i==="interaction"&&o.performanceFor!==t?["inspect-performance"]:[],...i==="models"&&a==="voice"&&(!o.ttsCapabilities||o.ttsCapabilitiesFor!==t)?["inspect-tts"]:[],...i==="models"?["model-installer"]:[]].find(V=>!b.current.has(V));P&&(b.current.add(P),e.run(t,P,{},!0))},[t,i,a,o.readRefresh,o.busy,o.ttsCancelling,o.settingsFor,o.checkedFor,o.outputVolumeFor,o.agentRequestsFor,o.performanceFor,o.ttsCapabilitiesFor,o.installerFor]);let B=async(M,A=!1)=>{let k=++v.current;e.cancelPreview&&!await e.cancelPreview()||(e.discardDiagnostics?.(),k===v.current&&(c(P=>new Set([...P,M])),e.setSettingsTab(M),A&&y.current?.querySelector(`[data-settings-tab="${M}"]`)?.focus({preventScroll:!0})))},D=async M=>{let A=++v.current;e.cancelPreview&&!await e.cancelPreview()||(e.discardDiagnostics?.(),A===v.current&&(d(k=>new Set([...k,M])),e.setSettingsModelTab(M)))},E=o.settingsFor===t?o.settings:null,$=!o.uncertain&&o.checkedFor===t,z=E&&(0,s.jsx)(Bh,{settings:E,sessionId:t,busy:o.busy||o.visibilityUncertain||o.settingsConflict,run:e.run,t:n,status:o.status,statusFresh:$,verified:$&&!!o.status,tab:i,markSettingsEdited:e.markSettingsEdited,discardSettingsDraft:e.discardSettingsDraft,bindingError:o.bindingError,captureBindings:e.captureBindings},t+":"+(o.settingsKey??E.revision));return(0,s.jsxs)("div",{className:h.settings,"data-whale-settings":!0,"data-motion":r.motion,children:[(0,s.jsxs)("header",{className:h.settingsHeader,"data-settings-header":!0,children:[(0,s.jsxs)(K.Button,{className:h.backButton,"data-whale-operation":"page-home",onClick:e.showHome,"aria-label":"\u8FD4\u56DE\u8BED\u97F3",children:[(0,s.jsx)(He,{name:"chevron",className:h.backIcon}),(0,s.jsx)("span",{children:"\u8FD4\u56DE\u8BED\u97F3"})]}),(0,s.jsxs)("div",{className:h.settingsBrand,children:[(0,s.jsx)(Yn,{small:!0}),(0,s.jsx)("h2",{children:n("settingsTitle")})]}),(0,s.jsx)(K.Button,{className:h.guideButton,"data-whale-operation":"page-setup",onClick:e.openSetup,"aria-label":"\u91CD\u65B0\u6253\u5F00\u914D\u7F6E\u5F15\u5BFC",title:"\u91CD\u65B0\u6253\u5F00\u914D\u7F6E\u5F15\u5BFC",children:"\u914D\u7F6E\u5F15\u5BFC"})]}),(0,s.jsxs)("div",{className:h.settingsLayout,children:[(0,s.jsx)("nav",{ref:y,className:h.settingsNav,"data-settings-nav":!0,"aria-label":n("settingsSections"),onKeyDown:M=>{let A=Mt.indexOf(M.target.dataset.settingsTab);if(A<0||!["ArrowDown","ArrowUp","ArrowLeft","ArrowRight","Home","End"].includes(M.key))return;M.preventDefault();let k=M.key==="Home"?0:M.key==="End"?Mt.length-1:(A+(["ArrowDown","ArrowRight"].includes(M.key)?1:-1)+Mt.length)%Mt.length;B(Mt[k],!0)},children:Mt.map(M=>(0,s.jsx)(K.Button,{"data-settings-tab":M,"aria-pressed":i===M,"aria-controls":C+"-body",onClick:()=>{B(M)},children:n("tab_"+M)},M))}),(0,s.jsxs)("div",{className:h.settingsPage,children:[(0,s.jsxs)("div",{className:`${h.pageHeading} ${i==="models"?h.modelHeading:""}`,"data-settings-page-heading":!0,"data-no-drag":!0,children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{id:C,children:n("tab_"+i)}),i!=="models"&&(0,s.jsx)("p",{children:Wh[i]})]}),i==="prompt"&&E&&(0,s.jsx)("span",{className:h.voicePromptMode,"data-voice-prompt-mode":!0,children:n(E.voicePrompt?.mode==="custom"&&E.voicePrompt?.customSupported===!0?"voicePromptCustom":"voicePromptAgents")}),i==="models"&&(0,s.jsx)("nav",{className:h.modelNav,"aria-label":"\u6A21\u578B\u8BBE\u7F6E\u5206\u7C7B","data-no-drag":!0,children:[["conversation","\u5BF9\u8BDD\u6A21\u578B"],["voice","\u6717\u8BFB\u65B9\u5F0F"],["download","\u6A21\u578B\u4E0B\u8F7D"],["paths","\u9AD8\u7EA7\u8DEF\u5F84"]].map(([M,A])=>(0,s.jsx)(K.Button,{"aria-pressed":a===M,onClick:()=>{D(M)},children:A},M))})]}),(0,s.jsxs)("div",{ref:p,id:C+"-body",className:h.settingsBody,"data-settings-body":!0,"data-no-drag":!0,onChangeCapture:M=>{let A=M.target.closest("[data-settings-draft]");A&&!M.target.closest("[data-no-settings-draft]")&&e.markSettingsEdited?.(A.dataset.settingsDraft)},tabIndex:0,"aria-label":n("settingsContent"),children:[i==="sessions"?(0,s.jsxs)(s.Fragment,{children:[e.listExistingVoiceSessions&&!o.sessionManagementRoot&&(0,s.jsx)(Ri,{...e,state:o}),(0,s.jsx)(Xh,{...e,state:o})]}):i==="pets"?(0,s.jsxs)("section",{className:h.placeholder,"data-whale-pet":!0,"aria-label":n("tab_pets"),children:[(0,s.jsx)(He,{name:"pet"}),(0,s.jsx)("h3",{children:n("tab_pets")}),(0,s.jsx)("p",{children:n("planned")})]}):(0,s.jsxs)(s.Fragment,{children:[o.error&&(0,s.jsx)("div",{role:"alert",className:h.error,children:n("operationUnavailable")}),o.settingsConflict&&(0,s.jsxs)("p",{role:"status",className:h.notice,children:["\u8BBE\u7F6E\u5DF2\u5728\u522B\u5904\u66F4\u65B0\uFF0C\u5F53\u524D\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002",(0,s.jsx)(K.Button,{variant:"outline",disabled:o.busy,onClick:()=>e.discardSettingsDraft?.(),children:"\u653E\u5F03\u8349\u7A3F\u5E76\u4F7F\u7528\u6700\u65B0\u8BBE\u7F6E"})]}),o.visibilityUncertain&&(0,s.jsx)("p",{role:"status",className:h.notice,children:n("configurationUnknown")}),!E&&(0,s.jsx)("p",{role:"status",className:h.hint,children:o.busy?"\u6B63\u5728\u8BFB\u53D6\u8BBE\u7F6E\u2026":"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u8BBE\u7F6E\u3002\u8FD4\u56DE\u7A97\u53E3\u65F6\u4F1A\u81EA\u52A8\u6838\u67E5\u3002"}),i!=="interaction"&&$&&!(i==="models"&&a==="download")&&(o.status?.enabled||o.status?.ownerSessionId)&&(0,s.jsxs)("div",{className:h.editNotice,role:"status",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("strong",{children:"\u8BED\u97F3\u6B63\u5728\u4F7F\u7528"}),(0,s.jsx)("span",{children:" \xB7 \u505C\u6B62\u540E\u53EF\u4FEE\u6539\u76F8\u5173\u8BBE\u7F6E"})]}),(0,s.jsx)(K.Button,{variant:"outline",disabled:o.busy&&(!o.interruptibleRead||o.diagnosticStopPending)||o.ttsCancelling,onClick:()=>{e.run(t,"disable")},children:"\u505C\u6B62\u8BED\u97F3\u4EE5\u7F16\u8F91"})]})]}),(0,s.jsx)("div",{hidden:!["audio","interaction","advanced"].includes(i),children:z}),(i==="audio"||l.has("audio"))&&(0,s.jsx)("div",{hidden:i!=="audio",children:(0,s.jsx)(jh,{...e,state:o})}),(i==="interaction"||l.has("interaction"))&&(0,s.jsxs)("div",{hidden:i!=="interaction",children:[E&&(0,s.jsx)(Hh,{...e,state:o},"performance:"+t+":"+(o.settingsKey??E.revision)),(0,s.jsxs)("section",{className:h.section,children:[(0,s.jsx)("h3",{children:n("motionTitle")}),(0,s.jsx)("div",{className:h.segmented,children:["spring","firm","off"].map(M=>(0,s.jsx)(K.Button,{"aria-pressed":r.motion===M,onClick:()=>{e.setMotion(M),f(m+1)},children:n("motion_"+M)},M))}),(0,s.jsx)("div",{className:h.motionPreview,"aria-hidden":"true",children:(0,s.jsx)(Yn,{small:!0})},m),(0,s.jsx)("p",{className:h.hint,children:n("motionHint")}),r.error&&(0,s.jsx)("p",{role:"status",children:n("motionNotSaved")})]})]}),(i==="prompt"||l.has("prompt"))&&E&&(0,s.jsx)("div",{hidden:i!=="prompt",children:(0,s.jsx)(qh,{...e,state:o},"prompt:"+t+":"+(o.settingsKey??E.revision))}),(i==="models"||l.has("models"))&&(0,s.jsxs)("div",{hidden:i!=="models",children:[E&&(a==="conversation"||u.has("conversation"))&&(0,s.jsx)("div",{"data-whale-tab-panel":!0,hidden:a!=="conversation",children:(0,s.jsx)(Gh,{...e,state:o},"conversation:"+t+":"+(o.settingsKey??E.revision))}),(a==="voice"||u.has("voice"))&&(0,s.jsx)("div",{"data-whale-tab-panel":!0,hidden:a!=="voice",children:(0,s.jsx)(Id,{pickPath:e.pickPath,state:o,sessionId:t,run:e.run,markSettingsEdited:e.markSettingsEdited,prepared:!0,active:i==="models"&&a==="voice"})}),(a==="download"||u.has("download"))&&(0,s.jsx)("div",{"data-whale-tab-panel":!0,hidden:a!=="download",children:(0,s.jsx)(Md,{state:o,sessionId:t,run:e.run})}),E?.modelSetup&&(0,s.jsx)(Fh,{modelTab:a,markSettingsEdited:e.markSettingsEdited,pickPath:e.pickPath,senseVoiceAsrAction:e.senseVoiceAsrAction,active:i==="models",settings:E,sessionId:t,busy:o.busy||o.visibilityUncertain||o.settingsConflict,run:e.run,t:n},t+":"+(o.settingsKey??E.revision)),(a==="paths"||u.has("paths"))&&(0,s.jsx)("div",{"data-whale-tab-panel":!0,hidden:a!=="paths",children:(0,s.jsx)($d,{state:o,sessionId:t,run:e.run,pickPath:e.pickPath,active:i==="models"&&a==="paths"})})]}),(i==="advanced"||l.has("advanced"))&&(0,s.jsxs)("div",{hidden:i!=="advanced",children:[e.updateAction&&(0,s.jsx)(hd,{state:o,open:e.openUpdate,t:n}),(0,s.jsxs)("section",{className:h.section,"aria-label":n("projectInfoTitle"),children:[(0,s.jsx)("h3",{children:n("projectInfoTitle")}),(0,s.jsxs)("dl",{className:h.details,children:[(0,s.jsx)("dt",{children:n("projectAuthor")}),(0,s.jsx)("dd",{children:(0,s.jsx)("a",{href:Di.url,target:"_blank",rel:"noreferrer noopener",children:Di.name})}),(0,s.jsx)("dt",{children:n("projectRepository")}),(0,s.jsx)("dd",{children:(0,s.jsxs)("a",{href:md,target:"_blank",rel:"noreferrer noopener",children:["Emikosama/",pr]})}),(0,s.jsx)("dt",{children:n("projectNpm")}),(0,s.jsx)("dd",{children:(0,s.jsx)("a",{href:`https://www.npmjs.com/package/${pr}`,target:"_blank",rel:"noreferrer noopener",children:pr})})]})]}),(0,s.jsx)(Qh,{...e,state:o,active:i==="advanced"}),(0,s.jsx)(yd,{readOperationLog:e.readOperationLog}),(0,s.jsx)(Yh,{state:o,sessionId:t,t:n}),(0,s.jsxs)("details",{className:h.section,children:[(0,s.jsx)("summary",{children:"\u5BF9\u8BDD\u663E\u793A\u4E0E\u517C\u5BB9\u6027"}),E?.voiceSession&&(0,s.jsx)(Uh,{settings:E,state:o,sessionId:t,run:e.run,t:n},"visibility:"+t+":"+(o.settingsKey??E.revision))]})]})]})]})]})]})}var Jh=new Intl.DateTimeFormat("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"});function Xh({manageSessions:e,openManagedSession:n,renameManagedSession:t,setSessionManagement:o,state:r}){let i=r.sessionManagementRoot??null,[a,l]=(0,R.useState)(null),[c,u]=(0,R.useState)(null),[d,m]=(0,R.useState)(!1),[f,p]=(0,R.useState)(null),[y,v]=(0,R.useState)(null),b=(0,R.useRef)(null),x=(0,R.useCallback)(async(V,{append:S=!1}={})=>{if(!e)return;b.current?.abort();let N=new AbortController;b.current=N,m(!0),p(null);try{V.operation!=="list"&&(await e(V,N.signal),N.signal.aborted||p(V.operation==="restore"?"\u5DF2\u53D6\u6D88\u5F52\u6863\u3002\u53EF\u6253\u5F00\u539F\u4F1A\u8BDD\u7EE7\u7EED\u3002":"\u5DF2\u516C\u5F00\u6B64\u4F1A\u8BDD\u3002"));let I=await e(V.operation==="list"?V:{operation:"list",...i?{rootId:i}:{}},N.signal);if(N.signal.aborted||b.current!==N)return;l(G=>S&&G?{...I,items:[...new Map([...G.items,...I.items].map(L=>[L.id,L])).values()]}:I)}catch(I){N.signal.aborted||p(String(I?.message??"\u65E0\u6CD5\u8BFB\u53D6\u9C7C\u5E94\u4F1A\u8BDD").slice(0,400))}finally{b.current===N&&(b.current=null,m(!1))}},[i,e]);(0,R.useEffect)(()=>(x({operation:"list",...i?{rootId:i}:{}}),()=>{let V=b.current;b.current=null,V?.abort()}),[x,i]);let C=V=>{l(null),u(null),v(null),o({rootId:V,historyOpen:!1})},B=(V,S)=>{v(null),u({operation:V,id:S.id,rootId:S.rootId})},D=async V=>{try{await n(V)}catch(S){p(String(S?.message??"\u65E0\u6CD5\u5728 DSH \u6253\u5F00\u4F1A\u8BDD").slice(0,400))}},E=async V=>{V.preventDefault();let S=y.title.trim();if(!(!S||d)){m(!0),p(null);try{let N=await t(y.id,S);l(I=>I&&{...I,items:I.items.map(G=>G.id===y.id?{...G,title:N}:G)}),v(null),p("\u5DF2\u4FDD\u5B58\u4F1A\u8BDD\u540D\u79F0\u3002")}catch(N){p(String(N?.message??"\u65E0\u6CD5\u91CD\u547D\u540D\u4F1A\u8BDD").slice(0,400))}finally{m(!1)}}},$=i?a?.items?.find(V=>V.id===i):null,z={restore_unavailable:"\u6062\u590D\u63A5\u53E3\u4E0D\u53EF\u7528",archive_state_unavailable:"\u65E0\u6CD5\u8BFB\u53D6\u5F52\u6863\u72B6\u6001",persistence_unavailable:"\u4F1A\u8BDD\u5B58\u50A8\u6682\u65F6\u4E0D\u53EF\u7528",policy_mismatch:"\u5F53\u524D\u4F1A\u8BDD\u6743\u9650\u4E0E\u539F\u4F1A\u8BDD\u4E0D\u540C",presentation_mismatch:"\u5F53\u524D DSH \u65E0\u6CD5\u786E\u8BA4\u4F1A\u8BDD\u7684\u9690\u85CF\u72B6\u6001",visibility_mismatch:"\u5F53\u524D\u663E\u793A\u8BBE\u7F6E\u4E0E\u539F\u4F1A\u8BDD\u4E0D\u540C"},M=V=>(0,s.jsx)("ul",{className:h.permissionList,children:V.map(S=>(0,s.jsxs)("li",{children:[(0,s.jsx)("strong",{className:h.sessionTitle,children:S.title||(S.kind==="root"?"\u672A\u547D\u540D\u4F1A\u8BDD":"\u672A\u547D\u540D\u5B50\u4EE3\u7406")+" \xB7 "+S.id.slice(-6).toUpperCase()}),(0,s.jsxs)("p",{className:h.hint,children:[S.archived?"\u5DF2\u5F52\u6863":S.visibility==="hidden"?"\u5DF2\u9690\u85CF":S.visibility==="visible"||S.visibility==="workspace"?"\u53EF\u89C1":"\u53EF\u89C1\u6027\u672A\u77E5",z[S.reason]?" \xB7 "+z[S.reason]:""]}),Number.isFinite(S.createdAt)&&(0,s.jsxs)("p",{className:h.hint,children:["\u521B\u5EFA\u4E8E ",(0,s.jsx)("time",{dateTime:new Date(S.createdAt).toISOString(),children:Jh.format(S.createdAt)})]}),(0,s.jsxs)("div",{className:h.actions,children:[S.kind==="root"&&!i&&(0,s.jsx)(K.Button,{variant:"outline",disabled:d,"data-whale-operation":"show-subagents",onClick:()=>C(S.id),children:"\u67E5\u770B\u5B50\u4EE3\u7406"}),n&&["live","available"].includes(S.status)&&(0,s.jsx)(K.Button,{variant:"outline","data-whale-operation":S.kind==="root"?"open-native-session":"open-native-subagent",onClick:()=>D(S),children:"\u5728 DSH \u6253\u5F00"}),t&&S.kind==="root"&&["live","available","archived"].includes(S.status)&&(0,s.jsx)(K.Button,{variant:"outline",disabled:d,onClick:()=>{u(null),v({id:S.id,title:S.title??""})},children:"\u91CD\u547D\u540D"}),S.canUnhide&&(0,s.jsx)(K.Button,{variant:"outline",disabled:d,onClick:()=>B("unhide",S),children:"\u53D6\u6D88\u9690\u85CF"}),S.canRestore&&(0,s.jsx)(K.Button,{variant:"outline",disabled:d,onClick:()=>B("restore",S),children:"\u6062\u590D\u5F52\u6863"})]}),c?.id===S.id&&(0,s.jsxs)("div",{className:h.actions,children:[(0,s.jsx)("span",{children:c.operation==="unhide"?"\u786E\u8BA4\u5728 DSH \u516C\u5F00\u6B64\u4F1A\u8BDD\uFF1F":"\u786E\u8BA4\u53D6\u6D88\u6B64\u4F1A\u8BDD\u7684\u5F52\u6863\uFF1F"}),(0,s.jsx)(K.Button,{variant:"primary",disabled:d,onClick:()=>{let N=c;u(null),x(N)},children:"\u786E\u8BA4"}),(0,s.jsx)(K.Button,{variant:"outline",onClick:()=>u(null),children:"\u53D6\u6D88"})]}),y?.id===S.id&&(0,s.jsxs)("form",{className:h.sessionRename,onSubmit:E,children:[(0,s.jsx)(K.Input,{"aria-label":"\u4F1A\u8BDD\u540D\u79F0",value:y.title,maxLength:128,disabled:d,onChange:N=>v({...y,title:N.target.value})}),(0,s.jsxs)("div",{className:h.actions,children:[(0,s.jsx)(K.Button,{type:"submit",variant:"primary",disabled:d||!y.title.trim(),children:"\u4FDD\u5B58\u540D\u79F0"}),(0,s.jsx)(K.Button,{type:"button",variant:"outline",disabled:d,onClick:()=>v(null),children:"\u53D6\u6D88"})]})]})]},S.id))}),A=(a?.items??[]).filter(V=>V.id!==i),k=A.filter(V=>V.active),P=A.filter(V=>!V.active).sort((V,S)=>(S.createdAt??-1)-(V.createdAt??-1));return(0,s.jsxs)("section",{className:h.section,"data-whale-session-management":!0,children:[i&&(0,s.jsx)(K.Button,{variant:"outline",disabled:d,"data-whale-operation":"show-main-sessions",onClick:()=>C(null),children:"\u8FD4\u56DE\u4E3B\u4F1A\u8BDD"}),d&&!a&&(0,s.jsx)("p",{role:"status",children:"\u6B63\u5728\u8BFB\u53D6\u9C7C\u5E94\u4F1A\u8BDD\u2026"}),f&&(0,s.jsx)("p",{role:"status",className:h.notice,children:f}),$&&M([$]),$?.childrenAvailable&&$?.childrenIncomplete&&(0,s.jsx)("p",{role:"status",children:"\u90E8\u5206\u5B50\u4EE3\u7406\u8BB0\u5F55\u6682\u65F6\u65E0\u6CD5\u6838\u9A8C\u3002\u5F53\u524D\u663E\u793A\u5DF2\u6838\u9A8C\u7684\u4F1A\u8BDD\u3002"}),$&&!$.childrenAvailable&&(0,s.jsx)("p",{role:"status",children:"\u5F53\u524D\u65E0\u6CD5\u8BFB\u53D6\u6B64\u4F1A\u8BDD\u7684\u5B50\u4EE3\u7406\u8BB0\u5F55\u3002"}),$?.childrenAvailable&&!$.childrenIncomplete&&!A.length&&(0,s.jsx)("p",{children:"\u6B64\u4F1A\u8BDD\u8FD8\u6CA1\u6709\u5B50\u4EE3\u7406\u3002"}),k.length>0&&M(k),a&&!i&&k.length===0&&(0,s.jsx)("p",{className:h.hint,children:"\u6682\u65E0\u6D3B\u8DC3\u4F1A\u8BDD\u3002"}),(P.length>0||a?.nextCursor)&&(0,s.jsxs)("details",{className:h.section,"data-whale-session-history":!0,open:r.sessionHistoryOpen===!0,onToggle:V=>{let{open:S}=V.currentTarget;S!==!!r.sessionHistoryOpen&&o({historyOpen:S})},children:[(0,s.jsx)("summary",{"data-whale-operation":i?"subagent-history":"session-history",children:i?"\u5386\u53F2\u5B50\u4EE3\u7406":"\u5386\u53F2\u4F1A\u8BDD"}),M(P),!!a?.nextCursor&&(0,s.jsx)(K.Button,{disabled:d,onClick:()=>{x({operation:"list",cursor:a.nextCursor},{append:!0})},children:"\u52A0\u8F7D\u66F4\u591A"})]}),(0,s.jsx)(K.Button,{variant:"outline",disabled:d,onClick:()=>{x({operation:"list",...i?{rootId:i}:{}})},children:"\u5237\u65B0\u4F1A\u8BDD"}),a?.capabilities?.unhide?.supported===!1&&(0,s.jsx)("p",{className:h.hint,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u65F6\u65E0\u6CD5\u628A\u5B50\u4EE3\u7406\u52A0\u5165\u4FA7\u8FB9\u680F\u3002"}),a?.capabilities?.restore?.supported===!1&&(0,s.jsx)("p",{className:h.hint,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u65F6\u65E0\u6CD5\u901A\u8FC7\u9C7C\u5E94\u53D6\u6D88\u5F52\u6863\u3002"})]})}function Yh({state:e,sessionId:n,t}){let o=e.status,r=o?.ownerSessionId,a=!e.uncertain&&e.checkedFor===n&&typeof o?.helper?.lastError=="string"?o.helper.lastError:null,l=e.error??e.enableError;return(0,s.jsxs)("details",{className:h.section,children:[(0,s.jsx)("summary",{children:t("details")}),(0,s.jsxs)("dl",{className:h.details,children:[(0,s.jsx)("dt",{children:t("source")}),(0,s.jsx)("dd",{"data-whale-owner":!0,"data-session-id":r??"",children:r||t("none")}),(0,s.jsx)("dt",{children:t("actor")}),(0,s.jsx)("dd",{"data-whale-actor":!0,"data-session-id":n??"",children:n||t("openSession")})]}),(0,s.jsx)("p",{className:h.hint,children:t("snapshot")}),l&&(0,s.jsx)("pre",{className:h.requestDetails,children:l}),a&&(0,s.jsxs)("div",{"data-whale-helper-error":!0,children:[(0,s.jsx)("strong",{children:t("inputDiagnosticTitle")}),(0,s.jsx)("pre",{className:h.requestDetails,children:a}),(0,s.jsx)("p",{className:h.hint,children:t("inputDiagnosticHistory")})]}),(0,s.jsx)("p",{className:h.hint,children:t("consequence")}),(0,s.jsx)("p",{className:h.hint,children:o?.helper?.online?t("helperOnline"):t("helperOffline")}),o?.turnSignals?.outputStartObservation?.status==="unsupported"&&(0,s.jsx)("p",{className:h.hint,children:t("outputObservationUnavailable")})]})}function Qh({state:e,sessionId:n,run:t,openAuthorization:o,active:r=!0}){let i=(0,R.useRef)(null),a=(0,R.useRef)(0);(0,R.useEffect)(()=>{i.current=null,a.current++},[r,n]),(0,R.useEffect)(()=>{if(!r||!n||e.busy||e.agentRequestsFor===n||i.current===n)return;i.current=n;let c=a.current;a.current===c&&t(n,"agent-requests")},[r,n,e.busy]);let l=e.agentRequestsFor===n?e.agentRequests:null;return(0,s.jsxs)("section",{className:h.section,"data-whale-agent-requests":!0,children:[(0,s.jsx)("h3",{children:"Agent \u64CD\u4F5C\u8BB0\u5F55"}),(0,s.jsx)(K.Button,{"data-whale-operation":"page-authorization",onClick:()=>{o?.()},children:"\u6388\u6743\u8303\u56F4\u4E0E\u64A4\u9500"}),(e.agentPermissionUncertain||e.agentRequestUncertain)&&(0,s.jsx)("p",{role:"alert",className:h.notice,children:"\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u4F1A\u81EA\u52A8\u6838\u67E5\u5BF9\u5E94\u6743\u9650\u548C\u8BF7\u6C42\u72B6\u6001\uFF0C\u4E0D\u4F1A\u91CD\u590D\u6267\u884C\u3002"}),l?.items?.length===0&&(0,s.jsx)("p",{className:h.hint,children:"\u6CA1\u6709\u5F85\u5904\u7406\u8BF7\u6C42\u3002"}),l?.items?.map(c=>(0,s.jsxs)("section",{className:h.section,"data-agent-request":c.id,children:[(0,s.jsxs)("strong",{children:[c.title," \xB7 ",c.state]}),(0,s.jsxs)("p",{className:h.hint,children:["\u53D1\u8D77\u4F1A\u8BDD\uFF1A",c.sourceSessionId]}),(0,s.jsxs)("details",{children:[(0,s.jsx)("summary",{children:"\u6838\u5BF9\u5B8C\u6574\u53D8\u66F4\u8BA1\u5212"}),(0,s.jsx)("pre",{className:h.requestDetails,children:JSON.stringify({\u5F53\u524D\u8BBE\u7F6E:c.before,\u8BF7\u6C42:c.request,...c.installPlan?{\u4E0B\u8F7D\u8BA1\u5212:c.installPlan}:{},...c.modelApplyTarget?{\u6A21\u578B\u5E94\u7528\u76EE\u6807:c.modelApplyTarget}:{}},null,2)})]}),c.error&&(0,s.jsx)("p",{role:"alert",className:h.error,children:c.error.message}),c.state==="pending"&&(0,s.jsx)(K.Button,{variant:"outline",disabled:e.busy||e.agentRequestUncertain,onClick:()=>{t(n,"decide-agent-request",{id:c.id,approve:!1,acknowledgements:[]})},children:"\u53D6\u6D88\u9884\u89C8"}),c.nextAction&&(0,s.jsx)("p",{className:h.hint,children:c.nextAction})]},c.id))]})}var Gd={startConversation:"\u5F00\u59CB\u5BF9\u8BDD",endConversation:"\u7ED3\u675F\u5BF9\u8BDD",voiceTarget:"\u6295\u9012\u5230",dedicatedVoiceTarget:"\u9C7C\u5E94\u4E13\u7528\u4F1A\u8BDD",checkingVoiceTarget:"\u6B63\u5728\u6838\u5BF9\u76EE\u6807\u2026",voiceTargetChanged:"\u8BED\u97F3\u6295\u9012\u76EE\u6807\u6709\u53D8\u5316\u3002\u8BF7\u6838\u5BF9\u9996\u9875\u7684\u4F1A\u8BDD\u540E\u518D\u5F00\u59CB\u3002",chooseCurrentDshTarget:"\u4F7F\u7528\u5F53\u524D\u6253\u5F00\u4F1A\u8BDD",backToFishVoice:"\u56DE\u5230\u9C7C\u5E94",currentDshTargetError:"\u65E0\u6CD5\u786E\u8BA4\u5F53\u524D DSH \u5BF9\u8BDD\uFF0C\u8BF7\u6838\u5BF9\u540E\u91CD\u8BD5\u3002",chooseVoiceTarget:"\u9009\u62E9\u6295\u9012\u4F1A\u8BDD",searchVoiceTargets:"\u641C\u7D22\u4F1A\u8BDD\u6807\u9898\u6216 ID",searchVoiceTargetsAction:"\u641C\u7D22",existingVoiceTargetList:"\u5DF2\u6709 DSH \u4F1A\u8BDD",boundVoiceTarget:"\u5F53\u524D\u7ED1\u5B9A",voiceTargetAvailability_ready:"\u53EF\u7528",voiceTargetAvailability_busy:"\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F",voiceTargetAvailability_archived:"\u4F1A\u8BDD\u5DF2\u5F52\u6863",voiceTargetAvailability_unavailable:"\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528",voiceTargetAvailability_managed:"\u9C7C\u5E94\u7BA1\u7406\u7684\u4F1A\u8BDD\uFF0C\u65E0\u6CD5\u76F4\u63A5\u6295\u9012",voiceTargetAvailability_subagent:"\u5B50\u4EE3\u7406\u4F1A\u8BDD\uFF0C\u65E0\u6CD5\u76F4\u63A5\u6295\u9012",voiceTargetNoMatch:"\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684\u4F1A\u8BDD\u3002",voiceTargetEmptyList:"\u6682\u65E0\u53EF\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u3002",voiceTargetSynthesisNotice:"\u4F7F\u7528\u5728\u7EBF\u97F3\u8272\u65F6\uFF0C\u56DE\u7B54\u6587\u5B57\u4F1A\u4EA4\u7ED9\u5DF2\u6388\u6743\u7684\u8BED\u97F3\u5408\u6210\u670D\u52A1\u3002\u82E5\u8981\u79BB\u7EBF\u6717\u8BFB\uFF0C\u53EF\u5728\u300C\u6A21\u578B \u2192 \u6717\u8BFB\u65B9\u5F0F\u300D\u9009\u7528\u672C\u5730\u97F3\u8272\u3002",bindVoiceTarget:"\u7ED1\u5B9A\u9009\u4E2D\u4F1A\u8BDD",savingVoiceTarget:"\u6B63\u5728\u4FDD\u5B58\u2026",moreVoiceTargets:"\u52A0\u8F7D\u66F4\u591A",loadingVoiceTargets:"\u6B63\u5728\u8BFB\u53D6 DSH \u4F1A\u8BDD\u2026",voiceTargetListError:"\u65E0\u6CD5\u8BFB\u53D6 DSH \u4F1A\u8BDD\u3002",retryVoiceTargets:"\u91CD\u8BD5\u8BFB\u53D6",retryTranscripts:"\u5F85\u91CD\u53D1\u7684\u8BED\u97F3",retryTranscript:"\u91CD\u53D1",retryTranscriptBusy:"\u7B49\u5F85\u53EF\u53D1\u9001",retryTranscriptSending:"\u6B63\u5728\u91CD\u53D1\u2026",retryTranscriptUncertain:"\u53D1\u9001\u7ED3\u679C\u5F85\u786E\u8BA4\uFF0C\u8BF7\u67E5\u770B\u539F\u4F1A\u8BDD\u3002",endDiscardsRetries:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u6E05\u7A7A\u5F85\u53D1\u8F6C\u5199",modeSwitching:"\u6B63\u5728\u5207\u6362\u8BF4\u8BDD\u65B9\u5F0F\u2026",modeSaving:"\u6B63\u5728\u4FDD\u5B58\u8BF4\u8BDD\u65B9\u5F0F\u2026",modeSwitchUnconfirmed:"\u8BF4\u8BDD\u65B9\u5F0F\u66F4\u6539\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u6838\u67E5\u3002",modeSwitchFailed:"\u672A\u80FD\u786E\u8BA4\u66F4\u6539\uFF0C\u8BF7\u67E5\u770B\u5F53\u524D\u65B9\u5F0F\u540E\u518D\u8BD5\u3002",updateTitle:"\u9C7C\u5E94\u66F4\u65B0",updateOfferTitle:"\u9C7C\u5E94\u6709\u65B0\u7248\u672C",updateCurrentVersion:"\u5F53\u524D",updateNewVersion:"\u65B0\u7248",updateChannel_stable:"\u6B63\u5F0F\u7248",updateChannel_preview:"\u9884\u89C8\u7248",updateCheck:"\u68C0\u67E5\u66F4\u65B0",updateDetails:"\u67E5\u770B\u66F4\u65B0",updateLater:"\u7A0D\u540E",updateInstall:"\u4E00\u952E\u66F4\u65B0",updateRelease:"\u53D1\u5E03\u8BF4\u660E",updateFeedback:"\u53CD\u9988\u95EE\u9898",update_idle:"\u6B63\u5728\u8BFB\u53D6\u66F4\u65B0\u72B6\u6001\u2026",update_checking:"\u6B63\u5728\u68C0\u67E5\u66F4\u65B0\u2026",update_current:"\u5DF2\u662F\u6700\u65B0\u7248\u672C\u3002",update_available:"\u53EF\u4EE5\u66F4\u65B0\u3002",update_incompatible:"\u65B0\u7248\u4E0E\u5F53\u524D DSH \u73AF\u5883\u4E0D\u517C\u5BB9\u3002",update_installing:"\u6B63\u5728\u66F4\u65B0\uFF0C\u5BBF\u4E3B\u53EF\u80FD\u4F1A\u91CD\u65B0\u52A0\u8F7D\u9C7C\u5E94\u2026","update_restart-required":"\u66F4\u65B0\u5DF2\u5B89\u88C5\uFF0C\u91CD\u542F DSH \u540E\u751F\u6548\u3002","update_enable-required":"\u66F4\u65B0\u5DF2\u5B89\u88C5\uFF0C\u8BF7\u5728 DSH \u63D2\u4EF6\u7BA1\u7406\u4E2D\u542F\u7528\u9C7C\u5E94\u3002",update_installed:"\u66F4\u65B0\u5DF2\u5B8C\u6210\u3002",update_error:"\u66F4\u65B0\u51FA\u9519\uFF0C\u53EF\u68C0\u67E5\u66F4\u65B0\u540E\u91CD\u8BD5\u3002",update_unsupported:"\u5F53\u524D\u73AF\u5883\u65E0\u6CD5\u81EA\u52A8\u66F4\u65B0\uFF0C\u8BF7\u67E5\u770B\u5B98\u65B9\u53D1\u5E03\u8BF4\u660E\u3002",updateConnection:"\u6682\u65F6\u65E0\u6CD5\u786E\u8BA4\u66F4\u65B0\u72B6\u6001\uFF0C\u8BF7\u5728\u5BBF\u4E3B\u5C31\u7EEA\u540E\u91CD\u65B0\u68C0\u67E5\u3002",audioDevices:"\u97F3\u9891\u8BBE\u5907",audioSystemDefault:"\u7CFB\u7EDF\u9ED8\u8BA4",audioInput:"\u97F3\u9891\u8F93\u5165",audioOutput:"\u97F3\u9891\u8F93\u51FA",inputDeviceMissing:"\u9EA6\u514B\u98CE\u672A\u8FDE\u63A5\uFF0C\u5DF2\u4FDD\u7559\u9009\u62E9",outputDeviceMissing:"\u8F93\u51FA\u672A\u8FDE\u63A5\uFF0C\u4E0D\u4F1A\u5207\u5230\u5176\u4ED6\u8BBE\u5907",deviceDisconnected:"\u672A\u8FDE\u63A5",inputDeviceStopFirst:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5207\u6362\u8F93\u5165\u3002\u8F93\u51FA\u5728\u4E0B\u4E00\u6BB5\u64AD\u653E\u751F\u6548\u3002",outputDeviceUnsupported:"\u6B64\u73AF\u5883\u6682\u4E0D\u652F\u6301\u9009\u62E9\u6717\u8BFB\u8F93\u51FA\u8BBE\u5907\u3002",deviceListRetry:"\u8BBE\u5907\u5217\u8868\u6682\u4E0D\u53EF\u7528\uFF0C\u6253\u5F00\u4E0B\u62C9\u83DC\u5355\u53EF\u91CD\u8BD5\u3002",voiceHelperCleanupHint:"\u6B63\u5728\u786E\u8BA4\u9EA6\u514B\u98CE\u5DF2\u91CA\u653E\uFF0C\u786E\u8BA4\u524D\u4E0D\u4F1A\u5F00\u542F\u65B0\u7684\u5F55\u97F3\u3002",voiceHelperRestartHint:"\u9EA6\u514B\u98CE\u670D\u52A1\u9000\u51FA\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u91CD\u542F DSH \u540E\u518D\u70B9\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u3002",inputError_device:"\u9EA6\u514B\u98CE\u4E0D\u53EF\u7528",inputError_recognition:"\u8BED\u97F3\u8BC6\u522B\u5931\u8D25","inputError_no-speech":"\u6CA1\u542C\u6E05\uFF0C\u8BF7\u518D\u8BF4\u4E00\u6B21",inputHelp_device:"\u8BF7\u68C0\u67E5\u9EA6\u514B\u98CE\u8FDE\u63A5\u4E0E\u6743\u9650\u3002\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5728\u8BBE\u7F6E\u4E2D\u9009\u8BBE\u5907\u3002\u8BE6\u60C5\u89C1\u300C\u9AD8\u7EA7\u300D\u3002",inputDiagnosticTitle:"\u6700\u8FD1\u4E00\u6B21\u97F3\u9891\u9519\u8BEF",inputDiagnosticHistory:"\u8FD9\u662F\u6700\u8FD1\u4E00\u6B21\u8BB0\u5F55\uFF0C\u53EF\u80FD\u6765\u81EA\u4E4B\u524D\u7684\u5C1D\u8BD5\uFF1B\u4E0D\u4EE3\u8868\u5F53\u524D\u8BBE\u5907\u72B6\u6001\u3002",inputHelp_recognition:"\u8BF7\u91CD\u8BD5\u3002\u4ECD\u5931\u8D25\u65F6\uFF0C\u7ED3\u675F\u5BF9\u8BDD\u540E\u5728\u8BBE\u7F6E\u4E2D\u68C0\u67E5\u8BC6\u522B\u6A21\u578B\u3002","inputHelp_no-speech":"\u8BF7\u9760\u8FD1\u9EA6\u514B\u98CE\u91CD\u8BD5\uFF0C\u5E76\u68C0\u67E5\u662F\u5426\u9759\u97F3\u3002",speechFailed:"\u6717\u8BFB\u5931\u8D25",speechInterrupted:"\u6717\u8BFB\u5DF2\u4E2D\u65AD",wakeFallbackHint:"\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\u3002\u76EE\u524D\u6309\u8F6C\u5199\u5339\u914D\u3002\u5207\u6362\u6A21\u5F0F\u540E\u518D\u9009\u300C\u5524\u9192\u8BCD\u300D\u53EF\u91CD\u8BD5\u58F0\u97F3\u5339\u914D\u3002",wakeMode:"\u5524\u9192\u8BCD",switchToWake:"\u70B9\u6309\u5207\u5230\u5524\u9192\u8BCD\u6A21\u5F0F\uFF0C\u9EA6\u514B\u98CE\u5C06\u7B49\u5F85\u8BBE\u5B9A\u79F0\u547C",wakeDisabled:"\u5524\u9192\u76D1\u542C\u672A\u5F00\u542F",wakeStarting:"\u6B63\u5728\u542F\u52A8\u5524\u9192\u76D1\u542C\u2026",wakeWaiting:"\u7B49\u5F85\u5524\u9192\u8BCD",wakeListening:"\u6B63\u5728\u542C\u4E0B\u4E00\u53E5",wakePaused:"\u5524\u9192\u76D1\u542C\u5DF2\u6682\u505C",wakeError:"\u5524\u9192\u76D1\u542C\u4E0D\u53EF\u7528\uFF0C\u8BF7\u67E5\u770B\u8BBE\u7F6E",wakeHint:"\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\uFF0C\u518D\u8BF4\u6307\u4EE4\u3002\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u76D1\u542C\u3002",wakeMethod:"\u77ED\u53E5\u7ED3\u675F\u540E\u5728\u672C\u673A\u6BD4\u8F83\u79F0\u547C\u7684\u58F0\u97F3\u548C\u8F6C\u5199\u3002",wakeAliases:"\u5524\u9192\u79F0\u547C",wakeAliasesHint:"\u6700\u591A8\u4E2A\uFF0C\u9017\u53F7\u5206\u9694\uFF1B\u4E2D\u6587\u652F\u6301\u53E5\u9996\u8FD1\u97F3\uFF0C\u5EFA\u8BAE\u7528\u72EC\u7279\u76843\u5B57\u4EE5\u4E0A\u79F0\u547C\u3002",wakeTimeout:"\u5524\u9192\u540E\u7B49\u5F85\uFF08\u79D2\uFF09",wakeSettings:"\u5524\u9192\u8BCD\u8BBE\u7F6E",wakeStopToEdit:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u79F0\u547C\u548C\u7B49\u5F85\u65F6\u95F4\u3002",wakeInvalid:"\u8BF7\u586B1\u20138\u4E2A\u6709\u6548\u79F0\u547C\uFF0C\u7B49\u5F85\u65F6\u95F4\u4E3A3\u201330\u79D2\u3002",switchToPtt:"\u70B9\u6309\u5207\u56DE\u6309\u4F4F\u8BF4\u8BDD",switchToAlways:"\u70B9\u6309\u5207\u5230\u81EA\u7531\u9EA6\uFF0C\u9EA6\u514B\u98CE\u5C06\u6301\u7EED\u8046\u542C",quickSpeedStop:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5207\u6362\u901F\u5EA6",performanceReadFirst:"\u5148\u68C0\u67E5\u5F53\u524D\u6A21\u578B\u652F\u6301\u54EA\u4E9B\u901F\u5EA6\u3002",performanceUnavailable:"\u63D0\u4F9B\u5546\u5DF2\u660E\u786E\u62D2\u7EDD\u7070\u8272\u6863\u4F4D\u7684\u601D\u8003\u53C2\u6570\uFF1B\u5176\u4ED6\u6863\u4F4D\u4ECD\u53EF\u9009\u62E9\u3002",performanceProbeCost:"\u52A0\u8F7D\u65F6\u7528\u6700\u591A 3 \u4E2A\u56FA\u5B9A\u77ED\u8BF7\u6C42\u68C0\u6D4B\u6863\u4F4D\uFF0C\u6309\u6A21\u578B\u8BA1\u8D39\u3002",performanceProbeScope:"\u53EA\u6709\u63D0\u4F9B\u53EF\u68C0\u6D4B\u63A5\u53E3\u7684\u6A21\u578B\u8DEF\u7EBF\u4F1A\u53D1\u9001\u77ED\u8BF7\u6C42\uFF0C\u539F\u751F\u652F\u6301\u7684\u6863\u4F4D\u53EF\u76F4\u63A5\u67E5\u770B\u3002",performanceProbeUnknown:"\u90E8\u5206\u6863\u4F4D\u6682\u672A\u786E\u8BA4\u3002\u53EF\u68C0\u67E5\u7F51\u7EDC\u6216\u767B\u5F55\u540E\u91CD\u65B0\u68C0\u6D4B\u3002",performanceProbeAccepted:"\u6863\u4F4D\u8BF7\u6C42\u68C0\u6D4B\u901A\u8FC7\u3002",performanceProbePending:"\u6B63\u5728\u68C0\u67E5\u5F53\u524D\u6A21\u578B\u7684\u6863\u4F4D\u2026",holdToSpeak:"\u8BF4\u8BDD\u65F6\u6309\u4F4F",alwaysWarning:"\u81EA\u7531\u9EA6\u4F1A\u6301\u7EED\u542C\u53D6\u8BED\u97F3\u3002\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u76D1\u542C\u3002",bindingMissing:"\u672A\u7ED1\u5B9A\u8BF4\u8BDD\u6309\u952E\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u4E2D\u7ED1\u5B9A\uFF0C\u6216\u5207\u6362\u6301\u7EED\u8046\u542C\u3002",noSession:"\u8FD8\u6CA1\u6709\u6253\u5F00\u5BF9\u8BDD",otherWindow:"\u9EA6\u514B\u98CE\uFF1A\u53E6\u4E00\u4E2A\u7A97\u53E3",readingStatus:"\u6B63\u5728\u8BFB\u53D6\uFF0C\u4E0D\u4F1A\u542F\u52A8\u9EA6\u514B\u98CE\u6216\u6A21\u578B\u3002",statusRetry:"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u72B6\u6001\u3002\u8FD4\u56DE\u7A97\u53E3\u65F6\u4F1A\u81EA\u52A8\u6838\u67E5\u3002",retryStatus:"\u91CD\u65B0\u8BFB\u53D6\u72B6\u6001",collapseHint:"\u6536\u8D77\u540E\u4F1A\u7EE7\u7EED\u5BF9\u8BDD",stopConsequence:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u91CA\u653E\u9EA6\u514B\u98CE\u5E76\u505C\u6B62\u672C\u6B21\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u3002",transferTitle:"\u63A5\u7BA1\u53E6\u4E00\u4E2A\u7A97\u53E3\u7684\u9EA6\u514B\u98CE\uFF1F",transferWarning:"\u8FD9\u4F1A\u4E2D\u65AD\u53E6\u4E00\u4E2A\u7A97\u53E3\u7684\u8BED\u97F3\uFF0C\u5E76\u53EF\u80FD\u7ED3\u675F\u5B83\u7684\u540E\u53F0\u4EFB\u52A1\u3002",cancel:"\u53D6\u6D88",confirmTransfer:"\u786E\u8BA4\u63A5\u7BA1",bindingStopRequired:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u9F20\u6807\u6216\u952E\u76D8\u6309\u952E\u3002",bindingFinishing:"\u8BED\u97F3\u6B63\u5728\u505C\u6B62\uFF0C\u8BF7\u7A0D\u5019\u518D\u4FEE\u6539\u6309\u952E\u3002",headphonesRequired:"\u5148\u52FE\u9009\u201C\u6211\u5DF2\u4F7F\u7528\u8033\u673A\u201D\uFF0C\u624D\u80FD\u5F00\u542F\u81EA\u52A8\u6253\u65AD\u3002",deviceManualIndex:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u5E8F\u53F7",deviceManualName:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u540D\u79F0",deviceIndexInvalid:"\u8BBE\u5907\u5E8F\u53F7\u9700\u8981\u662F\u975E\u8D1F\u6574\u6570\u3002",deviceDefault:"\u4F7F\u7528\u7CFB\u7EDF\u9ED8\u8BA4\u9EA6\u514B\u98CE",deviceManual:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u540D\u79F0\u6216\u5E8F\u53F7",deviceSaved:"\u5DF2\u4FDD\u5B58\u7684\u8BBE\u5907",deviceEmpty:"\u97F3\u9891\u670D\u52A1\u6CA1\u6709\u627E\u5230\u9EA6\u514B\u98CE\u3002\u8BF7\u8FDE\u63A5\u8BBE\u5907\u5E76\u68C0\u67E5\u7CFB\u7EDF\u58F0\u97F3\u8BBE\u7F6E\u3002",deviceUnknown:"\u5F00\u59CB\u5BF9\u8BDD\u540E\u4F1A\u5217\u51FA\u68C0\u6D4B\u5230\u7684\u8BBE\u5907\u3002\u73B0\u5728\u53EF\u4F7F\u7528\u7CFB\u7EDF\u9ED8\u8BA4\uFF0C\u6216\u5728\u9AD8\u7EA7\u9009\u9879\u624B\u52A8\u586B\u5199\u3002",ttsBackend:"\u8BED\u97F3\u5408\u6210\u540E\u7AEF",ttsBackendHint:"\u58F0\u97F3\u7531\u5DF2\u5B89\u88C5\u7684 TTS \u540E\u7AEF\u63D0\u4F9B\uFF0C\u9700\u5728\u8BE5\u540E\u7AEF\u5B8C\u6210\u914D\u7F6E\u3002\u72EC\u7ACB\u97F3\u91CF\u4EC5\u5728\u9A8C\u8BC1\u652F\u6301\u65F6\u663E\u793A\u3002",ttsBackendPending:"\u66F4\u591A\u540E\u7AEF\u9009\u62E9\u6B63\u5728\u9002\u914D\uFF0C\u5F53\u524D\u4E0D\u4F1A\u81EA\u52A8\u63A5\u5165\u4E91\u670D\u52A1\u3002",voiceClone:"\u58F0\u97F3\u514B\u9686",voiceCloneAvailable:"Qwen \u652F\u6301\u672C\u5730\u53C2\u8003\u97F3\u8272\uFF0C\u53EF\u5728\u6717\u8BFB\u65B9\u5F0F\u7684\u97F3\u8272\u8BBE\u7F6E\u4E2D\u9009\u62E9 WAV\u3002",voiceClonePrivacy:"\u4EC5\u8BFB\u53D6\u4F60\u9009\u62E9\u4E14\u6709\u6743\u4F7F\u7528\u7684\u58F0\u97F3\u6837\u672C\uFF0C\u4E0D\u4E0A\u4F20\u3002",inputActive:"\u6B63\u5728\u63A5\u6536\u8BED\u97F3",modeUnknown:"\u542C\u53D6\u65B9\u5F0F\u672A\u77E5",voiceInputUnavailable:"\u5F55\u97F3\u6682\u4E0D\u53EF\u7528",voiceInputRecoveryHint:"\u8BED\u97F3\u670D\u52A1\u5DF2\u4E2D\u65AD\u3002\u8BF7\u7ED3\u675F\u5BF9\u8BDD\u540E\u91CD\u65B0\u5F00\u59CB\u3002",searchHistory:"\u641C\u7D22\u4F1A\u8BDD",searchScope:"\u641C\u7D22\u5DF2\u8F7D\u5165\u7684\u4F1A\u8BDD",noMatches:"\u6CA1\u6709\u5339\u914D\u7684\u4F1A\u8BDD",differentOwner:"\u9EA6\u514B\u98CE\u5728\u53E6\u4E00\u4E2A\u7A97\u53E3\u4F7F\u7528\u3002\u9700\u8981\u65F6\u53EF\u660E\u786E\u63A5\u7BA1\u3002",details:"\u8BCA\u65AD\u8BE6\u60C5",noReply:"\u8FD8\u6CA1\u6709\u5BF9\u8BDD",newChatCreated:"\u5DF2\u65B0\u5EFA\u4F1A\u8BDD",newChatActive:"\u65B0\u5EFA\u8BED\u97F3\u4F1A\u8BDD\u3002\u5F53\u524D\u4F1A\u8BDD\u7684\u540E\u53F0\u4EFB\u52A1\u4F1A\u505C\u6B62\uFF0C\u8BB0\u5F55\u4F1A\u4FDD\u7559\u3002",newChatOtherOwner:"\u8BF7\u5728\u5F53\u524D\u8BED\u97F3\u4F1A\u8BDD\u6216\u5F00\u542F\u9EA6\u514B\u98CE\u7684\u7A97\u53E3\u4E2D\u65B0\u5EFA\u3002",recentConversation:"\u5BF9\u8BDD",recentTenTurns:"\u6700\u8FD1 10 \u8F6E",allRecords:"\u5168\u90E8\u8BB0\u5F55",showAllRecords:"\u5C55\u5F00\u5168\u90E8",collapseToTen:"\u6536\u8D77\u81F3 10 \u8F6E",collapseConversation:"\u6536\u8D77\u5BF9\u8BDD",currentVoiceRecords:"\u5F53\u524D\u8BED\u97F3\u804A\u5929",historyTruncated:"\u5DF2\u5207\u6362\u663E\u793A\u533A\u95F4\uFF0C\u539F\u8BB0\u5F55\u4ECD\u4FDD\u7559",viewConversation:"\u67E5\u770B\u8BED\u97F3\u8BB0\u5F55",loadEarlier:"\u52A0\u8F7D\u66F4\u65E9\u8BB0\u5F55",readingHistory:"\u6B63\u5728\u8BFB\u53D6\u8BB0\u5F55\u2026",retryHistory:"\u8BFB\u53D6\u8BB0\u5F55\u5931\u8D25\uFF0C\u70B9\u51FB\u91CD\u8BD5",noConversation:"\u8FD8\u6CA1\u6709\u5BF9\u8BDD",newMessages:"\u6761\u65B0\u6D88\u606F",conversationMessages:"\u8BED\u97F3\u5BF9\u8BDD\u8BB0\u5F55",assistantName:"\u52A9\u624B\u79F0\u547C",renameAssistant:"\u70B9\u51FB\u6539\u540D\uFF0CEnter \u4FDD\u5B58\uFF0CEsc \u53D6\u6D88",compact_off:"\u672A\u5F00\u542F",compact_standby:"\u5F85\u673A",compact_listening:"\u8046\u542C\u4E2D",compact_pending:"\u5904\u7406\u4E2D",compact_unknown:"\u5F85\u68C0\u67E5",you:"\u4F60",assistant:"\u52A9\u624B",close:"\u5173\u95ED\u9762\u677F",keyboardBinding:"\u952E\u76D8\u6309\u4F4F\u8BF4\u8BDD",bindingOff:"\u672A\u7ED1\u5B9A",saveBindings:"\u4FDD\u5B58\u6309\u952E",discardBindings:"\u53D6\u6D88\u4FEE\u6539",bindingCapture:"\u6309\u4E0B\u8981\u7ED1\u5B9A\u7684\u952E\uFF08Esc \u53D6\u6D88\uFF09",clearBinding:"\u6E05\u9664\u7ED1\u5B9A",bindingUnsupported:"\u4E0D\u652F\u6301\u8BE5\u6309\u952E\u6216\u7CFB\u7EDF\u7EC4\u5408\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u3002",bindingGlobalHint:"Windows \u5168\u5C40\u5FEB\u6377\u952E\u3002\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5F55\u5165\uFF0C\u4FDD\u5B58\u540E\u4E0B\u6B21\u5F00\u59CB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002\u6309\u952E\u4E0D\u4F1A\u88AB\u62E6\u622A\uFF0C\u53EF\u80FD\u540C\u65F6\u89E6\u53D1\u5176\u4ED6\u5E94\u7528\u7684\u5FEB\u6377\u64CD\u4F5C\u3002",bindingUnavailable:"\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301\u5168\u5C40\u6309\u952E\u7ED1\u5B9A\u3002",bindingPrintableWarning:"\u5355\u72EC\u4F7F\u7528\u6587\u5B57\u3001\u6570\u5B57\u6216\u7A7A\u683C\u952E\u4F1A\u5728\u5176\u4ED6\u5E94\u7528\u8F93\u5165\u65F6\u89E6\u53D1\u6309\u952E\u8BF4\u8BDD\u3002",performanceTitle:"\u56DE\u7B54\u901F\u5EA6",performanceHint:"\u4E0B\u6B21\u5F00\u59CB\u9C7C\u5E94\u72EC\u7ACB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002\u7ED1\u5B9A\u539F\u4F1A\u8BDD\u65F6\uFF0C\u5728\u8BE5 DSH \u5BF9\u8BDD\u7684\u6A21\u578B\u83DC\u5355\u91CC\u8C03\u6574\u601D\u8003\u6863\u4F4D\u3002",inspectPerformance:"\u68C0\u67E5\u53EF\u7528\u901F\u5EA6",performance_fast:"\u5FEB",performanceNoThinking:"\u65E0\u601D\u8003",performanceRecommended:"[\u63A8\u8350]",performanceFastHint:"\u5FEB\u6863\u4F1A\u660E\u786E\u8BF7\u6C42\u5173\u95ED\u601D\u8003\u3002",performanceFastUnavailable:"\u5F53\u524D\u6A21\u578B\u8DEF\u7EBF\u65E0\u6CD5\u786E\u8BA4\u5173\u95ED\u601D\u8003\u3002\u53EF\u9009\u300C\u8DDF\u968F\u6A21\u578B\u300D\uFF0C\u6216\u5728\u6A21\u578B\u8BBE\u7F6E\u4E2D\u66F4\u6362\u652F\u6301\u65E0\u601D\u8003\u7684\u5BF9\u8BDD\u6A21\u578B\u3002",performanceHostUnavailable:"\u5F53\u524D\u6A21\u578B\u8DEF\u7EBF\u672A\u63D0\u4F9B\u90E8\u5206\u601D\u8003\u6863\u4F4D\u3002",performance_balanced:"\u6807\u51C6",performance_high:"\u4ED4\u7EC6",performance_compatibility:"\u8DDF\u968F\u6A21\u578B",performanceStopRequired:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u56DE\u7B54\u901F\u5EA6\u3002\u5F53\u524D\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u4F1A\u505C\u6B62\u3002",savePerformance:"\u4FDD\u5B58\u56DE\u7B54\u901F\u5EA6",outputVolume:"\u52A9\u624B\u8BED\u97F3\u97F3\u91CF",outputVolumeHint:"\u4EC5\u8C03\u6574\u5DF2\u5B89\u88C5\u7684 Windows dsh-speak \u540E\u7AEF\uFF0C\u4E0D\u4EE3\u8868\u5F53\u524D\u8BED\u97F3\u8DEF\u7531\u6B63\u5728\u4F7F\u7528\u5B83\uFF1B\u4E0D\u5F71\u54CD DSTuber\u3001\u7CFB\u7EDF\u603B\u97F3\u91CF\u6216\u63D0\u793A\u97F3\u3002\u4E0B\u4E00\u6BB5\u8F93\u51FA\u751F\u6548\u3002",readOutputVolume:"\u8BFB\u53D6\u8BED\u97F3\u97F3\u91CF",saveOutputVolume:"\u4FDD\u5B58\u8BED\u97F3\u97F3\u91CF",outputVolumeUnavailable:"\u5F53\u524D\u8BED\u97F3\u540E\u7AEF\u4E0D\u652F\u6301\u72EC\u7ACB\u97F3\u91CF\u8C03\u8282\u3002",outputVolumeUnknown:"\u97F3\u91CF\u4FDD\u5B58\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u4F1A\u81EA\u52A8\u6838\u67E5\uFF0C\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002",settingsTitle:"\u9C7C\u5E94\u8BBE\u7F6E",settingsSections:"\u8BBE\u7F6E\u5206\u7C7B",tab_audio:"\u97F3\u9891",tab_interaction:"\u4EA4\u4E92",tab_prompt:"\u63D0\u793A\u8BCD",voicePromptLabel:"\u81EA\u5B9A\u4E49\u63D0\u793A\u8BCD",voicePromptOptional:"\uFF08\u53EF\u9009\uFF09",voicePromptAgents:"\u8DDF\u968F AGENTS",voicePromptCustom:"\u5DF2\u9644\u52A0\u81EA\u5B9A\u4E49",voicePromptPlaceholder:`\u4F8B\u5982\uFF1A\u7528\u4E2D\u6587\u56DE\u590D\uFF0C\u5148\u8BF4\u7ED3\u8BBA\uFF0C\u8BED\u6C14\u81EA\u7136\u3002

\u5185\u5BB9\u4F1A\u9644\u52A0\u5728 AGENTS \u540E\u3002\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u8BBE\u7F6E\u3002`,voicePromptStopToEdit:"\u505C\u6B62\u8BED\u97F3\u540E\u53EF\u7F16\u8F91",voicePromptUnsupported:"\u5F53\u524D DSH \u6682\u4E0D\u652F\u6301\u81EA\u5B9A\u4E49\u63D0\u793A\u8BCD\u3002",voicePromptTooLong:"\u63D0\u793A\u8BCD\u4E0D\u80FD\u8D85\u8FC7 32,768 \u4E2A\u5B57\u7B26\u3002",voicePromptSaving:"\u4FDD\u5B58\u4E2D\u2026",voicePromptCancel:"\u53D6\u6D88\u4FEE\u6539",voicePromptSave:"\u4FDD\u5B58",voicePromptSaved:"\u5DF2\u4FDD\u5B58\uFF0C\u4E0B\u6B21\u5F00\u542F\u8BED\u97F3\u65F6\u751F\u6548\u3002",voicePromptSaveFailed:"\u4FDD\u5B58\u672A\u6210\u529F\uFF0C\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002",voicePromptUnsaved:"\u5C1A\u672A\u4FDD\u5B58",tab_models:"\u6A21\u578B",tab_advanced:"\u9AD8\u7EA7",projectInfoTitle:"\u5173\u4E8E\u9C7C\u5E94",projectAuthor:"\u4F5C\u8005",projectRepository:"\u5B98\u65B9\u4ED3\u5E93",projectNpm:"npm \u53D1\u5E03\u9875",tab_sessions:"\u4F1A\u8BDD\u7BA1\u7406",settingsContent:"\u8BBE\u7F6E\u5185\u5BB9",voiceCleanupPending:"\u6B63\u5728\u91CA\u653E\u65E7\u97F3\u9891\u670D\u52A1",voiceCleanupHint:"\u7B49\u5F85\u65E7\u4F1A\u8BDD\u548C\u5F55\u97F3\u9000\u51FA\uFF0C\u5B8C\u6210\u540E\u4F1A\u81EA\u52A8\u66F4\u65B0\u3002",voiceRestartPending:"\u9700\u8981\u91CD\u542F DSH",voiceRestartHint:"\u65E7\u7248\u97F3\u9891\u670D\u52A1\u7684\u9000\u51FA\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u91CD\u542F DSH \u540E\u518D\u70B9\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u3002\u5DF2\u4FDD\u5B58\u7684\u6388\u6743\u4E0D\u53D8\u3002",voiceRecoveryPending:"\u65E7\u8BED\u97F3\u4F1A\u8BDD\u5C1A\u672A\u9000\u51FA",voiceRecoveryCheck:"\u6838\u67E5\u5E76\u505C\u6B62",voiceRecoveryHint:"\u65E7\u5B9E\u4F8B\u4ECD\u5728\u9000\u51FA\uFF0C\u8BF7\u5148\u6838\u67E5\u505C\u6B62\u3002\u82E5\u4E00\u76F4\u672A\u9000\u51FA\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F DSH \u540E\u518D\u70B9\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u3002",operationUnavailable:"\u64CD\u4F5C\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\uFF1B\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002\u8BE6\u60C5\u89C1\u9AD8\u7EA7\u8BBE\u7F6E\u3002",enableFailed:"\u65E0\u6CD5\u5F00\u59CB\u5BF9\u8BDD\u3002\u8BF7\u5728\u8BBE\u7F6E\u7684\u300C\u9AD8\u7EA7\u300D\u67E5\u770B\u539F\u56E0\u540E\u91CD\u8BD5\u3002",tab_pets:"\u684C\u5BA0",planned:"\u8BA1\u5212\u5F00\u53D1\u4E2D",configurationUnknown:"\u914D\u7F6E\u4FDD\u5B58\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\uFF1B\u6838\u5B9E\u524D\u4E0D\u80FD\u7EE7\u7EED\u4FEE\u6539\u3002",motionTitle:"\u754C\u9762\u52A8\u753B",motion_spring:"Q \u5F39",motion_firm:"\u786C\u6717",motion_off:"\u5173\u95ED\u52A8\u753B",motionHint:"\u7ACB\u5373\u9884\u89C8\u5E76\u4FDD\u5B58\uFF1B\u64CD\u4F5C\u4E0D\u7B49\u5F85\u52A8\u753B\u3002\u7CFB\u7EDF\u51CF\u5C11\u52A8\u6001\u6548\u679C\u4F18\u5148\u3002",motionNotSaved:"\u672C\u6B21\u9884\u89C8\u5DF2\u5E94\u7528\uFF0C\u4F46\u6B64\u6D4F\u89C8\u5668\u65E0\u6CD5\u4FDD\u5B58\u52A8\u753B\u504F\u597D\u3002",modeControlPending:"\u8BED\u97F3\u63A7\u5236\u5C1A\u672A\u5B8C\u6210\u6216\u72B6\u6001\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\u3002",capabilityTitle:"\u5BF9\u8BDD\u5728\u4FA7\u680F\u4E2D\u7684\u663E\u793A",supported:"\u53EF\u7528",unsupported:"\u4E0D\u53EF\u7528\u6216\u5C1A\u672A\u786E\u8BA4",hiddenMode:"\u4E0D\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD",workspaceMode:"\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD",taskCapability:"\u540E\u53F0\u4EFB\u52A1\u652F\u6301",configuredMode:"\u5DF2\u4FDD\u5B58\u6A21\u5F0F",currentVoiceMode:"\u5F53\u524D\u5BF9\u8BDD\u7684\u5B9E\u9645\u6A21\u5F0F",noActiveVoice:"\u6CA1\u6709\u8FD0\u884C\u4E2D\u7684\u5BF9\u8BDD",chooseVisibility:"\u9009\u62E9\u663E\u793A\u6A21\u5F0F",workspaceWarning:"\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD\u4F1A\u628A\u5BF9\u8BDD\u663E\u793A\u5728\u666E\u901A\u5DE5\u4F5C\u533A\u4E2D\u3002\u9690\u85CF\u6A21\u5F0F\u4E0D\u53EF\u7528\u65F6\u4ECD\u4F1A\u62D2\u7EDD\u542F\u52A8\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u6539\u4E3A\u53EF\u89C1\u3002",visibilityNoMigration:"\u6B64\u8BBE\u7F6E\u7528\u4E8E\u540E\u7EED\u5BF9\u8BDD\uFF1B\u5DF2\u6709\u5BF9\u8BDD\u4FDD\u6301\u539F\u663E\u793A\u65B9\u5F0F\u3002",modeReadFirst:"\u6B63\u5728\u6838\u67E5\u5F53\u524D\u5BF9\u8BDD\u7684\u914D\u7F6E\u548C\u72B6\u6001\uFF0C\u786E\u8BA4\u540E\u53EF\u4FEE\u6539\u6A21\u5F0F\u3002",closeBeforeMode:"\u8BF7\u5148\u5173\u95ED\u8BED\u97F3\uFF0C\u786E\u8BA4\u5B8C\u5168\u505C\u6B62\u540E\u53EF\u4FEE\u6539\u663E\u793A\u6A21\u5F0F\u3002",saveWorkspace:"\u4FDD\u5B58\u5DE5\u4F5C\u533A\u53EF\u89C1\u6A21\u5F0F",saveHidden:"\u4FDD\u5B58\u9690\u85CF\u6A21\u5F0F",visibilityUnknownWrite:"\u663E\u793A\u6A21\u5F0F\u5199\u5165\u7ED3\u679C\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\u3002\u6838\u5B9E\u524D\u4E0D\u80FD\u7EE7\u7EED\u4FEE\u6539\uFF0C\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002",outputObservationUnavailable:"\u5C1A\u672A\u63A5\u5165\u771F\u5B9E\u64AD\u97F3\u5F00\u59CB\u4E8B\u4EF6\uFF0C\u65E0\u6CD5\u786E\u8BA4\u6B63\u5728\u64AD\u97F3",title:"\u9C7C\u5E94",description:"\u8BED\u97F3\u63A7\u5236\u3001\u97F3\u9891\u8BBE\u7F6E\u4E0E\u72EC\u7ACB\u5BF9\u8BDD\u3002",drag:"\u79FB\u52A8\u9C7C\u5E94\u60AC\u6D6E\u7A97",dragHint:"\u7528\u9F20\u6807\u62D6\u52A8\u7A7A\u767D\u533A\u57DF\u79FB\u52A8\uFF1B\u6309\u94AE\u548C\u8F93\u5165\u6846\u6B63\u5E38\u64CD\u4F5C",collapse:"\u6536\u8D77",reopen:"\u6253\u5F00\u9C7C\u5E94",refresh:"\u5237\u65B0\u72B6\u6001",settings:"\u8BBE\u7F6E",unknown:"\u6B63\u5728\u8BFB\u53D6\u72B6\u6001\u2026",enabled:"\u9EA6\u514B\u98CE\uFF1A\u5DF2\u5F00\u542F",disabled:"\u9EA6\u514B\u98CE\uFF1A\u672A\u5F00\u542F",identity:"\u5B8C\u6574\u4F1A\u8BDD\u6807\u8BC6",source:"\u6388\u6743\u6765\u6E90",actor:"\u64CD\u4F5C\u4F1A\u8BDD",none:"\u65E0",openSession:"\u5148\u5728 DSH \u4FA7\u680F\u65B0\u5EFA\u6216\u6253\u5F00\u4E00\u4E2A\u5BF9\u8BDD\uFF0C\u518D\u56DE\u5230\u9C7C\u5E94\u3002",enable:"\u5F00\u9EA6",transfer:"\u8BA9\u8FD9\u4E2A\u7A97\u53E3\u63A5\u7BA1\u9EA6\u514B\u98CE",disable:"\u5173\u9EA6",stale:"\u72B6\u6001\u6682\u65F6\u8BFB\u4E0D\u5230",snapshot:"\u4E0A\u6B21\u8BFB\u53D6\u7684\u72B6\u6001",consequence:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u672C\u6B21\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u3002\u6536\u8D77\u540E\u4F1A\u7EE7\u7EED\u5BF9\u8BDD\u3002",savedHint:"\u8BBE\u5907\u4E0E\u58F0\u7EB9\u8BBE\u7F6E\u5728\u4E0B\u6B21\u97F3\u9891\u64CD\u4F5C\u65F6\u751F\u6548",more:"\u66F4\u591A\u5BF9\u8BDD",historyOther:"\u5217\u8868\u6765\u81EA\u5176\u4ED6\u64CD\u4F5C\u4F1A\u8BDD\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6",helperOnline:"\u97F3\u9891\u670D\u52A1\u5728\u7EBF",helperOffline:"\u97F3\u9891\u670D\u52A1\u79BB\u7EBF",pending:"\u6B63\u5728\u5904\u7406\u2026",refreshHint:"\u53EA\u8BFB\u53D6\u72B6\u6001\uFF0C\u4E0D\u542F\u52A8\u9EA6\u514B\u98CE\u6216\u6A21\u578B",modelGuide:"\u9ED8\u8BA4 SenseVoice \u5728\u672C\u673A\u4F7F\u7528 CPU\u3002\u6A21\u578B\u6587\u4EF6\u548C\u8BB8\u53EF\u89C1 docs/model-setup.md\u3002",sensevoiceSource:"SenseVoice \u6765\u6E90",ttsSource:"\u5916\u90E8 TTS \u53C2\u8003",licenseNote:"SenseVoice \u8BB8\u53EF\u8BA8\u8BBA",modelTitle:"\u672C\u5730\u6A21\u578B",modelHint:"\u4FDD\u5B58\u5DF2\u6709 SenseVoice \u6216 CAM++ \u8DEF\u5F84\u3002\u6587\u4EF6\u5728\u4F7F\u7528\u524D\u6821\u9A8C\uFF0C\u58F0\u7EB9\u8FC7\u6EE4\u9700\u53E6\u884C\u5F00\u542F\u3002",asr:"\u8BED\u97F3\u8BC6\u522B",sensevoicePath:"SenseVoice \u672C\u5730\u76EE\u5F55",campplusPath:"CAM++ \u6587\u4EF6\uFF08\u53EF\u9009\uFF09",saveModels:"\u4FDD\u5B58\u6A21\u578B\u8DEF\u5F84",audioTitle:"\u97F3\u9891\u8BBE\u7F6E",soundTitle:"\u8F6E\u6B21\u63D0\u793A\u97F3",headphones:"\u6211\u5DF2\u4F7F\u7528\u8033\u673A",headphonesHint:"\u672A\u786E\u8BA4\u8033\u673A\u65F6\uFF0C\u4E3A\u907F\u514D\u5916\u653E\u56DE\u58F0\u4E0D\u64AD\u653E\u63D0\u793A\u97F3\uFF1B\u8FD9\u4E0D\u662F\u56DE\u58F0\u6D88\u9664\uFF0C\u4E5F\u4E0D\u4F1A\u88C1\u6389\u7528\u6237\u8BB2\u8BDD",automaticBargeIn:"\u542F\u7528\u5B9E\u9A8C\u6027\u81EA\u52A8\u6253\u65AD",stopRequested:"\u5DF2\u8BF7\u6C42\u505C\u6B62\u64AD\u653E\uFF0C\u5C1A\u672A\u786E\u8BA4",stopConfirmed:"\u5DF2\u786E\u8BA4\u505C\u6B62\u64AD\u653E",soundEnabled:"\u542F\u7528\u63D0\u793A\u97F3",soundVolume:"\u63D0\u793A\u97F3\u97F3\u91CF\uFF080\u20131\uFF09",soundUnavailable:"\u97F3\u6548\u6682\u672A\u63A5\u5165\uFF1B\u8FD9\u4E9B\u63A7\u4EF6\u4E0D\u4F1A\u5047\u88C5\u64AD\u653E",soundAvailable:"\u97F3\u6548\u5DF2\u63A5\u5165",mode:"\u8BF4\u8BDD\u65B9\u5F0F",alwaysOn:"\u5F00\u542F\u6301\u7EED\u8046\u542C\uFF08\u9EA6\u514B\u98CE\u5E38\u5F00\uFF09",alwaysOff:"\u5207\u56DE\u6309\u4F4F\u8BF4\u8BDD",modeUnavailable:"\u8BF4\u8BDD\u65B9\u5F0F\u63A7\u5236\u5C1A\u672A\u63A5\u5165",modeNeedsGrant:"\u8BF7\u5148\u8BFB\u53D6\u6700\u65B0\u72B6\u6001\u3002",pttMode:"\u6309\u952E\u8BF4\u8BDD",alwaysMode:"\u81EA\u7531\u9EA6",modeHint:"\u5F00\u59CB\u5BF9\u8BDD\u524D\u53EF\u9884\u9009\u8BF4\u8BDD\u65B9\u5F0F\u3002",readSettings:"\u8BFB\u53D6\u8BBE\u7F6E",device:"\u9EA6\u514B\u98CE\u8BBE\u5907",deviceHint:"\u8BBE\u5907\u540D\u79F0\u6765\u81EA\u97F3\u9891\u670D\u52A1\u7684\u6700\u8FD1\u8BFB\u53D6\u3002\u66F4\u6362\u8BBE\u5907\u540E\uFF0C\u5F00\u59CB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002",sideButton:"\u9F20\u6807\u6309\u4F4F\u8BF4\u8BDD",sideOff:"\u5173\u95ED",sideOne:"\u4FA7\u952E 1",sideTwo:"\u4FA7\u952E 2",speaker:"\u5B9E\u9A8C\u6027\u58F0\u7EB9\u8FC7\u6EE4",speakerHint:"\u6B64\u5F00\u5173\u53EA\u7528\u4E8E\u5DF2\u6709\u7684\u58F0\u7EB9\u914D\u7F6E\uFF1B\u5F53\u524D\u9762\u677F\u6CA1\u6709\u6CE8\u518C\u5165\u53E3\u3002",save:"\u4FDD\u5B58\u8BBE\u7F6E",saved:"\u8BBE\u7F6E\u5DF2\u4FDD\u5B58",historyTitle:"\u5BF9\u8BDD\u5386\u53F2",historyHint:"\u53EA\u663E\u793A\u9C7C\u5E94\u521B\u5EFA\u7684\u5BF9\u8BDD\uFF1B\u63A5\u7EED\u4E0D\u4F1A\u81EA\u52A8\u6062\u590D\u5DF2\u5F52\u6863\u804A\u5929",loadHistory:"\u8BFB\u53D6\u5BF9\u8BDD",newChat:"\u65B0\u4F1A\u8BDD",resume:"\u63A5\u7EED",active:"\u5F53\u524D",archived:"\u5DF2\u5F52\u6863",unavailable:"\u4E0D\u53EF\u7528",empty:"\u6682\u65E0\u53EF\u63A5\u7EED\u7684\u5BF9\u8BDD",noTitle:"\u5BF9\u8BDD",noResume:"\u5F53\u524D\u4E0D\u80FD\u63A5\u7EED",newHint:"\u65B0\u5EFA\u6216\u63A5\u7EED\u4F1A\u5207\u6362\u5F53\u524D\u8BED\u97F3\uFF0C\u64A4\u56DE\u65E7\u6388\u6743\uFF0C\u53EF\u80FD\u7ED3\u675F\u65E7\u540E\u53F0\u4EFB\u52A1\uFF1B\u4E0D\u5408\u5E76\u5386\u53F2\uFF0C\u4E5F\u4E0D\u91CD\u8DD1\u65E7\u4EFB\u52A1",historyStale:"\u70B9\u51FB\u8BFB\u53D6\u5BF9\u8BDD\u67E5\u770B\u6700\u65B0\u8BB0\u5F55"},qd={startConversation:"Start conversation",endConversation:"End conversation",voiceTarget:"Send to",dedicatedVoiceTarget:"Fish Voice conversation",checkingVoiceTarget:"Checking target\u2026",voiceTargetChanged:"The delivery target changed. Check the chat shown here before starting.",chooseCurrentDshTarget:"Use current chat",backToFishVoice:"Back to Fish Voice",currentDshTargetError:"Could not confirm this DSH chat. Check the chat and try again.",chooseVoiceTarget:"Choose a delivery chat",searchVoiceTargets:"Search by chat title or ID",searchVoiceTargetsAction:"Search",existingVoiceTargetList:"Existing DSH chats",boundVoiceTarget:"Current target",voiceTargetAvailability_ready:"Available",voiceTargetAvailability_busy:"Chat is processing a message",voiceTargetAvailability_archived:"Chat is archived",voiceTargetAvailability_unavailable:"Chat is unavailable",voiceTargetAvailability_managed:"Managed by Fish Voice. Direct delivery unavailable.",voiceTargetAvailability_subagent:"Subagent chat. Direct delivery unavailable.",voiceTargetNoMatch:"No matching chats.",voiceTargetEmptyList:"No available chats.",voiceTargetSynthesisNotice:"With an online voice, replies are sent to the speech provider you approved. Select a local voice under Models \u2192 Read aloud to keep speech offline.",bindVoiceTarget:"Use selected chat",savingVoiceTarget:"Saving\u2026",moreVoiceTargets:"Load more",loadingVoiceTargets:"Loading DSH chats\u2026",voiceTargetListError:"Could not load DSH chats.",retryVoiceTargets:"Retry",retryTranscripts:"Voice messages to resend",retryTranscript:"Resend",retryTranscriptBusy:"Waiting until sending is available",retryTranscriptSending:"Resending\u2026",retryTranscriptUncertain:"Delivery is unconfirmed. Check the original chat.",endDiscardsRetries:"Ending the conversation clears these transcripts",modeSwitching:"Switching listening mode\u2026",modeSaving:"Saving listening mode\u2026",modeSwitchUnconfirmed:"Checking which listening mode took effect\u2026",modeSwitchFailed:"The change could not be confirmed. Check the current mode and try again.",updateTitle:"Fish Voice updates",updateOfferTitle:"Fish Voice update available",updateCurrentVersion:"Installed",updateNewVersion:"New",updateChannel_stable:"Stable",updateChannel_preview:"Preview",updateCheck:"Check for updates",updateDetails:"View update",updateLater:"Later",updateInstall:"Update now",updateRelease:"Release notes",updateFeedback:"Send feedback",update_idle:"Reading update status\u2026",update_checking:"Checking for updates\u2026",update_current:"Fish Voice is up to date.",update_available:"An update is ready.",update_incompatible:"This update is incompatible with the current DSH environment.",update_installing:"Updating. DSH may reload Fish Voice\u2026","update_restart-required":"Update installed. Restart DSH to apply it.","update_enable-required":"Update installed. Enable Fish Voice in DSH plugin settings.",update_installed:"Update complete.",update_error:"The update encountered an error. Check for updates to retry.",update_unsupported:"Automatic updates are unavailable. See the official release notes.",updateConnection:"Update status could not be confirmed. Check again when DSH is ready.",audioDevices:"Audio devices",audioSystemDefault:"System default",audioInput:"Audio input",audioOutput:"Audio output",inputDeviceMissing:"Microphone disconnected; selection retained",outputDeviceMissing:"Output disconnected; no automatic fallback",deviceDisconnected:"Disconnected",inputDeviceStopFirst:"Turn off the microphone to switch input. Output changes at the next playback.",outputDeviceUnsupported:"Selecting speech output is not supported on this platform.",deviceListRetry:"Device list unavailable. Open a selector to retry.",voiceHelperCleanupHint:"Confirming microphone release. New recording stays off until this completes.",voiceHelperRestartHint:"Microphone helper exit is unconfirmed. Fully restart DSH before enabling voice.",inputError_device:"Microphone unavailable",inputError_recognition:"Recognition failed","inputError_no-speech":"No clear speech; try again",inputHelp_device:"Check mic access. Turn the mic off to select a device. Error details: Settings \u2192 Advanced \u2192 Diagnostics.",inputDiagnosticTitle:"Last reported audio error",inputDiagnosticHistory:"This is the last recorded error and may be from an earlier attempt. It does not confirm the current device state.",inputHelp_recognition:"Try again. If it fails, turn the mic off and check the model in Settings.","inputHelp_no-speech":"Move closer, check that your mic is unmuted, and try again.",speechFailed:"Speech failed",speechInterrupted:"Speech interrupted",wakeFallbackHint:"Say a configured name. Matching uses the transcript for now. Reselect Wake word after switching modes to retry sound matching.",wakeMode:"Wake word",switchToWake:"Switch to wake-word listening",wakeDisabled:"Wake listening is off",wakeStarting:"Starting wake listening\u2026",wakeWaiting:"Waiting for wake word",wakeListening:"Listening for the next instruction",wakePaused:"Wake listening paused",wakeError:"Wake listening unavailable; check settings",wakeHint:"Say a configured name, then your instruction. End the conversation to stop listening.",wakeMethod:"Matches the sound and transcript locally after the phrase ends.",wakeAliases:"Wake names",wakeAliasesHint:"Up to 8 comma-separated names. Mandarin near-sounds match only at the start; prefer a distinctive name of 3+ characters.",wakeTimeout:"Wait after wake (seconds)",wakeSettings:"Wake-word settings",wakeStopToEdit:"Turn off the microphone before editing wake names or timeout.",wakeInvalid:"Enter 1\u20138 valid names and a 3\u201330 second timeout.",switchToPtt:"Click to use push to talk",switchToAlways:"Click to leave the microphone listening",quickSpeedStop:"Turn the mic off to change speed",performanceReadFirst:"Check which speeds the current model supports first.",performanceUnavailable:"The provider explicitly rejected the reasoning parameter for unavailable modes; other modes remain selectable.",performanceProbeCost:"At load, up to 3 fixed short requests check the modes. Model charges apply.",performanceProbeScope:"Only routes with a testing interface send short requests. Native support can be read directly.",performanceProbeUnknown:"Some modes could not be confirmed. Check network access or sign-in, then retry.",performanceProbeAccepted:"The effort request check passed.",performanceProbePending:"Checking effort modes for the current model\u2026",holdToSpeak:"Hold to speak:",alwaysWarning:"The microphone keeps listening. Turn it off when finished.",bindingMissing:"Bind a push-to-talk shortcut in settings, or switch to continuous listening.",noSession:"No conversation is open",otherWindow:"Microphone: another window",readingStatus:"Reading status without starting the microphone or models.",statusRetry:"Status is unavailable. It will be checked automatically when you return to this window.",retryStatus:"Refresh voice status",collapseHint:"Collapsing keeps the microphone enabled",stopConsequence:"Ending the conversation releases the microphone and stops its background tasks.",transferTitle:"Take over the other window\u2019s microphone?",transferWarning:"This interrupts voice in the other window and may end its background tasks.",cancel:"Cancel",confirmTransfer:"Confirm takeover",bindingStopRequired:"Turn off the microphone before changing mouse or keyboard shortcuts.",bindingFinishing:"Voice is still stopping. Wait before changing shortcuts.",headphonesRequired:"Confirm that you are wearing headphones to enable automatic interruption.",deviceManualIndex:"Advanced: enter device index",deviceManualName:"Advanced: enter device name",deviceIndexInvalid:"Enter a nonnegative whole-number device index.",deviceDefault:"Use the system default microphone",deviceManual:"Advanced: enter name or index",deviceSaved:"Saved device",deviceEmpty:"No microphone was found. Connect a device and check system sound settings.",deviceUnknown:"Detected devices appear after enabling voice. Use the system default or enter a device manually.",ttsBackend:"Speech backend",ttsBackendHint:"Speech uses your installed TTS backend and its settings. Independent output volume appears only when verified.",ttsBackendPending:"Additional backend selection is being adapted. No cloud service is connected automatically.",voiceClone:"Voice cloning",voiceCloneAvailable:"Qwen supports a local reference voice. Choose a WAV in voice settings.",voiceClonePrivacy:"Reads only your selected, authorized sample locally. No audio upload.",inputActive:"Receiving voice input",modeUnknown:"Listening mode unknown",voiceInputUnavailable:"Voice input unavailable",voiceInputRecoveryHint:"The audio service stopped. Turn the microphone off, then on again. Your authorization is unchanged.",searchHistory:"Search chats",searchScope:"Search loaded chats",noMatches:"No matching chats",differentOwner:"Voice belongs to another session. Check the source first.",details:"Diagnostics",noReply:"No conversation yet",recentConversation:"Conversation",recentTenTurns:"Recent 10 turns",allRecords:"All records",showAllRecords:"Show all",collapseToTen:"Last 10 turns",collapseConversation:"Collapse conversation",currentVoiceRecords:"Current voice chat",historyTruncated:"Showing a limited range; original records retained",viewConversation:"View voice records",loadEarlier:"Load earlier",readingHistory:"Reading records\u2026",retryHistory:"Could not read records. Retry",noConversation:"No conversation yet",newMessages:"new messages",conversationMessages:"Voice conversation",assistantName:"Assistant name",renameAssistant:"Rename: Enter to save, Esc to cancel",newChatCreated:"New chat created",newChatActive:"Start a voice chat. Background work in the current chat will stop and its history will be kept.",newChatOtherOwner:"Open the current voice chat or the window that enabled the microphone to start a new chat.",compact_off:"Off",compact_standby:"Standby",compact_listening:"Listening",compact_pending:"Working",compact_unknown:"Check status",you:"You",assistant:"Assistant",close:"Close panel",keyboardBinding:"Push-to-talk binding",bindingOff:"Not bound",saveBindings:"Save shortcuts",discardBindings:"Discard changes",bindingCapture:"Press a key combination (Esc cancels)",clearBinding:"Clear binding",bindingUnsupported:"This key or system shortcut is not supported.",bindingGlobalHint:"Windows global shortcut. Disable voice before recording a binding; changes apply on the next voice enable. Keys are not swallowed and may also trigger another application.",bindingUnavailable:"Global key binding is unavailable on this platform.",bindingPrintableWarning:"A plain letter, digit or Space also triggers push-to-talk while typing in other applications.",performanceTitle:"Voice performance",performanceHint:"Applies to the next dedicated voice chat. For a linked conversation, use the model menu in that DSH chat to change its reasoning effort.",inspectPerformance:"Check available modes",performance_fast:"Fast",performanceNoThinking:"No thinking",performanceRecommended:"[Recommended]",performanceFastHint:"Fast explicitly requests thinking to be turned off.",performanceFastUnavailable:"The current route cannot confirm that thinking can be turned off. Choose Follow model or select a model route that supports turning it off.",performanceHostUnavailable:"The current model route does not offer some reasoning levels.",performance_balanced:"Standard",performance_high:"High",performance_compatibility:"Compatible default",performanceStopRequired:"Mode changes require fully stopped voice. Disabling voice can end background work belonging to its voice root.",savePerformance:"Save for next enable",outputVolume:"Assistant voice volume",outputVolumeHint:"Adjusts the installed Windows dsh-speak backend only. It does not verify the active voice route or change DSTuber, system or cue volume. Applies to the next output.",readOutputVolume:"Read voice volume",saveOutputVolume:"Save voice volume",outputVolumeUnavailable:"This speech backend does not support independent volume control.",outputVolumeUnknown:"The volume save is unconfirmed. It will be checked automatically without resubmitting.",settingsTitle:"\u9C7C\u5E94 settings",settingsSections:"Settings sections",tab_audio:"Audio",tab_interaction:"Interaction",tab_prompt:"Prompt",voicePromptLabel:"Custom prompt",voicePromptOptional:"(optional)",voicePromptAgents:"Follow AGENTS",voicePromptCustom:"Custom prompt added",voicePromptPlaceholder:`For example: Give the conclusion first and use a natural tone.

Added after AGENTS. Leave empty to use the default settings.`,voicePromptStopToEdit:"Stop voice to edit",voicePromptUnsupported:"This DSH version does not support custom prompts yet.",voicePromptTooLong:"The prompt must not exceed 32,768 characters.",voicePromptSaving:"Saving\u2026",voicePromptCancel:"Cancel changes",voicePromptSave:"Save",voicePromptSaved:"Saved. Applies when voice is next started.",voicePromptSaveFailed:"Could not save. Your draft has been kept.",voicePromptUnsaved:"Not saved",tab_models:"Models",tab_advanced:"Advanced",projectInfoTitle:"About \u9C7C\u5E94",projectAuthor:"Author",projectRepository:"Official repository",projectNpm:"npm package",tab_sessions:"Sessions",settingsContent:"Settings content",voiceCleanupPending:"Closing previous audio service",voiceCleanupHint:"Waiting for the previous session and recording to exit. Status will refresh without retrying microphone activation.",voiceRestartPending:"Restart DSH required",voiceRestartHint:"The previous audio service has not confirmed exit. Fully quit and reopen DSH before enabling voice. Your saved authorization is unchanged.",voiceRecoveryPending:"Previous voice session is still active",voiceRecoveryCheck:"Check and stop",voiceRecoveryHint:"The previous instance is still closing. Check and stop first. If it remains active, fully restart DSH before enabling voice. Your authorization is retained.",operationUnavailable:"The outcome is unconfirmed. Automatic readback will check the actual state without resubmitting. Details are in Advanced settings.",enableFailed:"Could not open the mic. Check Advanced settings for details before retrying.",tab_pets:"Desktop pet",planned:"Planned development",configurationUnknown:"The configuration write is unconfirmed. Automatic readback is in progress; changes stay locked until verified.",motionTitle:"Interface motion",motion_spring:"Spring",motion_firm:"Firm",motion_off:"Off",motionHint:"Preview and save immediately. Actions never wait for animation. System reduced-motion preference takes priority.",motionNotSaved:"Preview applied, but this browser could not save the preference.",modeControlPending:"Voice control is pending or unconfirmed. Refresh status when it finishes.",capabilityTitle:"Host capabilities and voice visibility",supported:"Available",unsupported:"Unavailable or unconfirmed",hiddenMode:"Hidden voice chat",workspaceMode:"Workspace-visible compatibility mode",taskCapability:"Persistent handoff",configuredMode:"Saved mode",currentVoiceMode:"Actual mode of the current voice chat",noActiveVoice:"No running voice chat",chooseVisibility:"Choose visibility",workspaceWarning:"Workspace-visible compatibility mode shows voice chats in the regular workspace. Unavailable hidden mode still refuses to start; it never falls back to visible mode.",visibilityNoMigration:"This preference applies to later chats. Existing chats keep their current visibility.",modeReadFirst:"Checking settings and status for this conversation before visibility can be changed.",closeBeforeMode:"Turn voice off and wait for confirmed shutdown before changing visibility.",saveWorkspace:"Save workspace-visible mode",saveHidden:"Save hidden mode",visibilityUnknownWrite:"The visibility write is unconfirmed. Automatic readback is in progress; changes stay locked. The original write will not be repeated.",outputObservationUnavailable:"Actual playback-start events are unavailable; playback has not been confirmed.",title:"\u9C7C\u5E94",description:"Voice controls, audio preferences, and separate voice chats.",drag:"Move Fish Voice panel",dragHint:"Drag background space with the mouse; controls remain interactive",collapse:"Collapse",reopen:"Open Fish Voice",refresh:"Refresh status",settings:"Settings",unknown:"Reading status\u2026",enabled:"Microphone enabled",disabled:"Microphone off",identity:"Full session identities",source:"Authorization source",actor:"Action session",none:"None",openSession:"Open a DSH conversation first",enable:"Enable for this session",transfer:"Authorize this session",disable:"Disable voice",stale:"Refresh to confirm status",snapshot:"Last read status",consequence:"Disabling or switching voice may end its background work. Collapsing this panel leaves voice enabled.",savedHint:"Device and speaker settings take effect on the next audio operation or helper reload.",more:"More voice chats",historyOther:"This list belongs to another action session; read it again",helperOnline:"Audio helper online",helperOffline:"Audio helper offline",pending:"Working\u2026",refreshHint:"Read status without starting the microphone or a model",modelGuide:"SenseVoice runs locally on the CPU. For model files and licenses, see docs/model-setup.md.",sensevoiceSource:"SenseVoice source",ttsSource:"External TTS reference",licenseNote:"SenseVoice licensing discussion",modelTitle:"Local models",modelHint:"Save existing SenseVoice or CAM++ paths. Files are verified before use. Speaker filtering is enabled separately.",asr:"Speech recognition",sensevoicePath:"Local SenseVoice directory",campplusPath:"CAM++ file (optional)",saveModels:"Save model paths",audioTitle:"Audio settings",soundTitle:"Turn sounds",headphones:"I am using headphones",headphonesHint:"Cues stay off until headphones are confirmed, to avoid speaker echo. This is not echo cancellation and does not trim your speech.",automaticBargeIn:"Enable experimental automatic interruption",stopRequested:"Stop requested; playback has not confirmed stopping",stopConfirmed:"Playback confirmed stopped",soundEnabled:"Enable turn sounds",soundVolume:"Sound volume (0\u20131)",soundUnavailable:"Sound playback is not connected; these controls cannot play cues yet.",soundAvailable:"Sound playback connected",mode:"Listening mode",alwaysOn:"Enable always listening (mic stays on)",alwaysOff:"Use push to talk",modeUnavailable:"Listening mode control is not connected",modeNeedsGrant:"Read the current voice status first",pttMode:"Push to talk",alwaysMode:"Open mic",modeHint:"The audio helper controls the active mode. Saving preferences never grants or starts microphone access.",readSettings:"Read settings",device:"Input device",deviceHint:"Blank uses the system default; enter a device name or index",sideButton:"Mouse push-to-talk",sideOff:"Off",sideOne:"Side button 1",sideTwo:"Side button 2",speaker:"Experimental speaker filtering",speakerHint:"Enable matching only; this page does not record or enroll a voiceprint",save:"Save settings",saved:"Settings saved",historyTitle:"Voice chats",historyHint:"Only Fish Voice voice chats appear here. Resume never unarchives a chat automatically.",loadHistory:"Read voice chats",newChat:"New chat",resume:"Resume",active:"Current",archived:"Archived",unavailable:"Unavailable",empty:"No voice chats available",noTitle:"Voice chat",noResume:"Cannot resume right now",newHint:"New or resumed chats switch current voice, revoke its old grant, and may end its background work. They do not merge history or replay old work.",historyStale:"Read voice chats to see the latest records"};var zn=require("react");var eg=/^7b94c8e3-d6a1-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,Ui=e=>typeof e=="string"&&eg.test(e);var Wd="sidebar.workspaces",ng="workspace",tg="whaleWorkspacePresentation",og=["sidebar.workspaces.directoryFlow","sidebar.workspaces.session.row.action","sidebar.session.row.leading","sidebar.session.row.trailing","sidebar.session.row.hover"],rg=new Set(["one-shot","continuable","unknown"]);function ig(e,n){return e&&typeof e=="object"&&Object.keys(e).length===n.length&&n.every(t=>Object.hasOwn(e,t))}function ag(e){if(!Array.isArray(e)||e.length>512)return null;let n=[],t=new Set;for(let o of e){if(!ig(o,["id","parentId","mode"])||typeof o.id!="string"||!o.id||o.id.length>256||t.has(o.id))return null;if(o.parentId===null){if(o.mode!==null||!Ui(o.id))return null;n.push({id:o.id,parentId:null,mode:null})}else{if(typeof o.parentId!="string"||!o.parentId||o.parentId===o.id||!rg.has(o.mode))return null;n.push({id:o.id,parentId:o.parentId,mode:o.mode})}t.add(o.id)}return n}function sg(e,n){if(!e||typeof e!="object"||!e.byId||!Array.isArray(e.ids))return e;let t=new Map(n.map(c=>[c.id,c])),o=Object.create(null),r=new Set,i=!1;for(let[c,u]of Object.entries(e.byId)){let d=t.get(c);if(Ui(c)&&d===void 0){r.add(c),i=!0;continue}if(d?.parentId===null){if(u.parentId===void 0&&u.origin!=="subagent"){o[c]=u;continue}r.add(c),i=!0;continue}if(d&&u.origin==="subagent"&&u.parentId===d.parentId){let m={...u};delete m.origin,o[c]=m,i=!0;continue}o[c]=u}for(let c of n){let u=e.byId[c.id];u&&(c.parentId===null&&(u.parentId!==void 0||u.origin==="subagent")||c.parentId!==null&&(u.origin!=="subagent"||u.parentId!==c.parentId)||e.ids.includes(c.id)||(i=!0))}if(!i)return e;let a=e.ids.filter(c=>!r.has(c)&&o[c]!==void 0);for(let c of n)o[c.id]!==void 0&&!a.includes(c.id)&&a.push(c.id);let l=e.projectionsBySession;if(l&&r.size>0){let c={...l};for(let u of r)delete c[u];l=c}return{...e,ids:a,byId:o,projectionsBySession:l}}function lg(e,n){return!e||e.locale!==ng||e.options?.id!==void 0||e.options?.key!==void 0||(e.options?.priority??0)!==0||typeof n!="function"||n.name!=="WorkspaceBrowser"?!1:og.every(t=>Object.hasOwn(e.children??{},t))}function cg(e){if(!Object.isExtensible(e))return!1;let n=Object.getOwnPropertyDescriptor(e,"component");return n===void 0||n.writable===!0}function ug(e,n){return e.length===n.length&&e.every((t,o)=>{let r=n[o];return t.id===r.id&&t.parentId===r.parentId&&t.mode===r.mode})}function Kd(e,n){let t=[],o=0,r={revision:o,items:t},i,a=!1,l=!1,c=new Set,u=new Set,d=C=>{for(let B of[...C])B()},m={getSnapshot:()=>r,subscribe(C){return u.add(C),()=>u.delete(C)}},f=()=>{o++,r={revision:o,items:t},d(u),d(c)},p=C=>{a!==C&&(a=C,f())},y=()=>{let C=i;i=void 0,C&&C.entry.component===C.wrapper&&(C.entry.component=C.original)},v=()=>{if(l)return;let C;try{C=e.entries(Wd)}catch{C=void 0}let B=Array.isArray(C)?C.filter(M=>{let A=i&&i.entry===M&&M.component===i.wrapper?i.original:M?.component;return lg(M,A)}):[];if(B.length!==1||typeof n!="function"||!cg(B[0])){y(),p(!1);return}let D=B[0];if(i?.entry===D&&D.component===i.wrapper)return;y(),p(!1);let E=D.component,$=M=>{let A=M.useSessions(I=>I),k=M.useWhaleWorkspacePresentation(I=>I),P=(0,zn.useMemo)(()=>sg(A,k.items),[A,k]),V=(0,zn.useCallback)(I=>I(P),[P]),S=(0,zn.useMemo)(()=>new Map(k.items.map(I=>[I.id,I])),[k]),N=(0,zn.useCallback)(I=>{let G=S.get(I),L=A.byId[I];if(G?.parentId&&L?.origin==="subagent"&&L.parentId===G.parentId){n({childSessionId:I,parentSessionId:G.parentId,mode:G.mode});return}M.open?.(I)},[M.open,S,A]);return(0,zn.createElement)(E,{...M,useSessions:V,open:N})},z=function(A){let k=typeof A?.useSessions=="function"&&typeof A?.useWhaleWorkspacePresentation=="function"&&typeof A?.open=="function";return(0,zn.useEffect)(()=>{i?.entry===D&&i.wrapper===z&&p(k)},[k]),(0,zn.createElement)(k?$:E,A)};z.displayName="WhaleWorkspacePresentation",D.component=z,i={entry:D,original:E,wrapper:z}},b=()=>{},x=()=>{};try{b=e.provideRoot({hooks:{[tg]:m}}),typeof b!="function"&&(b=()=>{}),x=e.subscribe(Wd,v),typeof x!="function"&&(x=()=>{}),v()}catch{x(),y(),b(),p(!1)}return{supported:()=>a,subscribe(C){return c.add(C),()=>c.delete(C)},setOverrides(C){if(l)return!1;let B=ag(C);return B===null?(t.length>0&&(t=[],f()),!1):(ug(t,B)||(t=B,f()),!0)},dispose(){l||(l=!0,x(),y(),a=!1,f(),b(),c.clear(),u.clear())}}}var dg=["slots","locale","remote","uiSession"];function pg(e){let n=ld(),t=Ju(void 0,{observe:n.internal});t.enableAutomaticReads();let o=Xu();e.inject(["whaleFloatingLayout"],v=>{v.effect(()=>o.useLayoutService(v.whaleFloatingLayout),"whale-voice: optional magnetic layout")});let r=ed(),i=Yu(window,{onResize:v=>o.fit(v)}),a,l=()=>{};e.effect(()=>{let v=()=>{t.setReadVisibility(document.visibilityState!=="hidden"),document.visibilityState!=="hidden"&&(t.refresh(),a?.refresh(),l())};return window.addEventListener("focus",v),window.addEventListener("online",v),document.addEventListener("visibilitychange",v),v(),()=>{window.removeEventListener("focus",v),window.removeEventListener("online",v),document.removeEventListener("visibilitychange",v)}},"whale-voice: refresh visible state"),e.effect(()=>{let v=Kd(e.slots,z=>e.get?.("uiWorkspace")?.openSession(z)),b,x,C=()=>{x?.(),x=null};l=()=>{if(!v.supported()){C();return}if(!b||x)return;let z=b,M=!0;x=b.subscribePresentation(A=>{v.setOverrides(A.shown),M&&(M=!1,t.refresh({force:!0}))},A=>{b===z&&(C(),console.warn("\u9C7C\u5E94\u4FA7\u680F\u4F1A\u8BDD\u663E\u793A\u8FDE\u63A5\u4E2D\u65AD",A?.message??A))})};let B=v.subscribe(l),D=!1;a=Ji(async()=>{let z=D?"ui-reconnect":"ui-connect";n.internal(z,"requested");try{let M=await od(e,n.internal);return n.internal(z,"finished","ok"),M}catch(M){throw D=!0,n.internal(z,"finished","failed"),M}},{visible:()=>t.getSnapshot().readVisible!==!1,onReady:z=>{C(),b=z,n.attach(z),t.attachConversationClient(z),l()},onError:z=>t.conversationUnavailable(z)});let E=t.getSnapshot().readVisible,$=t.subscribe(()=>{let z=t.getSnapshot().readVisible;z!==E&&(E=z,a.visibilityChanged())});return a.start(),()=>{l=()=>{},C(),B(),v.dispose(),$(),n.dispose(),a.dispose(),t.dispose()}},"whale-voice: private conversation stream"),e.effect(()=>()=>{t.dispose(),i.dispose(),o.dispose(),r.dispose()},"whale-ear-ui: state and geometry"),e.effect(()=>e.locale.register("whaleEar",{en:qd,zh:Gd}),"whale-ear-ui: dictionaries"),e.effect(()=>{let v=document.createElement("style");return v.dataset.plugin="dsh-whale-ear-ui",v.textContent=h.text+Ad+Wi,document.head.append(v),()=>v.remove()},"whale-ear-ui: stylesheet");let c=async v=>{let b=e.get?.("sessions");if(!b)throw new Error("DSH \u4F1A\u8BDD\u754C\u9762\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");return b.list.getSnapshot().byId[v]||await b.refresh(),b},u=0,d=async v=>{let b=++u;if(v.kind==="root"&&await c(v.id),b!==u)return;let x=e.get?.("uiWorkspace");if(!x?.openSession)throw new Error("DSH \u4F1A\u8BDD\u754C\u9762\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");return x.openSession(v.kind==="root"?v.id:{childSessionId:v.id,parentSessionId:v.parentId,mode:v.mode??"unknown"})},m=v=>d({kind:"root",id:v}),f={subscribe(v){let b=[e.uiSession.adapter?.current?.subscribe(v),e.get?.("layout")?.panelInfo?.subscribe(v),e.get?.("sessions")?.list?.subscribe?.(v)];return()=>b.forEach(x=>x?.())},selectedSession(){let v=e.uiSession.adapter?.current?.getSnapshot();return v?.hooks?.session?.getSnapshot()?.blank===!0?null:v?.props?.sessionId??null},currentConversation(){return e.get?.("layout")?.panelInfo?.getSnapshot()?.activePanelId===null?f.selectedSession():null},sourceFor(v){if(!v)return null;let b=e.get?.("sessions"),x=b?.list?.getSnapshot()?.byId?.[v];return b?.subagentAddress?.(v)||x?.origin==="subagent"||x?.parentId?null:v}},p=async(v,b)=>{let C=await(await c(v)).using(v,{source:"workspaceOperation"},B=>B.binding.session.rename(b));if(!C.ok)throw new Error(C.error.message);return C.value.title},y=()=>({captureBindings:t.captureBindings,refreshModelCompute:t.refreshModelCompute,pickPath:t.pickPath,readState:t.getSnapshot,markSettingsEdited:t.markSettingsEdited,discardSettingsDraft:t.discardSettingsDraft,openAuthorization:t.openAuthorization,closeAuthorization:t.closeAuthorization,saveAuthorization:t.saveAuthorization,readOperationLog:t.readOperationLog,manageSessions:t.manageSessions,listExistingVoiceSessions:t.listExistingVoiceSessions,setExistingVoiceSession:t.setExistingVoiceSession,setSettingsTab:t.setSettingsTab,setSettingsModelTab:t.setSettingsModelTab,setSessionManagement:t.setSessionManagement,senseVoiceAsrAction:t.senseVoiceAsrAction,updateAction:t.updateAction,dismissUpdate:t.dismissUpdate,openExistingVoiceSession:m,openManagedSession:d,renameManagedSession:p,hooks:{whaleUi:t,whalePreferences:r},setMotion:v=>r.setMotion(v),setAssistantName:v=>r.setAssistantName(v),run:(...v)=>t.run(...v),setSession:v=>t.setSession(v),cancelPreview:()=>t.cancelPreview(),discardDiagnostics:()=>t.discardDiagnostics(),dismissSetup:()=>t.dismissSetup(),openSetup:()=>t.openSetup(),showHome:()=>t.showHome(),openSettings:t.openSettings,refresh:()=>t.refresh()});e.slots.inject("shell.overlay",()=>e.slots.register({name:"shell.overlay",id:"whale-ear",locale:"whaleEar",inject:()=>({geometry:o,sizing:i,recordUserOperation:n.user,setPanelVisible:t.setPanelVisible,closeAuthorization:t.closeAuthorization,refresh:()=>t.refresh(),showHome:()=>t.showHome(),dismissSetup:()=>t.dismissSetup(),hooks:{whaleUi:t,whalePreferences:r}}),children:{"whale-ear.panel.controls":{kind:"single",scope:"root"}}},Bd)),e.slots.inject("whale-ear.panel.controls",()=>e.slots.register({name:"whale-ear.panel.controls",locale:"whaleEar",inject:()=>({...y(),controlContext:f,retryVoiceTranscript:t.retryVoiceTranscript})},Fd))}
return module.exports;}});
