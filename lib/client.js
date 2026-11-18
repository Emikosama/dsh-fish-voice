window.__ModuleLoader__.load({id:"dsh-fish-voice",factory:(require)=>{var module={exports:{}};var exports=module.exports;
var xr=Object.defineProperty;var np=Object.getOwnPropertyDescriptor;var tp=Object.getOwnPropertyNames;var op=Object.prototype.hasOwnProperty;var qi=(e,n)=>{for(var t in n)xr(e,t,{get:n[t],enumerable:!0})},rp=(e,n,t,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let r of tp(n))!op.call(e,r)&&r!==t&&xr(e,r,{get:()=>n[r],enumerable:!(o=np(n,r))||o.enumerable});return e};var ip=e=>rp(xr({},"__esModule",{value:!0}),e);var ug={};qi(ug,{apply:()=>cg,inject:()=>lg});module.exports=ip(ug);var Ot=require("react");var wn={range:"BL4H9G_range",toggleTrack:"BL4H9G_toggleTrack",rail:"BL4H9G_rail",collapseInner:"BL4H9G_collapseInner",thumb:"BL4H9G_thumb",fill:"BL4H9G_fill",toggle:"BL4H9G_toggle",collapse:"BL4H9G_collapse",input:"BL4H9G_input",text:`.BL4H9G_range {
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

.BL4H9G_rail {
  background: var(--dsw-alias-border-l2, #8791a4);
  pointer-events: none;
  border-radius: 999px;
  height: 6px;
  position: absolute;
  inset: 13px 9px;
  min-width: 0 !important;
  margin: 0 !important;
}

.BL4H9G_fill {
  width: var(--whale-range-position);
  background: var(--dsw-alias-brand-primary, #8ba9e7);
  border-radius: inherit;
  transition: width var(--whale-duration, .2s) var(--whale-ease, ease-out);
  position: absolute;
  inset: 0 auto 0 0;
  min-width: 0 !important;
  margin: 0 !important;
}

.BL4H9G_thumb {
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

.BL4H9G_range .BL4H9G_input {
  opacity: 0;
  cursor: pointer;
  touch-action: pan-y;
  height: 32px;
  margin: 0;
  position: absolute;
  inset: 0;
  width: 100% !important;
}

.BL4H9G_range:focus-within {
  outline: 2px solid var(--dsw-focus-ring-color, #8ba9e7);
  outline-offset: 2px;
  border-radius: 6px;
}

.BL4H9G_range:hover .BL4H9G_thumb {
  box-shadow: 0 0 0 4px color-mix(in srgb,var(--dsw-alias-brand-primary, #8ba9e7) 18%,transparent);
}

.BL4H9G_range[data-dragging] :is(.BL4H9G_thumb, .BL4H9G_fill) {
  transition-duration: 40ms;
  transition-timing-function: linear;
}

.BL4H9G_range[data-disabled], .BL4H9G_toggle[data-disabled] {
  opacity: .5;
}

.BL4H9G_range[data-disabled] .BL4H9G_input {
  cursor: not-allowed;
}

.BL4H9G_collapse {
  opacity: 0;
  visibility: hidden;
  grid-template-rows: 0fr;
  transition: grid-template-rows .16s ease-out, opacity .12s ease-out, visibility .16s;
  display: grid;
}

.BL4H9G_collapse[data-open="true"] {
  opacity: 1;
  visibility: visible;
  grid-template-rows: 1fr;
}

.BL4H9G_collapseInner {
  min-height: 0;
  overflow: hidden;
}

.BL4H9G_toggle {
  cursor: pointer;
  align-items: center;
  gap: 8px;
  width: fit-content;
  max-width: 100%;
  font-size: 12px;
  display: flex;
  position: relative;
}

.BL4H9G_toggle > input {
  opacity: 0;
  width: 38px;
  height: 24px;
  margin: 0;
  position: absolute;
}

.BL4H9G_toggleTrack {
  pointer-events: none;
  background: var(--dsw-alias-border-l2, #8791a4);
  width: 36px;
  height: 22px;
  transition: background-color var(--whale-duration, .2s);
  border-radius: 999px;
  flex: none;
  position: relative;
}

.BL4H9G_toggleTrack > span {
  background: var(--dsw-alias-bg-layer-1, #fff);
  width: 16px;
  height: 16px;
  transition: left var(--whale-duration, .2s) var(--whale-ease, ease-out);
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
}

.BL4H9G_toggle > input:checked + .BL4H9G_toggleTrack {
  background: var(--dsw-alias-brand-primary, #8ba9e7);
}

.BL4H9G_toggle > input:checked + .BL4H9G_toggleTrack > span {
  left: 17px;
}

.BL4H9G_toggle > input:focus-visible + .BL4H9G_toggleTrack {
  outline: 2px solid var(--dsw-focus-ring-color, #8ba9e7);
  outline-offset: 2px;
}

[data-motion="firm"] :is(.BL4H9G_range, .BL4H9G_toggle, .BL4H9G_collapse) {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="firm"] .BL4H9G_collapse {
  transition-duration: .1s;
}

[data-motion="off"] :is(.BL4H9G_range, .BL4H9G_toggle, .BL4H9G_collapse), [data-motion="off"] :is(.BL4H9G_range, .BL4H9G_toggle, .BL4H9G_collapse) * {
  transition: none !important;
  animation: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .BL4H9G_range, .BL4H9G_toggle, .BL4H9G_collapse, .BL4H9G_range *, .BL4H9G_toggle *, .BL4H9G_collapse * {
    transition: none !important;
    animation: none !important;
  }
}

@media (forced-colors: active) {
  .BL4H9G_range .BL4H9G_input {
    opacity: 1;
    position: relative;
  }

  .BL4H9G_rail {
    display: none;
  }

  .BL4H9G_toggleTrack {
    border: 1px solid buttontext;
  }

  .BL4H9G_toggleTrack > span {
    background: buttontext;
  }

  .BL4H9G_toggle > input:checked + .BL4H9G_toggleTrack {
    background: highlight;
  }
}
`};var on=require("react/jsx-runtime"),Hi=wn.text;function Rt({value:e,defaultValue:n=0,min:t=0,max:o=100,disabled:r,onChange:i,onPointerDown:s,onPointerUp:c,onPointerCancel:l,onLostPointerCapture:u,className:d="",style:m,...f}){let[p,y]=(0,Ot.useState)(n),[v,b]=(0,Ot.useState)(!1);(0,Ot.useEffect)(()=>{r&&b(!1)},[r]);let x=Number(e??p),z=Number(t),M=Number(o),$=M>z&&Number.isFinite(x)?Math.max(0,Math.min(1,(x-z)/(M-z))):0,j=W=>U=>{b(!1),W?.(U)};return(0,on.jsxs)("span",{className:wn.range,"data-whale-motion-range":!0,"data-dragging":v&&!r||void 0,"data-disabled":r||void 0,style:{"--whale-range-position":`${$*100}%`},children:[(0,on.jsxs)("span",{className:wn.rail,"aria-hidden":"true",children:[(0,on.jsx)("span",{className:wn.fill}),(0,on.jsx)("span",{className:wn.thumb})]}),(0,on.jsx)("input",{...f,className:`${wn.input} ${d}`,style:m,type:"range",min:t,max:o,value:e??p,disabled:r,onChange:W=>{r||(e===void 0&&y(W.target.value),i?.(W))},onPointerDown:W=>{r||b(!0),s?.(W)},onPointerUp:j(c),onPointerCancel:j(l),onLostPointerCapture:j(u),onBlur:W=>{b(!1),f.onBlur?.(W)}})]})}function Vi({open:e,children:n,className:t="",...o}){return(0,on.jsx)("div",{...o,className:`${wn.collapse} ${t}`,"data-open":!!e,"aria-hidden":!e,inert:e?void 0:"",children:(0,on.jsx)("div",{className:wn.collapseInner,children:n})})}function Ft({label:e,checked:n,disabled:t,onChange:o,...r}){return(0,on.jsxs)("label",{className:wn.toggle,"data-disabled":t||void 0,children:[(0,on.jsx)("input",{...r,type:"checkbox",role:"switch",checked:n,disabled:t,onChange:i=>o?.(i.target.checked)}),(0,on.jsx)("span",{className:wn.toggleTrack,"aria-hidden":"true",children:(0,on.jsx)("span",{})}),(0,on.jsx)("span",{children:e})]})}function Gi(e,{onReady:n,onError:t,visible:o=()=>!0,schedule:r=setTimeout,unschedule:i=clearTimeout}={}){let s=!1,c=!1,l=!1,u=null,d=0,m=null,f=()=>{u!==null&&i(u),u=null},p=async()=>{if(!(s||c||l||!o())){f(),c=!0;try{let y=await e();if(s){await y.dispose();return}try{n(y)}catch(v){throw await y.dispose(),v}m=y,l=!0,d=0}catch(y){if(s)return;t(y),d++,o()&&(u=r(()=>{u=null,p()},Math.min(3e4,750*2**Math.min(d-1,6))),u?.unref?.())}finally{c=!1}}};return{start:p,visibilityChanged(){o()?p():f()},refresh(){p()},dispose(){s=!0,f(),m?.dispose()}}}function Mt(e){return e===null||e&&typeof e=="object"&&!Array.isArray(e)&&Object.keys(e).sort().join(",")==="backend,id,name"&&["winmm","portaudio"].includes(e.backend)&&typeof e.id=="string"&&e.id.length>0&&e.id.length<=1024&&typeof e.name=="string"&&e.name.trim().length>0&&e.name.length<=256&&!/[\u0000-\u001f\u007f]/.test(e.id+e.name)}function Ji(e){return e&&e.schema===1&&["input","output"].every(n=>{let t=e[n];return!t||!["available","empty","unavailable"].includes(t.status)||!Array.isArray(t.items)||t.items.length>128||!(t.reason===null||typeof t.reason=="string"&&t.reason.length<=128)?!1:t.items.every(o=>o!==null&&Mt(o))&&new Set(t.items.map(o=>o.backend+":"+o.id)).size===t.items.length&&(t.status==="available"?t.items.length>0:t.items.length===0)})}var mt=Object.freeze(["ptt","always","wake"]),xo=e=>({ptt:"pttMode",always:"alwaysMode",wake:"wakeMode"})[e]??"modeUnknown",Ki=e=>["waiting","listening"].includes(e?.state)&&e?.streamOpen!==!0?"unknown":{disabled:"wakeDisabled",starting:"wakeStarting",waiting:"wakeWaiting",listening:"wakeListening",paused:"wakePaused",error:"wakeError"}[e?.state]??"unknown",Xi=e=>e!==null&&typeof e=="object"&&!Array.isArray(e)&&["disabled","starting","waiting","listening","paused","error"].includes(e.state)&&(e.deadlineAt===null||Number.isFinite(e.deadlineAt)&&e.deadlineAt>=0)&&typeof e.streamOpen=="boolean"&&["asr-after-utterance","acoustic-after-utterance"].includes(e.detection),Yi=e=>[...new Set(String(e).split(/[,，\n]/).map(n=>n.trim()).filter(Boolean))],_o=e=>Array.isArray(e)&&e.length>=1&&e.length<=8&&new Set(e.map(n=>typeof n=="string"?n.toLowerCase():n)).size===e.length&&e.every(n=>typeof n=="string"&&n.trim()===n&&n.length>=2&&n.length<=24&&!/[\p{C}]/u.test(n)&&/[\p{L}\p{N}]/u.test(n));function Qi(e){if(!e||typeof e!="object"||Array.isArray(e)||!["unknown","available","empty","unavailable"].includes(e.status)||!Array.isArray(e.items)||e.items.length>128)return!1;if(e.status==="unknown")return e.observedAt===null&&e.items.length===0;if(!Number.isFinite(e.observedAt)||e.observedAt<0)return!1;if(e.status!=="available")return e.items.length===0;let n=new Set;return e.items.length>0&&e.items.every(t=>!t||typeof t!="object"||Array.isArray(t)||!Number.isSafeInteger(t.index)||t.index<0||n.has(t.index)||typeof t.name!="string"||!t.name.trim()||t.name.length>256||/[\u0000-\u001f\u007f]/.test(t.name)?!1:(n.add(t.index),!0))}var se={};qi(se,{BIGINT_FORMAT_RANGES:()=>Uo,CONSTANT_CATCH:()=>cs,Class:()=>Pr,NUMBER_FORMAT_RANGES:()=>Zt,aborted:()=>_n,allowsEval:()=>Nr,assert:()=>dp,assertEqual:()=>sp,assertIs:()=>cp,assertNever:()=>up,assertNotEqual:()=>ap,assignProp:()=>cn,attachSchema:()=>Lt,base64ToUint8Array:()=>as,base64urlToUint8Array:()=>Np,cached:()=>vt,captureStackTrace:()=>Po,cleanEnum:()=>jp,cleanRegex:()=>Bt,clone:()=>xn,cloneDef:()=>fp,codePointLength:()=>qt,constantCatch:()=>us,createTransparentProxy:()=>wp,defineLazy:()=>zr,defineLazyInternal:()=>fe,derived:()=>Ip,esc:()=>Cr,escapeRegex:()=>In,explicitlyAborted:()=>Wr,extend:()=>kp,finalizeIssue:()=>kn,floatSafeRemainder:()=>Ur,getElementAtPath:()=>hp,getEnumValues:()=>ht,getLengthableOrigin:()=>Ht,getParsedType:()=>yp,getSizableOrigin:()=>ss,hexToUint8Array:()=>Ep,hide:()=>jo,installLazyProp:()=>Op,isObject:()=>rt,isPlainObject:()=>Vn,issue:()=>yt,joinValues:()=>ko,jsonStringifyReplacer:()=>gt,members:()=>Tr,merge:()=>Sp,mergeDefs:()=>Wn,normalizeParams:()=>oe,nullish:()=>Sr,numKeys:()=>bp,objectClone:()=>pp,omit:()=>_p,optionalKeys:()=>Er,own:()=>Hn,parsedType:()=>Ir,partial:()=>Up,pick:()=>xp,prefixIssues:()=>Tn,primitiveTypes:()=>rs,promiseAllObject:()=>gp,propertyKeyTypes:()=>Ar,randomString:()=>vp,rawShape:()=>bt,required:()=>zp,safeExtend:()=>Pp,shallowClone:()=>os,sizeCaps:()=>Co,slugify:()=>jr,stringifyPrimitive:()=>So,toZod:()=>lp,uint8ArrayToBase64:()=>ls,uint8ArrayToBase64url:()=>Ap,uint8ArrayToHex:()=>Wp,unwrapMessage:()=>ft});function sp(e){return e}function ap(e){return e}function lp(){return e=>e}function cp(e){}function up(e){throw new Error("Unexpected value in exhaustive check")}function dp(e){}function ht(e){let n=Object.values(e).filter(o=>typeof o=="number");return Object.entries(e).filter(([o,r])=>n.indexOf(+o)===-1).map(([o,r])=>r)}function ko(e,n="|"){return e.map(t=>So(t)).join(n)}function gt(e,n){return typeof n=="bigint"?n.toString():n}var kr=class{constructor(n){this._getter=n,this._value=void 0}get value(){let n=this._getter;return n!==void 0&&(this._value=n(),this._getter=void 0),this._value}};function vt(e){return new kr(e)}function Sr(e){return e==null}function Bt(e){let n=e.startsWith("^")?1:0,t=e.endsWith("$")?e.length-1:e.length;return e.slice(n,t)}function Ur(e,n){let t=e/n,o=Math.round(t),r=4*Number.EPSILON*Math.max(Math.abs(t),1);return Math.abs(t-o)<r?0:t-o}var es=Symbol("evaluating");function zr(e,n,t){let o;Object.defineProperty(e,n,{get(){if(o!==es)return o===void 0&&(o=es,o=t()),o},set(r){Object.defineProperty(e,n,{value:r})},configurable:!0})}function pp(e){return Object.create(Object.getPrototypeOf(e),Object.getOwnPropertyDescriptors(e))}function cn(e,n,t){Object.defineProperty(e,n,{value:t,writable:!0,enumerable:!0,configurable:!0})}function bt(e){let n=Object.getOwnPropertyDescriptor(e,"shape");return n?.get?n.get.raw:n?.value}function En(e){return bt(e._zod.def)??e._zod.def.shape}function ns(e,n,t){Object.defineProperty(e,n,{get(){let o=t();return cn(this,n,o),o},enumerable:!0,configurable:!0})}function ts(e,n,t){n in e?cn(e,n,t):e[n]=t}function ot(e,n,t,o){let r=En(n);for(let i of t){let s=Object.getOwnPropertyDescriptor(r,i);s.enumerable&&(s.get?ns(e,i,()=>{let c=n._zod.def.shape[i];return o?o(c,i):c}):ts(e,i,o?o(s.value,i):s.value))}}function mp(e,n){for(let t of Reflect.ownKeys(n)){let o=Object.getOwnPropertyDescriptor(n,t);o.enumerable&&(o.get?ns(e,t,()=>n[t]):ts(e,t,o.value))}}function Wn(...e){let n={};for(let t of e){let o=Object.getOwnPropertyDescriptors(t);Object.assign(n,o)}return Object.defineProperties({},n)}function fp(e){return Wn(e._zod.def)}function hp(e,n){return n?n.reduce((t,o)=>t?.[o],e):e}function gp(e){let n=Object.keys(e),t=n.map(o=>e[o]);return Promise.all(t).then(o=>{let r={};for(let i=0;i<n.length;i++)r[n[i]]=o[i];return r})}function vp(e=10){let n="abcdefghijklmnopqrstuvwxyz",t="";for(let o=0;o<e;o++)t+=n[Math.floor(Math.random()*n.length)];return t}function Cr(e){return JSON.stringify(e)}function jr(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/[\s_-]+/g,"-").replace(/^-+|-+$/g,"")}var Po="captureStackTrace"in Error?Error.captureStackTrace:(...e)=>{};function rt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}var Nr=vt(()=>{if(rn.jitless||typeof navigator<"u"&&navigator?.userAgent?.includes("Cloudflare"))return!1;try{let e=Function;return new e(""),!0}catch{return!1}});function Vn(e){if(rt(e)===!1)return!1;let n=e.constructor;if(n===void 0||typeof n!="function")return!0;let t=n.prototype;return!(rt(t)===!1||Object.prototype.hasOwnProperty.call(t,"isPrototypeOf")===!1)}function os(e){return Vn(e)?{...e}:Array.isArray(e)?[...e]:e instanceof Map?new Map(e):e instanceof Set?new Set(e):e}function bp(e){let n=0;for(let t in e)Object.prototype.hasOwnProperty.call(e,t)&&n++;return n}var yp=e=>{let n=typeof e;switch(n){case"undefined":return"undefined";case"string":return"string";case"number":return Number.isNaN(e)?"nan":"number";case"boolean":return"boolean";case"function":return"function";case"bigint":return"bigint";case"symbol":return"symbol";case"object":return Array.isArray(e)?"array":e===null?"null":e.then&&typeof e.then=="function"&&e.catch&&typeof e.catch=="function"?"promise":typeof Map<"u"&&e instanceof Map?"map":typeof Set<"u"&&e instanceof Set?"set":typeof Date<"u"&&e instanceof Date?"date":typeof File<"u"&&e instanceof File?"file":"object";default:throw new Error(`Unknown data type: ${n}`)}},Ar=new Set(["string","number","symbol"]),rs=new Set(["string","number","bigint","boolean","symbol","undefined"]);function In(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function xn(e,n,t){let o=new e._zod.constr(n??e._zod.def);return(!n||t?.parent)&&(o._zod.parent=e),o}function oe(e){let n=e;if(!n)return{};if(typeof n=="string")return{error:()=>n};if(n?.message!==void 0){if(n?.error!==void 0)throw new Error("Cannot specify both `message` and `error` params");n.error=n.message}return delete n.message,typeof n.error=="string"?{...n,error:()=>n.error}:n}function wp(e){let n;return new Proxy({},{get(t,o,r){return n??(n=e()),Reflect.get(n,o,r)},set(t,o,r,i){return n??(n=e()),Reflect.set(n,o,r,i)},has(t,o){return n??(n=e()),Reflect.has(n,o)},deleteProperty(t,o){return n??(n=e()),Reflect.deleteProperty(n,o)},ownKeys(t){return n??(n=e()),Reflect.ownKeys(n)},getOwnPropertyDescriptor(t,o){return n??(n=e()),Reflect.getOwnPropertyDescriptor(n,o)},defineProperty(t,o,r){return n??(n=e()),Reflect.defineProperty(n,o,r)}})}function So(e){return typeof e=="bigint"?e.toString()+"n":typeof e=="string"?`"${e}"`:`${e}`}function Er(e){return Object.keys(e).filter(n=>e[n]._zod.optin!==void 0&&e[n]._zod.optout==="optional")}var Zt={safeint:[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],int32:[-2147483648,2147483647],uint32:[0,4294967295],float32:[-34028234663852886e22,34028234663852886e22],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]},Uo={int64:[BigInt("-9223372036854775808"),BigInt("9223372036854775807")],uint64:[BigInt(0),BigInt("18446744073709551615")]};function xp(e,n){let t=e._zod.def,o=t.checks;if(o&&o.length>0)throw new Error(".pick() cannot be used on object schemas containing refinements");let i={};return ot(i,e,zo(e,n)),xn(e,Wn(t,{shape:i,checks:[]}))}function zo(e,n){let t=En(e),o=[];for(let r of Reflect.ownKeys(n)){if(!Object.getOwnPropertyDescriptor(t,r)?.enumerable)throw new Error(`Unrecognized key: "${String(r)}"`);n[r]&&o.push(r)}return o}function _p(e,n){let t=e._zod.def,o=t.checks;if(o&&o.length>0)throw new Error(".omit() cannot be used on object schemas containing refinements");let i=new Set(zo(e,n)),s={};return ot(s,e,Reflect.ownKeys(En(e)).filter(c=>!i.has(c))),xn(e,Wn(t,{shape:s,checks:[]}))}function kp(e,n){if(!Vn(n))throw new Error("Invalid input to extend: expected a plain object");let t=e._zod.def.checks;if(t&&t.length>0){let r=En(e);for(let i of Reflect.ownKeys(n))if(Object.getOwnPropertyDescriptor(r,i)!==void 0)throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.")}return xn(e,Wn(e._zod.def,{shape:is(e,n)}))}function is(e,n){let t={};return ot(t,e,Reflect.ownKeys(En(e))),mp(t,n),t}function Pp(e,n){if(!Vn(n))throw new Error("Invalid input to safeExtend: expected a plain object");return xn(e,Wn(e._zod.def,{shape:is(e,n)}))}function Sp(e,n){if(!n?._zod?.def)throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");if(e._zod.def.checks?.length)throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");let t={};ot(t,e,Reflect.ownKeys(En(e))),ot(t,n,Reflect.ownKeys(En(n)));let o=Wn(e._zod.def,{shape:t,get catchall(){return n._zod.def.catchall},checks:n._zod.def.checks??[]});return xn(e,o)}function Up(e,n,t,o="partial"){let i=n._zod.def.checks;if(i&&i.length>0)throw new Error(`.${o}() cannot be used on object schemas containing refinements`);let c=t?new Set(zo(n,t)):void 0,l={};return ot(l,n,Reflect.ownKeys(En(n)),e&&((u,d)=>c&&!c.has(d)?u:new e({type:"optional",innerType:u}))),xn(n,Wn(n._zod.def,{shape:l,checks:[]}))}function zp(e,n,t){let o=t?new Set(zo(n,t)):void 0,r={};return ot(r,n,Reflect.ownKeys(En(n)),(i,s)=>o&&!o.has(s)?i:new e({type:"nonoptional",innerType:i})),xn(n,Wn(n._zod.def,{shape:r}))}function _n(e,n=0){if(e.aborted===!0)return!0;for(let t=n;t<e.issues.length;t++)if(e.issues[t]?.continue!==!0)return!0;return!1}function Wr(e,n=0){if(e.aborted===!0)return!0;for(let t=n;t<e.issues.length;t++)if(e.issues[t]?.continue===!1)return!0;return!1}function Tn(e,n){return n.map(t=>{var o;return(o=t).path??(o.path=[]),t.path.unshift(e),t})}function ft(e){return typeof e=="string"?e:e?.message}function Co(e){let n=[];for(let t of e??[]){let o=t._zod.def;if(!/_(length|size)$|_equals$/.test(o.check))break;let r=o.maximum??o.length??o.size;r>=0&&n.push([r,t])}return n}function Lt(e,n,t){var o;for(let r=n;r<e.length;r++)(o=e[r]).schema??(o.schema=t)}function kn(e,n,t){var o;let r=e.inst?._zod?.traits;r?.has("$ZodType")&&(r.has("$ZodCheck")?(o=e).schema??(o.schema=e.inst):e.schema=e.inst);let i=e.schema!==e.inst?e.schema?._zod.def?.error:void 0,s=e.message?e.message:ft(e.inst?._zod.def?.error?.(e))??ft(i?.(e))??ft(n?.error?.(e))??ft(t.customError?.(e))??ft(t.localeError?.(e))??"Invalid input",c={};for(let l of Object.keys(e))l==="inst"||l==="schema"||l==="continue"||l==="input"||l==="__proto__"||(c[l]=e[l]);return c.path??(c.path=[]),c.message=s,n?.reportInput&&(c.input=e.input),c}function ss(e){return e instanceof Set?"set":e instanceof Map?"map":e instanceof File?"file":"unknown"}var Cp=/[\uD800-\uDBFF]/;function qt(e){let n=e.length;if(!Cp.test(e))return n;let t=n;for(let o=0;o<n-1;o++)(e.charCodeAt(o)&64512)===55296&&(e.charCodeAt(o+1)&64512)===56320&&(t--,o++);return t}function Ht(e){return Array.isArray(e)?"array":typeof e=="string"?"string":"unknown"}function Ir(e){let n=typeof e;switch(n){case"number":return Number.isNaN(e)?"nan":"number";case"object":{if(e===null)return"null";if(Array.isArray(e))return"array";let t=e;if(t&&Object.getPrototypeOf(t)!==Object.prototype&&"constructor"in t&&t.constructor)return t.constructor.name}}return n}function yt(...e){let[n,t,o]=e;return typeof n=="string"?{message:n,code:"custom",input:t,inst:o}:{...n}}function jp(e){return Object.entries(e).filter(([n,t])=>Number.isNaN(Number.parseInt(n,10))).map(n=>n[1])}function as(e){let n=atob(e),t=new Uint8Array(n.length);for(let o=0;o<n.length;o++)t[o]=n.charCodeAt(o);return t}function ls(e){let n="";for(let t=0;t<e.length;t++)n+=String.fromCharCode(e[t]);return btoa(n)}function Np(e){let n=e.replace(/-/g,"+").replace(/_/g,"/"),t="=".repeat((4-n.length%4)%4);return as(n+t)}function Ap(e){return ls(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}function Ep(e){let n=e.replace(/^0x/,"");if(n.length%2!==0)throw new Error("Invalid hex string length");let t=new Uint8Array(n.length/2);for(let o=0;o<n.length;o+=2)t[o/2]=Number.parseInt(n.slice(o,o+2),16);return t}function Wp(e){return Array.from(e).map(n=>n.toString(16).padStart(2,"0")).join("")}var Pr=class{constructor(...n){}};function Tr(e,n){for(let t in n){let o=Object.getOwnPropertyDescriptor(n,t);o.get?Object.defineProperty(e,t,{...o,enumerable:!1}):Tp(e,t,o.value)}}function Hn(e,n,t,o=!0){return Object.defineProperty(e,n,{configurable:!0,writable:!0,enumerable:o,value:t}),t}function jo(e,n,t){return Hn(e,n,t,!1)}function Ip(e,n){for(let t in e){let o=e[t];Object.defineProperty(n,t,{configurable:!0,enumerable:!0,get(){return Hn(this,t,o(this))},set(r){Hn(this,t,r)}})}return n}function Tp(e,n,t){Object.defineProperty(e,n,{configurable:!0,get(){return this==null?t:Hn(this,n,t.bind(this))},set(o){Hn(this,n,o)}})}function Dp(e,n){let t=Object.getPrototypeOf(e);return n in t?void 0:t}var _r,qn=!1,$p={configurable:!0,get(){qn=!0}};function fe(e,n,t){let o=Object.getPrototypeOf(e._zod);if(n in o&&_r!==e._zod){_r=void 0;return}_r=e._zod,Object.defineProperty(o,n,{configurable:!0,get(){Object.defineProperty(this,n,$p);let r=qn;qn=!1;try{let i=t(this);return qn?delete this[n]:Object.defineProperty(this,n,{configurable:!0,writable:!0,value:i}),qn=qn||r,i}catch(i){throw delete this[n],qn=qn||r,i}},set(r){Object.defineProperty(this,n,{configurable:!0,writable:!0,value:r})}})}function Op(e,n,t,o){let r=Dp(e,n);r&&Object.defineProperty(r,n,{configurable:!0,get(){let i={configurable:!0,writable:!0,enumerable:o,value:void 0};return Object.defineProperty(this,n,i),i.value=t(this),Object.defineProperty(this,n,i),i.value},set(i){Object.defineProperty(this,n,{configurable:!0,writable:!0,enumerable:o,value:i})}})}var cs="~constantCatch";function us(e){let n=()=>e;return n[cs]=!0,n}var ds;var Dr={value:void 0,enumerable:!1},ps="captureStackTrace"in Error?Error:null;function Rp(e){let n=ps;if(n){let t=n.stackTraceLimit;if(typeof t=="number"){try{n.stackTraceLimit=0}catch{return ps=null,new e}try{return new e}finally{n.stackTraceLimit=t}}}return new e}function T(e,n,t,o){let r={};function i(f){this.def=f,this.constr=m,this.traits=new Set}i.prototype=r;let s=t,c=s&&new WeakSet;function l(f,p){if(f._zod){if(f._zod.traits.has(e))return}else{Dr.value=new i(p);try{Object.defineProperty(f,"_zod",Dr)}finally{Dr.value=void 0}}if(f._zod.traits.add(e),n(f,p),c){let v=Object.getPrototypeOf(f),b=f._zod.constr.prototype,x=v;for(;x&&x!==b;)x=Object.getPrototypeOf(x);let z=x??v;c.has(z)||(c.add(z),Tr(z,s))}let y=m.prototype;for(let v in y)Object.prototype.hasOwnProperty.call(y,v)&&(v in f||(f[v]=y[v].bind(f)))}let u=o?.Parent??Object;class d extends u{}Object.defineProperty(d,"name",{value:e});function m(f){let p=o?.Parent?Rp(d):this;l(p,f);let y=p._zod.deferred;if(y){for(let b of y)b();p._zod.deferred=void 0}let v=globalThis.__zod_globalConfig?.postProcessor;return v&&v(p),p}return Object.defineProperty(m,"init",{value:l}),Object.defineProperty(m,Symbol.hasInstance,{value:f=>o?.Parent&&f instanceof o.Parent?!0:f?._zod?.traits?.has(e)}),Object.defineProperty(m,"name",{value:e}),m}var Pn=class extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}},wt=class extends Error{constructor(n){super(`Encountered unidirectional transform during encode: ${n}`),this.name="ZodEncodeError"}};(ds=globalThis).__zod_globalConfig??(ds.__zod_globalConfig={});var rn=globalThis.__zod_globalConfig;function un(e){return e&&Object.assign(rn,e),rn}function Fp(){let e=this._zod;return e.message??(e.message=JSON.stringify(e.def,gt,2)),e.message}function Mp(e){this._zod.message=e}var Bp={get:Fp,set:Mp,enumerable:!0,configurable:!0},Or={value:void 0,enumerable:!1},ms=new WeakSet([Object.prototype,Error.prototype]),fs=(e,n)=>{e.name="$ZodError",Or.value=n,Object.defineProperty(e,"issues",Or),Or.value=void 0,Object.defineProperty(e,"message",Bp);let t=Object.getPrototypeOf(e);ms.has(t)||(ms.add(t),Object.defineProperty(t,"toString",{configurable:!0,enumerable:!1,get(){let o=()=>this.message;return Object.defineProperty(this,"toString",{value:o,configurable:!0,writable:!0}),o},set(o){Object.defineProperty(this,"toString",{value:o,configurable:!0,writable:!0})}}))},hs=T("$ZodError",fs),_g=T("$ZodError",fs,void 0,{Parent:Error});function Zp(e,n,t){return Object.prototype.hasOwnProperty.call(e,n)||(n==="__proto__"?Object.defineProperty(e,n,{value:t(),writable:!0,enumerable:!0,configurable:!0}):e[n]=t()),e[n]}function gs(e,n=t=>t.message){let t={},o=[];for(let r of e.issues)r.path.length>0?Zp(t,r.path[0],()=>[]).push(n(r)):o.push(n(r));return{formErrors:o,fieldErrors:t}}function vs(e,n=t=>t.message){let t={_errors:[]},o=(r,i=[])=>{for(let s of r.issues)if(s.code==="invalid_union"&&s.errors.length)s.errors.map(c=>o({issues:c},[...i,...s.path]));else if(s.code==="invalid_key")o({issues:s.issues},[...i,...s.path]);else if(s.code==="invalid_element")o({issues:s.issues},[...i,...s.path]);else{let c=[...i,...s.path];if(c.length===0)t._errors.push(n(s));else{let l=t,u=0;for(;u<c.length;){let d=c[u],m=u===c.length-1;if(d==="_errors"){m&&l._errors.push(n(s)),u++;continue}Object.prototype.hasOwnProperty.call(l,d)||Object.defineProperty(l,d,{value:{_errors:[]},enumerable:!0,writable:!0,configurable:!0});let f=l[d];m&&f._errors.push(n(s)),l=f,u++}}}};return o(e),t}function No(e,n){return{callee:n?.callee??e,Err:n?.Err}}var Ao=e=>{let n=(t,o,r,i)=>{let s=r?{...r,async:!1}:{async:!1},c=t._zod.run({value:o,issues:[]},s);if(c instanceof Promise)throw new Pn;if(c.issues.length){let l=new(i?.Err??e)(c.issues.map(u=>kn(u,s,un())));throw Po(l,i?.callee??n),l}return c.value};return n};var Eo=e=>{let n=async(t,o,r,i)=>{let s=r?{...r,async:!0}:{async:!0},c=t._zod.run({value:o,issues:[]},s);if(c instanceof Promise&&(c=await c),c.issues.length){let l=new(i?.Err??e)(c.issues.map(u=>kn(u,s,un())));throw Po(l,i?.callee??n),l}return c.value};return n};var Wo=e=>(n,t,o)=>{let r=o?{...o,async:!1}:{async:!1},i=n._zod.run({value:t,issues:[]},r);if(i instanceof Promise)throw new Pn;return i.issues.length?bs(e,i.issues,r):{success:!0,data:i.value}};function bs(e,n,t){let o;return{success:!1,get error(){return o||(o=new e(n.map(r=>kn(r,t,un()))),n=void 0,t=void 0),o},set error(r){o=r,n=void 0,t=void 0}}}var Io=e=>async(n,t,o)=>{let r=o?{...o,async:!0}:{async:!0},i=n._zod.run({value:t,issues:[]},r);return i instanceof Promise&&(i=await i),i.issues.length?bs(e,i.issues,r):{success:!0,data:i.value}};var Lp=Symbol.for("zod.compile.invalid"),qp=Symbol.for("zod.compile.fallback"),Rr=((e,n,t)=>{let o=e._zod.bag.validator;if(o!==void 0){if(o(n)!==Lp)return!0;if(o.definite===!0&&t===void 0)return!1}return Hp(e,n,t)});function Hp(e,n,t){let o=t?{...t,async:!1,abortEarly:!0}:{async:!1,abortEarly:!0},r=e._zod.bag.fallbackRun,i;if(r?(o[qp]=!0,i=r({value:n,issues:[]},o)):i=e._zod.run({value:n,issues:[]},o),i instanceof Promise)throw new Pn;return i.issues.length===0}var Fr=async(e,n,t)=>{let o=t?{...t,async:!0,abortEarly:!0}:{async:!0,abortEarly:!0},r=e._zod.run({value:n,issues:[]},o);return r instanceof Promise&&(r=await r),r.issues.length===0},ys=e=>{let n=Ao(e),t=(o,r,i,s)=>{let c=i?{...i,direction:"backward"}:{direction:"backward"};return n(o,r,c,No(t,s))};return t};var ws=e=>{let n=Ao(e),t=(o,r,i,s)=>n(o,r,i,No(t,s));return t};var xs=e=>{let n=Eo(e),t=async(o,r,i,s)=>{let c=i?{...i,direction:"backward"}:{direction:"backward"};return await n(o,r,c,No(t,s))};return t};var _s=e=>{let n=Eo(e),t=async(o,r,i,s)=>await n(o,r,i,No(t,s));return t};var ks=e=>(n,t,o)=>{let r=o?{...o,direction:"backward"}:{direction:"backward"};return Wo(e)(n,t,r)};var Ps=e=>(n,t,o)=>Wo(e)(n,t,o);var Ss=e=>async(n,t,o)=>{let r=o?{...o,direction:"backward"}:{direction:"backward"};return Io(e)(n,t,r)};var Us=e=>async(n,t,o)=>Io(e)(n,t,o);var zs=/^[cC][0-9a-z]{6,}$/,Cs=/^[0-9a-z]+$/,js=/^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/,Ns=/^[0-9a-vA-V]{20}$/,As=/^[A-Za-z0-9]{27}$/,Es=/^[a-zA-Z0-9_-]{21}$/;function Ws(e){return new RegExp(`^[a-zA-Z0-9_-]{${e}}$`)}var Is=/^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;var Ts=/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,Br=e=>e?new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`):/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;var Ds=/^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;var Vp="^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";function $s(){return new RegExp(Vp,"u")}var Os=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,Rs=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;var Fs=/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,Ms=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,Bs=/^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,Zs=/^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/;var Ls=/^https?$/,qs=/^\+[1-9]\d{6,14}$/;var Hs="(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";function Gp(e){return new RegExp(`^${e}$`)}var Vs=Gp(Hs);function Mr(e){let n="(?:[01]\\d|2[0-3]):[0-5]\\d";return typeof e.precision=="number"?e.precision===-1?`${n}`:e.precision===0?`${n}:[0-5]\\d`:`${n}:[0-5]\\d\\.\\d{${e.precision}}`:e.seconds?`${n}:[0-5]\\d(?:\\.\\d+)?`:`${n}(?::[0-5]\\d(?:\\.\\d+)?)?`}function Gs(e){return new RegExp(`^${Mr(e)}$`)}function Js(e){let n=["Z"];e.offset&&n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");let t=`${Mr({precision:e.precision,seconds:!0})}(?:${n.join("|")})`,o=e.local?`${t}|${Mr({precision:e.precision})}`:t;return new RegExp(`^${Hs}T(?:${o})$`)}var Ks=/^[\s\S]{0,}$/;var Zr=/^-?\d+$/,Vt=/^-?\d+(?:\.\d+)?$/,Xs=/^(?:true|false)$/i,Ys=/^null$/i;var Qs=/^[^A-Z]*$/,ea=/^[^a-z]*$/;var Ge=T("$ZodCheck",(e,n)=>{var t;e._zod??(e._zod={}),e._zod.def=n,(t=e._zod).onattach??(t.onattach=[])});var Lr=e=>{let n=e.value;return!Sr(n)&&n.length!==void 0},To={number:"number",bigint:"bigint",object:"date"},qr=T("$ZodCheckLessThan",(e,n)=>{Ge.init(e,n);let t=To[typeof n.value];e._zod.check=o=>{(n.inclusive?o.value<=n.value:o.value<n.value)||o.issues.push({origin:To[typeof o.value]??t,code:"too_big",maximum:typeof n.value=="object"?n.value.getTime():n.value,input:o.value,inclusive:n.inclusive,inst:e,continue:!n.abort})}}),Hr=T("$ZodCheckGreaterThan",(e,n)=>{Ge.init(e,n);let t=To[typeof n.value];e._zod.check=o=>{(n.inclusive?o.value>=n.value:o.value>n.value)||o.issues.push({origin:To[typeof o.value]??t,code:"too_small",minimum:typeof n.value=="object"?n.value.getTime():n.value,input:o.value,inclusive:n.inclusive,inst:e,continue:!n.abort})}}),na=T("$ZodCheckMultipleOf",(e,n)=>{Ge.init(e,n),e._zod.check=t=>{if(typeof t.value!=typeof n.value)throw new Error("Cannot mix number and bigint in multiple_of check.");(typeof t.value=="bigint"?n.value!==BigInt(0)&&t.value%n.value===BigInt(0):Ur(t.value,n.value)===0)||t.issues.push({origin:typeof t.value,code:"not_multiple_of",divisor:n.value,input:t.value,inst:e,continue:!n.abort})}}),ta=T("$ZodCheckNumberFormat",(e,n)=>{Ge.init(e,n),n.format=n.format||"float64";let t=n.format?.includes("int"),o=t?"int":"number",[r,i]=Zt[n.format];e._zod.check=s=>{let c=s.value;if(t){if(!Number.isInteger(c)){s.issues.push({expected:o,format:n.format,code:"invalid_type",continue:!1,input:c,inst:e});return}if(!Number.isSafeInteger(c)){c>0?s.issues.push({input:c,code:"too_big",maximum:Number.MAX_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:o,inclusive:!0,continue:!n.abort}):s.issues.push({input:c,code:"too_small",minimum:Number.MIN_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:o,inclusive:!0,continue:!n.abort});return}}c<r&&s.issues.push({origin:"number",input:c,code:"too_small",minimum:r,inclusive:!0,inst:e,continue:!n.abort}),c>i&&s.issues.push({origin:"number",input:c,code:"too_big",maximum:i,inclusive:!0,inst:e,continue:!n.abort})}});var oa=T("$ZodCheckMaxLength",(e,n)=>{var t;Ge.init(e,n),(t=e._zod.def).when??(t.when=Lr),e._zod.check=o=>{let r=o.value,i=r.length;if((typeof r=="string"&&i>n.maximum?qt(r):i)<=n.maximum)return;let c=Ht(r);o.issues.push({origin:c,code:"too_big",maximum:n.maximum,inclusive:!0,input:r,inst:e,continue:!n.abort})}}),ra=T("$ZodCheckMinLength",(e,n)=>{var t;Ge.init(e,n),(t=e._zod.def).when??(t.when=Lr),e._zod.check=o=>{let r=o.value,i=r.length;if((typeof r=="string"&&i>=n.minimum&&i<n.minimum*2?qt(r):i)>=n.minimum)return;let c=Ht(r);o.issues.push({origin:c,code:"too_small",minimum:n.minimum,inclusive:!0,input:r,inst:e,continue:!n.abort})}}),ia=T("$ZodCheckLengthEquals",(e,n)=>{var t;Ge.init(e,n),(t=e._zod.def).when??(t.when=Lr),e._zod.check=o=>{let r=o.value,i=r.length,s=typeof r=="string"&&i>=n.length&&i<=n.length*2?qt(r):i;if(s===n.length)return;let c=Ht(r),l=s>n.length;o.issues.push({origin:c,...l?{code:"too_big",maximum:n.length}:{code:"too_small",minimum:n.length},inclusive:!0,exact:!0,input:o.value,inst:e,continue:!n.abort})}}),Jt=T("$ZodCheckStringFormat",(e,n)=>{var t,o;Ge.init(e,n),n.pattern?(t=e._zod).check??(t.check=r=>{n.pattern.lastIndex=0,!n.pattern.test(r.value)&&r.issues.push({origin:"string",code:"invalid_format",format:n.format,input:r.value,...n.pattern?{pattern:n.pattern.toString()}:{},inst:e,continue:!n.abort})}):(o=e._zod).check??(o.check=()=>{})}),sa=T("$ZodCheckRegex",(e,n)=>{Jt.init(e,n),e._zod.check=t=>{n.pattern.lastIndex=0,!n.pattern.test(t.value)&&t.issues.push({origin:"string",code:"invalid_format",format:"regex",input:t.value,pattern:n.pattern.toString(),inst:e,continue:!n.abort})}}),aa=T("$ZodCheckLowerCase",(e,n)=>{n.pattern??(n.pattern=Qs),Jt.init(e,n)}),la=T("$ZodCheckUpperCase",(e,n)=>{n.pattern??(n.pattern=ea),Jt.init(e,n)}),ca=T("$ZodCheckIncludes",(e,n)=>{Ge.init(e,n);let t=In(n.includes),o=new RegExp(typeof n.position=="number"?`^.{${n.position},}${t}`:t);n.pattern=o,e._zod.check=r=>{r.value.includes(n.includes,n.position)||r.issues.push({origin:"string",code:"invalid_format",format:"includes",includes:n.includes,input:r.value,inst:e,continue:!n.abort})}}),ua=T("$ZodCheckStartsWith",(e,n)=>{Ge.init(e,n);let t=new RegExp(`^${In(n.prefix)}.*`);n.pattern??(n.pattern=t),e._zod.check=o=>{o.value.startsWith(n.prefix)||o.issues.push({origin:"string",code:"invalid_format",format:"starts_with",prefix:n.prefix,input:o.value,inst:e,continue:!n.abort})}}),da=T("$ZodCheckEndsWith",(e,n)=>{Ge.init(e,n);let t=new RegExp(`.*${In(n.suffix)}$`);n.pattern??(n.pattern=t),e._zod.check=o=>{o.value.endsWith(n.suffix)||o.issues.push({origin:"string",code:"invalid_format",format:"ends_with",suffix:n.suffix,input:o.value,inst:e,continue:!n.abort})}});var pa=T("$ZodCheckOverwrite",(e,n)=>{Ge.init(e,n),e._zod.check=t=>{t.value=n.tx(t.value)}});var Do=class{constructor(n=[],t={}){this.content=[],this.indent=0,this.args=n,this.closed=t}indented(n){this.indent+=1;try{n(this)}finally{this.indent-=1}}write(n){if(typeof n=="function"){n(this,{execution:"sync"}),n(this,{execution:"async"});return}let o=n.split(`
`).filter(s=>s),r=Math.min(...o.map(s=>s.length-s.trimStart().length)),i=o.map(s=>s.slice(r)).map(s=>" ".repeat(this.indent*2)+s);for(let s of i)this.content.push(s)}compile(){let n=Function,t=this?.content??[""];return new n(...Object.keys(this.closed),`return function (${this.args.join(", ")}) {
${t.join(`
`)}
};`)(...Object.values(this.closed))}};var fa={major:4,minor:6,patch:7};var ke=T("$ZodType",(e,n)=>{var t;e??(e={}),e._zod.def=n,e._zod.bag=e._zod.bag||{},e._zod.version=fa;let o=e._zod.def.checks,r=e._zod.traits.has("$ZodCheck")?[e,...o??[]]:o?.length?[...o]:[];for(let i of r)for(let s of i._zod.onattach)s(e);if(r.length===0)(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{let i=(c,l,u)=>{if(c.memo)return c;let d=_n(c),m;for(let f of l){if(f._zod.def.when){if(Wr(c)||!f._zod.def.when(c))continue}else if(d)continue;let p=c.issues.length,y=f._zod.check(c);if(y instanceof Promise&&u?.async===!1)throw new Pn;if(m||y instanceof Promise)m=(m??Promise.resolve()).then(async()=>{await y,c.issues.length!==p&&(Lt(c.issues,p,e),d||(d=_n(c,p)))});else{if(c.issues.length===p)continue;Lt(c.issues,p,e),d||(d=_n(c,p))}}return m?m.then(()=>c):c},s=(c,l,u)=>{if(_n(c))return c.aborted=!0,c;let d=i(l,r,u);if(d instanceof Promise){if(u.async===!1)throw new Pn;return d.then(m=>e._zod.parse(m,u))}return e._zod.parse(d,u)};e._zod.run=(c,l)=>{if(l.skipChecks)return e._zod.parse(c,l);if(l.direction==="backward"){let d=e._zod.parse({value:c.value,issues:[]},{...l,skipChecks:!0});return d instanceof Promise?d.then(m=>s(m,c,l)):s(d,c,l)}let u=e._zod.parse(c,l);if(u instanceof Promise){if(l.async===!1)throw new Pn;return u.then(d=>i(d,r,l))}return i(u,r,l)}}},{get"~standard"(){return jo(this,"~standard",Gr(this))},set"~standard"(e){Hn(this,"~standard",e)}}),Sa=(e,n)=>e.issues.length?{issues:e.issues.map(t=>kn(t,n,un()))}:{value:e.value};async function Jp(e,n){let t={async:!0};return Sa(await e._zod.run({value:n,issues:[]},t),t)}function Gr(e){return{validate:n=>{let t={async:!1};try{let o=e._zod.run({value:n,issues:[]},t);if(!(o instanceof Promise))return Sa(o,t)}catch{}return Jp(e,n)},vendor:"zod",version:1}}var Fo=T("$ZodString",(e,n)=>{ke.init(e,n),e._zod.pattern=n.pattern??Ks,e._zod.parse=(t,o)=>{if(n.coerce)try{t.value=String(t.value)}catch{}return typeof t.value=="string"||t.issues.push({expected:"string",code:"invalid_type",input:t.value,inst:e}),t}}),Se=T("$ZodStringFormat",(e,n)=>{Jt.init(e,n),Fo.init(e,n)}),Ua=T("$ZodGUID",(e,n)=>{n.pattern??(n.pattern=Ts),Se.init(e,n)}),za=T("$ZodUUID",(e,n)=>{if(n.version){let o={v1:1,v2:2,v3:3,v4:4,v5:5,v6:6,v7:7,v8:8}[n.version];if(o===void 0)throw new Error(`Invalid UUID version: "${n.version}"`);n.pattern??(n.pattern=Br(o))}else n.pattern??(n.pattern=Br());Se.init(e,n)}),Ca=T("$ZodEmail",(e,n)=>{n.pattern??(n.pattern=Ds),Se.init(e,n)}),ja=1,Oo=2;function Na(e){try{return typeof URL<"u"&&typeof URL.canParse=="function"?URL.canParse(e):(new URL(e),!0)}catch{return!1}}function Kp(e,n){return!("normalize"in n)&&!("hostname"in n)&&!("protocol"in n)?Na(e)||Oo:Xp(e,n)}function Xp(e,n){if(!n.normalize&&n.protocol?.source===Ls.source&&!/^https?:\/\//i.test(e))return ja;try{if(typeof URL<"u"){let t=URL;if(typeof t.parse=="function")return t.parse(e)??Oo}return new URL(e)}catch{return Oo}}var Yp=/[\t\n\r]/g;function ha(e){return e.replace(Yp,"")}function Qp(e,n){return n.lastIndex=0,n.test(e.hostname)}function em(e,n){return n.lastIndex=0,n.test(e.protocol.endsWith(":")?e.protocol.slice(0,-1):e.protocol)}var Aa=T("$ZodURL",(e,n)=>{Se.init(e,n),e._zod.check=t=>{try{let o=t.value.trim(),r=Kp(o,n);if(r===ja){t.issues.push({code:"invalid_format",format:"url",note:"Invalid URL format",input:t.value,inst:e,continue:!n.abort});return}if(r===Oo){t.issues.push({code:"invalid_format",format:"url",input:t.value,inst:e,continue:!n.abort});return}if(r===!0){t.value=ha(o);return}n.hostname&&!Qp(r,n.hostname)&&t.issues.push({code:"invalid_format",format:"url",note:"Invalid hostname",pattern:n.hostname.source,input:t.value,inst:e,continue:!n.abort}),n.protocol&&!em(r,n.protocol)&&t.issues.push({code:"invalid_format",format:"url",note:"Invalid protocol",pattern:n.protocol.source,input:t.value,inst:e,continue:!n.abort}),t.value=n.normalize?r.href:ha(o);return}catch{t.issues.push({code:"invalid_format",format:"url",input:t.value,inst:e,continue:!n.abort})}}}),Ea=T("$ZodEmoji",(e,n)=>{n.pattern??(n.pattern=$s()),Se.init(e,n)}),Wa=T("$ZodNanoID",(e,n)=>{if(n.length!==void 0&&(!Number.isInteger(n.length)||n.length<1))throw new Error(`Invalid nanoid length: ${n.length}`);n.pattern??(n.pattern=n.length===void 0?Es:Ws(n.length)),Se.init(e,n)}),Ia=T("$ZodCUID",(e,n)=>{n.pattern??(n.pattern=zs),Se.init(e,n)}),Ta=T("$ZodCUID2",(e,n)=>{n.pattern??(n.pattern=Cs),Se.init(e,n)}),Da=T("$ZodULID",(e,n)=>{n.pattern??(n.pattern=js),Se.init(e,n)}),$a=T("$ZodXID",(e,n)=>{n.pattern??(n.pattern=Ns),Se.init(e,n)}),Oa=T("$ZodKSUID",(e,n)=>{n.pattern??(n.pattern=As),Se.init(e,n)}),Ra=T("$ZodISODateTime",(e,n)=>{n.pattern??(n.pattern=Js(n)),Se.init(e,n)}),Fa=T("$ZodISODate",(e,n)=>{n.pattern??(n.pattern=Vs),Se.init(e,n)}),Ma=T("$ZodISOTime",(e,n)=>{n.pattern??(n.pattern=Gs(n)),Se.init(e,n)}),Ba=T("$ZodISODuration",(e,n)=>{n.pattern??(n.pattern=Is),Se.init(e,n)}),Za=T("$ZodIPv4",(e,n)=>{n.pattern??(n.pattern=Os),Se.init(e,n)}),nm=/^[0-9a-fA-F:.]+$/;function La(e){return nm.test(e)?Na(`http://[${e}]`):!1}var qa=T("$ZodIPv6",(e,n)=>{n.pattern??(n.pattern=Rs),Se.init(e,n),e._zod.check=t=>{La(t.value)||t.issues.push({code:"invalid_format",format:"ipv6",input:t.value,inst:e,continue:!n.abort})}});var Ha=T("$ZodCIDRv4",(e,n)=>{n.pattern??(n.pattern=Fs),Se.init(e,n)});function tm(e){let n=e.split("/");if(n.length!==2)return!1;let[t,o]=n;if(!o)return!1;let r=Number(o);return`${r}`!==o||r<0||r>128?!1:La(t)}var Va=T("$ZodCIDRv6",(e,n)=>{n.pattern??(n.pattern=Ms),Se.init(e,n),e._zod.check=t=>{tm(t.value)||t.issues.push({code:"invalid_format",format:"cidrv6",input:t.value,inst:e,continue:!n.abort})}});function Ga(e){if(e==="")return!0;if(/\s/.test(e)||e.length%4!==0)return!1;try{return atob(e),!0}catch{return!1}}var Jr=/^[0-9a-zA-Z+/]*={0,2}$/,Ja=T("$ZodBase64",(e,n)=>{n.pattern??(n.pattern=Jr),Se.init(e,n),e._zod.check=t=>{Ga(t.value)||t.issues.push({code:"invalid_format",format:"base64",input:t.value,inst:e,continue:!n.abort})}}),Mo=/^[A-Za-z0-9_-]*$/;function om(e){if(!Mo.test(e))return!1;let n=e.replace(/[-_]/g,o=>o==="-"?"+":"/"),t=n.padEnd(Math.ceil(n.length/4)*4,"=");return Ga(t)}var Ka=T("$ZodBase64URL",(e,n)=>{n.pattern??(n.pattern=Mo),Se.init(e,n),e._zod.check=t=>{om(t.value)||t.issues.push({code:"invalid_format",format:"base64url",input:t.value,inst:e,continue:!n.abort})}}),Xa=T("$ZodE164",(e,n)=>{n.pattern??(n.pattern=qs),Se.init(e,n)});function rm(e,n=null){try{let t=e.split(".");if(t.length!==3)return!1;let[o]=t;if(!o)return!1;let r=JSON.parse(atob(o));return!("typ"in r&&r?.typ!=="JWT"||!r.alg||n&&(!("alg"in r)||r.alg!==n))}catch{return!1}}var Ya=T("$ZodJWT",(e,n)=>{Se.init(e,n),e._zod.check=t=>{rm(t.value,n.alg)||t.issues.push({code:"invalid_format",format:"jwt",input:t.value,inst:e,continue:!n.abort})}});var Kr=T("$ZodNumber",(e,n)=>{ke.init(e,n),e._zod.pattern=Vt,e._zod.parse=(t,o)=>{if(n.coerce)try{t.value=Number(t.value)}catch{}let r=t.value;if(typeof r=="number"&&!Number.isNaN(r)&&Number.isFinite(r))return t;let i=typeof r=="number"?Number.isNaN(r)?"NaN":Number.isFinite(r)?void 0:String(r):void 0;return t.issues.push({expected:"number",code:"invalid_type",input:r,inst:e,...i?{received:i}:{}}),t}}),Qa=T("$ZodNumberFormat",(e,n)=>{ta.init(e,n),Kr.init(e,n)}),el=T("$ZodBoolean",(e,n)=>{ke.init(e,n),e._zod.pattern=Xs,e._zod.parse=(t,o)=>{if(n.coerce)try{t.value=!!t.value}catch{}let r=t.value;return typeof r=="boolean"||t.issues.push({expected:"boolean",code:"invalid_type",input:r,inst:e}),t}});var nl=T("$ZodNull",(e,n)=>{ke.init(e,n),e._zod.pattern=Ys,e._zod.values=new Set([null]),e._zod.parse=(t,o)=>{let r=t.value;return r===null||t.issues.push({expected:"null",code:"invalid_type",input:r,inst:e}),t}});var tl=T("$ZodUnknown",(e,n)=>{ke.init(e,n),e._zod.parse=t=>t}),ol=T("$ZodNever",(e,n)=>{ke.init(e,n),e._zod.parse=(t,o)=>(t.issues.push({expected:"never",code:"invalid_type",input:t.value,inst:e}),t)});function im(e,n){let t=Co(e._zod.def.checks);if(!t.length)return;let o=Math.min(...t.map(i=>i[0])),r=e._zod.parse;e._zod.parse=(i,s)=>{let c=n(i.value);if(c>o&&!s?.skipChecks&&s?.direction!=="backward"){for(let[l,u]of Co(e._zod.def.checks))if(c>l&&u._zod.def.when(i)){let d=i.issues.length;return u._zod.check(i),i.issues[d].continue=!1,Lt(i.issues,d,e),i}}return r(i,s)}}var sm=e=>Array.isArray(e)?e.length:-1;function ga(e,n,t){e.issues.length&&n.issues.push(...Tn(t,e.issues)),n.value[t]=e.value}var rl=T("$ZodArray",(e,n)=>{ke.init(e,n);let t=rn.memoizer;t?.attach(e),e._zod.parse=(o,r)=>{let i=o.value;if(!Array.isArray(i))return o.issues.push({expected:"array",code:"invalid_type",input:i,inst:e}),o;o.value=t?t.alloc(e,o,Array(i.length),r):Array(i.length);let s=[],c=r?.abortEarly;for(let l=0;l<i.length;l++){let u=i[l],d=n.element._zod.run({value:u,issues:[]},r);if(d instanceof Promise)s.push(d.then(m=>ga(m,o,l)));else if(ga(d,o,l),c&&d.issues.length!==0&&_n(d))break}return s.length?Promise.all(s).then(()=>o):o},im(e,sm)});function Ro(e,n,t,o,r,i){let s=t in o,c=i==="optional";if(!(!s&&c&&r==="optional")){if(e.issues.length){if(r!==void 0&&c&&!s)return;n.issues.push(...Tn(t,e.issues))}if(!s&&r===void 0){e.issues.length||n.issues.push({code:"invalid_type",expected:"nonoptional",input:void 0,path:[t]});return}e.value===void 0?(s||r==="defaulted"&&!c)&&(n.value[t]=void 0):n.value[t]=e.value}}var am=[];function il(e){let n=Object.keys(e.shape),t=Object.getOwnPropertySymbols(e.shape),o=t.length?t:am,r=o.length?[...n,...o]:n;for(let s of r)if(!e.shape?.[s]?._zod?.traits?.has("$ZodType"))throw new Error(`Invalid element at key "${String(s)}": expected a Zod schema`);let i=Er(e.shape);return{...e,allKeys:r,symbolKeys:o,keySet:new Set(n),numKeys:n.length,optionalKeys:new Set(i)}}function sl(e,n,t,o,r,i,s){let c=[],l=r.keySet,u=r.catchall._zod,d=u.def.type,m=u.optin,f=u.optout,p=0;for(let y in n){if(s&&t.issues.length!==p){if(_n(t,p))break;p=t.issues.length}if(l.has(y))continue;if(y==="__proto__"){d==="never"&&c.push(y);continue}if(d==="never"){c.push(y);continue}let v=u.run({value:n[y],issues:[]},o);v instanceof Promise?e.push(v.then(b=>Ro(b,t,y,n,m,f))):Ro(v,t,y,n,m,f)}return c.length&&t.issues.push({code:"unrecognized_keys",keys:c,input:n,inst:i,continue:!0}),e.length?Promise.all(e).then(()=>t):t}var lm=T("$ZodObject",(e,n)=>{ke.init(e,n);let t=Object.getOwnPropertyDescriptor(n,"shape"),o=t?.get?t.get.raw:n.shape??{};if(o){let u=()=>{let d={...o};return Object.defineProperty(n,"shape",{value:d}),u.raw=d,d};u.raw=o,Object.defineProperty(n,"shape",{get:u})}let r=vt(()=>il(n));fe(e,"propValues",u=>{let d=u.def.shape,m={};for(let f in d){let p=d[f]._zod;if(p.values){Object.prototype.hasOwnProperty.call(m,f)||cn(m,f,new Set);for(let y of p.values)m[f].add(y);p.optin!==void 0&&m[f].add(void 0)}}return m});let i=rt,s=n.catchall,c,l=rn.memoizer;l?.attach(e),e._zod.parse=(u,d)=>{c??(c=r.value);let m=u.value;if(!i(m))return u.issues.push({expected:"object",code:"invalid_type",input:m,inst:e}),u;u.value=l?l.alloc(e,u,{},d):{};let f=[],p=c.shape,y=d?.abortEarly,v=u.issues.length;for(let b of c.allKeys){if(y&&u.issues.length!==v){if(_n(u,v))break;v=u.issues.length}if(b==="__proto__")continue;let x=p[b],z=x._zod.optin,M=x._zod.optout,$=x._zod.run({value:m[b],issues:[]},d);$ instanceof Promise?f.push($.then(j=>Ro(j,u,b,m,z,M))):Ro($,u,b,m,z,M)}return s?sl(f,m,u,d,r.value,e,y===!0):f.length?Promise.all(f).then(()=>u):u}}),al=T("$ZodObjectJIT",(e,n)=>{lm.init(e,n);let t=e._zod.parse,o=vt(()=>il(n)),r=rn.memoizer,i=p=>{let y=o.value,v=y.symbolKeys,b=new Do(["payload","ctx"],{shape:p,inst:e,memo:r,syms:v}),x=j=>`shape[${j}]._zod.run({ value: input[${j}], issues: [] }, ctx)`,z=(j,W)=>`
          let ${j}_ab = false;
          for (let i = 0; i < ${j}.issues.length; i++) {
            const iss = ${j}.issues[i];
            iss.path = iss.path ? [${W}, ...iss.path] : [${W}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${j}_ab = true;
          }
          if (${j}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;b.write("const input = payload.value;");let M=Object.create(null),$=0;for(let j of y.allKeys)M[j]=`key_${$++}`;b.write(r?"const newResult = memo.alloc(inst, payload, {}, ctx);":"const newResult = {};");for(let j of y.allKeys){if(j==="__proto__")continue;let W=M[j],U=typeof j=="symbol"?`syms[${v.indexOf(j)}]`:Cr(j),E=`${U} in input`,S=p[j],k=S?._zod?.optin,C=k!==void 0,R=S?._zod?.optout==="optional";if(b.write(`const ${W} = ${x(U)};`),C&&R){let P=k==="optional"?`${W}_present`:`${W}.value !== undefined || ${W}_present`;b.write(`
        const ${W}_present = ${E};
        if (!${W}.issues.length || ${W}_present) {
          if (${W}.issues.length) {${z(W,U)}
          }

          if (${P}) {
            newResult[${U}] = ${W}.value;
          }
        }

      `)}else C?(b.write(`
        if (${W}.issues.length) {${z(W,U)}
        }
      `),k==="defaulted"?b.write(`newResult[${U}] = ${W}.value;`):b.write(`
        if (${W}.value !== undefined || ${E}) {
          newResult[${U}] = ${W}.value;
        }
      `)):b.write(`
        const ${W}_present = ${E};
        if (${W}.issues.length) {${z(W,U)}
        }
        if (!${W}_present && !${W}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${U}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${W}_present) {
          newResult[${U}] = ${W}.value;
        }

      `)}return b.write("payload.value = newResult;"),b.write("return payload;"),b.compile()},s,c=rt,l=!rn.jitless,d=l&&Nr.value,m=n.catchall,f;e._zod.parse=(p,y)=>{f??(f=o.value);let v=p.value;return c(v)?l&&d&&y?.async===!1&&y.jitless!==!0?(s||(s=i(n.shape)),p=s(p,y),m?sl([],v,p,y,f,e,y?.abortEarly===!0):p):t(p,y):(p.issues.push({expected:"object",code:"invalid_type",input:v,inst:e}),p)}});function va(e,n,t,o){for(let i of e)if(i.issues.length===0)return n.value=i.value,n;let r=e.filter(i=>!_n(i));return r.length===1?(n.value=r[0].value,r[0]):(n.issues.push({code:"invalid_union",input:n.value,inst:t,errors:e.map(i=>i.issues.map(s=>kn(s,o,un())))}),n)}var Xr=T("$ZodUnion",(e,n)=>{ke.init(e,n),fe(e,"optin",o=>o.def.options.some(r=>r._zod.optin==="defaulted")?"defaulted":o.def.options.some(r=>r._zod.optin!==void 0)?"optional":void 0),fe(e,"optout",o=>o.def.options.some(r=>r._zod.optout==="optional")?"optional":void 0),fe(e,"values",o=>{if(o.def.options.every(r=>r._zod.values))return new Set(o.def.options.flatMap(r=>Array.from(r._zod.values)))}),fe(e,"pattern",o=>{if(o.def.options.every(r=>r._zod.pattern)){let r=o.def.options.map(i=>i._zod.pattern);return new RegExp(`^(${r.map(i=>Bt(i.source)).join("|")})$`)}});let t=n.options.length===1?n.options[0]._zod.run:null;e._zod.parse=(o,r)=>{if(t)return t(o,r);let i=!1,s=[];for(let c of n.options){let l=c._zod.run({value:o.value,issues:[]},r);if(l instanceof Promise)s.push(l),i=!0;else{if(l.issues.length===0)return l;s.push(l)}}return i?Promise.all(s).then(c=>va(c,o,e,r)):va(s,o,e,r)}});function cm(e){let n=new Map;for(let t of e.options){let o=t._zod.propValues?.[e.discriminator];if(!o||o.size===0)throw new Error(`Invalid discriminated union option at index "${e.options.indexOf(t)}"`);for(let r of o)if(n.has(r)){if(r!==void 0)throw new Error(`Duplicate discriminator value "${String(r)}"`);n.set(r,null)}else n.set(r,t)}return n}var ll=T("$ZodDiscriminatedUnion",(e,n)=>{n.inclusive=!1,Xr.init(e,n);let t=e._zod.parse;fe(e,"propValues",r=>{let i={},s=0;for(let c of r.def.options){let l=c._zod.propValues;if(!l||Object.keys(l).length===0)throw new Error(`Invalid discriminated union option at index "${r.def.options.indexOf(c)}"`);l[r.def.discriminator]?.has(void 0)&&s++;for(let[u,d]of Object.entries(l)){Object.prototype.hasOwnProperty.call(i,u)||cn(i,u,new Set);for(let m of d)i[u].add(m)}}return!r.def.unionFallback&&s>1&&i[r.def.discriminator]?.delete(void 0),i}),n.options.forEach((r,i)=>{let s=bt(r._zod.def);if(s&&!Object.prototype.hasOwnProperty.call(s,n.discriminator))throw new Error(`Invalid discriminated union option at index "${i}"`)});let o=vt(()=>cm(n));e._zod.parse=(r,i)=>{let s=r.value;if(!rt(s))return r.issues.push({code:"invalid_type",expected:"object",input:s,inst:e}),r;let c=s?.[n.discriminator],l=o.value.get(c);return l&&(c!==void 0||i.direction!=="backward")?l._zod.run(r,i):n.unionFallback||i.direction==="backward"?t(r,i):(r.issues.push({code:"invalid_union",errors:[],note:"No matching discriminator",discriminator:n.discriminator,options:Array.from(o.value.keys()).filter(u=>o.value.get(u)!==null),input:s,path:[n.discriminator],inst:e}),r)}}),cl=T("$ZodIntersection",(e,n)=>{ke.init(e,n),e._zod.parse=(t,o)=>{let r=t.value,i=n.left._zod.run({value:r,issues:[]},o),s=n.right._zod.run({value:r,issues:[]},o);return i instanceof Promise||s instanceof Promise?Promise.all([i,s]).then(([l,u])=>ba(t,l,u)):ba(t,i,s)}});function Vr(e,n){if(e===n)return{valid:!0,data:e};if(e instanceof Date&&n instanceof Date&&+e==+n)return{valid:!0,data:e};if(Vn(e)&&Vn(n)){let t=Object.keys(n),o=Object.keys(e).filter(i=>t.indexOf(i)!==-1),r={...e,...n};Object.prototype.hasOwnProperty.call(r,"__proto__")&&delete r.__proto__;for(let i of o){if(i==="__proto__")continue;let s=Vr(e[i],n[i]);if(!s.valid)return{valid:!1,mergeErrorPath:[i,...s.mergeErrorPath]};r[i]=s.data}return{valid:!0,data:r}}if(Array.isArray(e)&&Array.isArray(n)){if(e.length!==n.length)return{valid:!1,mergeErrorPath:[]};let t=[];for(let o=0;o<e.length;o++){let r=e[o],i=n[o],s=Vr(r,i);if(!s.valid)return{valid:!1,mergeErrorPath:[o,...s.mergeErrorPath]};t.push(s.data)}return{valid:!0,data:t}}return{valid:!1,mergeErrorPath:[]}}function ba(e,n,t){let o=new Map,r,i=new Map,s=(u,d)=>{let m;if(u.code==="unrecognized_keys"&&!u.path?.length)r??(r=u),m=u.keys;else if(u.code==="invalid_key"&&u.origin==="record"&&u.path?.length===1){let f=String(u.path[0]);i.has(f)||i.set(f,u),m=[f]}else return!1;for(let f of m)o.has(f)||o.set(f,{}),o.get(f)[d]=!0;return!0};for(let u of n.issues)s(u,"l")||e.issues.push(u);for(let u of t.issues)s(u,"r")||e.issues.push(u);let c=[...o].filter(([,u])=>u.l&&u.r).map(([u])=>u);if(c.length){let u=r?c.filter(d=>r.keys.includes(d)):[];u.length&&e.issues.push({...r,keys:u});for(let d of c)!u.includes(d)&&i.has(d)&&e.issues.push(i.get(d))}let l=Vr(n.value,t.value);if(!l.valid){if(_n(e))return e;throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(l.mergeErrorPath)}`)}return e.value=l.data,e}var ul=T("$ZodRecord",(e,n)=>{ke.init(e,n);let t=rn.memoizer;t?.attach(e),e._zod.parse=(o,r)=>{let i=o.value;if(!Vn(i))return o.issues.push({expected:"record",code:"invalid_type",input:i,inst:e}),o;let s=[],c=n.keyType._zod.values;if(c&&!n.partial){o.value=t?t.alloc(e,o,{},r):{};let l=new Set;for(let d of c)if(typeof d=="string"||typeof d=="number"||typeof d=="symbol"){if(l.add(typeof d=="number"?d.toString():d),d==="__proto__")continue;let m=n.keyType._zod.run({value:d,issues:[]},r);if(m instanceof Promise)throw new Error("Async schemas not supported in object keys currently");if(m.issues.length){o.issues.push({code:"invalid_key",origin:"record",issues:m.issues.map(y=>kn(y,r,un())),input:d,path:[d],inst:e});continue}let f=m.value;if(f==="__proto__")continue;let p=n.valueType._zod.run({value:i[d],issues:[]},r);p instanceof Promise?s.push(p.then(y=>{y.issues.length&&o.issues.push(...Tn(d,y.issues)),o.value[f]=y.value})):(p.issues.length&&o.issues.push(...Tn(d,p.issues)),o.value[f]=p.value)}let u;for(let d in i)if(!l.has(d))if(n.mode==="loose"){if(d==="__proto__")continue;o.value[d]=i[d]}else u=u??[],u.push(d);u&&u.length>0&&o.issues.push({code:"unrecognized_keys",input:i,inst:e,keys:u,continue:!0})}else{o.value=t?t.alloc(e,o,{},r):{};let l;for(let u of Reflect.ownKeys(i)){if(u==="__proto__"||!Object.prototype.propertyIsEnumerable.call(i,u))continue;let d=n.keyType._zod.run({value:u,issues:[]},r);if(d instanceof Promise)throw new Error("Async schemas not supported in object keys currently");if(typeof u=="string"&&Vt.test(u)&&d.issues.length){let y=n.keyType._zod.run({value:Number(u),issues:[]},r);if(y instanceof Promise)throw new Error("Async schemas not supported in object keys currently");y.issues.length===0&&(d=y)}if(d.issues.length){n.mode==="loose"?o.value[u]=i[u]:c?(l=l??[],l.push(u)):o.issues.push({code:"invalid_key",origin:"record",issues:d.issues.map(y=>kn(y,r,un())),input:u,path:[u],inst:e});continue}let f=d.value;if(f==="__proto__")continue;let p=n.valueType._zod.run({value:i[u],issues:[]},r);p instanceof Promise?s.push(p.then(y=>{y.issues.length&&o.issues.push(...Tn(u,y.issues)),o.value[f]=y.value})):(p.issues.length&&o.issues.push(...Tn(u,p.issues)),o.value[f]=p.value)}l&&l.length>0&&o.issues.push({code:"unrecognized_keys",input:i,inst:e,keys:l,continue:!0})}return s.length?Promise.all(s).then(()=>o):o}});var dl=T("$ZodEnum",(e,n)=>{ke.init(e,n);let t=ht(n.entries),o=new Set(t);e._zod.values=o,fe(e,"pattern",r=>{let i=ht(r.def.entries).filter(s=>Ar.has(typeof s));return new RegExp(i.length?`^(${i.map(s=>In(s.toString())).join("|")})$`:"^[^\\s\\S]$")}),e._zod.parse=(r,i)=>{let s=r.value;return o.has(s)||r.issues.push({code:"invalid_value",values:t,input:s,inst:e}),r}}),pl=T("$ZodLiteral",(e,n)=>{ke.init(e,n);let t=new Set(n.values);e._zod.values=t,fe(e,"pattern",o=>{let r=o.def.values;return new RegExp(r.length?`^(${r.map(i=>typeof i=="string"?In(i):i?In(i.toString()):String(i)).join("|")})$`:"^[^\\s\\S]$")}),e._zod.parse=(o,r)=>{let i=o.value;return t.has(i)||o.issues.push({code:"invalid_value",values:n.values,input:i,inst:e}),o}});var ml=T("$ZodTransform",(e,n)=>{ke.init(e,n),e._zod.optin="optional",rn.memoizer?.guard(e),e._zod.parse=(t,o)=>{if(o.direction==="backward")throw new wt(e.constructor.name);let r=n.transform(t.value,t);if(o.async)return(r instanceof Promise?r:Promise.resolve(r)).then(s=>(t.value=s,t));if(r instanceof Promise)throw new Pn;return t.value=r,t}});function ya(e,n){return e.value=n.issues.length?void 0:n.value,e}var Yr=T("$ZodOptional",(e,n)=>{ke.init(e,n),fe(e,"optin",t=>t.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),e._zod.optout="optional",fe(e,"values",t=>{let o=t.def.innerType._zod.values;return o?new Set([...o,void 0]):void 0}),fe(e,"pattern",t=>{let o=t.def.innerType._zod.pattern;return o?new RegExp(`^(${Bt(o.source)})?$`):void 0}),e._zod.parse=(t,o)=>{if(t.value===void 0){if(n.innerType._zod.optin!=="defaulted")return t;let r=n.innerType._zod.run({value:t.value,issues:[]},o);return r instanceof Promise?r.then(i=>ya(t,i)):ya(t,r)}return n.innerType._zod.run(t,o)}}),fl=T("$ZodExactOptional",(e,n)=>{Yr.init(e,n),fe(e,"values",t=>t.def.innerType._zod.values),fe(e,"pattern",t=>t.def.innerType._zod.pattern),e._zod.parse=(t,o)=>n.innerType._zod.run(t,o)}),hl=T("$ZodNullable",(e,n)=>{ke.init(e,n),fe(e,"optin",t=>t.def.innerType._zod.optin),fe(e,"optout",t=>t.def.innerType._zod.optout),fe(e,"pattern",t=>{let o=t.def.innerType._zod.pattern;return o?new RegExp(`^(${Bt(o.source)}|null)$`):void 0}),fe(e,"values",t=>t.def.innerType._zod.values?new Set([...t.def.innerType._zod.values,null]):void 0),e._zod.parse=(t,o)=>t.value===null?t:n.innerType._zod.run(t,o)}),gl=T("$ZodDefault",(e,n)=>{ke.init(e,n),e._zod.optin="defaulted",fe(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,o)=>{if(o.direction==="backward")return n.innerType._zod.run(t,o);if(t.value===void 0)return t.value=n.defaultValue,t;let r=n.innerType._zod.run(t,o);return r instanceof Promise?r.then(i=>wa(i,n)):wa(r,n)}});function wa(e,n){return e.value===void 0&&(e.value=n.defaultValue),e}var vl=T("$ZodPrefault",(e,n)=>{ke.init(e,n),e._zod.optin="defaulted",fe(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,o)=>(o.direction==="backward"||t.value===void 0&&(t.value=n.defaultValue),n.innerType._zod.run(t,o))}),bl=T("$ZodNonOptional",(e,n)=>{ke.init(e,n),fe(e,"values",t=>{let o=t.def.innerType._zod.values;return o?new Set([...o].filter(r=>r!==void 0)):void 0}),e._zod.parse=(t,o)=>{let r=n.innerType._zod.run(t,o);return r instanceof Promise?r.then(i=>xa(i,e)):xa(r,e)}});function xa(e,n){return!e.issues.length&&e.value===void 0&&e.issues.push({code:"invalid_type",expected:"nonoptional",input:e.value,inst:n}),e}function _a(e,n,t,o){return n.issues.length?(e.value=t.catchValue({...n,value:e.value,error:{issues:n.issues.map(r=>kn(r,o,un()))},input:e.value}),e):(e.value=n.value,n.memo&&(e.memo=!0),e)}var yl=T("$ZodCatch",(e,n)=>{ke.init(e,n),fe(e,"optin",t=>t.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),fe(e,"optout",t=>t.def.innerType._zod.optout),fe(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,o)=>{if(o.direction==="backward")return n.innerType._zod.run(t,o);let r=n.innerType._zod.run({value:t.value,issues:[]},o);return r instanceof Promise?r.then(i=>_a(t,i,n,o)):_a(t,r,n,o)}});var wl=T("$ZodPipe",(e,n)=>{ke.init(e,n),fe(e,"values",t=>t.def.in._zod.values),fe(e,"optin",t=>t.def.in._zod.optin),fe(e,"optout",t=>t.def.out._zod.optout),fe(e,"propValues",t=>t.def.in._zod.propValues),e._zod.parse=(t,o)=>{if(o.direction==="backward"){let i=n.out._zod.run(t,o);return i instanceof Promise?i.then(s=>$o(s,n.in,o)):$o(i,n.in,o)}let r=n.in._zod.run(t,o);return r instanceof Promise?r.then(i=>$o(i,n.out,o)):$o(r,n.out,o)}});function $o(e,n,t){return e.issues.some(o=>o.code!=="unrecognized_keys")?(e.aborted=!0,e):n._zod.run({value:e.value,issues:e.issues},t)}var xl=T("$ZodReadonly",(e,n)=>{ke.init(e,n),fe(e,"propValues",t=>t.def.innerType._zod.propValues),fe(e,"values",t=>t.def.innerType._zod.values),fe(e,"optin",t=>t.def.innerType?._zod?.optin),fe(e,"optout",t=>t.def.innerType?._zod?.optout),e._zod.parse=(t,o)=>{if(o.direction==="backward")return n.innerType._zod.run(t,o);let r=n.innerType._zod.run(t,o);return r instanceof Promise?r.then(ka):ka(r)}});function ka(e){return e.memo||(e.value=Object.freeze(e.value)),e}var _l=T("$ZodLazy",(e,n)=>{ke.init(e,n),zr(e._zod,"innerType",()=>{let t=n;return t._cachedInner||(t._cachedInner=n.getter()),t._cachedInner}),fe(e,"pattern",t=>t.innerType?._zod?.pattern),fe(e,"propValues",t=>t.innerType?._zod?.propValues),fe(e,"optin",t=>t.innerType?._zod?.optin??void 0),fe(e,"optout",t=>t.innerType?._zod?.optout??void 0),e._zod.parse=(t,o)=>e._zod.innerType._zod.run(t,o)}),kl=T("$ZodCustom",(e,n)=>{Ge.init(e,n),ke.init(e,n),e._zod.parse=(t,o)=>t,e._zod.check=t=>{let o=t.value,r=n.fn(o);if(r instanceof Promise)return r.then(i=>Pa(i,t,o,e));Pa(r,t,o,e)}});function Pa(e,n,t,o){if(!e){let r={code:"custom",input:t,inst:o,path:[...o._zod.def.path??[]],continue:!o._zod.def.abort};o._zod.def.params&&(r.params=o._zod.def.params),n.issues.push(yt(r))}}var ei=class extends Error{constructor(){super("Cannot parse a reference cycle that closes through a transform"),this.name="ZodCyclicError"}},ni="~memo",Pl=[];function Sl(e){return e!==null&&typeof e=="object"}function Qr(e){return e.map(n=>n.path?{...n,path:n.path.slice()}:{...n})}var Ul=new WeakMap,Kt=0,Lo=1,Xt=2;function qo(e,n,t){let o=Ul.get(e);if(o!==void 0)return o?Xt:Kt;if(n.has(e))return Xt;n.add(e);let r=Kt,i=d=>{if(r!==Xt&&d?._zod){let m=qo(d,n,t);m>r&&(r=m)}},s=(d,m)=>{let f=Kt;for(let p of Reflect.ownKeys(d)){let y=Object.getOwnPropertyDescriptor(d,p);if(m&&!y.enumerable)continue;let v=y.get?Lo:y.value?._zod?qo(y.value,n,t):Kt;v>f&&(f=v)}return f},c=d=>{d>r&&(r=d)},l=e._zod.def,u=l.type;switch(u){case"object":{let d=bt(l);c(d?s(d,!0):Lo),i(l.catchall);break}case"array":i(l.element);break;case"tuple":for(let d of l.items)i(d);i(l.rest);break;case"record":case"map":i(l.keyType),i(l.valueType);break;case"set":i(l.valueType);break;case"union":for(let d of l.options)i(d);break;case"intersection":i(l.left),i(l.right);break;case"optional":case"nullable":case"default":case"prefault":case"catch":case"readonly":case"nonoptional":case"promise":case"success":i(l.innerType);break;case"pipe":i(l.in),i(l.out);break;case"function":i(l.input),i(l.output);break;case"lazy":{let d=l._cachedInner??(t?e._zod.innerType:void 0);c(d?qo(d,n,!1):Lo);break}case"template_literal":case"string":case"number":case"int":case"boolean":case"bigint":case"symbol":case"undefined":case"null":case"void":case"never":case"any":case"unknown":case"date":case"nan":case"enum":case"literal":case"file":case"transform":case"custom":break;default:for(let d in l){let m=Object.getOwnPropertyDescriptor(l,d);if(!m||m.get)continue;let f=m.value;if(!(!f||typeof f!="object")){if(f._zod)i(f);else if(Array.isArray(f))for(let p of f)i(p)}}}return n.delete(e),um(e,r)}function um(e,n){return n!==Lo&&Ul.set(e,n===Xt),n}function dm(e,n){let t=e.buckets.get(n);return t||(t=new WeakMap,e.buckets.set(n,t)),t}var Bo,Zo=[],pm={alloc(e,n,t){let o=Bo;if(!o)return t;Bo=void 0;let r={value:t,issues:null};return o.set(n.value,r),Zo.push(r),t},guard(e){var n;(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred.push(()=>{let t=e._zod.parse,o=(r,i)=>{if(i.direction!=="backward"&&mm(i,r.value))throw new ei;return t(r,i)};e._zod.parse=o,e._zod.run===t&&(e._zod.run=o)})},attach(e){var n;let t,o=!1,r,i;(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred.push(()=>{let s=e._zod.parse,c=(l,u)=>{if(t===void 0){let x=qo(e,new Set,!1);if(x===Kt)return e._zod.parse=s,e._zod.run===c&&(e._zod.run=s),s(l,u);x===Xt||o?t=!0:o=!0}let d=l.value;if(!Sl(d))return s(l,u);let m=u[ni];m||(m={buckets:new WeakMap,backEdges:void 0},u[ni]=m);let f;r===u?f=i:(f=dm(m,e),r=u,i=f);let p=f.get(d);if(p)return l.value=p.value,p.issues?p.issues.length&&l.issues.push(...Qr(p.issues)):(l.memo=!0,m.backEdges??(m.backEdges=new WeakSet),m.backEdges.add(p.value)),l;Bo=f;let y=Zo.length,v=s(l,u);Bo=void 0;let b=Zo.length>y?Zo.pop():void 0;return v instanceof Promise?v.then(x=>(b&&(b.issues=x.issues.length?Qr(x.issues):Pl),x)):(b&&(b.issues=v.issues.length?Qr(v.issues):Pl),v)};e._zod.parse=c,e._zod.run===s&&(e._zod.run=c)})}};function zl(){return pm}function mm(e,n){let t=e[ni]?.backEdges;return t!==void 0&&Sl(n)&&t.has(n)}var fm=()=>{let e={string:{unit:"characters",verb:"to have"},file:{unit:"bytes",verb:"to have"},array:{unit:"items",verb:"to have"},set:{unit:"items",verb:"to have"},map:{unit:"entries",verb:"to have"}};function n(i){return e[i]??null}let t={regex:"input",email:"email address",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO datetime",date:"ISO date",time:"ISO time",duration:"ISO duration",ipv4:"IPv4 address",ipv6:"IPv6 address",mac:"MAC address",cidrv4:"IPv4 range",cidrv6:"IPv6 range",base64:"base64-encoded string",base64url:"base64url-encoded string",json_string:"JSON string",e164:"E.164 number",currency_code:"currency code",credit_card:"credit card number",iban:"IBAN",jwt:"JWT",template_literal:"input"},o={nan:"NaN"};function r(i,s){return i==="number"&&typeof s=="number"&&!Number.isFinite(s)?String(s):o[i]??i}return i=>{switch(i.code){case"invalid_type":{let s=r(i.expected),c=Ir(i.input),l=r(c,i.input);return`Invalid input: expected ${s}, received ${l}`}case"invalid_value":return i.values.length===1?`Invalid input: expected ${So(i.values[0])}`:`Invalid option: expected one of ${ko(i.values,"|")}`;case"too_big":{let s=i.exact?"exactly ":i.inclusive?"<=":"<",c=n(i.origin);return c?`Too big: expected ${i.origin??"value"} to have ${s}${i.maximum.toString()} ${c.unit??"elements"}`:`Too big: expected ${i.origin??"value"} to be ${s}${i.maximum.toString()}`}case"too_small":{let s=i.exact?"exactly ":i.inclusive?">=":">",c=n(i.origin);return c?`Too small: expected ${i.origin} to have ${s}${i.minimum.toString()} ${c.unit}`:`Too small: expected ${i.origin} to be ${s}${i.minimum.toString()}`}case"invalid_format":{let s=i;return s.format==="starts_with"?`Invalid string: must start with "${s.prefix}"`:s.format==="ends_with"?`Invalid string: must end with "${s.suffix}"`:s.format==="includes"?`Invalid string: must include "${s.includes}"`:s.format==="regex"?`Invalid string: must match pattern ${s.pattern}`:`Invalid ${t[s.format]??i.format}`}case"not_multiple_of":return`Invalid number: must be a multiple of ${i.divisor}`;case"unrecognized_keys":return`Unrecognized key${i.keys.length>1?"s":""}: ${ko(i.keys,", ")}`;case"invalid_key":return`Invalid key in ${i.origin}`;case"invalid_union":return i.options&&Array.isArray(i.options)&&i.options.length>0?`Invalid discriminator value. Expected ${i.options.map(c=>`'${c}'`).join(" | ")}`:i.inclusive===!1?"Invalid input: more than one option matched":"Invalid input";case"invalid_element":return`Invalid value in ${i.origin}`;default:return"Invalid input"}}};function Cl(){return{localeError:fm()}}var jl;var ti=class{constructor(){this._map=new WeakMap,this._idmap=new Map}add(n,...t){let o=t[0];return this._map.set(n,o),o&&typeof o=="object"&&"id"in o&&this._idmap.set(o.id,n),this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(n){let t=this._map.get(n);return t&&typeof t=="object"&&"id"in t&&this._idmap.delete(t.id),this._map.delete(n),this}get(n){let t=n._zod.parent;if(t){let o={...this.get(t)??{}};delete o.id;let r={...o,...this._map.get(n)};return Object.keys(r).length?r:void 0}return this._map.get(n)}has(n){return this._map.has(n)}};function hm(){return new ti}(jl=globalThis).__zod_globalRegistry??(jl.__zod_globalRegistry=hm());var it=globalThis.__zod_globalRegistry;function Nl(e){return e.checks&&(e.checks=[...e.checks]),e}function Al(e,n){return new e(Nl({type:"string",...oe(n)}))}function El(e,n){return new e({type:"string",format:"email",check:"string_format",abort:!1,...oe(n)})}function Wl(e,n){return new e({type:"string",format:"guid",check:"string_format",abort:!1,...oe(n)})}function Il(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,...oe(n)})}function Tl(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v4",...oe(n)})}function Dl(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v6",...oe(n)})}function $l(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v7",...oe(n)})}function Ol(e,n){return new e({type:"string",format:"url",check:"string_format",abort:!1,...oe(n)})}function Rl(e,n){return new e({type:"string",format:"emoji",check:"string_format",abort:!1,...oe(n)})}function Fl(e,n){return new e({type:"string",format:"nanoid",check:"string_format",abort:!1,...oe(n)})}function Ml(e,n){return new e({type:"string",format:"cuid",check:"string_format",abort:!1,...oe(n)})}function Bl(e,n){return new e({type:"string",format:"cuid2",check:"string_format",abort:!1,...oe(n)})}function Zl(e,n){return new e({type:"string",format:"ulid",check:"string_format",abort:!1,...oe(n)})}function Ll(e,n){return new e({type:"string",format:"xid",check:"string_format",abort:!1,...oe(n)})}function ql(e,n){return new e({type:"string",format:"ksuid",check:"string_format",abort:!1,...oe(n)})}function Hl(e,n){return new e({type:"string",format:"ipv4",check:"string_format",abort:!1,...oe(n)})}function Vl(e,n){return new e({type:"string",format:"ipv6",check:"string_format",abort:!1,...oe(n)})}function Gl(e,n){return new e({type:"string",format:"cidrv4",check:"string_format",abort:!1,...oe(n)})}function Jl(e,n){return new e({type:"string",format:"cidrv6",check:"string_format",abort:!1,...oe(n)})}function Kl(e,n){return new e({type:"string",format:"base64",check:"string_format",abort:!1,...oe(n)})}function Xl(e,n){return new e({type:"string",format:"base64url",check:"string_format",abort:!1,...oe(n)})}function Yl(e,n){return new e({type:"string",format:"e164",check:"string_format",abort:!1,...oe(n)})}function Ql(e,n){return new e({type:"string",format:"jwt",check:"string_format",abort:!1,...oe(n)})}function ec(e,n){return new e({type:"string",format:"datetime",check:"string_format",offset:!1,local:!1,precision:null,...oe(n)})}function nc(e,n){return new e({type:"string",format:"date",check:"string_format",...oe(n)})}function tc(e,n){return new e({type:"string",format:"time",check:"string_format",precision:null,...oe(n)})}function oc(e,n){return new e({type:"string",format:"duration",check:"string_format",...oe(n)})}function rc(e,n){return new e(Nl({type:"number",checks:[],...oe(n)}))}function ic(e,n){return new e({type:"number",check:"number_format",abort:!1,format:"safeint",...oe(n)})}function sc(e,n){return new e({type:"boolean",...oe(n)})}function ac(e,n){return new e({type:"null",...oe(n)})}function lc(e){return new e({type:"unknown"})}function cc(e,n){return new e({type:"never",...oe(n)})}function Ho(e,n){return new qr({check:"less_than",...oe(n),value:e,inclusive:!1})}function Yt(e,n){return new qr({check:"less_than",...oe(n),value:e,inclusive:!0})}function Vo(e,n){return new Hr({check:"greater_than",...oe(n),value:e,inclusive:!1})}function Qt(e,n){return new Hr({check:"greater_than",...oe(n),value:e,inclusive:!0})}function Go(e,n){return new na({check:"multiple_of",...oe(n),value:e})}function Jo(e,n){return new oa({check:"max_length",...oe(n),maximum:e})}function xt(e,n){return new ra({check:"min_length",...oe(n),minimum:e})}function Ko(e,n){return new ia({check:"length_equals",...oe(n),length:e})}function oi(e,n){return new sa({check:"string_format",format:"regex",...oe(n),pattern:e})}function ri(e){return new aa({check:"string_format",format:"lowercase",...oe(e)})}function ii(e){return new la({check:"string_format",format:"uppercase",...oe(e)})}function si(e,n){return new ca({check:"string_format",format:"includes",...oe(n),includes:e})}function ai(e,n){return new ua({check:"string_format",format:"starts_with",...oe(n),prefix:e})}function li(e,n){return new da({check:"string_format",format:"ends_with",...oe(n),suffix:e})}function Gn(e){return new pa({check:"overwrite",tx:e})}function ci(e){return Gn(n=>n.normalize(e))}function ui(){return Gn(e=>e.trim())}function di(){return Gn(e=>e.toLowerCase())}function pi(){return Gn(e=>e.toUpperCase())}function mi(){return Gn(e=>jr(e))}function uc(e,n,t){return new e({type:"array",element:n,...oe(t)})}function dc(e,n,t){return new e({type:"custom",check:"custom",fn:n,...oe(t)})}function pc(e,n){let t=gm(o=>(o.addIssue=r=>{if(typeof r=="string")o.issues.push(yt(r,o.value,t._zod.def));else{let i=r;i.fatal&&(i.continue=!1),i.code??(i.code="custom"),"input"in i||(i.input=o.value),i.inst??(i.inst=t),i.continue??(i.continue=!t._zod.def.abort),o.issues.push(yt(i))}},e(o.value,o)),n);return t}function gm(e,n){let t=new Ge({check:"custom",...oe(n)});return t._zod.check=e,t}function eo(e,...n){for(let t of n)for(let o of Reflect.ownKeys(t))Object.prototype.propertyIsEnumerable.call(t,o)&&cn(e,o,t[o]);return e}function hi(e){let n=e?.target??"draft-2020-12";return n==="draft-4"&&(n="draft-04"),n==="draft-7"&&(n="draft-07"),{processors:e.processors??{},metadataRegistry:e?.metadata??it,target:n,unrepresentable:e?.unrepresentable??"throw",override:e?.override??(()=>{}),io:e?.io??"output",counter:0,seen:new Map,sharedDefsExtractedFor:void 0,sharedEmitDoneFor:void 0,cycles:e?.cycles??"ref",reused:e?.reused??"inline",intersections:[],deferred:[],external:e?.external??void 0}}function Dn(e,n,t,o,r){let i=typeof n.unrepresentable=="function"?n.unrepresentable({zodSchema:e,path:o.path,message:r}):n.unrepresentable;if(i==="any")return!1;if(i===void 0||i==="throw")throw new Error(r);return Object.assign(t,i),!0}function We(e,n,t={path:[],schemaPath:[]}){var o;let r=e._zod.def,i=n.seen.get(e);if(i)return i.count++,t.schemaPath.includes(e)&&(i.cycle=t.path),i.schema;let s={schema:{},count:1,cycle:void 0,path:t.path};n.seen.set(e,s),n.sharedDefsExtractedFor=void 0,n.sharedEmitDoneFor=void 0;let c=e._zod.toJSONSchema?.();if(c)s.schema=c;else{let d={...t,schemaPath:[...t.schemaPath,e],path:t.path};if(e._zod.processJSONSchema)e._zod.processJSONSchema(n,s.schema,d);else{let f=s.schema,p=n.processors[r.type];if(!p)throw new Error(`[toJSONSchema]: Non-representable type encountered: ${r.type}`);p(e,n,f,d)}let m=e._zod.parent;m&&(s.ref||(s.ref=m),We(m,n,d),n.seen.get(m).isParent=!0)}let l=n.metadataRegistry.get(e);return l&&eo(s.schema,l),n.io==="input"&&nn(e)&&(delete s.schema.examples,delete s.schema.default),n.io==="input"&&"_prefault"in s.schema&&((o=s.schema).default??(o.default=s.schema._prefault)),delete s.schema._prefault,n.seen.get(e).schema}function mc(e){return e.replace(/~/g,"~0").replace(/\//g,"~1")}function gi(e,n){let t=e.seen.get(n);if(!t)throw new Error("Unprocessed schema. This is a bug in Zod.");if(e.external&&e.sharedDefsExtractedFor===e.external)return;let o=new Map;for(let s of e.seen.entries()){let c=e.metadataRegistry.get(s[0])?.id;if(c){let l=o.get(c);if(l&&l!==s[0])throw new Error(`Duplicate schema id "${c}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);o.set(c,s[0])}}let r=s=>{let c=e.target==="draft-2020-12"?"$defs":"definitions";if(e.external){let m=e.external.registry.get(s[0])?.id,f=e.external.uri??(y=>y);if(m)return{ref:f(m)};let p=s[1].defId??s[1].schema.id??`schema${e.counter++}`;return s[1].defId=p,{defId:p,ref:`${f("__shared")}#/${c}/${mc(p)}`}}let l="#",u=`${l}/${c}/`;if(s[1]===t&&!s[1].schema.id)return{ref:l};let d=s[1].schema.id??`__schema${e.counter++}`;return{defId:d,ref:u+mc(d)}},i=s=>{if(s[1].schema.$ref)return;let c=s[1],{ref:l,defId:u}=r(s);c.def={...c.schema},u&&(c.defId=u);let d=c.schema;for(let m in d)delete d[m];d.$ref=l};if(e.cycles==="throw")for(let s of e.seen.entries()){let c=s[1];if(c.cycle)throw new Error(`Cycle detected: #/${c.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`)}for(let s of e.seen.entries()){let c=s[1];if(n===s[0]){i(s);continue}if(e.external){let u=e.external.registry.get(s[0])?.id;if(n!==s[0]&&u){i(s);continue}}if(e.metadataRegistry.get(s[0])?.id){i(s);continue}if(c.cycle){i(s);continue}c.count>1&&e.reused==="ref"&&i(s)}e.external&&(e.sharedDefsExtractedFor=e.external)}function gc(e){let n=e.anyOf;if(!Array.isArray(n)||n.length===0||e.type!==void 0)return;let t=[];for(let o of n){if(!o||typeof o!="object")return;gc(o);let r=Object.keys(o);if(r.length!==1||r[0]!=="type")return;let i=o.type;for(let s of Array.isArray(i)?i:[i]){if(typeof s!="string")return;t.includes(s)||t.push(s)}}delete e.anyOf,e.type=t.length===1?t[0]:t}var vc=new Set(["type","properties","required","additionalProperties"]),fc=["oneOf","anyOf"];function hc(e){let n=e.additionalProperties;return n===void 0||n===!1||typeof n!="object"||n===null?null:Object.keys(n).length?n:null}function fi(e){let n=[];for(let i of e){if(typeof i!="object"||i.type!=="object")return null;for(let s in i)if(!vc.has(s))return null;n.push(i)}let t={},o=new Set;for(let i of n){for(let s in i.properties){if(Object.prototype.hasOwnProperty.call(t,s))continue;let c=[];for(let u of n){let d=u.properties?.[s]??hc(u);d!=null&&(c.some(m=>JSON.stringify(m)===JSON.stringify(d))||c.push(d))}let l=c.length===1?c[0]:fi(c)??{allOf:c};cn(t,s,l)}for(let s of i.required??[])o.add(s)}let r={type:"object",properties:t};if(o.size&&(r.required=[...o]),n.every(i=>i.additionalProperties===!1))r.additionalProperties=!1;else{let i=[];for(let s of n){let c=hc(s);c&&!i.some(l=>JSON.stringify(l)===JSON.stringify(c))&&i.push(c)}i.length===1?r.additionalProperties=i[0]:i.length>1&&(r.additionalProperties={allOf:i})}return r}function vm(e){let n=e.allOf;if(!Array.isArray(n)||n.length<2)return;for(let r of vc)if(r in e)return;let t=n.filter(r=>fc.some(i=>Array.isArray(r[i]))),o=null;if(!t.length)o=fi(n);else{let r=t[0],i=fc.find(l=>Array.isArray(r[l]));if(Object.keys(r).length!==1)return;let s=n.filter(l=>l!==r),c=r[i].map(l=>fi([...s,l]));if(c.some(l=>!l))return;o={[i]:c}}o&&(delete e.allOf,eo(e,o))}function vi(e,n){let t=e.seen.get(n);if(!t)throw new Error("Unprocessed schema. This is a bug in Zod.");let o=c=>{let l=e.seen.get(c);if(l.ref===null)return;let u=l.def??l.schema,d={...u},m=l.ref;if(l.ref=null,m){o(m);let p=e.seen.get(m),y=p.schema;if(y.$ref&&(e.target==="draft-07"||e.target==="draft-04"||e.target==="openapi-3.0")?(u.allOf=u.allOf??[],u.allOf.push(y)):eo(u,y),eo(u,d),c._zod.parent===m)for(let b in u)b==="$ref"||b==="allOf"||b in d||delete u[b];if(y.$ref&&p.def)for(let b in u)b==="$ref"||b==="allOf"||b in p.def&&JSON.stringify(u[b])===JSON.stringify(p.def[b])&&delete u[b]}let f=c._zod.parent;if(f&&f!==m){o(f);let p=e.seen.get(f);if(p?.schema.$ref&&(u.$ref=p.schema.$ref,p.def))for(let y in u)y==="$ref"||y==="allOf"||y in p.def&&JSON.stringify(u[y])===JSON.stringify(p.def[y])&&delete u[y]}e.override({zodSchema:c,jsonSchema:u,path:l.path??[]})};if(!e.external||e.sharedEmitDoneFor!==e.external){for(let c of[...e.seen.entries()].reverse())o(c[0]);if(e.target!=="openapi-3.0")for(let c of e.seen.entries())gc(c[1].def??c[1].schema);for(let c of e.deferred)c();if(e.intersections.length){let c=new Map;for(let l of e.seen.values())for(let u of[l.schema,l.def]){let d=u?.allOf;if(!Array.isArray(d))continue;let m=c.get(d);m?m.push(u):c.set(d,[u])}for(let l of e.intersections)for(let u of c.get(l)??[])vm(u)}}let r={};if(e.target==="draft-2020-12"?r.$schema="https://json-schema.org/draft/2020-12/schema":e.target==="draft-07"?r.$schema="http://json-schema.org/draft-07/schema#":e.target==="draft-04"?r.$schema="http://json-schema.org/draft-04/schema#":e.target,e.external?.uri){let c=e.external.registry.get(n)?.id;if(!c)throw new Error("Schema is missing an `id` property");r.$id=e.external.uri(c)}eo(r,t.defId?t.schema:t.def??t.schema);let i=e.metadataRegistry.get(n)?.id;i!==void 0&&r.id===i&&delete r.id;let s=e.external?.defs??{};if(!e.external||e.sharedEmitDoneFor!==e.external)for(let c of e.seen.entries()){let l=c[1];l.def&&l.defId&&(l.def.id===l.defId&&delete l.def.id,cn(s,l.defId,l.def))}e.external&&(e.sharedEmitDoneFor=e.external),e.external||Object.keys(s).length>0&&(e.target==="draft-2020-12"?r.$defs=s:r.definitions=s);try{let c=JSON.parse(JSON.stringify(r));return Object.defineProperty(c,"~standard",{value:{...n["~standard"],jsonSchema:{input:no(n,"input",e.processors),output:no(n,"output",e.processors)}},enumerable:!1,writable:!1}),c}catch{throw new Error("Error converting schema to JSON.")}}function nn(e,n){let t=n??{seen:new Set};if(t.seen.has(e))return!1;t.seen.add(e);let o=e._zod.def;if(o.type==="transform")return!0;if(o.type==="array")return nn(o.element,t);if(o.type==="set")return nn(o.valueType,t);if(o.type==="lazy")return nn(o.getter(),t);if(o.type==="promise"||o.type==="optional"||o.type==="nonoptional"||o.type==="nullable"||o.type==="readonly"||o.type==="default"||o.type==="prefault"||o.type==="catch")return nn(o.innerType,t);if(o.type==="intersection")return nn(o.left,t)||nn(o.right,t);if(o.type==="record"||o.type==="map")return nn(o.keyType,t)||nn(o.valueType,t);if(o.type==="pipe")return e._zod.traits.has("$ZodCodec")?!0:nn(o.in,t)||nn(o.out,t);if(o.type==="object"){for(let r in o.shape)if(nn(o.shape[r],t))return!0;return!1}if(o.type==="union"){for(let r of o.options)if(nn(r,t))return!0;return!1}if(o.type==="tuple"){for(let r of o.items)if(nn(r,t))return!0;return!!(o.rest&&nn(o.rest,t))}return!1}var bc=(e,n={})=>t=>{let o=hi({...t,processors:n});return We(e,o),gi(o,e),vi(o,e)},no=(e,n,t={})=>o=>{let{libraryOptions:r,target:i}=o??{},s=hi({...r??{},target:i,io:n,processors:t});return We(e,s),gi(s,e),vi(s,e)};var _t=(e,n,t)=>{(e[n]===void 0||t>e[n])&&(e[n]=t)},kt=(e,n,t)=>{(e[n]===void 0||t<e[n])&&(e[n]=t)},yc=(e,n)=>{_t(e,"minimum",n),kt(e,"maximum",n)},kc=(e,n)=>{e.multipleOf??(e.multipleOf=[]),e.multipleOf.includes(n)||e.multipleOf.push(n)},Pc=(e,n)=>{e.patterns??(e.patterns=new Set),e.patterns.add(n)},Sc=(e,n)=>{e.mime=e.mime?e.mime.filter(t=>n.includes(t)):[...n]},Uc=(e,n)=>{e.format=n,n.includes("int")&&(e.isInt=!0)},wc=(e,n)=>_t(e,"minimum",n.minimum),xc=(e,n)=>kt(e,"maximum",n.maximum),_c=e=>(n,t)=>{Uc(n,t.format);let[o,r]=e[t.format];_t(n,"minimum",o),kt(n,"maximum",r)},bm={greater_than:(e,n)=>_t(e,n.inclusive?"minimum":"exclusiveMinimum",n.value),less_than:(e,n)=>kt(e,n.inclusive?"maximum":"exclusiveMaximum",n.value),multiple_of:(e,n)=>kc(e,n.value),number_format:_c(Zt),bigint_format:_c(Uo),min_length:wc,max_length:xc,length_equals:(e,n)=>yc(e,n.length),min_size:wc,max_size:xc,size_equals:(e,n)=>yc(e,n.size),string_format:(e,n)=>{Uc(e,n.format),n.pattern&&Pc(e,n.pattern),(n.format==="base64"||n.format==="base64url")&&(e.contentEncoding=n.format),(n.local||n.precision===-1)&&(e.laxFormat=!0)},mime_type:(e,n)=>Sc(e,n.mime)};function gn(e){let n={},t=e._zod.def,o=e._zod.traits.has("$ZodCheck")?[e,...t.checks??[]]:t.checks??[];for(let i of o)bm[i._zod.def.check]?.(n,i._zod.def);let r=e._zod.bag;r.minimum!==void 0&&_t(n,"minimum",r.minimum),r.exclusiveMinimum!==void 0&&_t(n,"exclusiveMinimum",r.exclusiveMinimum),r.maximum!==void 0&&kt(n,"maximum",r.maximum),r.exclusiveMaximum!==void 0&&kt(n,"exclusiveMaximum",r.exclusiveMaximum),r.multipleOf!==void 0&&kc(n,r.multipleOf),r.format!==void 0&&(n.format??(n.format=r.format),r.format.includes("int")&&(n.isInt=!0)),r.mime&&Sc(n,r.mime);for(let i of r.patterns??[])Pc(n,i);return n}var ym={guid:"uuid",url:"uri",datetime:"date-time",json_string:"json-string",regex:""},wm=new Map([[Jr,Bs],[Mo,Zs]]),zc=e=>wm.get(e)??e,Cc=(e,n,t,o)=>{let r=t;r.type="string";let{minimum:i,maximum:s,format:c,patterns:l,contentEncoding:u,laxFormat:d}=gn(e);if(typeof i=="number"&&(r.minLength=i),typeof s=="number"&&(r.maxLength=s),c&&(r.format=ym[c]??c,r.format===""&&delete r.format,(c==="time"||d)&&delete r.format),u&&(r.contentEncoding=u),l&&l.size>0){let m=[...l].map(zc);m.length===1?r.pattern=m[0].source:m.length>1&&(r.allOf=[...m.map(f=>({...n.target==="draft-07"||n.target==="draft-04"||n.target==="openapi-3.0"?{type:"string"}:{},pattern:f.source}))])}},jc=(e,n,t,o)=>{let r=t,{minimum:i,maximum:s,multipleOf:c,exclusiveMaximum:l,exclusiveMinimum:u,isInt:d}=gn(e);r.type=d?"integer":"number";let m=typeof u=="number"&&u>=(i??Number.NEGATIVE_INFINITY),f=typeof l=="number"&&l<=(s??Number.POSITIVE_INFINITY),p=n.target==="draft-04"||n.target==="openapi-3.0";if(m?p?(r.minimum=u,r.exclusiveMinimum=!0):r.exclusiveMinimum=u:typeof i=="number"&&(r.minimum=i),f?p?(r.maximum=l,r.exclusiveMaximum=!0):r.exclusiveMaximum=l:typeof s=="number"&&(r.maximum=s),c){let y=new Set;for(let x of c)Number.isFinite(x)&&x!==0?y.add(Math.abs(x)):Dn(e,n,r,o,`A multipleOf divisor of ${x} cannot be represented in JSON Schema`);let[v,...b]=y;v!==void 0&&(r.multipleOf=v),b.length&&(r.allOf=[...r.allOf??[],...b.map(x=>({multipleOf:x}))])}},Nc=(e,n,t,o)=>{t.type="boolean"};var Ac=(e,n,t,o)=>{n.target==="openapi-3.0"?(t.type="string",t.nullable=!0,t.enum=[null]):t.type="null"};var Ec=(e,n,t,o)=>{t.not={}};var Wc=(e,n,t,o)=>{};var Ic=(e,n,t,o)=>{let r=e._zod.def,i=ht(r.entries);if(i.length===0){t.not={};return}i.every(s=>typeof s=="number")&&(t.type="number"),i.every(s=>typeof s=="string")&&(t.type="string"),t.enum=i},Tc=(e,n,t,o)=>{let r=e._zod.def;if(r.values.length===0){t.not={};return}let i=[];for(let s of r.values)if(s===void 0){if(Dn(e,n,t,o,"Literal `undefined` cannot be represented in JSON Schema"))return}else if(typeof s=="bigint"){if(Dn(e,n,t,o,"BigInt literals cannot be represented in JSON Schema"))return;i.push(Number(s))}else i.push(s);if(i.length!==0)if(i.length===1){let s=i[0];t.type=s===null?"null":typeof s,n.target==="draft-04"||n.target==="openapi-3.0"?t.enum=[s]:t.const=s}else i.every(s=>typeof s=="number")&&(t.type="number"),i.every(s=>typeof s=="string")&&(t.type="string"),i.every(s=>typeof s=="boolean")&&(t.type="boolean"),i.every(s=>s===null)&&(t.type="null"),t.enum=i};var Dc=(e,n,t,o)=>{Dn(e,n,t,o,"Custom types cannot be represented in JSON Schema")};var $c=(e,n,t,o)=>{Dn(e,n,t,o,"Transforms cannot be represented in JSON Schema")};var Oc=(e,n,t,o)=>{let r=t,i=e._zod.def,{minimum:s,maximum:c}=gn(e);typeof s=="number"&&(r.minItems=s),typeof c=="number"&&(r.maxItems=c),r.type="array",r.items=We(i.element,n,{...o,path:[...o.path,"items"]})};function Xo(e){let n=e._zod.def;return n.type==="pipe"&&n.in._zod.traits.has("$ZodTransform")?Xo(n.out):n.type==="catch"?Xo(n.innerType):e._zod.optin}var Rc=(e,n,t,o)=>{let r=t,i=e._zod.def,s=i.shape;if(Object.getOwnPropertySymbols(s).length&&Dn(e,n,r,o,"Symbol keys cannot be represented in JSON Schema"))return;r.type="object",r.properties={};for(let u in s)cn(r.properties,u,We(s[u],n,{...o,path:[...o.path,"properties",u]}));let l=[];for(let u of Object.keys(s)){let d=i.shape[u];(n.io==="input"?Xo(d)===void 0:d._zod.optout===void 0)&&l.push(u)}l.length>0&&(r.required=l),i.catchall?._zod.def.type==="never"?r.additionalProperties=!1:i.catchall?i.catchall&&(r.additionalProperties=We(i.catchall,n,{...o,path:[...o.path,"additionalProperties"]})):n.io==="output"&&(r.additionalProperties=!1)},Fc=(e,n,t,o)=>{let r=e._zod.def,i=r.inclusive===!1,s=r.options.map((c,l)=>We(c,n,{...o,path:[...o.path,i?"oneOf":"anyOf",l]}));i?t.oneOf=s:t.anyOf=s},Mc=(e,n,t,o)=>{let r=e._zod.def,i=We(r.left,n,{...o,path:[...o.path,"allOf",0]}),s=We(r.right,n,{...o,path:[...o.path,"allOf",1]}),c=u=>"allOf"in u&&Object.keys(u).length===1,l=[...c(i)?i.allOf:[i],...c(s)?s.allOf:[s]];t.allOf=l,n.intersections.push(l)};function bi(e,n,t){if(n.$ref){if(t.has(n))return n;t.add(n);let y=e.get(n)?.def;if(!y)return n;let v=bi(e,y,t);return v===y?n:v}for(let y of["anyOf","oneOf"]){let v=n[y];if(!Array.isArray(v))continue;let b=v.map(x=>bi(e,x,t));b.some((x,z)=>x!==v[z])&&(n={...n,[y]:b})}let o=Array.isArray(n.type)?n.type:[n.type],r=!o.includes("string")&&o.some(y=>y==="number"||y==="integer"),i=n.enum??(n.const!==void 0?[n.const]:void 0);if(!r&&!i?.some(y=>typeof y=="number"))return n;let{minimum:s,maximum:c,exclusiveMinimum:l,exclusiveMaximum:u,multipleOf:d,format:m,id:f,...p}=n;return p.enum?p.enum=p.enum.map(y=>typeof y=="number"?String(y):y):typeof p.const=="number"&&(p.const=String(p.const)),r&&(p.type="string",i||(p.pattern=(o.includes("number")?Vt:Zr).source)),p}var yi=new WeakMap;function xm(e){let n=new Map;for(let o of e.seen.values())o.def&&!n.has(o.schema)&&n.set(o.schema,o);let t=new Map;for(let o of yi.get(e)??[]){let r=e.seen.get(o),i=(r?.def??r?.schema)?.propertyNames;if(!i||i===!0||t.has(i))continue;let s=bi(n,i,new Set);s!==i&&t.set(i,s)}if(t.size)for(let o of e.seen.values())for(let r of[o.schema,o.def]){let i=r&&t.get(r.propertyNames);i&&(r.propertyNames=i)}}var Bc=(e,n,t,o)=>{let r=t,i=e._zod.def;r.type="object";let s=i.keyType,c=gn(s).patterns;if(i.mode==="loose"&&c&&c.size>0){let d=We(i.valueType,n,{...o,path:[...o.path,"patternProperties","*"]});r.patternProperties={};for(let m of c)cn(r.patternProperties,zc(m).source,d)}else{if(n.target==="draft-07"||n.target==="draft-2020-12"){r.propertyNames=We(i.keyType,n,{...o,path:[...o.path,"propertyNames"]});let d=yi.get(n);d||(d=[],yi.set(n,d),n.deferred.push(()=>xm(n))),d.push(e)}r.additionalProperties=We(i.valueType,n,{...o,path:[...o.path,"additionalProperties"]})}let l=s._zod.values,u=n.io==="input"&&Xo(i.valueType)!==void 0;if(l&&!i.partial&&!u){let d=[...l].filter(m=>typeof m=="string"||typeof m=="number");d.length>0&&(r.required=d.map(String))}},Zc=(e,n,t,o)=>{let r=e._zod.def,i=We(r.innerType,n,o),s=n.seen.get(e);n.target==="openapi-3.0"?(s.ref=r.innerType,t.nullable=!0):t.anyOf=[i,{type:"null"}]},Lc=(e,n,t,o)=>{let r=e._zod.def;We(r.innerType,n,o);let i=n.seen.get(e);i.ref=r.innerType},wi=Symbol();function qc(e,n,t,o,r){let i=!1,s=JSON.stringify(e,(c,l)=>typeof l!="bigint"?l:(i=!0,null));return i?(Dn(n,t,o,r,"BigInt defaults cannot be represented in JSON Schema"),wi):JSON.parse(s)}var Hc=(e,n,t,o)=>{let r=e._zod.def;We(r.innerType,n,o);let i=n.seen.get(e);i.ref=r.innerType;let s=qc(r.defaultValue,e,n,t,o);s!==wi&&(t.default=s)},Vc=(e,n,t,o)=>{let r=e._zod.def;We(r.innerType,n,o);let i=n.seen.get(e);if(i.ref=r.innerType,n.io!=="input")return;let s=qc(r.defaultValue,e,n,t,o);s!==wi&&(t._prefault=s)},Gc=(e,n,t,o)=>{let r=e._zod.def;We(r.innerType,n,o);let i=n.seen.get(e);i.ref=r.innerType;let s;try{s=r.catchValue(void 0)}catch{Dn(e,n,t,o,"Dynamic catch values are not supported in JSON Schema");return}t.default=s},Jc=(e,n,t,o)=>{let r=e._zod.def,i=r.in._zod.traits.has("$ZodTransform"),s=n.io==="input"?i?r.out:r.in:r.out;We(s,n,o);let c=n.seen.get(e);c.ref=s},Kc=(e,n,t,o)=>{let r=e._zod.def;We(r.innerType,n,o);let i=n.seen.get(e);i.ref=r.innerType,t.readOnly=!0};var xi=(e,n,t,o)=>{let r=e._zod.def;We(r.innerType,n,o);let i=n.seen.get(e);i.ref=r.innerType},Xc=(e,n,t,o)=>{let r=e._zod.innerType;We(r,n,o);let i=n.seen.get(e);i.ref=r};var Yc=new WeakSet([Object.prototype,Error.prototype]);function Yo(e,n,t){Object.defineProperty(e,n,{configurable:!0,enumerable:!1,get(){let o=t(this);return Object.defineProperty(this,n,{value:o,configurable:!0,writable:!0}),o},set(o){Object.defineProperty(this,n,{value:o,configurable:!0,writable:!0})}})}var jm=(e,n)=>{hs.init(e,n),e.name="ZodError";let t=Object.getPrototypeOf(e);Yc.has(t)||(Yc.add(t),Yo(t,"format",o=>r=>vs(o,r)),Yo(t,"flatten",o=>r=>gs(o,r)),Yo(t,"addIssue",o=>r=>{o.issues.push(r),o.message=JSON.stringify(o.issues,gt,2)}),Yo(t,"addIssues",o=>r=>{o.issues.push(...r),o.message=JSON.stringify(o.issues,gt,2)}),Object.defineProperty(t,"isEmpty",{configurable:!0,enumerable:!1,get(){return this.issues.length===0}}))};var dn=T("ZodError",jm,void 0,{Parent:Error});var Qc=Ao(dn),eu=Eo(dn),nu=Wo(dn),tu=Io(dn),ou=ys(dn),ru=ws(dn),iu=xs(dn),su=_s(dn),au=ks(dn),lu=Ps(dn),cu=Ss(dn),uu=Us(dn);function Am(){rn.localeError||un(Cl())}function er(){rn.memoizer||un({memoizer:zl()})}var Ue=T("ZodType",(e,n)=>(Am(),ke.init(e,n),e.def=n,e.type=n.type,e),{check(...e){let n=this.def;return this.clone(se.mergeDefs(n,{checks:[...n.checks??[],...e.map(t=>typeof t=="function"?{_zod:{check:t,def:{check:"custom"},onattach:[]}}:t)]}),{parent:!0})},with(...e){return this.check(...e)},clone(e,n){return xn(this,e,n)},brand(){return this},register(e,n){return e.add(this,n),this},refine(e,n){return this.check(Nf(e,n))},superRefine(e,n){return this.check(Af(e,n))},overwrite(e){return this.check(Gn(e))},optional(){return fu(this)},exactOptional(){return hf(this)},nullable(){return hu(this)},nullish(){return fu(hu(this))},nonoptional(e){return xf(this,e)},array(){return Pe(this)},or(e){return Pt([this,e])},and(e){return df(this,e)},transform(e){return gu(this,ff(e))},default(e){return bf(this,e)},prefault(e){return wf(this,e)},catch(e){return kf(this,e)},pipe(e){return gu(this,e)},readonly(){return Uf(this)},describe(e){let n=this.clone();return it.add(n,{description:e}),n},meta(...e){if(e.length===0)return it.get(this);let n=this.clone();return it.add(n,e[0]),n},isOptional(){return this.safeParse(void 0).success},isNullable(){return this.safeParse(null).success},apply(e,...n){return n.length===0?e(this):e(this,...n)},get"~standard"(){return se.hide(this,"~standard",{...Gr(this),jsonSchema:{input:no(this,"input"),output:no(this,"output")}})},set"~standard"(e){se.own(this,"~standard",e)},parse:function e(n,t){return Qc(this,n,t,{callee:e})},parseAsync:async function e(n,t){return await eu(this,n,t,{callee:e})},safeParse(e,n){return nu(this,e,n)},async safeParseAsync(e,n){return tu(this,e,n)},get spa(){return this?.safeParseAsync},set spa(e){se.own(this,"spa",e)},validate(e,n){return Rr(this,e,n)},validateAsync(e,n){return Fr(this,e,n)},encode:function e(n,t){return ou(this,n,t,{callee:e})},decode:function e(n,t){return ru(this,n,t,{callee:e})},encodeAsync:async function e(n,t){return await iu(this,n,t,{callee:e})},decodeAsync:async function e(n,t){return await su(this,n,t,{callee:e})},safeEncode(e,n){return au(this,e,n)},safeDecode(e,n){return lu(this,e,n)},async safeEncodeAsync(e,n){return cu(this,e,n)},async safeDecodeAsync(e,n){return uu(this,e,n)},toJSONSchema(e){return bc(this,{})(e)},get description(){return it.get(this)?.description},get _def(){return this._zod.def}}),vu=T("_ZodString",(e,n)=>{Fo.init(e,n),Ue.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Cc(e,t,o,r)},se.derived({format:e=>gn(e).format??null,minLength:e=>gn(e).minimum??null,maxLength:e=>gn(e).maximum??null},{regex(...e){return this.check(oi(...e))},includes(...e){return this.check(si(...e))},startsWith(...e){return this.check(ai(...e))},endsWith(...e){return this.check(li(...e))},min(...e){return this.check(xt(...e))},max(...e){return this.check(Jo(...e))},length(...e){return this.check(Ko(...e))},nonempty(...e){return this.check(xt(1,...e))},lowercase(e){return this.check(ri(e))},uppercase(e){return this.check(ii(e))},trim(){return this.check(ui())},normalize(...e){return this.check(ci(...e))},toLowerCase(){return this.check(di())},toUpperCase(){return this.check(pi())},slugify(){return this.check(mi())}})),Em=T("ZodString",(e,n)=>{Fo.init(e,n),vu.init(e,n)},{email(e){return this.check(El($m,e))},url(e){return this.check(Ol(Rm,e))},jwt(e){return this.check(Ql(ef,e))},emoji(e){return this.check(Rl(Fm,e))},guid(e){return this.check(Wl(Om,e))},uuid(e){return this.check(Il(Qo,e))},uuidv4(e){return this.check(Tl(Qo,e))},uuidv6(e){return this.check(Dl(Qo,e))},uuidv7(e){return this.check($l(Qo,e))},nanoid(e){return this.check(Fl(Mm,e))},cuid(e){return this.check(Ml(Bm,e))},cuid2(e){return this.check(Bl(Zm,e))},ulid(e){return this.check(Zl(Lm,e))},base64(e){return this.check(Kl(Xm,e))},base64url(e){return this.check(Xl(Ym,e))},xid(e){return this.check(Ll(qm,e))},ksuid(e){return this.check(ql(Hm,e))},ipv4(e){return this.check(Hl(Vm,e))},ipv6(e){return this.check(Vl(Gm,e))},cidrv4(e){return this.check(Gl(Jm,e))},cidrv6(e){return this.check(Jl(Km,e))},e164(e){return this.check(Yl(Qm,e))},datetime(e){return this.check(ec(Wm,e))},date(e){return this.check(nc(Im,e))},time(e){return this.check(tc(Tm,e))},duration(e){return this.check(oc(Dm,e))}});function te(e){return Al(Em,e)}var Ne=T("ZodStringFormat",(e,n)=>{Se.init(e,n),vu.init(e,n)}),Wm=T("ZodISODateTime",(e,n)=>{Ra.init(e,n),Ne.init(e,n)}),Im=T("ZodISODate",(e,n)=>{Fa.init(e,n),Ne.init(e,n)}),Tm=T("ZodISOTime",(e,n)=>{Ma.init(e,n),Ne.init(e,n)}),Dm=T("ZodISODuration",(e,n)=>{Ba.init(e,n),Ne.init(e,n)}),$m=T("ZodEmail",(e,n)=>{Ca.init(e,n),Ne.init(e,n)});var Om=T("ZodGUID",(e,n)=>{Ua.init(e,n),Ne.init(e,n)});var Qo=T("ZodUUID",(e,n)=>{za.init(e,n),Ne.init(e,n)});var Rm=T("ZodURL",(e,n)=>{Aa.init(e,n),Ne.init(e,n)});var Fm=T("ZodEmoji",(e,n)=>{Ea.init(e,n),Ne.init(e,n)});var Mm=T("ZodNanoID",(e,n)=>{Wa.init(e,n),Ne.init(e,n)});var Bm=T("ZodCUID",(e,n)=>{Ia.init(e,n),Ne.init(e,n)});var Zm=T("ZodCUID2",(e,n)=>{Ta.init(e,n),Ne.init(e,n)});var Lm=T("ZodULID",(e,n)=>{Da.init(e,n),Ne.init(e,n)});var qm=T("ZodXID",(e,n)=>{$a.init(e,n),Ne.init(e,n)});var Hm=T("ZodKSUID",(e,n)=>{Oa.init(e,n),Ne.init(e,n)});var Vm=T("ZodIPv4",(e,n)=>{Za.init(e,n),Ne.init(e,n)});var Gm=T("ZodIPv6",(e,n)=>{qa.init(e,n),Ne.init(e,n)});var Jm=T("ZodCIDRv4",(e,n)=>{Ha.init(e,n),Ne.init(e,n)});var Km=T("ZodCIDRv6",(e,n)=>{Va.init(e,n),Ne.init(e,n)});var Xm=T("ZodBase64",(e,n)=>{Ja.init(e,n),Ne.init(e,n)});var Ym=T("ZodBase64URL",(e,n)=>{Ka.init(e,n),Ne.init(e,n)});var Qm=T("ZodE164",(e,n)=>{Xa.init(e,n),Ne.init(e,n)});var ef=T("ZodJWT",(e,n)=>{Ya.init(e,n),Ne.init(e,n)});var bu=T("ZodNumber",(e,n)=>{Kr.init(e,n),Ue.init(e,n),e._zod.processJSONSchema=(t,o,r)=>jc(e,t,o,r),e.isFinite=!0},se.derived({minValue:e=>{let{minimum:n,exclusiveMinimum:t}=gn(e);return Math.max(n??Number.NEGATIVE_INFINITY,t??Number.NEGATIVE_INFINITY)},maxValue:e=>{let{maximum:n,exclusiveMaximum:t}=gn(e);return Math.min(n??Number.POSITIVE_INFINITY,t??Number.POSITIVE_INFINITY)},isInt:e=>{let{isInt:n,multipleOf:t}=gn(e);return!!n||!!t?.some(Number.isSafeInteger)},format:e=>gn(e).format??null},{gt(e,n){return this.check(Vo(e,n))},gte(e,n){return this.check(Qt(e,n))},min(e,n){return this.check(Qt(e,n))},lt(e,n){return this.check(Ho(e,n))},lte(e,n){return this.check(Yt(e,n))},max(e,n){return this.check(Yt(e,n))},int(e){return this.check(du(e))},safe(e){return this.check(du(e))},positive(e){return this.check(Vo(0,e))},nonnegative(e){return this.check(Qt(0,e))},negative(e){return this.check(Ho(0,e))},nonpositive(e){return this.check(Yt(0,e))},multipleOf(e,n){return this.check(Go(e,n))},step(e,n){return this.check(Go(e,n))},finite(){return this}}));function sn(e){return rc(bu,e)}var nf=T("ZodNumberFormat",(e,n)=>{Qa.init(e,n),bu.init(e,n)});function du(e){return ic(nf,e)}var tf=T("ZodBoolean",(e,n)=>{el.init(e,n),Ue.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Nc(e,t,o,r)});function ve(e){return sc(tf,e)}var of=T("ZodNull",(e,n)=>{nl.init(e,n),Ue.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Ac(e,t,o,r)});function to(e){return ac(of,e)}var rf=T("ZodUnknown",(e,n)=>{tl.init(e,n),Ue.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Wc(e,t,o,r)});function pu(){return lc(rf)}var sf=T("ZodNever",(e,n)=>{ol.init(e,n),Ue.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Ec(e,t,o,r)});function yu(e){return cc(sf,e)}var af=T("ZodArray",(e,n)=>{er(),rl.init(e,n),Ue.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Oc(e,t,o,r),e.element=n.element},{min(e,n){return this.check(xt(e,n))},nonempty(e){return this.check(xt(1,e))},max(e,n){return this.check(Jo(e,n))},length(e,n){return this.check(Ko(e,n))},unwrap(){return this.element}});function Pe(e,n){return uc(af,e,n)}var lf=T("ZodObject",(e,n)=>{er(),al.init(e,n),Ue.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Rc(e,t,o,r),se.installLazyProp(e,"shape",t=>t._zod.def.shape,!1)},{keyof(){return ce(Object.keys(this._zod.def.shape))},catchall(e){return this.clone(se.mergeDefs(this._zod.def,{catchall:e}))},passthrough(){return this.clone(se.mergeDefs(this._zod.def,{catchall:pu()}))},loose(){return this.clone(se.mergeDefs(this._zod.def,{catchall:pu()}))},strict(){return this.clone(se.mergeDefs(this._zod.def,{catchall:yu()}))},strip(){return this.clone(se.mergeDefs(this._zod.def,{catchall:void 0}))},extend(e){return se.extend(this,e)},safeExtend(e){return se.safeExtend(this,e)},merge(e){return se.merge(this,e)},pick(e){return se.pick(this,e)},omit(e){return se.omit(this,e)},partial(...e){return se.partial(xu,this,e[0])},exactPartial(...e){return se.partial(_u,this,e[0],"exactPartial")},required(...e){return se.required(ku,this,e[0])}});function X(e,n){return new lf({type:"object",shape:e,catchall:yu(),...se.normalizeParams(n)})}var wu=T("ZodUnion",(e,n)=>{Xr.init(e,n),Ue.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Fc(e,t,o,r),e.options=n.options});function Pt(e,n){return new wu({type:"union",options:e,...se.normalizeParams(n)})}var cf=T("ZodDiscriminatedUnion",(e,n)=>{wu.init(e,n),ll.init(e,n)});function oo(e,n,t){return new cf({type:"union",options:n,discriminator:e,...se.normalizeParams(t)})}var uf=T("ZodIntersection",(e,n)=>{cl.init(e,n),Ue.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Mc(e,t,o,r)});function df(e,n){return new uf({type:"intersection",left:e,right:n})}var mu=T("ZodRecord",(e,n)=>{er(),ul.init(e,n),Ue.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Bc(e,t,o,r),e.keyType=n.keyType,e.valueType=n.valueType});function Pi(e,n,t){return!n||!n._zod?new mu({type:"record",keyType:te(),valueType:e,...se.normalizeParams(n)}):new mu({type:"record",keyType:e,valueType:n,...se.normalizeParams(t)})}var ki=T("ZodEnum",(e,n)=>{dl.init(e,n),Ue.init(e,n),e._zod.processJSONSchema=(o,r,i)=>Ic(e,o,r,i),e.enum=n.entries,e.options=[...e._zod.values];let t=new Set(Object.keys(n.entries));e.extract=(o,r)=>{let i={};for(let s of o)if(t.has(s))i[s]=n.entries[s];else throw new Error(`Key ${s} not found in enum`);return new ki({...n,checks:[],...se.normalizeParams(r),entries:i})},e.exclude=(o,r)=>{let i={...n.entries};for(let s of o)if(t.has(s))delete i[s];else throw new Error(`Key ${s} not found in enum`);return new ki({...n,checks:[],...se.normalizeParams(r),entries:i})}});function ce(e,n){let t=Array.isArray(e)?Object.fromEntries(e.map(o=>[o,o])):e;return new ki({type:"enum",entries:t,...se.normalizeParams(n)})}var pf=T("ZodLiteral",(e,n)=>{pl.init(e,n),Ue.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Tc(e,t,o,r),e.values=new Set(n.values),Object.defineProperty(e,"value",{get(){if(n.values.length>1)throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");return n.values[0]}})});function ye(e,n){return new pf({type:"literal",values:Array.isArray(e)?e:[e],...se.normalizeParams(n)})}var mf=T("ZodTransform",(e,n)=>{er(),ml.init(e,n),Ue.init(e,n),e._zod.processJSONSchema=(t,o,r)=>$c(e,t,o,r),e._zod.parse=(t,o)=>{if(o.direction==="backward")throw new wt(e.constructor.name);t.addIssue=i=>{if(typeof i=="string")t.issues.push(se.issue(i,t.value,n));else{let s=i;s.fatal&&(s.continue=!1),s.code??(s.code="custom"),"input"in s||(s.input=t.value),s.inst??(s.inst=e),t.issues.push(se.issue(s))}};let r=n.transform(t.value,t);return r instanceof Promise?r.then(i=>(t.value=i,t)):(t.value=r,t)}});function ff(e){return new mf({type:"transform",transform:e})}var xu=T("ZodOptional",(e,n)=>{Yr.init(e,n),Ue.init(e,n),e._zod.processJSONSchema=(t,o,r)=>xi(e,t,o,r),e.unwrap=()=>e._zod.def.innerType});function fu(e){return new xu({type:"optional",innerType:e})}var _u=T("ZodExactOptional",(e,n)=>{fl.init(e,n),Ue.init(e,n),e._zod.processJSONSchema=(t,o,r)=>xi(e,t,o,r),e.unwrap=()=>e._zod.def.innerType});function hf(e){return new _u({type:"optional",innerType:e})}var gf=T("ZodNullable",(e,n)=>{hl.init(e,n),Ue.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Zc(e,t,o,r),e.unwrap=()=>e._zod.def.innerType});function hu(e){return new gf({type:"nullable",innerType:e})}var vf=T("ZodDefault",(e,n)=>{gl.init(e,n),Ue.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Hc(e,t,o,r),e.unwrap=()=>e._zod.def.innerType,e.removeDefault=e.unwrap});function bf(e,n){return new vf({type:"default",innerType:e,get defaultValue(){return typeof n=="function"?n():se.shallowClone(n)}})}var yf=T("ZodPrefault",(e,n)=>{vl.init(e,n),Ue.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Vc(e,t,o,r),e.unwrap=()=>e._zod.def.innerType});function wf(e,n){return new yf({type:"prefault",innerType:e,get defaultValue(){return typeof n=="function"?n():se.shallowClone(n)}})}var ku=T("ZodNonOptional",(e,n)=>{bl.init(e,n),Ue.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Lc(e,t,o,r),e.unwrap=()=>e._zod.def.innerType});function xf(e,n){return new ku({type:"nonoptional",innerType:e,...se.normalizeParams(n)})}var _f=T("ZodCatch",(e,n)=>{yl.init(e,n),Ue.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Gc(e,t,o,r),e.unwrap=()=>e._zod.def.innerType,e.removeCatch=e.unwrap});function kf(e,n){return new _f({type:"catch",innerType:e,catchValue:typeof n=="function"?n:se.constantCatch(n)})}var Pf=T("ZodPipe",(e,n)=>{wl.init(e,n),Ue.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Jc(e,t,o,r),e.in=n.in,e.out=n.out});function gu(e,n){return new Pf({type:"pipe",in:e,out:n})}var Sf=T("ZodReadonly",(e,n)=>{xl.init(e,n),Ue.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Kc(e,t,o,r),e.unwrap=()=>e._zod.def.innerType});function Uf(e){return new Sf({type:"readonly",innerType:e})}var zf=T("ZodLazy",(e,n)=>{_l.init(e,n),Ue.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Xc(e,t,o,r),e.unwrap=()=>e._zod.def.getter()});function Cf(e){return new zf({type:"lazy",getter:e})}var jf=T("ZodCustom",(e,n)=>{kl.init(e,n),Ue.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Dc(e,t,o,r)});function Nf(e,n={}){return dc(jf,e,n)}function Af(e,n){return pc(e,n)}function Pu(e){let n=Cf(()=>Pt([te(e),sn(),ve(),to(),Pe(n),Pi(te(),n)]));return n}var nr=Object.freeze(["panel-open","panel-close","panel-move","page-home","page-settings","page-settings-tab","page-model-tab","page-setup","page-authorization","page-repair","page-session-management","open-native-session","open-feedback","change-listen-mode","change-audio-device","edit-choice","commit-form","activate-control","dismiss","details-toggle","keyboard-navigation","ui-connect","ui-reconnect","ui-status-refresh","ui-request","ui-stream","ui-render-error","ui-action-error","ui-read-recovery","manage-session","start-voice","stop-voice","ui-buffer-overflow","session-history-open","session-history-close","subagent-history-open","subagent-history-close","show-subagents","show-main-sessions","open-native-subagent","new-voice-session","bind-current-session","retry-voice-transcript","bind-existing-session","unbind-existing-session","listen-mode-ptt","listen-mode-always","listen-mode-wake","settings-audio","settings-interaction","settings-prompt","settings-models","settings-advanced","settings-pets"]),Su=64*1024,ro=64,Uu=10080*60*1e3;var Si="whaleConversation",we=(e,n)=>({mode:"strict",typeSymbol:`dsh-fish-voice/conversation#${e}`,create:n}),zi=we("sessionId",()=>te().min(1).max(256)),Ef=we("settingsSessionId",()=>zi.create().nullable()),Iu=new Set(["status","read-settings","listen-mode","complete-setup","set-visibility","inspect-tts","save-tts","preview-tts","cancel-tts","save-models","model-installer","inspect-model-compute","plan-model-install","start-model-install","control-model-install","apply-model-install","pick-local-path","enable","disable","new","resume","read-history","read-audio-devices","save-audio-device","save-settings","capture-bindings","save-bindings","save-voice-prompt","conversation-models","save-conversation-model","inspect-performance","set-performance-mode","read-output-volume","set-output-volume"]),Wf=we("volumeRequest",()=>X({revision:sn().int().nonnegative(),volume:sn().min(0).max(1)})),zu=X({id:te(),role:ce(["user","assistant"]),text:te().max(8e3),state:ce(["reply","interrupted","delivered","speech-requested","speech-failed"]),at:sn()}),If=X({state:ce(["disabled","starting","waiting","listening","paused","error"]),deadlineAt:sn().nonnegative().nullable(),streamOpen:ve(),detection:ce(["asr-after-utterance","acoustic-after-utterance"])}),Tu=te().uuid(),Tf=X({sessionId:zi.create(),items:Pe(X({id:Tu,text:te().max(8e3),state:ce(["busy","ready","sending","uncertain"])})).max(8)}),Df=we("snapshot",()=>X({revision:sn().int().nonnegative(),historyGeneration:sn().int().nonnegative().optional(),rootSessionId:te().nullable(),title:to(),latest:zu.nullable(),items:Pe(zu).max(40),inputActive:ve(),inputError:ce(["device","recognition","no-speech"]).nullable().optional(),providerError:te().max(480).optional(),retryTranscripts:Tf.nullable().optional(),playbackConfirmed:ye(!1),wake:If.optional(),helper:X({online:ve(),listenMode:ce(["ptt","always","wake"]).nullable()}).refine(e=>e.online||e.listenMode===null).optional()})),$f=we("volume",()=>X({supported:ve(),backend:ye("dsh-speak").nullable(),volume:sn().min(0).max(1).nullable(),revision:sn().int().nullable(),apply:ye("next-output").nullable(),reason:te().nullable()})),Y=te().max(4096),Le=sn().int().nonnegative().max(Number.MAX_SAFE_INTEGER),Of=X({code:te().max(64),message:te().max(512)}),Cu=X({available:ve(),reason:Y.nullable(),runtimeLoaded:ye(!1),backend:Y.optional(),provider:Y.optional(),device:Y.optional(),computeType:Y.optional(),supportedComputeTypes:Pe(Y).max(32).optional(),deviceCount:Le.optional(),deviceIndex:Le.optional(),validation:Y.optional(),note:Y.optional(),providerAdvertised:ve().optional()}),Rf=X({schema:ye(1),default:ye("cpu"),observedAt:Y.nullable(),reason:Y.optional(),backends:X({sensevoice:X({cpu:Cu,cuda:Cu}).optional()})}),Ff=X({observedAt:Y,scope:ye("plugin-host"),platform:Y,arch:Y,cpuLogicalCores:Le.nullable(),totalMemoryBytes:Le.nullable(),availableMemoryBytes:Le.nullable(),gpuMemoryBytes:Le.nullable(),gpuMemoryReason:Y,gpuSource:ye("dxgi").nullable().optional(),gpuAdapters:Pe(X({name:te().min(1).max(256),dedicatedVideoMemoryBytes:Le,sharedSystemMemoryBytes:Le})).max(32).optional()}),Mf=X({modelId:Y,confidence:ce(["not-assessed","unknown","heuristic-only"]),recommended:ve(),badge:Y.nullable(),state:ce(["manual-choice","unknown","recommended-pending-runtime-validation","limited-memory","busy-memory","recommended-lightweight"]),reason:Y,policy:Y.optional(),runtimeValidated:ye(!1).optional(),gpuValidated:ye(!1).optional()}),Bf=X({release:Y,source:Y,sources:Pe(Y).max(16).optional(),redirectHost:Y,platform:Y,arch:Y,executable:Y,licenseUrls:Pe(Y).max(20)}),Zf=X({jobId:Y,modelId:Y,status:ce(["waiting","verifying","applied","blocked","paused","cancelled"]),reason:Y.nullable()}),Lf=X({id:Y,runtime:Bf.nullable().optional(),purpose:ce(["tts","asr"]).optional(),computeOptions:Pe(ce(["cpu","auto","cuda","vulkan"])).max(4).optional(),recommendation:Mf,title:Y,backend:Y.nullable(),available:ve(),reason:Y.nullable(),totalBytes:Le.nullable(),source:Y.nullable(),licenseUrls:Pe(Y).max(20),licenseNote:Y.nullable(),verification:Y.optional(),runtimeLoaded:ye(!1)}),qf=X({id:te().uuid(),modelId:Y,compute:ce(["cpu","auto","cuda","vulkan"]),status:ce(["queued","running","paused","failed","cancelled","installed"]),stage:ce(["queued","running","paused","failed","cancelled","installed","checking-runtime","verifying-local","downloading","verifying","installing"]),createdAt:Y,updatedAt:Y,totalBytes:Le,receivedBytes:Le,runtimeLoaded:ye(!1),error:Of.nullable(),currentFile:Y.nullable().optional(),files:Pe(X({name:Y,bytes:Le,receivedBytes:Le,verified:ve(),reused:ve().optional()})).max(200),installedPath:Y.optional(),sourceDirectory:Y.optional(),modelVariant:ce(["q4_k_m","q8_0"]).optional(),reused:ye(!0).optional(),reusedBytes:Le.optional(),purpose:ce(["tts","asr"]).optional(),recommendedSettings:Pt([X({tts:X({provider:ye("local"),localModelId:Y,localModelPath:Y})}),X({asr:ye("sensevoice"),models:X({sensevoiceDir:Y.optional()}),modelCompute:ce(["cpu","auto","cuda"])})]).optional()}),Hf=we("modelSnapshot",()=>X({schema:ye(1),hardware:Ff,compute:Rf,refresh:X({pending:ve(),observedAt:te().max(64).nullable(),attemptedAt:te().max(64).nullable(),error:te().max(512).nullable(),intervalMs:ye(3e5)}).optional(),models:Pe(Lf).max(32),jobs:Pe(qf).max(1e3),ttsInstallIntent:Zf.nullable().optional()})),Vf=we("authorizationRequest",()=>X({revision:te().min(1).max(256),grant:ve()})),Gf=we("senseVoiceAsrRequest",()=>oo("operation",[X({operation:ye("status")}),X({operation:ye("retry")})])),Jf={state:ce(["idle","downloading","ready","error"]),receivedBytes:Le,totalBytes:Le},Kf=we("senseVoiceAsrResult",()=>X({...Jf,selected:ve(),message:te().max(512).nullable()})),ju=we("authorization",()=>X({schema:ye(1),revision:te().min(1).max(256),completed:ve(),granted:ve(),usageAgreement:X({version:ye(1),accepted:ve(),text:Pe(Y).max(16)}).optional(),modelSourcesChanged:ve().optional(),blockedOperations:Pe(Y).max(32),revocationUnconfirmed:ve(),scopes:Pe(X({id:Y,title:Y,description:Y,allowed:ve()})).max(16),modelSources:Pe(X({modelId:Y,source:Y,licenseUrls:Pe(Y).max(20),licenseNote:Y,runtime:X({source:Y,sources:Pe(Y).max(16).optional(),licenseUrls:Pe(Y).max(20),redirectHost:Y.nullable()}).optional()})).max(32),restrictions:Pe(Y).max(16)})),Xf=we("setup",()=>X({version:ye(1),completed:ve()})),an=te().min(1).max(256),De=te().min(1).max(256),Nu=ce(["cpu","auto","cuda","vulkan"]),Au={sourceDirectory:te().min(1).max(4096).optional(),modelVariant:ce(["q4_k_m","q8_0"]).optional()},tr=Pi(te(),Pu()),Yf=X({provider:ce(["edge","deepseek","local"]),edgeVoice:te().min(1).max(64),systemVoice:te().max(256).nullable(),systemFallback:ve(),edgeTextTransmissionAccepted:ve(),volume:sn().min(0).max(1),localModelId:te().max(128).nullable(),localModelPath:te().max(4096).nullable(),referenceAudioPath:te().max(4096).nullable(),referenceAudioAccepted:ve(),deepseekVoice:ce(["stella","tide"]).optional(),deepseekTextTransmissionAccepted:ve().optional()}),Qf=X({backend:ce(["winmm","portaudio"]),id:te().min(1).max(1024),name:te().min(1).max(256)}).nullable(),eh={"read-history":{cursor:te().max(128).optional()},"read-audio-devices":{},"save-audio-device":{revision:an,direction:ce(["input","output"]),selection:Qf},"agent-permissions":{},"save-agent-permissions":{revision:an,allowed:X({"set-performance-mode":ve(),"set-visibility":ve(),"set-output-volume":ve()})},"agent-requests":{},"decide-agent-request":{id:De,approve:ve(),acknowledgements:Pe(te().max(80)).max(10)},"model-installer":{},"inspect-model-compute":{},"plan-model-install":{modelId:De,compute:Nu,...Au},"start-model-install":{modelId:De,compute:Nu,...Au,planHash:an,accepted:ye(!0),useWhenReady:ve().optional()},"control-model-install":{id:De,operation:ce(["pause","resume","cancel"])},"apply-model-install":{id:De,revision:an},status:{},enable:{expectedOwnerSessionId:De.nullable().optional(),expectedExistingSessionId:De.nullable().optional()},disable:{},"read-settings":{},new:{expectedOwnerSessionId:De.nullable().optional()},"inspect-performance":{},"set-performance-mode":{revision:an,performanceMode:ce(["fast","balanced","high","compatibility"])},"inspect-tts":{},"save-tts":{revision:an,values:tr},"complete-setup":{revision:an},"preview-tts":{revision:an.optional(),values:Yf.optional()},"cancel-tts":{},list:{cursor:te().max(2048).optional()},resume:{id:De},"listen-mode":{mode:ce(["ptt","always","wake"])},"set-visibility":{revision:an,visibility:ce(["hidden","workspace"])},"pick-local-path":{kind:ce(["referenceAudio","sensevoiceDir","campplus","sourceDirectory"])},"capture-bindings":{operation:ce(["begin","end"]),token:De.optional(),inactive:ve().optional()},"save-bindings":{revision:an,values:tr,bindingContext:X({ownerSessionId:De.nullable(),epoch:De.nullable(),rootSessionId:De.nullable()})},"save-voice-prompt":{revision:an,values:X({text:te().max(32768)})},"conversation-models":{},"save-conversation-model":{revision:an,values:X({mode:ce(["auto","manual"]),provider:te().min(1).max(256).nullable(),model:te().min(1).max(256).nullable()})},"save-settings":{revision:an,values:tr},"save-models":{revision:an,values:tr}},nh=we("uiActionRequest",()=>oo("action",Object.entries(eh).map(([e,n])=>X({action:ye(e),...n}))).refine(e=>e.action!=="preview-tts"||Object.hasOwn(e,"revision")===Object.hasOwn(e,"values"),"\u8349\u7A3F\u8BD5\u542C\u5FC5\u987B\u540C\u65F6\u63D0\u4F9B\u914D\u7F6E\u7248\u672C\u548C\u8BBE\u7F6E").refine(e=>JSON.stringify(e).length<=(e.action==="save-voice-prompt"?2e5:8192),"\u64CD\u4F5C\u6570\u636E\u8FC7\u957F")),Eu=we("uiActionResult",()=>te().max(4*1024*1024)),th=we("sessionManagementRequest",()=>oo("operation",[X({operation:ye("list"),rootId:De.optional(),cursor:te().max(2048).optional()}),X({operation:ye("unhide"),rootId:De,id:De}),X({operation:ye("restore"),rootId:De,id:De})])),oh=we("presentation",()=>X({shown:Pe(Pt([X({id:De,parentId:to(),mode:to()}),X({id:De,parentId:De,mode:ce(["one-shot","continuable","unknown"])})]))})),Ui=te().min(1).max(128),rh=we("updateRequest",()=>oo("action",[X({action:ye("check")}),X({action:ye("install"),version:Ui})])),Wu=we("updateSnapshot",()=>X({schema:ye(1),revision:sn().int().nonnegative().optional(),currentVersion:Ui,channel:ce(["stable","preview"]),status:ce(["idle","checking","current","available","incompatible","installing","restart-required","enable-required","installed","error","unsupported"]),checkedAt:te().max(64).nullable(),release:X({version:Ui,announcement:te().min(1).max(600),url:te().startsWith("https://github.com/Emikosama/dsh-fish-voice/releases/tag/v").max(256)}).nullable(),message:te().max(512).nullable(),canInstall:ve()})),or=zi.create(),io=X({sessionId:or,title:te().max(256).nullable(),availability:ce(["ready","busy","unavailable","archived"]),unavailableReason:ce(["managed","subagent"]).optional(),updatedAt:sn().int().nonnegative().max(864e13).nullable().optional()}),Du=te().min(1).max(512),ih=we("listExistingSessionsRequest",()=>Pt([X({sessionId:or}),X({query:te().max(128).optional(),cursor:Du.optional()})])),sh=we("listExistingSessionsResult",()=>X({items:Pe(io).max(100),nextCursor:Du.nullable(),binding:io.nullable()})),ah=we("setExistingSessionRequest",()=>X({sessionId:or.nullable(),expectedSessionId:or.nullable()})),lh=we("setExistingSessionResult",()=>X({binding:io.nullable()})),$u=te().min(1).max(160).regex(/^[A-Za-z0-9_-]+$/),ch=we("operationLogPageRequest",()=>X({cursor:$u.optional()})),uh=we("operationLogPage",()=>X({text:te().max(Su),nextCursor:$u.nullable()})),Ou=te().uuid(),dh=we("operationScopeResult",()=>X({scope:Ou})),ph=we("recordOperationRequest",()=>X({scope:Ou,events:Pe(X({id:te().uuid(),at:Le,action:ce(nr),source:ce(["user","ui"]),phase:ce(["requested","finished"]).optional(),result:ce(["ok","failed","cancelled"]).optional(),count:Le.positive().optional()}).refine(e=>e.action==="ui-buffer-overflow"?e.source==="ui"&&e.count!==void 0:e.count===void 0)).min(1).max(ro)})),mh=we("recordOperationResult",()=>X({accepted:ve()})),fh=we("retryVoiceTranscriptRequest",()=>X({id:Tu})),hh=we("retryVoiceTranscriptResult",()=>X({accepted:ve()})),gh={retryVoiceTranscript:fh,recordClientOperations:ph,readOperationLog:ch,action:nh,saveAuthorization:Vf,manageSessions:th,senseVoiceAsrAction:Gf,updateAction:rh,listExistingVoiceSessions:ih,setExistingVoiceSession:ah},vh={readClientOperationScope:dh,recordClientOperations:mh,readOperationLog:uh,action:Eu,manageSessions:Eu,readAuthorization:ju,saveAuthorization:ju,senseVoiceAsrAction:Kf,readSetup:Xf,followPresentation:oh,followModels:Hf,followUpdates:Wu,updateAction:Wu,listExistingVoiceSessions:sh,setExistingVoiceSession:lh,retryVoiceTranscript:hh},Fe=(e,n,t=!1)=>({id:`dsh-fish-voice#${Si}/${e}`,service:Si,namespace:Si,method:e,invocation:{kind:"direct"},...t?{mode:"stream"}:{},parameters:n.map(o=>({name:o,wire:o,source:"json",codec:o==="sessionId"?Ef:gh[e]??Wf})),cancellation:{parameter:"signal"},result:vh[e]??(t?Df:$f)}),Ru={package:"dsh-fish-voice/conversation",descriptors:[Fe("action",["sessionId","request"]),Fe("follow",["sessionId"],!0),Fe("followModels",["sessionId"],!0),Fe("followPresentation",[],!0),Fe("followUpdates",[],!0),Fe("updateAction",["request"]),Fe("readSetup",[]),Fe("readAuthorization",[]),Fe("saveAuthorization",["request"]),Fe("senseVoiceAsrAction",["request"]),Fe("manageSessions",["sessionId","request"]),Fe("readClientOperationScope",[]),Fe("recordClientOperations",["request"]),Fe("readOperationLog",["request"]),Fe("listExistingVoiceSessions",["request"]),Fe("setExistingVoiceSession",["request"]),Fe("retryVoiceTranscript",["request"]),Fe("readVolume",["sessionId"]),Fe("setVolume",["sessionId","request"])]};var Me=e=>e!==null&&typeof e=="object"&&!Array.isArray(e),Je=(e,n=1024)=>typeof e=="string"&&e.length<=n,Jn=e=>typeof e=="number"&&Number.isFinite(e),Oe=e=>typeof e=="boolean",Fu=e=>{if(!Je(e,4096))return!1;try{let n=new URL(e);return["https:","http:"].includes(n.protocol)&&!n.username&&!n.password}catch{return!1}},vn=(e,n=4096)=>e==null||Je(e,n),Kn=e=>Je(e,256)&&e.length>0,ze=()=>{throw new Error("\u914D\u7F6E\u63A5\u53E3\u8FD4\u56DE\u4E86\u65E0\u6548\u6570\u636E\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6")};function Ci(e){if(e.onboarding!==void 0&&(!Me(e.onboarding)||e.onboarding.version!==1||!Oe(e.onboarding.completed))&&ze(),e.ttsSetup!==void 0){let n=e.ttsSetup;(!Me(n)||!["unconfigured","edge","deepseek","system","local","off"].includes(n.provider)||!Je(n.edgeVoice,128)||!(n.systemVoice===null||Je(n.systemVoice,512))||!Oe(n.systemFallback)||!Oe(n.edgeTextTransmissionAccepted)||!Jn(n.volume)||n.volume<0||n.volume>1||!(n.localModelId==null||Kn(n.localModelId))||!vn(n.localModelPath)||!vn(n.referenceAudioPath)||!(n.referenceAudioAccepted===void 0||Oe(n.referenceAudioAccepted)))&&ze(),(n.deepseekVoice!==void 0&&!["stella","tide"].includes(n.deepseekVoice)||n.deepseekTextTransmissionAccepted!==void 0&&!Oe(n.deepseekTextTransmissionAccepted)||n.provider==="deepseek"&&(n.deepseekVoice===void 0||n.deepseekTextTransmissionAccepted!==!0))&&ze()}if(e.ttsRuntime?.localComputeBackend!=null&&(!["cpu","vulkan","cuda","hip"].includes(e.ttsRuntime.localComputeBackend)||!Oe(e.ttsRuntime.localComputeVerified)||!Oe(e.ttsRuntime.localComputeFallback))&&ze(),e.ttsRuntime?.localTimings!=null){let n=e.ttsRuntime.localTimings;(!Me(n)||typeof n.modelResident!="boolean"||["preparationMs","deviceSelectionMs","synthesisMs","playbackMs","totalMs","chunks"].some(t=>!Number.isSafeInteger(n[t])||n[t]<0)||n.chunks<1||n.chunks>4e3)&&ze()}return e.ttsRuntime!=null&&(!Me(e.ttsRuntime)||!Je(e.ttsRuntime.state,64)||!Oe(e.ttsRuntime.busy)||!Oe(e.ttsRuntime.blocked))&&ze(),e}function Bu(e,n){if(Me(n)||ze(),e==="setup-status"&&(Object.keys(n).some(t=>!["version","completed"].includes(t))||n.version!==1||!Oe(n.completed))&&ze(),e==="inspect-tts"&&(n.deepseekKeyAvailable!==void 0&&!Oe(n.deepseekKeyAvailable)&&ze(),(!Je(n.platform,32)||!Oe(n.playbackSupported)||!Oe(n.systemSupported)||!Oe(n.edgePlaybackSupported)||!["installed","missing","unchecked"].includes(n.edgeDependency)||n.autoDownload!==!1||!Oe(n.gpuSupported)||n.edgeOfficialApi!==!1||n.edgeRecipient!=="Microsoft"||n.edgePurpose!=="speech-synthesis"||!Array.isArray(n.installedChineseVoices)||n.installedChineseVoices.length>512||n.installedChineseVoices.some(t=>!Me(t)||!Je(t.id,512)||!Je(t.name,512)||!Je(t.culture,64)))&&ze()),e==="preview-tts"){let t=n.playbackCompleted===!0&&n.textOnly===void 0,o=n.provider==="edge"&&n.playbackCompleted===!1&&n.textOnly===!0&&Je(n.reason,128);(!["edge","deepseek","local"].includes(n.provider)||n.fallback!==!1||n.acousticConfirmation!==!1||!t&&!o)&&ze()}if(e==="cancel-tts"&&!["idle","cancelled","unconfirmed"].includes(n.status)&&ze(),e==="model-installer"){if((n.schema!==1||!Array.isArray(n.models)||n.models.length>100||!Array.isArray(n.jobs)||n.jobs.length>1e3||!Me(n.hardware)||!Me(n.compute))&&ze(),n.refresh!=null){let t=n.refresh;(!Me(t)||!Oe(t.pending)||!vn(t.observedAt,64)||!vn(t.attemptedAt,64)||!vn(t.error,512)||!(t.intervalMs===void 0||Jn(t.intervalMs)&&t.intervalMs>0&&t.intervalMs<=36e5))&&ze()}for(let t of n.models)(!Me(t)||!Kn(t.id)||!Oe(t.available)||t.runtimeLoaded!==!1||!vn(t.title)||!vn(t.reason)||!(t.totalBytes==null||Jn(t.totalBytes)&&t.totalBytes>=0))&&ze(),t.recommendation!=null&&(!Me(t.recommendation)||!Oe(t.recommendation.recommended)||!vn(t.recommendation.reason))&&ze();for(let t of n.jobs)Mu(t);if(n.ttsInstallIntent!=null){let t=n.ttsInstallIntent;(!Me(t)||!Kn(t.jobId)||!Kn(t.modelId)||!["waiting","verifying","applied","blocked","paused","cancelled"].includes(t.status)||!vn(t.reason))&&ze()}}return e==="inspect-model-compute"&&!Me(n.compute)&&!Me(n.backends)&&ze(),e==="plan-model-install"&&(n.reused!==void 0&&(!Oe(n.reused)||n.reused!==!0||!Je(n.sourceDirectory,4096)||!n.sourceDirectory||!["q4_k_m","q8_0"].includes(n.modelVariant)||!Jn(n.reusedBytes)||n.reusedBytes<0)&&ze(),n.reused!==!0&&(n.sourceDirectory!==void 0||n.modelVariant!==void 0||n.reusedBytes!==void 0)&&ze(),Array.isArray(n.files)&&n.files.some(t=>Me(t)&&t.reused!==void 0&&!Oe(t.reused))&&ze(),(!Kn(n.modelId)||!["cpu","auto","cuda","vulkan"].includes(n.compute)||!Je(n.planHash,128)||!Array.isArray(n.files)||n.files.length>200||!Jn(n.totalBytes)||n.totalBytes<0||!Je(n.destination,4096)||!Array.isArray(n.licenseUrls)||n.licenseUrls.some(t=>!Fu(t))||!vn(n.source)||!vn(n.notice)||!vn(n.licenseNote)||n.files.some(t=>!Me(t)||!Kn(t.name)||!Jn(t.bytes)||t.bytes<0||!Je(t.sha256,64)||!/^[a-f0-9]{64}$/i.test(t.sha256)||!Fu(t.url)))&&ze()),["start-model-install","control-model-install"].includes(e)&&Mu(n),Ci(n)}function Mu(e){Me(e)&&e.error!=null&&(!Me(e.error)||!Je(e.error.message,512))&&ze(),(!Me(e)||!Kn(e.id)||!Kn(e.modelId)||!["cpu","auto","cuda","vulkan"].includes(e.compute)||!["queued","running","paused","failed","cancelled","installed"].includes(e.status)||!Je(e.stage,128)||!Jn(e.receivedBytes)||e.receivedBytes<0||!(e.totalBytes===null||Jn(e.totalBytes)&&e.totalBytes>=0)||e.runtimeLoaded!==!1)&&ze()}function $n(e,n){let t=i=>i!==null&&typeof i=="object"&&!Array.isArray(i),o=i=>typeof i=="string"&&i.length>0&&i.length<=256,r=i=>i===null||t(i)&&Object.keys(i).sort().join(",")==="code,modifiers"&&typeof i.code=="string"&&/^(F([1-9]|1[0-9]|2[0-4])|Key[A-Z]|Digit[0-9]|Space)$/.test(i.code)&&Array.isArray(i.modifiers)&&i.modifiers.length<=3&&new Set(i.modifiers).size===i.modifiers.length&&i.modifiers.every(s=>["Control","Alt","Shift"].includes(s))&&!(i.code==="F4"&&i.modifiers.includes("Alt"));if(!t(n))throw new Error("Fish Voice UI returned invalid data");if(n.wake!==void 0&&!(n.wake===null&&e!=="conversation")&&!Xi(n.wake))throw new Error("Invalid wake state");if(n.listenMode!==void 0&&n.listenMode!==null&&!mt.includes(n.listenMode))throw new Error("Invalid listening mode");if(["status","enable","disable","new","resume","listen-mode"].includes(e)){if(!(n.ownerSessionId===null||o(n.ownerSessionId))||typeof n.enabled!="boolean"||!t(n.helper)||typeof n.helper.online!="boolean")throw new Error("Fish Voice UI returned an invalid status");if(n.existingVoiceSessionSupported!==void 0&&typeof n.existingVoiceSessionSupported!="boolean")throw new Error("Invalid existing session support");if(n.existingVoiceSession!=null&&!io.safeParse(n.existingVoiceSession).success)throw new Error("Invalid existing voice session");if(n.helper.lastError!=null&&(typeof n.helper.lastError!="string"||n.helper.lastError.length>512))throw new Error("Invalid audio diagnostic")}else if(["save-voice-prompt","save-conversation-model","save-bindings","read-settings","save-settings","save-audio-device","save-models","set-visibility","set-performance-mode","save-tts","complete-setup","apply-model-install"].includes(e)){if(n.bindingContext!==void 0&&(!t(n.bindingContext)||["ownerSessionId","epoch","rootSessionId"].some(s=>n.bindingContext[s]!==null&&!o(n.bindingContext[s]))))throw new Error("Invalid binding context");let i=n.values;if(typeof n.revision!="string"||!n.revision||!t(i)||![0,1,2].includes(i.pttMouse)||!t(i.speakerVerification)||typeof i.speakerVerification.enabled!="boolean"||!(Mt(i.device)||typeof i.device=="string"&&i.device.length<=256&&!/[\u0000-\u001f\u007f]/.test(i.device)||Number.isSafeInteger(i.device)&&i.device>=0))throw new Error("Fish Voice UI returned invalid settings");if(i.wakeWordAliases!==void 0&&!_o(i.wakeWordAliases))throw new Error("Invalid wake aliases");if(i.wakeListenTimeoutMs!==void 0&&(!Number.isInteger(i.wakeListenTimeoutMs)||i.wakeListenTimeoutMs<3e3||i.wakeListenTimeoutMs>3e4))throw new Error("Invalid wake timeout");if(i.semanticExperimental!==void 0&&typeof i.semanticExperimental!="boolean")throw new Error("Invalid experimental wake setting");if(i.pttKeyboard!==void 0&&!r(i.pttKeyboard))throw new Error("Invalid keyboard binding");if(n.capabilities?.pttKeyboard!==void 0){let s=n.capabilities.pttKeyboard;if(!t(s)||typeof s.supported!="boolean"||s.scope!=="global"||s.platform!=="win32"||!["available","unsupported"].includes(s.status)||!(s.reason==null||typeof s.reason=="string")||s.supported!==(s.status==="available"))throw new Error("Invalid keyboard capability")}if(n.modelSetup!==void 0&&(!t(n.modelSetup)||n.modelSetup.asr!=="sensevoice"||!t(n.modelSetup.models)||n.modelSetup.modelCompute!==void 0&&!["cpu","auto","cuda"].includes(n.modelSetup.modelCompute)||["sensevoiceDir","campplus"].some(s=>typeof n.modelSetup.models[s]!="string")))throw new Error("Fish Voice UI returned invalid model configuration");if(n.capabilities?.turnSignals===!0){let s=i.turnSignals;if(!t(s)||typeof s.enabled!="boolean"||typeof s.headphonesConfirmed!="boolean"||typeof s.experimentalAutomaticBargeIn!="boolean"||typeof s.volume!="number"||!Number.isFinite(s.volume)||s.volume<0||s.volume>1)throw new Error("Fish Voice UI returned invalid turn sound settings")}}else if(e==="list"&&(!Array.isArray(n.items)||n.items.length>50||!(n.nextCursor==null||typeof n.nextCursor=="string"&&n.nextCursor.length<=2048)||n.items.some(i=>!t(i)||!o(i.id)||typeof i.archived!="boolean"||typeof i.available!="boolean"||typeof i.canResume!="boolean"||i.title!==void 0&&typeof i.title!="string"||i.reason!==void 0&&typeof i.reason!="string")))throw new Error("Fish Voice UI returned invalid voice history");if(n.voicePrompt!==void 0){let i=n.voicePrompt;if(!t(i)||typeof i.text!="string"||i.text.length>32768||!["agents","custom"].includes(i.mode)||typeof i.customSupported!="boolean"||!(i.unsupportedReason===null||typeof i.unsupportedReason=="string"&&i.unsupportedReason.length<=512)||i.mode==="custom"&&(!i.text.trim()||!i.customSupported)||i.mode==="agents"&&i.customSupported&&i.text.trim())throw new Error("Invalid voice prompt preference")}if(n.conversationModel!==void 0&&(!t(n.conversationModel)||!["auto","manual"].includes(n.conversationModel.mode)||![n.conversationModel.provider,n.conversationModel.model].every(i=>i===null||o(i))||n.conversationModel.mode==="auto"&&(n.conversationModel.provider!==null||n.conversationModel.model!==null)))throw new Error("Invalid conversation model preference");if(e==="conversation-models"&&(!Array.isArray(n.providers)||n.providers.length>256||new Set(n.providers.map(i=>i?.id)).size!==n.providers.length||n.providers.some(i=>!t(i)||!o(i.id)||!o(i.name)||!Array.isArray(i.models)||i.models.length>2048||new Set(i.models.map(s=>s?.id)).size!==i.models.length||i.models.some(s=>!t(s)||!o(s.id)||!o(s.name)))))throw new Error("Invalid conversation model catalog");if(e==="read-audio-devices"&&!Ji(n))throw new Error("Invalid audio device inventory");if(n.audioDevices!==void 0&&(!t(n.audioDevices)||!Mt(n.audioDevices.output)||!(Mt(n.audioDevices.input)||typeof n.audioDevices.input=="string"||Number.isSafeInteger(n.audioDevices.input))))throw new Error("Invalid audio device preferences");if(e==="inspect-performance"&&(!Array.isArray(n.modes)||n.modes.some(i=>!t(i)||!["fast","balanced","high"].includes(i.performanceMode)||typeof i.available!="boolean")))throw new Error("Invalid performance capabilities");if(e==="read-history"&&(!(n.rootSessionId===null||o(n.rootSessionId))||!Number.isSafeInteger(n.generation)||n.generation<0||!Number.isSafeInteger(n.revision)||n.revision<0||!["voice-session","current-voice-session"].includes(n.scope)||typeof n.truncated!="boolean"||!(n.nextCursor===null||typeof n.nextCursor=="string"&&/^\d+:\d+$/.test(n.nextCursor))||!Array.isArray(n.items)||n.items.length>100||new Set(n.items.map(i=>i?.id)).size!==n.items.length||n.items.some(i=>!t(i)||!o(i.id)||!["user","assistant"].includes(i.role)||typeof i.text!="string"||i.text.length>8e3||!["reply","interrupted","delivered","speech-requested","speech-failed"].includes(i.state)||!Number.isFinite(i.at))))throw new Error("Invalid conversation history");if(e==="conversation"){if(n.helper!==void 0&&(!t(n.helper)||typeof n.helper.online!="boolean"||!(n.helper.listenMode===null||mt.includes(n.helper.listenMode))||!n.helper.online&&n.helper.listenMode!==null))throw new Error("Invalid conversation helper state");if(n.inputError!=null&&!["device","recognition","no-speech"].includes(n.inputError))throw new Error("Invalid input error");if(n.providerError!==void 0&&(typeof n.providerError!="string"||n.providerError.length>480))throw new Error("Invalid provider error");if(!Number.isSafeInteger(n.revision)||n.revision<0||n.title!==null||!(n.rootSessionId===null||o(n.rootSessionId))||!Array.isArray(n.items)||n.items.length>40||typeof n.inputActive!="boolean"||n.playbackConfirmed!==!1||n.items.some(i=>!t(i)||!o(i.id)||!["user","assistant"].includes(i.role)||typeof i.text!="string"||i.text.length>8e3||!["reply","interrupted","delivered","speech-requested","speech-failed"].includes(i.state)||!Number.isFinite(i.at))||n.latest!==null&&(!t(n.latest)||!n.items.some(i=>i.id===n.latest.id&&i.text===n.latest.text&&i.role==="assistant")))throw new Error("Invalid conversation snapshot")}if(e==="output-volume"&&(typeof n.supported!="boolean"||n.supported&&(typeof n.volume!="number"||!Number.isFinite(n.volume)||n.volume<0||n.volume>1||n.revision==null)))throw new Error("Invalid output volume snapshot");if(["agent-permissions","save-agent-permissions"].includes(e)){let i=["set-performance-mode","set-visibility","set-output-volume"];if(n.schema!==1||!o(n.revision)||!Array.isArray(n.items)||n.items.length!==3||new Set(n.items.map(s=>s?.operation)).size!==3||n.items.some(s=>!t(s)||!i.includes(s.operation)||typeof s.allowed!="boolean"||typeof s.title!="string"||s.title.length>128||!(s.reason===null||typeof s.reason=="string"&&s.reason.length<=1024)))throw new Error("Invalid agent permissions")}if(["agent-requests","decide-agent-request"].includes(e)){let i=s=>t(s)&&o(s.id)&&o(s.sourceSessionId)&&o(s.operation)&&typeof s.title=="string"&&s.title.length<=128&&["pending","executing","completed","blocked","unknown","superseded","expired","cancelled","rejected"].includes(s.state)&&Number.isFinite(s.createdAt)&&Number.isFinite(s.expiresAt)&&Number.isSafeInteger(s.humanRevision)&&t(s.request)&&t(s.before)&&Array.isArray(s.acknowledgements)&&s.acknowledgements.length<=10&&s.acknowledgements.every(c=>t(c)&&o(c.id)&&typeof c.text=="string"&&c.text.length<=1024)&&(s.error===null||t(s.error)&&typeof s.error.code=="string"&&typeof s.error.message=="string"&&s.error.message.length<=1024)&&(s.nextAction===null||typeof s.nextAction=="string"&&s.nextAction.length<=1024);if(n.schema!==1||!Number.isSafeInteger(n.humanRevision)||n.humanRevision<0||!Array.isArray(n.items)||n.items.length>100||n.items.some(s=>!i(s))||e==="decide-agent-request"&&(!i(n.lastOutcome)||!n.items.some(s=>s.id===n.lastOutcome.id&&s.state===n.lastOutcome.state)))throw new Error("Invalid agent request snapshot")}if(e==="authorization"){if(n.usageAgreement!==void 0&&(!t(n.usageAgreement)||n.usageAgreement.version!==1||typeof n.usageAgreement.accepted!="boolean"||!Array.isArray(n.usageAgreement.text)||n.usageAgreement.text.length>16||n.usageAgreement.text.some(i=>typeof i!="string"||i.length>4096)))throw new Error("Invalid usage agreement snapshot");if(n.schema!==1||!o(n.revision)||!Array.isArray(n.blockedOperations)||n.blockedOperations.some(i=>typeof i!="string")||typeof n.revocationUnconfirmed!="boolean"||typeof n.completed!="boolean"||typeof n.granted!="boolean"||!Array.isArray(n.scopes)||n.scopes.length>16||new Set(n.scopes.map(i=>i?.id)).size!==n.scopes.length||n.scopes.some(i=>!t(i)||!o(i.id)||typeof i.title!="string"||typeof i.description!="string"||typeof i.allowed!="boolean")||!Array.isArray(n.modelSources)||n.modelSources.length>32||n.modelSources.some(i=>!t(i)||!o(i.modelId)||typeof i.source!="string"||!Array.isArray(i.licenseUrls)||i.licenseUrls.some(s=>typeof s!="string")||typeof i.licenseNote!="string")||!Array.isArray(n.restrictions)||n.restrictions.some(i=>typeof i!="string"))throw new Error("Invalid authorization snapshot")}if(n.inferenceCompute!=null){let i=n.inferenceCompute;if(!t(i)||!["cpu","auto","cuda"].includes(i.requested)||![null,"cpu","cuda"].includes(i.actual)||i.engine!=="sensevoice"||!(i.computeType===null||["int8","float16","int8_float16","int8_float32","float32"].includes(i.computeType))||!(i.deviceIndex===null||Number.isSafeInteger(i.deviceIndex)&&i.deviceIndex>=0&&i.deviceIndex<8)||![null,"gpu-unavailable","gpu-load-failed","gpu-inference-failed","model-gpu-unverified"].includes(i.fallbackReason)||typeof i.validated!="boolean")throw new Error("Invalid inference compute status")}if(n.inputDevices!==void 0&&!Qi(n.inputDevices))throw new Error("Invalid input device inventory");if(n.ptt?.keyboard!==void 0&&n.ptt.keyboard!==null){let i=n.ptt.keyboard;if(!t(i)||typeof i.supported!="boolean"||i.scope!=="global"||!["unsupported","active","inactive","unknown"].includes(i.status)||typeof i.hookInstalled!="boolean"||typeof i.recording!="boolean"||!(i.observedAt==null||Number.isFinite(i.observedAt)))throw new Error("Invalid keyboard status")}if(n.voiceSession?.recovery!==void 0){let i=n.voiceSession.recovery;if(!t(i)||i.stopVerified!==void 0&&typeof i.stopVerified!="boolean"||i.stopVerified===!0&&(i.kind!=="none"||n.voiceSession.fullyStopped!==!0)||!["none","live-root-conflict","predecessor-cleanup-pending","predecessor-stop-unconfirmed","helper-cleanup-pending","helper-stop-unconfirmed"].includes(i.kind)||!(i.rootSessionId===null||o(i.rootSessionId))||i.kind!=="none"&&n.voiceSession.fullyStopped===!0)throw new Error("Invalid voice recovery state")}if(n.voiceSession?.visibility!==void 0&&!["hidden","workspace"].includes(n.voiceSession.visibility))throw new Error("Fish Voice UI returned invalid visibility");if(n.voiceCapabilities!==void 0){let i=n.voiceCapabilities;if(!t(i)||!(i.configuredVisibility===null||["hidden","workspace"].includes(i.configuredVisibility))||["hidden","workspace"].some(s=>!t(i[s])||typeof i[s].supported!="boolean")||!t(i.taskHandoff)||typeof i.taskHandoff.mode!="string")throw new Error("Fish Voice UI returned invalid host capabilities")}return Ci(n),["setup-status","inspect-tts","preview-tts","cancel-tts","model-installer","inspect-model-compute","plan-model-install","start-model-install","control-model-install"].includes(e)&&Bu(e,n),n}function Zu(e,n=10){let t=0;for(let o=e.length-1;o>=0;o--)if(e[o].role==="user"&&++t===n)return e.slice(o);return e}function Lu(e=[],n=[]){let t=new Map(e.map(o=>[o.id,o]));for(let o of n)t.set(o.id,o);return[...t.values()].sort((o,r)=>o.at-r.at)}function qu(e,n=36){return e.scrollHeight-e.scrollTop-e.clientHeight<=n}function Hu({enabled:e,active:n,unknown:t,pending:o}){return t?"unknown":o?"pending":e?n?"listening":"standby":"off"}function so(e){return e?.enabled?e.existingVoiceSession?.sessionId??e.voiceSession?.id??null:null}var Vu=["save-voice-prompt","save-conversation-model","save-bindings","read-settings","save-settings","save-audio-device","save-models","set-visibility","set-performance-mode","save-tts","complete-setup","apply-model-install"],ao=Vu.filter(e=>e!=="read-settings"),lo=["status","enable","disable","new","resume","listen-mode"],bh=new Set(["status","enable","disable","listen-mode","read-history"]),yh=["save-bindings","inspect-tts","inspect-model-compute"],On=new Set(["conversation-models","status","read-settings","read-output-volume","model-installer","agent-permissions","agent-requests"]),St=["conversation-models","agent-permissions","agent-requests","status","read-settings","list","read-output-volume","inspect-performance","inspect-tts","model-installer","inspect-model-compute","plan-model-install"];function Gu(e,{schedule:n=(r,i)=>globalThis.setTimeout(r,i),unschedule:t=r=>globalThis.clearTimeout(r),observe:o=()=>{}}={}){let r=0,i={conversationHistory:null,conversationHistoryFor:null,conversationHistoryError:null,conversationHistoryLoading:!1,conversationHistoryRequestCursor:null},s={...i,conversationModels:null,conversationModelsFor:null,conversationModelsError:null,authorization:null,authorizationOpen:!1,authorizationLoading:!1,authorizationBusy:!1,authorizationUncertain:!1,authorizationError:null,agentRequests:null,agentRequestsFor:null,busy:!1,interruptibleRead:null,diagnosticStopPending:!1,error:null,status:null,settings:null,settingsFor:null,visibilityUncertain:!1,visibilityReadbackFor:null,catalog:null,checkedFor:null,catalogFor:null,uncertain:!1,performance:null,performanceFor:null,performancePending:!1,performanceError:null,conversation:null,conversationFor:null,conversationError:null,outputVolume:null,outputVolumeFor:null,outputVolumeUncertain:!1,setupStatus:null,setupOpen:!1,panelView:"home",setupError:null,ttsCapabilities:null,ttsCapabilitiesFor:null,ttsPreview:null,ttsPreviewFor:null,ttsCancelling:!1,ttsUncertain:!1,installer:null,installerFor:null,installerError:null,installerUncertain:!1,installPlan:null,installPlanFor:null},c=new Set,l=null,u=!0,d=!0,m=0,f=null,p=null,y=0,v=new Map,b=()=>{for(let w of v.values())w.stale=!0,w.abort.abort();v.clear()},x=()=>{b(),f&&(f.stale=!0,On.has(f.action)&&f.abort.abort())},z=!1,M=null,$=!1,j=null,W=0,U=0,E=new Map,S=!0,k=null,C=null,R=null,P,N=null,I=0,H=0,Z=!1,L=null,K=null,de=new Set,ue=new Set,Q=new Set,G=new Set,A=w=>{if(!S)return;let _=Object.hasOwn(w,"uncertain")?w.readOnlyFailure===!0:s.readOnlyFailure;s={...s,...w,readOnlyFailure:_};for(let O of de)O()},ne,pe,ge=0,Ie=w=>["checking","installing"].includes(w?.status),He=(w,_)=>{_?.revision!==void 0&&w.revision<_.revision||(_&&w.revision!==void 0&&(_.revision=w.revision),A({updates:w,updatesUnavailable:!1}))},Te=()=>{if(!S||!k?.subscribeUpdates||ne||!u)return;let w=k,_={};ne=_,_.stop=w.subscribeUpdates(O=>{!S||ne!==_||(ge++,Un("update-stream"),He(O,_))},()=>{!S||ne!==_||(ne=null,A({updatesUnavailable:!0}),Ve(C,"update-stream"))})},at=()=>{let w=ne;ne=null,w?.stop?.(),pe?.abort(),pe=null,A({updates:null,updatePending:null,updatesUnavailable:!1})},zn=async w=>{if(!S||!k?.updateAction||pe)return;let{action:_,version:O}=w;if(_==="install"&&(s.updatesUnavailable||s.updates?.canInstall!==!0||s.updates?.release?.version!==O))return;let B=k,V=new AbortController;pe=V,Te();let ee=ne,_e=ge;A({updatePending:_});try{let be=await B.updateAction(w,V.signal);S&&pe===V&&ne===ee&&(be.revision===void 0&&Ie(be)&&ge!==_e&&!Ie(s.updates)||He(be,ee))}catch{let be=ge!==_e&&!Ie(s.updates);S&&pe===V&&ne===ee&&!be&&A({updatesUnavailable:!0})}finally{pe===V&&(pe=null,A({updatePending:null}))}},Ee=0,ie=w=>{Ee++,A({...w,ttsUncertain:!0})},Ze=()=>s.status?.existingVoiceSession?null:C,Ke=null,Cn=()=>{Ke=null,A({transcriptRetry:null})},lt=w=>{if(!Ke?.receipt||w?.rootSessionId!==Ke.sessionId)return;let _=w.retryTranscripts?.items.find(O=>O.id===Ke.id);(!_||_.state!=="ready"||Ke.receipt==="unconfirmed"&&w.revision>Ke.revision)&&Cn()},hr=async(w,_)=>{let{status:O,conversation:B,checkedFor:V,conversationFor:ee,uncertain:_e,busy:be}=s,$e=O?.existingVoiceSession?.sessionId;if(!S||!k?.retryVoiceTranscript||Ke||_e||be||C!==w||V!==w||ee!==w||!O?.enabled||!$e||B?.rootSessionId!==$e||B.retryTranscripts?.sessionId!==$e||!B.retryTranscripts.items.some(Nn=>Nn.id===_&&Nn.state==="ready"))return;let en=k,jn=new AbortController,yn=Ke={id:_,sessionId:$e,revision:B.revision,receipt:null};ue.add(jn),A({transcriptRetry:{id:_,state:"sending"}});try{let Nn=await en.retryVoiceTranscript({id:_},jn.signal);if(!S||Ke!==yn)return;Nn.accepted===!1?Cn():yn.receipt="accepted"}catch{if(!S||Ke!==yn)return;yn.receipt="unconfirmed"}finally{ue.delete(jn),Ke===yn&&(yn.receipt==="unconfirmed"&&A({transcriptRetry:{id:_,state:"uncertain"}}),lt(s.conversation))}},fn=async(w,_,O)=>{let B=e??k?.action;if(!B)throw new Error("\u9C7C\u5E94\u754C\u9762\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let V=s.status?.existingVoiceSession&&bh.has(_.action)||s.existingSessionUnconfirmed&&_.action==="status"?null:w,ee=await B(V,_,O);try{return $n(_.action,ee)}catch(_e){throw o("ui-render-error","finished","failed"),_e}},ae=null,ho=({clear:w=!1}={})=>{let _=ae;ae=null,_?.abort.abort(),A({audioDevicesPending:!1,audioDevicesError:null,...w?{audioDevices:null,audioDevicesFor:null}:{}})},Hd=w=>{if(!S||C!==w)return Promise.resolve(!1);if(ae?.id===w&&ae.client===k)return ae.promise;ho();let _={id:w,client:k,scope:U,abort:new AbortController,promise:null};ae=_,ue.add(_.abort),A({audioDevicesPending:!0,audioDevicesError:null});let O=()=>S&&ae===_&&C===w&&k===_.client&&U===_.scope;return _.promise=(async()=>{let B;try{let V=new Promise((_e,be)=>{B=()=>be(new Error("Device read cancelled")),_.abort.signal.addEventListener("abort",B,{once:!0})}),ee=await Promise.race([fn(w,{action:"read-audio-devices"},_.abort.signal),V]);return O()?(A({audioDevices:ee,audioDevicesFor:w}),!0):!1}catch(V){return O()&&!_.abort.signal.aborted&&A({audioDevicesError:String(V?.message??V)}),!1}finally{_.abort.signal.removeEventListener("abort",B),ue.delete(_.abort),O()&&(ae=null,A({audioDevicesPending:!1}))}})(),_.promise},Mn=null,Vd=w=>{if(!S||C!==w)return Promise.resolve(!1);if(Mn?.id===w&&Mn.scope===U)return Mn.promise;let _={id:w,scope:U,client:k,promise:null};Mn=_;let O=()=>S&&Mn===_&&C===w&&U===_.scope&&k===_.client;return A({modelComputePending:!0,modelComputeError:null}),_.promise=(async()=>{try{if(await fn(w,{action:"inspect-model-compute"}),!O())return!1;let B=await fn(w,{action:"model-installer"});return O()?(A({installer:B,installerFor:w,installerError:null}),Z||(Z=!0,ct(!0)),!0):!1}catch(B){if(!O())return!1;let V=B?.uncertain||/TTS_TERMINATION_UNCONFIRMED/.test(String(B?.code??"")+" "+String(B?.message??""));return A({modelComputeError:String(B?.message??B),...V?{installerUncertain:!0,installerTerminationUnconfirmed:!0}:{}}),!1}finally{O()&&(Mn=null,A({modelComputePending:!1}))}})(),_.promise},Bn=null,gr=0,Wt=({clear:w=!1}={})=>{gr++;let _=Bn;Bn=null,_?.abort.abort(),A({performancePending:!1,performanceError:null,...w?{performance:null,performanceFor:null}:{}})},Gd=w=>{if(!S||C!==w)return Promise.resolve(!1);if(Bn?.id===w&&Bn.client===k)return Bn.promise;Wt();let _={id:w,client:k,epoch:gr,abort:new AbortController,promise:null};Bn=_,ue.add(_.abort),A({performancePending:!0,performanceError:null});let O=()=>S&&Bn===_&&_.epoch===gr&&C===w&&k===_.client;return _.promise=(async()=>{let B;try{let V=new Promise((_e,be)=>{B=()=>be(new Error("Probe cancelled")),_.abort.signal.addEventListener("abort",B,{once:!0})}),ee=await Promise.race([fn(w,{action:"inspect-performance"},_.abort.signal),V]);return O()?(A({performance:ee,performanceFor:w}),!0):!1}catch(V){return O()&&!_.abort.signal.aborted&&A({performanceError:String(V?.message??V)}),!1}finally{_.abort.signal.removeEventListener("abort",B),ue.delete(_.abort),O()&&(Bn=null,A({performancePending:!1}))}})(),_.promise},It=()=>{let w=E.get("conversation-stream");w&&(w.timer!==null&&t(w.timer),w.timer=null,w.ready=!1);let _=++I;if(R?.(),R=null,r++,A({...i,conversation:null,conversationFor:null,conversationError:null,listenModeReceiptRevision:null}),P=void 0,!S||!k)return;let O=C;P=Ze(),R=k.subscribe(P,(B,V)=>{if(!(!S||_!==I||C!==O))try{let ee=$n("conversation",B);V?.initial||Un("conversation-stream"),s.conversationHistory&&(s.conversationHistory.rootSessionId!==ee.rootSessionId||s.conversationHistory.scope!=="voice-session"&&s.conversationHistory.generation!==ee.historyGeneration)&&(r++,A({...i}));let _e=s.conversationHistory,be={};if(_e?.rootSessionId&&_e.rootSessionId===ee.rootSessionId){let $e=new Map(_e.items.map(q=>[q.id,q]));for(let q of ee.items)$e.set(q.id,q);let en=[...$e.values()].sort((q,je)=>q.at-je.at),jn=en.slice(-4e3),yn=jn.reduce((q,je)=>q+je.text.length,0),Nn=en.length>4e3;for(;yn>4*1024*1024;)yn-=jn.shift().text.length,Nn=!0;be={conversationHistory:{..._e,items:jn,truncated:_e.truncated||Nn}}}A({...be,conversation:ee,conversationFor:O,conversationError:null}),lt(ee)}catch(ee){r++,A({...i,conversation:null,conversationFor:null,conversationError:String(ee.message)}),Ve(O,"conversation-stream")}},B=>{S&&_===I&&(r++,A({...i,conversation:null,conversationFor:null,conversationError:String(B?.message??B)}),Ve(O,"conversation-stream"))})},ct=(w=!1)=>{let _=E.get("model-stream");_&&(_.timer!==null&&t(_.timer),_.timer=null,_.ready=!1);let O=++H;if(N?.(),N=null,w||A({installer:null,installerFor:null,installerError:null}),!S||!k?.subscribeModels||!Z)return;let B=C;N=k.subscribeModels(B,(V,ee)=>{if(!(!S||O!==H||C!==B||ee?.initial))try{let _e=$n("model-installer",V),be=s.installer?.ttsInstallIntent;if(Un("model-stream"),A({installer:_e,installerFor:B,installerError:null}),_e.ttsInstallIntent&&(be?.jobId!==_e.ttsInstallIntent.jobId||be?.status!==_e.ttsInstallIntent.status)){let $e=_e.ttsInstallIntent.status==="applied";A({checkedFor:null}),Xe({settings:$e,force:!0})}}catch(_e){A({installer:null,installerFor:null,installerError:String(_e.message)}),Ve(B,"model-stream")}},V=>{S&&O===H&&(A({installer:null,installerFor:null,installerError:String(V?.message??V)}),Ve(B,"model-stream"))})},Zn=()=>{if(K)return K;if(!L)return Promise.resolve(!0);let w=L,_=Ee;return w.cancelled=!0,w.abort.abort(),A({ttsCancelling:!0,ttsPreview:{status:"cancelling"}}),K=(async()=>{let O=!1;try{let B=await fn(w.id,{action:"cancel-tts"});return B.status==="unconfirmed"?(M=null,ie({ttsPreview:B,uncertain:!0,error:"\u65E0\u6CD5\u786E\u8BA4\u6717\u8BFB\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B\u540E\u518D\u8BD5\u3002"}),!1):(O=!0,A({ttsPreview:B,..._===Ee?{ttsUncertain:!1}:{}}),!0)}catch(B){return M=null,ie({ttsPreview:{status:"unconfirmed"},uncertain:!0,error:String(B?.message??B)}),!1}finally{O&&L===w&&(L=null),A({ttsCancelling:!1}),K=null,queueMicrotask(()=>{bo(),pt()})}})(),K},Un=w=>{let _=E.get(w);_?.timer!=null&&t(_.timer),E.delete(w)},vr=()=>{for(let w of E.keys())Un(w)},Ve=(w,_)=>{if(!S||!z||C!==w||!["authorization","setup-status","conversation-stream","model-stream","update-stream"].includes(_)&&!On.has(_))return;let O=E.get(_);O||(O={id:w,scope:U,attempts:0,timer:null,ready:!1},E.set(_,O)),!(O.timer!==null||O.ready||!u||!d)&&(O.attempts++,o("ui-read-recovery","requested"),O.timer=n(()=>{O.timer=null,!(!S||C!==w||O.scope!==U||E.get(_)!==O)&&(O.ready=!0,pt())},Math.min(3e4,750*2**Math.min(O.attempts-1,6))),O.timer?.unref?.())},Ln=null,go=0,ut=()=>{Ln!==null&&t(Ln),Ln=null,go=0},Mi=w=>{!S||!u||!d||C!==w||Ln!==null||go>=10||(Ln=n(()=>{if(Ln=null,!(!S||C!==w||!["predecessor-cleanup-pending","helper-cleanup-pending"].includes(s.status?.voiceSession?.recovery?.kind))){if(s.busy||s.ttsCancelling){Mi(w);return}go++,Qe.run(w,"status")}},1e3),Ln?.unref?.())},Qe,Qn=0,vo=null,Tt=null,dt=null,Dt=!1,Jd=async w=>{let _=k,O=[],B=new Set;if(!S||!_?.readOperationLog)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u672A\u5C31\u7EEA");let V=null;do{w?.throwIfAborted();let ee=await _.readOperationLog(V?{cursor:V}:{},w);if(!S||k!==_||w?.aborted)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u8FDE\u63A5\u5DF2\u53D8\u5316");if(typeof ee?.text!="string"||!(ee.nextCursor===null||typeof ee.nextCursor=="string"&&ee.nextCursor)||B.has(ee.nextCursor))throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u5206\u9875\u65E0\u6548");O.push(ee.text),V=ee.nextCursor,B.add(V)}while(V);return O},Kd=async(w,_)=>{if(!S||!k?.manageSessions)throw new Error("\u9C7C\u5E94\u4F1A\u8BDD\u7BA1\u7406\u5C1A\u672A\u5C31\u7EEA");let O=k,B=await O.manageSessions(null,w,_);if(!S||k!==O||_?.aborted)throw new Error("\u4F1A\u8BDD\u7BA1\u7406\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5");return B},Xd=async(w,_)=>{if(!S||!k?.listExistingVoiceSessions)throw new Error("DSH \u4F1A\u8BDD\u5217\u8868\u6682\u4E0D\u53EF\u7528");let O=k,B=await O.listExistingVoiceSessions(w,_);if(!S||k!==O||_?.aborted)throw new Error("\u4F1A\u8BDD\u5217\u8868\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5");return B},et=null,Yd=async w=>{if(!S||!k?.setExistingVoiceSession||et||s.existingSessionUnconfirmed)throw new Error("DSH \u4F1A\u8BDD\u7ED1\u5B9A\u6682\u4E0D\u53EF\u7528");let _=k,O=new AbortController;et=O,ue.add(O);for(let B of[v.get("status"),f])B?.action==="status"&&(B.stale=!0,B.abort.abort());A({existingSessionWritePending:!0});try{let B=await _.setExistingVoiceSession(w,O.signal);if(!S||k!==_||O.signal.aborted)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u786E\u8BA4");return s.status&&A({status:{...s.status,existingVoiceSession:B.binding}}),P!==Ze()&&It(),B}catch(B){throw A({existingSessionUnconfirmed:!0}),B}finally{ue.delete(O),et=null,A({existingSessionWritePending:!1}),Xe({force:!0})}},Qd=async(w,_)=>{if(!S||!k?.senseVoiceAsrAction)throw new Error("\u8BC6\u522B\u6A21\u578B\u7BA1\u7406\u6682\u4E0D\u53EF\u7528");let O=k,B=await O.senseVoiceAsrAction(w,_);if(!S||k!==O||_?.aborted)throw new Error("\u8BC6\u522B\u6A21\u578B\u72B6\u6001\u5DF2\u5207\u6362");if(!(ee=>ee&&["idle","downloading","ready","error"].includes(ee.state)&&Number.isSafeInteger(ee.receivedBytes)&&Number.isSafeInteger(ee.totalBytes)&&ee.receivedBytes>=0&&ee.receivedBytes<=ee.totalBytes)(B)||typeof B.selected!="boolean"||B.message!==null&&(typeof B.message!="string"||B.message.length>512))throw new Error("\u8BC6\u522B\u6A21\u578B\u72B6\u6001\u65E0\u6548");return B},nt=async({open:w=!1,initial:_=!1}={})=>{if(!k?.readAuthorization)return!1;if(Tt)return dt={open:w||dt?.open,initial:_||dt?.initial},w&&A({authorizationOpen:!0}),!1;let O=++Qn,B=new AbortController;ue.add(B),vo=B,A({authorizationLoading:!0,authorizationError:null,...w?{authorizationOpen:!0}:{}});try{let V=$n("authorization",await k.readAuthorization(B.signal));return!S||O!==Qn?!1:(Un("authorization"),A({authorization:V,authorizationUncertain:V.revocationUnconfirmed,..._&&!Dt&&(!V.completed||V.usageAgreement?.accepted!==!0||V.revocationUnconfirmed)?{authorizationOpen:!0}:{}}),!0)}catch(V){return S&&O===Qn&&(A({authorizationError:String(V?.message??V),authorizationUncertain:!0,..._?{authorizationOpen:!0}:{}}),Ve(C,"authorization")),!1}finally{ue.delete(B),vo===B&&(vo=null,S&&A({authorizationLoading:!1}))}},ep=async w=>{if(!k?.saveAuthorization||!s.authorization||s.authorizationBusy||s.authorizationUncertain)return!1;let _=new AbortController,O=++Qn,B=k;ue.add(_),Tt=_,A({authorizationBusy:!0,authorizationError:null});try{let V=$n("authorization",await B.saveAuthorization({revision:s.authorization.revision,grant:w},_.signal));return!S||O!==Qn||k!==B?!1:(Dt=!1,A({authorization:V,authorizationOpen:V.revocationUnconfirmed,authorizationUncertain:V.revocationUnconfirmed,...V.revocationUnconfirmed?{authorizationError:"\u6743\u9650\u5DF2\u64A4\u56DE\uFF0C\u4F46\u5F53\u524D\u97F3\u9891\u505C\u6B62\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u6838\u67E5\u72B6\u6001\u3002"}:{}}),w&&!V.revocationUnconfirmed&&Qe.openSetup(),Xe({settings:!0,force:!0}),!0)}catch(V){try{let ee=$n("authorization",await B.readAuthorization(_.signal));if(S&&k===B&&O===Qn&&ee.completed&&ee.granted===w&&!ee.revocationUnconfirmed)return Dt=!1,A({authorization:ee,authorizationOpen:!1,authorizationUncertain:!1}),w&&Qe.openSetup(),!0}catch{}return S&&k===B&&O===Qn&&(A({authorizationUncertain:!0,authorizationError:String(V?.message??V)}),Ve(C,"authorization")),!1}finally{if(ue.delete(_),Tt===_&&(Tt=null,S&&A({authorizationBusy:!1}),S&&(dt||k!==B))){let V=dt??{initial:!0};dt=null,nt(V)}}},tt=null,br=0,yr=()=>{if(!k?.readSetup||tt)return tt?.promise;let w=k,_=br,O=new AbortController,B={promise:null};return tt=B,ue.add(O),B.promise=(async()=>{try{let V=$n("setup-status",await w.readSetup(O.signal));return!S||k!==w?!1:(Un("setup-status"),A({setupStatus:V,...m===_&&!Dt?{setupOpen:!V.completed}:{},setupError:null}),V.completed?Xe({settings:!0}):bo(),!0)}catch(V){return S&&k===w&&(A({setupError:String(V?.message??V)}),Ve(C,"setup-status")),!1}finally{ue.delete(O),tt===B&&(tt=null)}})(),B.promise},pt=async()=>{if(!(e||k?.action||k?.readAuthorization||k?.readSetup||k?.subscribeUpdates)||!S||!z||!u||!d||$||et||s.busy||s.ttsCancelling||!M&&![...E.values()].some(B=>B.ready))return;if(!M){let[B,V]=[...E].find(([,ee])=>ee.ready);if(V.ready=!1,V.id!==C||V.scope!==U){Un(B);return}$=!0;try{B==="authorization"?await nt():B==="setup-status"?await yr():B==="conversation-stream"?It():B==="model-stream"?ct(!0):B==="update-stream"?Te():await Qe.run(V.id,B)}finally{$=!1,queueMicrotask(()=>{pt()})}return}let w=M;M=null;let _=()=>S&&w.id===C&&w.scope===U;if(!_())return;let O=()=>_()?!u||!d||et||s.busy||s.ttsCancelling?(M||(M=w),!0):!1:!0;$=!0;try{if(w.notified||(w.notified=!0,j=w.id,W=Date.now(),A({readRefresh:(s.readRefresh??0)+1})),O()||(w.settings&&(w.settings=!1,await Qe.run(w.id,"read-settings",{},!0)),O()))return;w.status&&(w.status=!1,await Qe.run(w.id,"status",{},!0)),_()&&w.id&&!G.has(w.id)&&(G.add(w.id),Qe.run(w.id,"inspect-performance"))}finally{$=!1,queueMicrotask(()=>{pt()})}},Xe=({settings:w=!1,force:_=!1}={})=>{if(Te(),!(!S||!z)&&!(!_&&!w&&j===C&&Date.now()-W<1500)&&(s.authorizationUncertain&&!vo&&!Tt&&nt(),s.setupError&&!tt&&yr(),!(!C&&!s.setupOpen&&s.setupStatus===null))){s.installerError&&Z&&ct(!0);for(let O of E.values())O.id===C&&(O.timer!==null&&t(O.timer),O.timer=null,O.attempts=0,O.ready=!0);Ln===null&&(go=0),(!M||M.scope!==U)&&o("ui-status-refresh","requested"),M={id:C,scope:U,settings:!0,status:!0,notified:!1},queueMicrotask(()=>{pt()})}},Bi=()=>{let w=u&&d;if(s.readVisible!==w){if(A({readVisible:w}),!w){b();for(let _ of E.values())_.timer!==null&&t(_.timer),_.timer=null,_.ready=!1;ut();return}Xe({force:!0})}},bo=async()=>{let w=C;!(e||k?.action)||s.setupStatus?.completed!==!1||Q.has(w)||s.busy||s.ttsCancelling||(Q.add(w),await Qe.run(w,"read-settings")&&C===w&&await Qe.run(w,"status"))};return Qe={getSnapshot:()=>s,async pickPath(w,_,O){if(!S||C!==w)return null;let B=U,V=e??k?.action;if(!V)throw new Error("\u9C7C\u5E94\u754C\u9762\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let ee=await V(w,{action:"pick-local-path",kind:_},O);if(!S||C!==w||B!==U||O?.aborted)return null;if(!ee||!(ee.path===null||typeof ee.path=="string"&&ee.path.length>0&&ee.path.length<=4096&&!/[\u0000-\u001f\u007f]/.test(ee.path)))throw new Error("\u8DEF\u5F84\u9009\u62E9\u7ED3\u679C\u65E0\u6548");return ee.path},async captureBindings(w,_){let O=await fn(w,{action:"capture-bindings",..._});if(!O||typeof O.token!="string"||typeof O.paused!="boolean")throw new Error("\u6309\u952E\u5F55\u5165\u56DE\u6267\u65E0\u6548");return O},setReadVisibility(w){u=!!w,Bi()},setPanelVisible(w){d=!!w,Bi()},markSettingsEdited(w="save-settings"){ao.includes(w)&&(c.add(w),A({settingsDraftActions:[...c]}))},discardSettingsDraft(w){w?c.delete(w):c.clear(),A({settingsDraftActions:[...c]}),!c.size&&(l&&A({settings:l,settingsFor:C}),l=null,A({settingsConflict:!1,settingsKey:s.settings?.revision}))},enableAutomaticReads(){z=!0,Xe({settings:!0,force:!0})},refresh:Xe,refreshModelCompute:Vd,subscribe(w){return de.add(w),()=>de.delete(w)},setSession(w){C!==w&&(C=w,U++,Mn=null,c.clear(),l=null,A({sourcePending:!0,checkedFor:void 0,settingsFor:void 0,modelComputePending:!1,modelComputeError:null,enableError:null,listenModeError:!1,newChatFor:void 0,settingsConflict:!1,settingsDraftActions:[],installPlan:null,installPlanFor:null}),vr(),Wt({clear:!0}),ho({clear:!0}),ut(),Zn(),x(),It(),ct(),Xe({settings:!0,force:!0}),bo())},attachConversationClient(w){k!==w&&(at(),U++,Mn=null,A({modelComputePending:!1,modelComputeError:null}),vr(),Wt({clear:!0}),ho({clear:!0}),x(),G.clear()),k=w,nt({initial:!0}),It(),ct(),Xe({settings:!0,force:!0}),k.readSetup&&(tt=null,br=m,yr())},conversationUnavailable(w){r++,A({...i,error:String(w?.message??w),conversation:null,conversationFor:null,conversationError:String(w?.message??w)})},async dismissSetup(){let w=++m,_=await Zn();return _&&w===m&&(x(),Qe.discardSettingsDraft(),A({setupOpen:!1})),_&&w===m},async showHome(){let w=++m,_=await Zn();return _&&w===m&&(x(),Qe.discardSettingsDraft(),A({setupOpen:!1,panelView:"home"}),Xe()),_&&w===m},async openSettings(w="audio",_="conversation"){let O=++m,B=await Zn();return B&&O===m&&(x(),A({setupOpen:!1,panelView:"settings",settingsTab:["audio","interaction","prompt","models","advanced","sessions","pets"].includes(w)?w:"audio",settingsModelTab:_,sessionManagementRoot:null,sessionHistoryOpen:!1}),Xe({settings:!0})),B&&O===m},readOperationLog:Jd,manageSessions:Kd,listExistingVoiceSessions:Xd,retryVoiceTranscript:hr,setExistingVoiceSession:Yd,setSettingsTab(w){w!==s.settingsTab&&A({settingsTab:w,sessionManagementRoot:null,sessionHistoryOpen:!1})},setSettingsModelTab(w){A({settingsModelTab:w})},setSessionManagement({rootId:w=s.sessionManagementRoot,historyOpen:_}){A({sessionManagementRoot:w,sessionHistoryOpen:_})},senseVoiceAsrAction:Qd,updateAction:zn,dismissUpdate(w){w&&A({dismissedUpdateVersion:w})},openSetup(){++m,x(),A({setupOpen:!0}),Xe({settings:!0,force:!0}),!z&&!s.busy&&(async()=>{let w=C;await Qe.run(w,"read-settings")&&C===w&&await Qe.run(w,"status")})()},cancelPreview:Zn,discardDiagnostics:x,refreshAuthorization:nt,saveAuthorization:ep,openAuthorization:()=>nt({open:!0}),closeAuthorization({resumeSetup:w=!1}={}){return!s.authorizationBusy&&!s.authorizationLoading?(Dt=!w,++m,br=m,A({authorizationOpen:!1,setupOpen:w}),w&&Xe({settings:!0}),!0):!1},async run(w,_,O={},B=!1){if(!S||et&&_==="status"||(et||s.existingSessionUnconfirmed)&&["enable","new","resume"].includes(_))return!1;let V=!!(B&&On.has(_)&&!s.uncertain&&s.checkedFor===w&&s.settingsFor===w&&s.status&&s.settings);if(V&&v.has(_))return!1;if(B||b(),_==="read-history"){if(C!==w||s.conversationHistoryLoading)return!1;let q=++r,je=U,ln=I;A({conversationHistoryLoading:!0,conversationHistoryError:null,conversationHistoryRequestCursor:O.cursor??null});try{let Re=await fn(w,{action:_,...O});if(!S||C!==w||je!==U||q!==r||ln!==I||s.conversation?.rootSessionId&&(s.conversation.rootSessionId!==Re.rootSessionId||Re.scope!=="voice-session"&&s.conversation.historyGeneration!==Re.generation))return!1;let An=s.conversationHistory;if(O.cursor&&(!An||An.generation!==Re.generation||An.rootSessionId!==Re.rootSessionId))return!1;let yo=new Map(Re.items.map(hn=>[hn.id,hn]));if(O.cursor)for(let hn of An.items)yo.set(hn.id,hn);if(s.conversation?.rootSessionId===Re.rootSessionId)for(let hn of s.conversation?.items??[])yo.set(hn.id,hn);let $t=[...yo.values()].sort((hn,wr)=>hn.at-wr.at),wo=O.cursor?$t.slice(0,4e3):$t.slice(-4e3),Zi=wo.reduce((hn,wr)=>hn+wr.text.length,0),Li=$t.length>4e3;for(;Zi>4*1024*1024;)Zi-=(O.cursor?wo.pop():wo.shift()).text.length,Li=!0;return A({conversationHistory:{...Re,items:wo,truncated:Re.truncated||Li||!!(O.cursor&&An?.truncated)},conversationHistoryFor:w}),!0}catch(Re){return q===r&&A({conversationHistoryError:String(Re?.message??Re)}),!1}finally{q===r&&A({conversationHistoryLoading:!1})}}if(_==="apply-model-install"&&["save-models","save-tts"].some(q=>c.has(q)))return A({error:"\u8BF7\u5148\u4FDD\u5B58\u6216\u653E\u5F03\u6A21\u578B\u8BBE\u7F6E\u8349\u7A3F\uFF0C\u518D\u5207\u6362\u6A21\u578B\u3002"}),!1;if(_==="read-audio-devices")return Hd(w);if(_==="inspect-performance")return Gd(w);if(_==="cancel-tts"){if(L)return Zn();try{let q=await fn(w,{action:_});return A({ttsPreview:q,ttsPreviewFor:w}),q.status==="unconfirmed"?(ie({uncertain:!0,error:"\u65E0\u6CD5\u786E\u8BA4\u6717\u8BFB\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B\u3002"}),!1):!0}catch(q){return ie({error:String(q?.message??q),uncertain:!0}),!1}}let ee=_==="disable"&&f&&!p;if(s.busy&&!ee||s.ttsCancelling||s.settingsConflict&&ao.includes(_)||s.agentPermissionUncertain&&_==="save-agent-permissions"||s.agentRequestUncertain&&_==="decide-agent-request"||s.ttsUncertain&&!St.includes(_)&&_!=="disable"||s.visibilityUncertain&&!St.includes(_)||s.outputVolumeUncertain&&_==="set-output-volume"||s.installerUncertain&&["start-model-install","control-model-install","apply-model-install"].includes(_))return!1;if(!w&&(w!==null||!Iu.has(_)))return A({error:"\u6B64\u64CD\u4F5C\u9700\u8981\u4F1A\u8BDD\u6765\u6E90"}),!1;let _e;if(ee&&(f.stale=!0,On.has(f.action)&&f.abort.abort(),_e=p=Symbol("diagnostic-stop")),!St.includes(_)){ut();for(let q of On)Un(q)}(ao.includes(_)||lo.includes(_)&&_!=="status")&&Wt({clear:_!=="set-performance-mode"});let be;(yh.includes(_)||On.has(_))&&(be={id:w,action:_,abort:new AbortController,stale:!1},V?v.set(_,be):f=be),V||(y++,A({busy:!0,error:null,..._==="enable"?{enableError:null}:{},..._==="save-bindings"?{bindingError:null}:{},interruptibleRead:f?.action??null,diagnosticStopPending:!!p,..._==="listen-mode"?{listenModePending:O.mode,listenModeBefore:s.conversation?.helper?.listenMode??s.status?.listenMode}:{},..._!=="status"&&lo.includes(_)?{listenModeError:!1}:{}}));let $e,en=U,jn=so(s.status),yn=s.checkedFor,Nn=Ee;try{if(be?.stale)return!1;let q;if(["read-output-volume","set-output-volume"].includes(_)){if(!k)throw new Error("\u8BED\u97F3\u8F93\u51FA\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let je=be?.abort??new AbortController;ue.add(je);let ln;try{let Re=_==="read-output-volume"?k.readVolume(w,je.signal):k.setVolume(w,O,je.signal),An=_==="read-output-volume"?await Promise.race([Re,new Promise((yo,$t)=>{ln=()=>$t(new Error("Read cancelled")),je.signal.addEventListener("abort",ln,{once:!0})})]):await Re;q=$n("output-volume",An)}finally{je.signal.removeEventListener("abort",ln),ue.delete(je)}}else{if(_==="preview-tts"&&($e={id:w,abort:new AbortController,cancelled:!1},L=$e,A({ttsPreview:{status:"preparing"},ttsPreviewFor:w})),On.has(_)){let je,ln=new Promise((Re,An)=>{je=()=>An(new Error("Read cancelled")),be.abort.signal.addEventListener("abort",je,{once:!0})});try{q=await Promise.race([fn(w,{...O,action:_},be.abort.signal),ln])}finally{be.abort.signal.removeEventListener("abort",je)}}else q=await fn(w,{...O,action:_},$e?.abort.signal??be?.abort.signal);if(be?.stale)return!1}if(be?.stale||St.includes(_)&&(!S||en!==U))return!1;if(On.has(_)&&Un(_),["agent-permissions","save-agent-permissions"].includes(_)&&A({agentPermissions:q,agentPermissionsFor:w,agentPermissionUncertain:!1}),["agent-requests","decide-agent-request"].includes(_)&&(A({agentRequests:q,agentRequestsFor:w,agentRequestUncertain:!1}),_==="decide-agent-request"&&q.lastOutcome?.state==="completed"&&(A({checkedFor:null}),Xe({settings:!0,force:!0})),_==="decide-agent-request"&&q.lastOutcome?.state==="unknown"&&A({uncertain:!0,error:"\u64CD\u4F5C\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u5148\u8BFB\u53D6\u5B9E\u9645\u72B6\u6001\uFF0C\u4E0D\u8981\u91CD\u8BD5\u3002"})),lo.includes(_)){if(_==="listen-mode"){if(C!==w||en!==U)return!1;if(q.listenMode!==O.mode)throw new Error("\u8BF4\u8BDD\u65B9\u5F0F\u7684\u56DE\u6267\u5C1A\u672A\u786E\u8BA4")}if(en!==U)return!0;if(["status","disable"].includes(_)&&q.ttsRuntime){let Re=!!(q.ttsRuntime.blocked||s.ttsUncertain&&(q.ttsRuntime.busy||Nn!==Ee));q.ttsRuntime.blocked&&Ee++,A({ttsUncertain:Re}),!Re&&!q.ttsRuntime.busy&&!K&&L?.cancelled&&(L=null)}let je=s.visibilityUncertain&&!(_==="status"&&s.visibilityReadbackFor===w),ln=Object.hasOwn(q,"existingVoiceSession");!ln&&Object.hasOwn(s.status??{},"existingVoiceSession")&&(q={...q,existingVoiceSession:s.status.existingVoiceSession,existingVoiceSessionSupported:s.status.existingVoiceSessionSupported}),A({status:q,checkedFor:w,uncertain:je,visibilityUncertain:je,...je?{}:{visibilityReadbackFor:null},...V?{error:null}:{},...C===w?{sourcePending:!1}:{},..._==="status"&&ln?{existingSessionUnconfirmed:!1}:{},..._==="listen-mode"?{listenModeReceiptRevision:s.conversation?.revision??null}:{}}),Ke&&(!q.enabled||q.existingVoiceSession?.sessionId!==Ke.sessionId)&&Cn(),["predecessor-cleanup-pending","helper-cleanup-pending"].includes(q.voiceSession?.recovery?.kind)?Mi(w):ut()}if(Vu.includes(_)&&(_!=="read-settings"&&en===U&&(c.delete(_),A({settingsDraftActions:[...c]})),_==="read-settings"&&c.size>0&&s.settingsFor===w&&s.settings?.revision!==q.revision?(l=q,A({settingsConflict:!0})):(l=null,A({settings:q,settingsFor:w,settingsConflict:!1,settingsKey:c.size>0?s.settingsKey:q.revision})),q.onboarding&&Un("setup-status"),A({...q.onboarding?{setupStatus:q.onboarding,setupError:null}:{},..._==="read-settings"&&s.visibilityUncertain&&["hidden","workspace"].includes(q.voiceSession?.visibility)?{visibilityReadbackFor:w}:{}})),_==="read-settings"&&s.visibilityUncertain&&Ve(w,"status"),_==="conversation-models"&&A({conversationModels:q,conversationModelsFor:w,conversationModelsError:null}),_==="inspect-tts"&&A({ttsCapabilities:q,ttsCapabilitiesFor:w}),_==="preview-tts"&&!$e.cancelled&&A({ttsPreview:{...q,status:q.textOnly===!0?"text-only":"completed"},ttsPreviewFor:w}),["read-output-volume","set-output-volume"].includes(_)&&A({outputVolume:q,outputVolumeFor:w,outputVolumeUncertain:!1}),["save-voice-prompt","save-conversation-model","set-visibility","set-performance-mode","save-tts","apply-model-install"].includes(_)&&(A({status:null,checkedFor:null,catalog:null,catalogFor:null}),Xe({force:!0})),_==="plan-model-install"&&A({installPlan:q,installPlanFor:w,installPlanRequest:{...O}}),_==="model-installer"&&(A({installer:q,installerFor:w,installerUncertain:!!s.installerTerminationUnconfirmed}),C===w&&!Z&&(Z=!0,ct(!0))),_==="inspect-model-compute"&&s.installerFor===w&&s.installer&&A({installer:{...s.installer,compute:q}}),_==="start-model-install"&&A({installPlan:null,installPlanFor:null}),_==="list"){let je=O.cursor&&s.catalogFor===w?s.catalog?.items??[]:[];A({catalog:{...q,items:[...new Map([...je,...q.items].map(ln=>[ln.id,ln])).values()]},catalogFor:w})}return["new","resume","listen-mode"].includes(_)&&A({catalog:null}),["new","resume"].includes(_)&&C===w&&en===U&&(r++,A({...i,newChatFor:_==="new"&&O.expectedOwnerSessionId!==void 0?w:void 0})),_==="listen-mode"&&Xe({settings:!0,force:!0}),["status","enable","disable","new","resume"].includes(_)&&C===w&&(_!=="status"||yn!==w||jn!==so(q)||P!==Ze()||s.conversationError)&&It(),!0}catch(q){return _==="listen-mode"&&(C!==w||en!==U)||(be&&(q?.uncertain||/TTS_TERMINATION_UNCONFIRMED/.test(String(q?.code??"")+" "+String(q?.message??"")))&&(_==="inspect-tts"?ie({}):A({installerUncertain:!0,installerTerminationUnconfirmed:!0})),be?.stale||St.includes(_)&&en!==U)||$e?.cancelled||(_==="status"&&(ut(),C===w&&en===U&&A({sourcePending:!1})),St.includes(_)||(M=null),/AUTHORIZATION_REQUIRED/.test(String(q?.message??q))&&nt({open:!0}),$e&&await Zn(),_==="preview-tts"&&Ee++,_==="enable"&&C===w&&en===U&&A({enableError:String(q?.message??q)+(q?.code?" ["+q.code+"]":"")}),_==="listen-mode"&&C===w&&en===U&&A({listenModeError:!0}),A({error:String(q?.message??q),..._==="conversation-models"?{conversationModelsError:String(q?.message??q),conversationModels:null,conversationModelsFor:w}:{},..._==="save-bindings"?{bindingError:String(q?.message??q)+(q?.code?" ["+q.code+"]":"")}:{},..._==="save-agent-permissions"?{agentPermissionUncertain:!0}:{},..._==="decide-agent-request"?{agentRequestUncertain:!0}:{},..._==="preview-tts"?{ttsPreviewFor:w,ttsUncertain:!0}:{},..._==="set-output-volume"?{outputVolumeUncertain:!0}:{},...ao.includes(_)?{uncertain:!0,visibilityUncertain:!0,visibilityReadbackFor:null}:{},...["start-model-install","control-model-install"].includes(_)?{installerUncertain:!0}:{},...lo.includes(_)?{uncertain:!0,readOnlyFailure:_==="status"&&(!s.uncertain||s.readOnlyFailure===!0)}:{}}),On.has(_)&&Ve(w,_),ao.includes(_)?(Ve(w,"read-settings"),Ve(w,"status")):lo.includes(_)&&_!=="status"?Ve(w,"status"):_==="set-output-volume"?Ve(w,"read-output-volume"):_==="save-agent-permissions"?Ve(w,"agent-permissions"):_==="decide-agent-request"?Ve(w,"agent-requests"):["start-model-install","control-model-install"].includes(_)&&Ve(w,"model-installer")),!1}finally{v.get(_)===be&&v.delete(_),$e&&L===$e&&!$e.cancelled&&(L=null),be&&f===be&&(f=null),_e&&p===_e&&(p=null),V||(y--,A({busy:y>0,interruptibleRead:f?.action??null,diagnosticStopPending:!!p,..._==="listen-mode"?{listenModePending:null}:{}})),queueMicrotask(()=>{bo(),pt()})}},dispose(){if(S){U++,vr(),c.clear(),l=null,A({settingsConflict:!1,settingsDraftActions:[]}),Wt({clear:!0}),ho({clear:!0}),ut(),Zn(),x(),f?.abort.abort(),at(),S=!1,I++,H++,R?.(),N?.();for(let w of ue)w.abort();ue.clear(),de.clear()}}},Qe}function co(e,n,t,o=12){let r=n.left+o,i=n.top+o;return{x:Math.max(r,Math.min(e.x,Math.max(r,n.right-t.width-o))),y:Math.max(i,Math.min(e.y,Math.max(i,n.bottom-t.height-o)))}}function Ju(e=window){let n=null,t=null,o=null,r=null,i=null,s=null,c=null,l=null,u=null,d=()=>e.performance?.now?.()??Date.now(),m=e.matchMedia?.("(prefers-reduced-motion: reduce)"),f=()=>{l!==null&&e.cancelAnimationFrame?.(l),l=null,u&&(u=null,S("endDrag"))},p=P=>{if(l=null,!u||!n)return;if(m?.matches||n.dataset?.motion==="off"){f();return}let N=Math.max(0,P-u.time);u.time=P;let I={...r},H=!1;for(let Z of["x","y"]){let L=u[Z],K=(L.target-r[Z])*Math.exp(-N/L.tau);I[Z]=Math.abs(K)<.5?L.target:L.target-K,I[Z]!==L.target&&(H=!0)}r=co(I,i.box,i.size),v(),S("move");for(let Z of["x","y"])Math.abs(r[Z]-I[Z])>.01&&(u[Z].target=r[Z]);!H||P-u.start>=2400?f():l=e.requestAnimationFrame(p)},y=(P,N)=>{n.style[P]!==N&&(n.style[P]=N)},v=()=>{y("left",`${r.x}px`),y("top",`${r.y}px`)},b=null,x=null,z="",M=()=>{let P=(n?.closest("[data-shell-overlay]")??n?.ownerDocument?.querySelector?.("[data-shell-overlay]"))?.getBoundingClientRect(),N=e.visualViewport,I=Math.max(P?.left??0,N?.offsetLeft??0),H=Math.max(P?.top??0,N?.offsetTop??0),Z=Math.min(P?.right??e.innerWidth,(N?.offsetLeft??0)+(N?.width??e.innerWidth)),L=Math.min(P?.bottom??e.innerHeight,(N?.offsetTop??0)+(N?.height??e.innerHeight)),K=parseFloat(e.getComputedStyle(n).getPropertyValue("--dsh-frame-top-clearance"))||0;return{left:I,top:H+K,right:Z,bottom:L}},$=P=>{if(!n)return;let N=Number.isFinite(P?.width)&&Number.isFinite(P?.height),I=N&&i?i.box:M();y("maxWidth",`${Math.max(1,I.right-I.left-24)}px`),y("maxHeight",`${Math.max(1,I.bottom-I.top-24)}px`);let H=N?P:n.getBoundingClientRect();i={box:I,size:{width:H.width,height:H.height}},r=co(r??{x:I.right-H.width-20,y:I.bottom-H.height-20},I,H),v(),!o&&!u&&S("resize")},j=()=>{c!==null&&e.cancelAnimationFrame?.(c),c=null},W=()=>{j();let P=s;s=null,!(!o||!n||!P)&&(r=co(P,i.box,i.size),v(),S("move"))},U=P=>{n?.dataset&&(P&&["left","right","top","bottom"].includes(P.edge)&&["preview","docked"].includes(P.phase)?(n.dataset.whaleDockEdge=P.edge,n.dataset.whaleDockPhase=P.phase):(delete n.dataset.whaleDockEdge,delete n.dataset.whaleDockPhase))},E=()=>{let P=x;x=null;try{P?.dispose()}catch{}U(null),n&&(n.style.zIndex=z)},S=P=>{try{typeof x?.[P]=="function"&&x[P]()}catch{E()}},k=()=>{if(E(),!(!n||b?.version!==1||typeof b.register!="function"))try{x=b.register({id:"whale-voice",read(){let{box:P,size:N}=i;return{rect:{...r,width:N.width,height:N.height},bounds:{x:P.left+12,y:P.top+12,width:Math.max(1,P.right-P.left-24),height:Math.max(1,P.bottom-P.top-24)},collapsed:n.hasAttribute?.("data-collapsed")===!0}},apply(P){!n||!Number.isFinite(P?.x)||!Number.isFinite(P?.y)||(r=co(P,i.box,i.size),v())},onDock:U,onFront:P=>{n&&(n.style.zIndex=P===!0?"901":"900")}}),["beginDrag","move","endDrag","resize","detach","dispose"].every(P=>typeof x?.[P]=="function")||E()}catch{E()}},C=(P=!1,N=!1)=>{P?W():(j(),s=null);let I=o;o=null,I?.target.hasPointerCapture?.(I.id)&&I.target.releasePointerCapture(I.id);let H=d(),Z=I?.samples??[],L=Z.at(-1),K=Z[0],de=L&&K?L.time-K.time:0,ue=L?H-L.time:1/0,Q=Math.max(0,1-Math.max(0,ue-24)/56),G=de>0?(L.x-K.x)/de*Q:0,A=de>0?(L.y-K.y)/de*Q:0;if(I&&N&&!m?.matches&&n?.dataset?.motion!=="off"&&typeof e.requestAnimationFrame=="function"&&Math.hypot(G,A)>.04){let ne=co({x:r.x+G*240,y:r.y+A*240},i.box,i.size),pe=(ge,Ie)=>({target:ne[ge],tau:Ie?Math.max(1,Math.abs((ne[ge]-r[ge])/Ie)):240});u={x:pe("x",G),y:pe("y",A),time:H,start:H},l=e.requestAnimationFrame(p)}else I&&S(P?"endDrag":"detach")},R=()=>{f(),C(),E(),t?.disconnect(),t=null,e.removeEventListener("resize",$),e.visualViewport?.removeEventListener("resize",$),e.visualViewport?.removeEventListener("scroll",$),n=null,i=null};return{ref(P){if(P===n||(R(),!P))return;n=P,z=P.style.zIndex||"",n.style.transitionProperty="none",t=new e.ResizeObserver(I=>{let H=I?.find?.(L=>L.target===n),Z=H?.borderBoxSize?.[0]??H?.borderBoxSize;Number.isFinite(Z?.inlineSize)&&Number.isFinite(Z?.blockSize)&&I.every(L=>L.target===n)?$({width:Z.inlineSize,height:Z.blockSize}):$()}),t.observe(n);let N=n.closest("[data-shell-overlay]")??n.ownerDocument?.querySelector?.("[data-shell-overlay]");N&&t.observe(N),e.addEventListener("resize",$),e.visualViewport?.addEventListener("resize",$),e.visualViewport?.addEventListener("scroll",$),$(),k()},useLayoutService(P){return b=P,k(),()=>{b===P&&(E(),b=null,$())}},activate(){f(),S("activate")},pointerDown(P,N=P.currentTarget){P.button!==0||P.pointerType&&P.pointerType!=="mouse"||!n||(f(),$(),S("beginDrag"),o={id:P.pointerId,target:N,x:P.clientX,y:P.clientY,start:{...r},samples:[{x:P.clientX,y:P.clientY,time:d()}]},N.setPointerCapture(P.pointerId),P.preventDefault())},pointerMove(P){if(!o||P.pointerId!==o.id)return;let N=d(),I=[P];try{I=[...P.getCoalescedEvents?.()??[],P]}catch{}for(let K of I){if(!Number.isFinite(K.clientX)||!Number.isFinite(K.clientY))continue;let de=Number.isFinite(K.timeStamp)&&Number.isFinite(P.timeStamp)?Math.min(0,K.timeStamp-P.timeStamp):0,ue=N+Math.max(-60,de),Q=o.samples.at(-1);if(ue<Q.time)continue;let G={x:K.clientX,y:K.clientY,time:ue};ue===Q.time?o.samples[o.samples.length-1]=G:o.samples.push(G)}let H=N-60;for(;o.samples.length>2&&o.samples[1].time<=H;)o.samples.shift();let Z=o.samples[0],L=o.samples[1];if(L&&Z.time<H&&L.time>H){let K=(H-Z.time)/(L.time-Z.time);o.samples[0]={x:Z.x+(L.x-Z.x)*K,y:Z.y+(L.y-Z.y)*K,time:H}}s={x:o.start.x+P.clientX-o.x,y:o.start.y+P.clientY-o.y},typeof e.requestAnimationFrame!="function"?W():c===null&&(c=e.requestAnimationFrame(W))},pointerEnd(P){P.pointerId===o?.id&&C(!["pointercancel","lostpointercapture"].includes(P.type),P.type==="pointerup")},keyDown(){},fit:$,dispose:R}}var ji=Object.freeze({panel:320,settings:660,setup:420,collapsed:216});function Ku(e=window,{onResize:n=()=>{}}={}){let t=null,o=null,r=null,i=null,s=null,c=null,l=null,u=null,d=null,m=null,f=null,p=null,y=null,v=null,b=null,x=null,z={width:0,height:0},M=e.matchMedia?.("(prefers-reduced-motion: reduce)"),$=()=>M?.matches?"off":t?.dataset.motion??"spring",j=P=>Number.parseFloat(P)||0;function W(){let P=e.visualViewport,N=(t.closest?.("[data-shell-overlay]")??t.ownerDocument?.querySelector?.("[data-shell-overlay]"))?.getBoundingClientRect(),I=Math.max(N?.left??0,P?.offsetLeft??0),H=Math.max(N?.top??0,P?.offsetTop??0),Z=Math.min(N?.right??e.innerWidth,(P?.offsetLeft??0)+(P?.width??e.innerWidth)),L=Math.min(N?.bottom??e.innerHeight,(P?.offsetTop??0)+(P?.height??e.innerHeight)),K=e.getComputedStyle(t);return{width:Math.max(1,Z-I-24),height:Math.max(1,Math.min((L-H)*.6,L-H-24-j(K.getPropertyValue("--dsh-frame-top-clearance")))),chrome:j(K.paddingTop)+j(K.paddingBottom)+j(K.borderTopWidth)+j(K.borderBottomWidth),horizontalChrome:j(K.paddingLeft)+j(K.paddingRight)+j(K.borderLeftWidth)+j(K.borderRightWidth),panelRadius:j(K.getPropertyValue("--dsw-radius-lg"))||12}}function U(){l!==null&&e.cancelAnimationFrame(l),l=null,d=null}function E(){!t||!m||(m.width=Math.max(1,Math.min(m.width,p.width)),m.height=Math.max(1,Math.min(m.height,p.height)),t.style.width=`${m.width.toFixed(3)}px`,t.style.height=`${m.height.toFixed(3)}px`,t.style.setProperty?.("--whale-visible-content",`${Math.max(1,m.height-p.chrome)}px`),x===null?t.style.removeProperty?.("--whale-animated-radius"):t.style.setProperty?.("--whale-animated-radius",`${x.toFixed(2)}px`),n({width:m.width,height:m.height}))}function S(P){if(l=null,!t||!f)return;let N=Math.min(.032,Math.max(.001,d===null?1/60:(P-d)/1e3));d=P;let I=b?560:$()==="firm"?420:360,H=b?47.4:$()==="firm"?41:30,Z=!0;for(let L of["width","height"]){for(let K=0;K<4;K++)z[L]+=(I*(f[L]-m[L])-H*z[L])*N/4,m[L]+=z[L]*N/4;(Math.abs(f[L]-m[L])>.25||Math.abs(z[L])>1)&&(Z=!1)}if(b){let L=f.height-b.height,K=Math.abs(L)>.25?Math.max(0,Math.min(1,(m.height-b.height)/L)):1,de=y?f.height/2:p.panelRadius;x=b.radius+(de-b.radius)*K}(Z||$()==="off")&&(m={...f},z={width:0,height:0},d=null,b=x=null),E(),!Z&&$()!=="off"&&(l=e.requestAnimationFrame(S))}function k(){if(!t||!o)return;p=W(),t.dataset.compactHeight=p.height<300?"true":"false";let P=t.hasAttribute("data-collapsed")&&t.dataset.collapsed!=="false";if(m&&y!==null&&P!==y){let ge=x??(y?m.height/2:p.panelRadius);b={height:m.height,radius:ge},x=ge,t.style.setProperty?.("--whale-animated-radius",`${ge.toFixed(2)}px`),z={width:0,height:0}}let N=t.dataset.view,I=t.dataset.sourcePending&&N==="home"&&v===N&&!P&&y===P?f?.height:void 0;y=P,v=N;let H=Math.min(p.width,P?ji.collapsed:ji[N]??ji.panel);t.style.boxSizing="border-box",t.style.transitionProperty="none",t.style.overflow="hidden",t.style.maxWidth=`${p.width}px`,t.style.maxHeight=`${p.height}px`;let Z=Math.max(1,p.height-p.chrome);o.style.width=`${Math.max(1,H-p.horizontalChrome)}px`,o.style.maxHeight=`${Z}px`,o.style.overflowY="hidden",o.style.minHeight="0",t.style.setProperty?.("--whale-content-limit",`${Z}px`);let L=!!o.querySelector?.('[data-size-detail="true"]'),K=P?null:N==="setup"?o.querySelector?.("[data-whale-intrinsic]"):N==="home"&&!L?o.querySelector?.("[data-home-controls]"):null,de=K?.querySelector?.("[data-whale-natural-content]"),ue=de??K;N==="setup"&&!P&&(o.style.height="auto"),ue!==c&&(s?.disconnect(),u!==null&&e.cancelAnimationFrame(u),u=null,s=null,c=ue,c&&e.ResizeObserver&&(s=new e.ResizeObserver(()=>{u===null&&(u=e.requestAnimationFrame(()=>{u=null,k()}))}),s.observe(c)));let Q=K?.getBoundingClientRect?.().height,G=de?Math.max(0,de.offsetHeight-de.parentElement.clientHeight):0,A=Q+G,ne=P?44:A>0?Math.ceil(A+p.chrome):N==="home"?L?520:320:480,pe=Math.min(p.height,I??ne);(N!=="setup"||P)&&(o.style.height=`${Math.max(1,pe-p.chrome)}px`),f={width:H,height:pe},!m||$()==="off"?(U(),m={...f},z={width:0,height:0},b=x=null,E()):l===null&&(Math.abs(m.width-H)>.25||Math.abs(m.height-pe)>.25)&&(d=e.performance?.now?.()??null,l=e.requestAnimationFrame(S))}function C(){U(),r?.disconnect(),i?.disconnect(),s?.disconnect(),u!==null&&e.cancelAnimationFrame(u),u=null,s=c=null,e.removeEventListener("resize",k),e.visualViewport?.removeEventListener("resize",k),e.visualViewport?.removeEventListener("scroll",k),M?.removeEventListener?.("change",k),r=i=null}function R(){if(C(),!(!t||!o)){if(e.ResizeObserver){r=new e.ResizeObserver(k);let P=t.closest?.("[data-shell-overlay]")??t.ownerDocument?.querySelector?.("[data-shell-overlay]");P&&r.observe(P)}e.MutationObserver&&(i=new e.MutationObserver(k),i.observe(t,{attributes:!0,attributeFilter:["data-view","data-motion","data-collapsed","data-source-pending"]}),i.observe(o,{attributes:!0,attributeFilter:["data-size-detail","data-home-layout"],subtree:!0})),e.addEventListener("resize",k),e.visualViewport?.addEventListener("resize",k),e.visualViewport?.addEventListener("scroll",k),M?.addEventListener?.("change",k),k()}}return{ref(P){t!==P&&(t=P,m=f=y=v=b=x=null,z={width:0,height:0},R())},contentRef(P){o!==P&&(o=P,R())},update:k,dispose(){C(),t=o=m=f=null}}}var Xu=["spring","firm","off"];function Yu(e=window){let n="dsh-whale-voice:motion:v1",t="dsh-whale-voice:assistant-name:v1",o=()=>{try{let u=e.localStorage.getItem(t)?.trim();return u&&u.length<=40?u:null}catch{return null}},r=new Set,i=()=>{try{let u=e.localStorage.getItem(n);return Xu.includes(u)?u:"spring"}catch{return"spring"}},s={motion:i(),assistantName:o(),error:null},c=u=>{s=u;for(let d of r)d()},l=u=>{[n,t,null].includes(u.key)&&c({motion:i(),assistantName:o(),error:null})};return e.addEventListener("storage",l),{getSnapshot:()=>s,subscribe(u){return r.add(u),()=>r.delete(u)},setMotion(u){if(!Xu.includes(u))return!1;let d=null;try{e.localStorage.setItem(n,u)}catch{d="storage-unavailable"}return c({...s,motion:u,error:d}),!d},setAssistantName(u){if(typeof u!="string"||!u.trim()||u.trim().length>40)return!1;let d=u.trim(),m=null;try{e.localStorage.setItem(t,d)}catch{m="storage-unavailable"}return c({...s,assistantName:d,error:m}),!m},dispose(){e.removeEventListener("storage",l),r.clear()}}}var wh='button,input,textarea,select,a,label,summary,[role="button"],[role="slider"],[role="tab"],[contenteditable="true"],[data-no-drag]';function Qu(e,n){if(!e||!n?.contains(e))return!1;let t=e.closest?.(wh);return!t||t.hasAttribute("data-drag-surface")}function ed(e){if(e.repeat||e.metaKey)return null;let n=e.code;return!/^(F([1-9]|1[0-9]|2[0-4])|Key[A-Z]|Digit[0-9]|Space)$/.test(n)||e.altKey&&n==="F4"?null:{code:n,modifiers:[e.ctrlKey&&"Control",e.altKey&&"Alt",e.shiftKey&&"Shift"].filter(Boolean)}}var rr=()=>({revision:0,rootSessionId:null,title:null,latest:null,items:[],inputActive:!1,inputError:null,playbackConfirmed:!1}),Ni=()=>({schema:1,hardware:null,compute:{schema:1,default:"cpu",observedAt:null,backends:{},reason:"\u5C1A\u672A\u68C0\u6D4B\u672C\u5730\u8BA1\u7B97\u540E\u7AEF\u3002"},models:[],jobs:[]});async function nd(e,n=()=>{}){let t=await e.remote.$mount(Ru),o,r;try{if(r=e.inject(["remote","remote.whaleConversation"],d=>{o=d.remote.whaleConversation}),await r.await(),!o)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA")}catch(d){throw await r?.dispose(),await t(),d}let i=new Set,s=new Map,c=!1,l=d=>{if(d?.ok!==!0)throw d?.error??new Error("\u8BED\u97F3\u63A5\u53E3\u54CD\u5E94\u65E0\u6548");return d.value},u=async(d,m,f=!0)=>{let p;try{p=await d()}catch(y){throw f&&!c&&n("ui-request","finished",m?.aborted?"cancelled":"failed"),y}return f&&p?.ok!==!0&&p?.error==null&&!m?.aborted&&n("ui-render-error","finished","failed"),l(p)};return{subscribeUpdates(d,m){let f=new AbortController;return i.add(f),Promise.resolve().then(async()=>{if(!f.signal.aborted)try{for await(let p of o.followUpdates(f.signal))f.signal.aborted||d(p);f.signal.aborted||(n("ui-stream","finished","failed"),m())}catch{f.signal.aborted||(n("ui-stream","finished","failed"),m())}finally{i.delete(f)}}),()=>{f.abort(),i.delete(f)}},updateAction(d,m){if(c)throw new Error("\u66F4\u65B0\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.updateAction(d,m),m)},subscribePresentation(d,m){let f=new AbortController;return i.add(f),(async()=>{try{for await(let p of o.followPresentation(f.signal))f.signal.aborted||d(p);f.signal.aborted||(n("ui-stream","finished","failed"),m(new Error("\u4F1A\u8BDD\u663E\u793A\u8FDE\u63A5\u5DF2\u7ED3\u675F")))}catch(p){f.signal.aborted||(n("ui-stream","finished","failed"),m(p))}finally{i.delete(f)}})(),()=>{f.abort(),i.delete(f)}},subscribe(d,m,f=()=>{}){let p=new AbortController;return i.add(p),m(rr(),{initial:!0}),(async()=>{try{for await(let y of o.follow(d,p.signal))p.signal.aborted||m(y);p.signal.aborted||(n("ui-stream","finished","failed"),m(rr(),{initial:!0}),f(new Error("\u8BED\u97F3\u72B6\u6001\u8FDE\u63A5\u5DF2\u7ED3\u675F\uFF0C\u6B63\u5728\u91CD\u65B0\u8FDE\u63A5")))}catch(y){p.signal.aborted||(n("ui-stream","finished","failed"),m(rr(),{initial:!0}),f(y))}finally{i.delete(p)}})(),()=>{p.abort(),i.delete(p),m(rr(),{initial:!0})}},subscribeModels(d,m,f=()=>{}){if(c)return m(Ni(),{initial:!0}),f(new Error("\u6A21\u578B\u8FDB\u5EA6\u63A5\u53E3\u5DF2\u5378\u8F7D")),()=>{};let p=new AbortController,y=!1,v=()=>{y||(y=!0,p.abort(),s.delete(p),m(Ni(),{initial:!0}))};return s.set(p,v),m(Ni(),{initial:!0}),(async()=>{try{for await(let b of o.followModels(d,p.signal))!y&&!c&&!p.signal.aborted&&m(b);!y&&!c&&!p.signal.aborted&&(n("ui-stream","finished","failed"),v(),f(new Error("\u6A21\u578B\u8FDB\u5EA6\u8FDE\u63A5\u5DF2\u7ED3\u675F\uFF0C\u6B63\u5728\u91CD\u65B0\u8FDE\u63A5")))}catch(b){!y&&!c&&!p.signal.aborted&&(n("ui-stream","finished","failed"),v(),f(b))}finally{s.delete(p)}})(),v},async action(d,m,f){if(c)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");let p=await u(()=>o.action(d,m,f),f);try{let y=JSON.parse(p);if(y?.protocol!==1||y.action!==m.action||!y.value||typeof y.value!="object"||Array.isArray(y.value))throw new Error("Fish Voice UI protocol mismatch");return y.value}catch(y){throw n("ui-render-error","finished","failed"),y}},readAuthorization:d=>u(()=>o.readAuthorization(d),d),saveAuthorization:(d,m)=>u(()=>o.saveAuthorization(d,m),m),async senseVoiceAsrAction(d,m){if(c)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.senseVoiceAsrAction(d,m),m)},async manageSessions(d,m,f){if(c)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");return JSON.parse(await u(()=>o.manageSessions(d,m,f),f))},listExistingVoiceSessions(d,m){if(c)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.listExistingVoiceSessions(d,m),m)},setExistingVoiceSession(d,m){if(c)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.setExistingVoiceSession(d,m),m)},retryVoiceTranscript(d,m){if(c)throw new Error("\u8BED\u97F3\u91CD\u53D1\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.retryVoiceTranscript(d,m),m)},readClientOperationScope(d){if(c)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.readClientOperationScope(d),d,!1)},recordClientOperations(d,m){if(c)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.recordClientOperations(d,m),m,!1)},readOperationLog(d,m){if(c)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.readOperationLog(d,m),m,!1)},readSetup:d=>u(()=>o.readSetup(d),d),readVolume:(d,m)=>u(()=>o.readVolume(d,m),m),setVolume:(d,m,f)=>u(()=>o.setVolume(d,m,f),f),async dispose(){c=!0;for(let d of[...s.values()])d();s.clear();for(let d of i)d.abort();i.clear(),await r.dispose(),await t()}}}var rd=new Set(nr),id=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,td=256,Ai="dsh-fish-voice.pending-operation-log.v1",Ei="ui-buffer-overflow";function xh(){let e=globalThis.crypto;if(e?.randomUUID)return e.randomUUID();let n=e?.getRandomValues(new Uint8Array(16));if(!n)return null;n[6]=n[6]&15|64,n[8]=n[8]&63|128;let t=Array.from(n,o=>o.toString(16).padStart(2,"0")).join("");return[t.slice(0,8),t.slice(8,12),t.slice(12,16),t.slice(16,20),t.slice(20)].join("-")}function _h(){try{return globalThis.sessionStorage}catch{return}}function od(e,n=!1){if(!e||typeof e.id!="string"||!id.test(e.id)||!Number.isSafeInteger(e.at)||e.at<0||!rd.has(e.action)||!["user","ui"].includes(e.source)||n!==(e.action===Ei)||n&&(e.source!=="ui"||!Number.isSafeInteger(e.count)||e.count<1))return null;let{id:t,at:o,action:r,source:i}=e;return{id:t,at:o,action:r,source:i,...n?{count:e.count}:{},...["requested","finished"].includes(e.phase)?{phase:e.phase}:{},...["ok","failed","cancelled"].includes(e.result)?{result:e.result}:{}}}function sd({schedule:e=setTimeout,unschedule:n=clearTimeout,now:t=Date.now,identify:o=xh,storage:r=_h()}={}){let i=[],s=null,c=null,l=null,u=!1,d,m,f,p=0,y=!1,v=()=>{m!==void 0&&(n(m),m=void 0)},b=k=>k&&k.at>=t()-Uu,x=()=>{i=i.filter(b),b(s)||(s=null),b(c)||(c=null)},z=()=>i.length>0||s!==null||c!==null,M=()=>{if(!(!l||!r))try{z()?r.setItem(Ai,JSON.stringify({scope:l,pending:i,overflow:s,dropped:c})):r.removeItem(Ai)}catch{}},$=(k,C)=>{c={count:Math.min(Number.MAX_SAFE_INTEGER,(c?.count??0)+k),at:Math.max(c?.at??0,C)}},j=k=>{i.length>=td?$(1,k.at):i.push(k)},W=k=>{if(l===null){let C;try{C=JSON.parse(r?.getItem(Ai)??"null")}catch{}if(C?.scope===k){let R=i,P=c,N=Array.isArray(C.pending)?C.pending.slice(0,td).map(I=>od(I)).filter(b):[];i=[...new Map(N.map(I=>[I.id,I])).values()],s=od(C.overflow,!0),c=C.dropped&&Number.isSafeInteger(C.dropped.count)&&C.dropped.count>0&&Number.isSafeInteger(C.dropped.at)&&b(C.dropped)?{count:C.dropped.count,at:C.dropped.at}:null,P&&$(P.count,P.at);for(let I of R)b(I)&&j(I)}}else l!==k&&(i=[],s=null,c=null);l=k,u=!0,x(),M()},U=(k=160)=>{y||f||m!==void 0||u&&!z()||!d?.readClientOperationScope||!d?.recordClientOperations||(m=e(()=>{m=void 0,E()},k),m?.unref?.())};async function E(){let k=new AbortController,C=d;f=k;let R=()=>!y&&d===C&&f===k;try{let P=AbortSignal.any([k.signal,AbortSignal.timeout(1e4)]);if(!u){let Z=await C.readClientOperationScope(P);if(!R())return;if(typeof Z?.scope!="string"||!id.test(Z.scope))throw new Error("Operation scope unavailable");W(Z.scope)}if(x(),!s&&c){let Z=o();Z&&(s={id:Z,at:c.at,action:Ei,source:"ui",phase:"finished",count:c.count},c=null)}M();let N=s?[s,...i.slice(0,ro-1)]:i.slice(0,ro);if(!N.length)return;let I=await C.recordClientOperations({scope:l,events:N},P);if(!R())return;if(I?.accepted!==!0)throw new Error("Operation batch was not accepted");let H=new Set(N.map(Z=>Z.id));i=i.filter(Z=>!H.has(Z.id)),s&&H.has(s.id)&&(s=null),p=0,M()}catch{R()&&(u=!1,p++)}finally{R()&&(f=void 0,U(p?Math.min(3e4,750*2**Math.min(p-1,6)):160))}}function S(k,C,R,P){if(y||!rd.has(k)||k===Ei)return;let N;try{N=o()}catch{return}N&&(x(),j({id:N,at:t(),action:k,source:C,...R?{phase:R}:{},...P?{result:P}:{}}),M(),U())}return{user(k){S(k,"user")},internal(k,C,R){S(k,"ui",C,R)},attach(k){d===k||y||(v(),f?.abort(),f=void 0,d=k,u=!1,p=0,U(0))},dispose(){y=!0,v(),f?.abort(),i=[],s=null,c=null}}}var Id=require("react-dom");var Be=require("react"),ir=require("@deepseek-ai/dsh-client-ui-primitives");var h={audioDeviceGrid:"jUsoPW_audioDeviceGrid",voicePromptCount:"jUsoPW_voicePromptCount",iconButton:"jUsoPW_iconButton",radios:"jUsoPW_radios",bubbleStatus:"jUsoPW_bubbleStatus",voicePrompt:"jUsoPW_voicePrompt",popover:"jUsoPW_popover",settingsLayout:"jUsoPW_settingsLayout",panelViewport:"jUsoPW_panelViewport",voicePromptMode:"jUsoPW_voicePromptMode",requestDetails:"jUsoPW_requestDetails",note:"jUsoPW_note",primary:"jUsoPW_primary",sessionRename:"jUsoPW_sessionRename",newMessages:"jUsoPW_newMessages",details:"jUsoPW_details",markSmall:"jUsoPW_markSmall",notice:"jUsoPW_notice",field:"jUsoPW_field",existingSessionHome:"jUsoPW_existingSessionHome",recentMessages:"jUsoPW_recentMessages",settings:"jUsoPW_settings",existingSessionTarget:"jUsoPW_existingSessionTarget",settingsBody:"jUsoPW_settingsBody",header:"jUsoPW_header",editNotice:"jUsoPW_editNotice",volumeRow:"jUsoPW_volumeRow",agreement:"jUsoPW_agreement",quickSpeedHeader:"jUsoPW_quickSpeedHeader",spin:"jUsoPW_spin",whalePageEnter:"jUsoPW_whalePageEnter",inlineField:"jUsoPW_inlineField",homeTargetPicker:"jUsoPW_homeTargetPicker",audioDeviceNotice:"jUsoPW_audioDeviceNotice",currentDshAction:"jUsoPW_currentDshAction",whaleEnter:"jUsoPW_whaleEnter",disclosureRow:"jUsoPW_disclosureRow",voiceTarget:"jUsoPW_voiceTarget",settingsNav:"jUsoPW_settingsNav",deviceSelect:"jUsoPW_deviceSelect",openOriginal:"jUsoPW_openOriginal",voiceBars:"jUsoPW_voiceBars",quickActions:"jUsoPW_quickActions",popoverHeader:"jUsoPW_popoverHeader",inlineActions:"jUsoPW_inlineActions",voicePromptInput:"jUsoPW_voicePromptInput",voiceStatus:"jUsoPW_voiceStatus",currentDshTarget:"jUsoPW_currentDshTarget",brand:"jUsoPW_brand",existingSessionSearch:"jUsoPW_existingSessionSearch",pathRow:"jUsoPW_pathRow",backButton:"jUsoPW_backButton",bindingEditor:"jUsoPW_bindingEditor",mark:"jUsoPW_mark",audioDeviceField:"jUsoPW_audioDeviceField",panelContent:"jUsoPW_panelContent",mouseBinding:"jUsoPW_mouseBinding",quickSpeed:"jUsoPW_quickSpeed",placeholder:"jUsoPW_placeholder",updateHeader:"jUsoPW_updateHeader",authorizationSteps:"jUsoPW_authorizationSteps",section:"jUsoPW_section",assistantNameInput:"jUsoPW_assistantNameInput",updateAnnouncement:"jUsoPW_updateAnnouncement",fullName:"jUsoPW_fullName",error:"jUsoPW_error",existingSessionPicker:"jUsoPW_existingSessionPicker",historyScope:"jUsoPW_historyScope",modelNav:"jUsoPW_modelNav",whalePreview:"jUsoPW_whalePreview",modelHeading:"jUsoPW_modelHeading",settingsBrand:"jUsoPW_settingsBrand",guideButton:"jUsoPW_guideButton",authorizationActions:"jUsoPW_authorizationActions",formActions:"jUsoPW_formActions",conversationOptions:"jUsoPW_conversationOptions",pageHeading:"jUsoPW_pageHeading",audioDevices:"jUsoPW_audioDevices",whaleInputPulse:"jUsoPW_whaleInputPulse",quickConversation:"jUsoPW_quickConversation",keyBinding:"jUsoPW_keyBinding",authorizationBody:"jUsoPW_authorizationBody",status:"jUsoPW_status",permissionList:"jUsoPW_permissionList",motionPreview:"jUsoPW_motionPreview",sessionTitle:"jUsoPW_sessionTitle",transcriptRetryList:"jUsoPW_transcriptRetryList",bindingActions:"jUsoPW_bindingActions",existingSessionList:"jUsoPW_existingSessionList",message:"jUsoPW_message",sliderLabel:"jUsoPW_sliderLabel",voicePromptActions:"jUsoPW_voicePromptActions",assistantName:"jUsoPW_assistantName",messageName:"jUsoPW_messageName",whaleFeedback:"jUsoPW_whaleFeedback",backIcon:"jUsoPW_backIcon",settingsPage:"jUsoPW_settingsPage",updateDialog:"jUsoPW_updateDialog",conversationHeader:"jUsoPW_conversationHeader",quickSegments:"jUsoPW_quickSegments",whaleSpin:"jUsoPW_whaleSpin",transcriptRetryText:"jUsoPW_transcriptRetryText",segmented:"jUsoPW_segmented",bubble:"jUsoPW_bubble",newChatButton:"jUsoPW_newChatButton",transcriptRetries:"jUsoPW_transcriptRetries",bubbleBrand:"jUsoPW_bubbleBrand",hint:"jUsoPW_hint",performanceChoice:"jUsoPW_performanceChoice",homeTargetRow:"jUsoPW_homeTargetRow",actions:"jUsoPW_actions",authorization:"jUsoPW_authorization",whaleBreathe:"jUsoPW_whaleBreathe",quickHint:"jUsoPW_quickHint",floating:"jUsoPW_floating",conversationChoice:"jUsoPW_conversationChoice",headerActions:"jUsoPW_headerActions",keyBindingRow:"jUsoPW_keyBindingRow",mainAction:"jUsoPW_mainAction",audioDeviceHint:"jUsoPW_audioDeviceHint",statusRow:"jUsoPW_statusRow",volumeControl:"jUsoPW_volumeControl",ellipsis:"jUsoPW_ellipsis",settingsHeader:"jUsoPW_settingsHeader",currentModel:"jUsoPW_currentModel",caption:"jUsoPW_caption",capabilityRow:"jUsoPW_capabilityRow",loadHistory:"jUsoPW_loadHistory",transcriptRetry:"jUsoPW_transcriptRetry",text:`.jUsoPW_floating {
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

[data-ds-dark-theme] .jUsoPW_floating {
  --whale-solid-base: var(--dsw-static-neutral-bluish-950, #181a1e);
}

.jUsoPW_floating[data-collapsed] {
  border-radius: var(--whale-animated-radius, 999px);
  corner-shape: round;
  width: 216px;
  padding: 4px;
}

.jUsoPW_floating[data-view="settings"] {
  width: 660px;
  padding: 0;
}

.jUsoPW_floating[data-view="setup"]:not([data-collapsed]) {
  width: 420px;
}

.jUsoPW_floating:active {
  cursor: grabbing;
}

.jUsoPW_floating[data-whale-dock-phase="preview"] {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

.jUsoPW_floating [hidden] {
  display: none !important;
}

.jUsoPW_floating [data-no-drag] {
  cursor: auto;
  touch-action: pan-y;
}

.jUsoPW_panelViewport {
  overscroll-behavior: contain;
  min-width: 0;
  min-height: 0;
  overflow-x: hidden;
}

.jUsoPW_panelContent {
  min-width: 0;
  animation: jUsoPW_whaleEnter var(--whale-duration) var(--whale-ease);
}

.jUsoPW_mark {
  flex: none;
  width: 24px;
  height: 24px;
}

.jUsoPW_markSmall {
  flex: none;
  width: 20px;
  height: 20px;
}

.jUsoPW_brand, .jUsoPW_header, .jUsoPW_headerActions, .jUsoPW_actions, .jUsoPW_statusRow, .jUsoPW_caption {
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.jUsoPW_brand {
  font-size: 15px;
}

.jUsoPW_header {
  justify-content: space-between;
  margin-bottom: 12px;
}

.jUsoPW_headerActions {
  gap: 2px;
}

.jUsoPW_actions {
  flex-wrap: wrap;
}

.jUsoPW_iconButton {
  flex: none;
  width: 32px;
  min-width: 32px;
  height: 32px;
  padding: 0;
}

.jUsoPW_newChatButton {
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

.jUsoPW_newChatButton svg {
  width: 14px;
  height: 14px;
}

.jUsoPW_ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
}

.jUsoPW_statusRow {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  margin-bottom: 10px;
  padding: 4px 6px;
}

.jUsoPW_statusRow[data-recording] {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 19%,var(--dsw-alias-bg-module-platform));
}

.jUsoPW_statusRow[data-recording] .jUsoPW_voiceStatus > svg {
  color: var(--dsw-alias-brand-primary);
}

.jUsoPW_status {
  flex: 1;
  min-width: 0;
  margin: 0;
  font-size: 12px;
  line-height: 18px;
}

.jUsoPW_voiceTarget {
  flex: 1;
  align-items: center;
  gap: 4px;
  min-width: 0;
  line-height: 18px;
  display: flex;
}

.jUsoPW_voiceTarget > span, .jUsoPW_existingSessionHome > span {
  color: var(--dsw-alias-label-secondary);
  flex: none;
  font-size: 11px;
}

.jUsoPW_voiceTarget strong {
  font-size: 13px;
  font-weight: 600;
}

.jUsoPW_voiceStatus {
  align-items: center;
  gap: 4px;
  max-width: 47%;
  display: flex;
}

.jUsoPW_voiceStatus > svg {
  flex: none;
  width: 14px;
  height: 14px;
}

.jUsoPW_statusRow[data-bound] {
  flex-direction: column;
  align-items: stretch;
  gap: 0;
}

.jUsoPW_statusRow[data-bound] .jUsoPW_voiceStatus {
  max-width: 100%;
}

.jUsoPW_mainAction {
  width: 100%;
  min-height: 36px;
  font-weight: 500;
}

.jUsoPW_primary {
  color: var(--dsw-alias-label-primary) !important;
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 16%,var(--dsw-alias-bg-layer-2)) !important;
  border: 1px solid var(--dsw-alias-border-l2) !important;
}

.jUsoPW_bubble {
  corner-shape: round;
  cursor: grab;
  touch-action: none;
  width: 100%;
  max-width: 100%;
  height: 36px;
  animation: jUsoPW_whaleEnter var(--whale-duration) var(--whale-ease);
  border-radius: 999px;
  justify-content: flex-start;
  gap: 8px;
}

.jUsoPW_bubble .jUsoPW_ellipsis {
  text-align: left;
  flex: 1;
}

.jUsoPW_caption {
  text-align: left;
  justify-content: flex-start;
  width: 100%;
  margin-top: 8px;
  padding: 6px 0;
  font-size: 12px;
}

.jUsoPW_caption .jUsoPW_ellipsis {
  flex: 1;
}

.jUsoPW_openOriginal {
  flex: none;
}

.jUsoPW_hint, .jUsoPW_quickHint {
  color: var(--dsw-alias-label-secondary);
  overflow-wrap: anywhere;
  font-size: 12px;
}

.jUsoPW_hint {
  margin: 6px 0;
}

.jUsoPW_quickHint {
  margin: 0;
  font-size: 11px;
}

.jUsoPW_notice, .jUsoPW_note, .jUsoPW_error {
  border-radius: var(--dsw-radius-sm);
  overflow-wrap: anywhere;
  background: var(--dsw-alias-bg-module-platform);
  margin: 8px 0;
  padding: 8px 10px;
  font-size: 12px;
}

.jUsoPW_notice, .jUsoPW_note {
  border-left: 2px solid var(--dsw-alias-state-warn-primary);
}

.jUsoPW_error {
  border-left: 2px solid var(--dsw-alias-state-error-primary);
}

.jUsoPW_error button {
  margin-top: 8px;
}

.jUsoPW_popover {
  box-sizing: border-box;
  cursor: auto;
  touch-action: auto;
  width: 100%;
  animation: jUsoPW_whaleEnter var(--whale-duration) var(--whale-ease);
  margin: 0 0 10px;
  padding: 12px;
  position: relative;
  overflow: auto;
}

.jUsoPW_popoverHeader {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  display: flex;
}

.jUsoPW_popoverHeader > button {
  width: 28px;
  padding: 0;
}

.jUsoPW_quickConversation {
  max-height: 160px;
}

.jUsoPW_recentMessages {
  gap: 6px;
  display: grid;
}

.jUsoPW_message {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  padding: 5px 8px;
}

.jUsoPW_message strong {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

.jUsoPW_message p {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  margin: 3px 0 0;
}

.jUsoPW_quickActions {
  gap: 6px;
  min-width: 0;
  display: grid;
}

.jUsoPW_quickSpeed {
  gap: 5px;
  padding-top: 4px;
  display: grid;
}

.jUsoPW_quickSpeedHeader {
  color: var(--dsw-alias-label-secondary);
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  display: flex;
}

.jUsoPW_quickSpeedHeader small {
  font-size: 11px;
}

.jUsoPW_quickSegments {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  gap: 3px;
  padding: 3px;
  display: grid;
}

.jUsoPW_quickSegments button {
  min-width: 0;
  height: 28px;
  min-height: 28px;
  padding: 0 5px;
  font-size: 12px;
}

.jUsoPW_quickSegments button[aria-pressed="true"] {
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: 0 1px 3px #0001;
}

.jUsoPW_settings {
  height: 100%;
  min-height: 0;
  color: var(--dsw-alias-label-primary);
  flex-direction: column;
  display: flex;
  overflow: hidden;
}

.jUsoPW_settingsHeader {
  box-sizing: border-box;
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 4px 10px;
  display: flex;
}

.jUsoPW_settingsHeader h2 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.jUsoPW_settingsBrand {
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 6px;
  min-width: 0;
  display: flex;
}

.jUsoPW_backButton, .jUsoPW_guideButton {
  flex: none;
  padding: 0 8px;
  font-size: 12px;
}

.jUsoPW_backIcon {
  transform: rotate(180deg);
}

.jUsoPW_settingsLayout {
  flex: 1;
  grid-template-rows: minmax(0, 1fr);
  grid-template-columns: 104px minmax(0, 1fr);
  min-height: 0;
  display: grid;
  overflow: hidden;
}

.jUsoPW_settingsNav {
  border-right: 1px solid var(--dsw-alias-border-l2);
  background: var(--dsw-alias-bg-module-platform);
  flex-direction: column;
  gap: 3px;
  min-height: 0;
  padding: 8px 6px;
  display: flex;
  overflow-y: auto;
}

.jUsoPW_settingsNav button {
  justify-content: flex-start;
  min-width: 0;
  min-height: 34px;
  padding: 0 12px;
  font-size: 12px;
}

.jUsoPW_settingsNav button[aria-pressed="true"] {
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: inset 2px 0 0 var(--dsw-alias-brand-primary);
  font-weight: 600;
}

.jUsoPW_settingsPage {
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  display: flex;
  overflow: hidden;
}

.jUsoPW_pageHeading {
  flex: none;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 10px 12px 8px;
  display: flex;
}

.jUsoPW_pageHeading h3 {
  margin: 0;
  font-size: 15px;
}

.jUsoPW_pageHeading p {
  color: var(--dsw-alias-label-secondary);
  margin: 3px 0 0;
  font-size: 12px;
}

.jUsoPW_settingsBody {
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

.jUsoPW_settingsBody > .jUsoPW_section, .jUsoPW_settingsBody > div > .jUsoPW_section {
  margin: 0 0 12px;
}

.jUsoPW_section {
  align-content: start;
  gap: 8px;
  min-width: 0;
  display: grid;
}

.jUsoPW_section h3 {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
}

.jUsoPW_section p, .jUsoPW_section > .jUsoPW_section {
  margin: 0;
}

.jUsoPW_settingsBody > .jUsoPW_section + .jUsoPW_section {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

.jUsoPW_section summary {
  cursor: pointer;
  padding: 7px 0;
  font-size: 13px;
  font-weight: 500;
}

details.jUsoPW_section {
  border-top: 1px solid var(--dsw-alias-border-l2);
  display: block;
}

details.jUsoPW_section > :not(summary) {
  margin-top: 10px;
}

.jUsoPW_field {
  gap: 6px;
  font-size: 12px;
  display: grid;
}

.jUsoPW_field input {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}

.jUsoPW_deviceSelect {
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

.jUsoPW_radios {
  border: 0;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
  margin: 0;
  padding: 0;
  display: flex;
}

.jUsoPW_radios legend {
  margin-bottom: 6px;
  font-size: 12px;
}

.jUsoPW_radios label {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  cursor: pointer;
  align-items: center;
  gap: 6px;
  padding: 6px 9px;
  font-size: 12px;
  display: flex;
}

.jUsoPW_radios input {
  accent-color: var(--dsw-alias-brand-primary);
}

.jUsoPW_bindingEditor {
  gap: 14px;
  display: grid;
}

.jUsoPW_keyBinding {
  gap: 6px;
  display: grid;
}

.jUsoPW_keyBinding > :is(h3, p) {
  margin: 0;
}

.jUsoPW_keyBindingRow {
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 12px;
  min-width: 0;
  display: flex;
}

.jUsoPW_keyBindingRow > span {
  overflow-wrap: anywhere;
  min-width: 5em;
  font-size: 13px;
}

.jUsoPW_mouseBinding legend {
  font-size: 14px;
  font-weight: 600;
}

.jUsoPW_mouseBinding label {
  white-space: nowrap;
}

.jUsoPW_bindingActions {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

.jUsoPW_segmented {
  flex-wrap: wrap;
  gap: 4px;
  display: flex;
}

.jUsoPW_segmented button {
  min-width: 0;
  font-size: 12px;
}

.jUsoPW_segmented button[aria-pressed="true"], .jUsoPW_modelNav button[aria-pressed="true"] {
  background: var(--dsw-alias-interactive-bg-active);
  color: var(--dsw-alias-label-primary);
  box-shadow: inset 0 -2px 0 var(--dsw-alias-brand-primary);
}

.jUsoPW_modelNav {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  gap: 4px;
  margin-bottom: 12px;
  padding: 0 16px 10px;
  display: flex;
}

.jUsoPW_modelNav button {
  flex: 1;
  min-width: 0;
  padding: 0 6px;
  font-size: 12px;
}

.jUsoPW_sliderLabel {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  display: flex;
}

.jUsoPW_sliderLabel span {
  margin-left: auto;
}

.jUsoPW_sliderLabel input {
  width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
}

.jUsoPW_formActions {
  padding-top: 4px;
}

.jUsoPW_formActions button {
  min-width: 100px;
}

.jUsoPW_editNotice {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 8px;
  display: flex;
}

.jUsoPW_editNotice div {
  flex: 1;
  min-width: 0;
}

.jUsoPW_editNotice strong {
  font-size: 12px;
}

.jUsoPW_editNotice p {
  color: var(--dsw-alias-label-secondary);
  margin: 3px 0 0;
  font-size: 12px;
}

.jUsoPW_editNotice button {
  flex: none;
  font-size: 12px;
}

.jUsoPW_details {
  grid-template-columns: auto minmax(0, 1fr);
  gap: 6px 12px;
  margin: 0;
  font-size: 12px;
  display: grid;
}

.jUsoPW_details dt {
  color: var(--dsw-alias-label-secondary);
}

.jUsoPW_details dd {
  overflow-wrap: anywhere;
  margin: 0;
}

.jUsoPW_capabilityRow {
  display: contents;
}

.jUsoPW_requestDetails {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  max-height: 200px;
  padding: 8px;
  font-size: 11px;
  overflow: auto;
}

.jUsoPW_placeholder {
  text-align: center;
  min-height: 140px;
  color: var(--dsw-alias-label-secondary);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  display: flex;
}

.jUsoPW_placeholder h3, .jUsoPW_placeholder p {
  margin: 0;
}

.jUsoPW_placeholder svg {
  width: 32px;
  height: 32px;
}

.jUsoPW_motionPreview {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  width: 40px;
  height: 32px;
  animation: jUsoPW_whalePreview var(--whale-duration) var(--whale-ease);
  place-items: center;
  display: grid;
}

.jUsoPW_settings a {
  color: var(--dsw-alias-link);
  text-underline-offset: 2px;
  overflow-wrap: anywhere;
}

.jUsoPW_updateDialog {
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

.jUsoPW_updateDialog::backdrop {
  background: #0005;
}

.jUsoPW_updateHeader {
  align-items: center;
  gap: 8px;
  display: flex;
}

.jUsoPW_updateHeader h2 {
  margin: 0;
  font-size: 16px;
}

.jUsoPW_updateAnnouncement {
  white-space: pre-line;
  overflow-wrap: anywhere;
}

.jUsoPW_updateDialog .jUsoPW_actions {
  margin-top: 12px;
}

.jUsoPW_updateDialog a {
  color: var(--dsw-alias-link);
  text-underline-offset: 2px;
}

.jUsoPW_authorization {
  height: auto;
  max-height: min(var(--whale-content-limit, 60vh),var(--whale-visible-content, 60vh));
}

.jUsoPW_authorization .jUsoPW_settingsHeader {
  min-height: 42px;
  padding: 0 0 10px;
}

.jUsoPW_authorization .jUsoPW_settingsHeader h2 {
  flex: 1;
  font-size: 16px;
}

.jUsoPW_authorizationBody {
  overscroll-behavior: contain;
  flex: 1;
  min-height: 0;
  padding-right: 6px;
  overflow-y: auto;
}

.jUsoPW_authorizationActions {
  border-top: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  padding: 10px 0 0;
}

.jUsoPW_authorizationBody > [data-whale-natural-content] {
  display: flow-root;
}

.jUsoPW_permissionList {
  gap: 0;
  margin: 12px 0;
  padding: 0;
  list-style: none;
  display: grid;
}

.jUsoPW_permissionList li {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  padding: 10px 0;
}

.jUsoPW_permissionList p {
  margin: 3px 0 0;
}

.jUsoPW_permissionList strong {
  font-size: 13px;
}

.jUsoPW_sessionTitle {
  overflow-wrap: anywhere;
}

.jUsoPW_sessionRename {
  gap: 6px;
  margin-top: 8px;
  display: grid;
}

.jUsoPW_existingSessionHome {
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

.jUsoPW_existingSessionHome svg {
  flex: none;
  width: 12px;
  height: 12px;
}

.jUsoPW_existingSessionHome:disabled {
  opacity: 1;
  box-shadow: none;
  cursor: default;
}

.jUsoPW_existingSessionHome:disabled > svg {
  visibility: hidden;
}

.jUsoPW_currentDshTarget {
  gap: 4px;
  min-width: 0;
  display: grid;
}

.jUsoPW_currentDshAction {
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

.jUsoPW_currentDshAction > :first-child {
  white-space: nowrap;
  flex: none;
}

.jUsoPW_currentDshAction > :last-child {
  min-width: 0;
  color: var(--dsw-alias-label-secondary);
  text-align: right;
}

.jUsoPW_currentDshTarget > p {
  margin: 0;
}

.jUsoPW_transcriptRetries {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  max-height: 168px;
  padding: 4px 6px;
  display: flex;
}

.jUsoPW_transcriptRetries > header {
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 0 4px;
  display: flex;
}

.jUsoPW_transcriptRetries h2 {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
}

.jUsoPW_transcriptRetries > header p {
  color: var(--dsw-alias-label-secondary);
  margin: 0;
  font-size: 11px;
  line-height: 16px;
}

.jUsoPW_transcriptRetryList {
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

.jUsoPW_transcriptRetry {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 6px;
  display: grid;
}

.jUsoPW_transcriptRetry + .jUsoPW_transcriptRetry {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 4px;
}

.jUsoPW_transcriptRetry p {
  margin: 0;
}

.jUsoPW_transcriptRetryText {
  overflow-wrap: anywhere;
  white-space: pre-wrap;
  user-select: text;
  font-size: 13px;
  line-height: 18px;
}

.jUsoPW_transcriptRetry button {
  height: 26px;
  min-height: 26px;
  padding: 0 6px;
  font-size: 12px;
}

.jUsoPW_existingSessionTarget > p {
  margin: 4px 0;
}

.jUsoPW_existingSessionPicker {
  gap: 8px;
  min-width: 0;
  margin-top: 10px;
  display: grid;
}

.jUsoPW_existingSessionSearch {
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 6px;
  display: grid;
}

.jUsoPW_existingSessionSearch input::placeholder {
  color: var(--dsw-alias-label-secondary);
  opacity: 1;
}

.jUsoPW_existingSessionList {
  max-height: clamp(96px, 26vh, 224px);
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: auto;
}

.jUsoPW_existingSessionList li {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
}

.jUsoPW_existingSessionList label {
  cursor: pointer;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: start;
  gap: 6px;
  padding: 6px 4px;
  display: grid;
}

.jUsoPW_existingSessionList label:has(input:disabled) {
  cursor: default;
}

.jUsoPW_existingSessionList label:has(input:checked) {
  background: var(--dsw-alias-interactive-bg-active);
}

.jUsoPW_existingSessionList input {
  accent-color: var(--dsw-alias-brand-primary);
  margin-top: 3px;
}

.jUsoPW_existingSessionList label span.jUsoPW_hint {
  overflow-wrap: anywhere;
  margin: 3px 0 0;
  display: block;
}

.jUsoPW_performanceChoice {
  line-height: 1.1;
}

.jUsoPW_performanceChoice small {
  white-space: nowrap;
  font-size: .85em;
}

.jUsoPW_floating [data-whale-setup] {
  min-height: 0;
}

.jUsoPW_floating :is(button, input, select, textarea, summary, a) {
  touch-action: manipulation;
}

.jUsoPW_floating button {
  transition: background-color .12s, color .12s;
}

.jUsoPW_floating :is(button, input, select, summary, a):focus-visible, .jUsoPW_floating:focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

.jUsoPW_spin {
  animation: .7s linear infinite jUsoPW_whaleSpin;
}

.jUsoPW_mark[data-state="authorized"], .jUsoPW_markSmall[data-state="authorized"] {
  color: var(--dsw-alias-brand-primary);
}

.jUsoPW_mark[data-state="unknown"], .jUsoPW_markSmall[data-state="unknown"] {
  color: var(--dsw-alias-state-warn-primary);
}

.jUsoPW_mark[data-state="input-active"], .jUsoPW_markSmall[data-state="input-active"] {
  color: var(--dsw-alias-brand-primary);
  animation: 1.35s ease-in-out infinite jUsoPW_whaleBreathe;
}

.jUsoPW_mark[data-state="pending"], .jUsoPW_markSmall[data-state="pending"] {
  color: var(--dsw-alias-label-secondary);
}

[data-motion="firm"].jUsoPW_floating {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="off"].jUsoPW_floating, [data-motion="off"].jUsoPW_floating * {
  transition: none !important;
  animation: none !important;
}

@keyframes jUsoPW_whaleEnter {
  from {
    opacity: .4;
    transform: translateY(3px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes jUsoPW_whalePreview {
  from {
    transform: scale(.88);
  }

  to {
    transform: scale(1);
  }
}

@keyframes jUsoPW_whaleSpin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes jUsoPW_whaleBreathe {
  0%, 100% {
    opacity: .65;
  }

  50% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .jUsoPW_floating, .jUsoPW_floating * {
    transition: none !important;
    animation: none !important;
  }
}

@media (width <= 520px), (height <= 560px) {
  .jUsoPW_settingsLayout {
    grid-template-rows: auto minmax(0, 1fr);
    grid-template-columns: minmax(0, 1fr);
  }

  .jUsoPW_settingsNav {
    border-right: 0;
    border-bottom: 1px solid var(--dsw-alias-border-l2);
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 2px;
    padding: 5px 8px;
    display: grid;
    overflow: hidden;
  }

  .jUsoPW_settingsNav button {
    justify-content: center;
    height: 30px;
    min-height: 30px;
    padding: 0 2px;
  }

  .jUsoPW_settingsNav button[aria-pressed="true"] {
    box-shadow: inset 0 -2px 0 var(--dsw-alias-brand-primary);
  }

  .jUsoPW_settingsHeader {
    gap: 3px;
    min-height: 44px;
    padding: 5px 8px;
  }

  .jUsoPW_backButton, .jUsoPW_guideButton {
    padding: 0 5px;
  }

  .jUsoPW_settingsBrand {
    gap: 4px;
  }

  .jUsoPW_settingsBrand .jUsoPW_markSmall {
    display: none;
  }

  .jUsoPW_pageHeading {
    padding: 10px 12px 8px;
  }

  .jUsoPW_pageHeading p {
    display: none;
  }

  .jUsoPW_settingsBody {
    padding: 4px 12px 12px;
  }

  .jUsoPW_modelNav {
    margin-bottom: 8px;
    padding: 0 10px 7px;
  }

  .jUsoPW_editNotice {
    flex-wrap: wrap;
  }

  .jUsoPW_editNotice button {
    width: 100%;
  }
}

@media (height <= 420px) {
  .jUsoPW_settingsHeader {
    height: 36px;
    min-height: 36px;
    padding: 2px 8px;
  }

  .jUsoPW_settingsHeader button {
    height: 30px;
    min-height: 30px;
  }

  .jUsoPW_settingsNav {
    padding: 2px 8px;
  }

  .jUsoPW_settingsNav button {
    height: 28px;
    min-height: 28px;
  }

  .jUsoPW_pageHeading {
    box-sizing: border-box;
    min-height: 32px;
    padding: 2px 12px;
  }

  .jUsoPW_pageHeading .jUsoPW_iconButton {
    width: 28px;
    min-width: 28px;
    height: 28px;
  }

  .jUsoPW_modelNav {
    margin-bottom: 4px;
    padding: 0 10px 3px;
  }

  .jUsoPW_modelNav button {
    height: 28px;
    min-height: 28px;
  }
}

@media (pointer: coarse) {
  .jUsoPW_field input, .jUsoPW_deviceSelect {
    font-size: 16px;
  }
}

@media (forced-colors: active) {
  .jUsoPW_floating, .jUsoPW_popover {
    outline: 1px solid canvastext;
  }

  .jUsoPW_settingsNav button[aria-pressed="true"], .jUsoPW_modelNav button[aria-pressed="true"] {
    outline: 2px solid highlight;
  }
}

.jUsoPW_floating[data-view="home"] .jUsoPW_panelViewport, .jUsoPW_floating[data-collapsed] .jUsoPW_panelViewport {
  overflow: hidden;
}

.jUsoPW_floating[data-view="home"]:not([data-collapsed]) {
  padding: 10px;
}

.jUsoPW_panelContent {
  flex-direction: column;
  gap: 4px;
  height: 100%;
  min-height: 0;
  display: flex;
}

.jUsoPW_panelContent > :not(.jUsoPW_quickConversation) {
  flex: none;
}

.jUsoPW_panelContent > .jUsoPW_homeTargetPicker {
  flex: 1 1 0;
  min-height: 0;
  padding: 2px;
  display: flex;
}

.jUsoPW_homeTargetPicker > .jUsoPW_existingSessionPicker {
  flex-direction: column;
  flex: 1;
  margin-top: 0;
  display: flex;
}

.jUsoPW_homeTargetPicker .jUsoPW_existingSessionList {
  overscroll-behavior: contain;
  flex: auto;
  min-height: 0;
  max-height: none;
}

.jUsoPW_homeTargetRow {
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

.jUsoPW_homeTargetRow:disabled {
  opacity: 1;
  cursor: default;
  color: var(--dsw-alias-label-secondary);
}

.jUsoPW_homeTargetRow .jUsoPW_hint {
  overflow-wrap: anywhere;
}

.jUsoPW_homeTargetPicker :is(.jUsoPW_existingSessionSearch, .jUsoPW_actions) {
  flex: none;
}

.jUsoPW_homeTargetPicker .jUsoPW_actions {
  margin-top: auto;
}

.jUsoPW_homeTargetPicker .jUsoPW_hint {
  margin: 0;
}

.jUsoPW_panelContent > .jUsoPW_header {
  height: 28px;
  min-height: 28px;
  margin: 0;
}

.jUsoPW_panelContent .jUsoPW_header .jUsoPW_iconButton {
  width: 28px;
  min-width: 28px;
  height: 28px;
}

.jUsoPW_panelContent > .jUsoPW_statusRow {
  box-sizing: border-box;
  min-height: 24px;
  margin: 0;
  padding: 2px 6px;
}

.jUsoPW_panelContent > .jUsoPW_hint {
  margin: 0;
  font-size: 12px;
  line-height: 18px;
}

.jUsoPW_panelContent > .jUsoPW_error {
  margin: 0;
  padding: 4px 8px;
  line-height: 18px;
}

.jUsoPW_panelContent .jUsoPW_quickSpeed {
  gap: 3px;
  padding-top: 0;
}

.jUsoPW_panelContent .jUsoPW_quickSpeedHeader {
  line-height: 18px;
}

.jUsoPW_panelContent .jUsoPW_quickHint {
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 16px;
  overflow: hidden;
}

.jUsoPW_panelContent .jUsoPW_quickHint p {
  text-overflow: ellipsis;
  margin: 0;
  line-height: 16px;
  overflow: hidden;
}

.jUsoPW_panelContent > .jUsoPW_caption {
  box-sizing: border-box;
  height: 30px;
  min-height: 30px;
  margin: 0;
  padding: 4px 8px;
  line-height: 18px;
}

.jUsoPW_panelContent > .jUsoPW_quickConversation {
  flex-direction: column;
  flex: 1 1 0;
  min-height: 0;
  max-height: none;
  margin: 0;
  padding: 8px;
  display: flex;
  overflow: hidden;
}

.jUsoPW_quickConversation .jUsoPW_popoverHeader {
  flex: none;
  min-height: 28px;
  margin-bottom: 6px;
}

.jUsoPW_quickConversation .jUsoPW_recentMessages {
  overscroll-behavior: contain;
  min-height: 0;
  overflow-y: auto;
}

.jUsoPW_floating[data-compact-height="true"] .jUsoPW_panelContent {
  gap: 2px;
}

.jUsoPW_floating[data-compact-height="true"] :is(.jUsoPW_voiceTarget, .jUsoPW_existingSessionHome) > span {
  font-size: 10px;
}

.jUsoPW_floating[data-compact-height="true"] .jUsoPW_voiceTarget strong {
  font-size: 12px;
}

.jUsoPW_floating[data-compact-height="true"] .jUsoPW_statusRow[data-bound] .jUsoPW_status {
  line-height: 16px;
}

.jUsoPW_floating[data-compact-height="true"] .jUsoPW_existingSessionHome {
  height: 20px;
  min-height: 20px;
}

.jUsoPW_floating[data-compact-height="true"] .jUsoPW_transcriptRetries {
  max-height: max(46px,calc(var(--whale-content-limit) - 137px));
  gap: 1px;
  padding-block: 2px;
}

.jUsoPW_floating[data-compact-height="true"] [data-has-transcript-retry] > .jUsoPW_audioDevices, .jUsoPW_floating[data-compact-height="true"] .jUsoPW_panelContent:has(.jUsoPW_currentDshTarget) > :is(.jUsoPW_audioDevices, .jUsoPW_quickSpeed), .jUsoPW_floating[data-compact-height="true"] .jUsoPW_panelContent > .jUsoPW_hint:not([data-home-important]), .jUsoPW_floating[data-compact-height="true"] .jUsoPW_panelContent .jUsoPW_quickSpeedHeader, .jUsoPW_floating[data-compact-height="true"] .jUsoPW_panelContent .jUsoPW_quickHint {
  display: none;
}

.jUsoPW_floating[data-compact-height="true"] .jUsoPW_quickActions {
  grid-template-columns: minmax(65px, .9fr) minmax(0, 2.1fr);
  align-items: center;
  gap: 4px;
}

.jUsoPW_floating[data-compact-height="true"] .jUsoPW_quickActions .jUsoPW_mainAction {
  white-space: normal;
  height: 30px;
  min-height: 30px;
  padding-inline: 4px;
  font-size: 12px;
  line-height: 1.15;
}

.jUsoPW_floating[data-compact-height="true"] .jUsoPW_quickActions .jUsoPW_quickSegments {
  padding: 2px;
}

.jUsoPW_floating[data-compact-height="true"] .jUsoPW_quickActions .jUsoPW_quickSegments button {
  padding-inline: 2px;
  font-size: 11px;
}

.jUsoPW_floating[data-compact-height="true"] .jUsoPW_panelContent[data-size-detail="true"] > .jUsoPW_quickSpeed {
  display: none;
}

.jUsoPW_settingsBody {
  container-type: inline-size;
}

.jUsoPW_section > button {
  justify-self: start;
  max-width: 100%;
}

.jUsoPW_settingsBody button {
  white-space: normal;
  overflow-wrap: anywhere;
  height: auto;
  min-height: 36px;
}

.jUsoPW_settingsBody :is(.jUsoPW_actions, .jUsoPW_segmented, .jUsoPW_formActions) > button {
  flex: 0 auto;
}

.jUsoPW_inlineActions, .jUsoPW_inlineField, .jUsoPW_volumeRow, .jUsoPW_volumeControl {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.jUsoPW_inlineField {
  font-size: 12px;
}

.jUsoPW_inlineField .jUsoPW_deviceSelect {
  text-overflow: ellipsis;
  flex: 0 180px;
  width: 180px;
  max-width: 100%;
}

.jUsoPW_inlineField input[type="number"] {
  width: 80px;
}

.jUsoPW_fullName {
  color: var(--dsw-alias-label-secondary);
  min-width: 0;
  font-size: 12px;
}

.jUsoPW_fullName summary {
  padding: 2px 0;
  font-size: 12px;
  font-weight: 400;
}

.jUsoPW_fullName p {
  overflow-wrap: anywhere;
  margin-top: 4px;
}

.jUsoPW_disclosureRow {
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 8px;
  display: flex;
}

.jUsoPW_disclosureRow > details.jUsoPW_section {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  flex: 0 auto;
  min-width: 0;
  padding: 0 10px;
}

.jUsoPW_disclosureRow > details.jUsoPW_section > summary {
  min-height: 20px;
  padding: 7px 0;
}

.jUsoPW_disclosureRow > details[open].jUsoPW_section {
  flex: 100%;
  padding-bottom: 10px;
}

.jUsoPW_volumeControl {
  flex-wrap: nowrap;
  flex: 0 260px;
}

.jUsoPW_volumeControl input[type="range"] {
  width: 210px;
  min-width: 80px;
  max-width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
  flex: 210px;
}

.jUsoPW_volumeControl span {
  text-align: right;
  flex: none;
  min-width: 3em;
  font-size: 12px;
}

.jUsoPW_field:has( > input[type="number"]) {
  flex-wrap: wrap;
  align-items: center;
  display: flex;
}

.jUsoPW_field > input[type="number"] {
  width: 80px;
}

.jUsoPW_authorizationSteps {
  color: var(--dsw-alias-label-secondary);
  margin: 8px 0 12px;
  font-size: 12px;
}

.jUsoPW_agreement {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  gap: 14px;
  padding: 14px;
  font-size: 13px;
  line-height: 1.6;
  display: grid;
}

.jUsoPW_agreement p {
  margin: 0;
}

.jUsoPW_authorizationBody h3 {
  margin: 0 0 10px;
  font-size: 15px;
}

.jUsoPW_authorizationActions button {
  flex: 0 auto;
  min-height: 36px;
}

@container (width <= 340px) {
  .jUsoPW_inlineActions {
    align-items: flex-start;
  }

  .jUsoPW_inlineField .jUsoPW_deviceSelect {
    flex-basis: 160px;
    width: 160px;
  }

  .jUsoPW_volumeControl {
    flex-basis: 200px;
  }

  .jUsoPW_volumeControl input[type="range"] {
    width: 150px;
  }
}

.jUsoPW_audioDevices {
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  display: flex;
}

.jUsoPW_audioDeviceGrid {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 8px;
  display: grid;
}

.jUsoPW_audioDeviceField {
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  font-size: 12px;
  display: flex;
}

.jUsoPW_audioDeviceField > span {
  align-items: center;
  gap: 4px;
  line-height: 18px;
  display: flex;
}

.jUsoPW_audioDeviceField svg {
  flex: none;
  width: 14px;
  height: 14px;
}

.jUsoPW_audioDeviceField select {
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

.jUsoPW_audioDeviceField select[data-device-missing] {
  border-color: #b80;
}

.jUsoPW_audioDeviceHint, .jUsoPW_audioDeviceNotice {
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  font-size: 11px;
  line-height: 16px;
  overflow: hidden;
}

.jUsoPW_audioDeviceHint {
  color: var(--dsw-alias-label-secondary);
}

.jUsoPW_audioDeviceNotice {
  color: #805500;
}

[data-ds-dark-theme] .jUsoPW_audioDeviceNotice {
  color: #ffd277;
}

[data-ds-dark-theme] .jUsoPW_audioDeviceField select {
  color-scheme: dark;
}

.jUsoPW_floating[data-compact-height="true"] .jUsoPW_audioDeviceField > span {
  font-size: 11px;
  line-height: 14px;
}

.jUsoPW_floating[data-compact-height="true"] .jUsoPW_audioDeviceField select {
  height: 26px;
}

.jUsoPW_floating[data-compact-height="true"] .jUsoPW_audioDeviceHint, .jUsoPW_floating[data-compact-height="true"] .jUsoPW_audioDeviceNotice, .jUsoPW_floating[data-compact-height="true"] .jUsoPW_panelContent:has( > [data-home-important]) .jUsoPW_audioDeviceField > span {
  display: none;
}

.jUsoPW_pageHeading.jUsoPW_modelHeading {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  justify-content: flex-start;
  gap: 10px;
  min-height: 40px;
  margin-bottom: 6px;
  padding: 5px 12px;
}

.jUsoPW_modelHeading h3 {
  white-space: nowrap;
  font-size: 13px;
}

.jUsoPW_modelHeading .jUsoPW_modelNav {
  border: 0;
  flex: 1;
  gap: 3px;
  min-width: 0;
  margin: 0;
  padding: 0;
}

.jUsoPW_modelHeading .jUsoPW_modelNav button {
  white-space: nowrap;
  flex: 0 auto;
  height: 28px;
  min-height: 28px;
  padding: 0 6px;
}

.jUsoPW_currentModel {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  display: flex;
}

.jUsoPW_pathRow {
  grid-template-columns: 95px minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  font-size: 12px;
  display: grid;
}

.jUsoPW_pathRow > span {
  min-width: 0;
}

.jUsoPW_editNotice {
  margin-bottom: 7px;
  padding: 5px 8px;
}

.jUsoPW_editNotice span {
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
}

.jUsoPW_editNotice button {
  height: auto;
  min-height: 30px;
}

@media (width <= 360px) {
  .jUsoPW_pageHeading.jUsoPW_modelHeading {
    gap: 5px;
    padding: 5px 8px;
  }

  .jUsoPW_modelHeading .jUsoPW_modelNav button {
    padding: 0 3px;
    font-size: 11px;
  }

  .jUsoPW_pathRow {
    grid-template-columns: minmax(0, 1fr);
    gap: 4px;
  }
}

.jUsoPW_pathRow {
  display: block;
}

.jUsoPW_pathRow > div:first-child {
  flex-wrap: nowrap !important;
}

.jUsoPW_pathRow > div:first-child > label {
  flex: 1;
  grid-template-columns: 95px minmax(0, 1fr);
  display: grid !important;
}

.jUsoPW_pathRow input {
  width: 100% !important;
}

.jUsoPW_pathRow button {
  flex: none;
  min-height: 32px;
}

@media (width <= 420px) {
  .jUsoPW_pathRow > div:first-child {
    flex-wrap: wrap !important;
  }

  .jUsoPW_pathRow > div:first-child > label {
    grid-template-columns: 80px minmax(0, 1fr);
    min-width: 180px !important;
  }
}

.jUsoPW_floating :is(button, select, input, textarea, summary, a), .jUsoPW_settings :is(button, select, input, summary, a) {
  transition: background-color .12s ease-out,border-color .12s ease-out,color .12s ease-out,box-shadow .12s ease-out,transform var(--whale-duration, .2s) var(--whale-ease, ease-out);
}

.jUsoPW_floating :is(button, summary):hover:not(:disabled) {
  background-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,var(--dsw-alias-bg-layer-1));
}

.jUsoPW_floating button:active:not(:disabled), .jUsoPW_settings button:active:not(:disabled) {
  transform: scale(.97);
}

.jUsoPW_floating :is(input, select, textarea):hover:not(:disabled) {
  border-color: var(--dsw-alias-brand-primary);
}

.jUsoPW_radios label {
  transition: background-color .12s, border-color .12s, box-shadow .12s;
}

.jUsoPW_radios label:has(input:checked) {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,transparent);
}

.jUsoPW_authorizationBody, .jUsoPW_settingsLayout, .jUsoPW_panelContent > .jUsoPW_header, .jUsoPW_settingsBody > div:not([hidden]), .jUsoPW_section > div:not([hidden])[data-whale-tab-panel], .jUsoPW_floating [role="tabpanel"]:not([hidden]) {
  animation: jUsoPW_whalePageEnter var(--whale-duration, .2s) ease-out;
}

.jUsoPW_floating :is([role="menu"], [role="listbox"]), .jUsoPW_floating [data-whale-dropdown] {
  transform-origin: top;
  animation: .12s ease-out jUsoPW_whalePageEnter;
}

.jUsoPW_floating [data-whale-save-result] {
  animation: .16s ease-out jUsoPW_whaleFeedback;
}

.jUsoPW_floating summary {
  list-style: none;
}

.jUsoPW_floating summary::-webkit-details-marker {
  display: none;
}

.jUsoPW_floating summary:before {
  content: "\u203A";
  width: 1em;
  transition: transform .16s ease-out;
  display: inline-block;
  transform: rotate(0);
}

.jUsoPW_floating details[open] > summary:before {
  transform: rotate(90deg);
}

.jUsoPW_floating details[open] > :not(summary) {
  animation: .16s ease-out jUsoPW_whalePageEnter;
}

@supports (interpolate-size: allow-keywords) {
  .jUsoPW_floating details {
    interpolate-size: allow-keywords;
  }

  .jUsoPW_floating details::details-content {
    block-size: 0;
    transition: block-size .16s ease-out,content-visibility .16s allow-discrete;
    overflow: clip;
  }

  .jUsoPW_floating details[open]::details-content {
    block-size: auto;
  }
}

@keyframes jUsoPW_whalePageEnter {
  from {
    translate: 0 4px;
  }

  to {
    translate: 0;
  }
}

@keyframes jUsoPW_whaleFeedback {
  from {
    opacity: .5;
  }

  to {
    opacity: 1;
  }
}

[data-motion="firm"].jUsoPW_floating, [data-motion="firm"].jUsoPW_settings {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="firm"].jUsoPW_floating details::details-content, [data-motion="firm"].jUsoPW_floating summary:before {
  transition-duration: .1s;
}

[data-motion="off"].jUsoPW_floating *, [data-motion="off"].jUsoPW_settings *, [data-motion="off"].jUsoPW_floating :before, [data-motion="off"].jUsoPW_floating details::details-content {
  transition: none !important;
  animation: none !important;
}

[data-motion="off"].jUsoPW_floating button:active, [data-motion="off"].jUsoPW_settings button:active {
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .jUsoPW_floating *, .jUsoPW_settings *, .jUsoPW_floating :before, .jUsoPW_floating details::details-content {
    transition: none !important;
    animation: none !important;
  }

  .jUsoPW_floating button:active, .jUsoPW_settings button:active {
    transform: none;
  }
}

.jUsoPW_conversationChoice {
  gap: 6px;
  min-width: 0;
  display: grid;
  position: relative;
}

.jUsoPW_conversationChoice > button {
  text-align: left;
  justify-content: space-between;
  width: 100%;
  min-width: 0;
}

.jUsoPW_conversationOptions {
  overscroll-behavior: contain;
  gap: 3px;
  min-width: 0;
  max-height: 220px;
  padding: 6px;
  animation: .12s ease-out jUsoPW_whalePageEnter;
  display: grid;
  overflow: auto;
}

.jUsoPW_conversationOptions [role="option"] {
  text-align: left;
  border-radius: var(--dsw-radius-sm);
  justify-content: space-between;
  width: 100%;
  min-width: 0;
  padding: 7px 10px;
  transition: background-color .12s ease-out, color .12s ease-out;
}

.jUsoPW_conversationOptions [role="option"][aria-selected="true"] {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 18%,var(--dsw-alias-bg-layer-1));
  font-weight: 600;
}

.jUsoPW_conversationOptions [role="option"]:is(:hover, :focus-visible) {
  background: var(--dsw-alias-interactive-bg-active);
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: -2px;
}

.jUsoPW_conversationOptions [role="option"] small {
  color: var(--dsw-alias-label-secondary);
}

.jUsoPW_settings [data-whale-tab-panel]:not([hidden]) {
  animation: jUsoPW_whalePageEnter var(--whale-duration, .2s) ease-out;
}

.jUsoPW_modelHeading .jUsoPW_modelNav {
  scrollbar-width: thin;
  overflow-x: auto;
}

.jUsoPW_modelHeading .jUsoPW_modelNav button {
  flex-shrink: 0;
}

[data-motion="off"].jUsoPW_settings [data-whale-tab-panel] {
  animation: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .jUsoPW_settings [data-whale-tab-panel] {
    animation: none !important;
  }
}

.jUsoPW_panelContent, .jUsoPW_bubble {
  animation: none;
}

.jUsoPW_panelContent {
  height: auto;
}

.jUsoPW_panelContent[data-size-detail="true"] {
  height: 100%;
}

.jUsoPW_panelContent .jUsoPW_quickSegments {
  background: none;
  gap: 6px;
  padding: 0;
}

.jUsoPW_panelContent .jUsoPW_quickSegments button {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 8px;
  gap: 4px;
  height: 34px;
  min-height: 34px;
}

.jUsoPW_panelContent .jUsoPW_quickSegments button[aria-pressed="true"] {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 22%,var(--dsw-alias-bg-layer-1));
  box-shadow: inset 0 0 0 1px var(--dsw-alias-brand-primary);
}

.jUsoPW_panelContent .jUsoPW_quickSegments svg {
  width: 15px;
  height: 15px;
}

.jUsoPW_panelContent > .jUsoPW_quickConversation {
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

.jUsoPW_conversationHeader {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  font-size: 12px;
  display: flex;
}

.jUsoPW_conversationHeader > div {
  align-items: center;
  gap: 2px;
  display: flex;
}

.jUsoPW_conversationHeader button:not(.jUsoPW_iconButton), .jUsoPW_assistantName, .jUsoPW_loadHistory {
  color: inherit;
  font: inherit;
  cursor: pointer;
  background: none;
  border: 0;
  border-radius: 4px;
  padding: 3px;
}

.jUsoPW_conversationHeader .jUsoPW_iconButton {
  width: 26px;
  min-width: 26px;
  height: 28px;
}

.jUsoPW_historyScope {
  color: var(--dsw-alias-label-secondary);
  flex: none;
  margin: 2px 0;
  font-size: 10px;
  line-height: 14px;
}

.jUsoPW_quickConversation .jUsoPW_recentMessages {
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

.jUsoPW_message {
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

.jUsoPW_message[data-role="user"] {
  align-self: flex-end;
  align-items: flex-end;
}

.jUsoPW_messageName {
  min-height: 19px;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  line-height: 17px;
}

.jUsoPW_assistantName {
  overflow-wrap: anywhere;
  max-width: 100%;
  min-height: 19px;
  padding: 0 2px;
  font-size: 11px;
  line-height: 17px;
}

.jUsoPW_assistantName:hover {
  color: var(--dsw-alias-label-primary);
  text-underline-offset: 3px;
  text-decoration: underline;
}

.jUsoPW_assistantNameInput {
  box-sizing: border-box;
  width: 140px;
  min-width: 60px;
  max-width: 160px;
  height: 23px !important;
  min-height: 23px !important;
  padding: 1px 5px !important;
  font-size: 12px !important;
}

.jUsoPW_message p {
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

.jUsoPW_message[data-role="user"] p {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 28%,var(--dsw-alias-bg-layer-1));
  border-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 45%,var(--dsw-alias-border-l2));
}

.jUsoPW_message small {
  color: var(--dsw-alias-label-secondary);
  font-size: 10px;
}

.jUsoPW_loadHistory {
  align-self: center;
  padding: 5px;
  font-size: 11px;
}

.jUsoPW_newMessages {
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

.jUsoPW_bubble {
  gap: 6px;
  padding: 0 7px;
  font-size: 11px;
}

.jUsoPW_bubbleBrand {
  flex: none;
  font-size: 12px;
  font-weight: 600;
}

.jUsoPW_bubbleStatus {
  white-space: nowrap;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 3px;
  min-width: 0;
  display: flex;
}

.jUsoPW_bubbleStatus svg {
  flex: none;
  width: 15px;
  height: 15px;
}

.jUsoPW_bubble > svg:last-child {
  flex: none;
  width: 14px;
  height: 14px;
}

.jUsoPW_voiceBars {
  align-items: center;
  gap: 2px;
  height: 16px;
  display: flex;
}

.jUsoPW_voiceBars i {
  background: var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary));
  opacity: .5;
  border-radius: 1px;
  width: 3px;
  height: 13px;
  transform: scaleY(.31);
}

.jUsoPW_voiceBars[data-active="true"] i {
  background: var(--dsw-alias-brand-primary);
  opacity: 1;
  animation: .7s ease-in-out infinite alternate jUsoPW_whaleInputPulse;
}

.jUsoPW_voiceBars[data-active="true"] i:nth-child(2n) {
  animation-delay: -.3s;
}

.jUsoPW_voiceBars[data-active="true"] i:nth-child(3) {
  animation-delay: -.5s;
}

@keyframes jUsoPW_whaleInputPulse {
  from {
    transform: scaleY(.38);
  }

  to {
    transform: scaleY(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .jUsoPW_voiceBars[data-active="true"] i {
    animation: none;
    transform: scaleY(.69);
  }
}

.jUsoPW_floating[data-motion="off"] .jUsoPW_voiceBars[data-active="true"] i {
  animation: none;
  transform: scaleY(.69);
}

@media (forced-colors: active) {
  .jUsoPW_message p {
    border: 1px solid canvastext;
  }

  .jUsoPW_quickSegments button[aria-pressed="true"] {
    outline: 2px solid highlight;
  }

  .jUsoPW_voiceBars i {
    background: canvastext;
  }
}

.jUsoPW_voicePrompt {
  flex-direction: column;
  gap: 8px;
  display: flex;
}

.jUsoPW_voicePrompt label {
  font-size: 13px;
  font-weight: 600;
}

.jUsoPW_voicePrompt label span {
  margin-left: 10px;
  font-weight: 400;
}

.jUsoPW_voicePromptInput {
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

.jUsoPW_voicePromptInput::placeholder {
  color: var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary));
  opacity: 1;
}

.jUsoPW_voicePromptInput:disabled {
  opacity: .65;
  cursor: not-allowed;
}

.jUsoPW_voicePromptInput:focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: 2px;
}

.jUsoPW_voicePromptCount {
  text-align: right;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
}

.jUsoPW_voicePromptActions {
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  display: flex;
}

.jUsoPW_voicePromptActions .jUsoPW_actions {
  margin: 0;
}

.jUsoPW_voicePromptMode {
  color: var(--dsw-alias-state-success-primary, var(--dsw-alias-label-secondary));
  white-space: nowrap;
  font-size: 11px;
}

.jUsoPW_voicePromptMode:before {
  content: "\u2022";
  margin-right: 5px;
}
`};var le=require("react/jsx-runtime");function Xn({small:e=!1,state:n="idle"}){return(0,le.jsx)("svg",{viewBox:"0 0 1024 1024","data-state":n,className:e?h.markSmall:h.mark,"aria-hidden":"true",children:(0,le.jsx)("path",{fill:"currentColor",d:"M 920.377 65.087 C 928.064 63.083 932.973 107.434 932.987 114.072 C 933.092 165.045 924.256 210.594 901.365 256.376 C 855.379 348.348 758.325 392.662 681.124 453.829 C 619.898 502.339 580.980 567.068 558.933 641.286 C 543.187 694.296 538.293 750.695 527.468 804.833 C 520.391 840.227 514.008 874.928 493.687 905.451 C 474.447 934.348 431.832 972.135 393.948 957.487 C 358.248 943.683 373.787 884.228 380.635 856.964 C 401.585 773.552 460.283 657.712 419.105 573.931 C 381.383 497.183 304.815 488.756 234.259 458.353 C 195.522 441.661 157.383 413.822 133.190 378.905 C 115.301 353.087 100.999 326.148 94.423 295.130 C 93.358 290.109 88.245 266.804 93.252 264.337 C 93.759 264.087 133.145 277.445 138.791 278.433 C 174.563 284.693 209.339 281.307 245.016 275.980 C 288.094 269.548 333.679 260.367 376.940 270.872 C 414.858 280.080 448.414 297.981 474.046 327.930 C 483.707 339.219 491.970 352.034 498.604 365.302 C 499.492 367.078 503.519 377.817 505.784 377.367 C 506.966 377.132 507.537 375.084 507.926 374.169 C 513.160 361.862 518.091 349.606 524.078 337.631 C 541.287 303.214 562.597 270.184 592.119 244.919 C 633.676 209.352 683.585 187.330 735.895 172.601 C 770.712 162.797 806.633 155.544 838.984 138.655 C 862.849 126.195 882.544 110.622 901.022 91.328 C 905.036 87.137 916.896 65.995 920.377 65.087 Z"})})}var ad=()=>({pet:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("path",{d:"M5 11c-2-8 4-10 7-8 5-2 9 2 7 8M5 10l4-4 3 3 3-3 4 4v5c0 4-3 6-7 6s-7-2-7-6v-5Z"}),(0,le.jsx)("path",{d:"M8 13v2m8-2v2m-6 3h4"})]}),settings:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("path",{d:"m9 3 1-1h4l1 1 .5 2 2 .8 2-.6 2 3-.8 1.8.2 2.2 1.3 1.5-2 3-2.1-.2-1.7 1.3-.5 2.2h-4l-.6-2.1-1.8-1.1-2 .3-2-3 1.3-1.7V10L4 8.5l2-3 2 .5L9 3Z"}),(0,le.jsx)("circle",{cx:"12",cy:"11.5",r:"3"})]}),minus:(0,le.jsx)("path",{d:"M5 12h14"}),plus:(0,le.jsx)("path",{d:"M12 5v14M5 12h14"}),down:(0,le.jsx)("path",{d:"m6 9 6 6 6-6"}),refresh:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("path",{d:"M20 6v5h-5M4 18v-5h5"}),(0,le.jsx)("path",{d:"M6 7a7 7 0 0 1 12-1l2 5M4 13l2 5a7 7 0 0 0 12-1"})]}),up:(0,le.jsx)("path",{d:"m6 15 6-6 6 6"}),check:(0,le.jsx)("path",{d:"m5 12 4 4L19 6"}),micOff:(0,le.jsx)(le.Fragment,{children:(0,le.jsx)("path",{d:"M9 9v3a3 3 0 0 0 5.1 2.1M15 8V6a3 3 0 0 0-5.7-1.3M6 10v2a6 6 0 0 0 10.2 4.3M18 12v-2M12 18v3M9 21h6M3 3l18 18"})}),mic:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("rect",{x:"9",y:"3",width:"6",height:"12",rx:"3"}),(0,le.jsx)("path",{d:"M6 10v2a6 6 0 0 0 12 0v-2M12 18v3M9 21h6"})]}),volume:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("path",{d:"M3 9h4l5-4v14l-5-4H3Z"}),(0,le.jsx)("path",{d:"M16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"})]}),chat:(0,le.jsx)("path",{d:"M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9l-5 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"}),close:(0,le.jsx)("path",{d:"m6 6 12 12M18 6 6 18"}),search:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("circle",{cx:"10",cy:"10",r:"6"}),(0,le.jsx)("path",{d:"m15 15 5 5"})]}),chevron:(0,le.jsx)("path",{d:"m9 5 7 7-7 7"}),warning:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("path",{d:"m12 3 10 18H2L12 3Z"}),(0,le.jsx)("path",{d:"M12 9v5m0 3v.2"})]})});function qe({name:e,className:n=""}){return(0,le.jsx)("svg",{viewBox:"0 0 24 24",width:"18",height:"18","aria-hidden":"true",className:n,fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round",children:ad()[e]??ad().chat})}var Ce=require("react/jsx-runtime");function kh({name:e,save:n,t}){let[o,r]=(0,Be.useState)(!1),[i,s]=(0,Be.useState)(e),c=(0,Be.useRef)(!1),l=(0,Be.useRef)(null),u=(0,Be.useRef)(null),d=(0,Be.useRef)(!1);(0,Be.useLayoutEffect)(()=>{o?(l.current?.focus({preventScroll:!0}),l.current?.select()):d.current&&(d.current=!1,u.current?.focus({preventScroll:!0}))},[o]);let m=()=>{r(!1),s(e)},f=()=>{let p=i.trim();p&&p.length<=40&&(n?.(p),d.current=!0,r(!1))};return o?(0,Ce.jsx)(ir.Input,{ref:l,className:h.assistantNameInput,"aria-label":t("assistantName"),value:i,maxLength:40,"data-no-drag":!0,onChange:p=>s(p.target.value),onCompositionStart:()=>{c.current=!0},onCompositionEnd:()=>{c.current=!1},onBlur:m,onKeyDown:p=>{p.stopPropagation(),!(c.current||p.nativeEvent.isComposing)&&(p.key==="Escape"&&(p.preventDefault(),d.current=!0,m()),p.key==="Enter"&&(p.preventDefault(),f()))}}):(0,Ce.jsx)("button",{ref:u,type:"button",className:h.assistantName,"data-no-drag":!0,title:t("renameAssistant"),onClick:()=>{s(e),r(!0)},children:e})}function ld({conversation:e,history:n,historyLoading:t,historyError:o,historyRetryCursor:r,loadHistory:i,assistantName:s,setAssistantName:c,close:l,t:u}){let[d,m]=(0,Be.useState)(!1),[f,p]=(0,Be.useState)(0),y=(0,Be.useRef)(null),v=(0,Be.useRef)(!0),b=(0,Be.useRef)(null),x=(0,Be.useRef)(null),z=e.rootSessionId,M=Lu(n?.rootSessionId===z?n.items:[],e.items),$=!v.current&&b.current?.firstId,j=$?M.findIndex(k=>k.id===$):-1,W=d?M:j>=0?M.slice(j):Zu(M),U=()=>{let k=y.current;if(!k)return;let C=k.getBoundingClientRect(),R=[...k.querySelectorAll("[data-message-id]")].find(P=>P.getBoundingClientRect().bottom>=C.top);x.current=R?{id:R.dataset.messageId,offset:R.getBoundingClientRect().top-C.top}:null},E=()=>{let k=y.current;k&&(k.scrollTop=k.scrollHeight),v.current=!0,p(0),U()},S=!d&&M.filter(k=>k.role==="user").length<10&&!!n?.nextCursor;return(0,Be.useEffect)(()=>{S&&!t&&!o&&i?.(n.nextCursor)},[S,n?.nextCursor,t,o,z]),(0,Be.useLayoutEffect)(()=>{let k=y.current;if(!k)return;let C=b.current;if((!C||C.root!==z)&&(v.current=!0,p(0)),v.current)k.scrollTop=k.scrollHeight;else{let R=x.current,P=R&&[...k.querySelectorAll("[data-message-id]")].find(N=>N.dataset.messageId===R.id);if(P?k.scrollTop+=P.getBoundingClientRect().top-k.getBoundingClientRect().top-R.offset:C&&(k.scrollTop=Math.min(C.top,k.scrollHeight-k.clientHeight)),C){let N=e.items.filter(I=>I.at>=C.lastAt&&!C.ids.has(I.id)).length;N&&p(I=>I+N)}}b.current={root:z,firstId:W[0]?.id,top:k.scrollTop,lastAt:Math.max(0,...M.map(R=>R.at)),ids:new Set(M.map(R=>R.id))},U()},[e,n,d,f]),(0,Ce.jsxs)("section",{className:h.quickConversation,"data-dropdown":"conversation","data-no-drag":!0,role:"region","aria-label":u("recentConversation"),onKeyDown:k=>{k.key==="Escape"&&(k.stopPropagation(),l())},children:[(0,Ce.jsxs)("div",{className:h.conversationHeader,children:[(0,Ce.jsx)("strong",{children:u(d?"allRecords":"recentTenTurns")}),(0,Ce.jsxs)("div",{children:[(0,Ce.jsx)("button",{type:"button",onClick:()=>{d?(v.current=!0,x.current=null,b.current=null,p(0)):U(),m(k=>!k)},children:u(d?"collapseToTen":"showAllRecords")}),(0,Ce.jsx)(ir.Button,{className:h.iconButton,"aria-label":u("close"),title:u("collapseConversation"),onClick:l,children:(0,Ce.jsx)(qe,{name:"up"})})]})]}),d&&(0,Ce.jsxs)("p",{className:h.historyScope,children:[u("currentVoiceRecords"),n?.truncated?" \xB7 "+u("historyTruncated"):""]}),(0,Ce.jsxs)("div",{ref:y,className:h.recentMessages,"data-conversation-messages":!0,tabIndex:0,"aria-label":u("conversationMessages"),onWheel:k=>{k.deltaY<0&&(v.current=!1)},onScroll:()=>{let k=y.current;v.current=qu(k),v.current&&p(0),b.current&&(b.current.top=k.scrollTop),U()},children:[d&&n?.nextCursor&&(0,Ce.jsx)("button",{className:h.loadHistory,disabled:t,onClick:()=>{U(),i?.(n.nextCursor)},children:u(t?"readingHistory":"loadEarlier")}),o&&(0,Ce.jsx)("button",{className:h.loadHistory,disabled:t,onClick:()=>{i?.(r??void 0)},children:u("retryHistory")}),W.map(k=>(0,Ce.jsxs)("div",{"data-message-id":k.id,"data-role":k.role,className:h.message,children:[(0,Ce.jsx)("div",{className:h.messageName,children:k.role==="user"?(0,Ce.jsx)("span",{children:u("you")}):(0,Ce.jsx)(kh,{name:s,save:c,t:u})}),(0,Ce.jsx)("p",{children:k.text}),["speech-failed","interrupted"].includes(k.state)&&(0,Ce.jsx)("small",{children:u(k.state==="speech-failed"?"speechFailed":"speechInterrupted")})]},k.id)),!W.length&&(0,Ce.jsx)("p",{className:h.hint,children:u(t||S?"readingHistory":"noConversation")})]}),f>0&&(0,Ce.jsxs)("button",{className:h.newMessages,onClick:E,children:[(0,Ce.jsx)(qe,{name:"down"}),f," ",u("newMessages")]})]})}var Yn=require("react"),Ut=require("@deepseek-ai/dsh-client-ui-primitives"),pn=require("react/jsx-runtime");function uo({label:e,value:n,onChange:t,kind:o,pickPath:r,sessionId:i,disabled:s,active:c=!0,scope:l,className:u,placeholder:d}){let[m,f]=(0,Yn.useState)(!1),[p,y]=(0,Yn.useState)(null),v=typeof n=="string"?n.split(/[\\/]/).filter(Boolean).at(-1)??n:"",b=(0,Yn.useRef)(null),x=(0,Yn.useRef)(null),z=()=>{b.current?.abort(),b.current=null,f(!1)};(0,Yn.useEffect)(()=>(z(),y(null),z),[i,s,c,l,n]);let M=async()=>{if(b.current||s||!c||!r)return;let $=new AbortController;b.current=$,f(!0),y(null);try{let j=await r(i,o,$.signal);b.current===$&&!$.signal.aborted&&!x.current?.closest("[hidden]")&&j!==null&&t(j)}catch(j){b.current===$&&!$.signal.aborted&&y(String(j?.message??j))}finally{b.current===$&&(b.current=null,f(!1))}};return(0,pn.jsxs)("div",{ref:x,className:u,"data-native-path":o,children:[(0,pn.jsxs)("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,minWidth:0},children:[(0,pn.jsxs)("label",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,minWidth:0},children:[e,(0,pn.jsx)(Ut.Input,{"aria-label":e,title:n??"",value:v,placeholder:d,disabled:s,readOnly:!0,style:{width:190,maxWidth:"100%",minWidth:0,textOverflow:"ellipsis"}})]}),(0,pn.jsx)(Ut.Button,{variant:"outline",disabled:s||!c||!r||m,onClick:()=>{M()},children:m?"\u7B49\u5F85\u9009\u62E9\u2026":o==="referenceAudio"||o==="campplus"?"\u9009\u62E9\u6587\u4EF6\u2026":"\u9009\u62E9\u6587\u4EF6\u5939\u2026"})]}),o==="campplus"&&n&&(0,pn.jsx)(Ut.Button,{variant:"outline",disabled:s,onClick:()=>{z(),t("")},children:"\u6E05\u9664\u53EF\u9009\u6A21\u578B"}),m&&(0,pn.jsx)(Ut.Button,{variant:"outline",onClick:z,children:"\u53D6\u6D88\u9009\u62E9"}),n&&(0,pn.jsxs)("details",{style:{fontSize:12,minWidth:0},children:[(0,pn.jsx)("summary",{children:"\u67E5\u770B\u5B8C\u6574\u8DEF\u5F84"}),(0,pn.jsx)("p",{style:{margin:"4px 0",overflowWrap:"anywhere"},children:n})]}),p&&(0,pn.jsx)("p",{role:"alert",children:p})]})}var zt=require("react");var tn=require("react/jsx-runtime"),po=e=>e&&typeof e=="object"?`${e.backend}:${e.id}`:e==null?"":"__legacy";function cd({state:e,sessionId:n,run:t,t:o}){let r=(0,zt.useRef)({state:e,sessionId:n,run:t}),i=(0,zt.useRef)(void 0);r.current={state:e,sessionId:n,run:t},(0,zt.useEffect)(()=>{!e.settings||e.settingsFor!==n||e.busy||e.audioDevicesPending||i.current===n||(i.current=n,t(n,"read-audio-devices"))},[n,e.settingsFor,e.busy,e.audioDevicesPending]),(0,zt.useEffect)(()=>{let f=!1,p,y=async()=>{let v=r.current;!f&&v.sessionId===n&&!v.state.busy&&!document.hidden&&(v.state.settingsFor!==n&&await v.run(n,"read-settings"),f||await v.run(n,"read-audio-devices")),f||(p=document.defaultView.setTimeout(y,1e4))};return y(),()=>{f=!0,document.defaultView.clearTimeout(p)}},[n]);let s=!!(e.settings&&e.settingsFor===n),c=s?e.settings:null,l=c?.audioDevices??{input:c?.values?.device??null,output:null},u=e.audioDevicesFor===n?e.audioDevices:null,d=e.checkedFor===n&&!e.uncertain&&e.status?.enabled===!1&&e.status?.ownerSessionId===null&&e.status?.voiceControlBusy===!1&&e.status?.voiceSession?.fullyStopped===!0&&e.status?.voiceSession?.id==null,m=[];return(0,tn.jsxs)("section",{className:h.audioDevices,"aria-label":o("audioDevices"),"data-audio-device-controls":!0,"data-no-drag":!0,children:[(0,tn.jsx)("div",{className:h.audioDeviceGrid,children:["input","output"].map(f=>{let p=l[f],y=u?.[f],v=po(p),b=y?.items?.some(j=>po(j)===v),x=p&&typeof p=="object"&&y&&y.status!=="unavailable"&&!b,z=p==null?o("audioSystemDefault"):typeof p=="object"?p.name:String(p),M=f==="output"&&y?.reason==="AUDIO_PLATFORM_UNSUPPORTED",$=!s||e.busy||e.uncertain||e.settingsConflict||M||f==="input"&&!d;return x&&m.push(o(f==="input"?"inputDeviceMissing":"outputDeviceMissing")),(0,tn.jsxs)("label",{className:h.audioDeviceField,children:[(0,tn.jsxs)("span",{children:[(0,tn.jsx)(qe,{name:f==="input"?"mic":"volume"}),o(f==="input"?"audioInput":"audioOutput")]}),(0,tn.jsxs)("select",{"aria-label":o(f==="input"?"audioInput":"audioOutput"),"data-device-missing":x||void 0,title:$&&f==="input"&&!d?o("inputDeviceStopFirst"):M?o("outputDeviceUnsupported"):z,disabled:$,value:v,onFocus:()=>{e.audioDevicesPending||t(n,"read-audio-devices")},onChange:j=>{let W=j.target.value;if(W==="__legacy"||W===v)return;let U=W===""?null:y?.items?.find(E=>po(E)===W);U!==void 0&&t(n,"save-audio-device",{revision:c.revision,direction:f,selection:U})},children:[(0,tn.jsx)("option",{value:"",children:o("audioSystemDefault")}),p!=null&&!b&&(0,tn.jsxs)("option",{value:v,children:[z,x?" \xB7 "+o("deviceDisconnected"):typeof p=="object"?"":" \xB7 "+o("deviceSaved")]}),y?.items?.map(j=>(0,tn.jsx)("option",{value:po(j),children:j.name},po(j)))]})]},f)})}),m.length>0?(0,tn.jsx)("p",{className:h.audioDeviceNotice,role:"status",children:m.join("\uFF1B")}):e.audioDevicesError||u?.input?.status==="unavailable"||u?.output?.status==="unavailable"&&u?.output?.reason!=="AUDIO_PLATFORM_UNSUPPORTED"?(0,tn.jsx)("p",{className:h.audioDeviceHint,role:"status",children:o("deviceListRetry")}):u?.output?.reason==="AUDIO_PLATFORM_UNSUPPORTED"?(0,tn.jsx)("p",{className:h.audioDeviceHint,children:o("outputDeviceUnsupported")}):!d&&s?(0,tn.jsx)("p",{className:h.audioDeviceHint,children:o("inputDeviceStopFirst")}):null]})}var Ae=require("react"),mn=require("@deepseek-ai/dsh-client-ui-primitives");var re=require("react/jsx-runtime"),Ph={busy:"\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F",archived:"\u4F1A\u8BDD\u5DF2\u5F52\u6863",unavailable:"\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528"},Ct=e=>e.title?.trim()||`\u672A\u547D\u540D\u4F1A\u8BDD \xB7 ${e.sessionId.slice(-6).toUpperCase()}`,sr=e=>Ph[e.availability],Rn=e=>["ready","busy"].includes(e?.availability),ar=(e,n)=>e.checkedFor===n&&!e.uncertain&&!e.busy&&!e.ttsCancelling&&!e.existingSessionWritePending&&!e.existingSessionUnconfirmed&&e.status?.voiceControlBusy===!1&&e.status?.voiceSession?.fullyStopped===!0&&e.status?.enabled===!1;function ud({sessionId:e,boundSession:n,state:t,controlContext:o,listExistingVoiceSessions:r,setExistingVoiceSession:i,readState:s,run:c,t:l}){let[u,d]=(0,Ae.useState)(),[m,f]=(0,Ae.useState)(!1),[p,y]=(0,Ae.useState)(!1),v=(0,Ae.useRef)(null),b=(0,Ae.useId)(),x=n?.sessionId??null,z=e===x,M=C=>ar(C,e)&&Object.hasOwn(C.status,"existingVoiceSession")&&(C.status.existingVoiceSession?.sessionId??null)===x,$=()=>o.currentConversation()===e&&o.sourceFor(e)===e;(0,Ae.useEffect)(()=>{let C=new AbortController;return v.current={signal:C.signal,choosing:!1},f(!1),r({sessionId:e},C.signal).then(R=>{C.signal.aborted||!$()||(d(R.items.find(P=>P.sessionId===e)??null),(R.binding?.sessionId??null)!==x&&c(e,"status"))}).catch(()=>{C.signal.aborted||d(null)}),()=>C.abort()},[e,x,o,r]);let j=async()=>{let C=v.current;if(!(!C||C.signal.aborted||C.choosing||!$())&&M(s())){C.choosing=!0,f(!0),y(!1);try{if(z){await i({sessionId:null,expectedSessionId:x});return}let R=await r({sessionId:e},C.signal);if(C.signal.aborted||!$())return;let P=R.items.find(I=>I.sessionId===e),N=(R.binding?.sessionId??null)!==x;if(N||!Rn(P)){d(P??null),y(!0),N&&c(e,"status");return}if(!M(s()))return;await i({sessionId:e,expectedSessionId:x})}catch{C.signal.aborted||y(!0)}finally{C.choosing=!1,C.signal.aborted||f(!1)}}},W=z?n:u,U=u===void 0&&!z,E=z||U||Rn(W);if(!E&&!p)return null;let S=l(z?"backToFishVoice":"chooseCurrentDshTarget"),k=U?l("checkingVoiceTarget"):W?Ct(W):"";return(0,re.jsxs)("div",{className:h.currentDshTarget,"data-whale-current-target":!0,"data-no-drag":!0,children:[E&&(0,re.jsxs)(mn.Button,{variant:"outline",className:h.currentDshAction,"data-whale-operation":z?"unbind-existing-session":"bind-current-session","aria-label":S,"aria-busy":m||U,"aria-describedby":b,disabled:!M(t)||m||U,onClick:()=>{j()},children:[(0,re.jsx)("span",{children:S}),(0,re.jsx)("span",{id:b,className:h.ellipsis,title:k,children:k})]}),p&&(0,re.jsx)("p",{role:"alert",className:h.hint,children:l("currentDshTargetError")})]})}function Wi({state:e,sessionId:n,listExistingVoiceSessions:t,setExistingVoiceSession:o,openExistingVoiceSession:r,showHome:i,homePickerId:s,closeHomePicker:c,t:l}){let[u,d]=(0,Ae.useState)(null),[m,f]=(0,Ae.useState)(!1),[p,y]=(0,Ae.useState)(""),[v,b]=(0,Ae.useState)(null),[x,z]=(0,Ae.useState)(!1),[M,$]=(0,Ae.useState)(!1),[j,W]=(0,Ae.useState)(null),U=(0,Ae.useRef)(null),E=(0,Ae.useRef)(!1),S=(0,Ae.useId)(),k=!!s,C=k||m,R=e.status,P=Object.hasOwn(R??{},"existingVoiceSession")?R.existingVoiceSession:u?.binding,N=R?.existingVoiceSessionSupported!==!1,I=ar(e,n),H=e.existingSessionWritePending,Z=u?.items.find(ne=>ne.sessionId===v),L=I&&!x&&!!P,K=I&&N&&!x&&!M&&!!u,de=(0,Ae.useCallback)(async(ne="",pe)=>{U.current?.abort();let ge=new AbortController;U.current=ge,z(!0),$(!1);try{let Ie=await t({...ne?{query:ne}:{},...pe?{cursor:pe}:{}},ge.signal);if(ge.signal.aborted)return;d(He=>({...Ie,query:ne,items:pe&&He?[...new Map([...He.items,...Ie.items].map(Te=>[Te.sessionId,Te])).values()]:Ie.items}))}catch{ge.signal.aborted||$(!0)}finally{U.current===ge&&(U.current=null,z(!1))}},[t]);(0,Ae.useEffect)(()=>(E.current=!0,N?de():z(!1),()=>{E.current=!1,U.current?.abort(),U.current=null}),[de,N]);let ue=ne=>{ne.preventDefault(),b(null),W(null),de(p.trim())},Q=async ne=>{if(!(!(ne===null?L:K)||ne===(P?.sessionId??null))){W(null);try{let{binding:pe}=await o({sessionId:ne,expectedSessionId:P?.sessionId??null});if(!E.current)return;if(k){c();return}d(ge=>ge&&{...ge,binding:pe}),f(!1),b(null),y(""),W({text:pe?"\u5DF2\u7ED1\u5B9A\u3002\u70B9\u51FB\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u540E\u5373\u53EF\u7EE7\u7EED\u8BE5\u4F1A\u8BDD\u3002":"\u5DF2\u89E3\u9664\uFF0C\u4E0B\u4E00\u6B21\u5F00\u59CB\u5BF9\u8BDD\u5C06\u4F7F\u7528\u9C7C\u5E94\u4F1A\u8BDD\u3002"}),N&&de()}catch(pe){if(!E.current)return;W({error:!0,text:typeof pe?.message=="string"&&pe.message?pe.message.split(`
`)[0].slice(0,160):"\u4F1A\u8BDD\u7ED1\u5B9A\u672A\u786E\u8BA4\uFF0C\u8BF7\u6838\u5BF9\u5F53\u524D\u7ED1\u5B9A\u3002"}),b(null),N&&de(C?p.trim():"")}}},G=(0,re.jsxs)(re.Fragment,{children:[x&&(0,re.jsx)("p",{role:"status",className:h.hint,children:l("loadingVoiceTargets")}),M&&(0,re.jsxs)("div",{role:"alert",className:h.notice,children:[l("voiceTargetListError")," ",(0,re.jsx)(mn.Button,{variant:"outline",disabled:H,onClick:()=>{de(p.trim())},children:l("retryVoiceTargets")})]})]}),A=j&&(0,re.jsx)("p",{role:j.error?"alert":"status",className:j.error?h.notice:h.hint,children:j.text});return(0,re.jsxs)("section",{id:s,className:k?h.homeTargetPicker:h.section,"data-whale-existing-session":!0,"aria-label":k?l("chooseVoiceTarget"):void 0,"data-no-drag":k||void 0,children:[!k&&(0,re.jsxs)(re.Fragment,{children:[(0,re.jsx)("h3",{children:"\u8BED\u97F3\u5BF9\u8BDD\u76EE\u6807"}),(0,re.jsxs)("div",{className:h.existingSessionTarget,children:[(0,re.jsx)("strong",{className:h.sessionTitle,children:P?Ct(P):"\u9C7C\u5E94\u4F1A\u8BDD"}),(0,re.jsx)("p",{className:h.hint,children:P?"\u8BED\u97F3\u548C\u56DE\u7B54\u5199\u5165\u6B64\u4F1A\u8BDD\uFF0C\u9C7C\u5E94\u4EC5\u5728\u672C\u673A\u64AD\u62A5\u3002\u5176\u4ED6\u63D2\u4EF6\u7684\u8F6C\u53D1\u7531\u5176\u8BBE\u7F6E\u51B3\u5B9A\u3002":"\u53EF\u7ED1\u5B9A\u5DF2\u6709 DSH \u4F1A\u8BDD\uFF0C\u6CBF\u7528\u539F\u6765\u7684\u4E0A\u4E0B\u6587\u548C\u5386\u53F2\u3002"}),P&&sr(P)&&(0,re.jsxs)("p",{role:"status",className:h.notice,children:[sr(P),"\u3002\u53EF\u89E3\u9664\u7ED1\u5B9A\u6216\u9009\u62E9\u5176\u4ED6\u4F1A\u8BDD\u3002"]}),!N&&(0,re.jsx)("p",{role:"status",className:h.notice,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u4E0D\u652F\u6301\u7ED1\u5B9A\u5DF2\u6709\u4F1A\u8BDD\u3002"}),R?.enabled&&(0,re.jsx)("p",{className:h.hint,children:"\u7ED3\u675F\u8BED\u97F3\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u7ED1\u5B9A\u3002"})]}),(0,re.jsxs)("div",{className:h.actions,children:[(0,re.jsx)(mn.Button,{variant:"outline","aria-expanded":C,disabled:!N||H,onClick:()=>{f(!C),b(null),y(""),C||de()},children:C?"\u5173\u95ED\u4F1A\u8BDD\u5217\u8868":P?"\u66F4\u6362\u7ED1\u5B9A":"\u9009\u62E9\u5DF2\u6709\u4F1A\u8BDD"}),Rn(P)&&r&&(0,re.jsx)(mn.Button,{variant:"outline","data-whale-operation":"open-native-session",onClick:async()=>{W(null);try{await r(P.sessionId),await i?.()}catch{E.current&&W({error:!0,text:"DSH \u6682\u65F6\u65E0\u6CD5\u6253\u5F00\u539F\u4F1A\u8BDD\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"})}},children:"\u6253\u5F00\u539F\u4F1A\u8BDD"}),P&&(0,re.jsx)(mn.Button,{variant:"outline","data-whale-operation":"unbind-existing-session",disabled:!L,onClick:()=>{Q(null)},children:"\u89E3\u9664\u7ED1\u5B9A"})]})]}),C&&(0,re.jsxs)("div",{className:h.existingSessionPicker,"aria-busy":x,children:[(0,re.jsxs)("form",{className:h.existingSessionSearch,onSubmit:ue,children:[(0,re.jsx)(mn.Input,{type:"search","aria-label":l("searchVoiceTargets"),placeholder:l("searchVoiceTargets"),value:p,maxLength:128,disabled:H,onChange:ne=>y(ne.target.value)}),(0,re.jsx)(mn.Button,{type:"submit",variant:"outline",disabled:H,children:l("searchVoiceTargetsAction")})]}),u?.items.length>0&&(0,re.jsx)("ul",{className:h.existingSessionList,"aria-label":l("existingVoiceTargetList"),children:u.items.map(ne=>{let pe=P?.sessionId===ne.sessionId,ge=pe||!Rn(ne),Ie=(0,re.jsxs)("span",{className:h.hint,children:[pe?l("boundVoiceTarget")+" \xB7 ":"",l("voiceTargetAvailability_"+(ne.unavailableReason??ne.availability))," \xB7 ",ne.sessionId]});return(0,re.jsx)("li",{children:k?(0,re.jsxs)(mn.Button,{variant:"ghost",className:h.homeTargetRow,"data-whale-operation":"bind-existing-session",title:ne.sessionId,"aria-current":pe||void 0,"aria-disabled":!K,disabled:ge,onClick:()=>{Q(ne.sessionId)},children:[(0,re.jsx)("strong",{className:h.sessionTitle,children:Ct(ne)}),Ie]}):(0,re.jsxs)("label",{title:ne.sessionId,children:[(0,re.jsx)("input",{type:"radio",name:S,value:ne.sessionId,checked:v===ne.sessionId,disabled:ge||x||H,onChange:()=>{b(ne.sessionId),W(null)}}),(0,re.jsxs)("span",{children:[(0,re.jsx)("strong",{className:h.sessionTitle,children:Ct(ne)}),Ie]})]})},ne.sessionId)})}),G,!x&&!M&&u?.items.length===0&&(0,re.jsx)("p",{role:"status",className:h.hint,children:l(u.query?"voiceTargetNoMatch":"voiceTargetEmptyList")}),Z&&(0,re.jsx)("p",{id:S+"-tts",className:h.hint,children:l("voiceTargetSynthesisNotice")}),A,(!k||u?.nextCursor||P)&&(0,re.jsxs)("div",{className:h.actions,children:[!k&&(0,re.jsx)(mn.Button,{variant:"primary","data-whale-operation":"bind-existing-session","aria-describedby":Z?S+"-tts":void 0,disabled:!K||!Rn(Z)||Z.sessionId===P?.sessionId,onClick:()=>{Q(v)},children:l(H?"savingVoiceTarget":"bindVoiceTarget")}),!!u?.nextCursor&&(0,re.jsx)(mn.Button,{variant:"outline",disabled:x||H,onClick:()=>{de(u.query,u.nextCursor)},children:l("moreVoiceTargets")}),k&&P&&(0,re.jsx)(mn.Button,{variant:"outline","data-whale-operation":"unbind-existing-session",disabled:!L,onClick:()=>{Q(null)},children:l("backToFishVoice")})]})]}),!C&&(0,re.jsxs)(re.Fragment,{children:[G,A]})]})}var Nt=require("react"),jt=require("@deepseek-ai/dsh-client-ui-primitives");var cr="dsh-fish-voice";var Ii={name:"Emikosama",url:"https://github.com/Emikosama"};var dd="https://github.com/Emikosama/dsh-fish-voice",mo={url:"https://github.com/Emikosama/dsh-fish-voice/issues"};var xe=require("react/jsx-runtime");function pd(e,n){let t=e.updates;return e.updatePending==="install"?n("update_installing"):e.updatePending==="check"?n("update_checking"):e.updatesUnavailable?n("updateConnection"):t?t.message||n("update_"+t.status):n("update_idle")}function md({state:e,open:n,t}){let o=e.updates,r=!e.updatesUnavailable&&(o?.release||["restart-required","enable-required","installed"].includes(o?.status));return(0,xe.jsxs)("section",{className:h.section,"data-whale-update-settings":!0,children:[(0,xe.jsx)("h3",{children:t("updateTitle")}),o&&(0,xe.jsxs)("p",{className:h.hint,children:[t("updateCurrentVersion")," ",o.currentVersion," \xB7 ",t("updateChannel_"+o.channel)]}),(0,xe.jsx)("p",{children:pd(e,t)}),(0,xe.jsxs)("div",{className:h.actions,children:[r&&(0,xe.jsx)(jt.Button,{variant:"outline",onClick:()=>n(!1),children:t("updateDetails")}),(0,xe.jsx)(jt.Button,{variant:"outline",disabled:!!e.updatePending||!e.updatesUnavailable&&o?.status==="installing",onClick:()=>n(!0),children:t("updateCheck")}),(0,xe.jsx)("a",{href:mo.url,"data-whale-operation":"open-feedback",target:"_blank",rel:"noreferrer noopener",children:t("updateFeedback")})]})]})}function fd({state:e,close:n,run:t,t:o}){let r=(0,Nt.useRef)(null),i=(0,Nt.useId)();(0,Nt.useLayoutEffect)(()=>{let p=r.current;return typeof p.showModal=="function"?p.showModal():p.setAttribute("open",""),()=>{p.open&&p.close?.()}},[]);let s=e.updates,c=s?.release,l=!!e.updatePending||!e.updatesUnavailable&&["checking","installing"].includes(s?.status),u=!e.updatesUnavailable&&!l&&s?.canInstall&&c,d=!l&&(e.updatesUnavailable||!["restart-required","enable-required"].includes(s?.status)),m=!e.updatesUnavailable&&["available","incompatible"].includes(s?.status),f=u&&!s.message?null:pd(e,o);return(0,xe.jsxs)("dialog",{ref:r,className:h.updateDialog,"data-whale-update-dialog":!0,"data-no-drag":!0,"aria-labelledby":i,onCancel:p=>{p.preventDefault(),n()},onKeyDown:p=>p.stopPropagation(),children:[(0,xe.jsxs)("header",{className:h.updateHeader,children:[(0,xe.jsx)(Xn,{}),(0,xe.jsx)("h2",{id:i,children:o(m?"updateOfferTitle":"updateTitle")})]}),s&&(0,xe.jsxs)("p",{className:h.hint,children:[o("updateCurrentVersion")," ",s.currentVersion,c&&c.version!==s.currentVersion&&(0,xe.jsxs)(xe.Fragment,{children:[" \xB7 ",o("updateNewVersion")," ",c.version]})," \xB7 ",o("updateChannel_"+s.channel)]}),c?.announcement&&(0,xe.jsx)("p",{className:h.updateAnnouncement,children:c.announcement}),f&&(0,xe.jsx)("p",{className:h.hint,role:"status",children:f}),(0,xe.jsxs)("div",{className:h.actions,children:[(0,xe.jsx)(jt.Button,{variant:"outline",onClick:n,children:o(m?"updateLater":"close")}),u&&(0,xe.jsx)(jt.Button,{variant:"primary",className:h.primary,onClick:()=>{t({action:"install",version:c.version})},children:o("updateInstall")}),!u&&d&&(0,xe.jsx)(jt.Button,{variant:"outline",onClick:()=>{t({action:"check"})},children:o("updateCheck")})]}),(0,xe.jsxs)("footer",{className:h.actions,children:[c?.url?.startsWith("https://")&&(0,xe.jsx)("a",{href:c.url,target:"_blank",rel:"noreferrer noopener",children:o("updateRelease")}),(0,xe.jsx)("a",{href:mo.url,"data-whale-operation":"open-feedback",target:"_blank",rel:"noreferrer noopener",children:o("updateFeedback")})]})]})}var Sh=new Map([["audio","settings-audio"],["interaction","settings-interaction"],["prompt","settings-prompt"],["models","settings-models"],["advanced","settings-advanced"],["pets","settings-pets"],["sessions","page-session-management"]]);function Uh(e){if(e.nativeEvent?.isTrusted!==!0)return null;let n=e.target;if(!n?.closest)return null;let t=n.closest("[data-whale-operation-log]");return t&&!(e.type==="click"&&n.closest("summary")?.parentElement===t)?null:n}function hd(e){let n=Uh(e);if(!n)return null;if(e.type==="submit")return"commit-form";if(e.type==="keydown")return e.key==="Escape"?"dismiss":["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key)&&n.closest('[data-settings-nav], [role="listbox"]')?"keyboard-navigation":null;if(e.type==="change")return n.matches('input[type="radio"]')&&["listen-mode-ptt","listen-mode-always","listen-mode-wake"].includes(n.dataset.whaleOperation)?n.dataset.whaleOperation:n.closest("[data-audio-device-controls] select")?"change-audio-device":n.matches('select, input[type="radio"], input[type="checkbox"]')?"edit-choice":null;if(e.type!=="click")return null;let t=n.closest("button, a[href], summary");if(!t||t.type==="submit"&&t.form)return null;let o=t.dataset.whaleOperation;return o==="open-feedback"&&t.matches("summary")&&t.parentElement.open?"dismiss":t.matches("summary")&&["session-history","subagent-history"].includes(o)?o+(t.parentElement.open?"-close":"-open"):o||(t.hasAttribute("data-settings-tab")?Sh.get(t.dataset.settingsTab)??"page-settings-tab":t.closest("[data-whale-session-management], [data-whale-existing-session]")?"manage-session":t.closest("[data-settings-page-heading] nav")?"page-model-tab":t.matches("summary")?"details-toggle":"activate-control")}var Fn=require("react"),Ti=require("@deepseek-ai/dsh-client-ui-primitives");var Ye=require("react/jsx-runtime"),zh="fish-voice-operation-log.log",gd=256*1024,Ch=(e,n)=>(e+n).slice(-gd);function vd({readOperationLog:e}){let[n,t]=(0,Fn.useState)(!1),[o,r]=(0,Fn.useState)(!1),[i,s]=(0,Fn.useState)(null),[c,l]=(0,Fn.useState)(null),u=(0,Fn.useRef)(null);if((0,Fn.useEffect)(()=>()=>u.current?.abort(),[]),!e)return null;let d=async f=>{if(u.current)return;let p=new AbortController;u.current=p,r(!0),l(null);try{let y=await e(p.signal);if(p.signal.aborted)return;if(f){let v=URL.createObjectURL(new Blob(y,{type:"text/plain;charset=utf-8"})),b=document.createElement("a");b.href=v,b.download=zh,jh(b),setTimeout(()=>URL.revokeObjectURL(v),1e3),l("\u5DF2\u8BF7\u6C42\u4FDD\u5B58\u8BCA\u65AD\u65E5\u5FD7\u3002")}else s({text:y.reduce(Ch,""),shortened:y.reduce((v,b)=>v+b.length,0)>gd})}catch{p.signal.aborted||l("\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u8BCA\u65AD\u65E5\u5FD7\uFF0C\u8BF7\u91CD\u8BD5\u3002")}finally{u.current===p&&(u.current=null),p.signal.aborted||r(!1)}},m=f=>{let p=f.currentTarget.open;t(p),p||(u.current?.abort(),u.current=null,r(!1),s(null),l(null))};return(0,Ye.jsxs)("details",{className:h.section,"data-whale-operation-log":!0,open:n,onToggle:m,children:[(0,Ye.jsx)("summary",{"data-whale-operation":"open-feedback",children:"\u6392\u67E5\u4E0E\u53CD\u9988"}),n&&(0,Ye.jsxs)(Ye.Fragment,{children:[(0,Ye.jsx)("p",{className:h.hint,children:"\u6700\u8FD1\u4E03\u5929\u7684\u64CD\u4F5C\u65E5\u5FD7\u3002\u53EF\u5148\u67E5\u770B\uFF0C\u518D\u81EA\u884C\u51B3\u5B9A\u662F\u5426\u968F\u53CD\u9988\u63D0\u4EA4\u3002"}),(0,Ye.jsxs)("div",{className:h.actions,children:[(0,Ye.jsx)(Ti.Button,{variant:"outline",disabled:o,onClick:()=>{d(!1)},children:"\u67E5\u770B\u8BCA\u65AD\u65E5\u5FD7"}),(0,Ye.jsx)(Ti.Button,{variant:"outline",disabled:o,onClick:()=>{d(!0)},children:"\u4FDD\u5B58\u8BCA\u65AD\u65E5\u5FD7"}),(0,Ye.jsx)("a",{href:mo.url+"/new",target:"_blank",rel:"noreferrer noopener",children:"\u63D0\u4EA4\u53CD\u9988"})]}),o&&(0,Ye.jsx)("p",{role:"status",className:h.hint,children:"\u6B63\u5728\u8BFB\u53D6\u8BCA\u65AD\u65E5\u5FD7\u2026"}),c&&(0,Ye.jsx)("p",{role:"status",className:h.hint,children:c}),i?.shortened&&(0,Ye.jsx)("p",{className:h.hint,children:"\u8FD9\u91CC\u53EA\u663E\u793A\u6700\u8FD1\u4E00\u6BB5\uFF0C\u4FDD\u5B58\u53EF\u53D6\u5F97\u5B8C\u6574\u65E5\u5FD7\u3002"}),i&&(0,Ye.jsx)("pre",{className:h.requestDetails,tabIndex:0,"aria-label":"\u64CD\u4F5C\u65E5\u5FD7\u9884\u89C8",children:i.text||"\u6682\u65E0\u64CD\u4F5C\u65E5\u5FD7\u3002"})]})]})}function jh(e){document.body.append(e);try{e.click()}finally{e.remove()}}var D=require("react"),J=require("@deepseek-ai/dsh-client-ui-primitives");var he=require("react"),me=require("@deepseek-ai/dsh-client-ui-primitives");var F={jobs:"FJGqDa_jobs",header:"FJGqDa_header",section:"FJGqDa_section",wizardBodyContent:"FJGqDa_wizardBodyContent",inlineField:"FJGqDa_inlineField",note:"FJGqDa_note",badge:"FJGqDa_badge",installPath:"FJGqDa_installPath",plan:"FJGqDa_plan",modelInstaller:"FJGqDa_modelInstaller",installHistory:"FJGqDa_installHistory",field:"FJGqDa_field",choices:"FJGqDa_choices",job:"FJGqDa_job",modelChoices:"FJGqDa_modelChoices",choice:"FJGqDa_choice",currentModel:"FJGqDa_currentModel",wizard:"FJGqDa_wizard",consentActions:"FJGqDa_consentActions",primary:"FJGqDa_primary",details:"FJGqDa_details",setupEnter:"FJGqDa_setupEnter",fullName:"FJGqDa_fullName",wizardBody:"FJGqDa_wizardBody",jobHeading:"FJGqDa_jobHeading",selectedModel:"FJGqDa_selectedModel",switcher:"FJGqDa_switcher",hint:"FJGqDa_hint",sourceChoices:"FJGqDa_sourceChoices",actions:"FJGqDa_actions",hardwareSummary:"FJGqDa_hardwareSummary",switchRow:"FJGqDa_switchRow",text:`.FJGqDa_section {
  min-width: 0;
  color: var(--dsw-alias-label-primary);
  gap: 8px;
  display: grid;
}

.FJGqDa_section h3, .FJGqDa_wizard h2, .FJGqDa_plan h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
}

.FJGqDa_section p, .FJGqDa_wizard p {
  margin: 0;
  line-height: 1.6;
}

.FJGqDa_hint, .FJGqDa_section small, .FJGqDa_wizard small {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 1.6;
}

.FJGqDa_note {
  border-left: 2px solid var(--dsw-alias-state-warn-primary);
  background: var(--dsw-alias-bg-layer-2);
  padding: 8px 12px;
  font-size: 12px;
}

.FJGqDa_actions, .FJGqDa_header {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  display: flex;
}

.FJGqDa_header {
  justify-content: space-between;
  align-items: flex-start;
}

.FJGqDa_choices {
  border: 0;
  gap: 8px;
  min-width: 0;
  margin: 0;
  padding: 0;
  display: grid;
}

.FJGqDa_choices legend {
  color: var(--dsw-alias-label-secondary);
  padding: 0 0 8px;
  font-size: 12px;
}

.FJGqDa_choice {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  cursor: pointer;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 10px;
  display: flex;
}

.FJGqDa_choice[data-selected="true"] {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,var(--dsw-alias-bg-layer-1));
}

.FJGqDa_choice input {
  accent-color: var(--dsw-alias-brand-primary);
  margin: 4px 0 0;
}

.FJGqDa_choice span {
  min-width: 0;
}

.FJGqDa_choice small, .FJGqDa_plan small {
  overflow-wrap: anywhere;
  display: block;
}

.FJGqDa_choice strong {
  font-size: 13px;
}

.FJGqDa_field {
  gap: 6px;
  font-size: 12px;
  display: grid;
}

.FJGqDa_field input, .FJGqDa_field select {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}

.FJGqDa_field select {
  font: inherit;
  color: inherit;
  background: var(--dsw-alias-bg-layer-2);
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  padding: 8px;
}

.FJGqDa_details {
  border-top: 1px solid var(--dsw-alias-border-l2);
  min-width: 0;
  padding-top: 12px;
}

.FJGqDa_details summary {
  cursor: pointer;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

.FJGqDa_details[open] > summary {
  margin-bottom: 12px;
}

.FJGqDa_badge {
  border-radius: var(--dsw-radius-sm);
  color: var(--dsw-alias-label-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,var(--dsw-alias-bg-layer-1));
  margin-left: 8px;
  padding: 2px 6px;
  font-size: 11px;
}

.FJGqDa_plan, .FJGqDa_job {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  gap: 10px;
  min-width: 0;
  padding: 12px;
  display: grid;
}

.FJGqDa_plan dl {
  grid-template-columns: auto minmax(0, 1fr);
  gap: 6px 12px;
  margin: 0;
  font-size: 12px;
  display: grid;
}

.FJGqDa_plan dt {
  color: var(--dsw-alias-label-secondary);
}

.FJGqDa_plan dd {
  overflow-wrap: anywhere;
  margin: 0;
}

.FJGqDa_plan a {
  color: var(--dsw-alias-link);
  overflow-wrap: anywhere;
  font-size: 12px;
}

.FJGqDa_plan ul {
  margin: 0;
  padding-left: 16px;
  font-size: 12px;
}

.FJGqDa_jobs {
  gap: 12px;
  display: grid;
}

.FJGqDa_job progress {
  width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
}

.FJGqDa_wizard {
  box-sizing: border-box;
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-layer-1);
  border-radius: var(--dsw-radius-lg);
}

.FJGqDa_section button, .FJGqDa_wizard button {
  transition: transform var(--ds-transition-duration-fast, .1s) var(--whale-ease, ease-out);
}

.FJGqDa_section button:active:not(:disabled), .FJGqDa_wizard button:active:not(:disabled) {
  transform: scale(.97);
}

.FJGqDa_section :is(button, input, select, a, summary):focus-visible, .FJGqDa_wizard :is(button, summary):focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

[data-motion="firm"] .FJGqDa_wizard {
  --whale-duration: var(--ds-transition-duration-fast, .1s);
  --whale-ease: ease-out;
}

[data-motion="off"] .FJGqDa_wizard, [data-motion="off"] .FJGqDa_wizard *, [data-motion="off"] .FJGqDa_section * {
  transition: none !important;
  animation: none !important;
  transform: none !important;
}

@keyframes FJGqDa_setupEnter {
  from {
    translate: 0 4px;
  }

  to {
    translate: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .FJGqDa_wizard, .FJGqDa_wizard *, .FJGqDa_section * {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
}

@media (width <= 520px) {
  .FJGqDa_wizard {
    padding: 12px;
  }

  .FJGqDa_plan dl {
    grid-template-columns: minmax(0, 1fr);
    gap: 3px;
  }

  .FJGqDa_plan dd {
    margin-bottom: 6px;
  }
}

@media (forced-colors: active) {
  .FJGqDa_choice[data-selected="true"] {
    outline: 2px solid highlight;
  }
}

.FJGqDa_wizard {
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

.FJGqDa_wizard > .FJGqDa_header, .FJGqDa_wizard > footer {
  flex-shrink: 0;
}

.FJGqDa_wizardBody {
  overscroll-behavior: contain;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.FJGqDa_wizardBodyContent {
  align-content: start;
  gap: 12px;
  display: grid;
}

.FJGqDa_primary {
  color: var(--dsw-alias-label-primary) !important;
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 16%,var(--dsw-alias-bg-layer-2)) !important;
  border: 1px solid var(--dsw-alias-border-l2) !important;
}

.FJGqDa_primary:disabled {
  opacity: .5;
}

.FJGqDa_choices {
  gap: 6px;
}

.FJGqDa_choice {
  box-sizing: border-box;
  align-items: center;
  min-height: 38px;
}

.FJGqDa_choice input {
  flex: none;
  margin: 0;
}

.FJGqDa_choice strong {
  display: block;
}

.FJGqDa_choice:has(input:disabled) {
  cursor: default;
  opacity: .65;
}

.FJGqDa_note p {
  margin: 0;
}

.FJGqDa_note button {
  margin-top: 8px;
}

.FJGqDa_wizard > footer {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

.FJGqDa_wizardBody {
  padding: 2px 4px 8px 0;
}

.FJGqDa_section > button, .FJGqDa_wizardBody > button {
  justify-self: start;
  max-width: 100%;
}

.FJGqDa_section button, .FJGqDa_wizard button {
  white-space: normal;
  max-width: 100%;
  height: auto;
  min-height: 36px;
}

.FJGqDa_actions > button {
  flex: 0 auto;
}

.FJGqDa_sourceChoices {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.FJGqDa_sourceChoices legend {
  grid-column: 1 / -1;
}

.FJGqDa_inlineField {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-width: 0;
  font-size: 12px;
  display: flex;
}

.FJGqDa_inlineField select {
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

.FJGqDa_inlineField input[type="number"] {
  width: 80px;
  min-width: 0;
}

.FJGqDa_field:has( > input[type="number"]) {
  flex-wrap: wrap;
  align-items: center;
  display: flex;
}

.FJGqDa_field > input[type="number"] {
  width: 80px;
}

.FJGqDa_details > summary {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  box-sizing: content-box;
  width: fit-content;
  max-width: 100%;
  min-height: 20px;
  padding: 7px 10px;
}

.FJGqDa_fullName {
  min-width: 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

.FJGqDa_fullName summary {
  cursor: pointer;
}

.FJGqDa_fullName p {
  overflow-wrap: anywhere;
}

.FJGqDa_consentActions {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  display: flex;
}

@container (width <= 360px) {
  .FJGqDa_sourceChoices {
    grid-template-columns: minmax(0, 1fr);
  }

  .FJGqDa_inlineField select {
    width: 150px;
  }
}

@media (width <= 420px) {
  .FJGqDa_wizard .FJGqDa_sourceChoices {
    grid-template-columns: minmax(0, 1fr);
  }
}

.FJGqDa_modelChoices {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.FJGqDa_modelChoices > legend {
  grid-column: 1 / -1;
  padding-bottom: 5px;
}

.FJGqDa_modelChoices .FJGqDa_choice {
  gap: 7px;
  min-height: 80px;
  padding: 8px;
}

.FJGqDa_modelChoices .FJGqDa_choice strong {
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  display: flex;
}

.FJGqDa_modelChoices .FJGqDa_badge {
  white-space: nowrap;
  margin-left: 0;
}

.FJGqDa_hardwareSummary {
  color: var(--dsw-alias-label-secondary);
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 2px 10px;
  font-size: 11px;
  display: flex;
}

.FJGqDa_hardwareSummary small {
  font-size: 10px;
}

.FJGqDa_currentModel, .FJGqDa_switchRow, .FJGqDa_jobHeading {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.FJGqDa_currentModel {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  padding: 7px 8px;
  font-size: 12px;
}

.FJGqDa_currentModel > span, .FJGqDa_switchRow > span {
  overflow-wrap: anywhere;
  min-width: 0;
}

.FJGqDa_currentModel button, .FJGqDa_switchRow button {
  flex: none;
  min-height: 30px;
  padding: 0 9px;
}

.FJGqDa_switcher {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  gap: 7px;
  padding: 8px;
  display: grid;
}

.FJGqDa_switchRow small {
  display: block;
}

.FJGqDa_selectedModel {
  border-top: 1px solid var(--dsw-alias-border-l2);
  gap: 7px;
  padding-top: 6px;
  display: grid;
}

.FJGqDa_selectedModel .FJGqDa_details {
  padding-top: 4px;
}

.FJGqDa_selectedModel .FJGqDa_details summary {
  border: 0;
  padding: 3px 0;
}

.FJGqDa_installHistory {
  border-top: 1px solid var(--dsw-alias-border-l2);
}

.FJGqDa_installHistory > summary {
  cursor: pointer;
  padding: 8px 0;
  font-size: 12px;
  display: list-item;
}

.FJGqDa_installHistory > summary small {
  margin-left: 12px;
}

.FJGqDa_installHistory .FJGqDa_job {
  gap: 6px;
  padding: 9px;
}

.FJGqDa_jobHeading {
  flex-wrap: wrap;
}

.FJGqDa_installPath {
  min-width: 0;
  font-size: 11px;
}

.FJGqDa_installPath summary {
  cursor: pointer;
  color: var(--dsw-alias-label-secondary);
}

.FJGqDa_installPath p {
  overflow-wrap: anywhere;
}

.FJGqDa_modelInstaller .FJGqDa_jobs:empty {
  display: none;
}

@container (width <= 300px) {
  .FJGqDa_modelChoices {
    grid-template-columns: minmax(0, 1fr);
  }

  .FJGqDa_currentModel {
    flex-wrap: wrap;
  }
}

.FJGqDa_section[aria-label="\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84"] p {
  overflow-wrap: anywhere;
}

.FJGqDa_choice {
  transition: background-color .12s ease-out, border-color .12s ease-out, box-shadow .12s ease-out;
}

.FJGqDa_choice:hover:has(input:not(:disabled)) {
  border-color: var(--dsw-alias-brand-primary);
}

.FJGqDa_choice:has(input:focus-visible) {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: 2px;
}

.FJGqDa_section :is(button, select, input, summary), .FJGqDa_wizard :is(button, select, input, summary) {
  transition: background-color .12s ease-out,border-color .12s ease-out,color .12s ease-out,transform var(--whale-duration, .2s) var(--whale-ease, ease-out);
}

.FJGqDa_section button:hover:not(:disabled), .FJGqDa_wizard button:hover:not(:disabled) {
  background-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,var(--dsw-alias-bg-layer-1));
}

.FJGqDa_plan, .FJGqDa_switcher, .FJGqDa_selectedModel, .FJGqDa_section [data-whale-save-result], .FJGqDa_wizardBodyContent > section {
  animation: FJGqDa_setupEnter var(--whale-duration, .2s) ease-out;
}

[data-motion="firm"] :is(.FJGqDa_section, .FJGqDa_wizard) {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="off"] :is(.FJGqDa_section, .FJGqDa_wizard), [data-motion="off"] :is(.FJGqDa_section, .FJGqDa_wizard) *, [data-motion="off"] :is(.FJGqDa_section, .FJGqDa_wizard) :before {
  transition: none !important;
  animation: none !important;
}

[data-motion="off"] :is(.FJGqDa_section, .FJGqDa_wizard) button:active {
  transform: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .FJGqDa_section, .FJGqDa_wizard, .FJGqDa_section *, .FJGqDa_wizard *, .FJGqDa_section :before, .FJGqDa_wizard :before {
    transition: none !important;
    animation: none !important;
  }

  .FJGqDa_section button:active, .FJGqDa_wizard button:active {
    transform: none !important;
  }
}
`};var g=require("react/jsx-runtime"),bd=[["edge","Edge \u5728\u7EBF\u6717\u8BFB","\u9ED8\u8BA4\u6653\u4F0A \xB7 \u8FDE\u4E0D\u4E0A\u65F6\u663E\u793A\u6587\u5B57"],["local","\u672C\u5730\u8BED\u97F3\u6A21\u578B","\u5728\u672C\u673A\u5408\u6210\uFF0C\u9996\u6B21\u9700\u8981\u4E0B\u8F7D"],["off","\u4E0D\u53D1\u58F0","\u53EA\u663E\u793A\u6587\u5B57"]],xd=[bd[0],["deepseek","DeepSeek \u8BED\u97F3\u5408\u6210","\u4F7F\u7528 DeepSeek \u5F00\u653E\u5E73\u53F0\u7684 API Key"],...bd.slice(1)],yd={edge:"Edge \u5728\u7EBF\u6717\u8BFB",deepseek:"DeepSeek \u8BED\u97F3\u5408\u6210",local:"\u672C\u5730\u8BED\u97F3\u6A21\u578B"},Di={provider:"unconfigured",edgeVoice:"zh-CN-XiaoyiNeural",deepseekVoice:"stella",deepseekTextTransmissionAccepted:!1,systemVoice:null,systemFallback:!1,edgeTextTransmissionAccepted:!1,volume:.8,localModelId:null,localModelPath:null,referenceAudioPath:null},$i=e=>{let n={...e};return delete n.referenceAudioAccepted,n},_d=(e,n)=>({...$i(e),referenceAudioAccepted:e.referenceAudioPath===n?.referenceAudioPath&&n?.referenceAudioAccepted===!0}),kd=F.text,Nh=e=>({"restart-requires-resume":"\u5BBF\u4E3B\u5DF2\u91CD\u542F\uFF0C\u8BF7\u7EE7\u7EED\u540E\u91CD\u65B0\u6838\u9A8C\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u8986\u76D6\u8BBE\u7F6E\u3002","authorization-changed":"\u6388\u6743\u5DF2\u6539\u53D8\uFF0C\u8BF7\u5728\u6743\u9650\u4E2D\u6838\u67E5\u540E\u7EE7\u7EED\u3002",MODEL_SOURCE_AUTHORIZATION_REQUIRED:"\u6A21\u578B\u6765\u6E90\u6388\u6743\u5DF2\u53D8\u5316\uFF0C\u8BF7\u8865\u5145\u4E00\u6B21\u6388\u6743\u540E\u7EE7\u7EED\u3002",HUMAN_SETTING_PINNED:"\u8BBE\u7F6E\u6743\u9650\u5DF2\u64A4\u9500\uFF0C\u8BF7\u5728\u6743\u9650\u4E2D\u6838\u67E5\u540E\u7EE7\u7EED\u3002"})[e]??(typeof e=="string"&&/^[A-Z_:-]+$/.test(e)?"\u8FD0\u884C\u68C0\u67E5\u672A\u901A\u8FC7\uFF0C\u8BF7\u68C0\u67E5\u4F9D\u8D56\u6216\u67E5\u770B\u9AD8\u7EA7\u8BBE\u7F6E\u4E2D\u7684\u9519\u8BEF\u3002":e),bn=e=>Number.isFinite(e)&&e>=0?`${(e/1024**2).toFixed(1)} MiB`:"\u672A\u77E5";function Pd(e,n){let t=e.status;return!!(e.checkedFor===n&&e.settingsFor===n&&e.settings?.revision&&!e.ttsCancelling&&!e.ttsUncertain&&!e.uncertain&&!e.settingsConflict&&t?.enabled===!1&&t?.ownerSessionId===null&&t?.voiceControlBusy===!1&&t?.voiceSession?.fullyStopped===!0&&t?.voiceSession?.id===null&&!t?.ttsRuntime?.busy&&!t?.ttsRuntime?.blocked)}function st(e,n){return!e.busy&&Pd(e,n)}function At(e,n){let t=(0,he.useRef)(!1),[o,r]=(0,he.useState)(!1),[i,s]=(0,he.useState)(null),[c,l]=(0,he.useState)(0);return[async(d,m)=>{if(t.current)return!1;t.current=!0,r(!0),s(d);try{return await e(n,d,m)}catch{return!1}finally{t.current=!1,r(!1),s(null),l(f=>f+1)}},o,i,{isLocked:()=>t.current,settled:c}]}function Sd({state:e,sessionId:n,run:t}){if(Pd(e,n))return null;let o=e.checkedFor===n&&(e.status?.enabled||e.status?.ownerSessionId);return(0,g.jsxs)("div",{className:F.note,role:"status",children:[(0,g.jsx)("p",{children:e.busy?"\u6B63\u5728\u8BFB\u53D6\u6216\u4FDD\u5B58\uFF0C\u8BF7\u7A0D\u5019\u2026":o?"\u8BF7\u5148\u505C\u6B62\u8BED\u97F3\uFF0C\u518D\u7F16\u8F91\u6216\u8BD5\u542C\u3002":e.ttsUncertain||e.uncertain?"\u6B63\u5728\u6838\u67E5\u4E0A\u6B21\u64CD\u4F5C\u3002":"\u6B63\u5728\u51C6\u5907\u8BBE\u7F6E\u2026"}),o&&n&&t&&(0,g.jsx)(me.Button,{variant:"outline",disabled:e.busy&&(!e.interruptibleRead||e.diagnosticStopPending)||e.ttsCancelling,onClick:()=>{t(n,"disable")},children:"\u505C\u6B62\u8BED\u97F3\u4EE5\u7F16\u8F91"})]})}function Ud(e){let n=e.state.settingsFor===e.sessionId?e.state.settings:null,t=e.state.authorization?.scopes?.some(r=>r.id==="edge-text"&&r.allowed)===!0,o=n&&t?{...n,ttsSetup:{...n.ttsSetup,edgeTextTransmissionAccepted:!0}}:n;return(0,g.jsx)(Ah,{...e,settings:o},`${e.sessionId}:${e.state.settingsKey??o?.revision??"unread"}`)}function Ah({state:e,sessionId:n,run:t,settings:o,prepared:r=!1,active:i=!0,markSettingsEdited:s,pickPath:c}){let[l,u]=(0,he.useState)(()=>({...Di,...o?.ttsSetup})),[d,m,f]=At(t,n),p=(0,he.useId)(),[y,v]=(0,he.useState)(!1),b=e.ttsCapabilitiesFor===n?e.ttsCapabilities:null,x=e.checkedFor===n?e.status?.ttsRuntime:null,z=e.ttsPreviewFor===n?e.ttsPreview:null,M=e.installerFor===n?e.installer?.jobs?.find(S=>dr(S,o)):null,$=!st(e,n)||m,j=JSON.stringify(l)!==JSON.stringify({...Di,...o?.ttsSetup}),W=S=>{s?.("save-tts"),u(k=>({...k,...S}))},U=l.localModelId==="qwen3-tts-base-1.7b-gguf",E=l.provider!=="unconfigured"&&(l.provider!=="local"||!!(l.localModelId&&l.localModelPath)&&(!l.referenceAudioPath||U))&&(l.provider!=="edge"||l.edgeTextTransmissionAccepted)&&(l.provider!=="deepseek"||l.deepseekTextTransmissionAccepted&&b?.deepseekKeyAvailable===!0)&&l.volume!==""&&Number.isFinite(Number(l.volume))&&Number(l.volume)>=0&&Number(l.volume)<=1;return(0,g.jsxs)("section",{className:F.section,"aria-label":"\u6717\u8BFB\u8BBE\u7F6E","data-settings-draft":"save-tts",children:[(0,g.jsx)("header",{children:(0,g.jsx)("h3",{children:"\u56DE\u7B54\u600E\u4E48\u53D1\u58F0"})}),(!r||n&&!(e.checkedFor===n&&(e.status?.enabled||e.status?.ownerSessionId)))&&(0,g.jsx)(Sd,{state:e,sessionId:n,run:t}),(!r||!o||!b||e.uncertain||e.ttsUncertain||l.provider==="deepseek"&&b.deepseekKeyAvailable!==!0)&&(0,g.jsx)("div",{className:F.actions,children:(0,g.jsx)(me.Button,{variant:"outline",disabled:e.busy||m,onClick:()=>d("inspect-tts"),children:l.provider==="deepseek"?"\u68C0\u67E5 DeepSeek API Key":"\u68C0\u6D4B\u672C\u673A\u8BED\u97F3"})}),(0,g.jsxs)("fieldset",{className:`${F.choices} ${F.sourceChoices}`,disabled:$||!o,children:[(0,g.jsx)("legend",{children:"\u6717\u8BFB\u6765\u6E90"}),xd.map(([S,k,C])=>(0,g.jsxs)("label",{className:F.choice,"data-selected":l.provider===S,children:[(0,g.jsx)("input",{type:"radio",name:p,checked:l.provider===S,onChange:()=>W({provider:S,...S==="edge"?{edgeTextTransmissionAccepted:!0}:S==="deepseek"?{deepseekTextTransmissionAccepted:!0}:{}})}),(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:k}),(0,g.jsx)("small",{children:C})]})]},S))]}),l.provider==="edge"&&(0,g.jsxs)("div",{className:F.section,children:[(0,g.jsx)("p",{className:F.hint,children:"\u6717\u8BFB\u6587\u5B57\u4F1A\u53D1\u9001\u7ED9\u5FAE\u8F6F\u3002\u8054\u7F51\u5931\u8D25\u65F6\uFF0C\u56DE\u7B54\u4F1A\u663E\u793A\u4E3A\u6587\u5B57\u3002"}),b?.edgeDependency==="missing"&&(0,g.jsx)("p",{role:"status",className:F.hint,children:"Edge \u6717\u8BFB\u7EC4\u4EF6\u6682\u4E0D\u53EF\u7528\u3002\u56DE\u7B54\u4F1A\u663E\u793A\u4E3A\u6587\u5B57\u3002"})]}),l.provider==="deepseek"&&(0,g.jsxs)("div",{className:F.section,children:[(0,g.jsx)("p",{className:F.hint,children:"\u8BD5\u542C\u6216\u4FDD\u5B58\u540E\u6717\u8BFB\u65F6\uFF0C\u6587\u5B57\u4F1A\u53D1\u9001\u7ED9 DeepSeek\u3002"}),b?.deepseekKeyAvailable!==!0&&(0,g.jsx)("p",{role:"status",className:F.hint,children:"\u8BF7\u5148\u5728 DSH \u7684 DeepSeek API Key \u63D0\u4F9B\u5546\u4E2D\u914D\u7F6E\u5F00\u653E\u5E73\u53F0\u5BC6\u94A5\uFF0C\u518D\u70B9\u300C\u68C0\u67E5 DeepSeek API Key\u300D\u3002"}),(0,g.jsxs)("label",{className:F.inlineField,children:["DeepSeek \u97F3\u8272",(0,g.jsxs)("select",{value:l.deepseekVoice,disabled:$,onChange:S=>W({deepseekVoice:S.target.value}),children:[(0,g.jsx)("option",{value:"stella",children:"\u6D77\u661F \xB7 \u5973\u58F0"}),(0,g.jsx)("option",{value:"tide",children:"\u6697\u6F6E \xB7 \u7537\u58F0"})]})]})]}),l.provider==="local"&&(l.localModelId?(0,g.jsxs)("div",{className:F.section,children:[(0,g.jsxs)("div",{className:F.currentModel,children:[(0,g.jsxs)("span",{children:["\u5F53\u524D\u6717\u8BFB\u6A21\u578B ",(0,g.jsx)("strong",{children:l.localModelId.startsWith("qwen3")?"Qwen3-TTS":l.localModelId.includes("melo")?"MeloTTS":l.localModelId})]}),(0,g.jsx)(me.Button,{variant:"outline","aria-expanded":y,disabled:j,onClick:()=>v(S=>!S),children:"\u5207\u6362\u5F53\u524D\u6A21\u578B"})]}),y&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(Cd,{state:e,sessionId:n,run:t,purpose:"tts"}),(0,g.jsxs)("details",{className:F.details,children:[(0,g.jsx)("summary",{children:"\u5B89\u88C5\u5176\u4ED6\u6717\u8BFB\u6A21\u578B"}),(0,g.jsx)(ur,{pickPath:c,state:e,sessionId:n,run:t,active:i})]})]})]}):(0,g.jsx)(ur,{pickPath:c,state:e,sessionId:n,run:t,active:i})),l.provider==="local"&&!j&&M?.modelId==="qwen3-tts-base-1.7b-gguf"&&(0,g.jsxs)("p",{className:F.hint,children:["\u5F53\u524D\u5B89\u88C5\u65B9\u6848\uFF1A",fo(M.compute),"\u3002",M.compute==="cpu"?"\u6B64\u5B89\u88C5\u53EA\u4F7F\u7528 CPU\u3002\u53EF\u5728\u201C\u5207\u6362\u5F53\u524D\u6A21\u578B \u2192 \u5B89\u88C5\u5176\u4ED6\u6717\u8BFB\u6A21\u578B\u201D\u9009\u62E9\u81EA\u52A8 GPU\uFF1B\u4E0B\u8F7D\u8FD0\u884C\u7EC4\u4EF6\u524D\u4ECD\u9700\u786E\u8BA4\u3002":"\u662F\u5426\u5B9E\u9645\u4F7F\u7528 GPU\uFF0C\u4EE5\u5B8C\u6210\u5408\u6210\u540E\u7684\u672C\u5730\u8BA1\u7B97\u72B6\u6001\u4E3A\u51C6\u3002"]}),(0,g.jsxs)("details",{className:F.details,children:[(0,g.jsx)("summary",{children:"\u97F3\u8272\u4E0E\u97F3\u91CF"}),(0,g.jsxs)("div",{className:F.section,children:[l.provider==="local"&&(U||l.referenceAudioPath)&&(0,g.jsxs)("div",{className:F.section,"data-reference-voice":!0,children:[(0,g.jsx)(uo,{className:F.field,label:"\u53C2\u8003\u97F3\u9891\uFF08WAV\uFF09",kind:"referenceAudio",value:l.referenceAudioPath,disabled:$||!U,active:i,scope:l.provider+":"+l.localModelId,pickPath:c,sessionId:n,placeholder:"\u8BF7\u70B9\u51FB\u9009\u62E9\u6587\u4EF6",onChange:S=>W({referenceAudioPath:S.trim()||null})}),l.referenceAudioPath&&(0,g.jsx)(me.Button,{variant:"outline",disabled:$,onClick:()=>W({referenceAudioPath:null}),children:"\u6E05\u9664\u53C2\u8003\u97F3\u8272"})]}),l.provider!=="local"&&l.referenceAudioPath&&(0,g.jsxs)("div",{className:F.section,children:[(0,g.jsx)("p",{className:F.hint,children:"\u672C\u5730\u53C2\u8003\u97F3\u8272\u5DF2\u4FDD\u7559\u3002"}),(0,g.jsx)(me.Button,{variant:"outline",disabled:$,onClick:()=>W({referenceAudioPath:null}),children:"\u6E05\u9664\u53C2\u8003\u97F3\u8272"})]}),l.provider==="edge"&&(0,g.jsxs)("label",{className:F.inlineField,children:["Edge \u97F3\u8272",(0,g.jsxs)("select",{value:l.edgeVoice,disabled:$,onChange:S=>W({edgeVoice:S.target.value}),children:[(0,g.jsx)("option",{value:"zh-CN-XiaoxiaoNeural",children:"\u6653\u6653 \xB7 \u666E\u901A\u8BDD"}),(0,g.jsx)("option",{value:"zh-CN-YunxiNeural",children:"\u4E91\u5E0C \xB7 \u666E\u901A\u8BDD"}),(0,g.jsx)("option",{value:"zh-CN-XiaoyiNeural",children:"\u6653\u4F0A \xB7 \u666E\u901A\u8BDD"}),(0,g.jsx)("option",{value:"zh-CN-YunjianNeural",children:"\u4E91\u5065 \xB7 \u666E\u901A\u8BDD"}),(0,g.jsx)("option",{value:"zh-TW-HsiaoChenNeural",children:"\u6653\u81FB \xB7 \u53F0\u6E7E\u4E2D\u6587"}),(0,g.jsx)("option",{value:"zh-HK-HiuMaanNeural",children:"\u6653\u66FC \xB7 \u9999\u6E2F\u7CA4\u8BED"})]})]}),(0,g.jsxs)("label",{className:F.inlineField,children:["\u6717\u8BFB\u97F3\u91CF",(0,g.jsx)(Rt,{"aria-label":"\u6717\u8BFB\u97F3\u91CF\u6ED1\u5757",min:"0",max:"1",step:"0.05",value:l.volume,disabled:$,onChange:S=>W({volume:Number(S.target.value)})}),(0,g.jsx)(me.Input,{type:"number",min:"0",max:"1",step:"0.05",value:l.volume,disabled:$,onChange:S=>W({volume:S.target.value})})]})]})]}),(0,g.jsxs)("div",{className:F.actions,children:[(0,g.jsx)(me.Button,{variant:"primary",className:F.primary,disabled:$||!E||!j,onClick:()=>d("save-tts",{revision:o.revision,values:$i({...l,volume:Number(l.volume)})}),children:m?"\u5904\u7406\u4E2D\u2026":"\u4FDD\u5B58\u6717\u8BFB\u8BBE\u7F6E"}),(0,g.jsx)(me.Button,{variant:"outline",disabled:$||!o?.ttsSetup||!E||!["edge","deepseek","local"].includes(l.provider),onClick:()=>d("preview-tts",j?{revision:o.revision,values:_d({...l,volume:Number(l.volume)},o.ttsSetup)}:void 0),children:j?"\u8BD5\u542C\u5F53\u524D\u9009\u62E9":"\u8BD5\u542C\u5DF2\u4FDD\u5B58\u914D\u7F6E"}),(0,g.jsx)(me.Button,{variant:"outline",disabled:!(x?.busy||x?.blocked||e.ttsUncertain||e.ttsCancelling||z?.status==="preparing"||f==="preview-tts"),onClick:()=>{t(n,"cancel-tts")},children:"\u505C\u6B62\u8BD5\u542C"})]}),z&&(0,g.jsxs)("p",{role:"status",className:F.hint,children:[{preparing:"\u8BD5\u542C\u51C6\u5907\u4E2D",cancelling:"\u6B63\u5728\u505C\u6B62\u8BD5\u542C",cancelled:"\u8BD5\u542C\u5DF2\u53D6\u6D88",idle:"\u8BD5\u542C\u5DF2\u505C\u6B62",completed:"\u8BD5\u542C\u5DF2\u7ED3\u675F","text-only":"Edge \u6682\u4E0D\u53EF\u7528\uFF0C\u56DE\u7B54\u4F1A\u663E\u793A\u4E3A\u6587\u5B57",failed:"\u8BD5\u542C\u5931\u8D25\uFF0C\u6B63\u5728\u6838\u67E5\u72B6\u6001",unconfirmed:"\u65E0\u6CD5\u786E\u8BA4\u8BD5\u542C\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B"}[z.status]??z.status,z.status!=="text-only"&&yd[z.provider]?` \xB7 ${yd[z.provider]}`:""]}),x&&(0,g.jsxs)("p",{role:"status",className:F.hint,children:[x.blocked?"\u8BD5\u542C\u5C1A\u672A\u505C\u6B62\uFF0C\u8BF7\u91CD\u542F\u5BBF\u4E3B\u3002":`\u6717\u8BFB\u72B6\u6001\uFF1A${{idle:"\u7A7A\u95F2",preparing:"\u51C6\u5907\u4E2D",synthesizing:"\u5408\u6210\u4E2D","playback-requested":"\u5DF2\u8BF7\u6C42\u64AD\u653E","text-only":"\u5728\u7EBF\u6717\u8BFB\u6682\u4E0D\u53EF\u7528\uFF0C\u5DF2\u663E\u793A\u6587\u5B57",completed:"\u8BD5\u542C\u5DF2\u7ED3\u675F",cancelled:"\u5DF2\u53D6\u6D88",failed:"\u5931\u8D25"}[x.state]??x.state}`,x.localComputeBackend?` \xB7 \u672C\u5730\u8BA1\u7B97\uFF1A${x.localComputeBackend.toUpperCase()}${x.localComputeVerified?"\uFF08\u5DF2\u5B8C\u6210\u5408\u6210\uFF09":"\uFF08\u5F85\u9A8C\u8BC1\uFF09"}`:"",x.localComputeFallback?" \xB7 \u5DF2\u56DE\u9000\u540C\u6A21\u578B CPU":""]}),x?.localTimings&&(0,g.jsxs)("details",{className:F.details,children:[(0,g.jsx)("summary",{children:"\u5DF2\u5B8C\u6210\u6717\u8BFB\u7247\u6BB5\u8017\u65F6"}),(0,g.jsxs)("p",{className:F.hint,children:["\u51C6\u5907 ",(x.localTimings.preparationMs/1e3).toFixed(2)," \u79D2 \xB7 \u8BBE\u5907\u9009\u62E9 ",(x.localTimings.deviceSelectionMs/1e3).toFixed(2)," \u79D2 \xB7 \u5408\u6210 ",(x.localTimings.synthesisMs/1e3).toFixed(2)," \u79D2 \xB7 \u64AD\u653E ",(x.localTimings.playbackMs/1e3).toFixed(2)," \u79D2"]}),(0,g.jsxs)("p",{className:F.hint,children:[x.localTimings.chunks," \u6BB5 \xB7 ",x.localTimings.modelResident?"\u4E0A\u6B21\u7247\u6BB5\u7ED3\u675F\u65F6\u6A21\u578B\u4ECD\u9A7B\u7559\uFF0C\u5B8C\u6574\u5408\u6210\u540E\u64AD\u653E\u3002\u51C6\u5907\u5305\u542B\u6587\u4EF6\u6821\u9A8C\uFF1B\u5408\u6210\u5305\u542B\u9996\u6B21\u52A0\u8F7D\u548C\u670D\u52A1\u54CD\u5E94\u3002":"\u5F53\u524D\u672C\u5730\u6A21\u578B\u9010\u6BB5\u542F\u52A8\uFF0C\u5B8C\u6574\u5408\u6210\u540E\u64AD\u653E\u3002\u51C6\u5907\u5305\u542B\u6587\u4EF6\u6821\u9A8C\uFF1B\u5408\u6210\u5305\u542B\u52A0\u8F7D\u4E0E\u5931\u8D25\u91CD\u8BD5\u3002","\u8017\u65F6\u4E0D\u662F\u9996\u97F3\u5EF6\u8FDF\u6216 GPU \u52A0\u901F\u6BD4\u3002"]})]})]})}function dr(e,n){if(e.status!=="installed"||!e.installedPath||!n)return!1;if(e.purpose==="tts"||e.recommendedSettings?.tts)return n.ttsSetup?.provider==="local"&&n.ttsSetup.localModelId===e.modelId&&n.ttsSetup.localModelPath===e.installedPath;let t=e.recommendedSettings;return!t||t.asr!==n.modelSetup?.asr?!1:Object.entries(t.models??{}).some(([o,r])=>r===e.installedPath&&n.modelSetup?.models?.[o]===r)}function zd(e,n){return(e?.models??[]).map(t=>{let o=(e.jobs??[]).filter(s=>s.modelId===t.id),r=o.filter(s=>s.status==="installed").sort((s,c)=>String(c.updatedAt??c.createdAt??"").localeCompare(String(s.updatedAt??s.createdAt??""))),i=r.find(s=>dr(s,n));return{model:t,jobs:o,installed:r,current:i,preferred:i??r[0],active:o.find(s=>["queued","running","paused","failed"].includes(s.status))}})}var pr=e=>(e?.title??e?.id??"").split(" \xB7 ")[0],fo=e=>({cpu:"CPU",auto:"\u81EA\u52A8 GPU",cuda:"CUDA / HIP",vulkan:"Vulkan"})[e]??e??"\u672A\u77E5",Oi=e=>{let n=new Date(e);return Number.isFinite(n.getTime())?n.toLocaleString():"\u65F6\u95F4\u672A\u77E5"};function Cd({state:e,sessionId:n,run:t,purpose:o}){let[r,i]=At(t,n),s=e.installerFor===n?e.installer:null,c=e.settingsFor===n?e.settings:null,l=zd(s,c).filter(d=>(!o||d.model.purpose===o)&&d.preferred),u=st(e,n)&&!i&&!e.settingsDraftActions?.some(d=>["save-models","save-tts"].includes(d));return(0,g.jsxs)("section",{className:F.switcher,"aria-label":"\u5207\u6362\u5DF2\u5B89\u88C5\u6A21\u578B","data-no-settings-draft":!0,children:[s?l.length?l.map(({model:d,preferred:m,current:f})=>(0,g.jsxs)("div",{className:F.switchRow,children:[(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:pr(d)}),(0,g.jsxs)("small",{children:[d.purpose==="tts"?"\u6717\u8BFB":"\u8BC6\u522B"," \xB7 ",fo(m.compute),f?" \xB7 \u5F53\u524D\u914D\u7F6E":""]})]}),(0,g.jsxs)("div",{className:F.actions,children:[d.purpose==="tts"&&!f&&(0,g.jsx)(me.Button,{variant:"outline",disabled:!u||!m.installedPath,onClick:()=>r("preview-tts",{revision:c.revision,values:_d({...c.ttsSetup,provider:"local",localModelId:d.id,localModelPath:m.installedPath,referenceAudioPath:null},c.ttsSetup)}),children:"\u5148\u8BD5\u542C"}),(0,g.jsx)(me.Button,{variant:"outline",disabled:!u||!!f,onClick:()=>r("apply-model-install",{id:m.id,revision:c.revision}),children:f?"\u5F53\u524D\u6A21\u578B":"\u9A8C\u8BC1\u5E76\u5207\u6362"})]})]},d.id)):(0,g.jsx)("p",{className:F.hint,children:"\u5C1A\u65E0\u53EF\u5207\u6362\u7684\u5DF2\u5B89\u88C5\u6A21\u578B\uFF0C\u8BF7\u5148\u5728\u6A21\u578B\u4E0B\u8F7D\u4E2D\u5B89\u88C5\u3002"}):(0,g.jsx)("p",{className:F.hint,children:"\u6B63\u5728\u8BFB\u53D6\u5DF2\u5B89\u88C5\u6A21\u578B\u3002"}),!!l.length&&!u&&(0,g.jsx)("p",{className:F.hint,children:"\u5207\u6362\u6A21\u578B\u524D\u9700\u505C\u6B62\u8BED\u97F3\uFF0C\u5DF2\u5B89\u88C5\u6587\u4EF6\u4E0D\u4F1A\u91CD\u65B0\u4E0B\u8F7D\u3002"})]})}function wd({job:e,snapshot:n,settings:t,disabled:o,writable:r,execute:i,history:s=!1}){let c=dr(e,t);return(0,g.jsxs)("article",{className:F.job,"data-model-job":e.id,children:[(0,g.jsxs)("div",{className:F.jobHeading,children:[(0,g.jsx)("strong",{children:pr(n.models.find(l=>l.id===e.modelId))||e.modelId}),(0,g.jsxs)("small",{children:[fo(e.compute)," \xB7 ",Oi(e.createdAt)]})]}),(0,g.jsxs)("p",{role:"status",children:[c?"\u5F53\u524D\u914D\u7F6E \xB7 ":"",{queued:"\u7B49\u5F85\u4E2D",running:"\u5904\u7406\u4E2D",paused:"\u5DF2\u6682\u505C",failed:"\u5931\u8D25",cancelled:"\u5DF2\u53D6\u6D88",installed:"\u5DF2\u5B89\u88C5\uFF0C\u5B57\u8282\u6821\u9A8C\u901A\u8FC7","checking-runtime":"\u68C0\u67E5\u8FD0\u884C\u4F9D\u8D56","verifying-local":"\u6821\u9A8C\u672C\u673A\u5DF2\u6709\u6A21\u578B",downloading:"\u4E0B\u8F7D\u4E2D",verifying:"\u6821\u9A8C\u6587\u4EF6",installing:"\u63D0\u4EA4\u5B89\u88C5"}[e.stage]??e.stage]}),!s&&Number.isFinite(e.totalBytes)&&e.totalBytes>0&&Number.isFinite(e.receivedBytes)&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("progress",{max:e.totalBytes,value:Math.min(e.receivedBytes,e.totalBytes),"aria-label":"\u4E0B\u8F7D\u5B57\u8282\u8FDB\u5EA6"}),(0,g.jsxs)("small",{children:["\u4E0B\u8F7D ",bn(e.receivedBytes)," / ",bn(e.totalBytes)]})]}),e.error&&(0,g.jsx)("p",{role:"alert",children:e.error.message}),s&&e.installedPath&&(0,g.jsxs)("details",{className:F.installPath,children:[(0,g.jsx)("summary",{children:"\u5B89\u88C5\u4F4D\u7F6E"}),(0,g.jsx)("p",{children:e.installedPath})]}),(0,g.jsxs)("div",{className:F.actions,children:[["queued","running"].includes(e.status)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:o,onClick:()=>i("control-model-install",{id:e.id,operation:"pause"}),children:"\u6682\u505C\uFF0C\u4FDD\u7559\u8FDB\u5EA6"}),["paused","failed"].includes(e.status)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:o,onClick:()=>i("control-model-install",{id:e.id,operation:"resume"}),children:"\u6062\u590D\u540C\u4E00\u6765\u6E90\u4E0B\u8F7D"}),["queued","running","paused","failed"].includes(e.status)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:o,onClick:()=>i("control-model-install",{id:e.id,operation:"cancel"}),children:"\u53D6\u6D88\u5E76\u6E05\u9664\u6B64\u4EFB\u52A1\u4E34\u65F6\u6587\u4EF6"}),e.status==="installed"&&!c&&(0,g.jsx)(me.Button,{variant:"outline",disabled:!r,onClick:()=>i("apply-model-install",{id:e.id,revision:t.revision}),children:"\u9A8C\u8BC1\u5E76\u5207\u6362"})]}),e.status==="installed"&&(0,g.jsx)("small",{children:"\u5207\u6362\u524D\u8BF7\u7ED3\u675F\u5BF9\u8BDD\u3002\u4E0B\u6B21\u5F00\u59CB\u5BF9\u8BDD\u65F6\u4F7F\u7528\u65B0\u6A21\u578B\u3002"})]})}function jd({state:e,sessionId:n,run:t}){let[o,r]=(0,he.useState)(""),[i,s]=(0,he.useState)("cpu"),[c,l]=(0,he.useState)(!1),[u,d]=At(t,n),m=e.installerFor===n?e.installer:null,f=e.settingsFor===n?e.settings:null,p=zd(m,f).filter(U=>U.model.id!=="sensevoice-int8-2024-07-17"||U.active),y=p.find(U=>U.model.id===o),v=y?.model,b=e.installPlanFor===n&&e.installPlan?.modelId===o&&e.installPlan?.compute===i&&!e.installPlan?.sourceDirectory?e.installPlan:null,x=!!e.busy||e.uncertain||e.installerUncertain||d,z=!d&&st(e,n)&&!e.settingsDraftActions?.some(U=>["save-models","save-tts"].includes(U)),M=(0,he.useId)(),$=(m?.jobs??[]).filter(U=>["installed","cancelled"].includes(U.status)).slice().reverse(),j=m?.hardware,W=m?.refresh?.observedAt??m?.compute?.observedAt;return(0,g.jsxs)("section",{className:`${F.section} ${F.modelInstaller}`,"aria-label":"\u6A21\u578B\u5B89\u88C5",children:[(0,g.jsxs)("div",{className:F.hardwareSummary,children:[(0,g.jsxs)("span",{children:["\u5185\u5B58 ",bn(j?.totalMemoryBytes)," \xB7 \u53EF\u7528 ",bn(j?.availableMemoryBytes)," \xB7 \u663E\u5B58 ",bn(j?.gpuMemoryBytes)]}),(0,g.jsxs)("small",{children:[W?"\u66F4\u65B0\u4E8E "+Oi(W):"\u7B49\u5F85\u68C0\u6D4B"," \xB7 \u6BCF 5 \u5206\u949F"]})]}),(m?.refresh?.error||e.modelComputeError)&&(0,g.jsxs)("p",{className:F.hint,role:"status",children:[m?.refresh?.error??"\u672C\u6B21\u786C\u4EF6\u68C0\u6D4B\u672A\u5B8C\u6210","\uFF1B\u4FDD\u7559\u4E0A\u6B21\u7ED3\u679C\u3002"]}),e.installerError&&(0,g.jsx)("p",{role:"alert",className:F.note,children:e.installerError}),e.installerUncertain&&(0,g.jsx)("p",{role:"status",className:F.note,children:"\u6B63\u5728\u6838\u67E5\u5B89\u88C5\u72B6\u6001\u3002"}),(0,g.jsxs)("div",{className:F.currentModel,children:[(0,g.jsxs)("span",{children:["\u8BC6\u522B ",(0,g.jsx)("strong",{children:"SenseVoice"})," \xB7 \u6717\u8BFB ",(0,g.jsx)("strong",{children:f?.ttsSetup?.provider==="local"?f.ttsSetup.localModelId?.startsWith("qwen3")?"Qwen3-TTS":f.ttsSetup.localModelId?.startsWith("vits-melo")?"MeloTTS":f.ttsSetup.localModelId??"\u672C\u5730\u6A21\u578B":{edge:"Edge",deepseek:"DeepSeek",off:"\u4E0D\u53D1\u58F0"}[f?.ttsSetup?.provider]??"\u672A\u914D\u7F6E"})]}),(0,g.jsx)(me.Button,{variant:"outline","aria-expanded":c,onClick:()=>l(U=>!U),children:"\u5207\u6362\u5F53\u524D\u6A21\u578B"})]}),c&&(0,g.jsx)(Cd,{state:e,sessionId:n,run:t}),m?(0,g.jsxs)("fieldset",{className:`${F.choices} ${F.modelChoices}`,disabled:x,children:[(0,g.jsx)("legend",{children:"\u9009\u62E9\u6A21\u578B"}),p.map(({model:U,current:E,preferred:S,active:k})=>(0,g.jsxs)("label",{className:F.choice,"data-selected":o===U.id,children:[(0,g.jsx)("input",{type:"radio",name:M,checked:o===U.id,onChange:()=>{r(U.id),s(U.computeOptions?.includes("auto")?"auto":"cpu")}}),(0,g.jsxs)("span",{children:[(0,g.jsxs)("strong",{children:[pr(U),U.recommendation?.recommended&&(0,g.jsx)("span",{className:F.badge,children:"\u63A8\u8350"})]}),(0,g.jsxs)("small",{children:[U.purpose==="tts"?"\u6717\u8BFB":"\u8BC6\u522B"," \xB7 ",bn(U.totalBytes)]}),(0,g.jsx)("small",{children:E?"\u5F53\u524D\u914D\u7F6E":k?{queued:"\u7B49\u5F85\u4E0B\u8F7D",running:"\u4E0B\u8F7D\u5904\u7406\u4E2D",paused:"\u4E0B\u8F7D\u5DF2\u6682\u505C",failed:"\u4E0B\u8F7D\u5931\u8D25"}[k.status]:S?"\u5DF2\u5B89\u88C5\uFF0C\u53EF\u5207\u6362":U.available?"\u53EF\u51C6\u5907\u5B89\u88C5":"\u6682\u4E0D\u53EF\u5B89\u88C5"}),!U.available&&(0,g.jsx)("small",{children:U.reason??U.recommendation?.reason})]})]},U.id))]}):(0,g.jsx)("p",{className:F.note,children:"\u6B63\u5728\u8BFB\u53D6\u6A21\u578B\u5217\u8868\u3002"}),v&&(0,g.jsxs)("div",{className:F.selectedModel,children:[(0,g.jsxs)("label",{className:F.inlineField,children:["\u63A8\u7406\u8BBE\u5907",(0,g.jsx)("select",{value:i,disabled:x,onChange:U=>s(U.target.value),children:(v.computeOptions??["cpu"]).map(U=>(0,g.jsxs)("option",{value:U,children:[fo(U),U==="cpu"?"":" \xB7 CPU \u515C\u5E95"]},U))})]}),(0,g.jsxs)("div",{className:F.actions,children:[y.preferred&&(0,g.jsx)(me.Button,{variant:"outline",disabled:!z||!!y.current,onClick:()=>u("apply-model-install",{id:y.preferred.id,revision:f.revision}),children:y.current?"\u5F53\u524D\u6A21\u578B":"\u9A8C\u8BC1\u5E76\u5207\u6362"}),(0,g.jsx)(me.Button,{variant:"outline",disabled:x||!v.available,onClick:()=>u("plan-model-install",{modelId:o,compute:i}),children:y.preferred?"\u67E5\u770B\u5176\u4ED6\u5B89\u88C5\u65B9\u6848":"\u67E5\u770B\u5B89\u88C5\u8BA1\u5212"})]}),(0,g.jsxs)("details",{className:F.details,children:[(0,g.jsx)("summary",{children:"\u63A8\u8350\u4F9D\u636E\u4E0E\u8BBE\u5907\u8BF4\u660E"}),(0,g.jsx)("p",{className:F.hint,children:v.recommendation?.reason??"\u63A8\u8350\u4F9D\u636E\u672A\u77E5\uFF0C\u53EF\u624B\u52A8\u9009\u62E9\u3002"}),(0,g.jsx)("p",{className:F.hint,children:v.purpose==="tts"?i==="cpu"?"\u4EC5\u51C6\u5907 CPU \u8FD0\u884C\u65F6\u3002":"\u51C6\u5907\u56FA\u5B9A Vulkan \u4E0E CPU \u7EC4\u4EF6\uFF0C\u5B9E\u9645\u53EF\u7528\u6027\u4ECD\u9700\u672C\u673A\u5408\u6210\u9A8C\u8BC1\u3002":"\u6B64\u6A21\u578B\u4F7F\u7528 CPU\u3002"})]})]}),b&&(0,g.jsxs)(me.MenuSurface,{className:F.plan,"aria-label":"\u6A21\u578B\u5B89\u88C5\u8BA1\u5212",children:[(0,g.jsx)("h4",{children:"\u6A21\u578B\u5B89\u88C5"}),(0,g.jsxs)("dl",{children:[(0,g.jsx)("dt",{children:"\u6A21\u578B"}),(0,g.jsx)("dd",{children:v?.title??b.modelId}),(0,g.jsx)("dt",{children:"\u6765\u6E90"}),(0,g.jsx)("dd",{children:b.source}),(0,g.jsx)("dt",{children:"\u4E0B\u8F7D\u5927\u5C0F"}),(0,g.jsx)("dd",{children:bn(b.totalBytes)}),(0,g.jsx)("dt",{children:"\u4FDD\u5B58\u4F4D\u7F6E"}),(0,g.jsx)("dd",{children:b.destination}),(0,g.jsx)("dt",{children:"\u63A8\u7406\u8BBE\u5907"}),(0,g.jsx)("dd",{children:b.compute})]}),(0,g.jsx)("p",{children:b.licenseNote??"\u8BF7\u9605\u8BFB\u4E0B\u5217\u6A21\u578B\u8BB8\u53EF\u3002"}),b.licenseUrls?.map(U=>(0,g.jsx)("a",{href:U,target:"_blank",rel:"noreferrer",children:U},U)),(0,g.jsx)("p",{className:F.hint,children:b.notice}),(0,g.jsxs)("details",{className:F.details,children:[(0,g.jsx)("summary",{children:"\u6587\u4EF6\u548C\u6821\u9A8C\u8BE6\u60C5"}),(0,g.jsx)("ul",{children:b.files?.map(U=>(0,g.jsxs)("li",{children:[U.name," \xB7 ",bn(U.bytes),(0,g.jsxs)("small",{children:["SHA-256: ",U.sha256]}),(0,g.jsx)("small",{children:U.url})]},U.name))})]}),(0,g.jsx)(me.Button,{variant:"primary",className:F.primary,disabled:x||!v?.available||!b.planHash,onClick:()=>u("start-model-install",{modelId:b.modelId,compute:b.compute,planHash:b.planHash,accepted:!0}),children:"\u5F00\u59CB\u4E0B\u8F7D"})]}),(0,g.jsx)("div",{className:F.jobs,children:(m?.jobs??[]).filter(U=>!["installed","cancelled"].includes(U.status)).map(U=>(0,g.jsx)(wd,{job:U,snapshot:m,settings:f,disabled:x,writable:z,execute:u},U.id))}),!!$.length&&(0,g.jsxs)("details",{className:F.installHistory,children:[(0,g.jsxs)("summary",{children:["\u5B89\u88C5\u8BB0\u5F55\uFF08",$.length,"\uFF09",(0,g.jsx)("small",{children:"\u65F6\u95F4 \xB7 \u8BBE\u5907 \xB7 \u4F4D\u7F6E"})]}),(0,g.jsx)("div",{className:F.jobs,children:$.map(U=>(0,g.jsx)(wd,{job:U,snapshot:m,settings:f,disabled:x,writable:z,execute:u,history:!0},U.id))})]}),(0,g.jsx)("p",{className:F.hint,children:"\u6A21\u578B\u4E0B\u8F7D\u53EF\u5728\u540E\u53F0\u7EE7\u7EED\u3002\u68C0\u6D4B\u9759\u9ED8\u8FDB\u884C\uFF0C\u8FDB\u5165\u672C\u9875\u7ACB\u5373\u5237\u65B0\u3002"})]})}function ur({state:e,sessionId:n,run:t,active:o=!0,pickPath:r,initialModelId:i=null,initialReuse:s=!1,reuseOnly:c=!1,onboarding:l=!1}){let[u,d,,m]=At(t,n),[f,p]=(0,he.useState)(i),[y,v]=(0,he.useState)(null),[b,x]=(0,he.useState)(s),[z,M]=(0,he.useState)(""),[$,j]=(0,he.useState)("q8_0"),W=e.installerFor===n?e.installer:null,U=W?.models?.filter(G=>G.purpose==="tts"||["qwen3-tts-base-1.7b-gguf","vits-melo-tts-zh_en-int8"].includes(G.id))??[],E=U.find(G=>G.recommendation?.recommended&&G.available),S=f??E?.id??U.find(G=>G.available)?.id??U[0]?.id,k=U.find(G=>G.id===S),C=y??(k?.computeOptions?.includes("auto")?"auto":"cpu"),R=b&&S==="qwen3-tts-base-1.7b-gguf",P=R?{sourceDirectory:z,modelVariant:$}:{},N=e.installPlanFor===n&&e.installPlan?.modelId===S&&e.installPlan?.compute===C&&(R?e.installPlan?.reused===!0&&(e.installPlanRequest?.sourceDirectory??e.installPlan?.sourceDirectory)===z&&e.installPlan?.modelVariant===$:!e.installPlan?.sourceDirectory)?e.installPlan:null,I=[...W?.jobs??[]].reverse().find(G=>G.modelId===S&&G.status!=="cancelled"),H=W?.ttsInstallIntent,Z=H&&I&&H.modelId===S&&H.jobId===I.id?H:null,L=["waiting","verifying"].includes(H?.status),K=e.settingsFor===n&&e.settings?.ttsSetup?.provider==="local"&&e.settings.ttsSetup.localModelId===S&&I?.status==="installed"&&!!I.installedPath&&e.settings.ttsSetup.localModelPath===I.installedPath,de=(0,he.useRef)(void 0),ue=(0,he.useRef)(null);(0,he.useEffect)(()=>{!o||W||e.busy||d||m.isLocked()||de.current===n||(de.current=n,u("model-installer"))},[o,n,!!W,e.busy,d,m.settled]),(0,he.useEffect)(()=>{let G=n+":"+S+":"+C;R||!o||!k?.available||e.busy||d||m.isLocked()||N||ue.current===G||(ue.current=G,u("plan-model-install",{modelId:S,compute:C}))},[o,n,S,C,k?.available,e.busy,d,!!N,R,m.settled]);let Q=d||e.busy||e.installerUncertain;return(0,g.jsxs)("section",{className:F.section,"aria-label":"\u4E0B\u8F7D\u672C\u5730\u8BED\u97F3\u6A21\u578B","data-no-settings-draft":!0,children:[W?(0,g.jsxs)(g.Fragment,{children:[!c&&(0,g.jsxs)("label",{className:F.inlineField,children:["\u8BED\u97F3\u6A21\u578B",(0,g.jsx)("select",{"aria-label":"\u8BED\u97F3\u6A21\u578B",value:S??"",disabled:Q||Z?.status==="verifying",onChange:G=>{p(G.target.value),v(null)},children:U.map(G=>(0,g.jsxs)("option",{value:G.id,children:[G.title??G.id,G.recommendation?.recommended?" \xB7 \u63A8\u8350":"",G.available?"":" \xB7 \u6682\u4E0D\u53EF\u7528"]},G.id))})]}),!l&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("p",{className:F.hint,children:k?.recommendation?.reason}),(0,g.jsxs)("label",{className:F.inlineField,children:["\u672C\u5730\u8BA1\u7B97",(0,g.jsx)("select",{"aria-label":"\u672C\u5730\u8BA1\u7B97",value:C,disabled:Q||L,onChange:G=>v(G.target.value),children:(k?.computeOptions??["cpu"]).map(G=>(0,g.jsx)("option",{value:G,children:{cpu:"CPU",auto:"\u81EA\u52A8 GPU \xB7 CPU \u515C\u5E95",vulkan:"Vulkan \xB7 CPU \u515C\u5E95"}[G]},G))})]})]}),!k?.available&&(0,g.jsx)("p",{role:"status",className:F.note,children:k?.reason??"\u6B64\u8BBE\u5907\u6682\u6CA1\u6709\u517C\u5BB9\u7684\u5B89\u88C5\u5305\u3002\u53EF\u9009\u62E9\u5176\u4ED6\u652F\u6301\u7684\u6A21\u578B\uFF0C\u6216\u5148\u4F7F\u7528\u6587\u5B57\u3002"}),N&&(0,g.jsxs)("div",{className:F.plan,children:[(0,g.jsxs)("strong",{children:["\u4E0B\u8F7D ",bn(N.totalBytes)," \xB7 ",N.compute.toUpperCase()]}),N.reused&&(0,g.jsxs)("p",{children:["\u590D\u7528\u6A21\u578B ",bn(N.reusedBytes)," \xB7 ",N.modelVariant]}),(0,g.jsxs)("details",{className:F.details,children:[(0,g.jsx)("summary",{children:"\u6765\u6E90\u3001\u8BB8\u53EF\u4E0E\u4FDD\u5B58\u4F4D\u7F6E"}),(0,g.jsx)("p",{children:N.source}),N.runtime&&(0,g.jsx)("p",{children:N.runtime.source}),(0,g.jsx)("p",{children:N.notice}),(0,g.jsx)("p",{children:N.verification}),(0,g.jsx)("p",{children:N.licenseNote}),N.licenseUrls?.map(G=>(0,g.jsx)("a",{href:G,target:"_blank",rel:"noreferrer",children:G},G)),(0,g.jsx)("p",{children:N.destination})]})]}),(0,g.jsxs)("div",{className:F.actions,children:[(!I||(R||I.compute!==C)&&I.status==="installed"&&!L)&&(0,g.jsx)(me.Button,{variant:"primary",className:F.primary,disabled:Q||!st(e,n)||!k?.available||!N,onClick:()=>u("start-model-install",{modelId:S,compute:C,planHash:N.planHash,accepted:!0,useWhenReady:!0,...N.reused?{sourceDirectory:N.sourceDirectory,modelVariant:N.modelVariant}:{}}),children:R?"\u9A8C\u8BC1\u5E76\u4F7F\u7528":"\u4E0B\u8F7D\u5E76\u4F7F\u7528"}),S==="qwen3-tts-base-1.7b-gguf"&&!c&&(0,g.jsx)(me.Button,{variant:"outline","aria-expanded":R,disabled:Q||L,onClick:()=>x(G=>!G),children:"\u4F7F\u7528\u672C\u673A\u5DF2\u6709\u6587\u4EF6"})]}),R&&(0,g.jsxs)("div",{className:F.section,children:[(0,g.jsx)(uo,{className:F.field,label:"\u63D2\u4EF6\u6240\u5728\u673A\u5668\u7684\u6A21\u578B\u76EE\u5F55",kind:"sourceDirectory",value:z,disabled:Q,active:o,scope:S+":"+$,pickPath:r,sessionId:n,onChange:M}),(0,g.jsxs)("label",{className:F.inlineField,children:["\u5DF2\u6709\u6A21\u578B\u91CF\u5316\u7248\u672C",(0,g.jsxs)("select",{"aria-label":"\u5DF2\u6709\u6A21\u578B\u91CF\u5316\u7248\u672C",value:$,disabled:Q,onChange:G=>j(G.target.value),children:[(0,g.jsx)("option",{value:"q8_0",children:"Q8_0"}),(0,g.jsx)("option",{value:"q4_k_m",children:"Q4_K_M"})]})]}),(0,g.jsx)(me.Button,{variant:"outline",disabled:Q||!z.trim()||!k?.available,onClick:()=>u("plan-model-install",{modelId:S,compute:C,...P}),children:"\u68C0\u67E5\u590D\u7528\u8BA1\u5212"})]}),R&&I&&["failed","paused"].includes(I.status)&&(0,g.jsx)("p",{className:F.note,children:"\u5DF2\u6709\u672A\u5B8C\u6210\u7684\u5B89\u88C5\u4EFB\u52A1\u3002\u53EF\u7EE7\u7EED\u91CD\u8BD5\uFF1B\u5982\u9700\u66F4\u6362\u76EE\u5F55\u6216\u91CF\u5316\u7248\u672C\uFF0C\u8BF7\u5148\u53D6\u6D88\u8BE5\u4EFB\u52A1\uFF0C\u518D\u68C0\u67E5\u65B0\u7684\u590D\u7528\u8BA1\u5212\u3002"}),!R&&k?.available&&!N&&!I&&(0,g.jsx)(me.Button,{variant:"outline",disabled:Q,onClick:()=>u("plan-model-install",{modelId:S,compute:C}),children:"\u91CD\u65B0\u8BFB\u53D6\u5B89\u88C5\u8BA1\u5212"}),I&&(0,g.jsxs)("div",{className:F.job,children:[(0,g.jsx)("p",{role:"status",children:Z?.status==="verifying"?"\u6B63\u5728\u9A8C\u8BC1\u5408\u6210\uFF0C\u9996\u6B21\u53EF\u80FD\u9700\u8981\u51E0\u5206\u949F":Z?.status==="applied"&&K?"\u5408\u6210\u9A8C\u8BC1\u901A\u8FC7\uFF0C\u5DF2\u8BBE\u4E3A\u6717\u8BFB\u6765\u6E90":Z?.status==="blocked"?"\u9700\u8981\u5904\u7406\u540E\u518D\u7EE7\u7EED":{queued:"\u7B49\u5F85\u4E0B\u8F7D",running:I.stage==="verifying-local"?"\u6821\u9A8C\u672C\u673A\u5DF2\u6709\u6A21\u578B":"\u4E0B\u8F7D\u5904\u7406\u4E2D",paused:"\u5DF2\u6682\u505C",failed:"\u4E0B\u8F7D\u5931\u8D25",installed:"\u6587\u4EF6\u5DF2\u6821\u9A8C\uFF0C\u5C1A\u672A\u786E\u8BA4\u5408\u6210"}[I.status]??I.status}),I.totalBytes>0&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("progress",{"aria-label":"\u8BED\u97F3\u6A21\u578B\u4E0B\u8F7D\u8FDB\u5EA6",max:I.totalBytes,value:Math.min(I.receivedBytes,I.totalBytes)}),(0,g.jsxs)("small",{children:[bn(I.receivedBytes)," / ",bn(I.totalBytes)]})]}),I.error&&(0,g.jsx)("p",{role:"alert",children:I.error.message}),Z?.reason&&(0,g.jsx)("p",{className:F.note,children:Nh(Z.reason)}),(0,g.jsxs)("div",{className:F.actions,children:[Z?.status==="verifying"&&(0,g.jsx)(me.Button,{variant:"outline",disabled:Q,onClick:()=>u("control-model-install",{id:I.id,operation:"pause"}),children:"\u505C\u6B62\u9A8C\u8BC1"}),["queued","running"].includes(I.status)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:Q,onClick:()=>u("control-model-install",{id:I.id,operation:"pause"}),children:"\u6682\u505C"}),(["paused","failed"].includes(I.status)||Z?.status==="blocked"||Z?.status==="paused")&&(0,g.jsx)(me.Button,{variant:"outline",disabled:Q,onClick:()=>u("control-model-install",{id:I.id,operation:"resume"}),children:"\u7EE7\u7EED\u4E0B\u8F7D\u5E76\u4F7F\u7528"}),["queued","running","paused","failed"].includes(I.status)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:Q,onClick:()=>u("control-model-install",{id:I.id,operation:"cancel"}),children:"\u53D6\u6D88\u4E0B\u8F7D"}),I.status==="installed"&&!K&&(!Z||["applied","cancelled"].includes(Z.status))&&(0,g.jsx)(me.Button,{variant:"outline",disabled:Q||L||!st(e,n),onClick:()=>u("apply-model-install",{id:I.id,revision:e.settings.revision}),children:"\u9A8C\u8BC1\u5E76\u4F7F\u7528"})]})]}),K&&(0,g.jsx)("p",{className:F.hint,children:"\u672C\u5730\u6A21\u578B\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u8BD5\u542C\u3002"})]}):(0,g.jsx)(g.Fragment,{children:(0,g.jsx)("p",{className:F.hint,children:"\u6B63\u5728\u8BFB\u53D6\u53EF\u5B89\u88C5\u6A21\u578B\u2026"})}),e.installerError&&(0,g.jsx)("p",{role:"alert",className:F.note,children:e.installerError}),e.installerUncertain&&(0,g.jsx)("p",{role:"status",children:"\u6B63\u5728\u6838\u67E5\u4E0B\u8F7D\u72B6\u6001\u3002"})]})}function Nd({state:e,sessionId:n,run:t,pickPath:o,active:r}){let i=e.settingsFor===n?e.settings:null,s=e.installerFor===n?e.installer:null,c=i?.ttsSetup?.localModelPath,[l,u]=At(t,n),[d,m]=(0,he.useState)(""),[f,p]=(0,he.useState)(!1),y=(s?.jobs??[]).filter(b=>b.status==="installed"&&(b.purpose==="tts"||b.recommendedSettings?.tts)),v=y.find(b=>b.id===d);return(0,g.jsxs)("section",{className:F.section,"aria-label":"\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84","data-no-settings-draft":!0,children:[(0,g.jsx)("h3",{children:"\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84"}),(0,g.jsx)("p",{className:F.hint,children:c||"\u5C1A\u672A\u914D\u7F6E\u672C\u5730\u6717\u8BFB\u6A21\u578B\u8DEF\u5F84\u3002"}),!!y.length&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("label",{className:F.inlineField,children:["\u5DF2\u5B89\u88C5\u76EE\u5F55",(0,g.jsxs)("select",{value:d,onChange:b=>m(b.target.value),children:[(0,g.jsx)("option",{value:"",children:"\u9009\u62E9\u5DF2\u6821\u9A8C\u7684\u5B89\u88C5\u76EE\u5F55"}),y.map(b=>(0,g.jsxs)("option",{value:b.id,children:[pr(s.models.find(x=>x.id===b.modelId))," \xB7 ",fo(b.compute)," \xB7 ",Oi(b.createdAt)]},b.id))]})]}),v&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("p",{className:F.hint,children:v.installedPath}),(0,g.jsx)(me.Button,{variant:"outline",disabled:u||!st(e,n)||dr(v,i),onClick:()=>l("apply-model-install",{id:v.id,revision:i.revision}),children:"\u9A8C\u8BC1\u5E76\u4F7F\u7528\u6240\u9009\u8DEF\u5F84"})]})]}),(0,g.jsxs)("details",{className:F.details,onToggle:b=>p(b.currentTarget.open),children:[(0,g.jsx)("summary",{children:"\u590D\u7528\u672C\u673A Qwen \u6A21\u578B\u6587\u4EF6"}),(0,g.jsx)("p",{className:F.hint,children:"\u9009\u62E9\u5DF2\u6709\u6A21\u578B\u76EE\u5F55\u540E\u6821\u9A8C\u6587\u4EF6\uFF1B\u6821\u9A8C\u901A\u8FC7\u540E\u5B89\u88C5\u8FD0\u884C\u7EC4\u4EF6\u3002"}),f&&(0,g.jsx)(ur,{state:e,sessionId:n,run:t,active:r,pickPath:o,initialModelId:"qwen3-tts-base-1.7b-gguf",initialReuse:!0,reuseOnly:!0})]})]})}function Ad({state:e,sessionId:n,run:t,onDismiss:o,onMinimize:r,onBackToAuthorization:i,asrStatus:s,pickPath:c}){let[l,u]=At(t,n),[d,m]=(0,he.useState)(0),f=(0,he.useRef)(null),p=(0,he.useRef)(0),y=(0,he.useRef)(null);(0,he.useLayoutEffect)(()=>()=>{p.current++},[n]);let v=Q=>(p.current++,Q?.());(0,he.useLayoutEffect)(()=>{let Q=f.current?.closest("[data-whale-content]");Q&&(Q.scrollTop=0);let G=f.current?.querySelector("[data-wizard-body]");G&&(G.scrollTop=0)},[d]);let b=e.settingsFor===n?e.settings:null,[x,z]=(0,he.useState)(null),[M,$]=(0,he.useState)(null),j=x??b?.listenMode??"ptt",W=b?.ttsSetup?.provider,U=M??(W!=="unconfigured"?W:null)??"edge",E=U==="edge"&&W!=="edge",S=e.ttsCapabilitiesFor===n?e.ttsCapabilities:null,k=typeof S?.deepseekKeyAvailable=="boolean",C=S?.deepseekKeyAvailable===!0,R=`${n??"owner"}:${b?.revision??"unread"}`,[P,N]=(0,he.useState)(null),I=P??b?.ttsSetup?.deepseekVoice??"stella",H=!k&&!u&&y.current===R&&!!e.error,Z=()=>{u||(y.current=R,l("inspect-tts"))};(0,he.useEffect)(()=>{d!==1||U!=="deepseek"||k||u||y.current===R||Z()},[d,U,k,R,u]);let L=U==="deepseek"&&W!=="deepseek",K=u||!st(e,n),de=b?.ttsSetup?.provider==="local"&&!!b.ttsSetup.localModelId,ue=async()=>{let Q=p.current,G=()=>p.current===Q;if(d===0)await l("listen-mode",{mode:j})===!0&&G()&&m(1);else if(d===1){if(U==="deepseek"&&!C)return;let A=U==="deepseek"&&I!==(b.ttsSetup.deepseekVoice??"stella");if(M===null&&b.ttsSetup.provider!=="unconfigured"&&!A||U==="local"&&de){m(2);return}let ne=$i({...Di,...b.ttsSetup,provider:U});U==="edge"&&(ne.edgeTextTransmissionAccepted=!0),U==="deepseek"&&(ne.deepseekTextTransmissionAccepted=!0,ne.deepseekVoice=I),await l("save-tts",{revision:b.revision,values:ne})===!0&&G()&&m(2)}else await l("complete-setup",{revision:b.revision})===!0&&G()&&o?.()};return(0,g.jsxs)(me.MenuSurface,{ref:f,className:F.wizard,role:"region","aria-label":"\u9C7C\u5E94\u9996\u6B21\u914D\u7F6E","data-whale-intrinsic":!0,children:[(0,g.jsxs)("header",{className:F.header,children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("h2",{children:"\u5F00\u59CB\u4F7F\u7528\u9C7C\u5E94"}),(0,g.jsxs)("p",{className:F.hint,children:["\u7B2C ",d+1," / 3 \u6B65 \xB7 \u5176\u4F59\u8BBE\u7F6E\u968F\u65F6\u518D\u8C03"]})]}),(0,g.jsx)(me.Button,{onClick:r,children:"\u7A0D\u540E"})]}),(0,g.jsx)("div",{className:F.wizardBody,"data-wizard-body":!0,"data-no-drag":!0,children:(0,g.jsxs)("div",{className:F.wizardBodyContent,"data-whale-natural-content":!0,children:[(0,g.jsx)(Sd,{state:e,sessionId:n,run:t}),d===0&&(0,g.jsxs)("section",{className:F.section,children:[(0,g.jsx)("h3",{children:"\u600E\u4E48\u8BF4\u8BDD\uFF1F"}),(0,g.jsx)("fieldset",{className:F.choices,disabled:K,children:[["ptt","\u6309\u952E\u8BF4\u8BDD","\u6309\u4F4F\u5FEB\u6377\u952E\u65F6\u6536\u97F3"],["always","\u81EA\u7531\u9EA6","\u5F00\u59CB\u5BF9\u8BDD\u540E\u6301\u7EED\u542C\u53D6\u8BED\u97F3"],["wake","\u5524\u9192\u8BCD","\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\uFF0C\u518D\u8BF4\u6307\u4EE4"]].map(([Q,G,A])=>(0,g.jsxs)("label",{className:F.choice,"data-selected":j===Q,children:[(0,g.jsx)("input",{type:"radio",name:"setup-listen","data-whale-operation":`listen-mode-${Q}`,checked:j===Q,onChange:()=>z(Q)}),(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:G}),(0,g.jsx)("small",{children:A})]})]},Q))})]}),d===1&&(0,g.jsxs)("section",{className:F.section,children:[(0,g.jsx)("h3",{children:"\u600E\u4E48\u542C\u56DE\u7B54\uFF1F"}),(0,g.jsx)("fieldset",{className:F.choices,disabled:K,children:xd.map(([Q,G,A])=>(0,g.jsxs)("label",{className:F.choice,"data-selected":U===Q,children:[(0,g.jsx)("input",{type:"radio",name:"setup-provider",checked:U===Q,onChange:()=>{$(Q),Q==="deepseek"&&Z()}}),(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:G}),(0,g.jsx)("small",{children:A})]})]},Q))}),U==="edge"&&(0,g.jsx)("p",{className:F.note,children:"\u542F\u7528\u540E\uFF0C\u6717\u8BFB\u6587\u5B57\u4F1A\u53D1\u9001\u7ED9\u5FAE\u8F6F\u3002\u8054\u7F51\u5931\u8D25\u65F6\uFF0C\u56DE\u7B54\u4F1A\u663E\u793A\u4E3A\u6587\u5B57\u3002"}),U==="deepseek"&&(0,g.jsxs)("div",{className:F.note,"data-whale-deepseek-setup":!0,children:[(0,g.jsx)("p",{children:"\u786E\u8BA4\u7EE7\u7EED\u540E\uFF0C\u6717\u8BFB\u6587\u5B57\u4F1A\u53D1\u9001\u7ED9 DeepSeek\u3002\u5BC6\u94A5\u7531 DSH \u7BA1\u7406\uFF0C\u9C7C\u5E94\u4E0D\u4F1A\u4FDD\u5B58\u5BC6\u94A5\u3002"}),!k&&!H&&(0,g.jsx)("p",{role:"status",children:"\u6B63\u5728\u68C0\u67E5 DSH \u4E2D\u4FDD\u5B58\u7684 DeepSeek API Key\u2026"}),k&&!C&&(0,g.jsx)("p",{role:"status",children:"\u5C1A\u672A\u5728 DSH \u7684 DeepSeek API Key \u63D0\u4F9B\u5546\u4E2D\u914D\u7F6E\u5F00\u653E\u5E73\u53F0\u5BC6\u94A5\u3002"}),H&&(0,g.jsx)("p",{role:"status",children:"\u6682\u65F6\u65E0\u6CD5\u68C0\u67E5 DeepSeek API Key\u3002"}),(H||k&&!C)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:K,onClick:Z,children:"\u91CD\u65B0\u68C0\u67E5 DeepSeek API Key"}),(0,g.jsxs)("label",{className:F.inlineField,children:["DeepSeek \u97F3\u8272",(0,g.jsxs)("select",{"aria-label":"DeepSeek \u97F3\u8272",value:I,disabled:K,onChange:Q=>N(Q.target.value),children:[(0,g.jsx)("option",{value:"stella",children:"\u6D77\u661F \xB7 \u5973\u58F0"}),(0,g.jsx)("option",{value:"tide",children:"\u6697\u6F6E \xB7 \u7537\u58F0"})]})]})]}),U==="local"&&(0,g.jsx)(ur,{pickPath:c,state:e,sessionId:n,run:t,initialModelId:de?b.ttsSetup.localModelId:null,onboarding:!0})]}),d===2&&(0,g.jsxs)("section",{className:F.section,children:[(0,g.jsx)("h3",{children:"\u51C6\u5907\u8BED\u97F3\u8BC6\u522B"}),(0,g.jsx)("p",{children:"\u8BF4\u8BDD\u65B9\u5F0F\u548C\u6717\u8BFB\u914D\u7F6E\u5DF2\u4FDD\u5B58\u3002"}),s]}),(e.error||e.setupError)&&(0,g.jsx)("p",{role:"alert",className:F.note,children:"\u6682\u65F6\u672A\u80FD\u5B8C\u6210\uFF0C\u6B63\u5728\u6838\u67E5\u8BBE\u7F6E\u3002"})]})}),(0,g.jsxs)("footer",{className:F.actions,children:[(0,g.jsx)(me.Button,{variant:"outline",disabled:u,onClick:()=>d>0?m(d-1):v(i),children:"\u4E0A\u4E00\u6B65"}),(0,g.jsx)(me.Button,{variant:"primary",className:F.primary,disabled:K||!b||d===1&&U==="local"&&!de||d===1&&U==="deepseek"&&!C,onClick:()=>{ue()},children:u?"\u4FDD\u5B58\u4E2D\u2026":d===2?"\u5B8C\u6210":d===1&&E?"\u542F\u7528\u5728\u7EBF\u6717\u8BFB\u5E76\u7EE7\u7EED":d===1&&L?"\u542F\u7528 DeepSeek \u8BED\u97F3\u5408\u6210\u5E76\u7EE7\u7EED":"\u4E0B\u4E00\u6B65"})]})]})}var a=require("react/jsx-runtime"),mr=e=>e.setupOpen||e.setupStatus?.completed!==!0,Eh={ARCHIVED:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u5DF2\u5F52\u6863\u3002\u6062\u590D\u539F\u4F1A\u8BDD\u6216\u66F4\u6362\u7ED1\u5B9A\u540E\u518D\u5F00\u59CB\u8BED\u97F3\u3002",BUSY:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F\u3002\u7B49\u8FD9\u8F6E\u7ED3\u675F\u540E\u518D\u5F00\u59CB\u8BED\u97F3\u3002",UNAVAILABLE:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528\u3002\u53EF\u66F4\u6362\u7ED1\u5B9A\u6216\u89E3\u9664\u7ED1\u5B9A\u3002"},Td=e=>e.authorizationOpen||e.authorizationLoading&&!e.authorization;function Dd(e){let[n,t]=(0,D.useState)(!1),o=(0,D.useRef)(null),r=(0,D.useRef)(null),i=(0,D.useRef)(null),s=(0,D.useRef)(null),c=e.useWhalePreferences(x=>x),l=e.useWhaleUi(x=>x),u=Td(l),d=u||mr(l)?"setup":l.panelView??"home",m=n&&d!=="settings",f=(0,D.useCallback)(x=>{o.current=x,e.geometry.ref(x),e.sizing.ref(x)},[e.geometry,e.sizing]),p=(0,D.useCallback)(x=>{r.current=x,e.sizing.contentRef(x)},[e.sizing]);(0,D.useEffect)(()=>{e.setPanelVisible?.(!m)},[m]),(0,D.useLayoutEffect)(()=>{r.current&&(r.current.scrollTop=0)},[d]),(0,D.useLayoutEffect)(()=>e.sizing.update(),[d,m,u,l.sourcePending]),(0,D.useEffect)(()=>{let x=o.current,z=x?.ownerDocument;s.current&&x&&z&&(z.activeElement===z.body||x.contains(z.activeElement))&&(d==="home"?x.querySelector("[data-whale-settings-trigger]")?.focus({preventScroll:!0}):d!==s.current&&x.focus({preventScroll:!0})),s.current=d},[d]);let y=x=>{let z=hd(x);z&&e.recordUserOperation?.(z)},v=()=>{t(!0),requestAnimationFrame(()=>o.current?.querySelector("[data-whale-reopen]")?.focus())},b=()=>{e.refresh?.(),t(!1),requestAnimationFrame(()=>o.current?.focus())};return(0,Id.createPortal)((0,a.jsx)("section",{ref:f,className:h.floating,"data-whale-panel":!0,"data-view":d,"data-collapsed":m||void 0,"data-source-pending":l.sourcePending||void 0,"data-motion":c.motion,tabIndex:0,"aria-label":e.t("drag"),title:e.t("dragHint"),onPointerDownCapture:()=>e.geometry.activate?.(),onFocusCapture:()=>e.geometry.activate?.(),onPointerDown:x=>{if(x.button!==0||x.pointerType&&x.pointerType!=="mouse"||!Qu(x.target,x.currentTarget)){i.current=null;return}let z=x.target,M=z.getBoundingClientRect?.();M&&z.scrollHeight>z.clientHeight&&z.offsetWidth>z.clientWidth&&x.clientX>=M.left+z.clientLeft+z.clientWidth||(i.current={id:x.pointerId,x:x.clientX,y:x.clientY,moved:!1},x.target.closest?.("button")||x.currentTarget.focus({preventScroll:!0}),e.geometry.pointerDown(x,x.target.closest?.("[data-drag-surface]")??x.currentTarget))},onPointerMove:x=>{let z=i.current;!z||x.pointerId!==z.id||(Math.hypot(x.clientX-z.x,x.clientY-z.y)>=4&&(z.moved=!0),e.geometry.pointerMove(x))},onPointerUp:x=>{x.nativeEvent?.isTrusted&&i.current?.id===x.pointerId&&i.current.moved&&e.recordUserOperation?.("panel-move"),e.geometry.pointerEnd(x)},onPointerCancel:x=>{e.geometry.pointerEnd(x),i.current=null},onLostPointerCapture:e.geometry.pointerEnd,onClickCapture:x=>{i.current?.moved&&x.detail!==0?(x.preventDefault(),x.stopPropagation()):y(x),i.current=null},onChangeCapture:y,onSubmitCapture:y,onKeyDownCapture:y,onKeyDown:x=>{x.key==="Escape"&&(x.stopPropagation(),d==="setup"&&!m?v():d==="settings"?e.showHome():m||v())},children:(0,a.jsx)("div",{ref:p,className:h.panelViewport,"data-whale-content":!0,children:e.renderSlot("whale-ear.panel.controls",{collapsed:m,collapse:v,expand:b})})}),document.body)}var Ed=()=>()=>{};function $d(e){let{controlContext:n}=e,t=(0,D.useSyncExternalStore)(n?.subscribe??Ed,()=>n?n.sourceFor(n.selectedSession()):e.sessionId??null),o=(0,D.useSyncExternalStore)(n?.subscribe??Ed,()=>{let f=n?.currentConversation();return f===t?f:null});e={...e,sessionId:t,currentConversationId:o};let r=e.useWhaleUi(f=>f),[i,s]=(0,D.useState)(!1);(0,D.useLayoutEffect)(()=>{e.setSession?.(t)},[t]);let c=Td(r),l=r.updates?.release?.version,u=!e.collapsed&&!c&&!mr(r)&&r.panelView==="home"&&r.checkedFor===e.sessionId&&r.status?.enabled===!1&&r.status.ownerSessionId===null&&!r.status.voiceControlBusy&&r.status.voiceSession?.fullyStopped!==!1&&!r.busy&&!r.uncertain&&!r.updatesUnavailable&&r.updates?.status==="available"&&l&&l!==r.dismissedUpdateVersion;if((0,D.useEffect)(()=>{u&&s(!0)},[u]),c||mr(r)){let f=mr(r);return(0,a.jsxs)(a.Fragment,{children:[e.collapsed&&(0,a.jsx)(Od,{t:e.t,expand:e.expand}),c?(0,a.jsx)("div",{hidden:e.collapsed,children:(0,a.jsx)(Wh,{state:r,save:e.saveAuthorization,close:f?e.collapse:e.closeAuthorization,continueSetup:f?()=>e.closeAuthorization({resumeSetup:!0}):null})}):(0,a.jsx)("div",{role:"dialog","aria-modal":"false","aria-label":"\u9C7C\u5E94\u9996\u6B21\u914D\u7F6E","data-whale-setup":!0,hidden:e.collapsed,children:(0,a.jsx)(Ad,{pickPath:e.pickPath,state:r,sessionId:e.sessionId,run:e.run,onDismiss:e.dismissSetup,onMinimize:e.collapse,onBackToAuthorization:e.openAuthorization,asrStatus:(0,a.jsx)(Rd,{action:e.senseVoiceAsrAction,active:!e.collapsed})})})]})}let d=f=>{s(!0),f&&e.updateAction?.({action:"check"})},m=()=>{e.dismissUpdate?.(l),s(!1)};return(0,a.jsxs)(a.Fragment,{children:[r.panelView==="settings"?(0,a.jsx)(Hh,{...e,openUpdate:d}):(0,a.jsx)(Ih,{...e}),i&&(0,a.jsx)(fd,{state:r,close:m,run:e.updateAction,t:e.t})]})}function Wh({state:e,save:n,close:t,continueSetup:o}){let r=e.authorization,i=e.authorizationBusy||e.authorizationLoading,s=r?.usageAgreement?.accepted===!0,c=r?.usageAgreement?.text??[];return(0,a.jsxs)("section",{role:"dialog","aria-modal":"false","aria-label":"\u9C7C\u5E94\u4F7F\u7528\u534F\u8BAE","data-whale-authorization":!0,"data-whale-intrinsic":!0,className:`${h.settings} ${h.authorization}`,children:[(0,a.jsxs)("header",{className:h.settingsHeader,children:[(0,a.jsx)(Xn,{}),(0,a.jsx)("h2",{children:s?"\u9C7C\u5E94\u4F7F\u7528\u534F\u8BAE":"\u6B22\u8FCE\u4F7F\u7528\u9C7C\u5E94"}),s&&!o&&(0,a.jsx)(J.Button,{variant:"outline",disabled:i,onClick:t,children:"\u8FD4\u56DE"})]}),(0,a.jsx)("div",{className:h.authorizationBody,"data-whale-authorization-body":!0,"data-no-drag":!0,children:(0,a.jsxs)("div",{"data-whale-natural-content":!0,children:[!s&&(0,a.jsx)("p",{className:h.authorizationSteps,children:"1 \u4F7F\u7528\u534F\u8BAE\u3000\xB7\u30002 \u57FA\u7840\u914D\u7F6E"}),(0,a.jsx)("h3",{children:"\u9C7C\u5E94\u64CD\u4F5C\u8303\u56F4"}),(0,a.jsx)("div",{className:h.agreement,children:c.map(l=>(0,a.jsx)("p",{children:l},l))}),e.authorizationLoading&&!r&&(0,a.jsx)("p",{role:"status",className:h.hint,children:"\u6B63\u5728\u8BFB\u53D6\u2026"}),r&&(0,a.jsxs)("details",{className:h.section,children:[(0,a.jsx)("summary",{children:"\u670D\u52A1\u4E0E\u6A21\u578B\u6765\u6E90"}),(0,a.jsx)("ul",{className:h.permissionList,children:r.scopes.map(l=>(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:l.title}),(0,a.jsx)("p",{className:h.hint,children:l.description})]},l.id))}),r.modelSources.map(l=>(0,a.jsxs)("div",{children:[(0,a.jsx)("strong",{children:l.modelId}),(0,a.jsx)("p",{className:h.hint,children:l.source}),l.runtime&&(0,a.jsxs)("p",{className:h.hint,children:["\u8FD0\u884C\u7EC4\u4EF6\uFF1A",(l.runtime.sources??[l.runtime.source]).join("\u3001")]}),(0,a.jsx)("p",{className:h.hint,children:l.licenseNote}),l.licenseUrls.map(u=>(0,a.jsx)("p",{className:h.hint,children:(0,a.jsx)("a",{href:u,target:"_blank",rel:"noreferrer",children:u})},u))]},l.modelId))]}),(e.authorizationError||r?.revocationUnconfirmed)&&(0,a.jsx)("p",{role:"alert",className:h.error,children:r?.revocationUnconfirmed?"\u505C\u6B62\u8BBE\u5907\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u68C0\u67E5\u6216\u91CD\u542F\u5BBF\u4E3B\u3002":e.authorizationUncertain?"\u4FDD\u5B58\u7ED3\u679C\u5F85\u786E\u8BA4\uFF0C\u6B63\u5728\u6838\u67E5\u3002":"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"})]})}),(0,a.jsxs)("div",{className:`${h.actions} ${h.authorizationActions}`,children:[(0,a.jsx)(J.Button,{className:h.primary,variant:"primary",disabled:!r||i||e.authorizationUncertain,onClick:()=>s&&r?.granted?(o??t)():void n(!0),children:s&&r?.granted?o?"\u7EE7\u7EED\u914D\u7F6E":"\u8FD4\u56DE":"\u4E00\u952E\u6388\u6743\u5E76\u7EE7\u7EED"}),(0,a.jsx)(J.Button,{variant:"outline",disabled:i,onClick:s&&r?.granted&&!o?()=>{n(!1)}:t,children:s&&r?.granted?o?"\u7A0D\u540E":"\u64A4\u9500\u6388\u6743":"\u6682\u4E0D\u4F7F\u7528"})]}),!s&&(0,a.jsx)("p",{className:h.hint,children:"\u4E0B\u4E00\u6B65\uFF1A\u9009\u62E9\u8BF4\u8BDD\u65B9\u5F0F\u4E0E\u8BED\u97F3\u6A21\u578B"})]})}function Od({t:e,expand:n,markState:t="idle",compactState:o="off",enabled:r=!1}){return(0,a.jsxs)(J.Button,{className:h.bubble,"data-whale-reopen":!0,"data-whale-operation":"panel-open","data-drag-surface":!0,"aria-label":e("reopen"),title:e("title"),onClick:n,children:[(0,a.jsx)(Xn,{small:!0,state:t}),(0,a.jsx)("span",{className:h.bubbleBrand,children:e("title")}),(0,a.jsxs)("span",{className:h.bubbleStatus,"data-voice-state":o,children:[(0,a.jsx)(qe,{name:r===!1?"micOff":"mic"}),(0,a.jsx)("span",{children:e("compact_"+o)})]}),(0,a.jsx)("span",{className:h.voiceBars,"data-active":o==="listening"||void 0,"aria-hidden":"true",children:[0,1,2,3,4].map(i=>(0,a.jsx)("i",{},i))}),(0,a.jsx)(qe,{name:"down"})]})}function Ih(e){let{t:n,sessionId:t}=e,o=e.useWhaleUi(ae=>ae),r=o.status,i=o.busy,s=o.checkedFor===t,c=o.uncertain||!s,l=e.useWhalePreferences(ae=>ae),u=so(r),d=u&&o.conversationFor===t&&o.conversation?.rootSessionId===u&&!c?o.conversation:null,m=o.conversationHistoryFor===t&&!c&&(!r?.enabled||d?.rootSessionId===o.conversationHistory?.rootSessionId)?o.conversationHistory:null,f=d??{rootSessionId:m?.rootSessionId??null,items:[],latest:m?.items?.filter(ae=>ae.role==="assistant").at(-1)??null},p=!!(r?.enabled&&(o.conversationError||o.conversationFor===t&&o.conversation?.rootSessionId!==u)),y=r?.voiceSession?.recovery?.kind?.startsWith("helper-"),v=["predecessor-cleanup-pending","helper-cleanup-pending"].includes(r?.voiceSession?.recovery?.kind),b=["predecessor-stop-unconfirmed","helper-stop-unconfirmed"].includes(r?.voiceSession?.recovery?.kind)||/VOICE_(PREDECESSOR|HELPER)_STOP_UNCONFIRMED/.test(o.error??""),x=r?.voiceSession?.recovery?.kind==="live-root-conflict"||/VOICE_ROOT_OWNED_ELSEWHERE/.test(o.error??""),z=d?.helper??r?.helper,M=o.listenModePending?o.listenModeBefore:d?.helper&&d.revision!==o.listenModeReceiptRevision?d.helper.listenMode:r?.listenMode,$=!!(r?.enabled&&z?.online===!1),j=p||!!(r?.enabled&&M==null),W=!c&&!$&&!j&&mt.includes(M),U=i||!W||v||b||x||!r?.capabilities?.listenMode||r?.voiceControlBusy||o.visibilityUncertain||o.ttsUncertain||o.ttsCancelling,E=r?.enabled?d?.inputError:null,S=!r?.enabled&&o.enableError,k=Eh[/VOICE_EXISTING_(ARCHIVED|BUSY|UNAVAILABLE)/.exec(S??"")?.[1]],C=/VOICE_EXISTING_BINDING_CHANGED/.test(S??""),R=S&&o.settings?.voiceSession?.performanceMode==="fast"&&/VOICE_EXACT_EFFORT_HOST_REQUIRED|VOICE_FAST_/.test(S),P=t&&r?.ownerSessionId&&r.ownerSessionId!==t&&u!==t,N=r?.existingVoiceSession,I=N?.sessionId,H=o.existingSessionWritePending||o.existingSessionUnconfirmed,Z=r&&!c&&o.checkedFor===t&&!H,L=Z&&r.existingVoiceSession,K=Z?L?Ct(L):n("dedicatedVoiceTarget"):n("checkingVoiceTarget"),de=(0,D.useId)(),ue=(0,D.useId)(),Q=r?.enabled&&L&&d?.retryTranscripts?.sessionId===L.sessionId?d.retryTranscripts.items:[],G=r?.existingVoiceSessionSupported===!0&&Object.hasOwn(r,"existingVoiceSession")&&e.listExistingVoiceSessions&&e.setExistingVoiceSession,A=G&&ar(o,t),ne=e.currentConversationId&&G&&r.enabled===!1,pe=!!(!L&&!H&&o.checkedFor===t&&r&&!i&&!r.voiceControlBusy&&!c&&!o.ttsUncertain&&!o.ttsCancelling&&!v&&!x&&!b&&!P),ge=d?.wake??r?.wake,Ie=v?"pending":b||x||c||j||$?"unknown":i?"pending":d?.inputActive===!0?"input-active":r?.enabled?"authorized":"idle",[He,Te]=(0,D.useState)(null),[at,zn]=(0,D.useState)(!1),Ee=He==="targets"&&G&&r.enabled===!1,ie=(0,D.useRef)(!1),Ze=o.settingsFor===t?o.settings?.values:null,Ke=Ze?.pttKeyboard?[...Ze.pttKeyboard.modifiers||[],Ze.pttKeyboard.code].join(" + "):Ze?.pttMouse?n("sideButton")+" "+Ze.pttMouse:null,Cn=(0,D.useRef)({}),lt=()=>{ie.current=!0,Te(null)};(0,D.useLayoutEffect)(()=>{Te(ae=>e.collapsed||ae==="targets"?null:ae),zn(!1)},[t,e.collapsed]),(0,D.useEffect)(()=>{zn(!1),I&&Te(ae=>ae==="conversation"?null:ae)},[I]),(0,D.useEffect)(()=>{r?.enabled&&Te(ae=>ae==="targets"?null:ae)},[r?.enabled]),(0,D.useEffect)(()=>{Ee||!A||!ie.current||!Cn.current.targets||(ie.current=!1,Cn.current.targets.focus())},[Ee,A,e.collapsed]),(0,D.useEffect)(()=>{!c&&!I&&He==="conversation"&&r?.enabled===!1&&e.run(t,"read-history")},[He,c,r?.enabled,t,I]);let hr=Hu({enabled:r?.enabled,active:d?.inputActive===!0,unknown:!r||c||j||$||b||x||!!E,pending:i||v}),fn=()=>!I&&He==="conversation"&&(0,a.jsx)(ld,{conversation:f,history:m,historyLoading:o.sourcePending||!c&&o.conversationHistoryLoading,historyError:c?null:o.conversationHistoryError,historyRetryCursor:o.conversationHistoryRequestCursor,loadHistory:ae=>e.run(t,"read-history",ae?{cursor:ae}:{}),assistantName:l.assistantName||n("assistant"),setAssistantName:e.setAssistantName,t:n,close:()=>{Te(null),Cn.current.conversation?.focus()}},f.rootSessionId??"empty");return e.collapsed?(0,a.jsx)(Od,{t:n,expand:e.expand,markState:Ie,compactState:hr,enabled:r?.enabled??null}):(0,a.jsxs)("div",{className:h.panelContent,"data-home-controls":!0,"data-has-transcript-retry":Q.length>0||void 0,"data-home-layout":[r?r.enabled?"active":"idle":"loading",fr(o,t),!!(o.error||S),!!E,$,v,b,!!L].join(":"),"data-size-detail":He==="conversation"||Ee?"true":"false",onKeyDown:ae=>{!Ee||ae.key!=="Escape"||(ae.preventDefault(),ae.stopPropagation(),lt())},children:[(0,a.jsxs)("div",{className:h.header,children:[(0,a.jsxs)("span",{className:h.brand,children:[(0,a.jsx)(Xn,{state:Ie}),(0,a.jsx)("strong",{children:n("title")})]}),(0,a.jsxs)("div",{className:h.headerActions,children:[(0,a.jsxs)(J.Button,{className:h.newChatButton,"data-whale-operation":"new-voice-session","aria-label":n("newChat"),title:L?"\u89E3\u9664\u5DF2\u6709\u4F1A\u8BDD\u7ED1\u5B9A\u540E\u53EF\u65B0\u5EFA\u9C7C\u5E94\u4F1A\u8BDD":n(P?"newChatOtherOwner":r?.enabled?"newChatActive":"newChat"),disabled:!pe,onClick:()=>{e.run(t,"new",{expectedOwnerSessionId:r.ownerSessionId})},children:[(0,a.jsx)(qe,{name:"plus"}),(0,a.jsx)("span",{children:n("newChat")})]}),(0,a.jsx)(J.Button,{"data-whale-settings-trigger":!0,"data-whale-operation":"page-settings",className:h.iconButton,"aria-label":n("settings"),title:n("settings"),onClick:e.openSettings,children:(0,a.jsx)(qe,{name:"settings"})}),(0,a.jsx)(J.Button,{"data-whale-operation":"panel-close",className:h.iconButton,"aria-label":n("collapse"),title:n("collapseHint"),onClick:e.collapse,children:(0,a.jsx)(qe,{name:"minus"})})]})]}),(0,a.jsxs)("div",{className:h.statusRow,"data-bound":!!L||void 0,"data-recording":Ie==="input-active"||void 0,children:[(0,a.jsx)("div",{id:de,className:h.voiceTarget,"data-whale-voice-target":!0,children:G?(0,a.jsxs)(J.Button,{ref:ae=>{Cn.current.targets=ae},variant:"outline",className:h.existingSessionHome,"data-whale-bound-session":L?!0:void 0,"data-whale-target-trigger":!0,title:K,"aria-expanded":!!Ee,"aria-controls":Ee?ue:void 0,disabled:!Ee&&!A,onClick:()=>Ee?lt():Te("targets"),children:[(0,a.jsx)("span",{children:n("voiceTarget")}),(0,a.jsx)("strong",{className:h.ellipsis,children:K}),(0,a.jsx)(qe,{name:Ee?"down":"chevron"})]}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("span",{children:n("voiceTarget")}),(0,a.jsx)("strong",{className:h.ellipsis,title:K,children:K})]})}),(0,a.jsxs)("div",{className:h.voiceStatus,children:[(0,a.jsx)(qe,{name:r?.enabled?"mic":"micOff"}),(0,a.jsx)("span",{className:h.status,role:"status",children:o.listenModePending?n(r?.enabled?"modeSwitching":"modeSaving"):i?n("pending"):r?v?n("voiceCleanupPending"):b?n("voiceRestartPending"):x?n("voiceRecoveryPending"):c?n("stale"):$?n("voiceInputUnavailable"):j?n("unknown"):E?n("inputError_"+E):d?.inputActive===!0?n("inputActive"):r.enabled&&M==="wake"?n(Ki(ge)):r.enabled?n("enabled"):n("disabled"):n("unknown")})]})]}),Ee?(0,a.jsx)(Wi,{...e,state:o,homePickerId:ue,closeHomePicker:lt}):(0,a.jsxs)(a.Fragment,{children:[ne&&(0,a.jsx)(ud,{...e,sessionId:e.currentConversationId,boundSession:N,state:o},e.currentConversationId),(0,a.jsxs)("div",{className:h.quickActions,children:[(0,a.jsx)(J.Button,{"data-whale-operation":r?.enabled||x?"stop-voice":"start-voice",className:`${h.mainAction} ${r?.enabled?"":h.primary}`,variant:r?.enabled?"outline":"primary","aria-describedby":de,disabled:!s||!!H||i&&!(r?.enabled&&o.interruptibleRead&&!o.diagnosticStopPending)||v||b&&!r?.enabled||!r||c&&!x&&!$||!r.enabled&&!x&&(!Z||L&&!Rn(L)),title:r?.enabled?n("stopConsequence"):void 0,onClick:()=>{e.run(t,r?.enabled||x?"disable":"enable",r?.enabled||x?{}:{expectedOwnerSessionId:null,expectedExistingSessionId:L?.sessionId??null})},children:v?n("voiceCleanupPending"):b?n(r?.enabled?"endConversation":"voiceRestartPending"):x?n("voiceRecoveryCheck"):r?.enabled?n("endConversation"):n("startConversation")}),(0,a.jsx)("div",{className:h.quickSegments,role:"group","aria-label":n("mode"),"aria-busy":!!o.listenModePending,"data-listen-mode":W?M:"unknown",children:mt.map(ae=>(0,a.jsx)(J.Button,{"data-whale-operation":`listen-mode-${ae}`,"aria-pressed":W&&M===ae,disabled:!!U,onClick:()=>{M!==ae&&e.run(t,"listen-mode",{mode:ae})},children:n(xo(ae))},ae))})]}),Q.length>0&&(0,a.jsx)(Th,{items:Q,pending:o.transcriptRetry,busy:i,retry:ae=>e.retryVoiceTranscript?.(t,ae),t:n}),(!r||c||v||b||x)&&(0,a.jsx)("p",{className:h.hint,"data-home-important":v||b||x||void 0,children:n(v?y?"voiceHelperCleanupHint":"voiceCleanupHint":b?y?"voiceHelperRestartHint":"voiceRestartHint":x?"voiceRecoveryHint":i?"readingStatus":"statusRetry")}),!c&&(!j||$)&&r?.enabled&&!v&&!b&&(0,a.jsx)("p",{className:h.hint,"data-whale-input-hint":!0,"data-home-important":E||$?!0:void 0,children:$?n("voiceInputRecoveryHint"):E?n("inputHelp_"+E):M==="wake"?n(ge?.streamOpen&&ge.detection==="asr-after-utterance"?"wakeFallbackHint":"wakeHint"):M==="always"?n("alwaysWarning"):Ke?n("holdToSpeak")+" "+Ke:n("bindingMissing")}),r&&!c&&!r.capabilities?.listenMode&&(0,a.jsx)("p",{className:h.hint,children:n("modeUnavailable")}),o.listenModeError&&(0,a.jsx)("p",{role:"alert","data-whale-mode-error":!0,className:h.error,children:n(o.uncertain?"modeSwitchUnconfirmed":"modeSwitchFailed")}),o.readOnlyFailure&&c&&!x&&!b&&(0,a.jsx)(J.Button,{variant:"outline",disabled:i,onClick:()=>{e.run(t,"status")},children:n("retryStatus")}),(o.error||S)&&!o.readOnlyFailure&&!k&&!o.listenModeError&&!x&&!b&&(0,a.jsx)("p",{role:"alert",className:h.error,children:n(C?"voiceTargetChanged":R?"performanceFastUnavailable":!o.uncertain&&S?"enableFailed":"operationUnavailable")}),k&&(0,a.jsxs)("p",{role:"alert",className:h.notice,children:[k," ",(0,a.jsx)(J.Button,{variant:"outline",disabled:!A,onClick:()=>Te("targets"),children:"\u7BA1\u7406\u7ED1\u5B9A"})]}),/VOICE_SESSION_ARCHIVED/.test(S??o.error??"")&&(0,a.jsxs)("p",{className:h.notice,children:["\u539F\u8BED\u97F3\u4F1A\u8BDD\u5DF2\u5F52\u6863\u3002",(0,a.jsx)(J.Button,{variant:"outline",onClick:()=>{e.openSettings("sessions")},children:"\u6062\u590D\u539F\u4F1A\u8BDD"})]}),/VOICE_ASR_(?:PREPARING|PREPARE_FAILED)/.test(S??o.error??"")&&(0,a.jsxs)("p",{className:h.notice,children:["SenseVoice \u5C1A\u672A\u5C31\u7EEA\u3002",(0,a.jsx)(J.Button,{variant:"outline",onClick:()=>{e.openSettings("models","download")},children:"\u67E5\u770B\u6A21\u578B\u8FDB\u5EA6"})]}),/VOICE_MODEL_REQUIRED/.test(S??o.error??"")&&(0,a.jsxs)("p",{className:h.notice,children:["\u8BF7\u5148\u9009\u62E9\u53EF\u7528\u7684\u5BF9\u8BDD\u6A21\u578B\u3002",(0,a.jsx)(J.Button,{variant:"outline",onClick:()=>{e.openSettings("models","conversation")},children:"\u8BBE\u7F6E\u5BF9\u8BDD\u6A21\u578B"})]}),L&&!Rn(L)&&(0,a.jsx)("p",{className:h.hint,"data-home-important":!0,children:sr(L)}),d?.providerError&&(0,a.jsx)("p",{role:"alert","data-home-important":!0,"data-whale-provider-error":!0,className:h.error,children:d.providerError}),(0,a.jsx)(cd,{...e,state:o}),!L&&!o.error&&!E&&!x&&!b&&!v&&!$&&!j&&(0,a.jsx)(Dh,{...e,state:o}),at&&(0,a.jsx)("p",{role:"alert",className:h.notice,children:"DSH \u6682\u65F6\u65E0\u6CD5\u6253\u5F00\u539F\u4F1A\u8BDD\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"}),Rn(L)&&e.openExistingVoiceSession&&(0,a.jsxs)(J.Button,{className:h.caption,"data-whale-operation":"open-native-session","aria-label":"\u6253\u5F00\u539F\u4F1A\u8BDD",onClick:async()=>{zn(!1);try{await e.openExistingVoiceSession(L.sessionId)}catch{zn(!0)}},children:[d?.latest?.text&&(0,a.jsx)("span",{className:h.ellipsis,children:d.latest.text}),(0,a.jsx)("span",{className:h.openOriginal,children:"\u6253\u5F00\u539F\u4F1A\u8BDD"}),(0,a.jsx)(qe,{name:"chevron"})]}),r&&!I&&(0,a.jsxs)(J.Button,{ref:ae=>{Cn.current.conversation=ae},className:h.caption,onClick:()=>{let ae=He!=="conversation";Te(ae?"conversation":null),ae&&e.run(t,"read-history")},"aria-label":n("recentConversation"),"aria-expanded":He==="conversation",children:[(0,a.jsxs)("span",{className:h.ellipsis,children:[f.latest?.state==="speech-failed"?n("speechFailed")+": ":f.latest?.state==="interrupted"?n("speechInterrupted")+": ":"",f.latest?.text??n(o.newChatFor===t?"newChatCreated":"viewConversation")]}),(0,a.jsx)(qe,{name:"chevron"})]}),fn()]})]})}function Th({items:e,pending:n,busy:t,retry:o,t:r}){let i=(0,D.useId)();return(0,a.jsxs)("section",{className:h.transcriptRetries,"aria-labelledby":i,"data-whale-transcript-retries":!0,"data-no-drag":!0,children:[(0,a.jsxs)("header",{children:[(0,a.jsx)("h2",{id:i,children:r("retryTranscripts")}),(0,a.jsx)("p",{children:r("endDiscardsRetries")})]}),(0,a.jsx)("ul",{className:h.transcriptRetryList,tabIndex:0,"aria-labelledby":i,children:e.map(s=>{let c=n?.id===s.id&&s.state==="ready"?n.state:s.state,l={busy:"retryTranscriptBusy",sending:"retryTranscriptSending",uncertain:"retryTranscriptUncertain"}[c];return(0,a.jsxs)("li",{className:h.transcriptRetry,"data-retry-state":c,children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:h.transcriptRetryText,children:s.text}),l&&(0,a.jsx)("p",{className:h.hint,role:"status",children:r(l)})]}),(0,a.jsx)(J.Button,{variant:"outline",disabled:t||!!n||c!=="ready",onClick:()=>{o(s.id)},"data-whale-operation":"retry-voice-transcript",children:r("retryTranscript")})]},s.id)})})]})}function fr(e,n){let t=e.status;return!!(e.settings?.revision&&e.checkedFor===n&&e.settingsFor===n&&!e.uncertain&&!e.visibilityUncertain&&!e.settingsConflict&&!e.ttsUncertain&&!e.ttsCancelling&&t?.enabled===!1&&t.ownerSessionId===null&&t.voiceControlBusy===!1&&t.voiceSession?.fullyStopped===!0&&t.voiceSession?.id===null)}function Dh({state:e,sessionId:n,t,run:o,readState:r}){let i=(0,D.useRef)(0);(0,D.useEffect)(()=>()=>{i.current++},[n]);let s=fr(e,n),c=e.settings?.voiceSession?.performanceMode,l=e.performanceFor===n?e.performance:null,u=["fast","balanced","high"],d=l?.modes?.some(p=>p.performanceMode===c&&!p.available),m=e.busy||e.performancePending||e.uncertain||e.visibilityUncertain||!s,f=async p=>{if(m||p===c)return;let y=++i.current;if(p!=="compatibility"&&!await o(n,"inspect-performance")||y!==i.current)return;let v=r?.();!v||!fr(v,n)||v.busy||p!=="compatibility"&&(v.performanceFor!==n||!v.performance?.modes?.find(b=>b.performanceMode===p)?.available)||await o(n,"set-performance-mode",{revision:v.settings.revision,performanceMode:p})};return s?(0,a.jsxs)("section",{className:h.quickSpeed,"aria-label":t("performanceTitle"),children:[(0,a.jsxs)("div",{className:h.quickSpeedHeader,children:[(0,a.jsx)("span",{children:t("performanceTitle")}),c==="compatibility"&&(0,a.jsx)("small",{children:t("performance_compatibility")})]}),(0,a.jsx)("div",{className:h.quickSegments,children:u.map(p=>(0,a.jsxs)(J.Button,{"aria-pressed":c===p,disabled:m||!!Ri(l,p),title:t(Ri(l,p)||(p==="fast"?"performanceFastHint":"performance_"+p)),onClick:()=>{f(p)},children:[c===p&&(0,a.jsx)(qe,{name:"check"}),(0,a.jsx)(Fd,{value:p,t})]},p))}),(0,a.jsx)(Md,{capability:l,t,compact:!0,pending:e.performancePending,error:e.performanceError}),d&&(0,a.jsx)(J.Button,{variant:"outline",disabled:m,onClick:()=>{f("compatibility")},children:t("performance_compatibility")})]}):null}function $h({settings:e,sessionId:n,busy:t,run:o,t:r,status:i,verified:s,statusFresh:c,tab:l,markSettingsEdited:u,discardSettingsDraft:d,bindingError:m,captureBindings:f}){let[p,y]=(0,D.useState)(e.values.device??null),[v,b]=(0,D.useState)(e.values.pttMouse),[x,z]=(0,D.useState)(e.values.pttKeyboard??null),[M,$]=(0,D.useState)(e.values.speakerVerification.enabled),j=e.capabilities?.turnSignals===!0,[W,U]=(0,D.useState)(e.values.turnSignals?.enabled??!1),[E,S]=(0,D.useState)(e.values.turnSignals?.volume?.toString()??""),[k,C]=(0,D.useState)((e.values.wakeWordAliases??["\u5C0F\u9CB8\u9C7C"]).join("\uFF0C")),[R,P]=(0,D.useState)(String((e.values.wakeListenTimeoutMs??1e4)/1e3)),N=Yi(k),I=_o(N)&&Number.isInteger(Number(R)*1e3)&&Number(R)>=3&&Number(R)<=30,H=JSON.stringify(N)!==JSON.stringify(e.values.wakeWordAliases??["\u5C0F\u9CB8\u9C7C"])||Number(R)*1e3!==(e.values.wakeListenTimeoutMs??1e4),[Z,L]=(0,D.useState)(e.values.semanticExperimental===!0),[K,de]=(0,D.useState)(e.values.turnSignals?.headphonesConfirmed??!1),[ue,Q]=(0,D.useState)(e.values.turnSignals?.experimentalAutomaticBargeIn??!1),G=v!==e.values.pttMouse||JSON.stringify(x)!==JSON.stringify(e.values.pttKeyboard??null),[A,ne]=(0,D.useState)(!1),pe=c?i?.inputDevices:null,ge=p!==null&&typeof p=="object",Ie=ge||p==null||p===""||pe?.items?.some(ie=>typeof p=="number"&&ie.index===p),He=A==="index"&&(String(p??"").trim()===""||!/^\d+$/.test(String(p).trim())||!Number.isSafeInteger(Number(p))),Te=t||!c||i?.enabled!==!1||i?.ownerSessionId!==null||i?.voiceControlBusy!==!1||i?.voiceSession?.fullyStopped!==!0,at=()=>{if(t||!I||He||H&&Te)return;let ie=ge&&!A?p:A==="index"?Number(p):p==null||p===""?null:A==="name"?String(p).trim():typeof p=="number"?p:p.trim();o(n,"save-settings",{revision:e.revision,values:{wakeWordAliases:N,wakeListenTimeoutMs:Number(R)*1e3,semanticExperimental:Z,device:ie,pttMouse:e.values.pttMouse,...e.capabilities?.pttKeyboard?{pttKeyboard:e.values.pttKeyboard??null}:{},speakerVerification:{enabled:M},...j?{turnSignals:{enabled:W,volume:Number(E),headphonesConfirmed:K,experimentalAutomaticBargeIn:ue}}:{}}})},zn=(0,a.jsx)(J.Button,{className:h.primary,variant:"primary",disabled:t||!I||He||H&&Te||j&&(E.trim()===""||!Number.isFinite(Number(E))||Number(E)<0||Number(E)>1),onClick:at,children:r(t?"pending":"save")}),Ee=ge?p.name:pe?.items?.find(ie=>ie.index===p)?.name??(p==null||p===""?r("deviceDefault"):String(p));return(0,a.jsxs)("div",{className:h.section,"data-settings-draft":"save-settings",children:[(0,a.jsxs)("div",{hidden:l!=="audio",className:h.section,children:[(0,a.jsx)("h3",{children:r("mode")}),(0,a.jsxs)("p",{className:h.hint,children:["\u5F53\u524D\uFF1A",r(xo(i?.listenMode??e.listenMode))]}),(0,a.jsx)("div",{className:h.segmented,children:["ptt","always","wake"].map(ie=>(0,a.jsx)(J.Button,{"data-whale-operation":`listen-mode-${ie}`,variant:"outline","aria-pressed":(i?.listenMode??e.listenMode)===ie,disabled:!e.capabilities?.listenMode||!s||t,onClick:()=>{o(n,"listen-mode",{mode:ie})},children:r(xo(ie))},ie))}),(!e.capabilities?.listenMode||!s)&&(0,a.jsx)("p",{className:h.hint,children:r(e.capabilities?.listenMode?"modeNeedsGrant":"modeUnavailable")}),(0,a.jsxs)("div",{className:h.inlineActions,children:[(0,a.jsxs)("label",{className:h.inlineField,children:[r("device"),(0,a.jsxs)("select",{title:Ee,className:h.deviceSelect,"aria-label":r("device"),disabled:t,value:A?"__manual-"+A:ge?"__stable":Ie?p??"":"__saved",onChange:ie=>{let Ze=ie.target.value;Ze.startsWith("__manual-")?(ne(Ze.slice(9)),ge&&y("")):Ze!=="__saved"&&Ze!=="__stable"&&(ne(!1),y(Ze===""?null:Number(Ze)))},children:[(0,a.jsx)("option",{value:"",children:r("deviceDefault")}),ge&&(0,a.jsx)("option",{value:"__stable",children:p.name}),pe?.items?.map(ie=>(0,a.jsxs)("option",{value:String(ie.index),children:[ie.name," (",ie.index,")"]},ie.index)),!Ie&&(0,a.jsxs)("option",{value:"__saved",children:[r("deviceSaved"),": ",p]}),(0,a.jsx)("option",{value:"__manual-index",children:r("deviceManualIndex")}),(0,a.jsx)("option",{value:"__manual-name",children:r("deviceManualName")})]})]}),zn]}),Ee.length>22&&(0,a.jsxs)("details",{className:h.fullName,children:[(0,a.jsx)("summary",{children:"\u67E5\u770B\u8BBE\u5907\u5168\u540D"}),(0,a.jsx)("p",{children:Ee})]}),(A||!Ie)&&(0,a.jsxs)("label",{className:h.field,children:[r("deviceManual"),(0,a.jsx)(J.Input,{"aria-label":r("deviceManual"),disabled:t,value:p??"",onChange:ie=>{A||ne(typeof p=="number"?"index":"name"),y(ie.target.value)}})]}),He&&(0,a.jsx)("p",{className:h.notice,children:r("deviceIndexInvalid")}),pe?.status!=="available"&&(0,a.jsx)("p",{className:h.hint,children:r(pe?.status==="empty"?"deviceEmpty":"deviceUnknown")})]}),(0,a.jsx)("div",{hidden:l!=="interaction",className:h.section,children:(0,a.jsxs)("div",{className:h.bindingEditor,"data-settings-draft":"save-bindings",children:[(0,a.jsx)(Fh,{captureBindings:f,sessionId:n,active:l==="interaction",value:x,onChange:ie=>{u?.("save-bindings"),z(ie)},capability:e.capabilities?.pttKeyboard,disabled:t||!c,t:r}),(0,a.jsxs)("fieldset",{className:`${h.radios} ${h.mouseBinding}`,disabled:t||!c,children:[(0,a.jsx)("legend",{children:r("sideButton")}),[0,1,2].map((ie,Ze)=>(0,a.jsxs)("label",{children:[(0,a.jsx)("input",{type:"radio",name:"whale-ear-mouse",value:ie,checked:v===ie,onChange:()=>{u?.("save-bindings"),b(ie)}}),r(["sideOff","sideOne","sideTwo"][Ze])]},ie))]}),m&&(0,a.jsx)("p",{role:"alert",className:h.notice,children:/RECORDING|KEYS_HELD/.test(m)?"\u8BF7\u5148\u677E\u5F00\u6309\u952E\uFF0C\u7B49\u5F85\u5F55\u97F3\u5904\u7406\u5B8C\u6210\uFF0C\u518D\u4FDD\u5B58\u3002":/UNCONFIRMED|STOP_UNCONFIRMED|ROLLBACK_UNCONFIRMED/.test(m)?"\u6309\u952E\u72B6\u6001\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u91CD\u542F DSH \u518D\u6838\u67E5\u6309\u952E\u3002":/STALE|配置已改变|语音会话已改变/.test(m)?"\u914D\u7F6E\u6216\u8BED\u97F3\u4F1A\u8BDD\u5DF2\u6539\u53D8\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6\u540E\u518D\u4FDD\u5B58\u3002":/UNSUPPORTED/.test(m)?"\u5F53\u524D\u7CFB\u7EDF\u4E0D\u652F\u6301\u5728\u5BF9\u8BDD\u4E2D\u66F4\u6362\u5168\u5C40\u6309\u952E\u3002":"\u672A\u80FD\u4FDD\u5B58\u6309\u952E\uFF0C\u8BF7\u67E5\u770B\u9AD8\u7EA7\u8BE6\u60C5\u3002"}),(0,a.jsxs)("div",{className:`${h.actions} ${h.bindingActions}`,children:[(0,a.jsx)(J.Button,{className:h.primary,variant:"primary",disabled:t||!c||!G||!e.bindingContext||x?.code==="F4"&&x.modifiers.includes("Alt"),onClick:()=>{o(n,"save-bindings",{revision:e.revision,bindingContext:e.bindingContext,values:{pttMouse:v,pttKeyboard:x}})},children:r("saveBindings")}),G&&(0,a.jsx)(J.Button,{variant:"outline",disabled:t,onClick:()=>{b(e.values.pttMouse),z(e.values.pttKeyboard??null),d?.("save-bindings")},children:r("discardBindings")})]})]})}),(0,a.jsxs)("div",{hidden:l!=="advanced"||!e.values.speakerVerification.enabled,className:h.section,children:[e.values.speakerVerification.enabled&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(Ft,{label:r("speaker"),checked:M,disabled:t,onChange:$}),(0,a.jsx)("p",{className:h.hint,children:r("speakerHint")})]}),(0,a.jsx)("p",{className:h.hint,children:r("savedHint")})]}),(0,a.jsxs)("div",{hidden:l!=="audio",className:h.disclosureRow,children:[(0,a.jsxs)("details",{className:h.section,children:[(0,a.jsx)("summary",{children:r("wakeSettings")}),(0,a.jsx)("p",{className:h.hint,children:r("wakeMethod")}),(0,a.jsxs)("label",{className:h.field,children:[r("wakeAliases"),(0,a.jsx)(J.Input,{"aria-label":r("wakeAliases"),maxLength:208,value:k,disabled:Te,onChange:ie=>C(ie.target.value)})]}),(0,a.jsx)("p",{className:h.hint,children:r("wakeAliasesHint")}),(0,a.jsxs)("label",{className:h.field,children:[r("wakeTimeout"),(0,a.jsx)(J.Input,{"aria-label":r("wakeTimeout"),type:"number",min:"3",max:"30",step:"1",value:R,disabled:Te,onChange:ie=>P(ie.target.value)})]}),Te&&(0,a.jsx)("p",{className:h.hint,children:r("wakeStopToEdit")}),!I&&(0,a.jsx)("p",{role:"alert",className:h.notice,children:r("wakeInvalid")})]}),(0,a.jsxs)("details",{className:h.section,children:[(0,a.jsx)("summary",{children:r("soundTitle")}),(0,a.jsx)(Ft,{label:r("soundEnabled"),checked:W,disabled:!j||t,onChange:U}),(0,a.jsxs)("label",{className:h.field,children:[r("soundVolume"),(0,a.jsx)(Rt,{"aria-label":r("soundVolume")+"\u6ED1\u5757",min:"0",max:"1",step:"0.05",value:E,disabled:!j||t,onChange:ie=>S(ie.target.value)}),(0,a.jsx)(J.Input,{type:"number",min:"0",max:"1",step:"0.05","aria-label":r("soundVolume"),disabled:!j||t,value:E,onChange:ie=>S(ie.target.value)})]}),(0,a.jsx)(Ft,{label:"\u5B9E\u9A8C\u6027\u5524\u9192\u5224\u65AD\uFF08\u9ED8\u8BA4\u5173\u95ED\uFF09",checked:Z,disabled:t,onChange:L}),(0,a.jsx)("p",{className:h.hint,children:"\u5173\u95ED\u65F6\uFF0C\u81EA\u7531\u9EA6\u76F4\u63A5\u542C\u53D6\u6709\u6548\u8BED\u97F3\uFF1B\u5F00\u542F\u540E\u4F7F\u7528\u5524\u9192\u8BCD\u6216\u8BED\u4E49\u5224\u65AD\uFF0C\u53EF\u80FD\u6F0F\u5524\u9192\u3002\u5EFA\u8BAE\u4F7F\u7528\u8033\u673A\u51CF\u5C11\u56DE\u58F0\u3002"}),(0,a.jsx)(J.Checkbox,{label:r("headphones"),checked:K,disabled:!j||t,onChange:ie=>{de(ie),ie||Q(!1)}}),(0,a.jsx)("p",{className:h.hint,children:r("headphonesHint")}),(0,a.jsx)(Ft,{label:r("automaticBargeIn"),checked:ue,disabled:!j||!K||t,onChange:Q}),j&&!K&&(0,a.jsx)("p",{className:h.hint,children:r("headphonesRequired")}),(0,a.jsx)("p",{className:h.hint,children:r(j?"soundAvailable":"soundUnavailable")})]})]}),l==="advanced"&&e.values.speakerVerification.enabled&&(0,a.jsx)("div",{className:h.formActions,children:zn})]})}function Rd({action:e,active:n}){let[t,o]=(0,D.useState)(null),[r,i]=(0,D.useState)(0),s=(0,D.useRef)(0);if((0,D.useEffect)(()=>{if(!e||!n)return;let u=new AbortController,d,m=async p=>{try{let y=await e({operation:p},u.signal);if(u.signal.aborted)return;o(y),y.selected&&(p==="retry"||["idle","downloading"].includes(y.state))&&(d=setTimeout(()=>{m("status")},1e3))}catch{u.signal.aborted||o({state:"unavailable"})}},f=r>s.current?"retry":"status";return s.current=r,m(f),()=>{clearTimeout(d),u.abort()}},[e,n,r]),!e||!n)return null;let c=t?.totalBytes>0&&t?.state==="downloading",l=u=>(u/1e6).toFixed(1);return(0,a.jsxs)("div",{className:h.section,"data-whale-sensevoice":!0,children:[(0,a.jsx)("h3",{children:"SenseVoice"}),(0,a.jsx)("p",{role:"status",children:t?.selected===!1?"\u4F7F\u7528\u9AD8\u7EA7\u8DEF\u5F84\u4E2D\u6307\u5B9A\u7684\u672C\u5730 SenseVoice \u6A21\u578B\u3002":t?.state==="ready"?"\u5DF2\u5C31\u7EEA\uFF0C\u5728\u672C\u673A\u79BB\u7EBF\u8BC6\u522B\u3002":t?.state==="error"?t.message:t?.state==="unavailable"?"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u6A21\u578B\u72B6\u6001\u3002":c?`\u6B63\u5728\u4E0B\u8F7D \xB7 ${l(t.receivedBytes)} / ${l(t.totalBytes)} MB`:"\u6B63\u5728\u51C6\u5907\u672C\u5730\u8BC6\u522B\u6A21\u578B\u2026"}),c&&(0,a.jsx)("progress",{"aria-label":"SenseVoice \u4E0B\u8F7D\u8FDB\u5EA6",value:t.receivedBytes,max:t.totalBytes}),t?.selected&&t?.state==="error"&&(0,a.jsx)(J.Button,{variant:"outline",onClick:()=>{o(null),i(u=>u+1)},children:"\u91CD\u8BD5\u4E0B\u8F7D"})]})}function Oh({settings:e,sessionId:n,busy:t,run:o,t:r,pickPath:i,active:s,modelTab:c,markSettingsEdited:l,senseVoiceAsrAction:u}){let[d,m]=(0,D.useState)(e.modelSetup.models),f=t,p=()=>l?.("save-models"),y=()=>{o(n,"save-models",{revision:e.revision,values:{asr:"sensevoice",modelCompute:"cpu",models:d}})};return(0,a.jsxs)("section",{className:h.section,"data-settings-draft":"save-models",hidden:!["download","paths"].includes(c),children:[(0,a.jsx)("div",{"data-whale-tab-panel":!0,hidden:c!=="download",children:(0,a.jsx)(Rd,{action:u,active:s&&c==="download"})}),(0,a.jsxs)("div",{hidden:c!=="paths",className:h.section,children:[(0,a.jsx)("h3",{children:"\u8BC6\u522B\u6A21\u578B\u672C\u5730\u8DEF\u5F84"}),(0,a.jsx)("p",{className:h.hint,children:"\u53EF\u5728\u201C\u6A21\u578B\u4E0B\u8F7D\u201D\u67E5\u770B\u51C6\u5907\u8FDB\u5EA6\uFF0C\u6216\u5728\u8FD9\u91CC\u6307\u5B9A\u672C\u673A\u5DF2\u6709\u7684 SenseVoice \u76EE\u5F55\u3002"}),[["sensevoiceDir","sensevoicePath"],["campplus","campplusPath"]].map(([v,b])=>(0,a.jsx)(uo,{className:h.pathRow,label:r(b),kind:v,value:d[v],disabled:f,active:s&&c==="paths",pickPath:i,sessionId:n,scope:"sensevoice",onChange:x=>{p(),m(z=>({...z,[v]:x}))}},v)),(0,a.jsx)(J.Button,{variant:"outline",disabled:f,onClick:y,children:r("saveModels")})]})]})}function Rh({settings:e,state:n,sessionId:t,run:o,t:r}){let[i,s]=(0,D.useState)(e.voiceSession.visibility),c=n.settingsFor===t,l=n.checkedFor===t&&n.status!==null,u=l?n.status.voiceCapabilities:e.voiceCapabilities,d=l?n.status.voiceSession:null,m=l&&(n.status.enabled||n.status.ownerSessionId!==null||d?.id!=null),f=l&&n.status.voiceControlBusy===!1,p=n.busy||n.uncertain||!c||!l||!f||m,y=v=>r(v==="workspace"?"workspaceMode":"hiddenMode");return(0,a.jsxs)("section",{className:h.section,"data-whale-visibility":!0,"data-settings-draft":"set-visibility",children:[(0,a.jsx)("h3",{children:r("capabilityTitle")}),(0,a.jsx)("dl",{className:h.details,children:["hidden","workspace"].map(v=>(0,a.jsxs)("div",{className:h.capabilityRow,children:[(0,a.jsx)("dt",{children:y(v)}),(0,a.jsxs)("dd",{children:[r(u?.[v]?.supported?"supported":"unsupported"),u?.[v]?.reason?` \xB7 ${u[v].reason}`:""]})]},v))}),(0,a.jsxs)("p",{className:h.hint,children:[r("taskCapability"),": ",r(u?.taskHandoff?.supported?"supported":"unsupported")," \xB7 ",u?.taskHandoff?.mode??r("unknown"),u?.taskHandoff?.reason?` \xB7 ${u.taskHandoff.reason}`:""]}),(0,a.jsxs)("p",{children:[r("configuredMode"),": ",y(e.voiceSession.visibility)]}),(0,a.jsx)("p",{className:h.hint,children:l?d?.id?`${r("currentVoiceMode")}: ${d.presentation?.requested?y(d.presentation.requested):r("unknown")} \xB7 ${d.id}`:r("noActiveVoice"):r("modeReadFirst")}),(0,a.jsxs)("fieldset",{className:h.radios,disabled:p,children:[(0,a.jsx)("legend",{children:r("chooseVisibility")}),(0,a.jsxs)("label",{children:[(0,a.jsx)("input",{type:"radio",name:"whale-ear-visibility",checked:i==="hidden",onChange:()=>s("hidden")}),r("hiddenMode")]}),(0,a.jsxs)("label",{children:[(0,a.jsx)("input",{type:"radio",name:"whale-ear-visibility",checked:i==="workspace",disabled:!u?.workspace?.supported,onChange:()=>s("workspace")}),r("workspaceMode")]})]}),(0,a.jsx)("p",{className:h.hint,children:r("workspaceWarning")}),(0,a.jsx)("p",{className:h.hint,children:r("visibilityNoMigration")}),(!c||!l)&&(0,a.jsx)("p",{className:h.hint,children:r("modeReadFirst")}),m&&(0,a.jsx)("p",{className:h.hint,children:r("closeBeforeMode")}),l&&!f&&(0,a.jsx)("p",{className:h.hint,children:r("modeControlPending")}),(0,a.jsx)("div",{children:(0,a.jsx)(J.Button,{variant:"outline",disabled:p||i===e.voiceSession.visibility||i==="workspace"&&!u?.workspace?.supported,onClick:()=>{o(t,"set-visibility",{revision:e.revision,visibility:i})},children:r(i==="workspace"?"saveWorkspace":"saveHidden")})})]})}function Fh({value:e,onChange:n,capability:t,disabled:o,t:r,captureBindings:i,sessionId:s,active:c}){let[l,u]=(0,D.useState)(!1),[d,m]=(0,D.useState)(!1),[f,p]=(0,D.useState)(null),y=(0,D.useRef)(null),v=(0,D.useRef)(0),b=(0,D.useRef)(null),x=(0,D.useRef)(!0),z=async j=>{v.current++,x.current&&u(!1);let W=y.current;if(W){x.current&&m(!0);try{await i(W.sessionId,{operation:"end",token:W.token}),y.current===W&&(y.current=null),x.current&&j&&n(j),x.current&&p(null)}catch(U){x.current&&p(String(U.message||U))}finally{x.current&&m(!1)}}},M=async()=>{if(y.current||d)return;let j=++v.current;m(!0),p(null);try{let W=await i(s,{operation:"begin"});if(y.current={...W,sessionId:s},!x.current||j!==v.current){await z();return}u(!0),b.current?.focus()}catch(W){x.current&&p(String(W.message||W))}finally{x.current&&m(!1)}};(0,D.useEffect)(()=>(x.current=!0,()=>{x.current=!1,z()}),[]),(0,D.useEffect)(()=>{(!c||o)&&(v.current++,z())},[c,o,s]),(0,D.useEffect)(()=>{if(!l)return;let j=null,W=!1,U=!1,E=N=>{U||(U=!0,z(N))},S=N=>{if(N.preventDefault(),N.stopPropagation(),N.code==="Escape"){j=null;return}N.repeat||["ControlLeft","ControlRight","AltLeft","AltRight","ShiftLeft","ShiftRight"].includes(N.code)||(j=ed(N),W=!1,p(j?null:r("bindingUnsupported")))},k=N=>{if(N.preventDefault(),N.stopPropagation(),N.code==="Escape"){E();return}j&&(N.code===j.code&&(W=!0),W&&!N.ctrlKey&&!N.altKey&&!N.shiftKey&&E(j))},C=()=>E(),R=()=>{document.hidden&&C()};window.addEventListener("keydown",S,!0),window.addEventListener("keyup",k,!0),window.addEventListener("blur",C),document.addEventListener("visibilitychange",R);let P=setTimeout(C,1e4);return()=>{clearTimeout(P),window.removeEventListener("keydown",S,!0),window.removeEventListener("keyup",k,!0),window.removeEventListener("blur",C),document.removeEventListener("visibilitychange",R)}},[l]);let $=e?[...e.modifiers||[],e.code].join(" + "):r("bindingOff");return(0,a.jsxs)("section",{className:h.keyBinding,children:[(0,a.jsx)("h3",{children:r("keyboardBinding")}),(0,a.jsxs)("div",{className:h.keyBindingRow,children:[(0,a.jsx)("span",{children:$}),(0,a.jsxs)("div",{className:h.actions,children:[(0,a.jsx)(J.Button,{variant:"outline",ref:b,onBlur:()=>{l&&z()},disabled:o||d||!t?.supported||!i,onClick:()=>l?void z():void M(),children:d?"\u6B63\u5728\u4EA4\u63A5\u2026":l?"\u53D6\u6D88\u5F55\u5165":"\u5F55\u5165\u6309\u952E"}),e&&(0,a.jsx)(J.Button,{variant:"outline",disabled:o||d||l,onClick:()=>n(null),children:r("clearBinding")}),y.current&&!l&&!d&&(0,a.jsx)(J.Button,{variant:"outline",onClick:()=>{z()},children:"\u6062\u590D\u539F\u6309\u952E"})]})]}),l&&(0,a.jsx)("p",{role:"status",className:h.notice,children:"\u6309\u952E\u8BF4\u8BDD\u5DF2\u6682\u505C\u3002\u8BF7\u6309\u4E0B\u7EC4\u5408\u952E\u540E\u5168\u90E8\u677E\u5F00\uFF1BEsc \u53D6\u6D88\u3002"}),!t?.supported&&(0,a.jsx)("p",{className:h.hint,children:t?.reason||r("bindingUnavailable")}),f&&(0,a.jsx)("p",{role:"alert",children:f})]})}function Fd({value:e,t:n}){let t={fast:"performanceNoThinking",balanced:"performanceRecommended"}[e];return(0,a.jsxs)("span",{className:h.performanceChoice,children:[n("performance_"+e),t&&(0,a.jsxs)(a.Fragment,{children:[" ",(0,a.jsx)("small",{children:n(t)})]})]})}function Ri(e,n){let t=e?.modes?.find(o=>o.performanceMode===n);return!t||t.available?null:t.reason==="provider_unsupported"?"performanceUnavailable":t.reason==="unknown"?"performanceProbeUnknown":n==="fast"?"performanceFastUnavailable":"performanceHostUnavailable"}function Md({capability:e,t:n,compact:t=!1,pending:o=!1,error:r=null}){let i=e?.modes??[],s=i.map(v=>v.reason),c=e?.probe?.status,l=c==="unknown"||s.includes("unknown"),u=o||c==="pending"||c==="running",d=!t&&(c==="accepted"||s.includes("accepted")),m=!t&&s.includes("explicit_off"),f=i.some(v=>v.performanceMode==="fast"&&!v.available&&v.reason==="host_contract_blocked"),p=s.includes("provider_unsupported"),y=i.some(v=>v.performanceMode!=="fast"&&!v.available&&v.reason==="host_contract_blocked");if(!l&&!u&&!d&&!m&&!f&&!p&&!y&&!r)return null;if(t){let v=r||n(u?"performanceProbePending":f?"performanceFastUnavailable":p?"performanceUnavailable":l?"performanceProbeUnknown":"performanceHostUnavailable");return(0,a.jsx)("div",{role:"status",className:h.quickHint,"data-whale-probe-status":!0,title:v,children:v})}return(0,a.jsxs)("div",{role:"status",className:h.hint,"data-whale-probe-status":!0,children:[u&&(0,a.jsx)("p",{children:n("performanceProbePending")}),r&&(0,a.jsx)("p",{"data-whale-probe-error":!0,children:r}),f&&(0,a.jsx)("p",{children:n("performanceFastUnavailable")}),p&&(0,a.jsx)("p",{children:n("performanceUnavailable")}),y&&(0,a.jsx)("p",{children:n("performanceHostUnavailable")}),l&&(0,a.jsx)("p",{children:n("performanceProbeUnknown")}),d&&(0,a.jsx)("p",{children:n("performanceProbeAccepted")}),m&&(0,a.jsx)("p",{children:n("performanceFastHint")})]})}function Mh({state:e,sessionId:n,run:t,t:o,markSettingsEdited:r}){let i=e.settings,s=i?.voiceSession?.performanceMode??null,[c,l]=(0,D.useState)(s),u=fr(e,n),d=e.performanceFor===n?e.performance:null,m=d?.modes?.find(p=>p.performanceMode===c),f=e.busy||e.performancePending||e.uncertain||!u||!c||c!=="compatibility"&&!m?.available;return u?(0,a.jsxs)("section",{className:h.section,"data-whale-performance":!0,"data-settings-draft":"set-performance-mode",children:[(0,a.jsx)("h3",{children:o("performanceTitle")}),(0,a.jsx)("p",{className:h.hint,children:o("performanceHint")}),(0,a.jsx)("p",{className:h.hint,"data-whale-probe-cost":!0,children:"\u90E8\u5206\u6A21\u578B\u7684\u68C0\u6D4B\u4F1A\u53D1\u9001\u8BA1\u8D39\u77ED\u8BF7\u6C42\u3002"}),(0,a.jsxs)("details",{className:h.details,children:[(0,a.jsx)("summary",{children:"\u68C0\u6D4B\u8303\u56F4\u4E0E\u8D39\u7528"}),(0,a.jsx)("p",{children:o("performanceProbeCost")}),(0,a.jsx)("p",{children:o("performanceProbeScope")})]}),(0,a.jsx)(Md,{capability:d,t:o,pending:e.performancePending,error:e.performanceError}),!d&&(0,a.jsx)("p",{className:h.hint,children:o("performanceReadFirst")}),s&&(0,a.jsxs)("p",{className:h.hint,children:["\u5F53\u524D\uFF1A",o("performance_"+s)]}),(0,a.jsx)("div",{className:h.segmented,children:["fast","balanced","high","compatibility"].map(p=>{let y=p==="compatibility"?null:d?Ri(d,p):"performanceReadFirst";return(0,a.jsx)(J.Button,{title:y?o(y):void 0,"aria-pressed":c===p,disabled:e.busy||e.performancePending||!!y,onClick:()=>{r?.("set-performance-mode"),l(p)},children:(0,a.jsx)(Fd,{value:p,t:o})},p)})}),(0,a.jsxs)("div",{className:h.actions,children:[(0,a.jsx)(J.Button,{variant:"outline",disabled:e.busy||e.performancePending,onClick:()=>{t(n,"inspect-performance")},children:o("inspectPerformance")}),(0,a.jsx)(J.Button,{variant:"outline",disabled:f||c===s,onClick:()=>{t(n,"set-performance-mode",{revision:i.revision,performanceMode:c})},children:o("savePerformance")})]})]}):null}function Bh({state:e,sessionId:n,run:t,t:o}){let r=e.outputVolumeFor===n?e.outputVolume:null,[i,s]=(0,D.useState)(null),[c,l]=(0,D.useState)(null),u=i??r?.volume??1,d=i!==null&&c!==r?.revision;return(0,D.useEffect)(()=>{s(null),l(null)},[n]),(0,a.jsxs)("section",{className:h.section,children:[(0,a.jsx)("h3",{children:o("outputVolume")}),r&&!r.supported&&(0,a.jsx)("p",{className:h.hint,children:o("outputVolumeUnavailable")}),r?.supported&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:h.volumeRow,children:[(0,a.jsxs)("label",{className:h.volumeControl,children:[(0,a.jsx)(Rt,{"aria-label":o("outputVolume"),min:"0",max:"1",step:"0.01",value:u,disabled:!r.supported||e.busy||e.outputVolumeUncertain,onChange:m=>{i===null&&l(r.revision),s(Number(m.target.value))}}),(0,a.jsxs)("span",{children:[Math.round(u*100),"%"]})]}),(0,a.jsx)(J.Button,{variant:"outline",disabled:!r.supported||e.busy||e.outputVolumeUncertain||d||i===null,onClick:async()=>{await t(n,"set-output-volume",{revision:c,volume:i})&&s(null)},children:o("saveOutputVolume")})]}),(0,a.jsx)("p",{className:h.hint,children:"\u4E0B\u4E00\u6BB5\u64AD\u653E\u751F\u6548"})]}),d&&(0,a.jsxs)("p",{role:"status",className:h.notice,children:["\u97F3\u91CF\u5DF2\u5728\u522B\u5904\u66F4\u65B0\uFF0C\u5F53\u524D\u9009\u62E9\u5DF2\u4FDD\u7559\u3002",(0,a.jsx)(J.Button,{variant:"outline",disabled:e.busy,onClick:()=>s(null),children:"\u4F7F\u7528\u5F53\u524D\u97F3\u91CF"})]}),!r&&(0,a.jsx)("p",{role:"status",className:h.hint,children:e.busy?o("pending"):o("statusRetry")}),e.outputVolumeUncertain&&(0,a.jsx)("p",{role:"status",className:h.notice,children:o("outputVolumeUnknown")})]})}function Zh({state:e,sessionId:n,run:t,markSettingsEdited:o,discardSettingsDraft:r}){let i=e.settingsFor===n?e.settings:null,s=i?.conversationModel??{mode:"auto",provider:null,model:null},[c,l]=(0,D.useState)(s),[u,d]=(0,D.useState)(""),[m,f]=(0,D.useState)(!1),p=(0,D.useRef)(!1),y=(0,D.useRef)(!0);(0,D.useEffect)(()=>(y.current=!0,()=>{y.current=!1}),[]);let v=e.conversationModelsFor===n?e.conversationModels:null,b=v?.providers??[],x=b.find(S=>S.id===c.provider),z=c.mode==="auto"||!!x?.models.some(S=>S.id===c.model),M=JSON.stringify(c)!==JSON.stringify(s),$=e.status,j=e.checkedFor===n&&!e.uncertain&&$?.enabled===!1&&$?.ownerSessionId===null&&$?.voiceControlBusy===!1&&$?.voiceSession?.fullyStopped===!0&&$?.voiceSession?.id===null,W=!i||!j||e.busy||e.settingsConflict||e.visibilityUncertain||m,U=S=>{o?.("save-conversation-model"),l(k=>({...k,...S})),d("")},E=async()=>{if(W||p.current||!M||!z)return;p.current=!0,f(!0),d("");let S=await t(n,"save-conversation-model",{revision:i.revision,values:c.mode==="auto"?{mode:"auto",provider:null,model:null}:c});p.current=!1,y.current&&(f(!1),d(S?"\u9ED8\u8BA4\u5DF2\u4FDD\u5B58\uFF0C\u4E0B\u6B21\u5F00\u542F\u8BED\u97F3\u751F\u6548\u3002":"\u4FDD\u5B58\u672A\u6210\u529F\uFF0C\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002\u8BF7\u6838\u67E5\u63D0\u793A\u540E\u518D\u64CD\u4F5C\u3002"))};return(0,a.jsxs)("section",{className:h.section,"data-conversation-model":!0,"data-settings-draft":"save-conversation-model",children:[(0,a.jsx)("h3",{children:"\u9ED8\u8BA4\u5BF9\u8BDD\u6A21\u578B"}),(0,a.jsx)("p",{className:h.hint,children:"\u63A5\u6536\u8BED\u97F3\u8BC6\u522B\u540E\u7684\u6587\u5B57\uFF0C\u7528\u4E8E\u751F\u6210\u56DE\u7B54\u3002"}),(0,a.jsx)("fieldset",{className:h.radios,disabled:W,"aria-label":"\u5BF9\u8BDD\u6A21\u578B\u9009\u62E9\u65B9\u5F0F",children:[["auto","\u81EA\u52A8"],["manual","\u624B\u52A8\u6307\u5B9A"]].map(([S,k])=>(0,a.jsxs)("label",{children:[(0,a.jsx)("input",{type:"radio",name:"conversation-mode-"+n,checked:c.mode===S,onChange:()=>U(S==="auto"?{mode:S,provider:null,model:null}:{mode:S})}),k]},S))}),c.mode==="auto"&&(0,a.jsxs)("div",{className:h.section,children:[(0,a.jsx)("p",{className:h.hint,children:"\u8DDF\u968F\u5F53\u524D\u5BF9\u8BDD\u6240\u9009\u6A21\u578B\u3002\u7A7A\u767D\u9996\u9875\u4F7F\u7528 DSH \u7684\u9ED8\u8BA4\u6A21\u578B\u3002"}),(0,a.jsx)("p",{children:"\u5F00\u542F\u8BED\u97F3\u65F6\u786E\u5B9A\u6A21\u578B\u6765\u6E90"})]}),(0,a.jsx)(Vi,{open:c.mode==="manual",children:(0,a.jsxs)("div",{className:h.section,"data-conversation-manual":!0,children:[(0,a.jsx)(Wd,{label:"\u4F9B\u5E94\u5546",value:c.provider,options:b,disabled:W||!v,onChange:S=>U({provider:S,model:null})}),(0,a.jsx)(Wd,{label:"\u6A21\u578B",value:c.model,options:x?.models??[],disabled:W||!x,onChange:S=>U({model:S})}),(0,a.jsx)("p",{className:h.hint,children:"\u4EC5\u5217\u51FA\u5BBF\u4E3B\u5DF2\u914D\u7F6E\u7684\u5BF9\u8BDD\u4F9B\u5E94\u5546\u4E0E\u6A21\u578B\uFF0C\u4FDD\u5B58\u65F6\u518D\u6B21\u9A8C\u8BC1\u3002"}),!v&&(0,a.jsx)("p",{role:"status",children:e.conversationModelsError?"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u4F9B\u5E94\u5546\uFF0C\u8BF7\u91CD\u8BD5\u3002":"\u6B63\u5728\u8BFB\u53D6\u4F9B\u5E94\u5546\u2026"}),v&&!b.length&&(0,a.jsx)("p",{role:"status",children:"\u6682\u65E0\u53EF\u7528\u5BF9\u8BDD\u6A21\u578B\uFF0C\u8BF7\u5148\u5728 DSH \u4E2D\u914D\u7F6E\u4F9B\u5E94\u5546\u3002"}),c.provider&&!z&&(0,a.jsx)("p",{role:"status",children:"\u8BF7\u9009\u62E9\u5F53\u524D\u53EF\u7528\u7684\u4F9B\u5E94\u5546\u4E0E\u6A21\u578B\u3002\u539F\u9009\u62E9\u4E0D\u4F1A\u81EA\u52A8\u66FF\u6362\u3002"}),(0,a.jsx)(J.Button,{variant:"outline",disabled:e.busy,onClick:()=>{t(n,"conversation-models")},children:"\u5237\u65B0\u4F9B\u5E94\u5546"})]})}),(0,a.jsxs)("div",{className:h.actions,children:[(0,a.jsx)(J.Button,{variant:"primary",disabled:W||!M||!z,onClick:()=>{E()},children:m?"\u4FDD\u5B58\u4E2D\u2026":"\u4FDD\u5B58\u9ED8\u8BA4"}),(0,a.jsx)(J.Button,{variant:"outline",disabled:W||!M,onClick:()=>{l(s),d(""),r?.("save-conversation-model")},children:"\u53D6\u6D88\u4FEE\u6539"})]}),(0,a.jsx)("p",{role:"status",className:h.hint,children:u||(M?"\u5C1A\u672A\u4FDD\u5B58":s.mode==="auto"?"\u5DF2\u4FDD\u5B58\uFF1A\u81EA\u52A8 \xB7 \u8DDF\u968F\u5F53\u524D\u5BF9\u8BDD":`\u5DF2\u4FDD\u5B58\uFF1A${s.provider} / ${s.model}`)})]})}function Wd({label:e,value:n,options:t,disabled:o,onChange:r}){let[i,s]=(0,D.useState)(!1),[c,l]=(0,D.useState)(0),u=(0,D.useRef)(null),d=(0,D.useRef)(null),m=(0,D.useRef)(null),f=(0,D.useId)(),p=t.find(b=>b.id===n);(0,D.useEffect)(()=>{o&&s(!1)},[o]),(0,D.useEffect)(()=>{i&&m.current?.querySelector('[data-option-index="'+c+'"]')?.focus()},[i,c]);let y=()=>{s(!1),d.current?.focus()},v=b=>{r(b.id),y()};return(0,a.jsxs)("div",{ref:u,className:h.conversationChoice,onBlur:b=>{b.currentTarget.contains(b.relatedTarget)||s(!1)},children:[(0,a.jsx)("span",{id:f+"-label",children:e}),(0,a.jsxs)(J.Button,{ref:d,variant:"outline",className:h.deviceSelect,"aria-label":e,"aria-haspopup":"listbox","aria-expanded":i,"aria-controls":f,disabled:o||!t.length,onClick:()=>{l(Math.max(0,t.findIndex(b=>b.id===n))),s(!i)},onKeyDown:b=>{["ArrowDown","ArrowUp"].includes(b.key)&&(b.preventDefault(),l(Math.max(0,t.findIndex(x=>x.id===n))),s(!0))},children:[p?.name||n||"\u8BF7\u9009\u62E9",(0,a.jsx)("span",{"aria-hidden":"true",children:"\u2304"})]}),i&&(0,a.jsx)(J.MenuSurface,{ref:m,id:f,className:h.conversationOptions,role:"listbox","aria-labelledby":f+"-label",onKeyDown:b=>{b.key==="Escape"?(b.preventDefault(),b.stopPropagation(),y()):["ArrowDown","ArrowUp","Home","End"].includes(b.key)&&(b.preventDefault(),l(x=>b.key==="Home"?0:b.key==="End"?t.length-1:(x+(b.key==="ArrowDown"?1:-1)+t.length)%t.length))},children:t.map((b,x)=>(0,a.jsxs)("button",{type:"button",role:"option","aria-selected":n===b.id,tabIndex:x===c?0:-1,"data-option-index":x,onClick:()=>v(b),children:[b.name,n===b.id&&(0,a.jsx)("span",{"aria-hidden":"true",children:" \u2713"})]},b.id))})]})}function Lh({state:e,sessionId:n,run:t,markSettingsEdited:o,discardSettingsDraft:r,t:i}){let s=e.settingsFor===n?e.settings:null,c=s?.voicePrompt,l=c?.text??"",[u,d]=(0,D.useState)(l),[m,f]=(0,D.useState)(!1),[p,y]=(0,D.useState)(""),v=(0,D.useRef)(!1),b=(0,D.useRef)(!0),x=(0,D.useRef)(l),z=(0,D.useId)();(0,D.useEffect)(()=>(b.current=!0,()=>{b.current=!1}),[]),(0,D.useEffect)(()=>{if(x.current!==l){let C=x.current;d(R=>R===C?l:R),x.current=l}},[l]);let M=u.trim()?u:"",$=M!==(l.trim()?l:""),j=e.status,W=e.checkedFor===n&&!e.uncertain&&j?.enabled===!1&&j?.ownerSessionId===null&&j?.voiceControlBusy===!1&&j?.voiceSession?.fullyStopped===!0&&j?.voiceSession?.id===null,U=!s||!W||e.busy||e.settingsConflict||e.visibilityUncertain||m,E=!!M&&c?.customSupported!==!0,S=u.length<=32768&&!E,k=async()=>{if(U||v.current||!$||!S)return;v.current=!0,f(!0),y("");let C=!1;try{C=await t(n,"save-voice-prompt",{revision:s.revision,values:{text:M}})}catch{C=!1}finally{v.current=!1,b.current&&(f(!1),y(i(C?"voicePromptSaved":"voicePromptSaveFailed")))}};return(0,a.jsxs)("section",{className:`${h.section} ${h.voicePrompt}`,"data-voice-prompt":!0,"data-settings-draft":"save-voice-prompt",children:[(0,a.jsxs)("label",{htmlFor:z,children:[i("voicePromptLabel")," ",(0,a.jsx)("span",{className:h.hint,children:i("voicePromptOptional")})]}),(0,a.jsx)("textarea",{id:z,className:h.voicePromptInput,value:u,maxLength:32768,disabled:U,placeholder:i("voicePromptPlaceholder"),"aria-describedby":z+"-count "+z+"-feedback",onChange:C=>{o?.("save-voice-prompt"),d(C.target.value),y("")}}),(0,a.jsxs)("div",{id:z+"-count",className:h.voicePromptCount,children:[u.length.toLocaleString("en-US")," / 32,768"]}),(0,a.jsxs)("div",{className:h.voicePromptActions,children:[(0,a.jsxs)("div",{className:h.actions,children:[(0,a.jsx)(J.Button,{variant:"primary",disabled:U||!$||!S,onClick:()=>{k()},children:i(m?"voicePromptSaving":"voicePromptSave")}),(0,a.jsx)(J.Button,{variant:"outline",disabled:U||u===l,onClick:()=>{d(l),y(""),r?.("save-voice-prompt")},children:i("voicePromptCancel")})]}),(0,a.jsx)("span",{className:h.hint,children:i("voicePromptStopToEdit")})]}),(0,a.jsx)("p",{id:z+"-feedback",role:"status",className:h.hint,children:p||(u.length>32768?i("voicePromptTooLong"):c?.customSupported===!1||E?i("voicePromptUnsupported"):$?i("voicePromptUnsaved"):"")})]})}var Gy=Object.freeze({version:1,available:!1,reason:"planned"}),Et=["audio","interaction","prompt","models","advanced","sessions","pets"],qh={audio:"\u9009\u62E9\u9EA6\u514B\u98CE\u3001\u8BF4\u8BDD\u65B9\u5F0F\u4E0E\u63D0\u793A\u97F3\u3002",interaction:"\u8BBE\u7F6E\u6309\u952E\u3001\u56DE\u7B54\u901F\u5EA6\u4E0E\u754C\u9762\u52A8\u753B\u3002",prompt:"\u8BBE\u7F6E\u8BED\u97F3\u5BF9\u8BDD\u7684\u8868\u8FBE\u65B9\u5F0F\u3002",models:"\u9009\u62E9\u6717\u8BFB\u65B9\u5F0F\uFF0C\u6216\u7BA1\u7406\u672C\u5730\u6A21\u578B\u3002",advanced:"\u67E5\u770B\u6743\u9650\u3001\u8BF7\u6C42\u4E0E\u8FD0\u884C\u8BE6\u60C5\u3002",sessions:"\u9009\u62E9\u8BED\u97F3\u5BF9\u8BDD\u76EE\u6807\uFF0C\u67E5\u770B\u9C7C\u5E94\u4F1A\u8BDD\u548C\u5B50\u4EE3\u7406\u3002",pets:"\u684C\u5BA0\u529F\u80FD\u5C1A\u672A\u5F00\u653E\u3002"};function Hh(e){let{t:n,sessionId:t}=e,o=e.useWhaleUi(E=>E),r=e.useWhalePreferences(E=>E),i=o.settingsTab||"audio",s=o.settingsModelTab||"conversation",[c,l]=(0,D.useState)(()=>new Set([o.settingsTab||"audio"])),[u,d]=(0,D.useState)(()=>new Set([o.settingsModelTab||"conversation"])),[m,f]=(0,D.useState)(0),p=(0,D.useRef)(null),y=(0,D.useRef)(null),v=(0,D.useRef)(0),b=(0,D.useRef)(new Set),x=(0,D.useRef)(o.readRefresh),z=(0,D.useId)();(0,D.useLayoutEffect)(()=>{p.current&&(p.current.scrollTop=0)},[i,s]),(0,D.useEffect)(()=>{e.setSession?.(t)},[t]),(0,D.useEffect)(()=>()=>{v.current++,e.cancelPreview?.(),e.discardDiagnostics?.()},[]),(0,D.useEffect)(()=>{b.current.clear()},[t,i,s]),(0,D.useEffect)(()=>{i==="models"&&e.refreshModelCompute?.(t)},[t,i,s]),(0,D.useEffect)(()=>{if(o.busy||o.ttsCancelling||["pets","sessions"].includes(i))return;let E=e.readState?.();if(E?.busy||E?.ttsCancelling)return;if(x.current!==o.readRefresh){x.current=o.readRefresh;for(let R of["read-output-volume","model-installer","agent-requests"])b.current.delete(R)}let C=[...!o.settings||o.settingsFor!==t?["read-settings"]:[],...!o.status||o.checkedFor!==t||i==="advanced"?["status"]:[],...i==="audio"?["read-output-volume"]:[],...i==="models"&&s==="conversation"?["conversation-models"]:[],...t&&i==="advanced"?["agent-requests"]:[],...t&&i==="interaction"&&o.performanceFor!==t?["inspect-performance"]:[],...i==="models"&&s==="voice"&&(!o.ttsCapabilities||o.ttsCapabilitiesFor!==t)?["inspect-tts"]:[],...i==="models"?["model-installer"]:[]].find(R=>!b.current.has(R));C&&(b.current.add(C),e.run(t,C,{},!0))},[t,i,s,o.readRefresh,o.busy,o.ttsCancelling,o.settingsFor,o.checkedFor,o.outputVolumeFor,o.agentRequestsFor,o.performanceFor,o.ttsCapabilitiesFor,o.installerFor]);let M=async(E,S=!1)=>{let k=++v.current;e.cancelPreview&&!await e.cancelPreview()||(e.discardDiagnostics?.(),k===v.current&&(l(C=>new Set([...C,E])),e.setSettingsTab(E),S&&y.current?.querySelector(`[data-settings-tab="${E}"]`)?.focus({preventScroll:!0})))},$=async E=>{let S=++v.current;e.cancelPreview&&!await e.cancelPreview()||(e.discardDiagnostics?.(),S===v.current&&(d(k=>new Set([...k,E])),e.setSettingsModelTab(E)))},j=o.settingsFor===t?o.settings:null,W=!o.uncertain&&o.checkedFor===t,U=j&&(0,a.jsx)($h,{settings:j,sessionId:t,busy:o.busy||o.visibilityUncertain||o.settingsConflict,run:e.run,t:n,status:o.status,statusFresh:W,verified:W&&!!o.status,tab:i,markSettingsEdited:e.markSettingsEdited,discardSettingsDraft:e.discardSettingsDraft,bindingError:o.bindingError,captureBindings:e.captureBindings},t+":"+(o.settingsKey??j.revision));return(0,a.jsxs)("div",{className:h.settings,"data-whale-settings":!0,"data-motion":r.motion,children:[(0,a.jsxs)("header",{className:h.settingsHeader,"data-settings-header":!0,children:[(0,a.jsxs)(J.Button,{className:h.backButton,"data-whale-operation":"page-home",onClick:e.showHome,"aria-label":"\u8FD4\u56DE\u8BED\u97F3",children:[(0,a.jsx)(qe,{name:"chevron",className:h.backIcon}),(0,a.jsx)("span",{children:"\u8FD4\u56DE\u8BED\u97F3"})]}),(0,a.jsxs)("div",{className:h.settingsBrand,children:[(0,a.jsx)(Xn,{small:!0}),(0,a.jsx)("h2",{children:n("settingsTitle")})]}),(0,a.jsx)(J.Button,{className:h.guideButton,"data-whale-operation":"page-setup",onClick:e.openSetup,"aria-label":"\u91CD\u65B0\u6253\u5F00\u914D\u7F6E\u5F15\u5BFC",title:"\u91CD\u65B0\u6253\u5F00\u914D\u7F6E\u5F15\u5BFC",children:"\u914D\u7F6E\u5F15\u5BFC"})]}),(0,a.jsxs)("div",{className:h.settingsLayout,children:[(0,a.jsx)("nav",{ref:y,className:h.settingsNav,"data-settings-nav":!0,"aria-label":n("settingsSections"),onKeyDown:E=>{let S=Et.indexOf(E.target.dataset.settingsTab);if(S<0||!["ArrowDown","ArrowUp","ArrowLeft","ArrowRight","Home","End"].includes(E.key))return;E.preventDefault();let k=E.key==="Home"?0:E.key==="End"?Et.length-1:(S+(["ArrowDown","ArrowRight"].includes(E.key)?1:-1)+Et.length)%Et.length;M(Et[k],!0)},children:Et.map(E=>(0,a.jsx)(J.Button,{"data-settings-tab":E,"aria-pressed":i===E,"aria-controls":z+"-body",onClick:()=>{M(E)},children:n("tab_"+E)},E))}),(0,a.jsxs)("div",{className:h.settingsPage,children:[(0,a.jsxs)("div",{className:`${h.pageHeading} ${i==="models"?h.modelHeading:""}`,"data-settings-page-heading":!0,"data-no-drag":!0,children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{id:z,children:n("tab_"+i)}),i!=="models"&&(0,a.jsx)("p",{children:qh[i]})]}),i==="prompt"&&j&&(0,a.jsx)("span",{className:h.voicePromptMode,"data-voice-prompt-mode":!0,children:n(j.voicePrompt?.mode==="custom"&&j.voicePrompt?.customSupported===!0?"voicePromptCustom":"voicePromptAgents")}),i==="models"&&(0,a.jsx)("nav",{className:h.modelNav,"aria-label":"\u6A21\u578B\u8BBE\u7F6E\u5206\u7C7B","data-no-drag":!0,children:[["conversation","\u5BF9\u8BDD\u6A21\u578B"],["voice","\u6717\u8BFB\u65B9\u5F0F"],["download","\u6A21\u578B\u4E0B\u8F7D"],["paths","\u9AD8\u7EA7\u8DEF\u5F84"]].map(([E,S])=>(0,a.jsx)(J.Button,{"aria-pressed":s===E,onClick:()=>{$(E)},children:S},E))})]}),(0,a.jsxs)("div",{ref:p,id:z+"-body",className:h.settingsBody,"data-settings-body":!0,"data-no-drag":!0,onChangeCapture:E=>{let S=E.target.closest("[data-settings-draft]");S&&!E.target.closest("[data-no-settings-draft]")&&e.markSettingsEdited?.(S.dataset.settingsDraft)},tabIndex:0,"aria-label":n("settingsContent"),children:[i==="sessions"?(0,a.jsxs)(a.Fragment,{children:[e.listExistingVoiceSessions&&!o.sessionManagementRoot&&(0,a.jsx)(Wi,{...e,state:o}),(0,a.jsx)(Gh,{...e,state:o})]}):i==="pets"?(0,a.jsxs)("section",{className:h.placeholder,"data-whale-pet":!0,"aria-label":n("tab_pets"),children:[(0,a.jsx)(qe,{name:"pet"}),(0,a.jsx)("h3",{children:n("tab_pets")}),(0,a.jsx)("p",{children:n("planned")})]}):(0,a.jsxs)(a.Fragment,{children:[o.error&&(0,a.jsx)("div",{role:"alert",className:h.error,children:n("operationUnavailable")}),o.settingsConflict&&(0,a.jsxs)("p",{role:"status",className:h.notice,children:["\u8BBE\u7F6E\u5DF2\u5728\u522B\u5904\u66F4\u65B0\uFF0C\u5F53\u524D\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002",(0,a.jsx)(J.Button,{variant:"outline",disabled:o.busy,onClick:()=>e.discardSettingsDraft?.(),children:"\u653E\u5F03\u8349\u7A3F\u5E76\u4F7F\u7528\u6700\u65B0\u8BBE\u7F6E"})]}),o.visibilityUncertain&&(0,a.jsx)("p",{role:"status",className:h.notice,children:n("configurationUnknown")}),!j&&(0,a.jsx)("p",{role:"status",className:h.hint,children:o.busy?"\u6B63\u5728\u8BFB\u53D6\u8BBE\u7F6E\u2026":"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u8BBE\u7F6E\u3002\u8FD4\u56DE\u7A97\u53E3\u65F6\u4F1A\u81EA\u52A8\u6838\u67E5\u3002"}),i!=="interaction"&&W&&!(i==="models"&&s==="download")&&(o.status?.enabled||o.status?.ownerSessionId)&&(0,a.jsxs)("div",{className:h.editNotice,role:"status",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("strong",{children:"\u8BED\u97F3\u6B63\u5728\u4F7F\u7528"}),(0,a.jsx)("span",{children:" \xB7 \u505C\u6B62\u540E\u53EF\u4FEE\u6539\u76F8\u5173\u8BBE\u7F6E"})]}),(0,a.jsx)(J.Button,{variant:"outline",disabled:o.busy&&(!o.interruptibleRead||o.diagnosticStopPending)||o.ttsCancelling,onClick:()=>{e.run(t,"disable")},children:"\u505C\u6B62\u8BED\u97F3\u4EE5\u7F16\u8F91"})]})]}),(0,a.jsx)("div",{hidden:!["audio","interaction","advanced"].includes(i),children:U}),(i==="audio"||c.has("audio"))&&(0,a.jsx)("div",{hidden:i!=="audio",children:(0,a.jsx)(Bh,{...e,state:o})}),(i==="interaction"||c.has("interaction"))&&(0,a.jsxs)("div",{hidden:i!=="interaction",children:[j&&(0,a.jsx)(Mh,{...e,state:o},"performance:"+t+":"+(o.settingsKey??j.revision)),(0,a.jsxs)("section",{className:h.section,children:[(0,a.jsx)("h3",{children:n("motionTitle")}),(0,a.jsx)("div",{className:h.segmented,children:["spring","firm","off"].map(E=>(0,a.jsx)(J.Button,{"aria-pressed":r.motion===E,onClick:()=>{e.setMotion(E),f(m+1)},children:n("motion_"+E)},E))}),(0,a.jsx)("div",{className:h.motionPreview,"aria-hidden":"true",children:(0,a.jsx)(Xn,{small:!0})},m),(0,a.jsx)("p",{className:h.hint,children:n("motionHint")}),r.error&&(0,a.jsx)("p",{role:"status",children:n("motionNotSaved")})]})]}),(i==="prompt"||c.has("prompt"))&&j&&(0,a.jsx)("div",{hidden:i!=="prompt",children:(0,a.jsx)(Lh,{...e,state:o},"prompt:"+t+":"+(o.settingsKey??j.revision))}),(i==="models"||c.has("models"))&&(0,a.jsxs)("div",{hidden:i!=="models",children:[j&&(s==="conversation"||u.has("conversation"))&&(0,a.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="conversation",children:(0,a.jsx)(Zh,{...e,state:o},"conversation:"+t+":"+(o.settingsKey??j.revision))}),(s==="voice"||u.has("voice"))&&(0,a.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="voice",children:(0,a.jsx)(Ud,{pickPath:e.pickPath,state:o,sessionId:t,run:e.run,markSettingsEdited:e.markSettingsEdited,prepared:!0,active:i==="models"&&s==="voice"})}),(s==="download"||u.has("download"))&&(0,a.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="download",children:(0,a.jsx)(jd,{state:o,sessionId:t,run:e.run})}),j?.modelSetup&&(0,a.jsx)(Oh,{modelTab:s,markSettingsEdited:e.markSettingsEdited,pickPath:e.pickPath,senseVoiceAsrAction:e.senseVoiceAsrAction,active:i==="models",settings:j,sessionId:t,busy:o.busy||o.visibilityUncertain||o.settingsConflict,run:e.run,t:n},t+":"+(o.settingsKey??j.revision)),(s==="paths"||u.has("paths"))&&(0,a.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="paths",children:(0,a.jsx)(Nd,{state:o,sessionId:t,run:e.run,pickPath:e.pickPath,active:i==="models"&&s==="paths"})})]}),(i==="advanced"||c.has("advanced"))&&(0,a.jsxs)("div",{hidden:i!=="advanced",children:[e.updateAction&&(0,a.jsx)(md,{state:o,open:e.openUpdate,t:n}),(0,a.jsxs)("section",{className:h.section,"aria-label":n("projectInfoTitle"),children:[(0,a.jsx)("h3",{children:n("projectInfoTitle")}),(0,a.jsxs)("dl",{className:h.details,children:[(0,a.jsx)("dt",{children:n("projectAuthor")}),(0,a.jsx)("dd",{children:(0,a.jsx)("a",{href:Ii.url,target:"_blank",rel:"noreferrer noopener",children:Ii.name})}),(0,a.jsx)("dt",{children:n("projectRepository")}),(0,a.jsx)("dd",{children:(0,a.jsxs)("a",{href:dd,target:"_blank",rel:"noreferrer noopener",children:["Emikosama/",cr]})}),(0,a.jsx)("dt",{children:n("projectNpm")}),(0,a.jsx)("dd",{children:(0,a.jsx)("a",{href:`https://www.npmjs.com/package/${cr}`,target:"_blank",rel:"noreferrer noopener",children:cr})})]})]}),(0,a.jsx)(Kh,{...e,state:o,active:i==="advanced"}),(0,a.jsx)(vd,{readOperationLog:e.readOperationLog}),(0,a.jsx)(Jh,{state:o,sessionId:t,t:n}),(0,a.jsxs)("details",{className:h.section,children:[(0,a.jsx)("summary",{children:"\u5BF9\u8BDD\u663E\u793A\u4E0E\u517C\u5BB9\u6027"}),j?.voiceSession&&(0,a.jsx)(Rh,{settings:j,state:o,sessionId:t,run:e.run,t:n},"visibility:"+t+":"+(o.settingsKey??j.revision))]})]})]})]})]})]})}var Vh=new Intl.DateTimeFormat("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"});function Gh({manageSessions:e,openManagedSession:n,renameManagedSession:t,setSessionManagement:o,state:r}){let i=r.sessionManagementRoot??null,[s,c]=(0,D.useState)(null),[l,u]=(0,D.useState)(null),[d,m]=(0,D.useState)(!1),[f,p]=(0,D.useState)(null),[y,v]=(0,D.useState)(null),b=(0,D.useRef)(null),x=(0,D.useCallback)(async(R,{append:P=!1}={})=>{if(!e)return;b.current?.abort();let N=new AbortController;b.current=N,m(!0),p(null);try{R.operation!=="list"&&(await e(R,N.signal),N.signal.aborted||p(R.operation==="restore"?"\u5DF2\u53D6\u6D88\u5F52\u6863\u3002\u53EF\u6253\u5F00\u539F\u4F1A\u8BDD\u7EE7\u7EED\u3002":"\u5DF2\u516C\u5F00\u6B64\u4F1A\u8BDD\u3002"));let I=await e(R.operation==="list"?R:{operation:"list",...i?{rootId:i}:{}},N.signal);if(N.signal.aborted||b.current!==N)return;c(H=>P&&H?{...I,items:[...new Map([...H.items,...I.items].map(Z=>[Z.id,Z])).values()]}:I)}catch(I){N.signal.aborted||p(String(I?.message??"\u65E0\u6CD5\u8BFB\u53D6\u9C7C\u5E94\u4F1A\u8BDD").slice(0,400))}finally{b.current===N&&(b.current=null,m(!1))}},[i,e]);(0,D.useEffect)(()=>(x({operation:"list",...i?{rootId:i}:{}}),()=>{let R=b.current;b.current=null,R?.abort()}),[x,i]);let z=R=>{c(null),u(null),v(null),o({rootId:R,historyOpen:!1})},M=(R,P)=>{v(null),u({operation:R,id:P.id,rootId:P.rootId})},$=async R=>{try{await n(R)}catch(P){p(String(P?.message??"\u65E0\u6CD5\u5728 DSH \u6253\u5F00\u4F1A\u8BDD").slice(0,400))}},j=async R=>{R.preventDefault();let P=y.title.trim();if(!(!P||d)){m(!0),p(null);try{let N=await t(y.id,P);c(I=>I&&{...I,items:I.items.map(H=>H.id===y.id?{...H,title:N}:H)}),v(null),p("\u5DF2\u4FDD\u5B58\u4F1A\u8BDD\u540D\u79F0\u3002")}catch(N){p(String(N?.message??"\u65E0\u6CD5\u91CD\u547D\u540D\u4F1A\u8BDD").slice(0,400))}finally{m(!1)}}},W=i?s?.items?.find(R=>R.id===i):null,U={restore_unavailable:"\u6062\u590D\u63A5\u53E3\u4E0D\u53EF\u7528",archive_state_unavailable:"\u65E0\u6CD5\u8BFB\u53D6\u5F52\u6863\u72B6\u6001",persistence_unavailable:"\u4F1A\u8BDD\u5B58\u50A8\u6682\u65F6\u4E0D\u53EF\u7528",policy_mismatch:"\u5F53\u524D\u4F1A\u8BDD\u6743\u9650\u4E0E\u539F\u4F1A\u8BDD\u4E0D\u540C",presentation_mismatch:"\u5F53\u524D DSH \u65E0\u6CD5\u786E\u8BA4\u4F1A\u8BDD\u7684\u9690\u85CF\u72B6\u6001",visibility_mismatch:"\u5F53\u524D\u663E\u793A\u8BBE\u7F6E\u4E0E\u539F\u4F1A\u8BDD\u4E0D\u540C"},E=R=>(0,a.jsx)("ul",{className:h.permissionList,children:R.map(P=>(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{className:h.sessionTitle,children:P.title||(P.kind==="root"?"\u672A\u547D\u540D\u4F1A\u8BDD":"\u672A\u547D\u540D\u5B50\u4EE3\u7406")+" \xB7 "+P.id.slice(-6).toUpperCase()}),(0,a.jsxs)("p",{className:h.hint,children:[P.archived?"\u5DF2\u5F52\u6863":P.visibility==="hidden"?"\u5DF2\u9690\u85CF":P.visibility==="visible"||P.visibility==="workspace"?"\u53EF\u89C1":"\u53EF\u89C1\u6027\u672A\u77E5",U[P.reason]?" \xB7 "+U[P.reason]:""]}),Number.isFinite(P.createdAt)&&(0,a.jsxs)("p",{className:h.hint,children:["\u521B\u5EFA\u4E8E ",(0,a.jsx)("time",{dateTime:new Date(P.createdAt).toISOString(),children:Vh.format(P.createdAt)})]}),(0,a.jsxs)("div",{className:h.actions,children:[P.kind==="root"&&!i&&(0,a.jsx)(J.Button,{variant:"outline",disabled:d,"data-whale-operation":"show-subagents",onClick:()=>z(P.id),children:"\u67E5\u770B\u5B50\u4EE3\u7406"}),n&&["live","available"].includes(P.status)&&(0,a.jsx)(J.Button,{variant:"outline","data-whale-operation":P.kind==="root"?"open-native-session":"open-native-subagent",onClick:()=>$(P),children:"\u5728 DSH \u6253\u5F00"}),t&&P.kind==="root"&&["live","available","archived"].includes(P.status)&&(0,a.jsx)(J.Button,{variant:"outline",disabled:d,onClick:()=>{u(null),v({id:P.id,title:P.title??""})},children:"\u91CD\u547D\u540D"}),P.canUnhide&&(0,a.jsx)(J.Button,{variant:"outline",disabled:d,onClick:()=>M("unhide",P),children:"\u53D6\u6D88\u9690\u85CF"}),P.canRestore&&(0,a.jsx)(J.Button,{variant:"outline",disabled:d,onClick:()=>M("restore",P),children:"\u6062\u590D\u5F52\u6863"})]}),l?.id===P.id&&(0,a.jsxs)("div",{className:h.actions,children:[(0,a.jsx)("span",{children:l.operation==="unhide"?"\u786E\u8BA4\u5728 DSH \u516C\u5F00\u6B64\u4F1A\u8BDD\uFF1F":"\u786E\u8BA4\u53D6\u6D88\u6B64\u4F1A\u8BDD\u7684\u5F52\u6863\uFF1F"}),(0,a.jsx)(J.Button,{variant:"primary",disabled:d,onClick:()=>{let N=l;u(null),x(N)},children:"\u786E\u8BA4"}),(0,a.jsx)(J.Button,{variant:"outline",onClick:()=>u(null),children:"\u53D6\u6D88"})]}),y?.id===P.id&&(0,a.jsxs)("form",{className:h.sessionRename,onSubmit:j,children:[(0,a.jsx)(J.Input,{"aria-label":"\u4F1A\u8BDD\u540D\u79F0",value:y.title,maxLength:128,disabled:d,onChange:N=>v({...y,title:N.target.value})}),(0,a.jsxs)("div",{className:h.actions,children:[(0,a.jsx)(J.Button,{type:"submit",variant:"primary",disabled:d||!y.title.trim(),children:"\u4FDD\u5B58\u540D\u79F0"}),(0,a.jsx)(J.Button,{type:"button",variant:"outline",disabled:d,onClick:()=>v(null),children:"\u53D6\u6D88"})]})]})]},P.id))}),S=(s?.items??[]).filter(R=>R.id!==i),k=S.filter(R=>R.active),C=S.filter(R=>!R.active).sort((R,P)=>(P.createdAt??-1)-(R.createdAt??-1));return(0,a.jsxs)("section",{className:h.section,"data-whale-session-management":!0,children:[i&&(0,a.jsx)(J.Button,{variant:"outline",disabled:d,"data-whale-operation":"show-main-sessions",onClick:()=>z(null),children:"\u8FD4\u56DE\u4E3B\u4F1A\u8BDD"}),d&&!s&&(0,a.jsx)("p",{role:"status",children:"\u6B63\u5728\u8BFB\u53D6\u9C7C\u5E94\u4F1A\u8BDD\u2026"}),f&&(0,a.jsx)("p",{role:"status",className:h.notice,children:f}),W&&E([W]),W?.childrenAvailable&&W?.childrenIncomplete&&(0,a.jsx)("p",{role:"status",children:"\u90E8\u5206\u5B50\u4EE3\u7406\u8BB0\u5F55\u6682\u65F6\u65E0\u6CD5\u6838\u9A8C\u3002\u5F53\u524D\u663E\u793A\u5DF2\u6838\u9A8C\u7684\u4F1A\u8BDD\u3002"}),W&&!W.childrenAvailable&&(0,a.jsx)("p",{role:"status",children:"\u5F53\u524D\u65E0\u6CD5\u8BFB\u53D6\u6B64\u4F1A\u8BDD\u7684\u5B50\u4EE3\u7406\u8BB0\u5F55\u3002"}),W?.childrenAvailable&&!W.childrenIncomplete&&!S.length&&(0,a.jsx)("p",{children:"\u6B64\u4F1A\u8BDD\u8FD8\u6CA1\u6709\u5B50\u4EE3\u7406\u3002"}),k.length>0&&E(k),s&&!i&&k.length===0&&(0,a.jsx)("p",{className:h.hint,children:"\u6682\u65E0\u6D3B\u8DC3\u4F1A\u8BDD\u3002"}),(C.length>0||s?.nextCursor)&&(0,a.jsxs)("details",{className:h.section,"data-whale-session-history":!0,open:r.sessionHistoryOpen===!0,onToggle:R=>{let{open:P}=R.currentTarget;P!==!!r.sessionHistoryOpen&&o({historyOpen:P})},children:[(0,a.jsx)("summary",{"data-whale-operation":i?"subagent-history":"session-history",children:i?"\u5386\u53F2\u5B50\u4EE3\u7406":"\u5386\u53F2\u4F1A\u8BDD"}),E(C),!!s?.nextCursor&&(0,a.jsx)(J.Button,{disabled:d,onClick:()=>{x({operation:"list",cursor:s.nextCursor},{append:!0})},children:"\u52A0\u8F7D\u66F4\u591A"})]}),(0,a.jsx)(J.Button,{variant:"outline",disabled:d,onClick:()=>{x({operation:"list",...i?{rootId:i}:{}})},children:"\u5237\u65B0\u4F1A\u8BDD"}),s?.capabilities?.unhide?.supported===!1&&(0,a.jsx)("p",{className:h.hint,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u65F6\u65E0\u6CD5\u628A\u5B50\u4EE3\u7406\u52A0\u5165\u4FA7\u8FB9\u680F\u3002"}),s?.capabilities?.restore?.supported===!1&&(0,a.jsx)("p",{className:h.hint,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u65F6\u65E0\u6CD5\u901A\u8FC7\u9C7C\u5E94\u53D6\u6D88\u5F52\u6863\u3002"})]})}function Jh({state:e,sessionId:n,t}){let o=e.status,r=o?.ownerSessionId,s=!e.uncertain&&e.checkedFor===n&&typeof o?.helper?.lastError=="string"?o.helper.lastError:null,c=e.error??e.enableError;return(0,a.jsxs)("details",{className:h.section,children:[(0,a.jsx)("summary",{children:t("details")}),(0,a.jsxs)("dl",{className:h.details,children:[(0,a.jsx)("dt",{children:t("source")}),(0,a.jsx)("dd",{"data-whale-owner":!0,"data-session-id":r??"",children:r||t("none")}),(0,a.jsx)("dt",{children:t("actor")}),(0,a.jsx)("dd",{"data-whale-actor":!0,"data-session-id":n??"",children:n||t("openSession")})]}),(0,a.jsx)("p",{className:h.hint,children:t("snapshot")}),c&&(0,a.jsx)("pre",{className:h.requestDetails,children:c}),s&&(0,a.jsxs)("div",{"data-whale-helper-error":!0,children:[(0,a.jsx)("strong",{children:t("inputDiagnosticTitle")}),(0,a.jsx)("pre",{className:h.requestDetails,children:s}),(0,a.jsx)("p",{className:h.hint,children:t("inputDiagnosticHistory")})]}),(0,a.jsx)("p",{className:h.hint,children:t("consequence")}),(0,a.jsx)("p",{className:h.hint,children:o?.helper?.online?t("helperOnline"):t("helperOffline")}),o?.turnSignals?.outputStartObservation?.status==="unsupported"&&(0,a.jsx)("p",{className:h.hint,children:t("outputObservationUnavailable")})]})}function Kh({state:e,sessionId:n,run:t,openAuthorization:o,active:r=!0}){let i=(0,D.useRef)(null),s=(0,D.useRef)(0);(0,D.useEffect)(()=>{i.current=null,s.current++},[r,n]),(0,D.useEffect)(()=>{if(!r||!n||e.busy||e.agentRequestsFor===n||i.current===n)return;i.current=n;let l=s.current;s.current===l&&t(n,"agent-requests")},[r,n,e.busy]);let c=e.agentRequestsFor===n?e.agentRequests:null;return(0,a.jsxs)("section",{className:h.section,"data-whale-agent-requests":!0,children:[(0,a.jsx)("h3",{children:"Agent \u64CD\u4F5C\u8BB0\u5F55"}),(0,a.jsx)(J.Button,{"data-whale-operation":"page-authorization",onClick:()=>{o?.()},children:"\u6388\u6743\u8303\u56F4\u4E0E\u64A4\u9500"}),(e.agentPermissionUncertain||e.agentRequestUncertain)&&(0,a.jsx)("p",{role:"alert",className:h.notice,children:"\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u4F1A\u81EA\u52A8\u6838\u67E5\u5BF9\u5E94\u6743\u9650\u548C\u8BF7\u6C42\u72B6\u6001\uFF0C\u4E0D\u4F1A\u91CD\u590D\u6267\u884C\u3002"}),c?.items?.length===0&&(0,a.jsx)("p",{className:h.hint,children:"\u6CA1\u6709\u5F85\u5904\u7406\u8BF7\u6C42\u3002"}),c?.items?.map(l=>(0,a.jsxs)("section",{className:h.section,"data-agent-request":l.id,children:[(0,a.jsxs)("strong",{children:[l.title," \xB7 ",l.state]}),(0,a.jsxs)("p",{className:h.hint,children:["\u53D1\u8D77\u4F1A\u8BDD\uFF1A",l.sourceSessionId]}),(0,a.jsxs)("details",{children:[(0,a.jsx)("summary",{children:"\u6838\u5BF9\u5B8C\u6574\u53D8\u66F4\u8BA1\u5212"}),(0,a.jsx)("pre",{className:h.requestDetails,children:JSON.stringify({\u5F53\u524D\u8BBE\u7F6E:l.before,\u8BF7\u6C42:l.request,...l.installPlan?{\u4E0B\u8F7D\u8BA1\u5212:l.installPlan}:{},...l.modelApplyTarget?{\u6A21\u578B\u5E94\u7528\u76EE\u6807:l.modelApplyTarget}:{}},null,2)})]}),l.error&&(0,a.jsx)("p",{role:"alert",className:h.error,children:l.error.message}),l.state==="pending"&&(0,a.jsx)(J.Button,{variant:"outline",disabled:e.busy||e.agentRequestUncertain,onClick:()=>{t(n,"decide-agent-request",{id:l.id,approve:!1,acknowledgements:[]})},children:"\u53D6\u6D88\u9884\u89C8"}),l.nextAction&&(0,a.jsx)("p",{className:h.hint,children:l.nextAction})]},l.id))]})}var Bd={startConversation:"\u5F00\u59CB\u5BF9\u8BDD",endConversation:"\u7ED3\u675F\u5BF9\u8BDD",voiceTarget:"\u6295\u9012\u5230",dedicatedVoiceTarget:"\u9C7C\u5E94\u4E13\u7528\u4F1A\u8BDD",checkingVoiceTarget:"\u6B63\u5728\u6838\u5BF9\u76EE\u6807\u2026",voiceTargetChanged:"\u8BED\u97F3\u6295\u9012\u76EE\u6807\u6709\u53D8\u5316\u3002\u8BF7\u6838\u5BF9\u9996\u9875\u7684\u4F1A\u8BDD\u540E\u518D\u5F00\u59CB\u3002",chooseCurrentDshTarget:"\u4F7F\u7528\u5F53\u524D\u6253\u5F00\u4F1A\u8BDD",backToFishVoice:"\u56DE\u5230\u9C7C\u5E94",currentDshTargetError:"\u65E0\u6CD5\u786E\u8BA4\u5F53\u524D DSH \u5BF9\u8BDD\uFF0C\u8BF7\u6838\u5BF9\u540E\u91CD\u8BD5\u3002",chooseVoiceTarget:"\u9009\u62E9\u6295\u9012\u4F1A\u8BDD",searchVoiceTargets:"\u641C\u7D22\u4F1A\u8BDD\u6807\u9898\u6216 ID",searchVoiceTargetsAction:"\u641C\u7D22",existingVoiceTargetList:"\u5DF2\u6709 DSH \u4F1A\u8BDD",boundVoiceTarget:"\u5F53\u524D\u7ED1\u5B9A",voiceTargetAvailability_ready:"\u53EF\u7528",voiceTargetAvailability_busy:"\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F",voiceTargetAvailability_archived:"\u4F1A\u8BDD\u5DF2\u5F52\u6863",voiceTargetAvailability_unavailable:"\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528",voiceTargetAvailability_managed:"\u9C7C\u5E94\u7BA1\u7406\u7684\u4F1A\u8BDD\uFF0C\u65E0\u6CD5\u76F4\u63A5\u6295\u9012",voiceTargetAvailability_subagent:"\u5B50\u4EE3\u7406\u4F1A\u8BDD\uFF0C\u65E0\u6CD5\u76F4\u63A5\u6295\u9012",voiceTargetNoMatch:"\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684\u4F1A\u8BDD\u3002",voiceTargetEmptyList:"\u6682\u65E0\u53EF\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u3002",voiceTargetSynthesisNotice:"\u4F7F\u7528\u5728\u7EBF\u97F3\u8272\u65F6\uFF0C\u56DE\u7B54\u6587\u5B57\u4F1A\u4EA4\u7ED9\u5DF2\u6388\u6743\u7684\u8BED\u97F3\u5408\u6210\u670D\u52A1\u3002\u82E5\u8981\u79BB\u7EBF\u6717\u8BFB\uFF0C\u53EF\u5728\u300C\u6A21\u578B \u2192 \u6717\u8BFB\u65B9\u5F0F\u300D\u9009\u7528\u672C\u5730\u97F3\u8272\u3002",bindVoiceTarget:"\u7ED1\u5B9A\u9009\u4E2D\u4F1A\u8BDD",savingVoiceTarget:"\u6B63\u5728\u4FDD\u5B58\u2026",moreVoiceTargets:"\u52A0\u8F7D\u66F4\u591A",loadingVoiceTargets:"\u6B63\u5728\u8BFB\u53D6 DSH \u4F1A\u8BDD\u2026",voiceTargetListError:"\u65E0\u6CD5\u8BFB\u53D6 DSH \u4F1A\u8BDD\u3002",retryVoiceTargets:"\u91CD\u8BD5\u8BFB\u53D6",retryTranscripts:"\u5F85\u91CD\u53D1\u7684\u8BED\u97F3",retryTranscript:"\u91CD\u53D1",retryTranscriptBusy:"\u7B49\u5F85\u53EF\u53D1\u9001",retryTranscriptSending:"\u6B63\u5728\u91CD\u53D1\u2026",retryTranscriptUncertain:"\u53D1\u9001\u7ED3\u679C\u5F85\u786E\u8BA4\uFF0C\u8BF7\u67E5\u770B\u539F\u4F1A\u8BDD\u3002",endDiscardsRetries:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u6E05\u7A7A\u5F85\u53D1\u8F6C\u5199",modeSwitching:"\u6B63\u5728\u5207\u6362\u8BF4\u8BDD\u65B9\u5F0F\u2026",modeSaving:"\u6B63\u5728\u4FDD\u5B58\u8BF4\u8BDD\u65B9\u5F0F\u2026",modeSwitchUnconfirmed:"\u8BF4\u8BDD\u65B9\u5F0F\u66F4\u6539\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u6838\u67E5\u3002",modeSwitchFailed:"\u672A\u80FD\u786E\u8BA4\u66F4\u6539\uFF0C\u8BF7\u67E5\u770B\u5F53\u524D\u65B9\u5F0F\u540E\u518D\u8BD5\u3002",updateTitle:"\u9C7C\u5E94\u66F4\u65B0",updateOfferTitle:"\u9C7C\u5E94\u6709\u65B0\u7248\u672C",updateCurrentVersion:"\u5F53\u524D",updateNewVersion:"\u65B0\u7248",updateChannel_stable:"\u6B63\u5F0F\u7248",updateChannel_preview:"\u9884\u89C8\u7248",updateCheck:"\u68C0\u67E5\u66F4\u65B0",updateDetails:"\u67E5\u770B\u66F4\u65B0",updateLater:"\u7A0D\u540E",updateInstall:"\u4E00\u952E\u66F4\u65B0",updateRelease:"\u53D1\u5E03\u8BF4\u660E",updateFeedback:"\u53CD\u9988\u95EE\u9898",update_idle:"\u6B63\u5728\u8BFB\u53D6\u66F4\u65B0\u72B6\u6001\u2026",update_checking:"\u6B63\u5728\u68C0\u67E5\u66F4\u65B0\u2026",update_current:"\u5DF2\u662F\u6700\u65B0\u7248\u672C\u3002",update_available:"\u53EF\u4EE5\u66F4\u65B0\u3002",update_incompatible:"\u65B0\u7248\u4E0E\u5F53\u524D DSH \u73AF\u5883\u4E0D\u517C\u5BB9\u3002",update_installing:"\u6B63\u5728\u66F4\u65B0\uFF0C\u5BBF\u4E3B\u53EF\u80FD\u4F1A\u91CD\u65B0\u52A0\u8F7D\u9C7C\u5E94\u2026","update_restart-required":"\u66F4\u65B0\u5DF2\u5B89\u88C5\uFF0C\u91CD\u542F DSH \u540E\u751F\u6548\u3002","update_enable-required":"\u66F4\u65B0\u5DF2\u5B89\u88C5\uFF0C\u8BF7\u5728 DSH \u63D2\u4EF6\u7BA1\u7406\u4E2D\u542F\u7528\u9C7C\u5E94\u3002",update_installed:"\u66F4\u65B0\u5DF2\u5B8C\u6210\u3002",update_error:"\u66F4\u65B0\u51FA\u9519\uFF0C\u53EF\u68C0\u67E5\u66F4\u65B0\u540E\u91CD\u8BD5\u3002",update_unsupported:"\u5F53\u524D\u73AF\u5883\u65E0\u6CD5\u81EA\u52A8\u66F4\u65B0\uFF0C\u8BF7\u67E5\u770B\u5B98\u65B9\u53D1\u5E03\u8BF4\u660E\u3002",updateConnection:"\u6682\u65F6\u65E0\u6CD5\u786E\u8BA4\u66F4\u65B0\u72B6\u6001\uFF0C\u8BF7\u5728\u5BBF\u4E3B\u5C31\u7EEA\u540E\u91CD\u65B0\u68C0\u67E5\u3002",audioDevices:"\u97F3\u9891\u8BBE\u5907",audioSystemDefault:"\u7CFB\u7EDF\u9ED8\u8BA4",audioInput:"\u97F3\u9891\u8F93\u5165",audioOutput:"\u97F3\u9891\u8F93\u51FA",inputDeviceMissing:"\u9EA6\u514B\u98CE\u672A\u8FDE\u63A5\uFF0C\u5DF2\u4FDD\u7559\u9009\u62E9",outputDeviceMissing:"\u8F93\u51FA\u672A\u8FDE\u63A5\uFF0C\u4E0D\u4F1A\u5207\u5230\u5176\u4ED6\u8BBE\u5907",deviceDisconnected:"\u672A\u8FDE\u63A5",inputDeviceStopFirst:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5207\u6362\u8F93\u5165\u3002\u8F93\u51FA\u5728\u4E0B\u4E00\u6BB5\u64AD\u653E\u751F\u6548\u3002",outputDeviceUnsupported:"\u6B64\u73AF\u5883\u6682\u4E0D\u652F\u6301\u9009\u62E9\u6717\u8BFB\u8F93\u51FA\u8BBE\u5907\u3002",deviceListRetry:"\u8BBE\u5907\u5217\u8868\u6682\u4E0D\u53EF\u7528\uFF0C\u6253\u5F00\u4E0B\u62C9\u83DC\u5355\u53EF\u91CD\u8BD5\u3002",voiceHelperCleanupHint:"\u6B63\u5728\u786E\u8BA4\u9EA6\u514B\u98CE\u5DF2\u91CA\u653E\uFF0C\u786E\u8BA4\u524D\u4E0D\u4F1A\u5F00\u542F\u65B0\u7684\u5F55\u97F3\u3002",voiceHelperRestartHint:"\u9EA6\u514B\u98CE\u670D\u52A1\u9000\u51FA\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u91CD\u542F DSH \u540E\u518D\u70B9\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u3002",inputError_device:"\u9EA6\u514B\u98CE\u4E0D\u53EF\u7528",inputError_recognition:"\u8BED\u97F3\u8BC6\u522B\u5931\u8D25","inputError_no-speech":"\u6CA1\u542C\u6E05\uFF0C\u8BF7\u518D\u8BF4\u4E00\u6B21",inputHelp_device:"\u8BF7\u68C0\u67E5\u9EA6\u514B\u98CE\u8FDE\u63A5\u4E0E\u6743\u9650\u3002\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5728\u8BBE\u7F6E\u4E2D\u9009\u8BBE\u5907\u3002\u8BE6\u60C5\u89C1\u300C\u9AD8\u7EA7\u300D\u3002",inputDiagnosticTitle:"\u6700\u8FD1\u4E00\u6B21\u97F3\u9891\u9519\u8BEF",inputDiagnosticHistory:"\u8FD9\u662F\u6700\u8FD1\u4E00\u6B21\u8BB0\u5F55\uFF0C\u53EF\u80FD\u6765\u81EA\u4E4B\u524D\u7684\u5C1D\u8BD5\uFF1B\u4E0D\u4EE3\u8868\u5F53\u524D\u8BBE\u5907\u72B6\u6001\u3002",inputHelp_recognition:"\u8BF7\u91CD\u8BD5\u3002\u4ECD\u5931\u8D25\u65F6\uFF0C\u7ED3\u675F\u5BF9\u8BDD\u540E\u5728\u8BBE\u7F6E\u4E2D\u68C0\u67E5\u8BC6\u522B\u6A21\u578B\u3002","inputHelp_no-speech":"\u8BF7\u9760\u8FD1\u9EA6\u514B\u98CE\u91CD\u8BD5\uFF0C\u5E76\u68C0\u67E5\u662F\u5426\u9759\u97F3\u3002",speechFailed:"\u6717\u8BFB\u5931\u8D25",speechInterrupted:"\u6717\u8BFB\u5DF2\u4E2D\u65AD",wakeFallbackHint:"\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\u3002\u76EE\u524D\u6309\u8F6C\u5199\u5339\u914D\u3002\u5207\u6362\u6A21\u5F0F\u540E\u518D\u9009\u300C\u5524\u9192\u8BCD\u300D\u53EF\u91CD\u8BD5\u58F0\u97F3\u5339\u914D\u3002",wakeMode:"\u5524\u9192\u8BCD",switchToWake:"\u70B9\u6309\u5207\u5230\u5524\u9192\u8BCD\u6A21\u5F0F\uFF0C\u9EA6\u514B\u98CE\u5C06\u7B49\u5F85\u8BBE\u5B9A\u79F0\u547C",wakeDisabled:"\u5524\u9192\u76D1\u542C\u672A\u5F00\u542F",wakeStarting:"\u6B63\u5728\u542F\u52A8\u5524\u9192\u76D1\u542C\u2026",wakeWaiting:"\u7B49\u5F85\u5524\u9192\u8BCD",wakeListening:"\u6B63\u5728\u542C\u4E0B\u4E00\u53E5",wakePaused:"\u5524\u9192\u76D1\u542C\u5DF2\u6682\u505C",wakeError:"\u5524\u9192\u76D1\u542C\u4E0D\u53EF\u7528\uFF0C\u8BF7\u67E5\u770B\u8BBE\u7F6E",wakeHint:"\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\uFF0C\u518D\u8BF4\u6307\u4EE4\u3002\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u76D1\u542C\u3002",wakeMethod:"\u77ED\u53E5\u7ED3\u675F\u540E\u5728\u672C\u673A\u6BD4\u8F83\u79F0\u547C\u7684\u58F0\u97F3\u548C\u8F6C\u5199\u3002",wakeAliases:"\u5524\u9192\u79F0\u547C",wakeAliasesHint:"\u6700\u591A8\u4E2A\uFF0C\u9017\u53F7\u5206\u9694\uFF1B\u4E2D\u6587\u652F\u6301\u53E5\u9996\u8FD1\u97F3\uFF0C\u5EFA\u8BAE\u7528\u72EC\u7279\u76843\u5B57\u4EE5\u4E0A\u79F0\u547C\u3002",wakeTimeout:"\u5524\u9192\u540E\u7B49\u5F85\uFF08\u79D2\uFF09",wakeSettings:"\u5524\u9192\u8BCD\u8BBE\u7F6E",wakeStopToEdit:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u79F0\u547C\u548C\u7B49\u5F85\u65F6\u95F4\u3002",wakeInvalid:"\u8BF7\u586B1\u20138\u4E2A\u6709\u6548\u79F0\u547C\uFF0C\u7B49\u5F85\u65F6\u95F4\u4E3A3\u201330\u79D2\u3002",switchToPtt:"\u70B9\u6309\u5207\u56DE\u6309\u4F4F\u8BF4\u8BDD",switchToAlways:"\u70B9\u6309\u5207\u5230\u81EA\u7531\u9EA6\uFF0C\u9EA6\u514B\u98CE\u5C06\u6301\u7EED\u8046\u542C",quickSpeedStop:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5207\u6362\u901F\u5EA6",performanceReadFirst:"\u5148\u68C0\u67E5\u5F53\u524D\u6A21\u578B\u652F\u6301\u54EA\u4E9B\u901F\u5EA6\u3002",performanceUnavailable:"\u63D0\u4F9B\u5546\u5DF2\u660E\u786E\u62D2\u7EDD\u7070\u8272\u6863\u4F4D\u7684\u601D\u8003\u53C2\u6570\uFF1B\u5176\u4ED6\u6863\u4F4D\u4ECD\u53EF\u9009\u62E9\u3002",performanceProbeCost:"\u52A0\u8F7D\u65F6\u7528\u6700\u591A 3 \u4E2A\u56FA\u5B9A\u77ED\u8BF7\u6C42\u68C0\u6D4B\u6863\u4F4D\uFF0C\u6309\u6A21\u578B\u8BA1\u8D39\u3002",performanceProbeScope:"\u53EA\u6709\u63D0\u4F9B\u53EF\u68C0\u6D4B\u63A5\u53E3\u7684\u6A21\u578B\u8DEF\u7EBF\u4F1A\u53D1\u9001\u77ED\u8BF7\u6C42\uFF0C\u539F\u751F\u652F\u6301\u7684\u6863\u4F4D\u53EF\u76F4\u63A5\u67E5\u770B\u3002",performanceProbeUnknown:"\u90E8\u5206\u6863\u4F4D\u6682\u672A\u786E\u8BA4\u3002\u53EF\u68C0\u67E5\u7F51\u7EDC\u6216\u767B\u5F55\u540E\u91CD\u65B0\u68C0\u6D4B\u3002",performanceProbeAccepted:"\u6863\u4F4D\u8BF7\u6C42\u68C0\u6D4B\u901A\u8FC7\u3002",performanceProbePending:"\u6B63\u5728\u68C0\u67E5\u5F53\u524D\u6A21\u578B\u7684\u6863\u4F4D\u2026",holdToSpeak:"\u8BF4\u8BDD\u65F6\u6309\u4F4F",alwaysWarning:"\u81EA\u7531\u9EA6\u4F1A\u6301\u7EED\u542C\u53D6\u8BED\u97F3\u3002\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u76D1\u542C\u3002",bindingMissing:"\u672A\u7ED1\u5B9A\u8BF4\u8BDD\u6309\u952E\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u4E2D\u7ED1\u5B9A\uFF0C\u6216\u5207\u6362\u6301\u7EED\u8046\u542C\u3002",noSession:"\u8FD8\u6CA1\u6709\u6253\u5F00\u5BF9\u8BDD",otherWindow:"\u9EA6\u514B\u98CE\uFF1A\u53E6\u4E00\u4E2A\u7A97\u53E3",readingStatus:"\u6B63\u5728\u8BFB\u53D6\uFF0C\u4E0D\u4F1A\u542F\u52A8\u9EA6\u514B\u98CE\u6216\u6A21\u578B\u3002",statusRetry:"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u72B6\u6001\u3002\u8FD4\u56DE\u7A97\u53E3\u65F6\u4F1A\u81EA\u52A8\u6838\u67E5\u3002",retryStatus:"\u91CD\u65B0\u8BFB\u53D6\u72B6\u6001",collapseHint:"\u6536\u8D77\u540E\u4F1A\u7EE7\u7EED\u5BF9\u8BDD",stopConsequence:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u91CA\u653E\u9EA6\u514B\u98CE\u5E76\u505C\u6B62\u672C\u6B21\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u3002",transferTitle:"\u63A5\u7BA1\u53E6\u4E00\u4E2A\u7A97\u53E3\u7684\u9EA6\u514B\u98CE\uFF1F",transferWarning:"\u8FD9\u4F1A\u4E2D\u65AD\u53E6\u4E00\u4E2A\u7A97\u53E3\u7684\u8BED\u97F3\uFF0C\u5E76\u53EF\u80FD\u7ED3\u675F\u5B83\u7684\u540E\u53F0\u4EFB\u52A1\u3002",cancel:"\u53D6\u6D88",confirmTransfer:"\u786E\u8BA4\u63A5\u7BA1",bindingStopRequired:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u9F20\u6807\u6216\u952E\u76D8\u6309\u952E\u3002",bindingFinishing:"\u8BED\u97F3\u6B63\u5728\u505C\u6B62\uFF0C\u8BF7\u7A0D\u5019\u518D\u4FEE\u6539\u6309\u952E\u3002",headphonesRequired:"\u5148\u52FE\u9009\u201C\u6211\u5DF2\u4F7F\u7528\u8033\u673A\u201D\uFF0C\u624D\u80FD\u5F00\u542F\u81EA\u52A8\u6253\u65AD\u3002",deviceManualIndex:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u5E8F\u53F7",deviceManualName:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u540D\u79F0",deviceIndexInvalid:"\u8BBE\u5907\u5E8F\u53F7\u9700\u8981\u662F\u975E\u8D1F\u6574\u6570\u3002",deviceDefault:"\u4F7F\u7528\u7CFB\u7EDF\u9ED8\u8BA4\u9EA6\u514B\u98CE",deviceManual:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u540D\u79F0\u6216\u5E8F\u53F7",deviceSaved:"\u5DF2\u4FDD\u5B58\u7684\u8BBE\u5907",deviceEmpty:"\u97F3\u9891\u670D\u52A1\u6CA1\u6709\u627E\u5230\u9EA6\u514B\u98CE\u3002\u8BF7\u8FDE\u63A5\u8BBE\u5907\u5E76\u68C0\u67E5\u7CFB\u7EDF\u58F0\u97F3\u8BBE\u7F6E\u3002",deviceUnknown:"\u5F00\u59CB\u5BF9\u8BDD\u540E\u4F1A\u5217\u51FA\u68C0\u6D4B\u5230\u7684\u8BBE\u5907\u3002\u73B0\u5728\u53EF\u4F7F\u7528\u7CFB\u7EDF\u9ED8\u8BA4\uFF0C\u6216\u5728\u9AD8\u7EA7\u9009\u9879\u624B\u52A8\u586B\u5199\u3002",ttsBackend:"\u8BED\u97F3\u5408\u6210\u540E\u7AEF",ttsBackendHint:"\u58F0\u97F3\u7531\u5DF2\u5B89\u88C5\u7684 TTS \u540E\u7AEF\u63D0\u4F9B\uFF0C\u9700\u5728\u8BE5\u540E\u7AEF\u5B8C\u6210\u914D\u7F6E\u3002\u72EC\u7ACB\u97F3\u91CF\u4EC5\u5728\u9A8C\u8BC1\u652F\u6301\u65F6\u663E\u793A\u3002",ttsBackendPending:"\u66F4\u591A\u540E\u7AEF\u9009\u62E9\u6B63\u5728\u9002\u914D\uFF0C\u5F53\u524D\u4E0D\u4F1A\u81EA\u52A8\u63A5\u5165\u4E91\u670D\u52A1\u3002",voiceClone:"\u58F0\u97F3\u514B\u9686",voiceCloneAvailable:"Qwen \u652F\u6301\u672C\u5730\u53C2\u8003\u97F3\u8272\uFF0C\u53EF\u5728\u6717\u8BFB\u65B9\u5F0F\u7684\u97F3\u8272\u8BBE\u7F6E\u4E2D\u9009\u62E9 WAV\u3002",voiceClonePrivacy:"\u4EC5\u8BFB\u53D6\u4F60\u9009\u62E9\u4E14\u6709\u6743\u4F7F\u7528\u7684\u58F0\u97F3\u6837\u672C\uFF0C\u4E0D\u4E0A\u4F20\u3002",inputActive:"\u6B63\u5728\u63A5\u6536\u8BED\u97F3",modeUnknown:"\u542C\u53D6\u65B9\u5F0F\u672A\u77E5",voiceInputUnavailable:"\u5F55\u97F3\u6682\u4E0D\u53EF\u7528",voiceInputRecoveryHint:"\u8BED\u97F3\u670D\u52A1\u5DF2\u4E2D\u65AD\u3002\u8BF7\u7ED3\u675F\u5BF9\u8BDD\u540E\u91CD\u65B0\u5F00\u59CB\u3002",searchHistory:"\u641C\u7D22\u4F1A\u8BDD",searchScope:"\u641C\u7D22\u5DF2\u8F7D\u5165\u7684\u4F1A\u8BDD",noMatches:"\u6CA1\u6709\u5339\u914D\u7684\u4F1A\u8BDD",differentOwner:"\u9EA6\u514B\u98CE\u5728\u53E6\u4E00\u4E2A\u7A97\u53E3\u4F7F\u7528\u3002\u9700\u8981\u65F6\u53EF\u660E\u786E\u63A5\u7BA1\u3002",details:"\u8BCA\u65AD\u8BE6\u60C5",noReply:"\u8FD8\u6CA1\u6709\u5BF9\u8BDD",newChatCreated:"\u5DF2\u65B0\u5EFA\u4F1A\u8BDD",newChatActive:"\u65B0\u5EFA\u8BED\u97F3\u4F1A\u8BDD\u3002\u5F53\u524D\u4F1A\u8BDD\u7684\u540E\u53F0\u4EFB\u52A1\u4F1A\u505C\u6B62\uFF0C\u8BB0\u5F55\u4F1A\u4FDD\u7559\u3002",newChatOtherOwner:"\u8BF7\u5728\u5F53\u524D\u8BED\u97F3\u4F1A\u8BDD\u6216\u5F00\u542F\u9EA6\u514B\u98CE\u7684\u7A97\u53E3\u4E2D\u65B0\u5EFA\u3002",recentConversation:"\u5BF9\u8BDD",recentTenTurns:"\u6700\u8FD1 10 \u8F6E",allRecords:"\u5168\u90E8\u8BB0\u5F55",showAllRecords:"\u5C55\u5F00\u5168\u90E8",collapseToTen:"\u6536\u8D77\u81F3 10 \u8F6E",collapseConversation:"\u6536\u8D77\u5BF9\u8BDD",currentVoiceRecords:"\u5F53\u524D\u8BED\u97F3\u804A\u5929",historyTruncated:"\u5DF2\u5207\u6362\u663E\u793A\u533A\u95F4\uFF0C\u539F\u8BB0\u5F55\u4ECD\u4FDD\u7559",viewConversation:"\u67E5\u770B\u8BED\u97F3\u8BB0\u5F55",loadEarlier:"\u52A0\u8F7D\u66F4\u65E9\u8BB0\u5F55",readingHistory:"\u6B63\u5728\u8BFB\u53D6\u8BB0\u5F55\u2026",retryHistory:"\u8BFB\u53D6\u8BB0\u5F55\u5931\u8D25\uFF0C\u70B9\u51FB\u91CD\u8BD5",noConversation:"\u8FD8\u6CA1\u6709\u5BF9\u8BDD",newMessages:"\u6761\u65B0\u6D88\u606F",conversationMessages:"\u8BED\u97F3\u5BF9\u8BDD\u8BB0\u5F55",assistantName:"\u52A9\u624B\u79F0\u547C",renameAssistant:"\u70B9\u51FB\u6539\u540D\uFF0CEnter \u4FDD\u5B58\uFF0CEsc \u53D6\u6D88",compact_off:"\u672A\u5F00\u542F",compact_standby:"\u5F85\u673A",compact_listening:"\u8046\u542C\u4E2D",compact_pending:"\u5904\u7406\u4E2D",compact_unknown:"\u5F85\u68C0\u67E5",you:"\u4F60",assistant:"\u52A9\u624B",close:"\u5173\u95ED\u9762\u677F",keyboardBinding:"\u952E\u76D8\u6309\u4F4F\u8BF4\u8BDD",bindingOff:"\u672A\u7ED1\u5B9A",saveBindings:"\u4FDD\u5B58\u6309\u952E",discardBindings:"\u53D6\u6D88\u4FEE\u6539",bindingCapture:"\u6309\u4E0B\u8981\u7ED1\u5B9A\u7684\u952E\uFF08Esc \u53D6\u6D88\uFF09",clearBinding:"\u6E05\u9664\u7ED1\u5B9A",bindingUnsupported:"\u4E0D\u652F\u6301\u8BE5\u6309\u952E\u6216\u7CFB\u7EDF\u7EC4\u5408\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u3002",bindingGlobalHint:"Windows \u5168\u5C40\u5FEB\u6377\u952E\u3002\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5F55\u5165\uFF0C\u4FDD\u5B58\u540E\u4E0B\u6B21\u5F00\u59CB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002\u6309\u952E\u4E0D\u4F1A\u88AB\u62E6\u622A\uFF0C\u53EF\u80FD\u540C\u65F6\u89E6\u53D1\u5176\u4ED6\u5E94\u7528\u7684\u5FEB\u6377\u64CD\u4F5C\u3002",bindingUnavailable:"\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301\u5168\u5C40\u6309\u952E\u7ED1\u5B9A\u3002",bindingPrintableWarning:"\u5355\u72EC\u4F7F\u7528\u6587\u5B57\u3001\u6570\u5B57\u6216\u7A7A\u683C\u952E\u4F1A\u5728\u5176\u4ED6\u5E94\u7528\u8F93\u5165\u65F6\u89E6\u53D1\u6309\u952E\u8BF4\u8BDD\u3002",performanceTitle:"\u56DE\u7B54\u901F\u5EA6",performanceHint:"\u4E0B\u6B21\u5F00\u59CB\u9C7C\u5E94\u72EC\u7ACB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002\u7ED1\u5B9A\u539F\u4F1A\u8BDD\u65F6\uFF0C\u5728\u8BE5 DSH \u5BF9\u8BDD\u7684\u6A21\u578B\u83DC\u5355\u91CC\u8C03\u6574\u601D\u8003\u6863\u4F4D\u3002",inspectPerformance:"\u68C0\u67E5\u53EF\u7528\u901F\u5EA6",performance_fast:"\u5FEB",performanceNoThinking:"\u65E0\u601D\u8003",performanceRecommended:"[\u63A8\u8350]",performanceFastHint:"\u5FEB\u6863\u4F1A\u660E\u786E\u8BF7\u6C42\u5173\u95ED\u601D\u8003\u3002",performanceFastUnavailable:"\u5F53\u524D\u6A21\u578B\u8DEF\u7EBF\u65E0\u6CD5\u786E\u8BA4\u5173\u95ED\u601D\u8003\u3002\u53EF\u9009\u300C\u8DDF\u968F\u6A21\u578B\u300D\uFF0C\u6216\u5728\u6A21\u578B\u8BBE\u7F6E\u4E2D\u66F4\u6362\u652F\u6301\u65E0\u601D\u8003\u7684\u5BF9\u8BDD\u6A21\u578B\u3002",performanceHostUnavailable:"\u5F53\u524D\u6A21\u578B\u8DEF\u7EBF\u672A\u63D0\u4F9B\u90E8\u5206\u601D\u8003\u6863\u4F4D\u3002",performance_balanced:"\u6807\u51C6",performance_high:"\u4ED4\u7EC6",performance_compatibility:"\u8DDF\u968F\u6A21\u578B",performanceStopRequired:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u56DE\u7B54\u901F\u5EA6\u3002\u5F53\u524D\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u4F1A\u505C\u6B62\u3002",savePerformance:"\u4FDD\u5B58\u56DE\u7B54\u901F\u5EA6",outputVolume:"\u52A9\u624B\u8BED\u97F3\u97F3\u91CF",outputVolumeHint:"\u4EC5\u8C03\u6574\u5DF2\u5B89\u88C5\u7684 Windows dsh-speak \u540E\u7AEF\uFF0C\u4E0D\u4EE3\u8868\u5F53\u524D\u8BED\u97F3\u8DEF\u7531\u6B63\u5728\u4F7F\u7528\u5B83\uFF1B\u4E0D\u5F71\u54CD DSTuber\u3001\u7CFB\u7EDF\u603B\u97F3\u91CF\u6216\u63D0\u793A\u97F3\u3002\u4E0B\u4E00\u6BB5\u8F93\u51FA\u751F\u6548\u3002",readOutputVolume:"\u8BFB\u53D6\u8BED\u97F3\u97F3\u91CF",saveOutputVolume:"\u4FDD\u5B58\u8BED\u97F3\u97F3\u91CF",outputVolumeUnavailable:"\u5F53\u524D\u8BED\u97F3\u540E\u7AEF\u4E0D\u652F\u6301\u72EC\u7ACB\u97F3\u91CF\u8C03\u8282\u3002",outputVolumeUnknown:"\u97F3\u91CF\u4FDD\u5B58\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u4F1A\u81EA\u52A8\u6838\u67E5\uFF0C\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002",settingsTitle:"\u9C7C\u5E94\u8BBE\u7F6E",settingsSections:"\u8BBE\u7F6E\u5206\u7C7B",tab_audio:"\u97F3\u9891",tab_interaction:"\u4EA4\u4E92",tab_prompt:"\u63D0\u793A\u8BCD",voicePromptLabel:"\u81EA\u5B9A\u4E49\u63D0\u793A\u8BCD",voicePromptOptional:"\uFF08\u53EF\u9009\uFF09",voicePromptAgents:"\u8DDF\u968F AGENTS",voicePromptCustom:"\u5DF2\u9644\u52A0\u81EA\u5B9A\u4E49",voicePromptPlaceholder:`\u4F8B\u5982\uFF1A\u7528\u4E2D\u6587\u56DE\u590D\uFF0C\u5148\u8BF4\u7ED3\u8BBA\uFF0C\u8BED\u6C14\u81EA\u7136\u3002

\u5185\u5BB9\u4F1A\u9644\u52A0\u5728 AGENTS \u540E\u3002\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u8BBE\u7F6E\u3002`,voicePromptStopToEdit:"\u505C\u6B62\u8BED\u97F3\u540E\u53EF\u7F16\u8F91",voicePromptUnsupported:"\u5F53\u524D DSH \u6682\u4E0D\u652F\u6301\u81EA\u5B9A\u4E49\u63D0\u793A\u8BCD\u3002",voicePromptTooLong:"\u63D0\u793A\u8BCD\u4E0D\u80FD\u8D85\u8FC7 32,768 \u4E2A\u5B57\u7B26\u3002",voicePromptSaving:"\u4FDD\u5B58\u4E2D\u2026",voicePromptCancel:"\u53D6\u6D88\u4FEE\u6539",voicePromptSave:"\u4FDD\u5B58",voicePromptSaved:"\u5DF2\u4FDD\u5B58\uFF0C\u4E0B\u6B21\u5F00\u542F\u8BED\u97F3\u65F6\u751F\u6548\u3002",voicePromptSaveFailed:"\u4FDD\u5B58\u672A\u6210\u529F\uFF0C\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002",voicePromptUnsaved:"\u5C1A\u672A\u4FDD\u5B58",tab_models:"\u6A21\u578B",tab_advanced:"\u9AD8\u7EA7",projectInfoTitle:"\u5173\u4E8E\u9C7C\u5E94",projectAuthor:"\u4F5C\u8005",projectRepository:"\u5B98\u65B9\u4ED3\u5E93",projectNpm:"npm \u53D1\u5E03\u9875",tab_sessions:"\u4F1A\u8BDD\u7BA1\u7406",settingsContent:"\u8BBE\u7F6E\u5185\u5BB9",voiceCleanupPending:"\u6B63\u5728\u91CA\u653E\u65E7\u97F3\u9891\u670D\u52A1",voiceCleanupHint:"\u7B49\u5F85\u65E7\u4F1A\u8BDD\u548C\u5F55\u97F3\u9000\u51FA\uFF0C\u5B8C\u6210\u540E\u4F1A\u81EA\u52A8\u66F4\u65B0\u3002",voiceRestartPending:"\u9700\u8981\u91CD\u542F DSH",voiceRestartHint:"\u65E7\u7248\u97F3\u9891\u670D\u52A1\u7684\u9000\u51FA\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u91CD\u542F DSH \u540E\u518D\u70B9\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u3002\u5DF2\u4FDD\u5B58\u7684\u6388\u6743\u4E0D\u53D8\u3002",voiceRecoveryPending:"\u65E7\u8BED\u97F3\u4F1A\u8BDD\u5C1A\u672A\u9000\u51FA",voiceRecoveryCheck:"\u6838\u67E5\u5E76\u505C\u6B62",voiceRecoveryHint:"\u65E7\u5B9E\u4F8B\u4ECD\u5728\u9000\u51FA\uFF0C\u8BF7\u5148\u6838\u67E5\u505C\u6B62\u3002\u82E5\u4E00\u76F4\u672A\u9000\u51FA\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F DSH \u540E\u518D\u70B9\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u3002",operationUnavailable:"\u64CD\u4F5C\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\uFF1B\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002\u8BE6\u60C5\u89C1\u9AD8\u7EA7\u8BBE\u7F6E\u3002",enableFailed:"\u65E0\u6CD5\u5F00\u59CB\u5BF9\u8BDD\u3002\u8BF7\u5728\u8BBE\u7F6E\u7684\u300C\u9AD8\u7EA7\u300D\u67E5\u770B\u539F\u56E0\u540E\u91CD\u8BD5\u3002",tab_pets:"\u684C\u5BA0",planned:"\u8BA1\u5212\u5F00\u53D1\u4E2D",configurationUnknown:"\u914D\u7F6E\u4FDD\u5B58\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\uFF1B\u6838\u5B9E\u524D\u4E0D\u80FD\u7EE7\u7EED\u4FEE\u6539\u3002",motionTitle:"\u754C\u9762\u52A8\u753B",motion_spring:"Q \u5F39",motion_firm:"\u786C\u6717",motion_off:"\u5173\u95ED\u52A8\u753B",motionHint:"\u7ACB\u5373\u9884\u89C8\u5E76\u4FDD\u5B58\uFF1B\u64CD\u4F5C\u4E0D\u7B49\u5F85\u52A8\u753B\u3002\u7CFB\u7EDF\u51CF\u5C11\u52A8\u6001\u6548\u679C\u4F18\u5148\u3002",motionNotSaved:"\u672C\u6B21\u9884\u89C8\u5DF2\u5E94\u7528\uFF0C\u4F46\u6B64\u6D4F\u89C8\u5668\u65E0\u6CD5\u4FDD\u5B58\u52A8\u753B\u504F\u597D\u3002",modeControlPending:"\u8BED\u97F3\u63A7\u5236\u5C1A\u672A\u5B8C\u6210\u6216\u72B6\u6001\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\u3002",capabilityTitle:"\u5BF9\u8BDD\u5728\u4FA7\u680F\u4E2D\u7684\u663E\u793A",supported:"\u53EF\u7528",unsupported:"\u4E0D\u53EF\u7528\u6216\u5C1A\u672A\u786E\u8BA4",hiddenMode:"\u4E0D\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD",workspaceMode:"\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD",taskCapability:"\u540E\u53F0\u4EFB\u52A1\u652F\u6301",configuredMode:"\u5DF2\u4FDD\u5B58\u6A21\u5F0F",currentVoiceMode:"\u5F53\u524D\u5BF9\u8BDD\u7684\u5B9E\u9645\u6A21\u5F0F",noActiveVoice:"\u6CA1\u6709\u8FD0\u884C\u4E2D\u7684\u5BF9\u8BDD",chooseVisibility:"\u9009\u62E9\u663E\u793A\u6A21\u5F0F",workspaceWarning:"\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD\u4F1A\u628A\u5BF9\u8BDD\u663E\u793A\u5728\u666E\u901A\u5DE5\u4F5C\u533A\u4E2D\u3002\u9690\u85CF\u6A21\u5F0F\u4E0D\u53EF\u7528\u65F6\u4ECD\u4F1A\u62D2\u7EDD\u542F\u52A8\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u6539\u4E3A\u53EF\u89C1\u3002",visibilityNoMigration:"\u6B64\u8BBE\u7F6E\u7528\u4E8E\u540E\u7EED\u5BF9\u8BDD\uFF1B\u5DF2\u6709\u5BF9\u8BDD\u4FDD\u6301\u539F\u663E\u793A\u65B9\u5F0F\u3002",modeReadFirst:"\u6B63\u5728\u6838\u67E5\u5F53\u524D\u5BF9\u8BDD\u7684\u914D\u7F6E\u548C\u72B6\u6001\uFF0C\u786E\u8BA4\u540E\u53EF\u4FEE\u6539\u6A21\u5F0F\u3002",closeBeforeMode:"\u8BF7\u5148\u5173\u95ED\u8BED\u97F3\uFF0C\u786E\u8BA4\u5B8C\u5168\u505C\u6B62\u540E\u53EF\u4FEE\u6539\u663E\u793A\u6A21\u5F0F\u3002",saveWorkspace:"\u4FDD\u5B58\u5DE5\u4F5C\u533A\u53EF\u89C1\u6A21\u5F0F",saveHidden:"\u4FDD\u5B58\u9690\u85CF\u6A21\u5F0F",visibilityUnknownWrite:"\u663E\u793A\u6A21\u5F0F\u5199\u5165\u7ED3\u679C\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\u3002\u6838\u5B9E\u524D\u4E0D\u80FD\u7EE7\u7EED\u4FEE\u6539\uFF0C\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002",outputObservationUnavailable:"\u5C1A\u672A\u63A5\u5165\u771F\u5B9E\u64AD\u97F3\u5F00\u59CB\u4E8B\u4EF6\uFF0C\u65E0\u6CD5\u786E\u8BA4\u6B63\u5728\u64AD\u97F3",title:"\u9C7C\u5E94",description:"\u8BED\u97F3\u63A7\u5236\u3001\u97F3\u9891\u8BBE\u7F6E\u4E0E\u72EC\u7ACB\u5BF9\u8BDD\u3002",drag:"\u79FB\u52A8\u9C7C\u5E94\u60AC\u6D6E\u7A97",dragHint:"\u7528\u9F20\u6807\u62D6\u52A8\u7A7A\u767D\u533A\u57DF\u79FB\u52A8\uFF1B\u6309\u94AE\u548C\u8F93\u5165\u6846\u6B63\u5E38\u64CD\u4F5C",collapse:"\u6536\u8D77",reopen:"\u6253\u5F00\u9C7C\u5E94",refresh:"\u5237\u65B0\u72B6\u6001",settings:"\u8BBE\u7F6E",unknown:"\u6B63\u5728\u8BFB\u53D6\u72B6\u6001\u2026",enabled:"\u9EA6\u514B\u98CE\uFF1A\u5DF2\u5F00\u542F",disabled:"\u9EA6\u514B\u98CE\uFF1A\u672A\u5F00\u542F",identity:"\u5B8C\u6574\u4F1A\u8BDD\u6807\u8BC6",source:"\u6388\u6743\u6765\u6E90",actor:"\u64CD\u4F5C\u4F1A\u8BDD",none:"\u65E0",openSession:"\u5148\u5728 DSH \u4FA7\u680F\u65B0\u5EFA\u6216\u6253\u5F00\u4E00\u4E2A\u5BF9\u8BDD\uFF0C\u518D\u56DE\u5230\u9C7C\u5E94\u3002",enable:"\u5F00\u9EA6",transfer:"\u8BA9\u8FD9\u4E2A\u7A97\u53E3\u63A5\u7BA1\u9EA6\u514B\u98CE",disable:"\u5173\u9EA6",stale:"\u72B6\u6001\u6682\u65F6\u8BFB\u4E0D\u5230",snapshot:"\u4E0A\u6B21\u8BFB\u53D6\u7684\u72B6\u6001",consequence:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u672C\u6B21\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u3002\u6536\u8D77\u540E\u4F1A\u7EE7\u7EED\u5BF9\u8BDD\u3002",savedHint:"\u8BBE\u5907\u4E0E\u58F0\u7EB9\u8BBE\u7F6E\u5728\u4E0B\u6B21\u97F3\u9891\u64CD\u4F5C\u65F6\u751F\u6548",more:"\u66F4\u591A\u5BF9\u8BDD",historyOther:"\u5217\u8868\u6765\u81EA\u5176\u4ED6\u64CD\u4F5C\u4F1A\u8BDD\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6",helperOnline:"\u97F3\u9891\u670D\u52A1\u5728\u7EBF",helperOffline:"\u97F3\u9891\u670D\u52A1\u79BB\u7EBF",pending:"\u6B63\u5728\u5904\u7406\u2026",refreshHint:"\u53EA\u8BFB\u53D6\u72B6\u6001\uFF0C\u4E0D\u542F\u52A8\u9EA6\u514B\u98CE\u6216\u6A21\u578B",modelGuide:"\u9ED8\u8BA4 SenseVoice \u5728\u672C\u673A\u4F7F\u7528 CPU\u3002\u6A21\u578B\u6587\u4EF6\u548C\u8BB8\u53EF\u89C1 docs/model-setup.md\u3002",sensevoiceSource:"SenseVoice \u6765\u6E90",ttsSource:"\u5916\u90E8 TTS \u53C2\u8003",licenseNote:"SenseVoice \u8BB8\u53EF\u8BA8\u8BBA",modelTitle:"\u672C\u5730\u6A21\u578B",modelHint:"\u4FDD\u5B58\u5DF2\u6709 SenseVoice \u6216 CAM++ \u8DEF\u5F84\u3002\u6587\u4EF6\u5728\u4F7F\u7528\u524D\u6821\u9A8C\uFF0C\u58F0\u7EB9\u8FC7\u6EE4\u9700\u53E6\u884C\u5F00\u542F\u3002",asr:"\u8BED\u97F3\u8BC6\u522B",sensevoicePath:"SenseVoice \u672C\u5730\u76EE\u5F55",campplusPath:"CAM++ \u6587\u4EF6\uFF08\u53EF\u9009\uFF09",saveModels:"\u4FDD\u5B58\u6A21\u578B\u8DEF\u5F84",audioTitle:"\u97F3\u9891\u8BBE\u7F6E",soundTitle:"\u8F6E\u6B21\u63D0\u793A\u97F3",headphones:"\u6211\u5DF2\u4F7F\u7528\u8033\u673A",headphonesHint:"\u672A\u786E\u8BA4\u8033\u673A\u65F6\uFF0C\u4E3A\u907F\u514D\u5916\u653E\u56DE\u58F0\u4E0D\u64AD\u653E\u63D0\u793A\u97F3\uFF1B\u8FD9\u4E0D\u662F\u56DE\u58F0\u6D88\u9664\uFF0C\u4E5F\u4E0D\u4F1A\u88C1\u6389\u7528\u6237\u8BB2\u8BDD",automaticBargeIn:"\u542F\u7528\u5B9E\u9A8C\u6027\u81EA\u52A8\u6253\u65AD",stopRequested:"\u5DF2\u8BF7\u6C42\u505C\u6B62\u64AD\u653E\uFF0C\u5C1A\u672A\u786E\u8BA4",stopConfirmed:"\u5DF2\u786E\u8BA4\u505C\u6B62\u64AD\u653E",soundEnabled:"\u542F\u7528\u63D0\u793A\u97F3",soundVolume:"\u63D0\u793A\u97F3\u97F3\u91CF\uFF080\u20131\uFF09",soundUnavailable:"\u97F3\u6548\u6682\u672A\u63A5\u5165\uFF1B\u8FD9\u4E9B\u63A7\u4EF6\u4E0D\u4F1A\u5047\u88C5\u64AD\u653E",soundAvailable:"\u97F3\u6548\u5DF2\u63A5\u5165",mode:"\u8BF4\u8BDD\u65B9\u5F0F",alwaysOn:"\u5F00\u542F\u6301\u7EED\u8046\u542C\uFF08\u9EA6\u514B\u98CE\u5E38\u5F00\uFF09",alwaysOff:"\u5207\u56DE\u6309\u4F4F\u8BF4\u8BDD",modeUnavailable:"\u8BF4\u8BDD\u65B9\u5F0F\u63A7\u5236\u5C1A\u672A\u63A5\u5165",modeNeedsGrant:"\u8BF7\u5148\u8BFB\u53D6\u6700\u65B0\u72B6\u6001\u3002",pttMode:"\u6309\u952E\u8BF4\u8BDD",alwaysMode:"\u81EA\u7531\u9EA6",modeHint:"\u5F00\u59CB\u5BF9\u8BDD\u524D\u53EF\u9884\u9009\u8BF4\u8BDD\u65B9\u5F0F\u3002",readSettings:"\u8BFB\u53D6\u8BBE\u7F6E",device:"\u9EA6\u514B\u98CE\u8BBE\u5907",deviceHint:"\u8BBE\u5907\u540D\u79F0\u6765\u81EA\u97F3\u9891\u670D\u52A1\u7684\u6700\u8FD1\u8BFB\u53D6\u3002\u66F4\u6362\u8BBE\u5907\u540E\uFF0C\u5F00\u59CB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002",sideButton:"\u9F20\u6807\u6309\u4F4F\u8BF4\u8BDD",sideOff:"\u5173\u95ED",sideOne:"\u4FA7\u952E 1",sideTwo:"\u4FA7\u952E 2",speaker:"\u5B9E\u9A8C\u6027\u58F0\u7EB9\u8FC7\u6EE4",speakerHint:"\u6B64\u5F00\u5173\u53EA\u7528\u4E8E\u5DF2\u6709\u7684\u58F0\u7EB9\u914D\u7F6E\uFF1B\u5F53\u524D\u9762\u677F\u6CA1\u6709\u6CE8\u518C\u5165\u53E3\u3002",save:"\u4FDD\u5B58\u8BBE\u7F6E",saved:"\u8BBE\u7F6E\u5DF2\u4FDD\u5B58",historyTitle:"\u5BF9\u8BDD\u5386\u53F2",historyHint:"\u53EA\u663E\u793A\u9C7C\u5E94\u521B\u5EFA\u7684\u5BF9\u8BDD\uFF1B\u63A5\u7EED\u4E0D\u4F1A\u81EA\u52A8\u6062\u590D\u5DF2\u5F52\u6863\u804A\u5929",loadHistory:"\u8BFB\u53D6\u5BF9\u8BDD",newChat:"\u65B0\u4F1A\u8BDD",resume:"\u63A5\u7EED",active:"\u5F53\u524D",archived:"\u5DF2\u5F52\u6863",unavailable:"\u4E0D\u53EF\u7528",empty:"\u6682\u65E0\u53EF\u63A5\u7EED\u7684\u5BF9\u8BDD",noTitle:"\u5BF9\u8BDD",noResume:"\u5F53\u524D\u4E0D\u80FD\u63A5\u7EED",newHint:"\u65B0\u5EFA\u6216\u63A5\u7EED\u4F1A\u5207\u6362\u5F53\u524D\u8BED\u97F3\uFF0C\u64A4\u56DE\u65E7\u6388\u6743\uFF0C\u53EF\u80FD\u7ED3\u675F\u65E7\u540E\u53F0\u4EFB\u52A1\uFF1B\u4E0D\u5408\u5E76\u5386\u53F2\uFF0C\u4E5F\u4E0D\u91CD\u8DD1\u65E7\u4EFB\u52A1",historyStale:"\u70B9\u51FB\u8BFB\u53D6\u5BF9\u8BDD\u67E5\u770B\u6700\u65B0\u8BB0\u5F55"},Zd={startConversation:"Start conversation",endConversation:"End conversation",voiceTarget:"Send to",dedicatedVoiceTarget:"Fish Voice conversation",checkingVoiceTarget:"Checking target\u2026",voiceTargetChanged:"The delivery target changed. Check the chat shown here before starting.",chooseCurrentDshTarget:"Use current chat",backToFishVoice:"Back to Fish Voice",currentDshTargetError:"Could not confirm this DSH chat. Check the chat and try again.",chooseVoiceTarget:"Choose a delivery chat",searchVoiceTargets:"Search by chat title or ID",searchVoiceTargetsAction:"Search",existingVoiceTargetList:"Existing DSH chats",boundVoiceTarget:"Current target",voiceTargetAvailability_ready:"Available",voiceTargetAvailability_busy:"Chat is processing a message",voiceTargetAvailability_archived:"Chat is archived",voiceTargetAvailability_unavailable:"Chat is unavailable",voiceTargetAvailability_managed:"Managed by Fish Voice. Direct delivery unavailable.",voiceTargetAvailability_subagent:"Subagent chat. Direct delivery unavailable.",voiceTargetNoMatch:"No matching chats.",voiceTargetEmptyList:"No available chats.",voiceTargetSynthesisNotice:"With an online voice, replies are sent to the speech provider you approved. Select a local voice under Models \u2192 Read aloud to keep speech offline.",bindVoiceTarget:"Use selected chat",savingVoiceTarget:"Saving\u2026",moreVoiceTargets:"Load more",loadingVoiceTargets:"Loading DSH chats\u2026",voiceTargetListError:"Could not load DSH chats.",retryVoiceTargets:"Retry",retryTranscripts:"Voice messages to resend",retryTranscript:"Resend",retryTranscriptBusy:"Waiting until sending is available",retryTranscriptSending:"Resending\u2026",retryTranscriptUncertain:"Delivery is unconfirmed. Check the original chat.",endDiscardsRetries:"Ending the conversation clears these transcripts",modeSwitching:"Switching listening mode\u2026",modeSaving:"Saving listening mode\u2026",modeSwitchUnconfirmed:"Checking which listening mode took effect\u2026",modeSwitchFailed:"The change could not be confirmed. Check the current mode and try again.",updateTitle:"Fish Voice updates",updateOfferTitle:"Fish Voice update available",updateCurrentVersion:"Installed",updateNewVersion:"New",updateChannel_stable:"Stable",updateChannel_preview:"Preview",updateCheck:"Check for updates",updateDetails:"View update",updateLater:"Later",updateInstall:"Update now",updateRelease:"Release notes",updateFeedback:"Send feedback",update_idle:"Reading update status\u2026",update_checking:"Checking for updates\u2026",update_current:"Fish Voice is up to date.",update_available:"An update is ready.",update_incompatible:"This update is incompatible with the current DSH environment.",update_installing:"Updating. DSH may reload Fish Voice\u2026","update_restart-required":"Update installed. Restart DSH to apply it.","update_enable-required":"Update installed. Enable Fish Voice in DSH plugin settings.",update_installed:"Update complete.",update_error:"The update encountered an error. Check for updates to retry.",update_unsupported:"Automatic updates are unavailable. See the official release notes.",updateConnection:"Update status could not be confirmed. Check again when DSH is ready.",audioDevices:"Audio devices",audioSystemDefault:"System default",audioInput:"Audio input",audioOutput:"Audio output",inputDeviceMissing:"Microphone disconnected; selection retained",outputDeviceMissing:"Output disconnected; no automatic fallback",deviceDisconnected:"Disconnected",inputDeviceStopFirst:"Turn off the microphone to switch input. Output changes at the next playback.",outputDeviceUnsupported:"Selecting speech output is not supported on this platform.",deviceListRetry:"Device list unavailable. Open a selector to retry.",voiceHelperCleanupHint:"Confirming microphone release. New recording stays off until this completes.",voiceHelperRestartHint:"Microphone helper exit is unconfirmed. Fully restart DSH before enabling voice.",inputError_device:"Microphone unavailable",inputError_recognition:"Recognition failed","inputError_no-speech":"No clear speech; try again",inputHelp_device:"Check mic access. Turn the mic off to select a device. Error details: Settings \u2192 Advanced \u2192 Diagnostics.",inputDiagnosticTitle:"Last reported audio error",inputDiagnosticHistory:"This is the last recorded error and may be from an earlier attempt. It does not confirm the current device state.",inputHelp_recognition:"Try again. If it fails, turn the mic off and check the model in Settings.","inputHelp_no-speech":"Move closer, check that your mic is unmuted, and try again.",speechFailed:"Speech failed",speechInterrupted:"Speech interrupted",wakeFallbackHint:"Say a configured name. Matching uses the transcript for now. Reselect Wake word after switching modes to retry sound matching.",wakeMode:"Wake word",switchToWake:"Switch to wake-word listening",wakeDisabled:"Wake listening is off",wakeStarting:"Starting wake listening\u2026",wakeWaiting:"Waiting for wake word",wakeListening:"Listening for the next instruction",wakePaused:"Wake listening paused",wakeError:"Wake listening unavailable; check settings",wakeHint:"Say a configured name, then your instruction. End the conversation to stop listening.",wakeMethod:"Matches the sound and transcript locally after the phrase ends.",wakeAliases:"Wake names",wakeAliasesHint:"Up to 8 comma-separated names. Mandarin near-sounds match only at the start; prefer a distinctive name of 3+ characters.",wakeTimeout:"Wait after wake (seconds)",wakeSettings:"Wake-word settings",wakeStopToEdit:"Turn off the microphone before editing wake names or timeout.",wakeInvalid:"Enter 1\u20138 valid names and a 3\u201330 second timeout.",switchToPtt:"Click to use push to talk",switchToAlways:"Click to leave the microphone listening",quickSpeedStop:"Turn the mic off to change speed",performanceReadFirst:"Check which speeds the current model supports first.",performanceUnavailable:"The provider explicitly rejected the reasoning parameter for unavailable modes; other modes remain selectable.",performanceProbeCost:"At load, up to 3 fixed short requests check the modes. Model charges apply.",performanceProbeScope:"Only routes with a testing interface send short requests. Native support can be read directly.",performanceProbeUnknown:"Some modes could not be confirmed. Check network access or sign-in, then retry.",performanceProbeAccepted:"The effort request check passed.",performanceProbePending:"Checking effort modes for the current model\u2026",holdToSpeak:"Hold to speak:",alwaysWarning:"The microphone keeps listening. Turn it off when finished.",bindingMissing:"Bind a push-to-talk shortcut in settings, or switch to continuous listening.",noSession:"No conversation is open",otherWindow:"Microphone: another window",readingStatus:"Reading status without starting the microphone or models.",statusRetry:"Status is unavailable. It will be checked automatically when you return to this window.",retryStatus:"Refresh voice status",collapseHint:"Collapsing keeps the microphone enabled",stopConsequence:"Ending the conversation releases the microphone and stops its background tasks.",transferTitle:"Take over the other window\u2019s microphone?",transferWarning:"This interrupts voice in the other window and may end its background tasks.",cancel:"Cancel",confirmTransfer:"Confirm takeover",bindingStopRequired:"Turn off the microphone before changing mouse or keyboard shortcuts.",bindingFinishing:"Voice is still stopping. Wait before changing shortcuts.",headphonesRequired:"Confirm that you are wearing headphones to enable automatic interruption.",deviceManualIndex:"Advanced: enter device index",deviceManualName:"Advanced: enter device name",deviceIndexInvalid:"Enter a nonnegative whole-number device index.",deviceDefault:"Use the system default microphone",deviceManual:"Advanced: enter name or index",deviceSaved:"Saved device",deviceEmpty:"No microphone was found. Connect a device and check system sound settings.",deviceUnknown:"Detected devices appear after enabling voice. Use the system default or enter a device manually.",ttsBackend:"Speech backend",ttsBackendHint:"Speech uses your installed TTS backend and its settings. Independent output volume appears only when verified.",ttsBackendPending:"Additional backend selection is being adapted. No cloud service is connected automatically.",voiceClone:"Voice cloning",voiceCloneAvailable:"Qwen supports a local reference voice. Choose a WAV in voice settings.",voiceClonePrivacy:"Reads only your selected, authorized sample locally. No audio upload.",inputActive:"Receiving voice input",modeUnknown:"Listening mode unknown",voiceInputUnavailable:"Voice input unavailable",voiceInputRecoveryHint:"The audio service stopped. Turn the microphone off, then on again. Your authorization is unchanged.",searchHistory:"Search chats",searchScope:"Search loaded chats",noMatches:"No matching chats",differentOwner:"Voice belongs to another session. Check the source first.",details:"Diagnostics",noReply:"No conversation yet",recentConversation:"Conversation",recentTenTurns:"Recent 10 turns",allRecords:"All records",showAllRecords:"Show all",collapseToTen:"Last 10 turns",collapseConversation:"Collapse conversation",currentVoiceRecords:"Current voice chat",historyTruncated:"Showing a limited range; original records retained",viewConversation:"View voice records",loadEarlier:"Load earlier",readingHistory:"Reading records\u2026",retryHistory:"Could not read records. Retry",noConversation:"No conversation yet",newMessages:"new messages",conversationMessages:"Voice conversation",assistantName:"Assistant name",renameAssistant:"Rename: Enter to save, Esc to cancel",newChatCreated:"New chat created",newChatActive:"Start a voice chat. Background work in the current chat will stop and its history will be kept.",newChatOtherOwner:"Open the current voice chat or the window that enabled the microphone to start a new chat.",compact_off:"Off",compact_standby:"Standby",compact_listening:"Listening",compact_pending:"Working",compact_unknown:"Check status",you:"You",assistant:"Assistant",close:"Close panel",keyboardBinding:"Push-to-talk binding",bindingOff:"Not bound",saveBindings:"Save shortcuts",discardBindings:"Discard changes",bindingCapture:"Press a key combination (Esc cancels)",clearBinding:"Clear binding",bindingUnsupported:"This key or system shortcut is not supported.",bindingGlobalHint:"Windows global shortcut. Disable voice before recording a binding; changes apply on the next voice enable. Keys are not swallowed and may also trigger another application.",bindingUnavailable:"Global key binding is unavailable on this platform.",bindingPrintableWarning:"A plain letter, digit or Space also triggers push-to-talk while typing in other applications.",performanceTitle:"Voice performance",performanceHint:"Applies to the next dedicated voice chat. For a linked conversation, use the model menu in that DSH chat to change its reasoning effort.",inspectPerformance:"Check available modes",performance_fast:"Fast",performanceNoThinking:"No thinking",performanceRecommended:"[Recommended]",performanceFastHint:"Fast explicitly requests thinking to be turned off.",performanceFastUnavailable:"The current route cannot confirm that thinking can be turned off. Choose Follow model or select a model route that supports turning it off.",performanceHostUnavailable:"The current model route does not offer some reasoning levels.",performance_balanced:"Standard",performance_high:"High",performance_compatibility:"Compatible default",performanceStopRequired:"Mode changes require fully stopped voice. Disabling voice can end background work belonging to its voice root.",savePerformance:"Save for next enable",outputVolume:"Assistant voice volume",outputVolumeHint:"Adjusts the installed Windows dsh-speak backend only. It does not verify the active voice route or change DSTuber, system or cue volume. Applies to the next output.",readOutputVolume:"Read voice volume",saveOutputVolume:"Save voice volume",outputVolumeUnavailable:"This speech backend does not support independent volume control.",outputVolumeUnknown:"The volume save is unconfirmed. It will be checked automatically without resubmitting.",settingsTitle:"\u9C7C\u5E94 settings",settingsSections:"Settings sections",tab_audio:"Audio",tab_interaction:"Interaction",tab_prompt:"Prompt",voicePromptLabel:"Custom prompt",voicePromptOptional:"(optional)",voicePromptAgents:"Follow AGENTS",voicePromptCustom:"Custom prompt added",voicePromptPlaceholder:`For example: Give the conclusion first and use a natural tone.

Added after AGENTS. Leave empty to use the default settings.`,voicePromptStopToEdit:"Stop voice to edit",voicePromptUnsupported:"This DSH version does not support custom prompts yet.",voicePromptTooLong:"The prompt must not exceed 32,768 characters.",voicePromptSaving:"Saving\u2026",voicePromptCancel:"Cancel changes",voicePromptSave:"Save",voicePromptSaved:"Saved. Applies when voice is next started.",voicePromptSaveFailed:"Could not save. Your draft has been kept.",voicePromptUnsaved:"Not saved",tab_models:"Models",tab_advanced:"Advanced",projectInfoTitle:"About \u9C7C\u5E94",projectAuthor:"Author",projectRepository:"Official repository",projectNpm:"npm package",tab_sessions:"Sessions",settingsContent:"Settings content",voiceCleanupPending:"Closing previous audio service",voiceCleanupHint:"Waiting for the previous session and recording to exit. Status will refresh without retrying microphone activation.",voiceRestartPending:"Restart DSH required",voiceRestartHint:"The previous audio service has not confirmed exit. Fully quit and reopen DSH before enabling voice. Your saved authorization is unchanged.",voiceRecoveryPending:"Previous voice session is still active",voiceRecoveryCheck:"Check and stop",voiceRecoveryHint:"The previous instance is still closing. Check and stop first. If it remains active, fully restart DSH before enabling voice. Your authorization is retained.",operationUnavailable:"The outcome is unconfirmed. Automatic readback will check the actual state without resubmitting. Details are in Advanced settings.",enableFailed:"Could not open the mic. Check Advanced settings for details before retrying.",tab_pets:"Desktop pet",planned:"Planned development",configurationUnknown:"The configuration write is unconfirmed. Automatic readback is in progress; changes stay locked until verified.",motionTitle:"Interface motion",motion_spring:"Spring",motion_firm:"Firm",motion_off:"Off",motionHint:"Preview and save immediately. Actions never wait for animation. System reduced-motion preference takes priority.",motionNotSaved:"Preview applied, but this browser could not save the preference.",modeControlPending:"Voice control is pending or unconfirmed. Refresh status when it finishes.",capabilityTitle:"Host capabilities and voice visibility",supported:"Available",unsupported:"Unavailable or unconfirmed",hiddenMode:"Hidden voice chat",workspaceMode:"Workspace-visible compatibility mode",taskCapability:"Persistent handoff",configuredMode:"Saved mode",currentVoiceMode:"Actual mode of the current voice chat",noActiveVoice:"No running voice chat",chooseVisibility:"Choose visibility",workspaceWarning:"Workspace-visible compatibility mode shows voice chats in the regular workspace. Unavailable hidden mode still refuses to start; it never falls back to visible mode.",visibilityNoMigration:"This preference applies to later chats. Existing chats keep their current visibility.",modeReadFirst:"Checking settings and status for this conversation before visibility can be changed.",closeBeforeMode:"Turn voice off and wait for confirmed shutdown before changing visibility.",saveWorkspace:"Save workspace-visible mode",saveHidden:"Save hidden mode",visibilityUnknownWrite:"The visibility write is unconfirmed. Automatic readback is in progress; changes stay locked. The original write will not be repeated.",outputObservationUnavailable:"Actual playback-start events are unavailable; playback has not been confirmed.",title:"\u9C7C\u5E94",description:"Voice controls, audio preferences, and separate voice chats.",drag:"Move Fish Voice panel",dragHint:"Drag background space with the mouse; controls remain interactive",collapse:"Collapse",reopen:"Open Fish Voice",refresh:"Refresh status",settings:"Settings",unknown:"Reading status\u2026",enabled:"Microphone enabled",disabled:"Microphone off",identity:"Full session identities",source:"Authorization source",actor:"Action session",none:"None",openSession:"Open a DSH conversation first",enable:"Enable for this session",transfer:"Authorize this session",disable:"Disable voice",stale:"Refresh to confirm status",snapshot:"Last read status",consequence:"Disabling or switching voice may end its background work. Collapsing this panel leaves voice enabled.",savedHint:"Device and speaker settings take effect on the next audio operation or helper reload.",more:"More voice chats",historyOther:"This list belongs to another action session; read it again",helperOnline:"Audio helper online",helperOffline:"Audio helper offline",pending:"Working\u2026",refreshHint:"Read status without starting the microphone or a model",modelGuide:"SenseVoice runs locally on the CPU. For model files and licenses, see docs/model-setup.md.",sensevoiceSource:"SenseVoice source",ttsSource:"External TTS reference",licenseNote:"SenseVoice licensing discussion",modelTitle:"Local models",modelHint:"Save existing SenseVoice or CAM++ paths. Files are verified before use. Speaker filtering is enabled separately.",asr:"Speech recognition",sensevoicePath:"Local SenseVoice directory",campplusPath:"CAM++ file (optional)",saveModels:"Save model paths",audioTitle:"Audio settings",soundTitle:"Turn sounds",headphones:"I am using headphones",headphonesHint:"Cues stay off until headphones are confirmed, to avoid speaker echo. This is not echo cancellation and does not trim your speech.",automaticBargeIn:"Enable experimental automatic interruption",stopRequested:"Stop requested; playback has not confirmed stopping",stopConfirmed:"Playback confirmed stopped",soundEnabled:"Enable turn sounds",soundVolume:"Sound volume (0\u20131)",soundUnavailable:"Sound playback is not connected; these controls cannot play cues yet.",soundAvailable:"Sound playback connected",mode:"Listening mode",alwaysOn:"Enable always listening (mic stays on)",alwaysOff:"Use push to talk",modeUnavailable:"Listening mode control is not connected",modeNeedsGrant:"Read the current voice status first",pttMode:"Push to talk",alwaysMode:"Open mic",modeHint:"The audio helper controls the active mode. Saving preferences never grants or starts microphone access.",readSettings:"Read settings",device:"Input device",deviceHint:"Blank uses the system default; enter a device name or index",sideButton:"Mouse push-to-talk",sideOff:"Off",sideOne:"Side button 1",sideTwo:"Side button 2",speaker:"Experimental speaker filtering",speakerHint:"Enable matching only; this page does not record or enroll a voiceprint",save:"Save settings",saved:"Settings saved",historyTitle:"Voice chats",historyHint:"Only Fish Voice voice chats appear here. Resume never unarchives a chat automatically.",loadHistory:"Read voice chats",newChat:"New chat",resume:"Resume",active:"Current",archived:"Archived",unavailable:"Unavailable",empty:"No voice chats available",noTitle:"Voice chat",noResume:"Cannot resume right now",newHint:"New or resumed chats switch current voice, revoke its old grant, and may end its background work. They do not merge history or replay old work.",historyStale:"Read voice chats to see the latest records"};var Sn=require("react");var Xh=/^7b94c8e3-d6a1-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,Fi=e=>typeof e=="string"&&Xh.test(e);var Ld="sidebar.workspaces",Yh="workspace",Qh="whaleWorkspacePresentation",eg=["sidebar.workspaces.directoryFlow","sidebar.workspaces.session.row.action","sidebar.session.row.leading","sidebar.session.row.trailing","sidebar.session.row.hover"],ng=new Set(["one-shot","continuable","unknown"]);function tg(e,n){return e&&typeof e=="object"&&Object.keys(e).length===n.length&&n.every(t=>Object.hasOwn(e,t))}function og(e){if(!Array.isArray(e)||e.length>512)return null;let n=[],t=new Set;for(let o of e){if(!tg(o,["id","parentId","mode"])||typeof o.id!="string"||!o.id||o.id.length>256||t.has(o.id))return null;if(o.parentId===null){if(o.mode!==null||!Fi(o.id))return null;n.push({id:o.id,parentId:null,mode:null})}else{if(typeof o.parentId!="string"||!o.parentId||o.parentId===o.id||!ng.has(o.mode))return null;n.push({id:o.id,parentId:o.parentId,mode:o.mode})}t.add(o.id)}return n}function rg(e,n){if(!e||typeof e!="object"||!e.byId||!Array.isArray(e.ids))return e;let t=new Map(n.map(l=>[l.id,l])),o=Object.create(null),r=new Set,i=!1;for(let[l,u]of Object.entries(e.byId)){let d=t.get(l);if(Fi(l)&&d===void 0){r.add(l),i=!0;continue}if(d?.parentId===null){if(u.parentId===void 0&&u.origin!=="subagent"){o[l]=u;continue}r.add(l),i=!0;continue}if(d&&u.origin==="subagent"&&u.parentId===d.parentId){let m={...u};delete m.origin,o[l]=m,i=!0;continue}o[l]=u}for(let l of n){let u=e.byId[l.id];u&&(l.parentId===null&&(u.parentId!==void 0||u.origin==="subagent")||l.parentId!==null&&(u.origin!=="subagent"||u.parentId!==l.parentId)||e.ids.includes(l.id)||(i=!0))}if(!i)return e;let s=e.ids.filter(l=>!r.has(l)&&o[l]!==void 0);for(let l of n)o[l.id]!==void 0&&!s.includes(l.id)&&s.push(l.id);let c=e.projectionsBySession;if(c&&r.size>0){let l={...c};for(let u of r)delete l[u];c=l}return{...e,ids:s,byId:o,projectionsBySession:c}}function ig(e,n){return!e||e.locale!==Yh||e.options?.id!==void 0||e.options?.key!==void 0||(e.options?.priority??0)!==0||typeof n!="function"||n.name!=="WorkspaceBrowser"?!1:eg.every(t=>Object.hasOwn(e.children??{},t))}function sg(e){if(!Object.isExtensible(e))return!1;let n=Object.getOwnPropertyDescriptor(e,"component");return n===void 0||n.writable===!0}function ag(e,n){return e.length===n.length&&e.every((t,o)=>{let r=n[o];return t.id===r.id&&t.parentId===r.parentId&&t.mode===r.mode})}function qd(e,n){let t=[],o=0,r={revision:o,items:t},i,s=!1,c=!1,l=new Set,u=new Set,d=z=>{for(let M of[...z])M()},m={getSnapshot:()=>r,subscribe(z){return u.add(z),()=>u.delete(z)}},f=()=>{o++,r={revision:o,items:t},d(u),d(l)},p=z=>{s!==z&&(s=z,f())},y=()=>{let z=i;i=void 0,z&&z.entry.component===z.wrapper&&(z.entry.component=z.original)},v=()=>{if(c)return;let z;try{z=e.entries(Ld)}catch{z=void 0}let M=Array.isArray(z)?z.filter(E=>{let S=i&&i.entry===E&&E.component===i.wrapper?i.original:E?.component;return ig(E,S)}):[];if(M.length!==1||typeof n!="function"||!sg(M[0])){y(),p(!1);return}let $=M[0];if(i?.entry===$&&$.component===i.wrapper)return;y(),p(!1);let j=$.component,W=E=>{let S=E.useSessions(I=>I),k=E.useWhaleWorkspacePresentation(I=>I),C=(0,Sn.useMemo)(()=>rg(S,k.items),[S,k]),R=(0,Sn.useCallback)(I=>I(C),[C]),P=(0,Sn.useMemo)(()=>new Map(k.items.map(I=>[I.id,I])),[k]),N=(0,Sn.useCallback)(I=>{let H=P.get(I),Z=S.byId[I];if(H?.parentId&&Z?.origin==="subagent"&&Z.parentId===H.parentId){n({childSessionId:I,parentSessionId:H.parentId,mode:H.mode});return}E.open?.(I)},[E.open,P,S]);return(0,Sn.createElement)(j,{...E,useSessions:R,open:N})},U=function(S){let k=typeof S?.useSessions=="function"&&typeof S?.useWhaleWorkspacePresentation=="function"&&typeof S?.open=="function";return(0,Sn.useEffect)(()=>{i?.entry===$&&i.wrapper===U&&p(k)},[k]),(0,Sn.createElement)(k?W:j,S)};U.displayName="WhaleWorkspacePresentation",$.component=U,i={entry:$,original:j,wrapper:U}},b=()=>{},x=()=>{};try{b=e.provideRoot({hooks:{[Qh]:m}}),typeof b!="function"&&(b=()=>{}),x=e.subscribe(Ld,v),typeof x!="function"&&(x=()=>{}),v()}catch{x(),y(),b(),p(!1)}return{supported:()=>s,subscribe(z){return l.add(z),()=>l.delete(z)},setOverrides(z){if(c)return!1;let M=og(z);return M===null?(t.length>0&&(t=[],f()),!1):(ag(t,M)||(t=M,f()),!0)},dispose(){c||(c=!0,x(),y(),s=!1,f(),b(),l.clear(),u.clear())}}}var lg=["slots","locale","remote","uiSession"];function cg(e){let n=sd(),t=Gu(void 0,{observe:n.internal});t.enableAutomaticReads();let o=Ju();e.inject(["whaleFloatingLayout"],v=>{v.effect(()=>o.useLayoutService(v.whaleFloatingLayout),"whale-voice: optional magnetic layout")});let r=Yu(),i=Ku(window,{onResize:v=>o.fit(v)}),s,c=()=>{};e.effect(()=>{let v=()=>{t.setReadVisibility(document.visibilityState!=="hidden"),document.visibilityState!=="hidden"&&(t.refresh(),s?.refresh(),c())};return window.addEventListener("focus",v),window.addEventListener("online",v),document.addEventListener("visibilitychange",v),v(),()=>{window.removeEventListener("focus",v),window.removeEventListener("online",v),document.removeEventListener("visibilitychange",v)}},"whale-voice: refresh visible state"),e.effect(()=>{let v=qd(e.slots,U=>e.get?.("uiWorkspace")?.openSession(U)),b,x,z=()=>{x?.(),x=null};c=()=>{if(!v.supported()){z();return}if(!b||x)return;let U=b,E=!0;x=b.subscribePresentation(S=>{v.setOverrides(S.shown),E&&(E=!1,t.refresh({force:!0}))},S=>{b===U&&(z(),console.warn("\u9C7C\u5E94\u4FA7\u680F\u4F1A\u8BDD\u663E\u793A\u8FDE\u63A5\u4E2D\u65AD",S?.message??S))})};let M=v.subscribe(c),$=!1;s=Gi(async()=>{let U=$?"ui-reconnect":"ui-connect";n.internal(U,"requested");try{let E=await nd(e,n.internal);return n.internal(U,"finished","ok"),E}catch(E){throw $=!0,n.internal(U,"finished","failed"),E}},{visible:()=>t.getSnapshot().readVisible!==!1,onReady:U=>{z(),b=U,n.attach(U),t.attachConversationClient(U),c()},onError:U=>t.conversationUnavailable(U)});let j=t.getSnapshot().readVisible,W=t.subscribe(()=>{let U=t.getSnapshot().readVisible;U!==j&&(j=U,s.visibilityChanged())});return s.start(),()=>{c=()=>{},z(),M(),v.dispose(),W(),n.dispose(),s.dispose(),t.dispose()}},"whale-voice: private conversation stream"),e.effect(()=>()=>{t.dispose(),i.dispose(),o.dispose(),r.dispose()},"whale-ear-ui: state and geometry"),e.effect(()=>e.locale.register("whaleEar",{en:Zd,zh:Bd}),"whale-ear-ui: dictionaries"),e.effect(()=>{let v=document.createElement("style");return v.dataset.plugin="dsh-whale-ear-ui",v.textContent=h.text+kd+Hi,document.head.append(v),()=>v.remove()},"whale-ear-ui: stylesheet");let l=async v=>{let b=e.get?.("sessions");if(!b)throw new Error("DSH \u4F1A\u8BDD\u754C\u9762\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");return b.list.getSnapshot().byId[v]||await b.refresh(),b},u=0,d=async v=>{let b=++u;if(v.kind==="root"&&await l(v.id),b!==u)return;let x=e.get?.("uiWorkspace");if(!x?.openSession)throw new Error("DSH \u4F1A\u8BDD\u754C\u9762\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");return x.openSession(v.kind==="root"?v.id:{childSessionId:v.id,parentSessionId:v.parentId,mode:v.mode??"unknown"})},m=v=>d({kind:"root",id:v}),f={subscribe(v){let b=[e.uiSession.adapter?.current?.subscribe(v),e.get?.("layout")?.panelInfo?.subscribe(v),e.get?.("sessions")?.list?.subscribe?.(v)];return()=>b.forEach(x=>x?.())},selectedSession(){let v=e.uiSession.adapter?.current?.getSnapshot();return v?.hooks?.session?.getSnapshot()?.blank===!0?null:v?.props?.sessionId??null},currentConversation(){return e.get?.("layout")?.panelInfo?.getSnapshot()?.activePanelId===null?f.selectedSession():null},sourceFor(v){if(!v)return null;let b=e.get?.("sessions"),x=b?.list?.getSnapshot()?.byId?.[v];return b?.subagentAddress?.(v)||x?.origin==="subagent"||x?.parentId?null:v}},p=async(v,b)=>{let z=await(await l(v)).using(v,{source:"workspaceOperation"},M=>M.binding.session.rename(b));if(!z.ok)throw new Error(z.error.message);return z.value.title},y=()=>({captureBindings:t.captureBindings,refreshModelCompute:t.refreshModelCompute,pickPath:t.pickPath,readState:t.getSnapshot,markSettingsEdited:t.markSettingsEdited,discardSettingsDraft:t.discardSettingsDraft,openAuthorization:t.openAuthorization,closeAuthorization:t.closeAuthorization,saveAuthorization:t.saveAuthorization,readOperationLog:t.readOperationLog,manageSessions:t.manageSessions,listExistingVoiceSessions:t.listExistingVoiceSessions,setExistingVoiceSession:t.setExistingVoiceSession,setSettingsTab:t.setSettingsTab,setSettingsModelTab:t.setSettingsModelTab,setSessionManagement:t.setSessionManagement,senseVoiceAsrAction:t.senseVoiceAsrAction,updateAction:t.updateAction,dismissUpdate:t.dismissUpdate,openExistingVoiceSession:m,openManagedSession:d,renameManagedSession:p,hooks:{whaleUi:t,whalePreferences:r},setMotion:v=>r.setMotion(v),setAssistantName:v=>r.setAssistantName(v),run:(...v)=>t.run(...v),setSession:v=>t.setSession(v),cancelPreview:()=>t.cancelPreview(),discardDiagnostics:()=>t.discardDiagnostics(),dismissSetup:()=>t.dismissSetup(),openSetup:()=>t.openSetup(),showHome:()=>t.showHome(),openSettings:t.openSettings,refresh:()=>t.refresh()});e.slots.inject("shell.overlay",()=>e.slots.register({name:"shell.overlay",id:"whale-ear",locale:"whaleEar",inject:()=>({geometry:o,sizing:i,recordUserOperation:n.user,setPanelVisible:t.setPanelVisible,closeAuthorization:t.closeAuthorization,refresh:()=>t.refresh(),showHome:()=>t.showHome(),dismissSetup:()=>t.dismissSetup(),hooks:{whaleUi:t,whalePreferences:r}}),children:{"whale-ear.panel.controls":{kind:"single",scope:"root"}}},Dd)),e.slots.inject("whale-ear.panel.controls",()=>e.slots.register({name:"whale-ear.panel.controls",locale:"whaleEar",inject:()=>({...y(),controlContext:f,retryVoiceTranscript:t.retryVoiceTranscript})},$d))}
return module.exports;}});
