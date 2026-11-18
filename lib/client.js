window.__ModuleLoader__.load({id:"dsh-fish-voice",factory:(require)=>{var module={exports:{}};var exports=module.exports;
var xr=Object.defineProperty;var ip=Object.getOwnPropertyDescriptor;var sp=Object.getOwnPropertyNames;var ap=Object.prototype.hasOwnProperty;var Ki=(e,n)=>{for(var t in n)xr(e,t,{get:n[t],enumerable:!0})},lp=(e,n,t,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let i of sp(n))!ap.call(e,i)&&i!==t&&xr(e,i,{get:()=>n[i],enumerable:!(o=ip(n,i))||o.enumerable});return e};var cp=e=>lp(xr({},"__esModule",{value:!0}),e);var hg={};Ki(hg,{apply:()=>fg,inject:()=>mg});module.exports=cp(hg);var Rt=require("react");var gn={rail:"K_kxsq_rail",fill:"K_kxsq_fill",collapseInner:"K_kxsq_collapseInner",input:"K_kxsq_input",toggle:"K_kxsq_toggle",range:"K_kxsq_range",collapse:"K_kxsq_collapse",toggleTrack:"K_kxsq_toggleTrack",thumb:"K_kxsq_thumb",text:`.K_kxsq_range {
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

.K_kxsq_rail {
  background: var(--dsw-alias-border-l2, #8791a4);
  pointer-events: none;
  border-radius: 999px;
  height: 6px;
  position: absolute;
  inset: 13px 9px;
  min-width: 0 !important;
  margin: 0 !important;
}

.K_kxsq_fill {
  width: var(--whale-range-position);
  background: var(--dsw-alias-brand-primary, #8ba9e7);
  border-radius: inherit;
  transition: width var(--whale-duration, .2s) var(--whale-ease, ease-out);
  position: absolute;
  inset: 0 auto 0 0;
  min-width: 0 !important;
  margin: 0 !important;
}

.K_kxsq_thumb {
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

.K_kxsq_range .K_kxsq_input {
  opacity: 0;
  cursor: pointer;
  touch-action: pan-y;
  height: 32px;
  margin: 0;
  position: absolute;
  inset: 0;
  width: 100% !important;
}

.K_kxsq_range:focus-within {
  outline: 2px solid var(--dsw-focus-ring-color, #8ba9e7);
  outline-offset: 2px;
  border-radius: 6px;
}

.K_kxsq_range:hover .K_kxsq_thumb {
  box-shadow: 0 0 0 4px color-mix(in srgb,var(--dsw-alias-brand-primary, #8ba9e7) 18%,transparent);
}

.K_kxsq_range[data-dragging] :is(.K_kxsq_thumb, .K_kxsq_fill) {
  transition-duration: 40ms;
  transition-timing-function: linear;
}

.K_kxsq_range[data-disabled], .K_kxsq_toggle[data-disabled] {
  opacity: .5;
}

.K_kxsq_range[data-disabled] .K_kxsq_input {
  cursor: not-allowed;
}

.K_kxsq_collapse {
  opacity: 0;
  visibility: hidden;
  grid-template-rows: 0fr;
  transition: grid-template-rows .16s ease-out, opacity .12s ease-out, visibility .16s;
  display: grid;
}

.K_kxsq_collapse[data-open="true"] {
  opacity: 1;
  visibility: visible;
  grid-template-rows: 1fr;
}

.K_kxsq_collapseInner {
  min-height: 0;
  overflow: hidden;
}

.K_kxsq_toggle {
  cursor: pointer;
  align-items: center;
  gap: 8px;
  width: fit-content;
  max-width: 100%;
  font-size: 12px;
  display: flex;
  position: relative;
}

.K_kxsq_toggle > input {
  opacity: 0;
  width: 38px;
  height: 24px;
  margin: 0;
  position: absolute;
}

.K_kxsq_toggleTrack {
  pointer-events: none;
  background: var(--dsw-alias-border-l2, #8791a4);
  width: 36px;
  height: 22px;
  transition: background-color var(--whale-duration, .2s);
  border-radius: 999px;
  flex: none;
  position: relative;
}

.K_kxsq_toggleTrack > span {
  background: var(--dsw-alias-bg-layer-1, #fff);
  width: 16px;
  height: 16px;
  transition: left var(--whale-duration, .2s) var(--whale-ease, ease-out);
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
}

.K_kxsq_toggle > input:checked + .K_kxsq_toggleTrack {
  background: var(--dsw-alias-brand-primary, #8ba9e7);
}

.K_kxsq_toggle > input:checked + .K_kxsq_toggleTrack > span {
  left: 17px;
}

.K_kxsq_toggle > input:focus-visible + .K_kxsq_toggleTrack {
  outline: 2px solid var(--dsw-focus-ring-color, #8ba9e7);
  outline-offset: 2px;
}

[data-motion="firm"] :is(.K_kxsq_range, .K_kxsq_toggle, .K_kxsq_collapse) {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="firm"] .K_kxsq_collapse {
  transition-duration: .1s;
}

[data-motion="off"] :is(.K_kxsq_range, .K_kxsq_toggle, .K_kxsq_collapse), [data-motion="off"] :is(.K_kxsq_range, .K_kxsq_toggle, .K_kxsq_collapse) * {
  transition: none !important;
  animation: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .K_kxsq_range, .K_kxsq_toggle, .K_kxsq_collapse, .K_kxsq_range *, .K_kxsq_toggle *, .K_kxsq_collapse * {
    transition: none !important;
    animation: none !important;
  }
}

@media (forced-colors: active) {
  .K_kxsq_range .K_kxsq_input {
    opacity: 1;
    position: relative;
  }

  .K_kxsq_rail {
    display: none;
  }

  .K_kxsq_toggleTrack {
    border: 1px solid buttontext;
  }

  .K_kxsq_toggleTrack > span {
    background: buttontext;
  }

  .K_kxsq_toggle > input:checked + .K_kxsq_toggleTrack {
    background: highlight;
  }
}
`};var Xe=require("react/jsx-runtime"),Wi=gn.text;function Zt({value:e,defaultValue:n=0,min:t=0,max:o=100,disabled:i,onChange:r,onPointerDown:s,onPointerUp:c,onPointerCancel:l,onLostPointerCapture:u,className:d="",style:p,...h}){let[m,v]=(0,Rt.useState)(n),[g,b]=(0,Rt.useState)(!1);(0,Rt.useEffect)(()=>{i&&b(!1)},[i]);let k=Number(e??m),N=Number(t),D=Number(o),P=D>N&&Number.isFinite(k)?Math.max(0,Math.min(1,(k-N)/(D-N))):0,L=I=>q=>{b(!1),I?.(q)};return(0,Xe.jsxs)("span",{className:gn.range,"data-whale-motion-range":!0,"data-dragging":g&&!i||void 0,"data-disabled":i||void 0,style:{"--whale-range-position":`${P*100}%`},children:[(0,Xe.jsxs)("span",{className:gn.rail,"aria-hidden":"true",children:[(0,Xe.jsx)("span",{className:gn.fill}),(0,Xe.jsx)("span",{className:gn.thumb})]}),(0,Xe.jsx)("input",{...h,className:`${gn.input} ${d}`,style:p,type:"range",min:t,max:o,value:e??m,disabled:i,onChange:I=>{i||(e===void 0&&v(I.target.value),r?.(I))},onPointerDown:I=>{i||b(!0),s?.(I)},onPointerUp:L(c),onPointerCancel:L(l),onLostPointerCapture:L(u),onBlur:I=>{b(!1),h.onBlur?.(I)}})]})}function Ji({open:e,children:n,className:t="",...o}){return(0,Xe.jsx)("div",{...o,className:`${gn.collapse} ${t}`,"data-open":!!e,"aria-hidden":!e,inert:e?void 0:"",children:(0,Xe.jsx)("div",{className:gn.collapseInner,children:n})})}function Ft({label:e,checked:n,disabled:t,onChange:o,...i}){return(0,Xe.jsxs)("label",{className:gn.toggle,"data-disabled":t||void 0,children:[(0,Xe.jsx)("input",{...i,type:"checkbox",role:"switch",checked:n,disabled:t,onChange:r=>o?.(r.target.checked)}),(0,Xe.jsx)("span",{className:gn.toggleTrack,"aria-hidden":"true",children:(0,Xe.jsx)("span",{})}),(0,Xe.jsx)("span",{children:e})]})}function Gi(e,{onReady:n,onError:t,visible:o=()=>!0,schedule:i=setTimeout,unschedule:r=clearTimeout}={}){let s=!1,c=!1,l=!1,u=null,d=0,p=null,h=()=>{u!==null&&r(u),u=null},m=async()=>{if(!(s||c||l||!o())){h(),c=!0;try{let v=await e();if(s){await v.dispose();return}try{n(v)}catch(g){throw await v.dispose(),g}p=v,l=!0,d=0}catch(v){if(s)return;t(v),d++,o()&&(u=i(()=>{u=null,m()},Math.min(3e4,750*2**Math.min(d-1,6))),u?.unref?.())}finally{c=!1}}};return{start:m,visibilityChanged(){o()?m():h()},refresh(){m()},dispose(){s=!0,h(),p?.dispose()}}}function Ut(e){return e===null||e&&typeof e=="object"&&!Array.isArray(e)&&Object.keys(e).sort().join(",")==="backend,id,name"&&["winmm","portaudio"].includes(e.backend)&&typeof e.id=="string"&&e.id.length>0&&e.id.length<=1024&&typeof e.name=="string"&&e.name.trim().length>0&&e.name.length<=256&&!/[\u0000-\u001f\u007f]/.test(e.id+e.name)}function Xi(e){return e&&e.schema===1&&["input","output"].every(n=>{let t=e[n];return!t||!["available","empty","unavailable"].includes(t.status)||!Array.isArray(t.items)||t.items.length>128||!(t.reason===null||typeof t.reason=="string"&&t.reason.length<=128)?!1:t.items.every(o=>o!==null&&Ut(o))&&new Set(t.items.map(o=>o.backend+":"+o.id)).size===t.items.length&&(t.status==="available"?t.items.length>0:t.items.length===0)})}var ft=Object.freeze(["ptt","always","wake"]),xo=e=>({ptt:"pttMode",always:"alwaysMode",wake:"wakeMode"})[e]??"modeUnknown",Yi=e=>["waiting","listening"].includes(e?.state)&&e?.streamOpen!==!0?"unknown":{disabled:"wakeDisabled",starting:"wakeStarting",waiting:"wakeWaiting",listening:"wakeListening",paused:"wakePaused",error:"wakeError"}[e?.state]??"unknown",Qi=e=>e!==null&&typeof e=="object"&&!Array.isArray(e)&&["disabled","starting","waiting","listening","paused","error"].includes(e.state)&&(e.deadlineAt===null||Number.isFinite(e.deadlineAt)&&e.deadlineAt>=0)&&typeof e.streamOpen=="boolean"&&["asr-after-utterance","acoustic-after-utterance"].includes(e.detection),es=e=>[...new Set(String(e).split(/[,，\n]/).map(n=>n.trim()).filter(Boolean))],ko=e=>Array.isArray(e)&&e.length>=1&&e.length<=8&&new Set(e.map(n=>typeof n=="string"?n.toLowerCase():n)).size===e.length&&e.every(n=>typeof n=="string"&&n.trim()===n&&n.length>=2&&n.length<=24&&!/[\p{C}]/u.test(n)&&/[\p{L}\p{N}]/u.test(n));function ns(e){if(!e||typeof e!="object"||Array.isArray(e)||!["unknown","available","empty","unavailable"].includes(e.status)||!Array.isArray(e.items)||e.items.length>128)return!1;if(e.status==="unknown")return e.observedAt===null&&e.items.length===0;if(!Number.isFinite(e.observedAt)||e.observedAt<0)return!1;if(e.status!=="available")return e.items.length===0;let n=new Set;return e.items.length>0&&e.items.every(t=>!t||typeof t!="object"||Array.isArray(t)||!Number.isSafeInteger(t.index)||t.index<0||n.has(t.index)||typeof t.name!="string"||!t.name.trim()||t.name.length>256||/[\u0000-\u001f\u007f]/.test(t.name)?!1:(n.add(t.index),!0))}var oe={};Ki(oe,{BIGINT_FORMAT_RANGES:()=>Bo,CONSTANT_CATCH:()=>ds,Class:()=>Mr,NUMBER_FORMAT_RANGES:()=>Vt,aborted:()=>bn,allowsEval:()=>Lr,assert:()=>hp,assertEqual:()=>up,assertIs:()=>mp,assertNever:()=>fp,assertNotEqual:()=>dp,assignProp:()=>rn,attachSchema:()=>jt,base64ToUint8Array:()=>cs,base64urlToUint8Array:()=>Ep,cached:()=>bt,captureStackTrace:()=>Mo,cleanEnum:()=>Ap,cleanRegex:()=>Ht,clone:()=>vn,cloneDef:()=>bp,codePointLength:()=>Kt,constantCatch:()=>ps,createTransparentProxy:()=>Sp,defineLazy:()=>qr,defineLazyInternal:()=>ue,derived:()=>Tp,esc:()=>zr,escapeRegex:()=>Pn,explicitlyAborted:()=>Er,extend:()=>Bp,finalizeIssue:()=>yn,floatSafeRemainder:()=>Br,getElementAtPath:()=>yp,getEnumValues:()=>gt,getLengthableOrigin:()=>Wt,getParsedType:()=>kp,getSizableOrigin:()=>ls,hexToUint8Array:()=>Dp,hide:()=>Co,installLazyProp:()=>Fp,isObject:()=>rt,isPlainObject:()=>jn,issue:()=>_t,joinValues:()=>So,jsonStringifyReplacer:()=>vt,members:()=>Dr,merge:()=>zp,mergeDefs:()=>Ln,normalizeParams:()=>te,nullish:()=>Nr,numKeys:()=>xp,objectClone:()=>gp,omit:()=>Np,optionalKeys:()=>Ar,own:()=>Vn,parsedType:()=>Ir,partial:()=>Cp,pick:()=>Mp,prefixIssues:()=>An,primitiveTypes:()=>ss,promiseAllObject:()=>_p,propertyKeyTypes:()=>Pr,randomString:()=>wp,rawShape:()=>yt,required:()=>Lp,safeExtend:()=>qp,shallowClone:()=>is,sizeCaps:()=>zo,slugify:()=>Cr,stringifyPrimitive:()=>No,toZod:()=>pp,uint8ArrayToBase64:()=>us,uint8ArrayToBase64url:()=>Ip,uint8ArrayToHex:()=>$p,unwrapMessage:()=>ht});function up(e){return e}function dp(e){return e}function pp(){return e=>e}function mp(e){}function fp(e){throw new Error("Unexpected value in exhaustive check")}function hp(e){}function gt(e){let n=Object.values(e).filter(o=>typeof o=="number");return Object.entries(e).filter(([o,i])=>n.indexOf(+o)===-1).map(([o,i])=>i)}function So(e,n="|"){return e.map(t=>No(t)).join(n)}function vt(e,n){return typeof n=="bigint"?n.toString():n}var Sr=class{constructor(n){this._getter=n,this._value=void 0}get value(){let n=this._getter;return n!==void 0&&(this._value=n(),this._getter=void 0),this._value}};function bt(e){return new Sr(e)}function Nr(e){return e==null}function Ht(e){let n=e.startsWith("^")?1:0,t=e.endsWith("$")?e.length-1:e.length;return e.slice(n,t)}function Br(e,n){let t=e/n,o=Math.round(t),i=4*Number.EPSILON*Math.max(Math.abs(t),1);return Math.abs(t-o)<i?0:t-o}var ts=Symbol("evaluating");function qr(e,n,t){let o;Object.defineProperty(e,n,{get(){if(o!==ts)return o===void 0&&(o=ts,o=t()),o},set(i){Object.defineProperty(e,n,{value:i})},configurable:!0})}function gp(e){return Object.create(Object.getPrototypeOf(e),Object.getOwnPropertyDescriptors(e))}function rn(e,n,t){Object.defineProperty(e,n,{value:t,writable:!0,enumerable:!0,configurable:!0})}function yt(e){let n=Object.getOwnPropertyDescriptor(e,"shape");return n?.get?n.get.raw:n?.value}function Cn(e){return yt(e._zod.def)??e._zod.def.shape}function os(e,n,t){Object.defineProperty(e,n,{get(){let o=t();return rn(this,n,o),o},enumerable:!0,configurable:!0})}function rs(e,n,t){n in e?rn(e,n,t):e[n]=t}function ot(e,n,t,o){let i=Cn(n);for(let r of t){let s=Object.getOwnPropertyDescriptor(i,r);s.enumerable&&(s.get?os(e,r,()=>{let c=n._zod.def.shape[r];return o?o(c,r):c}):rs(e,r,o?o(s.value,r):s.value))}}function vp(e,n){for(let t of Reflect.ownKeys(n)){let o=Object.getOwnPropertyDescriptor(n,t);o.enumerable&&(o.get?os(e,t,()=>n[t]):rs(e,t,o.value))}}function Ln(...e){let n={};for(let t of e){let o=Object.getOwnPropertyDescriptors(t);Object.assign(n,o)}return Object.defineProperties({},n)}function bp(e){return Ln(e._zod.def)}function yp(e,n){return n?n.reduce((t,o)=>t?.[o],e):e}function _p(e){let n=Object.keys(e),t=n.map(o=>e[o]);return Promise.all(t).then(o=>{let i={};for(let r=0;r<n.length;r++)i[n[r]]=o[r];return i})}function wp(e=10){let n="abcdefghijklmnopqrstuvwxyz",t="";for(let o=0;o<e;o++)t+=n[Math.floor(Math.random()*n.length)];return t}function zr(e){return JSON.stringify(e)}function Cr(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/[\s_-]+/g,"-").replace(/^-+|-+$/g,"")}var Mo="captureStackTrace"in Error?Error.captureStackTrace:(...e)=>{};function rt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}var Lr=bt(()=>{if(Ye.jitless||typeof navigator<"u"&&navigator?.userAgent?.includes("Cloudflare"))return!1;try{let e=Function;return new e(""),!0}catch{return!1}});function jn(e){if(rt(e)===!1)return!1;let n=e.constructor;if(n===void 0||typeof n!="function")return!0;let t=n.prototype;return!(rt(t)===!1||Object.prototype.hasOwnProperty.call(t,"isPrototypeOf")===!1)}function is(e){return jn(e)?{...e}:Array.isArray(e)?[...e]:e instanceof Map?new Map(e):e instanceof Set?new Set(e):e}function xp(e){let n=0;for(let t in e)Object.prototype.hasOwnProperty.call(e,t)&&n++;return n}var kp=e=>{let n=typeof e;switch(n){case"undefined":return"undefined";case"string":return"string";case"number":return Number.isNaN(e)?"nan":"number";case"boolean":return"boolean";case"function":return"function";case"bigint":return"bigint";case"symbol":return"symbol";case"object":return Array.isArray(e)?"array":e===null?"null":e.then&&typeof e.then=="function"&&e.catch&&typeof e.catch=="function"?"promise":typeof Map<"u"&&e instanceof Map?"map":typeof Set<"u"&&e instanceof Set?"set":typeof Date<"u"&&e instanceof Date?"date":typeof File<"u"&&e instanceof File?"file":"object";default:throw new Error(`Unknown data type: ${n}`)}},Pr=new Set(["string","number","symbol"]),ss=new Set(["string","number","bigint","boolean","symbol","undefined"]);function Pn(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function vn(e,n,t){let o=new e._zod.constr(n??e._zod.def);return(!n||t?.parent)&&(o._zod.parent=e),o}function te(e){let n=e;if(!n)return{};if(typeof n=="string")return{error:()=>n};if(n?.message!==void 0){if(n?.error!==void 0)throw new Error("Cannot specify both `message` and `error` params");n.error=n.message}return delete n.message,typeof n.error=="string"?{...n,error:()=>n.error}:n}function Sp(e){let n;return new Proxy({},{get(t,o,i){return n??(n=e()),Reflect.get(n,o,i)},set(t,o,i,r){return n??(n=e()),Reflect.set(n,o,i,r)},has(t,o){return n??(n=e()),Reflect.has(n,o)},deleteProperty(t,o){return n??(n=e()),Reflect.deleteProperty(n,o)},ownKeys(t){return n??(n=e()),Reflect.ownKeys(n)},getOwnPropertyDescriptor(t,o){return n??(n=e()),Reflect.getOwnPropertyDescriptor(n,o)},defineProperty(t,o,i){return n??(n=e()),Reflect.defineProperty(n,o,i)}})}function No(e){return typeof e=="bigint"?e.toString()+"n":typeof e=="string"?`"${e}"`:`${e}`}function Ar(e){return Object.keys(e).filter(n=>e[n]._zod.optin!==void 0&&e[n]._zod.optout==="optional")}var Vt={safeint:[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],int32:[-2147483648,2147483647],uint32:[0,4294967295],float32:[-34028234663852886e22,34028234663852886e22],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]},Bo={int64:[BigInt("-9223372036854775808"),BigInt("9223372036854775807")],uint64:[BigInt(0),BigInt("18446744073709551615")]};function Mp(e,n){let t=e._zod.def,o=t.checks;if(o&&o.length>0)throw new Error(".pick() cannot be used on object schemas containing refinements");let r={};return ot(r,e,qo(e,n)),vn(e,Ln(t,{shape:r,checks:[]}))}function qo(e,n){let t=Cn(e),o=[];for(let i of Reflect.ownKeys(n)){if(!Object.getOwnPropertyDescriptor(t,i)?.enumerable)throw new Error(`Unrecognized key: "${String(i)}"`);n[i]&&o.push(i)}return o}function Np(e,n){let t=e._zod.def,o=t.checks;if(o&&o.length>0)throw new Error(".omit() cannot be used on object schemas containing refinements");let r=new Set(qo(e,n)),s={};return ot(s,e,Reflect.ownKeys(Cn(e)).filter(c=>!r.has(c))),vn(e,Ln(t,{shape:s,checks:[]}))}function Bp(e,n){if(!jn(n))throw new Error("Invalid input to extend: expected a plain object");let t=e._zod.def.checks;if(t&&t.length>0){let i=Cn(e);for(let r of Reflect.ownKeys(n))if(Object.getOwnPropertyDescriptor(i,r)!==void 0)throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.")}return vn(e,Ln(e._zod.def,{shape:as(e,n)}))}function as(e,n){let t={};return ot(t,e,Reflect.ownKeys(Cn(e))),vp(t,n),t}function qp(e,n){if(!jn(n))throw new Error("Invalid input to safeExtend: expected a plain object");return vn(e,Ln(e._zod.def,{shape:as(e,n)}))}function zp(e,n){if(!n?._zod?.def)throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");if(e._zod.def.checks?.length)throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");let t={};ot(t,e,Reflect.ownKeys(Cn(e))),ot(t,n,Reflect.ownKeys(Cn(n)));let o=Ln(e._zod.def,{shape:t,get catchall(){return n._zod.def.catchall},checks:n._zod.def.checks??[]});return vn(e,o)}function Cp(e,n,t,o="partial"){let r=n._zod.def.checks;if(r&&r.length>0)throw new Error(`.${o}() cannot be used on object schemas containing refinements`);let c=t?new Set(qo(n,t)):void 0,l={};return ot(l,n,Reflect.ownKeys(Cn(n)),e&&((u,d)=>c&&!c.has(d)?u:new e({type:"optional",innerType:u}))),vn(n,Ln(n._zod.def,{shape:l,checks:[]}))}function Lp(e,n,t){let o=t?new Set(qo(n,t)):void 0,i={};return ot(i,n,Reflect.ownKeys(Cn(n)),(r,s)=>o&&!o.has(s)?r:new e({type:"nonoptional",innerType:r})),vn(n,Ln(n._zod.def,{shape:i}))}function bn(e,n=0){if(e.aborted===!0)return!0;for(let t=n;t<e.issues.length;t++)if(e.issues[t]?.continue!==!0)return!0;return!1}function Er(e,n=0){if(e.aborted===!0)return!0;for(let t=n;t<e.issues.length;t++)if(e.issues[t]?.continue===!1)return!0;return!1}function An(e,n){return n.map(t=>{var o;return(o=t).path??(o.path=[]),t.path.unshift(e),t})}function ht(e){return typeof e=="string"?e:e?.message}function zo(e){let n=[];for(let t of e??[]){let o=t._zod.def;if(!/_(length|size)$|_equals$/.test(o.check))break;let i=o.maximum??o.length??o.size;i>=0&&n.push([i,t])}return n}function jt(e,n,t){var o;for(let i=n;i<e.length;i++)(o=e[i]).schema??(o.schema=t)}function yn(e,n,t){var o;let i=e.inst?._zod?.traits;i?.has("$ZodType")&&(i.has("$ZodCheck")?(o=e).schema??(o.schema=e.inst):e.schema=e.inst);let r=e.schema!==e.inst?e.schema?._zod.def?.error:void 0,s=e.message?e.message:ht(e.inst?._zod.def?.error?.(e))??ht(r?.(e))??ht(n?.error?.(e))??ht(t.customError?.(e))??ht(t.localeError?.(e))??"Invalid input",c={};for(let l of Object.keys(e))l==="inst"||l==="schema"||l==="continue"||l==="input"||l==="__proto__"||(c[l]=e[l]);return c.path??(c.path=[]),c.message=s,n?.reportInput&&(c.input=e.input),c}function ls(e){return e instanceof Set?"set":e instanceof Map?"map":e instanceof File?"file":"unknown"}var Pp=/[\uD800-\uDBFF]/;function Kt(e){let n=e.length;if(!Pp.test(e))return n;let t=n;for(let o=0;o<n-1;o++)(e.charCodeAt(o)&64512)===55296&&(e.charCodeAt(o+1)&64512)===56320&&(t--,o++);return t}function Wt(e){return Array.isArray(e)?"array":typeof e=="string"?"string":"unknown"}function Ir(e){let n=typeof e;switch(n){case"number":return Number.isNaN(e)?"nan":"number";case"object":{if(e===null)return"null";if(Array.isArray(e))return"array";let t=e;if(t&&Object.getPrototypeOf(t)!==Object.prototype&&"constructor"in t&&t.constructor)return t.constructor.name}}return n}function _t(...e){let[n,t,o]=e;return typeof n=="string"?{message:n,code:"custom",input:t,inst:o}:{...n}}function Ap(e){return Object.entries(e).filter(([n,t])=>Number.isNaN(Number.parseInt(n,10))).map(n=>n[1])}function cs(e){let n=atob(e),t=new Uint8Array(n.length);for(let o=0;o<n.length;o++)t[o]=n.charCodeAt(o);return t}function us(e){let n="";for(let t=0;t<e.length;t++)n+=String.fromCharCode(e[t]);return btoa(n)}function Ep(e){let n=e.replace(/-/g,"+").replace(/_/g,"/"),t="=".repeat((4-n.length%4)%4);return cs(n+t)}function Ip(e){return us(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}function Dp(e){let n=e.replace(/^0x/,"");if(n.length%2!==0)throw new Error("Invalid hex string length");let t=new Uint8Array(n.length/2);for(let o=0;o<n.length;o+=2)t[o/2]=Number.parseInt(n.slice(o,o+2),16);return t}function $p(e){return Array.from(e).map(n=>n.toString(16).padStart(2,"0")).join("")}var Mr=class{constructor(...n){}};function Dr(e,n){for(let t in n){let o=Object.getOwnPropertyDescriptor(n,t);o.get?Object.defineProperty(e,t,{...o,enumerable:!1}):Op(e,t,o.value)}}function Vn(e,n,t,o=!0){return Object.defineProperty(e,n,{configurable:!0,writable:!0,enumerable:o,value:t}),t}function Co(e,n,t){return Vn(e,n,t,!1)}function Tp(e,n){for(let t in e){let o=e[t];Object.defineProperty(n,t,{configurable:!0,enumerable:!0,get(){return Vn(this,t,o(this))},set(i){Vn(this,t,i)}})}return n}function Op(e,n,t){Object.defineProperty(e,n,{configurable:!0,get(){return this==null?t:Vn(this,n,t.bind(this))},set(o){Vn(this,n,o)}})}function Rp(e,n){let t=Object.getPrototypeOf(e);return n in t?void 0:t}var kr,Hn=!1,Zp={configurable:!0,get(){Hn=!0}};function ue(e,n,t){let o=Object.getPrototypeOf(e._zod);if(n in o&&kr!==e._zod){kr=void 0;return}kr=e._zod,Object.defineProperty(o,n,{configurable:!0,get(){Object.defineProperty(this,n,Zp);let i=Hn;Hn=!1;try{let r=t(this);return Hn?delete this[n]:Object.defineProperty(this,n,{configurable:!0,writable:!0,value:r}),Hn=Hn||i,r}catch(r){throw delete this[n],Hn=Hn||i,r}},set(i){Object.defineProperty(this,n,{configurable:!0,writable:!0,value:i})}})}function Fp(e,n,t,o){let i=Rp(e,n);i&&Object.defineProperty(i,n,{configurable:!0,get(){let r={configurable:!0,writable:!0,enumerable:o,value:void 0};return Object.defineProperty(this,n,r),r.value=t(this),Object.defineProperty(this,n,r),r.value},set(r){Object.defineProperty(this,n,{configurable:!0,writable:!0,enumerable:o,value:r})}})}var ds="~constantCatch";function ps(e){let n=()=>e;return n[ds]=!0,n}var ms;var $r={value:void 0,enumerable:!1},fs="captureStackTrace"in Error?Error:null;function Up(e){let n=fs;if(n){let t=n.stackTraceLimit;if(typeof t=="number"){try{n.stackTraceLimit=0}catch{return fs=null,new e}try{return new e}finally{n.stackTraceLimit=t}}}return new e}function $(e,n,t,o){let i={};function r(h){this.def=h,this.constr=p,this.traits=new Set}r.prototype=i;let s=t,c=s&&new WeakSet;function l(h,m){if(h._zod){if(h._zod.traits.has(e))return}else{$r.value=new r(m);try{Object.defineProperty(h,"_zod",$r)}finally{$r.value=void 0}}if(h._zod.traits.add(e),n(h,m),c){let g=Object.getPrototypeOf(h),b=h._zod.constr.prototype,k=g;for(;k&&k!==b;)k=Object.getPrototypeOf(k);let N=k??g;c.has(N)||(c.add(N),Dr(N,s))}let v=p.prototype;for(let g in v)Object.prototype.hasOwnProperty.call(v,g)&&(g in h||(h[g]=v[g].bind(h)))}let u=o?.Parent??Object;class d extends u{}Object.defineProperty(d,"name",{value:e});function p(h){let m=o?.Parent?Up(d):this;l(m,h);let v=m._zod.deferred;if(v){for(let b of v)b();m._zod.deferred=void 0}let g=globalThis.__zod_globalConfig?.postProcessor;return g&&g(m),m}return Object.defineProperty(p,"init",{value:l}),Object.defineProperty(p,Symbol.hasInstance,{value:h=>o?.Parent&&h instanceof o.Parent?!0:h?._zod?.traits?.has(e)}),Object.defineProperty(p,"name",{value:e}),p}var _n=class extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}},wt=class extends Error{constructor(n){super(`Encountered unidirectional transform during encode: ${n}`),this.name="ZodEncodeError"}};(ms=globalThis).__zod_globalConfig??(ms.__zod_globalConfig={});var Ye=globalThis.__zod_globalConfig;function sn(e){return e&&Object.assign(Ye,e),Ye}function Hp(){let e=this._zod;return e.message??(e.message=JSON.stringify(e.def,vt,2)),e.message}function Vp(e){this._zod.message=e}var jp={get:Hp,set:Vp,enumerable:!0,configurable:!0},Or={value:void 0,enumerable:!1},hs=new WeakSet([Object.prototype,Error.prototype]),gs=(e,n)=>{e.name="$ZodError",Or.value=n,Object.defineProperty(e,"issues",Or),Or.value=void 0,Object.defineProperty(e,"message",jp);let t=Object.getPrototypeOf(e);hs.has(t)||(hs.add(t),Object.defineProperty(t,"toString",{configurable:!0,enumerable:!1,get(){let o=()=>this.message;return Object.defineProperty(this,"toString",{value:o,configurable:!0,writable:!0}),o},set(o){Object.defineProperty(this,"toString",{value:o,configurable:!0,writable:!0})}}))},vs=$("$ZodError",gs),Bg=$("$ZodError",gs,void 0,{Parent:Error});function Kp(e,n,t){return Object.prototype.hasOwnProperty.call(e,n)||(n==="__proto__"?Object.defineProperty(e,n,{value:t(),writable:!0,enumerable:!0,configurable:!0}):e[n]=t()),e[n]}function bs(e,n=t=>t.message){let t={},o=[];for(let i of e.issues)i.path.length>0?Kp(t,i.path[0],()=>[]).push(n(i)):o.push(n(i));return{formErrors:o,fieldErrors:t}}function ys(e,n=t=>t.message){let t={_errors:[]},o=(i,r=[])=>{for(let s of i.issues)if(s.code==="invalid_union"&&s.errors.length)s.errors.map(c=>o({issues:c},[...r,...s.path]));else if(s.code==="invalid_key")o({issues:s.issues},[...r,...s.path]);else if(s.code==="invalid_element")o({issues:s.issues},[...r,...s.path]);else{let c=[...r,...s.path];if(c.length===0)t._errors.push(n(s));else{let l=t,u=0;for(;u<c.length;){let d=c[u],p=u===c.length-1;if(d==="_errors"){p&&l._errors.push(n(s)),u++;continue}Object.prototype.hasOwnProperty.call(l,d)||Object.defineProperty(l,d,{value:{_errors:[]},enumerable:!0,writable:!0,configurable:!0});let h=l[d];p&&h._errors.push(n(s)),l=h,u++}}}};return o(e),t}function Lo(e,n){return{callee:n?.callee??e,Err:n?.Err}}var Po=e=>{let n=(t,o,i,r)=>{let s=i?{...i,async:!1}:{async:!1},c=t._zod.run({value:o,issues:[]},s);if(c instanceof Promise)throw new _n;if(c.issues.length){let l=new(r?.Err??e)(c.issues.map(u=>yn(u,s,sn())));throw Mo(l,r?.callee??n),l}return c.value};return n};var Ao=e=>{let n=async(t,o,i,r)=>{let s=i?{...i,async:!0}:{async:!0},c=t._zod.run({value:o,issues:[]},s);if(c instanceof Promise&&(c=await c),c.issues.length){let l=new(r?.Err??e)(c.issues.map(u=>yn(u,s,sn())));throw Mo(l,r?.callee??n),l}return c.value};return n};var Eo=e=>(n,t,o)=>{let i=o?{...o,async:!1}:{async:!1},r=n._zod.run({value:t,issues:[]},i);if(r instanceof Promise)throw new _n;return r.issues.length?_s(e,r.issues,i):{success:!0,data:r.value}};function _s(e,n,t){let o;return{success:!1,get error(){return o||(o=new e(n.map(i=>yn(i,t,sn()))),n=void 0,t=void 0),o},set error(i){o=i,n=void 0,t=void 0}}}var Io=e=>async(n,t,o)=>{let i=o?{...o,async:!0}:{async:!0},r=n._zod.run({value:t,issues:[]},i);return r instanceof Promise&&(r=await r),r.issues.length?_s(e,r.issues,i):{success:!0,data:r.value}};var Wp=Symbol.for("zod.compile.invalid"),Jp=Symbol.for("zod.compile.fallback"),Rr=((e,n,t)=>{let o=e._zod.bag.validator;if(o!==void 0){if(o(n)!==Wp)return!0;if(o.definite===!0&&t===void 0)return!1}return Gp(e,n,t)});function Gp(e,n,t){let o=t?{...t,async:!1,abortEarly:!0}:{async:!1,abortEarly:!0},i=e._zod.bag.fallbackRun,r;if(i?(o[Jp]=!0,r=i({value:n,issues:[]},o)):r=e._zod.run({value:n,issues:[]},o),r instanceof Promise)throw new _n;return r.issues.length===0}var Zr=async(e,n,t)=>{let o=t?{...t,async:!0,abortEarly:!0}:{async:!0,abortEarly:!0},i=e._zod.run({value:n,issues:[]},o);return i instanceof Promise&&(i=await i),i.issues.length===0},ws=e=>{let n=Po(e),t=(o,i,r,s)=>{let c=r?{...r,direction:"backward"}:{direction:"backward"};return n(o,i,c,Lo(t,s))};return t};var xs=e=>{let n=Po(e),t=(o,i,r,s)=>n(o,i,r,Lo(t,s));return t};var ks=e=>{let n=Ao(e),t=async(o,i,r,s)=>{let c=r?{...r,direction:"backward"}:{direction:"backward"};return await n(o,i,c,Lo(t,s))};return t};var Ss=e=>{let n=Ao(e),t=async(o,i,r,s)=>await n(o,i,r,Lo(t,s));return t};var Ms=e=>(n,t,o)=>{let i=o?{...o,direction:"backward"}:{direction:"backward"};return Eo(e)(n,t,i)};var Ns=e=>(n,t,o)=>Eo(e)(n,t,o);var Bs=e=>async(n,t,o)=>{let i=o?{...o,direction:"backward"}:{direction:"backward"};return Io(e)(n,t,i)};var qs=e=>async(n,t,o)=>Io(e)(n,t,o);var zs=/^[cC][0-9a-z]{6,}$/,Cs=/^[0-9a-z]+$/,Ls=/^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/,Ps=/^[0-9a-vA-V]{20}$/,As=/^[A-Za-z0-9]{27}$/,Es=/^[a-zA-Z0-9_-]{21}$/;function Is(e){return new RegExp(`^[a-zA-Z0-9_-]{${e}}$`)}var Ds=/^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;var $s=/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,Ur=e=>e?new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`):/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;var Ts=/^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;var Xp="^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";function Os(){return new RegExp(Xp,"u")}var Rs=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,Zs=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;var Fs=/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,Us=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,Hs=/^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,Vs=/^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/;var js=/^https?$/,Ks=/^\+[1-9]\d{6,14}$/;var Ws="(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";function Yp(e){return new RegExp(`^${e}$`)}var Js=Yp(Ws);function Fr(e){let n="(?:[01]\\d|2[0-3]):[0-5]\\d";return typeof e.precision=="number"?e.precision===-1?`${n}`:e.precision===0?`${n}:[0-5]\\d`:`${n}:[0-5]\\d\\.\\d{${e.precision}}`:e.seconds?`${n}:[0-5]\\d(?:\\.\\d+)?`:`${n}(?::[0-5]\\d(?:\\.\\d+)?)?`}function Gs(e){return new RegExp(`^${Fr(e)}$`)}function Xs(e){let n=["Z"];e.offset&&n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");let t=`${Fr({precision:e.precision,seconds:!0})}(?:${n.join("|")})`,o=e.local?`${t}|${Fr({precision:e.precision})}`:t;return new RegExp(`^${Ws}T(?:${o})$`)}var Ys=/^[\s\S]{0,}$/;var Hr=/^-?\d+$/,Jt=/^-?\d+(?:\.\d+)?$/,Qs=/^(?:true|false)$/i,ea=/^null$/i;var na=/^[^A-Z]*$/,ta=/^[^a-z]*$/;var He=$("$ZodCheck",(e,n)=>{var t;e._zod??(e._zod={}),e._zod.def=n,(t=e._zod).onattach??(t.onattach=[])});var Vr=e=>{let n=e.value;return!Nr(n)&&n.length!==void 0},Do={number:"number",bigint:"bigint",object:"date"},jr=$("$ZodCheckLessThan",(e,n)=>{He.init(e,n);let t=Do[typeof n.value];e._zod.check=o=>{(n.inclusive?o.value<=n.value:o.value<n.value)||o.issues.push({origin:Do[typeof o.value]??t,code:"too_big",maximum:typeof n.value=="object"?n.value.getTime():n.value,input:o.value,inclusive:n.inclusive,inst:e,continue:!n.abort})}}),Kr=$("$ZodCheckGreaterThan",(e,n)=>{He.init(e,n);let t=Do[typeof n.value];e._zod.check=o=>{(n.inclusive?o.value>=n.value:o.value>n.value)||o.issues.push({origin:Do[typeof o.value]??t,code:"too_small",minimum:typeof n.value=="object"?n.value.getTime():n.value,input:o.value,inclusive:n.inclusive,inst:e,continue:!n.abort})}}),oa=$("$ZodCheckMultipleOf",(e,n)=>{He.init(e,n),e._zod.check=t=>{if(typeof t.value!=typeof n.value)throw new Error("Cannot mix number and bigint in multiple_of check.");(typeof t.value=="bigint"?n.value!==BigInt(0)&&t.value%n.value===BigInt(0):Br(t.value,n.value)===0)||t.issues.push({origin:typeof t.value,code:"not_multiple_of",divisor:n.value,input:t.value,inst:e,continue:!n.abort})}}),ra=$("$ZodCheckNumberFormat",(e,n)=>{He.init(e,n),n.format=n.format||"float64";let t=n.format?.includes("int"),o=t?"int":"number",[i,r]=Vt[n.format];e._zod.check=s=>{let c=s.value;if(t){if(!Number.isInteger(c)){s.issues.push({expected:o,format:n.format,code:"invalid_type",continue:!1,input:c,inst:e});return}if(!Number.isSafeInteger(c)){c>0?s.issues.push({input:c,code:"too_big",maximum:Number.MAX_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:o,inclusive:!0,continue:!n.abort}):s.issues.push({input:c,code:"too_small",minimum:Number.MIN_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:o,inclusive:!0,continue:!n.abort});return}}c<i&&s.issues.push({origin:"number",input:c,code:"too_small",minimum:i,inclusive:!0,inst:e,continue:!n.abort}),c>r&&s.issues.push({origin:"number",input:c,code:"too_big",maximum:r,inclusive:!0,inst:e,continue:!n.abort})}});var ia=$("$ZodCheckMaxLength",(e,n)=>{var t;He.init(e,n),(t=e._zod.def).when??(t.when=Vr),e._zod.check=o=>{let i=o.value,r=i.length;if((typeof i=="string"&&r>n.maximum?Kt(i):r)<=n.maximum)return;let c=Wt(i);o.issues.push({origin:c,code:"too_big",maximum:n.maximum,inclusive:!0,input:i,inst:e,continue:!n.abort})}}),sa=$("$ZodCheckMinLength",(e,n)=>{var t;He.init(e,n),(t=e._zod.def).when??(t.when=Vr),e._zod.check=o=>{let i=o.value,r=i.length;if((typeof i=="string"&&r>=n.minimum&&r<n.minimum*2?Kt(i):r)>=n.minimum)return;let c=Wt(i);o.issues.push({origin:c,code:"too_small",minimum:n.minimum,inclusive:!0,input:i,inst:e,continue:!n.abort})}}),aa=$("$ZodCheckLengthEquals",(e,n)=>{var t;He.init(e,n),(t=e._zod.def).when??(t.when=Vr),e._zod.check=o=>{let i=o.value,r=i.length,s=typeof i=="string"&&r>=n.length&&r<=n.length*2?Kt(i):r;if(s===n.length)return;let c=Wt(i),l=s>n.length;o.issues.push({origin:c,...l?{code:"too_big",maximum:n.length}:{code:"too_small",minimum:n.length},inclusive:!0,exact:!0,input:o.value,inst:e,continue:!n.abort})}}),Xt=$("$ZodCheckStringFormat",(e,n)=>{var t,o;He.init(e,n),n.pattern?(t=e._zod).check??(t.check=i=>{n.pattern.lastIndex=0,!n.pattern.test(i.value)&&i.issues.push({origin:"string",code:"invalid_format",format:n.format,input:i.value,...n.pattern?{pattern:n.pattern.toString()}:{},inst:e,continue:!n.abort})}):(o=e._zod).check??(o.check=()=>{})}),la=$("$ZodCheckRegex",(e,n)=>{Xt.init(e,n),e._zod.check=t=>{n.pattern.lastIndex=0,!n.pattern.test(t.value)&&t.issues.push({origin:"string",code:"invalid_format",format:"regex",input:t.value,pattern:n.pattern.toString(),inst:e,continue:!n.abort})}}),ca=$("$ZodCheckLowerCase",(e,n)=>{n.pattern??(n.pattern=na),Xt.init(e,n)}),ua=$("$ZodCheckUpperCase",(e,n)=>{n.pattern??(n.pattern=ta),Xt.init(e,n)}),da=$("$ZodCheckIncludes",(e,n)=>{He.init(e,n);let t=Pn(n.includes),o=new RegExp(typeof n.position=="number"?`^.{${n.position},}${t}`:t);n.pattern=o,e._zod.check=i=>{i.value.includes(n.includes,n.position)||i.issues.push({origin:"string",code:"invalid_format",format:"includes",includes:n.includes,input:i.value,inst:e,continue:!n.abort})}}),pa=$("$ZodCheckStartsWith",(e,n)=>{He.init(e,n);let t=new RegExp(`^${Pn(n.prefix)}.*`);n.pattern??(n.pattern=t),e._zod.check=o=>{o.value.startsWith(n.prefix)||o.issues.push({origin:"string",code:"invalid_format",format:"starts_with",prefix:n.prefix,input:o.value,inst:e,continue:!n.abort})}}),ma=$("$ZodCheckEndsWith",(e,n)=>{He.init(e,n);let t=new RegExp(`.*${Pn(n.suffix)}$`);n.pattern??(n.pattern=t),e._zod.check=o=>{o.value.endsWith(n.suffix)||o.issues.push({origin:"string",code:"invalid_format",format:"ends_with",suffix:n.suffix,input:o.value,inst:e,continue:!n.abort})}});var fa=$("$ZodCheckOverwrite",(e,n)=>{He.init(e,n),e._zod.check=t=>{t.value=n.tx(t.value)}});var $o=class{constructor(n=[],t={}){this.content=[],this.indent=0,this.args=n,this.closed=t}indented(n){this.indent+=1;try{n(this)}finally{this.indent-=1}}write(n){if(typeof n=="function"){n(this,{execution:"sync"}),n(this,{execution:"async"});return}let o=n.split(`
`).filter(s=>s),i=Math.min(...o.map(s=>s.length-s.trimStart().length)),r=o.map(s=>s.slice(i)).map(s=>" ".repeat(this.indent*2)+s);for(let s of r)this.content.push(s)}compile(){let n=Function,t=this?.content??[""];return new n(...Object.keys(this.closed),`return function (${this.args.join(", ")}) {
${t.join(`
`)}
};`)(...Object.values(this.closed))}};var ga={major:4,minor:6,patch:7};var we=$("$ZodType",(e,n)=>{var t;e??(e={}),e._zod.def=n,e._zod.bag=e._zod.bag||{},e._zod.version=ga;let o=e._zod.def.checks,i=e._zod.traits.has("$ZodCheck")?[e,...o??[]]:o?.length?[...o]:[];for(let r of i)for(let s of r._zod.onattach)s(e);if(i.length===0)(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{let r=(c,l,u)=>{if(c.memo)return c;let d=bn(c),p;for(let h of l){if(h._zod.def.when){if(Er(c)||!h._zod.def.when(c))continue}else if(d)continue;let m=c.issues.length,v=h._zod.check(c);if(v instanceof Promise&&u?.async===!1)throw new _n;if(p||v instanceof Promise)p=(p??Promise.resolve()).then(async()=>{await v,c.issues.length!==m&&(jt(c.issues,m,e),d||(d=bn(c,m)))});else{if(c.issues.length===m)continue;jt(c.issues,m,e),d||(d=bn(c,m))}}return p?p.then(()=>c):c},s=(c,l,u)=>{if(bn(c))return c.aborted=!0,c;let d=r(l,i,u);if(d instanceof Promise){if(u.async===!1)throw new _n;return d.then(p=>e._zod.parse(p,u))}return e._zod.parse(d,u)};e._zod.run=(c,l)=>{if(l.skipChecks)return e._zod.parse(c,l);if(l.direction==="backward"){let d=e._zod.parse({value:c.value,issues:[]},{...l,skipChecks:!0});return d instanceof Promise?d.then(p=>s(p,c,l)):s(d,c,l)}let u=e._zod.parse(c,l);if(u instanceof Promise){if(l.async===!1)throw new _n;return u.then(d=>r(d,i,l))}return r(u,i,l)}}},{get"~standard"(){return Co(this,"~standard",Jr(this))},set"~standard"(e){Vn(this,"~standard",e)}}),Ba=(e,n)=>e.issues.length?{issues:e.issues.map(t=>yn(t,n,sn()))}:{value:e.value};async function Qp(e,n){let t={async:!0};return Ba(await e._zod.run({value:n,issues:[]},t),t)}function Jr(e){return{validate:n=>{let t={async:!1};try{let o=e._zod.run({value:n,issues:[]},t);if(!(o instanceof Promise))return Ba(o,t)}catch{}return Qp(e,n)},vendor:"zod",version:1}}var Zo=$("$ZodString",(e,n)=>{we.init(e,n),e._zod.pattern=n.pattern??Ys,e._zod.parse=(t,o)=>{if(n.coerce)try{t.value=String(t.value)}catch{}return typeof t.value=="string"||t.issues.push({expected:"string",code:"invalid_type",input:t.value,inst:e}),t}}),ke=$("$ZodStringFormat",(e,n)=>{Xt.init(e,n),Zo.init(e,n)}),qa=$("$ZodGUID",(e,n)=>{n.pattern??(n.pattern=$s),ke.init(e,n)}),za=$("$ZodUUID",(e,n)=>{if(n.version){let o={v1:1,v2:2,v3:3,v4:4,v5:5,v6:6,v7:7,v8:8}[n.version];if(o===void 0)throw new Error(`Invalid UUID version: "${n.version}"`);n.pattern??(n.pattern=Ur(o))}else n.pattern??(n.pattern=Ur());ke.init(e,n)}),Ca=$("$ZodEmail",(e,n)=>{n.pattern??(n.pattern=Ts),ke.init(e,n)}),La=1,Oo=2;function Pa(e){try{return typeof URL<"u"&&typeof URL.canParse=="function"?URL.canParse(e):(new URL(e),!0)}catch{return!1}}function em(e,n){return!("normalize"in n)&&!("hostname"in n)&&!("protocol"in n)?Pa(e)||Oo:nm(e,n)}function nm(e,n){if(!n.normalize&&n.protocol?.source===js.source&&!/^https?:\/\//i.test(e))return La;try{if(typeof URL<"u"){let t=URL;if(typeof t.parse=="function")return t.parse(e)??Oo}return new URL(e)}catch{return Oo}}var tm=/[\t\n\r]/g;function va(e){return e.replace(tm,"")}function om(e,n){return n.lastIndex=0,n.test(e.hostname)}function rm(e,n){return n.lastIndex=0,n.test(e.protocol.endsWith(":")?e.protocol.slice(0,-1):e.protocol)}var Aa=$("$ZodURL",(e,n)=>{ke.init(e,n),e._zod.check=t=>{try{let o=t.value.trim(),i=em(o,n);if(i===La){t.issues.push({code:"invalid_format",format:"url",note:"Invalid URL format",input:t.value,inst:e,continue:!n.abort});return}if(i===Oo){t.issues.push({code:"invalid_format",format:"url",input:t.value,inst:e,continue:!n.abort});return}if(i===!0){t.value=va(o);return}n.hostname&&!om(i,n.hostname)&&t.issues.push({code:"invalid_format",format:"url",note:"Invalid hostname",pattern:n.hostname.source,input:t.value,inst:e,continue:!n.abort}),n.protocol&&!rm(i,n.protocol)&&t.issues.push({code:"invalid_format",format:"url",note:"Invalid protocol",pattern:n.protocol.source,input:t.value,inst:e,continue:!n.abort}),t.value=n.normalize?i.href:va(o);return}catch{t.issues.push({code:"invalid_format",format:"url",input:t.value,inst:e,continue:!n.abort})}}}),Ea=$("$ZodEmoji",(e,n)=>{n.pattern??(n.pattern=Os()),ke.init(e,n)}),Ia=$("$ZodNanoID",(e,n)=>{if(n.length!==void 0&&(!Number.isInteger(n.length)||n.length<1))throw new Error(`Invalid nanoid length: ${n.length}`);n.pattern??(n.pattern=n.length===void 0?Es:Is(n.length)),ke.init(e,n)}),Da=$("$ZodCUID",(e,n)=>{n.pattern??(n.pattern=zs),ke.init(e,n)}),$a=$("$ZodCUID2",(e,n)=>{n.pattern??(n.pattern=Cs),ke.init(e,n)}),Ta=$("$ZodULID",(e,n)=>{n.pattern??(n.pattern=Ls),ke.init(e,n)}),Oa=$("$ZodXID",(e,n)=>{n.pattern??(n.pattern=Ps),ke.init(e,n)}),Ra=$("$ZodKSUID",(e,n)=>{n.pattern??(n.pattern=As),ke.init(e,n)}),Za=$("$ZodISODateTime",(e,n)=>{n.pattern??(n.pattern=Xs(n)),ke.init(e,n)}),Fa=$("$ZodISODate",(e,n)=>{n.pattern??(n.pattern=Js),ke.init(e,n)}),Ua=$("$ZodISOTime",(e,n)=>{n.pattern??(n.pattern=Gs(n)),ke.init(e,n)}),Ha=$("$ZodISODuration",(e,n)=>{n.pattern??(n.pattern=Ds),ke.init(e,n)}),Va=$("$ZodIPv4",(e,n)=>{n.pattern??(n.pattern=Rs),ke.init(e,n)}),im=/^[0-9a-fA-F:.]+$/;function ja(e){return im.test(e)?Pa(`http://[${e}]`):!1}var Ka=$("$ZodIPv6",(e,n)=>{n.pattern??(n.pattern=Zs),ke.init(e,n),e._zod.check=t=>{ja(t.value)||t.issues.push({code:"invalid_format",format:"ipv6",input:t.value,inst:e,continue:!n.abort})}});var Wa=$("$ZodCIDRv4",(e,n)=>{n.pattern??(n.pattern=Fs),ke.init(e,n)});function sm(e){let n=e.split("/");if(n.length!==2)return!1;let[t,o]=n;if(!o)return!1;let i=Number(o);return`${i}`!==o||i<0||i>128?!1:ja(t)}var Ja=$("$ZodCIDRv6",(e,n)=>{n.pattern??(n.pattern=Us),ke.init(e,n),e._zod.check=t=>{sm(t.value)||t.issues.push({code:"invalid_format",format:"cidrv6",input:t.value,inst:e,continue:!n.abort})}});function Ga(e){if(e==="")return!0;if(/\s/.test(e)||e.length%4!==0)return!1;try{return atob(e),!0}catch{return!1}}var Gr=/^[0-9a-zA-Z+/]*={0,2}$/,Xa=$("$ZodBase64",(e,n)=>{n.pattern??(n.pattern=Gr),ke.init(e,n),e._zod.check=t=>{Ga(t.value)||t.issues.push({code:"invalid_format",format:"base64",input:t.value,inst:e,continue:!n.abort})}}),Fo=/^[A-Za-z0-9_-]*$/;function am(e){if(!Fo.test(e))return!1;let n=e.replace(/[-_]/g,o=>o==="-"?"+":"/"),t=n.padEnd(Math.ceil(n.length/4)*4,"=");return Ga(t)}var Ya=$("$ZodBase64URL",(e,n)=>{n.pattern??(n.pattern=Fo),ke.init(e,n),e._zod.check=t=>{am(t.value)||t.issues.push({code:"invalid_format",format:"base64url",input:t.value,inst:e,continue:!n.abort})}}),Qa=$("$ZodE164",(e,n)=>{n.pattern??(n.pattern=Ks),ke.init(e,n)});function lm(e,n=null){try{let t=e.split(".");if(t.length!==3)return!1;let[o]=t;if(!o)return!1;let i=JSON.parse(atob(o));return!("typ"in i&&i?.typ!=="JWT"||!i.alg||n&&(!("alg"in i)||i.alg!==n))}catch{return!1}}var el=$("$ZodJWT",(e,n)=>{ke.init(e,n),e._zod.check=t=>{lm(t.value,n.alg)||t.issues.push({code:"invalid_format",format:"jwt",input:t.value,inst:e,continue:!n.abort})}});var Xr=$("$ZodNumber",(e,n)=>{we.init(e,n),e._zod.pattern=Jt,e._zod.parse=(t,o)=>{if(n.coerce)try{t.value=Number(t.value)}catch{}let i=t.value;if(typeof i=="number"&&!Number.isNaN(i)&&Number.isFinite(i))return t;let r=typeof i=="number"?Number.isNaN(i)?"NaN":Number.isFinite(i)?void 0:String(i):void 0;return t.issues.push({expected:"number",code:"invalid_type",input:i,inst:e,...r?{received:r}:{}}),t}}),nl=$("$ZodNumberFormat",(e,n)=>{ra.init(e,n),Xr.init(e,n)}),tl=$("$ZodBoolean",(e,n)=>{we.init(e,n),e._zod.pattern=Qs,e._zod.parse=(t,o)=>{if(n.coerce)try{t.value=!!t.value}catch{}let i=t.value;return typeof i=="boolean"||t.issues.push({expected:"boolean",code:"invalid_type",input:i,inst:e}),t}});var ol=$("$ZodNull",(e,n)=>{we.init(e,n),e._zod.pattern=ea,e._zod.values=new Set([null]),e._zod.parse=(t,o)=>{let i=t.value;return i===null||t.issues.push({expected:"null",code:"invalid_type",input:i,inst:e}),t}});var rl=$("$ZodUnknown",(e,n)=>{we.init(e,n),e._zod.parse=t=>t}),il=$("$ZodNever",(e,n)=>{we.init(e,n),e._zod.parse=(t,o)=>(t.issues.push({expected:"never",code:"invalid_type",input:t.value,inst:e}),t)});function cm(e,n){let t=zo(e._zod.def.checks);if(!t.length)return;let o=Math.min(...t.map(r=>r[0])),i=e._zod.parse;e._zod.parse=(r,s)=>{let c=n(r.value);if(c>o&&!s?.skipChecks&&s?.direction!=="backward"){for(let[l,u]of zo(e._zod.def.checks))if(c>l&&u._zod.def.when(r)){let d=r.issues.length;return u._zod.check(r),r.issues[d].continue=!1,jt(r.issues,d,e),r}}return i(r,s)}}var um=e=>Array.isArray(e)?e.length:-1;function ba(e,n,t){e.issues.length&&n.issues.push(...An(t,e.issues)),n.value[t]=e.value}var sl=$("$ZodArray",(e,n)=>{we.init(e,n);let t=Ye.memoizer;t?.attach(e),e._zod.parse=(o,i)=>{let r=o.value;if(!Array.isArray(r))return o.issues.push({expected:"array",code:"invalid_type",input:r,inst:e}),o;o.value=t?t.alloc(e,o,Array(r.length),i):Array(r.length);let s=[],c=i?.abortEarly;for(let l=0;l<r.length;l++){let u=r[l],d=n.element._zod.run({value:u,issues:[]},i);if(d instanceof Promise)s.push(d.then(p=>ba(p,o,l)));else if(ba(d,o,l),c&&d.issues.length!==0&&bn(d))break}return s.length?Promise.all(s).then(()=>o):o},cm(e,um)});function Ro(e,n,t,o,i,r){let s=t in o,c=r==="optional";if(!(!s&&c&&i==="optional")){if(e.issues.length){if(i!==void 0&&c&&!s)return;n.issues.push(...An(t,e.issues))}if(!s&&i===void 0){e.issues.length||n.issues.push({code:"invalid_type",expected:"nonoptional",input:void 0,path:[t]});return}e.value===void 0?(s||i==="defaulted"&&!c)&&(n.value[t]=void 0):n.value[t]=e.value}}var dm=[];function al(e){let n=Object.keys(e.shape),t=Object.getOwnPropertySymbols(e.shape),o=t.length?t:dm,i=o.length?[...n,...o]:n;for(let s of i)if(!e.shape?.[s]?._zod?.traits?.has("$ZodType"))throw new Error(`Invalid element at key "${String(s)}": expected a Zod schema`);let r=Ar(e.shape);return{...e,allKeys:i,symbolKeys:o,keySet:new Set(n),numKeys:n.length,optionalKeys:new Set(r)}}function ll(e,n,t,o,i,r,s){let c=[],l=i.keySet,u=i.catchall._zod,d=u.def.type,p=u.optin,h=u.optout,m=0;for(let v in n){if(s&&t.issues.length!==m){if(bn(t,m))break;m=t.issues.length}if(l.has(v))continue;if(v==="__proto__"){d==="never"&&c.push(v);continue}if(d==="never"){c.push(v);continue}let g=u.run({value:n[v],issues:[]},o);g instanceof Promise?e.push(g.then(b=>Ro(b,t,v,n,p,h))):Ro(g,t,v,n,p,h)}return c.length&&t.issues.push({code:"unrecognized_keys",keys:c,input:n,inst:r,continue:!0}),e.length?Promise.all(e).then(()=>t):t}var pm=$("$ZodObject",(e,n)=>{we.init(e,n);let t=Object.getOwnPropertyDescriptor(n,"shape"),o=t?.get?t.get.raw:n.shape??{};if(o){let u=()=>{let d={...o};return Object.defineProperty(n,"shape",{value:d}),u.raw=d,d};u.raw=o,Object.defineProperty(n,"shape",{get:u})}let i=bt(()=>al(n));ue(e,"propValues",u=>{let d=u.def.shape,p={};for(let h in d){let m=d[h]._zod;if(m.values){Object.prototype.hasOwnProperty.call(p,h)||rn(p,h,new Set);for(let v of m.values)p[h].add(v);m.optin!==void 0&&p[h].add(void 0)}}return p});let r=rt,s=n.catchall,c,l=Ye.memoizer;l?.attach(e),e._zod.parse=(u,d)=>{c??(c=i.value);let p=u.value;if(!r(p))return u.issues.push({expected:"object",code:"invalid_type",input:p,inst:e}),u;u.value=l?l.alloc(e,u,{},d):{};let h=[],m=c.shape,v=d?.abortEarly,g=u.issues.length;for(let b of c.allKeys){if(v&&u.issues.length!==g){if(bn(u,g))break;g=u.issues.length}if(b==="__proto__")continue;let k=m[b],N=k._zod.optin,D=k._zod.optout,P=k._zod.run({value:p[b],issues:[]},d);P instanceof Promise?h.push(P.then(L=>Ro(L,u,b,p,N,D))):Ro(P,u,b,p,N,D)}return s?ll(h,p,u,d,i.value,e,v===!0):h.length?Promise.all(h).then(()=>u):u}}),cl=$("$ZodObjectJIT",(e,n)=>{pm.init(e,n);let t=e._zod.parse,o=bt(()=>al(n)),i=Ye.memoizer,r=m=>{let v=o.value,g=v.symbolKeys,b=new $o(["payload","ctx"],{shape:m,inst:e,memo:i,syms:g}),k=L=>`shape[${L}]._zod.run({ value: input[${L}], issues: [] }, ctx)`,N=(L,I)=>`
          let ${L}_ab = false;
          for (let i = 0; i < ${L}.issues.length; i++) {
            const iss = ${L}.issues[i];
            iss.path = iss.path ? [${I}, ...iss.path] : [${I}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${L}_ab = true;
          }
          if (${L}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;b.write("const input = payload.value;");let D=Object.create(null),P=0;for(let L of v.allKeys)D[L]=`key_${P++}`;b.write(i?"const newResult = memo.alloc(inst, payload, {}, ctx);":"const newResult = {};");for(let L of v.allKeys){if(L==="__proto__")continue;let I=D[L],q=typeof L=="symbol"?`syms[${g.indexOf(L)}]`:zr(L),z=`${q} in input`,w=m[L],S=w?._zod?.optin,B=S!==void 0,E=w?._zod?.optout==="optional";if(b.write(`const ${I} = ${k(q)};`),B&&E){let M=S==="optional"?`${I}_present`:`${I}.value !== undefined || ${I}_present`;b.write(`
        const ${I}_present = ${z};
        if (!${I}.issues.length || ${I}_present) {
          if (${I}.issues.length) {${N(I,q)}
          }

          if (${M}) {
            newResult[${q}] = ${I}.value;
          }
        }

      `)}else B?(b.write(`
        if (${I}.issues.length) {${N(I,q)}
        }
      `),S==="defaulted"?b.write(`newResult[${q}] = ${I}.value;`):b.write(`
        if (${I}.value !== undefined || ${z}) {
          newResult[${q}] = ${I}.value;
        }
      `)):b.write(`
        const ${I}_present = ${z};
        if (${I}.issues.length) {${N(I,q)}
        }
        if (!${I}_present && !${I}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${q}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${I}_present) {
          newResult[${q}] = ${I}.value;
        }

      `)}return b.write("payload.value = newResult;"),b.write("return payload;"),b.compile()},s,c=rt,l=!Ye.jitless,d=l&&Lr.value,p=n.catchall,h;e._zod.parse=(m,v)=>{h??(h=o.value);let g=m.value;return c(g)?l&&d&&v?.async===!1&&v.jitless!==!0?(s||(s=r(n.shape)),m=s(m,v),p?ll([],g,m,v,h,e,v?.abortEarly===!0):m):t(m,v):(m.issues.push({expected:"object",code:"invalid_type",input:g,inst:e}),m)}});function ya(e,n,t,o){for(let r of e)if(r.issues.length===0)return n.value=r.value,n;let i=e.filter(r=>!bn(r));return i.length===1?(n.value=i[0].value,i[0]):(n.issues.push({code:"invalid_union",input:n.value,inst:t,errors:e.map(r=>r.issues.map(s=>yn(s,o,sn())))}),n)}var Yr=$("$ZodUnion",(e,n)=>{we.init(e,n),ue(e,"optin",o=>o.def.options.some(i=>i._zod.optin==="defaulted")?"defaulted":o.def.options.some(i=>i._zod.optin!==void 0)?"optional":void 0),ue(e,"optout",o=>o.def.options.some(i=>i._zod.optout==="optional")?"optional":void 0),ue(e,"values",o=>{if(o.def.options.every(i=>i._zod.values))return new Set(o.def.options.flatMap(i=>Array.from(i._zod.values)))}),ue(e,"pattern",o=>{if(o.def.options.every(i=>i._zod.pattern)){let i=o.def.options.map(r=>r._zod.pattern);return new RegExp(`^(${i.map(r=>Ht(r.source)).join("|")})$`)}});let t=n.options.length===1?n.options[0]._zod.run:null;e._zod.parse=(o,i)=>{if(t)return t(o,i);let r=!1,s=[];for(let c of n.options){let l=c._zod.run({value:o.value,issues:[]},i);if(l instanceof Promise)s.push(l),r=!0;else{if(l.issues.length===0)return l;s.push(l)}}return r?Promise.all(s).then(c=>ya(c,o,e,i)):ya(s,o,e,i)}});function mm(e){let n=new Map;for(let t of e.options){let o=t._zod.propValues?.[e.discriminator];if(!o||o.size===0)throw new Error(`Invalid discriminated union option at index "${e.options.indexOf(t)}"`);for(let i of o)if(n.has(i)){if(i!==void 0)throw new Error(`Duplicate discriminator value "${String(i)}"`);n.set(i,null)}else n.set(i,t)}return n}var ul=$("$ZodDiscriminatedUnion",(e,n)=>{n.inclusive=!1,Yr.init(e,n);let t=e._zod.parse;ue(e,"propValues",i=>{let r={},s=0;for(let c of i.def.options){let l=c._zod.propValues;if(!l||Object.keys(l).length===0)throw new Error(`Invalid discriminated union option at index "${i.def.options.indexOf(c)}"`);l[i.def.discriminator]?.has(void 0)&&s++;for(let[u,d]of Object.entries(l)){Object.prototype.hasOwnProperty.call(r,u)||rn(r,u,new Set);for(let p of d)r[u].add(p)}}return!i.def.unionFallback&&s>1&&r[i.def.discriminator]?.delete(void 0),r}),n.options.forEach((i,r)=>{let s=yt(i._zod.def);if(s&&!Object.prototype.hasOwnProperty.call(s,n.discriminator))throw new Error(`Invalid discriminated union option at index "${r}"`)});let o=bt(()=>mm(n));e._zod.parse=(i,r)=>{let s=i.value;if(!rt(s))return i.issues.push({code:"invalid_type",expected:"object",input:s,inst:e}),i;let c=s?.[n.discriminator],l=o.value.get(c);return l&&(c!==void 0||r.direction!=="backward")?l._zod.run(i,r):n.unionFallback||r.direction==="backward"?t(i,r):(i.issues.push({code:"invalid_union",errors:[],note:"No matching discriminator",discriminator:n.discriminator,options:Array.from(o.value.keys()).filter(u=>o.value.get(u)!==null),input:s,path:[n.discriminator],inst:e}),i)}}),dl=$("$ZodIntersection",(e,n)=>{we.init(e,n),e._zod.parse=(t,o)=>{let i=t.value,r=n.left._zod.run({value:i,issues:[]},o),s=n.right._zod.run({value:i,issues:[]},o);return r instanceof Promise||s instanceof Promise?Promise.all([r,s]).then(([l,u])=>_a(t,l,u)):_a(t,r,s)}});function Wr(e,n){if(e===n)return{valid:!0,data:e};if(e instanceof Date&&n instanceof Date&&+e==+n)return{valid:!0,data:e};if(jn(e)&&jn(n)){let t=Object.keys(n),o=Object.keys(e).filter(r=>t.indexOf(r)!==-1),i={...e,...n};Object.prototype.hasOwnProperty.call(i,"__proto__")&&delete i.__proto__;for(let r of o){if(r==="__proto__")continue;let s=Wr(e[r],n[r]);if(!s.valid)return{valid:!1,mergeErrorPath:[r,...s.mergeErrorPath]};i[r]=s.data}return{valid:!0,data:i}}if(Array.isArray(e)&&Array.isArray(n)){if(e.length!==n.length)return{valid:!1,mergeErrorPath:[]};let t=[];for(let o=0;o<e.length;o++){let i=e[o],r=n[o],s=Wr(i,r);if(!s.valid)return{valid:!1,mergeErrorPath:[o,...s.mergeErrorPath]};t.push(s.data)}return{valid:!0,data:t}}return{valid:!1,mergeErrorPath:[]}}function _a(e,n,t){let o=new Map,i,r=new Map,s=(u,d)=>{let p;if(u.code==="unrecognized_keys"&&!u.path?.length)i??(i=u),p=u.keys;else if(u.code==="invalid_key"&&u.origin==="record"&&u.path?.length===1){let h=String(u.path[0]);r.has(h)||r.set(h,u),p=[h]}else return!1;for(let h of p)o.has(h)||o.set(h,{}),o.get(h)[d]=!0;return!0};for(let u of n.issues)s(u,"l")||e.issues.push(u);for(let u of t.issues)s(u,"r")||e.issues.push(u);let c=[...o].filter(([,u])=>u.l&&u.r).map(([u])=>u);if(c.length){let u=i?c.filter(d=>i.keys.includes(d)):[];u.length&&e.issues.push({...i,keys:u});for(let d of c)!u.includes(d)&&r.has(d)&&e.issues.push(r.get(d))}let l=Wr(n.value,t.value);if(!l.valid){if(bn(e))return e;throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(l.mergeErrorPath)}`)}return e.value=l.data,e}var pl=$("$ZodRecord",(e,n)=>{we.init(e,n);let t=Ye.memoizer;t?.attach(e),e._zod.parse=(o,i)=>{let r=o.value;if(!jn(r))return o.issues.push({expected:"record",code:"invalid_type",input:r,inst:e}),o;let s=[],c=n.keyType._zod.values;if(c&&!n.partial){o.value=t?t.alloc(e,o,{},i):{};let l=new Set;for(let d of c)if(typeof d=="string"||typeof d=="number"||typeof d=="symbol"){if(l.add(typeof d=="number"?d.toString():d),d==="__proto__")continue;let p=n.keyType._zod.run({value:d,issues:[]},i);if(p instanceof Promise)throw new Error("Async schemas not supported in object keys currently");if(p.issues.length){o.issues.push({code:"invalid_key",origin:"record",issues:p.issues.map(v=>yn(v,i,sn())),input:d,path:[d],inst:e});continue}let h=p.value;if(h==="__proto__")continue;let m=n.valueType._zod.run({value:r[d],issues:[]},i);m instanceof Promise?s.push(m.then(v=>{v.issues.length&&o.issues.push(...An(d,v.issues)),o.value[h]=v.value})):(m.issues.length&&o.issues.push(...An(d,m.issues)),o.value[h]=m.value)}let u;for(let d in r)if(!l.has(d))if(n.mode==="loose"){if(d==="__proto__")continue;o.value[d]=r[d]}else u=u??[],u.push(d);u&&u.length>0&&o.issues.push({code:"unrecognized_keys",input:r,inst:e,keys:u,continue:!0})}else{o.value=t?t.alloc(e,o,{},i):{};let l;for(let u of Reflect.ownKeys(r)){if(u==="__proto__"||!Object.prototype.propertyIsEnumerable.call(r,u))continue;let d=n.keyType._zod.run({value:u,issues:[]},i);if(d instanceof Promise)throw new Error("Async schemas not supported in object keys currently");if(typeof u=="string"&&Jt.test(u)&&d.issues.length){let v=n.keyType._zod.run({value:Number(u),issues:[]},i);if(v instanceof Promise)throw new Error("Async schemas not supported in object keys currently");v.issues.length===0&&(d=v)}if(d.issues.length){n.mode==="loose"?o.value[u]=r[u]:c?(l=l??[],l.push(u)):o.issues.push({code:"invalid_key",origin:"record",issues:d.issues.map(v=>yn(v,i,sn())),input:u,path:[u],inst:e});continue}let h=d.value;if(h==="__proto__")continue;let m=n.valueType._zod.run({value:r[u],issues:[]},i);m instanceof Promise?s.push(m.then(v=>{v.issues.length&&o.issues.push(...An(u,v.issues)),o.value[h]=v.value})):(m.issues.length&&o.issues.push(...An(u,m.issues)),o.value[h]=m.value)}l&&l.length>0&&o.issues.push({code:"unrecognized_keys",input:r,inst:e,keys:l,continue:!0})}return s.length?Promise.all(s).then(()=>o):o}});var ml=$("$ZodEnum",(e,n)=>{we.init(e,n);let t=gt(n.entries),o=new Set(t);e._zod.values=o,ue(e,"pattern",i=>{let r=gt(i.def.entries).filter(s=>Pr.has(typeof s));return new RegExp(r.length?`^(${r.map(s=>Pn(s.toString())).join("|")})$`:"^[^\\s\\S]$")}),e._zod.parse=(i,r)=>{let s=i.value;return o.has(s)||i.issues.push({code:"invalid_value",values:t,input:s,inst:e}),i}}),fl=$("$ZodLiteral",(e,n)=>{we.init(e,n);let t=new Set(n.values);e._zod.values=t,ue(e,"pattern",o=>{let i=o.def.values;return new RegExp(i.length?`^(${i.map(r=>typeof r=="string"?Pn(r):r?Pn(r.toString()):String(r)).join("|")})$`:"^[^\\s\\S]$")}),e._zod.parse=(o,i)=>{let r=o.value;return t.has(r)||o.issues.push({code:"invalid_value",values:n.values,input:r,inst:e}),o}});var hl=$("$ZodTransform",(e,n)=>{we.init(e,n),e._zod.optin="optional",Ye.memoizer?.guard(e),e._zod.parse=(t,o)=>{if(o.direction==="backward")throw new wt(e.constructor.name);let i=n.transform(t.value,t);if(o.async)return(i instanceof Promise?i:Promise.resolve(i)).then(s=>(t.value=s,t));if(i instanceof Promise)throw new _n;return t.value=i,t}});function wa(e,n){return e.value=n.issues.length?void 0:n.value,e}var Qr=$("$ZodOptional",(e,n)=>{we.init(e,n),ue(e,"optin",t=>t.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),e._zod.optout="optional",ue(e,"values",t=>{let o=t.def.innerType._zod.values;return o?new Set([...o,void 0]):void 0}),ue(e,"pattern",t=>{let o=t.def.innerType._zod.pattern;return o?new RegExp(`^(${Ht(o.source)})?$`):void 0}),e._zod.parse=(t,o)=>{if(t.value===void 0){if(n.innerType._zod.optin!=="defaulted")return t;let i=n.innerType._zod.run({value:t.value,issues:[]},o);return i instanceof Promise?i.then(r=>wa(t,r)):wa(t,i)}return n.innerType._zod.run(t,o)}}),gl=$("$ZodExactOptional",(e,n)=>{Qr.init(e,n),ue(e,"values",t=>t.def.innerType._zod.values),ue(e,"pattern",t=>t.def.innerType._zod.pattern),e._zod.parse=(t,o)=>n.innerType._zod.run(t,o)}),vl=$("$ZodNullable",(e,n)=>{we.init(e,n),ue(e,"optin",t=>t.def.innerType._zod.optin),ue(e,"optout",t=>t.def.innerType._zod.optout),ue(e,"pattern",t=>{let o=t.def.innerType._zod.pattern;return o?new RegExp(`^(${Ht(o.source)}|null)$`):void 0}),ue(e,"values",t=>t.def.innerType._zod.values?new Set([...t.def.innerType._zod.values,null]):void 0),e._zod.parse=(t,o)=>t.value===null?t:n.innerType._zod.run(t,o)}),bl=$("$ZodDefault",(e,n)=>{we.init(e,n),e._zod.optin="defaulted",ue(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,o)=>{if(o.direction==="backward")return n.innerType._zod.run(t,o);if(t.value===void 0)return t.value=n.defaultValue,t;let i=n.innerType._zod.run(t,o);return i instanceof Promise?i.then(r=>xa(r,n)):xa(i,n)}});function xa(e,n){return e.value===void 0&&(e.value=n.defaultValue),e}var yl=$("$ZodPrefault",(e,n)=>{we.init(e,n),e._zod.optin="defaulted",ue(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,o)=>(o.direction==="backward"||t.value===void 0&&(t.value=n.defaultValue),n.innerType._zod.run(t,o))}),_l=$("$ZodNonOptional",(e,n)=>{we.init(e,n),ue(e,"values",t=>{let o=t.def.innerType._zod.values;return o?new Set([...o].filter(i=>i!==void 0)):void 0}),e._zod.parse=(t,o)=>{let i=n.innerType._zod.run(t,o);return i instanceof Promise?i.then(r=>ka(r,e)):ka(i,e)}});function ka(e,n){return!e.issues.length&&e.value===void 0&&e.issues.push({code:"invalid_type",expected:"nonoptional",input:e.value,inst:n}),e}function Sa(e,n,t,o){return n.issues.length?(e.value=t.catchValue({...n,value:e.value,error:{issues:n.issues.map(i=>yn(i,o,sn()))},input:e.value}),e):(e.value=n.value,n.memo&&(e.memo=!0),e)}var wl=$("$ZodCatch",(e,n)=>{we.init(e,n),ue(e,"optin",t=>t.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),ue(e,"optout",t=>t.def.innerType._zod.optout),ue(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,o)=>{if(o.direction==="backward")return n.innerType._zod.run(t,o);let i=n.innerType._zod.run({value:t.value,issues:[]},o);return i instanceof Promise?i.then(r=>Sa(t,r,n,o)):Sa(t,i,n,o)}});var xl=$("$ZodPipe",(e,n)=>{we.init(e,n),ue(e,"values",t=>t.def.in._zod.values),ue(e,"optin",t=>t.def.in._zod.optin),ue(e,"optout",t=>t.def.out._zod.optout),ue(e,"propValues",t=>t.def.in._zod.propValues),e._zod.parse=(t,o)=>{if(o.direction==="backward"){let r=n.out._zod.run(t,o);return r instanceof Promise?r.then(s=>To(s,n.in,o)):To(r,n.in,o)}let i=n.in._zod.run(t,o);return i instanceof Promise?i.then(r=>To(r,n.out,o)):To(i,n.out,o)}});function To(e,n,t){return e.issues.some(o=>o.code!=="unrecognized_keys")?(e.aborted=!0,e):n._zod.run({value:e.value,issues:e.issues},t)}var kl=$("$ZodReadonly",(e,n)=>{we.init(e,n),ue(e,"propValues",t=>t.def.innerType._zod.propValues),ue(e,"values",t=>t.def.innerType._zod.values),ue(e,"optin",t=>t.def.innerType?._zod?.optin),ue(e,"optout",t=>t.def.innerType?._zod?.optout),e._zod.parse=(t,o)=>{if(o.direction==="backward")return n.innerType._zod.run(t,o);let i=n.innerType._zod.run(t,o);return i instanceof Promise?i.then(Ma):Ma(i)}});function Ma(e){return e.memo||(e.value=Object.freeze(e.value)),e}var Sl=$("$ZodLazy",(e,n)=>{we.init(e,n),qr(e._zod,"innerType",()=>{let t=n;return t._cachedInner||(t._cachedInner=n.getter()),t._cachedInner}),ue(e,"pattern",t=>t.innerType?._zod?.pattern),ue(e,"propValues",t=>t.innerType?._zod?.propValues),ue(e,"optin",t=>t.innerType?._zod?.optin??void 0),ue(e,"optout",t=>t.innerType?._zod?.optout??void 0),e._zod.parse=(t,o)=>e._zod.innerType._zod.run(t,o)}),Ml=$("$ZodCustom",(e,n)=>{He.init(e,n),we.init(e,n),e._zod.parse=(t,o)=>t,e._zod.check=t=>{let o=t.value,i=n.fn(o);if(i instanceof Promise)return i.then(r=>Na(r,t,o,e));Na(i,t,o,e)}});function Na(e,n,t,o){if(!e){let i={code:"custom",input:t,inst:o,path:[...o._zod.def.path??[]],continue:!o._zod.def.abort};o._zod.def.params&&(i.params=o._zod.def.params),n.issues.push(_t(i))}}var ni=class extends Error{constructor(){super("Cannot parse a reference cycle that closes through a transform"),this.name="ZodCyclicError"}},ti="~memo",Nl=[];function Bl(e){return e!==null&&typeof e=="object"}function ei(e){return e.map(n=>n.path?{...n,path:n.path.slice()}:{...n})}var ql=new WeakMap,Yt=0,Vo=1,Qt=2;function jo(e,n,t){let o=ql.get(e);if(o!==void 0)return o?Qt:Yt;if(n.has(e))return Qt;n.add(e);let i=Yt,r=d=>{if(i!==Qt&&d?._zod){let p=jo(d,n,t);p>i&&(i=p)}},s=(d,p)=>{let h=Yt;for(let m of Reflect.ownKeys(d)){let v=Object.getOwnPropertyDescriptor(d,m);if(p&&!v.enumerable)continue;let g=v.get?Vo:v.value?._zod?jo(v.value,n,t):Yt;g>h&&(h=g)}return h},c=d=>{d>i&&(i=d)},l=e._zod.def,u=l.type;switch(u){case"object":{let d=yt(l);c(d?s(d,!0):Vo),r(l.catchall);break}case"array":r(l.element);break;case"tuple":for(let d of l.items)r(d);r(l.rest);break;case"record":case"map":r(l.keyType),r(l.valueType);break;case"set":r(l.valueType);break;case"union":for(let d of l.options)r(d);break;case"intersection":r(l.left),r(l.right);break;case"optional":case"nullable":case"default":case"prefault":case"catch":case"readonly":case"nonoptional":case"promise":case"success":r(l.innerType);break;case"pipe":r(l.in),r(l.out);break;case"function":r(l.input),r(l.output);break;case"lazy":{let d=l._cachedInner??(t?e._zod.innerType:void 0);c(d?jo(d,n,!1):Vo);break}case"template_literal":case"string":case"number":case"int":case"boolean":case"bigint":case"symbol":case"undefined":case"null":case"void":case"never":case"any":case"unknown":case"date":case"nan":case"enum":case"literal":case"file":case"transform":case"custom":break;default:for(let d in l){let p=Object.getOwnPropertyDescriptor(l,d);if(!p||p.get)continue;let h=p.value;if(!(!h||typeof h!="object")){if(h._zod)r(h);else if(Array.isArray(h))for(let m of h)r(m)}}}return n.delete(e),fm(e,i)}function fm(e,n){return n!==Vo&&ql.set(e,n===Qt),n}function hm(e,n){let t=e.buckets.get(n);return t||(t=new WeakMap,e.buckets.set(n,t)),t}var Uo,Ho=[],gm={alloc(e,n,t){let o=Uo;if(!o)return t;Uo=void 0;let i={value:t,issues:null};return o.set(n.value,i),Ho.push(i),t},guard(e){var n;(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred.push(()=>{let t=e._zod.parse,o=(i,r)=>{if(r.direction!=="backward"&&vm(r,i.value))throw new ni;return t(i,r)};e._zod.parse=o,e._zod.run===t&&(e._zod.run=o)})},attach(e){var n;let t,o=!1,i,r;(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred.push(()=>{let s=e._zod.parse,c=(l,u)=>{if(t===void 0){let k=jo(e,new Set,!1);if(k===Yt)return e._zod.parse=s,e._zod.run===c&&(e._zod.run=s),s(l,u);k===Qt||o?t=!0:o=!0}let d=l.value;if(!Bl(d))return s(l,u);let p=u[ti];p||(p={buckets:new WeakMap,backEdges:void 0},u[ti]=p);let h;i===u?h=r:(h=hm(p,e),i=u,r=h);let m=h.get(d);if(m)return l.value=m.value,m.issues?m.issues.length&&l.issues.push(...ei(m.issues)):(l.memo=!0,p.backEdges??(p.backEdges=new WeakSet),p.backEdges.add(m.value)),l;Uo=h;let v=Ho.length,g=s(l,u);Uo=void 0;let b=Ho.length>v?Ho.pop():void 0;return g instanceof Promise?g.then(k=>(b&&(b.issues=k.issues.length?ei(k.issues):Nl),k)):(b&&(b.issues=g.issues.length?ei(g.issues):Nl),g)};e._zod.parse=c,e._zod.run===s&&(e._zod.run=c)})}};function zl(){return gm}function vm(e,n){let t=e[ti]?.backEdges;return t!==void 0&&Bl(n)&&t.has(n)}var bm=()=>{let e={string:{unit:"characters",verb:"to have"},file:{unit:"bytes",verb:"to have"},array:{unit:"items",verb:"to have"},set:{unit:"items",verb:"to have"},map:{unit:"entries",verb:"to have"}};function n(r){return e[r]??null}let t={regex:"input",email:"email address",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO datetime",date:"ISO date",time:"ISO time",duration:"ISO duration",ipv4:"IPv4 address",ipv6:"IPv6 address",mac:"MAC address",cidrv4:"IPv4 range",cidrv6:"IPv6 range",base64:"base64-encoded string",base64url:"base64url-encoded string",json_string:"JSON string",e164:"E.164 number",currency_code:"currency code",credit_card:"credit card number",iban:"IBAN",jwt:"JWT",template_literal:"input"},o={nan:"NaN"};function i(r,s){return r==="number"&&typeof s=="number"&&!Number.isFinite(s)?String(s):o[r]??r}return r=>{switch(r.code){case"invalid_type":{let s=i(r.expected),c=Ir(r.input),l=i(c,r.input);return`Invalid input: expected ${s}, received ${l}`}case"invalid_value":return r.values.length===1?`Invalid input: expected ${No(r.values[0])}`:`Invalid option: expected one of ${So(r.values,"|")}`;case"too_big":{let s=r.exact?"exactly ":r.inclusive?"<=":"<",c=n(r.origin);return c?`Too big: expected ${r.origin??"value"} to have ${s}${r.maximum.toString()} ${c.unit??"elements"}`:`Too big: expected ${r.origin??"value"} to be ${s}${r.maximum.toString()}`}case"too_small":{let s=r.exact?"exactly ":r.inclusive?">=":">",c=n(r.origin);return c?`Too small: expected ${r.origin} to have ${s}${r.minimum.toString()} ${c.unit}`:`Too small: expected ${r.origin} to be ${s}${r.minimum.toString()}`}case"invalid_format":{let s=r;return s.format==="starts_with"?`Invalid string: must start with "${s.prefix}"`:s.format==="ends_with"?`Invalid string: must end with "${s.suffix}"`:s.format==="includes"?`Invalid string: must include "${s.includes}"`:s.format==="regex"?`Invalid string: must match pattern ${s.pattern}`:`Invalid ${t[s.format]??r.format}`}case"not_multiple_of":return`Invalid number: must be a multiple of ${r.divisor}`;case"unrecognized_keys":return`Unrecognized key${r.keys.length>1?"s":""}: ${So(r.keys,", ")}`;case"invalid_key":return`Invalid key in ${r.origin}`;case"invalid_union":return r.options&&Array.isArray(r.options)&&r.options.length>0?`Invalid discriminator value. Expected ${r.options.map(c=>`'${c}'`).join(" | ")}`:r.inclusive===!1?"Invalid input: more than one option matched":"Invalid input";case"invalid_element":return`Invalid value in ${r.origin}`;default:return"Invalid input"}}};function Cl(){return{localeError:bm()}}var Ll;var oi=class{constructor(){this._map=new WeakMap,this._idmap=new Map}add(n,...t){let o=t[0];return this._map.set(n,o),o&&typeof o=="object"&&"id"in o&&this._idmap.set(o.id,n),this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(n){let t=this._map.get(n);return t&&typeof t=="object"&&"id"in t&&this._idmap.delete(t.id),this._map.delete(n),this}get(n){let t=n._zod.parent;if(t){let o={...this.get(t)??{}};delete o.id;let i={...o,...this._map.get(n)};return Object.keys(i).length?i:void 0}return this._map.get(n)}has(n){return this._map.has(n)}};function ym(){return new oi}(Ll=globalThis).__zod_globalRegistry??(Ll.__zod_globalRegistry=ym());var it=globalThis.__zod_globalRegistry;function Pl(e){return e.checks&&(e.checks=[...e.checks]),e}function Al(e,n){return new e(Pl({type:"string",...te(n)}))}function El(e,n){return new e({type:"string",format:"email",check:"string_format",abort:!1,...te(n)})}function Il(e,n){return new e({type:"string",format:"guid",check:"string_format",abort:!1,...te(n)})}function Dl(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,...te(n)})}function $l(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v4",...te(n)})}function Tl(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v6",...te(n)})}function Ol(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v7",...te(n)})}function Rl(e,n){return new e({type:"string",format:"url",check:"string_format",abort:!1,...te(n)})}function Zl(e,n){return new e({type:"string",format:"emoji",check:"string_format",abort:!1,...te(n)})}function Fl(e,n){return new e({type:"string",format:"nanoid",check:"string_format",abort:!1,...te(n)})}function Ul(e,n){return new e({type:"string",format:"cuid",check:"string_format",abort:!1,...te(n)})}function Hl(e,n){return new e({type:"string",format:"cuid2",check:"string_format",abort:!1,...te(n)})}function Vl(e,n){return new e({type:"string",format:"ulid",check:"string_format",abort:!1,...te(n)})}function jl(e,n){return new e({type:"string",format:"xid",check:"string_format",abort:!1,...te(n)})}function Kl(e,n){return new e({type:"string",format:"ksuid",check:"string_format",abort:!1,...te(n)})}function Wl(e,n){return new e({type:"string",format:"ipv4",check:"string_format",abort:!1,...te(n)})}function Jl(e,n){return new e({type:"string",format:"ipv6",check:"string_format",abort:!1,...te(n)})}function Gl(e,n){return new e({type:"string",format:"cidrv4",check:"string_format",abort:!1,...te(n)})}function Xl(e,n){return new e({type:"string",format:"cidrv6",check:"string_format",abort:!1,...te(n)})}function Yl(e,n){return new e({type:"string",format:"base64",check:"string_format",abort:!1,...te(n)})}function Ql(e,n){return new e({type:"string",format:"base64url",check:"string_format",abort:!1,...te(n)})}function ec(e,n){return new e({type:"string",format:"e164",check:"string_format",abort:!1,...te(n)})}function nc(e,n){return new e({type:"string",format:"jwt",check:"string_format",abort:!1,...te(n)})}function tc(e,n){return new e({type:"string",format:"datetime",check:"string_format",offset:!1,local:!1,precision:null,...te(n)})}function oc(e,n){return new e({type:"string",format:"date",check:"string_format",...te(n)})}function rc(e,n){return new e({type:"string",format:"time",check:"string_format",precision:null,...te(n)})}function ic(e,n){return new e({type:"string",format:"duration",check:"string_format",...te(n)})}function sc(e,n){return new e(Pl({type:"number",checks:[],...te(n)}))}function ac(e,n){return new e({type:"number",check:"number_format",abort:!1,format:"safeint",...te(n)})}function lc(e,n){return new e({type:"boolean",...te(n)})}function cc(e,n){return new e({type:"null",...te(n)})}function uc(e){return new e({type:"unknown"})}function dc(e,n){return new e({type:"never",...te(n)})}function Ko(e,n){return new jr({check:"less_than",...te(n),value:e,inclusive:!1})}function eo(e,n){return new jr({check:"less_than",...te(n),value:e,inclusive:!0})}function Wo(e,n){return new Kr({check:"greater_than",...te(n),value:e,inclusive:!1})}function no(e,n){return new Kr({check:"greater_than",...te(n),value:e,inclusive:!0})}function Jo(e,n){return new oa({check:"multiple_of",...te(n),value:e})}function Go(e,n){return new ia({check:"max_length",...te(n),maximum:e})}function xt(e,n){return new sa({check:"min_length",...te(n),minimum:e})}function Xo(e,n){return new aa({check:"length_equals",...te(n),length:e})}function ri(e,n){return new la({check:"string_format",format:"regex",...te(n),pattern:e})}function ii(e){return new ca({check:"string_format",format:"lowercase",...te(e)})}function si(e){return new ua({check:"string_format",format:"uppercase",...te(e)})}function ai(e,n){return new da({check:"string_format",format:"includes",...te(n),includes:e})}function li(e,n){return new pa({check:"string_format",format:"starts_with",...te(n),prefix:e})}function ci(e,n){return new ma({check:"string_format",format:"ends_with",...te(n),suffix:e})}function Kn(e){return new fa({check:"overwrite",tx:e})}function ui(e){return Kn(n=>n.normalize(e))}function di(){return Kn(e=>e.trim())}function pi(){return Kn(e=>e.toLowerCase())}function mi(){return Kn(e=>e.toUpperCase())}function fi(){return Kn(e=>Cr(e))}function pc(e,n,t){return new e({type:"array",element:n,...te(t)})}function mc(e,n,t){return new e({type:"custom",check:"custom",fn:n,...te(t)})}function fc(e,n){let t=_m(o=>(o.addIssue=i=>{if(typeof i=="string")o.issues.push(_t(i,o.value,t._zod.def));else{let r=i;r.fatal&&(r.continue=!1),r.code??(r.code="custom"),"input"in r||(r.input=o.value),r.inst??(r.inst=t),r.continue??(r.continue=!t._zod.def.abort),o.issues.push(_t(r))}},e(o.value,o)),n);return t}function _m(e,n){let t=new He({check:"custom",...te(n)});return t._zod.check=e,t}function to(e,...n){for(let t of n)for(let o of Reflect.ownKeys(t))Object.prototype.propertyIsEnumerable.call(t,o)&&rn(e,o,t[o]);return e}function gi(e){let n=e?.target??"draft-2020-12";return n==="draft-4"&&(n="draft-04"),n==="draft-7"&&(n="draft-07"),{processors:e.processors??{},metadataRegistry:e?.metadata??it,target:n,unrepresentable:e?.unrepresentable??"throw",override:e?.override??(()=>{}),io:e?.io??"output",counter:0,seen:new Map,sharedDefsExtractedFor:void 0,sharedEmitDoneFor:void 0,cycles:e?.cycles??"ref",reused:e?.reused??"inline",intersections:[],deferred:[],external:e?.external??void 0}}function En(e,n,t,o,i){let r=typeof n.unrepresentable=="function"?n.unrepresentable({zodSchema:e,path:o.path,message:i}):n.unrepresentable;if(r==="any")return!1;if(r===void 0||r==="throw")throw new Error(i);return Object.assign(t,r),!0}function Ce(e,n,t={path:[],schemaPath:[]}){var o;let i=e._zod.def,r=n.seen.get(e);if(r)return r.count++,t.schemaPath.includes(e)&&(r.cycle=t.path),r.schema;let s={schema:{},count:1,cycle:void 0,path:t.path};n.seen.set(e,s),n.sharedDefsExtractedFor=void 0,n.sharedEmitDoneFor=void 0;let c=e._zod.toJSONSchema?.();if(c)s.schema=c;else{let d={...t,schemaPath:[...t.schemaPath,e],path:t.path};if(e._zod.processJSONSchema)e._zod.processJSONSchema(n,s.schema,d);else{let h=s.schema,m=n.processors[i.type];if(!m)throw new Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);m(e,n,h,d)}let p=e._zod.parent;p&&(s.ref||(s.ref=p),Ce(p,n,d),n.seen.get(p).isParent=!0)}let l=n.metadataRegistry.get(e);return l&&to(s.schema,l),n.io==="input"&&We(e)&&(delete s.schema.examples,delete s.schema.default),n.io==="input"&&"_prefault"in s.schema&&((o=s.schema).default??(o.default=s.schema._prefault)),delete s.schema._prefault,n.seen.get(e).schema}function hc(e){return e.replace(/~/g,"~0").replace(/\//g,"~1")}function vi(e,n){let t=e.seen.get(n);if(!t)throw new Error("Unprocessed schema. This is a bug in Zod.");if(e.external&&e.sharedDefsExtractedFor===e.external)return;let o=new Map;for(let s of e.seen.entries()){let c=e.metadataRegistry.get(s[0])?.id;if(c){let l=o.get(c);if(l&&l!==s[0])throw new Error(`Duplicate schema id "${c}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);o.set(c,s[0])}}let i=s=>{let c=e.target==="draft-2020-12"?"$defs":"definitions";if(e.external){let p=e.external.registry.get(s[0])?.id,h=e.external.uri??(v=>v);if(p)return{ref:h(p)};let m=s[1].defId??s[1].schema.id??`schema${e.counter++}`;return s[1].defId=m,{defId:m,ref:`${h("__shared")}#/${c}/${hc(m)}`}}let l="#",u=`${l}/${c}/`;if(s[1]===t&&!s[1].schema.id)return{ref:l};let d=s[1].schema.id??`__schema${e.counter++}`;return{defId:d,ref:u+hc(d)}},r=s=>{if(s[1].schema.$ref)return;let c=s[1],{ref:l,defId:u}=i(s);c.def={...c.schema},u&&(c.defId=u);let d=c.schema;for(let p in d)delete d[p];d.$ref=l};if(e.cycles==="throw")for(let s of e.seen.entries()){let c=s[1];if(c.cycle)throw new Error(`Cycle detected: #/${c.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`)}for(let s of e.seen.entries()){let c=s[1];if(n===s[0]){r(s);continue}if(e.external){let u=e.external.registry.get(s[0])?.id;if(n!==s[0]&&u){r(s);continue}}if(e.metadataRegistry.get(s[0])?.id){r(s);continue}if(c.cycle){r(s);continue}c.count>1&&e.reused==="ref"&&r(s)}e.external&&(e.sharedDefsExtractedFor=e.external)}function bc(e){let n=e.anyOf;if(!Array.isArray(n)||n.length===0||e.type!==void 0)return;let t=[];for(let o of n){if(!o||typeof o!="object")return;bc(o);let i=Object.keys(o);if(i.length!==1||i[0]!=="type")return;let r=o.type;for(let s of Array.isArray(r)?r:[r]){if(typeof s!="string")return;t.includes(s)||t.push(s)}}delete e.anyOf,e.type=t.length===1?t[0]:t}var yc=new Set(["type","properties","required","additionalProperties"]),gc=["oneOf","anyOf"];function vc(e){let n=e.additionalProperties;return n===void 0||n===!1||typeof n!="object"||n===null?null:Object.keys(n).length?n:null}function hi(e){let n=[];for(let r of e){if(typeof r!="object"||r.type!=="object")return null;for(let s in r)if(!yc.has(s))return null;n.push(r)}let t={},o=new Set;for(let r of n){for(let s in r.properties){if(Object.prototype.hasOwnProperty.call(t,s))continue;let c=[];for(let u of n){let d=u.properties?.[s]??vc(u);d!=null&&(c.some(p=>JSON.stringify(p)===JSON.stringify(d))||c.push(d))}let l=c.length===1?c[0]:hi(c)??{allOf:c};rn(t,s,l)}for(let s of r.required??[])o.add(s)}let i={type:"object",properties:t};if(o.size&&(i.required=[...o]),n.every(r=>r.additionalProperties===!1))i.additionalProperties=!1;else{let r=[];for(let s of n){let c=vc(s);c&&!r.some(l=>JSON.stringify(l)===JSON.stringify(c))&&r.push(c)}r.length===1?i.additionalProperties=r[0]:r.length>1&&(i.additionalProperties={allOf:r})}return i}function wm(e){let n=e.allOf;if(!Array.isArray(n)||n.length<2)return;for(let i of yc)if(i in e)return;let t=n.filter(i=>gc.some(r=>Array.isArray(i[r]))),o=null;if(!t.length)o=hi(n);else{let i=t[0],r=gc.find(l=>Array.isArray(i[l]));if(Object.keys(i).length!==1)return;let s=n.filter(l=>l!==i),c=i[r].map(l=>hi([...s,l]));if(c.some(l=>!l))return;o={[r]:c}}o&&(delete e.allOf,to(e,o))}function bi(e,n){let t=e.seen.get(n);if(!t)throw new Error("Unprocessed schema. This is a bug in Zod.");let o=c=>{let l=e.seen.get(c);if(l.ref===null)return;let u=l.def??l.schema,d={...u},p=l.ref;if(l.ref=null,p){o(p);let m=e.seen.get(p),v=m.schema;if(v.$ref&&(e.target==="draft-07"||e.target==="draft-04"||e.target==="openapi-3.0")?(u.allOf=u.allOf??[],u.allOf.push(v)):to(u,v),to(u,d),c._zod.parent===p)for(let b in u)b==="$ref"||b==="allOf"||b in d||delete u[b];if(v.$ref&&m.def)for(let b in u)b==="$ref"||b==="allOf"||b in m.def&&JSON.stringify(u[b])===JSON.stringify(m.def[b])&&delete u[b]}let h=c._zod.parent;if(h&&h!==p){o(h);let m=e.seen.get(h);if(m?.schema.$ref&&(u.$ref=m.schema.$ref,m.def))for(let v in u)v==="$ref"||v==="allOf"||v in m.def&&JSON.stringify(u[v])===JSON.stringify(m.def[v])&&delete u[v]}e.override({zodSchema:c,jsonSchema:u,path:l.path??[]})};if(!e.external||e.sharedEmitDoneFor!==e.external){for(let c of[...e.seen.entries()].reverse())o(c[0]);if(e.target!=="openapi-3.0")for(let c of e.seen.entries())bc(c[1].def??c[1].schema);for(let c of e.deferred)c();if(e.intersections.length){let c=new Map;for(let l of e.seen.values())for(let u of[l.schema,l.def]){let d=u?.allOf;if(!Array.isArray(d))continue;let p=c.get(d);p?p.push(u):c.set(d,[u])}for(let l of e.intersections)for(let u of c.get(l)??[])wm(u)}}let i={};if(e.target==="draft-2020-12"?i.$schema="https://json-schema.org/draft/2020-12/schema":e.target==="draft-07"?i.$schema="http://json-schema.org/draft-07/schema#":e.target==="draft-04"?i.$schema="http://json-schema.org/draft-04/schema#":e.target,e.external?.uri){let c=e.external.registry.get(n)?.id;if(!c)throw new Error("Schema is missing an `id` property");i.$id=e.external.uri(c)}to(i,t.defId?t.schema:t.def??t.schema);let r=e.metadataRegistry.get(n)?.id;r!==void 0&&i.id===r&&delete i.id;let s=e.external?.defs??{};if(!e.external||e.sharedEmitDoneFor!==e.external)for(let c of e.seen.entries()){let l=c[1];l.def&&l.defId&&(l.def.id===l.defId&&delete l.def.id,rn(s,l.defId,l.def))}e.external&&(e.sharedEmitDoneFor=e.external),e.external||Object.keys(s).length>0&&(e.target==="draft-2020-12"?i.$defs=s:i.definitions=s);try{let c=JSON.parse(JSON.stringify(i));return Object.defineProperty(c,"~standard",{value:{...n["~standard"],jsonSchema:{input:oo(n,"input",e.processors),output:oo(n,"output",e.processors)}},enumerable:!1,writable:!1}),c}catch{throw new Error("Error converting schema to JSON.")}}function We(e,n){let t=n??{seen:new Set};if(t.seen.has(e))return!1;t.seen.add(e);let o=e._zod.def;if(o.type==="transform")return!0;if(o.type==="array")return We(o.element,t);if(o.type==="set")return We(o.valueType,t);if(o.type==="lazy")return We(o.getter(),t);if(o.type==="promise"||o.type==="optional"||o.type==="nonoptional"||o.type==="nullable"||o.type==="readonly"||o.type==="default"||o.type==="prefault"||o.type==="catch")return We(o.innerType,t);if(o.type==="intersection")return We(o.left,t)||We(o.right,t);if(o.type==="record"||o.type==="map")return We(o.keyType,t)||We(o.valueType,t);if(o.type==="pipe")return e._zod.traits.has("$ZodCodec")?!0:We(o.in,t)||We(o.out,t);if(o.type==="object"){for(let i in o.shape)if(We(o.shape[i],t))return!0;return!1}if(o.type==="union"){for(let i of o.options)if(We(i,t))return!0;return!1}if(o.type==="tuple"){for(let i of o.items)if(We(i,t))return!0;return!!(o.rest&&We(o.rest,t))}return!1}var _c=(e,n={})=>t=>{let o=gi({...t,processors:n});return Ce(e,o),vi(o,e),bi(o,e)},oo=(e,n,t={})=>o=>{let{libraryOptions:i,target:r}=o??{},s=gi({...i??{},target:r,io:n,processors:t});return Ce(e,s),vi(s,e),bi(s,e)};var kt=(e,n,t)=>{(e[n]===void 0||t>e[n])&&(e[n]=t)},St=(e,n,t)=>{(e[n]===void 0||t<e[n])&&(e[n]=t)},wc=(e,n)=>{kt(e,"minimum",n),St(e,"maximum",n)},Mc=(e,n)=>{e.multipleOf??(e.multipleOf=[]),e.multipleOf.includes(n)||e.multipleOf.push(n)},Nc=(e,n)=>{e.patterns??(e.patterns=new Set),e.patterns.add(n)},Bc=(e,n)=>{e.mime=e.mime?e.mime.filter(t=>n.includes(t)):[...n]},qc=(e,n)=>{e.format=n,n.includes("int")&&(e.isInt=!0)},xc=(e,n)=>kt(e,"minimum",n.minimum),kc=(e,n)=>St(e,"maximum",n.maximum),Sc=e=>(n,t)=>{qc(n,t.format);let[o,i]=e[t.format];kt(n,"minimum",o),St(n,"maximum",i)},xm={greater_than:(e,n)=>kt(e,n.inclusive?"minimum":"exclusiveMinimum",n.value),less_than:(e,n)=>St(e,n.inclusive?"maximum":"exclusiveMaximum",n.value),multiple_of:(e,n)=>Mc(e,n.value),number_format:Sc(Vt),bigint_format:Sc(Bo),min_length:xc,max_length:kc,length_equals:(e,n)=>wc(e,n.length),min_size:xc,max_size:kc,size_equals:(e,n)=>wc(e,n.size),string_format:(e,n)=>{qc(e,n.format),n.pattern&&Nc(e,n.pattern),(n.format==="base64"||n.format==="base64url")&&(e.contentEncoding=n.format),(n.local||n.precision===-1)&&(e.laxFormat=!0)},mime_type:(e,n)=>Bc(e,n.mime)};function pn(e){let n={},t=e._zod.def,o=e._zod.traits.has("$ZodCheck")?[e,...t.checks??[]]:t.checks??[];for(let r of o)xm[r._zod.def.check]?.(n,r._zod.def);let i=e._zod.bag;i.minimum!==void 0&&kt(n,"minimum",i.minimum),i.exclusiveMinimum!==void 0&&kt(n,"exclusiveMinimum",i.exclusiveMinimum),i.maximum!==void 0&&St(n,"maximum",i.maximum),i.exclusiveMaximum!==void 0&&St(n,"exclusiveMaximum",i.exclusiveMaximum),i.multipleOf!==void 0&&Mc(n,i.multipleOf),i.format!==void 0&&(n.format??(n.format=i.format),i.format.includes("int")&&(n.isInt=!0)),i.mime&&Bc(n,i.mime);for(let r of i.patterns??[])Nc(n,r);return n}var km={guid:"uuid",url:"uri",datetime:"date-time",json_string:"json-string",regex:""},Sm=new Map([[Gr,Hs],[Fo,Vs]]),zc=e=>Sm.get(e)??e,Cc=(e,n,t,o)=>{let i=t;i.type="string";let{minimum:r,maximum:s,format:c,patterns:l,contentEncoding:u,laxFormat:d}=pn(e);if(typeof r=="number"&&(i.minLength=r),typeof s=="number"&&(i.maxLength=s),c&&(i.format=km[c]??c,i.format===""&&delete i.format,(c==="time"||d)&&delete i.format),u&&(i.contentEncoding=u),l&&l.size>0){let p=[...l].map(zc);p.length===1?i.pattern=p[0].source:p.length>1&&(i.allOf=[...p.map(h=>({...n.target==="draft-07"||n.target==="draft-04"||n.target==="openapi-3.0"?{type:"string"}:{},pattern:h.source}))])}},Lc=(e,n,t,o)=>{let i=t,{minimum:r,maximum:s,multipleOf:c,exclusiveMaximum:l,exclusiveMinimum:u,isInt:d}=pn(e);i.type=d?"integer":"number";let p=typeof u=="number"&&u>=(r??Number.NEGATIVE_INFINITY),h=typeof l=="number"&&l<=(s??Number.POSITIVE_INFINITY),m=n.target==="draft-04"||n.target==="openapi-3.0";if(p?m?(i.minimum=u,i.exclusiveMinimum=!0):i.exclusiveMinimum=u:typeof r=="number"&&(i.minimum=r),h?m?(i.maximum=l,i.exclusiveMaximum=!0):i.exclusiveMaximum=l:typeof s=="number"&&(i.maximum=s),c){let v=new Set;for(let k of c)Number.isFinite(k)&&k!==0?v.add(Math.abs(k)):En(e,n,i,o,`A multipleOf divisor of ${k} cannot be represented in JSON Schema`);let[g,...b]=v;g!==void 0&&(i.multipleOf=g),b.length&&(i.allOf=[...i.allOf??[],...b.map(k=>({multipleOf:k}))])}},Pc=(e,n,t,o)=>{t.type="boolean"};var Ac=(e,n,t,o)=>{n.target==="openapi-3.0"?(t.type="string",t.nullable=!0,t.enum=[null]):t.type="null"};var Ec=(e,n,t,o)=>{t.not={}};var Ic=(e,n,t,o)=>{};var Dc=(e,n,t,o)=>{let i=e._zod.def,r=gt(i.entries);if(r.length===0){t.not={};return}r.every(s=>typeof s=="number")&&(t.type="number"),r.every(s=>typeof s=="string")&&(t.type="string"),t.enum=r},$c=(e,n,t,o)=>{let i=e._zod.def;if(i.values.length===0){t.not={};return}let r=[];for(let s of i.values)if(s===void 0){if(En(e,n,t,o,"Literal `undefined` cannot be represented in JSON Schema"))return}else if(typeof s=="bigint"){if(En(e,n,t,o,"BigInt literals cannot be represented in JSON Schema"))return;r.push(Number(s))}else r.push(s);if(r.length!==0)if(r.length===1){let s=r[0];t.type=s===null?"null":typeof s,n.target==="draft-04"||n.target==="openapi-3.0"?t.enum=[s]:t.const=s}else r.every(s=>typeof s=="number")&&(t.type="number"),r.every(s=>typeof s=="string")&&(t.type="string"),r.every(s=>typeof s=="boolean")&&(t.type="boolean"),r.every(s=>s===null)&&(t.type="null"),t.enum=r};var Tc=(e,n,t,o)=>{En(e,n,t,o,"Custom types cannot be represented in JSON Schema")};var Oc=(e,n,t,o)=>{En(e,n,t,o,"Transforms cannot be represented in JSON Schema")};var Rc=(e,n,t,o)=>{let i=t,r=e._zod.def,{minimum:s,maximum:c}=pn(e);typeof s=="number"&&(i.minItems=s),typeof c=="number"&&(i.maxItems=c),i.type="array",i.items=Ce(r.element,n,{...o,path:[...o.path,"items"]})};function Yo(e){let n=e._zod.def;return n.type==="pipe"&&n.in._zod.traits.has("$ZodTransform")?Yo(n.out):n.type==="catch"?Yo(n.innerType):e._zod.optin}var Zc=(e,n,t,o)=>{let i=t,r=e._zod.def,s=r.shape;if(Object.getOwnPropertySymbols(s).length&&En(e,n,i,o,"Symbol keys cannot be represented in JSON Schema"))return;i.type="object",i.properties={};for(let u in s)rn(i.properties,u,Ce(s[u],n,{...o,path:[...o.path,"properties",u]}));let l=[];for(let u of Object.keys(s)){let d=r.shape[u];(n.io==="input"?Yo(d)===void 0:d._zod.optout===void 0)&&l.push(u)}l.length>0&&(i.required=l),r.catchall?._zod.def.type==="never"?i.additionalProperties=!1:r.catchall?r.catchall&&(i.additionalProperties=Ce(r.catchall,n,{...o,path:[...o.path,"additionalProperties"]})):n.io==="output"&&(i.additionalProperties=!1)},Fc=(e,n,t,o)=>{let i=e._zod.def,r=i.inclusive===!1,s=i.options.map((c,l)=>Ce(c,n,{...o,path:[...o.path,r?"oneOf":"anyOf",l]}));r?t.oneOf=s:t.anyOf=s},Uc=(e,n,t,o)=>{let i=e._zod.def,r=Ce(i.left,n,{...o,path:[...o.path,"allOf",0]}),s=Ce(i.right,n,{...o,path:[...o.path,"allOf",1]}),c=u=>"allOf"in u&&Object.keys(u).length===1,l=[...c(r)?r.allOf:[r],...c(s)?s.allOf:[s]];t.allOf=l,n.intersections.push(l)};function yi(e,n,t){if(n.$ref){if(t.has(n))return n;t.add(n);let v=e.get(n)?.def;if(!v)return n;let g=yi(e,v,t);return g===v?n:g}for(let v of["anyOf","oneOf"]){let g=n[v];if(!Array.isArray(g))continue;let b=g.map(k=>yi(e,k,t));b.some((k,N)=>k!==g[N])&&(n={...n,[v]:b})}let o=Array.isArray(n.type)?n.type:[n.type],i=!o.includes("string")&&o.some(v=>v==="number"||v==="integer"),r=n.enum??(n.const!==void 0?[n.const]:void 0);if(!i&&!r?.some(v=>typeof v=="number"))return n;let{minimum:s,maximum:c,exclusiveMinimum:l,exclusiveMaximum:u,multipleOf:d,format:p,id:h,...m}=n;return m.enum?m.enum=m.enum.map(v=>typeof v=="number"?String(v):v):typeof m.const=="number"&&(m.const=String(m.const)),i&&(m.type="string",r||(m.pattern=(o.includes("number")?Jt:Hr).source)),m}var _i=new WeakMap;function Mm(e){let n=new Map;for(let o of e.seen.values())o.def&&!n.has(o.schema)&&n.set(o.schema,o);let t=new Map;for(let o of _i.get(e)??[]){let i=e.seen.get(o),r=(i?.def??i?.schema)?.propertyNames;if(!r||r===!0||t.has(r))continue;let s=yi(n,r,new Set);s!==r&&t.set(r,s)}if(t.size)for(let o of e.seen.values())for(let i of[o.schema,o.def]){let r=i&&t.get(i.propertyNames);r&&(i.propertyNames=r)}}var Hc=(e,n,t,o)=>{let i=t,r=e._zod.def;i.type="object";let s=r.keyType,c=pn(s).patterns;if(r.mode==="loose"&&c&&c.size>0){let d=Ce(r.valueType,n,{...o,path:[...o.path,"patternProperties","*"]});i.patternProperties={};for(let p of c)rn(i.patternProperties,zc(p).source,d)}else{if(n.target==="draft-07"||n.target==="draft-2020-12"){i.propertyNames=Ce(r.keyType,n,{...o,path:[...o.path,"propertyNames"]});let d=_i.get(n);d||(d=[],_i.set(n,d),n.deferred.push(()=>Mm(n))),d.push(e)}i.additionalProperties=Ce(r.valueType,n,{...o,path:[...o.path,"additionalProperties"]})}let l=s._zod.values,u=n.io==="input"&&Yo(r.valueType)!==void 0;if(l&&!r.partial&&!u){let d=[...l].filter(p=>typeof p=="string"||typeof p=="number");d.length>0&&(i.required=d.map(String))}},Vc=(e,n,t,o)=>{let i=e._zod.def,r=Ce(i.innerType,n,o),s=n.seen.get(e);n.target==="openapi-3.0"?(s.ref=i.innerType,t.nullable=!0):t.anyOf=[r,{type:"null"}]},jc=(e,n,t,o)=>{let i=e._zod.def;Ce(i.innerType,n,o);let r=n.seen.get(e);r.ref=i.innerType},wi=Symbol();function Kc(e,n,t,o,i){let r=!1,s=JSON.stringify(e,(c,l)=>typeof l!="bigint"?l:(r=!0,null));return r?(En(n,t,o,i,"BigInt defaults cannot be represented in JSON Schema"),wi):JSON.parse(s)}var Wc=(e,n,t,o)=>{let i=e._zod.def;Ce(i.innerType,n,o);let r=n.seen.get(e);r.ref=i.innerType;let s=Kc(i.defaultValue,e,n,t,o);s!==wi&&(t.default=s)},Jc=(e,n,t,o)=>{let i=e._zod.def;Ce(i.innerType,n,o);let r=n.seen.get(e);if(r.ref=i.innerType,n.io!=="input")return;let s=Kc(i.defaultValue,e,n,t,o);s!==wi&&(t._prefault=s)},Gc=(e,n,t,o)=>{let i=e._zod.def;Ce(i.innerType,n,o);let r=n.seen.get(e);r.ref=i.innerType;let s;try{s=i.catchValue(void 0)}catch{En(e,n,t,o,"Dynamic catch values are not supported in JSON Schema");return}t.default=s},Xc=(e,n,t,o)=>{let i=e._zod.def,r=i.in._zod.traits.has("$ZodTransform"),s=n.io==="input"?r?i.out:i.in:i.out;Ce(s,n,o);let c=n.seen.get(e);c.ref=s},Yc=(e,n,t,o)=>{let i=e._zod.def;Ce(i.innerType,n,o);let r=n.seen.get(e);r.ref=i.innerType,t.readOnly=!0};var xi=(e,n,t,o)=>{let i=e._zod.def;Ce(i.innerType,n,o);let r=n.seen.get(e);r.ref=i.innerType},Qc=(e,n,t,o)=>{let i=e._zod.innerType;Ce(i,n,o);let r=n.seen.get(e);r.ref=i};var eu=new WeakSet([Object.prototype,Error.prototype]);function Qo(e,n,t){Object.defineProperty(e,n,{configurable:!0,enumerable:!1,get(){let o=t(this);return Object.defineProperty(this,n,{value:o,configurable:!0,writable:!0}),o},set(o){Object.defineProperty(this,n,{value:o,configurable:!0,writable:!0})}})}var Am=(e,n)=>{vs.init(e,n),e.name="ZodError";let t=Object.getPrototypeOf(e);eu.has(t)||(eu.add(t),Qo(t,"format",o=>i=>ys(o,i)),Qo(t,"flatten",o=>i=>bs(o,i)),Qo(t,"addIssue",o=>i=>{o.issues.push(i),o.message=JSON.stringify(o.issues,vt,2)}),Qo(t,"addIssues",o=>i=>{o.issues.push(...i),o.message=JSON.stringify(o.issues,vt,2)}),Object.defineProperty(t,"isEmpty",{configurable:!0,enumerable:!1,get(){return this.issues.length===0}}))};var an=$("ZodError",Am,void 0,{Parent:Error});var nu=Po(an),tu=Ao(an),ou=Eo(an),ru=Io(an),iu=ws(an),su=xs(an),au=ks(an),lu=Ss(an),cu=Ms(an),uu=Ns(an),du=Bs(an),pu=qs(an);function Im(){Ye.localeError||sn(Cl())}function nr(){Ye.memoizer||sn({memoizer:zl()})}var Se=$("ZodType",(e,n)=>(Im(),we.init(e,n),e.def=n,e.type=n.type,e),{check(...e){let n=this.def;return this.clone(oe.mergeDefs(n,{checks:[...n.checks??[],...e.map(t=>typeof t=="function"?{_zod:{check:t,def:{check:"custom"},onattach:[]}}:t)]}),{parent:!0})},with(...e){return this.check(...e)},clone(e,n){return vn(this,e,n)},brand(){return this},register(e,n){return e.add(this,n),this},refine(e,n){return this.check(Ef(e,n))},superRefine(e,n){return this.check(If(e,n))},overwrite(e){return this.check(Kn(e))},optional(){return gu(this)},exactOptional(){return yf(this)},nullable(){return vu(this)},nullish(){return gu(vu(this))},nonoptional(e){return Mf(this,e)},array(){return xe(this)},or(e){return Mt([this,e])},and(e){return hf(this,e)},transform(e){return bu(this,bf(e))},default(e){return xf(this,e)},prefault(e){return Sf(this,e)},catch(e){return Bf(this,e)},pipe(e){return bu(this,e)},readonly(){return Cf(this)},describe(e){let n=this.clone();return it.add(n,{description:e}),n},meta(...e){if(e.length===0)return it.get(this);let n=this.clone();return it.add(n,e[0]),n},isOptional(){return this.safeParse(void 0).success},isNullable(){return this.safeParse(null).success},apply(e,...n){return n.length===0?e(this):e(this,...n)},get"~standard"(){return oe.hide(this,"~standard",{...Jr(this),jsonSchema:{input:oo(this,"input"),output:oo(this,"output")}})},set"~standard"(e){oe.own(this,"~standard",e)},parse:function e(n,t){return nu(this,n,t,{callee:e})},parseAsync:async function e(n,t){return await tu(this,n,t,{callee:e})},safeParse(e,n){return ou(this,e,n)},async safeParseAsync(e,n){return ru(this,e,n)},get spa(){return this?.safeParseAsync},set spa(e){oe.own(this,"spa",e)},validate(e,n){return Rr(this,e,n)},validateAsync(e,n){return Zr(this,e,n)},encode:function e(n,t){return iu(this,n,t,{callee:e})},decode:function e(n,t){return su(this,n,t,{callee:e})},encodeAsync:async function e(n,t){return await au(this,n,t,{callee:e})},decodeAsync:async function e(n,t){return await lu(this,n,t,{callee:e})},safeEncode(e,n){return cu(this,e,n)},safeDecode(e,n){return uu(this,e,n)},async safeEncodeAsync(e,n){return du(this,e,n)},async safeDecodeAsync(e,n){return pu(this,e,n)},toJSONSchema(e){return _c(this,{})(e)},get description(){return it.get(this)?.description},get _def(){return this._zod.def}}),yu=$("_ZodString",(e,n)=>{Zo.init(e,n),Se.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Cc(e,t,o,i)},oe.derived({format:e=>pn(e).format??null,minLength:e=>pn(e).minimum??null,maxLength:e=>pn(e).maximum??null},{regex(...e){return this.check(ri(...e))},includes(...e){return this.check(ai(...e))},startsWith(...e){return this.check(li(...e))},endsWith(...e){return this.check(ci(...e))},min(...e){return this.check(xt(...e))},max(...e){return this.check(Go(...e))},length(...e){return this.check(Xo(...e))},nonempty(...e){return this.check(xt(1,...e))},lowercase(e){return this.check(ii(e))},uppercase(e){return this.check(si(e))},trim(){return this.check(di())},normalize(...e){return this.check(ui(...e))},toLowerCase(){return this.check(pi())},toUpperCase(){return this.check(mi())},slugify(){return this.check(fi())}})),Dm=$("ZodString",(e,n)=>{Zo.init(e,n),yu.init(e,n)},{email(e){return this.check(El(Zm,e))},url(e){return this.check(Rl(Um,e))},jwt(e){return this.check(nc(rf,e))},emoji(e){return this.check(Zl(Hm,e))},guid(e){return this.check(Il(Fm,e))},uuid(e){return this.check(Dl(er,e))},uuidv4(e){return this.check($l(er,e))},uuidv6(e){return this.check(Tl(er,e))},uuidv7(e){return this.check(Ol(er,e))},nanoid(e){return this.check(Fl(Vm,e))},cuid(e){return this.check(Ul(jm,e))},cuid2(e){return this.check(Hl(Km,e))},ulid(e){return this.check(Vl(Wm,e))},base64(e){return this.check(Yl(nf,e))},base64url(e){return this.check(Ql(tf,e))},xid(e){return this.check(jl(Jm,e))},ksuid(e){return this.check(Kl(Gm,e))},ipv4(e){return this.check(Wl(Xm,e))},ipv6(e){return this.check(Jl(Ym,e))},cidrv4(e){return this.check(Gl(Qm,e))},cidrv6(e){return this.check(Xl(ef,e))},e164(e){return this.check(ec(of,e))},datetime(e){return this.check(tc($m,e))},date(e){return this.check(oc(Tm,e))},time(e){return this.check(rc(Om,e))},duration(e){return this.check(ic(Rm,e))}});function ne(e){return Al(Dm,e)}var qe=$("ZodStringFormat",(e,n)=>{ke.init(e,n),yu.init(e,n)}),$m=$("ZodISODateTime",(e,n)=>{Za.init(e,n),qe.init(e,n)}),Tm=$("ZodISODate",(e,n)=>{Fa.init(e,n),qe.init(e,n)}),Om=$("ZodISOTime",(e,n)=>{Ua.init(e,n),qe.init(e,n)}),Rm=$("ZodISODuration",(e,n)=>{Ha.init(e,n),qe.init(e,n)}),Zm=$("ZodEmail",(e,n)=>{Ca.init(e,n),qe.init(e,n)});var Fm=$("ZodGUID",(e,n)=>{qa.init(e,n),qe.init(e,n)});var er=$("ZodUUID",(e,n)=>{za.init(e,n),qe.init(e,n)});var Um=$("ZodURL",(e,n)=>{Aa.init(e,n),qe.init(e,n)});var Hm=$("ZodEmoji",(e,n)=>{Ea.init(e,n),qe.init(e,n)});var Vm=$("ZodNanoID",(e,n)=>{Ia.init(e,n),qe.init(e,n)});var jm=$("ZodCUID",(e,n)=>{Da.init(e,n),qe.init(e,n)});var Km=$("ZodCUID2",(e,n)=>{$a.init(e,n),qe.init(e,n)});var Wm=$("ZodULID",(e,n)=>{Ta.init(e,n),qe.init(e,n)});var Jm=$("ZodXID",(e,n)=>{Oa.init(e,n),qe.init(e,n)});var Gm=$("ZodKSUID",(e,n)=>{Ra.init(e,n),qe.init(e,n)});var Xm=$("ZodIPv4",(e,n)=>{Va.init(e,n),qe.init(e,n)});var Ym=$("ZodIPv6",(e,n)=>{Ka.init(e,n),qe.init(e,n)});var Qm=$("ZodCIDRv4",(e,n)=>{Wa.init(e,n),qe.init(e,n)});var ef=$("ZodCIDRv6",(e,n)=>{Ja.init(e,n),qe.init(e,n)});var nf=$("ZodBase64",(e,n)=>{Xa.init(e,n),qe.init(e,n)});var tf=$("ZodBase64URL",(e,n)=>{Ya.init(e,n),qe.init(e,n)});var of=$("ZodE164",(e,n)=>{Qa.init(e,n),qe.init(e,n)});var rf=$("ZodJWT",(e,n)=>{el.init(e,n),qe.init(e,n)});var _u=$("ZodNumber",(e,n)=>{Xr.init(e,n),Se.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Lc(e,t,o,i),e.isFinite=!0},oe.derived({minValue:e=>{let{minimum:n,exclusiveMinimum:t}=pn(e);return Math.max(n??Number.NEGATIVE_INFINITY,t??Number.NEGATIVE_INFINITY)},maxValue:e=>{let{maximum:n,exclusiveMaximum:t}=pn(e);return Math.min(n??Number.POSITIVE_INFINITY,t??Number.POSITIVE_INFINITY)},isInt:e=>{let{isInt:n,multipleOf:t}=pn(e);return!!n||!!t?.some(Number.isSafeInteger)},format:e=>pn(e).format??null},{gt(e,n){return this.check(Wo(e,n))},gte(e,n){return this.check(no(e,n))},min(e,n){return this.check(no(e,n))},lt(e,n){return this.check(Ko(e,n))},lte(e,n){return this.check(eo(e,n))},max(e,n){return this.check(eo(e,n))},int(e){return this.check(mu(e))},safe(e){return this.check(mu(e))},positive(e){return this.check(Wo(0,e))},nonnegative(e){return this.check(no(0,e))},negative(e){return this.check(Ko(0,e))},nonpositive(e){return this.check(eo(0,e))},multipleOf(e,n){return this.check(Jo(e,n))},step(e,n){return this.check(Jo(e,n))},finite(){return this}}));function Qe(e){return sc(_u,e)}var sf=$("ZodNumberFormat",(e,n)=>{nl.init(e,n),_u.init(e,n)});function mu(e){return ac(sf,e)}var af=$("ZodBoolean",(e,n)=>{tl.init(e,n),Se.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Pc(e,t,o,i)});function pe(e){return lc(af,e)}var lf=$("ZodNull",(e,n)=>{ol.init(e,n),Se.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Ac(e,t,o,i)});function ro(e){return cc(lf,e)}var cf=$("ZodUnknown",(e,n)=>{rl.init(e,n),Se.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Ic(e,t,o,i)});function fu(){return uc(cf)}var uf=$("ZodNever",(e,n)=>{il.init(e,n),Se.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Ec(e,t,o,i)});function wu(e){return dc(uf,e)}var df=$("ZodArray",(e,n)=>{nr(),sl.init(e,n),Se.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Rc(e,t,o,i),e.element=n.element},{min(e,n){return this.check(xt(e,n))},nonempty(e){return this.check(xt(1,e))},max(e,n){return this.check(Go(e,n))},length(e,n){return this.check(Xo(e,n))},unwrap(){return this.element}});function xe(e,n){return pc(df,e,n)}var pf=$("ZodObject",(e,n)=>{nr(),cl.init(e,n),Se.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Zc(e,t,o,i),oe.installLazyProp(e,"shape",t=>t._zod.def.shape,!1)},{keyof(){return se(Object.keys(this._zod.def.shape))},catchall(e){return this.clone(oe.mergeDefs(this._zod.def,{catchall:e}))},passthrough(){return this.clone(oe.mergeDefs(this._zod.def,{catchall:fu()}))},loose(){return this.clone(oe.mergeDefs(this._zod.def,{catchall:fu()}))},strict(){return this.clone(oe.mergeDefs(this._zod.def,{catchall:wu()}))},strip(){return this.clone(oe.mergeDefs(this._zod.def,{catchall:void 0}))},extend(e){return oe.extend(this,e)},safeExtend(e){return oe.safeExtend(this,e)},merge(e){return oe.merge(this,e)},pick(e){return oe.pick(this,e)},omit(e){return oe.omit(this,e)},partial(...e){return oe.partial(ku,this,e[0])},exactPartial(...e){return oe.partial(Su,this,e[0],"exactPartial")},required(...e){return oe.required(Mu,this,e[0])}});function J(e,n){return new pf({type:"object",shape:e,catchall:wu(),...oe.normalizeParams(n)})}var xu=$("ZodUnion",(e,n)=>{Yr.init(e,n),Se.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Fc(e,t,o,i),e.options=n.options});function Mt(e,n){return new xu({type:"union",options:e,...oe.normalizeParams(n)})}var mf=$("ZodDiscriminatedUnion",(e,n)=>{xu.init(e,n),ul.init(e,n)});function Nt(e,n,t){return new mf({type:"union",options:n,discriminator:e,...oe.normalizeParams(t)})}var ff=$("ZodIntersection",(e,n)=>{dl.init(e,n),Se.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Uc(e,t,o,i)});function hf(e,n){return new ff({type:"intersection",left:e,right:n})}var hu=$("ZodRecord",(e,n)=>{nr(),pl.init(e,n),Se.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Hc(e,t,o,i),e.keyType=n.keyType,e.valueType=n.valueType});function Mi(e,n,t){return!n||!n._zod?new hu({type:"record",keyType:ne(),valueType:e,...oe.normalizeParams(n)}):new hu({type:"record",keyType:e,valueType:n,...oe.normalizeParams(t)})}var Si=$("ZodEnum",(e,n)=>{ml.init(e,n),Se.init(e,n),e._zod.processJSONSchema=(o,i,r)=>Dc(e,o,i,r),e.enum=n.entries,e.options=[...e._zod.values];let t=new Set(Object.keys(n.entries));e.extract=(o,i)=>{let r={};for(let s of o)if(t.has(s))r[s]=n.entries[s];else throw new Error(`Key ${s} not found in enum`);return new Si({...n,checks:[],...oe.normalizeParams(i),entries:r})},e.exclude=(o,i)=>{let r={...n.entries};for(let s of o)if(t.has(s))delete r[s];else throw new Error(`Key ${s} not found in enum`);return new Si({...n,checks:[],...oe.normalizeParams(i),entries:r})}});function se(e,n){let t=Array.isArray(e)?Object.fromEntries(e.map(o=>[o,o])):e;return new Si({type:"enum",entries:t,...oe.normalizeParams(n)})}var gf=$("ZodLiteral",(e,n)=>{fl.init(e,n),Se.init(e,n),e._zod.processJSONSchema=(t,o,i)=>$c(e,t,o,i),e.values=new Set(n.values),Object.defineProperty(e,"value",{get(){if(n.values.length>1)throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");return n.values[0]}})});function he(e,n){return new gf({type:"literal",values:Array.isArray(e)?e:[e],...oe.normalizeParams(n)})}var vf=$("ZodTransform",(e,n)=>{nr(),hl.init(e,n),Se.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Oc(e,t,o,i),e._zod.parse=(t,o)=>{if(o.direction==="backward")throw new wt(e.constructor.name);t.addIssue=r=>{if(typeof r=="string")t.issues.push(oe.issue(r,t.value,n));else{let s=r;s.fatal&&(s.continue=!1),s.code??(s.code="custom"),"input"in s||(s.input=t.value),s.inst??(s.inst=e),t.issues.push(oe.issue(s))}};let i=n.transform(t.value,t);return i instanceof Promise?i.then(r=>(t.value=r,t)):(t.value=i,t)}});function bf(e){return new vf({type:"transform",transform:e})}var ku=$("ZodOptional",(e,n)=>{Qr.init(e,n),Se.init(e,n),e._zod.processJSONSchema=(t,o,i)=>xi(e,t,o,i),e.unwrap=()=>e._zod.def.innerType});function gu(e){return new ku({type:"optional",innerType:e})}var Su=$("ZodExactOptional",(e,n)=>{gl.init(e,n),Se.init(e,n),e._zod.processJSONSchema=(t,o,i)=>xi(e,t,o,i),e.unwrap=()=>e._zod.def.innerType});function yf(e){return new Su({type:"optional",innerType:e})}var _f=$("ZodNullable",(e,n)=>{vl.init(e,n),Se.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Vc(e,t,o,i),e.unwrap=()=>e._zod.def.innerType});function vu(e){return new _f({type:"nullable",innerType:e})}var wf=$("ZodDefault",(e,n)=>{bl.init(e,n),Se.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Wc(e,t,o,i),e.unwrap=()=>e._zod.def.innerType,e.removeDefault=e.unwrap});function xf(e,n){return new wf({type:"default",innerType:e,get defaultValue(){return typeof n=="function"?n():oe.shallowClone(n)}})}var kf=$("ZodPrefault",(e,n)=>{yl.init(e,n),Se.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Jc(e,t,o,i),e.unwrap=()=>e._zod.def.innerType});function Sf(e,n){return new kf({type:"prefault",innerType:e,get defaultValue(){return typeof n=="function"?n():oe.shallowClone(n)}})}var Mu=$("ZodNonOptional",(e,n)=>{_l.init(e,n),Se.init(e,n),e._zod.processJSONSchema=(t,o,i)=>jc(e,t,o,i),e.unwrap=()=>e._zod.def.innerType});function Mf(e,n){return new Mu({type:"nonoptional",innerType:e,...oe.normalizeParams(n)})}var Nf=$("ZodCatch",(e,n)=>{wl.init(e,n),Se.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Gc(e,t,o,i),e.unwrap=()=>e._zod.def.innerType,e.removeCatch=e.unwrap});function Bf(e,n){return new Nf({type:"catch",innerType:e,catchValue:typeof n=="function"?n:oe.constantCatch(n)})}var qf=$("ZodPipe",(e,n)=>{xl.init(e,n),Se.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Xc(e,t,o,i),e.in=n.in,e.out=n.out});function bu(e,n){return new qf({type:"pipe",in:e,out:n})}var zf=$("ZodReadonly",(e,n)=>{kl.init(e,n),Se.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Yc(e,t,o,i),e.unwrap=()=>e._zod.def.innerType});function Cf(e){return new zf({type:"readonly",innerType:e})}var Lf=$("ZodLazy",(e,n)=>{Sl.init(e,n),Se.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Qc(e,t,o,i),e.unwrap=()=>e._zod.def.getter()});function Pf(e){return new Lf({type:"lazy",getter:e})}var Af=$("ZodCustom",(e,n)=>{Ml.init(e,n),Se.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Tc(e,t,o,i)});function Ef(e,n={}){return mc(Af,e,n)}function If(e,n){return fc(e,n)}function Nu(e){let n=Pf(()=>Mt([ne(e),Qe(),pe(),ro(),xe(n),Mi(ne(),n)]));return n}var tr=Object.freeze(["panel-open","panel-close","panel-move","page-home","page-settings","page-settings-tab","page-model-tab","page-setup","page-authorization","page-repair","page-session-management","open-native-session","open-feedback","change-listen-mode","change-audio-device","edit-choice","commit-form","activate-control","dismiss","details-toggle","keyboard-navigation","ui-connect","ui-reconnect","ui-status-refresh","ui-request","ui-stream","ui-render-error","ui-action-error","ui-read-recovery","manage-session","start-voice","stop-voice","ui-buffer-overflow","session-history-open","session-history-close","subagent-history-open","subagent-history-close","show-subagents","show-main-sessions","open-native-subagent","new-voice-session","bind-current-session","retry-voice-transcript","bind-existing-session","unbind-existing-session","listen-mode-ptt","listen-mode-always","listen-mode-wake","settings-audio","settings-interaction","settings-prompt","settings-models","settings-advanced","settings-pets"]),Bu=64*1024,io=64,qu=10080*60*1e3;var Ni="whaleConversation",be=(e,n)=>({mode:"strict",typeSymbol:`dsh-fish-voice/conversation#${e}`,create:n}),zi=be("sessionId",()=>ne().min(1).max(256)),Df=be("settingsSessionId",()=>zi.create().nullable()),Iu=new Set(["status","read-settings","listen-mode","complete-setup","set-visibility","inspect-tts","save-tts","preview-tts","cancel-tts","save-models","model-installer","inspect-model-compute","plan-model-install","start-model-install","control-model-install","apply-model-install","pick-local-path","enable","disable","new","resume","read-history","read-audio-devices","save-audio-device","save-settings","capture-bindings","save-bindings","save-voice-prompt","conversation-models","save-conversation-model","inspect-performance","set-performance-mode","read-output-volume","set-output-volume"]),$f=be("volumeRequest",()=>J({revision:Qe().int().nonnegative(),volume:Qe().min(0).max(1)})),zu=J({id:ne(),role:se(["user","assistant"]),text:ne().max(8e3),state:se(["reply","interrupted","delivered","speech-requested","speech-failed"]),at:Qe()}),Tf=J({state:se(["disabled","starting","waiting","listening","paused","error"]),deadlineAt:Qe().nonnegative().nullable(),streamOpen:pe(),detection:se(["asr-after-utterance","acoustic-after-utterance"])}),Du=ne().uuid(),Of=J({sessionId:zi.create(),items:xe(J({id:Du,text:ne().max(8e3),state:se(["busy","ready","sending","uncertain"])})).max(8)}),Rf=be("snapshot",()=>J({revision:Qe().int().nonnegative(),historyGeneration:Qe().int().nonnegative().optional(),rootSessionId:ne().nullable(),title:ro(),latest:zu.nullable(),items:xe(zu).max(40),inputActive:pe(),inputError:se(["device","recognition","no-speech"]).nullable().optional(),providerError:ne().max(480).optional(),retryTranscripts:Of.nullable().optional(),playbackConfirmed:he(!1),wake:Tf.optional(),helper:J({online:pe(),listenMode:se(["ptt","always","wake"]).nullable()}).refine(e=>e.online||e.listenMode===null).optional()})),Zf=be("volume",()=>J({supported:pe(),backend:he("dsh-speak").nullable(),volume:Qe().min(0).max(1).nullable(),revision:Qe().int().nullable(),apply:he("next-output").nullable(),reason:ne().nullable()})),Y=ne().max(4096),Re=Qe().int().nonnegative().max(Number.MAX_SAFE_INTEGER),Ff=J({code:ne().max(64),message:ne().max(512)}),or=J({available:pe(),reason:Y.nullable(),runtimeLoaded:he(!1),backend:Y.optional(),provider:Y.optional(),device:Y.optional(),computeType:Y.optional(),supportedComputeTypes:xe(Y).max(32).optional(),deviceCount:Re.optional(),deviceIndex:Re.optional(),validation:Y.optional(),note:Y.optional(),providerAdvertised:pe().optional()}),Uf=J({schema:he(1),default:he("cpu"),observedAt:Y.nullable(),reason:Y.optional(),backends:J({sensevoice:J({cpu:or,cuda:or}).optional(),whisper:J({cpu:or,cuda:or}).optional()})}),Hf=J({observedAt:Y,scope:he("plugin-host"),platform:Y,arch:Y,cpuLogicalCores:Re.nullable(),totalMemoryBytes:Re.nullable(),availableMemoryBytes:Re.nullable(),gpuMemoryBytes:Re.nullable(),gpuMemoryReason:Y,gpuSource:he("dxgi").nullable().optional(),gpuAdapters:xe(J({name:ne().min(1).max(256),dedicatedVideoMemoryBytes:Re,sharedSystemMemoryBytes:Re})).max(32).optional()}),Vf=J({modelId:Y,confidence:se(["not-assessed","unknown","heuristic-only"]),recommended:pe(),badge:Y.nullable(),state:se(["manual-choice","unknown","recommended-pending-runtime-validation","limited-memory","busy-memory","recommended-lightweight"]),reason:Y,policy:Y.optional(),runtimeValidated:he(!1).optional(),gpuValidated:he(!1).optional()}),jf=J({release:Y,source:Y,sources:xe(Y).max(16).optional(),redirectHost:Y,platform:Y,arch:Y,executable:Y,licenseUrls:xe(Y).max(20)}),Kf=J({jobId:Y,modelId:Y,status:se(["waiting","verifying","applied","blocked","paused","cancelled"]),reason:Y.nullable()}),Wf=J({id:Y,runtime:jf.nullable().optional(),purpose:se(["tts","asr"]).optional(),computeOptions:xe(se(["cpu","auto","cuda","vulkan"])).max(4).optional(),recommendation:Vf,title:Y,backend:Y.nullable(),available:pe(),reason:Y.nullable(),totalBytes:Re.nullable(),source:Y.nullable(),licenseUrls:xe(Y).max(20),licenseNote:Y.nullable(),verification:Y.optional(),runtimeLoaded:he(!1)}),Jf=J({id:ne().uuid(),modelId:Y,compute:se(["cpu","auto","cuda","vulkan"]),status:se(["queued","running","paused","failed","cancelled","installed"]),stage:se(["queued","running","paused","failed","cancelled","installed","checking-runtime","verifying-local","downloading","verifying","installing"]),createdAt:Y,updatedAt:Y,totalBytes:Re,receivedBytes:Re,runtimeLoaded:he(!1),error:Ff.nullable(),currentFile:Y.nullable().optional(),files:xe(J({name:Y,bytes:Re,receivedBytes:Re,verified:pe(),reused:pe().optional()})).max(200),installedPath:Y.optional(),sourceDirectory:Y.optional(),modelVariant:se(["q4_k_m","q8_0"]).optional(),reused:he(!0).optional(),reusedBytes:Re.optional(),purpose:se(["tts","asr"]).optional(),recommendedSettings:Mt([J({tts:J({provider:he("local"),localModelId:Y,localModelPath:Y})}),J({asr:se(["sensevoice","whisper"]),models:J({sensevoiceDir:Y.optional(),whisper:Y.optional()}),modelCompute:se(["cpu","auto","cuda"])})]).optional()}),Gf=be("modelSnapshot",()=>J({schema:he(1),hardware:Hf,compute:Uf,refresh:J({pending:pe(),observedAt:ne().max(64).nullable(),attemptedAt:ne().max(64).nullable(),error:ne().max(512).nullable(),intervalMs:he(3e5)}).optional(),models:xe(Wf).max(32),jobs:xe(Jf).max(1e3),ttsInstallIntent:Kf.nullable().optional()})),Xf=be("authorizationRequest",()=>J({revision:ne().min(1).max(256),grant:pe()})),Yf=be("whisperAsrRequest",()=>Nt("operation",[J({operation:he("status")}),J({operation:he("retry")})])),Cu={state:se(["idle","downloading","ready","error"]),receivedBytes:Re,totalBytes:Re},Qf=be("whisperAsrResult",()=>J({...Cu,selected:pe(),message:ne().max(512).nullable(),acceleration:J(Cu).optional()})),Lu=be("authorization",()=>J({schema:he(1),revision:ne().min(1).max(256),completed:pe(),granted:pe(),usageAgreement:J({version:he(1),accepted:pe(),text:xe(Y).max(16)}).optional(),modelSourcesChanged:pe().optional(),blockedOperations:xe(Y).max(32),revocationUnconfirmed:pe(),scopes:xe(J({id:Y,title:Y,description:Y,allowed:pe()})).max(16),modelSources:xe(J({modelId:Y,source:Y,licenseUrls:xe(Y).max(20),licenseNote:Y,runtime:J({source:Y,sources:xe(Y).max(16).optional(),licenseUrls:xe(Y).max(20),redirectHost:Y.nullable()}).optional()})).max(32),restrictions:xe(Y).max(16)})),eh=be("setup",()=>J({version:he(1),completed:pe()})),en=ne().min(1).max(256),Le=ne().min(1).max(256),Pu=se(["cpu","auto","cuda","vulkan"]),Au={sourceDirectory:ne().min(1).max(4096).optional(),modelVariant:se(["q4_k_m","q8_0"]).optional()},rr=Mi(ne(),Nu()),nh=J({provider:se(["edge","deepseek","local"]),edgeVoice:ne().min(1).max(64),systemVoice:ne().max(256).nullable(),systemFallback:pe(),edgeTextTransmissionAccepted:pe(),volume:Qe().min(0).max(1),localModelId:ne().max(128).nullable(),localModelPath:ne().max(4096).nullable(),referenceAudioPath:ne().max(4096).nullable(),referenceAudioAccepted:pe(),deepseekVoice:se(["stella","tide"]).optional(),deepseekTextTransmissionAccepted:pe().optional()}),th=J({backend:se(["winmm","portaudio"]),id:ne().min(1).max(1024),name:ne().min(1).max(256)}).nullable(),oh={"read-history":{cursor:ne().max(128).optional()},"read-audio-devices":{},"save-audio-device":{revision:en,direction:se(["input","output"]),selection:th},"agent-permissions":{},"save-agent-permissions":{revision:en,allowed:J({"set-performance-mode":pe(),"set-visibility":pe(),"set-output-volume":pe()})},"agent-requests":{},"decide-agent-request":{id:Le,approve:pe(),acknowledgements:xe(ne().max(80)).max(10)},"model-installer":{},"inspect-model-compute":{},"plan-model-install":{modelId:Le,compute:Pu,...Au},"start-model-install":{modelId:Le,compute:Pu,...Au,planHash:en,accepted:he(!0),useWhenReady:pe().optional()},"control-model-install":{id:Le,operation:se(["pause","resume","cancel"])},"apply-model-install":{id:Le,revision:en},status:{},enable:{expectedOwnerSessionId:Le.nullable().optional(),expectedExistingSessionId:Le.nullable().optional()},disable:{},"read-settings":{},new:{expectedOwnerSessionId:Le.nullable().optional()},"inspect-performance":{},"set-performance-mode":{revision:en,performanceMode:se(["fast","balanced","high","compatibility"])},"inspect-tts":{},"save-tts":{revision:en,values:rr},"complete-setup":{revision:en},"preview-tts":{revision:en.optional(),values:nh.optional()},"cancel-tts":{},list:{cursor:ne().max(2048).optional()},resume:{id:Le},"listen-mode":{mode:se(["ptt","always","wake"])},"set-visibility":{revision:en,visibility:se(["hidden","workspace"])},"pick-local-path":{kind:se(["referenceAudio","sensevoiceDir","whisper","campplus","sourceDirectory"])},"capture-bindings":{operation:se(["begin","end"]),token:Le.optional(),inactive:pe().optional()},"save-bindings":{revision:en,values:rr,bindingContext:J({ownerSessionId:Le.nullable(),epoch:Le.nullable(),rootSessionId:Le.nullable()})},"save-voice-prompt":{revision:en,values:J({text:ne().max(32768)})},"conversation-models":{},"save-conversation-model":{revision:en,values:J({mode:se(["auto","manual"]),provider:ne().min(1).max(256).nullable(),model:ne().min(1).max(256).nullable()})},"save-settings":{revision:en,values:rr},"save-models":{revision:en,values:rr}},rh=be("uiActionRequest",()=>Nt("action",Object.entries(oh).map(([e,n])=>J({action:he(e),...n}))).refine(e=>e.action!=="preview-tts"||Object.hasOwn(e,"revision")===Object.hasOwn(e,"values"),"\u8349\u7A3F\u8BD5\u542C\u5FC5\u987B\u540C\u65F6\u63D0\u4F9B\u914D\u7F6E\u7248\u672C\u548C\u8BBE\u7F6E").refine(e=>JSON.stringify(e).length<=(e.action==="save-voice-prompt"?2e5:8192),"\u64CD\u4F5C\u6570\u636E\u8FC7\u957F")),Bi=be("uiActionResult",()=>ne().max(4*1024*1024)),ih=be("repairRequest",()=>Nt("operation",[J({operation:he("status")}),J({operation:he("start"),id:Le,confirmed:he(!0)}),J({operation:he("stop")})])),sh=be("sessionManagementRequest",()=>Nt("operation",[J({operation:he("list"),rootId:Le.optional(),cursor:ne().max(2048).optional()}),J({operation:he("unhide"),rootId:Le,id:Le}),J({operation:he("restore"),rootId:Le,id:Le})])),ah=be("presentation",()=>J({shown:xe(Mt([J({id:Le,parentId:ro(),mode:ro()}),J({id:Le,parentId:Le,mode:se(["one-shot","continuable","unknown"])})]))})),qi=ne().min(1).max(128),lh=be("updateRequest",()=>Nt("action",[J({action:he("check")}),J({action:he("install"),version:qi})])),Eu=be("updateSnapshot",()=>J({schema:he(1),revision:Qe().int().nonnegative().optional(),currentVersion:qi,channel:se(["stable","preview"]),status:se(["idle","checking","current","available","incompatible","installing","restart-required","enable-required","installed","error","unsupported"]),checkedAt:ne().max(64).nullable(),release:J({version:qi,announcement:ne().min(1).max(600),url:ne().startsWith("https://github.com/Emikosama/dsh-fish-voice/releases/tag/v").max(256)}).nullable(),message:ne().max(512).nullable(),canInstall:pe()})),ir=zi.create(),so=J({sessionId:ir,title:ne().max(256).nullable(),availability:se(["ready","busy","unavailable","archived"]),updatedAt:Qe().int().nonnegative().max(864e13).nullable().optional()}),$u=ne().min(1).max(512),ch=be("listExistingSessionsRequest",()=>Mt([J({sessionId:ir}),J({query:ne().max(128).optional(),cursor:$u.optional()})])),uh=be("listExistingSessionsResult",()=>J({items:xe(so).max(100),nextCursor:$u.nullable(),binding:so.nullable()})),dh=be("setExistingSessionRequest",()=>J({sessionId:ir.nullable(),expectedSessionId:ir.nullable()})),ph=be("setExistingSessionResult",()=>J({binding:so.nullable()})),Tu=ne().min(1).max(160).regex(/^[A-Za-z0-9_-]+$/),mh=be("operationLogPageRequest",()=>J({cursor:Tu.optional()})),fh=be("operationLogPage",()=>J({text:ne().max(Bu),nextCursor:Tu.nullable()})),Ou=ne().uuid(),hh=be("operationScopeResult",()=>J({scope:Ou})),gh=be("recordOperationRequest",()=>J({scope:Ou,events:xe(J({id:ne().uuid(),at:Re,action:se(tr),source:se(["user","ui"]),phase:se(["requested","finished"]).optional(),result:se(["ok","failed","cancelled"]).optional(),count:Re.positive().optional()}).refine(e=>e.action==="ui-buffer-overflow"?e.source==="ui"&&e.count!==void 0:e.count===void 0)).min(1).max(io)})),vh=be("recordOperationResult",()=>J({accepted:pe()})),bh=be("retryVoiceTranscriptRequest",()=>J({id:Du})),yh=be("retryVoiceTranscriptResult",()=>J({accepted:pe()})),_h={retryVoiceTranscript:bh,recordClientOperations:gh,readOperationLog:mh,action:rh,saveAuthorization:Xf,repairAction:ih,manageSessions:sh,whisperAsrAction:Yf,updateAction:lh,listExistingVoiceSessions:ch,setExistingVoiceSession:dh},wh={readClientOperationScope:hh,recordClientOperations:vh,readOperationLog:fh,action:Bi,repairAction:Bi,manageSessions:Bi,readAuthorization:Lu,saveAuthorization:Lu,whisperAsrAction:Qf,readSetup:eh,followPresentation:ah,followModels:Gf,followUpdates:Eu,updateAction:Eu,listExistingVoiceSessions:uh,setExistingVoiceSession:ph,retryVoiceTranscript:yh},Ae=(e,n,t=!1)=>({id:`dsh-fish-voice#${Ni}/${e}`,service:Ni,namespace:Ni,method:e,invocation:{kind:"direct"},...t?{mode:"stream"}:{},parameters:n.map(o=>({name:o,wire:o,source:"json",codec:o==="sessionId"?Df:_h[e]??$f})),cancellation:{parameter:"signal"},result:wh[e]??(t?Rf:Zf)}),Ru={package:"dsh-fish-voice/conversation",descriptors:[Ae("action",["sessionId","request"]),Ae("follow",["sessionId"],!0),Ae("followModels",["sessionId"],!0),Ae("followPresentation",[],!0),Ae("followUpdates",[],!0),Ae("updateAction",["request"]),Ae("readSetup",[]),Ae("readAuthorization",[]),Ae("saveAuthorization",["request"]),Ae("whisperAsrAction",["request"]),Ae("repairAction",["request"]),Ae("manageSessions",["sessionId","request"]),Ae("readClientOperationScope",[]),Ae("recordClientOperations",["request"]),Ae("readOperationLog",["request"]),Ae("listExistingVoiceSessions",["request"]),Ae("setExistingVoiceSession",["request"]),Ae("retryVoiceTranscript",["request"]),Ae("readVolume",["sessionId"]),Ae("setVolume",["sessionId","request"])]};var Te=e=>e!==null&&typeof e=="object"&&!Array.isArray(e),Ve=(e,n=1024)=>typeof e=="string"&&e.length<=n,Wn=e=>typeof e=="number"&&Number.isFinite(e),Ee=e=>typeof e=="boolean",Zu=e=>{if(!Ve(e,4096))return!1;try{let n=new URL(e);return["https:","http:"].includes(n.protocol)&&!n.username&&!n.password}catch{return!1}},mn=(e,n=4096)=>e==null||Ve(e,n),Jn=e=>Ve(e,256)&&e.length>0,Me=()=>{throw new Error("\u914D\u7F6E\u63A5\u53E3\u8FD4\u56DE\u4E86\u65E0\u6548\u6570\u636E\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6")};function Ci(e){if(e.onboarding!==void 0&&(!Te(e.onboarding)||e.onboarding.version!==1||!Ee(e.onboarding.completed))&&Me(),e.ttsSetup!==void 0){let n=e.ttsSetup;(!Te(n)||!["unconfigured","edge","deepseek","system","local","off"].includes(n.provider)||!Ve(n.edgeVoice,128)||!(n.systemVoice===null||Ve(n.systemVoice,512))||!Ee(n.systemFallback)||!Ee(n.edgeTextTransmissionAccepted)||!Wn(n.volume)||n.volume<0||n.volume>1||!(n.localModelId==null||Jn(n.localModelId))||!mn(n.localModelPath)||!mn(n.referenceAudioPath)||!(n.referenceAudioAccepted===void 0||Ee(n.referenceAudioAccepted)))&&Me(),(n.deepseekVoice!==void 0&&!["stella","tide"].includes(n.deepseekVoice)||n.deepseekTextTransmissionAccepted!==void 0&&!Ee(n.deepseekTextTransmissionAccepted)||n.provider==="deepseek"&&(n.deepseekVoice===void 0||n.deepseekTextTransmissionAccepted!==!0))&&Me()}if(e.ttsRuntime?.localComputeBackend!=null&&(!["cpu","vulkan","cuda","hip"].includes(e.ttsRuntime.localComputeBackend)||!Ee(e.ttsRuntime.localComputeVerified)||!Ee(e.ttsRuntime.localComputeFallback))&&Me(),e.ttsRuntime?.localTimings!=null){let n=e.ttsRuntime.localTimings;(!Te(n)||typeof n.modelResident!="boolean"||["preparationMs","deviceSelectionMs","synthesisMs","playbackMs","totalMs","chunks"].some(t=>!Number.isSafeInteger(n[t])||n[t]<0)||n.chunks<1||n.chunks>4e3)&&Me()}return e.ttsRuntime!=null&&(!Te(e.ttsRuntime)||!Ve(e.ttsRuntime.state,64)||!Ee(e.ttsRuntime.busy)||!Ee(e.ttsRuntime.blocked))&&Me(),e}function Uu(e,n){if(Te(n)||Me(),e==="setup-status"&&(Object.keys(n).some(t=>!["version","completed"].includes(t))||n.version!==1||!Ee(n.completed))&&Me(),e==="inspect-tts"&&(n.deepseekKeyAvailable!==void 0&&!Ee(n.deepseekKeyAvailable)&&Me(),(!Ve(n.platform,32)||!Ee(n.playbackSupported)||!Ee(n.systemSupported)||!Ee(n.edgePlaybackSupported)||!["installed","missing","unchecked"].includes(n.edgeDependency)||n.autoDownload!==!1||!Ee(n.gpuSupported)||n.edgeOfficialApi!==!1||n.edgeRecipient!=="Microsoft"||n.edgePurpose!=="speech-synthesis"||!Array.isArray(n.installedChineseVoices)||n.installedChineseVoices.length>512||n.installedChineseVoices.some(t=>!Te(t)||!Ve(t.id,512)||!Ve(t.name,512)||!Ve(t.culture,64)))&&Me()),e==="preview-tts"){let t=n.playbackCompleted===!0&&n.textOnly===void 0,o=n.provider==="edge"&&n.playbackCompleted===!1&&n.textOnly===!0&&Ve(n.reason,128);(!["edge","deepseek","local"].includes(n.provider)||n.fallback!==!1||n.acousticConfirmation!==!1||!t&&!o)&&Me()}if(e==="cancel-tts"&&!["idle","cancelled","unconfirmed"].includes(n.status)&&Me(),e==="model-installer"){if((n.schema!==1||!Array.isArray(n.models)||n.models.length>100||!Array.isArray(n.jobs)||n.jobs.length>1e3||!Te(n.hardware)||!Te(n.compute))&&Me(),n.refresh!=null){let t=n.refresh;(!Te(t)||!Ee(t.pending)||!mn(t.observedAt,64)||!mn(t.attemptedAt,64)||!mn(t.error,512)||!(t.intervalMs===void 0||Wn(t.intervalMs)&&t.intervalMs>0&&t.intervalMs<=36e5))&&Me()}for(let t of n.models)(!Te(t)||!Jn(t.id)||!Ee(t.available)||t.runtimeLoaded!==!1||!mn(t.title)||!mn(t.reason)||!(t.totalBytes==null||Wn(t.totalBytes)&&t.totalBytes>=0))&&Me(),t.recommendation!=null&&(!Te(t.recommendation)||!Ee(t.recommendation.recommended)||!mn(t.recommendation.reason))&&Me();for(let t of n.jobs)Fu(t);if(n.ttsInstallIntent!=null){let t=n.ttsInstallIntent;(!Te(t)||!Jn(t.jobId)||!Jn(t.modelId)||!["waiting","verifying","applied","blocked","paused","cancelled"].includes(t.status)||!mn(t.reason))&&Me()}}return e==="inspect-model-compute"&&!Te(n.compute)&&!Te(n.backends)&&Me(),e==="plan-model-install"&&(n.reused!==void 0&&(!Ee(n.reused)||n.reused!==!0||!Ve(n.sourceDirectory,4096)||!n.sourceDirectory||!["q4_k_m","q8_0"].includes(n.modelVariant)||!Wn(n.reusedBytes)||n.reusedBytes<0)&&Me(),n.reused!==!0&&(n.sourceDirectory!==void 0||n.modelVariant!==void 0||n.reusedBytes!==void 0)&&Me(),Array.isArray(n.files)&&n.files.some(t=>Te(t)&&t.reused!==void 0&&!Ee(t.reused))&&Me(),(!Jn(n.modelId)||!["cpu","auto","cuda","vulkan"].includes(n.compute)||!Ve(n.planHash,128)||!Array.isArray(n.files)||n.files.length>200||!Wn(n.totalBytes)||n.totalBytes<0||!Ve(n.destination,4096)||!Array.isArray(n.licenseUrls)||n.licenseUrls.some(t=>!Zu(t))||!mn(n.source)||!mn(n.notice)||!mn(n.licenseNote)||n.files.some(t=>!Te(t)||!Jn(t.name)||!Wn(t.bytes)||t.bytes<0||!Ve(t.sha256,64)||!/^[a-f0-9]{64}$/i.test(t.sha256)||!Zu(t.url)))&&Me()),["start-model-install","control-model-install"].includes(e)&&Fu(n),Ci(n)}function Fu(e){Te(e)&&e.error!=null&&(!Te(e.error)||!Ve(e.error.message,512))&&Me(),(!Te(e)||!Jn(e.id)||!Jn(e.modelId)||!["cpu","auto","cuda","vulkan"].includes(e.compute)||!["queued","running","paused","failed","cancelled","installed"].includes(e.status)||!Ve(e.stage,128)||!Wn(e.receivedBytes)||e.receivedBytes<0||!(e.totalBytes===null||Wn(e.totalBytes)&&e.totalBytes>=0)||e.runtimeLoaded!==!1)&&Me()}function In(e,n){let t=r=>r!==null&&typeof r=="object"&&!Array.isArray(r),o=r=>typeof r=="string"&&r.length>0&&r.length<=256,i=r=>r===null||t(r)&&Object.keys(r).sort().join(",")==="code,modifiers"&&typeof r.code=="string"&&/^(F([1-9]|1[0-9]|2[0-4])|Key[A-Z]|Digit[0-9]|Space)$/.test(r.code)&&Array.isArray(r.modifiers)&&r.modifiers.length<=3&&new Set(r.modifiers).size===r.modifiers.length&&r.modifiers.every(s=>["Control","Alt","Shift"].includes(s))&&!(r.code==="F4"&&r.modifiers.includes("Alt"));if(!t(n))throw new Error("Fish Voice UI returned invalid data");if(n.wake!==void 0&&!(n.wake===null&&e!=="conversation")&&!Qi(n.wake))throw new Error("Invalid wake state");if(n.listenMode!==void 0&&n.listenMode!==null&&!ft.includes(n.listenMode))throw new Error("Invalid listening mode");if(["status","enable","disable","new","resume","listen-mode"].includes(e)){if(!(n.ownerSessionId===null||o(n.ownerSessionId))||typeof n.enabled!="boolean"||!t(n.helper)||typeof n.helper.online!="boolean")throw new Error("Fish Voice UI returned an invalid status");if(n.existingVoiceSessionSupported!==void 0&&typeof n.existingVoiceSessionSupported!="boolean")throw new Error("Invalid existing session support");if(n.existingVoiceSession!=null&&!so.safeParse(n.existingVoiceSession).success)throw new Error("Invalid existing voice session");if(n.helper.lastError!=null&&(typeof n.helper.lastError!="string"||n.helper.lastError.length>512))throw new Error("Invalid audio diagnostic")}else if(["save-voice-prompt","save-conversation-model","save-bindings","read-settings","save-settings","save-audio-device","save-models","set-visibility","set-performance-mode","save-tts","complete-setup","apply-model-install"].includes(e)){if(n.bindingContext!==void 0&&(!t(n.bindingContext)||["ownerSessionId","epoch","rootSessionId"].some(s=>n.bindingContext[s]!==null&&!o(n.bindingContext[s]))))throw new Error("Invalid binding context");let r=n.values;if(typeof n.revision!="string"||!n.revision||!t(r)||![0,1,2].includes(r.pttMouse)||!t(r.speakerVerification)||typeof r.speakerVerification.enabled!="boolean"||!(Ut(r.device)||typeof r.device=="string"&&r.device.length<=256&&!/[\u0000-\u001f\u007f]/.test(r.device)||Number.isSafeInteger(r.device)&&r.device>=0))throw new Error("Fish Voice UI returned invalid settings");if(r.wakeWordAliases!==void 0&&!ko(r.wakeWordAliases))throw new Error("Invalid wake aliases");if(r.wakeListenTimeoutMs!==void 0&&(!Number.isInteger(r.wakeListenTimeoutMs)||r.wakeListenTimeoutMs<3e3||r.wakeListenTimeoutMs>3e4))throw new Error("Invalid wake timeout");if(r.semanticExperimental!==void 0&&typeof r.semanticExperimental!="boolean")throw new Error("Invalid experimental wake setting");if(r.pttKeyboard!==void 0&&!i(r.pttKeyboard))throw new Error("Invalid keyboard binding");if(n.capabilities?.pttKeyboard!==void 0){let s=n.capabilities.pttKeyboard;if(!t(s)||typeof s.supported!="boolean"||s.scope!=="global"||s.platform!=="win32"||!["available","unsupported"].includes(s.status)||!(s.reason==null||typeof s.reason=="string")||s.supported!==(s.status==="available"))throw new Error("Invalid keyboard capability")}if(n.modelSetup!==void 0&&(!t(n.modelSetup)||!["sensevoice","whisper","whisper-wasm"].includes(n.modelSetup.asr)||!t(n.modelSetup.models)||n.modelSetup.modelCompute!==void 0&&!["cpu","auto","cuda"].includes(n.modelSetup.modelCompute)||["sensevoiceDir","whisper","campplus"].some(s=>typeof n.modelSetup.models[s]!="string")))throw new Error("Fish Voice UI returned invalid model configuration");if(n.capabilities?.turnSignals===!0){let s=r.turnSignals;if(!t(s)||typeof s.enabled!="boolean"||typeof s.headphonesConfirmed!="boolean"||typeof s.experimentalAutomaticBargeIn!="boolean"||typeof s.volume!="number"||!Number.isFinite(s.volume)||s.volume<0||s.volume>1)throw new Error("Fish Voice UI returned invalid turn sound settings")}}else if(e==="list"&&(!Array.isArray(n.items)||n.items.length>50||!(n.nextCursor==null||typeof n.nextCursor=="string"&&n.nextCursor.length<=2048)||n.items.some(r=>!t(r)||!o(r.id)||typeof r.archived!="boolean"||typeof r.available!="boolean"||typeof r.canResume!="boolean"||r.title!==void 0&&typeof r.title!="string"||r.reason!==void 0&&typeof r.reason!="string")))throw new Error("Fish Voice UI returned invalid voice history");if(n.voicePrompt!==void 0){let r=n.voicePrompt;if(!t(r)||typeof r.text!="string"||r.text.length>32768||!["agents","custom"].includes(r.mode)||typeof r.customSupported!="boolean"||!(r.unsupportedReason===null||typeof r.unsupportedReason=="string"&&r.unsupportedReason.length<=512)||r.mode==="custom"&&(!r.text.trim()||!r.customSupported)||r.mode==="agents"&&r.customSupported&&r.text.trim())throw new Error("Invalid voice prompt preference")}if(n.conversationModel!==void 0&&(!t(n.conversationModel)||!["auto","manual"].includes(n.conversationModel.mode)||![n.conversationModel.provider,n.conversationModel.model].every(r=>r===null||o(r))||n.conversationModel.mode==="auto"&&(n.conversationModel.provider!==null||n.conversationModel.model!==null)))throw new Error("Invalid conversation model preference");if(e==="conversation-models"&&(!Array.isArray(n.providers)||n.providers.length>256||new Set(n.providers.map(r=>r?.id)).size!==n.providers.length||n.providers.some(r=>!t(r)||!o(r.id)||!o(r.name)||!Array.isArray(r.models)||r.models.length>2048||new Set(r.models.map(s=>s?.id)).size!==r.models.length||r.models.some(s=>!t(s)||!o(s.id)||!o(s.name)))))throw new Error("Invalid conversation model catalog");if(e==="read-audio-devices"&&!Xi(n))throw new Error("Invalid audio device inventory");if(n.audioDevices!==void 0&&(!t(n.audioDevices)||!Ut(n.audioDevices.output)||!(Ut(n.audioDevices.input)||typeof n.audioDevices.input=="string"||Number.isSafeInteger(n.audioDevices.input))))throw new Error("Invalid audio device preferences");if(e==="inspect-performance"&&(!Array.isArray(n.modes)||n.modes.some(r=>!t(r)||!["fast","balanced","high"].includes(r.performanceMode)||typeof r.available!="boolean")))throw new Error("Invalid performance capabilities");if(e==="read-history"&&(!(n.rootSessionId===null||o(n.rootSessionId))||!Number.isSafeInteger(n.generation)||n.generation<0||!Number.isSafeInteger(n.revision)||n.revision<0||!["voice-session","current-voice-session"].includes(n.scope)||typeof n.truncated!="boolean"||!(n.nextCursor===null||typeof n.nextCursor=="string"&&/^\d+:\d+$/.test(n.nextCursor))||!Array.isArray(n.items)||n.items.length>100||new Set(n.items.map(r=>r?.id)).size!==n.items.length||n.items.some(r=>!t(r)||!o(r.id)||!["user","assistant"].includes(r.role)||typeof r.text!="string"||r.text.length>8e3||!["reply","interrupted","delivered","speech-requested","speech-failed"].includes(r.state)||!Number.isFinite(r.at))))throw new Error("Invalid conversation history");if(e==="conversation"){if(n.helper!==void 0&&(!t(n.helper)||typeof n.helper.online!="boolean"||!(n.helper.listenMode===null||ft.includes(n.helper.listenMode))||!n.helper.online&&n.helper.listenMode!==null))throw new Error("Invalid conversation helper state");if(n.inputError!=null&&!["device","recognition","no-speech"].includes(n.inputError))throw new Error("Invalid input error");if(n.providerError!==void 0&&(typeof n.providerError!="string"||n.providerError.length>480))throw new Error("Invalid provider error");if(!Number.isSafeInteger(n.revision)||n.revision<0||n.title!==null||!(n.rootSessionId===null||o(n.rootSessionId))||!Array.isArray(n.items)||n.items.length>40||typeof n.inputActive!="boolean"||n.playbackConfirmed!==!1||n.items.some(r=>!t(r)||!o(r.id)||!["user","assistant"].includes(r.role)||typeof r.text!="string"||r.text.length>8e3||!["reply","interrupted","delivered","speech-requested","speech-failed"].includes(r.state)||!Number.isFinite(r.at))||n.latest!==null&&(!t(n.latest)||!n.items.some(r=>r.id===n.latest.id&&r.text===n.latest.text&&r.role==="assistant")))throw new Error("Invalid conversation snapshot")}if(e==="output-volume"&&(typeof n.supported!="boolean"||n.supported&&(typeof n.volume!="number"||!Number.isFinite(n.volume)||n.volume<0||n.volume>1||n.revision==null)))throw new Error("Invalid output volume snapshot");if(["agent-permissions","save-agent-permissions"].includes(e)){let r=["set-performance-mode","set-visibility","set-output-volume"];if(n.schema!==1||!o(n.revision)||!Array.isArray(n.items)||n.items.length!==3||new Set(n.items.map(s=>s?.operation)).size!==3||n.items.some(s=>!t(s)||!r.includes(s.operation)||typeof s.allowed!="boolean"||typeof s.title!="string"||s.title.length>128||!(s.reason===null||typeof s.reason=="string"&&s.reason.length<=1024)))throw new Error("Invalid agent permissions")}if(["agent-requests","decide-agent-request"].includes(e)){let r=s=>t(s)&&o(s.id)&&o(s.sourceSessionId)&&o(s.operation)&&typeof s.title=="string"&&s.title.length<=128&&["pending","executing","completed","blocked","unknown","superseded","expired","cancelled","rejected"].includes(s.state)&&Number.isFinite(s.createdAt)&&Number.isFinite(s.expiresAt)&&Number.isSafeInteger(s.humanRevision)&&t(s.request)&&t(s.before)&&Array.isArray(s.acknowledgements)&&s.acknowledgements.length<=10&&s.acknowledgements.every(c=>t(c)&&o(c.id)&&typeof c.text=="string"&&c.text.length<=1024)&&(s.error===null||t(s.error)&&typeof s.error.code=="string"&&typeof s.error.message=="string"&&s.error.message.length<=1024)&&(s.nextAction===null||typeof s.nextAction=="string"&&s.nextAction.length<=1024);if(n.schema!==1||!Number.isSafeInteger(n.humanRevision)||n.humanRevision<0||!Array.isArray(n.items)||n.items.length>100||n.items.some(s=>!r(s))||e==="decide-agent-request"&&(!r(n.lastOutcome)||!n.items.some(s=>s.id===n.lastOutcome.id&&s.state===n.lastOutcome.state)))throw new Error("Invalid agent request snapshot")}if(e==="authorization"){if(n.usageAgreement!==void 0&&(!t(n.usageAgreement)||n.usageAgreement.version!==1||typeof n.usageAgreement.accepted!="boolean"||!Array.isArray(n.usageAgreement.text)||n.usageAgreement.text.length>16||n.usageAgreement.text.some(r=>typeof r!="string"||r.length>4096)))throw new Error("Invalid usage agreement snapshot");if(n.schema!==1||!o(n.revision)||!Array.isArray(n.blockedOperations)||n.blockedOperations.some(r=>typeof r!="string")||typeof n.revocationUnconfirmed!="boolean"||typeof n.completed!="boolean"||typeof n.granted!="boolean"||!Array.isArray(n.scopes)||n.scopes.length>16||new Set(n.scopes.map(r=>r?.id)).size!==n.scopes.length||n.scopes.some(r=>!t(r)||!o(r.id)||typeof r.title!="string"||typeof r.description!="string"||typeof r.allowed!="boolean")||!Array.isArray(n.modelSources)||n.modelSources.length>32||n.modelSources.some(r=>!t(r)||!o(r.modelId)||typeof r.source!="string"||!Array.isArray(r.licenseUrls)||r.licenseUrls.some(s=>typeof s!="string")||typeof r.licenseNote!="string")||!Array.isArray(n.restrictions)||n.restrictions.some(r=>typeof r!="string"))throw new Error("Invalid authorization snapshot")}if(n.inferenceCompute!=null){let r=n.inferenceCompute;if(!t(r)||!["cpu","auto","cuda"].includes(r.requested)||![null,"cpu","cuda"].includes(r.actual)||!["sensevoice","whisper","whisper-wasm"].includes(r.engine)||!(r.computeType===null||["int8","float16","int8_float16","int8_float32","float32"].includes(r.computeType))||!(r.deviceIndex===null||Number.isSafeInteger(r.deviceIndex)&&r.deviceIndex>=0&&r.deviceIndex<8)||![null,"gpu-unavailable","gpu-load-failed","gpu-inference-failed","model-gpu-unverified"].includes(r.fallbackReason)||typeof r.validated!="boolean")throw new Error("Invalid inference compute status")}if(n.inputDevices!==void 0&&!ns(n.inputDevices))throw new Error("Invalid input device inventory");if(n.ptt?.keyboard!==void 0&&n.ptt.keyboard!==null){let r=n.ptt.keyboard;if(!t(r)||typeof r.supported!="boolean"||r.scope!=="global"||!["unsupported","active","inactive","unknown"].includes(r.status)||typeof r.hookInstalled!="boolean"||typeof r.recording!="boolean"||!(r.observedAt==null||Number.isFinite(r.observedAt)))throw new Error("Invalid keyboard status")}if(n.voiceSession?.recovery!==void 0){let r=n.voiceSession.recovery;if(!t(r)||r.stopVerified!==void 0&&typeof r.stopVerified!="boolean"||r.stopVerified===!0&&(r.kind!=="none"||n.voiceSession.fullyStopped!==!0)||!["none","live-root-conflict","predecessor-cleanup-pending","predecessor-stop-unconfirmed","helper-cleanup-pending","helper-stop-unconfirmed"].includes(r.kind)||!(r.rootSessionId===null||o(r.rootSessionId))||r.kind!=="none"&&n.voiceSession.fullyStopped===!0)throw new Error("Invalid voice recovery state")}if(n.voiceSession?.visibility!==void 0&&!["hidden","workspace"].includes(n.voiceSession.visibility))throw new Error("Fish Voice UI returned invalid visibility");if(n.voiceCapabilities!==void 0){let r=n.voiceCapabilities;if(!t(r)||!(r.configuredVisibility===null||["hidden","workspace"].includes(r.configuredVisibility))||["hidden","workspace"].some(s=>!t(r[s])||typeof r[s].supported!="boolean")||!t(r.taskHandoff)||typeof r.taskHandoff.mode!="string")throw new Error("Fish Voice UI returned invalid host capabilities")}return Ci(n),["setup-status","inspect-tts","preview-tts","cancel-tts","model-installer","inspect-model-compute","plan-model-install","start-model-install","control-model-install"].includes(e)&&Uu(e,n),n}function Hu(e,n=10){let t=0;for(let o=e.length-1;o>=0;o--)if(e[o].role==="user"&&++t===n)return e.slice(o);return e}function Vu(e=[],n=[]){let t=new Map(e.map(o=>[o.id,o]));for(let o of n)t.set(o.id,o);return[...t.values()].sort((o,i)=>o.at-i.at)}function ju(e,n=36){return e.scrollHeight-e.scrollTop-e.clientHeight<=n}function Ku({enabled:e,active:n,unknown:t,pending:o}){return t?"unknown":o?"pending":e?n?"listening":"standby":"off"}function ao(e){return e?.enabled?e.existingVoiceSession?.sessionId??e.voiceSession?.id??null:null}var Wu=["save-voice-prompt","save-conversation-model","save-bindings","read-settings","save-settings","save-audio-device","save-models","set-visibility","set-performance-mode","save-tts","complete-setup","apply-model-install"],lo=Wu.filter(e=>e!=="read-settings"),co=["status","enable","disable","new","resume","listen-mode"],xh=new Set(["status","enable","disable","listen-mode","read-history"]),kh=["save-bindings","inspect-tts","inspect-model-compute"],Dn=new Set(["conversation-models","status","read-settings","read-output-volume","model-installer","agent-permissions","agent-requests"]),Bt=["conversation-models","agent-permissions","agent-requests","status","read-settings","list","read-output-volume","inspect-performance","inspect-tts","model-installer","inspect-model-compute","plan-model-install"];function Ju(e,{schedule:n=(i,r)=>globalThis.setTimeout(i,r),unschedule:t=i=>globalThis.clearTimeout(i),observe:o=()=>{}}={}){let i=0,r={conversationHistory:null,conversationHistoryFor:null,conversationHistoryError:null,conversationHistoryLoading:!1,conversationHistoryRequestCursor:null},s={...r,conversationModels:null,conversationModelsFor:null,conversationModelsError:null,authorization:null,authorizationOpen:!1,authorizationLoading:!1,authorizationBusy:!1,authorizationUncertain:!1,authorizationError:null,agentRequests:null,agentRequestsFor:null,busy:!1,interruptibleRead:null,diagnosticStopPending:!1,error:null,status:null,settings:null,settingsFor:null,visibilityUncertain:!1,visibilityReadbackFor:null,catalog:null,checkedFor:null,catalogFor:null,uncertain:!1,performance:null,performanceFor:null,performancePending:!1,performanceError:null,conversation:null,conversationFor:null,conversationError:null,outputVolume:null,outputVolumeFor:null,outputVolumeUncertain:!1,setupStatus:null,setupOpen:!1,panelView:"home",setupError:null,ttsCapabilities:null,ttsCapabilitiesFor:null,ttsPreview:null,ttsPreviewFor:null,ttsCancelling:!1,ttsUncertain:!1,installer:null,installerFor:null,installerError:null,installerUncertain:!1,installPlan:null,installPlanFor:null},c=new Set,l=null,u=!0,d=!0,p=0,h=null,m=null,v=0,g=new Map,b=()=>{for(let _ of g.values())_.stale=!0,_.abort.abort();g.clear()},k=()=>{b(),h&&(h.stale=!0,Dn.has(h.action)&&h.abort.abort())},N=!1,D=null,P=!1,L=null,I=0,q=0,z=new Map,w=!0,S=null,B=null,E=null,M,F=null,A=0,V=0,U=!1,H=null,X=null,ge=new Set,ae=new Set,ee=new Set,G=new Set,C=_=>{if(!w)return;let x=Object.hasOwn(_,"uncertain")?_.readOnlyFailure===!0:s.readOnlyFailure;s={...s,..._,readOnlyFailure:x};for(let T of ge)T()},ve,Ie,De=0,je=_=>["checking","installing"].includes(_?.status),Nn=(_,x)=>{x?.revision!==void 0&&_.revision<x.revision||(x&&_.revision!==void 0&&(x.revision=_.revision),C({updates:_,updatesUnavailable:!1}))},cn=()=>{if(!w||!S?.subscribeUpdates||ve||!u)return;let _=S,x={};ve=x,x.stop=_.subscribeUpdates(T=>{!w||ve!==x||(De++,Sn("update-stream"),Nn(T,x))},()=>{!w||ve!==x||(ve=null,C({updatesUnavailable:!0}),Fe(B,"update-stream"))})},at=()=>{let _=ve;ve=null,_?.stop?.(),Ie?.abort(),Ie=null,C({updates:null,updatePending:null,updatesUnavailable:!1})},lt=async _=>{if(!w||!S?.updateAction||Ie)return;let{action:x,version:T}=_;if(x==="install"&&(s.updatesUnavailable||s.updates?.canInstall!==!0||s.updates?.release?.version!==T))return;let R=S,K=new AbortController;Ie=K,cn();let Q=ve,ye=De;C({updatePending:x});try{let fe=await R.updateAction(_,K.signal);w&&Ie===K&&ve===Q&&(fe.revision===void 0&&je(fe)&&De!==ye&&!je(s.updates)||Nn(fe,Q))}catch{let fe=De!==ye&&!je(s.updates);w&&Ie===K&&ve===Q&&!fe&&C({updatesUnavailable:!0})}finally{Ie===K&&(Ie=null,C({updatePending:null}))}},me=0,ie=_=>{me++,C({..._,ttsUncertain:!0})},un=()=>s.status?.existingVoiceSession?null:B,nn=null,hr=()=>{nn=null,C({transcriptRetry:null})},Fi=_=>{if(!nn?.receipt||_?.rootSessionId!==nn.sessionId)return;let x=_.retryTranscripts?.items.find(T=>T.id===nn.id);(!x||x.state!=="ready"||nn.receipt==="unconfirmed"&&_.revision>nn.revision)&&hr()},Jd=async(_,x)=>{let{status:T,conversation:R,checkedFor:K,conversationFor:Q,uncertain:ye,busy:fe}=s,Pe=T?.existingVoiceSession?.sessionId;if(!w||!S?.retryVoiceTranscript||nn||ye||fe||B!==_||K!==_||Q!==_||!T?.enabled||!Pe||R?.rootSessionId!==Pe||R.retryTranscripts?.sessionId!==Pe||!R.retryTranscripts.items.some(qn=>qn.id===x&&qn.state==="ready"))return;let tn=S,Bn=new AbortController,hn=nn={id:x,sessionId:Pe,revision:R.revision,receipt:null};ae.add(Bn),C({transcriptRetry:{id:x,state:"sending"}});try{let qn=await tn.retryVoiceTranscript({id:x},Bn.signal);if(!w||nn!==hn)return;qn.accepted===!1?hr():hn.receipt="accepted"}catch{if(!w||nn!==hn)return;hn.receipt="unconfirmed"}finally{ae.delete(Bn),nn===hn&&(hn.receipt==="unconfirmed"&&C({transcriptRetry:{id:x,state:"uncertain"}}),Fi(s.conversation))}},kn=async(_,x,T)=>{let R=e??S?.action;if(!R)throw new Error("\u9C7C\u5E94\u754C\u9762\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let K=s.status?.existingVoiceSession&&xh.has(x.action)||s.existingSessionUnconfirmed&&x.action==="status"?null:_,Q=await R(K,x,T);try{return In(x.action,Q)}catch(ye){throw o("ui-render-error","finished","failed"),ye}},On=null,go=({clear:_=!1}={})=>{let x=On;On=null,x?.abort.abort(),C({audioDevicesPending:!1,audioDevicesError:null,..._?{audioDevices:null,audioDevicesFor:null}:{}})},Gd=_=>{if(!w||B!==_)return Promise.resolve(!1);if(On?.id===_&&On.client===S)return On.promise;go();let x={id:_,client:S,scope:q,abort:new AbortController,promise:null};On=x,ae.add(x.abort),C({audioDevicesPending:!0,audioDevicesError:null});let T=()=>w&&On===x&&B===_&&S===x.client&&q===x.scope;return x.promise=(async()=>{let R;try{let K=new Promise((ye,fe)=>{R=()=>fe(new Error("Device read cancelled")),x.abort.signal.addEventListener("abort",R,{once:!0})}),Q=await Promise.race([kn(_,{action:"read-audio-devices"},x.abort.signal),K]);return T()?(C({audioDevices:Q,audioDevicesFor:_}),!0):!1}catch(K){return T()&&!x.abort.signal.aborted&&C({audioDevicesError:String(K?.message??K)}),!1}finally{x.abort.signal.removeEventListener("abort",R),ae.delete(x.abort),T()&&(On=null,C({audioDevicesPending:!1}))}})(),x.promise},Rn=null,Xd=_=>{if(!w||B!==_)return Promise.resolve(!1);if(Rn?.id===_&&Rn.scope===q)return Rn.promise;let x={id:_,scope:q,client:S,promise:null};Rn=x;let T=()=>w&&Rn===x&&B===_&&q===x.scope&&S===x.client;return C({modelComputePending:!0,modelComputeError:null}),x.promise=(async()=>{try{if(await kn(_,{action:"inspect-model-compute"}),!T())return!1;let R=await kn(_,{action:"model-installer"});return T()?(C({installer:R,installerFor:_,installerError:null}),U||(U=!0,ct(!0)),!0):!1}catch(R){if(!T())return!1;let K=R?.uncertain||/TTS_TERMINATION_UNCONFIRMED/.test(String(R?.code??"")+" "+String(R?.message??""));return C({modelComputeError:String(R?.message??R),...K?{installerUncertain:!0,installerTerminationUnconfirmed:!0}:{}}),!1}finally{T()&&(Rn=null,C({modelComputePending:!1}))}})(),x.promise},Zn=null,gr=0,It=({clear:_=!1}={})=>{gr++;let x=Zn;Zn=null,x?.abort.abort(),C({performancePending:!1,performanceError:null,..._?{performance:null,performanceFor:null}:{}})},Yd=_=>{if(!w||B!==_)return Promise.resolve(!1);if(Zn?.id===_&&Zn.client===S)return Zn.promise;It();let x={id:_,client:S,epoch:gr,abort:new AbortController,promise:null};Zn=x,ae.add(x.abort),C({performancePending:!0,performanceError:null});let T=()=>w&&Zn===x&&x.epoch===gr&&B===_&&S===x.client;return x.promise=(async()=>{let R;try{let K=new Promise((ye,fe)=>{R=()=>fe(new Error("Probe cancelled")),x.abort.signal.addEventListener("abort",R,{once:!0})}),Q=await Promise.race([kn(_,{action:"inspect-performance"},x.abort.signal),K]);return T()?(C({performance:Q,performanceFor:_}),!0):!1}catch(K){return T()&&!x.abort.signal.aborted&&C({performanceError:String(K?.message??K)}),!1}finally{x.abort.signal.removeEventListener("abort",R),ae.delete(x.abort),T()&&(Zn=null,C({performancePending:!1}))}})(),x.promise},Dt=()=>{let _=z.get("conversation-stream");_&&(_.timer!==null&&t(_.timer),_.timer=null,_.ready=!1);let x=++A;if(E?.(),E=null,i++,C({...r,conversation:null,conversationFor:null,conversationError:null,listenModeReceiptRevision:null}),M=void 0,!w||!S)return;let T=B;M=un(),E=S.subscribe(M,(R,K)=>{if(!(!w||x!==A||B!==T))try{let Q=In("conversation",R);K?.initial||Sn("conversation-stream"),s.conversationHistory&&(s.conversationHistory.rootSessionId!==Q.rootSessionId||s.conversationHistory.scope!=="voice-session"&&s.conversationHistory.generation!==Q.historyGeneration)&&(i++,C({...r}));let ye=s.conversationHistory,fe={};if(ye?.rootSessionId&&ye.rootSessionId===Q.rootSessionId){let Pe=new Map(ye.items.map(j=>[j.id,j]));for(let j of Q.items)Pe.set(j.id,j);let tn=[...Pe.values()].sort((j,Be)=>j.at-Be.at),Bn=tn.slice(-4e3),hn=Bn.reduce((j,Be)=>j+Be.text.length,0),qn=tn.length>4e3;for(;hn>4*1024*1024;)hn-=Bn.shift().text.length,qn=!0;fe={conversationHistory:{...ye,items:Bn,truncated:ye.truncated||qn}}}C({...fe,conversation:Q,conversationFor:T,conversationError:null}),Fi(Q)}catch(Q){i++,C({...r,conversation:null,conversationFor:null,conversationError:String(Q.message)}),Fe(T,"conversation-stream")}},R=>{w&&x===A&&(i++,C({...r,conversation:null,conversationFor:null,conversationError:String(R?.message??R)}),Fe(T,"conversation-stream"))})},ct=(_=!1)=>{let x=z.get("model-stream");x&&(x.timer!==null&&t(x.timer),x.timer=null,x.ready=!1);let T=++V;if(F?.(),F=null,_||C({installer:null,installerFor:null,installerError:null}),!w||!S?.subscribeModels||!U)return;let R=B;F=S.subscribeModels(R,(K,Q)=>{if(!(!w||T!==V||B!==R||Q?.initial))try{let ye=In("model-installer",K),fe=s.installer?.ttsInstallIntent;if(Sn("model-stream"),C({installer:ye,installerFor:R,installerError:null}),ye.ttsInstallIntent&&(fe?.jobId!==ye.ttsInstallIntent.jobId||fe?.status!==ye.ttsInstallIntent.status)){let Pe=ye.ttsInstallIntent.status==="applied";C({checkedFor:null}),Ue({settings:Pe,force:!0})}}catch(ye){C({installer:null,installerFor:null,installerError:String(ye.message)}),Fe(R,"model-stream")}},K=>{w&&T===V&&(C({installer:null,installerFor:null,installerError:String(K?.message??K)}),Fe(R,"model-stream"))})},Fn=()=>{if(X)return X;if(!H)return Promise.resolve(!0);let _=H,x=me;return _.cancelled=!0,_.abort.abort(),C({ttsCancelling:!0,ttsPreview:{status:"cancelling"}}),X=(async()=>{let T=!1;try{let R=await kn(_.id,{action:"cancel-tts"});return R.status==="unconfirmed"?(D=null,ie({ttsPreview:R,uncertain:!0,error:"\u65E0\u6CD5\u786E\u8BA4\u6717\u8BFB\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B\u540E\u518D\u8BD5\u3002"}),!1):(T=!0,C({ttsPreview:R,...x===me?{ttsUncertain:!1}:{}}),!0)}catch(R){return D=null,ie({ttsPreview:{status:"unconfirmed"},uncertain:!0,error:String(R?.message??R)}),!1}finally{T&&H===_&&(H=null),C({ttsCancelling:!1}),X=null,queueMicrotask(()=>{yo(),mt()})}})(),X},Sn=_=>{let x=z.get(_);x?.timer!=null&&t(x.timer),z.delete(_)},vr=()=>{for(let _ of z.keys())Sn(_)},Fe=(_,x)=>{if(!w||!N||B!==_||!["authorization","setup-status","conversation-stream","model-stream","update-stream"].includes(x)&&!Dn.has(x))return;let T=z.get(x);T||(T={id:_,scope:q,attempts:0,timer:null,ready:!1},z.set(x,T)),!(T.timer!==null||T.ready||!u||!d)&&(T.attempts++,o("ui-read-recovery","requested"),T.timer=n(()=>{T.timer=null,!(!w||B!==_||T.scope!==q||z.get(x)!==T)&&(T.ready=!0,mt())},Math.min(3e4,750*2**Math.min(T.attempts-1,6))),T.timer?.unref?.())},Un=null,vo=0,ut=()=>{Un!==null&&t(Un),Un=null,vo=0},Ui=_=>{!w||!u||!d||B!==_||Un!==null||vo>=10||(Un=n(()=>{if(Un=null,!(!w||B!==_||!["predecessor-cleanup-pending","helper-cleanup-pending"].includes(s.status?.voiceSession?.recovery?.kind))){if(s.busy||s.ttsCancelling){Ui(_);return}vo++,Ke.run(_,"status")}},1e3),Un?.unref?.())},Ke,Xn=0,bo=null,$t=null,dt=null,Tt=!1,pt=null,Yn=null,br=!1,Qn=async(_={operation:"status"})=>{if(!w||!S?.repairAction)return!1;if(pt)return _.operation==="status"&&(br=!0),!1;Yn!==null&&(t(Yn),Yn=null);let x=S,T=new AbortController;pt=T,ae.add(T),_.operation!=="status"&&C({repairBusy:!0,repairError:!1});try{let R=await x.repairAction(_,T.signal);if(!w||S!==x)return!1;if(!R||typeof R.state!="string"||R.maxRounds!==3||!Array.isArray(R.events)||R.events.length>24)throw new Error("\u914D\u7F6E\u52A9\u624B\u54CD\u5E94\u65E0\u6548");let K=["starting","running","stopping"].includes(R.state),Q=_.operation==="start"?{panelView:"settings",settingsTab:"repair",setupOpen:!1,authorizationOpen:!1}:{},ye=R.state==="completed"&&s.repair?.state!=="completed";return C({repair:R,repairError:!1,...Q}),K&&u&&d&&(Yn=n(()=>{Yn=null,Qn()},750)),ye&&Ue({settings:!0,force:!0}),!0}catch{return w&&S===x&&!T.signal.aborted&&C({repairError:!0}),!1}finally{pt===T&&(pt=null),ae.delete(T),w&&_.operation!=="status"&&C({repairBusy:!1}),br&&w&&S===x&&(br=!1,queueMicrotask(()=>{Qn()}))}},Qd=async _=>{let x=S,T=[],R=new Set;if(!w||!x?.readOperationLog)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u672A\u5C31\u7EEA");let K=null;do{_?.throwIfAborted();let Q=await x.readOperationLog(K?{cursor:K}:{},_);if(!w||S!==x||_?.aborted)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u8FDE\u63A5\u5DF2\u53D8\u5316");if(typeof Q?.text!="string"||!(Q.nextCursor===null||typeof Q.nextCursor=="string"&&Q.nextCursor)||R.has(Q.nextCursor))throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u5206\u9875\u65E0\u6548");T.push(Q.text),K=Q.nextCursor,R.add(K)}while(K);return T},ep=async(_,x)=>{if(!w||!S?.manageSessions)throw new Error("\u9C7C\u5E94\u4F1A\u8BDD\u7BA1\u7406\u5C1A\u672A\u5C31\u7EEA");let T=S,R=await T.manageSessions(null,_,x);if(!w||S!==T||x?.aborted)throw new Error("\u4F1A\u8BDD\u7BA1\u7406\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5");return R},np=async(_,x)=>{if(!w||!S?.listExistingVoiceSessions)throw new Error("DSH \u4F1A\u8BDD\u5217\u8868\u6682\u4E0D\u53EF\u7528");let T=S,R=await T.listExistingVoiceSessions(_,x);if(!w||S!==T||x?.aborted)throw new Error("\u4F1A\u8BDD\u5217\u8868\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5");return R},et=null,tp=async _=>{if(!w||!S?.setExistingVoiceSession||et||s.existingSessionUnconfirmed)throw new Error("DSH \u4F1A\u8BDD\u7ED1\u5B9A\u6682\u4E0D\u53EF\u7528");let x=S,T=new AbortController;et=T,ae.add(T);for(let R of[g.get("status"),h])R?.action==="status"&&(R.stale=!0,R.abort.abort());C({existingSessionWritePending:!0});try{let R=await x.setExistingVoiceSession(_,T.signal);if(!w||S!==x||T.signal.aborted)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u786E\u8BA4");return s.status&&C({status:{...s.status,existingVoiceSession:R.binding}}),M!==un()&&Dt(),R}catch(R){throw C({existingSessionUnconfirmed:!0}),R}finally{ae.delete(T),et=null,C({existingSessionWritePending:!1}),Ue({force:!0})}},op=async(_,x)=>{if(!w||!S?.whisperAsrAction)throw new Error("\u8BC6\u522B\u6A21\u578B\u7BA1\u7406\u6682\u4E0D\u53EF\u7528");let T=S,R=await T.whisperAsrAction(_,x);if(!w||S!==T||x?.aborted)throw new Error("\u8BC6\u522B\u6A21\u578B\u72B6\u6001\u5DF2\u5207\u6362");let K=Q=>Q&&["idle","downloading","ready","error"].includes(Q.state)&&Number.isSafeInteger(Q.receivedBytes)&&Number.isSafeInteger(Q.totalBytes)&&Q.receivedBytes>=0&&Q.receivedBytes<=Q.totalBytes;if(!K(R)||typeof R.selected!="boolean"||R.acceleration!==void 0&&!K(R.acceleration)||R.message!==null&&(typeof R.message!="string"||R.message.length>512))throw new Error("\u8BC6\u522B\u6A21\u578B\u72B6\u6001\u65E0\u6548");return R},nt=async({open:_=!1,initial:x=!1}={})=>{if(!S?.readAuthorization)return!1;if($t)return dt={open:_||dt?.open,initial:x||dt?.initial},_&&C({authorizationOpen:!0}),!1;let T=++Xn,R=new AbortController;ae.add(R),bo=R,C({authorizationLoading:!0,authorizationError:null,..._?{authorizationOpen:!0}:{}});try{let K=In("authorization",await S.readAuthorization(R.signal));return!w||T!==Xn?!1:(Sn("authorization"),C({authorization:K,authorizationUncertain:K.revocationUnconfirmed,...x&&!Tt&&(!K.completed||K.usageAgreement?.accepted!==!0||K.revocationUnconfirmed)?{authorizationOpen:!0}:{}}),!0)}catch(K){return w&&T===Xn&&(C({authorizationError:String(K?.message??K),authorizationUncertain:!0,...x?{authorizationOpen:!0}:{}}),Fe(B,"authorization")),!1}finally{ae.delete(R),bo===R&&(bo=null,w&&C({authorizationLoading:!1}))}},rp=async _=>{if(!S?.saveAuthorization||!s.authorization||s.authorizationBusy||s.authorizationUncertain)return!1;let x=new AbortController,T=++Xn,R=S;ae.add(x),$t=x,C({authorizationBusy:!0,authorizationError:null});try{let K=In("authorization",await R.saveAuthorization({revision:s.authorization.revision,grant:_},x.signal));return!w||T!==Xn||S!==R?!1:(Tt=!1,C({authorization:K,authorizationOpen:K.revocationUnconfirmed,authorizationUncertain:K.revocationUnconfirmed,...K.revocationUnconfirmed?{authorizationError:"\u6743\u9650\u5DF2\u64A4\u56DE\uFF0C\u4F46\u5F53\u524D\u97F3\u9891\u505C\u6B62\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u6838\u67E5\u72B6\u6001\u3002"}:{}}),_&&!K.revocationUnconfirmed&&Ke.openSetup(),Ue({settings:!0,force:!0}),!0)}catch(K){try{let Q=In("authorization",await R.readAuthorization(x.signal));if(w&&S===R&&T===Xn&&Q.completed&&Q.granted===_&&!Q.revocationUnconfirmed)return Tt=!1,C({authorization:Q,authorizationOpen:!1,authorizationUncertain:!1}),_&&Ke.openSetup(),!0}catch{}return w&&S===R&&T===Xn&&(C({authorizationUncertain:!0,authorizationError:String(K?.message??K)}),Fe(B,"authorization")),!1}finally{if(ae.delete(x),$t===x&&($t=null,w&&C({authorizationBusy:!1}),w&&(dt||S!==R))){let K=dt??{initial:!0};dt=null,nt(K)}}},tt=null,yr=0,_r=()=>{if(!S?.readSetup||tt)return tt?.promise;let _=S,x=yr,T=new AbortController,R={promise:null};return tt=R,ae.add(T),R.promise=(async()=>{try{let K=In("setup-status",await _.readSetup(T.signal));return!w||S!==_?!1:(Sn("setup-status"),C({setupStatus:K,...p===x&&!Tt?{setupOpen:!K.completed}:{},setupError:null}),K.completed?Ue({settings:!0}):yo(),!0)}catch(K){return w&&S===_&&(C({setupError:String(K?.message??K)}),Fe(B,"setup-status"),Qn()),!1}finally{ae.delete(T),tt===R&&(tt=null)}})(),R.promise},mt=async()=>{if(!(e||S?.action||S?.readAuthorization||S?.readSetup||S?.subscribeUpdates)||!w||!N||!u||!d||P||et||s.busy||s.ttsCancelling||!D&&![...z.values()].some(R=>R.ready))return;if(!D){let[R,K]=[...z].find(([,Q])=>Q.ready);if(K.ready=!1,K.id!==B||K.scope!==q){Sn(R);return}P=!0;try{R==="authorization"?await nt():R==="setup-status"?await _r():R==="conversation-stream"?Dt():R==="model-stream"?ct(!0):R==="update-stream"?cn():await Ke.run(K.id,R)}finally{P=!1,queueMicrotask(()=>{mt()})}return}let _=D;D=null;let x=()=>w&&_.id===B&&_.scope===q;if(!x())return;let T=()=>x()?!u||!d||et||s.busy||s.ttsCancelling?(D||(D=_),!0):!1:!0;P=!0;try{if(_.notified||(_.notified=!0,L=_.id,I=Date.now(),C({readRefresh:(s.readRefresh??0)+1})),T()||(_.settings&&(_.settings=!1,await Ke.run(_.id,"read-settings",{},!0)),T()))return;_.status&&(_.status=!1,await Ke.run(_.id,"status",{},!0)),x()&&_.id&&!G.has(_.id)&&(G.add(_.id),Ke.run(_.id,"inspect-performance"))}finally{P=!1,queueMicrotask(()=>{mt()})}},Ue=({settings:_=!1,force:x=!1}={})=>{if(cn(),!(!w||!N)&&(u&&d&&(x||s.repair?.state==="offered")&&Qn(),!(!x&&!_&&L===B&&Date.now()-I<1500)&&(s.authorizationUncertain&&!bo&&!$t&&nt(),s.setupError&&!tt&&_r(),!(!B&&!s.setupOpen&&s.setupStatus===null)))){s.installerError&&U&&ct(!0);for(let T of z.values())T.id===B&&(T.timer!==null&&t(T.timer),T.timer=null,T.attempts=0,T.ready=!0);Un===null&&(vo=0),(!D||D.scope!==q)&&o("ui-status-refresh","requested"),D={id:B,scope:q,settings:!0,status:!0,notified:!1},queueMicrotask(()=>{mt()})}},Hi=()=>{let _=u&&d;if(s.readVisible!==_){if(C({readVisible:_}),!_){b();for(let x of z.values())x.timer!==null&&t(x.timer),x.timer=null,x.ready=!1;ut();return}Ue({force:!0})}},yo=async()=>{let _=B;!(e||S?.action)||s.setupStatus?.completed!==!1||ee.has(_)||s.busy||s.ttsCancelling||(ee.add(_),await Ke.run(_,"read-settings")&&B===_&&await Ke.run(_,"status"))};return Ke={getSnapshot:()=>s,async pickPath(_,x,T){if(!w||B!==_)return null;let R=q,K=e??S?.action;if(!K)throw new Error("\u9C7C\u5E94\u754C\u9762\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let Q=await K(_,{action:"pick-local-path",kind:x},T);if(!w||B!==_||R!==q||T?.aborted)return null;if(!Q||!(Q.path===null||typeof Q.path=="string"&&Q.path.length>0&&Q.path.length<=4096&&!/[\u0000-\u001f\u007f]/.test(Q.path)))throw new Error("\u8DEF\u5F84\u9009\u62E9\u7ED3\u679C\u65E0\u6548");return Q.path},async captureBindings(_,x){let T=await kn(_,{action:"capture-bindings",...x});if(!T||typeof T.token!="string"||typeof T.paused!="boolean")throw new Error("\u6309\u952E\u5F55\u5165\u56DE\u6267\u65E0\u6548");return T},setReadVisibility(_){u=!!_,Hi()},setPanelVisible(_){d=!!_,Hi()},markSettingsEdited(_="save-settings"){lo.includes(_)&&(c.add(_),C({settingsDraftActions:[...c]}))},discardSettingsDraft(_){_?c.delete(_):c.clear(),C({settingsDraftActions:[...c]}),!c.size&&(l&&C({settings:l,settingsFor:B}),l=null,C({settingsConflict:!1,settingsKey:s.settings?.revision}))},enableAutomaticReads(){N=!0,Ue({settings:!0,force:!0})},refresh:Ue,refreshModelCompute:Xd,subscribe(_){return ge.add(_),()=>ge.delete(_)},setSession(_){B!==_&&(q++,Rn=null,C({modelComputePending:!1,modelComputeError:null,enableError:null,listenModeError:!1,newChatFor:void 0}),vr(),c.clear(),l=null,C({settingsConflict:!1,settingsDraftActions:[]}),It({clear:!0}),go({clear:!0}),ut(),Fn(),k(),B=_,Dt(),ct(),C({installPlan:null,installPlanFor:null}),Ue({settings:!0,force:!0}),yo())},attachConversationClient(_){S!==_&&(at(),pt?.abort(),pt=null,q++,Rn=null,C({modelComputePending:!1,modelComputeError:null,repair:null}),vr(),It({clear:!0}),go({clear:!0}),k(),G.clear()),S=_,Qn(),nt({initial:!0}),Dt(),ct(),Ue({settings:!0,force:!0}),S.readSetup&&(tt=null,yr=p,_r())},conversationUnavailable(_){i++,C({...r,error:String(_?.message??_),conversation:null,conversationFor:null,conversationError:String(_?.message??_)})},async dismissSetup(){let _=++p,x=await Fn();return x&&_===p&&(k(),Ke.discardSettingsDraft(),C({setupOpen:!1})),x&&_===p},async showHome(){let _=++p,x=await Fn();return x&&_===p&&(k(),Ke.discardSettingsDraft(),C({setupOpen:!1,panelView:"home"}),Ue()),x&&_===p},async openSettings(_="audio",x="conversation"){let T=++p,R=await Fn();return R&&T===p&&(k(),C({setupOpen:!1,panelView:"settings",settingsTab:["audio","interaction","prompt","models","advanced","repair","sessions","pets"].includes(_)?_:"audio",settingsModelTab:x,sessionManagementRoot:null,sessionHistoryOpen:!1}),Ue({settings:!0})),R&&T===p},repairRequest:Qn,readOperationLog:Qd,manageSessions:ep,listExistingVoiceSessions:np,retryVoiceTranscript:Jd,setExistingVoiceSession:tp,setSettingsTab(_){_!==s.settingsTab&&C({settingsTab:_,sessionManagementRoot:null,sessionHistoryOpen:!1})},setSettingsModelTab(_){C({settingsModelTab:_})},setSessionManagement({rootId:_=s.sessionManagementRoot,historyOpen:x}){C({sessionManagementRoot:_,sessionHistoryOpen:x})},whisperAsrAction:op,updateAction:lt,dismissUpdate(_){_&&C({dismissedUpdateVersion:_})},dismissRepair:_=>C({repairDismissed:_}),openSetup(){++p,k(),C({setupOpen:!0}),Ue({settings:!0,force:!0}),!N&&!s.busy&&(async()=>{let _=B;await Ke.run(_,"read-settings")&&B===_&&await Ke.run(_,"status")})()},cancelPreview:Fn,discardDiagnostics:k,refreshAuthorization:nt,saveAuthorization:rp,openAuthorization:()=>nt({open:!0}),closeAuthorization({resumeSetup:_=!1}={}){return!s.authorizationBusy&&!s.authorizationLoading?(Tt=!_,++p,yr=p,C({authorizationOpen:!1,setupOpen:_}),_&&Ue({settings:!0}),!0):!1},async run(_,x,T={},R=!1){if(!w||et&&x==="status"||(et||s.existingSessionUnconfirmed)&&["enable","new","resume"].includes(x))return!1;let K=!!(R&&Dn.has(x)&&!s.uncertain&&s.checkedFor===_&&s.settingsFor===_&&s.status&&s.settings);if(K&&g.has(x))return!1;if(R||b(),x==="read-history"){if(B!==_||s.conversationHistoryLoading)return!1;let j=++i,Be=q,on=A;C({conversationHistoryLoading:!0,conversationHistoryError:null,conversationHistoryRequestCursor:T.cursor??null});try{let $e=await kn(_,{action:x,...T});if(!w||B!==_||Be!==q||j!==i||on!==A||s.conversation?.rootSessionId&&(s.conversation.rootSessionId!==$e.rootSessionId||$e.scope!=="voice-session"&&s.conversation.historyGeneration!==$e.generation))return!1;let zn=s.conversationHistory;if(T.cursor&&(!zn||zn.generation!==$e.generation||zn.rootSessionId!==$e.rootSessionId))return!1;let _o=new Map($e.items.map(dn=>[dn.id,dn]));if(T.cursor)for(let dn of zn.items)_o.set(dn.id,dn);if(s.conversation?.rootSessionId===$e.rootSessionId)for(let dn of s.conversation?.items??[])_o.set(dn.id,dn);let Ot=[..._o.values()].sort((dn,wr)=>dn.at-wr.at),wo=T.cursor?Ot.slice(0,4e3):Ot.slice(-4e3),Vi=wo.reduce((dn,wr)=>dn+wr.text.length,0),ji=Ot.length>4e3;for(;Vi>4*1024*1024;)Vi-=(T.cursor?wo.pop():wo.shift()).text.length,ji=!0;return C({conversationHistory:{...$e,items:wo,truncated:$e.truncated||ji||!!(T.cursor&&zn?.truncated)},conversationHistoryFor:_}),!0}catch($e){return j===i&&C({conversationHistoryError:String($e?.message??$e)}),!1}finally{j===i&&C({conversationHistoryLoading:!1})}}if(x==="apply-model-install"&&["save-models","save-tts"].some(j=>c.has(j)))return C({error:"\u8BF7\u5148\u4FDD\u5B58\u6216\u653E\u5F03\u6A21\u578B\u8BBE\u7F6E\u8349\u7A3F\uFF0C\u518D\u5207\u6362\u6A21\u578B\u3002"}),!1;if(x==="read-audio-devices")return Gd(_);if(x==="inspect-performance")return Yd(_);if(x==="cancel-tts"){if(H)return Fn();try{let j=await kn(_,{action:x});return C({ttsPreview:j,ttsPreviewFor:_}),j.status==="unconfirmed"?(ie({uncertain:!0,error:"\u65E0\u6CD5\u786E\u8BA4\u6717\u8BFB\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B\u3002"}),!1):!0}catch(j){return ie({error:String(j?.message??j),uncertain:!0}),!1}}let Q=x==="disable"&&h&&!m;if(s.busy&&!Q||s.ttsCancelling||s.settingsConflict&&lo.includes(x)||s.agentPermissionUncertain&&x==="save-agent-permissions"||s.agentRequestUncertain&&x==="decide-agent-request"||s.ttsUncertain&&!Bt.includes(x)&&x!=="disable"||s.visibilityUncertain&&!Bt.includes(x)||s.outputVolumeUncertain&&x==="set-output-volume"||s.installerUncertain&&["start-model-install","control-model-install","apply-model-install"].includes(x))return!1;if(!_&&(_!==null||!Iu.has(x)))return C({error:"\u6B64\u64CD\u4F5C\u9700\u8981\u4F1A\u8BDD\u6765\u6E90"}),!1;let ye;if(Q&&(h.stale=!0,Dn.has(h.action)&&h.abort.abort(),ye=m=Symbol("diagnostic-stop")),!Bt.includes(x)){ut();for(let j of Dn)Sn(j)}(lo.includes(x)||co.includes(x)&&x!=="status")&&It({clear:x!=="set-performance-mode"});let fe;(kh.includes(x)||Dn.has(x))&&(fe={id:_,action:x,abort:new AbortController,stale:!1},K?g.set(x,fe):h=fe),K||(v++,C({busy:!0,error:null,...x==="enable"?{enableError:null}:{},...x==="save-bindings"?{bindingError:null}:{},interruptibleRead:h?.action??null,diagnosticStopPending:!!m,...x==="listen-mode"?{listenModePending:T.mode,listenModeBefore:s.conversation?.helper?.listenMode??s.status?.listenMode}:{},...x!=="status"&&co.includes(x)?{listenModeError:!1}:{}}));let Pe,tn=q,Bn=ao(s.status),hn=s.checkedFor,qn=me;try{if(fe?.stale)return!1;let j;if(["read-output-volume","set-output-volume"].includes(x)){if(!S)throw new Error("\u8BED\u97F3\u8F93\u51FA\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let Be=fe?.abort??new AbortController;ae.add(Be);let on;try{let $e=x==="read-output-volume"?S.readVolume(_,Be.signal):S.setVolume(_,T,Be.signal),zn=x==="read-output-volume"?await Promise.race([$e,new Promise((_o,Ot)=>{on=()=>Ot(new Error("Read cancelled")),Be.signal.addEventListener("abort",on,{once:!0})})]):await $e;j=In("output-volume",zn)}finally{Be.signal.removeEventListener("abort",on),ae.delete(Be)}}else{if(x==="preview-tts"&&(Pe={id:_,abort:new AbortController,cancelled:!1},H=Pe,C({ttsPreview:{status:"preparing"},ttsPreviewFor:_})),Dn.has(x)){let Be,on=new Promise(($e,zn)=>{Be=()=>zn(new Error("Read cancelled")),fe.abort.signal.addEventListener("abort",Be,{once:!0})});try{j=await Promise.race([kn(_,{...T,action:x},fe.abort.signal),on])}finally{fe.abort.signal.removeEventListener("abort",Be)}}else j=await kn(_,{...T,action:x},Pe?.abort.signal??fe?.abort.signal);if(fe?.stale)return!1}if(fe?.stale||Bt.includes(x)&&(!w||tn!==q))return!1;if(Dn.has(x)&&Sn(x),["agent-permissions","save-agent-permissions"].includes(x)&&C({agentPermissions:j,agentPermissionsFor:_,agentPermissionUncertain:!1}),["agent-requests","decide-agent-request"].includes(x)&&(C({agentRequests:j,agentRequestsFor:_,agentRequestUncertain:!1}),x==="decide-agent-request"&&j.lastOutcome?.state==="completed"&&(C({checkedFor:null}),Ue({settings:!0,force:!0})),x==="decide-agent-request"&&j.lastOutcome?.state==="unknown"&&C({uncertain:!0,error:"\u64CD\u4F5C\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u5148\u8BFB\u53D6\u5B9E\u9645\u72B6\u6001\uFF0C\u4E0D\u8981\u91CD\u8BD5\u3002"})),co.includes(x)){if(x==="listen-mode"){if(B!==_||tn!==q)return!1;if(j.listenMode!==T.mode)throw new Error("\u8BF4\u8BDD\u65B9\u5F0F\u7684\u56DE\u6267\u5C1A\u672A\u786E\u8BA4")}if(["status","disable"].includes(x)&&j.ttsRuntime){let $e=!!(j.ttsRuntime.blocked||s.ttsUncertain&&(j.ttsRuntime.busy||qn!==me));j.ttsRuntime.blocked&&me++,C({ttsUncertain:$e}),!$e&&!j.ttsRuntime.busy&&!X&&H?.cancelled&&(H=null)}let Be=s.visibilityUncertain&&!(x==="status"&&s.visibilityReadbackFor===_),on=Object.hasOwn(j,"existingVoiceSession");!on&&Object.hasOwn(s.status??{},"existingVoiceSession")&&(j={...j,existingVoiceSession:s.status.existingVoiceSession,existingVoiceSessionSupported:s.status.existingVoiceSessionSupported}),C({status:j,checkedFor:_,uncertain:Be,visibilityUncertain:Be,...Be?{}:{visibilityReadbackFor:null},...K?{error:null}:{},...x==="status"&&on?{existingSessionUnconfirmed:!1}:{},...x==="listen-mode"?{listenModeReceiptRevision:s.conversation?.revision??null}:{}}),nn&&(!j.enabled||j.existingVoiceSession?.sessionId!==nn.sessionId)&&hr(),["predecessor-cleanup-pending","helper-cleanup-pending"].includes(j.voiceSession?.recovery?.kind)?Ui(_):ut()}if(Wu.includes(x)&&(x!=="read-settings"&&tn===q&&(c.delete(x),C({settingsDraftActions:[...c]})),x==="read-settings"&&c.size>0&&s.settingsFor===_&&s.settings?.revision!==j.revision?(l=j,C({settingsConflict:!0})):(l=null,C({settings:j,settingsFor:_,settingsConflict:!1,settingsKey:c.size>0?s.settingsKey:j.revision})),j.onboarding&&Sn("setup-status"),C({...j.onboarding?{setupStatus:j.onboarding,setupError:null}:{},...x==="read-settings"&&s.visibilityUncertain&&["hidden","workspace"].includes(j.voiceSession?.visibility)?{visibilityReadbackFor:_}:{}})),x==="read-settings"&&s.visibilityUncertain&&Fe(_,"status"),x==="conversation-models"&&C({conversationModels:j,conversationModelsFor:_,conversationModelsError:null}),x==="inspect-tts"&&C({ttsCapabilities:j,ttsCapabilitiesFor:_}),x==="preview-tts"&&!Pe.cancelled&&C({ttsPreview:{...j,status:j.textOnly===!0?"text-only":"completed"},ttsPreviewFor:_}),["read-output-volume","set-output-volume"].includes(x)&&C({outputVolume:j,outputVolumeFor:_,outputVolumeUncertain:!1}),["save-voice-prompt","save-conversation-model","set-visibility","set-performance-mode","save-tts","apply-model-install"].includes(x)&&(C({status:null,checkedFor:null,catalog:null,catalogFor:null}),Ue({force:!0})),x==="plan-model-install"&&C({installPlan:j,installPlanFor:_,installPlanRequest:{...T}}),x==="model-installer"&&(C({installer:j,installerFor:_,installerUncertain:!!s.installerTerminationUnconfirmed}),B===_&&!U&&(U=!0,ct(!0))),x==="inspect-model-compute"&&s.installerFor===_&&s.installer&&C({installer:{...s.installer,compute:j}}),x==="start-model-install"&&C({installPlan:null,installPlanFor:null}),x==="list"){let Be=T.cursor&&s.catalogFor===_?s.catalog?.items??[]:[];C({catalog:{...j,items:[...new Map([...Be,...j.items].map(on=>[on.id,on])).values()]},catalogFor:_})}return["new","resume","listen-mode"].includes(x)&&C({catalog:null}),["new","resume"].includes(x)&&B===_&&tn===q&&(i++,C({...r,newChatFor:x==="new"&&T.expectedOwnerSessionId!==void 0?_:void 0})),x==="listen-mode"&&Ue({settings:!0,force:!0}),["status","enable","disable","new","resume"].includes(x)&&B===_&&(x!=="status"||hn!==_||Bn!==ao(j)||M!==un()||s.conversationError)&&Dt(),!0}catch(j){return x==="listen-mode"&&(B!==_||tn!==q)||(fe&&(j?.uncertain||/TTS_TERMINATION_UNCONFIRMED/.test(String(j?.code??"")+" "+String(j?.message??"")))&&(x==="inspect-tts"?ie({}):C({installerUncertain:!0,installerTerminationUnconfirmed:!0})),fe?.stale||Bt.includes(x)&&tn!==q)||Pe?.cancelled||(x==="status"&&ut(),Bt.includes(x)||(D=null),/AUTHORIZATION_REQUIRED/.test(String(j?.message??j))&&nt({open:!0}),Pe&&await Fn(),x==="preview-tts"&&me++,x==="enable"&&B===_&&tn===q&&C({enableError:String(j?.message??j)+(j?.code?" ["+j.code+"]":"")}),["read-settings","enable","new","resume","complete-setup","save-settings","save-models","save-tts","preview-tts"].includes(x)&&Qn(),x==="listen-mode"&&B===_&&tn===q&&C({listenModeError:!0}),C({error:String(j?.message??j),...x==="conversation-models"?{conversationModelsError:String(j?.message??j),conversationModels:null,conversationModelsFor:_}:{},...x==="save-bindings"?{bindingError:String(j?.message??j)+(j?.code?" ["+j.code+"]":"")}:{},...x==="save-agent-permissions"?{agentPermissionUncertain:!0}:{},...x==="decide-agent-request"?{agentRequestUncertain:!0}:{},...x==="preview-tts"?{ttsPreviewFor:_,ttsUncertain:!0}:{},...x==="set-output-volume"?{outputVolumeUncertain:!0}:{},...lo.includes(x)?{uncertain:!0,visibilityUncertain:!0,visibilityReadbackFor:null}:{},...["start-model-install","control-model-install"].includes(x)?{installerUncertain:!0}:{},...co.includes(x)?{uncertain:!0,readOnlyFailure:x==="status"&&(!s.uncertain||s.readOnlyFailure===!0)}:{}}),Dn.has(x)&&Fe(_,x),lo.includes(x)?(Fe(_,"read-settings"),Fe(_,"status")):co.includes(x)&&x!=="status"?Fe(_,"status"):x==="set-output-volume"?Fe(_,"read-output-volume"):x==="save-agent-permissions"?Fe(_,"agent-permissions"):x==="decide-agent-request"?Fe(_,"agent-requests"):["start-model-install","control-model-install"].includes(x)&&Fe(_,"model-installer")),!1}finally{g.get(x)===fe&&g.delete(x),Pe&&H===Pe&&!Pe.cancelled&&(H=null),fe&&h===fe&&(h=null),ye&&m===ye&&(m=null),K||(v--,C({busy:v>0,interruptibleRead:h?.action??null,diagnosticStopPending:!!m,...x==="listen-mode"?{listenModePending:null}:{}})),queueMicrotask(()=>{yo(),mt()})}},dispose(){if(w){Yn!==null&&t(Yn),q++,vr(),c.clear(),l=null,C({settingsConflict:!1,settingsDraftActions:[]}),It({clear:!0}),go({clear:!0}),ut(),Fn(),k(),h?.abort.abort(),at(),w=!1,A++,V++,E?.(),F?.();for(let _ of ae)_.abort();ae.clear(),ge.clear()}}},Ke}function uo(e,n,t,o=12){let i=n.left+o,r=n.top+o;return{x:Math.max(i,Math.min(e.x,Math.max(i,n.right-t.width-o))),y:Math.max(r,Math.min(e.y,Math.max(r,n.bottom-t.height-o)))}}function Gu(e=window){let n=null,t=null,o=null,i=null,r=null,s=null,c=null,l=null,u=null,d=()=>e.performance?.now?.()??Date.now(),p=e.matchMedia?.("(prefers-reduced-motion: reduce)"),h=()=>{l!==null&&e.cancelAnimationFrame?.(l),l=null,u&&(u=null,w("endDrag"))},m=M=>{if(l=null,!u||!n)return;if(p?.matches||n.dataset?.motion==="off"){h();return}let F=Math.max(0,M-u.time);u.time=M;let A={...i},V=!1;for(let U of["x","y"]){let H=u[U],X=(H.target-i[U])*Math.exp(-F/H.tau);A[U]=Math.abs(X)<.5?H.target:H.target-X,A[U]!==H.target&&(V=!0)}i=uo(A,r.box,r.size),g(),w("move");for(let U of["x","y"])Math.abs(i[U]-A[U])>.01&&(u[U].target=i[U]);!V||M-u.start>=2400?h():l=e.requestAnimationFrame(m)},v=(M,F)=>{n.style[M]!==F&&(n.style[M]=F)},g=()=>{v("left",`${i.x}px`),v("top",`${i.y}px`)},b=null,k=null,N="",D=()=>{let M=(n?.closest("[data-shell-overlay]")??n?.ownerDocument?.querySelector?.("[data-shell-overlay]"))?.getBoundingClientRect(),F=e.visualViewport,A=Math.max(M?.left??0,F?.offsetLeft??0),V=Math.max(M?.top??0,F?.offsetTop??0),U=Math.min(M?.right??e.innerWidth,(F?.offsetLeft??0)+(F?.width??e.innerWidth)),H=Math.min(M?.bottom??e.innerHeight,(F?.offsetTop??0)+(F?.height??e.innerHeight)),X=parseFloat(e.getComputedStyle(n).getPropertyValue("--dsh-frame-top-clearance"))||0;return{left:A,top:V+X,right:U,bottom:H}},P=M=>{if(!n)return;let F=Number.isFinite(M?.width)&&Number.isFinite(M?.height),A=F&&r?r.box:D();v("maxWidth",`${Math.max(1,A.right-A.left-24)}px`),v("maxHeight",`${Math.max(1,A.bottom-A.top-24)}px`);let V=F?M:n.getBoundingClientRect();r={box:A,size:{width:V.width,height:V.height}},i=uo(i??{x:A.right-V.width-20,y:A.bottom-V.height-20},A,V),g(),!o&&!u&&w("resize")},L=()=>{c!==null&&e.cancelAnimationFrame?.(c),c=null},I=()=>{L();let M=s;s=null,!(!o||!n||!M)&&(i=uo(M,r.box,r.size),g(),w("move"))},q=M=>{n?.dataset&&(M&&["left","right","top","bottom"].includes(M.edge)&&["preview","docked"].includes(M.phase)?(n.dataset.whaleDockEdge=M.edge,n.dataset.whaleDockPhase=M.phase):(delete n.dataset.whaleDockEdge,delete n.dataset.whaleDockPhase))},z=()=>{let M=k;k=null;try{M?.dispose()}catch{}q(null),n&&(n.style.zIndex=N)},w=M=>{try{typeof k?.[M]=="function"&&k[M]()}catch{z()}},S=()=>{if(z(),!(!n||b?.version!==1||typeof b.register!="function"))try{k=b.register({id:"whale-voice",read(){let{box:M,size:F}=r;return{rect:{...i,width:F.width,height:F.height},bounds:{x:M.left+12,y:M.top+12,width:Math.max(1,M.right-M.left-24),height:Math.max(1,M.bottom-M.top-24)},collapsed:n.hasAttribute?.("data-collapsed")===!0}},apply(M){!n||!Number.isFinite(M?.x)||!Number.isFinite(M?.y)||(i=uo(M,r.box,r.size),g())},onDock:q,onFront:M=>{n&&(n.style.zIndex=M===!0?"901":"900")}}),["beginDrag","move","endDrag","resize","detach","dispose"].every(M=>typeof k?.[M]=="function")||z()}catch{z()}},B=(M=!1,F=!1)=>{M?I():(L(),s=null);let A=o;o=null,A?.target.hasPointerCapture?.(A.id)&&A.target.releasePointerCapture(A.id);let V=d(),U=A?.samples??[],H=U.at(-1),X=U[0],ge=H&&X?H.time-X.time:0,ae=H?V-H.time:1/0,ee=Math.max(0,1-Math.max(0,ae-24)/56),G=ge>0?(H.x-X.x)/ge*ee:0,C=ge>0?(H.y-X.y)/ge*ee:0;if(A&&F&&!p?.matches&&n?.dataset?.motion!=="off"&&typeof e.requestAnimationFrame=="function"&&Math.hypot(G,C)>.04){let ve=uo({x:i.x+G*240,y:i.y+C*240},r.box,r.size),Ie=(De,je)=>({target:ve[De],tau:je?Math.max(1,Math.abs((ve[De]-i[De])/je)):240});u={x:Ie("x",G),y:Ie("y",C),time:V,start:V},l=e.requestAnimationFrame(m)}else A&&w(M?"endDrag":"detach")},E=()=>{h(),B(),z(),t?.disconnect(),t=null,e.removeEventListener("resize",P),e.visualViewport?.removeEventListener("resize",P),e.visualViewport?.removeEventListener("scroll",P),n=null,r=null};return{ref(M){if(M===n||(E(),!M))return;n=M,N=M.style.zIndex||"",n.style.transitionProperty="none",t=new e.ResizeObserver(A=>{let V=A?.find?.(H=>H.target===n),U=V?.borderBoxSize?.[0]??V?.borderBoxSize;Number.isFinite(U?.inlineSize)&&Number.isFinite(U?.blockSize)&&A.every(H=>H.target===n)?P({width:U.inlineSize,height:U.blockSize}):P()}),t.observe(n);let F=n.closest("[data-shell-overlay]")??n.ownerDocument?.querySelector?.("[data-shell-overlay]");F&&t.observe(F),e.addEventListener("resize",P),e.visualViewport?.addEventListener("resize",P),e.visualViewport?.addEventListener("scroll",P),P(),S()},useLayoutService(M){return b=M,S(),()=>{b===M&&(z(),b=null,P())}},activate(){h(),w("activate")},pointerDown(M,F=M.currentTarget){M.button!==0||M.pointerType&&M.pointerType!=="mouse"||!n||(h(),P(),w("beginDrag"),o={id:M.pointerId,target:F,x:M.clientX,y:M.clientY,start:{...i},samples:[{x:M.clientX,y:M.clientY,time:d()}]},F.setPointerCapture(M.pointerId),M.preventDefault())},pointerMove(M){if(!o||M.pointerId!==o.id)return;let F=d(),A=[M];try{A=[...M.getCoalescedEvents?.()??[],M]}catch{}for(let X of A){if(!Number.isFinite(X.clientX)||!Number.isFinite(X.clientY))continue;let ge=Number.isFinite(X.timeStamp)&&Number.isFinite(M.timeStamp)?Math.min(0,X.timeStamp-M.timeStamp):0,ae=F+Math.max(-60,ge),ee=o.samples.at(-1);if(ae<ee.time)continue;let G={x:X.clientX,y:X.clientY,time:ae};ae===ee.time?o.samples[o.samples.length-1]=G:o.samples.push(G)}let V=F-60;for(;o.samples.length>2&&o.samples[1].time<=V;)o.samples.shift();let U=o.samples[0],H=o.samples[1];if(H&&U.time<V&&H.time>V){let X=(V-U.time)/(H.time-U.time);o.samples[0]={x:U.x+(H.x-U.x)*X,y:U.y+(H.y-U.y)*X,time:V}}s={x:o.start.x+M.clientX-o.x,y:o.start.y+M.clientY-o.y},typeof e.requestAnimationFrame!="function"?I():c===null&&(c=e.requestAnimationFrame(I))},pointerEnd(M){M.pointerId===o?.id&&B(!["pointercancel","lostpointercapture"].includes(M.type),M.type==="pointerup")},keyDown(){},fit:P,dispose:E}}var Li=Object.freeze({panel:320,settings:660,setup:420,collapsed:216});function Xu(e=window,{onResize:n=()=>{}}={}){let t=null,o=null,i=null,r=null,s=null,c=null,l=null,u=null,d=null,p=null,h=null,m=null,v=null,g=null,b=null,k={width:0,height:0},N=e.matchMedia?.("(prefers-reduced-motion: reduce)"),D=()=>N?.matches?"off":t?.dataset.motion??"spring",P=E=>Number.parseFloat(E)||0;function L(){let E=e.visualViewport,M=(t.closest?.("[data-shell-overlay]")??t.ownerDocument?.querySelector?.("[data-shell-overlay]"))?.getBoundingClientRect(),F=Math.max(M?.left??0,E?.offsetLeft??0),A=Math.max(M?.top??0,E?.offsetTop??0),V=Math.min(M?.right??e.innerWidth,(E?.offsetLeft??0)+(E?.width??e.innerWidth)),U=Math.min(M?.bottom??e.innerHeight,(E?.offsetTop??0)+(E?.height??e.innerHeight)),H=e.getComputedStyle(t);return{width:Math.max(1,V-F-24),height:Math.max(1,Math.min((U-A)*.6,U-A-24-P(H.getPropertyValue("--dsh-frame-top-clearance")))),chrome:P(H.paddingTop)+P(H.paddingBottom)+P(H.borderTopWidth)+P(H.borderBottomWidth),horizontalChrome:P(H.paddingLeft)+P(H.paddingRight)+P(H.borderLeftWidth)+P(H.borderRightWidth),panelRadius:P(H.getPropertyValue("--dsw-radius-lg"))||12}}function I(){l!==null&&e.cancelAnimationFrame(l),l=null,d=null}function q(){!t||!p||(p.width=Math.max(1,Math.min(p.width,m.width)),p.height=Math.max(1,Math.min(p.height,m.height)),t.style.width=`${p.width.toFixed(3)}px`,t.style.height=`${p.height.toFixed(3)}px`,t.style.setProperty?.("--whale-visible-content",`${Math.max(1,p.height-m.chrome)}px`),b===null?t.style.removeProperty?.("--whale-animated-radius"):t.style.setProperty?.("--whale-animated-radius",`${b.toFixed(2)}px`),n({width:p.width,height:p.height}))}function z(E){if(l=null,!t||!h)return;let M=Math.min(.032,Math.max(.001,d===null?1/60:(E-d)/1e3));d=E;let F=g?560:D()==="firm"?420:360,A=g?47.4:D()==="firm"?41:30,V=!0;for(let U of["width","height"]){for(let H=0;H<4;H++)k[U]+=(F*(h[U]-p[U])-A*k[U])*M/4,p[U]+=k[U]*M/4;(Math.abs(h[U]-p[U])>.25||Math.abs(k[U])>1)&&(V=!1)}if(g){let U=h.height-g.height,H=Math.abs(U)>.25?Math.max(0,Math.min(1,(p.height-g.height)/U)):1,X=v?h.height/2:m.panelRadius;b=g.radius+(X-g.radius)*H}(V||D()==="off")&&(p={...h},k={width:0,height:0},d=null,g=b=null),q(),!V&&D()!=="off"&&(l=e.requestAnimationFrame(z))}function w(){if(!t||!o)return;m=L(),t.dataset.compactHeight=m.height<300?"true":"false";let E=t.hasAttribute("data-collapsed")&&t.dataset.collapsed!=="false";if(p&&v!==null&&E!==v){let ve=b??(v?p.height/2:m.panelRadius);g={height:p.height,radius:ve},b=ve,t.style.setProperty?.("--whale-animated-radius",`${ve.toFixed(2)}px`),k={width:0,height:0}}v=E;let M=t.dataset.view,F=Math.min(m.width,E?Li.collapsed:Li[M]??Li.panel);t.style.boxSizing="border-box",t.style.transitionProperty="none",t.style.overflow="hidden",t.style.maxWidth=`${m.width}px`,t.style.maxHeight=`${m.height}px`;let A=Math.max(1,m.height-m.chrome);o.style.width=`${Math.max(1,F-m.horizontalChrome)}px`,o.style.maxHeight=`${A}px`,o.style.overflowY="hidden",o.style.minHeight="0",t.style.setProperty?.("--whale-content-limit",`${A}px`);let V=!!o.querySelector?.('[data-size-detail="true"]'),U=E?null:M==="setup"?o.querySelector?.("[data-whale-intrinsic]"):M==="home"&&!V?o.querySelector?.("[data-home-controls]"):null,H=U?.querySelector?.("[data-whale-natural-content]"),X=H??U;M==="setup"&&!E&&(o.style.height="auto"),X!==c&&(s?.disconnect(),u!==null&&e.cancelAnimationFrame(u),u=null,s=null,c=X,c&&e.ResizeObserver&&(s=new e.ResizeObserver(()=>{u===null&&(u=e.requestAnimationFrame(()=>{u=null,w()}))}),s.observe(c)));let ge=U?.getBoundingClientRect?.().height,ae=H?Math.max(0,H.offsetHeight-H.parentElement.clientHeight):0,ee=ge+ae,G=E?44:ee>0?Math.ceil(ee+m.chrome):M==="home"?V?520:320:480,C=Math.min(m.height,G);(M!=="setup"||E)&&(o.style.height=`${Math.max(1,C-m.chrome)}px`),h={width:F,height:C},!p||D()==="off"?(I(),p={...h},k={width:0,height:0},g=b=null,q()):l===null&&(Math.abs(p.width-F)>.25||Math.abs(p.height-C)>.25)&&(d=e.performance?.now?.()??null,l=e.requestAnimationFrame(z))}function S(){I(),i?.disconnect(),r?.disconnect(),s?.disconnect(),u!==null&&e.cancelAnimationFrame(u),u=null,s=c=null,e.removeEventListener("resize",w),e.visualViewport?.removeEventListener("resize",w),e.visualViewport?.removeEventListener("scroll",w),N?.removeEventListener?.("change",w),i=r=null}function B(){if(S(),!(!t||!o)){if(e.ResizeObserver){i=new e.ResizeObserver(w);let E=t.closest?.("[data-shell-overlay]")??t.ownerDocument?.querySelector?.("[data-shell-overlay]");E&&i.observe(E)}e.MutationObserver&&(r=new e.MutationObserver(w),r.observe(t,{attributes:!0,attributeFilter:["data-view","data-motion","data-collapsed"]}),r.observe(o,{attributes:!0,attributeFilter:["data-size-detail","data-home-layout"],subtree:!0})),e.addEventListener("resize",w),e.visualViewport?.addEventListener("resize",w),e.visualViewport?.addEventListener("scroll",w),N?.addEventListener?.("change",w),w()}}return{ref(E){t!==E&&(t=E,p=h=v=g=b=null,k={width:0,height:0},B())},contentRef(E){o!==E&&(o=E,B())},update:w,dispose(){S(),t=o=p=h=null}}}var Yu=["spring","firm","off"];function Qu(e=window){let n="dsh-whale-voice:motion:v1",t="dsh-whale-voice:assistant-name:v1",o=()=>{try{let u=e.localStorage.getItem(t)?.trim();return u&&u.length<=40?u:null}catch{return null}},i=new Set,r=()=>{try{let u=e.localStorage.getItem(n);return Yu.includes(u)?u:"spring"}catch{return"spring"}},s={motion:r(),assistantName:o(),error:null},c=u=>{s=u;for(let d of i)d()},l=u=>{[n,t,null].includes(u.key)&&c({motion:r(),assistantName:o(),error:null})};return e.addEventListener("storage",l),{getSnapshot:()=>s,subscribe(u){return i.add(u),()=>i.delete(u)},setMotion(u){if(!Yu.includes(u))return!1;let d=null;try{e.localStorage.setItem(n,u)}catch{d="storage-unavailable"}return c({...s,motion:u,error:d}),!d},setAssistantName(u){if(typeof u!="string"||!u.trim()||u.trim().length>40)return!1;let d=u.trim(),p=null;try{e.localStorage.setItem(t,d)}catch{p="storage-unavailable"}return c({...s,assistantName:d,error:p}),!p},dispose(){e.removeEventListener("storage",l),i.clear()}}}var Sh='button,input,textarea,select,a,label,summary,[role="button"],[role="slider"],[role="tab"],[contenteditable="true"],[data-no-drag]';function ed(e,n){if(!e||!n?.contains(e))return!1;let t=e.closest?.(Sh);return!t||t.hasAttribute("data-drag-surface")}function nd(e){if(e.repeat||e.isComposing||e.metaKey)return null;let n=e.code;if(/^Key[A-Z]$/.test(n)){if(!/^[a-z]$/i.test(e.key??""))return null;n="Key"+e.key.toUpperCase()}else if(/^Digit[0-9]$/.test(n)){if(!/^[0-9]$/.test(e.key??""))return null;n="Digit"+e.key}return!/^(F([1-9]|1[0-9]|2[0-4])|Key[A-Z]|Digit[0-9]|Space)$/.test(n)||e.altKey&&n==="F4"?null:{code:n,modifiers:[e.ctrlKey&&"Control",e.altKey&&"Alt",e.shiftKey&&"Shift"].filter(Boolean)}}var sr=()=>({revision:0,rootSessionId:null,title:null,latest:null,items:[],inputActive:!1,inputError:null,playbackConfirmed:!1}),Pi=()=>({schema:1,hardware:null,compute:{schema:1,default:"cpu",observedAt:null,backends:{},reason:"\u5C1A\u672A\u68C0\u6D4B\u672C\u5730\u8BA1\u7B97\u540E\u7AEF\u3002"},models:[],jobs:[]});async function td(e,n=()=>{}){let t=await e.remote.$mount(Ru),o,i;try{if(i=e.inject(["remote","remote.whaleConversation"],d=>{o=d.remote.whaleConversation}),await i.await(),!o)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA")}catch(d){throw await i?.dispose(),await t(),d}let r=new Set,s=new Map,c=!1,l=d=>{if(d?.ok!==!0)throw d?.error??new Error("\u8BED\u97F3\u63A5\u53E3\u54CD\u5E94\u65E0\u6548");return d.value},u=async(d,p,h=!0)=>{let m;try{m=await d()}catch(v){throw h&&!c&&n("ui-request","finished",p?.aborted?"cancelled":"failed"),v}return h&&m?.ok!==!0&&m?.error==null&&!p?.aborted&&n("ui-render-error","finished","failed"),l(m)};return{subscribeUpdates(d,p){let h=new AbortController;return r.add(h),Promise.resolve().then(async()=>{if(!h.signal.aborted)try{for await(let m of o.followUpdates(h.signal))h.signal.aborted||d(m);h.signal.aborted||(n("ui-stream","finished","failed"),p())}catch{h.signal.aborted||(n("ui-stream","finished","failed"),p())}finally{r.delete(h)}}),()=>{h.abort(),r.delete(h)}},updateAction(d,p){if(c)throw new Error("\u66F4\u65B0\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.updateAction(d,p),p)},subscribePresentation(d,p){let h=new AbortController;return r.add(h),(async()=>{try{for await(let m of o.followPresentation(h.signal))h.signal.aborted||d(m);h.signal.aborted||(n("ui-stream","finished","failed"),p(new Error("\u4F1A\u8BDD\u663E\u793A\u8FDE\u63A5\u5DF2\u7ED3\u675F")))}catch(m){h.signal.aborted||(n("ui-stream","finished","failed"),p(m))}finally{r.delete(h)}})(),()=>{h.abort(),r.delete(h)}},subscribe(d,p,h=()=>{}){let m=new AbortController;return r.add(m),p(sr(),{initial:!0}),(async()=>{try{for await(let v of o.follow(d,m.signal))m.signal.aborted||p(v);m.signal.aborted||(n("ui-stream","finished","failed"),p(sr(),{initial:!0}),h(new Error("\u8BED\u97F3\u72B6\u6001\u8FDE\u63A5\u5DF2\u7ED3\u675F\uFF0C\u6B63\u5728\u91CD\u65B0\u8FDE\u63A5")))}catch(v){m.signal.aborted||(n("ui-stream","finished","failed"),p(sr(),{initial:!0}),h(v))}finally{r.delete(m)}})(),()=>{m.abort(),r.delete(m),p(sr(),{initial:!0})}},subscribeModels(d,p,h=()=>{}){if(c)return p(Pi(),{initial:!0}),h(new Error("\u6A21\u578B\u8FDB\u5EA6\u63A5\u53E3\u5DF2\u5378\u8F7D")),()=>{};let m=new AbortController,v=!1,g=()=>{v||(v=!0,m.abort(),s.delete(m),p(Pi(),{initial:!0}))};return s.set(m,g),p(Pi(),{initial:!0}),(async()=>{try{for await(let b of o.followModels(d,m.signal))!v&&!c&&!m.signal.aborted&&p(b);!v&&!c&&!m.signal.aborted&&(n("ui-stream","finished","failed"),g(),h(new Error("\u6A21\u578B\u8FDB\u5EA6\u8FDE\u63A5\u5DF2\u7ED3\u675F\uFF0C\u6B63\u5728\u91CD\u65B0\u8FDE\u63A5")))}catch(b){!v&&!c&&!m.signal.aborted&&(n("ui-stream","finished","failed"),g(),h(b))}finally{s.delete(m)}})(),g},async action(d,p,h){if(c)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");let m=await u(()=>o.action(d,p,h),h);try{let v=JSON.parse(m);if(v?.protocol!==1||v.action!==p.action||!v.value||typeof v.value!="object"||Array.isArray(v.value))throw new Error("Fish Voice UI protocol mismatch");return v.value}catch(v){throw n("ui-render-error","finished","failed"),v}},readAuthorization:d=>u(()=>o.readAuthorization(d),d),saveAuthorization:(d,p)=>u(()=>o.saveAuthorization(d,p),p),async whisperAsrAction(d,p){if(c)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.whisperAsrAction(d,p),p)},async repairAction(d,p){if(c)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");return JSON.parse(await u(()=>o.repairAction(d,p),p))},async manageSessions(d,p,h){if(c)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");return JSON.parse(await u(()=>o.manageSessions(d,p,h),h))},listExistingVoiceSessions(d,p){if(c)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.listExistingVoiceSessions(d,p),p)},setExistingVoiceSession(d,p){if(c)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.setExistingVoiceSession(d,p),p)},retryVoiceTranscript(d,p){if(c)throw new Error("\u8BED\u97F3\u91CD\u53D1\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.retryVoiceTranscript(d,p),p)},readClientOperationScope(d){if(c)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.readClientOperationScope(d),d,!1)},recordClientOperations(d,p){if(c)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.recordClientOperations(d,p),p,!1)},readOperationLog(d,p){if(c)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.readOperationLog(d,p),p,!1)},readSetup:d=>u(()=>o.readSetup(d),d),readVolume:(d,p)=>u(()=>o.readVolume(d,p),p),setVolume:(d,p,h)=>u(()=>o.setVolume(d,p,h),h),async dispose(){c=!0;for(let d of[...s.values()])d();s.clear();for(let d of r)d.abort();r.clear(),await i.dispose(),await t()}}}var id=new Set(tr),sd=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,od=256,Ai="dsh-fish-voice.pending-operation-log.v1",Ei="ui-buffer-overflow";function Mh(){let e=globalThis.crypto;if(e?.randomUUID)return e.randomUUID();let n=e?.getRandomValues(new Uint8Array(16));if(!n)return null;n[6]=n[6]&15|64,n[8]=n[8]&63|128;let t=Array.from(n,o=>o.toString(16).padStart(2,"0")).join("");return[t.slice(0,8),t.slice(8,12),t.slice(12,16),t.slice(16,20),t.slice(20)].join("-")}function Nh(){try{return globalThis.sessionStorage}catch{return}}function rd(e,n=!1){if(!e||typeof e.id!="string"||!sd.test(e.id)||!Number.isSafeInteger(e.at)||e.at<0||!id.has(e.action)||!["user","ui"].includes(e.source)||n!==(e.action===Ei)||n&&(e.source!=="ui"||!Number.isSafeInteger(e.count)||e.count<1))return null;let{id:t,at:o,action:i,source:r}=e;return{id:t,at:o,action:i,source:r,...n?{count:e.count}:{},...["requested","finished"].includes(e.phase)?{phase:e.phase}:{},...["ok","failed","cancelled"].includes(e.result)?{result:e.result}:{}}}function ad({schedule:e=setTimeout,unschedule:n=clearTimeout,now:t=Date.now,identify:o=Mh,storage:i=Nh()}={}){let r=[],s=null,c=null,l=null,u=!1,d,p,h,m=0,v=!1,g=()=>{p!==void 0&&(n(p),p=void 0)},b=S=>S&&S.at>=t()-qu,k=()=>{r=r.filter(b),b(s)||(s=null),b(c)||(c=null)},N=()=>r.length>0||s!==null||c!==null,D=()=>{if(!(!l||!i))try{N()?i.setItem(Ai,JSON.stringify({scope:l,pending:r,overflow:s,dropped:c})):i.removeItem(Ai)}catch{}},P=(S,B)=>{c={count:Math.min(Number.MAX_SAFE_INTEGER,(c?.count??0)+S),at:Math.max(c?.at??0,B)}},L=S=>{r.length>=od?P(1,S.at):r.push(S)},I=S=>{if(l===null){let B;try{B=JSON.parse(i?.getItem(Ai)??"null")}catch{}if(B?.scope===S){let E=r,M=c,F=Array.isArray(B.pending)?B.pending.slice(0,od).map(A=>rd(A)).filter(b):[];r=[...new Map(F.map(A=>[A.id,A])).values()],s=rd(B.overflow,!0),c=B.dropped&&Number.isSafeInteger(B.dropped.count)&&B.dropped.count>0&&Number.isSafeInteger(B.dropped.at)&&b(B.dropped)?{count:B.dropped.count,at:B.dropped.at}:null,M&&P(M.count,M.at);for(let A of E)b(A)&&L(A)}}else l!==S&&(r=[],s=null,c=null);l=S,u=!0,k(),D()},q=(S=160)=>{v||h||p!==void 0||u&&!N()||!d?.readClientOperationScope||!d?.recordClientOperations||(p=e(()=>{p=void 0,z()},S),p?.unref?.())};async function z(){let S=new AbortController,B=d;h=S;let E=()=>!v&&d===B&&h===S;try{let M=AbortSignal.any([S.signal,AbortSignal.timeout(1e4)]);if(!u){let U=await B.readClientOperationScope(M);if(!E())return;if(typeof U?.scope!="string"||!sd.test(U.scope))throw new Error("Operation scope unavailable");I(U.scope)}if(k(),!s&&c){let U=o();U&&(s={id:U,at:c.at,action:Ei,source:"ui",phase:"finished",count:c.count},c=null)}D();let F=s?[s,...r.slice(0,io-1)]:r.slice(0,io);if(!F.length)return;let A=await B.recordClientOperations({scope:l,events:F},M);if(!E())return;if(A?.accepted!==!0)throw new Error("Operation batch was not accepted");let V=new Set(F.map(U=>U.id));r=r.filter(U=>!V.has(U.id)),s&&V.has(s.id)&&(s=null),m=0,D()}catch{E()&&(u=!1,m++)}finally{E()&&(h=void 0,q(m?Math.min(3e4,750*2**Math.min(m-1,6)):160))}}function w(S,B,E,M){if(v||!id.has(S)||S===Ei)return;let F;try{F=o()}catch{return}F&&(k(),L({id:F,at:t(),action:S,source:B,...E?{phase:E}:{},...M?{result:M}:{}}),D(),q())}return{user(S){w(S,"user")},internal(S,B,E){w(S,"ui",B,E)},attach(S){d===S||v||(g(),h?.abort(),h=void 0,d=S,u=!1,m=0,q(0))},dispose(){v=!0,g(),h?.abort(),r=[],s=null,c=null}}}var $d=require("react-dom");var Oe=require("react"),ar=require("@deepseek-ai/dsh-client-ui-primitives");var f={settingsBrand:"iMBqLa_settingsBrand",audioDeviceNotice:"iMBqLa_audioDeviceNotice",assistantNameInput:"iMBqLa_assistantNameInput",mainAction:"iMBqLa_mainAction",primary:"iMBqLa_primary",transcriptRetryText:"iMBqLa_transcriptRetryText",voiceBars:"iMBqLa_voiceBars",popover:"iMBqLa_popover",placeholder:"iMBqLa_placeholder",requestDetails:"iMBqLa_requestDetails",authorization:"iMBqLa_authorization",whaleEnter:"iMBqLa_whaleEnter",notice:"iMBqLa_notice",voiceStatus:"iMBqLa_voiceStatus",whaleSpin:"iMBqLa_whaleSpin",backButton:"iMBqLa_backButton",settingsBody:"iMBqLa_settingsBody",modelHeading:"iMBqLa_modelHeading",quickSpeedHeader:"iMBqLa_quickSpeedHeader",modelNav:"iMBqLa_modelNav",messageName:"iMBqLa_messageName",whaleFeedback:"iMBqLa_whaleFeedback",motionPreview:"iMBqLa_motionPreview",settingsHeader:"iMBqLa_settingsHeader",popoverHeader:"iMBqLa_popoverHeader",conversationHeader:"iMBqLa_conversationHeader",quickHint:"iMBqLa_quickHint",settingsNav:"iMBqLa_settingsNav",voicePromptMode:"iMBqLa_voicePromptMode",currentDshAction:"iMBqLa_currentDshAction",guideButton:"iMBqLa_guideButton",field:"iMBqLa_field",fullName:"iMBqLa_fullName",voicePromptInput:"iMBqLa_voicePromptInput",deviceSelect:"iMBqLa_deviceSelect",segmented:"iMBqLa_segmented",existingSessionList:"iMBqLa_existingSessionList",audioDeviceGrid:"iMBqLa_audioDeviceGrid",settingsLayout:"iMBqLa_settingsLayout",newMessages:"iMBqLa_newMessages",bubbleStatus:"iMBqLa_bubbleStatus",historyScope:"iMBqLa_historyScope",pathRow:"iMBqLa_pathRow",panelContent:"iMBqLa_panelContent",headerActions:"iMBqLa_headerActions",pageHeading:"iMBqLa_pageHeading",radios:"iMBqLa_radios",inlineField:"iMBqLa_inlineField",floating:"iMBqLa_floating",quickSegments:"iMBqLa_quickSegments",voicePromptActions:"iMBqLa_voicePromptActions",recentMessages:"iMBqLa_recentMessages",openOriginal:"iMBqLa_openOriginal",mark:"iMBqLa_mark",volumeControl:"iMBqLa_volumeControl",settingsPage:"iMBqLa_settingsPage",status:"iMBqLa_status",error:"iMBqLa_error",permissionList:"iMBqLa_permissionList",message:"iMBqLa_message",currentDshTarget:"iMBqLa_currentDshTarget",newChatButton:"iMBqLa_newChatButton",audioDevices:"iMBqLa_audioDevices",brand:"iMBqLa_brand",statusRow:"iMBqLa_statusRow",quickSpeed:"iMBqLa_quickSpeed",assistantName:"iMBqLa_assistantName",bubbleBrand:"iMBqLa_bubbleBrand",audioDeviceHint:"iMBqLa_audioDeviceHint",bubble:"iMBqLa_bubble",voicePrompt:"iMBqLa_voicePrompt",ellipsis:"iMBqLa_ellipsis",whalePageEnter:"iMBqLa_whalePageEnter",panelViewport:"iMBqLa_panelViewport",hint:"iMBqLa_hint",whalePreview:"iMBqLa_whalePreview",backIcon:"iMBqLa_backIcon",quickActions:"iMBqLa_quickActions",updateDialog:"iMBqLa_updateDialog",disclosureRow:"iMBqLa_disclosureRow",conversationChoice:"iMBqLa_conversationChoice",conversationOptions:"iMBqLa_conversationOptions",voicePromptCount:"iMBqLa_voicePromptCount",header:"iMBqLa_header",audioDeviceField:"iMBqLa_audioDeviceField",capabilityRow:"iMBqLa_capabilityRow",section:"iMBqLa_section",whaleInputPulse:"iMBqLa_whaleInputPulse",settings:"iMBqLa_settings",details:"iMBqLa_details",note:"iMBqLa_note",markSmall:"iMBqLa_markSmall",iconButton:"iMBqLa_iconButton",performanceChoice:"iMBqLa_performanceChoice",inlineActions:"iMBqLa_inlineActions",existingSessionTarget:"iMBqLa_existingSessionTarget",loadHistory:"iMBqLa_loadHistory",agreement:"iMBqLa_agreement",sessionRename:"iMBqLa_sessionRename",spin:"iMBqLa_spin",actions:"iMBqLa_actions",formActions:"iMBqLa_formActions",authorizationActions:"iMBqLa_authorizationActions",transcriptRetryList:"iMBqLa_transcriptRetryList",transcriptRetries:"iMBqLa_transcriptRetries",authorizationBody:"iMBqLa_authorizationBody",whaleBreathe:"iMBqLa_whaleBreathe",volumeRow:"iMBqLa_volumeRow",existingSessionHome:"iMBqLa_existingSessionHome",updateAnnouncement:"iMBqLa_updateAnnouncement",caption:"iMBqLa_caption",transcriptRetry:"iMBqLa_transcriptRetry",sliderLabel:"iMBqLa_sliderLabel",quickConversation:"iMBqLa_quickConversation",existingSessionPicker:"iMBqLa_existingSessionPicker",authorizationSteps:"iMBqLa_authorizationSteps",currentModel:"iMBqLa_currentModel",sessionTitle:"iMBqLa_sessionTitle",voiceTarget:"iMBqLa_voiceTarget",editNotice:"iMBqLa_editNotice",existingSessionSearch:"iMBqLa_existingSessionSearch",updateHeader:"iMBqLa_updateHeader",text:`.iMBqLa_floating {
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

[data-ds-dark-theme] .iMBqLa_floating {
  --whale-solid-base: var(--dsw-static-neutral-bluish-950, #181a1e);
}

.iMBqLa_floating[data-collapsed] {
  border-radius: var(--whale-animated-radius, 999px);
  corner-shape: round;
  width: 216px;
  padding: 4px;
}

.iMBqLa_floating[data-view="settings"] {
  width: 660px;
  padding: 0;
}

.iMBqLa_floating[data-view="setup"]:not([data-collapsed]) {
  width: 420px;
}

.iMBqLa_floating:active {
  cursor: grabbing;
}

.iMBqLa_floating[data-whale-dock-phase="preview"] {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

.iMBqLa_floating [hidden] {
  display: none !important;
}

.iMBqLa_floating [data-no-drag] {
  cursor: auto;
  touch-action: pan-y;
}

.iMBqLa_panelViewport {
  overscroll-behavior: contain;
  min-width: 0;
  min-height: 0;
  overflow-x: hidden;
}

.iMBqLa_panelContent {
  min-width: 0;
  animation: iMBqLa_whaleEnter var(--whale-duration) var(--whale-ease);
}

.iMBqLa_mark {
  flex: none;
  width: 24px;
  height: 24px;
}

.iMBqLa_markSmall {
  flex: none;
  width: 20px;
  height: 20px;
}

.iMBqLa_brand, .iMBqLa_header, .iMBqLa_headerActions, .iMBqLa_actions, .iMBqLa_statusRow, .iMBqLa_caption {
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.iMBqLa_brand {
  font-size: 15px;
}

.iMBqLa_header {
  justify-content: space-between;
  margin-bottom: 12px;
}

.iMBqLa_headerActions {
  gap: 2px;
}

.iMBqLa_actions {
  flex-wrap: wrap;
}

.iMBqLa_iconButton {
  flex: none;
  width: 32px;
  min-width: 32px;
  height: 32px;
  padding: 0;
}

.iMBqLa_newChatButton {
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

.iMBqLa_newChatButton svg {
  width: 14px;
  height: 14px;
}

.iMBqLa_ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
}

.iMBqLa_statusRow {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  margin-bottom: 10px;
  padding: 4px 6px;
}

.iMBqLa_statusRow[data-recording] {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 19%,var(--dsw-alias-bg-module-platform));
}

.iMBqLa_statusRow[data-recording] .iMBqLa_voiceStatus > svg {
  color: var(--dsw-alias-brand-primary);
}

.iMBqLa_status {
  flex: 1;
  min-width: 0;
  margin: 0;
  font-size: 12px;
  line-height: 18px;
}

.iMBqLa_voiceTarget {
  flex: 1;
  align-items: center;
  gap: 4px;
  min-width: 0;
  line-height: 18px;
  display: flex;
}

.iMBqLa_voiceTarget > span {
  color: var(--dsw-alias-label-secondary);
  flex: none;
  font-size: 11px;
}

.iMBqLa_voiceTarget strong {
  font-size: 13px;
  font-weight: 600;
}

.iMBqLa_voiceStatus {
  align-items: center;
  gap: 4px;
  max-width: 47%;
  display: flex;
}

.iMBqLa_voiceStatus > svg {
  flex: none;
  width: 14px;
  height: 14px;
}

.iMBqLa_statusRow[data-bound] {
  flex-direction: column;
  align-items: stretch;
  gap: 0;
}

.iMBqLa_statusRow[data-bound] .iMBqLa_voiceStatus {
  max-width: 100%;
}

.iMBqLa_mainAction {
  width: 100%;
  min-height: 36px;
  font-weight: 500;
}

.iMBqLa_primary {
  color: var(--dsw-alias-label-primary) !important;
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 16%,var(--dsw-alias-bg-layer-2)) !important;
  border: 1px solid var(--dsw-alias-border-l2) !important;
}

.iMBqLa_bubble {
  corner-shape: round;
  cursor: grab;
  touch-action: none;
  width: 100%;
  max-width: 100%;
  height: 36px;
  animation: iMBqLa_whaleEnter var(--whale-duration) var(--whale-ease);
  border-radius: 999px;
  justify-content: flex-start;
  gap: 8px;
}

.iMBqLa_bubble .iMBqLa_ellipsis {
  text-align: left;
  flex: 1;
}

.iMBqLa_caption {
  text-align: left;
  justify-content: flex-start;
  width: 100%;
  margin-top: 8px;
  padding: 6px 0;
  font-size: 12px;
}

.iMBqLa_caption .iMBqLa_ellipsis {
  flex: 1;
}

.iMBqLa_openOriginal {
  flex: none;
}

.iMBqLa_hint, .iMBqLa_quickHint {
  color: var(--dsw-alias-label-secondary);
  overflow-wrap: anywhere;
  font-size: 12px;
}

.iMBqLa_hint {
  margin: 6px 0;
}

.iMBqLa_quickHint {
  margin: 0;
  font-size: 11px;
}

.iMBqLa_notice, .iMBqLa_note, .iMBqLa_error {
  border-radius: var(--dsw-radius-sm);
  overflow-wrap: anywhere;
  background: var(--dsw-alias-bg-module-platform);
  margin: 8px 0;
  padding: 8px 10px;
  font-size: 12px;
}

.iMBqLa_notice, .iMBqLa_note {
  border-left: 2px solid var(--dsw-alias-state-warn-primary);
}

.iMBqLa_error {
  border-left: 2px solid var(--dsw-alias-state-error-primary);
}

.iMBqLa_error button {
  margin-top: 8px;
}

.iMBqLa_popover {
  box-sizing: border-box;
  cursor: auto;
  touch-action: auto;
  width: 100%;
  animation: iMBqLa_whaleEnter var(--whale-duration) var(--whale-ease);
  margin: 0 0 10px;
  padding: 12px;
  position: relative;
  overflow: auto;
}

.iMBqLa_popoverHeader {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  display: flex;
}

.iMBqLa_popoverHeader > button {
  width: 28px;
  padding: 0;
}

.iMBqLa_quickConversation {
  max-height: 160px;
}

.iMBqLa_recentMessages {
  gap: 6px;
  display: grid;
}

.iMBqLa_message {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  padding: 5px 8px;
}

.iMBqLa_message strong {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

.iMBqLa_message p {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  margin: 3px 0 0;
}

.iMBqLa_quickActions {
  gap: 6px;
  min-width: 0;
  display: grid;
}

.iMBqLa_quickSpeed {
  gap: 5px;
  padding-top: 4px;
  display: grid;
}

.iMBqLa_quickSpeedHeader {
  color: var(--dsw-alias-label-secondary);
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  display: flex;
}

.iMBqLa_quickSpeedHeader small {
  font-size: 11px;
}

.iMBqLa_quickSegments {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  gap: 3px;
  padding: 3px;
  display: grid;
}

.iMBqLa_quickSegments button {
  min-width: 0;
  height: 28px;
  min-height: 28px;
  padding: 0 5px;
  font-size: 12px;
}

.iMBqLa_quickSegments button[aria-pressed="true"] {
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: 0 1px 3px #0001;
}

.iMBqLa_settings {
  height: 100%;
  min-height: 0;
  color: var(--dsw-alias-label-primary);
  flex-direction: column;
  display: flex;
  overflow: hidden;
}

.iMBqLa_settingsHeader {
  box-sizing: border-box;
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 4px 10px;
  display: flex;
}

.iMBqLa_settingsHeader h2 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.iMBqLa_settingsBrand {
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 6px;
  min-width: 0;
  display: flex;
}

.iMBqLa_backButton, .iMBqLa_guideButton {
  flex: none;
  padding: 0 8px;
  font-size: 12px;
}

.iMBqLa_backIcon {
  transform: rotate(180deg);
}

.iMBqLa_settingsLayout {
  flex: 1;
  grid-template-rows: minmax(0, 1fr);
  grid-template-columns: 104px minmax(0, 1fr);
  min-height: 0;
  display: grid;
  overflow: hidden;
}

.iMBqLa_settingsNav {
  border-right: 1px solid var(--dsw-alias-border-l2);
  background: var(--dsw-alias-bg-module-platform);
  flex-direction: column;
  gap: 3px;
  min-height: 0;
  padding: 8px 6px;
  display: flex;
  overflow-y: auto;
}

.iMBqLa_settingsNav button {
  justify-content: flex-start;
  min-width: 0;
  min-height: 34px;
  padding: 0 12px;
  font-size: 12px;
}

.iMBqLa_settingsNav button[aria-pressed="true"] {
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: inset 2px 0 0 var(--dsw-alias-brand-primary);
  font-weight: 600;
}

.iMBqLa_settingsPage {
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  display: flex;
  overflow: hidden;
}

.iMBqLa_pageHeading {
  flex: none;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 10px 12px 8px;
  display: flex;
}

.iMBqLa_pageHeading h3 {
  margin: 0;
  font-size: 15px;
}

.iMBqLa_pageHeading p {
  color: var(--dsw-alias-label-secondary);
  margin: 3px 0 0;
  font-size: 12px;
}

.iMBqLa_settingsBody {
  overscroll-behavior: contain;
  scrollbar-gutter: stable;
  outline-offset: -2px;
  flex: 1;
  min-width: 0;
  min-height: 0;
  padding: 4px 12px 12px;
  overflow-y: auto;
}

.iMBqLa_settingsBody > .iMBqLa_section, .iMBqLa_settingsBody > div > .iMBqLa_section {
  margin: 0 0 12px;
}

.iMBqLa_section {
  align-content: start;
  gap: 8px;
  min-width: 0;
  display: grid;
}

.iMBqLa_section h3 {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
}

.iMBqLa_section p, .iMBqLa_section > .iMBqLa_section {
  margin: 0;
}

.iMBqLa_settingsBody > .iMBqLa_section + .iMBqLa_section {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

.iMBqLa_section summary {
  cursor: pointer;
  padding: 7px 0;
  font-size: 13px;
  font-weight: 500;
}

details.iMBqLa_section {
  border-top: 1px solid var(--dsw-alias-border-l2);
  display: block;
}

details.iMBqLa_section > :not(summary) {
  margin-top: 10px;
}

.iMBqLa_field {
  gap: 6px;
  font-size: 12px;
  display: grid;
}

.iMBqLa_field input {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}

.iMBqLa_deviceSelect {
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

.iMBqLa_radios {
  border: 0;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
  margin: 0;
  padding: 0;
  display: flex;
}

.iMBqLa_radios legend {
  margin-bottom: 6px;
  font-size: 12px;
}

.iMBqLa_radios label {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  cursor: pointer;
  align-items: center;
  gap: 6px;
  padding: 6px 9px;
  font-size: 12px;
  display: flex;
}

.iMBqLa_radios input {
  accent-color: var(--dsw-alias-brand-primary);
}

.iMBqLa_segmented {
  flex-wrap: wrap;
  gap: 4px;
  display: flex;
}

.iMBqLa_segmented button {
  min-width: 0;
  font-size: 12px;
}

.iMBqLa_segmented button[aria-pressed="true"], .iMBqLa_modelNav button[aria-pressed="true"] {
  background: var(--dsw-alias-interactive-bg-active);
  color: var(--dsw-alias-label-primary);
  box-shadow: inset 0 -2px 0 var(--dsw-alias-brand-primary);
}

.iMBqLa_modelNav {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  gap: 4px;
  margin-bottom: 12px;
  padding: 0 16px 10px;
  display: flex;
}

.iMBqLa_modelNav button {
  flex: 1;
  min-width: 0;
  padding: 0 6px;
  font-size: 12px;
}

.iMBqLa_sliderLabel {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  display: flex;
}

.iMBqLa_sliderLabel span {
  margin-left: auto;
}

.iMBqLa_sliderLabel input {
  width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
}

.iMBqLa_formActions {
  padding-top: 4px;
}

.iMBqLa_formActions button {
  min-width: 100px;
}

.iMBqLa_editNotice {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 8px;
  display: flex;
}

.iMBqLa_editNotice div {
  flex: 1;
  min-width: 0;
}

.iMBqLa_editNotice strong {
  font-size: 12px;
}

.iMBqLa_editNotice p {
  color: var(--dsw-alias-label-secondary);
  margin: 3px 0 0;
  font-size: 12px;
}

.iMBqLa_editNotice button {
  flex: none;
  font-size: 12px;
}

.iMBqLa_details {
  grid-template-columns: auto minmax(0, 1fr);
  gap: 6px 12px;
  margin: 0;
  font-size: 12px;
  display: grid;
}

.iMBqLa_details dt {
  color: var(--dsw-alias-label-secondary);
}

.iMBqLa_details dd {
  overflow-wrap: anywhere;
  margin: 0;
}

.iMBqLa_capabilityRow {
  display: contents;
}

.iMBqLa_requestDetails {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  max-height: 200px;
  padding: 8px;
  font-size: 11px;
  overflow: auto;
}

.iMBqLa_placeholder {
  text-align: center;
  min-height: 140px;
  color: var(--dsw-alias-label-secondary);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  display: flex;
}

.iMBqLa_placeholder h3, .iMBqLa_placeholder p {
  margin: 0;
}

.iMBqLa_placeholder svg {
  width: 32px;
  height: 32px;
}

.iMBqLa_motionPreview {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  width: 40px;
  height: 32px;
  animation: iMBqLa_whalePreview var(--whale-duration) var(--whale-ease);
  place-items: center;
  display: grid;
}

.iMBqLa_settings a {
  color: var(--dsw-alias-link);
  text-underline-offset: 2px;
  overflow-wrap: anywhere;
}

.iMBqLa_updateDialog {
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

.iMBqLa_updateDialog::backdrop {
  background: #0005;
}

.iMBqLa_updateHeader {
  align-items: center;
  gap: 8px;
  display: flex;
}

.iMBqLa_updateHeader h2 {
  margin: 0;
  font-size: 16px;
}

.iMBqLa_updateAnnouncement {
  white-space: pre-line;
  overflow-wrap: anywhere;
}

.iMBqLa_updateDialog .iMBqLa_actions {
  margin-top: 12px;
}

.iMBqLa_updateDialog a {
  color: var(--dsw-alias-link);
  text-underline-offset: 2px;
}

.iMBqLa_authorization {
  height: auto;
  max-height: min(var(--whale-content-limit, 60vh),var(--whale-visible-content, 60vh));
}

.iMBqLa_authorization .iMBqLa_settingsHeader {
  min-height: 42px;
  padding: 0 0 10px;
}

.iMBqLa_authorization .iMBqLa_settingsHeader h2 {
  flex: 1;
  font-size: 16px;
}

.iMBqLa_authorizationBody {
  overscroll-behavior: contain;
  flex: 1;
  min-height: 0;
  padding-right: 6px;
  overflow-y: auto;
}

.iMBqLa_authorizationActions {
  border-top: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  padding: 10px 0 0;
}

.iMBqLa_authorizationBody > [data-whale-natural-content] {
  display: flow-root;
}

.iMBqLa_permissionList {
  gap: 0;
  margin: 12px 0;
  padding: 0;
  list-style: none;
  display: grid;
}

.iMBqLa_permissionList li {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  padding: 10px 0;
}

.iMBqLa_permissionList p {
  margin: 3px 0 0;
}

.iMBqLa_permissionList strong {
  font-size: 13px;
}

.iMBqLa_sessionTitle {
  overflow-wrap: anywhere;
}

.iMBqLa_sessionRename {
  gap: 6px;
  margin-top: 8px;
  display: grid;
}

.iMBqLa_existingSessionHome {
  text-align: left;
  justify-content: flex-start;
  gap: 2px;
  min-width: 0;
  height: 22px;
  min-height: 22px;
  padding: 0 4px;
  display: flex;
}

.iMBqLa_existingSessionHome svg {
  flex: none;
  width: 12px;
  height: 12px;
}

.iMBqLa_currentDshTarget {
  gap: 4px;
  min-width: 0;
  display: grid;
}

.iMBqLa_currentDshAction {
  text-align: left;
  grid-template-columns: minmax(0, 1fr);
  place-items: center start;
  min-width: 0;
  height: auto;
  min-height: 28px;
  padding: 3px 6px;
  font-size: 12px;
  line-height: 17px;
  display: grid;
}

.iMBqLa_currentDshAction > span {
  max-width: 100%;
}

.iMBqLa_currentDshAction > :last-child {
  color: var(--dsw-alias-label-secondary);
}

.iMBqLa_currentDshTarget > p {
  margin: 0;
}

.iMBqLa_transcriptRetries {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  max-height: 168px;
  padding: 4px 6px;
  display: flex;
}

.iMBqLa_transcriptRetries > header {
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 0 4px;
  display: flex;
}

.iMBqLa_transcriptRetries h2 {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
}

.iMBqLa_transcriptRetries > header p {
  color: var(--dsw-alias-label-secondary);
  margin: 0;
  font-size: 11px;
  line-height: 16px;
}

.iMBqLa_transcriptRetryList {
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

.iMBqLa_transcriptRetry {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 6px;
  display: grid;
}

.iMBqLa_transcriptRetry + .iMBqLa_transcriptRetry {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 4px;
}

.iMBqLa_transcriptRetry p {
  margin: 0;
}

.iMBqLa_transcriptRetryText {
  overflow-wrap: anywhere;
  white-space: pre-wrap;
  user-select: text;
  font-size: 13px;
  line-height: 18px;
}

.iMBqLa_transcriptRetry button {
  height: 26px;
  min-height: 26px;
  padding: 0 6px;
  font-size: 12px;
}

.iMBqLa_existingSessionTarget > p {
  margin: 4px 0;
}

.iMBqLa_existingSessionPicker {
  gap: 8px;
  min-width: 0;
  margin-top: 10px;
  display: grid;
}

.iMBqLa_existingSessionSearch {
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 6px;
  display: grid;
}

.iMBqLa_existingSessionList {
  max-height: clamp(96px, 26vh, 224px);
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: auto;
}

.iMBqLa_existingSessionList li {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
}

.iMBqLa_existingSessionList label {
  cursor: pointer;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: start;
  gap: 6px;
  padding: 6px 4px;
  display: grid;
}

.iMBqLa_existingSessionList label:has(input:disabled) {
  cursor: default;
}

.iMBqLa_existingSessionList label:has(input:checked) {
  background: var(--dsw-alias-interactive-bg-active);
}

.iMBqLa_existingSessionList input {
  accent-color: var(--dsw-alias-brand-primary);
  margin-top: 3px;
}

.iMBqLa_existingSessionList label span.iMBqLa_hint {
  margin: 3px 0 0;
  display: block;
}

.iMBqLa_performanceChoice {
  line-height: 1.1;
}

.iMBqLa_performanceChoice small {
  white-space: nowrap;
  font-size: .85em;
}

.iMBqLa_floating [data-whale-setup] {
  min-height: 0;
}

.iMBqLa_floating :is(button, input, select, textarea, summary, a) {
  touch-action: manipulation;
}

.iMBqLa_floating button {
  transition: background-color .12s, color .12s;
}

.iMBqLa_floating :is(button, input, select, summary, a):focus-visible, .iMBqLa_floating:focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

.iMBqLa_spin {
  animation: .7s linear infinite iMBqLa_whaleSpin;
}

.iMBqLa_mark[data-state="authorized"], .iMBqLa_markSmall[data-state="authorized"] {
  color: var(--dsw-alias-brand-primary);
}

.iMBqLa_mark[data-state="unknown"], .iMBqLa_markSmall[data-state="unknown"] {
  color: var(--dsw-alias-state-warn-primary);
}

.iMBqLa_mark[data-state="input-active"], .iMBqLa_markSmall[data-state="input-active"] {
  color: var(--dsw-alias-brand-primary);
  animation: 1.35s ease-in-out infinite iMBqLa_whaleBreathe;
}

.iMBqLa_mark[data-state="pending"], .iMBqLa_markSmall[data-state="pending"] {
  color: var(--dsw-alias-label-secondary);
}

[data-motion="firm"].iMBqLa_floating {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="off"].iMBqLa_floating, [data-motion="off"].iMBqLa_floating * {
  transition: none !important;
  animation: none !important;
}

@keyframes iMBqLa_whaleEnter {
  from {
    opacity: .4;
    transform: translateY(3px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes iMBqLa_whalePreview {
  from {
    transform: scale(.88);
  }

  to {
    transform: scale(1);
  }
}

@keyframes iMBqLa_whaleSpin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes iMBqLa_whaleBreathe {
  0%, 100% {
    opacity: .65;
  }

  50% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .iMBqLa_floating, .iMBqLa_floating * {
    transition: none !important;
    animation: none !important;
  }
}

@media (width <= 520px), (height <= 560px) {
  .iMBqLa_settingsLayout {
    grid-template-rows: auto minmax(0, 1fr);
    grid-template-columns: minmax(0, 1fr);
  }

  .iMBqLa_settingsNav {
    border-right: 0;
    border-bottom: 1px solid var(--dsw-alias-border-l2);
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 2px;
    padding: 5px 8px;
    display: grid;
    overflow: hidden;
  }

  .iMBqLa_settingsNav button {
    justify-content: center;
    height: 30px;
    min-height: 30px;
    padding: 0 2px;
  }

  .iMBqLa_settingsNav button[aria-pressed="true"] {
    box-shadow: inset 0 -2px 0 var(--dsw-alias-brand-primary);
  }

  .iMBqLa_settingsHeader {
    gap: 3px;
    min-height: 44px;
    padding: 5px 8px;
  }

  .iMBqLa_backButton, .iMBqLa_guideButton {
    padding: 0 5px;
  }

  .iMBqLa_settingsBrand {
    gap: 4px;
  }

  .iMBqLa_settingsBrand .iMBqLa_markSmall {
    display: none;
  }

  .iMBqLa_pageHeading {
    padding: 10px 12px 8px;
  }

  .iMBqLa_pageHeading p {
    display: none;
  }

  .iMBqLa_settingsBody {
    padding: 4px 12px 12px;
  }

  .iMBqLa_modelNav {
    margin-bottom: 8px;
    padding: 0 10px 7px;
  }

  .iMBqLa_editNotice {
    flex-wrap: wrap;
  }

  .iMBqLa_editNotice button {
    width: 100%;
  }
}

@media (height <= 420px) {
  .iMBqLa_settingsHeader {
    height: 36px;
    min-height: 36px;
    padding: 2px 8px;
  }

  .iMBqLa_settingsHeader button {
    height: 30px;
    min-height: 30px;
  }

  .iMBqLa_settingsNav {
    padding: 2px 8px;
  }

  .iMBqLa_settingsNav button {
    height: 28px;
    min-height: 28px;
  }

  .iMBqLa_pageHeading {
    box-sizing: border-box;
    min-height: 32px;
    padding: 2px 12px;
  }

  .iMBqLa_pageHeading .iMBqLa_iconButton {
    width: 28px;
    min-width: 28px;
    height: 28px;
  }

  .iMBqLa_modelNav {
    margin-bottom: 4px;
    padding: 0 10px 3px;
  }

  .iMBqLa_modelNav button {
    height: 28px;
    min-height: 28px;
  }
}

@media (pointer: coarse) {
  .iMBqLa_field input, .iMBqLa_deviceSelect {
    font-size: 16px;
  }
}

@media (forced-colors: active) {
  .iMBqLa_floating, .iMBqLa_popover {
    outline: 1px solid canvastext;
  }

  .iMBqLa_settingsNav button[aria-pressed="true"], .iMBqLa_modelNav button[aria-pressed="true"] {
    outline: 2px solid highlight;
  }
}

.iMBqLa_floating[data-view="home"] .iMBqLa_panelViewport, .iMBqLa_floating[data-collapsed] .iMBqLa_panelViewport {
  overflow: hidden;
}

.iMBqLa_floating[data-view="home"]:not([data-collapsed]) {
  padding: 10px;
}

.iMBqLa_panelContent {
  flex-direction: column;
  gap: 4px;
  height: 100%;
  min-height: 0;
  display: flex;
}

.iMBqLa_panelContent > :not(.iMBqLa_quickConversation) {
  flex: none;
}

.iMBqLa_panelContent > .iMBqLa_header {
  height: 28px;
  min-height: 28px;
  margin: 0;
}

.iMBqLa_panelContent .iMBqLa_header .iMBqLa_iconButton {
  width: 28px;
  min-width: 28px;
  height: 28px;
}

.iMBqLa_panelContent > .iMBqLa_statusRow {
  box-sizing: border-box;
  min-height: 24px;
  margin: 0;
  padding: 2px 6px;
}

.iMBqLa_panelContent > .iMBqLa_hint {
  margin: 0;
  font-size: 12px;
  line-height: 18px;
}

.iMBqLa_panelContent > .iMBqLa_error {
  margin: 0;
  padding: 4px 8px;
  line-height: 18px;
}

.iMBqLa_panelContent .iMBqLa_quickSpeed {
  gap: 3px;
  padding-top: 0;
}

.iMBqLa_panelContent .iMBqLa_quickSpeedHeader {
  line-height: 18px;
}

.iMBqLa_panelContent .iMBqLa_quickHint {
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 16px;
  overflow: hidden;
}

.iMBqLa_panelContent .iMBqLa_quickHint p {
  text-overflow: ellipsis;
  margin: 0;
  line-height: 16px;
  overflow: hidden;
}

.iMBqLa_panelContent > .iMBqLa_caption {
  box-sizing: border-box;
  height: 30px;
  min-height: 30px;
  margin: 0;
  padding: 4px 8px;
  line-height: 18px;
}

.iMBqLa_panelContent > .iMBqLa_quickConversation {
  flex-direction: column;
  flex: 1 1 0;
  min-height: 0;
  max-height: none;
  margin: 0;
  padding: 8px;
  display: flex;
  overflow: hidden;
}

.iMBqLa_quickConversation .iMBqLa_popoverHeader {
  flex: none;
  min-height: 28px;
  margin-bottom: 6px;
}

.iMBqLa_quickConversation .iMBqLa_recentMessages {
  overscroll-behavior: contain;
  min-height: 0;
  overflow-y: auto;
}

.iMBqLa_floating[data-compact-height="true"] .iMBqLa_panelContent {
  gap: 2px;
}

.iMBqLa_floating[data-compact-height="true"] .iMBqLa_voiceTarget > span {
  font-size: 10px;
}

.iMBqLa_floating[data-compact-height="true"] .iMBqLa_voiceTarget strong {
  font-size: 12px;
}

.iMBqLa_floating[data-compact-height="true"] .iMBqLa_statusRow[data-bound] .iMBqLa_status {
  line-height: 16px;
}

.iMBqLa_floating[data-compact-height="true"] .iMBqLa_statusRow[data-bound] .iMBqLa_existingSessionHome {
  height: 20px;
  min-height: 20px;
}

.iMBqLa_floating[data-compact-height="true"] .iMBqLa_transcriptRetries {
  max-height: max(46px,calc(var(--whale-content-limit) - 137px));
  gap: 1px;
  padding-block: 2px;
}

.iMBqLa_floating[data-compact-height="true"] [data-has-transcript-retry] > .iMBqLa_audioDevices, .iMBqLa_floating[data-compact-height="true"] .iMBqLa_panelContent:has(.iMBqLa_currentDshTarget) > :is(.iMBqLa_audioDevices, .iMBqLa_quickSpeed), .iMBqLa_floating[data-compact-height="true"] .iMBqLa_panelContent > .iMBqLa_hint:not([data-home-important]), .iMBqLa_floating[data-compact-height="true"] .iMBqLa_panelContent .iMBqLa_quickSpeedHeader, .iMBqLa_floating[data-compact-height="true"] .iMBqLa_panelContent .iMBqLa_quickHint {
  display: none;
}

.iMBqLa_floating[data-compact-height="true"] .iMBqLa_quickActions {
  grid-template-columns: minmax(65px, .9fr) minmax(0, 2.1fr);
  align-items: center;
  gap: 4px;
}

.iMBqLa_floating[data-compact-height="true"] .iMBqLa_quickActions .iMBqLa_mainAction {
  white-space: normal;
  height: 30px;
  min-height: 30px;
  padding-inline: 4px;
  font-size: 12px;
  line-height: 1.15;
}

.iMBqLa_floating[data-compact-height="true"] .iMBqLa_quickActions .iMBqLa_quickSegments {
  padding: 2px;
}

.iMBqLa_floating[data-compact-height="true"] .iMBqLa_quickActions .iMBqLa_quickSegments button {
  padding-inline: 2px;
  font-size: 11px;
}

.iMBqLa_floating[data-compact-height="true"] .iMBqLa_panelContent[data-size-detail="true"] > .iMBqLa_quickSpeed {
  display: none;
}

.iMBqLa_settingsBody {
  container-type: inline-size;
}

.iMBqLa_section > button {
  justify-self: start;
  max-width: 100%;
}

.iMBqLa_settingsBody button {
  white-space: normal;
  overflow-wrap: anywhere;
  height: auto;
  min-height: 36px;
}

.iMBqLa_settingsBody :is(.iMBqLa_actions, .iMBqLa_segmented, .iMBqLa_formActions) > button {
  flex: 0 auto;
}

.iMBqLa_inlineActions, .iMBqLa_inlineField, .iMBqLa_volumeRow, .iMBqLa_volumeControl {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.iMBqLa_inlineField {
  font-size: 12px;
}

.iMBqLa_inlineField .iMBqLa_deviceSelect {
  text-overflow: ellipsis;
  flex: 0 180px;
  width: 180px;
  max-width: 100%;
}

.iMBqLa_inlineField input[type="number"] {
  width: 80px;
}

.iMBqLa_fullName {
  color: var(--dsw-alias-label-secondary);
  min-width: 0;
  font-size: 12px;
}

.iMBqLa_fullName summary {
  padding: 2px 0;
  font-size: 12px;
  font-weight: 400;
}

.iMBqLa_fullName p {
  overflow-wrap: anywhere;
  margin-top: 4px;
}

.iMBqLa_disclosureRow {
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 8px;
  display: flex;
}

.iMBqLa_disclosureRow > details.iMBqLa_section {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  flex: 0 auto;
  min-width: 0;
  padding: 0 10px;
}

.iMBqLa_disclosureRow > details.iMBqLa_section > summary {
  min-height: 20px;
  padding: 7px 0;
}

.iMBqLa_disclosureRow > details[open].iMBqLa_section {
  flex: 100%;
  padding-bottom: 10px;
}

.iMBqLa_volumeControl {
  flex-wrap: nowrap;
  flex: 0 260px;
}

.iMBqLa_volumeControl input[type="range"] {
  width: 210px;
  min-width: 80px;
  max-width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
  flex: 210px;
}

.iMBqLa_volumeControl span {
  text-align: right;
  flex: none;
  min-width: 3em;
  font-size: 12px;
}

.iMBqLa_field:has( > input[type="number"]) {
  flex-wrap: wrap;
  align-items: center;
  display: flex;
}

.iMBqLa_field > input[type="number"] {
  width: 80px;
}

.iMBqLa_authorizationSteps {
  color: var(--dsw-alias-label-secondary);
  margin: 8px 0 12px;
  font-size: 12px;
}

.iMBqLa_agreement {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  gap: 14px;
  padding: 14px;
  font-size: 13px;
  line-height: 1.6;
  display: grid;
}

.iMBqLa_agreement p {
  margin: 0;
}

.iMBqLa_authorizationBody h3 {
  margin: 0 0 10px;
  font-size: 15px;
}

.iMBqLa_authorizationActions button {
  flex: 0 auto;
  min-height: 36px;
}

@container (width <= 340px) {
  .iMBqLa_inlineActions {
    align-items: flex-start;
  }

  .iMBqLa_inlineField .iMBqLa_deviceSelect {
    flex-basis: 160px;
    width: 160px;
  }

  .iMBqLa_volumeControl {
    flex-basis: 200px;
  }

  .iMBqLa_volumeControl input[type="range"] {
    width: 150px;
  }
}

.iMBqLa_audioDevices {
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  display: flex;
}

.iMBqLa_audioDeviceGrid {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 8px;
  display: grid;
}

.iMBqLa_audioDeviceField {
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  font-size: 12px;
  display: flex;
}

.iMBqLa_audioDeviceField > span {
  align-items: center;
  gap: 4px;
  line-height: 18px;
  display: flex;
}

.iMBqLa_audioDeviceField svg {
  flex: none;
  width: 14px;
  height: 14px;
}

.iMBqLa_audioDeviceField select {
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

.iMBqLa_audioDeviceField select[data-device-missing] {
  border-color: #b80;
}

.iMBqLa_audioDeviceHint, .iMBqLa_audioDeviceNotice {
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  font-size: 11px;
  line-height: 16px;
  overflow: hidden;
}

.iMBqLa_audioDeviceHint {
  color: var(--dsw-alias-label-secondary);
}

.iMBqLa_audioDeviceNotice {
  color: #805500;
}

[data-ds-dark-theme] .iMBqLa_audioDeviceNotice {
  color: #ffd277;
}

[data-ds-dark-theme] .iMBqLa_audioDeviceField select {
  color-scheme: dark;
}

.iMBqLa_floating[data-compact-height="true"] .iMBqLa_audioDeviceField > span {
  font-size: 11px;
  line-height: 14px;
}

.iMBqLa_floating[data-compact-height="true"] .iMBqLa_audioDeviceField select {
  height: 26px;
}

.iMBqLa_floating[data-compact-height="true"] .iMBqLa_audioDeviceHint, .iMBqLa_floating[data-compact-height="true"] .iMBqLa_audioDeviceNotice, .iMBqLa_floating[data-compact-height="true"] .iMBqLa_panelContent:has( > [data-home-important]) .iMBqLa_audioDeviceField > span {
  display: none;
}

.iMBqLa_pageHeading.iMBqLa_modelHeading {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  justify-content: flex-start;
  gap: 10px;
  min-height: 40px;
  margin-bottom: 6px;
  padding: 5px 12px;
}

.iMBqLa_modelHeading h3 {
  white-space: nowrap;
  font-size: 13px;
}

.iMBqLa_modelHeading .iMBqLa_modelNav {
  border: 0;
  flex: 1;
  gap: 3px;
  min-width: 0;
  margin: 0;
  padding: 0;
}

.iMBqLa_modelHeading .iMBqLa_modelNav button {
  white-space: nowrap;
  flex: 0 auto;
  height: 28px;
  min-height: 28px;
  padding: 0 6px;
}

.iMBqLa_currentModel {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  display: flex;
}

.iMBqLa_pathRow {
  grid-template-columns: 95px minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  font-size: 12px;
  display: grid;
}

.iMBqLa_pathRow > span {
  min-width: 0;
}

.iMBqLa_editNotice {
  margin-bottom: 7px;
  padding: 5px 8px;
}

.iMBqLa_editNotice span {
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
}

.iMBqLa_editNotice button {
  height: auto;
  min-height: 30px;
}

@media (width <= 360px) {
  .iMBqLa_pageHeading.iMBqLa_modelHeading {
    gap: 5px;
    padding: 5px 8px;
  }

  .iMBqLa_modelHeading .iMBqLa_modelNav button {
    padding: 0 3px;
    font-size: 11px;
  }

  .iMBqLa_pathRow {
    grid-template-columns: minmax(0, 1fr);
    gap: 4px;
  }
}

.iMBqLa_pathRow {
  display: block;
}

.iMBqLa_pathRow > div:first-child {
  flex-wrap: nowrap !important;
}

.iMBqLa_pathRow > div:first-child > label {
  flex: 1;
  grid-template-columns: 95px minmax(0, 1fr);
  display: grid !important;
}

.iMBqLa_pathRow input {
  width: 100% !important;
}

.iMBqLa_pathRow button {
  flex: none;
  min-height: 32px;
}

@media (width <= 420px) {
  .iMBqLa_pathRow > div:first-child {
    flex-wrap: wrap !important;
  }

  .iMBqLa_pathRow > div:first-child > label {
    grid-template-columns: 80px minmax(0, 1fr);
    min-width: 180px !important;
  }
}

.iMBqLa_floating :is(button, select, input, textarea, summary, a), .iMBqLa_settings :is(button, select, input, summary, a) {
  transition: background-color .12s ease-out,border-color .12s ease-out,color .12s ease-out,box-shadow .12s ease-out,transform var(--whale-duration, .2s) var(--whale-ease, ease-out);
}

.iMBqLa_floating :is(button, summary):hover:not(:disabled) {
  background-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,var(--dsw-alias-bg-layer-1));
}

.iMBqLa_floating button:active:not(:disabled), .iMBqLa_settings button:active:not(:disabled) {
  transform: scale(.97);
}

.iMBqLa_floating :is(input, select, textarea):hover:not(:disabled) {
  border-color: var(--dsw-alias-brand-primary);
}

.iMBqLa_radios label {
  transition: background-color .12s, border-color .12s, box-shadow .12s;
}

.iMBqLa_radios label:has(input:checked) {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,transparent);
}

.iMBqLa_authorizationBody, .iMBqLa_settingsLayout, .iMBqLa_panelContent > .iMBqLa_header, .iMBqLa_settingsBody > div:not([hidden]), .iMBqLa_section > div:not([hidden])[data-whale-tab-panel], .iMBqLa_floating [role="tabpanel"]:not([hidden]) {
  animation: iMBqLa_whalePageEnter var(--whale-duration, .2s) ease-out;
}

.iMBqLa_floating :is([role="menu"], [role="listbox"]), .iMBqLa_floating [data-whale-dropdown] {
  transform-origin: top;
  animation: .12s ease-out iMBqLa_whalePageEnter;
}

.iMBqLa_floating [data-whale-save-result] {
  animation: .16s ease-out iMBqLa_whaleFeedback;
}

.iMBqLa_floating summary {
  list-style: none;
}

.iMBqLa_floating summary::-webkit-details-marker {
  display: none;
}

.iMBqLa_floating summary:before {
  content: "\u203A";
  width: 1em;
  transition: transform .16s ease-out;
  display: inline-block;
  transform: rotate(0);
}

.iMBqLa_floating details[open] > summary:before {
  transform: rotate(90deg);
}

.iMBqLa_floating details[open] > :not(summary) {
  animation: .16s ease-out iMBqLa_whalePageEnter;
}

@supports (interpolate-size: allow-keywords) {
  .iMBqLa_floating details {
    interpolate-size: allow-keywords;
  }

  .iMBqLa_floating details::details-content {
    block-size: 0;
    transition: block-size .16s ease-out,content-visibility .16s allow-discrete;
    overflow: clip;
  }

  .iMBqLa_floating details[open]::details-content {
    block-size: auto;
  }
}

@keyframes iMBqLa_whalePageEnter {
  from {
    translate: 0 4px;
  }

  to {
    translate: 0;
  }
}

@keyframes iMBqLa_whaleFeedback {
  from {
    opacity: .5;
  }

  to {
    opacity: 1;
  }
}

[data-motion="firm"].iMBqLa_floating, [data-motion="firm"].iMBqLa_settings {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="firm"].iMBqLa_floating details::details-content, [data-motion="firm"].iMBqLa_floating summary:before {
  transition-duration: .1s;
}

[data-motion="off"].iMBqLa_floating *, [data-motion="off"].iMBqLa_settings *, [data-motion="off"].iMBqLa_floating :before, [data-motion="off"].iMBqLa_floating details::details-content {
  transition: none !important;
  animation: none !important;
}

[data-motion="off"].iMBqLa_floating button:active, [data-motion="off"].iMBqLa_settings button:active {
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .iMBqLa_floating *, .iMBqLa_settings *, .iMBqLa_floating :before, .iMBqLa_floating details::details-content {
    transition: none !important;
    animation: none !important;
  }

  .iMBqLa_floating button:active, .iMBqLa_settings button:active {
    transform: none;
  }
}

.iMBqLa_conversationChoice {
  gap: 6px;
  min-width: 0;
  display: grid;
  position: relative;
}

.iMBqLa_conversationChoice > button {
  text-align: left;
  justify-content: space-between;
  width: 100%;
  min-width: 0;
}

.iMBqLa_conversationOptions {
  overscroll-behavior: contain;
  gap: 3px;
  min-width: 0;
  max-height: 220px;
  padding: 6px;
  animation: .12s ease-out iMBqLa_whalePageEnter;
  display: grid;
  overflow: auto;
}

.iMBqLa_conversationOptions [role="option"] {
  text-align: left;
  border-radius: var(--dsw-radius-sm);
  justify-content: space-between;
  width: 100%;
  min-width: 0;
  padding: 7px 10px;
  transition: background-color .12s ease-out, color .12s ease-out;
}

.iMBqLa_conversationOptions [role="option"][aria-selected="true"] {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 18%,var(--dsw-alias-bg-layer-1));
  font-weight: 600;
}

.iMBqLa_conversationOptions [role="option"]:is(:hover, :focus-visible) {
  background: var(--dsw-alias-interactive-bg-active);
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: -2px;
}

.iMBqLa_conversationOptions [role="option"] small {
  color: var(--dsw-alias-label-secondary);
}

.iMBqLa_settings [data-whale-tab-panel]:not([hidden]) {
  animation: iMBqLa_whalePageEnter var(--whale-duration, .2s) ease-out;
}

.iMBqLa_modelHeading .iMBqLa_modelNav {
  scrollbar-width: thin;
  overflow-x: auto;
}

.iMBqLa_modelHeading .iMBqLa_modelNav button {
  flex-shrink: 0;
}

[data-motion="off"].iMBqLa_settings [data-whale-tab-panel] {
  animation: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .iMBqLa_settings [data-whale-tab-panel] {
    animation: none !important;
  }
}

.iMBqLa_panelContent, .iMBqLa_bubble {
  animation: none;
}

.iMBqLa_panelContent {
  height: auto;
}

.iMBqLa_panelContent[data-size-detail="true"] {
  height: 100%;
}

.iMBqLa_panelContent .iMBqLa_quickSegments {
  background: none;
  gap: 6px;
  padding: 0;
}

.iMBqLa_panelContent .iMBqLa_quickSegments button {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 8px;
  gap: 4px;
  height: 34px;
  min-height: 34px;
}

.iMBqLa_panelContent .iMBqLa_quickSegments button[aria-pressed="true"] {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 22%,var(--dsw-alias-bg-layer-1));
  box-shadow: inset 0 0 0 1px var(--dsw-alias-brand-primary);
}

.iMBqLa_panelContent .iMBqLa_quickSegments svg {
  width: 15px;
  height: 15px;
}

.iMBqLa_panelContent > .iMBqLa_quickConversation {
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

.iMBqLa_conversationHeader {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  font-size: 12px;
  display: flex;
}

.iMBqLa_conversationHeader > div {
  align-items: center;
  gap: 2px;
  display: flex;
}

.iMBqLa_conversationHeader button:not(.iMBqLa_iconButton), .iMBqLa_assistantName, .iMBqLa_loadHistory {
  color: inherit;
  font: inherit;
  cursor: pointer;
  background: none;
  border: 0;
  border-radius: 4px;
  padding: 3px;
}

.iMBqLa_conversationHeader .iMBqLa_iconButton {
  width: 26px;
  min-width: 26px;
  height: 28px;
}

.iMBqLa_historyScope {
  color: var(--dsw-alias-label-secondary);
  flex: none;
  margin: 2px 0;
  font-size: 10px;
  line-height: 14px;
}

.iMBqLa_quickConversation .iMBqLa_recentMessages {
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

.iMBqLa_message {
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

.iMBqLa_message[data-role="user"] {
  align-self: flex-end;
  align-items: flex-end;
}

.iMBqLa_messageName {
  min-height: 19px;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  line-height: 17px;
}

.iMBqLa_assistantName {
  overflow-wrap: anywhere;
  max-width: 100%;
  min-height: 19px;
  padding: 0 2px;
  font-size: 11px;
  line-height: 17px;
}

.iMBqLa_assistantName:hover {
  color: var(--dsw-alias-label-primary);
  text-underline-offset: 3px;
  text-decoration: underline;
}

.iMBqLa_assistantNameInput {
  box-sizing: border-box;
  width: 140px;
  min-width: 60px;
  max-width: 160px;
  height: 23px !important;
  min-height: 23px !important;
  padding: 1px 5px !important;
  font-size: 12px !important;
}

.iMBqLa_message p {
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

.iMBqLa_message[data-role="user"] p {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 28%,var(--dsw-alias-bg-layer-1));
  border-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 45%,var(--dsw-alias-border-l2));
}

.iMBqLa_message small {
  color: var(--dsw-alias-label-secondary);
  font-size: 10px;
}

.iMBqLa_loadHistory {
  align-self: center;
  padding: 5px;
  font-size: 11px;
}

.iMBqLa_newMessages {
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

.iMBqLa_bubble {
  gap: 6px;
  padding: 0 7px;
  font-size: 11px;
}

.iMBqLa_bubbleBrand {
  flex: none;
  font-size: 12px;
  font-weight: 600;
}

.iMBqLa_bubbleStatus {
  white-space: nowrap;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 3px;
  min-width: 0;
  display: flex;
}

.iMBqLa_bubbleStatus svg {
  flex: none;
  width: 15px;
  height: 15px;
}

.iMBqLa_bubble > svg:last-child {
  flex: none;
  width: 14px;
  height: 14px;
}

.iMBqLa_voiceBars {
  align-items: center;
  gap: 2px;
  height: 16px;
  display: flex;
}

.iMBqLa_voiceBars i {
  background: var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary));
  opacity: .5;
  border-radius: 1px;
  width: 3px;
  height: 13px;
  transform: scaleY(.31);
}

.iMBqLa_voiceBars[data-active="true"] i {
  background: var(--dsw-alias-brand-primary);
  opacity: 1;
  animation: .7s ease-in-out infinite alternate iMBqLa_whaleInputPulse;
}

.iMBqLa_voiceBars[data-active="true"] i:nth-child(2n) {
  animation-delay: -.3s;
}

.iMBqLa_voiceBars[data-active="true"] i:nth-child(3) {
  animation-delay: -.5s;
}

@keyframes iMBqLa_whaleInputPulse {
  from {
    transform: scaleY(.38);
  }

  to {
    transform: scaleY(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .iMBqLa_voiceBars[data-active="true"] i {
    animation: none;
    transform: scaleY(.69);
  }
}

.iMBqLa_floating[data-motion="off"] .iMBqLa_voiceBars[data-active="true"] i {
  animation: none;
  transform: scaleY(.69);
}

@media (forced-colors: active) {
  .iMBqLa_message p {
    border: 1px solid canvastext;
  }

  .iMBqLa_quickSegments button[aria-pressed="true"] {
    outline: 2px solid highlight;
  }

  .iMBqLa_voiceBars i {
    background: canvastext;
  }
}

.iMBqLa_voicePrompt {
  flex-direction: column;
  gap: 8px;
  display: flex;
}

.iMBqLa_voicePrompt label {
  font-size: 13px;
  font-weight: 600;
}

.iMBqLa_voicePrompt label span {
  margin-left: 10px;
  font-weight: 400;
}

.iMBqLa_voicePromptInput {
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

.iMBqLa_voicePromptInput::placeholder {
  color: var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary));
  opacity: 1;
}

.iMBqLa_voicePromptInput:disabled {
  opacity: .65;
  cursor: not-allowed;
}

.iMBqLa_voicePromptInput:focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: 2px;
}

.iMBqLa_voicePromptCount {
  text-align: right;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
}

.iMBqLa_voicePromptActions {
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  display: flex;
}

.iMBqLa_voicePromptActions .iMBqLa_actions {
  margin: 0;
}

.iMBqLa_voicePromptMode {
  color: var(--dsw-alias-state-success-primary, var(--dsw-alias-label-secondary));
  white-space: nowrap;
  font-size: 11px;
}

.iMBqLa_voicePromptMode:before {
  content: "\u2022";
  margin-right: 5px;
}
`};var re=require("react/jsx-runtime");function $n({small:e=!1,state:n="idle"}){return(0,re.jsx)("svg",{viewBox:"0 0 1024 1024","data-state":n,className:e?f.markSmall:f.mark,"aria-hidden":"true",children:(0,re.jsx)("path",{fill:"currentColor",d:"M 920.377 65.087 C 928.064 63.083 932.973 107.434 932.987 114.072 C 933.092 165.045 924.256 210.594 901.365 256.376 C 855.379 348.348 758.325 392.662 681.124 453.829 C 619.898 502.339 580.980 567.068 558.933 641.286 C 543.187 694.296 538.293 750.695 527.468 804.833 C 520.391 840.227 514.008 874.928 493.687 905.451 C 474.447 934.348 431.832 972.135 393.948 957.487 C 358.248 943.683 373.787 884.228 380.635 856.964 C 401.585 773.552 460.283 657.712 419.105 573.931 C 381.383 497.183 304.815 488.756 234.259 458.353 C 195.522 441.661 157.383 413.822 133.190 378.905 C 115.301 353.087 100.999 326.148 94.423 295.130 C 93.358 290.109 88.245 266.804 93.252 264.337 C 93.759 264.087 133.145 277.445 138.791 278.433 C 174.563 284.693 209.339 281.307 245.016 275.980 C 288.094 269.548 333.679 260.367 376.940 270.872 C 414.858 280.080 448.414 297.981 474.046 327.930 C 483.707 339.219 491.970 352.034 498.604 365.302 C 499.492 367.078 503.519 377.817 505.784 377.367 C 506.966 377.132 507.537 375.084 507.926 374.169 C 513.160 361.862 518.091 349.606 524.078 337.631 C 541.287 303.214 562.597 270.184 592.119 244.919 C 633.676 209.352 683.585 187.330 735.895 172.601 C 770.712 162.797 806.633 155.544 838.984 138.655 C 862.849 126.195 882.544 110.622 901.022 91.328 C 905.036 87.137 916.896 65.995 920.377 65.087 Z"})})}var ld=()=>({pet:(0,re.jsxs)(re.Fragment,{children:[(0,re.jsx)("path",{d:"M5 11c-2-8 4-10 7-8 5-2 9 2 7 8M5 10l4-4 3 3 3-3 4 4v5c0 4-3 6-7 6s-7-2-7-6v-5Z"}),(0,re.jsx)("path",{d:"M8 13v2m8-2v2m-6 3h4"})]}),settings:(0,re.jsxs)(re.Fragment,{children:[(0,re.jsx)("path",{d:"m9 3 1-1h4l1 1 .5 2 2 .8 2-.6 2 3-.8 1.8.2 2.2 1.3 1.5-2 3-2.1-.2-1.7 1.3-.5 2.2h-4l-.6-2.1-1.8-1.1-2 .3-2-3 1.3-1.7V10L4 8.5l2-3 2 .5L9 3Z"}),(0,re.jsx)("circle",{cx:"12",cy:"11.5",r:"3"})]}),minus:(0,re.jsx)("path",{d:"M5 12h14"}),plus:(0,re.jsx)("path",{d:"M12 5v14M5 12h14"}),down:(0,re.jsx)("path",{d:"m6 9 6 6 6-6"}),refresh:(0,re.jsxs)(re.Fragment,{children:[(0,re.jsx)("path",{d:"M20 6v5h-5M4 18v-5h5"}),(0,re.jsx)("path",{d:"M6 7a7 7 0 0 1 12-1l2 5M4 13l2 5a7 7 0 0 0 12-1"})]}),up:(0,re.jsx)("path",{d:"m6 15 6-6 6 6"}),check:(0,re.jsx)("path",{d:"m5 12 4 4L19 6"}),micOff:(0,re.jsx)(re.Fragment,{children:(0,re.jsx)("path",{d:"M9 9v3a3 3 0 0 0 5.1 2.1M15 8V6a3 3 0 0 0-5.7-1.3M6 10v2a6 6 0 0 0 10.2 4.3M18 12v-2M12 18v3M9 21h6M3 3l18 18"})}),mic:(0,re.jsxs)(re.Fragment,{children:[(0,re.jsx)("rect",{x:"9",y:"3",width:"6",height:"12",rx:"3"}),(0,re.jsx)("path",{d:"M6 10v2a6 6 0 0 0 12 0v-2M12 18v3M9 21h6"})]}),volume:(0,re.jsxs)(re.Fragment,{children:[(0,re.jsx)("path",{d:"M3 9h4l5-4v14l-5-4H3Z"}),(0,re.jsx)("path",{d:"M16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"})]}),chat:(0,re.jsx)("path",{d:"M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9l-5 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"}),close:(0,re.jsx)("path",{d:"m6 6 12 12M18 6 6 18"}),search:(0,re.jsxs)(re.Fragment,{children:[(0,re.jsx)("circle",{cx:"10",cy:"10",r:"6"}),(0,re.jsx)("path",{d:"m15 15 5 5"})]}),chevron:(0,re.jsx)("path",{d:"m9 5 7 7-7 7"}),warning:(0,re.jsxs)(re.Fragment,{children:[(0,re.jsx)("path",{d:"m12 3 10 18H2L12 3Z"}),(0,re.jsx)("path",{d:"M12 9v5m0 3v.2"})]})});function Ze({name:e,className:n=""}){return(0,re.jsx)("svg",{viewBox:"0 0 24 24",width:"18",height:"18","aria-hidden":"true",className:n,fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round",children:ld()[e]??ld().chat})}var Ne=require("react/jsx-runtime");function Bh({name:e,save:n,t}){let[o,i]=(0,Oe.useState)(!1),[r,s]=(0,Oe.useState)(e),c=(0,Oe.useRef)(!1),l=(0,Oe.useRef)(null),u=(0,Oe.useRef)(null),d=(0,Oe.useRef)(!1);(0,Oe.useLayoutEffect)(()=>{o?(l.current?.focus({preventScroll:!0}),l.current?.select()):d.current&&(d.current=!1,u.current?.focus({preventScroll:!0}))},[o]);let p=()=>{i(!1),s(e)},h=()=>{let m=r.trim();m&&m.length<=40&&(n?.(m),d.current=!0,i(!1))};return o?(0,Ne.jsx)(ar.Input,{ref:l,className:f.assistantNameInput,"aria-label":t("assistantName"),value:r,maxLength:40,"data-no-drag":!0,onChange:m=>s(m.target.value),onCompositionStart:()=>{c.current=!0},onCompositionEnd:()=>{c.current=!1},onBlur:p,onKeyDown:m=>{m.stopPropagation(),!(c.current||m.nativeEvent.isComposing)&&(m.key==="Escape"&&(m.preventDefault(),d.current=!0,p()),m.key==="Enter"&&(m.preventDefault(),h()))}}):(0,Ne.jsx)("button",{ref:u,type:"button",className:f.assistantName,"data-no-drag":!0,title:t("renameAssistant"),onClick:()=>{s(e),i(!0)},children:e})}function cd({conversation:e,history:n,historyLoading:t,historyError:o,historyRetryCursor:i,loadHistory:r,assistantName:s,setAssistantName:c,close:l,t:u}){let[d,p]=(0,Oe.useState)(!1),[h,m]=(0,Oe.useState)(0),v=(0,Oe.useRef)(null),g=(0,Oe.useRef)(!0),b=(0,Oe.useRef)(null),k=(0,Oe.useRef)(null),N=e.rootSessionId,D=Vu(n?.rootSessionId===N?n.items:[],e.items),P=!g.current&&b.current?.firstId,L=P?D.findIndex(S=>S.id===P):-1,I=d?D:L>=0?D.slice(L):Hu(D),q=()=>{let S=v.current;if(!S)return;let B=S.getBoundingClientRect(),E=[...S.querySelectorAll("[data-message-id]")].find(M=>M.getBoundingClientRect().bottom>=B.top);k.current=E?{id:E.dataset.messageId,offset:E.getBoundingClientRect().top-B.top}:null},z=()=>{let S=v.current;S&&(S.scrollTop=S.scrollHeight),g.current=!0,m(0),q()},w=!d&&D.filter(S=>S.role==="user").length<10&&!!n?.nextCursor;return(0,Oe.useEffect)(()=>{w&&!t&&!o&&r?.(n.nextCursor)},[w,n?.nextCursor,t,o,N]),(0,Oe.useLayoutEffect)(()=>{let S=v.current;if(!S)return;let B=b.current;if((!B||B.root!==N)&&(g.current=!0,m(0)),g.current)S.scrollTop=S.scrollHeight;else{let E=k.current,M=E&&[...S.querySelectorAll("[data-message-id]")].find(F=>F.dataset.messageId===E.id);if(M?S.scrollTop+=M.getBoundingClientRect().top-S.getBoundingClientRect().top-E.offset:B&&(S.scrollTop=Math.min(B.top,S.scrollHeight-S.clientHeight)),B){let F=e.items.filter(A=>A.at>=B.lastAt&&!B.ids.has(A.id)).length;F&&m(A=>A+F)}}b.current={root:N,firstId:I[0]?.id,top:S.scrollTop,lastAt:Math.max(0,...D.map(E=>E.at)),ids:new Set(D.map(E=>E.id))},q()},[e,n,d,h]),(0,Ne.jsxs)("section",{className:f.quickConversation,"data-dropdown":"conversation","data-no-drag":!0,role:"region","aria-label":u("recentConversation"),onKeyDown:S=>{S.key==="Escape"&&(S.stopPropagation(),l())},children:[(0,Ne.jsxs)("div",{className:f.conversationHeader,children:[(0,Ne.jsx)("strong",{children:u(d?"allRecords":"recentTenTurns")}),(0,Ne.jsxs)("div",{children:[(0,Ne.jsx)("button",{type:"button",onClick:()=>{d?(g.current=!0,k.current=null,b.current=null,m(0)):q(),p(S=>!S)},children:u(d?"collapseToTen":"showAllRecords")}),(0,Ne.jsx)(ar.Button,{className:f.iconButton,"aria-label":u("close"),title:u("collapseConversation"),onClick:l,children:(0,Ne.jsx)(Ze,{name:"up"})})]})]}),d&&(0,Ne.jsxs)("p",{className:f.historyScope,children:[u("currentVoiceRecords"),n?.truncated?" \xB7 "+u("historyTruncated"):""]}),(0,Ne.jsxs)("div",{ref:v,className:f.recentMessages,"data-conversation-messages":!0,tabIndex:0,"aria-label":u("conversationMessages"),onWheel:S=>{S.deltaY<0&&(g.current=!1)},onScroll:()=>{let S=v.current;g.current=ju(S),g.current&&m(0),b.current&&(b.current.top=S.scrollTop),q()},children:[d&&n?.nextCursor&&(0,Ne.jsx)("button",{className:f.loadHistory,disabled:t,onClick:()=>{q(),r?.(n.nextCursor)},children:u(t?"readingHistory":"loadEarlier")}),o&&(0,Ne.jsx)("button",{className:f.loadHistory,disabled:t,onClick:()=>{r?.(i??void 0)},children:u("retryHistory")}),I.map(S=>(0,Ne.jsxs)("div",{"data-message-id":S.id,"data-role":S.role,className:f.message,children:[(0,Ne.jsx)("div",{className:f.messageName,children:S.role==="user"?(0,Ne.jsx)("span",{children:u("you")}):(0,Ne.jsx)(Bh,{name:s,save:c,t:u})}),(0,Ne.jsx)("p",{children:S.text}),["speech-failed","interrupted"].includes(S.state)&&(0,Ne.jsx)("small",{children:u(S.state==="speech-failed"?"speechFailed":"speechInterrupted")})]},S.id)),!I.length&&(0,Ne.jsx)("p",{className:f.hint,children:u(t||w?"readingHistory":"noConversation")})]}),h>0&&(0,Ne.jsxs)("button",{className:f.newMessages,onClick:z,children:[(0,Ne.jsx)(Ze,{name:"down"}),h," ",u("newMessages")]})]})}var Gn=require("react"),qt=require("@deepseek-ai/dsh-client-ui-primitives"),ln=require("react/jsx-runtime");function po({label:e,value:n,onChange:t,kind:o,pickPath:i,sessionId:r,disabled:s,active:c=!0,scope:l,className:u,placeholder:d}){let[p,h]=(0,Gn.useState)(!1),[m,v]=(0,Gn.useState)(null),g=typeof n=="string"?n.split(/[\\/]/).filter(Boolean).at(-1)??n:"",b=(0,Gn.useRef)(null),k=(0,Gn.useRef)(null),N=()=>{b.current?.abort(),b.current=null,h(!1)};(0,Gn.useEffect)(()=>(N(),v(null),N),[r,s,c,l,n]);let D=async()=>{if(b.current||s||!c||!i)return;let P=new AbortController;b.current=P,h(!0),v(null);try{let L=await i(r,o,P.signal);b.current===P&&!P.signal.aborted&&!k.current?.closest("[hidden]")&&L!==null&&t(L)}catch(L){b.current===P&&!P.signal.aborted&&v(String(L?.message??L))}finally{b.current===P&&(b.current=null,h(!1))}};return(0,ln.jsxs)("div",{ref:k,className:u,"data-native-path":o,children:[(0,ln.jsxs)("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,minWidth:0},children:[(0,ln.jsxs)("label",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,minWidth:0},children:[e,(0,ln.jsx)(qt.Input,{"aria-label":e,title:n??"",value:g,placeholder:d,disabled:s,readOnly:!0,style:{width:190,maxWidth:"100%",minWidth:0,textOverflow:"ellipsis"}})]}),(0,ln.jsx)(qt.Button,{variant:"outline",disabled:s||!c||!i||p,onClick:()=>{D()},children:p?"\u7B49\u5F85\u9009\u62E9\u2026":o==="referenceAudio"||o==="campplus"?"\u9009\u62E9\u6587\u4EF6\u2026":"\u9009\u62E9\u6587\u4EF6\u5939\u2026"})]}),o==="campplus"&&n&&(0,ln.jsx)(qt.Button,{variant:"outline",disabled:s,onClick:()=>{N(),t("")},children:"\u6E05\u9664\u53EF\u9009\u6A21\u578B"}),p&&(0,ln.jsx)(qt.Button,{variant:"outline",onClick:N,children:"\u53D6\u6D88\u9009\u62E9"}),n&&(0,ln.jsxs)("details",{style:{fontSize:12,minWidth:0},children:[(0,ln.jsx)("summary",{children:"\u67E5\u770B\u5B8C\u6574\u8DEF\u5F84"}),(0,ln.jsx)("p",{style:{margin:"4px 0",overflowWrap:"anywhere"},children:n})]}),m&&(0,ln.jsx)("p",{role:"alert",children:m})]})}var zt=require("react");var Je=require("react/jsx-runtime"),mo=e=>e&&typeof e=="object"?`${e.backend}:${e.id}`:e==null?"":"__legacy";function ud({state:e,sessionId:n,run:t,t:o}){let i=(0,zt.useRef)({state:e,sessionId:n,run:t}),r=(0,zt.useRef)(void 0);i.current={state:e,sessionId:n,run:t},(0,zt.useEffect)(()=>{!e.settings||e.settingsFor!==n||e.busy||e.audioDevicesPending||r.current===n||(r.current=n,t(n,"read-audio-devices"))},[n,e.settingsFor,e.busy,e.audioDevicesPending]),(0,zt.useEffect)(()=>{let h=!1,m,v=async()=>{let g=i.current;!h&&g.sessionId===n&&!g.state.busy&&!document.hidden&&(g.state.settingsFor!==n&&await g.run(n,"read-settings"),h||await g.run(n,"read-audio-devices")),h||(m=document.defaultView.setTimeout(v,1e4))};return v(),()=>{h=!0,document.defaultView.clearTimeout(m)}},[n]);let s=!!(e.settings&&e.settingsFor===n),c=s?e.settings:null,l=c?.audioDevices??{input:c?.values?.device??null,output:null},u=e.audioDevicesFor===n?e.audioDevices:null,d=e.checkedFor===n&&!e.uncertain&&e.status?.enabled===!1&&e.status?.ownerSessionId===null&&e.status?.voiceControlBusy===!1&&e.status?.voiceSession?.fullyStopped===!0&&e.status?.voiceSession?.id==null,p=[];return(0,Je.jsxs)("section",{className:f.audioDevices,"aria-label":o("audioDevices"),"data-audio-device-controls":!0,"data-no-drag":!0,children:[(0,Je.jsx)("div",{className:f.audioDeviceGrid,children:["input","output"].map(h=>{let m=l[h],v=u?.[h],g=mo(m),b=v?.items?.some(L=>mo(L)===g),k=m&&typeof m=="object"&&v&&v.status!=="unavailable"&&!b,N=m==null?o("audioSystemDefault"):typeof m=="object"?m.name:String(m),D=h==="output"&&v?.reason==="AUDIO_PLATFORM_UNSUPPORTED",P=!s||e.busy||e.uncertain||e.settingsConflict||D||h==="input"&&!d;return k&&p.push(o(h==="input"?"inputDeviceMissing":"outputDeviceMissing")),(0,Je.jsxs)("label",{className:f.audioDeviceField,children:[(0,Je.jsxs)("span",{children:[(0,Je.jsx)(Ze,{name:h==="input"?"mic":"volume"}),o(h==="input"?"audioInput":"audioOutput")]}),(0,Je.jsxs)("select",{"aria-label":o(h==="input"?"audioInput":"audioOutput"),"data-device-missing":k||void 0,title:P&&h==="input"&&!d?o("inputDeviceStopFirst"):D?o("outputDeviceUnsupported"):N,disabled:P,value:g,onFocus:()=>{e.audioDevicesPending||t(n,"read-audio-devices")},onChange:L=>{let I=L.target.value;if(I==="__legacy"||I===g)return;let q=I===""?null:v?.items?.find(z=>mo(z)===I);q!==void 0&&t(n,"save-audio-device",{revision:c.revision,direction:h,selection:q})},children:[(0,Je.jsx)("option",{value:"",children:o("audioSystemDefault")}),m!=null&&!b&&(0,Je.jsxs)("option",{value:g,children:[N,k?" \xB7 "+o("deviceDisconnected"):typeof m=="object"?"":" \xB7 "+o("deviceSaved")]}),v?.items?.map(L=>(0,Je.jsx)("option",{value:mo(L),children:L.name},mo(L)))]})]},h)})}),p.length>0?(0,Je.jsx)("p",{className:f.audioDeviceNotice,role:"status",children:p.join("\uFF1B")}):e.audioDevicesError||u?.input?.status==="unavailable"||u?.output?.status==="unavailable"&&u?.output?.reason!=="AUDIO_PLATFORM_UNSUPPORTED"?(0,Je.jsx)("p",{className:f.audioDeviceHint,role:"status",children:o("deviceListRetry")}):u?.output?.reason==="AUDIO_PLATFORM_UNSUPPORTED"?(0,Je.jsx)("p",{className:f.audioDeviceHint,children:o("outputDeviceUnsupported")}):!d&&s?(0,Je.jsx)("p",{className:f.audioDeviceHint,children:o("inputDeviceStopFirst")}):null]})}var ze=require("react"),wn=require("@deepseek-ai/dsh-client-ui-primitives");var le=require("react/jsx-runtime"),qh={busy:"\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F",archived:"\u4F1A\u8BDD\u5DF2\u5F52\u6863",unavailable:"\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528"},Ct=e=>e.title?.trim()||`\u672A\u547D\u540D\u4F1A\u8BDD \xB7 ${e.sessionId.slice(-6).toUpperCase()}`,fo=e=>qh[e.availability],Mn=e=>["ready","busy"].includes(e?.availability),dd=(e,n)=>e.checkedFor===n&&!e.uncertain&&!e.busy&&!e.ttsCancelling&&!e.existingSessionWritePending&&!e.existingSessionUnconfirmed&&e.status?.voiceControlBusy===!1&&e.status?.voiceSession?.fullyStopped===!0&&e.status?.enabled===!1;function pd({sessionId:e,expectedSessionId:n,state:t,controlContext:o,listExistingVoiceSessions:i,setExistingVoiceSession:r,readState:s,run:c,t:l}){let[u,d]=(0,ze.useState)(null),[p,h]=(0,ze.useState)(!1),[m,v]=(0,ze.useState)(!1),g=(0,ze.useRef)(null),b=(0,ze.useId)(),k=P=>dd(P,e)&&Object.hasOwn(P.status,"existingVoiceSession")&&(P.status.existingVoiceSession?.sessionId??null)===n,N=()=>o.currentConversation()===e&&o.sourceFor(e)===e;(0,ze.useEffect)(()=>{let P=new AbortController;return g.current={signal:P.signal,choosing:!1},i({sessionId:e},P.signal).then(L=>{if(!(P.signal.aborted||!N())){if((L.binding?.sessionId??null)!==n){c(e,"status");return}d(L.items.find(I=>I.sessionId===e)??null)}}).catch(()=>{}),()=>P.abort()},[e,n,o,i]);let D=async()=>{let P=g.current;if(!(!P||P.signal.aborted||P.choosing||!N())&&!(!k(s())||e===n)){P.choosing=!0,h(!0),v(!1);try{let L=await i({sessionId:e},P.signal);if(P.signal.aborted||!N())return;let I=L.items.find(z=>z.sessionId===e),q=(L.binding?.sessionId??null)!==n;if(q||!Mn(I)){d(I??null),v(!0),q&&c(e,"status");return}if(!k(s()))return;await r({sessionId:e,expectedSessionId:n})}catch{P.signal.aborted||v(!0)}finally{P.choosing=!1,P.signal.aborted||h(!1)}}};return!Mn(u)&&!m?null:(0,le.jsxs)("div",{className:f.currentDshTarget,"data-whale-current-target":!0,"data-no-drag":!0,children:[Mn(u)&&(0,le.jsxs)(wn.Button,{variant:"outline",className:f.currentDshAction,"data-whale-operation":"bind-current-session","aria-label":l("chooseCurrentDshTarget"),"aria-describedby":b,disabled:!k(t)||p,onClick:()=>{D()},children:[(0,le.jsx)("span",{children:l(p?"savingCurrentDshTarget":"chooseCurrentDshTarget")}),(0,le.jsx)("span",{id:b,className:f.ellipsis,title:Ct(u),children:Ct(u)})]}),m&&(0,le.jsx)("p",{role:"alert",className:f.hint,children:l("currentDshTargetError")})]})}function md({state:e,sessionId:n,listExistingVoiceSessions:t,setExistingVoiceSession:o,openExistingVoiceSession:i,showHome:r}){let[s,c]=(0,ze.useState)(null),[l,u]=(0,ze.useState)(!1),[d,p]=(0,ze.useState)(""),[h,m]=(0,ze.useState)(null),[v,g]=(0,ze.useState)(!1),[b,k]=(0,ze.useState)(!1),[N,D]=(0,ze.useState)(null),P=(0,ze.useRef)(null),L=(0,ze.useRef)(!1),I=(0,ze.useId)(),q=e.status,z=Object.hasOwn(q??{},"existingVoiceSession")?q.existingVoiceSession:s?.binding,w=q?.existingVoiceSessionSupported!==!1,S=dd(e,n),B=e.existingSessionWritePending,E=s?.items.find(H=>H.sessionId===h),M=S&&!v&&!!z,F=S&&w&&!v&&!b&&!!s,A=(0,ze.useCallback)(async(H="",X)=>{P.current?.abort();let ge=new AbortController;P.current=ge,g(!0),k(!1);try{let ae=await t({...H?{query:H}:{},...X?{cursor:X}:{}},ge.signal);if(ge.signal.aborted)return;c(ee=>({...ae,query:H,items:X&&ee?[...new Map([...ee.items,...ae.items].map(G=>[G.sessionId,G])).values()]:ae.items}))}catch{ge.signal.aborted||k(!0)}finally{P.current===ge&&(P.current=null,g(!1))}},[t]);(0,ze.useEffect)(()=>(L.current=!0,w?A():g(!1),()=>{L.current=!1,P.current?.abort(),P.current=null}),[A,w]);let V=H=>{H.preventDefault(),m(null),D(null),A(d.trim())},U=async H=>{if(!(!(H===null?M:F)||H===(z?.sessionId??null))){D(null);try{let{binding:X}=await o({sessionId:H,expectedSessionId:z?.sessionId??null});if(!L.current)return;c(ge=>ge&&{...ge,binding:X}),u(!1),m(null),p(""),D({text:X?"\u5DF2\u7ED1\u5B9A\u3002\u70B9\u51FB\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u540E\u5373\u53EF\u7EE7\u7EED\u8BE5\u4F1A\u8BDD\u3002":"\u5DF2\u89E3\u9664\uFF0C\u4E0B\u4E00\u6B21\u5F00\u59CB\u5BF9\u8BDD\u5C06\u4F7F\u7528\u9C7C\u5E94\u4F1A\u8BDD\u3002"}),w&&A()}catch(X){if(!L.current)return;D({error:!0,text:typeof X?.message=="string"&&X.message?X.message.split(`
`)[0].slice(0,160):"\u4F1A\u8BDD\u7ED1\u5B9A\u672A\u786E\u8BA4\uFF0C\u8BF7\u6838\u5BF9\u5F53\u524D\u7ED1\u5B9A\u3002"}),m(null),w&&A(l?d.trim():"")}}};return(0,le.jsxs)("section",{className:f.section,"data-whale-existing-session":!0,children:[(0,le.jsx)("h3",{children:"\u8BED\u97F3\u5BF9\u8BDD\u76EE\u6807"}),(0,le.jsxs)("div",{className:f.existingSessionTarget,children:[(0,le.jsx)("strong",{className:f.sessionTitle,children:z?Ct(z):"\u9C7C\u5E94\u4F1A\u8BDD"}),(0,le.jsx)("p",{className:f.hint,children:z?"\u8BED\u97F3\u548C\u56DE\u7B54\u5199\u5165\u6B64\u4F1A\u8BDD\uFF0C\u9C7C\u5E94\u4EC5\u5728\u672C\u673A\u64AD\u62A5\u3002\u5176\u4ED6\u63D2\u4EF6\u7684\u8F6C\u53D1\u7531\u5176\u8BBE\u7F6E\u51B3\u5B9A\u3002":"\u53EF\u7ED1\u5B9A\u5DF2\u6709 DSH \u4F1A\u8BDD\uFF0C\u6CBF\u7528\u539F\u6765\u7684\u4E0A\u4E0B\u6587\u548C\u5386\u53F2\u3002"}),z&&fo(z)&&(0,le.jsxs)("p",{role:"status",className:f.notice,children:[fo(z),"\u3002\u53EF\u89E3\u9664\u7ED1\u5B9A\u6216\u9009\u62E9\u5176\u4ED6\u4F1A\u8BDD\u3002"]}),!w&&(0,le.jsx)("p",{role:"status",className:f.notice,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u4E0D\u652F\u6301\u7ED1\u5B9A\u5DF2\u6709\u4F1A\u8BDD\u3002"}),q?.enabled&&(0,le.jsx)("p",{className:f.hint,children:"\u7ED3\u675F\u8BED\u97F3\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u7ED1\u5B9A\u3002"})]}),(0,le.jsxs)("div",{className:f.actions,children:[(0,le.jsx)(wn.Button,{variant:"outline","aria-expanded":l,disabled:!w||B,onClick:()=>{u(!l),m(null),p(""),l||A()},children:l?"\u5173\u95ED\u4F1A\u8BDD\u5217\u8868":z?"\u66F4\u6362\u7ED1\u5B9A":"\u9009\u62E9\u5DF2\u6709\u4F1A\u8BDD"}),Mn(z)&&i&&(0,le.jsx)(wn.Button,{variant:"outline","data-whale-operation":"open-native-session",onClick:async()=>{D(null);try{await i(z.sessionId),await r?.()}catch{L.current&&D({error:!0,text:"DSH \u6682\u65F6\u65E0\u6CD5\u6253\u5F00\u539F\u4F1A\u8BDD\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"})}},children:"\u6253\u5F00\u539F\u4F1A\u8BDD"}),z&&(0,le.jsx)(wn.Button,{variant:"outline","data-whale-operation":"unbind-existing-session",disabled:!M,onClick:()=>{U(null)},children:"\u89E3\u9664\u7ED1\u5B9A"})]}),l&&(0,le.jsxs)("div",{className:f.existingSessionPicker,"aria-busy":v,children:[(0,le.jsxs)("form",{className:f.existingSessionSearch,onSubmit:V,children:[(0,le.jsx)(wn.Input,{type:"search","aria-label":"\u641C\u7D22\u4F1A\u8BDD\u6807\u9898\u6216 ID",placeholder:"\u641C\u7D22\u4F1A\u8BDD\u6807\u9898\u6216 ID",value:d,maxLength:128,disabled:B,onChange:H=>p(H.target.value)}),(0,le.jsx)(wn.Button,{type:"submit",variant:"outline",disabled:B,children:"\u641C\u7D22"})]}),s?.items.length>0&&(0,le.jsx)("ul",{className:f.existingSessionList,"aria-label":"\u5DF2\u6709 DSH \u4F1A\u8BDD",children:s.items.map(H=>{let X=z?.sessionId===H.sessionId;return(0,le.jsx)("li",{children:(0,le.jsxs)("label",{title:H.sessionId,children:[(0,le.jsx)("input",{type:"radio",name:I,value:H.sessionId,checked:h===H.sessionId,disabled:!!(X||!Mn(H)||v||B),onChange:()=>{m(H.sessionId),D(null)}}),(0,le.jsxs)("span",{children:[(0,le.jsx)("strong",{className:f.sessionTitle,children:Ct(H)}),(0,le.jsxs)("span",{className:f.hint,children:[X?"\u5F53\u524D\u7ED1\u5B9A \xB7 ":"",fo(H)??"\u53EF\u7528"," \xB7 ",H.sessionId]})]})]})},H.sessionId)})}),!v&&!b&&s?.items.length===0&&(0,le.jsx)("p",{role:"status",className:f.hint,children:s.query?"\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684\u4F1A\u8BDD\u3002":"\u6682\u65E0\u53EF\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u3002"}),E&&(0,le.jsx)("p",{id:I+"-tts",className:f.hint,children:"\u4F7F\u7528\u5728\u7EBF\u97F3\u8272\u65F6\uFF0C\u56DE\u7B54\u6587\u5B57\u4F1A\u4EA4\u7ED9\u5DF2\u6388\u6743\u7684\u8BED\u97F3\u5408\u6210\u670D\u52A1\u3002\u82E5\u8981\u79BB\u7EBF\u6717\u8BFB\uFF0C\u53EF\u5728\u300C\u6A21\u578B \u2192 \u6717\u8BFB\u65B9\u5F0F\u300D\u9009\u7528\u672C\u5730\u97F3\u8272\u3002"}),(0,le.jsxs)("div",{className:f.actions,children:[(0,le.jsx)(wn.Button,{variant:"primary","data-whale-operation":"bind-existing-session","aria-describedby":E?I+"-tts":void 0,disabled:!F||!Mn(E)||E.sessionId===z?.sessionId,onClick:()=>{U(h)},children:B?"\u6B63\u5728\u4FDD\u5B58\u2026":"\u7ED1\u5B9A\u9009\u4E2D\u4F1A\u8BDD"}),!!s?.nextCursor&&(0,le.jsx)(wn.Button,{variant:"outline",disabled:v||B,onClick:()=>{A(s.query,s.nextCursor)},children:"\u52A0\u8F7D\u66F4\u591A"})]})]}),v&&(0,le.jsx)("p",{role:"status",className:f.hint,children:"\u6B63\u5728\u8BFB\u53D6 DSH \u4F1A\u8BDD\u2026"}),b&&(0,le.jsxs)("div",{role:"alert",className:f.notice,children:["\u65E0\u6CD5\u8BFB\u53D6 DSH \u4F1A\u8BDD\u3002 ",(0,le.jsx)(wn.Button,{variant:"outline",disabled:B,onClick:()=>{A(d.trim())},children:"\u91CD\u8BD5\u8BFB\u53D6"})]}),N&&(0,le.jsx)("p",{role:N.error?"alert":"status",className:N.error?f.notice:f.hint,children:N.text})]})}var Pt=require("react"),Lt=require("@deepseek-ai/dsh-client-ui-primitives");var cr="dsh-fish-voice";var Ii={name:"Emikosama",url:"https://github.com/Emikosama"};var fd="https://github.com/Emikosama/dsh-fish-voice",Di={url:"https://github.com/Emikosama/dsh-fish-voice/issues"};var _e=require("react/jsx-runtime");function hd(e,n){let t=e.updates;return e.updatePending==="install"?n("update_installing"):e.updatePending==="check"?n("update_checking"):e.updatesUnavailable?n("updateConnection"):t?t.message||n("update_"+t.status):n("update_idle")}function gd({state:e,open:n,t}){let o=e.updates,i=!e.updatesUnavailable&&(o?.release||["restart-required","enable-required","installed"].includes(o?.status));return(0,_e.jsxs)("section",{className:f.section,"data-whale-update-settings":!0,children:[(0,_e.jsx)("h3",{children:t("updateTitle")}),o&&(0,_e.jsxs)("p",{className:f.hint,children:[t("updateCurrentVersion")," ",o.currentVersion," \xB7 ",t("updateChannel_"+o.channel)]}),(0,_e.jsx)("p",{children:hd(e,t)}),(0,_e.jsxs)("div",{className:f.actions,children:[i&&(0,_e.jsx)(Lt.Button,{variant:"outline",onClick:()=>n(!1),children:t("updateDetails")}),(0,_e.jsx)(Lt.Button,{variant:"outline",disabled:!!e.updatePending||!e.updatesUnavailable&&o?.status==="installing",onClick:()=>n(!0),children:t("updateCheck")}),(0,_e.jsx)("a",{href:Di.url,"data-whale-operation":"open-feedback",target:"_blank",rel:"noreferrer noopener",children:t("updateFeedback")})]})]})}function vd({state:e,close:n,run:t,t:o}){let i=(0,Pt.useRef)(null),r=(0,Pt.useId)();(0,Pt.useLayoutEffect)(()=>{let m=i.current;return typeof m.showModal=="function"?m.showModal():m.setAttribute("open",""),()=>{m.open&&m.close?.()}},[]);let s=e.updates,c=s?.release,l=!!e.updatePending||!e.updatesUnavailable&&["checking","installing"].includes(s?.status),u=!e.updatesUnavailable&&!l&&s?.canInstall&&c,d=!l&&(e.updatesUnavailable||!["restart-required","enable-required"].includes(s?.status)),p=!e.updatesUnavailable&&["available","incompatible"].includes(s?.status),h=u&&!s.message?null:hd(e,o);return(0,_e.jsxs)("dialog",{ref:i,className:f.updateDialog,"data-whale-update-dialog":!0,"data-no-drag":!0,"aria-labelledby":r,onCancel:m=>{m.preventDefault(),n()},onKeyDown:m=>m.stopPropagation(),children:[(0,_e.jsxs)("header",{className:f.updateHeader,children:[(0,_e.jsx)($n,{}),(0,_e.jsx)("h2",{id:r,children:o(p?"updateOfferTitle":"updateTitle")})]}),s&&(0,_e.jsxs)("p",{className:f.hint,children:[o("updateCurrentVersion")," ",s.currentVersion,c&&c.version!==s.currentVersion&&(0,_e.jsxs)(_e.Fragment,{children:[" \xB7 ",o("updateNewVersion")," ",c.version]})," \xB7 ",o("updateChannel_"+s.channel)]}),c?.announcement&&(0,_e.jsx)("p",{className:f.updateAnnouncement,children:c.announcement}),h&&(0,_e.jsx)("p",{className:f.hint,role:"status",children:h}),(0,_e.jsxs)("div",{className:f.actions,children:[(0,_e.jsx)(Lt.Button,{variant:"outline",onClick:n,children:o(p?"updateLater":"close")}),u&&(0,_e.jsx)(Lt.Button,{variant:"primary",className:f.primary,onClick:()=>{t({action:"install",version:c.version})},children:o("updateInstall")}),!u&&d&&(0,_e.jsx)(Lt.Button,{variant:"outline",onClick:()=>{t({action:"check"})},children:o("updateCheck")})]}),(0,_e.jsxs)("footer",{className:f.actions,children:[c?.url?.startsWith("https://")&&(0,_e.jsx)("a",{href:c.url,target:"_blank",rel:"noreferrer noopener",children:o("updateRelease")}),(0,_e.jsx)("a",{href:Di.url,"data-whale-operation":"open-feedback",target:"_blank",rel:"noreferrer noopener",children:o("updateFeedback")})]})]})}var zh=new Map([["audio","settings-audio"],["interaction","settings-interaction"],["prompt","settings-prompt"],["models","settings-models"],["advanced","settings-advanced"],["pets","settings-pets"],["repair","page-repair"],["sessions","page-session-management"]]);function Ch(e){if(e.nativeEvent?.isTrusted!==!0)return null;let n=e.target;if(!n?.closest)return null;let t=n.closest("[data-whale-operation-log]");return t&&!(e.type==="click"&&n.closest("summary")?.parentElement===t)?null:n}function bd(e){let n=Ch(e);if(!n)return null;if(e.type==="submit")return"commit-form";if(e.type==="keydown")return e.key==="Escape"?"dismiss":["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key)&&n.closest('[data-settings-nav], [role="listbox"]')?"keyboard-navigation":null;if(e.type==="change")return n.matches('input[type="radio"]')&&["listen-mode-ptt","listen-mode-always","listen-mode-wake"].includes(n.dataset.whaleOperation)?n.dataset.whaleOperation:n.closest("[data-audio-device-controls] select")?"change-audio-device":n.matches('select, input[type="radio"], input[type="checkbox"]')?"edit-choice":null;if(e.type!=="click")return null;let t=n.closest("button, a[href], summary");if(!t||t.type==="submit"&&t.form)return null;let o=t.dataset.whaleOperation;return o==="open-feedback"&&t.matches("summary")&&t.parentElement.open?"dismiss":t.matches("summary")&&["session-history","subagent-history"].includes(o)?o+(t.parentElement.open?"-close":"-open"):o||(t.hasAttribute("data-settings-tab")?zh.get(t.dataset.settingsTab)??"page-settings-tab":t.closest("[data-whale-session-management], [data-whale-existing-session]")?"manage-session":t.closest("[data-settings-page-heading] nav")?"page-model-tab":t.matches("summary")?"details-toggle":"activate-control")}var Tn=require("react"),$i=require("@deepseek-ai/dsh-client-ui-primitives");var Ge=require("react/jsx-runtime"),Lh="fish-voice-operation-log.log",yd=256*1024,Ph=(e,n)=>(e+n).slice(-yd);function _d({readOperationLog:e}){let[n,t]=(0,Tn.useState)(!1),[o,i]=(0,Tn.useState)(!1),[r,s]=(0,Tn.useState)(null),[c,l]=(0,Tn.useState)(null),u=(0,Tn.useRef)(null);if((0,Tn.useEffect)(()=>()=>u.current?.abort(),[]),!e)return null;let d=async h=>{if(u.current)return;let m=new AbortController;u.current=m,i(!0),l(null);try{let v=await e(m.signal);if(m.signal.aborted)return;if(h){let g=URL.createObjectURL(new Blob(v,{type:"text/plain;charset=utf-8"})),b=document.createElement("a");b.href=g,b.download=Lh,Ah(b),setTimeout(()=>URL.revokeObjectURL(g),1e3),l("\u5DF2\u8BF7\u6C42\u4FDD\u5B58\u8BCA\u65AD\u65E5\u5FD7\u3002")}else s({text:v.reduce(Ph,""),shortened:v.reduce((g,b)=>g+b.length,0)>yd})}catch{m.signal.aborted||l("\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u8BCA\u65AD\u65E5\u5FD7\uFF0C\u8BF7\u91CD\u8BD5\u3002")}finally{u.current===m&&(u.current=null),m.signal.aborted||i(!1)}},p=h=>{let m=h.currentTarget.open;t(m),m||(u.current?.abort(),u.current=null,i(!1),s(null),l(null))};return(0,Ge.jsxs)("details",{className:f.section,"data-whale-operation-log":!0,open:n,onToggle:p,children:[(0,Ge.jsx)("summary",{"data-whale-operation":"open-feedback",children:"\u6392\u67E5\u4E0E\u53CD\u9988"}),n&&(0,Ge.jsxs)(Ge.Fragment,{children:[(0,Ge.jsx)("p",{className:f.hint,children:"\u6700\u8FD1\u4E03\u5929\u7684\u64CD\u4F5C\u65E5\u5FD7\u3002\u53EF\u5148\u67E5\u770B\uFF0C\u518D\u81EA\u884C\u51B3\u5B9A\u662F\u5426\u968F\u53CD\u9988\u63D0\u4EA4\u3002"}),(0,Ge.jsxs)("div",{className:f.actions,children:[(0,Ge.jsx)($i.Button,{variant:"outline",disabled:o,onClick:()=>{d(!1)},children:"\u67E5\u770B\u8BCA\u65AD\u65E5\u5FD7"}),(0,Ge.jsx)($i.Button,{variant:"outline",disabled:o,onClick:()=>{d(!0)},children:"\u4FDD\u5B58\u8BCA\u65AD\u65E5\u5FD7"})]}),o&&(0,Ge.jsx)("p",{role:"status",className:f.hint,children:"\u6B63\u5728\u8BFB\u53D6\u8BCA\u65AD\u65E5\u5FD7\u2026"}),c&&(0,Ge.jsx)("p",{role:"status",className:f.hint,children:c}),r?.shortened&&(0,Ge.jsx)("p",{className:f.hint,children:"\u8FD9\u91CC\u53EA\u663E\u793A\u6700\u8FD1\u4E00\u6BB5\uFF0C\u4FDD\u5B58\u53EF\u53D6\u5F97\u5B8C\u6574\u65E5\u5FD7\u3002"}),r&&(0,Ge.jsx)("pre",{className:f.requestDetails,tabIndex:0,"aria-label":"\u64CD\u4F5C\u65E5\u5FD7\u9884\u89C8",children:r.text||"\u6682\u65E0\u64CD\u4F5C\u65E5\u5FD7\u3002"})]})]})}function Ah(e){document.body.append(e);try{e.click()}finally{e.remove()}}var O=require("react"),W=require("@deepseek-ai/dsh-client-ui-primitives");var de=require("react"),ce=require("@deepseek-ai/dsh-client-ui-primitives");var Z={field:"_1DvNuq_field",jobHeading:"_1DvNuq_jobHeading",currentModel:"_1DvNuq_currentModel",wizard:"_1DvNuq_wizard",switcher:"_1DvNuq_switcher",fullName:"_1DvNuq_fullName",modelChoices:"_1DvNuq_modelChoices",header:"_1DvNuq_header",sourceChoices:"_1DvNuq_sourceChoices",installHistory:"_1DvNuq_installHistory",note:"_1DvNuq_note",installPath:"_1DvNuq_installPath",details:"_1DvNuq_details",badge:"_1DvNuq_badge",choice:"_1DvNuq_choice",inlineField:"_1DvNuq_inlineField",section:"_1DvNuq_section",actions:"_1DvNuq_actions",job:"_1DvNuq_job",plan:"_1DvNuq_plan",setupEnter:"_1DvNuq_setupEnter",switchRow:"_1DvNuq_switchRow",jobs:"_1DvNuq_jobs",wizardBodyContent:"_1DvNuq_wizardBodyContent",selectedModel:"_1DvNuq_selectedModel",wizardBody:"_1DvNuq_wizardBody",hint:"_1DvNuq_hint",primary:"_1DvNuq_primary",hardwareSummary:"_1DvNuq_hardwareSummary",modelInstaller:"_1DvNuq_modelInstaller",consentActions:"_1DvNuq_consentActions",choices:"_1DvNuq_choices",text:`._1DvNuq_section {
  min-width: 0;
  color: var(--dsw-alias-label-primary);
  gap: 8px;
  display: grid;
}

._1DvNuq_section h3, ._1DvNuq_wizard h2, ._1DvNuq_plan h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
}

._1DvNuq_section p, ._1DvNuq_wizard p {
  margin: 0;
  line-height: 1.6;
}

._1DvNuq_hint, ._1DvNuq_section small, ._1DvNuq_wizard small {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 1.6;
}

._1DvNuq_note {
  border-left: 2px solid var(--dsw-alias-state-warn-primary);
  background: var(--dsw-alias-bg-layer-2);
  padding: 8px 12px;
  font-size: 12px;
}

._1DvNuq_actions, ._1DvNuq_header {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  display: flex;
}

._1DvNuq_header {
  justify-content: space-between;
  align-items: flex-start;
}

._1DvNuq_choices {
  border: 0;
  gap: 8px;
  min-width: 0;
  margin: 0;
  padding: 0;
  display: grid;
}

._1DvNuq_choices legend {
  color: var(--dsw-alias-label-secondary);
  padding: 0 0 8px;
  font-size: 12px;
}

._1DvNuq_choice {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  cursor: pointer;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 10px;
  display: flex;
}

._1DvNuq_choice[data-selected="true"] {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,var(--dsw-alias-bg-layer-1));
}

._1DvNuq_choice input {
  accent-color: var(--dsw-alias-brand-primary);
  margin: 4px 0 0;
}

._1DvNuq_choice span {
  min-width: 0;
}

._1DvNuq_choice small, ._1DvNuq_plan small {
  overflow-wrap: anywhere;
  display: block;
}

._1DvNuq_choice strong {
  font-size: 13px;
}

._1DvNuq_field {
  gap: 6px;
  font-size: 12px;
  display: grid;
}

._1DvNuq_field input, ._1DvNuq_field select {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}

._1DvNuq_field select {
  font: inherit;
  color: inherit;
  background: var(--dsw-alias-bg-layer-2);
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  padding: 8px;
}

._1DvNuq_details {
  border-top: 1px solid var(--dsw-alias-border-l2);
  min-width: 0;
  padding-top: 12px;
}

._1DvNuq_details summary {
  cursor: pointer;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

._1DvNuq_details[open] > summary {
  margin-bottom: 12px;
}

._1DvNuq_badge {
  border-radius: var(--dsw-radius-sm);
  color: var(--dsw-alias-label-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,var(--dsw-alias-bg-layer-1));
  margin-left: 8px;
  padding: 2px 6px;
  font-size: 11px;
}

._1DvNuq_plan, ._1DvNuq_job {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  gap: 10px;
  min-width: 0;
  padding: 12px;
  display: grid;
}

._1DvNuq_plan dl {
  grid-template-columns: auto minmax(0, 1fr);
  gap: 6px 12px;
  margin: 0;
  font-size: 12px;
  display: grid;
}

._1DvNuq_plan dt {
  color: var(--dsw-alias-label-secondary);
}

._1DvNuq_plan dd {
  overflow-wrap: anywhere;
  margin: 0;
}

._1DvNuq_plan a {
  color: var(--dsw-alias-link);
  overflow-wrap: anywhere;
  font-size: 12px;
}

._1DvNuq_plan ul {
  margin: 0;
  padding-left: 16px;
  font-size: 12px;
}

._1DvNuq_jobs {
  gap: 12px;
  display: grid;
}

._1DvNuq_job progress {
  width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
}

._1DvNuq_wizard {
  box-sizing: border-box;
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-layer-1);
  border-radius: var(--dsw-radius-lg);
}

._1DvNuq_section button, ._1DvNuq_wizard button {
  transition: transform var(--ds-transition-duration-fast, .1s) var(--whale-ease, ease-out);
}

._1DvNuq_section button:active:not(:disabled), ._1DvNuq_wizard button:active:not(:disabled) {
  transform: scale(.97);
}

._1DvNuq_section :is(button, input, select, a, summary):focus-visible, ._1DvNuq_wizard :is(button, summary):focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

[data-motion="firm"] ._1DvNuq_wizard {
  --whale-duration: var(--ds-transition-duration-fast, .1s);
  --whale-ease: ease-out;
}

[data-motion="off"] ._1DvNuq_wizard, [data-motion="off"] ._1DvNuq_wizard *, [data-motion="off"] ._1DvNuq_section * {
  transition: none !important;
  animation: none !important;
  transform: none !important;
}

@keyframes _1DvNuq_setupEnter {
  from {
    translate: 0 4px;
  }

  to {
    translate: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  ._1DvNuq_wizard, ._1DvNuq_wizard *, ._1DvNuq_section * {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
}

@media (width <= 520px) {
  ._1DvNuq_wizard {
    padding: 12px;
  }

  ._1DvNuq_plan dl {
    grid-template-columns: minmax(0, 1fr);
    gap: 3px;
  }

  ._1DvNuq_plan dd {
    margin-bottom: 6px;
  }
}

@media (forced-colors: active) {
  ._1DvNuq_choice[data-selected="true"] {
    outline: 2px solid highlight;
  }
}

._1DvNuq_wizard {
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

._1DvNuq_wizard > ._1DvNuq_header, ._1DvNuq_wizard > footer {
  flex-shrink: 0;
}

._1DvNuq_wizardBody {
  overscroll-behavior: contain;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

._1DvNuq_wizardBodyContent {
  align-content: start;
  gap: 12px;
  display: grid;
}

._1DvNuq_primary {
  color: var(--dsw-alias-label-primary) !important;
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 16%,var(--dsw-alias-bg-layer-2)) !important;
  border: 1px solid var(--dsw-alias-border-l2) !important;
}

._1DvNuq_primary:disabled {
  opacity: .5;
}

._1DvNuq_choices {
  gap: 6px;
}

._1DvNuq_choice {
  box-sizing: border-box;
  align-items: center;
  min-height: 38px;
}

._1DvNuq_choice input {
  flex: none;
  margin: 0;
}

._1DvNuq_choice strong {
  display: block;
}

._1DvNuq_choice:has(input:disabled) {
  cursor: default;
  opacity: .65;
}

._1DvNuq_note p {
  margin: 0;
}

._1DvNuq_note button {
  margin-top: 8px;
}

._1DvNuq_wizard > footer {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

._1DvNuq_wizardBody {
  padding: 2px 4px 8px 0;
}

._1DvNuq_section > button, ._1DvNuq_wizardBody > button {
  justify-self: start;
  max-width: 100%;
}

._1DvNuq_section button, ._1DvNuq_wizard button {
  white-space: normal;
  max-width: 100%;
  height: auto;
  min-height: 36px;
}

._1DvNuq_actions > button {
  flex: 0 auto;
}

._1DvNuq_sourceChoices {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

._1DvNuq_sourceChoices legend {
  grid-column: 1 / -1;
}

._1DvNuq_inlineField {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-width: 0;
  font-size: 12px;
  display: flex;
}

._1DvNuq_inlineField select {
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

._1DvNuq_inlineField input[type="number"] {
  width: 80px;
  min-width: 0;
}

._1DvNuq_field:has( > input[type="number"]) {
  flex-wrap: wrap;
  align-items: center;
  display: flex;
}

._1DvNuq_field > input[type="number"] {
  width: 80px;
}

._1DvNuq_details > summary {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  box-sizing: content-box;
  width: fit-content;
  max-width: 100%;
  min-height: 20px;
  padding: 7px 10px;
}

._1DvNuq_fullName {
  min-width: 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

._1DvNuq_fullName summary {
  cursor: pointer;
}

._1DvNuq_fullName p {
  overflow-wrap: anywhere;
}

._1DvNuq_consentActions {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  display: flex;
}

@container (width <= 360px) {
  ._1DvNuq_sourceChoices {
    grid-template-columns: minmax(0, 1fr);
  }

  ._1DvNuq_inlineField select {
    width: 150px;
  }
}

@media (width <= 420px) {
  ._1DvNuq_wizard ._1DvNuq_sourceChoices {
    grid-template-columns: minmax(0, 1fr);
  }
}

._1DvNuq_modelChoices {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

._1DvNuq_modelChoices > legend {
  grid-column: 1 / -1;
  padding-bottom: 5px;
}

._1DvNuq_modelChoices ._1DvNuq_choice {
  gap: 7px;
  min-height: 80px;
  padding: 8px;
}

._1DvNuq_modelChoices ._1DvNuq_choice strong {
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  display: flex;
}

._1DvNuq_modelChoices ._1DvNuq_badge {
  white-space: nowrap;
  margin-left: 0;
}

._1DvNuq_hardwareSummary {
  color: var(--dsw-alias-label-secondary);
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 2px 10px;
  font-size: 11px;
  display: flex;
}

._1DvNuq_hardwareSummary small {
  font-size: 10px;
}

._1DvNuq_currentModel, ._1DvNuq_switchRow, ._1DvNuq_jobHeading {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

._1DvNuq_currentModel {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  padding: 7px 8px;
  font-size: 12px;
}

._1DvNuq_currentModel > span, ._1DvNuq_switchRow > span {
  overflow-wrap: anywhere;
  min-width: 0;
}

._1DvNuq_currentModel button, ._1DvNuq_switchRow button {
  flex: none;
  min-height: 30px;
  padding: 0 9px;
}

._1DvNuq_switcher {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  gap: 7px;
  padding: 8px;
  display: grid;
}

._1DvNuq_switchRow small {
  display: block;
}

._1DvNuq_selectedModel {
  border-top: 1px solid var(--dsw-alias-border-l2);
  gap: 7px;
  padding-top: 6px;
  display: grid;
}

._1DvNuq_selectedModel ._1DvNuq_details {
  padding-top: 4px;
}

._1DvNuq_selectedModel ._1DvNuq_details summary {
  border: 0;
  padding: 3px 0;
}

._1DvNuq_installHistory {
  border-top: 1px solid var(--dsw-alias-border-l2);
}

._1DvNuq_installHistory > summary {
  cursor: pointer;
  padding: 8px 0;
  font-size: 12px;
  display: list-item;
}

._1DvNuq_installHistory > summary small {
  margin-left: 12px;
}

._1DvNuq_installHistory ._1DvNuq_job {
  gap: 6px;
  padding: 9px;
}

._1DvNuq_jobHeading {
  flex-wrap: wrap;
}

._1DvNuq_installPath {
  min-width: 0;
  font-size: 11px;
}

._1DvNuq_installPath summary {
  cursor: pointer;
  color: var(--dsw-alias-label-secondary);
}

._1DvNuq_installPath p {
  overflow-wrap: anywhere;
}

._1DvNuq_modelInstaller ._1DvNuq_jobs:empty {
  display: none;
}

@container (width <= 300px) {
  ._1DvNuq_modelChoices {
    grid-template-columns: minmax(0, 1fr);
  }

  ._1DvNuq_currentModel {
    flex-wrap: wrap;
  }
}

._1DvNuq_section[aria-label="\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84"] p {
  overflow-wrap: anywhere;
}

._1DvNuq_choice {
  transition: background-color .12s ease-out, border-color .12s ease-out, box-shadow .12s ease-out;
}

._1DvNuq_choice:hover:has(input:not(:disabled)) {
  border-color: var(--dsw-alias-brand-primary);
}

._1DvNuq_choice:has(input:focus-visible) {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: 2px;
}

._1DvNuq_section :is(button, select, input, summary), ._1DvNuq_wizard :is(button, select, input, summary) {
  transition: background-color .12s ease-out,border-color .12s ease-out,color .12s ease-out,transform var(--whale-duration, .2s) var(--whale-ease, ease-out);
}

._1DvNuq_section button:hover:not(:disabled), ._1DvNuq_wizard button:hover:not(:disabled) {
  background-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,var(--dsw-alias-bg-layer-1));
}

._1DvNuq_plan, ._1DvNuq_switcher, ._1DvNuq_selectedModel, ._1DvNuq_section [data-whale-save-result], ._1DvNuq_wizardBodyContent > section {
  animation: _1DvNuq_setupEnter var(--whale-duration, .2s) ease-out;
}

[data-motion="firm"] :is(._1DvNuq_section, ._1DvNuq_wizard) {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="off"] :is(._1DvNuq_section, ._1DvNuq_wizard), [data-motion="off"] :is(._1DvNuq_section, ._1DvNuq_wizard) *, [data-motion="off"] :is(._1DvNuq_section, ._1DvNuq_wizard) :before {
  transition: none !important;
  animation: none !important;
}

[data-motion="off"] :is(._1DvNuq_section, ._1DvNuq_wizard) button:active {
  transform: none !important;
}

@media (prefers-reduced-motion: reduce) {
  ._1DvNuq_section, ._1DvNuq_wizard, ._1DvNuq_section *, ._1DvNuq_wizard *, ._1DvNuq_section :before, ._1DvNuq_wizard :before {
    transition: none !important;
    animation: none !important;
  }

  ._1DvNuq_section button:active, ._1DvNuq_wizard button:active {
    transform: none !important;
  }
}
`};var y=require("react/jsx-runtime"),wd=[["edge","Edge \u5728\u7EBF\u6717\u8BFB","\u9ED8\u8BA4\u6653\u4F0A \xB7 \u8FDE\u4E0D\u4E0A\u65F6\u663E\u793A\u6587\u5B57"],["local","\u672C\u5730\u8BED\u97F3\u6A21\u578B","\u5728\u672C\u673A\u5408\u6210\uFF0C\u9996\u6B21\u9700\u8981\u4E0B\u8F7D"],["off","\u4E0D\u53D1\u58F0","\u53EA\u663E\u793A\u6587\u5B57"]],Sd=[wd[0],["deepseek","DeepSeek \u8BED\u97F3\u5408\u6210","\u4F7F\u7528 DeepSeek \u5F00\u653E\u5E73\u53F0\u7684 API Key"],...wd.slice(1)],xd={edge:"Edge \u5728\u7EBF\u6717\u8BFB",deepseek:"DeepSeek \u8BED\u97F3\u5408\u6210",local:"\u672C\u5730\u8BED\u97F3\u6A21\u578B"},Ti={provider:"unconfigured",edgeVoice:"zh-CN-XiaoyiNeural",deepseekVoice:"stella",deepseekTextTransmissionAccepted:!1,systemVoice:null,systemFallback:!1,edgeTextTransmissionAccepted:!1,volume:.8,localModelId:null,localModelPath:null,referenceAudioPath:null},Oi=e=>{let n={...e};return delete n.referenceAudioAccepted,n},Md=(e,n)=>({...Oi(e),referenceAudioAccepted:e.referenceAudioPath===n?.referenceAudioPath&&n?.referenceAudioAccepted===!0}),Nd=Z.text,Eh=e=>({"restart-requires-resume":"\u5BBF\u4E3B\u5DF2\u91CD\u542F\uFF0C\u8BF7\u7EE7\u7EED\u540E\u91CD\u65B0\u6838\u9A8C\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u8986\u76D6\u8BBE\u7F6E\u3002","authorization-changed":"\u6388\u6743\u5DF2\u6539\u53D8\uFF0C\u8BF7\u5728\u6743\u9650\u4E2D\u6838\u67E5\u540E\u7EE7\u7EED\u3002",MODEL_SOURCE_AUTHORIZATION_REQUIRED:"\u6A21\u578B\u6765\u6E90\u6388\u6743\u5DF2\u53D8\u5316\uFF0C\u8BF7\u8865\u5145\u4E00\u6B21\u6388\u6743\u540E\u7EE7\u7EED\u3002",HUMAN_SETTING_PINNED:"\u8BBE\u7F6E\u6743\u9650\u5DF2\u64A4\u9500\uFF0C\u8BF7\u5728\u6743\u9650\u4E2D\u6838\u67E5\u540E\u7EE7\u7EED\u3002"})[e]??(typeof e=="string"&&/^[A-Z_:-]+$/.test(e)?"\u8FD0\u884C\u68C0\u67E5\u672A\u901A\u8FC7\uFF0C\u8BF7\u68C0\u67E5\u4F9D\u8D56\u6216\u67E5\u770B\u9AD8\u7EA7\u8BBE\u7F6E\u4E2D\u7684\u9519\u8BEF\u3002":e),fn=e=>Number.isFinite(e)&&e>=0?`${(e/1024**2).toFixed(1)} MiB`:"\u672A\u77E5";function Bd(e,n){let t=e.status;return!!(e.checkedFor===n&&e.settingsFor===n&&e.settings?.revision&&!e.ttsCancelling&&!e.ttsUncertain&&!e.uncertain&&!e.settingsConflict&&t?.enabled===!1&&t?.ownerSessionId===null&&t?.voiceControlBusy===!1&&t?.voiceSession?.fullyStopped===!0&&t?.voiceSession?.id===null&&!t?.ttsRuntime?.busy&&!t?.ttsRuntime?.blocked)}function st(e,n){return!e.busy&&Bd(e,n)}function At(e,n){let t=(0,de.useRef)(!1),[o,i]=(0,de.useState)(!1),[r,s]=(0,de.useState)(null),[c,l]=(0,de.useState)(0);return[async(d,p)=>{if(t.current)return!1;t.current=!0,i(!0),s(d);try{return await e(n,d,p)}catch{return!1}finally{t.current=!1,i(!1),s(null),l(h=>h+1)}},o,r,{isLocked:()=>t.current,settled:c}]}function qd({state:e,sessionId:n,run:t}){if(Bd(e,n))return null;let o=e.checkedFor===n&&(e.status?.enabled||e.status?.ownerSessionId);return(0,y.jsxs)("div",{className:Z.note,role:"status",children:[(0,y.jsx)("p",{children:e.busy?"\u6B63\u5728\u8BFB\u53D6\u6216\u4FDD\u5B58\uFF0C\u8BF7\u7A0D\u5019\u2026":o?"\u8BF7\u5148\u505C\u6B62\u8BED\u97F3\uFF0C\u518D\u7F16\u8F91\u6216\u8BD5\u542C\u3002":e.ttsUncertain||e.uncertain?"\u6B63\u5728\u6838\u67E5\u4E0A\u6B21\u64CD\u4F5C\u3002":"\u6B63\u5728\u51C6\u5907\u8BBE\u7F6E\u2026"}),o&&n&&t&&(0,y.jsx)(ce.Button,{variant:"outline",disabled:e.busy&&(!e.interruptibleRead||e.diagnosticStopPending)||e.ttsCancelling,onClick:()=>{t(n,"disable")},children:"\u505C\u6B62\u8BED\u97F3\u4EE5\u7F16\u8F91"})]})}function zd(e){let n=e.state.settingsFor===e.sessionId?e.state.settings:null,t=e.state.authorization?.scopes?.some(i=>i.id==="edge-text"&&i.allowed)===!0,o=n&&t?{...n,ttsSetup:{...n.ttsSetup,edgeTextTransmissionAccepted:!0}}:n;return(0,y.jsx)(Ih,{...e,settings:o},`${e.sessionId}:${e.state.settingsKey??o?.revision??"unread"}`)}function Ih({state:e,sessionId:n,run:t,settings:o,prepared:i=!1,active:r=!0,markSettingsEdited:s,pickPath:c}){let[l,u]=(0,de.useState)(()=>({...Ti,...o?.ttsSetup})),[d,p,h]=At(t,n),m=(0,de.useId)(),[v,g]=(0,de.useState)(!1),b=e.ttsCapabilitiesFor===n?e.ttsCapabilities:null,k=e.checkedFor===n?e.status?.ttsRuntime:null,N=e.ttsPreviewFor===n?e.ttsPreview:null,D=e.installerFor===n?e.installer?.jobs?.find(w=>dr(w,o)):null,P=!st(e,n)||p,L=JSON.stringify(l)!==JSON.stringify({...Ti,...o?.ttsSetup}),I=w=>{s?.("save-tts"),u(S=>({...S,...w}))},q=l.localModelId==="qwen3-tts-base-1.7b-gguf",z=l.provider!=="unconfigured"&&(l.provider!=="local"||!!(l.localModelId&&l.localModelPath)&&(!l.referenceAudioPath||q))&&(l.provider!=="edge"||l.edgeTextTransmissionAccepted)&&(l.provider!=="deepseek"||l.deepseekTextTransmissionAccepted&&b?.deepseekKeyAvailable===!0)&&l.volume!==""&&Number.isFinite(Number(l.volume))&&Number(l.volume)>=0&&Number(l.volume)<=1;return(0,y.jsxs)("section",{className:Z.section,"aria-label":"\u6717\u8BFB\u8BBE\u7F6E","data-settings-draft":"save-tts",children:[(0,y.jsx)("header",{children:(0,y.jsx)("h3",{children:"\u56DE\u7B54\u600E\u4E48\u53D1\u58F0"})}),(!i||n&&!(e.checkedFor===n&&(e.status?.enabled||e.status?.ownerSessionId)))&&(0,y.jsx)(qd,{state:e,sessionId:n,run:t}),(!i||!o||!b||e.uncertain||e.ttsUncertain||l.provider==="deepseek"&&b.deepseekKeyAvailable!==!0)&&(0,y.jsx)("div",{className:Z.actions,children:(0,y.jsx)(ce.Button,{variant:"outline",disabled:e.busy||p,onClick:()=>d("inspect-tts"),children:l.provider==="deepseek"?"\u68C0\u67E5 DeepSeek API Key":"\u68C0\u6D4B\u672C\u673A\u8BED\u97F3"})}),(0,y.jsxs)("fieldset",{className:`${Z.choices} ${Z.sourceChoices}`,disabled:P||!o,children:[(0,y.jsx)("legend",{children:"\u6717\u8BFB\u6765\u6E90"}),Sd.map(([w,S,B])=>(0,y.jsxs)("label",{className:Z.choice,"data-selected":l.provider===w,children:[(0,y.jsx)("input",{type:"radio",name:m,checked:l.provider===w,onChange:()=>I({provider:w,...w==="edge"?{edgeTextTransmissionAccepted:!0}:w==="deepseek"?{deepseekTextTransmissionAccepted:!0}:{}})}),(0,y.jsxs)("span",{children:[(0,y.jsx)("strong",{children:S}),(0,y.jsx)("small",{children:B})]})]},w))]}),l.provider==="edge"&&(0,y.jsxs)("div",{className:Z.section,children:[(0,y.jsx)("p",{className:Z.hint,children:"\u6717\u8BFB\u6587\u5B57\u4F1A\u53D1\u9001\u7ED9\u5FAE\u8F6F\u3002\u8054\u7F51\u5931\u8D25\u65F6\uFF0C\u56DE\u7B54\u4F1A\u663E\u793A\u4E3A\u6587\u5B57\u3002"}),b?.edgeDependency==="missing"&&(0,y.jsx)("p",{role:"status",className:Z.hint,children:"Edge \u6717\u8BFB\u7EC4\u4EF6\u6682\u4E0D\u53EF\u7528\u3002\u56DE\u7B54\u4F1A\u663E\u793A\u4E3A\u6587\u5B57\u3002"})]}),l.provider==="deepseek"&&(0,y.jsxs)("div",{className:Z.section,children:[(0,y.jsx)("p",{className:Z.hint,children:"\u8BD5\u542C\u6216\u4FDD\u5B58\u540E\u6717\u8BFB\u65F6\uFF0C\u6587\u5B57\u4F1A\u53D1\u9001\u7ED9 DeepSeek\u3002"}),b?.deepseekKeyAvailable!==!0&&(0,y.jsx)("p",{role:"status",className:Z.hint,children:"\u8BF7\u5148\u5728 DSH \u7684 DeepSeek API Key \u63D0\u4F9B\u5546\u4E2D\u914D\u7F6E\u5F00\u653E\u5E73\u53F0\u5BC6\u94A5\uFF0C\u518D\u70B9\u300C\u68C0\u67E5 DeepSeek API Key\u300D\u3002"}),(0,y.jsxs)("label",{className:Z.inlineField,children:["DeepSeek \u97F3\u8272",(0,y.jsxs)("select",{value:l.deepseekVoice,disabled:P,onChange:w=>I({deepseekVoice:w.target.value}),children:[(0,y.jsx)("option",{value:"stella",children:"\u6D77\u661F \xB7 \u5973\u58F0"}),(0,y.jsx)("option",{value:"tide",children:"\u6697\u6F6E \xB7 \u7537\u58F0"})]})]})]}),l.provider==="local"&&(l.localModelId?(0,y.jsxs)("div",{className:Z.section,children:[(0,y.jsxs)("div",{className:Z.currentModel,children:[(0,y.jsxs)("span",{children:["\u5F53\u524D\u6717\u8BFB\u6A21\u578B ",(0,y.jsx)("strong",{children:l.localModelId.startsWith("qwen3")?"Qwen3-TTS":l.localModelId.includes("melo")?"MeloTTS":l.localModelId})]}),(0,y.jsx)(ce.Button,{variant:"outline","aria-expanded":v,disabled:L,onClick:()=>g(w=>!w),children:"\u5207\u6362\u5F53\u524D\u6A21\u578B"})]}),v&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(Ld,{state:e,sessionId:n,run:t,purpose:"tts"}),(0,y.jsxs)("details",{className:Z.details,children:[(0,y.jsx)("summary",{children:"\u5B89\u88C5\u5176\u4ED6\u6717\u8BFB\u6A21\u578B"}),(0,y.jsx)(ur,{pickPath:c,state:e,sessionId:n,run:t,active:r})]})]})]}):(0,y.jsx)(ur,{pickPath:c,state:e,sessionId:n,run:t,active:r})),l.provider==="local"&&!L&&D?.modelId==="qwen3-tts-base-1.7b-gguf"&&(0,y.jsxs)("p",{className:Z.hint,children:["\u5F53\u524D\u5B89\u88C5\u65B9\u6848\uFF1A",ho(D.compute),"\u3002",D.compute==="cpu"?"\u6B64\u5B89\u88C5\u53EA\u4F7F\u7528 CPU\u3002\u53EF\u5728\u201C\u5207\u6362\u5F53\u524D\u6A21\u578B \u2192 \u5B89\u88C5\u5176\u4ED6\u6717\u8BFB\u6A21\u578B\u201D\u9009\u62E9\u81EA\u52A8 GPU\uFF1B\u4E0B\u8F7D\u8FD0\u884C\u7EC4\u4EF6\u524D\u4ECD\u9700\u786E\u8BA4\u3002":"\u662F\u5426\u5B9E\u9645\u4F7F\u7528 GPU\uFF0C\u4EE5\u5B8C\u6210\u5408\u6210\u540E\u7684\u672C\u5730\u8BA1\u7B97\u72B6\u6001\u4E3A\u51C6\u3002"]}),(0,y.jsxs)("details",{className:Z.details,children:[(0,y.jsx)("summary",{children:"\u97F3\u8272\u4E0E\u97F3\u91CF"}),(0,y.jsxs)("div",{className:Z.section,children:[l.provider==="local"&&(q||l.referenceAudioPath)&&(0,y.jsxs)("div",{className:Z.section,"data-reference-voice":!0,children:[(0,y.jsx)(po,{className:Z.field,label:"\u53C2\u8003\u97F3\u9891\uFF08WAV\uFF09",kind:"referenceAudio",value:l.referenceAudioPath,disabled:P||!q,active:r,scope:l.provider+":"+l.localModelId,pickPath:c,sessionId:n,placeholder:"\u8BF7\u70B9\u51FB\u9009\u62E9\u6587\u4EF6",onChange:w=>I({referenceAudioPath:w.trim()||null})}),l.referenceAudioPath&&(0,y.jsx)(ce.Button,{variant:"outline",disabled:P,onClick:()=>I({referenceAudioPath:null}),children:"\u6E05\u9664\u53C2\u8003\u97F3\u8272"})]}),l.provider!=="local"&&l.referenceAudioPath&&(0,y.jsxs)("div",{className:Z.section,children:[(0,y.jsx)("p",{className:Z.hint,children:"\u672C\u5730\u53C2\u8003\u97F3\u8272\u5DF2\u4FDD\u7559\u3002"}),(0,y.jsx)(ce.Button,{variant:"outline",disabled:P,onClick:()=>I({referenceAudioPath:null}),children:"\u6E05\u9664\u53C2\u8003\u97F3\u8272"})]}),l.provider==="edge"&&(0,y.jsxs)("label",{className:Z.inlineField,children:["Edge \u97F3\u8272",(0,y.jsxs)("select",{value:l.edgeVoice,disabled:P,onChange:w=>I({edgeVoice:w.target.value}),children:[(0,y.jsx)("option",{value:"zh-CN-XiaoxiaoNeural",children:"\u6653\u6653 \xB7 \u666E\u901A\u8BDD"}),(0,y.jsx)("option",{value:"zh-CN-YunxiNeural",children:"\u4E91\u5E0C \xB7 \u666E\u901A\u8BDD"}),(0,y.jsx)("option",{value:"zh-CN-XiaoyiNeural",children:"\u6653\u4F0A \xB7 \u666E\u901A\u8BDD"}),(0,y.jsx)("option",{value:"zh-CN-YunjianNeural",children:"\u4E91\u5065 \xB7 \u666E\u901A\u8BDD"}),(0,y.jsx)("option",{value:"zh-TW-HsiaoChenNeural",children:"\u6653\u81FB \xB7 \u53F0\u6E7E\u4E2D\u6587"}),(0,y.jsx)("option",{value:"zh-HK-HiuMaanNeural",children:"\u6653\u66FC \xB7 \u9999\u6E2F\u7CA4\u8BED"})]})]}),(0,y.jsxs)("label",{className:Z.inlineField,children:["\u6717\u8BFB\u97F3\u91CF",(0,y.jsx)(Zt,{"aria-label":"\u6717\u8BFB\u97F3\u91CF\u6ED1\u5757",min:"0",max:"1",step:"0.05",value:l.volume,disabled:P,onChange:w=>I({volume:Number(w.target.value)})}),(0,y.jsx)(ce.Input,{type:"number",min:"0",max:"1",step:"0.05",value:l.volume,disabled:P,onChange:w=>I({volume:w.target.value})})]})]})]}),(0,y.jsxs)("div",{className:Z.actions,children:[(0,y.jsx)(ce.Button,{variant:"primary",className:Z.primary,disabled:P||!z||!L,onClick:()=>d("save-tts",{revision:o.revision,values:Oi({...l,volume:Number(l.volume)})}),children:p?"\u5904\u7406\u4E2D\u2026":"\u4FDD\u5B58\u6717\u8BFB\u8BBE\u7F6E"}),(0,y.jsx)(ce.Button,{variant:"outline",disabled:P||!o?.ttsSetup||!z||!["edge","deepseek","local"].includes(l.provider),onClick:()=>d("preview-tts",L?{revision:o.revision,values:Md({...l,volume:Number(l.volume)},o.ttsSetup)}:void 0),children:L?"\u8BD5\u542C\u5F53\u524D\u9009\u62E9":"\u8BD5\u542C\u5DF2\u4FDD\u5B58\u914D\u7F6E"}),(0,y.jsx)(ce.Button,{variant:"outline",disabled:!(k?.busy||k?.blocked||e.ttsUncertain||e.ttsCancelling||N?.status==="preparing"||h==="preview-tts"),onClick:()=>{t(n,"cancel-tts")},children:"\u505C\u6B62\u8BD5\u542C"})]}),N&&(0,y.jsxs)("p",{role:"status",className:Z.hint,children:[{preparing:"\u8BD5\u542C\u51C6\u5907\u4E2D",cancelling:"\u6B63\u5728\u505C\u6B62\u8BD5\u542C",cancelled:"\u8BD5\u542C\u5DF2\u53D6\u6D88",idle:"\u8BD5\u542C\u5DF2\u505C\u6B62",completed:"\u8BD5\u542C\u5DF2\u7ED3\u675F","text-only":"Edge \u6682\u4E0D\u53EF\u7528\uFF0C\u56DE\u7B54\u4F1A\u663E\u793A\u4E3A\u6587\u5B57",failed:"\u8BD5\u542C\u5931\u8D25\uFF0C\u6B63\u5728\u6838\u67E5\u72B6\u6001",unconfirmed:"\u65E0\u6CD5\u786E\u8BA4\u8BD5\u542C\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B"}[N.status]??N.status,N.status!=="text-only"&&xd[N.provider]?` \xB7 ${xd[N.provider]}`:""]}),k&&(0,y.jsxs)("p",{role:"status",className:Z.hint,children:[k.blocked?"\u8BD5\u542C\u5C1A\u672A\u505C\u6B62\uFF0C\u8BF7\u91CD\u542F\u5BBF\u4E3B\u3002":`\u6717\u8BFB\u72B6\u6001\uFF1A${{idle:"\u7A7A\u95F2",preparing:"\u51C6\u5907\u4E2D",synthesizing:"\u5408\u6210\u4E2D","playback-requested":"\u5DF2\u8BF7\u6C42\u64AD\u653E","text-only":"\u5728\u7EBF\u6717\u8BFB\u6682\u4E0D\u53EF\u7528\uFF0C\u5DF2\u663E\u793A\u6587\u5B57",completed:"\u8BD5\u542C\u5DF2\u7ED3\u675F",cancelled:"\u5DF2\u53D6\u6D88",failed:"\u5931\u8D25"}[k.state]??k.state}`,k.localComputeBackend?` \xB7 \u672C\u5730\u8BA1\u7B97\uFF1A${k.localComputeBackend.toUpperCase()}${k.localComputeVerified?"\uFF08\u5DF2\u5B8C\u6210\u5408\u6210\uFF09":"\uFF08\u5F85\u9A8C\u8BC1\uFF09"}`:"",k.localComputeFallback?" \xB7 \u5DF2\u56DE\u9000\u540C\u6A21\u578B CPU":""]}),k?.localTimings&&(0,y.jsxs)("details",{className:Z.details,children:[(0,y.jsx)("summary",{children:"\u5DF2\u5B8C\u6210\u6717\u8BFB\u7247\u6BB5\u8017\u65F6"}),(0,y.jsxs)("p",{className:Z.hint,children:["\u51C6\u5907 ",(k.localTimings.preparationMs/1e3).toFixed(2)," \u79D2 \xB7 \u8BBE\u5907\u9009\u62E9 ",(k.localTimings.deviceSelectionMs/1e3).toFixed(2)," \u79D2 \xB7 \u5408\u6210 ",(k.localTimings.synthesisMs/1e3).toFixed(2)," \u79D2 \xB7 \u64AD\u653E ",(k.localTimings.playbackMs/1e3).toFixed(2)," \u79D2"]}),(0,y.jsxs)("p",{className:Z.hint,children:[k.localTimings.chunks," \u6BB5 \xB7 ",k.localTimings.modelResident?"\u4E0A\u6B21\u7247\u6BB5\u7ED3\u675F\u65F6\u6A21\u578B\u4ECD\u9A7B\u7559\uFF0C\u5B8C\u6574\u5408\u6210\u540E\u64AD\u653E\u3002\u51C6\u5907\u5305\u542B\u6587\u4EF6\u6821\u9A8C\uFF1B\u5408\u6210\u5305\u542B\u9996\u6B21\u52A0\u8F7D\u548C\u670D\u52A1\u54CD\u5E94\u3002":"\u5F53\u524D\u672C\u5730\u6A21\u578B\u9010\u6BB5\u542F\u52A8\uFF0C\u5B8C\u6574\u5408\u6210\u540E\u64AD\u653E\u3002\u51C6\u5907\u5305\u542B\u6587\u4EF6\u6821\u9A8C\uFF1B\u5408\u6210\u5305\u542B\u52A0\u8F7D\u4E0E\u5931\u8D25\u91CD\u8BD5\u3002","\u8017\u65F6\u4E0D\u662F\u9996\u97F3\u5EF6\u8FDF\u6216 GPU \u52A0\u901F\u6BD4\u3002"]})]})]})}function dr(e,n){if(e.status!=="installed"||!e.installedPath||!n)return!1;if(e.purpose==="tts"||e.recommendedSettings?.tts)return n.ttsSetup?.provider==="local"&&n.ttsSetup.localModelId===e.modelId&&n.ttsSetup.localModelPath===e.installedPath;let t=e.recommendedSettings;return!t||t.asr!==n.modelSetup?.asr?!1:Object.entries(t.models??{}).some(([o,i])=>i===e.installedPath&&n.modelSetup?.models?.[o]===i)}function Cd(e,n){return(e?.models??[]).map(t=>{let o=(e.jobs??[]).filter(s=>s.modelId===t.id),i=o.filter(s=>s.status==="installed").sort((s,c)=>String(c.updatedAt??c.createdAt??"").localeCompare(String(s.updatedAt??s.createdAt??""))),r=i.find(s=>dr(s,n));return{model:t,jobs:o,installed:i,current:r,preferred:r??i[0],active:o.find(s=>["queued","running","paused","failed"].includes(s.status))}})}var pr=e=>(e?.title??e?.id??"").split(" \xB7 ")[0],ho=e=>({cpu:"CPU",auto:"\u81EA\u52A8 GPU",cuda:"CUDA / HIP",vulkan:"Vulkan"})[e]??e??"\u672A\u77E5",Ri=e=>{let n=new Date(e);return Number.isFinite(n.getTime())?n.toLocaleString():"\u65F6\u95F4\u672A\u77E5"};function Ld({state:e,sessionId:n,run:t,purpose:o}){let[i,r]=At(t,n),s=e.installerFor===n?e.installer:null,c=e.settingsFor===n?e.settings:null,l=Cd(s,c).filter(d=>(!o||d.model.purpose===o)&&d.preferred),u=st(e,n)&&!r&&!e.settingsDraftActions?.some(d=>["save-models","save-tts"].includes(d));return(0,y.jsxs)("section",{className:Z.switcher,"aria-label":"\u5207\u6362\u5DF2\u5B89\u88C5\u6A21\u578B","data-no-settings-draft":!0,children:[s?l.length?l.map(({model:d,preferred:p,current:h})=>(0,y.jsxs)("div",{className:Z.switchRow,children:[(0,y.jsxs)("span",{children:[(0,y.jsx)("strong",{children:pr(d)}),(0,y.jsxs)("small",{children:[d.purpose==="tts"?"\u6717\u8BFB":"\u8BC6\u522B"," \xB7 ",ho(p.compute),h?" \xB7 \u5F53\u524D\u914D\u7F6E":""]})]}),(0,y.jsxs)("div",{className:Z.actions,children:[d.purpose==="tts"&&!h&&(0,y.jsx)(ce.Button,{variant:"outline",disabled:!u||!p.installedPath,onClick:()=>i("preview-tts",{revision:c.revision,values:Md({...c.ttsSetup,provider:"local",localModelId:d.id,localModelPath:p.installedPath,referenceAudioPath:null},c.ttsSetup)}),children:"\u5148\u8BD5\u542C"}),(0,y.jsx)(ce.Button,{variant:"outline",disabled:!u||!!h,onClick:()=>i("apply-model-install",{id:p.id,revision:c.revision}),children:h?"\u5F53\u524D\u6A21\u578B":"\u9A8C\u8BC1\u5E76\u5207\u6362"})]})]},d.id)):(0,y.jsx)("p",{className:Z.hint,children:"\u5C1A\u65E0\u53EF\u5207\u6362\u7684\u5DF2\u5B89\u88C5\u6A21\u578B\uFF0C\u8BF7\u5148\u5728\u6A21\u578B\u4E0B\u8F7D\u4E2D\u5B89\u88C5\u3002"}):(0,y.jsx)("p",{className:Z.hint,children:"\u6B63\u5728\u8BFB\u53D6\u5DF2\u5B89\u88C5\u6A21\u578B\u3002"}),!!l.length&&!u&&(0,y.jsx)("p",{className:Z.hint,children:"\u5207\u6362\u6A21\u578B\u524D\u9700\u505C\u6B62\u8BED\u97F3\uFF0C\u5DF2\u5B89\u88C5\u6587\u4EF6\u4E0D\u4F1A\u91CD\u65B0\u4E0B\u8F7D\u3002"})]})}function kd({job:e,snapshot:n,settings:t,disabled:o,writable:i,execute:r,history:s=!1}){let c=dr(e,t);return(0,y.jsxs)("article",{className:Z.job,"data-model-job":e.id,children:[(0,y.jsxs)("div",{className:Z.jobHeading,children:[(0,y.jsx)("strong",{children:pr(n.models.find(l=>l.id===e.modelId))||e.modelId}),(0,y.jsxs)("small",{children:[ho(e.compute)," \xB7 ",Ri(e.createdAt)]})]}),(0,y.jsxs)("p",{role:"status",children:[c?"\u5F53\u524D\u914D\u7F6E \xB7 ":"",{queued:"\u7B49\u5F85\u4E2D",running:"\u5904\u7406\u4E2D",paused:"\u5DF2\u6682\u505C",failed:"\u5931\u8D25",cancelled:"\u5DF2\u53D6\u6D88",installed:"\u5DF2\u5B89\u88C5\uFF0C\u5B57\u8282\u6821\u9A8C\u901A\u8FC7","checking-runtime":"\u68C0\u67E5\u8FD0\u884C\u4F9D\u8D56","verifying-local":"\u6821\u9A8C\u672C\u673A\u5DF2\u6709\u6A21\u578B",downloading:"\u4E0B\u8F7D\u4E2D",verifying:"\u6821\u9A8C\u6587\u4EF6",installing:"\u63D0\u4EA4\u5B89\u88C5"}[e.stage]??e.stage]}),!s&&Number.isFinite(e.totalBytes)&&e.totalBytes>0&&Number.isFinite(e.receivedBytes)&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("progress",{max:e.totalBytes,value:Math.min(e.receivedBytes,e.totalBytes),"aria-label":"\u4E0B\u8F7D\u5B57\u8282\u8FDB\u5EA6"}),(0,y.jsxs)("small",{children:["\u4E0B\u8F7D ",fn(e.receivedBytes)," / ",fn(e.totalBytes)]})]}),e.error&&(0,y.jsx)("p",{role:"alert",children:e.error.message}),s&&e.installedPath&&(0,y.jsxs)("details",{className:Z.installPath,children:[(0,y.jsx)("summary",{children:"\u5B89\u88C5\u4F4D\u7F6E"}),(0,y.jsx)("p",{children:e.installedPath})]}),(0,y.jsxs)("div",{className:Z.actions,children:[["queued","running"].includes(e.status)&&(0,y.jsx)(ce.Button,{variant:"outline",disabled:o,onClick:()=>r("control-model-install",{id:e.id,operation:"pause"}),children:"\u6682\u505C\uFF0C\u4FDD\u7559\u8FDB\u5EA6"}),["paused","failed"].includes(e.status)&&(0,y.jsx)(ce.Button,{variant:"outline",disabled:o,onClick:()=>r("control-model-install",{id:e.id,operation:"resume"}),children:"\u6062\u590D\u540C\u4E00\u6765\u6E90\u4E0B\u8F7D"}),["queued","running","paused","failed"].includes(e.status)&&(0,y.jsx)(ce.Button,{variant:"outline",disabled:o,onClick:()=>r("control-model-install",{id:e.id,operation:"cancel"}),children:"\u53D6\u6D88\u5E76\u6E05\u9664\u6B64\u4EFB\u52A1\u4E34\u65F6\u6587\u4EF6"}),e.status==="installed"&&!c&&(0,y.jsx)(ce.Button,{variant:"outline",disabled:!i,onClick:()=>r("apply-model-install",{id:e.id,revision:t.revision}),children:"\u9A8C\u8BC1\u5E76\u5207\u6362"})]}),e.status==="installed"&&(0,y.jsx)("small",{children:"\u5207\u6362\u524D\u8BF7\u7ED3\u675F\u5BF9\u8BDD\u3002\u4E0B\u6B21\u5F00\u59CB\u5BF9\u8BDD\u65F6\u4F7F\u7528\u65B0\u6A21\u578B\u3002"})]})}function Pd({state:e,sessionId:n,run:t}){let[o,i]=(0,de.useState)(""),[r,s]=(0,de.useState)("cpu"),[c,l]=(0,de.useState)(!1),[u,d]=At(t,n),p=e.installerFor===n?e.installer:null,h=e.settingsFor===n?e.settings:null,m=Cd(p,h),v=m.find(w=>w.model.id===o),g=v?.model,b=e.installPlanFor===n&&e.installPlan?.modelId===o&&e.installPlan?.compute===r&&!e.installPlan?.sourceDirectory?e.installPlan:null,k=!!e.busy||e.uncertain||e.installerUncertain||d,N=!d&&st(e,n)&&!e.settingsDraftActions?.some(w=>["save-models","save-tts"].includes(w)),D=g?.id==="faster-whisper-small"?"whisper":g?.id==="sensevoice-int8-2024-07-17"?"sensevoice":null,P=D==="whisper"&&p?.compute?.backends?.[D]?.cuda?.available===!0,L=(0,de.useId)(),I=(p?.jobs??[]).filter(w=>["installed","cancelled"].includes(w.status)).slice().reverse(),q=p?.hardware,z=p?.refresh?.observedAt??p?.compute?.observedAt;return(0,y.jsxs)("section",{className:`${Z.section} ${Z.modelInstaller}`,"aria-label":"\u6A21\u578B\u5B89\u88C5",children:[(0,y.jsxs)("div",{className:Z.hardwareSummary,children:[(0,y.jsxs)("span",{children:["\u5185\u5B58 ",fn(q?.totalMemoryBytes)," \xB7 \u53EF\u7528 ",fn(q?.availableMemoryBytes)," \xB7 \u663E\u5B58 ",fn(q?.gpuMemoryBytes)]}),(0,y.jsxs)("small",{children:[z?"\u66F4\u65B0\u4E8E "+Ri(z):"\u7B49\u5F85\u68C0\u6D4B"," \xB7 \u6BCF 5 \u5206\u949F"]})]}),(p?.refresh?.error||e.modelComputeError)&&(0,y.jsxs)("p",{className:Z.hint,role:"status",children:[p?.refresh?.error??"\u672C\u6B21\u786C\u4EF6\u68C0\u6D4B\u672A\u5B8C\u6210","\uFF1B\u4FDD\u7559\u4E0A\u6B21\u7ED3\u679C\u3002"]}),e.installerError&&(0,y.jsx)("p",{role:"alert",className:Z.note,children:e.installerError}),e.installerUncertain&&(0,y.jsx)("p",{role:"status",className:Z.note,children:"\u6B63\u5728\u6838\u67E5\u5B89\u88C5\u72B6\u6001\u3002"}),(0,y.jsxs)("div",{className:Z.currentModel,children:[(0,y.jsxs)("span",{children:["\u8BC6\u522B ",(0,y.jsx)("strong",{children:{"whisper-wasm":"Whisper Base",whisper:"Whisper",sensevoice:"SenseVoice"}[h?.modelSetup?.asr]??"\u672A\u914D\u7F6E"})," \xB7 \u6717\u8BFB ",(0,y.jsx)("strong",{children:h?.ttsSetup?.provider==="local"?h.ttsSetup.localModelId?.startsWith("qwen3")?"Qwen3-TTS":h.ttsSetup.localModelId?.startsWith("vits-melo")?"MeloTTS":h.ttsSetup.localModelId??"\u672C\u5730\u6A21\u578B":{edge:"Edge",deepseek:"DeepSeek",off:"\u4E0D\u53D1\u58F0"}[h?.ttsSetup?.provider]??"\u672A\u914D\u7F6E"})]}),(0,y.jsx)(ce.Button,{variant:"outline","aria-expanded":c,onClick:()=>l(w=>!w),children:"\u5207\u6362\u5F53\u524D\u6A21\u578B"})]}),c&&(0,y.jsx)(Ld,{state:e,sessionId:n,run:t}),p?(0,y.jsxs)("fieldset",{className:`${Z.choices} ${Z.modelChoices}`,disabled:k,children:[(0,y.jsx)("legend",{children:"\u9009\u62E9\u6A21\u578B"}),m.map(({model:w,current:S,preferred:B,active:E})=>(0,y.jsxs)("label",{className:Z.choice,"data-selected":o===w.id,children:[(0,y.jsx)("input",{type:"radio",name:L,checked:o===w.id,onChange:()=>{i(w.id),s(w.computeOptions?.includes("auto")?"auto":"cpu")}}),(0,y.jsxs)("span",{children:[(0,y.jsxs)("strong",{children:[pr(w),w.recommendation?.recommended&&(0,y.jsx)("span",{className:Z.badge,children:"\u63A8\u8350"})]}),(0,y.jsxs)("small",{children:[w.purpose==="tts"?"\u6717\u8BFB":"\u8BC6\u522B"," \xB7 ",fn(w.totalBytes)]}),(0,y.jsx)("small",{children:S?"\u5F53\u524D\u914D\u7F6E":E?{queued:"\u7B49\u5F85\u4E0B\u8F7D",running:"\u4E0B\u8F7D\u5904\u7406\u4E2D",paused:"\u4E0B\u8F7D\u5DF2\u6682\u505C",failed:"\u4E0B\u8F7D\u5931\u8D25"}[E.status]:B?"\u5DF2\u5B89\u88C5\uFF0C\u53EF\u5207\u6362":w.available?"\u53EF\u51C6\u5907\u5B89\u88C5":"\u6682\u4E0D\u53EF\u5B89\u88C5"}),!w.available&&(0,y.jsx)("small",{children:w.reason??w.recommendation?.reason})]})]},w.id))]}):(0,y.jsx)("p",{className:Z.note,children:"\u6B63\u5728\u8BFB\u53D6\u6A21\u578B\u5217\u8868\u3002"}),g&&(0,y.jsxs)("div",{className:Z.selectedModel,children:[(0,y.jsxs)("label",{className:Z.inlineField,children:["\u63A8\u7406\u8BBE\u5907",(0,y.jsx)("select",{value:r,disabled:k,onChange:w=>s(w.target.value),children:(g.computeOptions??["cpu"]).map(w=>(0,y.jsxs)("option",{value:w,children:[ho(w),w==="cpu"?"":" \xB7 CPU \u515C\u5E95"]},w))})]}),(0,y.jsxs)("div",{className:Z.actions,children:[v.preferred&&(0,y.jsx)(ce.Button,{variant:"outline",disabled:!N||!!v.current,onClick:()=>u("apply-model-install",{id:v.preferred.id,revision:h.revision}),children:v.current?"\u5F53\u524D\u6A21\u578B":"\u9A8C\u8BC1\u5E76\u5207\u6362"}),(0,y.jsx)(ce.Button,{variant:"outline",disabled:k||!g.available,onClick:()=>u("plan-model-install",{modelId:o,compute:r}),children:v.preferred?"\u67E5\u770B\u5176\u4ED6\u5B89\u88C5\u65B9\u6848":"\u67E5\u770B\u5B89\u88C5\u8BA1\u5212"})]}),(0,y.jsxs)("details",{className:Z.details,children:[(0,y.jsx)("summary",{children:"\u63A8\u8350\u4F9D\u636E\u4E0E\u8BBE\u5907\u8BF4\u660E"}),(0,y.jsx)("p",{className:Z.hint,children:g.recommendation?.reason??"\u63A8\u8350\u4F9D\u636E\u672A\u77E5\uFF0C\u53EF\u624B\u52A8\u9009\u62E9\u3002"}),(0,y.jsx)("p",{className:Z.hint,children:g.purpose==="tts"?r==="cpu"?"\u4EC5\u51C6\u5907 CPU \u8FD0\u884C\u65F6\u3002":"\u51C6\u5907\u56FA\u5B9A Vulkan \u4E0E CPU \u7EC4\u4EF6\uFF0C\u5B9E\u9645\u53EF\u7528\u6027\u4ECD\u9700\u672C\u673A\u5408\u6210\u9A8C\u8BC1\u3002":D==="sensevoice"?"\u6B64 SenseVoice INT8 \u7EC4\u5408\u76EE\u524D\u4F7F\u7528 CPU\u3002":P?"\u5DF2\u68C0\u6D4B\u5230 CTranslate2 GPU\uFF1B\u6A21\u578B\u52A0\u8F7D\u53CA\u663E\u5B58\u4ECD\u5F85\u9A8C\u8BC1\u3002":"\u672A\u8BC1\u5B9E GPU \u53EF\u7528\uFF0C\u81EA\u52A8\u6A21\u5F0F\u4F7F\u7528\u540C\u6A21\u578B CPU\u3002"})]})]}),b&&(0,y.jsxs)(ce.MenuSurface,{className:Z.plan,"aria-label":"\u6A21\u578B\u5B89\u88C5\u8BA1\u5212",children:[(0,y.jsx)("h4",{children:"\u6A21\u578B\u5B89\u88C5"}),(0,y.jsxs)("dl",{children:[(0,y.jsx)("dt",{children:"\u6A21\u578B"}),(0,y.jsx)("dd",{children:g?.title??b.modelId}),(0,y.jsx)("dt",{children:"\u6765\u6E90"}),(0,y.jsx)("dd",{children:b.source}),(0,y.jsx)("dt",{children:"\u4E0B\u8F7D\u5927\u5C0F"}),(0,y.jsx)("dd",{children:fn(b.totalBytes)}),(0,y.jsx)("dt",{children:"\u4FDD\u5B58\u4F4D\u7F6E"}),(0,y.jsx)("dd",{children:b.destination}),(0,y.jsx)("dt",{children:"\u63A8\u7406\u8BBE\u5907"}),(0,y.jsx)("dd",{children:b.compute})]}),(0,y.jsx)("p",{children:b.licenseNote??"\u8BF7\u9605\u8BFB\u4E0B\u5217\u6A21\u578B\u8BB8\u53EF\u3002"}),b.licenseUrls?.map(w=>(0,y.jsx)("a",{href:w,target:"_blank",rel:"noreferrer",children:w},w)),(0,y.jsx)("p",{className:Z.hint,children:b.notice}),(0,y.jsxs)("details",{className:Z.details,children:[(0,y.jsx)("summary",{children:"\u6587\u4EF6\u548C\u6821\u9A8C\u8BE6\u60C5"}),(0,y.jsx)("ul",{children:b.files?.map(w=>(0,y.jsxs)("li",{children:[w.name," \xB7 ",fn(w.bytes),(0,y.jsxs)("small",{children:["SHA-256: ",w.sha256]}),(0,y.jsx)("small",{children:w.url})]},w.name))})]}),(0,y.jsx)(ce.Button,{variant:"primary",className:Z.primary,disabled:k||!g?.available||!b.planHash,onClick:()=>u("start-model-install",{modelId:b.modelId,compute:b.compute,planHash:b.planHash,accepted:!0}),children:"\u5F00\u59CB\u4E0B\u8F7D"})]}),(0,y.jsx)("div",{className:Z.jobs,children:(p?.jobs??[]).filter(w=>!["installed","cancelled"].includes(w.status)).map(w=>(0,y.jsx)(kd,{job:w,snapshot:p,settings:h,disabled:k,writable:N,execute:u},w.id))}),!!I.length&&(0,y.jsxs)("details",{className:Z.installHistory,children:[(0,y.jsxs)("summary",{children:["\u5B89\u88C5\u8BB0\u5F55\uFF08",I.length,"\uFF09",(0,y.jsx)("small",{children:"\u65F6\u95F4 \xB7 \u8BBE\u5907 \xB7 \u4F4D\u7F6E"})]}),(0,y.jsx)("div",{className:Z.jobs,children:I.map(w=>(0,y.jsx)(kd,{job:w,snapshot:p,settings:h,disabled:k,writable:N,execute:u,history:!0},w.id))})]}),(0,y.jsx)("p",{className:Z.hint,children:"\u6A21\u578B\u4E0B\u8F7D\u53EF\u5728\u540E\u53F0\u7EE7\u7EED\u3002\u68C0\u6D4B\u9759\u9ED8\u8FDB\u884C\uFF0C\u8FDB\u5165\u672C\u9875\u7ACB\u5373\u5237\u65B0\u3002"})]})}function ur({state:e,sessionId:n,run:t,active:o=!0,pickPath:i,initialModelId:r=null,initialReuse:s=!1,reuseOnly:c=!1,onboarding:l=!1}){let[u,d,,p]=At(t,n),[h,m]=(0,de.useState)(r),[v,g]=(0,de.useState)(null),[b,k]=(0,de.useState)(s),[N,D]=(0,de.useState)(""),[P,L]=(0,de.useState)("q8_0"),I=e.installerFor===n?e.installer:null,q=I?.models?.filter(G=>G.purpose==="tts"||["qwen3-tts-base-1.7b-gguf","vits-melo-tts-zh_en-int8"].includes(G.id))??[],z=q.find(G=>G.recommendation?.recommended&&G.available),w=h??z?.id??q.find(G=>G.available)?.id??q[0]?.id,S=q.find(G=>G.id===w),B=v??(S?.computeOptions?.includes("auto")?"auto":"cpu"),E=b&&w==="qwen3-tts-base-1.7b-gguf",M=E?{sourceDirectory:N,modelVariant:P}:{},F=e.installPlanFor===n&&e.installPlan?.modelId===w&&e.installPlan?.compute===B&&(E?e.installPlan?.reused===!0&&(e.installPlanRequest?.sourceDirectory??e.installPlan?.sourceDirectory)===N&&e.installPlan?.modelVariant===P:!e.installPlan?.sourceDirectory)?e.installPlan:null,A=[...I?.jobs??[]].reverse().find(G=>G.modelId===w&&G.status!=="cancelled"),V=I?.ttsInstallIntent,U=V&&A&&V.modelId===w&&V.jobId===A.id?V:null,H=["waiting","verifying"].includes(V?.status),X=e.settingsFor===n&&e.settings?.ttsSetup?.provider==="local"&&e.settings.ttsSetup.localModelId===w&&A?.status==="installed"&&!!A.installedPath&&e.settings.ttsSetup.localModelPath===A.installedPath,ge=(0,de.useRef)(void 0),ae=(0,de.useRef)(null);(0,de.useEffect)(()=>{!o||I||e.busy||d||p.isLocked()||ge.current===n||(ge.current=n,u("model-installer"))},[o,n,!!I,e.busy,d,p.settled]),(0,de.useEffect)(()=>{let G=n+":"+w+":"+B;E||!o||!S?.available||e.busy||d||p.isLocked()||F||ae.current===G||(ae.current=G,u("plan-model-install",{modelId:w,compute:B}))},[o,n,w,B,S?.available,e.busy,d,!!F,E,p.settled]);let ee=d||e.busy||e.installerUncertain;return(0,y.jsxs)("section",{className:Z.section,"aria-label":"\u4E0B\u8F7D\u672C\u5730\u8BED\u97F3\u6A21\u578B","data-no-settings-draft":!0,children:[I?(0,y.jsxs)(y.Fragment,{children:[!c&&(0,y.jsxs)("label",{className:Z.inlineField,children:["\u8BED\u97F3\u6A21\u578B",(0,y.jsx)("select",{"aria-label":"\u8BED\u97F3\u6A21\u578B",value:w??"",disabled:ee||U?.status==="verifying",onChange:G=>{m(G.target.value),g(null)},children:q.map(G=>(0,y.jsxs)("option",{value:G.id,children:[G.title??G.id,G.recommendation?.recommended?" \xB7 \u63A8\u8350":"",G.available?"":" \xB7 \u6682\u4E0D\u53EF\u7528"]},G.id))})]}),!l&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("p",{className:Z.hint,children:S?.recommendation?.reason}),(0,y.jsxs)("label",{className:Z.inlineField,children:["\u672C\u5730\u8BA1\u7B97",(0,y.jsx)("select",{"aria-label":"\u672C\u5730\u8BA1\u7B97",value:B,disabled:ee||H,onChange:G=>g(G.target.value),children:(S?.computeOptions??["cpu"]).map(G=>(0,y.jsx)("option",{value:G,children:{cpu:"CPU",auto:"\u81EA\u52A8 GPU \xB7 CPU \u515C\u5E95",vulkan:"Vulkan \xB7 CPU \u515C\u5E95"}[G]},G))})]})]}),!S?.available&&(0,y.jsx)("p",{role:"status",className:Z.note,children:S?.reason??"\u6B64\u8BBE\u5907\u6682\u6CA1\u6709\u517C\u5BB9\u7684\u5B89\u88C5\u5305\u3002\u53EF\u9009\u62E9\u5176\u4ED6\u652F\u6301\u7684\u6A21\u578B\uFF0C\u6216\u5148\u4F7F\u7528\u6587\u5B57\u3002"}),F&&(0,y.jsxs)("div",{className:Z.plan,children:[(0,y.jsxs)("strong",{children:["\u4E0B\u8F7D ",fn(F.totalBytes)," \xB7 ",F.compute.toUpperCase()]}),F.reused&&(0,y.jsxs)("p",{children:["\u590D\u7528\u6A21\u578B ",fn(F.reusedBytes)," \xB7 ",F.modelVariant]}),(0,y.jsxs)("details",{className:Z.details,children:[(0,y.jsx)("summary",{children:"\u6765\u6E90\u3001\u8BB8\u53EF\u4E0E\u4FDD\u5B58\u4F4D\u7F6E"}),(0,y.jsx)("p",{children:F.source}),F.runtime&&(0,y.jsx)("p",{children:F.runtime.source}),(0,y.jsx)("p",{children:F.notice}),(0,y.jsx)("p",{children:F.verification}),(0,y.jsx)("p",{children:F.licenseNote}),F.licenseUrls?.map(G=>(0,y.jsx)("a",{href:G,target:"_blank",rel:"noreferrer",children:G},G)),(0,y.jsx)("p",{children:F.destination})]})]}),(0,y.jsxs)("div",{className:Z.actions,children:[(!A||(E||A.compute!==B)&&A.status==="installed"&&!H)&&(0,y.jsx)(ce.Button,{variant:"primary",className:Z.primary,disabled:ee||!st(e,n)||!S?.available||!F,onClick:()=>u("start-model-install",{modelId:w,compute:B,planHash:F.planHash,accepted:!0,useWhenReady:!0,...F.reused?{sourceDirectory:F.sourceDirectory,modelVariant:F.modelVariant}:{}}),children:E?"\u9A8C\u8BC1\u5E76\u4F7F\u7528":"\u4E0B\u8F7D\u5E76\u4F7F\u7528"}),w==="qwen3-tts-base-1.7b-gguf"&&!c&&(0,y.jsx)(ce.Button,{variant:"outline","aria-expanded":E,disabled:ee||H,onClick:()=>k(G=>!G),children:"\u4F7F\u7528\u672C\u673A\u5DF2\u6709\u6587\u4EF6"})]}),E&&(0,y.jsxs)("div",{className:Z.section,children:[(0,y.jsx)(po,{className:Z.field,label:"\u63D2\u4EF6\u6240\u5728\u673A\u5668\u7684\u6A21\u578B\u76EE\u5F55",kind:"sourceDirectory",value:N,disabled:ee,active:o,scope:w+":"+P,pickPath:i,sessionId:n,onChange:D}),(0,y.jsxs)("label",{className:Z.inlineField,children:["\u5DF2\u6709\u6A21\u578B\u91CF\u5316\u7248\u672C",(0,y.jsxs)("select",{"aria-label":"\u5DF2\u6709\u6A21\u578B\u91CF\u5316\u7248\u672C",value:P,disabled:ee,onChange:G=>L(G.target.value),children:[(0,y.jsx)("option",{value:"q8_0",children:"Q8_0"}),(0,y.jsx)("option",{value:"q4_k_m",children:"Q4_K_M"})]})]}),(0,y.jsx)(ce.Button,{variant:"outline",disabled:ee||!N.trim()||!S?.available,onClick:()=>u("plan-model-install",{modelId:w,compute:B,...M}),children:"\u68C0\u67E5\u590D\u7528\u8BA1\u5212"})]}),E&&A&&["failed","paused"].includes(A.status)&&(0,y.jsx)("p",{className:Z.note,children:"\u5DF2\u6709\u672A\u5B8C\u6210\u7684\u5B89\u88C5\u4EFB\u52A1\u3002\u53EF\u7EE7\u7EED\u91CD\u8BD5\uFF1B\u5982\u9700\u66F4\u6362\u76EE\u5F55\u6216\u91CF\u5316\u7248\u672C\uFF0C\u8BF7\u5148\u53D6\u6D88\u8BE5\u4EFB\u52A1\uFF0C\u518D\u68C0\u67E5\u65B0\u7684\u590D\u7528\u8BA1\u5212\u3002"}),!E&&S?.available&&!F&&!A&&(0,y.jsx)(ce.Button,{variant:"outline",disabled:ee,onClick:()=>u("plan-model-install",{modelId:w,compute:B}),children:"\u91CD\u65B0\u8BFB\u53D6\u5B89\u88C5\u8BA1\u5212"}),A&&(0,y.jsxs)("div",{className:Z.job,children:[(0,y.jsx)("p",{role:"status",children:U?.status==="verifying"?"\u6B63\u5728\u9A8C\u8BC1\u5408\u6210\uFF0C\u9996\u6B21\u53EF\u80FD\u9700\u8981\u51E0\u5206\u949F":U?.status==="applied"&&X?"\u5408\u6210\u9A8C\u8BC1\u901A\u8FC7\uFF0C\u5DF2\u8BBE\u4E3A\u6717\u8BFB\u6765\u6E90":U?.status==="blocked"?"\u9700\u8981\u5904\u7406\u540E\u518D\u7EE7\u7EED":{queued:"\u7B49\u5F85\u4E0B\u8F7D",running:A.stage==="verifying-local"?"\u6821\u9A8C\u672C\u673A\u5DF2\u6709\u6A21\u578B":"\u4E0B\u8F7D\u5904\u7406\u4E2D",paused:"\u5DF2\u6682\u505C",failed:"\u4E0B\u8F7D\u5931\u8D25",installed:"\u6587\u4EF6\u5DF2\u6821\u9A8C\uFF0C\u5C1A\u672A\u786E\u8BA4\u5408\u6210"}[A.status]??A.status}),A.totalBytes>0&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("progress",{"aria-label":"\u8BED\u97F3\u6A21\u578B\u4E0B\u8F7D\u8FDB\u5EA6",max:A.totalBytes,value:Math.min(A.receivedBytes,A.totalBytes)}),(0,y.jsxs)("small",{children:[fn(A.receivedBytes)," / ",fn(A.totalBytes)]})]}),A.error&&(0,y.jsx)("p",{role:"alert",children:A.error.message}),U?.reason&&(0,y.jsx)("p",{className:Z.note,children:Eh(U.reason)}),(0,y.jsxs)("div",{className:Z.actions,children:[U?.status==="verifying"&&(0,y.jsx)(ce.Button,{variant:"outline",disabled:ee,onClick:()=>u("control-model-install",{id:A.id,operation:"pause"}),children:"\u505C\u6B62\u9A8C\u8BC1"}),["queued","running"].includes(A.status)&&(0,y.jsx)(ce.Button,{variant:"outline",disabled:ee,onClick:()=>u("control-model-install",{id:A.id,operation:"pause"}),children:"\u6682\u505C"}),(["paused","failed"].includes(A.status)||U?.status==="blocked"||U?.status==="paused")&&(0,y.jsx)(ce.Button,{variant:"outline",disabled:ee,onClick:()=>u("control-model-install",{id:A.id,operation:"resume"}),children:"\u7EE7\u7EED\u4E0B\u8F7D\u5E76\u4F7F\u7528"}),["queued","running","paused","failed"].includes(A.status)&&(0,y.jsx)(ce.Button,{variant:"outline",disabled:ee,onClick:()=>u("control-model-install",{id:A.id,operation:"cancel"}),children:"\u53D6\u6D88\u4E0B\u8F7D"}),A.status==="installed"&&!X&&(!U||["applied","cancelled"].includes(U.status))&&(0,y.jsx)(ce.Button,{variant:"outline",disabled:ee||H||!st(e,n),onClick:()=>u("apply-model-install",{id:A.id,revision:e.settings.revision}),children:"\u9A8C\u8BC1\u5E76\u4F7F\u7528"})]})]}),X&&(0,y.jsx)("p",{className:Z.hint,children:"\u672C\u5730\u6A21\u578B\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u8BD5\u542C\u3002"})]}):(0,y.jsx)(y.Fragment,{children:(0,y.jsx)("p",{className:Z.hint,children:"\u6B63\u5728\u8BFB\u53D6\u53EF\u5B89\u88C5\u6A21\u578B\u2026"})}),e.installerError&&(0,y.jsx)("p",{role:"alert",className:Z.note,children:e.installerError}),e.installerUncertain&&(0,y.jsx)("p",{role:"status",children:"\u6B63\u5728\u6838\u67E5\u4E0B\u8F7D\u72B6\u6001\u3002"})]})}function Ad({state:e,sessionId:n,run:t,pickPath:o,active:i}){let r=e.settingsFor===n?e.settings:null,s=e.installerFor===n?e.installer:null,c=r?.ttsSetup?.localModelPath,[l,u]=At(t,n),[d,p]=(0,de.useState)(""),[h,m]=(0,de.useState)(!1),v=(s?.jobs??[]).filter(b=>b.status==="installed"&&(b.purpose==="tts"||b.recommendedSettings?.tts)),g=v.find(b=>b.id===d);return(0,y.jsxs)("section",{className:Z.section,"aria-label":"\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84","data-no-settings-draft":!0,children:[(0,y.jsx)("h3",{children:"\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84"}),(0,y.jsx)("p",{className:Z.hint,children:c||"\u5C1A\u672A\u914D\u7F6E\u672C\u5730\u6717\u8BFB\u6A21\u578B\u8DEF\u5F84\u3002"}),!!v.length&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)("label",{className:Z.inlineField,children:["\u5DF2\u5B89\u88C5\u76EE\u5F55",(0,y.jsxs)("select",{value:d,onChange:b=>p(b.target.value),children:[(0,y.jsx)("option",{value:"",children:"\u9009\u62E9\u5DF2\u6821\u9A8C\u7684\u5B89\u88C5\u76EE\u5F55"}),v.map(b=>(0,y.jsxs)("option",{value:b.id,children:[pr(s.models.find(k=>k.id===b.modelId))," \xB7 ",ho(b.compute)," \xB7 ",Ri(b.createdAt)]},b.id))]})]}),g&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("p",{className:Z.hint,children:g.installedPath}),(0,y.jsx)(ce.Button,{variant:"outline",disabled:u||!st(e,n)||dr(g,r),onClick:()=>l("apply-model-install",{id:g.id,revision:r.revision}),children:"\u9A8C\u8BC1\u5E76\u4F7F\u7528\u6240\u9009\u8DEF\u5F84"})]})]}),(0,y.jsxs)("details",{className:Z.details,onToggle:b=>m(b.currentTarget.open),children:[(0,y.jsx)("summary",{children:"\u590D\u7528\u672C\u673A Qwen \u6A21\u578B\u6587\u4EF6"}),(0,y.jsx)("p",{className:Z.hint,children:"\u9009\u62E9\u5DF2\u6709\u6A21\u578B\u76EE\u5F55\u540E\u6821\u9A8C\u6587\u4EF6\uFF1B\u6821\u9A8C\u901A\u8FC7\u540E\u5B89\u88C5\u8FD0\u884C\u7EC4\u4EF6\u3002"}),h&&(0,y.jsx)(ur,{state:e,sessionId:n,run:t,active:i,pickPath:o,initialModelId:"qwen3-tts-base-1.7b-gguf",initialReuse:!0,reuseOnly:!0})]})]})}function Ed({state:e,sessionId:n,run:t,onDismiss:o,onMinimize:i,onBackToAuthorization:r,asrStatus:s,pickPath:c}){let[l,u]=At(t,n),[d,p]=(0,de.useState)(0),h=(0,de.useRef)(null),m=(0,de.useRef)(0),v=(0,de.useRef)(null);(0,de.useLayoutEffect)(()=>()=>{m.current++},[n]);let g=ee=>(m.current++,ee?.());(0,de.useLayoutEffect)(()=>{let ee=h.current?.closest("[data-whale-content]");ee&&(ee.scrollTop=0);let G=h.current?.querySelector("[data-wizard-body]");G&&(G.scrollTop=0)},[d]);let b=e.settingsFor===n?e.settings:null,[k,N]=(0,de.useState)(null),[D,P]=(0,de.useState)(null),L=k??b?.listenMode??"ptt",I=b?.ttsSetup?.provider,q=D??(I!=="unconfigured"?I:null)??"edge",z=q==="edge"&&I!=="edge",w=e.ttsCapabilitiesFor===n?e.ttsCapabilities:null,S=typeof w?.deepseekKeyAvailable=="boolean",B=w?.deepseekKeyAvailable===!0,E=`${n??"owner"}:${b?.revision??"unread"}`,[M,F]=(0,de.useState)(null),A=M??b?.ttsSetup?.deepseekVoice??"stella",V=!S&&!u&&v.current===E&&!!e.error,U=()=>{u||(v.current=E,l("inspect-tts"))};(0,de.useEffect)(()=>{d!==1||q!=="deepseek"||S||u||v.current===E||U()},[d,q,S,E,u]);let H=q==="deepseek"&&I!=="deepseek",X=u||!st(e,n),ge=b?.ttsSetup?.provider==="local"&&!!b.ttsSetup.localModelId,ae=async()=>{let ee=m.current,G=()=>m.current===ee;if(d===0)await l("listen-mode",{mode:L})===!0&&G()&&p(1);else if(d===1){if(q==="deepseek"&&!B)return;let C=q==="deepseek"&&A!==(b.ttsSetup.deepseekVoice??"stella");if(D===null&&b.ttsSetup.provider!=="unconfigured"&&!C||q==="local"&&ge){p(2);return}let ve=Oi({...Ti,...b.ttsSetup,provider:q});q==="edge"&&(ve.edgeTextTransmissionAccepted=!0),q==="deepseek"&&(ve.deepseekTextTransmissionAccepted=!0,ve.deepseekVoice=A),await l("save-tts",{revision:b.revision,values:ve})===!0&&G()&&p(2)}else await l("complete-setup",{revision:b.revision})===!0&&G()&&o?.()};return(0,y.jsxs)(ce.MenuSurface,{ref:h,className:Z.wizard,role:"region","aria-label":"\u9C7C\u5E94\u9996\u6B21\u914D\u7F6E","data-whale-intrinsic":!0,children:[(0,y.jsxs)("header",{className:Z.header,children:[(0,y.jsxs)("div",{children:[(0,y.jsx)("h2",{children:"\u5F00\u59CB\u4F7F\u7528\u9C7C\u5E94"}),(0,y.jsxs)("p",{className:Z.hint,children:["\u7B2C ",d+1," / 3 \u6B65 \xB7 \u5176\u4F59\u8BBE\u7F6E\u968F\u65F6\u518D\u8C03"]})]}),(0,y.jsx)(ce.Button,{onClick:i,children:"\u7A0D\u540E"})]}),(0,y.jsx)("div",{className:Z.wizardBody,"data-wizard-body":!0,"data-no-drag":!0,children:(0,y.jsxs)("div",{className:Z.wizardBodyContent,"data-whale-natural-content":!0,children:[(0,y.jsx)(qd,{state:e,sessionId:n,run:t}),d===0&&(0,y.jsxs)("section",{className:Z.section,children:[(0,y.jsx)("h3",{children:"\u600E\u4E48\u8BF4\u8BDD\uFF1F"}),(0,y.jsx)("fieldset",{className:Z.choices,disabled:X,children:[["ptt","\u6309\u952E\u8BF4\u8BDD","\u6309\u4F4F\u5FEB\u6377\u952E\u65F6\u6536\u97F3"],["always","\u81EA\u7531\u9EA6","\u5F00\u59CB\u5BF9\u8BDD\u540E\u6301\u7EED\u542C\u53D6\u8BED\u97F3"],["wake","\u5524\u9192\u8BCD","\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\uFF0C\u518D\u8BF4\u6307\u4EE4"]].map(([ee,G,C])=>(0,y.jsxs)("label",{className:Z.choice,"data-selected":L===ee,children:[(0,y.jsx)("input",{type:"radio",name:"setup-listen","data-whale-operation":`listen-mode-${ee}`,checked:L===ee,onChange:()=>N(ee)}),(0,y.jsxs)("span",{children:[(0,y.jsx)("strong",{children:G}),(0,y.jsx)("small",{children:C})]})]},ee))})]}),d===1&&(0,y.jsxs)("section",{className:Z.section,children:[(0,y.jsx)("h3",{children:"\u600E\u4E48\u542C\u56DE\u7B54\uFF1F"}),(0,y.jsx)("fieldset",{className:Z.choices,disabled:X,children:Sd.map(([ee,G,C])=>(0,y.jsxs)("label",{className:Z.choice,"data-selected":q===ee,children:[(0,y.jsx)("input",{type:"radio",name:"setup-provider",checked:q===ee,onChange:()=>{P(ee),ee==="deepseek"&&U()}}),(0,y.jsxs)("span",{children:[(0,y.jsx)("strong",{children:G}),(0,y.jsx)("small",{children:C})]})]},ee))}),q==="edge"&&(0,y.jsx)("p",{className:Z.note,children:"\u542F\u7528\u540E\uFF0C\u6717\u8BFB\u6587\u5B57\u4F1A\u53D1\u9001\u7ED9\u5FAE\u8F6F\u3002\u8054\u7F51\u5931\u8D25\u65F6\uFF0C\u56DE\u7B54\u4F1A\u663E\u793A\u4E3A\u6587\u5B57\u3002"}),q==="deepseek"&&(0,y.jsxs)("div",{className:Z.note,"data-whale-deepseek-setup":!0,children:[(0,y.jsx)("p",{children:"\u786E\u8BA4\u7EE7\u7EED\u540E\uFF0C\u6717\u8BFB\u6587\u5B57\u4F1A\u53D1\u9001\u7ED9 DeepSeek\u3002\u5BC6\u94A5\u7531 DSH \u7BA1\u7406\uFF0C\u9C7C\u5E94\u4E0D\u4F1A\u4FDD\u5B58\u5BC6\u94A5\u3002"}),!S&&!V&&(0,y.jsx)("p",{role:"status",children:"\u6B63\u5728\u68C0\u67E5 DSH \u4E2D\u4FDD\u5B58\u7684 DeepSeek API Key\u2026"}),S&&!B&&(0,y.jsx)("p",{role:"status",children:"\u5C1A\u672A\u5728 DSH \u7684 DeepSeek API Key \u63D0\u4F9B\u5546\u4E2D\u914D\u7F6E\u5F00\u653E\u5E73\u53F0\u5BC6\u94A5\u3002"}),V&&(0,y.jsx)("p",{role:"status",children:"\u6682\u65F6\u65E0\u6CD5\u68C0\u67E5 DeepSeek API Key\u3002"}),(V||S&&!B)&&(0,y.jsx)(ce.Button,{variant:"outline",disabled:X,onClick:U,children:"\u91CD\u65B0\u68C0\u67E5 DeepSeek API Key"}),(0,y.jsxs)("label",{className:Z.inlineField,children:["DeepSeek \u97F3\u8272",(0,y.jsxs)("select",{"aria-label":"DeepSeek \u97F3\u8272",value:A,disabled:X,onChange:ee=>F(ee.target.value),children:[(0,y.jsx)("option",{value:"stella",children:"\u6D77\u661F \xB7 \u5973\u58F0"}),(0,y.jsx)("option",{value:"tide",children:"\u6697\u6F6E \xB7 \u7537\u58F0"})]})]})]}),q==="local"&&(0,y.jsx)(ur,{pickPath:c,state:e,sessionId:n,run:t,initialModelId:ge?b.ttsSetup.localModelId:null,onboarding:!0})]}),d===2&&(0,y.jsxs)("section",{className:Z.section,children:[(0,y.jsx)("h3",{children:"\u51C6\u5907\u8BED\u97F3\u8BC6\u522B"}),(0,y.jsx)("p",{children:"\u8BF4\u8BDD\u65B9\u5F0F\u548C\u6717\u8BFB\u914D\u7F6E\u5DF2\u4FDD\u5B58\u3002"}),b?.modelSetup?.asr==="whisper-wasm"&&s]}),(e.error||e.setupError)&&(0,y.jsx)("p",{role:"alert",className:Z.note,children:"\u6682\u65F6\u672A\u80FD\u5B8C\u6210\uFF0C\u6B63\u5728\u6838\u67E5\u8BBE\u7F6E\u3002"})]})}),(0,y.jsxs)("footer",{className:Z.actions,children:[(0,y.jsx)(ce.Button,{variant:"outline",disabled:u,onClick:()=>d>0?p(d-1):g(r),children:"\u4E0A\u4E00\u6B65"}),(0,y.jsx)(ce.Button,{variant:"primary",className:Z.primary,disabled:X||!b||d===1&&q==="local"&&!ge||d===1&&q==="deepseek"&&!B,onClick:()=>{ae()},children:u?"\u4FDD\u5B58\u4E2D\u2026":d===2?"\u5B8C\u6210":d===1&&z?"\u542F\u7528\u5728\u7EBF\u6717\u8BFB\u5E76\u7EE7\u7EED":d===1&&H?"\u542F\u7528 DeepSeek \u8BED\u97F3\u5408\u6210\u5E76\u7EE7\u7EED":"\u4E0B\u4E00\u6B65"})]})]})}var a=require("react/jsx-runtime"),mr=e=>e.setupOpen||e.setupStatus?.completed!==!0,Dh={ARCHIVED:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u5DF2\u5F52\u6863\u3002\u6062\u590D\u539F\u4F1A\u8BDD\u6216\u66F4\u6362\u7ED1\u5B9A\u540E\u518D\u5F00\u59CB\u8BED\u97F3\u3002",BUSY:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F\u3002\u7B49\u8FD9\u8F6E\u7ED3\u675F\u540E\u518D\u5F00\u59CB\u8BED\u97F3\u3002",UNAVAILABLE:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528\u3002\u53EF\u66F4\u6362\u7ED1\u5B9A\u6216\u89E3\u9664\u7ED1\u5B9A\u3002"},Td=e=>e.authorizationOpen||e.authorizationLoading&&!e.authorization;function Od(e){let[n,t]=(0,O.useState)(!1),o=(0,O.useRef)(null),i=(0,O.useRef)(null),r=(0,O.useRef)(null),s=(0,O.useRef)(null),c=e.useWhalePreferences(k=>k),l=e.useWhaleUi(k=>k),u=Td(l),d=u||mr(l)?"setup":l.panelView??"home",p=n&&d!=="settings",h=(0,O.useCallback)(k=>{o.current=k,e.geometry.ref(k),e.sizing.ref(k)},[e.geometry,e.sizing]),m=(0,O.useCallback)(k=>{i.current=k,e.sizing.contentRef(k)},[e.sizing]);(0,O.useEffect)(()=>{e.setPanelVisible?.(!p)},[p]),(0,O.useLayoutEffect)(()=>{i.current&&(i.current.scrollTop=0)},[d]),(0,O.useLayoutEffect)(()=>e.sizing.update(),[d,p,u]),(0,O.useEffect)(()=>{let k=o.current,N=k?.ownerDocument;s.current&&k&&N&&(N.activeElement===N.body||k.contains(N.activeElement))&&(d==="home"?k.querySelector("[data-whale-settings-trigger]")?.focus({preventScroll:!0}):d!==s.current&&k.focus({preventScroll:!0})),s.current=d},[d]);let v=k=>{let N=bd(k);N&&e.recordUserOperation?.(N)},g=()=>{t(!0),requestAnimationFrame(()=>o.current?.querySelector("[data-whale-reopen]")?.focus())},b=()=>{e.refresh?.(),t(!1),requestAnimationFrame(()=>o.current?.focus())};return(0,$d.createPortal)((0,a.jsx)("section",{ref:h,className:f.floating,"data-whale-panel":!0,"data-view":d,"data-collapsed":p||void 0,"data-motion":c.motion,tabIndex:0,"aria-label":e.t("drag"),title:e.t("dragHint"),onPointerDownCapture:()=>e.geometry.activate?.(),onFocusCapture:()=>e.geometry.activate?.(),onPointerDown:k=>{if(k.button!==0||k.pointerType&&k.pointerType!=="mouse"||!ed(k.target,k.currentTarget)){r.current=null;return}let N=k.target,D=N.getBoundingClientRect?.();D&&N.scrollHeight>N.clientHeight&&N.offsetWidth>N.clientWidth&&k.clientX>=D.left+N.clientLeft+N.clientWidth||(r.current={id:k.pointerId,x:k.clientX,y:k.clientY,moved:!1},k.target.closest?.("button")||k.currentTarget.focus({preventScroll:!0}),e.geometry.pointerDown(k,k.target.closest?.("[data-drag-surface]")??k.currentTarget))},onPointerMove:k=>{let N=r.current;!N||k.pointerId!==N.id||(Math.hypot(k.clientX-N.x,k.clientY-N.y)>=4&&(N.moved=!0),e.geometry.pointerMove(k))},onPointerUp:k=>{k.nativeEvent?.isTrusted&&r.current?.id===k.pointerId&&r.current.moved&&e.recordUserOperation?.("panel-move"),e.geometry.pointerEnd(k)},onPointerCancel:k=>{e.geometry.pointerEnd(k),r.current=null},onLostPointerCapture:e.geometry.pointerEnd,onClickCapture:k=>{r.current?.moved&&k.detail!==0?(k.preventDefault(),k.stopPropagation()):v(k),r.current=null},onChangeCapture:v,onSubmitCapture:v,onKeyDownCapture:v,onKeyDown:k=>{k.key==="Escape"&&(k.stopPropagation(),d==="setup"&&!p?g():d==="settings"?e.showHome():p||g())},children:(0,a.jsx)("div",{ref:m,className:f.panelViewport,"data-whale-content":!0,children:e.renderSlot("whale-ear.panel.controls",{collapsed:p,collapse:g,expand:b})})}),document.body)}var Id=()=>()=>{};function Rd(e){let n=e.sessionId??null,{controlContext:t}=e,o=(0,O.useSyncExternalStore)(t?.subscribe??Id,()=>t?t.sourceFor(n):n),i=(0,O.useSyncExternalStore)(t?.subscribeCurrent??Id,()=>n&&n===o&&t?.currentConversation()===n?n:null);e={...e,sessionId:o,currentConversationId:i};let r=e.useWhaleUi(v=>v),[s,c]=(0,O.useState)(!1);(0,O.useEffect)(()=>{e.setSession?.(e.sessionId)},[e.sessionId]);let l=r.repair?.offer,u=Td(r),d=r.updates?.release?.version,p=!e.collapsed&&!u&&!mr(r)&&(!l||r.repairDismissed===l.incidentId)&&r.panelView==="home"&&r.checkedFor===e.sessionId&&r.status?.enabled===!1&&r.status.ownerSessionId===null&&!r.status.voiceControlBusy&&r.status.voiceSession?.fullyStopped!==!1&&!r.busy&&!r.uncertain&&!r.updatesUnavailable&&r.updates?.status==="available"&&d&&d!==r.dismissedUpdateVersion;if((0,O.useEffect)(()=>{p&&c(!0)},[p]),l&&r.repairDismissed!==l.incidentId&&!(r.panelView==="settings"&&r.settingsTab==="repair"))return(0,a.jsxs)("section",{role:"dialog","aria-label":"\u9C7C\u5E94\u914D\u7F6E\u5931\u8D25","data-whale-repair-prompt":!0,className:f.settings,children:[(0,a.jsxs)("header",{className:f.settingsHeader,children:[(0,a.jsx)($n,{}),(0,a.jsx)("h2",{children:l.title})]}),(0,a.jsxs)("div",{className:f.settingsBody,"data-no-drag":!0,children:[(0,a.jsx)("p",{children:l.summary}),l.repairs?.length>0&&(0,a.jsx)("p",{children:"\u662F\u5426\u542F\u7528 AI \u8F85\u52A9\u914D\u7F6E\uFF1F\u52A9\u624B\u4F7F\u7528\u5F53\u524D\u8BBE\u7F6E\u7684\u6A21\u578B\uFF0C\u6700\u591A\u5C1D\u8BD5\u4E09\u8F6E\uFF0C\u6743\u9650\u4EC5\u9650\u9C7C\u5E94\u8BBE\u7F6E\u3002"}),(0,a.jsxs)("div",{className:f.actions,children:[(0,a.jsx)(W.Button,{variant:"primary",disabled:r.repairBusy,onClick:()=>{l.repairs?.length>0?e.repairRequest({operation:"start",id:l.id,confirmed:!0}):(e.dismissRepair(l.incidentId),e.openSettings("repair"))},children:l.repairs?.length>0?"\u542F\u7528 AI \u8F85\u52A9\u914D\u7F6E":"\u67E5\u770B\u6062\u590D\u65B9\u5F0F"}),(0,a.jsx)(W.Button,{variant:"outline",disabled:r.repairBusy,onClick:()=>e.dismissRepair(l.incidentId),children:"\u7A0D\u540E\u5904\u7406"})]})]})]});if(u||mr(r)){let v=mr(r);return(0,a.jsxs)(a.Fragment,{children:[e.collapsed&&(0,a.jsx)(Zd,{t:e.t,expand:e.expand}),u?(0,a.jsx)("div",{hidden:e.collapsed,children:(0,a.jsx)($h,{state:r,save:e.saveAuthorization,close:v?e.collapse:e.closeAuthorization,continueSetup:v?()=>e.closeAuthorization({resumeSetup:!0}):null})}):(0,a.jsx)("div",{role:"dialog","aria-modal":"false","aria-label":"\u9C7C\u5E94\u9996\u6B21\u914D\u7F6E","data-whale-setup":!0,hidden:e.collapsed,children:(0,a.jsx)(Ed,{pickPath:e.pickPath,state:r,sessionId:e.sessionId,run:e.run,onDismiss:e.dismissSetup,onMinimize:e.collapse,onBackToAuthorization:e.openAuthorization,asrStatus:(0,a.jsx)(Fd,{action:e.whisperAsrAction,active:!e.collapsed})})})]})}let h=v=>{c(!0),v&&e.updateAction?.({action:"check"})},m=()=>{e.dismissUpdate?.(d),c(!1)};return(0,a.jsxs)(a.Fragment,{children:[r.panelView==="settings"?(0,a.jsx)(Gh,{...e,openUpdate:h}):(0,a.jsx)(Th,{...e}),s&&(0,a.jsx)(vd,{state:r,close:m,run:e.updateAction,t:e.t})]})}function $h({state:e,save:n,close:t,continueSetup:o}){let i=e.authorization,r=e.authorizationBusy||e.authorizationLoading,s=i?.usageAgreement?.accepted===!0,c=i?.usageAgreement?.text??[];return(0,a.jsxs)("section",{role:"dialog","aria-modal":"false","aria-label":"\u9C7C\u5E94\u4F7F\u7528\u534F\u8BAE","data-whale-authorization":!0,"data-whale-intrinsic":!0,className:`${f.settings} ${f.authorization}`,children:[(0,a.jsxs)("header",{className:f.settingsHeader,children:[(0,a.jsx)($n,{}),(0,a.jsx)("h2",{children:s?"\u9C7C\u5E94\u4F7F\u7528\u534F\u8BAE":"\u6B22\u8FCE\u4F7F\u7528\u9C7C\u5E94"}),s&&!o&&(0,a.jsx)(W.Button,{variant:"outline",disabled:r,onClick:t,children:"\u8FD4\u56DE"})]}),(0,a.jsx)("div",{className:f.authorizationBody,"data-whale-authorization-body":!0,"data-no-drag":!0,children:(0,a.jsxs)("div",{"data-whale-natural-content":!0,children:[!s&&(0,a.jsx)("p",{className:f.authorizationSteps,children:"1 \u4F7F\u7528\u534F\u8BAE\u3000\xB7\u30002 \u57FA\u7840\u914D\u7F6E"}),(0,a.jsx)("h3",{children:"\u9C7C\u5E94\u64CD\u4F5C\u8303\u56F4"}),(0,a.jsx)("div",{className:f.agreement,children:c.map(l=>(0,a.jsx)("p",{children:l},l))}),e.authorizationLoading&&!i&&(0,a.jsx)("p",{role:"status",className:f.hint,children:"\u6B63\u5728\u8BFB\u53D6\u2026"}),i&&(0,a.jsxs)("details",{className:f.section,children:[(0,a.jsx)("summary",{children:"\u670D\u52A1\u4E0E\u6A21\u578B\u6765\u6E90"}),(0,a.jsx)("ul",{className:f.permissionList,children:i.scopes.map(l=>(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:l.title}),(0,a.jsx)("p",{className:f.hint,children:l.description})]},l.id))}),i.modelSources.map(l=>(0,a.jsxs)("div",{children:[(0,a.jsx)("strong",{children:l.modelId}),(0,a.jsx)("p",{className:f.hint,children:l.source}),l.runtime&&(0,a.jsxs)("p",{className:f.hint,children:["\u8FD0\u884C\u7EC4\u4EF6\uFF1A",(l.runtime.sources??[l.runtime.source]).join("\u3001")]}),(0,a.jsx)("p",{className:f.hint,children:l.licenseNote}),l.licenseUrls.map(u=>(0,a.jsx)("p",{className:f.hint,children:(0,a.jsx)("a",{href:u,target:"_blank",rel:"noreferrer",children:u})},u))]},l.modelId))]}),(e.authorizationError||i?.revocationUnconfirmed)&&(0,a.jsx)("p",{role:"alert",className:f.error,children:i?.revocationUnconfirmed?"\u505C\u6B62\u8BBE\u5907\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u68C0\u67E5\u6216\u91CD\u542F\u5BBF\u4E3B\u3002":e.authorizationUncertain?"\u4FDD\u5B58\u7ED3\u679C\u5F85\u786E\u8BA4\uFF0C\u6B63\u5728\u6838\u67E5\u3002":"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"})]})}),(0,a.jsxs)("div",{className:`${f.actions} ${f.authorizationActions}`,children:[(0,a.jsx)(W.Button,{className:f.primary,variant:"primary",disabled:!i||r||e.authorizationUncertain,onClick:()=>s&&i?.granted?(o??t)():void n(!0),children:s&&i?.granted?o?"\u7EE7\u7EED\u914D\u7F6E":"\u8FD4\u56DE":"\u4E00\u952E\u6388\u6743\u5E76\u7EE7\u7EED"}),(0,a.jsx)(W.Button,{variant:"outline",disabled:r,onClick:s&&i?.granted&&!o?()=>{n(!1)}:t,children:s&&i?.granted?o?"\u7A0D\u540E":"\u64A4\u9500\u6388\u6743":"\u6682\u4E0D\u4F7F\u7528"})]}),!s&&(0,a.jsx)("p",{className:f.hint,children:"\u4E0B\u4E00\u6B65\uFF1A\u9009\u62E9\u8BF4\u8BDD\u65B9\u5F0F\u4E0E\u8BED\u97F3\u6A21\u578B"})]})}function Zd({t:e,expand:n,markState:t="idle",compactState:o="off",enabled:i=!1}){return(0,a.jsxs)(W.Button,{className:f.bubble,"data-whale-reopen":!0,"data-whale-operation":"panel-open","data-drag-surface":!0,"aria-label":e("reopen"),title:e("title"),onClick:n,children:[(0,a.jsx)($n,{small:!0,state:t}),(0,a.jsx)("span",{className:f.bubbleBrand,children:e("title")}),(0,a.jsxs)("span",{className:f.bubbleStatus,"data-voice-state":o,children:[(0,a.jsx)(Ze,{name:i===!1?"micOff":"mic"}),(0,a.jsx)("span",{children:e("compact_"+o)})]}),(0,a.jsx)("span",{className:f.voiceBars,"data-active":o==="listening"||void 0,"aria-hidden":"true",children:[0,1,2,3,4].map(r=>(0,a.jsx)("i",{},r))}),(0,a.jsx)(Ze,{name:"down"})]})}function Th(e){let{t:n,sessionId:t}=e,o=e.useWhaleUi(me=>me),i=o.status,r=o.busy,s=o.uncertain||o.checkedFor!==null&&o.checkedFor!==t,c=e.useWhalePreferences(me=>me),l=ao(i),u=l&&o.conversationFor===t&&o.conversation?.rootSessionId===l&&!s?o.conversation:null,d=o.conversationHistoryFor===t&&!s&&(!i?.enabled||u?.rootSessionId===o.conversationHistory?.rootSessionId)?o.conversationHistory:null,p=u??{rootSessionId:d?.rootSessionId??null,items:[],latest:d?.items?.filter(me=>me.role==="assistant").at(-1)??null},h=!!(i?.enabled&&(o.conversationError||o.conversationFor===t&&o.conversation?.rootSessionId!==l)),m=i?.voiceSession?.recovery?.kind?.startsWith("helper-"),v=["predecessor-cleanup-pending","helper-cleanup-pending"].includes(i?.voiceSession?.recovery?.kind),g=["predecessor-stop-unconfirmed","helper-stop-unconfirmed"].includes(i?.voiceSession?.recovery?.kind)||/VOICE_(PREDECESSOR|HELPER)_STOP_UNCONFIRMED/.test(o.error??""),b=i?.voiceSession?.recovery?.kind==="live-root-conflict"||/VOICE_ROOT_OWNED_ELSEWHERE/.test(o.error??""),k=u?.helper??i?.helper,N=o.listenModePending?o.listenModeBefore:u?.helper&&u.revision!==o.listenModeReceiptRevision?u.helper.listenMode:i?.listenMode,D=!!(i?.enabled&&k?.online===!1),P=h||!!(i?.enabled&&N==null),L=!s&&!D&&!P&&ft.includes(N),I=r||!L||v||g||b||!i?.capabilities?.listenMode||i?.voiceControlBusy||o.visibilityUncertain||o.ttsUncertain||o.ttsCancelling,q=i?.enabled?u?.inputError:null,z=!i?.enabled&&o.enableError,w=Dh[/VOICE_EXISTING_(ARCHIVED|BUSY|UNAVAILABLE)/.exec(z??"")?.[1]],S=/VOICE_EXISTING_BINDING_CHANGED/.test(z??""),B=z&&o.settings?.voiceSession?.performanceMode==="fast"&&/VOICE_EXACT_EFFORT_HOST_REQUIRED|VOICE_FAST_/.test(z),E=t&&i?.ownerSessionId&&i.ownerSessionId!==t&&l!==t,M=i?.existingVoiceSession?.sessionId,F=o.existingSessionWritePending||o.existingSessionUnconfirmed,A=i&&!s&&o.checkedFor===t&&!F,V=A&&i.existingVoiceSession,U=A?V?Ct(V):n("dedicatedVoiceTarget"):n("checkingVoiceTarget"),H=(0,O.useId)(),X=i?.enabled&&V&&u?.retryTranscripts?.sessionId===V.sessionId?u.retryTranscripts.items:[],ge=e.currentConversationId&&A&&i.existingVoiceSessionSupported===!0&&Object.hasOwn(i,"existingVoiceSession")&&e.currentConversationId!==M&&i.enabled===!1&&e.listExistingVoiceSessions&&e.setExistingVoiceSession,ae=!!(!V&&!F&&o.checkedFor===t&&i&&!r&&!i.voiceControlBusy&&!s&&!o.ttsUncertain&&!o.ttsCancelling&&!v&&!b&&!g&&!E),ee=u?.wake??i?.wake,G=v?"pending":g||b||s||P||D?"unknown":r?"pending":u?.inputActive===!0?"input-active":i?.enabled?"authorized":"idle",[C,ve]=(0,O.useState)(null),[Ie,De]=(0,O.useState)(!1),je=o.settingsFor===t?o.settings?.values:null,Nn=je?.pttKeyboard?[...je.pttKeyboard.modifiers||[],je.pttKeyboard.code].join(" + "):je?.pttMouse?n("sideButton")+" "+je.pttMouse:null,cn=(0,O.useRef)({});(0,O.useEffect)(()=>{ve(null),De(!1)},[t,e.collapsed,M]),(0,O.useEffect)(()=>{e.setSession?.(t)},[t]),(0,O.useEffect)(()=>{!M&&C==="conversation"&&i?.enabled===!1&&e.run(t,"read-history")},[C,i?.enabled,t,M]);let at=Ku({enabled:i?.enabled,active:u?.inputActive===!0,unknown:!i||s||P||D||g||b||!!q,pending:r||v}),lt=()=>!M&&C==="conversation"&&(0,a.jsx)(cd,{conversation:p,history:d,historyLoading:o.conversationHistoryLoading,historyError:o.conversationHistoryError,historyRetryCursor:o.conversationHistoryRequestCursor,loadHistory:me=>e.run(t,"read-history",me?{cursor:me}:{}),assistantName:c.assistantName||n("assistant"),setAssistantName:e.setAssistantName,t:n,close:()=>{ve(null),cn.current.conversation?.focus()}},p.rootSessionId??"empty");return e.collapsed?(0,a.jsx)(Zd,{t:n,expand:e.expand,markState:G,compactState:at,enabled:i?.enabled??null}):(0,a.jsxs)("div",{className:f.panelContent,"data-home-controls":!0,"data-has-transcript-retry":X.length>0||void 0,"data-home-layout":[i?i.enabled?"active":"idle":"loading",fr(o,t),!!(o.error||z),!!q,D,v,g,!!V].join(":"),"data-size-detail":C==="conversation"?"true":"false",children:[(0,a.jsxs)("div",{className:f.header,children:[(0,a.jsxs)("span",{className:f.brand,children:[(0,a.jsx)($n,{state:G}),(0,a.jsx)("strong",{children:n("title")})]}),(0,a.jsxs)("div",{className:f.headerActions,children:[(0,a.jsxs)(W.Button,{className:f.newChatButton,"data-whale-operation":"new-voice-session","aria-label":n("newChat"),title:V?"\u89E3\u9664\u5DF2\u6709\u4F1A\u8BDD\u7ED1\u5B9A\u540E\u53EF\u65B0\u5EFA\u9C7C\u5E94\u4F1A\u8BDD":n(E?"newChatOtherOwner":i?.enabled?"newChatActive":"newChat"),disabled:!ae,onClick:()=>{e.run(t,"new",{expectedOwnerSessionId:i.ownerSessionId})},children:[(0,a.jsx)(Ze,{name:"plus"}),(0,a.jsx)("span",{children:n("newChat")})]}),(0,a.jsx)(W.Button,{"data-whale-settings-trigger":!0,"data-whale-operation":"page-settings",className:f.iconButton,"aria-label":n("settings"),title:n("settings"),onClick:e.openSettings,children:(0,a.jsx)(Ze,{name:"settings"})}),(0,a.jsx)(W.Button,{"data-whale-operation":"panel-close",className:f.iconButton,"aria-label":n("collapse"),title:n("collapseHint"),onClick:e.collapse,children:(0,a.jsx)(Ze,{name:"minus"})})]})]}),(0,a.jsxs)("div",{className:f.statusRow,"data-bound":!!V||void 0,"data-recording":G==="input-active"||void 0,children:[(0,a.jsxs)("div",{id:H,className:f.voiceTarget,"data-whale-voice-target":!0,children:[(0,a.jsx)("span",{children:n("voiceTarget")}),V?(0,a.jsxs)(W.Button,{variant:"outline",className:f.existingSessionHome,"data-whale-bound-session":!0,title:U,onClick:()=>{e.openSettings("sessions")},children:[(0,a.jsx)("strong",{className:f.ellipsis,children:U}),(0,a.jsx)(Ze,{name:"chevron"})]}):(0,a.jsx)("strong",{className:f.ellipsis,title:U,children:U})]}),(0,a.jsxs)("div",{className:f.voiceStatus,children:[(0,a.jsx)(Ze,{name:i?.enabled?"mic":"micOff"}),(0,a.jsx)("span",{className:f.status,role:"status",children:o.listenModePending?n(i?.enabled?"modeSwitching":"modeSaving"):r?n("pending"):i?v?n("voiceCleanupPending"):g?n("voiceRestartPending"):b?n("voiceRecoveryPending"):s?n("stale"):D?n("voiceInputUnavailable"):P?n("unknown"):q?n("inputError_"+q):u?.inputActive===!0?n("inputActive"):i.enabled&&N==="wake"?n(Yi(ee)):i.enabled?n("enabled"):n("disabled"):n("unknown")})]})]}),ge&&(0,a.jsx)(pd,{...e,sessionId:e.currentConversationId,expectedSessionId:M??null,state:o},e.currentConversationId),(0,a.jsxs)("div",{className:f.quickActions,children:[(0,a.jsx)(W.Button,{"data-whale-operation":i?.enabled||b?"stop-voice":"start-voice",className:`${f.mainAction} ${i?.enabled?"":f.primary}`,variant:i?.enabled?"outline":"primary","aria-describedby":H,disabled:!!F||r&&!(i?.enabled&&o.interruptibleRead&&!o.diagnosticStopPending)||v||g&&!i?.enabled||!i||s&&!b&&!D||!i.enabled&&!b&&(!A||V&&!Mn(V)),title:i?.enabled?n("stopConsequence"):void 0,onClick:()=>{e.run(t,i?.enabled||b?"disable":"enable",i?.enabled||b?{}:{expectedOwnerSessionId:null,expectedExistingSessionId:V?.sessionId??null})},children:v?n("voiceCleanupPending"):g?n(i?.enabled?"endConversation":"voiceRestartPending"):b?n("voiceRecoveryCheck"):i?.enabled?n("endConversation"):n("startConversation")}),(0,a.jsx)("div",{className:f.quickSegments,role:"group","aria-label":n("mode"),"aria-busy":!!o.listenModePending,"data-listen-mode":L?N:"unknown",children:ft.map(me=>(0,a.jsx)(W.Button,{"data-whale-operation":`listen-mode-${me}`,"aria-pressed":L&&N===me,disabled:!!I,onClick:()=>{N!==me&&e.run(t,"listen-mode",{mode:me})},children:n(xo(me))},me))})]}),X.length>0&&(0,a.jsx)(Oh,{items:X,pending:o.transcriptRetry,busy:r,retry:me=>e.retryVoiceTranscript?.(t,me),t:n}),(!i||s||v||g||b)&&(0,a.jsx)("p",{className:f.hint,"data-home-important":v||g||b||void 0,children:n(v?m?"voiceHelperCleanupHint":"voiceCleanupHint":g?m?"voiceHelperRestartHint":"voiceRestartHint":b?"voiceRecoveryHint":r?"readingStatus":"statusRetry")}),!s&&(!P||D)&&i?.enabled&&!v&&!g&&(0,a.jsx)("p",{className:f.hint,"data-whale-input-hint":!0,"data-home-important":q||D?!0:void 0,children:D?n("voiceInputRecoveryHint"):q?n("inputHelp_"+q):N==="wake"?n(ee?.streamOpen&&ee.detection==="asr-after-utterance"?"wakeFallbackHint":"wakeHint"):N==="always"?n("alwaysWarning"):Nn?n("holdToSpeak")+" "+Nn:n("bindingMissing")}),i&&!s&&!i.capabilities?.listenMode&&(0,a.jsx)("p",{className:f.hint,children:n("modeUnavailable")}),o.listenModeError&&(0,a.jsx)("p",{role:"alert","data-whale-mode-error":!0,className:f.error,children:n(o.uncertain?"modeSwitchUnconfirmed":"modeSwitchFailed")}),o.readOnlyFailure&&s&&!b&&!g&&(0,a.jsx)(W.Button,{variant:"outline",disabled:r,onClick:()=>{e.run(t,"status")},children:n("retryStatus")}),(o.error||z)&&!o.readOnlyFailure&&!w&&!o.listenModeError&&!b&&!g&&(0,a.jsx)("p",{role:"alert",className:f.error,children:n(S?"voiceTargetChanged":B?"performanceFastUnavailable":!o.uncertain&&z?"enableFailed":"operationUnavailable")}),w&&(0,a.jsxs)("p",{role:"alert",className:f.notice,children:[w," ",(0,a.jsx)(W.Button,{variant:"outline",onClick:()=>{e.openSettings("sessions")},children:"\u7BA1\u7406\u7ED1\u5B9A"})]}),/VOICE_SESSION_ARCHIVED/.test(z??o.error??"")&&(0,a.jsxs)("p",{className:f.notice,children:["\u539F\u8BED\u97F3\u4F1A\u8BDD\u5DF2\u5F52\u6863\u3002",(0,a.jsx)(W.Button,{variant:"outline",onClick:()=>{e.openSettings("sessions")},children:"\u6062\u590D\u539F\u4F1A\u8BDD"})]}),/VOICE_ASR_(?:PREPARING|PREPARE_FAILED)/.test(z??o.error??"")&&(0,a.jsxs)("p",{className:f.notice,children:["Whisper Base \u5C1A\u672A\u5C31\u7EEA\u3002",(0,a.jsx)(W.Button,{variant:"outline",onClick:()=>{e.openSettings("models","download")},children:"\u67E5\u770B\u6A21\u578B\u8FDB\u5EA6"})]}),/VOICE_MODEL_REQUIRED/.test(z??o.error??"")&&(0,a.jsxs)("p",{className:f.notice,children:["\u8BF7\u5148\u9009\u62E9\u53EF\u7528\u7684\u5BF9\u8BDD\u6A21\u578B\u3002",(0,a.jsx)(W.Button,{variant:"outline",onClick:()=>{e.openSettings("models","conversation")},children:"\u8BBE\u7F6E\u5BF9\u8BDD\u6A21\u578B"})]}),V&&!Mn(V)&&(0,a.jsx)("p",{className:f.hint,"data-home-important":!0,children:fo(V)}),u?.providerError&&(0,a.jsx)("p",{role:"alert","data-home-important":!0,"data-whale-provider-error":!0,className:f.error,children:u.providerError}),(0,a.jsx)(ud,{...e,state:o}),!V&&!o.error&&!q&&!b&&!g&&!v&&!D&&!P&&(0,a.jsx)(Rh,{...e,state:o}),Ie&&(0,a.jsx)("p",{role:"alert",className:f.notice,children:"DSH \u6682\u65F6\u65E0\u6CD5\u6253\u5F00\u539F\u4F1A\u8BDD\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"}),Mn(V)&&e.openExistingVoiceSession&&(0,a.jsxs)(W.Button,{className:f.caption,"data-whale-operation":"open-native-session","aria-label":"\u6253\u5F00\u539F\u4F1A\u8BDD",onClick:async()=>{De(!1);try{await e.openExistingVoiceSession(V.sessionId)}catch{De(!0)}},children:[u?.latest?.text&&(0,a.jsx)("span",{className:f.ellipsis,children:u.latest.text}),(0,a.jsx)("span",{className:f.openOriginal,children:"\u6253\u5F00\u539F\u4F1A\u8BDD"}),(0,a.jsx)(Ze,{name:"chevron"})]}),i&&!M&&(0,a.jsxs)(W.Button,{ref:me=>{cn.current.conversation=me},className:f.caption,onClick:()=>{let me=C!=="conversation";ve(me?"conversation":null),me&&e.run(t,"read-history")},"aria-label":n("recentConversation"),"aria-expanded":C==="conversation",children:[(0,a.jsxs)("span",{className:f.ellipsis,children:[p.latest?.state==="speech-failed"?n("speechFailed")+": ":p.latest?.state==="interrupted"?n("speechInterrupted")+": ":"",p.latest?.text??n(o.newChatFor===t?"newChatCreated":"viewConversation")]}),(0,a.jsx)(Ze,{name:"chevron"})]}),lt()]})}function Oh({items:e,pending:n,busy:t,retry:o,t:i}){let r=(0,O.useId)();return(0,a.jsxs)("section",{className:f.transcriptRetries,"aria-labelledby":r,"data-whale-transcript-retries":!0,"data-no-drag":!0,children:[(0,a.jsxs)("header",{children:[(0,a.jsx)("h2",{id:r,children:i("retryTranscripts")}),(0,a.jsx)("p",{children:i("endDiscardsRetries")})]}),(0,a.jsx)("ul",{className:f.transcriptRetryList,tabIndex:0,"aria-labelledby":r,children:e.map(s=>{let c=n?.id===s.id&&s.state==="ready"?n.state:s.state,l={busy:"retryTranscriptBusy",sending:"retryTranscriptSending",uncertain:"retryTranscriptUncertain"}[c];return(0,a.jsxs)("li",{className:f.transcriptRetry,"data-retry-state":c,children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:f.transcriptRetryText,children:s.text}),l&&(0,a.jsx)("p",{className:f.hint,role:"status",children:i(l)})]}),(0,a.jsx)(W.Button,{variant:"outline",disabled:t||!!n||c!=="ready",onClick:()=>{o(s.id)},"data-whale-operation":"retry-voice-transcript",children:i("retryTranscript")})]},s.id)})})]})}function fr(e,n){let t=e.status;return!!(e.settings?.revision&&e.checkedFor===n&&e.settingsFor===n&&!e.uncertain&&!e.visibilityUncertain&&!e.settingsConflict&&!e.ttsUncertain&&!e.ttsCancelling&&t?.enabled===!1&&t.ownerSessionId===null&&t.voiceControlBusy===!1&&t.voiceSession?.fullyStopped===!0&&t.voiceSession?.id===null)}function Rh({state:e,sessionId:n,t,run:o,readState:i}){let r=(0,O.useRef)(0);(0,O.useEffect)(()=>()=>{r.current++},[n]);let s=e.status,c=e.checkedFor===n&&e.settingsFor===n,l=fr(e,n),u=e.settings?.voiceSession?.performanceMode,d=e.performanceFor===n?e.performance:null,p=["fast","balanced","high"].filter(g=>!d||d.modes?.find(b=>b.performanceMode===g)?.available),h=e.performancePending||e.performanceError||["host_contract_blocked","unknown","pending","running"].includes(d?.probe?.status)||d?.modes?.some(g=>["host_contract_blocked","unknown"].includes(g.reason)),m=e.busy||e.performancePending||e.uncertain||e.visibilityUncertain||!l,v=async g=>{if(m||g===u)return;let b=++r.current;if(!await o(n,"inspect-performance")||b!==r.current)return;let k=i?.();!k||!fr(k,n)||k.settingsFor!==n||k.checkedFor!==n||k.performanceFor!==n||k.busy||k.uncertain||k.visibilityUncertain||k.status?.enabled!==!1||k.status.ownerSessionId!==null||k.status.voiceControlBusy!==!1||k.status.voiceSession?.fullyStopped!==!0||k.status.voiceSession?.id!==null||!k.performance?.modes?.find(N=>N.performanceMode===g)?.available||await o(n,"set-performance-mode",{revision:k.settings.revision,performanceMode:g})};return!l||!p.length?null:(0,a.jsxs)("section",{className:f.quickSpeed,"aria-label":t("performanceTitle"),children:[(0,a.jsxs)("div",{className:f.quickSpeedHeader,children:[(0,a.jsx)("span",{children:t("performanceTitle")}),u==="compatibility"&&(0,a.jsx)("small",{children:t("performance_compatibility")})]}),(0,a.jsx)("div",{className:f.quickSegments,children:p.map(g=>(0,a.jsxs)(W.Button,{"aria-pressed":u===g,disabled:m||d&&!d.modes?.find(b=>b.performanceMode===g)?.available,title:t(l?d&&!d.modes?.find(b=>b.performanceMode===g)?.available?"performanceUnavailable":g==="fast"?"performanceFastHint":"performance_"+g:"performanceStopRequired"),onClick:()=>{v(g)},children:[u===g&&(0,a.jsx)(Ze,{name:"check"}),(0,a.jsx)(Ud,{value:g,t})]},g))}),(0,a.jsx)(Hd,{capability:d,t,compact:!0,pending:e.performancePending,error:e.performanceError}),!h&&l&&d?.modes?.some(g=>!g.available)&&(0,a.jsx)("p",{className:f.quickHint,title:t("performanceUnavailable"),children:t("performanceUnavailable")})]})}function Zh({settings:e,sessionId:n,busy:t,run:o,t:i,status:r,verified:s,statusFresh:c,tab:l,markSettingsEdited:u,discardSettingsDraft:d,bindingError:p,captureBindings:h}){let[m,v]=(0,O.useState)(e.values.device??null),[g,b]=(0,O.useState)(e.values.pttMouse),[k,N]=(0,O.useState)(e.values.pttKeyboard??null),[D,P]=(0,O.useState)(e.values.speakerVerification.enabled),L=e.capabilities?.turnSignals===!0,[I,q]=(0,O.useState)(e.values.turnSignals?.enabled??!1),[z,w]=(0,O.useState)(e.values.turnSignals?.volume?.toString()??""),[S,B]=(0,O.useState)((e.values.wakeWordAliases??["\u5C0F\u9CB8\u9C7C"]).join("\uFF0C")),[E,M]=(0,O.useState)(String((e.values.wakeListenTimeoutMs??1e4)/1e3)),F=es(S),A=ko(F)&&Number.isInteger(Number(E)*1e3)&&Number(E)>=3&&Number(E)<=30,V=JSON.stringify(F)!==JSON.stringify(e.values.wakeWordAliases??["\u5C0F\u9CB8\u9C7C"])||Number(E)*1e3!==(e.values.wakeListenTimeoutMs??1e4),[U,H]=(0,O.useState)(e.values.semanticExperimental===!0),[X,ge]=(0,O.useState)(e.values.turnSignals?.headphonesConfirmed??!1),[ae,ee]=(0,O.useState)(e.values.turnSignals?.experimentalAutomaticBargeIn??!1),G=g!==e.values.pttMouse||JSON.stringify(k)!==JSON.stringify(e.values.pttKeyboard??null),[C,ve]=(0,O.useState)(!1),Ie=c?r?.inputDevices:null,De=m!==null&&typeof m=="object",je=De||m==null||m===""||Ie?.items?.some(ie=>typeof m=="number"&&ie.index===m),Nn=C==="index"&&(String(m??"").trim()===""||!/^\d+$/.test(String(m).trim())||!Number.isSafeInteger(Number(m))),cn=t||!c||r?.enabled!==!1||r?.ownerSessionId!==null||r?.voiceControlBusy!==!1||r?.voiceSession?.fullyStopped!==!0,at=()=>{if(t||!A||Nn||V&&cn)return;let ie=De&&!C?m:C==="index"?Number(m):m==null||m===""?null:C==="name"?String(m).trim():typeof m=="number"?m:m.trim();o(n,"save-settings",{revision:e.revision,values:{wakeWordAliases:F,wakeListenTimeoutMs:Number(E)*1e3,semanticExperimental:U,device:ie,pttMouse:e.values.pttMouse,...e.capabilities?.pttKeyboard?{pttKeyboard:e.values.pttKeyboard??null}:{},speakerVerification:{enabled:D},...L?{turnSignals:{enabled:I,volume:Number(z),headphonesConfirmed:X,experimentalAutomaticBargeIn:ae}}:{}}})},lt=(0,a.jsx)(W.Button,{className:f.primary,variant:"primary",disabled:t||!A||Nn||V&&cn||L&&(z.trim()===""||!Number.isFinite(Number(z))||Number(z)<0||Number(z)>1),onClick:at,children:i(t?"pending":"save")}),me=De?m.name:Ie?.items?.find(ie=>ie.index===m)?.name??(m==null||m===""?i("deviceDefault"):String(m));return(0,a.jsxs)("div",{className:f.section,"data-settings-draft":"save-settings",children:[(0,a.jsxs)("div",{hidden:l!=="audio",className:f.section,children:[(0,a.jsx)("h3",{children:i("mode")}),(0,a.jsxs)("p",{className:f.hint,children:["\u5F53\u524D\uFF1A",i(xo(r?.listenMode??e.listenMode))]}),(0,a.jsx)("div",{className:f.segmented,children:["ptt","always","wake"].map(ie=>(0,a.jsx)(W.Button,{"data-whale-operation":`listen-mode-${ie}`,variant:"outline","aria-pressed":(r?.listenMode??e.listenMode)===ie,disabled:!e.capabilities?.listenMode||!s||t,onClick:()=>{o(n,"listen-mode",{mode:ie})},children:i(xo(ie))},ie))}),(!e.capabilities?.listenMode||!s)&&(0,a.jsx)("p",{className:f.hint,children:i(e.capabilities?.listenMode?"modeNeedsGrant":"modeUnavailable")}),(0,a.jsxs)("div",{className:f.inlineActions,children:[(0,a.jsxs)("label",{className:f.inlineField,children:[i("device"),(0,a.jsxs)("select",{title:me,className:f.deviceSelect,"aria-label":i("device"),disabled:t,value:C?"__manual-"+C:De?"__stable":je?m??"":"__saved",onChange:ie=>{let un=ie.target.value;un.startsWith("__manual-")?(ve(un.slice(9)),De&&v("")):un!=="__saved"&&un!=="__stable"&&(ve(!1),v(un===""?null:Number(un)))},children:[(0,a.jsx)("option",{value:"",children:i("deviceDefault")}),De&&(0,a.jsx)("option",{value:"__stable",children:m.name}),Ie?.items?.map(ie=>(0,a.jsxs)("option",{value:String(ie.index),children:[ie.name," (",ie.index,")"]},ie.index)),!je&&(0,a.jsxs)("option",{value:"__saved",children:[i("deviceSaved"),": ",m]}),(0,a.jsx)("option",{value:"__manual-index",children:i("deviceManualIndex")}),(0,a.jsx)("option",{value:"__manual-name",children:i("deviceManualName")})]})]}),lt]}),me.length>22&&(0,a.jsxs)("details",{className:f.fullName,children:[(0,a.jsx)("summary",{children:"\u67E5\u770B\u8BBE\u5907\u5168\u540D"}),(0,a.jsx)("p",{children:me})]}),(C||!je)&&(0,a.jsxs)("label",{className:f.field,children:[i("deviceManual"),(0,a.jsx)(W.Input,{"aria-label":i("deviceManual"),disabled:t,value:m??"",onChange:ie=>{C||ve(typeof m=="number"?"index":"name"),v(ie.target.value)}})]}),Nn&&(0,a.jsx)("p",{className:f.notice,children:i("deviceIndexInvalid")}),Ie?.status!=="available"&&(0,a.jsx)("p",{className:f.hint,children:i(Ie?.status==="empty"?"deviceEmpty":"deviceUnknown")})]}),(0,a.jsxs)("div",{hidden:l!=="interaction",className:f.section,children:[(0,a.jsx)("p",{className:f.hint,children:"\u5BF9\u8BDD\u4E2D\u53EF\u9009\u62E9\u5E76\u5E94\u7528\u6309\u952E\u3002\u5E94\u7528\u524D\u8BF7\u677E\u5F00\u6309\u952E\uFF0C\u7B49\u5F85\u5F53\u524D\u5F55\u97F3\u5904\u7406\u5B8C\u6210\u3002"}),p&&(0,a.jsx)("p",{role:"alert",className:f.notice,children:/RECORDING|KEYS_HELD/.test(p)?"\u8BF7\u5148\u677E\u5F00\u6309\u952E\uFF0C\u5E76\u7B49\u5F85\u5F53\u524D\u5F55\u97F3\u5904\u7406\u5B8C\u6210\uFF0C\u518D\u5E94\u7528\u3002":/UNCONFIRMED|STOP_UNCONFIRMED|ROLLBACK_UNCONFIRMED/.test(p)?"\u6309\u952E\u72B6\u6001\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u91CD\u542F DSH \u518D\u6838\u67E5\u6309\u952E\u3002":/STALE|配置已改变|语音会话已改变/.test(p)?"\u914D\u7F6E\u6216\u8BED\u97F3\u4F1A\u8BDD\u5DF2\u6539\u53D8\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6\u540E\u518D\u5E94\u7528\u3002":/UNSUPPORTED/.test(p)?"\u5F53\u524D\u7CFB\u7EDF\u4E0D\u652F\u6301\u5728\u5BF9\u8BDD\u4E2D\u66F4\u6362\u5168\u5C40\u6309\u952E\u3002":"\u6309\u952E\u672A\u80FD\u5E94\u7528\uFF0C\u8BF7\u67E5\u770B\u9AD8\u7EA7\u8BE6\u60C5\u3002"}),(0,a.jsxs)("div",{"data-settings-draft":"save-bindings",children:[(0,a.jsx)(Hh,{captureBindings:h,sessionId:n,active:l==="interaction",value:k,onChange:ie=>{u?.("save-bindings"),N(ie)},capability:e.capabilities?.pttKeyboard,disabled:t||!c,t:i}),(0,a.jsxs)("fieldset",{className:f.radios,disabled:t||!c,children:[(0,a.jsx)("legend",{children:i("sideButton")}),[0,1,2].map((ie,un)=>(0,a.jsxs)("label",{children:[(0,a.jsx)("input",{type:"radio",name:"whale-ear-mouse",value:ie,checked:g===ie,onChange:()=>{u?.("save-bindings"),b(ie)}}),i(["sideOff","sideOne","sideTwo"][un])]},ie))]}),(0,a.jsx)(W.Button,{variant:"primary",disabled:t||!c||!G||!e.bindingContext||k?.code==="F4"&&k.modifiers.includes("Alt"),onClick:()=>{o(n,"save-bindings",{revision:e.revision,bindingContext:e.bindingContext,values:{pttMouse:g,pttKeyboard:k}})},children:"\u5E94\u7528\u6309\u952E"}),(0,a.jsx)(W.Button,{variant:"outline",disabled:t||!G,onClick:()=>{b(e.values.pttMouse),N(e.values.pttKeyboard??null),d?.("save-bindings")},children:"\u53D6\u6D88\u4FEE\u6539"})]})]}),(0,a.jsxs)("div",{hidden:l!=="advanced"||!e.values.speakerVerification.enabled,className:f.section,children:[e.values.speakerVerification.enabled&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(Ft,{label:i("speaker"),checked:D,disabled:t,onChange:P}),(0,a.jsx)("p",{className:f.hint,children:i("speakerHint")})]}),(0,a.jsx)("p",{className:f.hint,children:i("savedHint")})]}),(0,a.jsxs)("div",{hidden:l!=="audio",className:f.disclosureRow,children:[(0,a.jsxs)("details",{className:f.section,children:[(0,a.jsx)("summary",{children:i("wakeSettings")}),(0,a.jsx)("p",{className:f.hint,children:i("wakeMethod")}),(0,a.jsxs)("label",{className:f.field,children:[i("wakeAliases"),(0,a.jsx)(W.Input,{"aria-label":i("wakeAliases"),maxLength:208,value:S,disabled:cn,onChange:ie=>B(ie.target.value)})]}),(0,a.jsx)("p",{className:f.hint,children:i("wakeAliasesHint")}),(0,a.jsxs)("label",{className:f.field,children:[i("wakeTimeout"),(0,a.jsx)(W.Input,{"aria-label":i("wakeTimeout"),type:"number",min:"3",max:"30",step:"1",value:E,disabled:cn,onChange:ie=>M(ie.target.value)})]}),cn&&(0,a.jsx)("p",{className:f.hint,children:i("wakeStopToEdit")}),!A&&(0,a.jsx)("p",{role:"alert",className:f.notice,children:i("wakeInvalid")})]}),(0,a.jsxs)("details",{className:f.section,children:[(0,a.jsx)("summary",{children:i("soundTitle")}),(0,a.jsx)(Ft,{label:i("soundEnabled"),checked:I,disabled:!L||t,onChange:q}),(0,a.jsxs)("label",{className:f.field,children:[i("soundVolume"),(0,a.jsx)(Zt,{"aria-label":i("soundVolume")+"\u6ED1\u5757",min:"0",max:"1",step:"0.05",value:z,disabled:!L||t,onChange:ie=>w(ie.target.value)}),(0,a.jsx)(W.Input,{type:"number",min:"0",max:"1",step:"0.05","aria-label":i("soundVolume"),disabled:!L||t,value:z,onChange:ie=>w(ie.target.value)})]}),(0,a.jsx)(Ft,{label:"\u5B9E\u9A8C\u6027\u5524\u9192\u5224\u65AD\uFF08\u9ED8\u8BA4\u5173\u95ED\uFF09",checked:U,disabled:t,onChange:H}),(0,a.jsx)("p",{className:f.hint,children:"\u5173\u95ED\u65F6\uFF0C\u81EA\u7531\u9EA6\u76F4\u63A5\u542C\u53D6\u6709\u6548\u8BED\u97F3\uFF1B\u5F00\u542F\u540E\u4F7F\u7528\u5524\u9192\u8BCD\u6216\u8BED\u4E49\u5224\u65AD\uFF0C\u53EF\u80FD\u6F0F\u5524\u9192\u3002\u5EFA\u8BAE\u4F7F\u7528\u8033\u673A\u51CF\u5C11\u56DE\u58F0\u3002"}),(0,a.jsx)(W.Checkbox,{label:i("headphones"),checked:X,disabled:!L||t,onChange:ie=>{ge(ie),ie||ee(!1)}}),(0,a.jsx)("p",{className:f.hint,children:i("headphonesHint")}),(0,a.jsx)(Ft,{label:i("automaticBargeIn"),checked:ae,disabled:!L||!X||t,onChange:ee}),L&&!X&&(0,a.jsx)("p",{className:f.hint,children:i("headphonesRequired")}),(0,a.jsx)("p",{className:f.hint,children:i(L?"soundAvailable":"soundUnavailable")})]})]}),(0,a.jsx)("div",{className:f.formActions,hidden:l!=="interaction"&&!(l==="advanced"&&e.values.speakerVerification.enabled),children:lt})]})}function Fd({action:e,active:n}){let[t,o]=(0,O.useState)(null),[i,r]=(0,O.useState)(0),s=(0,O.useRef)(0);if((0,O.useEffect)(()=>{if(!e||!n)return;let p=new AbortController,h,m=async g=>{try{let b=await e({operation:g},p.signal);if(p.signal.aborted)return;o(b),(g==="retry"||["idle","downloading"].includes(b.state)||b.acceleration&&["idle","downloading"].includes(b.acceleration.state))&&(h=setTimeout(()=>{m("status")},1e3))}catch{p.signal.aborted||o({state:"unavailable"})}},v=i>s.current?"retry":"status";return s.current=i,m(v),()=>{clearTimeout(h),p.abort()}},[e,n,i]),!e||!n)return null;let c=t?.totalBytes>0&&t?.state==="downloading",l=t?.acceleration,u=l?.totalBytes>0&&l?.state==="downloading",d=p=>(p/1e6).toFixed(1);return(0,a.jsxs)("div",{className:f.section,"data-whale-whisper-base":!0,children:[(0,a.jsx)("h3",{children:"Whisper Base"}),(0,a.jsx)("p",{role:"status",children:t?.state==="ready"?"\u5DF2\u5C31\u7EEA\uFF0C\u53EF\u79BB\u7EBF\u8BC6\u522B\u3002":t?.state==="error"?t.message:t?.state==="unavailable"?"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u6A21\u578B\u72B6\u6001\u3002":c?`\u6B63\u5728\u4E0B\u8F7D \xB7 ${d(t.receivedBytes)} / ${d(t.totalBytes)} MB`:"\u6B63\u5728\u51C6\u5907\u672C\u5730\u8BC6\u522B\u6A21\u578B\u2026"}),c&&(0,a.jsx)("progress",{"aria-label":"Whisper Base \u4E0B\u8F7D\u8FDB\u5EA6",value:t.receivedBytes,max:t.totalBytes}),l&&(0,a.jsxs)("div",{className:f.section,"data-whale-asr-acceleration":!0,children:[(0,a.jsx)("h3",{children:"\u539F\u751F\u52A0\u901F"}),(0,a.jsx)("p",{className:f.hint,role:"status",children:l.state==="ready"?"\u52A0\u901F\u7EC4\u4EF6\u5DF2\u5C31\u7EEA\u3002":l.state==="error"?"\u52A0\u901F\u7EC4\u4EF6\u4E0B\u8F7D\u5931\u8D25\u3002":u?`\u6B63\u5728\u4E0B\u8F7D \xB7 ${d(l.receivedBytes)} / ${d(l.totalBytes)} MB`:"\u6B63\u5728\u51C6\u5907\u52A0\u901F\u7EC4\u4EF6\u2026"}),u&&(0,a.jsx)("progress",{"aria-label":"\u539F\u751F\u52A0\u901F\u4E0B\u8F7D\u8FDB\u5EA6",value:l.receivedBytes,max:l.totalBytes})]}),(t?.state==="error"||l?.state==="error")&&(0,a.jsx)(W.Button,{variant:"outline",onClick:()=>{o(p=>p?.state==="ready"?{...p,acceleration:{...p.acceleration,state:"idle"}}:null),r(p=>p+1)},children:"\u91CD\u8BD5\u4E0B\u8F7D"})]})}function Fh({settings:e,sessionId:n,busy:t,run:o,t:i,pickPath:r,active:s,modelTab:c,markSettingsEdited:l,whisperAsrAction:u}){let[d,p]=(0,O.useState)(e.modelSetup.asr),[h,m]=(0,O.useState)(e.modelSetup.modelCompute??"cpu"),[v,g]=(0,O.useState)(e.modelSetup.models),b=t,k=()=>l?.("save-models"),N=()=>{o(n,"save-models",{revision:e.revision,values:{asr:d,modelCompute:d==="whisper-wasm"?"cpu":h,models:v}})};return(0,a.jsxs)("section",{className:f.section,"data-settings-draft":"save-models",hidden:!["download","paths"].includes(c),children:[(0,a.jsxs)("div",{"data-whale-tab-panel":!0,hidden:c!=="download",children:[(0,a.jsx)(Fd,{action:u,active:s&&c==="download"&&e.modelSetup.asr==="whisper-wasm"}),(0,a.jsxs)("details",{className:f.section,children:[(0,a.jsx)("summary",{children:"\u5F53\u524D\u8BC6\u522B\u6A21\u578B\u4E0E\u8BA1\u7B97\u8BBE\u5907"}),(0,a.jsxs)("div",{className:f.section,children:[(0,a.jsxs)("fieldset",{className:f.radios,disabled:b,children:[(0,a.jsx)("legend",{children:"\u8BC6\u522B\u6A21\u578B"}),[["whisper-wasm","Whisper Base\uFF08\u81EA\u52A8\u4E0B\u8F7D\uFF09"],["sensevoice","SenseVoice"],["whisper","Whisper"]].map(([D,P])=>(0,a.jsxs)("label",{children:[(0,a.jsx)("input",{type:"radio",name:"whale-ear-asr",checked:d===D,onChange:()=>{p(D),D==="whisper-wasm"&&m("cpu"),D==="sensevoice"&&h==="cuda"&&m("auto"),k()}}),P]},D))]}),d==="whisper-wasm"?(0,a.jsx)("p",{className:f.hint,children:"\u4F7F\u7528 CPU \u8BC6\u522B\u666E\u901A\u8BDD\uFF0C\u6A21\u578B\u548C\u8FD0\u884C\u65F6\u7531\u9C7C\u5E94\u81EA\u52A8\u4E0B\u8F7D\u3002"}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("label",{className:f.inlineField,children:["\u8BC6\u522B\u8BA1\u7B97\u8BBE\u5907",(0,a.jsxs)("select",{value:h,disabled:b,onChange:D=>{m(D.target.value),k()},children:[(0,a.jsx)("option",{value:"cpu",children:"CPU"}),(0,a.jsx)("option",{value:"auto",children:"\u81EA\u52A8 GPU \xB7 CPU \u515C\u5E95"}),d==="whisper"&&(0,a.jsx)("option",{value:"cuda",children:"CUDA / HIP \xB7 CPU \u515C\u5E95"})]})]}),(0,a.jsx)("p",{className:f.hint,children:d==="sensevoice"?"\u6B64 SenseVoice INT8 \u7EC4\u5408\u76EE\u524D\u4F7F\u7528 CPU\u3002":"GPU \u53EF\u7528\u6027\u4ECD\u9700\u5DF2\u5B89\u88C5\u8FD0\u884C\u65F6\u4E0E\u6A21\u578B\u5B9E\u9645\u63A8\u7406\u9A8C\u8BC1\u3002"})]}),(0,a.jsx)(W.Button,{variant:"outline",disabled:b,onClick:N,children:"\u4FDD\u5B58\u8BC6\u522B\u6A21\u578B"})]})]})]}),(0,a.jsxs)("div",{hidden:c!=="paths",className:f.section,children:[(0,a.jsx)("h3",{children:"\u8BC6\u522B\u6A21\u578B\u672C\u5730\u8DEF\u5F84"}),(0,a.jsx)("p",{className:f.hint,children:"\u8BC6\u522B\u548C\u6717\u8BFB\u6A21\u578B\u5747\u5728\u201C\u6A21\u578B\u4E0B\u8F7D\u201D\u4E2D\u9009\u62E9\uFF1B\u8FD9\u91CC\u7BA1\u7406\u672C\u673A\u5DF2\u6709\u6587\u4EF6\u3002"}),[["sensevoiceDir","sensevoicePath"],["whisper","whisperPath"],["campplus","campplusPath"]].map(([D,P])=>(0,a.jsx)(po,{className:f.pathRow,label:i(P),kind:D,value:v[D],disabled:b,active:s&&c==="paths",pickPath:r,sessionId:n,scope:d,onChange:L=>{k(),g(I=>({...I,[D]:L}))}},D)),(0,a.jsx)(W.Button,{variant:"outline",disabled:b,onClick:N,children:i("saveModels")})]})]})}function Uh({settings:e,state:n,sessionId:t,run:o,t:i}){let[r,s]=(0,O.useState)(e.voiceSession.visibility),c=n.settingsFor===t,l=n.checkedFor===t&&n.status!==null,u=l?n.status.voiceCapabilities:e.voiceCapabilities,d=l?n.status.voiceSession:null,p=l&&(n.status.enabled||n.status.ownerSessionId!==null||d?.id!=null),h=l&&n.status.voiceControlBusy===!1,m=n.busy||n.uncertain||!c||!l||!h||p,v=g=>i(g==="workspace"?"workspaceMode":"hiddenMode");return(0,a.jsxs)("section",{className:f.section,"data-whale-visibility":!0,"data-settings-draft":"set-visibility",children:[(0,a.jsx)("h3",{children:i("capabilityTitle")}),(0,a.jsx)("dl",{className:f.details,children:["hidden","workspace"].map(g=>(0,a.jsxs)("div",{className:f.capabilityRow,children:[(0,a.jsx)("dt",{children:v(g)}),(0,a.jsxs)("dd",{children:[i(u?.[g]?.supported?"supported":"unsupported"),u?.[g]?.reason?` \xB7 ${u[g].reason}`:""]})]},g))}),(0,a.jsxs)("p",{className:f.hint,children:[i("taskCapability"),": ",i(u?.taskHandoff?.supported?"supported":"unsupported")," \xB7 ",u?.taskHandoff?.mode??i("unknown"),u?.taskHandoff?.reason?` \xB7 ${u.taskHandoff.reason}`:""]}),(0,a.jsxs)("p",{children:[i("configuredMode"),": ",v(e.voiceSession.visibility)]}),(0,a.jsx)("p",{className:f.hint,children:l?d?.id?`${i("currentVoiceMode")}: ${d.presentation?.requested?v(d.presentation.requested):i("unknown")} \xB7 ${d.id}`:i("noActiveVoice"):i("modeReadFirst")}),(0,a.jsxs)("fieldset",{className:f.radios,disabled:m,children:[(0,a.jsx)("legend",{children:i("chooseVisibility")}),(0,a.jsxs)("label",{children:[(0,a.jsx)("input",{type:"radio",name:"whale-ear-visibility",checked:r==="hidden",onChange:()=>s("hidden")}),i("hiddenMode")]}),(0,a.jsxs)("label",{children:[(0,a.jsx)("input",{type:"radio",name:"whale-ear-visibility",checked:r==="workspace",disabled:!u?.workspace?.supported,onChange:()=>s("workspace")}),i("workspaceMode")]})]}),(0,a.jsx)("p",{className:f.hint,children:i("workspaceWarning")}),(0,a.jsx)("p",{className:f.hint,children:i("visibilityNoMigration")}),(!c||!l)&&(0,a.jsx)("p",{className:f.hint,children:i("modeReadFirst")}),p&&(0,a.jsx)("p",{className:f.hint,children:i("closeBeforeMode")}),l&&!h&&(0,a.jsx)("p",{className:f.hint,children:i("modeControlPending")}),(0,a.jsx)("div",{children:(0,a.jsx)(W.Button,{variant:"outline",disabled:m||r===e.voiceSession.visibility||r==="workspace"&&!u?.workspace?.supported,onClick:()=>{o(t,"set-visibility",{revision:e.revision,visibility:r})},children:i(r==="workspace"?"saveWorkspace":"saveHidden")})})]})}function Hh({value:e,onChange:n,capability:t,disabled:o,t:i,captureBindings:r,sessionId:s,active:c}){let[l,u]=(0,O.useState)(!1),[d,p]=(0,O.useState)(!1),[h,m]=(0,O.useState)(null),v=(0,O.useRef)(null),g=(0,O.useRef)(0),b=(0,O.useRef)(null),k=(0,O.useRef)(!0),N=async L=>{g.current++,k.current&&u(!1);let I=v.current;if(I){k.current&&p(!0);try{await r(I.sessionId,{operation:"end",token:I.token}),v.current===I&&(v.current=null),k.current&&L&&n(L),k.current&&m(null)}catch(q){k.current&&m(String(q.message||q))}finally{k.current&&p(!1)}}},D=async()=>{if(v.current||d)return;let L=++g.current;p(!0),m(null);try{let I=await r(s,{operation:"begin"});if(v.current={...I,sessionId:s},!k.current||L!==g.current){await N();return}u(!0),b.current?.focus()}catch(I){k.current&&m(String(I.message||I))}finally{k.current&&p(!1)}};(0,O.useEffect)(()=>(k.current=!0,()=>{k.current=!1,N()}),[]),(0,O.useEffect)(()=>{(!c||o)&&(g.current++,N())},[c,o,s]),(0,O.useEffect)(()=>{if(!l)return;let L=null,I=B=>{if(B.preventDefault(),B.stopPropagation(),B.code==="Escape"){L=null;return}B.repeat||B.isComposing||(L=nd(B),!L&&!["ControlLeft","ControlRight","AltLeft","AltRight","ShiftLeft","ShiftRight"].includes(B.code)&&m(i("bindingUnsupported")))},q=B=>{if(B.preventDefault(),B.stopPropagation(),B.code==="Escape"){N();return}if(L&&!B.ctrlKey&&!B.altKey&&!B.shiftKey){let E=L;L=null,N(E)}},z=()=>{N()},w=()=>{document.hidden&&z()};window.addEventListener("keydown",I,!0),window.addEventListener("keyup",q,!0),window.addEventListener("blur",z),document.addEventListener("visibilitychange",w);let S=setTimeout(z,1e4);return()=>{clearTimeout(S),window.removeEventListener("keydown",I,!0),window.removeEventListener("keyup",q,!0),window.removeEventListener("blur",z),document.removeEventListener("visibilitychange",w)}},[l]);let P=e?[...e.modifiers||[],e.code].join(" + "):i("bindingOff");return(0,a.jsxs)("section",{className:f.section,children:[(0,a.jsx)("h3",{children:i("keyboardBinding")}),(0,a.jsxs)("div",{className:f.actions,children:[(0,a.jsx)("span",{children:P}),(0,a.jsx)(W.Button,{ref:b,onBlur:()=>{l&&N()},disabled:o||d||!t?.supported||!r,onClick:()=>l?void N():void D(),children:d?"\u6B63\u5728\u4EA4\u63A5\u2026":l?"\u53D6\u6D88\u5F55\u5165":"\u5F55\u5165\u6309\u952E"}),(0,a.jsx)(W.Button,{variant:"outline",disabled:o||d||l||!e,onClick:()=>n(null),children:i("clearBinding")}),v.current&&!l&&!d&&(0,a.jsx)(W.Button,{onClick:()=>{N()},children:"\u6062\u590D\u539F\u6309\u952E"})]}),l&&(0,a.jsx)("p",{role:"status",className:f.notice,children:"\u6309\u952E\u8BF4\u8BDD\u5DF2\u6682\u505C\u3002\u8BF7\u6309\u4E0B\u7EC4\u5408\u952E\u540E\u5168\u90E8\u677E\u5F00\uFF1BEsc \u53D6\u6D88\u3002"}),!t?.supported&&(0,a.jsx)("p",{className:f.hint,children:t?.reason||i("bindingUnavailable")}),h&&(0,a.jsx)("p",{role:"alert",children:h}),(0,a.jsx)("p",{className:f.hint,children:"\u5F55\u5165\u7ED3\u675F\u540E\u6062\u590D\u539F\u6309\u952E\uFF1B\u70B9\u51FB\u5E94\u7528\u6309\u952E\u624D\u4FDD\u5B58\u4FEE\u6539\u3002"})]})}function Ud({value:e,t:n}){let t={fast:"performanceExperimental",balanced:"performanceRecommended"}[e];return(0,a.jsxs)("span",{className:f.performanceChoice,children:[n("performance_"+e),t&&(0,a.jsxs)(a.Fragment,{children:[" ",(0,a.jsx)("small",{children:n(t)})]})]})}function Hd({capability:e,t:n,compact:t=!1,pending:o=!1,error:i=null}){let r=e?.modes?.map(p=>p.reason)??[],s=e?.probe?.status,c=s==="unknown"||r.includes("unknown"),l=o||s==="pending"||s==="running",u=!t&&(s==="accepted"||r.includes("accepted")),d=!t&&r.includes("explicit_off");if(!c&&!l&&!u&&!d&&!i)return null;if(t){let p=i||n(l?"performanceProbePending":"performanceProbeUnknown");return(0,a.jsx)("div",{role:"status",className:f.quickHint,"data-whale-probe-status":!0,title:p,children:p})}return(0,a.jsxs)("div",{role:"status",className:t?f.quickHint:f.hint,"data-whale-probe-status":!0,children:[l&&(0,a.jsx)("p",{children:n("performanceProbePending")}),i&&(0,a.jsx)("p",{"data-whale-probe-error":!0,children:i}),c&&(0,a.jsx)("p",{children:n("performanceProbeUnknown")}),u&&(0,a.jsx)("p",{children:n("performanceProbeAccepted")}),d&&(0,a.jsx)("p",{children:n("performanceFastHint")})]})}function Vh({state:e,sessionId:n,run:t,t:o,markSettingsEdited:i}){let r=e.settings,[s,c]=(0,O.useState)(r?.voiceSession?.performanceMode||"compatibility"),l=e.status,u=e.settingsFor===n&&e.checkedFor===n,d=fr(e,n),p=e.performanceFor===n?e.performance:null,h=p?.modes?.find(v=>v.performanceMode===s),m=e.busy||e.performancePending||e.uncertain||!d||s!=="compatibility"&&!h?.available;return d?(0,a.jsxs)("section",{className:f.section,"data-whale-performance":!0,"data-settings-draft":"set-performance-mode",children:[(0,a.jsx)("h3",{children:o("performanceTitle")}),(0,a.jsx)("p",{className:f.hint,children:o("performanceHint")}),(0,a.jsx)("p",{className:f.hint,"data-whale-probe-cost":!0,children:"\u68C0\u6D4B\u4F7F\u7528\u77ED\u8BF7\u6C42\uFF0C\u6309\u6A21\u578B\u8BA1\u8D39\u3002"}),(0,a.jsxs)("details",{className:f.details,children:[(0,a.jsx)("summary",{children:"\u68C0\u6D4B\u8303\u56F4\u4E0E\u8D39\u7528"}),(0,a.jsx)("p",{children:o("performanceProbeCost")}),(0,a.jsx)("p",{children:o("performanceProbeScope")})]}),(0,a.jsx)(Hd,{capability:p,t:o,pending:e.performancePending,error:e.performanceError}),!p&&(0,a.jsx)("p",{className:f.hint,children:o("performanceReadFirst")}),(0,a.jsxs)("p",{className:f.hint,children:["\u5F53\u524D\uFF1A",o("performance_"+(r?.voiceSession?.performanceMode||"compatibility"))]}),(0,a.jsx)("div",{className:f.segmented,children:["fast","balanced","high","compatibility"].filter(v=>v==="compatibility"||!p||p.modes?.find(g=>g.performanceMode===v)?.available).map(v=>(0,a.jsx)(W.Button,{title:v!=="compatibility"&&!p?o("performanceReadFirst"):v!=="compatibility"&&!p?.modes?.find(g=>g.performanceMode===v)?.available?o("performanceUnavailable"):void 0,"aria-pressed":s===v,disabled:e.busy||e.performancePending||v!=="compatibility"&&!p?.modes?.find(g=>g.performanceMode===v)?.available,onClick:()=>{i?.("set-performance-mode"),c(v)},children:(0,a.jsx)(Ud,{value:v,t:o})},v))}),p?.modes?.some(v=>!v.available)&&(0,a.jsx)("p",{className:f.hint,children:o("performanceUnavailable")}),!d&&(0,a.jsx)("p",{className:f.notice,children:o("performanceStopRequired")}),(0,a.jsxs)("div",{className:f.actions,children:[(0,a.jsx)(W.Button,{variant:"outline",disabled:e.busy||e.performancePending,onClick:()=>{t(n,"inspect-performance")},children:o("inspectPerformance")}),(0,a.jsx)(W.Button,{variant:"outline",disabled:m||s===(r?.voiceSession?.performanceMode||"compatibility"),onClick:()=>{t(n,"set-performance-mode",{revision:r.revision,performanceMode:s})},children:o("savePerformance")})]})]}):null}function jh({state:e,sessionId:n,run:t,t:o}){let i=e.outputVolumeFor===n?e.outputVolume:null,[r,s]=(0,O.useState)(null),[c,l]=(0,O.useState)(null),u=r??i?.volume??1,d=r!==null&&c!==i?.revision;return(0,O.useEffect)(()=>{s(null),l(null)},[n]),(0,a.jsxs)("section",{className:f.section,children:[(0,a.jsx)("h3",{children:o("outputVolume")}),i&&!i.supported&&(0,a.jsx)("p",{className:f.hint,children:o("outputVolumeUnavailable")}),i?.supported&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:f.volumeRow,children:[(0,a.jsxs)("label",{className:f.volumeControl,children:[(0,a.jsx)(Zt,{"aria-label":o("outputVolume"),min:"0",max:"1",step:"0.01",value:u,disabled:!i.supported||e.busy||e.outputVolumeUncertain,onChange:p=>{r===null&&l(i.revision),s(Number(p.target.value))}}),(0,a.jsxs)("span",{children:[Math.round(u*100),"%"]})]}),(0,a.jsx)(W.Button,{variant:"outline",disabled:!i.supported||e.busy||e.outputVolumeUncertain||d||r===null,onClick:async()=>{await t(n,"set-output-volume",{revision:c,volume:r})&&s(null)},children:o("saveOutputVolume")})]}),(0,a.jsx)("p",{className:f.hint,children:"\u4E0B\u4E00\u6BB5\u64AD\u653E\u751F\u6548"})]}),d&&(0,a.jsxs)("p",{role:"status",className:f.notice,children:["\u97F3\u91CF\u5DF2\u5728\u522B\u5904\u66F4\u65B0\uFF0C\u5F53\u524D\u9009\u62E9\u5DF2\u4FDD\u7559\u3002",(0,a.jsx)(W.Button,{variant:"outline",disabled:e.busy,onClick:()=>s(null),children:"\u4F7F\u7528\u5F53\u524D\u97F3\u91CF"})]}),!i&&(0,a.jsx)("p",{role:"status",className:f.hint,children:e.busy?o("pending"):o("statusRetry")}),e.outputVolumeUncertain&&(0,a.jsx)("p",{role:"status",className:f.notice,children:o("outputVolumeUnknown")})]})}function Kh({state:e,sessionId:n,run:t,markSettingsEdited:o,discardSettingsDraft:i}){let r=e.settingsFor===n?e.settings:null,s=r?.conversationModel??{mode:"auto",provider:null,model:null},[c,l]=(0,O.useState)(s),[u,d]=(0,O.useState)(""),[p,h]=(0,O.useState)(!1),m=(0,O.useRef)(!1),v=(0,O.useRef)(!0);(0,O.useEffect)(()=>(v.current=!0,()=>{v.current=!1}),[]);let g=e.conversationModelsFor===n?e.conversationModels:null,b=g?.providers??[],k=b.find(w=>w.id===c.provider),N=c.mode==="auto"||!!k?.models.some(w=>w.id===c.model),D=JSON.stringify(c)!==JSON.stringify(s),P=e.status,L=e.checkedFor===n&&!e.uncertain&&P?.enabled===!1&&P?.ownerSessionId===null&&P?.voiceControlBusy===!1&&P?.voiceSession?.fullyStopped===!0&&P?.voiceSession?.id===null,I=!r||!L||e.busy||e.settingsConflict||e.visibilityUncertain||p,q=w=>{o?.("save-conversation-model"),l(S=>({...S,...w})),d("")},z=async()=>{if(I||m.current||!D||!N)return;m.current=!0,h(!0),d("");let w=await t(n,"save-conversation-model",{revision:r.revision,values:c.mode==="auto"?{mode:"auto",provider:null,model:null}:c});m.current=!1,v.current&&(h(!1),d(w?"\u9ED8\u8BA4\u5DF2\u4FDD\u5B58\uFF0C\u4E0B\u6B21\u5F00\u542F\u8BED\u97F3\u751F\u6548\u3002":"\u4FDD\u5B58\u672A\u6210\u529F\uFF0C\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002\u8BF7\u6838\u67E5\u63D0\u793A\u540E\u518D\u64CD\u4F5C\u3002"))};return(0,a.jsxs)("section",{className:f.section,"data-conversation-model":!0,"data-settings-draft":"save-conversation-model",children:[(0,a.jsx)("h3",{children:"\u9ED8\u8BA4\u5BF9\u8BDD\u6A21\u578B"}),(0,a.jsx)("p",{className:f.hint,children:"\u63A5\u6536\u8BED\u97F3\u8BC6\u522B\u540E\u7684\u6587\u5B57\uFF0C\u7528\u4E8E\u751F\u6210\u56DE\u7B54\u3002"}),(0,a.jsx)("fieldset",{className:f.radios,disabled:I,"aria-label":"\u5BF9\u8BDD\u6A21\u578B\u9009\u62E9\u65B9\u5F0F",children:[["auto","\u81EA\u52A8"],["manual","\u624B\u52A8\u6307\u5B9A"]].map(([w,S])=>(0,a.jsxs)("label",{children:[(0,a.jsx)("input",{type:"radio",name:"conversation-mode-"+n,checked:c.mode===w,onChange:()=>q(w==="auto"?{mode:w,provider:null,model:null}:{mode:w})}),S]},w))}),c.mode==="auto"&&(0,a.jsxs)("div",{className:f.section,children:[(0,a.jsx)("p",{className:f.hint,children:"\u8DDF\u968F\u5F53\u524D\u5BF9\u8BDD\u6240\u9009\u6A21\u578B\u3002\u7A7A\u767D\u9996\u9875\u4F7F\u7528 DSH \u7684\u9ED8\u8BA4\u6A21\u578B\u3002"}),(0,a.jsx)("p",{children:"\u5F00\u542F\u8BED\u97F3\u65F6\u786E\u5B9A\u6A21\u578B\u6765\u6E90"})]}),(0,a.jsx)(Ji,{open:c.mode==="manual",children:(0,a.jsxs)("div",{className:f.section,"data-conversation-manual":!0,children:[(0,a.jsx)(Dd,{label:"\u4F9B\u5E94\u5546",value:c.provider,options:b,disabled:I||!g,onChange:w=>q({provider:w,model:null})}),(0,a.jsx)(Dd,{label:"\u6A21\u578B",value:c.model,options:k?.models??[],disabled:I||!k,onChange:w=>q({model:w})}),(0,a.jsx)("p",{className:f.hint,children:"\u4EC5\u5217\u51FA\u5BBF\u4E3B\u5DF2\u914D\u7F6E\u7684\u5BF9\u8BDD\u4F9B\u5E94\u5546\u4E0E\u6A21\u578B\uFF0C\u4FDD\u5B58\u65F6\u518D\u6B21\u9A8C\u8BC1\u3002"}),!g&&(0,a.jsx)("p",{role:"status",children:e.conversationModelsError?"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u4F9B\u5E94\u5546\uFF0C\u8BF7\u91CD\u8BD5\u3002":"\u6B63\u5728\u8BFB\u53D6\u4F9B\u5E94\u5546\u2026"}),g&&!b.length&&(0,a.jsx)("p",{role:"status",children:"\u6682\u65E0\u53EF\u7528\u5BF9\u8BDD\u6A21\u578B\uFF0C\u8BF7\u5148\u5728 DSH \u4E2D\u914D\u7F6E\u4F9B\u5E94\u5546\u3002"}),c.provider&&!N&&(0,a.jsx)("p",{role:"status",children:"\u8BF7\u9009\u62E9\u5F53\u524D\u53EF\u7528\u7684\u4F9B\u5E94\u5546\u4E0E\u6A21\u578B\u3002\u539F\u9009\u62E9\u4E0D\u4F1A\u81EA\u52A8\u66FF\u6362\u3002"}),(0,a.jsx)(W.Button,{variant:"outline",disabled:e.busy,onClick:()=>{t(n,"conversation-models")},children:"\u5237\u65B0\u4F9B\u5E94\u5546"})]})}),(0,a.jsxs)("div",{className:f.actions,children:[(0,a.jsx)(W.Button,{variant:"primary",disabled:I||!D||!N,onClick:()=>{z()},children:p?"\u4FDD\u5B58\u4E2D\u2026":"\u4FDD\u5B58\u9ED8\u8BA4"}),(0,a.jsx)(W.Button,{variant:"outline",disabled:I||!D,onClick:()=>{l(s),d(""),i?.("save-conversation-model")},children:"\u53D6\u6D88\u4FEE\u6539"})]}),(0,a.jsx)("p",{role:"status",className:f.hint,children:u||(D?"\u5C1A\u672A\u4FDD\u5B58":s.mode==="auto"?"\u5DF2\u4FDD\u5B58\uFF1A\u81EA\u52A8 \xB7 \u8DDF\u968F\u5F53\u524D\u5BF9\u8BDD":`\u5DF2\u4FDD\u5B58\uFF1A${s.provider} / ${s.model}`)})]})}function Dd({label:e,value:n,options:t,disabled:o,onChange:i}){let[r,s]=(0,O.useState)(!1),[c,l]=(0,O.useState)(0),u=(0,O.useRef)(null),d=(0,O.useRef)(null),p=(0,O.useRef)(null),h=(0,O.useId)(),m=t.find(b=>b.id===n);(0,O.useEffect)(()=>{o&&s(!1)},[o]),(0,O.useEffect)(()=>{r&&p.current?.querySelector('[data-option-index="'+c+'"]')?.focus()},[r,c]);let v=()=>{s(!1),d.current?.focus()},g=b=>{i(b.id),v()};return(0,a.jsxs)("div",{ref:u,className:f.conversationChoice,onBlur:b=>{b.currentTarget.contains(b.relatedTarget)||s(!1)},children:[(0,a.jsx)("span",{id:h+"-label",children:e}),(0,a.jsxs)(W.Button,{ref:d,variant:"outline",className:f.deviceSelect,"aria-label":e,"aria-haspopup":"listbox","aria-expanded":r,"aria-controls":h,disabled:o||!t.length,onClick:()=>{l(Math.max(0,t.findIndex(b=>b.id===n))),s(!r)},onKeyDown:b=>{["ArrowDown","ArrowUp"].includes(b.key)&&(b.preventDefault(),l(Math.max(0,t.findIndex(k=>k.id===n))),s(!0))},children:[m?.name||n||"\u8BF7\u9009\u62E9",(0,a.jsx)("span",{"aria-hidden":"true",children:"\u2304"})]}),r&&(0,a.jsx)(W.MenuSurface,{ref:p,id:h,className:f.conversationOptions,role:"listbox","aria-labelledby":h+"-label",onKeyDown:b=>{b.key==="Escape"?(b.preventDefault(),b.stopPropagation(),v()):["ArrowDown","ArrowUp","Home","End"].includes(b.key)&&(b.preventDefault(),l(k=>b.key==="Home"?0:b.key==="End"?t.length-1:(k+(b.key==="ArrowDown"?1:-1)+t.length)%t.length))},children:t.map((b,k)=>(0,a.jsxs)("button",{type:"button",role:"option","aria-selected":n===b.id,tabIndex:k===c?0:-1,"data-option-index":k,onClick:()=>g(b),children:[b.name,n===b.id&&(0,a.jsx)("span",{"aria-hidden":"true",children:" \u2713"})]},b.id))})]})}function Wh({state:e,sessionId:n,run:t,markSettingsEdited:o,discardSettingsDraft:i,t:r}){let s=e.settingsFor===n?e.settings:null,c=s?.voicePrompt,l=c?.text??"",[u,d]=(0,O.useState)(l),[p,h]=(0,O.useState)(!1),[m,v]=(0,O.useState)(""),g=(0,O.useRef)(!1),b=(0,O.useRef)(!0),k=(0,O.useRef)(l),N=(0,O.useId)();(0,O.useEffect)(()=>(b.current=!0,()=>{b.current=!1}),[]),(0,O.useEffect)(()=>{if(k.current!==l){let B=k.current;d(E=>E===B?l:E),k.current=l}},[l]);let D=u.trim()?u:"",P=D!==(l.trim()?l:""),L=e.status,I=e.checkedFor===n&&!e.uncertain&&L?.enabled===!1&&L?.ownerSessionId===null&&L?.voiceControlBusy===!1&&L?.voiceSession?.fullyStopped===!0&&L?.voiceSession?.id===null,q=!s||!I||e.busy||e.settingsConflict||e.visibilityUncertain||p,z=!!D&&c?.customSupported!==!0,w=u.length<=32768&&!z,S=async()=>{if(q||g.current||!P||!w)return;g.current=!0,h(!0),v("");let B=!1;try{B=await t(n,"save-voice-prompt",{revision:s.revision,values:{text:D}})}catch{B=!1}finally{g.current=!1,b.current&&(h(!1),v(r(B?"voicePromptSaved":"voicePromptSaveFailed")))}};return(0,a.jsxs)("section",{className:`${f.section} ${f.voicePrompt}`,"data-voice-prompt":!0,"data-settings-draft":"save-voice-prompt",children:[(0,a.jsxs)("label",{htmlFor:N,children:[r("voicePromptLabel")," ",(0,a.jsx)("span",{className:f.hint,children:r("voicePromptOptional")})]}),(0,a.jsx)("textarea",{id:N,className:f.voicePromptInput,value:u,maxLength:32768,disabled:q,placeholder:r("voicePromptPlaceholder"),"aria-describedby":N+"-count "+N+"-feedback",onChange:B=>{o?.("save-voice-prompt"),d(B.target.value),v("")}}),(0,a.jsxs)("div",{id:N+"-count",className:f.voicePromptCount,children:[u.length.toLocaleString("en-US")," / 32,768"]}),(0,a.jsxs)("div",{className:f.voicePromptActions,children:[(0,a.jsxs)("div",{className:f.actions,children:[(0,a.jsx)(W.Button,{variant:"primary",disabled:q||!P||!w,onClick:()=>{S()},children:r(p?"voicePromptSaving":"voicePromptSave")}),(0,a.jsx)(W.Button,{variant:"outline",disabled:q||u===l,onClick:()=>{d(l),v(""),i?.("save-voice-prompt")},children:r("voicePromptCancel")})]}),(0,a.jsx)("span",{className:f.hint,children:r("voicePromptStopToEdit")})]}),(0,a.jsx)("p",{id:N+"-feedback",role:"status",className:f.hint,children:m||(u.length>32768?r("voicePromptTooLong"):c?.customSupported===!1||z?r("voicePromptUnsupported"):P?r("voicePromptUnsaved"):"")})]})}var Yy=Object.freeze({version:1,available:!1,reason:"planned"}),Et=["audio","interaction","prompt","models","advanced","sessions","repair","pets"],Jh={audio:"\u9009\u62E9\u9EA6\u514B\u98CE\u3001\u8BF4\u8BDD\u65B9\u5F0F\u4E0E\u63D0\u793A\u97F3\u3002",interaction:"\u8BBE\u7F6E\u6309\u952E\u3001\u56DE\u7B54\u901F\u5EA6\u4E0E\u754C\u9762\u52A8\u753B\u3002",prompt:"\u8BBE\u7F6E\u8BED\u97F3\u5BF9\u8BDD\u7684\u8868\u8FBE\u65B9\u5F0F\u3002",models:"\u9009\u62E9\u6717\u8BFB\u65B9\u5F0F\uFF0C\u6216\u7BA1\u7406\u672C\u5730\u6A21\u578B\u3002",advanced:"\u67E5\u770B\u6743\u9650\u3001\u8BF7\u6C42\u4E0E\u8FD0\u884C\u8BE6\u60C5\u3002",repair:"\u67E5\u770B\u914D\u7F6E\u6545\u969C\u3001\u4FEE\u590D\u8FDB\u5EA6\u548C\u6062\u590D\u65B9\u5F0F\u3002",sessions:"\u9009\u62E9\u8BED\u97F3\u5BF9\u8BDD\u76EE\u6807\uFF0C\u67E5\u770B\u9C7C\u5E94\u4F1A\u8BDD\u548C\u5B50\u4EE3\u7406\u3002",pets:"\u684C\u5BA0\u529F\u80FD\u5C1A\u672A\u5F00\u653E\u3002"};function Gh(e){let{t:n,sessionId:t}=e,o=e.useWhaleUi(z=>z),i=e.useWhalePreferences(z=>z),r=o.settingsTab||"audio",s=o.settingsModelTab||"conversation",[c,l]=(0,O.useState)(()=>new Set([o.settingsTab||"audio"])),[u,d]=(0,O.useState)(()=>new Set([o.settingsModelTab||"conversation"])),[p,h]=(0,O.useState)(0),m=(0,O.useRef)(null),v=(0,O.useRef)(null),g=(0,O.useRef)(0),b=(0,O.useRef)(new Set),k=(0,O.useRef)(o.readRefresh),N=(0,O.useId)();(0,O.useLayoutEffect)(()=>{m.current&&(m.current.scrollTop=0)},[r,s]),(0,O.useEffect)(()=>{e.setSession?.(t)},[t]),(0,O.useEffect)(()=>()=>{g.current++,e.cancelPreview?.(),e.discardDiagnostics?.()},[]),(0,O.useEffect)(()=>{b.current.clear()},[t,r,s]),(0,O.useEffect)(()=>{r==="models"&&e.refreshModelCompute?.(t)},[t,r,s]),(0,O.useEffect)(()=>{if(o.busy||o.ttsCancelling||["pets","repair","sessions"].includes(r))return;let z=e.readState?.();if(z?.busy||z?.ttsCancelling)return;if(k.current!==o.readRefresh){k.current=o.readRefresh;for(let E of["read-output-volume","model-installer","agent-requests"])b.current.delete(E)}let B=[...!o.settings||o.settingsFor!==t?["read-settings"]:[],...!o.status||o.checkedFor!==t||r==="advanced"?["status"]:[],...r==="audio"?["read-output-volume"]:[],...r==="models"&&s==="conversation"?["conversation-models"]:[],...t&&r==="advanced"?["agent-requests"]:[],...t&&r==="interaction"&&o.performanceFor!==t?["inspect-performance"]:[],...r==="models"&&s==="voice"&&(!o.ttsCapabilities||o.ttsCapabilitiesFor!==t)?["inspect-tts"]:[],...r==="models"?["model-installer"]:[]].find(E=>!b.current.has(E));B&&(b.current.add(B),e.run(t,B,{},!0))},[t,r,s,o.readRefresh,o.busy,o.ttsCancelling,o.settingsFor,o.checkedFor,o.outputVolumeFor,o.agentRequestsFor,o.performanceFor,o.ttsCapabilitiesFor,o.installerFor]);let D=async(z,w=!1)=>{let S=++g.current;e.cancelPreview&&!await e.cancelPreview()||(e.discardDiagnostics?.(),S===g.current&&(l(B=>new Set([...B,z])),e.setSettingsTab(z),w&&v.current?.querySelector(`[data-settings-tab="${z}"]`)?.focus({preventScroll:!0})))},P=async z=>{let w=++g.current;e.cancelPreview&&!await e.cancelPreview()||(e.discardDiagnostics?.(),w===g.current&&(d(S=>new Set([...S,z])),e.setSettingsModelTab(z)))},L=o.settingsFor===t?o.settings:null,I=!o.uncertain&&o.checkedFor===t,q=L&&(0,a.jsx)(Zh,{settings:L,sessionId:t,busy:o.busy||o.visibilityUncertain||o.settingsConflict,run:e.run,t:n,status:o.status,statusFresh:I,verified:I&&!!o.status,tab:r,markSettingsEdited:e.markSettingsEdited,discardSettingsDraft:e.discardSettingsDraft,bindingError:o.bindingError,captureBindings:e.captureBindings},t+":"+(o.settingsKey??L.revision));return(0,a.jsxs)("div",{className:f.settings,"data-whale-settings":!0,"data-motion":i.motion,children:[(0,a.jsxs)("header",{className:f.settingsHeader,"data-settings-header":!0,children:[(0,a.jsxs)(W.Button,{className:f.backButton,"data-whale-operation":"page-home",onClick:e.showHome,"aria-label":"\u8FD4\u56DE\u8BED\u97F3",children:[(0,a.jsx)(Ze,{name:"chevron",className:f.backIcon}),(0,a.jsx)("span",{children:"\u8FD4\u56DE\u8BED\u97F3"})]}),(0,a.jsxs)("div",{className:f.settingsBrand,children:[(0,a.jsx)($n,{small:!0}),(0,a.jsx)("h2",{children:n("settingsTitle")})]}),(0,a.jsx)(W.Button,{className:f.guideButton,"data-whale-operation":"page-setup",onClick:e.openSetup,"aria-label":"\u91CD\u65B0\u6253\u5F00\u914D\u7F6E\u5F15\u5BFC",title:"\u91CD\u65B0\u6253\u5F00\u914D\u7F6E\u5F15\u5BFC",children:"\u914D\u7F6E\u5F15\u5BFC"})]}),(0,a.jsxs)("div",{className:f.settingsLayout,children:[(0,a.jsx)("nav",{ref:v,className:f.settingsNav,"data-settings-nav":!0,"aria-label":n("settingsSections"),onKeyDown:z=>{let w=Et.indexOf(z.target.dataset.settingsTab);if(w<0||!["ArrowDown","ArrowUp","ArrowLeft","ArrowRight","Home","End"].includes(z.key))return;z.preventDefault();let S=z.key==="Home"?0:z.key==="End"?Et.length-1:(w+(["ArrowDown","ArrowRight"].includes(z.key)?1:-1)+Et.length)%Et.length;D(Et[S],!0)},children:Et.map(z=>(0,a.jsx)(W.Button,{"data-settings-tab":z,"aria-pressed":r===z,"aria-controls":N+"-body",onClick:()=>{D(z)},children:n("tab_"+z)},z))}),(0,a.jsxs)("div",{className:f.settingsPage,children:[(0,a.jsxs)("div",{className:`${f.pageHeading} ${r==="models"?f.modelHeading:""}`,"data-settings-page-heading":!0,"data-no-drag":!0,children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{id:N,children:n("tab_"+r)}),r!=="models"&&(0,a.jsx)("p",{children:Jh[r]})]}),r==="prompt"&&L&&(0,a.jsx)("span",{className:f.voicePromptMode,"data-voice-prompt-mode":!0,children:n(L.voicePrompt?.mode==="custom"&&L.voicePrompt?.customSupported===!0?"voicePromptCustom":"voicePromptAgents")}),r==="models"&&(0,a.jsx)("nav",{className:f.modelNav,"aria-label":"\u6A21\u578B\u8BBE\u7F6E\u5206\u7C7B","data-no-drag":!0,children:[["conversation","\u5BF9\u8BDD\u6A21\u578B"],["voice","\u6717\u8BFB\u65B9\u5F0F"],["download","\u6A21\u578B\u4E0B\u8F7D"],["paths","\u9AD8\u7EA7\u8DEF\u5F84"]].map(([z,w])=>(0,a.jsx)(W.Button,{"aria-pressed":s===z,onClick:()=>{P(z)},children:w},z))})]}),(0,a.jsxs)("div",{ref:m,id:N+"-body",className:f.settingsBody,"data-settings-body":!0,"data-no-drag":!0,onChangeCapture:z=>{let w=z.target.closest("[data-settings-draft]");w&&!z.target.closest("[data-no-settings-draft]")&&e.markSettingsEdited?.(w.dataset.settingsDraft)},tabIndex:0,"aria-label":n("settingsContent"),children:[r==="repair"?(0,a.jsx)(Qh,{...e,state:o}):r==="sessions"?(0,a.jsxs)(a.Fragment,{children:[e.listExistingVoiceSessions&&!o.sessionManagementRoot&&(0,a.jsx)(md,{...e,state:o}),(0,a.jsx)(Yh,{...e,state:o})]}):r==="pets"?(0,a.jsxs)("section",{className:f.placeholder,"data-whale-pet":!0,"aria-label":n("tab_pets"),children:[(0,a.jsx)(Ze,{name:"pet"}),(0,a.jsx)("h3",{children:n("tab_pets")}),(0,a.jsx)("p",{children:n("planned")})]}):(0,a.jsxs)(a.Fragment,{children:[o.error&&(0,a.jsx)("div",{role:"alert",className:f.error,children:n("operationUnavailable")}),o.settingsConflict&&(0,a.jsxs)("p",{role:"status",className:f.notice,children:["\u8BBE\u7F6E\u5DF2\u5728\u522B\u5904\u66F4\u65B0\uFF0C\u5F53\u524D\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002",(0,a.jsx)(W.Button,{variant:"outline",disabled:o.busy,onClick:()=>e.discardSettingsDraft?.(),children:"\u653E\u5F03\u8349\u7A3F\u5E76\u4F7F\u7528\u6700\u65B0\u8BBE\u7F6E"})]}),o.visibilityUncertain&&(0,a.jsx)("p",{role:"status",className:f.notice,children:n("configurationUnknown")}),!L&&(0,a.jsx)("p",{role:"status",className:f.hint,children:o.busy?"\u6B63\u5728\u8BFB\u53D6\u8BBE\u7F6E\u2026":"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u8BBE\u7F6E\u3002\u8FD4\u56DE\u7A97\u53E3\u65F6\u4F1A\u81EA\u52A8\u6838\u67E5\u3002"}),r!=="interaction"&&I&&!(r==="models"&&s==="download")&&(o.status?.enabled||o.status?.ownerSessionId)&&(0,a.jsxs)("div",{className:f.editNotice,role:"status",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("strong",{children:"\u8BED\u97F3\u6B63\u5728\u4F7F\u7528"}),(0,a.jsx)("span",{children:" \xB7 \u505C\u6B62\u540E\u53EF\u4FEE\u6539\u76F8\u5173\u8BBE\u7F6E"})]}),(0,a.jsx)(W.Button,{variant:"outline",disabled:o.busy&&(!o.interruptibleRead||o.diagnosticStopPending)||o.ttsCancelling,onClick:()=>{e.run(t,"disable")},children:"\u505C\u6B62\u8BED\u97F3\u4EE5\u7F16\u8F91"})]})]}),(0,a.jsx)("div",{hidden:!["audio","interaction","advanced"].includes(r),children:q}),(r==="audio"||c.has("audio"))&&(0,a.jsx)("div",{hidden:r!=="audio",children:(0,a.jsx)(jh,{...e,state:o})}),(r==="interaction"||c.has("interaction"))&&(0,a.jsxs)("div",{hidden:r!=="interaction",children:[L&&(0,a.jsx)(Vh,{...e,state:o},"performance:"+t+":"+(o.settingsKey??L.revision)),(0,a.jsxs)("section",{className:f.section,children:[(0,a.jsx)("h3",{children:n("motionTitle")}),(0,a.jsx)("div",{className:f.segmented,children:["spring","firm","off"].map(z=>(0,a.jsx)(W.Button,{"aria-pressed":i.motion===z,onClick:()=>{e.setMotion(z),h(p+1)},children:n("motion_"+z)},z))}),(0,a.jsx)("div",{className:f.motionPreview,"aria-hidden":"true",children:(0,a.jsx)($n,{small:!0})},p),(0,a.jsx)("p",{className:f.hint,children:n("motionHint")}),i.error&&(0,a.jsx)("p",{role:"status",children:n("motionNotSaved")})]})]}),(r==="prompt"||c.has("prompt"))&&L&&(0,a.jsx)("div",{hidden:r!=="prompt",children:(0,a.jsx)(Wh,{...e,state:o},"prompt:"+t+":"+(o.settingsKey??L.revision))}),(r==="models"||c.has("models"))&&(0,a.jsxs)("div",{hidden:r!=="models",children:[L&&(s==="conversation"||u.has("conversation"))&&(0,a.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="conversation",children:(0,a.jsx)(Kh,{...e,state:o},"conversation:"+t+":"+(o.settingsKey??L.revision))}),(s==="voice"||u.has("voice"))&&(0,a.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="voice",children:(0,a.jsx)(zd,{pickPath:e.pickPath,state:o,sessionId:t,run:e.run,markSettingsEdited:e.markSettingsEdited,prepared:!0,active:r==="models"&&s==="voice"})}),(s==="download"||u.has("download"))&&(0,a.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="download",children:(0,a.jsx)(Pd,{state:o,sessionId:t,run:e.run})}),L?.modelSetup&&(0,a.jsx)(Fh,{modelTab:s,markSettingsEdited:e.markSettingsEdited,pickPath:e.pickPath,whisperAsrAction:e.whisperAsrAction,active:r==="models",settings:L,sessionId:t,busy:o.busy||o.visibilityUncertain||o.settingsConflict,run:e.run,t:n},t+":"+(o.settingsKey??L.revision)),(s==="paths"||u.has("paths"))&&(0,a.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="paths",children:(0,a.jsx)(Ad,{state:o,sessionId:t,run:e.run,pickPath:e.pickPath,active:r==="models"&&s==="paths"})})]}),(r==="advanced"||c.has("advanced"))&&(0,a.jsxs)("div",{hidden:r!=="advanced",children:[e.updateAction&&(0,a.jsx)(gd,{state:o,open:e.openUpdate,t:n}),(0,a.jsxs)("section",{className:f.section,"aria-label":n("projectInfoTitle"),children:[(0,a.jsx)("h3",{children:n("projectInfoTitle")}),(0,a.jsxs)("dl",{className:f.details,children:[(0,a.jsx)("dt",{children:n("projectAuthor")}),(0,a.jsx)("dd",{children:(0,a.jsx)("a",{href:Ii.url,target:"_blank",rel:"noreferrer noopener",children:Ii.name})}),(0,a.jsx)("dt",{children:n("projectRepository")}),(0,a.jsx)("dd",{children:(0,a.jsxs)("a",{href:fd,target:"_blank",rel:"noreferrer noopener",children:["Emikosama/",cr]})}),(0,a.jsx)("dt",{children:n("projectNpm")}),(0,a.jsx)("dd",{children:(0,a.jsx)("a",{href:`https://www.npmjs.com/package/${cr}`,target:"_blank",rel:"noreferrer noopener",children:cr})})]})]}),(0,a.jsx)(ng,{...e,state:o,active:r==="advanced"}),(0,a.jsx)(eg,{state:o,sessionId:t,t:n}),(0,a.jsxs)("details",{className:f.section,children:[(0,a.jsx)("summary",{children:"\u5BF9\u8BDD\u663E\u793A\u4E0E\u517C\u5BB9\u6027"}),L?.voiceSession&&(0,a.jsx)(Uh,{settings:L,state:o,sessionId:t,run:e.run,t:n},"visibility:"+t+":"+(o.settingsKey??L.revision))]})]})]})]})]})]})}var Xh=new Intl.DateTimeFormat("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"});function Yh({manageSessions:e,openManagedSession:n,renameManagedSession:t,setSessionManagement:o,state:i}){let r=i.sessionManagementRoot??null,[s,c]=(0,O.useState)(null),[l,u]=(0,O.useState)(null),[d,p]=(0,O.useState)(!1),[h,m]=(0,O.useState)(null),[v,g]=(0,O.useState)(null),b=(0,O.useRef)(null),k=(0,O.useCallback)(async(E,{append:M=!1}={})=>{if(!e)return;b.current?.abort();let F=new AbortController;b.current=F,p(!0),m(null);try{E.operation!=="list"&&(await e(E,F.signal),F.signal.aborted||m(E.operation==="restore"?"\u5DF2\u53D6\u6D88\u5F52\u6863\u3002\u53EF\u6253\u5F00\u539F\u4F1A\u8BDD\u7EE7\u7EED\u3002":"\u5DF2\u516C\u5F00\u6B64\u4F1A\u8BDD\u3002"));let A=await e(E.operation==="list"?E:{operation:"list",...r?{rootId:r}:{}},F.signal);if(F.signal.aborted||b.current!==F)return;c(V=>M&&V?{...A,items:[...new Map([...V.items,...A.items].map(U=>[U.id,U])).values()]}:A)}catch(A){F.signal.aborted||m(String(A?.message??"\u65E0\u6CD5\u8BFB\u53D6\u9C7C\u5E94\u4F1A\u8BDD").slice(0,400))}finally{b.current===F&&(b.current=null,p(!1))}},[r,e]);(0,O.useEffect)(()=>(k({operation:"list",...r?{rootId:r}:{}}),()=>{let E=b.current;b.current=null,E?.abort()}),[k,r]);let N=E=>{c(null),u(null),g(null),o({rootId:E,historyOpen:!1})},D=(E,M)=>{g(null),u({operation:E,id:M.id,rootId:M.rootId})},P=async E=>{try{await n(E)}catch(M){m(String(M?.message??"\u65E0\u6CD5\u5728 DSH \u6253\u5F00\u4F1A\u8BDD").slice(0,400))}},L=async E=>{E.preventDefault();let M=v.title.trim();if(!(!M||d)){p(!0),m(null);try{let F=await t(v.id,M);c(A=>A&&{...A,items:A.items.map(V=>V.id===v.id?{...V,title:F}:V)}),g(null),m("\u5DF2\u4FDD\u5B58\u4F1A\u8BDD\u540D\u79F0\u3002")}catch(F){m(String(F?.message??"\u65E0\u6CD5\u91CD\u547D\u540D\u4F1A\u8BDD").slice(0,400))}finally{p(!1)}}},I=r?s?.items?.find(E=>E.id===r):null,q={restore_unavailable:"\u6062\u590D\u63A5\u53E3\u4E0D\u53EF\u7528",archive_state_unavailable:"\u65E0\u6CD5\u8BFB\u53D6\u5F52\u6863\u72B6\u6001",persistence_unavailable:"\u4F1A\u8BDD\u5B58\u50A8\u6682\u65F6\u4E0D\u53EF\u7528",policy_mismatch:"\u5F53\u524D\u4F1A\u8BDD\u6743\u9650\u4E0E\u539F\u4F1A\u8BDD\u4E0D\u540C",presentation_mismatch:"\u5F53\u524D DSH \u65E0\u6CD5\u786E\u8BA4\u4F1A\u8BDD\u7684\u9690\u85CF\u72B6\u6001",visibility_mismatch:"\u5F53\u524D\u663E\u793A\u8BBE\u7F6E\u4E0E\u539F\u4F1A\u8BDD\u4E0D\u540C"},z=E=>(0,a.jsx)("ul",{className:f.permissionList,children:E.map(M=>(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{className:f.sessionTitle,children:M.title||(M.kind==="root"?"\u672A\u547D\u540D\u4F1A\u8BDD":"\u672A\u547D\u540D\u5B50\u4EE3\u7406")+" \xB7 "+M.id.slice(-6).toUpperCase()}),(0,a.jsxs)("p",{className:f.hint,children:[M.archived?"\u5DF2\u5F52\u6863":M.visibility==="hidden"?"\u5DF2\u9690\u85CF":M.visibility==="visible"||M.visibility==="workspace"?"\u53EF\u89C1":"\u53EF\u89C1\u6027\u672A\u77E5",q[M.reason]?" \xB7 "+q[M.reason]:""]}),Number.isFinite(M.createdAt)&&(0,a.jsxs)("p",{className:f.hint,children:["\u521B\u5EFA\u4E8E ",(0,a.jsx)("time",{dateTime:new Date(M.createdAt).toISOString(),children:Xh.format(M.createdAt)})]}),(0,a.jsxs)("div",{className:f.actions,children:[M.kind==="root"&&!r&&(0,a.jsx)(W.Button,{variant:"outline",disabled:d,"data-whale-operation":"show-subagents",onClick:()=>N(M.id),children:"\u67E5\u770B\u5B50\u4EE3\u7406"}),n&&["live","available"].includes(M.status)&&(0,a.jsx)(W.Button,{variant:"outline","data-whale-operation":M.kind==="root"?"open-native-session":"open-native-subagent",onClick:()=>P(M),children:"\u5728 DSH \u6253\u5F00"}),t&&M.kind==="root"&&["live","available","archived"].includes(M.status)&&(0,a.jsx)(W.Button,{variant:"outline",disabled:d,onClick:()=>{u(null),g({id:M.id,title:M.title??""})},children:"\u91CD\u547D\u540D"}),M.canUnhide&&(0,a.jsx)(W.Button,{variant:"outline",disabled:d,onClick:()=>D("unhide",M),children:"\u53D6\u6D88\u9690\u85CF"}),M.canRestore&&(0,a.jsx)(W.Button,{variant:"outline",disabled:d,onClick:()=>D("restore",M),children:"\u6062\u590D\u5F52\u6863"})]}),l?.id===M.id&&(0,a.jsxs)("div",{className:f.actions,children:[(0,a.jsx)("span",{children:l.operation==="unhide"?"\u786E\u8BA4\u5728 DSH \u516C\u5F00\u6B64\u4F1A\u8BDD\uFF1F":"\u786E\u8BA4\u53D6\u6D88\u6B64\u4F1A\u8BDD\u7684\u5F52\u6863\uFF1F"}),(0,a.jsx)(W.Button,{variant:"primary",disabled:d,onClick:()=>{let F=l;u(null),k(F)},children:"\u786E\u8BA4"}),(0,a.jsx)(W.Button,{variant:"outline",onClick:()=>u(null),children:"\u53D6\u6D88"})]}),v?.id===M.id&&(0,a.jsxs)("form",{className:f.sessionRename,onSubmit:L,children:[(0,a.jsx)(W.Input,{"aria-label":"\u4F1A\u8BDD\u540D\u79F0",value:v.title,maxLength:128,disabled:d,onChange:F=>g({...v,title:F.target.value})}),(0,a.jsxs)("div",{className:f.actions,children:[(0,a.jsx)(W.Button,{type:"submit",variant:"primary",disabled:d||!v.title.trim(),children:"\u4FDD\u5B58\u540D\u79F0"}),(0,a.jsx)(W.Button,{type:"button",variant:"outline",disabled:d,onClick:()=>g(null),children:"\u53D6\u6D88"})]})]})]},M.id))}),w=(s?.items??[]).filter(E=>E.id!==r),S=w.filter(E=>E.active),B=w.filter(E=>!E.active).sort((E,M)=>(M.createdAt??-1)-(E.createdAt??-1));return(0,a.jsxs)("section",{className:f.section,"data-whale-session-management":!0,children:[r&&(0,a.jsx)(W.Button,{variant:"outline",disabled:d,"data-whale-operation":"show-main-sessions",onClick:()=>N(null),children:"\u8FD4\u56DE\u4E3B\u4F1A\u8BDD"}),d&&!s&&(0,a.jsx)("p",{role:"status",children:"\u6B63\u5728\u8BFB\u53D6\u9C7C\u5E94\u4F1A\u8BDD\u2026"}),h&&(0,a.jsx)("p",{role:"status",className:f.notice,children:h}),I&&z([I]),I?.childrenAvailable&&I?.childrenIncomplete&&(0,a.jsx)("p",{role:"status",children:"\u90E8\u5206\u5B50\u4EE3\u7406\u8BB0\u5F55\u6682\u65F6\u65E0\u6CD5\u6838\u9A8C\u3002\u5F53\u524D\u663E\u793A\u5DF2\u6838\u9A8C\u7684\u4F1A\u8BDD\u3002"}),I&&!I.childrenAvailable&&(0,a.jsx)("p",{role:"status",children:"\u5F53\u524D\u65E0\u6CD5\u8BFB\u53D6\u6B64\u4F1A\u8BDD\u7684\u5B50\u4EE3\u7406\u8BB0\u5F55\u3002"}),I?.childrenAvailable&&!I.childrenIncomplete&&!w.length&&(0,a.jsx)("p",{children:"\u6B64\u4F1A\u8BDD\u8FD8\u6CA1\u6709\u5B50\u4EE3\u7406\u3002"}),S.length>0&&z(S),s&&!r&&S.length===0&&(0,a.jsx)("p",{className:f.hint,children:"\u6682\u65E0\u6D3B\u8DC3\u4F1A\u8BDD\u3002"}),(B.length>0||s?.nextCursor)&&(0,a.jsxs)("details",{className:f.section,"data-whale-session-history":!0,open:i.sessionHistoryOpen===!0,onToggle:E=>{let{open:M}=E.currentTarget;M!==!!i.sessionHistoryOpen&&o({historyOpen:M})},children:[(0,a.jsx)("summary",{"data-whale-operation":r?"subagent-history":"session-history",children:r?"\u5386\u53F2\u5B50\u4EE3\u7406":"\u5386\u53F2\u4F1A\u8BDD"}),z(B),!!s?.nextCursor&&(0,a.jsx)(W.Button,{disabled:d,onClick:()=>{k({operation:"list",cursor:s.nextCursor},{append:!0})},children:"\u52A0\u8F7D\u66F4\u591A"})]}),(0,a.jsx)(W.Button,{variant:"outline",disabled:d,onClick:()=>{k({operation:"list",...r?{rootId:r}:{}})},children:"\u5237\u65B0\u4F1A\u8BDD"}),s?.capabilities?.unhide?.supported===!1&&(0,a.jsx)("p",{className:f.hint,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u65F6\u65E0\u6CD5\u628A\u5B50\u4EE3\u7406\u52A0\u5165\u4FA7\u8FB9\u680F\u3002"}),s?.capabilities?.restore?.supported===!1&&(0,a.jsx)("p",{className:f.hint,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u65F6\u65E0\u6CD5\u901A\u8FC7\u9C7C\u5E94\u53D6\u6D88\u5F52\u6863\u3002"})]})}function Qh({state:e,repairRequest:n,readOperationLog:t}){let[o,i]=(0,O.useState)(null),r=e.repair,s=r?.offer,c=["starting","running","stopping"].includes(r?.state),l=r?.recovery==="feedback"||r?.recovery==="manual-package-manager"||["needs-feedback","needs-manual","failed","stale"].includes(r?.state);(0,O.useEffect)(()=>{n?.()},[n]);let u=new URL("https://github.com/Emikosama/dsh-fish-voice/issues/new");u.searchParams.set("title","\u9C7C\u5E94\u914D\u7F6E\u5931\u8D25\uFF08"+(r?.incidentId??"unknown")+"\uFF09");let d=["\u6545\u969C\u4EE3\u7801 "+(r?.incidentId??"unknown"),"\u9C7C\u5E94\u7248\u672C "+(r?.version??"unknown"),"\u4FEE\u590D\u9636\u6BB5 "+(r?.stage??"unknown"),"\u5C1D\u8BD5\u8F6E\u6B21 "+(r?.round??0),"\u8BF7\u8865\u5145 DSH \u7248\u672C\u3001\u64CD\u4F5C\u6B65\u9AA4\u548C\u73B0\u8C61\u3002"].join(`
`);u.searchParams.set("body",d);let p=async()=>{try{await navigator.clipboard.writeText(d),i("copied")}catch{i("manual")}};return(0,a.jsxs)("section",{"data-whale-config-repair":!0,className:f.section,children:[e.repairError&&(0,a.jsx)("p",{role:"alert",className:f.error,children:"\u914D\u7F6E\u52A9\u624B\u8FDE\u63A5\u4E2D\u65AD\u3002\u53EF\u91CD\u65B0\u8BFB\u53D6\u8FDB\u5EA6\u3002"}),(!r||r.state==="idle")&&(0,a.jsx)("p",{children:"\u68C0\u6D4B\u5230\u4E25\u91CD\u914D\u7F6E\u95EE\u9898\u65F6\uFF0C\u53EF\u5728\u8FD9\u91CC\u786E\u8BA4\u5E76\u542F\u52A8\u8F85\u52A9\u914D\u7F6E\u3002"}),r?.state!=="idle"&&(0,a.jsxs)("p",{role:"status",children:[c&&`\u7B2C ${r.round} / ${r.maxRounds} \u8F6E \xB7 `,r?.message]}),r?.modelError&&(0,a.jsx)("p",{role:"alert",className:f.error,children:r.modelError}),r?.state==="completed"&&(0,a.jsx)("p",{children:"\u914D\u7F6E\u590D\u67E5\u5DF2\u901A\u8FC7\u3002\u8BF7\u91CD\u65B0\u5F00\u542F\u8BED\u97F3\u9A8C\u8BC1\u4F7F\u7528\u6548\u679C\u3002"}),r?.recovery==="manual-package-manager"&&(0,a.jsxs)("p",{children:["\u8BF7\u5728\u5F53\u524D DSH \u914D\u7F6E\u6863\u4E2D\u91CD\u88C5\u5DF2\u4E0B\u8F7D\u7684\u9C7C\u5E94\u5B8C\u6574\u5305\uFF0C\u4E5F\u53EF\u4ECE ",(0,a.jsx)("a",{href:"https://github.com/Emikosama/dsh-fish-voice/releases",target:"_blank",rel:"noreferrer noopener",children:"\u9C7C\u5E94\u53D1\u5E03\u9875"}),"\u83B7\u53D6\u3002\u8BF7\u4FDD\u7559\u9C7C\u5E94\u6570\u636E\u76EE\u5F55\u548C\u914D\u7F6E\u5907\u4EFD\u3002"]}),l&&(0,a.jsx)("p",{children:"\u8BF7\u4E00\u952E\u751F\u6210\u53CD\u9988\uFF0C\u4F5C\u8005\u6536\u5230\u540E\u4F1A\u6392\u67E5\u5E76\u4FEE\u590D\u3002"}),o==="copied"&&(0,a.jsx)("p",{role:"status",children:"\u5DF2\u590D\u5236\u8BCA\u65AD\u6458\u8981\u3002"}),o==="manual"&&(0,a.jsx)("textarea",{readOnly:!0,"aria-label":"\u8BCA\u65AD\u6458\u8981",value:d,onFocus:h=>h.target.select()}),!!r?.events?.length&&(0,a.jsxs)("details",{open:c||void 0,children:[(0,a.jsx)("summary",{children:"\u5904\u7406\u8BB0\u5F55"}),(0,a.jsx)("ol",{className:f.permissionList,children:r.events.filter(h=>h.message).map((h,m)=>(0,a.jsxs)("li",{children:[h.round>0&&`\u7B2C ${h.round} \u8F6E \xB7 `,h.message]},m))})]}),(0,a.jsxs)("div",{className:f.actions,children:[!!s?.repairs?.length&&(0,a.jsx)(W.Button,{variant:"primary",disabled:e.repairBusy,onClick:()=>{n?.({operation:"start",id:s.id,confirmed:!0})},children:"\u542F\u7528 AI \u8F85\u52A9\u914D\u7F6E"}),c&&(0,a.jsx)(W.Button,{variant:"outline",disabled:e.repairBusy||r.state==="stopping",onClick:()=>{n?.({operation:"stop"})},children:"\u505C\u6B62\u4FEE\u590D"}),l&&(0,a.jsx)("a",{href:u.href,"data-whale-operation":"open-feedback",target:"_blank",rel:"noreferrer noopener",children:"\u4E00\u952E\u53CD\u9988"}),l&&(0,a.jsx)(W.Button,{variant:"outline",onClick:()=>{p()},children:"\u590D\u5236\u8BCA\u65AD"}),e.repairError&&(0,a.jsx)(W.Button,{onClick:()=>{n?.()},children:"\u91CD\u65B0\u8BFB\u53D6"})]}),(0,a.jsx)(_d,{readOperationLog:t})]})}function eg({state:e,sessionId:n,t}){let o=e.status,i=o?.ownerSessionId,s=!e.uncertain&&e.checkedFor===n&&typeof o?.helper?.lastError=="string"?o.helper.lastError:null,c=e.error??e.enableError;return(0,a.jsxs)("details",{className:f.section,children:[(0,a.jsx)("summary",{children:t("details")}),(0,a.jsxs)("dl",{className:f.details,children:[(0,a.jsx)("dt",{children:t("source")}),(0,a.jsx)("dd",{"data-whale-owner":!0,"data-session-id":i??"",children:i||t("none")}),(0,a.jsx)("dt",{children:t("actor")}),(0,a.jsx)("dd",{"data-whale-actor":!0,"data-session-id":n??"",children:n||t("openSession")})]}),(0,a.jsx)("p",{className:f.hint,children:t("snapshot")}),c&&(0,a.jsx)("pre",{className:f.requestDetails,children:c}),s&&(0,a.jsxs)("div",{"data-whale-helper-error":!0,children:[(0,a.jsx)("strong",{children:t("inputDiagnosticTitle")}),(0,a.jsx)("pre",{className:f.requestDetails,children:s}),(0,a.jsx)("p",{className:f.hint,children:t("inputDiagnosticHistory")})]}),(0,a.jsx)("p",{className:f.hint,children:t("consequence")}),(0,a.jsx)("p",{className:f.hint,children:o?.helper?.online?t("helperOnline"):t("helperOffline")}),o?.turnSignals?.outputStartObservation?.status==="unsupported"&&(0,a.jsx)("p",{className:f.hint,children:t("outputObservationUnavailable")})]})}function ng({state:e,sessionId:n,run:t,openAuthorization:o,active:i=!0}){let r=(0,O.useRef)(null),s=(0,O.useRef)(0);(0,O.useEffect)(()=>{r.current=null,s.current++},[i,n]),(0,O.useEffect)(()=>{if(!i||!n||e.busy||e.agentRequestsFor===n||r.current===n)return;r.current=n;let l=s.current;s.current===l&&t(n,"agent-requests")},[i,n,e.busy]);let c=e.agentRequestsFor===n?e.agentRequests:null;return(0,a.jsxs)("section",{className:f.section,"data-whale-agent-requests":!0,children:[(0,a.jsx)("h3",{children:"Agent \u64CD\u4F5C\u8BB0\u5F55"}),(0,a.jsx)(W.Button,{"data-whale-operation":"page-authorization",onClick:()=>{o?.()},children:"\u6388\u6743\u8303\u56F4\u4E0E\u64A4\u9500"}),(e.agentPermissionUncertain||e.agentRequestUncertain)&&(0,a.jsx)("p",{role:"alert",className:f.notice,children:"\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u4F1A\u81EA\u52A8\u6838\u67E5\u5BF9\u5E94\u6743\u9650\u548C\u8BF7\u6C42\u72B6\u6001\uFF0C\u4E0D\u4F1A\u91CD\u590D\u6267\u884C\u3002"}),c?.items?.length===0&&(0,a.jsx)("p",{className:f.hint,children:"\u6CA1\u6709\u5F85\u5904\u7406\u8BF7\u6C42\u3002"}),c?.items?.map(l=>(0,a.jsxs)("section",{className:f.section,"data-agent-request":l.id,children:[(0,a.jsxs)("strong",{children:[l.title," \xB7 ",l.state]}),(0,a.jsxs)("p",{className:f.hint,children:["\u53D1\u8D77\u4F1A\u8BDD\uFF1A",l.sourceSessionId]}),(0,a.jsxs)("details",{children:[(0,a.jsx)("summary",{children:"\u6838\u5BF9\u5B8C\u6574\u53D8\u66F4\u8BA1\u5212"}),(0,a.jsx)("pre",{className:f.requestDetails,children:JSON.stringify({\u5F53\u524D\u8BBE\u7F6E:l.before,\u8BF7\u6C42:l.request,...l.installPlan?{\u4E0B\u8F7D\u8BA1\u5212:l.installPlan}:{},...l.modelApplyTarget?{\u6A21\u578B\u5E94\u7528\u76EE\u6807:l.modelApplyTarget}:{}},null,2)})]}),l.error&&(0,a.jsx)("p",{role:"alert",className:f.error,children:l.error.message}),l.state==="pending"&&(0,a.jsx)(W.Button,{variant:"outline",disabled:e.busy||e.agentRequestUncertain,onClick:()=>{t(n,"decide-agent-request",{id:l.id,approve:!1,acknowledgements:[]})},children:"\u53D6\u6D88\u9884\u89C8"}),l.nextAction&&(0,a.jsx)("p",{className:f.hint,children:l.nextAction})]},l.id))]})}var Vd={startConversation:"\u5F00\u59CB\u5BF9\u8BDD",endConversation:"\u7ED3\u675F\u5BF9\u8BDD",voiceTarget:"\u6295\u9012\u5230",dedicatedVoiceTarget:"\u9C7C\u5E94\u4E13\u7528\u4F1A\u8BDD",checkingVoiceTarget:"\u6B63\u5728\u6838\u5BF9\u76EE\u6807\u2026",voiceTargetChanged:"\u8BED\u97F3\u6295\u9012\u76EE\u6807\u6709\u53D8\u5316\u3002\u8BF7\u6838\u5BF9\u9996\u9875\u7684\u4F1A\u8BDD\u540E\u518D\u5F00\u59CB\u3002",chooseCurrentDshTarget:"\u5728\u5F53\u524D DSH \u5BF9\u8BDD\u91CC\u8BF4\u8BDD",savingCurrentDshTarget:"\u6B63\u5728\u9009\u62E9\u4F1A\u8BDD\u2026",currentDshTargetError:"\u65E0\u6CD5\u786E\u8BA4\u5F53\u524D DSH \u5BF9\u8BDD\uFF0C\u8BF7\u6838\u5BF9\u540E\u91CD\u8BD5\u3002",retryTranscripts:"\u5F85\u91CD\u53D1\u7684\u8BED\u97F3",retryTranscript:"\u91CD\u53D1",retryTranscriptBusy:"\u7B49\u5F85\u53EF\u53D1\u9001",retryTranscriptSending:"\u6B63\u5728\u91CD\u53D1\u2026",retryTranscriptUncertain:"\u53D1\u9001\u7ED3\u679C\u5F85\u786E\u8BA4\uFF0C\u8BF7\u67E5\u770B\u539F\u4F1A\u8BDD\u3002",endDiscardsRetries:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u6E05\u7A7A\u5F85\u53D1\u8F6C\u5199",modeSwitching:"\u6B63\u5728\u5207\u6362\u8BF4\u8BDD\u65B9\u5F0F\u2026",modeSaving:"\u6B63\u5728\u4FDD\u5B58\u8BF4\u8BDD\u65B9\u5F0F\u2026",modeSwitchUnconfirmed:"\u8BF4\u8BDD\u65B9\u5F0F\u66F4\u6539\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u6838\u67E5\u3002",modeSwitchFailed:"\u672A\u80FD\u786E\u8BA4\u66F4\u6539\uFF0C\u8BF7\u67E5\u770B\u5F53\u524D\u65B9\u5F0F\u540E\u518D\u8BD5\u3002",updateTitle:"\u9C7C\u5E94\u66F4\u65B0",updateOfferTitle:"\u9C7C\u5E94\u6709\u65B0\u7248\u672C",updateCurrentVersion:"\u5F53\u524D",updateNewVersion:"\u65B0\u7248",updateChannel_stable:"\u6B63\u5F0F\u7248",updateChannel_preview:"\u9884\u89C8\u7248",updateCheck:"\u68C0\u67E5\u66F4\u65B0",updateDetails:"\u67E5\u770B\u66F4\u65B0",updateLater:"\u7A0D\u540E",updateInstall:"\u4E00\u952E\u66F4\u65B0",updateRelease:"\u53D1\u5E03\u8BF4\u660E",updateFeedback:"\u53CD\u9988\u95EE\u9898",update_idle:"\u6B63\u5728\u8BFB\u53D6\u66F4\u65B0\u72B6\u6001\u2026",update_checking:"\u6B63\u5728\u68C0\u67E5\u66F4\u65B0\u2026",update_current:"\u5DF2\u662F\u6700\u65B0\u7248\u672C\u3002",update_available:"\u53EF\u4EE5\u66F4\u65B0\u3002",update_incompatible:"\u65B0\u7248\u4E0E\u5F53\u524D DSH \u73AF\u5883\u4E0D\u517C\u5BB9\u3002",update_installing:"\u6B63\u5728\u66F4\u65B0\uFF0C\u5BBF\u4E3B\u53EF\u80FD\u4F1A\u91CD\u65B0\u52A0\u8F7D\u9C7C\u5E94\u2026","update_restart-required":"\u66F4\u65B0\u5DF2\u5B89\u88C5\uFF0C\u91CD\u542F DSH \u540E\u751F\u6548\u3002","update_enable-required":"\u66F4\u65B0\u5DF2\u5B89\u88C5\uFF0C\u8BF7\u5728 DSH \u63D2\u4EF6\u7BA1\u7406\u4E2D\u542F\u7528\u9C7C\u5E94\u3002",update_installed:"\u66F4\u65B0\u5DF2\u5B8C\u6210\u3002",update_error:"\u66F4\u65B0\u51FA\u9519\uFF0C\u53EF\u68C0\u67E5\u66F4\u65B0\u540E\u91CD\u8BD5\u3002",update_unsupported:"\u5F53\u524D\u73AF\u5883\u65E0\u6CD5\u81EA\u52A8\u66F4\u65B0\uFF0C\u8BF7\u67E5\u770B\u5B98\u65B9\u53D1\u5E03\u8BF4\u660E\u3002",updateConnection:"\u6682\u65F6\u65E0\u6CD5\u786E\u8BA4\u66F4\u65B0\u72B6\u6001\uFF0C\u8BF7\u5728\u5BBF\u4E3B\u5C31\u7EEA\u540E\u91CD\u65B0\u68C0\u67E5\u3002",audioDevices:"\u97F3\u9891\u8BBE\u5907",audioSystemDefault:"\u7CFB\u7EDF\u9ED8\u8BA4",audioInput:"\u97F3\u9891\u8F93\u5165",audioOutput:"\u97F3\u9891\u8F93\u51FA",inputDeviceMissing:"\u9EA6\u514B\u98CE\u672A\u8FDE\u63A5\uFF0C\u5DF2\u4FDD\u7559\u9009\u62E9",outputDeviceMissing:"\u8F93\u51FA\u672A\u8FDE\u63A5\uFF0C\u4E0D\u4F1A\u5207\u5230\u5176\u4ED6\u8BBE\u5907",deviceDisconnected:"\u672A\u8FDE\u63A5",inputDeviceStopFirst:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5207\u6362\u8F93\u5165\u3002\u8F93\u51FA\u5728\u4E0B\u4E00\u6BB5\u64AD\u653E\u751F\u6548\u3002",outputDeviceUnsupported:"\u6B64\u73AF\u5883\u6682\u4E0D\u652F\u6301\u9009\u62E9\u6717\u8BFB\u8F93\u51FA\u8BBE\u5907\u3002",deviceListRetry:"\u8BBE\u5907\u5217\u8868\u6682\u4E0D\u53EF\u7528\uFF0C\u6253\u5F00\u4E0B\u62C9\u83DC\u5355\u53EF\u91CD\u8BD5\u3002",voiceHelperCleanupHint:"\u6B63\u5728\u786E\u8BA4\u9EA6\u514B\u98CE\u5DF2\u91CA\u653E\uFF0C\u786E\u8BA4\u524D\u4E0D\u4F1A\u5F00\u542F\u65B0\u7684\u5F55\u97F3\u3002",voiceHelperRestartHint:"\u9EA6\u514B\u98CE\u670D\u52A1\u9000\u51FA\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u91CD\u542F DSH \u540E\u518D\u70B9\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u3002",inputError_device:"\u9EA6\u514B\u98CE\u4E0D\u53EF\u7528",inputError_recognition:"\u8BED\u97F3\u8BC6\u522B\u5931\u8D25","inputError_no-speech":"\u6CA1\u542C\u6E05\uFF0C\u8BF7\u518D\u8BF4\u4E00\u6B21",inputHelp_device:"\u8BF7\u68C0\u67E5\u9EA6\u514B\u98CE\u8FDE\u63A5\u4E0E\u6743\u9650\u3002\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5728\u8BBE\u7F6E\u4E2D\u9009\u8BBE\u5907\u3002\u8BE6\u60C5\u89C1\u300C\u9AD8\u7EA7\u300D\u3002",inputDiagnosticTitle:"\u6700\u8FD1\u4E00\u6B21\u97F3\u9891\u9519\u8BEF",inputDiagnosticHistory:"\u8FD9\u662F\u6700\u8FD1\u4E00\u6B21\u8BB0\u5F55\uFF0C\u53EF\u80FD\u6765\u81EA\u4E4B\u524D\u7684\u5C1D\u8BD5\uFF1B\u4E0D\u4EE3\u8868\u5F53\u524D\u8BBE\u5907\u72B6\u6001\u3002",inputHelp_recognition:"\u8BF7\u91CD\u8BD5\u3002\u4ECD\u5931\u8D25\u65F6\uFF0C\u7ED3\u675F\u5BF9\u8BDD\u540E\u5728\u8BBE\u7F6E\u4E2D\u68C0\u67E5\u8BC6\u522B\u6A21\u578B\u3002","inputHelp_no-speech":"\u8BF7\u9760\u8FD1\u9EA6\u514B\u98CE\u91CD\u8BD5\uFF0C\u5E76\u68C0\u67E5\u662F\u5426\u9759\u97F3\u3002",speechFailed:"\u6717\u8BFB\u5931\u8D25",speechInterrupted:"\u6717\u8BFB\u5DF2\u4E2D\u65AD",wakeFallbackHint:"\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\u3002\u76EE\u524D\u6309\u8F6C\u5199\u5339\u914D\u3002\u5207\u6362\u6A21\u5F0F\u540E\u518D\u9009\u300C\u5524\u9192\u8BCD\u300D\u53EF\u91CD\u8BD5\u58F0\u97F3\u5339\u914D\u3002",wakeMode:"\u5524\u9192\u8BCD",switchToWake:"\u70B9\u6309\u5207\u5230\u5524\u9192\u8BCD\u6A21\u5F0F\uFF0C\u9EA6\u514B\u98CE\u5C06\u7B49\u5F85\u8BBE\u5B9A\u79F0\u547C",wakeDisabled:"\u5524\u9192\u76D1\u542C\u672A\u5F00\u542F",wakeStarting:"\u6B63\u5728\u542F\u52A8\u5524\u9192\u76D1\u542C\u2026",wakeWaiting:"\u7B49\u5F85\u5524\u9192\u8BCD",wakeListening:"\u6B63\u5728\u542C\u4E0B\u4E00\u53E5",wakePaused:"\u5524\u9192\u76D1\u542C\u5DF2\u6682\u505C",wakeError:"\u5524\u9192\u76D1\u542C\u4E0D\u53EF\u7528\uFF0C\u8BF7\u67E5\u770B\u8BBE\u7F6E",wakeHint:"\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\uFF0C\u518D\u8BF4\u6307\u4EE4\u3002\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u76D1\u542C\u3002",wakeMethod:"\u77ED\u53E5\u7ED3\u675F\u540E\u5728\u672C\u673A\u6BD4\u8F83\u79F0\u547C\u7684\u58F0\u97F3\u548C\u8F6C\u5199\u3002",wakeAliases:"\u5524\u9192\u79F0\u547C",wakeAliasesHint:"\u6700\u591A8\u4E2A\uFF0C\u9017\u53F7\u5206\u9694\uFF1B\u4E2D\u6587\u652F\u6301\u53E5\u9996\u8FD1\u97F3\uFF0C\u5EFA\u8BAE\u7528\u72EC\u7279\u76843\u5B57\u4EE5\u4E0A\u79F0\u547C\u3002",wakeTimeout:"\u5524\u9192\u540E\u7B49\u5F85\uFF08\u79D2\uFF09",wakeSettings:"\u5524\u9192\u8BCD\u8BBE\u7F6E",wakeStopToEdit:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u79F0\u547C\u548C\u7B49\u5F85\u65F6\u95F4\u3002",wakeInvalid:"\u8BF7\u586B1\u20138\u4E2A\u6709\u6548\u79F0\u547C\uFF0C\u7B49\u5F85\u65F6\u95F4\u4E3A3\u201330\u79D2\u3002",switchToPtt:"\u70B9\u6309\u5207\u56DE\u6309\u4F4F\u8BF4\u8BDD",switchToAlways:"\u70B9\u6309\u5207\u5230\u81EA\u7531\u9EA6\uFF0C\u9EA6\u514B\u98CE\u5C06\u6301\u7EED\u8046\u542C",quickSpeedStop:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5207\u6362\u901F\u5EA6",performanceReadFirst:"\u5148\u68C0\u67E5\u5F53\u524D\u6A21\u578B\u652F\u6301\u54EA\u4E9B\u901F\u5EA6\u3002",performanceUnavailable:"\u63D0\u4F9B\u5546\u5DF2\u660E\u786E\u62D2\u7EDD\u7070\u8272\u6863\u4F4D\u7684\u601D\u8003\u53C2\u6570\uFF1B\u5176\u4ED6\u6863\u4F4D\u4ECD\u53EF\u9009\u62E9\u3002",performanceProbeCost:"\u52A0\u8F7D\u65F6\u7528\u6700\u591A 3 \u4E2A\u56FA\u5B9A\u77ED\u8BF7\u6C42\u68C0\u6D4B\u6863\u4F4D\uFF0C\u6309\u6A21\u578B\u8BA1\u8D39\u3002",performanceProbeScope:"\u4EC5\u90E8\u5206\u5BBF\u4E3B\u4E0E\u6A21\u578B\u652F\u6301\u68C0\u6D4B\uFF0C\u672A\u68C0\u6D4B\u4E0D\u4EE3\u8868\u4E0D\u53EF\u7528\u3002",performanceProbeUnknown:"\u90E8\u5206\u6863\u4F4D\u5C1A\u672A\u9A8C\u8BC1\u6216\u6682\u65F6\u65E0\u6CD5\u68C0\u6D4B\uFF0C\u4ECD\u53EF\u9009\u62E9\u3002\u4E34\u65F6\u7F51\u7EDC\u3001\u767B\u5F55\u6216\u9650\u6D41\u95EE\u9898\u4E0D\u4F1A\u5C4F\u853D\u6863\u4F4D\u3002",performanceProbeAccepted:"\u6863\u4F4D\u8BF7\u6C42\u68C0\u6D4B\u901A\u8FC7\u3002",performanceProbePending:"\u6B63\u5728\u68C0\u67E5\u5F53\u524D\u6A21\u578B\u7684\u6863\u4F4D\u2026",holdToSpeak:"\u8BF4\u8BDD\u65F6\u6309\u4F4F",alwaysWarning:"\u81EA\u7531\u9EA6\u4F1A\u6301\u7EED\u542C\u53D6\u8BED\u97F3\u3002\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u76D1\u542C\u3002",bindingMissing:"\u672A\u7ED1\u5B9A\u8BF4\u8BDD\u6309\u952E\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u4E2D\u7ED1\u5B9A\uFF0C\u6216\u5207\u6362\u6301\u7EED\u8046\u542C\u3002",noSession:"\u8FD8\u6CA1\u6709\u6253\u5F00\u5BF9\u8BDD",otherWindow:"\u9EA6\u514B\u98CE\uFF1A\u53E6\u4E00\u4E2A\u7A97\u53E3",readingStatus:"\u6B63\u5728\u8BFB\u53D6\uFF0C\u4E0D\u4F1A\u542F\u52A8\u9EA6\u514B\u98CE\u6216\u6A21\u578B\u3002",statusRetry:"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u72B6\u6001\u3002\u8FD4\u56DE\u7A97\u53E3\u65F6\u4F1A\u81EA\u52A8\u6838\u67E5\u3002",retryStatus:"\u91CD\u65B0\u8BFB\u53D6\u72B6\u6001",collapseHint:"\u6536\u8D77\u540E\u4F1A\u7EE7\u7EED\u5BF9\u8BDD",stopConsequence:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u91CA\u653E\u9EA6\u514B\u98CE\u5E76\u505C\u6B62\u672C\u6B21\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u3002",transferTitle:"\u63A5\u7BA1\u53E6\u4E00\u4E2A\u7A97\u53E3\u7684\u9EA6\u514B\u98CE\uFF1F",transferWarning:"\u8FD9\u4F1A\u4E2D\u65AD\u53E6\u4E00\u4E2A\u7A97\u53E3\u7684\u8BED\u97F3\uFF0C\u5E76\u53EF\u80FD\u7ED3\u675F\u5B83\u7684\u540E\u53F0\u4EFB\u52A1\u3002",cancel:"\u53D6\u6D88",confirmTransfer:"\u786E\u8BA4\u63A5\u7BA1",bindingStopRequired:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u9F20\u6807\u6216\u952E\u76D8\u6309\u952E\u3002",bindingFinishing:"\u8BED\u97F3\u6B63\u5728\u505C\u6B62\uFF0C\u8BF7\u7A0D\u5019\u518D\u4FEE\u6539\u6309\u952E\u3002",headphonesRequired:"\u5148\u52FE\u9009\u201C\u6211\u5DF2\u4F7F\u7528\u8033\u673A\u201D\uFF0C\u624D\u80FD\u5F00\u542F\u81EA\u52A8\u6253\u65AD\u3002",deviceManualIndex:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u5E8F\u53F7",deviceManualName:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u540D\u79F0",deviceIndexInvalid:"\u8BBE\u5907\u5E8F\u53F7\u9700\u8981\u662F\u975E\u8D1F\u6574\u6570\u3002",deviceDefault:"\u4F7F\u7528\u7CFB\u7EDF\u9ED8\u8BA4\u9EA6\u514B\u98CE",deviceManual:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u540D\u79F0\u6216\u5E8F\u53F7",deviceSaved:"\u5DF2\u4FDD\u5B58\u7684\u8BBE\u5907",deviceEmpty:"\u97F3\u9891\u670D\u52A1\u6CA1\u6709\u627E\u5230\u9EA6\u514B\u98CE\u3002\u8BF7\u8FDE\u63A5\u8BBE\u5907\u5E76\u68C0\u67E5\u7CFB\u7EDF\u58F0\u97F3\u8BBE\u7F6E\u3002",deviceUnknown:"\u5F00\u59CB\u5BF9\u8BDD\u540E\u4F1A\u5217\u51FA\u68C0\u6D4B\u5230\u7684\u8BBE\u5907\u3002\u73B0\u5728\u53EF\u4F7F\u7528\u7CFB\u7EDF\u9ED8\u8BA4\uFF0C\u6216\u5728\u9AD8\u7EA7\u9009\u9879\u624B\u52A8\u586B\u5199\u3002",ttsBackend:"\u8BED\u97F3\u5408\u6210\u540E\u7AEF",ttsBackendHint:"\u58F0\u97F3\u7531\u5DF2\u5B89\u88C5\u7684 TTS \u540E\u7AEF\u63D0\u4F9B\uFF0C\u9700\u5728\u8BE5\u540E\u7AEF\u5B8C\u6210\u914D\u7F6E\u3002\u72EC\u7ACB\u97F3\u91CF\u4EC5\u5728\u9A8C\u8BC1\u652F\u6301\u65F6\u663E\u793A\u3002",ttsBackendPending:"\u66F4\u591A\u540E\u7AEF\u9009\u62E9\u6B63\u5728\u9002\u914D\uFF0C\u5F53\u524D\u4E0D\u4F1A\u81EA\u52A8\u63A5\u5165\u4E91\u670D\u52A1\u3002",voiceClone:"\u58F0\u97F3\u514B\u9686",voiceCloneAvailable:"Qwen \u652F\u6301\u672C\u5730\u53C2\u8003\u97F3\u8272\uFF0C\u53EF\u5728\u6717\u8BFB\u65B9\u5F0F\u7684\u97F3\u8272\u8BBE\u7F6E\u4E2D\u9009\u62E9 WAV\u3002",voiceClonePrivacy:"\u4EC5\u8BFB\u53D6\u4F60\u9009\u62E9\u4E14\u6709\u6743\u4F7F\u7528\u7684\u58F0\u97F3\u6837\u672C\uFF0C\u4E0D\u4E0A\u4F20\u3002",inputActive:"\u6B63\u5728\u63A5\u6536\u8BED\u97F3",modeUnknown:"\u542C\u53D6\u65B9\u5F0F\u672A\u77E5",voiceInputUnavailable:"\u5F55\u97F3\u6682\u4E0D\u53EF\u7528",voiceInputRecoveryHint:"\u8BED\u97F3\u670D\u52A1\u5DF2\u4E2D\u65AD\u3002\u8BF7\u7ED3\u675F\u5BF9\u8BDD\u540E\u91CD\u65B0\u5F00\u59CB\u3002",searchHistory:"\u641C\u7D22\u4F1A\u8BDD",searchScope:"\u641C\u7D22\u5DF2\u8F7D\u5165\u7684\u4F1A\u8BDD",noMatches:"\u6CA1\u6709\u5339\u914D\u7684\u4F1A\u8BDD",differentOwner:"\u9EA6\u514B\u98CE\u5728\u53E6\u4E00\u4E2A\u7A97\u53E3\u4F7F\u7528\u3002\u9700\u8981\u65F6\u53EF\u660E\u786E\u63A5\u7BA1\u3002",details:"\u8BCA\u65AD\u8BE6\u60C5",noReply:"\u8FD8\u6CA1\u6709\u5BF9\u8BDD",newChatCreated:"\u5DF2\u65B0\u5EFA\u4F1A\u8BDD",newChatActive:"\u65B0\u5EFA\u8BED\u97F3\u4F1A\u8BDD\u3002\u5F53\u524D\u4F1A\u8BDD\u7684\u540E\u53F0\u4EFB\u52A1\u4F1A\u505C\u6B62\uFF0C\u8BB0\u5F55\u4F1A\u4FDD\u7559\u3002",newChatOtherOwner:"\u8BF7\u5728\u5F53\u524D\u8BED\u97F3\u4F1A\u8BDD\u6216\u5F00\u542F\u9EA6\u514B\u98CE\u7684\u7A97\u53E3\u4E2D\u65B0\u5EFA\u3002",recentConversation:"\u5BF9\u8BDD",recentTenTurns:"\u6700\u8FD1 10 \u8F6E",allRecords:"\u5168\u90E8\u8BB0\u5F55",showAllRecords:"\u5C55\u5F00\u5168\u90E8",collapseToTen:"\u6536\u8D77\u81F3 10 \u8F6E",collapseConversation:"\u6536\u8D77\u5BF9\u8BDD",currentVoiceRecords:"\u5F53\u524D\u8BED\u97F3\u804A\u5929",historyTruncated:"\u5DF2\u5207\u6362\u663E\u793A\u533A\u95F4\uFF0C\u539F\u8BB0\u5F55\u4ECD\u4FDD\u7559",viewConversation:"\u67E5\u770B\u8BED\u97F3\u8BB0\u5F55",loadEarlier:"\u52A0\u8F7D\u66F4\u65E9\u8BB0\u5F55",readingHistory:"\u6B63\u5728\u8BFB\u53D6\u8BB0\u5F55\u2026",retryHistory:"\u8BFB\u53D6\u8BB0\u5F55\u5931\u8D25\uFF0C\u70B9\u51FB\u91CD\u8BD5",noConversation:"\u8FD8\u6CA1\u6709\u5BF9\u8BDD",newMessages:"\u6761\u65B0\u6D88\u606F",conversationMessages:"\u8BED\u97F3\u5BF9\u8BDD\u8BB0\u5F55",assistantName:"\u52A9\u624B\u79F0\u547C",renameAssistant:"\u70B9\u51FB\u6539\u540D\uFF0CEnter \u4FDD\u5B58\uFF0CEsc \u53D6\u6D88",compact_off:"\u672A\u5F00\u542F",compact_standby:"\u5F85\u673A",compact_listening:"\u8046\u542C\u4E2D",compact_pending:"\u5904\u7406\u4E2D",compact_unknown:"\u5F85\u68C0\u67E5",you:"\u4F60",assistant:"\u52A9\u624B",close:"\u5173\u95ED\u9762\u677F",keyboardBinding:"\u952E\u76D8\u6309\u4F4F\u8BF4\u8BDD",bindingOff:"\u672A\u7ED1\u5B9A",bindingCapture:"\u6309\u4E0B\u8981\u7ED1\u5B9A\u7684\u952E\uFF08Esc \u53D6\u6D88\uFF09",clearBinding:"\u6E05\u9664\u7ED1\u5B9A",bindingUnsupported:"\u4E0D\u652F\u6301\u8BE5\u6309\u952E\u6216\u7CFB\u7EDF\u7EC4\u5408\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u3002",bindingGlobalHint:"Windows \u5168\u5C40\u5FEB\u6377\u952E\u3002\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5F55\u5165\uFF0C\u4FDD\u5B58\u540E\u4E0B\u6B21\u5F00\u59CB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002\u6309\u952E\u4E0D\u4F1A\u88AB\u62E6\u622A\uFF0C\u53EF\u80FD\u540C\u65F6\u89E6\u53D1\u5176\u4ED6\u5E94\u7528\u7684\u5FEB\u6377\u64CD\u4F5C\u3002",bindingUnavailable:"\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301\u5168\u5C40\u6309\u952E\u7ED1\u5B9A\u3002",bindingPrintableWarning:"\u5355\u72EC\u4F7F\u7528\u6587\u5B57\u3001\u6570\u5B57\u6216\u7A7A\u683C\u952E\u4F1A\u5728\u5176\u4ED6\u5E94\u7528\u8F93\u5165\u65F6\u89E6\u53D1\u6309\u952E\u8BF4\u8BDD\u3002",performanceTitle:"\u56DE\u7B54\u901F\u5EA6",performanceHint:"\u51B3\u5B9A\u56DE\u7B54\u65F6\u7684\u601D\u8003\u6DF1\u5EA6\uFF0C\u4E0B\u6B21\u5F00\u59CB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002",inspectPerformance:"\u68C0\u67E5\u53EF\u7528\u901F\u5EA6",performance_fast:"\u5FEB",performanceExperimental:"[\u5B9E\u9A8C\u6027]",performanceRecommended:"[\u63A8\u8350]",performanceFastHint:"\u5FEB\u6863\u4F1A\u660E\u786E\u8BF7\u6C42\u5173\u95ED\u601D\u8003\u3002",performanceFastUnavailable:"\u8FD9\u6761\u6A21\u578B\u8DEF\u7EBF\u65E0\u6CD5\u53D1\u9001\u5173\u95ED\u601D\u8003\u53C2\u6570\u3002\u8BF7\u6362\u7528\u5176\u4ED6\u8DEF\u7EBF\u6216\u56DE\u7B54\u901F\u5EA6\u3002",performance_balanced:"\u6807\u51C6",performance_high:"\u4ED4\u7EC6",performance_compatibility:"\u8DDF\u968F\u6A21\u578B",performanceStopRequired:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u56DE\u7B54\u901F\u5EA6\u3002\u5F53\u524D\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u4F1A\u505C\u6B62\u3002",savePerformance:"\u4FDD\u5B58\u56DE\u7B54\u901F\u5EA6",outputVolume:"\u52A9\u624B\u8BED\u97F3\u97F3\u91CF",outputVolumeHint:"\u4EC5\u8C03\u6574\u5DF2\u5B89\u88C5\u7684 Windows dsh-speak \u540E\u7AEF\uFF0C\u4E0D\u4EE3\u8868\u5F53\u524D\u8BED\u97F3\u8DEF\u7531\u6B63\u5728\u4F7F\u7528\u5B83\uFF1B\u4E0D\u5F71\u54CD DSTuber\u3001\u7CFB\u7EDF\u603B\u97F3\u91CF\u6216\u63D0\u793A\u97F3\u3002\u4E0B\u4E00\u6BB5\u8F93\u51FA\u751F\u6548\u3002",readOutputVolume:"\u8BFB\u53D6\u8BED\u97F3\u97F3\u91CF",saveOutputVolume:"\u4FDD\u5B58\u8BED\u97F3\u97F3\u91CF",outputVolumeUnavailable:"\u5F53\u524D\u8BED\u97F3\u540E\u7AEF\u4E0D\u652F\u6301\u72EC\u7ACB\u97F3\u91CF\u8C03\u8282\u3002",outputVolumeUnknown:"\u97F3\u91CF\u4FDD\u5B58\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u4F1A\u81EA\u52A8\u6838\u67E5\uFF0C\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002",settingsTitle:"\u9C7C\u5E94\u8BBE\u7F6E",settingsSections:"\u8BBE\u7F6E\u5206\u7C7B",tab_audio:"\u97F3\u9891",tab_interaction:"\u4EA4\u4E92",tab_prompt:"\u63D0\u793A\u8BCD",voicePromptLabel:"\u81EA\u5B9A\u4E49\u63D0\u793A\u8BCD",voicePromptOptional:"\uFF08\u53EF\u9009\uFF09",voicePromptAgents:"\u8DDF\u968F AGENTS",voicePromptCustom:"\u5DF2\u9644\u52A0\u81EA\u5B9A\u4E49",voicePromptPlaceholder:`\u4F8B\u5982\uFF1A\u7528\u4E2D\u6587\u56DE\u590D\uFF0C\u5148\u8BF4\u7ED3\u8BBA\uFF0C\u8BED\u6C14\u81EA\u7136\u3002

\u5185\u5BB9\u4F1A\u9644\u52A0\u5728 AGENTS \u540E\u3002\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u8BBE\u7F6E\u3002`,voicePromptStopToEdit:"\u505C\u6B62\u8BED\u97F3\u540E\u53EF\u7F16\u8F91",voicePromptUnsupported:"\u5F53\u524D DSH \u6682\u4E0D\u652F\u6301\u81EA\u5B9A\u4E49\u63D0\u793A\u8BCD\u3002",voicePromptTooLong:"\u63D0\u793A\u8BCD\u4E0D\u80FD\u8D85\u8FC7 32,768 \u4E2A\u5B57\u7B26\u3002",voicePromptSaving:"\u4FDD\u5B58\u4E2D\u2026",voicePromptCancel:"\u53D6\u6D88\u4FEE\u6539",voicePromptSave:"\u4FDD\u5B58",voicePromptSaved:"\u5DF2\u4FDD\u5B58\uFF0C\u4E0B\u6B21\u5F00\u542F\u8BED\u97F3\u65F6\u751F\u6548\u3002",voicePromptSaveFailed:"\u4FDD\u5B58\u672A\u6210\u529F\uFF0C\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002",voicePromptUnsaved:"\u5C1A\u672A\u4FDD\u5B58",tab_models:"\u6A21\u578B",tab_advanced:"\u9AD8\u7EA7",projectInfoTitle:"\u5173\u4E8E\u9C7C\u5E94",projectAuthor:"\u4F5C\u8005",projectRepository:"\u5B98\u65B9\u4ED3\u5E93",projectNpm:"npm \u53D1\u5E03\u9875",tab_repair:"\u914D\u7F6E\u52A9\u624B",tab_sessions:"\u4F1A\u8BDD\u7BA1\u7406",settingsContent:"\u8BBE\u7F6E\u5185\u5BB9",voiceCleanupPending:"\u6B63\u5728\u91CA\u653E\u65E7\u97F3\u9891\u670D\u52A1",voiceCleanupHint:"\u7B49\u5F85\u65E7\u4F1A\u8BDD\u548C\u5F55\u97F3\u9000\u51FA\uFF0C\u5B8C\u6210\u540E\u4F1A\u81EA\u52A8\u66F4\u65B0\u3002",voiceRestartPending:"\u9700\u8981\u91CD\u542F DSH",voiceRestartHint:"\u65E7\u7248\u97F3\u9891\u670D\u52A1\u7684\u9000\u51FA\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u91CD\u542F DSH \u540E\u518D\u70B9\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u3002\u5DF2\u4FDD\u5B58\u7684\u6388\u6743\u4E0D\u53D8\u3002",voiceRecoveryPending:"\u65E7\u8BED\u97F3\u4F1A\u8BDD\u5C1A\u672A\u9000\u51FA",voiceRecoveryCheck:"\u6838\u67E5\u5E76\u505C\u6B62",voiceRecoveryHint:"\u65E7\u5B9E\u4F8B\u4ECD\u5728\u9000\u51FA\uFF0C\u8BF7\u5148\u6838\u67E5\u505C\u6B62\u3002\u82E5\u4E00\u76F4\u672A\u9000\u51FA\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F DSH \u540E\u518D\u70B9\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u3002",operationUnavailable:"\u64CD\u4F5C\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\uFF1B\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002\u8BE6\u60C5\u89C1\u9AD8\u7EA7\u8BBE\u7F6E\u3002",enableFailed:"\u65E0\u6CD5\u5F00\u59CB\u5BF9\u8BDD\u3002\u8BF7\u5728\u8BBE\u7F6E\u7684\u300C\u9AD8\u7EA7\u300D\u67E5\u770B\u539F\u56E0\u540E\u91CD\u8BD5\u3002",tab_pets:"\u684C\u5BA0",planned:"\u8BA1\u5212\u5F00\u53D1\u4E2D",configurationUnknown:"\u914D\u7F6E\u4FDD\u5B58\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\uFF1B\u6838\u5B9E\u524D\u4E0D\u80FD\u7EE7\u7EED\u4FEE\u6539\u3002",motionTitle:"\u754C\u9762\u52A8\u753B",motion_spring:"Q \u5F39",motion_firm:"\u786C\u6717",motion_off:"\u5173\u95ED\u52A8\u753B",motionHint:"\u7ACB\u5373\u9884\u89C8\u5E76\u4FDD\u5B58\uFF1B\u64CD\u4F5C\u4E0D\u7B49\u5F85\u52A8\u753B\u3002\u7CFB\u7EDF\u51CF\u5C11\u52A8\u6001\u6548\u679C\u4F18\u5148\u3002",motionNotSaved:"\u672C\u6B21\u9884\u89C8\u5DF2\u5E94\u7528\uFF0C\u4F46\u6B64\u6D4F\u89C8\u5668\u65E0\u6CD5\u4FDD\u5B58\u52A8\u753B\u504F\u597D\u3002",modeControlPending:"\u8BED\u97F3\u63A7\u5236\u5C1A\u672A\u5B8C\u6210\u6216\u72B6\u6001\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\u3002",capabilityTitle:"\u5BF9\u8BDD\u5728\u4FA7\u680F\u4E2D\u7684\u663E\u793A",supported:"\u53EF\u7528",unsupported:"\u4E0D\u53EF\u7528\u6216\u5C1A\u672A\u786E\u8BA4",hiddenMode:"\u4E0D\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD",workspaceMode:"\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD",taskCapability:"\u540E\u53F0\u4EFB\u52A1\u652F\u6301",configuredMode:"\u5DF2\u4FDD\u5B58\u6A21\u5F0F",currentVoiceMode:"\u5F53\u524D\u5BF9\u8BDD\u7684\u5B9E\u9645\u6A21\u5F0F",noActiveVoice:"\u6CA1\u6709\u8FD0\u884C\u4E2D\u7684\u5BF9\u8BDD",chooseVisibility:"\u9009\u62E9\u663E\u793A\u6A21\u5F0F",workspaceWarning:"\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD\u4F1A\u628A\u5BF9\u8BDD\u663E\u793A\u5728\u666E\u901A\u5DE5\u4F5C\u533A\u4E2D\u3002\u9690\u85CF\u6A21\u5F0F\u4E0D\u53EF\u7528\u65F6\u4ECD\u4F1A\u62D2\u7EDD\u542F\u52A8\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u6539\u4E3A\u53EF\u89C1\u3002",visibilityNoMigration:"\u6B64\u8BBE\u7F6E\u7528\u4E8E\u540E\u7EED\u5BF9\u8BDD\uFF1B\u5DF2\u6709\u5BF9\u8BDD\u4FDD\u6301\u539F\u663E\u793A\u65B9\u5F0F\u3002",modeReadFirst:"\u6B63\u5728\u6838\u67E5\u5F53\u524D\u5BF9\u8BDD\u7684\u914D\u7F6E\u548C\u72B6\u6001\uFF0C\u786E\u8BA4\u540E\u53EF\u4FEE\u6539\u6A21\u5F0F\u3002",closeBeforeMode:"\u8BF7\u5148\u5173\u95ED\u8BED\u97F3\uFF0C\u786E\u8BA4\u5B8C\u5168\u505C\u6B62\u540E\u53EF\u4FEE\u6539\u663E\u793A\u6A21\u5F0F\u3002",saveWorkspace:"\u4FDD\u5B58\u5DE5\u4F5C\u533A\u53EF\u89C1\u6A21\u5F0F",saveHidden:"\u4FDD\u5B58\u9690\u85CF\u6A21\u5F0F",visibilityUnknownWrite:"\u663E\u793A\u6A21\u5F0F\u5199\u5165\u7ED3\u679C\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\u3002\u6838\u5B9E\u524D\u4E0D\u80FD\u7EE7\u7EED\u4FEE\u6539\uFF0C\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002",outputObservationUnavailable:"\u5C1A\u672A\u63A5\u5165\u771F\u5B9E\u64AD\u97F3\u5F00\u59CB\u4E8B\u4EF6\uFF0C\u65E0\u6CD5\u786E\u8BA4\u6B63\u5728\u64AD\u97F3",title:"\u9C7C\u5E94",description:"\u8BED\u97F3\u63A7\u5236\u3001\u97F3\u9891\u8BBE\u7F6E\u4E0E\u72EC\u7ACB\u5BF9\u8BDD\u3002",drag:"\u79FB\u52A8\u9C7C\u5E94\u60AC\u6D6E\u7A97",dragHint:"\u7528\u9F20\u6807\u62D6\u52A8\u7A7A\u767D\u533A\u57DF\u79FB\u52A8\uFF1B\u6309\u94AE\u548C\u8F93\u5165\u6846\u6B63\u5E38\u64CD\u4F5C",collapse:"\u6536\u8D77",reopen:"\u6253\u5F00\u9C7C\u5E94",refresh:"\u5237\u65B0\u72B6\u6001",settings:"\u8BBE\u7F6E",unknown:"\u6B63\u5728\u8BFB\u53D6\u72B6\u6001\u2026",enabled:"\u9EA6\u514B\u98CE\uFF1A\u5DF2\u5F00\u542F",disabled:"\u9EA6\u514B\u98CE\uFF1A\u672A\u5F00\u542F",identity:"\u5B8C\u6574\u4F1A\u8BDD\u6807\u8BC6",source:"\u6388\u6743\u6765\u6E90",actor:"\u64CD\u4F5C\u4F1A\u8BDD",none:"\u65E0",openSession:"\u5148\u5728 DSH \u4FA7\u680F\u65B0\u5EFA\u6216\u6253\u5F00\u4E00\u4E2A\u5BF9\u8BDD\uFF0C\u518D\u56DE\u5230\u9C7C\u5E94\u3002",enable:"\u5F00\u9EA6",transfer:"\u8BA9\u8FD9\u4E2A\u7A97\u53E3\u63A5\u7BA1\u9EA6\u514B\u98CE",disable:"\u5173\u9EA6",stale:"\u72B6\u6001\u6682\u65F6\u8BFB\u4E0D\u5230",snapshot:"\u4E0A\u6B21\u8BFB\u53D6\u7684\u72B6\u6001",consequence:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u672C\u6B21\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u3002\u6536\u8D77\u540E\u4F1A\u7EE7\u7EED\u5BF9\u8BDD\u3002",savedHint:"\u8BBE\u5907\u4E0E\u58F0\u7EB9\u8BBE\u7F6E\u5728\u4E0B\u6B21\u97F3\u9891\u64CD\u4F5C\u65F6\u751F\u6548",more:"\u66F4\u591A\u5BF9\u8BDD",historyOther:"\u5217\u8868\u6765\u81EA\u5176\u4ED6\u64CD\u4F5C\u4F1A\u8BDD\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6",helperOnline:"\u97F3\u9891\u670D\u52A1\u5728\u7EBF",helperOffline:"\u97F3\u9891\u670D\u52A1\u79BB\u7EBF",pending:"\u6B63\u5728\u5904\u7406\u2026",refreshHint:"\u53EA\u8BFB\u53D6\u72B6\u6001\uFF0C\u4E0D\u542F\u52A8\u9EA6\u514B\u98CE\u6216\u6A21\u578B",modelGuide:"\u8BF7\u6309\u63D2\u4EF6\u76EE\u5F55 docs/model-setup.md\uFF0C\u56FA\u5B9A\u7248\u672C\u540E\u624B\u52A8\u4E0B\u8F7D\u5E76\u6821\u9A8C\u3002\u6765\u6E90\u8D26\u53F7\u3001\u8BB8\u53EF\u4E0E\u56FD\u5185\u53EF\u7528\u6027\u672A\u5728\u8FD9\u91CC\u9A8C\u8BC1",sensevoiceSource:"SenseVoice \u6765\u6E90",whisperSource:"Whisper \u6765\u6E90",ttsSource:"\u5916\u90E8 TTS \u53C2\u8003",licenseNote:"SenseVoice \u8BB8\u53EF\u8BA8\u8BBA",modelTitle:"\u672C\u5730\u6A21\u578B",modelHint:"\u4EC5\u4FDD\u5B58\u8DEF\u5F84\uFF0C\u4E0D\u4E0B\u8F7D\u3001\u6267\u884C\u6216\u52A0\u8F7D\u6A21\u578B\uFF1B\u6A21\u578B\u6587\u4EF6\u5C1A\u672A\u9A8C\u8BC1\u3002Whisper \u53EA\u4F7F\u7528\u672C\u5730\u6587\u4EF6\uFF0CCAM++ \u53EF\u9009\u4E14\u4E0D\u4F1A\u56E0\u6B64\u5F00\u542F\u58F0\u7EB9\u8FC7\u6EE4\u3002TTS \u5728\u5916\u90E8\u540E\u7AEF\u914D\u7F6E",asr:"ASR \u5F15\u64CE",sensevoicePath:"SenseVoice \u672C\u5730\u76EE\u5F55",whisperPath:"Whisper \u672C\u5730\u76EE\u5F55",campplusPath:"CAM++ \u6587\u4EF6\uFF08\u53EF\u9009\uFF09",saveModels:"\u4FDD\u5B58\u6A21\u578B\u8DEF\u5F84",audioTitle:"\u97F3\u9891\u8BBE\u7F6E",soundTitle:"\u8F6E\u6B21\u63D0\u793A\u97F3",headphones:"\u6211\u5DF2\u4F7F\u7528\u8033\u673A",headphonesHint:"\u672A\u786E\u8BA4\u8033\u673A\u65F6\uFF0C\u4E3A\u907F\u514D\u5916\u653E\u56DE\u58F0\u4E0D\u64AD\u653E\u63D0\u793A\u97F3\uFF1B\u8FD9\u4E0D\u662F\u56DE\u58F0\u6D88\u9664\uFF0C\u4E5F\u4E0D\u4F1A\u88C1\u6389\u7528\u6237\u8BB2\u8BDD",automaticBargeIn:"\u542F\u7528\u5B9E\u9A8C\u6027\u81EA\u52A8\u6253\u65AD",stopRequested:"\u5DF2\u8BF7\u6C42\u505C\u6B62\u64AD\u653E\uFF0C\u5C1A\u672A\u786E\u8BA4",stopConfirmed:"\u5DF2\u786E\u8BA4\u505C\u6B62\u64AD\u653E",soundEnabled:"\u542F\u7528\u63D0\u793A\u97F3",soundVolume:"\u63D0\u793A\u97F3\u97F3\u91CF\uFF080\u20131\uFF09",soundUnavailable:"\u97F3\u6548\u6682\u672A\u63A5\u5165\uFF1B\u8FD9\u4E9B\u63A7\u4EF6\u4E0D\u4F1A\u5047\u88C5\u64AD\u653E",soundAvailable:"\u97F3\u6548\u5DF2\u63A5\u5165",mode:"\u8BF4\u8BDD\u65B9\u5F0F",alwaysOn:"\u5F00\u542F\u6301\u7EED\u8046\u542C\uFF08\u9EA6\u514B\u98CE\u5E38\u5F00\uFF09",alwaysOff:"\u5207\u56DE\u6309\u4F4F\u8BF4\u8BDD",modeUnavailable:"\u8BF4\u8BDD\u65B9\u5F0F\u63A7\u5236\u5C1A\u672A\u63A5\u5165",modeNeedsGrant:"\u8BF7\u5148\u8BFB\u53D6\u6700\u65B0\u72B6\u6001\u3002",pttMode:"\u6309\u952E\u8BF4\u8BDD",alwaysMode:"\u81EA\u7531\u9EA6",modeHint:"\u5F00\u59CB\u5BF9\u8BDD\u524D\u53EF\u9884\u9009\u8BF4\u8BDD\u65B9\u5F0F\u3002",readSettings:"\u8BFB\u53D6\u8BBE\u7F6E",device:"\u9EA6\u514B\u98CE\u8BBE\u5907",deviceHint:"\u8BBE\u5907\u540D\u79F0\u6765\u81EA\u97F3\u9891\u670D\u52A1\u7684\u6700\u8FD1\u8BFB\u53D6\u3002\u66F4\u6362\u8BBE\u5907\u540E\uFF0C\u5F00\u59CB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002",sideButton:"\u9F20\u6807\u6309\u4F4F\u8BF4\u8BDD",sideOff:"\u5173\u95ED",sideOne:"\u4FA7\u952E 1",sideTwo:"\u4FA7\u952E 2",speaker:"\u5B9E\u9A8C\u6027\u58F0\u7EB9\u8FC7\u6EE4",speakerHint:"\u6B64\u5F00\u5173\u53EA\u7528\u4E8E\u5DF2\u6709\u7684\u58F0\u7EB9\u914D\u7F6E\uFF1B\u5F53\u524D\u9762\u677F\u6CA1\u6709\u6CE8\u518C\u5165\u53E3\u3002",save:"\u4FDD\u5B58\u8BBE\u7F6E",saved:"\u8BBE\u7F6E\u5DF2\u4FDD\u5B58",historyTitle:"\u5BF9\u8BDD\u5386\u53F2",historyHint:"\u53EA\u663E\u793A\u9C7C\u5E94\u521B\u5EFA\u7684\u5BF9\u8BDD\uFF1B\u63A5\u7EED\u4E0D\u4F1A\u81EA\u52A8\u6062\u590D\u5DF2\u5F52\u6863\u804A\u5929",loadHistory:"\u8BFB\u53D6\u5BF9\u8BDD",newChat:"\u65B0\u4F1A\u8BDD",resume:"\u63A5\u7EED",active:"\u5F53\u524D",archived:"\u5DF2\u5F52\u6863",unavailable:"\u4E0D\u53EF\u7528",empty:"\u6682\u65E0\u53EF\u63A5\u7EED\u7684\u5BF9\u8BDD",noTitle:"\u5BF9\u8BDD",noResume:"\u5F53\u524D\u4E0D\u80FD\u63A5\u7EED",newHint:"\u65B0\u5EFA\u6216\u63A5\u7EED\u4F1A\u5207\u6362\u5F53\u524D\u8BED\u97F3\uFF0C\u64A4\u56DE\u65E7\u6388\u6743\uFF0C\u53EF\u80FD\u7ED3\u675F\u65E7\u540E\u53F0\u4EFB\u52A1\uFF1B\u4E0D\u5408\u5E76\u5386\u53F2\uFF0C\u4E5F\u4E0D\u91CD\u8DD1\u65E7\u4EFB\u52A1",historyStale:"\u70B9\u51FB\u8BFB\u53D6\u5BF9\u8BDD\u67E5\u770B\u6700\u65B0\u8BB0\u5F55"},jd={startConversation:"Start conversation",endConversation:"End conversation",voiceTarget:"Send to",dedicatedVoiceTarget:"Fish Voice conversation",checkingVoiceTarget:"Checking target\u2026",voiceTargetChanged:"The delivery target changed. Check the chat shown here before starting.",chooseCurrentDshTarget:"Speak in this DSH chat",savingCurrentDshTarget:"Selecting chat\u2026",currentDshTargetError:"Could not confirm this DSH chat. Check the chat and try again.",retryTranscripts:"Voice messages to resend",retryTranscript:"Resend",retryTranscriptBusy:"Waiting until sending is available",retryTranscriptSending:"Resending\u2026",retryTranscriptUncertain:"Delivery is unconfirmed. Check the original chat.",endDiscardsRetries:"Ending the conversation clears these transcripts",modeSwitching:"Switching listening mode\u2026",modeSaving:"Saving listening mode\u2026",modeSwitchUnconfirmed:"Checking which listening mode took effect\u2026",modeSwitchFailed:"The change could not be confirmed. Check the current mode and try again.",updateTitle:"Fish Voice updates",updateOfferTitle:"Fish Voice update available",updateCurrentVersion:"Installed",updateNewVersion:"New",updateChannel_stable:"Stable",updateChannel_preview:"Preview",updateCheck:"Check for updates",updateDetails:"View update",updateLater:"Later",updateInstall:"Update now",updateRelease:"Release notes",updateFeedback:"Send feedback",update_idle:"Reading update status\u2026",update_checking:"Checking for updates\u2026",update_current:"Fish Voice is up to date.",update_available:"An update is ready.",update_incompatible:"This update is incompatible with the current DSH environment.",update_installing:"Updating. DSH may reload Fish Voice\u2026","update_restart-required":"Update installed. Restart DSH to apply it.","update_enable-required":"Update installed. Enable Fish Voice in DSH plugin settings.",update_installed:"Update complete.",update_error:"The update encountered an error. Check for updates to retry.",update_unsupported:"Automatic updates are unavailable. See the official release notes.",updateConnection:"Update status could not be confirmed. Check again when DSH is ready.",audioDevices:"Audio devices",audioSystemDefault:"System default",audioInput:"Audio input",audioOutput:"Audio output",inputDeviceMissing:"Microphone disconnected; selection retained",outputDeviceMissing:"Output disconnected; no automatic fallback",deviceDisconnected:"Disconnected",inputDeviceStopFirst:"Turn off the microphone to switch input. Output changes at the next playback.",outputDeviceUnsupported:"Selecting speech output is not supported on this platform.",deviceListRetry:"Device list unavailable. Open a selector to retry.",voiceHelperCleanupHint:"Confirming microphone release. New recording stays off until this completes.",voiceHelperRestartHint:"Microphone helper exit is unconfirmed. Fully restart DSH before enabling voice.",inputError_device:"Microphone unavailable",inputError_recognition:"Recognition failed","inputError_no-speech":"No clear speech; try again",inputHelp_device:"Check mic access. Turn the mic off to select a device. Error details: Settings \u2192 Advanced \u2192 Diagnostics.",inputDiagnosticTitle:"Last reported audio error",inputDiagnosticHistory:"This is the last recorded error and may be from an earlier attempt. It does not confirm the current device state.",inputHelp_recognition:"Try again. If it fails, turn the mic off and check the model in Settings.","inputHelp_no-speech":"Move closer, check that your mic is unmuted, and try again.",speechFailed:"Speech failed",speechInterrupted:"Speech interrupted",wakeFallbackHint:"Say a configured name. Matching uses the transcript for now. Reselect Wake word after switching modes to retry sound matching.",wakeMode:"Wake word",switchToWake:"Switch to wake-word listening",wakeDisabled:"Wake listening is off",wakeStarting:"Starting wake listening\u2026",wakeWaiting:"Waiting for wake word",wakeListening:"Listening for the next instruction",wakePaused:"Wake listening paused",wakeError:"Wake listening unavailable; check settings",wakeHint:"Say a configured name, then your instruction. End the conversation to stop listening.",wakeMethod:"Matches the sound and transcript locally after the phrase ends.",wakeAliases:"Wake names",wakeAliasesHint:"Up to 8 comma-separated names. Mandarin near-sounds match only at the start; prefer a distinctive name of 3+ characters.",wakeTimeout:"Wait after wake (seconds)",wakeSettings:"Wake-word settings",wakeStopToEdit:"Turn off the microphone before editing wake names or timeout.",wakeInvalid:"Enter 1\u20138 valid names and a 3\u201330 second timeout.",switchToPtt:"Click to use push to talk",switchToAlways:"Click to leave the microphone listening",quickSpeedStop:"Turn the mic off to change speed",performanceReadFirst:"Check which speeds the current model supports first.",performanceUnavailable:"The provider explicitly rejected the reasoning parameter for unavailable modes; other modes remain selectable.",performanceProbeCost:"At load, up to 3 fixed short requests check the modes. Model charges apply.",performanceProbeScope:"Checks support selected hosts and models. Unchecked does not mean unavailable.",performanceProbeUnknown:"Some modes are unverified or temporarily unavailable to test and remain selectable. Network, sign-in, and rate-limit failures do not disable modes.",performanceProbeAccepted:"The effort request check passed.",performanceProbePending:"Checking effort modes for the current model\u2026",holdToSpeak:"Hold to speak:",alwaysWarning:"The microphone keeps listening. Turn it off when finished.",bindingMissing:"Bind a push-to-talk shortcut in settings, or switch to continuous listening.",noSession:"No conversation is open",otherWindow:"Microphone: another window",readingStatus:"Reading status without starting the microphone or models.",statusRetry:"Status is unavailable. It will be checked automatically when you return to this window.",retryStatus:"Refresh voice status",collapseHint:"Collapsing keeps the microphone enabled",stopConsequence:"Ending the conversation releases the microphone and stops its background tasks.",transferTitle:"Take over the other window\u2019s microphone?",transferWarning:"This interrupts voice in the other window and may end its background tasks.",cancel:"Cancel",confirmTransfer:"Confirm takeover",bindingStopRequired:"Turn off the microphone before changing mouse or keyboard shortcuts.",bindingFinishing:"Voice is still stopping. Wait before changing shortcuts.",headphonesRequired:"Confirm that you are wearing headphones to enable automatic interruption.",deviceManualIndex:"Advanced: enter device index",deviceManualName:"Advanced: enter device name",deviceIndexInvalid:"Enter a nonnegative whole-number device index.",deviceDefault:"Use the system default microphone",deviceManual:"Advanced: enter name or index",deviceSaved:"Saved device",deviceEmpty:"No microphone was found. Connect a device and check system sound settings.",deviceUnknown:"Detected devices appear after enabling voice. Use the system default or enter a device manually.",ttsBackend:"Speech backend",ttsBackendHint:"Speech uses your installed TTS backend and its settings. Independent output volume appears only when verified.",ttsBackendPending:"Additional backend selection is being adapted. No cloud service is connected automatically.",voiceClone:"Voice cloning",voiceCloneAvailable:"Qwen supports a local reference voice. Choose a WAV in voice settings.",voiceClonePrivacy:"Reads only your selected, authorized sample locally. No audio upload.",inputActive:"Receiving voice input",modeUnknown:"Listening mode unknown",voiceInputUnavailable:"Voice input unavailable",voiceInputRecoveryHint:"The audio service stopped. Turn the microphone off, then on again. Your authorization is unchanged.",searchHistory:"Search chats",searchScope:"Search loaded chats",noMatches:"No matching chats",differentOwner:"Voice belongs to another session. Check the source first.",details:"Diagnostics",noReply:"No conversation yet",recentConversation:"Conversation",recentTenTurns:"Recent 10 turns",allRecords:"All records",showAllRecords:"Show all",collapseToTen:"Last 10 turns",collapseConversation:"Collapse conversation",currentVoiceRecords:"Current voice chat",historyTruncated:"Showing a limited range; original records retained",viewConversation:"View voice records",loadEarlier:"Load earlier",readingHistory:"Reading records\u2026",retryHistory:"Could not read records. Retry",noConversation:"No conversation yet",newMessages:"new messages",conversationMessages:"Voice conversation",assistantName:"Assistant name",renameAssistant:"Rename: Enter to save, Esc to cancel",newChatCreated:"New chat created",newChatActive:"Start a voice chat. Background work in the current chat will stop and its history will be kept.",newChatOtherOwner:"Open the current voice chat or the window that enabled the microphone to start a new chat.",compact_off:"Off",compact_standby:"Standby",compact_listening:"Listening",compact_pending:"Working",compact_unknown:"Check status",you:"You",assistant:"Assistant",close:"Close panel",keyboardBinding:"Push-to-talk binding",bindingOff:"Not bound",bindingCapture:"Press a key combination (Esc cancels)",clearBinding:"Clear binding",bindingUnsupported:"This key or system shortcut is not supported.",bindingGlobalHint:"Windows global shortcut. Disable voice before recording a binding; changes apply on the next voice enable. Keys are not swallowed and may also trigger another application.",bindingUnavailable:"Global key binding is unavailable on this platform.",bindingPrintableWarning:"A plain letter, digit or Space also triggers push-to-talk while typing in other applications.",performanceTitle:"Voice performance",performanceHint:"Preference for the next voice session, separate from listening mode.",inspectPerformance:"Check available modes",performance_fast:"Fast",performanceExperimental:"[Experimental]",performanceRecommended:"[Recommended]",performanceFastHint:"Fast explicitly requests thinking to be turned off.",performanceFastUnavailable:"This route cannot send a no-thinking request. Choose a different model route or response speed.",performance_balanced:"Standard",performance_high:"High",performance_compatibility:"Compatible default",performanceStopRequired:"Mode changes require fully stopped voice. Disabling voice can end background work belonging to its voice root.",savePerformance:"Save for next enable",outputVolume:"Assistant voice volume",outputVolumeHint:"Adjusts the installed Windows dsh-speak backend only. It does not verify the active voice route or change DSTuber, system or cue volume. Applies to the next output.",readOutputVolume:"Read voice volume",saveOutputVolume:"Save voice volume",outputVolumeUnavailable:"This speech backend does not support independent volume control.",outputVolumeUnknown:"The volume save is unconfirmed. It will be checked automatically without resubmitting.",settingsTitle:"\u9C7C\u5E94 settings",settingsSections:"Settings sections",tab_audio:"Audio",tab_interaction:"Interaction",tab_prompt:"Prompt",voicePromptLabel:"Custom prompt",voicePromptOptional:"(optional)",voicePromptAgents:"Follow AGENTS",voicePromptCustom:"Custom prompt added",voicePromptPlaceholder:`For example: Give the conclusion first and use a natural tone.

Added after AGENTS. Leave empty to use the default settings.`,voicePromptStopToEdit:"Stop voice to edit",voicePromptUnsupported:"This DSH version does not support custom prompts yet.",voicePromptTooLong:"The prompt must not exceed 32,768 characters.",voicePromptSaving:"Saving\u2026",voicePromptCancel:"Cancel changes",voicePromptSave:"Save",voicePromptSaved:"Saved. Applies when voice is next started.",voicePromptSaveFailed:"Could not save. Your draft has been kept.",voicePromptUnsaved:"Not saved",tab_models:"Models",tab_advanced:"Advanced",projectInfoTitle:"About \u9C7C\u5E94",projectAuthor:"Author",projectRepository:"Official repository",projectNpm:"npm package",tab_repair:"Config assistant",tab_sessions:"Sessions",settingsContent:"Settings content",voiceCleanupPending:"Closing previous audio service",voiceCleanupHint:"Waiting for the previous session and recording to exit. Status will refresh without retrying microphone activation.",voiceRestartPending:"Restart DSH required",voiceRestartHint:"The previous audio service has not confirmed exit. Fully quit and reopen DSH before enabling voice. Your saved authorization is unchanged.",voiceRecoveryPending:"Previous voice session is still active",voiceRecoveryCheck:"Check and stop",voiceRecoveryHint:"The previous instance is still closing. Check and stop first. If it remains active, fully restart DSH before enabling voice. Your authorization is retained.",operationUnavailable:"The outcome is unconfirmed. Automatic readback will check the actual state without resubmitting. Details are in Advanced settings.",enableFailed:"Could not open the mic. Check Advanced settings for details before retrying.",tab_pets:"Desktop pet",planned:"Planned development",configurationUnknown:"The configuration write is unconfirmed. Automatic readback is in progress; changes stay locked until verified.",motionTitle:"Interface motion",motion_spring:"Spring",motion_firm:"Firm",motion_off:"Off",motionHint:"Preview and save immediately. Actions never wait for animation. System reduced-motion preference takes priority.",motionNotSaved:"Preview applied, but this browser could not save the preference.",modeControlPending:"Voice control is pending or unconfirmed. Refresh status when it finishes.",capabilityTitle:"Host capabilities and voice visibility",supported:"Available",unsupported:"Unavailable or unconfirmed",hiddenMode:"Hidden voice chat",workspaceMode:"Workspace-visible compatibility mode",taskCapability:"Persistent handoff",configuredMode:"Saved mode",currentVoiceMode:"Actual mode of the current voice chat",noActiveVoice:"No running voice chat",chooseVisibility:"Choose visibility",workspaceWarning:"Workspace-visible compatibility mode shows voice chats in the regular workspace. Unavailable hidden mode still refuses to start; it never falls back to visible mode.",visibilityNoMigration:"This preference applies to later chats. Existing chats keep their current visibility.",modeReadFirst:"Checking settings and status for this conversation before visibility can be changed.",closeBeforeMode:"Turn voice off and wait for confirmed shutdown before changing visibility.",saveWorkspace:"Save workspace-visible mode",saveHidden:"Save hidden mode",visibilityUnknownWrite:"The visibility write is unconfirmed. Automatic readback is in progress; changes stay locked. The original write will not be repeated.",outputObservationUnavailable:"Actual playback-start events are unavailable; playback has not been confirmed.",title:"\u9C7C\u5E94",description:"Voice controls, audio preferences, and separate voice chats.",drag:"Move Fish Voice panel",dragHint:"Drag background space with the mouse; controls remain interactive",collapse:"Collapse",reopen:"Open Fish Voice",refresh:"Refresh status",settings:"Settings",unknown:"Reading status\u2026",enabled:"Microphone enabled",disabled:"Microphone off",identity:"Full session identities",source:"Authorization source",actor:"Action session",none:"None",openSession:"Open a DSH conversation first",enable:"Enable for this session",transfer:"Authorize this session",disable:"Disable voice",stale:"Refresh to confirm status",snapshot:"Last read status",consequence:"Disabling or switching voice may end its background work. Collapsing this panel leaves voice enabled.",savedHint:"Device and speaker settings take effect on the next audio operation or helper reload.",more:"More voice chats",historyOther:"This list belongs to another action session; read it again",helperOnline:"Audio helper online",helperOffline:"Audio helper offline",pending:"Working\u2026",refreshHint:"Read status without starting the microphone or a model",modelGuide:"Follow docs/model-setup.md in the plugin directory. Pin a revision, download manually, and verify files. Publisher identity, licensing, and regional availability are not verified here.",sensevoiceSource:"SenseVoice source",whisperSource:"Whisper source",ttsSource:"External TTS reference",licenseNote:"SenseVoice licensing discussion",modelTitle:"Local models",modelHint:"Save paths only, without downloading, executing, or loading models. Files are not verified. Whisper uses local files only; optional CAM++ does not enable speaker filtering. Configure TTS in its external backend.",asr:"ASR engine",sensevoicePath:"Local SenseVoice directory",whisperPath:"Local Whisper directory",campplusPath:"CAM++ file (optional)",saveModels:"Save model paths",audioTitle:"Audio settings",soundTitle:"Turn sounds",headphones:"I am using headphones",headphonesHint:"Cues stay off until headphones are confirmed, to avoid speaker echo. This is not echo cancellation and does not trim your speech.",automaticBargeIn:"Enable experimental automatic interruption",stopRequested:"Stop requested; playback has not confirmed stopping",stopConfirmed:"Playback confirmed stopped",soundEnabled:"Enable turn sounds",soundVolume:"Sound volume (0\u20131)",soundUnavailable:"Sound playback is not connected; these controls cannot play cues yet.",soundAvailable:"Sound playback connected",mode:"Listening mode",alwaysOn:"Enable always listening (mic stays on)",alwaysOff:"Use push to talk",modeUnavailable:"Listening mode control is not connected",modeNeedsGrant:"Read the current voice status first",pttMode:"Push to talk",alwaysMode:"Open mic",modeHint:"The audio helper controls the active mode. Saving preferences never grants or starts microphone access.",readSettings:"Read settings",device:"Input device",deviceHint:"Blank uses the system default; enter a device name or index",sideButton:"Mouse push-to-talk",sideOff:"Off",sideOne:"Side button 1",sideTwo:"Side button 2",speaker:"Experimental speaker filtering",speakerHint:"Enable matching only; this page does not record or enroll a voiceprint",save:"Save settings",saved:"Settings saved",historyTitle:"Voice chats",historyHint:"Only Fish Voice voice chats appear here. Resume never unarchives a chat automatically.",loadHistory:"Read voice chats",newChat:"New chat",resume:"Resume",active:"Current",archived:"Archived",unavailable:"Unavailable",empty:"No voice chats available",noTitle:"Voice chat",noResume:"Cannot resume right now",newHint:"New or resumed chats switch current voice, revoke its old grant, and may end its background work. They do not merge history or replay old work.",historyStale:"Read voice chats to see the latest records"};var xn=require("react");var tg=/^7b94c8e3-d6a1-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,Zi=e=>typeof e=="string"&&tg.test(e);var Kd="sidebar.workspaces",og="workspace",rg="whaleWorkspacePresentation",ig=["sidebar.workspaces.directoryFlow","sidebar.workspaces.session.row.action","sidebar.session.row.leading","sidebar.session.row.trailing","sidebar.session.row.hover"],sg=new Set(["one-shot","continuable","unknown"]);function ag(e,n){return e&&typeof e=="object"&&Object.keys(e).length===n.length&&n.every(t=>Object.hasOwn(e,t))}function lg(e){if(!Array.isArray(e)||e.length>512)return null;let n=[],t=new Set;for(let o of e){if(!ag(o,["id","parentId","mode"])||typeof o.id!="string"||!o.id||o.id.length>256||t.has(o.id))return null;if(o.parentId===null){if(o.mode!==null||!Zi(o.id))return null;n.push({id:o.id,parentId:null,mode:null})}else{if(typeof o.parentId!="string"||!o.parentId||o.parentId===o.id||!sg.has(o.mode))return null;n.push({id:o.id,parentId:o.parentId,mode:o.mode})}t.add(o.id)}return n}function cg(e,n){if(!e||typeof e!="object"||!e.byId||!Array.isArray(e.ids))return e;let t=new Map(n.map(l=>[l.id,l])),o=Object.create(null),i=new Set,r=!1;for(let[l,u]of Object.entries(e.byId)){let d=t.get(l);if(Zi(l)&&d===void 0){i.add(l),r=!0;continue}if(d?.parentId===null){if(u.parentId===void 0&&u.origin!=="subagent"){o[l]=u;continue}i.add(l),r=!0;continue}if(d&&u.origin==="subagent"&&u.parentId===d.parentId){let p={...u};delete p.origin,o[l]=p,r=!0;continue}o[l]=u}for(let l of n){let u=e.byId[l.id];u&&(l.parentId===null&&(u.parentId!==void 0||u.origin==="subagent")||l.parentId!==null&&(u.origin!=="subagent"||u.parentId!==l.parentId)||e.ids.includes(l.id)||(r=!0))}if(!r)return e;let s=e.ids.filter(l=>!i.has(l)&&o[l]!==void 0);for(let l of n)o[l.id]!==void 0&&!s.includes(l.id)&&s.push(l.id);let c=e.projectionsBySession;if(c&&i.size>0){let l={...c};for(let u of i)delete l[u];c=l}return{...e,ids:s,byId:o,projectionsBySession:c}}function ug(e,n){return!e||e.locale!==og||e.options?.id!==void 0||e.options?.key!==void 0||(e.options?.priority??0)!==0||typeof n!="function"||n.name!=="WorkspaceBrowser"?!1:ig.every(t=>Object.hasOwn(e.children??{},t))}function dg(e){if(!Object.isExtensible(e))return!1;let n=Object.getOwnPropertyDescriptor(e,"component");return n===void 0||n.writable===!0}function pg(e,n){return e.length===n.length&&e.every((t,o)=>{let i=n[o];return t.id===i.id&&t.parentId===i.parentId&&t.mode===i.mode})}function Wd(e,n){let t=[],o=0,i={revision:o,items:t},r,s=!1,c=!1,l=new Set,u=new Set,d=N=>{for(let D of[...N])D()},p={getSnapshot:()=>i,subscribe(N){return u.add(N),()=>u.delete(N)}},h=()=>{o++,i={revision:o,items:t},d(u),d(l)},m=N=>{s!==N&&(s=N,h())},v=()=>{let N=r;r=void 0,N&&N.entry.component===N.wrapper&&(N.entry.component=N.original)},g=()=>{if(c)return;let N;try{N=e.entries(Kd)}catch{N=void 0}let D=Array.isArray(N)?N.filter(z=>{let w=r&&r.entry===z&&z.component===r.wrapper?r.original:z?.component;return ug(z,w)}):[];if(D.length!==1||typeof n!="function"||!dg(D[0])){v(),m(!1);return}let P=D[0];if(r?.entry===P&&P.component===r.wrapper)return;v(),m(!1);let L=P.component,I=z=>{let w=z.useSessions(A=>A),S=z.useWhaleWorkspacePresentation(A=>A),B=(0,xn.useMemo)(()=>cg(w,S.items),[w,S]),E=(0,xn.useCallback)(A=>A(B),[B]),M=(0,xn.useMemo)(()=>new Map(S.items.map(A=>[A.id,A])),[S]),F=(0,xn.useCallback)(A=>{let V=M.get(A),U=w.byId[A];if(V?.parentId&&U?.origin==="subagent"&&U.parentId===V.parentId){n({childSessionId:A,parentSessionId:V.parentId,mode:V.mode});return}z.open?.(A)},[z.open,M,w]);return(0,xn.createElement)(L,{...z,useSessions:E,open:F})},q=function(w){let S=typeof w?.useSessions=="function"&&typeof w?.useWhaleWorkspacePresentation=="function"&&typeof w?.open=="function";return(0,xn.useEffect)(()=>{r?.entry===P&&r.wrapper===q&&m(S)},[S]),(0,xn.createElement)(S?I:L,w)};q.displayName="WhaleWorkspacePresentation",P.component=q,r={entry:P,original:L,wrapper:q}},b=()=>{},k=()=>{};try{b=e.provideRoot({hooks:{[rg]:p}}),typeof b!="function"&&(b=()=>{}),k=e.subscribe(Kd,g),typeof k!="function"&&(k=()=>{}),g()}catch{k(),v(),b(),m(!1)}return{supported:()=>s,subscribe(N){return l.add(N),()=>l.delete(N)},setOverrides(N){if(c)return!1;let D=lg(N);return D===null?(t.length>0&&(t=[],h()),!1):(pg(t,D)||(t=D,h()),!0)},dispose(){c||(c=!0,k(),v(),s=!1,h(),b(),l.clear(),u.clear())}}}var mg=["slots","locale","remote","uiSession"];function fg(e){let n=ad(),t=Ju(void 0,{observe:n.internal});t.enableAutomaticReads();let o=Gu();e.inject(["whaleFloatingLayout"],g=>{g.effect(()=>o.useLayoutService(g.whaleFloatingLayout),"whale-voice: optional magnetic layout")});let i=Qu(),r=Xu(window,{onResize:g=>o.fit(g)}),s,c=()=>{};e.effect(()=>{let g=()=>{t.setReadVisibility(document.visibilityState!=="hidden"),document.visibilityState!=="hidden"&&(t.refresh(),s?.refresh(),c())};return window.addEventListener("focus",g),window.addEventListener("online",g),document.addEventListener("visibilitychange",g),g(),()=>{window.removeEventListener("focus",g),window.removeEventListener("online",g),document.removeEventListener("visibilitychange",g)}},"whale-voice: refresh visible state"),e.effect(()=>{let g=Wd(e.slots,q=>e.get?.("uiWorkspace")?.openSession(q)),b,k,N=()=>{k?.(),k=null};c=()=>{if(!g.supported()){N();return}if(!b||k)return;let q=b,z=!0;k=b.subscribePresentation(w=>{g.setOverrides(w.shown),z&&(z=!1,t.refresh({force:!0}))},w=>{b===q&&(N(),console.warn("\u9C7C\u5E94\u4FA7\u680F\u4F1A\u8BDD\u663E\u793A\u8FDE\u63A5\u4E2D\u65AD",w?.message??w))})};let D=g.subscribe(c),P=!1;s=Gi(async()=>{let q=P?"ui-reconnect":"ui-connect";n.internal(q,"requested");try{let z=await td(e,n.internal);return n.internal(q,"finished","ok"),z}catch(z){throw P=!0,n.internal(q,"finished","failed"),z}},{visible:()=>t.getSnapshot().readVisible!==!1,onReady:q=>{N(),b=q,n.attach(q),t.attachConversationClient(q),c()},onError:q=>t.conversationUnavailable(q)});let L=t.getSnapshot().readVisible,I=t.subscribe(()=>{let q=t.getSnapshot().readVisible;q!==L&&(L=q,s.visibilityChanged())});return s.start(),()=>{c=()=>{},N(),D(),g.dispose(),I(),n.dispose(),s.dispose(),t.dispose()}},"whale-voice: private conversation stream"),e.effect(()=>()=>{t.dispose(),r.dispose(),o.dispose(),i.dispose()},"whale-ear-ui: state and geometry"),e.effect(()=>e.locale.register("whaleEar",{en:jd,zh:Vd}),"whale-ear-ui: dictionaries"),e.effect(()=>{let g=document.createElement("style");return g.dataset.plugin="dsh-whale-ear-ui",g.textContent=f.text+Nd+Wi,document.head.append(g),()=>g.remove()},"whale-ear-ui: stylesheet");let l=async g=>{let b=e.get?.("sessions");if(!b)throw new Error("DSH \u4F1A\u8BDD\u754C\u9762\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");return b.list.getSnapshot().byId[g]||await b.refresh(),b},u=0,d=async g=>{let b=++u;if(g.kind==="root"&&await l(g.id),b!==u)return;let k=e.get?.("uiWorkspace");if(!k?.openSession)throw new Error("DSH \u4F1A\u8BDD\u754C\u9762\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");return k.openSession(g.kind==="root"?g.id:{childSessionId:g.id,parentSessionId:g.parentId,mode:g.mode??"unknown"})},p=g=>d({kind:"root",id:g}),h={subscribe(g){return e.get?.("sessions")?.list?.subscribe?.(g)??(()=>{})},subscribeCurrent(g){let b=[e.uiSession.adapter?.current?.subscribe(g),e.get?.("layout")?.panelInfo?.subscribe(g),h.subscribe(g)];return()=>b.forEach(k=>k?.())},currentConversation(){let g=e.uiSession.adapter?.current?.getSnapshot();return e.get?.("layout")?.panelInfo?.getSnapshot()?.activePanelId===null&&g?.hooks?.session?.getSnapshot()?.blank!==!0?g?.props?.sessionId??null:null},sourceFor(g){if(!g)return null;let b=e.get?.("sessions"),k=b?.list?.getSnapshot()?.byId?.[g];return b?.subagentAddress?.(g)||k?.origin==="subagent"||k?.parentId?null:g}},m=async(g,b)=>{let N=await(await l(g)).using(g,{source:"workspaceOperation"},D=>D.binding.session.rename(b));if(!N.ok)throw new Error(N.error.message);return N.value.title},v=()=>({captureBindings:t.captureBindings,refreshModelCompute:t.refreshModelCompute,pickPath:t.pickPath,readState:t.getSnapshot,markSettingsEdited:t.markSettingsEdited,discardSettingsDraft:t.discardSettingsDraft,openAuthorization:t.openAuthorization,closeAuthorization:t.closeAuthorization,saveAuthorization:t.saveAuthorization,repairRequest:t.repairRequest,dismissRepair:t.dismissRepair,readOperationLog:t.readOperationLog,manageSessions:t.manageSessions,listExistingVoiceSessions:t.listExistingVoiceSessions,setExistingVoiceSession:t.setExistingVoiceSession,setSettingsTab:t.setSettingsTab,setSettingsModelTab:t.setSettingsModelTab,setSessionManagement:t.setSessionManagement,whisperAsrAction:t.whisperAsrAction,updateAction:t.updateAction,dismissUpdate:t.dismissUpdate,openExistingVoiceSession:p,openManagedSession:d,renameManagedSession:m,hooks:{whaleUi:t,whalePreferences:i},setMotion:g=>i.setMotion(g),setAssistantName:g=>i.setAssistantName(g),run:(...g)=>t.run(...g),setSession:g=>t.setSession(g),cancelPreview:()=>t.cancelPreview(),discardDiagnostics:()=>t.discardDiagnostics(),dismissSetup:()=>t.dismissSetup(),openSetup:()=>t.openSetup(),showHome:()=>t.showHome(),openSettings:t.openSettings,refresh:()=>t.refresh()});e.slots.inject("shell.overlay",()=>e.slots.register({name:"shell.overlay",id:"whale-ear",locale:"whaleEar",inject:()=>({geometry:o,sizing:r,recordUserOperation:n.user,setPanelVisible:t.setPanelVisible,closeAuthorization:t.closeAuthorization,refresh:()=>t.refresh(),showHome:()=>t.showHome(),dismissSetup:()=>t.dismissSetup(),hooks:{whaleUi:t,whalePreferences:i}}),children:{"whale-ear.panel.controls":{kind:"single",scope:"session-maybe"}}},Od)),e.slots.inject("whale-ear.panel.controls",()=>e.slots.register({name:"whale-ear.panel.controls",locale:"whaleEar",inject:()=>({...v(),controlContext:h,retryVoiceTranscript:t.retryVoiceTranscript})},Rd))}
return module.exports;}});
