window.__ModuleLoader__.load({id:"dsh-whale-ear-ui",factory:(require)=>{var module={exports:{}};var exports=module.exports;
var xr=Object.defineProperty;var np=Object.getOwnPropertyDescriptor;var tp=Object.getOwnPropertyNames;var op=Object.prototype.hasOwnProperty;var qi=(e,n)=>{for(var t in n)xr(e,t,{get:n[t],enumerable:!0})},rp=(e,n,t,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let r of tp(n))!op.call(e,r)&&r!==t&&xr(e,r,{get:()=>n[r],enumerable:!(o=np(n,r))||o.enumerable});return e};var ip=e=>rp(xr({},"__esModule",{value:!0}),e);var ug={};qi(ug,{apply:()=>cg,inject:()=>lg});module.exports=ip(ug);var Rt=require("react");var wn={toggleTrack:"_9wm7YG_toggleTrack",collapse:"_9wm7YG_collapse",thumb:"_9wm7YG_thumb",collapseInner:"_9wm7YG_collapseInner",toggle:"_9wm7YG_toggle",range:"_9wm7YG_range",rail:"_9wm7YG_rail",fill:"_9wm7YG_fill",input:"_9wm7YG_input",text:`._9wm7YG_range {
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

._9wm7YG_rail {
  background: var(--dsw-alias-border-l2, #8791a4);
  pointer-events: none;
  border-radius: 999px;
  height: 6px;
  position: absolute;
  inset: 13px 9px;
  min-width: 0 !important;
  margin: 0 !important;
}

._9wm7YG_fill {
  width: var(--whale-range-position);
  background: var(--dsw-alias-brand-primary, #8ba9e7);
  border-radius: inherit;
  transition: width var(--whale-duration, .2s) var(--whale-ease, ease-out);
  position: absolute;
  inset: 0 auto 0 0;
  min-width: 0 !important;
  margin: 0 !important;
}

._9wm7YG_thumb {
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

._9wm7YG_range ._9wm7YG_input {
  opacity: 0;
  cursor: pointer;
  touch-action: pan-y;
  height: 32px;
  margin: 0;
  position: absolute;
  inset: 0;
  width: 100% !important;
}

._9wm7YG_range:focus-within {
  outline: 2px solid var(--dsw-focus-ring-color, #8ba9e7);
  outline-offset: 2px;
  border-radius: 6px;
}

._9wm7YG_range:hover ._9wm7YG_thumb {
  box-shadow: 0 0 0 4px color-mix(in srgb,var(--dsw-alias-brand-primary, #8ba9e7) 18%,transparent);
}

._9wm7YG_range[data-dragging] :is(._9wm7YG_thumb, ._9wm7YG_fill) {
  transition-duration: 40ms;
  transition-timing-function: linear;
}

._9wm7YG_range[data-disabled], ._9wm7YG_toggle[data-disabled] {
  opacity: .5;
}

._9wm7YG_range[data-disabled] ._9wm7YG_input {
  cursor: not-allowed;
}

._9wm7YG_collapse {
  opacity: 0;
  visibility: hidden;
  grid-template-rows: 0fr;
  transition: grid-template-rows .16s ease-out, opacity .12s ease-out, visibility .16s;
  display: grid;
}

._9wm7YG_collapse[data-open="true"] {
  opacity: 1;
  visibility: visible;
  grid-template-rows: 1fr;
}

._9wm7YG_collapseInner {
  min-height: 0;
  overflow: hidden;
}

._9wm7YG_toggle {
  cursor: pointer;
  align-items: center;
  gap: 8px;
  width: fit-content;
  max-width: 100%;
  font-size: 12px;
  display: flex;
  position: relative;
}

._9wm7YG_toggle > input {
  opacity: 0;
  width: 38px;
  height: 24px;
  margin: 0;
  position: absolute;
}

._9wm7YG_toggleTrack {
  pointer-events: none;
  background: var(--dsw-alias-border-l2, #8791a4);
  width: 36px;
  height: 22px;
  transition: background-color var(--whale-duration, .2s);
  border-radius: 999px;
  flex: none;
  position: relative;
}

._9wm7YG_toggleTrack > span {
  background: var(--dsw-alias-bg-layer-1, #fff);
  width: 16px;
  height: 16px;
  transition: left var(--whale-duration, .2s) var(--whale-ease, ease-out);
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
}

._9wm7YG_toggle > input:checked + ._9wm7YG_toggleTrack {
  background: var(--dsw-alias-brand-primary, #8ba9e7);
}

._9wm7YG_toggle > input:checked + ._9wm7YG_toggleTrack > span {
  left: 17px;
}

._9wm7YG_toggle > input:focus-visible + ._9wm7YG_toggleTrack {
  outline: 2px solid var(--dsw-focus-ring-color, #8ba9e7);
  outline-offset: 2px;
}

[data-motion="firm"] :is(._9wm7YG_range, ._9wm7YG_toggle, ._9wm7YG_collapse) {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="firm"] ._9wm7YG_collapse {
  transition-duration: .1s;
}

[data-motion="off"] :is(._9wm7YG_range, ._9wm7YG_toggle, ._9wm7YG_collapse), [data-motion="off"] :is(._9wm7YG_range, ._9wm7YG_toggle, ._9wm7YG_collapse) * {
  transition: none !important;
  animation: none !important;
}

@media (prefers-reduced-motion: reduce) {
  ._9wm7YG_range, ._9wm7YG_toggle, ._9wm7YG_collapse, ._9wm7YG_range *, ._9wm7YG_toggle *, ._9wm7YG_collapse * {
    transition: none !important;
    animation: none !important;
  }
}

@media (forced-colors: active) {
  ._9wm7YG_range ._9wm7YG_input {
    opacity: 1;
    position: relative;
  }

  ._9wm7YG_rail {
    display: none;
  }

  ._9wm7YG_toggleTrack {
    border: 1px solid buttontext;
  }

  ._9wm7YG_toggleTrack > span {
    background: buttontext;
  }

  ._9wm7YG_toggle > input:checked + ._9wm7YG_toggleTrack {
    background: highlight;
  }
}
`};var on=require("react/jsx-runtime"),Vi=wn.text;function Xt({value:e,defaultValue:n=0,min:t=0,max:o=100,disabled:r,onChange:i,onPointerDown:s,onPointerUp:c,onPointerCancel:l,onLostPointerCapture:u,className:d="",style:m,...f}){let[p,b]=(0,Rt.useState)(n),[v,y]=(0,Rt.useState)(!1);(0,Rt.useEffect)(()=>{r&&y(!1)},[r]);let x=Number(e??p),L=Number(t),M=Number(o),B=M>L&&Number.isFinite(x)?Math.max(0,Math.min(1,(x-L)/(M-L))):0,C=I=>T=>{y(!1),I?.(T)};return(0,on.jsxs)("span",{className:wn.range,"data-whale-motion-range":!0,"data-dragging":v&&!r||void 0,"data-disabled":r||void 0,style:{"--whale-range-position":`${B*100}%`},children:[(0,on.jsxs)("span",{className:wn.rail,"aria-hidden":"true",children:[(0,on.jsx)("span",{className:wn.fill}),(0,on.jsx)("span",{className:wn.thumb})]}),(0,on.jsx)("input",{...f,className:`${wn.input} ${d}`,style:m,type:"range",min:t,max:o,value:e??p,disabled:r,onChange:I=>{r||(e===void 0&&b(I.target.value),i?.(I))},onPointerDown:I=>{r||y(!0),s?.(I)},onPointerUp:C(c),onPointerCancel:C(l),onLostPointerCapture:C(u),onBlur:I=>{y(!1),f.onBlur?.(I)}})]})}function Hi({open:e,children:n,className:t="",...o}){return(0,on.jsx)("div",{...o,className:`${wn.collapse} ${t}`,"data-open":!!e,"aria-hidden":!e,inert:e?void 0:"",children:(0,on.jsx)("div",{className:wn.collapseInner,children:n})})}function Dt({label:e,checked:n,disabled:t,onChange:o,...r}){return(0,on.jsxs)("label",{className:wn.toggle,"data-disabled":t||void 0,children:[(0,on.jsx)("input",{...r,type:"checkbox",role:"switch",checked:n,disabled:t,onChange:i=>o?.(i.target.checked)}),(0,on.jsx)("span",{className:wn.toggleTrack,"aria-hidden":"true",children:(0,on.jsx)("span",{})}),(0,on.jsx)("span",{children:e})]})}function ji(e,{onReady:n,onError:t,visible:o=()=>!0,schedule:r=setTimeout,unschedule:i=clearTimeout}={}){let s=!1,c=!1,l=!1,u=null,d=0,m=null,f=()=>{u!==null&&i(u),u=null},p=async()=>{if(!(s||c||l||!o())){f(),c=!0;try{let b=await e();if(s){await b.dispose();return}try{n(b)}catch(v){throw await b.dispose(),v}m=b,l=!0,d=0}catch(b){if(s)return;t(b),d++,o()&&(u=r(()=>{u=null,p()},Math.min(3e4,750*2**Math.min(d-1,6))),u?.unref?.())}finally{c=!1}}};return{start:p,visibilityChanged(){o()?p():f()},refresh(){p()},dispose(){s=!0,f(),m?.dispose()}}}function Mt(e){return e===null||e&&typeof e=="object"&&!Array.isArray(e)&&Object.keys(e).sort().join(",")==="backend,id,name"&&["winmm","portaudio"].includes(e.backend)&&typeof e.id=="string"&&e.id.length>0&&e.id.length<=1024&&typeof e.name=="string"&&e.name.trim().length>0&&e.name.length<=256&&!/[\u0000-\u001f\u007f]/.test(e.id+e.name)}function Wi(e){return e&&e.schema===1&&["input","output"].every(n=>{let t=e[n];return!t||!["available","empty","unavailable"].includes(t.status)||!Array.isArray(t.items)||t.items.length>128||!(t.reason===null||typeof t.reason=="string"&&t.reason.length<=128)?!1:t.items.every(o=>o!==null&&Mt(o))&&new Set(t.items.map(o=>o.backend+":"+o.id)).size===t.items.length&&(t.status==="available"?t.items.length>0:t.items.length===0)})}var mt=Object.freeze(["ptt","always","wake"]),xo=e=>({ptt:"pttMode",always:"alwaysMode",wake:"wakeMode"})[e]??"modeUnknown",Ki=e=>["waiting","listening"].includes(e?.state)&&e?.streamOpen!==!0?"unknown":{disabled:"wakeDisabled",starting:"wakeStarting",waiting:"wakeWaiting",listening:"wakeListening",paused:"wakePaused",error:"wakeError"}[e?.state]??"unknown",Ji=e=>e!==null&&typeof e=="object"&&!Array.isArray(e)&&["disabled","starting","waiting","listening","paused","error"].includes(e.state)&&(e.deadlineAt===null||Number.isFinite(e.deadlineAt)&&e.deadlineAt>=0)&&typeof e.streamOpen=="boolean"&&["asr-after-utterance","acoustic-after-utterance"].includes(e.detection),Yi=e=>[...new Set(String(e).split(/[,，\n]/).map(n=>n.trim()).filter(Boolean))],_o=e=>Array.isArray(e)&&e.length>=1&&e.length<=8&&new Set(e.map(n=>typeof n=="string"?n.toLowerCase():n)).size===e.length&&e.every(n=>typeof n=="string"&&n.trim()===n&&n.length>=2&&n.length<=24&&!/[\p{C}]/u.test(n)&&/[\p{L}\p{N}]/u.test(n));function Qi(e){if(!e||typeof e!="object"||Array.isArray(e)||!["unknown","available","empty","unavailable"].includes(e.status)||!Array.isArray(e.items)||e.items.length>128)return!1;if(e.status==="unknown")return e.observedAt===null&&e.items.length===0;if(!Number.isFinite(e.observedAt)||e.observedAt<0)return!1;if(e.status!=="available")return e.items.length===0;let n=new Set;return e.items.length>0&&e.items.every(t=>!t||typeof t!="object"||Array.isArray(t)||!Number.isSafeInteger(t.index)||t.index<0||n.has(t.index)||typeof t.name!="string"||!t.name.trim()||t.name.length>256||/[\u0000-\u001f\u007f]/.test(t.name)?!1:(n.add(t.index),!0))}var se={};qi(se,{BIGINT_FORMAT_RANGES:()=>To,CONSTANT_CATCH:()=>cs,Class:()=>Pr,NUMBER_FORMAT_RANGES:()=>Ft,aborted:()=>_n,allowsEval:()=>Nr,assert:()=>dp,assertEqual:()=>sp,assertIs:()=>cp,assertNever:()=>up,assertNotEqual:()=>ap,assignProp:()=>cn,attachSchema:()=>Ut,base64ToUint8Array:()=>as,base64urlToUint8Array:()=>Np,cached:()=>vt,captureStackTrace:()=>Po,cleanEnum:()=>Cp,cleanRegex:()=>Zt,clone:()=>xn,cloneDef:()=>fp,codePointLength:()=>qt,constantCatch:()=>us,createTransparentProxy:()=>wp,defineLazy:()=>Lr,defineLazyInternal:()=>fe,derived:()=>Gp,esc:()=>zr,escapeRegex:()=>Gn,explicitlyAborted:()=>Ir,extend:()=>kp,finalizeIssue:()=>kn,floatSafeRemainder:()=>Tr,getElementAtPath:()=>hp,getEnumValues:()=>ht,getLengthableOrigin:()=>Vt,getParsedType:()=>bp,getSizableOrigin:()=>ss,hexToUint8Array:()=>Ep,hide:()=>Co,installLazyProp:()=>Rp,isObject:()=>rt,isPlainObject:()=>Hn,issue:()=>bt,joinValues:()=>ko,jsonStringifyReplacer:()=>gt,members:()=>$r,merge:()=>Sp,mergeDefs:()=>In,normalizeParams:()=>oe,nullish:()=>Sr,numKeys:()=>yp,objectClone:()=>pp,omit:()=>_p,optionalKeys:()=>Er,own:()=>Vn,parsedType:()=>Gr,partial:()=>Tp,pick:()=>xp,prefixIssues:()=>$n,primitiveTypes:()=>rs,promiseAllObject:()=>gp,propertyKeyTypes:()=>Ar,randomString:()=>vp,rawShape:()=>yt,required:()=>Lp,safeExtend:()=>Pp,shallowClone:()=>os,sizeCaps:()=>zo,slugify:()=>Cr,stringifyPrimitive:()=>So,toZod:()=>lp,uint8ArrayToBase64:()=>ls,uint8ArrayToBase64url:()=>Ap,uint8ArrayToHex:()=>Ip,unwrapMessage:()=>ft});function sp(e){return e}function ap(e){return e}function lp(){return e=>e}function cp(e){}function up(e){throw new Error("Unexpected value in exhaustive check")}function dp(e){}function ht(e){let n=Object.values(e).filter(o=>typeof o=="number");return Object.entries(e).filter(([o,r])=>n.indexOf(+o)===-1).map(([o,r])=>r)}function ko(e,n="|"){return e.map(t=>So(t)).join(n)}function gt(e,n){return typeof n=="bigint"?n.toString():n}var kr=class{constructor(n){this._getter=n,this._value=void 0}get value(){let n=this._getter;return n!==void 0&&(this._value=n(),this._getter=void 0),this._value}};function vt(e){return new kr(e)}function Sr(e){return e==null}function Zt(e){let n=e.startsWith("^")?1:0,t=e.endsWith("$")?e.length-1:e.length;return e.slice(n,t)}function Tr(e,n){let t=e/n,o=Math.round(t),r=4*Number.EPSILON*Math.max(Math.abs(t),1);return Math.abs(t-o)<r?0:t-o}var es=Symbol("evaluating");function Lr(e,n,t){let o;Object.defineProperty(e,n,{get(){if(o!==es)return o===void 0&&(o=es,o=t()),o},set(r){Object.defineProperty(e,n,{value:r})},configurable:!0})}function pp(e){return Object.create(Object.getPrototypeOf(e),Object.getOwnPropertyDescriptors(e))}function cn(e,n,t){Object.defineProperty(e,n,{value:t,writable:!0,enumerable:!0,configurable:!0})}function yt(e){let n=Object.getOwnPropertyDescriptor(e,"shape");return n?.get?n.get.raw:n?.value}function En(e){return yt(e._zod.def)??e._zod.def.shape}function ns(e,n,t){Object.defineProperty(e,n,{get(){let o=t();return cn(this,n,o),o},enumerable:!0,configurable:!0})}function ts(e,n,t){n in e?cn(e,n,t):e[n]=t}function ot(e,n,t,o){let r=En(n);for(let i of t){let s=Object.getOwnPropertyDescriptor(r,i);s.enumerable&&(s.get?ns(e,i,()=>{let c=n._zod.def.shape[i];return o?o(c,i):c}):ts(e,i,o?o(s.value,i):s.value))}}function mp(e,n){for(let t of Reflect.ownKeys(n)){let o=Object.getOwnPropertyDescriptor(n,t);o.enumerable&&(o.get?ns(e,t,()=>n[t]):ts(e,t,o.value))}}function In(...e){let n={};for(let t of e){let o=Object.getOwnPropertyDescriptors(t);Object.assign(n,o)}return Object.defineProperties({},n)}function fp(e){return In(e._zod.def)}function hp(e,n){return n?n.reduce((t,o)=>t?.[o],e):e}function gp(e){let n=Object.keys(e),t=n.map(o=>e[o]);return Promise.all(t).then(o=>{let r={};for(let i=0;i<n.length;i++)r[n[i]]=o[i];return r})}function vp(e=10){let n="abcdefghijklmnopqrstuvwxyz",t="";for(let o=0;o<e;o++)t+=n[Math.floor(Math.random()*n.length)];return t}function zr(e){return JSON.stringify(e)}function Cr(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/[\s_-]+/g,"-").replace(/^-+|-+$/g,"")}var Po="captureStackTrace"in Error?Error.captureStackTrace:(...e)=>{};function rt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}var Nr=vt(()=>{if(rn.jitless||typeof navigator<"u"&&navigator?.userAgent?.includes("Cloudflare"))return!1;try{let e=Function;return new e(""),!0}catch{return!1}});function Hn(e){if(rt(e)===!1)return!1;let n=e.constructor;if(n===void 0||typeof n!="function")return!0;let t=n.prototype;return!(rt(t)===!1||Object.prototype.hasOwnProperty.call(t,"isPrototypeOf")===!1)}function os(e){return Hn(e)?{...e}:Array.isArray(e)?[...e]:e instanceof Map?new Map(e):e instanceof Set?new Set(e):e}function yp(e){let n=0;for(let t in e)Object.prototype.hasOwnProperty.call(e,t)&&n++;return n}var bp=e=>{let n=typeof e;switch(n){case"undefined":return"undefined";case"string":return"string";case"number":return Number.isNaN(e)?"nan":"number";case"boolean":return"boolean";case"function":return"function";case"bigint":return"bigint";case"symbol":return"symbol";case"object":return Array.isArray(e)?"array":e===null?"null":e.then&&typeof e.then=="function"&&e.catch&&typeof e.catch=="function"?"promise":typeof Map<"u"&&e instanceof Map?"map":typeof Set<"u"&&e instanceof Set?"set":typeof Date<"u"&&e instanceof Date?"date":typeof File<"u"&&e instanceof File?"file":"object";default:throw new Error(`Unknown data type: ${n}`)}},Ar=new Set(["string","number","symbol"]),rs=new Set(["string","number","bigint","boolean","symbol","undefined"]);function Gn(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function xn(e,n,t){let o=new e._zod.constr(n??e._zod.def);return(!n||t?.parent)&&(o._zod.parent=e),o}function oe(e){let n=e;if(!n)return{};if(typeof n=="string")return{error:()=>n};if(n?.message!==void 0){if(n?.error!==void 0)throw new Error("Cannot specify both `message` and `error` params");n.error=n.message}return delete n.message,typeof n.error=="string"?{...n,error:()=>n.error}:n}function wp(e){let n;return new Proxy({},{get(t,o,r){return n??(n=e()),Reflect.get(n,o,r)},set(t,o,r,i){return n??(n=e()),Reflect.set(n,o,r,i)},has(t,o){return n??(n=e()),Reflect.has(n,o)},deleteProperty(t,o){return n??(n=e()),Reflect.deleteProperty(n,o)},ownKeys(t){return n??(n=e()),Reflect.ownKeys(n)},getOwnPropertyDescriptor(t,o){return n??(n=e()),Reflect.getOwnPropertyDescriptor(n,o)},defineProperty(t,o,r){return n??(n=e()),Reflect.defineProperty(n,o,r)}})}function So(e){return typeof e=="bigint"?e.toString()+"n":typeof e=="string"?`"${e}"`:`${e}`}function Er(e){return Object.keys(e).filter(n=>e[n]._zod.optin!==void 0&&e[n]._zod.optout==="optional")}var Ft={safeint:[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],int32:[-2147483648,2147483647],uint32:[0,4294967295],float32:[-34028234663852886e22,34028234663852886e22],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]},To={int64:[BigInt("-9223372036854775808"),BigInt("9223372036854775807")],uint64:[BigInt(0),BigInt("18446744073709551615")]};function xp(e,n){let t=e._zod.def,o=t.checks;if(o&&o.length>0)throw new Error(".pick() cannot be used on object schemas containing refinements");let i={};return ot(i,e,Lo(e,n)),xn(e,In(t,{shape:i,checks:[]}))}function Lo(e,n){let t=En(e),o=[];for(let r of Reflect.ownKeys(n)){if(!Object.getOwnPropertyDescriptor(t,r)?.enumerable)throw new Error(`Unrecognized key: "${String(r)}"`);n[r]&&o.push(r)}return o}function _p(e,n){let t=e._zod.def,o=t.checks;if(o&&o.length>0)throw new Error(".omit() cannot be used on object schemas containing refinements");let i=new Set(Lo(e,n)),s={};return ot(s,e,Reflect.ownKeys(En(e)).filter(c=>!i.has(c))),xn(e,In(t,{shape:s,checks:[]}))}function kp(e,n){if(!Hn(n))throw new Error("Invalid input to extend: expected a plain object");let t=e._zod.def.checks;if(t&&t.length>0){let r=En(e);for(let i of Reflect.ownKeys(n))if(Object.getOwnPropertyDescriptor(r,i)!==void 0)throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.")}return xn(e,In(e._zod.def,{shape:is(e,n)}))}function is(e,n){let t={};return ot(t,e,Reflect.ownKeys(En(e))),mp(t,n),t}function Pp(e,n){if(!Hn(n))throw new Error("Invalid input to safeExtend: expected a plain object");return xn(e,In(e._zod.def,{shape:is(e,n)}))}function Sp(e,n){if(!n?._zod?.def)throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");if(e._zod.def.checks?.length)throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");let t={};ot(t,e,Reflect.ownKeys(En(e))),ot(t,n,Reflect.ownKeys(En(n)));let o=In(e._zod.def,{shape:t,get catchall(){return n._zod.def.catchall},checks:n._zod.def.checks??[]});return xn(e,o)}function Tp(e,n,t,o="partial"){let i=n._zod.def.checks;if(i&&i.length>0)throw new Error(`.${o}() cannot be used on object schemas containing refinements`);let c=t?new Set(Lo(n,t)):void 0,l={};return ot(l,n,Reflect.ownKeys(En(n)),e&&((u,d)=>c&&!c.has(d)?u:new e({type:"optional",innerType:u}))),xn(n,In(n._zod.def,{shape:l,checks:[]}))}function Lp(e,n,t){let o=t?new Set(Lo(n,t)):void 0,r={};return ot(r,n,Reflect.ownKeys(En(n)),(i,s)=>o&&!o.has(s)?i:new e({type:"nonoptional",innerType:i})),xn(n,In(n._zod.def,{shape:r}))}function _n(e,n=0){if(e.aborted===!0)return!0;for(let t=n;t<e.issues.length;t++)if(e.issues[t]?.continue!==!0)return!0;return!1}function Ir(e,n=0){if(e.aborted===!0)return!0;for(let t=n;t<e.issues.length;t++)if(e.issues[t]?.continue===!1)return!0;return!1}function $n(e,n){return n.map(t=>{var o;return(o=t).path??(o.path=[]),t.path.unshift(e),t})}function ft(e){return typeof e=="string"?e:e?.message}function zo(e){let n=[];for(let t of e??[]){let o=t._zod.def;if(!/_(length|size)$|_equals$/.test(o.check))break;let r=o.maximum??o.length??o.size;r>=0&&n.push([r,t])}return n}function Ut(e,n,t){var o;for(let r=n;r<e.length;r++)(o=e[r]).schema??(o.schema=t)}function kn(e,n,t){var o;let r=e.inst?._zod?.traits;r?.has("$ZodType")&&(r.has("$ZodCheck")?(o=e).schema??(o.schema=e.inst):e.schema=e.inst);let i=e.schema!==e.inst?e.schema?._zod.def?.error:void 0,s=e.message?e.message:ft(e.inst?._zod.def?.error?.(e))??ft(i?.(e))??ft(n?.error?.(e))??ft(t.customError?.(e))??ft(t.localeError?.(e))??"Invalid input",c={};for(let l of Object.keys(e))l==="inst"||l==="schema"||l==="continue"||l==="input"||l==="__proto__"||(c[l]=e[l]);return c.path??(c.path=[]),c.message=s,n?.reportInput&&(c.input=e.input),c}function ss(e){return e instanceof Set?"set":e instanceof Map?"map":e instanceof File?"file":"unknown"}var zp=/[\uD800-\uDBFF]/;function qt(e){let n=e.length;if(!zp.test(e))return n;let t=n;for(let o=0;o<n-1;o++)(e.charCodeAt(o)&64512)===55296&&(e.charCodeAt(o+1)&64512)===56320&&(t--,o++);return t}function Vt(e){return Array.isArray(e)?"array":typeof e=="string"?"string":"unknown"}function Gr(e){let n=typeof e;switch(n){case"number":return Number.isNaN(e)?"nan":"number";case"object":{if(e===null)return"null";if(Array.isArray(e))return"array";let t=e;if(t&&Object.getPrototypeOf(t)!==Object.prototype&&"constructor"in t&&t.constructor)return t.constructor.name}}return n}function bt(...e){let[n,t,o]=e;return typeof n=="string"?{message:n,code:"custom",input:t,inst:o}:{...n}}function Cp(e){return Object.entries(e).filter(([n,t])=>Number.isNaN(Number.parseInt(n,10))).map(n=>n[1])}function as(e){let n=atob(e),t=new Uint8Array(n.length);for(let o=0;o<n.length;o++)t[o]=n.charCodeAt(o);return t}function ls(e){let n="";for(let t=0;t<e.length;t++)n+=String.fromCharCode(e[t]);return btoa(n)}function Np(e){let n=e.replace(/-/g,"+").replace(/_/g,"/"),t="=".repeat((4-n.length%4)%4);return as(n+t)}function Ap(e){return ls(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}function Ep(e){let n=e.replace(/^0x/,"");if(n.length%2!==0)throw new Error("Invalid hex string length");let t=new Uint8Array(n.length/2);for(let o=0;o<n.length;o+=2)t[o/2]=Number.parseInt(n.slice(o,o+2),16);return t}function Ip(e){return Array.from(e).map(n=>n.toString(16).padStart(2,"0")).join("")}var Pr=class{constructor(...n){}};function $r(e,n){for(let t in n){let o=Object.getOwnPropertyDescriptor(n,t);o.get?Object.defineProperty(e,t,{...o,enumerable:!1}):$p(e,t,o.value)}}function Vn(e,n,t,o=!0){return Object.defineProperty(e,n,{configurable:!0,writable:!0,enumerable:o,value:t}),t}function Co(e,n,t){return Vn(e,n,t,!1)}function Gp(e,n){for(let t in e){let o=e[t];Object.defineProperty(n,t,{configurable:!0,enumerable:!0,get(){return Vn(this,t,o(this))},set(r){Vn(this,t,r)}})}return n}function $p(e,n,t){Object.defineProperty(e,n,{configurable:!0,get(){return this==null?t:Vn(this,n,t.bind(this))},set(o){Vn(this,n,o)}})}function Op(e,n){let t=Object.getPrototypeOf(e);return n in t?void 0:t}var _r,qn=!1,Bp={configurable:!0,get(){qn=!0}};function fe(e,n,t){let o=Object.getPrototypeOf(e._zod);if(n in o&&_r!==e._zod){_r=void 0;return}_r=e._zod,Object.defineProperty(o,n,{configurable:!0,get(){Object.defineProperty(this,n,Bp);let r=qn;qn=!1;try{let i=t(this);return qn?delete this[n]:Object.defineProperty(this,n,{configurable:!0,writable:!0,value:i}),qn=qn||r,i}catch(i){throw delete this[n],qn=qn||r,i}},set(r){Object.defineProperty(this,n,{configurable:!0,writable:!0,value:r})}})}function Rp(e,n,t,o){let r=Op(e,n);r&&Object.defineProperty(r,n,{configurable:!0,get(){let i={configurable:!0,writable:!0,enumerable:o,value:void 0};return Object.defineProperty(this,n,i),i.value=t(this),Object.defineProperty(this,n,i),i.value},set(i){Object.defineProperty(this,n,{configurable:!0,writable:!0,enumerable:o,value:i})}})}var cs="~constantCatch";function us(e){let n=()=>e;return n[cs]=!0,n}var ds;var Or={value:void 0,enumerable:!1},ps="captureStackTrace"in Error?Error:null;function Xp(e){let n=ps;if(n){let t=n.stackTraceLimit;if(typeof t=="number"){try{n.stackTraceLimit=0}catch{return ps=null,new e}try{return new e}finally{n.stackTraceLimit=t}}}return new e}function $(e,n,t,o){let r={};function i(f){this.def=f,this.constr=m,this.traits=new Set}i.prototype=r;let s=t,c=s&&new WeakSet;function l(f,p){if(f._zod){if(f._zod.traits.has(e))return}else{Or.value=new i(p);try{Object.defineProperty(f,"_zod",Or)}finally{Or.value=void 0}}if(f._zod.traits.add(e),n(f,p),c){let v=Object.getPrototypeOf(f),y=f._zod.constr.prototype,x=v;for(;x&&x!==y;)x=Object.getPrototypeOf(x);let L=x??v;c.has(L)||(c.add(L),$r(L,s))}let b=m.prototype;for(let v in b)Object.prototype.hasOwnProperty.call(b,v)&&(v in f||(f[v]=b[v].bind(f)))}let u=o?.Parent??Object;class d extends u{}Object.defineProperty(d,"name",{value:e});function m(f){let p=o?.Parent?Xp(d):this;l(p,f);let b=p._zod.deferred;if(b){for(let y of b)y();p._zod.deferred=void 0}let v=globalThis.__zod_globalConfig?.postProcessor;return v&&v(p),p}return Object.defineProperty(m,"init",{value:l}),Object.defineProperty(m,Symbol.hasInstance,{value:f=>o?.Parent&&f instanceof o.Parent?!0:f?._zod?.traits?.has(e)}),Object.defineProperty(m,"name",{value:e}),m}var Pn=class extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}},wt=class extends Error{constructor(n){super(`Encountered unidirectional transform during encode: ${n}`),this.name="ZodEncodeError"}};(ds=globalThis).__zod_globalConfig??(ds.__zod_globalConfig={});var rn=globalThis.__zod_globalConfig;function un(e){return e&&Object.assign(rn,e),rn}function Dp(){let e=this._zod;return e.message??(e.message=JSON.stringify(e.def,gt,2)),e.message}function Mp(e){this._zod.message=e}var Zp={get:Dp,set:Mp,enumerable:!0,configurable:!0},Rr={value:void 0,enumerable:!1},ms=new WeakSet([Object.prototype,Error.prototype]),fs=(e,n)=>{e.name="$ZodError",Rr.value=n,Object.defineProperty(e,"issues",Rr),Rr.value=void 0,Object.defineProperty(e,"message",Zp);let t=Object.getPrototypeOf(e);ms.has(t)||(ms.add(t),Object.defineProperty(t,"toString",{configurable:!0,enumerable:!1,get(){let o=()=>this.message;return Object.defineProperty(this,"toString",{value:o,configurable:!0,writable:!0}),o},set(o){Object.defineProperty(this,"toString",{value:o,configurable:!0,writable:!0})}}))},hs=$("$ZodError",fs),_g=$("$ZodError",fs,void 0,{Parent:Error});function Fp(e,n,t){return Object.prototype.hasOwnProperty.call(e,n)||(n==="__proto__"?Object.defineProperty(e,n,{value:t(),writable:!0,enumerable:!0,configurable:!0}):e[n]=t()),e[n]}function gs(e,n=t=>t.message){let t={},o=[];for(let r of e.issues)r.path.length>0?Fp(t,r.path[0],()=>[]).push(n(r)):o.push(n(r));return{formErrors:o,fieldErrors:t}}function vs(e,n=t=>t.message){let t={_errors:[]},o=(r,i=[])=>{for(let s of r.issues)if(s.code==="invalid_union"&&s.errors.length)s.errors.map(c=>o({issues:c},[...i,...s.path]));else if(s.code==="invalid_key")o({issues:s.issues},[...i,...s.path]);else if(s.code==="invalid_element")o({issues:s.issues},[...i,...s.path]);else{let c=[...i,...s.path];if(c.length===0)t._errors.push(n(s));else{let l=t,u=0;for(;u<c.length;){let d=c[u],m=u===c.length-1;if(d==="_errors"){m&&l._errors.push(n(s)),u++;continue}Object.prototype.hasOwnProperty.call(l,d)||Object.defineProperty(l,d,{value:{_errors:[]},enumerable:!0,writable:!0,configurable:!0});let f=l[d];m&&f._errors.push(n(s)),l=f,u++}}}};return o(e),t}function No(e,n){return{callee:n?.callee??e,Err:n?.Err}}var Ao=e=>{let n=(t,o,r,i)=>{let s=r?{...r,async:!1}:{async:!1},c=t._zod.run({value:o,issues:[]},s);if(c instanceof Promise)throw new Pn;if(c.issues.length){let l=new(i?.Err??e)(c.issues.map(u=>kn(u,s,un())));throw Po(l,i?.callee??n),l}return c.value};return n};var Eo=e=>{let n=async(t,o,r,i)=>{let s=r?{...r,async:!0}:{async:!0},c=t._zod.run({value:o,issues:[]},s);if(c instanceof Promise&&(c=await c),c.issues.length){let l=new(i?.Err??e)(c.issues.map(u=>kn(u,s,un())));throw Po(l,i?.callee??n),l}return c.value};return n};var Io=e=>(n,t,o)=>{let r=o?{...o,async:!1}:{async:!1},i=n._zod.run({value:t,issues:[]},r);if(i instanceof Promise)throw new Pn;return i.issues.length?ys(e,i.issues,r):{success:!0,data:i.value}};function ys(e,n,t){let o;return{success:!1,get error(){return o||(o=new e(n.map(r=>kn(r,t,un()))),n=void 0,t=void 0),o},set error(r){o=r,n=void 0,t=void 0}}}var Go=e=>async(n,t,o)=>{let r=o?{...o,async:!0}:{async:!0},i=n._zod.run({value:t,issues:[]},r);return i instanceof Promise&&(i=await i),i.issues.length?ys(e,i.issues,r):{success:!0,data:i.value}};var Up=Symbol.for("zod.compile.invalid"),qp=Symbol.for("zod.compile.fallback"),Xr=((e,n,t)=>{let o=e._zod.bag.validator;if(o!==void 0){if(o(n)!==Up)return!0;if(o.definite===!0&&t===void 0)return!1}return Vp(e,n,t)});function Vp(e,n,t){let o=t?{...t,async:!1,abortEarly:!0}:{async:!1,abortEarly:!0},r=e._zod.bag.fallbackRun,i;if(r?(o[qp]=!0,i=r({value:n,issues:[]},o)):i=e._zod.run({value:n,issues:[]},o),i instanceof Promise)throw new Pn;return i.issues.length===0}var Dr=async(e,n,t)=>{let o=t?{...t,async:!0,abortEarly:!0}:{async:!0,abortEarly:!0},r=e._zod.run({value:n,issues:[]},o);return r instanceof Promise&&(r=await r),r.issues.length===0},bs=e=>{let n=Ao(e),t=(o,r,i,s)=>{let c=i?{...i,direction:"backward"}:{direction:"backward"};return n(o,r,c,No(t,s))};return t};var ws=e=>{let n=Ao(e),t=(o,r,i,s)=>n(o,r,i,No(t,s));return t};var xs=e=>{let n=Eo(e),t=async(o,r,i,s)=>{let c=i?{...i,direction:"backward"}:{direction:"backward"};return await n(o,r,c,No(t,s))};return t};var _s=e=>{let n=Eo(e),t=async(o,r,i,s)=>await n(o,r,i,No(t,s));return t};var ks=e=>(n,t,o)=>{let r=o?{...o,direction:"backward"}:{direction:"backward"};return Io(e)(n,t,r)};var Ps=e=>(n,t,o)=>Io(e)(n,t,o);var Ss=e=>async(n,t,o)=>{let r=o?{...o,direction:"backward"}:{direction:"backward"};return Go(e)(n,t,r)};var Ts=e=>async(n,t,o)=>Go(e)(n,t,o);var Ls=/^[cC][0-9a-z]{6,}$/,zs=/^[0-9a-z]+$/,Cs=/^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/,Ns=/^[0-9a-vA-V]{20}$/,As=/^[A-Za-z0-9]{27}$/,Es=/^[a-zA-Z0-9_-]{21}$/;function Is(e){return new RegExp(`^[a-zA-Z0-9_-]{${e}}$`)}var Gs=/^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;var $s=/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,Zr=e=>e?new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`):/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;var Os=/^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;var Hp="^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";function Bs(){return new RegExp(Hp,"u")}var Rs=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,Xs=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;var Ds=/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,Ms=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,Zs=/^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,Fs=/^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/;var Us=/^https?$/,qs=/^\+[1-9]\d{6,14}$/;var Vs="(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";function jp(e){return new RegExp(`^${e}$`)}var Hs=jp(Vs);function Mr(e){let n="(?:[01]\\d|2[0-3]):[0-5]\\d";return typeof e.precision=="number"?e.precision===-1?`${n}`:e.precision===0?`${n}:[0-5]\\d`:`${n}:[0-5]\\d\\.\\d{${e.precision}}`:e.seconds?`${n}:[0-5]\\d(?:\\.\\d+)?`:`${n}(?::[0-5]\\d(?:\\.\\d+)?)?`}function js(e){return new RegExp(`^${Mr(e)}$`)}function Ws(e){let n=["Z"];e.offset&&n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");let t=`${Mr({precision:e.precision,seconds:!0})}(?:${n.join("|")})`,o=e.local?`${t}|${Mr({precision:e.precision})}`:t;return new RegExp(`^${Vs}T(?:${o})$`)}var Ks=/^[\s\S]{0,}$/;var Fr=/^-?\d+$/,Ht=/^-?\d+(?:\.\d+)?$/,Js=/^(?:true|false)$/i,Ys=/^null$/i;var Qs=/^[^A-Z]*$/,ea=/^[^a-z]*$/;var je=$("$ZodCheck",(e,n)=>{var t;e._zod??(e._zod={}),e._zod.def=n,(t=e._zod).onattach??(t.onattach=[])});var Ur=e=>{let n=e.value;return!Sr(n)&&n.length!==void 0},$o={number:"number",bigint:"bigint",object:"date"},qr=$("$ZodCheckLessThan",(e,n)=>{je.init(e,n);let t=$o[typeof n.value];e._zod.check=o=>{(n.inclusive?o.value<=n.value:o.value<n.value)||o.issues.push({origin:$o[typeof o.value]??t,code:"too_big",maximum:typeof n.value=="object"?n.value.getTime():n.value,input:o.value,inclusive:n.inclusive,inst:e,continue:!n.abort})}}),Vr=$("$ZodCheckGreaterThan",(e,n)=>{je.init(e,n);let t=$o[typeof n.value];e._zod.check=o=>{(n.inclusive?o.value>=n.value:o.value>n.value)||o.issues.push({origin:$o[typeof o.value]??t,code:"too_small",minimum:typeof n.value=="object"?n.value.getTime():n.value,input:o.value,inclusive:n.inclusive,inst:e,continue:!n.abort})}}),na=$("$ZodCheckMultipleOf",(e,n)=>{je.init(e,n),e._zod.check=t=>{if(typeof t.value!=typeof n.value)throw new Error("Cannot mix number and bigint in multiple_of check.");(typeof t.value=="bigint"?n.value!==BigInt(0)&&t.value%n.value===BigInt(0):Tr(t.value,n.value)===0)||t.issues.push({origin:typeof t.value,code:"not_multiple_of",divisor:n.value,input:t.value,inst:e,continue:!n.abort})}}),ta=$("$ZodCheckNumberFormat",(e,n)=>{je.init(e,n),n.format=n.format||"float64";let t=n.format?.includes("int"),o=t?"int":"number",[r,i]=Ft[n.format];e._zod.check=s=>{let c=s.value;if(t){if(!Number.isInteger(c)){s.issues.push({expected:o,format:n.format,code:"invalid_type",continue:!1,input:c,inst:e});return}if(!Number.isSafeInteger(c)){c>0?s.issues.push({input:c,code:"too_big",maximum:Number.MAX_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:o,inclusive:!0,continue:!n.abort}):s.issues.push({input:c,code:"too_small",minimum:Number.MIN_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:o,inclusive:!0,continue:!n.abort});return}}c<r&&s.issues.push({origin:"number",input:c,code:"too_small",minimum:r,inclusive:!0,inst:e,continue:!n.abort}),c>i&&s.issues.push({origin:"number",input:c,code:"too_big",maximum:i,inclusive:!0,inst:e,continue:!n.abort})}});var oa=$("$ZodCheckMaxLength",(e,n)=>{var t;je.init(e,n),(t=e._zod.def).when??(t.when=Ur),e._zod.check=o=>{let r=o.value,i=r.length;if((typeof r=="string"&&i>n.maximum?qt(r):i)<=n.maximum)return;let c=Vt(r);o.issues.push({origin:c,code:"too_big",maximum:n.maximum,inclusive:!0,input:r,inst:e,continue:!n.abort})}}),ra=$("$ZodCheckMinLength",(e,n)=>{var t;je.init(e,n),(t=e._zod.def).when??(t.when=Ur),e._zod.check=o=>{let r=o.value,i=r.length;if((typeof r=="string"&&i>=n.minimum&&i<n.minimum*2?qt(r):i)>=n.minimum)return;let c=Vt(r);o.issues.push({origin:c,code:"too_small",minimum:n.minimum,inclusive:!0,input:r,inst:e,continue:!n.abort})}}),ia=$("$ZodCheckLengthEquals",(e,n)=>{var t;je.init(e,n),(t=e._zod.def).when??(t.when=Ur),e._zod.check=o=>{let r=o.value,i=r.length,s=typeof r=="string"&&i>=n.length&&i<=n.length*2?qt(r):i;if(s===n.length)return;let c=Vt(r),l=s>n.length;o.issues.push({origin:c,...l?{code:"too_big",maximum:n.length}:{code:"too_small",minimum:n.length},inclusive:!0,exact:!0,input:o.value,inst:e,continue:!n.abort})}}),Wt=$("$ZodCheckStringFormat",(e,n)=>{var t,o;je.init(e,n),n.pattern?(t=e._zod).check??(t.check=r=>{n.pattern.lastIndex=0,!n.pattern.test(r.value)&&r.issues.push({origin:"string",code:"invalid_format",format:n.format,input:r.value,...n.pattern?{pattern:n.pattern.toString()}:{},inst:e,continue:!n.abort})}):(o=e._zod).check??(o.check=()=>{})}),sa=$("$ZodCheckRegex",(e,n)=>{Wt.init(e,n),e._zod.check=t=>{n.pattern.lastIndex=0,!n.pattern.test(t.value)&&t.issues.push({origin:"string",code:"invalid_format",format:"regex",input:t.value,pattern:n.pattern.toString(),inst:e,continue:!n.abort})}}),aa=$("$ZodCheckLowerCase",(e,n)=>{n.pattern??(n.pattern=Qs),Wt.init(e,n)}),la=$("$ZodCheckUpperCase",(e,n)=>{n.pattern??(n.pattern=ea),Wt.init(e,n)}),ca=$("$ZodCheckIncludes",(e,n)=>{je.init(e,n);let t=Gn(n.includes),o=new RegExp(typeof n.position=="number"?`^.{${n.position},}${t}`:t);n.pattern=o,e._zod.check=r=>{r.value.includes(n.includes,n.position)||r.issues.push({origin:"string",code:"invalid_format",format:"includes",includes:n.includes,input:r.value,inst:e,continue:!n.abort})}}),ua=$("$ZodCheckStartsWith",(e,n)=>{je.init(e,n);let t=new RegExp(`^${Gn(n.prefix)}.*`);n.pattern??(n.pattern=t),e._zod.check=o=>{o.value.startsWith(n.prefix)||o.issues.push({origin:"string",code:"invalid_format",format:"starts_with",prefix:n.prefix,input:o.value,inst:e,continue:!n.abort})}}),da=$("$ZodCheckEndsWith",(e,n)=>{je.init(e,n);let t=new RegExp(`.*${Gn(n.suffix)}$`);n.pattern??(n.pattern=t),e._zod.check=o=>{o.value.endsWith(n.suffix)||o.issues.push({origin:"string",code:"invalid_format",format:"ends_with",suffix:n.suffix,input:o.value,inst:e,continue:!n.abort})}});var pa=$("$ZodCheckOverwrite",(e,n)=>{je.init(e,n),e._zod.check=t=>{t.value=n.tx(t.value)}});var Oo=class{constructor(n=[],t={}){this.content=[],this.indent=0,this.args=n,this.closed=t}indented(n){this.indent+=1;try{n(this)}finally{this.indent-=1}}write(n){if(typeof n=="function"){n(this,{execution:"sync"}),n(this,{execution:"async"});return}let o=n.split(`
`).filter(s=>s),r=Math.min(...o.map(s=>s.length-s.trimStart().length)),i=o.map(s=>s.slice(r)).map(s=>" ".repeat(this.indent*2)+s);for(let s of i)this.content.push(s)}compile(){let n=Function,t=this?.content??[""];return new n(...Object.keys(this.closed),`return function (${this.args.join(", ")}) {
${t.join(`
`)}
};`)(...Object.values(this.closed))}};var fa={major:4,minor:6,patch:7};var ke=$("$ZodType",(e,n)=>{var t;e??(e={}),e._zod.def=n,e._zod.bag=e._zod.bag||{},e._zod.version=fa;let o=e._zod.def.checks,r=e._zod.traits.has("$ZodCheck")?[e,...o??[]]:o?.length?[...o]:[];for(let i of r)for(let s of i._zod.onattach)s(e);if(r.length===0)(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{let i=(c,l,u)=>{if(c.memo)return c;let d=_n(c),m;for(let f of l){if(f._zod.def.when){if(Ir(c)||!f._zod.def.when(c))continue}else if(d)continue;let p=c.issues.length,b=f._zod.check(c);if(b instanceof Promise&&u?.async===!1)throw new Pn;if(m||b instanceof Promise)m=(m??Promise.resolve()).then(async()=>{await b,c.issues.length!==p&&(Ut(c.issues,p,e),d||(d=_n(c,p)))});else{if(c.issues.length===p)continue;Ut(c.issues,p,e),d||(d=_n(c,p))}}return m?m.then(()=>c):c},s=(c,l,u)=>{if(_n(c))return c.aborted=!0,c;let d=i(l,r,u);if(d instanceof Promise){if(u.async===!1)throw new Pn;return d.then(m=>e._zod.parse(m,u))}return e._zod.parse(d,u)};e._zod.run=(c,l)=>{if(l.skipChecks)return e._zod.parse(c,l);if(l.direction==="backward"){let d=e._zod.parse({value:c.value,issues:[]},{...l,skipChecks:!0});return d instanceof Promise?d.then(m=>s(m,c,l)):s(d,c,l)}let u=e._zod.parse(c,l);if(u instanceof Promise){if(l.async===!1)throw new Pn;return u.then(d=>i(d,r,l))}return i(u,r,l)}}},{get"~standard"(){return Co(this,"~standard",jr(this))},set"~standard"(e){Vn(this,"~standard",e)}}),Sa=(e,n)=>e.issues.length?{issues:e.issues.map(t=>kn(t,n,un()))}:{value:e.value};async function Wp(e,n){let t={async:!0};return Sa(await e._zod.run({value:n,issues:[]},t),t)}function jr(e){return{validate:n=>{let t={async:!1};try{let o=e._zod.run({value:n,issues:[]},t);if(!(o instanceof Promise))return Sa(o,t)}catch{}return Wp(e,n)},vendor:"zod",version:1}}var Do=$("$ZodString",(e,n)=>{ke.init(e,n),e._zod.pattern=n.pattern??Ks,e._zod.parse=(t,o)=>{if(n.coerce)try{t.value=String(t.value)}catch{}return typeof t.value=="string"||t.issues.push({expected:"string",code:"invalid_type",input:t.value,inst:e}),t}}),Se=$("$ZodStringFormat",(e,n)=>{Wt.init(e,n),Do.init(e,n)}),Ta=$("$ZodGUID",(e,n)=>{n.pattern??(n.pattern=$s),Se.init(e,n)}),La=$("$ZodUUID",(e,n)=>{if(n.version){let o={v1:1,v2:2,v3:3,v4:4,v5:5,v6:6,v7:7,v8:8}[n.version];if(o===void 0)throw new Error(`Invalid UUID version: "${n.version}"`);n.pattern??(n.pattern=Zr(o))}else n.pattern??(n.pattern=Zr());Se.init(e,n)}),za=$("$ZodEmail",(e,n)=>{n.pattern??(n.pattern=Os),Se.init(e,n)}),Ca=1,Ro=2;function Na(e){try{return typeof URL<"u"&&typeof URL.canParse=="function"?URL.canParse(e):(new URL(e),!0)}catch{return!1}}function Kp(e,n){return!("normalize"in n)&&!("hostname"in n)&&!("protocol"in n)?Na(e)||Ro:Jp(e,n)}function Jp(e,n){if(!n.normalize&&n.protocol?.source===Us.source&&!/^https?:\/\//i.test(e))return Ca;try{if(typeof URL<"u"){let t=URL;if(typeof t.parse=="function")return t.parse(e)??Ro}return new URL(e)}catch{return Ro}}var Yp=/[\t\n\r]/g;function ha(e){return e.replace(Yp,"")}function Qp(e,n){return n.lastIndex=0,n.test(e.hostname)}function em(e,n){return n.lastIndex=0,n.test(e.protocol.endsWith(":")?e.protocol.slice(0,-1):e.protocol)}var Aa=$("$ZodURL",(e,n)=>{Se.init(e,n),e._zod.check=t=>{try{let o=t.value.trim(),r=Kp(o,n);if(r===Ca){t.issues.push({code:"invalid_format",format:"url",note:"Invalid URL format",input:t.value,inst:e,continue:!n.abort});return}if(r===Ro){t.issues.push({code:"invalid_format",format:"url",input:t.value,inst:e,continue:!n.abort});return}if(r===!0){t.value=ha(o);return}n.hostname&&!Qp(r,n.hostname)&&t.issues.push({code:"invalid_format",format:"url",note:"Invalid hostname",pattern:n.hostname.source,input:t.value,inst:e,continue:!n.abort}),n.protocol&&!em(r,n.protocol)&&t.issues.push({code:"invalid_format",format:"url",note:"Invalid protocol",pattern:n.protocol.source,input:t.value,inst:e,continue:!n.abort}),t.value=n.normalize?r.href:ha(o);return}catch{t.issues.push({code:"invalid_format",format:"url",input:t.value,inst:e,continue:!n.abort})}}}),Ea=$("$ZodEmoji",(e,n)=>{n.pattern??(n.pattern=Bs()),Se.init(e,n)}),Ia=$("$ZodNanoID",(e,n)=>{if(n.length!==void 0&&(!Number.isInteger(n.length)||n.length<1))throw new Error(`Invalid nanoid length: ${n.length}`);n.pattern??(n.pattern=n.length===void 0?Es:Is(n.length)),Se.init(e,n)}),Ga=$("$ZodCUID",(e,n)=>{n.pattern??(n.pattern=Ls),Se.init(e,n)}),$a=$("$ZodCUID2",(e,n)=>{n.pattern??(n.pattern=zs),Se.init(e,n)}),Oa=$("$ZodULID",(e,n)=>{n.pattern??(n.pattern=Cs),Se.init(e,n)}),Ba=$("$ZodXID",(e,n)=>{n.pattern??(n.pattern=Ns),Se.init(e,n)}),Ra=$("$ZodKSUID",(e,n)=>{n.pattern??(n.pattern=As),Se.init(e,n)}),Xa=$("$ZodISODateTime",(e,n)=>{n.pattern??(n.pattern=Ws(n)),Se.init(e,n)}),Da=$("$ZodISODate",(e,n)=>{n.pattern??(n.pattern=Hs),Se.init(e,n)}),Ma=$("$ZodISOTime",(e,n)=>{n.pattern??(n.pattern=js(n)),Se.init(e,n)}),Za=$("$ZodISODuration",(e,n)=>{n.pattern??(n.pattern=Gs),Se.init(e,n)}),Fa=$("$ZodIPv4",(e,n)=>{n.pattern??(n.pattern=Rs),Se.init(e,n)}),nm=/^[0-9a-fA-F:.]+$/;function Ua(e){return nm.test(e)?Na(`http://[${e}]`):!1}var qa=$("$ZodIPv6",(e,n)=>{n.pattern??(n.pattern=Xs),Se.init(e,n),e._zod.check=t=>{Ua(t.value)||t.issues.push({code:"invalid_format",format:"ipv6",input:t.value,inst:e,continue:!n.abort})}});var Va=$("$ZodCIDRv4",(e,n)=>{n.pattern??(n.pattern=Ds),Se.init(e,n)});function tm(e){let n=e.split("/");if(n.length!==2)return!1;let[t,o]=n;if(!o)return!1;let r=Number(o);return`${r}`!==o||r<0||r>128?!1:Ua(t)}var Ha=$("$ZodCIDRv6",(e,n)=>{n.pattern??(n.pattern=Ms),Se.init(e,n),e._zod.check=t=>{tm(t.value)||t.issues.push({code:"invalid_format",format:"cidrv6",input:t.value,inst:e,continue:!n.abort})}});function ja(e){if(e==="")return!0;if(/\s/.test(e)||e.length%4!==0)return!1;try{return atob(e),!0}catch{return!1}}var Wr=/^[0-9a-zA-Z+/]*={0,2}$/,Wa=$("$ZodBase64",(e,n)=>{n.pattern??(n.pattern=Wr),Se.init(e,n),e._zod.check=t=>{ja(t.value)||t.issues.push({code:"invalid_format",format:"base64",input:t.value,inst:e,continue:!n.abort})}}),Mo=/^[A-Za-z0-9_-]*$/;function om(e){if(!Mo.test(e))return!1;let n=e.replace(/[-_]/g,o=>o==="-"?"+":"/"),t=n.padEnd(Math.ceil(n.length/4)*4,"=");return ja(t)}var Ka=$("$ZodBase64URL",(e,n)=>{n.pattern??(n.pattern=Mo),Se.init(e,n),e._zod.check=t=>{om(t.value)||t.issues.push({code:"invalid_format",format:"base64url",input:t.value,inst:e,continue:!n.abort})}}),Ja=$("$ZodE164",(e,n)=>{n.pattern??(n.pattern=qs),Se.init(e,n)});function rm(e,n=null){try{let t=e.split(".");if(t.length!==3)return!1;let[o]=t;if(!o)return!1;let r=JSON.parse(atob(o));return!("typ"in r&&r?.typ!=="JWT"||!r.alg||n&&(!("alg"in r)||r.alg!==n))}catch{return!1}}var Ya=$("$ZodJWT",(e,n)=>{Se.init(e,n),e._zod.check=t=>{rm(t.value,n.alg)||t.issues.push({code:"invalid_format",format:"jwt",input:t.value,inst:e,continue:!n.abort})}});var Kr=$("$ZodNumber",(e,n)=>{ke.init(e,n),e._zod.pattern=Ht,e._zod.parse=(t,o)=>{if(n.coerce)try{t.value=Number(t.value)}catch{}let r=t.value;if(typeof r=="number"&&!Number.isNaN(r)&&Number.isFinite(r))return t;let i=typeof r=="number"?Number.isNaN(r)?"NaN":Number.isFinite(r)?void 0:String(r):void 0;return t.issues.push({expected:"number",code:"invalid_type",input:r,inst:e,...i?{received:i}:{}}),t}}),Qa=$("$ZodNumberFormat",(e,n)=>{ta.init(e,n),Kr.init(e,n)}),el=$("$ZodBoolean",(e,n)=>{ke.init(e,n),e._zod.pattern=Js,e._zod.parse=(t,o)=>{if(n.coerce)try{t.value=!!t.value}catch{}let r=t.value;return typeof r=="boolean"||t.issues.push({expected:"boolean",code:"invalid_type",input:r,inst:e}),t}});var nl=$("$ZodNull",(e,n)=>{ke.init(e,n),e._zod.pattern=Ys,e._zod.values=new Set([null]),e._zod.parse=(t,o)=>{let r=t.value;return r===null||t.issues.push({expected:"null",code:"invalid_type",input:r,inst:e}),t}});var tl=$("$ZodUnknown",(e,n)=>{ke.init(e,n),e._zod.parse=t=>t}),ol=$("$ZodNever",(e,n)=>{ke.init(e,n),e._zod.parse=(t,o)=>(t.issues.push({expected:"never",code:"invalid_type",input:t.value,inst:e}),t)});function im(e,n){let t=zo(e._zod.def.checks);if(!t.length)return;let o=Math.min(...t.map(i=>i[0])),r=e._zod.parse;e._zod.parse=(i,s)=>{let c=n(i.value);if(c>o&&!s?.skipChecks&&s?.direction!=="backward"){for(let[l,u]of zo(e._zod.def.checks))if(c>l&&u._zod.def.when(i)){let d=i.issues.length;return u._zod.check(i),i.issues[d].continue=!1,Ut(i.issues,d,e),i}}return r(i,s)}}var sm=e=>Array.isArray(e)?e.length:-1;function ga(e,n,t){e.issues.length&&n.issues.push(...$n(t,e.issues)),n.value[t]=e.value}var rl=$("$ZodArray",(e,n)=>{ke.init(e,n);let t=rn.memoizer;t?.attach(e),e._zod.parse=(o,r)=>{let i=o.value;if(!Array.isArray(i))return o.issues.push({expected:"array",code:"invalid_type",input:i,inst:e}),o;o.value=t?t.alloc(e,o,Array(i.length),r):Array(i.length);let s=[],c=r?.abortEarly;for(let l=0;l<i.length;l++){let u=i[l],d=n.element._zod.run({value:u,issues:[]},r);if(d instanceof Promise)s.push(d.then(m=>ga(m,o,l)));else if(ga(d,o,l),c&&d.issues.length!==0&&_n(d))break}return s.length?Promise.all(s).then(()=>o):o},im(e,sm)});function Xo(e,n,t,o,r,i){let s=t in o,c=i==="optional";if(!(!s&&c&&r==="optional")){if(e.issues.length){if(r!==void 0&&c&&!s)return;n.issues.push(...$n(t,e.issues))}if(!s&&r===void 0){e.issues.length||n.issues.push({code:"invalid_type",expected:"nonoptional",input:void 0,path:[t]});return}e.value===void 0?(s||r==="defaulted"&&!c)&&(n.value[t]=void 0):n.value[t]=e.value}}var am=[];function il(e){let n=Object.keys(e.shape),t=Object.getOwnPropertySymbols(e.shape),o=t.length?t:am,r=o.length?[...n,...o]:n;for(let s of r)if(!e.shape?.[s]?._zod?.traits?.has("$ZodType"))throw new Error(`Invalid element at key "${String(s)}": expected a Zod schema`);let i=Er(e.shape);return{...e,allKeys:r,symbolKeys:o,keySet:new Set(n),numKeys:n.length,optionalKeys:new Set(i)}}function sl(e,n,t,o,r,i,s){let c=[],l=r.keySet,u=r.catchall._zod,d=u.def.type,m=u.optin,f=u.optout,p=0;for(let b in n){if(s&&t.issues.length!==p){if(_n(t,p))break;p=t.issues.length}if(l.has(b))continue;if(b==="__proto__"){d==="never"&&c.push(b);continue}if(d==="never"){c.push(b);continue}let v=u.run({value:n[b],issues:[]},o);v instanceof Promise?e.push(v.then(y=>Xo(y,t,b,n,m,f))):Xo(v,t,b,n,m,f)}return c.length&&t.issues.push({code:"unrecognized_keys",keys:c,input:n,inst:i,continue:!0}),e.length?Promise.all(e).then(()=>t):t}var lm=$("$ZodObject",(e,n)=>{ke.init(e,n);let t=Object.getOwnPropertyDescriptor(n,"shape"),o=t?.get?t.get.raw:n.shape??{};if(o){let u=()=>{let d={...o};return Object.defineProperty(n,"shape",{value:d}),u.raw=d,d};u.raw=o,Object.defineProperty(n,"shape",{get:u})}let r=vt(()=>il(n));fe(e,"propValues",u=>{let d=u.def.shape,m={};for(let f in d){let p=d[f]._zod;if(p.values){Object.prototype.hasOwnProperty.call(m,f)||cn(m,f,new Set);for(let b of p.values)m[f].add(b);p.optin!==void 0&&m[f].add(void 0)}}return m});let i=rt,s=n.catchall,c,l=rn.memoizer;l?.attach(e),e._zod.parse=(u,d)=>{c??(c=r.value);let m=u.value;if(!i(m))return u.issues.push({expected:"object",code:"invalid_type",input:m,inst:e}),u;u.value=l?l.alloc(e,u,{},d):{};let f=[],p=c.shape,b=d?.abortEarly,v=u.issues.length;for(let y of c.allKeys){if(b&&u.issues.length!==v){if(_n(u,v))break;v=u.issues.length}if(y==="__proto__")continue;let x=p[y],L=x._zod.optin,M=x._zod.optout,B=x._zod.run({value:m[y],issues:[]},d);B instanceof Promise?f.push(B.then(C=>Xo(C,u,y,m,L,M))):Xo(B,u,y,m,L,M)}return s?sl(f,m,u,d,r.value,e,b===!0):f.length?Promise.all(f).then(()=>u):u}}),al=$("$ZodObjectJIT",(e,n)=>{lm.init(e,n);let t=e._zod.parse,o=vt(()=>il(n)),r=rn.memoizer,i=p=>{let b=o.value,v=b.symbolKeys,y=new Oo(["payload","ctx"],{shape:p,inst:e,memo:r,syms:v}),x=C=>`shape[${C}]._zod.run({ value: input[${C}], issues: [] }, ctx)`,L=(C,I)=>`
          let ${C}_ab = false;
          for (let i = 0; i < ${C}.issues.length; i++) {
            const iss = ${C}.issues[i];
            iss.path = iss.path ? [${I}, ...iss.path] : [${I}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${C}_ab = true;
          }
          if (${C}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;y.write("const input = payload.value;");let M=Object.create(null),B=0;for(let C of b.allKeys)M[C]=`key_${B++}`;y.write(r?"const newResult = memo.alloc(inst, payload, {}, ctx);":"const newResult = {};");for(let C of b.allKeys){if(C==="__proto__")continue;let I=M[C],T=typeof C=="symbol"?`syms[${v.indexOf(C)}]`:zr(C),E=`${T} in input`,S=p[C],k=S?._zod?.optin,z=k!==void 0,X=S?._zod?.optout==="optional";if(y.write(`const ${I} = ${x(T)};`),z&&X){let P=k==="optional"?`${I}_present`:`${I}.value !== undefined || ${I}_present`;y.write(`
        const ${I}_present = ${E};
        if (!${I}.issues.length || ${I}_present) {
          if (${I}.issues.length) {${L(I,T)}
          }

          if (${P}) {
            newResult[${T}] = ${I}.value;
          }
        }

      `)}else z?(y.write(`
        if (${I}.issues.length) {${L(I,T)}
        }
      `),k==="defaulted"?y.write(`newResult[${T}] = ${I}.value;`):y.write(`
        if (${I}.value !== undefined || ${E}) {
          newResult[${T}] = ${I}.value;
        }
      `)):y.write(`
        const ${I}_present = ${E};
        if (${I}.issues.length) {${L(I,T)}
        }
        if (!${I}_present && !${I}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${T}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${I}_present) {
          newResult[${T}] = ${I}.value;
        }

      `)}return y.write("payload.value = newResult;"),y.write("return payload;"),y.compile()},s,c=rt,l=!rn.jitless,d=l&&Nr.value,m=n.catchall,f;e._zod.parse=(p,b)=>{f??(f=o.value);let v=p.value;return c(v)?l&&d&&b?.async===!1&&b.jitless!==!0?(s||(s=i(n.shape)),p=s(p,b),m?sl([],v,p,b,f,e,b?.abortEarly===!0):p):t(p,b):(p.issues.push({expected:"object",code:"invalid_type",input:v,inst:e}),p)}});function va(e,n,t,o){for(let i of e)if(i.issues.length===0)return n.value=i.value,n;let r=e.filter(i=>!_n(i));return r.length===1?(n.value=r[0].value,r[0]):(n.issues.push({code:"invalid_union",input:n.value,inst:t,errors:e.map(i=>i.issues.map(s=>kn(s,o,un())))}),n)}var Jr=$("$ZodUnion",(e,n)=>{ke.init(e,n),fe(e,"optin",o=>o.def.options.some(r=>r._zod.optin==="defaulted")?"defaulted":o.def.options.some(r=>r._zod.optin!==void 0)?"optional":void 0),fe(e,"optout",o=>o.def.options.some(r=>r._zod.optout==="optional")?"optional":void 0),fe(e,"values",o=>{if(o.def.options.every(r=>r._zod.values))return new Set(o.def.options.flatMap(r=>Array.from(r._zod.values)))}),fe(e,"pattern",o=>{if(o.def.options.every(r=>r._zod.pattern)){let r=o.def.options.map(i=>i._zod.pattern);return new RegExp(`^(${r.map(i=>Zt(i.source)).join("|")})$`)}});let t=n.options.length===1?n.options[0]._zod.run:null;e._zod.parse=(o,r)=>{if(t)return t(o,r);let i=!1,s=[];for(let c of n.options){let l=c._zod.run({value:o.value,issues:[]},r);if(l instanceof Promise)s.push(l),i=!0;else{if(l.issues.length===0)return l;s.push(l)}}return i?Promise.all(s).then(c=>va(c,o,e,r)):va(s,o,e,r)}});function cm(e){let n=new Map;for(let t of e.options){let o=t._zod.propValues?.[e.discriminator];if(!o||o.size===0)throw new Error(`Invalid discriminated union option at index "${e.options.indexOf(t)}"`);for(let r of o)if(n.has(r)){if(r!==void 0)throw new Error(`Duplicate discriminator value "${String(r)}"`);n.set(r,null)}else n.set(r,t)}return n}var ll=$("$ZodDiscriminatedUnion",(e,n)=>{n.inclusive=!1,Jr.init(e,n);let t=e._zod.parse;fe(e,"propValues",r=>{let i={},s=0;for(let c of r.def.options){let l=c._zod.propValues;if(!l||Object.keys(l).length===0)throw new Error(`Invalid discriminated union option at index "${r.def.options.indexOf(c)}"`);l[r.def.discriminator]?.has(void 0)&&s++;for(let[u,d]of Object.entries(l)){Object.prototype.hasOwnProperty.call(i,u)||cn(i,u,new Set);for(let m of d)i[u].add(m)}}return!r.def.unionFallback&&s>1&&i[r.def.discriminator]?.delete(void 0),i}),n.options.forEach((r,i)=>{let s=yt(r._zod.def);if(s&&!Object.prototype.hasOwnProperty.call(s,n.discriminator))throw new Error(`Invalid discriminated union option at index "${i}"`)});let o=vt(()=>cm(n));e._zod.parse=(r,i)=>{let s=r.value;if(!rt(s))return r.issues.push({code:"invalid_type",expected:"object",input:s,inst:e}),r;let c=s?.[n.discriminator],l=o.value.get(c);return l&&(c!==void 0||i.direction!=="backward")?l._zod.run(r,i):n.unionFallback||i.direction==="backward"?t(r,i):(r.issues.push({code:"invalid_union",errors:[],note:"No matching discriminator",discriminator:n.discriminator,options:Array.from(o.value.keys()).filter(u=>o.value.get(u)!==null),input:s,path:[n.discriminator],inst:e}),r)}}),cl=$("$ZodIntersection",(e,n)=>{ke.init(e,n),e._zod.parse=(t,o)=>{let r=t.value,i=n.left._zod.run({value:r,issues:[]},o),s=n.right._zod.run({value:r,issues:[]},o);return i instanceof Promise||s instanceof Promise?Promise.all([i,s]).then(([l,u])=>ya(t,l,u)):ya(t,i,s)}});function Hr(e,n){if(e===n)return{valid:!0,data:e};if(e instanceof Date&&n instanceof Date&&+e==+n)return{valid:!0,data:e};if(Hn(e)&&Hn(n)){let t=Object.keys(n),o=Object.keys(e).filter(i=>t.indexOf(i)!==-1),r={...e,...n};Object.prototype.hasOwnProperty.call(r,"__proto__")&&delete r.__proto__;for(let i of o){if(i==="__proto__")continue;let s=Hr(e[i],n[i]);if(!s.valid)return{valid:!1,mergeErrorPath:[i,...s.mergeErrorPath]};r[i]=s.data}return{valid:!0,data:r}}if(Array.isArray(e)&&Array.isArray(n)){if(e.length!==n.length)return{valid:!1,mergeErrorPath:[]};let t=[];for(let o=0;o<e.length;o++){let r=e[o],i=n[o],s=Hr(r,i);if(!s.valid)return{valid:!1,mergeErrorPath:[o,...s.mergeErrorPath]};t.push(s.data)}return{valid:!0,data:t}}return{valid:!1,mergeErrorPath:[]}}function ya(e,n,t){let o=new Map,r,i=new Map,s=(u,d)=>{let m;if(u.code==="unrecognized_keys"&&!u.path?.length)r??(r=u),m=u.keys;else if(u.code==="invalid_key"&&u.origin==="record"&&u.path?.length===1){let f=String(u.path[0]);i.has(f)||i.set(f,u),m=[f]}else return!1;for(let f of m)o.has(f)||o.set(f,{}),o.get(f)[d]=!0;return!0};for(let u of n.issues)s(u,"l")||e.issues.push(u);for(let u of t.issues)s(u,"r")||e.issues.push(u);let c=[...o].filter(([,u])=>u.l&&u.r).map(([u])=>u);if(c.length){let u=r?c.filter(d=>r.keys.includes(d)):[];u.length&&e.issues.push({...r,keys:u});for(let d of c)!u.includes(d)&&i.has(d)&&e.issues.push(i.get(d))}let l=Hr(n.value,t.value);if(!l.valid){if(_n(e))return e;throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(l.mergeErrorPath)}`)}return e.value=l.data,e}var ul=$("$ZodRecord",(e,n)=>{ke.init(e,n);let t=rn.memoizer;t?.attach(e),e._zod.parse=(o,r)=>{let i=o.value;if(!Hn(i))return o.issues.push({expected:"record",code:"invalid_type",input:i,inst:e}),o;let s=[],c=n.keyType._zod.values;if(c&&!n.partial){o.value=t?t.alloc(e,o,{},r):{};let l=new Set;for(let d of c)if(typeof d=="string"||typeof d=="number"||typeof d=="symbol"){if(l.add(typeof d=="number"?d.toString():d),d==="__proto__")continue;let m=n.keyType._zod.run({value:d,issues:[]},r);if(m instanceof Promise)throw new Error("Async schemas not supported in object keys currently");if(m.issues.length){o.issues.push({code:"invalid_key",origin:"record",issues:m.issues.map(b=>kn(b,r,un())),input:d,path:[d],inst:e});continue}let f=m.value;if(f==="__proto__")continue;let p=n.valueType._zod.run({value:i[d],issues:[]},r);p instanceof Promise?s.push(p.then(b=>{b.issues.length&&o.issues.push(...$n(d,b.issues)),o.value[f]=b.value})):(p.issues.length&&o.issues.push(...$n(d,p.issues)),o.value[f]=p.value)}let u;for(let d in i)if(!l.has(d))if(n.mode==="loose"){if(d==="__proto__")continue;o.value[d]=i[d]}else u=u??[],u.push(d);u&&u.length>0&&o.issues.push({code:"unrecognized_keys",input:i,inst:e,keys:u,continue:!0})}else{o.value=t?t.alloc(e,o,{},r):{};let l;for(let u of Reflect.ownKeys(i)){if(u==="__proto__"||!Object.prototype.propertyIsEnumerable.call(i,u))continue;let d=n.keyType._zod.run({value:u,issues:[]},r);if(d instanceof Promise)throw new Error("Async schemas not supported in object keys currently");if(typeof u=="string"&&Ht.test(u)&&d.issues.length){let b=n.keyType._zod.run({value:Number(u),issues:[]},r);if(b instanceof Promise)throw new Error("Async schemas not supported in object keys currently");b.issues.length===0&&(d=b)}if(d.issues.length){n.mode==="loose"?o.value[u]=i[u]:c?(l=l??[],l.push(u)):o.issues.push({code:"invalid_key",origin:"record",issues:d.issues.map(b=>kn(b,r,un())),input:u,path:[u],inst:e});continue}let f=d.value;if(f==="__proto__")continue;let p=n.valueType._zod.run({value:i[u],issues:[]},r);p instanceof Promise?s.push(p.then(b=>{b.issues.length&&o.issues.push(...$n(u,b.issues)),o.value[f]=b.value})):(p.issues.length&&o.issues.push(...$n(u,p.issues)),o.value[f]=p.value)}l&&l.length>0&&o.issues.push({code:"unrecognized_keys",input:i,inst:e,keys:l,continue:!0})}return s.length?Promise.all(s).then(()=>o):o}});var dl=$("$ZodEnum",(e,n)=>{ke.init(e,n);let t=ht(n.entries),o=new Set(t);e._zod.values=o,fe(e,"pattern",r=>{let i=ht(r.def.entries).filter(s=>Ar.has(typeof s));return new RegExp(i.length?`^(${i.map(s=>Gn(s.toString())).join("|")})$`:"^[^\\s\\S]$")}),e._zod.parse=(r,i)=>{let s=r.value;return o.has(s)||r.issues.push({code:"invalid_value",values:t,input:s,inst:e}),r}}),pl=$("$ZodLiteral",(e,n)=>{ke.init(e,n);let t=new Set(n.values);e._zod.values=t,fe(e,"pattern",o=>{let r=o.def.values;return new RegExp(r.length?`^(${r.map(i=>typeof i=="string"?Gn(i):i?Gn(i.toString()):String(i)).join("|")})$`:"^[^\\s\\S]$")}),e._zod.parse=(o,r)=>{let i=o.value;return t.has(i)||o.issues.push({code:"invalid_value",values:n.values,input:i,inst:e}),o}});var ml=$("$ZodTransform",(e,n)=>{ke.init(e,n),e._zod.optin="optional",rn.memoizer?.guard(e),e._zod.parse=(t,o)=>{if(o.direction==="backward")throw new wt(e.constructor.name);let r=n.transform(t.value,t);if(o.async)return(r instanceof Promise?r:Promise.resolve(r)).then(s=>(t.value=s,t));if(r instanceof Promise)throw new Pn;return t.value=r,t}});function ba(e,n){return e.value=n.issues.length?void 0:n.value,e}var Yr=$("$ZodOptional",(e,n)=>{ke.init(e,n),fe(e,"optin",t=>t.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),e._zod.optout="optional",fe(e,"values",t=>{let o=t.def.innerType._zod.values;return o?new Set([...o,void 0]):void 0}),fe(e,"pattern",t=>{let o=t.def.innerType._zod.pattern;return o?new RegExp(`^(${Zt(o.source)})?$`):void 0}),e._zod.parse=(t,o)=>{if(t.value===void 0){if(n.innerType._zod.optin!=="defaulted")return t;let r=n.innerType._zod.run({value:t.value,issues:[]},o);return r instanceof Promise?r.then(i=>ba(t,i)):ba(t,r)}return n.innerType._zod.run(t,o)}}),fl=$("$ZodExactOptional",(e,n)=>{Yr.init(e,n),fe(e,"values",t=>t.def.innerType._zod.values),fe(e,"pattern",t=>t.def.innerType._zod.pattern),e._zod.parse=(t,o)=>n.innerType._zod.run(t,o)}),hl=$("$ZodNullable",(e,n)=>{ke.init(e,n),fe(e,"optin",t=>t.def.innerType._zod.optin),fe(e,"optout",t=>t.def.innerType._zod.optout),fe(e,"pattern",t=>{let o=t.def.innerType._zod.pattern;return o?new RegExp(`^(${Zt(o.source)}|null)$`):void 0}),fe(e,"values",t=>t.def.innerType._zod.values?new Set([...t.def.innerType._zod.values,null]):void 0),e._zod.parse=(t,o)=>t.value===null?t:n.innerType._zod.run(t,o)}),gl=$("$ZodDefault",(e,n)=>{ke.init(e,n),e._zod.optin="defaulted",fe(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,o)=>{if(o.direction==="backward")return n.innerType._zod.run(t,o);if(t.value===void 0)return t.value=n.defaultValue,t;let r=n.innerType._zod.run(t,o);return r instanceof Promise?r.then(i=>wa(i,n)):wa(r,n)}});function wa(e,n){return e.value===void 0&&(e.value=n.defaultValue),e}var vl=$("$ZodPrefault",(e,n)=>{ke.init(e,n),e._zod.optin="defaulted",fe(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,o)=>(o.direction==="backward"||t.value===void 0&&(t.value=n.defaultValue),n.innerType._zod.run(t,o))}),yl=$("$ZodNonOptional",(e,n)=>{ke.init(e,n),fe(e,"values",t=>{let o=t.def.innerType._zod.values;return o?new Set([...o].filter(r=>r!==void 0)):void 0}),e._zod.parse=(t,o)=>{let r=n.innerType._zod.run(t,o);return r instanceof Promise?r.then(i=>xa(i,e)):xa(r,e)}});function xa(e,n){return!e.issues.length&&e.value===void 0&&e.issues.push({code:"invalid_type",expected:"nonoptional",input:e.value,inst:n}),e}function _a(e,n,t,o){return n.issues.length?(e.value=t.catchValue({...n,value:e.value,error:{issues:n.issues.map(r=>kn(r,o,un()))},input:e.value}),e):(e.value=n.value,n.memo&&(e.memo=!0),e)}var bl=$("$ZodCatch",(e,n)=>{ke.init(e,n),fe(e,"optin",t=>t.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),fe(e,"optout",t=>t.def.innerType._zod.optout),fe(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,o)=>{if(o.direction==="backward")return n.innerType._zod.run(t,o);let r=n.innerType._zod.run({value:t.value,issues:[]},o);return r instanceof Promise?r.then(i=>_a(t,i,n,o)):_a(t,r,n,o)}});var wl=$("$ZodPipe",(e,n)=>{ke.init(e,n),fe(e,"values",t=>t.def.in._zod.values),fe(e,"optin",t=>t.def.in._zod.optin),fe(e,"optout",t=>t.def.out._zod.optout),fe(e,"propValues",t=>t.def.in._zod.propValues),e._zod.parse=(t,o)=>{if(o.direction==="backward"){let i=n.out._zod.run(t,o);return i instanceof Promise?i.then(s=>Bo(s,n.in,o)):Bo(i,n.in,o)}let r=n.in._zod.run(t,o);return r instanceof Promise?r.then(i=>Bo(i,n.out,o)):Bo(r,n.out,o)}});function Bo(e,n,t){return e.issues.some(o=>o.code!=="unrecognized_keys")?(e.aborted=!0,e):n._zod.run({value:e.value,issues:e.issues},t)}var xl=$("$ZodReadonly",(e,n)=>{ke.init(e,n),fe(e,"propValues",t=>t.def.innerType._zod.propValues),fe(e,"values",t=>t.def.innerType._zod.values),fe(e,"optin",t=>t.def.innerType?._zod?.optin),fe(e,"optout",t=>t.def.innerType?._zod?.optout),e._zod.parse=(t,o)=>{if(o.direction==="backward")return n.innerType._zod.run(t,o);let r=n.innerType._zod.run(t,o);return r instanceof Promise?r.then(ka):ka(r)}});function ka(e){return e.memo||(e.value=Object.freeze(e.value)),e}var _l=$("$ZodLazy",(e,n)=>{ke.init(e,n),Lr(e._zod,"innerType",()=>{let t=n;return t._cachedInner||(t._cachedInner=n.getter()),t._cachedInner}),fe(e,"pattern",t=>t.innerType?._zod?.pattern),fe(e,"propValues",t=>t.innerType?._zod?.propValues),fe(e,"optin",t=>t.innerType?._zod?.optin??void 0),fe(e,"optout",t=>t.innerType?._zod?.optout??void 0),e._zod.parse=(t,o)=>e._zod.innerType._zod.run(t,o)}),kl=$("$ZodCustom",(e,n)=>{je.init(e,n),ke.init(e,n),e._zod.parse=(t,o)=>t,e._zod.check=t=>{let o=t.value,r=n.fn(o);if(r instanceof Promise)return r.then(i=>Pa(i,t,o,e));Pa(r,t,o,e)}});function Pa(e,n,t,o){if(!e){let r={code:"custom",input:t,inst:o,path:[...o._zod.def.path??[]],continue:!o._zod.def.abort};o._zod.def.params&&(r.params=o._zod.def.params),n.issues.push(bt(r))}}var ei=class extends Error{constructor(){super("Cannot parse a reference cycle that closes through a transform"),this.name="ZodCyclicError"}},ni="~memo",Pl=[];function Sl(e){return e!==null&&typeof e=="object"}function Qr(e){return e.map(n=>n.path?{...n,path:n.path.slice()}:{...n})}var Tl=new WeakMap,Kt=0,Uo=1,Jt=2;function qo(e,n,t){let o=Tl.get(e);if(o!==void 0)return o?Jt:Kt;if(n.has(e))return Jt;n.add(e);let r=Kt,i=d=>{if(r!==Jt&&d?._zod){let m=qo(d,n,t);m>r&&(r=m)}},s=(d,m)=>{let f=Kt;for(let p of Reflect.ownKeys(d)){let b=Object.getOwnPropertyDescriptor(d,p);if(m&&!b.enumerable)continue;let v=b.get?Uo:b.value?._zod?qo(b.value,n,t):Kt;v>f&&(f=v)}return f},c=d=>{d>r&&(r=d)},l=e._zod.def,u=l.type;switch(u){case"object":{let d=yt(l);c(d?s(d,!0):Uo),i(l.catchall);break}case"array":i(l.element);break;case"tuple":for(let d of l.items)i(d);i(l.rest);break;case"record":case"map":i(l.keyType),i(l.valueType);break;case"set":i(l.valueType);break;case"union":for(let d of l.options)i(d);break;case"intersection":i(l.left),i(l.right);break;case"optional":case"nullable":case"default":case"prefault":case"catch":case"readonly":case"nonoptional":case"promise":case"success":i(l.innerType);break;case"pipe":i(l.in),i(l.out);break;case"function":i(l.input),i(l.output);break;case"lazy":{let d=l._cachedInner??(t?e._zod.innerType:void 0);c(d?qo(d,n,!1):Uo);break}case"template_literal":case"string":case"number":case"int":case"boolean":case"bigint":case"symbol":case"undefined":case"null":case"void":case"never":case"any":case"unknown":case"date":case"nan":case"enum":case"literal":case"file":case"transform":case"custom":break;default:for(let d in l){let m=Object.getOwnPropertyDescriptor(l,d);if(!m||m.get)continue;let f=m.value;if(!(!f||typeof f!="object")){if(f._zod)i(f);else if(Array.isArray(f))for(let p of f)i(p)}}}return n.delete(e),um(e,r)}function um(e,n){return n!==Uo&&Tl.set(e,n===Jt),n}function dm(e,n){let t=e.buckets.get(n);return t||(t=new WeakMap,e.buckets.set(n,t)),t}var Zo,Fo=[],pm={alloc(e,n,t){let o=Zo;if(!o)return t;Zo=void 0;let r={value:t,issues:null};return o.set(n.value,r),Fo.push(r),t},guard(e){var n;(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred.push(()=>{let t=e._zod.parse,o=(r,i)=>{if(i.direction!=="backward"&&mm(i,r.value))throw new ei;return t(r,i)};e._zod.parse=o,e._zod.run===t&&(e._zod.run=o)})},attach(e){var n;let t,o=!1,r,i;(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred.push(()=>{let s=e._zod.parse,c=(l,u)=>{if(t===void 0){let x=qo(e,new Set,!1);if(x===Kt)return e._zod.parse=s,e._zod.run===c&&(e._zod.run=s),s(l,u);x===Jt||o?t=!0:o=!0}let d=l.value;if(!Sl(d))return s(l,u);let m=u[ni];m||(m={buckets:new WeakMap,backEdges:void 0},u[ni]=m);let f;r===u?f=i:(f=dm(m,e),r=u,i=f);let p=f.get(d);if(p)return l.value=p.value,p.issues?p.issues.length&&l.issues.push(...Qr(p.issues)):(l.memo=!0,m.backEdges??(m.backEdges=new WeakSet),m.backEdges.add(p.value)),l;Zo=f;let b=Fo.length,v=s(l,u);Zo=void 0;let y=Fo.length>b?Fo.pop():void 0;return v instanceof Promise?v.then(x=>(y&&(y.issues=x.issues.length?Qr(x.issues):Pl),x)):(y&&(y.issues=v.issues.length?Qr(v.issues):Pl),v)};e._zod.parse=c,e._zod.run===s&&(e._zod.run=c)})}};function Ll(){return pm}function mm(e,n){let t=e[ni]?.backEdges;return t!==void 0&&Sl(n)&&t.has(n)}var fm=()=>{let e={string:{unit:"characters",verb:"to have"},file:{unit:"bytes",verb:"to have"},array:{unit:"items",verb:"to have"},set:{unit:"items",verb:"to have"},map:{unit:"entries",verb:"to have"}};function n(i){return e[i]??null}let t={regex:"input",email:"email address",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO datetime",date:"ISO date",time:"ISO time",duration:"ISO duration",ipv4:"IPv4 address",ipv6:"IPv6 address",mac:"MAC address",cidrv4:"IPv4 range",cidrv6:"IPv6 range",base64:"base64-encoded string",base64url:"base64url-encoded string",json_string:"JSON string",e164:"E.164 number",currency_code:"currency code",credit_card:"credit card number",iban:"IBAN",jwt:"JWT",template_literal:"input"},o={nan:"NaN"};function r(i,s){return i==="number"&&typeof s=="number"&&!Number.isFinite(s)?String(s):o[i]??i}return i=>{switch(i.code){case"invalid_type":{let s=r(i.expected),c=Gr(i.input),l=r(c,i.input);return`Invalid input: expected ${s}, received ${l}`}case"invalid_value":return i.values.length===1?`Invalid input: expected ${So(i.values[0])}`:`Invalid option: expected one of ${ko(i.values,"|")}`;case"too_big":{let s=i.exact?"exactly ":i.inclusive?"<=":"<",c=n(i.origin);return c?`Too big: expected ${i.origin??"value"} to have ${s}${i.maximum.toString()} ${c.unit??"elements"}`:`Too big: expected ${i.origin??"value"} to be ${s}${i.maximum.toString()}`}case"too_small":{let s=i.exact?"exactly ":i.inclusive?">=":">",c=n(i.origin);return c?`Too small: expected ${i.origin} to have ${s}${i.minimum.toString()} ${c.unit}`:`Too small: expected ${i.origin} to be ${s}${i.minimum.toString()}`}case"invalid_format":{let s=i;return s.format==="starts_with"?`Invalid string: must start with "${s.prefix}"`:s.format==="ends_with"?`Invalid string: must end with "${s.suffix}"`:s.format==="includes"?`Invalid string: must include "${s.includes}"`:s.format==="regex"?`Invalid string: must match pattern ${s.pattern}`:`Invalid ${t[s.format]??i.format}`}case"not_multiple_of":return`Invalid number: must be a multiple of ${i.divisor}`;case"unrecognized_keys":return`Unrecognized key${i.keys.length>1?"s":""}: ${ko(i.keys,", ")}`;case"invalid_key":return`Invalid key in ${i.origin}`;case"invalid_union":return i.options&&Array.isArray(i.options)&&i.options.length>0?`Invalid discriminator value. Expected ${i.options.map(c=>`'${c}'`).join(" | ")}`:i.inclusive===!1?"Invalid input: more than one option matched":"Invalid input";case"invalid_element":return`Invalid value in ${i.origin}`;default:return"Invalid input"}}};function zl(){return{localeError:fm()}}var Cl;var ti=class{constructor(){this._map=new WeakMap,this._idmap=new Map}add(n,...t){let o=t[0];return this._map.set(n,o),o&&typeof o=="object"&&"id"in o&&this._idmap.set(o.id,n),this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(n){let t=this._map.get(n);return t&&typeof t=="object"&&"id"in t&&this._idmap.delete(t.id),this._map.delete(n),this}get(n){let t=n._zod.parent;if(t){let o={...this.get(t)??{}};delete o.id;let r={...o,...this._map.get(n)};return Object.keys(r).length?r:void 0}return this._map.get(n)}has(n){return this._map.has(n)}};function hm(){return new ti}(Cl=globalThis).__zod_globalRegistry??(Cl.__zod_globalRegistry=hm());var it=globalThis.__zod_globalRegistry;function Nl(e){return e.checks&&(e.checks=[...e.checks]),e}function Al(e,n){return new e(Nl({type:"string",...oe(n)}))}function El(e,n){return new e({type:"string",format:"email",check:"string_format",abort:!1,...oe(n)})}function Il(e,n){return new e({type:"string",format:"guid",check:"string_format",abort:!1,...oe(n)})}function Gl(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,...oe(n)})}function $l(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v4",...oe(n)})}function Ol(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v6",...oe(n)})}function Bl(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v7",...oe(n)})}function Rl(e,n){return new e({type:"string",format:"url",check:"string_format",abort:!1,...oe(n)})}function Xl(e,n){return new e({type:"string",format:"emoji",check:"string_format",abort:!1,...oe(n)})}function Dl(e,n){return new e({type:"string",format:"nanoid",check:"string_format",abort:!1,...oe(n)})}function Ml(e,n){return new e({type:"string",format:"cuid",check:"string_format",abort:!1,...oe(n)})}function Zl(e,n){return new e({type:"string",format:"cuid2",check:"string_format",abort:!1,...oe(n)})}function Fl(e,n){return new e({type:"string",format:"ulid",check:"string_format",abort:!1,...oe(n)})}function Ul(e,n){return new e({type:"string",format:"xid",check:"string_format",abort:!1,...oe(n)})}function ql(e,n){return new e({type:"string",format:"ksuid",check:"string_format",abort:!1,...oe(n)})}function Vl(e,n){return new e({type:"string",format:"ipv4",check:"string_format",abort:!1,...oe(n)})}function Hl(e,n){return new e({type:"string",format:"ipv6",check:"string_format",abort:!1,...oe(n)})}function jl(e,n){return new e({type:"string",format:"cidrv4",check:"string_format",abort:!1,...oe(n)})}function Wl(e,n){return new e({type:"string",format:"cidrv6",check:"string_format",abort:!1,...oe(n)})}function Kl(e,n){return new e({type:"string",format:"base64",check:"string_format",abort:!1,...oe(n)})}function Jl(e,n){return new e({type:"string",format:"base64url",check:"string_format",abort:!1,...oe(n)})}function Yl(e,n){return new e({type:"string",format:"e164",check:"string_format",abort:!1,...oe(n)})}function Ql(e,n){return new e({type:"string",format:"jwt",check:"string_format",abort:!1,...oe(n)})}function ec(e,n){return new e({type:"string",format:"datetime",check:"string_format",offset:!1,local:!1,precision:null,...oe(n)})}function nc(e,n){return new e({type:"string",format:"date",check:"string_format",...oe(n)})}function tc(e,n){return new e({type:"string",format:"time",check:"string_format",precision:null,...oe(n)})}function oc(e,n){return new e({type:"string",format:"duration",check:"string_format",...oe(n)})}function rc(e,n){return new e(Nl({type:"number",checks:[],...oe(n)}))}function ic(e,n){return new e({type:"number",check:"number_format",abort:!1,format:"safeint",...oe(n)})}function sc(e,n){return new e({type:"boolean",...oe(n)})}function ac(e,n){return new e({type:"null",...oe(n)})}function lc(e){return new e({type:"unknown"})}function cc(e,n){return new e({type:"never",...oe(n)})}function Vo(e,n){return new qr({check:"less_than",...oe(n),value:e,inclusive:!1})}function Yt(e,n){return new qr({check:"less_than",...oe(n),value:e,inclusive:!0})}function Ho(e,n){return new Vr({check:"greater_than",...oe(n),value:e,inclusive:!1})}function Qt(e,n){return new Vr({check:"greater_than",...oe(n),value:e,inclusive:!0})}function jo(e,n){return new na({check:"multiple_of",...oe(n),value:e})}function Wo(e,n){return new oa({check:"max_length",...oe(n),maximum:e})}function xt(e,n){return new ra({check:"min_length",...oe(n),minimum:e})}function Ko(e,n){return new ia({check:"length_equals",...oe(n),length:e})}function oi(e,n){return new sa({check:"string_format",format:"regex",...oe(n),pattern:e})}function ri(e){return new aa({check:"string_format",format:"lowercase",...oe(e)})}function ii(e){return new la({check:"string_format",format:"uppercase",...oe(e)})}function si(e,n){return new ca({check:"string_format",format:"includes",...oe(n),includes:e})}function ai(e,n){return new ua({check:"string_format",format:"starts_with",...oe(n),prefix:e})}function li(e,n){return new da({check:"string_format",format:"ends_with",...oe(n),suffix:e})}function jn(e){return new pa({check:"overwrite",tx:e})}function ci(e){return jn(n=>n.normalize(e))}function ui(){return jn(e=>e.trim())}function di(){return jn(e=>e.toLowerCase())}function pi(){return jn(e=>e.toUpperCase())}function mi(){return jn(e=>Cr(e))}function uc(e,n,t){return new e({type:"array",element:n,...oe(t)})}function dc(e,n,t){return new e({type:"custom",check:"custom",fn:n,...oe(t)})}function pc(e,n){let t=gm(o=>(o.addIssue=r=>{if(typeof r=="string")o.issues.push(bt(r,o.value,t._zod.def));else{let i=r;i.fatal&&(i.continue=!1),i.code??(i.code="custom"),"input"in i||(i.input=o.value),i.inst??(i.inst=t),i.continue??(i.continue=!t._zod.def.abort),o.issues.push(bt(i))}},e(o.value,o)),n);return t}function gm(e,n){let t=new je({check:"custom",...oe(n)});return t._zod.check=e,t}function eo(e,...n){for(let t of n)for(let o of Reflect.ownKeys(t))Object.prototype.propertyIsEnumerable.call(t,o)&&cn(e,o,t[o]);return e}function hi(e){let n=e?.target??"draft-2020-12";return n==="draft-4"&&(n="draft-04"),n==="draft-7"&&(n="draft-07"),{processors:e.processors??{},metadataRegistry:e?.metadata??it,target:n,unrepresentable:e?.unrepresentable??"throw",override:e?.override??(()=>{}),io:e?.io??"output",counter:0,seen:new Map,sharedDefsExtractedFor:void 0,sharedEmitDoneFor:void 0,cycles:e?.cycles??"ref",reused:e?.reused??"inline",intersections:[],deferred:[],external:e?.external??void 0}}function On(e,n,t,o,r){let i=typeof n.unrepresentable=="function"?n.unrepresentable({zodSchema:e,path:o.path,message:r}):n.unrepresentable;if(i==="any")return!1;if(i===void 0||i==="throw")throw new Error(r);return Object.assign(t,i),!0}function Ie(e,n,t={path:[],schemaPath:[]}){var o;let r=e._zod.def,i=n.seen.get(e);if(i)return i.count++,t.schemaPath.includes(e)&&(i.cycle=t.path),i.schema;let s={schema:{},count:1,cycle:void 0,path:t.path};n.seen.set(e,s),n.sharedDefsExtractedFor=void 0,n.sharedEmitDoneFor=void 0;let c=e._zod.toJSONSchema?.();if(c)s.schema=c;else{let d={...t,schemaPath:[...t.schemaPath,e],path:t.path};if(e._zod.processJSONSchema)e._zod.processJSONSchema(n,s.schema,d);else{let f=s.schema,p=n.processors[r.type];if(!p)throw new Error(`[toJSONSchema]: Non-representable type encountered: ${r.type}`);p(e,n,f,d)}let m=e._zod.parent;m&&(s.ref||(s.ref=m),Ie(m,n,d),n.seen.get(m).isParent=!0)}let l=n.metadataRegistry.get(e);return l&&eo(s.schema,l),n.io==="input"&&nn(e)&&(delete s.schema.examples,delete s.schema.default),n.io==="input"&&"_prefault"in s.schema&&((o=s.schema).default??(o.default=s.schema._prefault)),delete s.schema._prefault,n.seen.get(e).schema}function mc(e){return e.replace(/~/g,"~0").replace(/\//g,"~1")}function gi(e,n){let t=e.seen.get(n);if(!t)throw new Error("Unprocessed schema. This is a bug in Zod.");if(e.external&&e.sharedDefsExtractedFor===e.external)return;let o=new Map;for(let s of e.seen.entries()){let c=e.metadataRegistry.get(s[0])?.id;if(c){let l=o.get(c);if(l&&l!==s[0])throw new Error(`Duplicate schema id "${c}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);o.set(c,s[0])}}let r=s=>{let c=e.target==="draft-2020-12"?"$defs":"definitions";if(e.external){let m=e.external.registry.get(s[0])?.id,f=e.external.uri??(b=>b);if(m)return{ref:f(m)};let p=s[1].defId??s[1].schema.id??`schema${e.counter++}`;return s[1].defId=p,{defId:p,ref:`${f("__shared")}#/${c}/${mc(p)}`}}let l="#",u=`${l}/${c}/`;if(s[1]===t&&!s[1].schema.id)return{ref:l};let d=s[1].schema.id??`__schema${e.counter++}`;return{defId:d,ref:u+mc(d)}},i=s=>{if(s[1].schema.$ref)return;let c=s[1],{ref:l,defId:u}=r(s);c.def={...c.schema},u&&(c.defId=u);let d=c.schema;for(let m in d)delete d[m];d.$ref=l};if(e.cycles==="throw")for(let s of e.seen.entries()){let c=s[1];if(c.cycle)throw new Error(`Cycle detected: #/${c.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`)}for(let s of e.seen.entries()){let c=s[1];if(n===s[0]){i(s);continue}if(e.external){let u=e.external.registry.get(s[0])?.id;if(n!==s[0]&&u){i(s);continue}}if(e.metadataRegistry.get(s[0])?.id){i(s);continue}if(c.cycle){i(s);continue}c.count>1&&e.reused==="ref"&&i(s)}e.external&&(e.sharedDefsExtractedFor=e.external)}function gc(e){let n=e.anyOf;if(!Array.isArray(n)||n.length===0||e.type!==void 0)return;let t=[];for(let o of n){if(!o||typeof o!="object")return;gc(o);let r=Object.keys(o);if(r.length!==1||r[0]!=="type")return;let i=o.type;for(let s of Array.isArray(i)?i:[i]){if(typeof s!="string")return;t.includes(s)||t.push(s)}}delete e.anyOf,e.type=t.length===1?t[0]:t}var vc=new Set(["type","properties","required","additionalProperties"]),fc=["oneOf","anyOf"];function hc(e){let n=e.additionalProperties;return n===void 0||n===!1||typeof n!="object"||n===null?null:Object.keys(n).length?n:null}function fi(e){let n=[];for(let i of e){if(typeof i!="object"||i.type!=="object")return null;for(let s in i)if(!vc.has(s))return null;n.push(i)}let t={},o=new Set;for(let i of n){for(let s in i.properties){if(Object.prototype.hasOwnProperty.call(t,s))continue;let c=[];for(let u of n){let d=u.properties?.[s]??hc(u);d!=null&&(c.some(m=>JSON.stringify(m)===JSON.stringify(d))||c.push(d))}let l=c.length===1?c[0]:fi(c)??{allOf:c};cn(t,s,l)}for(let s of i.required??[])o.add(s)}let r={type:"object",properties:t};if(o.size&&(r.required=[...o]),n.every(i=>i.additionalProperties===!1))r.additionalProperties=!1;else{let i=[];for(let s of n){let c=hc(s);c&&!i.some(l=>JSON.stringify(l)===JSON.stringify(c))&&i.push(c)}i.length===1?r.additionalProperties=i[0]:i.length>1&&(r.additionalProperties={allOf:i})}return r}function vm(e){let n=e.allOf;if(!Array.isArray(n)||n.length<2)return;for(let r of vc)if(r in e)return;let t=n.filter(r=>fc.some(i=>Array.isArray(r[i]))),o=null;if(!t.length)o=fi(n);else{let r=t[0],i=fc.find(l=>Array.isArray(r[l]));if(Object.keys(r).length!==1)return;let s=n.filter(l=>l!==r),c=r[i].map(l=>fi([...s,l]));if(c.some(l=>!l))return;o={[i]:c}}o&&(delete e.allOf,eo(e,o))}function vi(e,n){let t=e.seen.get(n);if(!t)throw new Error("Unprocessed schema. This is a bug in Zod.");let o=c=>{let l=e.seen.get(c);if(l.ref===null)return;let u=l.def??l.schema,d={...u},m=l.ref;if(l.ref=null,m){o(m);let p=e.seen.get(m),b=p.schema;if(b.$ref&&(e.target==="draft-07"||e.target==="draft-04"||e.target==="openapi-3.0")?(u.allOf=u.allOf??[],u.allOf.push(b)):eo(u,b),eo(u,d),c._zod.parent===m)for(let y in u)y==="$ref"||y==="allOf"||y in d||delete u[y];if(b.$ref&&p.def)for(let y in u)y==="$ref"||y==="allOf"||y in p.def&&JSON.stringify(u[y])===JSON.stringify(p.def[y])&&delete u[y]}let f=c._zod.parent;if(f&&f!==m){o(f);let p=e.seen.get(f);if(p?.schema.$ref&&(u.$ref=p.schema.$ref,p.def))for(let b in u)b==="$ref"||b==="allOf"||b in p.def&&JSON.stringify(u[b])===JSON.stringify(p.def[b])&&delete u[b]}e.override({zodSchema:c,jsonSchema:u,path:l.path??[]})};if(!e.external||e.sharedEmitDoneFor!==e.external){for(let c of[...e.seen.entries()].reverse())o(c[0]);if(e.target!=="openapi-3.0")for(let c of e.seen.entries())gc(c[1].def??c[1].schema);for(let c of e.deferred)c();if(e.intersections.length){let c=new Map;for(let l of e.seen.values())for(let u of[l.schema,l.def]){let d=u?.allOf;if(!Array.isArray(d))continue;let m=c.get(d);m?m.push(u):c.set(d,[u])}for(let l of e.intersections)for(let u of c.get(l)??[])vm(u)}}let r={};if(e.target==="draft-2020-12"?r.$schema="https://json-schema.org/draft/2020-12/schema":e.target==="draft-07"?r.$schema="http://json-schema.org/draft-07/schema#":e.target==="draft-04"?r.$schema="http://json-schema.org/draft-04/schema#":e.target,e.external?.uri){let c=e.external.registry.get(n)?.id;if(!c)throw new Error("Schema is missing an `id` property");r.$id=e.external.uri(c)}eo(r,t.defId?t.schema:t.def??t.schema);let i=e.metadataRegistry.get(n)?.id;i!==void 0&&r.id===i&&delete r.id;let s=e.external?.defs??{};if(!e.external||e.sharedEmitDoneFor!==e.external)for(let c of e.seen.entries()){let l=c[1];l.def&&l.defId&&(l.def.id===l.defId&&delete l.def.id,cn(s,l.defId,l.def))}e.external&&(e.sharedEmitDoneFor=e.external),e.external||Object.keys(s).length>0&&(e.target==="draft-2020-12"?r.$defs=s:r.definitions=s);try{let c=JSON.parse(JSON.stringify(r));return Object.defineProperty(c,"~standard",{value:{...n["~standard"],jsonSchema:{input:no(n,"input",e.processors),output:no(n,"output",e.processors)}},enumerable:!1,writable:!1}),c}catch{throw new Error("Error converting schema to JSON.")}}function nn(e,n){let t=n??{seen:new Set};if(t.seen.has(e))return!1;t.seen.add(e);let o=e._zod.def;if(o.type==="transform")return!0;if(o.type==="array")return nn(o.element,t);if(o.type==="set")return nn(o.valueType,t);if(o.type==="lazy")return nn(o.getter(),t);if(o.type==="promise"||o.type==="optional"||o.type==="nonoptional"||o.type==="nullable"||o.type==="readonly"||o.type==="default"||o.type==="prefault"||o.type==="catch")return nn(o.innerType,t);if(o.type==="intersection")return nn(o.left,t)||nn(o.right,t);if(o.type==="record"||o.type==="map")return nn(o.keyType,t)||nn(o.valueType,t);if(o.type==="pipe")return e._zod.traits.has("$ZodCodec")?!0:nn(o.in,t)||nn(o.out,t);if(o.type==="object"){for(let r in o.shape)if(nn(o.shape[r],t))return!0;return!1}if(o.type==="union"){for(let r of o.options)if(nn(r,t))return!0;return!1}if(o.type==="tuple"){for(let r of o.items)if(nn(r,t))return!0;return!!(o.rest&&nn(o.rest,t))}return!1}var yc=(e,n={})=>t=>{let o=hi({...t,processors:n});return Ie(e,o),gi(o,e),vi(o,e)},no=(e,n,t={})=>o=>{let{libraryOptions:r,target:i}=o??{},s=hi({...r??{},target:i,io:n,processors:t});return Ie(e,s),gi(s,e),vi(s,e)};var _t=(e,n,t)=>{(e[n]===void 0||t>e[n])&&(e[n]=t)},kt=(e,n,t)=>{(e[n]===void 0||t<e[n])&&(e[n]=t)},bc=(e,n)=>{_t(e,"minimum",n),kt(e,"maximum",n)},kc=(e,n)=>{e.multipleOf??(e.multipleOf=[]),e.multipleOf.includes(n)||e.multipleOf.push(n)},Pc=(e,n)=>{e.patterns??(e.patterns=new Set),e.patterns.add(n)},Sc=(e,n)=>{e.mime=e.mime?e.mime.filter(t=>n.includes(t)):[...n]},Tc=(e,n)=>{e.format=n,n.includes("int")&&(e.isInt=!0)},wc=(e,n)=>_t(e,"minimum",n.minimum),xc=(e,n)=>kt(e,"maximum",n.maximum),_c=e=>(n,t)=>{Tc(n,t.format);let[o,r]=e[t.format];_t(n,"minimum",o),kt(n,"maximum",r)},ym={greater_than:(e,n)=>_t(e,n.inclusive?"minimum":"exclusiveMinimum",n.value),less_than:(e,n)=>kt(e,n.inclusive?"maximum":"exclusiveMaximum",n.value),multiple_of:(e,n)=>kc(e,n.value),number_format:_c(Ft),bigint_format:_c(To),min_length:wc,max_length:xc,length_equals:(e,n)=>bc(e,n.length),min_size:wc,max_size:xc,size_equals:(e,n)=>bc(e,n.size),string_format:(e,n)=>{Tc(e,n.format),n.pattern&&Pc(e,n.pattern),(n.format==="base64"||n.format==="base64url")&&(e.contentEncoding=n.format),(n.local||n.precision===-1)&&(e.laxFormat=!0)},mime_type:(e,n)=>Sc(e,n.mime)};function gn(e){let n={},t=e._zod.def,o=e._zod.traits.has("$ZodCheck")?[e,...t.checks??[]]:t.checks??[];for(let i of o)ym[i._zod.def.check]?.(n,i._zod.def);let r=e._zod.bag;r.minimum!==void 0&&_t(n,"minimum",r.minimum),r.exclusiveMinimum!==void 0&&_t(n,"exclusiveMinimum",r.exclusiveMinimum),r.maximum!==void 0&&kt(n,"maximum",r.maximum),r.exclusiveMaximum!==void 0&&kt(n,"exclusiveMaximum",r.exclusiveMaximum),r.multipleOf!==void 0&&kc(n,r.multipleOf),r.format!==void 0&&(n.format??(n.format=r.format),r.format.includes("int")&&(n.isInt=!0)),r.mime&&Sc(n,r.mime);for(let i of r.patterns??[])Pc(n,i);return n}var bm={guid:"uuid",url:"uri",datetime:"date-time",json_string:"json-string",regex:""},wm=new Map([[Wr,Zs],[Mo,Fs]]),Lc=e=>wm.get(e)??e,zc=(e,n,t,o)=>{let r=t;r.type="string";let{minimum:i,maximum:s,format:c,patterns:l,contentEncoding:u,laxFormat:d}=gn(e);if(typeof i=="number"&&(r.minLength=i),typeof s=="number"&&(r.maxLength=s),c&&(r.format=bm[c]??c,r.format===""&&delete r.format,(c==="time"||d)&&delete r.format),u&&(r.contentEncoding=u),l&&l.size>0){let m=[...l].map(Lc);m.length===1?r.pattern=m[0].source:m.length>1&&(r.allOf=[...m.map(f=>({...n.target==="draft-07"||n.target==="draft-04"||n.target==="openapi-3.0"?{type:"string"}:{},pattern:f.source}))])}},Cc=(e,n,t,o)=>{let r=t,{minimum:i,maximum:s,multipleOf:c,exclusiveMaximum:l,exclusiveMinimum:u,isInt:d}=gn(e);r.type=d?"integer":"number";let m=typeof u=="number"&&u>=(i??Number.NEGATIVE_INFINITY),f=typeof l=="number"&&l<=(s??Number.POSITIVE_INFINITY),p=n.target==="draft-04"||n.target==="openapi-3.0";if(m?p?(r.minimum=u,r.exclusiveMinimum=!0):r.exclusiveMinimum=u:typeof i=="number"&&(r.minimum=i),f?p?(r.maximum=l,r.exclusiveMaximum=!0):r.exclusiveMaximum=l:typeof s=="number"&&(r.maximum=s),c){let b=new Set;for(let x of c)Number.isFinite(x)&&x!==0?b.add(Math.abs(x)):On(e,n,r,o,`A multipleOf divisor of ${x} cannot be represented in JSON Schema`);let[v,...y]=b;v!==void 0&&(r.multipleOf=v),y.length&&(r.allOf=[...r.allOf??[],...y.map(x=>({multipleOf:x}))])}},Nc=(e,n,t,o)=>{t.type="boolean"};var Ac=(e,n,t,o)=>{n.target==="openapi-3.0"?(t.type="string",t.nullable=!0,t.enum=[null]):t.type="null"};var Ec=(e,n,t,o)=>{t.not={}};var Ic=(e,n,t,o)=>{};var Gc=(e,n,t,o)=>{let r=e._zod.def,i=ht(r.entries);if(i.length===0){t.not={};return}i.every(s=>typeof s=="number")&&(t.type="number"),i.every(s=>typeof s=="string")&&(t.type="string"),t.enum=i},$c=(e,n,t,o)=>{let r=e._zod.def;if(r.values.length===0){t.not={};return}let i=[];for(let s of r.values)if(s===void 0){if(On(e,n,t,o,"Literal `undefined` cannot be represented in JSON Schema"))return}else if(typeof s=="bigint"){if(On(e,n,t,o,"BigInt literals cannot be represented in JSON Schema"))return;i.push(Number(s))}else i.push(s);if(i.length!==0)if(i.length===1){let s=i[0];t.type=s===null?"null":typeof s,n.target==="draft-04"||n.target==="openapi-3.0"?t.enum=[s]:t.const=s}else i.every(s=>typeof s=="number")&&(t.type="number"),i.every(s=>typeof s=="string")&&(t.type="string"),i.every(s=>typeof s=="boolean")&&(t.type="boolean"),i.every(s=>s===null)&&(t.type="null"),t.enum=i};var Oc=(e,n,t,o)=>{On(e,n,t,o,"Custom types cannot be represented in JSON Schema")};var Bc=(e,n,t,o)=>{On(e,n,t,o,"Transforms cannot be represented in JSON Schema")};var Rc=(e,n,t,o)=>{let r=t,i=e._zod.def,{minimum:s,maximum:c}=gn(e);typeof s=="number"&&(r.minItems=s),typeof c=="number"&&(r.maxItems=c),r.type="array",r.items=Ie(i.element,n,{...o,path:[...o.path,"items"]})};function Jo(e){let n=e._zod.def;return n.type==="pipe"&&n.in._zod.traits.has("$ZodTransform")?Jo(n.out):n.type==="catch"?Jo(n.innerType):e._zod.optin}var Xc=(e,n,t,o)=>{let r=t,i=e._zod.def,s=i.shape;if(Object.getOwnPropertySymbols(s).length&&On(e,n,r,o,"Symbol keys cannot be represented in JSON Schema"))return;r.type="object",r.properties={};for(let u in s)cn(r.properties,u,Ie(s[u],n,{...o,path:[...o.path,"properties",u]}));let l=[];for(let u of Object.keys(s)){let d=i.shape[u];(n.io==="input"?Jo(d)===void 0:d._zod.optout===void 0)&&l.push(u)}l.length>0&&(r.required=l),i.catchall?._zod.def.type==="never"?r.additionalProperties=!1:i.catchall?i.catchall&&(r.additionalProperties=Ie(i.catchall,n,{...o,path:[...o.path,"additionalProperties"]})):n.io==="output"&&(r.additionalProperties=!1)},Dc=(e,n,t,o)=>{let r=e._zod.def,i=r.inclusive===!1,s=r.options.map((c,l)=>Ie(c,n,{...o,path:[...o.path,i?"oneOf":"anyOf",l]}));i?t.oneOf=s:t.anyOf=s},Mc=(e,n,t,o)=>{let r=e._zod.def,i=Ie(r.left,n,{...o,path:[...o.path,"allOf",0]}),s=Ie(r.right,n,{...o,path:[...o.path,"allOf",1]}),c=u=>"allOf"in u&&Object.keys(u).length===1,l=[...c(i)?i.allOf:[i],...c(s)?s.allOf:[s]];t.allOf=l,n.intersections.push(l)};function yi(e,n,t){if(n.$ref){if(t.has(n))return n;t.add(n);let b=e.get(n)?.def;if(!b)return n;let v=yi(e,b,t);return v===b?n:v}for(let b of["anyOf","oneOf"]){let v=n[b];if(!Array.isArray(v))continue;let y=v.map(x=>yi(e,x,t));y.some((x,L)=>x!==v[L])&&(n={...n,[b]:y})}let o=Array.isArray(n.type)?n.type:[n.type],r=!o.includes("string")&&o.some(b=>b==="number"||b==="integer"),i=n.enum??(n.const!==void 0?[n.const]:void 0);if(!r&&!i?.some(b=>typeof b=="number"))return n;let{minimum:s,maximum:c,exclusiveMinimum:l,exclusiveMaximum:u,multipleOf:d,format:m,id:f,...p}=n;return p.enum?p.enum=p.enum.map(b=>typeof b=="number"?String(b):b):typeof p.const=="number"&&(p.const=String(p.const)),r&&(p.type="string",i||(p.pattern=(o.includes("number")?Ht:Fr).source)),p}var bi=new WeakMap;function xm(e){let n=new Map;for(let o of e.seen.values())o.def&&!n.has(o.schema)&&n.set(o.schema,o);let t=new Map;for(let o of bi.get(e)??[]){let r=e.seen.get(o),i=(r?.def??r?.schema)?.propertyNames;if(!i||i===!0||t.has(i))continue;let s=yi(n,i,new Set);s!==i&&t.set(i,s)}if(t.size)for(let o of e.seen.values())for(let r of[o.schema,o.def]){let i=r&&t.get(r.propertyNames);i&&(r.propertyNames=i)}}var Zc=(e,n,t,o)=>{let r=t,i=e._zod.def;r.type="object";let s=i.keyType,c=gn(s).patterns;if(i.mode==="loose"&&c&&c.size>0){let d=Ie(i.valueType,n,{...o,path:[...o.path,"patternProperties","*"]});r.patternProperties={};for(let m of c)cn(r.patternProperties,Lc(m).source,d)}else{if(n.target==="draft-07"||n.target==="draft-2020-12"){r.propertyNames=Ie(i.keyType,n,{...o,path:[...o.path,"propertyNames"]});let d=bi.get(n);d||(d=[],bi.set(n,d),n.deferred.push(()=>xm(n))),d.push(e)}r.additionalProperties=Ie(i.valueType,n,{...o,path:[...o.path,"additionalProperties"]})}let l=s._zod.values,u=n.io==="input"&&Jo(i.valueType)!==void 0;if(l&&!i.partial&&!u){let d=[...l].filter(m=>typeof m=="string"||typeof m=="number");d.length>0&&(r.required=d.map(String))}},Fc=(e,n,t,o)=>{let r=e._zod.def,i=Ie(r.innerType,n,o),s=n.seen.get(e);n.target==="openapi-3.0"?(s.ref=r.innerType,t.nullable=!0):t.anyOf=[i,{type:"null"}]},Uc=(e,n,t,o)=>{let r=e._zod.def;Ie(r.innerType,n,o);let i=n.seen.get(e);i.ref=r.innerType},wi=Symbol();function qc(e,n,t,o,r){let i=!1,s=JSON.stringify(e,(c,l)=>typeof l!="bigint"?l:(i=!0,null));return i?(On(n,t,o,r,"BigInt defaults cannot be represented in JSON Schema"),wi):JSON.parse(s)}var Vc=(e,n,t,o)=>{let r=e._zod.def;Ie(r.innerType,n,o);let i=n.seen.get(e);i.ref=r.innerType;let s=qc(r.defaultValue,e,n,t,o);s!==wi&&(t.default=s)},Hc=(e,n,t,o)=>{let r=e._zod.def;Ie(r.innerType,n,o);let i=n.seen.get(e);if(i.ref=r.innerType,n.io!=="input")return;let s=qc(r.defaultValue,e,n,t,o);s!==wi&&(t._prefault=s)},jc=(e,n,t,o)=>{let r=e._zod.def;Ie(r.innerType,n,o);let i=n.seen.get(e);i.ref=r.innerType;let s;try{s=r.catchValue(void 0)}catch{On(e,n,t,o,"Dynamic catch values are not supported in JSON Schema");return}t.default=s},Wc=(e,n,t,o)=>{let r=e._zod.def,i=r.in._zod.traits.has("$ZodTransform"),s=n.io==="input"?i?r.out:r.in:r.out;Ie(s,n,o);let c=n.seen.get(e);c.ref=s},Kc=(e,n,t,o)=>{let r=e._zod.def;Ie(r.innerType,n,o);let i=n.seen.get(e);i.ref=r.innerType,t.readOnly=!0};var xi=(e,n,t,o)=>{let r=e._zod.def;Ie(r.innerType,n,o);let i=n.seen.get(e);i.ref=r.innerType},Jc=(e,n,t,o)=>{let r=e._zod.innerType;Ie(r,n,o);let i=n.seen.get(e);i.ref=r};var Yc=new WeakSet([Object.prototype,Error.prototype]);function Yo(e,n,t){Object.defineProperty(e,n,{configurable:!0,enumerable:!1,get(){let o=t(this);return Object.defineProperty(this,n,{value:o,configurable:!0,writable:!0}),o},set(o){Object.defineProperty(this,n,{value:o,configurable:!0,writable:!0})}})}var Cm=(e,n)=>{hs.init(e,n),e.name="ZodError";let t=Object.getPrototypeOf(e);Yc.has(t)||(Yc.add(t),Yo(t,"format",o=>r=>vs(o,r)),Yo(t,"flatten",o=>r=>gs(o,r)),Yo(t,"addIssue",o=>r=>{o.issues.push(r),o.message=JSON.stringify(o.issues,gt,2)}),Yo(t,"addIssues",o=>r=>{o.issues.push(...r),o.message=JSON.stringify(o.issues,gt,2)}),Object.defineProperty(t,"isEmpty",{configurable:!0,enumerable:!1,get(){return this.issues.length===0}}))};var dn=$("ZodError",Cm,void 0,{Parent:Error});var Qc=Ao(dn),eu=Eo(dn),nu=Io(dn),tu=Go(dn),ou=bs(dn),ru=ws(dn),iu=xs(dn),su=_s(dn),au=ks(dn),lu=Ps(dn),cu=Ss(dn),uu=Ts(dn);function Am(){rn.localeError||un(zl())}function er(){rn.memoizer||un({memoizer:Ll()})}var Te=$("ZodType",(e,n)=>(Am(),ke.init(e,n),e.def=n,e.type=n.type,e),{check(...e){let n=this.def;return this.clone(se.mergeDefs(n,{checks:[...n.checks??[],...e.map(t=>typeof t=="function"?{_zod:{check:t,def:{check:"custom"},onattach:[]}}:t)]}),{parent:!0})},with(...e){return this.check(...e)},clone(e,n){return xn(this,e,n)},brand(){return this},register(e,n){return e.add(this,n),this},refine(e,n){return this.check(Nf(e,n))},superRefine(e,n){return this.check(Af(e,n))},overwrite(e){return this.check(jn(e))},optional(){return fu(this)},exactOptional(){return hf(this)},nullable(){return hu(this)},nullish(){return fu(hu(this))},nonoptional(e){return xf(this,e)},array(){return Pe(this)},or(e){return Pt([this,e])},and(e){return df(this,e)},transform(e){return gu(this,ff(e))},default(e){return yf(this,e)},prefault(e){return wf(this,e)},catch(e){return kf(this,e)},pipe(e){return gu(this,e)},readonly(){return Tf(this)},describe(e){let n=this.clone();return it.add(n,{description:e}),n},meta(...e){if(e.length===0)return it.get(this);let n=this.clone();return it.add(n,e[0]),n},isOptional(){return this.safeParse(void 0).success},isNullable(){return this.safeParse(null).success},apply(e,...n){return n.length===0?e(this):e(this,...n)},get"~standard"(){return se.hide(this,"~standard",{...jr(this),jsonSchema:{input:no(this,"input"),output:no(this,"output")}})},set"~standard"(e){se.own(this,"~standard",e)},parse:function e(n,t){return Qc(this,n,t,{callee:e})},parseAsync:async function e(n,t){return await eu(this,n,t,{callee:e})},safeParse(e,n){return nu(this,e,n)},async safeParseAsync(e,n){return tu(this,e,n)},get spa(){return this?.safeParseAsync},set spa(e){se.own(this,"spa",e)},validate(e,n){return Xr(this,e,n)},validateAsync(e,n){return Dr(this,e,n)},encode:function e(n,t){return ou(this,n,t,{callee:e})},decode:function e(n,t){return ru(this,n,t,{callee:e})},encodeAsync:async function e(n,t){return await iu(this,n,t,{callee:e})},decodeAsync:async function e(n,t){return await su(this,n,t,{callee:e})},safeEncode(e,n){return au(this,e,n)},safeDecode(e,n){return lu(this,e,n)},async safeEncodeAsync(e,n){return cu(this,e,n)},async safeDecodeAsync(e,n){return uu(this,e,n)},toJSONSchema(e){return yc(this,{})(e)},get description(){return it.get(this)?.description},get _def(){return this._zod.def}}),vu=$("_ZodString",(e,n)=>{Do.init(e,n),Te.init(e,n),e._zod.processJSONSchema=(t,o,r)=>zc(e,t,o,r)},se.derived({format:e=>gn(e).format??null,minLength:e=>gn(e).minimum??null,maxLength:e=>gn(e).maximum??null},{regex(...e){return this.check(oi(...e))},includes(...e){return this.check(si(...e))},startsWith(...e){return this.check(ai(...e))},endsWith(...e){return this.check(li(...e))},min(...e){return this.check(xt(...e))},max(...e){return this.check(Wo(...e))},length(...e){return this.check(Ko(...e))},nonempty(...e){return this.check(xt(1,...e))},lowercase(e){return this.check(ri(e))},uppercase(e){return this.check(ii(e))},trim(){return this.check(ui())},normalize(...e){return this.check(ci(...e))},toLowerCase(){return this.check(di())},toUpperCase(){return this.check(pi())},slugify(){return this.check(mi())}})),Em=$("ZodString",(e,n)=>{Do.init(e,n),vu.init(e,n)},{email(e){return this.check(El(Bm,e))},url(e){return this.check(Rl(Xm,e))},jwt(e){return this.check(Ql(ef,e))},emoji(e){return this.check(Xl(Dm,e))},guid(e){return this.check(Il(Rm,e))},uuid(e){return this.check(Gl(Qo,e))},uuidv4(e){return this.check($l(Qo,e))},uuidv6(e){return this.check(Ol(Qo,e))},uuidv7(e){return this.check(Bl(Qo,e))},nanoid(e){return this.check(Dl(Mm,e))},cuid(e){return this.check(Ml(Zm,e))},cuid2(e){return this.check(Zl(Fm,e))},ulid(e){return this.check(Fl(Um,e))},base64(e){return this.check(Kl(Jm,e))},base64url(e){return this.check(Jl(Ym,e))},xid(e){return this.check(Ul(qm,e))},ksuid(e){return this.check(ql(Vm,e))},ipv4(e){return this.check(Vl(Hm,e))},ipv6(e){return this.check(Hl(jm,e))},cidrv4(e){return this.check(jl(Wm,e))},cidrv6(e){return this.check(Wl(Km,e))},e164(e){return this.check(Yl(Qm,e))},datetime(e){return this.check(ec(Im,e))},date(e){return this.check(nc(Gm,e))},time(e){return this.check(tc($m,e))},duration(e){return this.check(oc(Om,e))}});function te(e){return Al(Em,e)}var Ne=$("ZodStringFormat",(e,n)=>{Se.init(e,n),vu.init(e,n)}),Im=$("ZodISODateTime",(e,n)=>{Xa.init(e,n),Ne.init(e,n)}),Gm=$("ZodISODate",(e,n)=>{Da.init(e,n),Ne.init(e,n)}),$m=$("ZodISOTime",(e,n)=>{Ma.init(e,n),Ne.init(e,n)}),Om=$("ZodISODuration",(e,n)=>{Za.init(e,n),Ne.init(e,n)}),Bm=$("ZodEmail",(e,n)=>{za.init(e,n),Ne.init(e,n)});var Rm=$("ZodGUID",(e,n)=>{Ta.init(e,n),Ne.init(e,n)});var Qo=$("ZodUUID",(e,n)=>{La.init(e,n),Ne.init(e,n)});var Xm=$("ZodURL",(e,n)=>{Aa.init(e,n),Ne.init(e,n)});var Dm=$("ZodEmoji",(e,n)=>{Ea.init(e,n),Ne.init(e,n)});var Mm=$("ZodNanoID",(e,n)=>{Ia.init(e,n),Ne.init(e,n)});var Zm=$("ZodCUID",(e,n)=>{Ga.init(e,n),Ne.init(e,n)});var Fm=$("ZodCUID2",(e,n)=>{$a.init(e,n),Ne.init(e,n)});var Um=$("ZodULID",(e,n)=>{Oa.init(e,n),Ne.init(e,n)});var qm=$("ZodXID",(e,n)=>{Ba.init(e,n),Ne.init(e,n)});var Vm=$("ZodKSUID",(e,n)=>{Ra.init(e,n),Ne.init(e,n)});var Hm=$("ZodIPv4",(e,n)=>{Fa.init(e,n),Ne.init(e,n)});var jm=$("ZodIPv6",(e,n)=>{qa.init(e,n),Ne.init(e,n)});var Wm=$("ZodCIDRv4",(e,n)=>{Va.init(e,n),Ne.init(e,n)});var Km=$("ZodCIDRv6",(e,n)=>{Ha.init(e,n),Ne.init(e,n)});var Jm=$("ZodBase64",(e,n)=>{Wa.init(e,n),Ne.init(e,n)});var Ym=$("ZodBase64URL",(e,n)=>{Ka.init(e,n),Ne.init(e,n)});var Qm=$("ZodE164",(e,n)=>{Ja.init(e,n),Ne.init(e,n)});var ef=$("ZodJWT",(e,n)=>{Ya.init(e,n),Ne.init(e,n)});var yu=$("ZodNumber",(e,n)=>{Kr.init(e,n),Te.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Cc(e,t,o,r),e.isFinite=!0},se.derived({minValue:e=>{let{minimum:n,exclusiveMinimum:t}=gn(e);return Math.max(n??Number.NEGATIVE_INFINITY,t??Number.NEGATIVE_INFINITY)},maxValue:e=>{let{maximum:n,exclusiveMaximum:t}=gn(e);return Math.min(n??Number.POSITIVE_INFINITY,t??Number.POSITIVE_INFINITY)},isInt:e=>{let{isInt:n,multipleOf:t}=gn(e);return!!n||!!t?.some(Number.isSafeInteger)},format:e=>gn(e).format??null},{gt(e,n){return this.check(Ho(e,n))},gte(e,n){return this.check(Qt(e,n))},min(e,n){return this.check(Qt(e,n))},lt(e,n){return this.check(Vo(e,n))},lte(e,n){return this.check(Yt(e,n))},max(e,n){return this.check(Yt(e,n))},int(e){return this.check(du(e))},safe(e){return this.check(du(e))},positive(e){return this.check(Ho(0,e))},nonnegative(e){return this.check(Qt(0,e))},negative(e){return this.check(Vo(0,e))},nonpositive(e){return this.check(Yt(0,e))},multipleOf(e,n){return this.check(jo(e,n))},step(e,n){return this.check(jo(e,n))},finite(){return this}}));function sn(e){return rc(yu,e)}var nf=$("ZodNumberFormat",(e,n)=>{Qa.init(e,n),yu.init(e,n)});function du(e){return ic(nf,e)}var tf=$("ZodBoolean",(e,n)=>{el.init(e,n),Te.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Nc(e,t,o,r)});function ve(e){return sc(tf,e)}var of=$("ZodNull",(e,n)=>{nl.init(e,n),Te.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Ac(e,t,o,r)});function to(e){return ac(of,e)}var rf=$("ZodUnknown",(e,n)=>{tl.init(e,n),Te.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Ic(e,t,o,r)});function pu(){return lc(rf)}var sf=$("ZodNever",(e,n)=>{ol.init(e,n),Te.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Ec(e,t,o,r)});function bu(e){return cc(sf,e)}var af=$("ZodArray",(e,n)=>{er(),rl.init(e,n),Te.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Rc(e,t,o,r),e.element=n.element},{min(e,n){return this.check(xt(e,n))},nonempty(e){return this.check(xt(1,e))},max(e,n){return this.check(Wo(e,n))},length(e,n){return this.check(Ko(e,n))},unwrap(){return this.element}});function Pe(e,n){return uc(af,e,n)}var lf=$("ZodObject",(e,n)=>{er(),al.init(e,n),Te.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Xc(e,t,o,r),se.installLazyProp(e,"shape",t=>t._zod.def.shape,!1)},{keyof(){return ce(Object.keys(this._zod.def.shape))},catchall(e){return this.clone(se.mergeDefs(this._zod.def,{catchall:e}))},passthrough(){return this.clone(se.mergeDefs(this._zod.def,{catchall:pu()}))},loose(){return this.clone(se.mergeDefs(this._zod.def,{catchall:pu()}))},strict(){return this.clone(se.mergeDefs(this._zod.def,{catchall:bu()}))},strip(){return this.clone(se.mergeDefs(this._zod.def,{catchall:void 0}))},extend(e){return se.extend(this,e)},safeExtend(e){return se.safeExtend(this,e)},merge(e){return se.merge(this,e)},pick(e){return se.pick(this,e)},omit(e){return se.omit(this,e)},partial(...e){return se.partial(xu,this,e[0])},exactPartial(...e){return se.partial(_u,this,e[0],"exactPartial")},required(...e){return se.required(ku,this,e[0])}});function J(e,n){return new lf({type:"object",shape:e,catchall:bu(),...se.normalizeParams(n)})}var wu=$("ZodUnion",(e,n)=>{Jr.init(e,n),Te.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Dc(e,t,o,r),e.options=n.options});function Pt(e,n){return new wu({type:"union",options:e,...se.normalizeParams(n)})}var cf=$("ZodDiscriminatedUnion",(e,n)=>{wu.init(e,n),ll.init(e,n)});function oo(e,n,t){return new cf({type:"union",options:n,discriminator:e,...se.normalizeParams(t)})}var uf=$("ZodIntersection",(e,n)=>{cl.init(e,n),Te.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Mc(e,t,o,r)});function df(e,n){return new uf({type:"intersection",left:e,right:n})}var mu=$("ZodRecord",(e,n)=>{er(),ul.init(e,n),Te.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Zc(e,t,o,r),e.keyType=n.keyType,e.valueType=n.valueType});function Pi(e,n,t){return!n||!n._zod?new mu({type:"record",keyType:te(),valueType:e,...se.normalizeParams(n)}):new mu({type:"record",keyType:e,valueType:n,...se.normalizeParams(t)})}var ki=$("ZodEnum",(e,n)=>{dl.init(e,n),Te.init(e,n),e._zod.processJSONSchema=(o,r,i)=>Gc(e,o,r,i),e.enum=n.entries,e.options=[...e._zod.values];let t=new Set(Object.keys(n.entries));e.extract=(o,r)=>{let i={};for(let s of o)if(t.has(s))i[s]=n.entries[s];else throw new Error(`Key ${s} not found in enum`);return new ki({...n,checks:[],...se.normalizeParams(r),entries:i})},e.exclude=(o,r)=>{let i={...n.entries};for(let s of o)if(t.has(s))delete i[s];else throw new Error(`Key ${s} not found in enum`);return new ki({...n,checks:[],...se.normalizeParams(r),entries:i})}});function ce(e,n){let t=Array.isArray(e)?Object.fromEntries(e.map(o=>[o,o])):e;return new ki({type:"enum",entries:t,...se.normalizeParams(n)})}var pf=$("ZodLiteral",(e,n)=>{pl.init(e,n),Te.init(e,n),e._zod.processJSONSchema=(t,o,r)=>$c(e,t,o,r),e.values=new Set(n.values),Object.defineProperty(e,"value",{get(){if(n.values.length>1)throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");return n.values[0]}})});function be(e,n){return new pf({type:"literal",values:Array.isArray(e)?e:[e],...se.normalizeParams(n)})}var mf=$("ZodTransform",(e,n)=>{er(),ml.init(e,n),Te.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Bc(e,t,o,r),e._zod.parse=(t,o)=>{if(o.direction==="backward")throw new wt(e.constructor.name);t.addIssue=i=>{if(typeof i=="string")t.issues.push(se.issue(i,t.value,n));else{let s=i;s.fatal&&(s.continue=!1),s.code??(s.code="custom"),"input"in s||(s.input=t.value),s.inst??(s.inst=e),t.issues.push(se.issue(s))}};let r=n.transform(t.value,t);return r instanceof Promise?r.then(i=>(t.value=i,t)):(t.value=r,t)}});function ff(e){return new mf({type:"transform",transform:e})}var xu=$("ZodOptional",(e,n)=>{Yr.init(e,n),Te.init(e,n),e._zod.processJSONSchema=(t,o,r)=>xi(e,t,o,r),e.unwrap=()=>e._zod.def.innerType});function fu(e){return new xu({type:"optional",innerType:e})}var _u=$("ZodExactOptional",(e,n)=>{fl.init(e,n),Te.init(e,n),e._zod.processJSONSchema=(t,o,r)=>xi(e,t,o,r),e.unwrap=()=>e._zod.def.innerType});function hf(e){return new _u({type:"optional",innerType:e})}var gf=$("ZodNullable",(e,n)=>{hl.init(e,n),Te.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Fc(e,t,o,r),e.unwrap=()=>e._zod.def.innerType});function hu(e){return new gf({type:"nullable",innerType:e})}var vf=$("ZodDefault",(e,n)=>{gl.init(e,n),Te.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Vc(e,t,o,r),e.unwrap=()=>e._zod.def.innerType,e.removeDefault=e.unwrap});function yf(e,n){return new vf({type:"default",innerType:e,get defaultValue(){return typeof n=="function"?n():se.shallowClone(n)}})}var bf=$("ZodPrefault",(e,n)=>{vl.init(e,n),Te.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Hc(e,t,o,r),e.unwrap=()=>e._zod.def.innerType});function wf(e,n){return new bf({type:"prefault",innerType:e,get defaultValue(){return typeof n=="function"?n():se.shallowClone(n)}})}var ku=$("ZodNonOptional",(e,n)=>{yl.init(e,n),Te.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Uc(e,t,o,r),e.unwrap=()=>e._zod.def.innerType});function xf(e,n){return new ku({type:"nonoptional",innerType:e,...se.normalizeParams(n)})}var _f=$("ZodCatch",(e,n)=>{bl.init(e,n),Te.init(e,n),e._zod.processJSONSchema=(t,o,r)=>jc(e,t,o,r),e.unwrap=()=>e._zod.def.innerType,e.removeCatch=e.unwrap});function kf(e,n){return new _f({type:"catch",innerType:e,catchValue:typeof n=="function"?n:se.constantCatch(n)})}var Pf=$("ZodPipe",(e,n)=>{wl.init(e,n),Te.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Wc(e,t,o,r),e.in=n.in,e.out=n.out});function gu(e,n){return new Pf({type:"pipe",in:e,out:n})}var Sf=$("ZodReadonly",(e,n)=>{xl.init(e,n),Te.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Kc(e,t,o,r),e.unwrap=()=>e._zod.def.innerType});function Tf(e){return new Sf({type:"readonly",innerType:e})}var Lf=$("ZodLazy",(e,n)=>{_l.init(e,n),Te.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Jc(e,t,o,r),e.unwrap=()=>e._zod.def.getter()});function zf(e){return new Lf({type:"lazy",getter:e})}var Cf=$("ZodCustom",(e,n)=>{kl.init(e,n),Te.init(e,n),e._zod.processJSONSchema=(t,o,r)=>Oc(e,t,o,r)});function Nf(e,n={}){return dc(Cf,e,n)}function Af(e,n){return pc(e,n)}function Pu(e){let n=zf(()=>Pt([te(e),sn(),ve(),to(),Pe(n),Pi(te(),n)]));return n}var nr=Object.freeze(["panel-open","panel-close","panel-move","page-home","page-settings","page-settings-tab","page-model-tab","page-setup","page-authorization","page-repair","page-session-management","open-native-session","open-feedback","change-listen-mode","change-audio-device","edit-choice","commit-form","activate-control","dismiss","details-toggle","keyboard-navigation","ui-connect","ui-reconnect","ui-status-refresh","ui-request","ui-stream","ui-render-error","ui-action-error","ui-read-recovery","manage-session","start-voice","stop-voice","ui-buffer-overflow","session-history-open","session-history-close","subagent-history-open","subagent-history-close","show-subagents","show-main-sessions","open-native-subagent","new-voice-session","bind-current-session","retry-voice-transcript","bind-existing-session","unbind-existing-session","listen-mode-ptt","listen-mode-always","listen-mode-wake","settings-audio","settings-interaction","settings-prompt","settings-models","settings-advanced","settings-pets"]),Su=64*1024,ro=64,Tu=10080*60*1e3;var Si="whaleConversation",we=(e,n)=>({mode:"strict",typeSymbol:`dsh-fish-voice/conversation#${e}`,create:n}),Li=we("sessionId",()=>te().min(1).max(256)),Ef=we("settingsSessionId",()=>Li.create().nullable()),Gu=new Set(["status","read-settings","listen-mode","complete-setup","set-visibility","inspect-tts","save-tts","preview-tts","cancel-tts","save-models","model-installer","inspect-model-compute","plan-model-install","start-model-install","control-model-install","apply-model-install","pick-local-path","enable","disable","new","resume","read-history","read-audio-devices","save-audio-device","save-settings","capture-bindings","save-bindings","save-voice-prompt","conversation-models","save-conversation-model","inspect-performance","set-performance-mode","read-output-volume","set-output-volume"]),If=we("volumeRequest",()=>J({revision:sn().int().nonnegative(),volume:sn().min(0).max(1)})),Lu=J({id:te(),role:ce(["user","assistant"]),text:te().max(8e3),state:ce(["reply","interrupted","delivered","speech-requested","speech-failed"]),at:sn()}),Gf=J({state:ce(["disabled","starting","waiting","listening","paused","error"]),deadlineAt:sn().nonnegative().nullable(),streamOpen:ve(),detection:ce(["asr-after-utterance","acoustic-after-utterance"])}),$u=te().uuid(),$f=J({sessionId:Li.create(),items:Pe(J({id:$u,text:te().max(8e3),state:ce(["busy","ready","sending","uncertain"])})).max(8)}),Of=we("snapshot",()=>J({revision:sn().int().nonnegative(),historyGeneration:sn().int().nonnegative().optional(),rootSessionId:te().nullable(),title:to(),latest:Lu.nullable(),items:Pe(Lu).max(40),inputActive:ve(),inputError:ce(["device","recognition","no-speech"]).nullable().optional(),providerError:te().max(480).optional(),retryTranscripts:$f.nullable().optional(),playbackConfirmed:be(!1),wake:Gf.optional(),helper:J({online:ve(),listenMode:ce(["ptt","always","wake"]).nullable()}).refine(e=>e.online||e.listenMode===null).optional()})),Bf=we("volume",()=>J({supported:ve(),backend:be("dsh-speak").nullable(),volume:sn().min(0).max(1).nullable(),revision:sn().int().nullable(),apply:be("next-output").nullable(),reason:te().nullable()})),Y=te().max(4096),Ue=sn().int().nonnegative().max(Number.MAX_SAFE_INTEGER),Rf=J({code:te().max(64),message:te().max(512)}),zu=J({available:ve(),reason:Y.nullable(),runtimeLoaded:be(!1),backend:Y.optional(),provider:Y.optional(),device:Y.optional(),computeType:Y.optional(),supportedComputeTypes:Pe(Y).max(32).optional(),deviceCount:Ue.optional(),deviceIndex:Ue.optional(),validation:Y.optional(),note:Y.optional(),providerAdvertised:ve().optional()}),Xf=J({schema:be(1),default:be("cpu"),observedAt:Y.nullable(),reason:Y.optional(),backends:J({sensevoice:J({cpu:zu,cuda:zu}).optional()})}),Df=J({observedAt:Y,scope:be("plugin-host"),platform:Y,arch:Y,cpuLogicalCores:Ue.nullable(),totalMemoryBytes:Ue.nullable(),availableMemoryBytes:Ue.nullable(),gpuMemoryBytes:Ue.nullable(),gpuMemoryReason:Y,gpuSource:be("dxgi").nullable().optional(),gpuAdapters:Pe(J({name:te().min(1).max(256),dedicatedVideoMemoryBytes:Ue,sharedSystemMemoryBytes:Ue})).max(32).optional()}),Mf=J({modelId:Y,confidence:ce(["not-assessed","unknown","heuristic-only"]),recommended:ve(),badge:Y.nullable(),state:ce(["manual-choice","unknown","recommended-pending-runtime-validation","limited-memory","busy-memory","recommended-lightweight"]),reason:Y,policy:Y.optional(),runtimeValidated:be(!1).optional(),gpuValidated:be(!1).optional()}),Zf=J({release:Y,source:Y,sources:Pe(Y).max(16).optional(),redirectHost:Y,platform:Y,arch:Y,executable:Y,licenseUrls:Pe(Y).max(20)}),Ff=J({jobId:Y,modelId:Y,status:ce(["waiting","verifying","applied","blocked","paused","cancelled"]),reason:Y.nullable()}),Uf=J({id:Y,runtime:Zf.nullable().optional(),purpose:ce(["tts","asr"]).optional(),computeOptions:Pe(ce(["cpu","auto","cuda","vulkan"])).max(4).optional(),recommendation:Mf,title:Y,backend:Y.nullable(),available:ve(),reason:Y.nullable(),totalBytes:Ue.nullable(),source:Y.nullable(),licenseUrls:Pe(Y).max(20),licenseNote:Y.nullable(),verification:Y.optional(),runtimeLoaded:be(!1)}),qf=J({id:te().uuid(),modelId:Y,compute:ce(["cpu","auto","cuda","vulkan"]),status:ce(["queued","running","paused","failed","cancelled","installed"]),stage:ce(["queued","running","paused","failed","cancelled","installed","checking-runtime","verifying-local","downloading","verifying","installing"]),createdAt:Y,updatedAt:Y,totalBytes:Ue,receivedBytes:Ue,runtimeLoaded:be(!1),error:Rf.nullable(),currentFile:Y.nullable().optional(),files:Pe(J({name:Y,bytes:Ue,receivedBytes:Ue,verified:ve(),reused:ve().optional()})).max(200),installedPath:Y.optional(),sourceDirectory:Y.optional(),modelVariant:ce(["q4_k_m","q8_0"]).optional(),reused:be(!0).optional(),reusedBytes:Ue.optional(),purpose:ce(["tts","asr"]).optional(),recommendedSettings:Pt([J({tts:J({provider:be("local"),localModelId:Y,localModelPath:Y})}),J({asr:be("sensevoice"),models:J({sensevoiceDir:Y.optional()}),modelCompute:ce(["cpu","auto","cuda"])})]).optional()}),Vf=we("modelSnapshot",()=>J({schema:be(1),hardware:Df,compute:Xf,refresh:J({pending:ve(),observedAt:te().max(64).nullable(),attemptedAt:te().max(64).nullable(),error:te().max(512).nullable(),intervalMs:be(3e5)}).optional(),models:Pe(Uf).max(32),jobs:Pe(qf).max(1e3),ttsInstallIntent:Ff.nullable().optional()})),Hf=we("authorizationRequest",()=>J({revision:te().min(1).max(256),grant:ve()})),jf=we("senseVoiceAsrRequest",()=>oo("operation",[J({operation:be("status")}),J({operation:be("retry")})])),Wf={state:ce(["idle","downloading","ready","error"]),receivedBytes:Ue,totalBytes:Ue},Kf=we("senseVoiceAsrResult",()=>J({...Wf,selected:ve(),message:te().max(512).nullable()})),Cu=we("authorization",()=>J({schema:be(1),revision:te().min(1).max(256),completed:ve(),granted:ve(),usageAgreement:J({version:be(1),accepted:ve(),text:Pe(Y).max(16)}).optional(),modelSourcesChanged:ve().optional(),blockedOperations:Pe(Y).max(32),revocationUnconfirmed:ve(),scopes:Pe(J({id:Y,title:Y,description:Y,allowed:ve()})).max(16),modelSources:Pe(J({modelId:Y,source:Y,licenseUrls:Pe(Y).max(20),licenseNote:Y,runtime:J({source:Y,sources:Pe(Y).max(16).optional(),licenseUrls:Pe(Y).max(20),redirectHost:Y.nullable()}).optional()})).max(32),restrictions:Pe(Y).max(16)})),Jf=we("setup",()=>J({version:be(1),completed:ve()})),an=te().min(1).max(256),Oe=te().min(1).max(256),Nu=ce(["cpu","auto","cuda","vulkan"]),Au={sourceDirectory:te().min(1).max(4096).optional(),modelVariant:ce(["q4_k_m","q8_0"]).optional()},tr=Pi(te(),Pu()),Yf=J({provider:ce(["edge","deepseek","local"]),edgeVoice:te().min(1).max(64),systemVoice:te().max(256).nullable(),systemFallback:ve(),edgeTextTransmissionAccepted:ve(),volume:sn().min(0).max(1),localModelId:te().max(128).nullable(),localModelPath:te().max(4096).nullable(),referenceAudioPath:te().max(4096).nullable(),referenceAudioAccepted:ve(),deepseekVoice:ce(["stella","tide"]).optional(),deepseekTextTransmissionAccepted:ve().optional()}),Qf=J({backend:ce(["winmm","portaudio"]),id:te().min(1).max(1024),name:te().min(1).max(256)}).nullable(),eh={"read-history":{cursor:te().max(128).optional()},"read-audio-devices":{},"save-audio-device":{revision:an,direction:ce(["input","output"]),selection:Qf},"agent-permissions":{},"save-agent-permissions":{revision:an,allowed:J({"set-performance-mode":ve(),"set-visibility":ve(),"set-output-volume":ve()})},"agent-requests":{},"decide-agent-request":{id:Oe,approve:ve(),acknowledgements:Pe(te().max(80)).max(10)},"model-installer":{},"inspect-model-compute":{},"plan-model-install":{modelId:Oe,compute:Nu,...Au},"start-model-install":{modelId:Oe,compute:Nu,...Au,planHash:an,accepted:be(!0),useWhenReady:ve().optional()},"control-model-install":{id:Oe,operation:ce(["pause","resume","cancel"])},"apply-model-install":{id:Oe,revision:an},status:{},enable:{expectedOwnerSessionId:Oe.nullable().optional(),expectedExistingSessionId:Oe.nullable().optional()},disable:{},"read-settings":{},new:{expectedOwnerSessionId:Oe.nullable().optional()},"inspect-performance":{},"set-performance-mode":{revision:an,performanceMode:ce(["fast","balanced","high","compatibility"])},"inspect-tts":{},"save-tts":{revision:an,values:tr},"complete-setup":{revision:an},"preview-tts":{revision:an.optional(),values:Yf.optional()},"cancel-tts":{},list:{cursor:te().max(2048).optional()},resume:{id:Oe},"listen-mode":{mode:ce(["ptt","always","wake"])},"set-visibility":{revision:an,visibility:ce(["hidden","workspace"])},"pick-local-path":{kind:ce(["referenceAudio","sensevoiceDir","campplus","sourceDirectory"])},"capture-bindings":{operation:ce(["begin","end"]),token:Oe.optional(),inactive:ve().optional()},"save-bindings":{revision:an,values:tr,bindingContext:J({ownerSessionId:Oe.nullable(),epoch:Oe.nullable(),rootSessionId:Oe.nullable()})},"save-voice-prompt":{revision:an,values:J({text:te().max(32768)})},"conversation-models":{},"save-conversation-model":{revision:an,values:J({mode:ce(["auto","manual"]),provider:te().min(1).max(256).nullable(),model:te().min(1).max(256).nullable()})},"save-settings":{revision:an,values:tr},"save-models":{revision:an,values:tr}},nh=we("uiActionRequest",()=>oo("action",Object.entries(eh).map(([e,n])=>J({action:be(e),...n}))).refine(e=>e.action!=="preview-tts"||Object.hasOwn(e,"revision")===Object.hasOwn(e,"values"),"\u8349\u7A3F\u8BD5\u542C\u5FC5\u987B\u540C\u65F6\u63D0\u4F9B\u914D\u7F6E\u7248\u672C\u548C\u8BBE\u7F6E").refine(e=>JSON.stringify(e).length<=(e.action==="save-voice-prompt"?2e5:8192),"\u64CD\u4F5C\u6570\u636E\u8FC7\u957F")),Eu=we("uiActionResult",()=>te().max(4*1024*1024)),th=we("sessionManagementRequest",()=>oo("operation",[J({operation:be("list"),rootId:Oe.optional(),cursor:te().max(2048).optional()}),J({operation:be("unhide"),rootId:Oe,id:Oe}),J({operation:be("restore"),rootId:Oe,id:Oe})])),oh=we("presentation",()=>J({shown:Pe(Pt([J({id:Oe,parentId:to(),mode:to()}),J({id:Oe,parentId:Oe,mode:ce(["one-shot","continuable","unknown"])})]))})),Ti=te().min(1).max(128),rh=we("updateRequest",()=>oo("action",[J({action:be("check")}),J({action:be("install"),version:Ti})])),Iu=we("updateSnapshot",()=>J({schema:be(1),revision:sn().int().nonnegative().optional(),currentVersion:Ti,channel:ce(["stable","preview"]),status:ce(["idle","checking","current","available","incompatible","installing","restart-required","enable-required","installed","error","unsupported"]),checkedAt:te().max(64).nullable(),release:J({version:Ti,announcement:te().min(1).max(600),url:te().startsWith("https://github.com/Emikosama/dsh-fish-voice/releases/tag/v").max(256)}).nullable(),message:te().max(512).nullable(),canInstall:ve()})),or=Li.create(),io=J({sessionId:or,title:te().max(256).nullable(),availability:ce(["ready","busy","unavailable","archived"]),unavailableReason:ce(["managed","subagent"]).optional(),updatedAt:sn().int().nonnegative().max(864e13).nullable().optional()}),Ou=te().min(1).max(512),ih=we("listExistingSessionsRequest",()=>Pt([J({sessionId:or}),J({query:te().max(128).optional(),cursor:Ou.optional()})])),sh=we("listExistingSessionsResult",()=>J({items:Pe(io).max(100),nextCursor:Ou.nullable(),binding:io.nullable()})),ah=we("setExistingSessionRequest",()=>J({sessionId:or.nullable(),expectedSessionId:or.nullable()})),lh=we("setExistingSessionResult",()=>J({binding:io.nullable()})),Bu=te().min(1).max(160).regex(/^[A-Za-z0-9_-]+$/),ch=we("operationLogPageRequest",()=>J({cursor:Bu.optional()})),uh=we("operationLogPage",()=>J({text:te().max(Su),nextCursor:Bu.nullable()})),Ru=te().uuid(),dh=we("operationScopeResult",()=>J({scope:Ru})),ph=we("recordOperationRequest",()=>J({scope:Ru,events:Pe(J({id:te().uuid(),at:Ue,action:ce(nr),source:ce(["user","ui"]),phase:ce(["requested","finished"]).optional(),result:ce(["ok","failed","cancelled"]).optional(),count:Ue.positive().optional()}).refine(e=>e.action==="ui-buffer-overflow"?e.source==="ui"&&e.count!==void 0:e.count===void 0)).min(1).max(ro)})),mh=we("recordOperationResult",()=>J({accepted:ve()})),fh=we("retryVoiceTranscriptRequest",()=>J({id:$u})),hh=we("retryVoiceTranscriptResult",()=>J({accepted:ve()})),gh={retryVoiceTranscript:fh,recordClientOperations:ph,readOperationLog:ch,action:nh,saveAuthorization:Hf,manageSessions:th,senseVoiceAsrAction:jf,updateAction:rh,listExistingVoiceSessions:ih,setExistingVoiceSession:ah},vh={readClientOperationScope:dh,recordClientOperations:mh,readOperationLog:uh,action:Eu,manageSessions:Eu,readAuthorization:Cu,saveAuthorization:Cu,senseVoiceAsrAction:Kf,readSetup:Jf,followPresentation:oh,followModels:Vf,followUpdates:Iu,updateAction:Iu,listExistingVoiceSessions:sh,setExistingVoiceSession:lh,retryVoiceTranscript:hh},De=(e,n,t=!1)=>({id:`dsh-fish-voice#${Si}/${e}`,service:Si,namespace:Si,method:e,invocation:{kind:"direct"},...t?{mode:"stream"}:{},parameters:n.map(o=>({name:o,wire:o,source:"json",codec:o==="sessionId"?Ef:gh[e]??If})),cancellation:{parameter:"signal"},result:vh[e]??(t?Of:Bf)}),Xu={package:"dsh-fish-voice/conversation",descriptors:[De("action",["sessionId","request"]),De("follow",["sessionId"],!0),De("followModels",["sessionId"],!0),De("followPresentation",[],!0),De("followUpdates",[],!0),De("updateAction",["request"]),De("readSetup",[]),De("readAuthorization",[]),De("saveAuthorization",["request"]),De("senseVoiceAsrAction",["request"]),De("manageSessions",["sessionId","request"]),De("readClientOperationScope",[]),De("recordClientOperations",["request"]),De("readOperationLog",["request"]),De("listExistingVoiceSessions",["request"]),De("setExistingVoiceSession",["request"]),De("retryVoiceTranscript",["request"]),De("readVolume",["sessionId"]),De("setVolume",["sessionId","request"])]};var Me=e=>e!==null&&typeof e=="object"&&!Array.isArray(e),We=(e,n=1024)=>typeof e=="string"&&e.length<=n,Wn=e=>typeof e=="number"&&Number.isFinite(e),Re=e=>typeof e=="boolean",Du=e=>{if(!We(e,4096))return!1;try{let n=new URL(e);return["https:","http:"].includes(n.protocol)&&!n.username&&!n.password}catch{return!1}},vn=(e,n=4096)=>e==null||We(e,n),Kn=e=>We(e,256)&&e.length>0,Le=()=>{throw new Error("\u914D\u7F6E\u63A5\u53E3\u8FD4\u56DE\u4E86\u65E0\u6548\u6570\u636E\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6")};function zi(e){if(e.onboarding!==void 0&&(!Me(e.onboarding)||e.onboarding.version!==1||!Re(e.onboarding.completed))&&Le(),e.ttsSetup!==void 0){let n=e.ttsSetup;(!Me(n)||!["unconfigured","edge","deepseek","system","local","off"].includes(n.provider)||!We(n.edgeVoice,128)||!(n.systemVoice===null||We(n.systemVoice,512))||!Re(n.systemFallback)||!Re(n.edgeTextTransmissionAccepted)||!Wn(n.volume)||n.volume<0||n.volume>1||!(n.localModelId==null||Kn(n.localModelId))||!vn(n.localModelPath)||!vn(n.referenceAudioPath)||!(n.referenceAudioAccepted===void 0||Re(n.referenceAudioAccepted)))&&Le(),(n.deepseekVoice!==void 0&&!["stella","tide"].includes(n.deepseekVoice)||n.deepseekTextTransmissionAccepted!==void 0&&!Re(n.deepseekTextTransmissionAccepted)||n.provider==="deepseek"&&(n.deepseekVoice===void 0||n.deepseekTextTransmissionAccepted!==!0))&&Le()}if(e.ttsRuntime?.localComputeBackend!=null&&(!["cpu","vulkan","cuda","hip"].includes(e.ttsRuntime.localComputeBackend)||!Re(e.ttsRuntime.localComputeVerified)||!Re(e.ttsRuntime.localComputeFallback))&&Le(),e.ttsRuntime?.localTimings!=null){let n=e.ttsRuntime.localTimings;(!Me(n)||typeof n.modelResident!="boolean"||["preparationMs","deviceSelectionMs","synthesisMs","playbackMs","totalMs","chunks"].some(t=>!Number.isSafeInteger(n[t])||n[t]<0)||n.chunks<1||n.chunks>4e3)&&Le()}return e.ttsRuntime!=null&&(!Me(e.ttsRuntime)||!We(e.ttsRuntime.state,64)||!Re(e.ttsRuntime.busy)||!Re(e.ttsRuntime.blocked))&&Le(),e}function Zu(e,n){if(Me(n)||Le(),e==="setup-status"&&(Object.keys(n).some(t=>!["version","completed"].includes(t))||n.version!==1||!Re(n.completed))&&Le(),e==="inspect-tts"&&(n.deepseekKeyAvailable!==void 0&&!Re(n.deepseekKeyAvailable)&&Le(),(!We(n.platform,32)||!Re(n.playbackSupported)||!Re(n.systemSupported)||!Re(n.edgePlaybackSupported)||!["installed","missing","unchecked"].includes(n.edgeDependency)||n.autoDownload!==!1||!Re(n.gpuSupported)||n.edgeOfficialApi!==!1||n.edgeRecipient!=="Microsoft"||n.edgePurpose!=="speech-synthesis"||!Array.isArray(n.installedChineseVoices)||n.installedChineseVoices.length>512||n.installedChineseVoices.some(t=>!Me(t)||!We(t.id,512)||!We(t.name,512)||!We(t.culture,64)))&&Le()),e==="preview-tts"){let t=n.playbackCompleted===!0&&n.textOnly===void 0,o=n.provider==="edge"&&n.playbackCompleted===!1&&n.textOnly===!0&&We(n.reason,128);(!["edge","deepseek","local"].includes(n.provider)||n.fallback!==!1||n.acousticConfirmation!==!1||!t&&!o)&&Le()}if(e==="cancel-tts"&&!["idle","cancelled","unconfirmed"].includes(n.status)&&Le(),e==="model-installer"){if((n.schema!==1||!Array.isArray(n.models)||n.models.length>100||!Array.isArray(n.jobs)||n.jobs.length>1e3||!Me(n.hardware)||!Me(n.compute))&&Le(),n.refresh!=null){let t=n.refresh;(!Me(t)||!Re(t.pending)||!vn(t.observedAt,64)||!vn(t.attemptedAt,64)||!vn(t.error,512)||!(t.intervalMs===void 0||Wn(t.intervalMs)&&t.intervalMs>0&&t.intervalMs<=36e5))&&Le()}for(let t of n.models)(!Me(t)||!Kn(t.id)||!Re(t.available)||t.runtimeLoaded!==!1||!vn(t.title)||!vn(t.reason)||!(t.totalBytes==null||Wn(t.totalBytes)&&t.totalBytes>=0))&&Le(),t.recommendation!=null&&(!Me(t.recommendation)||!Re(t.recommendation.recommended)||!vn(t.recommendation.reason))&&Le();for(let t of n.jobs)Mu(t);if(n.ttsInstallIntent!=null){let t=n.ttsInstallIntent;(!Me(t)||!Kn(t.jobId)||!Kn(t.modelId)||!["waiting","verifying","applied","blocked","paused","cancelled"].includes(t.status)||!vn(t.reason))&&Le()}}return e==="inspect-model-compute"&&!Me(n.compute)&&!Me(n.backends)&&Le(),e==="plan-model-install"&&(n.reused!==void 0&&(!Re(n.reused)||n.reused!==!0||!We(n.sourceDirectory,4096)||!n.sourceDirectory||!["q4_k_m","q8_0"].includes(n.modelVariant)||!Wn(n.reusedBytes)||n.reusedBytes<0)&&Le(),n.reused!==!0&&(n.sourceDirectory!==void 0||n.modelVariant!==void 0||n.reusedBytes!==void 0)&&Le(),Array.isArray(n.files)&&n.files.some(t=>Me(t)&&t.reused!==void 0&&!Re(t.reused))&&Le(),(!Kn(n.modelId)||!["cpu","auto","cuda","vulkan"].includes(n.compute)||!We(n.planHash,128)||!Array.isArray(n.files)||n.files.length>200||!Wn(n.totalBytes)||n.totalBytes<0||!We(n.destination,4096)||!Array.isArray(n.licenseUrls)||n.licenseUrls.some(t=>!Du(t))||!vn(n.source)||!vn(n.notice)||!vn(n.licenseNote)||n.files.some(t=>!Me(t)||!Kn(t.name)||!Wn(t.bytes)||t.bytes<0||!We(t.sha256,64)||!/^[a-f0-9]{64}$/i.test(t.sha256)||!Du(t.url)))&&Le()),["start-model-install","control-model-install"].includes(e)&&Mu(n),zi(n)}function Mu(e){Me(e)&&e.error!=null&&(!Me(e.error)||!We(e.error.message,512))&&Le(),(!Me(e)||!Kn(e.id)||!Kn(e.modelId)||!["cpu","auto","cuda","vulkan"].includes(e.compute)||!["queued","running","paused","failed","cancelled","installed"].includes(e.status)||!We(e.stage,128)||!Wn(e.receivedBytes)||e.receivedBytes<0||!(e.totalBytes===null||Wn(e.totalBytes)&&e.totalBytes>=0)||e.runtimeLoaded!==!1)&&Le()}function Bn(e,n){let t=i=>i!==null&&typeof i=="object"&&!Array.isArray(i),o=i=>typeof i=="string"&&i.length>0&&i.length<=256,r=i=>i===null||t(i)&&Object.keys(i).sort().join(",")==="code,modifiers"&&typeof i.code=="string"&&/^(F([1-9]|1[0-9]|2[0-4])|Key[A-Z]|Digit[0-9]|Space)$/.test(i.code)&&Array.isArray(i.modifiers)&&i.modifiers.length<=3&&new Set(i.modifiers).size===i.modifiers.length&&i.modifiers.every(s=>["Control","Alt","Shift"].includes(s))&&!(i.code==="F4"&&i.modifiers.includes("Alt"));if(!t(n))throw new Error("Fish Voice UI returned invalid data");if(n.wake!==void 0&&!(n.wake===null&&e!=="conversation")&&!Ji(n.wake))throw new Error("Invalid wake state");if(n.listenMode!==void 0&&n.listenMode!==null&&!mt.includes(n.listenMode))throw new Error("Invalid listening mode");if(["status","enable","disable","new","resume","listen-mode"].includes(e)){if(!(n.ownerSessionId===null||o(n.ownerSessionId))||typeof n.enabled!="boolean"||!t(n.helper)||typeof n.helper.online!="boolean")throw new Error("Fish Voice UI returned an invalid status");if(n.existingVoiceSessionSupported!==void 0&&typeof n.existingVoiceSessionSupported!="boolean")throw new Error("Invalid existing session support");if(n.existingVoiceSession!=null&&!io.safeParse(n.existingVoiceSession).success)throw new Error("Invalid existing voice session");if(n.helper.lastError!=null&&(typeof n.helper.lastError!="string"||n.helper.lastError.length>512))throw new Error("Invalid audio diagnostic")}else if(["save-voice-prompt","save-conversation-model","save-bindings","read-settings","save-settings","save-audio-device","save-models","set-visibility","set-performance-mode","save-tts","complete-setup","apply-model-install"].includes(e)){if(n.bindingContext!==void 0&&(!t(n.bindingContext)||["ownerSessionId","epoch","rootSessionId"].some(s=>n.bindingContext[s]!==null&&!o(n.bindingContext[s]))))throw new Error("Invalid binding context");let i=n.values;if(typeof n.revision!="string"||!n.revision||!t(i)||![0,1,2].includes(i.pttMouse)||!t(i.speakerVerification)||typeof i.speakerVerification.enabled!="boolean"||!(Mt(i.device)||typeof i.device=="string"&&i.device.length<=256&&!/[\u0000-\u001f\u007f]/.test(i.device)||Number.isSafeInteger(i.device)&&i.device>=0))throw new Error("Fish Voice UI returned invalid settings");if(i.wakeWordAliases!==void 0&&!_o(i.wakeWordAliases))throw new Error("Invalid wake aliases");if(i.wakeListenTimeoutMs!==void 0&&(!Number.isInteger(i.wakeListenTimeoutMs)||i.wakeListenTimeoutMs<3e3||i.wakeListenTimeoutMs>3e4))throw new Error("Invalid wake timeout");if(i.semanticExperimental!==void 0&&typeof i.semanticExperimental!="boolean")throw new Error("Invalid experimental wake setting");if(i.pttKeyboard!==void 0&&!r(i.pttKeyboard))throw new Error("Invalid keyboard binding");if(n.capabilities?.pttKeyboard!==void 0){let s=n.capabilities.pttKeyboard;if(!t(s)||typeof s.supported!="boolean"||s.scope!=="global"||s.platform!=="win32"||!["available","unsupported"].includes(s.status)||!(s.reason==null||typeof s.reason=="string")||s.supported!==(s.status==="available"))throw new Error("Invalid keyboard capability")}if(n.modelSetup!==void 0&&(!t(n.modelSetup)||n.modelSetup.asr!=="sensevoice"||!t(n.modelSetup.models)||n.modelSetup.modelCompute!==void 0&&!["cpu","auto","cuda"].includes(n.modelSetup.modelCompute)||["sensevoiceDir","campplus"].some(s=>typeof n.modelSetup.models[s]!="string")))throw new Error("Fish Voice UI returned invalid model configuration");if(n.capabilities?.turnSignals===!0){let s=i.turnSignals;if(!t(s)||typeof s.enabled!="boolean"||typeof s.headphonesConfirmed!="boolean"||typeof s.experimentalAutomaticBargeIn!="boolean"||typeof s.volume!="number"||!Number.isFinite(s.volume)||s.volume<0||s.volume>1)throw new Error("Fish Voice UI returned invalid turn sound settings")}}else if(e==="list"&&(!Array.isArray(n.items)||n.items.length>50||!(n.nextCursor==null||typeof n.nextCursor=="string"&&n.nextCursor.length<=2048)||n.items.some(i=>!t(i)||!o(i.id)||typeof i.archived!="boolean"||typeof i.available!="boolean"||typeof i.canResume!="boolean"||i.title!==void 0&&typeof i.title!="string"||i.reason!==void 0&&typeof i.reason!="string")))throw new Error("Fish Voice UI returned invalid voice history");if(n.voicePrompt!==void 0){let i=n.voicePrompt;if(!t(i)||typeof i.text!="string"||i.text.length>32768||!["agents","custom"].includes(i.mode)||typeof i.customSupported!="boolean"||!(i.unsupportedReason===null||typeof i.unsupportedReason=="string"&&i.unsupportedReason.length<=512)||i.mode==="custom"&&(!i.text.trim()||!i.customSupported)||i.mode==="agents"&&i.customSupported&&i.text.trim())throw new Error("Invalid voice prompt preference")}if(n.conversationModel!==void 0&&(!t(n.conversationModel)||!["auto","manual"].includes(n.conversationModel.mode)||![n.conversationModel.provider,n.conversationModel.model].every(i=>i===null||o(i))||n.conversationModel.mode==="auto"&&(n.conversationModel.provider!==null||n.conversationModel.model!==null)))throw new Error("Invalid conversation model preference");if(e==="conversation-models"&&(!Array.isArray(n.providers)||n.providers.length>256||new Set(n.providers.map(i=>i?.id)).size!==n.providers.length||n.providers.some(i=>!t(i)||!o(i.id)||!o(i.name)||!Array.isArray(i.models)||i.models.length>2048||new Set(i.models.map(s=>s?.id)).size!==i.models.length||i.models.some(s=>!t(s)||!o(s.id)||!o(s.name)))))throw new Error("Invalid conversation model catalog");if(e==="read-audio-devices"&&!Wi(n))throw new Error("Invalid audio device inventory");if(n.audioDevices!==void 0&&(!t(n.audioDevices)||!Mt(n.audioDevices.output)||!(Mt(n.audioDevices.input)||typeof n.audioDevices.input=="string"||Number.isSafeInteger(n.audioDevices.input))))throw new Error("Invalid audio device preferences");if(e==="inspect-performance"&&(!Array.isArray(n.modes)||n.modes.some(i=>!t(i)||!["fast","balanced","high"].includes(i.performanceMode)||typeof i.available!="boolean")))throw new Error("Invalid performance capabilities");if(e==="read-history"&&(!(n.rootSessionId===null||o(n.rootSessionId))||!Number.isSafeInteger(n.generation)||n.generation<0||!Number.isSafeInteger(n.revision)||n.revision<0||!["voice-session","current-voice-session"].includes(n.scope)||typeof n.truncated!="boolean"||!(n.nextCursor===null||typeof n.nextCursor=="string"&&/^\d+:\d+$/.test(n.nextCursor))||!Array.isArray(n.items)||n.items.length>100||new Set(n.items.map(i=>i?.id)).size!==n.items.length||n.items.some(i=>!t(i)||!o(i.id)||!["user","assistant"].includes(i.role)||typeof i.text!="string"||i.text.length>8e3||!["reply","interrupted","delivered","speech-requested","speech-failed"].includes(i.state)||!Number.isFinite(i.at))))throw new Error("Invalid conversation history");if(e==="conversation"){if(n.helper!==void 0&&(!t(n.helper)||typeof n.helper.online!="boolean"||!(n.helper.listenMode===null||mt.includes(n.helper.listenMode))||!n.helper.online&&n.helper.listenMode!==null))throw new Error("Invalid conversation helper state");if(n.inputError!=null&&!["device","recognition","no-speech"].includes(n.inputError))throw new Error("Invalid input error");if(n.providerError!==void 0&&(typeof n.providerError!="string"||n.providerError.length>480))throw new Error("Invalid provider error");if(!Number.isSafeInteger(n.revision)||n.revision<0||n.title!==null||!(n.rootSessionId===null||o(n.rootSessionId))||!Array.isArray(n.items)||n.items.length>40||typeof n.inputActive!="boolean"||n.playbackConfirmed!==!1||n.items.some(i=>!t(i)||!o(i.id)||!["user","assistant"].includes(i.role)||typeof i.text!="string"||i.text.length>8e3||!["reply","interrupted","delivered","speech-requested","speech-failed"].includes(i.state)||!Number.isFinite(i.at))||n.latest!==null&&(!t(n.latest)||!n.items.some(i=>i.id===n.latest.id&&i.text===n.latest.text&&i.role==="assistant")))throw new Error("Invalid conversation snapshot")}if(e==="output-volume"&&(typeof n.supported!="boolean"||n.supported&&(typeof n.volume!="number"||!Number.isFinite(n.volume)||n.volume<0||n.volume>1||n.revision==null)))throw new Error("Invalid output volume snapshot");if(["agent-permissions","save-agent-permissions"].includes(e)){let i=["set-performance-mode","set-visibility","set-output-volume"];if(n.schema!==1||!o(n.revision)||!Array.isArray(n.items)||n.items.length!==3||new Set(n.items.map(s=>s?.operation)).size!==3||n.items.some(s=>!t(s)||!i.includes(s.operation)||typeof s.allowed!="boolean"||typeof s.title!="string"||s.title.length>128||!(s.reason===null||typeof s.reason=="string"&&s.reason.length<=1024)))throw new Error("Invalid agent permissions")}if(["agent-requests","decide-agent-request"].includes(e)){let i=s=>t(s)&&o(s.id)&&o(s.sourceSessionId)&&o(s.operation)&&typeof s.title=="string"&&s.title.length<=128&&["pending","executing","completed","blocked","unknown","superseded","expired","cancelled","rejected"].includes(s.state)&&Number.isFinite(s.createdAt)&&Number.isFinite(s.expiresAt)&&Number.isSafeInteger(s.humanRevision)&&t(s.request)&&t(s.before)&&Array.isArray(s.acknowledgements)&&s.acknowledgements.length<=10&&s.acknowledgements.every(c=>t(c)&&o(c.id)&&typeof c.text=="string"&&c.text.length<=1024)&&(s.error===null||t(s.error)&&typeof s.error.code=="string"&&typeof s.error.message=="string"&&s.error.message.length<=1024)&&(s.nextAction===null||typeof s.nextAction=="string"&&s.nextAction.length<=1024);if(n.schema!==1||!Number.isSafeInteger(n.humanRevision)||n.humanRevision<0||!Array.isArray(n.items)||n.items.length>100||n.items.some(s=>!i(s))||e==="decide-agent-request"&&(!i(n.lastOutcome)||!n.items.some(s=>s.id===n.lastOutcome.id&&s.state===n.lastOutcome.state)))throw new Error("Invalid agent request snapshot")}if(e==="authorization"){if(n.usageAgreement!==void 0&&(!t(n.usageAgreement)||n.usageAgreement.version!==1||typeof n.usageAgreement.accepted!="boolean"||!Array.isArray(n.usageAgreement.text)||n.usageAgreement.text.length>16||n.usageAgreement.text.some(i=>typeof i!="string"||i.length>4096)))throw new Error("Invalid usage agreement snapshot");if(n.schema!==1||!o(n.revision)||!Array.isArray(n.blockedOperations)||n.blockedOperations.some(i=>typeof i!="string")||typeof n.revocationUnconfirmed!="boolean"||typeof n.completed!="boolean"||typeof n.granted!="boolean"||!Array.isArray(n.scopes)||n.scopes.length>16||new Set(n.scopes.map(i=>i?.id)).size!==n.scopes.length||n.scopes.some(i=>!t(i)||!o(i.id)||typeof i.title!="string"||typeof i.description!="string"||typeof i.allowed!="boolean")||!Array.isArray(n.modelSources)||n.modelSources.length>32||n.modelSources.some(i=>!t(i)||!o(i.modelId)||typeof i.source!="string"||!Array.isArray(i.licenseUrls)||i.licenseUrls.some(s=>typeof s!="string")||typeof i.licenseNote!="string")||!Array.isArray(n.restrictions)||n.restrictions.some(i=>typeof i!="string"))throw new Error("Invalid authorization snapshot")}if(n.inferenceCompute!=null){let i=n.inferenceCompute;if(!t(i)||!["cpu","auto","cuda"].includes(i.requested)||![null,"cpu","cuda"].includes(i.actual)||i.engine!=="sensevoice"||!(i.computeType===null||["int8","float16","int8_float16","int8_float32","float32"].includes(i.computeType))||!(i.deviceIndex===null||Number.isSafeInteger(i.deviceIndex)&&i.deviceIndex>=0&&i.deviceIndex<8)||![null,"gpu-unavailable","gpu-load-failed","gpu-inference-failed","model-gpu-unverified"].includes(i.fallbackReason)||typeof i.validated!="boolean")throw new Error("Invalid inference compute status")}if(n.inputDevices!==void 0&&!Qi(n.inputDevices))throw new Error("Invalid input device inventory");if(n.ptt?.keyboard!==void 0&&n.ptt.keyboard!==null){let i=n.ptt.keyboard;if(!t(i)||typeof i.supported!="boolean"||i.scope!=="global"||!["unsupported","active","inactive","unknown"].includes(i.status)||typeof i.hookInstalled!="boolean"||typeof i.recording!="boolean"||!(i.observedAt==null||Number.isFinite(i.observedAt)))throw new Error("Invalid keyboard status")}if(n.voiceSession?.recovery!==void 0){let i=n.voiceSession.recovery;if(!t(i)||i.stopVerified!==void 0&&typeof i.stopVerified!="boolean"||i.stopVerified===!0&&(i.kind!=="none"||n.voiceSession.fullyStopped!==!0)||!["none","live-root-conflict","predecessor-cleanup-pending","predecessor-stop-unconfirmed","helper-cleanup-pending","helper-stop-unconfirmed"].includes(i.kind)||!(i.rootSessionId===null||o(i.rootSessionId))||i.kind!=="none"&&n.voiceSession.fullyStopped===!0)throw new Error("Invalid voice recovery state")}if(n.voiceSession?.visibility!==void 0&&!["hidden","workspace"].includes(n.voiceSession.visibility))throw new Error("Fish Voice UI returned invalid visibility");if(n.voiceCapabilities!==void 0){let i=n.voiceCapabilities;if(!t(i)||!(i.configuredVisibility===null||["hidden","workspace"].includes(i.configuredVisibility))||["hidden","workspace"].some(s=>!t(i[s])||typeof i[s].supported!="boolean")||!t(i.taskHandoff)||typeof i.taskHandoff.mode!="string")throw new Error("Fish Voice UI returned invalid host capabilities")}return zi(n),["setup-status","inspect-tts","preview-tts","cancel-tts","model-installer","inspect-model-compute","plan-model-install","start-model-install","control-model-install"].includes(e)&&Zu(e,n),n}function Fu(e,n=10){let t=0;for(let o=e.length-1;o>=0;o--)if(e[o].role==="user"&&++t===n)return e.slice(o);return e}function Uu(e=[],n=[]){let t=new Map(e.map(o=>[o.id,o]));for(let o of n)t.set(o.id,o);return[...t.values()].sort((o,r)=>o.at-r.at)}function qu(e,n=36){return e.scrollHeight-e.scrollTop-e.clientHeight<=n}function Vu({enabled:e,active:n,unknown:t,pending:o}){return t?"unknown":o?"pending":e?n?"listening":"standby":"off"}function so(e){return e?.enabled?e.existingVoiceSession?.sessionId??e.voiceSession?.id??null:null}var Hu=["save-voice-prompt","save-conversation-model","save-bindings","read-settings","save-settings","save-audio-device","save-models","set-visibility","set-performance-mode","save-tts","complete-setup","apply-model-install"],ao=Hu.filter(e=>e!=="read-settings"),lo=["status","enable","disable","new","resume","listen-mode"],yh=new Set(["status","enable","disable","listen-mode","read-history"]),bh=["save-bindings","inspect-tts","inspect-model-compute"],Rn=new Set(["conversation-models","status","read-settings","read-output-volume","model-installer","agent-permissions","agent-requests"]),St=["conversation-models","agent-permissions","agent-requests","status","read-settings","list","read-output-volume","inspect-performance","inspect-tts","model-installer","inspect-model-compute","plan-model-install"];function ju(e,{schedule:n=(r,i)=>globalThis.setTimeout(r,i),unschedule:t=r=>globalThis.clearTimeout(r),observe:o=()=>{}}={}){let r=0,i={conversationHistory:null,conversationHistoryFor:null,conversationHistoryError:null,conversationHistoryLoading:!1,conversationHistoryRequestCursor:null},s={...i,conversationModels:null,conversationModelsFor:null,conversationModelsError:null,authorization:null,authorizationOpen:!1,authorizationLoading:!1,authorizationBusy:!1,authorizationUncertain:!1,authorizationError:null,agentRequests:null,agentRequestsFor:null,busy:!1,interruptibleRead:null,diagnosticStopPending:!1,error:null,status:null,settings:null,settingsFor:null,visibilityUncertain:!1,visibilityReadbackFor:null,catalog:null,checkedFor:null,catalogFor:null,uncertain:!1,performance:null,performanceFor:null,performancePending:!1,performanceError:null,conversation:null,conversationFor:null,conversationError:null,outputVolume:null,outputVolumeFor:null,outputVolumeUncertain:!1,setupStatus:null,setupOpen:!1,panelView:"home",setupError:null,ttsCapabilities:null,ttsCapabilitiesFor:null,ttsPreview:null,ttsPreviewFor:null,ttsCancelling:!1,ttsUncertain:!1,installer:null,installerFor:null,installerError:null,installerUncertain:!1,installPlan:null,installPlanFor:null},c=new Set,l=null,u=!0,d=!0,m=0,f=null,p=null,b=0,v=new Map,y=()=>{for(let w of v.values())w.stale=!0,w.abort.abort();v.clear()},x=()=>{y(),f&&(f.stale=!0,Rn.has(f.action)&&f.abort.abort())},L=!1,M=null,B=!1,C=null,I=0,T=0,E=new Map,S=!0,k=null,z=null,X=null,P,N=null,G=0,V=0,F=!1,U=null,K=null,de=new Set,ue=new Set,Q=new Set,j=new Set,A=w=>{if(!S)return;let _=Object.hasOwn(w,"uncertain")?w.readOnlyFailure===!0:s.readOnlyFailure;s={...s,...w,readOnlyFailure:_};for(let R of de)R()},ne,pe,ge=0,Ge=w=>["checking","installing"].includes(w?.status),Ve=(w,_)=>{_?.revision!==void 0&&w.revision<_.revision||(_&&w.revision!==void 0&&(_.revision=w.revision),A({updates:w,updatesUnavailable:!1}))},$e=()=>{if(!S||!k?.subscribeUpdates||ne||!u)return;let w=k,_={};ne=_,_.stop=w.subscribeUpdates(R=>{!S||ne!==_||(ge++,Tn("update-stream"),Ve(R,_))},()=>{!S||ne!==_||(ne=null,A({updatesUnavailable:!0}),He(z,"update-stream"))})},at=()=>{let w=ne;ne=null,w?.stop?.(),pe?.abort(),pe=null,A({updates:null,updatePending:null,updatesUnavailable:!1})},Ln=async w=>{if(!S||!k?.updateAction||pe)return;let{action:_,version:R}=w;if(_==="install"&&(s.updatesUnavailable||s.updates?.canInstall!==!0||s.updates?.release?.version!==R))return;let Z=k,H=new AbortController;pe=H,$e();let ee=ne,_e=ge;A({updatePending:_});try{let ye=await Z.updateAction(w,H.signal);S&&pe===H&&ne===ee&&(ye.revision===void 0&&Ge(ye)&&ge!==_e&&!Ge(s.updates)||Ve(ye,ee))}catch{let ye=ge!==_e&&!Ge(s.updates);S&&pe===H&&ne===ee&&!ye&&A({updatesUnavailable:!0})}finally{pe===H&&(pe=null,A({updatePending:null}))}},Ee=0,ie=w=>{Ee++,A({...w,ttsUncertain:!0})},Fe=()=>s.status?.existingVoiceSession?null:z,Ke=null,zn=()=>{Ke=null,A({transcriptRetry:null})},lt=w=>{if(!Ke?.receipt||w?.rootSessionId!==Ke.sessionId)return;let _=w.retryTranscripts?.items.find(R=>R.id===Ke.id);(!_||_.state!=="ready"||Ke.receipt==="unconfirmed"&&w.revision>Ke.revision)&&zn()},hr=async(w,_)=>{let{status:R,conversation:Z,checkedFor:H,conversationFor:ee,uncertain:_e,busy:ye}=s,Be=R?.existingVoiceSession?.sessionId;if(!S||!k?.retryVoiceTranscript||Ke||_e||ye||z!==w||H!==w||ee!==w||!R?.enabled||!Be||Z?.rootSessionId!==Be||Z.retryTranscripts?.sessionId!==Be||!Z.retryTranscripts.items.some(Nn=>Nn.id===_&&Nn.state==="ready"))return;let en=k,Cn=new AbortController,bn=Ke={id:_,sessionId:Be,revision:Z.revision,receipt:null};ue.add(Cn),A({transcriptRetry:{id:_,state:"sending"}});try{let Nn=await en.retryVoiceTranscript({id:_},Cn.signal);if(!S||Ke!==bn)return;Nn.accepted===!1?zn():bn.receipt="accepted"}catch{if(!S||Ke!==bn)return;bn.receipt="unconfirmed"}finally{ue.delete(Cn),Ke===bn&&(bn.receipt==="unconfirmed"&&A({transcriptRetry:{id:_,state:"uncertain"}}),lt(s.conversation))}},fn=async(w,_,R)=>{let Z=e??k?.action;if(!Z)throw new Error("\u9C7C\u5E94\u754C\u9762\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let H=s.status?.existingVoiceSession&&yh.has(_.action)||s.existingSessionUnconfirmed&&_.action==="status"?null:w,ee=await Z(H,_,R);try{return Bn(_.action,ee)}catch(_e){throw o("ui-render-error","finished","failed"),_e}},ae=null,ho=({clear:w=!1}={})=>{let _=ae;ae=null,_?.abort.abort(),A({audioDevicesPending:!1,audioDevicesError:null,...w?{audioDevices:null,audioDevicesFor:null}:{}})},Vd=w=>{if(!S||z!==w)return Promise.resolve(!1);if(ae?.id===w&&ae.client===k)return ae.promise;ho();let _={id:w,client:k,scope:T,abort:new AbortController,promise:null};ae=_,ue.add(_.abort),A({audioDevicesPending:!0,audioDevicesError:null});let R=()=>S&&ae===_&&z===w&&k===_.client&&T===_.scope;return _.promise=(async()=>{let Z;try{let H=new Promise((_e,ye)=>{Z=()=>ye(new Error("Device read cancelled")),_.abort.signal.addEventListener("abort",Z,{once:!0})}),ee=await Promise.race([fn(w,{action:"read-audio-devices"},_.abort.signal),H]);return R()?(A({audioDevices:ee,audioDevicesFor:w}),!0):!1}catch(H){return R()&&!_.abort.signal.aborted&&A({audioDevicesError:String(H?.message??H)}),!1}finally{_.abort.signal.removeEventListener("abort",Z),ue.delete(_.abort),R()&&(ae=null,A({audioDevicesPending:!1}))}})(),_.promise},Mn=null,Hd=w=>{if(!S||z!==w)return Promise.resolve(!1);if(Mn?.id===w&&Mn.scope===T)return Mn.promise;let _={id:w,scope:T,client:k,promise:null};Mn=_;let R=()=>S&&Mn===_&&z===w&&T===_.scope&&k===_.client;return A({modelComputePending:!0,modelComputeError:null}),_.promise=(async()=>{try{if(await fn(w,{action:"inspect-model-compute"}),!R())return!1;let Z=await fn(w,{action:"model-installer"});return R()?(A({installer:Z,installerFor:w,installerError:null}),F||(F=!0,ct(!0)),!0):!1}catch(Z){if(!R())return!1;let H=Z?.uncertain||/TTS_TERMINATION_UNCONFIRMED/.test(String(Z?.code??"")+" "+String(Z?.message??""));return A({modelComputeError:String(Z?.message??Z),...H?{installerUncertain:!0,installerTerminationUnconfirmed:!0}:{}}),!1}finally{R()&&(Mn=null,A({modelComputePending:!1}))}})(),_.promise},Zn=null,gr=0,It=({clear:w=!1}={})=>{gr++;let _=Zn;Zn=null,_?.abort.abort(),A({performancePending:!1,performanceError:null,...w?{performance:null,performanceFor:null}:{}})},jd=w=>{if(!S||z!==w)return Promise.resolve(!1);if(Zn?.id===w&&Zn.client===k)return Zn.promise;It();let _={id:w,client:k,epoch:gr,abort:new AbortController,promise:null};Zn=_,ue.add(_.abort),A({performancePending:!0,performanceError:null});let R=()=>S&&Zn===_&&_.epoch===gr&&z===w&&k===_.client;return _.promise=(async()=>{let Z;try{let H=new Promise((_e,ye)=>{Z=()=>ye(new Error("Probe cancelled")),_.abort.signal.addEventListener("abort",Z,{once:!0})}),ee=await Promise.race([fn(w,{action:"inspect-performance"},_.abort.signal),H]);return R()?(A({performance:ee,performanceFor:w}),!0):!1}catch(H){return R()&&!_.abort.signal.aborted&&A({performanceError:String(H?.message??H)}),!1}finally{_.abort.signal.removeEventListener("abort",Z),ue.delete(_.abort),R()&&(Zn=null,A({performancePending:!1}))}})(),_.promise},Gt=()=>{let w=E.get("conversation-stream");w&&(w.timer!==null&&t(w.timer),w.timer=null,w.ready=!1);let _=++G;if(X?.(),X=null,r++,A({...i,conversation:null,conversationFor:null,conversationError:null,listenModeReceiptRevision:null}),P=void 0,!S||!k)return;let R=z;P=Fe(),X=k.subscribe(P,(Z,H)=>{if(!(!S||_!==G||z!==R))try{let ee=Bn("conversation",Z);H?.initial||Tn("conversation-stream"),s.conversationHistory&&(s.conversationHistory.rootSessionId!==ee.rootSessionId||s.conversationHistory.scope!=="voice-session"&&s.conversationHistory.generation!==ee.historyGeneration)&&(r++,A({...i}));let _e=s.conversationHistory,ye={};if(_e?.rootSessionId&&_e.rootSessionId===ee.rootSessionId){let Be=new Map(_e.items.map(q=>[q.id,q]));for(let q of ee.items)Be.set(q.id,q);let en=[...Be.values()].sort((q,Ce)=>q.at-Ce.at),Cn=en.slice(-4e3),bn=Cn.reduce((q,Ce)=>q+Ce.text.length,0),Nn=en.length>4e3;for(;bn>4*1024*1024;)bn-=Cn.shift().text.length,Nn=!0;ye={conversationHistory:{..._e,items:Cn,truncated:_e.truncated||Nn}}}A({...ye,conversation:ee,conversationFor:R,conversationError:null}),lt(ee)}catch(ee){r++,A({...i,conversation:null,conversationFor:null,conversationError:String(ee.message)}),He(R,"conversation-stream")}},Z=>{S&&_===G&&(r++,A({...i,conversation:null,conversationFor:null,conversationError:String(Z?.message??Z)}),He(R,"conversation-stream"))})},ct=(w=!1)=>{let _=E.get("model-stream");_&&(_.timer!==null&&t(_.timer),_.timer=null,_.ready=!1);let R=++V;if(N?.(),N=null,w||A({installer:null,installerFor:null,installerError:null}),!S||!k?.subscribeModels||!F)return;let Z=z;N=k.subscribeModels(Z,(H,ee)=>{if(!(!S||R!==V||z!==Z||ee?.initial))try{let _e=Bn("model-installer",H),ye=s.installer?.ttsInstallIntent;if(Tn("model-stream"),A({installer:_e,installerFor:Z,installerError:null}),_e.ttsInstallIntent&&(ye?.jobId!==_e.ttsInstallIntent.jobId||ye?.status!==_e.ttsInstallIntent.status)){let Be=_e.ttsInstallIntent.status==="applied";A({checkedFor:null}),Je({settings:Be,force:!0})}}catch(_e){A({installer:null,installerFor:null,installerError:String(_e.message)}),He(Z,"model-stream")}},H=>{S&&R===V&&(A({installer:null,installerFor:null,installerError:String(H?.message??H)}),He(Z,"model-stream"))})},Fn=()=>{if(K)return K;if(!U)return Promise.resolve(!0);let w=U,_=Ee;return w.cancelled=!0,w.abort.abort(),A({ttsCancelling:!0,ttsPreview:{status:"cancelling"}}),K=(async()=>{let R=!1;try{let Z=await fn(w.id,{action:"cancel-tts"});return Z.status==="unconfirmed"?(M=null,ie({ttsPreview:Z,uncertain:!0,error:"\u65E0\u6CD5\u786E\u8BA4\u6717\u8BFB\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B\u540E\u518D\u8BD5\u3002"}),!1):(R=!0,A({ttsPreview:Z,..._===Ee?{ttsUncertain:!1}:{}}),!0)}catch(Z){return M=null,ie({ttsPreview:{status:"unconfirmed"},uncertain:!0,error:String(Z?.message??Z)}),!1}finally{R&&U===w&&(U=null),A({ttsCancelling:!1}),K=null,queueMicrotask(()=>{yo(),pt()})}})(),K},Tn=w=>{let _=E.get(w);_?.timer!=null&&t(_.timer),E.delete(w)},vr=()=>{for(let w of E.keys())Tn(w)},He=(w,_)=>{if(!S||!L||z!==w||!["authorization","setup-status","conversation-stream","model-stream","update-stream"].includes(_)&&!Rn.has(_))return;let R=E.get(_);R||(R={id:w,scope:T,attempts:0,timer:null,ready:!1},E.set(_,R)),!(R.timer!==null||R.ready||!u||!d)&&(R.attempts++,o("ui-read-recovery","requested"),R.timer=n(()=>{R.timer=null,!(!S||z!==w||R.scope!==T||E.get(_)!==R)&&(R.ready=!0,pt())},Math.min(3e4,750*2**Math.min(R.attempts-1,6))),R.timer?.unref?.())},Un=null,go=0,ut=()=>{Un!==null&&t(Un),Un=null,go=0},Mi=w=>{!S||!u||!d||z!==w||Un!==null||go>=10||(Un=n(()=>{if(Un=null,!(!S||z!==w||!["predecessor-cleanup-pending","helper-cleanup-pending"].includes(s.status?.voiceSession?.recovery?.kind))){if(s.busy||s.ttsCancelling){Mi(w);return}go++,Qe.run(w,"status")}},1e3),Un?.unref?.())},Qe,Qn=0,vo=null,$t=null,dt=null,Ot=!1,Wd=async w=>{let _=k,R=[],Z=new Set;if(!S||!_?.readOperationLog)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u672A\u5C31\u7EEA");let H=null;do{w?.throwIfAborted();let ee=await _.readOperationLog(H?{cursor:H}:{},w);if(!S||k!==_||w?.aborted)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u8FDE\u63A5\u5DF2\u53D8\u5316");if(typeof ee?.text!="string"||!(ee.nextCursor===null||typeof ee.nextCursor=="string"&&ee.nextCursor)||Z.has(ee.nextCursor))throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u5206\u9875\u65E0\u6548");R.push(ee.text),H=ee.nextCursor,Z.add(H)}while(H);return R},Kd=async(w,_)=>{if(!S||!k?.manageSessions)throw new Error("\u9C7C\u5E94\u4F1A\u8BDD\u7BA1\u7406\u5C1A\u672A\u5C31\u7EEA");let R=k,Z=await R.manageSessions(null,w,_);if(!S||k!==R||_?.aborted)throw new Error("\u4F1A\u8BDD\u7BA1\u7406\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5");return Z},Jd=async(w,_)=>{if(!S||!k?.listExistingVoiceSessions)throw new Error("DSH \u4F1A\u8BDD\u5217\u8868\u6682\u4E0D\u53EF\u7528");let R=k,Z=await R.listExistingVoiceSessions(w,_);if(!S||k!==R||_?.aborted)throw new Error("\u4F1A\u8BDD\u5217\u8868\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5");return Z},et=null,Yd=async w=>{if(!S||!k?.setExistingVoiceSession||et||s.existingSessionUnconfirmed)throw new Error("DSH \u4F1A\u8BDD\u7ED1\u5B9A\u6682\u4E0D\u53EF\u7528");let _=k,R=new AbortController;et=R,ue.add(R);for(let Z of[v.get("status"),f])Z?.action==="status"&&(Z.stale=!0,Z.abort.abort());A({existingSessionWritePending:!0});try{let Z=await _.setExistingVoiceSession(w,R.signal);if(!S||k!==_||R.signal.aborted)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u786E\u8BA4");return s.status&&A({status:{...s.status,existingVoiceSession:Z.binding}}),P!==Fe()&&Gt(),Z}catch(Z){throw A({existingSessionUnconfirmed:!0}),Z}finally{ue.delete(R),et=null,A({existingSessionWritePending:!1}),Je({force:!0})}},Qd=async(w,_)=>{if(!S||!k?.senseVoiceAsrAction)throw new Error("\u8BC6\u522B\u6A21\u578B\u7BA1\u7406\u6682\u4E0D\u53EF\u7528");let R=k,Z=await R.senseVoiceAsrAction(w,_);if(!S||k!==R||_?.aborted)throw new Error("\u8BC6\u522B\u6A21\u578B\u72B6\u6001\u5DF2\u5207\u6362");if(!(ee=>ee&&["idle","downloading","ready","error"].includes(ee.state)&&Number.isSafeInteger(ee.receivedBytes)&&Number.isSafeInteger(ee.totalBytes)&&ee.receivedBytes>=0&&ee.receivedBytes<=ee.totalBytes)(Z)||typeof Z.selected!="boolean"||Z.message!==null&&(typeof Z.message!="string"||Z.message.length>512))throw new Error("\u8BC6\u522B\u6A21\u578B\u72B6\u6001\u65E0\u6548");return Z},nt=async({open:w=!1,initial:_=!1}={})=>{if(!k?.readAuthorization)return!1;if($t)return dt={open:w||dt?.open,initial:_||dt?.initial},w&&A({authorizationOpen:!0}),!1;let R=++Qn,Z=new AbortController;ue.add(Z),vo=Z,A({authorizationLoading:!0,authorizationError:null,...w?{authorizationOpen:!0}:{}});try{let H=Bn("authorization",await k.readAuthorization(Z.signal));return!S||R!==Qn?!1:(Tn("authorization"),A({authorization:H,authorizationUncertain:H.revocationUnconfirmed,..._&&!Ot&&(!H.completed||H.usageAgreement?.accepted!==!0||H.revocationUnconfirmed)?{authorizationOpen:!0}:{}}),!0)}catch(H){return S&&R===Qn&&(A({authorizationError:String(H?.message??H),authorizationUncertain:!0,..._?{authorizationOpen:!0}:{}}),He(z,"authorization")),!1}finally{ue.delete(Z),vo===Z&&(vo=null,S&&A({authorizationLoading:!1}))}},ep=async w=>{if(!k?.saveAuthorization||!s.authorization||s.authorizationBusy||s.authorizationUncertain)return!1;let _=new AbortController,R=++Qn,Z=k;ue.add(_),$t=_,A({authorizationBusy:!0,authorizationError:null});try{let H=Bn("authorization",await Z.saveAuthorization({revision:s.authorization.revision,grant:w},_.signal));return!S||R!==Qn||k!==Z?!1:(Ot=!1,A({authorization:H,authorizationOpen:H.revocationUnconfirmed,authorizationUncertain:H.revocationUnconfirmed,...H.revocationUnconfirmed?{authorizationError:"\u6743\u9650\u5DF2\u64A4\u56DE\uFF0C\u4F46\u5F53\u524D\u97F3\u9891\u505C\u6B62\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u6838\u67E5\u72B6\u6001\u3002"}:{}}),w&&!H.revocationUnconfirmed&&Qe.openSetup(),Je({settings:!0,force:!0}),!0)}catch(H){try{let ee=Bn("authorization",await Z.readAuthorization(_.signal));if(S&&k===Z&&R===Qn&&ee.completed&&ee.granted===w&&!ee.revocationUnconfirmed)return Ot=!1,A({authorization:ee,authorizationOpen:!1,authorizationUncertain:!1}),w&&Qe.openSetup(),!0}catch{}return S&&k===Z&&R===Qn&&(A({authorizationUncertain:!0,authorizationError:String(H?.message??H)}),He(z,"authorization")),!1}finally{if(ue.delete(_),$t===_&&($t=null,S&&A({authorizationBusy:!1}),S&&(dt||k!==Z))){let H=dt??{initial:!0};dt=null,nt(H)}}},tt=null,yr=0,br=()=>{if(!k?.readSetup||tt)return tt?.promise;let w=k,_=yr,R=new AbortController,Z={promise:null};return tt=Z,ue.add(R),Z.promise=(async()=>{try{let H=Bn("setup-status",await w.readSetup(R.signal));return!S||k!==w?!1:(Tn("setup-status"),A({setupStatus:H,...m===_&&!Ot?{setupOpen:!H.completed}:{},setupError:null}),H.completed?Je({settings:!0}):yo(),!0)}catch(H){return S&&k===w&&(A({setupError:String(H?.message??H)}),He(z,"setup-status")),!1}finally{ue.delete(R),tt===Z&&(tt=null)}})(),Z.promise},pt=async()=>{if(!(e||k?.action||k?.readAuthorization||k?.readSetup||k?.subscribeUpdates)||!S||!L||!u||!d||B||et||s.busy||s.ttsCancelling||!M&&![...E.values()].some(Z=>Z.ready))return;if(!M){let[Z,H]=[...E].find(([,ee])=>ee.ready);if(H.ready=!1,H.id!==z||H.scope!==T){Tn(Z);return}B=!0;try{Z==="authorization"?await nt():Z==="setup-status"?await br():Z==="conversation-stream"?Gt():Z==="model-stream"?ct(!0):Z==="update-stream"?$e():await Qe.run(H.id,Z)}finally{B=!1,queueMicrotask(()=>{pt()})}return}let w=M;M=null;let _=()=>S&&w.id===z&&w.scope===T;if(!_())return;let R=()=>_()?!u||!d||et||s.busy||s.ttsCancelling?(M||(M=w),!0):!1:!0;B=!0;try{if(w.notified||(w.notified=!0,C=w.id,I=Date.now(),A({readRefresh:(s.readRefresh??0)+1})),R()||(w.settings&&(w.settings=!1,await Qe.run(w.id,"read-settings",{},!0)),R()))return;w.status&&(w.status=!1,await Qe.run(w.id,"status",{},!0)),_()&&w.id&&!j.has(w.id)&&(j.add(w.id),Qe.run(w.id,"inspect-performance"))}finally{B=!1,queueMicrotask(()=>{pt()})}},Je=({settings:w=!1,force:_=!1}={})=>{if($e(),!(!S||!L)&&!(!_&&!w&&C===z&&Date.now()-I<1500)&&(s.authorizationUncertain&&!vo&&!$t&&nt(),s.setupError&&!tt&&br(),!(!z&&!s.setupOpen&&s.setupStatus===null))){s.installerError&&F&&ct(!0);for(let R of E.values())R.id===z&&(R.timer!==null&&t(R.timer),R.timer=null,R.attempts=0,R.ready=!0);Un===null&&(go=0),(!M||M.scope!==T)&&o("ui-status-refresh","requested"),M={id:z,scope:T,settings:!0,status:!0,notified:!1},queueMicrotask(()=>{pt()})}},Zi=()=>{let w=u&&d;if(s.readVisible!==w){if(A({readVisible:w}),!w){y();for(let _ of E.values())_.timer!==null&&t(_.timer),_.timer=null,_.ready=!1;ut();return}Je({force:!0})}},yo=async()=>{let w=z;!(e||k?.action)||s.setupStatus?.completed!==!1||Q.has(w)||s.busy||s.ttsCancelling||(Q.add(w),await Qe.run(w,"read-settings")&&z===w&&await Qe.run(w,"status"))};return Qe={getSnapshot:()=>s,async pickPath(w,_,R){if(!S||z!==w)return null;let Z=T,H=e??k?.action;if(!H)throw new Error("\u9C7C\u5E94\u754C\u9762\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let ee=await H(w,{action:"pick-local-path",kind:_},R);if(!S||z!==w||Z!==T||R?.aborted)return null;if(!ee||!(ee.path===null||typeof ee.path=="string"&&ee.path.length>0&&ee.path.length<=4096&&!/[\u0000-\u001f\u007f]/.test(ee.path)))throw new Error("\u8DEF\u5F84\u9009\u62E9\u7ED3\u679C\u65E0\u6548");return ee.path},async captureBindings(w,_){let R=await fn(w,{action:"capture-bindings",..._});if(!R||typeof R.token!="string"||typeof R.paused!="boolean")throw new Error("\u6309\u952E\u5F55\u5165\u56DE\u6267\u65E0\u6548");return R},setReadVisibility(w){u=!!w,Zi()},setPanelVisible(w){d=!!w,Zi()},markSettingsEdited(w="save-settings"){ao.includes(w)&&(c.add(w),A({settingsDraftActions:[...c]}))},discardSettingsDraft(w){w?c.delete(w):c.clear(),A({settingsDraftActions:[...c]}),!c.size&&(l&&A({settings:l,settingsFor:z}),l=null,A({settingsConflict:!1,settingsKey:s.settings?.revision}))},enableAutomaticReads(){L=!0,Je({settings:!0,force:!0})},refresh:Je,refreshModelCompute:Hd,subscribe(w){return de.add(w),()=>de.delete(w)},setSession(w){z!==w&&(z=w,T++,Mn=null,c.clear(),l=null,A({sourcePending:!0,checkedFor:void 0,settingsFor:void 0,modelComputePending:!1,modelComputeError:null,enableError:null,listenModeError:!1,newChatFor:void 0,settingsConflict:!1,settingsDraftActions:[],installPlan:null,installPlanFor:null}),vr(),It({clear:!0}),ho({clear:!0}),ut(),Fn(),x(),Gt(),ct(),Je({settings:!0,force:!0}),yo())},attachConversationClient(w){k!==w&&(at(),T++,Mn=null,A({modelComputePending:!1,modelComputeError:null}),vr(),It({clear:!0}),ho({clear:!0}),x(),j.clear()),k=w,nt({initial:!0}),Gt(),ct(),Je({settings:!0,force:!0}),k.readSetup&&(tt=null,yr=m,br())},conversationUnavailable(w){r++,A({...i,error:String(w?.message??w),conversation:null,conversationFor:null,conversationError:String(w?.message??w)})},async dismissSetup(){let w=++m,_=await Fn();return _&&w===m&&(x(),Qe.discardSettingsDraft(),A({setupOpen:!1})),_&&w===m},async showHome(){let w=++m,_=await Fn();return _&&w===m&&(x(),Qe.discardSettingsDraft(),A({setupOpen:!1,panelView:"home"}),Je()),_&&w===m},async openSettings(w="audio",_="conversation"){let R=++m,Z=await Fn();return Z&&R===m&&(x(),A({setupOpen:!1,panelView:"settings",settingsTab:["audio","interaction","prompt","models","advanced","sessions","pets"].includes(w)?w:"audio",settingsModelTab:_,sessionManagementRoot:null,sessionHistoryOpen:!1}),Je({settings:!0})),Z&&R===m},readOperationLog:Wd,manageSessions:Kd,listExistingVoiceSessions:Jd,retryVoiceTranscript:hr,setExistingVoiceSession:Yd,setSettingsTab(w){w!==s.settingsTab&&A({settingsTab:w,sessionManagementRoot:null,sessionHistoryOpen:!1})},setSettingsModelTab(w){A({settingsModelTab:w})},setSessionManagement({rootId:w=s.sessionManagementRoot,historyOpen:_}){A({sessionManagementRoot:w,sessionHistoryOpen:_})},senseVoiceAsrAction:Qd,updateAction:Ln,dismissUpdate(w){w&&A({dismissedUpdateVersion:w})},openSetup(){++m,x(),A({setupOpen:!0}),Je({settings:!0,force:!0}),!L&&!s.busy&&(async()=>{let w=z;await Qe.run(w,"read-settings")&&z===w&&await Qe.run(w,"status")})()},cancelPreview:Fn,discardDiagnostics:x,refreshAuthorization:nt,saveAuthorization:ep,openAuthorization:()=>nt({open:!0}),closeAuthorization({resumeSetup:w=!1}={}){return!s.authorizationBusy&&!s.authorizationLoading?(Ot=!w,++m,yr=m,A({authorizationOpen:!1,setupOpen:w}),w&&Je({settings:!0}),!0):!1},async run(w,_,R={},Z=!1){if(!S||et&&_==="status"||(et||s.existingSessionUnconfirmed)&&["enable","new","resume"].includes(_))return!1;let H=!!(Z&&Rn.has(_)&&!s.uncertain&&s.checkedFor===w&&s.settingsFor===w&&s.status&&s.settings);if(H&&v.has(_))return!1;if(Z||y(),_==="read-history"){if(z!==w||s.conversationHistoryLoading)return!1;let q=++r,Ce=T,ln=G;A({conversationHistoryLoading:!0,conversationHistoryError:null,conversationHistoryRequestCursor:R.cursor??null});try{let Xe=await fn(w,{action:_,...R});if(!S||z!==w||Ce!==T||q!==r||ln!==G||s.conversation?.rootSessionId&&(s.conversation.rootSessionId!==Xe.rootSessionId||Xe.scope!=="voice-session"&&s.conversation.historyGeneration!==Xe.generation))return!1;let An=s.conversationHistory;if(R.cursor&&(!An||An.generation!==Xe.generation||An.rootSessionId!==Xe.rootSessionId))return!1;let bo=new Map(Xe.items.map(hn=>[hn.id,hn]));if(R.cursor)for(let hn of An.items)bo.set(hn.id,hn);if(s.conversation?.rootSessionId===Xe.rootSessionId)for(let hn of s.conversation?.items??[])bo.set(hn.id,hn);let Bt=[...bo.values()].sort((hn,wr)=>hn.at-wr.at),wo=R.cursor?Bt.slice(0,4e3):Bt.slice(-4e3),Fi=wo.reduce((hn,wr)=>hn+wr.text.length,0),Ui=Bt.length>4e3;for(;Fi>4*1024*1024;)Fi-=(R.cursor?wo.pop():wo.shift()).text.length,Ui=!0;return A({conversationHistory:{...Xe,items:wo,truncated:Xe.truncated||Ui||!!(R.cursor&&An?.truncated)},conversationHistoryFor:w}),!0}catch(Xe){return q===r&&A({conversationHistoryError:String(Xe?.message??Xe)}),!1}finally{q===r&&A({conversationHistoryLoading:!1})}}if(_==="apply-model-install"&&["save-models","save-tts"].some(q=>c.has(q)))return A({error:"\u8BF7\u5148\u4FDD\u5B58\u6216\u653E\u5F03\u6A21\u578B\u8BBE\u7F6E\u8349\u7A3F\uFF0C\u518D\u5207\u6362\u6A21\u578B\u3002"}),!1;if(_==="read-audio-devices")return Vd(w);if(_==="inspect-performance")return jd(w);if(_==="cancel-tts"){if(U)return Fn();try{let q=await fn(w,{action:_});return A({ttsPreview:q,ttsPreviewFor:w}),q.status==="unconfirmed"?(ie({uncertain:!0,error:"\u65E0\u6CD5\u786E\u8BA4\u6717\u8BFB\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B\u3002"}),!1):!0}catch(q){return ie({error:String(q?.message??q),uncertain:!0}),!1}}let ee=_==="disable"&&f&&!p;if(s.busy&&!ee||s.ttsCancelling||s.settingsConflict&&ao.includes(_)||s.agentPermissionUncertain&&_==="save-agent-permissions"||s.agentRequestUncertain&&_==="decide-agent-request"||s.ttsUncertain&&!St.includes(_)&&_!=="disable"||s.visibilityUncertain&&!St.includes(_)||s.outputVolumeUncertain&&_==="set-output-volume"||s.installerUncertain&&["start-model-install","control-model-install","apply-model-install"].includes(_))return!1;if(!w&&(w!==null||!Gu.has(_)))return A({error:"\u6B64\u64CD\u4F5C\u9700\u8981\u4F1A\u8BDD\u6765\u6E90"}),!1;let _e;if(ee&&(f.stale=!0,Rn.has(f.action)&&f.abort.abort(),_e=p=Symbol("diagnostic-stop")),!St.includes(_)){ut();for(let q of Rn)Tn(q)}(ao.includes(_)||lo.includes(_)&&_!=="status")&&It({clear:_!=="set-performance-mode"});let ye;(bh.includes(_)||Rn.has(_))&&(ye={id:w,action:_,abort:new AbortController,stale:!1},H?v.set(_,ye):f=ye),H||(b++,A({busy:!0,error:null,..._==="enable"?{enableError:null}:{},..._==="save-bindings"?{bindingError:null}:{},interruptibleRead:f?.action??null,diagnosticStopPending:!!p,..._==="listen-mode"?{listenModePending:R.mode,listenModeBefore:s.conversation?.helper?.listenMode??s.status?.listenMode}:{},..._!=="status"&&lo.includes(_)?{listenModeError:!1}:{}}));let Be,en=T,Cn=so(s.status),bn=s.checkedFor,Nn=Ee;try{if(ye?.stale)return!1;let q;if(["read-output-volume","set-output-volume"].includes(_)){if(!k)throw new Error("\u8BED\u97F3\u8F93\u51FA\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let Ce=ye?.abort??new AbortController;ue.add(Ce);let ln;try{let Xe=_==="read-output-volume"?k.readVolume(w,Ce.signal):k.setVolume(w,R,Ce.signal),An=_==="read-output-volume"?await Promise.race([Xe,new Promise((bo,Bt)=>{ln=()=>Bt(new Error("Read cancelled")),Ce.signal.addEventListener("abort",ln,{once:!0})})]):await Xe;q=Bn("output-volume",An)}finally{Ce.signal.removeEventListener("abort",ln),ue.delete(Ce)}}else{if(_==="preview-tts"&&(Be={id:w,abort:new AbortController,cancelled:!1},U=Be,A({ttsPreview:{status:"preparing"},ttsPreviewFor:w})),Rn.has(_)){let Ce,ln=new Promise((Xe,An)=>{Ce=()=>An(new Error("Read cancelled")),ye.abort.signal.addEventListener("abort",Ce,{once:!0})});try{q=await Promise.race([fn(w,{...R,action:_},ye.abort.signal),ln])}finally{ye.abort.signal.removeEventListener("abort",Ce)}}else q=await fn(w,{...R,action:_},Be?.abort.signal??ye?.abort.signal);if(ye?.stale)return!1}if(ye?.stale||St.includes(_)&&(!S||en!==T))return!1;if(Rn.has(_)&&Tn(_),["agent-permissions","save-agent-permissions"].includes(_)&&A({agentPermissions:q,agentPermissionsFor:w,agentPermissionUncertain:!1}),["agent-requests","decide-agent-request"].includes(_)&&(A({agentRequests:q,agentRequestsFor:w,agentRequestUncertain:!1}),_==="decide-agent-request"&&q.lastOutcome?.state==="completed"&&(A({checkedFor:null}),Je({settings:!0,force:!0})),_==="decide-agent-request"&&q.lastOutcome?.state==="unknown"&&A({uncertain:!0,error:"\u64CD\u4F5C\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u5148\u8BFB\u53D6\u5B9E\u9645\u72B6\u6001\uFF0C\u4E0D\u8981\u91CD\u8BD5\u3002"})),lo.includes(_)){if(_==="listen-mode"){if(z!==w||en!==T)return!1;if(q.listenMode!==R.mode)throw new Error("\u8BF4\u8BDD\u65B9\u5F0F\u7684\u56DE\u6267\u5C1A\u672A\u786E\u8BA4")}if(en!==T)return!0;if(["status","disable"].includes(_)&&q.ttsRuntime){let Xe=!!(q.ttsRuntime.blocked||s.ttsUncertain&&(q.ttsRuntime.busy||Nn!==Ee));q.ttsRuntime.blocked&&Ee++,A({ttsUncertain:Xe}),!Xe&&!q.ttsRuntime.busy&&!K&&U?.cancelled&&(U=null)}let Ce=s.visibilityUncertain&&!(_==="status"&&s.visibilityReadbackFor===w),ln=Object.hasOwn(q,"existingVoiceSession");!ln&&Object.hasOwn(s.status??{},"existingVoiceSession")&&(q={...q,existingVoiceSession:s.status.existingVoiceSession,existingVoiceSessionSupported:s.status.existingVoiceSessionSupported}),A({status:q,checkedFor:w,uncertain:Ce,visibilityUncertain:Ce,...Ce?{}:{visibilityReadbackFor:null},...H?{error:null}:{},...z===w?{sourcePending:!1}:{},..._==="status"&&ln?{existingSessionUnconfirmed:!1}:{},..._==="listen-mode"?{listenModeReceiptRevision:s.conversation?.revision??null}:{}}),Ke&&(!q.enabled||q.existingVoiceSession?.sessionId!==Ke.sessionId)&&zn(),["predecessor-cleanup-pending","helper-cleanup-pending"].includes(q.voiceSession?.recovery?.kind)?Mi(w):ut()}if(Hu.includes(_)&&(_!=="read-settings"&&en===T&&(c.delete(_),A({settingsDraftActions:[...c]})),_==="read-settings"&&c.size>0&&s.settingsFor===w&&s.settings?.revision!==q.revision?(l=q,A({settingsConflict:!0})):(l=null,A({settings:q,settingsFor:w,settingsConflict:!1,settingsKey:c.size>0?s.settingsKey:q.revision})),q.onboarding&&Tn("setup-status"),A({...q.onboarding?{setupStatus:q.onboarding,setupError:null}:{},..._==="read-settings"&&s.visibilityUncertain&&["hidden","workspace"].includes(q.voiceSession?.visibility)?{visibilityReadbackFor:w}:{}})),_==="read-settings"&&s.visibilityUncertain&&He(w,"status"),_==="conversation-models"&&A({conversationModels:q,conversationModelsFor:w,conversationModelsError:null}),_==="inspect-tts"&&A({ttsCapabilities:q,ttsCapabilitiesFor:w}),_==="preview-tts"&&!Be.cancelled&&A({ttsPreview:{...q,status:q.textOnly===!0?"text-only":"completed"},ttsPreviewFor:w}),["read-output-volume","set-output-volume"].includes(_)&&A({outputVolume:q,outputVolumeFor:w,outputVolumeUncertain:!1}),["save-voice-prompt","save-conversation-model","set-visibility","set-performance-mode","save-tts","apply-model-install"].includes(_)&&(A({status:null,checkedFor:null,catalog:null,catalogFor:null}),Je({force:!0})),_==="plan-model-install"&&A({installPlan:q,installPlanFor:w,installPlanRequest:{...R}}),_==="model-installer"&&(A({installer:q,installerFor:w,installerUncertain:!!s.installerTerminationUnconfirmed}),z===w&&!F&&(F=!0,ct(!0))),_==="inspect-model-compute"&&s.installerFor===w&&s.installer&&A({installer:{...s.installer,compute:q}}),_==="start-model-install"&&A({installPlan:null,installPlanFor:null}),_==="list"){let Ce=R.cursor&&s.catalogFor===w?s.catalog?.items??[]:[];A({catalog:{...q,items:[...new Map([...Ce,...q.items].map(ln=>[ln.id,ln])).values()]},catalogFor:w})}return["new","resume","listen-mode"].includes(_)&&A({catalog:null}),["new","resume"].includes(_)&&z===w&&en===T&&(r++,A({...i,newChatFor:_==="new"&&R.expectedOwnerSessionId!==void 0?w:void 0})),_==="listen-mode"&&Je({settings:!0,force:!0}),["status","enable","disable","new","resume"].includes(_)&&z===w&&(_!=="status"||bn!==w||Cn!==so(q)||P!==Fe()||s.conversationError)&&Gt(),!0}catch(q){return _==="listen-mode"&&(z!==w||en!==T)||(ye&&(q?.uncertain||/TTS_TERMINATION_UNCONFIRMED/.test(String(q?.code??"")+" "+String(q?.message??"")))&&(_==="inspect-tts"?ie({}):A({installerUncertain:!0,installerTerminationUnconfirmed:!0})),ye?.stale||St.includes(_)&&en!==T)||Be?.cancelled||(_==="status"&&(ut(),z===w&&en===T&&A({sourcePending:!1})),St.includes(_)||(M=null),/AUTHORIZATION_REQUIRED/.test(String(q?.message??q))&&nt({open:!0}),Be&&await Fn(),_==="preview-tts"&&Ee++,_==="enable"&&z===w&&en===T&&A({enableError:String(q?.message??q)+(q?.code?" ["+q.code+"]":"")}),_==="listen-mode"&&z===w&&en===T&&A({listenModeError:!0}),A({error:String(q?.message??q),..._==="conversation-models"?{conversationModelsError:String(q?.message??q),conversationModels:null,conversationModelsFor:w}:{},..._==="save-bindings"?{bindingError:String(q?.message??q)+(q?.code?" ["+q.code+"]":"")}:{},..._==="save-agent-permissions"?{agentPermissionUncertain:!0}:{},..._==="decide-agent-request"?{agentRequestUncertain:!0}:{},..._==="preview-tts"?{ttsPreviewFor:w,ttsUncertain:!0}:{},..._==="set-output-volume"?{outputVolumeUncertain:!0}:{},...ao.includes(_)?{uncertain:!0,visibilityUncertain:!0,visibilityReadbackFor:null}:{},...["start-model-install","control-model-install"].includes(_)?{installerUncertain:!0}:{},...lo.includes(_)?{uncertain:!0,readOnlyFailure:_==="status"&&(!s.uncertain||s.readOnlyFailure===!0)}:{}}),Rn.has(_)&&He(w,_),ao.includes(_)?(He(w,"read-settings"),He(w,"status")):lo.includes(_)&&_!=="status"?He(w,"status"):_==="set-output-volume"?He(w,"read-output-volume"):_==="save-agent-permissions"?He(w,"agent-permissions"):_==="decide-agent-request"?He(w,"agent-requests"):["start-model-install","control-model-install"].includes(_)&&He(w,"model-installer")),!1}finally{v.get(_)===ye&&v.delete(_),Be&&U===Be&&!Be.cancelled&&(U=null),ye&&f===ye&&(f=null),_e&&p===_e&&(p=null),H||(b--,A({busy:b>0,interruptibleRead:f?.action??null,diagnosticStopPending:!!p,..._==="listen-mode"?{listenModePending:null}:{}})),queueMicrotask(()=>{yo(),pt()})}},dispose(){if(S){T++,vr(),c.clear(),l=null,A({settingsConflict:!1,settingsDraftActions:[]}),It({clear:!0}),ho({clear:!0}),ut(),Fn(),x(),f?.abort.abort(),at(),S=!1,G++,V++,X?.(),N?.();for(let w of ue)w.abort();ue.clear(),de.clear()}}},Qe}function co(e,n,t,o=12){let r=n.left+o,i=n.top+o;return{x:Math.max(r,Math.min(e.x,Math.max(r,n.right-t.width-o))),y:Math.max(i,Math.min(e.y,Math.max(i,n.bottom-t.height-o)))}}function Wu(e=window){let n=null,t=null,o=null,r=null,i=null,s=null,c=null,l=null,u=null,d=()=>e.performance?.now?.()??Date.now(),m=e.matchMedia?.("(prefers-reduced-motion: reduce)"),f=()=>{l!==null&&e.cancelAnimationFrame?.(l),l=null,u&&(u=null,S("endDrag"))},p=P=>{if(l=null,!u||!n)return;if(m?.matches||n.dataset?.motion==="off"){f();return}let N=Math.max(0,P-u.time);u.time=P;let G={...r},V=!1;for(let F of["x","y"]){let U=u[F],K=(U.target-r[F])*Math.exp(-N/U.tau);G[F]=Math.abs(K)<.5?U.target:U.target-K,G[F]!==U.target&&(V=!0)}r=co(G,i.box,i.size),v(),S("move");for(let F of["x","y"])Math.abs(r[F]-G[F])>.01&&(u[F].target=r[F]);!V||P-u.start>=2400?f():l=e.requestAnimationFrame(p)},b=(P,N)=>{n.style[P]!==N&&(n.style[P]=N)},v=()=>{b("left",`${r.x}px`),b("top",`${r.y}px`)},y=null,x=null,L="",M=()=>{let P=(n?.closest("[data-shell-overlay]")??n?.ownerDocument?.querySelector?.("[data-shell-overlay]"))?.getBoundingClientRect(),N=e.visualViewport,G=Math.max(P?.left??0,N?.offsetLeft??0),V=Math.max(P?.top??0,N?.offsetTop??0),F=Math.min(P?.right??e.innerWidth,(N?.offsetLeft??0)+(N?.width??e.innerWidth)),U=Math.min(P?.bottom??e.innerHeight,(N?.offsetTop??0)+(N?.height??e.innerHeight)),K=parseFloat(e.getComputedStyle(n).getPropertyValue("--dsh-frame-top-clearance"))||0;return{left:G,top:V+K,right:F,bottom:U}},B=P=>{if(!n)return;let N=Number.isFinite(P?.width)&&Number.isFinite(P?.height),G=N&&i?i.box:M();b("maxWidth",`${Math.max(1,G.right-G.left-24)}px`),b("maxHeight",`${Math.max(1,G.bottom-G.top-24)}px`);let V=N?P:n.getBoundingClientRect();i={box:G,size:{width:V.width,height:V.height}},r=co(r??{x:G.right-V.width-20,y:G.bottom-V.height-20},G,V),v(),!o&&!u&&S("resize")},C=()=>{c!==null&&e.cancelAnimationFrame?.(c),c=null},I=()=>{C();let P=s;s=null,!(!o||!n||!P)&&(r=co(P,i.box,i.size),v(),S("move"))},T=P=>{n?.dataset&&(P&&["left","right","top","bottom"].includes(P.edge)&&["preview","docked"].includes(P.phase)?(n.dataset.whaleDockEdge=P.edge,n.dataset.whaleDockPhase=P.phase):(delete n.dataset.whaleDockEdge,delete n.dataset.whaleDockPhase))},E=()=>{let P=x;x=null;try{P?.dispose()}catch{}T(null),n&&(n.style.zIndex=L)},S=P=>{try{typeof x?.[P]=="function"&&x[P]()}catch{E()}},k=()=>{if(E(),!(!n||y?.version!==1||typeof y.register!="function"))try{x=y.register({id:"whale-voice",read(){let{box:P,size:N}=i;return{rect:{...r,width:N.width,height:N.height},bounds:{x:P.left+12,y:P.top+12,width:Math.max(1,P.right-P.left-24),height:Math.max(1,P.bottom-P.top-24)},collapsed:n.hasAttribute?.("data-collapsed")===!0}},apply(P){!n||!Number.isFinite(P?.x)||!Number.isFinite(P?.y)||(r=co(P,i.box,i.size),v())},onDock:T,onFront:P=>{n&&(n.style.zIndex=P===!0?"901":"900")}}),["beginDrag","move","endDrag","resize","detach","dispose"].every(P=>typeof x?.[P]=="function")||E()}catch{E()}},z=(P=!1,N=!1)=>{P?I():(C(),s=null);let G=o;o=null,G?.target.hasPointerCapture?.(G.id)&&G.target.releasePointerCapture(G.id);let V=d(),F=G?.samples??[],U=F.at(-1),K=F[0],de=U&&K?U.time-K.time:0,ue=U?V-U.time:1/0,Q=Math.max(0,1-Math.max(0,ue-24)/56),j=de>0?(U.x-K.x)/de*Q:0,A=de>0?(U.y-K.y)/de*Q:0;if(G&&N&&!m?.matches&&n?.dataset?.motion!=="off"&&typeof e.requestAnimationFrame=="function"&&Math.hypot(j,A)>.04){let ne=co({x:r.x+j*240,y:r.y+A*240},i.box,i.size),pe=(ge,Ge)=>({target:ne[ge],tau:Ge?Math.max(1,Math.abs((ne[ge]-r[ge])/Ge)):240});u={x:pe("x",j),y:pe("y",A),time:V,start:V},l=e.requestAnimationFrame(p)}else G&&S(P?"endDrag":"detach")},X=()=>{f(),z(),E(),t?.disconnect(),t=null,e.removeEventListener("resize",B),e.visualViewport?.removeEventListener("resize",B),e.visualViewport?.removeEventListener("scroll",B),n=null,i=null};return{ref(P){if(P===n||(X(),!P))return;n=P,L=P.style.zIndex||"",n.style.transitionProperty="none",t=new e.ResizeObserver(G=>{let V=G?.find?.(U=>U.target===n),F=V?.borderBoxSize?.[0]??V?.borderBoxSize;Number.isFinite(F?.inlineSize)&&Number.isFinite(F?.blockSize)&&G.every(U=>U.target===n)?B({width:F.inlineSize,height:F.blockSize}):B()}),t.observe(n);let N=n.closest("[data-shell-overlay]")??n.ownerDocument?.querySelector?.("[data-shell-overlay]");N&&t.observe(N),e.addEventListener("resize",B),e.visualViewport?.addEventListener("resize",B),e.visualViewport?.addEventListener("scroll",B),B(),k()},useLayoutService(P){return y=P,k(),()=>{y===P&&(E(),y=null,B())}},activate(){f(),S("activate")},pointerDown(P,N=P.currentTarget){P.button!==0||P.pointerType&&P.pointerType!=="mouse"||!n||(f(),B(),S("beginDrag"),o={id:P.pointerId,target:N,x:P.clientX,y:P.clientY,start:{...r},samples:[{x:P.clientX,y:P.clientY,time:d()}]},N.setPointerCapture(P.pointerId),P.preventDefault())},pointerMove(P){if(!o||P.pointerId!==o.id)return;let N=d(),G=[P];try{G=[...P.getCoalescedEvents?.()??[],P]}catch{}for(let K of G){if(!Number.isFinite(K.clientX)||!Number.isFinite(K.clientY))continue;let de=Number.isFinite(K.timeStamp)&&Number.isFinite(P.timeStamp)?Math.min(0,K.timeStamp-P.timeStamp):0,ue=N+Math.max(-60,de),Q=o.samples.at(-1);if(ue<Q.time)continue;let j={x:K.clientX,y:K.clientY,time:ue};ue===Q.time?o.samples[o.samples.length-1]=j:o.samples.push(j)}let V=N-60;for(;o.samples.length>2&&o.samples[1].time<=V;)o.samples.shift();let F=o.samples[0],U=o.samples[1];if(U&&F.time<V&&U.time>V){let K=(V-F.time)/(U.time-F.time);o.samples[0]={x:F.x+(U.x-F.x)*K,y:F.y+(U.y-F.y)*K,time:V}}s={x:o.start.x+P.clientX-o.x,y:o.start.y+P.clientY-o.y},typeof e.requestAnimationFrame!="function"?I():c===null&&(c=e.requestAnimationFrame(I))},pointerEnd(P){P.pointerId===o?.id&&z(!["pointercancel","lostpointercapture"].includes(P.type),P.type==="pointerup")},keyDown(){},fit:B,dispose:X}}var Ci=Object.freeze({panel:320,settings:660,setup:420,collapsed:216});function Ku(e=window,{onResize:n=()=>{}}={}){let t=null,o=null,r=null,i=null,s=null,c=null,l=null,u=null,d=null,m=null,f=null,p=null,b=null,v=null,y=null,x=null,L={width:0,height:0},M=e.matchMedia?.("(prefers-reduced-motion: reduce)"),B=()=>M?.matches?"off":t?.dataset.motion??"spring",C=P=>Number.parseFloat(P)||0;function I(){let P=e.visualViewport,N=(t.closest?.("[data-shell-overlay]")??t.ownerDocument?.querySelector?.("[data-shell-overlay]"))?.getBoundingClientRect(),G=Math.max(N?.left??0,P?.offsetLeft??0),V=Math.max(N?.top??0,P?.offsetTop??0),F=Math.min(N?.right??e.innerWidth,(P?.offsetLeft??0)+(P?.width??e.innerWidth)),U=Math.min(N?.bottom??e.innerHeight,(P?.offsetTop??0)+(P?.height??e.innerHeight)),K=e.getComputedStyle(t);return{width:Math.max(1,F-G-24),height:Math.max(1,Math.min((U-V)*.6,U-V-24-C(K.getPropertyValue("--dsh-frame-top-clearance")))),chrome:C(K.paddingTop)+C(K.paddingBottom)+C(K.borderTopWidth)+C(K.borderBottomWidth),horizontalChrome:C(K.paddingLeft)+C(K.paddingRight)+C(K.borderLeftWidth)+C(K.borderRightWidth),panelRadius:C(K.getPropertyValue("--dsw-radius-lg"))||12}}function T(){l!==null&&e.cancelAnimationFrame(l),l=null,d=null}function E(){!t||!m||(m.width=Math.max(1,Math.min(m.width,p.width)),m.height=Math.max(1,Math.min(m.height,p.height)),t.style.width=`${m.width.toFixed(3)}px`,t.style.height=`${m.height.toFixed(3)}px`,t.style.setProperty?.("--whale-visible-content",`${Math.max(1,m.height-p.chrome)}px`),x===null?t.style.removeProperty?.("--whale-animated-radius"):t.style.setProperty?.("--whale-animated-radius",`${x.toFixed(2)}px`),n({width:m.width,height:m.height}))}function S(P){if(l=null,!t||!f)return;let N=Math.min(.032,Math.max(.001,d===null?1/60:(P-d)/1e3));d=P;let G=y?560:B()==="firm"?420:360,V=y?47.4:B()==="firm"?41:30,F=!0;for(let U of["width","height"]){for(let K=0;K<4;K++)L[U]+=(G*(f[U]-m[U])-V*L[U])*N/4,m[U]+=L[U]*N/4;(Math.abs(f[U]-m[U])>.25||Math.abs(L[U])>1)&&(F=!1)}if(y){let U=f.height-y.height,K=Math.abs(U)>.25?Math.max(0,Math.min(1,(m.height-y.height)/U)):1,de=b?f.height/2:p.panelRadius;x=y.radius+(de-y.radius)*K}(F||B()==="off")&&(m={...f},L={width:0,height:0},d=null,y=x=null),E(),!F&&B()!=="off"&&(l=e.requestAnimationFrame(S))}function k(){if(!t||!o)return;p=I(),t.dataset.compactHeight=p.height<300?"true":"false";let P=t.hasAttribute("data-collapsed")&&t.dataset.collapsed!=="false";if(m&&b!==null&&P!==b){let ge=x??(b?m.height/2:p.panelRadius);y={height:m.height,radius:ge},x=ge,t.style.setProperty?.("--whale-animated-radius",`${ge.toFixed(2)}px`),L={width:0,height:0}}let N=t.dataset.view,G=t.dataset.sourcePending&&N==="home"&&v===N&&!P&&b===P?f?.height:void 0;b=P,v=N;let V=Math.min(p.width,P?Ci.collapsed:Ci[N]??Ci.panel);t.style.boxSizing="border-box",t.style.transitionProperty="none",t.style.overflow="hidden",t.style.maxWidth=`${p.width}px`,t.style.maxHeight=`${p.height}px`;let F=Math.max(1,p.height-p.chrome);o.style.width=`${Math.max(1,V-p.horizontalChrome)}px`,o.style.maxHeight=`${F}px`,o.style.overflowY="hidden",o.style.minHeight="0",t.style.setProperty?.("--whale-content-limit",`${F}px`);let U=!!o.querySelector?.('[data-size-detail="true"]'),K=P?null:N==="setup"?o.querySelector?.("[data-whale-intrinsic]"):N==="home"&&!U?o.querySelector?.("[data-home-controls]"):null,de=K?.querySelector?.("[data-whale-natural-content]"),ue=de??K;N==="setup"&&!P&&(o.style.height="auto"),ue!==c&&(s?.disconnect(),u!==null&&e.cancelAnimationFrame(u),u=null,s=null,c=ue,c&&e.ResizeObserver&&(s=new e.ResizeObserver(()=>{u===null&&(u=e.requestAnimationFrame(()=>{u=null,k()}))}),s.observe(c)));let Q=K?.getBoundingClientRect?.().height,j=de?Math.max(0,de.offsetHeight-de.parentElement.clientHeight):0,A=Q+j,ne=P?44:A>0?Math.ceil(A+p.chrome):N==="home"?U?520:320:480,pe=Math.min(p.height,G??ne);(N!=="setup"||P)&&(o.style.height=`${Math.max(1,pe-p.chrome)}px`),f={width:V,height:pe},!m||B()==="off"?(T(),m={...f},L={width:0,height:0},y=x=null,E()):l===null&&(Math.abs(m.width-V)>.25||Math.abs(m.height-pe)>.25)&&(d=e.performance?.now?.()??null,l=e.requestAnimationFrame(S))}function z(){T(),r?.disconnect(),i?.disconnect(),s?.disconnect(),u!==null&&e.cancelAnimationFrame(u),u=null,s=c=null,e.removeEventListener("resize",k),e.visualViewport?.removeEventListener("resize",k),e.visualViewport?.removeEventListener("scroll",k),M?.removeEventListener?.("change",k),r=i=null}function X(){if(z(),!(!t||!o)){if(e.ResizeObserver){r=new e.ResizeObserver(k);let P=t.closest?.("[data-shell-overlay]")??t.ownerDocument?.querySelector?.("[data-shell-overlay]");P&&r.observe(P)}e.MutationObserver&&(i=new e.MutationObserver(k),i.observe(t,{attributes:!0,attributeFilter:["data-view","data-motion","data-collapsed","data-source-pending"]}),i.observe(o,{attributes:!0,attributeFilter:["data-size-detail","data-home-layout"],subtree:!0})),e.addEventListener("resize",k),e.visualViewport?.addEventListener("resize",k),e.visualViewport?.addEventListener("scroll",k),M?.addEventListener?.("change",k),k()}}return{ref(P){t!==P&&(t=P,m=f=b=v=y=x=null,L={width:0,height:0},X())},contentRef(P){o!==P&&(o=P,X())},update:k,dispose(){z(),t=o=m=f=null}}}var Ju=["spring","firm","off"];function Yu(e=window){let n="dsh-whale-voice:motion:v1",t="dsh-whale-voice:assistant-name:v1",o=()=>{try{let u=e.localStorage.getItem(t)?.trim();return u&&u.length<=40?u:null}catch{return null}},r=new Set,i=()=>{try{let u=e.localStorage.getItem(n);return Ju.includes(u)?u:"spring"}catch{return"spring"}},s={motion:i(),assistantName:o(),error:null},c=u=>{s=u;for(let d of r)d()},l=u=>{[n,t,null].includes(u.key)&&c({motion:i(),assistantName:o(),error:null})};return e.addEventListener("storage",l),{getSnapshot:()=>s,subscribe(u){return r.add(u),()=>r.delete(u)},setMotion(u){if(!Ju.includes(u))return!1;let d=null;try{e.localStorage.setItem(n,u)}catch{d="storage-unavailable"}return c({...s,motion:u,error:d}),!d},setAssistantName(u){if(typeof u!="string"||!u.trim()||u.trim().length>40)return!1;let d=u.trim(),m=null;try{e.localStorage.setItem(t,d)}catch{m="storage-unavailable"}return c({...s,assistantName:d,error:m}),!m},dispose(){e.removeEventListener("storage",l),r.clear()}}}var wh='button,input,textarea,select,a,label,summary,[role="button"],[role="slider"],[role="tab"],[contenteditable="true"],[data-no-drag]';function Qu(e,n){if(!e||!n?.contains(e))return!1;let t=e.closest?.(wh);return!t||t.hasAttribute("data-drag-surface")}function ed(e){if(e.repeat||e.metaKey)return null;let n=e.code;return!/^(F([1-9]|1[0-9]|2[0-4])|Key[A-Z]|Digit[0-9]|Space)$/.test(n)||e.altKey&&n==="F4"?null:{code:n,modifiers:[e.ctrlKey&&"Control",e.altKey&&"Alt",e.shiftKey&&"Shift"].filter(Boolean)}}var rr=()=>({revision:0,rootSessionId:null,title:null,latest:null,items:[],inputActive:!1,inputError:null,playbackConfirmed:!1}),Ni=()=>({schema:1,hardware:null,compute:{schema:1,default:"cpu",observedAt:null,backends:{},reason:"\u5C1A\u672A\u68C0\u6D4B\u672C\u5730\u8BA1\u7B97\u540E\u7AEF\u3002"},models:[],jobs:[]});async function nd(e,n=()=>{}){let t=await e.remote.$mount(Xu),o,r;try{if(r=e.inject(["remote","remote.whaleConversation"],d=>{o=d.remote.whaleConversation}),await r.await(),!o)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA")}catch(d){throw await r?.dispose(),await t(),d}let i=new Set,s=new Map,c=!1,l=d=>{if(d?.ok!==!0)throw d?.error??new Error("\u8BED\u97F3\u63A5\u53E3\u54CD\u5E94\u65E0\u6548");return d.value},u=async(d,m,f=!0)=>{let p;try{p=await d()}catch(b){throw f&&!c&&n("ui-request","finished",m?.aborted?"cancelled":"failed"),b}return f&&p?.ok!==!0&&p?.error==null&&!m?.aborted&&n("ui-render-error","finished","failed"),l(p)};return{subscribeUpdates(d,m){let f=new AbortController;return i.add(f),Promise.resolve().then(async()=>{if(!f.signal.aborted)try{for await(let p of o.followUpdates(f.signal))f.signal.aborted||d(p);f.signal.aborted||(n("ui-stream","finished","failed"),m())}catch{f.signal.aborted||(n("ui-stream","finished","failed"),m())}finally{i.delete(f)}}),()=>{f.abort(),i.delete(f)}},updateAction(d,m){if(c)throw new Error("\u66F4\u65B0\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.updateAction(d,m),m)},subscribePresentation(d,m){let f=new AbortController;return i.add(f),(async()=>{try{for await(let p of o.followPresentation(f.signal))f.signal.aborted||d(p);f.signal.aborted||(n("ui-stream","finished","failed"),m(new Error("\u4F1A\u8BDD\u663E\u793A\u8FDE\u63A5\u5DF2\u7ED3\u675F")))}catch(p){f.signal.aborted||(n("ui-stream","finished","failed"),m(p))}finally{i.delete(f)}})(),()=>{f.abort(),i.delete(f)}},subscribe(d,m,f=()=>{}){let p=new AbortController;return i.add(p),m(rr(),{initial:!0}),(async()=>{try{for await(let b of o.follow(d,p.signal))p.signal.aborted||m(b);p.signal.aborted||(n("ui-stream","finished","failed"),m(rr(),{initial:!0}),f(new Error("\u8BED\u97F3\u72B6\u6001\u8FDE\u63A5\u5DF2\u7ED3\u675F\uFF0C\u6B63\u5728\u91CD\u65B0\u8FDE\u63A5")))}catch(b){p.signal.aborted||(n("ui-stream","finished","failed"),m(rr(),{initial:!0}),f(b))}finally{i.delete(p)}})(),()=>{p.abort(),i.delete(p),m(rr(),{initial:!0})}},subscribeModels(d,m,f=()=>{}){if(c)return m(Ni(),{initial:!0}),f(new Error("\u6A21\u578B\u8FDB\u5EA6\u63A5\u53E3\u5DF2\u5378\u8F7D")),()=>{};let p=new AbortController,b=!1,v=()=>{b||(b=!0,p.abort(),s.delete(p),m(Ni(),{initial:!0}))};return s.set(p,v),m(Ni(),{initial:!0}),(async()=>{try{for await(let y of o.followModels(d,p.signal))!b&&!c&&!p.signal.aborted&&m(y);!b&&!c&&!p.signal.aborted&&(n("ui-stream","finished","failed"),v(),f(new Error("\u6A21\u578B\u8FDB\u5EA6\u8FDE\u63A5\u5DF2\u7ED3\u675F\uFF0C\u6B63\u5728\u91CD\u65B0\u8FDE\u63A5")))}catch(y){!b&&!c&&!p.signal.aborted&&(n("ui-stream","finished","failed"),v(),f(y))}finally{s.delete(p)}})(),v},async action(d,m,f){if(c)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");let p=await u(()=>o.action(d,m,f),f);try{let b=JSON.parse(p);if(b?.protocol!==1||b.action!==m.action||!b.value||typeof b.value!="object"||Array.isArray(b.value))throw new Error("Fish Voice UI protocol mismatch");return b.value}catch(b){throw n("ui-render-error","finished","failed"),b}},readAuthorization:d=>u(()=>o.readAuthorization(d),d),saveAuthorization:(d,m)=>u(()=>o.saveAuthorization(d,m),m),async senseVoiceAsrAction(d,m){if(c)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.senseVoiceAsrAction(d,m),m)},async manageSessions(d,m,f){if(c)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");return JSON.parse(await u(()=>o.manageSessions(d,m,f),f))},listExistingVoiceSessions(d,m){if(c)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.listExistingVoiceSessions(d,m),m)},setExistingVoiceSession(d,m){if(c)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.setExistingVoiceSession(d,m),m)},retryVoiceTranscript(d,m){if(c)throw new Error("\u8BED\u97F3\u91CD\u53D1\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.retryVoiceTranscript(d,m),m)},readClientOperationScope(d){if(c)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.readClientOperationScope(d),d,!1)},recordClientOperations(d,m){if(c)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.recordClientOperations(d,m),m,!1)},readOperationLog(d,m){if(c)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.readOperationLog(d,m),m,!1)},readSetup:d=>u(()=>o.readSetup(d),d),readVolume:(d,m)=>u(()=>o.readVolume(d,m),m),setVolume:(d,m,f)=>u(()=>o.setVolume(d,m,f),f),async dispose(){c=!0;for(let d of[...s.values()])d();s.clear();for(let d of i)d.abort();i.clear(),await r.dispose(),await t()}}}var rd=new Set(nr),id=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,td=256,Ai="dsh-fish-voice.pending-operation-log.v1",Ei="ui-buffer-overflow";function xh(){let e=globalThis.crypto;if(e?.randomUUID)return e.randomUUID();let n=e?.getRandomValues(new Uint8Array(16));if(!n)return null;n[6]=n[6]&15|64,n[8]=n[8]&63|128;let t=Array.from(n,o=>o.toString(16).padStart(2,"0")).join("");return[t.slice(0,8),t.slice(8,12),t.slice(12,16),t.slice(16,20),t.slice(20)].join("-")}function _h(){try{return globalThis.sessionStorage}catch{return}}function od(e,n=!1){if(!e||typeof e.id!="string"||!id.test(e.id)||!Number.isSafeInteger(e.at)||e.at<0||!rd.has(e.action)||!["user","ui"].includes(e.source)||n!==(e.action===Ei)||n&&(e.source!=="ui"||!Number.isSafeInteger(e.count)||e.count<1))return null;let{id:t,at:o,action:r,source:i}=e;return{id:t,at:o,action:r,source:i,...n?{count:e.count}:{},...["requested","finished"].includes(e.phase)?{phase:e.phase}:{},...["ok","failed","cancelled"].includes(e.result)?{result:e.result}:{}}}function sd({schedule:e=setTimeout,unschedule:n=clearTimeout,now:t=Date.now,identify:o=xh,storage:r=_h()}={}){let i=[],s=null,c=null,l=null,u=!1,d,m,f,p=0,b=!1,v=()=>{m!==void 0&&(n(m),m=void 0)},y=k=>k&&k.at>=t()-Tu,x=()=>{i=i.filter(y),y(s)||(s=null),y(c)||(c=null)},L=()=>i.length>0||s!==null||c!==null,M=()=>{if(!(!l||!r))try{L()?r.setItem(Ai,JSON.stringify({scope:l,pending:i,overflow:s,dropped:c})):r.removeItem(Ai)}catch{}},B=(k,z)=>{c={count:Math.min(Number.MAX_SAFE_INTEGER,(c?.count??0)+k),at:Math.max(c?.at??0,z)}},C=k=>{i.length>=td?B(1,k.at):i.push(k)},I=k=>{if(l===null){let z;try{z=JSON.parse(r?.getItem(Ai)??"null")}catch{}if(z?.scope===k){let X=i,P=c,N=Array.isArray(z.pending)?z.pending.slice(0,td).map(G=>od(G)).filter(y):[];i=[...new Map(N.map(G=>[G.id,G])).values()],s=od(z.overflow,!0),c=z.dropped&&Number.isSafeInteger(z.dropped.count)&&z.dropped.count>0&&Number.isSafeInteger(z.dropped.at)&&y(z.dropped)?{count:z.dropped.count,at:z.dropped.at}:null,P&&B(P.count,P.at);for(let G of X)y(G)&&C(G)}}else l!==k&&(i=[],s=null,c=null);l=k,u=!0,x(),M()},T=(k=160)=>{b||f||m!==void 0||u&&!L()||!d?.readClientOperationScope||!d?.recordClientOperations||(m=e(()=>{m=void 0,E()},k),m?.unref?.())};async function E(){let k=new AbortController,z=d;f=k;let X=()=>!b&&d===z&&f===k;try{let P=AbortSignal.any([k.signal,AbortSignal.timeout(1e4)]);if(!u){let F=await z.readClientOperationScope(P);if(!X())return;if(typeof F?.scope!="string"||!id.test(F.scope))throw new Error("Operation scope unavailable");I(F.scope)}if(x(),!s&&c){let F=o();F&&(s={id:F,at:c.at,action:Ei,source:"ui",phase:"finished",count:c.count},c=null)}M();let N=s?[s,...i.slice(0,ro-1)]:i.slice(0,ro);if(!N.length)return;let G=await z.recordClientOperations({scope:l,events:N},P);if(!X())return;if(G?.accepted!==!0)throw new Error("Operation batch was not accepted");let V=new Set(N.map(F=>F.id));i=i.filter(F=>!V.has(F.id)),s&&V.has(s.id)&&(s=null),p=0,M()}catch{X()&&(u=!1,p++)}finally{X()&&(f=void 0,T(p?Math.min(3e4,750*2**Math.min(p-1,6)):160))}}function S(k,z,X,P){if(b||!rd.has(k)||k===Ei)return;let N;try{N=o()}catch{return}N&&(x(),C({id:N,at:t(),action:k,source:z,...X?{phase:X}:{},...P?{result:P}:{}}),M(),T())}return{user(k){S(k,"user")},internal(k,z,X){S(k,"ui",z,X)},attach(k){d===k||b||(v(),f?.abort(),f=void 0,d=k,u=!1,p=0,T(0))},dispose(){b=!0,v(),f?.abort(),i=[],s=null,c=null}}}var Gd=require("react-dom");var Ze=require("react"),ir=require("@deepseek-ai/dsh-client-ui-primitives");var h={quickSpeedHeader:"XTLPyG_quickSpeedHeader",requestDetails:"XTLPyG_requestDetails",assistantNameInput:"XTLPyG_assistantNameInput",bubbleBrand:"XTLPyG_bubbleBrand",settingsBrand:"XTLPyG_settingsBrand",authorizationActions:"XTLPyG_authorizationActions",transcriptRetries:"XTLPyG_transcriptRetries",fullName:"XTLPyG_fullName",keyBindingRow:"XTLPyG_keyBindingRow",audioDeviceHint:"XTLPyG_audioDeviceHint",whalePageEnter:"XTLPyG_whalePageEnter",bindingEditor:"XTLPyG_bindingEditor",currentModel:"XTLPyG_currentModel",notice:"XTLPyG_notice",audioDeviceField:"XTLPyG_audioDeviceField",settingsLayout:"XTLPyG_settingsLayout",panelContent:"XTLPyG_panelContent",settingsBody:"XTLPyG_settingsBody",voicePromptInput:"XTLPyG_voicePromptInput",quickSegments:"XTLPyG_quickSegments",existingSessionTarget:"XTLPyG_existingSessionTarget",deviceSelect:"XTLPyG_deviceSelect",caption:"XTLPyG_caption",keyBinding:"XTLPyG_keyBinding",sessionRename:"XTLPyG_sessionRename",historyScope:"XTLPyG_historyScope",audioDeviceGrid:"XTLPyG_audioDeviceGrid",existingSessionList:"XTLPyG_existingSessionList",homeTargetPicker:"XTLPyG_homeTargetPicker",placeholder:"XTLPyG_placeholder",backIcon:"XTLPyG_backIcon",panelViewport:"XTLPyG_panelViewport",settingsNav:"XTLPyG_settingsNav",motionPreview:"XTLPyG_motionPreview",existingSessionPicker:"XTLPyG_existingSessionPicker",voicePromptCount:"XTLPyG_voicePromptCount",error:"XTLPyG_error",headerActions:"XTLPyG_headerActions",popover:"XTLPyG_popover",backButton:"XTLPyG_backButton",whalePreview:"XTLPyG_whalePreview",primary:"XTLPyG_primary",pathRow:"XTLPyG_pathRow",mainAction:"XTLPyG_mainAction",authorizationSteps:"XTLPyG_authorizationSteps",statusRow:"XTLPyG_statusRow",volumeControl:"XTLPyG_volumeControl",header:"XTLPyG_header",voiceTarget:"XTLPyG_voiceTarget",note:"XTLPyG_note",iconButton:"XTLPyG_iconButton",bindingActions:"XTLPyG_bindingActions",transcriptRetryList:"XTLPyG_transcriptRetryList",whaleSpin:"XTLPyG_whaleSpin",homeTargetRow:"XTLPyG_homeTargetRow",popoverHeader:"XTLPyG_popoverHeader",newChatButton:"XTLPyG_newChatButton",editNotice:"XTLPyG_editNotice",settings:"XTLPyG_settings",recentMessages:"XTLPyG_recentMessages",quickSpeed:"XTLPyG_quickSpeed",updateDialog:"XTLPyG_updateDialog",authorizationBody:"XTLPyG_authorizationBody",agreement:"XTLPyG_agreement",inlineField:"XTLPyG_inlineField",quickActions:"XTLPyG_quickActions",whaleInputPulse:"XTLPyG_whaleInputPulse",message:"XTLPyG_message",pageHeading:"XTLPyG_pageHeading",existingSessionHome:"XTLPyG_existingSessionHome",actions:"XTLPyG_actions",field:"XTLPyG_field",loadHistory:"XTLPyG_loadHistory",settingsPage:"XTLPyG_settingsPage",transcriptRetry:"XTLPyG_transcriptRetry",section:"XTLPyG_section",updateAnnouncement:"XTLPyG_updateAnnouncement",currentDshTarget:"XTLPyG_currentDshTarget",transcriptRetryText:"XTLPyG_transcriptRetryText",status:"XTLPyG_status",conversationChoice:"XTLPyG_conversationChoice",radios:"XTLPyG_radios",voiceStatus:"XTLPyG_voiceStatus",permissionList:"XTLPyG_permissionList",spin:"XTLPyG_spin",voicePromptActions:"XTLPyG_voicePromptActions",whaleEnter:"XTLPyG_whaleEnter",inlineActions:"XTLPyG_inlineActions",capabilityRow:"XTLPyG_capabilityRow",floating:"XTLPyG_floating",authorization:"XTLPyG_authorization",performanceChoice:"XTLPyG_performanceChoice",openOriginal:"XTLPyG_openOriginal",ellipsis:"XTLPyG_ellipsis",settingsHeader:"XTLPyG_settingsHeader",guideButton:"XTLPyG_guideButton",mark:"XTLPyG_mark",sessionTitle:"XTLPyG_sessionTitle",audioDevices:"XTLPyG_audioDevices",conversationHeader:"XTLPyG_conversationHeader",bubbleStatus:"XTLPyG_bubbleStatus",details:"XTLPyG_details",voiceBars:"XTLPyG_voiceBars",voicePrompt:"XTLPyG_voicePrompt",newMessages:"XTLPyG_newMessages",whaleBreathe:"XTLPyG_whaleBreathe",bubble:"XTLPyG_bubble",quickHint:"XTLPyG_quickHint",assistantName:"XTLPyG_assistantName",updateHeader:"XTLPyG_updateHeader",segmented:"XTLPyG_segmented",conversationOptions:"XTLPyG_conversationOptions",audioDeviceNotice:"XTLPyG_audioDeviceNotice",existingSessionSearch:"XTLPyG_existingSessionSearch",volumeRow:"XTLPyG_volumeRow",modelHeading:"XTLPyG_modelHeading",mouseBinding:"XTLPyG_mouseBinding",quickConversation:"XTLPyG_quickConversation",brand:"XTLPyG_brand",formActions:"XTLPyG_formActions",currentDshAction:"XTLPyG_currentDshAction",whaleFeedback:"XTLPyG_whaleFeedback",messageName:"XTLPyG_messageName",modelNav:"XTLPyG_modelNav",markSmall:"XTLPyG_markSmall",hint:"XTLPyG_hint",disclosureRow:"XTLPyG_disclosureRow",sliderLabel:"XTLPyG_sliderLabel",voicePromptMode:"XTLPyG_voicePromptMode",text:`.XTLPyG_floating {
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

[data-ds-dark-theme] .XTLPyG_floating {
  --whale-solid-base: var(--dsw-static-neutral-bluish-950, #181a1e);
}

.XTLPyG_floating[data-collapsed] {
  border-radius: var(--whale-animated-radius, 999px);
  corner-shape: round;
  width: 216px;
  padding: 4px;
}

.XTLPyG_floating[data-view="settings"] {
  width: 660px;
  padding: 0;
}

.XTLPyG_floating[data-view="setup"]:not([data-collapsed]) {
  width: 420px;
}

.XTLPyG_floating:active {
  cursor: grabbing;
}

.XTLPyG_floating[data-whale-dock-phase="preview"] {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

.XTLPyG_floating [hidden] {
  display: none !important;
}

.XTLPyG_floating [data-no-drag] {
  cursor: auto;
  touch-action: pan-y;
}

.XTLPyG_panelViewport {
  overscroll-behavior: contain;
  min-width: 0;
  min-height: 0;
  overflow-x: hidden;
}

.XTLPyG_panelContent {
  min-width: 0;
  animation: XTLPyG_whaleEnter var(--whale-duration) var(--whale-ease);
}

.XTLPyG_mark {
  flex: none;
  width: 24px;
  height: 24px;
}

.XTLPyG_markSmall {
  flex: none;
  width: 20px;
  height: 20px;
}

.XTLPyG_brand, .XTLPyG_header, .XTLPyG_headerActions, .XTLPyG_actions, .XTLPyG_statusRow, .XTLPyG_caption {
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.XTLPyG_brand {
  font-size: 15px;
}

.XTLPyG_header {
  justify-content: space-between;
  margin-bottom: 12px;
}

.XTLPyG_headerActions {
  gap: 2px;
}

.XTLPyG_actions {
  flex-wrap: wrap;
}

.XTLPyG_iconButton {
  flex: none;
  width: 32px;
  min-width: 32px;
  height: 32px;
  padding: 0;
}

.XTLPyG_newChatButton {
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

.XTLPyG_newChatButton svg {
  width: 14px;
  height: 14px;
}

.XTLPyG_ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
}

.XTLPyG_statusRow {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  margin-bottom: 10px;
  padding: 4px 6px;
}

.XTLPyG_statusRow[data-recording] {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 19%,var(--dsw-alias-bg-module-platform));
}

.XTLPyG_statusRow[data-recording] .XTLPyG_voiceStatus > svg {
  color: var(--dsw-alias-brand-primary);
}

.XTLPyG_status {
  flex: 1;
  min-width: 0;
  margin: 0;
  font-size: 12px;
  line-height: 18px;
}

.XTLPyG_voiceTarget {
  flex: 1;
  align-items: center;
  gap: 4px;
  min-width: 0;
  line-height: 18px;
  display: flex;
}

.XTLPyG_voiceTarget > span, .XTLPyG_existingSessionHome > span {
  color: var(--dsw-alias-label-secondary);
  flex: none;
  font-size: 11px;
}

.XTLPyG_voiceTarget strong {
  font-size: 13px;
  font-weight: 600;
}

.XTLPyG_voiceStatus {
  align-items: center;
  gap: 4px;
  max-width: 47%;
  display: flex;
}

.XTLPyG_voiceStatus > svg {
  flex: none;
  width: 14px;
  height: 14px;
}

.XTLPyG_statusRow[data-bound] {
  flex-direction: column;
  align-items: stretch;
  gap: 0;
}

.XTLPyG_statusRow[data-bound] .XTLPyG_voiceStatus {
  max-width: 100%;
}

.XTLPyG_mainAction {
  width: 100%;
  min-height: 36px;
  font-weight: 500;
}

.XTLPyG_primary {
  color: var(--dsw-alias-label-primary) !important;
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 16%,var(--dsw-alias-bg-layer-2)) !important;
  border: 1px solid var(--dsw-alias-border-l2) !important;
}

.XTLPyG_bubble {
  corner-shape: round;
  cursor: grab;
  touch-action: none;
  width: 100%;
  max-width: 100%;
  height: 36px;
  animation: XTLPyG_whaleEnter var(--whale-duration) var(--whale-ease);
  border-radius: 999px;
  justify-content: flex-start;
  gap: 8px;
}

.XTLPyG_bubble .XTLPyG_ellipsis {
  text-align: left;
  flex: 1;
}

.XTLPyG_caption {
  text-align: left;
  justify-content: flex-start;
  width: 100%;
  margin-top: 8px;
  padding: 6px 0;
  font-size: 12px;
}

.XTLPyG_caption .XTLPyG_ellipsis {
  flex: 1;
}

.XTLPyG_openOriginal {
  flex: none;
}

.XTLPyG_hint, .XTLPyG_quickHint {
  color: var(--dsw-alias-label-secondary);
  overflow-wrap: anywhere;
  font-size: 12px;
}

.XTLPyG_hint {
  margin: 6px 0;
}

.XTLPyG_quickHint {
  margin: 0;
  font-size: 11px;
}

.XTLPyG_notice, .XTLPyG_note, .XTLPyG_error {
  border-radius: var(--dsw-radius-sm);
  overflow-wrap: anywhere;
  background: var(--dsw-alias-bg-module-platform);
  margin: 8px 0;
  padding: 8px 10px;
  font-size: 12px;
}

.XTLPyG_notice, .XTLPyG_note {
  border-left: 2px solid var(--dsw-alias-state-warn-primary);
}

.XTLPyG_error {
  border-left: 2px solid var(--dsw-alias-state-error-primary);
}

.XTLPyG_error button {
  margin-top: 8px;
}

.XTLPyG_popover {
  box-sizing: border-box;
  cursor: auto;
  touch-action: auto;
  width: 100%;
  animation: XTLPyG_whaleEnter var(--whale-duration) var(--whale-ease);
  margin: 0 0 10px;
  padding: 12px;
  position: relative;
  overflow: auto;
}

.XTLPyG_popoverHeader {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  display: flex;
}

.XTLPyG_popoverHeader > button {
  width: 28px;
  padding: 0;
}

.XTLPyG_quickConversation {
  max-height: 160px;
}

.XTLPyG_recentMessages {
  gap: 6px;
  display: grid;
}

.XTLPyG_message {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  padding: 5px 8px;
}

.XTLPyG_message strong {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

.XTLPyG_message p {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  margin: 3px 0 0;
}

.XTLPyG_quickActions {
  gap: 6px;
  min-width: 0;
  display: grid;
}

.XTLPyG_quickSpeed {
  gap: 5px;
  padding-top: 4px;
  display: grid;
}

.XTLPyG_quickSpeedHeader {
  color: var(--dsw-alias-label-secondary);
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  display: flex;
}

.XTLPyG_quickSpeedHeader small {
  font-size: 11px;
}

.XTLPyG_quickSegments {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  gap: 3px;
  padding: 3px;
  display: grid;
}

.XTLPyG_quickSegments button {
  min-width: 0;
  height: 28px;
  min-height: 28px;
  padding: 0 5px;
  font-size: 12px;
}

.XTLPyG_quickSegments button[aria-pressed="true"] {
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: 0 1px 3px #0001;
}

.XTLPyG_settings {
  height: 100%;
  min-height: 0;
  color: var(--dsw-alias-label-primary);
  flex-direction: column;
  display: flex;
  overflow: hidden;
}

.XTLPyG_settingsHeader {
  box-sizing: border-box;
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 4px 10px;
  display: flex;
}

.XTLPyG_settingsHeader h2 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.XTLPyG_settingsBrand {
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 6px;
  min-width: 0;
  display: flex;
}

.XTLPyG_backButton, .XTLPyG_guideButton {
  flex: none;
  padding: 0 8px;
  font-size: 12px;
}

.XTLPyG_backIcon {
  transform: rotate(180deg);
}

.XTLPyG_settingsLayout {
  flex: 1;
  grid-template-rows: minmax(0, 1fr);
  grid-template-columns: 104px minmax(0, 1fr);
  min-height: 0;
  display: grid;
  overflow: hidden;
}

.XTLPyG_settingsNav {
  border-right: 1px solid var(--dsw-alias-border-l2);
  background: var(--dsw-alias-bg-module-platform);
  flex-direction: column;
  gap: 3px;
  min-height: 0;
  padding: 8px 6px;
  display: flex;
  overflow-y: auto;
}

.XTLPyG_settingsNav button {
  justify-content: flex-start;
  min-width: 0;
  min-height: 34px;
  padding: 0 12px;
  font-size: 12px;
}

.XTLPyG_settingsNav button[aria-pressed="true"] {
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: inset 2px 0 0 var(--dsw-alias-brand-primary);
  font-weight: 600;
}

.XTLPyG_settingsPage {
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  display: flex;
  overflow: hidden;
}

.XTLPyG_pageHeading {
  flex: none;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 10px 12px 8px;
  display: flex;
}

.XTLPyG_pageHeading h3 {
  margin: 0;
  font-size: 15px;
}

.XTLPyG_pageHeading p {
  color: var(--dsw-alias-label-secondary);
  margin: 3px 0 0;
  font-size: 12px;
}

.XTLPyG_settingsBody {
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

.XTLPyG_settingsBody > .XTLPyG_section, .XTLPyG_settingsBody > div > .XTLPyG_section {
  margin: 0 0 12px;
}

.XTLPyG_section {
  align-content: start;
  gap: 8px;
  min-width: 0;
  display: grid;
}

.XTLPyG_section h3 {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
}

.XTLPyG_section p, .XTLPyG_section > .XTLPyG_section {
  margin: 0;
}

.XTLPyG_settingsBody > .XTLPyG_section + .XTLPyG_section {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

.XTLPyG_section summary {
  cursor: pointer;
  padding: 7px 0;
  font-size: 13px;
  font-weight: 500;
}

details.XTLPyG_section {
  border-top: 1px solid var(--dsw-alias-border-l2);
  display: block;
}

details.XTLPyG_section > :not(summary) {
  margin-top: 10px;
}

.XTLPyG_field {
  gap: 6px;
  font-size: 12px;
  display: grid;
}

.XTLPyG_field input {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}

.XTLPyG_deviceSelect {
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

.XTLPyG_radios {
  border: 0;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
  margin: 0;
  padding: 0;
  display: flex;
}

.XTLPyG_radios legend {
  margin-bottom: 6px;
  font-size: 12px;
}

.XTLPyG_radios label {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  cursor: pointer;
  align-items: center;
  gap: 6px;
  padding: 6px 9px;
  font-size: 12px;
  display: flex;
}

.XTLPyG_radios input {
  accent-color: var(--dsw-alias-brand-primary);
}

.XTLPyG_bindingEditor {
  gap: 14px;
  display: grid;
}

.XTLPyG_keyBinding {
  gap: 6px;
  display: grid;
}

.XTLPyG_keyBinding > :is(h3, p) {
  margin: 0;
}

.XTLPyG_keyBindingRow {
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 12px;
  min-width: 0;
  display: flex;
}

.XTLPyG_keyBindingRow > span {
  overflow-wrap: anywhere;
  min-width: 5em;
  font-size: 13px;
}

.XTLPyG_mouseBinding legend {
  font-size: 14px;
  font-weight: 600;
}

.XTLPyG_mouseBinding label {
  white-space: nowrap;
}

.XTLPyG_bindingActions {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

.XTLPyG_segmented {
  flex-wrap: wrap;
  gap: 4px;
  display: flex;
}

.XTLPyG_segmented button {
  min-width: 0;
  font-size: 12px;
}

.XTLPyG_segmented button[aria-pressed="true"], .XTLPyG_modelNav button[aria-pressed="true"] {
  background: var(--dsw-alias-interactive-bg-active);
  color: var(--dsw-alias-label-primary);
  box-shadow: inset 0 -2px 0 var(--dsw-alias-brand-primary);
}

.XTLPyG_modelNav {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  gap: 4px;
  margin-bottom: 12px;
  padding: 0 16px 10px;
  display: flex;
}

.XTLPyG_modelNav button {
  flex: 1;
  min-width: 0;
  padding: 0 6px;
  font-size: 12px;
}

.XTLPyG_sliderLabel {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  display: flex;
}

.XTLPyG_sliderLabel span {
  margin-left: auto;
}

.XTLPyG_sliderLabel input {
  width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
}

.XTLPyG_formActions {
  padding-top: 4px;
}

.XTLPyG_formActions button {
  min-width: 100px;
}

.XTLPyG_editNotice {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 8px;
  display: flex;
}

.XTLPyG_editNotice div {
  flex: 1;
  min-width: 0;
}

.XTLPyG_editNotice strong {
  font-size: 12px;
}

.XTLPyG_editNotice p {
  color: var(--dsw-alias-label-secondary);
  margin: 3px 0 0;
  font-size: 12px;
}

.XTLPyG_editNotice button {
  flex: none;
  font-size: 12px;
}

.XTLPyG_details {
  grid-template-columns: auto minmax(0, 1fr);
  gap: 6px 12px;
  margin: 0;
  font-size: 12px;
  display: grid;
}

.XTLPyG_details dt {
  color: var(--dsw-alias-label-secondary);
}

.XTLPyG_details dd {
  overflow-wrap: anywhere;
  margin: 0;
}

.XTLPyG_capabilityRow {
  display: contents;
}

.XTLPyG_requestDetails {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  max-height: 200px;
  padding: 8px;
  font-size: 11px;
  overflow: auto;
}

.XTLPyG_placeholder {
  text-align: center;
  min-height: 140px;
  color: var(--dsw-alias-label-secondary);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  display: flex;
}

.XTLPyG_placeholder h3, .XTLPyG_placeholder p {
  margin: 0;
}

.XTLPyG_placeholder svg {
  width: 32px;
  height: 32px;
}

.XTLPyG_motionPreview {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  width: 40px;
  height: 32px;
  animation: XTLPyG_whalePreview var(--whale-duration) var(--whale-ease);
  place-items: center;
  display: grid;
}

.XTLPyG_settings a {
  color: var(--dsw-alias-link);
  text-underline-offset: 2px;
  overflow-wrap: anywhere;
}

.XTLPyG_updateDialog {
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

.XTLPyG_updateDialog::backdrop {
  background: #0005;
}

.XTLPyG_updateHeader {
  align-items: center;
  gap: 8px;
  display: flex;
}

.XTLPyG_updateHeader h2 {
  margin: 0;
  font-size: 16px;
}

.XTLPyG_updateAnnouncement {
  white-space: pre-line;
  overflow-wrap: anywhere;
}

.XTLPyG_updateDialog .XTLPyG_actions {
  margin-top: 12px;
}

.XTLPyG_updateDialog a {
  color: var(--dsw-alias-link);
  text-underline-offset: 2px;
}

.XTLPyG_authorization {
  height: auto;
  max-height: min(var(--whale-content-limit, 60vh),var(--whale-visible-content, 60vh));
}

.XTLPyG_authorization .XTLPyG_settingsHeader {
  min-height: 42px;
  padding: 0 0 10px;
}

.XTLPyG_authorization .XTLPyG_settingsHeader h2 {
  flex: 1;
  font-size: 16px;
}

.XTLPyG_authorizationBody {
  overscroll-behavior: contain;
  flex: 1;
  min-height: 0;
  padding-right: 6px;
  overflow-y: auto;
}

.XTLPyG_authorizationActions {
  border-top: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  padding: 10px 0 0;
}

.XTLPyG_authorizationBody > [data-whale-natural-content] {
  display: flow-root;
}

.XTLPyG_permissionList {
  gap: 0;
  margin: 12px 0;
  padding: 0;
  list-style: none;
  display: grid;
}

.XTLPyG_permissionList li {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  padding: 10px 0;
}

.XTLPyG_permissionList p {
  margin: 3px 0 0;
}

.XTLPyG_permissionList strong {
  font-size: 13px;
}

.XTLPyG_sessionTitle {
  overflow-wrap: anywhere;
}

.XTLPyG_sessionRename {
  gap: 6px;
  margin-top: 8px;
  display: grid;
}

.XTLPyG_existingSessionHome {
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

.XTLPyG_existingSessionHome svg {
  flex: none;
  width: 12px;
  height: 12px;
}

.XTLPyG_existingSessionHome:disabled {
  opacity: 1;
  box-shadow: none;
  cursor: default;
}

.XTLPyG_existingSessionHome:disabled > svg {
  visibility: hidden;
}

.XTLPyG_currentDshTarget {
  gap: 4px;
  min-width: 0;
  display: grid;
}

.XTLPyG_currentDshAction {
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

.XTLPyG_currentDshAction > :first-child {
  white-space: nowrap;
  flex: none;
}

.XTLPyG_currentDshAction > :last-child {
  min-width: 0;
  color: var(--dsw-alias-label-secondary);
  text-align: right;
}

.XTLPyG_currentDshTarget > p {
  margin: 0;
}

.XTLPyG_transcriptRetries {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  max-height: 168px;
  padding: 4px 6px;
  display: flex;
}

.XTLPyG_transcriptRetries > header {
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 0 4px;
  display: flex;
}

.XTLPyG_transcriptRetries h2 {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
}

.XTLPyG_transcriptRetries > header p {
  color: var(--dsw-alias-label-secondary);
  margin: 0;
  font-size: 11px;
  line-height: 16px;
}

.XTLPyG_transcriptRetryList {
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

.XTLPyG_transcriptRetry {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 6px;
  display: grid;
}

.XTLPyG_transcriptRetry + .XTLPyG_transcriptRetry {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 4px;
}

.XTLPyG_transcriptRetry p {
  margin: 0;
}

.XTLPyG_transcriptRetryText {
  overflow-wrap: anywhere;
  white-space: pre-wrap;
  user-select: text;
  font-size: 13px;
  line-height: 18px;
}

.XTLPyG_transcriptRetry button {
  height: 26px;
  min-height: 26px;
  padding: 0 6px;
  font-size: 12px;
}

.XTLPyG_existingSessionTarget > p {
  margin: 4px 0;
}

.XTLPyG_existingSessionPicker {
  gap: 8px;
  min-width: 0;
  margin-top: 10px;
  display: grid;
}

.XTLPyG_existingSessionSearch {
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 6px;
  display: grid;
}

.XTLPyG_existingSessionSearch input::placeholder {
  color: var(--dsw-alias-label-secondary);
  opacity: 1;
}

.XTLPyG_existingSessionList {
  max-height: clamp(96px, 26vh, 224px);
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: auto;
}

.XTLPyG_existingSessionList li {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
}

.XTLPyG_existingSessionList label {
  cursor: pointer;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: start;
  gap: 6px;
  padding: 6px 4px;
  display: grid;
}

.XTLPyG_existingSessionList label:has(input:disabled) {
  cursor: default;
}

.XTLPyG_existingSessionList label:has(input:checked) {
  background: var(--dsw-alias-interactive-bg-active);
}

.XTLPyG_existingSessionList input {
  accent-color: var(--dsw-alias-brand-primary);
  margin-top: 3px;
}

.XTLPyG_existingSessionList label span.XTLPyG_hint {
  overflow-wrap: anywhere;
  margin: 3px 0 0;
  display: block;
}

.XTLPyG_performanceChoice {
  line-height: 1.1;
}

.XTLPyG_performanceChoice small {
  white-space: nowrap;
  font-size: .85em;
}

.XTLPyG_floating [data-whale-setup] {
  min-height: 0;
}

.XTLPyG_floating :is(button, input, select, textarea, summary, a) {
  touch-action: manipulation;
}

.XTLPyG_floating button {
  transition: background-color .12s, color .12s;
}

.XTLPyG_floating :is(button, input, select, summary, a):focus-visible, .XTLPyG_floating:focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

.XTLPyG_spin {
  animation: .7s linear infinite XTLPyG_whaleSpin;
}

.XTLPyG_mark[data-state="authorized"], .XTLPyG_markSmall[data-state="authorized"] {
  color: var(--dsw-alias-brand-primary);
}

.XTLPyG_mark[data-state="unknown"], .XTLPyG_markSmall[data-state="unknown"] {
  color: var(--dsw-alias-state-warn-primary);
}

.XTLPyG_mark[data-state="input-active"], .XTLPyG_markSmall[data-state="input-active"] {
  color: var(--dsw-alias-brand-primary);
  animation: 1.35s ease-in-out infinite XTLPyG_whaleBreathe;
}

.XTLPyG_mark[data-state="pending"], .XTLPyG_markSmall[data-state="pending"] {
  color: var(--dsw-alias-label-secondary);
}

[data-motion="firm"].XTLPyG_floating {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="off"].XTLPyG_floating, [data-motion="off"].XTLPyG_floating * {
  transition: none !important;
  animation: none !important;
}

@keyframes XTLPyG_whaleEnter {
  from {
    opacity: .4;
    transform: translateY(3px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes XTLPyG_whalePreview {
  from {
    transform: scale(.88);
  }

  to {
    transform: scale(1);
  }
}

@keyframes XTLPyG_whaleSpin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes XTLPyG_whaleBreathe {
  0%, 100% {
    opacity: .65;
  }

  50% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .XTLPyG_floating, .XTLPyG_floating * {
    transition: none !important;
    animation: none !important;
  }
}

@media (width <= 520px), (height <= 560px) {
  .XTLPyG_settingsLayout {
    grid-template-rows: auto minmax(0, 1fr);
    grid-template-columns: minmax(0, 1fr);
  }

  .XTLPyG_settingsNav {
    border-right: 0;
    border-bottom: 1px solid var(--dsw-alias-border-l2);
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 2px;
    padding: 5px 8px;
    display: grid;
    overflow: hidden;
  }

  .XTLPyG_settingsNav button {
    justify-content: center;
    height: 30px;
    min-height: 30px;
    padding: 0 2px;
  }

  .XTLPyG_settingsNav button[aria-pressed="true"] {
    box-shadow: inset 0 -2px 0 var(--dsw-alias-brand-primary);
  }

  .XTLPyG_settingsHeader {
    gap: 3px;
    min-height: 44px;
    padding: 5px 8px;
  }

  .XTLPyG_backButton, .XTLPyG_guideButton {
    padding: 0 5px;
  }

  .XTLPyG_settingsBrand {
    gap: 4px;
  }

  .XTLPyG_settingsBrand .XTLPyG_markSmall {
    display: none;
  }

  .XTLPyG_pageHeading {
    padding: 10px 12px 8px;
  }

  .XTLPyG_pageHeading p {
    display: none;
  }

  .XTLPyG_settingsBody {
    padding: 4px 12px 12px;
  }

  .XTLPyG_modelNav {
    margin-bottom: 8px;
    padding: 0 10px 7px;
  }

  .XTLPyG_editNotice {
    flex-wrap: wrap;
  }

  .XTLPyG_editNotice button {
    width: 100%;
  }
}

@media (height <= 420px) {
  .XTLPyG_settingsHeader {
    height: 36px;
    min-height: 36px;
    padding: 2px 8px;
  }

  .XTLPyG_settingsHeader button {
    height: 30px;
    min-height: 30px;
  }

  .XTLPyG_settingsNav {
    padding: 2px 8px;
  }

  .XTLPyG_settingsNav button {
    height: 28px;
    min-height: 28px;
  }

  .XTLPyG_pageHeading {
    box-sizing: border-box;
    min-height: 32px;
    padding: 2px 12px;
  }

  .XTLPyG_pageHeading .XTLPyG_iconButton {
    width: 28px;
    min-width: 28px;
    height: 28px;
  }

  .XTLPyG_modelNav {
    margin-bottom: 4px;
    padding: 0 10px 3px;
  }

  .XTLPyG_modelNav button {
    height: 28px;
    min-height: 28px;
  }
}

@media (pointer: coarse) {
  .XTLPyG_field input, .XTLPyG_deviceSelect {
    font-size: 16px;
  }
}

@media (forced-colors: active) {
  .XTLPyG_floating, .XTLPyG_popover {
    outline: 1px solid canvastext;
  }

  .XTLPyG_settingsNav button[aria-pressed="true"], .XTLPyG_modelNav button[aria-pressed="true"] {
    outline: 2px solid highlight;
  }
}

.XTLPyG_floating[data-view="home"] .XTLPyG_panelViewport, .XTLPyG_floating[data-collapsed] .XTLPyG_panelViewport {
  overflow: hidden;
}

.XTLPyG_floating[data-view="home"]:not([data-collapsed]) {
  padding: 10px;
}

.XTLPyG_panelContent {
  flex-direction: column;
  gap: 4px;
  height: 100%;
  min-height: 0;
  display: flex;
}

.XTLPyG_panelContent > :not(.XTLPyG_quickConversation) {
  flex: none;
}

.XTLPyG_panelContent > .XTLPyG_homeTargetPicker {
  flex: 1 1 0;
  min-height: 0;
  padding: 2px;
  display: flex;
}

.XTLPyG_homeTargetPicker > .XTLPyG_existingSessionPicker {
  flex-direction: column;
  flex: 1;
  margin-top: 0;
  display: flex;
}

.XTLPyG_homeTargetPicker .XTLPyG_existingSessionList {
  overscroll-behavior: contain;
  flex: auto;
  min-height: 0;
  max-height: none;
}

.XTLPyG_homeTargetRow {
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

.XTLPyG_homeTargetRow:disabled {
  opacity: 1;
  cursor: default;
  color: var(--dsw-alias-label-secondary);
}

.XTLPyG_homeTargetRow .XTLPyG_hint {
  overflow-wrap: anywhere;
}

.XTLPyG_homeTargetPicker :is(.XTLPyG_existingSessionSearch, .XTLPyG_actions) {
  flex: none;
}

.XTLPyG_homeTargetPicker .XTLPyG_actions {
  margin-top: auto;
}

.XTLPyG_homeTargetPicker .XTLPyG_hint {
  margin: 0;
}

.XTLPyG_panelContent > .XTLPyG_header {
  height: 28px;
  min-height: 28px;
  margin: 0;
}

.XTLPyG_panelContent .XTLPyG_header .XTLPyG_iconButton {
  width: 28px;
  min-width: 28px;
  height: 28px;
}

.XTLPyG_panelContent > .XTLPyG_statusRow {
  box-sizing: border-box;
  min-height: 24px;
  margin: 0;
  padding: 2px 6px;
}

.XTLPyG_panelContent > .XTLPyG_hint {
  margin: 0;
  font-size: 12px;
  line-height: 18px;
}

.XTLPyG_panelContent > .XTLPyG_error {
  margin: 0;
  padding: 4px 8px;
  line-height: 18px;
}

.XTLPyG_panelContent .XTLPyG_quickSpeed {
  gap: 3px;
  padding-top: 0;
}

.XTLPyG_panelContent .XTLPyG_quickSpeedHeader {
  line-height: 18px;
}

.XTLPyG_panelContent .XTLPyG_quickHint {
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 16px;
  overflow: hidden;
}

.XTLPyG_panelContent .XTLPyG_quickHint p {
  text-overflow: ellipsis;
  margin: 0;
  line-height: 16px;
  overflow: hidden;
}

.XTLPyG_panelContent > .XTLPyG_caption {
  box-sizing: border-box;
  height: 30px;
  min-height: 30px;
  margin: 0;
  padding: 4px 8px;
  line-height: 18px;
}

.XTLPyG_panelContent > .XTLPyG_quickConversation {
  flex-direction: column;
  flex: 1 1 0;
  min-height: 0;
  max-height: none;
  margin: 0;
  padding: 8px;
  display: flex;
  overflow: hidden;
}

.XTLPyG_quickConversation .XTLPyG_popoverHeader {
  flex: none;
  min-height: 28px;
  margin-bottom: 6px;
}

.XTLPyG_quickConversation .XTLPyG_recentMessages {
  overscroll-behavior: contain;
  min-height: 0;
  overflow-y: auto;
}

.XTLPyG_floating[data-compact-height="true"] .XTLPyG_panelContent {
  gap: 2px;
}

.XTLPyG_floating[data-compact-height="true"] :is(.XTLPyG_voiceTarget, .XTLPyG_existingSessionHome) > span {
  font-size: 10px;
}

.XTLPyG_floating[data-compact-height="true"] .XTLPyG_voiceTarget strong {
  font-size: 12px;
}

.XTLPyG_floating[data-compact-height="true"] .XTLPyG_statusRow[data-bound] .XTLPyG_status {
  line-height: 16px;
}

.XTLPyG_floating[data-compact-height="true"] .XTLPyG_existingSessionHome {
  height: 20px;
  min-height: 20px;
}

.XTLPyG_floating[data-compact-height="true"] .XTLPyG_transcriptRetries {
  max-height: max(46px,calc(var(--whale-content-limit) - 137px));
  gap: 1px;
  padding-block: 2px;
}

.XTLPyG_floating[data-compact-height="true"] [data-has-transcript-retry] > .XTLPyG_audioDevices, .XTLPyG_floating[data-compact-height="true"] .XTLPyG_panelContent:has(.XTLPyG_currentDshTarget) > :is(.XTLPyG_audioDevices, .XTLPyG_quickSpeed), .XTLPyG_floating[data-compact-height="true"] .XTLPyG_panelContent > .XTLPyG_hint:not([data-home-important]), .XTLPyG_floating[data-compact-height="true"] .XTLPyG_panelContent .XTLPyG_quickSpeedHeader, .XTLPyG_floating[data-compact-height="true"] .XTLPyG_panelContent .XTLPyG_quickHint {
  display: none;
}

.XTLPyG_floating[data-compact-height="true"] .XTLPyG_quickActions {
  grid-template-columns: minmax(65px, .9fr) minmax(0, 2.1fr);
  align-items: center;
  gap: 4px;
}

.XTLPyG_floating[data-compact-height="true"] .XTLPyG_quickActions .XTLPyG_mainAction {
  white-space: normal;
  height: 30px;
  min-height: 30px;
  padding-inline: 4px;
  font-size: 12px;
  line-height: 1.15;
}

.XTLPyG_floating[data-compact-height="true"] .XTLPyG_quickActions .XTLPyG_quickSegments {
  padding: 2px;
}

.XTLPyG_floating[data-compact-height="true"] .XTLPyG_quickActions .XTLPyG_quickSegments button {
  padding-inline: 2px;
  font-size: 11px;
}

.XTLPyG_floating[data-compact-height="true"] .XTLPyG_panelContent[data-size-detail="true"] > .XTLPyG_quickSpeed {
  display: none;
}

.XTLPyG_settingsBody {
  container-type: inline-size;
}

.XTLPyG_section > button {
  justify-self: start;
  max-width: 100%;
}

.XTLPyG_settingsBody button {
  white-space: normal;
  overflow-wrap: anywhere;
  height: auto;
  min-height: 36px;
}

.XTLPyG_settingsBody :is(.XTLPyG_actions, .XTLPyG_segmented, .XTLPyG_formActions) > button {
  flex: 0 auto;
}

.XTLPyG_inlineActions, .XTLPyG_inlineField, .XTLPyG_volumeRow, .XTLPyG_volumeControl {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.XTLPyG_inlineField {
  font-size: 12px;
}

.XTLPyG_inlineField .XTLPyG_deviceSelect {
  text-overflow: ellipsis;
  flex: 0 180px;
  width: 180px;
  max-width: 100%;
}

.XTLPyG_inlineField input[type="number"] {
  width: 80px;
}

.XTLPyG_fullName {
  color: var(--dsw-alias-label-secondary);
  min-width: 0;
  font-size: 12px;
}

.XTLPyG_fullName summary {
  padding: 2px 0;
  font-size: 12px;
  font-weight: 400;
}

.XTLPyG_fullName p {
  overflow-wrap: anywhere;
  margin-top: 4px;
}

.XTLPyG_disclosureRow {
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 8px;
  display: flex;
}

.XTLPyG_disclosureRow > details.XTLPyG_section {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  flex: 0 auto;
  min-width: 0;
  padding: 0 10px;
}

.XTLPyG_disclosureRow > details.XTLPyG_section > summary {
  min-height: 20px;
  padding: 7px 0;
}

.XTLPyG_disclosureRow > details[open].XTLPyG_section {
  flex: 100%;
  padding-bottom: 10px;
}

.XTLPyG_volumeControl {
  flex-wrap: nowrap;
  flex: 0 260px;
}

.XTLPyG_volumeControl input[type="range"] {
  width: 210px;
  min-width: 80px;
  max-width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
  flex: 210px;
}

.XTLPyG_volumeControl span {
  text-align: right;
  flex: none;
  min-width: 3em;
  font-size: 12px;
}

.XTLPyG_field:has( > input[type="number"]) {
  flex-wrap: wrap;
  align-items: center;
  display: flex;
}

.XTLPyG_field > input[type="number"] {
  width: 80px;
}

.XTLPyG_authorizationSteps {
  color: var(--dsw-alias-label-secondary);
  margin: 8px 0 12px;
  font-size: 12px;
}

.XTLPyG_agreement {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  gap: 14px;
  padding: 14px;
  font-size: 13px;
  line-height: 1.6;
  display: grid;
}

.XTLPyG_agreement p {
  margin: 0;
}

.XTLPyG_authorizationBody h3 {
  margin: 0 0 10px;
  font-size: 15px;
}

.XTLPyG_authorizationActions button {
  flex: 0 auto;
  min-height: 36px;
}

@container (width <= 340px) {
  .XTLPyG_inlineActions {
    align-items: flex-start;
  }

  .XTLPyG_inlineField .XTLPyG_deviceSelect {
    flex-basis: 160px;
    width: 160px;
  }

  .XTLPyG_volumeControl {
    flex-basis: 200px;
  }

  .XTLPyG_volumeControl input[type="range"] {
    width: 150px;
  }
}

.XTLPyG_audioDevices {
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  display: flex;
}

.XTLPyG_audioDeviceGrid {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 8px;
  display: grid;
}

.XTLPyG_audioDeviceField {
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  font-size: 12px;
  display: flex;
}

.XTLPyG_audioDeviceField > span {
  align-items: center;
  gap: 4px;
  line-height: 18px;
  display: flex;
}

.XTLPyG_audioDeviceField svg {
  flex: none;
  width: 14px;
  height: 14px;
}

.XTLPyG_audioDeviceField select {
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

.XTLPyG_audioDeviceField select[data-device-missing] {
  border-color: #b80;
}

.XTLPyG_audioDeviceHint, .XTLPyG_audioDeviceNotice {
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  font-size: 11px;
  line-height: 16px;
  overflow: hidden;
}

.XTLPyG_audioDeviceHint {
  color: var(--dsw-alias-label-secondary);
}

.XTLPyG_audioDeviceNotice {
  color: #805500;
}

[data-ds-dark-theme] .XTLPyG_audioDeviceNotice {
  color: #ffd277;
}

[data-ds-dark-theme] .XTLPyG_audioDeviceField select {
  color-scheme: dark;
}

.XTLPyG_floating[data-compact-height="true"] .XTLPyG_audioDeviceField > span {
  font-size: 11px;
  line-height: 14px;
}

.XTLPyG_floating[data-compact-height="true"] .XTLPyG_audioDeviceField select {
  height: 26px;
}

.XTLPyG_floating[data-compact-height="true"] .XTLPyG_audioDeviceHint, .XTLPyG_floating[data-compact-height="true"] .XTLPyG_audioDeviceNotice, .XTLPyG_floating[data-compact-height="true"] .XTLPyG_panelContent:has( > [data-home-important]) .XTLPyG_audioDeviceField > span {
  display: none;
}

.XTLPyG_pageHeading.XTLPyG_modelHeading {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  justify-content: flex-start;
  gap: 10px;
  min-height: 40px;
  margin-bottom: 6px;
  padding: 5px 12px;
}

.XTLPyG_modelHeading h3 {
  white-space: nowrap;
  font-size: 13px;
}

.XTLPyG_modelHeading .XTLPyG_modelNav {
  border: 0;
  flex: 1;
  gap: 3px;
  min-width: 0;
  margin: 0;
  padding: 0;
}

.XTLPyG_modelHeading .XTLPyG_modelNav button {
  white-space: nowrap;
  flex: 0 auto;
  height: 28px;
  min-height: 28px;
  padding: 0 6px;
}

.XTLPyG_currentModel {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  display: flex;
}

.XTLPyG_pathRow {
  grid-template-columns: 95px minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  font-size: 12px;
  display: grid;
}

.XTLPyG_pathRow > span {
  min-width: 0;
}

.XTLPyG_editNotice {
  margin-bottom: 7px;
  padding: 5px 8px;
}

.XTLPyG_editNotice span {
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
}

.XTLPyG_editNotice button {
  height: auto;
  min-height: 30px;
}

@media (width <= 360px) {
  .XTLPyG_pageHeading.XTLPyG_modelHeading {
    gap: 5px;
    padding: 5px 8px;
  }

  .XTLPyG_modelHeading .XTLPyG_modelNav button {
    padding: 0 3px;
    font-size: 11px;
  }

  .XTLPyG_pathRow {
    grid-template-columns: minmax(0, 1fr);
    gap: 4px;
  }
}

.XTLPyG_pathRow {
  display: block;
}

.XTLPyG_pathRow > div:first-child {
  flex-wrap: nowrap !important;
}

.XTLPyG_pathRow > div:first-child > label {
  flex: 1;
  grid-template-columns: 95px minmax(0, 1fr);
  display: grid !important;
}

.XTLPyG_pathRow input {
  width: 100% !important;
}

.XTLPyG_pathRow button {
  flex: none;
  min-height: 32px;
}

@media (width <= 420px) {
  .XTLPyG_pathRow > div:first-child {
    flex-wrap: wrap !important;
  }

  .XTLPyG_pathRow > div:first-child > label {
    grid-template-columns: 80px minmax(0, 1fr);
    min-width: 180px !important;
  }
}

.XTLPyG_floating :is(button, select, input, textarea, summary, a), .XTLPyG_settings :is(button, select, input, summary, a) {
  transition: background-color .12s ease-out,border-color .12s ease-out,color .12s ease-out,box-shadow .12s ease-out,transform var(--whale-duration, .2s) var(--whale-ease, ease-out);
}

.XTLPyG_floating :is(button, summary):hover:not(:disabled) {
  background-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,var(--dsw-alias-bg-layer-1));
}

.XTLPyG_floating button:active:not(:disabled), .XTLPyG_settings button:active:not(:disabled) {
  transform: scale(.97);
}

.XTLPyG_floating :is(input, select, textarea):hover:not(:disabled) {
  border-color: var(--dsw-alias-brand-primary);
}

.XTLPyG_radios label {
  transition: background-color .12s, border-color .12s, box-shadow .12s;
}

.XTLPyG_radios label:has(input:checked) {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,transparent);
}

.XTLPyG_authorizationBody, .XTLPyG_settingsLayout, .XTLPyG_panelContent > .XTLPyG_header, .XTLPyG_settingsBody > div:not([hidden]), .XTLPyG_section > div:not([hidden])[data-whale-tab-panel], .XTLPyG_floating [role="tabpanel"]:not([hidden]) {
  animation: XTLPyG_whalePageEnter var(--whale-duration, .2s) ease-out;
}

.XTLPyG_floating :is([role="menu"], [role="listbox"]), .XTLPyG_floating [data-whale-dropdown] {
  transform-origin: top;
  animation: .12s ease-out XTLPyG_whalePageEnter;
}

.XTLPyG_floating [data-whale-save-result] {
  animation: .16s ease-out XTLPyG_whaleFeedback;
}

.XTLPyG_floating summary {
  list-style: none;
}

.XTLPyG_floating summary::-webkit-details-marker {
  display: none;
}

.XTLPyG_floating summary:before {
  content: "\u203A";
  width: 1em;
  transition: transform .16s ease-out;
  display: inline-block;
  transform: rotate(0);
}

.XTLPyG_floating details[open] > summary:before {
  transform: rotate(90deg);
}

.XTLPyG_floating details[open] > :not(summary) {
  animation: .16s ease-out XTLPyG_whalePageEnter;
}

@supports (interpolate-size: allow-keywords) {
  .XTLPyG_floating details {
    interpolate-size: allow-keywords;
  }

  .XTLPyG_floating details::details-content {
    block-size: 0;
    transition: block-size .16s ease-out,content-visibility .16s allow-discrete;
    overflow: clip;
  }

  .XTLPyG_floating details[open]::details-content {
    block-size: auto;
  }
}

@keyframes XTLPyG_whalePageEnter {
  from {
    translate: 0 4px;
  }

  to {
    translate: 0;
  }
}

@keyframes XTLPyG_whaleFeedback {
  from {
    opacity: .5;
  }

  to {
    opacity: 1;
  }
}

[data-motion="firm"].XTLPyG_floating, [data-motion="firm"].XTLPyG_settings {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="firm"].XTLPyG_floating details::details-content, [data-motion="firm"].XTLPyG_floating summary:before {
  transition-duration: .1s;
}

[data-motion="off"].XTLPyG_floating *, [data-motion="off"].XTLPyG_settings *, [data-motion="off"].XTLPyG_floating :before, [data-motion="off"].XTLPyG_floating details::details-content {
  transition: none !important;
  animation: none !important;
}

[data-motion="off"].XTLPyG_floating button:active, [data-motion="off"].XTLPyG_settings button:active {
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .XTLPyG_floating *, .XTLPyG_settings *, .XTLPyG_floating :before, .XTLPyG_floating details::details-content {
    transition: none !important;
    animation: none !important;
  }

  .XTLPyG_floating button:active, .XTLPyG_settings button:active {
    transform: none;
  }
}

.XTLPyG_conversationChoice {
  gap: 6px;
  min-width: 0;
  display: grid;
  position: relative;
}

.XTLPyG_conversationChoice > button {
  text-align: left;
  justify-content: space-between;
  width: 100%;
  min-width: 0;
}

.XTLPyG_conversationOptions {
  overscroll-behavior: contain;
  gap: 3px;
  min-width: 0;
  max-height: 220px;
  padding: 6px;
  animation: .12s ease-out XTLPyG_whalePageEnter;
  display: grid;
  overflow: auto;
}

.XTLPyG_conversationOptions [role="option"] {
  text-align: left;
  border-radius: var(--dsw-radius-sm);
  justify-content: space-between;
  width: 100%;
  min-width: 0;
  padding: 7px 10px;
  transition: background-color .12s ease-out, color .12s ease-out;
}

.XTLPyG_conversationOptions [role="option"][aria-selected="true"] {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 18%,var(--dsw-alias-bg-layer-1));
  font-weight: 600;
}

.XTLPyG_conversationOptions [role="option"]:is(:hover, :focus-visible) {
  background: var(--dsw-alias-interactive-bg-active);
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: -2px;
}

.XTLPyG_conversationOptions [role="option"] small {
  color: var(--dsw-alias-label-secondary);
}

.XTLPyG_settings [data-whale-tab-panel]:not([hidden]) {
  animation: XTLPyG_whalePageEnter var(--whale-duration, .2s) ease-out;
}

.XTLPyG_modelHeading .XTLPyG_modelNav {
  scrollbar-width: thin;
  overflow-x: auto;
}

.XTLPyG_modelHeading .XTLPyG_modelNav button {
  flex-shrink: 0;
}

[data-motion="off"].XTLPyG_settings [data-whale-tab-panel] {
  animation: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .XTLPyG_settings [data-whale-tab-panel] {
    animation: none !important;
  }
}

.XTLPyG_panelContent, .XTLPyG_bubble {
  animation: none;
}

.XTLPyG_panelContent {
  height: auto;
}

.XTLPyG_panelContent[data-size-detail="true"] {
  height: 100%;
}

.XTLPyG_panelContent .XTLPyG_quickSegments {
  background: none;
  gap: 6px;
  padding: 0;
}

.XTLPyG_panelContent .XTLPyG_quickSegments button {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 8px;
  gap: 4px;
  height: 34px;
  min-height: 34px;
}

.XTLPyG_panelContent .XTLPyG_quickSegments button[aria-pressed="true"] {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 22%,var(--dsw-alias-bg-layer-1));
  box-shadow: inset 0 0 0 1px var(--dsw-alias-brand-primary);
}

.XTLPyG_panelContent .XTLPyG_quickSegments svg {
  width: 15px;
  height: 15px;
}

.XTLPyG_panelContent > .XTLPyG_quickConversation {
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

.XTLPyG_conversationHeader {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  font-size: 12px;
  display: flex;
}

.XTLPyG_conversationHeader > div {
  align-items: center;
  gap: 2px;
  display: flex;
}

.XTLPyG_conversationHeader button:not(.XTLPyG_iconButton), .XTLPyG_assistantName, .XTLPyG_loadHistory {
  color: inherit;
  font: inherit;
  cursor: pointer;
  background: none;
  border: 0;
  border-radius: 4px;
  padding: 3px;
}

.XTLPyG_conversationHeader .XTLPyG_iconButton {
  width: 26px;
  min-width: 26px;
  height: 28px;
}

.XTLPyG_historyScope {
  color: var(--dsw-alias-label-secondary);
  flex: none;
  margin: 2px 0;
  font-size: 10px;
  line-height: 14px;
}

.XTLPyG_quickConversation .XTLPyG_recentMessages {
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

.XTLPyG_message {
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

.XTLPyG_message[data-role="user"] {
  align-self: flex-end;
  align-items: flex-end;
}

.XTLPyG_messageName {
  min-height: 19px;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  line-height: 17px;
}

.XTLPyG_assistantName {
  overflow-wrap: anywhere;
  max-width: 100%;
  min-height: 19px;
  padding: 0 2px;
  font-size: 11px;
  line-height: 17px;
}

.XTLPyG_assistantName:hover {
  color: var(--dsw-alias-label-primary);
  text-underline-offset: 3px;
  text-decoration: underline;
}

.XTLPyG_assistantNameInput {
  box-sizing: border-box;
  width: 140px;
  min-width: 60px;
  max-width: 160px;
  height: 23px !important;
  min-height: 23px !important;
  padding: 1px 5px !important;
  font-size: 12px !important;
}

.XTLPyG_message p {
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

.XTLPyG_message[data-role="user"] p {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 28%,var(--dsw-alias-bg-layer-1));
  border-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 45%,var(--dsw-alias-border-l2));
}

.XTLPyG_message small {
  color: var(--dsw-alias-label-secondary);
  font-size: 10px;
}

.XTLPyG_loadHistory {
  align-self: center;
  padding: 5px;
  font-size: 11px;
}

.XTLPyG_newMessages {
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

.XTLPyG_bubble {
  gap: 6px;
  padding: 0 7px;
  font-size: 11px;
}

.XTLPyG_bubbleBrand {
  flex: none;
  font-size: 12px;
  font-weight: 600;
}

.XTLPyG_bubbleStatus {
  white-space: nowrap;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 3px;
  min-width: 0;
  display: flex;
}

.XTLPyG_bubbleStatus svg {
  flex: none;
  width: 15px;
  height: 15px;
}

.XTLPyG_bubble > svg:last-child {
  flex: none;
  width: 14px;
  height: 14px;
}

.XTLPyG_voiceBars {
  align-items: center;
  gap: 2px;
  height: 16px;
  display: flex;
}

.XTLPyG_voiceBars i {
  background: var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary));
  opacity: .5;
  border-radius: 1px;
  width: 3px;
  height: 13px;
  transform: scaleY(.31);
}

.XTLPyG_voiceBars[data-active="true"] i {
  background: var(--dsw-alias-brand-primary);
  opacity: 1;
  animation: .7s ease-in-out infinite alternate XTLPyG_whaleInputPulse;
}

.XTLPyG_voiceBars[data-active="true"] i:nth-child(2n) {
  animation-delay: -.3s;
}

.XTLPyG_voiceBars[data-active="true"] i:nth-child(3) {
  animation-delay: -.5s;
}

@keyframes XTLPyG_whaleInputPulse {
  from {
    transform: scaleY(.38);
  }

  to {
    transform: scaleY(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .XTLPyG_voiceBars[data-active="true"] i {
    animation: none;
    transform: scaleY(.69);
  }
}

.XTLPyG_floating[data-motion="off"] .XTLPyG_voiceBars[data-active="true"] i {
  animation: none;
  transform: scaleY(.69);
}

@media (forced-colors: active) {
  .XTLPyG_message p {
    border: 1px solid canvastext;
  }

  .XTLPyG_quickSegments button[aria-pressed="true"] {
    outline: 2px solid highlight;
  }

  .XTLPyG_voiceBars i {
    background: canvastext;
  }
}

.XTLPyG_voicePrompt {
  flex-direction: column;
  gap: 8px;
  display: flex;
}

.XTLPyG_voicePrompt label {
  font-size: 13px;
  font-weight: 600;
}

.XTLPyG_voicePrompt label span {
  margin-left: 10px;
  font-weight: 400;
}

.XTLPyG_voicePromptInput {
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

.XTLPyG_voicePromptInput::placeholder {
  color: var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary));
  opacity: 1;
}

.XTLPyG_voicePromptInput:disabled {
  opacity: .65;
  cursor: not-allowed;
}

.XTLPyG_voicePromptInput:focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: 2px;
}

.XTLPyG_voicePromptCount {
  text-align: right;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
}

.XTLPyG_voicePromptActions {
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  display: flex;
}

.XTLPyG_voicePromptActions .XTLPyG_actions {
  margin: 0;
}

.XTLPyG_voicePromptMode {
  color: var(--dsw-alias-state-success-primary, var(--dsw-alias-label-secondary));
  white-space: nowrap;
  font-size: 11px;
}

.XTLPyG_voicePromptMode:before {
  content: "\u2022";
  margin-right: 5px;
}
`};var le=require("react/jsx-runtime");function Jn({small:e=!1,state:n="idle"}){return(0,le.jsx)("svg",{viewBox:"0 0 1024 1024","data-state":n,className:e?h.markSmall:h.mark,"aria-hidden":"true",children:(0,le.jsx)("path",{fill:"currentColor",d:"M 920.377 65.087 C 928.064 63.083 932.973 107.434 932.987 114.072 C 933.092 165.045 924.256 210.594 901.365 256.376 C 855.379 348.348 758.325 392.662 681.124 453.829 C 619.898 502.339 580.980 567.068 558.933 641.286 C 543.187 694.296 538.293 750.695 527.468 804.833 C 520.391 840.227 514.008 874.928 493.687 905.451 C 474.447 934.348 431.832 972.135 393.948 957.487 C 358.248 943.683 373.787 884.228 380.635 856.964 C 401.585 773.552 460.283 657.712 419.105 573.931 C 381.383 497.183 304.815 488.756 234.259 458.353 C 195.522 441.661 157.383 413.822 133.190 378.905 C 115.301 353.087 100.999 326.148 94.423 295.130 C 93.358 290.109 88.245 266.804 93.252 264.337 C 93.759 264.087 133.145 277.445 138.791 278.433 C 174.563 284.693 209.339 281.307 245.016 275.980 C 288.094 269.548 333.679 260.367 376.940 270.872 C 414.858 280.080 448.414 297.981 474.046 327.930 C 483.707 339.219 491.970 352.034 498.604 365.302 C 499.492 367.078 503.519 377.817 505.784 377.367 C 506.966 377.132 507.537 375.084 507.926 374.169 C 513.160 361.862 518.091 349.606 524.078 337.631 C 541.287 303.214 562.597 270.184 592.119 244.919 C 633.676 209.352 683.585 187.330 735.895 172.601 C 770.712 162.797 806.633 155.544 838.984 138.655 C 862.849 126.195 882.544 110.622 901.022 91.328 C 905.036 87.137 916.896 65.995 920.377 65.087 Z"})})}var ad=()=>({pet:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("path",{d:"M5 11c-2-8 4-10 7-8 5-2 9 2 7 8M5 10l4-4 3 3 3-3 4 4v5c0 4-3 6-7 6s-7-2-7-6v-5Z"}),(0,le.jsx)("path",{d:"M8 13v2m8-2v2m-6 3h4"})]}),settings:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("path",{d:"m9 3 1-1h4l1 1 .5 2 2 .8 2-.6 2 3-.8 1.8.2 2.2 1.3 1.5-2 3-2.1-.2-1.7 1.3-.5 2.2h-4l-.6-2.1-1.8-1.1-2 .3-2-3 1.3-1.7V10L4 8.5l2-3 2 .5L9 3Z"}),(0,le.jsx)("circle",{cx:"12",cy:"11.5",r:"3"})]}),minus:(0,le.jsx)("path",{d:"M5 12h14"}),plus:(0,le.jsx)("path",{d:"M12 5v14M5 12h14"}),down:(0,le.jsx)("path",{d:"m6 9 6 6 6-6"}),refresh:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("path",{d:"M20 6v5h-5M4 18v-5h5"}),(0,le.jsx)("path",{d:"M6 7a7 7 0 0 1 12-1l2 5M4 13l2 5a7 7 0 0 0 12-1"})]}),up:(0,le.jsx)("path",{d:"m6 15 6-6 6 6"}),check:(0,le.jsx)("path",{d:"m5 12 4 4L19 6"}),micOff:(0,le.jsx)(le.Fragment,{children:(0,le.jsx)("path",{d:"M9 9v3a3 3 0 0 0 5.1 2.1M15 8V6a3 3 0 0 0-5.7-1.3M6 10v2a6 6 0 0 0 10.2 4.3M18 12v-2M12 18v3M9 21h6M3 3l18 18"})}),mic:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("rect",{x:"9",y:"3",width:"6",height:"12",rx:"3"}),(0,le.jsx)("path",{d:"M6 10v2a6 6 0 0 0 12 0v-2M12 18v3M9 21h6"})]}),volume:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("path",{d:"M3 9h4l5-4v14l-5-4H3Z"}),(0,le.jsx)("path",{d:"M16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"})]}),chat:(0,le.jsx)("path",{d:"M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9l-5 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"}),close:(0,le.jsx)("path",{d:"m6 6 12 12M18 6 6 18"}),search:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("circle",{cx:"10",cy:"10",r:"6"}),(0,le.jsx)("path",{d:"m15 15 5 5"})]}),chevron:(0,le.jsx)("path",{d:"m9 5 7 7-7 7"}),warning:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("path",{d:"m12 3 10 18H2L12 3Z"}),(0,le.jsx)("path",{d:"M12 9v5m0 3v.2"})]})});function qe({name:e,className:n=""}){return(0,le.jsx)("svg",{viewBox:"0 0 24 24",width:"18",height:"18","aria-hidden":"true",className:n,fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round",children:ad()[e]??ad().chat})}var ze=require("react/jsx-runtime");function kh({name:e,save:n,t}){let[o,r]=(0,Ze.useState)(!1),[i,s]=(0,Ze.useState)(e),c=(0,Ze.useRef)(!1),l=(0,Ze.useRef)(null),u=(0,Ze.useRef)(null),d=(0,Ze.useRef)(!1);(0,Ze.useLayoutEffect)(()=>{o?(l.current?.focus({preventScroll:!0}),l.current?.select()):d.current&&(d.current=!1,u.current?.focus({preventScroll:!0}))},[o]);let m=()=>{r(!1),s(e)},f=()=>{let p=i.trim();p&&p.length<=40&&(n?.(p),d.current=!0,r(!1))};return o?(0,ze.jsx)(ir.Input,{ref:l,className:h.assistantNameInput,"aria-label":t("assistantName"),value:i,maxLength:40,"data-no-drag":!0,onChange:p=>s(p.target.value),onCompositionStart:()=>{c.current=!0},onCompositionEnd:()=>{c.current=!1},onBlur:m,onKeyDown:p=>{p.stopPropagation(),!(c.current||p.nativeEvent.isComposing)&&(p.key==="Escape"&&(p.preventDefault(),d.current=!0,m()),p.key==="Enter"&&(p.preventDefault(),f()))}}):(0,ze.jsx)("button",{ref:u,type:"button",className:h.assistantName,"data-no-drag":!0,title:t("renameAssistant"),onClick:()=>{s(e),r(!0)},children:e})}function ld({conversation:e,history:n,historyLoading:t,historyError:o,historyRetryCursor:r,loadHistory:i,assistantName:s,setAssistantName:c,close:l,t:u}){let[d,m]=(0,Ze.useState)(!1),[f,p]=(0,Ze.useState)(0),b=(0,Ze.useRef)(null),v=(0,Ze.useRef)(!0),y=(0,Ze.useRef)(null),x=(0,Ze.useRef)(null),L=e.rootSessionId,M=Uu(n?.rootSessionId===L?n.items:[],e.items),B=!v.current&&y.current?.firstId,C=B?M.findIndex(k=>k.id===B):-1,I=d?M:C>=0?M.slice(C):Fu(M),T=()=>{let k=b.current;if(!k)return;let z=k.getBoundingClientRect(),X=[...k.querySelectorAll("[data-message-id]")].find(P=>P.getBoundingClientRect().bottom>=z.top);x.current=X?{id:X.dataset.messageId,offset:X.getBoundingClientRect().top-z.top}:null},E=()=>{let k=b.current;k&&(k.scrollTop=k.scrollHeight),v.current=!0,p(0),T()},S=!d&&M.filter(k=>k.role==="user").length<10&&!!n?.nextCursor;return(0,Ze.useEffect)(()=>{S&&!t&&!o&&i?.(n.nextCursor)},[S,n?.nextCursor,t,o,L]),(0,Ze.useLayoutEffect)(()=>{let k=b.current;if(!k)return;let z=y.current;if((!z||z.root!==L)&&(v.current=!0,p(0)),v.current)k.scrollTop=k.scrollHeight;else{let X=x.current,P=X&&[...k.querySelectorAll("[data-message-id]")].find(N=>N.dataset.messageId===X.id);if(P?k.scrollTop+=P.getBoundingClientRect().top-k.getBoundingClientRect().top-X.offset:z&&(k.scrollTop=Math.min(z.top,k.scrollHeight-k.clientHeight)),z){let N=e.items.filter(G=>G.at>=z.lastAt&&!z.ids.has(G.id)).length;N&&p(G=>G+N)}}y.current={root:L,firstId:I[0]?.id,top:k.scrollTop,lastAt:Math.max(0,...M.map(X=>X.at)),ids:new Set(M.map(X=>X.id))},T()},[e,n,d,f]),(0,ze.jsxs)("section",{className:h.quickConversation,"data-dropdown":"conversation","data-no-drag":!0,role:"region","aria-label":u("recentConversation"),onKeyDown:k=>{k.key==="Escape"&&(k.stopPropagation(),l())},children:[(0,ze.jsxs)("div",{className:h.conversationHeader,children:[(0,ze.jsx)("strong",{children:u(d?"allRecords":"recentTenTurns")}),(0,ze.jsxs)("div",{children:[(0,ze.jsx)("button",{type:"button",onClick:()=>{d?(v.current=!0,x.current=null,y.current=null,p(0)):T(),m(k=>!k)},children:u(d?"collapseToTen":"showAllRecords")}),(0,ze.jsx)(ir.Button,{className:h.iconButton,"aria-label":u("close"),title:u("collapseConversation"),onClick:l,children:(0,ze.jsx)(qe,{name:"up"})})]})]}),d&&(0,ze.jsxs)("p",{className:h.historyScope,children:[u("currentVoiceRecords"),n?.truncated?" \xB7 "+u("historyTruncated"):""]}),(0,ze.jsxs)("div",{ref:b,className:h.recentMessages,"data-conversation-messages":!0,tabIndex:0,"aria-label":u("conversationMessages"),onWheel:k=>{k.deltaY<0&&(v.current=!1)},onScroll:()=>{let k=b.current;v.current=qu(k),v.current&&p(0),y.current&&(y.current.top=k.scrollTop),T()},children:[d&&n?.nextCursor&&(0,ze.jsx)("button",{className:h.loadHistory,disabled:t,onClick:()=>{T(),i?.(n.nextCursor)},children:u(t?"readingHistory":"loadEarlier")}),o&&(0,ze.jsx)("button",{className:h.loadHistory,disabled:t,onClick:()=>{i?.(r??void 0)},children:u("retryHistory")}),I.map(k=>(0,ze.jsxs)("div",{"data-message-id":k.id,"data-role":k.role,className:h.message,children:[(0,ze.jsx)("div",{className:h.messageName,children:k.role==="user"?(0,ze.jsx)("span",{children:u("you")}):(0,ze.jsx)(kh,{name:s,save:c,t:u})}),(0,ze.jsx)("p",{children:k.text}),["speech-failed","interrupted"].includes(k.state)&&(0,ze.jsx)("small",{children:u(k.state==="speech-failed"?"speechFailed":"speechInterrupted")})]},k.id)),!I.length&&(0,ze.jsx)("p",{className:h.hint,children:u(t||S?"readingHistory":"noConversation")})]}),f>0&&(0,ze.jsxs)("button",{className:h.newMessages,onClick:E,children:[(0,ze.jsx)(qe,{name:"down"}),f," ",u("newMessages")]})]})}var Yn=require("react"),Tt=require("@deepseek-ai/dsh-client-ui-primitives"),pn=require("react/jsx-runtime");function uo({label:e,value:n,onChange:t,kind:o,pickPath:r,sessionId:i,disabled:s,active:c=!0,scope:l,className:u,placeholder:d}){let[m,f]=(0,Yn.useState)(!1),[p,b]=(0,Yn.useState)(null),v=typeof n=="string"?n.split(/[\\/]/).filter(Boolean).at(-1)??n:"",y=(0,Yn.useRef)(null),x=(0,Yn.useRef)(null),L=()=>{y.current?.abort(),y.current=null,f(!1)};(0,Yn.useEffect)(()=>(L(),b(null),L),[i,s,c,l,n]);let M=async()=>{if(y.current||s||!c||!r)return;let B=new AbortController;y.current=B,f(!0),b(null);try{let C=await r(i,o,B.signal);y.current===B&&!B.signal.aborted&&!x.current?.closest("[hidden]")&&C!==null&&t(C)}catch(C){y.current===B&&!B.signal.aborted&&b(String(C?.message??C))}finally{y.current===B&&(y.current=null,f(!1))}};return(0,pn.jsxs)("div",{ref:x,className:u,"data-native-path":o,children:[(0,pn.jsxs)("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,minWidth:0},children:[(0,pn.jsxs)("label",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,minWidth:0},children:[e,(0,pn.jsx)(Tt.Input,{"aria-label":e,title:n??"",value:v,placeholder:d,disabled:s,readOnly:!0,style:{width:190,maxWidth:"100%",minWidth:0,textOverflow:"ellipsis"}})]}),(0,pn.jsx)(Tt.Button,{variant:"outline",disabled:s||!c||!r||m,onClick:()=>{M()},children:m?"\u7B49\u5F85\u9009\u62E9\u2026":o==="referenceAudio"||o==="campplus"?"\u9009\u62E9\u6587\u4EF6\u2026":"\u9009\u62E9\u6587\u4EF6\u5939\u2026"})]}),o==="campplus"&&n&&(0,pn.jsx)(Tt.Button,{variant:"outline",disabled:s,onClick:()=>{L(),t("")},children:"\u6E05\u9664\u53EF\u9009\u6A21\u578B"}),m&&(0,pn.jsx)(Tt.Button,{variant:"outline",onClick:L,children:"\u53D6\u6D88\u9009\u62E9"}),n&&(0,pn.jsxs)("details",{style:{fontSize:12,minWidth:0},children:[(0,pn.jsx)("summary",{children:"\u67E5\u770B\u5B8C\u6574\u8DEF\u5F84"}),(0,pn.jsx)("p",{style:{margin:"4px 0",overflowWrap:"anywhere"},children:n})]}),p&&(0,pn.jsx)("p",{role:"alert",children:p})]})}var Lt=require("react");var tn=require("react/jsx-runtime"),po=e=>e&&typeof e=="object"?`${e.backend}:${e.id}`:e==null?"":"__legacy";function cd({state:e,sessionId:n,run:t,t:o}){let r=(0,Lt.useRef)({state:e,sessionId:n,run:t}),i=(0,Lt.useRef)(void 0);r.current={state:e,sessionId:n,run:t},(0,Lt.useEffect)(()=>{!e.settings||e.settingsFor!==n||e.busy||e.audioDevicesPending||i.current===n||(i.current=n,t(n,"read-audio-devices"))},[n,e.settingsFor,e.busy,e.audioDevicesPending]),(0,Lt.useEffect)(()=>{let f=!1,p,b=async()=>{let v=r.current;!f&&v.sessionId===n&&!v.state.busy&&!document.hidden&&(v.state.settingsFor!==n&&await v.run(n,"read-settings"),f||await v.run(n,"read-audio-devices")),f||(p=document.defaultView.setTimeout(b,1e4))};return b(),()=>{f=!0,document.defaultView.clearTimeout(p)}},[n]);let s=!!(e.settings&&e.settingsFor===n),c=s?e.settings:null,l=c?.audioDevices??{input:c?.values?.device??null,output:null},u=e.audioDevicesFor===n?e.audioDevices:null,d=e.checkedFor===n&&!e.uncertain&&e.status?.enabled===!1&&e.status?.ownerSessionId===null&&e.status?.voiceControlBusy===!1&&e.status?.voiceSession?.fullyStopped===!0&&e.status?.voiceSession?.id==null,m=[];return(0,tn.jsxs)("section",{className:h.audioDevices,"aria-label":o("audioDevices"),"data-audio-device-controls":!0,"data-no-drag":!0,children:[(0,tn.jsx)("div",{className:h.audioDeviceGrid,children:["input","output"].map(f=>{let p=l[f],b=u?.[f],v=po(p),y=b?.items?.some(C=>po(C)===v),x=p&&typeof p=="object"&&b&&b.status!=="unavailable"&&!y,L=p==null?o("audioSystemDefault"):typeof p=="object"?p.name:String(p),M=f==="output"&&b?.reason==="AUDIO_PLATFORM_UNSUPPORTED",B=!s||e.busy||e.uncertain||e.settingsConflict||M||f==="input"&&!d;return x&&m.push(o(f==="input"?"inputDeviceMissing":"outputDeviceMissing")),(0,tn.jsxs)("label",{className:h.audioDeviceField,children:[(0,tn.jsxs)("span",{children:[(0,tn.jsx)(qe,{name:f==="input"?"mic":"volume"}),o(f==="input"?"audioInput":"audioOutput")]}),(0,tn.jsxs)("select",{"aria-label":o(f==="input"?"audioInput":"audioOutput"),"data-device-missing":x||void 0,title:B&&f==="input"&&!d?o("inputDeviceStopFirst"):M?o("outputDeviceUnsupported"):L,disabled:B,value:v,onFocus:()=>{e.audioDevicesPending||t(n,"read-audio-devices")},onChange:C=>{let I=C.target.value;if(I==="__legacy"||I===v)return;let T=I===""?null:b?.items?.find(E=>po(E)===I);T!==void 0&&t(n,"save-audio-device",{revision:c.revision,direction:f,selection:T})},children:[(0,tn.jsx)("option",{value:"",children:o("audioSystemDefault")}),p!=null&&!y&&(0,tn.jsxs)("option",{value:v,children:[L,x?" \xB7 "+o("deviceDisconnected"):typeof p=="object"?"":" \xB7 "+o("deviceSaved")]}),b?.items?.map(C=>(0,tn.jsx)("option",{value:po(C),children:C.name},po(C)))]})]},f)})}),m.length>0?(0,tn.jsx)("p",{className:h.audioDeviceNotice,role:"status",children:m.join("\uFF1B")}):e.audioDevicesError||u?.input?.status==="unavailable"||u?.output?.status==="unavailable"&&u?.output?.reason!=="AUDIO_PLATFORM_UNSUPPORTED"?(0,tn.jsx)("p",{className:h.audioDeviceHint,role:"status",children:o("deviceListRetry")}):u?.output?.reason==="AUDIO_PLATFORM_UNSUPPORTED"?(0,tn.jsx)("p",{className:h.audioDeviceHint,children:o("outputDeviceUnsupported")}):!d&&s?(0,tn.jsx)("p",{className:h.audioDeviceHint,children:o("inputDeviceStopFirst")}):null]})}var Ae=require("react"),mn=require("@deepseek-ai/dsh-client-ui-primitives");var re=require("react/jsx-runtime"),Ph={busy:"\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F",archived:"\u4F1A\u8BDD\u5DF2\u5F52\u6863",unavailable:"\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528"},zt=e=>e.title?.trim()||`\u672A\u547D\u540D\u4F1A\u8BDD \xB7 ${e.sessionId.slice(-6).toUpperCase()}`,sr=e=>Ph[e.availability],Xn=e=>["ready","busy"].includes(e?.availability),ar=(e,n)=>e.checkedFor===n&&!e.uncertain&&!e.busy&&!e.ttsCancelling&&!e.existingSessionWritePending&&!e.existingSessionUnconfirmed&&e.status?.voiceControlBusy===!1&&e.status?.voiceSession?.fullyStopped===!0&&e.status?.enabled===!1;function ud({sessionId:e,boundSession:n,state:t,controlContext:o,listExistingVoiceSessions:r,setExistingVoiceSession:i,readState:s,run:c,t:l}){let[u,d]=(0,Ae.useState)(),[m,f]=(0,Ae.useState)(!1),[p,b]=(0,Ae.useState)(!1),v=(0,Ae.useRef)(null),y=(0,Ae.useId)(),x=n?.sessionId??null,L=e===x,M=z=>ar(z,e)&&Object.hasOwn(z.status,"existingVoiceSession")&&(z.status.existingVoiceSession?.sessionId??null)===x,B=()=>o.currentConversation()===e&&o.sourceFor(e)===e;(0,Ae.useEffect)(()=>{let z=new AbortController;return v.current={signal:z.signal,choosing:!1},f(!1),r({sessionId:e},z.signal).then(X=>{z.signal.aborted||!B()||(d(X.items.find(P=>P.sessionId===e)??null),(X.binding?.sessionId??null)!==x&&c(e,"status"))}).catch(()=>{z.signal.aborted||d(null)}),()=>z.abort()},[e,x,o,r]);let C=async()=>{let z=v.current;if(!(!z||z.signal.aborted||z.choosing||!B())&&M(s())){z.choosing=!0,f(!0),b(!1);try{if(L){await i({sessionId:null,expectedSessionId:x});return}let X=await r({sessionId:e},z.signal);if(z.signal.aborted||!B())return;let P=X.items.find(G=>G.sessionId===e),N=(X.binding?.sessionId??null)!==x;if(N||!Xn(P)){d(P??null),b(!0),N&&c(e,"status");return}if(!M(s()))return;await i({sessionId:e,expectedSessionId:x})}catch{z.signal.aborted||b(!0)}finally{z.choosing=!1,z.signal.aborted||f(!1)}}},I=L?n:u,T=u===void 0&&!L,E=L||T||Xn(I);if(!E&&!p)return null;let S=l(L?"backToFishVoice":"chooseCurrentDshTarget"),k=T?l("checkingVoiceTarget"):I?zt(I):"";return(0,re.jsxs)("div",{className:h.currentDshTarget,"data-whale-current-target":!0,"data-no-drag":!0,children:[E&&(0,re.jsxs)(mn.Button,{variant:"outline",className:h.currentDshAction,"data-whale-operation":L?"unbind-existing-session":"bind-current-session","aria-label":S,"aria-busy":m||T,"aria-describedby":y,disabled:!M(t)||m||T,onClick:()=>{C()},children:[(0,re.jsx)("span",{children:S}),(0,re.jsx)("span",{id:y,className:h.ellipsis,title:k,children:k})]}),p&&(0,re.jsx)("p",{role:"alert",className:h.hint,children:l("currentDshTargetError")})]})}function Ii({state:e,sessionId:n,listExistingVoiceSessions:t,setExistingVoiceSession:o,openExistingVoiceSession:r,showHome:i,homePickerId:s,closeHomePicker:c,t:l}){let[u,d]=(0,Ae.useState)(null),[m,f]=(0,Ae.useState)(!1),[p,b]=(0,Ae.useState)(""),[v,y]=(0,Ae.useState)(null),[x,L]=(0,Ae.useState)(!1),[M,B]=(0,Ae.useState)(!1),[C,I]=(0,Ae.useState)(null),T=(0,Ae.useRef)(null),E=(0,Ae.useRef)(!1),S=(0,Ae.useId)(),k=!!s,z=k||m,X=e.status,P=Object.hasOwn(X??{},"existingVoiceSession")?X.existingVoiceSession:u?.binding,N=X?.existingVoiceSessionSupported!==!1,G=ar(e,n),V=e.existingSessionWritePending,F=u?.items.find(ne=>ne.sessionId===v),U=G&&!x&&!!P,K=G&&N&&!x&&!M&&!!u,de=(0,Ae.useCallback)(async(ne="",pe)=>{T.current?.abort();let ge=new AbortController;T.current=ge,L(!0),B(!1);try{let Ge=await t({...ne?{query:ne}:{},...pe?{cursor:pe}:{}},ge.signal);if(ge.signal.aborted)return;d(Ve=>({...Ge,query:ne,items:pe&&Ve?[...new Map([...Ve.items,...Ge.items].map($e=>[$e.sessionId,$e])).values()]:Ge.items}))}catch{ge.signal.aborted||B(!0)}finally{T.current===ge&&(T.current=null,L(!1))}},[t]);(0,Ae.useEffect)(()=>(E.current=!0,N?de():L(!1),()=>{E.current=!1,T.current?.abort(),T.current=null}),[de,N]);let ue=ne=>{ne.preventDefault(),y(null),I(null),de(p.trim())},Q=async ne=>{if(!(!(ne===null?U:K)||ne===(P?.sessionId??null))){I(null);try{let{binding:pe}=await o({sessionId:ne,expectedSessionId:P?.sessionId??null});if(!E.current)return;if(k){c();return}d(ge=>ge&&{...ge,binding:pe}),f(!1),y(null),b(""),I({text:pe?"\u5DF2\u7ED1\u5B9A\u3002\u70B9\u51FB\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u540E\u5373\u53EF\u7EE7\u7EED\u8BE5\u4F1A\u8BDD\u3002":"\u5DF2\u89E3\u9664\uFF0C\u4E0B\u4E00\u6B21\u5F00\u59CB\u5BF9\u8BDD\u5C06\u4F7F\u7528\u9C7C\u5E94\u4F1A\u8BDD\u3002"}),N&&de()}catch(pe){if(!E.current)return;I({error:!0,text:typeof pe?.message=="string"&&pe.message?pe.message.split(`
`)[0].slice(0,160):"\u4F1A\u8BDD\u7ED1\u5B9A\u672A\u786E\u8BA4\uFF0C\u8BF7\u6838\u5BF9\u5F53\u524D\u7ED1\u5B9A\u3002"}),y(null),N&&de(z?p.trim():"")}}},j=(0,re.jsxs)(re.Fragment,{children:[x&&(0,re.jsx)("p",{role:"status",className:h.hint,children:l("loadingVoiceTargets")}),M&&(0,re.jsxs)("div",{role:"alert",className:h.notice,children:[l("voiceTargetListError")," ",(0,re.jsx)(mn.Button,{variant:"outline",disabled:V,onClick:()=>{de(p.trim())},children:l("retryVoiceTargets")})]})]}),A=C&&(0,re.jsx)("p",{role:C.error?"alert":"status",className:C.error?h.notice:h.hint,children:C.text});return(0,re.jsxs)("section",{id:s,className:k?h.homeTargetPicker:h.section,"data-whale-existing-session":!0,"aria-label":k?l("chooseVoiceTarget"):void 0,"data-no-drag":k||void 0,children:[!k&&(0,re.jsxs)(re.Fragment,{children:[(0,re.jsx)("h3",{children:"\u8BED\u97F3\u5BF9\u8BDD\u76EE\u6807"}),(0,re.jsxs)("div",{className:h.existingSessionTarget,children:[(0,re.jsx)("strong",{className:h.sessionTitle,children:P?zt(P):"\u9C7C\u5E94\u4F1A\u8BDD"}),(0,re.jsx)("p",{className:h.hint,children:P?"\u8BED\u97F3\u548C\u56DE\u7B54\u5199\u5165\u6B64\u4F1A\u8BDD\uFF0C\u9C7C\u5E94\u4EC5\u5728\u672C\u673A\u64AD\u62A5\u3002\u5176\u4ED6\u63D2\u4EF6\u7684\u8F6C\u53D1\u7531\u5176\u8BBE\u7F6E\u51B3\u5B9A\u3002":"\u53EF\u7ED1\u5B9A\u5DF2\u6709 DSH \u4F1A\u8BDD\uFF0C\u6CBF\u7528\u539F\u6765\u7684\u4E0A\u4E0B\u6587\u548C\u5386\u53F2\u3002"}),P&&sr(P)&&(0,re.jsxs)("p",{role:"status",className:h.notice,children:[sr(P),"\u3002\u53EF\u89E3\u9664\u7ED1\u5B9A\u6216\u9009\u62E9\u5176\u4ED6\u4F1A\u8BDD\u3002"]}),!N&&(0,re.jsx)("p",{role:"status",className:h.notice,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u4E0D\u652F\u6301\u7ED1\u5B9A\u5DF2\u6709\u4F1A\u8BDD\u3002"}),X?.enabled&&(0,re.jsx)("p",{className:h.hint,children:"\u7ED3\u675F\u8BED\u97F3\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u7ED1\u5B9A\u3002"})]}),(0,re.jsxs)("div",{className:h.actions,children:[(0,re.jsx)(mn.Button,{variant:"outline","aria-expanded":z,disabled:!N||V,onClick:()=>{f(!z),y(null),b(""),z||de()},children:z?"\u5173\u95ED\u4F1A\u8BDD\u5217\u8868":P?"\u66F4\u6362\u7ED1\u5B9A":"\u9009\u62E9\u5DF2\u6709\u4F1A\u8BDD"}),Xn(P)&&r&&(0,re.jsx)(mn.Button,{variant:"outline","data-whale-operation":"open-native-session",onClick:async()=>{I(null);try{await r(P.sessionId),await i?.()}catch{E.current&&I({error:!0,text:"DSH \u6682\u65F6\u65E0\u6CD5\u6253\u5F00\u539F\u4F1A\u8BDD\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"})}},children:"\u6253\u5F00\u539F\u4F1A\u8BDD"}),P&&(0,re.jsx)(mn.Button,{variant:"outline","data-whale-operation":"unbind-existing-session",disabled:!U,onClick:()=>{Q(null)},children:"\u89E3\u9664\u7ED1\u5B9A"})]})]}),z&&(0,re.jsxs)("div",{className:h.existingSessionPicker,"aria-busy":x,children:[(0,re.jsxs)("form",{className:h.existingSessionSearch,onSubmit:ue,children:[(0,re.jsx)(mn.Input,{type:"search","aria-label":l("searchVoiceTargets"),placeholder:l("searchVoiceTargets"),value:p,maxLength:128,disabled:V,onChange:ne=>b(ne.target.value)}),(0,re.jsx)(mn.Button,{type:"submit",variant:"outline",disabled:V,children:l("searchVoiceTargetsAction")})]}),u?.items.length>0&&(0,re.jsx)("ul",{className:h.existingSessionList,"aria-label":l("existingVoiceTargetList"),children:u.items.map(ne=>{let pe=P?.sessionId===ne.sessionId,ge=pe||!Xn(ne),Ge=(0,re.jsxs)("span",{className:h.hint,children:[pe?l("boundVoiceTarget")+" \xB7 ":"",l("voiceTargetAvailability_"+(ne.unavailableReason??ne.availability))," \xB7 ",ne.sessionId]});return(0,re.jsx)("li",{children:k?(0,re.jsxs)(mn.Button,{variant:"ghost",className:h.homeTargetRow,"data-whale-operation":"bind-existing-session",title:ne.sessionId,"aria-current":pe||void 0,"aria-disabled":!K,disabled:ge,onClick:()=>{Q(ne.sessionId)},children:[(0,re.jsx)("strong",{className:h.sessionTitle,children:zt(ne)}),Ge]}):(0,re.jsxs)("label",{title:ne.sessionId,children:[(0,re.jsx)("input",{type:"radio",name:S,value:ne.sessionId,checked:v===ne.sessionId,disabled:ge||x||V,onChange:()=>{y(ne.sessionId),I(null)}}),(0,re.jsxs)("span",{children:[(0,re.jsx)("strong",{className:h.sessionTitle,children:zt(ne)}),Ge]})]})},ne.sessionId)})}),j,!x&&!M&&u?.items.length===0&&(0,re.jsx)("p",{role:"status",className:h.hint,children:l(u.query?"voiceTargetNoMatch":"voiceTargetEmptyList")}),F&&(0,re.jsx)("p",{id:S+"-tts",className:h.hint,children:l("voiceTargetSynthesisNotice")}),A,(!k||u?.nextCursor||P)&&(0,re.jsxs)("div",{className:h.actions,children:[!k&&(0,re.jsx)(mn.Button,{variant:"primary","data-whale-operation":"bind-existing-session","aria-describedby":F?S+"-tts":void 0,disabled:!K||!Xn(F)||F.sessionId===P?.sessionId,onClick:()=>{Q(v)},children:l(V?"savingVoiceTarget":"bindVoiceTarget")}),!!u?.nextCursor&&(0,re.jsx)(mn.Button,{variant:"outline",disabled:x||V,onClick:()=>{de(u.query,u.nextCursor)},children:l("moreVoiceTargets")}),k&&P&&(0,re.jsx)(mn.Button,{variant:"outline","data-whale-operation":"unbind-existing-session",disabled:!U,onClick:()=>{Q(null)},children:l("backToFishVoice")})]})]}),!z&&(0,re.jsxs)(re.Fragment,{children:[j,A]})]})}var Nt=require("react"),Ct=require("@deepseek-ai/dsh-client-ui-primitives");var cr="dsh-fish-voice";var Gi={name:"Emikosama",url:"https://github.com/Emikosama"};var dd="https://github.com/Emikosama/dsh-fish-voice",mo={url:"https://github.com/Emikosama/dsh-fish-voice/issues"};var xe=require("react/jsx-runtime");function pd(e,n){let t=e.updates;return e.updatePending==="install"?n("update_installing"):e.updatePending==="check"?n("update_checking"):e.updatesUnavailable?n("updateConnection"):t?t.message||n("update_"+t.status):n("update_idle")}function md({state:e,open:n,t}){let o=e.updates,r=!e.updatesUnavailable&&(o?.release||["restart-required","enable-required","installed"].includes(o?.status));return(0,xe.jsxs)("section",{className:h.section,"data-whale-update-settings":!0,children:[(0,xe.jsx)("h3",{children:t("updateTitle")}),o&&(0,xe.jsxs)("p",{className:h.hint,children:[t("updateCurrentVersion")," ",o.currentVersion," \xB7 ",t("updateChannel_"+o.channel)]}),(0,xe.jsx)("p",{children:pd(e,t)}),(0,xe.jsxs)("div",{className:h.actions,children:[r&&(0,xe.jsx)(Ct.Button,{variant:"outline",onClick:()=>n(!1),children:t("updateDetails")}),(0,xe.jsx)(Ct.Button,{variant:"outline",disabled:!!e.updatePending||!e.updatesUnavailable&&o?.status==="installing",onClick:()=>n(!0),children:t("updateCheck")}),(0,xe.jsx)("a",{href:mo.url,"data-whale-operation":"open-feedback",target:"_blank",rel:"noreferrer noopener",children:t("updateFeedback")})]})]})}function fd({state:e,close:n,run:t,t:o}){let r=(0,Nt.useRef)(null),i=(0,Nt.useId)();(0,Nt.useLayoutEffect)(()=>{let p=r.current;return typeof p.showModal=="function"?p.showModal():p.setAttribute("open",""),()=>{p.open&&p.close?.()}},[]);let s=e.updates,c=s?.release,l=!!e.updatePending||!e.updatesUnavailable&&["checking","installing"].includes(s?.status),u=!e.updatesUnavailable&&!l&&s?.canInstall&&c,d=!l&&(e.updatesUnavailable||!["restart-required","enable-required"].includes(s?.status)),m=!e.updatesUnavailable&&["available","incompatible"].includes(s?.status),f=u&&!s.message?null:pd(e,o);return(0,xe.jsxs)("dialog",{ref:r,className:h.updateDialog,"data-whale-update-dialog":!0,"data-no-drag":!0,"aria-labelledby":i,onCancel:p=>{p.preventDefault(),n()},onKeyDown:p=>p.stopPropagation(),children:[(0,xe.jsxs)("header",{className:h.updateHeader,children:[(0,xe.jsx)(Jn,{}),(0,xe.jsx)("h2",{id:i,children:o(m?"updateOfferTitle":"updateTitle")})]}),s&&(0,xe.jsxs)("p",{className:h.hint,children:[o("updateCurrentVersion")," ",s.currentVersion,c&&c.version!==s.currentVersion&&(0,xe.jsxs)(xe.Fragment,{children:[" \xB7 ",o("updateNewVersion")," ",c.version]})," \xB7 ",o("updateChannel_"+s.channel)]}),c?.announcement&&(0,xe.jsx)("p",{className:h.updateAnnouncement,children:c.announcement}),f&&(0,xe.jsx)("p",{className:h.hint,role:"status",children:f}),(0,xe.jsxs)("div",{className:h.actions,children:[(0,xe.jsx)(Ct.Button,{variant:"outline",onClick:n,children:o(m?"updateLater":"close")}),u&&(0,xe.jsx)(Ct.Button,{variant:"primary",className:h.primary,onClick:()=>{t({action:"install",version:c.version})},children:o("updateInstall")}),!u&&d&&(0,xe.jsx)(Ct.Button,{variant:"outline",onClick:()=>{t({action:"check"})},children:o("updateCheck")})]}),(0,xe.jsxs)("footer",{className:h.actions,children:[c?.url?.startsWith("https://")&&(0,xe.jsx)("a",{href:c.url,target:"_blank",rel:"noreferrer noopener",children:o("updateRelease")}),(0,xe.jsx)("a",{href:mo.url,"data-whale-operation":"open-feedback",target:"_blank",rel:"noreferrer noopener",children:o("updateFeedback")})]})]})}var Sh=new Map([["audio","settings-audio"],["interaction","settings-interaction"],["prompt","settings-prompt"],["models","settings-models"],["advanced","settings-advanced"],["pets","settings-pets"],["sessions","page-session-management"]]);function Th(e){if(e.nativeEvent?.isTrusted!==!0)return null;let n=e.target;if(!n?.closest)return null;let t=n.closest("[data-whale-operation-log]");return t&&!(e.type==="click"&&n.closest("summary")?.parentElement===t)?null:n}function hd(e){let n=Th(e);if(!n)return null;if(e.type==="submit")return"commit-form";if(e.type==="keydown")return e.key==="Escape"?"dismiss":["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key)&&n.closest('[data-settings-nav], [role="listbox"]')?"keyboard-navigation":null;if(e.type==="change")return n.matches('input[type="radio"]')&&["listen-mode-ptt","listen-mode-always","listen-mode-wake"].includes(n.dataset.whaleOperation)?n.dataset.whaleOperation:n.closest("[data-audio-device-controls] select")?"change-audio-device":n.matches('select, input[type="radio"], input[type="checkbox"]')?"edit-choice":null;if(e.type!=="click")return null;let t=n.closest("button, a[href], summary");if(!t||t.type==="submit"&&t.form)return null;let o=t.dataset.whaleOperation;return o==="open-feedback"&&t.matches("summary")&&t.parentElement.open?"dismiss":t.matches("summary")&&["session-history","subagent-history"].includes(o)?o+(t.parentElement.open?"-close":"-open"):o||(t.hasAttribute("data-settings-tab")?Sh.get(t.dataset.settingsTab)??"page-settings-tab":t.closest("[data-whale-session-management], [data-whale-existing-session]")?"manage-session":t.closest("[data-settings-page-heading] nav")?"page-model-tab":t.matches("summary")?"details-toggle":"activate-control")}var Dn=require("react"),$i=require("@deepseek-ai/dsh-client-ui-primitives");var Ye=require("react/jsx-runtime"),Lh="fish-voice-operation-log.log",gd=256*1024,zh=(e,n)=>(e+n).slice(-gd);function vd({readOperationLog:e}){let[n,t]=(0,Dn.useState)(!1),[o,r]=(0,Dn.useState)(!1),[i,s]=(0,Dn.useState)(null),[c,l]=(0,Dn.useState)(null),u=(0,Dn.useRef)(null);if((0,Dn.useEffect)(()=>()=>u.current?.abort(),[]),!e)return null;let d=async f=>{if(u.current)return;let p=new AbortController;u.current=p,r(!0),l(null);try{let b=await e(p.signal);if(p.signal.aborted)return;if(f){let v=URL.createObjectURL(new Blob(b,{type:"text/plain;charset=utf-8"})),y=document.createElement("a");y.href=v,y.download=Lh,Ch(y),setTimeout(()=>URL.revokeObjectURL(v),1e3),l("\u5DF2\u8BF7\u6C42\u4FDD\u5B58\u8BCA\u65AD\u65E5\u5FD7\u3002")}else s({text:b.reduce(zh,""),shortened:b.reduce((v,y)=>v+y.length,0)>gd})}catch{p.signal.aborted||l("\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u8BCA\u65AD\u65E5\u5FD7\uFF0C\u8BF7\u91CD\u8BD5\u3002")}finally{u.current===p&&(u.current=null),p.signal.aborted||r(!1)}},m=f=>{let p=f.currentTarget.open;t(p),p||(u.current?.abort(),u.current=null,r(!1),s(null),l(null))};return(0,Ye.jsxs)("details",{className:h.section,"data-whale-operation-log":!0,open:n,onToggle:m,children:[(0,Ye.jsx)("summary",{"data-whale-operation":"open-feedback",children:"\u6392\u67E5\u4E0E\u53CD\u9988"}),n&&(0,Ye.jsxs)(Ye.Fragment,{children:[(0,Ye.jsx)("p",{className:h.hint,children:"\u6700\u8FD1\u4E03\u5929\u7684\u64CD\u4F5C\u65E5\u5FD7\u3002\u53EF\u5148\u67E5\u770B\uFF0C\u518D\u81EA\u884C\u51B3\u5B9A\u662F\u5426\u968F\u53CD\u9988\u63D0\u4EA4\u3002"}),(0,Ye.jsxs)("div",{className:h.actions,children:[(0,Ye.jsx)($i.Button,{variant:"outline",disabled:o,onClick:()=>{d(!1)},children:"\u67E5\u770B\u8BCA\u65AD\u65E5\u5FD7"}),(0,Ye.jsx)($i.Button,{variant:"outline",disabled:o,onClick:()=>{d(!0)},children:"\u4FDD\u5B58\u8BCA\u65AD\u65E5\u5FD7"}),(0,Ye.jsx)("a",{href:mo.url+"/new",target:"_blank",rel:"noreferrer noopener",children:"\u63D0\u4EA4\u53CD\u9988"})]}),o&&(0,Ye.jsx)("p",{role:"status",className:h.hint,children:"\u6B63\u5728\u8BFB\u53D6\u8BCA\u65AD\u65E5\u5FD7\u2026"}),c&&(0,Ye.jsx)("p",{role:"status",className:h.hint,children:c}),i?.shortened&&(0,Ye.jsx)("p",{className:h.hint,children:"\u8FD9\u91CC\u53EA\u663E\u793A\u6700\u8FD1\u4E00\u6BB5\uFF0C\u4FDD\u5B58\u53EF\u53D6\u5F97\u5B8C\u6574\u65E5\u5FD7\u3002"}),i&&(0,Ye.jsx)("pre",{className:h.requestDetails,tabIndex:0,"aria-label":"\u64CD\u4F5C\u65E5\u5FD7\u9884\u89C8",children:i.text||"\u6682\u65E0\u64CD\u4F5C\u65E5\u5FD7\u3002"})]})]})}function Ch(e){document.body.append(e);try{e.click()}finally{e.remove()}}var O=require("react"),W=require("@deepseek-ai/dsh-client-ui-primitives");var he=require("react"),me=require("@deepseek-ai/dsh-client-ui-primitives");var D={jobHeading:"g9LBoq_jobHeading",field:"g9LBoq_field",setupEnter:"g9LBoq_setupEnter",currentModel:"g9LBoq_currentModel",consentActions:"g9LBoq_consentActions",selectedModel:"g9LBoq_selectedModel",wizardBody:"g9LBoq_wizardBody",switcher:"g9LBoq_switcher",job:"g9LBoq_job",actions:"g9LBoq_actions",section:"g9LBoq_section",sourceChoices:"g9LBoq_sourceChoices",modelChoices:"g9LBoq_modelChoices",choices:"g9LBoq_choices",hint:"g9LBoq_hint",inlineField:"g9LBoq_inlineField",wizard:"g9LBoq_wizard",choice:"g9LBoq_choice",note:"g9LBoq_note",primary:"g9LBoq_primary",jobs:"g9LBoq_jobs",installPath:"g9LBoq_installPath",plan:"g9LBoq_plan",header:"g9LBoq_header",modelInstaller:"g9LBoq_modelInstaller",switchRow:"g9LBoq_switchRow",wizardBodyContent:"g9LBoq_wizardBodyContent",fullName:"g9LBoq_fullName",installHistory:"g9LBoq_installHistory",hardwareSummary:"g9LBoq_hardwareSummary",badge:"g9LBoq_badge",details:"g9LBoq_details",text:`.g9LBoq_section {
  min-width: 0;
  color: var(--dsw-alias-label-primary);
  gap: 8px;
  display: grid;
}

.g9LBoq_section h3, .g9LBoq_wizard h2, .g9LBoq_plan h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
}

.g9LBoq_section p, .g9LBoq_wizard p {
  margin: 0;
  line-height: 1.6;
}

.g9LBoq_hint, .g9LBoq_section small, .g9LBoq_wizard small {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 1.6;
}

.g9LBoq_note {
  border-left: 2px solid var(--dsw-alias-state-warn-primary);
  background: var(--dsw-alias-bg-layer-2);
  padding: 8px 12px;
  font-size: 12px;
}

.g9LBoq_actions, .g9LBoq_header {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  display: flex;
}

.g9LBoq_header {
  justify-content: space-between;
  align-items: flex-start;
}

.g9LBoq_choices {
  border: 0;
  gap: 8px;
  min-width: 0;
  margin: 0;
  padding: 0;
  display: grid;
}

.g9LBoq_choices legend {
  color: var(--dsw-alias-label-secondary);
  padding: 0 0 8px;
  font-size: 12px;
}

.g9LBoq_choice {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  cursor: pointer;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 10px;
  display: flex;
}

.g9LBoq_choice[data-selected="true"] {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,var(--dsw-alias-bg-layer-1));
}

.g9LBoq_choice input {
  accent-color: var(--dsw-alias-brand-primary);
  margin: 4px 0 0;
}

.g9LBoq_choice span {
  min-width: 0;
}

.g9LBoq_choice small, .g9LBoq_plan small {
  overflow-wrap: anywhere;
  display: block;
}

.g9LBoq_choice strong {
  font-size: 13px;
}

.g9LBoq_field {
  gap: 6px;
  font-size: 12px;
  display: grid;
}

.g9LBoq_field input, .g9LBoq_field select {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}

.g9LBoq_field select {
  font: inherit;
  color: inherit;
  background: var(--dsw-alias-bg-layer-2);
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  padding: 8px;
}

.g9LBoq_details {
  border-top: 1px solid var(--dsw-alias-border-l2);
  min-width: 0;
  padding-top: 12px;
}

.g9LBoq_details summary {
  cursor: pointer;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

.g9LBoq_details[open] > summary {
  margin-bottom: 12px;
}

.g9LBoq_badge {
  border-radius: var(--dsw-radius-sm);
  color: var(--dsw-alias-label-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,var(--dsw-alias-bg-layer-1));
  margin-left: 8px;
  padding: 2px 6px;
  font-size: 11px;
}

.g9LBoq_plan, .g9LBoq_job {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  gap: 10px;
  min-width: 0;
  padding: 12px;
  display: grid;
}

.g9LBoq_plan dl {
  grid-template-columns: auto minmax(0, 1fr);
  gap: 6px 12px;
  margin: 0;
  font-size: 12px;
  display: grid;
}

.g9LBoq_plan dt {
  color: var(--dsw-alias-label-secondary);
}

.g9LBoq_plan dd {
  overflow-wrap: anywhere;
  margin: 0;
}

.g9LBoq_plan a {
  color: var(--dsw-alias-link);
  overflow-wrap: anywhere;
  font-size: 12px;
}

.g9LBoq_plan ul {
  margin: 0;
  padding-left: 16px;
  font-size: 12px;
}

.g9LBoq_jobs {
  gap: 12px;
  display: grid;
}

.g9LBoq_job progress {
  width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
}

.g9LBoq_wizard {
  box-sizing: border-box;
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-layer-1);
  border-radius: var(--dsw-radius-lg);
}

.g9LBoq_section button, .g9LBoq_wizard button {
  transition: transform var(--ds-transition-duration-fast, .1s) var(--whale-ease, ease-out);
}

.g9LBoq_section button:active:not(:disabled), .g9LBoq_wizard button:active:not(:disabled) {
  transform: scale(.97);
}

.g9LBoq_section :is(button, input, select, a, summary):focus-visible, .g9LBoq_wizard :is(button, summary):focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

[data-motion="firm"] .g9LBoq_wizard {
  --whale-duration: var(--ds-transition-duration-fast, .1s);
  --whale-ease: ease-out;
}

[data-motion="off"] .g9LBoq_wizard, [data-motion="off"] .g9LBoq_wizard *, [data-motion="off"] .g9LBoq_section * {
  transition: none !important;
  animation: none !important;
  transform: none !important;
}

@keyframes g9LBoq_setupEnter {
  from {
    translate: 0 4px;
  }

  to {
    translate: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .g9LBoq_wizard, .g9LBoq_wizard *, .g9LBoq_section * {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
}

@media (width <= 520px) {
  .g9LBoq_wizard {
    padding: 12px;
  }

  .g9LBoq_plan dl {
    grid-template-columns: minmax(0, 1fr);
    gap: 3px;
  }

  .g9LBoq_plan dd {
    margin-bottom: 6px;
  }
}

@media (forced-colors: active) {
  .g9LBoq_choice[data-selected="true"] {
    outline: 2px solid highlight;
  }
}

.g9LBoq_wizard {
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

.g9LBoq_wizard > .g9LBoq_header, .g9LBoq_wizard > footer {
  flex-shrink: 0;
}

.g9LBoq_wizardBody {
  overscroll-behavior: contain;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.g9LBoq_wizardBodyContent {
  align-content: start;
  gap: 12px;
  display: grid;
}

.g9LBoq_primary {
  color: var(--dsw-alias-label-primary) !important;
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 16%,var(--dsw-alias-bg-layer-2)) !important;
  border: 1px solid var(--dsw-alias-border-l2) !important;
}

.g9LBoq_primary:disabled {
  opacity: .5;
}

.g9LBoq_choices {
  gap: 6px;
}

.g9LBoq_choice {
  box-sizing: border-box;
  align-items: center;
  min-height: 38px;
}

.g9LBoq_choice input {
  flex: none;
  margin: 0;
}

.g9LBoq_choice strong {
  display: block;
}

.g9LBoq_choice:has(input:disabled) {
  cursor: default;
  opacity: .65;
}

.g9LBoq_note p {
  margin: 0;
}

.g9LBoq_note button {
  margin-top: 8px;
}

.g9LBoq_wizard > footer {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

.g9LBoq_wizardBody {
  padding: 2px 4px 8px 0;
}

.g9LBoq_section > button, .g9LBoq_wizardBody > button {
  justify-self: start;
  max-width: 100%;
}

.g9LBoq_section button, .g9LBoq_wizard button {
  white-space: normal;
  max-width: 100%;
  height: auto;
  min-height: 36px;
}

.g9LBoq_actions > button {
  flex: 0 auto;
}

.g9LBoq_sourceChoices {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.g9LBoq_sourceChoices legend {
  grid-column: 1 / -1;
}

.g9LBoq_inlineField {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-width: 0;
  font-size: 12px;
  display: flex;
}

.g9LBoq_inlineField select {
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

.g9LBoq_inlineField input[type="number"] {
  width: 80px;
  min-width: 0;
}

.g9LBoq_field:has( > input[type="number"]) {
  flex-wrap: wrap;
  align-items: center;
  display: flex;
}

.g9LBoq_field > input[type="number"] {
  width: 80px;
}

.g9LBoq_details > summary {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  box-sizing: content-box;
  width: fit-content;
  max-width: 100%;
  min-height: 20px;
  padding: 7px 10px;
}

.g9LBoq_fullName {
  min-width: 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

.g9LBoq_fullName summary {
  cursor: pointer;
}

.g9LBoq_fullName p {
  overflow-wrap: anywhere;
}

.g9LBoq_consentActions {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  display: flex;
}

@container (width <= 360px) {
  .g9LBoq_sourceChoices {
    grid-template-columns: minmax(0, 1fr);
  }

  .g9LBoq_inlineField select {
    width: 150px;
  }
}

@media (width <= 420px) {
  .g9LBoq_wizard .g9LBoq_sourceChoices {
    grid-template-columns: minmax(0, 1fr);
  }
}

.g9LBoq_modelChoices {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.g9LBoq_modelChoices > legend {
  grid-column: 1 / -1;
  padding-bottom: 5px;
}

.g9LBoq_modelChoices .g9LBoq_choice {
  gap: 7px;
  min-height: 80px;
  padding: 8px;
}

.g9LBoq_modelChoices .g9LBoq_choice strong {
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  display: flex;
}

.g9LBoq_modelChoices .g9LBoq_badge {
  white-space: nowrap;
  margin-left: 0;
}

.g9LBoq_hardwareSummary {
  color: var(--dsw-alias-label-secondary);
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 2px 10px;
  font-size: 11px;
  display: flex;
}

.g9LBoq_hardwareSummary small {
  font-size: 10px;
}

.g9LBoq_currentModel, .g9LBoq_switchRow, .g9LBoq_jobHeading {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.g9LBoq_currentModel {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  padding: 7px 8px;
  font-size: 12px;
}

.g9LBoq_currentModel > span, .g9LBoq_switchRow > span {
  overflow-wrap: anywhere;
  min-width: 0;
}

.g9LBoq_currentModel button, .g9LBoq_switchRow button {
  flex: none;
  min-height: 30px;
  padding: 0 9px;
}

.g9LBoq_switcher {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  gap: 7px;
  padding: 8px;
  display: grid;
}

.g9LBoq_switchRow small {
  display: block;
}

.g9LBoq_selectedModel {
  border-top: 1px solid var(--dsw-alias-border-l2);
  gap: 7px;
  padding-top: 6px;
  display: grid;
}

.g9LBoq_selectedModel .g9LBoq_details {
  padding-top: 4px;
}

.g9LBoq_selectedModel .g9LBoq_details summary {
  border: 0;
  padding: 3px 0;
}

.g9LBoq_installHistory {
  border-top: 1px solid var(--dsw-alias-border-l2);
}

.g9LBoq_installHistory > summary {
  cursor: pointer;
  padding: 8px 0;
  font-size: 12px;
  display: list-item;
}

.g9LBoq_installHistory > summary small {
  margin-left: 12px;
}

.g9LBoq_installHistory .g9LBoq_job {
  gap: 6px;
  padding: 9px;
}

.g9LBoq_jobHeading {
  flex-wrap: wrap;
}

.g9LBoq_installPath {
  min-width: 0;
  font-size: 11px;
}

.g9LBoq_installPath summary {
  cursor: pointer;
  color: var(--dsw-alias-label-secondary);
}

.g9LBoq_installPath p {
  overflow-wrap: anywhere;
}

.g9LBoq_modelInstaller .g9LBoq_jobs:empty {
  display: none;
}

@container (width <= 300px) {
  .g9LBoq_modelChoices {
    grid-template-columns: minmax(0, 1fr);
  }

  .g9LBoq_currentModel {
    flex-wrap: wrap;
  }
}

.g9LBoq_section[aria-label="\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84"] p {
  overflow-wrap: anywhere;
}

.g9LBoq_choice {
  transition: background-color .12s ease-out, border-color .12s ease-out, box-shadow .12s ease-out;
}

.g9LBoq_choice:hover:has(input:not(:disabled)) {
  border-color: var(--dsw-alias-brand-primary);
}

.g9LBoq_choice:has(input:focus-visible) {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: 2px;
}

.g9LBoq_section :is(button, select, input, summary), .g9LBoq_wizard :is(button, select, input, summary) {
  transition: background-color .12s ease-out,border-color .12s ease-out,color .12s ease-out,transform var(--whale-duration, .2s) var(--whale-ease, ease-out);
}

.g9LBoq_section button:hover:not(:disabled), .g9LBoq_wizard button:hover:not(:disabled) {
  background-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,var(--dsw-alias-bg-layer-1));
}

.g9LBoq_plan, .g9LBoq_switcher, .g9LBoq_selectedModel, .g9LBoq_section [data-whale-save-result], .g9LBoq_wizardBodyContent > section {
  animation: g9LBoq_setupEnter var(--whale-duration, .2s) ease-out;
}

[data-motion="firm"] :is(.g9LBoq_section, .g9LBoq_wizard) {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="off"] :is(.g9LBoq_section, .g9LBoq_wizard), [data-motion="off"] :is(.g9LBoq_section, .g9LBoq_wizard) *, [data-motion="off"] :is(.g9LBoq_section, .g9LBoq_wizard) :before {
  transition: none !important;
  animation: none !important;
}

[data-motion="off"] :is(.g9LBoq_section, .g9LBoq_wizard) button:active {
  transform: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .g9LBoq_section, .g9LBoq_wizard, .g9LBoq_section *, .g9LBoq_wizard *, .g9LBoq_section :before, .g9LBoq_wizard :before {
    transition: none !important;
    animation: none !important;
  }

  .g9LBoq_section button:active, .g9LBoq_wizard button:active {
    transform: none !important;
  }
}
`};var g=require("react/jsx-runtime"),yd=[["edge","Edge \u5728\u7EBF\u6717\u8BFB","\u9ED8\u8BA4\u6653\u4F0A \xB7 \u8FDE\u4E0D\u4E0A\u65F6\u663E\u793A\u6587\u5B57"],["local","\u672C\u5730\u8BED\u97F3\u6A21\u578B","\u5728\u672C\u673A\u5408\u6210\uFF0C\u9996\u6B21\u9700\u8981\u4E0B\u8F7D"],["off","\u4E0D\u53D1\u58F0","\u53EA\u663E\u793A\u6587\u5B57"]],xd=[yd[0],["deepseek","DeepSeek \u8BED\u97F3\u5408\u6210","\u4F7F\u7528 DeepSeek \u5F00\u653E\u5E73\u53F0\u7684 API Key"],...yd.slice(1)],bd={edge:"Edge \u5728\u7EBF\u6717\u8BFB",deepseek:"DeepSeek \u8BED\u97F3\u5408\u6210",local:"\u672C\u5730\u8BED\u97F3\u6A21\u578B"},Oi={provider:"unconfigured",edgeVoice:"zh-CN-XiaoyiNeural",deepseekVoice:"stella",deepseekTextTransmissionAccepted:!1,systemVoice:null,systemFallback:!1,edgeTextTransmissionAccepted:!1,volume:.8,localModelId:null,localModelPath:null,referenceAudioPath:null},Bi=e=>{let n={...e};return delete n.referenceAudioAccepted,n},_d=(e,n)=>({...Bi(e),referenceAudioAccepted:e.referenceAudioPath===n?.referenceAudioPath&&n?.referenceAudioAccepted===!0}),kd=D.text,Nh=e=>({"restart-requires-resume":"\u5BBF\u4E3B\u5DF2\u91CD\u542F\uFF0C\u8BF7\u7EE7\u7EED\u540E\u91CD\u65B0\u6838\u9A8C\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u8986\u76D6\u8BBE\u7F6E\u3002","authorization-changed":"\u6388\u6743\u5DF2\u6539\u53D8\uFF0C\u8BF7\u5728\u6743\u9650\u4E2D\u6838\u67E5\u540E\u7EE7\u7EED\u3002",MODEL_SOURCE_AUTHORIZATION_REQUIRED:"\u6A21\u578B\u6765\u6E90\u6388\u6743\u5DF2\u53D8\u5316\uFF0C\u8BF7\u8865\u5145\u4E00\u6B21\u6388\u6743\u540E\u7EE7\u7EED\u3002",HUMAN_SETTING_PINNED:"\u8BBE\u7F6E\u6743\u9650\u5DF2\u64A4\u9500\uFF0C\u8BF7\u5728\u6743\u9650\u4E2D\u6838\u67E5\u540E\u7EE7\u7EED\u3002"})[e]??(typeof e=="string"&&/^[A-Z_:-]+$/.test(e)?"\u8FD0\u884C\u68C0\u67E5\u672A\u901A\u8FC7\uFF0C\u8BF7\u68C0\u67E5\u4F9D\u8D56\u6216\u67E5\u770B\u9AD8\u7EA7\u8BBE\u7F6E\u4E2D\u7684\u9519\u8BEF\u3002":e),yn=e=>Number.isFinite(e)&&e>=0?`${(e/1024**2).toFixed(1)} MiB`:"\u672A\u77E5";function Pd(e,n){let t=e.status;return!!(e.checkedFor===n&&e.settingsFor===n&&e.settings?.revision&&!e.ttsCancelling&&!e.ttsUncertain&&!e.uncertain&&!e.settingsConflict&&t?.enabled===!1&&t?.ownerSessionId===null&&t?.voiceControlBusy===!1&&t?.voiceSession?.fullyStopped===!0&&t?.voiceSession?.id===null&&!t?.ttsRuntime?.busy&&!t?.ttsRuntime?.blocked)}function st(e,n){return!e.busy&&Pd(e,n)}function At(e,n){let t=(0,he.useRef)(!1),[o,r]=(0,he.useState)(!1),[i,s]=(0,he.useState)(null),[c,l]=(0,he.useState)(0);return[async(d,m)=>{if(t.current)return!1;t.current=!0,r(!0),s(d);try{return await e(n,d,m)}catch{return!1}finally{t.current=!1,r(!1),s(null),l(f=>f+1)}},o,i,{isLocked:()=>t.current,settled:c}]}function Sd({state:e,sessionId:n,run:t}){if(Pd(e,n))return null;let o=e.checkedFor===n&&(e.status?.enabled||e.status?.ownerSessionId);return(0,g.jsxs)("div",{className:D.note,role:"status",children:[(0,g.jsx)("p",{children:e.busy?"\u6B63\u5728\u8BFB\u53D6\u6216\u4FDD\u5B58\uFF0C\u8BF7\u7A0D\u5019\u2026":o?"\u8BF7\u5148\u505C\u6B62\u8BED\u97F3\uFF0C\u518D\u7F16\u8F91\u6216\u8BD5\u542C\u3002":e.ttsUncertain||e.uncertain?"\u6B63\u5728\u6838\u67E5\u4E0A\u6B21\u64CD\u4F5C\u3002":"\u6B63\u5728\u51C6\u5907\u8BBE\u7F6E\u2026"}),o&&n&&t&&(0,g.jsx)(me.Button,{variant:"outline",disabled:e.busy&&(!e.interruptibleRead||e.diagnosticStopPending)||e.ttsCancelling,onClick:()=>{t(n,"disable")},children:"\u505C\u6B62\u8BED\u97F3\u4EE5\u7F16\u8F91"})]})}function Td(e){let n=e.state.settingsFor===e.sessionId?e.state.settings:null,t=e.state.authorization?.scopes?.some(r=>r.id==="edge-text"&&r.allowed)===!0,o=n&&t?{...n,ttsSetup:{...n.ttsSetup,edgeTextTransmissionAccepted:!0}}:n;return(0,g.jsx)(Ah,{...e,settings:o},`${e.sessionId}:${e.state.settingsKey??o?.revision??"unread"}`)}function Ah({state:e,sessionId:n,run:t,settings:o,prepared:r=!1,active:i=!0,markSettingsEdited:s,pickPath:c}){let[l,u]=(0,he.useState)(()=>({...Oi,...o?.ttsSetup})),[d,m,f]=At(t,n),p=(0,he.useId)(),[b,v]=(0,he.useState)(!1),y=e.ttsCapabilitiesFor===n?e.ttsCapabilities:null,x=e.checkedFor===n?e.status?.ttsRuntime:null,L=e.ttsPreviewFor===n?e.ttsPreview:null,M=e.installerFor===n?e.installer?.jobs?.find(S=>dr(S,o)):null,B=!st(e,n)||m,C=JSON.stringify(l)!==JSON.stringify({...Oi,...o?.ttsSetup}),I=S=>{s?.("save-tts"),u(k=>({...k,...S}))},T=l.localModelId==="qwen3-tts-base-1.7b-gguf",E=l.provider!=="unconfigured"&&(l.provider!=="local"||!!(l.localModelId&&l.localModelPath)&&(!l.referenceAudioPath||T))&&(l.provider!=="edge"||l.edgeTextTransmissionAccepted)&&(l.provider!=="deepseek"||l.deepseekTextTransmissionAccepted&&y?.deepseekKeyAvailable===!0)&&l.volume!==""&&Number.isFinite(Number(l.volume))&&Number(l.volume)>=0&&Number(l.volume)<=1;return(0,g.jsxs)("section",{className:D.section,"aria-label":"\u6717\u8BFB\u8BBE\u7F6E","data-settings-draft":"save-tts",children:[(0,g.jsx)("header",{children:(0,g.jsx)("h3",{children:"\u56DE\u7B54\u600E\u4E48\u53D1\u58F0"})}),(!r||n&&!(e.checkedFor===n&&(e.status?.enabled||e.status?.ownerSessionId)))&&(0,g.jsx)(Sd,{state:e,sessionId:n,run:t}),(!r||!o||!y||e.uncertain||e.ttsUncertain||l.provider==="deepseek"&&y.deepseekKeyAvailable!==!0)&&(0,g.jsx)("div",{className:D.actions,children:(0,g.jsx)(me.Button,{variant:"outline",disabled:e.busy||m,onClick:()=>d("inspect-tts"),children:l.provider==="deepseek"?"\u68C0\u67E5 DeepSeek API Key":"\u68C0\u6D4B\u672C\u673A\u8BED\u97F3"})}),(0,g.jsxs)("fieldset",{className:`${D.choices} ${D.sourceChoices}`,disabled:B||!o,children:[(0,g.jsx)("legend",{children:"\u6717\u8BFB\u6765\u6E90"}),xd.map(([S,k,z])=>(0,g.jsxs)("label",{className:D.choice,"data-selected":l.provider===S,children:[(0,g.jsx)("input",{type:"radio",name:p,checked:l.provider===S,onChange:()=>I({provider:S,...S==="edge"?{edgeTextTransmissionAccepted:!0}:S==="deepseek"?{deepseekTextTransmissionAccepted:!0}:{}})}),(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:k}),(0,g.jsx)("small",{children:z})]})]},S))]}),l.provider==="edge"&&(0,g.jsxs)("div",{className:D.section,children:[(0,g.jsx)("p",{className:D.hint,children:"\u6717\u8BFB\u6587\u5B57\u4F1A\u53D1\u9001\u7ED9\u5FAE\u8F6F\u3002\u8054\u7F51\u5931\u8D25\u65F6\uFF0C\u56DE\u7B54\u4F1A\u663E\u793A\u4E3A\u6587\u5B57\u3002"}),y?.edgeDependency==="missing"&&(0,g.jsx)("p",{role:"status",className:D.hint,children:"Edge \u6717\u8BFB\u7EC4\u4EF6\u6682\u4E0D\u53EF\u7528\u3002\u56DE\u7B54\u4F1A\u663E\u793A\u4E3A\u6587\u5B57\u3002"})]}),l.provider==="deepseek"&&(0,g.jsxs)("div",{className:D.section,children:[(0,g.jsx)("p",{className:D.hint,children:"\u8BD5\u542C\u6216\u4FDD\u5B58\u540E\u6717\u8BFB\u65F6\uFF0C\u6587\u5B57\u4F1A\u53D1\u9001\u7ED9 DeepSeek\u3002"}),y?.deepseekKeyAvailable!==!0&&(0,g.jsx)("p",{role:"status",className:D.hint,children:"\u8BF7\u5148\u5728 DSH \u7684 DeepSeek API Key \u63D0\u4F9B\u5546\u4E2D\u914D\u7F6E\u5F00\u653E\u5E73\u53F0\u5BC6\u94A5\uFF0C\u518D\u70B9\u300C\u68C0\u67E5 DeepSeek API Key\u300D\u3002"}),(0,g.jsxs)("label",{className:D.inlineField,children:["DeepSeek \u97F3\u8272",(0,g.jsxs)("select",{value:l.deepseekVoice,disabled:B,onChange:S=>I({deepseekVoice:S.target.value}),children:[(0,g.jsx)("option",{value:"stella",children:"\u6D77\u661F \xB7 \u5973\u58F0"}),(0,g.jsx)("option",{value:"tide",children:"\u6697\u6F6E \xB7 \u7537\u58F0"})]})]})]}),l.provider==="local"&&(l.localModelId?(0,g.jsxs)("div",{className:D.section,children:[(0,g.jsxs)("div",{className:D.currentModel,children:[(0,g.jsxs)("span",{children:["\u5F53\u524D\u6717\u8BFB\u6A21\u578B ",(0,g.jsx)("strong",{children:l.localModelId.startsWith("qwen3")?"Qwen3-TTS":l.localModelId.includes("melo")?"MeloTTS":l.localModelId})]}),(0,g.jsx)(me.Button,{variant:"outline","aria-expanded":b,disabled:C,onClick:()=>v(S=>!S),children:"\u5207\u6362\u5F53\u524D\u6A21\u578B"})]}),b&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(zd,{state:e,sessionId:n,run:t,purpose:"tts"}),(0,g.jsxs)("details",{className:D.details,children:[(0,g.jsx)("summary",{children:"\u5B89\u88C5\u5176\u4ED6\u6717\u8BFB\u6A21\u578B"}),(0,g.jsx)(ur,{pickPath:c,state:e,sessionId:n,run:t,active:i})]})]})]}):(0,g.jsx)(ur,{pickPath:c,state:e,sessionId:n,run:t,active:i})),l.provider==="local"&&!C&&M?.modelId==="qwen3-tts-base-1.7b-gguf"&&(0,g.jsxs)("p",{className:D.hint,children:["\u5F53\u524D\u5B89\u88C5\u65B9\u6848\uFF1A",fo(M.compute),"\u3002",M.compute==="cpu"?"\u6B64\u5B89\u88C5\u53EA\u4F7F\u7528 CPU\u3002\u53EF\u5728\u201C\u5207\u6362\u5F53\u524D\u6A21\u578B \u2192 \u5B89\u88C5\u5176\u4ED6\u6717\u8BFB\u6A21\u578B\u201D\u9009\u62E9\u81EA\u52A8 GPU\uFF1B\u4E0B\u8F7D\u8FD0\u884C\u7EC4\u4EF6\u524D\u4ECD\u9700\u786E\u8BA4\u3002":"\u662F\u5426\u5B9E\u9645\u4F7F\u7528 GPU\uFF0C\u4EE5\u5B8C\u6210\u5408\u6210\u540E\u7684\u672C\u5730\u8BA1\u7B97\u72B6\u6001\u4E3A\u51C6\u3002"]}),(0,g.jsxs)("details",{className:D.details,children:[(0,g.jsx)("summary",{children:"\u97F3\u8272\u4E0E\u97F3\u91CF"}),(0,g.jsxs)("div",{className:D.section,children:[l.provider==="local"&&(T||l.referenceAudioPath)&&(0,g.jsxs)("div",{className:D.section,"data-reference-voice":!0,children:[(0,g.jsx)(uo,{className:D.field,label:"\u53C2\u8003\u97F3\u9891\uFF08WAV\uFF09",kind:"referenceAudio",value:l.referenceAudioPath,disabled:B||!T,active:i,scope:l.provider+":"+l.localModelId,pickPath:c,sessionId:n,placeholder:"\u8BF7\u70B9\u51FB\u9009\u62E9\u6587\u4EF6",onChange:S=>I({referenceAudioPath:S.trim()||null})}),l.referenceAudioPath&&(0,g.jsx)(me.Button,{variant:"outline",disabled:B,onClick:()=>I({referenceAudioPath:null}),children:"\u6E05\u9664\u53C2\u8003\u97F3\u8272"})]}),l.provider!=="local"&&l.referenceAudioPath&&(0,g.jsxs)("div",{className:D.section,children:[(0,g.jsx)("p",{className:D.hint,children:"\u672C\u5730\u53C2\u8003\u97F3\u8272\u5DF2\u4FDD\u7559\u3002"}),(0,g.jsx)(me.Button,{variant:"outline",disabled:B,onClick:()=>I({referenceAudioPath:null}),children:"\u6E05\u9664\u53C2\u8003\u97F3\u8272"})]}),l.provider==="edge"&&(0,g.jsxs)("label",{className:D.inlineField,children:["Edge \u97F3\u8272",(0,g.jsxs)("select",{value:l.edgeVoice,disabled:B,onChange:S=>I({edgeVoice:S.target.value}),children:[(0,g.jsx)("option",{value:"zh-CN-XiaoxiaoNeural",children:"\u6653\u6653 \xB7 \u666E\u901A\u8BDD"}),(0,g.jsx)("option",{value:"zh-CN-YunxiNeural",children:"\u4E91\u5E0C \xB7 \u666E\u901A\u8BDD"}),(0,g.jsx)("option",{value:"zh-CN-XiaoyiNeural",children:"\u6653\u4F0A \xB7 \u666E\u901A\u8BDD"}),(0,g.jsx)("option",{value:"zh-CN-YunjianNeural",children:"\u4E91\u5065 \xB7 \u666E\u901A\u8BDD"}),(0,g.jsx)("option",{value:"zh-TW-HsiaoChenNeural",children:"\u6653\u81FB \xB7 \u53F0\u6E7E\u4E2D\u6587"}),(0,g.jsx)("option",{value:"zh-HK-HiuMaanNeural",children:"\u6653\u66FC \xB7 \u9999\u6E2F\u7CA4\u8BED"})]})]}),(0,g.jsxs)("label",{className:D.inlineField,children:["\u6717\u8BFB\u97F3\u91CF",(0,g.jsx)(Xt,{"aria-label":"\u6717\u8BFB\u97F3\u91CF\u6ED1\u5757",min:"0",max:"1",step:"0.05",value:l.volume,disabled:B,onChange:S=>I({volume:Number(S.target.value)})}),(0,g.jsx)(me.Input,{type:"number",min:"0",max:"1",step:"0.05",value:l.volume,disabled:B,onChange:S=>I({volume:S.target.value})})]})]})]}),(0,g.jsxs)("div",{className:D.actions,children:[(0,g.jsx)(me.Button,{variant:"primary",className:D.primary,disabled:B||!E||!C,onClick:()=>d("save-tts",{revision:o.revision,values:Bi({...l,volume:Number(l.volume)})}),children:m?"\u5904\u7406\u4E2D\u2026":"\u4FDD\u5B58\u6717\u8BFB\u8BBE\u7F6E"}),(0,g.jsx)(me.Button,{variant:"outline",disabled:B||!o?.ttsSetup||!E||!["edge","deepseek","local"].includes(l.provider),onClick:()=>d("preview-tts",C?{revision:o.revision,values:_d({...l,volume:Number(l.volume)},o.ttsSetup)}:void 0),children:C?"\u8BD5\u542C\u5F53\u524D\u9009\u62E9":"\u8BD5\u542C\u5DF2\u4FDD\u5B58\u914D\u7F6E"}),(0,g.jsx)(me.Button,{variant:"outline",disabled:!(x?.busy||x?.blocked||e.ttsUncertain||e.ttsCancelling||L?.status==="preparing"||f==="preview-tts"),onClick:()=>{t(n,"cancel-tts")},children:"\u505C\u6B62\u8BD5\u542C"})]}),L&&(0,g.jsxs)("p",{role:"status",className:D.hint,children:[{preparing:"\u8BD5\u542C\u51C6\u5907\u4E2D",cancelling:"\u6B63\u5728\u505C\u6B62\u8BD5\u542C",cancelled:"\u8BD5\u542C\u5DF2\u53D6\u6D88",idle:"\u8BD5\u542C\u5DF2\u505C\u6B62",completed:"\u8BD5\u542C\u5DF2\u7ED3\u675F","text-only":"Edge \u6682\u4E0D\u53EF\u7528\uFF0C\u56DE\u7B54\u4F1A\u663E\u793A\u4E3A\u6587\u5B57",failed:"\u8BD5\u542C\u5931\u8D25\uFF0C\u6B63\u5728\u6838\u67E5\u72B6\u6001",unconfirmed:"\u65E0\u6CD5\u786E\u8BA4\u8BD5\u542C\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B"}[L.status]??L.status,L.status!=="text-only"&&bd[L.provider]?` \xB7 ${bd[L.provider]}`:""]}),x&&(0,g.jsxs)("p",{role:"status",className:D.hint,children:[x.blocked?"\u8BD5\u542C\u5C1A\u672A\u505C\u6B62\uFF0C\u8BF7\u91CD\u542F\u5BBF\u4E3B\u3002":`\u6717\u8BFB\u72B6\u6001\uFF1A${{idle:"\u7A7A\u95F2",preparing:"\u51C6\u5907\u4E2D",synthesizing:"\u5408\u6210\u4E2D","playback-requested":"\u5DF2\u8BF7\u6C42\u64AD\u653E","text-only":"\u5728\u7EBF\u6717\u8BFB\u6682\u4E0D\u53EF\u7528\uFF0C\u5DF2\u663E\u793A\u6587\u5B57",completed:"\u8BD5\u542C\u5DF2\u7ED3\u675F",cancelled:"\u5DF2\u53D6\u6D88",failed:"\u5931\u8D25"}[x.state]??x.state}`,x.localComputeBackend?` \xB7 \u672C\u5730\u8BA1\u7B97\uFF1A${x.localComputeBackend.toUpperCase()}${x.localComputeVerified?"\uFF08\u5DF2\u5B8C\u6210\u5408\u6210\uFF09":"\uFF08\u5F85\u9A8C\u8BC1\uFF09"}`:"",x.localComputeFallback?" \xB7 \u5DF2\u56DE\u9000\u540C\u6A21\u578B CPU":""]}),x?.localTimings&&(0,g.jsxs)("details",{className:D.details,children:[(0,g.jsx)("summary",{children:"\u5DF2\u5B8C\u6210\u6717\u8BFB\u7247\u6BB5\u8017\u65F6"}),(0,g.jsxs)("p",{className:D.hint,children:["\u51C6\u5907 ",(x.localTimings.preparationMs/1e3).toFixed(2)," \u79D2 \xB7 \u8BBE\u5907\u9009\u62E9 ",(x.localTimings.deviceSelectionMs/1e3).toFixed(2)," \u79D2 \xB7 \u5408\u6210 ",(x.localTimings.synthesisMs/1e3).toFixed(2)," \u79D2 \xB7 \u64AD\u653E ",(x.localTimings.playbackMs/1e3).toFixed(2)," \u79D2"]}),(0,g.jsxs)("p",{className:D.hint,children:[x.localTimings.chunks," \u6BB5 \xB7 ",x.localTimings.modelResident?"\u4E0A\u6B21\u7247\u6BB5\u7ED3\u675F\u65F6\u6A21\u578B\u4ECD\u9A7B\u7559\uFF0C\u5B8C\u6574\u5408\u6210\u540E\u64AD\u653E\u3002\u51C6\u5907\u5305\u542B\u6587\u4EF6\u6821\u9A8C\uFF1B\u5408\u6210\u5305\u542B\u9996\u6B21\u52A0\u8F7D\u548C\u670D\u52A1\u54CD\u5E94\u3002":"\u5F53\u524D\u672C\u5730\u6A21\u578B\u9010\u6BB5\u542F\u52A8\uFF0C\u5B8C\u6574\u5408\u6210\u540E\u64AD\u653E\u3002\u51C6\u5907\u5305\u542B\u6587\u4EF6\u6821\u9A8C\uFF1B\u5408\u6210\u5305\u542B\u52A0\u8F7D\u4E0E\u5931\u8D25\u91CD\u8BD5\u3002","\u8017\u65F6\u4E0D\u662F\u9996\u97F3\u5EF6\u8FDF\u6216 GPU \u52A0\u901F\u6BD4\u3002"]})]})]})}function dr(e,n){if(e.status!=="installed"||!e.installedPath||!n)return!1;if(e.purpose==="tts"||e.recommendedSettings?.tts)return n.ttsSetup?.provider==="local"&&n.ttsSetup.localModelId===e.modelId&&n.ttsSetup.localModelPath===e.installedPath;let t=e.recommendedSettings;return!t||t.asr!==n.modelSetup?.asr?!1:Object.entries(t.models??{}).some(([o,r])=>r===e.installedPath&&n.modelSetup?.models?.[o]===r)}function Ld(e,n){return(e?.models??[]).map(t=>{let o=(e.jobs??[]).filter(s=>s.modelId===t.id),r=o.filter(s=>s.status==="installed").sort((s,c)=>String(c.updatedAt??c.createdAt??"").localeCompare(String(s.updatedAt??s.createdAt??""))),i=r.find(s=>dr(s,n));return{model:t,jobs:o,installed:r,current:i,preferred:i??r[0],active:o.find(s=>["queued","running","paused","failed"].includes(s.status))}})}var pr=e=>(e?.title??e?.id??"").split(" \xB7 ")[0],fo=e=>({cpu:"CPU",auto:"\u81EA\u52A8 GPU",cuda:"CUDA / HIP",vulkan:"Vulkan"})[e]??e??"\u672A\u77E5",Ri=e=>{let n=new Date(e);return Number.isFinite(n.getTime())?n.toLocaleString():"\u65F6\u95F4\u672A\u77E5"};function zd({state:e,sessionId:n,run:t,purpose:o}){let[r,i]=At(t,n),s=e.installerFor===n?e.installer:null,c=e.settingsFor===n?e.settings:null,l=Ld(s,c).filter(d=>(!o||d.model.purpose===o)&&d.preferred),u=st(e,n)&&!i&&!e.settingsDraftActions?.some(d=>["save-models","save-tts"].includes(d));return(0,g.jsxs)("section",{className:D.switcher,"aria-label":"\u5207\u6362\u5DF2\u5B89\u88C5\u6A21\u578B","data-no-settings-draft":!0,children:[s?l.length?l.map(({model:d,preferred:m,current:f})=>(0,g.jsxs)("div",{className:D.switchRow,children:[(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:pr(d)}),(0,g.jsxs)("small",{children:[d.purpose==="tts"?"\u6717\u8BFB":"\u8BC6\u522B"," \xB7 ",fo(m.compute),f?" \xB7 \u5F53\u524D\u914D\u7F6E":""]})]}),(0,g.jsxs)("div",{className:D.actions,children:[d.purpose==="tts"&&!f&&(0,g.jsx)(me.Button,{variant:"outline",disabled:!u||!m.installedPath,onClick:()=>r("preview-tts",{revision:c.revision,values:_d({...c.ttsSetup,provider:"local",localModelId:d.id,localModelPath:m.installedPath,referenceAudioPath:null},c.ttsSetup)}),children:"\u5148\u8BD5\u542C"}),(0,g.jsx)(me.Button,{variant:"outline",disabled:!u||!!f,onClick:()=>r("apply-model-install",{id:m.id,revision:c.revision}),children:f?"\u5F53\u524D\u6A21\u578B":"\u9A8C\u8BC1\u5E76\u5207\u6362"})]})]},d.id)):(0,g.jsx)("p",{className:D.hint,children:"\u5C1A\u65E0\u53EF\u5207\u6362\u7684\u5DF2\u5B89\u88C5\u6A21\u578B\uFF0C\u8BF7\u5148\u5728\u6A21\u578B\u4E0B\u8F7D\u4E2D\u5B89\u88C5\u3002"}):(0,g.jsx)("p",{className:D.hint,children:"\u6B63\u5728\u8BFB\u53D6\u5DF2\u5B89\u88C5\u6A21\u578B\u3002"}),!!l.length&&!u&&(0,g.jsx)("p",{className:D.hint,children:"\u5207\u6362\u6A21\u578B\u524D\u9700\u505C\u6B62\u8BED\u97F3\uFF0C\u5DF2\u5B89\u88C5\u6587\u4EF6\u4E0D\u4F1A\u91CD\u65B0\u4E0B\u8F7D\u3002"})]})}function wd({job:e,snapshot:n,settings:t,disabled:o,writable:r,execute:i,history:s=!1}){let c=dr(e,t);return(0,g.jsxs)("article",{className:D.job,"data-model-job":e.id,children:[(0,g.jsxs)("div",{className:D.jobHeading,children:[(0,g.jsx)("strong",{children:pr(n.models.find(l=>l.id===e.modelId))||e.modelId}),(0,g.jsxs)("small",{children:[fo(e.compute)," \xB7 ",Ri(e.createdAt)]})]}),(0,g.jsxs)("p",{role:"status",children:[c?"\u5F53\u524D\u914D\u7F6E \xB7 ":"",{queued:"\u7B49\u5F85\u4E2D",running:"\u5904\u7406\u4E2D",paused:"\u5DF2\u6682\u505C",failed:"\u5931\u8D25",cancelled:"\u5DF2\u53D6\u6D88",installed:"\u5DF2\u5B89\u88C5\uFF0C\u5B57\u8282\u6821\u9A8C\u901A\u8FC7","checking-runtime":"\u68C0\u67E5\u8FD0\u884C\u4F9D\u8D56","verifying-local":"\u6821\u9A8C\u672C\u673A\u5DF2\u6709\u6A21\u578B",downloading:"\u4E0B\u8F7D\u4E2D",verifying:"\u6821\u9A8C\u6587\u4EF6",installing:"\u63D0\u4EA4\u5B89\u88C5"}[e.stage]??e.stage]}),!s&&Number.isFinite(e.totalBytes)&&e.totalBytes>0&&Number.isFinite(e.receivedBytes)&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("progress",{max:e.totalBytes,value:Math.min(e.receivedBytes,e.totalBytes),"aria-label":"\u4E0B\u8F7D\u5B57\u8282\u8FDB\u5EA6"}),(0,g.jsxs)("small",{children:["\u4E0B\u8F7D ",yn(e.receivedBytes)," / ",yn(e.totalBytes)]})]}),e.error&&(0,g.jsx)("p",{role:"alert",children:e.error.message}),s&&e.installedPath&&(0,g.jsxs)("details",{className:D.installPath,children:[(0,g.jsx)("summary",{children:"\u5B89\u88C5\u4F4D\u7F6E"}),(0,g.jsx)("p",{children:e.installedPath})]}),(0,g.jsxs)("div",{className:D.actions,children:[["queued","running"].includes(e.status)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:o,onClick:()=>i("control-model-install",{id:e.id,operation:"pause"}),children:"\u6682\u505C\uFF0C\u4FDD\u7559\u8FDB\u5EA6"}),["paused","failed"].includes(e.status)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:o,onClick:()=>i("control-model-install",{id:e.id,operation:"resume"}),children:"\u6062\u590D\u540C\u4E00\u6765\u6E90\u4E0B\u8F7D"}),["queued","running","paused","failed"].includes(e.status)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:o,onClick:()=>i("control-model-install",{id:e.id,operation:"cancel"}),children:"\u53D6\u6D88\u5E76\u6E05\u9664\u6B64\u4EFB\u52A1\u4E34\u65F6\u6587\u4EF6"}),e.status==="installed"&&!c&&(0,g.jsx)(me.Button,{variant:"outline",disabled:!r,onClick:()=>i("apply-model-install",{id:e.id,revision:t.revision}),children:"\u9A8C\u8BC1\u5E76\u5207\u6362"})]}),e.status==="installed"&&(0,g.jsx)("small",{children:"\u5207\u6362\u524D\u8BF7\u7ED3\u675F\u5BF9\u8BDD\u3002\u4E0B\u6B21\u5F00\u59CB\u5BF9\u8BDD\u65F6\u4F7F\u7528\u65B0\u6A21\u578B\u3002"})]})}function Cd({state:e,sessionId:n,run:t}){let[o,r]=(0,he.useState)(""),[i,s]=(0,he.useState)("cpu"),[c,l]=(0,he.useState)(!1),[u,d]=At(t,n),m=e.installerFor===n?e.installer:null,f=e.settingsFor===n?e.settings:null,p=Ld(m,f).filter(T=>T.model.id!=="sensevoice-int8-2024-07-17"||T.active),b=p.find(T=>T.model.id===o),v=b?.model,y=e.installPlanFor===n&&e.installPlan?.modelId===o&&e.installPlan?.compute===i&&!e.installPlan?.sourceDirectory?e.installPlan:null,x=!!e.busy||e.uncertain||e.installerUncertain||d,L=!d&&st(e,n)&&!e.settingsDraftActions?.some(T=>["save-models","save-tts"].includes(T)),M=(0,he.useId)(),B=(m?.jobs??[]).filter(T=>["installed","cancelled"].includes(T.status)).slice().reverse(),C=m?.hardware,I=m?.refresh?.observedAt??m?.compute?.observedAt;return(0,g.jsxs)("section",{className:`${D.section} ${D.modelInstaller}`,"aria-label":"\u6A21\u578B\u5B89\u88C5",children:[(0,g.jsxs)("div",{className:D.hardwareSummary,children:[(0,g.jsxs)("span",{children:["\u5185\u5B58 ",yn(C?.totalMemoryBytes)," \xB7 \u53EF\u7528 ",yn(C?.availableMemoryBytes)," \xB7 \u663E\u5B58 ",yn(C?.gpuMemoryBytes)]}),(0,g.jsxs)("small",{children:[I?"\u66F4\u65B0\u4E8E "+Ri(I):"\u7B49\u5F85\u68C0\u6D4B"," \xB7 \u6BCF 5 \u5206\u949F"]})]}),(m?.refresh?.error||e.modelComputeError)&&(0,g.jsxs)("p",{className:D.hint,role:"status",children:[m?.refresh?.error??"\u672C\u6B21\u786C\u4EF6\u68C0\u6D4B\u672A\u5B8C\u6210","\uFF1B\u4FDD\u7559\u4E0A\u6B21\u7ED3\u679C\u3002"]}),e.installerError&&(0,g.jsx)("p",{role:"alert",className:D.note,children:e.installerError}),e.installerUncertain&&(0,g.jsx)("p",{role:"status",className:D.note,children:"\u6B63\u5728\u6838\u67E5\u5B89\u88C5\u72B6\u6001\u3002"}),(0,g.jsxs)("div",{className:D.currentModel,children:[(0,g.jsxs)("span",{children:["\u8BC6\u522B ",(0,g.jsx)("strong",{children:"SenseVoice"})," \xB7 \u6717\u8BFB ",(0,g.jsx)("strong",{children:f?.ttsSetup?.provider==="local"?f.ttsSetup.localModelId?.startsWith("qwen3")?"Qwen3-TTS":f.ttsSetup.localModelId?.startsWith("vits-melo")?"MeloTTS":f.ttsSetup.localModelId??"\u672C\u5730\u6A21\u578B":{edge:"Edge",deepseek:"DeepSeek",off:"\u4E0D\u53D1\u58F0"}[f?.ttsSetup?.provider]??"\u672A\u914D\u7F6E"})]}),(0,g.jsx)(me.Button,{variant:"outline","aria-expanded":c,onClick:()=>l(T=>!T),children:"\u5207\u6362\u5F53\u524D\u6A21\u578B"})]}),c&&(0,g.jsx)(zd,{state:e,sessionId:n,run:t}),m?(0,g.jsxs)("fieldset",{className:`${D.choices} ${D.modelChoices}`,disabled:x,children:[(0,g.jsx)("legend",{children:"\u9009\u62E9\u6A21\u578B"}),p.map(({model:T,current:E,preferred:S,active:k})=>(0,g.jsxs)("label",{className:D.choice,"data-selected":o===T.id,children:[(0,g.jsx)("input",{type:"radio",name:M,checked:o===T.id,onChange:()=>{r(T.id),s(T.computeOptions?.includes("auto")?"auto":"cpu")}}),(0,g.jsxs)("span",{children:[(0,g.jsxs)("strong",{children:[pr(T),T.recommendation?.recommended&&(0,g.jsx)("span",{className:D.badge,children:"\u63A8\u8350"})]}),(0,g.jsxs)("small",{children:[T.purpose==="tts"?"\u6717\u8BFB":"\u8BC6\u522B"," \xB7 ",yn(T.totalBytes)]}),(0,g.jsx)("small",{children:E?"\u5F53\u524D\u914D\u7F6E":k?{queued:"\u7B49\u5F85\u4E0B\u8F7D",running:"\u4E0B\u8F7D\u5904\u7406\u4E2D",paused:"\u4E0B\u8F7D\u5DF2\u6682\u505C",failed:"\u4E0B\u8F7D\u5931\u8D25"}[k.status]:S?"\u5DF2\u5B89\u88C5\uFF0C\u53EF\u5207\u6362":T.available?"\u53EF\u51C6\u5907\u5B89\u88C5":"\u6682\u4E0D\u53EF\u5B89\u88C5"}),!T.available&&(0,g.jsx)("small",{children:T.reason??T.recommendation?.reason})]})]},T.id))]}):(0,g.jsx)("p",{className:D.note,children:"\u6B63\u5728\u8BFB\u53D6\u6A21\u578B\u5217\u8868\u3002"}),v&&(0,g.jsxs)("div",{className:D.selectedModel,children:[(0,g.jsxs)("label",{className:D.inlineField,children:["\u63A8\u7406\u8BBE\u5907",(0,g.jsx)("select",{value:i,disabled:x,onChange:T=>s(T.target.value),children:(v.computeOptions??["cpu"]).map(T=>(0,g.jsxs)("option",{value:T,children:[fo(T),T==="cpu"?"":" \xB7 CPU \u515C\u5E95"]},T))})]}),(0,g.jsxs)("div",{className:D.actions,children:[b.preferred&&(0,g.jsx)(me.Button,{variant:"outline",disabled:!L||!!b.current,onClick:()=>u("apply-model-install",{id:b.preferred.id,revision:f.revision}),children:b.current?"\u5F53\u524D\u6A21\u578B":"\u9A8C\u8BC1\u5E76\u5207\u6362"}),(0,g.jsx)(me.Button,{variant:"outline",disabled:x||!v.available,onClick:()=>u("plan-model-install",{modelId:o,compute:i}),children:b.preferred?"\u67E5\u770B\u5176\u4ED6\u5B89\u88C5\u65B9\u6848":"\u67E5\u770B\u5B89\u88C5\u8BA1\u5212"})]}),(0,g.jsxs)("details",{className:D.details,children:[(0,g.jsx)("summary",{children:"\u63A8\u8350\u4F9D\u636E\u4E0E\u8BBE\u5907\u8BF4\u660E"}),(0,g.jsx)("p",{className:D.hint,children:v.recommendation?.reason??"\u63A8\u8350\u4F9D\u636E\u672A\u77E5\uFF0C\u53EF\u624B\u52A8\u9009\u62E9\u3002"}),(0,g.jsx)("p",{className:D.hint,children:v.purpose==="tts"?i==="cpu"?"\u4EC5\u51C6\u5907 CPU \u8FD0\u884C\u65F6\u3002":"\u51C6\u5907\u56FA\u5B9A Vulkan \u4E0E CPU \u7EC4\u4EF6\uFF0C\u5B9E\u9645\u53EF\u7528\u6027\u4ECD\u9700\u672C\u673A\u5408\u6210\u9A8C\u8BC1\u3002":"\u6B64\u6A21\u578B\u4F7F\u7528 CPU\u3002"})]})]}),y&&(0,g.jsxs)(me.MenuSurface,{className:D.plan,"aria-label":"\u6A21\u578B\u5B89\u88C5\u8BA1\u5212",children:[(0,g.jsx)("h4",{children:"\u6A21\u578B\u5B89\u88C5"}),(0,g.jsxs)("dl",{children:[(0,g.jsx)("dt",{children:"\u6A21\u578B"}),(0,g.jsx)("dd",{children:v?.title??y.modelId}),(0,g.jsx)("dt",{children:"\u6765\u6E90"}),(0,g.jsx)("dd",{children:y.source}),(0,g.jsx)("dt",{children:"\u4E0B\u8F7D\u5927\u5C0F"}),(0,g.jsx)("dd",{children:yn(y.totalBytes)}),(0,g.jsx)("dt",{children:"\u4FDD\u5B58\u4F4D\u7F6E"}),(0,g.jsx)("dd",{children:y.destination}),(0,g.jsx)("dt",{children:"\u63A8\u7406\u8BBE\u5907"}),(0,g.jsx)("dd",{children:y.compute})]}),(0,g.jsx)("p",{children:y.licenseNote??"\u8BF7\u9605\u8BFB\u4E0B\u5217\u6A21\u578B\u8BB8\u53EF\u3002"}),y.licenseUrls?.map(T=>(0,g.jsx)("a",{href:T,target:"_blank",rel:"noreferrer",children:T},T)),(0,g.jsx)("p",{className:D.hint,children:y.notice}),(0,g.jsxs)("details",{className:D.details,children:[(0,g.jsx)("summary",{children:"\u6587\u4EF6\u548C\u6821\u9A8C\u8BE6\u60C5"}),(0,g.jsx)("ul",{children:y.files?.map(T=>(0,g.jsxs)("li",{children:[T.name," \xB7 ",yn(T.bytes),(0,g.jsxs)("small",{children:["SHA-256: ",T.sha256]}),(0,g.jsx)("small",{children:T.url})]},T.name))})]}),(0,g.jsx)(me.Button,{variant:"primary",className:D.primary,disabled:x||!v?.available||!y.planHash,onClick:()=>u("start-model-install",{modelId:y.modelId,compute:y.compute,planHash:y.planHash,accepted:!0}),children:"\u5F00\u59CB\u4E0B\u8F7D"})]}),(0,g.jsx)("div",{className:D.jobs,children:(m?.jobs??[]).filter(T=>!["installed","cancelled"].includes(T.status)).map(T=>(0,g.jsx)(wd,{job:T,snapshot:m,settings:f,disabled:x,writable:L,execute:u},T.id))}),!!B.length&&(0,g.jsxs)("details",{className:D.installHistory,children:[(0,g.jsxs)("summary",{children:["\u5B89\u88C5\u8BB0\u5F55\uFF08",B.length,"\uFF09",(0,g.jsx)("small",{children:"\u65F6\u95F4 \xB7 \u8BBE\u5907 \xB7 \u4F4D\u7F6E"})]}),(0,g.jsx)("div",{className:D.jobs,children:B.map(T=>(0,g.jsx)(wd,{job:T,snapshot:m,settings:f,disabled:x,writable:L,execute:u,history:!0},T.id))})]}),(0,g.jsx)("p",{className:D.hint,children:"\u6A21\u578B\u4E0B\u8F7D\u53EF\u5728\u540E\u53F0\u7EE7\u7EED\u3002\u68C0\u6D4B\u9759\u9ED8\u8FDB\u884C\uFF0C\u8FDB\u5165\u672C\u9875\u7ACB\u5373\u5237\u65B0\u3002"})]})}function ur({state:e,sessionId:n,run:t,active:o=!0,pickPath:r,initialModelId:i=null,initialReuse:s=!1,reuseOnly:c=!1,onboarding:l=!1}){let[u,d,,m]=At(t,n),[f,p]=(0,he.useState)(i),[b,v]=(0,he.useState)(null),[y,x]=(0,he.useState)(s),[L,M]=(0,he.useState)(""),[B,C]=(0,he.useState)("q8_0"),I=e.installerFor===n?e.installer:null,T=I?.models?.filter(j=>j.purpose==="tts"||["qwen3-tts-base-1.7b-gguf","vits-melo-tts-zh_en-int8"].includes(j.id))??[],E=T.find(j=>j.recommendation?.recommended&&j.available),S=f??E?.id??T.find(j=>j.available)?.id??T[0]?.id,k=T.find(j=>j.id===S),z=b??(k?.computeOptions?.includes("auto")?"auto":"cpu"),X=y&&S==="qwen3-tts-base-1.7b-gguf",P=X?{sourceDirectory:L,modelVariant:B}:{},N=e.installPlanFor===n&&e.installPlan?.modelId===S&&e.installPlan?.compute===z&&(X?e.installPlan?.reused===!0&&(e.installPlanRequest?.sourceDirectory??e.installPlan?.sourceDirectory)===L&&e.installPlan?.modelVariant===B:!e.installPlan?.sourceDirectory)?e.installPlan:null,G=[...I?.jobs??[]].reverse().find(j=>j.modelId===S&&j.status!=="cancelled"),V=I?.ttsInstallIntent,F=V&&G&&V.modelId===S&&V.jobId===G.id?V:null,U=["waiting","verifying"].includes(V?.status),K=e.settingsFor===n&&e.settings?.ttsSetup?.provider==="local"&&e.settings.ttsSetup.localModelId===S&&G?.status==="installed"&&!!G.installedPath&&e.settings.ttsSetup.localModelPath===G.installedPath,de=(0,he.useRef)(void 0),ue=(0,he.useRef)(null);(0,he.useEffect)(()=>{!o||I||e.busy||d||m.isLocked()||de.current===n||(de.current=n,u("model-installer"))},[o,n,!!I,e.busy,d,m.settled]),(0,he.useEffect)(()=>{let j=n+":"+S+":"+z;X||!o||!k?.available||e.busy||d||m.isLocked()||N||ue.current===j||(ue.current=j,u("plan-model-install",{modelId:S,compute:z}))},[o,n,S,z,k?.available,e.busy,d,!!N,X,m.settled]);let Q=d||e.busy||e.installerUncertain;return(0,g.jsxs)("section",{className:D.section,"aria-label":"\u4E0B\u8F7D\u672C\u5730\u8BED\u97F3\u6A21\u578B","data-no-settings-draft":!0,children:[I?(0,g.jsxs)(g.Fragment,{children:[!c&&(0,g.jsxs)("label",{className:D.inlineField,children:["\u8BED\u97F3\u6A21\u578B",(0,g.jsx)("select",{"aria-label":"\u8BED\u97F3\u6A21\u578B",value:S??"",disabled:Q||F?.status==="verifying",onChange:j=>{p(j.target.value),v(null)},children:T.map(j=>(0,g.jsxs)("option",{value:j.id,children:[j.title??j.id,j.recommendation?.recommended?" \xB7 \u63A8\u8350":"",j.available?"":" \xB7 \u6682\u4E0D\u53EF\u7528"]},j.id))})]}),!l&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("p",{className:D.hint,children:k?.recommendation?.reason}),(0,g.jsxs)("label",{className:D.inlineField,children:["\u672C\u5730\u8BA1\u7B97",(0,g.jsx)("select",{"aria-label":"\u672C\u5730\u8BA1\u7B97",value:z,disabled:Q||U,onChange:j=>v(j.target.value),children:(k?.computeOptions??["cpu"]).map(j=>(0,g.jsx)("option",{value:j,children:{cpu:"CPU",auto:"\u81EA\u52A8 GPU \xB7 CPU \u515C\u5E95",vulkan:"Vulkan \xB7 CPU \u515C\u5E95"}[j]},j))})]})]}),!k?.available&&(0,g.jsx)("p",{role:"status",className:D.note,children:k?.reason??"\u6B64\u8BBE\u5907\u6682\u6CA1\u6709\u517C\u5BB9\u7684\u5B89\u88C5\u5305\u3002\u53EF\u9009\u62E9\u5176\u4ED6\u652F\u6301\u7684\u6A21\u578B\uFF0C\u6216\u5148\u4F7F\u7528\u6587\u5B57\u3002"}),N&&(0,g.jsxs)("div",{className:D.plan,children:[(0,g.jsxs)("strong",{children:["\u4E0B\u8F7D ",yn(N.totalBytes)," \xB7 ",N.compute.toUpperCase()]}),N.reused&&(0,g.jsxs)("p",{children:["\u590D\u7528\u6A21\u578B ",yn(N.reusedBytes)," \xB7 ",N.modelVariant]}),(0,g.jsxs)("details",{className:D.details,children:[(0,g.jsx)("summary",{children:"\u6765\u6E90\u3001\u8BB8\u53EF\u4E0E\u4FDD\u5B58\u4F4D\u7F6E"}),(0,g.jsx)("p",{children:N.source}),N.runtime&&(0,g.jsx)("p",{children:N.runtime.source}),(0,g.jsx)("p",{children:N.notice}),(0,g.jsx)("p",{children:N.verification}),(0,g.jsx)("p",{children:N.licenseNote}),N.licenseUrls?.map(j=>(0,g.jsx)("a",{href:j,target:"_blank",rel:"noreferrer",children:j},j)),(0,g.jsx)("p",{children:N.destination})]})]}),(0,g.jsxs)("div",{className:D.actions,children:[(!G||(X||G.compute!==z)&&G.status==="installed"&&!U)&&(0,g.jsx)(me.Button,{variant:"primary",className:D.primary,disabled:Q||!st(e,n)||!k?.available||!N,onClick:()=>u("start-model-install",{modelId:S,compute:z,planHash:N.planHash,accepted:!0,useWhenReady:!0,...N.reused?{sourceDirectory:N.sourceDirectory,modelVariant:N.modelVariant}:{}}),children:X?"\u9A8C\u8BC1\u5E76\u4F7F\u7528":"\u4E0B\u8F7D\u5E76\u4F7F\u7528"}),S==="qwen3-tts-base-1.7b-gguf"&&!c&&(0,g.jsx)(me.Button,{variant:"outline","aria-expanded":X,disabled:Q||U,onClick:()=>x(j=>!j),children:"\u4F7F\u7528\u672C\u673A\u5DF2\u6709\u6587\u4EF6"})]}),X&&(0,g.jsxs)("div",{className:D.section,children:[(0,g.jsx)(uo,{className:D.field,label:"\u63D2\u4EF6\u6240\u5728\u673A\u5668\u7684\u6A21\u578B\u76EE\u5F55",kind:"sourceDirectory",value:L,disabled:Q,active:o,scope:S+":"+B,pickPath:r,sessionId:n,onChange:M}),(0,g.jsxs)("label",{className:D.inlineField,children:["\u5DF2\u6709\u6A21\u578B\u91CF\u5316\u7248\u672C",(0,g.jsxs)("select",{"aria-label":"\u5DF2\u6709\u6A21\u578B\u91CF\u5316\u7248\u672C",value:B,disabled:Q,onChange:j=>C(j.target.value),children:[(0,g.jsx)("option",{value:"q8_0",children:"Q8_0"}),(0,g.jsx)("option",{value:"q4_k_m",children:"Q4_K_M"})]})]}),(0,g.jsx)(me.Button,{variant:"outline",disabled:Q||!L.trim()||!k?.available,onClick:()=>u("plan-model-install",{modelId:S,compute:z,...P}),children:"\u68C0\u67E5\u590D\u7528\u8BA1\u5212"})]}),X&&G&&["failed","paused"].includes(G.status)&&(0,g.jsx)("p",{className:D.note,children:"\u5DF2\u6709\u672A\u5B8C\u6210\u7684\u5B89\u88C5\u4EFB\u52A1\u3002\u53EF\u7EE7\u7EED\u91CD\u8BD5\uFF1B\u5982\u9700\u66F4\u6362\u76EE\u5F55\u6216\u91CF\u5316\u7248\u672C\uFF0C\u8BF7\u5148\u53D6\u6D88\u8BE5\u4EFB\u52A1\uFF0C\u518D\u68C0\u67E5\u65B0\u7684\u590D\u7528\u8BA1\u5212\u3002"}),!X&&k?.available&&!N&&!G&&(0,g.jsx)(me.Button,{variant:"outline",disabled:Q,onClick:()=>u("plan-model-install",{modelId:S,compute:z}),children:"\u91CD\u65B0\u8BFB\u53D6\u5B89\u88C5\u8BA1\u5212"}),G&&(0,g.jsxs)("div",{className:D.job,children:[(0,g.jsx)("p",{role:"status",children:F?.status==="verifying"?"\u6B63\u5728\u9A8C\u8BC1\u5408\u6210\uFF0C\u9996\u6B21\u53EF\u80FD\u9700\u8981\u51E0\u5206\u949F":F?.status==="applied"&&K?"\u5408\u6210\u9A8C\u8BC1\u901A\u8FC7\uFF0C\u5DF2\u8BBE\u4E3A\u6717\u8BFB\u6765\u6E90":F?.status==="blocked"?"\u9700\u8981\u5904\u7406\u540E\u518D\u7EE7\u7EED":{queued:"\u7B49\u5F85\u4E0B\u8F7D",running:G.stage==="verifying-local"?"\u6821\u9A8C\u672C\u673A\u5DF2\u6709\u6A21\u578B":"\u4E0B\u8F7D\u5904\u7406\u4E2D",paused:"\u5DF2\u6682\u505C",failed:"\u4E0B\u8F7D\u5931\u8D25",installed:"\u6587\u4EF6\u5DF2\u6821\u9A8C\uFF0C\u5C1A\u672A\u786E\u8BA4\u5408\u6210"}[G.status]??G.status}),G.totalBytes>0&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("progress",{"aria-label":"\u8BED\u97F3\u6A21\u578B\u4E0B\u8F7D\u8FDB\u5EA6",max:G.totalBytes,value:Math.min(G.receivedBytes,G.totalBytes)}),(0,g.jsxs)("small",{children:[yn(G.receivedBytes)," / ",yn(G.totalBytes)]})]}),G.error&&(0,g.jsx)("p",{role:"alert",children:G.error.message}),F?.reason&&(0,g.jsx)("p",{className:D.note,children:Nh(F.reason)}),(0,g.jsxs)("div",{className:D.actions,children:[F?.status==="verifying"&&(0,g.jsx)(me.Button,{variant:"outline",disabled:Q,onClick:()=>u("control-model-install",{id:G.id,operation:"pause"}),children:"\u505C\u6B62\u9A8C\u8BC1"}),["queued","running"].includes(G.status)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:Q,onClick:()=>u("control-model-install",{id:G.id,operation:"pause"}),children:"\u6682\u505C"}),(["paused","failed"].includes(G.status)||F?.status==="blocked"||F?.status==="paused")&&(0,g.jsx)(me.Button,{variant:"outline",disabled:Q,onClick:()=>u("control-model-install",{id:G.id,operation:"resume"}),children:"\u7EE7\u7EED\u4E0B\u8F7D\u5E76\u4F7F\u7528"}),["queued","running","paused","failed"].includes(G.status)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:Q,onClick:()=>u("control-model-install",{id:G.id,operation:"cancel"}),children:"\u53D6\u6D88\u4E0B\u8F7D"}),G.status==="installed"&&!K&&(!F||["applied","cancelled"].includes(F.status))&&(0,g.jsx)(me.Button,{variant:"outline",disabled:Q||U||!st(e,n),onClick:()=>u("apply-model-install",{id:G.id,revision:e.settings.revision}),children:"\u9A8C\u8BC1\u5E76\u4F7F\u7528"})]})]}),K&&(0,g.jsx)("p",{className:D.hint,children:"\u672C\u5730\u6A21\u578B\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u8BD5\u542C\u3002"})]}):(0,g.jsx)(g.Fragment,{children:(0,g.jsx)("p",{className:D.hint,children:"\u6B63\u5728\u8BFB\u53D6\u53EF\u5B89\u88C5\u6A21\u578B\u2026"})}),e.installerError&&(0,g.jsx)("p",{role:"alert",className:D.note,children:e.installerError}),e.installerUncertain&&(0,g.jsx)("p",{role:"status",children:"\u6B63\u5728\u6838\u67E5\u4E0B\u8F7D\u72B6\u6001\u3002"})]})}function Nd({state:e,sessionId:n,run:t,pickPath:o,active:r}){let i=e.settingsFor===n?e.settings:null,s=e.installerFor===n?e.installer:null,c=i?.ttsSetup?.localModelPath,[l,u]=At(t,n),[d,m]=(0,he.useState)(""),[f,p]=(0,he.useState)(!1),b=(s?.jobs??[]).filter(y=>y.status==="installed"&&(y.purpose==="tts"||y.recommendedSettings?.tts)),v=b.find(y=>y.id===d);return(0,g.jsxs)("section",{className:D.section,"aria-label":"\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84","data-no-settings-draft":!0,children:[(0,g.jsx)("h3",{children:"\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84"}),(0,g.jsx)("p",{className:D.hint,children:c||"\u5C1A\u672A\u914D\u7F6E\u672C\u5730\u6717\u8BFB\u6A21\u578B\u8DEF\u5F84\u3002"}),!!b.length&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("label",{className:D.inlineField,children:["\u5DF2\u5B89\u88C5\u76EE\u5F55",(0,g.jsxs)("select",{value:d,onChange:y=>m(y.target.value),children:[(0,g.jsx)("option",{value:"",children:"\u9009\u62E9\u5DF2\u6821\u9A8C\u7684\u5B89\u88C5\u76EE\u5F55"}),b.map(y=>(0,g.jsxs)("option",{value:y.id,children:[pr(s.models.find(x=>x.id===y.modelId))," \xB7 ",fo(y.compute)," \xB7 ",Ri(y.createdAt)]},y.id))]})]}),v&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("p",{className:D.hint,children:v.installedPath}),(0,g.jsx)(me.Button,{variant:"outline",disabled:u||!st(e,n)||dr(v,i),onClick:()=>l("apply-model-install",{id:v.id,revision:i.revision}),children:"\u9A8C\u8BC1\u5E76\u4F7F\u7528\u6240\u9009\u8DEF\u5F84"})]})]}),(0,g.jsxs)("details",{className:D.details,onToggle:y=>p(y.currentTarget.open),children:[(0,g.jsx)("summary",{children:"\u590D\u7528\u672C\u673A Qwen \u6A21\u578B\u6587\u4EF6"}),(0,g.jsx)("p",{className:D.hint,children:"\u9009\u62E9\u5DF2\u6709\u6A21\u578B\u76EE\u5F55\u540E\u6821\u9A8C\u6587\u4EF6\uFF1B\u6821\u9A8C\u901A\u8FC7\u540E\u5B89\u88C5\u8FD0\u884C\u7EC4\u4EF6\u3002"}),f&&(0,g.jsx)(ur,{state:e,sessionId:n,run:t,active:r,pickPath:o,initialModelId:"qwen3-tts-base-1.7b-gguf",initialReuse:!0,reuseOnly:!0})]})]})}function Ad({state:e,sessionId:n,run:t,onDismiss:o,onMinimize:r,onBackToAuthorization:i,asrStatus:s,pickPath:c}){let[l,u]=At(t,n),[d,m]=(0,he.useState)(0),f=(0,he.useRef)(null),p=(0,he.useRef)(0),b=(0,he.useRef)(null);(0,he.useLayoutEffect)(()=>()=>{p.current++},[n]);let v=Q=>(p.current++,Q?.());(0,he.useLayoutEffect)(()=>{let Q=f.current?.closest("[data-whale-content]");Q&&(Q.scrollTop=0);let j=f.current?.querySelector("[data-wizard-body]");j&&(j.scrollTop=0)},[d]);let y=e.settingsFor===n?e.settings:null,[x,L]=(0,he.useState)(null),[M,B]=(0,he.useState)(null),C=x??y?.listenMode??"ptt",I=y?.ttsSetup?.provider,T=M??(I!=="unconfigured"?I:null)??"edge",E=T==="edge"&&I!=="edge",S=e.ttsCapabilitiesFor===n?e.ttsCapabilities:null,k=typeof S?.deepseekKeyAvailable=="boolean",z=S?.deepseekKeyAvailable===!0,X=`${n??"owner"}:${y?.revision??"unread"}`,[P,N]=(0,he.useState)(null),G=P??y?.ttsSetup?.deepseekVoice??"stella",V=!k&&!u&&b.current===X&&!!e.error,F=()=>{u||(b.current=X,l("inspect-tts"))};(0,he.useEffect)(()=>{d!==1||T!=="deepseek"||k||u||b.current===X||F()},[d,T,k,X,u]);let U=T==="deepseek"&&I!=="deepseek",K=u||!st(e,n),de=y?.ttsSetup?.provider==="local"&&!!y.ttsSetup.localModelId,ue=async()=>{let Q=p.current,j=()=>p.current===Q;if(d===0)await l("listen-mode",{mode:C})===!0&&j()&&m(1);else if(d===1){if(T==="deepseek"&&!z)return;let A=T==="deepseek"&&G!==(y.ttsSetup.deepseekVoice??"stella");if(M===null&&y.ttsSetup.provider!=="unconfigured"&&!A||T==="local"&&de){m(2);return}let ne=Bi({...Oi,...y.ttsSetup,provider:T});T==="edge"&&(ne.edgeTextTransmissionAccepted=!0),T==="deepseek"&&(ne.deepseekTextTransmissionAccepted=!0,ne.deepseekVoice=G),await l("save-tts",{revision:y.revision,values:ne})===!0&&j()&&m(2)}else await l("complete-setup",{revision:y.revision})===!0&&j()&&o?.()};return(0,g.jsxs)(me.MenuSurface,{ref:f,className:D.wizard,role:"region","aria-label":"\u9C7C\u5E94\u9996\u6B21\u914D\u7F6E","data-whale-intrinsic":!0,children:[(0,g.jsxs)("header",{className:D.header,children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("h2",{children:"\u5F00\u59CB\u4F7F\u7528\u9C7C\u5E94"}),(0,g.jsxs)("p",{className:D.hint,children:["\u7B2C ",d+1," / 3 \u6B65 \xB7 \u5176\u4F59\u8BBE\u7F6E\u968F\u65F6\u518D\u8C03"]})]}),(0,g.jsx)(me.Button,{onClick:r,children:"\u7A0D\u540E"})]}),(0,g.jsx)("div",{className:D.wizardBody,"data-wizard-body":!0,"data-no-drag":!0,children:(0,g.jsxs)("div",{className:D.wizardBodyContent,"data-whale-natural-content":!0,children:[(0,g.jsx)(Sd,{state:e,sessionId:n,run:t}),d===0&&(0,g.jsxs)("section",{className:D.section,children:[(0,g.jsx)("h3",{children:"\u600E\u4E48\u8BF4\u8BDD\uFF1F"}),(0,g.jsx)("fieldset",{className:D.choices,disabled:K,children:[["ptt","\u6309\u952E\u8BF4\u8BDD","\u6309\u4F4F\u5FEB\u6377\u952E\u65F6\u6536\u97F3"],["always","\u81EA\u7531\u9EA6","\u5F00\u59CB\u5BF9\u8BDD\u540E\u6301\u7EED\u542C\u53D6\u8BED\u97F3"],["wake","\u5524\u9192\u8BCD","\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\uFF0C\u518D\u8BF4\u6307\u4EE4"]].map(([Q,j,A])=>(0,g.jsxs)("label",{className:D.choice,"data-selected":C===Q,children:[(0,g.jsx)("input",{type:"radio",name:"setup-listen","data-whale-operation":`listen-mode-${Q}`,checked:C===Q,onChange:()=>L(Q)}),(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:j}),(0,g.jsx)("small",{children:A})]})]},Q))})]}),d===1&&(0,g.jsxs)("section",{className:D.section,children:[(0,g.jsx)("h3",{children:"\u600E\u4E48\u542C\u56DE\u7B54\uFF1F"}),(0,g.jsx)("fieldset",{className:D.choices,disabled:K,children:xd.map(([Q,j,A])=>(0,g.jsxs)("label",{className:D.choice,"data-selected":T===Q,children:[(0,g.jsx)("input",{type:"radio",name:"setup-provider",checked:T===Q,onChange:()=>{B(Q),Q==="deepseek"&&F()}}),(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:j}),(0,g.jsx)("small",{children:A})]})]},Q))}),T==="edge"&&(0,g.jsx)("p",{className:D.note,children:"\u542F\u7528\u540E\uFF0C\u6717\u8BFB\u6587\u5B57\u4F1A\u53D1\u9001\u7ED9\u5FAE\u8F6F\u3002\u8054\u7F51\u5931\u8D25\u65F6\uFF0C\u56DE\u7B54\u4F1A\u663E\u793A\u4E3A\u6587\u5B57\u3002"}),T==="deepseek"&&(0,g.jsxs)("div",{className:D.note,"data-whale-deepseek-setup":!0,children:[(0,g.jsx)("p",{children:"\u786E\u8BA4\u7EE7\u7EED\u540E\uFF0C\u6717\u8BFB\u6587\u5B57\u4F1A\u53D1\u9001\u7ED9 DeepSeek\u3002\u5BC6\u94A5\u7531 DSH \u7BA1\u7406\uFF0C\u9C7C\u5E94\u4E0D\u4F1A\u4FDD\u5B58\u5BC6\u94A5\u3002"}),!k&&!V&&(0,g.jsx)("p",{role:"status",children:"\u6B63\u5728\u68C0\u67E5 DSH \u4E2D\u4FDD\u5B58\u7684 DeepSeek API Key\u2026"}),k&&!z&&(0,g.jsx)("p",{role:"status",children:"\u5C1A\u672A\u5728 DSH \u7684 DeepSeek API Key \u63D0\u4F9B\u5546\u4E2D\u914D\u7F6E\u5F00\u653E\u5E73\u53F0\u5BC6\u94A5\u3002"}),V&&(0,g.jsx)("p",{role:"status",children:"\u6682\u65F6\u65E0\u6CD5\u68C0\u67E5 DeepSeek API Key\u3002"}),(V||k&&!z)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:K,onClick:F,children:"\u91CD\u65B0\u68C0\u67E5 DeepSeek API Key"}),(0,g.jsxs)("label",{className:D.inlineField,children:["DeepSeek \u97F3\u8272",(0,g.jsxs)("select",{"aria-label":"DeepSeek \u97F3\u8272",value:G,disabled:K,onChange:Q=>N(Q.target.value),children:[(0,g.jsx)("option",{value:"stella",children:"\u6D77\u661F \xB7 \u5973\u58F0"}),(0,g.jsx)("option",{value:"tide",children:"\u6697\u6F6E \xB7 \u7537\u58F0"})]})]})]}),T==="local"&&(0,g.jsx)(ur,{pickPath:c,state:e,sessionId:n,run:t,initialModelId:de?y.ttsSetup.localModelId:null,onboarding:!0})]}),d===2&&(0,g.jsxs)("section",{className:D.section,children:[(0,g.jsx)("h3",{children:"\u51C6\u5907\u8BED\u97F3\u8BC6\u522B"}),(0,g.jsx)("p",{children:"\u8BF4\u8BDD\u65B9\u5F0F\u548C\u6717\u8BFB\u914D\u7F6E\u5DF2\u4FDD\u5B58\u3002"}),s]}),(e.error||e.setupError)&&(0,g.jsx)("p",{role:"alert",className:D.note,children:"\u6682\u65F6\u672A\u80FD\u5B8C\u6210\uFF0C\u6B63\u5728\u6838\u67E5\u8BBE\u7F6E\u3002"})]})}),(0,g.jsxs)("footer",{className:D.actions,children:[(0,g.jsx)(me.Button,{variant:"outline",disabled:u,onClick:()=>d>0?m(d-1):v(i),children:"\u4E0A\u4E00\u6B65"}),(0,g.jsx)(me.Button,{variant:"primary",className:D.primary,disabled:K||!y||d===1&&T==="local"&&!de||d===1&&T==="deepseek"&&!z,onClick:()=>{ue()},children:u?"\u4FDD\u5B58\u4E2D\u2026":d===2?"\u5B8C\u6210":d===1&&E?"\u542F\u7528\u5728\u7EBF\u6717\u8BFB\u5E76\u7EE7\u7EED":d===1&&U?"\u542F\u7528 DeepSeek \u8BED\u97F3\u5408\u6210\u5E76\u7EE7\u7EED":"\u4E0B\u4E00\u6B65"})]})]})}var a=require("react/jsx-runtime"),mr=e=>e.setupOpen||e.setupStatus?.completed!==!0,Eh={ARCHIVED:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u5DF2\u5F52\u6863\u3002\u6062\u590D\u539F\u4F1A\u8BDD\u6216\u66F4\u6362\u7ED1\u5B9A\u540E\u518D\u5F00\u59CB\u8BED\u97F3\u3002",BUSY:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F\u3002\u7B49\u8FD9\u8F6E\u7ED3\u675F\u540E\u518D\u5F00\u59CB\u8BED\u97F3\u3002",UNAVAILABLE:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528\u3002\u53EF\u66F4\u6362\u7ED1\u5B9A\u6216\u89E3\u9664\u7ED1\u5B9A\u3002"},$d=e=>e.authorizationOpen||e.authorizationLoading&&!e.authorization;function Od(e){let[n,t]=(0,O.useState)(!1),o=(0,O.useRef)(null),r=(0,O.useRef)(null),i=(0,O.useRef)(null),s=(0,O.useRef)(null),c=e.useWhalePreferences(x=>x),l=e.useWhaleUi(x=>x),u=$d(l),d=u||mr(l)?"setup":l.panelView??"home",m=n&&d!=="settings",f=(0,O.useCallback)(x=>{o.current=x,e.geometry.ref(x),e.sizing.ref(x)},[e.geometry,e.sizing]),p=(0,O.useCallback)(x=>{r.current=x,e.sizing.contentRef(x)},[e.sizing]);(0,O.useEffect)(()=>{e.setPanelVisible?.(!m)},[m]),(0,O.useLayoutEffect)(()=>{r.current&&(r.current.scrollTop=0)},[d]),(0,O.useLayoutEffect)(()=>e.sizing.update(),[d,m,u,l.sourcePending]),(0,O.useEffect)(()=>{let x=o.current,L=x?.ownerDocument;s.current&&x&&L&&(L.activeElement===L.body||x.contains(L.activeElement))&&(d==="home"?x.querySelector("[data-whale-settings-trigger]")?.focus({preventScroll:!0}):d!==s.current&&x.focus({preventScroll:!0})),s.current=d},[d]);let b=x=>{let L=hd(x);L&&e.recordUserOperation?.(L)},v=()=>{t(!0),requestAnimationFrame(()=>o.current?.querySelector("[data-whale-reopen]")?.focus())},y=()=>{e.refresh?.(),t(!1),requestAnimationFrame(()=>o.current?.focus())};return(0,Gd.createPortal)((0,a.jsx)("section",{ref:f,className:h.floating,"data-whale-panel":!0,"data-view":d,"data-collapsed":m||void 0,"data-source-pending":l.sourcePending||void 0,"data-motion":c.motion,tabIndex:0,"aria-label":e.t("drag"),title:e.t("dragHint"),onPointerDownCapture:()=>e.geometry.activate?.(),onFocusCapture:()=>e.geometry.activate?.(),onPointerDown:x=>{if(x.button!==0||x.pointerType&&x.pointerType!=="mouse"||!Qu(x.target,x.currentTarget)){i.current=null;return}let L=x.target,M=L.getBoundingClientRect?.();M&&L.scrollHeight>L.clientHeight&&L.offsetWidth>L.clientWidth&&x.clientX>=M.left+L.clientLeft+L.clientWidth||(i.current={id:x.pointerId,x:x.clientX,y:x.clientY,moved:!1},x.target.closest?.("button")||x.currentTarget.focus({preventScroll:!0}),e.geometry.pointerDown(x,x.target.closest?.("[data-drag-surface]")??x.currentTarget))},onPointerMove:x=>{let L=i.current;!L||x.pointerId!==L.id||(Math.hypot(x.clientX-L.x,x.clientY-L.y)>=4&&(L.moved=!0),e.geometry.pointerMove(x))},onPointerUp:x=>{x.nativeEvent?.isTrusted&&i.current?.id===x.pointerId&&i.current.moved&&e.recordUserOperation?.("panel-move"),e.geometry.pointerEnd(x)},onPointerCancel:x=>{e.geometry.pointerEnd(x),i.current=null},onLostPointerCapture:e.geometry.pointerEnd,onClickCapture:x=>{i.current?.moved&&x.detail!==0?(x.preventDefault(),x.stopPropagation()):b(x),i.current=null},onChangeCapture:b,onSubmitCapture:b,onKeyDownCapture:b,onKeyDown:x=>{x.key==="Escape"&&(x.stopPropagation(),d==="setup"&&!m?v():d==="settings"?e.showHome():m||v())},children:(0,a.jsx)("div",{ref:p,className:h.panelViewport,"data-whale-content":!0,children:e.renderSlot("whale-ear.panel.controls",{collapsed:m,collapse:v,expand:y})})}),document.body)}var Ed=()=>()=>{};function Bd(e){let{controlContext:n}=e,t=(0,O.useSyncExternalStore)(n?.subscribe??Ed,()=>n?n.sourceFor(n.selectedSession()):e.sessionId??null),o=(0,O.useSyncExternalStore)(n?.subscribe??Ed,()=>{let f=n?.currentConversation();return f===t?f:null});e={...e,sessionId:t,currentConversationId:o};let r=e.useWhaleUi(f=>f),[i,s]=(0,O.useState)(!1);(0,O.useLayoutEffect)(()=>{e.setSession?.(t)},[t]);let c=$d(r),l=r.updates?.release?.version,u=!e.collapsed&&!c&&!mr(r)&&r.panelView==="home"&&r.checkedFor===e.sessionId&&r.status?.enabled===!1&&r.status.ownerSessionId===null&&!r.status.voiceControlBusy&&r.status.voiceSession?.fullyStopped!==!1&&!r.busy&&!r.uncertain&&!r.updatesUnavailable&&r.updates?.status==="available"&&l&&l!==r.dismissedUpdateVersion;if((0,O.useEffect)(()=>{u&&s(!0)},[u]),c||mr(r)){let f=mr(r);return(0,a.jsxs)(a.Fragment,{children:[e.collapsed&&(0,a.jsx)(Rd,{t:e.t,expand:e.expand}),c?(0,a.jsx)("div",{hidden:e.collapsed,children:(0,a.jsx)(Ih,{state:r,save:e.saveAuthorization,close:f?e.collapse:e.closeAuthorization,continueSetup:f?()=>e.closeAuthorization({resumeSetup:!0}):null})}):(0,a.jsx)("div",{role:"dialog","aria-modal":"false","aria-label":"\u9C7C\u5E94\u9996\u6B21\u914D\u7F6E","data-whale-setup":!0,hidden:e.collapsed,children:(0,a.jsx)(Ad,{pickPath:e.pickPath,state:r,sessionId:e.sessionId,run:e.run,onDismiss:e.dismissSetup,onMinimize:e.collapse,onBackToAuthorization:e.openAuthorization,asrStatus:(0,a.jsx)(Xd,{action:e.senseVoiceAsrAction,active:!e.collapsed})})})]})}let d=f=>{s(!0),f&&e.updateAction?.({action:"check"})},m=()=>{e.dismissUpdate?.(l),s(!1)};return(0,a.jsxs)(a.Fragment,{children:[r.panelView==="settings"?(0,a.jsx)(Vh,{...e,openUpdate:d}):(0,a.jsx)(Gh,{...e}),i&&(0,a.jsx)(fd,{state:r,close:m,run:e.updateAction,t:e.t})]})}function Ih({state:e,save:n,close:t,continueSetup:o}){let r=e.authorization,i=e.authorizationBusy||e.authorizationLoading,s=r?.usageAgreement?.accepted===!0,c=r?.usageAgreement?.text??[];return(0,a.jsxs)("section",{role:"dialog","aria-modal":"false","aria-label":"\u9C7C\u5E94\u4F7F\u7528\u534F\u8BAE","data-whale-authorization":!0,"data-whale-intrinsic":!0,className:`${h.settings} ${h.authorization}`,children:[(0,a.jsxs)("header",{className:h.settingsHeader,children:[(0,a.jsx)(Jn,{}),(0,a.jsx)("h2",{children:s?"\u9C7C\u5E94\u4F7F\u7528\u534F\u8BAE":"\u6B22\u8FCE\u4F7F\u7528\u9C7C\u5E94"}),s&&!o&&(0,a.jsx)(W.Button,{variant:"outline",disabled:i,onClick:t,children:"\u8FD4\u56DE"})]}),(0,a.jsx)("div",{className:h.authorizationBody,"data-whale-authorization-body":!0,"data-no-drag":!0,children:(0,a.jsxs)("div",{"data-whale-natural-content":!0,children:[!s&&(0,a.jsx)("p",{className:h.authorizationSteps,children:"1 \u4F7F\u7528\u534F\u8BAE\u3000\xB7\u30002 \u57FA\u7840\u914D\u7F6E"}),(0,a.jsx)("h3",{children:"\u9C7C\u5E94\u64CD\u4F5C\u8303\u56F4"}),(0,a.jsx)("div",{className:h.agreement,children:c.map(l=>(0,a.jsx)("p",{children:l},l))}),e.authorizationLoading&&!r&&(0,a.jsx)("p",{role:"status",className:h.hint,children:"\u6B63\u5728\u8BFB\u53D6\u2026"}),r&&(0,a.jsxs)("details",{className:h.section,children:[(0,a.jsx)("summary",{children:"\u670D\u52A1\u4E0E\u6A21\u578B\u6765\u6E90"}),(0,a.jsx)("ul",{className:h.permissionList,children:r.scopes.map(l=>(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:l.title}),(0,a.jsx)("p",{className:h.hint,children:l.description})]},l.id))}),r.modelSources.map(l=>(0,a.jsxs)("div",{children:[(0,a.jsx)("strong",{children:l.modelId}),(0,a.jsx)("p",{className:h.hint,children:l.source}),l.runtime&&(0,a.jsxs)("p",{className:h.hint,children:["\u8FD0\u884C\u7EC4\u4EF6\uFF1A",(l.runtime.sources??[l.runtime.source]).join("\u3001")]}),(0,a.jsx)("p",{className:h.hint,children:l.licenseNote}),l.licenseUrls.map(u=>(0,a.jsx)("p",{className:h.hint,children:(0,a.jsx)("a",{href:u,target:"_blank",rel:"noreferrer",children:u})},u))]},l.modelId))]}),(e.authorizationError||r?.revocationUnconfirmed)&&(0,a.jsx)("p",{role:"alert",className:h.error,children:r?.revocationUnconfirmed?"\u505C\u6B62\u8BBE\u5907\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u68C0\u67E5\u6216\u91CD\u542F\u5BBF\u4E3B\u3002":e.authorizationUncertain?"\u4FDD\u5B58\u7ED3\u679C\u5F85\u786E\u8BA4\uFF0C\u6B63\u5728\u6838\u67E5\u3002":"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"})]})}),(0,a.jsxs)("div",{className:`${h.actions} ${h.authorizationActions}`,children:[(0,a.jsx)(W.Button,{className:h.primary,variant:"primary",disabled:!r||i||e.authorizationUncertain,onClick:()=>s&&r?.granted?(o??t)():void n(!0),children:s&&r?.granted?o?"\u7EE7\u7EED\u914D\u7F6E":"\u8FD4\u56DE":"\u4E00\u952E\u6388\u6743\u5E76\u7EE7\u7EED"}),(0,a.jsx)(W.Button,{variant:"outline",disabled:i,onClick:s&&r?.granted&&!o?()=>{n(!1)}:t,children:s&&r?.granted?o?"\u7A0D\u540E":"\u64A4\u9500\u6388\u6743":"\u6682\u4E0D\u4F7F\u7528"})]}),!s&&(0,a.jsx)("p",{className:h.hint,children:"\u4E0B\u4E00\u6B65\uFF1A\u9009\u62E9\u8BF4\u8BDD\u65B9\u5F0F\u4E0E\u8BED\u97F3\u6A21\u578B"})]})}function Rd({t:e,expand:n,markState:t="idle",compactState:o="off",enabled:r=!1}){return(0,a.jsxs)(W.Button,{className:h.bubble,"data-whale-reopen":!0,"data-whale-operation":"panel-open","data-drag-surface":!0,"aria-label":e("reopen"),title:e("title"),onClick:n,children:[(0,a.jsx)(Jn,{small:!0,state:t}),(0,a.jsx)("span",{className:h.bubbleBrand,children:e("title")}),(0,a.jsxs)("span",{className:h.bubbleStatus,"data-voice-state":o,children:[(0,a.jsx)(qe,{name:r===!1?"micOff":"mic"}),(0,a.jsx)("span",{children:e("compact_"+o)})]}),(0,a.jsx)("span",{className:h.voiceBars,"data-active":o==="listening"||void 0,"aria-hidden":"true",children:[0,1,2,3,4].map(i=>(0,a.jsx)("i",{},i))}),(0,a.jsx)(qe,{name:"down"})]})}function Gh(e){let{t:n,sessionId:t}=e,o=e.useWhaleUi(ae=>ae),r=o.status,i=o.busy,s=o.checkedFor===t,c=o.uncertain||!s,l=e.useWhalePreferences(ae=>ae),u=so(r),d=u&&o.conversationFor===t&&o.conversation?.rootSessionId===u&&!c?o.conversation:null,m=o.conversationHistoryFor===t&&!c&&(!r?.enabled||d?.rootSessionId===o.conversationHistory?.rootSessionId)?o.conversationHistory:null,f=d??{rootSessionId:m?.rootSessionId??null,items:[],latest:m?.items?.filter(ae=>ae.role==="assistant").at(-1)??null},p=!!(r?.enabled&&(o.conversationError||o.conversationFor===t&&o.conversation?.rootSessionId!==u)),b=r?.voiceSession?.recovery?.kind?.startsWith("helper-"),v=["predecessor-cleanup-pending","helper-cleanup-pending"].includes(r?.voiceSession?.recovery?.kind),y=["predecessor-stop-unconfirmed","helper-stop-unconfirmed"].includes(r?.voiceSession?.recovery?.kind)||/VOICE_(PREDECESSOR|HELPER)_STOP_UNCONFIRMED/.test(o.error??""),x=r?.voiceSession?.recovery?.kind==="live-root-conflict"||/VOICE_ROOT_OWNED_ELSEWHERE/.test(o.error??""),L=d?.helper??r?.helper,M=o.listenModePending?o.listenModeBefore:d?.helper&&d.revision!==o.listenModeReceiptRevision?d.helper.listenMode:r?.listenMode,B=!!(r?.enabled&&L?.online===!1),C=p||!!(r?.enabled&&M==null),I=!c&&!B&&!C&&mt.includes(M),T=i||!I||v||y||x||!r?.capabilities?.listenMode||r?.voiceControlBusy||o.visibilityUncertain||o.ttsUncertain||o.ttsCancelling,E=r?.enabled?d?.inputError:null,S=!r?.enabled&&o.enableError,k=Eh[/VOICE_EXISTING_(ARCHIVED|BUSY|UNAVAILABLE)/.exec(S??"")?.[1]],z=/VOICE_EXISTING_BINDING_CHANGED/.test(S??""),X=S&&o.settings?.voiceSession?.performanceMode==="fast"&&/VOICE_EXACT_EFFORT_HOST_REQUIRED|VOICE_FAST_/.test(S),P=t&&r?.ownerSessionId&&r.ownerSessionId!==t&&u!==t,N=r?.existingVoiceSession,G=N?.sessionId,V=o.existingSessionWritePending||o.existingSessionUnconfirmed,F=r&&!c&&o.checkedFor===t&&!V,U=F&&r.existingVoiceSession,K=F?U?zt(U):n("dedicatedVoiceTarget"):n("checkingVoiceTarget"),de=(0,O.useId)(),ue=(0,O.useId)(),Q=r?.enabled&&U&&d?.retryTranscripts?.sessionId===U.sessionId?d.retryTranscripts.items:[],j=r?.existingVoiceSessionSupported===!0&&Object.hasOwn(r,"existingVoiceSession")&&e.listExistingVoiceSessions&&e.setExistingVoiceSession,A=j&&ar(o,t),ne=e.currentConversationId&&j&&r.enabled===!1,pe=!!(!U&&!V&&o.checkedFor===t&&r&&!i&&!r.voiceControlBusy&&!c&&!o.ttsUncertain&&!o.ttsCancelling&&!v&&!x&&!y&&!P),ge=d?.wake??r?.wake,Ge=v?"pending":y||x||c||C||B?"unknown":i?"pending":d?.inputActive===!0?"input-active":r?.enabled?"authorized":"idle",[Ve,$e]=(0,O.useState)(null),[at,Ln]=(0,O.useState)(!1),Ee=Ve==="targets"&&j&&r.enabled===!1,ie=(0,O.useRef)(!1),Fe=o.settingsFor===t?o.settings?.values:null,Ke=Fe?.pttKeyboard?[...Fe.pttKeyboard.modifiers||[],Fe.pttKeyboard.code].join(" + "):Fe?.pttMouse?n("sideButton")+" "+Fe.pttMouse:null,zn=(0,O.useRef)({}),lt=()=>{ie.current=!0,$e(null)};(0,O.useLayoutEffect)(()=>{$e(ae=>e.collapsed||ae==="targets"?null:ae),Ln(!1)},[t,e.collapsed]),(0,O.useEffect)(()=>{Ln(!1),G&&$e(ae=>ae==="conversation"?null:ae)},[G]),(0,O.useEffect)(()=>{r?.enabled&&$e(ae=>ae==="targets"?null:ae)},[r?.enabled]),(0,O.useEffect)(()=>{Ee||!A||!ie.current||!zn.current.targets||(ie.current=!1,zn.current.targets.focus())},[Ee,A,e.collapsed]),(0,O.useEffect)(()=>{!c&&!G&&Ve==="conversation"&&r?.enabled===!1&&e.run(t,"read-history")},[Ve,c,r?.enabled,t,G]);let hr=Vu({enabled:r?.enabled,active:d?.inputActive===!0,unknown:!r||c||C||B||y||x||!!E,pending:i||v}),fn=()=>!G&&Ve==="conversation"&&(0,a.jsx)(ld,{conversation:f,history:m,historyLoading:o.sourcePending||!c&&o.conversationHistoryLoading,historyError:c?null:o.conversationHistoryError,historyRetryCursor:o.conversationHistoryRequestCursor,loadHistory:ae=>e.run(t,"read-history",ae?{cursor:ae}:{}),assistantName:l.assistantName||n("assistant"),setAssistantName:e.setAssistantName,t:n,close:()=>{$e(null),zn.current.conversation?.focus()}},f.rootSessionId??"empty");return e.collapsed?(0,a.jsx)(Rd,{t:n,expand:e.expand,markState:Ge,compactState:hr,enabled:r?.enabled??null}):(0,a.jsxs)("div",{className:h.panelContent,"data-home-controls":!0,"data-has-transcript-retry":Q.length>0||void 0,"data-home-layout":[r?r.enabled?"active":"idle":"loading",fr(o,t),!!(o.error||S),!!E,B,v,y,!!U].join(":"),"data-size-detail":Ve==="conversation"||Ee?"true":"false",onKeyDown:ae=>{!Ee||ae.key!=="Escape"||(ae.preventDefault(),ae.stopPropagation(),lt())},children:[(0,a.jsxs)("div",{className:h.header,children:[(0,a.jsxs)("span",{className:h.brand,children:[(0,a.jsx)(Jn,{state:Ge}),(0,a.jsx)("strong",{children:n("title")})]}),(0,a.jsxs)("div",{className:h.headerActions,children:[(0,a.jsxs)(W.Button,{className:h.newChatButton,"data-whale-operation":"new-voice-session","aria-label":n("newChat"),title:U?"\u89E3\u9664\u5DF2\u6709\u4F1A\u8BDD\u7ED1\u5B9A\u540E\u53EF\u65B0\u5EFA\u9C7C\u5E94\u4F1A\u8BDD":n(P?"newChatOtherOwner":r?.enabled?"newChatActive":"newChat"),disabled:!pe,onClick:()=>{e.run(t,"new",{expectedOwnerSessionId:r.ownerSessionId})},children:[(0,a.jsx)(qe,{name:"plus"}),(0,a.jsx)("span",{children:n("newChat")})]}),(0,a.jsx)(W.Button,{"data-whale-settings-trigger":!0,"data-whale-operation":"page-settings",className:h.iconButton,"aria-label":n("settings"),title:n("settings"),onClick:e.openSettings,children:(0,a.jsx)(qe,{name:"settings"})}),(0,a.jsx)(W.Button,{"data-whale-operation":"panel-close",className:h.iconButton,"aria-label":n("collapse"),title:n("collapseHint"),onClick:e.collapse,children:(0,a.jsx)(qe,{name:"minus"})})]})]}),(0,a.jsxs)("div",{className:h.statusRow,"data-bound":!!U||void 0,"data-recording":Ge==="input-active"||void 0,children:[(0,a.jsx)("div",{id:de,className:h.voiceTarget,"data-whale-voice-target":!0,children:j?(0,a.jsxs)(W.Button,{ref:ae=>{zn.current.targets=ae},variant:"outline",className:h.existingSessionHome,"data-whale-bound-session":U?!0:void 0,"data-whale-target-trigger":!0,title:K,"aria-expanded":!!Ee,"aria-controls":Ee?ue:void 0,disabled:!Ee&&!A,onClick:()=>Ee?lt():$e("targets"),children:[(0,a.jsx)("span",{children:n("voiceTarget")}),(0,a.jsx)("strong",{className:h.ellipsis,children:K}),(0,a.jsx)(qe,{name:Ee?"down":"chevron"})]}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("span",{children:n("voiceTarget")}),(0,a.jsx)("strong",{className:h.ellipsis,title:K,children:K})]})}),(0,a.jsxs)("div",{className:h.voiceStatus,children:[(0,a.jsx)(qe,{name:r?.enabled?"mic":"micOff"}),(0,a.jsx)("span",{className:h.status,role:"status",children:o.listenModePending?n(r?.enabled?"modeSwitching":"modeSaving"):i?n("pending"):r?v?n("voiceCleanupPending"):y?n("voiceRestartPending"):x?n("voiceRecoveryPending"):c?n("stale"):B?n("voiceInputUnavailable"):C?n("unknown"):E?n("inputError_"+E):d?.inputActive===!0?n("inputActive"):r.enabled&&M==="wake"?n(Ki(ge)):r.enabled?n("enabled"):n("disabled"):n("unknown")})]})]}),Ee?(0,a.jsx)(Ii,{...e,state:o,homePickerId:ue,closeHomePicker:lt}):(0,a.jsxs)(a.Fragment,{children:[ne&&(0,a.jsx)(ud,{...e,sessionId:e.currentConversationId,boundSession:N,state:o},e.currentConversationId),(0,a.jsxs)("div",{className:h.quickActions,children:[(0,a.jsx)(W.Button,{"data-whale-operation":r?.enabled||x?"stop-voice":"start-voice",className:`${h.mainAction} ${r?.enabled?"":h.primary}`,variant:r?.enabled?"outline":"primary","aria-describedby":de,disabled:!s||!!V||i&&!(r?.enabled&&o.interruptibleRead&&!o.diagnosticStopPending)||v||y&&!r?.enabled||!r||c&&!x&&!B||!r.enabled&&!x&&(!F||U&&!Xn(U)),title:r?.enabled?n("stopConsequence"):void 0,onClick:()=>{e.run(t,r?.enabled||x?"disable":"enable",r?.enabled||x?{}:{expectedOwnerSessionId:null,expectedExistingSessionId:U?.sessionId??null})},children:v?n("voiceCleanupPending"):y?n(r?.enabled?"endConversation":"voiceRestartPending"):x?n("voiceRecoveryCheck"):r?.enabled?n("endConversation"):n("startConversation")}),(0,a.jsx)("div",{className:h.quickSegments,role:"group","aria-label":n("mode"),"aria-busy":!!o.listenModePending,"data-listen-mode":I?M:"unknown",children:mt.map(ae=>(0,a.jsx)(W.Button,{"data-whale-operation":`listen-mode-${ae}`,"aria-pressed":I&&M===ae,disabled:!!T,onClick:()=>{M!==ae&&e.run(t,"listen-mode",{mode:ae})},children:n(xo(ae))},ae))})]}),Q.length>0&&(0,a.jsx)($h,{items:Q,pending:o.transcriptRetry,busy:i,retry:ae=>e.retryVoiceTranscript?.(t,ae),t:n}),(!r||c||v||y||x)&&(0,a.jsx)("p",{className:h.hint,"data-home-important":v||y||x||void 0,children:n(v?b?"voiceHelperCleanupHint":"voiceCleanupHint":y?b?"voiceHelperRestartHint":"voiceRestartHint":x?"voiceRecoveryHint":i?"readingStatus":"statusRetry")}),!c&&(!C||B)&&r?.enabled&&!v&&!y&&(0,a.jsx)("p",{className:h.hint,"data-whale-input-hint":!0,"data-home-important":E||B?!0:void 0,children:B?n("voiceInputRecoveryHint"):E?n("inputHelp_"+E):M==="wake"?n(ge?.streamOpen&&ge.detection==="asr-after-utterance"?"wakeFallbackHint":"wakeHint"):M==="always"?n("alwaysWarning"):Ke?n("holdToSpeak")+" "+Ke:n("bindingMissing")}),r&&!c&&!r.capabilities?.listenMode&&(0,a.jsx)("p",{className:h.hint,children:n("modeUnavailable")}),o.listenModeError&&(0,a.jsx)("p",{role:"alert","data-whale-mode-error":!0,className:h.error,children:n(o.uncertain?"modeSwitchUnconfirmed":"modeSwitchFailed")}),o.readOnlyFailure&&c&&!x&&!y&&(0,a.jsx)(W.Button,{variant:"outline",disabled:i,onClick:()=>{e.run(t,"status")},children:n("retryStatus")}),(o.error||S)&&!o.readOnlyFailure&&!k&&!o.listenModeError&&!x&&!y&&(0,a.jsx)("p",{role:"alert",className:h.error,children:n(z?"voiceTargetChanged":X?"performanceFastUnavailable":!o.uncertain&&S?"enableFailed":"operationUnavailable")}),k&&(0,a.jsxs)("p",{role:"alert",className:h.notice,children:[k," ",(0,a.jsx)(W.Button,{variant:"outline",disabled:!A,onClick:()=>$e("targets"),children:"\u7BA1\u7406\u7ED1\u5B9A"})]}),/VOICE_SESSION_ARCHIVED/.test(S??o.error??"")&&(0,a.jsxs)("p",{className:h.notice,children:["\u539F\u8BED\u97F3\u4F1A\u8BDD\u5DF2\u5F52\u6863\u3002",(0,a.jsx)(W.Button,{variant:"outline",onClick:()=>{e.openSettings("sessions")},children:"\u6062\u590D\u539F\u4F1A\u8BDD"})]}),/VOICE_ASR_(?:PREPARING|PREPARE_FAILED)/.test(S??o.error??"")&&(0,a.jsxs)("p",{className:h.notice,children:["SenseVoice \u5C1A\u672A\u5C31\u7EEA\u3002",(0,a.jsx)(W.Button,{variant:"outline",onClick:()=>{e.openSettings("models","download")},children:"\u67E5\u770B\u6A21\u578B\u8FDB\u5EA6"})]}),/VOICE_MODEL_REQUIRED/.test(S??o.error??"")&&(0,a.jsxs)("p",{className:h.notice,children:["\u8BF7\u5148\u9009\u62E9\u53EF\u7528\u7684\u5BF9\u8BDD\u6A21\u578B\u3002",(0,a.jsx)(W.Button,{variant:"outline",onClick:()=>{e.openSettings("models","conversation")},children:"\u8BBE\u7F6E\u5BF9\u8BDD\u6A21\u578B"})]}),U&&!Xn(U)&&(0,a.jsx)("p",{className:h.hint,"data-home-important":!0,children:sr(U)}),d?.providerError&&(0,a.jsx)("p",{role:"alert","data-home-important":!0,"data-whale-provider-error":!0,className:h.error,children:d.providerError}),(0,a.jsx)(cd,{...e,state:o}),!U&&!o.error&&!E&&!x&&!y&&!v&&!B&&!C&&(0,a.jsx)(Oh,{...e,state:o}),at&&(0,a.jsx)("p",{role:"alert",className:h.notice,children:"DSH \u6682\u65F6\u65E0\u6CD5\u6253\u5F00\u539F\u4F1A\u8BDD\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"}),Xn(U)&&e.openExistingVoiceSession&&(0,a.jsxs)(W.Button,{className:h.caption,"data-whale-operation":"open-native-session","aria-label":"\u6253\u5F00\u539F\u4F1A\u8BDD",onClick:async()=>{Ln(!1);try{await e.openExistingVoiceSession(U.sessionId)}catch{Ln(!0)}},children:[d?.latest?.text&&(0,a.jsx)("span",{className:h.ellipsis,children:d.latest.text}),(0,a.jsx)("span",{className:h.openOriginal,children:"\u6253\u5F00\u539F\u4F1A\u8BDD"}),(0,a.jsx)(qe,{name:"chevron"})]}),r&&!G&&(0,a.jsxs)(W.Button,{ref:ae=>{zn.current.conversation=ae},className:h.caption,onClick:()=>{let ae=Ve!=="conversation";$e(ae?"conversation":null),ae&&e.run(t,"read-history")},"aria-label":n("recentConversation"),"aria-expanded":Ve==="conversation",children:[(0,a.jsxs)("span",{className:h.ellipsis,children:[f.latest?.state==="speech-failed"?n("speechFailed")+": ":f.latest?.state==="interrupted"?n("speechInterrupted")+": ":"",f.latest?.text??n(o.newChatFor===t?"newChatCreated":"viewConversation")]}),(0,a.jsx)(qe,{name:"chevron"})]}),fn()]})]})}function $h({items:e,pending:n,busy:t,retry:o,t:r}){let i=(0,O.useId)();return(0,a.jsxs)("section",{className:h.transcriptRetries,"aria-labelledby":i,"data-whale-transcript-retries":!0,"data-no-drag":!0,children:[(0,a.jsxs)("header",{children:[(0,a.jsx)("h2",{id:i,children:r("retryTranscripts")}),(0,a.jsx)("p",{children:r("endDiscardsRetries")})]}),(0,a.jsx)("ul",{className:h.transcriptRetryList,tabIndex:0,"aria-labelledby":i,children:e.map(s=>{let c=n?.id===s.id&&s.state==="ready"?n.state:s.state,l={busy:"retryTranscriptBusy",sending:"retryTranscriptSending",uncertain:"retryTranscriptUncertain"}[c];return(0,a.jsxs)("li",{className:h.transcriptRetry,"data-retry-state":c,children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:h.transcriptRetryText,children:s.text}),l&&(0,a.jsx)("p",{className:h.hint,role:"status",children:r(l)})]}),(0,a.jsx)(W.Button,{variant:"outline",disabled:t||!!n||c!=="ready",onClick:()=>{o(s.id)},"data-whale-operation":"retry-voice-transcript",children:r("retryTranscript")})]},s.id)})})]})}function fr(e,n){let t=e.status;return!!(e.settings?.revision&&e.checkedFor===n&&e.settingsFor===n&&!e.uncertain&&!e.visibilityUncertain&&!e.settingsConflict&&!e.ttsUncertain&&!e.ttsCancelling&&t?.enabled===!1&&t.ownerSessionId===null&&t.voiceControlBusy===!1&&t.voiceSession?.fullyStopped===!0&&t.voiceSession?.id===null)}function Oh({state:e,sessionId:n,t,run:o,readState:r}){let i=(0,O.useRef)(0);(0,O.useEffect)(()=>()=>{i.current++},[n]);let s=fr(e,n),c=e.settings?.voiceSession?.performanceMode,l=e.performanceFor===n?e.performance:null,u=["fast","balanced","high"],d=l?.modes?.some(p=>p.performanceMode===c&&!p.available),m=e.busy||e.performancePending||e.uncertain||e.visibilityUncertain||!s,f=async p=>{if(m||p===c)return;let b=++i.current;if(p!=="compatibility"&&!await o(n,"inspect-performance")||b!==i.current)return;let v=r?.();!v||!fr(v,n)||v.busy||p!=="compatibility"&&(v.performanceFor!==n||!v.performance?.modes?.find(y=>y.performanceMode===p)?.available)||await o(n,"set-performance-mode",{revision:v.settings.revision,performanceMode:p})};return s?(0,a.jsxs)("section",{className:h.quickSpeed,"aria-label":t("performanceTitle"),children:[(0,a.jsxs)("div",{className:h.quickSpeedHeader,children:[(0,a.jsx)("span",{children:t("performanceTitle")}),c==="compatibility"&&(0,a.jsx)("small",{children:t("performance_compatibility")})]}),(0,a.jsx)("div",{className:h.quickSegments,children:u.map(p=>(0,a.jsxs)(W.Button,{"aria-pressed":c===p,disabled:m||!!Xi(l,p),title:t(Xi(l,p)||(p==="fast"?"performanceFastHint":"performance_"+p)),onClick:()=>{f(p)},children:[c===p&&(0,a.jsx)(qe,{name:"check"}),(0,a.jsx)(Dd,{value:p,t})]},p))}),(0,a.jsx)(Md,{capability:l,t,compact:!0,pending:e.performancePending,error:e.performanceError}),d&&(0,a.jsx)(W.Button,{variant:"outline",disabled:m,onClick:()=>{f("compatibility")},children:t("performance_compatibility")})]}):null}function Bh({settings:e,sessionId:n,busy:t,run:o,t:r,status:i,verified:s,statusFresh:c,tab:l,markSettingsEdited:u,discardSettingsDraft:d,bindingError:m,captureBindings:f}){let[p,b]=(0,O.useState)(e.values.device??null),[v,y]=(0,O.useState)(e.values.pttMouse),[x,L]=(0,O.useState)(e.values.pttKeyboard??null),[M,B]=(0,O.useState)(e.values.speakerVerification.enabled),C=e.capabilities?.turnSignals===!0,[I,T]=(0,O.useState)(e.values.turnSignals?.enabled??!1),[E,S]=(0,O.useState)(e.values.turnSignals?.volume?.toString()??""),[k,z]=(0,O.useState)((e.values.wakeWordAliases??["\u5C0F\u9CB8\u9C7C"]).join("\uFF0C")),[X,P]=(0,O.useState)(String((e.values.wakeListenTimeoutMs??1e4)/1e3)),N=Yi(k),G=_o(N)&&Number.isInteger(Number(X)*1e3)&&Number(X)>=3&&Number(X)<=30,V=JSON.stringify(N)!==JSON.stringify(e.values.wakeWordAliases??["\u5C0F\u9CB8\u9C7C"])||Number(X)*1e3!==(e.values.wakeListenTimeoutMs??1e4),[F,U]=(0,O.useState)(e.values.semanticExperimental===!0),[K,de]=(0,O.useState)(e.values.turnSignals?.headphonesConfirmed??!1),[ue,Q]=(0,O.useState)(e.values.turnSignals?.experimentalAutomaticBargeIn??!1),j=v!==e.values.pttMouse||JSON.stringify(x)!==JSON.stringify(e.values.pttKeyboard??null),[A,ne]=(0,O.useState)(!1),pe=c?i?.inputDevices:null,ge=p!==null&&typeof p=="object",Ge=ge||p==null||p===""||pe?.items?.some(ie=>typeof p=="number"&&ie.index===p),Ve=A==="index"&&(String(p??"").trim()===""||!/^\d+$/.test(String(p).trim())||!Number.isSafeInteger(Number(p))),$e=t||!c||i?.enabled!==!1||i?.ownerSessionId!==null||i?.voiceControlBusy!==!1||i?.voiceSession?.fullyStopped!==!0,at=()=>{if(t||!G||Ve||V&&$e)return;let ie=ge&&!A?p:A==="index"?Number(p):p==null||p===""?null:A==="name"?String(p).trim():typeof p=="number"?p:p.trim();o(n,"save-settings",{revision:e.revision,values:{wakeWordAliases:N,wakeListenTimeoutMs:Number(X)*1e3,semanticExperimental:F,device:ie,pttMouse:e.values.pttMouse,...e.capabilities?.pttKeyboard?{pttKeyboard:e.values.pttKeyboard??null}:{},speakerVerification:{enabled:M},...C?{turnSignals:{enabled:I,volume:Number(E),headphonesConfirmed:K,experimentalAutomaticBargeIn:ue}}:{}}})},Ln=(0,a.jsx)(W.Button,{className:h.primary,variant:"primary",disabled:t||!G||Ve||V&&$e||C&&(E.trim()===""||!Number.isFinite(Number(E))||Number(E)<0||Number(E)>1),onClick:at,children:r(t?"pending":"save")}),Ee=ge?p.name:pe?.items?.find(ie=>ie.index===p)?.name??(p==null||p===""?r("deviceDefault"):String(p));return(0,a.jsxs)("div",{className:h.section,"data-settings-draft":"save-settings",children:[(0,a.jsxs)("div",{hidden:l!=="audio",className:h.section,children:[(0,a.jsx)("h3",{children:r("mode")}),(0,a.jsxs)("p",{className:h.hint,children:["\u5F53\u524D\uFF1A",r(xo(i?.listenMode??e.listenMode))]}),(0,a.jsx)("div",{className:h.segmented,children:["ptt","always","wake"].map(ie=>(0,a.jsx)(W.Button,{"data-whale-operation":`listen-mode-${ie}`,variant:"outline","aria-pressed":(i?.listenMode??e.listenMode)===ie,disabled:!e.capabilities?.listenMode||!s||t,onClick:()=>{o(n,"listen-mode",{mode:ie})},children:r(xo(ie))},ie))}),(!e.capabilities?.listenMode||!s)&&(0,a.jsx)("p",{className:h.hint,children:r(e.capabilities?.listenMode?"modeNeedsGrant":"modeUnavailable")}),(0,a.jsxs)("div",{className:h.inlineActions,children:[(0,a.jsxs)("label",{className:h.inlineField,children:[r("device"),(0,a.jsxs)("select",{title:Ee,className:h.deviceSelect,"aria-label":r("device"),disabled:t,value:A?"__manual-"+A:ge?"__stable":Ge?p??"":"__saved",onChange:ie=>{let Fe=ie.target.value;Fe.startsWith("__manual-")?(ne(Fe.slice(9)),ge&&b("")):Fe!=="__saved"&&Fe!=="__stable"&&(ne(!1),b(Fe===""?null:Number(Fe)))},children:[(0,a.jsx)("option",{value:"",children:r("deviceDefault")}),ge&&(0,a.jsx)("option",{value:"__stable",children:p.name}),pe?.items?.map(ie=>(0,a.jsxs)("option",{value:String(ie.index),children:[ie.name," (",ie.index,")"]},ie.index)),!Ge&&(0,a.jsxs)("option",{value:"__saved",children:[r("deviceSaved"),": ",p]}),(0,a.jsx)("option",{value:"__manual-index",children:r("deviceManualIndex")}),(0,a.jsx)("option",{value:"__manual-name",children:r("deviceManualName")})]})]}),Ln]}),Ee.length>22&&(0,a.jsxs)("details",{className:h.fullName,children:[(0,a.jsx)("summary",{children:"\u67E5\u770B\u8BBE\u5907\u5168\u540D"}),(0,a.jsx)("p",{children:Ee})]}),(A||!Ge)&&(0,a.jsxs)("label",{className:h.field,children:[r("deviceManual"),(0,a.jsx)(W.Input,{"aria-label":r("deviceManual"),disabled:t,value:p??"",onChange:ie=>{A||ne(typeof p=="number"?"index":"name"),b(ie.target.value)}})]}),Ve&&(0,a.jsx)("p",{className:h.notice,children:r("deviceIndexInvalid")}),pe?.status!=="available"&&(0,a.jsx)("p",{className:h.hint,children:r(pe?.status==="empty"?"deviceEmpty":"deviceUnknown")})]}),(0,a.jsx)("div",{hidden:l!=="interaction",className:h.section,children:(0,a.jsxs)("div",{className:h.bindingEditor,"data-settings-draft":"save-bindings",children:[(0,a.jsx)(Dh,{captureBindings:f,sessionId:n,active:l==="interaction",value:x,onChange:ie=>{u?.("save-bindings"),L(ie)},capability:e.capabilities?.pttKeyboard,disabled:t||!c,t:r}),(0,a.jsxs)("fieldset",{className:`${h.radios} ${h.mouseBinding}`,disabled:t||!c,children:[(0,a.jsx)("legend",{children:r("sideButton")}),[0,1,2].map((ie,Fe)=>(0,a.jsxs)("label",{children:[(0,a.jsx)("input",{type:"radio",name:"whale-ear-mouse",value:ie,checked:v===ie,onChange:()=>{u?.("save-bindings"),y(ie)}}),r(["sideOff","sideOne","sideTwo"][Fe])]},ie))]}),m&&(0,a.jsx)("p",{role:"alert",className:h.notice,children:/RECORDING|KEYS_HELD/.test(m)?"\u8BF7\u5148\u677E\u5F00\u6309\u952E\uFF0C\u7B49\u5F85\u5F55\u97F3\u5904\u7406\u5B8C\u6210\uFF0C\u518D\u4FDD\u5B58\u3002":/UNCONFIRMED|STOP_UNCONFIRMED|ROLLBACK_UNCONFIRMED/.test(m)?"\u6309\u952E\u72B6\u6001\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u91CD\u542F DSH \u518D\u6838\u67E5\u6309\u952E\u3002":/STALE|配置已改变|语音会话已改变/.test(m)?"\u914D\u7F6E\u6216\u8BED\u97F3\u4F1A\u8BDD\u5DF2\u6539\u53D8\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6\u540E\u518D\u4FDD\u5B58\u3002":/UNSUPPORTED/.test(m)?"\u5F53\u524D\u7CFB\u7EDF\u4E0D\u652F\u6301\u5728\u5BF9\u8BDD\u4E2D\u66F4\u6362\u5168\u5C40\u6309\u952E\u3002":"\u672A\u80FD\u4FDD\u5B58\u6309\u952E\uFF0C\u8BF7\u67E5\u770B\u9AD8\u7EA7\u8BE6\u60C5\u3002"}),(0,a.jsxs)("div",{className:`${h.actions} ${h.bindingActions}`,children:[(0,a.jsx)(W.Button,{className:h.primary,variant:"primary",disabled:t||!c||!j||!e.bindingContext||x?.code==="F4"&&x.modifiers.includes("Alt"),onClick:()=>{o(n,"save-bindings",{revision:e.revision,bindingContext:e.bindingContext,values:{pttMouse:v,pttKeyboard:x}})},children:r("saveBindings")}),j&&(0,a.jsx)(W.Button,{variant:"outline",disabled:t,onClick:()=>{y(e.values.pttMouse),L(e.values.pttKeyboard??null),d?.("save-bindings")},children:r("discardBindings")})]})]})}),(0,a.jsxs)("div",{hidden:l!=="advanced"||!e.values.speakerVerification.enabled,className:h.section,children:[e.values.speakerVerification.enabled&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(Dt,{label:r("speaker"),checked:M,disabled:t,onChange:B}),(0,a.jsx)("p",{className:h.hint,children:r("speakerHint")})]}),(0,a.jsx)("p",{className:h.hint,children:r("savedHint")})]}),(0,a.jsxs)("div",{hidden:l!=="audio",className:h.disclosureRow,children:[(0,a.jsxs)("details",{className:h.section,children:[(0,a.jsx)("summary",{children:r("wakeSettings")}),(0,a.jsx)("p",{className:h.hint,children:r("wakeMethod")}),(0,a.jsxs)("label",{className:h.field,children:[r("wakeAliases"),(0,a.jsx)(W.Input,{"aria-label":r("wakeAliases"),maxLength:208,value:k,disabled:$e,onChange:ie=>z(ie.target.value)})]}),(0,a.jsx)("p",{className:h.hint,children:r("wakeAliasesHint")}),(0,a.jsxs)("label",{className:h.field,children:[r("wakeTimeout"),(0,a.jsx)(W.Input,{"aria-label":r("wakeTimeout"),type:"number",min:"3",max:"30",step:"1",value:X,disabled:$e,onChange:ie=>P(ie.target.value)})]}),$e&&(0,a.jsx)("p",{className:h.hint,children:r("wakeStopToEdit")}),!G&&(0,a.jsx)("p",{role:"alert",className:h.notice,children:r("wakeInvalid")})]}),(0,a.jsxs)("details",{className:h.section,children:[(0,a.jsx)("summary",{children:r("soundTitle")}),(0,a.jsx)(Dt,{label:r("soundEnabled"),checked:I,disabled:!C||t,onChange:T}),(0,a.jsxs)("label",{className:h.field,children:[r("soundVolume"),(0,a.jsx)(Xt,{"aria-label":r("soundVolume")+"\u6ED1\u5757",min:"0",max:"1",step:"0.05",value:E,disabled:!C||t,onChange:ie=>S(ie.target.value)}),(0,a.jsx)(W.Input,{type:"number",min:"0",max:"1",step:"0.05","aria-label":r("soundVolume"),disabled:!C||t,value:E,onChange:ie=>S(ie.target.value)})]}),(0,a.jsx)(Dt,{label:"\u5B9E\u9A8C\u6027\u5524\u9192\u5224\u65AD\uFF08\u9ED8\u8BA4\u5173\u95ED\uFF09",checked:F,disabled:t,onChange:U}),(0,a.jsx)("p",{className:h.hint,children:"\u5173\u95ED\u65F6\uFF0C\u81EA\u7531\u9EA6\u76F4\u63A5\u542C\u53D6\u6709\u6548\u8BED\u97F3\uFF1B\u5F00\u542F\u540E\u4F7F\u7528\u5524\u9192\u8BCD\u6216\u8BED\u4E49\u5224\u65AD\uFF0C\u53EF\u80FD\u6F0F\u5524\u9192\u3002\u5EFA\u8BAE\u4F7F\u7528\u8033\u673A\u51CF\u5C11\u56DE\u58F0\u3002"}),(0,a.jsx)(W.Checkbox,{label:r("headphones"),checked:K,disabled:!C||t,onChange:ie=>{de(ie),ie||Q(!1)}}),(0,a.jsx)("p",{className:h.hint,children:r("headphonesHint")}),(0,a.jsx)(Dt,{label:r("automaticBargeIn"),checked:ue,disabled:!C||!K||t,onChange:Q}),C&&!K&&(0,a.jsx)("p",{className:h.hint,children:r("headphonesRequired")}),(0,a.jsx)("p",{className:h.hint,children:r(C?"soundAvailable":"soundUnavailable")})]})]}),l==="advanced"&&e.values.speakerVerification.enabled&&(0,a.jsx)("div",{className:h.formActions,children:Ln})]})}function Xd({action:e,active:n}){let[t,o]=(0,O.useState)(null),[r,i]=(0,O.useState)(0),s=(0,O.useRef)(0);if((0,O.useEffect)(()=>{if(!e||!n)return;let u=new AbortController,d,m=async p=>{try{let b=await e({operation:p},u.signal);if(u.signal.aborted)return;o(b),b.selected&&(p==="retry"||["idle","downloading"].includes(b.state))&&(d=setTimeout(()=>{m("status")},1e3))}catch{u.signal.aborted||o({state:"unavailable"})}},f=r>s.current?"retry":"status";return s.current=r,m(f),()=>{clearTimeout(d),u.abort()}},[e,n,r]),!e||!n)return null;let c=t?.totalBytes>0&&t?.state==="downloading",l=u=>(u/1e6).toFixed(1);return(0,a.jsxs)("div",{className:h.section,"data-whale-sensevoice":!0,children:[(0,a.jsx)("h3",{children:"SenseVoice"}),(0,a.jsx)("p",{role:"status",children:t?.selected===!1?"\u4F7F\u7528\u9AD8\u7EA7\u8DEF\u5F84\u4E2D\u6307\u5B9A\u7684\u672C\u5730 SenseVoice \u6A21\u578B\u3002":t?.state==="ready"?"\u5DF2\u5C31\u7EEA\uFF0C\u5728\u672C\u673A\u79BB\u7EBF\u8BC6\u522B\u3002":t?.state==="error"?t.message:t?.state==="unavailable"?"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u6A21\u578B\u72B6\u6001\u3002":c?`\u6B63\u5728\u4E0B\u8F7D \xB7 ${l(t.receivedBytes)} / ${l(t.totalBytes)} MB`:"\u6B63\u5728\u51C6\u5907\u672C\u5730\u8BC6\u522B\u6A21\u578B\u2026"}),c&&(0,a.jsx)("progress",{"aria-label":"SenseVoice \u4E0B\u8F7D\u8FDB\u5EA6",value:t.receivedBytes,max:t.totalBytes}),t?.selected&&t?.state==="error"&&(0,a.jsx)(W.Button,{variant:"outline",onClick:()=>{o(null),i(u=>u+1)},children:"\u91CD\u8BD5\u4E0B\u8F7D"})]})}function Rh({settings:e,sessionId:n,busy:t,run:o,t:r,pickPath:i,active:s,modelTab:c,markSettingsEdited:l,senseVoiceAsrAction:u}){let[d,m]=(0,O.useState)(e.modelSetup.models),f=t,p=()=>l?.("save-models"),b=()=>{o(n,"save-models",{revision:e.revision,values:{asr:"sensevoice",modelCompute:"cpu",models:d}})};return(0,a.jsxs)("section",{className:h.section,"data-settings-draft":"save-models",hidden:!["download","paths"].includes(c),children:[(0,a.jsx)("div",{"data-whale-tab-panel":!0,hidden:c!=="download",children:(0,a.jsx)(Xd,{action:u,active:s&&c==="download"})}),(0,a.jsxs)("div",{hidden:c!=="paths",className:h.section,children:[(0,a.jsx)("h3",{children:"\u8BC6\u522B\u6A21\u578B\u672C\u5730\u8DEF\u5F84"}),(0,a.jsx)("p",{className:h.hint,children:"\u53EF\u5728\u201C\u6A21\u578B\u4E0B\u8F7D\u201D\u67E5\u770B\u51C6\u5907\u8FDB\u5EA6\uFF0C\u6216\u5728\u8FD9\u91CC\u6307\u5B9A\u672C\u673A\u5DF2\u6709\u7684 SenseVoice \u76EE\u5F55\u3002"}),[["sensevoiceDir","sensevoicePath"],["campplus","campplusPath"]].map(([v,y])=>(0,a.jsx)(uo,{className:h.pathRow,label:r(y),kind:v,value:d[v],disabled:f,active:s&&c==="paths",pickPath:i,sessionId:n,scope:"sensevoice",onChange:x=>{p(),m(L=>({...L,[v]:x}))}},v)),(0,a.jsx)(W.Button,{variant:"outline",disabled:f,onClick:b,children:r("saveModels")})]})]})}function Xh({settings:e,state:n,sessionId:t,run:o,t:r}){let[i,s]=(0,O.useState)(e.voiceSession.visibility),c=n.settingsFor===t,l=n.checkedFor===t&&n.status!==null,u=l?n.status.voiceCapabilities:e.voiceCapabilities,d=l?n.status.voiceSession:null,m=l&&(n.status.enabled||n.status.ownerSessionId!==null||d?.id!=null),f=l&&n.status.voiceControlBusy===!1,p=n.busy||n.uncertain||!c||!l||!f||m,b=v=>r(v==="workspace"?"workspaceMode":"hiddenMode");return(0,a.jsxs)("section",{className:h.section,"data-whale-visibility":!0,"data-settings-draft":"set-visibility",children:[(0,a.jsx)("h3",{children:r("capabilityTitle")}),(0,a.jsx)("dl",{className:h.details,children:["hidden","workspace"].map(v=>(0,a.jsxs)("div",{className:h.capabilityRow,children:[(0,a.jsx)("dt",{children:b(v)}),(0,a.jsxs)("dd",{children:[r(u?.[v]?.supported?"supported":"unsupported"),u?.[v]?.reason?` \xB7 ${u[v].reason}`:""]})]},v))}),(0,a.jsxs)("p",{className:h.hint,children:[r("taskCapability"),": ",r(u?.taskHandoff?.supported?"supported":"unsupported")," \xB7 ",u?.taskHandoff?.mode??r("unknown"),u?.taskHandoff?.reason?` \xB7 ${u.taskHandoff.reason}`:""]}),(0,a.jsxs)("p",{children:[r("configuredMode"),": ",b(e.voiceSession.visibility)]}),(0,a.jsx)("p",{className:h.hint,children:l?d?.id?`${r("currentVoiceMode")}: ${d.presentation?.requested?b(d.presentation.requested):r("unknown")} \xB7 ${d.id}`:r("noActiveVoice"):r("modeReadFirst")}),(0,a.jsxs)("fieldset",{className:h.radios,disabled:p,children:[(0,a.jsx)("legend",{children:r("chooseVisibility")}),(0,a.jsxs)("label",{children:[(0,a.jsx)("input",{type:"radio",name:"whale-ear-visibility",checked:i==="hidden",onChange:()=>s("hidden")}),r("hiddenMode")]}),(0,a.jsxs)("label",{children:[(0,a.jsx)("input",{type:"radio",name:"whale-ear-visibility",checked:i==="workspace",disabled:!u?.workspace?.supported,onChange:()=>s("workspace")}),r("workspaceMode")]})]}),(0,a.jsx)("p",{className:h.hint,children:r("workspaceWarning")}),(0,a.jsx)("p",{className:h.hint,children:r("visibilityNoMigration")}),(!c||!l)&&(0,a.jsx)("p",{className:h.hint,children:r("modeReadFirst")}),m&&(0,a.jsx)("p",{className:h.hint,children:r("closeBeforeMode")}),l&&!f&&(0,a.jsx)("p",{className:h.hint,children:r("modeControlPending")}),(0,a.jsx)("div",{children:(0,a.jsx)(W.Button,{variant:"outline",disabled:p||i===e.voiceSession.visibility||i==="workspace"&&!u?.workspace?.supported,onClick:()=>{o(t,"set-visibility",{revision:e.revision,visibility:i})},children:r(i==="workspace"?"saveWorkspace":"saveHidden")})})]})}function Dh({value:e,onChange:n,capability:t,disabled:o,t:r,captureBindings:i,sessionId:s,active:c}){let[l,u]=(0,O.useState)(!1),[d,m]=(0,O.useState)(!1),[f,p]=(0,O.useState)(null),b=(0,O.useRef)(null),v=(0,O.useRef)(0),y=(0,O.useRef)(null),x=(0,O.useRef)(!0),L=async C=>{v.current++,x.current&&u(!1);let I=b.current;if(I){x.current&&m(!0);try{await i(I.sessionId,{operation:"end",token:I.token}),b.current===I&&(b.current=null),x.current&&C&&n(C),x.current&&p(null)}catch(T){x.current&&p(String(T.message||T))}finally{x.current&&m(!1)}}},M=async()=>{if(b.current||d)return;let C=++v.current;m(!0),p(null);try{let I=await i(s,{operation:"begin"});if(b.current={...I,sessionId:s},!x.current||C!==v.current){await L();return}u(!0),y.current?.focus()}catch(I){x.current&&p(String(I.message||I))}finally{x.current&&m(!1)}};(0,O.useEffect)(()=>(x.current=!0,()=>{x.current=!1,L()}),[]),(0,O.useEffect)(()=>{(!c||o)&&(v.current++,L())},[c,o,s]),(0,O.useEffect)(()=>{if(!l)return;let C=null,I=!1,T=!1,E=N=>{T||(T=!0,L(N))},S=N=>{if(N.preventDefault(),N.stopPropagation(),N.code==="Escape"){C=null;return}N.repeat||["ControlLeft","ControlRight","AltLeft","AltRight","ShiftLeft","ShiftRight"].includes(N.code)||(C=ed(N),I=!1,p(C?null:r("bindingUnsupported")))},k=N=>{if(N.preventDefault(),N.stopPropagation(),N.code==="Escape"){E();return}C&&(N.code===C.code&&(I=!0),I&&!N.ctrlKey&&!N.altKey&&!N.shiftKey&&E(C))},z=()=>E(),X=()=>{document.hidden&&z()};window.addEventListener("keydown",S,!0),window.addEventListener("keyup",k,!0),window.addEventListener("blur",z),document.addEventListener("visibilitychange",X);let P=setTimeout(z,1e4);return()=>{clearTimeout(P),window.removeEventListener("keydown",S,!0),window.removeEventListener("keyup",k,!0),window.removeEventListener("blur",z),document.removeEventListener("visibilitychange",X)}},[l]);let B=e?[...e.modifiers||[],e.code].join(" + "):r("bindingOff");return(0,a.jsxs)("section",{className:h.keyBinding,children:[(0,a.jsx)("h3",{children:r("keyboardBinding")}),(0,a.jsxs)("div",{className:h.keyBindingRow,children:[(0,a.jsx)("span",{children:B}),(0,a.jsxs)("div",{className:h.actions,children:[(0,a.jsx)(W.Button,{variant:"outline",ref:y,onBlur:()=>{l&&L()},disabled:o||d||!t?.supported||!i,onClick:()=>l?void L():void M(),children:d?"\u6B63\u5728\u4EA4\u63A5\u2026":l?"\u53D6\u6D88\u5F55\u5165":"\u5F55\u5165\u6309\u952E"}),e&&(0,a.jsx)(W.Button,{variant:"outline",disabled:o||d||l,onClick:()=>n(null),children:r("clearBinding")}),b.current&&!l&&!d&&(0,a.jsx)(W.Button,{variant:"outline",onClick:()=>{L()},children:"\u6062\u590D\u539F\u6309\u952E"})]})]}),l&&(0,a.jsx)("p",{role:"status",className:h.notice,children:"\u6309\u952E\u8BF4\u8BDD\u5DF2\u6682\u505C\u3002\u8BF7\u6309\u4E0B\u7EC4\u5408\u952E\u540E\u5168\u90E8\u677E\u5F00\uFF1BEsc \u53D6\u6D88\u3002"}),!t?.supported&&(0,a.jsx)("p",{className:h.hint,children:t?.reason||r("bindingUnavailable")}),f&&(0,a.jsx)("p",{role:"alert",children:f})]})}function Dd({value:e,t:n}){let t={fast:"performanceNoThinking",balanced:"performanceRecommended"}[e];return(0,a.jsxs)("span",{className:h.performanceChoice,children:[n("performance_"+e),t&&(0,a.jsxs)(a.Fragment,{children:[" ",(0,a.jsx)("small",{children:n(t)})]})]})}function Xi(e,n){let t=e?.modes?.find(o=>o.performanceMode===n);return!t||t.available?null:t.reason==="provider_unsupported"?"performanceUnavailable":t.reason==="unknown"?"performanceProbeUnknown":n==="fast"?"performanceFastUnavailable":"performanceHostUnavailable"}function Md({capability:e,t:n,compact:t=!1,pending:o=!1,error:r=null}){let i=e?.modes??[],s=i.map(v=>v.reason),c=e?.probe?.status,l=c==="unknown"||s.includes("unknown"),u=o||c==="pending"||c==="running",d=!t&&(c==="accepted"||s.includes("accepted")),m=!t&&s.includes("explicit_off"),f=i.some(v=>v.performanceMode==="fast"&&!v.available&&v.reason==="host_contract_blocked"),p=s.includes("provider_unsupported"),b=i.some(v=>v.performanceMode!=="fast"&&!v.available&&v.reason==="host_contract_blocked");if(!l&&!u&&!d&&!m&&!f&&!p&&!b&&!r)return null;if(t){let v=r||n(u?"performanceProbePending":f?"performanceFastUnavailable":p?"performanceUnavailable":l?"performanceProbeUnknown":"performanceHostUnavailable");return(0,a.jsx)("div",{role:"status",className:h.quickHint,"data-whale-probe-status":!0,title:v,children:v})}return(0,a.jsxs)("div",{role:"status",className:h.hint,"data-whale-probe-status":!0,children:[u&&(0,a.jsx)("p",{children:n("performanceProbePending")}),r&&(0,a.jsx)("p",{"data-whale-probe-error":!0,children:r}),f&&(0,a.jsx)("p",{children:n("performanceFastUnavailable")}),p&&(0,a.jsx)("p",{children:n("performanceUnavailable")}),b&&(0,a.jsx)("p",{children:n("performanceHostUnavailable")}),l&&(0,a.jsx)("p",{children:n("performanceProbeUnknown")}),d&&(0,a.jsx)("p",{children:n("performanceProbeAccepted")}),m&&(0,a.jsx)("p",{children:n("performanceFastHint")})]})}function Mh({state:e,sessionId:n,run:t,t:o,markSettingsEdited:r}){let i=e.settings,s=i?.voiceSession?.performanceMode??null,[c,l]=(0,O.useState)(s),u=fr(e,n),d=e.performanceFor===n?e.performance:null,m=d?.modes?.find(p=>p.performanceMode===c),f=e.busy||e.performancePending||e.uncertain||!u||!c||c!=="compatibility"&&!m?.available;return u?(0,a.jsxs)("section",{className:h.section,"data-whale-performance":!0,"data-settings-draft":"set-performance-mode",children:[(0,a.jsx)("h3",{children:o("performanceTitle")}),(0,a.jsx)("p",{className:h.hint,children:o("performanceHint")}),(0,a.jsx)("p",{className:h.hint,"data-whale-probe-cost":!0,children:"\u90E8\u5206\u6A21\u578B\u7684\u68C0\u6D4B\u4F1A\u53D1\u9001\u8BA1\u8D39\u77ED\u8BF7\u6C42\u3002"}),(0,a.jsxs)("details",{className:h.details,children:[(0,a.jsx)("summary",{children:"\u68C0\u6D4B\u8303\u56F4\u4E0E\u8D39\u7528"}),(0,a.jsx)("p",{children:o("performanceProbeCost")}),(0,a.jsx)("p",{children:o("performanceProbeScope")})]}),(0,a.jsx)(Md,{capability:d,t:o,pending:e.performancePending,error:e.performanceError}),!d&&(0,a.jsx)("p",{className:h.hint,children:o("performanceReadFirst")}),s&&(0,a.jsxs)("p",{className:h.hint,children:["\u5F53\u524D\uFF1A",o("performance_"+s)]}),(0,a.jsx)("div",{className:h.segmented,children:["fast","balanced","high","compatibility"].map(p=>{let b=p==="compatibility"?null:d?Xi(d,p):"performanceReadFirst";return(0,a.jsx)(W.Button,{title:b?o(b):void 0,"aria-pressed":c===p,disabled:e.busy||e.performancePending||!!b,onClick:()=>{r?.("set-performance-mode"),l(p)},children:(0,a.jsx)(Dd,{value:p,t:o})},p)})}),(0,a.jsxs)("div",{className:h.actions,children:[(0,a.jsx)(W.Button,{variant:"outline",disabled:e.busy||e.performancePending,onClick:()=>{t(n,"inspect-performance")},children:o("inspectPerformance")}),(0,a.jsx)(W.Button,{variant:"outline",disabled:f||c===s,onClick:()=>{t(n,"set-performance-mode",{revision:i.revision,performanceMode:c})},children:o("savePerformance")})]})]}):null}function Zh({state:e,sessionId:n,run:t,t:o}){let r=e.outputVolumeFor===n?e.outputVolume:null,[i,s]=(0,O.useState)(null),[c,l]=(0,O.useState)(null),u=i??r?.volume??1,d=i!==null&&c!==r?.revision;return(0,O.useEffect)(()=>{s(null),l(null)},[n]),(0,a.jsxs)("section",{className:h.section,children:[(0,a.jsx)("h3",{children:o("outputVolume")}),r&&!r.supported&&(0,a.jsx)("p",{className:h.hint,children:o("outputVolumeUnavailable")}),r?.supported&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:h.volumeRow,children:[(0,a.jsxs)("label",{className:h.volumeControl,children:[(0,a.jsx)(Xt,{"aria-label":o("outputVolume"),min:"0",max:"1",step:"0.01",value:u,disabled:!r.supported||e.busy||e.outputVolumeUncertain,onChange:m=>{i===null&&l(r.revision),s(Number(m.target.value))}}),(0,a.jsxs)("span",{children:[Math.round(u*100),"%"]})]}),(0,a.jsx)(W.Button,{variant:"outline",disabled:!r.supported||e.busy||e.outputVolumeUncertain||d||i===null,onClick:async()=>{await t(n,"set-output-volume",{revision:c,volume:i})&&s(null)},children:o("saveOutputVolume")})]}),(0,a.jsx)("p",{className:h.hint,children:"\u4E0B\u4E00\u6BB5\u64AD\u653E\u751F\u6548"})]}),d&&(0,a.jsxs)("p",{role:"status",className:h.notice,children:["\u97F3\u91CF\u5DF2\u5728\u522B\u5904\u66F4\u65B0\uFF0C\u5F53\u524D\u9009\u62E9\u5DF2\u4FDD\u7559\u3002",(0,a.jsx)(W.Button,{variant:"outline",disabled:e.busy,onClick:()=>s(null),children:"\u4F7F\u7528\u5F53\u524D\u97F3\u91CF"})]}),!r&&(0,a.jsx)("p",{role:"status",className:h.hint,children:e.busy?o("pending"):o("statusRetry")}),e.outputVolumeUncertain&&(0,a.jsx)("p",{role:"status",className:h.notice,children:o("outputVolumeUnknown")})]})}function Fh({state:e,sessionId:n,run:t,markSettingsEdited:o,discardSettingsDraft:r}){let i=e.settingsFor===n?e.settings:null,s=i?.conversationModel??{mode:"auto",provider:null,model:null},[c,l]=(0,O.useState)(s),[u,d]=(0,O.useState)(""),[m,f]=(0,O.useState)(!1),p=(0,O.useRef)(!1),b=(0,O.useRef)(!0);(0,O.useEffect)(()=>(b.current=!0,()=>{b.current=!1}),[]);let v=e.conversationModelsFor===n?e.conversationModels:null,y=v?.providers??[],x=y.find(S=>S.id===c.provider),L=c.mode==="auto"||!!x?.models.some(S=>S.id===c.model),M=JSON.stringify(c)!==JSON.stringify(s),B=e.status,C=e.checkedFor===n&&!e.uncertain&&B?.enabled===!1&&B?.ownerSessionId===null&&B?.voiceControlBusy===!1&&B?.voiceSession?.fullyStopped===!0&&B?.voiceSession?.id===null,I=!i||!C||e.busy||e.settingsConflict||e.visibilityUncertain||m,T=S=>{o?.("save-conversation-model"),l(k=>({...k,...S})),d("")},E=async()=>{if(I||p.current||!M||!L)return;p.current=!0,f(!0),d("");let S=await t(n,"save-conversation-model",{revision:i.revision,values:c.mode==="auto"?{mode:"auto",provider:null,model:null}:c});p.current=!1,b.current&&(f(!1),d(S?"\u9ED8\u8BA4\u5DF2\u4FDD\u5B58\uFF0C\u4E0B\u6B21\u5F00\u542F\u8BED\u97F3\u751F\u6548\u3002":"\u4FDD\u5B58\u672A\u6210\u529F\uFF0C\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002\u8BF7\u6838\u67E5\u63D0\u793A\u540E\u518D\u64CD\u4F5C\u3002"))};return(0,a.jsxs)("section",{className:h.section,"data-conversation-model":!0,"data-settings-draft":"save-conversation-model",children:[(0,a.jsx)("h3",{children:"\u9ED8\u8BA4\u5BF9\u8BDD\u6A21\u578B"}),(0,a.jsx)("p",{className:h.hint,children:"\u63A5\u6536\u8BED\u97F3\u8BC6\u522B\u540E\u7684\u6587\u5B57\uFF0C\u7528\u4E8E\u751F\u6210\u56DE\u7B54\u3002"}),(0,a.jsx)("fieldset",{className:h.radios,disabled:I,"aria-label":"\u5BF9\u8BDD\u6A21\u578B\u9009\u62E9\u65B9\u5F0F",children:[["auto","\u81EA\u52A8"],["manual","\u624B\u52A8\u6307\u5B9A"]].map(([S,k])=>(0,a.jsxs)("label",{children:[(0,a.jsx)("input",{type:"radio",name:"conversation-mode-"+n,checked:c.mode===S,onChange:()=>T(S==="auto"?{mode:S,provider:null,model:null}:{mode:S})}),k]},S))}),c.mode==="auto"&&(0,a.jsxs)("div",{className:h.section,children:[(0,a.jsx)("p",{className:h.hint,children:"\u8DDF\u968F\u5F53\u524D\u5BF9\u8BDD\u6240\u9009\u6A21\u578B\u3002\u7A7A\u767D\u9996\u9875\u4F7F\u7528 DSH \u7684\u9ED8\u8BA4\u6A21\u578B\u3002"}),(0,a.jsx)("p",{children:"\u5F00\u542F\u8BED\u97F3\u65F6\u786E\u5B9A\u6A21\u578B\u6765\u6E90"})]}),(0,a.jsx)(Hi,{open:c.mode==="manual",children:(0,a.jsxs)("div",{className:h.section,"data-conversation-manual":!0,children:[(0,a.jsx)(Id,{label:"\u4F9B\u5E94\u5546",value:c.provider,options:y,disabled:I||!v,onChange:S=>T({provider:S,model:null})}),(0,a.jsx)(Id,{label:"\u6A21\u578B",value:c.model,options:x?.models??[],disabled:I||!x,onChange:S=>T({model:S})}),(0,a.jsx)("p",{className:h.hint,children:"\u4EC5\u5217\u51FA\u5BBF\u4E3B\u5DF2\u914D\u7F6E\u7684\u5BF9\u8BDD\u4F9B\u5E94\u5546\u4E0E\u6A21\u578B\uFF0C\u4FDD\u5B58\u65F6\u518D\u6B21\u9A8C\u8BC1\u3002"}),!v&&(0,a.jsx)("p",{role:"status",children:e.conversationModelsError?"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u4F9B\u5E94\u5546\uFF0C\u8BF7\u91CD\u8BD5\u3002":"\u6B63\u5728\u8BFB\u53D6\u4F9B\u5E94\u5546\u2026"}),v&&!y.length&&(0,a.jsx)("p",{role:"status",children:"\u6682\u65E0\u53EF\u7528\u5BF9\u8BDD\u6A21\u578B\uFF0C\u8BF7\u5148\u5728 DSH \u4E2D\u914D\u7F6E\u4F9B\u5E94\u5546\u3002"}),c.provider&&!L&&(0,a.jsx)("p",{role:"status",children:"\u8BF7\u9009\u62E9\u5F53\u524D\u53EF\u7528\u7684\u4F9B\u5E94\u5546\u4E0E\u6A21\u578B\u3002\u539F\u9009\u62E9\u4E0D\u4F1A\u81EA\u52A8\u66FF\u6362\u3002"}),(0,a.jsx)(W.Button,{variant:"outline",disabled:e.busy,onClick:()=>{t(n,"conversation-models")},children:"\u5237\u65B0\u4F9B\u5E94\u5546"})]})}),(0,a.jsxs)("div",{className:h.actions,children:[(0,a.jsx)(W.Button,{variant:"primary",disabled:I||!M||!L,onClick:()=>{E()},children:m?"\u4FDD\u5B58\u4E2D\u2026":"\u4FDD\u5B58\u9ED8\u8BA4"}),(0,a.jsx)(W.Button,{variant:"outline",disabled:I||!M,onClick:()=>{l(s),d(""),r?.("save-conversation-model")},children:"\u53D6\u6D88\u4FEE\u6539"})]}),(0,a.jsx)("p",{role:"status",className:h.hint,children:u||(M?"\u5C1A\u672A\u4FDD\u5B58":s.mode==="auto"?"\u5DF2\u4FDD\u5B58\uFF1A\u81EA\u52A8 \xB7 \u8DDF\u968F\u5F53\u524D\u5BF9\u8BDD":`\u5DF2\u4FDD\u5B58\uFF1A${s.provider} / ${s.model}`)})]})}function Id({label:e,value:n,options:t,disabled:o,onChange:r}){let[i,s]=(0,O.useState)(!1),[c,l]=(0,O.useState)(0),u=(0,O.useRef)(null),d=(0,O.useRef)(null),m=(0,O.useRef)(null),f=(0,O.useId)(),p=t.find(y=>y.id===n);(0,O.useEffect)(()=>{o&&s(!1)},[o]),(0,O.useEffect)(()=>{i&&m.current?.querySelector('[data-option-index="'+c+'"]')?.focus()},[i,c]);let b=()=>{s(!1),d.current?.focus()},v=y=>{r(y.id),b()};return(0,a.jsxs)("div",{ref:u,className:h.conversationChoice,onBlur:y=>{y.currentTarget.contains(y.relatedTarget)||s(!1)},children:[(0,a.jsx)("span",{id:f+"-label",children:e}),(0,a.jsxs)(W.Button,{ref:d,variant:"outline",className:h.deviceSelect,"aria-label":e,"aria-haspopup":"listbox","aria-expanded":i,"aria-controls":f,disabled:o||!t.length,onClick:()=>{l(Math.max(0,t.findIndex(y=>y.id===n))),s(!i)},onKeyDown:y=>{["ArrowDown","ArrowUp"].includes(y.key)&&(y.preventDefault(),l(Math.max(0,t.findIndex(x=>x.id===n))),s(!0))},children:[p?.name||n||"\u8BF7\u9009\u62E9",(0,a.jsx)("span",{"aria-hidden":"true",children:"\u2304"})]}),i&&(0,a.jsx)(W.MenuSurface,{ref:m,id:f,className:h.conversationOptions,role:"listbox","aria-labelledby":f+"-label",onKeyDown:y=>{y.key==="Escape"?(y.preventDefault(),y.stopPropagation(),b()):["ArrowDown","ArrowUp","Home","End"].includes(y.key)&&(y.preventDefault(),l(x=>y.key==="Home"?0:y.key==="End"?t.length-1:(x+(y.key==="ArrowDown"?1:-1)+t.length)%t.length))},children:t.map((y,x)=>(0,a.jsxs)("button",{type:"button",role:"option","aria-selected":n===y.id,tabIndex:x===c?0:-1,"data-option-index":x,onClick:()=>v(y),children:[y.name,n===y.id&&(0,a.jsx)("span",{"aria-hidden":"true",children:" \u2713"})]},y.id))})]})}function Uh({state:e,sessionId:n,run:t,markSettingsEdited:o,discardSettingsDraft:r,t:i}){let s=e.settingsFor===n?e.settings:null,c=s?.voicePrompt,l=c?.text??"",[u,d]=(0,O.useState)(l),[m,f]=(0,O.useState)(!1),[p,b]=(0,O.useState)(""),v=(0,O.useRef)(!1),y=(0,O.useRef)(!0),x=(0,O.useRef)(l),L=(0,O.useId)();(0,O.useEffect)(()=>(y.current=!0,()=>{y.current=!1}),[]),(0,O.useEffect)(()=>{if(x.current!==l){let z=x.current;d(X=>X===z?l:X),x.current=l}},[l]);let M=u.trim()?u:"",B=M!==(l.trim()?l:""),C=e.status,I=e.checkedFor===n&&!e.uncertain&&C?.enabled===!1&&C?.ownerSessionId===null&&C?.voiceControlBusy===!1&&C?.voiceSession?.fullyStopped===!0&&C?.voiceSession?.id===null,T=!s||!I||e.busy||e.settingsConflict||e.visibilityUncertain||m,E=!!M&&c?.customSupported!==!0,S=u.length<=32768&&!E,k=async()=>{if(T||v.current||!B||!S)return;v.current=!0,f(!0),b("");let z=!1;try{z=await t(n,"save-voice-prompt",{revision:s.revision,values:{text:M}})}catch{z=!1}finally{v.current=!1,y.current&&(f(!1),b(i(z?"voicePromptSaved":"voicePromptSaveFailed")))}};return(0,a.jsxs)("section",{className:`${h.section} ${h.voicePrompt}`,"data-voice-prompt":!0,"data-settings-draft":"save-voice-prompt",children:[(0,a.jsxs)("label",{htmlFor:L,children:[i("voicePromptLabel")," ",(0,a.jsx)("span",{className:h.hint,children:i("voicePromptOptional")})]}),(0,a.jsx)("textarea",{id:L,className:h.voicePromptInput,value:u,maxLength:32768,disabled:T,placeholder:i("voicePromptPlaceholder"),"aria-describedby":L+"-count "+L+"-feedback",onChange:z=>{o?.("save-voice-prompt"),d(z.target.value),b("")}}),(0,a.jsxs)("div",{id:L+"-count",className:h.voicePromptCount,children:[u.length.toLocaleString("en-US")," / 32,768"]}),(0,a.jsxs)("div",{className:h.voicePromptActions,children:[(0,a.jsxs)("div",{className:h.actions,children:[(0,a.jsx)(W.Button,{variant:"primary",disabled:T||!B||!S,onClick:()=>{k()},children:i(m?"voicePromptSaving":"voicePromptSave")}),(0,a.jsx)(W.Button,{variant:"outline",disabled:T||u===l,onClick:()=>{d(l),b(""),r?.("save-voice-prompt")},children:i("voicePromptCancel")})]}),(0,a.jsx)("span",{className:h.hint,children:i("voicePromptStopToEdit")})]}),(0,a.jsx)("p",{id:L+"-feedback",role:"status",className:h.hint,children:p||(u.length>32768?i("voicePromptTooLong"):c?.customSupported===!1||E?i("voicePromptUnsupported"):B?i("voicePromptUnsaved"):"")})]})}var jb=Object.freeze({version:1,available:!1,reason:"planned"}),Et=["audio","interaction","prompt","models","advanced","sessions","pets"],qh={audio:"\u9009\u62E9\u9EA6\u514B\u98CE\u3001\u8BF4\u8BDD\u65B9\u5F0F\u4E0E\u63D0\u793A\u97F3\u3002",interaction:"\u8BBE\u7F6E\u6309\u952E\u3001\u56DE\u7B54\u901F\u5EA6\u4E0E\u754C\u9762\u52A8\u753B\u3002",prompt:"\u8BBE\u7F6E\u8BED\u97F3\u5BF9\u8BDD\u7684\u8868\u8FBE\u65B9\u5F0F\u3002",models:"\u9009\u62E9\u6717\u8BFB\u65B9\u5F0F\uFF0C\u6216\u7BA1\u7406\u672C\u5730\u6A21\u578B\u3002",advanced:"\u67E5\u770B\u6743\u9650\u3001\u8BF7\u6C42\u4E0E\u8FD0\u884C\u8BE6\u60C5\u3002",sessions:"\u9009\u62E9\u8BED\u97F3\u5BF9\u8BDD\u76EE\u6807\uFF0C\u67E5\u770B\u9C7C\u5E94\u4F1A\u8BDD\u548C\u5B50\u4EE3\u7406\u3002",pets:"\u684C\u5BA0\u529F\u80FD\u5C1A\u672A\u5F00\u653E\u3002"};function Vh(e){let{t:n,sessionId:t}=e,o=e.useWhaleUi(E=>E),r=e.useWhalePreferences(E=>E),i=o.settingsTab||"audio",s=o.settingsModelTab||"conversation",[c,l]=(0,O.useState)(()=>new Set([o.settingsTab||"audio"])),[u,d]=(0,O.useState)(()=>new Set([o.settingsModelTab||"conversation"])),[m,f]=(0,O.useState)(0),p=(0,O.useRef)(null),b=(0,O.useRef)(null),v=(0,O.useRef)(0),y=(0,O.useRef)(new Set),x=(0,O.useRef)(o.readRefresh),L=(0,O.useId)();(0,O.useLayoutEffect)(()=>{p.current&&(p.current.scrollTop=0)},[i,s]),(0,O.useEffect)(()=>{e.setSession?.(t)},[t]),(0,O.useEffect)(()=>()=>{v.current++,e.cancelPreview?.(),e.discardDiagnostics?.()},[]),(0,O.useEffect)(()=>{y.current.clear()},[t,i,s]),(0,O.useEffect)(()=>{i==="models"&&e.refreshModelCompute?.(t)},[t,i,s]),(0,O.useEffect)(()=>{if(o.busy||o.ttsCancelling||["pets","sessions"].includes(i))return;let E=e.readState?.();if(E?.busy||E?.ttsCancelling)return;if(x.current!==o.readRefresh){x.current=o.readRefresh;for(let X of["read-output-volume","model-installer","agent-requests"])y.current.delete(X)}let z=[...!o.settings||o.settingsFor!==t?["read-settings"]:[],...!o.status||o.checkedFor!==t||i==="advanced"?["status"]:[],...i==="audio"?["read-output-volume"]:[],...i==="models"&&s==="conversation"?["conversation-models"]:[],...t&&i==="advanced"?["agent-requests"]:[],...t&&i==="interaction"&&o.performanceFor!==t?["inspect-performance"]:[],...i==="models"&&s==="voice"&&(!o.ttsCapabilities||o.ttsCapabilitiesFor!==t)?["inspect-tts"]:[],...i==="models"?["model-installer"]:[]].find(X=>!y.current.has(X));z&&(y.current.add(z),e.run(t,z,{},!0))},[t,i,s,o.readRefresh,o.busy,o.ttsCancelling,o.settingsFor,o.checkedFor,o.outputVolumeFor,o.agentRequestsFor,o.performanceFor,o.ttsCapabilitiesFor,o.installerFor]);let M=async(E,S=!1)=>{let k=++v.current;e.cancelPreview&&!await e.cancelPreview()||(e.discardDiagnostics?.(),k===v.current&&(l(z=>new Set([...z,E])),e.setSettingsTab(E),S&&b.current?.querySelector(`[data-settings-tab="${E}"]`)?.focus({preventScroll:!0})))},B=async E=>{let S=++v.current;e.cancelPreview&&!await e.cancelPreview()||(e.discardDiagnostics?.(),S===v.current&&(d(k=>new Set([...k,E])),e.setSettingsModelTab(E)))},C=o.settingsFor===t?o.settings:null,I=!o.uncertain&&o.checkedFor===t,T=C&&(0,a.jsx)(Bh,{settings:C,sessionId:t,busy:o.busy||o.visibilityUncertain||o.settingsConflict,run:e.run,t:n,status:o.status,statusFresh:I,verified:I&&!!o.status,tab:i,markSettingsEdited:e.markSettingsEdited,discardSettingsDraft:e.discardSettingsDraft,bindingError:o.bindingError,captureBindings:e.captureBindings},t+":"+(o.settingsKey??C.revision));return(0,a.jsxs)("div",{className:h.settings,"data-whale-settings":!0,"data-motion":r.motion,children:[(0,a.jsxs)("header",{className:h.settingsHeader,"data-settings-header":!0,children:[(0,a.jsxs)(W.Button,{className:h.backButton,"data-whale-operation":"page-home",onClick:e.showHome,"aria-label":"\u8FD4\u56DE\u8BED\u97F3",children:[(0,a.jsx)(qe,{name:"chevron",className:h.backIcon}),(0,a.jsx)("span",{children:"\u8FD4\u56DE\u8BED\u97F3"})]}),(0,a.jsxs)("div",{className:h.settingsBrand,children:[(0,a.jsx)(Jn,{small:!0}),(0,a.jsx)("h2",{children:n("settingsTitle")})]}),(0,a.jsx)(W.Button,{className:h.guideButton,"data-whale-operation":"page-setup",onClick:e.openSetup,"aria-label":"\u91CD\u65B0\u6253\u5F00\u914D\u7F6E\u5F15\u5BFC",title:"\u91CD\u65B0\u6253\u5F00\u914D\u7F6E\u5F15\u5BFC",children:"\u914D\u7F6E\u5F15\u5BFC"})]}),(0,a.jsxs)("div",{className:h.settingsLayout,children:[(0,a.jsx)("nav",{ref:b,className:h.settingsNav,"data-settings-nav":!0,"aria-label":n("settingsSections"),onKeyDown:E=>{let S=Et.indexOf(E.target.dataset.settingsTab);if(S<0||!["ArrowDown","ArrowUp","ArrowLeft","ArrowRight","Home","End"].includes(E.key))return;E.preventDefault();let k=E.key==="Home"?0:E.key==="End"?Et.length-1:(S+(["ArrowDown","ArrowRight"].includes(E.key)?1:-1)+Et.length)%Et.length;M(Et[k],!0)},children:Et.map(E=>(0,a.jsx)(W.Button,{"data-settings-tab":E,"aria-pressed":i===E,"aria-controls":L+"-body",onClick:()=>{M(E)},children:n("tab_"+E)},E))}),(0,a.jsxs)("div",{className:h.settingsPage,children:[(0,a.jsxs)("div",{className:`${h.pageHeading} ${i==="models"?h.modelHeading:""}`,"data-settings-page-heading":!0,"data-no-drag":!0,children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{id:L,children:n("tab_"+i)}),i!=="models"&&(0,a.jsx)("p",{children:qh[i]})]}),i==="prompt"&&C&&(0,a.jsx)("span",{className:h.voicePromptMode,"data-voice-prompt-mode":!0,children:n(C.voicePrompt?.mode==="custom"&&C.voicePrompt?.customSupported===!0?"voicePromptCustom":"voicePromptAgents")}),i==="models"&&(0,a.jsx)("nav",{className:h.modelNav,"aria-label":"\u6A21\u578B\u8BBE\u7F6E\u5206\u7C7B","data-no-drag":!0,children:[["conversation","\u5BF9\u8BDD\u6A21\u578B"],["voice","\u6717\u8BFB\u65B9\u5F0F"],["download","\u6A21\u578B\u4E0B\u8F7D"],["paths","\u9AD8\u7EA7\u8DEF\u5F84"]].map(([E,S])=>(0,a.jsx)(W.Button,{"aria-pressed":s===E,onClick:()=>{B(E)},children:S},E))})]}),(0,a.jsxs)("div",{ref:p,id:L+"-body",className:h.settingsBody,"data-settings-body":!0,"data-no-drag":!0,onChangeCapture:E=>{let S=E.target.closest("[data-settings-draft]");S&&!E.target.closest("[data-no-settings-draft]")&&e.markSettingsEdited?.(S.dataset.settingsDraft)},tabIndex:0,"aria-label":n("settingsContent"),children:[i==="sessions"?(0,a.jsxs)(a.Fragment,{children:[e.listExistingVoiceSessions&&!o.sessionManagementRoot&&(0,a.jsx)(Ii,{...e,state:o}),(0,a.jsx)(jh,{...e,state:o})]}):i==="pets"?(0,a.jsxs)("section",{className:h.placeholder,"data-whale-pet":!0,"aria-label":n("tab_pets"),children:[(0,a.jsx)(qe,{name:"pet"}),(0,a.jsx)("h3",{children:n("tab_pets")}),(0,a.jsx)("p",{children:n("planned")})]}):(0,a.jsxs)(a.Fragment,{children:[o.error&&(0,a.jsx)("div",{role:"alert",className:h.error,children:n("operationUnavailable")}),o.settingsConflict&&(0,a.jsxs)("p",{role:"status",className:h.notice,children:["\u8BBE\u7F6E\u5DF2\u5728\u522B\u5904\u66F4\u65B0\uFF0C\u5F53\u524D\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002",(0,a.jsx)(W.Button,{variant:"outline",disabled:o.busy,onClick:()=>e.discardSettingsDraft?.(),children:"\u653E\u5F03\u8349\u7A3F\u5E76\u4F7F\u7528\u6700\u65B0\u8BBE\u7F6E"})]}),o.visibilityUncertain&&(0,a.jsx)("p",{role:"status",className:h.notice,children:n("configurationUnknown")}),!C&&(0,a.jsx)("p",{role:"status",className:h.hint,children:o.busy?"\u6B63\u5728\u8BFB\u53D6\u8BBE\u7F6E\u2026":"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u8BBE\u7F6E\u3002\u8FD4\u56DE\u7A97\u53E3\u65F6\u4F1A\u81EA\u52A8\u6838\u67E5\u3002"}),i!=="interaction"&&I&&!(i==="models"&&s==="download")&&(o.status?.enabled||o.status?.ownerSessionId)&&(0,a.jsxs)("div",{className:h.editNotice,role:"status",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("strong",{children:"\u8BED\u97F3\u6B63\u5728\u4F7F\u7528"}),(0,a.jsx)("span",{children:" \xB7 \u505C\u6B62\u540E\u53EF\u4FEE\u6539\u76F8\u5173\u8BBE\u7F6E"})]}),(0,a.jsx)(W.Button,{variant:"outline",disabled:o.busy&&(!o.interruptibleRead||o.diagnosticStopPending)||o.ttsCancelling,onClick:()=>{e.run(t,"disable")},children:"\u505C\u6B62\u8BED\u97F3\u4EE5\u7F16\u8F91"})]})]}),(0,a.jsx)("div",{hidden:!["audio","interaction","advanced"].includes(i),children:T}),(i==="audio"||c.has("audio"))&&(0,a.jsx)("div",{hidden:i!=="audio",children:(0,a.jsx)(Zh,{...e,state:o})}),(i==="interaction"||c.has("interaction"))&&(0,a.jsxs)("div",{hidden:i!=="interaction",children:[C&&(0,a.jsx)(Mh,{...e,state:o},"performance:"+t+":"+(o.settingsKey??C.revision)),(0,a.jsxs)("section",{className:h.section,children:[(0,a.jsx)("h3",{children:n("motionTitle")}),(0,a.jsx)("div",{className:h.segmented,children:["spring","firm","off"].map(E=>(0,a.jsx)(W.Button,{"aria-pressed":r.motion===E,onClick:()=>{e.setMotion(E),f(m+1)},children:n("motion_"+E)},E))}),(0,a.jsx)("div",{className:h.motionPreview,"aria-hidden":"true",children:(0,a.jsx)(Jn,{small:!0})},m),(0,a.jsx)("p",{className:h.hint,children:n("motionHint")}),r.error&&(0,a.jsx)("p",{role:"status",children:n("motionNotSaved")})]})]}),(i==="prompt"||c.has("prompt"))&&C&&(0,a.jsx)("div",{hidden:i!=="prompt",children:(0,a.jsx)(Uh,{...e,state:o},"prompt:"+t+":"+(o.settingsKey??C.revision))}),(i==="models"||c.has("models"))&&(0,a.jsxs)("div",{hidden:i!=="models",children:[C&&(s==="conversation"||u.has("conversation"))&&(0,a.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="conversation",children:(0,a.jsx)(Fh,{...e,state:o},"conversation:"+t+":"+(o.settingsKey??C.revision))}),(s==="voice"||u.has("voice"))&&(0,a.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="voice",children:(0,a.jsx)(Td,{pickPath:e.pickPath,state:o,sessionId:t,run:e.run,markSettingsEdited:e.markSettingsEdited,prepared:!0,active:i==="models"&&s==="voice"})}),(s==="download"||u.has("download"))&&(0,a.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="download",children:(0,a.jsx)(Cd,{state:o,sessionId:t,run:e.run})}),C?.modelSetup&&(0,a.jsx)(Rh,{modelTab:s,markSettingsEdited:e.markSettingsEdited,pickPath:e.pickPath,senseVoiceAsrAction:e.senseVoiceAsrAction,active:i==="models",settings:C,sessionId:t,busy:o.busy||o.visibilityUncertain||o.settingsConflict,run:e.run,t:n},t+":"+(o.settingsKey??C.revision)),(s==="paths"||u.has("paths"))&&(0,a.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="paths",children:(0,a.jsx)(Nd,{state:o,sessionId:t,run:e.run,pickPath:e.pickPath,active:i==="models"&&s==="paths"})})]}),(i==="advanced"||c.has("advanced"))&&(0,a.jsxs)("div",{hidden:i!=="advanced",children:[e.updateAction&&(0,a.jsx)(md,{state:o,open:e.openUpdate,t:n}),(0,a.jsxs)("section",{className:h.section,"aria-label":n("projectInfoTitle"),children:[(0,a.jsx)("h3",{children:n("projectInfoTitle")}),(0,a.jsxs)("dl",{className:h.details,children:[(0,a.jsx)("dt",{children:n("projectAuthor")}),(0,a.jsx)("dd",{children:(0,a.jsx)("a",{href:Gi.url,target:"_blank",rel:"noreferrer noopener",children:Gi.name})}),(0,a.jsx)("dt",{children:n("projectRepository")}),(0,a.jsx)("dd",{children:(0,a.jsxs)("a",{href:dd,target:"_blank",rel:"noreferrer noopener",children:["Emikosama/",cr]})}),(0,a.jsx)("dt",{children:n("projectNpm")}),(0,a.jsx)("dd",{children:(0,a.jsx)("a",{href:`https://www.npmjs.com/package/${cr}`,target:"_blank",rel:"noreferrer noopener",children:cr})})]})]}),(0,a.jsx)(Kh,{...e,state:o,active:i==="advanced"}),(0,a.jsx)(vd,{readOperationLog:e.readOperationLog}),(0,a.jsx)(Wh,{state:o,sessionId:t,t:n}),(0,a.jsxs)("details",{className:h.section,children:[(0,a.jsx)("summary",{children:"\u5BF9\u8BDD\u663E\u793A\u4E0E\u517C\u5BB9\u6027"}),C?.voiceSession&&(0,a.jsx)(Xh,{settings:C,state:o,sessionId:t,run:e.run,t:n},"visibility:"+t+":"+(o.settingsKey??C.revision))]})]})]})]})]})]})}var Hh=new Intl.DateTimeFormat("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"});function jh({manageSessions:e,openManagedSession:n,renameManagedSession:t,setSessionManagement:o,state:r}){let i=r.sessionManagementRoot??null,[s,c]=(0,O.useState)(null),[l,u]=(0,O.useState)(null),[d,m]=(0,O.useState)(!1),[f,p]=(0,O.useState)(null),[b,v]=(0,O.useState)(null),y=(0,O.useRef)(null),x=(0,O.useCallback)(async(X,{append:P=!1}={})=>{if(!e)return;y.current?.abort();let N=new AbortController;y.current=N,m(!0),p(null);try{X.operation!=="list"&&(await e(X,N.signal),N.signal.aborted||p(X.operation==="restore"?"\u5DF2\u53D6\u6D88\u5F52\u6863\u3002\u53EF\u6253\u5F00\u539F\u4F1A\u8BDD\u7EE7\u7EED\u3002":"\u5DF2\u516C\u5F00\u6B64\u4F1A\u8BDD\u3002"));let G=await e(X.operation==="list"?X:{operation:"list",...i?{rootId:i}:{}},N.signal);if(N.signal.aborted||y.current!==N)return;c(V=>P&&V?{...G,items:[...new Map([...V.items,...G.items].map(F=>[F.id,F])).values()]}:G)}catch(G){N.signal.aborted||p(String(G?.message??"\u65E0\u6CD5\u8BFB\u53D6\u9C7C\u5E94\u4F1A\u8BDD").slice(0,400))}finally{y.current===N&&(y.current=null,m(!1))}},[i,e]);(0,O.useEffect)(()=>(x({operation:"list",...i?{rootId:i}:{}}),()=>{let X=y.current;y.current=null,X?.abort()}),[x,i]);let L=X=>{c(null),u(null),v(null),o({rootId:X,historyOpen:!1})},M=(X,P)=>{v(null),u({operation:X,id:P.id,rootId:P.rootId})},B=async X=>{try{await n(X)}catch(P){p(String(P?.message??"\u65E0\u6CD5\u5728 DSH \u6253\u5F00\u4F1A\u8BDD").slice(0,400))}},C=async X=>{X.preventDefault();let P=b.title.trim();if(!(!P||d)){m(!0),p(null);try{let N=await t(b.id,P);c(G=>G&&{...G,items:G.items.map(V=>V.id===b.id?{...V,title:N}:V)}),v(null),p("\u5DF2\u4FDD\u5B58\u4F1A\u8BDD\u540D\u79F0\u3002")}catch(N){p(String(N?.message??"\u65E0\u6CD5\u91CD\u547D\u540D\u4F1A\u8BDD").slice(0,400))}finally{m(!1)}}},I=i?s?.items?.find(X=>X.id===i):null,T={restore_unavailable:"\u6062\u590D\u63A5\u53E3\u4E0D\u53EF\u7528",archive_state_unavailable:"\u65E0\u6CD5\u8BFB\u53D6\u5F52\u6863\u72B6\u6001",persistence_unavailable:"\u4F1A\u8BDD\u5B58\u50A8\u6682\u65F6\u4E0D\u53EF\u7528",policy_mismatch:"\u5F53\u524D\u4F1A\u8BDD\u6743\u9650\u4E0E\u539F\u4F1A\u8BDD\u4E0D\u540C",presentation_mismatch:"\u5F53\u524D DSH \u65E0\u6CD5\u786E\u8BA4\u4F1A\u8BDD\u7684\u9690\u85CF\u72B6\u6001",visibility_mismatch:"\u5F53\u524D\u663E\u793A\u8BBE\u7F6E\u4E0E\u539F\u4F1A\u8BDD\u4E0D\u540C"},E=X=>(0,a.jsx)("ul",{className:h.permissionList,children:X.map(P=>(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{className:h.sessionTitle,children:P.title||(P.kind==="root"?"\u672A\u547D\u540D\u4F1A\u8BDD":"\u672A\u547D\u540D\u5B50\u4EE3\u7406")+" \xB7 "+P.id.slice(-6).toUpperCase()}),(0,a.jsxs)("p",{className:h.hint,children:[P.archived?"\u5DF2\u5F52\u6863":P.visibility==="hidden"?"\u5DF2\u9690\u85CF":P.visibility==="visible"||P.visibility==="workspace"?"\u53EF\u89C1":"\u53EF\u89C1\u6027\u672A\u77E5",T[P.reason]?" \xB7 "+T[P.reason]:""]}),Number.isFinite(P.createdAt)&&(0,a.jsxs)("p",{className:h.hint,children:["\u521B\u5EFA\u4E8E ",(0,a.jsx)("time",{dateTime:new Date(P.createdAt).toISOString(),children:Hh.format(P.createdAt)})]}),(0,a.jsxs)("div",{className:h.actions,children:[P.kind==="root"&&!i&&(0,a.jsx)(W.Button,{variant:"outline",disabled:d,"data-whale-operation":"show-subagents",onClick:()=>L(P.id),children:"\u67E5\u770B\u5B50\u4EE3\u7406"}),n&&["live","available"].includes(P.status)&&(0,a.jsx)(W.Button,{variant:"outline","data-whale-operation":P.kind==="root"?"open-native-session":"open-native-subagent",onClick:()=>B(P),children:"\u5728 DSH \u6253\u5F00"}),t&&P.kind==="root"&&["live","available","archived"].includes(P.status)&&(0,a.jsx)(W.Button,{variant:"outline",disabled:d,onClick:()=>{u(null),v({id:P.id,title:P.title??""})},children:"\u91CD\u547D\u540D"}),P.canUnhide&&(0,a.jsx)(W.Button,{variant:"outline",disabled:d,onClick:()=>M("unhide",P),children:"\u53D6\u6D88\u9690\u85CF"}),P.canRestore&&(0,a.jsx)(W.Button,{variant:"outline",disabled:d,onClick:()=>M("restore",P),children:"\u6062\u590D\u5F52\u6863"})]}),l?.id===P.id&&(0,a.jsxs)("div",{className:h.actions,children:[(0,a.jsx)("span",{children:l.operation==="unhide"?"\u786E\u8BA4\u5728 DSH \u516C\u5F00\u6B64\u4F1A\u8BDD\uFF1F":"\u786E\u8BA4\u53D6\u6D88\u6B64\u4F1A\u8BDD\u7684\u5F52\u6863\uFF1F"}),(0,a.jsx)(W.Button,{variant:"primary",disabled:d,onClick:()=>{let N=l;u(null),x(N)},children:"\u786E\u8BA4"}),(0,a.jsx)(W.Button,{variant:"outline",onClick:()=>u(null),children:"\u53D6\u6D88"})]}),b?.id===P.id&&(0,a.jsxs)("form",{className:h.sessionRename,onSubmit:C,children:[(0,a.jsx)(W.Input,{"aria-label":"\u4F1A\u8BDD\u540D\u79F0",value:b.title,maxLength:128,disabled:d,onChange:N=>v({...b,title:N.target.value})}),(0,a.jsxs)("div",{className:h.actions,children:[(0,a.jsx)(W.Button,{type:"submit",variant:"primary",disabled:d||!b.title.trim(),children:"\u4FDD\u5B58\u540D\u79F0"}),(0,a.jsx)(W.Button,{type:"button",variant:"outline",disabled:d,onClick:()=>v(null),children:"\u53D6\u6D88"})]})]})]},P.id))}),S=(s?.items??[]).filter(X=>X.id!==i),k=S.filter(X=>X.active),z=S.filter(X=>!X.active).sort((X,P)=>(P.createdAt??-1)-(X.createdAt??-1));return(0,a.jsxs)("section",{className:h.section,"data-whale-session-management":!0,children:[i&&(0,a.jsx)(W.Button,{variant:"outline",disabled:d,"data-whale-operation":"show-main-sessions",onClick:()=>L(null),children:"\u8FD4\u56DE\u4E3B\u4F1A\u8BDD"}),d&&!s&&(0,a.jsx)("p",{role:"status",children:"\u6B63\u5728\u8BFB\u53D6\u9C7C\u5E94\u4F1A\u8BDD\u2026"}),f&&(0,a.jsx)("p",{role:"status",className:h.notice,children:f}),I&&E([I]),I?.childrenAvailable&&I?.childrenIncomplete&&(0,a.jsx)("p",{role:"status",children:"\u90E8\u5206\u5B50\u4EE3\u7406\u8BB0\u5F55\u6682\u65F6\u65E0\u6CD5\u6838\u9A8C\u3002\u5F53\u524D\u663E\u793A\u5DF2\u6838\u9A8C\u7684\u4F1A\u8BDD\u3002"}),I&&!I.childrenAvailable&&(0,a.jsx)("p",{role:"status",children:"\u5F53\u524D\u65E0\u6CD5\u8BFB\u53D6\u6B64\u4F1A\u8BDD\u7684\u5B50\u4EE3\u7406\u8BB0\u5F55\u3002"}),I?.childrenAvailable&&!I.childrenIncomplete&&!S.length&&(0,a.jsx)("p",{children:"\u6B64\u4F1A\u8BDD\u8FD8\u6CA1\u6709\u5B50\u4EE3\u7406\u3002"}),k.length>0&&E(k),s&&!i&&k.length===0&&(0,a.jsx)("p",{className:h.hint,children:"\u6682\u65E0\u6D3B\u8DC3\u4F1A\u8BDD\u3002"}),(z.length>0||s?.nextCursor)&&(0,a.jsxs)("details",{className:h.section,"data-whale-session-history":!0,open:r.sessionHistoryOpen===!0,onToggle:X=>{let{open:P}=X.currentTarget;P!==!!r.sessionHistoryOpen&&o({historyOpen:P})},children:[(0,a.jsx)("summary",{"data-whale-operation":i?"subagent-history":"session-history",children:i?"\u5386\u53F2\u5B50\u4EE3\u7406":"\u5386\u53F2\u4F1A\u8BDD"}),E(z),!!s?.nextCursor&&(0,a.jsx)(W.Button,{disabled:d,onClick:()=>{x({operation:"list",cursor:s.nextCursor},{append:!0})},children:"\u52A0\u8F7D\u66F4\u591A"})]}),(0,a.jsx)(W.Button,{variant:"outline",disabled:d,onClick:()=>{x({operation:"list",...i?{rootId:i}:{}})},children:"\u5237\u65B0\u4F1A\u8BDD"}),s?.capabilities?.unhide?.supported===!1&&(0,a.jsx)("p",{className:h.hint,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u65F6\u65E0\u6CD5\u628A\u5B50\u4EE3\u7406\u52A0\u5165\u4FA7\u8FB9\u680F\u3002"}),s?.capabilities?.restore?.supported===!1&&(0,a.jsx)("p",{className:h.hint,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u65F6\u65E0\u6CD5\u901A\u8FC7\u9C7C\u5E94\u53D6\u6D88\u5F52\u6863\u3002"})]})}function Wh({state:e,sessionId:n,t}){let o=e.status,r=o?.ownerSessionId,s=!e.uncertain&&e.checkedFor===n&&typeof o?.helper?.lastError=="string"?o.helper.lastError:null,c=e.error??e.enableError;return(0,a.jsxs)("details",{className:h.section,children:[(0,a.jsx)("summary",{children:t("details")}),(0,a.jsxs)("dl",{className:h.details,children:[(0,a.jsx)("dt",{children:t("source")}),(0,a.jsx)("dd",{"data-whale-owner":!0,"data-session-id":r??"",children:r||t("none")}),(0,a.jsx)("dt",{children:t("actor")}),(0,a.jsx)("dd",{"data-whale-actor":!0,"data-session-id":n??"",children:n||t("openSession")})]}),(0,a.jsx)("p",{className:h.hint,children:t("snapshot")}),c&&(0,a.jsx)("pre",{className:h.requestDetails,children:c}),s&&(0,a.jsxs)("div",{"data-whale-helper-error":!0,children:[(0,a.jsx)("strong",{children:t("inputDiagnosticTitle")}),(0,a.jsx)("pre",{className:h.requestDetails,children:s}),(0,a.jsx)("p",{className:h.hint,children:t("inputDiagnosticHistory")})]}),(0,a.jsx)("p",{className:h.hint,children:t("consequence")}),(0,a.jsx)("p",{className:h.hint,children:o?.helper?.online?t("helperOnline"):t("helperOffline")}),o?.turnSignals?.outputStartObservation?.status==="unsupported"&&(0,a.jsx)("p",{className:h.hint,children:t("outputObservationUnavailable")})]})}function Kh({state:e,sessionId:n,run:t,openAuthorization:o,active:r=!0}){let i=(0,O.useRef)(null),s=(0,O.useRef)(0);(0,O.useEffect)(()=>{i.current=null,s.current++},[r,n]),(0,O.useEffect)(()=>{if(!r||!n||e.busy||e.agentRequestsFor===n||i.current===n)return;i.current=n;let l=s.current;s.current===l&&t(n,"agent-requests")},[r,n,e.busy]);let c=e.agentRequestsFor===n?e.agentRequests:null;return(0,a.jsxs)("section",{className:h.section,"data-whale-agent-requests":!0,children:[(0,a.jsx)("h3",{children:"Agent \u64CD\u4F5C\u8BB0\u5F55"}),(0,a.jsx)(W.Button,{"data-whale-operation":"page-authorization",onClick:()=>{o?.()},children:"\u6388\u6743\u8303\u56F4\u4E0E\u64A4\u9500"}),(e.agentPermissionUncertain||e.agentRequestUncertain)&&(0,a.jsx)("p",{role:"alert",className:h.notice,children:"\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u4F1A\u81EA\u52A8\u6838\u67E5\u5BF9\u5E94\u6743\u9650\u548C\u8BF7\u6C42\u72B6\u6001\uFF0C\u4E0D\u4F1A\u91CD\u590D\u6267\u884C\u3002"}),c?.items?.length===0&&(0,a.jsx)("p",{className:h.hint,children:"\u6CA1\u6709\u5F85\u5904\u7406\u8BF7\u6C42\u3002"}),c?.items?.map(l=>(0,a.jsxs)("section",{className:h.section,"data-agent-request":l.id,children:[(0,a.jsxs)("strong",{children:[l.title," \xB7 ",l.state]}),(0,a.jsxs)("p",{className:h.hint,children:["\u53D1\u8D77\u4F1A\u8BDD\uFF1A",l.sourceSessionId]}),(0,a.jsxs)("details",{children:[(0,a.jsx)("summary",{children:"\u6838\u5BF9\u5B8C\u6574\u53D8\u66F4\u8BA1\u5212"}),(0,a.jsx)("pre",{className:h.requestDetails,children:JSON.stringify({\u5F53\u524D\u8BBE\u7F6E:l.before,\u8BF7\u6C42:l.request,...l.installPlan?{\u4E0B\u8F7D\u8BA1\u5212:l.installPlan}:{},...l.modelApplyTarget?{\u6A21\u578B\u5E94\u7528\u76EE\u6807:l.modelApplyTarget}:{}},null,2)})]}),l.error&&(0,a.jsx)("p",{role:"alert",className:h.error,children:l.error.message}),l.state==="pending"&&(0,a.jsx)(W.Button,{variant:"outline",disabled:e.busy||e.agentRequestUncertain,onClick:()=>{t(n,"decide-agent-request",{id:l.id,approve:!1,acknowledgements:[]})},children:"\u53D6\u6D88\u9884\u89C8"}),l.nextAction&&(0,a.jsx)("p",{className:h.hint,children:l.nextAction})]},l.id))]})}var Zd={startConversation:"\u5F00\u59CB\u5BF9\u8BDD",endConversation:"\u7ED3\u675F\u5BF9\u8BDD",voiceTarget:"\u6295\u9012\u5230",dedicatedVoiceTarget:"\u9C7C\u5E94\u4E13\u7528\u4F1A\u8BDD",checkingVoiceTarget:"\u6B63\u5728\u6838\u5BF9\u76EE\u6807\u2026",voiceTargetChanged:"\u8BED\u97F3\u6295\u9012\u76EE\u6807\u6709\u53D8\u5316\u3002\u8BF7\u6838\u5BF9\u9996\u9875\u7684\u4F1A\u8BDD\u540E\u518D\u5F00\u59CB\u3002",chooseCurrentDshTarget:"\u4F7F\u7528\u5F53\u524D\u6253\u5F00\u4F1A\u8BDD",backToFishVoice:"\u56DE\u5230\u9C7C\u5E94",currentDshTargetError:"\u65E0\u6CD5\u786E\u8BA4\u5F53\u524D DSH \u5BF9\u8BDD\uFF0C\u8BF7\u6838\u5BF9\u540E\u91CD\u8BD5\u3002",chooseVoiceTarget:"\u9009\u62E9\u6295\u9012\u4F1A\u8BDD",searchVoiceTargets:"\u641C\u7D22\u4F1A\u8BDD\u6807\u9898\u6216 ID",searchVoiceTargetsAction:"\u641C\u7D22",existingVoiceTargetList:"\u5DF2\u6709 DSH \u4F1A\u8BDD",boundVoiceTarget:"\u5F53\u524D\u7ED1\u5B9A",voiceTargetAvailability_ready:"\u53EF\u7528",voiceTargetAvailability_busy:"\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F",voiceTargetAvailability_archived:"\u4F1A\u8BDD\u5DF2\u5F52\u6863",voiceTargetAvailability_unavailable:"\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528",voiceTargetAvailability_managed:"\u9C7C\u5E94\u7BA1\u7406\u7684\u4F1A\u8BDD\uFF0C\u65E0\u6CD5\u76F4\u63A5\u6295\u9012",voiceTargetAvailability_subagent:"\u5B50\u4EE3\u7406\u4F1A\u8BDD\uFF0C\u65E0\u6CD5\u76F4\u63A5\u6295\u9012",voiceTargetNoMatch:"\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684\u4F1A\u8BDD\u3002",voiceTargetEmptyList:"\u6682\u65E0\u53EF\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u3002",voiceTargetSynthesisNotice:"\u4F7F\u7528\u5728\u7EBF\u97F3\u8272\u65F6\uFF0C\u56DE\u7B54\u6587\u5B57\u4F1A\u4EA4\u7ED9\u5DF2\u6388\u6743\u7684\u8BED\u97F3\u5408\u6210\u670D\u52A1\u3002\u82E5\u8981\u79BB\u7EBF\u6717\u8BFB\uFF0C\u53EF\u5728\u300C\u6A21\u578B \u2192 \u6717\u8BFB\u65B9\u5F0F\u300D\u9009\u7528\u672C\u5730\u97F3\u8272\u3002",bindVoiceTarget:"\u7ED1\u5B9A\u9009\u4E2D\u4F1A\u8BDD",savingVoiceTarget:"\u6B63\u5728\u4FDD\u5B58\u2026",moreVoiceTargets:"\u52A0\u8F7D\u66F4\u591A",loadingVoiceTargets:"\u6B63\u5728\u8BFB\u53D6 DSH \u4F1A\u8BDD\u2026",voiceTargetListError:"\u65E0\u6CD5\u8BFB\u53D6 DSH \u4F1A\u8BDD\u3002",retryVoiceTargets:"\u91CD\u8BD5\u8BFB\u53D6",retryTranscripts:"\u5F85\u91CD\u53D1\u7684\u8BED\u97F3",retryTranscript:"\u91CD\u53D1",retryTranscriptBusy:"\u7B49\u5F85\u53EF\u53D1\u9001",retryTranscriptSending:"\u6B63\u5728\u91CD\u53D1\u2026",retryTranscriptUncertain:"\u53D1\u9001\u7ED3\u679C\u5F85\u786E\u8BA4\uFF0C\u8BF7\u67E5\u770B\u539F\u4F1A\u8BDD\u3002",endDiscardsRetries:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u6E05\u7A7A\u5F85\u53D1\u8F6C\u5199",modeSwitching:"\u6B63\u5728\u5207\u6362\u8BF4\u8BDD\u65B9\u5F0F\u2026",modeSaving:"\u6B63\u5728\u4FDD\u5B58\u8BF4\u8BDD\u65B9\u5F0F\u2026",modeSwitchUnconfirmed:"\u8BF4\u8BDD\u65B9\u5F0F\u66F4\u6539\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u6838\u67E5\u3002",modeSwitchFailed:"\u672A\u80FD\u786E\u8BA4\u66F4\u6539\uFF0C\u8BF7\u67E5\u770B\u5F53\u524D\u65B9\u5F0F\u540E\u518D\u8BD5\u3002",updateTitle:"\u9C7C\u5E94\u66F4\u65B0",updateOfferTitle:"\u9C7C\u5E94\u6709\u65B0\u7248\u672C",updateCurrentVersion:"\u5F53\u524D",updateNewVersion:"\u65B0\u7248",updateChannel_stable:"\u6B63\u5F0F\u7248",updateChannel_preview:"\u9884\u89C8\u7248",updateCheck:"\u68C0\u67E5\u66F4\u65B0",updateDetails:"\u67E5\u770B\u66F4\u65B0",updateLater:"\u7A0D\u540E",updateInstall:"\u4E00\u952E\u66F4\u65B0",updateRelease:"\u53D1\u5E03\u8BF4\u660E",updateFeedback:"\u53CD\u9988\u95EE\u9898",update_idle:"\u6B63\u5728\u8BFB\u53D6\u66F4\u65B0\u72B6\u6001\u2026",update_checking:"\u6B63\u5728\u68C0\u67E5\u66F4\u65B0\u2026",update_current:"\u5DF2\u662F\u6700\u65B0\u7248\u672C\u3002",update_available:"\u53EF\u4EE5\u66F4\u65B0\u3002",update_incompatible:"\u65B0\u7248\u4E0E\u5F53\u524D DSH \u73AF\u5883\u4E0D\u517C\u5BB9\u3002",update_installing:"\u6B63\u5728\u66F4\u65B0\uFF0C\u5BBF\u4E3B\u53EF\u80FD\u4F1A\u91CD\u65B0\u52A0\u8F7D\u9C7C\u5E94\u2026","update_restart-required":"\u66F4\u65B0\u5DF2\u5B89\u88C5\uFF0C\u91CD\u542F DSH \u540E\u751F\u6548\u3002","update_enable-required":"\u66F4\u65B0\u5DF2\u5B89\u88C5\uFF0C\u8BF7\u5728 DSH \u63D2\u4EF6\u7BA1\u7406\u4E2D\u542F\u7528\u9C7C\u5E94\u3002",update_installed:"\u66F4\u65B0\u5DF2\u5B8C\u6210\u3002",update_error:"\u66F4\u65B0\u51FA\u9519\uFF0C\u53EF\u68C0\u67E5\u66F4\u65B0\u540E\u91CD\u8BD5\u3002",update_unsupported:"\u5F53\u524D\u73AF\u5883\u65E0\u6CD5\u81EA\u52A8\u66F4\u65B0\uFF0C\u8BF7\u67E5\u770B\u5B98\u65B9\u53D1\u5E03\u8BF4\u660E\u3002",updateConnection:"\u6682\u65F6\u65E0\u6CD5\u786E\u8BA4\u66F4\u65B0\u72B6\u6001\uFF0C\u8BF7\u5728\u5BBF\u4E3B\u5C31\u7EEA\u540E\u91CD\u65B0\u68C0\u67E5\u3002",audioDevices:"\u97F3\u9891\u8BBE\u5907",audioSystemDefault:"\u7CFB\u7EDF\u9ED8\u8BA4",audioInput:"\u97F3\u9891\u8F93\u5165",audioOutput:"\u97F3\u9891\u8F93\u51FA",inputDeviceMissing:"\u9EA6\u514B\u98CE\u672A\u8FDE\u63A5\uFF0C\u5DF2\u4FDD\u7559\u9009\u62E9",outputDeviceMissing:"\u8F93\u51FA\u672A\u8FDE\u63A5\uFF0C\u4E0D\u4F1A\u5207\u5230\u5176\u4ED6\u8BBE\u5907",deviceDisconnected:"\u672A\u8FDE\u63A5",inputDeviceStopFirst:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5207\u6362\u8F93\u5165\u3002\u8F93\u51FA\u5728\u4E0B\u4E00\u6BB5\u64AD\u653E\u751F\u6548\u3002",outputDeviceUnsupported:"\u6B64\u73AF\u5883\u6682\u4E0D\u652F\u6301\u9009\u62E9\u6717\u8BFB\u8F93\u51FA\u8BBE\u5907\u3002",deviceListRetry:"\u8BBE\u5907\u5217\u8868\u6682\u4E0D\u53EF\u7528\uFF0C\u6253\u5F00\u4E0B\u62C9\u83DC\u5355\u53EF\u91CD\u8BD5\u3002",voiceHelperCleanupHint:"\u6B63\u5728\u786E\u8BA4\u9EA6\u514B\u98CE\u5DF2\u91CA\u653E\uFF0C\u786E\u8BA4\u524D\u4E0D\u4F1A\u5F00\u542F\u65B0\u7684\u5F55\u97F3\u3002",voiceHelperRestartHint:"\u9EA6\u514B\u98CE\u670D\u52A1\u9000\u51FA\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u91CD\u542F DSH \u540E\u518D\u70B9\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u3002",inputError_device:"\u9EA6\u514B\u98CE\u4E0D\u53EF\u7528",inputError_recognition:"\u8BED\u97F3\u8BC6\u522B\u5931\u8D25","inputError_no-speech":"\u6CA1\u542C\u6E05\uFF0C\u8BF7\u518D\u8BF4\u4E00\u6B21",inputHelp_device:"\u8BF7\u68C0\u67E5\u9EA6\u514B\u98CE\u8FDE\u63A5\u4E0E\u6743\u9650\u3002\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5728\u8BBE\u7F6E\u4E2D\u9009\u8BBE\u5907\u3002\u8BE6\u60C5\u89C1\u300C\u9AD8\u7EA7\u300D\u3002",inputDiagnosticTitle:"\u6700\u8FD1\u4E00\u6B21\u97F3\u9891\u9519\u8BEF",inputDiagnosticHistory:"\u8FD9\u662F\u6700\u8FD1\u4E00\u6B21\u8BB0\u5F55\uFF0C\u53EF\u80FD\u6765\u81EA\u4E4B\u524D\u7684\u5C1D\u8BD5\uFF1B\u4E0D\u4EE3\u8868\u5F53\u524D\u8BBE\u5907\u72B6\u6001\u3002",inputHelp_recognition:"\u8BF7\u91CD\u8BD5\u3002\u4ECD\u5931\u8D25\u65F6\uFF0C\u7ED3\u675F\u5BF9\u8BDD\u540E\u5728\u8BBE\u7F6E\u4E2D\u68C0\u67E5\u8BC6\u522B\u6A21\u578B\u3002","inputHelp_no-speech":"\u8BF7\u9760\u8FD1\u9EA6\u514B\u98CE\u91CD\u8BD5\uFF0C\u5E76\u68C0\u67E5\u662F\u5426\u9759\u97F3\u3002",speechFailed:"\u6717\u8BFB\u5931\u8D25",speechInterrupted:"\u6717\u8BFB\u5DF2\u4E2D\u65AD",wakeFallbackHint:"\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\u3002\u76EE\u524D\u6309\u8F6C\u5199\u5339\u914D\u3002\u5207\u6362\u6A21\u5F0F\u540E\u518D\u9009\u300C\u5524\u9192\u8BCD\u300D\u53EF\u91CD\u8BD5\u58F0\u97F3\u5339\u914D\u3002",wakeMode:"\u5524\u9192\u8BCD",switchToWake:"\u70B9\u6309\u5207\u5230\u5524\u9192\u8BCD\u6A21\u5F0F\uFF0C\u9EA6\u514B\u98CE\u5C06\u7B49\u5F85\u8BBE\u5B9A\u79F0\u547C",wakeDisabled:"\u5524\u9192\u76D1\u542C\u672A\u5F00\u542F",wakeStarting:"\u6B63\u5728\u542F\u52A8\u5524\u9192\u76D1\u542C\u2026",wakeWaiting:"\u7B49\u5F85\u5524\u9192\u8BCD",wakeListening:"\u6B63\u5728\u542C\u4E0B\u4E00\u53E5",wakePaused:"\u5524\u9192\u76D1\u542C\u5DF2\u6682\u505C",wakeError:"\u5524\u9192\u76D1\u542C\u4E0D\u53EF\u7528\uFF0C\u8BF7\u67E5\u770B\u8BBE\u7F6E",wakeHint:"\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\uFF0C\u518D\u8BF4\u6307\u4EE4\u3002\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u76D1\u542C\u3002",wakeMethod:"\u77ED\u53E5\u7ED3\u675F\u540E\u5728\u672C\u673A\u6BD4\u8F83\u79F0\u547C\u7684\u58F0\u97F3\u548C\u8F6C\u5199\u3002",wakeAliases:"\u5524\u9192\u79F0\u547C",wakeAliasesHint:"\u6700\u591A8\u4E2A\uFF0C\u9017\u53F7\u5206\u9694\uFF1B\u4E2D\u6587\u652F\u6301\u53E5\u9996\u8FD1\u97F3\uFF0C\u5EFA\u8BAE\u7528\u72EC\u7279\u76843\u5B57\u4EE5\u4E0A\u79F0\u547C\u3002",wakeTimeout:"\u5524\u9192\u540E\u7B49\u5F85\uFF08\u79D2\uFF09",wakeSettings:"\u5524\u9192\u8BCD\u8BBE\u7F6E",wakeStopToEdit:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u79F0\u547C\u548C\u7B49\u5F85\u65F6\u95F4\u3002",wakeInvalid:"\u8BF7\u586B1\u20138\u4E2A\u6709\u6548\u79F0\u547C\uFF0C\u7B49\u5F85\u65F6\u95F4\u4E3A3\u201330\u79D2\u3002",switchToPtt:"\u70B9\u6309\u5207\u56DE\u6309\u4F4F\u8BF4\u8BDD",switchToAlways:"\u70B9\u6309\u5207\u5230\u81EA\u7531\u9EA6\uFF0C\u9EA6\u514B\u98CE\u5C06\u6301\u7EED\u8046\u542C",quickSpeedStop:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5207\u6362\u901F\u5EA6",performanceReadFirst:"\u5148\u68C0\u67E5\u5F53\u524D\u6A21\u578B\u652F\u6301\u54EA\u4E9B\u901F\u5EA6\u3002",performanceUnavailable:"\u63D0\u4F9B\u5546\u5DF2\u660E\u786E\u62D2\u7EDD\u7070\u8272\u6863\u4F4D\u7684\u601D\u8003\u53C2\u6570\uFF1B\u5176\u4ED6\u6863\u4F4D\u4ECD\u53EF\u9009\u62E9\u3002",performanceProbeCost:"\u52A0\u8F7D\u65F6\u7528\u6700\u591A 3 \u4E2A\u56FA\u5B9A\u77ED\u8BF7\u6C42\u68C0\u6D4B\u6863\u4F4D\uFF0C\u6309\u6A21\u578B\u8BA1\u8D39\u3002",performanceProbeScope:"\u53EA\u6709\u63D0\u4F9B\u53EF\u68C0\u6D4B\u63A5\u53E3\u7684\u6A21\u578B\u8DEF\u7EBF\u4F1A\u53D1\u9001\u77ED\u8BF7\u6C42\uFF0C\u539F\u751F\u652F\u6301\u7684\u6863\u4F4D\u53EF\u76F4\u63A5\u67E5\u770B\u3002",performanceProbeUnknown:"\u90E8\u5206\u6863\u4F4D\u6682\u672A\u786E\u8BA4\u3002\u53EF\u68C0\u67E5\u7F51\u7EDC\u6216\u767B\u5F55\u540E\u91CD\u65B0\u68C0\u6D4B\u3002",performanceProbeAccepted:"\u6863\u4F4D\u8BF7\u6C42\u68C0\u6D4B\u901A\u8FC7\u3002",performanceProbePending:"\u6B63\u5728\u68C0\u67E5\u5F53\u524D\u6A21\u578B\u7684\u6863\u4F4D\u2026",holdToSpeak:"\u8BF4\u8BDD\u65F6\u6309\u4F4F",alwaysWarning:"\u81EA\u7531\u9EA6\u4F1A\u6301\u7EED\u542C\u53D6\u8BED\u97F3\u3002\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u76D1\u542C\u3002",bindingMissing:"\u672A\u7ED1\u5B9A\u8BF4\u8BDD\u6309\u952E\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u4E2D\u7ED1\u5B9A\uFF0C\u6216\u5207\u6362\u6301\u7EED\u8046\u542C\u3002",noSession:"\u8FD8\u6CA1\u6709\u6253\u5F00\u5BF9\u8BDD",otherWindow:"\u9EA6\u514B\u98CE\uFF1A\u53E6\u4E00\u4E2A\u7A97\u53E3",readingStatus:"\u6B63\u5728\u8BFB\u53D6\uFF0C\u4E0D\u4F1A\u542F\u52A8\u9EA6\u514B\u98CE\u6216\u6A21\u578B\u3002",statusRetry:"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u72B6\u6001\u3002\u8FD4\u56DE\u7A97\u53E3\u65F6\u4F1A\u81EA\u52A8\u6838\u67E5\u3002",retryStatus:"\u91CD\u65B0\u8BFB\u53D6\u72B6\u6001",collapseHint:"\u6536\u8D77\u540E\u4F1A\u7EE7\u7EED\u5BF9\u8BDD",stopConsequence:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u91CA\u653E\u9EA6\u514B\u98CE\u5E76\u505C\u6B62\u672C\u6B21\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u3002",transferTitle:"\u63A5\u7BA1\u53E6\u4E00\u4E2A\u7A97\u53E3\u7684\u9EA6\u514B\u98CE\uFF1F",transferWarning:"\u8FD9\u4F1A\u4E2D\u65AD\u53E6\u4E00\u4E2A\u7A97\u53E3\u7684\u8BED\u97F3\uFF0C\u5E76\u53EF\u80FD\u7ED3\u675F\u5B83\u7684\u540E\u53F0\u4EFB\u52A1\u3002",cancel:"\u53D6\u6D88",confirmTransfer:"\u786E\u8BA4\u63A5\u7BA1",bindingStopRequired:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u9F20\u6807\u6216\u952E\u76D8\u6309\u952E\u3002",bindingFinishing:"\u8BED\u97F3\u6B63\u5728\u505C\u6B62\uFF0C\u8BF7\u7A0D\u5019\u518D\u4FEE\u6539\u6309\u952E\u3002",headphonesRequired:"\u5148\u52FE\u9009\u201C\u6211\u5DF2\u4F7F\u7528\u8033\u673A\u201D\uFF0C\u624D\u80FD\u5F00\u542F\u81EA\u52A8\u6253\u65AD\u3002",deviceManualIndex:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u5E8F\u53F7",deviceManualName:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u540D\u79F0",deviceIndexInvalid:"\u8BBE\u5907\u5E8F\u53F7\u9700\u8981\u662F\u975E\u8D1F\u6574\u6570\u3002",deviceDefault:"\u4F7F\u7528\u7CFB\u7EDF\u9ED8\u8BA4\u9EA6\u514B\u98CE",deviceManual:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u540D\u79F0\u6216\u5E8F\u53F7",deviceSaved:"\u5DF2\u4FDD\u5B58\u7684\u8BBE\u5907",deviceEmpty:"\u97F3\u9891\u670D\u52A1\u6CA1\u6709\u627E\u5230\u9EA6\u514B\u98CE\u3002\u8BF7\u8FDE\u63A5\u8BBE\u5907\u5E76\u68C0\u67E5\u7CFB\u7EDF\u58F0\u97F3\u8BBE\u7F6E\u3002",deviceUnknown:"\u5F00\u59CB\u5BF9\u8BDD\u540E\u4F1A\u5217\u51FA\u68C0\u6D4B\u5230\u7684\u8BBE\u5907\u3002\u73B0\u5728\u53EF\u4F7F\u7528\u7CFB\u7EDF\u9ED8\u8BA4\uFF0C\u6216\u5728\u9AD8\u7EA7\u9009\u9879\u624B\u52A8\u586B\u5199\u3002",ttsBackend:"\u8BED\u97F3\u5408\u6210\u540E\u7AEF",ttsBackendHint:"\u58F0\u97F3\u7531\u5DF2\u5B89\u88C5\u7684 TTS \u540E\u7AEF\u63D0\u4F9B\uFF0C\u9700\u5728\u8BE5\u540E\u7AEF\u5B8C\u6210\u914D\u7F6E\u3002\u72EC\u7ACB\u97F3\u91CF\u4EC5\u5728\u9A8C\u8BC1\u652F\u6301\u65F6\u663E\u793A\u3002",ttsBackendPending:"\u66F4\u591A\u540E\u7AEF\u9009\u62E9\u6B63\u5728\u9002\u914D\uFF0C\u5F53\u524D\u4E0D\u4F1A\u81EA\u52A8\u63A5\u5165\u4E91\u670D\u52A1\u3002",voiceClone:"\u58F0\u97F3\u514B\u9686",voiceCloneAvailable:"Qwen \u652F\u6301\u672C\u5730\u53C2\u8003\u97F3\u8272\uFF0C\u53EF\u5728\u6717\u8BFB\u65B9\u5F0F\u7684\u97F3\u8272\u8BBE\u7F6E\u4E2D\u9009\u62E9 WAV\u3002",voiceClonePrivacy:"\u4EC5\u8BFB\u53D6\u4F60\u9009\u62E9\u4E14\u6709\u6743\u4F7F\u7528\u7684\u58F0\u97F3\u6837\u672C\uFF0C\u4E0D\u4E0A\u4F20\u3002",inputActive:"\u6B63\u5728\u63A5\u6536\u8BED\u97F3",modeUnknown:"\u542C\u53D6\u65B9\u5F0F\u672A\u77E5",voiceInputUnavailable:"\u5F55\u97F3\u6682\u4E0D\u53EF\u7528",voiceInputRecoveryHint:"\u8BED\u97F3\u670D\u52A1\u5DF2\u4E2D\u65AD\u3002\u8BF7\u7ED3\u675F\u5BF9\u8BDD\u540E\u91CD\u65B0\u5F00\u59CB\u3002",searchHistory:"\u641C\u7D22\u4F1A\u8BDD",searchScope:"\u641C\u7D22\u5DF2\u8F7D\u5165\u7684\u4F1A\u8BDD",noMatches:"\u6CA1\u6709\u5339\u914D\u7684\u4F1A\u8BDD",differentOwner:"\u9EA6\u514B\u98CE\u5728\u53E6\u4E00\u4E2A\u7A97\u53E3\u4F7F\u7528\u3002\u9700\u8981\u65F6\u53EF\u660E\u786E\u63A5\u7BA1\u3002",details:"\u8BCA\u65AD\u8BE6\u60C5",noReply:"\u8FD8\u6CA1\u6709\u5BF9\u8BDD",newChatCreated:"\u5DF2\u65B0\u5EFA\u4F1A\u8BDD",newChatActive:"\u65B0\u5EFA\u8BED\u97F3\u4F1A\u8BDD\u3002\u5F53\u524D\u4F1A\u8BDD\u7684\u540E\u53F0\u4EFB\u52A1\u4F1A\u505C\u6B62\uFF0C\u8BB0\u5F55\u4F1A\u4FDD\u7559\u3002",newChatOtherOwner:"\u8BF7\u5728\u5F53\u524D\u8BED\u97F3\u4F1A\u8BDD\u6216\u5F00\u542F\u9EA6\u514B\u98CE\u7684\u7A97\u53E3\u4E2D\u65B0\u5EFA\u3002",recentConversation:"\u5BF9\u8BDD",recentTenTurns:"\u6700\u8FD1 10 \u8F6E",allRecords:"\u5168\u90E8\u8BB0\u5F55",showAllRecords:"\u5C55\u5F00\u5168\u90E8",collapseToTen:"\u6536\u8D77\u81F3 10 \u8F6E",collapseConversation:"\u6536\u8D77\u5BF9\u8BDD",currentVoiceRecords:"\u5F53\u524D\u8BED\u97F3\u804A\u5929",historyTruncated:"\u5DF2\u5207\u6362\u663E\u793A\u533A\u95F4\uFF0C\u539F\u8BB0\u5F55\u4ECD\u4FDD\u7559",viewConversation:"\u67E5\u770B\u8BED\u97F3\u8BB0\u5F55",loadEarlier:"\u52A0\u8F7D\u66F4\u65E9\u8BB0\u5F55",readingHistory:"\u6B63\u5728\u8BFB\u53D6\u8BB0\u5F55\u2026",retryHistory:"\u8BFB\u53D6\u8BB0\u5F55\u5931\u8D25\uFF0C\u70B9\u51FB\u91CD\u8BD5",noConversation:"\u8FD8\u6CA1\u6709\u5BF9\u8BDD",newMessages:"\u6761\u65B0\u6D88\u606F",conversationMessages:"\u8BED\u97F3\u5BF9\u8BDD\u8BB0\u5F55",assistantName:"\u52A9\u624B\u79F0\u547C",renameAssistant:"\u70B9\u51FB\u6539\u540D\uFF0CEnter \u4FDD\u5B58\uFF0CEsc \u53D6\u6D88",compact_off:"\u672A\u5F00\u542F",compact_standby:"\u5F85\u673A",compact_listening:"\u8046\u542C\u4E2D",compact_pending:"\u5904\u7406\u4E2D",compact_unknown:"\u5F85\u68C0\u67E5",you:"\u4F60",assistant:"\u52A9\u624B",close:"\u5173\u95ED\u9762\u677F",keyboardBinding:"\u952E\u76D8\u6309\u4F4F\u8BF4\u8BDD",bindingOff:"\u672A\u7ED1\u5B9A",saveBindings:"\u4FDD\u5B58\u6309\u952E",discardBindings:"\u53D6\u6D88\u4FEE\u6539",bindingCapture:"\u6309\u4E0B\u8981\u7ED1\u5B9A\u7684\u952E\uFF08Esc \u53D6\u6D88\uFF09",clearBinding:"\u6E05\u9664\u7ED1\u5B9A",bindingUnsupported:"\u4E0D\u652F\u6301\u8BE5\u6309\u952E\u6216\u7CFB\u7EDF\u7EC4\u5408\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u3002",bindingGlobalHint:"Windows \u5168\u5C40\u5FEB\u6377\u952E\u3002\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5F55\u5165\uFF0C\u4FDD\u5B58\u540E\u4E0B\u6B21\u5F00\u59CB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002\u6309\u952E\u4E0D\u4F1A\u88AB\u62E6\u622A\uFF0C\u53EF\u80FD\u540C\u65F6\u89E6\u53D1\u5176\u4ED6\u5E94\u7528\u7684\u5FEB\u6377\u64CD\u4F5C\u3002",bindingUnavailable:"\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301\u5168\u5C40\u6309\u952E\u7ED1\u5B9A\u3002",bindingPrintableWarning:"\u5355\u72EC\u4F7F\u7528\u6587\u5B57\u3001\u6570\u5B57\u6216\u7A7A\u683C\u952E\u4F1A\u5728\u5176\u4ED6\u5E94\u7528\u8F93\u5165\u65F6\u89E6\u53D1\u6309\u952E\u8BF4\u8BDD\u3002",performanceTitle:"\u56DE\u7B54\u901F\u5EA6",performanceHint:"\u4E0B\u6B21\u5F00\u59CB\u9C7C\u5E94\u72EC\u7ACB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002\u7ED1\u5B9A\u539F\u4F1A\u8BDD\u65F6\uFF0C\u5728\u8BE5 DSH \u5BF9\u8BDD\u7684\u6A21\u578B\u83DC\u5355\u91CC\u8C03\u6574\u601D\u8003\u6863\u4F4D\u3002",inspectPerformance:"\u68C0\u67E5\u53EF\u7528\u901F\u5EA6",performance_fast:"\u5FEB",performanceNoThinking:"\u65E0\u601D\u8003",performanceRecommended:"[\u63A8\u8350]",performanceFastHint:"\u5FEB\u6863\u4F1A\u660E\u786E\u8BF7\u6C42\u5173\u95ED\u601D\u8003\u3002",performanceFastUnavailable:"\u5F53\u524D\u6A21\u578B\u8DEF\u7EBF\u65E0\u6CD5\u786E\u8BA4\u5173\u95ED\u601D\u8003\u3002\u53EF\u9009\u300C\u8DDF\u968F\u6A21\u578B\u300D\uFF0C\u6216\u5728\u6A21\u578B\u8BBE\u7F6E\u4E2D\u66F4\u6362\u652F\u6301\u65E0\u601D\u8003\u7684\u5BF9\u8BDD\u6A21\u578B\u3002",performanceHostUnavailable:"\u5F53\u524D\u6A21\u578B\u8DEF\u7EBF\u672A\u63D0\u4F9B\u90E8\u5206\u601D\u8003\u6863\u4F4D\u3002",performance_balanced:"\u6807\u51C6",performance_high:"\u4ED4\u7EC6",performance_compatibility:"\u8DDF\u968F\u6A21\u578B",performanceStopRequired:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u56DE\u7B54\u901F\u5EA6\u3002\u5F53\u524D\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u4F1A\u505C\u6B62\u3002",savePerformance:"\u4FDD\u5B58\u56DE\u7B54\u901F\u5EA6",outputVolume:"\u52A9\u624B\u8BED\u97F3\u97F3\u91CF",outputVolumeHint:"\u4EC5\u8C03\u6574\u5DF2\u5B89\u88C5\u7684 Windows dsh-speak \u540E\u7AEF\uFF0C\u4E0D\u4EE3\u8868\u5F53\u524D\u8BED\u97F3\u8DEF\u7531\u6B63\u5728\u4F7F\u7528\u5B83\uFF1B\u4E0D\u5F71\u54CD DSTuber\u3001\u7CFB\u7EDF\u603B\u97F3\u91CF\u6216\u63D0\u793A\u97F3\u3002\u4E0B\u4E00\u6BB5\u8F93\u51FA\u751F\u6548\u3002",readOutputVolume:"\u8BFB\u53D6\u8BED\u97F3\u97F3\u91CF",saveOutputVolume:"\u4FDD\u5B58\u8BED\u97F3\u97F3\u91CF",outputVolumeUnavailable:"\u5F53\u524D\u8BED\u97F3\u540E\u7AEF\u4E0D\u652F\u6301\u72EC\u7ACB\u97F3\u91CF\u8C03\u8282\u3002",outputVolumeUnknown:"\u97F3\u91CF\u4FDD\u5B58\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u4F1A\u81EA\u52A8\u6838\u67E5\uFF0C\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002",settingsTitle:"\u9C7C\u5E94\u8BBE\u7F6E",settingsSections:"\u8BBE\u7F6E\u5206\u7C7B",tab_audio:"\u97F3\u9891",tab_interaction:"\u4EA4\u4E92",tab_prompt:"\u63D0\u793A\u8BCD",voicePromptLabel:"\u81EA\u5B9A\u4E49\u63D0\u793A\u8BCD",voicePromptOptional:"\uFF08\u53EF\u9009\uFF09",voicePromptAgents:"\u8DDF\u968F AGENTS",voicePromptCustom:"\u5DF2\u9644\u52A0\u81EA\u5B9A\u4E49",voicePromptPlaceholder:`\u4F8B\u5982\uFF1A\u7528\u4E2D\u6587\u56DE\u590D\uFF0C\u5148\u8BF4\u7ED3\u8BBA\uFF0C\u8BED\u6C14\u81EA\u7136\u3002

\u5185\u5BB9\u4F1A\u9644\u52A0\u5728 AGENTS \u540E\u3002\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u8BBE\u7F6E\u3002`,voicePromptStopToEdit:"\u505C\u6B62\u8BED\u97F3\u540E\u53EF\u7F16\u8F91",voicePromptUnsupported:"\u5F53\u524D DSH \u6682\u4E0D\u652F\u6301\u81EA\u5B9A\u4E49\u63D0\u793A\u8BCD\u3002",voicePromptTooLong:"\u63D0\u793A\u8BCD\u4E0D\u80FD\u8D85\u8FC7 32,768 \u4E2A\u5B57\u7B26\u3002",voicePromptSaving:"\u4FDD\u5B58\u4E2D\u2026",voicePromptCancel:"\u53D6\u6D88\u4FEE\u6539",voicePromptSave:"\u4FDD\u5B58",voicePromptSaved:"\u5DF2\u4FDD\u5B58\uFF0C\u4E0B\u6B21\u5F00\u542F\u8BED\u97F3\u65F6\u751F\u6548\u3002",voicePromptSaveFailed:"\u4FDD\u5B58\u672A\u6210\u529F\uFF0C\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002",voicePromptUnsaved:"\u5C1A\u672A\u4FDD\u5B58",tab_models:"\u6A21\u578B",tab_advanced:"\u9AD8\u7EA7",projectInfoTitle:"\u5173\u4E8E\u9C7C\u5E94",projectAuthor:"\u4F5C\u8005",projectRepository:"\u5B98\u65B9\u4ED3\u5E93",projectNpm:"npm \u53D1\u5E03\u9875",tab_sessions:"\u4F1A\u8BDD\u7BA1\u7406",settingsContent:"\u8BBE\u7F6E\u5185\u5BB9",voiceCleanupPending:"\u6B63\u5728\u91CA\u653E\u65E7\u97F3\u9891\u670D\u52A1",voiceCleanupHint:"\u7B49\u5F85\u65E7\u4F1A\u8BDD\u548C\u5F55\u97F3\u9000\u51FA\uFF0C\u5B8C\u6210\u540E\u4F1A\u81EA\u52A8\u66F4\u65B0\u3002",voiceRestartPending:"\u9700\u8981\u91CD\u542F DSH",voiceRestartHint:"\u65E7\u7248\u97F3\u9891\u670D\u52A1\u7684\u9000\u51FA\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u91CD\u542F DSH \u540E\u518D\u70B9\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u3002\u5DF2\u4FDD\u5B58\u7684\u6388\u6743\u4E0D\u53D8\u3002",voiceRecoveryPending:"\u65E7\u8BED\u97F3\u4F1A\u8BDD\u5C1A\u672A\u9000\u51FA",voiceRecoveryCheck:"\u6838\u67E5\u5E76\u505C\u6B62",voiceRecoveryHint:"\u65E7\u5B9E\u4F8B\u4ECD\u5728\u9000\u51FA\uFF0C\u8BF7\u5148\u6838\u67E5\u505C\u6B62\u3002\u82E5\u4E00\u76F4\u672A\u9000\u51FA\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F DSH \u540E\u518D\u70B9\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u3002",operationUnavailable:"\u64CD\u4F5C\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\uFF1B\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002\u8BE6\u60C5\u89C1\u9AD8\u7EA7\u8BBE\u7F6E\u3002",enableFailed:"\u65E0\u6CD5\u5F00\u59CB\u5BF9\u8BDD\u3002\u8BF7\u5728\u8BBE\u7F6E\u7684\u300C\u9AD8\u7EA7\u300D\u67E5\u770B\u539F\u56E0\u540E\u91CD\u8BD5\u3002",tab_pets:"\u684C\u5BA0",planned:"\u8BA1\u5212\u5F00\u53D1\u4E2D",configurationUnknown:"\u914D\u7F6E\u4FDD\u5B58\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\uFF1B\u6838\u5B9E\u524D\u4E0D\u80FD\u7EE7\u7EED\u4FEE\u6539\u3002",motionTitle:"\u754C\u9762\u52A8\u753B",motion_spring:"Q \u5F39",motion_firm:"\u786C\u6717",motion_off:"\u5173\u95ED\u52A8\u753B",motionHint:"\u7ACB\u5373\u9884\u89C8\u5E76\u4FDD\u5B58\uFF1B\u64CD\u4F5C\u4E0D\u7B49\u5F85\u52A8\u753B\u3002\u7CFB\u7EDF\u51CF\u5C11\u52A8\u6001\u6548\u679C\u4F18\u5148\u3002",motionNotSaved:"\u672C\u6B21\u9884\u89C8\u5DF2\u5E94\u7528\uFF0C\u4F46\u6B64\u6D4F\u89C8\u5668\u65E0\u6CD5\u4FDD\u5B58\u52A8\u753B\u504F\u597D\u3002",modeControlPending:"\u8BED\u97F3\u63A7\u5236\u5C1A\u672A\u5B8C\u6210\u6216\u72B6\u6001\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\u3002",capabilityTitle:"\u5BF9\u8BDD\u5728\u4FA7\u680F\u4E2D\u7684\u663E\u793A",supported:"\u53EF\u7528",unsupported:"\u4E0D\u53EF\u7528\u6216\u5C1A\u672A\u786E\u8BA4",hiddenMode:"\u4E0D\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD",workspaceMode:"\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD",taskCapability:"\u540E\u53F0\u4EFB\u52A1\u652F\u6301",configuredMode:"\u5DF2\u4FDD\u5B58\u6A21\u5F0F",currentVoiceMode:"\u5F53\u524D\u5BF9\u8BDD\u7684\u5B9E\u9645\u6A21\u5F0F",noActiveVoice:"\u6CA1\u6709\u8FD0\u884C\u4E2D\u7684\u5BF9\u8BDD",chooseVisibility:"\u9009\u62E9\u663E\u793A\u6A21\u5F0F",workspaceWarning:"\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD\u4F1A\u628A\u5BF9\u8BDD\u663E\u793A\u5728\u666E\u901A\u5DE5\u4F5C\u533A\u4E2D\u3002\u9690\u85CF\u6A21\u5F0F\u4E0D\u53EF\u7528\u65F6\u4ECD\u4F1A\u62D2\u7EDD\u542F\u52A8\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u6539\u4E3A\u53EF\u89C1\u3002",visibilityNoMigration:"\u6B64\u8BBE\u7F6E\u7528\u4E8E\u540E\u7EED\u5BF9\u8BDD\uFF1B\u5DF2\u6709\u5BF9\u8BDD\u4FDD\u6301\u539F\u663E\u793A\u65B9\u5F0F\u3002",modeReadFirst:"\u6B63\u5728\u6838\u67E5\u5F53\u524D\u5BF9\u8BDD\u7684\u914D\u7F6E\u548C\u72B6\u6001\uFF0C\u786E\u8BA4\u540E\u53EF\u4FEE\u6539\u6A21\u5F0F\u3002",closeBeforeMode:"\u8BF7\u5148\u5173\u95ED\u8BED\u97F3\uFF0C\u786E\u8BA4\u5B8C\u5168\u505C\u6B62\u540E\u53EF\u4FEE\u6539\u663E\u793A\u6A21\u5F0F\u3002",saveWorkspace:"\u4FDD\u5B58\u5DE5\u4F5C\u533A\u53EF\u89C1\u6A21\u5F0F",saveHidden:"\u4FDD\u5B58\u9690\u85CF\u6A21\u5F0F",visibilityUnknownWrite:"\u663E\u793A\u6A21\u5F0F\u5199\u5165\u7ED3\u679C\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\u3002\u6838\u5B9E\u524D\u4E0D\u80FD\u7EE7\u7EED\u4FEE\u6539\uFF0C\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002",outputObservationUnavailable:"\u5C1A\u672A\u63A5\u5165\u771F\u5B9E\u64AD\u97F3\u5F00\u59CB\u4E8B\u4EF6\uFF0C\u65E0\u6CD5\u786E\u8BA4\u6B63\u5728\u64AD\u97F3",title:"\u9C7C\u5E94",description:"\u8BED\u97F3\u63A7\u5236\u3001\u97F3\u9891\u8BBE\u7F6E\u4E0E\u72EC\u7ACB\u5BF9\u8BDD\u3002",drag:"\u79FB\u52A8\u9C7C\u5E94\u60AC\u6D6E\u7A97",dragHint:"\u7528\u9F20\u6807\u62D6\u52A8\u7A7A\u767D\u533A\u57DF\u79FB\u52A8\uFF1B\u6309\u94AE\u548C\u8F93\u5165\u6846\u6B63\u5E38\u64CD\u4F5C",collapse:"\u6536\u8D77",reopen:"\u6253\u5F00\u9C7C\u5E94",refresh:"\u5237\u65B0\u72B6\u6001",settings:"\u8BBE\u7F6E",unknown:"\u6B63\u5728\u8BFB\u53D6\u72B6\u6001\u2026",enabled:"\u9EA6\u514B\u98CE\uFF1A\u5DF2\u5F00\u542F",disabled:"\u9EA6\u514B\u98CE\uFF1A\u672A\u5F00\u542F",identity:"\u5B8C\u6574\u4F1A\u8BDD\u6807\u8BC6",source:"\u6388\u6743\u6765\u6E90",actor:"\u64CD\u4F5C\u4F1A\u8BDD",none:"\u65E0",openSession:"\u5148\u5728 DSH \u4FA7\u680F\u65B0\u5EFA\u6216\u6253\u5F00\u4E00\u4E2A\u5BF9\u8BDD\uFF0C\u518D\u56DE\u5230\u9C7C\u5E94\u3002",enable:"\u5F00\u9EA6",transfer:"\u8BA9\u8FD9\u4E2A\u7A97\u53E3\u63A5\u7BA1\u9EA6\u514B\u98CE",disable:"\u5173\u9EA6",stale:"\u72B6\u6001\u6682\u65F6\u8BFB\u4E0D\u5230",snapshot:"\u4E0A\u6B21\u8BFB\u53D6\u7684\u72B6\u6001",consequence:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u672C\u6B21\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u3002\u6536\u8D77\u540E\u4F1A\u7EE7\u7EED\u5BF9\u8BDD\u3002",savedHint:"\u8BBE\u5907\u4E0E\u58F0\u7EB9\u8BBE\u7F6E\u5728\u4E0B\u6B21\u97F3\u9891\u64CD\u4F5C\u65F6\u751F\u6548",more:"\u66F4\u591A\u5BF9\u8BDD",historyOther:"\u5217\u8868\u6765\u81EA\u5176\u4ED6\u64CD\u4F5C\u4F1A\u8BDD\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6",helperOnline:"\u97F3\u9891\u670D\u52A1\u5728\u7EBF",helperOffline:"\u97F3\u9891\u670D\u52A1\u79BB\u7EBF",pending:"\u6B63\u5728\u5904\u7406\u2026",refreshHint:"\u53EA\u8BFB\u53D6\u72B6\u6001\uFF0C\u4E0D\u542F\u52A8\u9EA6\u514B\u98CE\u6216\u6A21\u578B",modelGuide:"\u9ED8\u8BA4 SenseVoice \u5728\u672C\u673A\u4F7F\u7528 CPU\u3002\u6A21\u578B\u6587\u4EF6\u548C\u8BB8\u53EF\u89C1 docs/model-setup.md\u3002",sensevoiceSource:"SenseVoice \u6765\u6E90",ttsSource:"\u5916\u90E8 TTS \u53C2\u8003",licenseNote:"SenseVoice \u8BB8\u53EF\u8BA8\u8BBA",modelTitle:"\u672C\u5730\u6A21\u578B",modelHint:"\u4FDD\u5B58\u5DF2\u6709 SenseVoice \u6216 CAM++ \u8DEF\u5F84\u3002\u6587\u4EF6\u5728\u4F7F\u7528\u524D\u6821\u9A8C\uFF0C\u58F0\u7EB9\u8FC7\u6EE4\u9700\u53E6\u884C\u5F00\u542F\u3002",asr:"\u8BED\u97F3\u8BC6\u522B",sensevoicePath:"SenseVoice \u672C\u5730\u76EE\u5F55",campplusPath:"CAM++ \u6587\u4EF6\uFF08\u53EF\u9009\uFF09",saveModels:"\u4FDD\u5B58\u6A21\u578B\u8DEF\u5F84",audioTitle:"\u97F3\u9891\u8BBE\u7F6E",soundTitle:"\u8F6E\u6B21\u63D0\u793A\u97F3",headphones:"\u6211\u5DF2\u4F7F\u7528\u8033\u673A",headphonesHint:"\u672A\u786E\u8BA4\u8033\u673A\u65F6\uFF0C\u4E3A\u907F\u514D\u5916\u653E\u56DE\u58F0\u4E0D\u64AD\u653E\u63D0\u793A\u97F3\uFF1B\u8FD9\u4E0D\u662F\u56DE\u58F0\u6D88\u9664\uFF0C\u4E5F\u4E0D\u4F1A\u88C1\u6389\u7528\u6237\u8BB2\u8BDD",automaticBargeIn:"\u542F\u7528\u5B9E\u9A8C\u6027\u81EA\u52A8\u6253\u65AD",stopRequested:"\u5DF2\u8BF7\u6C42\u505C\u6B62\u64AD\u653E\uFF0C\u5C1A\u672A\u786E\u8BA4",stopConfirmed:"\u5DF2\u786E\u8BA4\u505C\u6B62\u64AD\u653E",soundEnabled:"\u542F\u7528\u63D0\u793A\u97F3",soundVolume:"\u63D0\u793A\u97F3\u97F3\u91CF\uFF080\u20131\uFF09",soundUnavailable:"\u97F3\u6548\u6682\u672A\u63A5\u5165\uFF1B\u8FD9\u4E9B\u63A7\u4EF6\u4E0D\u4F1A\u5047\u88C5\u64AD\u653E",soundAvailable:"\u97F3\u6548\u5DF2\u63A5\u5165",mode:"\u8BF4\u8BDD\u65B9\u5F0F",alwaysOn:"\u5F00\u542F\u6301\u7EED\u8046\u542C\uFF08\u9EA6\u514B\u98CE\u5E38\u5F00\uFF09",alwaysOff:"\u5207\u56DE\u6309\u4F4F\u8BF4\u8BDD",modeUnavailable:"\u8BF4\u8BDD\u65B9\u5F0F\u63A7\u5236\u5C1A\u672A\u63A5\u5165",modeNeedsGrant:"\u8BF7\u5148\u8BFB\u53D6\u6700\u65B0\u72B6\u6001\u3002",pttMode:"\u6309\u952E\u8BF4\u8BDD",alwaysMode:"\u81EA\u7531\u9EA6",modeHint:"\u5F00\u59CB\u5BF9\u8BDD\u524D\u53EF\u9884\u9009\u8BF4\u8BDD\u65B9\u5F0F\u3002",readSettings:"\u8BFB\u53D6\u8BBE\u7F6E",device:"\u9EA6\u514B\u98CE\u8BBE\u5907",deviceHint:"\u8BBE\u5907\u540D\u79F0\u6765\u81EA\u97F3\u9891\u670D\u52A1\u7684\u6700\u8FD1\u8BFB\u53D6\u3002\u66F4\u6362\u8BBE\u5907\u540E\uFF0C\u5F00\u59CB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002",sideButton:"\u9F20\u6807\u6309\u4F4F\u8BF4\u8BDD",sideOff:"\u5173\u95ED",sideOne:"\u4FA7\u952E 1",sideTwo:"\u4FA7\u952E 2",speaker:"\u5B9E\u9A8C\u6027\u58F0\u7EB9\u8FC7\u6EE4",speakerHint:"\u6B64\u5F00\u5173\u53EA\u7528\u4E8E\u5DF2\u6709\u7684\u58F0\u7EB9\u914D\u7F6E\uFF1B\u5F53\u524D\u9762\u677F\u6CA1\u6709\u6CE8\u518C\u5165\u53E3\u3002",save:"\u4FDD\u5B58\u8BBE\u7F6E",saved:"\u8BBE\u7F6E\u5DF2\u4FDD\u5B58",historyTitle:"\u5BF9\u8BDD\u5386\u53F2",historyHint:"\u53EA\u663E\u793A\u9C7C\u5E94\u521B\u5EFA\u7684\u5BF9\u8BDD\uFF1B\u63A5\u7EED\u4E0D\u4F1A\u81EA\u52A8\u6062\u590D\u5DF2\u5F52\u6863\u804A\u5929",loadHistory:"\u8BFB\u53D6\u5BF9\u8BDD",newChat:"\u65B0\u4F1A\u8BDD",resume:"\u63A5\u7EED",active:"\u5F53\u524D",archived:"\u5DF2\u5F52\u6863",unavailable:"\u4E0D\u53EF\u7528",empty:"\u6682\u65E0\u53EF\u63A5\u7EED\u7684\u5BF9\u8BDD",noTitle:"\u5BF9\u8BDD",noResume:"\u5F53\u524D\u4E0D\u80FD\u63A5\u7EED",newHint:"\u65B0\u5EFA\u6216\u63A5\u7EED\u4F1A\u5207\u6362\u5F53\u524D\u8BED\u97F3\uFF0C\u64A4\u56DE\u65E7\u6388\u6743\uFF0C\u53EF\u80FD\u7ED3\u675F\u65E7\u540E\u53F0\u4EFB\u52A1\uFF1B\u4E0D\u5408\u5E76\u5386\u53F2\uFF0C\u4E5F\u4E0D\u91CD\u8DD1\u65E7\u4EFB\u52A1",historyStale:"\u70B9\u51FB\u8BFB\u53D6\u5BF9\u8BDD\u67E5\u770B\u6700\u65B0\u8BB0\u5F55"},Fd={startConversation:"Start conversation",endConversation:"End conversation",voiceTarget:"Send to",dedicatedVoiceTarget:"Fish Voice conversation",checkingVoiceTarget:"Checking target\u2026",voiceTargetChanged:"The delivery target changed. Check the chat shown here before starting.",chooseCurrentDshTarget:"Use current chat",backToFishVoice:"Back to Fish Voice",currentDshTargetError:"Could not confirm this DSH chat. Check the chat and try again.",chooseVoiceTarget:"Choose a delivery chat",searchVoiceTargets:"Search by chat title or ID",searchVoiceTargetsAction:"Search",existingVoiceTargetList:"Existing DSH chats",boundVoiceTarget:"Current target",voiceTargetAvailability_ready:"Available",voiceTargetAvailability_busy:"Chat is processing a message",voiceTargetAvailability_archived:"Chat is archived",voiceTargetAvailability_unavailable:"Chat is unavailable",voiceTargetAvailability_managed:"Managed by Fish Voice. Direct delivery unavailable.",voiceTargetAvailability_subagent:"Subagent chat. Direct delivery unavailable.",voiceTargetNoMatch:"No matching chats.",voiceTargetEmptyList:"No available chats.",voiceTargetSynthesisNotice:"With an online voice, replies are sent to the speech provider you approved. Select a local voice under Models \u2192 Read aloud to keep speech offline.",bindVoiceTarget:"Use selected chat",savingVoiceTarget:"Saving\u2026",moreVoiceTargets:"Load more",loadingVoiceTargets:"Loading DSH chats\u2026",voiceTargetListError:"Could not load DSH chats.",retryVoiceTargets:"Retry",retryTranscripts:"Voice messages to resend",retryTranscript:"Resend",retryTranscriptBusy:"Waiting until sending is available",retryTranscriptSending:"Resending\u2026",retryTranscriptUncertain:"Delivery is unconfirmed. Check the original chat.",endDiscardsRetries:"Ending the conversation clears these transcripts",modeSwitching:"Switching listening mode\u2026",modeSaving:"Saving listening mode\u2026",modeSwitchUnconfirmed:"Checking which listening mode took effect\u2026",modeSwitchFailed:"The change could not be confirmed. Check the current mode and try again.",updateTitle:"Fish Voice updates",updateOfferTitle:"Fish Voice update available",updateCurrentVersion:"Installed",updateNewVersion:"New",updateChannel_stable:"Stable",updateChannel_preview:"Preview",updateCheck:"Check for updates",updateDetails:"View update",updateLater:"Later",updateInstall:"Update now",updateRelease:"Release notes",updateFeedback:"Send feedback",update_idle:"Reading update status\u2026",update_checking:"Checking for updates\u2026",update_current:"Fish Voice is up to date.",update_available:"An update is ready.",update_incompatible:"This update is incompatible with the current DSH environment.",update_installing:"Updating. DSH may reload Fish Voice\u2026","update_restart-required":"Update installed. Restart DSH to apply it.","update_enable-required":"Update installed. Enable Fish Voice in DSH plugin settings.",update_installed:"Update complete.",update_error:"The update encountered an error. Check for updates to retry.",update_unsupported:"Automatic updates are unavailable. See the official release notes.",updateConnection:"Update status could not be confirmed. Check again when DSH is ready.",audioDevices:"Audio devices",audioSystemDefault:"System default",audioInput:"Audio input",audioOutput:"Audio output",inputDeviceMissing:"Microphone disconnected; selection retained",outputDeviceMissing:"Output disconnected; no automatic fallback",deviceDisconnected:"Disconnected",inputDeviceStopFirst:"Turn off the microphone to switch input. Output changes at the next playback.",outputDeviceUnsupported:"Selecting speech output is not supported on this platform.",deviceListRetry:"Device list unavailable. Open a selector to retry.",voiceHelperCleanupHint:"Confirming microphone release. New recording stays off until this completes.",voiceHelperRestartHint:"Microphone helper exit is unconfirmed. Fully restart DSH before enabling voice.",inputError_device:"Microphone unavailable",inputError_recognition:"Recognition failed","inputError_no-speech":"No clear speech; try again",inputHelp_device:"Check mic access. Turn the mic off to select a device. Error details: Settings \u2192 Advanced \u2192 Diagnostics.",inputDiagnosticTitle:"Last reported audio error",inputDiagnosticHistory:"This is the last recorded error and may be from an earlier attempt. It does not confirm the current device state.",inputHelp_recognition:"Try again. If it fails, turn the mic off and check the model in Settings.","inputHelp_no-speech":"Move closer, check that your mic is unmuted, and try again.",speechFailed:"Speech failed",speechInterrupted:"Speech interrupted",wakeFallbackHint:"Say a configured name. Matching uses the transcript for now. Reselect Wake word after switching modes to retry sound matching.",wakeMode:"Wake word",switchToWake:"Switch to wake-word listening",wakeDisabled:"Wake listening is off",wakeStarting:"Starting wake listening\u2026",wakeWaiting:"Waiting for wake word",wakeListening:"Listening for the next instruction",wakePaused:"Wake listening paused",wakeError:"Wake listening unavailable; check settings",wakeHint:"Say a configured name, then your instruction. End the conversation to stop listening.",wakeMethod:"Matches the sound and transcript locally after the phrase ends.",wakeAliases:"Wake names",wakeAliasesHint:"Up to 8 comma-separated names. Mandarin near-sounds match only at the start; prefer a distinctive name of 3+ characters.",wakeTimeout:"Wait after wake (seconds)",wakeSettings:"Wake-word settings",wakeStopToEdit:"Turn off the microphone before editing wake names or timeout.",wakeInvalid:"Enter 1\u20138 valid names and a 3\u201330 second timeout.",switchToPtt:"Click to use push to talk",switchToAlways:"Click to leave the microphone listening",quickSpeedStop:"Turn the mic off to change speed",performanceReadFirst:"Check which speeds the current model supports first.",performanceUnavailable:"The provider explicitly rejected the reasoning parameter for unavailable modes; other modes remain selectable.",performanceProbeCost:"At load, up to 3 fixed short requests check the modes. Model charges apply.",performanceProbeScope:"Only routes with a testing interface send short requests. Native support can be read directly.",performanceProbeUnknown:"Some modes could not be confirmed. Check network access or sign-in, then retry.",performanceProbeAccepted:"The effort request check passed.",performanceProbePending:"Checking effort modes for the current model\u2026",holdToSpeak:"Hold to speak:",alwaysWarning:"The microphone keeps listening. Turn it off when finished.",bindingMissing:"Bind a push-to-talk shortcut in settings, or switch to continuous listening.",noSession:"No conversation is open",otherWindow:"Microphone: another window",readingStatus:"Reading status without starting the microphone or models.",statusRetry:"Status is unavailable. It will be checked automatically when you return to this window.",retryStatus:"Refresh voice status",collapseHint:"Collapsing keeps the microphone enabled",stopConsequence:"Ending the conversation releases the microphone and stops its background tasks.",transferTitle:"Take over the other window\u2019s microphone?",transferWarning:"This interrupts voice in the other window and may end its background tasks.",cancel:"Cancel",confirmTransfer:"Confirm takeover",bindingStopRequired:"Turn off the microphone before changing mouse or keyboard shortcuts.",bindingFinishing:"Voice is still stopping. Wait before changing shortcuts.",headphonesRequired:"Confirm that you are wearing headphones to enable automatic interruption.",deviceManualIndex:"Advanced: enter device index",deviceManualName:"Advanced: enter device name",deviceIndexInvalid:"Enter a nonnegative whole-number device index.",deviceDefault:"Use the system default microphone",deviceManual:"Advanced: enter name or index",deviceSaved:"Saved device",deviceEmpty:"No microphone was found. Connect a device and check system sound settings.",deviceUnknown:"Detected devices appear after enabling voice. Use the system default or enter a device manually.",ttsBackend:"Speech backend",ttsBackendHint:"Speech uses your installed TTS backend and its settings. Independent output volume appears only when verified.",ttsBackendPending:"Additional backend selection is being adapted. No cloud service is connected automatically.",voiceClone:"Voice cloning",voiceCloneAvailable:"Qwen supports a local reference voice. Choose a WAV in voice settings.",voiceClonePrivacy:"Reads only your selected, authorized sample locally. No audio upload.",inputActive:"Receiving voice input",modeUnknown:"Listening mode unknown",voiceInputUnavailable:"Voice input unavailable",voiceInputRecoveryHint:"The audio service stopped. Turn the microphone off, then on again. Your authorization is unchanged.",searchHistory:"Search chats",searchScope:"Search loaded chats",noMatches:"No matching chats",differentOwner:"Voice belongs to another session. Check the source first.",details:"Diagnostics",noReply:"No conversation yet",recentConversation:"Conversation",recentTenTurns:"Recent 10 turns",allRecords:"All records",showAllRecords:"Show all",collapseToTen:"Last 10 turns",collapseConversation:"Collapse conversation",currentVoiceRecords:"Current voice chat",historyTruncated:"Showing a limited range; original records retained",viewConversation:"View voice records",loadEarlier:"Load earlier",readingHistory:"Reading records\u2026",retryHistory:"Could not read records. Retry",noConversation:"No conversation yet",newMessages:"new messages",conversationMessages:"Voice conversation",assistantName:"Assistant name",renameAssistant:"Rename: Enter to save, Esc to cancel",newChatCreated:"New chat created",newChatActive:"Start a voice chat. Background work in the current chat will stop and its history will be kept.",newChatOtherOwner:"Open the current voice chat or the window that enabled the microphone to start a new chat.",compact_off:"Off",compact_standby:"Standby",compact_listening:"Listening",compact_pending:"Working",compact_unknown:"Check status",you:"You",assistant:"Assistant",close:"Close panel",keyboardBinding:"Push-to-talk binding",bindingOff:"Not bound",saveBindings:"Save shortcuts",discardBindings:"Discard changes",bindingCapture:"Press a key combination (Esc cancels)",clearBinding:"Clear binding",bindingUnsupported:"This key or system shortcut is not supported.",bindingGlobalHint:"Windows global shortcut. Disable voice before recording a binding; changes apply on the next voice enable. Keys are not swallowed and may also trigger another application.",bindingUnavailable:"Global key binding is unavailable on this platform.",bindingPrintableWarning:"A plain letter, digit or Space also triggers push-to-talk while typing in other applications.",performanceTitle:"Voice performance",performanceHint:"Applies to the next dedicated voice chat. For a linked conversation, use the model menu in that DSH chat to change its reasoning effort.",inspectPerformance:"Check available modes",performance_fast:"Fast",performanceNoThinking:"No thinking",performanceRecommended:"[Recommended]",performanceFastHint:"Fast explicitly requests thinking to be turned off.",performanceFastUnavailable:"The current route cannot confirm that thinking can be turned off. Choose Follow model or select a model route that supports turning it off.",performanceHostUnavailable:"The current model route does not offer some reasoning levels.",performance_balanced:"Standard",performance_high:"High",performance_compatibility:"Compatible default",performanceStopRequired:"Mode changes require fully stopped voice. Disabling voice can end background work belonging to its voice root.",savePerformance:"Save for next enable",outputVolume:"Assistant voice volume",outputVolumeHint:"Adjusts the installed Windows dsh-speak backend only. It does not verify the active voice route or change DSTuber, system or cue volume. Applies to the next output.",readOutputVolume:"Read voice volume",saveOutputVolume:"Save voice volume",outputVolumeUnavailable:"This speech backend does not support independent volume control.",outputVolumeUnknown:"The volume save is unconfirmed. It will be checked automatically without resubmitting.",settingsTitle:"\u9C7C\u5E94 settings",settingsSections:"Settings sections",tab_audio:"Audio",tab_interaction:"Interaction",tab_prompt:"Prompt",voicePromptLabel:"Custom prompt",voicePromptOptional:"(optional)",voicePromptAgents:"Follow AGENTS",voicePromptCustom:"Custom prompt added",voicePromptPlaceholder:`For example: Give the conclusion first and use a natural tone.

Added after AGENTS. Leave empty to use the default settings.`,voicePromptStopToEdit:"Stop voice to edit",voicePromptUnsupported:"This DSH version does not support custom prompts yet.",voicePromptTooLong:"The prompt must not exceed 32,768 characters.",voicePromptSaving:"Saving\u2026",voicePromptCancel:"Cancel changes",voicePromptSave:"Save",voicePromptSaved:"Saved. Applies when voice is next started.",voicePromptSaveFailed:"Could not save. Your draft has been kept.",voicePromptUnsaved:"Not saved",tab_models:"Models",tab_advanced:"Advanced",projectInfoTitle:"About \u9C7C\u5E94",projectAuthor:"Author",projectRepository:"Official repository",projectNpm:"npm package",tab_sessions:"Sessions",settingsContent:"Settings content",voiceCleanupPending:"Closing previous audio service",voiceCleanupHint:"Waiting for the previous session and recording to exit. Status will refresh without retrying microphone activation.",voiceRestartPending:"Restart DSH required",voiceRestartHint:"The previous audio service has not confirmed exit. Fully quit and reopen DSH before enabling voice. Your saved authorization is unchanged.",voiceRecoveryPending:"Previous voice session is still active",voiceRecoveryCheck:"Check and stop",voiceRecoveryHint:"The previous instance is still closing. Check and stop first. If it remains active, fully restart DSH before enabling voice. Your authorization is retained.",operationUnavailable:"The outcome is unconfirmed. Automatic readback will check the actual state without resubmitting. Details are in Advanced settings.",enableFailed:"Could not open the mic. Check Advanced settings for details before retrying.",tab_pets:"Desktop pet",planned:"Planned development",configurationUnknown:"The configuration write is unconfirmed. Automatic readback is in progress; changes stay locked until verified.",motionTitle:"Interface motion",motion_spring:"Spring",motion_firm:"Firm",motion_off:"Off",motionHint:"Preview and save immediately. Actions never wait for animation. System reduced-motion preference takes priority.",motionNotSaved:"Preview applied, but this browser could not save the preference.",modeControlPending:"Voice control is pending or unconfirmed. Refresh status when it finishes.",capabilityTitle:"Host capabilities and voice visibility",supported:"Available",unsupported:"Unavailable or unconfirmed",hiddenMode:"Hidden voice chat",workspaceMode:"Workspace-visible compatibility mode",taskCapability:"Persistent handoff",configuredMode:"Saved mode",currentVoiceMode:"Actual mode of the current voice chat",noActiveVoice:"No running voice chat",chooseVisibility:"Choose visibility",workspaceWarning:"Workspace-visible compatibility mode shows voice chats in the regular workspace. Unavailable hidden mode still refuses to start; it never falls back to visible mode.",visibilityNoMigration:"This preference applies to later chats. Existing chats keep their current visibility.",modeReadFirst:"Checking settings and status for this conversation before visibility can be changed.",closeBeforeMode:"Turn voice off and wait for confirmed shutdown before changing visibility.",saveWorkspace:"Save workspace-visible mode",saveHidden:"Save hidden mode",visibilityUnknownWrite:"The visibility write is unconfirmed. Automatic readback is in progress; changes stay locked. The original write will not be repeated.",outputObservationUnavailable:"Actual playback-start events are unavailable; playback has not been confirmed.",title:"\u9C7C\u5E94",description:"Voice controls, audio preferences, and separate voice chats.",drag:"Move Fish Voice panel",dragHint:"Drag background space with the mouse; controls remain interactive",collapse:"Collapse",reopen:"Open Fish Voice",refresh:"Refresh status",settings:"Settings",unknown:"Reading status\u2026",enabled:"Microphone enabled",disabled:"Microphone off",identity:"Full session identities",source:"Authorization source",actor:"Action session",none:"None",openSession:"Open a DSH conversation first",enable:"Enable for this session",transfer:"Authorize this session",disable:"Disable voice",stale:"Refresh to confirm status",snapshot:"Last read status",consequence:"Disabling or switching voice may end its background work. Collapsing this panel leaves voice enabled.",savedHint:"Device and speaker settings take effect on the next audio operation or helper reload.",more:"More voice chats",historyOther:"This list belongs to another action session; read it again",helperOnline:"Audio helper online",helperOffline:"Audio helper offline",pending:"Working\u2026",refreshHint:"Read status without starting the microphone or a model",modelGuide:"SenseVoice runs locally on the CPU. For model files and licenses, see docs/model-setup.md.",sensevoiceSource:"SenseVoice source",ttsSource:"External TTS reference",licenseNote:"SenseVoice licensing discussion",modelTitle:"Local models",modelHint:"Save existing SenseVoice or CAM++ paths. Files are verified before use. Speaker filtering is enabled separately.",asr:"Speech recognition",sensevoicePath:"Local SenseVoice directory",campplusPath:"CAM++ file (optional)",saveModels:"Save model paths",audioTitle:"Audio settings",soundTitle:"Turn sounds",headphones:"I am using headphones",headphonesHint:"Cues stay off until headphones are confirmed, to avoid speaker echo. This is not echo cancellation and does not trim your speech.",automaticBargeIn:"Enable experimental automatic interruption",stopRequested:"Stop requested; playback has not confirmed stopping",stopConfirmed:"Playback confirmed stopped",soundEnabled:"Enable turn sounds",soundVolume:"Sound volume (0\u20131)",soundUnavailable:"Sound playback is not connected; these controls cannot play cues yet.",soundAvailable:"Sound playback connected",mode:"Listening mode",alwaysOn:"Enable always listening (mic stays on)",alwaysOff:"Use push to talk",modeUnavailable:"Listening mode control is not connected",modeNeedsGrant:"Read the current voice status first",pttMode:"Push to talk",alwaysMode:"Open mic",modeHint:"The audio helper controls the active mode. Saving preferences never grants or starts microphone access.",readSettings:"Read settings",device:"Input device",deviceHint:"Blank uses the system default; enter a device name or index",sideButton:"Mouse push-to-talk",sideOff:"Off",sideOne:"Side button 1",sideTwo:"Side button 2",speaker:"Experimental speaker filtering",speakerHint:"Enable matching only; this page does not record or enroll a voiceprint",save:"Save settings",saved:"Settings saved",historyTitle:"Voice chats",historyHint:"Only Fish Voice voice chats appear here. Resume never unarchives a chat automatically.",loadHistory:"Read voice chats",newChat:"New chat",resume:"Resume",active:"Current",archived:"Archived",unavailable:"Unavailable",empty:"No voice chats available",noTitle:"Voice chat",noResume:"Cannot resume right now",newHint:"New or resumed chats switch current voice, revoke its old grant, and may end its background work. They do not merge history or replay old work.",historyStale:"Read voice chats to see the latest records"};var Sn=require("react");var Jh=/^7b94c8e3-d6a1-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,Di=e=>typeof e=="string"&&Jh.test(e);var Ud="sidebar.workspaces",Yh="workspace",Qh="whaleWorkspacePresentation",eg=["sidebar.workspaces.directoryFlow","sidebar.workspaces.session.row.action","sidebar.session.row.leading","sidebar.session.row.trailing","sidebar.session.row.hover"],ng=new Set(["one-shot","continuable","unknown"]);function tg(e,n){return e&&typeof e=="object"&&Object.keys(e).length===n.length&&n.every(t=>Object.hasOwn(e,t))}function og(e){if(!Array.isArray(e)||e.length>512)return null;let n=[],t=new Set;for(let o of e){if(!tg(o,["id","parentId","mode"])||typeof o.id!="string"||!o.id||o.id.length>256||t.has(o.id))return null;if(o.parentId===null){if(o.mode!==null||!Di(o.id))return null;n.push({id:o.id,parentId:null,mode:null})}else{if(typeof o.parentId!="string"||!o.parentId||o.parentId===o.id||!ng.has(o.mode))return null;n.push({id:o.id,parentId:o.parentId,mode:o.mode})}t.add(o.id)}return n}function rg(e,n){if(!e||typeof e!="object"||!e.byId||!Array.isArray(e.ids))return e;let t=new Map(n.map(l=>[l.id,l])),o=Object.create(null),r=new Set,i=!1;for(let[l,u]of Object.entries(e.byId)){let d=t.get(l);if(Di(l)&&d===void 0){r.add(l),i=!0;continue}if(d?.parentId===null){if(u.parentId===void 0&&u.origin!=="subagent"){o[l]=u;continue}r.add(l),i=!0;continue}if(d&&u.origin==="subagent"&&u.parentId===d.parentId){let m={...u};delete m.origin,o[l]=m,i=!0;continue}o[l]=u}for(let l of n){let u=e.byId[l.id];u&&(l.parentId===null&&(u.parentId!==void 0||u.origin==="subagent")||l.parentId!==null&&(u.origin!=="subagent"||u.parentId!==l.parentId)||e.ids.includes(l.id)||(i=!0))}if(!i)return e;let s=e.ids.filter(l=>!r.has(l)&&o[l]!==void 0);for(let l of n)o[l.id]!==void 0&&!s.includes(l.id)&&s.push(l.id);let c=e.projectionsBySession;if(c&&r.size>0){let l={...c};for(let u of r)delete l[u];c=l}return{...e,ids:s,byId:o,projectionsBySession:c}}function ig(e,n){return!e||e.locale!==Yh||e.options?.id!==void 0||e.options?.key!==void 0||(e.options?.priority??0)!==0||typeof n!="function"||n.name!=="WorkspaceBrowser"?!1:eg.every(t=>Object.hasOwn(e.children??{},t))}function sg(e){if(!Object.isExtensible(e))return!1;let n=Object.getOwnPropertyDescriptor(e,"component");return n===void 0||n.writable===!0}function ag(e,n){return e.length===n.length&&e.every((t,o)=>{let r=n[o];return t.id===r.id&&t.parentId===r.parentId&&t.mode===r.mode})}function qd(e,n){let t=[],o=0,r={revision:o,items:t},i,s=!1,c=!1,l=new Set,u=new Set,d=L=>{for(let M of[...L])M()},m={getSnapshot:()=>r,subscribe(L){return u.add(L),()=>u.delete(L)}},f=()=>{o++,r={revision:o,items:t},d(u),d(l)},p=L=>{s!==L&&(s=L,f())},b=()=>{let L=i;i=void 0,L&&L.entry.component===L.wrapper&&(L.entry.component=L.original)},v=()=>{if(c)return;let L;try{L=e.entries(Ud)}catch{L=void 0}let M=Array.isArray(L)?L.filter(E=>{let S=i&&i.entry===E&&E.component===i.wrapper?i.original:E?.component;return ig(E,S)}):[];if(M.length!==1||typeof n!="function"||!sg(M[0])){b(),p(!1);return}let B=M[0];if(i?.entry===B&&B.component===i.wrapper)return;b(),p(!1);let C=B.component,I=E=>{let S=E.useSessions(G=>G),k=E.useWhaleWorkspacePresentation(G=>G),z=(0,Sn.useMemo)(()=>rg(S,k.items),[S,k]),X=(0,Sn.useCallback)(G=>G(z),[z]),P=(0,Sn.useMemo)(()=>new Map(k.items.map(G=>[G.id,G])),[k]),N=(0,Sn.useCallback)(G=>{let V=P.get(G),F=S.byId[G];if(V?.parentId&&F?.origin==="subagent"&&F.parentId===V.parentId){n({childSessionId:G,parentSessionId:V.parentId,mode:V.mode});return}E.open?.(G)},[E.open,P,S]);return(0,Sn.createElement)(C,{...E,useSessions:X,open:N})},T=function(S){let k=typeof S?.useSessions=="function"&&typeof S?.useWhaleWorkspacePresentation=="function"&&typeof S?.open=="function";return(0,Sn.useEffect)(()=>{i?.entry===B&&i.wrapper===T&&p(k)},[k]),(0,Sn.createElement)(k?I:C,S)};T.displayName="WhaleWorkspacePresentation",B.component=T,i={entry:B,original:C,wrapper:T}},y=()=>{},x=()=>{};try{y=e.provideRoot({hooks:{[Qh]:m}}),typeof y!="function"&&(y=()=>{}),x=e.subscribe(Ud,v),typeof x!="function"&&(x=()=>{}),v()}catch{x(),b(),y(),p(!1)}return{supported:()=>s,subscribe(L){return l.add(L),()=>l.delete(L)},setOverrides(L){if(c)return!1;let M=og(L);return M===null?(t.length>0&&(t=[],f()),!1):(ag(t,M)||(t=M,f()),!0)},dispose(){c||(c=!0,x(),b(),s=!1,f(),y(),l.clear(),u.clear())}}}var lg=["slots","locale","remote","uiSession"];function cg(e){let n=sd(),t=ju(void 0,{observe:n.internal});t.enableAutomaticReads();let o=Wu();e.inject(["whaleFloatingLayout"],v=>{v.effect(()=>o.useLayoutService(v.whaleFloatingLayout),"whale-voice: optional magnetic layout")});let r=Yu(),i=Ku(window,{onResize:v=>o.fit(v)}),s,c=()=>{};e.effect(()=>{let v=()=>{t.setReadVisibility(document.visibilityState!=="hidden"),document.visibilityState!=="hidden"&&(t.refresh(),s?.refresh(),c())};return window.addEventListener("focus",v),window.addEventListener("online",v),document.addEventListener("visibilitychange",v),v(),()=>{window.removeEventListener("focus",v),window.removeEventListener("online",v),document.removeEventListener("visibilitychange",v)}},"whale-voice: refresh visible state"),e.effect(()=>{let v=qd(e.slots,T=>e.get?.("uiWorkspace")?.openSession(T)),y,x,L=()=>{x?.(),x=null};c=()=>{if(!v.supported()){L();return}if(!y||x)return;let T=y,E=!0;x=y.subscribePresentation(S=>{v.setOverrides(S.shown),E&&(E=!1,t.refresh({force:!0}))},S=>{y===T&&(L(),console.warn("\u9C7C\u5E94\u4FA7\u680F\u4F1A\u8BDD\u663E\u793A\u8FDE\u63A5\u4E2D\u65AD",S?.message??S))})};let M=v.subscribe(c),B=!1;s=ji(async()=>{let T=B?"ui-reconnect":"ui-connect";n.internal(T,"requested");try{let E=await nd(e,n.internal);return n.internal(T,"finished","ok"),E}catch(E){throw B=!0,n.internal(T,"finished","failed"),E}},{visible:()=>t.getSnapshot().readVisible!==!1,onReady:T=>{L(),y=T,n.attach(T),t.attachConversationClient(T),c()},onError:T=>t.conversationUnavailable(T)});let C=t.getSnapshot().readVisible,I=t.subscribe(()=>{let T=t.getSnapshot().readVisible;T!==C&&(C=T,s.visibilityChanged())});return s.start(),()=>{c=()=>{},L(),M(),v.dispose(),I(),n.dispose(),s.dispose(),t.dispose()}},"whale-voice: private conversation stream"),e.effect(()=>()=>{t.dispose(),i.dispose(),o.dispose(),r.dispose()},"whale-ear-ui: state and geometry"),e.effect(()=>e.locale.register("whaleEar",{en:Fd,zh:Zd}),"whale-ear-ui: dictionaries"),e.effect(()=>{let v=document.createElement("style");return v.dataset.plugin="dsh-whale-ear-ui",v.textContent=h.text+kd+Vi,document.head.append(v),()=>v.remove()},"whale-ear-ui: stylesheet");let l=async v=>{let y=e.get?.("sessions");if(!y)throw new Error("DSH \u4F1A\u8BDD\u754C\u9762\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");return y.list.getSnapshot().byId[v]||await y.refresh(),y},u=0,d=async v=>{let y=++u;if(v.kind==="root"&&await l(v.id),y!==u)return;let x=e.get?.("uiWorkspace");if(!x?.openSession)throw new Error("DSH \u4F1A\u8BDD\u754C\u9762\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");return x.openSession(v.kind==="root"?v.id:{childSessionId:v.id,parentSessionId:v.parentId,mode:v.mode??"unknown"})},m=v=>d({kind:"root",id:v}),f={subscribe(v){let y=[e.uiSession.adapter?.current?.subscribe(v),e.get?.("layout")?.panelInfo?.subscribe(v),e.get?.("sessions")?.list?.subscribe?.(v)];return()=>y.forEach(x=>x?.())},selectedSession(){let v=e.uiSession.adapter?.current?.getSnapshot();return v?.hooks?.session?.getSnapshot()?.blank===!0?null:v?.props?.sessionId??null},currentConversation(){return e.get?.("layout")?.panelInfo?.getSnapshot()?.activePanelId===null?f.selectedSession():null},sourceFor(v){if(!v)return null;let y=e.get?.("sessions"),x=y?.list?.getSnapshot()?.byId?.[v];return y?.subagentAddress?.(v)||x?.origin==="subagent"||x?.parentId?null:v}},p=async(v,y)=>{let L=await(await l(v)).using(v,{source:"workspaceOperation"},M=>M.binding.session.rename(y));if(!L.ok)throw new Error(L.error.message);return L.value.title},b=()=>({captureBindings:t.captureBindings,refreshModelCompute:t.refreshModelCompute,pickPath:t.pickPath,readState:t.getSnapshot,markSettingsEdited:t.markSettingsEdited,discardSettingsDraft:t.discardSettingsDraft,openAuthorization:t.openAuthorization,closeAuthorization:t.closeAuthorization,saveAuthorization:t.saveAuthorization,readOperationLog:t.readOperationLog,manageSessions:t.manageSessions,listExistingVoiceSessions:t.listExistingVoiceSessions,setExistingVoiceSession:t.setExistingVoiceSession,setSettingsTab:t.setSettingsTab,setSettingsModelTab:t.setSettingsModelTab,setSessionManagement:t.setSessionManagement,senseVoiceAsrAction:t.senseVoiceAsrAction,updateAction:t.updateAction,dismissUpdate:t.dismissUpdate,openExistingVoiceSession:m,openManagedSession:d,renameManagedSession:p,hooks:{whaleUi:t,whalePreferences:r},setMotion:v=>r.setMotion(v),setAssistantName:v=>r.setAssistantName(v),run:(...v)=>t.run(...v),setSession:v=>t.setSession(v),cancelPreview:()=>t.cancelPreview(),discardDiagnostics:()=>t.discardDiagnostics(),dismissSetup:()=>t.dismissSetup(),openSetup:()=>t.openSetup(),showHome:()=>t.showHome(),openSettings:t.openSettings,refresh:()=>t.refresh()});e.slots.inject("shell.overlay",()=>e.slots.register({name:"shell.overlay",id:"whale-ear",locale:"whaleEar",inject:()=>({geometry:o,sizing:i,recordUserOperation:n.user,setPanelVisible:t.setPanelVisible,closeAuthorization:t.closeAuthorization,refresh:()=>t.refresh(),showHome:()=>t.showHome(),dismissSetup:()=>t.dismissSetup(),hooks:{whaleUi:t,whalePreferences:r}}),children:{"whale-ear.panel.controls":{kind:"single",scope:"root"}}},Od)),e.slots.inject("whale-ear.panel.controls",()=>e.slots.register({name:"whale-ear.panel.controls",locale:"whaleEar",inject:()=>({...b(),controlContext:f,retryVoiceTranscript:t.retryVoiceTranscript})},Bd))}
return module.exports;}});
