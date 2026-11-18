window.__ModuleLoader__.load({id:"dsh-whale-ear-ui",factory:(require)=>{var module={exports:{}};var exports=module.exports;
var xo=Object.defineProperty;var tp=Object.getOwnPropertyDescriptor;var rp=Object.getOwnPropertyNames;var op=Object.prototype.hasOwnProperty;var Li=(e,n)=>{for(var t in n)xo(e,t,{get:n[t],enumerable:!0})},ip=(e,n,t,r)=>{if(n&&typeof n=="object"||typeof n=="function")for(let o of rp(n))!op.call(e,o)&&o!==t&&xo(e,o,{get:()=>n[o],enumerable:!(r=tp(n,o))||r.enumerable});return e};var sp=e=>ip(xo({},"__esModule",{value:!0}),e);var dg={};Li(dg,{apply:()=>cg,inject:()=>lg});module.exports=sp(dg);var Ot=require("react");var _n={collapseInner:"_06_T-G_collapseInner",input:"_06_T-G_input",rail:"_06_T-G_rail",collapse:"_06_T-G_collapse",range:"_06_T-G_range",toggleTrack:"_06_T-G_toggleTrack",thumb:"_06_T-G_thumb",toggle:"_06_T-G_toggle",fill:"_06_T-G_fill",text:`._06_T-G_range {
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

._06_T-G_rail {
  background: var(--dsw-alias-border-l2, #8791a4);
  pointer-events: none;
  border-radius: 999px;
  height: 6px;
  position: absolute;
  inset: 13px 9px;
  min-width: 0 !important;
  margin: 0 !important;
}

._06_T-G_fill {
  width: var(--whale-range-position);
  background: var(--dsw-alias-brand-primary, #8ba9e7);
  border-radius: inherit;
  transition: width var(--whale-duration, .2s) var(--whale-ease, ease-out);
  position: absolute;
  inset: 0 auto 0 0;
  min-width: 0 !important;
  margin: 0 !important;
}

._06_T-G_thumb {
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

._06_T-G_range ._06_T-G_input {
  opacity: 0;
  cursor: pointer;
  touch-action: pan-y;
  height: 32px;
  margin: 0;
  position: absolute;
  inset: 0;
  width: 100% !important;
}

._06_T-G_range:focus-within {
  outline: 2px solid var(--dsw-focus-ring-color, #8ba9e7);
  outline-offset: 2px;
  border-radius: 6px;
}

._06_T-G_range:hover ._06_T-G_thumb {
  box-shadow: 0 0 0 4px color-mix(in srgb,var(--dsw-alias-brand-primary, #8ba9e7) 18%,transparent);
}

._06_T-G_range[data-dragging] :is(._06_T-G_thumb, ._06_T-G_fill) {
  transition-duration: 40ms;
  transition-timing-function: linear;
}

._06_T-G_range[data-disabled], ._06_T-G_toggle[data-disabled] {
  opacity: .5;
}

._06_T-G_range[data-disabled] ._06_T-G_input {
  cursor: not-allowed;
}

._06_T-G_collapse {
  opacity: 0;
  visibility: hidden;
  grid-template-rows: 0fr;
  transition: grid-template-rows .16s ease-out, opacity .12s ease-out, visibility .16s;
  display: grid;
}

._06_T-G_collapse[data-open="true"] {
  opacity: 1;
  visibility: visible;
  grid-template-rows: 1fr;
}

._06_T-G_collapseInner {
  min-height: 0;
  overflow: hidden;
}

._06_T-G_toggle {
  cursor: pointer;
  align-items: center;
  gap: 8px;
  width: fit-content;
  max-width: 100%;
  font-size: 12px;
  display: flex;
  position: relative;
}

._06_T-G_toggle > input {
  opacity: 0;
  width: 38px;
  height: 24px;
  margin: 0;
  position: absolute;
}

._06_T-G_toggleTrack {
  pointer-events: none;
  background: var(--dsw-alias-border-l2, #8791a4);
  width: 36px;
  height: 22px;
  transition: background-color var(--whale-duration, .2s);
  border-radius: 999px;
  flex: none;
  position: relative;
}

._06_T-G_toggleTrack > span {
  background: var(--dsw-alias-bg-layer-1, #fff);
  width: 16px;
  height: 16px;
  transition: left var(--whale-duration, .2s) var(--whale-ease, ease-out);
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
}

._06_T-G_toggle > input:checked + ._06_T-G_toggleTrack {
  background: var(--dsw-alias-brand-primary, #8ba9e7);
}

._06_T-G_toggle > input:checked + ._06_T-G_toggleTrack > span {
  left: 17px;
}

._06_T-G_toggle > input:focus-visible + ._06_T-G_toggleTrack {
  outline: 2px solid var(--dsw-focus-ring-color, #8ba9e7);
  outline-offset: 2px;
}

[data-motion="firm"] :is(._06_T-G_range, ._06_T-G_toggle, ._06_T-G_collapse) {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="firm"] ._06_T-G_collapse {
  transition-duration: .1s;
}

[data-motion="off"] :is(._06_T-G_range, ._06_T-G_toggle, ._06_T-G_collapse), [data-motion="off"] :is(._06_T-G_range, ._06_T-G_toggle, ._06_T-G_collapse) * {
  transition: none !important;
  animation: none !important;
}

@media (prefers-reduced-motion: reduce) {
  ._06_T-G_range, ._06_T-G_toggle, ._06_T-G_collapse, ._06_T-G_range *, ._06_T-G_toggle *, ._06_T-G_collapse * {
    transition: none !important;
    animation: none !important;
  }
}

@media (forced-colors: active) {
  ._06_T-G_range ._06_T-G_input {
    opacity: 1;
    position: relative;
  }

  ._06_T-G_rail {
    display: none;
  }

  ._06_T-G_toggleTrack {
    border: 1px solid buttontext;
  }

  ._06_T-G_toggleTrack > span {
    background: buttontext;
  }

  ._06_T-G_toggle > input:checked + ._06_T-G_toggleTrack {
    background: highlight;
  }
}
`};var rn=require("react/jsx-runtime"),Vi=_n.text;function Rt({value:e,defaultValue:n=0,min:t=0,max:r=100,disabled:o,onChange:i,onPointerDown:s,onPointerUp:c,onPointerCancel:l,onLostPointerCapture:d,className:u="",style:p,...f}){let[m,y]=(0,Ot.useState)(n),[v,b]=(0,Ot.useState)(!1);(0,Ot.useEffect)(()=>{o&&b(!1)},[o]);let _=Number(e??m),Z=Number(t),K=Number(r),O=K>Z&&Number.isFinite(_)?Math.max(0,Math.min(1,(_-Z)/(K-Z))):0,N=T=>P=>{b(!1),T?.(P)};return(0,rn.jsxs)("span",{className:_n.range,"data-whale-motion-range":!0,"data-dragging":v&&!o||void 0,"data-disabled":o||void 0,style:{"--whale-range-position":`${O*100}%`},children:[(0,rn.jsxs)("span",{className:_n.rail,"aria-hidden":"true",children:[(0,rn.jsx)("span",{className:_n.fill}),(0,rn.jsx)("span",{className:_n.thumb})]}),(0,rn.jsx)("input",{...f,className:`${_n.input} ${u}`,style:p,type:"range",min:t,max:r,value:e??m,disabled:o,onChange:T=>{o||(e===void 0&&y(T.target.value),i?.(T))},onPointerDown:T=>{o||b(!0),s?.(T)},onPointerUp:N(c),onPointerCancel:N(l),onLostPointerCapture:N(d),onBlur:T=>{b(!1),f.onBlur?.(T)}})]})}function ji({open:e,children:n,className:t="",...r}){return(0,rn.jsx)("div",{...r,className:`${_n.collapse} ${t}`,"data-open":!!e,"aria-hidden":!e,inert:e?void 0:"",children:(0,rn.jsx)("div",{className:_n.collapseInner,children:n})})}function Mt({label:e,checked:n,disabled:t,onChange:r,...o}){return(0,rn.jsxs)("label",{className:_n.toggle,"data-disabled":t||void 0,children:[(0,rn.jsx)("input",{...o,type:"checkbox",role:"switch",checked:n,disabled:t,onChange:i=>r?.(i.target.checked)}),(0,rn.jsx)("span",{className:_n.toggleTrack,"aria-hidden":"true",children:(0,rn.jsx)("span",{})}),(0,rn.jsx)("span",{children:e})]})}function qi(e,{onReady:n,onError:t,visible:r=()=>!0,schedule:o=setTimeout,unschedule:i=clearTimeout}={}){let s=!1,c=!1,l=!1,d=null,u=0,p=null,f=()=>{d!==null&&i(d),d=null},m=async()=>{if(!(s||c||l||!r())){f(),c=!0;try{let y=await e();if(s){await y.dispose();return}try{n(y)}catch(v){throw await y.dispose(),v}p=y,l=!0,u=0}catch(y){if(s)return;t(y),u++,r()&&(d=o(()=>{d=null,m()},Math.min(3e4,750*2**Math.min(u-1,6))),d?.unref?.())}finally{c=!1}}};return{start:m,visibilityChanged(){r()?m():f()},refresh(){m()},dispose(){s=!0,f(),p?.dispose()}}}function Dt(e){return e===null||e&&typeof e=="object"&&!Array.isArray(e)&&Object.keys(e).sort().join(",")==="backend,id,name"&&["winmm","portaudio"].includes(e.backend)&&typeof e.id=="string"&&e.id.length>0&&e.id.length<=1024&&typeof e.name=="string"&&e.name.trim().length>0&&e.name.length<=256&&!/[\u0000-\u001f\u007f]/.test(e.id+e.name)}function Ji(e){return e&&e.schema===1&&["input","output"].every(n=>{let t=e[n];return!t||!["available","empty","unavailable"].includes(t.status)||!Array.isArray(t.items)||t.items.length>128||!(t.reason===null||typeof t.reason=="string"&&t.reason.length<=128)?!1:t.items.every(r=>r!==null&&Dt(r))&&new Set(t.items.map(r=>r.backend+":"+r.id)).size===t.items.length&&(t.status==="available"?t.items.length>0:t.items.length===0)})}var mt=Object.freeze(["ptt","always","wake"]),_r=e=>({ptt:"pttMode",always:"alwaysMode",wake:"wakeMode"})[e]??"modeUnknown",Xi=e=>["waiting","listening"].includes(e?.state)&&e?.streamOpen!==!0?"unknown":{disabled:"wakeDisabled",starting:"wakeStarting",waiting:"wakeWaiting",listening:"wakeListening",paused:"wakePaused",error:"wakeError"}[e?.state]??"unknown",Yi=e=>e!==null&&typeof e=="object"&&!Array.isArray(e)&&["disabled","starting","waiting","listening","paused","error"].includes(e.state)&&(e.deadlineAt===null||Number.isFinite(e.deadlineAt)&&e.deadlineAt>=0)&&typeof e.streamOpen=="boolean"&&["asr-after-utterance","acoustic-after-utterance"].includes(e.detection),Qi=e=>[...new Set(String(e).split(/[,，\n]/).map(n=>n.trim()).filter(Boolean))],wr=e=>Array.isArray(e)&&e.length>=1&&e.length<=8&&new Set(e.map(n=>typeof n=="string"?n.toLowerCase():n)).size===e.length&&e.every(n=>typeof n=="string"&&n.trim()===n&&n.length>=2&&n.length<=24&&!/[\p{C}]/u.test(n)&&/[\p{L}\p{N}]/u.test(n));function es(e){if(!e||typeof e!="object"||Array.isArray(e)||!["unknown","available","empty","unavailable"].includes(e.status)||!Array.isArray(e.items)||e.items.length>128)return!1;if(e.status==="unknown")return e.observedAt===null&&e.items.length===0;if(!Number.isFinite(e.observedAt)||e.observedAt<0)return!1;if(e.status!=="available")return e.items.length===0;let n=new Set;return e.items.length>0&&e.items.every(t=>!t||typeof t!="object"||Array.isArray(t)||!Number.isSafeInteger(t.index)||t.index<0||n.has(t.index)||typeof t.name!="string"||!t.name.trim()||t.name.length>256||/[\u0000-\u001f\u007f]/.test(t.name)?!1:(n.add(t.index),!0))}var se={};Li(se,{BIGINT_FORMAT_RANGES:()=>zr,CONSTANT_CATCH:()=>ds,Class:()=>zo,NUMBER_FORMAT_RANGES:()=>Bt,aborted:()=>xn,allowsEval:()=>To,assert:()=>pp,assertEqual:()=>ap,assertIs:()=>dp,assertNever:()=>up,assertNotEqual:()=>lp,assignProp:()=>cn,attachSchema:()=>Ft,base64ToUint8Array:()=>ls,base64urlToUint8Array:()=>Tp,cached:()=>bt,captureStackTrace:()=>kr,cleanEnum:()=>Ap,cleanRegex:()=>Ht,clone:()=>wn,cloneDef:()=>hp,codePointLength:()=>Ut,constantCatch:()=>us,createTransparentProxy:()=>wp,defineLazy:()=>Po,defineLazyInternal:()=>fe,derived:()=>Gp,esc:()=>No,escapeRegex:()=>In,explicitlyAborted:()=>Io,extend:()=>Sp,finalizeIssue:()=>kn,floatSafeRemainder:()=>Co,getElementAtPath:()=>gp,getEnumValues:()=>ht,getLengthableOrigin:()=>Lt,getParsedType:()=>_p,getSizableOrigin:()=>as,hexToUint8Array:()=>Wp,hide:()=>Pr,installLazyProp:()=>Rp,isObject:()=>ot,isPlainObject:()=>Vn,issue:()=>yt,joinValues:()=>xr,jsonStringifyReplacer:()=>gt,members:()=>Ko,merge:()=>Zp,mergeDefs:()=>Wn,normalizeParams:()=>re,nullish:()=>Zo,numKeys:()=>yp,objectClone:()=>mp,omit:()=>kp,optionalKeys:()=>Wo,own:()=>Ln,parsedType:()=>Go,partial:()=>Cp,pick:()=>xp,prefixIssues:()=>Gn,primitiveTypes:()=>is,promiseAllObject:()=>bp,propertyKeyTypes:()=>Eo,randomString:()=>vp,rawShape:()=>vt,required:()=>Pp,safeExtend:()=>zp,shallowClone:()=>os,sizeCaps:()=>Cr,slugify:()=>Ao,stringifyPrimitive:()=>Sr,toZod:()=>cp,uint8ArrayToBase64:()=>cs,uint8ArrayToBase64url:()=>Ep,uint8ArrayToHex:()=>Ip,unwrapMessage:()=>ft});function ap(e){return e}function lp(e){return e}function cp(){return e=>e}function dp(e){}function up(e){throw new Error("Unexpected value in exhaustive check")}function pp(e){}function ht(e){let n=Object.values(e).filter(r=>typeof r=="number");return Object.entries(e).filter(([r,o])=>n.indexOf(+r)===-1).map(([r,o])=>o)}function xr(e,n="|"){return e.map(t=>Sr(t)).join(n)}function gt(e,n){return typeof n=="bigint"?n.toString():n}var So=class{constructor(n){this._getter=n,this._value=void 0}get value(){let n=this._getter;return n!==void 0&&(this._value=n(),this._getter=void 0),this._value}};function bt(e){return new So(e)}function Zo(e){return e==null}function Ht(e){let n=e.startsWith("^")?1:0,t=e.endsWith("$")?e.length-1:e.length;return e.slice(n,t)}function Co(e,n){let t=e/n,r=Math.round(t),o=4*Number.EPSILON*Math.max(Math.abs(t),1);return Math.abs(t-r)<o?0:t-r}var ns=Symbol("evaluating");function Po(e,n,t){let r;Object.defineProperty(e,n,{get(){if(r!==ns)return r===void 0&&(r=ns,r=t()),r},set(o){Object.defineProperty(e,n,{value:o})},configurable:!0})}function mp(e){return Object.create(Object.getPrototypeOf(e),Object.getOwnPropertyDescriptors(e))}function cn(e,n,t){Object.defineProperty(e,n,{value:t,writable:!0,enumerable:!0,configurable:!0})}function vt(e){let n=Object.getOwnPropertyDescriptor(e,"shape");return n?.get?n.get.raw:n?.value}function En(e){return vt(e._zod.def)??e._zod.def.shape}function ts(e,n,t){Object.defineProperty(e,n,{get(){let r=t();return cn(this,n,r),r},enumerable:!0,configurable:!0})}function rs(e,n,t){n in e?cn(e,n,t):e[n]=t}function rt(e,n,t,r){let o=En(n);for(let i of t){let s=Object.getOwnPropertyDescriptor(o,i);s.enumerable&&(s.get?ts(e,i,()=>{let c=n._zod.def.shape[i];return r?r(c,i):c}):rs(e,i,r?r(s.value,i):s.value))}}function fp(e,n){for(let t of Reflect.ownKeys(n)){let r=Object.getOwnPropertyDescriptor(n,t);r.enumerable&&(r.get?ts(e,t,()=>n[t]):rs(e,t,r.value))}}function Wn(...e){let n={};for(let t of e){let r=Object.getOwnPropertyDescriptors(t);Object.assign(n,r)}return Object.defineProperties({},n)}function hp(e){return Wn(e._zod.def)}function gp(e,n){return n?n.reduce((t,r)=>t?.[r],e):e}function bp(e){let n=Object.keys(e),t=n.map(r=>e[r]);return Promise.all(t).then(r=>{let o={};for(let i=0;i<n.length;i++)o[n[i]]=r[i];return o})}function vp(e=10){let n="abcdefghijklmnopqrstuvwxyz",t="";for(let r=0;r<e;r++)t+=n[Math.floor(Math.random()*n.length)];return t}function No(e){return JSON.stringify(e)}function Ao(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/[\s_-]+/g,"-").replace(/^-+|-+$/g,"")}var kr="captureStackTrace"in Error?Error.captureStackTrace:(...e)=>{};function ot(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}var To=bt(()=>{if(on.jitless||typeof navigator<"u"&&navigator?.userAgent?.includes("Cloudflare"))return!1;try{let e=Function;return new e(""),!0}catch{return!1}});function Vn(e){if(ot(e)===!1)return!1;let n=e.constructor;if(n===void 0||typeof n!="function")return!0;let t=n.prototype;return!(ot(t)===!1||Object.prototype.hasOwnProperty.call(t,"isPrototypeOf")===!1)}function os(e){return Vn(e)?{...e}:Array.isArray(e)?[...e]:e instanceof Map?new Map(e):e instanceof Set?new Set(e):e}function yp(e){let n=0;for(let t in e)Object.prototype.hasOwnProperty.call(e,t)&&n++;return n}var _p=e=>{let n=typeof e;switch(n){case"undefined":return"undefined";case"string":return"string";case"number":return Number.isNaN(e)?"nan":"number";case"boolean":return"boolean";case"function":return"function";case"bigint":return"bigint";case"symbol":return"symbol";case"object":return Array.isArray(e)?"array":e===null?"null":e.then&&typeof e.then=="function"&&e.catch&&typeof e.catch=="function"?"promise":typeof Map<"u"&&e instanceof Map?"map":typeof Set<"u"&&e instanceof Set?"set":typeof Date<"u"&&e instanceof Date?"date":typeof File<"u"&&e instanceof File?"file":"object";default:throw new Error(`Unknown data type: ${n}`)}},Eo=new Set(["string","number","symbol"]),is=new Set(["string","number","bigint","boolean","symbol","undefined"]);function In(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function wn(e,n,t){let r=new e._zod.constr(n??e._zod.def);return(!n||t?.parent)&&(r._zod.parent=e),r}function re(e){let n=e;if(!n)return{};if(typeof n=="string")return{error:()=>n};if(n?.message!==void 0){if(n?.error!==void 0)throw new Error("Cannot specify both `message` and `error` params");n.error=n.message}return delete n.message,typeof n.error=="string"?{...n,error:()=>n.error}:n}function wp(e){let n;return new Proxy({},{get(t,r,o){return n??(n=e()),Reflect.get(n,r,o)},set(t,r,o,i){return n??(n=e()),Reflect.set(n,r,o,i)},has(t,r){return n??(n=e()),Reflect.has(n,r)},deleteProperty(t,r){return n??(n=e()),Reflect.deleteProperty(n,r)},ownKeys(t){return n??(n=e()),Reflect.ownKeys(n)},getOwnPropertyDescriptor(t,r){return n??(n=e()),Reflect.getOwnPropertyDescriptor(n,r)},defineProperty(t,r,o){return n??(n=e()),Reflect.defineProperty(n,r,o)}})}function Sr(e){return typeof e=="bigint"?e.toString()+"n":typeof e=="string"?`"${e}"`:`${e}`}function Wo(e){return Object.keys(e).filter(n=>e[n]._zod.optin!==void 0&&e[n]._zod.optout==="optional")}var Bt={safeint:[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],int32:[-2147483648,2147483647],uint32:[0,4294967295],float32:[-34028234663852886e22,34028234663852886e22],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]},zr={int64:[BigInt("-9223372036854775808"),BigInt("9223372036854775807")],uint64:[BigInt(0),BigInt("18446744073709551615")]};function xp(e,n){let t=e._zod.def,r=t.checks;if(r&&r.length>0)throw new Error(".pick() cannot be used on object schemas containing refinements");let i={};return rt(i,e,Zr(e,n)),wn(e,Wn(t,{shape:i,checks:[]}))}function Zr(e,n){let t=En(e),r=[];for(let o of Reflect.ownKeys(n)){if(!Object.getOwnPropertyDescriptor(t,o)?.enumerable)throw new Error(`Unrecognized key: "${String(o)}"`);n[o]&&r.push(o)}return r}function kp(e,n){let t=e._zod.def,r=t.checks;if(r&&r.length>0)throw new Error(".omit() cannot be used on object schemas containing refinements");let i=new Set(Zr(e,n)),s={};return rt(s,e,Reflect.ownKeys(En(e)).filter(c=>!i.has(c))),wn(e,Wn(t,{shape:s,checks:[]}))}function Sp(e,n){if(!Vn(n))throw new Error("Invalid input to extend: expected a plain object");let t=e._zod.def.checks;if(t&&t.length>0){let o=En(e);for(let i of Reflect.ownKeys(n))if(Object.getOwnPropertyDescriptor(o,i)!==void 0)throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.")}return wn(e,Wn(e._zod.def,{shape:ss(e,n)}))}function ss(e,n){let t={};return rt(t,e,Reflect.ownKeys(En(e))),fp(t,n),t}function zp(e,n){if(!Vn(n))throw new Error("Invalid input to safeExtend: expected a plain object");return wn(e,Wn(e._zod.def,{shape:ss(e,n)}))}function Zp(e,n){if(!n?._zod?.def)throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");if(e._zod.def.checks?.length)throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");let t={};rt(t,e,Reflect.ownKeys(En(e))),rt(t,n,Reflect.ownKeys(En(n)));let r=Wn(e._zod.def,{shape:t,get catchall(){return n._zod.def.catchall},checks:n._zod.def.checks??[]});return wn(e,r)}function Cp(e,n,t,r="partial"){let i=n._zod.def.checks;if(i&&i.length>0)throw new Error(`.${r}() cannot be used on object schemas containing refinements`);let c=t?new Set(Zr(n,t)):void 0,l={};return rt(l,n,Reflect.ownKeys(En(n)),e&&((d,u)=>c&&!c.has(u)?d:new e({type:"optional",innerType:d}))),wn(n,Wn(n._zod.def,{shape:l,checks:[]}))}function Pp(e,n,t){let r=t?new Set(Zr(n,t)):void 0,o={};return rt(o,n,Reflect.ownKeys(En(n)),(i,s)=>r&&!r.has(s)?i:new e({type:"nonoptional",innerType:i})),wn(n,Wn(n._zod.def,{shape:o}))}function xn(e,n=0){if(e.aborted===!0)return!0;for(let t=n;t<e.issues.length;t++)if(e.issues[t]?.continue!==!0)return!0;return!1}function Io(e,n=0){if(e.aborted===!0)return!0;for(let t=n;t<e.issues.length;t++)if(e.issues[t]?.continue===!1)return!0;return!1}function Gn(e,n){return n.map(t=>{var r;return(r=t).path??(r.path=[]),t.path.unshift(e),t})}function ft(e){return typeof e=="string"?e:e?.message}function Cr(e){let n=[];for(let t of e??[]){let r=t._zod.def;if(!/_(length|size)$|_equals$/.test(r.check))break;let o=r.maximum??r.length??r.size;o>=0&&n.push([o,t])}return n}function Ft(e,n,t){var r;for(let o=n;o<e.length;o++)(r=e[o]).schema??(r.schema=t)}function kn(e,n,t){var r;let o=e.inst?._zod?.traits;o?.has("$ZodType")&&(o.has("$ZodCheck")?(r=e).schema??(r.schema=e.inst):e.schema=e.inst);let i=e.schema!==e.inst?e.schema?._zod.def?.error:void 0,s=e.message?e.message:ft(e.inst?._zod.def?.error?.(e))??ft(i?.(e))??ft(n?.error?.(e))??ft(t.customError?.(e))??ft(t.localeError?.(e))??"Invalid input",c={};for(let l of Object.keys(e))l==="inst"||l==="schema"||l==="continue"||l==="input"||l==="__proto__"||(c[l]=e[l]);return c.path??(c.path=[]),c.message=s,n?.reportInput&&(c.input=e.input),c}function as(e){return e instanceof Set?"set":e instanceof Map?"map":e instanceof File?"file":"unknown"}var Np=/[\uD800-\uDBFF]/;function Ut(e){let n=e.length;if(!Np.test(e))return n;let t=n;for(let r=0;r<n-1;r++)(e.charCodeAt(r)&64512)===55296&&(e.charCodeAt(r+1)&64512)===56320&&(t--,r++);return t}function Lt(e){return Array.isArray(e)?"array":typeof e=="string"?"string":"unknown"}function Go(e){let n=typeof e;switch(n){case"number":return Number.isNaN(e)?"nan":"number";case"object":{if(e===null)return"null";if(Array.isArray(e))return"array";let t=e;if(t&&Object.getPrototypeOf(t)!==Object.prototype&&"constructor"in t&&t.constructor)return t.constructor.name}}return n}function yt(...e){let[n,t,r]=e;return typeof n=="string"?{message:n,code:"custom",input:t,inst:r}:{...n}}function Ap(e){return Object.entries(e).filter(([n,t])=>Number.isNaN(Number.parseInt(n,10))).map(n=>n[1])}function ls(e){let n=atob(e),t=new Uint8Array(n.length);for(let r=0;r<n.length;r++)t[r]=n.charCodeAt(r);return t}function cs(e){let n="";for(let t=0;t<e.length;t++)n+=String.fromCharCode(e[t]);return btoa(n)}function Tp(e){let n=e.replace(/-/g,"+").replace(/_/g,"/"),t="=".repeat((4-n.length%4)%4);return ls(n+t)}function Ep(e){return cs(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}function Wp(e){let n=e.replace(/^0x/,"");if(n.length%2!==0)throw new Error("Invalid hex string length");let t=new Uint8Array(n.length/2);for(let r=0;r<n.length;r+=2)t[r/2]=Number.parseInt(n.slice(r,r+2),16);return t}function Ip(e){return Array.from(e).map(n=>n.toString(16).padStart(2,"0")).join("")}var zo=class{constructor(...n){}};function Ko(e,n){for(let t in n){let r=Object.getOwnPropertyDescriptor(n,t);r.get?Object.defineProperty(e,t,{...r,enumerable:!1}):Kp(e,t,r.value)}}function Ln(e,n,t,r=!0){return Object.defineProperty(e,n,{configurable:!0,writable:!0,enumerable:r,value:t}),t}function Pr(e,n,t){return Ln(e,n,t,!1)}function Gp(e,n){for(let t in e){let r=e[t];Object.defineProperty(n,t,{configurable:!0,enumerable:!0,get(){return Ln(this,t,r(this))},set(o){Ln(this,t,o)}})}return n}function Kp(e,n,t){Object.defineProperty(e,n,{configurable:!0,get(){return this==null?t:Ln(this,n,t.bind(this))},set(r){Ln(this,n,r)}})}function $p(e,n){let t=Object.getPrototypeOf(e);return n in t?void 0:t}var ko,Un=!1,Op={configurable:!0,get(){Un=!0}};function fe(e,n,t){let r=Object.getPrototypeOf(e._zod);if(n in r&&ko!==e._zod){ko=void 0;return}ko=e._zod,Object.defineProperty(r,n,{configurable:!0,get(){Object.defineProperty(this,n,Op);let o=Un;Un=!1;try{let i=t(this);return Un?delete this[n]:Object.defineProperty(this,n,{configurable:!0,writable:!0,value:i}),Un=Un||o,i}catch(i){throw delete this[n],Un=Un||o,i}},set(o){Object.defineProperty(this,n,{configurable:!0,writable:!0,value:o})}})}function Rp(e,n,t,r){let o=$p(e,n);o&&Object.defineProperty(o,n,{configurable:!0,get(){let i={configurable:!0,writable:!0,enumerable:r,value:void 0};return Object.defineProperty(this,n,i),i.value=t(this),Object.defineProperty(this,n,i),i.value},set(i){Object.defineProperty(this,n,{configurable:!0,writable:!0,enumerable:r,value:i})}})}var ds="~constantCatch";function us(e){let n=()=>e;return n[ds]=!0,n}var ps;var $o={value:void 0,enumerable:!1},ms="captureStackTrace"in Error?Error:null;function Mp(e){let n=ms;if(n){let t=n.stackTraceLimit;if(typeof t=="number"){try{n.stackTraceLimit=0}catch{return ms=null,new e}try{return new e}finally{n.stackTraceLimit=t}}}return new e}function G(e,n,t,r){let o={};function i(f){this.def=f,this.constr=p,this.traits=new Set}i.prototype=o;let s=t,c=s&&new WeakSet;function l(f,m){if(f._zod){if(f._zod.traits.has(e))return}else{$o.value=new i(m);try{Object.defineProperty(f,"_zod",$o)}finally{$o.value=void 0}}if(f._zod.traits.add(e),n(f,m),c){let v=Object.getPrototypeOf(f),b=f._zod.constr.prototype,_=v;for(;_&&_!==b;)_=Object.getPrototypeOf(_);let Z=_??v;c.has(Z)||(c.add(Z),Ko(Z,s))}let y=p.prototype;for(let v in y)Object.prototype.hasOwnProperty.call(y,v)&&(v in f||(f[v]=y[v].bind(f)))}let d=r?.Parent??Object;class u extends d{}Object.defineProperty(u,"name",{value:e});function p(f){let m=r?.Parent?Mp(u):this;l(m,f);let y=m._zod.deferred;if(y){for(let b of y)b();m._zod.deferred=void 0}let v=globalThis.__zod_globalConfig?.postProcessor;return v&&v(m),m}return Object.defineProperty(p,"init",{value:l}),Object.defineProperty(p,Symbol.hasInstance,{value:f=>r?.Parent&&f instanceof r.Parent?!0:f?._zod?.traits?.has(e)}),Object.defineProperty(p,"name",{value:e}),p}var Sn=class extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}},_t=class extends Error{constructor(n){super(`Encountered unidirectional transform during encode: ${n}`),this.name="ZodEncodeError"}};(ps=globalThis).__zod_globalConfig??(ps.__zod_globalConfig={});var on=globalThis.__zod_globalConfig;function dn(e){return e&&Object.assign(on,e),on}function Dp(){let e=this._zod;return e.message??(e.message=JSON.stringify(e.def,gt,2)),e.message}function Hp(e){this._zod.message=e}var Bp={get:Dp,set:Hp,enumerable:!0,configurable:!0},Ro={value:void 0,enumerable:!1},fs=new WeakSet([Object.prototype,Error.prototype]),hs=(e,n)=>{e.name="$ZodError",Ro.value=n,Object.defineProperty(e,"issues",Ro),Ro.value=void 0,Object.defineProperty(e,"message",Bp);let t=Object.getPrototypeOf(e);fs.has(t)||(fs.add(t),Object.defineProperty(t,"toString",{configurable:!0,enumerable:!1,get(){let r=()=>this.message;return Object.defineProperty(this,"toString",{value:r,configurable:!0,writable:!0}),r},set(r){Object.defineProperty(this,"toString",{value:r,configurable:!0,writable:!0})}}))},gs=G("$ZodError",hs),xg=G("$ZodError",hs,void 0,{Parent:Error});function Fp(e,n,t){return Object.prototype.hasOwnProperty.call(e,n)||(n==="__proto__"?Object.defineProperty(e,n,{value:t(),writable:!0,enumerable:!0,configurable:!0}):e[n]=t()),e[n]}function bs(e,n=t=>t.message){let t={},r=[];for(let o of e.issues)o.path.length>0?Fp(t,o.path[0],()=>[]).push(n(o)):r.push(n(o));return{formErrors:r,fieldErrors:t}}function vs(e,n=t=>t.message){let t={_errors:[]},r=(o,i=[])=>{for(let s of o.issues)if(s.code==="invalid_union"&&s.errors.length)s.errors.map(c=>r({issues:c},[...i,...s.path]));else if(s.code==="invalid_key")r({issues:s.issues},[...i,...s.path]);else if(s.code==="invalid_element")r({issues:s.issues},[...i,...s.path]);else{let c=[...i,...s.path];if(c.length===0)t._errors.push(n(s));else{let l=t,d=0;for(;d<c.length;){let u=c[d],p=d===c.length-1;if(u==="_errors"){p&&l._errors.push(n(s)),d++;continue}Object.prototype.hasOwnProperty.call(l,u)||Object.defineProperty(l,u,{value:{_errors:[]},enumerable:!0,writable:!0,configurable:!0});let f=l[u];p&&f._errors.push(n(s)),l=f,d++}}}};return r(e),t}function Nr(e,n){return{callee:n?.callee??e,Err:n?.Err}}var Ar=e=>{let n=(t,r,o,i)=>{let s=o?{...o,async:!1}:{async:!1},c=t._zod.run({value:r,issues:[]},s);if(c instanceof Promise)throw new Sn;if(c.issues.length){let l=new(i?.Err??e)(c.issues.map(d=>kn(d,s,dn())));throw kr(l,i?.callee??n),l}return c.value};return n};var Tr=e=>{let n=async(t,r,o,i)=>{let s=o?{...o,async:!0}:{async:!0},c=t._zod.run({value:r,issues:[]},s);if(c instanceof Promise&&(c=await c),c.issues.length){let l=new(i?.Err??e)(c.issues.map(d=>kn(d,s,dn())));throw kr(l,i?.callee??n),l}return c.value};return n};var Er=e=>(n,t,r)=>{let o=r?{...r,async:!1}:{async:!1},i=n._zod.run({value:t,issues:[]},o);if(i instanceof Promise)throw new Sn;return i.issues.length?ys(e,i.issues,o):{success:!0,data:i.value}};function ys(e,n,t){let r;return{success:!1,get error(){return r||(r=new e(n.map(o=>kn(o,t,dn()))),n=void 0,t=void 0),r},set error(o){r=o,n=void 0,t=void 0}}}var Wr=e=>async(n,t,r)=>{let o=r?{...r,async:!0}:{async:!0},i=n._zod.run({value:t,issues:[]},o);return i instanceof Promise&&(i=await i),i.issues.length?ys(e,i.issues,o):{success:!0,data:i.value}};var Up=Symbol.for("zod.compile.invalid"),Lp=Symbol.for("zod.compile.fallback"),Mo=((e,n,t)=>{let r=e._zod.bag.validator;if(r!==void 0){if(r(n)!==Up)return!0;if(r.definite===!0&&t===void 0)return!1}return Vp(e,n,t)});function Vp(e,n,t){let r=t?{...t,async:!1,abortEarly:!0}:{async:!1,abortEarly:!0},o=e._zod.bag.fallbackRun,i;if(o?(r[Lp]=!0,i=o({value:n,issues:[]},r)):i=e._zod.run({value:n,issues:[]},r),i instanceof Promise)throw new Sn;return i.issues.length===0}var Do=async(e,n,t)=>{let r=t?{...t,async:!0,abortEarly:!0}:{async:!0,abortEarly:!0},o=e._zod.run({value:n,issues:[]},r);return o instanceof Promise&&(o=await o),o.issues.length===0},_s=e=>{let n=Ar(e),t=(r,o,i,s)=>{let c=i?{...i,direction:"backward"}:{direction:"backward"};return n(r,o,c,Nr(t,s))};return t};var ws=e=>{let n=Ar(e),t=(r,o,i,s)=>n(r,o,i,Nr(t,s));return t};var xs=e=>{let n=Tr(e),t=async(r,o,i,s)=>{let c=i?{...i,direction:"backward"}:{direction:"backward"};return await n(r,o,c,Nr(t,s))};return t};var ks=e=>{let n=Tr(e),t=async(r,o,i,s)=>await n(r,o,i,Nr(t,s));return t};var Ss=e=>(n,t,r)=>{let o=r?{...r,direction:"backward"}:{direction:"backward"};return Er(e)(n,t,o)};var zs=e=>(n,t,r)=>Er(e)(n,t,r);var Zs=e=>async(n,t,r)=>{let o=r?{...r,direction:"backward"}:{direction:"backward"};return Wr(e)(n,t,o)};var Cs=e=>async(n,t,r)=>Wr(e)(n,t,r);var Ps=/^[cC][0-9a-z]{6,}$/,Ns=/^[0-9a-z]+$/,As=/^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/,Ts=/^[0-9a-vA-V]{20}$/,Es=/^[A-Za-z0-9]{27}$/,Ws=/^[a-zA-Z0-9_-]{21}$/;function Is(e){return new RegExp(`^[a-zA-Z0-9_-]{${e}}$`)}var Gs=/^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;var Ks=/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,Bo=e=>e?new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`):/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;var $s=/^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;var jp="^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";function Os(){return new RegExp(jp,"u")}var Rs=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,Ms=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;var Ds=/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,Hs=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,Bs=/^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,Fs=/^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/;var Us=/^https?$/,Ls=/^\+[1-9]\d{6,14}$/;var Vs="(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";function qp(e){return new RegExp(`^${e}$`)}var js=qp(Vs);function Ho(e){let n="(?:[01]\\d|2[0-3]):[0-5]\\d";return typeof e.precision=="number"?e.precision===-1?`${n}`:e.precision===0?`${n}:[0-5]\\d`:`${n}:[0-5]\\d\\.\\d{${e.precision}}`:e.seconds?`${n}:[0-5]\\d(?:\\.\\d+)?`:`${n}(?::[0-5]\\d(?:\\.\\d+)?)?`}function qs(e){return new RegExp(`^${Ho(e)}$`)}function Js(e){let n=["Z"];e.offset&&n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");let t=`${Ho({precision:e.precision,seconds:!0})}(?:${n.join("|")})`,r=e.local?`${t}|${Ho({precision:e.precision})}`:t;return new RegExp(`^${Vs}T(?:${r})$`)}var Xs=/^[\s\S]{0,}$/;var Fo=/^-?\d+$/,Vt=/^-?\d+(?:\.\d+)?$/,Ys=/^(?:true|false)$/i,Qs=/^null$/i;var ea=/^[^A-Z]*$/,na=/^[^a-z]*$/;var je=G("$ZodCheck",(e,n)=>{var t;e._zod??(e._zod={}),e._zod.def=n,(t=e._zod).onattach??(t.onattach=[])});var Uo=e=>{let n=e.value;return!Zo(n)&&n.length!==void 0},Ir={number:"number",bigint:"bigint",object:"date"},Lo=G("$ZodCheckLessThan",(e,n)=>{je.init(e,n);let t=Ir[typeof n.value];e._zod.check=r=>{(n.inclusive?r.value<=n.value:r.value<n.value)||r.issues.push({origin:Ir[typeof r.value]??t,code:"too_big",maximum:typeof n.value=="object"?n.value.getTime():n.value,input:r.value,inclusive:n.inclusive,inst:e,continue:!n.abort})}}),Vo=G("$ZodCheckGreaterThan",(e,n)=>{je.init(e,n);let t=Ir[typeof n.value];e._zod.check=r=>{(n.inclusive?r.value>=n.value:r.value>n.value)||r.issues.push({origin:Ir[typeof r.value]??t,code:"too_small",minimum:typeof n.value=="object"?n.value.getTime():n.value,input:r.value,inclusive:n.inclusive,inst:e,continue:!n.abort})}}),ta=G("$ZodCheckMultipleOf",(e,n)=>{je.init(e,n),e._zod.check=t=>{if(typeof t.value!=typeof n.value)throw new Error("Cannot mix number and bigint in multiple_of check.");(typeof t.value=="bigint"?n.value!==BigInt(0)&&t.value%n.value===BigInt(0):Co(t.value,n.value)===0)||t.issues.push({origin:typeof t.value,code:"not_multiple_of",divisor:n.value,input:t.value,inst:e,continue:!n.abort})}}),ra=G("$ZodCheckNumberFormat",(e,n)=>{je.init(e,n),n.format=n.format||"float64";let t=n.format?.includes("int"),r=t?"int":"number",[o,i]=Bt[n.format];e._zod.check=s=>{let c=s.value;if(t){if(!Number.isInteger(c)){s.issues.push({expected:r,format:n.format,code:"invalid_type",continue:!1,input:c,inst:e});return}if(!Number.isSafeInteger(c)){c>0?s.issues.push({input:c,code:"too_big",maximum:Number.MAX_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:r,inclusive:!0,continue:!n.abort}):s.issues.push({input:c,code:"too_small",minimum:Number.MIN_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:r,inclusive:!0,continue:!n.abort});return}}c<o&&s.issues.push({origin:"number",input:c,code:"too_small",minimum:o,inclusive:!0,inst:e,continue:!n.abort}),c>i&&s.issues.push({origin:"number",input:c,code:"too_big",maximum:i,inclusive:!0,inst:e,continue:!n.abort})}});var oa=G("$ZodCheckMaxLength",(e,n)=>{var t;je.init(e,n),(t=e._zod.def).when??(t.when=Uo),e._zod.check=r=>{let o=r.value,i=o.length;if((typeof o=="string"&&i>n.maximum?Ut(o):i)<=n.maximum)return;let c=Lt(o);r.issues.push({origin:c,code:"too_big",maximum:n.maximum,inclusive:!0,input:o,inst:e,continue:!n.abort})}}),ia=G("$ZodCheckMinLength",(e,n)=>{var t;je.init(e,n),(t=e._zod.def).when??(t.when=Uo),e._zod.check=r=>{let o=r.value,i=o.length;if((typeof o=="string"&&i>=n.minimum&&i<n.minimum*2?Ut(o):i)>=n.minimum)return;let c=Lt(o);r.issues.push({origin:c,code:"too_small",minimum:n.minimum,inclusive:!0,input:o,inst:e,continue:!n.abort})}}),sa=G("$ZodCheckLengthEquals",(e,n)=>{var t;je.init(e,n),(t=e._zod.def).when??(t.when=Uo),e._zod.check=r=>{let o=r.value,i=o.length,s=typeof o=="string"&&i>=n.length&&i<=n.length*2?Ut(o):i;if(s===n.length)return;let c=Lt(o),l=s>n.length;r.issues.push({origin:c,...l?{code:"too_big",maximum:n.length}:{code:"too_small",minimum:n.length},inclusive:!0,exact:!0,input:r.value,inst:e,continue:!n.abort})}}),qt=G("$ZodCheckStringFormat",(e,n)=>{var t,r;je.init(e,n),n.pattern?(t=e._zod).check??(t.check=o=>{n.pattern.lastIndex=0,!n.pattern.test(o.value)&&o.issues.push({origin:"string",code:"invalid_format",format:n.format,input:o.value,...n.pattern?{pattern:n.pattern.toString()}:{},inst:e,continue:!n.abort})}):(r=e._zod).check??(r.check=()=>{})}),aa=G("$ZodCheckRegex",(e,n)=>{qt.init(e,n),e._zod.check=t=>{n.pattern.lastIndex=0,!n.pattern.test(t.value)&&t.issues.push({origin:"string",code:"invalid_format",format:"regex",input:t.value,pattern:n.pattern.toString(),inst:e,continue:!n.abort})}}),la=G("$ZodCheckLowerCase",(e,n)=>{n.pattern??(n.pattern=ea),qt.init(e,n)}),ca=G("$ZodCheckUpperCase",(e,n)=>{n.pattern??(n.pattern=na),qt.init(e,n)}),da=G("$ZodCheckIncludes",(e,n)=>{je.init(e,n);let t=In(n.includes),r=new RegExp(typeof n.position=="number"?`^.{${n.position},}${t}`:t);n.pattern=r,e._zod.check=o=>{o.value.includes(n.includes,n.position)||o.issues.push({origin:"string",code:"invalid_format",format:"includes",includes:n.includes,input:o.value,inst:e,continue:!n.abort})}}),ua=G("$ZodCheckStartsWith",(e,n)=>{je.init(e,n);let t=new RegExp(`^${In(n.prefix)}.*`);n.pattern??(n.pattern=t),e._zod.check=r=>{r.value.startsWith(n.prefix)||r.issues.push({origin:"string",code:"invalid_format",format:"starts_with",prefix:n.prefix,input:r.value,inst:e,continue:!n.abort})}}),pa=G("$ZodCheckEndsWith",(e,n)=>{je.init(e,n);let t=new RegExp(`.*${In(n.suffix)}$`);n.pattern??(n.pattern=t),e._zod.check=r=>{r.value.endsWith(n.suffix)||r.issues.push({origin:"string",code:"invalid_format",format:"ends_with",suffix:n.suffix,input:r.value,inst:e,continue:!n.abort})}});var ma=G("$ZodCheckOverwrite",(e,n)=>{je.init(e,n),e._zod.check=t=>{t.value=n.tx(t.value)}});var Gr=class{constructor(n=[],t={}){this.content=[],this.indent=0,this.args=n,this.closed=t}indented(n){this.indent+=1;try{n(this)}finally{this.indent-=1}}write(n){if(typeof n=="function"){n(this,{execution:"sync"}),n(this,{execution:"async"});return}let r=n.split(`
`).filter(s=>s),o=Math.min(...r.map(s=>s.length-s.trimStart().length)),i=r.map(s=>s.slice(o)).map(s=>" ".repeat(this.indent*2)+s);for(let s of i)this.content.push(s)}compile(){let n=Function,t=this?.content??[""];return new n(...Object.keys(this.closed),`return function (${this.args.join(", ")}) {
${t.join(`
`)}
};`)(...Object.values(this.closed))}};var ha={major:4,minor:6,patch:7};var ke=G("$ZodType",(e,n)=>{var t;e??(e={}),e._zod.def=n,e._zod.bag=e._zod.bag||{},e._zod.version=ha;let r=e._zod.def.checks,o=e._zod.traits.has("$ZodCheck")?[e,...r??[]]:r?.length?[...r]:[];for(let i of o)for(let s of i._zod.onattach)s(e);if(o.length===0)(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{let i=(c,l,d)=>{if(c.memo)return c;let u=xn(c),p;for(let f of l){if(f._zod.def.when){if(Io(c)||!f._zod.def.when(c))continue}else if(u)continue;let m=c.issues.length,y=f._zod.check(c);if(y instanceof Promise&&d?.async===!1)throw new Sn;if(p||y instanceof Promise)p=(p??Promise.resolve()).then(async()=>{await y,c.issues.length!==m&&(Ft(c.issues,m,e),u||(u=xn(c,m)))});else{if(c.issues.length===m)continue;Ft(c.issues,m,e),u||(u=xn(c,m))}}return p?p.then(()=>c):c},s=(c,l,d)=>{if(xn(c))return c.aborted=!0,c;let u=i(l,o,d);if(u instanceof Promise){if(d.async===!1)throw new Sn;return u.then(p=>e._zod.parse(p,d))}return e._zod.parse(u,d)};e._zod.run=(c,l)=>{if(l.skipChecks)return e._zod.parse(c,l);if(l.direction==="backward"){let u=e._zod.parse({value:c.value,issues:[]},{...l,skipChecks:!0});return u instanceof Promise?u.then(p=>s(p,c,l)):s(u,c,l)}let d=e._zod.parse(c,l);if(d instanceof Promise){if(l.async===!1)throw new Sn;return d.then(u=>i(u,o,l))}return i(d,o,l)}}},{get"~standard"(){return Pr(this,"~standard",qo(this))},set"~standard"(e){Ln(this,"~standard",e)}}),Za=(e,n)=>e.issues.length?{issues:e.issues.map(t=>kn(t,n,dn()))}:{value:e.value};async function Jp(e,n){let t={async:!0};return Za(await e._zod.run({value:n,issues:[]},t),t)}function qo(e){return{validate:n=>{let t={async:!1};try{let r=e._zod.run({value:n,issues:[]},t);if(!(r instanceof Promise))return Za(r,t)}catch{}return Jp(e,n)},vendor:"zod",version:1}}var Rr=G("$ZodString",(e,n)=>{ke.init(e,n),e._zod.pattern=n.pattern??Xs,e._zod.parse=(t,r)=>{if(n.coerce)try{t.value=String(t.value)}catch{}return typeof t.value=="string"||t.issues.push({expected:"string",code:"invalid_type",input:t.value,inst:e}),t}}),ze=G("$ZodStringFormat",(e,n)=>{qt.init(e,n),Rr.init(e,n)}),Ca=G("$ZodGUID",(e,n)=>{n.pattern??(n.pattern=Ks),ze.init(e,n)}),Pa=G("$ZodUUID",(e,n)=>{if(n.version){let r={v1:1,v2:2,v3:3,v4:4,v5:5,v6:6,v7:7,v8:8}[n.version];if(r===void 0)throw new Error(`Invalid UUID version: "${n.version}"`);n.pattern??(n.pattern=Bo(r))}else n.pattern??(n.pattern=Bo());ze.init(e,n)}),Na=G("$ZodEmail",(e,n)=>{n.pattern??(n.pattern=$s),ze.init(e,n)}),Aa=1,$r=2;function Ta(e){try{return typeof URL<"u"&&typeof URL.canParse=="function"?URL.canParse(e):(new URL(e),!0)}catch{return!1}}function Xp(e,n){return!("normalize"in n)&&!("hostname"in n)&&!("protocol"in n)?Ta(e)||$r:Yp(e,n)}function Yp(e,n){if(!n.normalize&&n.protocol?.source===Us.source&&!/^https?:\/\//i.test(e))return Aa;try{if(typeof URL<"u"){let t=URL;if(typeof t.parse=="function")return t.parse(e)??$r}return new URL(e)}catch{return $r}}var Qp=/[\t\n\r]/g;function ga(e){return e.replace(Qp,"")}function em(e,n){return n.lastIndex=0,n.test(e.hostname)}function nm(e,n){return n.lastIndex=0,n.test(e.protocol.endsWith(":")?e.protocol.slice(0,-1):e.protocol)}var Ea=G("$ZodURL",(e,n)=>{ze.init(e,n),e._zod.check=t=>{try{let r=t.value.trim(),o=Xp(r,n);if(o===Aa){t.issues.push({code:"invalid_format",format:"url",note:"Invalid URL format",input:t.value,inst:e,continue:!n.abort});return}if(o===$r){t.issues.push({code:"invalid_format",format:"url",input:t.value,inst:e,continue:!n.abort});return}if(o===!0){t.value=ga(r);return}n.hostname&&!em(o,n.hostname)&&t.issues.push({code:"invalid_format",format:"url",note:"Invalid hostname",pattern:n.hostname.source,input:t.value,inst:e,continue:!n.abort}),n.protocol&&!nm(o,n.protocol)&&t.issues.push({code:"invalid_format",format:"url",note:"Invalid protocol",pattern:n.protocol.source,input:t.value,inst:e,continue:!n.abort}),t.value=n.normalize?o.href:ga(r);return}catch{t.issues.push({code:"invalid_format",format:"url",input:t.value,inst:e,continue:!n.abort})}}}),Wa=G("$ZodEmoji",(e,n)=>{n.pattern??(n.pattern=Os()),ze.init(e,n)}),Ia=G("$ZodNanoID",(e,n)=>{if(n.length!==void 0&&(!Number.isInteger(n.length)||n.length<1))throw new Error(`Invalid nanoid length: ${n.length}`);n.pattern??(n.pattern=n.length===void 0?Ws:Is(n.length)),ze.init(e,n)}),Ga=G("$ZodCUID",(e,n)=>{n.pattern??(n.pattern=Ps),ze.init(e,n)}),Ka=G("$ZodCUID2",(e,n)=>{n.pattern??(n.pattern=Ns),ze.init(e,n)}),$a=G("$ZodULID",(e,n)=>{n.pattern??(n.pattern=As),ze.init(e,n)}),Oa=G("$ZodXID",(e,n)=>{n.pattern??(n.pattern=Ts),ze.init(e,n)}),Ra=G("$ZodKSUID",(e,n)=>{n.pattern??(n.pattern=Es),ze.init(e,n)}),Ma=G("$ZodISODateTime",(e,n)=>{n.pattern??(n.pattern=Js(n)),ze.init(e,n)}),Da=G("$ZodISODate",(e,n)=>{n.pattern??(n.pattern=js),ze.init(e,n)}),Ha=G("$ZodISOTime",(e,n)=>{n.pattern??(n.pattern=qs(n)),ze.init(e,n)}),Ba=G("$ZodISODuration",(e,n)=>{n.pattern??(n.pattern=Gs),ze.init(e,n)}),Fa=G("$ZodIPv4",(e,n)=>{n.pattern??(n.pattern=Rs),ze.init(e,n)}),tm=/^[0-9a-fA-F:.]+$/;function Ua(e){return tm.test(e)?Ta(`http://[${e}]`):!1}var La=G("$ZodIPv6",(e,n)=>{n.pattern??(n.pattern=Ms),ze.init(e,n),e._zod.check=t=>{Ua(t.value)||t.issues.push({code:"invalid_format",format:"ipv6",input:t.value,inst:e,continue:!n.abort})}});var Va=G("$ZodCIDRv4",(e,n)=>{n.pattern??(n.pattern=Ds),ze.init(e,n)});function rm(e){let n=e.split("/");if(n.length!==2)return!1;let[t,r]=n;if(!r)return!1;let o=Number(r);return`${o}`!==r||o<0||o>128?!1:Ua(t)}var ja=G("$ZodCIDRv6",(e,n)=>{n.pattern??(n.pattern=Hs),ze.init(e,n),e._zod.check=t=>{rm(t.value)||t.issues.push({code:"invalid_format",format:"cidrv6",input:t.value,inst:e,continue:!n.abort})}});function qa(e){if(e==="")return!0;if(/\s/.test(e)||e.length%4!==0)return!1;try{return atob(e),!0}catch{return!1}}var Jo=/^[0-9a-zA-Z+/]*={0,2}$/,Ja=G("$ZodBase64",(e,n)=>{n.pattern??(n.pattern=Jo),ze.init(e,n),e._zod.check=t=>{qa(t.value)||t.issues.push({code:"invalid_format",format:"base64",input:t.value,inst:e,continue:!n.abort})}}),Mr=/^[A-Za-z0-9_-]*$/;function om(e){if(!Mr.test(e))return!1;let n=e.replace(/[-_]/g,r=>r==="-"?"+":"/"),t=n.padEnd(Math.ceil(n.length/4)*4,"=");return qa(t)}var Xa=G("$ZodBase64URL",(e,n)=>{n.pattern??(n.pattern=Mr),ze.init(e,n),e._zod.check=t=>{om(t.value)||t.issues.push({code:"invalid_format",format:"base64url",input:t.value,inst:e,continue:!n.abort})}}),Ya=G("$ZodE164",(e,n)=>{n.pattern??(n.pattern=Ls),ze.init(e,n)});function im(e,n=null){try{let t=e.split(".");if(t.length!==3)return!1;let[r]=t;if(!r)return!1;let o=JSON.parse(atob(r));return!("typ"in o&&o?.typ!=="JWT"||!o.alg||n&&(!("alg"in o)||o.alg!==n))}catch{return!1}}var Qa=G("$ZodJWT",(e,n)=>{ze.init(e,n),e._zod.check=t=>{im(t.value,n.alg)||t.issues.push({code:"invalid_format",format:"jwt",input:t.value,inst:e,continue:!n.abort})}});var Xo=G("$ZodNumber",(e,n)=>{ke.init(e,n),e._zod.pattern=Vt,e._zod.parse=(t,r)=>{if(n.coerce)try{t.value=Number(t.value)}catch{}let o=t.value;if(typeof o=="number"&&!Number.isNaN(o)&&Number.isFinite(o))return t;let i=typeof o=="number"?Number.isNaN(o)?"NaN":Number.isFinite(o)?void 0:String(o):void 0;return t.issues.push({expected:"number",code:"invalid_type",input:o,inst:e,...i?{received:i}:{}}),t}}),el=G("$ZodNumberFormat",(e,n)=>{ra.init(e,n),Xo.init(e,n)}),nl=G("$ZodBoolean",(e,n)=>{ke.init(e,n),e._zod.pattern=Ys,e._zod.parse=(t,r)=>{if(n.coerce)try{t.value=!!t.value}catch{}let o=t.value;return typeof o=="boolean"||t.issues.push({expected:"boolean",code:"invalid_type",input:o,inst:e}),t}});var tl=G("$ZodNull",(e,n)=>{ke.init(e,n),e._zod.pattern=Qs,e._zod.values=new Set([null]),e._zod.parse=(t,r)=>{let o=t.value;return o===null||t.issues.push({expected:"null",code:"invalid_type",input:o,inst:e}),t}});var rl=G("$ZodUnknown",(e,n)=>{ke.init(e,n),e._zod.parse=t=>t}),ol=G("$ZodNever",(e,n)=>{ke.init(e,n),e._zod.parse=(t,r)=>(t.issues.push({expected:"never",code:"invalid_type",input:t.value,inst:e}),t)});function sm(e,n){let t=Cr(e._zod.def.checks);if(!t.length)return;let r=Math.min(...t.map(i=>i[0])),o=e._zod.parse;e._zod.parse=(i,s)=>{let c=n(i.value);if(c>r&&!s?.skipChecks&&s?.direction!=="backward"){for(let[l,d]of Cr(e._zod.def.checks))if(c>l&&d._zod.def.when(i)){let u=i.issues.length;return d._zod.check(i),i.issues[u].continue=!1,Ft(i.issues,u,e),i}}return o(i,s)}}var am=e=>Array.isArray(e)?e.length:-1;function ba(e,n,t){e.issues.length&&n.issues.push(...Gn(t,e.issues)),n.value[t]=e.value}var il=G("$ZodArray",(e,n)=>{ke.init(e,n);let t=on.memoizer;t?.attach(e),e._zod.parse=(r,o)=>{let i=r.value;if(!Array.isArray(i))return r.issues.push({expected:"array",code:"invalid_type",input:i,inst:e}),r;r.value=t?t.alloc(e,r,Array(i.length),o):Array(i.length);let s=[],c=o?.abortEarly;for(let l=0;l<i.length;l++){let d=i[l],u=n.element._zod.run({value:d,issues:[]},o);if(u instanceof Promise)s.push(u.then(p=>ba(p,r,l)));else if(ba(u,r,l),c&&u.issues.length!==0&&xn(u))break}return s.length?Promise.all(s).then(()=>r):r},sm(e,am)});function Or(e,n,t,r,o,i){let s=t in r,c=i==="optional";if(!(!s&&c&&o==="optional")){if(e.issues.length){if(o!==void 0&&c&&!s)return;n.issues.push(...Gn(t,e.issues))}if(!s&&o===void 0){e.issues.length||n.issues.push({code:"invalid_type",expected:"nonoptional",input:void 0,path:[t]});return}e.value===void 0?(s||o==="defaulted"&&!c)&&(n.value[t]=void 0):n.value[t]=e.value}}var lm=[];function sl(e){let n=Object.keys(e.shape),t=Object.getOwnPropertySymbols(e.shape),r=t.length?t:lm,o=r.length?[...n,...r]:n;for(let s of o)if(!e.shape?.[s]?._zod?.traits?.has("$ZodType"))throw new Error(`Invalid element at key "${String(s)}": expected a Zod schema`);let i=Wo(e.shape);return{...e,allKeys:o,symbolKeys:r,keySet:new Set(n),numKeys:n.length,optionalKeys:new Set(i)}}function al(e,n,t,r,o,i,s){let c=[],l=o.keySet,d=o.catchall._zod,u=d.def.type,p=d.optin,f=d.optout,m=0;for(let y in n){if(s&&t.issues.length!==m){if(xn(t,m))break;m=t.issues.length}if(l.has(y))continue;if(y==="__proto__"){u==="never"&&c.push(y);continue}if(u==="never"){c.push(y);continue}let v=d.run({value:n[y],issues:[]},r);v instanceof Promise?e.push(v.then(b=>Or(b,t,y,n,p,f))):Or(v,t,y,n,p,f)}return c.length&&t.issues.push({code:"unrecognized_keys",keys:c,input:n,inst:i,continue:!0}),e.length?Promise.all(e).then(()=>t):t}var cm=G("$ZodObject",(e,n)=>{ke.init(e,n);let t=Object.getOwnPropertyDescriptor(n,"shape"),r=t?.get?t.get.raw:n.shape??{};if(r){let d=()=>{let u={...r};return Object.defineProperty(n,"shape",{value:u}),d.raw=u,u};d.raw=r,Object.defineProperty(n,"shape",{get:d})}let o=bt(()=>sl(n));fe(e,"propValues",d=>{let u=d.def.shape,p={};for(let f in u){let m=u[f]._zod;if(m.values){Object.prototype.hasOwnProperty.call(p,f)||cn(p,f,new Set);for(let y of m.values)p[f].add(y);m.optin!==void 0&&p[f].add(void 0)}}return p});let i=ot,s=n.catchall,c,l=on.memoizer;l?.attach(e),e._zod.parse=(d,u)=>{c??(c=o.value);let p=d.value;if(!i(p))return d.issues.push({expected:"object",code:"invalid_type",input:p,inst:e}),d;d.value=l?l.alloc(e,d,{},u):{};let f=[],m=c.shape,y=u?.abortEarly,v=d.issues.length;for(let b of c.allKeys){if(y&&d.issues.length!==v){if(xn(d,v))break;v=d.issues.length}if(b==="__proto__")continue;let _=m[b],Z=_._zod.optin,K=_._zod.optout,O=_._zod.run({value:p[b],issues:[]},u);O instanceof Promise?f.push(O.then(N=>Or(N,d,b,p,Z,K))):Or(O,d,b,p,Z,K)}return s?al(f,p,d,u,o.value,e,y===!0):f.length?Promise.all(f).then(()=>d):d}}),ll=G("$ZodObjectJIT",(e,n)=>{cm.init(e,n);let t=e._zod.parse,r=bt(()=>sl(n)),o=on.memoizer,i=m=>{let y=r.value,v=y.symbolKeys,b=new Gr(["payload","ctx"],{shape:m,inst:e,memo:o,syms:v}),_=N=>`shape[${N}]._zod.run({ value: input[${N}], issues: [] }, ctx)`,Z=(N,T)=>`
          let ${N}_ab = false;
          for (let i = 0; i < ${N}.issues.length; i++) {
            const iss = ${N}.issues[i];
            iss.path = iss.path ? [${T}, ...iss.path] : [${T}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${N}_ab = true;
          }
          if (${N}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;b.write("const input = payload.value;");let K=Object.create(null),O=0;for(let N of y.allKeys)K[N]=`key_${O++}`;b.write(o?"const newResult = memo.alloc(inst, payload, {}, ctx);":"const newResult = {};");for(let N of y.allKeys){if(N==="__proto__")continue;let T=K[N],P=typeof N=="symbol"?`syms[${v.indexOf(N)}]`:No(N),E=`${P} in input`,k=m[N],S=k?._zod?.optin,C=S!==void 0,R=k?._zod?.optout==="optional";if(b.write(`const ${T} = ${_(P)};`),C&&R){let z=S==="optional"?`${T}_present`:`${T}.value !== undefined || ${T}_present`;b.write(`
        const ${T}_present = ${E};
        if (!${T}.issues.length || ${T}_present) {
          if (${T}.issues.length) {${Z(T,P)}
          }

          if (${z}) {
            newResult[${P}] = ${T}.value;
          }
        }

      `)}else C?(b.write(`
        if (${T}.issues.length) {${Z(T,P)}
        }
      `),S==="defaulted"?b.write(`newResult[${P}] = ${T}.value;`):b.write(`
        if (${T}.value !== undefined || ${E}) {
          newResult[${P}] = ${T}.value;
        }
      `)):b.write(`
        const ${T}_present = ${E};
        if (${T}.issues.length) {${Z(T,P)}
        }
        if (!${T}_present && !${T}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${P}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${T}_present) {
          newResult[${P}] = ${T}.value;
        }

      `)}return b.write("payload.value = newResult;"),b.write("return payload;"),b.compile()},s,c=ot,l=!on.jitless,u=l&&To.value,p=n.catchall,f;e._zod.parse=(m,y)=>{f??(f=r.value);let v=m.value;return c(v)?l&&u&&y?.async===!1&&y.jitless!==!0?(s||(s=i(n.shape)),m=s(m,y),p?al([],v,m,y,f,e,y?.abortEarly===!0):m):t(m,y):(m.issues.push({expected:"object",code:"invalid_type",input:v,inst:e}),m)}});function va(e,n,t,r){for(let i of e)if(i.issues.length===0)return n.value=i.value,n;let o=e.filter(i=>!xn(i));return o.length===1?(n.value=o[0].value,o[0]):(n.issues.push({code:"invalid_union",input:n.value,inst:t,errors:e.map(i=>i.issues.map(s=>kn(s,r,dn())))}),n)}var Yo=G("$ZodUnion",(e,n)=>{ke.init(e,n),fe(e,"optin",r=>r.def.options.some(o=>o._zod.optin==="defaulted")?"defaulted":r.def.options.some(o=>o._zod.optin!==void 0)?"optional":void 0),fe(e,"optout",r=>r.def.options.some(o=>o._zod.optout==="optional")?"optional":void 0),fe(e,"values",r=>{if(r.def.options.every(o=>o._zod.values))return new Set(r.def.options.flatMap(o=>Array.from(o._zod.values)))}),fe(e,"pattern",r=>{if(r.def.options.every(o=>o._zod.pattern)){let o=r.def.options.map(i=>i._zod.pattern);return new RegExp(`^(${o.map(i=>Ht(i.source)).join("|")})$`)}});let t=n.options.length===1?n.options[0]._zod.run:null;e._zod.parse=(r,o)=>{if(t)return t(r,o);let i=!1,s=[];for(let c of n.options){let l=c._zod.run({value:r.value,issues:[]},o);if(l instanceof Promise)s.push(l),i=!0;else{if(l.issues.length===0)return l;s.push(l)}}return i?Promise.all(s).then(c=>va(c,r,e,o)):va(s,r,e,o)}});function dm(e){let n=new Map;for(let t of e.options){let r=t._zod.propValues?.[e.discriminator];if(!r||r.size===0)throw new Error(`Invalid discriminated union option at index "${e.options.indexOf(t)}"`);for(let o of r)if(n.has(o)){if(o!==void 0)throw new Error(`Duplicate discriminator value "${String(o)}"`);n.set(o,null)}else n.set(o,t)}return n}var cl=G("$ZodDiscriminatedUnion",(e,n)=>{n.inclusive=!1,Yo.init(e,n);let t=e._zod.parse;fe(e,"propValues",o=>{let i={},s=0;for(let c of o.def.options){let l=c._zod.propValues;if(!l||Object.keys(l).length===0)throw new Error(`Invalid discriminated union option at index "${o.def.options.indexOf(c)}"`);l[o.def.discriminator]?.has(void 0)&&s++;for(let[d,u]of Object.entries(l)){Object.prototype.hasOwnProperty.call(i,d)||cn(i,d,new Set);for(let p of u)i[d].add(p)}}return!o.def.unionFallback&&s>1&&i[o.def.discriminator]?.delete(void 0),i}),n.options.forEach((o,i)=>{let s=vt(o._zod.def);if(s&&!Object.prototype.hasOwnProperty.call(s,n.discriminator))throw new Error(`Invalid discriminated union option at index "${i}"`)});let r=bt(()=>dm(n));e._zod.parse=(o,i)=>{let s=o.value;if(!ot(s))return o.issues.push({code:"invalid_type",expected:"object",input:s,inst:e}),o;let c=s?.[n.discriminator],l=r.value.get(c);return l&&(c!==void 0||i.direction!=="backward")?l._zod.run(o,i):n.unionFallback||i.direction==="backward"?t(o,i):(o.issues.push({code:"invalid_union",errors:[],note:"No matching discriminator",discriminator:n.discriminator,options:Array.from(r.value.keys()).filter(d=>r.value.get(d)!==null),input:s,path:[n.discriminator],inst:e}),o)}}),dl=G("$ZodIntersection",(e,n)=>{ke.init(e,n),e._zod.parse=(t,r)=>{let o=t.value,i=n.left._zod.run({value:o,issues:[]},r),s=n.right._zod.run({value:o,issues:[]},r);return i instanceof Promise||s instanceof Promise?Promise.all([i,s]).then(([l,d])=>ya(t,l,d)):ya(t,i,s)}});function jo(e,n){if(e===n)return{valid:!0,data:e};if(e instanceof Date&&n instanceof Date&&+e==+n)return{valid:!0,data:e};if(Vn(e)&&Vn(n)){let t=Object.keys(n),r=Object.keys(e).filter(i=>t.indexOf(i)!==-1),o={...e,...n};Object.prototype.hasOwnProperty.call(o,"__proto__")&&delete o.__proto__;for(let i of r){if(i==="__proto__")continue;let s=jo(e[i],n[i]);if(!s.valid)return{valid:!1,mergeErrorPath:[i,...s.mergeErrorPath]};o[i]=s.data}return{valid:!0,data:o}}if(Array.isArray(e)&&Array.isArray(n)){if(e.length!==n.length)return{valid:!1,mergeErrorPath:[]};let t=[];for(let r=0;r<e.length;r++){let o=e[r],i=n[r],s=jo(o,i);if(!s.valid)return{valid:!1,mergeErrorPath:[r,...s.mergeErrorPath]};t.push(s.data)}return{valid:!0,data:t}}return{valid:!1,mergeErrorPath:[]}}function ya(e,n,t){let r=new Map,o,i=new Map,s=(d,u)=>{let p;if(d.code==="unrecognized_keys"&&!d.path?.length)o??(o=d),p=d.keys;else if(d.code==="invalid_key"&&d.origin==="record"&&d.path?.length===1){let f=String(d.path[0]);i.has(f)||i.set(f,d),p=[f]}else return!1;for(let f of p)r.has(f)||r.set(f,{}),r.get(f)[u]=!0;return!0};for(let d of n.issues)s(d,"l")||e.issues.push(d);for(let d of t.issues)s(d,"r")||e.issues.push(d);let c=[...r].filter(([,d])=>d.l&&d.r).map(([d])=>d);if(c.length){let d=o?c.filter(u=>o.keys.includes(u)):[];d.length&&e.issues.push({...o,keys:d});for(let u of c)!d.includes(u)&&i.has(u)&&e.issues.push(i.get(u))}let l=jo(n.value,t.value);if(!l.valid){if(xn(e))return e;throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(l.mergeErrorPath)}`)}return e.value=l.data,e}var ul=G("$ZodRecord",(e,n)=>{ke.init(e,n);let t=on.memoizer;t?.attach(e),e._zod.parse=(r,o)=>{let i=r.value;if(!Vn(i))return r.issues.push({expected:"record",code:"invalid_type",input:i,inst:e}),r;let s=[],c=n.keyType._zod.values;if(c&&!n.partial){r.value=t?t.alloc(e,r,{},o):{};let l=new Set;for(let u of c)if(typeof u=="string"||typeof u=="number"||typeof u=="symbol"){if(l.add(typeof u=="number"?u.toString():u),u==="__proto__")continue;let p=n.keyType._zod.run({value:u,issues:[]},o);if(p instanceof Promise)throw new Error("Async schemas not supported in object keys currently");if(p.issues.length){r.issues.push({code:"invalid_key",origin:"record",issues:p.issues.map(y=>kn(y,o,dn())),input:u,path:[u],inst:e});continue}let f=p.value;if(f==="__proto__")continue;let m=n.valueType._zod.run({value:i[u],issues:[]},o);m instanceof Promise?s.push(m.then(y=>{y.issues.length&&r.issues.push(...Gn(u,y.issues)),r.value[f]=y.value})):(m.issues.length&&r.issues.push(...Gn(u,m.issues)),r.value[f]=m.value)}let d;for(let u in i)if(!l.has(u))if(n.mode==="loose"){if(u==="__proto__")continue;r.value[u]=i[u]}else d=d??[],d.push(u);d&&d.length>0&&r.issues.push({code:"unrecognized_keys",input:i,inst:e,keys:d,continue:!0})}else{r.value=t?t.alloc(e,r,{},o):{};let l;for(let d of Reflect.ownKeys(i)){if(d==="__proto__"||!Object.prototype.propertyIsEnumerable.call(i,d))continue;let u=n.keyType._zod.run({value:d,issues:[]},o);if(u instanceof Promise)throw new Error("Async schemas not supported in object keys currently");if(typeof d=="string"&&Vt.test(d)&&u.issues.length){let y=n.keyType._zod.run({value:Number(d),issues:[]},o);if(y instanceof Promise)throw new Error("Async schemas not supported in object keys currently");y.issues.length===0&&(u=y)}if(u.issues.length){n.mode==="loose"?r.value[d]=i[d]:c?(l=l??[],l.push(d)):r.issues.push({code:"invalid_key",origin:"record",issues:u.issues.map(y=>kn(y,o,dn())),input:d,path:[d],inst:e});continue}let f=u.value;if(f==="__proto__")continue;let m=n.valueType._zod.run({value:i[d],issues:[]},o);m instanceof Promise?s.push(m.then(y=>{y.issues.length&&r.issues.push(...Gn(d,y.issues)),r.value[f]=y.value})):(m.issues.length&&r.issues.push(...Gn(d,m.issues)),r.value[f]=m.value)}l&&l.length>0&&r.issues.push({code:"unrecognized_keys",input:i,inst:e,keys:l,continue:!0})}return s.length?Promise.all(s).then(()=>r):r}});var pl=G("$ZodEnum",(e,n)=>{ke.init(e,n);let t=ht(n.entries),r=new Set(t);e._zod.values=r,fe(e,"pattern",o=>{let i=ht(o.def.entries).filter(s=>Eo.has(typeof s));return new RegExp(i.length?`^(${i.map(s=>In(s.toString())).join("|")})$`:"^[^\\s\\S]$")}),e._zod.parse=(o,i)=>{let s=o.value;return r.has(s)||o.issues.push({code:"invalid_value",values:t,input:s,inst:e}),o}}),ml=G("$ZodLiteral",(e,n)=>{ke.init(e,n);let t=new Set(n.values);e._zod.values=t,fe(e,"pattern",r=>{let o=r.def.values;return new RegExp(o.length?`^(${o.map(i=>typeof i=="string"?In(i):i?In(i.toString()):String(i)).join("|")})$`:"^[^\\s\\S]$")}),e._zod.parse=(r,o)=>{let i=r.value;return t.has(i)||r.issues.push({code:"invalid_value",values:n.values,input:i,inst:e}),r}});var fl=G("$ZodTransform",(e,n)=>{ke.init(e,n),e._zod.optin="optional",on.memoizer?.guard(e),e._zod.parse=(t,r)=>{if(r.direction==="backward")throw new _t(e.constructor.name);let o=n.transform(t.value,t);if(r.async)return(o instanceof Promise?o:Promise.resolve(o)).then(s=>(t.value=s,t));if(o instanceof Promise)throw new Sn;return t.value=o,t}});function _a(e,n){return e.value=n.issues.length?void 0:n.value,e}var Qo=G("$ZodOptional",(e,n)=>{ke.init(e,n),fe(e,"optin",t=>t.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),e._zod.optout="optional",fe(e,"values",t=>{let r=t.def.innerType._zod.values;return r?new Set([...r,void 0]):void 0}),fe(e,"pattern",t=>{let r=t.def.innerType._zod.pattern;return r?new RegExp(`^(${Ht(r.source)})?$`):void 0}),e._zod.parse=(t,r)=>{if(t.value===void 0){if(n.innerType._zod.optin!=="defaulted")return t;let o=n.innerType._zod.run({value:t.value,issues:[]},r);return o instanceof Promise?o.then(i=>_a(t,i)):_a(t,o)}return n.innerType._zod.run(t,r)}}),hl=G("$ZodExactOptional",(e,n)=>{Qo.init(e,n),fe(e,"values",t=>t.def.innerType._zod.values),fe(e,"pattern",t=>t.def.innerType._zod.pattern),e._zod.parse=(t,r)=>n.innerType._zod.run(t,r)}),gl=G("$ZodNullable",(e,n)=>{ke.init(e,n),fe(e,"optin",t=>t.def.innerType._zod.optin),fe(e,"optout",t=>t.def.innerType._zod.optout),fe(e,"pattern",t=>{let r=t.def.innerType._zod.pattern;return r?new RegExp(`^(${Ht(r.source)}|null)$`):void 0}),fe(e,"values",t=>t.def.innerType._zod.values?new Set([...t.def.innerType._zod.values,null]):void 0),e._zod.parse=(t,r)=>t.value===null?t:n.innerType._zod.run(t,r)}),bl=G("$ZodDefault",(e,n)=>{ke.init(e,n),e._zod.optin="defaulted",fe(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,r)=>{if(r.direction==="backward")return n.innerType._zod.run(t,r);if(t.value===void 0)return t.value=n.defaultValue,t;let o=n.innerType._zod.run(t,r);return o instanceof Promise?o.then(i=>wa(i,n)):wa(o,n)}});function wa(e,n){return e.value===void 0&&(e.value=n.defaultValue),e}var vl=G("$ZodPrefault",(e,n)=>{ke.init(e,n),e._zod.optin="defaulted",fe(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,r)=>(r.direction==="backward"||t.value===void 0&&(t.value=n.defaultValue),n.innerType._zod.run(t,r))}),yl=G("$ZodNonOptional",(e,n)=>{ke.init(e,n),fe(e,"values",t=>{let r=t.def.innerType._zod.values;return r?new Set([...r].filter(o=>o!==void 0)):void 0}),e._zod.parse=(t,r)=>{let o=n.innerType._zod.run(t,r);return o instanceof Promise?o.then(i=>xa(i,e)):xa(o,e)}});function xa(e,n){return!e.issues.length&&e.value===void 0&&e.issues.push({code:"invalid_type",expected:"nonoptional",input:e.value,inst:n}),e}function ka(e,n,t,r){return n.issues.length?(e.value=t.catchValue({...n,value:e.value,error:{issues:n.issues.map(o=>kn(o,r,dn()))},input:e.value}),e):(e.value=n.value,n.memo&&(e.memo=!0),e)}var _l=G("$ZodCatch",(e,n)=>{ke.init(e,n),fe(e,"optin",t=>t.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),fe(e,"optout",t=>t.def.innerType._zod.optout),fe(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,r)=>{if(r.direction==="backward")return n.innerType._zod.run(t,r);let o=n.innerType._zod.run({value:t.value,issues:[]},r);return o instanceof Promise?o.then(i=>ka(t,i,n,r)):ka(t,o,n,r)}});var wl=G("$ZodPipe",(e,n)=>{ke.init(e,n),fe(e,"values",t=>t.def.in._zod.values),fe(e,"optin",t=>t.def.in._zod.optin),fe(e,"optout",t=>t.def.out._zod.optout),fe(e,"propValues",t=>t.def.in._zod.propValues),e._zod.parse=(t,r)=>{if(r.direction==="backward"){let i=n.out._zod.run(t,r);return i instanceof Promise?i.then(s=>Kr(s,n.in,r)):Kr(i,n.in,r)}let o=n.in._zod.run(t,r);return o instanceof Promise?o.then(i=>Kr(i,n.out,r)):Kr(o,n.out,r)}});function Kr(e,n,t){return e.issues.some(r=>r.code!=="unrecognized_keys")?(e.aborted=!0,e):n._zod.run({value:e.value,issues:e.issues},t)}var xl=G("$ZodReadonly",(e,n)=>{ke.init(e,n),fe(e,"propValues",t=>t.def.innerType._zod.propValues),fe(e,"values",t=>t.def.innerType._zod.values),fe(e,"optin",t=>t.def.innerType?._zod?.optin),fe(e,"optout",t=>t.def.innerType?._zod?.optout),e._zod.parse=(t,r)=>{if(r.direction==="backward")return n.innerType._zod.run(t,r);let o=n.innerType._zod.run(t,r);return o instanceof Promise?o.then(Sa):Sa(o)}});function Sa(e){return e.memo||(e.value=Object.freeze(e.value)),e}var kl=G("$ZodLazy",(e,n)=>{ke.init(e,n),Po(e._zod,"innerType",()=>{let t=n;return t._cachedInner||(t._cachedInner=n.getter()),t._cachedInner}),fe(e,"pattern",t=>t.innerType?._zod?.pattern),fe(e,"propValues",t=>t.innerType?._zod?.propValues),fe(e,"optin",t=>t.innerType?._zod?.optin??void 0),fe(e,"optout",t=>t.innerType?._zod?.optout??void 0),e._zod.parse=(t,r)=>e._zod.innerType._zod.run(t,r)}),Sl=G("$ZodCustom",(e,n)=>{je.init(e,n),ke.init(e,n),e._zod.parse=(t,r)=>t,e._zod.check=t=>{let r=t.value,o=n.fn(r);if(o instanceof Promise)return o.then(i=>za(i,t,r,e));za(o,t,r,e)}});function za(e,n,t,r){if(!e){let o={code:"custom",input:t,inst:r,path:[...r._zod.def.path??[]],continue:!r._zod.def.abort};r._zod.def.params&&(o.params=r._zod.def.params),n.issues.push(yt(o))}}var ni=class extends Error{constructor(){super("Cannot parse a reference cycle that closes through a transform"),this.name="ZodCyclicError"}},ti="~memo",zl=[];function Zl(e){return e!==null&&typeof e=="object"}function ei(e){return e.map(n=>n.path?{...n,path:n.path.slice()}:{...n})}var Cl=new WeakMap,Jt=0,Br=1,Xt=2;function Fr(e,n,t){let r=Cl.get(e);if(r!==void 0)return r?Xt:Jt;if(n.has(e))return Xt;n.add(e);let o=Jt,i=u=>{if(o!==Xt&&u?._zod){let p=Fr(u,n,t);p>o&&(o=p)}},s=(u,p)=>{let f=Jt;for(let m of Reflect.ownKeys(u)){let y=Object.getOwnPropertyDescriptor(u,m);if(p&&!y.enumerable)continue;let v=y.get?Br:y.value?._zod?Fr(y.value,n,t):Jt;v>f&&(f=v)}return f},c=u=>{u>o&&(o=u)},l=e._zod.def,d=l.type;switch(d){case"object":{let u=vt(l);c(u?s(u,!0):Br),i(l.catchall);break}case"array":i(l.element);break;case"tuple":for(let u of l.items)i(u);i(l.rest);break;case"record":case"map":i(l.keyType),i(l.valueType);break;case"set":i(l.valueType);break;case"union":for(let u of l.options)i(u);break;case"intersection":i(l.left),i(l.right);break;case"optional":case"nullable":case"default":case"prefault":case"catch":case"readonly":case"nonoptional":case"promise":case"success":i(l.innerType);break;case"pipe":i(l.in),i(l.out);break;case"function":i(l.input),i(l.output);break;case"lazy":{let u=l._cachedInner??(t?e._zod.innerType:void 0);c(u?Fr(u,n,!1):Br);break}case"template_literal":case"string":case"number":case"int":case"boolean":case"bigint":case"symbol":case"undefined":case"null":case"void":case"never":case"any":case"unknown":case"date":case"nan":case"enum":case"literal":case"file":case"transform":case"custom":break;default:for(let u in l){let p=Object.getOwnPropertyDescriptor(l,u);if(!p||p.get)continue;let f=p.value;if(!(!f||typeof f!="object")){if(f._zod)i(f);else if(Array.isArray(f))for(let m of f)i(m)}}}return n.delete(e),um(e,o)}function um(e,n){return n!==Br&&Cl.set(e,n===Xt),n}function pm(e,n){let t=e.buckets.get(n);return t||(t=new WeakMap,e.buckets.set(n,t)),t}var Dr,Hr=[],mm={alloc(e,n,t){let r=Dr;if(!r)return t;Dr=void 0;let o={value:t,issues:null};return r.set(n.value,o),Hr.push(o),t},guard(e){var n;(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred.push(()=>{let t=e._zod.parse,r=(o,i)=>{if(i.direction!=="backward"&&fm(i,o.value))throw new ni;return t(o,i)};e._zod.parse=r,e._zod.run===t&&(e._zod.run=r)})},attach(e){var n;let t,r=!1,o,i;(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred.push(()=>{let s=e._zod.parse,c=(l,d)=>{if(t===void 0){let _=Fr(e,new Set,!1);if(_===Jt)return e._zod.parse=s,e._zod.run===c&&(e._zod.run=s),s(l,d);_===Xt||r?t=!0:r=!0}let u=l.value;if(!Zl(u))return s(l,d);let p=d[ti];p||(p={buckets:new WeakMap,backEdges:void 0},d[ti]=p);let f;o===d?f=i:(f=pm(p,e),o=d,i=f);let m=f.get(u);if(m)return l.value=m.value,m.issues?m.issues.length&&l.issues.push(...ei(m.issues)):(l.memo=!0,p.backEdges??(p.backEdges=new WeakSet),p.backEdges.add(m.value)),l;Dr=f;let y=Hr.length,v=s(l,d);Dr=void 0;let b=Hr.length>y?Hr.pop():void 0;return v instanceof Promise?v.then(_=>(b&&(b.issues=_.issues.length?ei(_.issues):zl),_)):(b&&(b.issues=v.issues.length?ei(v.issues):zl),v)};e._zod.parse=c,e._zod.run===s&&(e._zod.run=c)})}};function Pl(){return mm}function fm(e,n){let t=e[ti]?.backEdges;return t!==void 0&&Zl(n)&&t.has(n)}var hm=()=>{let e={string:{unit:"characters",verb:"to have"},file:{unit:"bytes",verb:"to have"},array:{unit:"items",verb:"to have"},set:{unit:"items",verb:"to have"},map:{unit:"entries",verb:"to have"}};function n(i){return e[i]??null}let t={regex:"input",email:"email address",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO datetime",date:"ISO date",time:"ISO time",duration:"ISO duration",ipv4:"IPv4 address",ipv6:"IPv6 address",mac:"MAC address",cidrv4:"IPv4 range",cidrv6:"IPv6 range",base64:"base64-encoded string",base64url:"base64url-encoded string",json_string:"JSON string",e164:"E.164 number",currency_code:"currency code",credit_card:"credit card number",iban:"IBAN",jwt:"JWT",template_literal:"input"},r={nan:"NaN"};function o(i,s){return i==="number"&&typeof s=="number"&&!Number.isFinite(s)?String(s):r[i]??i}return i=>{switch(i.code){case"invalid_type":{let s=o(i.expected),c=Go(i.input),l=o(c,i.input);return`Invalid input: expected ${s}, received ${l}`}case"invalid_value":return i.values.length===1?`Invalid input: expected ${Sr(i.values[0])}`:`Invalid option: expected one of ${xr(i.values,"|")}`;case"too_big":{let s=i.exact?"exactly ":i.inclusive?"<=":"<",c=n(i.origin);return c?`Too big: expected ${i.origin??"value"} to have ${s}${i.maximum.toString()} ${c.unit??"elements"}`:`Too big: expected ${i.origin??"value"} to be ${s}${i.maximum.toString()}`}case"too_small":{let s=i.exact?"exactly ":i.inclusive?">=":">",c=n(i.origin);return c?`Too small: expected ${i.origin} to have ${s}${i.minimum.toString()} ${c.unit}`:`Too small: expected ${i.origin} to be ${s}${i.minimum.toString()}`}case"invalid_format":{let s=i;return s.format==="starts_with"?`Invalid string: must start with "${s.prefix}"`:s.format==="ends_with"?`Invalid string: must end with "${s.suffix}"`:s.format==="includes"?`Invalid string: must include "${s.includes}"`:s.format==="regex"?`Invalid string: must match pattern ${s.pattern}`:`Invalid ${t[s.format]??i.format}`}case"not_multiple_of":return`Invalid number: must be a multiple of ${i.divisor}`;case"unrecognized_keys":return`Unrecognized key${i.keys.length>1?"s":""}: ${xr(i.keys,", ")}`;case"invalid_key":return`Invalid key in ${i.origin}`;case"invalid_union":return i.options&&Array.isArray(i.options)&&i.options.length>0?`Invalid discriminator value. Expected ${i.options.map(c=>`'${c}'`).join(" | ")}`:i.inclusive===!1?"Invalid input: more than one option matched":"Invalid input";case"invalid_element":return`Invalid value in ${i.origin}`;default:return"Invalid input"}}};function Nl(){return{localeError:hm()}}var Al;var ri=class{constructor(){this._map=new WeakMap,this._idmap=new Map}add(n,...t){let r=t[0];return this._map.set(n,r),r&&typeof r=="object"&&"id"in r&&this._idmap.set(r.id,n),this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(n){let t=this._map.get(n);return t&&typeof t=="object"&&"id"in t&&this._idmap.delete(t.id),this._map.delete(n),this}get(n){let t=n._zod.parent;if(t){let r={...this.get(t)??{}};delete r.id;let o={...r,...this._map.get(n)};return Object.keys(o).length?o:void 0}return this._map.get(n)}has(n){return this._map.has(n)}};function gm(){return new ri}(Al=globalThis).__zod_globalRegistry??(Al.__zod_globalRegistry=gm());var it=globalThis.__zod_globalRegistry;function Tl(e){return e.checks&&(e.checks=[...e.checks]),e}function El(e,n){return new e(Tl({type:"string",...re(n)}))}function Wl(e,n){return new e({type:"string",format:"email",check:"string_format",abort:!1,...re(n)})}function Il(e,n){return new e({type:"string",format:"guid",check:"string_format",abort:!1,...re(n)})}function Gl(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,...re(n)})}function Kl(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v4",...re(n)})}function $l(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v6",...re(n)})}function Ol(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v7",...re(n)})}function Rl(e,n){return new e({type:"string",format:"url",check:"string_format",abort:!1,...re(n)})}function Ml(e,n){return new e({type:"string",format:"emoji",check:"string_format",abort:!1,...re(n)})}function Dl(e,n){return new e({type:"string",format:"nanoid",check:"string_format",abort:!1,...re(n)})}function Hl(e,n){return new e({type:"string",format:"cuid",check:"string_format",abort:!1,...re(n)})}function Bl(e,n){return new e({type:"string",format:"cuid2",check:"string_format",abort:!1,...re(n)})}function Fl(e,n){return new e({type:"string",format:"ulid",check:"string_format",abort:!1,...re(n)})}function Ul(e,n){return new e({type:"string",format:"xid",check:"string_format",abort:!1,...re(n)})}function Ll(e,n){return new e({type:"string",format:"ksuid",check:"string_format",abort:!1,...re(n)})}function Vl(e,n){return new e({type:"string",format:"ipv4",check:"string_format",abort:!1,...re(n)})}function jl(e,n){return new e({type:"string",format:"ipv6",check:"string_format",abort:!1,...re(n)})}function ql(e,n){return new e({type:"string",format:"cidrv4",check:"string_format",abort:!1,...re(n)})}function Jl(e,n){return new e({type:"string",format:"cidrv6",check:"string_format",abort:!1,...re(n)})}function Xl(e,n){return new e({type:"string",format:"base64",check:"string_format",abort:!1,...re(n)})}function Yl(e,n){return new e({type:"string",format:"base64url",check:"string_format",abort:!1,...re(n)})}function Ql(e,n){return new e({type:"string",format:"e164",check:"string_format",abort:!1,...re(n)})}function ec(e,n){return new e({type:"string",format:"jwt",check:"string_format",abort:!1,...re(n)})}function nc(e,n){return new e({type:"string",format:"datetime",check:"string_format",offset:!1,local:!1,precision:null,...re(n)})}function tc(e,n){return new e({type:"string",format:"date",check:"string_format",...re(n)})}function rc(e,n){return new e({type:"string",format:"time",check:"string_format",precision:null,...re(n)})}function oc(e,n){return new e({type:"string",format:"duration",check:"string_format",...re(n)})}function ic(e,n){return new e(Tl({type:"number",checks:[],...re(n)}))}function sc(e,n){return new e({type:"number",check:"number_format",abort:!1,format:"safeint",...re(n)})}function ac(e,n){return new e({type:"boolean",...re(n)})}function lc(e,n){return new e({type:"null",...re(n)})}function cc(e){return new e({type:"unknown"})}function dc(e,n){return new e({type:"never",...re(n)})}function Ur(e,n){return new Lo({check:"less_than",...re(n),value:e,inclusive:!1})}function Yt(e,n){return new Lo({check:"less_than",...re(n),value:e,inclusive:!0})}function Lr(e,n){return new Vo({check:"greater_than",...re(n),value:e,inclusive:!1})}function Qt(e,n){return new Vo({check:"greater_than",...re(n),value:e,inclusive:!0})}function Vr(e,n){return new ta({check:"multiple_of",...re(n),value:e})}function jr(e,n){return new oa({check:"max_length",...re(n),maximum:e})}function wt(e,n){return new ia({check:"min_length",...re(n),minimum:e})}function qr(e,n){return new sa({check:"length_equals",...re(n),length:e})}function oi(e,n){return new aa({check:"string_format",format:"regex",...re(n),pattern:e})}function ii(e){return new la({check:"string_format",format:"lowercase",...re(e)})}function si(e){return new ca({check:"string_format",format:"uppercase",...re(e)})}function ai(e,n){return new da({check:"string_format",format:"includes",...re(n),includes:e})}function li(e,n){return new ua({check:"string_format",format:"starts_with",...re(n),prefix:e})}function ci(e,n){return new pa({check:"string_format",format:"ends_with",...re(n),suffix:e})}function jn(e){return new ma({check:"overwrite",tx:e})}function di(e){return jn(n=>n.normalize(e))}function ui(){return jn(e=>e.trim())}function pi(){return jn(e=>e.toLowerCase())}function mi(){return jn(e=>e.toUpperCase())}function fi(){return jn(e=>Ao(e))}function uc(e,n,t){return new e({type:"array",element:n,...re(t)})}function pc(e,n,t){return new e({type:"custom",check:"custom",fn:n,...re(t)})}function mc(e,n){let t=bm(r=>(r.addIssue=o=>{if(typeof o=="string")r.issues.push(yt(o,r.value,t._zod.def));else{let i=o;i.fatal&&(i.continue=!1),i.code??(i.code="custom"),"input"in i||(i.input=r.value),i.inst??(i.inst=t),i.continue??(i.continue=!t._zod.def.abort),r.issues.push(yt(i))}},e(r.value,r)),n);return t}function bm(e,n){let t=new je({check:"custom",...re(n)});return t._zod.check=e,t}function er(e,...n){for(let t of n)for(let r of Reflect.ownKeys(t))Object.prototype.propertyIsEnumerable.call(t,r)&&cn(e,r,t[r]);return e}function gi(e){let n=e?.target??"draft-2020-12";return n==="draft-4"&&(n="draft-04"),n==="draft-7"&&(n="draft-07"),{processors:e.processors??{},metadataRegistry:e?.metadata??it,target:n,unrepresentable:e?.unrepresentable??"throw",override:e?.override??(()=>{}),io:e?.io??"output",counter:0,seen:new Map,sharedDefsExtractedFor:void 0,sharedEmitDoneFor:void 0,cycles:e?.cycles??"ref",reused:e?.reused??"inline",intersections:[],deferred:[],external:e?.external??void 0}}function Kn(e,n,t,r,o){let i=typeof n.unrepresentable=="function"?n.unrepresentable({zodSchema:e,path:r.path,message:o}):n.unrepresentable;if(i==="any")return!1;if(i===void 0||i==="throw")throw new Error(o);return Object.assign(t,i),!0}function We(e,n,t={path:[],schemaPath:[]}){var r;let o=e._zod.def,i=n.seen.get(e);if(i)return i.count++,t.schemaPath.includes(e)&&(i.cycle=t.path),i.schema;let s={schema:{},count:1,cycle:void 0,path:t.path};n.seen.set(e,s),n.sharedDefsExtractedFor=void 0,n.sharedEmitDoneFor=void 0;let c=e._zod.toJSONSchema?.();if(c)s.schema=c;else{let u={...t,schemaPath:[...t.schemaPath,e],path:t.path};if(e._zod.processJSONSchema)e._zod.processJSONSchema(n,s.schema,u);else{let f=s.schema,m=n.processors[o.type];if(!m)throw new Error(`[toJSONSchema]: Non-representable type encountered: ${o.type}`);m(e,n,f,u)}let p=e._zod.parent;p&&(s.ref||(s.ref=p),We(p,n,u),n.seen.get(p).isParent=!0)}let l=n.metadataRegistry.get(e);return l&&er(s.schema,l),n.io==="input"&&nn(e)&&(delete s.schema.examples,delete s.schema.default),n.io==="input"&&"_prefault"in s.schema&&((r=s.schema).default??(r.default=s.schema._prefault)),delete s.schema._prefault,n.seen.get(e).schema}function fc(e){return e.replace(/~/g,"~0").replace(/\//g,"~1")}function bi(e,n){let t=e.seen.get(n);if(!t)throw new Error("Unprocessed schema. This is a bug in Zod.");if(e.external&&e.sharedDefsExtractedFor===e.external)return;let r=new Map;for(let s of e.seen.entries()){let c=e.metadataRegistry.get(s[0])?.id;if(c){let l=r.get(c);if(l&&l!==s[0])throw new Error(`Duplicate schema id "${c}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);r.set(c,s[0])}}let o=s=>{let c=e.target==="draft-2020-12"?"$defs":"definitions";if(e.external){let p=e.external.registry.get(s[0])?.id,f=e.external.uri??(y=>y);if(p)return{ref:f(p)};let m=s[1].defId??s[1].schema.id??`schema${e.counter++}`;return s[1].defId=m,{defId:m,ref:`${f("__shared")}#/${c}/${fc(m)}`}}let l="#",d=`${l}/${c}/`;if(s[1]===t&&!s[1].schema.id)return{ref:l};let u=s[1].schema.id??`__schema${e.counter++}`;return{defId:u,ref:d+fc(u)}},i=s=>{if(s[1].schema.$ref)return;let c=s[1],{ref:l,defId:d}=o(s);c.def={...c.schema},d&&(c.defId=d);let u=c.schema;for(let p in u)delete u[p];u.$ref=l};if(e.cycles==="throw")for(let s of e.seen.entries()){let c=s[1];if(c.cycle)throw new Error(`Cycle detected: #/${c.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`)}for(let s of e.seen.entries()){let c=s[1];if(n===s[0]){i(s);continue}if(e.external){let d=e.external.registry.get(s[0])?.id;if(n!==s[0]&&d){i(s);continue}}if(e.metadataRegistry.get(s[0])?.id){i(s);continue}if(c.cycle){i(s);continue}c.count>1&&e.reused==="ref"&&i(s)}e.external&&(e.sharedDefsExtractedFor=e.external)}function bc(e){let n=e.anyOf;if(!Array.isArray(n)||n.length===0||e.type!==void 0)return;let t=[];for(let r of n){if(!r||typeof r!="object")return;bc(r);let o=Object.keys(r);if(o.length!==1||o[0]!=="type")return;let i=r.type;for(let s of Array.isArray(i)?i:[i]){if(typeof s!="string")return;t.includes(s)||t.push(s)}}delete e.anyOf,e.type=t.length===1?t[0]:t}var vc=new Set(["type","properties","required","additionalProperties"]),hc=["oneOf","anyOf"];function gc(e){let n=e.additionalProperties;return n===void 0||n===!1||typeof n!="object"||n===null?null:Object.keys(n).length?n:null}function hi(e){let n=[];for(let i of e){if(typeof i!="object"||i.type!=="object")return null;for(let s in i)if(!vc.has(s))return null;n.push(i)}let t={},r=new Set;for(let i of n){for(let s in i.properties){if(Object.prototype.hasOwnProperty.call(t,s))continue;let c=[];for(let d of n){let u=d.properties?.[s]??gc(d);u!=null&&(c.some(p=>JSON.stringify(p)===JSON.stringify(u))||c.push(u))}let l=c.length===1?c[0]:hi(c)??{allOf:c};cn(t,s,l)}for(let s of i.required??[])r.add(s)}let o={type:"object",properties:t};if(r.size&&(o.required=[...r]),n.every(i=>i.additionalProperties===!1))o.additionalProperties=!1;else{let i=[];for(let s of n){let c=gc(s);c&&!i.some(l=>JSON.stringify(l)===JSON.stringify(c))&&i.push(c)}i.length===1?o.additionalProperties=i[0]:i.length>1&&(o.additionalProperties={allOf:i})}return o}function vm(e){let n=e.allOf;if(!Array.isArray(n)||n.length<2)return;for(let o of vc)if(o in e)return;let t=n.filter(o=>hc.some(i=>Array.isArray(o[i]))),r=null;if(!t.length)r=hi(n);else{let o=t[0],i=hc.find(l=>Array.isArray(o[l]));if(Object.keys(o).length!==1)return;let s=n.filter(l=>l!==o),c=o[i].map(l=>hi([...s,l]));if(c.some(l=>!l))return;r={[i]:c}}r&&(delete e.allOf,er(e,r))}function vi(e,n){let t=e.seen.get(n);if(!t)throw new Error("Unprocessed schema. This is a bug in Zod.");let r=c=>{let l=e.seen.get(c);if(l.ref===null)return;let d=l.def??l.schema,u={...d},p=l.ref;if(l.ref=null,p){r(p);let m=e.seen.get(p),y=m.schema;if(y.$ref&&(e.target==="draft-07"||e.target==="draft-04"||e.target==="openapi-3.0")?(d.allOf=d.allOf??[],d.allOf.push(y)):er(d,y),er(d,u),c._zod.parent===p)for(let b in d)b==="$ref"||b==="allOf"||b in u||delete d[b];if(y.$ref&&m.def)for(let b in d)b==="$ref"||b==="allOf"||b in m.def&&JSON.stringify(d[b])===JSON.stringify(m.def[b])&&delete d[b]}let f=c._zod.parent;if(f&&f!==p){r(f);let m=e.seen.get(f);if(m?.schema.$ref&&(d.$ref=m.schema.$ref,m.def))for(let y in d)y==="$ref"||y==="allOf"||y in m.def&&JSON.stringify(d[y])===JSON.stringify(m.def[y])&&delete d[y]}e.override({zodSchema:c,jsonSchema:d,path:l.path??[]})};if(!e.external||e.sharedEmitDoneFor!==e.external){for(let c of[...e.seen.entries()].reverse())r(c[0]);if(e.target!=="openapi-3.0")for(let c of e.seen.entries())bc(c[1].def??c[1].schema);for(let c of e.deferred)c();if(e.intersections.length){let c=new Map;for(let l of e.seen.values())for(let d of[l.schema,l.def]){let u=d?.allOf;if(!Array.isArray(u))continue;let p=c.get(u);p?p.push(d):c.set(u,[d])}for(let l of e.intersections)for(let d of c.get(l)??[])vm(d)}}let o={};if(e.target==="draft-2020-12"?o.$schema="https://json-schema.org/draft/2020-12/schema":e.target==="draft-07"?o.$schema="http://json-schema.org/draft-07/schema#":e.target==="draft-04"?o.$schema="http://json-schema.org/draft-04/schema#":e.target,e.external?.uri){let c=e.external.registry.get(n)?.id;if(!c)throw new Error("Schema is missing an `id` property");o.$id=e.external.uri(c)}er(o,t.defId?t.schema:t.def??t.schema);let i=e.metadataRegistry.get(n)?.id;i!==void 0&&o.id===i&&delete o.id;let s=e.external?.defs??{};if(!e.external||e.sharedEmitDoneFor!==e.external)for(let c of e.seen.entries()){let l=c[1];l.def&&l.defId&&(l.def.id===l.defId&&delete l.def.id,cn(s,l.defId,l.def))}e.external&&(e.sharedEmitDoneFor=e.external),e.external||Object.keys(s).length>0&&(e.target==="draft-2020-12"?o.$defs=s:o.definitions=s);try{let c=JSON.parse(JSON.stringify(o));return Object.defineProperty(c,"~standard",{value:{...n["~standard"],jsonSchema:{input:nr(n,"input",e.processors),output:nr(n,"output",e.processors)}},enumerable:!1,writable:!1}),c}catch{throw new Error("Error converting schema to JSON.")}}function nn(e,n){let t=n??{seen:new Set};if(t.seen.has(e))return!1;t.seen.add(e);let r=e._zod.def;if(r.type==="transform")return!0;if(r.type==="array")return nn(r.element,t);if(r.type==="set")return nn(r.valueType,t);if(r.type==="lazy")return nn(r.getter(),t);if(r.type==="promise"||r.type==="optional"||r.type==="nonoptional"||r.type==="nullable"||r.type==="readonly"||r.type==="default"||r.type==="prefault"||r.type==="catch")return nn(r.innerType,t);if(r.type==="intersection")return nn(r.left,t)||nn(r.right,t);if(r.type==="record"||r.type==="map")return nn(r.keyType,t)||nn(r.valueType,t);if(r.type==="pipe")return e._zod.traits.has("$ZodCodec")?!0:nn(r.in,t)||nn(r.out,t);if(r.type==="object"){for(let o in r.shape)if(nn(r.shape[o],t))return!0;return!1}if(r.type==="union"){for(let o of r.options)if(nn(o,t))return!0;return!1}if(r.type==="tuple"){for(let o of r.items)if(nn(o,t))return!0;return!!(r.rest&&nn(r.rest,t))}return!1}var yc=(e,n={})=>t=>{let r=gi({...t,processors:n});return We(e,r),bi(r,e),vi(r,e)},nr=(e,n,t={})=>r=>{let{libraryOptions:o,target:i}=r??{},s=gi({...o??{},target:i,io:n,processors:t});return We(e,s),bi(s,e),vi(s,e)};var xt=(e,n,t)=>{(e[n]===void 0||t>e[n])&&(e[n]=t)},kt=(e,n,t)=>{(e[n]===void 0||t<e[n])&&(e[n]=t)},_c=(e,n)=>{xt(e,"minimum",n),kt(e,"maximum",n)},Sc=(e,n)=>{e.multipleOf??(e.multipleOf=[]),e.multipleOf.includes(n)||e.multipleOf.push(n)},zc=(e,n)=>{e.patterns??(e.patterns=new Set),e.patterns.add(n)},Zc=(e,n)=>{e.mime=e.mime?e.mime.filter(t=>n.includes(t)):[...n]},Cc=(e,n)=>{e.format=n,n.includes("int")&&(e.isInt=!0)},wc=(e,n)=>xt(e,"minimum",n.minimum),xc=(e,n)=>kt(e,"maximum",n.maximum),kc=e=>(n,t)=>{Cc(n,t.format);let[r,o]=e[t.format];xt(n,"minimum",r),kt(n,"maximum",o)},ym={greater_than:(e,n)=>xt(e,n.inclusive?"minimum":"exclusiveMinimum",n.value),less_than:(e,n)=>kt(e,n.inclusive?"maximum":"exclusiveMaximum",n.value),multiple_of:(e,n)=>Sc(e,n.value),number_format:kc(Bt),bigint_format:kc(zr),min_length:wc,max_length:xc,length_equals:(e,n)=>_c(e,n.length),min_size:wc,max_size:xc,size_equals:(e,n)=>_c(e,n.size),string_format:(e,n)=>{Cc(e,n.format),n.pattern&&zc(e,n.pattern),(n.format==="base64"||n.format==="base64url")&&(e.contentEncoding=n.format),(n.local||n.precision===-1)&&(e.laxFormat=!0)},mime_type:(e,n)=>Zc(e,n.mime)};function gn(e){let n={},t=e._zod.def,r=e._zod.traits.has("$ZodCheck")?[e,...t.checks??[]]:t.checks??[];for(let i of r)ym[i._zod.def.check]?.(n,i._zod.def);let o=e._zod.bag;o.minimum!==void 0&&xt(n,"minimum",o.minimum),o.exclusiveMinimum!==void 0&&xt(n,"exclusiveMinimum",o.exclusiveMinimum),o.maximum!==void 0&&kt(n,"maximum",o.maximum),o.exclusiveMaximum!==void 0&&kt(n,"exclusiveMaximum",o.exclusiveMaximum),o.multipleOf!==void 0&&Sc(n,o.multipleOf),o.format!==void 0&&(n.format??(n.format=o.format),o.format.includes("int")&&(n.isInt=!0)),o.mime&&Zc(n,o.mime);for(let i of o.patterns??[])zc(n,i);return n}var _m={guid:"uuid",url:"uri",datetime:"date-time",json_string:"json-string",regex:""},wm=new Map([[Jo,Bs],[Mr,Fs]]),Pc=e=>wm.get(e)??e,Nc=(e,n,t,r)=>{let o=t;o.type="string";let{minimum:i,maximum:s,format:c,patterns:l,contentEncoding:d,laxFormat:u}=gn(e);if(typeof i=="number"&&(o.minLength=i),typeof s=="number"&&(o.maxLength=s),c&&(o.format=_m[c]??c,o.format===""&&delete o.format,(c==="time"||u)&&delete o.format),d&&(o.contentEncoding=d),l&&l.size>0){let p=[...l].map(Pc);p.length===1?o.pattern=p[0].source:p.length>1&&(o.allOf=[...p.map(f=>({...n.target==="draft-07"||n.target==="draft-04"||n.target==="openapi-3.0"?{type:"string"}:{},pattern:f.source}))])}},Ac=(e,n,t,r)=>{let o=t,{minimum:i,maximum:s,multipleOf:c,exclusiveMaximum:l,exclusiveMinimum:d,isInt:u}=gn(e);o.type=u?"integer":"number";let p=typeof d=="number"&&d>=(i??Number.NEGATIVE_INFINITY),f=typeof l=="number"&&l<=(s??Number.POSITIVE_INFINITY),m=n.target==="draft-04"||n.target==="openapi-3.0";if(p?m?(o.minimum=d,o.exclusiveMinimum=!0):o.exclusiveMinimum=d:typeof i=="number"&&(o.minimum=i),f?m?(o.maximum=l,o.exclusiveMaximum=!0):o.exclusiveMaximum=l:typeof s=="number"&&(o.maximum=s),c){let y=new Set;for(let _ of c)Number.isFinite(_)&&_!==0?y.add(Math.abs(_)):Kn(e,n,o,r,`A multipleOf divisor of ${_} cannot be represented in JSON Schema`);let[v,...b]=y;v!==void 0&&(o.multipleOf=v),b.length&&(o.allOf=[...o.allOf??[],...b.map(_=>({multipleOf:_}))])}},Tc=(e,n,t,r)=>{t.type="boolean"};var Ec=(e,n,t,r)=>{n.target==="openapi-3.0"?(t.type="string",t.nullable=!0,t.enum=[null]):t.type="null"};var Wc=(e,n,t,r)=>{t.not={}};var Ic=(e,n,t,r)=>{};var Gc=(e,n,t,r)=>{let o=e._zod.def,i=ht(o.entries);if(i.length===0){t.not={};return}i.every(s=>typeof s=="number")&&(t.type="number"),i.every(s=>typeof s=="string")&&(t.type="string"),t.enum=i},Kc=(e,n,t,r)=>{let o=e._zod.def;if(o.values.length===0){t.not={};return}let i=[];for(let s of o.values)if(s===void 0){if(Kn(e,n,t,r,"Literal `undefined` cannot be represented in JSON Schema"))return}else if(typeof s=="bigint"){if(Kn(e,n,t,r,"BigInt literals cannot be represented in JSON Schema"))return;i.push(Number(s))}else i.push(s);if(i.length!==0)if(i.length===1){let s=i[0];t.type=s===null?"null":typeof s,n.target==="draft-04"||n.target==="openapi-3.0"?t.enum=[s]:t.const=s}else i.every(s=>typeof s=="number")&&(t.type="number"),i.every(s=>typeof s=="string")&&(t.type="string"),i.every(s=>typeof s=="boolean")&&(t.type="boolean"),i.every(s=>s===null)&&(t.type="null"),t.enum=i};var $c=(e,n,t,r)=>{Kn(e,n,t,r,"Custom types cannot be represented in JSON Schema")};var Oc=(e,n,t,r)=>{Kn(e,n,t,r,"Transforms cannot be represented in JSON Schema")};var Rc=(e,n,t,r)=>{let o=t,i=e._zod.def,{minimum:s,maximum:c}=gn(e);typeof s=="number"&&(o.minItems=s),typeof c=="number"&&(o.maxItems=c),o.type="array",o.items=We(i.element,n,{...r,path:[...r.path,"items"]})};function Jr(e){let n=e._zod.def;return n.type==="pipe"&&n.in._zod.traits.has("$ZodTransform")?Jr(n.out):n.type==="catch"?Jr(n.innerType):e._zod.optin}var Mc=(e,n,t,r)=>{let o=t,i=e._zod.def,s=i.shape;if(Object.getOwnPropertySymbols(s).length&&Kn(e,n,o,r,"Symbol keys cannot be represented in JSON Schema"))return;o.type="object",o.properties={};for(let d in s)cn(o.properties,d,We(s[d],n,{...r,path:[...r.path,"properties",d]}));let l=[];for(let d of Object.keys(s)){let u=i.shape[d];(n.io==="input"?Jr(u)===void 0:u._zod.optout===void 0)&&l.push(d)}l.length>0&&(o.required=l),i.catchall?._zod.def.type==="never"?o.additionalProperties=!1:i.catchall?i.catchall&&(o.additionalProperties=We(i.catchall,n,{...r,path:[...r.path,"additionalProperties"]})):n.io==="output"&&(o.additionalProperties=!1)},Dc=(e,n,t,r)=>{let o=e._zod.def,i=o.inclusive===!1,s=o.options.map((c,l)=>We(c,n,{...r,path:[...r.path,i?"oneOf":"anyOf",l]}));i?t.oneOf=s:t.anyOf=s},Hc=(e,n,t,r)=>{let o=e._zod.def,i=We(o.left,n,{...r,path:[...r.path,"allOf",0]}),s=We(o.right,n,{...r,path:[...r.path,"allOf",1]}),c=d=>"allOf"in d&&Object.keys(d).length===1,l=[...c(i)?i.allOf:[i],...c(s)?s.allOf:[s]];t.allOf=l,n.intersections.push(l)};function yi(e,n,t){if(n.$ref){if(t.has(n))return n;t.add(n);let y=e.get(n)?.def;if(!y)return n;let v=yi(e,y,t);return v===y?n:v}for(let y of["anyOf","oneOf"]){let v=n[y];if(!Array.isArray(v))continue;let b=v.map(_=>yi(e,_,t));b.some((_,Z)=>_!==v[Z])&&(n={...n,[y]:b})}let r=Array.isArray(n.type)?n.type:[n.type],o=!r.includes("string")&&r.some(y=>y==="number"||y==="integer"),i=n.enum??(n.const!==void 0?[n.const]:void 0);if(!o&&!i?.some(y=>typeof y=="number"))return n;let{minimum:s,maximum:c,exclusiveMinimum:l,exclusiveMaximum:d,multipleOf:u,format:p,id:f,...m}=n;return m.enum?m.enum=m.enum.map(y=>typeof y=="number"?String(y):y):typeof m.const=="number"&&(m.const=String(m.const)),o&&(m.type="string",i||(m.pattern=(r.includes("number")?Vt:Fo).source)),m}var _i=new WeakMap;function xm(e){let n=new Map;for(let r of e.seen.values())r.def&&!n.has(r.schema)&&n.set(r.schema,r);let t=new Map;for(let r of _i.get(e)??[]){let o=e.seen.get(r),i=(o?.def??o?.schema)?.propertyNames;if(!i||i===!0||t.has(i))continue;let s=yi(n,i,new Set);s!==i&&t.set(i,s)}if(t.size)for(let r of e.seen.values())for(let o of[r.schema,r.def]){let i=o&&t.get(o.propertyNames);i&&(o.propertyNames=i)}}var Bc=(e,n,t,r)=>{let o=t,i=e._zod.def;o.type="object";let s=i.keyType,c=gn(s).patterns;if(i.mode==="loose"&&c&&c.size>0){let u=We(i.valueType,n,{...r,path:[...r.path,"patternProperties","*"]});o.patternProperties={};for(let p of c)cn(o.patternProperties,Pc(p).source,u)}else{if(n.target==="draft-07"||n.target==="draft-2020-12"){o.propertyNames=We(i.keyType,n,{...r,path:[...r.path,"propertyNames"]});let u=_i.get(n);u||(u=[],_i.set(n,u),n.deferred.push(()=>xm(n))),u.push(e)}o.additionalProperties=We(i.valueType,n,{...r,path:[...r.path,"additionalProperties"]})}let l=s._zod.values,d=n.io==="input"&&Jr(i.valueType)!==void 0;if(l&&!i.partial&&!d){let u=[...l].filter(p=>typeof p=="string"||typeof p=="number");u.length>0&&(o.required=u.map(String))}},Fc=(e,n,t,r)=>{let o=e._zod.def,i=We(o.innerType,n,r),s=n.seen.get(e);n.target==="openapi-3.0"?(s.ref=o.innerType,t.nullable=!0):t.anyOf=[i,{type:"null"}]},Uc=(e,n,t,r)=>{let o=e._zod.def;We(o.innerType,n,r);let i=n.seen.get(e);i.ref=o.innerType},wi=Symbol();function Lc(e,n,t,r,o){let i=!1,s=JSON.stringify(e,(c,l)=>typeof l!="bigint"?l:(i=!0,null));return i?(Kn(n,t,r,o,"BigInt defaults cannot be represented in JSON Schema"),wi):JSON.parse(s)}var Vc=(e,n,t,r)=>{let o=e._zod.def;We(o.innerType,n,r);let i=n.seen.get(e);i.ref=o.innerType;let s=Lc(o.defaultValue,e,n,t,r);s!==wi&&(t.default=s)},jc=(e,n,t,r)=>{let o=e._zod.def;We(o.innerType,n,r);let i=n.seen.get(e);if(i.ref=o.innerType,n.io!=="input")return;let s=Lc(o.defaultValue,e,n,t,r);s!==wi&&(t._prefault=s)},qc=(e,n,t,r)=>{let o=e._zod.def;We(o.innerType,n,r);let i=n.seen.get(e);i.ref=o.innerType;let s;try{s=o.catchValue(void 0)}catch{Kn(e,n,t,r,"Dynamic catch values are not supported in JSON Schema");return}t.default=s},Jc=(e,n,t,r)=>{let o=e._zod.def,i=o.in._zod.traits.has("$ZodTransform"),s=n.io==="input"?i?o.out:o.in:o.out;We(s,n,r);let c=n.seen.get(e);c.ref=s},Xc=(e,n,t,r)=>{let o=e._zod.def;We(o.innerType,n,r);let i=n.seen.get(e);i.ref=o.innerType,t.readOnly=!0};var xi=(e,n,t,r)=>{let o=e._zod.def;We(o.innerType,n,r);let i=n.seen.get(e);i.ref=o.innerType},Yc=(e,n,t,r)=>{let o=e._zod.innerType;We(o,n,r);let i=n.seen.get(e);i.ref=o};var Qc=new WeakSet([Object.prototype,Error.prototype]);function Xr(e,n,t){Object.defineProperty(e,n,{configurable:!0,enumerable:!1,get(){let r=t(this);return Object.defineProperty(this,n,{value:r,configurable:!0,writable:!0}),r},set(r){Object.defineProperty(this,n,{value:r,configurable:!0,writable:!0})}})}var Am=(e,n)=>{gs.init(e,n),e.name="ZodError";let t=Object.getPrototypeOf(e);Qc.has(t)||(Qc.add(t),Xr(t,"format",r=>o=>vs(r,o)),Xr(t,"flatten",r=>o=>bs(r,o)),Xr(t,"addIssue",r=>o=>{r.issues.push(o),r.message=JSON.stringify(r.issues,gt,2)}),Xr(t,"addIssues",r=>o=>{r.issues.push(...o),r.message=JSON.stringify(r.issues,gt,2)}),Object.defineProperty(t,"isEmpty",{configurable:!0,enumerable:!1,get(){return this.issues.length===0}}))};var un=G("ZodError",Am,void 0,{Parent:Error});var ed=Ar(un),nd=Tr(un),td=Er(un),rd=Wr(un),od=_s(un),id=ws(un),sd=xs(un),ad=ks(un),ld=Ss(un),cd=zs(un),dd=Zs(un),ud=Cs(un);function Em(){on.localeError||dn(Nl())}function Qr(){on.memoizer||dn({memoizer:Pl()})}var Ze=G("ZodType",(e,n)=>(Em(),ke.init(e,n),e.def=n,e.type=n.type,e),{check(...e){let n=this.def;return this.clone(se.mergeDefs(n,{checks:[...n.checks??[],...e.map(t=>typeof t=="function"?{_zod:{check:t,def:{check:"custom"},onattach:[]}}:t)]}),{parent:!0})},with(...e){return this.check(...e)},clone(e,n){return wn(this,e,n)},brand(){return this},register(e,n){return e.add(this,n),this},refine(e,n){return this.check(Tf(e,n))},superRefine(e,n){return this.check(Ef(e,n))},overwrite(e){return this.check(jn(e))},optional(){return hd(this)},exactOptional(){return gf(this)},nullable(){return gd(this)},nullish(){return hd(gd(this))},nonoptional(e){return xf(this,e)},array(){return Se(this)},or(e){return St([this,e])},and(e){return pf(this,e)},transform(e){return bd(this,hf(e))},default(e){return yf(this,e)},prefault(e){return wf(this,e)},catch(e){return Sf(this,e)},pipe(e){return bd(this,e)},readonly(){return Cf(this)},describe(e){let n=this.clone();return it.add(n,{description:e}),n},meta(...e){if(e.length===0)return it.get(this);let n=this.clone();return it.add(n,e[0]),n},isOptional(){return this.safeParse(void 0).success},isNullable(){return this.safeParse(null).success},apply(e,...n){return n.length===0?e(this):e(this,...n)},get"~standard"(){return se.hide(this,"~standard",{...qo(this),jsonSchema:{input:nr(this,"input"),output:nr(this,"output")}})},set"~standard"(e){se.own(this,"~standard",e)},parse:function e(n,t){return ed(this,n,t,{callee:e})},parseAsync:async function e(n,t){return await nd(this,n,t,{callee:e})},safeParse(e,n){return td(this,e,n)},async safeParseAsync(e,n){return rd(this,e,n)},get spa(){return this?.safeParseAsync},set spa(e){se.own(this,"spa",e)},validate(e,n){return Mo(this,e,n)},validateAsync(e,n){return Do(this,e,n)},encode:function e(n,t){return od(this,n,t,{callee:e})},decode:function e(n,t){return id(this,n,t,{callee:e})},encodeAsync:async function e(n,t){return await sd(this,n,t,{callee:e})},decodeAsync:async function e(n,t){return await ad(this,n,t,{callee:e})},safeEncode(e,n){return ld(this,e,n)},safeDecode(e,n){return cd(this,e,n)},async safeEncodeAsync(e,n){return dd(this,e,n)},async safeDecodeAsync(e,n){return ud(this,e,n)},toJSONSchema(e){return yc(this,{})(e)},get description(){return it.get(this)?.description},get _def(){return this._zod.def}}),vd=G("_ZodString",(e,n)=>{Rr.init(e,n),Ze.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Nc(e,t,r,o)},se.derived({format:e=>gn(e).format??null,minLength:e=>gn(e).minimum??null,maxLength:e=>gn(e).maximum??null},{regex(...e){return this.check(oi(...e))},includes(...e){return this.check(ai(...e))},startsWith(...e){return this.check(li(...e))},endsWith(...e){return this.check(ci(...e))},min(...e){return this.check(wt(...e))},max(...e){return this.check(jr(...e))},length(...e){return this.check(qr(...e))},nonempty(...e){return this.check(wt(1,...e))},lowercase(e){return this.check(ii(e))},uppercase(e){return this.check(si(e))},trim(){return this.check(ui())},normalize(...e){return this.check(di(...e))},toLowerCase(){return this.check(pi())},toUpperCase(){return this.check(mi())},slugify(){return this.check(fi())}})),Wm=G("ZodString",(e,n)=>{Rr.init(e,n),vd.init(e,n)},{email(e){return this.check(Wl(Om,e))},url(e){return this.check(Rl(Mm,e))},jwt(e){return this.check(ec(nf,e))},emoji(e){return this.check(Ml(Dm,e))},guid(e){return this.check(Il(Rm,e))},uuid(e){return this.check(Gl(Yr,e))},uuidv4(e){return this.check(Kl(Yr,e))},uuidv6(e){return this.check($l(Yr,e))},uuidv7(e){return this.check(Ol(Yr,e))},nanoid(e){return this.check(Dl(Hm,e))},cuid(e){return this.check(Hl(Bm,e))},cuid2(e){return this.check(Bl(Fm,e))},ulid(e){return this.check(Fl(Um,e))},base64(e){return this.check(Xl(Ym,e))},base64url(e){return this.check(Yl(Qm,e))},xid(e){return this.check(Ul(Lm,e))},ksuid(e){return this.check(Ll(Vm,e))},ipv4(e){return this.check(Vl(jm,e))},ipv6(e){return this.check(jl(qm,e))},cidrv4(e){return this.check(ql(Jm,e))},cidrv6(e){return this.check(Jl(Xm,e))},e164(e){return this.check(Ql(ef,e))},datetime(e){return this.check(nc(Im,e))},date(e){return this.check(tc(Gm,e))},time(e){return this.check(rc(Km,e))},duration(e){return this.check(oc($m,e))}});function te(e){return El(Wm,e)}var Ae=G("ZodStringFormat",(e,n)=>{ze.init(e,n),vd.init(e,n)}),Im=G("ZodISODateTime",(e,n)=>{Ma.init(e,n),Ae.init(e,n)}),Gm=G("ZodISODate",(e,n)=>{Da.init(e,n),Ae.init(e,n)}),Km=G("ZodISOTime",(e,n)=>{Ha.init(e,n),Ae.init(e,n)}),$m=G("ZodISODuration",(e,n)=>{Ba.init(e,n),Ae.init(e,n)}),Om=G("ZodEmail",(e,n)=>{Na.init(e,n),Ae.init(e,n)});var Rm=G("ZodGUID",(e,n)=>{Ca.init(e,n),Ae.init(e,n)});var Yr=G("ZodUUID",(e,n)=>{Pa.init(e,n),Ae.init(e,n)});var Mm=G("ZodURL",(e,n)=>{Ea.init(e,n),Ae.init(e,n)});var Dm=G("ZodEmoji",(e,n)=>{Wa.init(e,n),Ae.init(e,n)});var Hm=G("ZodNanoID",(e,n)=>{Ia.init(e,n),Ae.init(e,n)});var Bm=G("ZodCUID",(e,n)=>{Ga.init(e,n),Ae.init(e,n)});var Fm=G("ZodCUID2",(e,n)=>{Ka.init(e,n),Ae.init(e,n)});var Um=G("ZodULID",(e,n)=>{$a.init(e,n),Ae.init(e,n)});var Lm=G("ZodXID",(e,n)=>{Oa.init(e,n),Ae.init(e,n)});var Vm=G("ZodKSUID",(e,n)=>{Ra.init(e,n),Ae.init(e,n)});var jm=G("ZodIPv4",(e,n)=>{Fa.init(e,n),Ae.init(e,n)});var qm=G("ZodIPv6",(e,n)=>{La.init(e,n),Ae.init(e,n)});var Jm=G("ZodCIDRv4",(e,n)=>{Va.init(e,n),Ae.init(e,n)});var Xm=G("ZodCIDRv6",(e,n)=>{ja.init(e,n),Ae.init(e,n)});var Ym=G("ZodBase64",(e,n)=>{Ja.init(e,n),Ae.init(e,n)});var Qm=G("ZodBase64URL",(e,n)=>{Xa.init(e,n),Ae.init(e,n)});var ef=G("ZodE164",(e,n)=>{Ya.init(e,n),Ae.init(e,n)});var nf=G("ZodJWT",(e,n)=>{Qa.init(e,n),Ae.init(e,n)});var yd=G("ZodNumber",(e,n)=>{Xo.init(e,n),Ze.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Ac(e,t,r,o),e.isFinite=!0},se.derived({minValue:e=>{let{minimum:n,exclusiveMinimum:t}=gn(e);return Math.max(n??Number.NEGATIVE_INFINITY,t??Number.NEGATIVE_INFINITY)},maxValue:e=>{let{maximum:n,exclusiveMaximum:t}=gn(e);return Math.min(n??Number.POSITIVE_INFINITY,t??Number.POSITIVE_INFINITY)},isInt:e=>{let{isInt:n,multipleOf:t}=gn(e);return!!n||!!t?.some(Number.isSafeInteger)},format:e=>gn(e).format??null},{gt(e,n){return this.check(Lr(e,n))},gte(e,n){return this.check(Qt(e,n))},min(e,n){return this.check(Qt(e,n))},lt(e,n){return this.check(Ur(e,n))},lte(e,n){return this.check(Yt(e,n))},max(e,n){return this.check(Yt(e,n))},int(e){return this.check(pd(e))},safe(e){return this.check(pd(e))},positive(e){return this.check(Lr(0,e))},nonnegative(e){return this.check(Qt(0,e))},negative(e){return this.check(Ur(0,e))},nonpositive(e){return this.check(Yt(0,e))},multipleOf(e,n){return this.check(Vr(e,n))},step(e,n){return this.check(Vr(e,n))},finite(){return this}}));function sn(e){return ic(yd,e)}var tf=G("ZodNumberFormat",(e,n)=>{el.init(e,n),yd.init(e,n)});function pd(e){return sc(tf,e)}var rf=G("ZodBoolean",(e,n)=>{nl.init(e,n),Ze.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Tc(e,t,r,o)});function be(e){return ac(rf,e)}var of=G("ZodNull",(e,n)=>{tl.init(e,n),Ze.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Ec(e,t,r,o)});function tr(e){return lc(of,e)}var sf=G("ZodUnknown",(e,n)=>{rl.init(e,n),Ze.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Ic(e,t,r,o)});function md(){return cc(sf)}var af=G("ZodNever",(e,n)=>{ol.init(e,n),Ze.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Wc(e,t,r,o)});function _d(e){return dc(af,e)}var lf=G("ZodArray",(e,n)=>{Qr(),il.init(e,n),Ze.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Rc(e,t,r,o),e.element=n.element},{min(e,n){return this.check(wt(e,n))},nonempty(e){return this.check(wt(1,e))},max(e,n){return this.check(jr(e,n))},length(e,n){return this.check(qr(e,n))},unwrap(){return this.element}});function Se(e,n){return uc(lf,e,n)}var cf=G("ZodObject",(e,n)=>{Qr(),ll.init(e,n),Ze.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Mc(e,t,r,o),se.installLazyProp(e,"shape",t=>t._zod.def.shape,!1)},{keyof(){return ce(Object.keys(this._zod.def.shape))},catchall(e){return this.clone(se.mergeDefs(this._zod.def,{catchall:e}))},passthrough(){return this.clone(se.mergeDefs(this._zod.def,{catchall:md()}))},loose(){return this.clone(se.mergeDefs(this._zod.def,{catchall:md()}))},strict(){return this.clone(se.mergeDefs(this._zod.def,{catchall:_d()}))},strip(){return this.clone(se.mergeDefs(this._zod.def,{catchall:void 0}))},extend(e){return se.extend(this,e)},safeExtend(e){return se.safeExtend(this,e)},merge(e){return se.merge(this,e)},pick(e){return se.pick(this,e)},omit(e){return se.omit(this,e)},partial(...e){return se.partial(xd,this,e[0])},exactPartial(...e){return se.partial(kd,this,e[0],"exactPartial")},required(...e){return se.required(Sd,this,e[0])}});function J(e,n){return new cf({type:"object",shape:e,catchall:_d(),...se.normalizeParams(n)})}var wd=G("ZodUnion",(e,n)=>{Yo.init(e,n),Ze.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Dc(e,t,r,o),e.options=n.options});function St(e,n){return new wd({type:"union",options:e,...se.normalizeParams(n)})}var df=G("ZodDiscriminatedUnion",(e,n)=>{wd.init(e,n),cl.init(e,n)});function rr(e,n,t){return new df({type:"union",options:n,discriminator:e,...se.normalizeParams(t)})}var uf=G("ZodIntersection",(e,n)=>{dl.init(e,n),Ze.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Hc(e,t,r,o)});function pf(e,n){return new uf({type:"intersection",left:e,right:n})}var fd=G("ZodRecord",(e,n)=>{Qr(),ul.init(e,n),Ze.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Bc(e,t,r,o),e.keyType=n.keyType,e.valueType=n.valueType});function zi(e,n,t){return!n||!n._zod?new fd({type:"record",keyType:te(),valueType:e,...se.normalizeParams(n)}):new fd({type:"record",keyType:e,valueType:n,...se.normalizeParams(t)})}var Si=G("ZodEnum",(e,n)=>{pl.init(e,n),Ze.init(e,n),e._zod.processJSONSchema=(r,o,i)=>Gc(e,r,o,i),e.enum=n.entries,e.options=[...e._zod.values];let t=new Set(Object.keys(n.entries));e.extract=(r,o)=>{let i={};for(let s of r)if(t.has(s))i[s]=n.entries[s];else throw new Error(`Key ${s} not found in enum`);return new Si({...n,checks:[],...se.normalizeParams(o),entries:i})},e.exclude=(r,o)=>{let i={...n.entries};for(let s of r)if(t.has(s))delete i[s];else throw new Error(`Key ${s} not found in enum`);return new Si({...n,checks:[],...se.normalizeParams(o),entries:i})}});function ce(e,n){let t=Array.isArray(e)?Object.fromEntries(e.map(r=>[r,r])):e;return new Si({type:"enum",entries:t,...se.normalizeParams(n)})}var mf=G("ZodLiteral",(e,n)=>{ml.init(e,n),Ze.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Kc(e,t,r,o),e.values=new Set(n.values),Object.defineProperty(e,"value",{get(){if(n.values.length>1)throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");return n.values[0]}})});function ye(e,n){return new mf({type:"literal",values:Array.isArray(e)?e:[e],...se.normalizeParams(n)})}var ff=G("ZodTransform",(e,n)=>{Qr(),fl.init(e,n),Ze.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Oc(e,t,r,o),e._zod.parse=(t,r)=>{if(r.direction==="backward")throw new _t(e.constructor.name);t.addIssue=i=>{if(typeof i=="string")t.issues.push(se.issue(i,t.value,n));else{let s=i;s.fatal&&(s.continue=!1),s.code??(s.code="custom"),"input"in s||(s.input=t.value),s.inst??(s.inst=e),t.issues.push(se.issue(s))}};let o=n.transform(t.value,t);return o instanceof Promise?o.then(i=>(t.value=i,t)):(t.value=o,t)}});function hf(e){return new ff({type:"transform",transform:e})}var xd=G("ZodOptional",(e,n)=>{Qo.init(e,n),Ze.init(e,n),e._zod.processJSONSchema=(t,r,o)=>xi(e,t,r,o),e.unwrap=()=>e._zod.def.innerType});function hd(e){return new xd({type:"optional",innerType:e})}var kd=G("ZodExactOptional",(e,n)=>{hl.init(e,n),Ze.init(e,n),e._zod.processJSONSchema=(t,r,o)=>xi(e,t,r,o),e.unwrap=()=>e._zod.def.innerType});function gf(e){return new kd({type:"optional",innerType:e})}var bf=G("ZodNullable",(e,n)=>{gl.init(e,n),Ze.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Fc(e,t,r,o),e.unwrap=()=>e._zod.def.innerType});function gd(e){return new bf({type:"nullable",innerType:e})}var vf=G("ZodDefault",(e,n)=>{bl.init(e,n),Ze.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Vc(e,t,r,o),e.unwrap=()=>e._zod.def.innerType,e.removeDefault=e.unwrap});function yf(e,n){return new vf({type:"default",innerType:e,get defaultValue(){return typeof n=="function"?n():se.shallowClone(n)}})}var _f=G("ZodPrefault",(e,n)=>{vl.init(e,n),Ze.init(e,n),e._zod.processJSONSchema=(t,r,o)=>jc(e,t,r,o),e.unwrap=()=>e._zod.def.innerType});function wf(e,n){return new _f({type:"prefault",innerType:e,get defaultValue(){return typeof n=="function"?n():se.shallowClone(n)}})}var Sd=G("ZodNonOptional",(e,n)=>{yl.init(e,n),Ze.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Uc(e,t,r,o),e.unwrap=()=>e._zod.def.innerType});function xf(e,n){return new Sd({type:"nonoptional",innerType:e,...se.normalizeParams(n)})}var kf=G("ZodCatch",(e,n)=>{_l.init(e,n),Ze.init(e,n),e._zod.processJSONSchema=(t,r,o)=>qc(e,t,r,o),e.unwrap=()=>e._zod.def.innerType,e.removeCatch=e.unwrap});function Sf(e,n){return new kf({type:"catch",innerType:e,catchValue:typeof n=="function"?n:se.constantCatch(n)})}var zf=G("ZodPipe",(e,n)=>{wl.init(e,n),Ze.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Jc(e,t,r,o),e.in=n.in,e.out=n.out});function bd(e,n){return new zf({type:"pipe",in:e,out:n})}var Zf=G("ZodReadonly",(e,n)=>{xl.init(e,n),Ze.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Xc(e,t,r,o),e.unwrap=()=>e._zod.def.innerType});function Cf(e){return new Zf({type:"readonly",innerType:e})}var Pf=G("ZodLazy",(e,n)=>{kl.init(e,n),Ze.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Yc(e,t,r,o),e.unwrap=()=>e._zod.def.getter()});function Nf(e){return new Pf({type:"lazy",getter:e})}var Af=G("ZodCustom",(e,n)=>{Sl.init(e,n),Ze.init(e,n),e._zod.processJSONSchema=(t,r,o)=>$c(e,t,r,o)});function Tf(e,n={}){return pc(Af,e,n)}function Ef(e,n){return mc(e,n)}function zd(e){let n=Nf(()=>St([te(e),sn(),be(),tr(),Se(n),zi(te(),n)]));return n}var eo=Object.freeze(["panel-open","panel-close","panel-move","page-home","page-settings","page-settings-tab","page-model-tab","page-setup","page-authorization","page-repair","page-session-management","open-native-session","open-feedback","change-listen-mode","change-audio-device","edit-choice","commit-form","activate-control","dismiss","details-toggle","keyboard-navigation","ui-connect","ui-reconnect","ui-status-refresh","ui-request","ui-stream","ui-render-error","ui-action-error","ui-read-recovery","manage-session","start-voice","stop-voice","ui-buffer-overflow","session-history-open","session-history-close","subagent-history-open","subagent-history-close","show-subagents","show-main-sessions","open-native-subagent","new-voice-session","bind-current-session","retry-voice-transcript","bind-existing-session","unbind-existing-session","listen-mode-ptt","listen-mode-always","listen-mode-wake","settings-audio","settings-interaction","settings-prompt","settings-models","settings-advanced","settings-pets"]),Zd=64*1024,or=64,Cd=10080*60*1e3;var Zi="whaleConversation",_e=(e,n)=>({mode:"strict",typeSymbol:`dsh-fish-voice/conversation#${e}`,create:n}),Pi=_e("sessionId",()=>te().min(1).max(256)),Wf=_e("settingsSessionId",()=>Pi.create().nullable()),Gd=new Set(["status","read-settings","listen-mode","complete-setup","set-visibility","inspect-tts","save-tts","preview-tts","cancel-tts","save-models","model-installer","inspect-model-compute","plan-model-install","start-model-install","control-model-install","apply-model-install","pick-local-path","enable","disable","new","resume","read-history","read-audio-devices","save-audio-device","save-settings","capture-bindings","save-bindings","save-voice-prompt","conversation-models","save-conversation-model","inspect-performance","set-performance-mode","read-output-volume","set-output-volume"]),If=_e("volumeRequest",()=>J({revision:sn().int().nonnegative(),volume:sn().min(0).max(1)})),Pd=J({id:te(),role:ce(["user","assistant"]),text:te().max(8e3),state:ce(["reply","interrupted","delivered","speech-requested","speech-failed"]),at:sn()}),Gf=J({state:ce(["disabled","starting","waiting","listening","paused","error"]),deadlineAt:sn().nonnegative().nullable(),streamOpen:be(),detection:ce(["asr-after-utterance","acoustic-after-utterance"])}),Kd=te().uuid(),Kf=J({sessionId:Pi.create(),items:Se(J({id:Kd,text:te().max(8e3),state:ce(["busy","ready","sending","uncertain"])})).max(8)}),$f=_e("snapshot",()=>J({revision:sn().int().nonnegative(),historyGeneration:sn().int().nonnegative().optional(),rootSessionId:te().nullable(),title:tr(),latest:Pd.nullable(),items:Se(Pd).max(40),inputActive:be(),inputError:ce(["device","recognition","no-speech"]).nullable().optional(),providerError:te().max(480).optional(),retryTranscripts:Kf.nullable().optional(),playbackConfirmed:ye(!1),wake:Gf.optional(),helper:J({online:be(),listenMode:ce(["ptt","always","wake"]).nullable()}).refine(e=>e.online||e.listenMode===null).optional()})),Of=_e("volume",()=>J({supported:be(),backend:ye("dsh-speak").nullable(),volume:sn().min(0).max(1).nullable(),revision:sn().int().nullable(),apply:ye("next-output").nullable(),reason:te().nullable()})),Y=te().max(4096),Fe=sn().int().nonnegative().max(Number.MAX_SAFE_INTEGER),Rf=J({code:te().max(64),message:te().max(512)}),no=J({available:be(),reason:Y.nullable(),runtimeLoaded:ye(!1),backend:Y.optional(),provider:Y.optional(),device:Y.optional(),computeType:Y.optional(),supportedComputeTypes:Se(Y).max(32).optional(),deviceCount:Fe.optional(),deviceIndex:Fe.optional(),validation:Y.optional(),note:Y.optional(),providerAdvertised:be().optional()}),Mf=J({schema:ye(1),default:ye("cpu"),observedAt:Y.nullable(),reason:Y.optional(),backends:J({sensevoice:J({cpu:no,cuda:no}).optional(),whisper:J({cpu:no,cuda:no}).optional()})}),Df=J({observedAt:Y,scope:ye("plugin-host"),platform:Y,arch:Y,cpuLogicalCores:Fe.nullable(),totalMemoryBytes:Fe.nullable(),availableMemoryBytes:Fe.nullable(),gpuMemoryBytes:Fe.nullable(),gpuMemoryReason:Y,gpuSource:ye("dxgi").nullable().optional(),gpuAdapters:Se(J({name:te().min(1).max(256),dedicatedVideoMemoryBytes:Fe,sharedSystemMemoryBytes:Fe})).max(32).optional()}),Hf=J({modelId:Y,confidence:ce(["not-assessed","unknown","heuristic-only"]),recommended:be(),badge:Y.nullable(),state:ce(["manual-choice","unknown","recommended-pending-runtime-validation","limited-memory","busy-memory","recommended-lightweight"]),reason:Y,policy:Y.optional(),runtimeValidated:ye(!1).optional(),gpuValidated:ye(!1).optional()}),Bf=J({release:Y,source:Y,sources:Se(Y).max(16).optional(),redirectHost:Y,platform:Y,arch:Y,executable:Y,licenseUrls:Se(Y).max(20)}),Ff=J({jobId:Y,modelId:Y,status:ce(["waiting","verifying","applied","blocked","paused","cancelled"]),reason:Y.nullable()}),Uf=J({id:Y,runtime:Bf.nullable().optional(),purpose:ce(["tts","asr"]).optional(),computeOptions:Se(ce(["cpu","auto","cuda","vulkan"])).max(4).optional(),recommendation:Hf,title:Y,backend:Y.nullable(),available:be(),reason:Y.nullable(),totalBytes:Fe.nullable(),source:Y.nullable(),licenseUrls:Se(Y).max(20),licenseNote:Y.nullable(),verification:Y.optional(),runtimeLoaded:ye(!1)}),Lf=J({id:te().uuid(),modelId:Y,compute:ce(["cpu","auto","cuda","vulkan"]),status:ce(["queued","running","paused","failed","cancelled","installed"]),stage:ce(["queued","running","paused","failed","cancelled","installed","checking-runtime","verifying-local","downloading","verifying","installing"]),createdAt:Y,updatedAt:Y,totalBytes:Fe,receivedBytes:Fe,runtimeLoaded:ye(!1),error:Rf.nullable(),currentFile:Y.nullable().optional(),files:Se(J({name:Y,bytes:Fe,receivedBytes:Fe,verified:be(),reused:be().optional()})).max(200),installedPath:Y.optional(),sourceDirectory:Y.optional(),modelVariant:ce(["q4_k_m","q8_0"]).optional(),reused:ye(!0).optional(),reusedBytes:Fe.optional(),purpose:ce(["tts","asr"]).optional(),recommendedSettings:St([J({tts:J({provider:ye("local"),localModelId:Y,localModelPath:Y})}),J({asr:ce(["sensevoice","whisper"]),models:J({sensevoiceDir:Y.optional(),whisper:Y.optional()}),modelCompute:ce(["cpu","auto","cuda"])})]).optional()}),Vf=_e("modelSnapshot",()=>J({schema:ye(1),hardware:Df,compute:Mf,refresh:J({pending:be(),observedAt:te().max(64).nullable(),attemptedAt:te().max(64).nullable(),error:te().max(512).nullable(),intervalMs:ye(3e5)}).optional(),models:Se(Uf).max(32),jobs:Se(Lf).max(1e3),ttsInstallIntent:Ff.nullable().optional()})),jf=_e("authorizationRequest",()=>J({revision:te().min(1).max(256),grant:be()})),qf=_e("whisperAsrRequest",()=>rr("operation",[J({operation:ye("status")}),J({operation:ye("retry")})])),Nd={state:ce(["idle","downloading","ready","error"]),receivedBytes:Fe,totalBytes:Fe},Jf=_e("whisperAsrResult",()=>J({...Nd,selected:be(),message:te().max(512).nullable(),acceleration:J(Nd).optional()})),Ad=_e("authorization",()=>J({schema:ye(1),revision:te().min(1).max(256),completed:be(),granted:be(),usageAgreement:J({version:ye(1),accepted:be(),text:Se(Y).max(16)}).optional(),modelSourcesChanged:be().optional(),blockedOperations:Se(Y).max(32),revocationUnconfirmed:be(),scopes:Se(J({id:Y,title:Y,description:Y,allowed:be()})).max(16),modelSources:Se(J({modelId:Y,source:Y,licenseUrls:Se(Y).max(20),licenseNote:Y,runtime:J({source:Y,sources:Se(Y).max(16).optional(),licenseUrls:Se(Y).max(20),redirectHost:Y.nullable()}).optional()})).max(32),restrictions:Se(Y).max(16)})),Xf=_e("setup",()=>J({version:ye(1),completed:be()})),an=te().min(1).max(256),Ke=te().min(1).max(256),Td=ce(["cpu","auto","cuda","vulkan"]),Ed={sourceDirectory:te().min(1).max(4096).optional(),modelVariant:ce(["q4_k_m","q8_0"]).optional()},to=zi(te(),zd()),Yf=J({provider:ce(["edge","deepseek","local"]),edgeVoice:te().min(1).max(64),systemVoice:te().max(256).nullable(),systemFallback:be(),edgeTextTransmissionAccepted:be(),volume:sn().min(0).max(1),localModelId:te().max(128).nullable(),localModelPath:te().max(4096).nullable(),referenceAudioPath:te().max(4096).nullable(),referenceAudioAccepted:be(),deepseekVoice:ce(["stella","tide"]).optional(),deepseekTextTransmissionAccepted:be().optional()}),Qf=J({backend:ce(["winmm","portaudio"]),id:te().min(1).max(1024),name:te().min(1).max(256)}).nullable(),eh={"read-history":{cursor:te().max(128).optional()},"read-audio-devices":{},"save-audio-device":{revision:an,direction:ce(["input","output"]),selection:Qf},"agent-permissions":{},"save-agent-permissions":{revision:an,allowed:J({"set-performance-mode":be(),"set-visibility":be(),"set-output-volume":be()})},"agent-requests":{},"decide-agent-request":{id:Ke,approve:be(),acknowledgements:Se(te().max(80)).max(10)},"model-installer":{},"inspect-model-compute":{},"plan-model-install":{modelId:Ke,compute:Td,...Ed},"start-model-install":{modelId:Ke,compute:Td,...Ed,planHash:an,accepted:ye(!0),useWhenReady:be().optional()},"control-model-install":{id:Ke,operation:ce(["pause","resume","cancel"])},"apply-model-install":{id:Ke,revision:an},status:{},enable:{expectedOwnerSessionId:Ke.nullable().optional(),expectedExistingSessionId:Ke.nullable().optional()},disable:{},"read-settings":{},new:{expectedOwnerSessionId:Ke.nullable().optional()},"inspect-performance":{},"set-performance-mode":{revision:an,performanceMode:ce(["fast","balanced","high","compatibility"])},"inspect-tts":{},"save-tts":{revision:an,values:to},"complete-setup":{revision:an},"preview-tts":{revision:an.optional(),values:Yf.optional()},"cancel-tts":{},list:{cursor:te().max(2048).optional()},resume:{id:Ke},"listen-mode":{mode:ce(["ptt","always","wake"])},"set-visibility":{revision:an,visibility:ce(["hidden","workspace"])},"pick-local-path":{kind:ce(["referenceAudio","sensevoiceDir","whisper","campplus","sourceDirectory"])},"capture-bindings":{operation:ce(["begin","end"]),token:Ke.optional(),inactive:be().optional()},"save-bindings":{revision:an,values:to,bindingContext:J({ownerSessionId:Ke.nullable(),epoch:Ke.nullable(),rootSessionId:Ke.nullable()})},"save-voice-prompt":{revision:an,values:J({text:te().max(32768)})},"conversation-models":{},"save-conversation-model":{revision:an,values:J({mode:ce(["auto","manual"]),provider:te().min(1).max(256).nullable(),model:te().min(1).max(256).nullable()})},"save-settings":{revision:an,values:to},"save-models":{revision:an,values:to}},nh=_e("uiActionRequest",()=>rr("action",Object.entries(eh).map(([e,n])=>J({action:ye(e),...n}))).refine(e=>e.action!=="preview-tts"||Object.hasOwn(e,"revision")===Object.hasOwn(e,"values"),"\u8349\u7A3F\u8BD5\u542C\u5FC5\u987B\u540C\u65F6\u63D0\u4F9B\u914D\u7F6E\u7248\u672C\u548C\u8BBE\u7F6E").refine(e=>JSON.stringify(e).length<=(e.action==="save-voice-prompt"?2e5:8192),"\u64CD\u4F5C\u6570\u636E\u8FC7\u957F")),Wd=_e("uiActionResult",()=>te().max(4*1024*1024)),th=_e("sessionManagementRequest",()=>rr("operation",[J({operation:ye("list"),rootId:Ke.optional(),cursor:te().max(2048).optional()}),J({operation:ye("unhide"),rootId:Ke,id:Ke}),J({operation:ye("restore"),rootId:Ke,id:Ke})])),rh=_e("presentation",()=>J({shown:Se(St([J({id:Ke,parentId:tr(),mode:tr()}),J({id:Ke,parentId:Ke,mode:ce(["one-shot","continuable","unknown"])})]))})),Ci=te().min(1).max(128),oh=_e("updateRequest",()=>rr("action",[J({action:ye("check")}),J({action:ye("install"),version:Ci})])),Id=_e("updateSnapshot",()=>J({schema:ye(1),revision:sn().int().nonnegative().optional(),currentVersion:Ci,channel:ce(["stable","preview"]),status:ce(["idle","checking","current","available","incompatible","installing","restart-required","enable-required","installed","error","unsupported"]),checkedAt:te().max(64).nullable(),release:J({version:Ci,announcement:te().min(1).max(600),url:te().startsWith("https://github.com/Emikosama/dsh-fish-voice/releases/tag/v").max(256)}).nullable(),message:te().max(512).nullable(),canInstall:be()})),ro=Pi.create(),ir=J({sessionId:ro,title:te().max(256).nullable(),availability:ce(["ready","busy","unavailable","archived"]),unavailableReason:ce(["managed","subagent"]).optional(),updatedAt:sn().int().nonnegative().max(864e13).nullable().optional()}),$d=te().min(1).max(512),ih=_e("listExistingSessionsRequest",()=>St([J({sessionId:ro}),J({query:te().max(128).optional(),cursor:$d.optional()})])),sh=_e("listExistingSessionsResult",()=>J({items:Se(ir).max(100),nextCursor:$d.nullable(),binding:ir.nullable()})),ah=_e("setExistingSessionRequest",()=>J({sessionId:ro.nullable(),expectedSessionId:ro.nullable()})),lh=_e("setExistingSessionResult",()=>J({binding:ir.nullable()})),Od=te().min(1).max(160).regex(/^[A-Za-z0-9_-]+$/),ch=_e("operationLogPageRequest",()=>J({cursor:Od.optional()})),dh=_e("operationLogPage",()=>J({text:te().max(Zd),nextCursor:Od.nullable()})),Rd=te().uuid(),uh=_e("operationScopeResult",()=>J({scope:Rd})),ph=_e("recordOperationRequest",()=>J({scope:Rd,events:Se(J({id:te().uuid(),at:Fe,action:ce(eo),source:ce(["user","ui"]),phase:ce(["requested","finished"]).optional(),result:ce(["ok","failed","cancelled"]).optional(),count:Fe.positive().optional()}).refine(e=>e.action==="ui-buffer-overflow"?e.source==="ui"&&e.count!==void 0:e.count===void 0)).min(1).max(or)})),mh=_e("recordOperationResult",()=>J({accepted:be()})),fh=_e("retryVoiceTranscriptRequest",()=>J({id:Kd})),hh=_e("retryVoiceTranscriptResult",()=>J({accepted:be()})),gh={retryVoiceTranscript:fh,recordClientOperations:ph,readOperationLog:ch,action:nh,saveAuthorization:jf,manageSessions:th,whisperAsrAction:qf,updateAction:oh,listExistingVoiceSessions:ih,setExistingVoiceSession:ah},bh={readClientOperationScope:uh,recordClientOperations:mh,readOperationLog:dh,action:Wd,manageSessions:Wd,readAuthorization:Ad,saveAuthorization:Ad,whisperAsrAction:Jf,readSetup:Xf,followPresentation:rh,followModels:Vf,followUpdates:Id,updateAction:Id,listExistingVoiceSessions:sh,setExistingVoiceSession:lh,retryVoiceTranscript:hh},Me=(e,n,t=!1)=>({id:`dsh-fish-voice#${Zi}/${e}`,service:Zi,namespace:Zi,method:e,invocation:{kind:"direct"},...t?{mode:"stream"}:{},parameters:n.map(r=>({name:r,wire:r,source:"json",codec:r==="sessionId"?Wf:gh[e]??If})),cancellation:{parameter:"signal"},result:bh[e]??(t?$f:Of)}),Md={package:"dsh-fish-voice/conversation",descriptors:[Me("action",["sessionId","request"]),Me("follow",["sessionId"],!0),Me("followModels",["sessionId"],!0),Me("followPresentation",[],!0),Me("followUpdates",[],!0),Me("updateAction",["request"]),Me("readSetup",[]),Me("readAuthorization",[]),Me("saveAuthorization",["request"]),Me("whisperAsrAction",["request"]),Me("manageSessions",["sessionId","request"]),Me("readClientOperationScope",[]),Me("recordClientOperations",["request"]),Me("readOperationLog",["request"]),Me("listExistingVoiceSessions",["request"]),Me("setExistingVoiceSession",["request"]),Me("retryVoiceTranscript",["request"]),Me("readVolume",["sessionId"]),Me("setVolume",["sessionId","request"])]};var De=e=>e!==null&&typeof e=="object"&&!Array.isArray(e),qe=(e,n=1024)=>typeof e=="string"&&e.length<=n,qn=e=>typeof e=="number"&&Number.isFinite(e),Oe=e=>typeof e=="boolean",Dd=e=>{if(!qe(e,4096))return!1;try{let n=new URL(e);return["https:","http:"].includes(n.protocol)&&!n.username&&!n.password}catch{return!1}},bn=(e,n=4096)=>e==null||qe(e,n),Jn=e=>qe(e,256)&&e.length>0,Ce=()=>{throw new Error("\u914D\u7F6E\u63A5\u53E3\u8FD4\u56DE\u4E86\u65E0\u6548\u6570\u636E\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6")};function Ni(e){if(e.onboarding!==void 0&&(!De(e.onboarding)||e.onboarding.version!==1||!Oe(e.onboarding.completed))&&Ce(),e.ttsSetup!==void 0){let n=e.ttsSetup;(!De(n)||!["unconfigured","edge","deepseek","system","local","off"].includes(n.provider)||!qe(n.edgeVoice,128)||!(n.systemVoice===null||qe(n.systemVoice,512))||!Oe(n.systemFallback)||!Oe(n.edgeTextTransmissionAccepted)||!qn(n.volume)||n.volume<0||n.volume>1||!(n.localModelId==null||Jn(n.localModelId))||!bn(n.localModelPath)||!bn(n.referenceAudioPath)||!(n.referenceAudioAccepted===void 0||Oe(n.referenceAudioAccepted)))&&Ce(),(n.deepseekVoice!==void 0&&!["stella","tide"].includes(n.deepseekVoice)||n.deepseekTextTransmissionAccepted!==void 0&&!Oe(n.deepseekTextTransmissionAccepted)||n.provider==="deepseek"&&(n.deepseekVoice===void 0||n.deepseekTextTransmissionAccepted!==!0))&&Ce()}if(e.ttsRuntime?.localComputeBackend!=null&&(!["cpu","vulkan","cuda","hip"].includes(e.ttsRuntime.localComputeBackend)||!Oe(e.ttsRuntime.localComputeVerified)||!Oe(e.ttsRuntime.localComputeFallback))&&Ce(),e.ttsRuntime?.localTimings!=null){let n=e.ttsRuntime.localTimings;(!De(n)||typeof n.modelResident!="boolean"||["preparationMs","deviceSelectionMs","synthesisMs","playbackMs","totalMs","chunks"].some(t=>!Number.isSafeInteger(n[t])||n[t]<0)||n.chunks<1||n.chunks>4e3)&&Ce()}return e.ttsRuntime!=null&&(!De(e.ttsRuntime)||!qe(e.ttsRuntime.state,64)||!Oe(e.ttsRuntime.busy)||!Oe(e.ttsRuntime.blocked))&&Ce(),e}function Bd(e,n){if(De(n)||Ce(),e==="setup-status"&&(Object.keys(n).some(t=>!["version","completed"].includes(t))||n.version!==1||!Oe(n.completed))&&Ce(),e==="inspect-tts"&&(n.deepseekKeyAvailable!==void 0&&!Oe(n.deepseekKeyAvailable)&&Ce(),(!qe(n.platform,32)||!Oe(n.playbackSupported)||!Oe(n.systemSupported)||!Oe(n.edgePlaybackSupported)||!["installed","missing","unchecked"].includes(n.edgeDependency)||n.autoDownload!==!1||!Oe(n.gpuSupported)||n.edgeOfficialApi!==!1||n.edgeRecipient!=="Microsoft"||n.edgePurpose!=="speech-synthesis"||!Array.isArray(n.installedChineseVoices)||n.installedChineseVoices.length>512||n.installedChineseVoices.some(t=>!De(t)||!qe(t.id,512)||!qe(t.name,512)||!qe(t.culture,64)))&&Ce()),e==="preview-tts"){let t=n.playbackCompleted===!0&&n.textOnly===void 0,r=n.provider==="edge"&&n.playbackCompleted===!1&&n.textOnly===!0&&qe(n.reason,128);(!["edge","deepseek","local"].includes(n.provider)||n.fallback!==!1||n.acousticConfirmation!==!1||!t&&!r)&&Ce()}if(e==="cancel-tts"&&!["idle","cancelled","unconfirmed"].includes(n.status)&&Ce(),e==="model-installer"){if((n.schema!==1||!Array.isArray(n.models)||n.models.length>100||!Array.isArray(n.jobs)||n.jobs.length>1e3||!De(n.hardware)||!De(n.compute))&&Ce(),n.refresh!=null){let t=n.refresh;(!De(t)||!Oe(t.pending)||!bn(t.observedAt,64)||!bn(t.attemptedAt,64)||!bn(t.error,512)||!(t.intervalMs===void 0||qn(t.intervalMs)&&t.intervalMs>0&&t.intervalMs<=36e5))&&Ce()}for(let t of n.models)(!De(t)||!Jn(t.id)||!Oe(t.available)||t.runtimeLoaded!==!1||!bn(t.title)||!bn(t.reason)||!(t.totalBytes==null||qn(t.totalBytes)&&t.totalBytes>=0))&&Ce(),t.recommendation!=null&&(!De(t.recommendation)||!Oe(t.recommendation.recommended)||!bn(t.recommendation.reason))&&Ce();for(let t of n.jobs)Hd(t);if(n.ttsInstallIntent!=null){let t=n.ttsInstallIntent;(!De(t)||!Jn(t.jobId)||!Jn(t.modelId)||!["waiting","verifying","applied","blocked","paused","cancelled"].includes(t.status)||!bn(t.reason))&&Ce()}}return e==="inspect-model-compute"&&!De(n.compute)&&!De(n.backends)&&Ce(),e==="plan-model-install"&&(n.reused!==void 0&&(!Oe(n.reused)||n.reused!==!0||!qe(n.sourceDirectory,4096)||!n.sourceDirectory||!["q4_k_m","q8_0"].includes(n.modelVariant)||!qn(n.reusedBytes)||n.reusedBytes<0)&&Ce(),n.reused!==!0&&(n.sourceDirectory!==void 0||n.modelVariant!==void 0||n.reusedBytes!==void 0)&&Ce(),Array.isArray(n.files)&&n.files.some(t=>De(t)&&t.reused!==void 0&&!Oe(t.reused))&&Ce(),(!Jn(n.modelId)||!["cpu","auto","cuda","vulkan"].includes(n.compute)||!qe(n.planHash,128)||!Array.isArray(n.files)||n.files.length>200||!qn(n.totalBytes)||n.totalBytes<0||!qe(n.destination,4096)||!Array.isArray(n.licenseUrls)||n.licenseUrls.some(t=>!Dd(t))||!bn(n.source)||!bn(n.notice)||!bn(n.licenseNote)||n.files.some(t=>!De(t)||!Jn(t.name)||!qn(t.bytes)||t.bytes<0||!qe(t.sha256,64)||!/^[a-f0-9]{64}$/i.test(t.sha256)||!Dd(t.url)))&&Ce()),["start-model-install","control-model-install"].includes(e)&&Hd(n),Ni(n)}function Hd(e){De(e)&&e.error!=null&&(!De(e.error)||!qe(e.error.message,512))&&Ce(),(!De(e)||!Jn(e.id)||!Jn(e.modelId)||!["cpu","auto","cuda","vulkan"].includes(e.compute)||!["queued","running","paused","failed","cancelled","installed"].includes(e.status)||!qe(e.stage,128)||!qn(e.receivedBytes)||e.receivedBytes<0||!(e.totalBytes===null||qn(e.totalBytes)&&e.totalBytes>=0)||e.runtimeLoaded!==!1)&&Ce()}function $n(e,n){let t=i=>i!==null&&typeof i=="object"&&!Array.isArray(i),r=i=>typeof i=="string"&&i.length>0&&i.length<=256,o=i=>i===null||t(i)&&Object.keys(i).sort().join(",")==="code,modifiers"&&typeof i.code=="string"&&/^(F([1-9]|1[0-9]|2[0-4])|Key[A-Z]|Digit[0-9]|Space)$/.test(i.code)&&Array.isArray(i.modifiers)&&i.modifiers.length<=3&&new Set(i.modifiers).size===i.modifiers.length&&i.modifiers.every(s=>["Control","Alt","Shift"].includes(s))&&!(i.code==="F4"&&i.modifiers.includes("Alt"));if(!t(n))throw new Error("Fish Voice UI returned invalid data");if(n.wake!==void 0&&!(n.wake===null&&e!=="conversation")&&!Yi(n.wake))throw new Error("Invalid wake state");if(n.listenMode!==void 0&&n.listenMode!==null&&!mt.includes(n.listenMode))throw new Error("Invalid listening mode");if(["status","enable","disable","new","resume","listen-mode"].includes(e)){if(!(n.ownerSessionId===null||r(n.ownerSessionId))||typeof n.enabled!="boolean"||!t(n.helper)||typeof n.helper.online!="boolean")throw new Error("Fish Voice UI returned an invalid status");if(n.existingVoiceSessionSupported!==void 0&&typeof n.existingVoiceSessionSupported!="boolean")throw new Error("Invalid existing session support");if(n.existingVoiceSession!=null&&!ir.safeParse(n.existingVoiceSession).success)throw new Error("Invalid existing voice session");if(n.helper.lastError!=null&&(typeof n.helper.lastError!="string"||n.helper.lastError.length>512))throw new Error("Invalid audio diagnostic")}else if(["save-voice-prompt","save-conversation-model","save-bindings","read-settings","save-settings","save-audio-device","save-models","set-visibility","set-performance-mode","save-tts","complete-setup","apply-model-install"].includes(e)){if(n.bindingContext!==void 0&&(!t(n.bindingContext)||["ownerSessionId","epoch","rootSessionId"].some(s=>n.bindingContext[s]!==null&&!r(n.bindingContext[s]))))throw new Error("Invalid binding context");let i=n.values;if(typeof n.revision!="string"||!n.revision||!t(i)||![0,1,2].includes(i.pttMouse)||!t(i.speakerVerification)||typeof i.speakerVerification.enabled!="boolean"||!(Dt(i.device)||typeof i.device=="string"&&i.device.length<=256&&!/[\u0000-\u001f\u007f]/.test(i.device)||Number.isSafeInteger(i.device)&&i.device>=0))throw new Error("Fish Voice UI returned invalid settings");if(i.wakeWordAliases!==void 0&&!wr(i.wakeWordAliases))throw new Error("Invalid wake aliases");if(i.wakeListenTimeoutMs!==void 0&&(!Number.isInteger(i.wakeListenTimeoutMs)||i.wakeListenTimeoutMs<3e3||i.wakeListenTimeoutMs>3e4))throw new Error("Invalid wake timeout");if(i.semanticExperimental!==void 0&&typeof i.semanticExperimental!="boolean")throw new Error("Invalid experimental wake setting");if(i.pttKeyboard!==void 0&&!o(i.pttKeyboard))throw new Error("Invalid keyboard binding");if(n.capabilities?.pttKeyboard!==void 0){let s=n.capabilities.pttKeyboard;if(!t(s)||typeof s.supported!="boolean"||s.scope!=="global"||s.platform!=="win32"||!["available","unsupported"].includes(s.status)||!(s.reason==null||typeof s.reason=="string")||s.supported!==(s.status==="available"))throw new Error("Invalid keyboard capability")}if(n.modelSetup!==void 0&&(!t(n.modelSetup)||!["sensevoice","whisper","whisper-wasm"].includes(n.modelSetup.asr)||!t(n.modelSetup.models)||n.modelSetup.modelCompute!==void 0&&!["cpu","auto","cuda"].includes(n.modelSetup.modelCompute)||["sensevoiceDir","whisper","campplus"].some(s=>typeof n.modelSetup.models[s]!="string")))throw new Error("Fish Voice UI returned invalid model configuration");if(n.capabilities?.turnSignals===!0){let s=i.turnSignals;if(!t(s)||typeof s.enabled!="boolean"||typeof s.headphonesConfirmed!="boolean"||typeof s.experimentalAutomaticBargeIn!="boolean"||typeof s.volume!="number"||!Number.isFinite(s.volume)||s.volume<0||s.volume>1)throw new Error("Fish Voice UI returned invalid turn sound settings")}}else if(e==="list"&&(!Array.isArray(n.items)||n.items.length>50||!(n.nextCursor==null||typeof n.nextCursor=="string"&&n.nextCursor.length<=2048)||n.items.some(i=>!t(i)||!r(i.id)||typeof i.archived!="boolean"||typeof i.available!="boolean"||typeof i.canResume!="boolean"||i.title!==void 0&&typeof i.title!="string"||i.reason!==void 0&&typeof i.reason!="string")))throw new Error("Fish Voice UI returned invalid voice history");if(n.voicePrompt!==void 0){let i=n.voicePrompt;if(!t(i)||typeof i.text!="string"||i.text.length>32768||!["agents","custom"].includes(i.mode)||typeof i.customSupported!="boolean"||!(i.unsupportedReason===null||typeof i.unsupportedReason=="string"&&i.unsupportedReason.length<=512)||i.mode==="custom"&&(!i.text.trim()||!i.customSupported)||i.mode==="agents"&&i.customSupported&&i.text.trim())throw new Error("Invalid voice prompt preference")}if(n.conversationModel!==void 0&&(!t(n.conversationModel)||!["auto","manual"].includes(n.conversationModel.mode)||![n.conversationModel.provider,n.conversationModel.model].every(i=>i===null||r(i))||n.conversationModel.mode==="auto"&&(n.conversationModel.provider!==null||n.conversationModel.model!==null)))throw new Error("Invalid conversation model preference");if(e==="conversation-models"&&(!Array.isArray(n.providers)||n.providers.length>256||new Set(n.providers.map(i=>i?.id)).size!==n.providers.length||n.providers.some(i=>!t(i)||!r(i.id)||!r(i.name)||!Array.isArray(i.models)||i.models.length>2048||new Set(i.models.map(s=>s?.id)).size!==i.models.length||i.models.some(s=>!t(s)||!r(s.id)||!r(s.name)))))throw new Error("Invalid conversation model catalog");if(e==="read-audio-devices"&&!Ji(n))throw new Error("Invalid audio device inventory");if(n.audioDevices!==void 0&&(!t(n.audioDevices)||!Dt(n.audioDevices.output)||!(Dt(n.audioDevices.input)||typeof n.audioDevices.input=="string"||Number.isSafeInteger(n.audioDevices.input))))throw new Error("Invalid audio device preferences");if(e==="inspect-performance"&&(!Array.isArray(n.modes)||n.modes.some(i=>!t(i)||!["fast","balanced","high"].includes(i.performanceMode)||typeof i.available!="boolean")))throw new Error("Invalid performance capabilities");if(e==="read-history"&&(!(n.rootSessionId===null||r(n.rootSessionId))||!Number.isSafeInteger(n.generation)||n.generation<0||!Number.isSafeInteger(n.revision)||n.revision<0||!["voice-session","current-voice-session"].includes(n.scope)||typeof n.truncated!="boolean"||!(n.nextCursor===null||typeof n.nextCursor=="string"&&/^\d+:\d+$/.test(n.nextCursor))||!Array.isArray(n.items)||n.items.length>100||new Set(n.items.map(i=>i?.id)).size!==n.items.length||n.items.some(i=>!t(i)||!r(i.id)||!["user","assistant"].includes(i.role)||typeof i.text!="string"||i.text.length>8e3||!["reply","interrupted","delivered","speech-requested","speech-failed"].includes(i.state)||!Number.isFinite(i.at))))throw new Error("Invalid conversation history");if(e==="conversation"){if(n.helper!==void 0&&(!t(n.helper)||typeof n.helper.online!="boolean"||!(n.helper.listenMode===null||mt.includes(n.helper.listenMode))||!n.helper.online&&n.helper.listenMode!==null))throw new Error("Invalid conversation helper state");if(n.inputError!=null&&!["device","recognition","no-speech"].includes(n.inputError))throw new Error("Invalid input error");if(n.providerError!==void 0&&(typeof n.providerError!="string"||n.providerError.length>480))throw new Error("Invalid provider error");if(!Number.isSafeInteger(n.revision)||n.revision<0||n.title!==null||!(n.rootSessionId===null||r(n.rootSessionId))||!Array.isArray(n.items)||n.items.length>40||typeof n.inputActive!="boolean"||n.playbackConfirmed!==!1||n.items.some(i=>!t(i)||!r(i.id)||!["user","assistant"].includes(i.role)||typeof i.text!="string"||i.text.length>8e3||!["reply","interrupted","delivered","speech-requested","speech-failed"].includes(i.state)||!Number.isFinite(i.at))||n.latest!==null&&(!t(n.latest)||!n.items.some(i=>i.id===n.latest.id&&i.text===n.latest.text&&i.role==="assistant")))throw new Error("Invalid conversation snapshot")}if(e==="output-volume"&&(typeof n.supported!="boolean"||n.supported&&(typeof n.volume!="number"||!Number.isFinite(n.volume)||n.volume<0||n.volume>1||n.revision==null)))throw new Error("Invalid output volume snapshot");if(["agent-permissions","save-agent-permissions"].includes(e)){let i=["set-performance-mode","set-visibility","set-output-volume"];if(n.schema!==1||!r(n.revision)||!Array.isArray(n.items)||n.items.length!==3||new Set(n.items.map(s=>s?.operation)).size!==3||n.items.some(s=>!t(s)||!i.includes(s.operation)||typeof s.allowed!="boolean"||typeof s.title!="string"||s.title.length>128||!(s.reason===null||typeof s.reason=="string"&&s.reason.length<=1024)))throw new Error("Invalid agent permissions")}if(["agent-requests","decide-agent-request"].includes(e)){let i=s=>t(s)&&r(s.id)&&r(s.sourceSessionId)&&r(s.operation)&&typeof s.title=="string"&&s.title.length<=128&&["pending","executing","completed","blocked","unknown","superseded","expired","cancelled","rejected"].includes(s.state)&&Number.isFinite(s.createdAt)&&Number.isFinite(s.expiresAt)&&Number.isSafeInteger(s.humanRevision)&&t(s.request)&&t(s.before)&&Array.isArray(s.acknowledgements)&&s.acknowledgements.length<=10&&s.acknowledgements.every(c=>t(c)&&r(c.id)&&typeof c.text=="string"&&c.text.length<=1024)&&(s.error===null||t(s.error)&&typeof s.error.code=="string"&&typeof s.error.message=="string"&&s.error.message.length<=1024)&&(s.nextAction===null||typeof s.nextAction=="string"&&s.nextAction.length<=1024);if(n.schema!==1||!Number.isSafeInteger(n.humanRevision)||n.humanRevision<0||!Array.isArray(n.items)||n.items.length>100||n.items.some(s=>!i(s))||e==="decide-agent-request"&&(!i(n.lastOutcome)||!n.items.some(s=>s.id===n.lastOutcome.id&&s.state===n.lastOutcome.state)))throw new Error("Invalid agent request snapshot")}if(e==="authorization"){if(n.usageAgreement!==void 0&&(!t(n.usageAgreement)||n.usageAgreement.version!==1||typeof n.usageAgreement.accepted!="boolean"||!Array.isArray(n.usageAgreement.text)||n.usageAgreement.text.length>16||n.usageAgreement.text.some(i=>typeof i!="string"||i.length>4096)))throw new Error("Invalid usage agreement snapshot");if(n.schema!==1||!r(n.revision)||!Array.isArray(n.blockedOperations)||n.blockedOperations.some(i=>typeof i!="string")||typeof n.revocationUnconfirmed!="boolean"||typeof n.completed!="boolean"||typeof n.granted!="boolean"||!Array.isArray(n.scopes)||n.scopes.length>16||new Set(n.scopes.map(i=>i?.id)).size!==n.scopes.length||n.scopes.some(i=>!t(i)||!r(i.id)||typeof i.title!="string"||typeof i.description!="string"||typeof i.allowed!="boolean")||!Array.isArray(n.modelSources)||n.modelSources.length>32||n.modelSources.some(i=>!t(i)||!r(i.modelId)||typeof i.source!="string"||!Array.isArray(i.licenseUrls)||i.licenseUrls.some(s=>typeof s!="string")||typeof i.licenseNote!="string")||!Array.isArray(n.restrictions)||n.restrictions.some(i=>typeof i!="string"))throw new Error("Invalid authorization snapshot")}if(n.inferenceCompute!=null){let i=n.inferenceCompute;if(!t(i)||!["cpu","auto","cuda"].includes(i.requested)||![null,"cpu","cuda"].includes(i.actual)||!["sensevoice","whisper","whisper-wasm"].includes(i.engine)||!(i.computeType===null||["int8","float16","int8_float16","int8_float32","float32"].includes(i.computeType))||!(i.deviceIndex===null||Number.isSafeInteger(i.deviceIndex)&&i.deviceIndex>=0&&i.deviceIndex<8)||![null,"gpu-unavailable","gpu-load-failed","gpu-inference-failed","model-gpu-unverified"].includes(i.fallbackReason)||typeof i.validated!="boolean")throw new Error("Invalid inference compute status")}if(n.inputDevices!==void 0&&!es(n.inputDevices))throw new Error("Invalid input device inventory");if(n.ptt?.keyboard!==void 0&&n.ptt.keyboard!==null){let i=n.ptt.keyboard;if(!t(i)||typeof i.supported!="boolean"||i.scope!=="global"||!["unsupported","active","inactive","unknown"].includes(i.status)||typeof i.hookInstalled!="boolean"||typeof i.recording!="boolean"||!(i.observedAt==null||Number.isFinite(i.observedAt)))throw new Error("Invalid keyboard status")}if(n.voiceSession?.recovery!==void 0){let i=n.voiceSession.recovery;if(!t(i)||i.stopVerified!==void 0&&typeof i.stopVerified!="boolean"||i.stopVerified===!0&&(i.kind!=="none"||n.voiceSession.fullyStopped!==!0)||!["none","live-root-conflict","predecessor-cleanup-pending","predecessor-stop-unconfirmed","helper-cleanup-pending","helper-stop-unconfirmed"].includes(i.kind)||!(i.rootSessionId===null||r(i.rootSessionId))||i.kind!=="none"&&n.voiceSession.fullyStopped===!0)throw new Error("Invalid voice recovery state")}if(n.voiceSession?.visibility!==void 0&&!["hidden","workspace"].includes(n.voiceSession.visibility))throw new Error("Fish Voice UI returned invalid visibility");if(n.voiceCapabilities!==void 0){let i=n.voiceCapabilities;if(!t(i)||!(i.configuredVisibility===null||["hidden","workspace"].includes(i.configuredVisibility))||["hidden","workspace"].some(s=>!t(i[s])||typeof i[s].supported!="boolean")||!t(i.taskHandoff)||typeof i.taskHandoff.mode!="string")throw new Error("Fish Voice UI returned invalid host capabilities")}return Ni(n),["setup-status","inspect-tts","preview-tts","cancel-tts","model-installer","inspect-model-compute","plan-model-install","start-model-install","control-model-install"].includes(e)&&Bd(e,n),n}function Fd(e,n=10){let t=0;for(let r=e.length-1;r>=0;r--)if(e[r].role==="user"&&++t===n)return e.slice(r);return e}function Ud(e=[],n=[]){let t=new Map(e.map(r=>[r.id,r]));for(let r of n)t.set(r.id,r);return[...t.values()].sort((r,o)=>r.at-o.at)}function Ld(e,n=36){return e.scrollHeight-e.scrollTop-e.clientHeight<=n}function Vd({enabled:e,active:n,unknown:t,pending:r}){return t?"unknown":r?"pending":e?n?"listening":"standby":"off"}function sr(e){return e?.enabled?e.existingVoiceSession?.sessionId??e.voiceSession?.id??null:null}var jd=["save-voice-prompt","save-conversation-model","save-bindings","read-settings","save-settings","save-audio-device","save-models","set-visibility","set-performance-mode","save-tts","complete-setup","apply-model-install"],ar=jd.filter(e=>e!=="read-settings"),lr=["status","enable","disable","new","resume","listen-mode"],vh=new Set(["status","enable","disable","listen-mode","read-history"]),yh=["save-bindings","inspect-tts","inspect-model-compute"],On=new Set(["conversation-models","status","read-settings","read-output-volume","model-installer","agent-permissions","agent-requests"]),zt=["conversation-models","agent-permissions","agent-requests","status","read-settings","list","read-output-volume","inspect-performance","inspect-tts","model-installer","inspect-model-compute","plan-model-install"];function qd(e,{schedule:n=(o,i)=>globalThis.setTimeout(o,i),unschedule:t=o=>globalThis.clearTimeout(o),observe:r=()=>{}}={}){let o=0,i={conversationHistory:null,conversationHistoryFor:null,conversationHistoryError:null,conversationHistoryLoading:!1,conversationHistoryRequestCursor:null},s={...i,conversationModels:null,conversationModelsFor:null,conversationModelsError:null,authorization:null,authorizationOpen:!1,authorizationLoading:!1,authorizationBusy:!1,authorizationUncertain:!1,authorizationError:null,agentRequests:null,agentRequestsFor:null,busy:!1,interruptibleRead:null,diagnosticStopPending:!1,error:null,status:null,settings:null,settingsFor:null,visibilityUncertain:!1,visibilityReadbackFor:null,catalog:null,checkedFor:null,catalogFor:null,uncertain:!1,performance:null,performanceFor:null,performancePending:!1,performanceError:null,conversation:null,conversationFor:null,conversationError:null,outputVolume:null,outputVolumeFor:null,outputVolumeUncertain:!1,setupStatus:null,setupOpen:!1,panelView:"home",setupError:null,ttsCapabilities:null,ttsCapabilitiesFor:null,ttsPreview:null,ttsPreviewFor:null,ttsCancelling:!1,ttsUncertain:!1,installer:null,installerFor:null,installerError:null,installerUncertain:!1,installPlan:null,installPlanFor:null},c=new Set,l=null,d=!0,u=!0,p=0,f=null,m=null,y=0,v=new Map,b=()=>{for(let w of v.values())w.stale=!0,w.abort.abort();v.clear()},_=()=>{b(),f&&(f.stale=!0,On.has(f.action)&&f.abort.abort())},Z=!1,K=null,O=!1,N=null,T=0,P=0,E=new Map,k=!0,S=null,C=null,R=null,z,A=null,I=0,V=0,B=!1,F=null,X=null,ue=new Set,de=new Set,Q=new Set,q=new Set,W=w=>{if(!k)return;let x=Object.hasOwn(w,"uncertain")?w.readOnlyFailure===!0:s.readOnlyFailure;s={...s,...w,readOnlyFailure:x};for(let M of ue)M()},ne,pe,ge=0,Ie=w=>["checking","installing"].includes(w?.status),Le=(w,x)=>{x?.revision!==void 0&&w.revision<x.revision||(x&&w.revision!==void 0&&(x.revision=w.revision),W({updates:w,updatesUnavailable:!1}))},Ge=()=>{if(!k||!S?.subscribeUpdates||ne||!d)return;let w=S,x={};ne=x,x.stop=w.subscribeUpdates(M=>{!k||ne!==x||(ge++,Zn("update-stream"),Le(M,x))},()=>{!k||ne!==x||(ne=null,W({updatesUnavailable:!0}),Ve(C,"update-stream"))})},at=()=>{let w=ne;ne=null,w?.stop?.(),pe?.abort(),pe=null,W({updates:null,updatePending:null,updatesUnavailable:!1})},Cn=async w=>{if(!k||!S?.updateAction||pe)return;let{action:x,version:M}=w;if(x==="install"&&(s.updatesUnavailable||s.updates?.canInstall!==!0||s.updates?.release?.version!==M))return;let H=S,L=new AbortController;pe=L,Ge();let ee=ne,xe=ge;W({updatePending:x});try{let ve=await H.updateAction(w,L.signal);k&&pe===L&&ne===ee&&(ve.revision===void 0&&Ie(ve)&&ge!==xe&&!Ie(s.updates)||Le(ve,ee))}catch{let ve=ge!==xe&&!Ie(s.updates);k&&pe===L&&ne===ee&&!ve&&W({updatesUnavailable:!0})}finally{pe===L&&(pe=null,W({updatePending:null}))}},Ee=0,ie=w=>{Ee++,W({...w,ttsUncertain:!0})},Be=()=>s.status?.existingVoiceSession?null:C,Je=null,Pn=()=>{Je=null,W({transcriptRetry:null})},lt=w=>{if(!Je?.receipt||w?.rootSessionId!==Je.sessionId)return;let x=w.retryTranscripts?.items.find(M=>M.id===Je.id);(!x||x.state!=="ready"||Je.receipt==="unconfirmed"&&w.revision>Je.revision)&&Pn()},go=async(w,x)=>{let{status:M,conversation:H,checkedFor:L,conversationFor:ee,uncertain:xe,busy:ve}=s,$e=M?.existingVoiceSession?.sessionId;if(!k||!S?.retryVoiceTranscript||Je||xe||ve||C!==w||L!==w||ee!==w||!M?.enabled||!$e||H?.rootSessionId!==$e||H.retryTranscripts?.sessionId!==$e||!H.retryTranscripts.items.some(An=>An.id===x&&An.state==="ready"))return;let en=S,Nn=new AbortController,yn=Je={id:x,sessionId:$e,revision:H.revision,receipt:null};de.add(Nn),W({transcriptRetry:{id:x,state:"sending"}});try{let An=await en.retryVoiceTranscript({id:x},Nn.signal);if(!k||Je!==yn)return;An.accepted===!1?Pn():yn.receipt="accepted"}catch{if(!k||Je!==yn)return;yn.receipt="unconfirmed"}finally{de.delete(Nn),Je===yn&&(yn.receipt==="unconfirmed"&&W({transcriptRetry:{id:x,state:"uncertain"}}),lt(s.conversation))}},fn=async(w,x,M)=>{let H=e??S?.action;if(!H)throw new Error("\u9C7C\u5E94\u754C\u9762\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let L=s.status?.existingVoiceSession&&vh.has(x.action)||s.existingSessionUnconfirmed&&x.action==="status"?null:w,ee=await H(L,x,M);try{return $n(x.action,ee)}catch(xe){throw r("ui-render-error","finished","failed"),xe}},ae=null,fr=({clear:w=!1}={})=>{let x=ae;ae=null,x?.abort.abort(),W({audioDevicesPending:!1,audioDevicesError:null,...w?{audioDevices:null,audioDevicesFor:null}:{}})},Vu=w=>{if(!k||C!==w)return Promise.resolve(!1);if(ae?.id===w&&ae.client===S)return ae.promise;fr();let x={id:w,client:S,scope:P,abort:new AbortController,promise:null};ae=x,de.add(x.abort),W({audioDevicesPending:!0,audioDevicesError:null});let M=()=>k&&ae===x&&C===w&&S===x.client&&P===x.scope;return x.promise=(async()=>{let H;try{let L=new Promise((xe,ve)=>{H=()=>ve(new Error("Device read cancelled")),x.abort.signal.addEventListener("abort",H,{once:!0})}),ee=await Promise.race([fn(w,{action:"read-audio-devices"},x.abort.signal),L]);return M()?(W({audioDevices:ee,audioDevicesFor:w}),!0):!1}catch(L){return M()&&!x.abort.signal.aborted&&W({audioDevicesError:String(L?.message??L)}),!1}finally{x.abort.signal.removeEventListener("abort",H),de.delete(x.abort),M()&&(ae=null,W({audioDevicesPending:!1}))}})(),x.promise},Dn=null,ju=w=>{if(!k||C!==w)return Promise.resolve(!1);if(Dn?.id===w&&Dn.scope===P)return Dn.promise;let x={id:w,scope:P,client:S,promise:null};Dn=x;let M=()=>k&&Dn===x&&C===w&&P===x.scope&&S===x.client;return W({modelComputePending:!0,modelComputeError:null}),x.promise=(async()=>{try{if(await fn(w,{action:"inspect-model-compute"}),!M())return!1;let H=await fn(w,{action:"model-installer"});return M()?(W({installer:H,installerFor:w,installerError:null}),B||(B=!0,ct(!0)),!0):!1}catch(H){if(!M())return!1;let L=H?.uncertain||/TTS_TERMINATION_UNCONFIRMED/.test(String(H?.code??"")+" "+String(H?.message??""));return W({modelComputeError:String(H?.message??H),...L?{installerUncertain:!0,installerTerminationUnconfirmed:!0}:{}}),!1}finally{M()&&(Dn=null,W({modelComputePending:!1}))}})(),x.promise},Hn=null,bo=0,Wt=({clear:w=!1}={})=>{bo++;let x=Hn;Hn=null,x?.abort.abort(),W({performancePending:!1,performanceError:null,...w?{performance:null,performanceFor:null}:{}})},qu=w=>{if(!k||C!==w)return Promise.resolve(!1);if(Hn?.id===w&&Hn.client===S)return Hn.promise;Wt();let x={id:w,client:S,epoch:bo,abort:new AbortController,promise:null};Hn=x,de.add(x.abort),W({performancePending:!0,performanceError:null});let M=()=>k&&Hn===x&&x.epoch===bo&&C===w&&S===x.client;return x.promise=(async()=>{let H;try{let L=new Promise((xe,ve)=>{H=()=>ve(new Error("Probe cancelled")),x.abort.signal.addEventListener("abort",H,{once:!0})}),ee=await Promise.race([fn(w,{action:"inspect-performance"},x.abort.signal),L]);return M()?(W({performance:ee,performanceFor:w}),!0):!1}catch(L){return M()&&!x.abort.signal.aborted&&W({performanceError:String(L?.message??L)}),!1}finally{x.abort.signal.removeEventListener("abort",H),de.delete(x.abort),M()&&(Hn=null,W({performancePending:!1}))}})(),x.promise},It=()=>{let w=E.get("conversation-stream");w&&(w.timer!==null&&t(w.timer),w.timer=null,w.ready=!1);let x=++I;if(R?.(),R=null,o++,W({...i,conversation:null,conversationFor:null,conversationError:null,listenModeReceiptRevision:null}),z=void 0,!k||!S)return;let M=C;z=Be(),R=S.subscribe(z,(H,L)=>{if(!(!k||x!==I||C!==M))try{let ee=$n("conversation",H);L?.initial||Zn("conversation-stream"),s.conversationHistory&&(s.conversationHistory.rootSessionId!==ee.rootSessionId||s.conversationHistory.scope!=="voice-session"&&s.conversationHistory.generation!==ee.historyGeneration)&&(o++,W({...i}));let xe=s.conversationHistory,ve={};if(xe?.rootSessionId&&xe.rootSessionId===ee.rootSessionId){let $e=new Map(xe.items.map(U=>[U.id,U]));for(let U of ee.items)$e.set(U.id,U);let en=[...$e.values()].sort((U,Ne)=>U.at-Ne.at),Nn=en.slice(-4e3),yn=Nn.reduce((U,Ne)=>U+Ne.text.length,0),An=en.length>4e3;for(;yn>4*1024*1024;)yn-=Nn.shift().text.length,An=!0;ve={conversationHistory:{...xe,items:Nn,truncated:xe.truncated||An}}}W({...ve,conversation:ee,conversationFor:M,conversationError:null}),lt(ee)}catch(ee){o++,W({...i,conversation:null,conversationFor:null,conversationError:String(ee.message)}),Ve(M,"conversation-stream")}},H=>{k&&x===I&&(o++,W({...i,conversation:null,conversationFor:null,conversationError:String(H?.message??H)}),Ve(M,"conversation-stream"))})},ct=(w=!1)=>{let x=E.get("model-stream");x&&(x.timer!==null&&t(x.timer),x.timer=null,x.ready=!1);let M=++V;if(A?.(),A=null,w||W({installer:null,installerFor:null,installerError:null}),!k||!S?.subscribeModels||!B)return;let H=C;A=S.subscribeModels(H,(L,ee)=>{if(!(!k||M!==V||C!==H||ee?.initial))try{let xe=$n("model-installer",L),ve=s.installer?.ttsInstallIntent;if(Zn("model-stream"),W({installer:xe,installerFor:H,installerError:null}),xe.ttsInstallIntent&&(ve?.jobId!==xe.ttsInstallIntent.jobId||ve?.status!==xe.ttsInstallIntent.status)){let $e=xe.ttsInstallIntent.status==="applied";W({checkedFor:null}),Xe({settings:$e,force:!0})}}catch(xe){W({installer:null,installerFor:null,installerError:String(xe.message)}),Ve(H,"model-stream")}},L=>{k&&M===V&&(W({installer:null,installerFor:null,installerError:String(L?.message??L)}),Ve(H,"model-stream"))})},Bn=()=>{if(X)return X;if(!F)return Promise.resolve(!0);let w=F,x=Ee;return w.cancelled=!0,w.abort.abort(),W({ttsCancelling:!0,ttsPreview:{status:"cancelling"}}),X=(async()=>{let M=!1;try{let H=await fn(w.id,{action:"cancel-tts"});return H.status==="unconfirmed"?(K=null,ie({ttsPreview:H,uncertain:!0,error:"\u65E0\u6CD5\u786E\u8BA4\u6717\u8BFB\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B\u540E\u518D\u8BD5\u3002"}),!1):(M=!0,W({ttsPreview:H,...x===Ee?{ttsUncertain:!1}:{}}),!0)}catch(H){return K=null,ie({ttsPreview:{status:"unconfirmed"},uncertain:!0,error:String(H?.message??H)}),!1}finally{M&&F===w&&(F=null),W({ttsCancelling:!1}),X=null,queueMicrotask(()=>{br(),pt()})}})(),X},Zn=w=>{let x=E.get(w);x?.timer!=null&&t(x.timer),E.delete(w)},vo=()=>{for(let w of E.keys())Zn(w)},Ve=(w,x)=>{if(!k||!Z||C!==w||!["authorization","setup-status","conversation-stream","model-stream","update-stream"].includes(x)&&!On.has(x))return;let M=E.get(x);M||(M={id:w,scope:P,attempts:0,timer:null,ready:!1},E.set(x,M)),!(M.timer!==null||M.ready||!d||!u)&&(M.attempts++,r("ui-read-recovery","requested"),M.timer=n(()=>{M.timer=null,!(!k||C!==w||M.scope!==P||E.get(x)!==M)&&(M.ready=!0,pt())},Math.min(3e4,750*2**Math.min(M.attempts-1,6))),M.timer?.unref?.())},Fn=null,hr=0,dt=()=>{Fn!==null&&t(Fn),Fn=null,hr=0},Hi=w=>{!k||!d||!u||C!==w||Fn!==null||hr>=10||(Fn=n(()=>{if(Fn=null,!(!k||C!==w||!["predecessor-cleanup-pending","helper-cleanup-pending"].includes(s.status?.voiceSession?.recovery?.kind))){if(s.busy||s.ttsCancelling){Hi(w);return}hr++,Qe.run(w,"status")}},1e3),Fn?.unref?.())},Qe,Qn=0,gr=null,Gt=null,ut=null,Kt=!1,Ju=async w=>{let x=S,M=[],H=new Set;if(!k||!x?.readOperationLog)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u672A\u5C31\u7EEA");let L=null;do{w?.throwIfAborted();let ee=await x.readOperationLog(L?{cursor:L}:{},w);if(!k||S!==x||w?.aborted)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u8FDE\u63A5\u5DF2\u53D8\u5316");if(typeof ee?.text!="string"||!(ee.nextCursor===null||typeof ee.nextCursor=="string"&&ee.nextCursor)||H.has(ee.nextCursor))throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u5206\u9875\u65E0\u6548");M.push(ee.text),L=ee.nextCursor,H.add(L)}while(L);return M},Xu=async(w,x)=>{if(!k||!S?.manageSessions)throw new Error("\u9C7C\u5E94\u4F1A\u8BDD\u7BA1\u7406\u5C1A\u672A\u5C31\u7EEA");let M=S,H=await M.manageSessions(null,w,x);if(!k||S!==M||x?.aborted)throw new Error("\u4F1A\u8BDD\u7BA1\u7406\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5");return H},Yu=async(w,x)=>{if(!k||!S?.listExistingVoiceSessions)throw new Error("DSH \u4F1A\u8BDD\u5217\u8868\u6682\u4E0D\u53EF\u7528");let M=S,H=await M.listExistingVoiceSessions(w,x);if(!k||S!==M||x?.aborted)throw new Error("\u4F1A\u8BDD\u5217\u8868\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5");return H},et=null,Qu=async w=>{if(!k||!S?.setExistingVoiceSession||et||s.existingSessionUnconfirmed)throw new Error("DSH \u4F1A\u8BDD\u7ED1\u5B9A\u6682\u4E0D\u53EF\u7528");let x=S,M=new AbortController;et=M,de.add(M);for(let H of[v.get("status"),f])H?.action==="status"&&(H.stale=!0,H.abort.abort());W({existingSessionWritePending:!0});try{let H=await x.setExistingVoiceSession(w,M.signal);if(!k||S!==x||M.signal.aborted)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u786E\u8BA4");return s.status&&W({status:{...s.status,existingVoiceSession:H.binding}}),z!==Be()&&It(),H}catch(H){throw W({existingSessionUnconfirmed:!0}),H}finally{de.delete(M),et=null,W({existingSessionWritePending:!1}),Xe({force:!0})}},ep=async(w,x)=>{if(!k||!S?.whisperAsrAction)throw new Error("\u8BC6\u522B\u6A21\u578B\u7BA1\u7406\u6682\u4E0D\u53EF\u7528");let M=S,H=await M.whisperAsrAction(w,x);if(!k||S!==M||x?.aborted)throw new Error("\u8BC6\u522B\u6A21\u578B\u72B6\u6001\u5DF2\u5207\u6362");let L=ee=>ee&&["idle","downloading","ready","error"].includes(ee.state)&&Number.isSafeInteger(ee.receivedBytes)&&Number.isSafeInteger(ee.totalBytes)&&ee.receivedBytes>=0&&ee.receivedBytes<=ee.totalBytes;if(!L(H)||typeof H.selected!="boolean"||H.acceleration!==void 0&&!L(H.acceleration)||H.message!==null&&(typeof H.message!="string"||H.message.length>512))throw new Error("\u8BC6\u522B\u6A21\u578B\u72B6\u6001\u65E0\u6548");return H},nt=async({open:w=!1,initial:x=!1}={})=>{if(!S?.readAuthorization)return!1;if(Gt)return ut={open:w||ut?.open,initial:x||ut?.initial},w&&W({authorizationOpen:!0}),!1;let M=++Qn,H=new AbortController;de.add(H),gr=H,W({authorizationLoading:!0,authorizationError:null,...w?{authorizationOpen:!0}:{}});try{let L=$n("authorization",await S.readAuthorization(H.signal));return!k||M!==Qn?!1:(Zn("authorization"),W({authorization:L,authorizationUncertain:L.revocationUnconfirmed,...x&&!Kt&&(!L.completed||L.usageAgreement?.accepted!==!0||L.revocationUnconfirmed)?{authorizationOpen:!0}:{}}),!0)}catch(L){return k&&M===Qn&&(W({authorizationError:String(L?.message??L),authorizationUncertain:!0,...x?{authorizationOpen:!0}:{}}),Ve(C,"authorization")),!1}finally{de.delete(H),gr===H&&(gr=null,k&&W({authorizationLoading:!1}))}},np=async w=>{if(!S?.saveAuthorization||!s.authorization||s.authorizationBusy||s.authorizationUncertain)return!1;let x=new AbortController,M=++Qn,H=S;de.add(x),Gt=x,W({authorizationBusy:!0,authorizationError:null});try{let L=$n("authorization",await H.saveAuthorization({revision:s.authorization.revision,grant:w},x.signal));return!k||M!==Qn||S!==H?!1:(Kt=!1,W({authorization:L,authorizationOpen:L.revocationUnconfirmed,authorizationUncertain:L.revocationUnconfirmed,...L.revocationUnconfirmed?{authorizationError:"\u6743\u9650\u5DF2\u64A4\u56DE\uFF0C\u4F46\u5F53\u524D\u97F3\u9891\u505C\u6B62\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u6838\u67E5\u72B6\u6001\u3002"}:{}}),w&&!L.revocationUnconfirmed&&Qe.openSetup(),Xe({settings:!0,force:!0}),!0)}catch(L){try{let ee=$n("authorization",await H.readAuthorization(x.signal));if(k&&S===H&&M===Qn&&ee.completed&&ee.granted===w&&!ee.revocationUnconfirmed)return Kt=!1,W({authorization:ee,authorizationOpen:!1,authorizationUncertain:!1}),w&&Qe.openSetup(),!0}catch{}return k&&S===H&&M===Qn&&(W({authorizationUncertain:!0,authorizationError:String(L?.message??L)}),Ve(C,"authorization")),!1}finally{if(de.delete(x),Gt===x&&(Gt=null,k&&W({authorizationBusy:!1}),k&&(ut||S!==H))){let L=ut??{initial:!0};ut=null,nt(L)}}},tt=null,yo=0,_o=()=>{if(!S?.readSetup||tt)return tt?.promise;let w=S,x=yo,M=new AbortController,H={promise:null};return tt=H,de.add(M),H.promise=(async()=>{try{let L=$n("setup-status",await w.readSetup(M.signal));return!k||S!==w?!1:(Zn("setup-status"),W({setupStatus:L,...p===x&&!Kt?{setupOpen:!L.completed}:{},setupError:null}),L.completed?Xe({settings:!0}):br(),!0)}catch(L){return k&&S===w&&(W({setupError:String(L?.message??L)}),Ve(C,"setup-status")),!1}finally{de.delete(M),tt===H&&(tt=null)}})(),H.promise},pt=async()=>{if(!(e||S?.action||S?.readAuthorization||S?.readSetup||S?.subscribeUpdates)||!k||!Z||!d||!u||O||et||s.busy||s.ttsCancelling||!K&&![...E.values()].some(H=>H.ready))return;if(!K){let[H,L]=[...E].find(([,ee])=>ee.ready);if(L.ready=!1,L.id!==C||L.scope!==P){Zn(H);return}O=!0;try{H==="authorization"?await nt():H==="setup-status"?await _o():H==="conversation-stream"?It():H==="model-stream"?ct(!0):H==="update-stream"?Ge():await Qe.run(L.id,H)}finally{O=!1,queueMicrotask(()=>{pt()})}return}let w=K;K=null;let x=()=>k&&w.id===C&&w.scope===P;if(!x())return;let M=()=>x()?!d||!u||et||s.busy||s.ttsCancelling?(K||(K=w),!0):!1:!0;O=!0;try{if(w.notified||(w.notified=!0,N=w.id,T=Date.now(),W({readRefresh:(s.readRefresh??0)+1})),M()||(w.settings&&(w.settings=!1,await Qe.run(w.id,"read-settings",{},!0)),M()))return;w.status&&(w.status=!1,await Qe.run(w.id,"status",{},!0)),x()&&w.id&&!q.has(w.id)&&(q.add(w.id),Qe.run(w.id,"inspect-performance"))}finally{O=!1,queueMicrotask(()=>{pt()})}},Xe=({settings:w=!1,force:x=!1}={})=>{if(Ge(),!(!k||!Z)&&!(!x&&!w&&N===C&&Date.now()-T<1500)&&(s.authorizationUncertain&&!gr&&!Gt&&nt(),s.setupError&&!tt&&_o(),!(!C&&!s.setupOpen&&s.setupStatus===null))){s.installerError&&B&&ct(!0);for(let M of E.values())M.id===C&&(M.timer!==null&&t(M.timer),M.timer=null,M.attempts=0,M.ready=!0);Fn===null&&(hr=0),(!K||K.scope!==P)&&r("ui-status-refresh","requested"),K={id:C,scope:P,settings:!0,status:!0,notified:!1},queueMicrotask(()=>{pt()})}},Bi=()=>{let w=d&&u;if(s.readVisible!==w){if(W({readVisible:w}),!w){b();for(let x of E.values())x.timer!==null&&t(x.timer),x.timer=null,x.ready=!1;dt();return}Xe({force:!0})}},br=async()=>{let w=C;!(e||S?.action)||s.setupStatus?.completed!==!1||Q.has(w)||s.busy||s.ttsCancelling||(Q.add(w),await Qe.run(w,"read-settings")&&C===w&&await Qe.run(w,"status"))};return Qe={getSnapshot:()=>s,async pickPath(w,x,M){if(!k||C!==w)return null;let H=P,L=e??S?.action;if(!L)throw new Error("\u9C7C\u5E94\u754C\u9762\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let ee=await L(w,{action:"pick-local-path",kind:x},M);if(!k||C!==w||H!==P||M?.aborted)return null;if(!ee||!(ee.path===null||typeof ee.path=="string"&&ee.path.length>0&&ee.path.length<=4096&&!/[\u0000-\u001f\u007f]/.test(ee.path)))throw new Error("\u8DEF\u5F84\u9009\u62E9\u7ED3\u679C\u65E0\u6548");return ee.path},async captureBindings(w,x){let M=await fn(w,{action:"capture-bindings",...x});if(!M||typeof M.token!="string"||typeof M.paused!="boolean")throw new Error("\u6309\u952E\u5F55\u5165\u56DE\u6267\u65E0\u6548");return M},setReadVisibility(w){d=!!w,Bi()},setPanelVisible(w){u=!!w,Bi()},markSettingsEdited(w="save-settings"){ar.includes(w)&&(c.add(w),W({settingsDraftActions:[...c]}))},discardSettingsDraft(w){w?c.delete(w):c.clear(),W({settingsDraftActions:[...c]}),!c.size&&(l&&W({settings:l,settingsFor:C}),l=null,W({settingsConflict:!1,settingsKey:s.settings?.revision}))},enableAutomaticReads(){Z=!0,Xe({settings:!0,force:!0})},refresh:Xe,refreshModelCompute:ju,subscribe(w){return ue.add(w),()=>ue.delete(w)},setSession(w){C!==w&&(C=w,P++,Dn=null,c.clear(),l=null,W({sourcePending:!0,checkedFor:void 0,settingsFor:void 0,modelComputePending:!1,modelComputeError:null,enableError:null,listenModeError:!1,newChatFor:void 0,settingsConflict:!1,settingsDraftActions:[],installPlan:null,installPlanFor:null}),vo(),Wt({clear:!0}),fr({clear:!0}),dt(),Bn(),_(),It(),ct(),Xe({settings:!0,force:!0}),br())},attachConversationClient(w){S!==w&&(at(),P++,Dn=null,W({modelComputePending:!1,modelComputeError:null}),vo(),Wt({clear:!0}),fr({clear:!0}),_(),q.clear()),S=w,nt({initial:!0}),It(),ct(),Xe({settings:!0,force:!0}),S.readSetup&&(tt=null,yo=p,_o())},conversationUnavailable(w){o++,W({...i,error:String(w?.message??w),conversation:null,conversationFor:null,conversationError:String(w?.message??w)})},async dismissSetup(){let w=++p,x=await Bn();return x&&w===p&&(_(),Qe.discardSettingsDraft(),W({setupOpen:!1})),x&&w===p},async showHome(){let w=++p,x=await Bn();return x&&w===p&&(_(),Qe.discardSettingsDraft(),W({setupOpen:!1,panelView:"home"}),Xe()),x&&w===p},async openSettings(w="audio",x="conversation"){let M=++p,H=await Bn();return H&&M===p&&(_(),W({setupOpen:!1,panelView:"settings",settingsTab:["audio","interaction","prompt","models","advanced","sessions","pets"].includes(w)?w:"audio",settingsModelTab:x,sessionManagementRoot:null,sessionHistoryOpen:!1}),Xe({settings:!0})),H&&M===p},readOperationLog:Ju,manageSessions:Xu,listExistingVoiceSessions:Yu,retryVoiceTranscript:go,setExistingVoiceSession:Qu,setSettingsTab(w){w!==s.settingsTab&&W({settingsTab:w,sessionManagementRoot:null,sessionHistoryOpen:!1})},setSettingsModelTab(w){W({settingsModelTab:w})},setSessionManagement({rootId:w=s.sessionManagementRoot,historyOpen:x}){W({sessionManagementRoot:w,sessionHistoryOpen:x})},whisperAsrAction:ep,updateAction:Cn,dismissUpdate(w){w&&W({dismissedUpdateVersion:w})},openSetup(){++p,_(),W({setupOpen:!0}),Xe({settings:!0,force:!0}),!Z&&!s.busy&&(async()=>{let w=C;await Qe.run(w,"read-settings")&&C===w&&await Qe.run(w,"status")})()},cancelPreview:Bn,discardDiagnostics:_,refreshAuthorization:nt,saveAuthorization:np,openAuthorization:()=>nt({open:!0}),closeAuthorization({resumeSetup:w=!1}={}){return!s.authorizationBusy&&!s.authorizationLoading?(Kt=!w,++p,yo=p,W({authorizationOpen:!1,setupOpen:w}),w&&Xe({settings:!0}),!0):!1},async run(w,x,M={},H=!1){if(!k||et&&x==="status"||(et||s.existingSessionUnconfirmed)&&["enable","new","resume"].includes(x))return!1;let L=!!(H&&On.has(x)&&!s.uncertain&&s.checkedFor===w&&s.settingsFor===w&&s.status&&s.settings);if(L&&v.has(x))return!1;if(H||b(),x==="read-history"){if(C!==w||s.conversationHistoryLoading)return!1;let U=++o,Ne=P,ln=I;W({conversationHistoryLoading:!0,conversationHistoryError:null,conversationHistoryRequestCursor:M.cursor??null});try{let Re=await fn(w,{action:x,...M});if(!k||C!==w||Ne!==P||U!==o||ln!==I||s.conversation?.rootSessionId&&(s.conversation.rootSessionId!==Re.rootSessionId||Re.scope!=="voice-session"&&s.conversation.historyGeneration!==Re.generation))return!1;let Tn=s.conversationHistory;if(M.cursor&&(!Tn||Tn.generation!==Re.generation||Tn.rootSessionId!==Re.rootSessionId))return!1;let vr=new Map(Re.items.map(hn=>[hn.id,hn]));if(M.cursor)for(let hn of Tn.items)vr.set(hn.id,hn);if(s.conversation?.rootSessionId===Re.rootSessionId)for(let hn of s.conversation?.items??[])vr.set(hn.id,hn);let $t=[...vr.values()].sort((hn,wo)=>hn.at-wo.at),yr=M.cursor?$t.slice(0,4e3):$t.slice(-4e3),Fi=yr.reduce((hn,wo)=>hn+wo.text.length,0),Ui=$t.length>4e3;for(;Fi>4*1024*1024;)Fi-=(M.cursor?yr.pop():yr.shift()).text.length,Ui=!0;return W({conversationHistory:{...Re,items:yr,truncated:Re.truncated||Ui||!!(M.cursor&&Tn?.truncated)},conversationHistoryFor:w}),!0}catch(Re){return U===o&&W({conversationHistoryError:String(Re?.message??Re)}),!1}finally{U===o&&W({conversationHistoryLoading:!1})}}if(x==="apply-model-install"&&["save-models","save-tts"].some(U=>c.has(U)))return W({error:"\u8BF7\u5148\u4FDD\u5B58\u6216\u653E\u5F03\u6A21\u578B\u8BBE\u7F6E\u8349\u7A3F\uFF0C\u518D\u5207\u6362\u6A21\u578B\u3002"}),!1;if(x==="read-audio-devices")return Vu(w);if(x==="inspect-performance")return qu(w);if(x==="cancel-tts"){if(F)return Bn();try{let U=await fn(w,{action:x});return W({ttsPreview:U,ttsPreviewFor:w}),U.status==="unconfirmed"?(ie({uncertain:!0,error:"\u65E0\u6CD5\u786E\u8BA4\u6717\u8BFB\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B\u3002"}),!1):!0}catch(U){return ie({error:String(U?.message??U),uncertain:!0}),!1}}let ee=x==="disable"&&f&&!m;if(s.busy&&!ee||s.ttsCancelling||s.settingsConflict&&ar.includes(x)||s.agentPermissionUncertain&&x==="save-agent-permissions"||s.agentRequestUncertain&&x==="decide-agent-request"||s.ttsUncertain&&!zt.includes(x)&&x!=="disable"||s.visibilityUncertain&&!zt.includes(x)||s.outputVolumeUncertain&&x==="set-output-volume"||s.installerUncertain&&["start-model-install","control-model-install","apply-model-install"].includes(x))return!1;if(!w&&(w!==null||!Gd.has(x)))return W({error:"\u6B64\u64CD\u4F5C\u9700\u8981\u4F1A\u8BDD\u6765\u6E90"}),!1;let xe;if(ee&&(f.stale=!0,On.has(f.action)&&f.abort.abort(),xe=m=Symbol("diagnostic-stop")),!zt.includes(x)){dt();for(let U of On)Zn(U)}(ar.includes(x)||lr.includes(x)&&x!=="status")&&Wt({clear:x!=="set-performance-mode"});let ve;(yh.includes(x)||On.has(x))&&(ve={id:w,action:x,abort:new AbortController,stale:!1},L?v.set(x,ve):f=ve),L||(y++,W({busy:!0,error:null,...x==="enable"?{enableError:null}:{},...x==="save-bindings"?{bindingError:null}:{},interruptibleRead:f?.action??null,diagnosticStopPending:!!m,...x==="listen-mode"?{listenModePending:M.mode,listenModeBefore:s.conversation?.helper?.listenMode??s.status?.listenMode}:{},...x!=="status"&&lr.includes(x)?{listenModeError:!1}:{}}));let $e,en=P,Nn=sr(s.status),yn=s.checkedFor,An=Ee;try{if(ve?.stale)return!1;let U;if(["read-output-volume","set-output-volume"].includes(x)){if(!S)throw new Error("\u8BED\u97F3\u8F93\u51FA\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let Ne=ve?.abort??new AbortController;de.add(Ne);let ln;try{let Re=x==="read-output-volume"?S.readVolume(w,Ne.signal):S.setVolume(w,M,Ne.signal),Tn=x==="read-output-volume"?await Promise.race([Re,new Promise((vr,$t)=>{ln=()=>$t(new Error("Read cancelled")),Ne.signal.addEventListener("abort",ln,{once:!0})})]):await Re;U=$n("output-volume",Tn)}finally{Ne.signal.removeEventListener("abort",ln),de.delete(Ne)}}else{if(x==="preview-tts"&&($e={id:w,abort:new AbortController,cancelled:!1},F=$e,W({ttsPreview:{status:"preparing"},ttsPreviewFor:w})),On.has(x)){let Ne,ln=new Promise((Re,Tn)=>{Ne=()=>Tn(new Error("Read cancelled")),ve.abort.signal.addEventListener("abort",Ne,{once:!0})});try{U=await Promise.race([fn(w,{...M,action:x},ve.abort.signal),ln])}finally{ve.abort.signal.removeEventListener("abort",Ne)}}else U=await fn(w,{...M,action:x},$e?.abort.signal??ve?.abort.signal);if(ve?.stale)return!1}if(ve?.stale||zt.includes(x)&&(!k||en!==P))return!1;if(On.has(x)&&Zn(x),["agent-permissions","save-agent-permissions"].includes(x)&&W({agentPermissions:U,agentPermissionsFor:w,agentPermissionUncertain:!1}),["agent-requests","decide-agent-request"].includes(x)&&(W({agentRequests:U,agentRequestsFor:w,agentRequestUncertain:!1}),x==="decide-agent-request"&&U.lastOutcome?.state==="completed"&&(W({checkedFor:null}),Xe({settings:!0,force:!0})),x==="decide-agent-request"&&U.lastOutcome?.state==="unknown"&&W({uncertain:!0,error:"\u64CD\u4F5C\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u5148\u8BFB\u53D6\u5B9E\u9645\u72B6\u6001\uFF0C\u4E0D\u8981\u91CD\u8BD5\u3002"})),lr.includes(x)){if(x==="listen-mode"){if(C!==w||en!==P)return!1;if(U.listenMode!==M.mode)throw new Error("\u8BF4\u8BDD\u65B9\u5F0F\u7684\u56DE\u6267\u5C1A\u672A\u786E\u8BA4")}if(en!==P)return!0;if(["status","disable"].includes(x)&&U.ttsRuntime){let Re=!!(U.ttsRuntime.blocked||s.ttsUncertain&&(U.ttsRuntime.busy||An!==Ee));U.ttsRuntime.blocked&&Ee++,W({ttsUncertain:Re}),!Re&&!U.ttsRuntime.busy&&!X&&F?.cancelled&&(F=null)}let Ne=s.visibilityUncertain&&!(x==="status"&&s.visibilityReadbackFor===w),ln=Object.hasOwn(U,"existingVoiceSession");!ln&&Object.hasOwn(s.status??{},"existingVoiceSession")&&(U={...U,existingVoiceSession:s.status.existingVoiceSession,existingVoiceSessionSupported:s.status.existingVoiceSessionSupported}),W({status:U,checkedFor:w,uncertain:Ne,visibilityUncertain:Ne,...Ne?{}:{visibilityReadbackFor:null},...L?{error:null}:{},...C===w?{sourcePending:!1}:{},...x==="status"&&ln?{existingSessionUnconfirmed:!1}:{},...x==="listen-mode"?{listenModeReceiptRevision:s.conversation?.revision??null}:{}}),Je&&(!U.enabled||U.existingVoiceSession?.sessionId!==Je.sessionId)&&Pn(),["predecessor-cleanup-pending","helper-cleanup-pending"].includes(U.voiceSession?.recovery?.kind)?Hi(w):dt()}if(jd.includes(x)&&(x!=="read-settings"&&en===P&&(c.delete(x),W({settingsDraftActions:[...c]})),x==="read-settings"&&c.size>0&&s.settingsFor===w&&s.settings?.revision!==U.revision?(l=U,W({settingsConflict:!0})):(l=null,W({settings:U,settingsFor:w,settingsConflict:!1,settingsKey:c.size>0?s.settingsKey:U.revision})),U.onboarding&&Zn("setup-status"),W({...U.onboarding?{setupStatus:U.onboarding,setupError:null}:{},...x==="read-settings"&&s.visibilityUncertain&&["hidden","workspace"].includes(U.voiceSession?.visibility)?{visibilityReadbackFor:w}:{}})),x==="read-settings"&&s.visibilityUncertain&&Ve(w,"status"),x==="conversation-models"&&W({conversationModels:U,conversationModelsFor:w,conversationModelsError:null}),x==="inspect-tts"&&W({ttsCapabilities:U,ttsCapabilitiesFor:w}),x==="preview-tts"&&!$e.cancelled&&W({ttsPreview:{...U,status:U.textOnly===!0?"text-only":"completed"},ttsPreviewFor:w}),["read-output-volume","set-output-volume"].includes(x)&&W({outputVolume:U,outputVolumeFor:w,outputVolumeUncertain:!1}),["save-voice-prompt","save-conversation-model","set-visibility","set-performance-mode","save-tts","apply-model-install"].includes(x)&&(W({status:null,checkedFor:null,catalog:null,catalogFor:null}),Xe({force:!0})),x==="plan-model-install"&&W({installPlan:U,installPlanFor:w,installPlanRequest:{...M}}),x==="model-installer"&&(W({installer:U,installerFor:w,installerUncertain:!!s.installerTerminationUnconfirmed}),C===w&&!B&&(B=!0,ct(!0))),x==="inspect-model-compute"&&s.installerFor===w&&s.installer&&W({installer:{...s.installer,compute:U}}),x==="start-model-install"&&W({installPlan:null,installPlanFor:null}),x==="list"){let Ne=M.cursor&&s.catalogFor===w?s.catalog?.items??[]:[];W({catalog:{...U,items:[...new Map([...Ne,...U.items].map(ln=>[ln.id,ln])).values()]},catalogFor:w})}return["new","resume","listen-mode"].includes(x)&&W({catalog:null}),["new","resume"].includes(x)&&C===w&&en===P&&(o++,W({...i,newChatFor:x==="new"&&M.expectedOwnerSessionId!==void 0?w:void 0})),x==="listen-mode"&&Xe({settings:!0,force:!0}),["status","enable","disable","new","resume"].includes(x)&&C===w&&(x!=="status"||yn!==w||Nn!==sr(U)||z!==Be()||s.conversationError)&&It(),!0}catch(U){return x==="listen-mode"&&(C!==w||en!==P)||(ve&&(U?.uncertain||/TTS_TERMINATION_UNCONFIRMED/.test(String(U?.code??"")+" "+String(U?.message??"")))&&(x==="inspect-tts"?ie({}):W({installerUncertain:!0,installerTerminationUnconfirmed:!0})),ve?.stale||zt.includes(x)&&en!==P)||$e?.cancelled||(x==="status"&&(dt(),C===w&&en===P&&W({sourcePending:!1})),zt.includes(x)||(K=null),/AUTHORIZATION_REQUIRED/.test(String(U?.message??U))&&nt({open:!0}),$e&&await Bn(),x==="preview-tts"&&Ee++,x==="enable"&&C===w&&en===P&&W({enableError:String(U?.message??U)+(U?.code?" ["+U.code+"]":"")}),x==="listen-mode"&&C===w&&en===P&&W({listenModeError:!0}),W({error:String(U?.message??U),...x==="conversation-models"?{conversationModelsError:String(U?.message??U),conversationModels:null,conversationModelsFor:w}:{},...x==="save-bindings"?{bindingError:String(U?.message??U)+(U?.code?" ["+U.code+"]":"")}:{},...x==="save-agent-permissions"?{agentPermissionUncertain:!0}:{},...x==="decide-agent-request"?{agentRequestUncertain:!0}:{},...x==="preview-tts"?{ttsPreviewFor:w,ttsUncertain:!0}:{},...x==="set-output-volume"?{outputVolumeUncertain:!0}:{},...ar.includes(x)?{uncertain:!0,visibilityUncertain:!0,visibilityReadbackFor:null}:{},...["start-model-install","control-model-install"].includes(x)?{installerUncertain:!0}:{},...lr.includes(x)?{uncertain:!0,readOnlyFailure:x==="status"&&(!s.uncertain||s.readOnlyFailure===!0)}:{}}),On.has(x)&&Ve(w,x),ar.includes(x)?(Ve(w,"read-settings"),Ve(w,"status")):lr.includes(x)&&x!=="status"?Ve(w,"status"):x==="set-output-volume"?Ve(w,"read-output-volume"):x==="save-agent-permissions"?Ve(w,"agent-permissions"):x==="decide-agent-request"?Ve(w,"agent-requests"):["start-model-install","control-model-install"].includes(x)&&Ve(w,"model-installer")),!1}finally{v.get(x)===ve&&v.delete(x),$e&&F===$e&&!$e.cancelled&&(F=null),ve&&f===ve&&(f=null),xe&&m===xe&&(m=null),L||(y--,W({busy:y>0,interruptibleRead:f?.action??null,diagnosticStopPending:!!m,...x==="listen-mode"?{listenModePending:null}:{}})),queueMicrotask(()=>{br(),pt()})}},dispose(){if(k){P++,vo(),c.clear(),l=null,W({settingsConflict:!1,settingsDraftActions:[]}),Wt({clear:!0}),fr({clear:!0}),dt(),Bn(),_(),f?.abort.abort(),at(),k=!1,I++,V++,R?.(),A?.();for(let w of de)w.abort();de.clear(),ue.clear()}}},Qe}function cr(e,n,t,r=12){let o=n.left+r,i=n.top+r;return{x:Math.max(o,Math.min(e.x,Math.max(o,n.right-t.width-r))),y:Math.max(i,Math.min(e.y,Math.max(i,n.bottom-t.height-r)))}}function Jd(e=window){let n=null,t=null,r=null,o=null,i=null,s=null,c=null,l=null,d=null,u=()=>e.performance?.now?.()??Date.now(),p=e.matchMedia?.("(prefers-reduced-motion: reduce)"),f=()=>{l!==null&&e.cancelAnimationFrame?.(l),l=null,d&&(d=null,k("endDrag"))},m=z=>{if(l=null,!d||!n)return;if(p?.matches||n.dataset?.motion==="off"){f();return}let A=Math.max(0,z-d.time);d.time=z;let I={...o},V=!1;for(let B of["x","y"]){let F=d[B],X=(F.target-o[B])*Math.exp(-A/F.tau);I[B]=Math.abs(X)<.5?F.target:F.target-X,I[B]!==F.target&&(V=!0)}o=cr(I,i.box,i.size),v(),k("move");for(let B of["x","y"])Math.abs(o[B]-I[B])>.01&&(d[B].target=o[B]);!V||z-d.start>=2400?f():l=e.requestAnimationFrame(m)},y=(z,A)=>{n.style[z]!==A&&(n.style[z]=A)},v=()=>{y("left",`${o.x}px`),y("top",`${o.y}px`)},b=null,_=null,Z="",K=()=>{let z=(n?.closest("[data-shell-overlay]")??n?.ownerDocument?.querySelector?.("[data-shell-overlay]"))?.getBoundingClientRect(),A=e.visualViewport,I=Math.max(z?.left??0,A?.offsetLeft??0),V=Math.max(z?.top??0,A?.offsetTop??0),B=Math.min(z?.right??e.innerWidth,(A?.offsetLeft??0)+(A?.width??e.innerWidth)),F=Math.min(z?.bottom??e.innerHeight,(A?.offsetTop??0)+(A?.height??e.innerHeight)),X=parseFloat(e.getComputedStyle(n).getPropertyValue("--dsh-frame-top-clearance"))||0;return{left:I,top:V+X,right:B,bottom:F}},O=z=>{if(!n)return;let A=Number.isFinite(z?.width)&&Number.isFinite(z?.height),I=A&&i?i.box:K();y("maxWidth",`${Math.max(1,I.right-I.left-24)}px`),y("maxHeight",`${Math.max(1,I.bottom-I.top-24)}px`);let V=A?z:n.getBoundingClientRect();i={box:I,size:{width:V.width,height:V.height}},o=cr(o??{x:I.right-V.width-20,y:I.bottom-V.height-20},I,V),v(),!r&&!d&&k("resize")},N=()=>{c!==null&&e.cancelAnimationFrame?.(c),c=null},T=()=>{N();let z=s;s=null,!(!r||!n||!z)&&(o=cr(z,i.box,i.size),v(),k("move"))},P=z=>{n?.dataset&&(z&&["left","right","top","bottom"].includes(z.edge)&&["preview","docked"].includes(z.phase)?(n.dataset.whaleDockEdge=z.edge,n.dataset.whaleDockPhase=z.phase):(delete n.dataset.whaleDockEdge,delete n.dataset.whaleDockPhase))},E=()=>{let z=_;_=null;try{z?.dispose()}catch{}P(null),n&&(n.style.zIndex=Z)},k=z=>{try{typeof _?.[z]=="function"&&_[z]()}catch{E()}},S=()=>{if(E(),!(!n||b?.version!==1||typeof b.register!="function"))try{_=b.register({id:"whale-voice",read(){let{box:z,size:A}=i;return{rect:{...o,width:A.width,height:A.height},bounds:{x:z.left+12,y:z.top+12,width:Math.max(1,z.right-z.left-24),height:Math.max(1,z.bottom-z.top-24)},collapsed:n.hasAttribute?.("data-collapsed")===!0}},apply(z){!n||!Number.isFinite(z?.x)||!Number.isFinite(z?.y)||(o=cr(z,i.box,i.size),v())},onDock:P,onFront:z=>{n&&(n.style.zIndex=z===!0?"901":"900")}}),["beginDrag","move","endDrag","resize","detach","dispose"].every(z=>typeof _?.[z]=="function")||E()}catch{E()}},C=(z=!1,A=!1)=>{z?T():(N(),s=null);let I=r;r=null,I?.target.hasPointerCapture?.(I.id)&&I.target.releasePointerCapture(I.id);let V=u(),B=I?.samples??[],F=B.at(-1),X=B[0],ue=F&&X?F.time-X.time:0,de=F?V-F.time:1/0,Q=Math.max(0,1-Math.max(0,de-24)/56),q=ue>0?(F.x-X.x)/ue*Q:0,W=ue>0?(F.y-X.y)/ue*Q:0;if(I&&A&&!p?.matches&&n?.dataset?.motion!=="off"&&typeof e.requestAnimationFrame=="function"&&Math.hypot(q,W)>.04){let ne=cr({x:o.x+q*240,y:o.y+W*240},i.box,i.size),pe=(ge,Ie)=>({target:ne[ge],tau:Ie?Math.max(1,Math.abs((ne[ge]-o[ge])/Ie)):240});d={x:pe("x",q),y:pe("y",W),time:V,start:V},l=e.requestAnimationFrame(m)}else I&&k(z?"endDrag":"detach")},R=()=>{f(),C(),E(),t?.disconnect(),t=null,e.removeEventListener("resize",O),e.visualViewport?.removeEventListener("resize",O),e.visualViewport?.removeEventListener("scroll",O),n=null,i=null};return{ref(z){if(z===n||(R(),!z))return;n=z,Z=z.style.zIndex||"",n.style.transitionProperty="none",t=new e.ResizeObserver(I=>{let V=I?.find?.(F=>F.target===n),B=V?.borderBoxSize?.[0]??V?.borderBoxSize;Number.isFinite(B?.inlineSize)&&Number.isFinite(B?.blockSize)&&I.every(F=>F.target===n)?O({width:B.inlineSize,height:B.blockSize}):O()}),t.observe(n);let A=n.closest("[data-shell-overlay]")??n.ownerDocument?.querySelector?.("[data-shell-overlay]");A&&t.observe(A),e.addEventListener("resize",O),e.visualViewport?.addEventListener("resize",O),e.visualViewport?.addEventListener("scroll",O),O(),S()},useLayoutService(z){return b=z,S(),()=>{b===z&&(E(),b=null,O())}},activate(){f(),k("activate")},pointerDown(z,A=z.currentTarget){z.button!==0||z.pointerType&&z.pointerType!=="mouse"||!n||(f(),O(),k("beginDrag"),r={id:z.pointerId,target:A,x:z.clientX,y:z.clientY,start:{...o},samples:[{x:z.clientX,y:z.clientY,time:u()}]},A.setPointerCapture(z.pointerId),z.preventDefault())},pointerMove(z){if(!r||z.pointerId!==r.id)return;let A=u(),I=[z];try{I=[...z.getCoalescedEvents?.()??[],z]}catch{}for(let X of I){if(!Number.isFinite(X.clientX)||!Number.isFinite(X.clientY))continue;let ue=Number.isFinite(X.timeStamp)&&Number.isFinite(z.timeStamp)?Math.min(0,X.timeStamp-z.timeStamp):0,de=A+Math.max(-60,ue),Q=r.samples.at(-1);if(de<Q.time)continue;let q={x:X.clientX,y:X.clientY,time:de};de===Q.time?r.samples[r.samples.length-1]=q:r.samples.push(q)}let V=A-60;for(;r.samples.length>2&&r.samples[1].time<=V;)r.samples.shift();let B=r.samples[0],F=r.samples[1];if(F&&B.time<V&&F.time>V){let X=(V-B.time)/(F.time-B.time);r.samples[0]={x:B.x+(F.x-B.x)*X,y:B.y+(F.y-B.y)*X,time:V}}s={x:r.start.x+z.clientX-r.x,y:r.start.y+z.clientY-r.y},typeof e.requestAnimationFrame!="function"?T():c===null&&(c=e.requestAnimationFrame(T))},pointerEnd(z){z.pointerId===r?.id&&C(!["pointercancel","lostpointercapture"].includes(z.type),z.type==="pointerup")},keyDown(){},fit:O,dispose:R}}var Ai=Object.freeze({panel:320,settings:660,setup:420,collapsed:216});function Xd(e=window,{onResize:n=()=>{}}={}){let t=null,r=null,o=null,i=null,s=null,c=null,l=null,d=null,u=null,p=null,f=null,m=null,y=null,v=null,b=null,_=null,Z={width:0,height:0},K=e.matchMedia?.("(prefers-reduced-motion: reduce)"),O=()=>K?.matches?"off":t?.dataset.motion??"spring",N=z=>Number.parseFloat(z)||0;function T(){let z=e.visualViewport,A=(t.closest?.("[data-shell-overlay]")??t.ownerDocument?.querySelector?.("[data-shell-overlay]"))?.getBoundingClientRect(),I=Math.max(A?.left??0,z?.offsetLeft??0),V=Math.max(A?.top??0,z?.offsetTop??0),B=Math.min(A?.right??e.innerWidth,(z?.offsetLeft??0)+(z?.width??e.innerWidth)),F=Math.min(A?.bottom??e.innerHeight,(z?.offsetTop??0)+(z?.height??e.innerHeight)),X=e.getComputedStyle(t);return{width:Math.max(1,B-I-24),height:Math.max(1,Math.min((F-V)*.6,F-V-24-N(X.getPropertyValue("--dsh-frame-top-clearance")))),chrome:N(X.paddingTop)+N(X.paddingBottom)+N(X.borderTopWidth)+N(X.borderBottomWidth),horizontalChrome:N(X.paddingLeft)+N(X.paddingRight)+N(X.borderLeftWidth)+N(X.borderRightWidth),panelRadius:N(X.getPropertyValue("--dsw-radius-lg"))||12}}function P(){l!==null&&e.cancelAnimationFrame(l),l=null,u=null}function E(){!t||!p||(p.width=Math.max(1,Math.min(p.width,m.width)),p.height=Math.max(1,Math.min(p.height,m.height)),t.style.width=`${p.width.toFixed(3)}px`,t.style.height=`${p.height.toFixed(3)}px`,t.style.setProperty?.("--whale-visible-content",`${Math.max(1,p.height-m.chrome)}px`),_===null?t.style.removeProperty?.("--whale-animated-radius"):t.style.setProperty?.("--whale-animated-radius",`${_.toFixed(2)}px`),n({width:p.width,height:p.height}))}function k(z){if(l=null,!t||!f)return;let A=Math.min(.032,Math.max(.001,u===null?1/60:(z-u)/1e3));u=z;let I=b?560:O()==="firm"?420:360,V=b?47.4:O()==="firm"?41:30,B=!0;for(let F of["width","height"]){for(let X=0;X<4;X++)Z[F]+=(I*(f[F]-p[F])-V*Z[F])*A/4,p[F]+=Z[F]*A/4;(Math.abs(f[F]-p[F])>.25||Math.abs(Z[F])>1)&&(B=!1)}if(b){let F=f.height-b.height,X=Math.abs(F)>.25?Math.max(0,Math.min(1,(p.height-b.height)/F)):1,ue=y?f.height/2:m.panelRadius;_=b.radius+(ue-b.radius)*X}(B||O()==="off")&&(p={...f},Z={width:0,height:0},u=null,b=_=null),E(),!B&&O()!=="off"&&(l=e.requestAnimationFrame(k))}function S(){if(!t||!r)return;m=T(),t.dataset.compactHeight=m.height<300?"true":"false";let z=t.hasAttribute("data-collapsed")&&t.dataset.collapsed!=="false";if(p&&y!==null&&z!==y){let ge=_??(y?p.height/2:m.panelRadius);b={height:p.height,radius:ge},_=ge,t.style.setProperty?.("--whale-animated-radius",`${ge.toFixed(2)}px`),Z={width:0,height:0}}let A=t.dataset.view,I=t.dataset.sourcePending&&A==="home"&&v===A&&!z&&y===z?f?.height:void 0;y=z,v=A;let V=Math.min(m.width,z?Ai.collapsed:Ai[A]??Ai.panel);t.style.boxSizing="border-box",t.style.transitionProperty="none",t.style.overflow="hidden",t.style.maxWidth=`${m.width}px`,t.style.maxHeight=`${m.height}px`;let B=Math.max(1,m.height-m.chrome);r.style.width=`${Math.max(1,V-m.horizontalChrome)}px`,r.style.maxHeight=`${B}px`,r.style.overflowY="hidden",r.style.minHeight="0",t.style.setProperty?.("--whale-content-limit",`${B}px`);let F=!!r.querySelector?.('[data-size-detail="true"]'),X=z?null:A==="setup"?r.querySelector?.("[data-whale-intrinsic]"):A==="home"&&!F?r.querySelector?.("[data-home-controls]"):null,ue=X?.querySelector?.("[data-whale-natural-content]"),de=ue??X;A==="setup"&&!z&&(r.style.height="auto"),de!==c&&(s?.disconnect(),d!==null&&e.cancelAnimationFrame(d),d=null,s=null,c=de,c&&e.ResizeObserver&&(s=new e.ResizeObserver(()=>{d===null&&(d=e.requestAnimationFrame(()=>{d=null,S()}))}),s.observe(c)));let Q=X?.getBoundingClientRect?.().height,q=ue?Math.max(0,ue.offsetHeight-ue.parentElement.clientHeight):0,W=Q+q,ne=z?44:W>0?Math.ceil(W+m.chrome):A==="home"?F?520:320:480,pe=Math.min(m.height,I??ne);(A!=="setup"||z)&&(r.style.height=`${Math.max(1,pe-m.chrome)}px`),f={width:V,height:pe},!p||O()==="off"?(P(),p={...f},Z={width:0,height:0},b=_=null,E()):l===null&&(Math.abs(p.width-V)>.25||Math.abs(p.height-pe)>.25)&&(u=e.performance?.now?.()??null,l=e.requestAnimationFrame(k))}function C(){P(),o?.disconnect(),i?.disconnect(),s?.disconnect(),d!==null&&e.cancelAnimationFrame(d),d=null,s=c=null,e.removeEventListener("resize",S),e.visualViewport?.removeEventListener("resize",S),e.visualViewport?.removeEventListener("scroll",S),K?.removeEventListener?.("change",S),o=i=null}function R(){if(C(),!(!t||!r)){if(e.ResizeObserver){o=new e.ResizeObserver(S);let z=t.closest?.("[data-shell-overlay]")??t.ownerDocument?.querySelector?.("[data-shell-overlay]");z&&o.observe(z)}e.MutationObserver&&(i=new e.MutationObserver(S),i.observe(t,{attributes:!0,attributeFilter:["data-view","data-motion","data-collapsed","data-source-pending"]}),i.observe(r,{attributes:!0,attributeFilter:["data-size-detail","data-home-layout"],subtree:!0})),e.addEventListener("resize",S),e.visualViewport?.addEventListener("resize",S),e.visualViewport?.addEventListener("scroll",S),K?.addEventListener?.("change",S),S()}}return{ref(z){t!==z&&(t=z,p=f=y=v=b=_=null,Z={width:0,height:0},R())},contentRef(z){r!==z&&(r=z,R())},update:S,dispose(){C(),t=r=p=f=null}}}var Yd=["spring","firm","off"];function Qd(e=window){let n="dsh-whale-voice:motion:v1",t="dsh-whale-voice:assistant-name:v1",r=()=>{try{let d=e.localStorage.getItem(t)?.trim();return d&&d.length<=40?d:null}catch{return null}},o=new Set,i=()=>{try{let d=e.localStorage.getItem(n);return Yd.includes(d)?d:"spring"}catch{return"spring"}},s={motion:i(),assistantName:r(),error:null},c=d=>{s=d;for(let u of o)u()},l=d=>{[n,t,null].includes(d.key)&&c({motion:i(),assistantName:r(),error:null})};return e.addEventListener("storage",l),{getSnapshot:()=>s,subscribe(d){return o.add(d),()=>o.delete(d)},setMotion(d){if(!Yd.includes(d))return!1;let u=null;try{e.localStorage.setItem(n,d)}catch{u="storage-unavailable"}return c({...s,motion:d,error:u}),!u},setAssistantName(d){if(typeof d!="string"||!d.trim()||d.trim().length>40)return!1;let u=d.trim(),p=null;try{e.localStorage.setItem(t,u)}catch{p="storage-unavailable"}return c({...s,assistantName:u,error:p}),!p},dispose(){e.removeEventListener("storage",l),o.clear()}}}var _h='button,input,textarea,select,a,label,summary,[role="button"],[role="slider"],[role="tab"],[contenteditable="true"],[data-no-drag]';function eu(e,n){if(!e||!n?.contains(e))return!1;let t=e.closest?.(_h);return!t||t.hasAttribute("data-drag-surface")}function nu(e){if(e.repeat||e.metaKey)return null;let n=e.code;return!/^(F([1-9]|1[0-9]|2[0-4])|Key[A-Z]|Digit[0-9]|Space)$/.test(n)||e.altKey&&n==="F4"?null:{code:n,modifiers:[e.ctrlKey&&"Control",e.altKey&&"Alt",e.shiftKey&&"Shift"].filter(Boolean)}}var oo=()=>({revision:0,rootSessionId:null,title:null,latest:null,items:[],inputActive:!1,inputError:null,playbackConfirmed:!1}),Ti=()=>({schema:1,hardware:null,compute:{schema:1,default:"cpu",observedAt:null,backends:{},reason:"\u5C1A\u672A\u68C0\u6D4B\u672C\u5730\u8BA1\u7B97\u540E\u7AEF\u3002"},models:[],jobs:[]});async function tu(e,n=()=>{}){let t=await e.remote.$mount(Md),r,o;try{if(o=e.inject(["remote","remote.whaleConversation"],u=>{r=u.remote.whaleConversation}),await o.await(),!r)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA")}catch(u){throw await o?.dispose(),await t(),u}let i=new Set,s=new Map,c=!1,l=u=>{if(u?.ok!==!0)throw u?.error??new Error("\u8BED\u97F3\u63A5\u53E3\u54CD\u5E94\u65E0\u6548");return u.value},d=async(u,p,f=!0)=>{let m;try{m=await u()}catch(y){throw f&&!c&&n("ui-request","finished",p?.aborted?"cancelled":"failed"),y}return f&&m?.ok!==!0&&m?.error==null&&!p?.aborted&&n("ui-render-error","finished","failed"),l(m)};return{subscribeUpdates(u,p){let f=new AbortController;return i.add(f),Promise.resolve().then(async()=>{if(!f.signal.aborted)try{for await(let m of r.followUpdates(f.signal))f.signal.aborted||u(m);f.signal.aborted||(n("ui-stream","finished","failed"),p())}catch{f.signal.aborted||(n("ui-stream","finished","failed"),p())}finally{i.delete(f)}}),()=>{f.abort(),i.delete(f)}},updateAction(u,p){if(c)throw new Error("\u66F4\u65B0\u63A5\u53E3\u5DF2\u5378\u8F7D");return d(()=>r.updateAction(u,p),p)},subscribePresentation(u,p){let f=new AbortController;return i.add(f),(async()=>{try{for await(let m of r.followPresentation(f.signal))f.signal.aborted||u(m);f.signal.aborted||(n("ui-stream","finished","failed"),p(new Error("\u4F1A\u8BDD\u663E\u793A\u8FDE\u63A5\u5DF2\u7ED3\u675F")))}catch(m){f.signal.aborted||(n("ui-stream","finished","failed"),p(m))}finally{i.delete(f)}})(),()=>{f.abort(),i.delete(f)}},subscribe(u,p,f=()=>{}){let m=new AbortController;return i.add(m),p(oo(),{initial:!0}),(async()=>{try{for await(let y of r.follow(u,m.signal))m.signal.aborted||p(y);m.signal.aborted||(n("ui-stream","finished","failed"),p(oo(),{initial:!0}),f(new Error("\u8BED\u97F3\u72B6\u6001\u8FDE\u63A5\u5DF2\u7ED3\u675F\uFF0C\u6B63\u5728\u91CD\u65B0\u8FDE\u63A5")))}catch(y){m.signal.aborted||(n("ui-stream","finished","failed"),p(oo(),{initial:!0}),f(y))}finally{i.delete(m)}})(),()=>{m.abort(),i.delete(m),p(oo(),{initial:!0})}},subscribeModels(u,p,f=()=>{}){if(c)return p(Ti(),{initial:!0}),f(new Error("\u6A21\u578B\u8FDB\u5EA6\u63A5\u53E3\u5DF2\u5378\u8F7D")),()=>{};let m=new AbortController,y=!1,v=()=>{y||(y=!0,m.abort(),s.delete(m),p(Ti(),{initial:!0}))};return s.set(m,v),p(Ti(),{initial:!0}),(async()=>{try{for await(let b of r.followModels(u,m.signal))!y&&!c&&!m.signal.aborted&&p(b);!y&&!c&&!m.signal.aborted&&(n("ui-stream","finished","failed"),v(),f(new Error("\u6A21\u578B\u8FDB\u5EA6\u8FDE\u63A5\u5DF2\u7ED3\u675F\uFF0C\u6B63\u5728\u91CD\u65B0\u8FDE\u63A5")))}catch(b){!y&&!c&&!m.signal.aborted&&(n("ui-stream","finished","failed"),v(),f(b))}finally{s.delete(m)}})(),v},async action(u,p,f){if(c)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");let m=await d(()=>r.action(u,p,f),f);try{let y=JSON.parse(m);if(y?.protocol!==1||y.action!==p.action||!y.value||typeof y.value!="object"||Array.isArray(y.value))throw new Error("Fish Voice UI protocol mismatch");return y.value}catch(y){throw n("ui-render-error","finished","failed"),y}},readAuthorization:u=>d(()=>r.readAuthorization(u),u),saveAuthorization:(u,p)=>d(()=>r.saveAuthorization(u,p),p),async whisperAsrAction(u,p){if(c)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");return d(()=>r.whisperAsrAction(u,p),p)},async manageSessions(u,p,f){if(c)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");return JSON.parse(await d(()=>r.manageSessions(u,p,f),f))},listExistingVoiceSessions(u,p){if(c)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u63A5\u53E3\u5DF2\u5378\u8F7D");return d(()=>r.listExistingVoiceSessions(u,p),p)},setExistingVoiceSession(u,p){if(c)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u63A5\u53E3\u5DF2\u5378\u8F7D");return d(()=>r.setExistingVoiceSession(u,p),p)},retryVoiceTranscript(u,p){if(c)throw new Error("\u8BED\u97F3\u91CD\u53D1\u63A5\u53E3\u5DF2\u5378\u8F7D");return d(()=>r.retryVoiceTranscript(u,p),p)},readClientOperationScope(u){if(c)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return d(()=>r.readClientOperationScope(u),u,!1)},recordClientOperations(u,p){if(c)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return d(()=>r.recordClientOperations(u,p),p,!1)},readOperationLog(u,p){if(c)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return d(()=>r.readOperationLog(u,p),p,!1)},readSetup:u=>d(()=>r.readSetup(u),u),readVolume:(u,p)=>d(()=>r.readVolume(u,p),p),setVolume:(u,p,f)=>d(()=>r.setVolume(u,p,f),f),async dispose(){c=!0;for(let u of[...s.values()])u();s.clear();for(let u of i)u.abort();i.clear(),await o.dispose(),await t()}}}var iu=new Set(eo),su=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,ru=256,Ei="dsh-fish-voice.pending-operation-log.v1",Wi="ui-buffer-overflow";function wh(){let e=globalThis.crypto;if(e?.randomUUID)return e.randomUUID();let n=e?.getRandomValues(new Uint8Array(16));if(!n)return null;n[6]=n[6]&15|64,n[8]=n[8]&63|128;let t=Array.from(n,r=>r.toString(16).padStart(2,"0")).join("");return[t.slice(0,8),t.slice(8,12),t.slice(12,16),t.slice(16,20),t.slice(20)].join("-")}function xh(){try{return globalThis.sessionStorage}catch{return}}function ou(e,n=!1){if(!e||typeof e.id!="string"||!su.test(e.id)||!Number.isSafeInteger(e.at)||e.at<0||!iu.has(e.action)||!["user","ui"].includes(e.source)||n!==(e.action===Wi)||n&&(e.source!=="ui"||!Number.isSafeInteger(e.count)||e.count<1))return null;let{id:t,at:r,action:o,source:i}=e;return{id:t,at:r,action:o,source:i,...n?{count:e.count}:{},...["requested","finished"].includes(e.phase)?{phase:e.phase}:{},...["ok","failed","cancelled"].includes(e.result)?{result:e.result}:{}}}function au({schedule:e=setTimeout,unschedule:n=clearTimeout,now:t=Date.now,identify:r=wh,storage:o=xh()}={}){let i=[],s=null,c=null,l=null,d=!1,u,p,f,m=0,y=!1,v=()=>{p!==void 0&&(n(p),p=void 0)},b=S=>S&&S.at>=t()-Cd,_=()=>{i=i.filter(b),b(s)||(s=null),b(c)||(c=null)},Z=()=>i.length>0||s!==null||c!==null,K=()=>{if(!(!l||!o))try{Z()?o.setItem(Ei,JSON.stringify({scope:l,pending:i,overflow:s,dropped:c})):o.removeItem(Ei)}catch{}},O=(S,C)=>{c={count:Math.min(Number.MAX_SAFE_INTEGER,(c?.count??0)+S),at:Math.max(c?.at??0,C)}},N=S=>{i.length>=ru?O(1,S.at):i.push(S)},T=S=>{if(l===null){let C;try{C=JSON.parse(o?.getItem(Ei)??"null")}catch{}if(C?.scope===S){let R=i,z=c,A=Array.isArray(C.pending)?C.pending.slice(0,ru).map(I=>ou(I)).filter(b):[];i=[...new Map(A.map(I=>[I.id,I])).values()],s=ou(C.overflow,!0),c=C.dropped&&Number.isSafeInteger(C.dropped.count)&&C.dropped.count>0&&Number.isSafeInteger(C.dropped.at)&&b(C.dropped)?{count:C.dropped.count,at:C.dropped.at}:null,z&&O(z.count,z.at);for(let I of R)b(I)&&N(I)}}else l!==S&&(i=[],s=null,c=null);l=S,d=!0,_(),K()},P=(S=160)=>{y||f||p!==void 0||d&&!Z()||!u?.readClientOperationScope||!u?.recordClientOperations||(p=e(()=>{p=void 0,E()},S),p?.unref?.())};async function E(){let S=new AbortController,C=u;f=S;let R=()=>!y&&u===C&&f===S;try{let z=AbortSignal.any([S.signal,AbortSignal.timeout(1e4)]);if(!d){let B=await C.readClientOperationScope(z);if(!R())return;if(typeof B?.scope!="string"||!su.test(B.scope))throw new Error("Operation scope unavailable");T(B.scope)}if(_(),!s&&c){let B=r();B&&(s={id:B,at:c.at,action:Wi,source:"ui",phase:"finished",count:c.count},c=null)}K();let A=s?[s,...i.slice(0,or-1)]:i.slice(0,or);if(!A.length)return;let I=await C.recordClientOperations({scope:l,events:A},z);if(!R())return;if(I?.accepted!==!0)throw new Error("Operation batch was not accepted");let V=new Set(A.map(B=>B.id));i=i.filter(B=>!V.has(B.id)),s&&V.has(s.id)&&(s=null),m=0,K()}catch{R()&&(d=!1,m++)}finally{R()&&(f=void 0,P(m?Math.min(3e4,750*2**Math.min(m-1,6)):160))}}function k(S,C,R,z){if(y||!iu.has(S)||S===Wi)return;let A;try{A=r()}catch{return}A&&(_(),N({id:A,at:t(),action:S,source:C,...R?{phase:R}:{},...z?{result:z}:{}}),K(),P())}return{user(S){k(S,"user")},internal(S,C,R){k(S,"ui",C,R)},attach(S){u===S||y||(v(),f?.abort(),f=void 0,u=S,d=!1,m=0,P(0))},dispose(){y=!0,v(),f?.abort(),i=[],s=null,c=null}}}var Gu=require("react-dom");var He=require("react"),io=require("@deepseek-ai/dsh-client-ui-primitives");var h={updateAnnouncement:"bZKdGW_updateAnnouncement",mouseBinding:"bZKdGW_mouseBinding",authorizationBody:"bZKdGW_authorizationBody",error:"bZKdGW_error",settingsLayout:"bZKdGW_settingsLayout",currentModel:"bZKdGW_currentModel",settingsBrand:"bZKdGW_settingsBrand",messageName:"bZKdGW_messageName",sessionRename:"bZKdGW_sessionRename",assistantNameInput:"bZKdGW_assistantNameInput",loadHistory:"bZKdGW_loadHistory",primary:"bZKdGW_primary",voiceTarget:"bZKdGW_voiceTarget",authorizationActions:"bZKdGW_authorizationActions",sliderLabel:"bZKdGW_sliderLabel",guideButton:"bZKdGW_guideButton",transcriptRetryText:"bZKdGW_transcriptRetryText",settings:"bZKdGW_settings",existingSessionPicker:"bZKdGW_existingSessionPicker",homeTargetRow:"bZKdGW_homeTargetRow",keyBindingRow:"bZKdGW_keyBindingRow",existingSessionSearch:"bZKdGW_existingSessionSearch",formActions:"bZKdGW_formActions",audioDeviceNotice:"bZKdGW_audioDeviceNotice",settingsBody:"bZKdGW_settingsBody",bindingEditor:"bZKdGW_bindingEditor",conversationOptions:"bZKdGW_conversationOptions",bubbleStatus:"bZKdGW_bubbleStatus",recentMessages:"bZKdGW_recentMessages",voiceBars:"bZKdGW_voiceBars",voicePromptMode:"bZKdGW_voicePromptMode",iconButton:"bZKdGW_iconButton",quickSpeedHeader:"bZKdGW_quickSpeedHeader",assistantName:"bZKdGW_assistantName",audioDevices:"bZKdGW_audioDevices",headerActions:"bZKdGW_headerActions",radios:"bZKdGW_radios",popover:"bZKdGW_popover",quickSpeed:"bZKdGW_quickSpeed",pageHeading:"bZKdGW_pageHeading",markSmall:"bZKdGW_markSmall",audioDeviceHint:"bZKdGW_audioDeviceHint",quickHint:"bZKdGW_quickHint",authorizationSteps:"bZKdGW_authorizationSteps",newMessages:"bZKdGW_newMessages",statusRow:"bZKdGW_statusRow",performanceChoice:"bZKdGW_performanceChoice",voicePrompt:"bZKdGW_voicePrompt",permissionList:"bZKdGW_permissionList",modelHeading:"bZKdGW_modelHeading",fullName:"bZKdGW_fullName",bubbleBrand:"bZKdGW_bubbleBrand",whaleBreathe:"bZKdGW_whaleBreathe",quickActions:"bZKdGW_quickActions",popoverHeader:"bZKdGW_popoverHeader",message:"bZKdGW_message",segmented:"bZKdGW_segmented",settingsPage:"bZKdGW_settingsPage",volumeRow:"bZKdGW_volumeRow",conversationChoice:"bZKdGW_conversationChoice",openOriginal:"bZKdGW_openOriginal",whaleInputPulse:"bZKdGW_whaleInputPulse",existingSessionHome:"bZKdGW_existingSessionHome",notice:"bZKdGW_notice",settingsHeader:"bZKdGW_settingsHeader",placeholder:"bZKdGW_placeholder",agreement:"bZKdGW_agreement",conversationHeader:"bZKdGW_conversationHeader",currentDshTarget:"bZKdGW_currentDshTarget",voicePromptCount:"bZKdGW_voicePromptCount",hint:"bZKdGW_hint",currentDshAction:"bZKdGW_currentDshAction",quickSegments:"bZKdGW_quickSegments",ellipsis:"bZKdGW_ellipsis",mark:"bZKdGW_mark",keyBinding:"bZKdGW_keyBinding",mainAction:"bZKdGW_mainAction",section:"bZKdGW_section",whaleSpin:"bZKdGW_whaleSpin",caption:"bZKdGW_caption",whaleFeedback:"bZKdGW_whaleFeedback",panelViewport:"bZKdGW_panelViewport",existingSessionList:"bZKdGW_existingSessionList",details:"bZKdGW_details",whaleEnter:"bZKdGW_whaleEnter",header:"bZKdGW_header",whalePreview:"bZKdGW_whalePreview",settingsNav:"bZKdGW_settingsNav",floating:"bZKdGW_floating",capabilityRow:"bZKdGW_capabilityRow",note:"bZKdGW_note",requestDetails:"bZKdGW_requestDetails",inlineField:"bZKdGW_inlineField",whalePageEnter:"bZKdGW_whalePageEnter",historyScope:"bZKdGW_historyScope",bubble:"bZKdGW_bubble",status:"bZKdGW_status",actions:"bZKdGW_actions",bindingActions:"bZKdGW_bindingActions",quickConversation:"bZKdGW_quickConversation",newChatButton:"bZKdGW_newChatButton",modelNav:"bZKdGW_modelNav",audioDeviceField:"bZKdGW_audioDeviceField",deviceSelect:"bZKdGW_deviceSelect",voicePromptInput:"bZKdGW_voicePromptInput",voiceStatus:"bZKdGW_voiceStatus",homeTargetPicker:"bZKdGW_homeTargetPicker",backIcon:"bZKdGW_backIcon",transcriptRetry:"bZKdGW_transcriptRetry",updateDialog:"bZKdGW_updateDialog",inlineActions:"bZKdGW_inlineActions",panelContent:"bZKdGW_panelContent",field:"bZKdGW_field",backButton:"bZKdGW_backButton",editNotice:"bZKdGW_editNotice",brand:"bZKdGW_brand",transcriptRetries:"bZKdGW_transcriptRetries",disclosureRow:"bZKdGW_disclosureRow",audioDeviceGrid:"bZKdGW_audioDeviceGrid",motionPreview:"bZKdGW_motionPreview",authorization:"bZKdGW_authorization",transcriptRetryList:"bZKdGW_transcriptRetryList",existingSessionTarget:"bZKdGW_existingSessionTarget",sessionTitle:"bZKdGW_sessionTitle",updateHeader:"bZKdGW_updateHeader",voicePromptActions:"bZKdGW_voicePromptActions",spin:"bZKdGW_spin",pathRow:"bZKdGW_pathRow",volumeControl:"bZKdGW_volumeControl",text:`.bZKdGW_floating {
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

[data-ds-dark-theme] .bZKdGW_floating {
  --whale-solid-base: var(--dsw-static-neutral-bluish-950, #181a1e);
}

.bZKdGW_floating[data-collapsed] {
  border-radius: var(--whale-animated-radius, 999px);
  corner-shape: round;
  width: 216px;
  padding: 4px;
}

.bZKdGW_floating[data-view="settings"] {
  width: 660px;
  padding: 0;
}

.bZKdGW_floating[data-view="setup"]:not([data-collapsed]) {
  width: 420px;
}

.bZKdGW_floating:active {
  cursor: grabbing;
}

.bZKdGW_floating[data-whale-dock-phase="preview"] {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

.bZKdGW_floating [hidden] {
  display: none !important;
}

.bZKdGW_floating [data-no-drag] {
  cursor: auto;
  touch-action: pan-y;
}

.bZKdGW_panelViewport {
  overscroll-behavior: contain;
  min-width: 0;
  min-height: 0;
  overflow-x: hidden;
}

.bZKdGW_panelContent {
  min-width: 0;
  animation: bZKdGW_whaleEnter var(--whale-duration) var(--whale-ease);
}

.bZKdGW_mark {
  flex: none;
  width: 24px;
  height: 24px;
}

.bZKdGW_markSmall {
  flex: none;
  width: 20px;
  height: 20px;
}

.bZKdGW_brand, .bZKdGW_header, .bZKdGW_headerActions, .bZKdGW_actions, .bZKdGW_statusRow, .bZKdGW_caption {
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.bZKdGW_brand {
  font-size: 15px;
}

.bZKdGW_header {
  justify-content: space-between;
  margin-bottom: 12px;
}

.bZKdGW_headerActions {
  gap: 2px;
}

.bZKdGW_actions {
  flex-wrap: wrap;
}

.bZKdGW_iconButton {
  flex: none;
  width: 32px;
  min-width: 32px;
  height: 32px;
  padding: 0;
}

.bZKdGW_newChatButton {
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

.bZKdGW_newChatButton svg {
  width: 14px;
  height: 14px;
}

.bZKdGW_ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
}

.bZKdGW_statusRow {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  margin-bottom: 10px;
  padding: 4px 6px;
}

.bZKdGW_statusRow[data-recording] {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 19%,var(--dsw-alias-bg-module-platform));
}

.bZKdGW_statusRow[data-recording] .bZKdGW_voiceStatus > svg {
  color: var(--dsw-alias-brand-primary);
}

.bZKdGW_status {
  flex: 1;
  min-width: 0;
  margin: 0;
  font-size: 12px;
  line-height: 18px;
}

.bZKdGW_voiceTarget {
  flex: 1;
  align-items: center;
  gap: 4px;
  min-width: 0;
  line-height: 18px;
  display: flex;
}

.bZKdGW_voiceTarget > span, .bZKdGW_existingSessionHome > span {
  color: var(--dsw-alias-label-secondary);
  flex: none;
  font-size: 11px;
}

.bZKdGW_voiceTarget strong {
  font-size: 13px;
  font-weight: 600;
}

.bZKdGW_voiceStatus {
  align-items: center;
  gap: 4px;
  max-width: 47%;
  display: flex;
}

.bZKdGW_voiceStatus > svg {
  flex: none;
  width: 14px;
  height: 14px;
}

.bZKdGW_statusRow[data-bound] {
  flex-direction: column;
  align-items: stretch;
  gap: 0;
}

.bZKdGW_statusRow[data-bound] .bZKdGW_voiceStatus {
  max-width: 100%;
}

.bZKdGW_mainAction {
  width: 100%;
  min-height: 36px;
  font-weight: 500;
}

.bZKdGW_primary {
  color: var(--dsw-alias-label-primary) !important;
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 16%,var(--dsw-alias-bg-layer-2)) !important;
  border: 1px solid var(--dsw-alias-border-l2) !important;
}

.bZKdGW_bubble {
  corner-shape: round;
  cursor: grab;
  touch-action: none;
  width: 100%;
  max-width: 100%;
  height: 36px;
  animation: bZKdGW_whaleEnter var(--whale-duration) var(--whale-ease);
  border-radius: 999px;
  justify-content: flex-start;
  gap: 8px;
}

.bZKdGW_bubble .bZKdGW_ellipsis {
  text-align: left;
  flex: 1;
}

.bZKdGW_caption {
  text-align: left;
  justify-content: flex-start;
  width: 100%;
  margin-top: 8px;
  padding: 6px 0;
  font-size: 12px;
}

.bZKdGW_caption .bZKdGW_ellipsis {
  flex: 1;
}

.bZKdGW_openOriginal {
  flex: none;
}

.bZKdGW_hint, .bZKdGW_quickHint {
  color: var(--dsw-alias-label-secondary);
  overflow-wrap: anywhere;
  font-size: 12px;
}

.bZKdGW_hint {
  margin: 6px 0;
}

.bZKdGW_quickHint {
  margin: 0;
  font-size: 11px;
}

.bZKdGW_notice, .bZKdGW_note, .bZKdGW_error {
  border-radius: var(--dsw-radius-sm);
  overflow-wrap: anywhere;
  background: var(--dsw-alias-bg-module-platform);
  margin: 8px 0;
  padding: 8px 10px;
  font-size: 12px;
}

.bZKdGW_notice, .bZKdGW_note {
  border-left: 2px solid var(--dsw-alias-state-warn-primary);
}

.bZKdGW_error {
  border-left: 2px solid var(--dsw-alias-state-error-primary);
}

.bZKdGW_error button {
  margin-top: 8px;
}

.bZKdGW_popover {
  box-sizing: border-box;
  cursor: auto;
  touch-action: auto;
  width: 100%;
  animation: bZKdGW_whaleEnter var(--whale-duration) var(--whale-ease);
  margin: 0 0 10px;
  padding: 12px;
  position: relative;
  overflow: auto;
}

.bZKdGW_popoverHeader {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  display: flex;
}

.bZKdGW_popoverHeader > button {
  width: 28px;
  padding: 0;
}

.bZKdGW_quickConversation {
  max-height: 160px;
}

.bZKdGW_recentMessages {
  gap: 6px;
  display: grid;
}

.bZKdGW_message {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  padding: 5px 8px;
}

.bZKdGW_message strong {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

.bZKdGW_message p {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  margin: 3px 0 0;
}

.bZKdGW_quickActions {
  gap: 6px;
  min-width: 0;
  display: grid;
}

.bZKdGW_quickSpeed {
  gap: 5px;
  padding-top: 4px;
  display: grid;
}

.bZKdGW_quickSpeedHeader {
  color: var(--dsw-alias-label-secondary);
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  display: flex;
}

.bZKdGW_quickSpeedHeader small {
  font-size: 11px;
}

.bZKdGW_quickSegments {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  gap: 3px;
  padding: 3px;
  display: grid;
}

.bZKdGW_quickSegments button {
  min-width: 0;
  height: 28px;
  min-height: 28px;
  padding: 0 5px;
  font-size: 12px;
}

.bZKdGW_quickSegments button[aria-pressed="true"] {
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: 0 1px 3px #0001;
}

.bZKdGW_settings {
  height: 100%;
  min-height: 0;
  color: var(--dsw-alias-label-primary);
  flex-direction: column;
  display: flex;
  overflow: hidden;
}

.bZKdGW_settingsHeader {
  box-sizing: border-box;
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 4px 10px;
  display: flex;
}

.bZKdGW_settingsHeader h2 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.bZKdGW_settingsBrand {
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 6px;
  min-width: 0;
  display: flex;
}

.bZKdGW_backButton, .bZKdGW_guideButton {
  flex: none;
  padding: 0 8px;
  font-size: 12px;
}

.bZKdGW_backIcon {
  transform: rotate(180deg);
}

.bZKdGW_settingsLayout {
  flex: 1;
  grid-template-rows: minmax(0, 1fr);
  grid-template-columns: 104px minmax(0, 1fr);
  min-height: 0;
  display: grid;
  overflow: hidden;
}

.bZKdGW_settingsNav {
  border-right: 1px solid var(--dsw-alias-border-l2);
  background: var(--dsw-alias-bg-module-platform);
  flex-direction: column;
  gap: 3px;
  min-height: 0;
  padding: 8px 6px;
  display: flex;
  overflow-y: auto;
}

.bZKdGW_settingsNav button {
  justify-content: flex-start;
  min-width: 0;
  min-height: 34px;
  padding: 0 12px;
  font-size: 12px;
}

.bZKdGW_settingsNav button[aria-pressed="true"] {
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: inset 2px 0 0 var(--dsw-alias-brand-primary);
  font-weight: 600;
}

.bZKdGW_settingsPage {
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  display: flex;
  overflow: hidden;
}

.bZKdGW_pageHeading {
  flex: none;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 10px 12px 8px;
  display: flex;
}

.bZKdGW_pageHeading h3 {
  margin: 0;
  font-size: 15px;
}

.bZKdGW_pageHeading p {
  color: var(--dsw-alias-label-secondary);
  margin: 3px 0 0;
  font-size: 12px;
}

.bZKdGW_settingsBody {
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

.bZKdGW_settingsBody > .bZKdGW_section, .bZKdGW_settingsBody > div > .bZKdGW_section {
  margin: 0 0 12px;
}

.bZKdGW_section {
  align-content: start;
  gap: 8px;
  min-width: 0;
  display: grid;
}

.bZKdGW_section h3 {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
}

.bZKdGW_section p, .bZKdGW_section > .bZKdGW_section {
  margin: 0;
}

.bZKdGW_settingsBody > .bZKdGW_section + .bZKdGW_section {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

.bZKdGW_section summary {
  cursor: pointer;
  padding: 7px 0;
  font-size: 13px;
  font-weight: 500;
}

details.bZKdGW_section {
  border-top: 1px solid var(--dsw-alias-border-l2);
  display: block;
}

details.bZKdGW_section > :not(summary) {
  margin-top: 10px;
}

.bZKdGW_field {
  gap: 6px;
  font-size: 12px;
  display: grid;
}

.bZKdGW_field input {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}

.bZKdGW_deviceSelect {
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

.bZKdGW_radios {
  border: 0;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
  margin: 0;
  padding: 0;
  display: flex;
}

.bZKdGW_radios legend {
  margin-bottom: 6px;
  font-size: 12px;
}

.bZKdGW_radios label {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  cursor: pointer;
  align-items: center;
  gap: 6px;
  padding: 6px 9px;
  font-size: 12px;
  display: flex;
}

.bZKdGW_radios input {
  accent-color: var(--dsw-alias-brand-primary);
}

.bZKdGW_bindingEditor {
  gap: 14px;
  display: grid;
}

.bZKdGW_keyBinding {
  gap: 6px;
  display: grid;
}

.bZKdGW_keyBinding > :is(h3, p) {
  margin: 0;
}

.bZKdGW_keyBindingRow {
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 12px;
  min-width: 0;
  display: flex;
}

.bZKdGW_keyBindingRow > span {
  overflow-wrap: anywhere;
  min-width: 5em;
  font-size: 13px;
}

.bZKdGW_mouseBinding legend {
  font-size: 14px;
  font-weight: 600;
}

.bZKdGW_mouseBinding label {
  white-space: nowrap;
}

.bZKdGW_bindingActions {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

.bZKdGW_segmented {
  flex-wrap: wrap;
  gap: 4px;
  display: flex;
}

.bZKdGW_segmented button {
  min-width: 0;
  font-size: 12px;
}

.bZKdGW_segmented button[aria-pressed="true"], .bZKdGW_modelNav button[aria-pressed="true"] {
  background: var(--dsw-alias-interactive-bg-active);
  color: var(--dsw-alias-label-primary);
  box-shadow: inset 0 -2px 0 var(--dsw-alias-brand-primary);
}

.bZKdGW_modelNav {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  gap: 4px;
  margin-bottom: 12px;
  padding: 0 16px 10px;
  display: flex;
}

.bZKdGW_modelNav button {
  flex: 1;
  min-width: 0;
  padding: 0 6px;
  font-size: 12px;
}

.bZKdGW_sliderLabel {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  display: flex;
}

.bZKdGW_sliderLabel span {
  margin-left: auto;
}

.bZKdGW_sliderLabel input {
  width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
}

.bZKdGW_formActions {
  padding-top: 4px;
}

.bZKdGW_formActions button {
  min-width: 100px;
}

.bZKdGW_editNotice {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 8px;
  display: flex;
}

.bZKdGW_editNotice div {
  flex: 1;
  min-width: 0;
}

.bZKdGW_editNotice strong {
  font-size: 12px;
}

.bZKdGW_editNotice p {
  color: var(--dsw-alias-label-secondary);
  margin: 3px 0 0;
  font-size: 12px;
}

.bZKdGW_editNotice button {
  flex: none;
  font-size: 12px;
}

.bZKdGW_details {
  grid-template-columns: auto minmax(0, 1fr);
  gap: 6px 12px;
  margin: 0;
  font-size: 12px;
  display: grid;
}

.bZKdGW_details dt {
  color: var(--dsw-alias-label-secondary);
}

.bZKdGW_details dd {
  overflow-wrap: anywhere;
  margin: 0;
}

.bZKdGW_capabilityRow {
  display: contents;
}

.bZKdGW_requestDetails {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  max-height: 200px;
  padding: 8px;
  font-size: 11px;
  overflow: auto;
}

.bZKdGW_placeholder {
  text-align: center;
  min-height: 140px;
  color: var(--dsw-alias-label-secondary);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  display: flex;
}

.bZKdGW_placeholder h3, .bZKdGW_placeholder p {
  margin: 0;
}

.bZKdGW_placeholder svg {
  width: 32px;
  height: 32px;
}

.bZKdGW_motionPreview {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  width: 40px;
  height: 32px;
  animation: bZKdGW_whalePreview var(--whale-duration) var(--whale-ease);
  place-items: center;
  display: grid;
}

.bZKdGW_settings a {
  color: var(--dsw-alias-link);
  text-underline-offset: 2px;
  overflow-wrap: anywhere;
}

.bZKdGW_updateDialog {
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

.bZKdGW_updateDialog::backdrop {
  background: #0005;
}

.bZKdGW_updateHeader {
  align-items: center;
  gap: 8px;
  display: flex;
}

.bZKdGW_updateHeader h2 {
  margin: 0;
  font-size: 16px;
}

.bZKdGW_updateAnnouncement {
  white-space: pre-line;
  overflow-wrap: anywhere;
}

.bZKdGW_updateDialog .bZKdGW_actions {
  margin-top: 12px;
}

.bZKdGW_updateDialog a {
  color: var(--dsw-alias-link);
  text-underline-offset: 2px;
}

.bZKdGW_authorization {
  height: auto;
  max-height: min(var(--whale-content-limit, 60vh),var(--whale-visible-content, 60vh));
}

.bZKdGW_authorization .bZKdGW_settingsHeader {
  min-height: 42px;
  padding: 0 0 10px;
}

.bZKdGW_authorization .bZKdGW_settingsHeader h2 {
  flex: 1;
  font-size: 16px;
}

.bZKdGW_authorizationBody {
  overscroll-behavior: contain;
  flex: 1;
  min-height: 0;
  padding-right: 6px;
  overflow-y: auto;
}

.bZKdGW_authorizationActions {
  border-top: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  padding: 10px 0 0;
}

.bZKdGW_authorizationBody > [data-whale-natural-content] {
  display: flow-root;
}

.bZKdGW_permissionList {
  gap: 0;
  margin: 12px 0;
  padding: 0;
  list-style: none;
  display: grid;
}

.bZKdGW_permissionList li {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  padding: 10px 0;
}

.bZKdGW_permissionList p {
  margin: 3px 0 0;
}

.bZKdGW_permissionList strong {
  font-size: 13px;
}

.bZKdGW_sessionTitle {
  overflow-wrap: anywhere;
}

.bZKdGW_sessionRename {
  gap: 6px;
  margin-top: 8px;
  display: grid;
}

.bZKdGW_existingSessionHome {
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

.bZKdGW_existingSessionHome svg {
  flex: none;
  width: 12px;
  height: 12px;
}

.bZKdGW_existingSessionHome:disabled {
  opacity: 1;
  box-shadow: none;
  cursor: default;
}

.bZKdGW_existingSessionHome:disabled > svg {
  visibility: hidden;
}

.bZKdGW_currentDshTarget {
  gap: 4px;
  min-width: 0;
  display: grid;
}

.bZKdGW_currentDshAction {
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

.bZKdGW_currentDshAction > :first-child {
  white-space: nowrap;
  flex: none;
}

.bZKdGW_currentDshAction > :last-child {
  min-width: 0;
  color: var(--dsw-alias-label-secondary);
  text-align: right;
}

.bZKdGW_currentDshTarget > p {
  margin: 0;
}

.bZKdGW_transcriptRetries {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  max-height: 168px;
  padding: 4px 6px;
  display: flex;
}

.bZKdGW_transcriptRetries > header {
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 0 4px;
  display: flex;
}

.bZKdGW_transcriptRetries h2 {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
}

.bZKdGW_transcriptRetries > header p {
  color: var(--dsw-alias-label-secondary);
  margin: 0;
  font-size: 11px;
  line-height: 16px;
}

.bZKdGW_transcriptRetryList {
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

.bZKdGW_transcriptRetry {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 6px;
  display: grid;
}

.bZKdGW_transcriptRetry + .bZKdGW_transcriptRetry {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 4px;
}

.bZKdGW_transcriptRetry p {
  margin: 0;
}

.bZKdGW_transcriptRetryText {
  overflow-wrap: anywhere;
  white-space: pre-wrap;
  user-select: text;
  font-size: 13px;
  line-height: 18px;
}

.bZKdGW_transcriptRetry button {
  height: 26px;
  min-height: 26px;
  padding: 0 6px;
  font-size: 12px;
}

.bZKdGW_existingSessionTarget > p {
  margin: 4px 0;
}

.bZKdGW_existingSessionPicker {
  gap: 8px;
  min-width: 0;
  margin-top: 10px;
  display: grid;
}

.bZKdGW_existingSessionSearch {
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 6px;
  display: grid;
}

.bZKdGW_existingSessionSearch input::placeholder {
  color: var(--dsw-alias-label-secondary);
  opacity: 1;
}

.bZKdGW_existingSessionList {
  max-height: clamp(96px, 26vh, 224px);
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: auto;
}

.bZKdGW_existingSessionList li {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
}

.bZKdGW_existingSessionList label {
  cursor: pointer;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: start;
  gap: 6px;
  padding: 6px 4px;
  display: grid;
}

.bZKdGW_existingSessionList label:has(input:disabled) {
  cursor: default;
}

.bZKdGW_existingSessionList label:has(input:checked) {
  background: var(--dsw-alias-interactive-bg-active);
}

.bZKdGW_existingSessionList input {
  accent-color: var(--dsw-alias-brand-primary);
  margin-top: 3px;
}

.bZKdGW_existingSessionList label span.bZKdGW_hint {
  overflow-wrap: anywhere;
  margin: 3px 0 0;
  display: block;
}

.bZKdGW_performanceChoice {
  line-height: 1.1;
}

.bZKdGW_performanceChoice small {
  white-space: nowrap;
  font-size: .85em;
}

.bZKdGW_floating [data-whale-setup] {
  min-height: 0;
}

.bZKdGW_floating :is(button, input, select, textarea, summary, a) {
  touch-action: manipulation;
}

.bZKdGW_floating button {
  transition: background-color .12s, color .12s;
}

.bZKdGW_floating :is(button, input, select, summary, a):focus-visible, .bZKdGW_floating:focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

.bZKdGW_spin {
  animation: .7s linear infinite bZKdGW_whaleSpin;
}

.bZKdGW_mark[data-state="authorized"], .bZKdGW_markSmall[data-state="authorized"] {
  color: var(--dsw-alias-brand-primary);
}

.bZKdGW_mark[data-state="unknown"], .bZKdGW_markSmall[data-state="unknown"] {
  color: var(--dsw-alias-state-warn-primary);
}

.bZKdGW_mark[data-state="input-active"], .bZKdGW_markSmall[data-state="input-active"] {
  color: var(--dsw-alias-brand-primary);
  animation: 1.35s ease-in-out infinite bZKdGW_whaleBreathe;
}

.bZKdGW_mark[data-state="pending"], .bZKdGW_markSmall[data-state="pending"] {
  color: var(--dsw-alias-label-secondary);
}

[data-motion="firm"].bZKdGW_floating {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="off"].bZKdGW_floating, [data-motion="off"].bZKdGW_floating * {
  transition: none !important;
  animation: none !important;
}

@keyframes bZKdGW_whaleEnter {
  from {
    opacity: .4;
    transform: translateY(3px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes bZKdGW_whalePreview {
  from {
    transform: scale(.88);
  }

  to {
    transform: scale(1);
  }
}

@keyframes bZKdGW_whaleSpin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes bZKdGW_whaleBreathe {
  0%, 100% {
    opacity: .65;
  }

  50% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bZKdGW_floating, .bZKdGW_floating * {
    transition: none !important;
    animation: none !important;
  }
}

@media (width <= 520px), (height <= 560px) {
  .bZKdGW_settingsLayout {
    grid-template-rows: auto minmax(0, 1fr);
    grid-template-columns: minmax(0, 1fr);
  }

  .bZKdGW_settingsNav {
    border-right: 0;
    border-bottom: 1px solid var(--dsw-alias-border-l2);
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 2px;
    padding: 5px 8px;
    display: grid;
    overflow: hidden;
  }

  .bZKdGW_settingsNav button {
    justify-content: center;
    height: 30px;
    min-height: 30px;
    padding: 0 2px;
  }

  .bZKdGW_settingsNav button[aria-pressed="true"] {
    box-shadow: inset 0 -2px 0 var(--dsw-alias-brand-primary);
  }

  .bZKdGW_settingsHeader {
    gap: 3px;
    min-height: 44px;
    padding: 5px 8px;
  }

  .bZKdGW_backButton, .bZKdGW_guideButton {
    padding: 0 5px;
  }

  .bZKdGW_settingsBrand {
    gap: 4px;
  }

  .bZKdGW_settingsBrand .bZKdGW_markSmall {
    display: none;
  }

  .bZKdGW_pageHeading {
    padding: 10px 12px 8px;
  }

  .bZKdGW_pageHeading p {
    display: none;
  }

  .bZKdGW_settingsBody {
    padding: 4px 12px 12px;
  }

  .bZKdGW_modelNav {
    margin-bottom: 8px;
    padding: 0 10px 7px;
  }

  .bZKdGW_editNotice {
    flex-wrap: wrap;
  }

  .bZKdGW_editNotice button {
    width: 100%;
  }
}

@media (height <= 420px) {
  .bZKdGW_settingsHeader {
    height: 36px;
    min-height: 36px;
    padding: 2px 8px;
  }

  .bZKdGW_settingsHeader button {
    height: 30px;
    min-height: 30px;
  }

  .bZKdGW_settingsNav {
    padding: 2px 8px;
  }

  .bZKdGW_settingsNav button {
    height: 28px;
    min-height: 28px;
  }

  .bZKdGW_pageHeading {
    box-sizing: border-box;
    min-height: 32px;
    padding: 2px 12px;
  }

  .bZKdGW_pageHeading .bZKdGW_iconButton {
    width: 28px;
    min-width: 28px;
    height: 28px;
  }

  .bZKdGW_modelNav {
    margin-bottom: 4px;
    padding: 0 10px 3px;
  }

  .bZKdGW_modelNav button {
    height: 28px;
    min-height: 28px;
  }
}

@media (pointer: coarse) {
  .bZKdGW_field input, .bZKdGW_deviceSelect {
    font-size: 16px;
  }
}

@media (forced-colors: active) {
  .bZKdGW_floating, .bZKdGW_popover {
    outline: 1px solid canvastext;
  }

  .bZKdGW_settingsNav button[aria-pressed="true"], .bZKdGW_modelNav button[aria-pressed="true"] {
    outline: 2px solid highlight;
  }
}

.bZKdGW_floating[data-view="home"] .bZKdGW_panelViewport, .bZKdGW_floating[data-collapsed] .bZKdGW_panelViewport {
  overflow: hidden;
}

.bZKdGW_floating[data-view="home"]:not([data-collapsed]) {
  padding: 10px;
}

.bZKdGW_panelContent {
  flex-direction: column;
  gap: 4px;
  height: 100%;
  min-height: 0;
  display: flex;
}

.bZKdGW_panelContent > :not(.bZKdGW_quickConversation) {
  flex: none;
}

.bZKdGW_panelContent > .bZKdGW_homeTargetPicker {
  flex: 1 1 0;
  min-height: 0;
  padding: 2px;
  display: flex;
}

.bZKdGW_homeTargetPicker > .bZKdGW_existingSessionPicker {
  flex-direction: column;
  flex: 1;
  margin-top: 0;
  display: flex;
}

.bZKdGW_homeTargetPicker .bZKdGW_existingSessionList {
  overscroll-behavior: contain;
  flex: auto;
  min-height: 0;
  max-height: none;
}

.bZKdGW_homeTargetRow {
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

.bZKdGW_homeTargetRow:disabled {
  opacity: 1;
  cursor: default;
  color: var(--dsw-alias-label-secondary);
}

.bZKdGW_homeTargetRow .bZKdGW_hint {
  overflow-wrap: anywhere;
}

.bZKdGW_homeTargetPicker :is(.bZKdGW_existingSessionSearch, .bZKdGW_actions) {
  flex: none;
}

.bZKdGW_homeTargetPicker .bZKdGW_actions {
  margin-top: auto;
}

.bZKdGW_homeTargetPicker .bZKdGW_hint {
  margin: 0;
}

.bZKdGW_panelContent > .bZKdGW_header {
  height: 28px;
  min-height: 28px;
  margin: 0;
}

.bZKdGW_panelContent .bZKdGW_header .bZKdGW_iconButton {
  width: 28px;
  min-width: 28px;
  height: 28px;
}

.bZKdGW_panelContent > .bZKdGW_statusRow {
  box-sizing: border-box;
  min-height: 24px;
  margin: 0;
  padding: 2px 6px;
}

.bZKdGW_panelContent > .bZKdGW_hint {
  margin: 0;
  font-size: 12px;
  line-height: 18px;
}

.bZKdGW_panelContent > .bZKdGW_error {
  margin: 0;
  padding: 4px 8px;
  line-height: 18px;
}

.bZKdGW_panelContent .bZKdGW_quickSpeed {
  gap: 3px;
  padding-top: 0;
}

.bZKdGW_panelContent .bZKdGW_quickSpeedHeader {
  line-height: 18px;
}

.bZKdGW_panelContent .bZKdGW_quickHint {
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 16px;
  overflow: hidden;
}

.bZKdGW_panelContent .bZKdGW_quickHint p {
  text-overflow: ellipsis;
  margin: 0;
  line-height: 16px;
  overflow: hidden;
}

.bZKdGW_panelContent > .bZKdGW_caption {
  box-sizing: border-box;
  height: 30px;
  min-height: 30px;
  margin: 0;
  padding: 4px 8px;
  line-height: 18px;
}

.bZKdGW_panelContent > .bZKdGW_quickConversation {
  flex-direction: column;
  flex: 1 1 0;
  min-height: 0;
  max-height: none;
  margin: 0;
  padding: 8px;
  display: flex;
  overflow: hidden;
}

.bZKdGW_quickConversation .bZKdGW_popoverHeader {
  flex: none;
  min-height: 28px;
  margin-bottom: 6px;
}

.bZKdGW_quickConversation .bZKdGW_recentMessages {
  overscroll-behavior: contain;
  min-height: 0;
  overflow-y: auto;
}

.bZKdGW_floating[data-compact-height="true"] .bZKdGW_panelContent {
  gap: 2px;
}

.bZKdGW_floating[data-compact-height="true"] :is(.bZKdGW_voiceTarget, .bZKdGW_existingSessionHome) > span {
  font-size: 10px;
}

.bZKdGW_floating[data-compact-height="true"] .bZKdGW_voiceTarget strong {
  font-size: 12px;
}

.bZKdGW_floating[data-compact-height="true"] .bZKdGW_statusRow[data-bound] .bZKdGW_status {
  line-height: 16px;
}

.bZKdGW_floating[data-compact-height="true"] .bZKdGW_existingSessionHome {
  height: 20px;
  min-height: 20px;
}

.bZKdGW_floating[data-compact-height="true"] .bZKdGW_transcriptRetries {
  max-height: max(46px,calc(var(--whale-content-limit) - 137px));
  gap: 1px;
  padding-block: 2px;
}

.bZKdGW_floating[data-compact-height="true"] [data-has-transcript-retry] > .bZKdGW_audioDevices, .bZKdGW_floating[data-compact-height="true"] .bZKdGW_panelContent:has(.bZKdGW_currentDshTarget) > :is(.bZKdGW_audioDevices, .bZKdGW_quickSpeed), .bZKdGW_floating[data-compact-height="true"] .bZKdGW_panelContent > .bZKdGW_hint:not([data-home-important]), .bZKdGW_floating[data-compact-height="true"] .bZKdGW_panelContent .bZKdGW_quickSpeedHeader, .bZKdGW_floating[data-compact-height="true"] .bZKdGW_panelContent .bZKdGW_quickHint {
  display: none;
}

.bZKdGW_floating[data-compact-height="true"] .bZKdGW_quickActions {
  grid-template-columns: minmax(65px, .9fr) minmax(0, 2.1fr);
  align-items: center;
  gap: 4px;
}

.bZKdGW_floating[data-compact-height="true"] .bZKdGW_quickActions .bZKdGW_mainAction {
  white-space: normal;
  height: 30px;
  min-height: 30px;
  padding-inline: 4px;
  font-size: 12px;
  line-height: 1.15;
}

.bZKdGW_floating[data-compact-height="true"] .bZKdGW_quickActions .bZKdGW_quickSegments {
  padding: 2px;
}

.bZKdGW_floating[data-compact-height="true"] .bZKdGW_quickActions .bZKdGW_quickSegments button {
  padding-inline: 2px;
  font-size: 11px;
}

.bZKdGW_floating[data-compact-height="true"] .bZKdGW_panelContent[data-size-detail="true"] > .bZKdGW_quickSpeed {
  display: none;
}

.bZKdGW_settingsBody {
  container-type: inline-size;
}

.bZKdGW_section > button {
  justify-self: start;
  max-width: 100%;
}

.bZKdGW_settingsBody button {
  white-space: normal;
  overflow-wrap: anywhere;
  height: auto;
  min-height: 36px;
}

.bZKdGW_settingsBody :is(.bZKdGW_actions, .bZKdGW_segmented, .bZKdGW_formActions) > button {
  flex: 0 auto;
}

.bZKdGW_inlineActions, .bZKdGW_inlineField, .bZKdGW_volumeRow, .bZKdGW_volumeControl {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.bZKdGW_inlineField {
  font-size: 12px;
}

.bZKdGW_inlineField .bZKdGW_deviceSelect {
  text-overflow: ellipsis;
  flex: 0 180px;
  width: 180px;
  max-width: 100%;
}

.bZKdGW_inlineField input[type="number"] {
  width: 80px;
}

.bZKdGW_fullName {
  color: var(--dsw-alias-label-secondary);
  min-width: 0;
  font-size: 12px;
}

.bZKdGW_fullName summary {
  padding: 2px 0;
  font-size: 12px;
  font-weight: 400;
}

.bZKdGW_fullName p {
  overflow-wrap: anywhere;
  margin-top: 4px;
}

.bZKdGW_disclosureRow {
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 8px;
  display: flex;
}

.bZKdGW_disclosureRow > details.bZKdGW_section {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  flex: 0 auto;
  min-width: 0;
  padding: 0 10px;
}

.bZKdGW_disclosureRow > details.bZKdGW_section > summary {
  min-height: 20px;
  padding: 7px 0;
}

.bZKdGW_disclosureRow > details[open].bZKdGW_section {
  flex: 100%;
  padding-bottom: 10px;
}

.bZKdGW_volumeControl {
  flex-wrap: nowrap;
  flex: 0 260px;
}

.bZKdGW_volumeControl input[type="range"] {
  width: 210px;
  min-width: 80px;
  max-width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
  flex: 210px;
}

.bZKdGW_volumeControl span {
  text-align: right;
  flex: none;
  min-width: 3em;
  font-size: 12px;
}

.bZKdGW_field:has( > input[type="number"]) {
  flex-wrap: wrap;
  align-items: center;
  display: flex;
}

.bZKdGW_field > input[type="number"] {
  width: 80px;
}

.bZKdGW_authorizationSteps {
  color: var(--dsw-alias-label-secondary);
  margin: 8px 0 12px;
  font-size: 12px;
}

.bZKdGW_agreement {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  gap: 14px;
  padding: 14px;
  font-size: 13px;
  line-height: 1.6;
  display: grid;
}

.bZKdGW_agreement p {
  margin: 0;
}

.bZKdGW_authorizationBody h3 {
  margin: 0 0 10px;
  font-size: 15px;
}

.bZKdGW_authorizationActions button {
  flex: 0 auto;
  min-height: 36px;
}

@container (width <= 340px) {
  .bZKdGW_inlineActions {
    align-items: flex-start;
  }

  .bZKdGW_inlineField .bZKdGW_deviceSelect {
    flex-basis: 160px;
    width: 160px;
  }

  .bZKdGW_volumeControl {
    flex-basis: 200px;
  }

  .bZKdGW_volumeControl input[type="range"] {
    width: 150px;
  }
}

.bZKdGW_audioDevices {
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  display: flex;
}

.bZKdGW_audioDeviceGrid {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 8px;
  display: grid;
}

.bZKdGW_audioDeviceField {
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  font-size: 12px;
  display: flex;
}

.bZKdGW_audioDeviceField > span {
  align-items: center;
  gap: 4px;
  line-height: 18px;
  display: flex;
}

.bZKdGW_audioDeviceField svg {
  flex: none;
  width: 14px;
  height: 14px;
}

.bZKdGW_audioDeviceField select {
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

.bZKdGW_audioDeviceField select[data-device-missing] {
  border-color: #b80;
}

.bZKdGW_audioDeviceHint, .bZKdGW_audioDeviceNotice {
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  font-size: 11px;
  line-height: 16px;
  overflow: hidden;
}

.bZKdGW_audioDeviceHint {
  color: var(--dsw-alias-label-secondary);
}

.bZKdGW_audioDeviceNotice {
  color: #805500;
}

[data-ds-dark-theme] .bZKdGW_audioDeviceNotice {
  color: #ffd277;
}

[data-ds-dark-theme] .bZKdGW_audioDeviceField select {
  color-scheme: dark;
}

.bZKdGW_floating[data-compact-height="true"] .bZKdGW_audioDeviceField > span {
  font-size: 11px;
  line-height: 14px;
}

.bZKdGW_floating[data-compact-height="true"] .bZKdGW_audioDeviceField select {
  height: 26px;
}

.bZKdGW_floating[data-compact-height="true"] .bZKdGW_audioDeviceHint, .bZKdGW_floating[data-compact-height="true"] .bZKdGW_audioDeviceNotice, .bZKdGW_floating[data-compact-height="true"] .bZKdGW_panelContent:has( > [data-home-important]) .bZKdGW_audioDeviceField > span {
  display: none;
}

.bZKdGW_pageHeading.bZKdGW_modelHeading {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  justify-content: flex-start;
  gap: 10px;
  min-height: 40px;
  margin-bottom: 6px;
  padding: 5px 12px;
}

.bZKdGW_modelHeading h3 {
  white-space: nowrap;
  font-size: 13px;
}

.bZKdGW_modelHeading .bZKdGW_modelNav {
  border: 0;
  flex: 1;
  gap: 3px;
  min-width: 0;
  margin: 0;
  padding: 0;
}

.bZKdGW_modelHeading .bZKdGW_modelNav button {
  white-space: nowrap;
  flex: 0 auto;
  height: 28px;
  min-height: 28px;
  padding: 0 6px;
}

.bZKdGW_currentModel {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  display: flex;
}

.bZKdGW_pathRow {
  grid-template-columns: 95px minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  font-size: 12px;
  display: grid;
}

.bZKdGW_pathRow > span {
  min-width: 0;
}

.bZKdGW_editNotice {
  margin-bottom: 7px;
  padding: 5px 8px;
}

.bZKdGW_editNotice span {
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
}

.bZKdGW_editNotice button {
  height: auto;
  min-height: 30px;
}

@media (width <= 360px) {
  .bZKdGW_pageHeading.bZKdGW_modelHeading {
    gap: 5px;
    padding: 5px 8px;
  }

  .bZKdGW_modelHeading .bZKdGW_modelNav button {
    padding: 0 3px;
    font-size: 11px;
  }

  .bZKdGW_pathRow {
    grid-template-columns: minmax(0, 1fr);
    gap: 4px;
  }
}

.bZKdGW_pathRow {
  display: block;
}

.bZKdGW_pathRow > div:first-child {
  flex-wrap: nowrap !important;
}

.bZKdGW_pathRow > div:first-child > label {
  flex: 1;
  grid-template-columns: 95px minmax(0, 1fr);
  display: grid !important;
}

.bZKdGW_pathRow input {
  width: 100% !important;
}

.bZKdGW_pathRow button {
  flex: none;
  min-height: 32px;
}

@media (width <= 420px) {
  .bZKdGW_pathRow > div:first-child {
    flex-wrap: wrap !important;
  }

  .bZKdGW_pathRow > div:first-child > label {
    grid-template-columns: 80px minmax(0, 1fr);
    min-width: 180px !important;
  }
}

.bZKdGW_floating :is(button, select, input, textarea, summary, a), .bZKdGW_settings :is(button, select, input, summary, a) {
  transition: background-color .12s ease-out,border-color .12s ease-out,color .12s ease-out,box-shadow .12s ease-out,transform var(--whale-duration, .2s) var(--whale-ease, ease-out);
}

.bZKdGW_floating :is(button, summary):hover:not(:disabled) {
  background-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,var(--dsw-alias-bg-layer-1));
}

.bZKdGW_floating button:active:not(:disabled), .bZKdGW_settings button:active:not(:disabled) {
  transform: scale(.97);
}

.bZKdGW_floating :is(input, select, textarea):hover:not(:disabled) {
  border-color: var(--dsw-alias-brand-primary);
}

.bZKdGW_radios label {
  transition: background-color .12s, border-color .12s, box-shadow .12s;
}

.bZKdGW_radios label:has(input:checked) {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,transparent);
}

.bZKdGW_authorizationBody, .bZKdGW_settingsLayout, .bZKdGW_panelContent > .bZKdGW_header, .bZKdGW_settingsBody > div:not([hidden]), .bZKdGW_section > div:not([hidden])[data-whale-tab-panel], .bZKdGW_floating [role="tabpanel"]:not([hidden]) {
  animation: bZKdGW_whalePageEnter var(--whale-duration, .2s) ease-out;
}

.bZKdGW_floating :is([role="menu"], [role="listbox"]), .bZKdGW_floating [data-whale-dropdown] {
  transform-origin: top;
  animation: .12s ease-out bZKdGW_whalePageEnter;
}

.bZKdGW_floating [data-whale-save-result] {
  animation: .16s ease-out bZKdGW_whaleFeedback;
}

.bZKdGW_floating summary {
  list-style: none;
}

.bZKdGW_floating summary::-webkit-details-marker {
  display: none;
}

.bZKdGW_floating summary:before {
  content: "\u203A";
  width: 1em;
  transition: transform .16s ease-out;
  display: inline-block;
  transform: rotate(0);
}

.bZKdGW_floating details[open] > summary:before {
  transform: rotate(90deg);
}

.bZKdGW_floating details[open] > :not(summary) {
  animation: .16s ease-out bZKdGW_whalePageEnter;
}

@supports (interpolate-size: allow-keywords) {
  .bZKdGW_floating details {
    interpolate-size: allow-keywords;
  }

  .bZKdGW_floating details::details-content {
    block-size: 0;
    transition: block-size .16s ease-out,content-visibility .16s allow-discrete;
    overflow: clip;
  }

  .bZKdGW_floating details[open]::details-content {
    block-size: auto;
  }
}

@keyframes bZKdGW_whalePageEnter {
  from {
    translate: 0 4px;
  }

  to {
    translate: 0;
  }
}

@keyframes bZKdGW_whaleFeedback {
  from {
    opacity: .5;
  }

  to {
    opacity: 1;
  }
}

[data-motion="firm"].bZKdGW_floating, [data-motion="firm"].bZKdGW_settings {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="firm"].bZKdGW_floating details::details-content, [data-motion="firm"].bZKdGW_floating summary:before {
  transition-duration: .1s;
}

[data-motion="off"].bZKdGW_floating *, [data-motion="off"].bZKdGW_settings *, [data-motion="off"].bZKdGW_floating :before, [data-motion="off"].bZKdGW_floating details::details-content {
  transition: none !important;
  animation: none !important;
}

[data-motion="off"].bZKdGW_floating button:active, [data-motion="off"].bZKdGW_settings button:active {
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .bZKdGW_floating *, .bZKdGW_settings *, .bZKdGW_floating :before, .bZKdGW_floating details::details-content {
    transition: none !important;
    animation: none !important;
  }

  .bZKdGW_floating button:active, .bZKdGW_settings button:active {
    transform: none;
  }
}

.bZKdGW_conversationChoice {
  gap: 6px;
  min-width: 0;
  display: grid;
  position: relative;
}

.bZKdGW_conversationChoice > button {
  text-align: left;
  justify-content: space-between;
  width: 100%;
  min-width: 0;
}

.bZKdGW_conversationOptions {
  overscroll-behavior: contain;
  gap: 3px;
  min-width: 0;
  max-height: 220px;
  padding: 6px;
  animation: .12s ease-out bZKdGW_whalePageEnter;
  display: grid;
  overflow: auto;
}

.bZKdGW_conversationOptions [role="option"] {
  text-align: left;
  border-radius: var(--dsw-radius-sm);
  justify-content: space-between;
  width: 100%;
  min-width: 0;
  padding: 7px 10px;
  transition: background-color .12s ease-out, color .12s ease-out;
}

.bZKdGW_conversationOptions [role="option"][aria-selected="true"] {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 18%,var(--dsw-alias-bg-layer-1));
  font-weight: 600;
}

.bZKdGW_conversationOptions [role="option"]:is(:hover, :focus-visible) {
  background: var(--dsw-alias-interactive-bg-active);
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: -2px;
}

.bZKdGW_conversationOptions [role="option"] small {
  color: var(--dsw-alias-label-secondary);
}

.bZKdGW_settings [data-whale-tab-panel]:not([hidden]) {
  animation: bZKdGW_whalePageEnter var(--whale-duration, .2s) ease-out;
}

.bZKdGW_modelHeading .bZKdGW_modelNav {
  scrollbar-width: thin;
  overflow-x: auto;
}

.bZKdGW_modelHeading .bZKdGW_modelNav button {
  flex-shrink: 0;
}

[data-motion="off"].bZKdGW_settings [data-whale-tab-panel] {
  animation: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .bZKdGW_settings [data-whale-tab-panel] {
    animation: none !important;
  }
}

.bZKdGW_panelContent, .bZKdGW_bubble {
  animation: none;
}

.bZKdGW_panelContent {
  height: auto;
}

.bZKdGW_panelContent[data-size-detail="true"] {
  height: 100%;
}

.bZKdGW_panelContent .bZKdGW_quickSegments {
  background: none;
  gap: 6px;
  padding: 0;
}

.bZKdGW_panelContent .bZKdGW_quickSegments button {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 8px;
  gap: 4px;
  height: 34px;
  min-height: 34px;
}

.bZKdGW_panelContent .bZKdGW_quickSegments button[aria-pressed="true"] {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 22%,var(--dsw-alias-bg-layer-1));
  box-shadow: inset 0 0 0 1px var(--dsw-alias-brand-primary);
}

.bZKdGW_panelContent .bZKdGW_quickSegments svg {
  width: 15px;
  height: 15px;
}

.bZKdGW_panelContent > .bZKdGW_quickConversation {
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

.bZKdGW_conversationHeader {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  font-size: 12px;
  display: flex;
}

.bZKdGW_conversationHeader > div {
  align-items: center;
  gap: 2px;
  display: flex;
}

.bZKdGW_conversationHeader button:not(.bZKdGW_iconButton), .bZKdGW_assistantName, .bZKdGW_loadHistory {
  color: inherit;
  font: inherit;
  cursor: pointer;
  background: none;
  border: 0;
  border-radius: 4px;
  padding: 3px;
}

.bZKdGW_conversationHeader .bZKdGW_iconButton {
  width: 26px;
  min-width: 26px;
  height: 28px;
}

.bZKdGW_historyScope {
  color: var(--dsw-alias-label-secondary);
  flex: none;
  margin: 2px 0;
  font-size: 10px;
  line-height: 14px;
}

.bZKdGW_quickConversation .bZKdGW_recentMessages {
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

.bZKdGW_message {
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

.bZKdGW_message[data-role="user"] {
  align-self: flex-end;
  align-items: flex-end;
}

.bZKdGW_messageName {
  min-height: 19px;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  line-height: 17px;
}

.bZKdGW_assistantName {
  overflow-wrap: anywhere;
  max-width: 100%;
  min-height: 19px;
  padding: 0 2px;
  font-size: 11px;
  line-height: 17px;
}

.bZKdGW_assistantName:hover {
  color: var(--dsw-alias-label-primary);
  text-underline-offset: 3px;
  text-decoration: underline;
}

.bZKdGW_assistantNameInput {
  box-sizing: border-box;
  width: 140px;
  min-width: 60px;
  max-width: 160px;
  height: 23px !important;
  min-height: 23px !important;
  padding: 1px 5px !important;
  font-size: 12px !important;
}

.bZKdGW_message p {
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

.bZKdGW_message[data-role="user"] p {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 28%,var(--dsw-alias-bg-layer-1));
  border-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 45%,var(--dsw-alias-border-l2));
}

.bZKdGW_message small {
  color: var(--dsw-alias-label-secondary);
  font-size: 10px;
}

.bZKdGW_loadHistory {
  align-self: center;
  padding: 5px;
  font-size: 11px;
}

.bZKdGW_newMessages {
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

.bZKdGW_bubble {
  gap: 6px;
  padding: 0 7px;
  font-size: 11px;
}

.bZKdGW_bubbleBrand {
  flex: none;
  font-size: 12px;
  font-weight: 600;
}

.bZKdGW_bubbleStatus {
  white-space: nowrap;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 3px;
  min-width: 0;
  display: flex;
}

.bZKdGW_bubbleStatus svg {
  flex: none;
  width: 15px;
  height: 15px;
}

.bZKdGW_bubble > svg:last-child {
  flex: none;
  width: 14px;
  height: 14px;
}

.bZKdGW_voiceBars {
  align-items: center;
  gap: 2px;
  height: 16px;
  display: flex;
}

.bZKdGW_voiceBars i {
  background: var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary));
  opacity: .5;
  border-radius: 1px;
  width: 3px;
  height: 13px;
  transform: scaleY(.31);
}

.bZKdGW_voiceBars[data-active="true"] i {
  background: var(--dsw-alias-brand-primary);
  opacity: 1;
  animation: .7s ease-in-out infinite alternate bZKdGW_whaleInputPulse;
}

.bZKdGW_voiceBars[data-active="true"] i:nth-child(2n) {
  animation-delay: -.3s;
}

.bZKdGW_voiceBars[data-active="true"] i:nth-child(3) {
  animation-delay: -.5s;
}

@keyframes bZKdGW_whaleInputPulse {
  from {
    transform: scaleY(.38);
  }

  to {
    transform: scaleY(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bZKdGW_voiceBars[data-active="true"] i {
    animation: none;
    transform: scaleY(.69);
  }
}

.bZKdGW_floating[data-motion="off"] .bZKdGW_voiceBars[data-active="true"] i {
  animation: none;
  transform: scaleY(.69);
}

@media (forced-colors: active) {
  .bZKdGW_message p {
    border: 1px solid canvastext;
  }

  .bZKdGW_quickSegments button[aria-pressed="true"] {
    outline: 2px solid highlight;
  }

  .bZKdGW_voiceBars i {
    background: canvastext;
  }
}

.bZKdGW_voicePrompt {
  flex-direction: column;
  gap: 8px;
  display: flex;
}

.bZKdGW_voicePrompt label {
  font-size: 13px;
  font-weight: 600;
}

.bZKdGW_voicePrompt label span {
  margin-left: 10px;
  font-weight: 400;
}

.bZKdGW_voicePromptInput {
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

.bZKdGW_voicePromptInput::placeholder {
  color: var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary));
  opacity: 1;
}

.bZKdGW_voicePromptInput:disabled {
  opacity: .65;
  cursor: not-allowed;
}

.bZKdGW_voicePromptInput:focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: 2px;
}

.bZKdGW_voicePromptCount {
  text-align: right;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
}

.bZKdGW_voicePromptActions {
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  display: flex;
}

.bZKdGW_voicePromptActions .bZKdGW_actions {
  margin: 0;
}

.bZKdGW_voicePromptMode {
  color: var(--dsw-alias-state-success-primary, var(--dsw-alias-label-secondary));
  white-space: nowrap;
  font-size: 11px;
}

.bZKdGW_voicePromptMode:before {
  content: "\u2022";
  margin-right: 5px;
}
`};var le=require("react/jsx-runtime");function Xn({small:e=!1,state:n="idle"}){return(0,le.jsx)("svg",{viewBox:"0 0 1024 1024","data-state":n,className:e?h.markSmall:h.mark,"aria-hidden":"true",children:(0,le.jsx)("path",{fill:"currentColor",d:"M 920.377 65.087 C 928.064 63.083 932.973 107.434 932.987 114.072 C 933.092 165.045 924.256 210.594 901.365 256.376 C 855.379 348.348 758.325 392.662 681.124 453.829 C 619.898 502.339 580.980 567.068 558.933 641.286 C 543.187 694.296 538.293 750.695 527.468 804.833 C 520.391 840.227 514.008 874.928 493.687 905.451 C 474.447 934.348 431.832 972.135 393.948 957.487 C 358.248 943.683 373.787 884.228 380.635 856.964 C 401.585 773.552 460.283 657.712 419.105 573.931 C 381.383 497.183 304.815 488.756 234.259 458.353 C 195.522 441.661 157.383 413.822 133.190 378.905 C 115.301 353.087 100.999 326.148 94.423 295.130 C 93.358 290.109 88.245 266.804 93.252 264.337 C 93.759 264.087 133.145 277.445 138.791 278.433 C 174.563 284.693 209.339 281.307 245.016 275.980 C 288.094 269.548 333.679 260.367 376.940 270.872 C 414.858 280.080 448.414 297.981 474.046 327.930 C 483.707 339.219 491.970 352.034 498.604 365.302 C 499.492 367.078 503.519 377.817 505.784 377.367 C 506.966 377.132 507.537 375.084 507.926 374.169 C 513.160 361.862 518.091 349.606 524.078 337.631 C 541.287 303.214 562.597 270.184 592.119 244.919 C 633.676 209.352 683.585 187.330 735.895 172.601 C 770.712 162.797 806.633 155.544 838.984 138.655 C 862.849 126.195 882.544 110.622 901.022 91.328 C 905.036 87.137 916.896 65.995 920.377 65.087 Z"})})}var lu=()=>({pet:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("path",{d:"M5 11c-2-8 4-10 7-8 5-2 9 2 7 8M5 10l4-4 3 3 3-3 4 4v5c0 4-3 6-7 6s-7-2-7-6v-5Z"}),(0,le.jsx)("path",{d:"M8 13v2m8-2v2m-6 3h4"})]}),settings:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("path",{d:"m9 3 1-1h4l1 1 .5 2 2 .8 2-.6 2 3-.8 1.8.2 2.2 1.3 1.5-2 3-2.1-.2-1.7 1.3-.5 2.2h-4l-.6-2.1-1.8-1.1-2 .3-2-3 1.3-1.7V10L4 8.5l2-3 2 .5L9 3Z"}),(0,le.jsx)("circle",{cx:"12",cy:"11.5",r:"3"})]}),minus:(0,le.jsx)("path",{d:"M5 12h14"}),plus:(0,le.jsx)("path",{d:"M12 5v14M5 12h14"}),down:(0,le.jsx)("path",{d:"m6 9 6 6 6-6"}),refresh:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("path",{d:"M20 6v5h-5M4 18v-5h5"}),(0,le.jsx)("path",{d:"M6 7a7 7 0 0 1 12-1l2 5M4 13l2 5a7 7 0 0 0 12-1"})]}),up:(0,le.jsx)("path",{d:"m6 15 6-6 6 6"}),check:(0,le.jsx)("path",{d:"m5 12 4 4L19 6"}),micOff:(0,le.jsx)(le.Fragment,{children:(0,le.jsx)("path",{d:"M9 9v3a3 3 0 0 0 5.1 2.1M15 8V6a3 3 0 0 0-5.7-1.3M6 10v2a6 6 0 0 0 10.2 4.3M18 12v-2M12 18v3M9 21h6M3 3l18 18"})}),mic:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("rect",{x:"9",y:"3",width:"6",height:"12",rx:"3"}),(0,le.jsx)("path",{d:"M6 10v2a6 6 0 0 0 12 0v-2M12 18v3M9 21h6"})]}),volume:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("path",{d:"M3 9h4l5-4v14l-5-4H3Z"}),(0,le.jsx)("path",{d:"M16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"})]}),chat:(0,le.jsx)("path",{d:"M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9l-5 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"}),close:(0,le.jsx)("path",{d:"m6 6 12 12M18 6 6 18"}),search:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("circle",{cx:"10",cy:"10",r:"6"}),(0,le.jsx)("path",{d:"m15 15 5 5"})]}),chevron:(0,le.jsx)("path",{d:"m9 5 7 7-7 7"}),warning:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("path",{d:"m12 3 10 18H2L12 3Z"}),(0,le.jsx)("path",{d:"M12 9v5m0 3v.2"})]})});function Ue({name:e,className:n=""}){return(0,le.jsx)("svg",{viewBox:"0 0 24 24",width:"18",height:"18","aria-hidden":"true",className:n,fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round",children:lu()[e]??lu().chat})}var Pe=require("react/jsx-runtime");function kh({name:e,save:n,t}){let[r,o]=(0,He.useState)(!1),[i,s]=(0,He.useState)(e),c=(0,He.useRef)(!1),l=(0,He.useRef)(null),d=(0,He.useRef)(null),u=(0,He.useRef)(!1);(0,He.useLayoutEffect)(()=>{r?(l.current?.focus({preventScroll:!0}),l.current?.select()):u.current&&(u.current=!1,d.current?.focus({preventScroll:!0}))},[r]);let p=()=>{o(!1),s(e)},f=()=>{let m=i.trim();m&&m.length<=40&&(n?.(m),u.current=!0,o(!1))};return r?(0,Pe.jsx)(io.Input,{ref:l,className:h.assistantNameInput,"aria-label":t("assistantName"),value:i,maxLength:40,"data-no-drag":!0,onChange:m=>s(m.target.value),onCompositionStart:()=>{c.current=!0},onCompositionEnd:()=>{c.current=!1},onBlur:p,onKeyDown:m=>{m.stopPropagation(),!(c.current||m.nativeEvent.isComposing)&&(m.key==="Escape"&&(m.preventDefault(),u.current=!0,p()),m.key==="Enter"&&(m.preventDefault(),f()))}}):(0,Pe.jsx)("button",{ref:d,type:"button",className:h.assistantName,"data-no-drag":!0,title:t("renameAssistant"),onClick:()=>{s(e),o(!0)},children:e})}function cu({conversation:e,history:n,historyLoading:t,historyError:r,historyRetryCursor:o,loadHistory:i,assistantName:s,setAssistantName:c,close:l,t:d}){let[u,p]=(0,He.useState)(!1),[f,m]=(0,He.useState)(0),y=(0,He.useRef)(null),v=(0,He.useRef)(!0),b=(0,He.useRef)(null),_=(0,He.useRef)(null),Z=e.rootSessionId,K=Ud(n?.rootSessionId===Z?n.items:[],e.items),O=!v.current&&b.current?.firstId,N=O?K.findIndex(S=>S.id===O):-1,T=u?K:N>=0?K.slice(N):Fd(K),P=()=>{let S=y.current;if(!S)return;let C=S.getBoundingClientRect(),R=[...S.querySelectorAll("[data-message-id]")].find(z=>z.getBoundingClientRect().bottom>=C.top);_.current=R?{id:R.dataset.messageId,offset:R.getBoundingClientRect().top-C.top}:null},E=()=>{let S=y.current;S&&(S.scrollTop=S.scrollHeight),v.current=!0,m(0),P()},k=!u&&K.filter(S=>S.role==="user").length<10&&!!n?.nextCursor;return(0,He.useEffect)(()=>{k&&!t&&!r&&i?.(n.nextCursor)},[k,n?.nextCursor,t,r,Z]),(0,He.useLayoutEffect)(()=>{let S=y.current;if(!S)return;let C=b.current;if((!C||C.root!==Z)&&(v.current=!0,m(0)),v.current)S.scrollTop=S.scrollHeight;else{let R=_.current,z=R&&[...S.querySelectorAll("[data-message-id]")].find(A=>A.dataset.messageId===R.id);if(z?S.scrollTop+=z.getBoundingClientRect().top-S.getBoundingClientRect().top-R.offset:C&&(S.scrollTop=Math.min(C.top,S.scrollHeight-S.clientHeight)),C){let A=e.items.filter(I=>I.at>=C.lastAt&&!C.ids.has(I.id)).length;A&&m(I=>I+A)}}b.current={root:Z,firstId:T[0]?.id,top:S.scrollTop,lastAt:Math.max(0,...K.map(R=>R.at)),ids:new Set(K.map(R=>R.id))},P()},[e,n,u,f]),(0,Pe.jsxs)("section",{className:h.quickConversation,"data-dropdown":"conversation","data-no-drag":!0,role:"region","aria-label":d("recentConversation"),onKeyDown:S=>{S.key==="Escape"&&(S.stopPropagation(),l())},children:[(0,Pe.jsxs)("div",{className:h.conversationHeader,children:[(0,Pe.jsx)("strong",{children:d(u?"allRecords":"recentTenTurns")}),(0,Pe.jsxs)("div",{children:[(0,Pe.jsx)("button",{type:"button",onClick:()=>{u?(v.current=!0,_.current=null,b.current=null,m(0)):P(),p(S=>!S)},children:d(u?"collapseToTen":"showAllRecords")}),(0,Pe.jsx)(io.Button,{className:h.iconButton,"aria-label":d("close"),title:d("collapseConversation"),onClick:l,children:(0,Pe.jsx)(Ue,{name:"up"})})]})]}),u&&(0,Pe.jsxs)("p",{className:h.historyScope,children:[d("currentVoiceRecords"),n?.truncated?" \xB7 "+d("historyTruncated"):""]}),(0,Pe.jsxs)("div",{ref:y,className:h.recentMessages,"data-conversation-messages":!0,tabIndex:0,"aria-label":d("conversationMessages"),onWheel:S=>{S.deltaY<0&&(v.current=!1)},onScroll:()=>{let S=y.current;v.current=Ld(S),v.current&&m(0),b.current&&(b.current.top=S.scrollTop),P()},children:[u&&n?.nextCursor&&(0,Pe.jsx)("button",{className:h.loadHistory,disabled:t,onClick:()=>{P(),i?.(n.nextCursor)},children:d(t?"readingHistory":"loadEarlier")}),r&&(0,Pe.jsx)("button",{className:h.loadHistory,disabled:t,onClick:()=>{i?.(o??void 0)},children:d("retryHistory")}),T.map(S=>(0,Pe.jsxs)("div",{"data-message-id":S.id,"data-role":S.role,className:h.message,children:[(0,Pe.jsx)("div",{className:h.messageName,children:S.role==="user"?(0,Pe.jsx)("span",{children:d("you")}):(0,Pe.jsx)(kh,{name:s,save:c,t:d})}),(0,Pe.jsx)("p",{children:S.text}),["speech-failed","interrupted"].includes(S.state)&&(0,Pe.jsx)("small",{children:d(S.state==="speech-failed"?"speechFailed":"speechInterrupted")})]},S.id)),!T.length&&(0,Pe.jsx)("p",{className:h.hint,children:d(t||k?"readingHistory":"noConversation")})]}),f>0&&(0,Pe.jsxs)("button",{className:h.newMessages,onClick:E,children:[(0,Pe.jsx)(Ue,{name:"down"}),f," ",d("newMessages")]})]})}var Yn=require("react"),Zt=require("@deepseek-ai/dsh-client-ui-primitives"),pn=require("react/jsx-runtime");function dr({label:e,value:n,onChange:t,kind:r,pickPath:o,sessionId:i,disabled:s,active:c=!0,scope:l,className:d,placeholder:u}){let[p,f]=(0,Yn.useState)(!1),[m,y]=(0,Yn.useState)(null),v=typeof n=="string"?n.split(/[\\/]/).filter(Boolean).at(-1)??n:"",b=(0,Yn.useRef)(null),_=(0,Yn.useRef)(null),Z=()=>{b.current?.abort(),b.current=null,f(!1)};(0,Yn.useEffect)(()=>(Z(),y(null),Z),[i,s,c,l,n]);let K=async()=>{if(b.current||s||!c||!o)return;let O=new AbortController;b.current=O,f(!0),y(null);try{let N=await o(i,r,O.signal);b.current===O&&!O.signal.aborted&&!_.current?.closest("[hidden]")&&N!==null&&t(N)}catch(N){b.current===O&&!O.signal.aborted&&y(String(N?.message??N))}finally{b.current===O&&(b.current=null,f(!1))}};return(0,pn.jsxs)("div",{ref:_,className:d,"data-native-path":r,children:[(0,pn.jsxs)("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,minWidth:0},children:[(0,pn.jsxs)("label",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,minWidth:0},children:[e,(0,pn.jsx)(Zt.Input,{"aria-label":e,title:n??"",value:v,placeholder:u,disabled:s,readOnly:!0,style:{width:190,maxWidth:"100%",minWidth:0,textOverflow:"ellipsis"}})]}),(0,pn.jsx)(Zt.Button,{variant:"outline",disabled:s||!c||!o||p,onClick:()=>{K()},children:p?"\u7B49\u5F85\u9009\u62E9\u2026":r==="referenceAudio"||r==="campplus"?"\u9009\u62E9\u6587\u4EF6\u2026":"\u9009\u62E9\u6587\u4EF6\u5939\u2026"})]}),r==="campplus"&&n&&(0,pn.jsx)(Zt.Button,{variant:"outline",disabled:s,onClick:()=>{Z(),t("")},children:"\u6E05\u9664\u53EF\u9009\u6A21\u578B"}),p&&(0,pn.jsx)(Zt.Button,{variant:"outline",onClick:Z,children:"\u53D6\u6D88\u9009\u62E9"}),n&&(0,pn.jsxs)("details",{style:{fontSize:12,minWidth:0},children:[(0,pn.jsx)("summary",{children:"\u67E5\u770B\u5B8C\u6574\u8DEF\u5F84"}),(0,pn.jsx)("p",{style:{margin:"4px 0",overflowWrap:"anywhere"},children:n})]}),m&&(0,pn.jsx)("p",{role:"alert",children:m})]})}var Ct=require("react");var tn=require("react/jsx-runtime"),ur=e=>e&&typeof e=="object"?`${e.backend}:${e.id}`:e==null?"":"__legacy";function du({state:e,sessionId:n,run:t,t:r}){let o=(0,Ct.useRef)({state:e,sessionId:n,run:t}),i=(0,Ct.useRef)(void 0);o.current={state:e,sessionId:n,run:t},(0,Ct.useEffect)(()=>{!e.settings||e.settingsFor!==n||e.busy||e.audioDevicesPending||i.current===n||(i.current=n,t(n,"read-audio-devices"))},[n,e.settingsFor,e.busy,e.audioDevicesPending]),(0,Ct.useEffect)(()=>{let f=!1,m,y=async()=>{let v=o.current;!f&&v.sessionId===n&&!v.state.busy&&!document.hidden&&(v.state.settingsFor!==n&&await v.run(n,"read-settings"),f||await v.run(n,"read-audio-devices")),f||(m=document.defaultView.setTimeout(y,1e4))};return y(),()=>{f=!0,document.defaultView.clearTimeout(m)}},[n]);let s=!!(e.settings&&e.settingsFor===n),c=s?e.settings:null,l=c?.audioDevices??{input:c?.values?.device??null,output:null},d=e.audioDevicesFor===n?e.audioDevices:null,u=e.checkedFor===n&&!e.uncertain&&e.status?.enabled===!1&&e.status?.ownerSessionId===null&&e.status?.voiceControlBusy===!1&&e.status?.voiceSession?.fullyStopped===!0&&e.status?.voiceSession?.id==null,p=[];return(0,tn.jsxs)("section",{className:h.audioDevices,"aria-label":r("audioDevices"),"data-audio-device-controls":!0,"data-no-drag":!0,children:[(0,tn.jsx)("div",{className:h.audioDeviceGrid,children:["input","output"].map(f=>{let m=l[f],y=d?.[f],v=ur(m),b=y?.items?.some(N=>ur(N)===v),_=m&&typeof m=="object"&&y&&y.status!=="unavailable"&&!b,Z=m==null?r("audioSystemDefault"):typeof m=="object"?m.name:String(m),K=f==="output"&&y?.reason==="AUDIO_PLATFORM_UNSUPPORTED",O=!s||e.busy||e.uncertain||e.settingsConflict||K||f==="input"&&!u;return _&&p.push(r(f==="input"?"inputDeviceMissing":"outputDeviceMissing")),(0,tn.jsxs)("label",{className:h.audioDeviceField,children:[(0,tn.jsxs)("span",{children:[(0,tn.jsx)(Ue,{name:f==="input"?"mic":"volume"}),r(f==="input"?"audioInput":"audioOutput")]}),(0,tn.jsxs)("select",{"aria-label":r(f==="input"?"audioInput":"audioOutput"),"data-device-missing":_||void 0,title:O&&f==="input"&&!u?r("inputDeviceStopFirst"):K?r("outputDeviceUnsupported"):Z,disabled:O,value:v,onFocus:()=>{e.audioDevicesPending||t(n,"read-audio-devices")},onChange:N=>{let T=N.target.value;if(T==="__legacy"||T===v)return;let P=T===""?null:y?.items?.find(E=>ur(E)===T);P!==void 0&&t(n,"save-audio-device",{revision:c.revision,direction:f,selection:P})},children:[(0,tn.jsx)("option",{value:"",children:r("audioSystemDefault")}),m!=null&&!b&&(0,tn.jsxs)("option",{value:v,children:[Z,_?" \xB7 "+r("deviceDisconnected"):typeof m=="object"?"":" \xB7 "+r("deviceSaved")]}),y?.items?.map(N=>(0,tn.jsx)("option",{value:ur(N),children:N.name},ur(N)))]})]},f)})}),p.length>0?(0,tn.jsx)("p",{className:h.audioDeviceNotice,role:"status",children:p.join("\uFF1B")}):e.audioDevicesError||d?.input?.status==="unavailable"||d?.output?.status==="unavailable"&&d?.output?.reason!=="AUDIO_PLATFORM_UNSUPPORTED"?(0,tn.jsx)("p",{className:h.audioDeviceHint,role:"status",children:r("deviceListRetry")}):d?.output?.reason==="AUDIO_PLATFORM_UNSUPPORTED"?(0,tn.jsx)("p",{className:h.audioDeviceHint,children:r("outputDeviceUnsupported")}):!u&&s?(0,tn.jsx)("p",{className:h.audioDeviceHint,children:r("inputDeviceStopFirst")}):null]})}var Te=require("react"),mn=require("@deepseek-ai/dsh-client-ui-primitives");var oe=require("react/jsx-runtime"),Sh={busy:"\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F",archived:"\u4F1A\u8BDD\u5DF2\u5F52\u6863",unavailable:"\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528"},Pt=e=>e.title?.trim()||`\u672A\u547D\u540D\u4F1A\u8BDD \xB7 ${e.sessionId.slice(-6).toUpperCase()}`,so=e=>Sh[e.availability],Rn=e=>["ready","busy"].includes(e?.availability),ao=(e,n)=>e.checkedFor===n&&!e.uncertain&&!e.busy&&!e.ttsCancelling&&!e.existingSessionWritePending&&!e.existingSessionUnconfirmed&&e.status?.voiceControlBusy===!1&&e.status?.voiceSession?.fullyStopped===!0&&e.status?.enabled===!1;function uu({sessionId:e,boundSession:n,state:t,controlContext:r,listExistingVoiceSessions:o,setExistingVoiceSession:i,readState:s,run:c,t:l}){let[d,u]=(0,Te.useState)(),[p,f]=(0,Te.useState)(!1),[m,y]=(0,Te.useState)(!1),v=(0,Te.useRef)(null),b=(0,Te.useId)(),_=n?.sessionId??null,Z=e===_,K=C=>ao(C,e)&&Object.hasOwn(C.status,"existingVoiceSession")&&(C.status.existingVoiceSession?.sessionId??null)===_,O=()=>r.currentConversation()===e&&r.sourceFor(e)===e;(0,Te.useEffect)(()=>{let C=new AbortController;return v.current={signal:C.signal,choosing:!1},f(!1),o({sessionId:e},C.signal).then(R=>{C.signal.aborted||!O()||(u(R.items.find(z=>z.sessionId===e)??null),(R.binding?.sessionId??null)!==_&&c(e,"status"))}).catch(()=>{C.signal.aborted||u(null)}),()=>C.abort()},[e,_,r,o]);let N=async()=>{let C=v.current;if(!(!C||C.signal.aborted||C.choosing||!O())&&K(s())){C.choosing=!0,f(!0),y(!1);try{if(Z){await i({sessionId:null,expectedSessionId:_});return}let R=await o({sessionId:e},C.signal);if(C.signal.aborted||!O())return;let z=R.items.find(I=>I.sessionId===e),A=(R.binding?.sessionId??null)!==_;if(A||!Rn(z)){u(z??null),y(!0),A&&c(e,"status");return}if(!K(s()))return;await i({sessionId:e,expectedSessionId:_})}catch{C.signal.aborted||y(!0)}finally{C.choosing=!1,C.signal.aborted||f(!1)}}},T=Z?n:d,P=d===void 0&&!Z,E=Z||P||Rn(T);if(!E&&!m)return null;let k=l(Z?"backToFishVoice":"chooseCurrentDshTarget"),S=P?l("checkingVoiceTarget"):T?Pt(T):"";return(0,oe.jsxs)("div",{className:h.currentDshTarget,"data-whale-current-target":!0,"data-no-drag":!0,children:[E&&(0,oe.jsxs)(mn.Button,{variant:"outline",className:h.currentDshAction,"data-whale-operation":Z?"unbind-existing-session":"bind-current-session","aria-label":k,"aria-busy":p||P,"aria-describedby":b,disabled:!K(t)||p||P,onClick:()=>{N()},children:[(0,oe.jsx)("span",{children:k}),(0,oe.jsx)("span",{id:b,className:h.ellipsis,title:S,children:S})]}),m&&(0,oe.jsx)("p",{role:"alert",className:h.hint,children:l("currentDshTargetError")})]})}function Ii({state:e,sessionId:n,listExistingVoiceSessions:t,setExistingVoiceSession:r,openExistingVoiceSession:o,showHome:i,homePickerId:s,closeHomePicker:c,t:l}){let[d,u]=(0,Te.useState)(null),[p,f]=(0,Te.useState)(!1),[m,y]=(0,Te.useState)(""),[v,b]=(0,Te.useState)(null),[_,Z]=(0,Te.useState)(!1),[K,O]=(0,Te.useState)(!1),[N,T]=(0,Te.useState)(null),P=(0,Te.useRef)(null),E=(0,Te.useRef)(!1),k=(0,Te.useId)(),S=!!s,C=S||p,R=e.status,z=Object.hasOwn(R??{},"existingVoiceSession")?R.existingVoiceSession:d?.binding,A=R?.existingVoiceSessionSupported!==!1,I=ao(e,n),V=e.existingSessionWritePending,B=d?.items.find(ne=>ne.sessionId===v),F=I&&!_&&!!z,X=I&&A&&!_&&!K&&!!d,ue=(0,Te.useCallback)(async(ne="",pe)=>{P.current?.abort();let ge=new AbortController;P.current=ge,Z(!0),O(!1);try{let Ie=await t({...ne?{query:ne}:{},...pe?{cursor:pe}:{}},ge.signal);if(ge.signal.aborted)return;u(Le=>({...Ie,query:ne,items:pe&&Le?[...new Map([...Le.items,...Ie.items].map(Ge=>[Ge.sessionId,Ge])).values()]:Ie.items}))}catch{ge.signal.aborted||O(!0)}finally{P.current===ge&&(P.current=null,Z(!1))}},[t]);(0,Te.useEffect)(()=>(E.current=!0,A?ue():Z(!1),()=>{E.current=!1,P.current?.abort(),P.current=null}),[ue,A]);let de=ne=>{ne.preventDefault(),b(null),T(null),ue(m.trim())},Q=async ne=>{if(!(!(ne===null?F:X)||ne===(z?.sessionId??null))){T(null);try{let{binding:pe}=await r({sessionId:ne,expectedSessionId:z?.sessionId??null});if(!E.current)return;if(S){c();return}u(ge=>ge&&{...ge,binding:pe}),f(!1),b(null),y(""),T({text:pe?"\u5DF2\u7ED1\u5B9A\u3002\u70B9\u51FB\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u540E\u5373\u53EF\u7EE7\u7EED\u8BE5\u4F1A\u8BDD\u3002":"\u5DF2\u89E3\u9664\uFF0C\u4E0B\u4E00\u6B21\u5F00\u59CB\u5BF9\u8BDD\u5C06\u4F7F\u7528\u9C7C\u5E94\u4F1A\u8BDD\u3002"}),A&&ue()}catch(pe){if(!E.current)return;T({error:!0,text:typeof pe?.message=="string"&&pe.message?pe.message.split(`
`)[0].slice(0,160):"\u4F1A\u8BDD\u7ED1\u5B9A\u672A\u786E\u8BA4\uFF0C\u8BF7\u6838\u5BF9\u5F53\u524D\u7ED1\u5B9A\u3002"}),b(null),A&&ue(C?m.trim():"")}}},q=(0,oe.jsxs)(oe.Fragment,{children:[_&&(0,oe.jsx)("p",{role:"status",className:h.hint,children:l("loadingVoiceTargets")}),K&&(0,oe.jsxs)("div",{role:"alert",className:h.notice,children:[l("voiceTargetListError")," ",(0,oe.jsx)(mn.Button,{variant:"outline",disabled:V,onClick:()=>{ue(m.trim())},children:l("retryVoiceTargets")})]})]}),W=N&&(0,oe.jsx)("p",{role:N.error?"alert":"status",className:N.error?h.notice:h.hint,children:N.text});return(0,oe.jsxs)("section",{id:s,className:S?h.homeTargetPicker:h.section,"data-whale-existing-session":!0,"aria-label":S?l("chooseVoiceTarget"):void 0,"data-no-drag":S||void 0,children:[!S&&(0,oe.jsxs)(oe.Fragment,{children:[(0,oe.jsx)("h3",{children:"\u8BED\u97F3\u5BF9\u8BDD\u76EE\u6807"}),(0,oe.jsxs)("div",{className:h.existingSessionTarget,children:[(0,oe.jsx)("strong",{className:h.sessionTitle,children:z?Pt(z):"\u9C7C\u5E94\u4F1A\u8BDD"}),(0,oe.jsx)("p",{className:h.hint,children:z?"\u8BED\u97F3\u548C\u56DE\u7B54\u5199\u5165\u6B64\u4F1A\u8BDD\uFF0C\u9C7C\u5E94\u4EC5\u5728\u672C\u673A\u64AD\u62A5\u3002\u5176\u4ED6\u63D2\u4EF6\u7684\u8F6C\u53D1\u7531\u5176\u8BBE\u7F6E\u51B3\u5B9A\u3002":"\u53EF\u7ED1\u5B9A\u5DF2\u6709 DSH \u4F1A\u8BDD\uFF0C\u6CBF\u7528\u539F\u6765\u7684\u4E0A\u4E0B\u6587\u548C\u5386\u53F2\u3002"}),z&&so(z)&&(0,oe.jsxs)("p",{role:"status",className:h.notice,children:[so(z),"\u3002\u53EF\u89E3\u9664\u7ED1\u5B9A\u6216\u9009\u62E9\u5176\u4ED6\u4F1A\u8BDD\u3002"]}),!A&&(0,oe.jsx)("p",{role:"status",className:h.notice,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u4E0D\u652F\u6301\u7ED1\u5B9A\u5DF2\u6709\u4F1A\u8BDD\u3002"}),R?.enabled&&(0,oe.jsx)("p",{className:h.hint,children:"\u7ED3\u675F\u8BED\u97F3\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u7ED1\u5B9A\u3002"})]}),(0,oe.jsxs)("div",{className:h.actions,children:[(0,oe.jsx)(mn.Button,{variant:"outline","aria-expanded":C,disabled:!A||V,onClick:()=>{f(!C),b(null),y(""),C||ue()},children:C?"\u5173\u95ED\u4F1A\u8BDD\u5217\u8868":z?"\u66F4\u6362\u7ED1\u5B9A":"\u9009\u62E9\u5DF2\u6709\u4F1A\u8BDD"}),Rn(z)&&o&&(0,oe.jsx)(mn.Button,{variant:"outline","data-whale-operation":"open-native-session",onClick:async()=>{T(null);try{await o(z.sessionId),await i?.()}catch{E.current&&T({error:!0,text:"DSH \u6682\u65F6\u65E0\u6CD5\u6253\u5F00\u539F\u4F1A\u8BDD\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"})}},children:"\u6253\u5F00\u539F\u4F1A\u8BDD"}),z&&(0,oe.jsx)(mn.Button,{variant:"outline","data-whale-operation":"unbind-existing-session",disabled:!F,onClick:()=>{Q(null)},children:"\u89E3\u9664\u7ED1\u5B9A"})]})]}),C&&(0,oe.jsxs)("div",{className:h.existingSessionPicker,"aria-busy":_,children:[(0,oe.jsxs)("form",{className:h.existingSessionSearch,onSubmit:de,children:[(0,oe.jsx)(mn.Input,{type:"search","aria-label":l("searchVoiceTargets"),placeholder:l("searchVoiceTargets"),value:m,maxLength:128,disabled:V,onChange:ne=>y(ne.target.value)}),(0,oe.jsx)(mn.Button,{type:"submit",variant:"outline",disabled:V,children:l("searchVoiceTargetsAction")})]}),d?.items.length>0&&(0,oe.jsx)("ul",{className:h.existingSessionList,"aria-label":l("existingVoiceTargetList"),children:d.items.map(ne=>{let pe=z?.sessionId===ne.sessionId,ge=pe||!Rn(ne),Ie=(0,oe.jsxs)("span",{className:h.hint,children:[pe?l("boundVoiceTarget")+" \xB7 ":"",l("voiceTargetAvailability_"+(ne.unavailableReason??ne.availability))," \xB7 ",ne.sessionId]});return(0,oe.jsx)("li",{children:S?(0,oe.jsxs)(mn.Button,{variant:"ghost",className:h.homeTargetRow,"data-whale-operation":"bind-existing-session",title:ne.sessionId,"aria-current":pe||void 0,"aria-disabled":!X,disabled:ge,onClick:()=>{Q(ne.sessionId)},children:[(0,oe.jsx)("strong",{className:h.sessionTitle,children:Pt(ne)}),Ie]}):(0,oe.jsxs)("label",{title:ne.sessionId,children:[(0,oe.jsx)("input",{type:"radio",name:k,value:ne.sessionId,checked:v===ne.sessionId,disabled:ge||_||V,onChange:()=>{b(ne.sessionId),T(null)}}),(0,oe.jsxs)("span",{children:[(0,oe.jsx)("strong",{className:h.sessionTitle,children:Pt(ne)}),Ie]})]})},ne.sessionId)})}),q,!_&&!K&&d?.items.length===0&&(0,oe.jsx)("p",{role:"status",className:h.hint,children:l(d.query?"voiceTargetNoMatch":"voiceTargetEmptyList")}),B&&(0,oe.jsx)("p",{id:k+"-tts",className:h.hint,children:l("voiceTargetSynthesisNotice")}),W,(!S||d?.nextCursor||z)&&(0,oe.jsxs)("div",{className:h.actions,children:[!S&&(0,oe.jsx)(mn.Button,{variant:"primary","data-whale-operation":"bind-existing-session","aria-describedby":B?k+"-tts":void 0,disabled:!X||!Rn(B)||B.sessionId===z?.sessionId,onClick:()=>{Q(v)},children:l(V?"savingVoiceTarget":"bindVoiceTarget")}),!!d?.nextCursor&&(0,oe.jsx)(mn.Button,{variant:"outline",disabled:_||V,onClick:()=>{ue(d.query,d.nextCursor)},children:l("moreVoiceTargets")}),S&&z&&(0,oe.jsx)(mn.Button,{variant:"outline","data-whale-operation":"unbind-existing-session",disabled:!F,onClick:()=>{Q(null)},children:l("backToFishVoice")})]})]}),!C&&(0,oe.jsxs)(oe.Fragment,{children:[q,W]})]})}var At=require("react"),Nt=require("@deepseek-ai/dsh-client-ui-primitives");var co="dsh-fish-voice";var Gi={name:"Emikosama",url:"https://github.com/Emikosama"};var pu="https://github.com/Emikosama/dsh-fish-voice",pr={url:"https://github.com/Emikosama/dsh-fish-voice/issues"};var we=require("react/jsx-runtime");function mu(e,n){let t=e.updates;return e.updatePending==="install"?n("update_installing"):e.updatePending==="check"?n("update_checking"):e.updatesUnavailable?n("updateConnection"):t?t.message||n("update_"+t.status):n("update_idle")}function fu({state:e,open:n,t}){let r=e.updates,o=!e.updatesUnavailable&&(r?.release||["restart-required","enable-required","installed"].includes(r?.status));return(0,we.jsxs)("section",{className:h.section,"data-whale-update-settings":!0,children:[(0,we.jsx)("h3",{children:t("updateTitle")}),r&&(0,we.jsxs)("p",{className:h.hint,children:[t("updateCurrentVersion")," ",r.currentVersion," \xB7 ",t("updateChannel_"+r.channel)]}),(0,we.jsx)("p",{children:mu(e,t)}),(0,we.jsxs)("div",{className:h.actions,children:[o&&(0,we.jsx)(Nt.Button,{variant:"outline",onClick:()=>n(!1),children:t("updateDetails")}),(0,we.jsx)(Nt.Button,{variant:"outline",disabled:!!e.updatePending||!e.updatesUnavailable&&r?.status==="installing",onClick:()=>n(!0),children:t("updateCheck")}),(0,we.jsx)("a",{href:pr.url,"data-whale-operation":"open-feedback",target:"_blank",rel:"noreferrer noopener",children:t("updateFeedback")})]})]})}function hu({state:e,close:n,run:t,t:r}){let o=(0,At.useRef)(null),i=(0,At.useId)();(0,At.useLayoutEffect)(()=>{let m=o.current;return typeof m.showModal=="function"?m.showModal():m.setAttribute("open",""),()=>{m.open&&m.close?.()}},[]);let s=e.updates,c=s?.release,l=!!e.updatePending||!e.updatesUnavailable&&["checking","installing"].includes(s?.status),d=!e.updatesUnavailable&&!l&&s?.canInstall&&c,u=!l&&(e.updatesUnavailable||!["restart-required","enable-required"].includes(s?.status)),p=!e.updatesUnavailable&&["available","incompatible"].includes(s?.status),f=d&&!s.message?null:mu(e,r);return(0,we.jsxs)("dialog",{ref:o,className:h.updateDialog,"data-whale-update-dialog":!0,"data-no-drag":!0,"aria-labelledby":i,onCancel:m=>{m.preventDefault(),n()},onKeyDown:m=>m.stopPropagation(),children:[(0,we.jsxs)("header",{className:h.updateHeader,children:[(0,we.jsx)(Xn,{}),(0,we.jsx)("h2",{id:i,children:r(p?"updateOfferTitle":"updateTitle")})]}),s&&(0,we.jsxs)("p",{className:h.hint,children:[r("updateCurrentVersion")," ",s.currentVersion,c&&c.version!==s.currentVersion&&(0,we.jsxs)(we.Fragment,{children:[" \xB7 ",r("updateNewVersion")," ",c.version]})," \xB7 ",r("updateChannel_"+s.channel)]}),c?.announcement&&(0,we.jsx)("p",{className:h.updateAnnouncement,children:c.announcement}),f&&(0,we.jsx)("p",{className:h.hint,role:"status",children:f}),(0,we.jsxs)("div",{className:h.actions,children:[(0,we.jsx)(Nt.Button,{variant:"outline",onClick:n,children:r(p?"updateLater":"close")}),d&&(0,we.jsx)(Nt.Button,{variant:"primary",className:h.primary,onClick:()=>{t({action:"install",version:c.version})},children:r("updateInstall")}),!d&&u&&(0,we.jsx)(Nt.Button,{variant:"outline",onClick:()=>{t({action:"check"})},children:r("updateCheck")})]}),(0,we.jsxs)("footer",{className:h.actions,children:[c?.url?.startsWith("https://")&&(0,we.jsx)("a",{href:c.url,target:"_blank",rel:"noreferrer noopener",children:r("updateRelease")}),(0,we.jsx)("a",{href:pr.url,"data-whale-operation":"open-feedback",target:"_blank",rel:"noreferrer noopener",children:r("updateFeedback")})]})]})}var zh=new Map([["audio","settings-audio"],["interaction","settings-interaction"],["prompt","settings-prompt"],["models","settings-models"],["advanced","settings-advanced"],["pets","settings-pets"],["sessions","page-session-management"]]);function Zh(e){if(e.nativeEvent?.isTrusted!==!0)return null;let n=e.target;if(!n?.closest)return null;let t=n.closest("[data-whale-operation-log]");return t&&!(e.type==="click"&&n.closest("summary")?.parentElement===t)?null:n}function gu(e){let n=Zh(e);if(!n)return null;if(e.type==="submit")return"commit-form";if(e.type==="keydown")return e.key==="Escape"?"dismiss":["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key)&&n.closest('[data-settings-nav], [role="listbox"]')?"keyboard-navigation":null;if(e.type==="change")return n.matches('input[type="radio"]')&&["listen-mode-ptt","listen-mode-always","listen-mode-wake"].includes(n.dataset.whaleOperation)?n.dataset.whaleOperation:n.closest("[data-audio-device-controls] select")?"change-audio-device":n.matches('select, input[type="radio"], input[type="checkbox"]')?"edit-choice":null;if(e.type!=="click")return null;let t=n.closest("button, a[href], summary");if(!t||t.type==="submit"&&t.form)return null;let r=t.dataset.whaleOperation;return r==="open-feedback"&&t.matches("summary")&&t.parentElement.open?"dismiss":t.matches("summary")&&["session-history","subagent-history"].includes(r)?r+(t.parentElement.open?"-close":"-open"):r||(t.hasAttribute("data-settings-tab")?zh.get(t.dataset.settingsTab)??"page-settings-tab":t.closest("[data-whale-session-management], [data-whale-existing-session]")?"manage-session":t.closest("[data-settings-page-heading] nav")?"page-model-tab":t.matches("summary")?"details-toggle":"activate-control")}var Mn=require("react"),Ki=require("@deepseek-ai/dsh-client-ui-primitives");var Ye=require("react/jsx-runtime"),Ch="fish-voice-operation-log.log",bu=256*1024,Ph=(e,n)=>(e+n).slice(-bu);function vu({readOperationLog:e}){let[n,t]=(0,Mn.useState)(!1),[r,o]=(0,Mn.useState)(!1),[i,s]=(0,Mn.useState)(null),[c,l]=(0,Mn.useState)(null),d=(0,Mn.useRef)(null);if((0,Mn.useEffect)(()=>()=>d.current?.abort(),[]),!e)return null;let u=async f=>{if(d.current)return;let m=new AbortController;d.current=m,o(!0),l(null);try{let y=await e(m.signal);if(m.signal.aborted)return;if(f){let v=URL.createObjectURL(new Blob(y,{type:"text/plain;charset=utf-8"})),b=document.createElement("a");b.href=v,b.download=Ch,Nh(b),setTimeout(()=>URL.revokeObjectURL(v),1e3),l("\u5DF2\u8BF7\u6C42\u4FDD\u5B58\u8BCA\u65AD\u65E5\u5FD7\u3002")}else s({text:y.reduce(Ph,""),shortened:y.reduce((v,b)=>v+b.length,0)>bu})}catch{m.signal.aborted||l("\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u8BCA\u65AD\u65E5\u5FD7\uFF0C\u8BF7\u91CD\u8BD5\u3002")}finally{d.current===m&&(d.current=null),m.signal.aborted||o(!1)}},p=f=>{let m=f.currentTarget.open;t(m),m||(d.current?.abort(),d.current=null,o(!1),s(null),l(null))};return(0,Ye.jsxs)("details",{className:h.section,"data-whale-operation-log":!0,open:n,onToggle:p,children:[(0,Ye.jsx)("summary",{"data-whale-operation":"open-feedback",children:"\u6392\u67E5\u4E0E\u53CD\u9988"}),n&&(0,Ye.jsxs)(Ye.Fragment,{children:[(0,Ye.jsx)("p",{className:h.hint,children:"\u6700\u8FD1\u4E03\u5929\u7684\u64CD\u4F5C\u65E5\u5FD7\u3002\u53EF\u5148\u67E5\u770B\uFF0C\u518D\u81EA\u884C\u51B3\u5B9A\u662F\u5426\u968F\u53CD\u9988\u63D0\u4EA4\u3002"}),(0,Ye.jsxs)("div",{className:h.actions,children:[(0,Ye.jsx)(Ki.Button,{variant:"outline",disabled:r,onClick:()=>{u(!1)},children:"\u67E5\u770B\u8BCA\u65AD\u65E5\u5FD7"}),(0,Ye.jsx)(Ki.Button,{variant:"outline",disabled:r,onClick:()=>{u(!0)},children:"\u4FDD\u5B58\u8BCA\u65AD\u65E5\u5FD7"}),(0,Ye.jsx)("a",{href:pr.url+"/new",target:"_blank",rel:"noreferrer noopener",children:"\u63D0\u4EA4\u53CD\u9988"})]}),r&&(0,Ye.jsx)("p",{role:"status",className:h.hint,children:"\u6B63\u5728\u8BFB\u53D6\u8BCA\u65AD\u65E5\u5FD7\u2026"}),c&&(0,Ye.jsx)("p",{role:"status",className:h.hint,children:c}),i?.shortened&&(0,Ye.jsx)("p",{className:h.hint,children:"\u8FD9\u91CC\u53EA\u663E\u793A\u6700\u8FD1\u4E00\u6BB5\uFF0C\u4FDD\u5B58\u53EF\u53D6\u5F97\u5B8C\u6574\u65E5\u5FD7\u3002"}),i&&(0,Ye.jsx)("pre",{className:h.requestDetails,tabIndex:0,"aria-label":"\u64CD\u4F5C\u65E5\u5FD7\u9884\u89C8",children:i.text||"\u6682\u65E0\u64CD\u4F5C\u65E5\u5FD7\u3002"})]})]})}function Nh(e){document.body.append(e);try{e.click()}finally{e.remove()}}var $=require("react"),j=require("@deepseek-ai/dsh-client-ui-primitives");var he=require("react"),me=require("@deepseek-ai/dsh-client-ui-primitives");var D={switchRow:"_8Hzlra_switchRow",jobs:"_8Hzlra_jobs",hint:"_8Hzlra_hint",modelChoices:"_8Hzlra_modelChoices",wizard:"_8Hzlra_wizard",choice:"_8Hzlra_choice",note:"_8Hzlra_note",wizardBodyContent:"_8Hzlra_wizardBodyContent",section:"_8Hzlra_section",header:"_8Hzlra_header",job:"_8Hzlra_job",field:"_8Hzlra_field",setupEnter:"_8Hzlra_setupEnter",wizardBody:"_8Hzlra_wizardBody",fullName:"_8Hzlra_fullName",inlineField:"_8Hzlra_inlineField",consentActions:"_8Hzlra_consentActions",badge:"_8Hzlra_badge",installPath:"_8Hzlra_installPath",details:"_8Hzlra_details",plan:"_8Hzlra_plan",actions:"_8Hzlra_actions",modelInstaller:"_8Hzlra_modelInstaller",sourceChoices:"_8Hzlra_sourceChoices",choices:"_8Hzlra_choices",switcher:"_8Hzlra_switcher",selectedModel:"_8Hzlra_selectedModel",currentModel:"_8Hzlra_currentModel",jobHeading:"_8Hzlra_jobHeading",primary:"_8Hzlra_primary",hardwareSummary:"_8Hzlra_hardwareSummary",installHistory:"_8Hzlra_installHistory",text:`._8Hzlra_section {
  min-width: 0;
  color: var(--dsw-alias-label-primary);
  gap: 8px;
  display: grid;
}

._8Hzlra_section h3, ._8Hzlra_wizard h2, ._8Hzlra_plan h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
}

._8Hzlra_section p, ._8Hzlra_wizard p {
  margin: 0;
  line-height: 1.6;
}

._8Hzlra_hint, ._8Hzlra_section small, ._8Hzlra_wizard small {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 1.6;
}

._8Hzlra_note {
  border-left: 2px solid var(--dsw-alias-state-warn-primary);
  background: var(--dsw-alias-bg-layer-2);
  padding: 8px 12px;
  font-size: 12px;
}

._8Hzlra_actions, ._8Hzlra_header {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  display: flex;
}

._8Hzlra_header {
  justify-content: space-between;
  align-items: flex-start;
}

._8Hzlra_choices {
  border: 0;
  gap: 8px;
  min-width: 0;
  margin: 0;
  padding: 0;
  display: grid;
}

._8Hzlra_choices legend {
  color: var(--dsw-alias-label-secondary);
  padding: 0 0 8px;
  font-size: 12px;
}

._8Hzlra_choice {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  cursor: pointer;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 10px;
  display: flex;
}

._8Hzlra_choice[data-selected="true"] {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,var(--dsw-alias-bg-layer-1));
}

._8Hzlra_choice input {
  accent-color: var(--dsw-alias-brand-primary);
  margin: 4px 0 0;
}

._8Hzlra_choice span {
  min-width: 0;
}

._8Hzlra_choice small, ._8Hzlra_plan small {
  overflow-wrap: anywhere;
  display: block;
}

._8Hzlra_choice strong {
  font-size: 13px;
}

._8Hzlra_field {
  gap: 6px;
  font-size: 12px;
  display: grid;
}

._8Hzlra_field input, ._8Hzlra_field select {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}

._8Hzlra_field select {
  font: inherit;
  color: inherit;
  background: var(--dsw-alias-bg-layer-2);
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  padding: 8px;
}

._8Hzlra_details {
  border-top: 1px solid var(--dsw-alias-border-l2);
  min-width: 0;
  padding-top: 12px;
}

._8Hzlra_details summary {
  cursor: pointer;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

._8Hzlra_details[open] > summary {
  margin-bottom: 12px;
}

._8Hzlra_badge {
  border-radius: var(--dsw-radius-sm);
  color: var(--dsw-alias-label-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,var(--dsw-alias-bg-layer-1));
  margin-left: 8px;
  padding: 2px 6px;
  font-size: 11px;
}

._8Hzlra_plan, ._8Hzlra_job {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  gap: 10px;
  min-width: 0;
  padding: 12px;
  display: grid;
}

._8Hzlra_plan dl {
  grid-template-columns: auto minmax(0, 1fr);
  gap: 6px 12px;
  margin: 0;
  font-size: 12px;
  display: grid;
}

._8Hzlra_plan dt {
  color: var(--dsw-alias-label-secondary);
}

._8Hzlra_plan dd {
  overflow-wrap: anywhere;
  margin: 0;
}

._8Hzlra_plan a {
  color: var(--dsw-alias-link);
  overflow-wrap: anywhere;
  font-size: 12px;
}

._8Hzlra_plan ul {
  margin: 0;
  padding-left: 16px;
  font-size: 12px;
}

._8Hzlra_jobs {
  gap: 12px;
  display: grid;
}

._8Hzlra_job progress {
  width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
}

._8Hzlra_wizard {
  box-sizing: border-box;
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-layer-1);
  border-radius: var(--dsw-radius-lg);
}

._8Hzlra_section button, ._8Hzlra_wizard button {
  transition: transform var(--ds-transition-duration-fast, .1s) var(--whale-ease, ease-out);
}

._8Hzlra_section button:active:not(:disabled), ._8Hzlra_wizard button:active:not(:disabled) {
  transform: scale(.97);
}

._8Hzlra_section :is(button, input, select, a, summary):focus-visible, ._8Hzlra_wizard :is(button, summary):focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

[data-motion="firm"] ._8Hzlra_wizard {
  --whale-duration: var(--ds-transition-duration-fast, .1s);
  --whale-ease: ease-out;
}

[data-motion="off"] ._8Hzlra_wizard, [data-motion="off"] ._8Hzlra_wizard *, [data-motion="off"] ._8Hzlra_section * {
  transition: none !important;
  animation: none !important;
  transform: none !important;
}

@keyframes _8Hzlra_setupEnter {
  from {
    translate: 0 4px;
  }

  to {
    translate: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  ._8Hzlra_wizard, ._8Hzlra_wizard *, ._8Hzlra_section * {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
}

@media (width <= 520px) {
  ._8Hzlra_wizard {
    padding: 12px;
  }

  ._8Hzlra_plan dl {
    grid-template-columns: minmax(0, 1fr);
    gap: 3px;
  }

  ._8Hzlra_plan dd {
    margin-bottom: 6px;
  }
}

@media (forced-colors: active) {
  ._8Hzlra_choice[data-selected="true"] {
    outline: 2px solid highlight;
  }
}

._8Hzlra_wizard {
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

._8Hzlra_wizard > ._8Hzlra_header, ._8Hzlra_wizard > footer {
  flex-shrink: 0;
}

._8Hzlra_wizardBody {
  overscroll-behavior: contain;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

._8Hzlra_wizardBodyContent {
  align-content: start;
  gap: 12px;
  display: grid;
}

._8Hzlra_primary {
  color: var(--dsw-alias-label-primary) !important;
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 16%,var(--dsw-alias-bg-layer-2)) !important;
  border: 1px solid var(--dsw-alias-border-l2) !important;
}

._8Hzlra_primary:disabled {
  opacity: .5;
}

._8Hzlra_choices {
  gap: 6px;
}

._8Hzlra_choice {
  box-sizing: border-box;
  align-items: center;
  min-height: 38px;
}

._8Hzlra_choice input {
  flex: none;
  margin: 0;
}

._8Hzlra_choice strong {
  display: block;
}

._8Hzlra_choice:has(input:disabled) {
  cursor: default;
  opacity: .65;
}

._8Hzlra_note p {
  margin: 0;
}

._8Hzlra_note button {
  margin-top: 8px;
}

._8Hzlra_wizard > footer {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

._8Hzlra_wizardBody {
  padding: 2px 4px 8px 0;
}

._8Hzlra_section > button, ._8Hzlra_wizardBody > button {
  justify-self: start;
  max-width: 100%;
}

._8Hzlra_section button, ._8Hzlra_wizard button {
  white-space: normal;
  max-width: 100%;
  height: auto;
  min-height: 36px;
}

._8Hzlra_actions > button {
  flex: 0 auto;
}

._8Hzlra_sourceChoices {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

._8Hzlra_sourceChoices legend {
  grid-column: 1 / -1;
}

._8Hzlra_inlineField {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-width: 0;
  font-size: 12px;
  display: flex;
}

._8Hzlra_inlineField select {
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

._8Hzlra_inlineField input[type="number"] {
  width: 80px;
  min-width: 0;
}

._8Hzlra_field:has( > input[type="number"]) {
  flex-wrap: wrap;
  align-items: center;
  display: flex;
}

._8Hzlra_field > input[type="number"] {
  width: 80px;
}

._8Hzlra_details > summary {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  box-sizing: content-box;
  width: fit-content;
  max-width: 100%;
  min-height: 20px;
  padding: 7px 10px;
}

._8Hzlra_fullName {
  min-width: 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

._8Hzlra_fullName summary {
  cursor: pointer;
}

._8Hzlra_fullName p {
  overflow-wrap: anywhere;
}

._8Hzlra_consentActions {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  display: flex;
}

@container (width <= 360px) {
  ._8Hzlra_sourceChoices {
    grid-template-columns: minmax(0, 1fr);
  }

  ._8Hzlra_inlineField select {
    width: 150px;
  }
}

@media (width <= 420px) {
  ._8Hzlra_wizard ._8Hzlra_sourceChoices {
    grid-template-columns: minmax(0, 1fr);
  }
}

._8Hzlra_modelChoices {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

._8Hzlra_modelChoices > legend {
  grid-column: 1 / -1;
  padding-bottom: 5px;
}

._8Hzlra_modelChoices ._8Hzlra_choice {
  gap: 7px;
  min-height: 80px;
  padding: 8px;
}

._8Hzlra_modelChoices ._8Hzlra_choice strong {
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  display: flex;
}

._8Hzlra_modelChoices ._8Hzlra_badge {
  white-space: nowrap;
  margin-left: 0;
}

._8Hzlra_hardwareSummary {
  color: var(--dsw-alias-label-secondary);
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 2px 10px;
  font-size: 11px;
  display: flex;
}

._8Hzlra_hardwareSummary small {
  font-size: 10px;
}

._8Hzlra_currentModel, ._8Hzlra_switchRow, ._8Hzlra_jobHeading {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

._8Hzlra_currentModel {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  padding: 7px 8px;
  font-size: 12px;
}

._8Hzlra_currentModel > span, ._8Hzlra_switchRow > span {
  overflow-wrap: anywhere;
  min-width: 0;
}

._8Hzlra_currentModel button, ._8Hzlra_switchRow button {
  flex: none;
  min-height: 30px;
  padding: 0 9px;
}

._8Hzlra_switcher {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  gap: 7px;
  padding: 8px;
  display: grid;
}

._8Hzlra_switchRow small {
  display: block;
}

._8Hzlra_selectedModel {
  border-top: 1px solid var(--dsw-alias-border-l2);
  gap: 7px;
  padding-top: 6px;
  display: grid;
}

._8Hzlra_selectedModel ._8Hzlra_details {
  padding-top: 4px;
}

._8Hzlra_selectedModel ._8Hzlra_details summary {
  border: 0;
  padding: 3px 0;
}

._8Hzlra_installHistory {
  border-top: 1px solid var(--dsw-alias-border-l2);
}

._8Hzlra_installHistory > summary {
  cursor: pointer;
  padding: 8px 0;
  font-size: 12px;
  display: list-item;
}

._8Hzlra_installHistory > summary small {
  margin-left: 12px;
}

._8Hzlra_installHistory ._8Hzlra_job {
  gap: 6px;
  padding: 9px;
}

._8Hzlra_jobHeading {
  flex-wrap: wrap;
}

._8Hzlra_installPath {
  min-width: 0;
  font-size: 11px;
}

._8Hzlra_installPath summary {
  cursor: pointer;
  color: var(--dsw-alias-label-secondary);
}

._8Hzlra_installPath p {
  overflow-wrap: anywhere;
}

._8Hzlra_modelInstaller ._8Hzlra_jobs:empty {
  display: none;
}

@container (width <= 300px) {
  ._8Hzlra_modelChoices {
    grid-template-columns: minmax(0, 1fr);
  }

  ._8Hzlra_currentModel {
    flex-wrap: wrap;
  }
}

._8Hzlra_section[aria-label="\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84"] p {
  overflow-wrap: anywhere;
}

._8Hzlra_choice {
  transition: background-color .12s ease-out, border-color .12s ease-out, box-shadow .12s ease-out;
}

._8Hzlra_choice:hover:has(input:not(:disabled)) {
  border-color: var(--dsw-alias-brand-primary);
}

._8Hzlra_choice:has(input:focus-visible) {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: 2px;
}

._8Hzlra_section :is(button, select, input, summary), ._8Hzlra_wizard :is(button, select, input, summary) {
  transition: background-color .12s ease-out,border-color .12s ease-out,color .12s ease-out,transform var(--whale-duration, .2s) var(--whale-ease, ease-out);
}

._8Hzlra_section button:hover:not(:disabled), ._8Hzlra_wizard button:hover:not(:disabled) {
  background-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,var(--dsw-alias-bg-layer-1));
}

._8Hzlra_plan, ._8Hzlra_switcher, ._8Hzlra_selectedModel, ._8Hzlra_section [data-whale-save-result], ._8Hzlra_wizardBodyContent > section {
  animation: _8Hzlra_setupEnter var(--whale-duration, .2s) ease-out;
}

[data-motion="firm"] :is(._8Hzlra_section, ._8Hzlra_wizard) {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="off"] :is(._8Hzlra_section, ._8Hzlra_wizard), [data-motion="off"] :is(._8Hzlra_section, ._8Hzlra_wizard) *, [data-motion="off"] :is(._8Hzlra_section, ._8Hzlra_wizard) :before {
  transition: none !important;
  animation: none !important;
}

[data-motion="off"] :is(._8Hzlra_section, ._8Hzlra_wizard) button:active {
  transform: none !important;
}

@media (prefers-reduced-motion: reduce) {
  ._8Hzlra_section, ._8Hzlra_wizard, ._8Hzlra_section *, ._8Hzlra_wizard *, ._8Hzlra_section :before, ._8Hzlra_wizard :before {
    transition: none !important;
    animation: none !important;
  }

  ._8Hzlra_section button:active, ._8Hzlra_wizard button:active {
    transform: none !important;
  }
}
`};var g=require("react/jsx-runtime"),yu=[["edge","Edge \u5728\u7EBF\u6717\u8BFB","\u9ED8\u8BA4\u6653\u4F0A \xB7 \u8FDE\u4E0D\u4E0A\u65F6\u663E\u793A\u6587\u5B57"],["local","\u672C\u5730\u8BED\u97F3\u6A21\u578B","\u5728\u672C\u673A\u5408\u6210\uFF0C\u9996\u6B21\u9700\u8981\u4E0B\u8F7D"],["off","\u4E0D\u53D1\u58F0","\u53EA\u663E\u793A\u6587\u5B57"]],xu=[yu[0],["deepseek","DeepSeek \u8BED\u97F3\u5408\u6210","\u4F7F\u7528 DeepSeek \u5F00\u653E\u5E73\u53F0\u7684 API Key"],...yu.slice(1)],_u={edge:"Edge \u5728\u7EBF\u6717\u8BFB",deepseek:"DeepSeek \u8BED\u97F3\u5408\u6210",local:"\u672C\u5730\u8BED\u97F3\u6A21\u578B"},$i={provider:"unconfigured",edgeVoice:"zh-CN-XiaoyiNeural",deepseekVoice:"stella",deepseekTextTransmissionAccepted:!1,systemVoice:null,systemFallback:!1,edgeTextTransmissionAccepted:!1,volume:.8,localModelId:null,localModelPath:null,referenceAudioPath:null},Oi=e=>{let n={...e};return delete n.referenceAudioAccepted,n},ku=(e,n)=>({...Oi(e),referenceAudioAccepted:e.referenceAudioPath===n?.referenceAudioPath&&n?.referenceAudioAccepted===!0}),Su=D.text,Ah=e=>({"restart-requires-resume":"\u5BBF\u4E3B\u5DF2\u91CD\u542F\uFF0C\u8BF7\u7EE7\u7EED\u540E\u91CD\u65B0\u6838\u9A8C\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u8986\u76D6\u8BBE\u7F6E\u3002","authorization-changed":"\u6388\u6743\u5DF2\u6539\u53D8\uFF0C\u8BF7\u5728\u6743\u9650\u4E2D\u6838\u67E5\u540E\u7EE7\u7EED\u3002",MODEL_SOURCE_AUTHORIZATION_REQUIRED:"\u6A21\u578B\u6765\u6E90\u6388\u6743\u5DF2\u53D8\u5316\uFF0C\u8BF7\u8865\u5145\u4E00\u6B21\u6388\u6743\u540E\u7EE7\u7EED\u3002",HUMAN_SETTING_PINNED:"\u8BBE\u7F6E\u6743\u9650\u5DF2\u64A4\u9500\uFF0C\u8BF7\u5728\u6743\u9650\u4E2D\u6838\u67E5\u540E\u7EE7\u7EED\u3002"})[e]??(typeof e=="string"&&/^[A-Z_:-]+$/.test(e)?"\u8FD0\u884C\u68C0\u67E5\u672A\u901A\u8FC7\uFF0C\u8BF7\u68C0\u67E5\u4F9D\u8D56\u6216\u67E5\u770B\u9AD8\u7EA7\u8BBE\u7F6E\u4E2D\u7684\u9519\u8BEF\u3002":e),vn=e=>Number.isFinite(e)&&e>=0?`${(e/1024**2).toFixed(1)} MiB`:"\u672A\u77E5";function zu(e,n){let t=e.status;return!!(e.checkedFor===n&&e.settingsFor===n&&e.settings?.revision&&!e.ttsCancelling&&!e.ttsUncertain&&!e.uncertain&&!e.settingsConflict&&t?.enabled===!1&&t?.ownerSessionId===null&&t?.voiceControlBusy===!1&&t?.voiceSession?.fullyStopped===!0&&t?.voiceSession?.id===null&&!t?.ttsRuntime?.busy&&!t?.ttsRuntime?.blocked)}function st(e,n){return!e.busy&&zu(e,n)}function Tt(e,n){let t=(0,he.useRef)(!1),[r,o]=(0,he.useState)(!1),[i,s]=(0,he.useState)(null),[c,l]=(0,he.useState)(0);return[async(u,p)=>{if(t.current)return!1;t.current=!0,o(!0),s(u);try{return await e(n,u,p)}catch{return!1}finally{t.current=!1,o(!1),s(null),l(f=>f+1)}},r,i,{isLocked:()=>t.current,settled:c}]}function Zu({state:e,sessionId:n,run:t}){if(zu(e,n))return null;let r=e.checkedFor===n&&(e.status?.enabled||e.status?.ownerSessionId);return(0,g.jsxs)("div",{className:D.note,role:"status",children:[(0,g.jsx)("p",{children:e.busy?"\u6B63\u5728\u8BFB\u53D6\u6216\u4FDD\u5B58\uFF0C\u8BF7\u7A0D\u5019\u2026":r?"\u8BF7\u5148\u505C\u6B62\u8BED\u97F3\uFF0C\u518D\u7F16\u8F91\u6216\u8BD5\u542C\u3002":e.ttsUncertain||e.uncertain?"\u6B63\u5728\u6838\u67E5\u4E0A\u6B21\u64CD\u4F5C\u3002":"\u6B63\u5728\u51C6\u5907\u8BBE\u7F6E\u2026"}),r&&n&&t&&(0,g.jsx)(me.Button,{variant:"outline",disabled:e.busy&&(!e.interruptibleRead||e.diagnosticStopPending)||e.ttsCancelling,onClick:()=>{t(n,"disable")},children:"\u505C\u6B62\u8BED\u97F3\u4EE5\u7F16\u8F91"})]})}function Cu(e){let n=e.state.settingsFor===e.sessionId?e.state.settings:null,t=e.state.authorization?.scopes?.some(o=>o.id==="edge-text"&&o.allowed)===!0,r=n&&t?{...n,ttsSetup:{...n.ttsSetup,edgeTextTransmissionAccepted:!0}}:n;return(0,g.jsx)(Th,{...e,settings:r},`${e.sessionId}:${e.state.settingsKey??r?.revision??"unread"}`)}function Th({state:e,sessionId:n,run:t,settings:r,prepared:o=!1,active:i=!0,markSettingsEdited:s,pickPath:c}){let[l,d]=(0,he.useState)(()=>({...$i,...r?.ttsSetup})),[u,p,f]=Tt(t,n),m=(0,he.useId)(),[y,v]=(0,he.useState)(!1),b=e.ttsCapabilitiesFor===n?e.ttsCapabilities:null,_=e.checkedFor===n?e.status?.ttsRuntime:null,Z=e.ttsPreviewFor===n?e.ttsPreview:null,K=e.installerFor===n?e.installer?.jobs?.find(k=>po(k,r)):null,O=!st(e,n)||p,N=JSON.stringify(l)!==JSON.stringify({...$i,...r?.ttsSetup}),T=k=>{s?.("save-tts"),d(S=>({...S,...k}))},P=l.localModelId==="qwen3-tts-base-1.7b-gguf",E=l.provider!=="unconfigured"&&(l.provider!=="local"||!!(l.localModelId&&l.localModelPath)&&(!l.referenceAudioPath||P))&&(l.provider!=="edge"||l.edgeTextTransmissionAccepted)&&(l.provider!=="deepseek"||l.deepseekTextTransmissionAccepted&&b?.deepseekKeyAvailable===!0)&&l.volume!==""&&Number.isFinite(Number(l.volume))&&Number(l.volume)>=0&&Number(l.volume)<=1;return(0,g.jsxs)("section",{className:D.section,"aria-label":"\u6717\u8BFB\u8BBE\u7F6E","data-settings-draft":"save-tts",children:[(0,g.jsx)("header",{children:(0,g.jsx)("h3",{children:"\u56DE\u7B54\u600E\u4E48\u53D1\u58F0"})}),(!o||n&&!(e.checkedFor===n&&(e.status?.enabled||e.status?.ownerSessionId)))&&(0,g.jsx)(Zu,{state:e,sessionId:n,run:t}),(!o||!r||!b||e.uncertain||e.ttsUncertain||l.provider==="deepseek"&&b.deepseekKeyAvailable!==!0)&&(0,g.jsx)("div",{className:D.actions,children:(0,g.jsx)(me.Button,{variant:"outline",disabled:e.busy||p,onClick:()=>u("inspect-tts"),children:l.provider==="deepseek"?"\u68C0\u67E5 DeepSeek API Key":"\u68C0\u6D4B\u672C\u673A\u8BED\u97F3"})}),(0,g.jsxs)("fieldset",{className:`${D.choices} ${D.sourceChoices}`,disabled:O||!r,children:[(0,g.jsx)("legend",{children:"\u6717\u8BFB\u6765\u6E90"}),xu.map(([k,S,C])=>(0,g.jsxs)("label",{className:D.choice,"data-selected":l.provider===k,children:[(0,g.jsx)("input",{type:"radio",name:m,checked:l.provider===k,onChange:()=>T({provider:k,...k==="edge"?{edgeTextTransmissionAccepted:!0}:k==="deepseek"?{deepseekTextTransmissionAccepted:!0}:{}})}),(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:S}),(0,g.jsx)("small",{children:C})]})]},k))]}),l.provider==="edge"&&(0,g.jsxs)("div",{className:D.section,children:[(0,g.jsx)("p",{className:D.hint,children:"\u6717\u8BFB\u6587\u5B57\u4F1A\u53D1\u9001\u7ED9\u5FAE\u8F6F\u3002\u8054\u7F51\u5931\u8D25\u65F6\uFF0C\u56DE\u7B54\u4F1A\u663E\u793A\u4E3A\u6587\u5B57\u3002"}),b?.edgeDependency==="missing"&&(0,g.jsx)("p",{role:"status",className:D.hint,children:"Edge \u6717\u8BFB\u7EC4\u4EF6\u6682\u4E0D\u53EF\u7528\u3002\u56DE\u7B54\u4F1A\u663E\u793A\u4E3A\u6587\u5B57\u3002"})]}),l.provider==="deepseek"&&(0,g.jsxs)("div",{className:D.section,children:[(0,g.jsx)("p",{className:D.hint,children:"\u8BD5\u542C\u6216\u4FDD\u5B58\u540E\u6717\u8BFB\u65F6\uFF0C\u6587\u5B57\u4F1A\u53D1\u9001\u7ED9 DeepSeek\u3002"}),b?.deepseekKeyAvailable!==!0&&(0,g.jsx)("p",{role:"status",className:D.hint,children:"\u8BF7\u5148\u5728 DSH \u7684 DeepSeek API Key \u63D0\u4F9B\u5546\u4E2D\u914D\u7F6E\u5F00\u653E\u5E73\u53F0\u5BC6\u94A5\uFF0C\u518D\u70B9\u300C\u68C0\u67E5 DeepSeek API Key\u300D\u3002"}),(0,g.jsxs)("label",{className:D.inlineField,children:["DeepSeek \u97F3\u8272",(0,g.jsxs)("select",{value:l.deepseekVoice,disabled:O,onChange:k=>T({deepseekVoice:k.target.value}),children:[(0,g.jsx)("option",{value:"stella",children:"\u6D77\u661F \xB7 \u5973\u58F0"}),(0,g.jsx)("option",{value:"tide",children:"\u6697\u6F6E \xB7 \u7537\u58F0"})]})]})]}),l.provider==="local"&&(l.localModelId?(0,g.jsxs)("div",{className:D.section,children:[(0,g.jsxs)("div",{className:D.currentModel,children:[(0,g.jsxs)("span",{children:["\u5F53\u524D\u6717\u8BFB\u6A21\u578B ",(0,g.jsx)("strong",{children:l.localModelId.startsWith("qwen3")?"Qwen3-TTS":l.localModelId.includes("melo")?"MeloTTS":l.localModelId})]}),(0,g.jsx)(me.Button,{variant:"outline","aria-expanded":y,disabled:N,onClick:()=>v(k=>!k),children:"\u5207\u6362\u5F53\u524D\u6A21\u578B"})]}),y&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(Nu,{state:e,sessionId:n,run:t,purpose:"tts"}),(0,g.jsxs)("details",{className:D.details,children:[(0,g.jsx)("summary",{children:"\u5B89\u88C5\u5176\u4ED6\u6717\u8BFB\u6A21\u578B"}),(0,g.jsx)(uo,{pickPath:c,state:e,sessionId:n,run:t,active:i})]})]})]}):(0,g.jsx)(uo,{pickPath:c,state:e,sessionId:n,run:t,active:i})),l.provider==="local"&&!N&&K?.modelId==="qwen3-tts-base-1.7b-gguf"&&(0,g.jsxs)("p",{className:D.hint,children:["\u5F53\u524D\u5B89\u88C5\u65B9\u6848\uFF1A",mr(K.compute),"\u3002",K.compute==="cpu"?"\u6B64\u5B89\u88C5\u53EA\u4F7F\u7528 CPU\u3002\u53EF\u5728\u201C\u5207\u6362\u5F53\u524D\u6A21\u578B \u2192 \u5B89\u88C5\u5176\u4ED6\u6717\u8BFB\u6A21\u578B\u201D\u9009\u62E9\u81EA\u52A8 GPU\uFF1B\u4E0B\u8F7D\u8FD0\u884C\u7EC4\u4EF6\u524D\u4ECD\u9700\u786E\u8BA4\u3002":"\u662F\u5426\u5B9E\u9645\u4F7F\u7528 GPU\uFF0C\u4EE5\u5B8C\u6210\u5408\u6210\u540E\u7684\u672C\u5730\u8BA1\u7B97\u72B6\u6001\u4E3A\u51C6\u3002"]}),(0,g.jsxs)("details",{className:D.details,children:[(0,g.jsx)("summary",{children:"\u97F3\u8272\u4E0E\u97F3\u91CF"}),(0,g.jsxs)("div",{className:D.section,children:[l.provider==="local"&&(P||l.referenceAudioPath)&&(0,g.jsxs)("div",{className:D.section,"data-reference-voice":!0,children:[(0,g.jsx)(dr,{className:D.field,label:"\u53C2\u8003\u97F3\u9891\uFF08WAV\uFF09",kind:"referenceAudio",value:l.referenceAudioPath,disabled:O||!P,active:i,scope:l.provider+":"+l.localModelId,pickPath:c,sessionId:n,placeholder:"\u8BF7\u70B9\u51FB\u9009\u62E9\u6587\u4EF6",onChange:k=>T({referenceAudioPath:k.trim()||null})}),l.referenceAudioPath&&(0,g.jsx)(me.Button,{variant:"outline",disabled:O,onClick:()=>T({referenceAudioPath:null}),children:"\u6E05\u9664\u53C2\u8003\u97F3\u8272"})]}),l.provider!=="local"&&l.referenceAudioPath&&(0,g.jsxs)("div",{className:D.section,children:[(0,g.jsx)("p",{className:D.hint,children:"\u672C\u5730\u53C2\u8003\u97F3\u8272\u5DF2\u4FDD\u7559\u3002"}),(0,g.jsx)(me.Button,{variant:"outline",disabled:O,onClick:()=>T({referenceAudioPath:null}),children:"\u6E05\u9664\u53C2\u8003\u97F3\u8272"})]}),l.provider==="edge"&&(0,g.jsxs)("label",{className:D.inlineField,children:["Edge \u97F3\u8272",(0,g.jsxs)("select",{value:l.edgeVoice,disabled:O,onChange:k=>T({edgeVoice:k.target.value}),children:[(0,g.jsx)("option",{value:"zh-CN-XiaoxiaoNeural",children:"\u6653\u6653 \xB7 \u666E\u901A\u8BDD"}),(0,g.jsx)("option",{value:"zh-CN-YunxiNeural",children:"\u4E91\u5E0C \xB7 \u666E\u901A\u8BDD"}),(0,g.jsx)("option",{value:"zh-CN-XiaoyiNeural",children:"\u6653\u4F0A \xB7 \u666E\u901A\u8BDD"}),(0,g.jsx)("option",{value:"zh-CN-YunjianNeural",children:"\u4E91\u5065 \xB7 \u666E\u901A\u8BDD"}),(0,g.jsx)("option",{value:"zh-TW-HsiaoChenNeural",children:"\u6653\u81FB \xB7 \u53F0\u6E7E\u4E2D\u6587"}),(0,g.jsx)("option",{value:"zh-HK-HiuMaanNeural",children:"\u6653\u66FC \xB7 \u9999\u6E2F\u7CA4\u8BED"})]})]}),(0,g.jsxs)("label",{className:D.inlineField,children:["\u6717\u8BFB\u97F3\u91CF",(0,g.jsx)(Rt,{"aria-label":"\u6717\u8BFB\u97F3\u91CF\u6ED1\u5757",min:"0",max:"1",step:"0.05",value:l.volume,disabled:O,onChange:k=>T({volume:Number(k.target.value)})}),(0,g.jsx)(me.Input,{type:"number",min:"0",max:"1",step:"0.05",value:l.volume,disabled:O,onChange:k=>T({volume:k.target.value})})]})]})]}),(0,g.jsxs)("div",{className:D.actions,children:[(0,g.jsx)(me.Button,{variant:"primary",className:D.primary,disabled:O||!E||!N,onClick:()=>u("save-tts",{revision:r.revision,values:Oi({...l,volume:Number(l.volume)})}),children:p?"\u5904\u7406\u4E2D\u2026":"\u4FDD\u5B58\u6717\u8BFB\u8BBE\u7F6E"}),(0,g.jsx)(me.Button,{variant:"outline",disabled:O||!r?.ttsSetup||!E||!["edge","deepseek","local"].includes(l.provider),onClick:()=>u("preview-tts",N?{revision:r.revision,values:ku({...l,volume:Number(l.volume)},r.ttsSetup)}:void 0),children:N?"\u8BD5\u542C\u5F53\u524D\u9009\u62E9":"\u8BD5\u542C\u5DF2\u4FDD\u5B58\u914D\u7F6E"}),(0,g.jsx)(me.Button,{variant:"outline",disabled:!(_?.busy||_?.blocked||e.ttsUncertain||e.ttsCancelling||Z?.status==="preparing"||f==="preview-tts"),onClick:()=>{t(n,"cancel-tts")},children:"\u505C\u6B62\u8BD5\u542C"})]}),Z&&(0,g.jsxs)("p",{role:"status",className:D.hint,children:[{preparing:"\u8BD5\u542C\u51C6\u5907\u4E2D",cancelling:"\u6B63\u5728\u505C\u6B62\u8BD5\u542C",cancelled:"\u8BD5\u542C\u5DF2\u53D6\u6D88",idle:"\u8BD5\u542C\u5DF2\u505C\u6B62",completed:"\u8BD5\u542C\u5DF2\u7ED3\u675F","text-only":"Edge \u6682\u4E0D\u53EF\u7528\uFF0C\u56DE\u7B54\u4F1A\u663E\u793A\u4E3A\u6587\u5B57",failed:"\u8BD5\u542C\u5931\u8D25\uFF0C\u6B63\u5728\u6838\u67E5\u72B6\u6001",unconfirmed:"\u65E0\u6CD5\u786E\u8BA4\u8BD5\u542C\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B"}[Z.status]??Z.status,Z.status!=="text-only"&&_u[Z.provider]?` \xB7 ${_u[Z.provider]}`:""]}),_&&(0,g.jsxs)("p",{role:"status",className:D.hint,children:[_.blocked?"\u8BD5\u542C\u5C1A\u672A\u505C\u6B62\uFF0C\u8BF7\u91CD\u542F\u5BBF\u4E3B\u3002":`\u6717\u8BFB\u72B6\u6001\uFF1A${{idle:"\u7A7A\u95F2",preparing:"\u51C6\u5907\u4E2D",synthesizing:"\u5408\u6210\u4E2D","playback-requested":"\u5DF2\u8BF7\u6C42\u64AD\u653E","text-only":"\u5728\u7EBF\u6717\u8BFB\u6682\u4E0D\u53EF\u7528\uFF0C\u5DF2\u663E\u793A\u6587\u5B57",completed:"\u8BD5\u542C\u5DF2\u7ED3\u675F",cancelled:"\u5DF2\u53D6\u6D88",failed:"\u5931\u8D25"}[_.state]??_.state}`,_.localComputeBackend?` \xB7 \u672C\u5730\u8BA1\u7B97\uFF1A${_.localComputeBackend.toUpperCase()}${_.localComputeVerified?"\uFF08\u5DF2\u5B8C\u6210\u5408\u6210\uFF09":"\uFF08\u5F85\u9A8C\u8BC1\uFF09"}`:"",_.localComputeFallback?" \xB7 \u5DF2\u56DE\u9000\u540C\u6A21\u578B CPU":""]}),_?.localTimings&&(0,g.jsxs)("details",{className:D.details,children:[(0,g.jsx)("summary",{children:"\u5DF2\u5B8C\u6210\u6717\u8BFB\u7247\u6BB5\u8017\u65F6"}),(0,g.jsxs)("p",{className:D.hint,children:["\u51C6\u5907 ",(_.localTimings.preparationMs/1e3).toFixed(2)," \u79D2 \xB7 \u8BBE\u5907\u9009\u62E9 ",(_.localTimings.deviceSelectionMs/1e3).toFixed(2)," \u79D2 \xB7 \u5408\u6210 ",(_.localTimings.synthesisMs/1e3).toFixed(2)," \u79D2 \xB7 \u64AD\u653E ",(_.localTimings.playbackMs/1e3).toFixed(2)," \u79D2"]}),(0,g.jsxs)("p",{className:D.hint,children:[_.localTimings.chunks," \u6BB5 \xB7 ",_.localTimings.modelResident?"\u4E0A\u6B21\u7247\u6BB5\u7ED3\u675F\u65F6\u6A21\u578B\u4ECD\u9A7B\u7559\uFF0C\u5B8C\u6574\u5408\u6210\u540E\u64AD\u653E\u3002\u51C6\u5907\u5305\u542B\u6587\u4EF6\u6821\u9A8C\uFF1B\u5408\u6210\u5305\u542B\u9996\u6B21\u52A0\u8F7D\u548C\u670D\u52A1\u54CD\u5E94\u3002":"\u5F53\u524D\u672C\u5730\u6A21\u578B\u9010\u6BB5\u542F\u52A8\uFF0C\u5B8C\u6574\u5408\u6210\u540E\u64AD\u653E\u3002\u51C6\u5907\u5305\u542B\u6587\u4EF6\u6821\u9A8C\uFF1B\u5408\u6210\u5305\u542B\u52A0\u8F7D\u4E0E\u5931\u8D25\u91CD\u8BD5\u3002","\u8017\u65F6\u4E0D\u662F\u9996\u97F3\u5EF6\u8FDF\u6216 GPU \u52A0\u901F\u6BD4\u3002"]})]})]})}function po(e,n){if(e.status!=="installed"||!e.installedPath||!n)return!1;if(e.purpose==="tts"||e.recommendedSettings?.tts)return n.ttsSetup?.provider==="local"&&n.ttsSetup.localModelId===e.modelId&&n.ttsSetup.localModelPath===e.installedPath;let t=e.recommendedSettings;return!t||t.asr!==n.modelSetup?.asr?!1:Object.entries(t.models??{}).some(([r,o])=>o===e.installedPath&&n.modelSetup?.models?.[r]===o)}function Pu(e,n){return(e?.models??[]).map(t=>{let r=(e.jobs??[]).filter(s=>s.modelId===t.id),o=r.filter(s=>s.status==="installed").sort((s,c)=>String(c.updatedAt??c.createdAt??"").localeCompare(String(s.updatedAt??s.createdAt??""))),i=o.find(s=>po(s,n));return{model:t,jobs:r,installed:o,current:i,preferred:i??o[0],active:r.find(s=>["queued","running","paused","failed"].includes(s.status))}})}var mo=e=>(e?.title??e?.id??"").split(" \xB7 ")[0],mr=e=>({cpu:"CPU",auto:"\u81EA\u52A8 GPU",cuda:"CUDA / HIP",vulkan:"Vulkan"})[e]??e??"\u672A\u77E5",Ri=e=>{let n=new Date(e);return Number.isFinite(n.getTime())?n.toLocaleString():"\u65F6\u95F4\u672A\u77E5"};function Nu({state:e,sessionId:n,run:t,purpose:r}){let[o,i]=Tt(t,n),s=e.installerFor===n?e.installer:null,c=e.settingsFor===n?e.settings:null,l=Pu(s,c).filter(u=>(!r||u.model.purpose===r)&&u.preferred),d=st(e,n)&&!i&&!e.settingsDraftActions?.some(u=>["save-models","save-tts"].includes(u));return(0,g.jsxs)("section",{className:D.switcher,"aria-label":"\u5207\u6362\u5DF2\u5B89\u88C5\u6A21\u578B","data-no-settings-draft":!0,children:[s?l.length?l.map(({model:u,preferred:p,current:f})=>(0,g.jsxs)("div",{className:D.switchRow,children:[(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:mo(u)}),(0,g.jsxs)("small",{children:[u.purpose==="tts"?"\u6717\u8BFB":"\u8BC6\u522B"," \xB7 ",mr(p.compute),f?" \xB7 \u5F53\u524D\u914D\u7F6E":""]})]}),(0,g.jsxs)("div",{className:D.actions,children:[u.purpose==="tts"&&!f&&(0,g.jsx)(me.Button,{variant:"outline",disabled:!d||!p.installedPath,onClick:()=>o("preview-tts",{revision:c.revision,values:ku({...c.ttsSetup,provider:"local",localModelId:u.id,localModelPath:p.installedPath,referenceAudioPath:null},c.ttsSetup)}),children:"\u5148\u8BD5\u542C"}),(0,g.jsx)(me.Button,{variant:"outline",disabled:!d||!!f,onClick:()=>o("apply-model-install",{id:p.id,revision:c.revision}),children:f?"\u5F53\u524D\u6A21\u578B":"\u9A8C\u8BC1\u5E76\u5207\u6362"})]})]},u.id)):(0,g.jsx)("p",{className:D.hint,children:"\u5C1A\u65E0\u53EF\u5207\u6362\u7684\u5DF2\u5B89\u88C5\u6A21\u578B\uFF0C\u8BF7\u5148\u5728\u6A21\u578B\u4E0B\u8F7D\u4E2D\u5B89\u88C5\u3002"}):(0,g.jsx)("p",{className:D.hint,children:"\u6B63\u5728\u8BFB\u53D6\u5DF2\u5B89\u88C5\u6A21\u578B\u3002"}),!!l.length&&!d&&(0,g.jsx)("p",{className:D.hint,children:"\u5207\u6362\u6A21\u578B\u524D\u9700\u505C\u6B62\u8BED\u97F3\uFF0C\u5DF2\u5B89\u88C5\u6587\u4EF6\u4E0D\u4F1A\u91CD\u65B0\u4E0B\u8F7D\u3002"})]})}function wu({job:e,snapshot:n,settings:t,disabled:r,writable:o,execute:i,history:s=!1}){let c=po(e,t);return(0,g.jsxs)("article",{className:D.job,"data-model-job":e.id,children:[(0,g.jsxs)("div",{className:D.jobHeading,children:[(0,g.jsx)("strong",{children:mo(n.models.find(l=>l.id===e.modelId))||e.modelId}),(0,g.jsxs)("small",{children:[mr(e.compute)," \xB7 ",Ri(e.createdAt)]})]}),(0,g.jsxs)("p",{role:"status",children:[c?"\u5F53\u524D\u914D\u7F6E \xB7 ":"",{queued:"\u7B49\u5F85\u4E2D",running:"\u5904\u7406\u4E2D",paused:"\u5DF2\u6682\u505C",failed:"\u5931\u8D25",cancelled:"\u5DF2\u53D6\u6D88",installed:"\u5DF2\u5B89\u88C5\uFF0C\u5B57\u8282\u6821\u9A8C\u901A\u8FC7","checking-runtime":"\u68C0\u67E5\u8FD0\u884C\u4F9D\u8D56","verifying-local":"\u6821\u9A8C\u672C\u673A\u5DF2\u6709\u6A21\u578B",downloading:"\u4E0B\u8F7D\u4E2D",verifying:"\u6821\u9A8C\u6587\u4EF6",installing:"\u63D0\u4EA4\u5B89\u88C5"}[e.stage]??e.stage]}),!s&&Number.isFinite(e.totalBytes)&&e.totalBytes>0&&Number.isFinite(e.receivedBytes)&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("progress",{max:e.totalBytes,value:Math.min(e.receivedBytes,e.totalBytes),"aria-label":"\u4E0B\u8F7D\u5B57\u8282\u8FDB\u5EA6"}),(0,g.jsxs)("small",{children:["\u4E0B\u8F7D ",vn(e.receivedBytes)," / ",vn(e.totalBytes)]})]}),e.error&&(0,g.jsx)("p",{role:"alert",children:e.error.message}),s&&e.installedPath&&(0,g.jsxs)("details",{className:D.installPath,children:[(0,g.jsx)("summary",{children:"\u5B89\u88C5\u4F4D\u7F6E"}),(0,g.jsx)("p",{children:e.installedPath})]}),(0,g.jsxs)("div",{className:D.actions,children:[["queued","running"].includes(e.status)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:r,onClick:()=>i("control-model-install",{id:e.id,operation:"pause"}),children:"\u6682\u505C\uFF0C\u4FDD\u7559\u8FDB\u5EA6"}),["paused","failed"].includes(e.status)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:r,onClick:()=>i("control-model-install",{id:e.id,operation:"resume"}),children:"\u6062\u590D\u540C\u4E00\u6765\u6E90\u4E0B\u8F7D"}),["queued","running","paused","failed"].includes(e.status)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:r,onClick:()=>i("control-model-install",{id:e.id,operation:"cancel"}),children:"\u53D6\u6D88\u5E76\u6E05\u9664\u6B64\u4EFB\u52A1\u4E34\u65F6\u6587\u4EF6"}),e.status==="installed"&&!c&&(0,g.jsx)(me.Button,{variant:"outline",disabled:!o,onClick:()=>i("apply-model-install",{id:e.id,revision:t.revision}),children:"\u9A8C\u8BC1\u5E76\u5207\u6362"})]}),e.status==="installed"&&(0,g.jsx)("small",{children:"\u5207\u6362\u524D\u8BF7\u7ED3\u675F\u5BF9\u8BDD\u3002\u4E0B\u6B21\u5F00\u59CB\u5BF9\u8BDD\u65F6\u4F7F\u7528\u65B0\u6A21\u578B\u3002"})]})}function Au({state:e,sessionId:n,run:t}){let[r,o]=(0,he.useState)(""),[i,s]=(0,he.useState)("cpu"),[c,l]=(0,he.useState)(!1),[d,u]=Tt(t,n),p=e.installerFor===n?e.installer:null,f=e.settingsFor===n?e.settings:null,m=Pu(p,f),y=m.find(k=>k.model.id===r),v=y?.model,b=e.installPlanFor===n&&e.installPlan?.modelId===r&&e.installPlan?.compute===i&&!e.installPlan?.sourceDirectory?e.installPlan:null,_=!!e.busy||e.uncertain||e.installerUncertain||u,Z=!u&&st(e,n)&&!e.settingsDraftActions?.some(k=>["save-models","save-tts"].includes(k)),K=v?.id==="faster-whisper-small"?"whisper":v?.id==="sensevoice-int8-2024-07-17"?"sensevoice":null,O=K==="whisper"&&p?.compute?.backends?.[K]?.cuda?.available===!0,N=(0,he.useId)(),T=(p?.jobs??[]).filter(k=>["installed","cancelled"].includes(k.status)).slice().reverse(),P=p?.hardware,E=p?.refresh?.observedAt??p?.compute?.observedAt;return(0,g.jsxs)("section",{className:`${D.section} ${D.modelInstaller}`,"aria-label":"\u6A21\u578B\u5B89\u88C5",children:[(0,g.jsxs)("div",{className:D.hardwareSummary,children:[(0,g.jsxs)("span",{children:["\u5185\u5B58 ",vn(P?.totalMemoryBytes)," \xB7 \u53EF\u7528 ",vn(P?.availableMemoryBytes)," \xB7 \u663E\u5B58 ",vn(P?.gpuMemoryBytes)]}),(0,g.jsxs)("small",{children:[E?"\u66F4\u65B0\u4E8E "+Ri(E):"\u7B49\u5F85\u68C0\u6D4B"," \xB7 \u6BCF 5 \u5206\u949F"]})]}),(p?.refresh?.error||e.modelComputeError)&&(0,g.jsxs)("p",{className:D.hint,role:"status",children:[p?.refresh?.error??"\u672C\u6B21\u786C\u4EF6\u68C0\u6D4B\u672A\u5B8C\u6210","\uFF1B\u4FDD\u7559\u4E0A\u6B21\u7ED3\u679C\u3002"]}),e.installerError&&(0,g.jsx)("p",{role:"alert",className:D.note,children:e.installerError}),e.installerUncertain&&(0,g.jsx)("p",{role:"status",className:D.note,children:"\u6B63\u5728\u6838\u67E5\u5B89\u88C5\u72B6\u6001\u3002"}),(0,g.jsxs)("div",{className:D.currentModel,children:[(0,g.jsxs)("span",{children:["\u8BC6\u522B ",(0,g.jsx)("strong",{children:{"whisper-wasm":"Whisper Base",whisper:"Whisper",sensevoice:"SenseVoice"}[f?.modelSetup?.asr]??"\u672A\u914D\u7F6E"})," \xB7 \u6717\u8BFB ",(0,g.jsx)("strong",{children:f?.ttsSetup?.provider==="local"?f.ttsSetup.localModelId?.startsWith("qwen3")?"Qwen3-TTS":f.ttsSetup.localModelId?.startsWith("vits-melo")?"MeloTTS":f.ttsSetup.localModelId??"\u672C\u5730\u6A21\u578B":{edge:"Edge",deepseek:"DeepSeek",off:"\u4E0D\u53D1\u58F0"}[f?.ttsSetup?.provider]??"\u672A\u914D\u7F6E"})]}),(0,g.jsx)(me.Button,{variant:"outline","aria-expanded":c,onClick:()=>l(k=>!k),children:"\u5207\u6362\u5F53\u524D\u6A21\u578B"})]}),c&&(0,g.jsx)(Nu,{state:e,sessionId:n,run:t}),p?(0,g.jsxs)("fieldset",{className:`${D.choices} ${D.modelChoices}`,disabled:_,children:[(0,g.jsx)("legend",{children:"\u9009\u62E9\u6A21\u578B"}),m.map(({model:k,current:S,preferred:C,active:R})=>(0,g.jsxs)("label",{className:D.choice,"data-selected":r===k.id,children:[(0,g.jsx)("input",{type:"radio",name:N,checked:r===k.id,onChange:()=>{o(k.id),s(k.computeOptions?.includes("auto")?"auto":"cpu")}}),(0,g.jsxs)("span",{children:[(0,g.jsxs)("strong",{children:[mo(k),k.recommendation?.recommended&&(0,g.jsx)("span",{className:D.badge,children:"\u63A8\u8350"})]}),(0,g.jsxs)("small",{children:[k.purpose==="tts"?"\u6717\u8BFB":"\u8BC6\u522B"," \xB7 ",vn(k.totalBytes)]}),(0,g.jsx)("small",{children:S?"\u5F53\u524D\u914D\u7F6E":R?{queued:"\u7B49\u5F85\u4E0B\u8F7D",running:"\u4E0B\u8F7D\u5904\u7406\u4E2D",paused:"\u4E0B\u8F7D\u5DF2\u6682\u505C",failed:"\u4E0B\u8F7D\u5931\u8D25"}[R.status]:C?"\u5DF2\u5B89\u88C5\uFF0C\u53EF\u5207\u6362":k.available?"\u53EF\u51C6\u5907\u5B89\u88C5":"\u6682\u4E0D\u53EF\u5B89\u88C5"}),!k.available&&(0,g.jsx)("small",{children:k.reason??k.recommendation?.reason})]})]},k.id))]}):(0,g.jsx)("p",{className:D.note,children:"\u6B63\u5728\u8BFB\u53D6\u6A21\u578B\u5217\u8868\u3002"}),v&&(0,g.jsxs)("div",{className:D.selectedModel,children:[(0,g.jsxs)("label",{className:D.inlineField,children:["\u63A8\u7406\u8BBE\u5907",(0,g.jsx)("select",{value:i,disabled:_,onChange:k=>s(k.target.value),children:(v.computeOptions??["cpu"]).map(k=>(0,g.jsxs)("option",{value:k,children:[mr(k),k==="cpu"?"":" \xB7 CPU \u515C\u5E95"]},k))})]}),(0,g.jsxs)("div",{className:D.actions,children:[y.preferred&&(0,g.jsx)(me.Button,{variant:"outline",disabled:!Z||!!y.current,onClick:()=>d("apply-model-install",{id:y.preferred.id,revision:f.revision}),children:y.current?"\u5F53\u524D\u6A21\u578B":"\u9A8C\u8BC1\u5E76\u5207\u6362"}),(0,g.jsx)(me.Button,{variant:"outline",disabled:_||!v.available,onClick:()=>d("plan-model-install",{modelId:r,compute:i}),children:y.preferred?"\u67E5\u770B\u5176\u4ED6\u5B89\u88C5\u65B9\u6848":"\u67E5\u770B\u5B89\u88C5\u8BA1\u5212"})]}),(0,g.jsxs)("details",{className:D.details,children:[(0,g.jsx)("summary",{children:"\u63A8\u8350\u4F9D\u636E\u4E0E\u8BBE\u5907\u8BF4\u660E"}),(0,g.jsx)("p",{className:D.hint,children:v.recommendation?.reason??"\u63A8\u8350\u4F9D\u636E\u672A\u77E5\uFF0C\u53EF\u624B\u52A8\u9009\u62E9\u3002"}),(0,g.jsx)("p",{className:D.hint,children:v.purpose==="tts"?i==="cpu"?"\u4EC5\u51C6\u5907 CPU \u8FD0\u884C\u65F6\u3002":"\u51C6\u5907\u56FA\u5B9A Vulkan \u4E0E CPU \u7EC4\u4EF6\uFF0C\u5B9E\u9645\u53EF\u7528\u6027\u4ECD\u9700\u672C\u673A\u5408\u6210\u9A8C\u8BC1\u3002":K==="sensevoice"?"\u6B64 SenseVoice INT8 \u7EC4\u5408\u76EE\u524D\u4F7F\u7528 CPU\u3002":O?"\u5DF2\u68C0\u6D4B\u5230 CTranslate2 GPU\uFF1B\u6A21\u578B\u52A0\u8F7D\u53CA\u663E\u5B58\u4ECD\u5F85\u9A8C\u8BC1\u3002":"\u672A\u8BC1\u5B9E GPU \u53EF\u7528\uFF0C\u81EA\u52A8\u6A21\u5F0F\u4F7F\u7528\u540C\u6A21\u578B CPU\u3002"})]})]}),b&&(0,g.jsxs)(me.MenuSurface,{className:D.plan,"aria-label":"\u6A21\u578B\u5B89\u88C5\u8BA1\u5212",children:[(0,g.jsx)("h4",{children:"\u6A21\u578B\u5B89\u88C5"}),(0,g.jsxs)("dl",{children:[(0,g.jsx)("dt",{children:"\u6A21\u578B"}),(0,g.jsx)("dd",{children:v?.title??b.modelId}),(0,g.jsx)("dt",{children:"\u6765\u6E90"}),(0,g.jsx)("dd",{children:b.source}),(0,g.jsx)("dt",{children:"\u4E0B\u8F7D\u5927\u5C0F"}),(0,g.jsx)("dd",{children:vn(b.totalBytes)}),(0,g.jsx)("dt",{children:"\u4FDD\u5B58\u4F4D\u7F6E"}),(0,g.jsx)("dd",{children:b.destination}),(0,g.jsx)("dt",{children:"\u63A8\u7406\u8BBE\u5907"}),(0,g.jsx)("dd",{children:b.compute})]}),(0,g.jsx)("p",{children:b.licenseNote??"\u8BF7\u9605\u8BFB\u4E0B\u5217\u6A21\u578B\u8BB8\u53EF\u3002"}),b.licenseUrls?.map(k=>(0,g.jsx)("a",{href:k,target:"_blank",rel:"noreferrer",children:k},k)),(0,g.jsx)("p",{className:D.hint,children:b.notice}),(0,g.jsxs)("details",{className:D.details,children:[(0,g.jsx)("summary",{children:"\u6587\u4EF6\u548C\u6821\u9A8C\u8BE6\u60C5"}),(0,g.jsx)("ul",{children:b.files?.map(k=>(0,g.jsxs)("li",{children:[k.name," \xB7 ",vn(k.bytes),(0,g.jsxs)("small",{children:["SHA-256: ",k.sha256]}),(0,g.jsx)("small",{children:k.url})]},k.name))})]}),(0,g.jsx)(me.Button,{variant:"primary",className:D.primary,disabled:_||!v?.available||!b.planHash,onClick:()=>d("start-model-install",{modelId:b.modelId,compute:b.compute,planHash:b.planHash,accepted:!0}),children:"\u5F00\u59CB\u4E0B\u8F7D"})]}),(0,g.jsx)("div",{className:D.jobs,children:(p?.jobs??[]).filter(k=>!["installed","cancelled"].includes(k.status)).map(k=>(0,g.jsx)(wu,{job:k,snapshot:p,settings:f,disabled:_,writable:Z,execute:d},k.id))}),!!T.length&&(0,g.jsxs)("details",{className:D.installHistory,children:[(0,g.jsxs)("summary",{children:["\u5B89\u88C5\u8BB0\u5F55\uFF08",T.length,"\uFF09",(0,g.jsx)("small",{children:"\u65F6\u95F4 \xB7 \u8BBE\u5907 \xB7 \u4F4D\u7F6E"})]}),(0,g.jsx)("div",{className:D.jobs,children:T.map(k=>(0,g.jsx)(wu,{job:k,snapshot:p,settings:f,disabled:_,writable:Z,execute:d,history:!0},k.id))})]}),(0,g.jsx)("p",{className:D.hint,children:"\u6A21\u578B\u4E0B\u8F7D\u53EF\u5728\u540E\u53F0\u7EE7\u7EED\u3002\u68C0\u6D4B\u9759\u9ED8\u8FDB\u884C\uFF0C\u8FDB\u5165\u672C\u9875\u7ACB\u5373\u5237\u65B0\u3002"})]})}function uo({state:e,sessionId:n,run:t,active:r=!0,pickPath:o,initialModelId:i=null,initialReuse:s=!1,reuseOnly:c=!1,onboarding:l=!1}){let[d,u,,p]=Tt(t,n),[f,m]=(0,he.useState)(i),[y,v]=(0,he.useState)(null),[b,_]=(0,he.useState)(s),[Z,K]=(0,he.useState)(""),[O,N]=(0,he.useState)("q8_0"),T=e.installerFor===n?e.installer:null,P=T?.models?.filter(q=>q.purpose==="tts"||["qwen3-tts-base-1.7b-gguf","vits-melo-tts-zh_en-int8"].includes(q.id))??[],E=P.find(q=>q.recommendation?.recommended&&q.available),k=f??E?.id??P.find(q=>q.available)?.id??P[0]?.id,S=P.find(q=>q.id===k),C=y??(S?.computeOptions?.includes("auto")?"auto":"cpu"),R=b&&k==="qwen3-tts-base-1.7b-gguf",z=R?{sourceDirectory:Z,modelVariant:O}:{},A=e.installPlanFor===n&&e.installPlan?.modelId===k&&e.installPlan?.compute===C&&(R?e.installPlan?.reused===!0&&(e.installPlanRequest?.sourceDirectory??e.installPlan?.sourceDirectory)===Z&&e.installPlan?.modelVariant===O:!e.installPlan?.sourceDirectory)?e.installPlan:null,I=[...T?.jobs??[]].reverse().find(q=>q.modelId===k&&q.status!=="cancelled"),V=T?.ttsInstallIntent,B=V&&I&&V.modelId===k&&V.jobId===I.id?V:null,F=["waiting","verifying"].includes(V?.status),X=e.settingsFor===n&&e.settings?.ttsSetup?.provider==="local"&&e.settings.ttsSetup.localModelId===k&&I?.status==="installed"&&!!I.installedPath&&e.settings.ttsSetup.localModelPath===I.installedPath,ue=(0,he.useRef)(void 0),de=(0,he.useRef)(null);(0,he.useEffect)(()=>{!r||T||e.busy||u||p.isLocked()||ue.current===n||(ue.current=n,d("model-installer"))},[r,n,!!T,e.busy,u,p.settled]),(0,he.useEffect)(()=>{let q=n+":"+k+":"+C;R||!r||!S?.available||e.busy||u||p.isLocked()||A||de.current===q||(de.current=q,d("plan-model-install",{modelId:k,compute:C}))},[r,n,k,C,S?.available,e.busy,u,!!A,R,p.settled]);let Q=u||e.busy||e.installerUncertain;return(0,g.jsxs)("section",{className:D.section,"aria-label":"\u4E0B\u8F7D\u672C\u5730\u8BED\u97F3\u6A21\u578B","data-no-settings-draft":!0,children:[T?(0,g.jsxs)(g.Fragment,{children:[!c&&(0,g.jsxs)("label",{className:D.inlineField,children:["\u8BED\u97F3\u6A21\u578B",(0,g.jsx)("select",{"aria-label":"\u8BED\u97F3\u6A21\u578B",value:k??"",disabled:Q||B?.status==="verifying",onChange:q=>{m(q.target.value),v(null)},children:P.map(q=>(0,g.jsxs)("option",{value:q.id,children:[q.title??q.id,q.recommendation?.recommended?" \xB7 \u63A8\u8350":"",q.available?"":" \xB7 \u6682\u4E0D\u53EF\u7528"]},q.id))})]}),!l&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("p",{className:D.hint,children:S?.recommendation?.reason}),(0,g.jsxs)("label",{className:D.inlineField,children:["\u672C\u5730\u8BA1\u7B97",(0,g.jsx)("select",{"aria-label":"\u672C\u5730\u8BA1\u7B97",value:C,disabled:Q||F,onChange:q=>v(q.target.value),children:(S?.computeOptions??["cpu"]).map(q=>(0,g.jsx)("option",{value:q,children:{cpu:"CPU",auto:"\u81EA\u52A8 GPU \xB7 CPU \u515C\u5E95",vulkan:"Vulkan \xB7 CPU \u515C\u5E95"}[q]},q))})]})]}),!S?.available&&(0,g.jsx)("p",{role:"status",className:D.note,children:S?.reason??"\u6B64\u8BBE\u5907\u6682\u6CA1\u6709\u517C\u5BB9\u7684\u5B89\u88C5\u5305\u3002\u53EF\u9009\u62E9\u5176\u4ED6\u652F\u6301\u7684\u6A21\u578B\uFF0C\u6216\u5148\u4F7F\u7528\u6587\u5B57\u3002"}),A&&(0,g.jsxs)("div",{className:D.plan,children:[(0,g.jsxs)("strong",{children:["\u4E0B\u8F7D ",vn(A.totalBytes)," \xB7 ",A.compute.toUpperCase()]}),A.reused&&(0,g.jsxs)("p",{children:["\u590D\u7528\u6A21\u578B ",vn(A.reusedBytes)," \xB7 ",A.modelVariant]}),(0,g.jsxs)("details",{className:D.details,children:[(0,g.jsx)("summary",{children:"\u6765\u6E90\u3001\u8BB8\u53EF\u4E0E\u4FDD\u5B58\u4F4D\u7F6E"}),(0,g.jsx)("p",{children:A.source}),A.runtime&&(0,g.jsx)("p",{children:A.runtime.source}),(0,g.jsx)("p",{children:A.notice}),(0,g.jsx)("p",{children:A.verification}),(0,g.jsx)("p",{children:A.licenseNote}),A.licenseUrls?.map(q=>(0,g.jsx)("a",{href:q,target:"_blank",rel:"noreferrer",children:q},q)),(0,g.jsx)("p",{children:A.destination})]})]}),(0,g.jsxs)("div",{className:D.actions,children:[(!I||(R||I.compute!==C)&&I.status==="installed"&&!F)&&(0,g.jsx)(me.Button,{variant:"primary",className:D.primary,disabled:Q||!st(e,n)||!S?.available||!A,onClick:()=>d("start-model-install",{modelId:k,compute:C,planHash:A.planHash,accepted:!0,useWhenReady:!0,...A.reused?{sourceDirectory:A.sourceDirectory,modelVariant:A.modelVariant}:{}}),children:R?"\u9A8C\u8BC1\u5E76\u4F7F\u7528":"\u4E0B\u8F7D\u5E76\u4F7F\u7528"}),k==="qwen3-tts-base-1.7b-gguf"&&!c&&(0,g.jsx)(me.Button,{variant:"outline","aria-expanded":R,disabled:Q||F,onClick:()=>_(q=>!q),children:"\u4F7F\u7528\u672C\u673A\u5DF2\u6709\u6587\u4EF6"})]}),R&&(0,g.jsxs)("div",{className:D.section,children:[(0,g.jsx)(dr,{className:D.field,label:"\u63D2\u4EF6\u6240\u5728\u673A\u5668\u7684\u6A21\u578B\u76EE\u5F55",kind:"sourceDirectory",value:Z,disabled:Q,active:r,scope:k+":"+O,pickPath:o,sessionId:n,onChange:K}),(0,g.jsxs)("label",{className:D.inlineField,children:["\u5DF2\u6709\u6A21\u578B\u91CF\u5316\u7248\u672C",(0,g.jsxs)("select",{"aria-label":"\u5DF2\u6709\u6A21\u578B\u91CF\u5316\u7248\u672C",value:O,disabled:Q,onChange:q=>N(q.target.value),children:[(0,g.jsx)("option",{value:"q8_0",children:"Q8_0"}),(0,g.jsx)("option",{value:"q4_k_m",children:"Q4_K_M"})]})]}),(0,g.jsx)(me.Button,{variant:"outline",disabled:Q||!Z.trim()||!S?.available,onClick:()=>d("plan-model-install",{modelId:k,compute:C,...z}),children:"\u68C0\u67E5\u590D\u7528\u8BA1\u5212"})]}),R&&I&&["failed","paused"].includes(I.status)&&(0,g.jsx)("p",{className:D.note,children:"\u5DF2\u6709\u672A\u5B8C\u6210\u7684\u5B89\u88C5\u4EFB\u52A1\u3002\u53EF\u7EE7\u7EED\u91CD\u8BD5\uFF1B\u5982\u9700\u66F4\u6362\u76EE\u5F55\u6216\u91CF\u5316\u7248\u672C\uFF0C\u8BF7\u5148\u53D6\u6D88\u8BE5\u4EFB\u52A1\uFF0C\u518D\u68C0\u67E5\u65B0\u7684\u590D\u7528\u8BA1\u5212\u3002"}),!R&&S?.available&&!A&&!I&&(0,g.jsx)(me.Button,{variant:"outline",disabled:Q,onClick:()=>d("plan-model-install",{modelId:k,compute:C}),children:"\u91CD\u65B0\u8BFB\u53D6\u5B89\u88C5\u8BA1\u5212"}),I&&(0,g.jsxs)("div",{className:D.job,children:[(0,g.jsx)("p",{role:"status",children:B?.status==="verifying"?"\u6B63\u5728\u9A8C\u8BC1\u5408\u6210\uFF0C\u9996\u6B21\u53EF\u80FD\u9700\u8981\u51E0\u5206\u949F":B?.status==="applied"&&X?"\u5408\u6210\u9A8C\u8BC1\u901A\u8FC7\uFF0C\u5DF2\u8BBE\u4E3A\u6717\u8BFB\u6765\u6E90":B?.status==="blocked"?"\u9700\u8981\u5904\u7406\u540E\u518D\u7EE7\u7EED":{queued:"\u7B49\u5F85\u4E0B\u8F7D",running:I.stage==="verifying-local"?"\u6821\u9A8C\u672C\u673A\u5DF2\u6709\u6A21\u578B":"\u4E0B\u8F7D\u5904\u7406\u4E2D",paused:"\u5DF2\u6682\u505C",failed:"\u4E0B\u8F7D\u5931\u8D25",installed:"\u6587\u4EF6\u5DF2\u6821\u9A8C\uFF0C\u5C1A\u672A\u786E\u8BA4\u5408\u6210"}[I.status]??I.status}),I.totalBytes>0&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("progress",{"aria-label":"\u8BED\u97F3\u6A21\u578B\u4E0B\u8F7D\u8FDB\u5EA6",max:I.totalBytes,value:Math.min(I.receivedBytes,I.totalBytes)}),(0,g.jsxs)("small",{children:[vn(I.receivedBytes)," / ",vn(I.totalBytes)]})]}),I.error&&(0,g.jsx)("p",{role:"alert",children:I.error.message}),B?.reason&&(0,g.jsx)("p",{className:D.note,children:Ah(B.reason)}),(0,g.jsxs)("div",{className:D.actions,children:[B?.status==="verifying"&&(0,g.jsx)(me.Button,{variant:"outline",disabled:Q,onClick:()=>d("control-model-install",{id:I.id,operation:"pause"}),children:"\u505C\u6B62\u9A8C\u8BC1"}),["queued","running"].includes(I.status)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:Q,onClick:()=>d("control-model-install",{id:I.id,operation:"pause"}),children:"\u6682\u505C"}),(["paused","failed"].includes(I.status)||B?.status==="blocked"||B?.status==="paused")&&(0,g.jsx)(me.Button,{variant:"outline",disabled:Q,onClick:()=>d("control-model-install",{id:I.id,operation:"resume"}),children:"\u7EE7\u7EED\u4E0B\u8F7D\u5E76\u4F7F\u7528"}),["queued","running","paused","failed"].includes(I.status)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:Q,onClick:()=>d("control-model-install",{id:I.id,operation:"cancel"}),children:"\u53D6\u6D88\u4E0B\u8F7D"}),I.status==="installed"&&!X&&(!B||["applied","cancelled"].includes(B.status))&&(0,g.jsx)(me.Button,{variant:"outline",disabled:Q||F||!st(e,n),onClick:()=>d("apply-model-install",{id:I.id,revision:e.settings.revision}),children:"\u9A8C\u8BC1\u5E76\u4F7F\u7528"})]})]}),X&&(0,g.jsx)("p",{className:D.hint,children:"\u672C\u5730\u6A21\u578B\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u8BD5\u542C\u3002"})]}):(0,g.jsx)(g.Fragment,{children:(0,g.jsx)("p",{className:D.hint,children:"\u6B63\u5728\u8BFB\u53D6\u53EF\u5B89\u88C5\u6A21\u578B\u2026"})}),e.installerError&&(0,g.jsx)("p",{role:"alert",className:D.note,children:e.installerError}),e.installerUncertain&&(0,g.jsx)("p",{role:"status",children:"\u6B63\u5728\u6838\u67E5\u4E0B\u8F7D\u72B6\u6001\u3002"})]})}function Tu({state:e,sessionId:n,run:t,pickPath:r,active:o}){let i=e.settingsFor===n?e.settings:null,s=e.installerFor===n?e.installer:null,c=i?.ttsSetup?.localModelPath,[l,d]=Tt(t,n),[u,p]=(0,he.useState)(""),[f,m]=(0,he.useState)(!1),y=(s?.jobs??[]).filter(b=>b.status==="installed"&&(b.purpose==="tts"||b.recommendedSettings?.tts)),v=y.find(b=>b.id===u);return(0,g.jsxs)("section",{className:D.section,"aria-label":"\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84","data-no-settings-draft":!0,children:[(0,g.jsx)("h3",{children:"\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84"}),(0,g.jsx)("p",{className:D.hint,children:c||"\u5C1A\u672A\u914D\u7F6E\u672C\u5730\u6717\u8BFB\u6A21\u578B\u8DEF\u5F84\u3002"}),!!y.length&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("label",{className:D.inlineField,children:["\u5DF2\u5B89\u88C5\u76EE\u5F55",(0,g.jsxs)("select",{value:u,onChange:b=>p(b.target.value),children:[(0,g.jsx)("option",{value:"",children:"\u9009\u62E9\u5DF2\u6821\u9A8C\u7684\u5B89\u88C5\u76EE\u5F55"}),y.map(b=>(0,g.jsxs)("option",{value:b.id,children:[mo(s.models.find(_=>_.id===b.modelId))," \xB7 ",mr(b.compute)," \xB7 ",Ri(b.createdAt)]},b.id))]})]}),v&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("p",{className:D.hint,children:v.installedPath}),(0,g.jsx)(me.Button,{variant:"outline",disabled:d||!st(e,n)||po(v,i),onClick:()=>l("apply-model-install",{id:v.id,revision:i.revision}),children:"\u9A8C\u8BC1\u5E76\u4F7F\u7528\u6240\u9009\u8DEF\u5F84"})]})]}),(0,g.jsxs)("details",{className:D.details,onToggle:b=>m(b.currentTarget.open),children:[(0,g.jsx)("summary",{children:"\u590D\u7528\u672C\u673A Qwen \u6A21\u578B\u6587\u4EF6"}),(0,g.jsx)("p",{className:D.hint,children:"\u9009\u62E9\u5DF2\u6709\u6A21\u578B\u76EE\u5F55\u540E\u6821\u9A8C\u6587\u4EF6\uFF1B\u6821\u9A8C\u901A\u8FC7\u540E\u5B89\u88C5\u8FD0\u884C\u7EC4\u4EF6\u3002"}),f&&(0,g.jsx)(uo,{state:e,sessionId:n,run:t,active:o,pickPath:r,initialModelId:"qwen3-tts-base-1.7b-gguf",initialReuse:!0,reuseOnly:!0})]})]})}function Eu({state:e,sessionId:n,run:t,onDismiss:r,onMinimize:o,onBackToAuthorization:i,asrStatus:s,pickPath:c}){let[l,d]=Tt(t,n),[u,p]=(0,he.useState)(0),f=(0,he.useRef)(null),m=(0,he.useRef)(0),y=(0,he.useRef)(null);(0,he.useLayoutEffect)(()=>()=>{m.current++},[n]);let v=Q=>(m.current++,Q?.());(0,he.useLayoutEffect)(()=>{let Q=f.current?.closest("[data-whale-content]");Q&&(Q.scrollTop=0);let q=f.current?.querySelector("[data-wizard-body]");q&&(q.scrollTop=0)},[u]);let b=e.settingsFor===n?e.settings:null,[_,Z]=(0,he.useState)(null),[K,O]=(0,he.useState)(null),N=_??b?.listenMode??"ptt",T=b?.ttsSetup?.provider,P=K??(T!=="unconfigured"?T:null)??"edge",E=P==="edge"&&T!=="edge",k=e.ttsCapabilitiesFor===n?e.ttsCapabilities:null,S=typeof k?.deepseekKeyAvailable=="boolean",C=k?.deepseekKeyAvailable===!0,R=`${n??"owner"}:${b?.revision??"unread"}`,[z,A]=(0,he.useState)(null),I=z??b?.ttsSetup?.deepseekVoice??"stella",V=!S&&!d&&y.current===R&&!!e.error,B=()=>{d||(y.current=R,l("inspect-tts"))};(0,he.useEffect)(()=>{u!==1||P!=="deepseek"||S||d||y.current===R||B()},[u,P,S,R,d]);let F=P==="deepseek"&&T!=="deepseek",X=d||!st(e,n),ue=b?.ttsSetup?.provider==="local"&&!!b.ttsSetup.localModelId,de=async()=>{let Q=m.current,q=()=>m.current===Q;if(u===0)await l("listen-mode",{mode:N})===!0&&q()&&p(1);else if(u===1){if(P==="deepseek"&&!C)return;let W=P==="deepseek"&&I!==(b.ttsSetup.deepseekVoice??"stella");if(K===null&&b.ttsSetup.provider!=="unconfigured"&&!W||P==="local"&&ue){p(2);return}let ne=Oi({...$i,...b.ttsSetup,provider:P});P==="edge"&&(ne.edgeTextTransmissionAccepted=!0),P==="deepseek"&&(ne.deepseekTextTransmissionAccepted=!0,ne.deepseekVoice=I),await l("save-tts",{revision:b.revision,values:ne})===!0&&q()&&p(2)}else await l("complete-setup",{revision:b.revision})===!0&&q()&&r?.()};return(0,g.jsxs)(me.MenuSurface,{ref:f,className:D.wizard,role:"region","aria-label":"\u9C7C\u5E94\u9996\u6B21\u914D\u7F6E","data-whale-intrinsic":!0,children:[(0,g.jsxs)("header",{className:D.header,children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("h2",{children:"\u5F00\u59CB\u4F7F\u7528\u9C7C\u5E94"}),(0,g.jsxs)("p",{className:D.hint,children:["\u7B2C ",u+1," / 3 \u6B65 \xB7 \u5176\u4F59\u8BBE\u7F6E\u968F\u65F6\u518D\u8C03"]})]}),(0,g.jsx)(me.Button,{onClick:o,children:"\u7A0D\u540E"})]}),(0,g.jsx)("div",{className:D.wizardBody,"data-wizard-body":!0,"data-no-drag":!0,children:(0,g.jsxs)("div",{className:D.wizardBodyContent,"data-whale-natural-content":!0,children:[(0,g.jsx)(Zu,{state:e,sessionId:n,run:t}),u===0&&(0,g.jsxs)("section",{className:D.section,children:[(0,g.jsx)("h3",{children:"\u600E\u4E48\u8BF4\u8BDD\uFF1F"}),(0,g.jsx)("fieldset",{className:D.choices,disabled:X,children:[["ptt","\u6309\u952E\u8BF4\u8BDD","\u6309\u4F4F\u5FEB\u6377\u952E\u65F6\u6536\u97F3"],["always","\u81EA\u7531\u9EA6","\u5F00\u59CB\u5BF9\u8BDD\u540E\u6301\u7EED\u542C\u53D6\u8BED\u97F3"],["wake","\u5524\u9192\u8BCD","\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\uFF0C\u518D\u8BF4\u6307\u4EE4"]].map(([Q,q,W])=>(0,g.jsxs)("label",{className:D.choice,"data-selected":N===Q,children:[(0,g.jsx)("input",{type:"radio",name:"setup-listen","data-whale-operation":`listen-mode-${Q}`,checked:N===Q,onChange:()=>Z(Q)}),(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:q}),(0,g.jsx)("small",{children:W})]})]},Q))})]}),u===1&&(0,g.jsxs)("section",{className:D.section,children:[(0,g.jsx)("h3",{children:"\u600E\u4E48\u542C\u56DE\u7B54\uFF1F"}),(0,g.jsx)("fieldset",{className:D.choices,disabled:X,children:xu.map(([Q,q,W])=>(0,g.jsxs)("label",{className:D.choice,"data-selected":P===Q,children:[(0,g.jsx)("input",{type:"radio",name:"setup-provider",checked:P===Q,onChange:()=>{O(Q),Q==="deepseek"&&B()}}),(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:q}),(0,g.jsx)("small",{children:W})]})]},Q))}),P==="edge"&&(0,g.jsx)("p",{className:D.note,children:"\u542F\u7528\u540E\uFF0C\u6717\u8BFB\u6587\u5B57\u4F1A\u53D1\u9001\u7ED9\u5FAE\u8F6F\u3002\u8054\u7F51\u5931\u8D25\u65F6\uFF0C\u56DE\u7B54\u4F1A\u663E\u793A\u4E3A\u6587\u5B57\u3002"}),P==="deepseek"&&(0,g.jsxs)("div",{className:D.note,"data-whale-deepseek-setup":!0,children:[(0,g.jsx)("p",{children:"\u786E\u8BA4\u7EE7\u7EED\u540E\uFF0C\u6717\u8BFB\u6587\u5B57\u4F1A\u53D1\u9001\u7ED9 DeepSeek\u3002\u5BC6\u94A5\u7531 DSH \u7BA1\u7406\uFF0C\u9C7C\u5E94\u4E0D\u4F1A\u4FDD\u5B58\u5BC6\u94A5\u3002"}),!S&&!V&&(0,g.jsx)("p",{role:"status",children:"\u6B63\u5728\u68C0\u67E5 DSH \u4E2D\u4FDD\u5B58\u7684 DeepSeek API Key\u2026"}),S&&!C&&(0,g.jsx)("p",{role:"status",children:"\u5C1A\u672A\u5728 DSH \u7684 DeepSeek API Key \u63D0\u4F9B\u5546\u4E2D\u914D\u7F6E\u5F00\u653E\u5E73\u53F0\u5BC6\u94A5\u3002"}),V&&(0,g.jsx)("p",{role:"status",children:"\u6682\u65F6\u65E0\u6CD5\u68C0\u67E5 DeepSeek API Key\u3002"}),(V||S&&!C)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:X,onClick:B,children:"\u91CD\u65B0\u68C0\u67E5 DeepSeek API Key"}),(0,g.jsxs)("label",{className:D.inlineField,children:["DeepSeek \u97F3\u8272",(0,g.jsxs)("select",{"aria-label":"DeepSeek \u97F3\u8272",value:I,disabled:X,onChange:Q=>A(Q.target.value),children:[(0,g.jsx)("option",{value:"stella",children:"\u6D77\u661F \xB7 \u5973\u58F0"}),(0,g.jsx)("option",{value:"tide",children:"\u6697\u6F6E \xB7 \u7537\u58F0"})]})]})]}),P==="local"&&(0,g.jsx)(uo,{pickPath:c,state:e,sessionId:n,run:t,initialModelId:ue?b.ttsSetup.localModelId:null,onboarding:!0})]}),u===2&&(0,g.jsxs)("section",{className:D.section,children:[(0,g.jsx)("h3",{children:"\u51C6\u5907\u8BED\u97F3\u8BC6\u522B"}),(0,g.jsx)("p",{children:"\u8BF4\u8BDD\u65B9\u5F0F\u548C\u6717\u8BFB\u914D\u7F6E\u5DF2\u4FDD\u5B58\u3002"}),b?.modelSetup?.asr==="whisper-wasm"&&s]}),(e.error||e.setupError)&&(0,g.jsx)("p",{role:"alert",className:D.note,children:"\u6682\u65F6\u672A\u80FD\u5B8C\u6210\uFF0C\u6B63\u5728\u6838\u67E5\u8BBE\u7F6E\u3002"})]})}),(0,g.jsxs)("footer",{className:D.actions,children:[(0,g.jsx)(me.Button,{variant:"outline",disabled:d,onClick:()=>u>0?p(u-1):v(i),children:"\u4E0A\u4E00\u6B65"}),(0,g.jsx)(me.Button,{variant:"primary",className:D.primary,disabled:X||!b||u===1&&P==="local"&&!ue||u===1&&P==="deepseek"&&!C,onClick:()=>{de()},children:d?"\u4FDD\u5B58\u4E2D\u2026":u===2?"\u5B8C\u6210":u===1&&E?"\u542F\u7528\u5728\u7EBF\u6717\u8BFB\u5E76\u7EE7\u7EED":u===1&&F?"\u542F\u7528 DeepSeek \u8BED\u97F3\u5408\u6210\u5E76\u7EE7\u7EED":"\u4E0B\u4E00\u6B65"})]})]})}var a=require("react/jsx-runtime"),fo=e=>e.setupOpen||e.setupStatus?.completed!==!0,Eh={ARCHIVED:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u5DF2\u5F52\u6863\u3002\u6062\u590D\u539F\u4F1A\u8BDD\u6216\u66F4\u6362\u7ED1\u5B9A\u540E\u518D\u5F00\u59CB\u8BED\u97F3\u3002",BUSY:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F\u3002\u7B49\u8FD9\u8F6E\u7ED3\u675F\u540E\u518D\u5F00\u59CB\u8BED\u97F3\u3002",UNAVAILABLE:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528\u3002\u53EF\u66F4\u6362\u7ED1\u5B9A\u6216\u89E3\u9664\u7ED1\u5B9A\u3002"},Ku=e=>e.authorizationOpen||e.authorizationLoading&&!e.authorization;function $u(e){let[n,t]=(0,$.useState)(!1),r=(0,$.useRef)(null),o=(0,$.useRef)(null),i=(0,$.useRef)(null),s=(0,$.useRef)(null),c=e.useWhalePreferences(_=>_),l=e.useWhaleUi(_=>_),d=Ku(l),u=d||fo(l)?"setup":l.panelView??"home",p=n&&u!=="settings",f=(0,$.useCallback)(_=>{r.current=_,e.geometry.ref(_),e.sizing.ref(_)},[e.geometry,e.sizing]),m=(0,$.useCallback)(_=>{o.current=_,e.sizing.contentRef(_)},[e.sizing]);(0,$.useEffect)(()=>{e.setPanelVisible?.(!p)},[p]),(0,$.useLayoutEffect)(()=>{o.current&&(o.current.scrollTop=0)},[u]),(0,$.useLayoutEffect)(()=>e.sizing.update(),[u,p,d,l.sourcePending]),(0,$.useEffect)(()=>{let _=r.current,Z=_?.ownerDocument;s.current&&_&&Z&&(Z.activeElement===Z.body||_.contains(Z.activeElement))&&(u==="home"?_.querySelector("[data-whale-settings-trigger]")?.focus({preventScroll:!0}):u!==s.current&&_.focus({preventScroll:!0})),s.current=u},[u]);let y=_=>{let Z=gu(_);Z&&e.recordUserOperation?.(Z)},v=()=>{t(!0),requestAnimationFrame(()=>r.current?.querySelector("[data-whale-reopen]")?.focus())},b=()=>{e.refresh?.(),t(!1),requestAnimationFrame(()=>r.current?.focus())};return(0,Gu.createPortal)((0,a.jsx)("section",{ref:f,className:h.floating,"data-whale-panel":!0,"data-view":u,"data-collapsed":p||void 0,"data-source-pending":l.sourcePending||void 0,"data-motion":c.motion,tabIndex:0,"aria-label":e.t("drag"),title:e.t("dragHint"),onPointerDownCapture:()=>e.geometry.activate?.(),onFocusCapture:()=>e.geometry.activate?.(),onPointerDown:_=>{if(_.button!==0||_.pointerType&&_.pointerType!=="mouse"||!eu(_.target,_.currentTarget)){i.current=null;return}let Z=_.target,K=Z.getBoundingClientRect?.();K&&Z.scrollHeight>Z.clientHeight&&Z.offsetWidth>Z.clientWidth&&_.clientX>=K.left+Z.clientLeft+Z.clientWidth||(i.current={id:_.pointerId,x:_.clientX,y:_.clientY,moved:!1},_.target.closest?.("button")||_.currentTarget.focus({preventScroll:!0}),e.geometry.pointerDown(_,_.target.closest?.("[data-drag-surface]")??_.currentTarget))},onPointerMove:_=>{let Z=i.current;!Z||_.pointerId!==Z.id||(Math.hypot(_.clientX-Z.x,_.clientY-Z.y)>=4&&(Z.moved=!0),e.geometry.pointerMove(_))},onPointerUp:_=>{_.nativeEvent?.isTrusted&&i.current?.id===_.pointerId&&i.current.moved&&e.recordUserOperation?.("panel-move"),e.geometry.pointerEnd(_)},onPointerCancel:_=>{e.geometry.pointerEnd(_),i.current=null},onLostPointerCapture:e.geometry.pointerEnd,onClickCapture:_=>{i.current?.moved&&_.detail!==0?(_.preventDefault(),_.stopPropagation()):y(_),i.current=null},onChangeCapture:y,onSubmitCapture:y,onKeyDownCapture:y,onKeyDown:_=>{_.key==="Escape"&&(_.stopPropagation(),u==="setup"&&!p?v():u==="settings"?e.showHome():p||v())},children:(0,a.jsx)("div",{ref:m,className:h.panelViewport,"data-whale-content":!0,children:e.renderSlot("whale-ear.panel.controls",{collapsed:p,collapse:v,expand:b})})}),document.body)}var Wu=()=>()=>{};function Ou(e){let{controlContext:n}=e,t=(0,$.useSyncExternalStore)(n?.subscribe??Wu,()=>n?n.sourceFor(n.selectedSession()):e.sessionId??null),r=(0,$.useSyncExternalStore)(n?.subscribe??Wu,()=>{let f=n?.currentConversation();return f===t?f:null});e={...e,sessionId:t,currentConversationId:r};let o=e.useWhaleUi(f=>f),[i,s]=(0,$.useState)(!1);(0,$.useLayoutEffect)(()=>{e.setSession?.(t)},[t]);let c=Ku(o),l=o.updates?.release?.version,d=!e.collapsed&&!c&&!fo(o)&&o.panelView==="home"&&o.checkedFor===e.sessionId&&o.status?.enabled===!1&&o.status.ownerSessionId===null&&!o.status.voiceControlBusy&&o.status.voiceSession?.fullyStopped!==!1&&!o.busy&&!o.uncertain&&!o.updatesUnavailable&&o.updates?.status==="available"&&l&&l!==o.dismissedUpdateVersion;if((0,$.useEffect)(()=>{d&&s(!0)},[d]),c||fo(o)){let f=fo(o);return(0,a.jsxs)(a.Fragment,{children:[e.collapsed&&(0,a.jsx)(Ru,{t:e.t,expand:e.expand}),c?(0,a.jsx)("div",{hidden:e.collapsed,children:(0,a.jsx)(Wh,{state:o,save:e.saveAuthorization,close:f?e.collapse:e.closeAuthorization,continueSetup:f?()=>e.closeAuthorization({resumeSetup:!0}):null})}):(0,a.jsx)("div",{role:"dialog","aria-modal":"false","aria-label":"\u9C7C\u5E94\u9996\u6B21\u914D\u7F6E","data-whale-setup":!0,hidden:e.collapsed,children:(0,a.jsx)(Eu,{pickPath:e.pickPath,state:o,sessionId:e.sessionId,run:e.run,onDismiss:e.dismissSetup,onMinimize:e.collapse,onBackToAuthorization:e.openAuthorization,asrStatus:(0,a.jsx)(Mu,{action:e.whisperAsrAction,active:!e.collapsed})})})]})}let u=f=>{s(!0),f&&e.updateAction?.({action:"check"})},p=()=>{e.dismissUpdate?.(l),s(!1)};return(0,a.jsxs)(a.Fragment,{children:[o.panelView==="settings"?(0,a.jsx)(Lh,{...e,openUpdate:u}):(0,a.jsx)(Ih,{...e}),i&&(0,a.jsx)(hu,{state:o,close:p,run:e.updateAction,t:e.t})]})}function Wh({state:e,save:n,close:t,continueSetup:r}){let o=e.authorization,i=e.authorizationBusy||e.authorizationLoading,s=o?.usageAgreement?.accepted===!0,c=o?.usageAgreement?.text??[];return(0,a.jsxs)("section",{role:"dialog","aria-modal":"false","aria-label":"\u9C7C\u5E94\u4F7F\u7528\u534F\u8BAE","data-whale-authorization":!0,"data-whale-intrinsic":!0,className:`${h.settings} ${h.authorization}`,children:[(0,a.jsxs)("header",{className:h.settingsHeader,children:[(0,a.jsx)(Xn,{}),(0,a.jsx)("h2",{children:s?"\u9C7C\u5E94\u4F7F\u7528\u534F\u8BAE":"\u6B22\u8FCE\u4F7F\u7528\u9C7C\u5E94"}),s&&!r&&(0,a.jsx)(j.Button,{variant:"outline",disabled:i,onClick:t,children:"\u8FD4\u56DE"})]}),(0,a.jsx)("div",{className:h.authorizationBody,"data-whale-authorization-body":!0,"data-no-drag":!0,children:(0,a.jsxs)("div",{"data-whale-natural-content":!0,children:[!s&&(0,a.jsx)("p",{className:h.authorizationSteps,children:"1 \u4F7F\u7528\u534F\u8BAE\u3000\xB7\u30002 \u57FA\u7840\u914D\u7F6E"}),(0,a.jsx)("h3",{children:"\u9C7C\u5E94\u64CD\u4F5C\u8303\u56F4"}),(0,a.jsx)("div",{className:h.agreement,children:c.map(l=>(0,a.jsx)("p",{children:l},l))}),e.authorizationLoading&&!o&&(0,a.jsx)("p",{role:"status",className:h.hint,children:"\u6B63\u5728\u8BFB\u53D6\u2026"}),o&&(0,a.jsxs)("details",{className:h.section,children:[(0,a.jsx)("summary",{children:"\u670D\u52A1\u4E0E\u6A21\u578B\u6765\u6E90"}),(0,a.jsx)("ul",{className:h.permissionList,children:o.scopes.map(l=>(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:l.title}),(0,a.jsx)("p",{className:h.hint,children:l.description})]},l.id))}),o.modelSources.map(l=>(0,a.jsxs)("div",{children:[(0,a.jsx)("strong",{children:l.modelId}),(0,a.jsx)("p",{className:h.hint,children:l.source}),l.runtime&&(0,a.jsxs)("p",{className:h.hint,children:["\u8FD0\u884C\u7EC4\u4EF6\uFF1A",(l.runtime.sources??[l.runtime.source]).join("\u3001")]}),(0,a.jsx)("p",{className:h.hint,children:l.licenseNote}),l.licenseUrls.map(d=>(0,a.jsx)("p",{className:h.hint,children:(0,a.jsx)("a",{href:d,target:"_blank",rel:"noreferrer",children:d})},d))]},l.modelId))]}),(e.authorizationError||o?.revocationUnconfirmed)&&(0,a.jsx)("p",{role:"alert",className:h.error,children:o?.revocationUnconfirmed?"\u505C\u6B62\u8BBE\u5907\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u68C0\u67E5\u6216\u91CD\u542F\u5BBF\u4E3B\u3002":e.authorizationUncertain?"\u4FDD\u5B58\u7ED3\u679C\u5F85\u786E\u8BA4\uFF0C\u6B63\u5728\u6838\u67E5\u3002":"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"})]})}),(0,a.jsxs)("div",{className:`${h.actions} ${h.authorizationActions}`,children:[(0,a.jsx)(j.Button,{className:h.primary,variant:"primary",disabled:!o||i||e.authorizationUncertain,onClick:()=>s&&o?.granted?(r??t)():void n(!0),children:s&&o?.granted?r?"\u7EE7\u7EED\u914D\u7F6E":"\u8FD4\u56DE":"\u4E00\u952E\u6388\u6743\u5E76\u7EE7\u7EED"}),(0,a.jsx)(j.Button,{variant:"outline",disabled:i,onClick:s&&o?.granted&&!r?()=>{n(!1)}:t,children:s&&o?.granted?r?"\u7A0D\u540E":"\u64A4\u9500\u6388\u6743":"\u6682\u4E0D\u4F7F\u7528"})]}),!s&&(0,a.jsx)("p",{className:h.hint,children:"\u4E0B\u4E00\u6B65\uFF1A\u9009\u62E9\u8BF4\u8BDD\u65B9\u5F0F\u4E0E\u8BED\u97F3\u6A21\u578B"})]})}function Ru({t:e,expand:n,markState:t="idle",compactState:r="off",enabled:o=!1}){return(0,a.jsxs)(j.Button,{className:h.bubble,"data-whale-reopen":!0,"data-whale-operation":"panel-open","data-drag-surface":!0,"aria-label":e("reopen"),title:e("title"),onClick:n,children:[(0,a.jsx)(Xn,{small:!0,state:t}),(0,a.jsx)("span",{className:h.bubbleBrand,children:e("title")}),(0,a.jsxs)("span",{className:h.bubbleStatus,"data-voice-state":r,children:[(0,a.jsx)(Ue,{name:o===!1?"micOff":"mic"}),(0,a.jsx)("span",{children:e("compact_"+r)})]}),(0,a.jsx)("span",{className:h.voiceBars,"data-active":r==="listening"||void 0,"aria-hidden":"true",children:[0,1,2,3,4].map(i=>(0,a.jsx)("i",{},i))}),(0,a.jsx)(Ue,{name:"down"})]})}function Ih(e){let{t:n,sessionId:t}=e,r=e.useWhaleUi(ae=>ae),o=r.status,i=r.busy,s=r.checkedFor===t,c=r.uncertain||!s,l=e.useWhalePreferences(ae=>ae),d=sr(o),u=d&&r.conversationFor===t&&r.conversation?.rootSessionId===d&&!c?r.conversation:null,p=r.conversationHistoryFor===t&&!c&&(!o?.enabled||u?.rootSessionId===r.conversationHistory?.rootSessionId)?r.conversationHistory:null,f=u??{rootSessionId:p?.rootSessionId??null,items:[],latest:p?.items?.filter(ae=>ae.role==="assistant").at(-1)??null},m=!!(o?.enabled&&(r.conversationError||r.conversationFor===t&&r.conversation?.rootSessionId!==d)),y=o?.voiceSession?.recovery?.kind?.startsWith("helper-"),v=["predecessor-cleanup-pending","helper-cleanup-pending"].includes(o?.voiceSession?.recovery?.kind),b=["predecessor-stop-unconfirmed","helper-stop-unconfirmed"].includes(o?.voiceSession?.recovery?.kind)||/VOICE_(PREDECESSOR|HELPER)_STOP_UNCONFIRMED/.test(r.error??""),_=o?.voiceSession?.recovery?.kind==="live-root-conflict"||/VOICE_ROOT_OWNED_ELSEWHERE/.test(r.error??""),Z=u?.helper??o?.helper,K=r.listenModePending?r.listenModeBefore:u?.helper&&u.revision!==r.listenModeReceiptRevision?u.helper.listenMode:o?.listenMode,O=!!(o?.enabled&&Z?.online===!1),N=m||!!(o?.enabled&&K==null),T=!c&&!O&&!N&&mt.includes(K),P=i||!T||v||b||_||!o?.capabilities?.listenMode||o?.voiceControlBusy||r.visibilityUncertain||r.ttsUncertain||r.ttsCancelling,E=o?.enabled?u?.inputError:null,k=!o?.enabled&&r.enableError,S=Eh[/VOICE_EXISTING_(ARCHIVED|BUSY|UNAVAILABLE)/.exec(k??"")?.[1]],C=/VOICE_EXISTING_BINDING_CHANGED/.test(k??""),R=k&&r.settings?.voiceSession?.performanceMode==="fast"&&/VOICE_EXACT_EFFORT_HOST_REQUIRED|VOICE_FAST_/.test(k),z=t&&o?.ownerSessionId&&o.ownerSessionId!==t&&d!==t,A=o?.existingVoiceSession,I=A?.sessionId,V=r.existingSessionWritePending||r.existingSessionUnconfirmed,B=o&&!c&&r.checkedFor===t&&!V,F=B&&o.existingVoiceSession,X=B?F?Pt(F):n("dedicatedVoiceTarget"):n("checkingVoiceTarget"),ue=(0,$.useId)(),de=(0,$.useId)(),Q=o?.enabled&&F&&u?.retryTranscripts?.sessionId===F.sessionId?u.retryTranscripts.items:[],q=o?.existingVoiceSessionSupported===!0&&Object.hasOwn(o,"existingVoiceSession")&&e.listExistingVoiceSessions&&e.setExistingVoiceSession,W=q&&ao(r,t),ne=e.currentConversationId&&q&&o.enabled===!1,pe=!!(!F&&!V&&r.checkedFor===t&&o&&!i&&!o.voiceControlBusy&&!c&&!r.ttsUncertain&&!r.ttsCancelling&&!v&&!_&&!b&&!z),ge=u?.wake??o?.wake,Ie=v?"pending":b||_||c||N||O?"unknown":i?"pending":u?.inputActive===!0?"input-active":o?.enabled?"authorized":"idle",[Le,Ge]=(0,$.useState)(null),[at,Cn]=(0,$.useState)(!1),Ee=Le==="targets"&&q&&o.enabled===!1,ie=(0,$.useRef)(!1),Be=r.settingsFor===t?r.settings?.values:null,Je=Be?.pttKeyboard?[...Be.pttKeyboard.modifiers||[],Be.pttKeyboard.code].join(" + "):Be?.pttMouse?n("sideButton")+" "+Be.pttMouse:null,Pn=(0,$.useRef)({}),lt=()=>{ie.current=!0,Ge(null)};(0,$.useLayoutEffect)(()=>{Ge(ae=>e.collapsed||ae==="targets"?null:ae),Cn(!1)},[t,e.collapsed]),(0,$.useEffect)(()=>{Cn(!1),I&&Ge(ae=>ae==="conversation"?null:ae)},[I]),(0,$.useEffect)(()=>{o?.enabled&&Ge(ae=>ae==="targets"?null:ae)},[o?.enabled]),(0,$.useEffect)(()=>{Ee||!W||!ie.current||!Pn.current.targets||(ie.current=!1,Pn.current.targets.focus())},[Ee,W,e.collapsed]),(0,$.useEffect)(()=>{!c&&!I&&Le==="conversation"&&o?.enabled===!1&&e.run(t,"read-history")},[Le,c,o?.enabled,t,I]);let go=Vd({enabled:o?.enabled,active:u?.inputActive===!0,unknown:!o||c||N||O||b||_||!!E,pending:i||v}),fn=()=>!I&&Le==="conversation"&&(0,a.jsx)(cu,{conversation:f,history:p,historyLoading:r.sourcePending||!c&&r.conversationHistoryLoading,historyError:c?null:r.conversationHistoryError,historyRetryCursor:r.conversationHistoryRequestCursor,loadHistory:ae=>e.run(t,"read-history",ae?{cursor:ae}:{}),assistantName:l.assistantName||n("assistant"),setAssistantName:e.setAssistantName,t:n,close:()=>{Ge(null),Pn.current.conversation?.focus()}},f.rootSessionId??"empty");return e.collapsed?(0,a.jsx)(Ru,{t:n,expand:e.expand,markState:Ie,compactState:go,enabled:o?.enabled??null}):(0,a.jsxs)("div",{className:h.panelContent,"data-home-controls":!0,"data-has-transcript-retry":Q.length>0||void 0,"data-home-layout":[o?o.enabled?"active":"idle":"loading",ho(r,t),!!(r.error||k),!!E,O,v,b,!!F].join(":"),"data-size-detail":Le==="conversation"||Ee?"true":"false",onKeyDown:ae=>{!Ee||ae.key!=="Escape"||(ae.preventDefault(),ae.stopPropagation(),lt())},children:[(0,a.jsxs)("div",{className:h.header,children:[(0,a.jsxs)("span",{className:h.brand,children:[(0,a.jsx)(Xn,{state:Ie}),(0,a.jsx)("strong",{children:n("title")})]}),(0,a.jsxs)("div",{className:h.headerActions,children:[(0,a.jsxs)(j.Button,{className:h.newChatButton,"data-whale-operation":"new-voice-session","aria-label":n("newChat"),title:F?"\u89E3\u9664\u5DF2\u6709\u4F1A\u8BDD\u7ED1\u5B9A\u540E\u53EF\u65B0\u5EFA\u9C7C\u5E94\u4F1A\u8BDD":n(z?"newChatOtherOwner":o?.enabled?"newChatActive":"newChat"),disabled:!pe,onClick:()=>{e.run(t,"new",{expectedOwnerSessionId:o.ownerSessionId})},children:[(0,a.jsx)(Ue,{name:"plus"}),(0,a.jsx)("span",{children:n("newChat")})]}),(0,a.jsx)(j.Button,{"data-whale-settings-trigger":!0,"data-whale-operation":"page-settings",className:h.iconButton,"aria-label":n("settings"),title:n("settings"),onClick:e.openSettings,children:(0,a.jsx)(Ue,{name:"settings"})}),(0,a.jsx)(j.Button,{"data-whale-operation":"panel-close",className:h.iconButton,"aria-label":n("collapse"),title:n("collapseHint"),onClick:e.collapse,children:(0,a.jsx)(Ue,{name:"minus"})})]})]}),(0,a.jsxs)("div",{className:h.statusRow,"data-bound":!!F||void 0,"data-recording":Ie==="input-active"||void 0,children:[(0,a.jsx)("div",{id:ue,className:h.voiceTarget,"data-whale-voice-target":!0,children:q?(0,a.jsxs)(j.Button,{ref:ae=>{Pn.current.targets=ae},variant:"outline",className:h.existingSessionHome,"data-whale-bound-session":F?!0:void 0,"data-whale-target-trigger":!0,title:X,"aria-expanded":!!Ee,"aria-controls":Ee?de:void 0,disabled:!Ee&&!W,onClick:()=>Ee?lt():Ge("targets"),children:[(0,a.jsx)("span",{children:n("voiceTarget")}),(0,a.jsx)("strong",{className:h.ellipsis,children:X}),(0,a.jsx)(Ue,{name:Ee?"down":"chevron"})]}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("span",{children:n("voiceTarget")}),(0,a.jsx)("strong",{className:h.ellipsis,title:X,children:X})]})}),(0,a.jsxs)("div",{className:h.voiceStatus,children:[(0,a.jsx)(Ue,{name:o?.enabled?"mic":"micOff"}),(0,a.jsx)("span",{className:h.status,role:"status",children:r.listenModePending?n(o?.enabled?"modeSwitching":"modeSaving"):i?n("pending"):o?v?n("voiceCleanupPending"):b?n("voiceRestartPending"):_?n("voiceRecoveryPending"):c?n("stale"):O?n("voiceInputUnavailable"):N?n("unknown"):E?n("inputError_"+E):u?.inputActive===!0?n("inputActive"):o.enabled&&K==="wake"?n(Xi(ge)):o.enabled?n("enabled"):n("disabled"):n("unknown")})]})]}),Ee?(0,a.jsx)(Ii,{...e,state:r,homePickerId:de,closeHomePicker:lt}):(0,a.jsxs)(a.Fragment,{children:[ne&&(0,a.jsx)(uu,{...e,sessionId:e.currentConversationId,boundSession:A,state:r},e.currentConversationId),(0,a.jsxs)("div",{className:h.quickActions,children:[(0,a.jsx)(j.Button,{"data-whale-operation":o?.enabled||_?"stop-voice":"start-voice",className:`${h.mainAction} ${o?.enabled?"":h.primary}`,variant:o?.enabled?"outline":"primary","aria-describedby":ue,disabled:!s||!!V||i&&!(o?.enabled&&r.interruptibleRead&&!r.diagnosticStopPending)||v||b&&!o?.enabled||!o||c&&!_&&!O||!o.enabled&&!_&&(!B||F&&!Rn(F)),title:o?.enabled?n("stopConsequence"):void 0,onClick:()=>{e.run(t,o?.enabled||_?"disable":"enable",o?.enabled||_?{}:{expectedOwnerSessionId:null,expectedExistingSessionId:F?.sessionId??null})},children:v?n("voiceCleanupPending"):b?n(o?.enabled?"endConversation":"voiceRestartPending"):_?n("voiceRecoveryCheck"):o?.enabled?n("endConversation"):n("startConversation")}),(0,a.jsx)("div",{className:h.quickSegments,role:"group","aria-label":n("mode"),"aria-busy":!!r.listenModePending,"data-listen-mode":T?K:"unknown",children:mt.map(ae=>(0,a.jsx)(j.Button,{"data-whale-operation":`listen-mode-${ae}`,"aria-pressed":T&&K===ae,disabled:!!P,onClick:()=>{K!==ae&&e.run(t,"listen-mode",{mode:ae})},children:n(_r(ae))},ae))})]}),Q.length>0&&(0,a.jsx)(Gh,{items:Q,pending:r.transcriptRetry,busy:i,retry:ae=>e.retryVoiceTranscript?.(t,ae),t:n}),(!o||c||v||b||_)&&(0,a.jsx)("p",{className:h.hint,"data-home-important":v||b||_||void 0,children:n(v?y?"voiceHelperCleanupHint":"voiceCleanupHint":b?y?"voiceHelperRestartHint":"voiceRestartHint":_?"voiceRecoveryHint":i?"readingStatus":"statusRetry")}),!c&&(!N||O)&&o?.enabled&&!v&&!b&&(0,a.jsx)("p",{className:h.hint,"data-whale-input-hint":!0,"data-home-important":E||O?!0:void 0,children:O?n("voiceInputRecoveryHint"):E?n("inputHelp_"+E):K==="wake"?n(ge?.streamOpen&&ge.detection==="asr-after-utterance"?"wakeFallbackHint":"wakeHint"):K==="always"?n("alwaysWarning"):Je?n("holdToSpeak")+" "+Je:n("bindingMissing")}),o&&!c&&!o.capabilities?.listenMode&&(0,a.jsx)("p",{className:h.hint,children:n("modeUnavailable")}),r.listenModeError&&(0,a.jsx)("p",{role:"alert","data-whale-mode-error":!0,className:h.error,children:n(r.uncertain?"modeSwitchUnconfirmed":"modeSwitchFailed")}),r.readOnlyFailure&&c&&!_&&!b&&(0,a.jsx)(j.Button,{variant:"outline",disabled:i,onClick:()=>{e.run(t,"status")},children:n("retryStatus")}),(r.error||k)&&!r.readOnlyFailure&&!S&&!r.listenModeError&&!_&&!b&&(0,a.jsx)("p",{role:"alert",className:h.error,children:n(C?"voiceTargetChanged":R?"performanceFastUnavailable":!r.uncertain&&k?"enableFailed":"operationUnavailable")}),S&&(0,a.jsxs)("p",{role:"alert",className:h.notice,children:[S," ",(0,a.jsx)(j.Button,{variant:"outline",disabled:!W,onClick:()=>Ge("targets"),children:"\u7BA1\u7406\u7ED1\u5B9A"})]}),/VOICE_SESSION_ARCHIVED/.test(k??r.error??"")&&(0,a.jsxs)("p",{className:h.notice,children:["\u539F\u8BED\u97F3\u4F1A\u8BDD\u5DF2\u5F52\u6863\u3002",(0,a.jsx)(j.Button,{variant:"outline",onClick:()=>{e.openSettings("sessions")},children:"\u6062\u590D\u539F\u4F1A\u8BDD"})]}),/VOICE_ASR_(?:PREPARING|PREPARE_FAILED)/.test(k??r.error??"")&&(0,a.jsxs)("p",{className:h.notice,children:["Whisper Base \u5C1A\u672A\u5C31\u7EEA\u3002",(0,a.jsx)(j.Button,{variant:"outline",onClick:()=>{e.openSettings("models","download")},children:"\u67E5\u770B\u6A21\u578B\u8FDB\u5EA6"})]}),/VOICE_MODEL_REQUIRED/.test(k??r.error??"")&&(0,a.jsxs)("p",{className:h.notice,children:["\u8BF7\u5148\u9009\u62E9\u53EF\u7528\u7684\u5BF9\u8BDD\u6A21\u578B\u3002",(0,a.jsx)(j.Button,{variant:"outline",onClick:()=>{e.openSettings("models","conversation")},children:"\u8BBE\u7F6E\u5BF9\u8BDD\u6A21\u578B"})]}),F&&!Rn(F)&&(0,a.jsx)("p",{className:h.hint,"data-home-important":!0,children:so(F)}),u?.providerError&&(0,a.jsx)("p",{role:"alert","data-home-important":!0,"data-whale-provider-error":!0,className:h.error,children:u.providerError}),(0,a.jsx)(du,{...e,state:r}),!F&&!r.error&&!E&&!_&&!b&&!v&&!O&&!N&&(0,a.jsx)(Kh,{...e,state:r}),at&&(0,a.jsx)("p",{role:"alert",className:h.notice,children:"DSH \u6682\u65F6\u65E0\u6CD5\u6253\u5F00\u539F\u4F1A\u8BDD\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"}),Rn(F)&&e.openExistingVoiceSession&&(0,a.jsxs)(j.Button,{className:h.caption,"data-whale-operation":"open-native-session","aria-label":"\u6253\u5F00\u539F\u4F1A\u8BDD",onClick:async()=>{Cn(!1);try{await e.openExistingVoiceSession(F.sessionId)}catch{Cn(!0)}},children:[u?.latest?.text&&(0,a.jsx)("span",{className:h.ellipsis,children:u.latest.text}),(0,a.jsx)("span",{className:h.openOriginal,children:"\u6253\u5F00\u539F\u4F1A\u8BDD"}),(0,a.jsx)(Ue,{name:"chevron"})]}),o&&!I&&(0,a.jsxs)(j.Button,{ref:ae=>{Pn.current.conversation=ae},className:h.caption,onClick:()=>{let ae=Le!=="conversation";Ge(ae?"conversation":null),ae&&e.run(t,"read-history")},"aria-label":n("recentConversation"),"aria-expanded":Le==="conversation",children:[(0,a.jsxs)("span",{className:h.ellipsis,children:[f.latest?.state==="speech-failed"?n("speechFailed")+": ":f.latest?.state==="interrupted"?n("speechInterrupted")+": ":"",f.latest?.text??n(r.newChatFor===t?"newChatCreated":"viewConversation")]}),(0,a.jsx)(Ue,{name:"chevron"})]}),fn()]})]})}function Gh({items:e,pending:n,busy:t,retry:r,t:o}){let i=(0,$.useId)();return(0,a.jsxs)("section",{className:h.transcriptRetries,"aria-labelledby":i,"data-whale-transcript-retries":!0,"data-no-drag":!0,children:[(0,a.jsxs)("header",{children:[(0,a.jsx)("h2",{id:i,children:o("retryTranscripts")}),(0,a.jsx)("p",{children:o("endDiscardsRetries")})]}),(0,a.jsx)("ul",{className:h.transcriptRetryList,tabIndex:0,"aria-labelledby":i,children:e.map(s=>{let c=n?.id===s.id&&s.state==="ready"?n.state:s.state,l={busy:"retryTranscriptBusy",sending:"retryTranscriptSending",uncertain:"retryTranscriptUncertain"}[c];return(0,a.jsxs)("li",{className:h.transcriptRetry,"data-retry-state":c,children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:h.transcriptRetryText,children:s.text}),l&&(0,a.jsx)("p",{className:h.hint,role:"status",children:o(l)})]}),(0,a.jsx)(j.Button,{variant:"outline",disabled:t||!!n||c!=="ready",onClick:()=>{r(s.id)},"data-whale-operation":"retry-voice-transcript",children:o("retryTranscript")})]},s.id)})})]})}function ho(e,n){let t=e.status;return!!(e.settings?.revision&&e.checkedFor===n&&e.settingsFor===n&&!e.uncertain&&!e.visibilityUncertain&&!e.settingsConflict&&!e.ttsUncertain&&!e.ttsCancelling&&t?.enabled===!1&&t.ownerSessionId===null&&t.voiceControlBusy===!1&&t.voiceSession?.fullyStopped===!0&&t.voiceSession?.id===null)}function Kh({state:e,sessionId:n,t,run:r,readState:o}){let i=(0,$.useRef)(0);(0,$.useEffect)(()=>()=>{i.current++},[n]);let s=ho(e,n),c=e.settings?.voiceSession?.performanceMode,l=e.performanceFor===n?e.performance:null,d=["fast","balanced","high"],u=l?.modes?.some(m=>m.performanceMode===c&&!m.available),p=e.busy||e.performancePending||e.uncertain||e.visibilityUncertain||!s,f=async m=>{if(p||m===c)return;let y=++i.current;if(m!=="compatibility"&&!await r(n,"inspect-performance")||y!==i.current)return;let v=o?.();!v||!ho(v,n)||v.busy||m!=="compatibility"&&(v.performanceFor!==n||!v.performance?.modes?.find(b=>b.performanceMode===m)?.available)||await r(n,"set-performance-mode",{revision:v.settings.revision,performanceMode:m})};return s?(0,a.jsxs)("section",{className:h.quickSpeed,"aria-label":t("performanceTitle"),children:[(0,a.jsxs)("div",{className:h.quickSpeedHeader,children:[(0,a.jsx)("span",{children:t("performanceTitle")}),c==="compatibility"&&(0,a.jsx)("small",{children:t("performance_compatibility")})]}),(0,a.jsx)("div",{className:h.quickSegments,children:d.map(m=>(0,a.jsxs)(j.Button,{"aria-pressed":c===m,disabled:p||!!Mi(l,m),title:t(Mi(l,m)||(m==="fast"?"performanceFastHint":"performance_"+m)),onClick:()=>{f(m)},children:[c===m&&(0,a.jsx)(Ue,{name:"check"}),(0,a.jsx)(Du,{value:m,t})]},m))}),(0,a.jsx)(Hu,{capability:l,t,compact:!0,pending:e.performancePending,error:e.performanceError}),u&&(0,a.jsx)(j.Button,{variant:"outline",disabled:p,onClick:()=>{f("compatibility")},children:t("performance_compatibility")})]}):null}function $h({settings:e,sessionId:n,busy:t,run:r,t:o,status:i,verified:s,statusFresh:c,tab:l,markSettingsEdited:d,discardSettingsDraft:u,bindingError:p,captureBindings:f}){let[m,y]=(0,$.useState)(e.values.device??null),[v,b]=(0,$.useState)(e.values.pttMouse),[_,Z]=(0,$.useState)(e.values.pttKeyboard??null),[K,O]=(0,$.useState)(e.values.speakerVerification.enabled),N=e.capabilities?.turnSignals===!0,[T,P]=(0,$.useState)(e.values.turnSignals?.enabled??!1),[E,k]=(0,$.useState)(e.values.turnSignals?.volume?.toString()??""),[S,C]=(0,$.useState)((e.values.wakeWordAliases??["\u5C0F\u9CB8\u9C7C"]).join("\uFF0C")),[R,z]=(0,$.useState)(String((e.values.wakeListenTimeoutMs??1e4)/1e3)),A=Qi(S),I=wr(A)&&Number.isInteger(Number(R)*1e3)&&Number(R)>=3&&Number(R)<=30,V=JSON.stringify(A)!==JSON.stringify(e.values.wakeWordAliases??["\u5C0F\u9CB8\u9C7C"])||Number(R)*1e3!==(e.values.wakeListenTimeoutMs??1e4),[B,F]=(0,$.useState)(e.values.semanticExperimental===!0),[X,ue]=(0,$.useState)(e.values.turnSignals?.headphonesConfirmed??!1),[de,Q]=(0,$.useState)(e.values.turnSignals?.experimentalAutomaticBargeIn??!1),q=v!==e.values.pttMouse||JSON.stringify(_)!==JSON.stringify(e.values.pttKeyboard??null),[W,ne]=(0,$.useState)(!1),pe=c?i?.inputDevices:null,ge=m!==null&&typeof m=="object",Ie=ge||m==null||m===""||pe?.items?.some(ie=>typeof m=="number"&&ie.index===m),Le=W==="index"&&(String(m??"").trim()===""||!/^\d+$/.test(String(m).trim())||!Number.isSafeInteger(Number(m))),Ge=t||!c||i?.enabled!==!1||i?.ownerSessionId!==null||i?.voiceControlBusy!==!1||i?.voiceSession?.fullyStopped!==!0,at=()=>{if(t||!I||Le||V&&Ge)return;let ie=ge&&!W?m:W==="index"?Number(m):m==null||m===""?null:W==="name"?String(m).trim():typeof m=="number"?m:m.trim();r(n,"save-settings",{revision:e.revision,values:{wakeWordAliases:A,wakeListenTimeoutMs:Number(R)*1e3,semanticExperimental:B,device:ie,pttMouse:e.values.pttMouse,...e.capabilities?.pttKeyboard?{pttKeyboard:e.values.pttKeyboard??null}:{},speakerVerification:{enabled:K},...N?{turnSignals:{enabled:T,volume:Number(E),headphonesConfirmed:X,experimentalAutomaticBargeIn:de}}:{}}})},Cn=(0,a.jsx)(j.Button,{className:h.primary,variant:"primary",disabled:t||!I||Le||V&&Ge||N&&(E.trim()===""||!Number.isFinite(Number(E))||Number(E)<0||Number(E)>1),onClick:at,children:o(t?"pending":"save")}),Ee=ge?m.name:pe?.items?.find(ie=>ie.index===m)?.name??(m==null||m===""?o("deviceDefault"):String(m));return(0,a.jsxs)("div",{className:h.section,"data-settings-draft":"save-settings",children:[(0,a.jsxs)("div",{hidden:l!=="audio",className:h.section,children:[(0,a.jsx)("h3",{children:o("mode")}),(0,a.jsxs)("p",{className:h.hint,children:["\u5F53\u524D\uFF1A",o(_r(i?.listenMode??e.listenMode))]}),(0,a.jsx)("div",{className:h.segmented,children:["ptt","always","wake"].map(ie=>(0,a.jsx)(j.Button,{"data-whale-operation":`listen-mode-${ie}`,variant:"outline","aria-pressed":(i?.listenMode??e.listenMode)===ie,disabled:!e.capabilities?.listenMode||!s||t,onClick:()=>{r(n,"listen-mode",{mode:ie})},children:o(_r(ie))},ie))}),(!e.capabilities?.listenMode||!s)&&(0,a.jsx)("p",{className:h.hint,children:o(e.capabilities?.listenMode?"modeNeedsGrant":"modeUnavailable")}),(0,a.jsxs)("div",{className:h.inlineActions,children:[(0,a.jsxs)("label",{className:h.inlineField,children:[o("device"),(0,a.jsxs)("select",{title:Ee,className:h.deviceSelect,"aria-label":o("device"),disabled:t,value:W?"__manual-"+W:ge?"__stable":Ie?m??"":"__saved",onChange:ie=>{let Be=ie.target.value;Be.startsWith("__manual-")?(ne(Be.slice(9)),ge&&y("")):Be!=="__saved"&&Be!=="__stable"&&(ne(!1),y(Be===""?null:Number(Be)))},children:[(0,a.jsx)("option",{value:"",children:o("deviceDefault")}),ge&&(0,a.jsx)("option",{value:"__stable",children:m.name}),pe?.items?.map(ie=>(0,a.jsxs)("option",{value:String(ie.index),children:[ie.name," (",ie.index,")"]},ie.index)),!Ie&&(0,a.jsxs)("option",{value:"__saved",children:[o("deviceSaved"),": ",m]}),(0,a.jsx)("option",{value:"__manual-index",children:o("deviceManualIndex")}),(0,a.jsx)("option",{value:"__manual-name",children:o("deviceManualName")})]})]}),Cn]}),Ee.length>22&&(0,a.jsxs)("details",{className:h.fullName,children:[(0,a.jsx)("summary",{children:"\u67E5\u770B\u8BBE\u5907\u5168\u540D"}),(0,a.jsx)("p",{children:Ee})]}),(W||!Ie)&&(0,a.jsxs)("label",{className:h.field,children:[o("deviceManual"),(0,a.jsx)(j.Input,{"aria-label":o("deviceManual"),disabled:t,value:m??"",onChange:ie=>{W||ne(typeof m=="number"?"index":"name"),y(ie.target.value)}})]}),Le&&(0,a.jsx)("p",{className:h.notice,children:o("deviceIndexInvalid")}),pe?.status!=="available"&&(0,a.jsx)("p",{className:h.hint,children:o(pe?.status==="empty"?"deviceEmpty":"deviceUnknown")})]}),(0,a.jsx)("div",{hidden:l!=="interaction",className:h.section,children:(0,a.jsxs)("div",{className:h.bindingEditor,"data-settings-draft":"save-bindings",children:[(0,a.jsx)(Mh,{captureBindings:f,sessionId:n,active:l==="interaction",value:_,onChange:ie=>{d?.("save-bindings"),Z(ie)},capability:e.capabilities?.pttKeyboard,disabled:t||!c,t:o}),(0,a.jsxs)("fieldset",{className:`${h.radios} ${h.mouseBinding}`,disabled:t||!c,children:[(0,a.jsx)("legend",{children:o("sideButton")}),[0,1,2].map((ie,Be)=>(0,a.jsxs)("label",{children:[(0,a.jsx)("input",{type:"radio",name:"whale-ear-mouse",value:ie,checked:v===ie,onChange:()=>{d?.("save-bindings"),b(ie)}}),o(["sideOff","sideOne","sideTwo"][Be])]},ie))]}),p&&(0,a.jsx)("p",{role:"alert",className:h.notice,children:/RECORDING|KEYS_HELD/.test(p)?"\u8BF7\u5148\u677E\u5F00\u6309\u952E\uFF0C\u7B49\u5F85\u5F55\u97F3\u5904\u7406\u5B8C\u6210\uFF0C\u518D\u4FDD\u5B58\u3002":/UNCONFIRMED|STOP_UNCONFIRMED|ROLLBACK_UNCONFIRMED/.test(p)?"\u6309\u952E\u72B6\u6001\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u91CD\u542F DSH \u518D\u6838\u67E5\u6309\u952E\u3002":/STALE|配置已改变|语音会话已改变/.test(p)?"\u914D\u7F6E\u6216\u8BED\u97F3\u4F1A\u8BDD\u5DF2\u6539\u53D8\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6\u540E\u518D\u4FDD\u5B58\u3002":/UNSUPPORTED/.test(p)?"\u5F53\u524D\u7CFB\u7EDF\u4E0D\u652F\u6301\u5728\u5BF9\u8BDD\u4E2D\u66F4\u6362\u5168\u5C40\u6309\u952E\u3002":"\u672A\u80FD\u4FDD\u5B58\u6309\u952E\uFF0C\u8BF7\u67E5\u770B\u9AD8\u7EA7\u8BE6\u60C5\u3002"}),(0,a.jsxs)("div",{className:`${h.actions} ${h.bindingActions}`,children:[(0,a.jsx)(j.Button,{className:h.primary,variant:"primary",disabled:t||!c||!q||!e.bindingContext||_?.code==="F4"&&_.modifiers.includes("Alt"),onClick:()=>{r(n,"save-bindings",{revision:e.revision,bindingContext:e.bindingContext,values:{pttMouse:v,pttKeyboard:_}})},children:o("saveBindings")}),q&&(0,a.jsx)(j.Button,{variant:"outline",disabled:t,onClick:()=>{b(e.values.pttMouse),Z(e.values.pttKeyboard??null),u?.("save-bindings")},children:o("discardBindings")})]})]})}),(0,a.jsxs)("div",{hidden:l!=="advanced"||!e.values.speakerVerification.enabled,className:h.section,children:[e.values.speakerVerification.enabled&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(Mt,{label:o("speaker"),checked:K,disabled:t,onChange:O}),(0,a.jsx)("p",{className:h.hint,children:o("speakerHint")})]}),(0,a.jsx)("p",{className:h.hint,children:o("savedHint")})]}),(0,a.jsxs)("div",{hidden:l!=="audio",className:h.disclosureRow,children:[(0,a.jsxs)("details",{className:h.section,children:[(0,a.jsx)("summary",{children:o("wakeSettings")}),(0,a.jsx)("p",{className:h.hint,children:o("wakeMethod")}),(0,a.jsxs)("label",{className:h.field,children:[o("wakeAliases"),(0,a.jsx)(j.Input,{"aria-label":o("wakeAliases"),maxLength:208,value:S,disabled:Ge,onChange:ie=>C(ie.target.value)})]}),(0,a.jsx)("p",{className:h.hint,children:o("wakeAliasesHint")}),(0,a.jsxs)("label",{className:h.field,children:[o("wakeTimeout"),(0,a.jsx)(j.Input,{"aria-label":o("wakeTimeout"),type:"number",min:"3",max:"30",step:"1",value:R,disabled:Ge,onChange:ie=>z(ie.target.value)})]}),Ge&&(0,a.jsx)("p",{className:h.hint,children:o("wakeStopToEdit")}),!I&&(0,a.jsx)("p",{role:"alert",className:h.notice,children:o("wakeInvalid")})]}),(0,a.jsxs)("details",{className:h.section,children:[(0,a.jsx)("summary",{children:o("soundTitle")}),(0,a.jsx)(Mt,{label:o("soundEnabled"),checked:T,disabled:!N||t,onChange:P}),(0,a.jsxs)("label",{className:h.field,children:[o("soundVolume"),(0,a.jsx)(Rt,{"aria-label":o("soundVolume")+"\u6ED1\u5757",min:"0",max:"1",step:"0.05",value:E,disabled:!N||t,onChange:ie=>k(ie.target.value)}),(0,a.jsx)(j.Input,{type:"number",min:"0",max:"1",step:"0.05","aria-label":o("soundVolume"),disabled:!N||t,value:E,onChange:ie=>k(ie.target.value)})]}),(0,a.jsx)(Mt,{label:"\u5B9E\u9A8C\u6027\u5524\u9192\u5224\u65AD\uFF08\u9ED8\u8BA4\u5173\u95ED\uFF09",checked:B,disabled:t,onChange:F}),(0,a.jsx)("p",{className:h.hint,children:"\u5173\u95ED\u65F6\uFF0C\u81EA\u7531\u9EA6\u76F4\u63A5\u542C\u53D6\u6709\u6548\u8BED\u97F3\uFF1B\u5F00\u542F\u540E\u4F7F\u7528\u5524\u9192\u8BCD\u6216\u8BED\u4E49\u5224\u65AD\uFF0C\u53EF\u80FD\u6F0F\u5524\u9192\u3002\u5EFA\u8BAE\u4F7F\u7528\u8033\u673A\u51CF\u5C11\u56DE\u58F0\u3002"}),(0,a.jsx)(j.Checkbox,{label:o("headphones"),checked:X,disabled:!N||t,onChange:ie=>{ue(ie),ie||Q(!1)}}),(0,a.jsx)("p",{className:h.hint,children:o("headphonesHint")}),(0,a.jsx)(Mt,{label:o("automaticBargeIn"),checked:de,disabled:!N||!X||t,onChange:Q}),N&&!X&&(0,a.jsx)("p",{className:h.hint,children:o("headphonesRequired")}),(0,a.jsx)("p",{className:h.hint,children:o(N?"soundAvailable":"soundUnavailable")})]})]}),l==="advanced"&&e.values.speakerVerification.enabled&&(0,a.jsx)("div",{className:h.formActions,children:Cn})]})}function Mu({action:e,active:n}){let[t,r]=(0,$.useState)(null),[o,i]=(0,$.useState)(0),s=(0,$.useRef)(0);if((0,$.useEffect)(()=>{if(!e||!n)return;let p=new AbortController,f,m=async v=>{try{let b=await e({operation:v},p.signal);if(p.signal.aborted)return;r(b),(v==="retry"||["idle","downloading"].includes(b.state)||b.acceleration&&["idle","downloading"].includes(b.acceleration.state))&&(f=setTimeout(()=>{m("status")},1e3))}catch{p.signal.aborted||r({state:"unavailable"})}},y=o>s.current?"retry":"status";return s.current=o,m(y),()=>{clearTimeout(f),p.abort()}},[e,n,o]),!e||!n)return null;let c=t?.totalBytes>0&&t?.state==="downloading",l=t?.acceleration,d=l?.totalBytes>0&&l?.state==="downloading",u=p=>(p/1e6).toFixed(1);return(0,a.jsxs)("div",{className:h.section,"data-whale-whisper-base":!0,children:[(0,a.jsx)("h3",{children:"Whisper Base"}),(0,a.jsx)("p",{role:"status",children:t?.state==="ready"?"\u5DF2\u5C31\u7EEA\uFF0C\u53EF\u79BB\u7EBF\u8BC6\u522B\u3002":t?.state==="error"?t.message:t?.state==="unavailable"?"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u6A21\u578B\u72B6\u6001\u3002":c?`\u6B63\u5728\u4E0B\u8F7D \xB7 ${u(t.receivedBytes)} / ${u(t.totalBytes)} MB`:"\u6B63\u5728\u51C6\u5907\u672C\u5730\u8BC6\u522B\u6A21\u578B\u2026"}),c&&(0,a.jsx)("progress",{"aria-label":"Whisper Base \u4E0B\u8F7D\u8FDB\u5EA6",value:t.receivedBytes,max:t.totalBytes}),l&&(0,a.jsxs)("div",{className:h.section,"data-whale-asr-acceleration":!0,children:[(0,a.jsx)("h3",{children:"\u539F\u751F\u52A0\u901F"}),(0,a.jsx)("p",{className:h.hint,role:"status",children:l.state==="ready"?"\u52A0\u901F\u7EC4\u4EF6\u5DF2\u5C31\u7EEA\u3002":l.state==="error"?"\u52A0\u901F\u7EC4\u4EF6\u4E0B\u8F7D\u5931\u8D25\u3002":d?`\u6B63\u5728\u4E0B\u8F7D \xB7 ${u(l.receivedBytes)} / ${u(l.totalBytes)} MB`:"\u6B63\u5728\u51C6\u5907\u52A0\u901F\u7EC4\u4EF6\u2026"}),d&&(0,a.jsx)("progress",{"aria-label":"\u539F\u751F\u52A0\u901F\u4E0B\u8F7D\u8FDB\u5EA6",value:l.receivedBytes,max:l.totalBytes})]}),(t?.state==="error"||l?.state==="error")&&(0,a.jsx)(j.Button,{variant:"outline",onClick:()=>{r(p=>p?.state==="ready"?{...p,acceleration:{...p.acceleration,state:"idle"}}:null),i(p=>p+1)},children:"\u91CD\u8BD5\u4E0B\u8F7D"})]})}function Oh({settings:e,sessionId:n,busy:t,run:r,t:o,pickPath:i,active:s,modelTab:c,markSettingsEdited:l,whisperAsrAction:d}){let[u,p]=(0,$.useState)(e.modelSetup.asr),[f,m]=(0,$.useState)(e.modelSetup.modelCompute??"cpu"),[y,v]=(0,$.useState)(e.modelSetup.models),b=t,_=()=>l?.("save-models"),Z=()=>{r(n,"save-models",{revision:e.revision,values:{asr:u,modelCompute:u==="whisper-wasm"?"cpu":f,models:y}})};return(0,a.jsxs)("section",{className:h.section,"data-settings-draft":"save-models",hidden:!["download","paths"].includes(c),children:[(0,a.jsxs)("div",{"data-whale-tab-panel":!0,hidden:c!=="download",children:[(0,a.jsx)(Mu,{action:d,active:s&&c==="download"&&e.modelSetup.asr==="whisper-wasm"}),(0,a.jsxs)("details",{className:h.section,children:[(0,a.jsx)("summary",{children:"\u5F53\u524D\u8BC6\u522B\u6A21\u578B\u4E0E\u8BA1\u7B97\u8BBE\u5907"}),(0,a.jsxs)("div",{className:h.section,children:[(0,a.jsxs)("fieldset",{className:h.radios,disabled:b,children:[(0,a.jsx)("legend",{children:"\u8BC6\u522B\u6A21\u578B"}),[["whisper-wasm","Whisper Base\uFF08\u81EA\u52A8\u4E0B\u8F7D\uFF09"],["sensevoice","SenseVoice"],["whisper","Whisper"]].map(([K,O])=>(0,a.jsxs)("label",{children:[(0,a.jsx)("input",{type:"radio",name:"whale-ear-asr",checked:u===K,onChange:()=>{p(K),K==="whisper-wasm"&&m("cpu"),K==="sensevoice"&&f==="cuda"&&m("auto"),_()}}),O]},K))]}),u==="whisper-wasm"?(0,a.jsx)("p",{className:h.hint,children:"\u4F7F\u7528 CPU \u8BC6\u522B\u666E\u901A\u8BDD\uFF0C\u6A21\u578B\u548C\u8FD0\u884C\u65F6\u7531\u9C7C\u5E94\u81EA\u52A8\u4E0B\u8F7D\u3002"}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("label",{className:h.inlineField,children:["\u8BC6\u522B\u8BA1\u7B97\u8BBE\u5907",(0,a.jsxs)("select",{value:f,disabled:b,onChange:K=>{m(K.target.value),_()},children:[(0,a.jsx)("option",{value:"cpu",children:"CPU"}),(0,a.jsx)("option",{value:"auto",children:"\u81EA\u52A8 GPU \xB7 CPU \u515C\u5E95"}),u==="whisper"&&(0,a.jsx)("option",{value:"cuda",children:"CUDA / HIP \xB7 CPU \u515C\u5E95"})]})]}),(0,a.jsx)("p",{className:h.hint,children:u==="sensevoice"?"\u6B64 SenseVoice INT8 \u7EC4\u5408\u76EE\u524D\u4F7F\u7528 CPU\u3002":"GPU \u53EF\u7528\u6027\u4ECD\u9700\u5DF2\u5B89\u88C5\u8FD0\u884C\u65F6\u4E0E\u6A21\u578B\u5B9E\u9645\u63A8\u7406\u9A8C\u8BC1\u3002"})]}),(0,a.jsx)(j.Button,{variant:"outline",disabled:b,onClick:Z,children:"\u4FDD\u5B58\u8BC6\u522B\u6A21\u578B"})]})]})]}),(0,a.jsxs)("div",{hidden:c!=="paths",className:h.section,children:[(0,a.jsx)("h3",{children:"\u8BC6\u522B\u6A21\u578B\u672C\u5730\u8DEF\u5F84"}),(0,a.jsx)("p",{className:h.hint,children:"\u8BC6\u522B\u548C\u6717\u8BFB\u6A21\u578B\u5747\u5728\u201C\u6A21\u578B\u4E0B\u8F7D\u201D\u4E2D\u9009\u62E9\uFF1B\u8FD9\u91CC\u7BA1\u7406\u672C\u673A\u5DF2\u6709\u6587\u4EF6\u3002"}),[["sensevoiceDir","sensevoicePath"],["whisper","whisperPath"],["campplus","campplusPath"]].map(([K,O])=>(0,a.jsx)(dr,{className:h.pathRow,label:o(O),kind:K,value:y[K],disabled:b,active:s&&c==="paths",pickPath:i,sessionId:n,scope:u,onChange:N=>{_(),v(T=>({...T,[K]:N}))}},K)),(0,a.jsx)(j.Button,{variant:"outline",disabled:b,onClick:Z,children:o("saveModels")})]})]})}function Rh({settings:e,state:n,sessionId:t,run:r,t:o}){let[i,s]=(0,$.useState)(e.voiceSession.visibility),c=n.settingsFor===t,l=n.checkedFor===t&&n.status!==null,d=l?n.status.voiceCapabilities:e.voiceCapabilities,u=l?n.status.voiceSession:null,p=l&&(n.status.enabled||n.status.ownerSessionId!==null||u?.id!=null),f=l&&n.status.voiceControlBusy===!1,m=n.busy||n.uncertain||!c||!l||!f||p,y=v=>o(v==="workspace"?"workspaceMode":"hiddenMode");return(0,a.jsxs)("section",{className:h.section,"data-whale-visibility":!0,"data-settings-draft":"set-visibility",children:[(0,a.jsx)("h3",{children:o("capabilityTitle")}),(0,a.jsx)("dl",{className:h.details,children:["hidden","workspace"].map(v=>(0,a.jsxs)("div",{className:h.capabilityRow,children:[(0,a.jsx)("dt",{children:y(v)}),(0,a.jsxs)("dd",{children:[o(d?.[v]?.supported?"supported":"unsupported"),d?.[v]?.reason?` \xB7 ${d[v].reason}`:""]})]},v))}),(0,a.jsxs)("p",{className:h.hint,children:[o("taskCapability"),": ",o(d?.taskHandoff?.supported?"supported":"unsupported")," \xB7 ",d?.taskHandoff?.mode??o("unknown"),d?.taskHandoff?.reason?` \xB7 ${d.taskHandoff.reason}`:""]}),(0,a.jsxs)("p",{children:[o("configuredMode"),": ",y(e.voiceSession.visibility)]}),(0,a.jsx)("p",{className:h.hint,children:l?u?.id?`${o("currentVoiceMode")}: ${u.presentation?.requested?y(u.presentation.requested):o("unknown")} \xB7 ${u.id}`:o("noActiveVoice"):o("modeReadFirst")}),(0,a.jsxs)("fieldset",{className:h.radios,disabled:m,children:[(0,a.jsx)("legend",{children:o("chooseVisibility")}),(0,a.jsxs)("label",{children:[(0,a.jsx)("input",{type:"radio",name:"whale-ear-visibility",checked:i==="hidden",onChange:()=>s("hidden")}),o("hiddenMode")]}),(0,a.jsxs)("label",{children:[(0,a.jsx)("input",{type:"radio",name:"whale-ear-visibility",checked:i==="workspace",disabled:!d?.workspace?.supported,onChange:()=>s("workspace")}),o("workspaceMode")]})]}),(0,a.jsx)("p",{className:h.hint,children:o("workspaceWarning")}),(0,a.jsx)("p",{className:h.hint,children:o("visibilityNoMigration")}),(!c||!l)&&(0,a.jsx)("p",{className:h.hint,children:o("modeReadFirst")}),p&&(0,a.jsx)("p",{className:h.hint,children:o("closeBeforeMode")}),l&&!f&&(0,a.jsx)("p",{className:h.hint,children:o("modeControlPending")}),(0,a.jsx)("div",{children:(0,a.jsx)(j.Button,{variant:"outline",disabled:m||i===e.voiceSession.visibility||i==="workspace"&&!d?.workspace?.supported,onClick:()=>{r(t,"set-visibility",{revision:e.revision,visibility:i})},children:o(i==="workspace"?"saveWorkspace":"saveHidden")})})]})}function Mh({value:e,onChange:n,capability:t,disabled:r,t:o,captureBindings:i,sessionId:s,active:c}){let[l,d]=(0,$.useState)(!1),[u,p]=(0,$.useState)(!1),[f,m]=(0,$.useState)(null),y=(0,$.useRef)(null),v=(0,$.useRef)(0),b=(0,$.useRef)(null),_=(0,$.useRef)(!0),Z=async N=>{v.current++,_.current&&d(!1);let T=y.current;if(T){_.current&&p(!0);try{await i(T.sessionId,{operation:"end",token:T.token}),y.current===T&&(y.current=null),_.current&&N&&n(N),_.current&&m(null)}catch(P){_.current&&m(String(P.message||P))}finally{_.current&&p(!1)}}},K=async()=>{if(y.current||u)return;let N=++v.current;p(!0),m(null);try{let T=await i(s,{operation:"begin"});if(y.current={...T,sessionId:s},!_.current||N!==v.current){await Z();return}d(!0),b.current?.focus()}catch(T){_.current&&m(String(T.message||T))}finally{_.current&&p(!1)}};(0,$.useEffect)(()=>(_.current=!0,()=>{_.current=!1,Z()}),[]),(0,$.useEffect)(()=>{(!c||r)&&(v.current++,Z())},[c,r,s]),(0,$.useEffect)(()=>{if(!l)return;let N=null,T=!1,P=!1,E=A=>{P||(P=!0,Z(A))},k=A=>{if(A.preventDefault(),A.stopPropagation(),A.code==="Escape"){N=null;return}A.repeat||["ControlLeft","ControlRight","AltLeft","AltRight","ShiftLeft","ShiftRight"].includes(A.code)||(N=nu(A),T=!1,m(N?null:o("bindingUnsupported")))},S=A=>{if(A.preventDefault(),A.stopPropagation(),A.code==="Escape"){E();return}N&&(A.code===N.code&&(T=!0),T&&!A.ctrlKey&&!A.altKey&&!A.shiftKey&&E(N))},C=()=>E(),R=()=>{document.hidden&&C()};window.addEventListener("keydown",k,!0),window.addEventListener("keyup",S,!0),window.addEventListener("blur",C),document.addEventListener("visibilitychange",R);let z=setTimeout(C,1e4);return()=>{clearTimeout(z),window.removeEventListener("keydown",k,!0),window.removeEventListener("keyup",S,!0),window.removeEventListener("blur",C),document.removeEventListener("visibilitychange",R)}},[l]);let O=e?[...e.modifiers||[],e.code].join(" + "):o("bindingOff");return(0,a.jsxs)("section",{className:h.keyBinding,children:[(0,a.jsx)("h3",{children:o("keyboardBinding")}),(0,a.jsxs)("div",{className:h.keyBindingRow,children:[(0,a.jsx)("span",{children:O}),(0,a.jsxs)("div",{className:h.actions,children:[(0,a.jsx)(j.Button,{variant:"outline",ref:b,onBlur:()=>{l&&Z()},disabled:r||u||!t?.supported||!i,onClick:()=>l?void Z():void K(),children:u?"\u6B63\u5728\u4EA4\u63A5\u2026":l?"\u53D6\u6D88\u5F55\u5165":"\u5F55\u5165\u6309\u952E"}),e&&(0,a.jsx)(j.Button,{variant:"outline",disabled:r||u||l,onClick:()=>n(null),children:o("clearBinding")}),y.current&&!l&&!u&&(0,a.jsx)(j.Button,{variant:"outline",onClick:()=>{Z()},children:"\u6062\u590D\u539F\u6309\u952E"})]})]}),l&&(0,a.jsx)("p",{role:"status",className:h.notice,children:"\u6309\u952E\u8BF4\u8BDD\u5DF2\u6682\u505C\u3002\u8BF7\u6309\u4E0B\u7EC4\u5408\u952E\u540E\u5168\u90E8\u677E\u5F00\uFF1BEsc \u53D6\u6D88\u3002"}),!t?.supported&&(0,a.jsx)("p",{className:h.hint,children:t?.reason||o("bindingUnavailable")}),f&&(0,a.jsx)("p",{role:"alert",children:f})]})}function Du({value:e,t:n}){let t={fast:"performanceNoThinking",balanced:"performanceRecommended"}[e];return(0,a.jsxs)("span",{className:h.performanceChoice,children:[n("performance_"+e),t&&(0,a.jsxs)(a.Fragment,{children:[" ",(0,a.jsx)("small",{children:n(t)})]})]})}function Mi(e,n){let t=e?.modes?.find(r=>r.performanceMode===n);return!t||t.available?null:t.reason==="provider_unsupported"?"performanceUnavailable":t.reason==="unknown"?"performanceProbeUnknown":n==="fast"?"performanceFastUnavailable":"performanceHostUnavailable"}function Hu({capability:e,t:n,compact:t=!1,pending:r=!1,error:o=null}){let i=e?.modes??[],s=i.map(v=>v.reason),c=e?.probe?.status,l=c==="unknown"||s.includes("unknown"),d=r||c==="pending"||c==="running",u=!t&&(c==="accepted"||s.includes("accepted")),p=!t&&s.includes("explicit_off"),f=i.some(v=>v.performanceMode==="fast"&&!v.available&&v.reason==="host_contract_blocked"),m=s.includes("provider_unsupported"),y=i.some(v=>v.performanceMode!=="fast"&&!v.available&&v.reason==="host_contract_blocked");if(!l&&!d&&!u&&!p&&!f&&!m&&!y&&!o)return null;if(t){let v=o||n(d?"performanceProbePending":f?"performanceFastUnavailable":m?"performanceUnavailable":l?"performanceProbeUnknown":"performanceHostUnavailable");return(0,a.jsx)("div",{role:"status",className:h.quickHint,"data-whale-probe-status":!0,title:v,children:v})}return(0,a.jsxs)("div",{role:"status",className:h.hint,"data-whale-probe-status":!0,children:[d&&(0,a.jsx)("p",{children:n("performanceProbePending")}),o&&(0,a.jsx)("p",{"data-whale-probe-error":!0,children:o}),f&&(0,a.jsx)("p",{children:n("performanceFastUnavailable")}),m&&(0,a.jsx)("p",{children:n("performanceUnavailable")}),y&&(0,a.jsx)("p",{children:n("performanceHostUnavailable")}),l&&(0,a.jsx)("p",{children:n("performanceProbeUnknown")}),u&&(0,a.jsx)("p",{children:n("performanceProbeAccepted")}),p&&(0,a.jsx)("p",{children:n("performanceFastHint")})]})}function Dh({state:e,sessionId:n,run:t,t:r,markSettingsEdited:o}){let i=e.settings,s=i?.voiceSession?.performanceMode??null,[c,l]=(0,$.useState)(s),d=ho(e,n),u=e.performanceFor===n?e.performance:null,p=u?.modes?.find(m=>m.performanceMode===c),f=e.busy||e.performancePending||e.uncertain||!d||!c||c!=="compatibility"&&!p?.available;return d?(0,a.jsxs)("section",{className:h.section,"data-whale-performance":!0,"data-settings-draft":"set-performance-mode",children:[(0,a.jsx)("h3",{children:r("performanceTitle")}),(0,a.jsx)("p",{className:h.hint,children:r("performanceHint")}),(0,a.jsx)("p",{className:h.hint,"data-whale-probe-cost":!0,children:"\u90E8\u5206\u6A21\u578B\u7684\u68C0\u6D4B\u4F1A\u53D1\u9001\u8BA1\u8D39\u77ED\u8BF7\u6C42\u3002"}),(0,a.jsxs)("details",{className:h.details,children:[(0,a.jsx)("summary",{children:"\u68C0\u6D4B\u8303\u56F4\u4E0E\u8D39\u7528"}),(0,a.jsx)("p",{children:r("performanceProbeCost")}),(0,a.jsx)("p",{children:r("performanceProbeScope")})]}),(0,a.jsx)(Hu,{capability:u,t:r,pending:e.performancePending,error:e.performanceError}),!u&&(0,a.jsx)("p",{className:h.hint,children:r("performanceReadFirst")}),s&&(0,a.jsxs)("p",{className:h.hint,children:["\u5F53\u524D\uFF1A",r("performance_"+s)]}),(0,a.jsx)("div",{className:h.segmented,children:["fast","balanced","high","compatibility"].map(m=>{let y=m==="compatibility"?null:u?Mi(u,m):"performanceReadFirst";return(0,a.jsx)(j.Button,{title:y?r(y):void 0,"aria-pressed":c===m,disabled:e.busy||e.performancePending||!!y,onClick:()=>{o?.("set-performance-mode"),l(m)},children:(0,a.jsx)(Du,{value:m,t:r})},m)})}),(0,a.jsxs)("div",{className:h.actions,children:[(0,a.jsx)(j.Button,{variant:"outline",disabled:e.busy||e.performancePending,onClick:()=>{t(n,"inspect-performance")},children:r("inspectPerformance")}),(0,a.jsx)(j.Button,{variant:"outline",disabled:f||c===s,onClick:()=>{t(n,"set-performance-mode",{revision:i.revision,performanceMode:c})},children:r("savePerformance")})]})]}):null}function Hh({state:e,sessionId:n,run:t,t:r}){let o=e.outputVolumeFor===n?e.outputVolume:null,[i,s]=(0,$.useState)(null),[c,l]=(0,$.useState)(null),d=i??o?.volume??1,u=i!==null&&c!==o?.revision;return(0,$.useEffect)(()=>{s(null),l(null)},[n]),(0,a.jsxs)("section",{className:h.section,children:[(0,a.jsx)("h3",{children:r("outputVolume")}),o&&!o.supported&&(0,a.jsx)("p",{className:h.hint,children:r("outputVolumeUnavailable")}),o?.supported&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:h.volumeRow,children:[(0,a.jsxs)("label",{className:h.volumeControl,children:[(0,a.jsx)(Rt,{"aria-label":r("outputVolume"),min:"0",max:"1",step:"0.01",value:d,disabled:!o.supported||e.busy||e.outputVolumeUncertain,onChange:p=>{i===null&&l(o.revision),s(Number(p.target.value))}}),(0,a.jsxs)("span",{children:[Math.round(d*100),"%"]})]}),(0,a.jsx)(j.Button,{variant:"outline",disabled:!o.supported||e.busy||e.outputVolumeUncertain||u||i===null,onClick:async()=>{await t(n,"set-output-volume",{revision:c,volume:i})&&s(null)},children:r("saveOutputVolume")})]}),(0,a.jsx)("p",{className:h.hint,children:"\u4E0B\u4E00\u6BB5\u64AD\u653E\u751F\u6548"})]}),u&&(0,a.jsxs)("p",{role:"status",className:h.notice,children:["\u97F3\u91CF\u5DF2\u5728\u522B\u5904\u66F4\u65B0\uFF0C\u5F53\u524D\u9009\u62E9\u5DF2\u4FDD\u7559\u3002",(0,a.jsx)(j.Button,{variant:"outline",disabled:e.busy,onClick:()=>s(null),children:"\u4F7F\u7528\u5F53\u524D\u97F3\u91CF"})]}),!o&&(0,a.jsx)("p",{role:"status",className:h.hint,children:e.busy?r("pending"):r("statusRetry")}),e.outputVolumeUncertain&&(0,a.jsx)("p",{role:"status",className:h.notice,children:r("outputVolumeUnknown")})]})}function Bh({state:e,sessionId:n,run:t,markSettingsEdited:r,discardSettingsDraft:o}){let i=e.settingsFor===n?e.settings:null,s=i?.conversationModel??{mode:"auto",provider:null,model:null},[c,l]=(0,$.useState)(s),[d,u]=(0,$.useState)(""),[p,f]=(0,$.useState)(!1),m=(0,$.useRef)(!1),y=(0,$.useRef)(!0);(0,$.useEffect)(()=>(y.current=!0,()=>{y.current=!1}),[]);let v=e.conversationModelsFor===n?e.conversationModels:null,b=v?.providers??[],_=b.find(k=>k.id===c.provider),Z=c.mode==="auto"||!!_?.models.some(k=>k.id===c.model),K=JSON.stringify(c)!==JSON.stringify(s),O=e.status,N=e.checkedFor===n&&!e.uncertain&&O?.enabled===!1&&O?.ownerSessionId===null&&O?.voiceControlBusy===!1&&O?.voiceSession?.fullyStopped===!0&&O?.voiceSession?.id===null,T=!i||!N||e.busy||e.settingsConflict||e.visibilityUncertain||p,P=k=>{r?.("save-conversation-model"),l(S=>({...S,...k})),u("")},E=async()=>{if(T||m.current||!K||!Z)return;m.current=!0,f(!0),u("");let k=await t(n,"save-conversation-model",{revision:i.revision,values:c.mode==="auto"?{mode:"auto",provider:null,model:null}:c});m.current=!1,y.current&&(f(!1),u(k?"\u9ED8\u8BA4\u5DF2\u4FDD\u5B58\uFF0C\u4E0B\u6B21\u5F00\u542F\u8BED\u97F3\u751F\u6548\u3002":"\u4FDD\u5B58\u672A\u6210\u529F\uFF0C\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002\u8BF7\u6838\u67E5\u63D0\u793A\u540E\u518D\u64CD\u4F5C\u3002"))};return(0,a.jsxs)("section",{className:h.section,"data-conversation-model":!0,"data-settings-draft":"save-conversation-model",children:[(0,a.jsx)("h3",{children:"\u9ED8\u8BA4\u5BF9\u8BDD\u6A21\u578B"}),(0,a.jsx)("p",{className:h.hint,children:"\u63A5\u6536\u8BED\u97F3\u8BC6\u522B\u540E\u7684\u6587\u5B57\uFF0C\u7528\u4E8E\u751F\u6210\u56DE\u7B54\u3002"}),(0,a.jsx)("fieldset",{className:h.radios,disabled:T,"aria-label":"\u5BF9\u8BDD\u6A21\u578B\u9009\u62E9\u65B9\u5F0F",children:[["auto","\u81EA\u52A8"],["manual","\u624B\u52A8\u6307\u5B9A"]].map(([k,S])=>(0,a.jsxs)("label",{children:[(0,a.jsx)("input",{type:"radio",name:"conversation-mode-"+n,checked:c.mode===k,onChange:()=>P(k==="auto"?{mode:k,provider:null,model:null}:{mode:k})}),S]},k))}),c.mode==="auto"&&(0,a.jsxs)("div",{className:h.section,children:[(0,a.jsx)("p",{className:h.hint,children:"\u8DDF\u968F\u5F53\u524D\u5BF9\u8BDD\u6240\u9009\u6A21\u578B\u3002\u7A7A\u767D\u9996\u9875\u4F7F\u7528 DSH \u7684\u9ED8\u8BA4\u6A21\u578B\u3002"}),(0,a.jsx)("p",{children:"\u5F00\u542F\u8BED\u97F3\u65F6\u786E\u5B9A\u6A21\u578B\u6765\u6E90"})]}),(0,a.jsx)(ji,{open:c.mode==="manual",children:(0,a.jsxs)("div",{className:h.section,"data-conversation-manual":!0,children:[(0,a.jsx)(Iu,{label:"\u4F9B\u5E94\u5546",value:c.provider,options:b,disabled:T||!v,onChange:k=>P({provider:k,model:null})}),(0,a.jsx)(Iu,{label:"\u6A21\u578B",value:c.model,options:_?.models??[],disabled:T||!_,onChange:k=>P({model:k})}),(0,a.jsx)("p",{className:h.hint,children:"\u4EC5\u5217\u51FA\u5BBF\u4E3B\u5DF2\u914D\u7F6E\u7684\u5BF9\u8BDD\u4F9B\u5E94\u5546\u4E0E\u6A21\u578B\uFF0C\u4FDD\u5B58\u65F6\u518D\u6B21\u9A8C\u8BC1\u3002"}),!v&&(0,a.jsx)("p",{role:"status",children:e.conversationModelsError?"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u4F9B\u5E94\u5546\uFF0C\u8BF7\u91CD\u8BD5\u3002":"\u6B63\u5728\u8BFB\u53D6\u4F9B\u5E94\u5546\u2026"}),v&&!b.length&&(0,a.jsx)("p",{role:"status",children:"\u6682\u65E0\u53EF\u7528\u5BF9\u8BDD\u6A21\u578B\uFF0C\u8BF7\u5148\u5728 DSH \u4E2D\u914D\u7F6E\u4F9B\u5E94\u5546\u3002"}),c.provider&&!Z&&(0,a.jsx)("p",{role:"status",children:"\u8BF7\u9009\u62E9\u5F53\u524D\u53EF\u7528\u7684\u4F9B\u5E94\u5546\u4E0E\u6A21\u578B\u3002\u539F\u9009\u62E9\u4E0D\u4F1A\u81EA\u52A8\u66FF\u6362\u3002"}),(0,a.jsx)(j.Button,{variant:"outline",disabled:e.busy,onClick:()=>{t(n,"conversation-models")},children:"\u5237\u65B0\u4F9B\u5E94\u5546"})]})}),(0,a.jsxs)("div",{className:h.actions,children:[(0,a.jsx)(j.Button,{variant:"primary",disabled:T||!K||!Z,onClick:()=>{E()},children:p?"\u4FDD\u5B58\u4E2D\u2026":"\u4FDD\u5B58\u9ED8\u8BA4"}),(0,a.jsx)(j.Button,{variant:"outline",disabled:T||!K,onClick:()=>{l(s),u(""),o?.("save-conversation-model")},children:"\u53D6\u6D88\u4FEE\u6539"})]}),(0,a.jsx)("p",{role:"status",className:h.hint,children:d||(K?"\u5C1A\u672A\u4FDD\u5B58":s.mode==="auto"?"\u5DF2\u4FDD\u5B58\uFF1A\u81EA\u52A8 \xB7 \u8DDF\u968F\u5F53\u524D\u5BF9\u8BDD":`\u5DF2\u4FDD\u5B58\uFF1A${s.provider} / ${s.model}`)})]})}function Iu({label:e,value:n,options:t,disabled:r,onChange:o}){let[i,s]=(0,$.useState)(!1),[c,l]=(0,$.useState)(0),d=(0,$.useRef)(null),u=(0,$.useRef)(null),p=(0,$.useRef)(null),f=(0,$.useId)(),m=t.find(b=>b.id===n);(0,$.useEffect)(()=>{r&&s(!1)},[r]),(0,$.useEffect)(()=>{i&&p.current?.querySelector('[data-option-index="'+c+'"]')?.focus()},[i,c]);let y=()=>{s(!1),u.current?.focus()},v=b=>{o(b.id),y()};return(0,a.jsxs)("div",{ref:d,className:h.conversationChoice,onBlur:b=>{b.currentTarget.contains(b.relatedTarget)||s(!1)},children:[(0,a.jsx)("span",{id:f+"-label",children:e}),(0,a.jsxs)(j.Button,{ref:u,variant:"outline",className:h.deviceSelect,"aria-label":e,"aria-haspopup":"listbox","aria-expanded":i,"aria-controls":f,disabled:r||!t.length,onClick:()=>{l(Math.max(0,t.findIndex(b=>b.id===n))),s(!i)},onKeyDown:b=>{["ArrowDown","ArrowUp"].includes(b.key)&&(b.preventDefault(),l(Math.max(0,t.findIndex(_=>_.id===n))),s(!0))},children:[m?.name||n||"\u8BF7\u9009\u62E9",(0,a.jsx)("span",{"aria-hidden":"true",children:"\u2304"})]}),i&&(0,a.jsx)(j.MenuSurface,{ref:p,id:f,className:h.conversationOptions,role:"listbox","aria-labelledby":f+"-label",onKeyDown:b=>{b.key==="Escape"?(b.preventDefault(),b.stopPropagation(),y()):["ArrowDown","ArrowUp","Home","End"].includes(b.key)&&(b.preventDefault(),l(_=>b.key==="Home"?0:b.key==="End"?t.length-1:(_+(b.key==="ArrowDown"?1:-1)+t.length)%t.length))},children:t.map((b,_)=>(0,a.jsxs)("button",{type:"button",role:"option","aria-selected":n===b.id,tabIndex:_===c?0:-1,"data-option-index":_,onClick:()=>v(b),children:[b.name,n===b.id&&(0,a.jsx)("span",{"aria-hidden":"true",children:" \u2713"})]},b.id))})]})}function Fh({state:e,sessionId:n,run:t,markSettingsEdited:r,discardSettingsDraft:o,t:i}){let s=e.settingsFor===n?e.settings:null,c=s?.voicePrompt,l=c?.text??"",[d,u]=(0,$.useState)(l),[p,f]=(0,$.useState)(!1),[m,y]=(0,$.useState)(""),v=(0,$.useRef)(!1),b=(0,$.useRef)(!0),_=(0,$.useRef)(l),Z=(0,$.useId)();(0,$.useEffect)(()=>(b.current=!0,()=>{b.current=!1}),[]),(0,$.useEffect)(()=>{if(_.current!==l){let C=_.current;u(R=>R===C?l:R),_.current=l}},[l]);let K=d.trim()?d:"",O=K!==(l.trim()?l:""),N=e.status,T=e.checkedFor===n&&!e.uncertain&&N?.enabled===!1&&N?.ownerSessionId===null&&N?.voiceControlBusy===!1&&N?.voiceSession?.fullyStopped===!0&&N?.voiceSession?.id===null,P=!s||!T||e.busy||e.settingsConflict||e.visibilityUncertain||p,E=!!K&&c?.customSupported!==!0,k=d.length<=32768&&!E,S=async()=>{if(P||v.current||!O||!k)return;v.current=!0,f(!0),y("");let C=!1;try{C=await t(n,"save-voice-prompt",{revision:s.revision,values:{text:K}})}catch{C=!1}finally{v.current=!1,b.current&&(f(!1),y(i(C?"voicePromptSaved":"voicePromptSaveFailed")))}};return(0,a.jsxs)("section",{className:`${h.section} ${h.voicePrompt}`,"data-voice-prompt":!0,"data-settings-draft":"save-voice-prompt",children:[(0,a.jsxs)("label",{htmlFor:Z,children:[i("voicePromptLabel")," ",(0,a.jsx)("span",{className:h.hint,children:i("voicePromptOptional")})]}),(0,a.jsx)("textarea",{id:Z,className:h.voicePromptInput,value:d,maxLength:32768,disabled:P,placeholder:i("voicePromptPlaceholder"),"aria-describedby":Z+"-count "+Z+"-feedback",onChange:C=>{r?.("save-voice-prompt"),u(C.target.value),y("")}}),(0,a.jsxs)("div",{id:Z+"-count",className:h.voicePromptCount,children:[d.length.toLocaleString("en-US")," / 32,768"]}),(0,a.jsxs)("div",{className:h.voicePromptActions,children:[(0,a.jsxs)("div",{className:h.actions,children:[(0,a.jsx)(j.Button,{variant:"primary",disabled:P||!O||!k,onClick:()=>{S()},children:i(p?"voicePromptSaving":"voicePromptSave")}),(0,a.jsx)(j.Button,{variant:"outline",disabled:P||d===l,onClick:()=>{u(l),y(""),o?.("save-voice-prompt")},children:i("voicePromptCancel")})]}),(0,a.jsx)("span",{className:h.hint,children:i("voicePromptStopToEdit")})]}),(0,a.jsx)("p",{id:Z+"-feedback",role:"status",className:h.hint,children:m||(d.length>32768?i("voicePromptTooLong"):c?.customSupported===!1||E?i("voicePromptUnsupported"):O?i("voicePromptUnsaved"):"")})]})}var jy=Object.freeze({version:1,available:!1,reason:"planned"}),Et=["audio","interaction","prompt","models","advanced","sessions","pets"],Uh={audio:"\u9009\u62E9\u9EA6\u514B\u98CE\u3001\u8BF4\u8BDD\u65B9\u5F0F\u4E0E\u63D0\u793A\u97F3\u3002",interaction:"\u8BBE\u7F6E\u6309\u952E\u3001\u56DE\u7B54\u901F\u5EA6\u4E0E\u754C\u9762\u52A8\u753B\u3002",prompt:"\u8BBE\u7F6E\u8BED\u97F3\u5BF9\u8BDD\u7684\u8868\u8FBE\u65B9\u5F0F\u3002",models:"\u9009\u62E9\u6717\u8BFB\u65B9\u5F0F\uFF0C\u6216\u7BA1\u7406\u672C\u5730\u6A21\u578B\u3002",advanced:"\u67E5\u770B\u6743\u9650\u3001\u8BF7\u6C42\u4E0E\u8FD0\u884C\u8BE6\u60C5\u3002",sessions:"\u9009\u62E9\u8BED\u97F3\u5BF9\u8BDD\u76EE\u6807\uFF0C\u67E5\u770B\u9C7C\u5E94\u4F1A\u8BDD\u548C\u5B50\u4EE3\u7406\u3002",pets:"\u684C\u5BA0\u529F\u80FD\u5C1A\u672A\u5F00\u653E\u3002"};function Lh(e){let{t:n,sessionId:t}=e,r=e.useWhaleUi(E=>E),o=e.useWhalePreferences(E=>E),i=r.settingsTab||"audio",s=r.settingsModelTab||"conversation",[c,l]=(0,$.useState)(()=>new Set([r.settingsTab||"audio"])),[d,u]=(0,$.useState)(()=>new Set([r.settingsModelTab||"conversation"])),[p,f]=(0,$.useState)(0),m=(0,$.useRef)(null),y=(0,$.useRef)(null),v=(0,$.useRef)(0),b=(0,$.useRef)(new Set),_=(0,$.useRef)(r.readRefresh),Z=(0,$.useId)();(0,$.useLayoutEffect)(()=>{m.current&&(m.current.scrollTop=0)},[i,s]),(0,$.useEffect)(()=>{e.setSession?.(t)},[t]),(0,$.useEffect)(()=>()=>{v.current++,e.cancelPreview?.(),e.discardDiagnostics?.()},[]),(0,$.useEffect)(()=>{b.current.clear()},[t,i,s]),(0,$.useEffect)(()=>{i==="models"&&e.refreshModelCompute?.(t)},[t,i,s]),(0,$.useEffect)(()=>{if(r.busy||r.ttsCancelling||["pets","sessions"].includes(i))return;let E=e.readState?.();if(E?.busy||E?.ttsCancelling)return;if(_.current!==r.readRefresh){_.current=r.readRefresh;for(let R of["read-output-volume","model-installer","agent-requests"])b.current.delete(R)}let C=[...!r.settings||r.settingsFor!==t?["read-settings"]:[],...!r.status||r.checkedFor!==t||i==="advanced"?["status"]:[],...i==="audio"?["read-output-volume"]:[],...i==="models"&&s==="conversation"?["conversation-models"]:[],...t&&i==="advanced"?["agent-requests"]:[],...t&&i==="interaction"&&r.performanceFor!==t?["inspect-performance"]:[],...i==="models"&&s==="voice"&&(!r.ttsCapabilities||r.ttsCapabilitiesFor!==t)?["inspect-tts"]:[],...i==="models"?["model-installer"]:[]].find(R=>!b.current.has(R));C&&(b.current.add(C),e.run(t,C,{},!0))},[t,i,s,r.readRefresh,r.busy,r.ttsCancelling,r.settingsFor,r.checkedFor,r.outputVolumeFor,r.agentRequestsFor,r.performanceFor,r.ttsCapabilitiesFor,r.installerFor]);let K=async(E,k=!1)=>{let S=++v.current;e.cancelPreview&&!await e.cancelPreview()||(e.discardDiagnostics?.(),S===v.current&&(l(C=>new Set([...C,E])),e.setSettingsTab(E),k&&y.current?.querySelector(`[data-settings-tab="${E}"]`)?.focus({preventScroll:!0})))},O=async E=>{let k=++v.current;e.cancelPreview&&!await e.cancelPreview()||(e.discardDiagnostics?.(),k===v.current&&(u(S=>new Set([...S,E])),e.setSettingsModelTab(E)))},N=r.settingsFor===t?r.settings:null,T=!r.uncertain&&r.checkedFor===t,P=N&&(0,a.jsx)($h,{settings:N,sessionId:t,busy:r.busy||r.visibilityUncertain||r.settingsConflict,run:e.run,t:n,status:r.status,statusFresh:T,verified:T&&!!r.status,tab:i,markSettingsEdited:e.markSettingsEdited,discardSettingsDraft:e.discardSettingsDraft,bindingError:r.bindingError,captureBindings:e.captureBindings},t+":"+(r.settingsKey??N.revision));return(0,a.jsxs)("div",{className:h.settings,"data-whale-settings":!0,"data-motion":o.motion,children:[(0,a.jsxs)("header",{className:h.settingsHeader,"data-settings-header":!0,children:[(0,a.jsxs)(j.Button,{className:h.backButton,"data-whale-operation":"page-home",onClick:e.showHome,"aria-label":"\u8FD4\u56DE\u8BED\u97F3",children:[(0,a.jsx)(Ue,{name:"chevron",className:h.backIcon}),(0,a.jsx)("span",{children:"\u8FD4\u56DE\u8BED\u97F3"})]}),(0,a.jsxs)("div",{className:h.settingsBrand,children:[(0,a.jsx)(Xn,{small:!0}),(0,a.jsx)("h2",{children:n("settingsTitle")})]}),(0,a.jsx)(j.Button,{className:h.guideButton,"data-whale-operation":"page-setup",onClick:e.openSetup,"aria-label":"\u91CD\u65B0\u6253\u5F00\u914D\u7F6E\u5F15\u5BFC",title:"\u91CD\u65B0\u6253\u5F00\u914D\u7F6E\u5F15\u5BFC",children:"\u914D\u7F6E\u5F15\u5BFC"})]}),(0,a.jsxs)("div",{className:h.settingsLayout,children:[(0,a.jsx)("nav",{ref:y,className:h.settingsNav,"data-settings-nav":!0,"aria-label":n("settingsSections"),onKeyDown:E=>{let k=Et.indexOf(E.target.dataset.settingsTab);if(k<0||!["ArrowDown","ArrowUp","ArrowLeft","ArrowRight","Home","End"].includes(E.key))return;E.preventDefault();let S=E.key==="Home"?0:E.key==="End"?Et.length-1:(k+(["ArrowDown","ArrowRight"].includes(E.key)?1:-1)+Et.length)%Et.length;K(Et[S],!0)},children:Et.map(E=>(0,a.jsx)(j.Button,{"data-settings-tab":E,"aria-pressed":i===E,"aria-controls":Z+"-body",onClick:()=>{K(E)},children:n("tab_"+E)},E))}),(0,a.jsxs)("div",{className:h.settingsPage,children:[(0,a.jsxs)("div",{className:`${h.pageHeading} ${i==="models"?h.modelHeading:""}`,"data-settings-page-heading":!0,"data-no-drag":!0,children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{id:Z,children:n("tab_"+i)}),i!=="models"&&(0,a.jsx)("p",{children:Uh[i]})]}),i==="prompt"&&N&&(0,a.jsx)("span",{className:h.voicePromptMode,"data-voice-prompt-mode":!0,children:n(N.voicePrompt?.mode==="custom"&&N.voicePrompt?.customSupported===!0?"voicePromptCustom":"voicePromptAgents")}),i==="models"&&(0,a.jsx)("nav",{className:h.modelNav,"aria-label":"\u6A21\u578B\u8BBE\u7F6E\u5206\u7C7B","data-no-drag":!0,children:[["conversation","\u5BF9\u8BDD\u6A21\u578B"],["voice","\u6717\u8BFB\u65B9\u5F0F"],["download","\u6A21\u578B\u4E0B\u8F7D"],["paths","\u9AD8\u7EA7\u8DEF\u5F84"]].map(([E,k])=>(0,a.jsx)(j.Button,{"aria-pressed":s===E,onClick:()=>{O(E)},children:k},E))})]}),(0,a.jsxs)("div",{ref:m,id:Z+"-body",className:h.settingsBody,"data-settings-body":!0,"data-no-drag":!0,onChangeCapture:E=>{let k=E.target.closest("[data-settings-draft]");k&&!E.target.closest("[data-no-settings-draft]")&&e.markSettingsEdited?.(k.dataset.settingsDraft)},tabIndex:0,"aria-label":n("settingsContent"),children:[i==="sessions"?(0,a.jsxs)(a.Fragment,{children:[e.listExistingVoiceSessions&&!r.sessionManagementRoot&&(0,a.jsx)(Ii,{...e,state:r}),(0,a.jsx)(jh,{...e,state:r})]}):i==="pets"?(0,a.jsxs)("section",{className:h.placeholder,"data-whale-pet":!0,"aria-label":n("tab_pets"),children:[(0,a.jsx)(Ue,{name:"pet"}),(0,a.jsx)("h3",{children:n("tab_pets")}),(0,a.jsx)("p",{children:n("planned")})]}):(0,a.jsxs)(a.Fragment,{children:[r.error&&(0,a.jsx)("div",{role:"alert",className:h.error,children:n("operationUnavailable")}),r.settingsConflict&&(0,a.jsxs)("p",{role:"status",className:h.notice,children:["\u8BBE\u7F6E\u5DF2\u5728\u522B\u5904\u66F4\u65B0\uFF0C\u5F53\u524D\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002",(0,a.jsx)(j.Button,{variant:"outline",disabled:r.busy,onClick:()=>e.discardSettingsDraft?.(),children:"\u653E\u5F03\u8349\u7A3F\u5E76\u4F7F\u7528\u6700\u65B0\u8BBE\u7F6E"})]}),r.visibilityUncertain&&(0,a.jsx)("p",{role:"status",className:h.notice,children:n("configurationUnknown")}),!N&&(0,a.jsx)("p",{role:"status",className:h.hint,children:r.busy?"\u6B63\u5728\u8BFB\u53D6\u8BBE\u7F6E\u2026":"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u8BBE\u7F6E\u3002\u8FD4\u56DE\u7A97\u53E3\u65F6\u4F1A\u81EA\u52A8\u6838\u67E5\u3002"}),i!=="interaction"&&T&&!(i==="models"&&s==="download")&&(r.status?.enabled||r.status?.ownerSessionId)&&(0,a.jsxs)("div",{className:h.editNotice,role:"status",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("strong",{children:"\u8BED\u97F3\u6B63\u5728\u4F7F\u7528"}),(0,a.jsx)("span",{children:" \xB7 \u505C\u6B62\u540E\u53EF\u4FEE\u6539\u76F8\u5173\u8BBE\u7F6E"})]}),(0,a.jsx)(j.Button,{variant:"outline",disabled:r.busy&&(!r.interruptibleRead||r.diagnosticStopPending)||r.ttsCancelling,onClick:()=>{e.run(t,"disable")},children:"\u505C\u6B62\u8BED\u97F3\u4EE5\u7F16\u8F91"})]})]}),(0,a.jsx)("div",{hidden:!["audio","interaction","advanced"].includes(i),children:P}),(i==="audio"||c.has("audio"))&&(0,a.jsx)("div",{hidden:i!=="audio",children:(0,a.jsx)(Hh,{...e,state:r})}),(i==="interaction"||c.has("interaction"))&&(0,a.jsxs)("div",{hidden:i!=="interaction",children:[N&&(0,a.jsx)(Dh,{...e,state:r},"performance:"+t+":"+(r.settingsKey??N.revision)),(0,a.jsxs)("section",{className:h.section,children:[(0,a.jsx)("h3",{children:n("motionTitle")}),(0,a.jsx)("div",{className:h.segmented,children:["spring","firm","off"].map(E=>(0,a.jsx)(j.Button,{"aria-pressed":o.motion===E,onClick:()=>{e.setMotion(E),f(p+1)},children:n("motion_"+E)},E))}),(0,a.jsx)("div",{className:h.motionPreview,"aria-hidden":"true",children:(0,a.jsx)(Xn,{small:!0})},p),(0,a.jsx)("p",{className:h.hint,children:n("motionHint")}),o.error&&(0,a.jsx)("p",{role:"status",children:n("motionNotSaved")})]})]}),(i==="prompt"||c.has("prompt"))&&N&&(0,a.jsx)("div",{hidden:i!=="prompt",children:(0,a.jsx)(Fh,{...e,state:r},"prompt:"+t+":"+(r.settingsKey??N.revision))}),(i==="models"||c.has("models"))&&(0,a.jsxs)("div",{hidden:i!=="models",children:[N&&(s==="conversation"||d.has("conversation"))&&(0,a.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="conversation",children:(0,a.jsx)(Bh,{...e,state:r},"conversation:"+t+":"+(r.settingsKey??N.revision))}),(s==="voice"||d.has("voice"))&&(0,a.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="voice",children:(0,a.jsx)(Cu,{pickPath:e.pickPath,state:r,sessionId:t,run:e.run,markSettingsEdited:e.markSettingsEdited,prepared:!0,active:i==="models"&&s==="voice"})}),(s==="download"||d.has("download"))&&(0,a.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="download",children:(0,a.jsx)(Au,{state:r,sessionId:t,run:e.run})}),N?.modelSetup&&(0,a.jsx)(Oh,{modelTab:s,markSettingsEdited:e.markSettingsEdited,pickPath:e.pickPath,whisperAsrAction:e.whisperAsrAction,active:i==="models",settings:N,sessionId:t,busy:r.busy||r.visibilityUncertain||r.settingsConflict,run:e.run,t:n},t+":"+(r.settingsKey??N.revision)),(s==="paths"||d.has("paths"))&&(0,a.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="paths",children:(0,a.jsx)(Tu,{state:r,sessionId:t,run:e.run,pickPath:e.pickPath,active:i==="models"&&s==="paths"})})]}),(i==="advanced"||c.has("advanced"))&&(0,a.jsxs)("div",{hidden:i!=="advanced",children:[e.updateAction&&(0,a.jsx)(fu,{state:r,open:e.openUpdate,t:n}),(0,a.jsxs)("section",{className:h.section,"aria-label":n("projectInfoTitle"),children:[(0,a.jsx)("h3",{children:n("projectInfoTitle")}),(0,a.jsxs)("dl",{className:h.details,children:[(0,a.jsx)("dt",{children:n("projectAuthor")}),(0,a.jsx)("dd",{children:(0,a.jsx)("a",{href:Gi.url,target:"_blank",rel:"noreferrer noopener",children:Gi.name})}),(0,a.jsx)("dt",{children:n("projectRepository")}),(0,a.jsx)("dd",{children:(0,a.jsxs)("a",{href:pu,target:"_blank",rel:"noreferrer noopener",children:["Emikosama/",co]})}),(0,a.jsx)("dt",{children:n("projectNpm")}),(0,a.jsx)("dd",{children:(0,a.jsx)("a",{href:`https://www.npmjs.com/package/${co}`,target:"_blank",rel:"noreferrer noopener",children:co})})]})]}),(0,a.jsx)(Jh,{...e,state:r,active:i==="advanced"}),(0,a.jsx)(vu,{readOperationLog:e.readOperationLog}),(0,a.jsx)(qh,{state:r,sessionId:t,t:n}),(0,a.jsxs)("details",{className:h.section,children:[(0,a.jsx)("summary",{children:"\u5BF9\u8BDD\u663E\u793A\u4E0E\u517C\u5BB9\u6027"}),N?.voiceSession&&(0,a.jsx)(Rh,{settings:N,state:r,sessionId:t,run:e.run,t:n},"visibility:"+t+":"+(r.settingsKey??N.revision))]})]})]})]})]})]})}var Vh=new Intl.DateTimeFormat("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"});function jh({manageSessions:e,openManagedSession:n,renameManagedSession:t,setSessionManagement:r,state:o}){let i=o.sessionManagementRoot??null,[s,c]=(0,$.useState)(null),[l,d]=(0,$.useState)(null),[u,p]=(0,$.useState)(!1),[f,m]=(0,$.useState)(null),[y,v]=(0,$.useState)(null),b=(0,$.useRef)(null),_=(0,$.useCallback)(async(R,{append:z=!1}={})=>{if(!e)return;b.current?.abort();let A=new AbortController;b.current=A,p(!0),m(null);try{R.operation!=="list"&&(await e(R,A.signal),A.signal.aborted||m(R.operation==="restore"?"\u5DF2\u53D6\u6D88\u5F52\u6863\u3002\u53EF\u6253\u5F00\u539F\u4F1A\u8BDD\u7EE7\u7EED\u3002":"\u5DF2\u516C\u5F00\u6B64\u4F1A\u8BDD\u3002"));let I=await e(R.operation==="list"?R:{operation:"list",...i?{rootId:i}:{}},A.signal);if(A.signal.aborted||b.current!==A)return;c(V=>z&&V?{...I,items:[...new Map([...V.items,...I.items].map(B=>[B.id,B])).values()]}:I)}catch(I){A.signal.aborted||m(String(I?.message??"\u65E0\u6CD5\u8BFB\u53D6\u9C7C\u5E94\u4F1A\u8BDD").slice(0,400))}finally{b.current===A&&(b.current=null,p(!1))}},[i,e]);(0,$.useEffect)(()=>(_({operation:"list",...i?{rootId:i}:{}}),()=>{let R=b.current;b.current=null,R?.abort()}),[_,i]);let Z=R=>{c(null),d(null),v(null),r({rootId:R,historyOpen:!1})},K=(R,z)=>{v(null),d({operation:R,id:z.id,rootId:z.rootId})},O=async R=>{try{await n(R)}catch(z){m(String(z?.message??"\u65E0\u6CD5\u5728 DSH \u6253\u5F00\u4F1A\u8BDD").slice(0,400))}},N=async R=>{R.preventDefault();let z=y.title.trim();if(!(!z||u)){p(!0),m(null);try{let A=await t(y.id,z);c(I=>I&&{...I,items:I.items.map(V=>V.id===y.id?{...V,title:A}:V)}),v(null),m("\u5DF2\u4FDD\u5B58\u4F1A\u8BDD\u540D\u79F0\u3002")}catch(A){m(String(A?.message??"\u65E0\u6CD5\u91CD\u547D\u540D\u4F1A\u8BDD").slice(0,400))}finally{p(!1)}}},T=i?s?.items?.find(R=>R.id===i):null,P={restore_unavailable:"\u6062\u590D\u63A5\u53E3\u4E0D\u53EF\u7528",archive_state_unavailable:"\u65E0\u6CD5\u8BFB\u53D6\u5F52\u6863\u72B6\u6001",persistence_unavailable:"\u4F1A\u8BDD\u5B58\u50A8\u6682\u65F6\u4E0D\u53EF\u7528",policy_mismatch:"\u5F53\u524D\u4F1A\u8BDD\u6743\u9650\u4E0E\u539F\u4F1A\u8BDD\u4E0D\u540C",presentation_mismatch:"\u5F53\u524D DSH \u65E0\u6CD5\u786E\u8BA4\u4F1A\u8BDD\u7684\u9690\u85CF\u72B6\u6001",visibility_mismatch:"\u5F53\u524D\u663E\u793A\u8BBE\u7F6E\u4E0E\u539F\u4F1A\u8BDD\u4E0D\u540C"},E=R=>(0,a.jsx)("ul",{className:h.permissionList,children:R.map(z=>(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{className:h.sessionTitle,children:z.title||(z.kind==="root"?"\u672A\u547D\u540D\u4F1A\u8BDD":"\u672A\u547D\u540D\u5B50\u4EE3\u7406")+" \xB7 "+z.id.slice(-6).toUpperCase()}),(0,a.jsxs)("p",{className:h.hint,children:[z.archived?"\u5DF2\u5F52\u6863":z.visibility==="hidden"?"\u5DF2\u9690\u85CF":z.visibility==="visible"||z.visibility==="workspace"?"\u53EF\u89C1":"\u53EF\u89C1\u6027\u672A\u77E5",P[z.reason]?" \xB7 "+P[z.reason]:""]}),Number.isFinite(z.createdAt)&&(0,a.jsxs)("p",{className:h.hint,children:["\u521B\u5EFA\u4E8E ",(0,a.jsx)("time",{dateTime:new Date(z.createdAt).toISOString(),children:Vh.format(z.createdAt)})]}),(0,a.jsxs)("div",{className:h.actions,children:[z.kind==="root"&&!i&&(0,a.jsx)(j.Button,{variant:"outline",disabled:u,"data-whale-operation":"show-subagents",onClick:()=>Z(z.id),children:"\u67E5\u770B\u5B50\u4EE3\u7406"}),n&&["live","available"].includes(z.status)&&(0,a.jsx)(j.Button,{variant:"outline","data-whale-operation":z.kind==="root"?"open-native-session":"open-native-subagent",onClick:()=>O(z),children:"\u5728 DSH \u6253\u5F00"}),t&&z.kind==="root"&&["live","available","archived"].includes(z.status)&&(0,a.jsx)(j.Button,{variant:"outline",disabled:u,onClick:()=>{d(null),v({id:z.id,title:z.title??""})},children:"\u91CD\u547D\u540D"}),z.canUnhide&&(0,a.jsx)(j.Button,{variant:"outline",disabled:u,onClick:()=>K("unhide",z),children:"\u53D6\u6D88\u9690\u85CF"}),z.canRestore&&(0,a.jsx)(j.Button,{variant:"outline",disabled:u,onClick:()=>K("restore",z),children:"\u6062\u590D\u5F52\u6863"})]}),l?.id===z.id&&(0,a.jsxs)("div",{className:h.actions,children:[(0,a.jsx)("span",{children:l.operation==="unhide"?"\u786E\u8BA4\u5728 DSH \u516C\u5F00\u6B64\u4F1A\u8BDD\uFF1F":"\u786E\u8BA4\u53D6\u6D88\u6B64\u4F1A\u8BDD\u7684\u5F52\u6863\uFF1F"}),(0,a.jsx)(j.Button,{variant:"primary",disabled:u,onClick:()=>{let A=l;d(null),_(A)},children:"\u786E\u8BA4"}),(0,a.jsx)(j.Button,{variant:"outline",onClick:()=>d(null),children:"\u53D6\u6D88"})]}),y?.id===z.id&&(0,a.jsxs)("form",{className:h.sessionRename,onSubmit:N,children:[(0,a.jsx)(j.Input,{"aria-label":"\u4F1A\u8BDD\u540D\u79F0",value:y.title,maxLength:128,disabled:u,onChange:A=>v({...y,title:A.target.value})}),(0,a.jsxs)("div",{className:h.actions,children:[(0,a.jsx)(j.Button,{type:"submit",variant:"primary",disabled:u||!y.title.trim(),children:"\u4FDD\u5B58\u540D\u79F0"}),(0,a.jsx)(j.Button,{type:"button",variant:"outline",disabled:u,onClick:()=>v(null),children:"\u53D6\u6D88"})]})]})]},z.id))}),k=(s?.items??[]).filter(R=>R.id!==i),S=k.filter(R=>R.active),C=k.filter(R=>!R.active).sort((R,z)=>(z.createdAt??-1)-(R.createdAt??-1));return(0,a.jsxs)("section",{className:h.section,"data-whale-session-management":!0,children:[i&&(0,a.jsx)(j.Button,{variant:"outline",disabled:u,"data-whale-operation":"show-main-sessions",onClick:()=>Z(null),children:"\u8FD4\u56DE\u4E3B\u4F1A\u8BDD"}),u&&!s&&(0,a.jsx)("p",{role:"status",children:"\u6B63\u5728\u8BFB\u53D6\u9C7C\u5E94\u4F1A\u8BDD\u2026"}),f&&(0,a.jsx)("p",{role:"status",className:h.notice,children:f}),T&&E([T]),T?.childrenAvailable&&T?.childrenIncomplete&&(0,a.jsx)("p",{role:"status",children:"\u90E8\u5206\u5B50\u4EE3\u7406\u8BB0\u5F55\u6682\u65F6\u65E0\u6CD5\u6838\u9A8C\u3002\u5F53\u524D\u663E\u793A\u5DF2\u6838\u9A8C\u7684\u4F1A\u8BDD\u3002"}),T&&!T.childrenAvailable&&(0,a.jsx)("p",{role:"status",children:"\u5F53\u524D\u65E0\u6CD5\u8BFB\u53D6\u6B64\u4F1A\u8BDD\u7684\u5B50\u4EE3\u7406\u8BB0\u5F55\u3002"}),T?.childrenAvailable&&!T.childrenIncomplete&&!k.length&&(0,a.jsx)("p",{children:"\u6B64\u4F1A\u8BDD\u8FD8\u6CA1\u6709\u5B50\u4EE3\u7406\u3002"}),S.length>0&&E(S),s&&!i&&S.length===0&&(0,a.jsx)("p",{className:h.hint,children:"\u6682\u65E0\u6D3B\u8DC3\u4F1A\u8BDD\u3002"}),(C.length>0||s?.nextCursor)&&(0,a.jsxs)("details",{className:h.section,"data-whale-session-history":!0,open:o.sessionHistoryOpen===!0,onToggle:R=>{let{open:z}=R.currentTarget;z!==!!o.sessionHistoryOpen&&r({historyOpen:z})},children:[(0,a.jsx)("summary",{"data-whale-operation":i?"subagent-history":"session-history",children:i?"\u5386\u53F2\u5B50\u4EE3\u7406":"\u5386\u53F2\u4F1A\u8BDD"}),E(C),!!s?.nextCursor&&(0,a.jsx)(j.Button,{disabled:u,onClick:()=>{_({operation:"list",cursor:s.nextCursor},{append:!0})},children:"\u52A0\u8F7D\u66F4\u591A"})]}),(0,a.jsx)(j.Button,{variant:"outline",disabled:u,onClick:()=>{_({operation:"list",...i?{rootId:i}:{}})},children:"\u5237\u65B0\u4F1A\u8BDD"}),s?.capabilities?.unhide?.supported===!1&&(0,a.jsx)("p",{className:h.hint,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u65F6\u65E0\u6CD5\u628A\u5B50\u4EE3\u7406\u52A0\u5165\u4FA7\u8FB9\u680F\u3002"}),s?.capabilities?.restore?.supported===!1&&(0,a.jsx)("p",{className:h.hint,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u65F6\u65E0\u6CD5\u901A\u8FC7\u9C7C\u5E94\u53D6\u6D88\u5F52\u6863\u3002"})]})}function qh({state:e,sessionId:n,t}){let r=e.status,o=r?.ownerSessionId,s=!e.uncertain&&e.checkedFor===n&&typeof r?.helper?.lastError=="string"?r.helper.lastError:null,c=e.error??e.enableError;return(0,a.jsxs)("details",{className:h.section,children:[(0,a.jsx)("summary",{children:t("details")}),(0,a.jsxs)("dl",{className:h.details,children:[(0,a.jsx)("dt",{children:t("source")}),(0,a.jsx)("dd",{"data-whale-owner":!0,"data-session-id":o??"",children:o||t("none")}),(0,a.jsx)("dt",{children:t("actor")}),(0,a.jsx)("dd",{"data-whale-actor":!0,"data-session-id":n??"",children:n||t("openSession")})]}),(0,a.jsx)("p",{className:h.hint,children:t("snapshot")}),c&&(0,a.jsx)("pre",{className:h.requestDetails,children:c}),s&&(0,a.jsxs)("div",{"data-whale-helper-error":!0,children:[(0,a.jsx)("strong",{children:t("inputDiagnosticTitle")}),(0,a.jsx)("pre",{className:h.requestDetails,children:s}),(0,a.jsx)("p",{className:h.hint,children:t("inputDiagnosticHistory")})]}),(0,a.jsx)("p",{className:h.hint,children:t("consequence")}),(0,a.jsx)("p",{className:h.hint,children:r?.helper?.online?t("helperOnline"):t("helperOffline")}),r?.turnSignals?.outputStartObservation?.status==="unsupported"&&(0,a.jsx)("p",{className:h.hint,children:t("outputObservationUnavailable")})]})}function Jh({state:e,sessionId:n,run:t,openAuthorization:r,active:o=!0}){let i=(0,$.useRef)(null),s=(0,$.useRef)(0);(0,$.useEffect)(()=>{i.current=null,s.current++},[o,n]),(0,$.useEffect)(()=>{if(!o||!n||e.busy||e.agentRequestsFor===n||i.current===n)return;i.current=n;let l=s.current;s.current===l&&t(n,"agent-requests")},[o,n,e.busy]);let c=e.agentRequestsFor===n?e.agentRequests:null;return(0,a.jsxs)("section",{className:h.section,"data-whale-agent-requests":!0,children:[(0,a.jsx)("h3",{children:"Agent \u64CD\u4F5C\u8BB0\u5F55"}),(0,a.jsx)(j.Button,{"data-whale-operation":"page-authorization",onClick:()=>{r?.()},children:"\u6388\u6743\u8303\u56F4\u4E0E\u64A4\u9500"}),(e.agentPermissionUncertain||e.agentRequestUncertain)&&(0,a.jsx)("p",{role:"alert",className:h.notice,children:"\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u4F1A\u81EA\u52A8\u6838\u67E5\u5BF9\u5E94\u6743\u9650\u548C\u8BF7\u6C42\u72B6\u6001\uFF0C\u4E0D\u4F1A\u91CD\u590D\u6267\u884C\u3002"}),c?.items?.length===0&&(0,a.jsx)("p",{className:h.hint,children:"\u6CA1\u6709\u5F85\u5904\u7406\u8BF7\u6C42\u3002"}),c?.items?.map(l=>(0,a.jsxs)("section",{className:h.section,"data-agent-request":l.id,children:[(0,a.jsxs)("strong",{children:[l.title," \xB7 ",l.state]}),(0,a.jsxs)("p",{className:h.hint,children:["\u53D1\u8D77\u4F1A\u8BDD\uFF1A",l.sourceSessionId]}),(0,a.jsxs)("details",{children:[(0,a.jsx)("summary",{children:"\u6838\u5BF9\u5B8C\u6574\u53D8\u66F4\u8BA1\u5212"}),(0,a.jsx)("pre",{className:h.requestDetails,children:JSON.stringify({\u5F53\u524D\u8BBE\u7F6E:l.before,\u8BF7\u6C42:l.request,...l.installPlan?{\u4E0B\u8F7D\u8BA1\u5212:l.installPlan}:{},...l.modelApplyTarget?{\u6A21\u578B\u5E94\u7528\u76EE\u6807:l.modelApplyTarget}:{}},null,2)})]}),l.error&&(0,a.jsx)("p",{role:"alert",className:h.error,children:l.error.message}),l.state==="pending"&&(0,a.jsx)(j.Button,{variant:"outline",disabled:e.busy||e.agentRequestUncertain,onClick:()=>{t(n,"decide-agent-request",{id:l.id,approve:!1,acknowledgements:[]})},children:"\u53D6\u6D88\u9884\u89C8"}),l.nextAction&&(0,a.jsx)("p",{className:h.hint,children:l.nextAction})]},l.id))]})}var Bu={startConversation:"\u5F00\u59CB\u5BF9\u8BDD",endConversation:"\u7ED3\u675F\u5BF9\u8BDD",voiceTarget:"\u6295\u9012\u5230",dedicatedVoiceTarget:"\u9C7C\u5E94\u4E13\u7528\u4F1A\u8BDD",checkingVoiceTarget:"\u6B63\u5728\u6838\u5BF9\u76EE\u6807\u2026",voiceTargetChanged:"\u8BED\u97F3\u6295\u9012\u76EE\u6807\u6709\u53D8\u5316\u3002\u8BF7\u6838\u5BF9\u9996\u9875\u7684\u4F1A\u8BDD\u540E\u518D\u5F00\u59CB\u3002",chooseCurrentDshTarget:"\u4F7F\u7528\u5F53\u524D\u6253\u5F00\u4F1A\u8BDD",backToFishVoice:"\u56DE\u5230\u9C7C\u5E94",currentDshTargetError:"\u65E0\u6CD5\u786E\u8BA4\u5F53\u524D DSH \u5BF9\u8BDD\uFF0C\u8BF7\u6838\u5BF9\u540E\u91CD\u8BD5\u3002",chooseVoiceTarget:"\u9009\u62E9\u6295\u9012\u4F1A\u8BDD",searchVoiceTargets:"\u641C\u7D22\u4F1A\u8BDD\u6807\u9898\u6216 ID",searchVoiceTargetsAction:"\u641C\u7D22",existingVoiceTargetList:"\u5DF2\u6709 DSH \u4F1A\u8BDD",boundVoiceTarget:"\u5F53\u524D\u7ED1\u5B9A",voiceTargetAvailability_ready:"\u53EF\u7528",voiceTargetAvailability_busy:"\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F",voiceTargetAvailability_archived:"\u4F1A\u8BDD\u5DF2\u5F52\u6863",voiceTargetAvailability_unavailable:"\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528",voiceTargetAvailability_managed:"\u9C7C\u5E94\u7BA1\u7406\u7684\u4F1A\u8BDD\uFF0C\u65E0\u6CD5\u76F4\u63A5\u6295\u9012",voiceTargetAvailability_subagent:"\u5B50\u4EE3\u7406\u4F1A\u8BDD\uFF0C\u65E0\u6CD5\u76F4\u63A5\u6295\u9012",voiceTargetNoMatch:"\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684\u4F1A\u8BDD\u3002",voiceTargetEmptyList:"\u6682\u65E0\u53EF\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u3002",voiceTargetSynthesisNotice:"\u4F7F\u7528\u5728\u7EBF\u97F3\u8272\u65F6\uFF0C\u56DE\u7B54\u6587\u5B57\u4F1A\u4EA4\u7ED9\u5DF2\u6388\u6743\u7684\u8BED\u97F3\u5408\u6210\u670D\u52A1\u3002\u82E5\u8981\u79BB\u7EBF\u6717\u8BFB\uFF0C\u53EF\u5728\u300C\u6A21\u578B \u2192 \u6717\u8BFB\u65B9\u5F0F\u300D\u9009\u7528\u672C\u5730\u97F3\u8272\u3002",bindVoiceTarget:"\u7ED1\u5B9A\u9009\u4E2D\u4F1A\u8BDD",savingVoiceTarget:"\u6B63\u5728\u4FDD\u5B58\u2026",moreVoiceTargets:"\u52A0\u8F7D\u66F4\u591A",loadingVoiceTargets:"\u6B63\u5728\u8BFB\u53D6 DSH \u4F1A\u8BDD\u2026",voiceTargetListError:"\u65E0\u6CD5\u8BFB\u53D6 DSH \u4F1A\u8BDD\u3002",retryVoiceTargets:"\u91CD\u8BD5\u8BFB\u53D6",retryTranscripts:"\u5F85\u91CD\u53D1\u7684\u8BED\u97F3",retryTranscript:"\u91CD\u53D1",retryTranscriptBusy:"\u7B49\u5F85\u53EF\u53D1\u9001",retryTranscriptSending:"\u6B63\u5728\u91CD\u53D1\u2026",retryTranscriptUncertain:"\u53D1\u9001\u7ED3\u679C\u5F85\u786E\u8BA4\uFF0C\u8BF7\u67E5\u770B\u539F\u4F1A\u8BDD\u3002",endDiscardsRetries:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u6E05\u7A7A\u5F85\u53D1\u8F6C\u5199",modeSwitching:"\u6B63\u5728\u5207\u6362\u8BF4\u8BDD\u65B9\u5F0F\u2026",modeSaving:"\u6B63\u5728\u4FDD\u5B58\u8BF4\u8BDD\u65B9\u5F0F\u2026",modeSwitchUnconfirmed:"\u8BF4\u8BDD\u65B9\u5F0F\u66F4\u6539\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u6838\u67E5\u3002",modeSwitchFailed:"\u672A\u80FD\u786E\u8BA4\u66F4\u6539\uFF0C\u8BF7\u67E5\u770B\u5F53\u524D\u65B9\u5F0F\u540E\u518D\u8BD5\u3002",updateTitle:"\u9C7C\u5E94\u66F4\u65B0",updateOfferTitle:"\u9C7C\u5E94\u6709\u65B0\u7248\u672C",updateCurrentVersion:"\u5F53\u524D",updateNewVersion:"\u65B0\u7248",updateChannel_stable:"\u6B63\u5F0F\u7248",updateChannel_preview:"\u9884\u89C8\u7248",updateCheck:"\u68C0\u67E5\u66F4\u65B0",updateDetails:"\u67E5\u770B\u66F4\u65B0",updateLater:"\u7A0D\u540E",updateInstall:"\u4E00\u952E\u66F4\u65B0",updateRelease:"\u53D1\u5E03\u8BF4\u660E",updateFeedback:"\u53CD\u9988\u95EE\u9898",update_idle:"\u6B63\u5728\u8BFB\u53D6\u66F4\u65B0\u72B6\u6001\u2026",update_checking:"\u6B63\u5728\u68C0\u67E5\u66F4\u65B0\u2026",update_current:"\u5DF2\u662F\u6700\u65B0\u7248\u672C\u3002",update_available:"\u53EF\u4EE5\u66F4\u65B0\u3002",update_incompatible:"\u65B0\u7248\u4E0E\u5F53\u524D DSH \u73AF\u5883\u4E0D\u517C\u5BB9\u3002",update_installing:"\u6B63\u5728\u66F4\u65B0\uFF0C\u5BBF\u4E3B\u53EF\u80FD\u4F1A\u91CD\u65B0\u52A0\u8F7D\u9C7C\u5E94\u2026","update_restart-required":"\u66F4\u65B0\u5DF2\u5B89\u88C5\uFF0C\u91CD\u542F DSH \u540E\u751F\u6548\u3002","update_enable-required":"\u66F4\u65B0\u5DF2\u5B89\u88C5\uFF0C\u8BF7\u5728 DSH \u63D2\u4EF6\u7BA1\u7406\u4E2D\u542F\u7528\u9C7C\u5E94\u3002",update_installed:"\u66F4\u65B0\u5DF2\u5B8C\u6210\u3002",update_error:"\u66F4\u65B0\u51FA\u9519\uFF0C\u53EF\u68C0\u67E5\u66F4\u65B0\u540E\u91CD\u8BD5\u3002",update_unsupported:"\u5F53\u524D\u73AF\u5883\u65E0\u6CD5\u81EA\u52A8\u66F4\u65B0\uFF0C\u8BF7\u67E5\u770B\u5B98\u65B9\u53D1\u5E03\u8BF4\u660E\u3002",updateConnection:"\u6682\u65F6\u65E0\u6CD5\u786E\u8BA4\u66F4\u65B0\u72B6\u6001\uFF0C\u8BF7\u5728\u5BBF\u4E3B\u5C31\u7EEA\u540E\u91CD\u65B0\u68C0\u67E5\u3002",audioDevices:"\u97F3\u9891\u8BBE\u5907",audioSystemDefault:"\u7CFB\u7EDF\u9ED8\u8BA4",audioInput:"\u97F3\u9891\u8F93\u5165",audioOutput:"\u97F3\u9891\u8F93\u51FA",inputDeviceMissing:"\u9EA6\u514B\u98CE\u672A\u8FDE\u63A5\uFF0C\u5DF2\u4FDD\u7559\u9009\u62E9",outputDeviceMissing:"\u8F93\u51FA\u672A\u8FDE\u63A5\uFF0C\u4E0D\u4F1A\u5207\u5230\u5176\u4ED6\u8BBE\u5907",deviceDisconnected:"\u672A\u8FDE\u63A5",inputDeviceStopFirst:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5207\u6362\u8F93\u5165\u3002\u8F93\u51FA\u5728\u4E0B\u4E00\u6BB5\u64AD\u653E\u751F\u6548\u3002",outputDeviceUnsupported:"\u6B64\u73AF\u5883\u6682\u4E0D\u652F\u6301\u9009\u62E9\u6717\u8BFB\u8F93\u51FA\u8BBE\u5907\u3002",deviceListRetry:"\u8BBE\u5907\u5217\u8868\u6682\u4E0D\u53EF\u7528\uFF0C\u6253\u5F00\u4E0B\u62C9\u83DC\u5355\u53EF\u91CD\u8BD5\u3002",voiceHelperCleanupHint:"\u6B63\u5728\u786E\u8BA4\u9EA6\u514B\u98CE\u5DF2\u91CA\u653E\uFF0C\u786E\u8BA4\u524D\u4E0D\u4F1A\u5F00\u542F\u65B0\u7684\u5F55\u97F3\u3002",voiceHelperRestartHint:"\u9EA6\u514B\u98CE\u670D\u52A1\u9000\u51FA\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u91CD\u542F DSH \u540E\u518D\u70B9\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u3002",inputError_device:"\u9EA6\u514B\u98CE\u4E0D\u53EF\u7528",inputError_recognition:"\u8BED\u97F3\u8BC6\u522B\u5931\u8D25","inputError_no-speech":"\u6CA1\u542C\u6E05\uFF0C\u8BF7\u518D\u8BF4\u4E00\u6B21",inputHelp_device:"\u8BF7\u68C0\u67E5\u9EA6\u514B\u98CE\u8FDE\u63A5\u4E0E\u6743\u9650\u3002\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5728\u8BBE\u7F6E\u4E2D\u9009\u8BBE\u5907\u3002\u8BE6\u60C5\u89C1\u300C\u9AD8\u7EA7\u300D\u3002",inputDiagnosticTitle:"\u6700\u8FD1\u4E00\u6B21\u97F3\u9891\u9519\u8BEF",inputDiagnosticHistory:"\u8FD9\u662F\u6700\u8FD1\u4E00\u6B21\u8BB0\u5F55\uFF0C\u53EF\u80FD\u6765\u81EA\u4E4B\u524D\u7684\u5C1D\u8BD5\uFF1B\u4E0D\u4EE3\u8868\u5F53\u524D\u8BBE\u5907\u72B6\u6001\u3002",inputHelp_recognition:"\u8BF7\u91CD\u8BD5\u3002\u4ECD\u5931\u8D25\u65F6\uFF0C\u7ED3\u675F\u5BF9\u8BDD\u540E\u5728\u8BBE\u7F6E\u4E2D\u68C0\u67E5\u8BC6\u522B\u6A21\u578B\u3002","inputHelp_no-speech":"\u8BF7\u9760\u8FD1\u9EA6\u514B\u98CE\u91CD\u8BD5\uFF0C\u5E76\u68C0\u67E5\u662F\u5426\u9759\u97F3\u3002",speechFailed:"\u6717\u8BFB\u5931\u8D25",speechInterrupted:"\u6717\u8BFB\u5DF2\u4E2D\u65AD",wakeFallbackHint:"\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\u3002\u76EE\u524D\u6309\u8F6C\u5199\u5339\u914D\u3002\u5207\u6362\u6A21\u5F0F\u540E\u518D\u9009\u300C\u5524\u9192\u8BCD\u300D\u53EF\u91CD\u8BD5\u58F0\u97F3\u5339\u914D\u3002",wakeMode:"\u5524\u9192\u8BCD",switchToWake:"\u70B9\u6309\u5207\u5230\u5524\u9192\u8BCD\u6A21\u5F0F\uFF0C\u9EA6\u514B\u98CE\u5C06\u7B49\u5F85\u8BBE\u5B9A\u79F0\u547C",wakeDisabled:"\u5524\u9192\u76D1\u542C\u672A\u5F00\u542F",wakeStarting:"\u6B63\u5728\u542F\u52A8\u5524\u9192\u76D1\u542C\u2026",wakeWaiting:"\u7B49\u5F85\u5524\u9192\u8BCD",wakeListening:"\u6B63\u5728\u542C\u4E0B\u4E00\u53E5",wakePaused:"\u5524\u9192\u76D1\u542C\u5DF2\u6682\u505C",wakeError:"\u5524\u9192\u76D1\u542C\u4E0D\u53EF\u7528\uFF0C\u8BF7\u67E5\u770B\u8BBE\u7F6E",wakeHint:"\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\uFF0C\u518D\u8BF4\u6307\u4EE4\u3002\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u76D1\u542C\u3002",wakeMethod:"\u77ED\u53E5\u7ED3\u675F\u540E\u5728\u672C\u673A\u6BD4\u8F83\u79F0\u547C\u7684\u58F0\u97F3\u548C\u8F6C\u5199\u3002",wakeAliases:"\u5524\u9192\u79F0\u547C",wakeAliasesHint:"\u6700\u591A8\u4E2A\uFF0C\u9017\u53F7\u5206\u9694\uFF1B\u4E2D\u6587\u652F\u6301\u53E5\u9996\u8FD1\u97F3\uFF0C\u5EFA\u8BAE\u7528\u72EC\u7279\u76843\u5B57\u4EE5\u4E0A\u79F0\u547C\u3002",wakeTimeout:"\u5524\u9192\u540E\u7B49\u5F85\uFF08\u79D2\uFF09",wakeSettings:"\u5524\u9192\u8BCD\u8BBE\u7F6E",wakeStopToEdit:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u79F0\u547C\u548C\u7B49\u5F85\u65F6\u95F4\u3002",wakeInvalid:"\u8BF7\u586B1\u20138\u4E2A\u6709\u6548\u79F0\u547C\uFF0C\u7B49\u5F85\u65F6\u95F4\u4E3A3\u201330\u79D2\u3002",switchToPtt:"\u70B9\u6309\u5207\u56DE\u6309\u4F4F\u8BF4\u8BDD",switchToAlways:"\u70B9\u6309\u5207\u5230\u81EA\u7531\u9EA6\uFF0C\u9EA6\u514B\u98CE\u5C06\u6301\u7EED\u8046\u542C",quickSpeedStop:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5207\u6362\u901F\u5EA6",performanceReadFirst:"\u5148\u68C0\u67E5\u5F53\u524D\u6A21\u578B\u652F\u6301\u54EA\u4E9B\u901F\u5EA6\u3002",performanceUnavailable:"\u63D0\u4F9B\u5546\u5DF2\u660E\u786E\u62D2\u7EDD\u7070\u8272\u6863\u4F4D\u7684\u601D\u8003\u53C2\u6570\uFF1B\u5176\u4ED6\u6863\u4F4D\u4ECD\u53EF\u9009\u62E9\u3002",performanceProbeCost:"\u52A0\u8F7D\u65F6\u7528\u6700\u591A 3 \u4E2A\u56FA\u5B9A\u77ED\u8BF7\u6C42\u68C0\u6D4B\u6863\u4F4D\uFF0C\u6309\u6A21\u578B\u8BA1\u8D39\u3002",performanceProbeScope:"\u53EA\u6709\u63D0\u4F9B\u53EF\u68C0\u6D4B\u63A5\u53E3\u7684\u6A21\u578B\u8DEF\u7EBF\u4F1A\u53D1\u9001\u77ED\u8BF7\u6C42\uFF0C\u539F\u751F\u652F\u6301\u7684\u6863\u4F4D\u53EF\u76F4\u63A5\u67E5\u770B\u3002",performanceProbeUnknown:"\u90E8\u5206\u6863\u4F4D\u6682\u672A\u786E\u8BA4\u3002\u53EF\u68C0\u67E5\u7F51\u7EDC\u6216\u767B\u5F55\u540E\u91CD\u65B0\u68C0\u6D4B\u3002",performanceProbeAccepted:"\u6863\u4F4D\u8BF7\u6C42\u68C0\u6D4B\u901A\u8FC7\u3002",performanceProbePending:"\u6B63\u5728\u68C0\u67E5\u5F53\u524D\u6A21\u578B\u7684\u6863\u4F4D\u2026",holdToSpeak:"\u8BF4\u8BDD\u65F6\u6309\u4F4F",alwaysWarning:"\u81EA\u7531\u9EA6\u4F1A\u6301\u7EED\u542C\u53D6\u8BED\u97F3\u3002\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u76D1\u542C\u3002",bindingMissing:"\u672A\u7ED1\u5B9A\u8BF4\u8BDD\u6309\u952E\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u4E2D\u7ED1\u5B9A\uFF0C\u6216\u5207\u6362\u6301\u7EED\u8046\u542C\u3002",noSession:"\u8FD8\u6CA1\u6709\u6253\u5F00\u5BF9\u8BDD",otherWindow:"\u9EA6\u514B\u98CE\uFF1A\u53E6\u4E00\u4E2A\u7A97\u53E3",readingStatus:"\u6B63\u5728\u8BFB\u53D6\uFF0C\u4E0D\u4F1A\u542F\u52A8\u9EA6\u514B\u98CE\u6216\u6A21\u578B\u3002",statusRetry:"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u72B6\u6001\u3002\u8FD4\u56DE\u7A97\u53E3\u65F6\u4F1A\u81EA\u52A8\u6838\u67E5\u3002",retryStatus:"\u91CD\u65B0\u8BFB\u53D6\u72B6\u6001",collapseHint:"\u6536\u8D77\u540E\u4F1A\u7EE7\u7EED\u5BF9\u8BDD",stopConsequence:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u91CA\u653E\u9EA6\u514B\u98CE\u5E76\u505C\u6B62\u672C\u6B21\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u3002",transferTitle:"\u63A5\u7BA1\u53E6\u4E00\u4E2A\u7A97\u53E3\u7684\u9EA6\u514B\u98CE\uFF1F",transferWarning:"\u8FD9\u4F1A\u4E2D\u65AD\u53E6\u4E00\u4E2A\u7A97\u53E3\u7684\u8BED\u97F3\uFF0C\u5E76\u53EF\u80FD\u7ED3\u675F\u5B83\u7684\u540E\u53F0\u4EFB\u52A1\u3002",cancel:"\u53D6\u6D88",confirmTransfer:"\u786E\u8BA4\u63A5\u7BA1",bindingStopRequired:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u9F20\u6807\u6216\u952E\u76D8\u6309\u952E\u3002",bindingFinishing:"\u8BED\u97F3\u6B63\u5728\u505C\u6B62\uFF0C\u8BF7\u7A0D\u5019\u518D\u4FEE\u6539\u6309\u952E\u3002",headphonesRequired:"\u5148\u52FE\u9009\u201C\u6211\u5DF2\u4F7F\u7528\u8033\u673A\u201D\uFF0C\u624D\u80FD\u5F00\u542F\u81EA\u52A8\u6253\u65AD\u3002",deviceManualIndex:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u5E8F\u53F7",deviceManualName:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u540D\u79F0",deviceIndexInvalid:"\u8BBE\u5907\u5E8F\u53F7\u9700\u8981\u662F\u975E\u8D1F\u6574\u6570\u3002",deviceDefault:"\u4F7F\u7528\u7CFB\u7EDF\u9ED8\u8BA4\u9EA6\u514B\u98CE",deviceManual:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u540D\u79F0\u6216\u5E8F\u53F7",deviceSaved:"\u5DF2\u4FDD\u5B58\u7684\u8BBE\u5907",deviceEmpty:"\u97F3\u9891\u670D\u52A1\u6CA1\u6709\u627E\u5230\u9EA6\u514B\u98CE\u3002\u8BF7\u8FDE\u63A5\u8BBE\u5907\u5E76\u68C0\u67E5\u7CFB\u7EDF\u58F0\u97F3\u8BBE\u7F6E\u3002",deviceUnknown:"\u5F00\u59CB\u5BF9\u8BDD\u540E\u4F1A\u5217\u51FA\u68C0\u6D4B\u5230\u7684\u8BBE\u5907\u3002\u73B0\u5728\u53EF\u4F7F\u7528\u7CFB\u7EDF\u9ED8\u8BA4\uFF0C\u6216\u5728\u9AD8\u7EA7\u9009\u9879\u624B\u52A8\u586B\u5199\u3002",ttsBackend:"\u8BED\u97F3\u5408\u6210\u540E\u7AEF",ttsBackendHint:"\u58F0\u97F3\u7531\u5DF2\u5B89\u88C5\u7684 TTS \u540E\u7AEF\u63D0\u4F9B\uFF0C\u9700\u5728\u8BE5\u540E\u7AEF\u5B8C\u6210\u914D\u7F6E\u3002\u72EC\u7ACB\u97F3\u91CF\u4EC5\u5728\u9A8C\u8BC1\u652F\u6301\u65F6\u663E\u793A\u3002",ttsBackendPending:"\u66F4\u591A\u540E\u7AEF\u9009\u62E9\u6B63\u5728\u9002\u914D\uFF0C\u5F53\u524D\u4E0D\u4F1A\u81EA\u52A8\u63A5\u5165\u4E91\u670D\u52A1\u3002",voiceClone:"\u58F0\u97F3\u514B\u9686",voiceCloneAvailable:"Qwen \u652F\u6301\u672C\u5730\u53C2\u8003\u97F3\u8272\uFF0C\u53EF\u5728\u6717\u8BFB\u65B9\u5F0F\u7684\u97F3\u8272\u8BBE\u7F6E\u4E2D\u9009\u62E9 WAV\u3002",voiceClonePrivacy:"\u4EC5\u8BFB\u53D6\u4F60\u9009\u62E9\u4E14\u6709\u6743\u4F7F\u7528\u7684\u58F0\u97F3\u6837\u672C\uFF0C\u4E0D\u4E0A\u4F20\u3002",inputActive:"\u6B63\u5728\u63A5\u6536\u8BED\u97F3",modeUnknown:"\u542C\u53D6\u65B9\u5F0F\u672A\u77E5",voiceInputUnavailable:"\u5F55\u97F3\u6682\u4E0D\u53EF\u7528",voiceInputRecoveryHint:"\u8BED\u97F3\u670D\u52A1\u5DF2\u4E2D\u65AD\u3002\u8BF7\u7ED3\u675F\u5BF9\u8BDD\u540E\u91CD\u65B0\u5F00\u59CB\u3002",searchHistory:"\u641C\u7D22\u4F1A\u8BDD",searchScope:"\u641C\u7D22\u5DF2\u8F7D\u5165\u7684\u4F1A\u8BDD",noMatches:"\u6CA1\u6709\u5339\u914D\u7684\u4F1A\u8BDD",differentOwner:"\u9EA6\u514B\u98CE\u5728\u53E6\u4E00\u4E2A\u7A97\u53E3\u4F7F\u7528\u3002\u9700\u8981\u65F6\u53EF\u660E\u786E\u63A5\u7BA1\u3002",details:"\u8BCA\u65AD\u8BE6\u60C5",noReply:"\u8FD8\u6CA1\u6709\u5BF9\u8BDD",newChatCreated:"\u5DF2\u65B0\u5EFA\u4F1A\u8BDD",newChatActive:"\u65B0\u5EFA\u8BED\u97F3\u4F1A\u8BDD\u3002\u5F53\u524D\u4F1A\u8BDD\u7684\u540E\u53F0\u4EFB\u52A1\u4F1A\u505C\u6B62\uFF0C\u8BB0\u5F55\u4F1A\u4FDD\u7559\u3002",newChatOtherOwner:"\u8BF7\u5728\u5F53\u524D\u8BED\u97F3\u4F1A\u8BDD\u6216\u5F00\u542F\u9EA6\u514B\u98CE\u7684\u7A97\u53E3\u4E2D\u65B0\u5EFA\u3002",recentConversation:"\u5BF9\u8BDD",recentTenTurns:"\u6700\u8FD1 10 \u8F6E",allRecords:"\u5168\u90E8\u8BB0\u5F55",showAllRecords:"\u5C55\u5F00\u5168\u90E8",collapseToTen:"\u6536\u8D77\u81F3 10 \u8F6E",collapseConversation:"\u6536\u8D77\u5BF9\u8BDD",currentVoiceRecords:"\u5F53\u524D\u8BED\u97F3\u804A\u5929",historyTruncated:"\u5DF2\u5207\u6362\u663E\u793A\u533A\u95F4\uFF0C\u539F\u8BB0\u5F55\u4ECD\u4FDD\u7559",viewConversation:"\u67E5\u770B\u8BED\u97F3\u8BB0\u5F55",loadEarlier:"\u52A0\u8F7D\u66F4\u65E9\u8BB0\u5F55",readingHistory:"\u6B63\u5728\u8BFB\u53D6\u8BB0\u5F55\u2026",retryHistory:"\u8BFB\u53D6\u8BB0\u5F55\u5931\u8D25\uFF0C\u70B9\u51FB\u91CD\u8BD5",noConversation:"\u8FD8\u6CA1\u6709\u5BF9\u8BDD",newMessages:"\u6761\u65B0\u6D88\u606F",conversationMessages:"\u8BED\u97F3\u5BF9\u8BDD\u8BB0\u5F55",assistantName:"\u52A9\u624B\u79F0\u547C",renameAssistant:"\u70B9\u51FB\u6539\u540D\uFF0CEnter \u4FDD\u5B58\uFF0CEsc \u53D6\u6D88",compact_off:"\u672A\u5F00\u542F",compact_standby:"\u5F85\u673A",compact_listening:"\u8046\u542C\u4E2D",compact_pending:"\u5904\u7406\u4E2D",compact_unknown:"\u5F85\u68C0\u67E5",you:"\u4F60",assistant:"\u52A9\u624B",close:"\u5173\u95ED\u9762\u677F",keyboardBinding:"\u952E\u76D8\u6309\u4F4F\u8BF4\u8BDD",bindingOff:"\u672A\u7ED1\u5B9A",saveBindings:"\u4FDD\u5B58\u6309\u952E",discardBindings:"\u53D6\u6D88\u4FEE\u6539",bindingCapture:"\u6309\u4E0B\u8981\u7ED1\u5B9A\u7684\u952E\uFF08Esc \u53D6\u6D88\uFF09",clearBinding:"\u6E05\u9664\u7ED1\u5B9A",bindingUnsupported:"\u4E0D\u652F\u6301\u8BE5\u6309\u952E\u6216\u7CFB\u7EDF\u7EC4\u5408\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u3002",bindingGlobalHint:"Windows \u5168\u5C40\u5FEB\u6377\u952E\u3002\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5F55\u5165\uFF0C\u4FDD\u5B58\u540E\u4E0B\u6B21\u5F00\u59CB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002\u6309\u952E\u4E0D\u4F1A\u88AB\u62E6\u622A\uFF0C\u53EF\u80FD\u540C\u65F6\u89E6\u53D1\u5176\u4ED6\u5E94\u7528\u7684\u5FEB\u6377\u64CD\u4F5C\u3002",bindingUnavailable:"\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301\u5168\u5C40\u6309\u952E\u7ED1\u5B9A\u3002",bindingPrintableWarning:"\u5355\u72EC\u4F7F\u7528\u6587\u5B57\u3001\u6570\u5B57\u6216\u7A7A\u683C\u952E\u4F1A\u5728\u5176\u4ED6\u5E94\u7528\u8F93\u5165\u65F6\u89E6\u53D1\u6309\u952E\u8BF4\u8BDD\u3002",performanceTitle:"\u56DE\u7B54\u901F\u5EA6",performanceHint:"\u4E0B\u6B21\u5F00\u59CB\u9C7C\u5E94\u72EC\u7ACB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002\u7ED1\u5B9A\u539F\u4F1A\u8BDD\u65F6\uFF0C\u5728\u8BE5 DSH \u5BF9\u8BDD\u7684\u6A21\u578B\u83DC\u5355\u91CC\u8C03\u6574\u601D\u8003\u6863\u4F4D\u3002",inspectPerformance:"\u68C0\u67E5\u53EF\u7528\u901F\u5EA6",performance_fast:"\u5FEB",performanceNoThinking:"\u65E0\u601D\u8003",performanceRecommended:"[\u63A8\u8350]",performanceFastHint:"\u5FEB\u6863\u4F1A\u660E\u786E\u8BF7\u6C42\u5173\u95ED\u601D\u8003\u3002",performanceFastUnavailable:"\u5F53\u524D\u6A21\u578B\u8DEF\u7EBF\u65E0\u6CD5\u786E\u8BA4\u5173\u95ED\u601D\u8003\u3002\u53EF\u9009\u300C\u8DDF\u968F\u6A21\u578B\u300D\uFF0C\u6216\u5728\u6A21\u578B\u8BBE\u7F6E\u4E2D\u66F4\u6362\u652F\u6301\u65E0\u601D\u8003\u7684\u5BF9\u8BDD\u6A21\u578B\u3002",performanceHostUnavailable:"\u5F53\u524D\u6A21\u578B\u8DEF\u7EBF\u672A\u63D0\u4F9B\u90E8\u5206\u601D\u8003\u6863\u4F4D\u3002",performance_balanced:"\u6807\u51C6",performance_high:"\u4ED4\u7EC6",performance_compatibility:"\u8DDF\u968F\u6A21\u578B",performanceStopRequired:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u56DE\u7B54\u901F\u5EA6\u3002\u5F53\u524D\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u4F1A\u505C\u6B62\u3002",savePerformance:"\u4FDD\u5B58\u56DE\u7B54\u901F\u5EA6",outputVolume:"\u52A9\u624B\u8BED\u97F3\u97F3\u91CF",outputVolumeHint:"\u4EC5\u8C03\u6574\u5DF2\u5B89\u88C5\u7684 Windows dsh-speak \u540E\u7AEF\uFF0C\u4E0D\u4EE3\u8868\u5F53\u524D\u8BED\u97F3\u8DEF\u7531\u6B63\u5728\u4F7F\u7528\u5B83\uFF1B\u4E0D\u5F71\u54CD DSTuber\u3001\u7CFB\u7EDF\u603B\u97F3\u91CF\u6216\u63D0\u793A\u97F3\u3002\u4E0B\u4E00\u6BB5\u8F93\u51FA\u751F\u6548\u3002",readOutputVolume:"\u8BFB\u53D6\u8BED\u97F3\u97F3\u91CF",saveOutputVolume:"\u4FDD\u5B58\u8BED\u97F3\u97F3\u91CF",outputVolumeUnavailable:"\u5F53\u524D\u8BED\u97F3\u540E\u7AEF\u4E0D\u652F\u6301\u72EC\u7ACB\u97F3\u91CF\u8C03\u8282\u3002",outputVolumeUnknown:"\u97F3\u91CF\u4FDD\u5B58\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u4F1A\u81EA\u52A8\u6838\u67E5\uFF0C\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002",settingsTitle:"\u9C7C\u5E94\u8BBE\u7F6E",settingsSections:"\u8BBE\u7F6E\u5206\u7C7B",tab_audio:"\u97F3\u9891",tab_interaction:"\u4EA4\u4E92",tab_prompt:"\u63D0\u793A\u8BCD",voicePromptLabel:"\u81EA\u5B9A\u4E49\u63D0\u793A\u8BCD",voicePromptOptional:"\uFF08\u53EF\u9009\uFF09",voicePromptAgents:"\u8DDF\u968F AGENTS",voicePromptCustom:"\u5DF2\u9644\u52A0\u81EA\u5B9A\u4E49",voicePromptPlaceholder:`\u4F8B\u5982\uFF1A\u7528\u4E2D\u6587\u56DE\u590D\uFF0C\u5148\u8BF4\u7ED3\u8BBA\uFF0C\u8BED\u6C14\u81EA\u7136\u3002

\u5185\u5BB9\u4F1A\u9644\u52A0\u5728 AGENTS \u540E\u3002\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u8BBE\u7F6E\u3002`,voicePromptStopToEdit:"\u505C\u6B62\u8BED\u97F3\u540E\u53EF\u7F16\u8F91",voicePromptUnsupported:"\u5F53\u524D DSH \u6682\u4E0D\u652F\u6301\u81EA\u5B9A\u4E49\u63D0\u793A\u8BCD\u3002",voicePromptTooLong:"\u63D0\u793A\u8BCD\u4E0D\u80FD\u8D85\u8FC7 32,768 \u4E2A\u5B57\u7B26\u3002",voicePromptSaving:"\u4FDD\u5B58\u4E2D\u2026",voicePromptCancel:"\u53D6\u6D88\u4FEE\u6539",voicePromptSave:"\u4FDD\u5B58",voicePromptSaved:"\u5DF2\u4FDD\u5B58\uFF0C\u4E0B\u6B21\u5F00\u542F\u8BED\u97F3\u65F6\u751F\u6548\u3002",voicePromptSaveFailed:"\u4FDD\u5B58\u672A\u6210\u529F\uFF0C\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002",voicePromptUnsaved:"\u5C1A\u672A\u4FDD\u5B58",tab_models:"\u6A21\u578B",tab_advanced:"\u9AD8\u7EA7",projectInfoTitle:"\u5173\u4E8E\u9C7C\u5E94",projectAuthor:"\u4F5C\u8005",projectRepository:"\u5B98\u65B9\u4ED3\u5E93",projectNpm:"npm \u53D1\u5E03\u9875",tab_sessions:"\u4F1A\u8BDD\u7BA1\u7406",settingsContent:"\u8BBE\u7F6E\u5185\u5BB9",voiceCleanupPending:"\u6B63\u5728\u91CA\u653E\u65E7\u97F3\u9891\u670D\u52A1",voiceCleanupHint:"\u7B49\u5F85\u65E7\u4F1A\u8BDD\u548C\u5F55\u97F3\u9000\u51FA\uFF0C\u5B8C\u6210\u540E\u4F1A\u81EA\u52A8\u66F4\u65B0\u3002",voiceRestartPending:"\u9700\u8981\u91CD\u542F DSH",voiceRestartHint:"\u65E7\u7248\u97F3\u9891\u670D\u52A1\u7684\u9000\u51FA\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u91CD\u542F DSH \u540E\u518D\u70B9\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u3002\u5DF2\u4FDD\u5B58\u7684\u6388\u6743\u4E0D\u53D8\u3002",voiceRecoveryPending:"\u65E7\u8BED\u97F3\u4F1A\u8BDD\u5C1A\u672A\u9000\u51FA",voiceRecoveryCheck:"\u6838\u67E5\u5E76\u505C\u6B62",voiceRecoveryHint:"\u65E7\u5B9E\u4F8B\u4ECD\u5728\u9000\u51FA\uFF0C\u8BF7\u5148\u6838\u67E5\u505C\u6B62\u3002\u82E5\u4E00\u76F4\u672A\u9000\u51FA\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F DSH \u540E\u518D\u70B9\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u3002",operationUnavailable:"\u64CD\u4F5C\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\uFF1B\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002\u8BE6\u60C5\u89C1\u9AD8\u7EA7\u8BBE\u7F6E\u3002",enableFailed:"\u65E0\u6CD5\u5F00\u59CB\u5BF9\u8BDD\u3002\u8BF7\u5728\u8BBE\u7F6E\u7684\u300C\u9AD8\u7EA7\u300D\u67E5\u770B\u539F\u56E0\u540E\u91CD\u8BD5\u3002",tab_pets:"\u684C\u5BA0",planned:"\u8BA1\u5212\u5F00\u53D1\u4E2D",configurationUnknown:"\u914D\u7F6E\u4FDD\u5B58\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\uFF1B\u6838\u5B9E\u524D\u4E0D\u80FD\u7EE7\u7EED\u4FEE\u6539\u3002",motionTitle:"\u754C\u9762\u52A8\u753B",motion_spring:"Q \u5F39",motion_firm:"\u786C\u6717",motion_off:"\u5173\u95ED\u52A8\u753B",motionHint:"\u7ACB\u5373\u9884\u89C8\u5E76\u4FDD\u5B58\uFF1B\u64CD\u4F5C\u4E0D\u7B49\u5F85\u52A8\u753B\u3002\u7CFB\u7EDF\u51CF\u5C11\u52A8\u6001\u6548\u679C\u4F18\u5148\u3002",motionNotSaved:"\u672C\u6B21\u9884\u89C8\u5DF2\u5E94\u7528\uFF0C\u4F46\u6B64\u6D4F\u89C8\u5668\u65E0\u6CD5\u4FDD\u5B58\u52A8\u753B\u504F\u597D\u3002",modeControlPending:"\u8BED\u97F3\u63A7\u5236\u5C1A\u672A\u5B8C\u6210\u6216\u72B6\u6001\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\u3002",capabilityTitle:"\u5BF9\u8BDD\u5728\u4FA7\u680F\u4E2D\u7684\u663E\u793A",supported:"\u53EF\u7528",unsupported:"\u4E0D\u53EF\u7528\u6216\u5C1A\u672A\u786E\u8BA4",hiddenMode:"\u4E0D\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD",workspaceMode:"\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD",taskCapability:"\u540E\u53F0\u4EFB\u52A1\u652F\u6301",configuredMode:"\u5DF2\u4FDD\u5B58\u6A21\u5F0F",currentVoiceMode:"\u5F53\u524D\u5BF9\u8BDD\u7684\u5B9E\u9645\u6A21\u5F0F",noActiveVoice:"\u6CA1\u6709\u8FD0\u884C\u4E2D\u7684\u5BF9\u8BDD",chooseVisibility:"\u9009\u62E9\u663E\u793A\u6A21\u5F0F",workspaceWarning:"\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD\u4F1A\u628A\u5BF9\u8BDD\u663E\u793A\u5728\u666E\u901A\u5DE5\u4F5C\u533A\u4E2D\u3002\u9690\u85CF\u6A21\u5F0F\u4E0D\u53EF\u7528\u65F6\u4ECD\u4F1A\u62D2\u7EDD\u542F\u52A8\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u6539\u4E3A\u53EF\u89C1\u3002",visibilityNoMigration:"\u6B64\u8BBE\u7F6E\u7528\u4E8E\u540E\u7EED\u5BF9\u8BDD\uFF1B\u5DF2\u6709\u5BF9\u8BDD\u4FDD\u6301\u539F\u663E\u793A\u65B9\u5F0F\u3002",modeReadFirst:"\u6B63\u5728\u6838\u67E5\u5F53\u524D\u5BF9\u8BDD\u7684\u914D\u7F6E\u548C\u72B6\u6001\uFF0C\u786E\u8BA4\u540E\u53EF\u4FEE\u6539\u6A21\u5F0F\u3002",closeBeforeMode:"\u8BF7\u5148\u5173\u95ED\u8BED\u97F3\uFF0C\u786E\u8BA4\u5B8C\u5168\u505C\u6B62\u540E\u53EF\u4FEE\u6539\u663E\u793A\u6A21\u5F0F\u3002",saveWorkspace:"\u4FDD\u5B58\u5DE5\u4F5C\u533A\u53EF\u89C1\u6A21\u5F0F",saveHidden:"\u4FDD\u5B58\u9690\u85CF\u6A21\u5F0F",visibilityUnknownWrite:"\u663E\u793A\u6A21\u5F0F\u5199\u5165\u7ED3\u679C\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\u3002\u6838\u5B9E\u524D\u4E0D\u80FD\u7EE7\u7EED\u4FEE\u6539\uFF0C\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002",outputObservationUnavailable:"\u5C1A\u672A\u63A5\u5165\u771F\u5B9E\u64AD\u97F3\u5F00\u59CB\u4E8B\u4EF6\uFF0C\u65E0\u6CD5\u786E\u8BA4\u6B63\u5728\u64AD\u97F3",title:"\u9C7C\u5E94",description:"\u8BED\u97F3\u63A7\u5236\u3001\u97F3\u9891\u8BBE\u7F6E\u4E0E\u72EC\u7ACB\u5BF9\u8BDD\u3002",drag:"\u79FB\u52A8\u9C7C\u5E94\u60AC\u6D6E\u7A97",dragHint:"\u7528\u9F20\u6807\u62D6\u52A8\u7A7A\u767D\u533A\u57DF\u79FB\u52A8\uFF1B\u6309\u94AE\u548C\u8F93\u5165\u6846\u6B63\u5E38\u64CD\u4F5C",collapse:"\u6536\u8D77",reopen:"\u6253\u5F00\u9C7C\u5E94",refresh:"\u5237\u65B0\u72B6\u6001",settings:"\u8BBE\u7F6E",unknown:"\u6B63\u5728\u8BFB\u53D6\u72B6\u6001\u2026",enabled:"\u9EA6\u514B\u98CE\uFF1A\u5DF2\u5F00\u542F",disabled:"\u9EA6\u514B\u98CE\uFF1A\u672A\u5F00\u542F",identity:"\u5B8C\u6574\u4F1A\u8BDD\u6807\u8BC6",source:"\u6388\u6743\u6765\u6E90",actor:"\u64CD\u4F5C\u4F1A\u8BDD",none:"\u65E0",openSession:"\u5148\u5728 DSH \u4FA7\u680F\u65B0\u5EFA\u6216\u6253\u5F00\u4E00\u4E2A\u5BF9\u8BDD\uFF0C\u518D\u56DE\u5230\u9C7C\u5E94\u3002",enable:"\u5F00\u9EA6",transfer:"\u8BA9\u8FD9\u4E2A\u7A97\u53E3\u63A5\u7BA1\u9EA6\u514B\u98CE",disable:"\u5173\u9EA6",stale:"\u72B6\u6001\u6682\u65F6\u8BFB\u4E0D\u5230",snapshot:"\u4E0A\u6B21\u8BFB\u53D6\u7684\u72B6\u6001",consequence:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u672C\u6B21\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u3002\u6536\u8D77\u540E\u4F1A\u7EE7\u7EED\u5BF9\u8BDD\u3002",savedHint:"\u8BBE\u5907\u4E0E\u58F0\u7EB9\u8BBE\u7F6E\u5728\u4E0B\u6B21\u97F3\u9891\u64CD\u4F5C\u65F6\u751F\u6548",more:"\u66F4\u591A\u5BF9\u8BDD",historyOther:"\u5217\u8868\u6765\u81EA\u5176\u4ED6\u64CD\u4F5C\u4F1A\u8BDD\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6",helperOnline:"\u97F3\u9891\u670D\u52A1\u5728\u7EBF",helperOffline:"\u97F3\u9891\u670D\u52A1\u79BB\u7EBF",pending:"\u6B63\u5728\u5904\u7406\u2026",refreshHint:"\u53EA\u8BFB\u53D6\u72B6\u6001\uFF0C\u4E0D\u542F\u52A8\u9EA6\u514B\u98CE\u6216\u6A21\u578B",modelGuide:"\u8BF7\u6309\u63D2\u4EF6\u76EE\u5F55 docs/model-setup.md\uFF0C\u56FA\u5B9A\u7248\u672C\u540E\u624B\u52A8\u4E0B\u8F7D\u5E76\u6821\u9A8C\u3002\u6765\u6E90\u8D26\u53F7\u3001\u8BB8\u53EF\u4E0E\u56FD\u5185\u53EF\u7528\u6027\u672A\u5728\u8FD9\u91CC\u9A8C\u8BC1",sensevoiceSource:"SenseVoice \u6765\u6E90",whisperSource:"Whisper \u6765\u6E90",ttsSource:"\u5916\u90E8 TTS \u53C2\u8003",licenseNote:"SenseVoice \u8BB8\u53EF\u8BA8\u8BBA",modelTitle:"\u672C\u5730\u6A21\u578B",modelHint:"\u4EC5\u4FDD\u5B58\u8DEF\u5F84\uFF0C\u4E0D\u4E0B\u8F7D\u3001\u6267\u884C\u6216\u52A0\u8F7D\u6A21\u578B\uFF1B\u6A21\u578B\u6587\u4EF6\u5C1A\u672A\u9A8C\u8BC1\u3002Whisper \u53EA\u4F7F\u7528\u672C\u5730\u6587\u4EF6\uFF0CCAM++ \u53EF\u9009\u4E14\u4E0D\u4F1A\u56E0\u6B64\u5F00\u542F\u58F0\u7EB9\u8FC7\u6EE4\u3002TTS \u5728\u5916\u90E8\u540E\u7AEF\u914D\u7F6E",asr:"ASR \u5F15\u64CE",sensevoicePath:"SenseVoice \u672C\u5730\u76EE\u5F55",whisperPath:"Whisper \u672C\u5730\u76EE\u5F55",campplusPath:"CAM++ \u6587\u4EF6\uFF08\u53EF\u9009\uFF09",saveModels:"\u4FDD\u5B58\u6A21\u578B\u8DEF\u5F84",audioTitle:"\u97F3\u9891\u8BBE\u7F6E",soundTitle:"\u8F6E\u6B21\u63D0\u793A\u97F3",headphones:"\u6211\u5DF2\u4F7F\u7528\u8033\u673A",headphonesHint:"\u672A\u786E\u8BA4\u8033\u673A\u65F6\uFF0C\u4E3A\u907F\u514D\u5916\u653E\u56DE\u58F0\u4E0D\u64AD\u653E\u63D0\u793A\u97F3\uFF1B\u8FD9\u4E0D\u662F\u56DE\u58F0\u6D88\u9664\uFF0C\u4E5F\u4E0D\u4F1A\u88C1\u6389\u7528\u6237\u8BB2\u8BDD",automaticBargeIn:"\u542F\u7528\u5B9E\u9A8C\u6027\u81EA\u52A8\u6253\u65AD",stopRequested:"\u5DF2\u8BF7\u6C42\u505C\u6B62\u64AD\u653E\uFF0C\u5C1A\u672A\u786E\u8BA4",stopConfirmed:"\u5DF2\u786E\u8BA4\u505C\u6B62\u64AD\u653E",soundEnabled:"\u542F\u7528\u63D0\u793A\u97F3",soundVolume:"\u63D0\u793A\u97F3\u97F3\u91CF\uFF080\u20131\uFF09",soundUnavailable:"\u97F3\u6548\u6682\u672A\u63A5\u5165\uFF1B\u8FD9\u4E9B\u63A7\u4EF6\u4E0D\u4F1A\u5047\u88C5\u64AD\u653E",soundAvailable:"\u97F3\u6548\u5DF2\u63A5\u5165",mode:"\u8BF4\u8BDD\u65B9\u5F0F",alwaysOn:"\u5F00\u542F\u6301\u7EED\u8046\u542C\uFF08\u9EA6\u514B\u98CE\u5E38\u5F00\uFF09",alwaysOff:"\u5207\u56DE\u6309\u4F4F\u8BF4\u8BDD",modeUnavailable:"\u8BF4\u8BDD\u65B9\u5F0F\u63A7\u5236\u5C1A\u672A\u63A5\u5165",modeNeedsGrant:"\u8BF7\u5148\u8BFB\u53D6\u6700\u65B0\u72B6\u6001\u3002",pttMode:"\u6309\u952E\u8BF4\u8BDD",alwaysMode:"\u81EA\u7531\u9EA6",modeHint:"\u5F00\u59CB\u5BF9\u8BDD\u524D\u53EF\u9884\u9009\u8BF4\u8BDD\u65B9\u5F0F\u3002",readSettings:"\u8BFB\u53D6\u8BBE\u7F6E",device:"\u9EA6\u514B\u98CE\u8BBE\u5907",deviceHint:"\u8BBE\u5907\u540D\u79F0\u6765\u81EA\u97F3\u9891\u670D\u52A1\u7684\u6700\u8FD1\u8BFB\u53D6\u3002\u66F4\u6362\u8BBE\u5907\u540E\uFF0C\u5F00\u59CB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002",sideButton:"\u9F20\u6807\u6309\u4F4F\u8BF4\u8BDD",sideOff:"\u5173\u95ED",sideOne:"\u4FA7\u952E 1",sideTwo:"\u4FA7\u952E 2",speaker:"\u5B9E\u9A8C\u6027\u58F0\u7EB9\u8FC7\u6EE4",speakerHint:"\u6B64\u5F00\u5173\u53EA\u7528\u4E8E\u5DF2\u6709\u7684\u58F0\u7EB9\u914D\u7F6E\uFF1B\u5F53\u524D\u9762\u677F\u6CA1\u6709\u6CE8\u518C\u5165\u53E3\u3002",save:"\u4FDD\u5B58\u8BBE\u7F6E",saved:"\u8BBE\u7F6E\u5DF2\u4FDD\u5B58",historyTitle:"\u5BF9\u8BDD\u5386\u53F2",historyHint:"\u53EA\u663E\u793A\u9C7C\u5E94\u521B\u5EFA\u7684\u5BF9\u8BDD\uFF1B\u63A5\u7EED\u4E0D\u4F1A\u81EA\u52A8\u6062\u590D\u5DF2\u5F52\u6863\u804A\u5929",loadHistory:"\u8BFB\u53D6\u5BF9\u8BDD",newChat:"\u65B0\u4F1A\u8BDD",resume:"\u63A5\u7EED",active:"\u5F53\u524D",archived:"\u5DF2\u5F52\u6863",unavailable:"\u4E0D\u53EF\u7528",empty:"\u6682\u65E0\u53EF\u63A5\u7EED\u7684\u5BF9\u8BDD",noTitle:"\u5BF9\u8BDD",noResume:"\u5F53\u524D\u4E0D\u80FD\u63A5\u7EED",newHint:"\u65B0\u5EFA\u6216\u63A5\u7EED\u4F1A\u5207\u6362\u5F53\u524D\u8BED\u97F3\uFF0C\u64A4\u56DE\u65E7\u6388\u6743\uFF0C\u53EF\u80FD\u7ED3\u675F\u65E7\u540E\u53F0\u4EFB\u52A1\uFF1B\u4E0D\u5408\u5E76\u5386\u53F2\uFF0C\u4E5F\u4E0D\u91CD\u8DD1\u65E7\u4EFB\u52A1",historyStale:"\u70B9\u51FB\u8BFB\u53D6\u5BF9\u8BDD\u67E5\u770B\u6700\u65B0\u8BB0\u5F55"},Fu={startConversation:"Start conversation",endConversation:"End conversation",voiceTarget:"Send to",dedicatedVoiceTarget:"Fish Voice conversation",checkingVoiceTarget:"Checking target\u2026",voiceTargetChanged:"The delivery target changed. Check the chat shown here before starting.",chooseCurrentDshTarget:"Use current chat",backToFishVoice:"Back to Fish Voice",currentDshTargetError:"Could not confirm this DSH chat. Check the chat and try again.",chooseVoiceTarget:"Choose a delivery chat",searchVoiceTargets:"Search by chat title or ID",searchVoiceTargetsAction:"Search",existingVoiceTargetList:"Existing DSH chats",boundVoiceTarget:"Current target",voiceTargetAvailability_ready:"Available",voiceTargetAvailability_busy:"Chat is processing a message",voiceTargetAvailability_archived:"Chat is archived",voiceTargetAvailability_unavailable:"Chat is unavailable",voiceTargetAvailability_managed:"Managed by Fish Voice. Direct delivery unavailable.",voiceTargetAvailability_subagent:"Subagent chat. Direct delivery unavailable.",voiceTargetNoMatch:"No matching chats.",voiceTargetEmptyList:"No available chats.",voiceTargetSynthesisNotice:"With an online voice, replies are sent to the speech provider you approved. Select a local voice under Models \u2192 Read aloud to keep speech offline.",bindVoiceTarget:"Use selected chat",savingVoiceTarget:"Saving\u2026",moreVoiceTargets:"Load more",loadingVoiceTargets:"Loading DSH chats\u2026",voiceTargetListError:"Could not load DSH chats.",retryVoiceTargets:"Retry",retryTranscripts:"Voice messages to resend",retryTranscript:"Resend",retryTranscriptBusy:"Waiting until sending is available",retryTranscriptSending:"Resending\u2026",retryTranscriptUncertain:"Delivery is unconfirmed. Check the original chat.",endDiscardsRetries:"Ending the conversation clears these transcripts",modeSwitching:"Switching listening mode\u2026",modeSaving:"Saving listening mode\u2026",modeSwitchUnconfirmed:"Checking which listening mode took effect\u2026",modeSwitchFailed:"The change could not be confirmed. Check the current mode and try again.",updateTitle:"Fish Voice updates",updateOfferTitle:"Fish Voice update available",updateCurrentVersion:"Installed",updateNewVersion:"New",updateChannel_stable:"Stable",updateChannel_preview:"Preview",updateCheck:"Check for updates",updateDetails:"View update",updateLater:"Later",updateInstall:"Update now",updateRelease:"Release notes",updateFeedback:"Send feedback",update_idle:"Reading update status\u2026",update_checking:"Checking for updates\u2026",update_current:"Fish Voice is up to date.",update_available:"An update is ready.",update_incompatible:"This update is incompatible with the current DSH environment.",update_installing:"Updating. DSH may reload Fish Voice\u2026","update_restart-required":"Update installed. Restart DSH to apply it.","update_enable-required":"Update installed. Enable Fish Voice in DSH plugin settings.",update_installed:"Update complete.",update_error:"The update encountered an error. Check for updates to retry.",update_unsupported:"Automatic updates are unavailable. See the official release notes.",updateConnection:"Update status could not be confirmed. Check again when DSH is ready.",audioDevices:"Audio devices",audioSystemDefault:"System default",audioInput:"Audio input",audioOutput:"Audio output",inputDeviceMissing:"Microphone disconnected; selection retained",outputDeviceMissing:"Output disconnected; no automatic fallback",deviceDisconnected:"Disconnected",inputDeviceStopFirst:"Turn off the microphone to switch input. Output changes at the next playback.",outputDeviceUnsupported:"Selecting speech output is not supported on this platform.",deviceListRetry:"Device list unavailable. Open a selector to retry.",voiceHelperCleanupHint:"Confirming microphone release. New recording stays off until this completes.",voiceHelperRestartHint:"Microphone helper exit is unconfirmed. Fully restart DSH before enabling voice.",inputError_device:"Microphone unavailable",inputError_recognition:"Recognition failed","inputError_no-speech":"No clear speech; try again",inputHelp_device:"Check mic access. Turn the mic off to select a device. Error details: Settings \u2192 Advanced \u2192 Diagnostics.",inputDiagnosticTitle:"Last reported audio error",inputDiagnosticHistory:"This is the last recorded error and may be from an earlier attempt. It does not confirm the current device state.",inputHelp_recognition:"Try again. If it fails, turn the mic off and check the model in Settings.","inputHelp_no-speech":"Move closer, check that your mic is unmuted, and try again.",speechFailed:"Speech failed",speechInterrupted:"Speech interrupted",wakeFallbackHint:"Say a configured name. Matching uses the transcript for now. Reselect Wake word after switching modes to retry sound matching.",wakeMode:"Wake word",switchToWake:"Switch to wake-word listening",wakeDisabled:"Wake listening is off",wakeStarting:"Starting wake listening\u2026",wakeWaiting:"Waiting for wake word",wakeListening:"Listening for the next instruction",wakePaused:"Wake listening paused",wakeError:"Wake listening unavailable; check settings",wakeHint:"Say a configured name, then your instruction. End the conversation to stop listening.",wakeMethod:"Matches the sound and transcript locally after the phrase ends.",wakeAliases:"Wake names",wakeAliasesHint:"Up to 8 comma-separated names. Mandarin near-sounds match only at the start; prefer a distinctive name of 3+ characters.",wakeTimeout:"Wait after wake (seconds)",wakeSettings:"Wake-word settings",wakeStopToEdit:"Turn off the microphone before editing wake names or timeout.",wakeInvalid:"Enter 1\u20138 valid names and a 3\u201330 second timeout.",switchToPtt:"Click to use push to talk",switchToAlways:"Click to leave the microphone listening",quickSpeedStop:"Turn the mic off to change speed",performanceReadFirst:"Check which speeds the current model supports first.",performanceUnavailable:"The provider explicitly rejected the reasoning parameter for unavailable modes; other modes remain selectable.",performanceProbeCost:"At load, up to 3 fixed short requests check the modes. Model charges apply.",performanceProbeScope:"Only routes with a testing interface send short requests. Native support can be read directly.",performanceProbeUnknown:"Some modes could not be confirmed. Check network access or sign-in, then retry.",performanceProbeAccepted:"The effort request check passed.",performanceProbePending:"Checking effort modes for the current model\u2026",holdToSpeak:"Hold to speak:",alwaysWarning:"The microphone keeps listening. Turn it off when finished.",bindingMissing:"Bind a push-to-talk shortcut in settings, or switch to continuous listening.",noSession:"No conversation is open",otherWindow:"Microphone: another window",readingStatus:"Reading status without starting the microphone or models.",statusRetry:"Status is unavailable. It will be checked automatically when you return to this window.",retryStatus:"Refresh voice status",collapseHint:"Collapsing keeps the microphone enabled",stopConsequence:"Ending the conversation releases the microphone and stops its background tasks.",transferTitle:"Take over the other window\u2019s microphone?",transferWarning:"This interrupts voice in the other window and may end its background tasks.",cancel:"Cancel",confirmTransfer:"Confirm takeover",bindingStopRequired:"Turn off the microphone before changing mouse or keyboard shortcuts.",bindingFinishing:"Voice is still stopping. Wait before changing shortcuts.",headphonesRequired:"Confirm that you are wearing headphones to enable automatic interruption.",deviceManualIndex:"Advanced: enter device index",deviceManualName:"Advanced: enter device name",deviceIndexInvalid:"Enter a nonnegative whole-number device index.",deviceDefault:"Use the system default microphone",deviceManual:"Advanced: enter name or index",deviceSaved:"Saved device",deviceEmpty:"No microphone was found. Connect a device and check system sound settings.",deviceUnknown:"Detected devices appear after enabling voice. Use the system default or enter a device manually.",ttsBackend:"Speech backend",ttsBackendHint:"Speech uses your installed TTS backend and its settings. Independent output volume appears only when verified.",ttsBackendPending:"Additional backend selection is being adapted. No cloud service is connected automatically.",voiceClone:"Voice cloning",voiceCloneAvailable:"Qwen supports a local reference voice. Choose a WAV in voice settings.",voiceClonePrivacy:"Reads only your selected, authorized sample locally. No audio upload.",inputActive:"Receiving voice input",modeUnknown:"Listening mode unknown",voiceInputUnavailable:"Voice input unavailable",voiceInputRecoveryHint:"The audio service stopped. Turn the microphone off, then on again. Your authorization is unchanged.",searchHistory:"Search chats",searchScope:"Search loaded chats",noMatches:"No matching chats",differentOwner:"Voice belongs to another session. Check the source first.",details:"Diagnostics",noReply:"No conversation yet",recentConversation:"Conversation",recentTenTurns:"Recent 10 turns",allRecords:"All records",showAllRecords:"Show all",collapseToTen:"Last 10 turns",collapseConversation:"Collapse conversation",currentVoiceRecords:"Current voice chat",historyTruncated:"Showing a limited range; original records retained",viewConversation:"View voice records",loadEarlier:"Load earlier",readingHistory:"Reading records\u2026",retryHistory:"Could not read records. Retry",noConversation:"No conversation yet",newMessages:"new messages",conversationMessages:"Voice conversation",assistantName:"Assistant name",renameAssistant:"Rename: Enter to save, Esc to cancel",newChatCreated:"New chat created",newChatActive:"Start a voice chat. Background work in the current chat will stop and its history will be kept.",newChatOtherOwner:"Open the current voice chat or the window that enabled the microphone to start a new chat.",compact_off:"Off",compact_standby:"Standby",compact_listening:"Listening",compact_pending:"Working",compact_unknown:"Check status",you:"You",assistant:"Assistant",close:"Close panel",keyboardBinding:"Push-to-talk binding",bindingOff:"Not bound",saveBindings:"Save shortcuts",discardBindings:"Discard changes",bindingCapture:"Press a key combination (Esc cancels)",clearBinding:"Clear binding",bindingUnsupported:"This key or system shortcut is not supported.",bindingGlobalHint:"Windows global shortcut. Disable voice before recording a binding; changes apply on the next voice enable. Keys are not swallowed and may also trigger another application.",bindingUnavailable:"Global key binding is unavailable on this platform.",bindingPrintableWarning:"A plain letter, digit or Space also triggers push-to-talk while typing in other applications.",performanceTitle:"Voice performance",performanceHint:"Applies to the next dedicated voice chat. For a linked conversation, use the model menu in that DSH chat to change its reasoning effort.",inspectPerformance:"Check available modes",performance_fast:"Fast",performanceNoThinking:"No thinking",performanceRecommended:"[Recommended]",performanceFastHint:"Fast explicitly requests thinking to be turned off.",performanceFastUnavailable:"The current route cannot confirm that thinking can be turned off. Choose Follow model or select a model route that supports turning it off.",performanceHostUnavailable:"The current model route does not offer some reasoning levels.",performance_balanced:"Standard",performance_high:"High",performance_compatibility:"Compatible default",performanceStopRequired:"Mode changes require fully stopped voice. Disabling voice can end background work belonging to its voice root.",savePerformance:"Save for next enable",outputVolume:"Assistant voice volume",outputVolumeHint:"Adjusts the installed Windows dsh-speak backend only. It does not verify the active voice route or change DSTuber, system or cue volume. Applies to the next output.",readOutputVolume:"Read voice volume",saveOutputVolume:"Save voice volume",outputVolumeUnavailable:"This speech backend does not support independent volume control.",outputVolumeUnknown:"The volume save is unconfirmed. It will be checked automatically without resubmitting.",settingsTitle:"\u9C7C\u5E94 settings",settingsSections:"Settings sections",tab_audio:"Audio",tab_interaction:"Interaction",tab_prompt:"Prompt",voicePromptLabel:"Custom prompt",voicePromptOptional:"(optional)",voicePromptAgents:"Follow AGENTS",voicePromptCustom:"Custom prompt added",voicePromptPlaceholder:`For example: Give the conclusion first and use a natural tone.

Added after AGENTS. Leave empty to use the default settings.`,voicePromptStopToEdit:"Stop voice to edit",voicePromptUnsupported:"This DSH version does not support custom prompts yet.",voicePromptTooLong:"The prompt must not exceed 32,768 characters.",voicePromptSaving:"Saving\u2026",voicePromptCancel:"Cancel changes",voicePromptSave:"Save",voicePromptSaved:"Saved. Applies when voice is next started.",voicePromptSaveFailed:"Could not save. Your draft has been kept.",voicePromptUnsaved:"Not saved",tab_models:"Models",tab_advanced:"Advanced",projectInfoTitle:"About \u9C7C\u5E94",projectAuthor:"Author",projectRepository:"Official repository",projectNpm:"npm package",tab_sessions:"Sessions",settingsContent:"Settings content",voiceCleanupPending:"Closing previous audio service",voiceCleanupHint:"Waiting for the previous session and recording to exit. Status will refresh without retrying microphone activation.",voiceRestartPending:"Restart DSH required",voiceRestartHint:"The previous audio service has not confirmed exit. Fully quit and reopen DSH before enabling voice. Your saved authorization is unchanged.",voiceRecoveryPending:"Previous voice session is still active",voiceRecoveryCheck:"Check and stop",voiceRecoveryHint:"The previous instance is still closing. Check and stop first. If it remains active, fully restart DSH before enabling voice. Your authorization is retained.",operationUnavailable:"The outcome is unconfirmed. Automatic readback will check the actual state without resubmitting. Details are in Advanced settings.",enableFailed:"Could not open the mic. Check Advanced settings for details before retrying.",tab_pets:"Desktop pet",planned:"Planned development",configurationUnknown:"The configuration write is unconfirmed. Automatic readback is in progress; changes stay locked until verified.",motionTitle:"Interface motion",motion_spring:"Spring",motion_firm:"Firm",motion_off:"Off",motionHint:"Preview and save immediately. Actions never wait for animation. System reduced-motion preference takes priority.",motionNotSaved:"Preview applied, but this browser could not save the preference.",modeControlPending:"Voice control is pending or unconfirmed. Refresh status when it finishes.",capabilityTitle:"Host capabilities and voice visibility",supported:"Available",unsupported:"Unavailable or unconfirmed",hiddenMode:"Hidden voice chat",workspaceMode:"Workspace-visible compatibility mode",taskCapability:"Persistent handoff",configuredMode:"Saved mode",currentVoiceMode:"Actual mode of the current voice chat",noActiveVoice:"No running voice chat",chooseVisibility:"Choose visibility",workspaceWarning:"Workspace-visible compatibility mode shows voice chats in the regular workspace. Unavailable hidden mode still refuses to start; it never falls back to visible mode.",visibilityNoMigration:"This preference applies to later chats. Existing chats keep their current visibility.",modeReadFirst:"Checking settings and status for this conversation before visibility can be changed.",closeBeforeMode:"Turn voice off and wait for confirmed shutdown before changing visibility.",saveWorkspace:"Save workspace-visible mode",saveHidden:"Save hidden mode",visibilityUnknownWrite:"The visibility write is unconfirmed. Automatic readback is in progress; changes stay locked. The original write will not be repeated.",outputObservationUnavailable:"Actual playback-start events are unavailable; playback has not been confirmed.",title:"\u9C7C\u5E94",description:"Voice controls, audio preferences, and separate voice chats.",drag:"Move Fish Voice panel",dragHint:"Drag background space with the mouse; controls remain interactive",collapse:"Collapse",reopen:"Open Fish Voice",refresh:"Refresh status",settings:"Settings",unknown:"Reading status\u2026",enabled:"Microphone enabled",disabled:"Microphone off",identity:"Full session identities",source:"Authorization source",actor:"Action session",none:"None",openSession:"Open a DSH conversation first",enable:"Enable for this session",transfer:"Authorize this session",disable:"Disable voice",stale:"Refresh to confirm status",snapshot:"Last read status",consequence:"Disabling or switching voice may end its background work. Collapsing this panel leaves voice enabled.",savedHint:"Device and speaker settings take effect on the next audio operation or helper reload.",more:"More voice chats",historyOther:"This list belongs to another action session; read it again",helperOnline:"Audio helper online",helperOffline:"Audio helper offline",pending:"Working\u2026",refreshHint:"Read status without starting the microphone or a model",modelGuide:"Follow docs/model-setup.md in the plugin directory. Pin a revision, download manually, and verify files. Publisher identity, licensing, and regional availability are not verified here.",sensevoiceSource:"SenseVoice source",whisperSource:"Whisper source",ttsSource:"External TTS reference",licenseNote:"SenseVoice licensing discussion",modelTitle:"Local models",modelHint:"Save paths only, without downloading, executing, or loading models. Files are not verified. Whisper uses local files only; optional CAM++ does not enable speaker filtering. Configure TTS in its external backend.",asr:"ASR engine",sensevoicePath:"Local SenseVoice directory",whisperPath:"Local Whisper directory",campplusPath:"CAM++ file (optional)",saveModels:"Save model paths",audioTitle:"Audio settings",soundTitle:"Turn sounds",headphones:"I am using headphones",headphonesHint:"Cues stay off until headphones are confirmed, to avoid speaker echo. This is not echo cancellation and does not trim your speech.",automaticBargeIn:"Enable experimental automatic interruption",stopRequested:"Stop requested; playback has not confirmed stopping",stopConfirmed:"Playback confirmed stopped",soundEnabled:"Enable turn sounds",soundVolume:"Sound volume (0\u20131)",soundUnavailable:"Sound playback is not connected; these controls cannot play cues yet.",soundAvailable:"Sound playback connected",mode:"Listening mode",alwaysOn:"Enable always listening (mic stays on)",alwaysOff:"Use push to talk",modeUnavailable:"Listening mode control is not connected",modeNeedsGrant:"Read the current voice status first",pttMode:"Push to talk",alwaysMode:"Open mic",modeHint:"The audio helper controls the active mode. Saving preferences never grants or starts microphone access.",readSettings:"Read settings",device:"Input device",deviceHint:"Blank uses the system default; enter a device name or index",sideButton:"Mouse push-to-talk",sideOff:"Off",sideOne:"Side button 1",sideTwo:"Side button 2",speaker:"Experimental speaker filtering",speakerHint:"Enable matching only; this page does not record or enroll a voiceprint",save:"Save settings",saved:"Settings saved",historyTitle:"Voice chats",historyHint:"Only Fish Voice voice chats appear here. Resume never unarchives a chat automatically.",loadHistory:"Read voice chats",newChat:"New chat",resume:"Resume",active:"Current",archived:"Archived",unavailable:"Unavailable",empty:"No voice chats available",noTitle:"Voice chat",noResume:"Cannot resume right now",newHint:"New or resumed chats switch current voice, revoke its old grant, and may end its background work. They do not merge history or replay old work.",historyStale:"Read voice chats to see the latest records"};var zn=require("react");var Xh=/^7b94c8e3-d6a1-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,Di=e=>typeof e=="string"&&Xh.test(e);var Uu="sidebar.workspaces",Yh="workspace",Qh="whaleWorkspacePresentation",eg=["sidebar.workspaces.directoryFlow","sidebar.workspaces.session.row.action","sidebar.session.row.leading","sidebar.session.row.trailing","sidebar.session.row.hover"],ng=new Set(["one-shot","continuable","unknown"]);function tg(e,n){return e&&typeof e=="object"&&Object.keys(e).length===n.length&&n.every(t=>Object.hasOwn(e,t))}function rg(e){if(!Array.isArray(e)||e.length>512)return null;let n=[],t=new Set;for(let r of e){if(!tg(r,["id","parentId","mode"])||typeof r.id!="string"||!r.id||r.id.length>256||t.has(r.id))return null;if(r.parentId===null){if(r.mode!==null||!Di(r.id))return null;n.push({id:r.id,parentId:null,mode:null})}else{if(typeof r.parentId!="string"||!r.parentId||r.parentId===r.id||!ng.has(r.mode))return null;n.push({id:r.id,parentId:r.parentId,mode:r.mode})}t.add(r.id)}return n}function og(e,n){if(!e||typeof e!="object"||!e.byId||!Array.isArray(e.ids))return e;let t=new Map(n.map(l=>[l.id,l])),r=Object.create(null),o=new Set,i=!1;for(let[l,d]of Object.entries(e.byId)){let u=t.get(l);if(Di(l)&&u===void 0){o.add(l),i=!0;continue}if(u?.parentId===null){if(d.parentId===void 0&&d.origin!=="subagent"){r[l]=d;continue}o.add(l),i=!0;continue}if(u&&d.origin==="subagent"&&d.parentId===u.parentId){let p={...d};delete p.origin,r[l]=p,i=!0;continue}r[l]=d}for(let l of n){let d=e.byId[l.id];d&&(l.parentId===null&&(d.parentId!==void 0||d.origin==="subagent")||l.parentId!==null&&(d.origin!=="subagent"||d.parentId!==l.parentId)||e.ids.includes(l.id)||(i=!0))}if(!i)return e;let s=e.ids.filter(l=>!o.has(l)&&r[l]!==void 0);for(let l of n)r[l.id]!==void 0&&!s.includes(l.id)&&s.push(l.id);let c=e.projectionsBySession;if(c&&o.size>0){let l={...c};for(let d of o)delete l[d];c=l}return{...e,ids:s,byId:r,projectionsBySession:c}}function ig(e,n){return!e||e.locale!==Yh||e.options?.id!==void 0||e.options?.key!==void 0||(e.options?.priority??0)!==0||typeof n!="function"||n.name!=="WorkspaceBrowser"?!1:eg.every(t=>Object.hasOwn(e.children??{},t))}function sg(e){if(!Object.isExtensible(e))return!1;let n=Object.getOwnPropertyDescriptor(e,"component");return n===void 0||n.writable===!0}function ag(e,n){return e.length===n.length&&e.every((t,r)=>{let o=n[r];return t.id===o.id&&t.parentId===o.parentId&&t.mode===o.mode})}function Lu(e,n){let t=[],r=0,o={revision:r,items:t},i,s=!1,c=!1,l=new Set,d=new Set,u=Z=>{for(let K of[...Z])K()},p={getSnapshot:()=>o,subscribe(Z){return d.add(Z),()=>d.delete(Z)}},f=()=>{r++,o={revision:r,items:t},u(d),u(l)},m=Z=>{s!==Z&&(s=Z,f())},y=()=>{let Z=i;i=void 0,Z&&Z.entry.component===Z.wrapper&&(Z.entry.component=Z.original)},v=()=>{if(c)return;let Z;try{Z=e.entries(Uu)}catch{Z=void 0}let K=Array.isArray(Z)?Z.filter(E=>{let k=i&&i.entry===E&&E.component===i.wrapper?i.original:E?.component;return ig(E,k)}):[];if(K.length!==1||typeof n!="function"||!sg(K[0])){y(),m(!1);return}let O=K[0];if(i?.entry===O&&O.component===i.wrapper)return;y(),m(!1);let N=O.component,T=E=>{let k=E.useSessions(I=>I),S=E.useWhaleWorkspacePresentation(I=>I),C=(0,zn.useMemo)(()=>og(k,S.items),[k,S]),R=(0,zn.useCallback)(I=>I(C),[C]),z=(0,zn.useMemo)(()=>new Map(S.items.map(I=>[I.id,I])),[S]),A=(0,zn.useCallback)(I=>{let V=z.get(I),B=k.byId[I];if(V?.parentId&&B?.origin==="subagent"&&B.parentId===V.parentId){n({childSessionId:I,parentSessionId:V.parentId,mode:V.mode});return}E.open?.(I)},[E.open,z,k]);return(0,zn.createElement)(N,{...E,useSessions:R,open:A})},P=function(k){let S=typeof k?.useSessions=="function"&&typeof k?.useWhaleWorkspacePresentation=="function"&&typeof k?.open=="function";return(0,zn.useEffect)(()=>{i?.entry===O&&i.wrapper===P&&m(S)},[S]),(0,zn.createElement)(S?T:N,k)};P.displayName="WhaleWorkspacePresentation",O.component=P,i={entry:O,original:N,wrapper:P}},b=()=>{},_=()=>{};try{b=e.provideRoot({hooks:{[Qh]:p}}),typeof b!="function"&&(b=()=>{}),_=e.subscribe(Uu,v),typeof _!="function"&&(_=()=>{}),v()}catch{_(),y(),b(),m(!1)}return{supported:()=>s,subscribe(Z){return l.add(Z),()=>l.delete(Z)},setOverrides(Z){if(c)return!1;let K=rg(Z);return K===null?(t.length>0&&(t=[],f()),!1):(ag(t,K)||(t=K,f()),!0)},dispose(){c||(c=!0,_(),y(),s=!1,f(),b(),l.clear(),d.clear())}}}var lg=["slots","locale","remote","uiSession"];function cg(e){let n=au(),t=qd(void 0,{observe:n.internal});t.enableAutomaticReads();let r=Jd();e.inject(["whaleFloatingLayout"],v=>{v.effect(()=>r.useLayoutService(v.whaleFloatingLayout),"whale-voice: optional magnetic layout")});let o=Qd(),i=Xd(window,{onResize:v=>r.fit(v)}),s,c=()=>{};e.effect(()=>{let v=()=>{t.setReadVisibility(document.visibilityState!=="hidden"),document.visibilityState!=="hidden"&&(t.refresh(),s?.refresh(),c())};return window.addEventListener("focus",v),window.addEventListener("online",v),document.addEventListener("visibilitychange",v),v(),()=>{window.removeEventListener("focus",v),window.removeEventListener("online",v),document.removeEventListener("visibilitychange",v)}},"whale-voice: refresh visible state"),e.effect(()=>{let v=Lu(e.slots,P=>e.get?.("uiWorkspace")?.openSession(P)),b,_,Z=()=>{_?.(),_=null};c=()=>{if(!v.supported()){Z();return}if(!b||_)return;let P=b,E=!0;_=b.subscribePresentation(k=>{v.setOverrides(k.shown),E&&(E=!1,t.refresh({force:!0}))},k=>{b===P&&(Z(),console.warn("\u9C7C\u5E94\u4FA7\u680F\u4F1A\u8BDD\u663E\u793A\u8FDE\u63A5\u4E2D\u65AD",k?.message??k))})};let K=v.subscribe(c),O=!1;s=qi(async()=>{let P=O?"ui-reconnect":"ui-connect";n.internal(P,"requested");try{let E=await tu(e,n.internal);return n.internal(P,"finished","ok"),E}catch(E){throw O=!0,n.internal(P,"finished","failed"),E}},{visible:()=>t.getSnapshot().readVisible!==!1,onReady:P=>{Z(),b=P,n.attach(P),t.attachConversationClient(P),c()},onError:P=>t.conversationUnavailable(P)});let N=t.getSnapshot().readVisible,T=t.subscribe(()=>{let P=t.getSnapshot().readVisible;P!==N&&(N=P,s.visibilityChanged())});return s.start(),()=>{c=()=>{},Z(),K(),v.dispose(),T(),n.dispose(),s.dispose(),t.dispose()}},"whale-voice: private conversation stream"),e.effect(()=>()=>{t.dispose(),i.dispose(),r.dispose(),o.dispose()},"whale-ear-ui: state and geometry"),e.effect(()=>e.locale.register("whaleEar",{en:Fu,zh:Bu}),"whale-ear-ui: dictionaries"),e.effect(()=>{let v=document.createElement("style");return v.dataset.plugin="dsh-whale-ear-ui",v.textContent=h.text+Su+Vi,document.head.append(v),()=>v.remove()},"whale-ear-ui: stylesheet");let l=async v=>{let b=e.get?.("sessions");if(!b)throw new Error("DSH \u4F1A\u8BDD\u754C\u9762\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");return b.list.getSnapshot().byId[v]||await b.refresh(),b},d=0,u=async v=>{let b=++d;if(v.kind==="root"&&await l(v.id),b!==d)return;let _=e.get?.("uiWorkspace");if(!_?.openSession)throw new Error("DSH \u4F1A\u8BDD\u754C\u9762\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");return _.openSession(v.kind==="root"?v.id:{childSessionId:v.id,parentSessionId:v.parentId,mode:v.mode??"unknown"})},p=v=>u({kind:"root",id:v}),f={subscribe(v){let b=[e.uiSession.adapter?.current?.subscribe(v),e.get?.("layout")?.panelInfo?.subscribe(v),e.get?.("sessions")?.list?.subscribe?.(v)];return()=>b.forEach(_=>_?.())},selectedSession(){let v=e.uiSession.adapter?.current?.getSnapshot();return v?.hooks?.session?.getSnapshot()?.blank===!0?null:v?.props?.sessionId??null},currentConversation(){return e.get?.("layout")?.panelInfo?.getSnapshot()?.activePanelId===null?f.selectedSession():null},sourceFor(v){if(!v)return null;let b=e.get?.("sessions"),_=b?.list?.getSnapshot()?.byId?.[v];return b?.subagentAddress?.(v)||_?.origin==="subagent"||_?.parentId?null:v}},m=async(v,b)=>{let Z=await(await l(v)).using(v,{source:"workspaceOperation"},K=>K.binding.session.rename(b));if(!Z.ok)throw new Error(Z.error.message);return Z.value.title},y=()=>({captureBindings:t.captureBindings,refreshModelCompute:t.refreshModelCompute,pickPath:t.pickPath,readState:t.getSnapshot,markSettingsEdited:t.markSettingsEdited,discardSettingsDraft:t.discardSettingsDraft,openAuthorization:t.openAuthorization,closeAuthorization:t.closeAuthorization,saveAuthorization:t.saveAuthorization,readOperationLog:t.readOperationLog,manageSessions:t.manageSessions,listExistingVoiceSessions:t.listExistingVoiceSessions,setExistingVoiceSession:t.setExistingVoiceSession,setSettingsTab:t.setSettingsTab,setSettingsModelTab:t.setSettingsModelTab,setSessionManagement:t.setSessionManagement,whisperAsrAction:t.whisperAsrAction,updateAction:t.updateAction,dismissUpdate:t.dismissUpdate,openExistingVoiceSession:p,openManagedSession:u,renameManagedSession:m,hooks:{whaleUi:t,whalePreferences:o},setMotion:v=>o.setMotion(v),setAssistantName:v=>o.setAssistantName(v),run:(...v)=>t.run(...v),setSession:v=>t.setSession(v),cancelPreview:()=>t.cancelPreview(),discardDiagnostics:()=>t.discardDiagnostics(),dismissSetup:()=>t.dismissSetup(),openSetup:()=>t.openSetup(),showHome:()=>t.showHome(),openSettings:t.openSettings,refresh:()=>t.refresh()});e.slots.inject("shell.overlay",()=>e.slots.register({name:"shell.overlay",id:"whale-ear",locale:"whaleEar",inject:()=>({geometry:r,sizing:i,recordUserOperation:n.user,setPanelVisible:t.setPanelVisible,closeAuthorization:t.closeAuthorization,refresh:()=>t.refresh(),showHome:()=>t.showHome(),dismissSetup:()=>t.dismissSetup(),hooks:{whaleUi:t,whalePreferences:o}}),children:{"whale-ear.panel.controls":{kind:"single",scope:"root"}}},$u)),e.slots.inject("whale-ear.panel.controls",()=>e.slots.register({name:"whale-ear.panel.controls",locale:"whaleEar",inject:()=>({...y(),controlContext:f,retryVoiceTranscript:t.retryVoiceTranscript})},Ou))}
return module.exports;}});
