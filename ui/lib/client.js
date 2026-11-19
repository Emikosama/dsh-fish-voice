window.__ModuleLoader__.load({id:"dsh-whale-ear-ui",factory:(require)=>{var module={exports:{}};var exports=module.exports;
var Ar=Object.defineProperty;var dp=Object.getOwnPropertyDescriptor;var pp=Object.getOwnPropertyNames;var mp=Object.prototype.hasOwnProperty;var os=(e,t)=>{for(var n in t)Ar(e,n,{get:t[n],enumerable:!0})},fp=(e,t,n,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of pp(t))!mp.call(e,i)&&i!==n&&Ar(e,i,{get:()=>t[i],enumerable:!(o=dp(t,i))||o.enumerable});return e};var hp=e=>fp(Ar({},"__esModule",{value:!0}),e);var Wg={};os(Wg,{apply:()=>Pg,inject:()=>zg});module.exports=hp(Wg);var Ln=require("react");var Mt={rail:"C14C7a_rail",range:"C14C7a_range",fill:"C14C7a_fill",thumb:"C14C7a_thumb",collapseInner:"C14C7a_collapseInner",collapse:"C14C7a_collapse",toggleTrack:"C14C7a_toggleTrack",input:"C14C7a_input",toggle:"C14C7a_toggle",text:`.C14C7a_range {
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

.C14C7a_rail {
  background: var(--dsw-alias-border-l2, #8791a4);
  pointer-events: none;
  border-radius: 999px;
  height: 6px;
  position: absolute;
  inset: 13px 9px;
  min-width: 0 !important;
  margin: 0 !important;
}

.C14C7a_fill {
  width: var(--whale-range-position);
  background: var(--dsw-alias-brand-primary, #8ba9e7);
  border-radius: inherit;
  transition: width var(--whale-duration, .2s) var(--whale-ease, ease-out);
  position: absolute;
  inset: 0 auto 0 0;
  min-width: 0 !important;
  margin: 0 !important;
}

.C14C7a_thumb {
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

.C14C7a_range .C14C7a_input {
  opacity: 0;
  cursor: pointer;
  touch-action: pan-y;
  height: 32px;
  margin: 0;
  position: absolute;
  inset: 0;
  width: 100% !important;
}

.C14C7a_range:focus-within {
  outline: 2px solid var(--dsw-focus-ring-color, #8ba9e7);
  outline-offset: 2px;
  border-radius: 6px;
}

.C14C7a_range:hover .C14C7a_thumb {
  box-shadow: 0 0 0 4px color-mix(in srgb,var(--dsw-alias-brand-primary, #8ba9e7) 18%,transparent);
}

.C14C7a_range[data-dragging] :is(.C14C7a_thumb, .C14C7a_fill) {
  transition-duration: 40ms;
  transition-timing-function: linear;
}

.C14C7a_range[data-disabled], .C14C7a_toggle[data-disabled] {
  opacity: .5;
}

.C14C7a_range[data-disabled] .C14C7a_input {
  cursor: not-allowed;
}

.C14C7a_collapse {
  opacity: 0;
  visibility: hidden;
  grid-template-rows: 0fr;
  transition: grid-template-rows .16s ease-out, opacity .12s ease-out, visibility .16s;
  display: grid;
}

.C14C7a_collapse[data-open="true"] {
  opacity: 1;
  visibility: visible;
  grid-template-rows: 1fr;
}

.C14C7a_collapseInner {
  min-height: 0;
  overflow: hidden;
}

.C14C7a_toggle {
  cursor: pointer;
  align-items: center;
  gap: 8px;
  width: fit-content;
  max-width: 100%;
  font-size: 12px;
  display: flex;
  position: relative;
}

.C14C7a_toggle > input {
  opacity: 0;
  width: 38px;
  height: 24px;
  margin: 0;
  position: absolute;
}

.C14C7a_toggleTrack {
  pointer-events: none;
  background: var(--dsw-alias-border-l2, #8791a4);
  width: 36px;
  height: 22px;
  transition: background-color var(--whale-duration, .2s);
  border-radius: 999px;
  flex: none;
  position: relative;
}

.C14C7a_toggleTrack > span {
  background: var(--dsw-alias-bg-layer-1, #fff);
  width: 16px;
  height: 16px;
  transition: left var(--whale-duration, .2s) var(--whale-ease, ease-out);
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
}

.C14C7a_toggle > input:checked + .C14C7a_toggleTrack {
  background: var(--dsw-alias-brand-primary, #8ba9e7);
}

.C14C7a_toggle > input:checked + .C14C7a_toggleTrack > span {
  left: 17px;
}

.C14C7a_toggle > input:focus-visible + .C14C7a_toggleTrack {
  outline: 2px solid var(--dsw-focus-ring-color, #8ba9e7);
  outline-offset: 2px;
}

[data-motion="firm"] :is(.C14C7a_range, .C14C7a_toggle, .C14C7a_collapse) {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="firm"] .C14C7a_collapse {
  transition-duration: .1s;
}

[data-motion="off"] :is(.C14C7a_range, .C14C7a_toggle, .C14C7a_collapse), [data-motion="off"] :is(.C14C7a_range, .C14C7a_toggle, .C14C7a_collapse) * {
  transition: none !important;
  animation: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .C14C7a_range, .C14C7a_toggle, .C14C7a_collapse, .C14C7a_range *, .C14C7a_toggle *, .C14C7a_collapse * {
    transition: none !important;
    animation: none !important;
  }
}

@media (forced-colors: active) {
  .C14C7a_range .C14C7a_input {
    opacity: 1;
    position: relative;
  }

  .C14C7a_rail {
    display: none;
  }

  .C14C7a_toggleTrack {
    border: 1px solid buttontext;
  }

  .C14C7a_toggleTrack > span {
    background: buttontext;
  }

  .C14C7a_toggle > input:checked + .C14C7a_toggleTrack {
    background: highlight;
  }
}
`};var st=require("react/jsx-runtime"),rs=Mt.text;function Vn({value:e,defaultValue:t=0,min:n=0,max:o=100,disabled:i,onChange:r,onPointerDown:s,onPointerUp:a,onPointerCancel:l,onLostPointerCapture:u,className:d="",style:p,...f}){let[m,b]=(0,Ln.useState)(t),[v,y]=(0,Ln.useState)(!1);(0,Ln.useEffect)(()=>{i&&y(!1)},[i]);let w=Number(e??m),C=Number(n),D=Number(o),F=D>C&&Number.isFinite(w)?Math.max(0,Math.min(1,(w-C)/(D-C))):0,N=W=>M=>{y(!1),W?.(M)};return(0,st.jsxs)("span",{className:Mt.range,"data-whale-motion-range":!0,"data-dragging":v&&!i||void 0,"data-disabled":i||void 0,style:{"--whale-range-position":`${F*100}%`},children:[(0,st.jsxs)("span",{className:Mt.rail,"aria-hidden":"true",children:[(0,st.jsx)("span",{className:Mt.fill}),(0,st.jsx)("span",{className:Mt.thumb})]}),(0,st.jsx)("input",{...f,className:`${Mt.input} ${d}`,style:p,type:"range",min:n,max:o,value:e??m,disabled:i,onChange:W=>{i||(e===void 0&&b(W.target.value),r?.(W))},onPointerDown:W=>{i||y(!0),s?.(W)},onPointerUp:N(a),onPointerCancel:N(l),onLostPointerCapture:N(u),onBlur:W=>{y(!1),f.onBlur?.(W)}})]})}function is({open:e,children:t,className:n="",...o}){return(0,st.jsx)("div",{...o,className:`${Mt.collapse} ${n}`,"data-open":!!e,"aria-hidden":!e,inert:e?void 0:"",children:(0,st.jsx)("div",{className:Mt.collapseInner,children:t})})}function Hn({label:e,checked:t,disabled:n,onChange:o,...i}){return(0,st.jsxs)("label",{className:Mt.toggle,"data-disabled":n||void 0,children:[(0,st.jsx)("input",{...i,type:"checkbox",role:"switch",checked:t,disabled:n,onChange:r=>o?.(r.target.checked)}),(0,st.jsx)("span",{className:Mt.toggleTrack,"aria-hidden":"true",children:(0,st.jsx)("span",{})}),(0,st.jsx)("span",{children:e})]})}function ss(e,{onReady:t,onError:n,visible:o=()=>!0,schedule:i=setTimeout,unschedule:r=clearTimeout}={}){let s=!1,a=!1,l=!1,u=null,d=0,p=null,f=()=>{u!==null&&r(u),u=null},m=async()=>{if(!(s||a||l||!o())){f(),a=!0;try{let b=await e();if(s){await b.dispose();return}try{t(b)}catch(v){throw await b.dispose(),v}p=b,l=!0,d=0}catch(b){if(s)return;n(b),d++,o()&&(u=i(()=>{u=null,m()},Math.min(3e4,750*2**Math.min(d-1,6))),u?.unref?.())}finally{a=!1}}};return{start:m,visibilityChanged(){o()?m():f()},refresh(){m()},dispose(){s=!0,f(),p?.dispose()}}}function jn(e){return e===null||e&&typeof e=="object"&&!Array.isArray(e)&&Object.keys(e).sort().join(",")==="backend,id,name"&&["winmm","portaudio"].includes(e.backend)&&typeof e.id=="string"&&e.id.length>0&&e.id.length<=1024&&typeof e.name=="string"&&e.name.trim().length>0&&e.name.length<=256&&!/[\u0000-\u001f\u007f]/.test(e.id+e.name)}function as(e){return e&&e.schema===1&&["input","output"].every(t=>{let n=e[t];return!n||!["available","empty","unavailable"].includes(n.status)||!Array.isArray(n.items)||n.items.length>128||!(n.reason===null||typeof n.reason=="string"&&n.reason.length<=128)?!1:n.items.every(o=>o!==null&&jn(o))&&new Set(n.items.map(o=>o.backend+":"+o.id)).size===n.items.length&&(n.status==="available"?n.items.length>0:n.items.length===0)})}var kn=Object.freeze(["ptt","always","wake"]),Co=e=>({ptt:"pttMode",always:"alwaysMode",wake:"wakeMode"})[e]??"modeUnknown",cs=e=>["waiting","listening"].includes(e?.state)&&e?.streamOpen!==!0?"unknown":{disabled:"wakeDisabled",starting:"wakeStarting",waiting:"wakeWaiting",listening:"wakeListening",paused:"wakePaused",error:"wakeError"}[e?.state]??"unknown",ls=e=>e!==null&&typeof e=="object"&&!Array.isArray(e)&&["disabled","starting","waiting","listening","paused","error"].includes(e.state)&&(e.deadlineAt===null||Number.isFinite(e.deadlineAt)&&e.deadlineAt>=0)&&typeof e.streamOpen=="boolean"&&["asr-after-utterance","acoustic-after-utterance"].includes(e.detection),us=e=>[...new Set(String(e).split(/[,，\n]/).map(t=>t.trim()).filter(Boolean))],zo=e=>Array.isArray(e)&&e.length>=1&&e.length<=8&&new Set(e.map(t=>typeof t=="string"?t.toLowerCase():t)).size===e.length&&e.every(t=>typeof t=="string"&&t.trim()===t&&t.length>=2&&t.length<=24&&!/[\p{C}]/u.test(t)&&/[\p{L}\p{N}]/u.test(t));function ds(e){if(!e||typeof e!="object"||Array.isArray(e)||!["unknown","available","empty","unavailable"].includes(e.status)||!Array.isArray(e.items)||e.items.length>128)return!1;if(e.status==="unknown")return e.observedAt===null&&e.items.length===0;if(!Number.isFinite(e.observedAt)||e.observedAt<0)return!1;if(e.status!=="available")return e.items.length===0;let t=new Set;return e.items.length>0&&e.items.every(n=>!n||typeof n!="object"||Array.isArray(n)||!Number.isSafeInteger(n.index)||n.index<0||t.has(n.index)||typeof n.name!="string"||!n.name.trim()||n.name.length>256||/[\u0000-\u001f\u007f]/.test(n.name)?!1:(t.add(n.index),!0))}var ce={};os(ce,{BIGINT_FORMAT_RANGES:()=>Ao,CONSTANT_CATCH:()=>_s,Class:()=>$r,NUMBER_FORMAT_RANGES:()=>Kn,aborted:()=>zt,allowsEval:()=>Fr,assert:()=>_p,assertEqual:()=>gp,assertIs:()=>xp,assertNever:()=>yp,assertNotEqual:()=>vp,assignProp:()=>dt,attachSchema:()=>Jn,base64ToUint8Array:()=>xs,base64urlToUint8Array:()=>Bp,cached:()=>Cn,captureStackTrace:()=>Wo,cleanEnum:()=>Zp,cleanRegex:()=>qn,clone:()=>Ct,cloneDef:()=>Sp,codePointLength:()=>Gn,constantCatch:()=>ws,createTransparentProxy:()=>Wp,defineLazy:()=>Dr,defineLazyInternal:()=>be,derived:()=>Vp,esc:()=>Zr,escapeRegex:()=>Ut,explicitlyAborted:()=>Vr,extend:()=>Ep,finalizeIssue:()=>Pt,floatSafeRemainder:()=>Rr,getElementAtPath:()=>Ip,getEnumValues:()=>In,getLengthableOrigin:()=>Yn,getParsedType:()=>Pp,getSizableOrigin:()=>bs,hexToUint8Array:()=>Up,hide:()=>$o,installLazyProp:()=>Kp,isObject:()=>pn,isPlainObject:()=>Qt,issue:()=>Pn,joinValues:()=>Po,jsonStringifyReplacer:()=>Mn,members:()=>jr,merge:()=>$p,mergeDefs:()=>Ft,normalizeParams:()=>se,nullish:()=>Or,numKeys:()=>zp,objectClone:()=>wp,omit:()=>Ap,optionalKeys:()=>Lr,own:()=>Xt,parsedType:()=>Hr,partial:()=>Op,pick:()=>Np,prefixIssues:()=>Lt,primitiveTypes:()=>gs,promiseAllObject:()=>Mp,propertyKeyTypes:()=>Ur,randomString:()=>Cp,rawShape:()=>zn,required:()=>Rp,safeExtend:()=>Tp,shallowClone:()=>hs,sizeCaps:()=>To,slugify:()=>Br,stringifyPrimitive:()=>No,toZod:()=>bp,uint8ArrayToBase64:()=>ys,uint8ArrayToBase64url:()=>Fp,uint8ArrayToHex:()=>Lp,unwrapMessage:()=>Sn});function gp(e){return e}function vp(e){return e}function bp(){return e=>e}function xp(e){}function yp(e){throw new Error("Unexpected value in exhaustive check")}function _p(e){}function In(e){let t=Object.values(e).filter(o=>typeof o=="number");return Object.entries(e).filter(([o,i])=>t.indexOf(+o)===-1).map(([o,i])=>i)}function Po(e,t="|"){return e.map(n=>No(n)).join(t)}function Mn(e,t){return typeof t=="bigint"?t.toString():t}var Tr=class{constructor(t){this._getter=t,this._value=void 0}get value(){let t=this._getter;return t!==void 0&&(this._value=t(),this._getter=void 0),this._value}};function Cn(e){return new Tr(e)}function Or(e){return e==null}function qn(e){let t=e.startsWith("^")?1:0,n=e.endsWith("$")?e.length-1:e.length;return e.slice(t,n)}function Rr(e,t){let n=e/t,o=Math.round(n),i=4*Number.EPSILON*Math.max(Math.abs(n),1);return Math.abs(n-o)<i?0:n-o}var ps=Symbol("evaluating");function Dr(e,t,n){let o;Object.defineProperty(e,t,{get(){if(o!==ps)return o===void 0&&(o=ps,o=n()),o},set(i){Object.defineProperty(e,t,{value:i})},configurable:!0})}function wp(e){return Object.create(Object.getPrototypeOf(e),Object.getOwnPropertyDescriptors(e))}function dt(e,t,n){Object.defineProperty(e,t,{value:n,writable:!0,enumerable:!0,configurable:!0})}function zn(e){let t=Object.getOwnPropertyDescriptor(e,"shape");return t?.get?t.get.raw:t?.value}function Bt(e){return zn(e._zod.def)??e._zod.def.shape}function ms(e,t,n){Object.defineProperty(e,t,{get(){let o=n();return dt(this,t,o),o},enumerable:!0,configurable:!0})}function fs(e,t,n){t in e?dt(e,t,n):e[t]=n}function dn(e,t,n,o){let i=Bt(t);for(let r of n){let s=Object.getOwnPropertyDescriptor(i,r);s.enumerable&&(s.get?ms(e,r,()=>{let a=t._zod.def.shape[r];return o?o(a,r):a}):fs(e,r,o?o(s.value,r):s.value))}}function kp(e,t){for(let n of Reflect.ownKeys(t)){let o=Object.getOwnPropertyDescriptor(t,n);o.enumerable&&(o.get?ms(e,n,()=>t[n]):fs(e,n,o.value))}}function Ft(...e){let t={};for(let n of e){let o=Object.getOwnPropertyDescriptors(n);Object.assign(t,o)}return Object.defineProperties({},t)}function Sp(e){return Ft(e._zod.def)}function Ip(e,t){return t?t.reduce((n,o)=>n?.[o],e):e}function Mp(e){let t=Object.keys(e),n=t.map(o=>e[o]);return Promise.all(n).then(o=>{let i={};for(let r=0;r<t.length;r++)i[t[r]]=o[r];return i})}function Cp(e=10){let t="abcdefghijklmnopqrstuvwxyz",n="";for(let o=0;o<e;o++)n+=t[Math.floor(Math.random()*t.length)];return n}function Zr(e){return JSON.stringify(e)}function Br(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/[\s_-]+/g,"-").replace(/^-+|-+$/g,"")}var Wo="captureStackTrace"in Error?Error.captureStackTrace:(...e)=>{};function pn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}var Fr=Cn(()=>{if(at.jitless||typeof navigator<"u"&&navigator?.userAgent?.includes("Cloudflare"))return!1;try{let e=Function;return new e(""),!0}catch{return!1}});function Qt(e){if(pn(e)===!1)return!1;let t=e.constructor;if(t===void 0||typeof t!="function")return!0;let n=t.prototype;return!(pn(n)===!1||Object.prototype.hasOwnProperty.call(n,"isPrototypeOf")===!1)}function hs(e){return Qt(e)?{...e}:Array.isArray(e)?[...e]:e instanceof Map?new Map(e):e instanceof Set?new Set(e):e}function zp(e){let t=0;for(let n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}var Pp=e=>{let t=typeof e;switch(t){case"undefined":return"undefined";case"string":return"string";case"number":return Number.isNaN(e)?"nan":"number";case"boolean":return"boolean";case"function":return"function";case"bigint":return"bigint";case"symbol":return"symbol";case"object":return Array.isArray(e)?"array":e===null?"null":e.then&&typeof e.then=="function"&&e.catch&&typeof e.catch=="function"?"promise":typeof Map<"u"&&e instanceof Map?"map":typeof Set<"u"&&e instanceof Set?"set":typeof Date<"u"&&e instanceof Date?"date":typeof File<"u"&&e instanceof File?"file":"object";default:throw new Error(`Unknown data type: ${t}`)}},Ur=new Set(["string","number","symbol"]),gs=new Set(["string","number","bigint","boolean","symbol","undefined"]);function Ut(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Ct(e,t,n){let o=new e._zod.constr(t??e._zod.def);return(!t||n?.parent)&&(o._zod.parent=e),o}function se(e){let t=e;if(!t)return{};if(typeof t=="string")return{error:()=>t};if(t?.message!==void 0){if(t?.error!==void 0)throw new Error("Cannot specify both `message` and `error` params");t.error=t.message}return delete t.message,typeof t.error=="string"?{...t,error:()=>t.error}:t}function Wp(e){let t;return new Proxy({},{get(n,o,i){return t??(t=e()),Reflect.get(t,o,i)},set(n,o,i,r){return t??(t=e()),Reflect.set(t,o,i,r)},has(n,o){return t??(t=e()),Reflect.has(t,o)},deleteProperty(n,o){return t??(t=e()),Reflect.deleteProperty(t,o)},ownKeys(n){return t??(t=e()),Reflect.ownKeys(t)},getOwnPropertyDescriptor(n,o){return t??(t=e()),Reflect.getOwnPropertyDescriptor(t,o)},defineProperty(n,o,i){return t??(t=e()),Reflect.defineProperty(t,o,i)}})}function No(e){return typeof e=="bigint"?e.toString()+"n":typeof e=="string"?`"${e}"`:`${e}`}function Lr(e){return Object.keys(e).filter(t=>e[t]._zod.optin!==void 0&&e[t]._zod.optout==="optional")}var Kn={safeint:[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],int32:[-2147483648,2147483647],uint32:[0,4294967295],float32:[-34028234663852886e22,34028234663852886e22],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]},Ao={int64:[BigInt("-9223372036854775808"),BigInt("9223372036854775807")],uint64:[BigInt(0),BigInt("18446744073709551615")]};function Np(e,t){let n=e._zod.def,o=n.checks;if(o&&o.length>0)throw new Error(".pick() cannot be used on object schemas containing refinements");let r={};return dn(r,e,Eo(e,t)),Ct(e,Ft(n,{shape:r,checks:[]}))}function Eo(e,t){let n=Bt(e),o=[];for(let i of Reflect.ownKeys(t)){if(!Object.getOwnPropertyDescriptor(n,i)?.enumerable)throw new Error(`Unrecognized key: "${String(i)}"`);t[i]&&o.push(i)}return o}function Ap(e,t){let n=e._zod.def,o=n.checks;if(o&&o.length>0)throw new Error(".omit() cannot be used on object schemas containing refinements");let r=new Set(Eo(e,t)),s={};return dn(s,e,Reflect.ownKeys(Bt(e)).filter(a=>!r.has(a))),Ct(e,Ft(n,{shape:s,checks:[]}))}function Ep(e,t){if(!Qt(t))throw new Error("Invalid input to extend: expected a plain object");let n=e._zod.def.checks;if(n&&n.length>0){let i=Bt(e);for(let r of Reflect.ownKeys(t))if(Object.getOwnPropertyDescriptor(i,r)!==void 0)throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.")}return Ct(e,Ft(e._zod.def,{shape:vs(e,t)}))}function vs(e,t){let n={};return dn(n,e,Reflect.ownKeys(Bt(e))),kp(n,t),n}function Tp(e,t){if(!Qt(t))throw new Error("Invalid input to safeExtend: expected a plain object");return Ct(e,Ft(e._zod.def,{shape:vs(e,t)}))}function $p(e,t){if(!t?._zod?.def)throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");if(e._zod.def.checks?.length)throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");let n={};dn(n,e,Reflect.ownKeys(Bt(e))),dn(n,t,Reflect.ownKeys(Bt(t)));let o=Ft(e._zod.def,{shape:n,get catchall(){return t._zod.def.catchall},checks:t._zod.def.checks??[]});return Ct(e,o)}function Op(e,t,n,o="partial"){let r=t._zod.def.checks;if(r&&r.length>0)throw new Error(`.${o}() cannot be used on object schemas containing refinements`);let a=n?new Set(Eo(t,n)):void 0,l={};return dn(l,t,Reflect.ownKeys(Bt(t)),e&&((u,d)=>a&&!a.has(d)?u:new e({type:"optional",innerType:u}))),Ct(t,Ft(t._zod.def,{shape:l,checks:[]}))}function Rp(e,t,n){let o=n?new Set(Eo(t,n)):void 0,i={};return dn(i,t,Reflect.ownKeys(Bt(t)),(r,s)=>o&&!o.has(s)?r:new e({type:"nonoptional",innerType:r})),Ct(t,Ft(t._zod.def,{shape:i}))}function zt(e,t=0){if(e.aborted===!0)return!0;for(let n=t;n<e.issues.length;n++)if(e.issues[n]?.continue!==!0)return!0;return!1}function Vr(e,t=0){if(e.aborted===!0)return!0;for(let n=t;n<e.issues.length;n++)if(e.issues[n]?.continue===!1)return!0;return!1}function Lt(e,t){return t.map(n=>{var o;return(o=n).path??(o.path=[]),n.path.unshift(e),n})}function Sn(e){return typeof e=="string"?e:e?.message}function To(e){let t=[];for(let n of e??[]){let o=n._zod.def;if(!/_(length|size)$|_equals$/.test(o.check))break;let i=o.maximum??o.length??o.size;i>=0&&t.push([i,n])}return t}function Jn(e,t,n){var o;for(let i=t;i<e.length;i++)(o=e[i]).schema??(o.schema=n)}function Pt(e,t,n){var o;let i=e.inst?._zod?.traits;i?.has("$ZodType")&&(i.has("$ZodCheck")?(o=e).schema??(o.schema=e.inst):e.schema=e.inst);let r=e.schema!==e.inst?e.schema?._zod.def?.error:void 0,s=e.message?e.message:Sn(e.inst?._zod.def?.error?.(e))??Sn(r?.(e))??Sn(t?.error?.(e))??Sn(n.customError?.(e))??Sn(n.localeError?.(e))??"Invalid input",a={};for(let l of Object.keys(e))l==="inst"||l==="schema"||l==="continue"||l==="input"||l==="__proto__"||(a[l]=e[l]);return a.path??(a.path=[]),a.message=s,t?.reportInput&&(a.input=e.input),a}function bs(e){return e instanceof Set?"set":e instanceof Map?"map":e instanceof File?"file":"unknown"}var Dp=/[\uD800-\uDBFF]/;function Gn(e){let t=e.length;if(!Dp.test(e))return t;let n=t;for(let o=0;o<t-1;o++)(e.charCodeAt(o)&64512)===55296&&(e.charCodeAt(o+1)&64512)===56320&&(n--,o++);return n}function Yn(e){return Array.isArray(e)?"array":typeof e=="string"?"string":"unknown"}function Hr(e){let t=typeof e;switch(t){case"number":return Number.isNaN(e)?"nan":"number";case"object":{if(e===null)return"null";if(Array.isArray(e))return"array";let n=e;if(n&&Object.getPrototypeOf(n)!==Object.prototype&&"constructor"in n&&n.constructor)return n.constructor.name}}return t}function Pn(...e){let[t,n,o]=e;return typeof t=="string"?{message:t,code:"custom",input:n,inst:o}:{...t}}function Zp(e){return Object.entries(e).filter(([t,n])=>Number.isNaN(Number.parseInt(t,10))).map(t=>t[1])}function xs(e){let t=atob(e),n=new Uint8Array(t.length);for(let o=0;o<t.length;o++)n[o]=t.charCodeAt(o);return n}function ys(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t)}function Bp(e){let t=e.replace(/-/g,"+").replace(/_/g,"/"),n="=".repeat((4-t.length%4)%4);return xs(t+n)}function Fp(e){return ys(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}function Up(e){let t=e.replace(/^0x/,"");if(t.length%2!==0)throw new Error("Invalid hex string length");let n=new Uint8Array(t.length/2);for(let o=0;o<t.length;o+=2)n[o/2]=Number.parseInt(t.slice(o,o+2),16);return n}function Lp(e){return Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("")}var $r=class{constructor(...t){}};function jr(e,t){for(let n in t){let o=Object.getOwnPropertyDescriptor(t,n);o.get?Object.defineProperty(e,n,{...o,enumerable:!1}):Hp(e,n,o.value)}}function Xt(e,t,n,o=!0){return Object.defineProperty(e,t,{configurable:!0,writable:!0,enumerable:o,value:n}),n}function $o(e,t,n){return Xt(e,t,n,!1)}function Vp(e,t){for(let n in e){let o=e[n];Object.defineProperty(t,n,{configurable:!0,enumerable:!0,get(){return Xt(this,n,o(this))},set(i){Xt(this,n,i)}})}return t}function Hp(e,t,n){Object.defineProperty(e,t,{configurable:!0,get(){return this==null?n:Xt(this,t,n.bind(this))},set(o){Xt(this,t,o)}})}function jp(e,t){let n=Object.getPrototypeOf(e);return t in n?void 0:n}var Er,Yt=!1,qp={configurable:!0,get(){Yt=!0}};function be(e,t,n){let o=Object.getPrototypeOf(e._zod);if(t in o&&Er!==e._zod){Er=void 0;return}Er=e._zod,Object.defineProperty(o,t,{configurable:!0,get(){Object.defineProperty(this,t,qp);let i=Yt;Yt=!1;try{let r=n(this);return Yt?delete this[t]:Object.defineProperty(this,t,{configurable:!0,writable:!0,value:r}),Yt=Yt||i,r}catch(r){throw delete this[t],Yt=Yt||i,r}},set(i){Object.defineProperty(this,t,{configurable:!0,writable:!0,value:i})}})}function Kp(e,t,n,o){let i=jp(e,t);i&&Object.defineProperty(i,t,{configurable:!0,get(){let r={configurable:!0,writable:!0,enumerable:o,value:void 0};return Object.defineProperty(this,t,r),r.value=n(this),Object.defineProperty(this,t,r),r.value},set(r){Object.defineProperty(this,t,{configurable:!0,writable:!0,enumerable:o,value:r})}})}var _s="~constantCatch";function ws(e){let t=()=>e;return t[_s]=!0,t}var ks;var qr={value:void 0,enumerable:!1},Ss="captureStackTrace"in Error?Error:null;function Jp(e){let t=Ss;if(t){let n=t.stackTraceLimit;if(typeof n=="number"){try{t.stackTraceLimit=0}catch{return Ss=null,new e}try{return new e}finally{t.stackTraceLimit=n}}}return new e}function T(e,t,n,o){let i={};function r(f){this.def=f,this.constr=p,this.traits=new Set}r.prototype=i;let s=n,a=s&&new WeakSet;function l(f,m){if(f._zod){if(f._zod.traits.has(e))return}else{qr.value=new r(m);try{Object.defineProperty(f,"_zod",qr)}finally{qr.value=void 0}}if(f._zod.traits.add(e),t(f,m),a){let v=Object.getPrototypeOf(f),y=f._zod.constr.prototype,w=v;for(;w&&w!==y;)w=Object.getPrototypeOf(w);let C=w??v;a.has(C)||(a.add(C),jr(C,s))}let b=p.prototype;for(let v in b)Object.prototype.hasOwnProperty.call(b,v)&&(v in f||(f[v]=b[v].bind(f)))}let u=o?.Parent??Object;class d extends u{}Object.defineProperty(d,"name",{value:e});function p(f){let m=o?.Parent?Jp(d):this;l(m,f);let b=m._zod.deferred;if(b){for(let y of b)y();m._zod.deferred=void 0}let v=globalThis.__zod_globalConfig?.postProcessor;return v&&v(m),m}return Object.defineProperty(p,"init",{value:l}),Object.defineProperty(p,Symbol.hasInstance,{value:f=>o?.Parent&&f instanceof o.Parent?!0:f?._zod?.traits?.has(e)}),Object.defineProperty(p,"name",{value:e}),p}var Wt=class extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}},Wn=class extends Error{constructor(t){super(`Encountered unidirectional transform during encode: ${t}`),this.name="ZodEncodeError"}};(ks=globalThis).__zod_globalConfig??(ks.__zod_globalConfig={});var at=globalThis.__zod_globalConfig;function pt(e){return e&&Object.assign(at,e),at}function Gp(){let e=this._zod;return e.message??(e.message=JSON.stringify(e.def,Mn,2)),e.message}function Yp(e){this._zod.message=e}var Xp={get:Gp,set:Yp,enumerable:!0,configurable:!0},Jr={value:void 0,enumerable:!1},Is=new WeakSet([Object.prototype,Error.prototype]),Ms=(e,t)=>{e.name="$ZodError",Jr.value=t,Object.defineProperty(e,"issues",Jr),Jr.value=void 0,Object.defineProperty(e,"message",Xp);let n=Object.getPrototypeOf(e);Is.has(n)||(Is.add(n),Object.defineProperty(n,"toString",{configurable:!0,enumerable:!1,get(){let o=()=>this.message;return Object.defineProperty(this,"toString",{value:o,configurable:!0,writable:!0}),o},set(o){Object.defineProperty(this,"toString",{value:o,configurable:!0,writable:!0})}}))},Cs=T("$ZodError",Ms),Ug=T("$ZodError",Ms,void 0,{Parent:Error});function Qp(e,t,n){return Object.prototype.hasOwnProperty.call(e,t)||(t==="__proto__"?Object.defineProperty(e,t,{value:n(),writable:!0,enumerable:!0,configurable:!0}):e[t]=n()),e[t]}function zs(e,t=n=>n.message){let n={},o=[];for(let i of e.issues)i.path.length>0?Qp(n,i.path[0],()=>[]).push(t(i)):o.push(t(i));return{formErrors:o,fieldErrors:n}}function Ps(e,t=n=>n.message){let n={_errors:[]},o=(i,r=[])=>{for(let s of i.issues)if(s.code==="invalid_union"&&s.errors.length)s.errors.map(a=>o({issues:a},[...r,...s.path]));else if(s.code==="invalid_key")o({issues:s.issues},[...r,...s.path]);else if(s.code==="invalid_element")o({issues:s.issues},[...r,...s.path]);else{let a=[...r,...s.path];if(a.length===0)n._errors.push(t(s));else{let l=n,u=0;for(;u<a.length;){let d=a[u],p=u===a.length-1;if(d==="_errors"){p&&l._errors.push(t(s)),u++;continue}Object.prototype.hasOwnProperty.call(l,d)||Object.defineProperty(l,d,{value:{_errors:[]},enumerable:!0,writable:!0,configurable:!0});let f=l[d];p&&f._errors.push(t(s)),l=f,u++}}}};return o(e),n}function Oo(e,t){return{callee:t?.callee??e,Err:t?.Err}}var Ro=e=>{let t=(n,o,i,r)=>{let s=i?{...i,async:!1}:{async:!1},a=n._zod.run({value:o,issues:[]},s);if(a instanceof Promise)throw new Wt;if(a.issues.length){let l=new(r?.Err??e)(a.issues.map(u=>Pt(u,s,pt())));throw Wo(l,r?.callee??t),l}return a.value};return t};var Do=e=>{let t=async(n,o,i,r)=>{let s=i?{...i,async:!0}:{async:!0},a=n._zod.run({value:o,issues:[]},s);if(a instanceof Promise&&(a=await a),a.issues.length){let l=new(r?.Err??e)(a.issues.map(u=>Pt(u,s,pt())));throw Wo(l,r?.callee??t),l}return a.value};return t};var Zo=e=>(t,n,o)=>{let i=o?{...o,async:!1}:{async:!1},r=t._zod.run({value:n,issues:[]},i);if(r instanceof Promise)throw new Wt;return r.issues.length?Ws(e,r.issues,i):{success:!0,data:r.value}};function Ws(e,t,n){let o;return{success:!1,get error(){return o||(o=new e(t.map(i=>Pt(i,n,pt()))),t=void 0,n=void 0),o},set error(i){o=i,t=void 0,n=void 0}}}var Bo=e=>async(t,n,o)=>{let i=o?{...o,async:!0}:{async:!0},r=t._zod.run({value:n,issues:[]},i);return r instanceof Promise&&(r=await r),r.issues.length?Ws(e,r.issues,i):{success:!0,data:r.value}};var em=Symbol.for("zod.compile.invalid"),tm=Symbol.for("zod.compile.fallback"),Gr=((e,t,n)=>{let o=e._zod.bag.validator;if(o!==void 0){if(o(t)!==em)return!0;if(o.definite===!0&&n===void 0)return!1}return nm(e,t,n)});function nm(e,t,n){let o=n?{...n,async:!1,abortEarly:!0}:{async:!1,abortEarly:!0},i=e._zod.bag.fallbackRun,r;if(i?(o[tm]=!0,r=i({value:t,issues:[]},o)):r=e._zod.run({value:t,issues:[]},o),r instanceof Promise)throw new Wt;return r.issues.length===0}var Yr=async(e,t,n)=>{let o=n?{...n,async:!0,abortEarly:!0}:{async:!0,abortEarly:!0},i=e._zod.run({value:t,issues:[]},o);return i instanceof Promise&&(i=await i),i.issues.length===0},Ns=e=>{let t=Ro(e),n=(o,i,r,s)=>{let a=r?{...r,direction:"backward"}:{direction:"backward"};return t(o,i,a,Oo(n,s))};return n};var As=e=>{let t=Ro(e),n=(o,i,r,s)=>t(o,i,r,Oo(n,s));return n};var Es=e=>{let t=Do(e),n=async(o,i,r,s)=>{let a=r?{...r,direction:"backward"}:{direction:"backward"};return await t(o,i,a,Oo(n,s))};return n};var Ts=e=>{let t=Do(e),n=async(o,i,r,s)=>await t(o,i,r,Oo(n,s));return n};var $s=e=>(t,n,o)=>{let i=o?{...o,direction:"backward"}:{direction:"backward"};return Zo(e)(t,n,i)};var Os=e=>(t,n,o)=>Zo(e)(t,n,o);var Rs=e=>async(t,n,o)=>{let i=o?{...o,direction:"backward"}:{direction:"backward"};return Bo(e)(t,n,i)};var Ds=e=>async(t,n,o)=>Bo(e)(t,n,o);var Zs=/^[cC][0-9a-z]{6,}$/,Bs=/^[0-9a-z]+$/,Fs=/^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/,Us=/^[0-9a-vA-V]{20}$/,Ls=/^[A-Za-z0-9]{27}$/,Vs=/^[a-zA-Z0-9_-]{21}$/;function Hs(e){return new RegExp(`^[a-zA-Z0-9_-]{${e}}$`)}var js=/^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;var qs=/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,Qr=e=>e?new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`):/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;var Ks=/^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;var om="^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";function Js(){return new RegExp(om,"u")}var Gs=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,Ys=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;var Xs=/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,Qs=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,ea=/^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,ta=/^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/;var na=/^https?$/,oa=/^\+[1-9]\d{6,14}$/;var ra="(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";function rm(e){return new RegExp(`^${e}$`)}var ia=rm(ra);function Xr(e){let t="(?:[01]\\d|2[0-3]):[0-5]\\d";return typeof e.precision=="number"?e.precision===-1?`${t}`:e.precision===0?`${t}:[0-5]\\d`:`${t}:[0-5]\\d\\.\\d{${e.precision}}`:e.seconds?`${t}:[0-5]\\d(?:\\.\\d+)?`:`${t}(?::[0-5]\\d(?:\\.\\d+)?)?`}function sa(e){return new RegExp(`^${Xr(e)}$`)}function aa(e){let t=["Z"];e.offset&&t.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");let n=`${Xr({precision:e.precision,seconds:!0})}(?:${t.join("|")})`,o=e.local?`${n}|${Xr({precision:e.precision})}`:n;return new RegExp(`^${ra}T(?:${o})$`)}var ca=/^[\s\S]{0,}$/;var ei=/^-?\d+$/,Xn=/^-?\d+(?:\.\d+)?$/,la=/^(?:true|false)$/i,ua=/^null$/i;var da=/^[^A-Z]*$/,pa=/^[^a-z]*$/;var Ge=T("$ZodCheck",(e,t)=>{var n;e._zod??(e._zod={}),e._zod.def=t,(n=e._zod).onattach??(n.onattach=[])});var ti=e=>{let t=e.value;return!Or(t)&&t.length!==void 0},Fo={number:"number",bigint:"bigint",object:"date"},ni=T("$ZodCheckLessThan",(e,t)=>{Ge.init(e,t);let n=Fo[typeof t.value];e._zod.check=o=>{(t.inclusive?o.value<=t.value:o.value<t.value)||o.issues.push({origin:Fo[typeof o.value]??n,code:"too_big",maximum:typeof t.value=="object"?t.value.getTime():t.value,input:o.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),oi=T("$ZodCheckGreaterThan",(e,t)=>{Ge.init(e,t);let n=Fo[typeof t.value];e._zod.check=o=>{(t.inclusive?o.value>=t.value:o.value>t.value)||o.issues.push({origin:Fo[typeof o.value]??n,code:"too_small",minimum:typeof t.value=="object"?t.value.getTime():t.value,input:o.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),ma=T("$ZodCheckMultipleOf",(e,t)=>{Ge.init(e,t),e._zod.check=n=>{if(typeof n.value!=typeof t.value)throw new Error("Cannot mix number and bigint in multiple_of check.");(typeof n.value=="bigint"?t.value!==BigInt(0)&&n.value%t.value===BigInt(0):Rr(n.value,t.value)===0)||n.issues.push({origin:typeof n.value,code:"not_multiple_of",divisor:t.value,input:n.value,inst:e,continue:!t.abort})}}),fa=T("$ZodCheckNumberFormat",(e,t)=>{Ge.init(e,t),t.format=t.format||"float64";let n=t.format?.includes("int"),o=n?"int":"number",[i,r]=Kn[t.format];e._zod.check=s=>{let a=s.value;if(n){if(!Number.isInteger(a)){s.issues.push({expected:o,format:t.format,code:"invalid_type",continue:!1,input:a,inst:e});return}if(!Number.isSafeInteger(a)){a>0?s.issues.push({input:a,code:"too_big",maximum:Number.MAX_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:o,inclusive:!0,continue:!t.abort}):s.issues.push({input:a,code:"too_small",minimum:Number.MIN_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:o,inclusive:!0,continue:!t.abort});return}}a<i&&s.issues.push({origin:"number",input:a,code:"too_small",minimum:i,inclusive:!0,inst:e,continue:!t.abort}),a>r&&s.issues.push({origin:"number",input:a,code:"too_big",maximum:r,inclusive:!0,inst:e,continue:!t.abort})}});var ha=T("$ZodCheckMaxLength",(e,t)=>{var n;Ge.init(e,t),(n=e._zod.def).when??(n.when=ti),e._zod.check=o=>{let i=o.value,r=i.length;if((typeof i=="string"&&r>t.maximum?Gn(i):r)<=t.maximum)return;let a=Yn(i);o.issues.push({origin:a,code:"too_big",maximum:t.maximum,inclusive:!0,input:i,inst:e,continue:!t.abort})}}),ga=T("$ZodCheckMinLength",(e,t)=>{var n;Ge.init(e,t),(n=e._zod.def).when??(n.when=ti),e._zod.check=o=>{let i=o.value,r=i.length;if((typeof i=="string"&&r>=t.minimum&&r<t.minimum*2?Gn(i):r)>=t.minimum)return;let a=Yn(i);o.issues.push({origin:a,code:"too_small",minimum:t.minimum,inclusive:!0,input:i,inst:e,continue:!t.abort})}}),va=T("$ZodCheckLengthEquals",(e,t)=>{var n;Ge.init(e,t),(n=e._zod.def).when??(n.when=ti),e._zod.check=o=>{let i=o.value,r=i.length,s=typeof i=="string"&&r>=t.length&&r<=t.length*2?Gn(i):r;if(s===t.length)return;let a=Yn(i),l=s>t.length;o.issues.push({origin:a,...l?{code:"too_big",maximum:t.length}:{code:"too_small",minimum:t.length},inclusive:!0,exact:!0,input:o.value,inst:e,continue:!t.abort})}}),eo=T("$ZodCheckStringFormat",(e,t)=>{var n,o;Ge.init(e,t),t.pattern?(n=e._zod).check??(n.check=i=>{t.pattern.lastIndex=0,!t.pattern.test(i.value)&&i.issues.push({origin:"string",code:"invalid_format",format:t.format,input:i.value,...t.pattern?{pattern:t.pattern.toString()}:{},inst:e,continue:!t.abort})}):(o=e._zod).check??(o.check=()=>{})}),ba=T("$ZodCheckRegex",(e,t)=>{eo.init(e,t),e._zod.check=n=>{t.pattern.lastIndex=0,!t.pattern.test(n.value)&&n.issues.push({origin:"string",code:"invalid_format",format:"regex",input:n.value,pattern:t.pattern.toString(),inst:e,continue:!t.abort})}}),xa=T("$ZodCheckLowerCase",(e,t)=>{t.pattern??(t.pattern=da),eo.init(e,t)}),ya=T("$ZodCheckUpperCase",(e,t)=>{t.pattern??(t.pattern=pa),eo.init(e,t)}),_a=T("$ZodCheckIncludes",(e,t)=>{Ge.init(e,t);let n=Ut(t.includes),o=new RegExp(typeof t.position=="number"?`^.{${t.position},}${n}`:n);t.pattern=o,e._zod.check=i=>{i.value.includes(t.includes,t.position)||i.issues.push({origin:"string",code:"invalid_format",format:"includes",includes:t.includes,input:i.value,inst:e,continue:!t.abort})}}),wa=T("$ZodCheckStartsWith",(e,t)=>{Ge.init(e,t);let n=new RegExp(`^${Ut(t.prefix)}.*`);t.pattern??(t.pattern=n),e._zod.check=o=>{o.value.startsWith(t.prefix)||o.issues.push({origin:"string",code:"invalid_format",format:"starts_with",prefix:t.prefix,input:o.value,inst:e,continue:!t.abort})}}),ka=T("$ZodCheckEndsWith",(e,t)=>{Ge.init(e,t);let n=new RegExp(`.*${Ut(t.suffix)}$`);t.pattern??(t.pattern=n),e._zod.check=o=>{o.value.endsWith(t.suffix)||o.issues.push({origin:"string",code:"invalid_format",format:"ends_with",suffix:t.suffix,input:o.value,inst:e,continue:!t.abort})}});var Sa=T("$ZodCheckOverwrite",(e,t)=>{Ge.init(e,t),e._zod.check=n=>{n.value=t.tx(n.value)}});var Uo=class{constructor(t=[],n={}){this.content=[],this.indent=0,this.args=t,this.closed=n}indented(t){this.indent+=1;try{t(this)}finally{this.indent-=1}}write(t){if(typeof t=="function"){t(this,{execution:"sync"}),t(this,{execution:"async"});return}let o=t.split(`
`).filter(s=>s),i=Math.min(...o.map(s=>s.length-s.trimStart().length)),r=o.map(s=>s.slice(i)).map(s=>" ".repeat(this.indent*2)+s);for(let s of r)this.content.push(s)}compile(){let t=Function,n=this?.content??[""];return new t(...Object.keys(this.closed),`return function (${this.args.join(", ")}) {
${n.join(`
`)}
};`)(...Object.values(this.closed))}};var Ma={major:4,minor:6,patch:7};var Me=T("$ZodType",(e,t)=>{var n;e??(e={}),e._zod.def=t,e._zod.bag=e._zod.bag||{},e._zod.version=Ma;let o=e._zod.def.checks,i=e._zod.traits.has("$ZodCheck")?[e,...o??[]]:o?.length?[...o]:[];for(let r of i)for(let s of r._zod.onattach)s(e);if(i.length===0)(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{let r=(a,l,u)=>{if(a.memo)return a;let d=zt(a),p;for(let f of l){if(f._zod.def.when){if(Vr(a)||!f._zod.def.when(a))continue}else if(d)continue;let m=a.issues.length,b=f._zod.check(a);if(b instanceof Promise&&u?.async===!1)throw new Wt;if(p||b instanceof Promise)p=(p??Promise.resolve()).then(async()=>{await b,a.issues.length!==m&&(Jn(a.issues,m,e),d||(d=zt(a,m)))});else{if(a.issues.length===m)continue;Jn(a.issues,m,e),d||(d=zt(a,m))}}return p?p.then(()=>a):a},s=(a,l,u)=>{if(zt(a))return a.aborted=!0,a;let d=r(l,i,u);if(d instanceof Promise){if(u.async===!1)throw new Wt;return d.then(p=>e._zod.parse(p,u))}return e._zod.parse(d,u)};e._zod.run=(a,l)=>{if(l.skipChecks)return e._zod.parse(a,l);if(l.direction==="backward"){let d=e._zod.parse({value:a.value,issues:[]},{...l,skipChecks:!0});return d instanceof Promise?d.then(p=>s(p,a,l)):s(d,a,l)}let u=e._zod.parse(a,l);if(u instanceof Promise){if(l.async===!1)throw new Wt;return u.then(d=>r(d,i,l))}return r(u,i,l)}}},{get"~standard"(){return $o(this,"~standard",ii(this))},set"~standard"(e){Xt(this,"~standard",e)}}),Ra=(e,t)=>e.issues.length?{issues:e.issues.map(n=>Pt(n,t,pt()))}:{value:e.value};async function im(e,t){let n={async:!0};return Ra(await e._zod.run({value:t,issues:[]},n),n)}function ii(e){return{validate:t=>{let n={async:!1};try{let o=e._zod.run({value:t,issues:[]},n);if(!(o instanceof Promise))return Ra(o,n)}catch{}return im(e,t)},vendor:"zod",version:1}}var jo=T("$ZodString",(e,t)=>{Me.init(e,t),e._zod.pattern=t.pattern??ca,e._zod.parse=(n,o)=>{if(t.coerce)try{n.value=String(n.value)}catch{}return typeof n.value=="string"||n.issues.push({expected:"string",code:"invalid_type",input:n.value,inst:e}),n}}),ze=T("$ZodStringFormat",(e,t)=>{eo.init(e,t),jo.init(e,t)}),Da=T("$ZodGUID",(e,t)=>{t.pattern??(t.pattern=qs),ze.init(e,t)}),Za=T("$ZodUUID",(e,t)=>{if(t.version){let o={v1:1,v2:2,v3:3,v4:4,v5:5,v6:6,v7:7,v8:8}[t.version];if(o===void 0)throw new Error(`Invalid UUID version: "${t.version}"`);t.pattern??(t.pattern=Qr(o))}else t.pattern??(t.pattern=Qr());ze.init(e,t)}),Ba=T("$ZodEmail",(e,t)=>{t.pattern??(t.pattern=Ks),ze.init(e,t)}),Fa=1,Vo=2;function Ua(e){try{return typeof URL<"u"&&typeof URL.canParse=="function"?URL.canParse(e):(new URL(e),!0)}catch{return!1}}function sm(e,t){return!("normalize"in t)&&!("hostname"in t)&&!("protocol"in t)?Ua(e)||Vo:am(e,t)}function am(e,t){if(!t.normalize&&t.protocol?.source===na.source&&!/^https?:\/\//i.test(e))return Fa;try{if(typeof URL<"u"){let n=URL;if(typeof n.parse=="function")return n.parse(e)??Vo}return new URL(e)}catch{return Vo}}var cm=/[\t\n\r]/g;function Ca(e){return e.replace(cm,"")}function lm(e,t){return t.lastIndex=0,t.test(e.hostname)}function um(e,t){return t.lastIndex=0,t.test(e.protocol.endsWith(":")?e.protocol.slice(0,-1):e.protocol)}var La=T("$ZodURL",(e,t)=>{ze.init(e,t),e._zod.check=n=>{try{let o=n.value.trim(),i=sm(o,t);if(i===Fa){n.issues.push({code:"invalid_format",format:"url",note:"Invalid URL format",input:n.value,inst:e,continue:!t.abort});return}if(i===Vo){n.issues.push({code:"invalid_format",format:"url",input:n.value,inst:e,continue:!t.abort});return}if(i===!0){n.value=Ca(o);return}t.hostname&&!lm(i,t.hostname)&&n.issues.push({code:"invalid_format",format:"url",note:"Invalid hostname",pattern:t.hostname.source,input:n.value,inst:e,continue:!t.abort}),t.protocol&&!um(i,t.protocol)&&n.issues.push({code:"invalid_format",format:"url",note:"Invalid protocol",pattern:t.protocol.source,input:n.value,inst:e,continue:!t.abort}),n.value=t.normalize?i.href:Ca(o);return}catch{n.issues.push({code:"invalid_format",format:"url",input:n.value,inst:e,continue:!t.abort})}}}),Va=T("$ZodEmoji",(e,t)=>{t.pattern??(t.pattern=Js()),ze.init(e,t)}),Ha=T("$ZodNanoID",(e,t)=>{if(t.length!==void 0&&(!Number.isInteger(t.length)||t.length<1))throw new Error(`Invalid nanoid length: ${t.length}`);t.pattern??(t.pattern=t.length===void 0?Vs:Hs(t.length)),ze.init(e,t)}),ja=T("$ZodCUID",(e,t)=>{t.pattern??(t.pattern=Zs),ze.init(e,t)}),qa=T("$ZodCUID2",(e,t)=>{t.pattern??(t.pattern=Bs),ze.init(e,t)}),Ka=T("$ZodULID",(e,t)=>{t.pattern??(t.pattern=Fs),ze.init(e,t)}),Ja=T("$ZodXID",(e,t)=>{t.pattern??(t.pattern=Us),ze.init(e,t)}),Ga=T("$ZodKSUID",(e,t)=>{t.pattern??(t.pattern=Ls),ze.init(e,t)}),Ya=T("$ZodISODateTime",(e,t)=>{t.pattern??(t.pattern=aa(t)),ze.init(e,t)}),Xa=T("$ZodISODate",(e,t)=>{t.pattern??(t.pattern=ia),ze.init(e,t)}),Qa=T("$ZodISOTime",(e,t)=>{t.pattern??(t.pattern=sa(t)),ze.init(e,t)}),ec=T("$ZodISODuration",(e,t)=>{t.pattern??(t.pattern=js),ze.init(e,t)}),tc=T("$ZodIPv4",(e,t)=>{t.pattern??(t.pattern=Gs),ze.init(e,t)}),dm=/^[0-9a-fA-F:.]+$/;function nc(e){return dm.test(e)?Ua(`http://[${e}]`):!1}var oc=T("$ZodIPv6",(e,t)=>{t.pattern??(t.pattern=Ys),ze.init(e,t),e._zod.check=n=>{nc(n.value)||n.issues.push({code:"invalid_format",format:"ipv6",input:n.value,inst:e,continue:!t.abort})}});var rc=T("$ZodCIDRv4",(e,t)=>{t.pattern??(t.pattern=Xs),ze.init(e,t)});function pm(e){let t=e.split("/");if(t.length!==2)return!1;let[n,o]=t;if(!o)return!1;let i=Number(o);return`${i}`!==o||i<0||i>128?!1:nc(n)}var ic=T("$ZodCIDRv6",(e,t)=>{t.pattern??(t.pattern=Qs),ze.init(e,t),e._zod.check=n=>{pm(n.value)||n.issues.push({code:"invalid_format",format:"cidrv6",input:n.value,inst:e,continue:!t.abort})}});function sc(e){if(e==="")return!0;if(/\s/.test(e)||e.length%4!==0)return!1;try{return atob(e),!0}catch{return!1}}var si=/^[0-9a-zA-Z+/]*={0,2}$/,ac=T("$ZodBase64",(e,t)=>{t.pattern??(t.pattern=si),ze.init(e,t),e._zod.check=n=>{sc(n.value)||n.issues.push({code:"invalid_format",format:"base64",input:n.value,inst:e,continue:!t.abort})}}),qo=/^[A-Za-z0-9_-]*$/;function mm(e){if(!qo.test(e))return!1;let t=e.replace(/[-_]/g,o=>o==="-"?"+":"/"),n=t.padEnd(Math.ceil(t.length/4)*4,"=");return sc(n)}var cc=T("$ZodBase64URL",(e,t)=>{t.pattern??(t.pattern=qo),ze.init(e,t),e._zod.check=n=>{mm(n.value)||n.issues.push({code:"invalid_format",format:"base64url",input:n.value,inst:e,continue:!t.abort})}}),lc=T("$ZodE164",(e,t)=>{t.pattern??(t.pattern=oa),ze.init(e,t)});function fm(e,t=null){try{let n=e.split(".");if(n.length!==3)return!1;let[o]=n;if(!o)return!1;let i=JSON.parse(atob(o));return!("typ"in i&&i?.typ!=="JWT"||!i.alg||t&&(!("alg"in i)||i.alg!==t))}catch{return!1}}var uc=T("$ZodJWT",(e,t)=>{ze.init(e,t),e._zod.check=n=>{fm(n.value,t.alg)||n.issues.push({code:"invalid_format",format:"jwt",input:n.value,inst:e,continue:!t.abort})}});var ai=T("$ZodNumber",(e,t)=>{Me.init(e,t),e._zod.pattern=Xn,e._zod.parse=(n,o)=>{if(t.coerce)try{n.value=Number(n.value)}catch{}let i=n.value;if(typeof i=="number"&&!Number.isNaN(i)&&Number.isFinite(i))return n;let r=typeof i=="number"?Number.isNaN(i)?"NaN":Number.isFinite(i)?void 0:String(i):void 0;return n.issues.push({expected:"number",code:"invalid_type",input:i,inst:e,...r?{received:r}:{}}),n}}),dc=T("$ZodNumberFormat",(e,t)=>{fa.init(e,t),ai.init(e,t)}),pc=T("$ZodBoolean",(e,t)=>{Me.init(e,t),e._zod.pattern=la,e._zod.parse=(n,o)=>{if(t.coerce)try{n.value=!!n.value}catch{}let i=n.value;return typeof i=="boolean"||n.issues.push({expected:"boolean",code:"invalid_type",input:i,inst:e}),n}});var mc=T("$ZodNull",(e,t)=>{Me.init(e,t),e._zod.pattern=ua,e._zod.values=new Set([null]),e._zod.parse=(n,o)=>{let i=n.value;return i===null||n.issues.push({expected:"null",code:"invalid_type",input:i,inst:e}),n}});var fc=T("$ZodUnknown",(e,t)=>{Me.init(e,t),e._zod.parse=n=>n}),hc=T("$ZodNever",(e,t)=>{Me.init(e,t),e._zod.parse=(n,o)=>(n.issues.push({expected:"never",code:"invalid_type",input:n.value,inst:e}),n)});function hm(e,t){let n=To(e._zod.def.checks);if(!n.length)return;let o=Math.min(...n.map(r=>r[0])),i=e._zod.parse;e._zod.parse=(r,s)=>{let a=t(r.value);if(a>o&&!s?.skipChecks&&s?.direction!=="backward"){for(let[l,u]of To(e._zod.def.checks))if(a>l&&u._zod.def.when(r)){let d=r.issues.length;return u._zod.check(r),r.issues[d].continue=!1,Jn(r.issues,d,e),r}}return i(r,s)}}var gm=e=>Array.isArray(e)?e.length:-1;function za(e,t,n){e.issues.length&&t.issues.push(...Lt(n,e.issues)),t.value[n]=e.value}var gc=T("$ZodArray",(e,t)=>{Me.init(e,t);let n=at.memoizer;n?.attach(e),e._zod.parse=(o,i)=>{let r=o.value;if(!Array.isArray(r))return o.issues.push({expected:"array",code:"invalid_type",input:r,inst:e}),o;o.value=n?n.alloc(e,o,Array(r.length),i):Array(r.length);let s=[],a=i?.abortEarly;for(let l=0;l<r.length;l++){let u=r[l],d=t.element._zod.run({value:u,issues:[]},i);if(d instanceof Promise)s.push(d.then(p=>za(p,o,l)));else if(za(d,o,l),a&&d.issues.length!==0&&zt(d))break}return s.length?Promise.all(s).then(()=>o):o},hm(e,gm)});function Ho(e,t,n,o,i,r){let s=n in o,a=r==="optional";if(!(!s&&a&&i==="optional")){if(e.issues.length){if(i!==void 0&&a&&!s)return;t.issues.push(...Lt(n,e.issues))}if(!s&&i===void 0){e.issues.length||t.issues.push({code:"invalid_type",expected:"nonoptional",input:void 0,path:[n]});return}e.value===void 0?(s||i==="defaulted"&&!a)&&(t.value[n]=void 0):t.value[n]=e.value}}var vm=[];function vc(e){let t=Object.keys(e.shape),n=Object.getOwnPropertySymbols(e.shape),o=n.length?n:vm,i=o.length?[...t,...o]:t;for(let s of i)if(!e.shape?.[s]?._zod?.traits?.has("$ZodType"))throw new Error(`Invalid element at key "${String(s)}": expected a Zod schema`);let r=Lr(e.shape);return{...e,allKeys:i,symbolKeys:o,keySet:new Set(t),numKeys:t.length,optionalKeys:new Set(r)}}function bc(e,t,n,o,i,r,s){let a=[],l=i.keySet,u=i.catchall._zod,d=u.def.type,p=u.optin,f=u.optout,m=0;for(let b in t){if(s&&n.issues.length!==m){if(zt(n,m))break;m=n.issues.length}if(l.has(b))continue;if(b==="__proto__"){d==="never"&&a.push(b);continue}if(d==="never"){a.push(b);continue}let v=u.run({value:t[b],issues:[]},o);v instanceof Promise?e.push(v.then(y=>Ho(y,n,b,t,p,f))):Ho(v,n,b,t,p,f)}return a.length&&n.issues.push({code:"unrecognized_keys",keys:a,input:t,inst:r,continue:!0}),e.length?Promise.all(e).then(()=>n):n}var bm=T("$ZodObject",(e,t)=>{Me.init(e,t);let n=Object.getOwnPropertyDescriptor(t,"shape"),o=n?.get?n.get.raw:t.shape??{};if(o){let u=()=>{let d={...o};return Object.defineProperty(t,"shape",{value:d}),u.raw=d,d};u.raw=o,Object.defineProperty(t,"shape",{get:u})}let i=Cn(()=>vc(t));be(e,"propValues",u=>{let d=u.def.shape,p={};for(let f in d){let m=d[f]._zod;if(m.values){Object.prototype.hasOwnProperty.call(p,f)||dt(p,f,new Set);for(let b of m.values)p[f].add(b);m.optin!==void 0&&p[f].add(void 0)}}return p});let r=pn,s=t.catchall,a,l=at.memoizer;l?.attach(e),e._zod.parse=(u,d)=>{a??(a=i.value);let p=u.value;if(!r(p))return u.issues.push({expected:"object",code:"invalid_type",input:p,inst:e}),u;u.value=l?l.alloc(e,u,{},d):{};let f=[],m=a.shape,b=d?.abortEarly,v=u.issues.length;for(let y of a.allKeys){if(b&&u.issues.length!==v){if(zt(u,v))break;v=u.issues.length}if(y==="__proto__")continue;let w=m[y],C=w._zod.optin,D=w._zod.optout,F=w._zod.run({value:p[y],issues:[]},d);F instanceof Promise?f.push(F.then(N=>Ho(N,u,y,p,C,D))):Ho(F,u,y,p,C,D)}return s?bc(f,p,u,d,i.value,e,b===!0):f.length?Promise.all(f).then(()=>u):u}}),xc=T("$ZodObjectJIT",(e,t)=>{bm.init(e,t);let n=e._zod.parse,o=Cn(()=>vc(t)),i=at.memoizer,r=m=>{let b=o.value,v=b.symbolKeys,y=new Uo(["payload","ctx"],{shape:m,inst:e,memo:i,syms:v}),w=N=>`shape[${N}]._zod.run({ value: input[${N}], issues: [] }, ctx)`,C=(N,W)=>`
          let ${N}_ab = false;
          for (let i = 0; i < ${N}.issues.length; i++) {
            const iss = ${N}.issues[i];
            iss.path = iss.path ? [${W}, ...iss.path] : [${W}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${N}_ab = true;
          }
          if (${N}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;y.write("const input = payload.value;");let D=Object.create(null),F=0;for(let N of b.allKeys)D[N]=`key_${F++}`;y.write(i?"const newResult = memo.alloc(inst, payload, {}, ctx);":"const newResult = {};");for(let N of b.allKeys){if(N==="__proto__")continue;let W=D[N],M=typeof N=="symbol"?`syms[${v.indexOf(N)}]`:Zr(N),$=`${M} in input`,I=m[N],k=I?._zod?.optin,z=k!==void 0,O=I?._zod?.optout==="optional";if(y.write(`const ${W} = ${w(M)};`),z&&O){let S=k==="optional"?`${W}_present`:`${W}.value !== undefined || ${W}_present`;y.write(`
        const ${W}_present = ${$};
        if (!${W}.issues.length || ${W}_present) {
          if (${W}.issues.length) {${C(W,M)}
          }

          if (${S}) {
            newResult[${M}] = ${W}.value;
          }
        }

      `)}else z?(y.write(`
        if (${W}.issues.length) {${C(W,M)}
        }
      `),k==="defaulted"?y.write(`newResult[${M}] = ${W}.value;`):y.write(`
        if (${W}.value !== undefined || ${$}) {
          newResult[${M}] = ${W}.value;
        }
      `)):y.write(`
        const ${W}_present = ${$};
        if (${W}.issues.length) {${C(W,M)}
        }
        if (!${W}_present && !${W}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${M}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${W}_present) {
          newResult[${M}] = ${W}.value;
        }

      `)}return y.write("payload.value = newResult;"),y.write("return payload;"),y.compile()},s,a=pn,l=!at.jitless,d=l&&Fr.value,p=t.catchall,f;e._zod.parse=(m,b)=>{f??(f=o.value);let v=m.value;return a(v)?l&&d&&b?.async===!1&&b.jitless!==!0?(s||(s=r(t.shape)),m=s(m,b),p?bc([],v,m,b,f,e,b?.abortEarly===!0):m):n(m,b):(m.issues.push({expected:"object",code:"invalid_type",input:v,inst:e}),m)}});function Pa(e,t,n,o){for(let r of e)if(r.issues.length===0)return t.value=r.value,t;let i=e.filter(r=>!zt(r));return i.length===1?(t.value=i[0].value,i[0]):(t.issues.push({code:"invalid_union",input:t.value,inst:n,errors:e.map(r=>r.issues.map(s=>Pt(s,o,pt())))}),t)}var ci=T("$ZodUnion",(e,t)=>{Me.init(e,t),be(e,"optin",o=>o.def.options.some(i=>i._zod.optin==="defaulted")?"defaulted":o.def.options.some(i=>i._zod.optin!==void 0)?"optional":void 0),be(e,"optout",o=>o.def.options.some(i=>i._zod.optout==="optional")?"optional":void 0),be(e,"values",o=>{if(o.def.options.every(i=>i._zod.values))return new Set(o.def.options.flatMap(i=>Array.from(i._zod.values)))}),be(e,"pattern",o=>{if(o.def.options.every(i=>i._zod.pattern)){let i=o.def.options.map(r=>r._zod.pattern);return new RegExp(`^(${i.map(r=>qn(r.source)).join("|")})$`)}});let n=t.options.length===1?t.options[0]._zod.run:null;e._zod.parse=(o,i)=>{if(n)return n(o,i);let r=!1,s=[];for(let a of t.options){let l=a._zod.run({value:o.value,issues:[]},i);if(l instanceof Promise)s.push(l),r=!0;else{if(l.issues.length===0)return l;s.push(l)}}return r?Promise.all(s).then(a=>Pa(a,o,e,i)):Pa(s,o,e,i)}});function xm(e){let t=new Map;for(let n of e.options){let o=n._zod.propValues?.[e.discriminator];if(!o||o.size===0)throw new Error(`Invalid discriminated union option at index "${e.options.indexOf(n)}"`);for(let i of o)if(t.has(i)){if(i!==void 0)throw new Error(`Duplicate discriminator value "${String(i)}"`);t.set(i,null)}else t.set(i,n)}return t}var yc=T("$ZodDiscriminatedUnion",(e,t)=>{t.inclusive=!1,ci.init(e,t);let n=e._zod.parse;be(e,"propValues",i=>{let r={},s=0;for(let a of i.def.options){let l=a._zod.propValues;if(!l||Object.keys(l).length===0)throw new Error(`Invalid discriminated union option at index "${i.def.options.indexOf(a)}"`);l[i.def.discriminator]?.has(void 0)&&s++;for(let[u,d]of Object.entries(l)){Object.prototype.hasOwnProperty.call(r,u)||dt(r,u,new Set);for(let p of d)r[u].add(p)}}return!i.def.unionFallback&&s>1&&r[i.def.discriminator]?.delete(void 0),r}),t.options.forEach((i,r)=>{let s=zn(i._zod.def);if(s&&!Object.prototype.hasOwnProperty.call(s,t.discriminator))throw new Error(`Invalid discriminated union option at index "${r}"`)});let o=Cn(()=>xm(t));e._zod.parse=(i,r)=>{let s=i.value;if(!pn(s))return i.issues.push({code:"invalid_type",expected:"object",input:s,inst:e}),i;let a=s?.[t.discriminator],l=o.value.get(a);return l&&(a!==void 0||r.direction!=="backward")?l._zod.run(i,r):t.unionFallback||r.direction==="backward"?n(i,r):(i.issues.push({code:"invalid_union",errors:[],note:"No matching discriminator",discriminator:t.discriminator,options:Array.from(o.value.keys()).filter(u=>o.value.get(u)!==null),input:s,path:[t.discriminator],inst:e}),i)}}),_c=T("$ZodIntersection",(e,t)=>{Me.init(e,t),e._zod.parse=(n,o)=>{let i=n.value,r=t.left._zod.run({value:i,issues:[]},o),s=t.right._zod.run({value:i,issues:[]},o);return r instanceof Promise||s instanceof Promise?Promise.all([r,s]).then(([l,u])=>Wa(n,l,u)):Wa(n,r,s)}});function ri(e,t){if(e===t)return{valid:!0,data:e};if(e instanceof Date&&t instanceof Date&&+e==+t)return{valid:!0,data:e};if(Qt(e)&&Qt(t)){let n=Object.keys(t),o=Object.keys(e).filter(r=>n.indexOf(r)!==-1),i={...e,...t};Object.prototype.hasOwnProperty.call(i,"__proto__")&&delete i.__proto__;for(let r of o){if(r==="__proto__")continue;let s=ri(e[r],t[r]);if(!s.valid)return{valid:!1,mergeErrorPath:[r,...s.mergeErrorPath]};i[r]=s.data}return{valid:!0,data:i}}if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return{valid:!1,mergeErrorPath:[]};let n=[];for(let o=0;o<e.length;o++){let i=e[o],r=t[o],s=ri(i,r);if(!s.valid)return{valid:!1,mergeErrorPath:[o,...s.mergeErrorPath]};n.push(s.data)}return{valid:!0,data:n}}return{valid:!1,mergeErrorPath:[]}}function Wa(e,t,n){let o=new Map,i,r=new Map,s=(u,d)=>{let p;if(u.code==="unrecognized_keys"&&!u.path?.length)i??(i=u),p=u.keys;else if(u.code==="invalid_key"&&u.origin==="record"&&u.path?.length===1){let f=String(u.path[0]);r.has(f)||r.set(f,u),p=[f]}else return!1;for(let f of p)o.has(f)||o.set(f,{}),o.get(f)[d]=!0;return!0};for(let u of t.issues)s(u,"l")||e.issues.push(u);for(let u of n.issues)s(u,"r")||e.issues.push(u);let a=[...o].filter(([,u])=>u.l&&u.r).map(([u])=>u);if(a.length){let u=i?a.filter(d=>i.keys.includes(d)):[];u.length&&e.issues.push({...i,keys:u});for(let d of a)!u.includes(d)&&r.has(d)&&e.issues.push(r.get(d))}let l=ri(t.value,n.value);if(!l.valid){if(zt(e))return e;throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(l.mergeErrorPath)}`)}return e.value=l.data,e}var wc=T("$ZodRecord",(e,t)=>{Me.init(e,t);let n=at.memoizer;n?.attach(e),e._zod.parse=(o,i)=>{let r=o.value;if(!Qt(r))return o.issues.push({expected:"record",code:"invalid_type",input:r,inst:e}),o;let s=[],a=t.keyType._zod.values;if(a&&!t.partial){o.value=n?n.alloc(e,o,{},i):{};let l=new Set;for(let d of a)if(typeof d=="string"||typeof d=="number"||typeof d=="symbol"){if(l.add(typeof d=="number"?d.toString():d),d==="__proto__")continue;let p=t.keyType._zod.run({value:d,issues:[]},i);if(p instanceof Promise)throw new Error("Async schemas not supported in object keys currently");if(p.issues.length){o.issues.push({code:"invalid_key",origin:"record",issues:p.issues.map(b=>Pt(b,i,pt())),input:d,path:[d],inst:e});continue}let f=p.value;if(f==="__proto__")continue;let m=t.valueType._zod.run({value:r[d],issues:[]},i);m instanceof Promise?s.push(m.then(b=>{b.issues.length&&o.issues.push(...Lt(d,b.issues)),o.value[f]=b.value})):(m.issues.length&&o.issues.push(...Lt(d,m.issues)),o.value[f]=m.value)}let u;for(let d in r)if(!l.has(d))if(t.mode==="loose"){if(d==="__proto__")continue;o.value[d]=r[d]}else u=u??[],u.push(d);u&&u.length>0&&o.issues.push({code:"unrecognized_keys",input:r,inst:e,keys:u,continue:!0})}else{o.value=n?n.alloc(e,o,{},i):{};let l;for(let u of Reflect.ownKeys(r)){if(u==="__proto__"||!Object.prototype.propertyIsEnumerable.call(r,u))continue;let d=t.keyType._zod.run({value:u,issues:[]},i);if(d instanceof Promise)throw new Error("Async schemas not supported in object keys currently");if(typeof u=="string"&&Xn.test(u)&&d.issues.length){let b=t.keyType._zod.run({value:Number(u),issues:[]},i);if(b instanceof Promise)throw new Error("Async schemas not supported in object keys currently");b.issues.length===0&&(d=b)}if(d.issues.length){t.mode==="loose"?o.value[u]=r[u]:a?(l=l??[],l.push(u)):o.issues.push({code:"invalid_key",origin:"record",issues:d.issues.map(b=>Pt(b,i,pt())),input:u,path:[u],inst:e});continue}let f=d.value;if(f==="__proto__")continue;let m=t.valueType._zod.run({value:r[u],issues:[]},i);m instanceof Promise?s.push(m.then(b=>{b.issues.length&&o.issues.push(...Lt(u,b.issues)),o.value[f]=b.value})):(m.issues.length&&o.issues.push(...Lt(u,m.issues)),o.value[f]=m.value)}l&&l.length>0&&o.issues.push({code:"unrecognized_keys",input:r,inst:e,keys:l,continue:!0})}return s.length?Promise.all(s).then(()=>o):o}});var kc=T("$ZodEnum",(e,t)=>{Me.init(e,t);let n=In(t.entries),o=new Set(n);e._zod.values=o,be(e,"pattern",i=>{let r=In(i.def.entries).filter(s=>Ur.has(typeof s));return new RegExp(r.length?`^(${r.map(s=>Ut(s.toString())).join("|")})$`:"^[^\\s\\S]$")}),e._zod.parse=(i,r)=>{let s=i.value;return o.has(s)||i.issues.push({code:"invalid_value",values:n,input:s,inst:e}),i}}),Sc=T("$ZodLiteral",(e,t)=>{Me.init(e,t);let n=new Set(t.values);e._zod.values=n,be(e,"pattern",o=>{let i=o.def.values;return new RegExp(i.length?`^(${i.map(r=>typeof r=="string"?Ut(r):r?Ut(r.toString()):String(r)).join("|")})$`:"^[^\\s\\S]$")}),e._zod.parse=(o,i)=>{let r=o.value;return n.has(r)||o.issues.push({code:"invalid_value",values:t.values,input:r,inst:e}),o}});var Ic=T("$ZodTransform",(e,t)=>{Me.init(e,t),e._zod.optin="optional",at.memoizer?.guard(e),e._zod.parse=(n,o)=>{if(o.direction==="backward")throw new Wn(e.constructor.name);let i=t.transform(n.value,n);if(o.async)return(i instanceof Promise?i:Promise.resolve(i)).then(s=>(n.value=s,n));if(i instanceof Promise)throw new Wt;return n.value=i,n}});function Na(e,t){return e.value=t.issues.length?void 0:t.value,e}var li=T("$ZodOptional",(e,t)=>{Me.init(e,t),be(e,"optin",n=>n.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),e._zod.optout="optional",be(e,"values",n=>{let o=n.def.innerType._zod.values;return o?new Set([...o,void 0]):void 0}),be(e,"pattern",n=>{let o=n.def.innerType._zod.pattern;return o?new RegExp(`^(${qn(o.source)})?$`):void 0}),e._zod.parse=(n,o)=>{if(n.value===void 0){if(t.innerType._zod.optin!=="defaulted")return n;let i=t.innerType._zod.run({value:n.value,issues:[]},o);return i instanceof Promise?i.then(r=>Na(n,r)):Na(n,i)}return t.innerType._zod.run(n,o)}}),Mc=T("$ZodExactOptional",(e,t)=>{li.init(e,t),be(e,"values",n=>n.def.innerType._zod.values),be(e,"pattern",n=>n.def.innerType._zod.pattern),e._zod.parse=(n,o)=>t.innerType._zod.run(n,o)}),Cc=T("$ZodNullable",(e,t)=>{Me.init(e,t),be(e,"optin",n=>n.def.innerType._zod.optin),be(e,"optout",n=>n.def.innerType._zod.optout),be(e,"pattern",n=>{let o=n.def.innerType._zod.pattern;return o?new RegExp(`^(${qn(o.source)}|null)$`):void 0}),be(e,"values",n=>n.def.innerType._zod.values?new Set([...n.def.innerType._zod.values,null]):void 0),e._zod.parse=(n,o)=>n.value===null?n:t.innerType._zod.run(n,o)}),zc=T("$ZodDefault",(e,t)=>{Me.init(e,t),e._zod.optin="defaulted",be(e,"values",n=>n.def.innerType._zod.values),e._zod.parse=(n,o)=>{if(o.direction==="backward")return t.innerType._zod.run(n,o);if(n.value===void 0)return n.value=t.defaultValue,n;let i=t.innerType._zod.run(n,o);return i instanceof Promise?i.then(r=>Aa(r,t)):Aa(i,t)}});function Aa(e,t){return e.value===void 0&&(e.value=t.defaultValue),e}var Pc=T("$ZodPrefault",(e,t)=>{Me.init(e,t),e._zod.optin="defaulted",be(e,"values",n=>n.def.innerType._zod.values),e._zod.parse=(n,o)=>(o.direction==="backward"||n.value===void 0&&(n.value=t.defaultValue),t.innerType._zod.run(n,o))}),Wc=T("$ZodNonOptional",(e,t)=>{Me.init(e,t),be(e,"values",n=>{let o=n.def.innerType._zod.values;return o?new Set([...o].filter(i=>i!==void 0)):void 0}),e._zod.parse=(n,o)=>{let i=t.innerType._zod.run(n,o);return i instanceof Promise?i.then(r=>Ea(r,e)):Ea(i,e)}});function Ea(e,t){return!e.issues.length&&e.value===void 0&&e.issues.push({code:"invalid_type",expected:"nonoptional",input:e.value,inst:t}),e}function Ta(e,t,n,o){return t.issues.length?(e.value=n.catchValue({...t,value:e.value,error:{issues:t.issues.map(i=>Pt(i,o,pt()))},input:e.value}),e):(e.value=t.value,t.memo&&(e.memo=!0),e)}var Nc=T("$ZodCatch",(e,t)=>{Me.init(e,t),be(e,"optin",n=>n.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),be(e,"optout",n=>n.def.innerType._zod.optout),be(e,"values",n=>n.def.innerType._zod.values),e._zod.parse=(n,o)=>{if(o.direction==="backward")return t.innerType._zod.run(n,o);let i=t.innerType._zod.run({value:n.value,issues:[]},o);return i instanceof Promise?i.then(r=>Ta(n,r,t,o)):Ta(n,i,t,o)}});var Ac=T("$ZodPipe",(e,t)=>{Me.init(e,t),be(e,"values",n=>n.def.in._zod.values),be(e,"optin",n=>n.def.in._zod.optin),be(e,"optout",n=>n.def.out._zod.optout),be(e,"propValues",n=>n.def.in._zod.propValues),e._zod.parse=(n,o)=>{if(o.direction==="backward"){let r=t.out._zod.run(n,o);return r instanceof Promise?r.then(s=>Lo(s,t.in,o)):Lo(r,t.in,o)}let i=t.in._zod.run(n,o);return i instanceof Promise?i.then(r=>Lo(r,t.out,o)):Lo(i,t.out,o)}});function Lo(e,t,n){return e.issues.some(o=>o.code!=="unrecognized_keys")?(e.aborted=!0,e):t._zod.run({value:e.value,issues:e.issues},n)}var Ec=T("$ZodReadonly",(e,t)=>{Me.init(e,t),be(e,"propValues",n=>n.def.innerType._zod.propValues),be(e,"values",n=>n.def.innerType._zod.values),be(e,"optin",n=>n.def.innerType?._zod?.optin),be(e,"optout",n=>n.def.innerType?._zod?.optout),e._zod.parse=(n,o)=>{if(o.direction==="backward")return t.innerType._zod.run(n,o);let i=t.innerType._zod.run(n,o);return i instanceof Promise?i.then($a):$a(i)}});function $a(e){return e.memo||(e.value=Object.freeze(e.value)),e}var Tc=T("$ZodLazy",(e,t)=>{Me.init(e,t),Dr(e._zod,"innerType",()=>{let n=t;return n._cachedInner||(n._cachedInner=t.getter()),n._cachedInner}),be(e,"pattern",n=>n.innerType?._zod?.pattern),be(e,"propValues",n=>n.innerType?._zod?.propValues),be(e,"optin",n=>n.innerType?._zod?.optin??void 0),be(e,"optout",n=>n.innerType?._zod?.optout??void 0),e._zod.parse=(n,o)=>e._zod.innerType._zod.run(n,o)}),$c=T("$ZodCustom",(e,t)=>{Ge.init(e,t),Me.init(e,t),e._zod.parse=(n,o)=>n,e._zod.check=n=>{let o=n.value,i=t.fn(o);if(i instanceof Promise)return i.then(r=>Oa(r,n,o,e));Oa(i,n,o,e)}});function Oa(e,t,n,o){if(!e){let i={code:"custom",input:n,inst:o,path:[...o._zod.def.path??[]],continue:!o._zod.def.abort};o._zod.def.params&&(i.params=o._zod.def.params),t.issues.push(Pn(i))}}var di=class extends Error{constructor(){super("Cannot parse a reference cycle that closes through a transform"),this.name="ZodCyclicError"}},pi="~memo",Oc=[];function Rc(e){return e!==null&&typeof e=="object"}function ui(e){return e.map(t=>t.path?{...t,path:t.path.slice()}:{...t})}var Dc=new WeakMap,to=0,Go=1,no=2;function Yo(e,t,n){let o=Dc.get(e);if(o!==void 0)return o?no:to;if(t.has(e))return no;t.add(e);let i=to,r=d=>{if(i!==no&&d?._zod){let p=Yo(d,t,n);p>i&&(i=p)}},s=(d,p)=>{let f=to;for(let m of Reflect.ownKeys(d)){let b=Object.getOwnPropertyDescriptor(d,m);if(p&&!b.enumerable)continue;let v=b.get?Go:b.value?._zod?Yo(b.value,t,n):to;v>f&&(f=v)}return f},a=d=>{d>i&&(i=d)},l=e._zod.def,u=l.type;switch(u){case"object":{let d=zn(l);a(d?s(d,!0):Go),r(l.catchall);break}case"array":r(l.element);break;case"tuple":for(let d of l.items)r(d);r(l.rest);break;case"record":case"map":r(l.keyType),r(l.valueType);break;case"set":r(l.valueType);break;case"union":for(let d of l.options)r(d);break;case"intersection":r(l.left),r(l.right);break;case"optional":case"nullable":case"default":case"prefault":case"catch":case"readonly":case"nonoptional":case"promise":case"success":r(l.innerType);break;case"pipe":r(l.in),r(l.out);break;case"function":r(l.input),r(l.output);break;case"lazy":{let d=l._cachedInner??(n?e._zod.innerType:void 0);a(d?Yo(d,t,!1):Go);break}case"template_literal":case"string":case"number":case"int":case"boolean":case"bigint":case"symbol":case"undefined":case"null":case"void":case"never":case"any":case"unknown":case"date":case"nan":case"enum":case"literal":case"file":case"transform":case"custom":break;default:for(let d in l){let p=Object.getOwnPropertyDescriptor(l,d);if(!p||p.get)continue;let f=p.value;if(!(!f||typeof f!="object")){if(f._zod)r(f);else if(Array.isArray(f))for(let m of f)r(m)}}}return t.delete(e),ym(e,i)}function ym(e,t){return t!==Go&&Dc.set(e,t===no),t}function _m(e,t){let n=e.buckets.get(t);return n||(n=new WeakMap,e.buckets.set(t,n)),n}var Ko,Jo=[],wm={alloc(e,t,n){let o=Ko;if(!o)return n;Ko=void 0;let i={value:n,issues:null};return o.set(t.value,i),Jo.push(i),n},guard(e){var t;(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred.push(()=>{let n=e._zod.parse,o=(i,r)=>{if(r.direction!=="backward"&&km(r,i.value))throw new di;return n(i,r)};e._zod.parse=o,e._zod.run===n&&(e._zod.run=o)})},attach(e){var t;let n,o=!1,i,r;(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred.push(()=>{let s=e._zod.parse,a=(l,u)=>{if(n===void 0){let w=Yo(e,new Set,!1);if(w===to)return e._zod.parse=s,e._zod.run===a&&(e._zod.run=s),s(l,u);w===no||o?n=!0:o=!0}let d=l.value;if(!Rc(d))return s(l,u);let p=u[pi];p||(p={buckets:new WeakMap,backEdges:void 0},u[pi]=p);let f;i===u?f=r:(f=_m(p,e),i=u,r=f);let m=f.get(d);if(m)return l.value=m.value,m.issues?m.issues.length&&l.issues.push(...ui(m.issues)):(l.memo=!0,p.backEdges??(p.backEdges=new WeakSet),p.backEdges.add(m.value)),l;Ko=f;let b=Jo.length,v=s(l,u);Ko=void 0;let y=Jo.length>b?Jo.pop():void 0;return v instanceof Promise?v.then(w=>(y&&(y.issues=w.issues.length?ui(w.issues):Oc),w)):(y&&(y.issues=v.issues.length?ui(v.issues):Oc),v)};e._zod.parse=a,e._zod.run===s&&(e._zod.run=a)})}};function Zc(){return wm}function km(e,t){let n=e[pi]?.backEdges;return n!==void 0&&Rc(t)&&n.has(t)}var Sm=()=>{let e={string:{unit:"characters",verb:"to have"},file:{unit:"bytes",verb:"to have"},array:{unit:"items",verb:"to have"},set:{unit:"items",verb:"to have"},map:{unit:"entries",verb:"to have"}};function t(r){return e[r]??null}let n={regex:"input",email:"email address",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO datetime",date:"ISO date",time:"ISO time",duration:"ISO duration",ipv4:"IPv4 address",ipv6:"IPv6 address",mac:"MAC address",cidrv4:"IPv4 range",cidrv6:"IPv6 range",base64:"base64-encoded string",base64url:"base64url-encoded string",json_string:"JSON string",e164:"E.164 number",currency_code:"currency code",credit_card:"credit card number",iban:"IBAN",jwt:"JWT",template_literal:"input"},o={nan:"NaN"};function i(r,s){return r==="number"&&typeof s=="number"&&!Number.isFinite(s)?String(s):o[r]??r}return r=>{switch(r.code){case"invalid_type":{let s=i(r.expected),a=Hr(r.input),l=i(a,r.input);return`Invalid input: expected ${s}, received ${l}`}case"invalid_value":return r.values.length===1?`Invalid input: expected ${No(r.values[0])}`:`Invalid option: expected one of ${Po(r.values,"|")}`;case"too_big":{let s=r.exact?"exactly ":r.inclusive?"<=":"<",a=t(r.origin);return a?`Too big: expected ${r.origin??"value"} to have ${s}${r.maximum.toString()} ${a.unit??"elements"}`:`Too big: expected ${r.origin??"value"} to be ${s}${r.maximum.toString()}`}case"too_small":{let s=r.exact?"exactly ":r.inclusive?">=":">",a=t(r.origin);return a?`Too small: expected ${r.origin} to have ${s}${r.minimum.toString()} ${a.unit}`:`Too small: expected ${r.origin} to be ${s}${r.minimum.toString()}`}case"invalid_format":{let s=r;return s.format==="starts_with"?`Invalid string: must start with "${s.prefix}"`:s.format==="ends_with"?`Invalid string: must end with "${s.suffix}"`:s.format==="includes"?`Invalid string: must include "${s.includes}"`:s.format==="regex"?`Invalid string: must match pattern ${s.pattern}`:`Invalid ${n[s.format]??r.format}`}case"not_multiple_of":return`Invalid number: must be a multiple of ${r.divisor}`;case"unrecognized_keys":return`Unrecognized key${r.keys.length>1?"s":""}: ${Po(r.keys,", ")}`;case"invalid_key":return`Invalid key in ${r.origin}`;case"invalid_union":return r.options&&Array.isArray(r.options)&&r.options.length>0?`Invalid discriminator value. Expected ${r.options.map(a=>`'${a}'`).join(" | ")}`:r.inclusive===!1?"Invalid input: more than one option matched":"Invalid input";case"invalid_element":return`Invalid value in ${r.origin}`;default:return"Invalid input"}}};function Bc(){return{localeError:Sm()}}var Fc;var mi=class{constructor(){this._map=new WeakMap,this._idmap=new Map}add(t,...n){let o=n[0];return this._map.set(t,o),o&&typeof o=="object"&&"id"in o&&this._idmap.set(o.id,t),this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(t){let n=this._map.get(t);return n&&typeof n=="object"&&"id"in n&&this._idmap.delete(n.id),this._map.delete(t),this}get(t){let n=t._zod.parent;if(n){let o={...this.get(n)??{}};delete o.id;let i={...o,...this._map.get(t)};return Object.keys(i).length?i:void 0}return this._map.get(t)}has(t){return this._map.has(t)}};function Im(){return new mi}(Fc=globalThis).__zod_globalRegistry??(Fc.__zod_globalRegistry=Im());var mn=globalThis.__zod_globalRegistry;function Uc(e){return e.checks&&(e.checks=[...e.checks]),e}function Lc(e,t){return new e(Uc({type:"string",...se(t)}))}function Vc(e,t){return new e({type:"string",format:"email",check:"string_format",abort:!1,...se(t)})}function Hc(e,t){return new e({type:"string",format:"guid",check:"string_format",abort:!1,...se(t)})}function jc(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,...se(t)})}function qc(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v4",...se(t)})}function Kc(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v6",...se(t)})}function Jc(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v7",...se(t)})}function Gc(e,t){return new e({type:"string",format:"url",check:"string_format",abort:!1,...se(t)})}function Yc(e,t){return new e({type:"string",format:"emoji",check:"string_format",abort:!1,...se(t)})}function Xc(e,t){return new e({type:"string",format:"nanoid",check:"string_format",abort:!1,...se(t)})}function Qc(e,t){return new e({type:"string",format:"cuid",check:"string_format",abort:!1,...se(t)})}function el(e,t){return new e({type:"string",format:"cuid2",check:"string_format",abort:!1,...se(t)})}function tl(e,t){return new e({type:"string",format:"ulid",check:"string_format",abort:!1,...se(t)})}function nl(e,t){return new e({type:"string",format:"xid",check:"string_format",abort:!1,...se(t)})}function ol(e,t){return new e({type:"string",format:"ksuid",check:"string_format",abort:!1,...se(t)})}function rl(e,t){return new e({type:"string",format:"ipv4",check:"string_format",abort:!1,...se(t)})}function il(e,t){return new e({type:"string",format:"ipv6",check:"string_format",abort:!1,...se(t)})}function sl(e,t){return new e({type:"string",format:"cidrv4",check:"string_format",abort:!1,...se(t)})}function al(e,t){return new e({type:"string",format:"cidrv6",check:"string_format",abort:!1,...se(t)})}function cl(e,t){return new e({type:"string",format:"base64",check:"string_format",abort:!1,...se(t)})}function ll(e,t){return new e({type:"string",format:"base64url",check:"string_format",abort:!1,...se(t)})}function ul(e,t){return new e({type:"string",format:"e164",check:"string_format",abort:!1,...se(t)})}function dl(e,t){return new e({type:"string",format:"jwt",check:"string_format",abort:!1,...se(t)})}function pl(e,t){return new e({type:"string",format:"datetime",check:"string_format",offset:!1,local:!1,precision:null,...se(t)})}function ml(e,t){return new e({type:"string",format:"date",check:"string_format",...se(t)})}function fl(e,t){return new e({type:"string",format:"time",check:"string_format",precision:null,...se(t)})}function hl(e,t){return new e({type:"string",format:"duration",check:"string_format",...se(t)})}function gl(e,t){return new e(Uc({type:"number",checks:[],...se(t)}))}function vl(e,t){return new e({type:"number",check:"number_format",abort:!1,format:"safeint",...se(t)})}function bl(e,t){return new e({type:"boolean",...se(t)})}function xl(e,t){return new e({type:"null",...se(t)})}function yl(e){return new e({type:"unknown"})}function _l(e,t){return new e({type:"never",...se(t)})}function Xo(e,t){return new ni({check:"less_than",...se(t),value:e,inclusive:!1})}function oo(e,t){return new ni({check:"less_than",...se(t),value:e,inclusive:!0})}function Qo(e,t){return new oi({check:"greater_than",...se(t),value:e,inclusive:!1})}function ro(e,t){return new oi({check:"greater_than",...se(t),value:e,inclusive:!0})}function er(e,t){return new ma({check:"multiple_of",...se(t),value:e})}function tr(e,t){return new ha({check:"max_length",...se(t),maximum:e})}function Nn(e,t){return new ga({check:"min_length",...se(t),minimum:e})}function nr(e,t){return new va({check:"length_equals",...se(t),length:e})}function fi(e,t){return new ba({check:"string_format",format:"regex",...se(t),pattern:e})}function hi(e){return new xa({check:"string_format",format:"lowercase",...se(e)})}function gi(e){return new ya({check:"string_format",format:"uppercase",...se(e)})}function vi(e,t){return new _a({check:"string_format",format:"includes",...se(t),includes:e})}function bi(e,t){return new wa({check:"string_format",format:"starts_with",...se(t),prefix:e})}function xi(e,t){return new ka({check:"string_format",format:"ends_with",...se(t),suffix:e})}function en(e){return new Sa({check:"overwrite",tx:e})}function yi(e){return en(t=>t.normalize(e))}function _i(){return en(e=>e.trim())}function wi(){return en(e=>e.toLowerCase())}function ki(){return en(e=>e.toUpperCase())}function Si(){return en(e=>Br(e))}function wl(e,t,n){return new e({type:"array",element:t,...se(n)})}function kl(e,t,n){return new e({type:"custom",check:"custom",fn:t,...se(n)})}function Sl(e,t){let n=Mm(o=>(o.addIssue=i=>{if(typeof i=="string")o.issues.push(Pn(i,o.value,n._zod.def));else{let r=i;r.fatal&&(r.continue=!1),r.code??(r.code="custom"),"input"in r||(r.input=o.value),r.inst??(r.inst=n),r.continue??(r.continue=!n._zod.def.abort),o.issues.push(Pn(r))}},e(o.value,o)),t);return n}function Mm(e,t){let n=new Ge({check:"custom",...se(t)});return n._zod.check=e,n}function io(e,...t){for(let n of t)for(let o of Reflect.ownKeys(n))Object.prototype.propertyIsEnumerable.call(n,o)&&dt(e,o,n[o]);return e}function Mi(e){let t=e?.target??"draft-2020-12";return t==="draft-4"&&(t="draft-04"),t==="draft-7"&&(t="draft-07"),{processors:e.processors??{},metadataRegistry:e?.metadata??mn,target:t,unrepresentable:e?.unrepresentable??"throw",override:e?.override??(()=>{}),io:e?.io??"output",counter:0,seen:new Map,sharedDefsExtractedFor:void 0,sharedEmitDoneFor:void 0,cycles:e?.cycles??"ref",reused:e?.reused??"inline",intersections:[],deferred:[],external:e?.external??void 0}}function Vt(e,t,n,o,i){let r=typeof t.unrepresentable=="function"?t.unrepresentable({zodSchema:e,path:o.path,message:i}):t.unrepresentable;if(r==="any")return!1;if(r===void 0||r==="throw")throw new Error(i);return Object.assign(n,r),!0}function Ee(e,t,n={path:[],schemaPath:[]}){var o;let i=e._zod.def,r=t.seen.get(e);if(r)return r.count++,n.schemaPath.includes(e)&&(r.cycle=n.path),r.schema;let s={schema:{},count:1,cycle:void 0,path:n.path};t.seen.set(e,s),t.sharedDefsExtractedFor=void 0,t.sharedEmitDoneFor=void 0;let a=e._zod.toJSONSchema?.();if(a)s.schema=a;else{let d={...n,schemaPath:[...n.schemaPath,e],path:n.path};if(e._zod.processJSONSchema)e._zod.processJSONSchema(t,s.schema,d);else{let f=s.schema,m=t.processors[i.type];if(!m)throw new Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);m(e,t,f,d)}let p=e._zod.parent;p&&(s.ref||(s.ref=p),Ee(p,t,d),t.seen.get(p).isParent=!0)}let l=t.metadataRegistry.get(e);return l&&io(s.schema,l),t.io==="input"&&ot(e)&&(delete s.schema.examples,delete s.schema.default),t.io==="input"&&"_prefault"in s.schema&&((o=s.schema).default??(o.default=s.schema._prefault)),delete s.schema._prefault,t.seen.get(e).schema}function Il(e){return e.replace(/~/g,"~0").replace(/\//g,"~1")}function Ci(e,t){let n=e.seen.get(t);if(!n)throw new Error("Unprocessed schema. This is a bug in Zod.");if(e.external&&e.sharedDefsExtractedFor===e.external)return;let o=new Map;for(let s of e.seen.entries()){let a=e.metadataRegistry.get(s[0])?.id;if(a){let l=o.get(a);if(l&&l!==s[0])throw new Error(`Duplicate schema id "${a}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);o.set(a,s[0])}}let i=s=>{let a=e.target==="draft-2020-12"?"$defs":"definitions";if(e.external){let p=e.external.registry.get(s[0])?.id,f=e.external.uri??(b=>b);if(p)return{ref:f(p)};let m=s[1].defId??s[1].schema.id??`schema${e.counter++}`;return s[1].defId=m,{defId:m,ref:`${f("__shared")}#/${a}/${Il(m)}`}}let l="#",u=`${l}/${a}/`;if(s[1]===n&&!s[1].schema.id)return{ref:l};let d=s[1].schema.id??`__schema${e.counter++}`;return{defId:d,ref:u+Il(d)}},r=s=>{if(s[1].schema.$ref)return;let a=s[1],{ref:l,defId:u}=i(s);a.def={...a.schema},u&&(a.defId=u);let d=a.schema;for(let p in d)delete d[p];d.$ref=l};if(e.cycles==="throw")for(let s of e.seen.entries()){let a=s[1];if(a.cycle)throw new Error(`Cycle detected: #/${a.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`)}for(let s of e.seen.entries()){let a=s[1];if(t===s[0]){r(s);continue}if(e.external){let u=e.external.registry.get(s[0])?.id;if(t!==s[0]&&u){r(s);continue}}if(e.metadataRegistry.get(s[0])?.id){r(s);continue}if(a.cycle){r(s);continue}a.count>1&&e.reused==="ref"&&r(s)}e.external&&(e.sharedDefsExtractedFor=e.external)}function zl(e){let t=e.anyOf;if(!Array.isArray(t)||t.length===0||e.type!==void 0)return;let n=[];for(let o of t){if(!o||typeof o!="object")return;zl(o);let i=Object.keys(o);if(i.length!==1||i[0]!=="type")return;let r=o.type;for(let s of Array.isArray(r)?r:[r]){if(typeof s!="string")return;n.includes(s)||n.push(s)}}delete e.anyOf,e.type=n.length===1?n[0]:n}var Pl=new Set(["type","properties","required","additionalProperties"]),Ml=["oneOf","anyOf"];function Cl(e){let t=e.additionalProperties;return t===void 0||t===!1||typeof t!="object"||t===null?null:Object.keys(t).length?t:null}function Ii(e){let t=[];for(let r of e){if(typeof r!="object"||r.type!=="object")return null;for(let s in r)if(!Pl.has(s))return null;t.push(r)}let n={},o=new Set;for(let r of t){for(let s in r.properties){if(Object.prototype.hasOwnProperty.call(n,s))continue;let a=[];for(let u of t){let d=u.properties?.[s]??Cl(u);d!=null&&(a.some(p=>JSON.stringify(p)===JSON.stringify(d))||a.push(d))}let l=a.length===1?a[0]:Ii(a)??{allOf:a};dt(n,s,l)}for(let s of r.required??[])o.add(s)}let i={type:"object",properties:n};if(o.size&&(i.required=[...o]),t.every(r=>r.additionalProperties===!1))i.additionalProperties=!1;else{let r=[];for(let s of t){let a=Cl(s);a&&!r.some(l=>JSON.stringify(l)===JSON.stringify(a))&&r.push(a)}r.length===1?i.additionalProperties=r[0]:r.length>1&&(i.additionalProperties={allOf:r})}return i}function Cm(e){let t=e.allOf;if(!Array.isArray(t)||t.length<2)return;for(let i of Pl)if(i in e)return;let n=t.filter(i=>Ml.some(r=>Array.isArray(i[r]))),o=null;if(!n.length)o=Ii(t);else{let i=n[0],r=Ml.find(l=>Array.isArray(i[l]));if(Object.keys(i).length!==1)return;let s=t.filter(l=>l!==i),a=i[r].map(l=>Ii([...s,l]));if(a.some(l=>!l))return;o={[r]:a}}o&&(delete e.allOf,io(e,o))}function zi(e,t){let n=e.seen.get(t);if(!n)throw new Error("Unprocessed schema. This is a bug in Zod.");let o=a=>{let l=e.seen.get(a);if(l.ref===null)return;let u=l.def??l.schema,d={...u},p=l.ref;if(l.ref=null,p){o(p);let m=e.seen.get(p),b=m.schema;if(b.$ref&&(e.target==="draft-07"||e.target==="draft-04"||e.target==="openapi-3.0")?(u.allOf=u.allOf??[],u.allOf.push(b)):io(u,b),io(u,d),a._zod.parent===p)for(let y in u)y==="$ref"||y==="allOf"||y in d||delete u[y];if(b.$ref&&m.def)for(let y in u)y==="$ref"||y==="allOf"||y in m.def&&JSON.stringify(u[y])===JSON.stringify(m.def[y])&&delete u[y]}let f=a._zod.parent;if(f&&f!==p){o(f);let m=e.seen.get(f);if(m?.schema.$ref&&(u.$ref=m.schema.$ref,m.def))for(let b in u)b==="$ref"||b==="allOf"||b in m.def&&JSON.stringify(u[b])===JSON.stringify(m.def[b])&&delete u[b]}e.override({zodSchema:a,jsonSchema:u,path:l.path??[]})};if(!e.external||e.sharedEmitDoneFor!==e.external){for(let a of[...e.seen.entries()].reverse())o(a[0]);if(e.target!=="openapi-3.0")for(let a of e.seen.entries())zl(a[1].def??a[1].schema);for(let a of e.deferred)a();if(e.intersections.length){let a=new Map;for(let l of e.seen.values())for(let u of[l.schema,l.def]){let d=u?.allOf;if(!Array.isArray(d))continue;let p=a.get(d);p?p.push(u):a.set(d,[u])}for(let l of e.intersections)for(let u of a.get(l)??[])Cm(u)}}let i={};if(e.target==="draft-2020-12"?i.$schema="https://json-schema.org/draft/2020-12/schema":e.target==="draft-07"?i.$schema="http://json-schema.org/draft-07/schema#":e.target==="draft-04"?i.$schema="http://json-schema.org/draft-04/schema#":e.target,e.external?.uri){let a=e.external.registry.get(t)?.id;if(!a)throw new Error("Schema is missing an `id` property");i.$id=e.external.uri(a)}io(i,n.defId?n.schema:n.def??n.schema);let r=e.metadataRegistry.get(t)?.id;r!==void 0&&i.id===r&&delete i.id;let s=e.external?.defs??{};if(!e.external||e.sharedEmitDoneFor!==e.external)for(let a of e.seen.entries()){let l=a[1];l.def&&l.defId&&(l.def.id===l.defId&&delete l.def.id,dt(s,l.defId,l.def))}e.external&&(e.sharedEmitDoneFor=e.external),e.external||Object.keys(s).length>0&&(e.target==="draft-2020-12"?i.$defs=s:i.definitions=s);try{let a=JSON.parse(JSON.stringify(i));return Object.defineProperty(a,"~standard",{value:{...t["~standard"],jsonSchema:{input:so(t,"input",e.processors),output:so(t,"output",e.processors)}},enumerable:!1,writable:!1}),a}catch{throw new Error("Error converting schema to JSON.")}}function ot(e,t){let n=t??{seen:new Set};if(n.seen.has(e))return!1;n.seen.add(e);let o=e._zod.def;if(o.type==="transform")return!0;if(o.type==="array")return ot(o.element,n);if(o.type==="set")return ot(o.valueType,n);if(o.type==="lazy")return ot(o.getter(),n);if(o.type==="promise"||o.type==="optional"||o.type==="nonoptional"||o.type==="nullable"||o.type==="readonly"||o.type==="default"||o.type==="prefault"||o.type==="catch")return ot(o.innerType,n);if(o.type==="intersection")return ot(o.left,n)||ot(o.right,n);if(o.type==="record"||o.type==="map")return ot(o.keyType,n)||ot(o.valueType,n);if(o.type==="pipe")return e._zod.traits.has("$ZodCodec")?!0:ot(o.in,n)||ot(o.out,n);if(o.type==="object"){for(let i in o.shape)if(ot(o.shape[i],n))return!0;return!1}if(o.type==="union"){for(let i of o.options)if(ot(i,n))return!0;return!1}if(o.type==="tuple"){for(let i of o.items)if(ot(i,n))return!0;return!!(o.rest&&ot(o.rest,n))}return!1}var Wl=(e,t={})=>n=>{let o=Mi({...n,processors:t});return Ee(e,o),Ci(o,e),zi(o,e)},so=(e,t,n={})=>o=>{let{libraryOptions:i,target:r}=o??{},s=Mi({...i??{},target:r,io:t,processors:n});return Ee(e,s),Ci(s,e),zi(s,e)};var An=(e,t,n)=>{(e[t]===void 0||n>e[t])&&(e[t]=n)},En=(e,t,n)=>{(e[t]===void 0||n<e[t])&&(e[t]=n)},Nl=(e,t)=>{An(e,"minimum",t),En(e,"maximum",t)},$l=(e,t)=>{e.multipleOf??(e.multipleOf=[]),e.multipleOf.includes(t)||e.multipleOf.push(t)},Ol=(e,t)=>{e.patterns??(e.patterns=new Set),e.patterns.add(t)},Rl=(e,t)=>{e.mime=e.mime?e.mime.filter(n=>t.includes(n)):[...t]},Dl=(e,t)=>{e.format=t,t.includes("int")&&(e.isInt=!0)},Al=(e,t)=>An(e,"minimum",t.minimum),El=(e,t)=>En(e,"maximum",t.maximum),Tl=e=>(t,n)=>{Dl(t,n.format);let[o,i]=e[n.format];An(t,"minimum",o),En(t,"maximum",i)},zm={greater_than:(e,t)=>An(e,t.inclusive?"minimum":"exclusiveMinimum",t.value),less_than:(e,t)=>En(e,t.inclusive?"maximum":"exclusiveMaximum",t.value),multiple_of:(e,t)=>$l(e,t.value),number_format:Tl(Kn),bigint_format:Tl(Ao),min_length:Al,max_length:El,length_equals:(e,t)=>Nl(e,t.length),min_size:Al,max_size:El,size_equals:(e,t)=>Nl(e,t.size),string_format:(e,t)=>{Dl(e,t.format),t.pattern&&Ol(e,t.pattern),(t.format==="base64"||t.format==="base64url")&&(e.contentEncoding=t.format),(t.local||t.precision===-1)&&(e.laxFormat=!0)},mime_type:(e,t)=>Rl(e,t.mime)};function bt(e){let t={},n=e._zod.def,o=e._zod.traits.has("$ZodCheck")?[e,...n.checks??[]]:n.checks??[];for(let r of o)zm[r._zod.def.check]?.(t,r._zod.def);let i=e._zod.bag;i.minimum!==void 0&&An(t,"minimum",i.minimum),i.exclusiveMinimum!==void 0&&An(t,"exclusiveMinimum",i.exclusiveMinimum),i.maximum!==void 0&&En(t,"maximum",i.maximum),i.exclusiveMaximum!==void 0&&En(t,"exclusiveMaximum",i.exclusiveMaximum),i.multipleOf!==void 0&&$l(t,i.multipleOf),i.format!==void 0&&(t.format??(t.format=i.format),i.format.includes("int")&&(t.isInt=!0)),i.mime&&Rl(t,i.mime);for(let r of i.patterns??[])Ol(t,r);return t}var Pm={guid:"uuid",url:"uri",datetime:"date-time",json_string:"json-string",regex:""},Wm=new Map([[si,ea],[qo,ta]]),Zl=e=>Wm.get(e)??e,Bl=(e,t,n,o)=>{let i=n;i.type="string";let{minimum:r,maximum:s,format:a,patterns:l,contentEncoding:u,laxFormat:d}=bt(e);if(typeof r=="number"&&(i.minLength=r),typeof s=="number"&&(i.maxLength=s),a&&(i.format=Pm[a]??a,i.format===""&&delete i.format,(a==="time"||d)&&delete i.format),u&&(i.contentEncoding=u),l&&l.size>0){let p=[...l].map(Zl);p.length===1?i.pattern=p[0].source:p.length>1&&(i.allOf=[...p.map(f=>({...t.target==="draft-07"||t.target==="draft-04"||t.target==="openapi-3.0"?{type:"string"}:{},pattern:f.source}))])}},Fl=(e,t,n,o)=>{let i=n,{minimum:r,maximum:s,multipleOf:a,exclusiveMaximum:l,exclusiveMinimum:u,isInt:d}=bt(e);i.type=d?"integer":"number";let p=typeof u=="number"&&u>=(r??Number.NEGATIVE_INFINITY),f=typeof l=="number"&&l<=(s??Number.POSITIVE_INFINITY),m=t.target==="draft-04"||t.target==="openapi-3.0";if(p?m?(i.minimum=u,i.exclusiveMinimum=!0):i.exclusiveMinimum=u:typeof r=="number"&&(i.minimum=r),f?m?(i.maximum=l,i.exclusiveMaximum=!0):i.exclusiveMaximum=l:typeof s=="number"&&(i.maximum=s),a){let b=new Set;for(let w of a)Number.isFinite(w)&&w!==0?b.add(Math.abs(w)):Vt(e,t,i,o,`A multipleOf divisor of ${w} cannot be represented in JSON Schema`);let[v,...y]=b;v!==void 0&&(i.multipleOf=v),y.length&&(i.allOf=[...i.allOf??[],...y.map(w=>({multipleOf:w}))])}},Ul=(e,t,n,o)=>{n.type="boolean"};var Ll=(e,t,n,o)=>{t.target==="openapi-3.0"?(n.type="string",n.nullable=!0,n.enum=[null]):n.type="null"};var Vl=(e,t,n,o)=>{n.not={}};var Hl=(e,t,n,o)=>{};var jl=(e,t,n,o)=>{let i=e._zod.def,r=In(i.entries);if(r.length===0){n.not={};return}r.every(s=>typeof s=="number")&&(n.type="number"),r.every(s=>typeof s=="string")&&(n.type="string"),n.enum=r},ql=(e,t,n,o)=>{let i=e._zod.def;if(i.values.length===0){n.not={};return}let r=[];for(let s of i.values)if(s===void 0){if(Vt(e,t,n,o,"Literal `undefined` cannot be represented in JSON Schema"))return}else if(typeof s=="bigint"){if(Vt(e,t,n,o,"BigInt literals cannot be represented in JSON Schema"))return;r.push(Number(s))}else r.push(s);if(r.length!==0)if(r.length===1){let s=r[0];n.type=s===null?"null":typeof s,t.target==="draft-04"||t.target==="openapi-3.0"?n.enum=[s]:n.const=s}else r.every(s=>typeof s=="number")&&(n.type="number"),r.every(s=>typeof s=="string")&&(n.type="string"),r.every(s=>typeof s=="boolean")&&(n.type="boolean"),r.every(s=>s===null)&&(n.type="null"),n.enum=r};var Kl=(e,t,n,o)=>{Vt(e,t,n,o,"Custom types cannot be represented in JSON Schema")};var Jl=(e,t,n,o)=>{Vt(e,t,n,o,"Transforms cannot be represented in JSON Schema")};var Gl=(e,t,n,o)=>{let i=n,r=e._zod.def,{minimum:s,maximum:a}=bt(e);typeof s=="number"&&(i.minItems=s),typeof a=="number"&&(i.maxItems=a),i.type="array",i.items=Ee(r.element,t,{...o,path:[...o.path,"items"]})};function or(e){let t=e._zod.def;return t.type==="pipe"&&t.in._zod.traits.has("$ZodTransform")?or(t.out):t.type==="catch"?or(t.innerType):e._zod.optin}var Yl=(e,t,n,o)=>{let i=n,r=e._zod.def,s=r.shape;if(Object.getOwnPropertySymbols(s).length&&Vt(e,t,i,o,"Symbol keys cannot be represented in JSON Schema"))return;i.type="object",i.properties={};for(let u in s)dt(i.properties,u,Ee(s[u],t,{...o,path:[...o.path,"properties",u]}));let l=[];for(let u of Object.keys(s)){let d=r.shape[u];(t.io==="input"?or(d)===void 0:d._zod.optout===void 0)&&l.push(u)}l.length>0&&(i.required=l),r.catchall?._zod.def.type==="never"?i.additionalProperties=!1:r.catchall?r.catchall&&(i.additionalProperties=Ee(r.catchall,t,{...o,path:[...o.path,"additionalProperties"]})):t.io==="output"&&(i.additionalProperties=!1)},Xl=(e,t,n,o)=>{let i=e._zod.def,r=i.inclusive===!1,s=i.options.map((a,l)=>Ee(a,t,{...o,path:[...o.path,r?"oneOf":"anyOf",l]}));r?n.oneOf=s:n.anyOf=s},Ql=(e,t,n,o)=>{let i=e._zod.def,r=Ee(i.left,t,{...o,path:[...o.path,"allOf",0]}),s=Ee(i.right,t,{...o,path:[...o.path,"allOf",1]}),a=u=>"allOf"in u&&Object.keys(u).length===1,l=[...a(r)?r.allOf:[r],...a(s)?s.allOf:[s]];n.allOf=l,t.intersections.push(l)};function Pi(e,t,n){if(t.$ref){if(n.has(t))return t;n.add(t);let b=e.get(t)?.def;if(!b)return t;let v=Pi(e,b,n);return v===b?t:v}for(let b of["anyOf","oneOf"]){let v=t[b];if(!Array.isArray(v))continue;let y=v.map(w=>Pi(e,w,n));y.some((w,C)=>w!==v[C])&&(t={...t,[b]:y})}let o=Array.isArray(t.type)?t.type:[t.type],i=!o.includes("string")&&o.some(b=>b==="number"||b==="integer"),r=t.enum??(t.const!==void 0?[t.const]:void 0);if(!i&&!r?.some(b=>typeof b=="number"))return t;let{minimum:s,maximum:a,exclusiveMinimum:l,exclusiveMaximum:u,multipleOf:d,format:p,id:f,...m}=t;return m.enum?m.enum=m.enum.map(b=>typeof b=="number"?String(b):b):typeof m.const=="number"&&(m.const=String(m.const)),i&&(m.type="string",r||(m.pattern=(o.includes("number")?Xn:ei).source)),m}var Wi=new WeakMap;function Nm(e){let t=new Map;for(let o of e.seen.values())o.def&&!t.has(o.schema)&&t.set(o.schema,o);let n=new Map;for(let o of Wi.get(e)??[]){let i=e.seen.get(o),r=(i?.def??i?.schema)?.propertyNames;if(!r||r===!0||n.has(r))continue;let s=Pi(t,r,new Set);s!==r&&n.set(r,s)}if(n.size)for(let o of e.seen.values())for(let i of[o.schema,o.def]){let r=i&&n.get(i.propertyNames);r&&(i.propertyNames=r)}}var eu=(e,t,n,o)=>{let i=n,r=e._zod.def;i.type="object";let s=r.keyType,a=bt(s).patterns;if(r.mode==="loose"&&a&&a.size>0){let d=Ee(r.valueType,t,{...o,path:[...o.path,"patternProperties","*"]});i.patternProperties={};for(let p of a)dt(i.patternProperties,Zl(p).source,d)}else{if(t.target==="draft-07"||t.target==="draft-2020-12"){i.propertyNames=Ee(r.keyType,t,{...o,path:[...o.path,"propertyNames"]});let d=Wi.get(t);d||(d=[],Wi.set(t,d),t.deferred.push(()=>Nm(t))),d.push(e)}i.additionalProperties=Ee(r.valueType,t,{...o,path:[...o.path,"additionalProperties"]})}let l=s._zod.values,u=t.io==="input"&&or(r.valueType)!==void 0;if(l&&!r.partial&&!u){let d=[...l].filter(p=>typeof p=="string"||typeof p=="number");d.length>0&&(i.required=d.map(String))}},tu=(e,t,n,o)=>{let i=e._zod.def,r=Ee(i.innerType,t,o),s=t.seen.get(e);t.target==="openapi-3.0"?(s.ref=i.innerType,n.nullable=!0):n.anyOf=[r,{type:"null"}]},nu=(e,t,n,o)=>{let i=e._zod.def;Ee(i.innerType,t,o);let r=t.seen.get(e);r.ref=i.innerType},Ni=Symbol();function ou(e,t,n,o,i){let r=!1,s=JSON.stringify(e,(a,l)=>typeof l!="bigint"?l:(r=!0,null));return r?(Vt(t,n,o,i,"BigInt defaults cannot be represented in JSON Schema"),Ni):JSON.parse(s)}var ru=(e,t,n,o)=>{let i=e._zod.def;Ee(i.innerType,t,o);let r=t.seen.get(e);r.ref=i.innerType;let s=ou(i.defaultValue,e,t,n,o);s!==Ni&&(n.default=s)},iu=(e,t,n,o)=>{let i=e._zod.def;Ee(i.innerType,t,o);let r=t.seen.get(e);if(r.ref=i.innerType,t.io!=="input")return;let s=ou(i.defaultValue,e,t,n,o);s!==Ni&&(n._prefault=s)},su=(e,t,n,o)=>{let i=e._zod.def;Ee(i.innerType,t,o);let r=t.seen.get(e);r.ref=i.innerType;let s;try{s=i.catchValue(void 0)}catch{Vt(e,t,n,o,"Dynamic catch values are not supported in JSON Schema");return}n.default=s},au=(e,t,n,o)=>{let i=e._zod.def,r=i.in._zod.traits.has("$ZodTransform"),s=t.io==="input"?r?i.out:i.in:i.out;Ee(s,t,o);let a=t.seen.get(e);a.ref=s},cu=(e,t,n,o)=>{let i=e._zod.def;Ee(i.innerType,t,o);let r=t.seen.get(e);r.ref=i.innerType,n.readOnly=!0};var Ai=(e,t,n,o)=>{let i=e._zod.def;Ee(i.innerType,t,o);let r=t.seen.get(e);r.ref=i.innerType},lu=(e,t,n,o)=>{let i=e._zod.innerType;Ee(i,t,o);let r=t.seen.get(e);r.ref=i};var uu=new WeakSet([Object.prototype,Error.prototype]);function rr(e,t,n){Object.defineProperty(e,t,{configurable:!0,enumerable:!1,get(){let o=n(this);return Object.defineProperty(this,t,{value:o,configurable:!0,writable:!0}),o},set(o){Object.defineProperty(this,t,{value:o,configurable:!0,writable:!0})}})}var Zm=(e,t)=>{Cs.init(e,t),e.name="ZodError";let n=Object.getPrototypeOf(e);uu.has(n)||(uu.add(n),rr(n,"format",o=>i=>Ps(o,i)),rr(n,"flatten",o=>i=>zs(o,i)),rr(n,"addIssue",o=>i=>{o.issues.push(i),o.message=JSON.stringify(o.issues,Mn,2)}),rr(n,"addIssues",o=>i=>{o.issues.push(...i),o.message=JSON.stringify(o.issues,Mn,2)}),Object.defineProperty(n,"isEmpty",{configurable:!0,enumerable:!1,get(){return this.issues.length===0}}))};var mt=T("ZodError",Zm,void 0,{Parent:Error});var du=Ro(mt),pu=Do(mt),mu=Zo(mt),fu=Bo(mt),hu=Ns(mt),gu=As(mt),vu=Es(mt),bu=Ts(mt),xu=$s(mt),yu=Os(mt),_u=Rs(mt),wu=Ds(mt);function Fm(){at.localeError||pt(Bc())}function sr(){at.memoizer||pt({memoizer:Zc()})}var Pe=T("ZodType",(e,t)=>(Fm(),Me.init(e,t),e.def=t,e.type=t.type,e),{check(...e){let t=this.def;return this.clone(ce.mergeDefs(t,{checks:[...t.checks??[],...e.map(n=>typeof n=="function"?{_zod:{check:n,def:{check:"custom"},onattach:[]}}:n)]}),{parent:!0})},with(...e){return this.check(...e)},clone(e,t){return Ct(this,e,t)},brand(){return this},register(e,t){return e.add(this,t),this},refine(e,t){return this.check(Bf(e,t))},superRefine(e,t){return this.check(Ff(e,t))},overwrite(e){return this.check(en(e))},optional(){return Mu(this)},exactOptional(){return If(this)},nullable(){return Cu(this)},nullish(){return Mu(Cu(this))},nonoptional(e){return Nf(this,e)},array(){return Ce(this)},or(e){return Tn([this,e])},and(e){return _f(this,e)},transform(e){return zu(this,Sf(e))},default(e){return zf(this,e)},prefault(e){return Wf(this,e)},catch(e){return Ef(this,e)},pipe(e){return zu(this,e)},readonly(){return Of(this)},describe(e){let t=this.clone();return mn.add(t,{description:e}),t},meta(...e){if(e.length===0)return mn.get(this);let t=this.clone();return mn.add(t,e[0]),t},isOptional(){return this.safeParse(void 0).success},isNullable(){return this.safeParse(null).success},apply(e,...t){return t.length===0?e(this):e(this,...t)},get"~standard"(){return ce.hide(this,"~standard",{...ii(this),jsonSchema:{input:so(this,"input"),output:so(this,"output")}})},set"~standard"(e){ce.own(this,"~standard",e)},parse:function e(t,n){return du(this,t,n,{callee:e})},parseAsync:async function e(t,n){return await pu(this,t,n,{callee:e})},safeParse(e,t){return mu(this,e,t)},async safeParseAsync(e,t){return fu(this,e,t)},get spa(){return this?.safeParseAsync},set spa(e){ce.own(this,"spa",e)},validate(e,t){return Gr(this,e,t)},validateAsync(e,t){return Yr(this,e,t)},encode:function e(t,n){return hu(this,t,n,{callee:e})},decode:function e(t,n){return gu(this,t,n,{callee:e})},encodeAsync:async function e(t,n){return await vu(this,t,n,{callee:e})},decodeAsync:async function e(t,n){return await bu(this,t,n,{callee:e})},safeEncode(e,t){return xu(this,e,t)},safeDecode(e,t){return yu(this,e,t)},async safeEncodeAsync(e,t){return _u(this,e,t)},async safeDecodeAsync(e,t){return wu(this,e,t)},toJSONSchema(e){return Wl(this,{})(e)},get description(){return mn.get(this)?.description},get _def(){return this._zod.def}}),Pu=T("_ZodString",(e,t)=>{jo.init(e,t),Pe.init(e,t),e._zod.processJSONSchema=(n,o,i)=>Bl(e,n,o,i)},ce.derived({format:e=>bt(e).format??null,minLength:e=>bt(e).minimum??null,maxLength:e=>bt(e).maximum??null},{regex(...e){return this.check(fi(...e))},includes(...e){return this.check(vi(...e))},startsWith(...e){return this.check(bi(...e))},endsWith(...e){return this.check(xi(...e))},min(...e){return this.check(Nn(...e))},max(...e){return this.check(tr(...e))},length(...e){return this.check(nr(...e))},nonempty(...e){return this.check(Nn(1,...e))},lowercase(e){return this.check(hi(e))},uppercase(e){return this.check(gi(e))},trim(){return this.check(_i())},normalize(...e){return this.check(yi(...e))},toLowerCase(){return this.check(wi())},toUpperCase(){return this.check(ki())},slugify(){return this.check(Si())}})),Um=T("ZodString",(e,t)=>{jo.init(e,t),Pu.init(e,t)},{email(e){return this.check(Vc(qm,e))},url(e){return this.check(Gc(Jm,e))},jwt(e){return this.check(dl(df,e))},emoji(e){return this.check(Yc(Gm,e))},guid(e){return this.check(Hc(Km,e))},uuid(e){return this.check(jc(ir,e))},uuidv4(e){return this.check(qc(ir,e))},uuidv6(e){return this.check(Kc(ir,e))},uuidv7(e){return this.check(Jc(ir,e))},nanoid(e){return this.check(Xc(Ym,e))},cuid(e){return this.check(Qc(Xm,e))},cuid2(e){return this.check(el(Qm,e))},ulid(e){return this.check(tl(ef,e))},base64(e){return this.check(cl(cf,e))},base64url(e){return this.check(ll(lf,e))},xid(e){return this.check(nl(tf,e))},ksuid(e){return this.check(ol(nf,e))},ipv4(e){return this.check(rl(of,e))},ipv6(e){return this.check(il(rf,e))},cidrv4(e){return this.check(sl(sf,e))},cidrv6(e){return this.check(al(af,e))},e164(e){return this.check(ul(uf,e))},datetime(e){return this.check(pl(Lm,e))},date(e){return this.check(ml(Vm,e))},time(e){return this.check(fl(Hm,e))},duration(e){return this.check(hl(jm,e))}});function ne(e){return Lc(Um,e)}var Ne=T("ZodStringFormat",(e,t)=>{ze.init(e,t),Pu.init(e,t)}),Lm=T("ZodISODateTime",(e,t)=>{Ya.init(e,t),Ne.init(e,t)}),Vm=T("ZodISODate",(e,t)=>{Xa.init(e,t),Ne.init(e,t)}),Hm=T("ZodISOTime",(e,t)=>{Qa.init(e,t),Ne.init(e,t)}),jm=T("ZodISODuration",(e,t)=>{ec.init(e,t),Ne.init(e,t)}),qm=T("ZodEmail",(e,t)=>{Ba.init(e,t),Ne.init(e,t)});var Km=T("ZodGUID",(e,t)=>{Da.init(e,t),Ne.init(e,t)});var ir=T("ZodUUID",(e,t)=>{Za.init(e,t),Ne.init(e,t)});var Jm=T("ZodURL",(e,t)=>{La.init(e,t),Ne.init(e,t)});var Gm=T("ZodEmoji",(e,t)=>{Va.init(e,t),Ne.init(e,t)});var Ym=T("ZodNanoID",(e,t)=>{Ha.init(e,t),Ne.init(e,t)});var Xm=T("ZodCUID",(e,t)=>{ja.init(e,t),Ne.init(e,t)});var Qm=T("ZodCUID2",(e,t)=>{qa.init(e,t),Ne.init(e,t)});var ef=T("ZodULID",(e,t)=>{Ka.init(e,t),Ne.init(e,t)});var tf=T("ZodXID",(e,t)=>{Ja.init(e,t),Ne.init(e,t)});var nf=T("ZodKSUID",(e,t)=>{Ga.init(e,t),Ne.init(e,t)});var of=T("ZodIPv4",(e,t)=>{tc.init(e,t),Ne.init(e,t)});var rf=T("ZodIPv6",(e,t)=>{oc.init(e,t),Ne.init(e,t)});var sf=T("ZodCIDRv4",(e,t)=>{rc.init(e,t),Ne.init(e,t)});var af=T("ZodCIDRv6",(e,t)=>{ic.init(e,t),Ne.init(e,t)});var cf=T("ZodBase64",(e,t)=>{ac.init(e,t),Ne.init(e,t)});var lf=T("ZodBase64URL",(e,t)=>{cc.init(e,t),Ne.init(e,t)});var uf=T("ZodE164",(e,t)=>{lc.init(e,t),Ne.init(e,t)});var df=T("ZodJWT",(e,t)=>{uc.init(e,t),Ne.init(e,t)});var Wu=T("ZodNumber",(e,t)=>{ai.init(e,t),Pe.init(e,t),e._zod.processJSONSchema=(n,o,i)=>Fl(e,n,o,i),e.isFinite=!0},ce.derived({minValue:e=>{let{minimum:t,exclusiveMinimum:n}=bt(e);return Math.max(t??Number.NEGATIVE_INFINITY,n??Number.NEGATIVE_INFINITY)},maxValue:e=>{let{maximum:t,exclusiveMaximum:n}=bt(e);return Math.min(t??Number.POSITIVE_INFINITY,n??Number.POSITIVE_INFINITY)},isInt:e=>{let{isInt:t,multipleOf:n}=bt(e);return!!t||!!n?.some(Number.isSafeInteger)},format:e=>bt(e).format??null},{gt(e,t){return this.check(Qo(e,t))},gte(e,t){return this.check(ro(e,t))},min(e,t){return this.check(ro(e,t))},lt(e,t){return this.check(Xo(e,t))},lte(e,t){return this.check(oo(e,t))},max(e,t){return this.check(oo(e,t))},int(e){return this.check(ku(e))},safe(e){return this.check(ku(e))},positive(e){return this.check(Qo(0,e))},nonnegative(e){return this.check(ro(0,e))},negative(e){return this.check(Xo(0,e))},nonpositive(e){return this.check(oo(0,e))},multipleOf(e,t){return this.check(er(e,t))},step(e,t){return this.check(er(e,t))},finite(){return this}}));function ct(e){return gl(Wu,e)}var pf=T("ZodNumberFormat",(e,t)=>{dc.init(e,t),Wu.init(e,t)});function ku(e){return vl(pf,e)}var mf=T("ZodBoolean",(e,t)=>{pc.init(e,t),Pe.init(e,t),e._zod.processJSONSchema=(n,o,i)=>Ul(e,n,o,i)});function xe(e){return bl(mf,e)}var ff=T("ZodNull",(e,t)=>{mc.init(e,t),Pe.init(e,t),e._zod.processJSONSchema=(n,o,i)=>Ll(e,n,o,i)});function ao(e){return xl(ff,e)}var hf=T("ZodUnknown",(e,t)=>{fc.init(e,t),Pe.init(e,t),e._zod.processJSONSchema=(n,o,i)=>Hl(e,n,o,i)});function Su(){return yl(hf)}var gf=T("ZodNever",(e,t)=>{hc.init(e,t),Pe.init(e,t),e._zod.processJSONSchema=(n,o,i)=>Vl(e,n,o,i)});function Nu(e){return _l(gf,e)}var vf=T("ZodArray",(e,t)=>{sr(),gc.init(e,t),Pe.init(e,t),e._zod.processJSONSchema=(n,o,i)=>Gl(e,n,o,i),e.element=t.element},{min(e,t){return this.check(Nn(e,t))},nonempty(e){return this.check(Nn(1,e))},max(e,t){return this.check(tr(e,t))},length(e,t){return this.check(nr(e,t))},unwrap(){return this.element}});function Ce(e,t){return wl(vf,e,t)}var bf=T("ZodObject",(e,t)=>{sr(),xc.init(e,t),Pe.init(e,t),e._zod.processJSONSchema=(n,o,i)=>Yl(e,n,o,i),ce.installLazyProp(e,"shape",n=>n._zod.def.shape,!1)},{keyof(){return de(Object.keys(this._zod.def.shape))},catchall(e){return this.clone(ce.mergeDefs(this._zod.def,{catchall:e}))},passthrough(){return this.clone(ce.mergeDefs(this._zod.def,{catchall:Su()}))},loose(){return this.clone(ce.mergeDefs(this._zod.def,{catchall:Su()}))},strict(){return this.clone(ce.mergeDefs(this._zod.def,{catchall:Nu()}))},strip(){return this.clone(ce.mergeDefs(this._zod.def,{catchall:void 0}))},extend(e){return ce.extend(this,e)},safeExtend(e){return ce.safeExtend(this,e)},merge(e){return ce.merge(this,e)},pick(e){return ce.pick(this,e)},omit(e){return ce.omit(this,e)},partial(...e){return ce.partial(Eu,this,e[0])},exactPartial(...e){return ce.partial(Tu,this,e[0],"exactPartial")},required(...e){return ce.required($u,this,e[0])}});function Y(e,t){return new bf({type:"object",shape:e,catchall:Nu(),...ce.normalizeParams(t)})}var Au=T("ZodUnion",(e,t)=>{ci.init(e,t),Pe.init(e,t),e._zod.processJSONSchema=(n,o,i)=>Xl(e,n,o,i),e.options=t.options});function Tn(e,t){return new Au({type:"union",options:e,...ce.normalizeParams(t)})}var xf=T("ZodDiscriminatedUnion",(e,t)=>{Au.init(e,t),yc.init(e,t)});function co(e,t,n){return new xf({type:"union",options:t,discriminator:e,...ce.normalizeParams(n)})}var yf=T("ZodIntersection",(e,t)=>{_c.init(e,t),Pe.init(e,t),e._zod.processJSONSchema=(n,o,i)=>Ql(e,n,o,i)});function _f(e,t){return new yf({type:"intersection",left:e,right:t})}var Iu=T("ZodRecord",(e,t)=>{sr(),wc.init(e,t),Pe.init(e,t),e._zod.processJSONSchema=(n,o,i)=>eu(e,n,o,i),e.keyType=t.keyType,e.valueType=t.valueType});function $i(e,t,n){return!t||!t._zod?new Iu({type:"record",keyType:ne(),valueType:e,...ce.normalizeParams(t)}):new Iu({type:"record",keyType:e,valueType:t,...ce.normalizeParams(n)})}var Ti=T("ZodEnum",(e,t)=>{kc.init(e,t),Pe.init(e,t),e._zod.processJSONSchema=(o,i,r)=>jl(e,o,i,r),e.enum=t.entries,e.options=[...e._zod.values];let n=new Set(Object.keys(t.entries));e.extract=(o,i)=>{let r={};for(let s of o)if(n.has(s))r[s]=t.entries[s];else throw new Error(`Key ${s} not found in enum`);return new Ti({...t,checks:[],...ce.normalizeParams(i),entries:r})},e.exclude=(o,i)=>{let r={...t.entries};for(let s of o)if(n.has(s))delete r[s];else throw new Error(`Key ${s} not found in enum`);return new Ti({...t,checks:[],...ce.normalizeParams(i),entries:r})}});function de(e,t){let n=Array.isArray(e)?Object.fromEntries(e.map(o=>[o,o])):e;return new Ti({type:"enum",entries:n,...ce.normalizeParams(t)})}var wf=T("ZodLiteral",(e,t)=>{Sc.init(e,t),Pe.init(e,t),e._zod.processJSONSchema=(n,o,i)=>ql(e,n,o,i),e.values=new Set(t.values),Object.defineProperty(e,"value",{get(){if(t.values.length>1)throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");return t.values[0]}})});function we(e,t){return new wf({type:"literal",values:Array.isArray(e)?e:[e],...ce.normalizeParams(t)})}var kf=T("ZodTransform",(e,t)=>{sr(),Ic.init(e,t),Pe.init(e,t),e._zod.processJSONSchema=(n,o,i)=>Jl(e,n,o,i),e._zod.parse=(n,o)=>{if(o.direction==="backward")throw new Wn(e.constructor.name);n.addIssue=r=>{if(typeof r=="string")n.issues.push(ce.issue(r,n.value,t));else{let s=r;s.fatal&&(s.continue=!1),s.code??(s.code="custom"),"input"in s||(s.input=n.value),s.inst??(s.inst=e),n.issues.push(ce.issue(s))}};let i=t.transform(n.value,n);return i instanceof Promise?i.then(r=>(n.value=r,n)):(n.value=i,n)}});function Sf(e){return new kf({type:"transform",transform:e})}var Eu=T("ZodOptional",(e,t)=>{li.init(e,t),Pe.init(e,t),e._zod.processJSONSchema=(n,o,i)=>Ai(e,n,o,i),e.unwrap=()=>e._zod.def.innerType});function Mu(e){return new Eu({type:"optional",innerType:e})}var Tu=T("ZodExactOptional",(e,t)=>{Mc.init(e,t),Pe.init(e,t),e._zod.processJSONSchema=(n,o,i)=>Ai(e,n,o,i),e.unwrap=()=>e._zod.def.innerType});function If(e){return new Tu({type:"optional",innerType:e})}var Mf=T("ZodNullable",(e,t)=>{Cc.init(e,t),Pe.init(e,t),e._zod.processJSONSchema=(n,o,i)=>tu(e,n,o,i),e.unwrap=()=>e._zod.def.innerType});function Cu(e){return new Mf({type:"nullable",innerType:e})}var Cf=T("ZodDefault",(e,t)=>{zc.init(e,t),Pe.init(e,t),e._zod.processJSONSchema=(n,o,i)=>ru(e,n,o,i),e.unwrap=()=>e._zod.def.innerType,e.removeDefault=e.unwrap});function zf(e,t){return new Cf({type:"default",innerType:e,get defaultValue(){return typeof t=="function"?t():ce.shallowClone(t)}})}var Pf=T("ZodPrefault",(e,t)=>{Pc.init(e,t),Pe.init(e,t),e._zod.processJSONSchema=(n,o,i)=>iu(e,n,o,i),e.unwrap=()=>e._zod.def.innerType});function Wf(e,t){return new Pf({type:"prefault",innerType:e,get defaultValue(){return typeof t=="function"?t():ce.shallowClone(t)}})}var $u=T("ZodNonOptional",(e,t)=>{Wc.init(e,t),Pe.init(e,t),e._zod.processJSONSchema=(n,o,i)=>nu(e,n,o,i),e.unwrap=()=>e._zod.def.innerType});function Nf(e,t){return new $u({type:"nonoptional",innerType:e,...ce.normalizeParams(t)})}var Af=T("ZodCatch",(e,t)=>{Nc.init(e,t),Pe.init(e,t),e._zod.processJSONSchema=(n,o,i)=>su(e,n,o,i),e.unwrap=()=>e._zod.def.innerType,e.removeCatch=e.unwrap});function Ef(e,t){return new Af({type:"catch",innerType:e,catchValue:typeof t=="function"?t:ce.constantCatch(t)})}var Tf=T("ZodPipe",(e,t)=>{Ac.init(e,t),Pe.init(e,t),e._zod.processJSONSchema=(n,o,i)=>au(e,n,o,i),e.in=t.in,e.out=t.out});function zu(e,t){return new Tf({type:"pipe",in:e,out:t})}var $f=T("ZodReadonly",(e,t)=>{Ec.init(e,t),Pe.init(e,t),e._zod.processJSONSchema=(n,o,i)=>cu(e,n,o,i),e.unwrap=()=>e._zod.def.innerType});function Of(e){return new $f({type:"readonly",innerType:e})}var Rf=T("ZodLazy",(e,t)=>{Tc.init(e,t),Pe.init(e,t),e._zod.processJSONSchema=(n,o,i)=>lu(e,n,o,i),e.unwrap=()=>e._zod.def.getter()});function Df(e){return new Rf({type:"lazy",getter:e})}var Zf=T("ZodCustom",(e,t)=>{$c.init(e,t),Pe.init(e,t),e._zod.processJSONSchema=(n,o,i)=>Kl(e,n,o,i)});function Bf(e,t={}){return kl(Zf,e,t)}function Ff(e,t){return Sl(e,t)}function Ou(e){let t=Df(()=>Tn([ne(e),ct(),xe(),ao(),Ce(t),$i(ne(),t)]));return t}var ar=Object.freeze(["panel-open","panel-close","panel-move","page-home","page-settings","page-settings-tab","page-model-tab","page-setup","page-authorization","page-repair","page-session-management","open-native-session","open-feedback","change-listen-mode","change-audio-device","edit-choice","commit-form","activate-control","dismiss","details-toggle","keyboard-navigation","ui-connect","ui-reconnect","ui-status-refresh","ui-request","ui-stream","ui-render-error","ui-action-error","ui-read-recovery","manage-session","start-voice","stop-voice","ui-buffer-overflow","session-history-open","session-history-close","subagent-history-open","subagent-history-close","show-subagents","show-main-sessions","open-native-subagent","new-voice-session","bind-current-session","retry-voice-transcript","bind-existing-session","unbind-existing-session","listen-mode-ptt","listen-mode-always","listen-mode-wake","settings-audio","settings-interaction","settings-prompt","settings-models","settings-advanced","settings-pets"]),Ru=64*1024,lo=64,Du=10080*60*1e3;var Oi="whaleConversation",ke=(e,t)=>({mode:"strict",typeSymbol:`dsh-fish-voice/conversation#${e}`,create:t}),ur=ke("sessionId",()=>ne().min(1).max(256)),Uf=ke("settingsSessionId",()=>ur.create().nullable()),ju=new Set(["status","read-settings","listen-mode","complete-setup","set-visibility","inspect-tts","save-tts","preview-tts","cancel-tts","save-models","model-installer","inspect-model-compute","plan-model-install","start-model-install","control-model-install","apply-model-install","pick-local-path","enable","disable","new","resume","read-history","read-audio-devices","save-audio-device","save-settings","capture-bindings","save-bindings","save-voice-prompt","conversation-models","save-conversation-model","inspect-performance","set-performance-mode","read-output-volume","set-output-volume"]),Lf=ke("volumeRequest",()=>Y({revision:ct().int().nonnegative(),volume:ct().min(0).max(1)})),Zu=Y({id:ne(),role:de(["user","assistant"]),text:ne().max(8e3),state:de(["reply","interrupted","delivered","speech-requested","speech-failed"]),at:ct()}),Vf=Y({state:de(["disabled","starting","waiting","listening","paused","error"]),deadlineAt:ct().nonnegative().nullable(),streamOpen:xe(),detection:de(["asr-after-utterance","acoustic-after-utterance"])}),Di=ne().uuid(),Hf=Y({id:Di,text:ne().max(8e3),sessionId:ur.create(),title:ne().max(256).nullable(),state:de(["sending","queued","busy","ready","delivered","uncertain","failed","discarded"])}),jf=Y({sessionId:ur.create(),items:Ce(Y({id:Di,text:ne().max(8e3),title:ne().max(256).nullable().optional(),state:de(["busy","ready","sending","uncertain"])})).max(8)}),qf=ke("snapshot",()=>Y({revision:ct().int().nonnegative(),historyGeneration:ct().int().nonnegative().optional(),rootSessionId:ne().nullable(),title:ao(),latest:Zu.nullable(),items:Ce(Zu).max(40),inputActive:xe(),inputError:de(["device","recognition","no-speech"]).nullable().optional(),providerError:ne().max(480).optional(),inputDelivery:Hf.optional(),retryTranscripts:jf.nullable().optional(),playbackConfirmed:we(!1),wake:Vf.optional(),helper:Y({online:xe(),listenMode:de(["ptt","always","wake"]).nullable()}).refine(e=>e.online||e.listenMode===null).optional()})),Kf=ke("volume",()=>Y({supported:xe(),backend:we("dsh-speak").nullable(),volume:ct().min(0).max(1).nullable(),revision:ct().int().nullable(),apply:we("next-output").nullable(),reason:ne().nullable()})),te=ne().max(4096),qe=ct().int().nonnegative().max(Number.MAX_SAFE_INTEGER),Jf=Y({code:ne().max(64),message:ne().max(512)}),Bu=Y({available:xe(),reason:te.nullable(),runtimeLoaded:we(!1),backend:te.optional(),provider:te.optional(),device:te.optional(),computeType:te.optional(),supportedComputeTypes:Ce(te).max(32).optional(),deviceCount:qe.optional(),deviceIndex:qe.optional(),validation:te.optional(),note:te.optional(),providerAdvertised:xe().optional()}),Gf=Y({schema:we(1),default:we("cpu"),observedAt:te.nullable(),reason:te.optional(),backends:Y({sensevoice:Y({cpu:Bu,cuda:Bu}).optional()})}),Yf=Y({observedAt:te,scope:we("plugin-host"),platform:te,arch:te,cpuLogicalCores:qe.nullable(),totalMemoryBytes:qe.nullable(),availableMemoryBytes:qe.nullable(),gpuMemoryBytes:qe.nullable(),gpuMemoryReason:te,gpuSource:we("dxgi").nullable().optional(),gpuAdapters:Ce(Y({name:ne().min(1).max(256),dedicatedVideoMemoryBytes:qe,sharedSystemMemoryBytes:qe})).max(32).optional()}),Xf=Y({modelId:te,confidence:de(["not-assessed","unknown","heuristic-only"]),recommended:xe(),badge:te.nullable(),state:de(["manual-choice","unknown","recommended-pending-runtime-validation","limited-memory","busy-memory","recommended-lightweight"]),reason:te,policy:te.optional(),runtimeValidated:we(!1).optional(),gpuValidated:we(!1).optional()}),Qf=Y({release:te,source:te,sources:Ce(te).max(16).optional(),redirectHost:te,platform:te,arch:te,executable:te,licenseUrls:Ce(te).max(20)}),eh=Y({jobId:te,modelId:te,status:de(["waiting","verifying","applied","blocked","paused","cancelled"]),reason:te.nullable()}),th=Y({id:te,runtime:Qf.nullable().optional(),purpose:de(["tts","asr"]).optional(),computeOptions:Ce(de(["cpu","auto","cuda","vulkan"])).max(4).optional(),recommendation:Xf,title:te,backend:te.nullable(),available:xe(),reason:te.nullable(),totalBytes:qe.nullable(),source:te.nullable(),licenseUrls:Ce(te).max(20),licenseNote:te.nullable(),verification:te.optional(),runtimeLoaded:we(!1)}),nh=Y({id:ne().uuid(),modelId:te,compute:de(["cpu","auto","cuda","vulkan"]),status:de(["queued","running","paused","failed","cancelled","installed"]),stage:de(["queued","running","paused","failed","cancelled","installed","checking-runtime","verifying-local","downloading","verifying","installing"]),createdAt:te,updatedAt:te,totalBytes:qe,receivedBytes:qe,runtimeLoaded:we(!1),error:Jf.nullable(),currentFile:te.nullable().optional(),files:Ce(Y({name:te,bytes:qe,receivedBytes:qe,verified:xe(),reused:xe().optional()})).max(200),installedPath:te.optional(),sourceDirectory:te.optional(),modelVariant:de(["q4_k_m","q8_0"]).optional(),reused:we(!0).optional(),reusedBytes:qe.optional(),purpose:de(["tts","asr"]).optional(),recommendedSettings:Tn([Y({tts:Y({provider:we("local"),localModelId:te,localModelPath:te})}),Y({asr:we("sensevoice"),models:Y({sensevoiceDir:te.optional()}),modelCompute:de(["cpu","auto","cuda"])})]).optional()}),oh=ke("modelSnapshot",()=>Y({schema:we(1),hardware:Yf,compute:Gf,refresh:Y({pending:xe(),observedAt:ne().max(64).nullable(),attemptedAt:ne().max(64).nullable(),error:ne().max(512).nullable(),intervalMs:we(3e5)}).optional(),models:Ce(th).max(32),jobs:Ce(nh).max(1e3),ttsInstallIntent:eh.nullable().optional()})),rh=ke("authorizationRequest",()=>Y({revision:ne().min(1).max(256),grant:xe()})),ih=ke("senseVoiceAsrRequest",()=>co("operation",[Y({operation:we("status")}),Y({operation:we("retry")})])),sh={state:de(["idle","downloading","ready","error"]),receivedBytes:qe,totalBytes:qe},ah=ke("senseVoiceAsrResult",()=>Y({...sh,selected:xe(),message:ne().max(512).nullable()})),Fu=ke("authorization",()=>Y({schema:we(1),revision:ne().min(1).max(256),completed:xe(),granted:xe(),usageAgreement:Y({version:we(1),accepted:xe(),text:Ce(te).max(16)}).optional(),modelSourcesChanged:xe().optional(),blockedOperations:Ce(te).max(32),revocationUnconfirmed:xe(),scopes:Ce(Y({id:te,title:te,description:te,allowed:xe()})).max(16),modelSources:Ce(Y({modelId:te,source:te,licenseUrls:Ce(te).max(20),licenseNote:te,runtime:Y({source:te,sources:Ce(te).max(16).optional(),licenseUrls:Ce(te).max(20),redirectHost:te.nullable()}).optional()})).max(32),restrictions:Ce(te).max(16)})),ch=ke("setup",()=>Y({version:we(1),completed:xe()})),lt=ne().min(1).max(256),Ze=ne().min(1).max(256),Uu=de(["cpu","auto","cuda","vulkan"]),Lu={sourceDirectory:ne().min(1).max(4096).optional(),modelVariant:de(["q4_k_m","q8_0"]).optional()},cr=$i(ne(),Ou()),lh=Y({baseUrl:ne().min(1).max(2048),model:ne().min(1).max(256),voice:ne().min(1).max(256),apiKeyEnv:ne().max(128).regex(/^[A-Za-z_][A-Za-z0-9_]*$/).nullable(),format:de(["wav","mp3"]),textTransmissionAccepted:xe()}),uh=cr.refine(e=>e.customTts===void 0?e.provider!=="custom":lh.safeParse(e.customTts).success,"\u81EA\u5B9A\u4E49 TTS \u914D\u7F6E\u65E0\u6548"),dh=Y({provider:de(["deepseek","local"]),deepseekVoice:de(["stella","tide"]),deepseekTextTransmissionAccepted:xe(),volume:ct().min(0).max(1),localModelId:ne().max(128).nullable(),localModelPath:ne().max(4096).nullable(),referenceAudioPath:ne().max(4096).nullable(),referenceAudioAccepted:xe()}),ph=Y({backend:de(["winmm","portaudio"]),id:ne().min(1).max(1024),name:ne().min(1).max(256)}).nullable(),mh={"read-history":{cursor:ne().max(128).optional()},"read-audio-devices":{},"save-audio-device":{revision:lt,direction:de(["input","output"]),selection:ph},"agent-permissions":{},"save-agent-permissions":{revision:lt,allowed:Y({"set-performance-mode":xe(),"set-visibility":xe(),"set-output-volume":xe()})},"agent-requests":{},"decide-agent-request":{id:Ze,approve:xe(),acknowledgements:Ce(ne().max(80)).max(10)},"model-installer":{},"inspect-model-compute":{},"plan-model-install":{modelId:Ze,compute:Uu,...Lu},"start-model-install":{modelId:Ze,compute:Uu,...Lu,planHash:lt,accepted:we(!0),useWhenReady:xe().optional()},"control-model-install":{id:Ze,operation:de(["pause","resume","cancel"])},"apply-model-install":{id:Ze,revision:lt},status:{},enable:{expectedOwnerSessionId:Ze.nullable().optional(),expectedExistingSessionId:Ze.nullable().optional()},disable:{},"read-settings":{},new:{expectedOwnerSessionId:Ze.nullable().optional()},"inspect-performance":{},"set-performance-mode":{revision:lt,performanceMode:de(["fast","balanced","high","compatibility"])},"inspect-tts":{},"save-tts":{revision:lt,values:uh},"complete-setup":{revision:lt},"preview-tts":{revision:lt.optional(),values:dh.optional()},"cancel-tts":{},list:{cursor:ne().max(2048).optional()},resume:{id:Ze},"listen-mode":{mode:de(["ptt","always","wake"])},"set-visibility":{revision:lt,visibility:de(["hidden","workspace"])},"pick-local-path":{kind:de(["referenceAudio","sensevoiceDir","campplus","sourceDirectory"])},"capture-bindings":{operation:de(["begin","end"]),token:Ze.optional(),inactive:xe().optional()},"save-bindings":{revision:lt,values:cr,bindingContext:Y({ownerSessionId:Ze.nullable(),epoch:Ze.nullable(),rootSessionId:Ze.nullable()})},"save-voice-prompt":{revision:lt,values:Y({text:ne().max(32768)})},"conversation-models":{},"save-conversation-model":{revision:lt,values:Y({mode:de(["auto","manual"]),provider:ne().min(1).max(256).nullable(),model:ne().min(1).max(256).nullable()})},"save-settings":{revision:lt,values:cr},"save-models":{revision:lt,values:cr}},fh=ke("uiActionRequest",()=>co("action",Object.entries(mh).map(([e,t])=>Y({action:we(e),...t}))).refine(e=>e.action!=="preview-tts"||Object.hasOwn(e,"revision")===Object.hasOwn(e,"values"),"\u8349\u7A3F\u8BD5\u542C\u5FC5\u987B\u540C\u65F6\u63D0\u4F9B\u914D\u7F6E\u7248\u672C\u548C\u8BBE\u7F6E").refine(e=>JSON.stringify(e).length<=(e.action==="save-voice-prompt"?2e5:8192),"\u64CD\u4F5C\u6570\u636E\u8FC7\u957F")),Vu=ke("uiActionResult",()=>ne().max(4*1024*1024)),hh=ke("sessionManagementRequest",()=>co("operation",[Y({operation:we("list"),rootId:Ze.optional(),cursor:ne().max(2048).optional()}),Y({operation:we("unhide"),rootId:Ze,id:Ze}),Y({operation:we("restore"),rootId:Ze,id:Ze})])),gh=ke("presentation",()=>Y({shown:Ce(Tn([Y({id:Ze,parentId:ao(),mode:ao()}),Y({id:Ze,parentId:Ze,mode:de(["one-shot","continuable","unknown"])})]))})),Ri=ne().min(1).max(128),vh=ke("updateRequest",()=>co("action",[Y({action:we("check")}),Y({action:we("install"),version:Ri})])),Hu=ke("updateSnapshot",()=>Y({schema:we(1),revision:ct().int().nonnegative().optional(),currentVersion:Ri,channel:de(["stable","preview"]),status:de(["idle","checking","current","available","incompatible","installing","restart-required","enable-required","installed","error","unsupported"]),checkedAt:ne().max(64).nullable(),release:Y({version:Ri,announcement:ne().min(1).max(600),url:ne().startsWith("https://github.com/Emikosama/dsh-fish-voice/releases/tag/v").max(256)}).nullable(),message:ne().max(512).nullable(),canInstall:xe()})),lr=ur.create(),uo=Y({sessionId:lr,title:ne().max(256).nullable(),availability:de(["ready","busy","unavailable","archived"]),unavailableReason:de(["managed","subagent"]).optional(),updatedAt:ct().int().nonnegative().max(864e13).nullable().optional()}),qu=ne().min(1).max(512),bh=ke("listExistingSessionsRequest",()=>Tn([Y({sessionId:lr}),Y({query:ne().max(128).optional(),cursor:qu.optional()})])),xh=ke("listExistingSessionsResult",()=>Y({items:Ce(uo).max(100),nextCursor:qu.nullable(),binding:uo.nullable()})),yh=ke("setExistingSessionRequest",()=>Y({sessionId:lr.nullable(),expectedSessionId:lr.nullable()})),_h=ke("setExistingSessionResult",()=>Y({binding:uo.nullable()})),Ku=ne().min(1).max(160).regex(/^[A-Za-z0-9_-]+$/),wh=ke("operationLogPageRequest",()=>Y({cursor:Ku.optional()})),kh=ke("operationLogPage",()=>Y({text:ne().max(Ru),nextCursor:Ku.nullable()})),Ju=ne().uuid(),Sh=ke("operationScopeResult",()=>Y({scope:Ju})),Ih=ke("recordOperationRequest",()=>Y({scope:Ju,events:Ce(Y({id:ne().uuid(),at:qe,action:de(ar),source:de(["user","ui"]),phase:de(["requested","finished"]).optional(),result:de(["ok","failed","cancelled"]).optional(),count:qe.positive().optional()}).refine(e=>e.action==="ui-buffer-overflow"?e.source==="ui"&&e.count!==void 0:e.count===void 0)).min(1).max(lo)})),Mh=ke("recordOperationResult",()=>Y({accepted:xe()})),Ch=ke("retryVoiceTranscriptRequest",()=>Y({id:Di})),zh=ke("retryVoiceTranscriptResult",()=>Y({accepted:xe()})),Ph={retryVoiceTranscript:Ch,recordClientOperations:Ih,readOperationLog:wh,action:fh,saveAuthorization:rh,manageSessions:hh,senseVoiceAsrAction:ih,updateAction:vh,listExistingVoiceSessions:bh,setExistingVoiceSession:yh},Wh={readClientOperationScope:Sh,recordClientOperations:Mh,readOperationLog:kh,action:Vu,manageSessions:Vu,readAuthorization:Fu,saveAuthorization:Fu,senseVoiceAsrAction:ah,readSetup:ch,followPresentation:gh,followModels:oh,followUpdates:Hu,updateAction:Hu,listExistingVoiceSessions:xh,setExistingVoiceSession:_h,retryVoiceTranscript:zh},Le=(e,t,n=!1)=>({id:`dsh-fish-voice#${Oi}/${e}`,service:Oi,namespace:Oi,method:e,invocation:{kind:"direct"},...n?{mode:"stream"}:{},parameters:t.map(o=>({name:o,wire:o,source:"json",codec:o==="sessionId"?Uf:Ph[e]??Lf})),cancellation:{parameter:"signal"},result:Wh[e]??(n?qf:Kf)}),Gu={package:"dsh-fish-voice/conversation",descriptors:[Le("action",["sessionId","request"]),Le("follow",["sessionId"],!0),Le("followModels",["sessionId"],!0),Le("followPresentation",[],!0),Le("followUpdates",[],!0),Le("updateAction",["request"]),Le("readSetup",[]),Le("readAuthorization",[]),Le("saveAuthorization",["request"]),Le("senseVoiceAsrAction",["request"]),Le("manageSessions",["sessionId","request"]),Le("readClientOperationScope",[]),Le("recordClientOperations",["request"]),Le("readOperationLog",["request"]),Le("listExistingVoiceSessions",["request"]),Le("setExistingVoiceSession",["request"]),Le("retryVoiceTranscript",["request"]),Le("readVolume",["sessionId"]),Le("setVolume",["sessionId","request"])]};var Ve=e=>e!==null&&typeof e=="object"&&!Array.isArray(e),yt=(e,t=1024)=>typeof e=="string"&&e.length<=t,tn=e=>typeof e=="number"&&Number.isFinite(e),Ye=e=>typeof e=="boolean",Yu=e=>{if(!yt(e,4096))return!1;try{let t=new URL(e);return["https:","http:"].includes(t.protocol)&&!t.username&&!t.password}catch{return!1}},xt=(e,t=4096)=>e==null||yt(e,t),nn=e=>yt(e,256)&&e.length>0,Xu=["deepseek","local","custom","off"],dr=(e,t)=>yt(e,t)&&!!e.trim(),Nh=["baseUrl","model","voice","apiKeyEnv","format","textTransmissionAccepted"],Ah=e=>Ve(e)&&Object.keys(e).every(t=>Nh.includes(t))&&dr(e.baseUrl,2048)&&dr(e.model,256)&&dr(e.voice,256)&&(e.apiKeyEnv===null||dr(e.apiKeyEnv,128)&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(e.apiKeyEnv))&&["wav","mp3"].includes(e.format)&&Ye(e.textTransmissionAccepted),Te=()=>{throw new Error("\u914D\u7F6E\u63A5\u53E3\u8FD4\u56DE\u4E86\u65E0\u6548\u6570\u636E\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6")};function Zi(e){if(e.onboarding!==void 0&&(!Ve(e.onboarding)||e.onboarding.version!==1||!Ye(e.onboarding.completed))&&Te(),e.ttsSetup!==void 0){let t=e.ttsSetup;(!Ve(t)||!Xu.includes(t.provider)||!["stella","tide"].includes(t.deepseekVoice)||!Ye(t.deepseekTextTransmissionAccepted)||!tn(t.volume)||t.volume<0||t.volume>1||!(t.localModelId==null||nn(t.localModelId))||!xt(t.localModelPath)||!xt(t.referenceAudioPath)||!(t.referenceAudioAccepted===void 0||Ye(t.referenceAudioAccepted))||(t.customTts===void 0?t.provider==="custom":!Ah(t.customTts)))&&Te()}if(e.ttsRuntime?.localComputeBackend!=null&&(!["cpu","vulkan","cuda","hip"].includes(e.ttsRuntime.localComputeBackend)||!Ye(e.ttsRuntime.localComputeVerified)||!Ye(e.ttsRuntime.localComputeFallback))&&Te(),e.ttsRuntime?.localTimings!=null){let t=e.ttsRuntime.localTimings;(!Ve(t)||typeof t.modelResident!="boolean"||["preparationMs","deviceSelectionMs","synthesisMs","playbackMs","totalMs","chunks"].some(n=>!Number.isSafeInteger(t[n])||t[n]<0)||t.chunks<1||t.chunks>4e3)&&Te()}return e.ttsRuntime!=null&&(!Ve(e.ttsRuntime)||!yt(e.ttsRuntime.state,64)||!Ye(e.ttsRuntime.busy)||!Ye(e.ttsRuntime.blocked)||e.ttsRuntime.provider!=null&&!Xu.includes(e.ttsRuntime.provider))&&Te(),e}function ed(e,t){if(Ve(t)||Te(),e==="setup-status"&&(Object.keys(t).some(n=>!["version","completed"].includes(n))||t.version!==1||!Ye(t.completed))&&Te(),e==="inspect-tts"&&(!yt(t.platform,32)||!Ye(t.playbackSupported)||!Ye(t.deepseekKeyAvailable)||t.autoDownload!==!1||!Ye(t.gpuSupported))&&Te(),e==="preview-tts"&&(!["deepseek","local","custom"].includes(t.provider)||t.fallback!==!1||t.acousticConfirmation!==!1||t.playbackCompleted!==!0||t.textOnly!==void 0)&&Te(),e==="cancel-tts"&&!["idle","cancelled","unconfirmed"].includes(t.status)&&Te(),e==="model-installer"){if((t.schema!==1||!Array.isArray(t.models)||t.models.length>100||!Array.isArray(t.jobs)||t.jobs.length>1e3||!Ve(t.hardware)||!Ve(t.compute))&&Te(),t.refresh!=null){let n=t.refresh;(!Ve(n)||!Ye(n.pending)||!xt(n.observedAt,64)||!xt(n.attemptedAt,64)||!xt(n.error,512)||!(n.intervalMs===void 0||tn(n.intervalMs)&&n.intervalMs>0&&n.intervalMs<=36e5))&&Te()}for(let n of t.models)(!Ve(n)||!nn(n.id)||!Ye(n.available)||n.runtimeLoaded!==!1||!xt(n.title)||!xt(n.reason)||!(n.totalBytes==null||tn(n.totalBytes)&&n.totalBytes>=0))&&Te(),n.recommendation!=null&&(!Ve(n.recommendation)||!Ye(n.recommendation.recommended)||!xt(n.recommendation.reason))&&Te();for(let n of t.jobs)Qu(n);if(t.ttsInstallIntent!=null){let n=t.ttsInstallIntent;(!Ve(n)||!nn(n.jobId)||!nn(n.modelId)||!["waiting","verifying","applied","blocked","paused","cancelled"].includes(n.status)||!xt(n.reason))&&Te()}}return e==="inspect-model-compute"&&!Ve(t.compute)&&!Ve(t.backends)&&Te(),e==="plan-model-install"&&(t.reused!==void 0&&(!Ye(t.reused)||t.reused!==!0||!yt(t.sourceDirectory,4096)||!t.sourceDirectory||!["q4_k_m","q8_0"].includes(t.modelVariant)||!tn(t.reusedBytes)||t.reusedBytes<0)&&Te(),t.reused!==!0&&(t.sourceDirectory!==void 0||t.modelVariant!==void 0||t.reusedBytes!==void 0)&&Te(),Array.isArray(t.files)&&t.files.some(n=>Ve(n)&&n.reused!==void 0&&!Ye(n.reused))&&Te(),(!nn(t.modelId)||!["cpu","auto","cuda","vulkan"].includes(t.compute)||!yt(t.planHash,128)||!Array.isArray(t.files)||t.files.length>200||!tn(t.totalBytes)||t.totalBytes<0||!yt(t.destination,4096)||!Array.isArray(t.licenseUrls)||t.licenseUrls.some(n=>!Yu(n))||!xt(t.source)||!xt(t.notice)||!xt(t.licenseNote)||t.files.some(n=>!Ve(n)||!nn(n.name)||!tn(n.bytes)||n.bytes<0||!yt(n.sha256,64)||!/^[a-f0-9]{64}$/i.test(n.sha256)||!Yu(n.url)))&&Te()),["start-model-install","control-model-install"].includes(e)&&Qu(t),Zi(t)}function Qu(e){Ve(e)&&e.error!=null&&(!Ve(e.error)||!yt(e.error.message,512))&&Te(),(!Ve(e)||!nn(e.id)||!nn(e.modelId)||!["cpu","auto","cuda","vulkan"].includes(e.compute)||!["queued","running","paused","failed","cancelled","installed"].includes(e.status)||!yt(e.stage,128)||!tn(e.receivedBytes)||e.receivedBytes<0||!(e.totalBytes===null||tn(e.totalBytes)&&e.totalBytes>=0)||e.runtimeLoaded!==!1)&&Te()}function Ht(e,t){let n=r=>r!==null&&typeof r=="object"&&!Array.isArray(r),o=r=>typeof r=="string"&&r.length>0&&r.length<=256,i=r=>r===null||n(r)&&Object.keys(r).sort().join(",")==="code,modifiers"&&typeof r.code=="string"&&/^(F([1-9]|1[0-9]|2[0-4])|Key[A-Z]|Digit[0-9]|Space)$/.test(r.code)&&Array.isArray(r.modifiers)&&r.modifiers.length<=3&&new Set(r.modifiers).size===r.modifiers.length&&r.modifiers.every(s=>["Control","Alt","Shift"].includes(s))&&!(r.code==="F4"&&r.modifiers.includes("Alt"));if(!n(t))throw new Error("Fish Voice UI returned invalid data");if(t.wake!==void 0&&!(t.wake===null&&e!=="conversation")&&!ls(t.wake))throw new Error("Invalid wake state");if(t.listenMode!==void 0&&t.listenMode!==null&&!kn.includes(t.listenMode))throw new Error("Invalid listening mode");if(["status","enable","disable","new","resume","listen-mode"].includes(e)){if(!(t.ownerSessionId===null||o(t.ownerSessionId))||typeof t.enabled!="boolean"||!n(t.helper)||typeof t.helper.online!="boolean")throw new Error("Fish Voice UI returned an invalid status");if(t.existingVoiceSessionSupported!==void 0&&typeof t.existingVoiceSessionSupported!="boolean")throw new Error("Invalid existing session support");if(t.existingVoiceSession!=null&&!uo.safeParse(t.existingVoiceSession).success)throw new Error("Invalid existing voice session");if(t.helper.lastError!=null&&(typeof t.helper.lastError!="string"||t.helper.lastError.length>512))throw new Error("Invalid audio diagnostic")}else if(["save-voice-prompt","save-conversation-model","save-bindings","read-settings","save-settings","save-audio-device","save-models","set-visibility","set-performance-mode","save-tts","complete-setup","apply-model-install"].includes(e)){if(t.bindingContext!==void 0&&(!n(t.bindingContext)||["ownerSessionId","epoch","rootSessionId"].some(s=>t.bindingContext[s]!==null&&!o(t.bindingContext[s]))))throw new Error("Invalid binding context");let r=t.values;if(typeof t.revision!="string"||!t.revision||!n(r)||![0,1,2].includes(r.pttMouse)||!n(r.speakerVerification)||typeof r.speakerVerification.enabled!="boolean"||!(jn(r.device)||typeof r.device=="string"&&r.device.length<=256&&!/[\u0000-\u001f\u007f]/.test(r.device)||Number.isSafeInteger(r.device)&&r.device>=0))throw new Error("Fish Voice UI returned invalid settings");if(r.wakeWordAliases!==void 0&&!zo(r.wakeWordAliases))throw new Error("Invalid wake aliases");if(r.wakeListenTimeoutMs!==void 0&&(!Number.isInteger(r.wakeListenTimeoutMs)||r.wakeListenTimeoutMs<3e3||r.wakeListenTimeoutMs>3e4))throw new Error("Invalid wake timeout");if(r.semanticExperimental!==void 0&&typeof r.semanticExperimental!="boolean")throw new Error("Invalid experimental wake setting");if(r.pttKeyboard!==void 0&&!i(r.pttKeyboard))throw new Error("Invalid keyboard binding");if(t.capabilities?.pttKeyboard!==void 0){let s=t.capabilities.pttKeyboard;if(!n(s)||typeof s.supported!="boolean"||s.scope!=="global"||s.platform!=="win32"||!["available","unsupported"].includes(s.status)||!(s.reason==null||typeof s.reason=="string")||s.supported!==(s.status==="available"))throw new Error("Invalid keyboard capability")}if(t.modelSetup!==void 0&&(!n(t.modelSetup)||t.modelSetup.asr!=="sensevoice"||!n(t.modelSetup.models)||t.modelSetup.modelCompute!==void 0&&!["cpu","auto","cuda"].includes(t.modelSetup.modelCompute)||["sensevoiceDir","campplus"].some(s=>typeof t.modelSetup.models[s]!="string")))throw new Error("Fish Voice UI returned invalid model configuration");if(t.capabilities?.turnSignals===!0){let s=r.turnSignals;if(!n(s)||typeof s.enabled!="boolean"||typeof s.headphonesConfirmed!="boolean"||typeof s.experimentalAutomaticBargeIn!="boolean"||typeof s.volume!="number"||!Number.isFinite(s.volume)||s.volume<0||s.volume>1)throw new Error("Fish Voice UI returned invalid turn sound settings")}}else if(e==="list"&&(!Array.isArray(t.items)||t.items.length>50||!(t.nextCursor==null||typeof t.nextCursor=="string"&&t.nextCursor.length<=2048)||t.items.some(r=>!n(r)||!o(r.id)||typeof r.archived!="boolean"||typeof r.available!="boolean"||typeof r.canResume!="boolean"||r.title!==void 0&&typeof r.title!="string"||r.reason!==void 0&&typeof r.reason!="string")))throw new Error("Fish Voice UI returned invalid voice history");if(t.voicePrompt!==void 0){let r=t.voicePrompt;if(!n(r)||typeof r.text!="string"||r.text.length>32768||!["agents","custom"].includes(r.mode)||typeof r.customSupported!="boolean"||!(r.unsupportedReason===null||typeof r.unsupportedReason=="string"&&r.unsupportedReason.length<=512)||r.mode==="custom"&&(!r.text.trim()||!r.customSupported)||r.mode==="agents"&&r.customSupported&&r.text.trim())throw new Error("Invalid voice prompt preference")}if(t.conversationModel!==void 0&&(!n(t.conversationModel)||!["auto","manual"].includes(t.conversationModel.mode)||![t.conversationModel.provider,t.conversationModel.model].every(r=>r===null||o(r))||t.conversationModel.mode==="auto"&&(t.conversationModel.provider!==null||t.conversationModel.model!==null)))throw new Error("Invalid conversation model preference");if(e==="conversation-models"&&(!Array.isArray(t.providers)||t.providers.length>256||new Set(t.providers.map(r=>r?.id)).size!==t.providers.length||t.providers.some(r=>!n(r)||!o(r.id)||!o(r.name)||!Array.isArray(r.models)||r.models.length>2048||new Set(r.models.map(s=>s?.id)).size!==r.models.length||r.models.some(s=>!n(s)||!o(s.id)||!o(s.name)))))throw new Error("Invalid conversation model catalog");if(e==="read-audio-devices"&&!as(t))throw new Error("Invalid audio device inventory");if(t.audioDevices!==void 0&&(!n(t.audioDevices)||!jn(t.audioDevices.output)||!(jn(t.audioDevices.input)||typeof t.audioDevices.input=="string"||Number.isSafeInteger(t.audioDevices.input))))throw new Error("Invalid audio device preferences");if(e==="inspect-performance"&&(!Array.isArray(t.modes)||t.modes.some(r=>!n(r)||!["fast","balanced","high"].includes(r.performanceMode)||typeof r.available!="boolean")))throw new Error("Invalid performance capabilities");if(e==="read-history"&&(!(t.rootSessionId===null||o(t.rootSessionId))||!Number.isSafeInteger(t.generation)||t.generation<0||!Number.isSafeInteger(t.revision)||t.revision<0||!["voice-session","current-voice-session"].includes(t.scope)||typeof t.truncated!="boolean"||!(t.nextCursor===null||typeof t.nextCursor=="string"&&/^\d+:\d+$/.test(t.nextCursor))||!Array.isArray(t.items)||t.items.length>100||new Set(t.items.map(r=>r?.id)).size!==t.items.length||t.items.some(r=>!n(r)||!o(r.id)||!["user","assistant"].includes(r.role)||typeof r.text!="string"||r.text.length>8e3||!["reply","interrupted","delivered","speech-requested","speech-failed"].includes(r.state)||!Number.isFinite(r.at))))throw new Error("Invalid conversation history");if(e==="conversation"){if(t.helper!==void 0&&(!n(t.helper)||typeof t.helper.online!="boolean"||!(t.helper.listenMode===null||kn.includes(t.helper.listenMode))||!t.helper.online&&t.helper.listenMode!==null))throw new Error("Invalid conversation helper state");if(t.inputError!=null&&!["device","recognition","no-speech"].includes(t.inputError))throw new Error("Invalid input error");if(t.providerError!==void 0&&(typeof t.providerError!="string"||t.providerError.length>480))throw new Error("Invalid provider error");if(!Number.isSafeInteger(t.revision)||t.revision<0||t.title!==null||!(t.rootSessionId===null||o(t.rootSessionId))||!Array.isArray(t.items)||t.items.length>40||typeof t.inputActive!="boolean"||t.playbackConfirmed!==!1||t.items.some(r=>!n(r)||!o(r.id)||!["user","assistant"].includes(r.role)||typeof r.text!="string"||r.text.length>8e3||!["reply","interrupted","delivered","speech-requested","speech-failed"].includes(r.state)||!Number.isFinite(r.at))||t.latest!==null&&(!n(t.latest)||!t.items.some(r=>r.id===t.latest.id&&r.text===t.latest.text&&r.role==="assistant")))throw new Error("Invalid conversation snapshot")}if(e==="output-volume"&&(typeof t.supported!="boolean"||t.supported&&(typeof t.volume!="number"||!Number.isFinite(t.volume)||t.volume<0||t.volume>1||t.revision==null)))throw new Error("Invalid output volume snapshot");if(["agent-permissions","save-agent-permissions"].includes(e)){let r=["set-performance-mode","set-visibility","set-output-volume"];if(t.schema!==1||!o(t.revision)||!Array.isArray(t.items)||t.items.length!==3||new Set(t.items.map(s=>s?.operation)).size!==3||t.items.some(s=>!n(s)||!r.includes(s.operation)||typeof s.allowed!="boolean"||typeof s.title!="string"||s.title.length>128||!(s.reason===null||typeof s.reason=="string"&&s.reason.length<=1024)))throw new Error("Invalid agent permissions")}if(["agent-requests","decide-agent-request"].includes(e)){let r=s=>n(s)&&o(s.id)&&o(s.sourceSessionId)&&o(s.operation)&&typeof s.title=="string"&&s.title.length<=128&&["pending","executing","completed","blocked","unknown","superseded","expired","cancelled","rejected"].includes(s.state)&&Number.isFinite(s.createdAt)&&Number.isFinite(s.expiresAt)&&Number.isSafeInteger(s.humanRevision)&&n(s.request)&&n(s.before)&&Array.isArray(s.acknowledgements)&&s.acknowledgements.length<=10&&s.acknowledgements.every(a=>n(a)&&o(a.id)&&typeof a.text=="string"&&a.text.length<=1024)&&(s.error===null||n(s.error)&&typeof s.error.code=="string"&&typeof s.error.message=="string"&&s.error.message.length<=1024)&&(s.nextAction===null||typeof s.nextAction=="string"&&s.nextAction.length<=1024);if(t.schema!==1||!Number.isSafeInteger(t.humanRevision)||t.humanRevision<0||!Array.isArray(t.items)||t.items.length>100||t.items.some(s=>!r(s))||e==="decide-agent-request"&&(!r(t.lastOutcome)||!t.items.some(s=>s.id===t.lastOutcome.id&&s.state===t.lastOutcome.state)))throw new Error("Invalid agent request snapshot")}if(e==="authorization"){if(t.usageAgreement!==void 0&&(!n(t.usageAgreement)||t.usageAgreement.version!==1||typeof t.usageAgreement.accepted!="boolean"||!Array.isArray(t.usageAgreement.text)||t.usageAgreement.text.length>16||t.usageAgreement.text.some(r=>typeof r!="string"||r.length>4096)))throw new Error("Invalid usage agreement snapshot");if(t.schema!==1||!o(t.revision)||!Array.isArray(t.blockedOperations)||t.blockedOperations.some(r=>typeof r!="string")||typeof t.revocationUnconfirmed!="boolean"||typeof t.completed!="boolean"||typeof t.granted!="boolean"||!Array.isArray(t.scopes)||t.scopes.length>16||new Set(t.scopes.map(r=>r?.id)).size!==t.scopes.length||t.scopes.some(r=>!n(r)||!o(r.id)||typeof r.title!="string"||typeof r.description!="string"||typeof r.allowed!="boolean")||!Array.isArray(t.modelSources)||t.modelSources.length>32||t.modelSources.some(r=>!n(r)||!o(r.modelId)||typeof r.source!="string"||!Array.isArray(r.licenseUrls)||r.licenseUrls.some(s=>typeof s!="string")||typeof r.licenseNote!="string")||!Array.isArray(t.restrictions)||t.restrictions.some(r=>typeof r!="string"))throw new Error("Invalid authorization snapshot")}if(t.inferenceCompute!=null){let r=t.inferenceCompute;if(!n(r)||!["cpu","auto","cuda"].includes(r.requested)||![null,"cpu","cuda"].includes(r.actual)||r.engine!=="sensevoice"||!(r.computeType===null||["int8","float16","int8_float16","int8_float32","float32"].includes(r.computeType))||!(r.deviceIndex===null||Number.isSafeInteger(r.deviceIndex)&&r.deviceIndex>=0&&r.deviceIndex<8)||![null,"gpu-unavailable","gpu-load-failed","gpu-inference-failed","model-gpu-unverified"].includes(r.fallbackReason)||typeof r.validated!="boolean")throw new Error("Invalid inference compute status")}if(t.inputDevices!==void 0&&!ds(t.inputDevices))throw new Error("Invalid input device inventory");if(t.ptt?.keyboard!==void 0&&t.ptt.keyboard!==null){let r=t.ptt.keyboard;if(!n(r)||typeof r.supported!="boolean"||r.scope!=="global"||!["unsupported","active","inactive","unknown"].includes(r.status)||typeof r.hookInstalled!="boolean"||typeof r.recording!="boolean"||!(r.observedAt==null||Number.isFinite(r.observedAt)))throw new Error("Invalid keyboard status")}if(t.voiceSession?.recovery!==void 0){let r=t.voiceSession.recovery;if(!n(r)||r.stopVerified!==void 0&&typeof r.stopVerified!="boolean"||r.stopVerified===!0&&(r.kind!=="none"||t.voiceSession.fullyStopped!==!0)||!["none","live-root-conflict","predecessor-cleanup-pending","predecessor-stop-unconfirmed","helper-cleanup-pending","helper-stop-unconfirmed","root-stop-unconfirmed"].includes(r.kind)||!(r.rootSessionId===null||o(r.rootSessionId))||r.kind!=="none"&&t.voiceSession.fullyStopped===!0)throw new Error("Invalid voice recovery state")}if(t.voiceSession?.visibility!==void 0&&!["hidden","workspace"].includes(t.voiceSession.visibility))throw new Error("Fish Voice UI returned invalid visibility");if(t.voiceCapabilities!==void 0){let r=t.voiceCapabilities;if(!n(r)||!(r.configuredVisibility===null||["hidden","workspace"].includes(r.configuredVisibility))||["hidden","workspace"].some(s=>!n(r[s])||typeof r[s].supported!="boolean")||!n(r.taskHandoff)||typeof r.taskHandoff.mode!="string")throw new Error("Fish Voice UI returned invalid host capabilities")}return Zi(t),["setup-status","inspect-tts","preview-tts","cancel-tts","model-installer","inspect-model-compute","plan-model-install","start-model-install","control-model-install"].includes(e)&&ed(e,t),t}function td(e,t=10){let n=0;for(let o=e.length-1;o>=0;o--)if(e[o].role==="user"&&++n===t)return e.slice(o);return e}function nd(e=[],t=[]){let n=new Map(e.map(o=>[o.id,o]));for(let o of t)n.set(o.id,o);return[...n.values()].sort((o,i)=>o.at-i.at)}function od(e,t=36){return e.scrollHeight-e.scrollTop-e.clientHeight<=t}function rd({enabled:e,active:t,unknown:n,pending:o}){return n?"unknown":o?"pending":e?t?"listening":"standby":"off"}function po(e){return e?.enabled?e.existingVoiceSession?.sessionId??e.voiceSession?.id??null:null}var id=["save-voice-prompt","save-conversation-model","save-bindings","read-settings","save-settings","save-audio-device","save-models","set-visibility","set-performance-mode","save-tts","complete-setup","apply-model-install"],mo=id.filter(e=>e!=="read-settings"),fo=["status","enable","disable","new","resume","listen-mode"],Eh=new Set(["status","enable","disable","listen-mode","read-history"]),Th=["save-bindings","inspect-tts","inspect-model-compute"],jt=new Set(["conversation-models","status","read-settings","read-output-volume","model-installer","agent-permissions","agent-requests"]),fn=["conversation-models","agent-permissions","agent-requests","status","read-settings","list","read-output-volume","inspect-performance","inspect-tts","model-installer","inspect-model-compute","plan-model-install"],$h=e=>typeof e?.code=="string"?e.code:/\[([A-Z][A-Z0-9_]{0,79})\](?:\r?\n|$)/m.exec(String(e?.message??e))?.[1];function sd(e,{schedule:t=(i,r)=>globalThis.setTimeout(i,r),unschedule:n=i=>globalThis.clearTimeout(i),observe:o=()=>{}}={}){let i=0,r={conversationHistory:null,conversationHistoryFor:null,conversationHistoryError:null,conversationHistoryLoading:!1,conversationHistoryRequestCursor:null},s={...r,conversationModels:null,conversationModelsFor:null,conversationModelsError:null,authorization:null,authorizationOpen:!1,authorizationLoading:!1,authorizationBusy:!1,authorizationUncertain:!1,authorizationNeedsReview:!1,authorizationWriteUnconfirmed:!1,authorizationError:null,agentRequests:null,agentRequestsFor:null,busy:!1,interruptibleRead:null,diagnosticStopPending:!1,voiceStopUnconfirmed:!1,error:null,status:null,settings:null,settingsFor:null,visibilityUncertain:!1,visibilityReadbackFor:null,catalog:null,checkedFor:null,catalogFor:null,uncertain:!1,performance:null,performanceFor:null,performancePending:!1,performanceError:null,conversation:null,conversationFor:null,conversationError:null,outputVolume:null,outputVolumeFor:null,outputVolumeUncertain:!1,setupStatus:null,setupOpen:!1,panelView:"home",setupError:null,ttsCapabilities:null,ttsCapabilitiesFor:null,ttsPreview:null,ttsPreviewFor:null,ttsCancelling:!1,ttsUncertain:!1,installer:null,installerFor:null,installerError:null,installerUncertain:!1,installPlan:null,installPlanFor:null},a=new Set,l=null,u=!0,d=!0,p=0,f=null,m=null,b=0,v=new Map,y=()=>{for(let x of v.values())x.stale=!0,x.abort.abort();v.clear()},w=()=>{y(),f&&(f.stale=!0,jt.has(f.action)&&f.abort.abort())},C=!1,D=null,F=!1,N=null,W=0,M=0,$=new Map,I=!0,k=null,z=null,O=null,S,P=null,A=0,j=0,L=!1,K=null,q=null,fe=new Set,le=new Set,ee=new Set,G=new Set,E=x=>{if(!I)return;let _=Object.hasOwn(x,"uncertain")?x.readOnlyFailure===!0:s.readOnlyFailure;s={...s,...x,readOnlyFailure:_};for(let R of fe)R()},V,re,ue=0,ye=x=>["checking","installing"].includes(x?.status),Xe=(x,_)=>{_?.revision!==void 0&&x.revision<_.revision||(_&&x.revision!==void 0&&(_.revision=x.revision),E({updates:x,updatesUnavailable:!1}))},Be=()=>{if(!I||!k?.subscribeUpdates||V||!u)return;let x=k,_={};V=_,_.stop=x.subscribeUpdates(R=>{!I||V!==_||(ue++,Tt("update-stream"),Xe(R,_))},()=>{!I||V!==_||(V=null,E({updatesUnavailable:!0}),Je(z,"update-stream"))})},it=()=>{let x=V;V=null,x?.stop?.(),re?.abort(),re=null,E({updates:null,updatePending:null,updatesUnavailable:!1})},Jt=async x=>{if(!I||!k?.updateAction||re)return;let{action:_,version:R}=x;if(_==="install"&&(s.updatesUnavailable||s.updates?.canInstall!==!0||s.updates?.release?.version!==R))return;let U=k,X=new AbortController;re=X,Be();let Q=V,ge=ue;E({updatePending:_});try{let Re=await U.updateAction(x,X.signal);I&&re===X&&V===Q&&(Re.revision===void 0&&ye(Re)&&ue!==ge&&!ye(s.updates)||Xe(Re,Q))}catch{let Re=ue!==ge&&!ye(s.updates);I&&re===X&&V===Q&&!Re&&E({updatesUnavailable:!0})}finally{re===X&&(re=null,E({updatePending:null}))}},he=0,oe=x=>{he++,E({...x,ttsUncertain:!0})},je=()=>s.status?.existingVoiceSession?null:z,$e=null,ut=()=>{$e=null,E({transcriptRetry:null})},wo=x=>{if(!$e?.receipt||x?.rootSessionId!==$e.sessionId)return;let _=x.retryTranscripts?.items.find(R=>R.id===$e.id);(!_||_.state!=="ready"||$e.receipt==="unconfirmed"&&x.revision>$e.revision)&&ut()},vn=async(x,_)=>{let{status:R,conversation:U,checkedFor:X,conversationFor:Q,uncertain:ge,busy:Re}=s,Se=R?.existingVoiceSession?.sessionId;if(!I||!k?.retryVoiceTranscript||$e||ge||Re||z!==x||X!==x||Q!==x||!R?.enabled||!Se||U?.rootSessionId!==Se||U.retryTranscripts?.sessionId!==Se||!U.retryTranscripts.items.some(Dt=>Dt.id===_&&Dt.state==="ready"))return;let nt=k,Ue=new AbortController,St=$e={id:_,sessionId:Se,revision:U.revision,receipt:null};le.add(Ue),E({transcriptRetry:{id:_,state:"sending"}});try{let Dt=await nt.retryVoiceTranscript({id:_},Ue.signal);if(!I||$e!==St)return;Dt.accepted===!1?ut():St.receipt="accepted"}catch{if(!I||$e!==St)return;St.receipt="unconfirmed"}finally{le.delete(Ue),$e===St&&(St.receipt==="unconfirmed"&&E({transcriptRetry:{id:_,state:"uncertain"}}),wo(s.conversation))}},Oe=async(x,_,R)=>{let U=e??k?.action;if(!U)throw new Error("\u9C7C\u5E94\u754C\u9762\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let X=s.status?.existingVoiceSession&&Eh.has(_.action)||s.existingSessionUnconfirmed&&_.action==="status"?null:x,Q=await U(X,_,R);try{return Ht(_.action,Q)}catch(ge){throw o("ui-render-error","finished","failed"),ge}},gt=null,At=({clear:x=!1}={})=>{let _=gt;gt=null,_?.abort.abort(),E({audioDevicesPending:!1,audioDevicesError:null,...x?{audioDevices:null,audioDevicesFor:null}:{}})},bn=x=>{if(!I||z!==x)return Promise.resolve(!1);if(gt?.id===x&&gt.client===k)return gt.promise;At();let _={id:x,client:k,scope:M,abort:new AbortController,promise:null};gt=_,le.add(_.abort),E({audioDevicesPending:!0,audioDevicesError:null});let R=()=>I&&gt===_&&z===x&&k===_.client&&M===_.scope;return _.promise=(async()=>{let U;try{let X=new Promise((ge,Re)=>{U=()=>Re(new Error("Device read cancelled")),_.abort.signal.addEventListener("abort",U,{once:!0})}),Q=await Promise.race([Oe(x,{action:"read-audio-devices"},_.abort.signal),X]);return R()?(E({audioDevices:Q,audioDevicesFor:x}),!0):!1}catch(X){return R()&&!_.abort.signal.aborted&&E({audioDevicesError:String(X?.message??X)}),!1}finally{_.abort.signal.removeEventListener("abort",U),le.delete(_.abort),R()&&(gt=null,E({audioDevicesPending:!1}))}})(),_.promise},Et=null,Mr=x=>{if(!I||z!==x)return Promise.resolve(!1);if(Et?.id===x&&Et.scope===M)return Et.promise;let _={id:x,scope:M,client:k,promise:null};Et=_;let R=()=>I&&Et===_&&z===x&&M===_.scope&&k===_.client;return E({modelComputePending:!0,modelComputeError:null}),_.promise=(async()=>{try{if(await Oe(x,{action:"inspect-model-compute"}),!R())return!1;let U=await Oe(x,{action:"model-installer"});return R()?(E({installer:U,installerFor:x,installerError:null}),L||(L=!0,ie(!0)),!0):!1}catch(U){if(!R())return!1;let X=U?.uncertain||/TTS_TERMINATION_UNCONFIRMED/.test(String(U?.code??"")+" "+String(U?.message??""));return E({modelComputeError:String(U?.message??U),...X?{installerUncertain:!0,installerTerminationUnconfirmed:!0}:{}}),!1}finally{R()&&(Et=null,E({modelComputePending:!1}))}})(),_.promise},wt=null,$t=0,Ot=({clear:x=!1}={})=>{$t++;let _=wt;wt=null,_?.abort.abort(),E({performancePending:!1,performanceError:null,...x?{performance:null,performanceFor:null}:{}})},Cr=x=>{if(!I||z!==x)return Promise.resolve(!1);if(wt?.id===x&&wt.client===k)return wt.promise;Ot();let _={id:x,client:k,epoch:$t,abort:new AbortController,promise:null};wt=_,le.add(_.abort),E({performancePending:!0,performanceError:null});let R=()=>I&&wt===_&&_.epoch===$t&&z===x&&k===_.client;return _.promise=(async()=>{let U;try{let X=new Promise((ge,Re)=>{U=()=>Re(new Error("Probe cancelled")),_.abort.signal.addEventListener("abort",U,{once:!0})}),Q=await Promise.race([Oe(x,{action:"inspect-performance"},_.abort.signal),X]);return R()?(E({performance:Q,performanceFor:x}),!0):!1}catch(X){return R()&&!_.abort.signal.aborted&&E({performanceError:String(X?.message??X)}),!1}finally{_.abort.signal.removeEventListener("abort",U),le.delete(_.abort),R()&&(wt=null,E({performancePending:!1}))}})(),_.promise},sn=()=>{let x=$.get("conversation-stream");x&&(x.timer!==null&&n(x.timer),x.timer=null,x.ready=!1);let _=++A;if(O?.(),O=null,i++,E({...r,conversation:null,conversationFor:null,conversationError:null,listenModeReceiptRevision:null}),S=void 0,!I||!k)return;let R=z;S=je(),O=k.subscribe(S,(U,X)=>{if(!(!I||_!==A||z!==R))try{let Q=Ht("conversation",U);X?.initial||Tt("conversation-stream"),s.conversationHistory&&(s.conversationHistory.rootSessionId!==Q.rootSessionId||s.conversationHistory.scope!=="voice-session"&&s.conversationHistory.generation!==Q.historyGeneration)&&(i++,E({...r}));let ge=s.conversationHistory,Re={};if(ge?.rootSessionId&&ge.rootSessionId===Q.rootSessionId){let Se=new Map(ge.items.map(It=>[It.id,It]));for(let It of Q.items)Se.set(It.id,It);let nt=[...Se.values()].sort((It,H)=>It.at-H.at),Ue=nt.slice(-4e3),St=Ue.reduce((It,H)=>It+H.text.length,0),Dt=nt.length>4e3;for(;St>4*1024*1024;)St-=Ue.shift().text.length,Dt=!0;Re={conversationHistory:{...ge,items:Ue,truncated:ge.truncated||Dt}}}E({...Re,conversation:Q,conversationFor:R,conversationError:null}),wo(Q)}catch(Q){i++,E({...r,conversation:null,conversationFor:null,conversationError:String(Q.message)}),Je(R,"conversation-stream")}},U=>{I&&_===A&&(i++,E({...r,conversation:null,conversationFor:null,conversationError:String(U?.message??U)}),Je(R,"conversation-stream"))})},ie=(x=!1)=>{let _=$.get("model-stream");_&&(_.timer!==null&&n(_.timer),_.timer=null,_.ready=!1);let R=++j;if(P?.(),P=null,x||E({installer:null,installerFor:null,installerError:null}),!I||!k?.subscribeModels||!L)return;let U=z;P=k.subscribeModels(U,(X,Q)=>{if(!(!I||R!==j||z!==U||Q?.initial))try{let ge=Ht("model-installer",X),Re=s.installer?.ttsInstallIntent;if(Tt("model-stream"),E({installer:ge,installerFor:U,installerError:null}),ge.ttsInstallIntent&&(Re?.jobId!==ge.ttsInstallIntent.jobId||Re?.status!==ge.ttsInstallIntent.status)){let Se=ge.ttsInstallIntent.status==="applied";E({checkedFor:null}),Fe({settings:Se,force:!0})}}catch(ge){E({installer:null,installerFor:null,installerError:String(ge.message)}),Je(U,"model-stream")}},X=>{I&&R===j&&(E({installer:null,installerFor:null,installerError:String(X?.message??X)}),Je(U,"model-stream"))})},kt=()=>{if(q)return q;if(!K)return Promise.resolve(!0);let x=K,_=he;return x.cancelled=!0,x.abort.abort(),E({ttsCancelling:!0,ttsPreview:{status:"cancelling"}}),q=(async()=>{let R=!1;try{let U=await Oe(x.id,{action:"cancel-tts"});return U.status==="unconfirmed"?(D=null,oe({ttsPreview:U,uncertain:!0,error:"\u65E0\u6CD5\u786E\u8BA4\u6717\u8BFB\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B\u540E\u518D\u8BD5\u3002"}),!1):(R=!0,E({ttsPreview:U,..._===he?{ttsUncertain:!1}:{}}),!0)}catch(U){return D=null,oe({ttsPreview:{status:"unconfirmed"},uncertain:!0,error:String(U?.message??U)}),!1}finally{R&&K===x&&(K=null),E({ttsCancelling:!1}),q=null,queueMicrotask(()=>{So(),wn()})}})(),q},Tt=x=>{let _=$.get(x);_?.timer!=null&&n(_.timer),$.delete(x)},zr=()=>{for(let x of $.keys())Tt(x)},Je=(x,_)=>{if(!I||!C||z!==x||!["authorization","setup-status","conversation-stream","model-stream","update-stream"].includes(_)&&!jt.has(_))return;let R=$.get(_);R||(R={id:x,scope:M,attempts:0,timer:null,ready:!1},$.set(_,R)),!(R.timer!==null||R.ready||!u||!d)&&(R.attempts++,o("ui-read-recovery","requested"),R.timer=t(()=>{R.timer=null,!(!I||z!==x||R.scope!==M||$.get(_)!==R)&&(R.ready=!0,wn())},Math.min(3e4,750*2**Math.min(R.attempts-1,6))),R.timer?.unref?.())},Gt=null,ko=0,xn=()=>{Gt!==null&&n(Gt),Gt=null,ko=0},Qi=x=>{!I||!u||!d||z!==x||Gt!==null||ko>=10||(Gt=t(()=>{if(Gt=null,!(!I||z!==x||!["predecessor-cleanup-pending","helper-cleanup-pending"].includes(s.status?.voiceSession?.recovery?.kind))){if(s.busy||s.ttsCancelling){Qi(x);return}ko++,tt.run(x,"status")}},1e3),Gt?.unref?.())},tt,an=0,yn=null,_n=null,cn=null,Fn=!1,ip=async x=>{let _=k,R=[],U=new Set;if(!I||!_?.readOperationLog)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u672A\u5C31\u7EEA");let X=null;do{x?.throwIfAborted();let Q=await _.readOperationLog(X?{cursor:X}:{},x);if(!I||k!==_||x?.aborted)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u8FDE\u63A5\u5DF2\u53D8\u5316");if(typeof Q?.text!="string"||!(Q.nextCursor===null||typeof Q.nextCursor=="string"&&Q.nextCursor)||U.has(Q.nextCursor))throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u5206\u9875\u65E0\u6548");R.push(Q.text),X=Q.nextCursor,U.add(X)}while(X);return R},sp=async(x,_)=>{if(!I||!k?.manageSessions)throw new Error("\u9C7C\u5E94\u4F1A\u8BDD\u7BA1\u7406\u5C1A\u672A\u5C31\u7EEA");let R=k,U=await R.manageSessions(null,x,_);if(!I||k!==R||_?.aborted)throw new Error("\u4F1A\u8BDD\u7BA1\u7406\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5");return U},ap=async(x,_)=>{if(!I||!k?.listExistingVoiceSessions)throw new Error("DSH \u4F1A\u8BDD\u5217\u8868\u6682\u4E0D\u53EF\u7528");let R=k,U=await R.listExistingVoiceSessions(x,_);if(!I||k!==R||_?.aborted)throw new Error("\u4F1A\u8BDD\u5217\u8868\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5");return U},ln=null,cp=async x=>{if(!I||!k?.setExistingVoiceSession||ln||s.existingSessionUnconfirmed)throw new Error("DSH \u4F1A\u8BDD\u7ED1\u5B9A\u6682\u4E0D\u53EF\u7528");let _=k,R=new AbortController;ln=R,le.add(R);for(let U of[v.get("status"),f])U?.action==="status"&&(U.stale=!0,U.abort.abort());E({existingSessionWritePending:!0});try{let U=await _.setExistingVoiceSession(x,R.signal);if(!I||k!==_||R.signal.aborted)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u786E\u8BA4");return s.status&&E({status:{...s.status,existingVoiceSession:U.binding}}),S!==je()&&sn(),U}catch(U){throw E({existingSessionUnconfirmed:!0}),U}finally{le.delete(R),ln=null,E({existingSessionWritePending:!1}),Fe({force:!0})}},lp=async(x,_)=>{if(!I||!k?.senseVoiceAsrAction)throw new Error("\u8BC6\u522B\u6A21\u578B\u7BA1\u7406\u6682\u4E0D\u53EF\u7528");let R=k,U=await R.senseVoiceAsrAction(x,_);if(!I||k!==R||_?.aborted)throw new Error("\u8BC6\u522B\u6A21\u578B\u72B6\u6001\u5DF2\u5207\u6362");if(!(Q=>Q&&["idle","downloading","ready","error"].includes(Q.state)&&Number.isSafeInteger(Q.receivedBytes)&&Number.isSafeInteger(Q.totalBytes)&&Q.receivedBytes>=0&&Q.receivedBytes<=Q.totalBytes)(U)||typeof U.selected!="boolean"||U.message!==null&&(typeof U.message!="string"||U.message.length>512))throw new Error("\u8BC6\u522B\u6A21\u578B\u72B6\u6001\u65E0\u6548");return U},Rt=async({open:x=!1,initial:_=!1,review:R=!1}={})=>{if(!k?.readAuthorization)return!1;if(_n)return cn={open:x||cn?.open,initial:_||cn?.initial,review:R||cn?.review},x&&E({authorizationOpen:!0,...R?{authorizationNeedsReview:!0}:{}}),!1;yn?.abort();let U=++an,X=new AbortController,Q=k;le.add(X),yn=X,E({authorizationLoading:!0,authorizationError:null,...x?{authorizationOpen:!0}:{},...R?{authorizationNeedsReview:!0}:{}});try{let ge=Ht("authorization",await Q.readAuthorization(X.signal));return!I||U!==an||k!==Q?!1:(Tt("authorization"),E({authorization:ge,authorizationUncertain:ge.revocationUnconfirmed,authorizationWriteUnconfirmed:!1,..._&&!Fn&&(!ge.completed||ge.usageAgreement?.accepted!==!0||ge.revocationUnconfirmed)?{authorizationOpen:!0}:{}}),!0)}catch(ge){return I&&U===an&&k===Q&&(E({authorizationError:String(ge?.message??ge),authorizationUncertain:!0,..._?{authorizationOpen:!0}:{}}),Je(z,"authorization")),!1}finally{le.delete(X),yn===X&&(yn=null,I&&E({authorizationLoading:!1}))}},up=async x=>{if(!k?.saveAuthorization||!s.authorization||s.authorizationBusy||s.authorizationLoading||s.authorizationUncertain)return!1;let _=s.setupStatus?.completed!==!0||s.setupOpen;yn?.abort();let R=new AbortController,U=++an,X=k;le.add(R),_n=R,E({authorizationBusy:!0,authorizationError:null});try{let Q=Ht("authorization",await X.saveAuthorization({revision:s.authorization.revision,grant:x},R.signal));return!I||U!==an||k!==X?!1:(Fn=!1,E({authorization:Q,authorizationOpen:Q.revocationUnconfirmed,authorizationUncertain:Q.revocationUnconfirmed,authorizationNeedsReview:!1,authorizationWriteUnconfirmed:Q.revocationUnconfirmed,...Q.revocationUnconfirmed?{authorizationError:"\u6743\u9650\u5DF2\u64A4\u56DE\uFF0C\u4F46\u5F53\u524D\u97F3\u9891\u505C\u6B62\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u6838\u67E5\u72B6\u6001\u3002"}:{}}),x&&_&&!Q.revocationUnconfirmed&&tt.openSetup(),Fe({settings:!0,force:!0}),!0)}catch(Q){try{let ge=Ht("authorization",await X.readAuthorization(R.signal));if(I&&k===X&&U===an&&ge.completed&&ge.granted===x&&(!x||ge.usageAgreement?.accepted===!0&&ge.modelSourcesChanged!==!0)&&!ge.revocationUnconfirmed)return Fn=!1,E({authorization:ge,authorizationOpen:!1,authorizationUncertain:!1,authorizationNeedsReview:!1,authorizationWriteUnconfirmed:!1}),x&&_&&tt.openSetup(),Fe({settings:!0,force:!0}),!0}catch{}return I&&k===X&&U===an&&(E({authorizationUncertain:!0,authorizationWriteUnconfirmed:!0,authorizationError:String(Q?.message??Q)}),Je(z,"authorization")),!1}finally{if(le.delete(R),_n===R&&(_n=null,I&&E({authorizationBusy:!1}),I&&(cn||k!==X))){let Q=cn??{initial:!0};cn=null,Rt(Q)}}},un=null,Pr=0,Wr=()=>{if(!k?.readSetup||un)return un?.promise;let x=k,_=Pr,R=new AbortController,U={promise:null};return un=U,le.add(R),U.promise=(async()=>{try{let X=Ht("setup-status",await x.readSetup(R.signal));return!I||k!==x?!1:(Tt("setup-status"),E({setupStatus:X,...p===_&&!Fn?{setupOpen:!X.completed}:{},setupError:null}),X.completed?Fe({settings:!0}):So(),!0)}catch(X){return I&&k===x&&(E({setupError:String(X?.message??X)}),Je(z,"setup-status")),!1}finally{le.delete(R),un===U&&(un=null)}})(),U.promise},wn=async()=>{if(!(e||k?.action||k?.readAuthorization||k?.readSetup||k?.subscribeUpdates)||!I||!C||!u||!d||F||ln||s.busy||s.ttsCancelling||!D&&![...$.values()].some(U=>U.ready))return;if(!D){let[U,X]=[...$].find(([,Q])=>Q.ready);if(X.ready=!1,X.id!==z||X.scope!==M){Tt(U);return}F=!0;try{U==="authorization"?await Rt():U==="setup-status"?await Wr():U==="conversation-stream"?sn():U==="model-stream"?ie(!0):U==="update-stream"?Be():await tt.run(X.id,U)}finally{F=!1,queueMicrotask(()=>{wn()})}return}let x=D;D=null;let _=()=>I&&x.id===z&&x.scope===M;if(!_())return;let R=()=>_()?!u||!d||ln||s.busy||s.ttsCancelling?(D||(D=x),!0):!1:!0;F=!0;try{if(x.notified||(x.notified=!0,N=x.id,W=Date.now(),E({readRefresh:(s.readRefresh??0)+1})),R()||(x.settings&&(x.settings=!1,await tt.run(x.id,"read-settings",{},!0)),R()))return;x.status&&(x.status=!1,await tt.run(x.id,"status",{},!0)),_()&&x.id&&!G.has(x.id)&&(G.add(x.id),tt.run(x.id,"inspect-performance"))}finally{F=!1,queueMicrotask(()=>{wn()})}},Fe=({settings:x=!1,force:_=!1}={})=>{if(Be(),!(!I||!C)&&!(!_&&!x&&N===z&&Date.now()-W<1500)&&(s.authorizationUncertain&&!yn&&!_n&&Rt(),s.setupError&&!un&&Wr(),!(!z&&!k?.action&&!s.setupOpen&&s.setupStatus===null))){s.installerError&&L&&ie(!0);for(let R of $.values())R.id===z&&(R.timer!==null&&n(R.timer),R.timer=null,R.attempts=0,R.ready=!0);Gt===null&&(ko=0),(!D||D.scope!==M)&&o("ui-status-refresh","requested"),D={id:z,scope:M,settings:!0,status:!0,notified:!1},queueMicrotask(()=>{wn()})}},es=()=>{let x=u&&d;if(s.readVisible!==x){if(E({readVisible:x}),!x){y();for(let _ of $.values())_.timer!==null&&n(_.timer),_.timer=null,_.ready=!1;xn();return}Fe({force:!0})}},So=async()=>{let x=z;!(e||k?.action)||s.setupStatus?.completed!==!1||ee.has(x)||s.busy||s.ttsCancelling||(ee.add(x),await tt.run(x,"read-settings")&&z===x&&await tt.run(x,"status"))};return tt={getSnapshot:()=>s,async pickPath(x,_,R){if(!I||z!==x)return null;let U=M,X=e??k?.action;if(!X)throw new Error("\u9C7C\u5E94\u754C\u9762\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let Q=await X(x,{action:"pick-local-path",kind:_},R);if(!I||z!==x||U!==M||R?.aborted)return null;if(!Q||!(Q.path===null||typeof Q.path=="string"&&Q.path.length>0&&Q.path.length<=4096&&!/[\u0000-\u001f\u007f]/.test(Q.path)))throw new Error("\u8DEF\u5F84\u9009\u62E9\u7ED3\u679C\u65E0\u6548");return Q.path},async captureBindings(x,_){let R=await Oe(x,{action:"capture-bindings",..._});if(!R||typeof R.token!="string"||typeof R.paused!="boolean")throw new Error("\u6309\u952E\u5F55\u5165\u56DE\u6267\u65E0\u6548");return R},setReadVisibility(x){u=!!x,es()},setPanelVisible(x){d=!!x,es()},markSettingsEdited(x="save-settings"){mo.includes(x)&&(a.add(x),E({settingsDraftActions:[...a]}))},discardSettingsDraft(x){x?a.delete(x):a.clear(),E({settingsDraftActions:[...a]}),!a.size&&(l&&E({settings:l,settingsFor:z}),l=null,E({settingsConflict:!1,settingsKey:s.settings?.revision}))},enableAutomaticReads(){C=!0,Fe({settings:!0,force:!0})},refresh:Fe,refreshModelCompute:Mr,subscribe(x){return fe.add(x),()=>fe.delete(x)},setSession(x){z!==x&&(z=x,M++,Et=null,a.clear(),l=null,E({sourcePending:!0,checkedFor:void 0,settingsFor:void 0,modelComputePending:!1,modelComputeError:null,enableError:null,listenModeError:!1,newChatFor:void 0,settingsConflict:!1,settingsDraftActions:[],installPlan:null,installPlanFor:null}),zr(),Ot({clear:!0}),At({clear:!0}),xn(),kt(),w(),sn(),ie(),Fe({settings:!0,force:!0}),So())},attachConversationClient(x){k!==x&&(it(),M++,Et=null,E({...e?{}:{sourcePending:!0,checkedFor:void 0,settingsFor:void 0},authorization:null,authorizationUncertain:!!_n,modelComputePending:!1,modelComputeError:null}),zr(),Ot({clear:!0}),At({clear:!0}),w(),ee.clear(),G.clear()),k=x,Rt({initial:!0}),sn(),ie(),Fe({settings:!0,force:!0}),k.readSetup&&(un=null,Pr=p,Wr())},conversationUnavailable(x){i++,E({...r,error:String(x?.message??x),conversation:null,conversationFor:null,conversationError:String(x?.message??x)})},async dismissSetup(){let x=++p,_=await kt();return _&&x===p&&(w(),tt.discardSettingsDraft(),E({setupOpen:!1})),_&&x===p},async showHome(){let x=++p,_=await kt();return _&&x===p&&(w(),tt.discardSettingsDraft(),E({setupOpen:!1,panelView:"home"}),Fe()),_&&x===p},async openSettings(x="audio",_="conversation"){let R=++p,U=await kt();return U&&R===p&&(w(),E({setupOpen:!1,panelView:"settings",settingsTab:["audio","interaction","prompt","models","advanced","sessions","pets"].includes(x)?x:"audio",settingsModelTab:_,sessionManagementRoot:null,sessionHistoryOpen:!1}),Fe({settings:!0})),U&&R===p},readOperationLog:ip,manageSessions:sp,listExistingVoiceSessions:ap,retryVoiceTranscript:vn,setExistingVoiceSession:cp,setSettingsTab(x){x!==s.settingsTab&&E({settingsTab:x,sessionManagementRoot:null,sessionHistoryOpen:!1})},setSettingsModelTab(x){E({settingsModelTab:x})},setSessionManagement({rootId:x=s.sessionManagementRoot,historyOpen:_}){E({sessionManagementRoot:x,sessionHistoryOpen:_})},senseVoiceAsrAction:lp,updateAction:Jt,dismissUpdate(x){x&&E({dismissedUpdateVersion:x})},openSetup(){++p,w(),E({setupOpen:!0}),Fe({settings:!0,force:!0}),!C&&!s.busy&&(async()=>{let x=z;await tt.run(x,"read-settings")&&z===x&&await tt.run(x,"status")})()},cancelPreview:kt,discardDiagnostics:w,refreshAuthorization:Rt,saveAuthorization:up,openAuthorization:()=>Rt({open:!0}),closeAuthorization({resumeSetup:x=!1}={}){return!s.authorizationBusy&&!s.authorizationLoading?(Fn=!x,++p,Pr=p,E({authorizationOpen:!1,authorizationNeedsReview:!1,setupOpen:x}),x&&Fe({settings:!0}),!0):!1},async run(x,_,R={},U=!1){if(!I||!e&&z!==x||ln&&_==="status"||(ln||s.existingSessionUnconfirmed)&&["enable","new","resume"].includes(_))return!1;let X=!!(U&&jt.has(_)&&!s.uncertain&&s.checkedFor===x&&s.settingsFor===x&&s.status&&s.settings);if(X&&v.has(_))return!1;if(U||y(),_==="read-history"){if(z!==x||s.conversationHistoryLoading)return!1;let H=++i,_e=M,Qe=A;E({conversationHistoryLoading:!0,conversationHistoryError:null,conversationHistoryRequestCursor:R.cursor??null});try{let De=await Oe(x,{action:_,...R});if(!I||z!==x||_e!==M||H!==i||Qe!==A||s.conversation?.rootSessionId&&(s.conversation.rootSessionId!==De.rootSessionId||De.scope!=="voice-session"&&s.conversation.historyGeneration!==De.generation))return!1;let Zt=s.conversationHistory;if(R.cursor&&(!Zt||Zt.generation!==De.generation||Zt.rootSessionId!==De.rootSessionId))return!1;let Io=new Map(De.items.map(vt=>[vt.id,vt]));if(R.cursor)for(let vt of Zt.items)Io.set(vt.id,vt);if(s.conversation?.rootSessionId===De.rootSessionId)for(let vt of s.conversation?.items??[])Io.set(vt.id,vt);let Un=[...Io.values()].sort((vt,Nr)=>vt.at-Nr.at),Mo=R.cursor?Un.slice(0,4e3):Un.slice(-4e3),ts=Mo.reduce((vt,Nr)=>vt+Nr.text.length,0),ns=Un.length>4e3;for(;ts>4*1024*1024;)ts-=(R.cursor?Mo.pop():Mo.shift()).text.length,ns=!0;return E({conversationHistory:{...De,items:Mo,truncated:De.truncated||ns||!!(R.cursor&&Zt?.truncated)},conversationHistoryFor:x}),!0}catch(De){return H===i&&E({conversationHistoryError:String(De?.message??De)}),!1}finally{H===i&&E({conversationHistoryLoading:!1})}}if(_==="apply-model-install"&&["save-models","save-tts"].some(H=>a.has(H)))return E({error:"\u8BF7\u5148\u4FDD\u5B58\u6216\u653E\u5F03\u6A21\u578B\u8BBE\u7F6E\u8349\u7A3F\uFF0C\u518D\u5207\u6362\u6A21\u578B\u3002"}),!1;if(_==="read-audio-devices")return bn(x);if(_==="inspect-performance")return Cr(x);if(_==="cancel-tts"){if(K)return kt();try{let H=await Oe(x,{action:_});return E({ttsPreview:H,ttsPreviewFor:x}),H.status==="unconfirmed"?(oe({uncertain:!0,error:"\u65E0\u6CD5\u786E\u8BA4\u6717\u8BFB\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B\u3002"}),!1):!0}catch(H){return oe({error:String(H?.message??H),uncertain:!0}),!1}}let Q=_==="disable"&&f&&!m;if(s.busy&&!Q||s.ttsCancelling||_==="disable"&&s.voiceStopUnconfirmed||s.settingsConflict&&mo.includes(_)||s.agentPermissionUncertain&&_==="save-agent-permissions"||s.agentRequestUncertain&&_==="decide-agent-request"||s.ttsUncertain&&!fn.includes(_)&&_!=="disable")return!1;let ge=_==="disable"&&s.checkedFor===x&&(s.status?.enabled||s.status?.ownerSessionId||s.status?.voiceSession?.recovery?.kind==="live-root-conflict");if(s.visibilityUncertain&&!fn.includes(_)&&!ge||s.outputVolumeUncertain&&_==="set-output-volume"||s.installerUncertain&&["start-model-install","control-model-install","apply-model-install"].includes(_))return!1;if(!x&&(x!==null||!ju.has(_)))return E({error:"\u6B64\u64CD\u4F5C\u9700\u8981\u4F1A\u8BDD\u6765\u6E90"}),!1;let Re;if(Q&&(f.stale=!0,jt.has(f.action)&&f.abort.abort(),Re=m=Symbol("diagnostic-stop")),!fn.includes(_)){xn();for(let H of jt)Tt(H)}(mo.includes(_)||fo.includes(_)&&_!=="status")&&Ot({clear:_!=="set-performance-mode"});let Se;(Th.includes(_)||jt.has(_))&&(Se={id:x,action:_,abort:new AbortController,stale:!1},X?v.set(_,Se):f=Se),X||(b++,E({busy:!0,error:null,..._==="enable"?{enableError:null}:{},..._==="save-bindings"?{bindingError:null}:{},interruptibleRead:f?.action??null,diagnosticStopPending:!!m,..._==="listen-mode"?{listenModePending:R.mode,listenModeBefore:s.conversation?.helper?.listenMode??s.status?.listenMode}:{},..._!=="status"&&fo.includes(_)?{listenModeError:!1}:{}}));let nt,Ue=M,St=po(s.status),Dt=s.checkedFor,It=he;try{if(Se?.stale)return!1;let H;if(["read-output-volume","set-output-volume"].includes(_)){if(!k)throw new Error("\u8BED\u97F3\u8F93\u51FA\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let _e=Se?.abort??new AbortController;le.add(_e);let Qe;try{let De=_==="read-output-volume"?k.readVolume(x,_e.signal):k.setVolume(x,R,_e.signal),Zt=_==="read-output-volume"?await Promise.race([De,new Promise((Io,Un)=>{Qe=()=>Un(new Error("Read cancelled")),_e.signal.addEventListener("abort",Qe,{once:!0})})]):await De;H=Ht("output-volume",Zt)}finally{_e.signal.removeEventListener("abort",Qe),le.delete(_e)}}else{if(_==="preview-tts"&&(nt={id:x,abort:new AbortController,cancelled:!1},K=nt,E({ttsPreview:{status:"preparing"},ttsPreviewFor:x})),jt.has(_)){let _e,Qe=new Promise((De,Zt)=>{_e=()=>Zt(new Error("Read cancelled")),Se.abort.signal.addEventListener("abort",_e,{once:!0})});try{H=await Promise.race([Oe(x,{...R,action:_},Se.abort.signal),Qe])}finally{Se.abort.signal.removeEventListener("abort",_e)}}else H=await Oe(x,{...R,action:_},nt?.abort.signal??Se?.abort.signal);if(Se?.stale)return!1}if(!I)return!fn.includes(_);if(Se?.stale)return!1;if(Ue!==M)return fn.includes(_)?!1:(Fe({settings:!0,force:!0}),!0);if(jt.has(_)&&Tt(_),["agent-permissions","save-agent-permissions"].includes(_)&&E({agentPermissions:H,agentPermissionsFor:x,agentPermissionUncertain:!1}),["agent-requests","decide-agent-request"].includes(_)&&(E({agentRequests:H,agentRequestsFor:x,agentRequestUncertain:!1}),_==="decide-agent-request"&&H.lastOutcome?.state==="completed"&&(E({checkedFor:null}),Fe({settings:!0,force:!0})),_==="decide-agent-request"&&H.lastOutcome?.state==="unknown"&&E({uncertain:!0,error:"\u64CD\u4F5C\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u5148\u8BFB\u53D6\u5B9E\u9645\u72B6\u6001\uFF0C\u4E0D\u8981\u91CD\u8BD5\u3002"})),fo.includes(_)){if(_==="listen-mode"){if(z!==x||Ue!==M)return!1;if(H.listenMode!==R.mode)throw new Error("\u8BF4\u8BDD\u65B9\u5F0F\u7684\u56DE\u6267\u5C1A\u672A\u786E\u8BA4")}if(Ue!==M)return!0;if(["status","disable"].includes(_)&&H.ttsRuntime){let De=!!(H.ttsRuntime.blocked||s.ttsUncertain&&(H.ttsRuntime.busy||It!==he));H.ttsRuntime.blocked&&he++,E({ttsUncertain:De}),!De&&!H.ttsRuntime.busy&&!q&&K?.cancelled&&(K=null)}let _e=s.visibilityUncertain&&!(_==="status"&&s.visibilityReadbackFor===x),Qe=Object.hasOwn(H,"existingVoiceSession");!Qe&&Object.hasOwn(s.status??{},"existingVoiceSession")&&(H={...H,existingVoiceSession:s.status.existingVoiceSession,existingVoiceSessionSupported:s.status.existingVoiceSessionSupported}),E({status:H,checkedFor:x,uncertain:_e,visibilityUncertain:_e,..._e?{}:{visibilityReadbackFor:null},...X?{error:null}:{},...z===x?{sourcePending:!1}:{},...["status","disable"].includes(_)?{voiceStopUnconfirmed:!1}:{},..._==="status"&&Qe?{existingSessionUnconfirmed:!1}:{},..._==="listen-mode"?{listenModeReceiptRevision:s.conversation?.revision??null}:{}}),$e&&(!H.enabled||H.existingVoiceSession?.sessionId!==$e.sessionId)&&ut(),["predecessor-cleanup-pending","helper-cleanup-pending"].includes(H.voiceSession?.recovery?.kind)?Qi(x):xn()}if(id.includes(_)&&(_!=="read-settings"&&Ue===M&&(a.delete(_),E({settingsDraftActions:[...a]})),_==="read-settings"&&a.size>0&&s.settingsFor===x&&s.settings?.revision!==H.revision?(l=H,E({settingsConflict:!0})):(l=null,E({settings:H,settingsFor:x,settingsConflict:!1,settingsKey:a.size>0?s.settingsKey:H.revision})),H.onboarding&&Tt("setup-status"),E({...H.onboarding?{setupStatus:H.onboarding,setupError:null}:{},..._==="read-settings"&&s.visibilityUncertain&&["hidden","workspace"].includes(H.voiceSession?.visibility)?{visibilityReadbackFor:x}:{}})),_==="read-settings"&&s.visibilityUncertain&&Je(x,"status"),_==="conversation-models"&&E({conversationModels:H,conversationModelsFor:x,conversationModelsError:null}),_==="inspect-tts"&&E({ttsCapabilities:H,ttsCapabilitiesFor:x}),_==="save-tts"&&H.ttsSetup?.provider==="deepseek"&&H.ttsSetup.deepseekTextTransmissionAccepted&&!s.authorization?.scopes?.some(_e=>_e.id==="deepseek-text"&&_e.allowed)&&Rt(),_==="save-tts"&&H.ttsSetup?.provider==="custom"&&H.ttsSetup.customTts?.textTransmissionAccepted&&!s.authorization?.scopes?.some(_e=>_e.id==="custom-tts-text"&&_e.allowed)&&Rt(),_==="preview-tts"&&!nt.cancelled&&E({ttsPreview:{...H,status:"completed"},ttsPreviewFor:x}),["read-output-volume","set-output-volume"].includes(_)&&E({outputVolume:H,outputVolumeFor:x,outputVolumeUncertain:!1}),["save-voice-prompt","save-conversation-model","set-visibility","set-performance-mode","save-tts","apply-model-install"].includes(_)&&(E({status:null,checkedFor:null,catalog:null,catalogFor:null}),Fe({force:!0})),_==="plan-model-install"&&E({installPlan:H,installPlanFor:x,installPlanRequest:{...R}}),_==="model-installer"&&(E({installer:H,installerFor:x,installerUncertain:!!s.installerTerminationUnconfirmed}),z===x&&!L&&(L=!0,ie(!0))),_==="inspect-model-compute"&&s.installerFor===x&&s.installer&&E({installer:{...s.installer,compute:H}}),_==="start-model-install"&&E({installPlan:null,installPlanFor:null}),_==="list"){let _e=R.cursor&&s.catalogFor===x?s.catalog?.items??[]:[];E({catalog:{...H,items:[...new Map([..._e,...H.items].map(Qe=>[Qe.id,Qe])).values()]},catalogFor:x})}return["new","resume","listen-mode"].includes(_)&&E({catalog:null}),["new","resume"].includes(_)&&z===x&&Ue===M&&(i++,E({...r,newChatFor:_==="new"&&R.expectedOwnerSessionId!==void 0?x:void 0})),_==="listen-mode"&&(s.setupOpen&&E({settingsFor:void 0}),Fe({settings:!0,force:!0})),["status","enable","disable","new","resume"].includes(_)&&z===x&&(_!=="status"||Dt!==x||St!==po(H)||S!==je()||s.conversationError)&&sn(),!0}catch(H){if(_==="listen-mode"&&(z!==x||Ue!==M)||(Se&&(H?.uncertain||/TTS_TERMINATION_UNCONFIRMED/.test(String(H?.code??"")+" "+String(H?.message??"")))&&(_==="inspect-tts"?oe({}):E({installerUncertain:!0,installerTerminationUnconfirmed:!0})),!I||Se?.stale||nt?.cancelled))return!1;if(Ue!==M)return fn.includes(_)||Fe({settings:!0,force:!0}),!1;_==="status"&&(xn(),z===x&&Ue===M&&E({sourcePending:!1})),fn.includes(_)||(D=null);let _e=$h(H);(_e==="AUTHORIZATION_REQUIRED"||_e==="USAGE_AGREEMENT_REQUIRED")&&Rt({open:!0,review:!0});let Qe=_e?.startsWith("TTS_CUSTOM_")||_e==="TTS_INVALID_AUDIO"&&s.settings?.ttsSetup?.provider==="custom"&&!R.values;if(nt&&(Qe||_e?.startsWith("TTS_DEEPSEEK_"))&&!H.uncertain){let De=_e==="TTS_DEEPSEEK_API_KEY_INVALID"?"DeepSeek \u5B98\u65B9\u6717\u8BFB\u63A5\u53E3\u62D2\u7EDD\u4E86\u672C\u6B21 API Key\uFF08401\uFF09\u3002\u8BF7\u5728 DSH \u6A21\u578B\u8BBE\u7F6E\u4E2D\u6838\u5BF9\u5F00\u653E\u5E73\u53F0 API Key\u3002":String(H?.message??H).split(`
`)[0].slice(0,256);return await kt()&&Ue===M&&E({ttsPreview:{status:"failed",provider:Qe?"custom":"deepseek",detail:De},ttsPreviewFor:x}),!1}return nt&&await kt(),_==="preview-tts"&&he++,_==="enable"&&z===x&&Ue===M&&E({enableError:String(H?.message??H)+(H?.code?" ["+H.code+"]":"")}),_==="listen-mode"&&z===x&&Ue===M&&E({listenModeError:!0}),_==="disable"&&E({voiceStopUnconfirmed:!0}),E({error:String(H?.message??H),..._==="conversation-models"?{conversationModelsError:String(H?.message??H),conversationModels:null,conversationModelsFor:x}:{},..._==="save-bindings"?{bindingError:String(H?.message??H)+(H?.code?" ["+H.code+"]":"")}:{},..._==="save-agent-permissions"?{agentPermissionUncertain:!0}:{},..._==="decide-agent-request"?{agentRequestUncertain:!0}:{},..._==="preview-tts"?{ttsPreviewFor:x,ttsUncertain:!0}:{},..._==="set-output-volume"?{outputVolumeUncertain:!0}:{},...mo.includes(_)?{uncertain:!0,visibilityUncertain:!0,visibilityReadbackFor:null}:{},...["start-model-install","control-model-install"].includes(_)?{installerUncertain:!0}:{},...fo.includes(_)?{uncertain:!0,readOnlyFailure:_==="status"&&(!s.uncertain||s.readOnlyFailure===!0)}:{}}),jt.has(_)&&Je(x,_),mo.includes(_)?(Je(x,"read-settings"),Je(x,"status")):fo.includes(_)&&_!=="status"?Je(x,"status"):_==="set-output-volume"?Je(x,"read-output-volume"):_==="save-agent-permissions"?Je(x,"agent-permissions"):_==="decide-agent-request"?Je(x,"agent-requests"):["start-model-install","control-model-install"].includes(_)&&Je(x,"model-installer"),!1}finally{v.get(_)===Se&&v.delete(_),nt&&K===nt&&!nt.cancelled&&(K=null),Se&&f===Se&&(f=null),Re&&m===Re&&(m=null),X||(b--,E({busy:b>0,interruptibleRead:f?.action??null,diagnosticStopPending:!!m,..._==="listen-mode"?{listenModePending:null}:{}})),queueMicrotask(()=>{So(),wn()})}},dispose(){if(I){M++,zr(),a.clear(),l=null,E({settingsConflict:!1,settingsDraftActions:[]}),Ot({clear:!0}),At({clear:!0}),xn(),kt(),w(),f?.abort.abort(),it(),I=!1,A++,j++,O?.(),P?.();for(let x of le)x.abort();le.clear(),fe.clear()}}},tt}function ho(e,t,n,o=12){let i=t.left+o,r=t.top+o;return{x:Math.max(i,Math.min(e.x,Math.max(i,t.right-n.width-o))),y:Math.max(r,Math.min(e.y,Math.max(r,t.bottom-n.height-o)))}}function ad(e=window){let t=null,n=null,o=null,i=null,r=null,s=null,a=null,l=null,u=null,d=()=>e.performance?.now?.()??Date.now(),p=e.matchMedia?.("(prefers-reduced-motion: reduce)"),f=()=>{l!==null&&e.cancelAnimationFrame?.(l),l=null,u&&(u=null,I("endDrag"))},m=S=>{if(l=null,!u||!t)return;if(p?.matches||t.dataset?.motion==="off"){f();return}let P=Math.max(0,S-u.time);u.time=S;let A={...i},j=!1;for(let L of["x","y"]){let K=u[L],q=(K.target-i[L])*Math.exp(-P/K.tau);A[L]=Math.abs(q)<.5?K.target:K.target-q,A[L]!==K.target&&(j=!0)}i=ho(A,r.box,r.size),v(),I("move");for(let L of["x","y"])Math.abs(i[L]-A[L])>.01&&(u[L].target=i[L]);!j||S-u.start>=2400?f():l=e.requestAnimationFrame(m)},b=(S,P)=>{t.style[S]!==P&&(t.style[S]=P)},v=()=>{b("left",`${i.x}px`),b("top",`${i.y}px`)},y=null,w=null,C="",D=()=>{let S=(t?.closest("[data-shell-overlay]")??t?.ownerDocument?.querySelector?.("[data-shell-overlay]"))?.getBoundingClientRect(),P=e.visualViewport,A=Math.max(S?.left??0,P?.offsetLeft??0),j=Math.max(S?.top??0,P?.offsetTop??0),L=Math.min(S?.right??e.innerWidth,(P?.offsetLeft??0)+(P?.width??e.innerWidth)),K=Math.min(S?.bottom??e.innerHeight,(P?.offsetTop??0)+(P?.height??e.innerHeight)),q=parseFloat(e.getComputedStyle(t).getPropertyValue("--dsh-frame-top-clearance"))||0;return{left:A,top:j+q,right:L,bottom:K}},F=S=>{if(!t)return;let P=Number.isFinite(S?.width)&&Number.isFinite(S?.height),A=P&&r?r.box:D();b("maxWidth",`${Math.max(1,A.right-A.left-24)}px`),b("maxHeight",`${Math.max(1,A.bottom-A.top-24)}px`);let j=P?S:t.getBoundingClientRect();r={box:A,size:{width:j.width,height:j.height}},i=ho(i??{x:A.right-j.width-20,y:A.bottom-j.height-20},A,j),v(),!o&&!u&&I("resize")},N=()=>{a!==null&&e.cancelAnimationFrame?.(a),a=null},W=()=>{N();let S=s;s=null,!(!o||!t||!S)&&(i=ho(S,r.box,r.size),v(),I("move"))},M=S=>{t?.dataset&&(S&&["left","right","top","bottom"].includes(S.edge)&&["preview","docked"].includes(S.phase)?(t.dataset.whaleDockEdge=S.edge,t.dataset.whaleDockPhase=S.phase):(delete t.dataset.whaleDockEdge,delete t.dataset.whaleDockPhase))},$=()=>{let S=w;w=null;try{S?.dispose()}catch{}M(null),t&&(t.style.zIndex=C)},I=S=>{try{typeof w?.[S]=="function"&&w[S]()}catch{$()}},k=()=>{if($(),!(!t||y?.version!==1||typeof y.register!="function"))try{w=y.register({id:"whale-voice",read(){let{box:S,size:P}=r;return{rect:{...i,width:P.width,height:P.height},bounds:{x:S.left+12,y:S.top+12,width:Math.max(1,S.right-S.left-24),height:Math.max(1,S.bottom-S.top-24)},collapsed:t.hasAttribute?.("data-collapsed")===!0}},apply(S){!t||!Number.isFinite(S?.x)||!Number.isFinite(S?.y)||(i=ho(S,r.box,r.size),v())},onDock:M,onFront:S=>{t&&(t.style.zIndex=S===!0?"901":"900")}}),["beginDrag","move","endDrag","resize","detach","dispose"].every(S=>typeof w?.[S]=="function")||$()}catch{$()}},z=(S=!1,P=!1)=>{S?W():(N(),s=null);let A=o;o=null,A?.target.hasPointerCapture?.(A.id)&&A.target.releasePointerCapture(A.id);let j=d(),L=A?.samples??[],K=L.at(-1),q=L[0],fe=K&&q?K.time-q.time:0,le=K?j-K.time:1/0,ee=Math.max(0,1-Math.max(0,le-24)/56),G=fe>0?(K.x-q.x)/fe*ee:0,E=fe>0?(K.y-q.y)/fe*ee:0;if(A&&P&&!p?.matches&&t?.dataset?.motion!=="off"&&typeof e.requestAnimationFrame=="function"&&Math.hypot(G,E)>.04){let V=ho({x:i.x+G*240,y:i.y+E*240},r.box,r.size),re=(ue,ye)=>({target:V[ue],tau:ye?Math.max(1,Math.abs((V[ue]-i[ue])/ye)):240});u={x:re("x",G),y:re("y",E),time:j,start:j},l=e.requestAnimationFrame(m)}else A&&I(S?"endDrag":"detach")},O=()=>{f(),z(),$(),n?.disconnect(),n=null,e.removeEventListener("resize",F),e.visualViewport?.removeEventListener("resize",F),e.visualViewport?.removeEventListener("scroll",F),t=null,r=null};return{ref(S){if(S===t||(O(),!S))return;t=S,C=S.style.zIndex||"",t.style.transitionProperty="none",n=new e.ResizeObserver(A=>{let j=A?.find?.(K=>K.target===t),L=j?.borderBoxSize?.[0]??j?.borderBoxSize;Number.isFinite(L?.inlineSize)&&Number.isFinite(L?.blockSize)&&A.every(K=>K.target===t)?F({width:L.inlineSize,height:L.blockSize}):F()}),n.observe(t);let P=t.closest("[data-shell-overlay]")??t.ownerDocument?.querySelector?.("[data-shell-overlay]");P&&n.observe(P),e.addEventListener("resize",F),e.visualViewport?.addEventListener("resize",F),e.visualViewport?.addEventListener("scroll",F),F(),k()},useLayoutService(S){return y=S,k(),()=>{y===S&&($(),y=null,F())}},activate(){f(),I("activate")},pointerDown(S,P=S.currentTarget){S.button!==0||S.pointerType&&S.pointerType!=="mouse"||!t||(f(),F(),I("beginDrag"),o={id:S.pointerId,target:P,x:S.clientX,y:S.clientY,start:{...i},samples:[{x:S.clientX,y:S.clientY,time:d()}]},P.setPointerCapture(S.pointerId),S.preventDefault())},pointerMove(S){if(!o||S.pointerId!==o.id)return;let P=d(),A=[S];try{A=[...S.getCoalescedEvents?.()??[],S]}catch{}for(let q of A){if(!Number.isFinite(q.clientX)||!Number.isFinite(q.clientY))continue;let fe=Number.isFinite(q.timeStamp)&&Number.isFinite(S.timeStamp)?Math.min(0,q.timeStamp-S.timeStamp):0,le=P+Math.max(-60,fe),ee=o.samples.at(-1);if(le<ee.time)continue;let G={x:q.clientX,y:q.clientY,time:le};le===ee.time?o.samples[o.samples.length-1]=G:o.samples.push(G)}let j=P-60;for(;o.samples.length>2&&o.samples[1].time<=j;)o.samples.shift();let L=o.samples[0],K=o.samples[1];if(K&&L.time<j&&K.time>j){let q=(j-L.time)/(K.time-L.time);o.samples[0]={x:L.x+(K.x-L.x)*q,y:L.y+(K.y-L.y)*q,time:j}}s={x:o.start.x+S.clientX-o.x,y:o.start.y+S.clientY-o.y},typeof e.requestAnimationFrame!="function"?W():a===null&&(a=e.requestAnimationFrame(W))},pointerEnd(S){S.pointerId===o?.id&&z(!["pointercancel","lostpointercapture"].includes(S.type),S.type==="pointerup")},keyDown(){},fit:F,dispose:O}}var Bi=Object.freeze({panel:320,settings:660,setup:420,collapsed:216});function cd(e=window,{onResize:t=()=>{}}={}){let n=null,o=null,i=null,r=null,s=null,a=null,l=null,u=null,d=null,p=null,f=null,m=null,b=null,v=null,y=null,w=null,C={width:0,height:0},D=e.matchMedia?.("(prefers-reduced-motion: reduce)"),F=()=>D?.matches?"off":n?.dataset.motion??"spring",N=S=>Number.parseFloat(S)||0;function W(){let S=e.visualViewport,P=(n.closest?.("[data-shell-overlay]")??n.ownerDocument?.querySelector?.("[data-shell-overlay]"))?.getBoundingClientRect(),A=Math.max(P?.left??0,S?.offsetLeft??0),j=Math.max(P?.top??0,S?.offsetTop??0),L=Math.min(P?.right??e.innerWidth,(S?.offsetLeft??0)+(S?.width??e.innerWidth)),K=Math.min(P?.bottom??e.innerHeight,(S?.offsetTop??0)+(S?.height??e.innerHeight)),q=e.getComputedStyle(n);return{width:Math.max(1,L-A-24),height:Math.max(1,Math.min((K-j)*.6,K-j-24-N(q.getPropertyValue("--dsh-frame-top-clearance")))),chrome:N(q.paddingTop)+N(q.paddingBottom)+N(q.borderTopWidth)+N(q.borderBottomWidth),horizontalChrome:N(q.paddingLeft)+N(q.paddingRight)+N(q.borderLeftWidth)+N(q.borderRightWidth),panelRadius:N(q.getPropertyValue("--dsw-radius-lg"))||12}}function M(){l!==null&&e.cancelAnimationFrame(l),l=null,d=null}function $(){!n||!p||(p.width=Math.max(1,Math.min(p.width,m.width)),p.height=Math.max(1,Math.min(p.height,m.height)),n.style.width=`${p.width.toFixed(3)}px`,n.style.height=`${p.height.toFixed(3)}px`,n.style.setProperty?.("--whale-visible-content",`${Math.max(1,p.height-m.chrome)}px`),w===null?n.style.removeProperty?.("--whale-animated-radius"):n.style.setProperty?.("--whale-animated-radius",`${w.toFixed(2)}px`),t({width:p.width,height:p.height}))}function I(S){if(l=null,!n||!f)return;let P=Math.min(.032,Math.max(.001,d===null?1/60:(S-d)/1e3));d=S;let A=y?560:F()==="firm"?420:360,j=y?47.4:F()==="firm"?41:30,L=!0;for(let K of["width","height"]){for(let q=0;q<4;q++)C[K]+=(A*(f[K]-p[K])-j*C[K])*P/4,p[K]+=C[K]*P/4;(Math.abs(f[K]-p[K])>.25||Math.abs(C[K])>1)&&(L=!1)}if(y){let K=f.height-y.height,q=Math.abs(K)>.25?Math.max(0,Math.min(1,(p.height-y.height)/K)):1,fe=b?f.height/2:m.panelRadius;w=y.radius+(fe-y.radius)*q}(L||F()==="off")&&(p={...f},C={width:0,height:0},d=null,y=w=null),$(),!L&&F()!=="off"&&(l=e.requestAnimationFrame(I))}function k(){if(!n||!o)return;m=W(),n.dataset.compactHeight=m.height<300?"true":"false";let S=n.hasAttribute("data-collapsed")&&n.dataset.collapsed!=="false";if(p&&b!==null&&S!==b){let ue=w??(b?p.height/2:m.panelRadius);y={height:p.height,radius:ue},w=ue,n.style.setProperty?.("--whale-animated-radius",`${ue.toFixed(2)}px`),C={width:0,height:0}}let P=n.dataset.view,A=n.dataset.sourcePending&&P==="home"&&v===P&&!S&&b===S?f?.height:void 0;b=S,v=P;let j=Math.min(m.width,S?Bi.collapsed:Bi[P]??Bi.panel);n.style.boxSizing="border-box",n.style.transitionProperty="none",n.style.overflow="hidden",n.style.maxWidth=`${m.width}px`,n.style.maxHeight=`${m.height}px`;let L=Math.max(1,m.height-m.chrome);o.style.width=`${Math.max(1,j-m.horizontalChrome)}px`,o.style.maxHeight=`${L}px`,o.style.overflowY="hidden",o.style.minHeight="0",n.style.setProperty?.("--whale-content-limit",`${L}px`);let K=!!o.querySelector?.('[data-size-detail="true"]'),q=S?null:P==="setup"?o.querySelector?.("[data-whale-intrinsic]"):P==="home"&&!K?o.querySelector?.("[data-home-controls]"):null,fe=q?.querySelector?.("[data-whale-natural-content]"),le=fe??q;P==="setup"&&!S&&(o.style.height="auto"),le!==a&&(s?.disconnect(),u!==null&&e.cancelAnimationFrame(u),u=null,s=null,a=le,a&&e.ResizeObserver&&(s=new e.ResizeObserver(()=>{u===null&&(u=e.requestAnimationFrame(()=>{u=null,k()}))}),s.observe(a)));let ee=q?.getBoundingClientRect?.().height,G=fe?Math.max(0,fe.offsetHeight-fe.parentElement.clientHeight):0,E=ee+G,V=S?44:E>0?Math.ceil(E+m.chrome):P==="home"?K?520:320:480,re=Math.min(m.height,A??V);(P!=="setup"||S)&&(o.style.height=`${Math.max(1,re-m.chrome)}px`),f={width:j,height:re},!p||F()==="off"?(M(),p={...f},C={width:0,height:0},y=w=null,$()):l===null&&(Math.abs(p.width-j)>.25||Math.abs(p.height-re)>.25)&&(d=e.performance?.now?.()??null,l=e.requestAnimationFrame(I))}function z(){M(),i?.disconnect(),r?.disconnect(),s?.disconnect(),u!==null&&e.cancelAnimationFrame(u),u=null,s=a=null,e.removeEventListener("resize",k),e.visualViewport?.removeEventListener("resize",k),e.visualViewport?.removeEventListener("scroll",k),D?.removeEventListener?.("change",k),i=r=null}function O(){if(z(),!(!n||!o)){if(e.ResizeObserver){i=new e.ResizeObserver(k);let S=n.closest?.("[data-shell-overlay]")??n.ownerDocument?.querySelector?.("[data-shell-overlay]");S&&i.observe(S)}e.MutationObserver&&(r=new e.MutationObserver(k),r.observe(n,{attributes:!0,attributeFilter:["data-view","data-motion","data-collapsed","data-source-pending"]}),r.observe(o,{attributes:!0,attributeFilter:["data-size-detail","data-home-layout"],subtree:!0})),e.addEventListener("resize",k),e.visualViewport?.addEventListener("resize",k),e.visualViewport?.addEventListener("scroll",k),D?.addEventListener?.("change",k),k()}}return{ref(S){n!==S&&(n=S,p=f=b=v=y=w=null,C={width:0,height:0},O())},contentRef(S){o!==S&&(o=S,O())},update:k,dispose(){z(),n=o=p=f=null}}}var ld=["spring","firm","off"];function ud(e=window){let t="dsh-whale-voice:motion:v1",n="dsh-whale-voice:assistant-name:v1",o=()=>{try{let u=e.localStorage.getItem(n)?.trim();return u&&u.length<=40?u:null}catch{return null}},i=new Set,r=()=>{try{let u=e.localStorage.getItem(t);return ld.includes(u)?u:"spring"}catch{return"spring"}},s={motion:r(),assistantName:o(),error:null},a=u=>{s=u;for(let d of i)d()},l=u=>{[t,n,null].includes(u.key)&&a({motion:r(),assistantName:o(),error:null})};return e.addEventListener("storage",l),{getSnapshot:()=>s,subscribe(u){return i.add(u),()=>i.delete(u)},setMotion(u){if(!ld.includes(u))return!1;let d=null;try{e.localStorage.setItem(t,u)}catch{d="storage-unavailable"}return a({...s,motion:u,error:d}),!d},setAssistantName(u){if(typeof u!="string"||!u.trim()||u.trim().length>40)return!1;let d=u.trim(),p=null;try{e.localStorage.setItem(n,d)}catch{p="storage-unavailable"}return a({...s,assistantName:d,error:p}),!p},dispose(){e.removeEventListener("storage",l),i.clear()}}}var Oh='button,input,textarea,select,a,label,summary,[role="button"],[role="slider"],[role="tab"],[contenteditable="true"],[data-no-drag]';function dd(e,t){if(!e||!t?.contains(e))return!1;let n=e.closest?.(Oh);return!n||n.hasAttribute("data-drag-surface")}function pd(e){if(e.repeat||e.metaKey)return null;let t=e.code;return!/^(F([1-9]|1[0-9]|2[0-4])|Key[A-Z]|Digit[0-9]|Space)$/.test(t)||e.altKey&&t==="F4"?null:{code:t,modifiers:[e.ctrlKey&&"Control",e.altKey&&"Alt",e.shiftKey&&"Shift"].filter(Boolean)}}var pr=()=>({revision:0,rootSessionId:null,title:null,latest:null,items:[],inputActive:!1,inputError:null,playbackConfirmed:!1}),Fi=()=>({schema:1,hardware:null,compute:{schema:1,default:"cpu",observedAt:null,backends:{},reason:"\u5C1A\u672A\u68C0\u6D4B\u672C\u5730\u8BA1\u7B97\u540E\u7AEF\u3002"},models:[],jobs:[]});async function md(e,t=()=>{}){let n=await e.remote.$mount(Gu),o,i;try{if(i=e.inject(["remote","remote.whaleConversation"],d=>{o=d.remote.whaleConversation}),await i.await(),!o)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA")}catch(d){throw await i?.dispose(),await n(),d}let r=new Set,s=new Map,a=!1,l=d=>{if(d?.ok!==!0)throw d?.error??new Error("\u8BED\u97F3\u63A5\u53E3\u54CD\u5E94\u65E0\u6548");return d.value},u=async(d,p,f=!0)=>{let m;try{m=await d()}catch(b){throw f&&!a&&t("ui-request","finished",p?.aborted?"cancelled":"failed"),b}return f&&m?.ok!==!0&&m?.error==null&&!p?.aborted&&t("ui-render-error","finished","failed"),l(m)};return{subscribeUpdates(d,p){let f=new AbortController;return r.add(f),Promise.resolve().then(async()=>{if(!f.signal.aborted)try{for await(let m of o.followUpdates(f.signal))f.signal.aborted||d(m);f.signal.aborted||(t("ui-stream","finished","failed"),p())}catch{f.signal.aborted||(t("ui-stream","finished","failed"),p())}finally{r.delete(f)}}),()=>{f.abort(),r.delete(f)}},updateAction(d,p){if(a)throw new Error("\u66F4\u65B0\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.updateAction(d,p),p)},subscribePresentation(d,p){let f=new AbortController;return r.add(f),(async()=>{try{for await(let m of o.followPresentation(f.signal))f.signal.aborted||d(m);f.signal.aborted||(t("ui-stream","finished","failed"),p(new Error("\u4F1A\u8BDD\u663E\u793A\u8FDE\u63A5\u5DF2\u7ED3\u675F")))}catch(m){f.signal.aborted||(t("ui-stream","finished","failed"),p(m))}finally{r.delete(f)}})(),()=>{f.abort(),r.delete(f)}},subscribe(d,p,f=()=>{}){let m=new AbortController;return r.add(m),p(pr(),{initial:!0}),(async()=>{try{for await(let b of o.follow(d,m.signal))m.signal.aborted||p(b);m.signal.aborted||(t("ui-stream","finished","failed"),p(pr(),{initial:!0}),f(new Error("\u8BED\u97F3\u72B6\u6001\u8FDE\u63A5\u5DF2\u7ED3\u675F\uFF0C\u6B63\u5728\u91CD\u65B0\u8FDE\u63A5")))}catch(b){m.signal.aborted||(t("ui-stream","finished","failed"),p(pr(),{initial:!0}),f(b))}finally{r.delete(m)}})(),()=>{m.abort(),r.delete(m),p(pr(),{initial:!0})}},subscribeModels(d,p,f=()=>{}){if(a)return p(Fi(),{initial:!0}),f(new Error("\u6A21\u578B\u8FDB\u5EA6\u63A5\u53E3\u5DF2\u5378\u8F7D")),()=>{};let m=new AbortController,b=!1,v=()=>{b||(b=!0,m.abort(),s.delete(m),p(Fi(),{initial:!0}))};return s.set(m,v),p(Fi(),{initial:!0}),(async()=>{try{for await(let y of o.followModels(d,m.signal))!b&&!a&&!m.signal.aborted&&p(y);!b&&!a&&!m.signal.aborted&&(t("ui-stream","finished","failed"),v(),f(new Error("\u6A21\u578B\u8FDB\u5EA6\u8FDE\u63A5\u5DF2\u7ED3\u675F\uFF0C\u6B63\u5728\u91CD\u65B0\u8FDE\u63A5")))}catch(y){!b&&!a&&!m.signal.aborted&&(t("ui-stream","finished","failed"),v(),f(y))}finally{s.delete(m)}})(),v},async action(d,p,f){if(a)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");let m=await u(()=>o.action(d,p,f),f);try{let b=JSON.parse(m);if(b?.protocol!==1||b.action!==p.action||!b.value||typeof b.value!="object"||Array.isArray(b.value))throw new Error("Fish Voice UI protocol mismatch");return b.value}catch(b){throw t("ui-render-error","finished","failed"),b}},readAuthorization:d=>u(()=>o.readAuthorization(d),d),saveAuthorization:(d,p)=>u(()=>o.saveAuthorization(d,p),p),async senseVoiceAsrAction(d,p){if(a)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.senseVoiceAsrAction(d,p),p)},async manageSessions(d,p,f){if(a)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");return JSON.parse(await u(()=>o.manageSessions(d,p,f),f))},listExistingVoiceSessions(d,p){if(a)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.listExistingVoiceSessions(d,p),p)},setExistingVoiceSession(d,p){if(a)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.setExistingVoiceSession(d,p),p)},retryVoiceTranscript(d,p){if(a)throw new Error("\u8BED\u97F3\u91CD\u53D1\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.retryVoiceTranscript(d,p),p)},readClientOperationScope(d){if(a)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.readClientOperationScope(d),d,!1)},recordClientOperations(d,p){if(a)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.recordClientOperations(d,p),p,!1)},readOperationLog(d,p){if(a)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.readOperationLog(d,p),p,!1)},readSetup:d=>u(()=>o.readSetup(d),d),readVolume:(d,p)=>u(()=>o.readVolume(d,p),p),setVolume:(d,p,f)=>u(()=>o.setVolume(d,p,f),f),async dispose(){a=!0;for(let d of[...s.values()])d();s.clear();for(let d of r)d.abort();r.clear(),await i.dispose(),await n()}}}var gd=new Set(ar),vd=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,fd=256,Ui="dsh-fish-voice.pending-operation-log.v1",Li="ui-buffer-overflow";function Rh(){let e=globalThis.crypto;if(e?.randomUUID)return e.randomUUID();let t=e?.getRandomValues(new Uint8Array(16));if(!t)return null;t[6]=t[6]&15|64,t[8]=t[8]&63|128;let n=Array.from(t,o=>o.toString(16).padStart(2,"0")).join("");return[n.slice(0,8),n.slice(8,12),n.slice(12,16),n.slice(16,20),n.slice(20)].join("-")}function Dh(){try{return globalThis.sessionStorage}catch{return}}function hd(e,t=!1){if(!e||typeof e.id!="string"||!vd.test(e.id)||!Number.isSafeInteger(e.at)||e.at<0||!gd.has(e.action)||!["user","ui"].includes(e.source)||t!==(e.action===Li)||t&&(e.source!=="ui"||!Number.isSafeInteger(e.count)||e.count<1))return null;let{id:n,at:o,action:i,source:r}=e;return{id:n,at:o,action:i,source:r,...t?{count:e.count}:{},...["requested","finished"].includes(e.phase)?{phase:e.phase}:{},...["ok","failed","cancelled"].includes(e.result)?{result:e.result}:{}}}function bd({schedule:e=setTimeout,unschedule:t=clearTimeout,now:n=Date.now,identify:o=Rh,storage:i=Dh()}={}){let r=[],s=null,a=null,l=null,u=!1,d,p,f,m=0,b=!1,v=()=>{p!==void 0&&(t(p),p=void 0)},y=k=>k&&k.at>=n()-Du,w=()=>{r=r.filter(y),y(s)||(s=null),y(a)||(a=null)},C=()=>r.length>0||s!==null||a!==null,D=()=>{if(!(!l||!i))try{C()?i.setItem(Ui,JSON.stringify({scope:l,pending:r,overflow:s,dropped:a})):i.removeItem(Ui)}catch{}},F=(k,z)=>{a={count:Math.min(Number.MAX_SAFE_INTEGER,(a?.count??0)+k),at:Math.max(a?.at??0,z)}},N=k=>{r.length>=fd?F(1,k.at):r.push(k)},W=k=>{if(l===null){let z;try{z=JSON.parse(i?.getItem(Ui)??"null")}catch{}if(z?.scope===k){let O=r,S=a,P=Array.isArray(z.pending)?z.pending.slice(0,fd).map(A=>hd(A)).filter(y):[];r=[...new Map(P.map(A=>[A.id,A])).values()],s=hd(z.overflow,!0),a=z.dropped&&Number.isSafeInteger(z.dropped.count)&&z.dropped.count>0&&Number.isSafeInteger(z.dropped.at)&&y(z.dropped)?{count:z.dropped.count,at:z.dropped.at}:null,S&&F(S.count,S.at);for(let A of O)y(A)&&N(A)}}else l!==k&&(r=[],s=null,a=null);l=k,u=!0,w(),D()},M=(k=160)=>{b||f||p!==void 0||u&&!C()||!d?.readClientOperationScope||!d?.recordClientOperations||(p=e(()=>{p=void 0,$()},k),p?.unref?.())};async function $(){let k=new AbortController,z=d;f=k;let O=()=>!b&&d===z&&f===k;try{let S=AbortSignal.any([k.signal,AbortSignal.timeout(1e4)]);if(!u){let L=await z.readClientOperationScope(S);if(!O())return;if(typeof L?.scope!="string"||!vd.test(L.scope))throw new Error("Operation scope unavailable");W(L.scope)}if(w(),!s&&a){let L=o();L&&(s={id:L,at:a.at,action:Li,source:"ui",phase:"finished",count:a.count},a=null)}D();let P=s?[s,...r.slice(0,lo-1)]:r.slice(0,lo);if(!P.length)return;let A=await z.recordClientOperations({scope:l,events:P},S);if(!O())return;if(A?.accepted!==!0)throw new Error("Operation batch was not accepted");let j=new Set(P.map(L=>L.id));r=r.filter(L=>!j.has(L.id)),s&&j.has(s.id)&&(s=null),m=0,D()}catch{O()&&(u=!1,m++)}finally{O()&&(f=void 0,M(m?Math.min(3e4,750*2**Math.min(m-1,6)):160))}}function I(k,z,O,S){if(b||!gd.has(k)||k===Li)return;let P;try{P=o()}catch{return}P&&(w(),N({id:P,at:n(),action:k,source:z,...O?{phase:O}:{},...S?{result:S}:{}}),D(),M())}return{user(k){I(k,"user")},internal(k,z,O){I(k,"ui",z,O)},attach(k){d===k||b||(v(),f?.abort(),f=void 0,d=k,u=!1,m=0,M(0))},dispose(){b=!0,v(),f?.abort(),r=[],s=null,a=null}}}var qd=require("react-dom");var He=require("react"),mr=require("@deepseek-ai/dsh-client-ui-primitives");var h={quickActions:"tIM0vW_quickActions",whalePageEnter:"tIM0vW_whalePageEnter",conversationChoice:"tIM0vW_conversationChoice",settingsNav:"tIM0vW_settingsNav",audioDevices:"tIM0vW_audioDevices",currentModel:"tIM0vW_currentModel",motionPreview:"tIM0vW_motionPreview",capabilityRow:"tIM0vW_capabilityRow",assistantName:"tIM0vW_assistantName",existingSessionList:"tIM0vW_existingSessionList",homeTargetRow:"tIM0vW_homeTargetRow",guideButton:"tIM0vW_guideButton",placeholder:"tIM0vW_placeholder",disclosureRow:"tIM0vW_disclosureRow",messageName:"tIM0vW_messageName",deviceSelect:"tIM0vW_deviceSelect",header:"tIM0vW_header",keyBinding:"tIM0vW_keyBinding",notice:"tIM0vW_notice",volumeRow:"tIM0vW_volumeRow",panelContent:"tIM0vW_panelContent",sliderLabel:"tIM0vW_sliderLabel",settingsBrand:"tIM0vW_settingsBrand",inlineActions:"tIM0vW_inlineActions",sessionTitle:"tIM0vW_sessionTitle",inputCaptions:"tIM0vW_inputCaptions",settingsBody:"tIM0vW_settingsBody",backIcon:"tIM0vW_backIcon",statusRow:"tIM0vW_statusRow",whaleFeedback:"tIM0vW_whaleFeedback",ellipsis:"tIM0vW_ellipsis",note:"tIM0vW_note",voicePromptInput:"tIM0vW_voicePromptInput",whaleBreathe:"tIM0vW_whaleBreathe",conversationHeader:"tIM0vW_conversationHeader",quickSegments:"tIM0vW_quickSegments",recentMessages:"tIM0vW_recentMessages",error:"tIM0vW_error",conversationOptions:"tIM0vW_conversationOptions",loadHistory:"tIM0vW_loadHistory",spin:"tIM0vW_spin",editNotice:"tIM0vW_editNotice",openOriginal:"tIM0vW_openOriginal",quickConversation:"tIM0vW_quickConversation",modelNav:"tIM0vW_modelNav",message:"tIM0vW_message",formActions:"tIM0vW_formActions",inputCaption:"tIM0vW_inputCaption",settingsPage:"tIM0vW_settingsPage",settings:"tIM0vW_settings",inputCaptionText:"tIM0vW_inputCaptionText",authorization:"tIM0vW_authorization",existingSessionSearch:"tIM0vW_existingSessionSearch",panelViewport:"tIM0vW_panelViewport",voiceBars:"tIM0vW_voiceBars",homeTargetPicker:"tIM0vW_homeTargetPicker",voicePromptMode:"tIM0vW_voicePromptMode",quickSpeedHeader:"tIM0vW_quickSpeedHeader",pageHeading:"tIM0vW_pageHeading",segmented:"tIM0vW_segmented",fullName:"tIM0vW_fullName",audioDeviceHint:"tIM0vW_audioDeviceHint",authorizationActions:"tIM0vW_authorizationActions",existingSessionPicker:"tIM0vW_existingSessionPicker",historyScope:"tIM0vW_historyScope",details:"tIM0vW_details",voicePromptCount:"tIM0vW_voicePromptCount",existingSessionHome:"tIM0vW_existingSessionHome",mainAction:"tIM0vW_mainAction",quickSpeed:"tIM0vW_quickSpeed",whaleEnter:"tIM0vW_whaleEnter",authorizationBody:"tIM0vW_authorizationBody",inputCaptionReceipt:"tIM0vW_inputCaptionReceipt",caption:"tIM0vW_caption",newChatButton:"tIM0vW_newChatButton",audioDeviceField:"tIM0vW_audioDeviceField",whalePreview:"tIM0vW_whalePreview",markSmall:"tIM0vW_markSmall",floating:"tIM0vW_floating",bindingEditor:"tIM0vW_bindingEditor",requestDetails:"tIM0vW_requestDetails",actions:"tIM0vW_actions",bubbleBrand:"tIM0vW_bubbleBrand",audioDeviceNotice:"tIM0vW_audioDeviceNotice",quickHint:"tIM0vW_quickHint",popoverHeader:"tIM0vW_popoverHeader",brand:"tIM0vW_brand",inlineField:"tIM0vW_inlineField",audioDeviceGrid:"tIM0vW_audioDeviceGrid",keyBindingRow:"tIM0vW_keyBindingRow",backButton:"tIM0vW_backButton",permissionList:"tIM0vW_permissionList",mark:"tIM0vW_mark",whaleSpin:"tIM0vW_whaleSpin",updateAnnouncement:"tIM0vW_updateAnnouncement",existingSessionTarget:"tIM0vW_existingSessionTarget",radios:"tIM0vW_radios",iconButton:"tIM0vW_iconButton",authorizationSteps:"tIM0vW_authorizationSteps",voicePrompt:"tIM0vW_voicePrompt",headerActions:"tIM0vW_headerActions",modelHeading:"tIM0vW_modelHeading",voicePromptActions:"tIM0vW_voicePromptActions",newMessages:"tIM0vW_newMessages",bubble:"tIM0vW_bubble",updateHeader:"tIM0vW_updateHeader",status:"tIM0vW_status",hint:"tIM0vW_hint",whaleInputPulse:"tIM0vW_whaleInputPulse",performanceChoice:"tIM0vW_performanceChoice",popover:"tIM0vW_popover",field:"tIM0vW_field",section:"tIM0vW_section",updateDialog:"tIM0vW_updateDialog",agreement:"tIM0vW_agreement",currentDshTarget:"tIM0vW_currentDshTarget",pathRow:"tIM0vW_pathRow",settingsLayout:"tIM0vW_settingsLayout",voiceTarget:"tIM0vW_voiceTarget",bubbleStatus:"tIM0vW_bubbleStatus",bindingActions:"tIM0vW_bindingActions",currentDshAction:"tIM0vW_currentDshAction",sessionRename:"tIM0vW_sessionRename",assistantNameInput:"tIM0vW_assistantNameInput",primary:"tIM0vW_primary",mouseBinding:"tIM0vW_mouseBinding",volumeControl:"tIM0vW_volumeControl",voiceStatus:"tIM0vW_voiceStatus",settingsHeader:"tIM0vW_settingsHeader",text:`.tIM0vW_floating {
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

[data-ds-dark-theme] .tIM0vW_floating {
  --whale-solid-base: var(--dsw-static-neutral-bluish-950, #181a1e);
}

.tIM0vW_floating[data-collapsed] {
  border-radius: var(--whale-animated-radius, 999px);
  corner-shape: round;
  width: 216px;
  padding: 4px;
}

.tIM0vW_floating[data-view="settings"] {
  width: 660px;
  padding: 0;
}

.tIM0vW_floating[data-view="setup"]:not([data-collapsed]) {
  width: 420px;
}

.tIM0vW_floating:active {
  cursor: grabbing;
}

.tIM0vW_floating[data-whale-dock-phase="preview"] {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

.tIM0vW_floating [hidden] {
  display: none !important;
}

.tIM0vW_floating [data-no-drag] {
  cursor: auto;
  touch-action: pan-y;
}

.tIM0vW_panelViewport {
  overscroll-behavior: contain;
  min-width: 0;
  min-height: 0;
  overflow-x: hidden;
}

.tIM0vW_panelContent {
  min-width: 0;
  animation: tIM0vW_whaleEnter var(--whale-duration) var(--whale-ease);
}

.tIM0vW_mark {
  flex: none;
  width: 24px;
  height: 24px;
}

.tIM0vW_markSmall {
  flex: none;
  width: 20px;
  height: 20px;
}

.tIM0vW_brand, .tIM0vW_header, .tIM0vW_headerActions, .tIM0vW_actions, .tIM0vW_statusRow, .tIM0vW_caption {
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.tIM0vW_brand {
  font-size: 15px;
}

.tIM0vW_header {
  justify-content: space-between;
  margin-bottom: 12px;
}

.tIM0vW_headerActions {
  gap: 2px;
}

.tIM0vW_actions {
  flex-wrap: wrap;
}

.tIM0vW_iconButton {
  flex: none;
  width: 32px;
  min-width: 32px;
  height: 32px;
  padding: 0;
}

.tIM0vW_newChatButton {
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

.tIM0vW_newChatButton svg {
  width: 14px;
  height: 14px;
}

.tIM0vW_ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
}

.tIM0vW_statusRow {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  margin-bottom: 10px;
  padding: 4px 6px;
}

.tIM0vW_statusRow[data-recording] {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 19%,var(--dsw-alias-bg-module-platform));
}

.tIM0vW_statusRow[data-recording] .tIM0vW_voiceStatus > svg {
  color: var(--dsw-alias-brand-primary);
}

.tIM0vW_status {
  flex: 1;
  min-width: 0;
  margin: 0;
  font-size: 12px;
  line-height: 18px;
}

.tIM0vW_voiceTarget {
  flex: 1;
  align-items: center;
  gap: 4px;
  min-width: 0;
  line-height: 18px;
  display: flex;
}

.tIM0vW_voiceTarget > span, .tIM0vW_existingSessionHome > span {
  color: var(--dsw-alias-label-secondary);
  flex: none;
  font-size: 11px;
}

.tIM0vW_voiceTarget strong {
  font-size: 13px;
  font-weight: 600;
}

.tIM0vW_voiceStatus {
  align-items: center;
  gap: 4px;
  max-width: 47%;
  display: flex;
}

.tIM0vW_voiceStatus > svg {
  flex: none;
  width: 14px;
  height: 14px;
}

.tIM0vW_statusRow[data-bound] {
  flex-direction: column;
  align-items: stretch;
  gap: 0;
}

.tIM0vW_statusRow[data-bound] .tIM0vW_voiceStatus {
  max-width: 100%;
}

.tIM0vW_mainAction {
  width: 100%;
  min-height: 36px;
  font-weight: 500;
}

.tIM0vW_primary {
  color: var(--dsw-alias-label-primary) !important;
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 16%,var(--dsw-alias-bg-layer-2)) !important;
  border: 1px solid var(--dsw-alias-border-l2) !important;
}

.tIM0vW_bubble {
  corner-shape: round;
  cursor: grab;
  touch-action: none;
  width: 100%;
  max-width: 100%;
  height: 36px;
  animation: tIM0vW_whaleEnter var(--whale-duration) var(--whale-ease);
  border-radius: 999px;
  justify-content: flex-start;
  gap: 8px;
}

.tIM0vW_bubble .tIM0vW_ellipsis {
  text-align: left;
  flex: 1;
}

.tIM0vW_caption {
  text-align: left;
  justify-content: flex-start;
  width: 100%;
  margin-top: 8px;
  padding: 6px 0;
  font-size: 12px;
}

.tIM0vW_caption .tIM0vW_ellipsis {
  flex: 1;
}

.tIM0vW_openOriginal {
  flex: none;
}

.tIM0vW_hint, .tIM0vW_quickHint {
  color: var(--dsw-alias-label-secondary);
  overflow-wrap: anywhere;
  font-size: 12px;
}

.tIM0vW_hint {
  margin: 6px 0;
}

.tIM0vW_quickHint {
  margin: 0;
  font-size: 11px;
}

.tIM0vW_notice, .tIM0vW_note, .tIM0vW_error {
  border-radius: var(--dsw-radius-sm);
  overflow-wrap: anywhere;
  background: var(--dsw-alias-bg-module-platform);
  margin: 8px 0;
  padding: 8px 10px;
  font-size: 12px;
}

.tIM0vW_notice, .tIM0vW_note {
  border-left: 2px solid var(--dsw-alias-state-warn-primary);
}

.tIM0vW_error {
  border-left: 2px solid var(--dsw-alias-state-error-primary);
}

.tIM0vW_error button {
  margin-top: 8px;
}

.tIM0vW_popover {
  box-sizing: border-box;
  cursor: auto;
  touch-action: auto;
  width: 100%;
  animation: tIM0vW_whaleEnter var(--whale-duration) var(--whale-ease);
  margin: 0 0 10px;
  padding: 12px;
  position: relative;
  overflow: auto;
}

.tIM0vW_popoverHeader {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  display: flex;
}

.tIM0vW_popoverHeader > button {
  width: 28px;
  padding: 0;
}

.tIM0vW_quickConversation {
  max-height: 160px;
}

.tIM0vW_recentMessages {
  gap: 6px;
  display: grid;
}

.tIM0vW_message {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  padding: 5px 8px;
}

.tIM0vW_message strong {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

.tIM0vW_message p {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  margin: 3px 0 0;
}

.tIM0vW_quickActions {
  gap: 6px;
  min-width: 0;
  display: grid;
}

.tIM0vW_quickSpeed {
  gap: 5px;
  padding-top: 4px;
  display: grid;
}

.tIM0vW_quickSpeedHeader {
  color: var(--dsw-alias-label-secondary);
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  display: flex;
}

.tIM0vW_quickSpeedHeader small {
  font-size: 11px;
}

.tIM0vW_quickSegments {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  gap: 3px;
  padding: 3px;
  display: grid;
}

.tIM0vW_quickSegments button {
  min-width: 0;
  height: 28px;
  min-height: 28px;
  padding: 0 5px;
  font-size: 12px;
}

.tIM0vW_quickSegments button[aria-pressed="true"] {
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: 0 1px 3px #0001;
}

.tIM0vW_settings {
  height: 100%;
  min-height: 0;
  color: var(--dsw-alias-label-primary);
  flex-direction: column;
  display: flex;
  overflow: hidden;
}

.tIM0vW_settingsHeader {
  box-sizing: border-box;
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 4px 10px;
  display: flex;
}

.tIM0vW_settingsHeader h2 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.tIM0vW_settingsBrand {
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 6px;
  min-width: 0;
  display: flex;
}

.tIM0vW_backButton, .tIM0vW_guideButton {
  flex: none;
  padding: 0 8px;
  font-size: 12px;
}

.tIM0vW_backIcon {
  transform: rotate(180deg);
}

.tIM0vW_settingsLayout {
  flex: 1;
  grid-template-rows: minmax(0, 1fr);
  grid-template-columns: 104px minmax(0, 1fr);
  min-height: 0;
  display: grid;
  overflow: hidden;
}

.tIM0vW_settingsNav {
  border-right: 1px solid var(--dsw-alias-border-l2);
  background: var(--dsw-alias-bg-module-platform);
  flex-direction: column;
  gap: 3px;
  min-height: 0;
  padding: 8px 6px;
  display: flex;
  overflow-y: auto;
}

.tIM0vW_settingsNav button {
  justify-content: flex-start;
  min-width: 0;
  min-height: 34px;
  padding: 0 12px;
  font-size: 12px;
}

.tIM0vW_settingsNav button[aria-pressed="true"] {
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: inset 2px 0 0 var(--dsw-alias-brand-primary);
  font-weight: 600;
}

.tIM0vW_settingsPage {
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  display: flex;
  overflow: hidden;
}

.tIM0vW_pageHeading {
  flex: none;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 10px 12px 8px;
  display: flex;
}

.tIM0vW_pageHeading h3 {
  margin: 0;
  font-size: 15px;
}

.tIM0vW_pageHeading p {
  color: var(--dsw-alias-label-secondary);
  margin: 3px 0 0;
  font-size: 12px;
}

.tIM0vW_settingsBody {
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

.tIM0vW_settingsBody > .tIM0vW_section, .tIM0vW_settingsBody > div > .tIM0vW_section {
  margin: 0 0 12px;
}

.tIM0vW_section {
  align-content: start;
  gap: 8px;
  min-width: 0;
  display: grid;
}

.tIM0vW_section h3 {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
}

.tIM0vW_section p, .tIM0vW_section > .tIM0vW_section {
  margin: 0;
}

.tIM0vW_settingsBody > .tIM0vW_section + .tIM0vW_section {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

.tIM0vW_section summary {
  cursor: pointer;
  padding: 7px 0;
  font-size: 13px;
  font-weight: 500;
}

details.tIM0vW_section {
  border-top: 1px solid var(--dsw-alias-border-l2);
  display: block;
}

details.tIM0vW_section > :not(summary) {
  margin-top: 10px;
}

.tIM0vW_field {
  gap: 6px;
  font-size: 12px;
  display: grid;
}

.tIM0vW_field input {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}

.tIM0vW_deviceSelect {
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

.tIM0vW_radios {
  border: 0;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
  margin: 0;
  padding: 0;
  display: flex;
}

.tIM0vW_radios legend {
  margin-bottom: 6px;
  font-size: 12px;
}

.tIM0vW_radios label {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  cursor: pointer;
  align-items: center;
  gap: 6px;
  padding: 6px 9px;
  font-size: 12px;
  display: flex;
}

.tIM0vW_radios input {
  accent-color: var(--dsw-alias-brand-primary);
}

.tIM0vW_bindingEditor {
  gap: 14px;
  display: grid;
}

.tIM0vW_keyBinding {
  gap: 6px;
  display: grid;
}

.tIM0vW_keyBinding > :is(h3, p) {
  margin: 0;
}

.tIM0vW_keyBindingRow {
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 12px;
  min-width: 0;
  display: flex;
}

.tIM0vW_keyBindingRow > span {
  overflow-wrap: anywhere;
  min-width: 5em;
  font-size: 13px;
}

.tIM0vW_mouseBinding legend {
  font-size: 14px;
  font-weight: 600;
}

.tIM0vW_mouseBinding label {
  white-space: nowrap;
}

.tIM0vW_bindingActions {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

.tIM0vW_segmented {
  flex-wrap: wrap;
  gap: 4px;
  display: flex;
}

.tIM0vW_segmented button {
  min-width: 0;
  font-size: 12px;
}

.tIM0vW_segmented button[aria-pressed="true"], .tIM0vW_modelNav button[aria-pressed="true"] {
  background: var(--dsw-alias-interactive-bg-active);
  color: var(--dsw-alias-label-primary);
  box-shadow: inset 0 -2px 0 var(--dsw-alias-brand-primary);
}

.tIM0vW_modelNav {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  gap: 4px;
  margin-bottom: 12px;
  padding: 0 16px 10px;
  display: flex;
}

.tIM0vW_modelNav button {
  flex: 1;
  min-width: 0;
  padding: 0 6px;
  font-size: 12px;
}

.tIM0vW_sliderLabel {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  display: flex;
}

.tIM0vW_sliderLabel span {
  margin-left: auto;
}

.tIM0vW_sliderLabel input {
  width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
}

.tIM0vW_formActions {
  padding-top: 4px;
}

.tIM0vW_formActions button {
  min-width: 100px;
}

.tIM0vW_editNotice {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 8px;
  display: flex;
}

.tIM0vW_editNotice div {
  flex: 1;
  min-width: 0;
}

.tIM0vW_editNotice strong {
  font-size: 12px;
}

.tIM0vW_editNotice p {
  color: var(--dsw-alias-label-secondary);
  margin: 3px 0 0;
  font-size: 12px;
}

.tIM0vW_editNotice button {
  flex: none;
  font-size: 12px;
}

.tIM0vW_details {
  grid-template-columns: auto minmax(0, 1fr);
  gap: 6px 12px;
  margin: 0;
  font-size: 12px;
  display: grid;
}

.tIM0vW_details dt {
  color: var(--dsw-alias-label-secondary);
}

.tIM0vW_details dd {
  overflow-wrap: anywhere;
  margin: 0;
}

.tIM0vW_capabilityRow {
  display: contents;
}

.tIM0vW_requestDetails {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  max-height: 200px;
  padding: 8px;
  font-size: 11px;
  overflow: auto;
}

.tIM0vW_placeholder {
  text-align: center;
  min-height: 140px;
  color: var(--dsw-alias-label-secondary);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  display: flex;
}

.tIM0vW_placeholder h3, .tIM0vW_placeholder p {
  margin: 0;
}

.tIM0vW_placeholder svg {
  width: 32px;
  height: 32px;
}

.tIM0vW_motionPreview {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  width: 40px;
  height: 32px;
  animation: tIM0vW_whalePreview var(--whale-duration) var(--whale-ease);
  place-items: center;
  display: grid;
}

.tIM0vW_settings a {
  color: var(--dsw-alias-link);
  text-underline-offset: 2px;
  overflow-wrap: anywhere;
}

.tIM0vW_updateDialog {
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

.tIM0vW_updateDialog::backdrop {
  background: #0005;
}

.tIM0vW_updateHeader {
  align-items: center;
  gap: 8px;
  display: flex;
}

.tIM0vW_updateHeader h2 {
  margin: 0;
  font-size: 16px;
}

.tIM0vW_updateAnnouncement {
  white-space: pre-line;
  overflow-wrap: anywhere;
}

.tIM0vW_updateDialog .tIM0vW_actions {
  margin-top: 12px;
}

.tIM0vW_updateDialog a {
  color: var(--dsw-alias-link);
  text-underline-offset: 2px;
}

.tIM0vW_authorization {
  height: auto;
  max-height: min(var(--whale-content-limit, 60vh),var(--whale-visible-content, 60vh));
}

.tIM0vW_authorization .tIM0vW_settingsHeader {
  min-height: 42px;
  padding: 0 0 10px;
}

.tIM0vW_authorization .tIM0vW_settingsHeader h2 {
  flex: 1;
  font-size: 16px;
}

.tIM0vW_authorizationBody {
  overscroll-behavior: contain;
  flex: 1;
  min-height: 0;
  padding-right: 6px;
  overflow-y: auto;
}

.tIM0vW_authorizationActions {
  border-top: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  padding: 10px 0 0;
}

.tIM0vW_authorizationBody > [data-whale-natural-content] {
  display: flow-root;
}

.tIM0vW_permissionList {
  gap: 0;
  margin: 12px 0;
  padding: 0;
  list-style: none;
  display: grid;
}

.tIM0vW_permissionList li {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  padding: 10px 0;
}

.tIM0vW_permissionList p {
  margin: 3px 0 0;
}

.tIM0vW_permissionList strong {
  font-size: 13px;
}

.tIM0vW_sessionTitle {
  overflow-wrap: anywhere;
}

.tIM0vW_sessionRename {
  gap: 6px;
  margin-top: 8px;
  display: grid;
}

.tIM0vW_existingSessionHome {
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

.tIM0vW_existingSessionHome svg {
  flex: none;
  width: 12px;
  height: 12px;
}

.tIM0vW_existingSessionHome:disabled {
  opacity: 1;
  box-shadow: none;
  cursor: default;
}

.tIM0vW_existingSessionHome:disabled > svg {
  visibility: hidden;
}

.tIM0vW_currentDshTarget {
  gap: 4px;
  min-width: 0;
  display: grid;
}

.tIM0vW_currentDshAction {
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

.tIM0vW_currentDshAction > :first-child {
  white-space: nowrap;
  flex: none;
}

.tIM0vW_currentDshAction > :last-child {
  min-width: 0;
  color: var(--dsw-alias-label-secondary);
  text-align: right;
}

.tIM0vW_currentDshTarget > p {
  margin: 0;
}

.tIM0vW_inputCaptions {
  overscroll-behavior: contain;
  min-width: 0;
  max-height: 168px;
  margin: 0;
  padding: 0 6px;
  list-style: none;
  overflow: auto;
}

.tIM0vW_inputCaption {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 6px;
  padding: 4px 0;
  display: grid;
}

.tIM0vW_inputCaption + .tIM0vW_inputCaption {
  border-top: 1px solid var(--dsw-alias-border-l2);
}

.tIM0vW_inputCaption p {
  margin: 0;
}

.tIM0vW_inputCaptionText {
  overflow-wrap: anywhere;
  white-space: pre-wrap;
  user-select: text;
  font-size: 13px;
  line-height: 18px;
}

.tIM0vW_inputCaptionReceipt {
  color: var(--dsw-alias-label-secondary);
  align-items: baseline;
  gap: 4px;
  font-size: 11px;
  line-height: 16px;
  display: flex;
}

.tIM0vW_inputCaptionReceipt > :first-child {
  flex: none;
}

.tIM0vW_inputCaption button {
  height: 26px;
  min-height: 26px;
  padding: 0 6px;
  font-size: 12px;
}

.tIM0vW_existingSessionTarget > p {
  margin: 4px 0;
}

.tIM0vW_existingSessionPicker {
  gap: 8px;
  min-width: 0;
  margin-top: 10px;
  display: grid;
}

.tIM0vW_existingSessionSearch {
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 6px;
  display: grid;
}

.tIM0vW_existingSessionSearch input::placeholder {
  color: var(--dsw-alias-label-secondary);
  opacity: 1;
}

.tIM0vW_existingSessionList {
  max-height: clamp(96px, 26vh, 224px);
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: auto;
}

.tIM0vW_existingSessionList li {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
}

.tIM0vW_existingSessionList label {
  cursor: pointer;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: start;
  gap: 6px;
  padding: 6px 4px;
  display: grid;
}

.tIM0vW_existingSessionList label:has(input:disabled) {
  cursor: default;
}

.tIM0vW_existingSessionList label:has(input:checked) {
  background: var(--dsw-alias-interactive-bg-active);
}

.tIM0vW_existingSessionList input {
  accent-color: var(--dsw-alias-brand-primary);
  margin-top: 3px;
}

.tIM0vW_existingSessionList label span.tIM0vW_hint {
  overflow-wrap: anywhere;
  margin: 3px 0 0;
  display: block;
}

.tIM0vW_performanceChoice {
  line-height: 1.1;
}

.tIM0vW_performanceChoice small {
  white-space: nowrap;
  font-size: .85em;
}

.tIM0vW_floating [data-whale-setup] {
  min-height: 0;
}

.tIM0vW_floating :is(button, input, select, textarea, summary, a) {
  touch-action: manipulation;
}

.tIM0vW_floating button {
  transition: background-color .12s, color .12s;
}

.tIM0vW_floating :is(button, input, select, summary, a):focus-visible, .tIM0vW_floating:focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

.tIM0vW_spin {
  animation: .7s linear infinite tIM0vW_whaleSpin;
}

.tIM0vW_mark[data-state="authorized"], .tIM0vW_markSmall[data-state="authorized"] {
  color: var(--dsw-alias-brand-primary);
}

.tIM0vW_mark[data-state="unknown"], .tIM0vW_markSmall[data-state="unknown"] {
  color: var(--dsw-alias-state-warn-primary);
}

.tIM0vW_mark[data-state="input-active"], .tIM0vW_markSmall[data-state="input-active"] {
  color: var(--dsw-alias-brand-primary);
  animation: 1.35s ease-in-out infinite tIM0vW_whaleBreathe;
}

.tIM0vW_mark[data-state="pending"], .tIM0vW_markSmall[data-state="pending"] {
  color: var(--dsw-alias-label-secondary);
}

[data-motion="firm"].tIM0vW_floating {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="off"].tIM0vW_floating, [data-motion="off"].tIM0vW_floating * {
  transition: none !important;
  animation: none !important;
}

@keyframes tIM0vW_whaleEnter {
  from {
    opacity: .4;
    transform: translateY(3px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes tIM0vW_whalePreview {
  from {
    transform: scale(.88);
  }

  to {
    transform: scale(1);
  }
}

@keyframes tIM0vW_whaleSpin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes tIM0vW_whaleBreathe {
  0%, 100% {
    opacity: .65;
  }

  50% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tIM0vW_floating, .tIM0vW_floating * {
    transition: none !important;
    animation: none !important;
  }
}

@media (width <= 520px), (height <= 560px) {
  .tIM0vW_settingsLayout {
    grid-template-rows: auto minmax(0, 1fr);
    grid-template-columns: minmax(0, 1fr);
  }

  .tIM0vW_settingsNav {
    border-right: 0;
    border-bottom: 1px solid var(--dsw-alias-border-l2);
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 2px;
    padding: 5px 8px;
    display: grid;
    overflow: hidden;
  }

  .tIM0vW_settingsNav button {
    justify-content: center;
    height: 30px;
    min-height: 30px;
    padding: 0 2px;
  }

  .tIM0vW_settingsNav button[aria-pressed="true"] {
    box-shadow: inset 0 -2px 0 var(--dsw-alias-brand-primary);
  }

  .tIM0vW_settingsHeader {
    gap: 3px;
    min-height: 44px;
    padding: 5px 8px;
  }

  .tIM0vW_backButton, .tIM0vW_guideButton {
    padding: 0 5px;
  }

  .tIM0vW_settingsBrand {
    gap: 4px;
  }

  .tIM0vW_settingsBrand .tIM0vW_markSmall {
    display: none;
  }

  .tIM0vW_pageHeading {
    padding: 10px 12px 8px;
  }

  .tIM0vW_pageHeading p {
    display: none;
  }

  .tIM0vW_settingsBody {
    padding: 4px 12px 12px;
  }

  .tIM0vW_modelNav {
    margin-bottom: 8px;
    padding: 0 10px 7px;
  }

  .tIM0vW_editNotice {
    flex-wrap: wrap;
  }

  .tIM0vW_editNotice button {
    width: 100%;
  }
}

@media (height <= 420px) {
  .tIM0vW_settingsHeader {
    height: 36px;
    min-height: 36px;
    padding: 2px 8px;
  }

  .tIM0vW_settingsHeader button {
    height: 30px;
    min-height: 30px;
  }

  .tIM0vW_settingsNav {
    padding: 2px 8px;
  }

  .tIM0vW_settingsNav button {
    height: 28px;
    min-height: 28px;
  }

  .tIM0vW_pageHeading {
    box-sizing: border-box;
    min-height: 32px;
    padding: 2px 12px;
  }

  .tIM0vW_pageHeading .tIM0vW_iconButton {
    width: 28px;
    min-width: 28px;
    height: 28px;
  }

  .tIM0vW_modelNav {
    margin-bottom: 4px;
    padding: 0 10px 3px;
  }

  .tIM0vW_modelNav button {
    height: 28px;
    min-height: 28px;
  }
}

@media (pointer: coarse) {
  .tIM0vW_field input, .tIM0vW_deviceSelect {
    font-size: 16px;
  }
}

@media (forced-colors: active) {
  .tIM0vW_floating, .tIM0vW_popover {
    outline: 1px solid canvastext;
  }

  .tIM0vW_settingsNav button[aria-pressed="true"], .tIM0vW_modelNav button[aria-pressed="true"] {
    outline: 2px solid highlight;
  }
}

.tIM0vW_floating[data-view="home"] .tIM0vW_panelViewport, .tIM0vW_floating[data-collapsed] .tIM0vW_panelViewport {
  overflow: hidden;
}

.tIM0vW_floating[data-view="home"]:not([data-collapsed]) {
  padding: 10px;
}

.tIM0vW_panelContent {
  flex-direction: column;
  gap: 4px;
  height: 100%;
  min-height: 0;
  display: flex;
}

.tIM0vW_panelContent > :not(.tIM0vW_quickConversation) {
  flex: none;
}

.tIM0vW_panelContent > .tIM0vW_homeTargetPicker {
  flex: 1 1 0;
  min-height: 0;
  padding: 2px;
  display: flex;
}

.tIM0vW_homeTargetPicker > .tIM0vW_existingSessionPicker {
  flex-direction: column;
  flex: 1;
  margin-top: 0;
  display: flex;
}

.tIM0vW_homeTargetPicker .tIM0vW_existingSessionList {
  overscroll-behavior: contain;
  flex: auto;
  min-height: 0;
  max-height: none;
}

.tIM0vW_homeTargetRow {
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

.tIM0vW_homeTargetRow:disabled {
  opacity: 1;
  cursor: default;
  color: var(--dsw-alias-label-secondary);
}

.tIM0vW_homeTargetRow .tIM0vW_hint {
  overflow-wrap: anywhere;
}

.tIM0vW_homeTargetPicker :is(.tIM0vW_existingSessionSearch, .tIM0vW_actions) {
  flex: none;
}

.tIM0vW_homeTargetPicker .tIM0vW_actions {
  margin-top: auto;
}

.tIM0vW_homeTargetPicker .tIM0vW_hint {
  margin: 0;
}

.tIM0vW_panelContent > .tIM0vW_header {
  height: 28px;
  min-height: 28px;
  margin: 0;
}

.tIM0vW_panelContent .tIM0vW_header .tIM0vW_iconButton {
  width: 28px;
  min-width: 28px;
  height: 28px;
}

.tIM0vW_panelContent > .tIM0vW_statusRow {
  box-sizing: border-box;
  min-height: 24px;
  margin: 0;
  padding: 2px 6px;
}

.tIM0vW_panelContent > .tIM0vW_hint {
  margin: 0;
  font-size: 12px;
  line-height: 18px;
}

.tIM0vW_panelContent > .tIM0vW_error {
  margin: 0;
  padding: 4px 8px;
  line-height: 18px;
}

.tIM0vW_panelContent .tIM0vW_quickSpeed {
  gap: 3px;
  padding-top: 0;
}

.tIM0vW_panelContent .tIM0vW_quickSpeedHeader {
  line-height: 18px;
}

.tIM0vW_panelContent .tIM0vW_quickHint {
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 16px;
  overflow: hidden;
}

.tIM0vW_panelContent .tIM0vW_quickHint p {
  text-overflow: ellipsis;
  margin: 0;
  line-height: 16px;
  overflow: hidden;
}

.tIM0vW_panelContent > .tIM0vW_caption {
  box-sizing: border-box;
  height: 30px;
  min-height: 30px;
  margin: 0;
  padding: 4px 8px;
  line-height: 18px;
}

.tIM0vW_panelContent > .tIM0vW_quickConversation {
  flex-direction: column;
  flex: 1 1 0;
  min-height: 0;
  max-height: none;
  margin: 0;
  padding: 8px;
  display: flex;
  overflow: hidden;
}

.tIM0vW_quickConversation .tIM0vW_popoverHeader {
  flex: none;
  min-height: 28px;
  margin-bottom: 6px;
}

.tIM0vW_quickConversation .tIM0vW_recentMessages {
  overscroll-behavior: contain;
  min-height: 0;
  overflow-y: auto;
}

.tIM0vW_floating[data-compact-height="true"] .tIM0vW_panelContent {
  gap: 2px;
}

.tIM0vW_floating[data-compact-height="true"] :is(.tIM0vW_voiceTarget, .tIM0vW_existingSessionHome) > span {
  font-size: 10px;
}

.tIM0vW_floating[data-compact-height="true"] .tIM0vW_voiceTarget strong {
  font-size: 12px;
}

.tIM0vW_floating[data-compact-height="true"] .tIM0vW_statusRow[data-bound] .tIM0vW_status {
  line-height: 16px;
}

.tIM0vW_floating[data-compact-height="true"] .tIM0vW_existingSessionHome {
  height: 20px;
  min-height: 20px;
}

.tIM0vW_floating[data-compact-height="true"] .tIM0vW_inputCaptions {
  max-height: max(42px,calc(var(--whale-content-limit) - 137px));
}

.tIM0vW_floating[data-compact-height="true"] [data-has-input-caption] > .tIM0vW_audioDevices, .tIM0vW_floating[data-compact-height="true"] .tIM0vW_panelContent:has(.tIM0vW_currentDshTarget) > :is(.tIM0vW_audioDevices, .tIM0vW_quickSpeed), .tIM0vW_floating[data-compact-height="true"] .tIM0vW_panelContent > .tIM0vW_hint:not([data-home-important]), .tIM0vW_floating[data-compact-height="true"] .tIM0vW_panelContent .tIM0vW_quickSpeedHeader, .tIM0vW_floating[data-compact-height="true"] .tIM0vW_panelContent .tIM0vW_quickHint {
  display: none;
}

.tIM0vW_floating[data-compact-height="true"] .tIM0vW_quickActions {
  grid-template-columns: minmax(65px, .9fr) minmax(0, 2.1fr);
  align-items: center;
  gap: 4px;
}

.tIM0vW_floating[data-compact-height="true"] .tIM0vW_quickActions .tIM0vW_mainAction {
  white-space: normal;
  height: 30px;
  min-height: 30px;
  padding-inline: 4px;
  font-size: 12px;
  line-height: 1.15;
}

.tIM0vW_floating[data-compact-height="true"] .tIM0vW_quickActions .tIM0vW_quickSegments {
  padding: 2px;
}

.tIM0vW_floating[data-compact-height="true"] .tIM0vW_quickActions .tIM0vW_quickSegments button {
  white-space: nowrap;
  padding-inline: 1px;
  font-size: 11px;
}

.tIM0vW_floating[data-compact-height="true"] .tIM0vW_panelContent[data-size-detail="true"] > .tIM0vW_quickSpeed {
  display: none;
}

.tIM0vW_settingsBody {
  container-type: inline-size;
}

.tIM0vW_section > button {
  justify-self: start;
  max-width: 100%;
}

.tIM0vW_settingsBody button {
  white-space: normal;
  overflow-wrap: anywhere;
  height: auto;
  min-height: 36px;
}

.tIM0vW_settingsBody :is(.tIM0vW_actions, .tIM0vW_segmented, .tIM0vW_formActions) > button {
  flex: 0 auto;
}

.tIM0vW_inlineActions, .tIM0vW_inlineField, .tIM0vW_volumeRow, .tIM0vW_volumeControl {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.tIM0vW_inlineField {
  font-size: 12px;
}

.tIM0vW_inlineField .tIM0vW_deviceSelect {
  text-overflow: ellipsis;
  flex: 0 180px;
  width: 180px;
  max-width: 100%;
}

.tIM0vW_inlineField input[type="number"] {
  width: 80px;
}

.tIM0vW_fullName {
  color: var(--dsw-alias-label-secondary);
  min-width: 0;
  font-size: 12px;
}

.tIM0vW_fullName summary {
  padding: 2px 0;
  font-size: 12px;
  font-weight: 400;
}

.tIM0vW_fullName p {
  overflow-wrap: anywhere;
  margin-top: 4px;
}

.tIM0vW_disclosureRow {
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 8px;
  display: flex;
}

.tIM0vW_disclosureRow > details.tIM0vW_section {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  flex: 0 auto;
  min-width: 0;
  padding: 0 10px;
}

.tIM0vW_disclosureRow > details.tIM0vW_section > summary {
  min-height: 20px;
  padding: 7px 0;
}

.tIM0vW_disclosureRow > details[open].tIM0vW_section {
  flex: 100%;
  padding-bottom: 10px;
}

.tIM0vW_volumeControl {
  flex-wrap: nowrap;
  flex: 0 260px;
}

.tIM0vW_volumeControl input[type="range"] {
  width: 210px;
  min-width: 80px;
  max-width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
  flex: 210px;
}

.tIM0vW_volumeControl span {
  text-align: right;
  flex: none;
  min-width: 3em;
  font-size: 12px;
}

.tIM0vW_field:has( > input[type="number"]) {
  flex-wrap: wrap;
  align-items: center;
  display: flex;
}

.tIM0vW_field > input[type="number"] {
  width: 80px;
}

.tIM0vW_authorizationSteps {
  color: var(--dsw-alias-label-secondary);
  margin: 8px 0 12px;
  font-size: 12px;
}

.tIM0vW_agreement {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  gap: 14px;
  padding: 14px;
  font-size: 13px;
  line-height: 1.6;
  display: grid;
}

.tIM0vW_agreement p {
  margin: 0;
}

.tIM0vW_authorizationBody h3 {
  margin: 0 0 10px;
  font-size: 15px;
}

.tIM0vW_authorizationActions button {
  flex: 0 auto;
  min-height: 36px;
}

@container (width <= 340px) {
  .tIM0vW_inlineActions {
    align-items: flex-start;
  }

  .tIM0vW_inlineField .tIM0vW_deviceSelect {
    flex-basis: 160px;
    width: 160px;
  }

  .tIM0vW_volumeControl {
    flex-basis: 200px;
  }

  .tIM0vW_volumeControl input[type="range"] {
    width: 150px;
  }
}

.tIM0vW_audioDevices {
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  display: flex;
}

.tIM0vW_audioDeviceGrid {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 8px;
  display: grid;
}

.tIM0vW_audioDeviceField {
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  font-size: 12px;
  display: flex;
}

.tIM0vW_audioDeviceField > span {
  align-items: center;
  gap: 4px;
  line-height: 18px;
  display: flex;
}

.tIM0vW_audioDeviceField svg {
  flex: none;
  width: 14px;
  height: 14px;
}

.tIM0vW_audioDeviceField select {
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

.tIM0vW_audioDeviceField select[data-device-missing] {
  border-color: #b80;
}

.tIM0vW_audioDeviceHint, .tIM0vW_audioDeviceNotice {
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  font-size: 11px;
  line-height: 16px;
  overflow: hidden;
}

.tIM0vW_audioDeviceHint {
  color: var(--dsw-alias-label-secondary);
}

.tIM0vW_audioDeviceNotice {
  color: #805500;
}

[data-ds-dark-theme] .tIM0vW_audioDeviceNotice {
  color: #ffd277;
}

[data-ds-dark-theme] .tIM0vW_audioDeviceField select {
  color-scheme: dark;
}

.tIM0vW_floating[data-compact-height="true"] .tIM0vW_audioDeviceField > span {
  font-size: 11px;
  line-height: 14px;
}

.tIM0vW_floating[data-compact-height="true"] .tIM0vW_audioDeviceField select {
  height: 26px;
}

.tIM0vW_floating[data-compact-height="true"] .tIM0vW_audioDeviceHint, .tIM0vW_floating[data-compact-height="true"] .tIM0vW_audioDeviceNotice, .tIM0vW_floating[data-compact-height="true"] .tIM0vW_panelContent:has( > [data-home-important]) .tIM0vW_audioDeviceField > span {
  display: none;
}

.tIM0vW_pageHeading.tIM0vW_modelHeading {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  justify-content: flex-start;
  gap: 10px;
  min-height: 40px;
  margin-bottom: 6px;
  padding: 5px 12px;
}

.tIM0vW_modelHeading h3 {
  white-space: nowrap;
  font-size: 13px;
}

.tIM0vW_modelHeading .tIM0vW_modelNav {
  border: 0;
  flex: 1;
  gap: 3px;
  min-width: 0;
  margin: 0;
  padding: 0;
}

.tIM0vW_modelHeading .tIM0vW_modelNav button {
  white-space: nowrap;
  flex: 0 auto;
  height: 28px;
  min-height: 28px;
  padding: 0 6px;
}

.tIM0vW_currentModel {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  display: flex;
}

.tIM0vW_pathRow {
  grid-template-columns: 95px minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  font-size: 12px;
  display: grid;
}

.tIM0vW_pathRow > span {
  min-width: 0;
}

.tIM0vW_editNotice {
  margin-bottom: 7px;
  padding: 5px 8px;
}

.tIM0vW_editNotice span {
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
}

.tIM0vW_editNotice button {
  height: auto;
  min-height: 30px;
}

@media (width <= 360px) {
  .tIM0vW_pageHeading.tIM0vW_modelHeading {
    gap: 5px;
    padding: 5px 8px;
  }

  .tIM0vW_modelHeading .tIM0vW_modelNav button {
    padding: 0 3px;
    font-size: 11px;
  }

  .tIM0vW_pathRow {
    grid-template-columns: minmax(0, 1fr);
    gap: 4px;
  }
}

.tIM0vW_pathRow {
  display: block;
}

.tIM0vW_pathRow > div:first-child {
  flex-wrap: nowrap !important;
}

.tIM0vW_pathRow > div:first-child > label {
  flex: 1;
  grid-template-columns: 95px minmax(0, 1fr);
  display: grid !important;
}

.tIM0vW_pathRow input {
  width: 100% !important;
}

.tIM0vW_pathRow button {
  flex: none;
  min-height: 32px;
}

@media (width <= 420px) {
  .tIM0vW_pathRow > div:first-child {
    flex-wrap: wrap !important;
  }

  .tIM0vW_pathRow > div:first-child > label {
    grid-template-columns: 80px minmax(0, 1fr);
    min-width: 180px !important;
  }
}

.tIM0vW_floating :is(button, select, input, textarea, summary, a), .tIM0vW_settings :is(button, select, input, summary, a) {
  transition: background-color .12s ease-out,border-color .12s ease-out,color .12s ease-out,box-shadow .12s ease-out,transform var(--whale-duration, .2s) var(--whale-ease, ease-out);
}

.tIM0vW_floating :is(button, summary):hover:not(:disabled) {
  background-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,var(--dsw-alias-bg-layer-1));
}

.tIM0vW_floating button:active:not(:disabled), .tIM0vW_settings button:active:not(:disabled) {
  transform: scale(.97);
}

.tIM0vW_floating :is(input, select, textarea):hover:not(:disabled) {
  border-color: var(--dsw-alias-brand-primary);
}

.tIM0vW_radios label {
  transition: background-color .12s, border-color .12s, box-shadow .12s;
}

.tIM0vW_radios label:has(input:checked) {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,transparent);
}

.tIM0vW_authorizationBody, .tIM0vW_settingsLayout, .tIM0vW_panelContent > .tIM0vW_header, .tIM0vW_settingsBody > div:not([hidden]), .tIM0vW_section > div:not([hidden])[data-whale-tab-panel], .tIM0vW_floating [role="tabpanel"]:not([hidden]) {
  animation: tIM0vW_whalePageEnter var(--whale-duration, .2s) ease-out;
}

.tIM0vW_floating :is([role="menu"], [role="listbox"]), .tIM0vW_floating [data-whale-dropdown] {
  transform-origin: top;
  animation: .12s ease-out tIM0vW_whalePageEnter;
}

.tIM0vW_floating [data-whale-save-result] {
  animation: .16s ease-out tIM0vW_whaleFeedback;
}

.tIM0vW_floating summary {
  list-style: none;
}

.tIM0vW_floating summary::-webkit-details-marker {
  display: none;
}

.tIM0vW_floating summary:before {
  content: "\u203A";
  width: 1em;
  transition: transform .16s ease-out;
  display: inline-block;
  transform: rotate(0);
}

.tIM0vW_floating details[open] > summary:before {
  transform: rotate(90deg);
}

.tIM0vW_floating details[open] > :not(summary) {
  animation: .16s ease-out tIM0vW_whalePageEnter;
}

@supports (interpolate-size: allow-keywords) {
  .tIM0vW_floating details {
    interpolate-size: allow-keywords;
  }

  .tIM0vW_floating details::details-content {
    block-size: 0;
    transition: block-size .16s ease-out,content-visibility .16s allow-discrete;
    overflow: clip;
  }

  .tIM0vW_floating details[open]::details-content {
    block-size: auto;
  }
}

@keyframes tIM0vW_whalePageEnter {
  from {
    translate: 0 4px;
  }

  to {
    translate: 0;
  }
}

@keyframes tIM0vW_whaleFeedback {
  from {
    opacity: .5;
  }

  to {
    opacity: 1;
  }
}

[data-motion="firm"].tIM0vW_floating, [data-motion="firm"].tIM0vW_settings {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="firm"].tIM0vW_floating details::details-content, [data-motion="firm"].tIM0vW_floating summary:before {
  transition-duration: .1s;
}

[data-motion="off"].tIM0vW_floating *, [data-motion="off"].tIM0vW_settings *, [data-motion="off"].tIM0vW_floating :before, [data-motion="off"].tIM0vW_floating details::details-content {
  transition: none !important;
  animation: none !important;
}

[data-motion="off"].tIM0vW_floating button:active, [data-motion="off"].tIM0vW_settings button:active {
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .tIM0vW_floating *, .tIM0vW_settings *, .tIM0vW_floating :before, .tIM0vW_floating details::details-content {
    transition: none !important;
    animation: none !important;
  }

  .tIM0vW_floating button:active, .tIM0vW_settings button:active {
    transform: none;
  }
}

.tIM0vW_conversationChoice {
  gap: 6px;
  min-width: 0;
  display: grid;
  position: relative;
}

.tIM0vW_conversationChoice > button {
  text-align: left;
  justify-content: space-between;
  width: 100%;
  min-width: 0;
}

.tIM0vW_conversationOptions {
  overscroll-behavior: contain;
  gap: 3px;
  min-width: 0;
  max-height: 220px;
  padding: 6px;
  animation: .12s ease-out tIM0vW_whalePageEnter;
  display: grid;
  overflow: auto;
}

.tIM0vW_conversationOptions [role="option"] {
  text-align: left;
  border-radius: var(--dsw-radius-sm);
  justify-content: space-between;
  width: 100%;
  min-width: 0;
  padding: 7px 10px;
  transition: background-color .12s ease-out, color .12s ease-out;
}

.tIM0vW_conversationOptions [role="option"][aria-selected="true"] {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 18%,var(--dsw-alias-bg-layer-1));
  font-weight: 600;
}

.tIM0vW_conversationOptions [role="option"]:is(:hover, :focus-visible) {
  background: var(--dsw-alias-interactive-bg-active);
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: -2px;
}

.tIM0vW_conversationOptions [role="option"] small {
  color: var(--dsw-alias-label-secondary);
}

.tIM0vW_settings [data-whale-tab-panel]:not([hidden]) {
  animation: tIM0vW_whalePageEnter var(--whale-duration, .2s) ease-out;
}

.tIM0vW_modelHeading .tIM0vW_modelNav {
  scrollbar-width: thin;
  overflow-x: auto;
}

.tIM0vW_modelHeading .tIM0vW_modelNav button {
  flex-shrink: 0;
}

[data-motion="off"].tIM0vW_settings [data-whale-tab-panel] {
  animation: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .tIM0vW_settings [data-whale-tab-panel] {
    animation: none !important;
  }
}

.tIM0vW_panelContent, .tIM0vW_bubble {
  animation: none;
}

.tIM0vW_panelContent {
  height: auto;
}

.tIM0vW_panelContent[data-size-detail="true"] {
  height: 100%;
}

.tIM0vW_panelContent .tIM0vW_quickSegments {
  background: none;
  gap: 6px;
  padding: 0;
}

.tIM0vW_panelContent .tIM0vW_quickSegments button {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 8px;
  gap: 4px;
  height: 34px;
  min-height: 34px;
}

.tIM0vW_panelContent .tIM0vW_quickSegments button[aria-pressed="true"] {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 22%,var(--dsw-alias-bg-layer-1));
  box-shadow: inset 0 0 0 1px var(--dsw-alias-brand-primary);
}

.tIM0vW_panelContent .tIM0vW_quickSegments svg {
  width: 15px;
  height: 15px;
}

.tIM0vW_panelContent > .tIM0vW_quickConversation {
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

.tIM0vW_conversationHeader {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  font-size: 12px;
  display: flex;
}

.tIM0vW_conversationHeader > div {
  align-items: center;
  gap: 2px;
  display: flex;
}

.tIM0vW_conversationHeader button:not(.tIM0vW_iconButton), .tIM0vW_assistantName, .tIM0vW_loadHistory {
  color: inherit;
  font: inherit;
  cursor: pointer;
  background: none;
  border: 0;
  border-radius: 4px;
  padding: 3px;
}

.tIM0vW_conversationHeader .tIM0vW_iconButton {
  width: 26px;
  min-width: 26px;
  height: 28px;
}

.tIM0vW_historyScope {
  color: var(--dsw-alias-label-secondary);
  flex: none;
  margin: 2px 0;
  font-size: 10px;
  line-height: 14px;
}

.tIM0vW_quickConversation .tIM0vW_recentMessages {
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

.tIM0vW_message {
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

.tIM0vW_message[data-role="user"] {
  align-self: flex-end;
  align-items: flex-end;
}

.tIM0vW_messageName {
  min-height: 19px;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  line-height: 17px;
}

.tIM0vW_assistantName {
  overflow-wrap: anywhere;
  max-width: 100%;
  min-height: 19px;
  padding: 0 2px;
  font-size: 11px;
  line-height: 17px;
}

.tIM0vW_assistantName:hover {
  color: var(--dsw-alias-label-primary);
  text-underline-offset: 3px;
  text-decoration: underline;
}

.tIM0vW_assistantNameInput {
  box-sizing: border-box;
  width: 140px;
  min-width: 60px;
  max-width: 160px;
  height: 23px !important;
  min-height: 23px !important;
  padding: 1px 5px !important;
  font-size: 12px !important;
}

.tIM0vW_message p {
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

.tIM0vW_message[data-role="user"] p {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 28%,var(--dsw-alias-bg-layer-1));
  border-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 45%,var(--dsw-alias-border-l2));
}

.tIM0vW_message small {
  color: var(--dsw-alias-label-secondary);
  font-size: 10px;
}

.tIM0vW_loadHistory {
  align-self: center;
  padding: 5px;
  font-size: 11px;
}

.tIM0vW_newMessages {
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

.tIM0vW_bubble {
  gap: 6px;
  padding: 0 7px;
  font-size: 11px;
}

.tIM0vW_bubbleBrand {
  flex: none;
  font-size: 12px;
  font-weight: 600;
}

.tIM0vW_bubbleStatus {
  white-space: nowrap;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 3px;
  min-width: 0;
  display: flex;
}

.tIM0vW_bubbleStatus svg {
  flex: none;
  width: 15px;
  height: 15px;
}

.tIM0vW_bubble > svg:last-child {
  flex: none;
  width: 14px;
  height: 14px;
}

.tIM0vW_voiceBars {
  align-items: center;
  gap: 2px;
  height: 16px;
  display: flex;
}

.tIM0vW_voiceBars i {
  background: var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary));
  opacity: .5;
  border-radius: 1px;
  width: 3px;
  height: 13px;
  transform: scaleY(.31);
}

.tIM0vW_voiceBars[data-active="true"] i {
  background: var(--dsw-alias-brand-primary);
  opacity: 1;
  animation: .7s ease-in-out infinite alternate tIM0vW_whaleInputPulse;
}

.tIM0vW_voiceBars[data-active="true"] i:nth-child(2n) {
  animation-delay: -.3s;
}

.tIM0vW_voiceBars[data-active="true"] i:nth-child(3) {
  animation-delay: -.5s;
}

@keyframes tIM0vW_whaleInputPulse {
  from {
    transform: scaleY(.38);
  }

  to {
    transform: scaleY(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .tIM0vW_voiceBars[data-active="true"] i {
    animation: none;
    transform: scaleY(.69);
  }
}

.tIM0vW_floating[data-motion="off"] .tIM0vW_voiceBars[data-active="true"] i {
  animation: none;
  transform: scaleY(.69);
}

@media (forced-colors: active) {
  .tIM0vW_message p {
    border: 1px solid canvastext;
  }

  .tIM0vW_quickSegments button[aria-pressed="true"] {
    outline: 2px solid highlight;
  }

  .tIM0vW_voiceBars i {
    background: canvastext;
  }
}

.tIM0vW_voicePrompt {
  flex-direction: column;
  gap: 8px;
  display: flex;
}

.tIM0vW_voicePrompt label {
  font-size: 13px;
  font-weight: 600;
}

.tIM0vW_voicePrompt label span {
  margin-left: 10px;
  font-weight: 400;
}

.tIM0vW_voicePromptInput {
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

.tIM0vW_voicePromptInput::placeholder {
  color: var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary));
  opacity: 1;
}

.tIM0vW_voicePromptInput:disabled {
  opacity: .65;
  cursor: not-allowed;
}

.tIM0vW_voicePromptInput:focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: 2px;
}

.tIM0vW_voicePromptCount {
  text-align: right;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
}

.tIM0vW_voicePromptActions {
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  display: flex;
}

.tIM0vW_voicePromptActions .tIM0vW_actions {
  margin: 0;
}

.tIM0vW_voicePromptMode {
  color: var(--dsw-alias-state-success-primary, var(--dsw-alias-label-secondary));
  white-space: nowrap;
  font-size: 11px;
}

.tIM0vW_voicePromptMode:before {
  content: "\u2022";
  margin-right: 5px;
}
`};var pe=require("react/jsx-runtime");function on({small:e=!1,state:t="idle"}){return(0,pe.jsx)("svg",{viewBox:"0 0 1024 1024","data-state":t,className:e?h.markSmall:h.mark,"aria-hidden":"true",children:(0,pe.jsx)("path",{fill:"currentColor",d:"M 920.377 65.087 C 928.064 63.083 932.973 107.434 932.987 114.072 C 933.092 165.045 924.256 210.594 901.365 256.376 C 855.379 348.348 758.325 392.662 681.124 453.829 C 619.898 502.339 580.980 567.068 558.933 641.286 C 543.187 694.296 538.293 750.695 527.468 804.833 C 520.391 840.227 514.008 874.928 493.687 905.451 C 474.447 934.348 431.832 972.135 393.948 957.487 C 358.248 943.683 373.787 884.228 380.635 856.964 C 401.585 773.552 460.283 657.712 419.105 573.931 C 381.383 497.183 304.815 488.756 234.259 458.353 C 195.522 441.661 157.383 413.822 133.190 378.905 C 115.301 353.087 100.999 326.148 94.423 295.130 C 93.358 290.109 88.245 266.804 93.252 264.337 C 93.759 264.087 133.145 277.445 138.791 278.433 C 174.563 284.693 209.339 281.307 245.016 275.980 C 288.094 269.548 333.679 260.367 376.940 270.872 C 414.858 280.080 448.414 297.981 474.046 327.930 C 483.707 339.219 491.970 352.034 498.604 365.302 C 499.492 367.078 503.519 377.817 505.784 377.367 C 506.966 377.132 507.537 375.084 507.926 374.169 C 513.160 361.862 518.091 349.606 524.078 337.631 C 541.287 303.214 562.597 270.184 592.119 244.919 C 633.676 209.352 683.585 187.330 735.895 172.601 C 770.712 162.797 806.633 155.544 838.984 138.655 C 862.849 126.195 882.544 110.622 901.022 91.328 C 905.036 87.137 916.896 65.995 920.377 65.087 Z"})})}var xd=()=>({pet:(0,pe.jsxs)(pe.Fragment,{children:[(0,pe.jsx)("path",{d:"M5 11c-2-8 4-10 7-8 5-2 9 2 7 8M5 10l4-4 3 3 3-3 4 4v5c0 4-3 6-7 6s-7-2-7-6v-5Z"}),(0,pe.jsx)("path",{d:"M8 13v2m8-2v2m-6 3h4"})]}),settings:(0,pe.jsxs)(pe.Fragment,{children:[(0,pe.jsx)("path",{d:"m9 3 1-1h4l1 1 .5 2 2 .8 2-.6 2 3-.8 1.8.2 2.2 1.3 1.5-2 3-2.1-.2-1.7 1.3-.5 2.2h-4l-.6-2.1-1.8-1.1-2 .3-2-3 1.3-1.7V10L4 8.5l2-3 2 .5L9 3Z"}),(0,pe.jsx)("circle",{cx:"12",cy:"11.5",r:"3"})]}),minus:(0,pe.jsx)("path",{d:"M5 12h14"}),plus:(0,pe.jsx)("path",{d:"M12 5v14M5 12h14"}),down:(0,pe.jsx)("path",{d:"m6 9 6 6 6-6"}),refresh:(0,pe.jsxs)(pe.Fragment,{children:[(0,pe.jsx)("path",{d:"M20 6v5h-5M4 18v-5h5"}),(0,pe.jsx)("path",{d:"M6 7a7 7 0 0 1 12-1l2 5M4 13l2 5a7 7 0 0 0 12-1"})]}),up:(0,pe.jsx)("path",{d:"m6 15 6-6 6 6"}),check:(0,pe.jsx)("path",{d:"m5 12 4 4L19 6"}),micOff:(0,pe.jsx)(pe.Fragment,{children:(0,pe.jsx)("path",{d:"M9 9v3a3 3 0 0 0 5.1 2.1M15 8V6a3 3 0 0 0-5.7-1.3M6 10v2a6 6 0 0 0 10.2 4.3M18 12v-2M12 18v3M9 21h6M3 3l18 18"})}),mic:(0,pe.jsxs)(pe.Fragment,{children:[(0,pe.jsx)("rect",{x:"9",y:"3",width:"6",height:"12",rx:"3"}),(0,pe.jsx)("path",{d:"M6 10v2a6 6 0 0 0 12 0v-2M12 18v3M9 21h6"})]}),volume:(0,pe.jsxs)(pe.Fragment,{children:[(0,pe.jsx)("path",{d:"M3 9h4l5-4v14l-5-4H3Z"}),(0,pe.jsx)("path",{d:"M16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"})]}),chat:(0,pe.jsx)("path",{d:"M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9l-5 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"}),close:(0,pe.jsx)("path",{d:"m6 6 12 12M18 6 6 18"}),search:(0,pe.jsxs)(pe.Fragment,{children:[(0,pe.jsx)("circle",{cx:"10",cy:"10",r:"6"}),(0,pe.jsx)("path",{d:"m15 15 5 5"})]}),chevron:(0,pe.jsx)("path",{d:"m9 5 7 7-7 7"}),warning:(0,pe.jsxs)(pe.Fragment,{children:[(0,pe.jsx)("path",{d:"m12 3 10 18H2L12 3Z"}),(0,pe.jsx)("path",{d:"M12 9v5m0 3v.2"})]})});function Ke({name:e,className:t=""}){return(0,pe.jsx)("svg",{viewBox:"0 0 24 24",width:"18",height:"18","aria-hidden":"true",className:t,fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round",children:xd()[e]??xd().chat})}var We=require("react/jsx-runtime");function Zh({name:e,save:t,t:n}){let[o,i]=(0,He.useState)(!1),[r,s]=(0,He.useState)(e),a=(0,He.useRef)(!1),l=(0,He.useRef)(null),u=(0,He.useRef)(null),d=(0,He.useRef)(!1);(0,He.useLayoutEffect)(()=>{o?(l.current?.focus({preventScroll:!0}),l.current?.select()):d.current&&(d.current=!1,u.current?.focus({preventScroll:!0}))},[o]);let p=()=>{i(!1),s(e)},f=()=>{let m=r.trim();m&&m.length<=40&&(t?.(m),d.current=!0,i(!1))};return o?(0,We.jsx)(mr.Input,{ref:l,className:h.assistantNameInput,"aria-label":n("assistantName"),value:r,maxLength:40,"data-no-drag":!0,onChange:m=>s(m.target.value),onCompositionStart:()=>{a.current=!0},onCompositionEnd:()=>{a.current=!1},onBlur:p,onKeyDown:m=>{m.stopPropagation(),!(a.current||m.nativeEvent.isComposing)&&(m.key==="Escape"&&(m.preventDefault(),d.current=!0,p()),m.key==="Enter"&&(m.preventDefault(),f()))}}):(0,We.jsx)("button",{ref:u,type:"button",className:h.assistantName,"data-no-drag":!0,title:n("renameAssistant"),onClick:()=>{s(e),i(!0)},children:e})}function yd({conversation:e,history:t,historyLoading:n,historyError:o,historyRetryCursor:i,loadHistory:r,assistantName:s,setAssistantName:a,close:l,t:u}){let[d,p]=(0,He.useState)(!1),[f,m]=(0,He.useState)(0),b=(0,He.useRef)(null),v=(0,He.useRef)(!0),y=(0,He.useRef)(null),w=(0,He.useRef)(null),C=e.rootSessionId,D=nd(t?.rootSessionId===C?t.items:[],e.items),F=!v.current&&y.current?.firstId,N=F?D.findIndex(k=>k.id===F):-1,W=d?D:N>=0?D.slice(N):td(D),M=()=>{let k=b.current;if(!k)return;let z=k.getBoundingClientRect(),O=[...k.querySelectorAll("[data-message-id]")].find(S=>S.getBoundingClientRect().bottom>=z.top);w.current=O?{id:O.dataset.messageId,offset:O.getBoundingClientRect().top-z.top}:null},$=()=>{let k=b.current;k&&(k.scrollTop=k.scrollHeight),v.current=!0,m(0),M()},I=!d&&D.filter(k=>k.role==="user").length<10&&!!t?.nextCursor;return(0,He.useEffect)(()=>{I&&!n&&!o&&r?.(t.nextCursor)},[I,t?.nextCursor,n,o,C]),(0,He.useLayoutEffect)(()=>{let k=b.current;if(!k)return;let z=y.current;if((!z||z.root!==C)&&(v.current=!0,m(0)),v.current)k.scrollTop=k.scrollHeight;else{let O=w.current,S=O&&[...k.querySelectorAll("[data-message-id]")].find(P=>P.dataset.messageId===O.id);if(S?k.scrollTop+=S.getBoundingClientRect().top-k.getBoundingClientRect().top-O.offset:z&&(k.scrollTop=Math.min(z.top,k.scrollHeight-k.clientHeight)),z){let P=e.items.filter(A=>A.at>=z.lastAt&&!z.ids.has(A.id)).length;P&&m(A=>A+P)}}y.current={root:C,firstId:W[0]?.id,top:k.scrollTop,lastAt:Math.max(0,...D.map(O=>O.at)),ids:new Set(D.map(O=>O.id))},M()},[e,t,d,f]),(0,We.jsxs)("section",{className:h.quickConversation,"data-dropdown":"conversation","data-no-drag":!0,role:"region","aria-label":u("recentConversation"),onKeyDown:k=>{k.key==="Escape"&&(k.stopPropagation(),l())},children:[(0,We.jsxs)("div",{className:h.conversationHeader,children:[(0,We.jsx)("strong",{children:u(d?"allRecords":"recentTenTurns")}),(0,We.jsxs)("div",{children:[(0,We.jsx)("button",{type:"button",onClick:()=>{d?(v.current=!0,w.current=null,y.current=null,m(0)):M(),p(k=>!k)},children:u(d?"collapseToTen":"showAllRecords")}),(0,We.jsx)(mr.Button,{className:h.iconButton,"aria-label":u("close"),title:u("collapseConversation"),onClick:l,children:(0,We.jsx)(Ke,{name:"up"})})]})]}),d&&(0,We.jsxs)("p",{className:h.historyScope,children:[u("currentVoiceRecords"),t?.truncated?" \xB7 "+u("historyTruncated"):""]}),(0,We.jsxs)("div",{ref:b,className:h.recentMessages,"data-conversation-messages":!0,tabIndex:0,"aria-label":u("conversationMessages"),onWheel:k=>{k.deltaY<0&&(v.current=!1)},onScroll:()=>{let k=b.current;v.current=od(k),v.current&&m(0),y.current&&(y.current.top=k.scrollTop),M()},children:[d&&t?.nextCursor&&(0,We.jsx)("button",{className:h.loadHistory,disabled:n,onClick:()=>{M(),r?.(t.nextCursor)},children:u(n?"readingHistory":"loadEarlier")}),o&&(0,We.jsx)("button",{className:h.loadHistory,disabled:n,onClick:()=>{r?.(i??void 0)},children:u("retryHistory")}),W.map(k=>(0,We.jsxs)("div",{"data-message-id":k.id,"data-role":k.role,className:h.message,children:[(0,We.jsx)("div",{className:h.messageName,children:k.role==="user"?(0,We.jsx)("span",{children:u("you")}):(0,We.jsx)(Zh,{name:s,save:a,t:u})}),(0,We.jsx)("p",{children:k.text}),["speech-failed","interrupted"].includes(k.state)&&(0,We.jsx)("small",{children:u(k.state==="speech-failed"?"speechFailed":"speechInterrupted")})]},k.id)),!W.length&&(0,We.jsx)("p",{className:h.hint,children:u(n||I?"readingHistory":"noConversation")})]}),f>0&&(0,We.jsxs)("button",{className:h.newMessages,onClick:$,children:[(0,We.jsx)(Ke,{name:"down"}),f," ",u("newMessages")]})]})}var rn=require("react"),$n=require("@deepseek-ai/dsh-client-ui-primitives"),ft=require("react/jsx-runtime");function go({label:e,value:t,onChange:n,kind:o,pickPath:i,sessionId:r,disabled:s,active:a=!0,scope:l,className:u,placeholder:d}){let[p,f]=(0,rn.useState)(!1),[m,b]=(0,rn.useState)(null),v=typeof t=="string"?t.split(/[\\/]/).filter(Boolean).at(-1)??t:"",y=(0,rn.useRef)(null),w=(0,rn.useRef)(null),C=()=>{y.current?.abort(),y.current=null,f(!1)};(0,rn.useEffect)(()=>(C(),b(null),C),[r,s,a,l,t]);let D=async()=>{if(y.current||s||!a||!i)return;let F=new AbortController;y.current=F,f(!0),b(null);try{let N=await i(r,o,F.signal);y.current===F&&!F.signal.aborted&&!w.current?.closest("[hidden]")&&N!==null&&n(N)}catch(N){y.current===F&&!F.signal.aborted&&b(String(N?.message??N))}finally{y.current===F&&(y.current=null,f(!1))}};return(0,ft.jsxs)("div",{ref:w,className:u,"data-native-path":o,children:[(0,ft.jsxs)("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,minWidth:0},children:[(0,ft.jsxs)("label",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,minWidth:0},children:[e,(0,ft.jsx)($n.Input,{"aria-label":e,title:t??"",value:v,placeholder:d,disabled:s,readOnly:!0,style:{width:190,maxWidth:"100%",minWidth:0,textOverflow:"ellipsis"}})]}),(0,ft.jsx)($n.Button,{variant:"outline",disabled:s||!a||!i||p,onClick:()=>{D()},children:p?"\u7B49\u5F85\u9009\u62E9\u2026":o==="referenceAudio"||o==="campplus"?"\u9009\u62E9\u6587\u4EF6\u2026":"\u9009\u62E9\u6587\u4EF6\u5939\u2026"})]}),o==="campplus"&&t&&(0,ft.jsx)($n.Button,{variant:"outline",disabled:s,onClick:()=>{C(),n("")},children:"\u6E05\u9664\u53EF\u9009\u6A21\u578B"}),p&&(0,ft.jsx)($n.Button,{variant:"outline",onClick:C,children:"\u53D6\u6D88\u9009\u62E9"}),t&&(0,ft.jsxs)("details",{style:{fontSize:12,minWidth:0},children:[(0,ft.jsx)("summary",{children:"\u67E5\u770B\u5B8C\u6574\u8DEF\u5F84"}),(0,ft.jsx)("p",{style:{margin:"4px 0",overflowWrap:"anywhere"},children:t})]}),m&&(0,ft.jsx)("p",{role:"alert",children:m})]})}var On=require("react");var rt=require("react/jsx-runtime"),vo=e=>e&&typeof e=="object"?`${e.backend}:${e.id}`:e==null?"":"__legacy";function _d({state:e,sessionId:t,run:n,t:o}){let i=(0,On.useRef)({state:e,sessionId:t,run:n}),r=(0,On.useRef)(void 0);i.current={state:e,sessionId:t,run:n},(0,On.useEffect)(()=>{!e.settings||e.settingsFor!==t||e.busy||e.audioDevicesPending||r.current===t||(r.current=t,n(t,"read-audio-devices"))},[t,e.settingsFor,e.busy,e.audioDevicesPending]),(0,On.useEffect)(()=>{let f=!1,m,b=async()=>{let v=i.current;!f&&v.sessionId===t&&!v.state.busy&&!document.hidden&&(v.state.settingsFor!==t&&await v.run(t,"read-settings"),f||await v.run(t,"read-audio-devices")),f||(m=document.defaultView.setTimeout(b,1e4))};return b(),()=>{f=!0,document.defaultView.clearTimeout(m)}},[t]);let s=!!(e.settings&&e.settingsFor===t),a=s?e.settings:null,l=a?.audioDevices??{input:a?.values?.device??null,output:null},u=e.audioDevicesFor===t?e.audioDevices:null,d=e.checkedFor===t&&!e.uncertain&&e.status?.enabled===!1&&e.status?.ownerSessionId===null&&e.status?.voiceControlBusy===!1&&e.status?.voiceSession?.fullyStopped===!0&&e.status?.voiceSession?.id==null,p=[];return(0,rt.jsxs)("section",{className:h.audioDevices,"aria-label":o("audioDevices"),"data-audio-device-controls":!0,"data-no-drag":!0,children:[(0,rt.jsx)("div",{className:h.audioDeviceGrid,children:["input","output"].map(f=>{let m=l[f],b=u?.[f],v=vo(m),y=b?.items?.some(N=>vo(N)===v),w=m&&typeof m=="object"&&b&&b.status!=="unavailable"&&!y,C=m==null?o("audioSystemDefault"):typeof m=="object"?m.name:String(m),D=f==="output"&&b?.reason==="AUDIO_PLATFORM_UNSUPPORTED",F=!s||e.busy||e.uncertain||e.settingsConflict||D||f==="input"&&!d;return w&&p.push(o(f==="input"?"inputDeviceMissing":"outputDeviceMissing")),(0,rt.jsxs)("label",{className:h.audioDeviceField,children:[(0,rt.jsxs)("span",{children:[(0,rt.jsx)(Ke,{name:f==="input"?"mic":"volume"}),o(f==="input"?"audioInput":"audioOutput")]}),(0,rt.jsxs)("select",{"aria-label":o(f==="input"?"audioInput":"audioOutput"),"data-device-missing":w||void 0,title:F&&f==="input"&&!d?o("inputDeviceStopFirst"):D?o("outputDeviceUnsupported"):C,disabled:F,value:v,onFocus:()=>{e.audioDevicesPending||n(t,"read-audio-devices")},onChange:N=>{let W=N.target.value;if(W==="__legacy"||W===v)return;let M=W===""?null:b?.items?.find($=>vo($)===W);M!==void 0&&n(t,"save-audio-device",{revision:a.revision,direction:f,selection:M})},children:[(0,rt.jsx)("option",{value:"",children:o("audioSystemDefault")}),m!=null&&!y&&(0,rt.jsxs)("option",{value:v,children:[C,w?" \xB7 "+o("deviceDisconnected"):typeof m=="object"?"":" \xB7 "+o("deviceSaved")]}),b?.items?.map(N=>(0,rt.jsx)("option",{value:vo(N),children:N.name},vo(N)))]})]},f)})}),p.length>0?(0,rt.jsx)("p",{className:h.audioDeviceNotice,role:"status",children:p.join("\uFF1B")}):e.audioDevicesError||u?.input?.status==="unavailable"||u?.output?.status==="unavailable"&&u?.output?.reason!=="AUDIO_PLATFORM_UNSUPPORTED"?(0,rt.jsx)("p",{className:h.audioDeviceHint,role:"status",children:o("deviceListRetry")}):u?.output?.reason==="AUDIO_PLATFORM_UNSUPPORTED"?(0,rt.jsx)("p",{className:h.audioDeviceHint,children:o("outputDeviceUnsupported")}):!d&&s?(0,rt.jsx)("p",{className:h.audioDeviceHint,children:o("inputDeviceStopFirst")}):null]})}var Ae=require("react"),ht=require("@deepseek-ai/dsh-client-ui-primitives");var ae=require("react/jsx-runtime"),Bh={busy:"\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F",archived:"\u4F1A\u8BDD\u5DF2\u5F52\u6863",unavailable:"\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528"},hn=e=>e.title?.trim()||`\u672A\u547D\u540D\u4F1A\u8BDD \xB7 ${e.sessionId.slice(-6).toUpperCase()}`,fr=e=>Bh[e.availability],qt=e=>["ready","busy"].includes(e?.availability),hr=(e,t)=>e.checkedFor===t&&!e.uncertain&&!e.busy&&!e.ttsCancelling&&!e.existingSessionWritePending&&!e.existingSessionUnconfirmed&&e.status?.voiceControlBusy===!1&&e.status?.voiceSession?.fullyStopped===!0&&e.status?.enabled===!1;function wd({sessionId:e,boundSession:t,state:n,controlContext:o,listExistingVoiceSessions:i,setExistingVoiceSession:r,readState:s,run:a,t:l}){let[u,d]=(0,Ae.useState)(),[p,f]=(0,Ae.useState)(!1),[m,b]=(0,Ae.useState)(!1),v=(0,Ae.useRef)(null),y=(0,Ae.useId)(),w=t?.sessionId??null,C=e===w,D=z=>hr(z,e)&&Object.hasOwn(z.status,"existingVoiceSession")&&(z.status.existingVoiceSession?.sessionId??null)===w,F=()=>o.currentConversation()===e&&o.sourceFor(e)===e;(0,Ae.useEffect)(()=>{let z=new AbortController;return v.current={signal:z.signal,choosing:!1},f(!1),i({sessionId:e},z.signal).then(O=>{z.signal.aborted||!F()||(d(O.items.find(S=>S.sessionId===e)??null),(O.binding?.sessionId??null)!==w&&a(e,"status"))}).catch(()=>{z.signal.aborted||d(null)}),()=>z.abort()},[e,w,o,i]);let N=async()=>{let z=v.current;if(!(!z||z.signal.aborted||z.choosing||!F())&&D(s())){z.choosing=!0,f(!0),b(!1);try{if(C){await r({sessionId:null,expectedSessionId:w});return}let O=await i({sessionId:e},z.signal);if(z.signal.aborted||!F())return;let S=O.items.find(A=>A.sessionId===e),P=(O.binding?.sessionId??null)!==w;if(P||!qt(S)){d(S??null),b(!0),P&&a(e,"status");return}if(!D(s()))return;await r({sessionId:e,expectedSessionId:w})}catch{z.signal.aborted||b(!0)}finally{z.choosing=!1,z.signal.aborted||f(!1)}}},W=C?t:u,M=u===void 0&&!C,$=C||M||qt(W);if(!$&&!m)return null;let I=l(C?"backToFishVoice":"chooseCurrentDshTarget"),k=M?l("checkingVoiceTarget"):W?hn(W):"";return(0,ae.jsxs)("div",{className:h.currentDshTarget,"data-whale-current-target":!0,"data-no-drag":!0,children:[$&&(0,ae.jsxs)(ht.Button,{variant:"outline",className:h.currentDshAction,"data-whale-operation":C?"unbind-existing-session":"bind-current-session","aria-label":I,"aria-busy":p||M,"aria-describedby":y,disabled:!D(n)||p||M,onClick:()=>{N()},children:[(0,ae.jsx)("span",{children:I}),(0,ae.jsx)("span",{id:y,className:h.ellipsis,title:k,children:k})]}),m&&(0,ae.jsx)("p",{role:"alert",className:h.hint,children:l("currentDshTargetError")})]})}function Vi({state:e,sessionId:t,listExistingVoiceSessions:n,setExistingVoiceSession:o,openExistingVoiceSession:i,showHome:r,homePickerId:s,closeHomePicker:a,t:l}){let[u,d]=(0,Ae.useState)(null),[p,f]=(0,Ae.useState)(!1),[m,b]=(0,Ae.useState)(""),[v,y]=(0,Ae.useState)(null),[w,C]=(0,Ae.useState)(!1),[D,F]=(0,Ae.useState)(!1),[N,W]=(0,Ae.useState)(null),M=(0,Ae.useRef)(null),$=(0,Ae.useRef)(!1),I=(0,Ae.useId)(),k=!!s,z=k||p,O=e.status,S=Object.hasOwn(O??{},"existingVoiceSession")?O.existingVoiceSession:u?.binding,P=O?.existingVoiceSessionSupported!==!1,A=hr(e,t),j=e.existingSessionWritePending,L=u?.items.find(V=>V.sessionId===v),K=A&&!w&&!!S,q=A&&P&&!w&&!D&&!!u,fe=(0,Ae.useCallback)(async(V="",re)=>{M.current?.abort();let ue=new AbortController;M.current=ue,C(!0),F(!1);try{let ye=await n({...V?{query:V}:{},...re?{cursor:re}:{}},ue.signal);if(ue.signal.aborted)return;d(Xe=>({...ye,query:V,items:re&&Xe?[...new Map([...Xe.items,...ye.items].map(Be=>[Be.sessionId,Be])).values()]:ye.items}))}catch{ue.signal.aborted||F(!0)}finally{M.current===ue&&(M.current=null,C(!1))}},[n]);(0,Ae.useEffect)(()=>($.current=!0,P?fe():C(!1),()=>{$.current=!1,M.current?.abort(),M.current=null}),[fe,P]);let le=V=>{V.preventDefault(),y(null),W(null),fe(m.trim())},ee=async V=>{if(!(!(V===null?K:q)||V===(S?.sessionId??null))){W(null);try{let{binding:re}=await o({sessionId:V,expectedSessionId:S?.sessionId??null});if(!$.current)return;if(k){a();return}d(ue=>ue&&{...ue,binding:re}),f(!1),y(null),b(""),W({text:re?"\u5DF2\u7ED1\u5B9A\u3002\u70B9\u51FB\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u540E\u5373\u53EF\u7EE7\u7EED\u8BE5\u4F1A\u8BDD\u3002":"\u5DF2\u89E3\u9664\uFF0C\u4E0B\u4E00\u6B21\u5F00\u59CB\u5BF9\u8BDD\u5C06\u4F7F\u7528\u9C7C\u5E94\u4F1A\u8BDD\u3002"}),P&&fe()}catch(re){if(!$.current)return;W({error:!0,text:typeof re?.message=="string"&&re.message?re.message.split(`
`)[0].slice(0,160):"\u4F1A\u8BDD\u7ED1\u5B9A\u672A\u786E\u8BA4\uFF0C\u8BF7\u6838\u5BF9\u5F53\u524D\u7ED1\u5B9A\u3002"}),y(null),P&&fe(z?m.trim():"")}}},G=(0,ae.jsxs)(ae.Fragment,{children:[w&&(0,ae.jsx)("p",{role:"status",className:h.hint,children:l("loadingVoiceTargets")}),D&&(0,ae.jsxs)("div",{role:"alert",className:h.notice,children:[l("voiceTargetListError")," ",(0,ae.jsx)(ht.Button,{variant:"outline",disabled:j,onClick:()=>{fe(m.trim())},children:l("retryVoiceTargets")})]})]}),E=N&&(0,ae.jsx)("p",{role:N.error?"alert":"status",className:N.error?h.notice:h.hint,children:N.text});return(0,ae.jsxs)("section",{id:s,className:k?h.homeTargetPicker:h.section,"data-whale-existing-session":!0,"aria-label":k?l("chooseVoiceTarget"):void 0,"data-no-drag":k||void 0,children:[!k&&(0,ae.jsxs)(ae.Fragment,{children:[(0,ae.jsx)("h3",{children:"\u8BED\u97F3\u5BF9\u8BDD\u76EE\u6807"}),(0,ae.jsxs)("div",{className:h.existingSessionTarget,children:[(0,ae.jsx)("strong",{className:h.sessionTitle,children:S?hn(S):"\u9C7C\u5E94\u4F1A\u8BDD"}),(0,ae.jsx)("p",{className:h.hint,children:S?"\u8BED\u97F3\u548C\u56DE\u7B54\u5199\u5165\u6B64\u4F1A\u8BDD\uFF0C\u9C7C\u5E94\u4EC5\u5728\u672C\u673A\u64AD\u62A5\u3002\u5176\u4ED6\u63D2\u4EF6\u7684\u8F6C\u53D1\u7531\u5176\u8BBE\u7F6E\u51B3\u5B9A\u3002":"\u53EF\u7ED1\u5B9A\u5DF2\u6709 DSH \u4F1A\u8BDD\uFF0C\u6CBF\u7528\u539F\u6765\u7684\u4E0A\u4E0B\u6587\u548C\u5386\u53F2\u3002"}),S&&fr(S)&&(0,ae.jsxs)("p",{role:"status",className:h.notice,children:[fr(S),"\u3002\u53EF\u89E3\u9664\u7ED1\u5B9A\u6216\u9009\u62E9\u5176\u4ED6\u4F1A\u8BDD\u3002"]}),!P&&(0,ae.jsx)("p",{role:"status",className:h.notice,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u4E0D\u652F\u6301\u7ED1\u5B9A\u5DF2\u6709\u4F1A\u8BDD\u3002"}),O?.enabled&&(0,ae.jsx)("p",{className:h.hint,children:"\u7ED3\u675F\u8BED\u97F3\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u7ED1\u5B9A\u3002"})]}),(0,ae.jsxs)("div",{className:h.actions,children:[(0,ae.jsx)(ht.Button,{variant:"outline","aria-expanded":z,disabled:!P||j,onClick:()=>{f(!z),y(null),b(""),z||fe()},children:z?"\u5173\u95ED\u4F1A\u8BDD\u5217\u8868":S?"\u66F4\u6362\u7ED1\u5B9A":"\u9009\u62E9\u5DF2\u6709\u4F1A\u8BDD"}),qt(S)&&i&&(0,ae.jsx)(ht.Button,{variant:"outline","data-whale-operation":"open-native-session",onClick:async()=>{W(null);try{await i(S.sessionId),await r?.()}catch{$.current&&W({error:!0,text:"DSH \u6682\u65F6\u65E0\u6CD5\u6253\u5F00\u539F\u4F1A\u8BDD\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"})}},children:"\u6253\u5F00\u539F\u4F1A\u8BDD"}),S&&(0,ae.jsx)(ht.Button,{variant:"outline","data-whale-operation":"unbind-existing-session",disabled:!K,onClick:()=>{ee(null)},children:"\u89E3\u9664\u7ED1\u5B9A"})]})]}),z&&(0,ae.jsxs)("div",{className:h.existingSessionPicker,"aria-busy":w,children:[(0,ae.jsxs)("form",{className:h.existingSessionSearch,onSubmit:le,children:[(0,ae.jsx)(ht.Input,{type:"search","aria-label":l("searchVoiceTargets"),placeholder:l("searchVoiceTargets"),value:m,maxLength:128,disabled:j,onChange:V=>b(V.target.value)}),(0,ae.jsx)(ht.Button,{type:"submit",variant:"outline",disabled:j,children:l("searchVoiceTargetsAction")})]}),u?.items.length>0&&(0,ae.jsx)("ul",{className:h.existingSessionList,"aria-label":l("existingVoiceTargetList"),children:u.items.map(V=>{let re=S?.sessionId===V.sessionId,ue=re||!qt(V),ye=(0,ae.jsxs)("span",{className:h.hint,children:[re?l("boundVoiceTarget")+" \xB7 ":"",l("voiceTargetAvailability_"+(V.unavailableReason??V.availability))," \xB7 ",V.sessionId]});return(0,ae.jsx)("li",{children:k?(0,ae.jsxs)(ht.Button,{variant:"ghost",className:h.homeTargetRow,"data-whale-operation":"bind-existing-session",title:V.sessionId,"aria-current":re||void 0,"aria-disabled":!q,disabled:ue,onClick:()=>{ee(V.sessionId)},children:[(0,ae.jsx)("strong",{className:h.sessionTitle,children:hn(V)}),ye]}):(0,ae.jsxs)("label",{title:V.sessionId,children:[(0,ae.jsx)("input",{type:"radio",name:I,value:V.sessionId,checked:v===V.sessionId,disabled:ue||w||j,onChange:()=>{y(V.sessionId),W(null)}}),(0,ae.jsxs)("span",{children:[(0,ae.jsx)("strong",{className:h.sessionTitle,children:hn(V)}),ye]})]})},V.sessionId)})}),G,!w&&!D&&u?.items.length===0&&(0,ae.jsx)("p",{role:"status",className:h.hint,children:l(u.query?"voiceTargetNoMatch":"voiceTargetEmptyList")}),L&&(0,ae.jsx)("p",{id:I+"-tts",className:h.hint,children:l("voiceTargetSynthesisNotice")}),E,(!k||u?.nextCursor||S)&&(0,ae.jsxs)("div",{className:h.actions,children:[!k&&(0,ae.jsx)(ht.Button,{variant:"primary","data-whale-operation":"bind-existing-session","aria-describedby":L?I+"-tts":void 0,disabled:!q||!qt(L)||L.sessionId===S?.sessionId,onClick:()=>{ee(v)},children:l(j?"savingVoiceTarget":"bindVoiceTarget")}),!!u?.nextCursor&&(0,ae.jsx)(ht.Button,{variant:"outline",disabled:w||j,onClick:()=>{fe(u.query,u.nextCursor)},children:l("moreVoiceTargets")}),k&&S&&(0,ae.jsx)(ht.Button,{variant:"outline","data-whale-operation":"unbind-existing-session",disabled:!K,onClick:()=>{ee(null)},children:l("backToFishVoice")})]})]}),!z&&(0,ae.jsxs)(ae.Fragment,{children:[G,E]})]})}var Dn=require("react"),Rn=require("@deepseek-ai/dsh-client-ui-primitives");var vr="dsh-fish-voice";var Hi={name:"Emikosama",url:"https://github.com/Emikosama"};var kd="https://github.com/Emikosama/dsh-fish-voice",bo={url:"https://github.com/Emikosama/dsh-fish-voice/issues"};var Ie=require("react/jsx-runtime");function Sd(e,t){let n=e.updates;return e.updatePending==="install"?t("update_installing"):e.updatePending==="check"?t("update_checking"):e.updatesUnavailable?t("updateConnection"):n?n.message||t("update_"+n.status):t("update_idle")}function Id({state:e,open:t,t:n}){let o=e.updates,i=!e.updatesUnavailable&&(o?.release||["restart-required","enable-required","installed"].includes(o?.status));return(0,Ie.jsxs)("section",{className:h.section,"data-whale-update-settings":!0,children:[(0,Ie.jsx)("h3",{children:n("updateTitle")}),o&&(0,Ie.jsxs)("p",{className:h.hint,children:[n("updateCurrentVersion")," ",o.currentVersion," \xB7 ",n("updateChannel_"+o.channel)]}),(0,Ie.jsx)("p",{children:Sd(e,n)}),(0,Ie.jsxs)("div",{className:h.actions,children:[i&&(0,Ie.jsx)(Rn.Button,{variant:"outline",onClick:()=>t(!1),children:n("updateDetails")}),(0,Ie.jsx)(Rn.Button,{variant:"outline",disabled:!!e.updatePending||!e.updatesUnavailable&&o?.status==="installing",onClick:()=>t(!0),children:n("updateCheck")}),(0,Ie.jsx)("a",{href:bo.url,"data-whale-operation":"open-feedback",target:"_blank",rel:"noreferrer noopener",children:n("updateFeedback")})]})]})}function Md({state:e,close:t,run:n,t:o}){let i=(0,Dn.useRef)(null),r=(0,Dn.useId)();(0,Dn.useLayoutEffect)(()=>{let m=i.current;return typeof m.showModal=="function"?m.showModal():m.setAttribute("open",""),()=>{m.open&&m.close?.()}},[]);let s=e.updates,a=s?.release,l=!!e.updatePending||!e.updatesUnavailable&&["checking","installing"].includes(s?.status),u=!e.updatesUnavailable&&!l&&s?.canInstall&&a,d=!l&&(e.updatesUnavailable||!["restart-required","enable-required"].includes(s?.status)),p=!e.updatesUnavailable&&["available","incompatible"].includes(s?.status),f=u&&!s.message?null:Sd(e,o);return(0,Ie.jsxs)("dialog",{ref:i,className:h.updateDialog,"data-whale-update-dialog":!0,"data-no-drag":!0,"aria-labelledby":r,onCancel:m=>{m.preventDefault(),t()},onKeyDown:m=>m.stopPropagation(),children:[(0,Ie.jsxs)("header",{className:h.updateHeader,children:[(0,Ie.jsx)(on,{}),(0,Ie.jsx)("h2",{id:r,children:o(p?"updateOfferTitle":"updateTitle")})]}),s&&(0,Ie.jsxs)("p",{className:h.hint,children:[o("updateCurrentVersion")," ",s.currentVersion,a&&a.version!==s.currentVersion&&(0,Ie.jsxs)(Ie.Fragment,{children:[" \xB7 ",o("updateNewVersion")," ",a.version]})," \xB7 ",o("updateChannel_"+s.channel)]}),a?.announcement&&(0,Ie.jsx)("p",{className:h.updateAnnouncement,children:a.announcement}),f&&(0,Ie.jsx)("p",{className:h.hint,role:"status",children:f}),(0,Ie.jsxs)("div",{className:h.actions,children:[(0,Ie.jsx)(Rn.Button,{variant:"outline",onClick:t,children:o(p?"updateLater":"close")}),u&&(0,Ie.jsx)(Rn.Button,{variant:"primary",className:h.primary,onClick:()=>{n({action:"install",version:a.version})},children:o("updateInstall")}),!u&&d&&(0,Ie.jsx)(Rn.Button,{variant:"outline",onClick:()=>{n({action:"check"})},children:o("updateCheck")})]}),(0,Ie.jsxs)("footer",{className:h.actions,children:[a?.url?.startsWith("https://")&&(0,Ie.jsx)("a",{href:a.url,target:"_blank",rel:"noreferrer noopener",children:o("updateRelease")}),(0,Ie.jsx)("a",{href:bo.url,"data-whale-operation":"open-feedback",target:"_blank",rel:"noreferrer noopener",children:o("updateFeedback")})]})]})}var Fh=new Map([["audio","settings-audio"],["interaction","settings-interaction"],["prompt","settings-prompt"],["models","settings-models"],["advanced","settings-advanced"],["pets","settings-pets"],["sessions","page-session-management"]]);function Uh(e){if(e.nativeEvent?.isTrusted!==!0)return null;let t=e.target;if(!t?.closest)return null;let n=t.closest("[data-whale-operation-log]");return n&&!(e.type==="click"&&t.closest("summary")?.parentElement===n)?null:t}function Cd(e){let t=Uh(e);if(!t)return null;if(e.type==="submit")return"commit-form";if(e.type==="keydown")return e.key==="Escape"?"dismiss":["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key)&&t.closest('[data-settings-nav], [role="listbox"]')?"keyboard-navigation":null;if(e.type==="change")return t.matches('input[type="radio"]')&&["listen-mode-ptt","listen-mode-always","listen-mode-wake"].includes(t.dataset.whaleOperation)?t.dataset.whaleOperation:t.closest("[data-audio-device-controls] select")?"change-audio-device":t.matches('select, input[type="radio"], input[type="checkbox"]')?"edit-choice":null;if(e.type!=="click")return null;let n=t.closest("button, a[href], summary");if(!n||n.type==="submit"&&n.form)return null;let o=n.dataset.whaleOperation;return o==="open-feedback"&&n.matches("summary")&&n.parentElement.open?"dismiss":n.matches("summary")&&["session-history","subagent-history"].includes(o)?o+(n.parentElement.open?"-close":"-open"):o||(n.hasAttribute("data-settings-tab")?Fh.get(n.dataset.settingsTab)??"page-settings-tab":n.closest("[data-whale-session-management], [data-whale-existing-session]")?"manage-session":n.closest("[data-settings-page-heading] nav")?"page-model-tab":n.matches("summary")?"details-toggle":"activate-control")}var Kt=require("react"),ji=require("@deepseek-ai/dsh-client-ui-primitives");var et=require("react/jsx-runtime"),Lh="fish-voice-operation-log.log",zd=256*1024,Vh=(e,t)=>(e+t).slice(-zd);function Pd({readOperationLog:e}){let[t,n]=(0,Kt.useState)(!1),[o,i]=(0,Kt.useState)(!1),[r,s]=(0,Kt.useState)(null),[a,l]=(0,Kt.useState)(null),u=(0,Kt.useRef)(null);if((0,Kt.useEffect)(()=>()=>u.current?.abort(),[]),!e)return null;let d=async f=>{if(u.current)return;let m=new AbortController;u.current=m,i(!0),l(null);try{let b=await e(m.signal);if(m.signal.aborted)return;if(f){let v=URL.createObjectURL(new Blob(b,{type:"text/plain;charset=utf-8"})),y=document.createElement("a");y.href=v,y.download=Lh,Hh(y),setTimeout(()=>URL.revokeObjectURL(v),1e3),l("\u5DF2\u8BF7\u6C42\u4FDD\u5B58\u8BCA\u65AD\u65E5\u5FD7\u3002")}else s({text:b.reduce(Vh,""),shortened:b.reduce((v,y)=>v+y.length,0)>zd})}catch{m.signal.aborted||l("\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u8BCA\u65AD\u65E5\u5FD7\uFF0C\u8BF7\u91CD\u8BD5\u3002")}finally{u.current===m&&(u.current=null),m.signal.aborted||i(!1)}},p=f=>{let m=f.currentTarget.open;n(m),m||(u.current?.abort(),u.current=null,i(!1),s(null),l(null))};return(0,et.jsxs)("details",{className:h.section,"data-whale-operation-log":!0,open:t,onToggle:p,children:[(0,et.jsx)("summary",{"data-whale-operation":"open-feedback",children:"\u6392\u67E5\u4E0E\u53CD\u9988"}),t&&(0,et.jsxs)(et.Fragment,{children:[(0,et.jsx)("p",{className:h.hint,children:"\u6700\u8FD1\u4E03\u5929\u7684\u64CD\u4F5C\u65E5\u5FD7\u3002\u53EF\u5148\u67E5\u770B\uFF0C\u518D\u81EA\u884C\u51B3\u5B9A\u662F\u5426\u968F\u53CD\u9988\u63D0\u4EA4\u3002"}),(0,et.jsxs)("div",{className:h.actions,children:[(0,et.jsx)(ji.Button,{variant:"outline",disabled:o,onClick:()=>{d(!1)},children:"\u67E5\u770B\u8BCA\u65AD\u65E5\u5FD7"}),(0,et.jsx)(ji.Button,{variant:"outline",disabled:o,onClick:()=>{d(!0)},children:"\u4FDD\u5B58\u8BCA\u65AD\u65E5\u5FD7"}),(0,et.jsx)("a",{href:bo.url+"/new",target:"_blank",rel:"noreferrer noopener",children:"\u63D0\u4EA4\u53CD\u9988"})]}),o&&(0,et.jsx)("p",{role:"status",className:h.hint,children:"\u6B63\u5728\u8BFB\u53D6\u8BCA\u65AD\u65E5\u5FD7\u2026"}),a&&(0,et.jsx)("p",{role:"status",className:h.hint,children:a}),r?.shortened&&(0,et.jsx)("p",{className:h.hint,children:"\u8FD9\u91CC\u53EA\u663E\u793A\u6700\u8FD1\u4E00\u6BB5\uFF0C\u4FDD\u5B58\u53EF\u53D6\u5F97\u5B8C\u6574\u65E5\u5FD7\u3002"}),r&&(0,et.jsx)("pre",{className:h.requestDetails,tabIndex:0,"aria-label":"\u64CD\u4F5C\u65E5\u5FD7\u9884\u89C8",children:r.text||"\u6682\u65E0\u64CD\u4F5C\u65E5\u5FD7\u3002"})]})]})}function Hh(e){document.body.append(e);try{e.click()}finally{e.remove()}}var Z=require("react"),J=require("@deepseek-ai/dsh-client-ui-primitives");var ve=require("react"),me=require("@deepseek-ai/dsh-client-ui-primitives");var B={primary:"_6xWkxa_primary",selectedModel:"_6xWkxa_selectedModel",section:"_6xWkxa_section",modelChoices:"_6xWkxa_modelChoices",installPath:"_6xWkxa_installPath",choices:"_6xWkxa_choices",badge:"_6xWkxa_badge",wizard:"_6xWkxa_wizard",choice:"_6xWkxa_choice",wizardBodyContent:"_6xWkxa_wizardBodyContent",switcher:"_6xWkxa_switcher",header:"_6xWkxa_header",jobs:"_6xWkxa_jobs",modelInstaller:"_6xWkxa_modelInstaller",jobHeading:"_6xWkxa_jobHeading",hardwareSummary:"_6xWkxa_hardwareSummary",actions:"_6xWkxa_actions",setupEnter:"_6xWkxa_setupEnter",installHistory:"_6xWkxa_installHistory",details:"_6xWkxa_details",note:"_6xWkxa_note",consentActions:"_6xWkxa_consentActions",field:"_6xWkxa_field",plan:"_6xWkxa_plan",wizardBody:"_6xWkxa_wizardBody",sourceChoices:"_6xWkxa_sourceChoices",inlineField:"_6xWkxa_inlineField",fullName:"_6xWkxa_fullName",switchRow:"_6xWkxa_switchRow",currentModel:"_6xWkxa_currentModel",job:"_6xWkxa_job",hint:"_6xWkxa_hint",text:`._6xWkxa_section {
  min-width: 0;
  color: var(--dsw-alias-label-primary);
  gap: 8px;
  display: grid;
}

._6xWkxa_section h3, ._6xWkxa_wizard h2, ._6xWkxa_plan h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
}

._6xWkxa_section p, ._6xWkxa_wizard p {
  margin: 0;
  line-height: 1.6;
}

._6xWkxa_hint, ._6xWkxa_section small, ._6xWkxa_wizard small {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 1.6;
}

._6xWkxa_note {
  border-left: 2px solid var(--dsw-alias-state-warn-primary);
  background: var(--dsw-alias-bg-layer-2);
  padding: 8px 12px;
  font-size: 12px;
}

._6xWkxa_actions, ._6xWkxa_header {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  display: flex;
}

._6xWkxa_header {
  justify-content: space-between;
  align-items: flex-start;
}

._6xWkxa_choices {
  border: 0;
  gap: 8px;
  min-width: 0;
  margin: 0;
  padding: 0;
  display: grid;
}

._6xWkxa_choices legend {
  color: var(--dsw-alias-label-secondary);
  padding: 0 0 8px;
  font-size: 12px;
}

._6xWkxa_choice {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  cursor: pointer;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 10px;
  display: flex;
}

._6xWkxa_choice[data-selected="true"] {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,var(--dsw-alias-bg-layer-1));
}

._6xWkxa_choice input {
  accent-color: var(--dsw-alias-brand-primary);
  margin: 4px 0 0;
}

._6xWkxa_choice span {
  min-width: 0;
}

._6xWkxa_choice small, ._6xWkxa_plan small {
  overflow-wrap: anywhere;
  display: block;
}

._6xWkxa_choice strong {
  font-size: 13px;
}

._6xWkxa_field {
  gap: 6px;
  font-size: 12px;
  display: grid;
}

._6xWkxa_field input, ._6xWkxa_field select {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}

._6xWkxa_field select {
  font: inherit;
  color: inherit;
  background: var(--dsw-alias-bg-layer-2);
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  padding: 8px;
}

._6xWkxa_details {
  border-top: 1px solid var(--dsw-alias-border-l2);
  min-width: 0;
  padding-top: 12px;
}

._6xWkxa_details summary {
  cursor: pointer;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

._6xWkxa_details[open] > summary {
  margin-bottom: 12px;
}

._6xWkxa_badge {
  border-radius: var(--dsw-radius-sm);
  color: var(--dsw-alias-label-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,var(--dsw-alias-bg-layer-1));
  margin-left: 8px;
  padding: 2px 6px;
  font-size: 11px;
}

._6xWkxa_plan, ._6xWkxa_job {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  gap: 10px;
  min-width: 0;
  padding: 12px;
  display: grid;
}

._6xWkxa_plan dl {
  grid-template-columns: auto minmax(0, 1fr);
  gap: 6px 12px;
  margin: 0;
  font-size: 12px;
  display: grid;
}

._6xWkxa_plan dt {
  color: var(--dsw-alias-label-secondary);
}

._6xWkxa_plan dd {
  overflow-wrap: anywhere;
  margin: 0;
}

._6xWkxa_plan a {
  color: var(--dsw-alias-link);
  overflow-wrap: anywhere;
  font-size: 12px;
}

._6xWkxa_plan ul {
  margin: 0;
  padding-left: 16px;
  font-size: 12px;
}

._6xWkxa_jobs {
  gap: 12px;
  display: grid;
}

._6xWkxa_job progress {
  width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
}

._6xWkxa_wizard {
  box-sizing: border-box;
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-layer-1);
  border-radius: var(--dsw-radius-lg);
}

._6xWkxa_section button, ._6xWkxa_wizard button {
  transition: transform var(--ds-transition-duration-fast, .1s) var(--whale-ease, ease-out);
}

._6xWkxa_section button:active:not(:disabled), ._6xWkxa_wizard button:active:not(:disabled) {
  transform: scale(.97);
}

._6xWkxa_section :is(button, input, select, a, summary):focus-visible, ._6xWkxa_wizard :is(button, summary):focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

[data-motion="firm"] ._6xWkxa_wizard {
  --whale-duration: var(--ds-transition-duration-fast, .1s);
  --whale-ease: ease-out;
}

[data-motion="off"] ._6xWkxa_wizard, [data-motion="off"] ._6xWkxa_wizard *, [data-motion="off"] ._6xWkxa_section * {
  transition: none !important;
  animation: none !important;
  transform: none !important;
}

@keyframes _6xWkxa_setupEnter {
  from {
    translate: 0 4px;
  }

  to {
    translate: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  ._6xWkxa_wizard, ._6xWkxa_wizard *, ._6xWkxa_section * {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
}

@media (width <= 520px) {
  ._6xWkxa_wizard {
    padding: 12px;
  }

  ._6xWkxa_plan dl {
    grid-template-columns: minmax(0, 1fr);
    gap: 3px;
  }

  ._6xWkxa_plan dd {
    margin-bottom: 6px;
  }
}

@media (forced-colors: active) {
  ._6xWkxa_choice[data-selected="true"] {
    outline: 2px solid highlight;
  }
}

._6xWkxa_wizard {
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

._6xWkxa_wizard > ._6xWkxa_header, ._6xWkxa_wizard > footer {
  flex-shrink: 0;
}

._6xWkxa_wizardBody {
  overscroll-behavior: contain;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

._6xWkxa_wizardBodyContent {
  align-content: start;
  gap: 12px;
  display: grid;
}

._6xWkxa_primary {
  color: var(--dsw-alias-label-primary) !important;
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 16%,var(--dsw-alias-bg-layer-2)) !important;
  border: 1px solid var(--dsw-alias-border-l2) !important;
}

._6xWkxa_primary:disabled {
  opacity: .5;
}

._6xWkxa_choices {
  gap: 6px;
}

._6xWkxa_choice {
  box-sizing: border-box;
  align-items: center;
  min-height: 38px;
}

._6xWkxa_choice input {
  flex: none;
  margin: 0;
}

._6xWkxa_choice strong {
  display: block;
}

._6xWkxa_choice:has(input:disabled) {
  cursor: default;
  opacity: .65;
}

._6xWkxa_note p {
  margin: 0;
}

._6xWkxa_note button {
  margin-top: 8px;
}

._6xWkxa_wizard > footer {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

._6xWkxa_wizardBody {
  padding: 2px 4px 8px 0;
}

._6xWkxa_section > button, ._6xWkxa_wizardBody > button {
  justify-self: start;
  max-width: 100%;
}

._6xWkxa_section button, ._6xWkxa_wizard button {
  white-space: normal;
  max-width: 100%;
  height: auto;
  min-height: 36px;
}

._6xWkxa_actions > button {
  flex: 0 auto;
}

._6xWkxa_sourceChoices {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

._6xWkxa_sourceChoices legend {
  grid-column: 1 / -1;
}

._6xWkxa_inlineField {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-width: 0;
  font-size: 12px;
  display: flex;
}

._6xWkxa_inlineField select {
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

._6xWkxa_inlineField input[type="number"] {
  width: 80px;
  min-width: 0;
}

._6xWkxa_field:has( > input[type="number"]) {
  flex-wrap: wrap;
  align-items: center;
  display: flex;
}

._6xWkxa_field > input[type="number"] {
  width: 80px;
}

._6xWkxa_details > summary {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  box-sizing: content-box;
  width: fit-content;
  max-width: 100%;
  min-height: 20px;
  padding: 7px 10px;
}

._6xWkxa_fullName {
  min-width: 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

._6xWkxa_fullName summary {
  cursor: pointer;
}

._6xWkxa_fullName p {
  overflow-wrap: anywhere;
}

._6xWkxa_consentActions {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  display: flex;
}

@container (width <= 360px) {
  ._6xWkxa_sourceChoices {
    grid-template-columns: minmax(0, 1fr);
  }

  ._6xWkxa_inlineField select {
    width: 150px;
  }
}

@media (width <= 420px) {
  ._6xWkxa_wizard ._6xWkxa_sourceChoices {
    grid-template-columns: minmax(0, 1fr);
  }
}

._6xWkxa_modelChoices {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

._6xWkxa_modelChoices > legend {
  grid-column: 1 / -1;
  padding-bottom: 5px;
}

._6xWkxa_modelChoices ._6xWkxa_choice {
  gap: 7px;
  min-height: 80px;
  padding: 8px;
}

._6xWkxa_modelChoices ._6xWkxa_choice strong {
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  display: flex;
}

._6xWkxa_modelChoices ._6xWkxa_badge {
  white-space: nowrap;
  margin-left: 0;
}

._6xWkxa_hardwareSummary {
  color: var(--dsw-alias-label-secondary);
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 2px 10px;
  font-size: 11px;
  display: flex;
}

._6xWkxa_hardwareSummary small {
  font-size: 10px;
}

._6xWkxa_currentModel, ._6xWkxa_switchRow, ._6xWkxa_jobHeading {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

._6xWkxa_currentModel {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  padding: 7px 8px;
  font-size: 12px;
}

._6xWkxa_currentModel > span, ._6xWkxa_switchRow > span {
  overflow-wrap: anywhere;
  min-width: 0;
}

._6xWkxa_currentModel button, ._6xWkxa_switchRow button {
  flex: none;
  min-height: 30px;
  padding: 0 9px;
}

._6xWkxa_switcher {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  gap: 7px;
  padding: 8px;
  display: grid;
}

._6xWkxa_switchRow small {
  display: block;
}

._6xWkxa_selectedModel {
  border-top: 1px solid var(--dsw-alias-border-l2);
  gap: 7px;
  padding-top: 6px;
  display: grid;
}

._6xWkxa_selectedModel ._6xWkxa_details {
  padding-top: 4px;
}

._6xWkxa_selectedModel ._6xWkxa_details summary {
  border: 0;
  padding: 3px 0;
}

._6xWkxa_installHistory {
  border-top: 1px solid var(--dsw-alias-border-l2);
}

._6xWkxa_installHistory > summary {
  cursor: pointer;
  padding: 8px 0;
  font-size: 12px;
  display: list-item;
}

._6xWkxa_installHistory > summary small {
  margin-left: 12px;
}

._6xWkxa_installHistory ._6xWkxa_job {
  gap: 6px;
  padding: 9px;
}

._6xWkxa_jobHeading {
  flex-wrap: wrap;
}

._6xWkxa_installPath {
  min-width: 0;
  font-size: 11px;
}

._6xWkxa_installPath summary {
  cursor: pointer;
  color: var(--dsw-alias-label-secondary);
}

._6xWkxa_installPath p {
  overflow-wrap: anywhere;
}

._6xWkxa_modelInstaller ._6xWkxa_jobs:empty {
  display: none;
}

@container (width <= 300px) {
  ._6xWkxa_modelChoices {
    grid-template-columns: minmax(0, 1fr);
  }

  ._6xWkxa_currentModel {
    flex-wrap: wrap;
  }
}

._6xWkxa_section[aria-label="\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84"] p {
  overflow-wrap: anywhere;
}

._6xWkxa_choice {
  transition: background-color .12s ease-out, border-color .12s ease-out, box-shadow .12s ease-out;
}

._6xWkxa_choice:hover:has(input:not(:disabled)) {
  border-color: var(--dsw-alias-brand-primary);
}

._6xWkxa_choice:has(input:focus-visible) {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: 2px;
}

._6xWkxa_section :is(button, select, input, summary), ._6xWkxa_wizard :is(button, select, input, summary) {
  transition: background-color .12s ease-out,border-color .12s ease-out,color .12s ease-out,transform var(--whale-duration, .2s) var(--whale-ease, ease-out);
}

._6xWkxa_section button:hover:not(:disabled), ._6xWkxa_wizard button:hover:not(:disabled) {
  background-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,var(--dsw-alias-bg-layer-1));
}

._6xWkxa_plan, ._6xWkxa_switcher, ._6xWkxa_selectedModel, ._6xWkxa_section [data-whale-save-result], ._6xWkxa_wizardBodyContent > section {
  animation: _6xWkxa_setupEnter var(--whale-duration, .2s) ease-out;
}

[data-motion="firm"] :is(._6xWkxa_section, ._6xWkxa_wizard) {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="off"] :is(._6xWkxa_section, ._6xWkxa_wizard), [data-motion="off"] :is(._6xWkxa_section, ._6xWkxa_wizard) *, [data-motion="off"] :is(._6xWkxa_section, ._6xWkxa_wizard) :before {
  transition: none !important;
  animation: none !important;
}

[data-motion="off"] :is(._6xWkxa_section, ._6xWkxa_wizard) button:active {
  transform: none !important;
}

@media (prefers-reduced-motion: reduce) {
  ._6xWkxa_section, ._6xWkxa_wizard, ._6xWkxa_section *, ._6xWkxa_wizard *, ._6xWkxa_section :before, ._6xWkxa_wizard :before {
    transition: none !important;
    animation: none !important;
  }

  ._6xWkxa_section button:active, ._6xWkxa_wizard button:active {
    transform: none !important;
  }
}
`};var g=require("react/jsx-runtime"),Ad=[["deepseek","DeepSeek \u8BED\u97F3\u5408\u6210","\u5B98\u65B9 API \xB7 \u9ED8\u8BA4\u97F3\u8272\u6D77\u661F"],["local","\u672C\u5730\u8BED\u97F3\u6A21\u578B","\u5728\u672C\u673A\u5408\u6210\uFF0C\u9996\u6B21\u9700\u8981\u4E0B\u8F7D"],["custom","\u81EA\u5B9A\u4E49 TTS","\u517C\u5BB9 OpenAI \u97F3\u9891\u63A5\u53E3\u7684\u8BED\u97F3\u670D\u52A1"],["off","\u4E0D\u53D1\u58F0","\u53EA\u663E\u793A\u6587\u5B57"]],Wd={deepseek:"DeepSeek \u8BED\u97F3\u5408\u6210",local:"\u672C\u5730\u8BED\u97F3\u6A21\u578B",custom:"\u81EA\u5B9A\u4E49 TTS"},br={provider:"deepseek",deepseekVoice:"stella",deepseekTextTransmissionAccepted:!1,volume:.8,localModelId:null,localModelPath:null,referenceAudioPath:null},jh={baseUrl:"",model:"",voice:"",apiKeyEnv:null,format:"wav",textTransmissionAccepted:!1},Ed="\u8BF7\u5728 DSH \u7684 DeepSeek API Key \u63D0\u4F9B\u5546\u4E2D\u914D\u7F6E\u5F00\u653E\u5E73\u53F0\u5BC6\u94A5\uFF0C\u518D\u91CD\u65B0\u68C0\u67E5\u3002",Td="\u6717\u8BFB\u548C\u8BD5\u542C\u4F1A\u5411 DeepSeek \u53D1\u9001\u5F85\u6717\u8BFB\u7684\u6587\u5B57\uFF0C\u6309\u5B57\u7B26\u7528\u91CF\u8BA1\u8D39\u3002",xo=e=>e.authorization?.scopes?.some(t=>t.id==="deepseek-text"&&t.allowed)===!0,qi=e=>e.authorization?.scopes?.some(t=>t.id==="custom-tts-text"&&t.allowed)===!0,Ki=e=>{let t={...e};return delete t.referenceAudioAccepted,t},$d=(e,t)=>{let n=Ki(e);return delete n.customTts,{...n,referenceAudioAccepted:e.referenceAudioPath===t?.referenceAudioPath&&t?.referenceAudioAccepted===!0}},Od=B.text,qh=e=>({"restart-requires-resume":"\u5BBF\u4E3B\u5DF2\u91CD\u542F\uFF0C\u8BF7\u7EE7\u7EED\u540E\u91CD\u65B0\u6838\u9A8C\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u8986\u76D6\u8BBE\u7F6E\u3002","authorization-changed":"\u6388\u6743\u5DF2\u6539\u53D8\uFF0C\u8BF7\u5728\u6743\u9650\u4E2D\u6838\u67E5\u540E\u7EE7\u7EED\u3002",MODEL_SOURCE_AUTHORIZATION_REQUIRED:"\u6A21\u578B\u6765\u6E90\u6388\u6743\u5DF2\u53D8\u5316\uFF0C\u8BF7\u8865\u5145\u4E00\u6B21\u6388\u6743\u540E\u7EE7\u7EED\u3002",HUMAN_SETTING_PINNED:"\u8BBE\u7F6E\u6743\u9650\u5DF2\u64A4\u9500\uFF0C\u8BF7\u5728\u6743\u9650\u4E2D\u6838\u67E5\u540E\u7EE7\u7EED\u3002"})[e]??(typeof e=="string"&&/^[A-Z_:-]+$/.test(e)?"\u8FD0\u884C\u68C0\u67E5\u672A\u901A\u8FC7\uFF0C\u8BF7\u68C0\u67E5\u4F9D\u8D56\u6216\u67E5\u770B\u9AD8\u7EA7\u8BBE\u7F6E\u4E2D\u7684\u9519\u8BEF\u3002":e),_t=e=>Number.isFinite(e)&&e>=0?`${(e/1024**2).toFixed(1)} MiB`:"\u672A\u77E5",Kh={"live-root-conflict":{kind:"conflict",label:"voiceRecoveryPending",hint:"voiceRecoveryHint"},"predecessor-cleanup-pending":{kind:"cleanup",label:"voiceCleanupPending",hint:"voiceCleanupHint"},"helper-cleanup-pending":{kind:"cleanup",label:"voiceCleanupPending",hint:"voiceHelperCleanupHint"},"predecessor-stop-unconfirmed":{kind:"restart",label:"voiceRestartPending",hint:"voiceRestartHint"},"helper-stop-unconfirmed":{kind:"restart",label:"voiceRestartPending",hint:"voiceHelperRestartHint"},"root-stop-unconfirmed":{kind:"restart",label:"voiceRestartPending",hint:"voiceRootRestartHint"}};function yr(e,t){return e.checkedFor!==t?null:Kh[e.status?.voiceSession?.recovery?.kind]??null}var Ji=e=>!e.ttsCancelling&&!e.voiceStopUnconfirmed&&(!e.busy||!!(e.interruptibleRead&&!e.diagnosticStopPending));function yo(e,t){let n=e.checkedFor===t?e.status:null;return!e.uncertain&&n?.enabled===!1&&n.ownerSessionId===null&&n.voiceControlBusy===!1&&n.voiceSession?.fullyStopped===!0&&n.voiceSession.id===null&&!yr(e,t)}function Rd(e,t){return!!(yo(e,t)&&e.settingsFor===t&&e.settings?.revision&&!e.ttsCancelling&&!e.ttsUncertain&&!e.visibilityUncertain&&!e.settingsConflict&&!e.status.ttsRuntime?.busy&&!e.status.ttsRuntime?.blocked)}function gn(e,t){return!e.busy&&Rd(e,t)}function Zn(e,t){let n=(0,ve.useRef)(!1),[o,i]=(0,ve.useState)(!1),[r,s]=(0,ve.useState)(null),[a,l]=(0,ve.useState)(0);return[async(d,p)=>{if(n.current)return!1;n.current=!0,i(!0),s(d);try{return await e(t,d,p)}catch{return!1}finally{n.current=!1,i(!1),s(null),l(f=>f+1)}},o,r,{isLocked:()=>n.current,settled:a}]}function _r({state:e,sessionId:t,run:n,refresh:o,canStopTts:i=!0,t:r=s=>s}){if(Rd(e,t))return null;let s=e.checkedFor===t?e.status:null,a=yr(e,t),l=e.settingsFor===t&&e.settings?.revision,u,d,p;e.voiceStopUnconfirmed?(u="\u505C\u6B62\u7ED3\u679C\u5C1A\u5F85\u786E\u8BA4\u3002",d=r("retryStatus"),p="status"):a?(u=r(a.hint),a.kind==="conflict"&&(d=r("voiceRecoveryCheck"),p="disable"),a.kind==="cleanup"&&(d=r("retryStatus"),p="status")):s?.enabled||s?.ownerSessionId?(u="\u8BF7\u5148\u505C\u6B62\u8BED\u97F3\uFF0C\u518D\u7F16\u8F91\u6216\u8BD5\u542C\u3002",d="\u505C\u6B62\u8BED\u97F3\u4EE5\u7F16\u8F91",p="disable"):e.settingsConflict?u="\u8BBE\u7F6E\u5DF2\u5728\u522B\u5904\u66F4\u65B0\u3002\u8BF7\u5148\u5904\u7406\u5F53\u524D\u8349\u7A3F\u3002":e.ttsCancelling||e.busy&&(!s||!l)?u="\u6B63\u5728\u8BFB\u53D6\u3001\u4FDD\u5B58\u6216\u505C\u6B62\u8BED\u97F3\uFF0C\u8BF7\u7A0D\u5019\u2026":s?.ttsRuntime?.blocked?u="\u6717\u8BFB\u505C\u6B62\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u91CD\u542F DSH\u3002":s?.ttsRuntime?.busy?(u="\u6717\u8BFB\u6B63\u5728\u8FDB\u884C\uFF0C\u7ED3\u675F\u540E\u53EF\u7F16\u8F91\u3002",i&&(d="\u505C\u6B62\u8BD5\u542C",p="cancel-tts")):e.ttsUncertain||e.uncertain||e.visibilityUncertain?(u="\u4E0A\u6B21\u64CD\u4F5C\u7684\u72B6\u6001\u5C1A\u5F85\u6838\u67E5\u3002",d=r("retryStatus"),p=e.visibilityUncertain||!s?"read-settings":"status"):!s||!l?(u=e.sourcePending&&!e.error?"\u6B63\u5728\u8BFB\u53D6\u8BED\u97F3\u72B6\u6001\u548C\u8BBE\u7F6E\u2026":"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u8BED\u97F3\u72B6\u6001\u6216\u8BBE\u7F6E\u3002",d="\u91CD\u65B0\u8BFB\u53D6",p=l?"status":"read-settings"):(u="\u8BED\u97F3\u5C1A\u672A\u786E\u8BA4\u505C\u6B62\u3002\u8BF7\u91CD\u65B0\u8BFB\u53D6\u72B6\u6001\u540E\u7F16\u8F91\u3002",d=r("retryStatus"),p="status");let f=()=>{p==="read-settings"&&o?o({settings:!0,force:!0}):n?.(t,p)};return(0,g.jsxs)("div",{className:B.note,role:"status","data-whale-settings-gate":a?.kind??p??"notice",children:[(0,g.jsx)("p",{children:u}),p&&n&&(0,g.jsx)(me.Button,{variant:"outline","data-whale-operation":p==="disable"?"stop-voice":void 0,disabled:p==="disable"?!Ji(e):p!=="cancel-tts"&&e.busy,onClick:f,children:d})]})}function Dd(e){let t=e.state.settingsFor===e.sessionId?e.state.settings:null;return(0,g.jsx)(Yh,{...e,settings:t},`${e.sessionId}:${e.state.settingsKey??t?.revision??"unread"}`)}function Zd({value:e,disabled:t,onChange:n}){return(0,g.jsxs)("label",{className:B.inlineField,children:["DeepSeek \u97F3\u8272",(0,g.jsxs)("select",{"aria-label":"DeepSeek \u97F3\u8272",value:e,disabled:t,onChange:o=>n(o.target.value),children:[(0,g.jsx)("option",{value:"stella",children:"\u6D77\u661F \xB7 \u5973\u58F0"}),(0,g.jsx)("option",{value:"tide",children:"\u6697\u6F6E \xB7 \u7537\u58F0"})]})]})}function Jh({baseUrl:e,model:t,voice:n,apiKeyEnv:o}){let i=/[\x00-\x1f\x7f-\x9f]/;if(!e.trim()||!t.trim()||!n.trim())return"\u8BF7\u586B\u5199\u670D\u52A1\u5730\u5740\u3001\u6A21\u578B\u548C\u97F3\u8272\u3002";let r=e.trim(),s=/^https?:\/\/([^/]+)/i.exec(r)?.[1],a;try{a=new URL(r)}catch{}return!a||!s||/[\s\\?#]/.test(r)||s.includes("@")||i.test(e)||a.protocol==="http:"&&!/^(?:localhost|127\.0\.0\.1|\[::1\])(?::[0-9]+)?$/i.test(s)?"\u8BF7\u4F7F\u7528 HTTPS \u5730\u5740\u3002\u672C\u673A\u7684 localhost\u3001127.0.0.1 \u548C [::1] \u4E5F\u53EF\u4F7F\u7528 HTTP\u3002\u5730\u5740\u4E0D\u80FD\u5305\u542B\u8D26\u53F7\u3001\u5BC6\u7801\u3001\u67E5\u8BE2\u53C2\u6570\u6216\u7247\u6BB5\u3002":i.test(t)||i.test(n)?"\u6A21\u578B\u548C\u97F3\u8272\u4E0D\u80FD\u5305\u542B\u63A7\u5236\u5B57\u7B26\u3002":o?.trim()&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(o.trim())?"API Key \u73AF\u5883\u53D8\u91CF\u540D\u53EA\u80FD\u5305\u542B\u82F1\u6587\u5B57\u6BCD\u3001\u6570\u5B57\u548C\u4E0B\u5212\u7EBF\uFF0C\u4E14\u4E0D\u80FD\u4EE5\u6570\u5B57\u5F00\u5934\u3002":null}function Gh({value:e,disabled:t,fieldError:n,onChange:o,onConsent:i}){return(0,g.jsxs)("div",{className:B.section,"data-custom-tts":!0,children:[(0,g.jsxs)("label",{className:B.field,children:["\u670D\u52A1\u5730\u5740\uFF08Base URL\uFF09",(0,g.jsx)(me.Input,{value:e.baseUrl,disabled:t,maxLength:2048,inputMode:"url",autoComplete:"off",spellCheck:!1,placeholder:"https://tts.example.com/v1",onChange:r=>o("baseUrl",r.target.value)}),(0,g.jsx)("small",{children:"\u53EF\u586B\u5199\u57FA\u7840\u5730\u5740\u6216\u4EE5 /audio/speech \u7ED3\u5C3E\u7684\u5B8C\u6574\u63A5\u53E3\u5730\u5740\u3002"})]}),(0,g.jsxs)("label",{className:B.field,children:["\u6A21\u578B",(0,g.jsx)(me.Input,{value:e.model,disabled:t,maxLength:256,autoComplete:"off",spellCheck:!1,onChange:r=>o("model",r.target.value)})]}),(0,g.jsxs)("label",{className:B.field,children:["\u97F3\u8272",(0,g.jsx)(me.Input,{value:e.voice,disabled:t,maxLength:256,autoComplete:"off",spellCheck:!1,onChange:r=>o("voice",r.target.value)})]}),(0,g.jsxs)("label",{className:B.field,children:["API Key \u73AF\u5883\u53D8\u91CF\u540D\uFF08\u53EF\u9009\uFF09",(0,g.jsx)(me.Input,{value:e.apiKeyEnv??"",disabled:t,maxLength:128,autoComplete:"off",spellCheck:!1,placeholder:"MY_TTS_API_KEY",onChange:r=>o("apiKeyEnv",r.target.value)}),(0,g.jsx)("small",{children:"\u5728\u8FD0\u884C DSH \u7684\u73AF\u5883\u4E2D\u8BBE\u7F6E\u5BC6\u94A5\uFF0C\u8FD9\u91CC\u53EA\u586B\u53D8\u91CF\u540D\u3002\u670D\u52A1\u65E0\u9700\u5BC6\u94A5\u65F6\u53EF\u7559\u7A7A\u3002"})]}),(0,g.jsxs)("label",{className:B.inlineField,children:["\u97F3\u9891\u683C\u5F0F",(0,g.jsxs)("select",{value:e.format,disabled:t,onChange:r=>o("format",r.target.value),children:[(0,g.jsx)("option",{value:"wav",children:"WAV"}),(0,g.jsx)("option",{value:"mp3",children:"MP3"})]})]}),(0,g.jsx)("p",{className:B.hint,children:"\u6717\u8BFB\u4F1A\u5411\u670D\u52A1\u53D1\u9001\u56DE\u7B54\u4E2D\u5F85\u6717\u8BFB\u7684\u6587\u5B57\u3002\u4FDD\u5B58\u8BBE\u7F6E\u540E\u53EF\u53D1\u9001\u56FA\u5B9A\u793A\u4F8B\u8BD5\u542C\u3002"}),(0,g.jsxs)("label",{className:B.inlineField,children:[(0,g.jsx)("input",{type:"checkbox",checked:e.textTransmissionAccepted,disabled:t,onChange:r=>i(r.target.checked)}),"\u540C\u610F\u53D1\u9001\u5F85\u6717\u8BFB\u7684\u6587\u5B57"]}),n&&(0,g.jsx)("p",{className:B.hint,role:"status",children:n})]})}function Yh({state:e,sessionId:t,run:n,settings:o,prepared:i=!1,active:r=!0,markSettingsEdited:s,pickPath:a}){let[l,u]=(0,ve.useState)(()=>({...br,...o?.ttsSetup})),[d,p]=(0,ve.useState)(null),[f,m,b]=Zn(n,t),v=(0,ve.useId)(),[y,w]=(0,ve.useState)(!1),C=e.ttsCapabilitiesFor===t?e.ttsCapabilities:null,D=e.checkedFor===t?e.status?.ttsRuntime:null,F=e.ttsPreviewFor===t?e.ttsPreview:null,N=e.installerFor===t?e.installer?.jobs?.find(he=>wr(he,o)):null,W=!gn(e,t)||m,M=l.provider==="deepseek",$=l.provider==="custom",I={...br,...o?.ttsSetup},{customTts:k,...z}=l,O=$?k:I.customTts,S=O?{...z,customTts:O}:z,P=Object.entries(S).some(([he,oe])=>JSON.stringify(oe)!==JSON.stringify(I[he])),A=k??jh,j=$?Jh(A):null,L=qi(e),K=$&&(e.authorizationUncertain||I.customTts?.textTransmissionAccepted&&!e.authorization),q=$&&!L,le=(d?.revision===e.authorization?.revision?d?.accepted:void 0)??(A.textTransmissionAccepted&&L),ee=M&&(e.authorizationUncertain||l.deepseekTextTransmissionAccepted&&!e.authorization),G=M&&!ee&&!(l.deepseekTextTransmissionAccepted&&xo(e)),E=M&&C?.deepseekKeyAvailable!==!0,V=he=>{s?.("save-tts"),u(oe=>({...oe,...he}))},re=(he,oe)=>{A[he]!==oe&&(p(null),V({customTts:{...A,[he]:oe,textTransmissionAccepted:!1}}))},ue=he=>{p({revision:e.authorization?.revision,accepted:he}),V({customTts:{...A,textTransmissionAccepted:he}})},ye=l.localModelId==="qwen3-tts-base-1.7b-gguf",Xe=Number(l.volume),Be=!E&&!ee&&(!$||!j&&!K&&le)&&(l.provider!=="local"||!!(l.localModelId&&l.localModelPath)&&(!l.referenceAudioPath||ye))&&l.volume!==""&&Number.isFinite(Xe)&&Xe>=0&&Xe<=1,it={...S,volume:Xe,deepseekTextTransmissionAccepted:M||l.deepseekTextTransmissionAccepted};$&&(it.customTts={...A,baseUrl:A.baseUrl.trim(),model:A.model.trim(),voice:A.voice.trim(),apiKeyEnv:A.apiKeyEnv?.trim()||null,textTransmissionAccepted:le});let Jt=async()=>{await f("save-tts",{revision:o.revision,values:Ki(it)})&&p(null)};return(0,g.jsxs)("section",{className:B.section,"aria-label":"\u6717\u8BFB\u8BBE\u7F6E","data-settings-draft":"save-tts",children:[(0,g.jsx)("header",{children:(0,g.jsx)("h3",{children:"\u56DE\u7B54\u600E\u4E48\u53D1\u58F0"})}),!i&&(0,g.jsx)(_r,{state:e,sessionId:t,run:n,canStopTts:!1}),!M&&!$&&(!i||!o||!C||e.uncertain||e.ttsUncertain)&&(0,g.jsx)("div",{className:B.actions,children:(0,g.jsx)(me.Button,{variant:"outline",disabled:e.busy||m,onClick:()=>f("inspect-tts"),children:"\u68C0\u6D4B\u672C\u673A\u8BED\u97F3"})}),(0,g.jsxs)("fieldset",{className:`${B.choices} ${B.sourceChoices}`,disabled:W||!o,children:[(0,g.jsx)("legend",{children:"\u6717\u8BFB\u6765\u6E90"}),Ad.map(([he,oe,je])=>(0,g.jsxs)("label",{className:B.choice,"data-selected":l.provider===he,children:[(0,g.jsx)("input",{type:"radio",name:v,checked:l.provider===he,onChange:()=>V({provider:he})}),(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:oe}),(0,g.jsx)("small",{children:je})]})]},he))]}),M&&(0,g.jsxs)("div",{className:B.section,children:[(0,g.jsx)("p",{className:B.hint,children:Td}),ee&&(0,g.jsx)("p",{role:"status",className:B.hint,children:"\u6B63\u5728\u8BFB\u53D6 DeepSeek \u6717\u8BFB\u6388\u6743\u2026"}),G&&(0,g.jsx)("p",{className:B.hint,children:"\u542F\u7528\u524D\uFF0C\u56DE\u7B54\u53EA\u663E\u793A\u6587\u5B57\u3002\u8BD5\u542C\u53EA\u53D1\u9001\u56FA\u5B9A\u793A\u4F8B\u3002"}),E&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("p",{role:"status",className:B.hint,children:Ed}),(0,g.jsx)(me.Button,{variant:"outline",disabled:e.busy||m,onClick:()=>f("inspect-tts"),children:C?"\u91CD\u65B0\u68C0\u67E5 DeepSeek API Key":"\u68C0\u67E5 DeepSeek API Key"})]}),(0,g.jsx)(Zd,{value:l.deepseekVoice,disabled:W,onChange:he=>V({deepseekVoice:he})})]}),$&&(0,g.jsx)(Gh,{value:{...A,textTransmissionAccepted:le},disabled:W||K,fieldError:K?"\u6B63\u5728\u8BFB\u53D6\u81EA\u5B9A\u4E49 TTS \u6717\u8BFB\u6388\u6743\u2026":j,onChange:re,onConsent:ue}),l.provider==="local"&&(l.localModelId?(0,g.jsxs)("div",{className:B.section,children:[(0,g.jsxs)("div",{className:B.currentModel,children:[(0,g.jsxs)("span",{children:["\u5F53\u524D\u6717\u8BFB\u6A21\u578B ",(0,g.jsx)("strong",{children:l.localModelId.startsWith("qwen3")?"Qwen3-TTS":l.localModelId.includes("melo")?"MeloTTS":l.localModelId})]}),(0,g.jsx)(me.Button,{variant:"outline","aria-expanded":y,disabled:P,onClick:()=>w(he=>!he),children:"\u5207\u6362\u5F53\u524D\u6A21\u578B"})]}),y&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(Fd,{state:e,sessionId:t,run:n,purpose:"tts"}),(0,g.jsxs)("details",{className:B.details,children:[(0,g.jsx)("summary",{children:"\u5B89\u88C5\u5176\u4ED6\u6717\u8BFB\u6A21\u578B"}),(0,g.jsx)(xr,{pickPath:a,state:e,sessionId:t,run:n,active:r})]})]})]}):(0,g.jsx)(xr,{pickPath:a,state:e,sessionId:t,run:n,active:r})),l.provider==="local"&&!P&&N?.modelId==="qwen3-tts-base-1.7b-gguf"&&(0,g.jsxs)("p",{className:B.hint,children:["\u5F53\u524D\u5B89\u88C5\u65B9\u6848\uFF1A",_o(N.compute),"\u3002",N.compute==="cpu"?"\u6B64\u5B89\u88C5\u53EA\u4F7F\u7528 CPU\u3002\u53EF\u5728\u201C\u5207\u6362\u5F53\u524D\u6A21\u578B \u2192 \u5B89\u88C5\u5176\u4ED6\u6717\u8BFB\u6A21\u578B\u201D\u9009\u62E9\u81EA\u52A8 GPU\uFF1B\u4E0B\u8F7D\u8FD0\u884C\u7EC4\u4EF6\u524D\u4ECD\u9700\u786E\u8BA4\u3002":"\u662F\u5426\u5B9E\u9645\u4F7F\u7528 GPU\uFF0C\u4EE5\u5B8C\u6210\u5408\u6210\u540E\u7684\u672C\u5730\u8BA1\u7B97\u72B6\u6001\u4E3A\u51C6\u3002"]}),(0,g.jsxs)("details",{className:B.details,children:[(0,g.jsx)("summary",{children:"\u97F3\u8272\u4E0E\u97F3\u91CF"}),(0,g.jsxs)("div",{className:B.section,children:[l.provider==="local"&&(ye||l.referenceAudioPath)&&(0,g.jsxs)("div",{className:B.section,"data-reference-voice":!0,children:[(0,g.jsx)(go,{className:B.field,label:"\u53C2\u8003\u97F3\u9891\uFF08WAV\uFF09",kind:"referenceAudio",value:l.referenceAudioPath,disabled:W||!ye,active:r,scope:l.provider+":"+l.localModelId,pickPath:a,sessionId:t,placeholder:"\u8BF7\u70B9\u51FB\u9009\u62E9\u6587\u4EF6",onChange:he=>V({referenceAudioPath:he.trim()||null})}),l.referenceAudioPath&&(0,g.jsx)(me.Button,{variant:"outline",disabled:W,onClick:()=>V({referenceAudioPath:null}),children:"\u6E05\u9664\u53C2\u8003\u97F3\u8272"})]}),l.provider!=="local"&&l.referenceAudioPath&&(0,g.jsxs)("div",{className:B.section,children:[(0,g.jsx)("p",{className:B.hint,children:"\u672C\u5730\u53C2\u8003\u97F3\u8272\u5DF2\u4FDD\u7559\u3002"}),(0,g.jsx)(me.Button,{variant:"outline",disabled:W,onClick:()=>V({referenceAudioPath:null}),children:"\u6E05\u9664\u53C2\u8003\u97F3\u8272"})]}),(0,g.jsxs)("label",{className:B.inlineField,children:["\u6717\u8BFB\u97F3\u91CF",(0,g.jsx)(Vn,{"aria-label":"\u6717\u8BFB\u97F3\u91CF\u6ED1\u5757",min:"0",max:"1",step:"0.05",value:l.volume,disabled:W,onChange:he=>V({volume:Number(he.target.value)})}),(0,g.jsx)(me.Input,{type:"number",min:"0",max:"1",step:"0.05",value:l.volume,disabled:W,onChange:he=>V({volume:he.target.value})})]})]})]}),(0,g.jsxs)("div",{className:B.actions,children:[(0,g.jsx)(me.Button,{variant:"primary",className:B.primary,disabled:W||!o||!Be||!(P||G||q),onClick:()=>{Jt()},children:m?"\u5904\u7406\u4E2D\u2026":G?"\u542F\u7528 DeepSeek \u6717\u8BFB":"\u4FDD\u5B58\u6717\u8BFB\u8BBE\u7F6E"}),(0,g.jsx)(me.Button,{variant:"outline",disabled:W||!o?.ttsSetup||!Be||l.provider==="off"||$&&(P||!L),onClick:()=>f("preview-tts",!$&&(P||G)?{revision:o.revision,values:$d(it,o.ttsSetup)}:void 0),children:G?"\u53D1\u9001\u793A\u4F8B\u5E76\u8BD5\u542C":!$&&P?"\u8BD5\u542C\u5F53\u524D\u9009\u62E9":"\u8BD5\u542C\u5DF2\u4FDD\u5B58\u914D\u7F6E"}),(0,g.jsx)(me.Button,{variant:"outline",disabled:!(D?.busy||D?.blocked||e.ttsUncertain||e.ttsCancelling||F?.status==="preparing"||b==="preview-tts"),onClick:()=>{n(t,"cancel-tts")},children:"\u505C\u6B62\u8BD5\u542C"})]}),F&&(0,g.jsxs)("p",{role:"status",className:B.hint,children:[{preparing:"\u8BD5\u542C\u51C6\u5907\u4E2D",cancelling:"\u6B63\u5728\u505C\u6B62\u8BD5\u542C",cancelled:"\u8BD5\u542C\u5DF2\u53D6\u6D88",idle:"\u8BD5\u542C\u5DF2\u505C\u6B62",completed:"\u8BD5\u542C\u5DF2\u7ED3\u675F",failed:F.detail??"\u8BD5\u542C\u5931\u8D25\uFF0C\u6B63\u5728\u6838\u67E5\u72B6\u6001",unconfirmed:"\u65E0\u6CD5\u786E\u8BA4\u8BD5\u542C\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B"}[F.status]??F.status,Wd[F.provider]?` \xB7 ${Wd[F.provider]}`:""]}),D&&(0,g.jsxs)("p",{role:"status",className:B.hint,children:[D.blocked?"\u8BD5\u542C\u5C1A\u672A\u505C\u6B62\uFF0C\u8BF7\u91CD\u542F\u5BBF\u4E3B\u3002":`\u6717\u8BFB\u72B6\u6001\uFF1A${{idle:"\u7A7A\u95F2",preparing:"\u51C6\u5907\u4E2D",synthesizing:"\u5408\u6210\u4E2D","playback-requested":"\u5DF2\u8BF7\u6C42\u64AD\u653E","text-only":"\u5DF2\u663E\u793A\u6587\u5B57",completed:"\u8BD5\u542C\u5DF2\u7ED3\u675F",cancelled:"\u5DF2\u53D6\u6D88",failed:"\u5931\u8D25"}[D.state]??D.state}`,D.localComputeBackend?` \xB7 \u672C\u5730\u8BA1\u7B97\uFF1A${D.localComputeBackend.toUpperCase()}${D.localComputeVerified?"\uFF08\u5DF2\u5B8C\u6210\u5408\u6210\uFF09":"\uFF08\u5F85\u9A8C\u8BC1\uFF09"}`:"",D.localComputeFallback?" \xB7 \u5DF2\u56DE\u9000\u540C\u6A21\u578B CPU":""]}),D?.localTimings&&(0,g.jsxs)("details",{className:B.details,children:[(0,g.jsx)("summary",{children:"\u5DF2\u5B8C\u6210\u6717\u8BFB\u7247\u6BB5\u8017\u65F6"}),(0,g.jsxs)("p",{className:B.hint,children:["\u51C6\u5907 ",(D.localTimings.preparationMs/1e3).toFixed(2)," \u79D2 \xB7 \u8BBE\u5907\u9009\u62E9 ",(D.localTimings.deviceSelectionMs/1e3).toFixed(2)," \u79D2 \xB7 \u5408\u6210 ",(D.localTimings.synthesisMs/1e3).toFixed(2)," \u79D2 \xB7 \u64AD\u653E ",(D.localTimings.playbackMs/1e3).toFixed(2)," \u79D2"]}),(0,g.jsxs)("p",{className:B.hint,children:[D.localTimings.chunks," \u6BB5 \xB7 ",D.localTimings.modelResident?"\u4E0A\u6B21\u7247\u6BB5\u7ED3\u675F\u65F6\u6A21\u578B\u4ECD\u9A7B\u7559\uFF0C\u5B8C\u6574\u5408\u6210\u540E\u64AD\u653E\u3002\u51C6\u5907\u5305\u542B\u6587\u4EF6\u6821\u9A8C\uFF1B\u5408\u6210\u5305\u542B\u9996\u6B21\u52A0\u8F7D\u548C\u670D\u52A1\u54CD\u5E94\u3002":"\u5F53\u524D\u672C\u5730\u6A21\u578B\u9010\u6BB5\u542F\u52A8\uFF0C\u5B8C\u6574\u5408\u6210\u540E\u64AD\u653E\u3002\u51C6\u5907\u5305\u542B\u6587\u4EF6\u6821\u9A8C\uFF1B\u5408\u6210\u5305\u542B\u52A0\u8F7D\u4E0E\u5931\u8D25\u91CD\u8BD5\u3002","\u8017\u65F6\u4E0D\u662F\u9996\u97F3\u5EF6\u8FDF\u6216 GPU \u52A0\u901F\u6BD4\u3002"]})]})]})}function wr(e,t){if(e.status!=="installed"||!e.installedPath||!t)return!1;if(e.purpose==="tts"||e.recommendedSettings?.tts)return t.ttsSetup?.provider==="local"&&t.ttsSetup.localModelId===e.modelId&&t.ttsSetup.localModelPath===e.installedPath;let n=e.recommendedSettings;return!n||n.asr!==t.modelSetup?.asr?!1:Object.entries(n.models??{}).some(([o,i])=>i===e.installedPath&&t.modelSetup?.models?.[o]===i)}function Bd(e,t){return(e?.models??[]).map(n=>{let o=(e.jobs??[]).filter(s=>s.modelId===n.id),i=o.filter(s=>s.status==="installed").sort((s,a)=>String(a.updatedAt??a.createdAt??"").localeCompare(String(s.updatedAt??s.createdAt??""))),r=i.find(s=>wr(s,t));return{model:n,jobs:o,installed:i,current:r,preferred:r??i[0],active:o.find(s=>["queued","running","paused","failed"].includes(s.status))}})}var kr=e=>(e?.title??e?.id??"").split(" \xB7 ")[0],_o=e=>({cpu:"CPU",auto:"\u81EA\u52A8 GPU",cuda:"CUDA / HIP",vulkan:"Vulkan"})[e]??e??"\u672A\u77E5",Gi=e=>{let t=new Date(e);return Number.isFinite(t.getTime())?t.toLocaleString():"\u65F6\u95F4\u672A\u77E5"};function Fd({state:e,sessionId:t,run:n,purpose:o}){let[i,r]=Zn(n,t),s=e.installerFor===t?e.installer:null,a=e.settingsFor===t?e.settings:null,l=Bd(s,a).filter(d=>(!o||d.model.purpose===o)&&d.preferred),u=gn(e,t)&&!r&&!e.settingsDraftActions?.some(d=>["save-models","save-tts"].includes(d));return(0,g.jsxs)("section",{className:B.switcher,"aria-label":"\u5207\u6362\u5DF2\u5B89\u88C5\u6A21\u578B","data-no-settings-draft":!0,children:[s?l.length?l.map(({model:d,preferred:p,current:f})=>(0,g.jsxs)("div",{className:B.switchRow,children:[(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:kr(d)}),(0,g.jsxs)("small",{children:[d.purpose==="tts"?"\u6717\u8BFB":"\u8BC6\u522B"," \xB7 ",_o(p.compute),f?" \xB7 \u5F53\u524D\u914D\u7F6E":""]})]}),(0,g.jsxs)("div",{className:B.actions,children:[d.purpose==="tts"&&!f&&(0,g.jsx)(me.Button,{variant:"outline",disabled:!u||!p.installedPath,onClick:()=>i("preview-tts",{revision:a.revision,values:$d({...a.ttsSetup,provider:"local",localModelId:d.id,localModelPath:p.installedPath,referenceAudioPath:null},a.ttsSetup)}),children:"\u5148\u8BD5\u542C"}),(0,g.jsx)(me.Button,{variant:"outline",disabled:!u||!!f,onClick:()=>i("apply-model-install",{id:p.id,revision:a.revision}),children:f?"\u5F53\u524D\u6A21\u578B":"\u9A8C\u8BC1\u5E76\u5207\u6362"})]})]},d.id)):(0,g.jsx)("p",{className:B.hint,children:"\u5C1A\u65E0\u53EF\u5207\u6362\u7684\u5DF2\u5B89\u88C5\u6A21\u578B\uFF0C\u8BF7\u5148\u5728\u6A21\u578B\u4E0B\u8F7D\u4E2D\u5B89\u88C5\u3002"}):(0,g.jsx)("p",{className:B.hint,children:"\u6B63\u5728\u8BFB\u53D6\u5DF2\u5B89\u88C5\u6A21\u578B\u3002"}),!!l.length&&!u&&(0,g.jsx)("p",{className:B.hint,children:"\u5207\u6362\u6A21\u578B\u524D\u9700\u505C\u6B62\u8BED\u97F3\uFF0C\u5DF2\u5B89\u88C5\u6587\u4EF6\u4E0D\u4F1A\u91CD\u65B0\u4E0B\u8F7D\u3002"})]})}function Nd({job:e,snapshot:t,settings:n,disabled:o,writable:i,execute:r,history:s=!1}){let a=wr(e,n);return(0,g.jsxs)("article",{className:B.job,"data-model-job":e.id,children:[(0,g.jsxs)("div",{className:B.jobHeading,children:[(0,g.jsx)("strong",{children:kr(t.models.find(l=>l.id===e.modelId))||e.modelId}),(0,g.jsxs)("small",{children:[_o(e.compute)," \xB7 ",Gi(e.createdAt)]})]}),(0,g.jsxs)("p",{role:"status",children:[a?"\u5F53\u524D\u914D\u7F6E \xB7 ":"",{queued:"\u7B49\u5F85\u4E2D",running:"\u5904\u7406\u4E2D",paused:"\u5DF2\u6682\u505C",failed:"\u5931\u8D25",cancelled:"\u5DF2\u53D6\u6D88",installed:"\u5DF2\u5B89\u88C5\uFF0C\u5B57\u8282\u6821\u9A8C\u901A\u8FC7","checking-runtime":"\u68C0\u67E5\u8FD0\u884C\u4F9D\u8D56","verifying-local":"\u6821\u9A8C\u672C\u673A\u5DF2\u6709\u6A21\u578B",downloading:"\u4E0B\u8F7D\u4E2D",verifying:"\u6821\u9A8C\u6587\u4EF6",installing:"\u63D0\u4EA4\u5B89\u88C5"}[e.stage]??e.stage]}),!s&&Number.isFinite(e.totalBytes)&&e.totalBytes>0&&Number.isFinite(e.receivedBytes)&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("progress",{max:e.totalBytes,value:Math.min(e.receivedBytes,e.totalBytes),"aria-label":"\u4E0B\u8F7D\u5B57\u8282\u8FDB\u5EA6"}),(0,g.jsxs)("small",{children:["\u4E0B\u8F7D ",_t(e.receivedBytes)," / ",_t(e.totalBytes)]})]}),e.error&&(0,g.jsx)("p",{role:"alert",children:e.error.message}),s&&e.installedPath&&(0,g.jsxs)("details",{className:B.installPath,children:[(0,g.jsx)("summary",{children:"\u5B89\u88C5\u4F4D\u7F6E"}),(0,g.jsx)("p",{children:e.installedPath})]}),(0,g.jsxs)("div",{className:B.actions,children:[["queued","running"].includes(e.status)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:o,onClick:()=>r("control-model-install",{id:e.id,operation:"pause"}),children:"\u6682\u505C\uFF0C\u4FDD\u7559\u8FDB\u5EA6"}),["paused","failed"].includes(e.status)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:o,onClick:()=>r("control-model-install",{id:e.id,operation:"resume"}),children:"\u6062\u590D\u540C\u4E00\u6765\u6E90\u4E0B\u8F7D"}),["queued","running","paused","failed"].includes(e.status)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:o,onClick:()=>r("control-model-install",{id:e.id,operation:"cancel"}),children:"\u53D6\u6D88\u5E76\u6E05\u9664\u6B64\u4EFB\u52A1\u4E34\u65F6\u6587\u4EF6"}),e.status==="installed"&&!a&&(0,g.jsx)(me.Button,{variant:"outline",disabled:!i,onClick:()=>r("apply-model-install",{id:e.id,revision:n.revision}),children:"\u9A8C\u8BC1\u5E76\u5207\u6362"})]}),e.status==="installed"&&(0,g.jsx)("small",{children:"\u5207\u6362\u524D\u8BF7\u7ED3\u675F\u5BF9\u8BDD\u3002\u4E0B\u6B21\u5F00\u59CB\u5BF9\u8BDD\u65F6\u4F7F\u7528\u65B0\u6A21\u578B\u3002"})]})}function Ud({state:e,sessionId:t,run:n}){let[o,i]=(0,ve.useState)(""),[r,s]=(0,ve.useState)("cpu"),[a,l]=(0,ve.useState)(!1),[u,d]=Zn(n,t),p=e.installerFor===t?e.installer:null,f=e.settingsFor===t?e.settings:null,m=Bd(p,f).filter(M=>M.model.id!=="sensevoice-int8-2024-07-17"||M.active),b=m.find(M=>M.model.id===o),v=b?.model,y=e.installPlanFor===t&&e.installPlan?.modelId===o&&e.installPlan?.compute===r&&!e.installPlan?.sourceDirectory?e.installPlan:null,w=!!e.busy||e.uncertain||e.installerUncertain||d,C=!d&&gn(e,t)&&!e.settingsDraftActions?.some(M=>["save-models","save-tts"].includes(M)),D=(0,ve.useId)(),F=(p?.jobs??[]).filter(M=>["installed","cancelled"].includes(M.status)).slice().reverse(),N=p?.hardware,W=p?.refresh?.observedAt??p?.compute?.observedAt;return(0,g.jsxs)("section",{className:`${B.section} ${B.modelInstaller}`,"aria-label":"\u6A21\u578B\u5B89\u88C5",children:[(0,g.jsxs)("div",{className:B.hardwareSummary,children:[(0,g.jsxs)("span",{children:["\u5185\u5B58 ",_t(N?.totalMemoryBytes)," \xB7 \u53EF\u7528 ",_t(N?.availableMemoryBytes)," \xB7 \u663E\u5B58 ",_t(N?.gpuMemoryBytes)]}),(0,g.jsxs)("small",{children:[W?"\u66F4\u65B0\u4E8E "+Gi(W):"\u7B49\u5F85\u68C0\u6D4B"," \xB7 \u6BCF 5 \u5206\u949F"]})]}),(p?.refresh?.error||e.modelComputeError)&&(0,g.jsxs)("p",{className:B.hint,role:"status",children:[p?.refresh?.error??"\u672C\u6B21\u786C\u4EF6\u68C0\u6D4B\u672A\u5B8C\u6210","\uFF1B\u4FDD\u7559\u4E0A\u6B21\u7ED3\u679C\u3002"]}),e.installerError&&(0,g.jsx)("p",{role:"alert",className:B.note,children:e.installerError}),e.installerUncertain&&(0,g.jsx)("p",{role:"status",className:B.note,children:"\u6B63\u5728\u6838\u67E5\u5B89\u88C5\u72B6\u6001\u3002"}),(0,g.jsxs)("div",{className:B.currentModel,children:[(0,g.jsxs)("span",{children:["\u8BC6\u522B ",(0,g.jsx)("strong",{children:"SenseVoice"})," \xB7 \u6717\u8BFB ",(0,g.jsx)("strong",{children:f?.ttsSetup?.provider==="local"?f.ttsSetup.localModelId?.startsWith("qwen3")?"Qwen3-TTS":f.ttsSetup.localModelId?.startsWith("vits-melo")?"MeloTTS":f.ttsSetup.localModelId??"\u672C\u5730\u6A21\u578B":f?.ttsSetup?.provider==="deepseek"?f.ttsSetup.deepseekTextTransmissionAccepted&&xo(e)?"DeepSeek":"DeepSeek \u5F85\u542F\u7528":{off:"\u4E0D\u53D1\u58F0"}[f?.ttsSetup?.provider]??"\u672A\u914D\u7F6E"})]}),(0,g.jsx)(me.Button,{variant:"outline","aria-expanded":a,onClick:()=>l(M=>!M),children:"\u5207\u6362\u5F53\u524D\u6A21\u578B"})]}),a&&(0,g.jsx)(Fd,{state:e,sessionId:t,run:n}),p?(0,g.jsxs)("fieldset",{className:`${B.choices} ${B.modelChoices}`,disabled:w,children:[(0,g.jsx)("legend",{children:"\u9009\u62E9\u6A21\u578B"}),m.map(({model:M,current:$,preferred:I,active:k})=>(0,g.jsxs)("label",{className:B.choice,"data-selected":o===M.id,children:[(0,g.jsx)("input",{type:"radio",name:D,checked:o===M.id,onChange:()=>{i(M.id),s(M.computeOptions?.includes("auto")?"auto":"cpu")}}),(0,g.jsxs)("span",{children:[(0,g.jsxs)("strong",{children:[kr(M),M.recommendation?.recommended&&(0,g.jsx)("span",{className:B.badge,children:"\u63A8\u8350"})]}),(0,g.jsxs)("small",{children:[M.purpose==="tts"?"\u6717\u8BFB":"\u8BC6\u522B"," \xB7 ",_t(M.totalBytes)]}),(0,g.jsx)("small",{children:$?"\u5F53\u524D\u914D\u7F6E":k?{queued:"\u7B49\u5F85\u4E0B\u8F7D",running:"\u4E0B\u8F7D\u5904\u7406\u4E2D",paused:"\u4E0B\u8F7D\u5DF2\u6682\u505C",failed:"\u4E0B\u8F7D\u5931\u8D25"}[k.status]:I?"\u5DF2\u5B89\u88C5\uFF0C\u53EF\u5207\u6362":M.available?"\u53EF\u51C6\u5907\u5B89\u88C5":"\u6682\u4E0D\u53EF\u5B89\u88C5"}),!M.available&&(0,g.jsx)("small",{children:M.reason??M.recommendation?.reason})]})]},M.id))]}):(0,g.jsx)("p",{className:B.note,children:"\u6B63\u5728\u8BFB\u53D6\u6A21\u578B\u5217\u8868\u3002"}),v&&(0,g.jsxs)("div",{className:B.selectedModel,children:[(0,g.jsxs)("label",{className:B.inlineField,children:["\u63A8\u7406\u8BBE\u5907",(0,g.jsx)("select",{value:r,disabled:w,onChange:M=>s(M.target.value),children:(v.computeOptions??["cpu"]).map(M=>(0,g.jsxs)("option",{value:M,children:[_o(M),M==="cpu"?"":" \xB7 CPU \u515C\u5E95"]},M))})]}),(0,g.jsxs)("div",{className:B.actions,children:[b.preferred&&(0,g.jsx)(me.Button,{variant:"outline",disabled:!C||!!b.current,onClick:()=>u("apply-model-install",{id:b.preferred.id,revision:f.revision}),children:b.current?"\u5F53\u524D\u6A21\u578B":"\u9A8C\u8BC1\u5E76\u5207\u6362"}),(0,g.jsx)(me.Button,{variant:"outline",disabled:w||!v.available,onClick:()=>u("plan-model-install",{modelId:o,compute:r}),children:b.preferred?"\u67E5\u770B\u5176\u4ED6\u5B89\u88C5\u65B9\u6848":"\u67E5\u770B\u5B89\u88C5\u8BA1\u5212"})]}),(0,g.jsxs)("details",{className:B.details,children:[(0,g.jsx)("summary",{children:"\u63A8\u8350\u4F9D\u636E\u4E0E\u8BBE\u5907\u8BF4\u660E"}),(0,g.jsx)("p",{className:B.hint,children:v.recommendation?.reason??"\u63A8\u8350\u4F9D\u636E\u672A\u77E5\uFF0C\u53EF\u624B\u52A8\u9009\u62E9\u3002"}),(0,g.jsx)("p",{className:B.hint,children:v.purpose==="tts"?r==="cpu"?"\u4EC5\u51C6\u5907 CPU \u8FD0\u884C\u65F6\u3002":"\u51C6\u5907\u56FA\u5B9A Vulkan \u4E0E CPU \u7EC4\u4EF6\uFF0C\u5B9E\u9645\u53EF\u7528\u6027\u4ECD\u9700\u672C\u673A\u5408\u6210\u9A8C\u8BC1\u3002":"\u6B64\u6A21\u578B\u4F7F\u7528 CPU\u3002"})]})]}),y&&(0,g.jsxs)(me.MenuSurface,{className:B.plan,"aria-label":"\u6A21\u578B\u5B89\u88C5\u8BA1\u5212",children:[(0,g.jsx)("h4",{children:"\u6A21\u578B\u5B89\u88C5"}),(0,g.jsxs)("dl",{children:[(0,g.jsx)("dt",{children:"\u6A21\u578B"}),(0,g.jsx)("dd",{children:v?.title??y.modelId}),(0,g.jsx)("dt",{children:"\u6765\u6E90"}),(0,g.jsx)("dd",{children:y.source}),(0,g.jsx)("dt",{children:"\u4E0B\u8F7D\u5927\u5C0F"}),(0,g.jsx)("dd",{children:_t(y.totalBytes)}),(0,g.jsx)("dt",{children:"\u4FDD\u5B58\u4F4D\u7F6E"}),(0,g.jsx)("dd",{children:y.destination}),(0,g.jsx)("dt",{children:"\u63A8\u7406\u8BBE\u5907"}),(0,g.jsx)("dd",{children:y.compute})]}),(0,g.jsx)("p",{children:y.licenseNote??"\u8BF7\u9605\u8BFB\u4E0B\u5217\u6A21\u578B\u8BB8\u53EF\u3002"}),y.licenseUrls?.map(M=>(0,g.jsx)("a",{href:M,target:"_blank",rel:"noreferrer",children:M},M)),(0,g.jsx)("p",{className:B.hint,children:y.notice}),(0,g.jsxs)("details",{className:B.details,children:[(0,g.jsx)("summary",{children:"\u6587\u4EF6\u548C\u6821\u9A8C\u8BE6\u60C5"}),(0,g.jsx)("ul",{children:y.files?.map(M=>(0,g.jsxs)("li",{children:[M.name," \xB7 ",_t(M.bytes),(0,g.jsxs)("small",{children:["SHA-256: ",M.sha256]}),(0,g.jsx)("small",{children:M.url})]},M.name))})]}),(0,g.jsx)(me.Button,{variant:"primary",className:B.primary,disabled:w||!v?.available||!y.planHash,onClick:()=>u("start-model-install",{modelId:y.modelId,compute:y.compute,planHash:y.planHash,accepted:!0}),children:"\u5F00\u59CB\u4E0B\u8F7D"})]}),(0,g.jsx)("div",{className:B.jobs,children:(p?.jobs??[]).filter(M=>!["installed","cancelled"].includes(M.status)).map(M=>(0,g.jsx)(Nd,{job:M,snapshot:p,settings:f,disabled:w,writable:C,execute:u},M.id))}),!!F.length&&(0,g.jsxs)("details",{className:B.installHistory,children:[(0,g.jsxs)("summary",{children:["\u5B89\u88C5\u8BB0\u5F55\uFF08",F.length,"\uFF09",(0,g.jsx)("small",{children:"\u65F6\u95F4 \xB7 \u8BBE\u5907 \xB7 \u4F4D\u7F6E"})]}),(0,g.jsx)("div",{className:B.jobs,children:F.map(M=>(0,g.jsx)(Nd,{job:M,snapshot:p,settings:f,disabled:w,writable:C,execute:u,history:!0},M.id))})]}),(0,g.jsx)("p",{className:B.hint,children:"\u6A21\u578B\u4E0B\u8F7D\u53EF\u5728\u540E\u53F0\u7EE7\u7EED\u3002\u68C0\u6D4B\u9759\u9ED8\u8FDB\u884C\uFF0C\u8FDB\u5165\u672C\u9875\u7ACB\u5373\u5237\u65B0\u3002"})]})}function xr({state:e,sessionId:t,run:n,active:o=!0,pickPath:i,initialModelId:r=null,initialReuse:s=!1,reuseOnly:a=!1,onboarding:l=!1}){let[u,d,,p]=Zn(n,t),[f,m]=(0,ve.useState)(r),[b,v]=(0,ve.useState)(null),[y,w]=(0,ve.useState)(s),[C,D]=(0,ve.useState)(""),[F,N]=(0,ve.useState)("q8_0"),W=e.installerFor===t?e.installer:null,M=W?.models?.filter(G=>G.purpose==="tts"||["qwen3-tts-base-1.7b-gguf","vits-melo-tts-zh_en-int8"].includes(G.id))??[],$=M.find(G=>G.recommendation?.recommended&&G.available),I=f??$?.id??M.find(G=>G.available)?.id??M[0]?.id,k=M.find(G=>G.id===I),z=b??(k?.computeOptions?.includes("auto")?"auto":"cpu"),O=y&&I==="qwen3-tts-base-1.7b-gguf",S=O?{sourceDirectory:C,modelVariant:F}:{},P=e.installPlanFor===t&&e.installPlan?.modelId===I&&e.installPlan?.compute===z&&(O?e.installPlan?.reused===!0&&(e.installPlanRequest?.sourceDirectory??e.installPlan?.sourceDirectory)===C&&e.installPlan?.modelVariant===F:!e.installPlan?.sourceDirectory)?e.installPlan:null,A=[...W?.jobs??[]].reverse().find(G=>G.modelId===I&&G.status!=="cancelled"),j=W?.ttsInstallIntent,L=j&&A&&j.modelId===I&&j.jobId===A.id?j:null,K=["waiting","verifying"].includes(j?.status),q=e.settingsFor===t&&e.settings?.ttsSetup?.provider==="local"&&e.settings.ttsSetup.localModelId===I&&A?.status==="installed"&&!!A.installedPath&&e.settings.ttsSetup.localModelPath===A.installedPath,fe=(0,ve.useRef)(void 0),le=(0,ve.useRef)(null);(0,ve.useEffect)(()=>{!o||W||e.busy||d||p.isLocked()||fe.current===t||(fe.current=t,u("model-installer"))},[o,t,!!W,e.busy,d,p.settled]),(0,ve.useEffect)(()=>{let G=t+":"+I+":"+z;O||!o||!k?.available||e.busy||d||p.isLocked()||P||le.current===G||(le.current=G,u("plan-model-install",{modelId:I,compute:z}))},[o,t,I,z,k?.available,e.busy,d,!!P,O,p.settled]);let ee=d||e.busy||e.installerUncertain;return(0,g.jsxs)("section",{className:B.section,"aria-label":"\u4E0B\u8F7D\u672C\u5730\u8BED\u97F3\u6A21\u578B","data-no-settings-draft":!0,children:[W?(0,g.jsxs)(g.Fragment,{children:[!a&&(0,g.jsxs)("label",{className:B.inlineField,children:["\u8BED\u97F3\u6A21\u578B",(0,g.jsx)("select",{"aria-label":"\u8BED\u97F3\u6A21\u578B",value:I??"",disabled:ee||L?.status==="verifying",onChange:G=>{m(G.target.value),v(null)},children:M.map(G=>(0,g.jsxs)("option",{value:G.id,children:[G.title??G.id,G.recommendation?.recommended?" \xB7 \u63A8\u8350":"",G.available?"":" \xB7 \u6682\u4E0D\u53EF\u7528"]},G.id))})]}),!l&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("p",{className:B.hint,children:k?.recommendation?.reason}),(0,g.jsxs)("label",{className:B.inlineField,children:["\u672C\u5730\u8BA1\u7B97",(0,g.jsx)("select",{"aria-label":"\u672C\u5730\u8BA1\u7B97",value:z,disabled:ee||K,onChange:G=>v(G.target.value),children:(k?.computeOptions??["cpu"]).map(G=>(0,g.jsx)("option",{value:G,children:{cpu:"CPU",auto:"\u81EA\u52A8 GPU \xB7 CPU \u515C\u5E95",vulkan:"Vulkan \xB7 CPU \u515C\u5E95"}[G]},G))})]})]}),!k?.available&&(0,g.jsx)("p",{role:"status",className:B.note,children:k?.reason??"\u6B64\u8BBE\u5907\u6682\u6CA1\u6709\u517C\u5BB9\u7684\u5B89\u88C5\u5305\u3002\u53EF\u9009\u62E9\u5176\u4ED6\u652F\u6301\u7684\u6A21\u578B\uFF0C\u6216\u5148\u4F7F\u7528\u6587\u5B57\u3002"}),P&&(0,g.jsxs)("div",{className:B.plan,children:[(0,g.jsxs)("strong",{children:["\u4E0B\u8F7D ",_t(P.totalBytes)," \xB7 ",P.compute.toUpperCase()]}),P.reused&&(0,g.jsxs)("p",{children:["\u590D\u7528\u6A21\u578B ",_t(P.reusedBytes)," \xB7 ",P.modelVariant]}),(0,g.jsxs)("details",{className:B.details,children:[(0,g.jsx)("summary",{children:"\u6765\u6E90\u3001\u8BB8\u53EF\u4E0E\u4FDD\u5B58\u4F4D\u7F6E"}),(0,g.jsx)("p",{children:P.source}),P.runtime&&(0,g.jsx)("p",{children:P.runtime.source}),(0,g.jsx)("p",{children:P.notice}),(0,g.jsx)("p",{children:P.verification}),(0,g.jsx)("p",{children:P.licenseNote}),P.licenseUrls?.map(G=>(0,g.jsx)("a",{href:G,target:"_blank",rel:"noreferrer",children:G},G)),(0,g.jsx)("p",{children:P.destination})]})]}),(0,g.jsxs)("div",{className:B.actions,children:[(!A||(O||A.compute!==z)&&A.status==="installed"&&!K)&&(0,g.jsx)(me.Button,{variant:"primary",className:B.primary,disabled:ee||!gn(e,t)||!k?.available||!P,onClick:()=>u("start-model-install",{modelId:I,compute:z,planHash:P.planHash,accepted:!0,useWhenReady:!0,...P.reused?{sourceDirectory:P.sourceDirectory,modelVariant:P.modelVariant}:{}}),children:O?"\u9A8C\u8BC1\u5E76\u4F7F\u7528":"\u4E0B\u8F7D\u5E76\u4F7F\u7528"}),I==="qwen3-tts-base-1.7b-gguf"&&!a&&(0,g.jsx)(me.Button,{variant:"outline","aria-expanded":O,disabled:ee||K,onClick:()=>w(G=>!G),children:"\u4F7F\u7528\u672C\u673A\u5DF2\u6709\u6587\u4EF6"})]}),O&&(0,g.jsxs)("div",{className:B.section,children:[(0,g.jsx)(go,{className:B.field,label:"\u63D2\u4EF6\u6240\u5728\u673A\u5668\u7684\u6A21\u578B\u76EE\u5F55",kind:"sourceDirectory",value:C,disabled:ee,active:o,scope:I+":"+F,pickPath:i,sessionId:t,onChange:D}),(0,g.jsxs)("label",{className:B.inlineField,children:["\u5DF2\u6709\u6A21\u578B\u91CF\u5316\u7248\u672C",(0,g.jsxs)("select",{"aria-label":"\u5DF2\u6709\u6A21\u578B\u91CF\u5316\u7248\u672C",value:F,disabled:ee,onChange:G=>N(G.target.value),children:[(0,g.jsx)("option",{value:"q8_0",children:"Q8_0"}),(0,g.jsx)("option",{value:"q4_k_m",children:"Q4_K_M"})]})]}),(0,g.jsx)(me.Button,{variant:"outline",disabled:ee||!C.trim()||!k?.available,onClick:()=>u("plan-model-install",{modelId:I,compute:z,...S}),children:"\u68C0\u67E5\u590D\u7528\u8BA1\u5212"})]}),O&&A&&["failed","paused"].includes(A.status)&&(0,g.jsx)("p",{className:B.note,children:"\u5DF2\u6709\u672A\u5B8C\u6210\u7684\u5B89\u88C5\u4EFB\u52A1\u3002\u53EF\u7EE7\u7EED\u91CD\u8BD5\uFF1B\u5982\u9700\u66F4\u6362\u76EE\u5F55\u6216\u91CF\u5316\u7248\u672C\uFF0C\u8BF7\u5148\u53D6\u6D88\u8BE5\u4EFB\u52A1\uFF0C\u518D\u68C0\u67E5\u65B0\u7684\u590D\u7528\u8BA1\u5212\u3002"}),!O&&k?.available&&!P&&!A&&(0,g.jsx)(me.Button,{variant:"outline",disabled:ee,onClick:()=>u("plan-model-install",{modelId:I,compute:z}),children:"\u91CD\u65B0\u8BFB\u53D6\u5B89\u88C5\u8BA1\u5212"}),A&&(0,g.jsxs)("div",{className:B.job,children:[(0,g.jsx)("p",{role:"status",children:L?.status==="verifying"?"\u6B63\u5728\u9A8C\u8BC1\u5408\u6210\uFF0C\u9996\u6B21\u53EF\u80FD\u9700\u8981\u51E0\u5206\u949F":L?.status==="applied"&&q?"\u5408\u6210\u9A8C\u8BC1\u901A\u8FC7\uFF0C\u5DF2\u8BBE\u4E3A\u6717\u8BFB\u6765\u6E90":L?.status==="blocked"?"\u9700\u8981\u5904\u7406\u540E\u518D\u7EE7\u7EED":{queued:"\u7B49\u5F85\u4E0B\u8F7D",running:A.stage==="verifying-local"?"\u6821\u9A8C\u672C\u673A\u5DF2\u6709\u6A21\u578B":"\u4E0B\u8F7D\u5904\u7406\u4E2D",paused:"\u5DF2\u6682\u505C",failed:"\u4E0B\u8F7D\u5931\u8D25",installed:"\u6587\u4EF6\u5DF2\u6821\u9A8C\uFF0C\u5C1A\u672A\u786E\u8BA4\u5408\u6210"}[A.status]??A.status}),A.totalBytes>0&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("progress",{"aria-label":"\u8BED\u97F3\u6A21\u578B\u4E0B\u8F7D\u8FDB\u5EA6",max:A.totalBytes,value:Math.min(A.receivedBytes,A.totalBytes)}),(0,g.jsxs)("small",{children:[_t(A.receivedBytes)," / ",_t(A.totalBytes)]})]}),A.error&&(0,g.jsx)("p",{role:"alert",children:A.error.message}),L?.reason&&(0,g.jsx)("p",{className:B.note,children:qh(L.reason)}),(0,g.jsxs)("div",{className:B.actions,children:[L?.status==="verifying"&&(0,g.jsx)(me.Button,{variant:"outline",disabled:ee,onClick:()=>u("control-model-install",{id:A.id,operation:"pause"}),children:"\u505C\u6B62\u9A8C\u8BC1"}),["queued","running"].includes(A.status)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:ee,onClick:()=>u("control-model-install",{id:A.id,operation:"pause"}),children:"\u6682\u505C"}),(["paused","failed"].includes(A.status)||L?.status==="blocked"||L?.status==="paused")&&(0,g.jsx)(me.Button,{variant:"outline",disabled:ee,onClick:()=>u("control-model-install",{id:A.id,operation:"resume"}),children:"\u7EE7\u7EED\u4E0B\u8F7D\u5E76\u4F7F\u7528"}),["queued","running","paused","failed"].includes(A.status)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:ee,onClick:()=>u("control-model-install",{id:A.id,operation:"cancel"}),children:"\u53D6\u6D88\u4E0B\u8F7D"}),A.status==="installed"&&!q&&(!L||["applied","cancelled"].includes(L.status))&&(0,g.jsx)(me.Button,{variant:"outline",disabled:ee||K||!gn(e,t),onClick:()=>u("apply-model-install",{id:A.id,revision:e.settings.revision}),children:"\u9A8C\u8BC1\u5E76\u4F7F\u7528"})]})]}),q&&(0,g.jsx)("p",{className:B.hint,children:"\u672C\u5730\u6A21\u578B\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u8BD5\u542C\u3002"})]}):(0,g.jsx)(g.Fragment,{children:(0,g.jsx)("p",{className:B.hint,children:"\u6B63\u5728\u8BFB\u53D6\u53EF\u5B89\u88C5\u6A21\u578B\u2026"})}),e.installerError&&(0,g.jsx)("p",{role:"alert",className:B.note,children:e.installerError}),e.installerUncertain&&(0,g.jsx)("p",{role:"status",children:"\u6B63\u5728\u6838\u67E5\u4E0B\u8F7D\u72B6\u6001\u3002"})]})}function Ld({state:e,sessionId:t,run:n,pickPath:o,active:i}){let r=e.settingsFor===t?e.settings:null,s=e.installerFor===t?e.installer:null,a=r?.ttsSetup?.localModelPath,[l,u]=Zn(n,t),[d,p]=(0,ve.useState)(""),[f,m]=(0,ve.useState)(!1),b=(s?.jobs??[]).filter(y=>y.status==="installed"&&(y.purpose==="tts"||y.recommendedSettings?.tts)),v=b.find(y=>y.id===d);return(0,g.jsxs)("section",{className:B.section,"aria-label":"\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84","data-no-settings-draft":!0,children:[(0,g.jsx)("h3",{children:"\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84"}),(0,g.jsx)("p",{className:B.hint,children:a||"\u5C1A\u672A\u914D\u7F6E\u672C\u5730\u6717\u8BFB\u6A21\u578B\u8DEF\u5F84\u3002"}),!!b.length&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("label",{className:B.inlineField,children:["\u5DF2\u5B89\u88C5\u76EE\u5F55",(0,g.jsxs)("select",{value:d,onChange:y=>p(y.target.value),children:[(0,g.jsx)("option",{value:"",children:"\u9009\u62E9\u5DF2\u6821\u9A8C\u7684\u5B89\u88C5\u76EE\u5F55"}),b.map(y=>(0,g.jsxs)("option",{value:y.id,children:[kr(s.models.find(w=>w.id===y.modelId))," \xB7 ",_o(y.compute)," \xB7 ",Gi(y.createdAt)]},y.id))]})]}),v&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("p",{className:B.hint,children:v.installedPath}),(0,g.jsx)(me.Button,{variant:"outline",disabled:u||!gn(e,t)||wr(v,r),onClick:()=>l("apply-model-install",{id:v.id,revision:r.revision}),children:"\u9A8C\u8BC1\u5E76\u4F7F\u7528\u6240\u9009\u8DEF\u5F84"})]})]}),(0,g.jsxs)("details",{className:B.details,onToggle:y=>m(y.currentTarget.open),children:[(0,g.jsx)("summary",{children:"\u590D\u7528\u672C\u673A Qwen \u6A21\u578B\u6587\u4EF6"}),(0,g.jsx)("p",{className:B.hint,children:"\u9009\u62E9\u5DF2\u6709\u6A21\u578B\u76EE\u5F55\u540E\u6821\u9A8C\u6587\u4EF6\uFF1B\u6821\u9A8C\u901A\u8FC7\u540E\u5B89\u88C5\u8FD0\u884C\u7EC4\u4EF6\u3002"}),f&&(0,g.jsx)(xr,{state:e,sessionId:t,run:n,active:i,pickPath:o,initialModelId:"qwen3-tts-base-1.7b-gguf",initialReuse:!0,reuseOnly:!0})]})]})}function Vd({state:e,sessionId:t,run:n,refresh:o,t:i,onDismiss:r,onMinimize:s,onBackToAuthorization:a,asrStatus:l,pickPath:u}){let[d,p]=Zn(n,t),[f,m]=(0,ve.useState)(0),b=(0,ve.useRef)(null),v=(0,ve.useRef)(0),y=(0,ve.useRef)(null);(0,ve.useLayoutEffect)(()=>()=>{v.current++},[t]);let w=V=>(v.current++,V?.());(0,ve.useLayoutEffect)(()=>{let V=b.current?.closest("[data-whale-content]");V&&(V.scrollTop=0);let re=b.current?.querySelector("[data-wizard-body]");re&&(re.scrollTop=0)},[f]);let C=e.settingsFor===t?e.settings:null,[D,F]=(0,ve.useState)(null),[N,W]=(0,ve.useState)(null),M=D??C?.listenMode??"ptt",$=C?.ttsSetup?.provider,I=N??$??br.provider,k=e.ttsCapabilitiesFor===t?e.ttsCapabilities:null,z=typeof k?.deepseekKeyAvailable=="boolean",O=k?.deepseekKeyAvailable===!0,S=`${t??"owner"}:${C?.revision??"unread"}`,[P,A]=(0,ve.useState)(null),j=P??C?.ttsSetup?.deepseekVoice??"stella",L=!z&&!p&&y.current===S&&!!e.error,K=()=>{p||e.busy||(y.current=S,d("inspect-tts"))};(0,ve.useEffect)(()=>{f!==1||!C||I!=="deepseek"||z||p||e.busy||y.current===S||K()},[f,C,I,z,S,p,e.busy]);let q=I==="deepseek",fe=q&&(e.authorizationUncertain||C?.ttsSetup?.deepseekTextTransmissionAccepted===!0&&!e.authorization),le=q&&!fe&&!(C?.ttsSetup?.deepseekTextTransmissionAccepted===!0&&xo(e)),ee=p||!gn(e,t),G=C?.ttsSetup?.provider==="local"&&!!C.ttsSetup.localModelId,E=async()=>{if(ee||!C)return;let V=v.current,re=()=>v.current===V;if(f===0)await d("listen-mode",{mode:M})===!0&&re()&&m(1);else if(f===1){if(q&&(!O||fe))return;let ue=q&&j!==(C.ttsSetup?.deepseekVoice??"stella");if(I===$&&!le&&!ue){m(2);return}let ye=Ki({...br,...C.ttsSetup,provider:I});q&&(ye.deepseekTextTransmissionAccepted=!0,ye.deepseekVoice=j),await d("save-tts",{revision:C.revision,values:ye})===!0&&re()&&m(2)}else await d("complete-setup",{revision:C.revision})===!0&&re()&&r?.()};return(0,g.jsxs)(me.MenuSurface,{ref:b,className:B.wizard,role:"region","aria-label":"\u9C7C\u5E94\u9996\u6B21\u914D\u7F6E","data-whale-intrinsic":!0,children:[(0,g.jsxs)("header",{className:B.header,children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("h2",{children:"\u5F00\u59CB\u4F7F\u7528\u9C7C\u5E94"}),(0,g.jsxs)("p",{className:B.hint,children:["\u7B2C ",f+1," / 3 \u6B65 \xB7 \u5176\u4F59\u8BBE\u7F6E\u968F\u65F6\u518D\u8C03"]})]}),(0,g.jsx)(me.Button,{onClick:e.setupStatus?.completed===!0?r:s,children:e.setupStatus?.completed===!0?"\u8FD4\u56DE\u8BBE\u7F6E":"\u7A0D\u540E"})]}),(0,g.jsx)("div",{className:B.wizardBody,"data-wizard-body":!0,"data-no-drag":!0,children:(0,g.jsxs)("div",{className:B.wizardBodyContent,"data-whale-natural-content":!0,children:[(0,g.jsx)(_r,{state:e,sessionId:t,run:n,refresh:o,t:i}),f===0&&(0,g.jsxs)("section",{className:B.section,children:[(0,g.jsx)("h3",{children:"\u600E\u4E48\u8BF4\u8BDD\uFF1F"}),(0,g.jsx)("fieldset",{className:B.choices,disabled:ee,children:[["ptt","\u6309\u952E\u8BF4\u8BDD","\u6309\u4F4F\u5FEB\u6377\u952E\u65F6\u6536\u97F3"],["always","\u81EA\u7531\u9EA6","\u5F00\u59CB\u5BF9\u8BDD\u540E\u6301\u7EED\u542C\u53D6\u8BED\u97F3"],["wake","\u5524\u9192\u8BCD","\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\uFF0C\u518D\u8BF4\u6307\u4EE4"]].map(([V,re,ue])=>(0,g.jsxs)("label",{className:B.choice,"data-selected":M===V,children:[(0,g.jsx)("input",{type:"radio",name:"setup-listen","data-whale-operation":`listen-mode-${V}`,checked:M===V,onChange:()=>F(V)}),(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:re}),(0,g.jsx)("small",{children:ue})]})]},V))})]}),f===1&&(0,g.jsxs)("section",{className:B.section,children:[(0,g.jsx)("h3",{children:"\u600E\u4E48\u542C\u56DE\u7B54\uFF1F"}),(0,g.jsx)("fieldset",{className:B.choices,disabled:ee,children:Ad.filter(([V])=>V!=="custom"||$==="custom").map(([V,re,ue])=>(0,g.jsxs)("label",{className:B.choice,"data-selected":I===V,children:[(0,g.jsx)("input",{type:"radio",name:"setup-provider",checked:I===V,onChange:()=>W(V)}),(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:re}),(0,g.jsx)("small",{children:ue})]})]},V))}),q&&(0,g.jsxs)("div",{className:B.note,"data-whale-deepseek-setup":!0,children:[(0,g.jsx)("p",{children:Td}),fe&&(0,g.jsx)("p",{role:"status",children:"\u6B63\u5728\u8BFB\u53D6 DeepSeek \u6717\u8BFB\u6388\u6743\u2026"}),!z&&!L&&(0,g.jsx)("p",{role:"status",children:"\u6B63\u5728\u68C0\u67E5 DSH \u4E2D\u4FDD\u5B58\u7684 DeepSeek API Key\u2026"}),z&&!O&&(0,g.jsx)("p",{role:"status",children:Ed}),L&&(0,g.jsx)("p",{role:"status",children:"\u6682\u65F6\u65E0\u6CD5\u68C0\u67E5 DeepSeek API Key\u3002"}),(L||z&&!O)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:ee,onClick:K,children:"\u91CD\u65B0\u68C0\u67E5 DeepSeek API Key"}),(0,g.jsx)(Zd,{value:j,disabled:ee,onChange:A})]}),I==="local"&&(0,g.jsx)(xr,{pickPath:u,state:e,sessionId:t,run:n,initialModelId:G?C.ttsSetup.localModelId:null,onboarding:!0})]}),f===2&&(0,g.jsxs)("section",{className:B.section,children:[(0,g.jsx)("h3",{children:"\u51C6\u5907\u8BED\u97F3\u8BC6\u522B"}),(0,g.jsx)("p",{children:"\u8BF4\u8BDD\u65B9\u5F0F\u548C\u6717\u8BFB\u914D\u7F6E\u5DF2\u4FDD\u5B58\u3002"}),l]}),(e.error||e.setupError)&&(0,g.jsx)("p",{role:"alert",className:B.note,children:"\u6682\u65F6\u672A\u80FD\u5B8C\u6210\uFF0C\u6B63\u5728\u6838\u67E5\u8BBE\u7F6E\u3002"})]})}),(0,g.jsxs)("footer",{className:B.actions,children:[(0,g.jsx)(me.Button,{variant:"outline",disabled:p,onClick:()=>f>0?m(f-1):w(a),children:"\u4E0A\u4E00\u6B65"}),(0,g.jsx)(me.Button,{variant:"primary",className:B.primary,disabled:ee||!C||f===1&&(I==="local"&&!G||q&&(!O||fe)),onClick:()=>{E()},children:p?"\u4FDD\u5B58\u4E2D\u2026":f===2?"\u5B8C\u6210":f===1&&le?"\u542F\u7528 DeepSeek \u8BED\u97F3\u5408\u6210\u5E76\u7EE7\u7EED":"\u4E0B\u4E00\u6B65"})]})]})}var c=require("react/jsx-runtime"),Sr=e=>e.setupOpen||e.setupStatus?.completed!==!0,Xh={ARCHIVED:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u5DF2\u5F52\u6863\u3002\u6062\u590D\u539F\u4F1A\u8BDD\u6216\u66F4\u6362\u7ED1\u5B9A\u540E\u518D\u5F00\u59CB\u8BED\u97F3\u3002",BUSY:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F\u3002\u7B49\u8FD9\u8F6E\u7ED3\u675F\u540E\u518D\u5F00\u59CB\u8BED\u97F3\u3002",UNAVAILABLE:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528\u3002\u53EF\u66F4\u6362\u7ED1\u5B9A\u6216\u89E3\u9664\u7ED1\u5B9A\u3002"},Kd=e=>e.authorizationOpen||e.authorizationLoading&&!e.authorization;function Jd(e){let[t,n]=(0,Z.useState)(!1),o=(0,Z.useRef)(null),i=(0,Z.useRef)(null),r=(0,Z.useRef)(null),s=(0,Z.useRef)(null),a=e.useWhalePreferences(w=>w),l=e.useWhaleUi(w=>w),u=Kd(l),d=u||Sr(l)?"setup":l.panelView??"home",p=t&&d!=="settings",f=(0,Z.useCallback)(w=>{o.current=w,e.geometry.ref(w),e.sizing.ref(w)},[e.geometry,e.sizing]),m=(0,Z.useCallback)(w=>{i.current=w,e.sizing.contentRef(w)},[e.sizing]);(0,Z.useEffect)(()=>{e.setPanelVisible?.(!p)},[p]),(0,Z.useLayoutEffect)(()=>{i.current&&(i.current.scrollTop=0)},[d]),(0,Z.useLayoutEffect)(()=>e.sizing.update(),[d,p,u,l.sourcePending]),(0,Z.useEffect)(()=>{let w=o.current,C=w?.ownerDocument;s.current&&w&&C&&(C.activeElement===C.body||w.contains(C.activeElement))&&(d==="home"?w.querySelector("[data-whale-settings-trigger]")?.focus({preventScroll:!0}):d!==s.current&&w.focus({preventScroll:!0})),s.current=d},[d]);let b=w=>{let C=Cd(w);C&&e.recordUserOperation?.(C)},v=()=>{n(!0),requestAnimationFrame(()=>o.current?.querySelector("[data-whale-reopen]")?.focus())},y=()=>{e.refresh?.(),n(!1),requestAnimationFrame(()=>o.current?.focus())};return(0,qd.createPortal)((0,c.jsx)("section",{ref:f,className:h.floating,"data-whale-panel":!0,"data-view":d,"data-collapsed":p||void 0,"data-source-pending":l.sourcePending||void 0,"data-motion":a.motion,tabIndex:0,"aria-label":e.t("drag"),title:e.t("dragHint"),onPointerDownCapture:()=>e.geometry.activate?.(),onFocusCapture:()=>e.geometry.activate?.(),onPointerDown:w=>{if(w.button!==0||w.pointerType&&w.pointerType!=="mouse"||!dd(w.target,w.currentTarget)){r.current=null;return}let C=w.target,D=C.getBoundingClientRect?.();D&&C.scrollHeight>C.clientHeight&&C.offsetWidth>C.clientWidth&&w.clientX>=D.left+C.clientLeft+C.clientWidth||(r.current={id:w.pointerId,x:w.clientX,y:w.clientY,moved:!1},w.target.closest?.("button")||w.currentTarget.focus({preventScroll:!0}),e.geometry.pointerDown(w,w.target.closest?.("[data-drag-surface]")??w.currentTarget))},onPointerMove:w=>{let C=r.current;!C||w.pointerId!==C.id||(Math.hypot(w.clientX-C.x,w.clientY-C.y)>=4&&(C.moved=!0),e.geometry.pointerMove(w))},onPointerUp:w=>{w.nativeEvent?.isTrusted&&r.current?.id===w.pointerId&&r.current.moved&&e.recordUserOperation?.("panel-move"),e.geometry.pointerEnd(w)},onPointerCancel:w=>{e.geometry.pointerEnd(w),r.current=null},onLostPointerCapture:e.geometry.pointerEnd,onClickCapture:w=>{r.current?.moved&&w.detail!==0?(w.preventDefault(),w.stopPropagation()):b(w),r.current=null},onChangeCapture:b,onSubmitCapture:b,onKeyDownCapture:b,onKeyDown:w=>{w.key==="Escape"&&(w.stopPropagation(),d==="setup"&&!p?v():d==="settings"?e.showHome():p||v())},children:(0,c.jsx)("div",{ref:m,className:h.panelViewport,"data-whale-content":!0,children:e.renderSlot("whale-ear.panel.controls",{collapsed:p,collapse:v,expand:y})})}),document.body)}var Hd=()=>()=>{};function Gd(e){let{controlContext:t}=e,n=(0,Z.useSyncExternalStore)(t?.subscribe??Hd,()=>t?t.sourceFor(t.selectedSession()):e.sessionId??null),o=(0,Z.useSyncExternalStore)(t?.subscribe??Hd,()=>{let f=t?.currentConversation();return f===n?f:null});e={...e,sessionId:n,currentConversationId:o};let i=e.useWhaleUi(f=>f),[r,s]=(0,Z.useState)(!1);(0,Z.useLayoutEffect)(()=>{e.setSession?.(n)},[n]);let a=Kd(i),l=i.updates?.release?.version,u=!e.collapsed&&!a&&!Sr(i)&&i.panelView==="home"&&i.checkedFor===e.sessionId&&i.status?.enabled===!1&&i.status.ownerSessionId===null&&!i.status.voiceControlBusy&&i.status.voiceSession?.fullyStopped!==!1&&!i.busy&&!i.uncertain&&!i.updatesUnavailable&&i.updates?.status==="available"&&l&&l!==i.dismissedUpdateVersion;if((0,Z.useEffect)(()=>{u&&s(!0)},[u]),a||Sr(i)){let f=Sr(i);return(0,c.jsxs)(c.Fragment,{children:[e.collapsed&&(0,c.jsx)(Yd,{t:e.t,expand:e.expand}),a?(0,c.jsx)("div",{hidden:e.collapsed,children:(0,c.jsx)(Qh,{state:i,save:e.saveAuthorization,reload:e.openAuthorization,close:f?e.collapse:e.closeAuthorization,continueSetup:f?()=>e.closeAuthorization({resumeSetup:!0}):null})}):(0,c.jsx)("div",{role:"dialog","aria-modal":"false","aria-label":"\u9C7C\u5E94\u9996\u6B21\u914D\u7F6E","data-whale-setup":!0,hidden:e.collapsed,children:(0,c.jsx)(Vd,{pickPath:e.pickPath,state:i,sessionId:e.sessionId,run:e.run,refresh:e.refresh,t:e.t,onDismiss:e.dismissSetup,onMinimize:e.collapse,onBackToAuthorization:e.openAuthorization,asrStatus:(0,c.jsx)(Xd,{action:e.senseVoiceAsrAction,active:!e.collapsed})})})]})}let d=f=>{s(!0),f&&e.updateAction?.({action:"check"})},p=()=>{e.dismissUpdate?.(l),s(!1)};return(0,c.jsxs)(c.Fragment,{children:[i.panelView==="settings"?(0,c.jsx)(pg,{...e,openUpdate:d}):(0,c.jsx)(eg,{...e}),r&&(0,c.jsx)(Md,{state:i,close:p,run:e.updateAction,t:e.t})]})}function Qh({state:e,save:t,reload:n,close:o,continueSetup:i}){let r=e.authorization,s=e.authorizationBusy||e.authorizationLoading,a=r?.usageAgreement?.accepted===!0,l=a&&(e.authorizationNeedsReview||r?.granted&&r.modelSourcesChanged===!0),u=a&&r?.granted&&!l,d=r?.usageAgreement?.text??[];return(0,c.jsxs)("section",{role:"dialog","aria-modal":"false","aria-label":"\u9C7C\u5E94\u4F7F\u7528\u534F\u8BAE","data-whale-authorization":!0,"data-whale-intrinsic":!0,className:`${h.settings} ${h.authorization}`,children:[(0,c.jsxs)("header",{className:h.settingsHeader,children:[(0,c.jsx)(on,{}),(0,c.jsx)("h2",{children:a?"\u9C7C\u5E94\u4F7F\u7528\u534F\u8BAE":"\u6B22\u8FCE\u4F7F\u7528\u9C7C\u5E94"}),a&&!i&&(0,c.jsx)(J.Button,{variant:"outline",disabled:s,onClick:o,children:"\u8FD4\u56DE"})]}),(0,c.jsx)("div",{className:h.authorizationBody,"data-whale-authorization-body":!0,"data-no-drag":!0,children:(0,c.jsxs)("div",{"data-whale-natural-content":!0,children:[!a&&(0,c.jsx)("p",{className:h.authorizationSteps,children:"1 \u4F7F\u7528\u534F\u8BAE\u3000\xB7\u30002 \u57FA\u7840\u914D\u7F6E"}),(0,c.jsx)("h3",{children:"\u9C7C\u5E94\u64CD\u4F5C\u8303\u56F4"}),(0,c.jsx)("div",{className:h.agreement,children:d.map(p=>(0,c.jsx)("p",{children:p},p))}),e.authorizationLoading&&!r&&(0,c.jsx)("p",{role:"status",className:h.hint,children:"\u6B63\u5728\u8BFB\u53D6\u2026"}),r&&(0,c.jsxs)("details",{className:h.section,children:[(0,c.jsx)("summary",{children:"\u670D\u52A1\u4E0E\u6A21\u578B\u6765\u6E90"}),(0,c.jsx)("ul",{className:h.permissionList,children:r.scopes.map(p=>(0,c.jsxs)("li",{children:[(0,c.jsx)("strong",{children:p.title}),(0,c.jsx)("p",{className:h.hint,children:p.description})]},p.id))}),r.modelSources.map(p=>(0,c.jsxs)("div",{children:[(0,c.jsx)("strong",{children:p.modelId}),(0,c.jsx)("p",{className:h.hint,children:p.source}),p.runtime&&(0,c.jsxs)("p",{className:h.hint,children:["\u8FD0\u884C\u7EC4\u4EF6\uFF1A",(p.runtime.sources??[p.runtime.source]).join("\u3001")]}),(0,c.jsx)("p",{className:h.hint,children:p.licenseNote}),p.licenseUrls.map(f=>(0,c.jsx)("p",{className:h.hint,children:(0,c.jsx)("a",{href:f,target:"_blank",rel:"noreferrer",children:f})},f))]},p.modelId))]}),l&&(0,c.jsx)("p",{role:"status",className:h.hint,children:"\u5F53\u524D\u64CD\u4F5C\u9700\u8981\u8865\u5145\u6388\u6743\u3002\u8BF7\u5148\u6838\u5BF9\u670D\u52A1\u4E0E\u6A21\u578B\u6765\u6E90\u3002"}),(e.authorizationError||r?.revocationUnconfirmed)&&(0,c.jsx)("p",{role:"alert",className:h.error,children:r?.revocationUnconfirmed?"\u505C\u6B62\u8BBE\u5907\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u68C0\u67E5\u6216\u91CD\u542F\u5BBF\u4E3B\u3002":e.authorizationWriteUnconfirmed?"\u6388\u6743\u4FDD\u5B58\u7ED3\u679C\u5F85\u786E\u8BA4\u3002":"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u6388\u6743\u3002"}),(e.authorizationError||r?.revocationUnconfirmed)&&(0,c.jsx)(J.Button,{variant:"outline",disabled:s,onClick:()=>{n?.()},children:"\u91CD\u65B0\u8BFB\u53D6\u6388\u6743"})]})}),(0,c.jsxs)("div",{className:`${h.actions} ${h.authorizationActions}`,children:[(0,c.jsx)(J.Button,{className:h.primary,variant:"primary",disabled:!r||s||e.authorizationUncertain,onClick:()=>u?(i??o)():void t(!0),children:u?i?"\u7EE7\u7EED\u914D\u7F6E":"\u8FD4\u56DE":a&&l?"\u8865\u5145\u6388\u6743":"\u4E00\u952E\u6388\u6743\u5E76\u7EE7\u7EED"}),(0,c.jsx)(J.Button,{variant:"outline",disabled:s,onClick:u&&!i?()=>{t(!1)}:o,children:u?i?"\u7A0D\u540E":"\u64A4\u9500\u6388\u6743":l?"\u6682\u4E0D\u8C03\u6574":"\u6682\u4E0D\u4F7F\u7528"})]}),!a&&(0,c.jsx)("p",{className:h.hint,children:"\u4E0B\u4E00\u6B65\uFF1A\u9009\u62E9\u8BF4\u8BDD\u65B9\u5F0F\u4E0E\u8BED\u97F3\u6A21\u578B"})]})}function Yd({t:e,expand:t,markState:n="idle",compactState:o="off",enabled:i=!1}){return(0,c.jsxs)(J.Button,{className:h.bubble,"data-whale-reopen":!0,"data-whale-operation":"panel-open","data-drag-surface":!0,"aria-label":e("reopen"),title:e("title"),onClick:t,children:[(0,c.jsx)(on,{small:!0,state:n}),(0,c.jsx)("span",{className:h.bubbleBrand,children:e("title")}),(0,c.jsxs)("span",{className:h.bubbleStatus,"data-voice-state":o,children:[(0,c.jsx)(Ke,{name:i===!1?"micOff":"mic"}),(0,c.jsx)("span",{children:e("compact_"+o)})]}),(0,c.jsx)("span",{className:h.voiceBars,"data-active":o==="listening"||void 0,"aria-hidden":"true",children:[0,1,2,3,4].map(r=>(0,c.jsx)("i",{},r))}),(0,c.jsx)(Ke,{name:"down"})]})}function eg(e){let{t,sessionId:n}=e,o=e.useWhaleUi(ie=>ie),i=o.checkedFor===n?o.status:null,r=o.busy,s=!!i,a=o.uncertain||!s,l=e.useWhalePreferences(ie=>ie),u=po(i),d=o.conversationFor===n?o.conversation:null,p=u&&d?.rootSessionId===u&&!a?d:null,f=o.conversationHistoryFor===n&&!a&&(!i?.enabled||p?.rootSessionId===o.conversationHistory?.rootSessionId)?o.conversationHistory:null,m=p??{rootSessionId:f?.rootSessionId??null,items:[],latest:f?.items?.filter(ie=>ie.role==="assistant").at(-1)??null},b=!!(i?.enabled&&(o.conversationError||o.conversationFor===n&&o.conversation?.rootSessionId!==u)),v=yr(o,n),y=v?.kind==="cleanup",w=v?.kind==="restart",C=v?.kind==="conflict",D=i?.enabled||C,F=i?.enabled===!1&&i.voiceSession?.fullyStopped===!1,N=p?.helper??i?.helper,W=o.listenModePending?o.listenModeBefore:p?.helper&&p.revision!==o.listenModeReceiptRevision?p.helper.listenMode:i?.listenMode,M=!!(i?.enabled&&N?.online===!1),$=b||!!(i?.enabled&&W==null),I=!a&&!M&&!$&&kn.includes(W),k=r||F||!I||y||w||C||!i?.capabilities?.listenMode||i?.voiceControlBusy||o.visibilityUncertain||o.ttsUncertain||o.ttsCancelling,z=i?.enabled?p?.inputError:null,O=!i?.enabled&&o.enableError,S=Xh[/VOICE_EXISTING_(ARCHIVED|BUSY|UNAVAILABLE)/.exec(O??"")?.[1]],P=/VOICE_ROOT_OWNED_ELSEWHERE/.test(O??""),A=/VOICE_EXISTING_BINDING_CHANGED/.test(O??""),j=O&&o.settings?.voiceSession?.performanceMode==="fast"&&/VOICE_EXACT_EFFORT_HOST_REQUIRED|VOICE_FAST_/.test(O),L=n&&i?.ownerSessionId&&i.ownerSessionId!==n&&u!==n,K=i?.existingVoiceSession,q=K?.sessionId,fe=o.existingSessionWritePending||o.existingSessionUnconfirmed,le=i&&!a&&o.checkedFor===n&&!fe,ee=le&&i.existingVoiceSession,G=le?ee?hn(ee):t("dedicatedVoiceTarget"):t("checkingVoiceTarget"),E=(0,Z.useId)(),V=(0,Z.useId)(),re=d?.inputDelivery,ue=i?.enabled&&ee&&p?.retryTranscripts?.sessionId===ee.sessionId?p.retryTranscripts:null,ye=(ue?.items??[]).map(ie=>re?.id===ie.id?{...re,state:ie.state}:{...ie,sessionId:ue.sessionId});re&&!ye.some(ie=>ie.id===re.id)&&ye.push(re);let Xe=[ue?.items.length,...ye.map(ie=>ie.id)].join(","),Be=i?.existingVoiceSessionSupported===!0&&Object.hasOwn(i,"existingVoiceSession")&&e.listExistingVoiceSessions&&e.setExistingVoiceSession,it=Be&&hr(o,n),Jt=e.currentConversationId&&Be&&i.enabled===!1,he=!!(!ee&&!fe&&o.checkedFor===n&&i&&!r&&!i.voiceControlBusy&&!a&&!o.ttsUncertain&&!o.ttsCancelling&&!F&&!v&&!L),oe=p?.wake??i?.wake,je=y?"pending":w||C||F||a||$||M?"unknown":r?"pending":p?.inputActive===!0?"input-active":i?.enabled?"authorized":"idle",[$e,ut]=(0,Z.useState)(null),[wo,vn]=(0,Z.useState)(!1),Oe=$e==="targets"&&Be&&i.enabled===!1,gt=(0,Z.useRef)(!1),At=o.settingsFor===n?o.settings?.values:null,bn=o.settingsFor===n?o.settings?.ttsSetup:null,Et=bn?.provider==="deepseek"&&(!bn.deepseekTextTransmissionAccepted||o.authorization&&!xo(o)),Mr=bn?.provider==="custom"&&(!bn.customTts?.textTransmissionAccepted||!qi(o)),wt=At?.pttKeyboard?[...At.pttKeyboard.modifiers||[],At.pttKeyboard.code].join(" + "):At?.pttMouse?t("sideButton")+" "+At.pttMouse:null,$t=(0,Z.useRef)({}),Ot=()=>{gt.current=!0,ut(null)};(0,Z.useLayoutEffect)(()=>{ut(ie=>e.collapsed||ie==="targets"?null:ie),vn(!1)},[n,e.collapsed]),(0,Z.useEffect)(()=>{vn(!1),q&&ut(ie=>ie==="conversation"?null:ie)},[q]),(0,Z.useEffect)(()=>{i?.enabled&&ut(ie=>ie==="targets"?null:ie)},[i?.enabled]),(0,Z.useEffect)(()=>{Oe||!it||!gt.current||!$t.current.targets||(gt.current=!1,$t.current.targets.focus())},[Oe,it,e.collapsed]),(0,Z.useEffect)(()=>{!a&&!q&&$e==="conversation"&&i?.enabled===!1&&e.run(n,"read-history")},[$e,a,i?.enabled,n,q]);let Cr=rd({enabled:i?.enabled,active:p?.inputActive===!0,unknown:!i||a||$||M||!!v||F||!!z,pending:r||y}),sn=()=>!q&&$e==="conversation"&&(0,c.jsx)(yd,{conversation:m,history:f,historyLoading:o.sourcePending||!a&&o.conversationHistoryLoading,historyError:a?null:o.conversationHistoryError,historyRetryCursor:o.conversationHistoryRequestCursor,loadHistory:ie=>e.run(n,"read-history",ie?{cursor:ie}:{}),assistantName:l.assistantName||t("assistant"),setAssistantName:e.setAssistantName,t,close:()=>{ut(null),$t.current.conversation?.focus()}},m.rootSessionId??"empty");return e.collapsed?(0,c.jsx)(Yd,{t,expand:e.expand,markState:je,compactState:Cr,enabled:i?.enabled??null}):(0,c.jsxs)("div",{className:h.panelContent,"data-home-controls":!0,"data-has-input-caption":ye.length>0||void 0,"data-home-layout":[i?i.enabled?"active":"idle":"loading",Ir(o,n),!!(o.error||O),!!z,M,v?.kind,F,!!ee,Xe].join(":"),"data-size-detail":$e==="conversation"||Oe?"true":"false",onKeyDown:ie=>{!Oe||ie.key!=="Escape"||(ie.preventDefault(),ie.stopPropagation(),Ot())},children:[(0,c.jsxs)("div",{className:h.header,children:[(0,c.jsxs)("span",{className:h.brand,children:[(0,c.jsx)(on,{state:je}),(0,c.jsx)("strong",{children:t("title")})]}),(0,c.jsxs)("div",{className:h.headerActions,children:[(0,c.jsxs)(J.Button,{className:h.newChatButton,"data-whale-operation":"new-voice-session","aria-label":t("newChat"),title:ee?"\u89E3\u9664\u5DF2\u6709\u4F1A\u8BDD\u7ED1\u5B9A\u540E\u53EF\u65B0\u5EFA\u9C7C\u5E94\u4F1A\u8BDD":t(L?"newChatOtherOwner":i?.enabled?"newChatActive":"newChat"),disabled:!he,onClick:()=>{e.run(n,"new",{expectedOwnerSessionId:i.ownerSessionId})},children:[(0,c.jsx)(Ke,{name:"plus"}),(0,c.jsx)("span",{children:t("newChat")})]}),(0,c.jsx)(J.Button,{"data-whale-settings-trigger":!0,"data-whale-operation":"page-settings",className:h.iconButton,"aria-label":t("settings"),title:t("settings"),onClick:e.openSettings,children:(0,c.jsx)(Ke,{name:"settings"})}),(0,c.jsx)(J.Button,{"data-whale-operation":"panel-close",className:h.iconButton,"aria-label":t("collapse"),title:t("collapseHint"),onClick:e.collapse,children:(0,c.jsx)(Ke,{name:"minus"})})]})]}),(0,c.jsxs)("div",{className:h.statusRow,"data-bound":!!ee||void 0,"data-recording":je==="input-active"||void 0,children:[(0,c.jsx)("div",{id:E,className:h.voiceTarget,"data-whale-voice-target":!0,children:Be?(0,c.jsxs)(J.Button,{ref:ie=>{$t.current.targets=ie},variant:"outline",className:h.existingSessionHome,"data-whale-bound-session":ee?!0:void 0,"data-whale-target-trigger":!0,title:G,"aria-expanded":!!Oe,"aria-controls":Oe?V:void 0,disabled:!Oe&&!it,onClick:()=>Oe?Ot():ut("targets"),children:[(0,c.jsx)("span",{children:t("voiceTarget")}),(0,c.jsx)("strong",{className:h.ellipsis,children:G}),(0,c.jsx)(Ke,{name:Oe?"down":"chevron"})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("span",{children:t("voiceTarget")}),(0,c.jsx)("strong",{className:h.ellipsis,title:G,children:G})]})}),(0,c.jsxs)("div",{className:h.voiceStatus,children:[(0,c.jsx)(Ke,{name:i?.enabled?"mic":"micOff"}),(0,c.jsx)("span",{className:h.status,role:"status",children:o.listenModePending?t(i?.enabled?"modeSwitching":"modeSaving"):r?t("pending"):v?t(v.label):i?F?t("voiceStopPending"):a?t("stale"):M?t("voiceInputUnavailable"):$?t("unknown"):z?t("inputError_"+z):p?.inputActive===!0?t("inputActive"):i.enabled&&W==="wake"?t(cs(oe)):i.enabled?t("enabled"):t("disabled"):t("unknown")})]})]}),Oe?(0,c.jsx)(Vi,{...e,state:o,homePickerId:V,closeHomePicker:Ot}):(0,c.jsxs)(c.Fragment,{children:[Jt&&(0,c.jsx)(wd,{...e,sessionId:e.currentConversationId,boundSession:K,state:o},e.currentConversationId),(0,c.jsxs)("div",{className:h.quickActions,children:[(0,c.jsx)(J.Button,{"data-whale-operation":D?"stop-voice":"start-voice",className:`${h.mainAction} ${i?.enabled?"":h.primary}`,variant:i?.enabled?"outline":"primary","aria-describedby":E,disabled:!s||(D?!Ji(o)||y:r||!!fe||!!v||F||!le||!!(ee&&!qt(ee))),title:i?.enabled?t(ue?.items.length?"endDiscardsRetries":"stopConsequence"):void 0,onClick:()=>{e.run(n,D?"disable":"enable",D?{}:{expectedOwnerSessionId:null,expectedExistingSessionId:ee?.sessionId??null})},children:y?t("voiceCleanupPending"):w?t(i?.enabled?"endConversation":"voiceRestartPending"):C?t("voiceRecoveryCheck"):i?.enabled?t("endConversation"):t("startConversation")}),(0,c.jsx)("div",{className:h.quickSegments,role:"group","aria-label":t("mode"),"aria-busy":!!o.listenModePending,"data-listen-mode":I?W:"unknown",children:kn.map(ie=>(0,c.jsx)(J.Button,{"data-whale-operation":`listen-mode-${ie}`,"aria-pressed":I&&W===ie,disabled:!!k,onClick:()=>{W!==ie&&e.run(n,"listen-mode",{mode:ie})},children:t(Co(ie))},ie))})]}),ye.length>0&&(0,c.jsx)("ul",{className:h.inputCaptions,tabIndex:0,"aria-label":t("voiceTranscriptCaptions"),"data-whale-input-captions":!0,"data-no-drag":!0,children:ye.map(ie=>(0,c.jsx)(tg,{item:ie,t,pending:o.transcriptRetry,busy:r,canRetry:ue?.items.some(kt=>kt.id===ie.id),retry:()=>e.retryVoiceTranscript?.(n,ie.id)},ie.id))}),(!i||a||v||F)&&(0,c.jsx)("p",{className:h.hint,"data-home-important":!!v||F||void 0,children:t(v?.hint??(F?"voiceStopHint":r?"readingStatus":"statusRetry"))}),!a&&(!$||M)&&i?.enabled&&!y&&!w&&(0,c.jsx)("p",{className:h.hint,"data-whale-input-hint":!0,"data-home-important":z||M?!0:void 0,children:M?t("voiceInputRecoveryHint"):z?t("inputHelp_"+z):W==="wake"?t(oe?.streamOpen&&oe.detection==="asr-after-utterance"?"wakeFallbackHint":"wakeHint"):W==="always"?t("alwaysWarning"):wt?t("holdToSpeak")+" "+wt:t("bindingMissing")}),i&&!a&&!i.capabilities?.listenMode&&(0,c.jsx)("p",{className:h.hint,children:t("modeUnavailable")}),o.listenModeError&&(0,c.jsx)("p",{role:"alert","data-whale-mode-error":!0,className:h.error,children:t(o.uncertain?"modeSwitchUnconfirmed":"modeSwitchFailed")}),((o.readOnlyFailure&&a||F)&&!v||y||o.voiceStopUnconfirmed)&&(0,c.jsx)(J.Button,{variant:"outline",disabled:r,onClick:()=>{e.run(n,"status")},children:t("retryStatus")}),(o.error||O)&&!o.readOnlyFailure&&!S&&!P&&!o.listenModeError&&!C&&!w&&(0,c.jsx)("p",{role:"alert",className:h.error,children:t(A?"voiceTargetChanged":j?"performanceFastUnavailable":!o.uncertain&&O?"enableFailed":"operationUnavailable")}),P&&!v&&(0,c.jsxs)("p",{role:"alert",className:h.notice,children:[t("voiceTargetOccupied"),it&&(0,c.jsx)(J.Button,{variant:"outline",onClick:()=>ut("targets"),children:t("chooseVoiceTarget")})]}),S&&(0,c.jsxs)("p",{role:"alert",className:h.notice,children:[S," ",(0,c.jsx)(J.Button,{variant:"outline",disabled:!it,onClick:()=>ut("targets"),children:"\u7BA1\u7406\u7ED1\u5B9A"})]}),/VOICE_SESSION_ARCHIVED/.test(O??o.error??"")&&(0,c.jsxs)("p",{className:h.notice,children:["\u539F\u8BED\u97F3\u4F1A\u8BDD\u5DF2\u5F52\u6863\u3002",(0,c.jsx)(J.Button,{variant:"outline",onClick:()=>{e.openSettings("sessions")},children:"\u6062\u590D\u539F\u4F1A\u8BDD"})]}),/VOICE_ASR_(?:PREPARING|PREPARE_FAILED)/.test(O??o.error??"")&&(0,c.jsxs)("p",{className:h.notice,children:["SenseVoice \u5C1A\u672A\u5C31\u7EEA\u3002",(0,c.jsx)(J.Button,{variant:"outline",onClick:()=>{e.openSettings("models","download")},children:"\u67E5\u770B\u6A21\u578B\u8FDB\u5EA6"})]}),/VOICE_MODEL_REQUIRED/.test(O??o.error??"")&&(0,c.jsxs)("p",{className:h.notice,children:["\u8BF7\u5148\u9009\u62E9\u53EF\u7528\u7684\u5BF9\u8BDD\u6A21\u578B\u3002",(0,c.jsx)(J.Button,{variant:"outline",onClick:()=>{e.openSettings("models","conversation")},children:"\u8BBE\u7F6E\u5BF9\u8BDD\u6A21\u578B"})]}),(Et||Mr)&&(0,c.jsxs)("p",{className:h.notice,"data-home-important":!0,children:["\u6717\u8BFB\u5F85\u542F\u7528\uFF0C\u56DE\u7B54\u4F1A\u663E\u793A\u4E3A\u6587\u5B57\u3002",(0,c.jsx)(J.Button,{variant:"outline",onClick:()=>{e.openSettings("models","voice")},children:"\u8BBE\u7F6E\u6717\u8BFB"})]}),ee&&!qt(ee)&&(0,c.jsx)("p",{className:h.hint,"data-home-important":!0,children:fr(ee)}),p?.providerError&&(0,c.jsx)("p",{role:"alert","data-home-important":!0,"data-whale-provider-error":!0,className:h.error,children:p.providerError}),(0,c.jsx)(_d,{...e,state:o}),!ee&&!o.error&&!z&&!v&&!F&&!M&&!$&&(0,c.jsx)(ng,{...e,state:o}),wo&&(0,c.jsx)("p",{role:"alert",className:h.notice,children:"DSH \u6682\u65F6\u65E0\u6CD5\u6253\u5F00\u539F\u4F1A\u8BDD\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"}),qt(ee)&&e.openExistingVoiceSession&&(0,c.jsxs)(J.Button,{className:h.caption,"data-whale-operation":"open-native-session","aria-label":"\u6253\u5F00\u539F\u4F1A\u8BDD",onClick:async()=>{vn(!1);try{await e.openExistingVoiceSession(ee.sessionId)}catch{vn(!0)}},children:[p?.latest?.text&&(0,c.jsx)("span",{className:h.ellipsis,children:p.latest.text}),(0,c.jsx)("span",{className:h.openOriginal,children:"\u6253\u5F00\u539F\u4F1A\u8BDD"}),(0,c.jsx)(Ke,{name:"chevron"})]}),i&&!q&&(0,c.jsxs)(J.Button,{ref:ie=>{$t.current.conversation=ie},className:h.caption,onClick:()=>{let ie=$e!=="conversation";ut(ie?"conversation":null),ie&&e.run(n,"read-history")},"aria-label":t("recentConversation"),"aria-expanded":$e==="conversation",children:[(0,c.jsxs)("span",{className:h.ellipsis,children:[m.latest?.state==="speech-failed"?t("speechFailed")+": ":m.latest?.state==="interrupted"?t("speechInterrupted")+": ":"",m.latest?.text??t(o.newChatFor===n?"newChatCreated":"viewConversation")]}),(0,c.jsx)(Ke,{name:"chevron"})]}),sn()]})]})}function tg({item:e,pending:t,busy:n,canRetry:o,retry:i,t:r}){let s=(0,Z.useId)(),a=t?.id===e.id&&e.state==="ready"?t.state:e.state,l=hn(e);return(0,c.jsxs)("li",{className:h.inputCaption,"data-whale-input-caption":!0,"data-delivery-state":a,children:[(0,c.jsxs)("div",{id:s,children:[(0,c.jsx)("p",{className:h.inputCaptionText,children:e.text}),(0,c.jsxs)("p",{className:h.inputCaptionReceipt,role:"status",children:[(0,c.jsx)("span",{children:r("transcriptDelivery_"+a)}),(0,c.jsx)("span",{className:h.ellipsis,title:l,children:l})]})]}),o&&(0,c.jsx)(J.Button,{variant:"outline",disabled:n||!!t||a!=="ready",onClick:()=>{i()},"aria-describedby":s,"data-whale-operation":"retry-voice-transcript",children:r("retryTranscript")})]})}function Ir(e,t){return!!(e.settings?.revision&&e.settingsFor===t&&!e.visibilityUncertain&&!e.settingsConflict&&!e.ttsUncertain&&!e.ttsCancelling&&yo(e,t))}function ng({state:e,sessionId:t,t:n,run:o,readState:i}){let r=(0,Z.useRef)(0);(0,Z.useEffect)(()=>()=>{r.current++},[t]);let s=Ir(e,t),a=e.settings?.voiceSession?.performanceMode,l=e.performanceFor===t?e.performance:null,u=["fast","balanced","high"],d=l?.modes?.some(m=>m.performanceMode===a&&!m.available),p=e.busy||e.performancePending||e.uncertain||e.visibilityUncertain||!s,f=async m=>{if(p||m===a)return;let b=++r.current;if(m!=="compatibility"&&!await o(t,"inspect-performance")||b!==r.current)return;let v=i?.();!v||!Ir(v,t)||v.busy||m!=="compatibility"&&(v.performanceFor!==t||!v.performance?.modes?.find(y=>y.performanceMode===m)?.available)||await o(t,"set-performance-mode",{revision:v.settings.revision,performanceMode:m})};return s?(0,c.jsxs)("section",{className:h.quickSpeed,"aria-label":n("performanceTitle"),children:[(0,c.jsxs)("div",{className:h.quickSpeedHeader,children:[(0,c.jsx)("span",{children:n("performanceTitle")}),a==="compatibility"&&(0,c.jsx)("small",{children:n("performance_compatibility")})]}),(0,c.jsx)("div",{className:h.quickSegments,children:u.map(m=>(0,c.jsxs)(J.Button,{"aria-pressed":a===m,disabled:p||!!Yi(l,m),title:n(Yi(l,m)||(m==="fast"?"performanceFastHint":"performance_"+m)),onClick:()=>{f(m)},children:[a===m&&(0,c.jsx)(Ke,{name:"check"}),(0,c.jsx)(Qd,{value:m,t:n})]},m))}),(0,c.jsx)(ep,{capability:l,t:n,compact:!0,pending:e.performancePending,error:e.performanceError}),d&&(0,c.jsx)(J.Button,{variant:"outline",disabled:p,onClick:()=>{f("compatibility")},children:n("performance_compatibility")})]}):null}function og({settings:e,sessionId:t,busy:n,run:o,t:i,status:r,verified:s,statusFresh:a,tab:l,markSettingsEdited:u,discardSettingsDraft:d,bindingError:p,captureBindings:f}){let[m,b]=(0,Z.useState)(e.values.device??null),[v,y]=(0,Z.useState)(e.values.pttMouse),[w,C]=(0,Z.useState)(e.values.pttKeyboard??null),[D,F]=(0,Z.useState)(e.values.speakerVerification.enabled),N=e.capabilities?.turnSignals===!0,[W,M]=(0,Z.useState)(e.values.turnSignals?.enabled??!1),[$,I]=(0,Z.useState)(e.values.turnSignals?.volume?.toString()??""),[k,z]=(0,Z.useState)((e.values.wakeWordAliases??["\u5C0F\u9CB8\u9C7C"]).join("\uFF0C")),[O,S]=(0,Z.useState)(String((e.values.wakeListenTimeoutMs??1e4)/1e3)),P=us(k),A=zo(P)&&Number.isInteger(Number(O)*1e3)&&Number(O)>=3&&Number(O)<=30,j=JSON.stringify(P)!==JSON.stringify(e.values.wakeWordAliases??["\u5C0F\u9CB8\u9C7C"])||Number(O)*1e3!==(e.values.wakeListenTimeoutMs??1e4),[L,K]=(0,Z.useState)(e.values.semanticExperimental===!0),[q,fe]=(0,Z.useState)(e.values.turnSignals?.headphonesConfirmed??!1),[le,ee]=(0,Z.useState)(e.values.turnSignals?.experimentalAutomaticBargeIn??!1),G=v!==e.values.pttMouse||JSON.stringify(w)!==JSON.stringify(e.values.pttKeyboard??null),[E,V]=(0,Z.useState)(!1),re=a?r?.inputDevices:null,ue=m!==null&&typeof m=="object",ye=ue||m==null||m===""||re?.items?.some(oe=>typeof m=="number"&&oe.index===m),Xe=E==="index"&&(String(m??"").trim()===""||!/^\d+$/.test(String(m).trim())||!Number.isSafeInteger(Number(m))),Be=n||!a||r?.enabled!==!1||r?.ownerSessionId!==null||r?.voiceControlBusy!==!1||r?.voiceSession?.fullyStopped!==!0,it=()=>{if(n||!A||Xe||j&&Be)return;let oe=ue&&!E?m:E==="index"?Number(m):m==null||m===""?null:E==="name"?String(m).trim():typeof m=="number"?m:m.trim();o(t,"save-settings",{revision:e.revision,values:{wakeWordAliases:P,wakeListenTimeoutMs:Number(O)*1e3,semanticExperimental:L,device:oe,pttMouse:e.values.pttMouse,...e.capabilities?.pttKeyboard?{pttKeyboard:e.values.pttKeyboard??null}:{},speakerVerification:{enabled:D},...N?{turnSignals:{enabled:W,volume:Number($),headphonesConfirmed:q,experimentalAutomaticBargeIn:le}}:{}}})},Jt=(0,c.jsx)(J.Button,{className:h.primary,variant:"primary",disabled:n||!A||Xe||j&&Be||N&&($.trim()===""||!Number.isFinite(Number($))||Number($)<0||Number($)>1),onClick:it,children:i(n?"pending":"save")}),he=ue?m.name:re?.items?.find(oe=>oe.index===m)?.name??(m==null||m===""?i("deviceDefault"):String(m));return(0,c.jsxs)("div",{className:h.section,"data-settings-draft":"save-settings",children:[(0,c.jsxs)("div",{hidden:l!=="audio",className:h.section,children:[(0,c.jsx)("h3",{children:i("mode")}),(0,c.jsxs)("p",{className:h.hint,children:["\u5F53\u524D\uFF1A",i(Co(r?.listenMode??e.listenMode))]}),(0,c.jsx)("div",{className:h.segmented,children:["ptt","always","wake"].map(oe=>(0,c.jsx)(J.Button,{"data-whale-operation":`listen-mode-${oe}`,variant:"outline","aria-pressed":(r?.listenMode??e.listenMode)===oe,disabled:!e.capabilities?.listenMode||!s||n,onClick:()=>{o(t,"listen-mode",{mode:oe})},children:i(Co(oe))},oe))}),(!e.capabilities?.listenMode||!s)&&(0,c.jsx)("p",{className:h.hint,children:i(e.capabilities?.listenMode?"modeNeedsGrant":"modeUnavailable")}),(0,c.jsxs)("div",{className:h.inlineActions,children:[(0,c.jsxs)("label",{className:h.inlineField,children:[i("device"),(0,c.jsxs)("select",{title:he,className:h.deviceSelect,"aria-label":i("device"),disabled:n,value:E?"__manual-"+E:ue?"__stable":ye?m??"":"__saved",onChange:oe=>{let je=oe.target.value;je.startsWith("__manual-")?(V(je.slice(9)),ue&&b("")):je!=="__saved"&&je!=="__stable"&&(V(!1),b(je===""?null:Number(je)))},children:[(0,c.jsx)("option",{value:"",children:i("deviceDefault")}),ue&&(0,c.jsx)("option",{value:"__stable",children:m.name}),re?.items?.map(oe=>(0,c.jsxs)("option",{value:String(oe.index),children:[oe.name," (",oe.index,")"]},oe.index)),!ye&&(0,c.jsxs)("option",{value:"__saved",children:[i("deviceSaved"),": ",m]}),(0,c.jsx)("option",{value:"__manual-index",children:i("deviceManualIndex")}),(0,c.jsx)("option",{value:"__manual-name",children:i("deviceManualName")})]})]}),Jt]}),he.length>22&&(0,c.jsxs)("details",{className:h.fullName,children:[(0,c.jsx)("summary",{children:"\u67E5\u770B\u8BBE\u5907\u5168\u540D"}),(0,c.jsx)("p",{children:he})]}),(E||!ye)&&(0,c.jsxs)("label",{className:h.field,children:[i("deviceManual"),(0,c.jsx)(J.Input,{"aria-label":i("deviceManual"),disabled:n,value:m??"",onChange:oe=>{E||V(typeof m=="number"?"index":"name"),b(oe.target.value)}})]}),Xe&&(0,c.jsx)("p",{className:h.notice,children:i("deviceIndexInvalid")}),re?.status!=="available"&&(0,c.jsx)("p",{className:h.hint,children:i(re?.status==="empty"?"deviceEmpty":"deviceUnknown")})]}),(0,c.jsx)("div",{hidden:l!=="interaction",className:h.section,children:(0,c.jsxs)("div",{className:h.bindingEditor,"data-settings-draft":"save-bindings",children:[(0,c.jsx)(sg,{captureBindings:f,sessionId:t,active:l==="interaction",value:w,onChange:oe=>{u?.("save-bindings"),C(oe)},capability:e.capabilities?.pttKeyboard,disabled:n||!a,t:i}),(0,c.jsxs)("fieldset",{className:`${h.radios} ${h.mouseBinding}`,disabled:n||!a,children:[(0,c.jsx)("legend",{children:i("sideButton")}),[0,1,2].map((oe,je)=>(0,c.jsxs)("label",{children:[(0,c.jsx)("input",{type:"radio",name:"whale-ear-mouse",value:oe,checked:v===oe,onChange:()=>{u?.("save-bindings"),y(oe)}}),i(["sideOff","sideOne","sideTwo"][je])]},oe))]}),p&&(0,c.jsx)("p",{role:"alert",className:h.notice,children:/RECORDING|KEYS_HELD/.test(p)?"\u8BF7\u5148\u677E\u5F00\u6309\u952E\uFF0C\u7B49\u5F85\u5F55\u97F3\u5904\u7406\u5B8C\u6210\uFF0C\u518D\u4FDD\u5B58\u3002":/UNCONFIRMED|STOP_UNCONFIRMED|ROLLBACK_UNCONFIRMED/.test(p)?"\u6309\u952E\u72B6\u6001\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u91CD\u542F DSH \u518D\u6838\u67E5\u6309\u952E\u3002":/STALE|配置已改变|语音会话已改变/.test(p)?"\u914D\u7F6E\u6216\u8BED\u97F3\u4F1A\u8BDD\u5DF2\u6539\u53D8\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6\u540E\u518D\u4FDD\u5B58\u3002":/UNSUPPORTED/.test(p)?"\u5F53\u524D\u7CFB\u7EDF\u4E0D\u652F\u6301\u5728\u5BF9\u8BDD\u4E2D\u66F4\u6362\u5168\u5C40\u6309\u952E\u3002":"\u672A\u80FD\u4FDD\u5B58\u6309\u952E\uFF0C\u8BF7\u67E5\u770B\u9AD8\u7EA7\u8BE6\u60C5\u3002"}),(0,c.jsxs)("div",{className:`${h.actions} ${h.bindingActions}`,children:[(0,c.jsx)(J.Button,{className:h.primary,variant:"primary",disabled:n||!a||!G||!e.bindingContext||w?.code==="F4"&&w.modifiers.includes("Alt"),onClick:()=>{o(t,"save-bindings",{revision:e.revision,bindingContext:e.bindingContext,values:{pttMouse:v,pttKeyboard:w}})},children:i("saveBindings")}),G&&(0,c.jsx)(J.Button,{variant:"outline",disabled:n,onClick:()=>{y(e.values.pttMouse),C(e.values.pttKeyboard??null),d?.("save-bindings")},children:i("discardBindings")})]})]})}),(0,c.jsxs)("div",{hidden:l!=="advanced"||!e.values.speakerVerification.enabled,className:h.section,children:[e.values.speakerVerification.enabled&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(Hn,{label:i("speaker"),checked:D,disabled:n,onChange:F}),(0,c.jsx)("p",{className:h.hint,children:i("speakerHint")})]}),(0,c.jsx)("p",{className:h.hint,children:i("savedHint")})]}),(0,c.jsxs)("div",{hidden:l!=="audio",className:h.disclosureRow,children:[(0,c.jsxs)("details",{className:h.section,children:[(0,c.jsx)("summary",{children:i("wakeSettings")}),(0,c.jsx)("p",{className:h.hint,children:i("wakeMethod")}),(0,c.jsxs)("label",{className:h.field,children:[i("wakeAliases"),(0,c.jsx)(J.Input,{"aria-label":i("wakeAliases"),maxLength:208,value:k,disabled:Be,onChange:oe=>z(oe.target.value)})]}),(0,c.jsx)("p",{className:h.hint,children:i("wakeAliasesHint")}),(0,c.jsxs)("label",{className:h.field,children:[i("wakeTimeout"),(0,c.jsx)(J.Input,{"aria-label":i("wakeTimeout"),type:"number",min:"3",max:"30",step:"1",value:O,disabled:Be,onChange:oe=>S(oe.target.value)})]}),Be&&(0,c.jsx)("p",{className:h.hint,children:i("wakeStopToEdit")}),!A&&(0,c.jsx)("p",{role:"alert",className:h.notice,children:i("wakeInvalid")})]}),(0,c.jsxs)("details",{className:h.section,children:[(0,c.jsx)("summary",{children:i("soundTitle")}),(0,c.jsx)(Hn,{label:i("soundEnabled"),checked:W,disabled:!N||n,onChange:M}),(0,c.jsxs)("label",{className:h.field,children:[i("soundVolume"),(0,c.jsx)(Vn,{"aria-label":i("soundVolume")+"\u6ED1\u5757",min:"0",max:"1",step:"0.05",value:$,disabled:!N||n,onChange:oe=>I(oe.target.value)}),(0,c.jsx)(J.Input,{type:"number",min:"0",max:"1",step:"0.05","aria-label":i("soundVolume"),disabled:!N||n,value:$,onChange:oe=>I(oe.target.value)})]}),(0,c.jsx)(Hn,{label:"\u5B9E\u9A8C\u6027\u5524\u9192\u5224\u65AD\uFF08\u9ED8\u8BA4\u5173\u95ED\uFF09",checked:L,disabled:n,onChange:K}),(0,c.jsx)("p",{className:h.hint,children:"\u5173\u95ED\u65F6\uFF0C\u81EA\u7531\u9EA6\u76F4\u63A5\u542C\u53D6\u6709\u6548\u8BED\u97F3\uFF1B\u5F00\u542F\u540E\u4F7F\u7528\u5524\u9192\u8BCD\u6216\u8BED\u4E49\u5224\u65AD\uFF0C\u53EF\u80FD\u6F0F\u5524\u9192\u3002\u5EFA\u8BAE\u4F7F\u7528\u8033\u673A\u51CF\u5C11\u56DE\u58F0\u3002"}),(0,c.jsx)(J.Checkbox,{label:i("headphones"),checked:q,disabled:!N||n,onChange:oe=>{fe(oe),oe||ee(!1)}}),(0,c.jsx)("p",{className:h.hint,children:i("headphonesHint")}),(0,c.jsx)(Hn,{label:i("automaticBargeIn"),checked:le,disabled:!N||!q||n,onChange:ee}),N&&!q&&(0,c.jsx)("p",{className:h.hint,children:i("headphonesRequired")}),(0,c.jsx)("p",{className:h.hint,children:i(N?"soundAvailable":"soundUnavailable")})]})]}),l==="advanced"&&e.values.speakerVerification.enabled&&(0,c.jsx)("div",{className:h.formActions,children:Jt})]})}function Xd({action:e,active:t}){let[n,o]=(0,Z.useState)(null),[i,r]=(0,Z.useState)(0),s=(0,Z.useRef)(0);if((0,Z.useEffect)(()=>{if(!e||!t)return;let u=new AbortController,d,p=async m=>{try{let b=await e({operation:m},u.signal);if(u.signal.aborted)return;o(b),b.selected&&(m==="retry"||["idle","downloading"].includes(b.state))&&(d=setTimeout(()=>{p("status")},1e3))}catch{u.signal.aborted||o({state:"unavailable"})}},f=i>s.current?"retry":"status";return s.current=i,p(f),()=>{clearTimeout(d),u.abort()}},[e,t,i]),!e||!t)return null;let a=n?.totalBytes>0&&n?.state==="downloading",l=u=>(u/1e6).toFixed(1);return(0,c.jsxs)("div",{className:h.section,"data-whale-sensevoice":!0,children:[(0,c.jsx)("h3",{children:"SenseVoice"}),(0,c.jsx)("p",{role:"status",children:n?.selected===!1?"\u4F7F\u7528\u9AD8\u7EA7\u8DEF\u5F84\u4E2D\u6307\u5B9A\u7684\u672C\u5730 SenseVoice \u6A21\u578B\u3002":n?.state==="ready"?"\u5DF2\u5C31\u7EEA\uFF0C\u5728\u672C\u673A\u79BB\u7EBF\u8BC6\u522B\u3002":n?.state==="error"?n.message:n?.state==="unavailable"?"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u6A21\u578B\u72B6\u6001\u3002":a?`\u6B63\u5728\u4E0B\u8F7D \xB7 ${l(n.receivedBytes)} / ${l(n.totalBytes)} MB`:"\u6B63\u5728\u51C6\u5907\u672C\u5730\u8BC6\u522B\u6A21\u578B\u2026"}),a&&(0,c.jsx)("progress",{"aria-label":"SenseVoice \u4E0B\u8F7D\u8FDB\u5EA6",value:n.receivedBytes,max:n.totalBytes}),n?.selected&&n?.state==="error"&&(0,c.jsx)(J.Button,{variant:"outline",onClick:()=>{o(null),r(u=>u+1)},children:"\u91CD\u8BD5\u4E0B\u8F7D"})]})}function rg({settings:e,sessionId:t,busy:n,run:o,t:i,pickPath:r,active:s,modelTab:a,markSettingsEdited:l,senseVoiceAsrAction:u}){let[d,p]=(0,Z.useState)(e.modelSetup.models),f=n,m=()=>l?.("save-models"),b=()=>{o(t,"save-models",{revision:e.revision,values:{asr:"sensevoice",modelCompute:"cpu",models:d}})};return(0,c.jsxs)("section",{className:h.section,"data-settings-draft":"save-models",hidden:!["download","paths"].includes(a),children:[(0,c.jsx)("div",{"data-whale-tab-panel":!0,hidden:a!=="download",children:(0,c.jsx)(Xd,{action:u,active:s&&a==="download"})}),(0,c.jsxs)("div",{hidden:a!=="paths",className:h.section,children:[(0,c.jsx)("h3",{children:"\u8BC6\u522B\u6A21\u578B\u672C\u5730\u8DEF\u5F84"}),(0,c.jsx)("p",{className:h.hint,children:"\u53EF\u5728\u201C\u6A21\u578B\u4E0B\u8F7D\u201D\u67E5\u770B\u51C6\u5907\u8FDB\u5EA6\uFF0C\u6216\u5728\u8FD9\u91CC\u6307\u5B9A\u672C\u673A\u5DF2\u6709\u7684 SenseVoice \u76EE\u5F55\u3002"}),[["sensevoiceDir","sensevoicePath"],["campplus","campplusPath"]].map(([v,y])=>(0,c.jsx)(go,{className:h.pathRow,label:i(y),kind:v,value:d[v],disabled:f,active:s&&a==="paths",pickPath:r,sessionId:t,scope:"sensevoice",onChange:w=>{m(),p(C=>({...C,[v]:w}))}},v)),(0,c.jsx)(J.Button,{variant:"outline",disabled:f,onClick:b,children:i("saveModels")})]})]})}function ig({settings:e,state:t,sessionId:n,run:o,t:i}){let[r,s]=(0,Z.useState)(e.voiceSession.visibility),a=t.settingsFor===n,l=t.checkedFor===n&&t.status!==null,u=l?t.status.voiceCapabilities:e.voiceCapabilities,d=l?t.status.voiceSession:null,p=l&&(t.status.enabled||t.status.ownerSessionId!==null||d?.id!=null),f=l&&t.status.voiceControlBusy===!1,m=t.busy||t.uncertain||!a||!l||!f||p,b=v=>i(v==="workspace"?"workspaceMode":"hiddenMode");return(0,c.jsxs)("section",{className:h.section,"data-whale-visibility":!0,"data-settings-draft":"set-visibility",children:[(0,c.jsx)("h3",{children:i("capabilityTitle")}),(0,c.jsx)("dl",{className:h.details,children:["hidden","workspace"].map(v=>(0,c.jsxs)("div",{className:h.capabilityRow,children:[(0,c.jsx)("dt",{children:b(v)}),(0,c.jsxs)("dd",{children:[i(u?.[v]?.supported?"supported":"unsupported"),u?.[v]?.reason?` \xB7 ${u[v].reason}`:""]})]},v))}),(0,c.jsxs)("p",{className:h.hint,children:[i("taskCapability"),": ",i(u?.taskHandoff?.supported?"supported":"unsupported")," \xB7 ",u?.taskHandoff?.mode??i("unknown"),u?.taskHandoff?.reason?` \xB7 ${u.taskHandoff.reason}`:""]}),(0,c.jsxs)("p",{children:[i("configuredMode"),": ",b(e.voiceSession.visibility)]}),(0,c.jsx)("p",{className:h.hint,children:l?d?.id?`${i("currentVoiceMode")}: ${d.presentation?.requested?b(d.presentation.requested):i("unknown")} \xB7 ${d.id}`:i("noActiveVoice"):i("modeReadFirst")}),(0,c.jsxs)("fieldset",{className:h.radios,disabled:m,children:[(0,c.jsx)("legend",{children:i("chooseVisibility")}),(0,c.jsxs)("label",{children:[(0,c.jsx)("input",{type:"radio",name:"whale-ear-visibility",checked:r==="hidden",onChange:()=>s("hidden")}),i("hiddenMode")]}),(0,c.jsxs)("label",{children:[(0,c.jsx)("input",{type:"radio",name:"whale-ear-visibility",checked:r==="workspace",disabled:!u?.workspace?.supported,onChange:()=>s("workspace")}),i("workspaceMode")]})]}),(0,c.jsx)("p",{className:h.hint,children:i("workspaceWarning")}),(0,c.jsx)("p",{className:h.hint,children:i("visibilityNoMigration")}),(!a||!l)&&(0,c.jsx)("p",{className:h.hint,children:i("modeReadFirst")}),p&&(0,c.jsx)("p",{className:h.hint,children:i("closeBeforeMode")}),l&&!f&&(0,c.jsx)("p",{className:h.hint,children:i("modeControlPending")}),(0,c.jsx)("div",{children:(0,c.jsx)(J.Button,{variant:"outline",disabled:m||r===e.voiceSession.visibility||r==="workspace"&&!u?.workspace?.supported,onClick:()=>{o(n,"set-visibility",{revision:e.revision,visibility:r})},children:i(r==="workspace"?"saveWorkspace":"saveHidden")})})]})}function sg({value:e,onChange:t,capability:n,disabled:o,t:i,captureBindings:r,sessionId:s,active:a}){let[l,u]=(0,Z.useState)(!1),[d,p]=(0,Z.useState)(!1),[f,m]=(0,Z.useState)(null),b=(0,Z.useRef)(null),v=(0,Z.useRef)(0),y=(0,Z.useRef)(null),w=(0,Z.useRef)(!0),C=async N=>{v.current++,w.current&&u(!1);let W=b.current;if(W){w.current&&p(!0);try{await r(W.sessionId,{operation:"end",token:W.token}),b.current===W&&(b.current=null),w.current&&N&&t(N),w.current&&m(null)}catch(M){w.current&&m(String(M.message||M))}finally{w.current&&p(!1)}}},D=async()=>{if(b.current||d)return;let N=++v.current;p(!0),m(null);try{let W=await r(s,{operation:"begin"});if(b.current={...W,sessionId:s},!w.current||N!==v.current){await C();return}u(!0),y.current?.focus()}catch(W){w.current&&m(String(W.message||W))}finally{w.current&&p(!1)}};(0,Z.useEffect)(()=>(w.current=!0,()=>{w.current=!1,C()}),[]),(0,Z.useEffect)(()=>{(!a||o)&&(v.current++,C())},[a,o,s]),(0,Z.useEffect)(()=>{if(!l)return;let N=null,W=!1,M=!1,$=P=>{M||(M=!0,C(P))},I=P=>{if(P.preventDefault(),P.stopPropagation(),P.code==="Escape"){N=null;return}P.repeat||["ControlLeft","ControlRight","AltLeft","AltRight","ShiftLeft","ShiftRight"].includes(P.code)||(N=pd(P),W=!1,m(N?null:i("bindingUnsupported")))},k=P=>{if(P.preventDefault(),P.stopPropagation(),P.code==="Escape"){$();return}N&&(P.code===N.code&&(W=!0),W&&!P.ctrlKey&&!P.altKey&&!P.shiftKey&&$(N))},z=()=>$(),O=()=>{document.hidden&&z()};window.addEventListener("keydown",I,!0),window.addEventListener("keyup",k,!0),window.addEventListener("blur",z),document.addEventListener("visibilitychange",O);let S=setTimeout(z,1e4);return()=>{clearTimeout(S),window.removeEventListener("keydown",I,!0),window.removeEventListener("keyup",k,!0),window.removeEventListener("blur",z),document.removeEventListener("visibilitychange",O)}},[l]);let F=e?[...e.modifiers||[],e.code].join(" + "):i("bindingOff");return(0,c.jsxs)("section",{className:h.keyBinding,children:[(0,c.jsx)("h3",{children:i("keyboardBinding")}),(0,c.jsxs)("div",{className:h.keyBindingRow,children:[(0,c.jsx)("span",{children:F}),(0,c.jsxs)("div",{className:h.actions,children:[(0,c.jsx)(J.Button,{variant:"outline",ref:y,onBlur:()=>{l&&C()},disabled:o||d||!n?.supported||!r,onClick:()=>l?void C():void D(),children:d?"\u6B63\u5728\u4EA4\u63A5\u2026":l?"\u53D6\u6D88\u5F55\u5165":"\u5F55\u5165\u6309\u952E"}),e&&(0,c.jsx)(J.Button,{variant:"outline",disabled:o||d||l,onClick:()=>t(null),children:i("clearBinding")}),b.current&&!l&&!d&&(0,c.jsx)(J.Button,{variant:"outline",onClick:()=>{C()},children:"\u6062\u590D\u539F\u6309\u952E"})]})]}),l&&(0,c.jsx)("p",{role:"status",className:h.notice,children:"\u6309\u952E\u8BF4\u8BDD\u5DF2\u6682\u505C\u3002\u8BF7\u6309\u4E0B\u7EC4\u5408\u952E\u540E\u5168\u90E8\u677E\u5F00\uFF1BEsc \u53D6\u6D88\u3002"}),!n?.supported&&(0,c.jsx)("p",{className:h.hint,children:n?.reason||i("bindingUnavailable")}),f&&(0,c.jsx)("p",{role:"alert",children:f})]})}function Qd({value:e,t}){let n={fast:"performanceNoThinking",balanced:"performanceRecommended"}[e];return(0,c.jsxs)("span",{className:h.performanceChoice,children:[t("performance_"+e),n&&(0,c.jsxs)(c.Fragment,{children:[" ",(0,c.jsx)("small",{children:t(n)})]})]})}function Yi(e,t){let n=e?.modes?.find(o=>o.performanceMode===t);return!n||n.available?null:n.reason==="provider_unsupported"?"performanceUnavailable":n.reason==="unknown"?"performanceProbeUnknown":t==="fast"?"performanceFastUnavailable":"performanceHostUnavailable"}function ep({capability:e,t,compact:n=!1,pending:o=!1,error:i=null}){let r=e?.modes??[],s=r.map(v=>v.reason),a=e?.probe?.status,l=a==="unknown"||s.includes("unknown"),u=o||a==="pending"||a==="running",d=!n&&(a==="accepted"||s.includes("accepted")),p=!n&&s.includes("explicit_off"),f=r.some(v=>v.performanceMode==="fast"&&!v.available&&v.reason==="host_contract_blocked"),m=s.includes("provider_unsupported"),b=r.some(v=>v.performanceMode!=="fast"&&!v.available&&v.reason==="host_contract_blocked");if(!l&&!u&&!d&&!p&&!f&&!m&&!b&&!i)return null;if(n){let v=i||t(u?"performanceProbePending":f?"performanceFastUnavailable":m?"performanceUnavailable":l?"performanceProbeUnknown":"performanceHostUnavailable");return(0,c.jsx)("div",{role:"status",className:h.quickHint,"data-whale-probe-status":!0,title:v,children:v})}return(0,c.jsxs)("div",{role:"status",className:h.hint,"data-whale-probe-status":!0,children:[u&&(0,c.jsx)("p",{children:t("performanceProbePending")}),i&&(0,c.jsx)("p",{"data-whale-probe-error":!0,children:i}),f&&(0,c.jsx)("p",{children:t("performanceFastUnavailable")}),m&&(0,c.jsx)("p",{children:t("performanceUnavailable")}),b&&(0,c.jsx)("p",{children:t("performanceHostUnavailable")}),l&&(0,c.jsx)("p",{children:t("performanceProbeUnknown")}),d&&(0,c.jsx)("p",{children:t("performanceProbeAccepted")}),p&&(0,c.jsx)("p",{children:t("performanceFastHint")})]})}function ag({state:e,sessionId:t,run:n,t:o,markSettingsEdited:i}){let r=e.settings,s=r?.voiceSession?.performanceMode??null,[a,l]=(0,Z.useState)(s),u=Ir(e,t),d=e.performanceFor===t?e.performance:null,p=d?.modes?.find(m=>m.performanceMode===a),f=e.busy||e.performancePending||e.uncertain||!u||!a||a!=="compatibility"&&!p?.available;return u?(0,c.jsxs)("section",{className:h.section,"data-whale-performance":!0,"data-settings-draft":"set-performance-mode",children:[(0,c.jsx)("h3",{children:o("performanceTitle")}),(0,c.jsx)("p",{className:h.hint,children:o("performanceHint")}),(0,c.jsx)("p",{className:h.hint,"data-whale-probe-cost":!0,children:"\u90E8\u5206\u6A21\u578B\u7684\u68C0\u6D4B\u4F1A\u53D1\u9001\u8BA1\u8D39\u77ED\u8BF7\u6C42\u3002"}),(0,c.jsxs)("details",{className:h.details,children:[(0,c.jsx)("summary",{children:"\u68C0\u6D4B\u8303\u56F4\u4E0E\u8D39\u7528"}),(0,c.jsx)("p",{children:o("performanceProbeCost")}),(0,c.jsx)("p",{children:o("performanceProbeScope")})]}),(0,c.jsx)(ep,{capability:d,t:o,pending:e.performancePending,error:e.performanceError}),!d&&(0,c.jsx)("p",{className:h.hint,children:o("performanceReadFirst")}),s&&(0,c.jsxs)("p",{className:h.hint,children:["\u5F53\u524D\uFF1A",o("performance_"+s)]}),(0,c.jsx)("div",{className:h.segmented,children:["fast","balanced","high","compatibility"].map(m=>{let b=m==="compatibility"?null:d?Yi(d,m):"performanceReadFirst";return(0,c.jsx)(J.Button,{title:b?o(b):void 0,"aria-pressed":a===m,disabled:e.busy||e.performancePending||!!b,onClick:()=>{i?.("set-performance-mode"),l(m)},children:(0,c.jsx)(Qd,{value:m,t:o})},m)})}),(0,c.jsxs)("div",{className:h.actions,children:[(0,c.jsx)(J.Button,{variant:"outline",disabled:e.busy||e.performancePending,onClick:()=>{n(t,"inspect-performance")},children:o("inspectPerformance")}),(0,c.jsx)(J.Button,{variant:"outline",disabled:f||a===s,onClick:()=>{n(t,"set-performance-mode",{revision:r.revision,performanceMode:a})},children:o("savePerformance")})]})]}):null}function cg({state:e,sessionId:t,run:n,t:o}){let i=e.outputVolumeFor===t?e.outputVolume:null,[r,s]=(0,Z.useState)(null),[a,l]=(0,Z.useState)(null),u=r??i?.volume??1,d=r!==null&&a!==i?.revision;return(0,Z.useEffect)(()=>{s(null),l(null)},[t]),(0,c.jsxs)("section",{className:h.section,children:[(0,c.jsx)("h3",{children:o("outputVolume")}),i&&!i.supported&&(0,c.jsx)("p",{className:h.hint,children:o("outputVolumeUnavailable")}),i?.supported&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{className:h.volumeRow,children:[(0,c.jsxs)("label",{className:h.volumeControl,children:[(0,c.jsx)(Vn,{"aria-label":o("outputVolume"),min:"0",max:"1",step:"0.01",value:u,disabled:!i.supported||e.busy||e.outputVolumeUncertain,onChange:p=>{r===null&&l(i.revision),s(Number(p.target.value))}}),(0,c.jsxs)("span",{children:[Math.round(u*100),"%"]})]}),(0,c.jsx)(J.Button,{variant:"outline",disabled:!i.supported||e.busy||e.outputVolumeUncertain||d||r===null,onClick:async()=>{await n(t,"set-output-volume",{revision:a,volume:r})&&s(null)},children:o("saveOutputVolume")})]}),(0,c.jsx)("p",{className:h.hint,children:"\u4E0B\u4E00\u6BB5\u64AD\u653E\u751F\u6548"})]}),d&&(0,c.jsxs)("p",{role:"status",className:h.notice,children:["\u97F3\u91CF\u5DF2\u5728\u522B\u5904\u66F4\u65B0\uFF0C\u5F53\u524D\u9009\u62E9\u5DF2\u4FDD\u7559\u3002",(0,c.jsx)(J.Button,{variant:"outline",disabled:e.busy,onClick:()=>s(null),children:"\u4F7F\u7528\u5F53\u524D\u97F3\u91CF"})]}),!i&&(0,c.jsx)("p",{role:"status",className:h.hint,children:e.busy?o("pending"):o("statusRetry")}),e.outputVolumeUncertain&&(0,c.jsx)("p",{role:"status",className:h.notice,children:o("outputVolumeUnknown")})]})}function lg({state:e,sessionId:t,run:n,markSettingsEdited:o,discardSettingsDraft:i}){let r=e.settingsFor===t?e.settings:null,s=r?.conversationModel??{mode:"auto",provider:null,model:null},[a,l]=(0,Z.useState)(s),[u,d]=(0,Z.useState)(""),[p,f]=(0,Z.useState)(!1),m=(0,Z.useRef)(!1),b=(0,Z.useRef)(!0);(0,Z.useEffect)(()=>(b.current=!0,()=>{b.current=!1}),[]);let v=e.conversationModelsFor===t?e.conversationModels:null,y=v?.providers??[],w=y.find($=>$.id===a.provider),C=a.mode==="auto"||!!w?.models.some($=>$.id===a.model),D=JSON.stringify(a)!==JSON.stringify(s),F=yo(e,t),N=!r||!F||e.busy||e.settingsConflict||e.visibilityUncertain||p,W=$=>{o?.("save-conversation-model"),l(I=>({...I,...$})),d("")},M=async()=>{if(N||m.current||!D||!C)return;m.current=!0,f(!0),d("");let $=await n(t,"save-conversation-model",{revision:r.revision,values:a.mode==="auto"?{mode:"auto",provider:null,model:null}:a});m.current=!1,b.current&&(f(!1),d($?"\u9ED8\u8BA4\u5DF2\u4FDD\u5B58\uFF0C\u4E0B\u6B21\u5F00\u542F\u8BED\u97F3\u751F\u6548\u3002":"\u4FDD\u5B58\u672A\u6210\u529F\uFF0C\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002\u8BF7\u6838\u67E5\u63D0\u793A\u540E\u518D\u64CD\u4F5C\u3002"))};return(0,c.jsxs)("section",{className:h.section,"data-conversation-model":!0,"data-settings-draft":"save-conversation-model",children:[(0,c.jsx)("h3",{children:"\u9ED8\u8BA4\u5BF9\u8BDD\u6A21\u578B"}),(0,c.jsx)("p",{className:h.hint,children:"\u63A5\u6536\u8BED\u97F3\u8BC6\u522B\u540E\u7684\u6587\u5B57\uFF0C\u7528\u4E8E\u751F\u6210\u56DE\u7B54\u3002"}),(0,c.jsx)("fieldset",{className:h.radios,disabled:N,"aria-label":"\u5BF9\u8BDD\u6A21\u578B\u9009\u62E9\u65B9\u5F0F",children:[["auto","\u81EA\u52A8"],["manual","\u624B\u52A8\u6307\u5B9A"]].map(([$,I])=>(0,c.jsxs)("label",{children:[(0,c.jsx)("input",{type:"radio",name:"conversation-mode-"+t,checked:a.mode===$,onChange:()=>W($==="auto"?{mode:$,provider:null,model:null}:{mode:$})}),I]},$))}),a.mode==="auto"&&(0,c.jsxs)("div",{className:h.section,children:[(0,c.jsx)("p",{className:h.hint,children:"\u8DDF\u968F\u5F53\u524D\u5BF9\u8BDD\u6240\u9009\u6A21\u578B\u3002\u7A7A\u767D\u9996\u9875\u4F7F\u7528 DSH \u7684\u9ED8\u8BA4\u6A21\u578B\u3002"}),(0,c.jsx)("p",{children:"\u5F00\u542F\u8BED\u97F3\u65F6\u786E\u5B9A\u6A21\u578B\u6765\u6E90"})]}),(0,c.jsx)(is,{open:a.mode==="manual",children:(0,c.jsxs)("div",{className:h.section,"data-conversation-manual":!0,children:[(0,c.jsx)(jd,{label:"\u4F9B\u5E94\u5546",value:a.provider,options:y,disabled:N||!v,onChange:$=>W({provider:$,model:null})}),(0,c.jsx)(jd,{label:"\u6A21\u578B",value:a.model,options:w?.models??[],disabled:N||!w,onChange:$=>W({model:$})}),(0,c.jsx)("p",{className:h.hint,children:"\u4EC5\u5217\u51FA\u5BBF\u4E3B\u5DF2\u914D\u7F6E\u7684\u5BF9\u8BDD\u4F9B\u5E94\u5546\u4E0E\u6A21\u578B\uFF0C\u4FDD\u5B58\u65F6\u518D\u6B21\u9A8C\u8BC1\u3002"}),!v&&(0,c.jsx)("p",{role:"status",children:e.conversationModelsError?"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u4F9B\u5E94\u5546\uFF0C\u8BF7\u91CD\u8BD5\u3002":"\u6B63\u5728\u8BFB\u53D6\u4F9B\u5E94\u5546\u2026"}),v&&!y.length&&(0,c.jsx)("p",{role:"status",children:"\u6682\u65E0\u53EF\u7528\u5BF9\u8BDD\u6A21\u578B\uFF0C\u8BF7\u5148\u5728 DSH \u4E2D\u914D\u7F6E\u4F9B\u5E94\u5546\u3002"}),a.provider&&!C&&(0,c.jsx)("p",{role:"status",children:"\u8BF7\u9009\u62E9\u5F53\u524D\u53EF\u7528\u7684\u4F9B\u5E94\u5546\u4E0E\u6A21\u578B\u3002\u539F\u9009\u62E9\u4E0D\u4F1A\u81EA\u52A8\u66FF\u6362\u3002"}),(0,c.jsx)(J.Button,{variant:"outline",disabled:e.busy,onClick:()=>{n(t,"conversation-models")},children:"\u5237\u65B0\u4F9B\u5E94\u5546"})]})}),(0,c.jsxs)("div",{className:h.actions,children:[(0,c.jsx)(J.Button,{variant:"primary",disabled:N||!D||!C,onClick:()=>{M()},children:p?"\u4FDD\u5B58\u4E2D\u2026":"\u4FDD\u5B58\u9ED8\u8BA4"}),(0,c.jsx)(J.Button,{variant:"outline",disabled:N||!D,onClick:()=>{l(s),d(""),i?.("save-conversation-model")},children:"\u53D6\u6D88\u4FEE\u6539"})]}),(0,c.jsx)("p",{role:"status",className:h.hint,children:u||(D?"\u5C1A\u672A\u4FDD\u5B58":s.mode==="auto"?"\u5DF2\u4FDD\u5B58\uFF1A\u81EA\u52A8 \xB7 \u8DDF\u968F\u5F53\u524D\u5BF9\u8BDD":`\u5DF2\u4FDD\u5B58\uFF1A${s.provider} / ${s.model}`)})]})}function jd({label:e,value:t,options:n,disabled:o,onChange:i}){let[r,s]=(0,Z.useState)(!1),[a,l]=(0,Z.useState)(0),u=(0,Z.useRef)(null),d=(0,Z.useRef)(null),p=(0,Z.useRef)(null),f=(0,Z.useId)(),m=n.find(y=>y.id===t);(0,Z.useEffect)(()=>{o&&s(!1)},[o]),(0,Z.useEffect)(()=>{r&&p.current?.querySelector('[data-option-index="'+a+'"]')?.focus()},[r,a]);let b=()=>{s(!1),d.current?.focus()},v=y=>{i(y.id),b()};return(0,c.jsxs)("div",{ref:u,className:h.conversationChoice,onBlur:y=>{y.currentTarget.contains(y.relatedTarget)||s(!1)},children:[(0,c.jsx)("span",{id:f+"-label",children:e}),(0,c.jsxs)(J.Button,{ref:d,variant:"outline",className:h.deviceSelect,"aria-label":e,"aria-haspopup":"listbox","aria-expanded":r,"aria-controls":f,disabled:o||!n.length,onClick:()=>{l(Math.max(0,n.findIndex(y=>y.id===t))),s(!r)},onKeyDown:y=>{["ArrowDown","ArrowUp"].includes(y.key)&&(y.preventDefault(),l(Math.max(0,n.findIndex(w=>w.id===t))),s(!0))},children:[m?.name||t||"\u8BF7\u9009\u62E9",(0,c.jsx)("span",{"aria-hidden":"true",children:"\u2304"})]}),r&&(0,c.jsx)(J.MenuSurface,{ref:p,id:f,className:h.conversationOptions,role:"listbox","aria-labelledby":f+"-label",onKeyDown:y=>{y.key==="Escape"?(y.preventDefault(),y.stopPropagation(),b()):["ArrowDown","ArrowUp","Home","End"].includes(y.key)&&(y.preventDefault(),l(w=>y.key==="Home"?0:y.key==="End"?n.length-1:(w+(y.key==="ArrowDown"?1:-1)+n.length)%n.length))},children:n.map((y,w)=>(0,c.jsxs)("button",{type:"button",role:"option","aria-selected":t===y.id,tabIndex:w===a?0:-1,"data-option-index":w,onClick:()=>v(y),children:[y.name,t===y.id&&(0,c.jsx)("span",{"aria-hidden":"true",children:" \u2713"})]},y.id))})]})}function ug({state:e,sessionId:t,run:n,markSettingsEdited:o,discardSettingsDraft:i,t:r}){let s=e.settingsFor===t?e.settings:null,a=s?.voicePrompt,l=a?.text??"",[u,d]=(0,Z.useState)(l),[p,f]=(0,Z.useState)(!1),[m,b]=(0,Z.useState)(""),v=(0,Z.useRef)(!1),y=(0,Z.useRef)(!0),w=(0,Z.useRef)(l),C=(0,Z.useId)();(0,Z.useEffect)(()=>(y.current=!0,()=>{y.current=!1}),[]),(0,Z.useEffect)(()=>{if(w.current!==l){let k=w.current;d(z=>z===k?l:z),w.current=l}},[l]);let D=u.trim()?u:"",F=D!==(l.trim()?l:""),N=yo(e,t),W=!s||!N||e.busy||e.settingsConflict||e.visibilityUncertain||p,M=!!D&&a?.customSupported!==!0,$=u.length<=32768&&!M,I=async()=>{if(W||v.current||!F||!$)return;v.current=!0,f(!0),b("");let k=!1;try{k=await n(t,"save-voice-prompt",{revision:s.revision,values:{text:D}})}catch{k=!1}finally{v.current=!1,y.current&&(f(!1),b(r(k?"voicePromptSaved":"voicePromptSaveFailed")))}};return(0,c.jsxs)("section",{className:`${h.section} ${h.voicePrompt}`,"data-voice-prompt":!0,"data-settings-draft":"save-voice-prompt",children:[(0,c.jsxs)("label",{htmlFor:C,children:[r("voicePromptLabel")," ",(0,c.jsx)("span",{className:h.hint,children:r("voicePromptOptional")})]}),(0,c.jsx)("textarea",{id:C,className:h.voicePromptInput,value:u,maxLength:32768,disabled:W,placeholder:r("voicePromptPlaceholder"),"aria-describedby":C+"-count "+C+"-feedback",onChange:k=>{o?.("save-voice-prompt"),d(k.target.value),b("")}}),(0,c.jsxs)("div",{id:C+"-count",className:h.voicePromptCount,children:[u.length.toLocaleString("en-US")," / 32,768"]}),(0,c.jsxs)("div",{className:h.voicePromptActions,children:[(0,c.jsxs)("div",{className:h.actions,children:[(0,c.jsx)(J.Button,{variant:"primary",disabled:W||!F||!$,onClick:()=>{I()},children:r(p?"voicePromptSaving":"voicePromptSave")}),(0,c.jsx)(J.Button,{variant:"outline",disabled:W||u===l,onClick:()=>{d(l),b(""),i?.("save-voice-prompt")},children:r("voicePromptCancel")})]}),(0,c.jsx)("span",{className:h.hint,children:r("voicePromptStopToEdit")})]}),(0,c.jsx)("p",{id:C+"-feedback",role:"status",className:h.hint,children:m||(u.length>32768?r("voicePromptTooLong"):a?.customSupported===!1||M?r("voicePromptUnsupported"):F?r("voicePromptUnsaved"):"")})]})}var fy=Object.freeze({version:1,available:!1,reason:"planned"}),Bn=["audio","interaction","prompt","models","advanced","sessions","pets"],dg={audio:"\u9009\u62E9\u9EA6\u514B\u98CE\u3001\u8BF4\u8BDD\u65B9\u5F0F\u4E0E\u63D0\u793A\u97F3\u3002",interaction:"\u8BBE\u7F6E\u6309\u952E\u3001\u56DE\u7B54\u901F\u5EA6\u4E0E\u754C\u9762\u52A8\u753B\u3002",prompt:"\u8BBE\u7F6E\u8BED\u97F3\u5BF9\u8BDD\u7684\u8868\u8FBE\u65B9\u5F0F\u3002",models:"\u9009\u62E9\u6717\u8BFB\u65B9\u5F0F\uFF0C\u6216\u7BA1\u7406\u672C\u5730\u6A21\u578B\u3002",advanced:"\u67E5\u770B\u6743\u9650\u3001\u8BF7\u6C42\u4E0E\u8FD0\u884C\u8BE6\u60C5\u3002",sessions:"\u9009\u62E9\u8BED\u97F3\u5BF9\u8BDD\u76EE\u6807\uFF0C\u67E5\u770B\u9C7C\u5E94\u4F1A\u8BDD\u548C\u5B50\u4EE3\u7406\u3002",pets:"\u684C\u5BA0\u529F\u80FD\u5C1A\u672A\u5F00\u653E\u3002"};function pg(e){let{t,sessionId:n}=e,o=e.useWhaleUi(I=>I),i=e.useWhalePreferences(I=>I),r=o.settingsTab||"audio",s=o.settingsModelTab||"conversation",[a,l]=(0,Z.useState)(()=>new Set([o.settingsTab||"audio"])),[u,d]=(0,Z.useState)(()=>new Set([o.settingsModelTab||"conversation"])),[p,f]=(0,Z.useState)(0),m=(0,Z.useRef)(null),b=(0,Z.useRef)(null),v=(0,Z.useRef)(0),y=(0,Z.useRef)(new Set),w=(0,Z.useRef)(o.readRefresh),C=(0,Z.useId)();(0,Z.useLayoutEffect)(()=>{m.current&&(m.current.scrollTop=0)},[r,s]),(0,Z.useEffect)(()=>{e.setSession?.(n)},[n]),(0,Z.useEffect)(()=>()=>{v.current++,e.cancelPreview?.(),e.discardDiagnostics?.()},[]),(0,Z.useEffect)(()=>{y.current.clear()},[n,r,s]),(0,Z.useEffect)(()=>{r==="models"&&e.refreshModelCompute?.(n)},[n,r,s]),(0,Z.useEffect)(()=>{if(o.busy||o.ttsCancelling||["pets","sessions"].includes(r))return;let I=e.readState?.();if(I?.busy||I?.ttsCancelling)return;if(w.current!==o.readRefresh){w.current=o.readRefresh;for(let S of["read-output-volume","model-installer","agent-requests"])y.current.delete(S)}let O=[...!o.settings||o.settingsFor!==n?["read-settings"]:[],...!o.status||o.checkedFor!==n||r==="advanced"?["status"]:[],...r==="audio"?["read-output-volume"]:[],...r==="models"&&s==="conversation"?["conversation-models"]:[],...n&&r==="advanced"?["agent-requests"]:[],...n&&r==="interaction"&&o.performanceFor!==n?["inspect-performance"]:[],...r==="models"&&s==="voice"&&(!o.ttsCapabilities||o.ttsCapabilitiesFor!==n)?["inspect-tts"]:[],...r==="models"?["model-installer"]:[]].find(S=>!y.current.has(S));O&&(y.current.add(O),e.run(n,O,{},!0))},[n,r,s,o.readRefresh,o.busy,o.ttsCancelling,o.settingsFor,o.checkedFor,o.outputVolumeFor,o.agentRequestsFor,o.performanceFor,o.ttsCapabilitiesFor,o.installerFor]);let D=async(I,k=!1)=>{let z=++v.current;e.cancelPreview&&!await e.cancelPreview()||(e.discardDiagnostics?.(),z===v.current&&(l(O=>new Set([...O,I])),e.setSettingsTab(I),k&&b.current?.querySelector(`[data-settings-tab="${I}"]`)?.focus({preventScroll:!0})))},F=async I=>{let k=++v.current;e.cancelPreview&&!await e.cancelPreview()||(e.discardDiagnostics?.(),k===v.current&&(d(z=>new Set([...z,I])),e.setSettingsModelTab(I)))},N=o.settingsFor===n?o.settings:null,W=!o.uncertain&&o.checkedFor===n,M=W&&o.status?.enabled&&(r==="interaction"||r==="models"&&s==="download"),$=N&&(0,c.jsx)(og,{settings:N,sessionId:n,busy:o.busy||o.visibilityUncertain||o.settingsConflict,run:e.run,t,status:o.status,statusFresh:W,verified:W&&!!o.status,tab:r,markSettingsEdited:e.markSettingsEdited,discardSettingsDraft:e.discardSettingsDraft,bindingError:o.bindingError,captureBindings:e.captureBindings},n+":"+(o.settingsKey??N.revision));return(0,c.jsxs)("div",{className:h.settings,"data-whale-settings":!0,"data-motion":i.motion,children:[(0,c.jsxs)("header",{className:h.settingsHeader,"data-settings-header":!0,children:[(0,c.jsxs)(J.Button,{className:h.backButton,"data-whale-operation":"page-home",onClick:e.showHome,"aria-label":"\u8FD4\u56DE\u8BED\u97F3",children:[(0,c.jsx)(Ke,{name:"chevron",className:h.backIcon}),(0,c.jsx)("span",{children:"\u8FD4\u56DE\u8BED\u97F3"})]}),(0,c.jsxs)("div",{className:h.settingsBrand,children:[(0,c.jsx)(on,{small:!0}),(0,c.jsx)("h2",{children:t("settingsTitle")})]}),(0,c.jsx)(J.Button,{className:h.guideButton,"data-whale-operation":"page-setup",onClick:e.openSetup,"aria-label":"\u91CD\u65B0\u6253\u5F00\u914D\u7F6E\u5F15\u5BFC",title:"\u91CD\u65B0\u6253\u5F00\u914D\u7F6E\u5F15\u5BFC",children:"\u914D\u7F6E\u5F15\u5BFC"})]}),(0,c.jsxs)("div",{className:h.settingsLayout,children:[(0,c.jsx)("nav",{ref:b,className:h.settingsNav,"data-settings-nav":!0,"aria-label":t("settingsSections"),onKeyDown:I=>{let k=Bn.indexOf(I.target.dataset.settingsTab);if(k<0||!["ArrowDown","ArrowUp","ArrowLeft","ArrowRight","Home","End"].includes(I.key))return;I.preventDefault();let z=I.key==="Home"?0:I.key==="End"?Bn.length-1:(k+(["ArrowDown","ArrowRight"].includes(I.key)?1:-1)+Bn.length)%Bn.length;D(Bn[z],!0)},children:Bn.map(I=>(0,c.jsx)(J.Button,{"data-settings-tab":I,"aria-pressed":r===I,"aria-controls":C+"-body",onClick:()=>{D(I)},children:t("tab_"+I)},I))}),(0,c.jsxs)("div",{className:h.settingsPage,children:[(0,c.jsxs)("div",{className:`${h.pageHeading} ${r==="models"?h.modelHeading:""}`,"data-settings-page-heading":!0,"data-no-drag":!0,children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("h3",{id:C,children:t("tab_"+r)}),r!=="models"&&(0,c.jsx)("p",{children:dg[r]})]}),r==="prompt"&&N&&(0,c.jsx)("span",{className:h.voicePromptMode,"data-voice-prompt-mode":!0,children:t(N.voicePrompt?.mode==="custom"&&N.voicePrompt?.customSupported===!0?"voicePromptCustom":"voicePromptAgents")}),r==="models"&&(0,c.jsx)("nav",{className:h.modelNav,"aria-label":"\u6A21\u578B\u8BBE\u7F6E\u5206\u7C7B","data-no-drag":!0,children:[["conversation","\u5BF9\u8BDD\u6A21\u578B"],["voice","\u6717\u8BFB\u65B9\u5F0F"],["download","\u6A21\u578B\u4E0B\u8F7D"],["paths","\u9AD8\u7EA7\u8DEF\u5F84"]].map(([I,k])=>(0,c.jsx)(J.Button,{"aria-pressed":s===I,onClick:()=>{F(I)},children:k},I))})]}),(0,c.jsxs)("div",{ref:m,id:C+"-body",className:h.settingsBody,"data-settings-body":!0,"data-no-drag":!0,onChangeCapture:I=>{let k=I.target.closest("[data-settings-draft]");k&&!I.target.closest("[data-no-settings-draft]")&&e.markSettingsEdited?.(k.dataset.settingsDraft)},tabIndex:0,"aria-label":t("settingsContent"),children:[r==="sessions"?(0,c.jsxs)(c.Fragment,{children:[e.listExistingVoiceSessions&&!o.sessionManagementRoot&&(0,c.jsx)(Vi,{...e,state:o}),(0,c.jsx)(fg,{...e,state:o})]}):r==="pets"?(0,c.jsxs)("section",{className:h.placeholder,"data-whale-pet":!0,"aria-label":t("tab_pets"),children:[(0,c.jsx)(Ke,{name:"pet"}),(0,c.jsx)("h3",{children:t("tab_pets")}),(0,c.jsx)("p",{children:t("planned")})]}):(0,c.jsxs)(c.Fragment,{children:[o.error&&(0,c.jsx)("div",{role:"alert",className:h.error,children:t("operationUnavailable")}),o.settingsConflict&&(0,c.jsxs)("p",{role:"status",className:h.notice,children:["\u8BBE\u7F6E\u5DF2\u5728\u522B\u5904\u66F4\u65B0\uFF0C\u5F53\u524D\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002",(0,c.jsx)(J.Button,{variant:"outline",disabled:o.busy,onClick:()=>e.discardSettingsDraft?.(),children:"\u653E\u5F03\u8349\u7A3F\u5E76\u4F7F\u7528\u6700\u65B0\u8BBE\u7F6E"})]}),o.visibilityUncertain&&(0,c.jsx)("p",{role:"status",className:h.notice,children:t("configurationUnknown")}),!M&&(0,c.jsx)(_r,{state:o,sessionId:n,run:e.run,refresh:e.refresh,canStopTts:r!=="models"||s!=="voice",t})]}),(0,c.jsx)("div",{hidden:!["audio","interaction","advanced"].includes(r),children:$}),(r==="audio"||a.has("audio"))&&(0,c.jsx)("div",{hidden:r!=="audio",children:(0,c.jsx)(cg,{...e,state:o})}),(r==="interaction"||a.has("interaction"))&&(0,c.jsxs)("div",{hidden:r!=="interaction",children:[N&&(0,c.jsx)(ag,{...e,state:o},"performance:"+n+":"+(o.settingsKey??N.revision)),(0,c.jsxs)("section",{className:h.section,children:[(0,c.jsx)("h3",{children:t("motionTitle")}),(0,c.jsx)("div",{className:h.segmented,children:["spring","firm","off"].map(I=>(0,c.jsx)(J.Button,{"aria-pressed":i.motion===I,onClick:()=>{e.setMotion(I),f(p+1)},children:t("motion_"+I)},I))}),(0,c.jsx)("div",{className:h.motionPreview,"aria-hidden":"true",children:(0,c.jsx)(on,{small:!0})},p),(0,c.jsx)("p",{className:h.hint,children:t("motionHint")}),i.error&&(0,c.jsx)("p",{role:"status",children:t("motionNotSaved")})]})]}),(r==="prompt"||a.has("prompt"))&&N&&(0,c.jsx)("div",{hidden:r!=="prompt",children:(0,c.jsx)(ug,{...e,state:o},"prompt:"+n+":"+(o.settingsKey??N.revision))}),(r==="models"||a.has("models"))&&(0,c.jsxs)("div",{hidden:r!=="models",children:[N&&(s==="conversation"||u.has("conversation"))&&(0,c.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="conversation",children:(0,c.jsx)(lg,{...e,state:o},"conversation:"+n+":"+(o.settingsKey??N.revision))}),(s==="voice"||u.has("voice"))&&(0,c.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="voice",children:(0,c.jsx)(Dd,{pickPath:e.pickPath,state:o,sessionId:n,run:e.run,markSettingsEdited:e.markSettingsEdited,prepared:!0,active:r==="models"&&s==="voice"})}),(s==="download"||u.has("download"))&&(0,c.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="download",children:(0,c.jsx)(Ud,{state:o,sessionId:n,run:e.run})}),N?.modelSetup&&(0,c.jsx)(rg,{modelTab:s,markSettingsEdited:e.markSettingsEdited,pickPath:e.pickPath,senseVoiceAsrAction:e.senseVoiceAsrAction,active:r==="models",settings:N,sessionId:n,busy:o.busy||o.visibilityUncertain||o.settingsConflict,run:e.run,t},n+":"+(o.settingsKey??N.revision)),(s==="paths"||u.has("paths"))&&(0,c.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="paths",children:(0,c.jsx)(Ld,{state:o,sessionId:n,run:e.run,pickPath:e.pickPath,active:r==="models"&&s==="paths"})})]}),(r==="advanced"||a.has("advanced"))&&(0,c.jsxs)("div",{hidden:r!=="advanced",children:[e.updateAction&&(0,c.jsx)(Id,{state:o,open:e.openUpdate,t}),(0,c.jsxs)("section",{className:h.section,"aria-label":t("projectInfoTitle"),children:[(0,c.jsx)("h3",{children:t("projectInfoTitle")}),(0,c.jsxs)("dl",{className:h.details,children:[(0,c.jsx)("dt",{children:t("projectAuthor")}),(0,c.jsx)("dd",{children:(0,c.jsx)("a",{href:Hi.url,target:"_blank",rel:"noreferrer noopener",children:Hi.name})}),(0,c.jsx)("dt",{children:t("projectRepository")}),(0,c.jsx)("dd",{children:(0,c.jsxs)("a",{href:kd,target:"_blank",rel:"noreferrer noopener",children:["Emikosama/",vr]})}),(0,c.jsx)("dt",{children:t("projectNpm")}),(0,c.jsx)("dd",{children:(0,c.jsx)("a",{href:`https://www.npmjs.com/package/${vr}`,target:"_blank",rel:"noreferrer noopener",children:vr})})]})]}),(0,c.jsx)(gg,{...e,state:o,active:r==="advanced"}),(0,c.jsx)(Pd,{readOperationLog:e.readOperationLog}),(0,c.jsx)(hg,{state:o,sessionId:n,t}),(0,c.jsxs)("details",{className:h.section,children:[(0,c.jsx)("summary",{children:"\u5BF9\u8BDD\u663E\u793A\u4E0E\u517C\u5BB9\u6027"}),N?.voiceSession&&(0,c.jsx)(ig,{settings:N,state:o,sessionId:n,run:e.run,t},"visibility:"+n+":"+(o.settingsKey??N.revision))]})]})]})]})]})]})}var mg=new Intl.DateTimeFormat("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"});function fg({manageSessions:e,openManagedSession:t,renameManagedSession:n,setSessionManagement:o,state:i}){let r=i.sessionManagementRoot??null,[s,a]=(0,Z.useState)(null),[l,u]=(0,Z.useState)(null),[d,p]=(0,Z.useState)(!1),[f,m]=(0,Z.useState)(null),[b,v]=(0,Z.useState)(null),y=(0,Z.useRef)(null),w=(0,Z.useCallback)(async(O,{append:S=!1}={})=>{if(!e)return;y.current?.abort();let P=new AbortController;y.current=P,p(!0),m(null);try{O.operation!=="list"&&(await e(O,P.signal),P.signal.aborted||m(O.operation==="restore"?"\u5DF2\u53D6\u6D88\u5F52\u6863\u3002\u53EF\u6253\u5F00\u539F\u4F1A\u8BDD\u7EE7\u7EED\u3002":"\u5DF2\u516C\u5F00\u6B64\u4F1A\u8BDD\u3002"));let A=await e(O.operation==="list"?O:{operation:"list",...r?{rootId:r}:{}},P.signal);if(P.signal.aborted||y.current!==P)return;a(j=>S&&j?{...A,items:[...new Map([...j.items,...A.items].map(L=>[L.id,L])).values()]}:A)}catch(A){P.signal.aborted||m(String(A?.message??"\u65E0\u6CD5\u8BFB\u53D6\u9C7C\u5E94\u4F1A\u8BDD").slice(0,400))}finally{y.current===P&&(y.current=null,p(!1))}},[r,e]);(0,Z.useEffect)(()=>(w({operation:"list",...r?{rootId:r}:{}}),()=>{let O=y.current;y.current=null,O?.abort()}),[w,r]);let C=O=>{a(null),u(null),v(null),o({rootId:O,historyOpen:!1})},D=(O,S)=>{v(null),u({operation:O,id:S.id,rootId:S.rootId})},F=async O=>{try{await t(O)}catch(S){m(String(S?.message??"\u65E0\u6CD5\u5728 DSH \u6253\u5F00\u4F1A\u8BDD").slice(0,400))}},N=async O=>{O.preventDefault();let S=b.title.trim();if(!(!S||d)){p(!0),m(null);try{let P=await n(b.id,S);a(A=>A&&{...A,items:A.items.map(j=>j.id===b.id?{...j,title:P}:j)}),v(null),m("\u5DF2\u4FDD\u5B58\u4F1A\u8BDD\u540D\u79F0\u3002")}catch(P){m(String(P?.message??"\u65E0\u6CD5\u91CD\u547D\u540D\u4F1A\u8BDD").slice(0,400))}finally{p(!1)}}},W=r?s?.items?.find(O=>O.id===r):null,M={restore_unavailable:"\u6062\u590D\u63A5\u53E3\u4E0D\u53EF\u7528",archive_state_unavailable:"\u65E0\u6CD5\u8BFB\u53D6\u5F52\u6863\u72B6\u6001",persistence_unavailable:"\u4F1A\u8BDD\u5B58\u50A8\u6682\u65F6\u4E0D\u53EF\u7528",policy_mismatch:"\u5F53\u524D\u4F1A\u8BDD\u6743\u9650\u4E0E\u539F\u4F1A\u8BDD\u4E0D\u540C",presentation_mismatch:"\u5F53\u524D DSH \u65E0\u6CD5\u786E\u8BA4\u4F1A\u8BDD\u7684\u9690\u85CF\u72B6\u6001",visibility_mismatch:"\u5F53\u524D\u663E\u793A\u8BBE\u7F6E\u4E0E\u539F\u4F1A\u8BDD\u4E0D\u540C"},$=O=>(0,c.jsx)("ul",{className:h.permissionList,children:O.map(S=>(0,c.jsxs)("li",{children:[(0,c.jsx)("strong",{className:h.sessionTitle,children:S.title||(S.kind==="root"?"\u672A\u547D\u540D\u4F1A\u8BDD":"\u672A\u547D\u540D\u5B50\u4EE3\u7406")+" \xB7 "+S.id.slice(-6).toUpperCase()}),(0,c.jsxs)("p",{className:h.hint,children:[S.archived?"\u5DF2\u5F52\u6863":S.visibility==="hidden"?"\u5DF2\u9690\u85CF":S.visibility==="visible"||S.visibility==="workspace"?"\u53EF\u89C1":"\u53EF\u89C1\u6027\u672A\u77E5",M[S.reason]?" \xB7 "+M[S.reason]:""]}),Number.isFinite(S.createdAt)&&(0,c.jsxs)("p",{className:h.hint,children:["\u521B\u5EFA\u4E8E ",(0,c.jsx)("time",{dateTime:new Date(S.createdAt).toISOString(),children:mg.format(S.createdAt)})]}),(0,c.jsxs)("div",{className:h.actions,children:[S.kind==="root"&&!r&&(0,c.jsx)(J.Button,{variant:"outline",disabled:d,"data-whale-operation":"show-subagents",onClick:()=>C(S.id),children:"\u67E5\u770B\u5B50\u4EE3\u7406"}),t&&["live","available"].includes(S.status)&&(0,c.jsx)(J.Button,{variant:"outline","data-whale-operation":S.kind==="root"?"open-native-session":"open-native-subagent",onClick:()=>F(S),children:"\u5728 DSH \u6253\u5F00"}),n&&S.kind==="root"&&["live","available","archived"].includes(S.status)&&(0,c.jsx)(J.Button,{variant:"outline",disabled:d,onClick:()=>{u(null),v({id:S.id,title:S.title??""})},children:"\u91CD\u547D\u540D"}),S.canUnhide&&(0,c.jsx)(J.Button,{variant:"outline",disabled:d,onClick:()=>D("unhide",S),children:"\u53D6\u6D88\u9690\u85CF"}),S.canRestore&&(0,c.jsx)(J.Button,{variant:"outline",disabled:d,onClick:()=>D("restore",S),children:"\u6062\u590D\u5F52\u6863"})]}),l?.id===S.id&&(0,c.jsxs)("div",{className:h.actions,children:[(0,c.jsx)("span",{children:l.operation==="unhide"?"\u786E\u8BA4\u5728 DSH \u516C\u5F00\u6B64\u4F1A\u8BDD\uFF1F":"\u786E\u8BA4\u53D6\u6D88\u6B64\u4F1A\u8BDD\u7684\u5F52\u6863\uFF1F"}),(0,c.jsx)(J.Button,{variant:"primary",disabled:d,onClick:()=>{let P=l;u(null),w(P)},children:"\u786E\u8BA4"}),(0,c.jsx)(J.Button,{variant:"outline",onClick:()=>u(null),children:"\u53D6\u6D88"})]}),b?.id===S.id&&(0,c.jsxs)("form",{className:h.sessionRename,onSubmit:N,children:[(0,c.jsx)(J.Input,{"aria-label":"\u4F1A\u8BDD\u540D\u79F0",value:b.title,maxLength:128,disabled:d,onChange:P=>v({...b,title:P.target.value})}),(0,c.jsxs)("div",{className:h.actions,children:[(0,c.jsx)(J.Button,{type:"submit",variant:"primary",disabled:d||!b.title.trim(),children:"\u4FDD\u5B58\u540D\u79F0"}),(0,c.jsx)(J.Button,{type:"button",variant:"outline",disabled:d,onClick:()=>v(null),children:"\u53D6\u6D88"})]})]})]},S.id))}),I=(s?.items??[]).filter(O=>O.id!==r),k=I.filter(O=>O.active),z=I.filter(O=>!O.active).sort((O,S)=>(S.createdAt??-1)-(O.createdAt??-1));return(0,c.jsxs)("section",{className:h.section,"data-whale-session-management":!0,children:[r&&(0,c.jsx)(J.Button,{variant:"outline",disabled:d,"data-whale-operation":"show-main-sessions",onClick:()=>C(null),children:"\u8FD4\u56DE\u4E3B\u4F1A\u8BDD"}),d&&!s&&(0,c.jsx)("p",{role:"status",children:"\u6B63\u5728\u8BFB\u53D6\u9C7C\u5E94\u4F1A\u8BDD\u2026"}),f&&(0,c.jsx)("p",{role:"status",className:h.notice,children:f}),W&&$([W]),W?.childrenAvailable&&W?.childrenIncomplete&&(0,c.jsx)("p",{role:"status",children:"\u90E8\u5206\u5B50\u4EE3\u7406\u8BB0\u5F55\u6682\u65F6\u65E0\u6CD5\u6838\u9A8C\u3002\u5F53\u524D\u663E\u793A\u5DF2\u6838\u9A8C\u7684\u4F1A\u8BDD\u3002"}),W&&!W.childrenAvailable&&(0,c.jsx)("p",{role:"status",children:"\u5F53\u524D\u65E0\u6CD5\u8BFB\u53D6\u6B64\u4F1A\u8BDD\u7684\u5B50\u4EE3\u7406\u8BB0\u5F55\u3002"}),W?.childrenAvailable&&!W.childrenIncomplete&&!I.length&&(0,c.jsx)("p",{children:"\u6B64\u4F1A\u8BDD\u8FD8\u6CA1\u6709\u5B50\u4EE3\u7406\u3002"}),k.length>0&&$(k),s&&!r&&k.length===0&&(0,c.jsx)("p",{className:h.hint,children:"\u6682\u65E0\u6D3B\u8DC3\u4F1A\u8BDD\u3002"}),(z.length>0||s?.nextCursor)&&(0,c.jsxs)("details",{className:h.section,"data-whale-session-history":!0,open:i.sessionHistoryOpen===!0,onToggle:O=>{let{open:S}=O.currentTarget;S!==!!i.sessionHistoryOpen&&o({historyOpen:S})},children:[(0,c.jsx)("summary",{"data-whale-operation":r?"subagent-history":"session-history",children:r?"\u5386\u53F2\u5B50\u4EE3\u7406":"\u5386\u53F2\u4F1A\u8BDD"}),$(z),!!s?.nextCursor&&(0,c.jsx)(J.Button,{disabled:d,onClick:()=>{w({operation:"list",cursor:s.nextCursor},{append:!0})},children:"\u52A0\u8F7D\u66F4\u591A"})]}),(0,c.jsx)(J.Button,{variant:"outline",disabled:d,onClick:()=>{w({operation:"list",...r?{rootId:r}:{}})},children:"\u5237\u65B0\u4F1A\u8BDD"}),s?.capabilities?.unhide?.supported===!1&&(0,c.jsx)("p",{className:h.hint,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u65F6\u65E0\u6CD5\u628A\u5B50\u4EE3\u7406\u52A0\u5165\u4FA7\u8FB9\u680F\u3002"}),s?.capabilities?.restore?.supported===!1&&(0,c.jsx)("p",{className:h.hint,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u65F6\u65E0\u6CD5\u901A\u8FC7\u9C7C\u5E94\u53D6\u6D88\u5F52\u6863\u3002"})]})}function hg({state:e,sessionId:t,t:n}){let o=e.status,i=o?.ownerSessionId,s=!e.uncertain&&e.checkedFor===t&&typeof o?.helper?.lastError=="string"?o.helper.lastError:null,a=e.error??e.enableError;return(0,c.jsxs)("details",{className:h.section,children:[(0,c.jsx)("summary",{children:n("details")}),(0,c.jsxs)("dl",{className:h.details,children:[(0,c.jsx)("dt",{children:n("source")}),(0,c.jsx)("dd",{"data-whale-owner":!0,"data-session-id":i??"",children:i||n("none")}),(0,c.jsx)("dt",{children:n("actor")}),(0,c.jsx)("dd",{"data-whale-actor":!0,"data-session-id":t??"",children:t||n("openSession")})]}),(0,c.jsx)("p",{className:h.hint,children:n("snapshot")}),a&&(0,c.jsx)("pre",{className:h.requestDetails,children:a}),s&&(0,c.jsxs)("div",{"data-whale-helper-error":!0,children:[(0,c.jsx)("strong",{children:n("inputDiagnosticTitle")}),(0,c.jsx)("pre",{className:h.requestDetails,children:s}),(0,c.jsx)("p",{className:h.hint,children:n("inputDiagnosticHistory")})]}),(0,c.jsx)("p",{className:h.hint,children:n("consequence")}),(0,c.jsx)("p",{className:h.hint,children:o?.helper?.online?n("helperOnline"):n("helperOffline")}),o?.turnSignals?.outputStartObservation?.status==="unsupported"&&(0,c.jsx)("p",{className:h.hint,children:n("outputObservationUnavailable")})]})}function gg({state:e,sessionId:t,run:n,openAuthorization:o,active:i=!0}){let r=(0,Z.useRef)(null),s=(0,Z.useRef)(0);(0,Z.useEffect)(()=>{r.current=null,s.current++},[i,t]),(0,Z.useEffect)(()=>{if(!i||!t||e.busy||e.agentRequestsFor===t||r.current===t)return;r.current=t;let l=s.current;s.current===l&&n(t,"agent-requests")},[i,t,e.busy]);let a=e.agentRequestsFor===t?e.agentRequests:null;return(0,c.jsxs)("section",{className:h.section,"data-whale-agent-requests":!0,children:[(0,c.jsx)("h3",{children:"Agent \u64CD\u4F5C\u8BB0\u5F55"}),(0,c.jsx)(J.Button,{"data-whale-operation":"page-authorization",onClick:()=>{o?.()},children:"\u6388\u6743\u8303\u56F4\u4E0E\u64A4\u9500"}),(e.agentPermissionUncertain||e.agentRequestUncertain)&&(0,c.jsx)("p",{role:"alert",className:h.notice,children:"\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u4F1A\u81EA\u52A8\u6838\u67E5\u5BF9\u5E94\u6743\u9650\u548C\u8BF7\u6C42\u72B6\u6001\uFF0C\u4E0D\u4F1A\u91CD\u590D\u6267\u884C\u3002"}),a?.items?.length===0&&(0,c.jsx)("p",{className:h.hint,children:"\u6CA1\u6709\u5F85\u5904\u7406\u8BF7\u6C42\u3002"}),a?.items?.map(l=>(0,c.jsxs)("section",{className:h.section,"data-agent-request":l.id,children:[(0,c.jsxs)("strong",{children:[l.title," \xB7 ",l.state]}),(0,c.jsxs)("p",{className:h.hint,children:["\u53D1\u8D77\u4F1A\u8BDD\uFF1A",l.sourceSessionId]}),(0,c.jsxs)("details",{children:[(0,c.jsx)("summary",{children:"\u6838\u5BF9\u5B8C\u6574\u53D8\u66F4\u8BA1\u5212"}),(0,c.jsx)("pre",{className:h.requestDetails,children:JSON.stringify({\u5F53\u524D\u8BBE\u7F6E:l.before,\u8BF7\u6C42:l.request,...l.installPlan?{\u4E0B\u8F7D\u8BA1\u5212:l.installPlan}:{},...l.modelApplyTarget?{\u6A21\u578B\u5E94\u7528\u76EE\u6807:l.modelApplyTarget}:{}},null,2)})]}),l.error&&(0,c.jsx)("p",{role:"alert",className:h.error,children:l.error.message}),l.state==="pending"&&(0,c.jsx)(J.Button,{variant:"outline",disabled:e.busy||e.agentRequestUncertain,onClick:()=>{n(t,"decide-agent-request",{id:l.id,approve:!1,acknowledgements:[]})},children:"\u53D6\u6D88\u9884\u89C8"}),l.nextAction&&(0,c.jsx)("p",{className:h.hint,children:l.nextAction})]},l.id))]})}var tp={startConversation:"\u5F00\u59CB\u5BF9\u8BDD",endConversation:"\u7ED3\u675F\u5BF9\u8BDD",voiceTarget:"\u6295\u9012\u5230",dedicatedVoiceTarget:"\u9C7C\u5E94\u4E13\u7528\u4F1A\u8BDD",checkingVoiceTarget:"\u6B63\u5728\u6838\u5BF9\u76EE\u6807\u2026",voiceTargetChanged:"\u8BED\u97F3\u6295\u9012\u76EE\u6807\u6709\u53D8\u5316\u3002\u8BF7\u6838\u5BF9\u9996\u9875\u7684\u4F1A\u8BDD\u540E\u518D\u5F00\u59CB\u3002",chooseCurrentDshTarget:"\u4F7F\u7528\u5F53\u524D\u6253\u5F00\u4F1A\u8BDD",backToFishVoice:"\u56DE\u5230\u9C7C\u5E94",currentDshTargetError:"\u65E0\u6CD5\u786E\u8BA4\u5F53\u524D DSH \u5BF9\u8BDD\uFF0C\u8BF7\u6838\u5BF9\u540E\u91CD\u8BD5\u3002",chooseVoiceTarget:"\u9009\u62E9\u6295\u9012\u4F1A\u8BDD",searchVoiceTargets:"\u641C\u7D22\u4F1A\u8BDD\u6807\u9898\u6216 ID",searchVoiceTargetsAction:"\u641C\u7D22",existingVoiceTargetList:"\u5DF2\u6709 DSH \u4F1A\u8BDD",boundVoiceTarget:"\u5F53\u524D\u7ED1\u5B9A",voiceTargetAvailability_ready:"\u53EF\u7528",voiceTargetAvailability_busy:"\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F",voiceTargetAvailability_archived:"\u4F1A\u8BDD\u5DF2\u5F52\u6863",voiceTargetAvailability_unavailable:"\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528",voiceTargetAvailability_managed:"\u9C7C\u5E94\u7BA1\u7406\u7684\u4F1A\u8BDD\uFF0C\u65E0\u6CD5\u76F4\u63A5\u6295\u9012",voiceTargetAvailability_subagent:"\u5B50\u4EE3\u7406\u4F1A\u8BDD\uFF0C\u65E0\u6CD5\u76F4\u63A5\u6295\u9012",voiceTargetNoMatch:"\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684\u4F1A\u8BDD\u3002",voiceTargetEmptyList:"\u6682\u65E0\u53EF\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u3002",voiceTargetSynthesisNotice:"\u4F7F\u7528\u5728\u7EBF\u97F3\u8272\u65F6\uFF0C\u56DE\u7B54\u6587\u5B57\u4F1A\u4EA4\u7ED9\u5DF2\u6388\u6743\u7684\u8BED\u97F3\u5408\u6210\u670D\u52A1\u3002\u82E5\u8981\u79BB\u7EBF\u6717\u8BFB\uFF0C\u53EF\u5728\u300C\u6A21\u578B \u2192 \u6717\u8BFB\u65B9\u5F0F\u300D\u9009\u7528\u672C\u5730\u97F3\u8272\u3002",bindVoiceTarget:"\u7ED1\u5B9A\u9009\u4E2D\u4F1A\u8BDD",savingVoiceTarget:"\u6B63\u5728\u4FDD\u5B58\u2026",moreVoiceTargets:"\u52A0\u8F7D\u66F4\u591A",loadingVoiceTargets:"\u6B63\u5728\u8BFB\u53D6 DSH \u4F1A\u8BDD\u2026",voiceTargetListError:"\u65E0\u6CD5\u8BFB\u53D6 DSH \u4F1A\u8BDD\u3002",retryVoiceTargets:"\u91CD\u8BD5\u8BFB\u53D6",voiceTranscriptCaptions:"\u8BED\u97F3\u5B57\u5E55",retryTranscript:"\u91CD\u53D1",transcriptDelivery_busy:"\u4F1A\u8BDD\u5FD9\uFF0C\u5F85\u53D1\u5230",transcriptDelivery_ready:"\u5F85\u91CD\u53D1\u5230",transcriptDelivery_sending:"\u6B63\u5728\u53D1\u5F80",transcriptDelivery_queued:"\u7B49\u5F85\u4F1A\u8BDD\u63A5\u6536",transcriptDelivery_delivered:"\u5DF2\u53D1\u5230",transcriptDelivery_uncertain:"\u6295\u9012\u5F85\u786E\u8BA4",transcriptDelivery_failed:"\u672A\u53D1\u5230",transcriptDelivery_discarded:"\u5F85\u53D1\u5DF2\u53D6\u6D88",endDiscardsRetries:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u6E05\u7A7A\u5F85\u53D1\u8F6C\u5199\u3002",modeSwitching:"\u6B63\u5728\u5207\u6362\u8BF4\u8BDD\u65B9\u5F0F\u2026",modeSaving:"\u6B63\u5728\u4FDD\u5B58\u8BF4\u8BDD\u65B9\u5F0F\u2026",modeSwitchUnconfirmed:"\u8BF4\u8BDD\u65B9\u5F0F\u66F4\u6539\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u6838\u67E5\u3002",modeSwitchFailed:"\u672A\u80FD\u786E\u8BA4\u66F4\u6539\uFF0C\u8BF7\u67E5\u770B\u5F53\u524D\u65B9\u5F0F\u540E\u518D\u8BD5\u3002",updateTitle:"\u9C7C\u5E94\u66F4\u65B0",updateOfferTitle:"\u9C7C\u5E94\u6709\u65B0\u7248\u672C",updateCurrentVersion:"\u5F53\u524D",updateNewVersion:"\u65B0\u7248",updateChannel_stable:"\u6B63\u5F0F\u7248",updateChannel_preview:"\u9884\u89C8\u7248",updateCheck:"\u68C0\u67E5\u66F4\u65B0",updateDetails:"\u67E5\u770B\u66F4\u65B0",updateLater:"\u7A0D\u540E",updateInstall:"\u4E00\u952E\u66F4\u65B0",updateRelease:"\u53D1\u5E03\u8BF4\u660E",updateFeedback:"\u53CD\u9988\u95EE\u9898",update_idle:"\u6B63\u5728\u8BFB\u53D6\u66F4\u65B0\u72B6\u6001\u2026",update_checking:"\u6B63\u5728\u68C0\u67E5\u66F4\u65B0\u2026",update_current:"\u5DF2\u662F\u6700\u65B0\u7248\u672C\u3002",update_available:"\u53EF\u4EE5\u66F4\u65B0\u3002",update_incompatible:"\u65B0\u7248\u4E0E\u5F53\u524D DSH \u73AF\u5883\u4E0D\u517C\u5BB9\u3002",update_installing:"\u6B63\u5728\u66F4\u65B0\uFF0C\u5BBF\u4E3B\u53EF\u80FD\u4F1A\u91CD\u65B0\u52A0\u8F7D\u9C7C\u5E94\u2026","update_restart-required":"\u66F4\u65B0\u5DF2\u5B89\u88C5\uFF0C\u91CD\u542F DSH \u540E\u751F\u6548\u3002","update_enable-required":"\u66F4\u65B0\u5DF2\u5B89\u88C5\uFF0C\u8BF7\u5728 DSH \u63D2\u4EF6\u7BA1\u7406\u4E2D\u542F\u7528\u9C7C\u5E94\u3002",update_installed:"\u66F4\u65B0\u5DF2\u5B8C\u6210\u3002",update_error:"\u66F4\u65B0\u51FA\u9519\uFF0C\u53EF\u68C0\u67E5\u66F4\u65B0\u540E\u91CD\u8BD5\u3002",update_unsupported:"\u5F53\u524D\u73AF\u5883\u65E0\u6CD5\u81EA\u52A8\u66F4\u65B0\uFF0C\u8BF7\u67E5\u770B\u5B98\u65B9\u53D1\u5E03\u8BF4\u660E\u3002",updateConnection:"\u6682\u65F6\u65E0\u6CD5\u786E\u8BA4\u66F4\u65B0\u72B6\u6001\uFF0C\u8BF7\u5728\u5BBF\u4E3B\u5C31\u7EEA\u540E\u91CD\u65B0\u68C0\u67E5\u3002",audioDevices:"\u97F3\u9891\u8BBE\u5907",audioSystemDefault:"\u7CFB\u7EDF\u9ED8\u8BA4",audioInput:"\u97F3\u9891\u8F93\u5165",audioOutput:"\u97F3\u9891\u8F93\u51FA",inputDeviceMissing:"\u9EA6\u514B\u98CE\u672A\u8FDE\u63A5\uFF0C\u5DF2\u4FDD\u7559\u9009\u62E9",outputDeviceMissing:"\u8F93\u51FA\u672A\u8FDE\u63A5\uFF0C\u4E0D\u4F1A\u5207\u5230\u5176\u4ED6\u8BBE\u5907",deviceDisconnected:"\u672A\u8FDE\u63A5",inputDeviceStopFirst:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5207\u6362\u8F93\u5165\u3002\u8F93\u51FA\u5728\u4E0B\u4E00\u6BB5\u64AD\u653E\u751F\u6548\u3002",outputDeviceUnsupported:"\u6B64\u73AF\u5883\u6682\u4E0D\u652F\u6301\u9009\u62E9\u6717\u8BFB\u8F93\u51FA\u8BBE\u5907\u3002",deviceListRetry:"\u8BBE\u5907\u5217\u8868\u6682\u4E0D\u53EF\u7528\uFF0C\u6253\u5F00\u4E0B\u62C9\u83DC\u5355\u53EF\u91CD\u8BD5\u3002",voiceHelperCleanupHint:"\u6B63\u5728\u786E\u8BA4\u9EA6\u514B\u98CE\u5DF2\u91CA\u653E\uFF0C\u786E\u8BA4\u524D\u4E0D\u4F1A\u5F00\u542F\u65B0\u7684\u5F55\u97F3\u3002",voiceHelperRestartHint:"\u9EA6\u514B\u98CE\u670D\u52A1\u9000\u51FA\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u91CD\u542F DSH \u540E\u518D\u70B9\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u3002",inputError_device:"\u9EA6\u514B\u98CE\u4E0D\u53EF\u7528",inputError_recognition:"\u8BED\u97F3\u8BC6\u522B\u5931\u8D25","inputError_no-speech":"\u6CA1\u542C\u6E05\uFF0C\u8BF7\u518D\u8BF4\u4E00\u6B21",inputHelp_device:"\u8BF7\u68C0\u67E5\u9EA6\u514B\u98CE\u8FDE\u63A5\u4E0E\u6743\u9650\u3002\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5728\u8BBE\u7F6E\u4E2D\u9009\u8BBE\u5907\u3002\u8BE6\u60C5\u89C1\u300C\u9AD8\u7EA7\u300D\u3002",inputDiagnosticTitle:"\u6700\u8FD1\u4E00\u6B21\u97F3\u9891\u9519\u8BEF",inputDiagnosticHistory:"\u8FD9\u662F\u6700\u8FD1\u4E00\u6B21\u8BB0\u5F55\uFF0C\u53EF\u80FD\u6765\u81EA\u4E4B\u524D\u7684\u5C1D\u8BD5\uFF1B\u4E0D\u4EE3\u8868\u5F53\u524D\u8BBE\u5907\u72B6\u6001\u3002",inputHelp_recognition:"\u8BF7\u91CD\u8BD5\u3002\u4ECD\u5931\u8D25\u65F6\uFF0C\u7ED3\u675F\u5BF9\u8BDD\u540E\u5728\u8BBE\u7F6E\u4E2D\u68C0\u67E5\u8BC6\u522B\u6A21\u578B\u3002","inputHelp_no-speech":"\u8BF7\u9760\u8FD1\u9EA6\u514B\u98CE\u91CD\u8BD5\uFF0C\u5E76\u68C0\u67E5\u662F\u5426\u9759\u97F3\u3002",speechFailed:"\u6717\u8BFB\u5931\u8D25",speechInterrupted:"\u6717\u8BFB\u5DF2\u4E2D\u65AD",wakeFallbackHint:"\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\u3002\u76EE\u524D\u6309\u8F6C\u5199\u5339\u914D\u3002\u5207\u6362\u6A21\u5F0F\u540E\u518D\u9009\u300C\u5524\u9192\u8BCD\u300D\u53EF\u91CD\u8BD5\u58F0\u97F3\u5339\u914D\u3002",wakeMode:"\u5524\u9192\u8BCD",switchToWake:"\u70B9\u6309\u5207\u5230\u5524\u9192\u8BCD\u6A21\u5F0F\uFF0C\u9EA6\u514B\u98CE\u5C06\u7B49\u5F85\u8BBE\u5B9A\u79F0\u547C",wakeDisabled:"\u5524\u9192\u76D1\u542C\u672A\u5F00\u542F",wakeStarting:"\u6B63\u5728\u542F\u52A8\u5524\u9192\u76D1\u542C\u2026",wakeWaiting:"\u7B49\u5F85\u5524\u9192\u8BCD",wakeListening:"\u6B63\u5728\u542C\u4E0B\u4E00\u53E5",wakePaused:"\u5524\u9192\u76D1\u542C\u5DF2\u6682\u505C",wakeError:"\u5524\u9192\u76D1\u542C\u4E0D\u53EF\u7528\uFF0C\u8BF7\u67E5\u770B\u8BBE\u7F6E",wakeHint:"\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\uFF0C\u518D\u8BF4\u6307\u4EE4\u3002\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u76D1\u542C\u3002",wakeMethod:"\u77ED\u53E5\u7ED3\u675F\u540E\u5728\u672C\u673A\u6BD4\u8F83\u79F0\u547C\u7684\u58F0\u97F3\u548C\u8F6C\u5199\u3002",wakeAliases:"\u5524\u9192\u79F0\u547C",wakeAliasesHint:"\u6700\u591A8\u4E2A\uFF0C\u9017\u53F7\u5206\u9694\uFF1B\u4E2D\u6587\u652F\u6301\u53E5\u9996\u8FD1\u97F3\uFF0C\u5EFA\u8BAE\u7528\u72EC\u7279\u76843\u5B57\u4EE5\u4E0A\u79F0\u547C\u3002",wakeTimeout:"\u5524\u9192\u540E\u7B49\u5F85\uFF08\u79D2\uFF09",wakeSettings:"\u5524\u9192\u8BCD\u8BBE\u7F6E",wakeStopToEdit:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u79F0\u547C\u548C\u7B49\u5F85\u65F6\u95F4\u3002",wakeInvalid:"\u8BF7\u586B1\u20138\u4E2A\u6709\u6548\u79F0\u547C\uFF0C\u7B49\u5F85\u65F6\u95F4\u4E3A3\u201330\u79D2\u3002",switchToPtt:"\u70B9\u6309\u5207\u56DE\u6309\u4F4F\u8BF4\u8BDD",switchToAlways:"\u70B9\u6309\u5207\u5230\u81EA\u7531\u9EA6\uFF0C\u9EA6\u514B\u98CE\u5C06\u6301\u7EED\u8046\u542C",quickSpeedStop:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5207\u6362\u901F\u5EA6",performanceReadFirst:"\u5148\u68C0\u67E5\u5F53\u524D\u6A21\u578B\u652F\u6301\u54EA\u4E9B\u901F\u5EA6\u3002",performanceUnavailable:"\u63D0\u4F9B\u5546\u5DF2\u660E\u786E\u62D2\u7EDD\u7070\u8272\u6863\u4F4D\u7684\u601D\u8003\u53C2\u6570\uFF1B\u5176\u4ED6\u6863\u4F4D\u4ECD\u53EF\u9009\u62E9\u3002",performanceProbeCost:"\u52A0\u8F7D\u65F6\u7528\u6700\u591A 3 \u4E2A\u56FA\u5B9A\u77ED\u8BF7\u6C42\u68C0\u6D4B\u6863\u4F4D\uFF0C\u6309\u6A21\u578B\u8BA1\u8D39\u3002",performanceProbeScope:"\u53EA\u6709\u63D0\u4F9B\u53EF\u68C0\u6D4B\u63A5\u53E3\u7684\u6A21\u578B\u8DEF\u7EBF\u4F1A\u53D1\u9001\u77ED\u8BF7\u6C42\uFF0C\u539F\u751F\u652F\u6301\u7684\u6863\u4F4D\u53EF\u76F4\u63A5\u67E5\u770B\u3002",performanceProbeUnknown:"\u90E8\u5206\u6863\u4F4D\u6682\u672A\u786E\u8BA4\u3002\u53EF\u68C0\u67E5\u7F51\u7EDC\u6216\u767B\u5F55\u540E\u91CD\u65B0\u68C0\u6D4B\u3002",performanceProbeAccepted:"\u6863\u4F4D\u8BF7\u6C42\u68C0\u6D4B\u901A\u8FC7\u3002",performanceProbePending:"\u6B63\u5728\u68C0\u67E5\u5F53\u524D\u6A21\u578B\u7684\u6863\u4F4D\u2026",holdToSpeak:"\u8BF4\u8BDD\u65F6\u6309\u4F4F",alwaysWarning:"\u81EA\u7531\u9EA6\u4F1A\u6301\u7EED\u542C\u53D6\u8BED\u97F3\u3002\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u76D1\u542C\u3002",bindingMissing:"\u672A\u7ED1\u5B9A\u8BF4\u8BDD\u6309\u952E\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u4E2D\u7ED1\u5B9A\uFF0C\u6216\u5207\u6362\u6301\u7EED\u8046\u542C\u3002",noSession:"\u8FD8\u6CA1\u6709\u6253\u5F00\u5BF9\u8BDD",otherWindow:"\u9EA6\u514B\u98CE\uFF1A\u53E6\u4E00\u4E2A\u7A97\u53E3",readingStatus:"\u6B63\u5728\u8BFB\u53D6\uFF0C\u4E0D\u4F1A\u542F\u52A8\u9EA6\u514B\u98CE\u6216\u6A21\u578B\u3002",statusRetry:"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u72B6\u6001\u3002\u8FD4\u56DE\u7A97\u53E3\u65F6\u4F1A\u81EA\u52A8\u6838\u67E5\u3002",retryStatus:"\u91CD\u65B0\u8BFB\u53D6\u72B6\u6001",collapseHint:"\u6536\u8D77\u540E\u4F1A\u7EE7\u7EED\u5BF9\u8BDD",stopConsequence:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u91CA\u653E\u9EA6\u514B\u98CE\u5E76\u505C\u6B62\u672C\u6B21\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u3002",transferTitle:"\u63A5\u7BA1\u53E6\u4E00\u4E2A\u7A97\u53E3\u7684\u9EA6\u514B\u98CE\uFF1F",transferWarning:"\u8FD9\u4F1A\u4E2D\u65AD\u53E6\u4E00\u4E2A\u7A97\u53E3\u7684\u8BED\u97F3\uFF0C\u5E76\u53EF\u80FD\u7ED3\u675F\u5B83\u7684\u540E\u53F0\u4EFB\u52A1\u3002",cancel:"\u53D6\u6D88",confirmTransfer:"\u786E\u8BA4\u63A5\u7BA1",bindingStopRequired:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u9F20\u6807\u6216\u952E\u76D8\u6309\u952E\u3002",bindingFinishing:"\u8BED\u97F3\u6B63\u5728\u505C\u6B62\uFF0C\u8BF7\u7A0D\u5019\u518D\u4FEE\u6539\u6309\u952E\u3002",headphonesRequired:"\u5148\u52FE\u9009\u201C\u6211\u5DF2\u4F7F\u7528\u8033\u673A\u201D\uFF0C\u624D\u80FD\u5F00\u542F\u81EA\u52A8\u6253\u65AD\u3002",deviceManualIndex:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u5E8F\u53F7",deviceManualName:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u540D\u79F0",deviceIndexInvalid:"\u8BBE\u5907\u5E8F\u53F7\u9700\u8981\u662F\u975E\u8D1F\u6574\u6570\u3002",deviceDefault:"\u4F7F\u7528\u7CFB\u7EDF\u9ED8\u8BA4\u9EA6\u514B\u98CE",deviceManual:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u540D\u79F0\u6216\u5E8F\u53F7",deviceSaved:"\u5DF2\u4FDD\u5B58\u7684\u8BBE\u5907",deviceEmpty:"\u97F3\u9891\u670D\u52A1\u6CA1\u6709\u627E\u5230\u9EA6\u514B\u98CE\u3002\u8BF7\u8FDE\u63A5\u8BBE\u5907\u5E76\u68C0\u67E5\u7CFB\u7EDF\u58F0\u97F3\u8BBE\u7F6E\u3002",deviceUnknown:"\u5F00\u59CB\u5BF9\u8BDD\u540E\u4F1A\u5217\u51FA\u68C0\u6D4B\u5230\u7684\u8BBE\u5907\u3002\u73B0\u5728\u53EF\u4F7F\u7528\u7CFB\u7EDF\u9ED8\u8BA4\uFF0C\u6216\u5728\u9AD8\u7EA7\u9009\u9879\u624B\u52A8\u586B\u5199\u3002",ttsBackend:"\u8BED\u97F3\u5408\u6210\u540E\u7AEF",ttsBackendHint:"\u58F0\u97F3\u7531\u5DF2\u5B89\u88C5\u7684 TTS \u540E\u7AEF\u63D0\u4F9B\uFF0C\u9700\u5728\u8BE5\u540E\u7AEF\u5B8C\u6210\u914D\u7F6E\u3002\u72EC\u7ACB\u97F3\u91CF\u4EC5\u5728\u9A8C\u8BC1\u652F\u6301\u65F6\u663E\u793A\u3002",ttsBackendPending:"\u66F4\u591A\u540E\u7AEF\u9009\u62E9\u6B63\u5728\u9002\u914D\uFF0C\u5F53\u524D\u4E0D\u4F1A\u81EA\u52A8\u63A5\u5165\u4E91\u670D\u52A1\u3002",voiceClone:"\u58F0\u97F3\u514B\u9686",voiceCloneAvailable:"Qwen \u652F\u6301\u672C\u5730\u53C2\u8003\u97F3\u8272\uFF0C\u53EF\u5728\u6717\u8BFB\u65B9\u5F0F\u7684\u97F3\u8272\u8BBE\u7F6E\u4E2D\u9009\u62E9 WAV\u3002",voiceClonePrivacy:"\u4EC5\u8BFB\u53D6\u4F60\u9009\u62E9\u4E14\u6709\u6743\u4F7F\u7528\u7684\u58F0\u97F3\u6837\u672C\uFF0C\u4E0D\u4E0A\u4F20\u3002",inputActive:"\u6B63\u5728\u63A5\u6536\u8BED\u97F3",modeUnknown:"\u542C\u53D6\u65B9\u5F0F\u672A\u77E5",voiceInputUnavailable:"\u5F55\u97F3\u6682\u4E0D\u53EF\u7528",voiceInputRecoveryHint:"\u8BED\u97F3\u670D\u52A1\u5DF2\u4E2D\u65AD\u3002\u8BF7\u7ED3\u675F\u5BF9\u8BDD\u540E\u91CD\u65B0\u5F00\u59CB\u3002",searchHistory:"\u641C\u7D22\u4F1A\u8BDD",searchScope:"\u641C\u7D22\u5DF2\u8F7D\u5165\u7684\u4F1A\u8BDD",noMatches:"\u6CA1\u6709\u5339\u914D\u7684\u4F1A\u8BDD",differentOwner:"\u9EA6\u514B\u98CE\u5728\u53E6\u4E00\u4E2A\u7A97\u53E3\u4F7F\u7528\u3002\u9700\u8981\u65F6\u53EF\u660E\u786E\u63A5\u7BA1\u3002",details:"\u8BCA\u65AD\u8BE6\u60C5",noReply:"\u8FD8\u6CA1\u6709\u5BF9\u8BDD",newChatCreated:"\u5DF2\u65B0\u5EFA\u4F1A\u8BDD",newChatActive:"\u65B0\u5EFA\u8BED\u97F3\u4F1A\u8BDD\u3002\u5F53\u524D\u4F1A\u8BDD\u7684\u540E\u53F0\u4EFB\u52A1\u4F1A\u505C\u6B62\uFF0C\u8BB0\u5F55\u4F1A\u4FDD\u7559\u3002",newChatOtherOwner:"\u8BF7\u5728\u5F53\u524D\u8BED\u97F3\u4F1A\u8BDD\u6216\u5F00\u542F\u9EA6\u514B\u98CE\u7684\u7A97\u53E3\u4E2D\u65B0\u5EFA\u3002",recentConversation:"\u5BF9\u8BDD",recentTenTurns:"\u6700\u8FD1 10 \u8F6E",allRecords:"\u5168\u90E8\u8BB0\u5F55",showAllRecords:"\u5C55\u5F00\u5168\u90E8",collapseToTen:"\u6536\u8D77\u81F3 10 \u8F6E",collapseConversation:"\u6536\u8D77\u5BF9\u8BDD",currentVoiceRecords:"\u5F53\u524D\u8BED\u97F3\u804A\u5929",historyTruncated:"\u5DF2\u5207\u6362\u663E\u793A\u533A\u95F4\uFF0C\u539F\u8BB0\u5F55\u4ECD\u4FDD\u7559",viewConversation:"\u67E5\u770B\u8BED\u97F3\u8BB0\u5F55",loadEarlier:"\u52A0\u8F7D\u66F4\u65E9\u8BB0\u5F55",readingHistory:"\u6B63\u5728\u8BFB\u53D6\u8BB0\u5F55\u2026",retryHistory:"\u8BFB\u53D6\u8BB0\u5F55\u5931\u8D25\uFF0C\u70B9\u51FB\u91CD\u8BD5",noConversation:"\u8FD8\u6CA1\u6709\u5BF9\u8BDD",newMessages:"\u6761\u65B0\u6D88\u606F",conversationMessages:"\u8BED\u97F3\u5BF9\u8BDD\u8BB0\u5F55",assistantName:"\u52A9\u624B\u79F0\u547C",renameAssistant:"\u70B9\u51FB\u6539\u540D\uFF0CEnter \u4FDD\u5B58\uFF0CEsc \u53D6\u6D88",compact_off:"\u672A\u5F00\u542F",compact_standby:"\u5F85\u673A",compact_listening:"\u8046\u542C\u4E2D",compact_pending:"\u5904\u7406\u4E2D",compact_unknown:"\u5F85\u68C0\u67E5",you:"\u4F60",assistant:"\u52A9\u624B",close:"\u5173\u95ED\u9762\u677F",keyboardBinding:"\u952E\u76D8\u6309\u4F4F\u8BF4\u8BDD",bindingOff:"\u672A\u7ED1\u5B9A",saveBindings:"\u4FDD\u5B58\u6309\u952E",discardBindings:"\u53D6\u6D88\u4FEE\u6539",bindingCapture:"\u6309\u4E0B\u8981\u7ED1\u5B9A\u7684\u952E\uFF08Esc \u53D6\u6D88\uFF09",clearBinding:"\u6E05\u9664\u7ED1\u5B9A",bindingUnsupported:"\u4E0D\u652F\u6301\u8BE5\u6309\u952E\u6216\u7CFB\u7EDF\u7EC4\u5408\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u3002",bindingGlobalHint:"Windows \u5168\u5C40\u5FEB\u6377\u952E\u3002\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5F55\u5165\uFF0C\u4FDD\u5B58\u540E\u4E0B\u6B21\u5F00\u59CB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002\u6309\u952E\u4E0D\u4F1A\u88AB\u62E6\u622A\uFF0C\u53EF\u80FD\u540C\u65F6\u89E6\u53D1\u5176\u4ED6\u5E94\u7528\u7684\u5FEB\u6377\u64CD\u4F5C\u3002",bindingUnavailable:"\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301\u5168\u5C40\u6309\u952E\u7ED1\u5B9A\u3002",bindingPrintableWarning:"\u5355\u72EC\u4F7F\u7528\u6587\u5B57\u3001\u6570\u5B57\u6216\u7A7A\u683C\u952E\u4F1A\u5728\u5176\u4ED6\u5E94\u7528\u8F93\u5165\u65F6\u89E6\u53D1\u6309\u952E\u8BF4\u8BDD\u3002",performanceTitle:"\u56DE\u7B54\u901F\u5EA6",performanceHint:"\u4E0B\u6B21\u5F00\u59CB\u9C7C\u5E94\u72EC\u7ACB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002\u7ED1\u5B9A\u539F\u4F1A\u8BDD\u65F6\uFF0C\u5728\u8BE5 DSH \u5BF9\u8BDD\u7684\u6A21\u578B\u83DC\u5355\u91CC\u8C03\u6574\u601D\u8003\u6863\u4F4D\u3002",inspectPerformance:"\u68C0\u67E5\u53EF\u7528\u901F\u5EA6",performance_fast:"\u5FEB",performanceNoThinking:"\u65E0\u601D\u8003",performanceRecommended:"[\u63A8\u8350]",performanceFastHint:"\u5FEB\u6863\u4F1A\u660E\u786E\u8BF7\u6C42\u5173\u95ED\u601D\u8003\u3002",performanceFastUnavailable:"\u5F53\u524D\u6A21\u578B\u8DEF\u7EBF\u65E0\u6CD5\u786E\u8BA4\u5173\u95ED\u601D\u8003\u3002\u53EF\u9009\u300C\u8DDF\u968F\u6A21\u578B\u300D\uFF0C\u6216\u5728\u6A21\u578B\u8BBE\u7F6E\u4E2D\u66F4\u6362\u652F\u6301\u65E0\u601D\u8003\u7684\u5BF9\u8BDD\u6A21\u578B\u3002",performanceHostUnavailable:"\u5F53\u524D\u6A21\u578B\u8DEF\u7EBF\u672A\u63D0\u4F9B\u90E8\u5206\u601D\u8003\u6863\u4F4D\u3002",performance_balanced:"\u6807\u51C6",performance_high:"\u4ED4\u7EC6",performance_compatibility:"\u8DDF\u968F\u6A21\u578B",performanceStopRequired:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u56DE\u7B54\u901F\u5EA6\u3002\u5F53\u524D\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u4F1A\u505C\u6B62\u3002",savePerformance:"\u4FDD\u5B58\u56DE\u7B54\u901F\u5EA6",outputVolume:"\u52A9\u624B\u8BED\u97F3\u97F3\u91CF",outputVolumeHint:"\u4EC5\u8C03\u6574\u5DF2\u5B89\u88C5\u7684 Windows dsh-speak \u540E\u7AEF\uFF0C\u4E0D\u4EE3\u8868\u5F53\u524D\u8BED\u97F3\u8DEF\u7531\u6B63\u5728\u4F7F\u7528\u5B83\uFF1B\u4E0D\u5F71\u54CD DSTuber\u3001\u7CFB\u7EDF\u603B\u97F3\u91CF\u6216\u63D0\u793A\u97F3\u3002\u4E0B\u4E00\u6BB5\u8F93\u51FA\u751F\u6548\u3002",readOutputVolume:"\u8BFB\u53D6\u8BED\u97F3\u97F3\u91CF",saveOutputVolume:"\u4FDD\u5B58\u8BED\u97F3\u97F3\u91CF",outputVolumeUnavailable:"\u5F53\u524D\u8BED\u97F3\u540E\u7AEF\u4E0D\u652F\u6301\u72EC\u7ACB\u97F3\u91CF\u8C03\u8282\u3002",outputVolumeUnknown:"\u97F3\u91CF\u4FDD\u5B58\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u4F1A\u81EA\u52A8\u6838\u67E5\uFF0C\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002",settingsTitle:"\u9C7C\u5E94\u8BBE\u7F6E",settingsSections:"\u8BBE\u7F6E\u5206\u7C7B",tab_audio:"\u97F3\u9891",tab_interaction:"\u4EA4\u4E92",tab_prompt:"\u63D0\u793A\u8BCD",voicePromptLabel:"\u81EA\u5B9A\u4E49\u63D0\u793A\u8BCD",voicePromptOptional:"\uFF08\u53EF\u9009\uFF09",voicePromptAgents:"\u8DDF\u968F AGENTS",voicePromptCustom:"\u5DF2\u9644\u52A0\u81EA\u5B9A\u4E49",voicePromptPlaceholder:`\u4F8B\u5982\uFF1A\u7528\u4E2D\u6587\u56DE\u590D\uFF0C\u5148\u8BF4\u7ED3\u8BBA\uFF0C\u8BED\u6C14\u81EA\u7136\u3002

\u5185\u5BB9\u4F1A\u9644\u52A0\u5728 AGENTS \u540E\u3002\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u8BBE\u7F6E\u3002`,voicePromptStopToEdit:"\u505C\u6B62\u8BED\u97F3\u540E\u53EF\u7F16\u8F91",voicePromptUnsupported:"\u5F53\u524D DSH \u6682\u4E0D\u652F\u6301\u81EA\u5B9A\u4E49\u63D0\u793A\u8BCD\u3002",voicePromptTooLong:"\u63D0\u793A\u8BCD\u4E0D\u80FD\u8D85\u8FC7 32,768 \u4E2A\u5B57\u7B26\u3002",voicePromptSaving:"\u4FDD\u5B58\u4E2D\u2026",voicePromptCancel:"\u53D6\u6D88\u4FEE\u6539",voicePromptSave:"\u4FDD\u5B58",voicePromptSaved:"\u5DF2\u4FDD\u5B58\uFF0C\u4E0B\u6B21\u5F00\u542F\u8BED\u97F3\u65F6\u751F\u6548\u3002",voicePromptSaveFailed:"\u4FDD\u5B58\u672A\u6210\u529F\uFF0C\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002",voicePromptUnsaved:"\u5C1A\u672A\u4FDD\u5B58",tab_models:"\u6A21\u578B",tab_advanced:"\u9AD8\u7EA7",projectInfoTitle:"\u5173\u4E8E\u9C7C\u5E94",projectAuthor:"\u4F5C\u8005",projectRepository:"\u5B98\u65B9\u4ED3\u5E93",projectNpm:"npm \u53D1\u5E03\u9875",tab_sessions:"\u4F1A\u8BDD\u7BA1\u7406",settingsContent:"\u8BBE\u7F6E\u5185\u5BB9",voiceCleanupPending:"\u6B63\u5728\u91CA\u653E\u65E7\u97F3\u9891\u670D\u52A1",voiceCleanupHint:"\u7B49\u5F85\u65E7\u4F1A\u8BDD\u548C\u5F55\u97F3\u9000\u51FA\uFF0C\u5B8C\u6210\u540E\u4F1A\u81EA\u52A8\u66F4\u65B0\u3002",voiceRestartPending:"\u9700\u8981\u91CD\u542F DSH",voiceRestartHint:"\u65E7\u7248\u97F3\u9891\u670D\u52A1\u7684\u9000\u51FA\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u91CD\u542F DSH \u540E\u518D\u70B9\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u3002\u5DF2\u4FDD\u5B58\u7684\u6388\u6743\u4E0D\u53D8\u3002",voiceRootRestartHint:"\u65E7\u8BED\u97F3\u4F1A\u8BDD\u7684\u505C\u6B62\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u9000\u51FA\u5E76\u91CD\u65B0\u6253\u5F00 DSH\u3002",voiceStopPending:"\u8BED\u97F3\u5C1A\u672A\u786E\u8BA4\u505C\u6B62",voiceStopHint:"\u8BF7\u91CD\u65B0\u8BFB\u53D6\u8BED\u97F3\u72B6\u6001\uFF0C\u786E\u8BA4\u505C\u6B62\u540E\u518D\u5F00\u59CB\u5BF9\u8BDD\u3002",voiceTargetOccupied:"\u4E0A\u6B21\u7684\u8BED\u97F3\u4F1A\u8BDD\u6B63\u5728 DSH \u4E2D\u6253\u5F00\u3002\u53EF\u4EE5\u65B0\u5EFA\u9C7C\u5E94\u4F1A\u8BDD\uFF0C\u6216\u9009\u62E9\u8981\u7EE7\u7EED\u7684 DSH \u5BF9\u8BDD\u3002",voiceRecoveryPending:"\u65E7\u8BED\u97F3\u4F1A\u8BDD\u5C1A\u672A\u9000\u51FA",voiceRecoveryCheck:"\u6838\u67E5\u5E76\u505C\u6B62",voiceRecoveryHint:"\u65E7\u5B9E\u4F8B\u4ECD\u5728\u9000\u51FA\uFF0C\u8BF7\u5148\u6838\u67E5\u505C\u6B62\u3002\u82E5\u4E00\u76F4\u672A\u9000\u51FA\uFF0C\u8BF7\u5B8C\u6574\u9000\u51FA\u5E76\u91CD\u65B0\u6253\u5F00 DSH\u3002",operationUnavailable:"\u64CD\u4F5C\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\uFF1B\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002\u8BE6\u60C5\u89C1\u9AD8\u7EA7\u8BBE\u7F6E\u3002",enableFailed:"\u65E0\u6CD5\u5F00\u59CB\u5BF9\u8BDD\u3002\u8BF7\u5728\u8BBE\u7F6E\u7684\u300C\u9AD8\u7EA7\u300D\u67E5\u770B\u539F\u56E0\u540E\u91CD\u8BD5\u3002",tab_pets:"\u684C\u5BA0",planned:"\u8BA1\u5212\u5F00\u53D1\u4E2D",configurationUnknown:"\u914D\u7F6E\u4FDD\u5B58\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\uFF1B\u6838\u5B9E\u524D\u4E0D\u80FD\u7EE7\u7EED\u4FEE\u6539\u3002",motionTitle:"\u754C\u9762\u52A8\u753B",motion_spring:"Q \u5F39",motion_firm:"\u786C\u6717",motion_off:"\u5173\u95ED\u52A8\u753B",motionHint:"\u7ACB\u5373\u9884\u89C8\u5E76\u4FDD\u5B58\uFF1B\u64CD\u4F5C\u4E0D\u7B49\u5F85\u52A8\u753B\u3002\u7CFB\u7EDF\u51CF\u5C11\u52A8\u6001\u6548\u679C\u4F18\u5148\u3002",motionNotSaved:"\u672C\u6B21\u9884\u89C8\u5DF2\u5E94\u7528\uFF0C\u4F46\u6B64\u6D4F\u89C8\u5668\u65E0\u6CD5\u4FDD\u5B58\u52A8\u753B\u504F\u597D\u3002",modeControlPending:"\u8BED\u97F3\u63A7\u5236\u5C1A\u672A\u5B8C\u6210\u6216\u72B6\u6001\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\u3002",capabilityTitle:"\u5BF9\u8BDD\u5728\u4FA7\u680F\u4E2D\u7684\u663E\u793A",supported:"\u53EF\u7528",unsupported:"\u4E0D\u53EF\u7528\u6216\u5C1A\u672A\u786E\u8BA4",hiddenMode:"\u4E0D\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD",workspaceMode:"\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD",taskCapability:"\u540E\u53F0\u4EFB\u52A1\u652F\u6301",configuredMode:"\u5DF2\u4FDD\u5B58\u6A21\u5F0F",currentVoiceMode:"\u5F53\u524D\u5BF9\u8BDD\u7684\u5B9E\u9645\u6A21\u5F0F",noActiveVoice:"\u6CA1\u6709\u8FD0\u884C\u4E2D\u7684\u5BF9\u8BDD",chooseVisibility:"\u9009\u62E9\u663E\u793A\u6A21\u5F0F",workspaceWarning:"\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD\u4F1A\u628A\u5BF9\u8BDD\u663E\u793A\u5728\u666E\u901A\u5DE5\u4F5C\u533A\u4E2D\u3002\u9690\u85CF\u6A21\u5F0F\u4E0D\u53EF\u7528\u65F6\u4ECD\u4F1A\u62D2\u7EDD\u542F\u52A8\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u6539\u4E3A\u53EF\u89C1\u3002",visibilityNoMigration:"\u6B64\u8BBE\u7F6E\u7528\u4E8E\u540E\u7EED\u5BF9\u8BDD\uFF1B\u5DF2\u6709\u5BF9\u8BDD\u4FDD\u6301\u539F\u663E\u793A\u65B9\u5F0F\u3002",modeReadFirst:"\u6B63\u5728\u6838\u67E5\u5F53\u524D\u5BF9\u8BDD\u7684\u914D\u7F6E\u548C\u72B6\u6001\uFF0C\u786E\u8BA4\u540E\u53EF\u4FEE\u6539\u6A21\u5F0F\u3002",closeBeforeMode:"\u8BF7\u5148\u5173\u95ED\u8BED\u97F3\uFF0C\u786E\u8BA4\u5B8C\u5168\u505C\u6B62\u540E\u53EF\u4FEE\u6539\u663E\u793A\u6A21\u5F0F\u3002",saveWorkspace:"\u4FDD\u5B58\u5DE5\u4F5C\u533A\u53EF\u89C1\u6A21\u5F0F",saveHidden:"\u4FDD\u5B58\u9690\u85CF\u6A21\u5F0F",visibilityUnknownWrite:"\u663E\u793A\u6A21\u5F0F\u5199\u5165\u7ED3\u679C\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\u3002\u6838\u5B9E\u524D\u4E0D\u80FD\u7EE7\u7EED\u4FEE\u6539\uFF0C\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002",outputObservationUnavailable:"\u5C1A\u672A\u63A5\u5165\u771F\u5B9E\u64AD\u97F3\u5F00\u59CB\u4E8B\u4EF6\uFF0C\u65E0\u6CD5\u786E\u8BA4\u6B63\u5728\u64AD\u97F3",title:"\u9C7C\u5E94",description:"\u8BED\u97F3\u63A7\u5236\u3001\u97F3\u9891\u8BBE\u7F6E\u4E0E\u72EC\u7ACB\u5BF9\u8BDD\u3002",drag:"\u79FB\u52A8\u9C7C\u5E94\u60AC\u6D6E\u7A97",dragHint:"\u7528\u9F20\u6807\u62D6\u52A8\u7A7A\u767D\u533A\u57DF\u79FB\u52A8\uFF1B\u6309\u94AE\u548C\u8F93\u5165\u6846\u6B63\u5E38\u64CD\u4F5C",collapse:"\u6536\u8D77",reopen:"\u6253\u5F00\u9C7C\u5E94",refresh:"\u5237\u65B0\u72B6\u6001",settings:"\u8BBE\u7F6E",unknown:"\u6B63\u5728\u8BFB\u53D6\u72B6\u6001\u2026",enabled:"\u9EA6\u514B\u98CE\uFF1A\u5DF2\u5F00\u542F",disabled:"\u9EA6\u514B\u98CE\uFF1A\u672A\u5F00\u542F",identity:"\u5B8C\u6574\u4F1A\u8BDD\u6807\u8BC6",source:"\u6388\u6743\u6765\u6E90",actor:"\u64CD\u4F5C\u4F1A\u8BDD",none:"\u65E0",openSession:"\u5148\u5728 DSH \u4FA7\u680F\u65B0\u5EFA\u6216\u6253\u5F00\u4E00\u4E2A\u5BF9\u8BDD\uFF0C\u518D\u56DE\u5230\u9C7C\u5E94\u3002",enable:"\u5F00\u9EA6",transfer:"\u8BA9\u8FD9\u4E2A\u7A97\u53E3\u63A5\u7BA1\u9EA6\u514B\u98CE",disable:"\u5173\u9EA6",stale:"\u72B6\u6001\u6682\u65F6\u8BFB\u4E0D\u5230",snapshot:"\u4E0A\u6B21\u8BFB\u53D6\u7684\u72B6\u6001",consequence:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u672C\u6B21\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u3002\u6536\u8D77\u540E\u4F1A\u7EE7\u7EED\u5BF9\u8BDD\u3002",savedHint:"\u8BBE\u5907\u4E0E\u58F0\u7EB9\u8BBE\u7F6E\u5728\u4E0B\u6B21\u97F3\u9891\u64CD\u4F5C\u65F6\u751F\u6548",more:"\u66F4\u591A\u5BF9\u8BDD",historyOther:"\u5217\u8868\u6765\u81EA\u5176\u4ED6\u64CD\u4F5C\u4F1A\u8BDD\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6",helperOnline:"\u97F3\u9891\u670D\u52A1\u5728\u7EBF",helperOffline:"\u97F3\u9891\u670D\u52A1\u79BB\u7EBF",pending:"\u6B63\u5728\u5904\u7406\u2026",refreshHint:"\u53EA\u8BFB\u53D6\u72B6\u6001\uFF0C\u4E0D\u542F\u52A8\u9EA6\u514B\u98CE\u6216\u6A21\u578B",modelGuide:"\u9ED8\u8BA4 SenseVoice \u5728\u672C\u673A\u4F7F\u7528 CPU\u3002\u6A21\u578B\u6587\u4EF6\u548C\u8BB8\u53EF\u89C1 docs/model-setup.md\u3002",sensevoiceSource:"SenseVoice \u6765\u6E90",ttsSource:"\u5916\u90E8 TTS \u53C2\u8003",licenseNote:"SenseVoice \u8BB8\u53EF\u8BA8\u8BBA",modelTitle:"\u672C\u5730\u6A21\u578B",modelHint:"\u4FDD\u5B58\u5DF2\u6709 SenseVoice \u6216 CAM++ \u8DEF\u5F84\u3002\u6587\u4EF6\u5728\u4F7F\u7528\u524D\u6821\u9A8C\uFF0C\u58F0\u7EB9\u8FC7\u6EE4\u9700\u53E6\u884C\u5F00\u542F\u3002",asr:"\u8BED\u97F3\u8BC6\u522B",sensevoicePath:"SenseVoice \u672C\u5730\u76EE\u5F55",campplusPath:"CAM++ \u6587\u4EF6\uFF08\u53EF\u9009\uFF09",saveModels:"\u4FDD\u5B58\u6A21\u578B\u8DEF\u5F84",audioTitle:"\u97F3\u9891\u8BBE\u7F6E",soundTitle:"\u8F6E\u6B21\u63D0\u793A\u97F3",headphones:"\u6211\u5DF2\u4F7F\u7528\u8033\u673A",headphonesHint:"\u672A\u786E\u8BA4\u8033\u673A\u65F6\uFF0C\u4E3A\u907F\u514D\u5916\u653E\u56DE\u58F0\u4E0D\u64AD\u653E\u63D0\u793A\u97F3\uFF1B\u8FD9\u4E0D\u662F\u56DE\u58F0\u6D88\u9664\uFF0C\u4E5F\u4E0D\u4F1A\u88C1\u6389\u7528\u6237\u8BB2\u8BDD",automaticBargeIn:"\u542F\u7528\u5B9E\u9A8C\u6027\u81EA\u52A8\u6253\u65AD",stopRequested:"\u5DF2\u8BF7\u6C42\u505C\u6B62\u64AD\u653E\uFF0C\u5C1A\u672A\u786E\u8BA4",stopConfirmed:"\u5DF2\u786E\u8BA4\u505C\u6B62\u64AD\u653E",soundEnabled:"\u542F\u7528\u63D0\u793A\u97F3",soundVolume:"\u63D0\u793A\u97F3\u97F3\u91CF\uFF080\u20131\uFF09",soundUnavailable:"\u97F3\u6548\u6682\u672A\u63A5\u5165\uFF1B\u8FD9\u4E9B\u63A7\u4EF6\u4E0D\u4F1A\u5047\u88C5\u64AD\u653E",soundAvailable:"\u97F3\u6548\u5DF2\u63A5\u5165",mode:"\u8BF4\u8BDD\u65B9\u5F0F",alwaysOn:"\u5F00\u542F\u6301\u7EED\u8046\u542C\uFF08\u9EA6\u514B\u98CE\u5E38\u5F00\uFF09",alwaysOff:"\u5207\u56DE\u6309\u4F4F\u8BF4\u8BDD",modeUnavailable:"\u8BF4\u8BDD\u65B9\u5F0F\u63A7\u5236\u5C1A\u672A\u63A5\u5165",modeNeedsGrant:"\u8BF7\u5148\u8BFB\u53D6\u6700\u65B0\u72B6\u6001\u3002",pttMode:"\u6309\u952E\u8BF4\u8BDD",alwaysMode:"\u81EA\u7531\u9EA6",modeHint:"\u5F00\u59CB\u5BF9\u8BDD\u524D\u53EF\u9884\u9009\u8BF4\u8BDD\u65B9\u5F0F\u3002",readSettings:"\u8BFB\u53D6\u8BBE\u7F6E",device:"\u9EA6\u514B\u98CE\u8BBE\u5907",deviceHint:"\u8BBE\u5907\u540D\u79F0\u6765\u81EA\u97F3\u9891\u670D\u52A1\u7684\u6700\u8FD1\u8BFB\u53D6\u3002\u66F4\u6362\u8BBE\u5907\u540E\uFF0C\u5F00\u59CB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002",sideButton:"\u9F20\u6807\u6309\u4F4F\u8BF4\u8BDD",sideOff:"\u5173\u95ED",sideOne:"\u4FA7\u952E 1",sideTwo:"\u4FA7\u952E 2",speaker:"\u5B9E\u9A8C\u6027\u58F0\u7EB9\u8FC7\u6EE4",speakerHint:"\u6B64\u5F00\u5173\u53EA\u7528\u4E8E\u5DF2\u6709\u7684\u58F0\u7EB9\u914D\u7F6E\uFF1B\u5F53\u524D\u9762\u677F\u6CA1\u6709\u6CE8\u518C\u5165\u53E3\u3002",save:"\u4FDD\u5B58\u8BBE\u7F6E",saved:"\u8BBE\u7F6E\u5DF2\u4FDD\u5B58",historyTitle:"\u5BF9\u8BDD\u5386\u53F2",historyHint:"\u53EA\u663E\u793A\u9C7C\u5E94\u521B\u5EFA\u7684\u5BF9\u8BDD\uFF1B\u63A5\u7EED\u4E0D\u4F1A\u81EA\u52A8\u6062\u590D\u5DF2\u5F52\u6863\u804A\u5929",loadHistory:"\u8BFB\u53D6\u5BF9\u8BDD",newChat:"\u65B0\u4F1A\u8BDD",resume:"\u63A5\u7EED",active:"\u5F53\u524D",archived:"\u5DF2\u5F52\u6863",unavailable:"\u4E0D\u53EF\u7528",empty:"\u6682\u65E0\u53EF\u63A5\u7EED\u7684\u5BF9\u8BDD",noTitle:"\u5BF9\u8BDD",noResume:"\u5F53\u524D\u4E0D\u80FD\u63A5\u7EED",newHint:"\u65B0\u5EFA\u6216\u63A5\u7EED\u4F1A\u5207\u6362\u5F53\u524D\u8BED\u97F3\uFF0C\u64A4\u56DE\u65E7\u6388\u6743\uFF0C\u53EF\u80FD\u7ED3\u675F\u65E7\u540E\u53F0\u4EFB\u52A1\uFF1B\u4E0D\u5408\u5E76\u5386\u53F2\uFF0C\u4E5F\u4E0D\u91CD\u8DD1\u65E7\u4EFB\u52A1",historyStale:"\u70B9\u51FB\u8BFB\u53D6\u5BF9\u8BDD\u67E5\u770B\u6700\u65B0\u8BB0\u5F55"},np={startConversation:"Start conversation",endConversation:"End conversation",voiceTarget:"Send to",dedicatedVoiceTarget:"Fish Voice conversation",checkingVoiceTarget:"Checking target\u2026",voiceTargetChanged:"The delivery target changed. Check the chat shown here before starting.",chooseCurrentDshTarget:"Use current chat",backToFishVoice:"Back to Fish Voice",currentDshTargetError:"Could not confirm this DSH chat. Check the chat and try again.",chooseVoiceTarget:"Choose a delivery chat",searchVoiceTargets:"Search by chat title or ID",searchVoiceTargetsAction:"Search",existingVoiceTargetList:"Existing DSH chats",boundVoiceTarget:"Current target",voiceTargetAvailability_ready:"Available",voiceTargetAvailability_busy:"Chat is processing a message",voiceTargetAvailability_archived:"Chat is archived",voiceTargetAvailability_unavailable:"Chat is unavailable",voiceTargetAvailability_managed:"Managed by Fish Voice. Direct delivery unavailable.",voiceTargetAvailability_subagent:"Subagent chat. Direct delivery unavailable.",voiceTargetNoMatch:"No matching chats.",voiceTargetEmptyList:"No available chats.",voiceTargetSynthesisNotice:"With an online voice, replies are sent to the speech provider you approved. Select a local voice under Models \u2192 Read aloud to keep speech offline.",bindVoiceTarget:"Use selected chat",savingVoiceTarget:"Saving\u2026",moreVoiceTargets:"Load more",loadingVoiceTargets:"Loading DSH chats\u2026",voiceTargetListError:"Could not load DSH chats.",retryVoiceTargets:"Retry",voiceTranscriptCaptions:"Voice captions",retryTranscript:"Resend",transcriptDelivery_busy:"Chat busy, waiting to send to",transcriptDelivery_ready:"Ready to resend to",transcriptDelivery_sending:"Sending to",transcriptDelivery_queued:"Waiting for chat",transcriptDelivery_delivered:"Sent to",transcriptDelivery_uncertain:"Delivery unconfirmed",transcriptDelivery_failed:"Failed to send to",transcriptDelivery_discarded:"Pending send canceled",endDiscardsRetries:"Ending the conversation clears pending transcripts.",modeSwitching:"Switching listening mode\u2026",modeSaving:"Saving listening mode\u2026",modeSwitchUnconfirmed:"Checking which listening mode took effect\u2026",modeSwitchFailed:"The change could not be confirmed. Check the current mode and try again.",updateTitle:"Fish Voice updates",updateOfferTitle:"Fish Voice update available",updateCurrentVersion:"Installed",updateNewVersion:"New",updateChannel_stable:"Stable",updateChannel_preview:"Preview",updateCheck:"Check for updates",updateDetails:"View update",updateLater:"Later",updateInstall:"Update now",updateRelease:"Release notes",updateFeedback:"Send feedback",update_idle:"Reading update status\u2026",update_checking:"Checking for updates\u2026",update_current:"Fish Voice is up to date.",update_available:"An update is ready.",update_incompatible:"This update is incompatible with the current DSH environment.",update_installing:"Updating. DSH may reload Fish Voice\u2026","update_restart-required":"Update installed. Restart DSH to apply it.","update_enable-required":"Update installed. Enable Fish Voice in DSH plugin settings.",update_installed:"Update complete.",update_error:"The update encountered an error. Check for updates to retry.",update_unsupported:"Automatic updates are unavailable. See the official release notes.",updateConnection:"Update status could not be confirmed. Check again when DSH is ready.",audioDevices:"Audio devices",audioSystemDefault:"System default",audioInput:"Audio input",audioOutput:"Audio output",inputDeviceMissing:"Microphone disconnected; selection retained",outputDeviceMissing:"Output disconnected; no automatic fallback",deviceDisconnected:"Disconnected",inputDeviceStopFirst:"Turn off the microphone to switch input. Output changes at the next playback.",outputDeviceUnsupported:"Selecting speech output is not supported on this platform.",deviceListRetry:"Device list unavailable. Open a selector to retry.",voiceHelperCleanupHint:"Confirming microphone release. New recording stays off until this completes.",voiceHelperRestartHint:"Microphone helper exit is unconfirmed. Fully restart DSH before enabling voice.",inputError_device:"Microphone unavailable",inputError_recognition:"Recognition failed","inputError_no-speech":"No clear speech; try again",inputHelp_device:"Check mic access. Turn the mic off to select a device. Error details: Settings \u2192 Advanced \u2192 Diagnostics.",inputDiagnosticTitle:"Last reported audio error",inputDiagnosticHistory:"This is the last recorded error and may be from an earlier attempt. It does not confirm the current device state.",inputHelp_recognition:"Try again. If it fails, turn the mic off and check the model in Settings.","inputHelp_no-speech":"Move closer, check that your mic is unmuted, and try again.",speechFailed:"Speech failed",speechInterrupted:"Speech interrupted",wakeFallbackHint:"Say a configured name. Matching uses the transcript for now. Reselect Wake word after switching modes to retry sound matching.",wakeMode:"Wake word",switchToWake:"Switch to wake-word listening",wakeDisabled:"Wake listening is off",wakeStarting:"Starting wake listening\u2026",wakeWaiting:"Waiting for wake word",wakeListening:"Listening for the next instruction",wakePaused:"Wake listening paused",wakeError:"Wake listening unavailable; check settings",wakeHint:"Say a configured name, then your instruction. End the conversation to stop listening.",wakeMethod:"Matches the sound and transcript locally after the phrase ends.",wakeAliases:"Wake names",wakeAliasesHint:"Up to 8 comma-separated names. Mandarin near-sounds match only at the start; prefer a distinctive name of 3+ characters.",wakeTimeout:"Wait after wake (seconds)",wakeSettings:"Wake-word settings",wakeStopToEdit:"Turn off the microphone before editing wake names or timeout.",wakeInvalid:"Enter 1\u20138 valid names and a 3\u201330 second timeout.",switchToPtt:"Click to use push to talk",switchToAlways:"Click to leave the microphone listening",quickSpeedStop:"Turn the mic off to change speed",performanceReadFirst:"Check which speeds the current model supports first.",performanceUnavailable:"The provider explicitly rejected the reasoning parameter for unavailable modes; other modes remain selectable.",performanceProbeCost:"At load, up to 3 fixed short requests check the modes. Model charges apply.",performanceProbeScope:"Only routes with a testing interface send short requests. Native support can be read directly.",performanceProbeUnknown:"Some modes could not be confirmed. Check network access or sign-in, then retry.",performanceProbeAccepted:"The effort request check passed.",performanceProbePending:"Checking effort modes for the current model\u2026",holdToSpeak:"Hold to speak:",alwaysWarning:"The microphone keeps listening. Turn it off when finished.",bindingMissing:"Bind a push-to-talk shortcut in settings, or switch to continuous listening.",noSession:"No conversation is open",otherWindow:"Microphone: another window",readingStatus:"Reading status without starting the microphone or models.",statusRetry:"Status is unavailable. It will be checked automatically when you return to this window.",retryStatus:"Refresh voice status",collapseHint:"Collapsing keeps the microphone enabled",stopConsequence:"Ending the conversation releases the microphone and stops its background tasks.",transferTitle:"Take over the other window\u2019s microphone?",transferWarning:"This interrupts voice in the other window and may end its background tasks.",cancel:"Cancel",confirmTransfer:"Confirm takeover",bindingStopRequired:"Turn off the microphone before changing mouse or keyboard shortcuts.",bindingFinishing:"Voice is still stopping. Wait before changing shortcuts.",headphonesRequired:"Confirm that you are wearing headphones to enable automatic interruption.",deviceManualIndex:"Advanced: enter device index",deviceManualName:"Advanced: enter device name",deviceIndexInvalid:"Enter a nonnegative whole-number device index.",deviceDefault:"Use the system default microphone",deviceManual:"Advanced: enter name or index",deviceSaved:"Saved device",deviceEmpty:"No microphone was found. Connect a device and check system sound settings.",deviceUnknown:"Detected devices appear after enabling voice. Use the system default or enter a device manually.",ttsBackend:"Speech backend",ttsBackendHint:"Speech uses your installed TTS backend and its settings. Independent output volume appears only when verified.",ttsBackendPending:"Additional backend selection is being adapted. No cloud service is connected automatically.",voiceClone:"Voice cloning",voiceCloneAvailable:"Qwen supports a local reference voice. Choose a WAV in voice settings.",voiceClonePrivacy:"Reads only your selected, authorized sample locally. No audio upload.",inputActive:"Receiving voice input",modeUnknown:"Listening mode unknown",voiceInputUnavailable:"Voice input unavailable",voiceInputRecoveryHint:"The audio service stopped. Turn the microphone off, then on again. Your authorization is unchanged.",searchHistory:"Search chats",searchScope:"Search loaded chats",noMatches:"No matching chats",differentOwner:"Voice belongs to another session. Check the source first.",details:"Diagnostics",noReply:"No conversation yet",recentConversation:"Conversation",recentTenTurns:"Recent 10 turns",allRecords:"All records",showAllRecords:"Show all",collapseToTen:"Last 10 turns",collapseConversation:"Collapse conversation",currentVoiceRecords:"Current voice chat",historyTruncated:"Showing a limited range; original records retained",viewConversation:"View voice records",loadEarlier:"Load earlier",readingHistory:"Reading records\u2026",retryHistory:"Could not read records. Retry",noConversation:"No conversation yet",newMessages:"new messages",conversationMessages:"Voice conversation",assistantName:"Assistant name",renameAssistant:"Rename: Enter to save, Esc to cancel",newChatCreated:"New chat created",newChatActive:"Start a voice chat. Background work in the current chat will stop and its history will be kept.",newChatOtherOwner:"Open the current voice chat or the window that enabled the microphone to start a new chat.",compact_off:"Off",compact_standby:"Standby",compact_listening:"Listening",compact_pending:"Working",compact_unknown:"Check status",you:"You",assistant:"Assistant",close:"Close panel",keyboardBinding:"Push-to-talk binding",bindingOff:"Not bound",saveBindings:"Save shortcuts",discardBindings:"Discard changes",bindingCapture:"Press a key combination (Esc cancels)",clearBinding:"Clear binding",bindingUnsupported:"This key or system shortcut is not supported.",bindingGlobalHint:"Windows global shortcut. Disable voice before recording a binding; changes apply on the next voice enable. Keys are not swallowed and may also trigger another application.",bindingUnavailable:"Global key binding is unavailable on this platform.",bindingPrintableWarning:"A plain letter, digit or Space also triggers push-to-talk while typing in other applications.",performanceTitle:"Voice performance",performanceHint:"Applies to the next dedicated voice chat. For a linked conversation, use the model menu in that DSH chat to change its reasoning effort.",inspectPerformance:"Check available modes",performance_fast:"Fast",performanceNoThinking:"No thinking",performanceRecommended:"[Recommended]",performanceFastHint:"Fast explicitly requests thinking to be turned off.",performanceFastUnavailable:"The current route cannot confirm that thinking can be turned off. Choose Follow model or select a model route that supports turning it off.",performanceHostUnavailable:"The current model route does not offer some reasoning levels.",performance_balanced:"Standard",performance_high:"High",performance_compatibility:"Compatible default",performanceStopRequired:"Mode changes require fully stopped voice. Disabling voice can end background work belonging to its voice root.",savePerformance:"Save for next enable",outputVolume:"Assistant voice volume",outputVolumeHint:"Adjusts the installed Windows dsh-speak backend only. It does not verify the active voice route or change DSTuber, system or cue volume. Applies to the next output.",readOutputVolume:"Read voice volume",saveOutputVolume:"Save voice volume",outputVolumeUnavailable:"This speech backend does not support independent volume control.",outputVolumeUnknown:"The volume save is unconfirmed. It will be checked automatically without resubmitting.",settingsTitle:"\u9C7C\u5E94 settings",settingsSections:"Settings sections",tab_audio:"Audio",tab_interaction:"Interaction",tab_prompt:"Prompt",voicePromptLabel:"Custom prompt",voicePromptOptional:"(optional)",voicePromptAgents:"Follow AGENTS",voicePromptCustom:"Custom prompt added",voicePromptPlaceholder:`For example: Give the conclusion first and use a natural tone.

Added after AGENTS. Leave empty to use the default settings.`,voicePromptStopToEdit:"Stop voice to edit",voicePromptUnsupported:"This DSH version does not support custom prompts yet.",voicePromptTooLong:"The prompt must not exceed 32,768 characters.",voicePromptSaving:"Saving\u2026",voicePromptCancel:"Cancel changes",voicePromptSave:"Save",voicePromptSaved:"Saved. Applies when voice is next started.",voicePromptSaveFailed:"Could not save. Your draft has been kept.",voicePromptUnsaved:"Not saved",tab_models:"Models",tab_advanced:"Advanced",projectInfoTitle:"About \u9C7C\u5E94",projectAuthor:"Author",projectRepository:"Official repository",projectNpm:"npm package",tab_sessions:"Sessions",settingsContent:"Settings content",voiceCleanupPending:"Closing previous audio service",voiceCleanupHint:"Waiting for the previous session and recording to exit. Status will refresh without retrying microphone activation.",voiceRestartPending:"Restart DSH required",voiceRestartHint:"The previous audio service has not confirmed exit. Fully quit and reopen DSH before enabling voice. Your saved authorization is unchanged.",voiceRootRestartHint:"Voice session shutdown is unconfirmed. Fully quit and reopen DSH.",voiceStopPending:"Voice stop unconfirmed",voiceStopHint:"Refresh the status and confirm voice has stopped before starting a dialogue.",voiceTargetOccupied:"The previous voice session is open in DSH. Start a new Fish Voice session or choose a DSH conversation.",voiceRecoveryPending:"Previous voice session is still active",voiceRecoveryCheck:"Check and stop",voiceRecoveryHint:"The previous instance is still closing. Check and stop first. If it remains active, fully quit and reopen DSH.",operationUnavailable:"The outcome is unconfirmed. Automatic readback will check the actual state without resubmitting. Details are in Advanced settings.",enableFailed:"Could not open the mic. Check Advanced settings for details before retrying.",tab_pets:"Desktop pet",planned:"Planned development",configurationUnknown:"The configuration write is unconfirmed. Automatic readback is in progress; changes stay locked until verified.",motionTitle:"Interface motion",motion_spring:"Spring",motion_firm:"Firm",motion_off:"Off",motionHint:"Preview and save immediately. Actions never wait for animation. System reduced-motion preference takes priority.",motionNotSaved:"Preview applied, but this browser could not save the preference.",modeControlPending:"Voice control is pending or unconfirmed. Refresh status when it finishes.",capabilityTitle:"Host capabilities and voice visibility",supported:"Available",unsupported:"Unavailable or unconfirmed",hiddenMode:"Hidden voice chat",workspaceMode:"Workspace-visible compatibility mode",taskCapability:"Persistent handoff",configuredMode:"Saved mode",currentVoiceMode:"Actual mode of the current voice chat",noActiveVoice:"No running voice chat",chooseVisibility:"Choose visibility",workspaceWarning:"Workspace-visible compatibility mode shows voice chats in the regular workspace. Unavailable hidden mode still refuses to start; it never falls back to visible mode.",visibilityNoMigration:"This preference applies to later chats. Existing chats keep their current visibility.",modeReadFirst:"Checking settings and status for this conversation before visibility can be changed.",closeBeforeMode:"Turn voice off and wait for confirmed shutdown before changing visibility.",saveWorkspace:"Save workspace-visible mode",saveHidden:"Save hidden mode",visibilityUnknownWrite:"The visibility write is unconfirmed. Automatic readback is in progress; changes stay locked. The original write will not be repeated.",outputObservationUnavailable:"Actual playback-start events are unavailable; playback has not been confirmed.",title:"\u9C7C\u5E94",description:"Voice controls, audio preferences, and separate voice chats.",drag:"Move Fish Voice panel",dragHint:"Drag background space with the mouse; controls remain interactive",collapse:"Collapse",reopen:"Open Fish Voice",refresh:"Refresh status",settings:"Settings",unknown:"Reading status\u2026",enabled:"Microphone enabled",disabled:"Microphone off",identity:"Full session identities",source:"Authorization source",actor:"Action session",none:"None",openSession:"Open a DSH conversation first",enable:"Enable for this session",transfer:"Authorize this session",disable:"Disable voice",stale:"Refresh to confirm status",snapshot:"Last read status",consequence:"Disabling or switching voice may end its background work. Collapsing this panel leaves voice enabled.",savedHint:"Device and speaker settings take effect on the next audio operation or helper reload.",more:"More voice chats",historyOther:"This list belongs to another action session; read it again",helperOnline:"Audio helper online",helperOffline:"Audio helper offline",pending:"Working\u2026",refreshHint:"Read status without starting the microphone or a model",modelGuide:"SenseVoice runs locally on the CPU. For model files and licenses, see docs/model-setup.md.",sensevoiceSource:"SenseVoice source",ttsSource:"External TTS reference",licenseNote:"SenseVoice licensing discussion",modelTitle:"Local models",modelHint:"Save existing SenseVoice or CAM++ paths. Files are verified before use. Speaker filtering is enabled separately.",asr:"Speech recognition",sensevoicePath:"Local SenseVoice directory",campplusPath:"CAM++ file (optional)",saveModels:"Save model paths",audioTitle:"Audio settings",soundTitle:"Turn sounds",headphones:"I am using headphones",headphonesHint:"Cues stay off until headphones are confirmed, to avoid speaker echo. This is not echo cancellation and does not trim your speech.",automaticBargeIn:"Enable experimental automatic interruption",stopRequested:"Stop requested; playback has not confirmed stopping",stopConfirmed:"Playback confirmed stopped",soundEnabled:"Enable turn sounds",soundVolume:"Sound volume (0\u20131)",soundUnavailable:"Sound playback is not connected; these controls cannot play cues yet.",soundAvailable:"Sound playback connected",mode:"Listening mode",alwaysOn:"Enable always listening (mic stays on)",alwaysOff:"Use push to talk",modeUnavailable:"Listening mode control is not connected",modeNeedsGrant:"Read the current voice status first",pttMode:"Push to talk",alwaysMode:"Open mic",modeHint:"The audio helper controls the active mode. Saving preferences never grants or starts microphone access.",readSettings:"Read settings",device:"Input device",deviceHint:"Blank uses the system default; enter a device name or index",sideButton:"Mouse push-to-talk",sideOff:"Off",sideOne:"Side button 1",sideTwo:"Side button 2",speaker:"Experimental speaker filtering",speakerHint:"Enable matching only; this page does not record or enroll a voiceprint",save:"Save settings",saved:"Settings saved",historyTitle:"Voice chats",historyHint:"Only Fish Voice voice chats appear here. Resume never unarchives a chat automatically.",loadHistory:"Read voice chats",newChat:"New chat",resume:"Resume",active:"Current",archived:"Archived",unavailable:"Unavailable",empty:"No voice chats available",noTitle:"Voice chat",noResume:"Cannot resume right now",newHint:"New or resumed chats switch current voice, revoke its old grant, and may end its background work. They do not merge history or replay old work.",historyStale:"Read voice chats to see the latest records"};var Nt=require("react");var vg=/^7b94c8e3-d6a1-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,Xi=e=>typeof e=="string"&&vg.test(e);var op="sidebar.workspaces",bg="workspace",xg="whaleWorkspacePresentation",yg=["sidebar.workspaces.directoryFlow","sidebar.workspaces.session.row.action","sidebar.session.row.leading","sidebar.session.row.trailing","sidebar.session.row.hover"],_g=new Set(["one-shot","continuable","unknown"]);function wg(e,t){return e&&typeof e=="object"&&Object.keys(e).length===t.length&&t.every(n=>Object.hasOwn(e,n))}function kg(e){if(!Array.isArray(e)||e.length>512)return null;let t=[],n=new Set;for(let o of e){if(!wg(o,["id","parentId","mode"])||typeof o.id!="string"||!o.id||o.id.length>256||n.has(o.id))return null;if(o.parentId===null){if(o.mode!==null||!Xi(o.id))return null;t.push({id:o.id,parentId:null,mode:null})}else{if(typeof o.parentId!="string"||!o.parentId||o.parentId===o.id||!_g.has(o.mode))return null;t.push({id:o.id,parentId:o.parentId,mode:o.mode})}n.add(o.id)}return t}function Sg(e,t){if(!e||typeof e!="object"||!e.byId||!Array.isArray(e.ids))return e;let n=new Map(t.map(l=>[l.id,l])),o=Object.create(null),i=new Set,r=!1;for(let[l,u]of Object.entries(e.byId)){let d=n.get(l);if(Xi(l)&&d===void 0){i.add(l),r=!0;continue}if(d?.parentId===null){if(u.parentId===void 0&&u.origin!=="subagent"){o[l]=u;continue}i.add(l),r=!0;continue}if(d&&u.origin==="subagent"&&u.parentId===d.parentId){let p={...u};delete p.origin,o[l]=p,r=!0;continue}o[l]=u}for(let l of t){let u=e.byId[l.id];u&&(l.parentId===null&&(u.parentId!==void 0||u.origin==="subagent")||l.parentId!==null&&(u.origin!=="subagent"||u.parentId!==l.parentId)||e.ids.includes(l.id)||(r=!0))}if(!r)return e;let s=e.ids.filter(l=>!i.has(l)&&o[l]!==void 0);for(let l of t)o[l.id]!==void 0&&!s.includes(l.id)&&s.push(l.id);let a=e.projectionsBySession;if(a&&i.size>0){let l={...a};for(let u of i)delete l[u];a=l}return{...e,ids:s,byId:o,projectionsBySession:a}}function Ig(e,t){return!e||e.locale!==bg||e.options?.id!==void 0||e.options?.key!==void 0||(e.options?.priority??0)!==0||typeof t!="function"||t.name!=="WorkspaceBrowser"?!1:yg.every(n=>Object.hasOwn(e.children??{},n))}function Mg(e){if(!Object.isExtensible(e))return!1;let t=Object.getOwnPropertyDescriptor(e,"component");return t===void 0||t.writable===!0}function Cg(e,t){return e.length===t.length&&e.every((n,o)=>{let i=t[o];return n.id===i.id&&n.parentId===i.parentId&&n.mode===i.mode})}function rp(e,t){let n=[],o=0,i={revision:o,items:n},r,s=!1,a=!1,l=new Set,u=new Set,d=C=>{for(let D of[...C])D()},p={getSnapshot:()=>i,subscribe(C){return u.add(C),()=>u.delete(C)}},f=()=>{o++,i={revision:o,items:n},d(u),d(l)},m=C=>{s!==C&&(s=C,f())},b=()=>{let C=r;r=void 0,C&&C.entry.component===C.wrapper&&(C.entry.component=C.original)},v=()=>{if(a)return;let C;try{C=e.entries(op)}catch{C=void 0}let D=Array.isArray(C)?C.filter($=>{let I=r&&r.entry===$&&$.component===r.wrapper?r.original:$?.component;return Ig($,I)}):[];if(D.length!==1||typeof t!="function"||!Mg(D[0])){b(),m(!1);return}let F=D[0];if(r?.entry===F&&F.component===r.wrapper)return;b(),m(!1);let N=F.component,W=$=>{let I=$.useSessions(A=>A),k=$.useWhaleWorkspacePresentation(A=>A),z=(0,Nt.useMemo)(()=>Sg(I,k.items),[I,k]),O=(0,Nt.useCallback)(A=>A(z),[z]),S=(0,Nt.useMemo)(()=>new Map(k.items.map(A=>[A.id,A])),[k]),P=(0,Nt.useCallback)(A=>{let j=S.get(A),L=I.byId[A];if(j?.parentId&&L?.origin==="subagent"&&L.parentId===j.parentId){t({childSessionId:A,parentSessionId:j.parentId,mode:j.mode});return}$.open?.(A)},[$.open,S,I]);return(0,Nt.createElement)(N,{...$,useSessions:O,open:P})},M=function(I){let k=typeof I?.useSessions=="function"&&typeof I?.useWhaleWorkspacePresentation=="function"&&typeof I?.open=="function";return(0,Nt.useEffect)(()=>{r?.entry===F&&r.wrapper===M&&m(k)},[k]),(0,Nt.createElement)(k?W:N,I)};M.displayName="WhaleWorkspacePresentation",F.component=M,r={entry:F,original:N,wrapper:M}},y=()=>{},w=()=>{};try{y=e.provideRoot({hooks:{[xg]:p}}),typeof y!="function"&&(y=()=>{}),w=e.subscribe(op,v),typeof w!="function"&&(w=()=>{}),v()}catch{w(),b(),y(),m(!1)}return{supported:()=>s,subscribe(C){return l.add(C),()=>l.delete(C)},setOverrides(C){if(a)return!1;let D=kg(C);return D===null?(n.length>0&&(n=[],f()),!1):(Cg(n,D)||(n=D,f()),!0)},dispose(){a||(a=!0,w(),b(),s=!1,f(),y(),l.clear(),u.clear())}}}var zg=["slots","locale","remote","uiSession"];function Pg(e){let t=bd(),n=sd(void 0,{observe:t.internal});n.enableAutomaticReads();let o=ad();e.inject(["whaleFloatingLayout"],v=>{v.effect(()=>o.useLayoutService(v.whaleFloatingLayout),"whale-voice: optional magnetic layout")});let i=ud(),r=cd(window,{onResize:v=>o.fit(v)}),s,a=()=>{};e.effect(()=>{let v=()=>{n.setReadVisibility(document.visibilityState!=="hidden"),document.visibilityState!=="hidden"&&(n.refresh(),s?.refresh(),a())};return window.addEventListener("focus",v),window.addEventListener("online",v),document.addEventListener("visibilitychange",v),v(),()=>{window.removeEventListener("focus",v),window.removeEventListener("online",v),document.removeEventListener("visibilitychange",v)}},"whale-voice: refresh visible state"),e.effect(()=>{let v=rp(e.slots,M=>e.get?.("uiWorkspace")?.openSession(M)),y,w,C=()=>{w?.(),w=null};a=()=>{if(!v.supported()){C();return}if(!y||w)return;let M=y,$=!0;w=y.subscribePresentation(I=>{v.setOverrides(I.shown),$&&($=!1,n.refresh({force:!0}))},I=>{y===M&&(C(),console.warn("\u9C7C\u5E94\u4FA7\u680F\u4F1A\u8BDD\u663E\u793A\u8FDE\u63A5\u4E2D\u65AD",I?.message??I))})};let D=v.subscribe(a),F=!1;s=ss(async()=>{let M=F?"ui-reconnect":"ui-connect";t.internal(M,"requested");try{let $=await md(e,t.internal);return t.internal(M,"finished","ok"),$}catch($){throw F=!0,t.internal(M,"finished","failed"),$}},{visible:()=>n.getSnapshot().readVisible!==!1,onReady:M=>{C(),y=M,t.attach(M),n.attachConversationClient(M),a()},onError:M=>n.conversationUnavailable(M)});let N=n.getSnapshot().readVisible,W=n.subscribe(()=>{let M=n.getSnapshot().readVisible;M!==N&&(N=M,s.visibilityChanged())});return s.start(),()=>{a=()=>{},C(),D(),v.dispose(),W(),t.dispose(),s.dispose(),n.dispose()}},"whale-voice: private conversation stream"),e.effect(()=>()=>{n.dispose(),r.dispose(),o.dispose(),i.dispose()},"whale-ear-ui: state and geometry"),e.effect(()=>e.locale.register("whaleEar",{en:np,zh:tp}),"whale-ear-ui: dictionaries"),e.effect(()=>{let v=document.createElement("style");return v.dataset.plugin="dsh-whale-ear-ui",v.textContent=h.text+Od+rs,document.head.append(v),()=>v.remove()},"whale-ear-ui: stylesheet");let l=async v=>{let y=e.get?.("sessions");if(!y)throw new Error("DSH \u4F1A\u8BDD\u754C\u9762\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");return y.list.getSnapshot().byId[v]||await y.refresh(),y},u=0,d=async v=>{let y=++u;if(v.kind==="root"&&await l(v.id),y!==u)return;let w=e.get?.("uiWorkspace");if(!w?.openSession)throw new Error("DSH \u4F1A\u8BDD\u754C\u9762\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");return w.openSession(v.kind==="root"?v.id:{childSessionId:v.id,parentSessionId:v.parentId,mode:v.mode??"unknown"})},p=v=>d({kind:"root",id:v}),f={subscribe(v){let y=[e.uiSession.adapter?.current?.subscribe(v),e.get?.("layout")?.panelInfo?.subscribe(v),e.get?.("sessions")?.list?.subscribe?.(v)];return()=>y.forEach(w=>w?.())},selectedSession(){let v=e.uiSession.adapter?.current?.getSnapshot();return v?.hooks?.session?.getSnapshot()?.blank===!0?null:v?.props?.sessionId??null},currentConversation(){return e.get?.("layout")?.panelInfo?.getSnapshot()?.activePanelId===null?f.selectedSession():null},sourceFor(v){if(!v)return null;let y=e.get?.("sessions"),w=y?.list?.getSnapshot()?.byId?.[v];return y?.subagentAddress?.(v)||w?.origin==="subagent"||w?.parentId?null:v}},m=async(v,y)=>{let C=await(await l(v)).using(v,{source:"workspaceOperation"},D=>D.binding.session.rename(y));if(!C.ok)throw new Error(C.error.message);return C.value.title},b=()=>({captureBindings:n.captureBindings,refreshModelCompute:n.refreshModelCompute,pickPath:n.pickPath,readState:n.getSnapshot,markSettingsEdited:n.markSettingsEdited,discardSettingsDraft:n.discardSettingsDraft,openAuthorization:n.openAuthorization,closeAuthorization:n.closeAuthorization,saveAuthorization:n.saveAuthorization,readOperationLog:n.readOperationLog,manageSessions:n.manageSessions,listExistingVoiceSessions:n.listExistingVoiceSessions,setExistingVoiceSession:n.setExistingVoiceSession,setSettingsTab:n.setSettingsTab,setSettingsModelTab:n.setSettingsModelTab,setSessionManagement:n.setSessionManagement,senseVoiceAsrAction:n.senseVoiceAsrAction,updateAction:n.updateAction,dismissUpdate:n.dismissUpdate,openExistingVoiceSession:p,openManagedSession:d,renameManagedSession:m,hooks:{whaleUi:n,whalePreferences:i},setMotion:v=>i.setMotion(v),setAssistantName:v=>i.setAssistantName(v),run:(...v)=>n.run(...v),setSession:v=>n.setSession(v),cancelPreview:()=>n.cancelPreview(),discardDiagnostics:()=>n.discardDiagnostics(),dismissSetup:()=>n.dismissSetup(),openSetup:()=>n.openSetup(),showHome:()=>n.showHome(),openSettings:n.openSettings,refresh:v=>n.refresh(v)});e.slots.inject("shell.overlay",()=>e.slots.register({name:"shell.overlay",id:"whale-ear",locale:"whaleEar",inject:()=>({geometry:o,sizing:r,recordUserOperation:t.user,setPanelVisible:n.setPanelVisible,closeAuthorization:n.closeAuthorization,refresh:v=>n.refresh(v),showHome:()=>n.showHome(),dismissSetup:()=>n.dismissSetup(),hooks:{whaleUi:n,whalePreferences:i}}),children:{"whale-ear.panel.controls":{kind:"single",scope:"root"}}},Jd)),e.slots.inject("whale-ear.panel.controls",()=>e.slots.register({name:"whale-ear.panel.controls",locale:"whaleEar",inject:()=>({...b(),controlContext:f,retryVoiceTranscript:n.retryVoiceTranscript})},Gd))}
return module.exports;}});
