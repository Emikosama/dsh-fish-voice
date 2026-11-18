window.__ModuleLoader__.load({id:"dsh-fish-voice",factory:(require)=>{var module={exports:{}};var exports=module.exports;
var zo=Object.defineProperty;var op=Object.getOwnPropertyDescriptor;var ip=Object.getOwnPropertyNames;var ap=Object.prototype.hasOwnProperty;var Ji=(e,n)=>{for(var t in n)zo(e,t,{get:n[t],enumerable:!0})},sp=(e,n,t,r)=>{if(n&&typeof n=="object"||typeof n=="function")for(let o of ip(n))!ap.call(e,o)&&o!==t&&zo(e,o,{get:()=>n[o],enumerable:!(r=op(n,o))||r.enumerable});return e};var lp=e=>sp(zo({},"__esModule",{value:!0}),e);var fg={};Ji(fg,{apply:()=>mg,inject:()=>pg});module.exports=lp(fg);var qt=require("react");var xn={toggle:"ersUra_toggle",thumb:"ersUra_thumb",input:"ersUra_input",collapse:"ersUra_collapse",fill:"ersUra_fill",range:"ersUra_range",rail:"ersUra_rail",toggleTrack:"ersUra_toggleTrack",collapseInner:"ersUra_collapseInner",text:`.ersUra_range {
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

.ersUra_rail {
  background: var(--dsw-alias-border-l2, #8791a4);
  pointer-events: none;
  border-radius: 999px;
  height: 6px;
  position: absolute;
  inset: 13px 9px;
  min-width: 0 !important;
  margin: 0 !important;
}

.ersUra_fill {
  width: var(--whale-range-position);
  background: var(--dsw-alias-brand-primary, #8ba9e7);
  border-radius: inherit;
  transition: width var(--whale-duration, .2s) var(--whale-ease, ease-out);
  position: absolute;
  inset: 0 auto 0 0;
  min-width: 0 !important;
  margin: 0 !important;
}

.ersUra_thumb {
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

.ersUra_range .ersUra_input {
  opacity: 0;
  cursor: pointer;
  touch-action: pan-y;
  height: 32px;
  margin: 0;
  position: absolute;
  inset: 0;
  width: 100% !important;
}

.ersUra_range:focus-within {
  outline: 2px solid var(--dsw-focus-ring-color, #8ba9e7);
  outline-offset: 2px;
  border-radius: 6px;
}

.ersUra_range:hover .ersUra_thumb {
  box-shadow: 0 0 0 4px color-mix(in srgb,var(--dsw-alias-brand-primary, #8ba9e7) 18%,transparent);
}

.ersUra_range[data-dragging] :is(.ersUra_thumb, .ersUra_fill) {
  transition-duration: 40ms;
  transition-timing-function: linear;
}

.ersUra_range[data-disabled], .ersUra_toggle[data-disabled] {
  opacity: .5;
}

.ersUra_range[data-disabled] .ersUra_input {
  cursor: not-allowed;
}

.ersUra_collapse {
  opacity: 0;
  visibility: hidden;
  grid-template-rows: 0fr;
  transition: grid-template-rows .16s ease-out, opacity .12s ease-out, visibility .16s;
  display: grid;
}

.ersUra_collapse[data-open="true"] {
  opacity: 1;
  visibility: visible;
  grid-template-rows: 1fr;
}

.ersUra_collapseInner {
  min-height: 0;
  overflow: hidden;
}

.ersUra_toggle {
  cursor: pointer;
  align-items: center;
  gap: 8px;
  width: fit-content;
  max-width: 100%;
  font-size: 12px;
  display: flex;
  position: relative;
}

.ersUra_toggle > input {
  opacity: 0;
  width: 38px;
  height: 24px;
  margin: 0;
  position: absolute;
}

.ersUra_toggleTrack {
  pointer-events: none;
  background: var(--dsw-alias-border-l2, #8791a4);
  width: 36px;
  height: 22px;
  transition: background-color var(--whale-duration, .2s);
  border-radius: 999px;
  flex: none;
  position: relative;
}

.ersUra_toggleTrack > span {
  background: var(--dsw-alias-bg-layer-1, #fff);
  width: 16px;
  height: 16px;
  transition: left var(--whale-duration, .2s) var(--whale-ease, ease-out);
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
}

.ersUra_toggle > input:checked + .ersUra_toggleTrack {
  background: var(--dsw-alias-brand-primary, #8ba9e7);
}

.ersUra_toggle > input:checked + .ersUra_toggleTrack > span {
  left: 17px;
}

.ersUra_toggle > input:focus-visible + .ersUra_toggleTrack {
  outline: 2px solid var(--dsw-focus-ring-color, #8ba9e7);
  outline-offset: 2px;
}

[data-motion="firm"] :is(.ersUra_range, .ersUra_toggle, .ersUra_collapse) {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="firm"] .ersUra_collapse {
  transition-duration: .1s;
}

[data-motion="off"] :is(.ersUra_range, .ersUra_toggle, .ersUra_collapse), [data-motion="off"] :is(.ersUra_range, .ersUra_toggle, .ersUra_collapse) * {
  transition: none !important;
  animation: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .ersUra_range, .ersUra_toggle, .ersUra_collapse, .ersUra_range *, .ersUra_toggle *, .ersUra_collapse * {
    transition: none !important;
    animation: none !important;
  }
}

@media (forced-colors: active) {
  .ersUra_range .ersUra_input {
    opacity: 1;
    position: relative;
  }

  .ersUra_rail {
    display: none;
  }

  .ersUra_toggleTrack {
    border: 1px solid buttontext;
  }

  .ersUra_toggleTrack > span {
    background: buttontext;
  }

  .ersUra_toggle > input:checked + .ersUra_toggleTrack {
    background: highlight;
  }
}
`};var tn=require("react/jsx-runtime"),Gi=xn.text;function Lt({value:e,defaultValue:n=0,min:t=0,max:r=100,disabled:o,onChange:i,onPointerDown:a,onPointerUp:l,onPointerCancel:c,onLostPointerCapture:u,className:d="",style:p,...f}){let[m,y]=(0,qt.useState)(n),[v,b]=(0,qt.useState)(!1);(0,qt.useEffect)(()=>{o&&b(!1)},[o]);let x=Number(e??m),z=Number(t),F=Number(r),Z=F>z&&Number.isFinite(x)?Math.max(0,Math.min(1,(x-z)/(F-z))):0,N=$=>S=>{b(!1),$?.(S)};return(0,tn.jsxs)("span",{className:xn.range,"data-whale-motion-range":!0,"data-dragging":v&&!o||void 0,"data-disabled":o||void 0,style:{"--whale-range-position":`${Z*100}%`},children:[(0,tn.jsxs)("span",{className:xn.rail,"aria-hidden":"true",children:[(0,tn.jsx)("span",{className:xn.fill}),(0,tn.jsx)("span",{className:xn.thumb})]}),(0,tn.jsx)("input",{...f,className:`${xn.input} ${d}`,style:p,type:"range",min:t,max:r,value:e??m,disabled:o,onChange:$=>{o||(e===void 0&&y($.target.value),i?.($))},onPointerDown:$=>{o||b(!0),a?.($)},onPointerUp:N(l),onPointerCancel:N(c),onLostPointerCapture:N(u),onBlur:$=>{b(!1),f.onBlur?.($)}})]})}function Xi({open:e,children:n,className:t="",...r}){return(0,tn.jsx)("div",{...r,className:`${xn.collapse} ${t}`,"data-open":!!e,"aria-hidden":!e,inert:e?void 0:"",children:(0,tn.jsx)("div",{className:xn.collapseInner,children:n})})}function Vt({label:e,checked:n,disabled:t,onChange:r,...o}){return(0,tn.jsxs)("label",{className:xn.toggle,"data-disabled":t||void 0,children:[(0,tn.jsx)("input",{...o,type:"checkbox",role:"switch",checked:n,disabled:t,onChange:i=>r?.(i.target.checked)}),(0,tn.jsx)("span",{className:xn.toggleTrack,"aria-hidden":"true",children:(0,tn.jsx)("span",{})}),(0,tn.jsx)("span",{children:e})]})}function Yi(e,{onReady:n,onError:t,visible:r=()=>!0,schedule:o=setTimeout,unschedule:i=clearTimeout}={}){let a=!1,l=!1,c=!1,u=null,d=0,p=null,f=()=>{u!==null&&i(u),u=null},m=async()=>{if(!(a||l||c||!r())){f(),l=!0;try{let y=await e();if(a){await y.dispose();return}try{n(y)}catch(v){throw await y.dispose(),v}p=y,c=!0,d=0}catch(y){if(a)return;t(y),d++,r()&&(u=o(()=>{u=null,m()},Math.min(3e4,750*2**Math.min(d-1,6))),u?.unref?.())}finally{l=!1}}};return{start:m,visibilityChanged(){r()?m():f()},refresh(){m()},dispose(){a=!0,f(),p?.dispose()}}}function Ht(e){return e===null||e&&typeof e=="object"&&!Array.isArray(e)&&Object.keys(e).sort().join(",")==="backend,id,name"&&["winmm","portaudio"].includes(e.backend)&&typeof e.id=="string"&&e.id.length>0&&e.id.length<=1024&&typeof e.name=="string"&&e.name.trim().length>0&&e.name.length<=256&&!/[\u0000-\u001f\u007f]/.test(e.id+e.name)}function Qi(e){return e&&e.schema===1&&["input","output"].every(n=>{let t=e[n];return!t||!["available","empty","unavailable"].includes(t.status)||!Array.isArray(t.items)||t.items.length>128||!(t.reason===null||typeof t.reason=="string"&&t.reason.length<=128)?!1:t.items.every(r=>r!==null&&Ht(r))&&new Set(t.items.map(r=>r.backend+":"+r.id)).size===t.items.length&&(t.status==="available"?t.items.length>0:t.items.length===0)})}var yt=Object.freeze(["ptt","always","wake"]),Ar=e=>({ptt:"pttMode",always:"alwaysMode",wake:"wakeMode"})[e]??"modeUnknown",ea=e=>["waiting","listening"].includes(e?.state)&&e?.streamOpen!==!0?"unknown":{disabled:"wakeDisabled",starting:"wakeStarting",waiting:"wakeWaiting",listening:"wakeListening",paused:"wakePaused",error:"wakeError"}[e?.state]??"unknown",na=e=>e!==null&&typeof e=="object"&&!Array.isArray(e)&&["disabled","starting","waiting","listening","paused","error"].includes(e.state)&&(e.deadlineAt===null||Number.isFinite(e.deadlineAt)&&e.deadlineAt>=0)&&typeof e.streamOpen=="boolean"&&["asr-after-utterance","acoustic-after-utterance"].includes(e.detection),ta=e=>[...new Set(String(e).split(/[,，\n]/).map(n=>n.trim()).filter(Boolean))],Sr=e=>Array.isArray(e)&&e.length>=1&&e.length<=8&&new Set(e.map(n=>typeof n=="string"?n.toLowerCase():n)).size===e.length&&e.every(n=>typeof n=="string"&&n.trim()===n&&n.length>=2&&n.length<=24&&!/[\p{C}]/u.test(n)&&/[\p{L}\p{N}]/u.test(n));function ra(e){if(!e||typeof e!="object"||Array.isArray(e)||!["unknown","available","empty","unavailable"].includes(e.status)||!Array.isArray(e.items)||e.items.length>128)return!1;if(e.status==="unknown")return e.observedAt===null&&e.items.length===0;if(!Number.isFinite(e.observedAt)||e.observedAt<0)return!1;if(e.status!=="available")return e.items.length===0;let n=new Set;return e.items.length>0&&e.items.every(t=>!t||typeof t!="object"||Array.isArray(t)||!Number.isSafeInteger(t.index)||t.index<0||n.has(t.index)||typeof t.name!="string"||!t.name.trim()||t.name.length>256||/[\u0000-\u001f\u007f]/.test(t.name)?!1:(n.add(t.index),!0))}var ae={};Ji(ae,{BIGINT_FORMAT_RANGES:()=>Nr,CONSTANT_CATCH:()=>ma,Class:()=>No,NUMBER_FORMAT_RANGES:()=>jt,aborted:()=>_n,allowsEval:()=>Uo,assert:()=>fp,assertEqual:()=>cp,assertIs:()=>pp,assertNever:()=>mp,assertNotEqual:()=>up,assignProp:()=>cn,attachSchema:()=>Wt,base64ToUint8Array:()=>da,base64urlToUint8Array:()=>$p,cached:()=>_t,captureStackTrace:()=>Cr,cleanEnum:()=>Tp,cleanRegex:()=>Kt,clone:()=>kn,cloneDef:()=>bp,codePointLength:()=>Jt,constantCatch:()=>fa,createTransparentProxy:()=>_p,defineLazy:()=>To,defineLazyInternal:()=>fe,derived:()=>Dp,esc:()=>$o,escapeRegex:()=>Dn,explicitlyAborted:()=>Mo,extend:()=>zp,finalizeIssue:()=>An,floatSafeRemainder:()=>Io,getElementAtPath:()=>vp,getEnumValues:()=>xt,getLengthableOrigin:()=>Gt,getParsedType:()=>kp,getSizableOrigin:()=>ua,hexToUint8Array:()=>Up,hide:()=>Tr,installLazyProp:()=>Fp,isObject:()=>ut,isPlainObject:()=>Gn,issue:()=>St,joinValues:()=>zr,jsonStringifyReplacer:()=>kt,members:()=>Bo,merge:()=>Pp,mergeDefs:()=>Rn,normalizeParams:()=>oe,nullish:()=>Eo,numKeys:()=>xp,objectClone:()=>hp,omit:()=>Sp,optionalKeys:()=>Do,own:()=>Jn,parsedType:()=>Zo,partial:()=>Np,pick:()=>Ap,prefixIssues:()=>Mn,primitiveTypes:()=>la,promiseAllObject:()=>yp,propertyKeyTypes:()=>Ro,randomString:()=>wp,rawShape:()=>At,required:()=>Ep,safeExtend:()=>Cp,shallowClone:()=>sa,sizeCaps:()=>Ir,slugify:()=>Oo,stringifyPrimitive:()=>Pr,toZod:()=>dp,uint8ArrayToBase64:()=>pa,uint8ArrayToBase64url:()=>Op,uint8ArrayToHex:()=>Rp,unwrapMessage:()=>wt});function cp(e){return e}function up(e){return e}function dp(){return e=>e}function pp(e){}function mp(e){throw new Error("Unexpected value in exhaustive check")}function fp(e){}function xt(e){let n=Object.values(e).filter(r=>typeof r=="number");return Object.entries(e).filter(([r,o])=>n.indexOf(+r)===-1).map(([r,o])=>o)}function zr(e,n="|"){return e.map(t=>Pr(t)).join(n)}function kt(e,n){return typeof n=="bigint"?n.toString():n}var Po=class{constructor(n){this._getter=n,this._value=void 0}get value(){let n=this._getter;return n!==void 0&&(this._value=n(),this._getter=void 0),this._value}};function _t(e){return new Po(e)}function Eo(e){return e==null}function Kt(e){let n=e.startsWith("^")?1:0,t=e.endsWith("$")?e.length-1:e.length;return e.slice(n,t)}function Io(e,n){let t=e/n,r=Math.round(t),o=4*Number.EPSILON*Math.max(Math.abs(t),1);return Math.abs(t-r)<o?0:t-r}var oa=Symbol("evaluating");function To(e,n,t){let r;Object.defineProperty(e,n,{get(){if(r!==oa)return r===void 0&&(r=oa,r=t()),r},set(o){Object.defineProperty(e,n,{value:o})},configurable:!0})}function hp(e){return Object.create(Object.getPrototypeOf(e),Object.getOwnPropertyDescriptors(e))}function cn(e,n,t){Object.defineProperty(e,n,{value:t,writable:!0,enumerable:!0,configurable:!0})}function At(e){let n=Object.getOwnPropertyDescriptor(e,"shape");return n?.get?n.get.raw:n?.value}function Un(e){return At(e._zod.def)??e._zod.def.shape}function ia(e,n,t){Object.defineProperty(e,n,{get(){let r=t();return cn(this,n,r),r},enumerable:!0,configurable:!0})}function aa(e,n,t){n in e?cn(e,n,t):e[n]=t}function ct(e,n,t,r){let o=Un(n);for(let i of t){let a=Object.getOwnPropertyDescriptor(o,i);a.enumerable&&(a.get?ia(e,i,()=>{let l=n._zod.def.shape[i];return r?r(l,i):l}):aa(e,i,r?r(a.value,i):a.value))}}function gp(e,n){for(let t of Reflect.ownKeys(n)){let r=Object.getOwnPropertyDescriptor(n,t);r.enumerable&&(r.get?ia(e,t,()=>n[t]):aa(e,t,r.value))}}function Rn(...e){let n={};for(let t of e){let r=Object.getOwnPropertyDescriptors(t);Object.assign(n,r)}return Object.defineProperties({},n)}function bp(e){return Rn(e._zod.def)}function vp(e,n){return n?n.reduce((t,r)=>t?.[r],e):e}function yp(e){let n=Object.keys(e),t=n.map(r=>e[r]);return Promise.all(t).then(r=>{let o={};for(let i=0;i<n.length;i++)o[n[i]]=r[i];return o})}function wp(e=10){let n="abcdefghijklmnopqrstuvwxyz",t="";for(let r=0;r<e;r++)t+=n[Math.floor(Math.random()*n.length)];return t}function $o(e){return JSON.stringify(e)}function Oo(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/[\s_-]+/g,"-").replace(/^-+|-+$/g,"")}var Cr="captureStackTrace"in Error?Error.captureStackTrace:(...e)=>{};function ut(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}var Uo=_t(()=>{if(rn.jitless||typeof navigator<"u"&&navigator?.userAgent?.includes("Cloudflare"))return!1;try{let e=Function;return new e(""),!0}catch{return!1}});function Gn(e){if(ut(e)===!1)return!1;let n=e.constructor;if(n===void 0||typeof n!="function")return!0;let t=n.prototype;return!(ut(t)===!1||Object.prototype.hasOwnProperty.call(t,"isPrototypeOf")===!1)}function sa(e){return Gn(e)?{...e}:Array.isArray(e)?[...e]:e instanceof Map?new Map(e):e instanceof Set?new Set(e):e}function xp(e){let n=0;for(let t in e)Object.prototype.hasOwnProperty.call(e,t)&&n++;return n}var kp=e=>{let n=typeof e;switch(n){case"undefined":return"undefined";case"string":return"string";case"number":return Number.isNaN(e)?"nan":"number";case"boolean":return"boolean";case"function":return"function";case"bigint":return"bigint";case"symbol":return"symbol";case"object":return Array.isArray(e)?"array":e===null?"null":e.then&&typeof e.then=="function"&&e.catch&&typeof e.catch=="function"?"promise":typeof Map<"u"&&e instanceof Map?"map":typeof Set<"u"&&e instanceof Set?"set":typeof Date<"u"&&e instanceof Date?"date":typeof File<"u"&&e instanceof File?"file":"object";default:throw new Error(`Unknown data type: ${n}`)}},Ro=new Set(["string","number","symbol"]),la=new Set(["string","number","bigint","boolean","symbol","undefined"]);function Dn(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function kn(e,n,t){let r=new e._zod.constr(n??e._zod.def);return(!n||t?.parent)&&(r._zod.parent=e),r}function oe(e){let n=e;if(!n)return{};if(typeof n=="string")return{error:()=>n};if(n?.message!==void 0){if(n?.error!==void 0)throw new Error("Cannot specify both `message` and `error` params");n.error=n.message}return delete n.message,typeof n.error=="string"?{...n,error:()=>n.error}:n}function _p(e){let n;return new Proxy({},{get(t,r,o){return n??(n=e()),Reflect.get(n,r,o)},set(t,r,o,i){return n??(n=e()),Reflect.set(n,r,o,i)},has(t,r){return n??(n=e()),Reflect.has(n,r)},deleteProperty(t,r){return n??(n=e()),Reflect.deleteProperty(n,r)},ownKeys(t){return n??(n=e()),Reflect.ownKeys(n)},getOwnPropertyDescriptor(t,r){return n??(n=e()),Reflect.getOwnPropertyDescriptor(n,r)},defineProperty(t,r,o){return n??(n=e()),Reflect.defineProperty(n,r,o)}})}function Pr(e){return typeof e=="bigint"?e.toString()+"n":typeof e=="string"?`"${e}"`:`${e}`}function Do(e){return Object.keys(e).filter(n=>e[n]._zod.optin!==void 0&&e[n]._zod.optout==="optional")}var jt={safeint:[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],int32:[-2147483648,2147483647],uint32:[0,4294967295],float32:[-34028234663852886e22,34028234663852886e22],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]},Nr={int64:[BigInt("-9223372036854775808"),BigInt("9223372036854775807")],uint64:[BigInt(0),BigInt("18446744073709551615")]};function Ap(e,n){let t=e._zod.def,r=t.checks;if(r&&r.length>0)throw new Error(".pick() cannot be used on object schemas containing refinements");let i={};return ct(i,e,Er(e,n)),kn(e,Rn(t,{shape:i,checks:[]}))}function Er(e,n){let t=Un(e),r=[];for(let o of Reflect.ownKeys(n)){if(!Object.getOwnPropertyDescriptor(t,o)?.enumerable)throw new Error(`Unrecognized key: "${String(o)}"`);n[o]&&r.push(o)}return r}function Sp(e,n){let t=e._zod.def,r=t.checks;if(r&&r.length>0)throw new Error(".omit() cannot be used on object schemas containing refinements");let i=new Set(Er(e,n)),a={};return ct(a,e,Reflect.ownKeys(Un(e)).filter(l=>!i.has(l))),kn(e,Rn(t,{shape:a,checks:[]}))}function zp(e,n){if(!Gn(n))throw new Error("Invalid input to extend: expected a plain object");let t=e._zod.def.checks;if(t&&t.length>0){let o=Un(e);for(let i of Reflect.ownKeys(n))if(Object.getOwnPropertyDescriptor(o,i)!==void 0)throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.")}return kn(e,Rn(e._zod.def,{shape:ca(e,n)}))}function ca(e,n){let t={};return ct(t,e,Reflect.ownKeys(Un(e))),gp(t,n),t}function Cp(e,n){if(!Gn(n))throw new Error("Invalid input to safeExtend: expected a plain object");return kn(e,Rn(e._zod.def,{shape:ca(e,n)}))}function Pp(e,n){if(!n?._zod?.def)throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");if(e._zod.def.checks?.length)throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");let t={};ct(t,e,Reflect.ownKeys(Un(e))),ct(t,n,Reflect.ownKeys(Un(n)));let r=Rn(e._zod.def,{shape:t,get catchall(){return n._zod.def.catchall},checks:n._zod.def.checks??[]});return kn(e,r)}function Np(e,n,t,r="partial"){let i=n._zod.def.checks;if(i&&i.length>0)throw new Error(`.${r}() cannot be used on object schemas containing refinements`);let l=t?new Set(Er(n,t)):void 0,c={};return ct(c,n,Reflect.ownKeys(Un(n)),e&&((u,d)=>l&&!l.has(d)?u:new e({type:"optional",innerType:u}))),kn(n,Rn(n._zod.def,{shape:c,checks:[]}))}function Ep(e,n,t){let r=t?new Set(Er(n,t)):void 0,o={};return ct(o,n,Reflect.ownKeys(Un(n)),(i,a)=>r&&!r.has(a)?i:new e({type:"nonoptional",innerType:i})),kn(n,Rn(n._zod.def,{shape:o}))}function _n(e,n=0){if(e.aborted===!0)return!0;for(let t=n;t<e.issues.length;t++)if(e.issues[t]?.continue!==!0)return!0;return!1}function Mo(e,n=0){if(e.aborted===!0)return!0;for(let t=n;t<e.issues.length;t++)if(e.issues[t]?.continue===!1)return!0;return!1}function Mn(e,n){return n.map(t=>{var r;return(r=t).path??(r.path=[]),t.path.unshift(e),t})}function wt(e){return typeof e=="string"?e:e?.message}function Ir(e){let n=[];for(let t of e??[]){let r=t._zod.def;if(!/_(length|size)$|_equals$/.test(r.check))break;let o=r.maximum??r.length??r.size;o>=0&&n.push([o,t])}return n}function Wt(e,n,t){var r;for(let o=n;o<e.length;o++)(r=e[o]).schema??(r.schema=t)}function An(e,n,t){var r;let o=e.inst?._zod?.traits;o?.has("$ZodType")&&(o.has("$ZodCheck")?(r=e).schema??(r.schema=e.inst):e.schema=e.inst);let i=e.schema!==e.inst?e.schema?._zod.def?.error:void 0,a=e.message?e.message:wt(e.inst?._zod.def?.error?.(e))??wt(i?.(e))??wt(n?.error?.(e))??wt(t.customError?.(e))??wt(t.localeError?.(e))??"Invalid input",l={};for(let c of Object.keys(e))c==="inst"||c==="schema"||c==="continue"||c==="input"||c==="__proto__"||(l[c]=e[c]);return l.path??(l.path=[]),l.message=a,n?.reportInput&&(l.input=e.input),l}function ua(e){return e instanceof Set?"set":e instanceof Map?"map":e instanceof File?"file":"unknown"}var Ip=/[\uD800-\uDBFF]/;function Jt(e){let n=e.length;if(!Ip.test(e))return n;let t=n;for(let r=0;r<n-1;r++)(e.charCodeAt(r)&64512)===55296&&(e.charCodeAt(r+1)&64512)===56320&&(t--,r++);return t}function Gt(e){return Array.isArray(e)?"array":typeof e=="string"?"string":"unknown"}function Zo(e){let n=typeof e;switch(n){case"number":return Number.isNaN(e)?"nan":"number";case"object":{if(e===null)return"null";if(Array.isArray(e))return"array";let t=e;if(t&&Object.getPrototypeOf(t)!==Object.prototype&&"constructor"in t&&t.constructor)return t.constructor.name}}return n}function St(...e){let[n,t,r]=e;return typeof n=="string"?{message:n,code:"custom",input:t,inst:r}:{...n}}function Tp(e){return Object.entries(e).filter(([n,t])=>Number.isNaN(Number.parseInt(n,10))).map(n=>n[1])}function da(e){let n=atob(e),t=new Uint8Array(n.length);for(let r=0;r<n.length;r++)t[r]=n.charCodeAt(r);return t}function pa(e){let n="";for(let t=0;t<e.length;t++)n+=String.fromCharCode(e[t]);return btoa(n)}function $p(e){let n=e.replace(/-/g,"+").replace(/_/g,"/"),t="=".repeat((4-n.length%4)%4);return da(n+t)}function Op(e){return pa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}function Up(e){let n=e.replace(/^0x/,"");if(n.length%2!==0)throw new Error("Invalid hex string length");let t=new Uint8Array(n.length/2);for(let r=0;r<n.length;r+=2)t[r/2]=Number.parseInt(n.slice(r,r+2),16);return t}function Rp(e){return Array.from(e).map(n=>n.toString(16).padStart(2,"0")).join("")}var No=class{constructor(...n){}};function Bo(e,n){for(let t in n){let r=Object.getOwnPropertyDescriptor(n,t);r.get?Object.defineProperty(e,t,{...r,enumerable:!1}):Mp(e,t,r.value)}}function Jn(e,n,t,r=!0){return Object.defineProperty(e,n,{configurable:!0,writable:!0,enumerable:r,value:t}),t}function Tr(e,n,t){return Jn(e,n,t,!1)}function Dp(e,n){for(let t in e){let r=e[t];Object.defineProperty(n,t,{configurable:!0,enumerable:!0,get(){return Jn(this,t,r(this))},set(o){Jn(this,t,o)}})}return n}function Mp(e,n,t){Object.defineProperty(e,n,{configurable:!0,get(){return this==null?t:Jn(this,n,t.bind(this))},set(r){Jn(this,n,r)}})}function Zp(e,n){let t=Object.getPrototypeOf(e);return n in t?void 0:t}var Co,Wn=!1,Bp={configurable:!0,get(){Wn=!0}};function fe(e,n,t){let r=Object.getPrototypeOf(e._zod);if(n in r&&Co!==e._zod){Co=void 0;return}Co=e._zod,Object.defineProperty(r,n,{configurable:!0,get(){Object.defineProperty(this,n,Bp);let o=Wn;Wn=!1;try{let i=t(this);return Wn?delete this[n]:Object.defineProperty(this,n,{configurable:!0,writable:!0,value:i}),Wn=Wn||o,i}catch(i){throw delete this[n],Wn=Wn||o,i}},set(o){Object.defineProperty(this,n,{configurable:!0,writable:!0,value:o})}})}function Fp(e,n,t,r){let o=Zp(e,n);o&&Object.defineProperty(o,n,{configurable:!0,get(){let i={configurable:!0,writable:!0,enumerable:r,value:void 0};return Object.defineProperty(this,n,i),i.value=t(this),Object.defineProperty(this,n,i),i.value},set(i){Object.defineProperty(this,n,{configurable:!0,writable:!0,enumerable:r,value:i})}})}var ma="~constantCatch";function fa(e){let n=()=>e;return n[ma]=!0,n}var ha;var Fo={value:void 0,enumerable:!1},ga="captureStackTrace"in Error?Error:null;function qp(e){let n=ga;if(n){let t=n.stackTraceLimit;if(typeof t=="number"){try{n.stackTraceLimit=0}catch{return ga=null,new e}try{return new e}finally{n.stackTraceLimit=t}}}return new e}function U(e,n,t,r){let o={};function i(f){this.def=f,this.constr=p,this.traits=new Set}i.prototype=o;let a=t,l=a&&new WeakSet;function c(f,m){if(f._zod){if(f._zod.traits.has(e))return}else{Fo.value=new i(m);try{Object.defineProperty(f,"_zod",Fo)}finally{Fo.value=void 0}}if(f._zod.traits.add(e),n(f,m),l){let v=Object.getPrototypeOf(f),b=f._zod.constr.prototype,x=v;for(;x&&x!==b;)x=Object.getPrototypeOf(x);let z=x??v;l.has(z)||(l.add(z),Bo(z,a))}let y=p.prototype;for(let v in y)Object.prototype.hasOwnProperty.call(y,v)&&(v in f||(f[v]=y[v].bind(f)))}let u=r?.Parent??Object;class d extends u{}Object.defineProperty(d,"name",{value:e});function p(f){let m=r?.Parent?qp(d):this;c(m,f);let y=m._zod.deferred;if(y){for(let b of y)b();m._zod.deferred=void 0}let v=globalThis.__zod_globalConfig?.postProcessor;return v&&v(m),m}return Object.defineProperty(p,"init",{value:c}),Object.defineProperty(p,Symbol.hasInstance,{value:f=>r?.Parent&&f instanceof r.Parent?!0:f?._zod?.traits?.has(e)}),Object.defineProperty(p,"name",{value:e}),p}var Sn=class extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}},zt=class extends Error{constructor(n){super(`Encountered unidirectional transform during encode: ${n}`),this.name="ZodEncodeError"}};(ha=globalThis).__zod_globalConfig??(ha.__zod_globalConfig={});var rn=globalThis.__zod_globalConfig;function un(e){return e&&Object.assign(rn,e),rn}function Lp(){let e=this._zod;return e.message??(e.message=JSON.stringify(e.def,kt,2)),e.message}function Vp(e){this._zod.message=e}var Hp={get:Lp,set:Vp,enumerable:!0,configurable:!0},Lo={value:void 0,enumerable:!1},ba=new WeakSet([Object.prototype,Error.prototype]),va=(e,n)=>{e.name="$ZodError",Lo.value=n,Object.defineProperty(e,"issues",Lo),Lo.value=void 0,Object.defineProperty(e,"message",Hp);let t=Object.getPrototypeOf(e);ba.has(t)||(ba.add(t),Object.defineProperty(t,"toString",{configurable:!0,enumerable:!1,get(){let r=()=>this.message;return Object.defineProperty(this,"toString",{value:r,configurable:!0,writable:!0}),r},set(r){Object.defineProperty(this,"toString",{value:r,configurable:!0,writable:!0})}}))},ya=U("$ZodError",va),zg=U("$ZodError",va,void 0,{Parent:Error});function Kp(e,n,t){return Object.prototype.hasOwnProperty.call(e,n)||(n==="__proto__"?Object.defineProperty(e,n,{value:t(),writable:!0,enumerable:!0,configurable:!0}):e[n]=t()),e[n]}function wa(e,n=t=>t.message){let t={},r=[];for(let o of e.issues)o.path.length>0?Kp(t,o.path[0],()=>[]).push(n(o)):r.push(n(o));return{formErrors:r,fieldErrors:t}}function xa(e,n=t=>t.message){let t={_errors:[]},r=(o,i=[])=>{for(let a of o.issues)if(a.code==="invalid_union"&&a.errors.length)a.errors.map(l=>r({issues:l},[...i,...a.path]));else if(a.code==="invalid_key")r({issues:a.issues},[...i,...a.path]);else if(a.code==="invalid_element")r({issues:a.issues},[...i,...a.path]);else{let l=[...i,...a.path];if(l.length===0)t._errors.push(n(a));else{let c=t,u=0;for(;u<l.length;){let d=l[u],p=u===l.length-1;if(d==="_errors"){p&&c._errors.push(n(a)),u++;continue}Object.prototype.hasOwnProperty.call(c,d)||Object.defineProperty(c,d,{value:{_errors:[]},enumerable:!0,writable:!0,configurable:!0});let f=c[d];p&&f._errors.push(n(a)),c=f,u++}}}};return r(e),t}function $r(e,n){return{callee:n?.callee??e,Err:n?.Err}}var Or=e=>{let n=(t,r,o,i)=>{let a=o?{...o,async:!1}:{async:!1},l=t._zod.run({value:r,issues:[]},a);if(l instanceof Promise)throw new Sn;if(l.issues.length){let c=new(i?.Err??e)(l.issues.map(u=>An(u,a,un())));throw Cr(c,i?.callee??n),c}return l.value};return n};var Ur=e=>{let n=async(t,r,o,i)=>{let a=o?{...o,async:!0}:{async:!0},l=t._zod.run({value:r,issues:[]},a);if(l instanceof Promise&&(l=await l),l.issues.length){let c=new(i?.Err??e)(l.issues.map(u=>An(u,a,un())));throw Cr(c,i?.callee??n),c}return l.value};return n};var Rr=e=>(n,t,r)=>{let o=r?{...r,async:!1}:{async:!1},i=n._zod.run({value:t,issues:[]},o);if(i instanceof Promise)throw new Sn;return i.issues.length?ka(e,i.issues,o):{success:!0,data:i.value}};function ka(e,n,t){let r;return{success:!1,get error(){return r||(r=new e(n.map(o=>An(o,t,un()))),n=void 0,t=void 0),r},set error(o){r=o,n=void 0,t=void 0}}}var Dr=e=>async(n,t,r)=>{let o=r?{...r,async:!0}:{async:!0},i=n._zod.run({value:t,issues:[]},o);return i instanceof Promise&&(i=await i),i.issues.length?ka(e,i.issues,o):{success:!0,data:i.value}};var jp=Symbol.for("zod.compile.invalid"),Wp=Symbol.for("zod.compile.fallback"),Vo=((e,n,t)=>{let r=e._zod.bag.validator;if(r!==void 0){if(r(n)!==jp)return!0;if(r.definite===!0&&t===void 0)return!1}return Jp(e,n,t)});function Jp(e,n,t){let r=t?{...t,async:!1,abortEarly:!0}:{async:!1,abortEarly:!0},o=e._zod.bag.fallbackRun,i;if(o?(r[Wp]=!0,i=o({value:n,issues:[]},r)):i=e._zod.run({value:n,issues:[]},r),i instanceof Promise)throw new Sn;return i.issues.length===0}var Ho=async(e,n,t)=>{let r=t?{...t,async:!0,abortEarly:!0}:{async:!0,abortEarly:!0},o=e._zod.run({value:n,issues:[]},r);return o instanceof Promise&&(o=await o),o.issues.length===0},_a=e=>{let n=Or(e),t=(r,o,i,a)=>{let l=i?{...i,direction:"backward"}:{direction:"backward"};return n(r,o,l,$r(t,a))};return t};var Aa=e=>{let n=Or(e),t=(r,o,i,a)=>n(r,o,i,$r(t,a));return t};var Sa=e=>{let n=Ur(e),t=async(r,o,i,a)=>{let l=i?{...i,direction:"backward"}:{direction:"backward"};return await n(r,o,l,$r(t,a))};return t};var za=e=>{let n=Ur(e),t=async(r,o,i,a)=>await n(r,o,i,$r(t,a));return t};var Ca=e=>(n,t,r)=>{let o=r?{...r,direction:"backward"}:{direction:"backward"};return Rr(e)(n,t,o)};var Pa=e=>(n,t,r)=>Rr(e)(n,t,r);var Na=e=>async(n,t,r)=>{let o=r?{...r,direction:"backward"}:{direction:"backward"};return Dr(e)(n,t,o)};var Ea=e=>async(n,t,r)=>Dr(e)(n,t,r);var Ia=/^[cC][0-9a-z]{6,}$/,Ta=/^[0-9a-z]+$/,$a=/^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/,Oa=/^[0-9a-vA-V]{20}$/,Ua=/^[A-Za-z0-9]{27}$/,Ra=/^[a-zA-Z0-9_-]{21}$/;function Da(e){return new RegExp(`^[a-zA-Z0-9_-]{${e}}$`)}var Ma=/^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;var Za=/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,jo=e=>e?new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`):/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;var Ba=/^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;var Gp="^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";function Fa(){return new RegExp(Gp,"u")}var qa=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,La=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;var Va=/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,Ha=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,Ka=/^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,ja=/^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/;var Wa=/^https?$/,Ja=/^\+[1-9]\d{6,14}$/;var Ga="(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";function Xp(e){return new RegExp(`^${e}$`)}var Xa=Xp(Ga);function Ko(e){let n="(?:[01]\\d|2[0-3]):[0-5]\\d";return typeof e.precision=="number"?e.precision===-1?`${n}`:e.precision===0?`${n}:[0-5]\\d`:`${n}:[0-5]\\d\\.\\d{${e.precision}}`:e.seconds?`${n}:[0-5]\\d(?:\\.\\d+)?`:`${n}(?::[0-5]\\d(?:\\.\\d+)?)?`}function Ya(e){return new RegExp(`^${Ko(e)}$`)}function Qa(e){let n=["Z"];e.offset&&n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");let t=`${Ko({precision:e.precision,seconds:!0})}(?:${n.join("|")})`,r=e.local?`${t}|${Ko({precision:e.precision})}`:t;return new RegExp(`^${Ga}T(?:${r})$`)}var es=/^[\s\S]{0,}$/;var Wo=/^-?\d+$/,Xt=/^-?\d+(?:\.\d+)?$/,ns=/^(?:true|false)$/i,ts=/^null$/i;var rs=/^[^A-Z]*$/,os=/^[^a-z]*$/;var He=U("$ZodCheck",(e,n)=>{var t;e._zod??(e._zod={}),e._zod.def=n,(t=e._zod).onattach??(t.onattach=[])});var Jo=e=>{let n=e.value;return!Eo(n)&&n.length!==void 0},Mr={number:"number",bigint:"bigint",object:"date"},Go=U("$ZodCheckLessThan",(e,n)=>{He.init(e,n);let t=Mr[typeof n.value];e._zod.check=r=>{(n.inclusive?r.value<=n.value:r.value<n.value)||r.issues.push({origin:Mr[typeof r.value]??t,code:"too_big",maximum:typeof n.value=="object"?n.value.getTime():n.value,input:r.value,inclusive:n.inclusive,inst:e,continue:!n.abort})}}),Xo=U("$ZodCheckGreaterThan",(e,n)=>{He.init(e,n);let t=Mr[typeof n.value];e._zod.check=r=>{(n.inclusive?r.value>=n.value:r.value>n.value)||r.issues.push({origin:Mr[typeof r.value]??t,code:"too_small",minimum:typeof n.value=="object"?n.value.getTime():n.value,input:r.value,inclusive:n.inclusive,inst:e,continue:!n.abort})}}),is=U("$ZodCheckMultipleOf",(e,n)=>{He.init(e,n),e._zod.check=t=>{if(typeof t.value!=typeof n.value)throw new Error("Cannot mix number and bigint in multiple_of check.");(typeof t.value=="bigint"?n.value!==BigInt(0)&&t.value%n.value===BigInt(0):Io(t.value,n.value)===0)||t.issues.push({origin:typeof t.value,code:"not_multiple_of",divisor:n.value,input:t.value,inst:e,continue:!n.abort})}}),as=U("$ZodCheckNumberFormat",(e,n)=>{He.init(e,n),n.format=n.format||"float64";let t=n.format?.includes("int"),r=t?"int":"number",[o,i]=jt[n.format];e._zod.check=a=>{let l=a.value;if(t){if(!Number.isInteger(l)){a.issues.push({expected:r,format:n.format,code:"invalid_type",continue:!1,input:l,inst:e});return}if(!Number.isSafeInteger(l)){l>0?a.issues.push({input:l,code:"too_big",maximum:Number.MAX_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:r,inclusive:!0,continue:!n.abort}):a.issues.push({input:l,code:"too_small",minimum:Number.MIN_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:r,inclusive:!0,continue:!n.abort});return}}l<o&&a.issues.push({origin:"number",input:l,code:"too_small",minimum:o,inclusive:!0,inst:e,continue:!n.abort}),l>i&&a.issues.push({origin:"number",input:l,code:"too_big",maximum:i,inclusive:!0,inst:e,continue:!n.abort})}});var ss=U("$ZodCheckMaxLength",(e,n)=>{var t;He.init(e,n),(t=e._zod.def).when??(t.when=Jo),e._zod.check=r=>{let o=r.value,i=o.length;if((typeof o=="string"&&i>n.maximum?Jt(o):i)<=n.maximum)return;let l=Gt(o);r.issues.push({origin:l,code:"too_big",maximum:n.maximum,inclusive:!0,input:o,inst:e,continue:!n.abort})}}),ls=U("$ZodCheckMinLength",(e,n)=>{var t;He.init(e,n),(t=e._zod.def).when??(t.when=Jo),e._zod.check=r=>{let o=r.value,i=o.length;if((typeof o=="string"&&i>=n.minimum&&i<n.minimum*2?Jt(o):i)>=n.minimum)return;let l=Gt(o);r.issues.push({origin:l,code:"too_small",minimum:n.minimum,inclusive:!0,input:o,inst:e,continue:!n.abort})}}),cs=U("$ZodCheckLengthEquals",(e,n)=>{var t;He.init(e,n),(t=e._zod.def).when??(t.when=Jo),e._zod.check=r=>{let o=r.value,i=o.length,a=typeof o=="string"&&i>=n.length&&i<=n.length*2?Jt(o):i;if(a===n.length)return;let l=Gt(o),c=a>n.length;r.issues.push({origin:l,...c?{code:"too_big",maximum:n.length}:{code:"too_small",minimum:n.length},inclusive:!0,exact:!0,input:r.value,inst:e,continue:!n.abort})}}),Qt=U("$ZodCheckStringFormat",(e,n)=>{var t,r;He.init(e,n),n.pattern?(t=e._zod).check??(t.check=o=>{n.pattern.lastIndex=0,!n.pattern.test(o.value)&&o.issues.push({origin:"string",code:"invalid_format",format:n.format,input:o.value,...n.pattern?{pattern:n.pattern.toString()}:{},inst:e,continue:!n.abort})}):(r=e._zod).check??(r.check=()=>{})}),us=U("$ZodCheckRegex",(e,n)=>{Qt.init(e,n),e._zod.check=t=>{n.pattern.lastIndex=0,!n.pattern.test(t.value)&&t.issues.push({origin:"string",code:"invalid_format",format:"regex",input:t.value,pattern:n.pattern.toString(),inst:e,continue:!n.abort})}}),ds=U("$ZodCheckLowerCase",(e,n)=>{n.pattern??(n.pattern=rs),Qt.init(e,n)}),ps=U("$ZodCheckUpperCase",(e,n)=>{n.pattern??(n.pattern=os),Qt.init(e,n)}),ms=U("$ZodCheckIncludes",(e,n)=>{He.init(e,n);let t=Dn(n.includes),r=new RegExp(typeof n.position=="number"?`^.{${n.position},}${t}`:t);n.pattern=r,e._zod.check=o=>{o.value.includes(n.includes,n.position)||o.issues.push({origin:"string",code:"invalid_format",format:"includes",includes:n.includes,input:o.value,inst:e,continue:!n.abort})}}),fs=U("$ZodCheckStartsWith",(e,n)=>{He.init(e,n);let t=new RegExp(`^${Dn(n.prefix)}.*`);n.pattern??(n.pattern=t),e._zod.check=r=>{r.value.startsWith(n.prefix)||r.issues.push({origin:"string",code:"invalid_format",format:"starts_with",prefix:n.prefix,input:r.value,inst:e,continue:!n.abort})}}),hs=U("$ZodCheckEndsWith",(e,n)=>{He.init(e,n);let t=new RegExp(`.*${Dn(n.suffix)}$`);n.pattern??(n.pattern=t),e._zod.check=r=>{r.value.endsWith(n.suffix)||r.issues.push({origin:"string",code:"invalid_format",format:"ends_with",suffix:n.suffix,input:r.value,inst:e,continue:!n.abort})}});var gs=U("$ZodCheckOverwrite",(e,n)=>{He.init(e,n),e._zod.check=t=>{t.value=n.tx(t.value)}});var Zr=class{constructor(n=[],t={}){this.content=[],this.indent=0,this.args=n,this.closed=t}indented(n){this.indent+=1;try{n(this)}finally{this.indent-=1}}write(n){if(typeof n=="function"){n(this,{execution:"sync"}),n(this,{execution:"async"});return}let r=n.split(`
`).filter(a=>a),o=Math.min(...r.map(a=>a.length-a.trimStart().length)),i=r.map(a=>a.slice(o)).map(a=>" ".repeat(this.indent*2)+a);for(let a of i)this.content.push(a)}compile(){let n=Function,t=this?.content??[""];return new n(...Object.keys(this.closed),`return function (${this.args.join(", ")}) {
${t.join(`
`)}
};`)(...Object.values(this.closed))}};var vs={major:4,minor:6,patch:7};var Ae=U("$ZodType",(e,n)=>{var t;e??(e={}),e._zod.def=n,e._zod.bag=e._zod.bag||{},e._zod.version=vs;let r=e._zod.def.checks,o=e._zod.traits.has("$ZodCheck")?[e,...r??[]]:r?.length?[...r]:[];for(let i of o)for(let a of i._zod.onattach)a(e);if(o.length===0)(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{let i=(l,c,u)=>{if(l.memo)return l;let d=_n(l),p;for(let f of c){if(f._zod.def.when){if(Mo(l)||!f._zod.def.when(l))continue}else if(d)continue;let m=l.issues.length,y=f._zod.check(l);if(y instanceof Promise&&u?.async===!1)throw new Sn;if(p||y instanceof Promise)p=(p??Promise.resolve()).then(async()=>{await y,l.issues.length!==m&&(Wt(l.issues,m,e),d||(d=_n(l,m)))});else{if(l.issues.length===m)continue;Wt(l.issues,m,e),d||(d=_n(l,m))}}return p?p.then(()=>l):l},a=(l,c,u)=>{if(_n(l))return l.aborted=!0,l;let d=i(c,o,u);if(d instanceof Promise){if(u.async===!1)throw new Sn;return d.then(p=>e._zod.parse(p,u))}return e._zod.parse(d,u)};e._zod.run=(l,c)=>{if(c.skipChecks)return e._zod.parse(l,c);if(c.direction==="backward"){let d=e._zod.parse({value:l.value,issues:[]},{...c,skipChecks:!0});return d instanceof Promise?d.then(p=>a(p,l,c)):a(d,l,c)}let u=e._zod.parse(l,c);if(u instanceof Promise){if(c.async===!1)throw new Sn;return u.then(d=>i(d,o,c))}return i(u,o,c)}}},{get"~standard"(){return Tr(this,"~standard",Qo(this))},set"~standard"(e){Jn(this,"~standard",e)}}),Ns=(e,n)=>e.issues.length?{issues:e.issues.map(t=>An(t,n,un()))}:{value:e.value};async function Yp(e,n){let t={async:!0};return Ns(await e._zod.run({value:n,issues:[]},t),t)}function Qo(e){return{validate:n=>{let t={async:!1};try{let r=e._zod.run({value:n,issues:[]},t);if(!(r instanceof Promise))return Ns(r,t)}catch{}return Yp(e,n)},vendor:"zod",version:1}}var Lr=U("$ZodString",(e,n)=>{Ae.init(e,n),e._zod.pattern=n.pattern??es,e._zod.parse=(t,r)=>{if(n.coerce)try{t.value=String(t.value)}catch{}return typeof t.value=="string"||t.issues.push({expected:"string",code:"invalid_type",input:t.value,inst:e}),t}}),ze=U("$ZodStringFormat",(e,n)=>{Qt.init(e,n),Lr.init(e,n)}),Es=U("$ZodGUID",(e,n)=>{n.pattern??(n.pattern=Za),ze.init(e,n)}),Is=U("$ZodUUID",(e,n)=>{if(n.version){let r={v1:1,v2:2,v3:3,v4:4,v5:5,v6:6,v7:7,v8:8}[n.version];if(r===void 0)throw new Error(`Invalid UUID version: "${n.version}"`);n.pattern??(n.pattern=jo(r))}else n.pattern??(n.pattern=jo());ze.init(e,n)}),Ts=U("$ZodEmail",(e,n)=>{n.pattern??(n.pattern=Ba),ze.init(e,n)}),$s=1,Fr=2;function Os(e){try{return typeof URL<"u"&&typeof URL.canParse=="function"?URL.canParse(e):(new URL(e),!0)}catch{return!1}}function Qp(e,n){return!("normalize"in n)&&!("hostname"in n)&&!("protocol"in n)?Os(e)||Fr:em(e,n)}function em(e,n){if(!n.normalize&&n.protocol?.source===Wa.source&&!/^https?:\/\//i.test(e))return $s;try{if(typeof URL<"u"){let t=URL;if(typeof t.parse=="function")return t.parse(e)??Fr}return new URL(e)}catch{return Fr}}var nm=/[\t\n\r]/g;function ys(e){return e.replace(nm,"")}function tm(e,n){return n.lastIndex=0,n.test(e.hostname)}function rm(e,n){return n.lastIndex=0,n.test(e.protocol.endsWith(":")?e.protocol.slice(0,-1):e.protocol)}var Us=U("$ZodURL",(e,n)=>{ze.init(e,n),e._zod.check=t=>{try{let r=t.value.trim(),o=Qp(r,n);if(o===$s){t.issues.push({code:"invalid_format",format:"url",note:"Invalid URL format",input:t.value,inst:e,continue:!n.abort});return}if(o===Fr){t.issues.push({code:"invalid_format",format:"url",input:t.value,inst:e,continue:!n.abort});return}if(o===!0){t.value=ys(r);return}n.hostname&&!tm(o,n.hostname)&&t.issues.push({code:"invalid_format",format:"url",note:"Invalid hostname",pattern:n.hostname.source,input:t.value,inst:e,continue:!n.abort}),n.protocol&&!rm(o,n.protocol)&&t.issues.push({code:"invalid_format",format:"url",note:"Invalid protocol",pattern:n.protocol.source,input:t.value,inst:e,continue:!n.abort}),t.value=n.normalize?o.href:ys(r);return}catch{t.issues.push({code:"invalid_format",format:"url",input:t.value,inst:e,continue:!n.abort})}}}),Rs=U("$ZodEmoji",(e,n)=>{n.pattern??(n.pattern=Fa()),ze.init(e,n)}),Ds=U("$ZodNanoID",(e,n)=>{if(n.length!==void 0&&(!Number.isInteger(n.length)||n.length<1))throw new Error(`Invalid nanoid length: ${n.length}`);n.pattern??(n.pattern=n.length===void 0?Ra:Da(n.length)),ze.init(e,n)}),Ms=U("$ZodCUID",(e,n)=>{n.pattern??(n.pattern=Ia),ze.init(e,n)}),Zs=U("$ZodCUID2",(e,n)=>{n.pattern??(n.pattern=Ta),ze.init(e,n)}),Bs=U("$ZodULID",(e,n)=>{n.pattern??(n.pattern=$a),ze.init(e,n)}),Fs=U("$ZodXID",(e,n)=>{n.pattern??(n.pattern=Oa),ze.init(e,n)}),qs=U("$ZodKSUID",(e,n)=>{n.pattern??(n.pattern=Ua),ze.init(e,n)}),Ls=U("$ZodISODateTime",(e,n)=>{n.pattern??(n.pattern=Qa(n)),ze.init(e,n)}),Vs=U("$ZodISODate",(e,n)=>{n.pattern??(n.pattern=Xa),ze.init(e,n)}),Hs=U("$ZodISOTime",(e,n)=>{n.pattern??(n.pattern=Ya(n)),ze.init(e,n)}),Ks=U("$ZodISODuration",(e,n)=>{n.pattern??(n.pattern=Ma),ze.init(e,n)}),js=U("$ZodIPv4",(e,n)=>{n.pattern??(n.pattern=qa),ze.init(e,n)}),om=/^[0-9a-fA-F:.]+$/;function Ws(e){return om.test(e)?Os(`http://[${e}]`):!1}var Js=U("$ZodIPv6",(e,n)=>{n.pattern??(n.pattern=La),ze.init(e,n),e._zod.check=t=>{Ws(t.value)||t.issues.push({code:"invalid_format",format:"ipv6",input:t.value,inst:e,continue:!n.abort})}});var Gs=U("$ZodCIDRv4",(e,n)=>{n.pattern??(n.pattern=Va),ze.init(e,n)});function im(e){let n=e.split("/");if(n.length!==2)return!1;let[t,r]=n;if(!r)return!1;let o=Number(r);return`${o}`!==r||o<0||o>128?!1:Ws(t)}var Xs=U("$ZodCIDRv6",(e,n)=>{n.pattern??(n.pattern=Ha),ze.init(e,n),e._zod.check=t=>{im(t.value)||t.issues.push({code:"invalid_format",format:"cidrv6",input:t.value,inst:e,continue:!n.abort})}});function Ys(e){if(e==="")return!0;if(/\s/.test(e)||e.length%4!==0)return!1;try{return atob(e),!0}catch{return!1}}var ei=/^[0-9a-zA-Z+/]*={0,2}$/,Qs=U("$ZodBase64",(e,n)=>{n.pattern??(n.pattern=ei),ze.init(e,n),e._zod.check=t=>{Ys(t.value)||t.issues.push({code:"invalid_format",format:"base64",input:t.value,inst:e,continue:!n.abort})}}),Vr=/^[A-Za-z0-9_-]*$/;function am(e){if(!Vr.test(e))return!1;let n=e.replace(/[-_]/g,r=>r==="-"?"+":"/"),t=n.padEnd(Math.ceil(n.length/4)*4,"=");return Ys(t)}var el=U("$ZodBase64URL",(e,n)=>{n.pattern??(n.pattern=Vr),ze.init(e,n),e._zod.check=t=>{am(t.value)||t.issues.push({code:"invalid_format",format:"base64url",input:t.value,inst:e,continue:!n.abort})}}),nl=U("$ZodE164",(e,n)=>{n.pattern??(n.pattern=Ja),ze.init(e,n)});function sm(e,n=null){try{let t=e.split(".");if(t.length!==3)return!1;let[r]=t;if(!r)return!1;let o=JSON.parse(atob(r));return!("typ"in o&&o?.typ!=="JWT"||!o.alg||n&&(!("alg"in o)||o.alg!==n))}catch{return!1}}var tl=U("$ZodJWT",(e,n)=>{ze.init(e,n),e._zod.check=t=>{sm(t.value,n.alg)||t.issues.push({code:"invalid_format",format:"jwt",input:t.value,inst:e,continue:!n.abort})}});var ni=U("$ZodNumber",(e,n)=>{Ae.init(e,n),e._zod.pattern=Xt,e._zod.parse=(t,r)=>{if(n.coerce)try{t.value=Number(t.value)}catch{}let o=t.value;if(typeof o=="number"&&!Number.isNaN(o)&&Number.isFinite(o))return t;let i=typeof o=="number"?Number.isNaN(o)?"NaN":Number.isFinite(o)?void 0:String(o):void 0;return t.issues.push({expected:"number",code:"invalid_type",input:o,inst:e,...i?{received:i}:{}}),t}}),rl=U("$ZodNumberFormat",(e,n)=>{as.init(e,n),ni.init(e,n)}),ol=U("$ZodBoolean",(e,n)=>{Ae.init(e,n),e._zod.pattern=ns,e._zod.parse=(t,r)=>{if(n.coerce)try{t.value=!!t.value}catch{}let o=t.value;return typeof o=="boolean"||t.issues.push({expected:"boolean",code:"invalid_type",input:o,inst:e}),t}});var il=U("$ZodNull",(e,n)=>{Ae.init(e,n),e._zod.pattern=ts,e._zod.values=new Set([null]),e._zod.parse=(t,r)=>{let o=t.value;return o===null||t.issues.push({expected:"null",code:"invalid_type",input:o,inst:e}),t}});var al=U("$ZodUnknown",(e,n)=>{Ae.init(e,n),e._zod.parse=t=>t}),sl=U("$ZodNever",(e,n)=>{Ae.init(e,n),e._zod.parse=(t,r)=>(t.issues.push({expected:"never",code:"invalid_type",input:t.value,inst:e}),t)});function lm(e,n){let t=Ir(e._zod.def.checks);if(!t.length)return;let r=Math.min(...t.map(i=>i[0])),o=e._zod.parse;e._zod.parse=(i,a)=>{let l=n(i.value);if(l>r&&!a?.skipChecks&&a?.direction!=="backward"){for(let[c,u]of Ir(e._zod.def.checks))if(l>c&&u._zod.def.when(i)){let d=i.issues.length;return u._zod.check(i),i.issues[d].continue=!1,Wt(i.issues,d,e),i}}return o(i,a)}}var cm=e=>Array.isArray(e)?e.length:-1;function ws(e,n,t){e.issues.length&&n.issues.push(...Mn(t,e.issues)),n.value[t]=e.value}var ll=U("$ZodArray",(e,n)=>{Ae.init(e,n);let t=rn.memoizer;t?.attach(e),e._zod.parse=(r,o)=>{let i=r.value;if(!Array.isArray(i))return r.issues.push({expected:"array",code:"invalid_type",input:i,inst:e}),r;r.value=t?t.alloc(e,r,Array(i.length),o):Array(i.length);let a=[],l=o?.abortEarly;for(let c=0;c<i.length;c++){let u=i[c],d=n.element._zod.run({value:u,issues:[]},o);if(d instanceof Promise)a.push(d.then(p=>ws(p,r,c)));else if(ws(d,r,c),l&&d.issues.length!==0&&_n(d))break}return a.length?Promise.all(a).then(()=>r):r},lm(e,cm)});function qr(e,n,t,r,o,i){let a=t in r,l=i==="optional";if(!(!a&&l&&o==="optional")){if(e.issues.length){if(o!==void 0&&l&&!a)return;n.issues.push(...Mn(t,e.issues))}if(!a&&o===void 0){e.issues.length||n.issues.push({code:"invalid_type",expected:"nonoptional",input:void 0,path:[t]});return}e.value===void 0?(a||o==="defaulted"&&!l)&&(n.value[t]=void 0):n.value[t]=e.value}}var um=[];function cl(e){let n=Object.keys(e.shape),t=Object.getOwnPropertySymbols(e.shape),r=t.length?t:um,o=r.length?[...n,...r]:n;for(let a of o)if(!e.shape?.[a]?._zod?.traits?.has("$ZodType"))throw new Error(`Invalid element at key "${String(a)}": expected a Zod schema`);let i=Do(e.shape);return{...e,allKeys:o,symbolKeys:r,keySet:new Set(n),numKeys:n.length,optionalKeys:new Set(i)}}function ul(e,n,t,r,o,i,a){let l=[],c=o.keySet,u=o.catchall._zod,d=u.def.type,p=u.optin,f=u.optout,m=0;for(let y in n){if(a&&t.issues.length!==m){if(_n(t,m))break;m=t.issues.length}if(c.has(y))continue;if(y==="__proto__"){d==="never"&&l.push(y);continue}if(d==="never"){l.push(y);continue}let v=u.run({value:n[y],issues:[]},r);v instanceof Promise?e.push(v.then(b=>qr(b,t,y,n,p,f))):qr(v,t,y,n,p,f)}return l.length&&t.issues.push({code:"unrecognized_keys",keys:l,input:n,inst:i,continue:!0}),e.length?Promise.all(e).then(()=>t):t}var dm=U("$ZodObject",(e,n)=>{Ae.init(e,n);let t=Object.getOwnPropertyDescriptor(n,"shape"),r=t?.get?t.get.raw:n.shape??{};if(r){let u=()=>{let d={...r};return Object.defineProperty(n,"shape",{value:d}),u.raw=d,d};u.raw=r,Object.defineProperty(n,"shape",{get:u})}let o=_t(()=>cl(n));fe(e,"propValues",u=>{let d=u.def.shape,p={};for(let f in d){let m=d[f]._zod;if(m.values){Object.prototype.hasOwnProperty.call(p,f)||cn(p,f,new Set);for(let y of m.values)p[f].add(y);m.optin!==void 0&&p[f].add(void 0)}}return p});let i=ut,a=n.catchall,l,c=rn.memoizer;c?.attach(e),e._zod.parse=(u,d)=>{l??(l=o.value);let p=u.value;if(!i(p))return u.issues.push({expected:"object",code:"invalid_type",input:p,inst:e}),u;u.value=c?c.alloc(e,u,{},d):{};let f=[],m=l.shape,y=d?.abortEarly,v=u.issues.length;for(let b of l.allKeys){if(y&&u.issues.length!==v){if(_n(u,v))break;v=u.issues.length}if(b==="__proto__")continue;let x=m[b],z=x._zod.optin,F=x._zod.optout,Z=x._zod.run({value:p[b],issues:[]},d);Z instanceof Promise?f.push(Z.then(N=>qr(N,u,b,p,z,F))):qr(Z,u,b,p,z,F)}return a?ul(f,p,u,d,o.value,e,y===!0):f.length?Promise.all(f).then(()=>u):u}}),dl=U("$ZodObjectJIT",(e,n)=>{dm.init(e,n);let t=e._zod.parse,r=_t(()=>cl(n)),o=rn.memoizer,i=m=>{let y=r.value,v=y.symbolKeys,b=new Zr(["payload","ctx"],{shape:m,inst:e,memo:o,syms:v}),x=N=>`shape[${N}]._zod.run({ value: input[${N}], issues: [] }, ctx)`,z=(N,$)=>`
          let ${N}_ab = false;
          for (let i = 0; i < ${N}.issues.length; i++) {
            const iss = ${N}.issues[i];
            iss.path = iss.path ? [${$}, ...iss.path] : [${$}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${N}_ab = true;
          }
          if (${N}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;b.write("const input = payload.value;");let F=Object.create(null),Z=0;for(let N of y.allKeys)F[N]=`key_${Z++}`;b.write(o?"const newResult = memo.alloc(inst, payload, {}, ctx);":"const newResult = {};");for(let N of y.allKeys){if(N==="__proto__")continue;let $=F[N],S=typeof N=="symbol"?`syms[${v.indexOf(N)}]`:$o(N),O=`${S} in input`,C=m[N],_=C?._zod?.optin,P=_!==void 0,D=C?._zod?.optout==="optional";if(b.write(`const ${$} = ${x(S)};`),P&&D){let A=_==="optional"?`${$}_present`:`${$}.value !== undefined || ${$}_present`;b.write(`
        const ${$}_present = ${O};
        if (!${$}.issues.length || ${$}_present) {
          if (${$}.issues.length) {${z($,S)}
          }

          if (${A}) {
            newResult[${S}] = ${$}.value;
          }
        }

      `)}else P?(b.write(`
        if (${$}.issues.length) {${z($,S)}
        }
      `),_==="defaulted"?b.write(`newResult[${S}] = ${$}.value;`):b.write(`
        if (${$}.value !== undefined || ${O}) {
          newResult[${S}] = ${$}.value;
        }
      `)):b.write(`
        const ${$}_present = ${O};
        if (${$}.issues.length) {${z($,S)}
        }
        if (!${$}_present && !${$}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${S}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${$}_present) {
          newResult[${S}] = ${$}.value;
        }

      `)}return b.write("payload.value = newResult;"),b.write("return payload;"),b.compile()},a,l=ut,c=!rn.jitless,d=c&&Uo.value,p=n.catchall,f;e._zod.parse=(m,y)=>{f??(f=r.value);let v=m.value;return l(v)?c&&d&&y?.async===!1&&y.jitless!==!0?(a||(a=i(n.shape)),m=a(m,y),p?ul([],v,m,y,f,e,y?.abortEarly===!0):m):t(m,y):(m.issues.push({expected:"object",code:"invalid_type",input:v,inst:e}),m)}});function xs(e,n,t,r){for(let i of e)if(i.issues.length===0)return n.value=i.value,n;let o=e.filter(i=>!_n(i));return o.length===1?(n.value=o[0].value,o[0]):(n.issues.push({code:"invalid_union",input:n.value,inst:t,errors:e.map(i=>i.issues.map(a=>An(a,r,un())))}),n)}var ti=U("$ZodUnion",(e,n)=>{Ae.init(e,n),fe(e,"optin",r=>r.def.options.some(o=>o._zod.optin==="defaulted")?"defaulted":r.def.options.some(o=>o._zod.optin!==void 0)?"optional":void 0),fe(e,"optout",r=>r.def.options.some(o=>o._zod.optout==="optional")?"optional":void 0),fe(e,"values",r=>{if(r.def.options.every(o=>o._zod.values))return new Set(r.def.options.flatMap(o=>Array.from(o._zod.values)))}),fe(e,"pattern",r=>{if(r.def.options.every(o=>o._zod.pattern)){let o=r.def.options.map(i=>i._zod.pattern);return new RegExp(`^(${o.map(i=>Kt(i.source)).join("|")})$`)}});let t=n.options.length===1?n.options[0]._zod.run:null;e._zod.parse=(r,o)=>{if(t)return t(r,o);let i=!1,a=[];for(let l of n.options){let c=l._zod.run({value:r.value,issues:[]},o);if(c instanceof Promise)a.push(c),i=!0;else{if(c.issues.length===0)return c;a.push(c)}}return i?Promise.all(a).then(l=>xs(l,r,e,o)):xs(a,r,e,o)}});function pm(e){let n=new Map;for(let t of e.options){let r=t._zod.propValues?.[e.discriminator];if(!r||r.size===0)throw new Error(`Invalid discriminated union option at index "${e.options.indexOf(t)}"`);for(let o of r)if(n.has(o)){if(o!==void 0)throw new Error(`Duplicate discriminator value "${String(o)}"`);n.set(o,null)}else n.set(o,t)}return n}var pl=U("$ZodDiscriminatedUnion",(e,n)=>{n.inclusive=!1,ti.init(e,n);let t=e._zod.parse;fe(e,"propValues",o=>{let i={},a=0;for(let l of o.def.options){let c=l._zod.propValues;if(!c||Object.keys(c).length===0)throw new Error(`Invalid discriminated union option at index "${o.def.options.indexOf(l)}"`);c[o.def.discriminator]?.has(void 0)&&a++;for(let[u,d]of Object.entries(c)){Object.prototype.hasOwnProperty.call(i,u)||cn(i,u,new Set);for(let p of d)i[u].add(p)}}return!o.def.unionFallback&&a>1&&i[o.def.discriminator]?.delete(void 0),i}),n.options.forEach((o,i)=>{let a=At(o._zod.def);if(a&&!Object.prototype.hasOwnProperty.call(a,n.discriminator))throw new Error(`Invalid discriminated union option at index "${i}"`)});let r=_t(()=>pm(n));e._zod.parse=(o,i)=>{let a=o.value;if(!ut(a))return o.issues.push({code:"invalid_type",expected:"object",input:a,inst:e}),o;let l=a?.[n.discriminator],c=r.value.get(l);return c&&(l!==void 0||i.direction!=="backward")?c._zod.run(o,i):n.unionFallback||i.direction==="backward"?t(o,i):(o.issues.push({code:"invalid_union",errors:[],note:"No matching discriminator",discriminator:n.discriminator,options:Array.from(r.value.keys()).filter(u=>r.value.get(u)!==null),input:a,path:[n.discriminator],inst:e}),o)}}),ml=U("$ZodIntersection",(e,n)=>{Ae.init(e,n),e._zod.parse=(t,r)=>{let o=t.value,i=n.left._zod.run({value:o,issues:[]},r),a=n.right._zod.run({value:o,issues:[]},r);return i instanceof Promise||a instanceof Promise?Promise.all([i,a]).then(([c,u])=>ks(t,c,u)):ks(t,i,a)}});function Yo(e,n){if(e===n)return{valid:!0,data:e};if(e instanceof Date&&n instanceof Date&&+e==+n)return{valid:!0,data:e};if(Gn(e)&&Gn(n)){let t=Object.keys(n),r=Object.keys(e).filter(i=>t.indexOf(i)!==-1),o={...e,...n};Object.prototype.hasOwnProperty.call(o,"__proto__")&&delete o.__proto__;for(let i of r){if(i==="__proto__")continue;let a=Yo(e[i],n[i]);if(!a.valid)return{valid:!1,mergeErrorPath:[i,...a.mergeErrorPath]};o[i]=a.data}return{valid:!0,data:o}}if(Array.isArray(e)&&Array.isArray(n)){if(e.length!==n.length)return{valid:!1,mergeErrorPath:[]};let t=[];for(let r=0;r<e.length;r++){let o=e[r],i=n[r],a=Yo(o,i);if(!a.valid)return{valid:!1,mergeErrorPath:[r,...a.mergeErrorPath]};t.push(a.data)}return{valid:!0,data:t}}return{valid:!1,mergeErrorPath:[]}}function ks(e,n,t){let r=new Map,o,i=new Map,a=(u,d)=>{let p;if(u.code==="unrecognized_keys"&&!u.path?.length)o??(o=u),p=u.keys;else if(u.code==="invalid_key"&&u.origin==="record"&&u.path?.length===1){let f=String(u.path[0]);i.has(f)||i.set(f,u),p=[f]}else return!1;for(let f of p)r.has(f)||r.set(f,{}),r.get(f)[d]=!0;return!0};for(let u of n.issues)a(u,"l")||e.issues.push(u);for(let u of t.issues)a(u,"r")||e.issues.push(u);let l=[...r].filter(([,u])=>u.l&&u.r).map(([u])=>u);if(l.length){let u=o?l.filter(d=>o.keys.includes(d)):[];u.length&&e.issues.push({...o,keys:u});for(let d of l)!u.includes(d)&&i.has(d)&&e.issues.push(i.get(d))}let c=Yo(n.value,t.value);if(!c.valid){if(_n(e))return e;throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(c.mergeErrorPath)}`)}return e.value=c.data,e}var fl=U("$ZodRecord",(e,n)=>{Ae.init(e,n);let t=rn.memoizer;t?.attach(e),e._zod.parse=(r,o)=>{let i=r.value;if(!Gn(i))return r.issues.push({expected:"record",code:"invalid_type",input:i,inst:e}),r;let a=[],l=n.keyType._zod.values;if(l&&!n.partial){r.value=t?t.alloc(e,r,{},o):{};let c=new Set;for(let d of l)if(typeof d=="string"||typeof d=="number"||typeof d=="symbol"){if(c.add(typeof d=="number"?d.toString():d),d==="__proto__")continue;let p=n.keyType._zod.run({value:d,issues:[]},o);if(p instanceof Promise)throw new Error("Async schemas not supported in object keys currently");if(p.issues.length){r.issues.push({code:"invalid_key",origin:"record",issues:p.issues.map(y=>An(y,o,un())),input:d,path:[d],inst:e});continue}let f=p.value;if(f==="__proto__")continue;let m=n.valueType._zod.run({value:i[d],issues:[]},o);m instanceof Promise?a.push(m.then(y=>{y.issues.length&&r.issues.push(...Mn(d,y.issues)),r.value[f]=y.value})):(m.issues.length&&r.issues.push(...Mn(d,m.issues)),r.value[f]=m.value)}let u;for(let d in i)if(!c.has(d))if(n.mode==="loose"){if(d==="__proto__")continue;r.value[d]=i[d]}else u=u??[],u.push(d);u&&u.length>0&&r.issues.push({code:"unrecognized_keys",input:i,inst:e,keys:u,continue:!0})}else{r.value=t?t.alloc(e,r,{},o):{};let c;for(let u of Reflect.ownKeys(i)){if(u==="__proto__"||!Object.prototype.propertyIsEnumerable.call(i,u))continue;let d=n.keyType._zod.run({value:u,issues:[]},o);if(d instanceof Promise)throw new Error("Async schemas not supported in object keys currently");if(typeof u=="string"&&Xt.test(u)&&d.issues.length){let y=n.keyType._zod.run({value:Number(u),issues:[]},o);if(y instanceof Promise)throw new Error("Async schemas not supported in object keys currently");y.issues.length===0&&(d=y)}if(d.issues.length){n.mode==="loose"?r.value[u]=i[u]:l?(c=c??[],c.push(u)):r.issues.push({code:"invalid_key",origin:"record",issues:d.issues.map(y=>An(y,o,un())),input:u,path:[u],inst:e});continue}let f=d.value;if(f==="__proto__")continue;let m=n.valueType._zod.run({value:i[u],issues:[]},o);m instanceof Promise?a.push(m.then(y=>{y.issues.length&&r.issues.push(...Mn(u,y.issues)),r.value[f]=y.value})):(m.issues.length&&r.issues.push(...Mn(u,m.issues)),r.value[f]=m.value)}c&&c.length>0&&r.issues.push({code:"unrecognized_keys",input:i,inst:e,keys:c,continue:!0})}return a.length?Promise.all(a).then(()=>r):r}});var hl=U("$ZodEnum",(e,n)=>{Ae.init(e,n);let t=xt(n.entries),r=new Set(t);e._zod.values=r,fe(e,"pattern",o=>{let i=xt(o.def.entries).filter(a=>Ro.has(typeof a));return new RegExp(i.length?`^(${i.map(a=>Dn(a.toString())).join("|")})$`:"^[^\\s\\S]$")}),e._zod.parse=(o,i)=>{let a=o.value;return r.has(a)||o.issues.push({code:"invalid_value",values:t,input:a,inst:e}),o}}),gl=U("$ZodLiteral",(e,n)=>{Ae.init(e,n);let t=new Set(n.values);e._zod.values=t,fe(e,"pattern",r=>{let o=r.def.values;return new RegExp(o.length?`^(${o.map(i=>typeof i=="string"?Dn(i):i?Dn(i.toString()):String(i)).join("|")})$`:"^[^\\s\\S]$")}),e._zod.parse=(r,o)=>{let i=r.value;return t.has(i)||r.issues.push({code:"invalid_value",values:n.values,input:i,inst:e}),r}});var bl=U("$ZodTransform",(e,n)=>{Ae.init(e,n),e._zod.optin="optional",rn.memoizer?.guard(e),e._zod.parse=(t,r)=>{if(r.direction==="backward")throw new zt(e.constructor.name);let o=n.transform(t.value,t);if(r.async)return(o instanceof Promise?o:Promise.resolve(o)).then(a=>(t.value=a,t));if(o instanceof Promise)throw new Sn;return t.value=o,t}});function _s(e,n){return e.value=n.issues.length?void 0:n.value,e}var ri=U("$ZodOptional",(e,n)=>{Ae.init(e,n),fe(e,"optin",t=>t.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),e._zod.optout="optional",fe(e,"values",t=>{let r=t.def.innerType._zod.values;return r?new Set([...r,void 0]):void 0}),fe(e,"pattern",t=>{let r=t.def.innerType._zod.pattern;return r?new RegExp(`^(${Kt(r.source)})?$`):void 0}),e._zod.parse=(t,r)=>{if(t.value===void 0){if(n.innerType._zod.optin!=="defaulted")return t;let o=n.innerType._zod.run({value:t.value,issues:[]},r);return o instanceof Promise?o.then(i=>_s(t,i)):_s(t,o)}return n.innerType._zod.run(t,r)}}),vl=U("$ZodExactOptional",(e,n)=>{ri.init(e,n),fe(e,"values",t=>t.def.innerType._zod.values),fe(e,"pattern",t=>t.def.innerType._zod.pattern),e._zod.parse=(t,r)=>n.innerType._zod.run(t,r)}),yl=U("$ZodNullable",(e,n)=>{Ae.init(e,n),fe(e,"optin",t=>t.def.innerType._zod.optin),fe(e,"optout",t=>t.def.innerType._zod.optout),fe(e,"pattern",t=>{let r=t.def.innerType._zod.pattern;return r?new RegExp(`^(${Kt(r.source)}|null)$`):void 0}),fe(e,"values",t=>t.def.innerType._zod.values?new Set([...t.def.innerType._zod.values,null]):void 0),e._zod.parse=(t,r)=>t.value===null?t:n.innerType._zod.run(t,r)}),wl=U("$ZodDefault",(e,n)=>{Ae.init(e,n),e._zod.optin="defaulted",fe(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,r)=>{if(r.direction==="backward")return n.innerType._zod.run(t,r);if(t.value===void 0)return t.value=n.defaultValue,t;let o=n.innerType._zod.run(t,r);return o instanceof Promise?o.then(i=>As(i,n)):As(o,n)}});function As(e,n){return e.value===void 0&&(e.value=n.defaultValue),e}var xl=U("$ZodPrefault",(e,n)=>{Ae.init(e,n),e._zod.optin="defaulted",fe(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,r)=>(r.direction==="backward"||t.value===void 0&&(t.value=n.defaultValue),n.innerType._zod.run(t,r))}),kl=U("$ZodNonOptional",(e,n)=>{Ae.init(e,n),fe(e,"values",t=>{let r=t.def.innerType._zod.values;return r?new Set([...r].filter(o=>o!==void 0)):void 0}),e._zod.parse=(t,r)=>{let o=n.innerType._zod.run(t,r);return o instanceof Promise?o.then(i=>Ss(i,e)):Ss(o,e)}});function Ss(e,n){return!e.issues.length&&e.value===void 0&&e.issues.push({code:"invalid_type",expected:"nonoptional",input:e.value,inst:n}),e}function zs(e,n,t,r){return n.issues.length?(e.value=t.catchValue({...n,value:e.value,error:{issues:n.issues.map(o=>An(o,r,un()))},input:e.value}),e):(e.value=n.value,n.memo&&(e.memo=!0),e)}var _l=U("$ZodCatch",(e,n)=>{Ae.init(e,n),fe(e,"optin",t=>t.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),fe(e,"optout",t=>t.def.innerType._zod.optout),fe(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,r)=>{if(r.direction==="backward")return n.innerType._zod.run(t,r);let o=n.innerType._zod.run({value:t.value,issues:[]},r);return o instanceof Promise?o.then(i=>zs(t,i,n,r)):zs(t,o,n,r)}});var Al=U("$ZodPipe",(e,n)=>{Ae.init(e,n),fe(e,"values",t=>t.def.in._zod.values),fe(e,"optin",t=>t.def.in._zod.optin),fe(e,"optout",t=>t.def.out._zod.optout),fe(e,"propValues",t=>t.def.in._zod.propValues),e._zod.parse=(t,r)=>{if(r.direction==="backward"){let i=n.out._zod.run(t,r);return i instanceof Promise?i.then(a=>Br(a,n.in,r)):Br(i,n.in,r)}let o=n.in._zod.run(t,r);return o instanceof Promise?o.then(i=>Br(i,n.out,r)):Br(o,n.out,r)}});function Br(e,n,t){return e.issues.some(r=>r.code!=="unrecognized_keys")?(e.aborted=!0,e):n._zod.run({value:e.value,issues:e.issues},t)}var Sl=U("$ZodReadonly",(e,n)=>{Ae.init(e,n),fe(e,"propValues",t=>t.def.innerType._zod.propValues),fe(e,"values",t=>t.def.innerType._zod.values),fe(e,"optin",t=>t.def.innerType?._zod?.optin),fe(e,"optout",t=>t.def.innerType?._zod?.optout),e._zod.parse=(t,r)=>{if(r.direction==="backward")return n.innerType._zod.run(t,r);let o=n.innerType._zod.run(t,r);return o instanceof Promise?o.then(Cs):Cs(o)}});function Cs(e){return e.memo||(e.value=Object.freeze(e.value)),e}var zl=U("$ZodLazy",(e,n)=>{Ae.init(e,n),To(e._zod,"innerType",()=>{let t=n;return t._cachedInner||(t._cachedInner=n.getter()),t._cachedInner}),fe(e,"pattern",t=>t.innerType?._zod?.pattern),fe(e,"propValues",t=>t.innerType?._zod?.propValues),fe(e,"optin",t=>t.innerType?._zod?.optin??void 0),fe(e,"optout",t=>t.innerType?._zod?.optout??void 0),e._zod.parse=(t,r)=>e._zod.innerType._zod.run(t,r)}),Cl=U("$ZodCustom",(e,n)=>{He.init(e,n),Ae.init(e,n),e._zod.parse=(t,r)=>t,e._zod.check=t=>{let r=t.value,o=n.fn(r);if(o instanceof Promise)return o.then(i=>Ps(i,t,r,e));Ps(o,t,r,e)}});function Ps(e,n,t,r){if(!e){let o={code:"custom",input:t,inst:r,path:[...r._zod.def.path??[]],continue:!r._zod.def.abort};r._zod.def.params&&(o.params=r._zod.def.params),n.issues.push(St(o))}}var ii=class extends Error{constructor(){super("Cannot parse a reference cycle that closes through a transform"),this.name="ZodCyclicError"}},ai="~memo",Pl=[];function Nl(e){return e!==null&&typeof e=="object"}function oi(e){return e.map(n=>n.path?{...n,path:n.path.slice()}:{...n})}var El=new WeakMap,er=0,jr=1,nr=2;function Wr(e,n,t){let r=El.get(e);if(r!==void 0)return r?nr:er;if(n.has(e))return nr;n.add(e);let o=er,i=d=>{if(o!==nr&&d?._zod){let p=Wr(d,n,t);p>o&&(o=p)}},a=(d,p)=>{let f=er;for(let m of Reflect.ownKeys(d)){let y=Object.getOwnPropertyDescriptor(d,m);if(p&&!y.enumerable)continue;let v=y.get?jr:y.value?._zod?Wr(y.value,n,t):er;v>f&&(f=v)}return f},l=d=>{d>o&&(o=d)},c=e._zod.def,u=c.type;switch(u){case"object":{let d=At(c);l(d?a(d,!0):jr),i(c.catchall);break}case"array":i(c.element);break;case"tuple":for(let d of c.items)i(d);i(c.rest);break;case"record":case"map":i(c.keyType),i(c.valueType);break;case"set":i(c.valueType);break;case"union":for(let d of c.options)i(d);break;case"intersection":i(c.left),i(c.right);break;case"optional":case"nullable":case"default":case"prefault":case"catch":case"readonly":case"nonoptional":case"promise":case"success":i(c.innerType);break;case"pipe":i(c.in),i(c.out);break;case"function":i(c.input),i(c.output);break;case"lazy":{let d=c._cachedInner??(t?e._zod.innerType:void 0);l(d?Wr(d,n,!1):jr);break}case"template_literal":case"string":case"number":case"int":case"boolean":case"bigint":case"symbol":case"undefined":case"null":case"void":case"never":case"any":case"unknown":case"date":case"nan":case"enum":case"literal":case"file":case"transform":case"custom":break;default:for(let d in c){let p=Object.getOwnPropertyDescriptor(c,d);if(!p||p.get)continue;let f=p.value;if(!(!f||typeof f!="object")){if(f._zod)i(f);else if(Array.isArray(f))for(let m of f)i(m)}}}return n.delete(e),mm(e,o)}function mm(e,n){return n!==jr&&El.set(e,n===nr),n}function fm(e,n){let t=e.buckets.get(n);return t||(t=new WeakMap,e.buckets.set(n,t)),t}var Hr,Kr=[],hm={alloc(e,n,t){let r=Hr;if(!r)return t;Hr=void 0;let o={value:t,issues:null};return r.set(n.value,o),Kr.push(o),t},guard(e){var n;(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred.push(()=>{let t=e._zod.parse,r=(o,i)=>{if(i.direction!=="backward"&&gm(i,o.value))throw new ii;return t(o,i)};e._zod.parse=r,e._zod.run===t&&(e._zod.run=r)})},attach(e){var n;let t,r=!1,o,i;(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred.push(()=>{let a=e._zod.parse,l=(c,u)=>{if(t===void 0){let x=Wr(e,new Set,!1);if(x===er)return e._zod.parse=a,e._zod.run===l&&(e._zod.run=a),a(c,u);x===nr||r?t=!0:r=!0}let d=c.value;if(!Nl(d))return a(c,u);let p=u[ai];p||(p={buckets:new WeakMap,backEdges:void 0},u[ai]=p);let f;o===u?f=i:(f=fm(p,e),o=u,i=f);let m=f.get(d);if(m)return c.value=m.value,m.issues?m.issues.length&&c.issues.push(...oi(m.issues)):(c.memo=!0,p.backEdges??(p.backEdges=new WeakSet),p.backEdges.add(m.value)),c;Hr=f;let y=Kr.length,v=a(c,u);Hr=void 0;let b=Kr.length>y?Kr.pop():void 0;return v instanceof Promise?v.then(x=>(b&&(b.issues=x.issues.length?oi(x.issues):Pl),x)):(b&&(b.issues=v.issues.length?oi(v.issues):Pl),v)};e._zod.parse=l,e._zod.run===a&&(e._zod.run=l)})}};function Il(){return hm}function gm(e,n){let t=e[ai]?.backEdges;return t!==void 0&&Nl(n)&&t.has(n)}var bm=()=>{let e={string:{unit:"characters",verb:"to have"},file:{unit:"bytes",verb:"to have"},array:{unit:"items",verb:"to have"},set:{unit:"items",verb:"to have"},map:{unit:"entries",verb:"to have"}};function n(i){return e[i]??null}let t={regex:"input",email:"email address",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO datetime",date:"ISO date",time:"ISO time",duration:"ISO duration",ipv4:"IPv4 address",ipv6:"IPv6 address",mac:"MAC address",cidrv4:"IPv4 range",cidrv6:"IPv6 range",base64:"base64-encoded string",base64url:"base64url-encoded string",json_string:"JSON string",e164:"E.164 number",currency_code:"currency code",credit_card:"credit card number",iban:"IBAN",jwt:"JWT",template_literal:"input"},r={nan:"NaN"};function o(i,a){return i==="number"&&typeof a=="number"&&!Number.isFinite(a)?String(a):r[i]??i}return i=>{switch(i.code){case"invalid_type":{let a=o(i.expected),l=Zo(i.input),c=o(l,i.input);return`Invalid input: expected ${a}, received ${c}`}case"invalid_value":return i.values.length===1?`Invalid input: expected ${Pr(i.values[0])}`:`Invalid option: expected one of ${zr(i.values,"|")}`;case"too_big":{let a=i.exact?"exactly ":i.inclusive?"<=":"<",l=n(i.origin);return l?`Too big: expected ${i.origin??"value"} to have ${a}${i.maximum.toString()} ${l.unit??"elements"}`:`Too big: expected ${i.origin??"value"} to be ${a}${i.maximum.toString()}`}case"too_small":{let a=i.exact?"exactly ":i.inclusive?">=":">",l=n(i.origin);return l?`Too small: expected ${i.origin} to have ${a}${i.minimum.toString()} ${l.unit}`:`Too small: expected ${i.origin} to be ${a}${i.minimum.toString()}`}case"invalid_format":{let a=i;return a.format==="starts_with"?`Invalid string: must start with "${a.prefix}"`:a.format==="ends_with"?`Invalid string: must end with "${a.suffix}"`:a.format==="includes"?`Invalid string: must include "${a.includes}"`:a.format==="regex"?`Invalid string: must match pattern ${a.pattern}`:`Invalid ${t[a.format]??i.format}`}case"not_multiple_of":return`Invalid number: must be a multiple of ${i.divisor}`;case"unrecognized_keys":return`Unrecognized key${i.keys.length>1?"s":""}: ${zr(i.keys,", ")}`;case"invalid_key":return`Invalid key in ${i.origin}`;case"invalid_union":return i.options&&Array.isArray(i.options)&&i.options.length>0?`Invalid discriminator value. Expected ${i.options.map(l=>`'${l}'`).join(" | ")}`:i.inclusive===!1?"Invalid input: more than one option matched":"Invalid input";case"invalid_element":return`Invalid value in ${i.origin}`;default:return"Invalid input"}}};function Tl(){return{localeError:bm()}}var $l;var si=class{constructor(){this._map=new WeakMap,this._idmap=new Map}add(n,...t){let r=t[0];return this._map.set(n,r),r&&typeof r=="object"&&"id"in r&&this._idmap.set(r.id,n),this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(n){let t=this._map.get(n);return t&&typeof t=="object"&&"id"in t&&this._idmap.delete(t.id),this._map.delete(n),this}get(n){let t=n._zod.parent;if(t){let r={...this.get(t)??{}};delete r.id;let o={...r,...this._map.get(n)};return Object.keys(o).length?o:void 0}return this._map.get(n)}has(n){return this._map.has(n)}};function vm(){return new si}($l=globalThis).__zod_globalRegistry??($l.__zod_globalRegistry=vm());var dt=globalThis.__zod_globalRegistry;function Ol(e){return e.checks&&(e.checks=[...e.checks]),e}function Ul(e,n){return new e(Ol({type:"string",...oe(n)}))}function Rl(e,n){return new e({type:"string",format:"email",check:"string_format",abort:!1,...oe(n)})}function Dl(e,n){return new e({type:"string",format:"guid",check:"string_format",abort:!1,...oe(n)})}function Ml(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,...oe(n)})}function Zl(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v4",...oe(n)})}function Bl(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v6",...oe(n)})}function Fl(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v7",...oe(n)})}function ql(e,n){return new e({type:"string",format:"url",check:"string_format",abort:!1,...oe(n)})}function Ll(e,n){return new e({type:"string",format:"emoji",check:"string_format",abort:!1,...oe(n)})}function Vl(e,n){return new e({type:"string",format:"nanoid",check:"string_format",abort:!1,...oe(n)})}function Hl(e,n){return new e({type:"string",format:"cuid",check:"string_format",abort:!1,...oe(n)})}function Kl(e,n){return new e({type:"string",format:"cuid2",check:"string_format",abort:!1,...oe(n)})}function jl(e,n){return new e({type:"string",format:"ulid",check:"string_format",abort:!1,...oe(n)})}function Wl(e,n){return new e({type:"string",format:"xid",check:"string_format",abort:!1,...oe(n)})}function Jl(e,n){return new e({type:"string",format:"ksuid",check:"string_format",abort:!1,...oe(n)})}function Gl(e,n){return new e({type:"string",format:"ipv4",check:"string_format",abort:!1,...oe(n)})}function Xl(e,n){return new e({type:"string",format:"ipv6",check:"string_format",abort:!1,...oe(n)})}function Yl(e,n){return new e({type:"string",format:"cidrv4",check:"string_format",abort:!1,...oe(n)})}function Ql(e,n){return new e({type:"string",format:"cidrv6",check:"string_format",abort:!1,...oe(n)})}function ec(e,n){return new e({type:"string",format:"base64",check:"string_format",abort:!1,...oe(n)})}function nc(e,n){return new e({type:"string",format:"base64url",check:"string_format",abort:!1,...oe(n)})}function tc(e,n){return new e({type:"string",format:"e164",check:"string_format",abort:!1,...oe(n)})}function rc(e,n){return new e({type:"string",format:"jwt",check:"string_format",abort:!1,...oe(n)})}function oc(e,n){return new e({type:"string",format:"datetime",check:"string_format",offset:!1,local:!1,precision:null,...oe(n)})}function ic(e,n){return new e({type:"string",format:"date",check:"string_format",...oe(n)})}function ac(e,n){return new e({type:"string",format:"time",check:"string_format",precision:null,...oe(n)})}function sc(e,n){return new e({type:"string",format:"duration",check:"string_format",...oe(n)})}function lc(e,n){return new e(Ol({type:"number",checks:[],...oe(n)}))}function cc(e,n){return new e({type:"number",check:"number_format",abort:!1,format:"safeint",...oe(n)})}function uc(e,n){return new e({type:"boolean",...oe(n)})}function dc(e,n){return new e({type:"null",...oe(n)})}function pc(e){return new e({type:"unknown"})}function mc(e,n){return new e({type:"never",...oe(n)})}function Jr(e,n){return new Go({check:"less_than",...oe(n),value:e,inclusive:!1})}function tr(e,n){return new Go({check:"less_than",...oe(n),value:e,inclusive:!0})}function Gr(e,n){return new Xo({check:"greater_than",...oe(n),value:e,inclusive:!1})}function rr(e,n){return new Xo({check:"greater_than",...oe(n),value:e,inclusive:!0})}function Xr(e,n){return new is({check:"multiple_of",...oe(n),value:e})}function Yr(e,n){return new ss({check:"max_length",...oe(n),maximum:e})}function Ct(e,n){return new ls({check:"min_length",...oe(n),minimum:e})}function Qr(e,n){return new cs({check:"length_equals",...oe(n),length:e})}function li(e,n){return new us({check:"string_format",format:"regex",...oe(n),pattern:e})}function ci(e){return new ds({check:"string_format",format:"lowercase",...oe(e)})}function ui(e){return new ps({check:"string_format",format:"uppercase",...oe(e)})}function di(e,n){return new ms({check:"string_format",format:"includes",...oe(n),includes:e})}function pi(e,n){return new fs({check:"string_format",format:"starts_with",...oe(n),prefix:e})}function mi(e,n){return new hs({check:"string_format",format:"ends_with",...oe(n),suffix:e})}function Xn(e){return new gs({check:"overwrite",tx:e})}function fi(e){return Xn(n=>n.normalize(e))}function hi(){return Xn(e=>e.trim())}function gi(){return Xn(e=>e.toLowerCase())}function bi(){return Xn(e=>e.toUpperCase())}function vi(){return Xn(e=>Oo(e))}function fc(e,n,t){return new e({type:"array",element:n,...oe(t)})}function hc(e,n,t){return new e({type:"custom",check:"custom",fn:n,...oe(t)})}function gc(e,n){let t=ym(r=>(r.addIssue=o=>{if(typeof o=="string")r.issues.push(St(o,r.value,t._zod.def));else{let i=o;i.fatal&&(i.continue=!1),i.code??(i.code="custom"),"input"in i||(i.input=r.value),i.inst??(i.inst=t),i.continue??(i.continue=!t._zod.def.abort),r.issues.push(St(i))}},e(r.value,r)),n);return t}function ym(e,n){let t=new He({check:"custom",...oe(n)});return t._zod.check=e,t}function or(e,...n){for(let t of n)for(let r of Reflect.ownKeys(t))Object.prototype.propertyIsEnumerable.call(t,r)&&cn(e,r,t[r]);return e}function wi(e){let n=e?.target??"draft-2020-12";return n==="draft-4"&&(n="draft-04"),n==="draft-7"&&(n="draft-07"),{processors:e.processors??{},metadataRegistry:e?.metadata??dt,target:n,unrepresentable:e?.unrepresentable??"throw",override:e?.override??(()=>{}),io:e?.io??"output",counter:0,seen:new Map,sharedDefsExtractedFor:void 0,sharedEmitDoneFor:void 0,cycles:e?.cycles??"ref",reused:e?.reused??"inline",intersections:[],deferred:[],external:e?.external??void 0}}function Zn(e,n,t,r,o){let i=typeof n.unrepresentable=="function"?n.unrepresentable({zodSchema:e,path:r.path,message:o}):n.unrepresentable;if(i==="any")return!1;if(i===void 0||i==="throw")throw new Error(o);return Object.assign(t,i),!0}function Te(e,n,t={path:[],schemaPath:[]}){var r;let o=e._zod.def,i=n.seen.get(e);if(i)return i.count++,t.schemaPath.includes(e)&&(i.cycle=t.path),i.schema;let a={schema:{},count:1,cycle:void 0,path:t.path};n.seen.set(e,a),n.sharedDefsExtractedFor=void 0,n.sharedEmitDoneFor=void 0;let l=e._zod.toJSONSchema?.();if(l)a.schema=l;else{let d={...t,schemaPath:[...t.schemaPath,e],path:t.path};if(e._zod.processJSONSchema)e._zod.processJSONSchema(n,a.schema,d);else{let f=a.schema,m=n.processors[o.type];if(!m)throw new Error(`[toJSONSchema]: Non-representable type encountered: ${o.type}`);m(e,n,f,d)}let p=e._zod.parent;p&&(a.ref||(a.ref=p),Te(p,n,d),n.seen.get(p).isParent=!0)}let c=n.metadataRegistry.get(e);return c&&or(a.schema,c),n.io==="input"&&Xe(e)&&(delete a.schema.examples,delete a.schema.default),n.io==="input"&&"_prefault"in a.schema&&((r=a.schema).default??(r.default=a.schema._prefault)),delete a.schema._prefault,n.seen.get(e).schema}function bc(e){return e.replace(/~/g,"~0").replace(/\//g,"~1")}function xi(e,n){let t=e.seen.get(n);if(!t)throw new Error("Unprocessed schema. This is a bug in Zod.");if(e.external&&e.sharedDefsExtractedFor===e.external)return;let r=new Map;for(let a of e.seen.entries()){let l=e.metadataRegistry.get(a[0])?.id;if(l){let c=r.get(l);if(c&&c!==a[0])throw new Error(`Duplicate schema id "${l}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);r.set(l,a[0])}}let o=a=>{let l=e.target==="draft-2020-12"?"$defs":"definitions";if(e.external){let p=e.external.registry.get(a[0])?.id,f=e.external.uri??(y=>y);if(p)return{ref:f(p)};let m=a[1].defId??a[1].schema.id??`schema${e.counter++}`;return a[1].defId=m,{defId:m,ref:`${f("__shared")}#/${l}/${bc(m)}`}}let c="#",u=`${c}/${l}/`;if(a[1]===t&&!a[1].schema.id)return{ref:c};let d=a[1].schema.id??`__schema${e.counter++}`;return{defId:d,ref:u+bc(d)}},i=a=>{if(a[1].schema.$ref)return;let l=a[1],{ref:c,defId:u}=o(a);l.def={...l.schema},u&&(l.defId=u);let d=l.schema;for(let p in d)delete d[p];d.$ref=c};if(e.cycles==="throw")for(let a of e.seen.entries()){let l=a[1];if(l.cycle)throw new Error(`Cycle detected: #/${l.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`)}for(let a of e.seen.entries()){let l=a[1];if(n===a[0]){i(a);continue}if(e.external){let u=e.external.registry.get(a[0])?.id;if(n!==a[0]&&u){i(a);continue}}if(e.metadataRegistry.get(a[0])?.id){i(a);continue}if(l.cycle){i(a);continue}l.count>1&&e.reused==="ref"&&i(a)}e.external&&(e.sharedDefsExtractedFor=e.external)}function wc(e){let n=e.anyOf;if(!Array.isArray(n)||n.length===0||e.type!==void 0)return;let t=[];for(let r of n){if(!r||typeof r!="object")return;wc(r);let o=Object.keys(r);if(o.length!==1||o[0]!=="type")return;let i=r.type;for(let a of Array.isArray(i)?i:[i]){if(typeof a!="string")return;t.includes(a)||t.push(a)}}delete e.anyOf,e.type=t.length===1?t[0]:t}var xc=new Set(["type","properties","required","additionalProperties"]),vc=["oneOf","anyOf"];function yc(e){let n=e.additionalProperties;return n===void 0||n===!1||typeof n!="object"||n===null?null:Object.keys(n).length?n:null}function yi(e){let n=[];for(let i of e){if(typeof i!="object"||i.type!=="object")return null;for(let a in i)if(!xc.has(a))return null;n.push(i)}let t={},r=new Set;for(let i of n){for(let a in i.properties){if(Object.prototype.hasOwnProperty.call(t,a))continue;let l=[];for(let u of n){let d=u.properties?.[a]??yc(u);d!=null&&(l.some(p=>JSON.stringify(p)===JSON.stringify(d))||l.push(d))}let c=l.length===1?l[0]:yi(l)??{allOf:l};cn(t,a,c)}for(let a of i.required??[])r.add(a)}let o={type:"object",properties:t};if(r.size&&(o.required=[...r]),n.every(i=>i.additionalProperties===!1))o.additionalProperties=!1;else{let i=[];for(let a of n){let l=yc(a);l&&!i.some(c=>JSON.stringify(c)===JSON.stringify(l))&&i.push(l)}i.length===1?o.additionalProperties=i[0]:i.length>1&&(o.additionalProperties={allOf:i})}return o}function wm(e){let n=e.allOf;if(!Array.isArray(n)||n.length<2)return;for(let o of xc)if(o in e)return;let t=n.filter(o=>vc.some(i=>Array.isArray(o[i]))),r=null;if(!t.length)r=yi(n);else{let o=t[0],i=vc.find(c=>Array.isArray(o[c]));if(Object.keys(o).length!==1)return;let a=n.filter(c=>c!==o),l=o[i].map(c=>yi([...a,c]));if(l.some(c=>!c))return;r={[i]:l}}r&&(delete e.allOf,or(e,r))}function ki(e,n){let t=e.seen.get(n);if(!t)throw new Error("Unprocessed schema. This is a bug in Zod.");let r=l=>{let c=e.seen.get(l);if(c.ref===null)return;let u=c.def??c.schema,d={...u},p=c.ref;if(c.ref=null,p){r(p);let m=e.seen.get(p),y=m.schema;if(y.$ref&&(e.target==="draft-07"||e.target==="draft-04"||e.target==="openapi-3.0")?(u.allOf=u.allOf??[],u.allOf.push(y)):or(u,y),or(u,d),l._zod.parent===p)for(let b in u)b==="$ref"||b==="allOf"||b in d||delete u[b];if(y.$ref&&m.def)for(let b in u)b==="$ref"||b==="allOf"||b in m.def&&JSON.stringify(u[b])===JSON.stringify(m.def[b])&&delete u[b]}let f=l._zod.parent;if(f&&f!==p){r(f);let m=e.seen.get(f);if(m?.schema.$ref&&(u.$ref=m.schema.$ref,m.def))for(let y in u)y==="$ref"||y==="allOf"||y in m.def&&JSON.stringify(u[y])===JSON.stringify(m.def[y])&&delete u[y]}e.override({zodSchema:l,jsonSchema:u,path:c.path??[]})};if(!e.external||e.sharedEmitDoneFor!==e.external){for(let l of[...e.seen.entries()].reverse())r(l[0]);if(e.target!=="openapi-3.0")for(let l of e.seen.entries())wc(l[1].def??l[1].schema);for(let l of e.deferred)l();if(e.intersections.length){let l=new Map;for(let c of e.seen.values())for(let u of[c.schema,c.def]){let d=u?.allOf;if(!Array.isArray(d))continue;let p=l.get(d);p?p.push(u):l.set(d,[u])}for(let c of e.intersections)for(let u of l.get(c)??[])wm(u)}}let o={};if(e.target==="draft-2020-12"?o.$schema="https://json-schema.org/draft/2020-12/schema":e.target==="draft-07"?o.$schema="http://json-schema.org/draft-07/schema#":e.target==="draft-04"?o.$schema="http://json-schema.org/draft-04/schema#":e.target,e.external?.uri){let l=e.external.registry.get(n)?.id;if(!l)throw new Error("Schema is missing an `id` property");o.$id=e.external.uri(l)}or(o,t.defId?t.schema:t.def??t.schema);let i=e.metadataRegistry.get(n)?.id;i!==void 0&&o.id===i&&delete o.id;let a=e.external?.defs??{};if(!e.external||e.sharedEmitDoneFor!==e.external)for(let l of e.seen.entries()){let c=l[1];c.def&&c.defId&&(c.def.id===c.defId&&delete c.def.id,cn(a,c.defId,c.def))}e.external&&(e.sharedEmitDoneFor=e.external),e.external||Object.keys(a).length>0&&(e.target==="draft-2020-12"?o.$defs=a:o.definitions=a);try{let l=JSON.parse(JSON.stringify(o));return Object.defineProperty(l,"~standard",{value:{...n["~standard"],jsonSchema:{input:ir(n,"input",e.processors),output:ir(n,"output",e.processors)}},enumerable:!1,writable:!1}),l}catch{throw new Error("Error converting schema to JSON.")}}function Xe(e,n){let t=n??{seen:new Set};if(t.seen.has(e))return!1;t.seen.add(e);let r=e._zod.def;if(r.type==="transform")return!0;if(r.type==="array")return Xe(r.element,t);if(r.type==="set")return Xe(r.valueType,t);if(r.type==="lazy")return Xe(r.getter(),t);if(r.type==="promise"||r.type==="optional"||r.type==="nonoptional"||r.type==="nullable"||r.type==="readonly"||r.type==="default"||r.type==="prefault"||r.type==="catch")return Xe(r.innerType,t);if(r.type==="intersection")return Xe(r.left,t)||Xe(r.right,t);if(r.type==="record"||r.type==="map")return Xe(r.keyType,t)||Xe(r.valueType,t);if(r.type==="pipe")return e._zod.traits.has("$ZodCodec")?!0:Xe(r.in,t)||Xe(r.out,t);if(r.type==="object"){for(let o in r.shape)if(Xe(r.shape[o],t))return!0;return!1}if(r.type==="union"){for(let o of r.options)if(Xe(o,t))return!0;return!1}if(r.type==="tuple"){for(let o of r.items)if(Xe(o,t))return!0;return!!(r.rest&&Xe(r.rest,t))}return!1}var kc=(e,n={})=>t=>{let r=wi({...t,processors:n});return Te(e,r),xi(r,e),ki(r,e)},ir=(e,n,t={})=>r=>{let{libraryOptions:o,target:i}=r??{},a=wi({...o??{},target:i,io:n,processors:t});return Te(e,a),xi(a,e),ki(a,e)};var Pt=(e,n,t)=>{(e[n]===void 0||t>e[n])&&(e[n]=t)},Nt=(e,n,t)=>{(e[n]===void 0||t<e[n])&&(e[n]=t)},_c=(e,n)=>{Pt(e,"minimum",n),Nt(e,"maximum",n)},Cc=(e,n)=>{e.multipleOf??(e.multipleOf=[]),e.multipleOf.includes(n)||e.multipleOf.push(n)},Pc=(e,n)=>{e.patterns??(e.patterns=new Set),e.patterns.add(n)},Nc=(e,n)=>{e.mime=e.mime?e.mime.filter(t=>n.includes(t)):[...n]},Ec=(e,n)=>{e.format=n,n.includes("int")&&(e.isInt=!0)},Ac=(e,n)=>Pt(e,"minimum",n.minimum),Sc=(e,n)=>Nt(e,"maximum",n.maximum),zc=e=>(n,t)=>{Ec(n,t.format);let[r,o]=e[t.format];Pt(n,"minimum",r),Nt(n,"maximum",o)},xm={greater_than:(e,n)=>Pt(e,n.inclusive?"minimum":"exclusiveMinimum",n.value),less_than:(e,n)=>Nt(e,n.inclusive?"maximum":"exclusiveMaximum",n.value),multiple_of:(e,n)=>Cc(e,n.value),number_format:zc(jt),bigint_format:zc(Nr),min_length:Ac,max_length:Sc,length_equals:(e,n)=>_c(e,n.length),min_size:Ac,max_size:Sc,size_equals:(e,n)=>_c(e,n.size),string_format:(e,n)=>{Ec(e,n.format),n.pattern&&Pc(e,n.pattern),(n.format==="base64"||n.format==="base64url")&&(e.contentEncoding=n.format),(n.local||n.precision===-1)&&(e.laxFormat=!0)},mime_type:(e,n)=>Nc(e,n.mime)};function gn(e){let n={},t=e._zod.def,r=e._zod.traits.has("$ZodCheck")?[e,...t.checks??[]]:t.checks??[];for(let i of r)xm[i._zod.def.check]?.(n,i._zod.def);let o=e._zod.bag;o.minimum!==void 0&&Pt(n,"minimum",o.minimum),o.exclusiveMinimum!==void 0&&Pt(n,"exclusiveMinimum",o.exclusiveMinimum),o.maximum!==void 0&&Nt(n,"maximum",o.maximum),o.exclusiveMaximum!==void 0&&Nt(n,"exclusiveMaximum",o.exclusiveMaximum),o.multipleOf!==void 0&&Cc(n,o.multipleOf),o.format!==void 0&&(n.format??(n.format=o.format),o.format.includes("int")&&(n.isInt=!0)),o.mime&&Nc(n,o.mime);for(let i of o.patterns??[])Pc(n,i);return n}var km={guid:"uuid",url:"uri",datetime:"date-time",json_string:"json-string",regex:""},_m=new Map([[ei,Ka],[Vr,ja]]),Ic=e=>_m.get(e)??e,Tc=(e,n,t,r)=>{let o=t;o.type="string";let{minimum:i,maximum:a,format:l,patterns:c,contentEncoding:u,laxFormat:d}=gn(e);if(typeof i=="number"&&(o.minLength=i),typeof a=="number"&&(o.maxLength=a),l&&(o.format=km[l]??l,o.format===""&&delete o.format,(l==="time"||d)&&delete o.format),u&&(o.contentEncoding=u),c&&c.size>0){let p=[...c].map(Ic);p.length===1?o.pattern=p[0].source:p.length>1&&(o.allOf=[...p.map(f=>({...n.target==="draft-07"||n.target==="draft-04"||n.target==="openapi-3.0"?{type:"string"}:{},pattern:f.source}))])}},$c=(e,n,t,r)=>{let o=t,{minimum:i,maximum:a,multipleOf:l,exclusiveMaximum:c,exclusiveMinimum:u,isInt:d}=gn(e);o.type=d?"integer":"number";let p=typeof u=="number"&&u>=(i??Number.NEGATIVE_INFINITY),f=typeof c=="number"&&c<=(a??Number.POSITIVE_INFINITY),m=n.target==="draft-04"||n.target==="openapi-3.0";if(p?m?(o.minimum=u,o.exclusiveMinimum=!0):o.exclusiveMinimum=u:typeof i=="number"&&(o.minimum=i),f?m?(o.maximum=c,o.exclusiveMaximum=!0):o.exclusiveMaximum=c:typeof a=="number"&&(o.maximum=a),l){let y=new Set;for(let x of l)Number.isFinite(x)&&x!==0?y.add(Math.abs(x)):Zn(e,n,o,r,`A multipleOf divisor of ${x} cannot be represented in JSON Schema`);let[v,...b]=y;v!==void 0&&(o.multipleOf=v),b.length&&(o.allOf=[...o.allOf??[],...b.map(x=>({multipleOf:x}))])}},Oc=(e,n,t,r)=>{t.type="boolean"};var Uc=(e,n,t,r)=>{n.target==="openapi-3.0"?(t.type="string",t.nullable=!0,t.enum=[null]):t.type="null"};var Rc=(e,n,t,r)=>{t.not={}};var Dc=(e,n,t,r)=>{};var Mc=(e,n,t,r)=>{let o=e._zod.def,i=xt(o.entries);if(i.length===0){t.not={};return}i.every(a=>typeof a=="number")&&(t.type="number"),i.every(a=>typeof a=="string")&&(t.type="string"),t.enum=i},Zc=(e,n,t,r)=>{let o=e._zod.def;if(o.values.length===0){t.not={};return}let i=[];for(let a of o.values)if(a===void 0){if(Zn(e,n,t,r,"Literal `undefined` cannot be represented in JSON Schema"))return}else if(typeof a=="bigint"){if(Zn(e,n,t,r,"BigInt literals cannot be represented in JSON Schema"))return;i.push(Number(a))}else i.push(a);if(i.length!==0)if(i.length===1){let a=i[0];t.type=a===null?"null":typeof a,n.target==="draft-04"||n.target==="openapi-3.0"?t.enum=[a]:t.const=a}else i.every(a=>typeof a=="number")&&(t.type="number"),i.every(a=>typeof a=="string")&&(t.type="string"),i.every(a=>typeof a=="boolean")&&(t.type="boolean"),i.every(a=>a===null)&&(t.type="null"),t.enum=i};var Bc=(e,n,t,r)=>{Zn(e,n,t,r,"Custom types cannot be represented in JSON Schema")};var Fc=(e,n,t,r)=>{Zn(e,n,t,r,"Transforms cannot be represented in JSON Schema")};var qc=(e,n,t,r)=>{let o=t,i=e._zod.def,{minimum:a,maximum:l}=gn(e);typeof a=="number"&&(o.minItems=a),typeof l=="number"&&(o.maxItems=l),o.type="array",o.items=Te(i.element,n,{...r,path:[...r.path,"items"]})};function eo(e){let n=e._zod.def;return n.type==="pipe"&&n.in._zod.traits.has("$ZodTransform")?eo(n.out):n.type==="catch"?eo(n.innerType):e._zod.optin}var Lc=(e,n,t,r)=>{let o=t,i=e._zod.def,a=i.shape;if(Object.getOwnPropertySymbols(a).length&&Zn(e,n,o,r,"Symbol keys cannot be represented in JSON Schema"))return;o.type="object",o.properties={};for(let u in a)cn(o.properties,u,Te(a[u],n,{...r,path:[...r.path,"properties",u]}));let c=[];for(let u of Object.keys(a)){let d=i.shape[u];(n.io==="input"?eo(d)===void 0:d._zod.optout===void 0)&&c.push(u)}c.length>0&&(o.required=c),i.catchall?._zod.def.type==="never"?o.additionalProperties=!1:i.catchall?i.catchall&&(o.additionalProperties=Te(i.catchall,n,{...r,path:[...r.path,"additionalProperties"]})):n.io==="output"&&(o.additionalProperties=!1)},Vc=(e,n,t,r)=>{let o=e._zod.def,i=o.inclusive===!1,a=o.options.map((l,c)=>Te(l,n,{...r,path:[...r.path,i?"oneOf":"anyOf",c]}));i?t.oneOf=a:t.anyOf=a},Hc=(e,n,t,r)=>{let o=e._zod.def,i=Te(o.left,n,{...r,path:[...r.path,"allOf",0]}),a=Te(o.right,n,{...r,path:[...r.path,"allOf",1]}),l=u=>"allOf"in u&&Object.keys(u).length===1,c=[...l(i)?i.allOf:[i],...l(a)?a.allOf:[a]];t.allOf=c,n.intersections.push(c)};function _i(e,n,t){if(n.$ref){if(t.has(n))return n;t.add(n);let y=e.get(n)?.def;if(!y)return n;let v=_i(e,y,t);return v===y?n:v}for(let y of["anyOf","oneOf"]){let v=n[y];if(!Array.isArray(v))continue;let b=v.map(x=>_i(e,x,t));b.some((x,z)=>x!==v[z])&&(n={...n,[y]:b})}let r=Array.isArray(n.type)?n.type:[n.type],o=!r.includes("string")&&r.some(y=>y==="number"||y==="integer"),i=n.enum??(n.const!==void 0?[n.const]:void 0);if(!o&&!i?.some(y=>typeof y=="number"))return n;let{minimum:a,maximum:l,exclusiveMinimum:c,exclusiveMaximum:u,multipleOf:d,format:p,id:f,...m}=n;return m.enum?m.enum=m.enum.map(y=>typeof y=="number"?String(y):y):typeof m.const=="number"&&(m.const=String(m.const)),o&&(m.type="string",i||(m.pattern=(r.includes("number")?Xt:Wo).source)),m}var Ai=new WeakMap;function Am(e){let n=new Map;for(let r of e.seen.values())r.def&&!n.has(r.schema)&&n.set(r.schema,r);let t=new Map;for(let r of Ai.get(e)??[]){let o=e.seen.get(r),i=(o?.def??o?.schema)?.propertyNames;if(!i||i===!0||t.has(i))continue;let a=_i(n,i,new Set);a!==i&&t.set(i,a)}if(t.size)for(let r of e.seen.values())for(let o of[r.schema,r.def]){let i=o&&t.get(o.propertyNames);i&&(o.propertyNames=i)}}var Kc=(e,n,t,r)=>{let o=t,i=e._zod.def;o.type="object";let a=i.keyType,l=gn(a).patterns;if(i.mode==="loose"&&l&&l.size>0){let d=Te(i.valueType,n,{...r,path:[...r.path,"patternProperties","*"]});o.patternProperties={};for(let p of l)cn(o.patternProperties,Ic(p).source,d)}else{if(n.target==="draft-07"||n.target==="draft-2020-12"){o.propertyNames=Te(i.keyType,n,{...r,path:[...r.path,"propertyNames"]});let d=Ai.get(n);d||(d=[],Ai.set(n,d),n.deferred.push(()=>Am(n))),d.push(e)}o.additionalProperties=Te(i.valueType,n,{...r,path:[...r.path,"additionalProperties"]})}let c=a._zod.values,u=n.io==="input"&&eo(i.valueType)!==void 0;if(c&&!i.partial&&!u){let d=[...c].filter(p=>typeof p=="string"||typeof p=="number");d.length>0&&(o.required=d.map(String))}},jc=(e,n,t,r)=>{let o=e._zod.def,i=Te(o.innerType,n,r),a=n.seen.get(e);n.target==="openapi-3.0"?(a.ref=o.innerType,t.nullable=!0):t.anyOf=[i,{type:"null"}]},Wc=(e,n,t,r)=>{let o=e._zod.def;Te(o.innerType,n,r);let i=n.seen.get(e);i.ref=o.innerType},Si=Symbol();function Jc(e,n,t,r,o){let i=!1,a=JSON.stringify(e,(l,c)=>typeof c!="bigint"?c:(i=!0,null));return i?(Zn(n,t,r,o,"BigInt defaults cannot be represented in JSON Schema"),Si):JSON.parse(a)}var Gc=(e,n,t,r)=>{let o=e._zod.def;Te(o.innerType,n,r);let i=n.seen.get(e);i.ref=o.innerType;let a=Jc(o.defaultValue,e,n,t,r);a!==Si&&(t.default=a)},Xc=(e,n,t,r)=>{let o=e._zod.def;Te(o.innerType,n,r);let i=n.seen.get(e);if(i.ref=o.innerType,n.io!=="input")return;let a=Jc(o.defaultValue,e,n,t,r);a!==Si&&(t._prefault=a)},Yc=(e,n,t,r)=>{let o=e._zod.def;Te(o.innerType,n,r);let i=n.seen.get(e);i.ref=o.innerType;let a;try{a=o.catchValue(void 0)}catch{Zn(e,n,t,r,"Dynamic catch values are not supported in JSON Schema");return}t.default=a},Qc=(e,n,t,r)=>{let o=e._zod.def,i=o.in._zod.traits.has("$ZodTransform"),a=n.io==="input"?i?o.out:o.in:o.out;Te(a,n,r);let l=n.seen.get(e);l.ref=a},eu=(e,n,t,r)=>{let o=e._zod.def;Te(o.innerType,n,r);let i=n.seen.get(e);i.ref=o.innerType,t.readOnly=!0};var zi=(e,n,t,r)=>{let o=e._zod.def;Te(o.innerType,n,r);let i=n.seen.get(e);i.ref=o.innerType},nu=(e,n,t,r)=>{let o=e._zod.innerType;Te(o,n,r);let i=n.seen.get(e);i.ref=o};var tu=new WeakSet([Object.prototype,Error.prototype]);function no(e,n,t){Object.defineProperty(e,n,{configurable:!0,enumerable:!1,get(){let r=t(this);return Object.defineProperty(this,n,{value:r,configurable:!0,writable:!0}),r},set(r){Object.defineProperty(this,n,{value:r,configurable:!0,writable:!0})}})}var Tm=(e,n)=>{ya.init(e,n),e.name="ZodError";let t=Object.getPrototypeOf(e);tu.has(t)||(tu.add(t),no(t,"format",r=>o=>xa(r,o)),no(t,"flatten",r=>o=>wa(r,o)),no(t,"addIssue",r=>o=>{r.issues.push(o),r.message=JSON.stringify(r.issues,kt,2)}),no(t,"addIssues",r=>o=>{r.issues.push(...o),r.message=JSON.stringify(r.issues,kt,2)}),Object.defineProperty(t,"isEmpty",{configurable:!0,enumerable:!1,get(){return this.issues.length===0}}))};var dn=U("ZodError",Tm,void 0,{Parent:Error});var ru=Or(dn),ou=Ur(dn),iu=Rr(dn),au=Dr(dn),su=_a(dn),lu=Aa(dn),cu=Sa(dn),uu=za(dn),du=Ca(dn),pu=Pa(dn),mu=Na(dn),fu=Ea(dn);function Om(){rn.localeError||un(Tl())}function ro(){rn.memoizer||un({memoizer:Il()})}var Ce=U("ZodType",(e,n)=>(Om(),Ae.init(e,n),e.def=n,e.type=n.type,e),{check(...e){let n=this.def;return this.clone(ae.mergeDefs(n,{checks:[...n.checks??[],...e.map(t=>typeof t=="function"?{_zod:{check:t,def:{check:"custom"},onattach:[]}}:t)]}),{parent:!0})},with(...e){return this.check(...e)},clone(e,n){return kn(this,e,n)},brand(){return this},register(e,n){return e.add(this,n),this},refine(e,n){return this.check($f(e,n))},superRefine(e,n){return this.check(Of(e,n))},overwrite(e){return this.check(Xn(e))},optional(){return vu(this)},exactOptional(){return vf(this)},nullable(){return yu(this)},nullish(){return vu(yu(this))},nonoptional(e){return Af(this,e)},array(){return Se(this)},or(e){return Et([this,e])},and(e){return ff(this,e)},transform(e){return wu(this,bf(e))},default(e){return xf(this,e)},prefault(e){return _f(this,e)},catch(e){return zf(this,e)},pipe(e){return wu(this,e)},readonly(){return Nf(this)},describe(e){let n=this.clone();return dt.add(n,{description:e}),n},meta(...e){if(e.length===0)return dt.get(this);let n=this.clone();return dt.add(n,e[0]),n},isOptional(){return this.safeParse(void 0).success},isNullable(){return this.safeParse(null).success},apply(e,...n){return n.length===0?e(this):e(this,...n)},get"~standard"(){return ae.hide(this,"~standard",{...Qo(this),jsonSchema:{input:ir(this,"input"),output:ir(this,"output")}})},set"~standard"(e){ae.own(this,"~standard",e)},parse:function e(n,t){return ru(this,n,t,{callee:e})},parseAsync:async function e(n,t){return await ou(this,n,t,{callee:e})},safeParse(e,n){return iu(this,e,n)},async safeParseAsync(e,n){return au(this,e,n)},get spa(){return this?.safeParseAsync},set spa(e){ae.own(this,"spa",e)},validate(e,n){return Vo(this,e,n)},validateAsync(e,n){return Ho(this,e,n)},encode:function e(n,t){return su(this,n,t,{callee:e})},decode:function e(n,t){return lu(this,n,t,{callee:e})},encodeAsync:async function e(n,t){return await cu(this,n,t,{callee:e})},decodeAsync:async function e(n,t){return await uu(this,n,t,{callee:e})},safeEncode(e,n){return du(this,e,n)},safeDecode(e,n){return pu(this,e,n)},async safeEncodeAsync(e,n){return mu(this,e,n)},async safeDecodeAsync(e,n){return fu(this,e,n)},toJSONSchema(e){return kc(this,{})(e)},get description(){return dt.get(this)?.description},get _def(){return this._zod.def}}),xu=U("_ZodString",(e,n)=>{Lr.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Tc(e,t,r,o)},ae.derived({format:e=>gn(e).format??null,minLength:e=>gn(e).minimum??null,maxLength:e=>gn(e).maximum??null},{regex(...e){return this.check(li(...e))},includes(...e){return this.check(di(...e))},startsWith(...e){return this.check(pi(...e))},endsWith(...e){return this.check(mi(...e))},min(...e){return this.check(Ct(...e))},max(...e){return this.check(Yr(...e))},length(...e){return this.check(Qr(...e))},nonempty(...e){return this.check(Ct(1,...e))},lowercase(e){return this.check(ci(e))},uppercase(e){return this.check(ui(e))},trim(){return this.check(hi())},normalize(...e){return this.check(fi(...e))},toLowerCase(){return this.check(gi())},toUpperCase(){return this.check(bi())},slugify(){return this.check(vi())}})),Um=U("ZodString",(e,n)=>{Lr.init(e,n),xu.init(e,n)},{email(e){return this.check(Rl(Bm,e))},url(e){return this.check(ql(qm,e))},jwt(e){return this.check(rc(rf,e))},emoji(e){return this.check(Ll(Lm,e))},guid(e){return this.check(Dl(Fm,e))},uuid(e){return this.check(Ml(to,e))},uuidv4(e){return this.check(Zl(to,e))},uuidv6(e){return this.check(Bl(to,e))},uuidv7(e){return this.check(Fl(to,e))},nanoid(e){return this.check(Vl(Vm,e))},cuid(e){return this.check(Hl(Hm,e))},cuid2(e){return this.check(Kl(Km,e))},ulid(e){return this.check(jl(jm,e))},base64(e){return this.check(ec(ef,e))},base64url(e){return this.check(nc(nf,e))},xid(e){return this.check(Wl(Wm,e))},ksuid(e){return this.check(Jl(Jm,e))},ipv4(e){return this.check(Gl(Gm,e))},ipv6(e){return this.check(Xl(Xm,e))},cidrv4(e){return this.check(Yl(Ym,e))},cidrv6(e){return this.check(Ql(Qm,e))},e164(e){return this.check(tc(tf,e))},datetime(e){return this.check(oc(Rm,e))},date(e){return this.check(ic(Dm,e))},time(e){return this.check(ac(Mm,e))},duration(e){return this.check(sc(Zm,e))}});function ne(e){return Ul(Um,e)}var Ne=U("ZodStringFormat",(e,n)=>{ze.init(e,n),xu.init(e,n)}),Rm=U("ZodISODateTime",(e,n)=>{Ls.init(e,n),Ne.init(e,n)}),Dm=U("ZodISODate",(e,n)=>{Vs.init(e,n),Ne.init(e,n)}),Mm=U("ZodISOTime",(e,n)=>{Hs.init(e,n),Ne.init(e,n)}),Zm=U("ZodISODuration",(e,n)=>{Ks.init(e,n),Ne.init(e,n)}),Bm=U("ZodEmail",(e,n)=>{Ts.init(e,n),Ne.init(e,n)});var Fm=U("ZodGUID",(e,n)=>{Es.init(e,n),Ne.init(e,n)});var to=U("ZodUUID",(e,n)=>{Is.init(e,n),Ne.init(e,n)});var qm=U("ZodURL",(e,n)=>{Us.init(e,n),Ne.init(e,n)});var Lm=U("ZodEmoji",(e,n)=>{Rs.init(e,n),Ne.init(e,n)});var Vm=U("ZodNanoID",(e,n)=>{Ds.init(e,n),Ne.init(e,n)});var Hm=U("ZodCUID",(e,n)=>{Ms.init(e,n),Ne.init(e,n)});var Km=U("ZodCUID2",(e,n)=>{Zs.init(e,n),Ne.init(e,n)});var jm=U("ZodULID",(e,n)=>{Bs.init(e,n),Ne.init(e,n)});var Wm=U("ZodXID",(e,n)=>{Fs.init(e,n),Ne.init(e,n)});var Jm=U("ZodKSUID",(e,n)=>{qs.init(e,n),Ne.init(e,n)});var Gm=U("ZodIPv4",(e,n)=>{js.init(e,n),Ne.init(e,n)});var Xm=U("ZodIPv6",(e,n)=>{Js.init(e,n),Ne.init(e,n)});var Ym=U("ZodCIDRv4",(e,n)=>{Gs.init(e,n),Ne.init(e,n)});var Qm=U("ZodCIDRv6",(e,n)=>{Xs.init(e,n),Ne.init(e,n)});var ef=U("ZodBase64",(e,n)=>{Qs.init(e,n),Ne.init(e,n)});var nf=U("ZodBase64URL",(e,n)=>{el.init(e,n),Ne.init(e,n)});var tf=U("ZodE164",(e,n)=>{nl.init(e,n),Ne.init(e,n)});var rf=U("ZodJWT",(e,n)=>{tl.init(e,n),Ne.init(e,n)});var ku=U("ZodNumber",(e,n)=>{ni.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,r,o)=>$c(e,t,r,o),e.isFinite=!0},ae.derived({minValue:e=>{let{minimum:n,exclusiveMinimum:t}=gn(e);return Math.max(n??Number.NEGATIVE_INFINITY,t??Number.NEGATIVE_INFINITY)},maxValue:e=>{let{maximum:n,exclusiveMaximum:t}=gn(e);return Math.min(n??Number.POSITIVE_INFINITY,t??Number.POSITIVE_INFINITY)},isInt:e=>{let{isInt:n,multipleOf:t}=gn(e);return!!n||!!t?.some(Number.isSafeInteger)},format:e=>gn(e).format??null},{gt(e,n){return this.check(Gr(e,n))},gte(e,n){return this.check(rr(e,n))},min(e,n){return this.check(rr(e,n))},lt(e,n){return this.check(Jr(e,n))},lte(e,n){return this.check(tr(e,n))},max(e,n){return this.check(tr(e,n))},int(e){return this.check(hu(e))},safe(e){return this.check(hu(e))},positive(e){return this.check(Gr(0,e))},nonnegative(e){return this.check(rr(0,e))},negative(e){return this.check(Jr(0,e))},nonpositive(e){return this.check(tr(0,e))},multipleOf(e,n){return this.check(Xr(e,n))},step(e,n){return this.check(Xr(e,n))},finite(){return this}}));function on(e){return lc(ku,e)}var of=U("ZodNumberFormat",(e,n)=>{rl.init(e,n),ku.init(e,n)});function hu(e){return cc(of,e)}var af=U("ZodBoolean",(e,n)=>{ol.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Oc(e,t,r,o)});function ve(e){return uc(af,e)}var sf=U("ZodNull",(e,n)=>{il.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Uc(e,t,r,o)});function ar(e){return dc(sf,e)}var lf=U("ZodUnknown",(e,n)=>{al.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Dc(e,t,r,o)});function gu(){return pc(lf)}var cf=U("ZodNever",(e,n)=>{sl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Rc(e,t,r,o)});function _u(e){return mc(cf,e)}var uf=U("ZodArray",(e,n)=>{ro(),ll.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,r,o)=>qc(e,t,r,o),e.element=n.element},{min(e,n){return this.check(Ct(e,n))},nonempty(e){return this.check(Ct(1,e))},max(e,n){return this.check(Yr(e,n))},length(e,n){return this.check(Qr(e,n))},unwrap(){return this.element}});function Se(e,n){return fc(uf,e,n)}var df=U("ZodObject",(e,n)=>{ro(),dl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Lc(e,t,r,o),ae.installLazyProp(e,"shape",t=>t._zod.def.shape,!1)},{keyof(){return le(Object.keys(this._zod.def.shape))},catchall(e){return this.clone(ae.mergeDefs(this._zod.def,{catchall:e}))},passthrough(){return this.clone(ae.mergeDefs(this._zod.def,{catchall:gu()}))},loose(){return this.clone(ae.mergeDefs(this._zod.def,{catchall:gu()}))},strict(){return this.clone(ae.mergeDefs(this._zod.def,{catchall:_u()}))},strip(){return this.clone(ae.mergeDefs(this._zod.def,{catchall:void 0}))},extend(e){return ae.extend(this,e)},safeExtend(e){return ae.safeExtend(this,e)},merge(e){return ae.merge(this,e)},pick(e){return ae.pick(this,e)},omit(e){return ae.omit(this,e)},partial(...e){return ae.partial(Su,this,e[0])},exactPartial(...e){return ae.partial(zu,this,e[0],"exactPartial")},required(...e){return ae.required(Cu,this,e[0])}});function X(e,n){return new df({type:"object",shape:e,catchall:_u(),...ae.normalizeParams(n)})}var Au=U("ZodUnion",(e,n)=>{ti.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Vc(e,t,r,o),e.options=n.options});function Et(e,n){return new Au({type:"union",options:e,...ae.normalizeParams(n)})}var pf=U("ZodDiscriminatedUnion",(e,n)=>{Au.init(e,n),pl.init(e,n)});function sr(e,n,t){return new pf({type:"union",options:n,discriminator:e,...ae.normalizeParams(t)})}var mf=U("ZodIntersection",(e,n)=>{ml.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Hc(e,t,r,o)});function ff(e,n){return new mf({type:"intersection",left:e,right:n})}var bu=U("ZodRecord",(e,n)=>{ro(),fl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Kc(e,t,r,o),e.keyType=n.keyType,e.valueType=n.valueType});function Ni(e,n,t){return!n||!n._zod?new bu({type:"record",keyType:ne(),valueType:e,...ae.normalizeParams(n)}):new bu({type:"record",keyType:e,valueType:n,...ae.normalizeParams(t)})}var Pi=U("ZodEnum",(e,n)=>{hl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(r,o,i)=>Mc(e,r,o,i),e.enum=n.entries,e.options=[...e._zod.values];let t=new Set(Object.keys(n.entries));e.extract=(r,o)=>{let i={};for(let a of r)if(t.has(a))i[a]=n.entries[a];else throw new Error(`Key ${a} not found in enum`);return new Pi({...n,checks:[],...ae.normalizeParams(o),entries:i})},e.exclude=(r,o)=>{let i={...n.entries};for(let a of r)if(t.has(a))delete i[a];else throw new Error(`Key ${a} not found in enum`);return new Pi({...n,checks:[],...ae.normalizeParams(o),entries:i})}});function le(e,n){let t=Array.isArray(e)?Object.fromEntries(e.map(r=>[r,r])):e;return new Pi({type:"enum",entries:t,...ae.normalizeParams(n)})}var hf=U("ZodLiteral",(e,n)=>{gl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Zc(e,t,r,o),e.values=new Set(n.values),Object.defineProperty(e,"value",{get(){if(n.values.length>1)throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");return n.values[0]}})});function ye(e,n){return new hf({type:"literal",values:Array.isArray(e)?e:[e],...ae.normalizeParams(n)})}var gf=U("ZodTransform",(e,n)=>{ro(),bl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Fc(e,t,r,o),e._zod.parse=(t,r)=>{if(r.direction==="backward")throw new zt(e.constructor.name);t.addIssue=i=>{if(typeof i=="string")t.issues.push(ae.issue(i,t.value,n));else{let a=i;a.fatal&&(a.continue=!1),a.code??(a.code="custom"),"input"in a||(a.input=t.value),a.inst??(a.inst=e),t.issues.push(ae.issue(a))}};let o=n.transform(t.value,t);return o instanceof Promise?o.then(i=>(t.value=i,t)):(t.value=o,t)}});function bf(e){return new gf({type:"transform",transform:e})}var Su=U("ZodOptional",(e,n)=>{ri.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,r,o)=>zi(e,t,r,o),e.unwrap=()=>e._zod.def.innerType});function vu(e){return new Su({type:"optional",innerType:e})}var zu=U("ZodExactOptional",(e,n)=>{vl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,r,o)=>zi(e,t,r,o),e.unwrap=()=>e._zod.def.innerType});function vf(e){return new zu({type:"optional",innerType:e})}var yf=U("ZodNullable",(e,n)=>{yl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,r,o)=>jc(e,t,r,o),e.unwrap=()=>e._zod.def.innerType});function yu(e){return new yf({type:"nullable",innerType:e})}var wf=U("ZodDefault",(e,n)=>{wl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Gc(e,t,r,o),e.unwrap=()=>e._zod.def.innerType,e.removeDefault=e.unwrap});function xf(e,n){return new wf({type:"default",innerType:e,get defaultValue(){return typeof n=="function"?n():ae.shallowClone(n)}})}var kf=U("ZodPrefault",(e,n)=>{xl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Xc(e,t,r,o),e.unwrap=()=>e._zod.def.innerType});function _f(e,n){return new kf({type:"prefault",innerType:e,get defaultValue(){return typeof n=="function"?n():ae.shallowClone(n)}})}var Cu=U("ZodNonOptional",(e,n)=>{kl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Wc(e,t,r,o),e.unwrap=()=>e._zod.def.innerType});function Af(e,n){return new Cu({type:"nonoptional",innerType:e,...ae.normalizeParams(n)})}var Sf=U("ZodCatch",(e,n)=>{_l.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Yc(e,t,r,o),e.unwrap=()=>e._zod.def.innerType,e.removeCatch=e.unwrap});function zf(e,n){return new Sf({type:"catch",innerType:e,catchValue:typeof n=="function"?n:ae.constantCatch(n)})}var Cf=U("ZodPipe",(e,n)=>{Al.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Qc(e,t,r,o),e.in=n.in,e.out=n.out});function wu(e,n){return new Cf({type:"pipe",in:e,out:n})}var Pf=U("ZodReadonly",(e,n)=>{Sl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,r,o)=>eu(e,t,r,o),e.unwrap=()=>e._zod.def.innerType});function Nf(e){return new Pf({type:"readonly",innerType:e})}var Ef=U("ZodLazy",(e,n)=>{zl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,r,o)=>nu(e,t,r,o),e.unwrap=()=>e._zod.def.getter()});function If(e){return new Ef({type:"lazy",getter:e})}var Tf=U("ZodCustom",(e,n)=>{Cl.init(e,n),Ce.init(e,n),e._zod.processJSONSchema=(t,r,o)=>Bc(e,t,r,o)});function $f(e,n={}){return hc(Tf,e,n)}function Of(e,n){return gc(e,n)}function Pu(e){let n=If(()=>Et([ne(e),on(),ve(),ar(),Se(n),Ni(ne(),n)]));return n}var oo=Object.freeze(["panel-open","panel-close","panel-move","page-home","page-settings","page-settings-tab","page-model-tab","page-setup","page-authorization","page-repair","page-session-management","open-native-session","open-feedback","change-listen-mode","change-audio-device","edit-choice","commit-form","activate-control","dismiss","details-toggle","keyboard-navigation","ui-connect","ui-reconnect","ui-status-refresh","ui-request","ui-stream","ui-render-error","ui-action-error","ui-read-recovery","manage-session","start-voice","stop-voice","ui-buffer-overflow","session-history-open","session-history-close","subagent-history-open","subagent-history-close","show-subagents","show-main-sessions","open-native-subagent","new-voice-session","bind-current-session","retry-voice-transcript","bind-existing-session","unbind-existing-session","listen-mode-ptt","listen-mode-always","listen-mode-wake","settings-audio","settings-interaction","settings-prompt","settings-models","settings-advanced","settings-pets"]),Nu=64*1024,lr=64,Eu=10080*60*1e3;var Ei="whaleConversation",we=(e,n)=>({mode:"strict",typeSymbol:`dsh-fish-voice/conversation#${e}`,create:n}),so=we("sessionId",()=>ne().min(1).max(256)),Uf=we("settingsSessionId",()=>so.create().nullable()),Mu=new Set(["status","read-settings","listen-mode","complete-setup","set-visibility","inspect-tts","save-tts","preview-tts","cancel-tts","save-models","model-installer","inspect-model-compute","plan-model-install","start-model-install","control-model-install","apply-model-install","pick-local-path","enable","disable","new","resume","read-history","read-audio-devices","save-audio-device","save-settings","capture-bindings","save-bindings","save-voice-prompt","conversation-models","save-conversation-model","inspect-performance","set-performance-mode","read-output-volume","set-output-volume"]),Rf=we("volumeRequest",()=>X({revision:on().int().nonnegative(),volume:on().min(0).max(1)})),Iu=X({id:ne(),role:le(["user","assistant"]),text:ne().max(8e3),state:le(["reply","interrupted","delivered","speech-requested","speech-failed"]),at:on()}),Df=X({state:le(["disabled","starting","waiting","listening","paused","error"]),deadlineAt:on().nonnegative().nullable(),streamOpen:ve(),detection:le(["asr-after-utterance","acoustic-after-utterance"])}),Ti=ne().uuid(),Mf=X({id:Ti,text:ne().max(8e3),sessionId:so.create(),title:ne().max(256).nullable(),state:le(["sending","queued","busy","ready","delivered","uncertain","failed","discarded"])}),Zf=X({sessionId:so.create(),items:Se(X({id:Ti,text:ne().max(8e3),title:ne().max(256).nullable().optional(),state:le(["busy","ready","sending","uncertain"])})).max(8)}),Bf=we("snapshot",()=>X({revision:on().int().nonnegative(),historyGeneration:on().int().nonnegative().optional(),rootSessionId:ne().nullable(),title:ar(),latest:Iu.nullable(),items:Se(Iu).max(40),inputActive:ve(),inputError:le(["device","recognition","no-speech"]).nullable().optional(),providerError:ne().max(480).optional(),inputDelivery:Mf.optional(),retryTranscripts:Zf.nullable().optional(),playbackConfirmed:ye(!1),wake:Df.optional(),helper:X({online:ve(),listenMode:le(["ptt","always","wake"]).nullable()}).refine(e=>e.online||e.listenMode===null).optional()})),Ff=we("volume",()=>X({supported:ve(),backend:ye("dsh-speak").nullable(),volume:on().min(0).max(1).nullable(),revision:on().int().nullable(),apply:ye("next-output").nullable(),reason:ne().nullable()})),Q=ne().max(4096),Fe=on().int().nonnegative().max(Number.MAX_SAFE_INTEGER),qf=X({code:ne().max(64),message:ne().max(512)}),Tu=X({available:ve(),reason:Q.nullable(),runtimeLoaded:ye(!1),backend:Q.optional(),provider:Q.optional(),device:Q.optional(),computeType:Q.optional(),supportedComputeTypes:Se(Q).max(32).optional(),deviceCount:Fe.optional(),deviceIndex:Fe.optional(),validation:Q.optional(),note:Q.optional(),providerAdvertised:ve().optional()}),Lf=X({schema:ye(1),default:ye("cpu"),observedAt:Q.nullable(),reason:Q.optional(),backends:X({sensevoice:X({cpu:Tu,cuda:Tu}).optional()})}),Vf=X({observedAt:Q,scope:ye("plugin-host"),platform:Q,arch:Q,cpuLogicalCores:Fe.nullable(),totalMemoryBytes:Fe.nullable(),availableMemoryBytes:Fe.nullable(),gpuMemoryBytes:Fe.nullable(),gpuMemoryReason:Q,gpuSource:ye("dxgi").nullable().optional(),gpuAdapters:Se(X({name:ne().min(1).max(256),dedicatedVideoMemoryBytes:Fe,sharedSystemMemoryBytes:Fe})).max(32).optional()}),Hf=X({modelId:Q,confidence:le(["not-assessed","unknown","heuristic-only"]),recommended:ve(),badge:Q.nullable(),state:le(["manual-choice","unknown","recommended-pending-runtime-validation","limited-memory","busy-memory","recommended-lightweight"]),reason:Q,policy:Q.optional(),runtimeValidated:ye(!1).optional(),gpuValidated:ye(!1).optional()}),Kf=X({release:Q,source:Q,sources:Se(Q).max(16).optional(),redirectHost:Q,platform:Q,arch:Q,executable:Q,licenseUrls:Se(Q).max(20)}),jf=X({jobId:Q,modelId:Q,status:le(["waiting","verifying","applied","blocked","paused","cancelled"]),reason:Q.nullable()}),Wf=X({id:Q,runtime:Kf.nullable().optional(),purpose:le(["tts","asr"]).optional(),computeOptions:Se(le(["cpu","auto","cuda","vulkan"])).max(4).optional(),recommendation:Hf,title:Q,backend:Q.nullable(),available:ve(),reason:Q.nullable(),totalBytes:Fe.nullable(),source:Q.nullable(),licenseUrls:Se(Q).max(20),licenseNote:Q.nullable(),verification:Q.optional(),runtimeLoaded:ye(!1)}),Jf=X({id:ne().uuid(),modelId:Q,compute:le(["cpu","auto","cuda","vulkan"]),status:le(["queued","running","paused","failed","cancelled","installed"]),stage:le(["queued","running","paused","failed","cancelled","installed","checking-runtime","verifying-local","downloading","verifying","installing"]),createdAt:Q,updatedAt:Q,totalBytes:Fe,receivedBytes:Fe,runtimeLoaded:ye(!1),error:qf.nullable(),currentFile:Q.nullable().optional(),files:Se(X({name:Q,bytes:Fe,receivedBytes:Fe,verified:ve(),reused:ve().optional()})).max(200),installedPath:Q.optional(),sourceDirectory:Q.optional(),modelVariant:le(["q4_k_m","q8_0"]).optional(),reused:ye(!0).optional(),reusedBytes:Fe.optional(),purpose:le(["tts","asr"]).optional(),recommendedSettings:Et([X({tts:X({provider:ye("local"),localModelId:Q,localModelPath:Q})}),X({asr:ye("sensevoice"),models:X({sensevoiceDir:Q.optional()}),modelCompute:le(["cpu","auto","cuda"])})]).optional()}),Gf=we("modelSnapshot",()=>X({schema:ye(1),hardware:Vf,compute:Lf,refresh:X({pending:ve(),observedAt:ne().max(64).nullable(),attemptedAt:ne().max(64).nullable(),error:ne().max(512).nullable(),intervalMs:ye(3e5)}).optional(),models:Se(Wf).max(32),jobs:Se(Jf).max(1e3),ttsInstallIntent:jf.nullable().optional()})),Xf=we("authorizationRequest",()=>X({revision:ne().min(1).max(256),grant:ve()})),Yf=we("senseVoiceAsrRequest",()=>sr("operation",[X({operation:ye("status")}),X({operation:ye("retry")})])),Qf={state:le(["idle","downloading","ready","error"]),receivedBytes:Fe,totalBytes:Fe},eh=we("senseVoiceAsrResult",()=>X({...Qf,selected:ve(),message:ne().max(512).nullable()})),$u=we("authorization",()=>X({schema:ye(1),revision:ne().min(1).max(256),completed:ve(),granted:ve(),usageAgreement:X({version:ye(1),accepted:ve(),text:Se(Q).max(16)}).optional(),modelSourcesChanged:ve().optional(),blockedOperations:Se(Q).max(32),revocationUnconfirmed:ve(),scopes:Se(X({id:Q,title:Q,description:Q,allowed:ve()})).max(16),modelSources:Se(X({modelId:Q,source:Q,licenseUrls:Se(Q).max(20),licenseNote:Q,runtime:X({source:Q,sources:Se(Q).max(16).optional(),licenseUrls:Se(Q).max(20),redirectHost:Q.nullable()}).optional()})).max(32),restrictions:Se(Q).max(16)})),nh=we("setup",()=>X({version:ye(1),completed:ve()})),an=ne().min(1).max(256),Ue=ne().min(1).max(256),Ou=le(["cpu","auto","cuda","vulkan"]),Uu={sourceDirectory:ne().min(1).max(4096).optional(),modelVariant:le(["q4_k_m","q8_0"]).optional()},io=Ni(ne(),Pu()),th=X({provider:le(["deepseek","local"]),deepseekVoice:le(["stella","tide"]),deepseekTextTransmissionAccepted:ve(),volume:on().min(0).max(1),localModelId:ne().max(128).nullable(),localModelPath:ne().max(4096).nullable(),referenceAudioPath:ne().max(4096).nullable(),referenceAudioAccepted:ve()}),rh=X({backend:le(["winmm","portaudio"]),id:ne().min(1).max(1024),name:ne().min(1).max(256)}).nullable(),oh={"read-history":{cursor:ne().max(128).optional()},"read-audio-devices":{},"save-audio-device":{revision:an,direction:le(["input","output"]),selection:rh},"agent-permissions":{},"save-agent-permissions":{revision:an,allowed:X({"set-performance-mode":ve(),"set-visibility":ve(),"set-output-volume":ve()})},"agent-requests":{},"decide-agent-request":{id:Ue,approve:ve(),acknowledgements:Se(ne().max(80)).max(10)},"model-installer":{},"inspect-model-compute":{},"plan-model-install":{modelId:Ue,compute:Ou,...Uu},"start-model-install":{modelId:Ue,compute:Ou,...Uu,planHash:an,accepted:ye(!0),useWhenReady:ve().optional()},"control-model-install":{id:Ue,operation:le(["pause","resume","cancel"])},"apply-model-install":{id:Ue,revision:an},status:{},enable:{expectedOwnerSessionId:Ue.nullable().optional(),expectedExistingSessionId:Ue.nullable().optional()},disable:{},"read-settings":{},new:{expectedOwnerSessionId:Ue.nullable().optional()},"inspect-performance":{},"set-performance-mode":{revision:an,performanceMode:le(["fast","balanced","high","compatibility"])},"inspect-tts":{},"save-tts":{revision:an,values:io},"complete-setup":{revision:an},"preview-tts":{revision:an.optional(),values:th.optional()},"cancel-tts":{},list:{cursor:ne().max(2048).optional()},resume:{id:Ue},"listen-mode":{mode:le(["ptt","always","wake"])},"set-visibility":{revision:an,visibility:le(["hidden","workspace"])},"pick-local-path":{kind:le(["referenceAudio","sensevoiceDir","campplus","sourceDirectory"])},"capture-bindings":{operation:le(["begin","end"]),token:Ue.optional(),inactive:ve().optional()},"save-bindings":{revision:an,values:io,bindingContext:X({ownerSessionId:Ue.nullable(),epoch:Ue.nullable(),rootSessionId:Ue.nullable()})},"save-voice-prompt":{revision:an,values:X({text:ne().max(32768)})},"conversation-models":{},"save-conversation-model":{revision:an,values:X({mode:le(["auto","manual"]),provider:ne().min(1).max(256).nullable(),model:ne().min(1).max(256).nullable()})},"save-settings":{revision:an,values:io},"save-models":{revision:an,values:io}},ih=we("uiActionRequest",()=>sr("action",Object.entries(oh).map(([e,n])=>X({action:ye(e),...n}))).refine(e=>e.action!=="preview-tts"||Object.hasOwn(e,"revision")===Object.hasOwn(e,"values"),"\u8349\u7A3F\u8BD5\u542C\u5FC5\u987B\u540C\u65F6\u63D0\u4F9B\u914D\u7F6E\u7248\u672C\u548C\u8BBE\u7F6E").refine(e=>JSON.stringify(e).length<=(e.action==="save-voice-prompt"?2e5:8192),"\u64CD\u4F5C\u6570\u636E\u8FC7\u957F")),Ru=we("uiActionResult",()=>ne().max(4*1024*1024)),ah=we("sessionManagementRequest",()=>sr("operation",[X({operation:ye("list"),rootId:Ue.optional(),cursor:ne().max(2048).optional()}),X({operation:ye("unhide"),rootId:Ue,id:Ue}),X({operation:ye("restore"),rootId:Ue,id:Ue})])),sh=we("presentation",()=>X({shown:Se(Et([X({id:Ue,parentId:ar(),mode:ar()}),X({id:Ue,parentId:Ue,mode:le(["one-shot","continuable","unknown"])})]))})),Ii=ne().min(1).max(128),lh=we("updateRequest",()=>sr("action",[X({action:ye("check")}),X({action:ye("install"),version:Ii})])),Du=we("updateSnapshot",()=>X({schema:ye(1),revision:on().int().nonnegative().optional(),currentVersion:Ii,channel:le(["stable","preview"]),status:le(["idle","checking","current","available","incompatible","installing","restart-required","enable-required","installed","error","unsupported"]),checkedAt:ne().max(64).nullable(),release:X({version:Ii,announcement:ne().min(1).max(600),url:ne().startsWith("https://github.com/Emikosama/dsh-fish-voice/releases/tag/v").max(256)}).nullable(),message:ne().max(512).nullable(),canInstall:ve()})),ao=so.create(),cr=X({sessionId:ao,title:ne().max(256).nullable(),availability:le(["ready","busy","unavailable","archived"]),unavailableReason:le(["managed","subagent"]).optional(),updatedAt:on().int().nonnegative().max(864e13).nullable().optional()}),Zu=ne().min(1).max(512),ch=we("listExistingSessionsRequest",()=>Et([X({sessionId:ao}),X({query:ne().max(128).optional(),cursor:Zu.optional()})])),uh=we("listExistingSessionsResult",()=>X({items:Se(cr).max(100),nextCursor:Zu.nullable(),binding:cr.nullable()})),dh=we("setExistingSessionRequest",()=>X({sessionId:ao.nullable(),expectedSessionId:ao.nullable()})),ph=we("setExistingSessionResult",()=>X({binding:cr.nullable()})),Bu=ne().min(1).max(160).regex(/^[A-Za-z0-9_-]+$/),mh=we("operationLogPageRequest",()=>X({cursor:Bu.optional()})),fh=we("operationLogPage",()=>X({text:ne().max(Nu),nextCursor:Bu.nullable()})),Fu=ne().uuid(),hh=we("operationScopeResult",()=>X({scope:Fu})),gh=we("recordOperationRequest",()=>X({scope:Fu,events:Se(X({id:ne().uuid(),at:Fe,action:le(oo),source:le(["user","ui"]),phase:le(["requested","finished"]).optional(),result:le(["ok","failed","cancelled"]).optional(),count:Fe.positive().optional()}).refine(e=>e.action==="ui-buffer-overflow"?e.source==="ui"&&e.count!==void 0:e.count===void 0)).min(1).max(lr)})),bh=we("recordOperationResult",()=>X({accepted:ve()})),vh=we("retryVoiceTranscriptRequest",()=>X({id:Ti})),yh=we("retryVoiceTranscriptResult",()=>X({accepted:ve()})),wh={retryVoiceTranscript:vh,recordClientOperations:gh,readOperationLog:mh,action:ih,saveAuthorization:Xf,manageSessions:ah,senseVoiceAsrAction:Yf,updateAction:lh,listExistingVoiceSessions:ch,setExistingVoiceSession:dh},xh={readClientOperationScope:hh,recordClientOperations:bh,readOperationLog:fh,action:Ru,manageSessions:Ru,readAuthorization:$u,saveAuthorization:$u,senseVoiceAsrAction:eh,readSetup:nh,followPresentation:sh,followModels:Gf,followUpdates:Du,updateAction:Du,listExistingVoiceSessions:uh,setExistingVoiceSession:ph,retryVoiceTranscript:yh},Me=(e,n,t=!1)=>({id:`dsh-fish-voice#${Ei}/${e}`,service:Ei,namespace:Ei,method:e,invocation:{kind:"direct"},...t?{mode:"stream"}:{},parameters:n.map(r=>({name:r,wire:r,source:"json",codec:r==="sessionId"?Uf:wh[e]??Rf})),cancellation:{parameter:"signal"},result:xh[e]??(t?Bf:Ff)}),qu={package:"dsh-fish-voice/conversation",descriptors:[Me("action",["sessionId","request"]),Me("follow",["sessionId"],!0),Me("followModels",["sessionId"],!0),Me("followPresentation",[],!0),Me("followUpdates",[],!0),Me("updateAction",["request"]),Me("readSetup",[]),Me("readAuthorization",[]),Me("saveAuthorization",["request"]),Me("senseVoiceAsrAction",["request"]),Me("manageSessions",["sessionId","request"]),Me("readClientOperationScope",[]),Me("recordClientOperations",["request"]),Me("readOperationLog",["request"]),Me("listExistingVoiceSessions",["request"]),Me("setExistingVoiceSession",["request"]),Me("retryVoiceTranscript",["request"]),Me("readVolume",["sessionId"]),Me("setVolume",["sessionId","request"])]};var qe=e=>e!==null&&typeof e=="object"&&!Array.isArray(e),zn=(e,n=1024)=>typeof e=="string"&&e.length<=n,Yn=e=>typeof e=="number"&&Number.isFinite(e),je=e=>typeof e=="boolean",Lu=e=>{if(!zn(e,4096))return!1;try{let n=new URL(e);return["https:","http:"].includes(n.protocol)&&!n.username&&!n.password}catch{return!1}},bn=(e,n=4096)=>e==null||zn(e,n),Qn=e=>zn(e,256)&&e.length>0,$e=()=>{throw new Error("\u914D\u7F6E\u63A5\u53E3\u8FD4\u56DE\u4E86\u65E0\u6548\u6570\u636E\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6")};function $i(e){if(e.onboarding!==void 0&&(!qe(e.onboarding)||e.onboarding.version!==1||!je(e.onboarding.completed))&&$e(),e.ttsSetup!==void 0){let n=e.ttsSetup;(!qe(n)||!["deepseek","local","off"].includes(n.provider)||!["stella","tide"].includes(n.deepseekVoice)||!je(n.deepseekTextTransmissionAccepted)||!Yn(n.volume)||n.volume<0||n.volume>1||!(n.localModelId==null||Qn(n.localModelId))||!bn(n.localModelPath)||!bn(n.referenceAudioPath)||!(n.referenceAudioAccepted===void 0||je(n.referenceAudioAccepted)))&&$e()}if(e.ttsRuntime?.localComputeBackend!=null&&(!["cpu","vulkan","cuda","hip"].includes(e.ttsRuntime.localComputeBackend)||!je(e.ttsRuntime.localComputeVerified)||!je(e.ttsRuntime.localComputeFallback))&&$e(),e.ttsRuntime?.localTimings!=null){let n=e.ttsRuntime.localTimings;(!qe(n)||typeof n.modelResident!="boolean"||["preparationMs","deviceSelectionMs","synthesisMs","playbackMs","totalMs","chunks"].some(t=>!Number.isSafeInteger(n[t])||n[t]<0)||n.chunks<1||n.chunks>4e3)&&$e()}return e.ttsRuntime!=null&&(!qe(e.ttsRuntime)||!zn(e.ttsRuntime.state,64)||!je(e.ttsRuntime.busy)||!je(e.ttsRuntime.blocked))&&$e(),e}function Hu(e,n){if(qe(n)||$e(),e==="setup-status"&&(Object.keys(n).some(t=>!["version","completed"].includes(t))||n.version!==1||!je(n.completed))&&$e(),e==="inspect-tts"&&(!zn(n.platform,32)||!je(n.playbackSupported)||!je(n.deepseekKeyAvailable)||n.autoDownload!==!1||!je(n.gpuSupported))&&$e(),e==="preview-tts"&&(!["deepseek","local"].includes(n.provider)||n.fallback!==!1||n.acousticConfirmation!==!1||n.playbackCompleted!==!0||n.textOnly!==void 0)&&$e(),e==="cancel-tts"&&!["idle","cancelled","unconfirmed"].includes(n.status)&&$e(),e==="model-installer"){if((n.schema!==1||!Array.isArray(n.models)||n.models.length>100||!Array.isArray(n.jobs)||n.jobs.length>1e3||!qe(n.hardware)||!qe(n.compute))&&$e(),n.refresh!=null){let t=n.refresh;(!qe(t)||!je(t.pending)||!bn(t.observedAt,64)||!bn(t.attemptedAt,64)||!bn(t.error,512)||!(t.intervalMs===void 0||Yn(t.intervalMs)&&t.intervalMs>0&&t.intervalMs<=36e5))&&$e()}for(let t of n.models)(!qe(t)||!Qn(t.id)||!je(t.available)||t.runtimeLoaded!==!1||!bn(t.title)||!bn(t.reason)||!(t.totalBytes==null||Yn(t.totalBytes)&&t.totalBytes>=0))&&$e(),t.recommendation!=null&&(!qe(t.recommendation)||!je(t.recommendation.recommended)||!bn(t.recommendation.reason))&&$e();for(let t of n.jobs)Vu(t);if(n.ttsInstallIntent!=null){let t=n.ttsInstallIntent;(!qe(t)||!Qn(t.jobId)||!Qn(t.modelId)||!["waiting","verifying","applied","blocked","paused","cancelled"].includes(t.status)||!bn(t.reason))&&$e()}}return e==="inspect-model-compute"&&!qe(n.compute)&&!qe(n.backends)&&$e(),e==="plan-model-install"&&(n.reused!==void 0&&(!je(n.reused)||n.reused!==!0||!zn(n.sourceDirectory,4096)||!n.sourceDirectory||!["q4_k_m","q8_0"].includes(n.modelVariant)||!Yn(n.reusedBytes)||n.reusedBytes<0)&&$e(),n.reused!==!0&&(n.sourceDirectory!==void 0||n.modelVariant!==void 0||n.reusedBytes!==void 0)&&$e(),Array.isArray(n.files)&&n.files.some(t=>qe(t)&&t.reused!==void 0&&!je(t.reused))&&$e(),(!Qn(n.modelId)||!["cpu","auto","cuda","vulkan"].includes(n.compute)||!zn(n.planHash,128)||!Array.isArray(n.files)||n.files.length>200||!Yn(n.totalBytes)||n.totalBytes<0||!zn(n.destination,4096)||!Array.isArray(n.licenseUrls)||n.licenseUrls.some(t=>!Lu(t))||!bn(n.source)||!bn(n.notice)||!bn(n.licenseNote)||n.files.some(t=>!qe(t)||!Qn(t.name)||!Yn(t.bytes)||t.bytes<0||!zn(t.sha256,64)||!/^[a-f0-9]{64}$/i.test(t.sha256)||!Lu(t.url)))&&$e()),["start-model-install","control-model-install"].includes(e)&&Vu(n),$i(n)}function Vu(e){qe(e)&&e.error!=null&&(!qe(e.error)||!zn(e.error.message,512))&&$e(),(!qe(e)||!Qn(e.id)||!Qn(e.modelId)||!["cpu","auto","cuda","vulkan"].includes(e.compute)||!["queued","running","paused","failed","cancelled","installed"].includes(e.status)||!zn(e.stage,128)||!Yn(e.receivedBytes)||e.receivedBytes<0||!(e.totalBytes===null||Yn(e.totalBytes)&&e.totalBytes>=0)||e.runtimeLoaded!==!1)&&$e()}function Bn(e,n){let t=i=>i!==null&&typeof i=="object"&&!Array.isArray(i),r=i=>typeof i=="string"&&i.length>0&&i.length<=256,o=i=>i===null||t(i)&&Object.keys(i).sort().join(",")==="code,modifiers"&&typeof i.code=="string"&&/^(F([1-9]|1[0-9]|2[0-4])|Key[A-Z]|Digit[0-9]|Space)$/.test(i.code)&&Array.isArray(i.modifiers)&&i.modifiers.length<=3&&new Set(i.modifiers).size===i.modifiers.length&&i.modifiers.every(a=>["Control","Alt","Shift"].includes(a))&&!(i.code==="F4"&&i.modifiers.includes("Alt"));if(!t(n))throw new Error("Fish Voice UI returned invalid data");if(n.wake!==void 0&&!(n.wake===null&&e!=="conversation")&&!na(n.wake))throw new Error("Invalid wake state");if(n.listenMode!==void 0&&n.listenMode!==null&&!yt.includes(n.listenMode))throw new Error("Invalid listening mode");if(["status","enable","disable","new","resume","listen-mode"].includes(e)){if(!(n.ownerSessionId===null||r(n.ownerSessionId))||typeof n.enabled!="boolean"||!t(n.helper)||typeof n.helper.online!="boolean")throw new Error("Fish Voice UI returned an invalid status");if(n.existingVoiceSessionSupported!==void 0&&typeof n.existingVoiceSessionSupported!="boolean")throw new Error("Invalid existing session support");if(n.existingVoiceSession!=null&&!cr.safeParse(n.existingVoiceSession).success)throw new Error("Invalid existing voice session");if(n.helper.lastError!=null&&(typeof n.helper.lastError!="string"||n.helper.lastError.length>512))throw new Error("Invalid audio diagnostic")}else if(["save-voice-prompt","save-conversation-model","save-bindings","read-settings","save-settings","save-audio-device","save-models","set-visibility","set-performance-mode","save-tts","complete-setup","apply-model-install"].includes(e)){if(n.bindingContext!==void 0&&(!t(n.bindingContext)||["ownerSessionId","epoch","rootSessionId"].some(a=>n.bindingContext[a]!==null&&!r(n.bindingContext[a]))))throw new Error("Invalid binding context");let i=n.values;if(typeof n.revision!="string"||!n.revision||!t(i)||![0,1,2].includes(i.pttMouse)||!t(i.speakerVerification)||typeof i.speakerVerification.enabled!="boolean"||!(Ht(i.device)||typeof i.device=="string"&&i.device.length<=256&&!/[\u0000-\u001f\u007f]/.test(i.device)||Number.isSafeInteger(i.device)&&i.device>=0))throw new Error("Fish Voice UI returned invalid settings");if(i.wakeWordAliases!==void 0&&!Sr(i.wakeWordAliases))throw new Error("Invalid wake aliases");if(i.wakeListenTimeoutMs!==void 0&&(!Number.isInteger(i.wakeListenTimeoutMs)||i.wakeListenTimeoutMs<3e3||i.wakeListenTimeoutMs>3e4))throw new Error("Invalid wake timeout");if(i.semanticExperimental!==void 0&&typeof i.semanticExperimental!="boolean")throw new Error("Invalid experimental wake setting");if(i.pttKeyboard!==void 0&&!o(i.pttKeyboard))throw new Error("Invalid keyboard binding");if(n.capabilities?.pttKeyboard!==void 0){let a=n.capabilities.pttKeyboard;if(!t(a)||typeof a.supported!="boolean"||a.scope!=="global"||a.platform!=="win32"||!["available","unsupported"].includes(a.status)||!(a.reason==null||typeof a.reason=="string")||a.supported!==(a.status==="available"))throw new Error("Invalid keyboard capability")}if(n.modelSetup!==void 0&&(!t(n.modelSetup)||n.modelSetup.asr!=="sensevoice"||!t(n.modelSetup.models)||n.modelSetup.modelCompute!==void 0&&!["cpu","auto","cuda"].includes(n.modelSetup.modelCompute)||["sensevoiceDir","campplus"].some(a=>typeof n.modelSetup.models[a]!="string")))throw new Error("Fish Voice UI returned invalid model configuration");if(n.capabilities?.turnSignals===!0){let a=i.turnSignals;if(!t(a)||typeof a.enabled!="boolean"||typeof a.headphonesConfirmed!="boolean"||typeof a.experimentalAutomaticBargeIn!="boolean"||typeof a.volume!="number"||!Number.isFinite(a.volume)||a.volume<0||a.volume>1)throw new Error("Fish Voice UI returned invalid turn sound settings")}}else if(e==="list"&&(!Array.isArray(n.items)||n.items.length>50||!(n.nextCursor==null||typeof n.nextCursor=="string"&&n.nextCursor.length<=2048)||n.items.some(i=>!t(i)||!r(i.id)||typeof i.archived!="boolean"||typeof i.available!="boolean"||typeof i.canResume!="boolean"||i.title!==void 0&&typeof i.title!="string"||i.reason!==void 0&&typeof i.reason!="string")))throw new Error("Fish Voice UI returned invalid voice history");if(n.voicePrompt!==void 0){let i=n.voicePrompt;if(!t(i)||typeof i.text!="string"||i.text.length>32768||!["agents","custom"].includes(i.mode)||typeof i.customSupported!="boolean"||!(i.unsupportedReason===null||typeof i.unsupportedReason=="string"&&i.unsupportedReason.length<=512)||i.mode==="custom"&&(!i.text.trim()||!i.customSupported)||i.mode==="agents"&&i.customSupported&&i.text.trim())throw new Error("Invalid voice prompt preference")}if(n.conversationModel!==void 0&&(!t(n.conversationModel)||!["auto","manual"].includes(n.conversationModel.mode)||![n.conversationModel.provider,n.conversationModel.model].every(i=>i===null||r(i))||n.conversationModel.mode==="auto"&&(n.conversationModel.provider!==null||n.conversationModel.model!==null)))throw new Error("Invalid conversation model preference");if(e==="conversation-models"&&(!Array.isArray(n.providers)||n.providers.length>256||new Set(n.providers.map(i=>i?.id)).size!==n.providers.length||n.providers.some(i=>!t(i)||!r(i.id)||!r(i.name)||!Array.isArray(i.models)||i.models.length>2048||new Set(i.models.map(a=>a?.id)).size!==i.models.length||i.models.some(a=>!t(a)||!r(a.id)||!r(a.name)))))throw new Error("Invalid conversation model catalog");if(e==="read-audio-devices"&&!Qi(n))throw new Error("Invalid audio device inventory");if(n.audioDevices!==void 0&&(!t(n.audioDevices)||!Ht(n.audioDevices.output)||!(Ht(n.audioDevices.input)||typeof n.audioDevices.input=="string"||Number.isSafeInteger(n.audioDevices.input))))throw new Error("Invalid audio device preferences");if(e==="inspect-performance"&&(!Array.isArray(n.modes)||n.modes.some(i=>!t(i)||!["fast","balanced","high"].includes(i.performanceMode)||typeof i.available!="boolean")))throw new Error("Invalid performance capabilities");if(e==="read-history"&&(!(n.rootSessionId===null||r(n.rootSessionId))||!Number.isSafeInteger(n.generation)||n.generation<0||!Number.isSafeInteger(n.revision)||n.revision<0||!["voice-session","current-voice-session"].includes(n.scope)||typeof n.truncated!="boolean"||!(n.nextCursor===null||typeof n.nextCursor=="string"&&/^\d+:\d+$/.test(n.nextCursor))||!Array.isArray(n.items)||n.items.length>100||new Set(n.items.map(i=>i?.id)).size!==n.items.length||n.items.some(i=>!t(i)||!r(i.id)||!["user","assistant"].includes(i.role)||typeof i.text!="string"||i.text.length>8e3||!["reply","interrupted","delivered","speech-requested","speech-failed"].includes(i.state)||!Number.isFinite(i.at))))throw new Error("Invalid conversation history");if(e==="conversation"){if(n.helper!==void 0&&(!t(n.helper)||typeof n.helper.online!="boolean"||!(n.helper.listenMode===null||yt.includes(n.helper.listenMode))||!n.helper.online&&n.helper.listenMode!==null))throw new Error("Invalid conversation helper state");if(n.inputError!=null&&!["device","recognition","no-speech"].includes(n.inputError))throw new Error("Invalid input error");if(n.providerError!==void 0&&(typeof n.providerError!="string"||n.providerError.length>480))throw new Error("Invalid provider error");if(!Number.isSafeInteger(n.revision)||n.revision<0||n.title!==null||!(n.rootSessionId===null||r(n.rootSessionId))||!Array.isArray(n.items)||n.items.length>40||typeof n.inputActive!="boolean"||n.playbackConfirmed!==!1||n.items.some(i=>!t(i)||!r(i.id)||!["user","assistant"].includes(i.role)||typeof i.text!="string"||i.text.length>8e3||!["reply","interrupted","delivered","speech-requested","speech-failed"].includes(i.state)||!Number.isFinite(i.at))||n.latest!==null&&(!t(n.latest)||!n.items.some(i=>i.id===n.latest.id&&i.text===n.latest.text&&i.role==="assistant")))throw new Error("Invalid conversation snapshot")}if(e==="output-volume"&&(typeof n.supported!="boolean"||n.supported&&(typeof n.volume!="number"||!Number.isFinite(n.volume)||n.volume<0||n.volume>1||n.revision==null)))throw new Error("Invalid output volume snapshot");if(["agent-permissions","save-agent-permissions"].includes(e)){let i=["set-performance-mode","set-visibility","set-output-volume"];if(n.schema!==1||!r(n.revision)||!Array.isArray(n.items)||n.items.length!==3||new Set(n.items.map(a=>a?.operation)).size!==3||n.items.some(a=>!t(a)||!i.includes(a.operation)||typeof a.allowed!="boolean"||typeof a.title!="string"||a.title.length>128||!(a.reason===null||typeof a.reason=="string"&&a.reason.length<=1024)))throw new Error("Invalid agent permissions")}if(["agent-requests","decide-agent-request"].includes(e)){let i=a=>t(a)&&r(a.id)&&r(a.sourceSessionId)&&r(a.operation)&&typeof a.title=="string"&&a.title.length<=128&&["pending","executing","completed","blocked","unknown","superseded","expired","cancelled","rejected"].includes(a.state)&&Number.isFinite(a.createdAt)&&Number.isFinite(a.expiresAt)&&Number.isSafeInteger(a.humanRevision)&&t(a.request)&&t(a.before)&&Array.isArray(a.acknowledgements)&&a.acknowledgements.length<=10&&a.acknowledgements.every(l=>t(l)&&r(l.id)&&typeof l.text=="string"&&l.text.length<=1024)&&(a.error===null||t(a.error)&&typeof a.error.code=="string"&&typeof a.error.message=="string"&&a.error.message.length<=1024)&&(a.nextAction===null||typeof a.nextAction=="string"&&a.nextAction.length<=1024);if(n.schema!==1||!Number.isSafeInteger(n.humanRevision)||n.humanRevision<0||!Array.isArray(n.items)||n.items.length>100||n.items.some(a=>!i(a))||e==="decide-agent-request"&&(!i(n.lastOutcome)||!n.items.some(a=>a.id===n.lastOutcome.id&&a.state===n.lastOutcome.state)))throw new Error("Invalid agent request snapshot")}if(e==="authorization"){if(n.usageAgreement!==void 0&&(!t(n.usageAgreement)||n.usageAgreement.version!==1||typeof n.usageAgreement.accepted!="boolean"||!Array.isArray(n.usageAgreement.text)||n.usageAgreement.text.length>16||n.usageAgreement.text.some(i=>typeof i!="string"||i.length>4096)))throw new Error("Invalid usage agreement snapshot");if(n.schema!==1||!r(n.revision)||!Array.isArray(n.blockedOperations)||n.blockedOperations.some(i=>typeof i!="string")||typeof n.revocationUnconfirmed!="boolean"||typeof n.completed!="boolean"||typeof n.granted!="boolean"||!Array.isArray(n.scopes)||n.scopes.length>16||new Set(n.scopes.map(i=>i?.id)).size!==n.scopes.length||n.scopes.some(i=>!t(i)||!r(i.id)||typeof i.title!="string"||typeof i.description!="string"||typeof i.allowed!="boolean")||!Array.isArray(n.modelSources)||n.modelSources.length>32||n.modelSources.some(i=>!t(i)||!r(i.modelId)||typeof i.source!="string"||!Array.isArray(i.licenseUrls)||i.licenseUrls.some(a=>typeof a!="string")||typeof i.licenseNote!="string")||!Array.isArray(n.restrictions)||n.restrictions.some(i=>typeof i!="string"))throw new Error("Invalid authorization snapshot")}if(n.inferenceCompute!=null){let i=n.inferenceCompute;if(!t(i)||!["cpu","auto","cuda"].includes(i.requested)||![null,"cpu","cuda"].includes(i.actual)||i.engine!=="sensevoice"||!(i.computeType===null||["int8","float16","int8_float16","int8_float32","float32"].includes(i.computeType))||!(i.deviceIndex===null||Number.isSafeInteger(i.deviceIndex)&&i.deviceIndex>=0&&i.deviceIndex<8)||![null,"gpu-unavailable","gpu-load-failed","gpu-inference-failed","model-gpu-unverified"].includes(i.fallbackReason)||typeof i.validated!="boolean")throw new Error("Invalid inference compute status")}if(n.inputDevices!==void 0&&!ra(n.inputDevices))throw new Error("Invalid input device inventory");if(n.ptt?.keyboard!==void 0&&n.ptt.keyboard!==null){let i=n.ptt.keyboard;if(!t(i)||typeof i.supported!="boolean"||i.scope!=="global"||!["unsupported","active","inactive","unknown"].includes(i.status)||typeof i.hookInstalled!="boolean"||typeof i.recording!="boolean"||!(i.observedAt==null||Number.isFinite(i.observedAt)))throw new Error("Invalid keyboard status")}if(n.voiceSession?.recovery!==void 0){let i=n.voiceSession.recovery;if(!t(i)||i.stopVerified!==void 0&&typeof i.stopVerified!="boolean"||i.stopVerified===!0&&(i.kind!=="none"||n.voiceSession.fullyStopped!==!0)||!["none","live-root-conflict","predecessor-cleanup-pending","predecessor-stop-unconfirmed","helper-cleanup-pending","helper-stop-unconfirmed"].includes(i.kind)||!(i.rootSessionId===null||r(i.rootSessionId))||i.kind!=="none"&&n.voiceSession.fullyStopped===!0)throw new Error("Invalid voice recovery state")}if(n.voiceSession?.visibility!==void 0&&!["hidden","workspace"].includes(n.voiceSession.visibility))throw new Error("Fish Voice UI returned invalid visibility");if(n.voiceCapabilities!==void 0){let i=n.voiceCapabilities;if(!t(i)||!(i.configuredVisibility===null||["hidden","workspace"].includes(i.configuredVisibility))||["hidden","workspace"].some(a=>!t(i[a])||typeof i[a].supported!="boolean")||!t(i.taskHandoff)||typeof i.taskHandoff.mode!="string")throw new Error("Fish Voice UI returned invalid host capabilities")}return $i(n),["setup-status","inspect-tts","preview-tts","cancel-tts","model-installer","inspect-model-compute","plan-model-install","start-model-install","control-model-install"].includes(e)&&Hu(e,n),n}function Ku(e,n=10){let t=0;for(let r=e.length-1;r>=0;r--)if(e[r].role==="user"&&++t===n)return e.slice(r);return e}function ju(e=[],n=[]){let t=new Map(e.map(r=>[r.id,r]));for(let r of n)t.set(r.id,r);return[...t.values()].sort((r,o)=>r.at-o.at)}function Wu(e,n=36){return e.scrollHeight-e.scrollTop-e.clientHeight<=n}function Ju({enabled:e,active:n,unknown:t,pending:r}){return t?"unknown":r?"pending":e?n?"listening":"standby":"off"}function ur(e){return e?.enabled?e.existingVoiceSession?.sessionId??e.voiceSession?.id??null:null}var Gu=["save-voice-prompt","save-conversation-model","save-bindings","read-settings","save-settings","save-audio-device","save-models","set-visibility","set-performance-mode","save-tts","complete-setup","apply-model-install"],dr=Gu.filter(e=>e!=="read-settings"),pr=["status","enable","disable","new","resume","listen-mode"],kh=new Set(["status","enable","disable","listen-mode","read-history"]),_h=["save-bindings","inspect-tts","inspect-model-compute"],Fn=new Set(["conversation-models","status","read-settings","read-output-volume","model-installer","agent-permissions","agent-requests"]),It=["conversation-models","agent-permissions","agent-requests","status","read-settings","list","read-output-volume","inspect-performance","inspect-tts","model-installer","inspect-model-compute","plan-model-install"];function Xu(e,{schedule:n=(o,i)=>globalThis.setTimeout(o,i),unschedule:t=o=>globalThis.clearTimeout(o),observe:r=()=>{}}={}){let o=0,i={conversationHistory:null,conversationHistoryFor:null,conversationHistoryError:null,conversationHistoryLoading:!1,conversationHistoryRequestCursor:null},a={...i,conversationModels:null,conversationModelsFor:null,conversationModelsError:null,authorization:null,authorizationOpen:!1,authorizationLoading:!1,authorizationBusy:!1,authorizationUncertain:!1,authorizationError:null,agentRequests:null,agentRequestsFor:null,busy:!1,interruptibleRead:null,diagnosticStopPending:!1,error:null,status:null,settings:null,settingsFor:null,visibilityUncertain:!1,visibilityReadbackFor:null,catalog:null,checkedFor:null,catalogFor:null,uncertain:!1,performance:null,performanceFor:null,performancePending:!1,performanceError:null,conversation:null,conversationFor:null,conversationError:null,outputVolume:null,outputVolumeFor:null,outputVolumeUncertain:!1,setupStatus:null,setupOpen:!1,panelView:"home",setupError:null,ttsCapabilities:null,ttsCapabilitiesFor:null,ttsPreview:null,ttsPreviewFor:null,ttsCancelling:!1,ttsUncertain:!1,installer:null,installerFor:null,installerError:null,installerUncertain:!1,installPlan:null,installPlanFor:null},l=new Set,c=null,u=!0,d=!0,p=0,f=null,m=null,y=0,v=new Map,b=()=>{for(let w of v.values())w.stale=!0,w.abort.abort();v.clear()},x=()=>{b(),f&&(f.stale=!0,Fn.has(f.action)&&f.abort.abort())},z=!1,F=null,Z=!1,N=null,$=0,S=0,O=new Map,C=!0,_=null,P=null,D=null,A,E=null,I=0,H=0,L=!1,J=null,K=null,ce=new Set,de=new Set,me=new Set,j=new Set,T=w=>{if(!C)return;let k=Object.hasOwn(w,"uncertain")?w.readOnlyFailure===!0:a.readOnlyFailure;a={...a,...w,readOnlyFailure:k};for(let M of ce)M()},Y,ue,ge=0,Ie=w=>["checking","installing"].includes(w?.status),yn=(w,k)=>{k?.revision!==void 0&&w.revision<k.revision||(k&&w.revision!==void 0&&(k.revision=w.revision),T({updates:w,updatesUnavailable:!1}))},Qe=()=>{if(!C||!_?.subscribeUpdates||Y||!u)return;let w=_,k={};Y=k,k.stop=w.subscribeUpdates(M=>{!C||Y!==k||(ge++,En("update-stream"),yn(M,k))},()=>{!C||Y!==k||(Y=null,T({updatesUnavailable:!0}),Ve(P,"update-stream"))})},Vn=()=>{let w=Y;Y=null,w?.stop?.(),ue?.abort(),ue=null,T({updates:null,updatePending:null,updatesUnavailable:!1})},Hn=async w=>{if(!C||!_?.updateAction||ue)return;let{action:k,version:M}=w;if(k==="install"&&(a.updatesUnavailable||a.updates?.canInstall!==!0||a.updates?.release?.version!==M))return;let q=_,W=new AbortController;ue=W,Qe();let ee=Y,ke=ge;T({updatePending:k});try{let be=await q.updateAction(w,W.signal);C&&ue===W&&Y===ee&&(be.revision===void 0&&Ie(be)&&ge!==ke&&!Ie(a.updates)||yn(be,ee))}catch{let be=ge!==ke&&!Ie(a.updates);C&&ue===W&&Y===ee&&!be&&T({updatesUnavailable:!0})}finally{ue===W&&(ue=null,T({updatePending:null}))}},Re=0,te=w=>{Re++,T({...w,ttsUncertain:!0})},en=()=>a.status?.existingVoiceSession?null:P,Be=null,nn=()=>{Be=null,T({transcriptRetry:null})},ft=w=>{if(!Be?.receipt||w?.rootSessionId!==Be.sessionId)return;let k=w.retryTranscripts?.items.find(M=>M.id===Be.id);(!k||k.state!=="ready"||Be.receipt==="unconfirmed"&&w.revision>Be.revision)&&nn()},tt=async(w,k)=>{let{status:M,conversation:q,checkedFor:W,conversationFor:ee,uncertain:ke,busy:be}=a,Oe=M?.existingVoiceSession?.sessionId;if(!C||!_?.retryVoiceTranscript||Be||ke||be||P!==w||W!==w||ee!==w||!M?.enabled||!Oe||q?.rootSessionId!==Oe||q.retryTranscripts?.sessionId!==Oe||!q.retryTranscripts.items.some($n=>$n.id===k&&$n.state==="ready"))return;let Ge=_,Tn=new AbortController,wn=Be={id:k,sessionId:Oe,revision:q.revision,receipt:null};de.add(Tn),T({transcriptRetry:{id:k,state:"sending"}});try{let $n=await Ge.retryVoiceTranscript({id:k},Tn.signal);if(!C||Be!==wn)return;$n.accepted===!1?nn():wn.receipt="accepted"}catch{if(!C||Be!==wn)return;wn.receipt="unconfirmed"}finally{de.delete(Tn),Be===wn&&(wn.receipt==="unconfirmed"&&T({transcriptRetry:{id:k,state:"uncertain"}}),ft(a.conversation))}},sn=async(w,k,M)=>{let q=e??_?.action;if(!q)throw new Error("\u9C7C\u5E94\u754C\u9762\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let W=a.status?.existingVoiceSession&&kh.has(k.action)||a.existingSessionUnconfirmed&&k.action==="status"?null:w,ee=await q(W,k,M);try{return Bn(k.action,ee)}catch(ke){throw r("ui-render-error","finished","failed"),ke}},Pn=null,rt=({clear:w=!1}={})=>{let k=Pn;Pn=null,k?.abort.abort(),T({audioDevicesPending:!1,audioDevicesError:null,...w?{audioDevices:null,audioDevicesFor:null}:{}})},ot=w=>{if(!C||P!==w)return Promise.resolve(!1);if(Pn?.id===w&&Pn.client===_)return Pn.promise;rt();let k={id:w,client:_,scope:S,abort:new AbortController,promise:null};Pn=k,de.add(k.abort),T({audioDevicesPending:!0,audioDevicesError:null});let M=()=>C&&Pn===k&&P===w&&_===k.client&&S===k.scope;return k.promise=(async()=>{let q;try{let W=new Promise((ke,be)=>{q=()=>be(new Error("Device read cancelled")),k.abort.signal.addEventListener("abort",q,{once:!0})}),ee=await Promise.race([sn(w,{action:"read-audio-devices"},k.abort.signal),W]);return M()?(T({audioDevices:ee,audioDevicesFor:w}),!0):!1}catch(W){return M()&&!k.abort.signal.aborted&&T({audioDevicesError:String(W?.message??W)}),!1}finally{k.abort.signal.removeEventListener("abort",q),de.delete(k.abort),M()&&(Pn=null,T({audioDevicesPending:!1}))}})(),k.promise},fn=null,xo=w=>{if(!C||P!==w)return Promise.resolve(!1);if(fn?.id===w&&fn.scope===S)return fn.promise;let k={id:w,scope:S,client:_,promise:null};fn=k;let M=()=>C&&fn===k&&P===w&&S===k.scope&&_===k.client;return T({modelComputePending:!0,modelComputeError:null}),k.promise=(async()=>{try{if(await sn(w,{action:"inspect-model-compute"}),!M())return!1;let q=await sn(w,{action:"model-installer"});return M()?(T({installer:q,installerFor:w,installerError:null}),L||(L=!0,ht(!0)),!0):!1}catch(q){if(!M())return!1;let W=q?.uncertain||/TTS_TERMINATION_UNCONFIRMED/.test(String(q?.code??"")+" "+String(q?.message??""));return T({modelComputeError:String(q?.message??q),...W?{installerUncertain:!0,installerTerminationUnconfirmed:!0}:{}}),!1}finally{M()&&(fn=null,T({modelComputePending:!1}))}})(),k.promise},Nn=null,re=0,it=({clear:w=!1}={})=>{re++;let k=Nn;Nn=null,k?.abort.abort(),T({performancePending:!1,performanceError:null,...w?{performance:null,performanceFor:null}:{}})},Xd=w=>{if(!C||P!==w)return Promise.resolve(!1);if(Nn?.id===w&&Nn.client===_)return Nn.promise;it();let k={id:w,client:_,epoch:re,abort:new AbortController,promise:null};Nn=k,de.add(k.abort),T({performancePending:!0,performanceError:null});let M=()=>C&&Nn===k&&k.epoch===re&&P===w&&_===k.client;return k.promise=(async()=>{let q;try{let W=new Promise((ke,be)=>{q=()=>be(new Error("Probe cancelled")),k.abort.signal.addEventListener("abort",q,{once:!0})}),ee=await Promise.race([sn(w,{action:"inspect-performance"},k.abort.signal),W]);return M()?(T({performance:ee,performanceFor:w}),!0):!1}catch(W){return M()&&!k.abort.signal.aborted&&T({performanceError:String(W?.message??W)}),!1}finally{k.abort.signal.removeEventListener("abort",q),de.delete(k.abort),M()&&(Nn=null,T({performancePending:!1}))}})(),k.promise},Mt=()=>{let w=O.get("conversation-stream");w&&(w.timer!==null&&t(w.timer),w.timer=null,w.ready=!1);let k=++I;if(D?.(),D=null,o++,T({...i,conversation:null,conversationFor:null,conversationError:null,listenModeReceiptRevision:null}),A=void 0,!C||!_)return;let M=P;A=en(),D=_.subscribe(A,(q,W)=>{if(!(!C||k!==I||P!==M))try{let ee=Bn("conversation",q);W?.initial||En("conversation-stream"),a.conversationHistory&&(a.conversationHistory.rootSessionId!==ee.rootSessionId||a.conversationHistory.scope!=="voice-session"&&a.conversationHistory.generation!==ee.historyGeneration)&&(o++,T({...i}));let ke=a.conversationHistory,be={};if(ke?.rootSessionId&&ke.rootSessionId===ee.rootSessionId){let Oe=new Map(ke.items.map(V=>[V.id,V]));for(let V of ee.items)Oe.set(V.id,V);let Ge=[...Oe.values()].sort((V,_e)=>V.at-_e.at),Tn=Ge.slice(-4e3),wn=Tn.reduce((V,_e)=>V+_e.text.length,0),$n=Ge.length>4e3;for(;wn>4*1024*1024;)wn-=Tn.shift().text.length,$n=!0;be={conversationHistory:{...ke,items:Tn,truncated:ke.truncated||$n}}}T({...be,conversation:ee,conversationFor:M,conversationError:null}),ft(ee)}catch(ee){o++,T({...i,conversation:null,conversationFor:null,conversationError:String(ee.message)}),Ve(M,"conversation-stream")}},q=>{C&&k===I&&(o++,T({...i,conversation:null,conversationFor:null,conversationError:String(q?.message??q)}),Ve(M,"conversation-stream"))})},ht=(w=!1)=>{let k=O.get("model-stream");k&&(k.timer!==null&&t(k.timer),k.timer=null,k.ready=!1);let M=++H;if(E?.(),E=null,w||T({installer:null,installerFor:null,installerError:null}),!C||!_?.subscribeModels||!L)return;let q=P;E=_.subscribeModels(q,(W,ee)=>{if(!(!C||M!==H||P!==q||ee?.initial))try{let ke=Bn("model-installer",W),be=a.installer?.ttsInstallIntent;if(En("model-stream"),T({installer:ke,installerFor:q,installerError:null}),ke.ttsInstallIntent&&(be?.jobId!==ke.ttsInstallIntent.jobId||be?.status!==ke.ttsInstallIntent.status)){let Oe=ke.ttsInstallIntent.status==="applied";T({checkedFor:null}),Ke({settings:Oe,force:!0})}}catch(ke){T({installer:null,installerFor:null,installerError:String(ke.message)}),Ve(q,"model-stream")}},W=>{C&&M===H&&(T({installer:null,installerFor:null,installerError:String(W?.message??W)}),Ve(q,"model-stream"))})},In=()=>{if(K)return K;if(!J)return Promise.resolve(!0);let w=J,k=Re;return w.cancelled=!0,w.abort.abort(),T({ttsCancelling:!0,ttsPreview:{status:"cancelling"}}),K=(async()=>{let M=!1;try{let q=await sn(w.id,{action:"cancel-tts"});return q.status==="unconfirmed"?(F=null,te({ttsPreview:q,uncertain:!0,error:"\u65E0\u6CD5\u786E\u8BA4\u6717\u8BFB\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B\u540E\u518D\u8BD5\u3002"}),!1):(M=!0,T({ttsPreview:q,...k===Re?{ttsUncertain:!1}:{}}),!0)}catch(q){return F=null,te({ttsPreview:{status:"unconfirmed"},uncertain:!0,error:String(q?.message??q)}),!1}finally{M&&J===w&&(J=null),T({ttsCancelling:!1}),K=null,queueMicrotask(()=>{xr(),vt()})}})(),K},En=w=>{let k=O.get(w);k?.timer!=null&&t(k.timer),O.delete(w)},ko=()=>{for(let w of O.keys())En(w)},Ve=(w,k)=>{if(!C||!z||P!==w||!["authorization","setup-status","conversation-stream","model-stream","update-stream"].includes(k)&&!Fn.has(k))return;let M=O.get(k);M||(M={id:w,scope:S,attempts:0,timer:null,ready:!1},O.set(k,M)),!(M.timer!==null||M.ready||!u||!d)&&(M.attempts++,r("ui-read-recovery","requested"),M.timer=n(()=>{M.timer=null,!(!C||P!==w||M.scope!==S||O.get(k)!==M)&&(M.ready=!0,vt())},Math.min(3e4,750*2**Math.min(M.attempts-1,6))),M.timer?.unref?.())},Kn=null,yr=0,gt=()=>{Kn!==null&&t(Kn),Kn=null,yr=0},Hi=w=>{!C||!u||!d||P!==w||Kn!==null||yr>=10||(Kn=n(()=>{if(Kn=null,!(!C||P!==w||!["predecessor-cleanup-pending","helper-cleanup-pending"].includes(a.status?.voiceSession?.recovery?.kind))){if(a.busy||a.ttsCancelling){Hi(w);return}yr++,Je.run(w,"status")}},1e3),Kn?.unref?.())},Je,at=0,wr=null,Zt=null,bt=null,Bt=!1,Yd=async w=>{let k=_,M=[],q=new Set;if(!C||!k?.readOperationLog)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u672A\u5C31\u7EEA");let W=null;do{w?.throwIfAborted();let ee=await k.readOperationLog(W?{cursor:W}:{},w);if(!C||_!==k||w?.aborted)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u8FDE\u63A5\u5DF2\u53D8\u5316");if(typeof ee?.text!="string"||!(ee.nextCursor===null||typeof ee.nextCursor=="string"&&ee.nextCursor)||q.has(ee.nextCursor))throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u5206\u9875\u65E0\u6548");M.push(ee.text),W=ee.nextCursor,q.add(W)}while(W);return M},Qd=async(w,k)=>{if(!C||!_?.manageSessions)throw new Error("\u9C7C\u5E94\u4F1A\u8BDD\u7BA1\u7406\u5C1A\u672A\u5C31\u7EEA");let M=_,q=await M.manageSessions(null,w,k);if(!C||_!==M||k?.aborted)throw new Error("\u4F1A\u8BDD\u7BA1\u7406\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5");return q},ep=async(w,k)=>{if(!C||!_?.listExistingVoiceSessions)throw new Error("DSH \u4F1A\u8BDD\u5217\u8868\u6682\u4E0D\u53EF\u7528");let M=_,q=await M.listExistingVoiceSessions(w,k);if(!C||_!==M||k?.aborted)throw new Error("\u4F1A\u8BDD\u5217\u8868\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5");return q},st=null,np=async w=>{if(!C||!_?.setExistingVoiceSession||st||a.existingSessionUnconfirmed)throw new Error("DSH \u4F1A\u8BDD\u7ED1\u5B9A\u6682\u4E0D\u53EF\u7528");let k=_,M=new AbortController;st=M,de.add(M);for(let q of[v.get("status"),f])q?.action==="status"&&(q.stale=!0,q.abort.abort());T({existingSessionWritePending:!0});try{let q=await k.setExistingVoiceSession(w,M.signal);if(!C||_!==k||M.signal.aborted)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u786E\u8BA4");return a.status&&T({status:{...a.status,existingVoiceSession:q.binding}}),A!==en()&&Mt(),q}catch(q){throw T({existingSessionUnconfirmed:!0}),q}finally{de.delete(M),st=null,T({existingSessionWritePending:!1}),Ke({force:!0})}},tp=async(w,k)=>{if(!C||!_?.senseVoiceAsrAction)throw new Error("\u8BC6\u522B\u6A21\u578B\u7BA1\u7406\u6682\u4E0D\u53EF\u7528");let M=_,q=await M.senseVoiceAsrAction(w,k);if(!C||_!==M||k?.aborted)throw new Error("\u8BC6\u522B\u6A21\u578B\u72B6\u6001\u5DF2\u5207\u6362");if(!(ee=>ee&&["idle","downloading","ready","error"].includes(ee.state)&&Number.isSafeInteger(ee.receivedBytes)&&Number.isSafeInteger(ee.totalBytes)&&ee.receivedBytes>=0&&ee.receivedBytes<=ee.totalBytes)(q)||typeof q.selected!="boolean"||q.message!==null&&(typeof q.message!="string"||q.message.length>512))throw new Error("\u8BC6\u522B\u6A21\u578B\u72B6\u6001\u65E0\u6548");return q},jn=async({open:w=!1,initial:k=!1}={})=>{if(!_?.readAuthorization)return!1;if(Zt)return bt={open:w||bt?.open,initial:k||bt?.initial},w&&T({authorizationOpen:!0}),!1;let M=++at,q=new AbortController;de.add(q),wr=q,T({authorizationLoading:!0,authorizationError:null,...w?{authorizationOpen:!0}:{}});try{let W=Bn("authorization",await _.readAuthorization(q.signal));return!C||M!==at?!1:(En("authorization"),T({authorization:W,authorizationUncertain:W.revocationUnconfirmed,...k&&!Bt&&(!W.completed||W.usageAgreement?.accepted!==!0||W.revocationUnconfirmed)?{authorizationOpen:!0}:{}}),!0)}catch(W){return C&&M===at&&(T({authorizationError:String(W?.message??W),authorizationUncertain:!0,...k?{authorizationOpen:!0}:{}}),Ve(P,"authorization")),!1}finally{de.delete(q),wr===q&&(wr=null,C&&T({authorizationLoading:!1}))}},rp=async w=>{if(!_?.saveAuthorization||!a.authorization||a.authorizationBusy||a.authorizationUncertain)return!1;let k=new AbortController,M=++at,q=_;de.add(k),Zt=k,T({authorizationBusy:!0,authorizationError:null});try{let W=Bn("authorization",await q.saveAuthorization({revision:a.authorization.revision,grant:w},k.signal));return!C||M!==at||_!==q?!1:(Bt=!1,T({authorization:W,authorizationOpen:W.revocationUnconfirmed,authorizationUncertain:W.revocationUnconfirmed,...W.revocationUnconfirmed?{authorizationError:"\u6743\u9650\u5DF2\u64A4\u56DE\uFF0C\u4F46\u5F53\u524D\u97F3\u9891\u505C\u6B62\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u6838\u67E5\u72B6\u6001\u3002"}:{}}),w&&!W.revocationUnconfirmed&&Je.openSetup(),Ke({settings:!0,force:!0}),!0)}catch(W){try{let ee=Bn("authorization",await q.readAuthorization(k.signal));if(C&&_===q&&M===at&&ee.completed&&ee.granted===w&&!ee.revocationUnconfirmed)return Bt=!1,T({authorization:ee,authorizationOpen:!1,authorizationUncertain:!1}),w&&Je.openSetup(),!0}catch{}return C&&_===q&&M===at&&(T({authorizationUncertain:!0,authorizationError:String(W?.message??W)}),Ve(P,"authorization")),!1}finally{if(de.delete(k),Zt===k&&(Zt=null,C&&T({authorizationBusy:!1}),C&&(bt||_!==q))){let W=bt??{initial:!0};bt=null,jn(W)}}},lt=null,_o=0,Ao=()=>{if(!_?.readSetup||lt)return lt?.promise;let w=_,k=_o,M=new AbortController,q={promise:null};return lt=q,de.add(M),q.promise=(async()=>{try{let W=Bn("setup-status",await w.readSetup(M.signal));return!C||_!==w?!1:(En("setup-status"),T({setupStatus:W,...p===k&&!Bt?{setupOpen:!W.completed}:{},setupError:null}),W.completed?Ke({settings:!0}):xr(),!0)}catch(W){return C&&_===w&&(T({setupError:String(W?.message??W)}),Ve(P,"setup-status")),!1}finally{de.delete(M),lt===q&&(lt=null)}})(),q.promise},vt=async()=>{if(!(e||_?.action||_?.readAuthorization||_?.readSetup||_?.subscribeUpdates)||!C||!z||!u||!d||Z||st||a.busy||a.ttsCancelling||!F&&![...O.values()].some(q=>q.ready))return;if(!F){let[q,W]=[...O].find(([,ee])=>ee.ready);if(W.ready=!1,W.id!==P||W.scope!==S){En(q);return}Z=!0;try{q==="authorization"?await jn():q==="setup-status"?await Ao():q==="conversation-stream"?Mt():q==="model-stream"?ht(!0):q==="update-stream"?Qe():await Je.run(W.id,q)}finally{Z=!1,queueMicrotask(()=>{vt()})}return}let w=F;F=null;let k=()=>C&&w.id===P&&w.scope===S;if(!k())return;let M=()=>k()?!u||!d||st||a.busy||a.ttsCancelling?(F||(F=w),!0):!1:!0;Z=!0;try{if(w.notified||(w.notified=!0,N=w.id,$=Date.now(),T({readRefresh:(a.readRefresh??0)+1})),M()||(w.settings&&(w.settings=!1,await Je.run(w.id,"read-settings",{},!0)),M()))return;w.status&&(w.status=!1,await Je.run(w.id,"status",{},!0)),k()&&w.id&&!j.has(w.id)&&(j.add(w.id),Je.run(w.id,"inspect-performance"))}finally{Z=!1,queueMicrotask(()=>{vt()})}},Ke=({settings:w=!1,force:k=!1}={})=>{if(Qe(),!(!C||!z)&&!(!k&&!w&&N===P&&Date.now()-$<1500)&&(a.authorizationUncertain&&!wr&&!Zt&&jn(),a.setupError&&!lt&&Ao(),!(!P&&!a.setupOpen&&a.setupStatus===null))){a.installerError&&L&&ht(!0);for(let M of O.values())M.id===P&&(M.timer!==null&&t(M.timer),M.timer=null,M.attempts=0,M.ready=!0);Kn===null&&(yr=0),(!F||F.scope!==S)&&r("ui-status-refresh","requested"),F={id:P,scope:S,settings:!0,status:!0,notified:!1},queueMicrotask(()=>{vt()})}},Ki=()=>{let w=u&&d;if(a.readVisible!==w){if(T({readVisible:w}),!w){b();for(let k of O.values())k.timer!==null&&t(k.timer),k.timer=null,k.ready=!1;gt();return}Ke({force:!0})}},xr=async()=>{let w=P;!(e||_?.action)||a.setupStatus?.completed!==!1||me.has(w)||a.busy||a.ttsCancelling||(me.add(w),await Je.run(w,"read-settings")&&P===w&&await Je.run(w,"status"))};return Je={getSnapshot:()=>a,async pickPath(w,k,M){if(!C||P!==w)return null;let q=S,W=e??_?.action;if(!W)throw new Error("\u9C7C\u5E94\u754C\u9762\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let ee=await W(w,{action:"pick-local-path",kind:k},M);if(!C||P!==w||q!==S||M?.aborted)return null;if(!ee||!(ee.path===null||typeof ee.path=="string"&&ee.path.length>0&&ee.path.length<=4096&&!/[\u0000-\u001f\u007f]/.test(ee.path)))throw new Error("\u8DEF\u5F84\u9009\u62E9\u7ED3\u679C\u65E0\u6548");return ee.path},async captureBindings(w,k){let M=await sn(w,{action:"capture-bindings",...k});if(!M||typeof M.token!="string"||typeof M.paused!="boolean")throw new Error("\u6309\u952E\u5F55\u5165\u56DE\u6267\u65E0\u6548");return M},setReadVisibility(w){u=!!w,Ki()},setPanelVisible(w){d=!!w,Ki()},markSettingsEdited(w="save-settings"){dr.includes(w)&&(l.add(w),T({settingsDraftActions:[...l]}))},discardSettingsDraft(w){w?l.delete(w):l.clear(),T({settingsDraftActions:[...l]}),!l.size&&(c&&T({settings:c,settingsFor:P}),c=null,T({settingsConflict:!1,settingsKey:a.settings?.revision}))},enableAutomaticReads(){z=!0,Ke({settings:!0,force:!0})},refresh:Ke,refreshModelCompute:xo,subscribe(w){return ce.add(w),()=>ce.delete(w)},setSession(w){P!==w&&(P=w,S++,fn=null,l.clear(),c=null,T({sourcePending:!0,checkedFor:void 0,settingsFor:void 0,modelComputePending:!1,modelComputeError:null,enableError:null,listenModeError:!1,newChatFor:void 0,settingsConflict:!1,settingsDraftActions:[],installPlan:null,installPlanFor:null}),ko(),it({clear:!0}),rt({clear:!0}),gt(),In(),x(),Mt(),ht(),Ke({settings:!0,force:!0}),xr())},attachConversationClient(w){_!==w&&(Vn(),S++,fn=null,T({modelComputePending:!1,modelComputeError:null}),ko(),it({clear:!0}),rt({clear:!0}),x(),j.clear()),_=w,jn({initial:!0}),Mt(),ht(),Ke({settings:!0,force:!0}),_.readSetup&&(lt=null,_o=p,Ao())},conversationUnavailable(w){o++,T({...i,error:String(w?.message??w),conversation:null,conversationFor:null,conversationError:String(w?.message??w)})},async dismissSetup(){let w=++p,k=await In();return k&&w===p&&(x(),Je.discardSettingsDraft(),T({setupOpen:!1})),k&&w===p},async showHome(){let w=++p,k=await In();return k&&w===p&&(x(),Je.discardSettingsDraft(),T({setupOpen:!1,panelView:"home"}),Ke()),k&&w===p},async openSettings(w="audio",k="conversation"){let M=++p,q=await In();return q&&M===p&&(x(),T({setupOpen:!1,panelView:"settings",settingsTab:["audio","interaction","prompt","models","advanced","sessions","pets"].includes(w)?w:"audio",settingsModelTab:k,sessionManagementRoot:null,sessionHistoryOpen:!1}),Ke({settings:!0})),q&&M===p},readOperationLog:Yd,manageSessions:Qd,listExistingVoiceSessions:ep,retryVoiceTranscript:tt,setExistingVoiceSession:np,setSettingsTab(w){w!==a.settingsTab&&T({settingsTab:w,sessionManagementRoot:null,sessionHistoryOpen:!1})},setSettingsModelTab(w){T({settingsModelTab:w})},setSessionManagement({rootId:w=a.sessionManagementRoot,historyOpen:k}){T({sessionManagementRoot:w,sessionHistoryOpen:k})},senseVoiceAsrAction:tp,updateAction:Hn,dismissUpdate(w){w&&T({dismissedUpdateVersion:w})},openSetup(){++p,x(),T({setupOpen:!0}),Ke({settings:!0,force:!0}),!z&&!a.busy&&(async()=>{let w=P;await Je.run(w,"read-settings")&&P===w&&await Je.run(w,"status")})()},cancelPreview:In,discardDiagnostics:x,refreshAuthorization:jn,saveAuthorization:rp,openAuthorization:()=>jn({open:!0}),closeAuthorization({resumeSetup:w=!1}={}){return!a.authorizationBusy&&!a.authorizationLoading?(Bt=!w,++p,_o=p,T({authorizationOpen:!1,setupOpen:w}),w&&Ke({settings:!0}),!0):!1},async run(w,k,M={},q=!1){if(!C||st&&k==="status"||(st||a.existingSessionUnconfirmed)&&["enable","new","resume"].includes(k))return!1;let W=!!(q&&Fn.has(k)&&!a.uncertain&&a.checkedFor===w&&a.settingsFor===w&&a.status&&a.settings);if(W&&v.has(k))return!1;if(q||b(),k==="read-history"){if(P!==w||a.conversationHistoryLoading)return!1;let V=++o,_e=S,ln=I;T({conversationHistoryLoading:!0,conversationHistoryError:null,conversationHistoryRequestCursor:M.cursor??null});try{let De=await sn(w,{action:k,...M});if(!C||P!==w||_e!==S||V!==o||ln!==I||a.conversation?.rootSessionId&&(a.conversation.rootSessionId!==De.rootSessionId||De.scope!=="voice-session"&&a.conversation.historyGeneration!==De.generation))return!1;let On=a.conversationHistory;if(M.cursor&&(!On||On.generation!==De.generation||On.rootSessionId!==De.rootSessionId))return!1;let kr=new Map(De.items.map(hn=>[hn.id,hn]));if(M.cursor)for(let hn of On.items)kr.set(hn.id,hn);if(a.conversation?.rootSessionId===De.rootSessionId)for(let hn of a.conversation?.items??[])kr.set(hn.id,hn);let Ft=[...kr.values()].sort((hn,So)=>hn.at-So.at),_r=M.cursor?Ft.slice(0,4e3):Ft.slice(-4e3),ji=_r.reduce((hn,So)=>hn+So.text.length,0),Wi=Ft.length>4e3;for(;ji>4*1024*1024;)ji-=(M.cursor?_r.pop():_r.shift()).text.length,Wi=!0;return T({conversationHistory:{...De,items:_r,truncated:De.truncated||Wi||!!(M.cursor&&On?.truncated)},conversationHistoryFor:w}),!0}catch(De){return V===o&&T({conversationHistoryError:String(De?.message??De)}),!1}finally{V===o&&T({conversationHistoryLoading:!1})}}if(k==="apply-model-install"&&["save-models","save-tts"].some(V=>l.has(V)))return T({error:"\u8BF7\u5148\u4FDD\u5B58\u6216\u653E\u5F03\u6A21\u578B\u8BBE\u7F6E\u8349\u7A3F\uFF0C\u518D\u5207\u6362\u6A21\u578B\u3002"}),!1;if(k==="read-audio-devices")return ot(w);if(k==="inspect-performance")return Xd(w);if(k==="cancel-tts"){if(J)return In();try{let V=await sn(w,{action:k});return T({ttsPreview:V,ttsPreviewFor:w}),V.status==="unconfirmed"?(te({uncertain:!0,error:"\u65E0\u6CD5\u786E\u8BA4\u6717\u8BFB\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B\u3002"}),!1):!0}catch(V){return te({error:String(V?.message??V),uncertain:!0}),!1}}let ee=k==="disable"&&f&&!m;if(a.busy&&!ee||a.ttsCancelling||a.settingsConflict&&dr.includes(k)||a.agentPermissionUncertain&&k==="save-agent-permissions"||a.agentRequestUncertain&&k==="decide-agent-request"||a.ttsUncertain&&!It.includes(k)&&k!=="disable"||a.visibilityUncertain&&!It.includes(k)||a.outputVolumeUncertain&&k==="set-output-volume"||a.installerUncertain&&["start-model-install","control-model-install","apply-model-install"].includes(k))return!1;if(!w&&(w!==null||!Mu.has(k)))return T({error:"\u6B64\u64CD\u4F5C\u9700\u8981\u4F1A\u8BDD\u6765\u6E90"}),!1;let ke;if(ee&&(f.stale=!0,Fn.has(f.action)&&f.abort.abort(),ke=m=Symbol("diagnostic-stop")),!It.includes(k)){gt();for(let V of Fn)En(V)}(dr.includes(k)||pr.includes(k)&&k!=="status")&&it({clear:k!=="set-performance-mode"});let be;(_h.includes(k)||Fn.has(k))&&(be={id:w,action:k,abort:new AbortController,stale:!1},W?v.set(k,be):f=be),W||(y++,T({busy:!0,error:null,...k==="enable"?{enableError:null}:{},...k==="save-bindings"?{bindingError:null}:{},interruptibleRead:f?.action??null,diagnosticStopPending:!!m,...k==="listen-mode"?{listenModePending:M.mode,listenModeBefore:a.conversation?.helper?.listenMode??a.status?.listenMode}:{},...k!=="status"&&pr.includes(k)?{listenModeError:!1}:{}}));let Oe,Ge=S,Tn=ur(a.status),wn=a.checkedFor,$n=Re;try{if(be?.stale)return!1;let V;if(["read-output-volume","set-output-volume"].includes(k)){if(!_)throw new Error("\u8BED\u97F3\u8F93\u51FA\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let _e=be?.abort??new AbortController;de.add(_e);let ln;try{let De=k==="read-output-volume"?_.readVolume(w,_e.signal):_.setVolume(w,M,_e.signal),On=k==="read-output-volume"?await Promise.race([De,new Promise((kr,Ft)=>{ln=()=>Ft(new Error("Read cancelled")),_e.signal.addEventListener("abort",ln,{once:!0})})]):await De;V=Bn("output-volume",On)}finally{_e.signal.removeEventListener("abort",ln),de.delete(_e)}}else{if(k==="preview-tts"&&(Oe={id:w,abort:new AbortController,cancelled:!1},J=Oe,T({ttsPreview:{status:"preparing"},ttsPreviewFor:w})),Fn.has(k)){let _e,ln=new Promise((De,On)=>{_e=()=>On(new Error("Read cancelled")),be.abort.signal.addEventListener("abort",_e,{once:!0})});try{V=await Promise.race([sn(w,{...M,action:k},be.abort.signal),ln])}finally{be.abort.signal.removeEventListener("abort",_e)}}else V=await sn(w,{...M,action:k},Oe?.abort.signal??be?.abort.signal);if(be?.stale)return!1}if(be?.stale||It.includes(k)&&(!C||Ge!==S))return!1;if(Fn.has(k)&&En(k),["agent-permissions","save-agent-permissions"].includes(k)&&T({agentPermissions:V,agentPermissionsFor:w,agentPermissionUncertain:!1}),["agent-requests","decide-agent-request"].includes(k)&&(T({agentRequests:V,agentRequestsFor:w,agentRequestUncertain:!1}),k==="decide-agent-request"&&V.lastOutcome?.state==="completed"&&(T({checkedFor:null}),Ke({settings:!0,force:!0})),k==="decide-agent-request"&&V.lastOutcome?.state==="unknown"&&T({uncertain:!0,error:"\u64CD\u4F5C\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u5148\u8BFB\u53D6\u5B9E\u9645\u72B6\u6001\uFF0C\u4E0D\u8981\u91CD\u8BD5\u3002"})),pr.includes(k)){if(k==="listen-mode"){if(P!==w||Ge!==S)return!1;if(V.listenMode!==M.mode)throw new Error("\u8BF4\u8BDD\u65B9\u5F0F\u7684\u56DE\u6267\u5C1A\u672A\u786E\u8BA4")}if(Ge!==S)return!0;if(["status","disable"].includes(k)&&V.ttsRuntime){let De=!!(V.ttsRuntime.blocked||a.ttsUncertain&&(V.ttsRuntime.busy||$n!==Re));V.ttsRuntime.blocked&&Re++,T({ttsUncertain:De}),!De&&!V.ttsRuntime.busy&&!K&&J?.cancelled&&(J=null)}let _e=a.visibilityUncertain&&!(k==="status"&&a.visibilityReadbackFor===w),ln=Object.hasOwn(V,"existingVoiceSession");!ln&&Object.hasOwn(a.status??{},"existingVoiceSession")&&(V={...V,existingVoiceSession:a.status.existingVoiceSession,existingVoiceSessionSupported:a.status.existingVoiceSessionSupported}),T({status:V,checkedFor:w,uncertain:_e,visibilityUncertain:_e,..._e?{}:{visibilityReadbackFor:null},...W?{error:null}:{},...P===w?{sourcePending:!1}:{},...k==="status"&&ln?{existingSessionUnconfirmed:!1}:{},...k==="listen-mode"?{listenModeReceiptRevision:a.conversation?.revision??null}:{}}),Be&&(!V.enabled||V.existingVoiceSession?.sessionId!==Be.sessionId)&&nn(),["predecessor-cleanup-pending","helper-cleanup-pending"].includes(V.voiceSession?.recovery?.kind)?Hi(w):gt()}if(Gu.includes(k)&&(k!=="read-settings"&&Ge===S&&(l.delete(k),T({settingsDraftActions:[...l]})),k==="read-settings"&&l.size>0&&a.settingsFor===w&&a.settings?.revision!==V.revision?(c=V,T({settingsConflict:!0})):(c=null,T({settings:V,settingsFor:w,settingsConflict:!1,settingsKey:l.size>0?a.settingsKey:V.revision})),V.onboarding&&En("setup-status"),T({...V.onboarding?{setupStatus:V.onboarding,setupError:null}:{},...k==="read-settings"&&a.visibilityUncertain&&["hidden","workspace"].includes(V.voiceSession?.visibility)?{visibilityReadbackFor:w}:{}})),k==="read-settings"&&a.visibilityUncertain&&Ve(w,"status"),k==="conversation-models"&&T({conversationModels:V,conversationModelsFor:w,conversationModelsError:null}),k==="inspect-tts"&&T({ttsCapabilities:V,ttsCapabilitiesFor:w}),k==="save-tts"&&V.ttsSetup?.provider==="deepseek"&&V.ttsSetup.deepseekTextTransmissionAccepted&&!a.authorization?.scopes?.some(_e=>_e.id==="deepseek-text"&&_e.allowed)&&jn(),k==="preview-tts"&&!Oe.cancelled&&T({ttsPreview:{...V,status:"completed"},ttsPreviewFor:w}),["read-output-volume","set-output-volume"].includes(k)&&T({outputVolume:V,outputVolumeFor:w,outputVolumeUncertain:!1}),["save-voice-prompt","save-conversation-model","set-visibility","set-performance-mode","save-tts","apply-model-install"].includes(k)&&(T({status:null,checkedFor:null,catalog:null,catalogFor:null}),Ke({force:!0})),k==="plan-model-install"&&T({installPlan:V,installPlanFor:w,installPlanRequest:{...M}}),k==="model-installer"&&(T({installer:V,installerFor:w,installerUncertain:!!a.installerTerminationUnconfirmed}),P===w&&!L&&(L=!0,ht(!0))),k==="inspect-model-compute"&&a.installerFor===w&&a.installer&&T({installer:{...a.installer,compute:V}}),k==="start-model-install"&&T({installPlan:null,installPlanFor:null}),k==="list"){let _e=M.cursor&&a.catalogFor===w?a.catalog?.items??[]:[];T({catalog:{...V,items:[...new Map([..._e,...V.items].map(ln=>[ln.id,ln])).values()]},catalogFor:w})}return["new","resume","listen-mode"].includes(k)&&T({catalog:null}),["new","resume"].includes(k)&&P===w&&Ge===S&&(o++,T({...i,newChatFor:k==="new"&&M.expectedOwnerSessionId!==void 0?w:void 0})),k==="listen-mode"&&(a.setupOpen&&T({settingsFor:void 0}),Ke({settings:!0,force:!0})),["status","enable","disable","new","resume"].includes(k)&&P===w&&(k!=="status"||wn!==w||Tn!==ur(V)||A!==en()||a.conversationError)&&Mt(),!0}catch(V){return k==="listen-mode"&&(P!==w||Ge!==S)||(be&&(V?.uncertain||/TTS_TERMINATION_UNCONFIRMED/.test(String(V?.code??"")+" "+String(V?.message??"")))&&(k==="inspect-tts"?te({}):T({installerUncertain:!0,installerTerminationUnconfirmed:!0})),be?.stale||It.includes(k)&&Ge!==S)||Oe?.cancelled?!1:(k==="status"&&(gt(),P===w&&Ge===S&&T({sourcePending:!1})),It.includes(k)||(F=null),/AUTHORIZATION_REQUIRED/.test(String(V?.message??V))&&jn({open:!0}),Oe&&typeof V?.code=="string"&&V.code.startsWith("TTS_DEEPSEEK_")&&!V.uncertain?(await In()&&T({ttsPreview:{status:"failed",provider:"deepseek",detail:String(V.message).split(`
`)[0].slice(0,256)},ttsPreviewFor:w}),!1):(Oe&&await In(),k==="preview-tts"&&Re++,k==="enable"&&P===w&&Ge===S&&T({enableError:String(V?.message??V)+(V?.code?" ["+V.code+"]":"")}),k==="listen-mode"&&P===w&&Ge===S&&T({listenModeError:!0}),T({error:String(V?.message??V),...k==="conversation-models"?{conversationModelsError:String(V?.message??V),conversationModels:null,conversationModelsFor:w}:{},...k==="save-bindings"?{bindingError:String(V?.message??V)+(V?.code?" ["+V.code+"]":"")}:{},...k==="save-agent-permissions"?{agentPermissionUncertain:!0}:{},...k==="decide-agent-request"?{agentRequestUncertain:!0}:{},...k==="preview-tts"?{ttsPreviewFor:w,ttsUncertain:!0}:{},...k==="set-output-volume"?{outputVolumeUncertain:!0}:{},...dr.includes(k)?{uncertain:!0,visibilityUncertain:!0,visibilityReadbackFor:null}:{},...["start-model-install","control-model-install"].includes(k)?{installerUncertain:!0}:{},...pr.includes(k)?{uncertain:!0,readOnlyFailure:k==="status"&&(!a.uncertain||a.readOnlyFailure===!0)}:{}}),Fn.has(k)&&Ve(w,k),dr.includes(k)?(Ve(w,"read-settings"),Ve(w,"status")):pr.includes(k)&&k!=="status"?Ve(w,"status"):k==="set-output-volume"?Ve(w,"read-output-volume"):k==="save-agent-permissions"?Ve(w,"agent-permissions"):k==="decide-agent-request"?Ve(w,"agent-requests"):["start-model-install","control-model-install"].includes(k)&&Ve(w,"model-installer"),!1))}finally{v.get(k)===be&&v.delete(k),Oe&&J===Oe&&!Oe.cancelled&&(J=null),be&&f===be&&(f=null),ke&&m===ke&&(m=null),W||(y--,T({busy:y>0,interruptibleRead:f?.action??null,diagnosticStopPending:!!m,...k==="listen-mode"?{listenModePending:null}:{}})),queueMicrotask(()=>{xr(),vt()})}},dispose(){if(C){S++,ko(),l.clear(),c=null,T({settingsConflict:!1,settingsDraftActions:[]}),it({clear:!0}),rt({clear:!0}),gt(),In(),x(),f?.abort.abort(),Vn(),C=!1,I++,H++,D?.(),E?.();for(let w of de)w.abort();de.clear(),ce.clear()}}},Je}function mr(e,n,t,r=12){let o=n.left+r,i=n.top+r;return{x:Math.max(o,Math.min(e.x,Math.max(o,n.right-t.width-r))),y:Math.max(i,Math.min(e.y,Math.max(i,n.bottom-t.height-r)))}}function Yu(e=window){let n=null,t=null,r=null,o=null,i=null,a=null,l=null,c=null,u=null,d=()=>e.performance?.now?.()??Date.now(),p=e.matchMedia?.("(prefers-reduced-motion: reduce)"),f=()=>{c!==null&&e.cancelAnimationFrame?.(c),c=null,u&&(u=null,C("endDrag"))},m=A=>{if(c=null,!u||!n)return;if(p?.matches||n.dataset?.motion==="off"){f();return}let E=Math.max(0,A-u.time);u.time=A;let I={...o},H=!1;for(let L of["x","y"]){let J=u[L],K=(J.target-o[L])*Math.exp(-E/J.tau);I[L]=Math.abs(K)<.5?J.target:J.target-K,I[L]!==J.target&&(H=!0)}o=mr(I,i.box,i.size),v(),C("move");for(let L of["x","y"])Math.abs(o[L]-I[L])>.01&&(u[L].target=o[L]);!H||A-u.start>=2400?f():c=e.requestAnimationFrame(m)},y=(A,E)=>{n.style[A]!==E&&(n.style[A]=E)},v=()=>{y("left",`${o.x}px`),y("top",`${o.y}px`)},b=null,x=null,z="",F=()=>{let A=(n?.closest("[data-shell-overlay]")??n?.ownerDocument?.querySelector?.("[data-shell-overlay]"))?.getBoundingClientRect(),E=e.visualViewport,I=Math.max(A?.left??0,E?.offsetLeft??0),H=Math.max(A?.top??0,E?.offsetTop??0),L=Math.min(A?.right??e.innerWidth,(E?.offsetLeft??0)+(E?.width??e.innerWidth)),J=Math.min(A?.bottom??e.innerHeight,(E?.offsetTop??0)+(E?.height??e.innerHeight)),K=parseFloat(e.getComputedStyle(n).getPropertyValue("--dsh-frame-top-clearance"))||0;return{left:I,top:H+K,right:L,bottom:J}},Z=A=>{if(!n)return;let E=Number.isFinite(A?.width)&&Number.isFinite(A?.height),I=E&&i?i.box:F();y("maxWidth",`${Math.max(1,I.right-I.left-24)}px`),y("maxHeight",`${Math.max(1,I.bottom-I.top-24)}px`);let H=E?A:n.getBoundingClientRect();i={box:I,size:{width:H.width,height:H.height}},o=mr(o??{x:I.right-H.width-20,y:I.bottom-H.height-20},I,H),v(),!r&&!u&&C("resize")},N=()=>{l!==null&&e.cancelAnimationFrame?.(l),l=null},$=()=>{N();let A=a;a=null,!(!r||!n||!A)&&(o=mr(A,i.box,i.size),v(),C("move"))},S=A=>{n?.dataset&&(A&&["left","right","top","bottom"].includes(A.edge)&&["preview","docked"].includes(A.phase)?(n.dataset.whaleDockEdge=A.edge,n.dataset.whaleDockPhase=A.phase):(delete n.dataset.whaleDockEdge,delete n.dataset.whaleDockPhase))},O=()=>{let A=x;x=null;try{A?.dispose()}catch{}S(null),n&&(n.style.zIndex=z)},C=A=>{try{typeof x?.[A]=="function"&&x[A]()}catch{O()}},_=()=>{if(O(),!(!n||b?.version!==1||typeof b.register!="function"))try{x=b.register({id:"whale-voice",read(){let{box:A,size:E}=i;return{rect:{...o,width:E.width,height:E.height},bounds:{x:A.left+12,y:A.top+12,width:Math.max(1,A.right-A.left-24),height:Math.max(1,A.bottom-A.top-24)},collapsed:n.hasAttribute?.("data-collapsed")===!0}},apply(A){!n||!Number.isFinite(A?.x)||!Number.isFinite(A?.y)||(o=mr(A,i.box,i.size),v())},onDock:S,onFront:A=>{n&&(n.style.zIndex=A===!0?"901":"900")}}),["beginDrag","move","endDrag","resize","detach","dispose"].every(A=>typeof x?.[A]=="function")||O()}catch{O()}},P=(A=!1,E=!1)=>{A?$():(N(),a=null);let I=r;r=null,I?.target.hasPointerCapture?.(I.id)&&I.target.releasePointerCapture(I.id);let H=d(),L=I?.samples??[],J=L.at(-1),K=L[0],ce=J&&K?J.time-K.time:0,de=J?H-J.time:1/0,me=Math.max(0,1-Math.max(0,de-24)/56),j=ce>0?(J.x-K.x)/ce*me:0,T=ce>0?(J.y-K.y)/ce*me:0;if(I&&E&&!p?.matches&&n?.dataset?.motion!=="off"&&typeof e.requestAnimationFrame=="function"&&Math.hypot(j,T)>.04){let Y=mr({x:o.x+j*240,y:o.y+T*240},i.box,i.size),ue=(ge,Ie)=>({target:Y[ge],tau:Ie?Math.max(1,Math.abs((Y[ge]-o[ge])/Ie)):240});u={x:ue("x",j),y:ue("y",T),time:H,start:H},c=e.requestAnimationFrame(m)}else I&&C(A?"endDrag":"detach")},D=()=>{f(),P(),O(),t?.disconnect(),t=null,e.removeEventListener("resize",Z),e.visualViewport?.removeEventListener("resize",Z),e.visualViewport?.removeEventListener("scroll",Z),n=null,i=null};return{ref(A){if(A===n||(D(),!A))return;n=A,z=A.style.zIndex||"",n.style.transitionProperty="none",t=new e.ResizeObserver(I=>{let H=I?.find?.(J=>J.target===n),L=H?.borderBoxSize?.[0]??H?.borderBoxSize;Number.isFinite(L?.inlineSize)&&Number.isFinite(L?.blockSize)&&I.every(J=>J.target===n)?Z({width:L.inlineSize,height:L.blockSize}):Z()}),t.observe(n);let E=n.closest("[data-shell-overlay]")??n.ownerDocument?.querySelector?.("[data-shell-overlay]");E&&t.observe(E),e.addEventListener("resize",Z),e.visualViewport?.addEventListener("resize",Z),e.visualViewport?.addEventListener("scroll",Z),Z(),_()},useLayoutService(A){return b=A,_(),()=>{b===A&&(O(),b=null,Z())}},activate(){f(),C("activate")},pointerDown(A,E=A.currentTarget){A.button!==0||A.pointerType&&A.pointerType!=="mouse"||!n||(f(),Z(),C("beginDrag"),r={id:A.pointerId,target:E,x:A.clientX,y:A.clientY,start:{...o},samples:[{x:A.clientX,y:A.clientY,time:d()}]},E.setPointerCapture(A.pointerId),A.preventDefault())},pointerMove(A){if(!r||A.pointerId!==r.id)return;let E=d(),I=[A];try{I=[...A.getCoalescedEvents?.()??[],A]}catch{}for(let K of I){if(!Number.isFinite(K.clientX)||!Number.isFinite(K.clientY))continue;let ce=Number.isFinite(K.timeStamp)&&Number.isFinite(A.timeStamp)?Math.min(0,K.timeStamp-A.timeStamp):0,de=E+Math.max(-60,ce),me=r.samples.at(-1);if(de<me.time)continue;let j={x:K.clientX,y:K.clientY,time:de};de===me.time?r.samples[r.samples.length-1]=j:r.samples.push(j)}let H=E-60;for(;r.samples.length>2&&r.samples[1].time<=H;)r.samples.shift();let L=r.samples[0],J=r.samples[1];if(J&&L.time<H&&J.time>H){let K=(H-L.time)/(J.time-L.time);r.samples[0]={x:L.x+(J.x-L.x)*K,y:L.y+(J.y-L.y)*K,time:H}}a={x:r.start.x+A.clientX-r.x,y:r.start.y+A.clientY-r.y},typeof e.requestAnimationFrame!="function"?$():l===null&&(l=e.requestAnimationFrame($))},pointerEnd(A){A.pointerId===r?.id&&P(!["pointercancel","lostpointercapture"].includes(A.type),A.type==="pointerup")},keyDown(){},fit:Z,dispose:D}}var Oi=Object.freeze({panel:320,settings:660,setup:420,collapsed:216});function Qu(e=window,{onResize:n=()=>{}}={}){let t=null,r=null,o=null,i=null,a=null,l=null,c=null,u=null,d=null,p=null,f=null,m=null,y=null,v=null,b=null,x=null,z={width:0,height:0},F=e.matchMedia?.("(prefers-reduced-motion: reduce)"),Z=()=>F?.matches?"off":t?.dataset.motion??"spring",N=A=>Number.parseFloat(A)||0;function $(){let A=e.visualViewport,E=(t.closest?.("[data-shell-overlay]")??t.ownerDocument?.querySelector?.("[data-shell-overlay]"))?.getBoundingClientRect(),I=Math.max(E?.left??0,A?.offsetLeft??0),H=Math.max(E?.top??0,A?.offsetTop??0),L=Math.min(E?.right??e.innerWidth,(A?.offsetLeft??0)+(A?.width??e.innerWidth)),J=Math.min(E?.bottom??e.innerHeight,(A?.offsetTop??0)+(A?.height??e.innerHeight)),K=e.getComputedStyle(t);return{width:Math.max(1,L-I-24),height:Math.max(1,Math.min((J-H)*.6,J-H-24-N(K.getPropertyValue("--dsh-frame-top-clearance")))),chrome:N(K.paddingTop)+N(K.paddingBottom)+N(K.borderTopWidth)+N(K.borderBottomWidth),horizontalChrome:N(K.paddingLeft)+N(K.paddingRight)+N(K.borderLeftWidth)+N(K.borderRightWidth),panelRadius:N(K.getPropertyValue("--dsw-radius-lg"))||12}}function S(){c!==null&&e.cancelAnimationFrame(c),c=null,d=null}function O(){!t||!p||(p.width=Math.max(1,Math.min(p.width,m.width)),p.height=Math.max(1,Math.min(p.height,m.height)),t.style.width=`${p.width.toFixed(3)}px`,t.style.height=`${p.height.toFixed(3)}px`,t.style.setProperty?.("--whale-visible-content",`${Math.max(1,p.height-m.chrome)}px`),x===null?t.style.removeProperty?.("--whale-animated-radius"):t.style.setProperty?.("--whale-animated-radius",`${x.toFixed(2)}px`),n({width:p.width,height:p.height}))}function C(A){if(c=null,!t||!f)return;let E=Math.min(.032,Math.max(.001,d===null?1/60:(A-d)/1e3));d=A;let I=b?560:Z()==="firm"?420:360,H=b?47.4:Z()==="firm"?41:30,L=!0;for(let J of["width","height"]){for(let K=0;K<4;K++)z[J]+=(I*(f[J]-p[J])-H*z[J])*E/4,p[J]+=z[J]*E/4;(Math.abs(f[J]-p[J])>.25||Math.abs(z[J])>1)&&(L=!1)}if(b){let J=f.height-b.height,K=Math.abs(J)>.25?Math.max(0,Math.min(1,(p.height-b.height)/J)):1,ce=y?f.height/2:m.panelRadius;x=b.radius+(ce-b.radius)*K}(L||Z()==="off")&&(p={...f},z={width:0,height:0},d=null,b=x=null),O(),!L&&Z()!=="off"&&(c=e.requestAnimationFrame(C))}function _(){if(!t||!r)return;m=$(),t.dataset.compactHeight=m.height<300?"true":"false";let A=t.hasAttribute("data-collapsed")&&t.dataset.collapsed!=="false";if(p&&y!==null&&A!==y){let ge=x??(y?p.height/2:m.panelRadius);b={height:p.height,radius:ge},x=ge,t.style.setProperty?.("--whale-animated-radius",`${ge.toFixed(2)}px`),z={width:0,height:0}}let E=t.dataset.view,I=t.dataset.sourcePending&&E==="home"&&v===E&&!A&&y===A?f?.height:void 0;y=A,v=E;let H=Math.min(m.width,A?Oi.collapsed:Oi[E]??Oi.panel);t.style.boxSizing="border-box",t.style.transitionProperty="none",t.style.overflow="hidden",t.style.maxWidth=`${m.width}px`,t.style.maxHeight=`${m.height}px`;let L=Math.max(1,m.height-m.chrome);r.style.width=`${Math.max(1,H-m.horizontalChrome)}px`,r.style.maxHeight=`${L}px`,r.style.overflowY="hidden",r.style.minHeight="0",t.style.setProperty?.("--whale-content-limit",`${L}px`);let J=!!r.querySelector?.('[data-size-detail="true"]'),K=A?null:E==="setup"?r.querySelector?.("[data-whale-intrinsic]"):E==="home"&&!J?r.querySelector?.("[data-home-controls]"):null,ce=K?.querySelector?.("[data-whale-natural-content]"),de=ce??K;E==="setup"&&!A&&(r.style.height="auto"),de!==l&&(a?.disconnect(),u!==null&&e.cancelAnimationFrame(u),u=null,a=null,l=de,l&&e.ResizeObserver&&(a=new e.ResizeObserver(()=>{u===null&&(u=e.requestAnimationFrame(()=>{u=null,_()}))}),a.observe(l)));let me=K?.getBoundingClientRect?.().height,j=ce?Math.max(0,ce.offsetHeight-ce.parentElement.clientHeight):0,T=me+j,Y=A?44:T>0?Math.ceil(T+m.chrome):E==="home"?J?520:320:480,ue=Math.min(m.height,I??Y);(E!=="setup"||A)&&(r.style.height=`${Math.max(1,ue-m.chrome)}px`),f={width:H,height:ue},!p||Z()==="off"?(S(),p={...f},z={width:0,height:0},b=x=null,O()):c===null&&(Math.abs(p.width-H)>.25||Math.abs(p.height-ue)>.25)&&(d=e.performance?.now?.()??null,c=e.requestAnimationFrame(C))}function P(){S(),o?.disconnect(),i?.disconnect(),a?.disconnect(),u!==null&&e.cancelAnimationFrame(u),u=null,a=l=null,e.removeEventListener("resize",_),e.visualViewport?.removeEventListener("resize",_),e.visualViewport?.removeEventListener("scroll",_),F?.removeEventListener?.("change",_),o=i=null}function D(){if(P(),!(!t||!r)){if(e.ResizeObserver){o=new e.ResizeObserver(_);let A=t.closest?.("[data-shell-overlay]")??t.ownerDocument?.querySelector?.("[data-shell-overlay]");A&&o.observe(A)}e.MutationObserver&&(i=new e.MutationObserver(_),i.observe(t,{attributes:!0,attributeFilter:["data-view","data-motion","data-collapsed","data-source-pending"]}),i.observe(r,{attributes:!0,attributeFilter:["data-size-detail","data-home-layout"],subtree:!0})),e.addEventListener("resize",_),e.visualViewport?.addEventListener("resize",_),e.visualViewport?.addEventListener("scroll",_),F?.addEventListener?.("change",_),_()}}return{ref(A){t!==A&&(t=A,p=f=y=v=b=x=null,z={width:0,height:0},D())},contentRef(A){r!==A&&(r=A,D())},update:_,dispose(){P(),t=r=p=f=null}}}var ed=["spring","firm","off"];function nd(e=window){let n="dsh-whale-voice:motion:v1",t="dsh-whale-voice:assistant-name:v1",r=()=>{try{let u=e.localStorage.getItem(t)?.trim();return u&&u.length<=40?u:null}catch{return null}},o=new Set,i=()=>{try{let u=e.localStorage.getItem(n);return ed.includes(u)?u:"spring"}catch{return"spring"}},a={motion:i(),assistantName:r(),error:null},l=u=>{a=u;for(let d of o)d()},c=u=>{[n,t,null].includes(u.key)&&l({motion:i(),assistantName:r(),error:null})};return e.addEventListener("storage",c),{getSnapshot:()=>a,subscribe(u){return o.add(u),()=>o.delete(u)},setMotion(u){if(!ed.includes(u))return!1;let d=null;try{e.localStorage.setItem(n,u)}catch{d="storage-unavailable"}return l({...a,motion:u,error:d}),!d},setAssistantName(u){if(typeof u!="string"||!u.trim()||u.trim().length>40)return!1;let d=u.trim(),p=null;try{e.localStorage.setItem(t,d)}catch{p="storage-unavailable"}return l({...a,assistantName:d,error:p}),!p},dispose(){e.removeEventListener("storage",c),o.clear()}}}var Ah='button,input,textarea,select,a,label,summary,[role="button"],[role="slider"],[role="tab"],[contenteditable="true"],[data-no-drag]';function td(e,n){if(!e||!n?.contains(e))return!1;let t=e.closest?.(Ah);return!t||t.hasAttribute("data-drag-surface")}function rd(e){if(e.repeat||e.metaKey)return null;let n=e.code;return!/^(F([1-9]|1[0-9]|2[0-4])|Key[A-Z]|Digit[0-9]|Space)$/.test(n)||e.altKey&&n==="F4"?null:{code:n,modifiers:[e.ctrlKey&&"Control",e.altKey&&"Alt",e.shiftKey&&"Shift"].filter(Boolean)}}var lo=()=>({revision:0,rootSessionId:null,title:null,latest:null,items:[],inputActive:!1,inputError:null,playbackConfirmed:!1}),Ui=()=>({schema:1,hardware:null,compute:{schema:1,default:"cpu",observedAt:null,backends:{},reason:"\u5C1A\u672A\u68C0\u6D4B\u672C\u5730\u8BA1\u7B97\u540E\u7AEF\u3002"},models:[],jobs:[]});async function od(e,n=()=>{}){let t=await e.remote.$mount(qu),r,o;try{if(o=e.inject(["remote","remote.whaleConversation"],d=>{r=d.remote.whaleConversation}),await o.await(),!r)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA")}catch(d){throw await o?.dispose(),await t(),d}let i=new Set,a=new Map,l=!1,c=d=>{if(d?.ok!==!0)throw d?.error??new Error("\u8BED\u97F3\u63A5\u53E3\u54CD\u5E94\u65E0\u6548");return d.value},u=async(d,p,f=!0)=>{let m;try{m=await d()}catch(y){throw f&&!l&&n("ui-request","finished",p?.aborted?"cancelled":"failed"),y}return f&&m?.ok!==!0&&m?.error==null&&!p?.aborted&&n("ui-render-error","finished","failed"),c(m)};return{subscribeUpdates(d,p){let f=new AbortController;return i.add(f),Promise.resolve().then(async()=>{if(!f.signal.aborted)try{for await(let m of r.followUpdates(f.signal))f.signal.aborted||d(m);f.signal.aborted||(n("ui-stream","finished","failed"),p())}catch{f.signal.aborted||(n("ui-stream","finished","failed"),p())}finally{i.delete(f)}}),()=>{f.abort(),i.delete(f)}},updateAction(d,p){if(l)throw new Error("\u66F4\u65B0\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>r.updateAction(d,p),p)},subscribePresentation(d,p){let f=new AbortController;return i.add(f),(async()=>{try{for await(let m of r.followPresentation(f.signal))f.signal.aborted||d(m);f.signal.aborted||(n("ui-stream","finished","failed"),p(new Error("\u4F1A\u8BDD\u663E\u793A\u8FDE\u63A5\u5DF2\u7ED3\u675F")))}catch(m){f.signal.aborted||(n("ui-stream","finished","failed"),p(m))}finally{i.delete(f)}})(),()=>{f.abort(),i.delete(f)}},subscribe(d,p,f=()=>{}){let m=new AbortController;return i.add(m),p(lo(),{initial:!0}),(async()=>{try{for await(let y of r.follow(d,m.signal))m.signal.aborted||p(y);m.signal.aborted||(n("ui-stream","finished","failed"),p(lo(),{initial:!0}),f(new Error("\u8BED\u97F3\u72B6\u6001\u8FDE\u63A5\u5DF2\u7ED3\u675F\uFF0C\u6B63\u5728\u91CD\u65B0\u8FDE\u63A5")))}catch(y){m.signal.aborted||(n("ui-stream","finished","failed"),p(lo(),{initial:!0}),f(y))}finally{i.delete(m)}})(),()=>{m.abort(),i.delete(m),p(lo(),{initial:!0})}},subscribeModels(d,p,f=()=>{}){if(l)return p(Ui(),{initial:!0}),f(new Error("\u6A21\u578B\u8FDB\u5EA6\u63A5\u53E3\u5DF2\u5378\u8F7D")),()=>{};let m=new AbortController,y=!1,v=()=>{y||(y=!0,m.abort(),a.delete(m),p(Ui(),{initial:!0}))};return a.set(m,v),p(Ui(),{initial:!0}),(async()=>{try{for await(let b of r.followModels(d,m.signal))!y&&!l&&!m.signal.aborted&&p(b);!y&&!l&&!m.signal.aborted&&(n("ui-stream","finished","failed"),v(),f(new Error("\u6A21\u578B\u8FDB\u5EA6\u8FDE\u63A5\u5DF2\u7ED3\u675F\uFF0C\u6B63\u5728\u91CD\u65B0\u8FDE\u63A5")))}catch(b){!y&&!l&&!m.signal.aborted&&(n("ui-stream","finished","failed"),v(),f(b))}finally{a.delete(m)}})(),v},async action(d,p,f){if(l)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");let m=await u(()=>r.action(d,p,f),f);try{let y=JSON.parse(m);if(y?.protocol!==1||y.action!==p.action||!y.value||typeof y.value!="object"||Array.isArray(y.value))throw new Error("Fish Voice UI protocol mismatch");return y.value}catch(y){throw n("ui-render-error","finished","failed"),y}},readAuthorization:d=>u(()=>r.readAuthorization(d),d),saveAuthorization:(d,p)=>u(()=>r.saveAuthorization(d,p),p),async senseVoiceAsrAction(d,p){if(l)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>r.senseVoiceAsrAction(d,p),p)},async manageSessions(d,p,f){if(l)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");return JSON.parse(await u(()=>r.manageSessions(d,p,f),f))},listExistingVoiceSessions(d,p){if(l)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>r.listExistingVoiceSessions(d,p),p)},setExistingVoiceSession(d,p){if(l)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>r.setExistingVoiceSession(d,p),p)},retryVoiceTranscript(d,p){if(l)throw new Error("\u8BED\u97F3\u91CD\u53D1\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>r.retryVoiceTranscript(d,p),p)},readClientOperationScope(d){if(l)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>r.readClientOperationScope(d),d,!1)},recordClientOperations(d,p){if(l)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>r.recordClientOperations(d,p),p,!1)},readOperationLog(d,p){if(l)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>r.readOperationLog(d,p),p,!1)},readSetup:d=>u(()=>r.readSetup(d),d),readVolume:(d,p)=>u(()=>r.readVolume(d,p),p),setVolume:(d,p,f)=>u(()=>r.setVolume(d,p,f),f),async dispose(){l=!0;for(let d of[...a.values()])d();a.clear();for(let d of i)d.abort();i.clear(),await o.dispose(),await t()}}}var sd=new Set(oo),ld=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,id=256,Ri="dsh-fish-voice.pending-operation-log.v1",Di="ui-buffer-overflow";function Sh(){let e=globalThis.crypto;if(e?.randomUUID)return e.randomUUID();let n=e?.getRandomValues(new Uint8Array(16));if(!n)return null;n[6]=n[6]&15|64,n[8]=n[8]&63|128;let t=Array.from(n,r=>r.toString(16).padStart(2,"0")).join("");return[t.slice(0,8),t.slice(8,12),t.slice(12,16),t.slice(16,20),t.slice(20)].join("-")}function zh(){try{return globalThis.sessionStorage}catch{return}}function ad(e,n=!1){if(!e||typeof e.id!="string"||!ld.test(e.id)||!Number.isSafeInteger(e.at)||e.at<0||!sd.has(e.action)||!["user","ui"].includes(e.source)||n!==(e.action===Di)||n&&(e.source!=="ui"||!Number.isSafeInteger(e.count)||e.count<1))return null;let{id:t,at:r,action:o,source:i}=e;return{id:t,at:r,action:o,source:i,...n?{count:e.count}:{},...["requested","finished"].includes(e.phase)?{phase:e.phase}:{},...["ok","failed","cancelled"].includes(e.result)?{result:e.result}:{}}}function cd({schedule:e=setTimeout,unschedule:n=clearTimeout,now:t=Date.now,identify:r=Sh,storage:o=zh()}={}){let i=[],a=null,l=null,c=null,u=!1,d,p,f,m=0,y=!1,v=()=>{p!==void 0&&(n(p),p=void 0)},b=_=>_&&_.at>=t()-Eu,x=()=>{i=i.filter(b),b(a)||(a=null),b(l)||(l=null)},z=()=>i.length>0||a!==null||l!==null,F=()=>{if(!(!c||!o))try{z()?o.setItem(Ri,JSON.stringify({scope:c,pending:i,overflow:a,dropped:l})):o.removeItem(Ri)}catch{}},Z=(_,P)=>{l={count:Math.min(Number.MAX_SAFE_INTEGER,(l?.count??0)+_),at:Math.max(l?.at??0,P)}},N=_=>{i.length>=id?Z(1,_.at):i.push(_)},$=_=>{if(c===null){let P;try{P=JSON.parse(o?.getItem(Ri)??"null")}catch{}if(P?.scope===_){let D=i,A=l,E=Array.isArray(P.pending)?P.pending.slice(0,id).map(I=>ad(I)).filter(b):[];i=[...new Map(E.map(I=>[I.id,I])).values()],a=ad(P.overflow,!0),l=P.dropped&&Number.isSafeInteger(P.dropped.count)&&P.dropped.count>0&&Number.isSafeInteger(P.dropped.at)&&b(P.dropped)?{count:P.dropped.count,at:P.dropped.at}:null,A&&Z(A.count,A.at);for(let I of D)b(I)&&N(I)}}else c!==_&&(i=[],a=null,l=null);c=_,u=!0,x(),F()},S=(_=160)=>{y||f||p!==void 0||u&&!z()||!d?.readClientOperationScope||!d?.recordClientOperations||(p=e(()=>{p=void 0,O()},_),p?.unref?.())};async function O(){let _=new AbortController,P=d;f=_;let D=()=>!y&&d===P&&f===_;try{let A=AbortSignal.any([_.signal,AbortSignal.timeout(1e4)]);if(!u){let L=await P.readClientOperationScope(A);if(!D())return;if(typeof L?.scope!="string"||!ld.test(L.scope))throw new Error("Operation scope unavailable");$(L.scope)}if(x(),!a&&l){let L=r();L&&(a={id:L,at:l.at,action:Di,source:"ui",phase:"finished",count:l.count},l=null)}F();let E=a?[a,...i.slice(0,lr-1)]:i.slice(0,lr);if(!E.length)return;let I=await P.recordClientOperations({scope:c,events:E},A);if(!D())return;if(I?.accepted!==!0)throw new Error("Operation batch was not accepted");let H=new Set(E.map(L=>L.id));i=i.filter(L=>!H.has(L.id)),a&&H.has(a.id)&&(a=null),m=0,F()}catch{D()&&(u=!1,m++)}finally{D()&&(f=void 0,S(m?Math.min(3e4,750*2**Math.min(m-1,6)):160))}}function C(_,P,D,A){if(y||!sd.has(_)||_===Di)return;let E;try{E=r()}catch{return}E&&(x(),N({id:E,at:t(),action:_,source:P,...D?{phase:D}:{},...A?{result:A}:{}}),F(),S())}return{user(_){C(_,"user")},internal(_,P,D){C(_,"ui",P,D)},attach(_){d===_||y||(v(),f?.abort(),f=void 0,d=_,u=!1,m=0,S(0))},dispose(){y=!0,v(),f?.abort(),i=[],a=null,l=null}}}var Zd=require("react-dom");var Ze=require("react"),co=require("@deepseek-ai/dsh-client-ui-primitives");var h={voicePromptMode:"kAbr0a_voicePromptMode",whalePageEnter:"kAbr0a_whalePageEnter",field:"kAbr0a_field",voicePromptInput:"kAbr0a_voicePromptInput",existingSessionHome:"kAbr0a_existingSessionHome",authorizationActions:"kAbr0a_authorizationActions",mouseBinding:"kAbr0a_mouseBinding",currentDshTarget:"kAbr0a_currentDshTarget",mainAction:"kAbr0a_mainAction",headerActions:"kAbr0a_headerActions",bubble:"kAbr0a_bubble",voicePromptCount:"kAbr0a_voicePromptCount",newMessages:"kAbr0a_newMessages",openOriginal:"kAbr0a_openOriginal",bindingEditor:"kAbr0a_bindingEditor",brand:"kAbr0a_brand",quickSpeedHeader:"kAbr0a_quickSpeedHeader",keyBindingRow:"kAbr0a_keyBindingRow",audioDeviceHint:"kAbr0a_audioDeviceHint",floating:"kAbr0a_floating",bubbleStatus:"kAbr0a_bubbleStatus",volumeRow:"kAbr0a_volumeRow",homeTargetPicker:"kAbr0a_homeTargetPicker",caption:"kAbr0a_caption",status:"kAbr0a_status",guideButton:"kAbr0a_guideButton",performanceChoice:"kAbr0a_performanceChoice",markSmall:"kAbr0a_markSmall",quickConversation:"kAbr0a_quickConversation",existingSessionList:"kAbr0a_existingSessionList",whaleFeedback:"kAbr0a_whaleFeedback",assistantName:"kAbr0a_assistantName",ellipsis:"kAbr0a_ellipsis",editNotice:"kAbr0a_editNotice",placeholder:"kAbr0a_placeholder",error:"kAbr0a_error",bindingActions:"kAbr0a_bindingActions",sliderLabel:"kAbr0a_sliderLabel",whalePreview:"kAbr0a_whalePreview",assistantNameInput:"kAbr0a_assistantNameInput",homeTargetRow:"kAbr0a_homeTargetRow",fullName:"kAbr0a_fullName",newChatButton:"kAbr0a_newChatButton",details:"kAbr0a_details",inlineActions:"kAbr0a_inlineActions",actions:"kAbr0a_actions",mark:"kAbr0a_mark",settings:"kAbr0a_settings",keyBinding:"kAbr0a_keyBinding",modelNav:"kAbr0a_modelNav",motionPreview:"kAbr0a_motionPreview",existingSessionTarget:"kAbr0a_existingSessionTarget",whaleSpin:"kAbr0a_whaleSpin",audioDeviceField:"kAbr0a_audioDeviceField",settingsLayout:"kAbr0a_settingsLayout",volumeControl:"kAbr0a_volumeControl",primary:"kAbr0a_primary",conversationChoice:"kAbr0a_conversationChoice",pageHeading:"kAbr0a_pageHeading",currentDshAction:"kAbr0a_currentDshAction",modelHeading:"kAbr0a_modelHeading",quickSegments:"kAbr0a_quickSegments",updateDialog:"kAbr0a_updateDialog",conversationHeader:"kAbr0a_conversationHeader",inputCaptionReceipt:"kAbr0a_inputCaptionReceipt",settingsNav:"kAbr0a_settingsNav",messageName:"kAbr0a_messageName",backButton:"kAbr0a_backButton",voiceStatus:"kAbr0a_voiceStatus",inputCaption:"kAbr0a_inputCaption",voicePrompt:"kAbr0a_voicePrompt",inlineField:"kAbr0a_inlineField",statusRow:"kAbr0a_statusRow",audioDeviceNotice:"kAbr0a_audioDeviceNotice",spin:"kAbr0a_spin",popover:"kAbr0a_popover",quickSpeed:"kAbr0a_quickSpeed",radios:"kAbr0a_radios",permissionList:"kAbr0a_permissionList",inputCaptions:"kAbr0a_inputCaptions",note:"kAbr0a_note",voiceTarget:"kAbr0a_voiceTarget",sessionRename:"kAbr0a_sessionRename",quickHint:"kAbr0a_quickHint",message:"kAbr0a_message",recentMessages:"kAbr0a_recentMessages",settingsBody:"kAbr0a_settingsBody",audioDeviceGrid:"kAbr0a_audioDeviceGrid",updateAnnouncement:"kAbr0a_updateAnnouncement",inputCaptionText:"kAbr0a_inputCaptionText",whaleInputPulse:"kAbr0a_whaleInputPulse",backIcon:"kAbr0a_backIcon",disclosureRow:"kAbr0a_disclosureRow",authorizationSteps:"kAbr0a_authorizationSteps",agreement:"kAbr0a_agreement",existingSessionSearch:"kAbr0a_existingSessionSearch",deviceSelect:"kAbr0a_deviceSelect",settingsPage:"kAbr0a_settingsPage",segmented:"kAbr0a_segmented",hint:"kAbr0a_hint",notice:"kAbr0a_notice",requestDetails:"kAbr0a_requestDetails",authorization:"kAbr0a_authorization",settingsBrand:"kAbr0a_settingsBrand",updateHeader:"kAbr0a_updateHeader",sessionTitle:"kAbr0a_sessionTitle",iconButton:"kAbr0a_iconButton",historyScope:"kAbr0a_historyScope",formActions:"kAbr0a_formActions",panelContent:"kAbr0a_panelContent",settingsHeader:"kAbr0a_settingsHeader",section:"kAbr0a_section",audioDevices:"kAbr0a_audioDevices",loadHistory:"kAbr0a_loadHistory",popoverHeader:"kAbr0a_popoverHeader",whaleEnter:"kAbr0a_whaleEnter",authorizationBody:"kAbr0a_authorizationBody",whaleBreathe:"kAbr0a_whaleBreathe",bubbleBrand:"kAbr0a_bubbleBrand",conversationOptions:"kAbr0a_conversationOptions",panelViewport:"kAbr0a_panelViewport",quickActions:"kAbr0a_quickActions",capabilityRow:"kAbr0a_capabilityRow",voiceBars:"kAbr0a_voiceBars",currentModel:"kAbr0a_currentModel",pathRow:"kAbr0a_pathRow",header:"kAbr0a_header",voicePromptActions:"kAbr0a_voicePromptActions",existingSessionPicker:"kAbr0a_existingSessionPicker",text:`.kAbr0a_floating {
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

[data-ds-dark-theme] .kAbr0a_floating {
  --whale-solid-base: var(--dsw-static-neutral-bluish-950, #181a1e);
}

.kAbr0a_floating[data-collapsed] {
  border-radius: var(--whale-animated-radius, 999px);
  corner-shape: round;
  width: 216px;
  padding: 4px;
}

.kAbr0a_floating[data-view="settings"] {
  width: 660px;
  padding: 0;
}

.kAbr0a_floating[data-view="setup"]:not([data-collapsed]) {
  width: 420px;
}

.kAbr0a_floating:active {
  cursor: grabbing;
}

.kAbr0a_floating[data-whale-dock-phase="preview"] {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

.kAbr0a_floating [hidden] {
  display: none !important;
}

.kAbr0a_floating [data-no-drag] {
  cursor: auto;
  touch-action: pan-y;
}

.kAbr0a_panelViewport {
  overscroll-behavior: contain;
  min-width: 0;
  min-height: 0;
  overflow-x: hidden;
}

.kAbr0a_panelContent {
  min-width: 0;
  animation: kAbr0a_whaleEnter var(--whale-duration) var(--whale-ease);
}

.kAbr0a_mark {
  flex: none;
  width: 24px;
  height: 24px;
}

.kAbr0a_markSmall {
  flex: none;
  width: 20px;
  height: 20px;
}

.kAbr0a_brand, .kAbr0a_header, .kAbr0a_headerActions, .kAbr0a_actions, .kAbr0a_statusRow, .kAbr0a_caption {
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.kAbr0a_brand {
  font-size: 15px;
}

.kAbr0a_header {
  justify-content: space-between;
  margin-bottom: 12px;
}

.kAbr0a_headerActions {
  gap: 2px;
}

.kAbr0a_actions {
  flex-wrap: wrap;
}

.kAbr0a_iconButton {
  flex: none;
  width: 32px;
  min-width: 32px;
  height: 32px;
  padding: 0;
}

.kAbr0a_newChatButton {
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

.kAbr0a_newChatButton svg {
  width: 14px;
  height: 14px;
}

.kAbr0a_ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
}

.kAbr0a_statusRow {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  margin-bottom: 10px;
  padding: 4px 6px;
}

.kAbr0a_statusRow[data-recording] {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 19%,var(--dsw-alias-bg-module-platform));
}

.kAbr0a_statusRow[data-recording] .kAbr0a_voiceStatus > svg {
  color: var(--dsw-alias-brand-primary);
}

.kAbr0a_status {
  flex: 1;
  min-width: 0;
  margin: 0;
  font-size: 12px;
  line-height: 18px;
}

.kAbr0a_voiceTarget {
  flex: 1;
  align-items: center;
  gap: 4px;
  min-width: 0;
  line-height: 18px;
  display: flex;
}

.kAbr0a_voiceTarget > span, .kAbr0a_existingSessionHome > span {
  color: var(--dsw-alias-label-secondary);
  flex: none;
  font-size: 11px;
}

.kAbr0a_voiceTarget strong {
  font-size: 13px;
  font-weight: 600;
}

.kAbr0a_voiceStatus {
  align-items: center;
  gap: 4px;
  max-width: 47%;
  display: flex;
}

.kAbr0a_voiceStatus > svg {
  flex: none;
  width: 14px;
  height: 14px;
}

.kAbr0a_statusRow[data-bound] {
  flex-direction: column;
  align-items: stretch;
  gap: 0;
}

.kAbr0a_statusRow[data-bound] .kAbr0a_voiceStatus {
  max-width: 100%;
}

.kAbr0a_mainAction {
  width: 100%;
  min-height: 36px;
  font-weight: 500;
}

.kAbr0a_primary {
  color: var(--dsw-alias-label-primary) !important;
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 16%,var(--dsw-alias-bg-layer-2)) !important;
  border: 1px solid var(--dsw-alias-border-l2) !important;
}

.kAbr0a_bubble {
  corner-shape: round;
  cursor: grab;
  touch-action: none;
  width: 100%;
  max-width: 100%;
  height: 36px;
  animation: kAbr0a_whaleEnter var(--whale-duration) var(--whale-ease);
  border-radius: 999px;
  justify-content: flex-start;
  gap: 8px;
}

.kAbr0a_bubble .kAbr0a_ellipsis {
  text-align: left;
  flex: 1;
}

.kAbr0a_caption {
  text-align: left;
  justify-content: flex-start;
  width: 100%;
  margin-top: 8px;
  padding: 6px 0;
  font-size: 12px;
}

.kAbr0a_caption .kAbr0a_ellipsis {
  flex: 1;
}

.kAbr0a_openOriginal {
  flex: none;
}

.kAbr0a_hint, .kAbr0a_quickHint {
  color: var(--dsw-alias-label-secondary);
  overflow-wrap: anywhere;
  font-size: 12px;
}

.kAbr0a_hint {
  margin: 6px 0;
}

.kAbr0a_quickHint {
  margin: 0;
  font-size: 11px;
}

.kAbr0a_notice, .kAbr0a_note, .kAbr0a_error {
  border-radius: var(--dsw-radius-sm);
  overflow-wrap: anywhere;
  background: var(--dsw-alias-bg-module-platform);
  margin: 8px 0;
  padding: 8px 10px;
  font-size: 12px;
}

.kAbr0a_notice, .kAbr0a_note {
  border-left: 2px solid var(--dsw-alias-state-warn-primary);
}

.kAbr0a_error {
  border-left: 2px solid var(--dsw-alias-state-error-primary);
}

.kAbr0a_error button {
  margin-top: 8px;
}

.kAbr0a_popover {
  box-sizing: border-box;
  cursor: auto;
  touch-action: auto;
  width: 100%;
  animation: kAbr0a_whaleEnter var(--whale-duration) var(--whale-ease);
  margin: 0 0 10px;
  padding: 12px;
  position: relative;
  overflow: auto;
}

.kAbr0a_popoverHeader {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  display: flex;
}

.kAbr0a_popoverHeader > button {
  width: 28px;
  padding: 0;
}

.kAbr0a_quickConversation {
  max-height: 160px;
}

.kAbr0a_recentMessages {
  gap: 6px;
  display: grid;
}

.kAbr0a_message {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  padding: 5px 8px;
}

.kAbr0a_message strong {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

.kAbr0a_message p {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  margin: 3px 0 0;
}

.kAbr0a_quickActions {
  gap: 6px;
  min-width: 0;
  display: grid;
}

.kAbr0a_quickSpeed {
  gap: 5px;
  padding-top: 4px;
  display: grid;
}

.kAbr0a_quickSpeedHeader {
  color: var(--dsw-alias-label-secondary);
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  display: flex;
}

.kAbr0a_quickSpeedHeader small {
  font-size: 11px;
}

.kAbr0a_quickSegments {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  gap: 3px;
  padding: 3px;
  display: grid;
}

.kAbr0a_quickSegments button {
  min-width: 0;
  height: 28px;
  min-height: 28px;
  padding: 0 5px;
  font-size: 12px;
}

.kAbr0a_quickSegments button[aria-pressed="true"] {
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: 0 1px 3px #0001;
}

.kAbr0a_settings {
  height: 100%;
  min-height: 0;
  color: var(--dsw-alias-label-primary);
  flex-direction: column;
  display: flex;
  overflow: hidden;
}

.kAbr0a_settingsHeader {
  box-sizing: border-box;
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 4px 10px;
  display: flex;
}

.kAbr0a_settingsHeader h2 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.kAbr0a_settingsBrand {
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 6px;
  min-width: 0;
  display: flex;
}

.kAbr0a_backButton, .kAbr0a_guideButton {
  flex: none;
  padding: 0 8px;
  font-size: 12px;
}

.kAbr0a_backIcon {
  transform: rotate(180deg);
}

.kAbr0a_settingsLayout {
  flex: 1;
  grid-template-rows: minmax(0, 1fr);
  grid-template-columns: 104px minmax(0, 1fr);
  min-height: 0;
  display: grid;
  overflow: hidden;
}

.kAbr0a_settingsNav {
  border-right: 1px solid var(--dsw-alias-border-l2);
  background: var(--dsw-alias-bg-module-platform);
  flex-direction: column;
  gap: 3px;
  min-height: 0;
  padding: 8px 6px;
  display: flex;
  overflow-y: auto;
}

.kAbr0a_settingsNav button {
  justify-content: flex-start;
  min-width: 0;
  min-height: 34px;
  padding: 0 12px;
  font-size: 12px;
}

.kAbr0a_settingsNav button[aria-pressed="true"] {
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: inset 2px 0 0 var(--dsw-alias-brand-primary);
  font-weight: 600;
}

.kAbr0a_settingsPage {
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  display: flex;
  overflow: hidden;
}

.kAbr0a_pageHeading {
  flex: none;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 10px 12px 8px;
  display: flex;
}

.kAbr0a_pageHeading h3 {
  margin: 0;
  font-size: 15px;
}

.kAbr0a_pageHeading p {
  color: var(--dsw-alias-label-secondary);
  margin: 3px 0 0;
  font-size: 12px;
}

.kAbr0a_settingsBody {
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

.kAbr0a_settingsBody > .kAbr0a_section, .kAbr0a_settingsBody > div > .kAbr0a_section {
  margin: 0 0 12px;
}

.kAbr0a_section {
  align-content: start;
  gap: 8px;
  min-width: 0;
  display: grid;
}

.kAbr0a_section h3 {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
}

.kAbr0a_section p, .kAbr0a_section > .kAbr0a_section {
  margin: 0;
}

.kAbr0a_settingsBody > .kAbr0a_section + .kAbr0a_section {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

.kAbr0a_section summary {
  cursor: pointer;
  padding: 7px 0;
  font-size: 13px;
  font-weight: 500;
}

details.kAbr0a_section {
  border-top: 1px solid var(--dsw-alias-border-l2);
  display: block;
}

details.kAbr0a_section > :not(summary) {
  margin-top: 10px;
}

.kAbr0a_field {
  gap: 6px;
  font-size: 12px;
  display: grid;
}

.kAbr0a_field input {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}

.kAbr0a_deviceSelect {
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

.kAbr0a_radios {
  border: 0;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
  margin: 0;
  padding: 0;
  display: flex;
}

.kAbr0a_radios legend {
  margin-bottom: 6px;
  font-size: 12px;
}

.kAbr0a_radios label {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  cursor: pointer;
  align-items: center;
  gap: 6px;
  padding: 6px 9px;
  font-size: 12px;
  display: flex;
}

.kAbr0a_radios input {
  accent-color: var(--dsw-alias-brand-primary);
}

.kAbr0a_bindingEditor {
  gap: 14px;
  display: grid;
}

.kAbr0a_keyBinding {
  gap: 6px;
  display: grid;
}

.kAbr0a_keyBinding > :is(h3, p) {
  margin: 0;
}

.kAbr0a_keyBindingRow {
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 12px;
  min-width: 0;
  display: flex;
}

.kAbr0a_keyBindingRow > span {
  overflow-wrap: anywhere;
  min-width: 5em;
  font-size: 13px;
}

.kAbr0a_mouseBinding legend {
  font-size: 14px;
  font-weight: 600;
}

.kAbr0a_mouseBinding label {
  white-space: nowrap;
}

.kAbr0a_bindingActions {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

.kAbr0a_segmented {
  flex-wrap: wrap;
  gap: 4px;
  display: flex;
}

.kAbr0a_segmented button {
  min-width: 0;
  font-size: 12px;
}

.kAbr0a_segmented button[aria-pressed="true"], .kAbr0a_modelNav button[aria-pressed="true"] {
  background: var(--dsw-alias-interactive-bg-active);
  color: var(--dsw-alias-label-primary);
  box-shadow: inset 0 -2px 0 var(--dsw-alias-brand-primary);
}

.kAbr0a_modelNav {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  gap: 4px;
  margin-bottom: 12px;
  padding: 0 16px 10px;
  display: flex;
}

.kAbr0a_modelNav button {
  flex: 1;
  min-width: 0;
  padding: 0 6px;
  font-size: 12px;
}

.kAbr0a_sliderLabel {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  display: flex;
}

.kAbr0a_sliderLabel span {
  margin-left: auto;
}

.kAbr0a_sliderLabel input {
  width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
}

.kAbr0a_formActions {
  padding-top: 4px;
}

.kAbr0a_formActions button {
  min-width: 100px;
}

.kAbr0a_editNotice {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 8px;
  display: flex;
}

.kAbr0a_editNotice div {
  flex: 1;
  min-width: 0;
}

.kAbr0a_editNotice strong {
  font-size: 12px;
}

.kAbr0a_editNotice p {
  color: var(--dsw-alias-label-secondary);
  margin: 3px 0 0;
  font-size: 12px;
}

.kAbr0a_editNotice button {
  flex: none;
  font-size: 12px;
}

.kAbr0a_details {
  grid-template-columns: auto minmax(0, 1fr);
  gap: 6px 12px;
  margin: 0;
  font-size: 12px;
  display: grid;
}

.kAbr0a_details dt {
  color: var(--dsw-alias-label-secondary);
}

.kAbr0a_details dd {
  overflow-wrap: anywhere;
  margin: 0;
}

.kAbr0a_capabilityRow {
  display: contents;
}

.kAbr0a_requestDetails {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  max-height: 200px;
  padding: 8px;
  font-size: 11px;
  overflow: auto;
}

.kAbr0a_placeholder {
  text-align: center;
  min-height: 140px;
  color: var(--dsw-alias-label-secondary);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  display: flex;
}

.kAbr0a_placeholder h3, .kAbr0a_placeholder p {
  margin: 0;
}

.kAbr0a_placeholder svg {
  width: 32px;
  height: 32px;
}

.kAbr0a_motionPreview {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  width: 40px;
  height: 32px;
  animation: kAbr0a_whalePreview var(--whale-duration) var(--whale-ease);
  place-items: center;
  display: grid;
}

.kAbr0a_settings a {
  color: var(--dsw-alias-link);
  text-underline-offset: 2px;
  overflow-wrap: anywhere;
}

.kAbr0a_updateDialog {
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

.kAbr0a_updateDialog::backdrop {
  background: #0005;
}

.kAbr0a_updateHeader {
  align-items: center;
  gap: 8px;
  display: flex;
}

.kAbr0a_updateHeader h2 {
  margin: 0;
  font-size: 16px;
}

.kAbr0a_updateAnnouncement {
  white-space: pre-line;
  overflow-wrap: anywhere;
}

.kAbr0a_updateDialog .kAbr0a_actions {
  margin-top: 12px;
}

.kAbr0a_updateDialog a {
  color: var(--dsw-alias-link);
  text-underline-offset: 2px;
}

.kAbr0a_authorization {
  height: auto;
  max-height: min(var(--whale-content-limit, 60vh),var(--whale-visible-content, 60vh));
}

.kAbr0a_authorization .kAbr0a_settingsHeader {
  min-height: 42px;
  padding: 0 0 10px;
}

.kAbr0a_authorization .kAbr0a_settingsHeader h2 {
  flex: 1;
  font-size: 16px;
}

.kAbr0a_authorizationBody {
  overscroll-behavior: contain;
  flex: 1;
  min-height: 0;
  padding-right: 6px;
  overflow-y: auto;
}

.kAbr0a_authorizationActions {
  border-top: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  padding: 10px 0 0;
}

.kAbr0a_authorizationBody > [data-whale-natural-content] {
  display: flow-root;
}

.kAbr0a_permissionList {
  gap: 0;
  margin: 12px 0;
  padding: 0;
  list-style: none;
  display: grid;
}

.kAbr0a_permissionList li {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  padding: 10px 0;
}

.kAbr0a_permissionList p {
  margin: 3px 0 0;
}

.kAbr0a_permissionList strong {
  font-size: 13px;
}

.kAbr0a_sessionTitle {
  overflow-wrap: anywhere;
}

.kAbr0a_sessionRename {
  gap: 6px;
  margin-top: 8px;
  display: grid;
}

.kAbr0a_existingSessionHome {
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

.kAbr0a_existingSessionHome svg {
  flex: none;
  width: 12px;
  height: 12px;
}

.kAbr0a_existingSessionHome:disabled {
  opacity: 1;
  box-shadow: none;
  cursor: default;
}

.kAbr0a_existingSessionHome:disabled > svg {
  visibility: hidden;
}

.kAbr0a_currentDshTarget {
  gap: 4px;
  min-width: 0;
  display: grid;
}

.kAbr0a_currentDshAction {
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

.kAbr0a_currentDshAction > :first-child {
  white-space: nowrap;
  flex: none;
}

.kAbr0a_currentDshAction > :last-child {
  min-width: 0;
  color: var(--dsw-alias-label-secondary);
  text-align: right;
}

.kAbr0a_currentDshTarget > p {
  margin: 0;
}

.kAbr0a_inputCaptions {
  overscroll-behavior: contain;
  min-width: 0;
  max-height: 168px;
  margin: 0;
  padding: 0 6px;
  list-style: none;
  overflow: auto;
}

.kAbr0a_inputCaption {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 6px;
  padding: 4px 0;
  display: grid;
}

.kAbr0a_inputCaption + .kAbr0a_inputCaption {
  border-top: 1px solid var(--dsw-alias-border-l2);
}

.kAbr0a_inputCaption p {
  margin: 0;
}

.kAbr0a_inputCaptionText {
  overflow-wrap: anywhere;
  white-space: pre-wrap;
  user-select: text;
  font-size: 13px;
  line-height: 18px;
}

.kAbr0a_inputCaptionReceipt {
  color: var(--dsw-alias-label-secondary);
  align-items: baseline;
  gap: 4px;
  font-size: 11px;
  line-height: 16px;
  display: flex;
}

.kAbr0a_inputCaptionReceipt > :first-child {
  flex: none;
}

.kAbr0a_inputCaption button {
  height: 26px;
  min-height: 26px;
  padding: 0 6px;
  font-size: 12px;
}

.kAbr0a_existingSessionTarget > p {
  margin: 4px 0;
}

.kAbr0a_existingSessionPicker {
  gap: 8px;
  min-width: 0;
  margin-top: 10px;
  display: grid;
}

.kAbr0a_existingSessionSearch {
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 6px;
  display: grid;
}

.kAbr0a_existingSessionSearch input::placeholder {
  color: var(--dsw-alias-label-secondary);
  opacity: 1;
}

.kAbr0a_existingSessionList {
  max-height: clamp(96px, 26vh, 224px);
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: auto;
}

.kAbr0a_existingSessionList li {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
}

.kAbr0a_existingSessionList label {
  cursor: pointer;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: start;
  gap: 6px;
  padding: 6px 4px;
  display: grid;
}

.kAbr0a_existingSessionList label:has(input:disabled) {
  cursor: default;
}

.kAbr0a_existingSessionList label:has(input:checked) {
  background: var(--dsw-alias-interactive-bg-active);
}

.kAbr0a_existingSessionList input {
  accent-color: var(--dsw-alias-brand-primary);
  margin-top: 3px;
}

.kAbr0a_existingSessionList label span.kAbr0a_hint {
  overflow-wrap: anywhere;
  margin: 3px 0 0;
  display: block;
}

.kAbr0a_performanceChoice {
  line-height: 1.1;
}

.kAbr0a_performanceChoice small {
  white-space: nowrap;
  font-size: .85em;
}

.kAbr0a_floating [data-whale-setup] {
  min-height: 0;
}

.kAbr0a_floating :is(button, input, select, textarea, summary, a) {
  touch-action: manipulation;
}

.kAbr0a_floating button {
  transition: background-color .12s, color .12s;
}

.kAbr0a_floating :is(button, input, select, summary, a):focus-visible, .kAbr0a_floating:focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

.kAbr0a_spin {
  animation: .7s linear infinite kAbr0a_whaleSpin;
}

.kAbr0a_mark[data-state="authorized"], .kAbr0a_markSmall[data-state="authorized"] {
  color: var(--dsw-alias-brand-primary);
}

.kAbr0a_mark[data-state="unknown"], .kAbr0a_markSmall[data-state="unknown"] {
  color: var(--dsw-alias-state-warn-primary);
}

.kAbr0a_mark[data-state="input-active"], .kAbr0a_markSmall[data-state="input-active"] {
  color: var(--dsw-alias-brand-primary);
  animation: 1.35s ease-in-out infinite kAbr0a_whaleBreathe;
}

.kAbr0a_mark[data-state="pending"], .kAbr0a_markSmall[data-state="pending"] {
  color: var(--dsw-alias-label-secondary);
}

[data-motion="firm"].kAbr0a_floating {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="off"].kAbr0a_floating, [data-motion="off"].kAbr0a_floating * {
  transition: none !important;
  animation: none !important;
}

@keyframes kAbr0a_whaleEnter {
  from {
    opacity: .4;
    transform: translateY(3px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes kAbr0a_whalePreview {
  from {
    transform: scale(.88);
  }

  to {
    transform: scale(1);
  }
}

@keyframes kAbr0a_whaleSpin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes kAbr0a_whaleBreathe {
  0%, 100% {
    opacity: .65;
  }

  50% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .kAbr0a_floating, .kAbr0a_floating * {
    transition: none !important;
    animation: none !important;
  }
}

@media (width <= 520px), (height <= 560px) {
  .kAbr0a_settingsLayout {
    grid-template-rows: auto minmax(0, 1fr);
    grid-template-columns: minmax(0, 1fr);
  }

  .kAbr0a_settingsNav {
    border-right: 0;
    border-bottom: 1px solid var(--dsw-alias-border-l2);
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 2px;
    padding: 5px 8px;
    display: grid;
    overflow: hidden;
  }

  .kAbr0a_settingsNav button {
    justify-content: center;
    height: 30px;
    min-height: 30px;
    padding: 0 2px;
  }

  .kAbr0a_settingsNav button[aria-pressed="true"] {
    box-shadow: inset 0 -2px 0 var(--dsw-alias-brand-primary);
  }

  .kAbr0a_settingsHeader {
    gap: 3px;
    min-height: 44px;
    padding: 5px 8px;
  }

  .kAbr0a_backButton, .kAbr0a_guideButton {
    padding: 0 5px;
  }

  .kAbr0a_settingsBrand {
    gap: 4px;
  }

  .kAbr0a_settingsBrand .kAbr0a_markSmall {
    display: none;
  }

  .kAbr0a_pageHeading {
    padding: 10px 12px 8px;
  }

  .kAbr0a_pageHeading p {
    display: none;
  }

  .kAbr0a_settingsBody {
    padding: 4px 12px 12px;
  }

  .kAbr0a_modelNav {
    margin-bottom: 8px;
    padding: 0 10px 7px;
  }

  .kAbr0a_editNotice {
    flex-wrap: wrap;
  }

  .kAbr0a_editNotice button {
    width: 100%;
  }
}

@media (height <= 420px) {
  .kAbr0a_settingsHeader {
    height: 36px;
    min-height: 36px;
    padding: 2px 8px;
  }

  .kAbr0a_settingsHeader button {
    height: 30px;
    min-height: 30px;
  }

  .kAbr0a_settingsNav {
    padding: 2px 8px;
  }

  .kAbr0a_settingsNav button {
    height: 28px;
    min-height: 28px;
  }

  .kAbr0a_pageHeading {
    box-sizing: border-box;
    min-height: 32px;
    padding: 2px 12px;
  }

  .kAbr0a_pageHeading .kAbr0a_iconButton {
    width: 28px;
    min-width: 28px;
    height: 28px;
  }

  .kAbr0a_modelNav {
    margin-bottom: 4px;
    padding: 0 10px 3px;
  }

  .kAbr0a_modelNav button {
    height: 28px;
    min-height: 28px;
  }
}

@media (pointer: coarse) {
  .kAbr0a_field input, .kAbr0a_deviceSelect {
    font-size: 16px;
  }
}

@media (forced-colors: active) {
  .kAbr0a_floating, .kAbr0a_popover {
    outline: 1px solid canvastext;
  }

  .kAbr0a_settingsNav button[aria-pressed="true"], .kAbr0a_modelNav button[aria-pressed="true"] {
    outline: 2px solid highlight;
  }
}

.kAbr0a_floating[data-view="home"] .kAbr0a_panelViewport, .kAbr0a_floating[data-collapsed] .kAbr0a_panelViewport {
  overflow: hidden;
}

.kAbr0a_floating[data-view="home"]:not([data-collapsed]) {
  padding: 10px;
}

.kAbr0a_panelContent {
  flex-direction: column;
  gap: 4px;
  height: 100%;
  min-height: 0;
  display: flex;
}

.kAbr0a_panelContent > :not(.kAbr0a_quickConversation) {
  flex: none;
}

.kAbr0a_panelContent > .kAbr0a_homeTargetPicker {
  flex: 1 1 0;
  min-height: 0;
  padding: 2px;
  display: flex;
}

.kAbr0a_homeTargetPicker > .kAbr0a_existingSessionPicker {
  flex-direction: column;
  flex: 1;
  margin-top: 0;
  display: flex;
}

.kAbr0a_homeTargetPicker .kAbr0a_existingSessionList {
  overscroll-behavior: contain;
  flex: auto;
  min-height: 0;
  max-height: none;
}

.kAbr0a_homeTargetRow {
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

.kAbr0a_homeTargetRow:disabled {
  opacity: 1;
  cursor: default;
  color: var(--dsw-alias-label-secondary);
}

.kAbr0a_homeTargetRow .kAbr0a_hint {
  overflow-wrap: anywhere;
}

.kAbr0a_homeTargetPicker :is(.kAbr0a_existingSessionSearch, .kAbr0a_actions) {
  flex: none;
}

.kAbr0a_homeTargetPicker .kAbr0a_actions {
  margin-top: auto;
}

.kAbr0a_homeTargetPicker .kAbr0a_hint {
  margin: 0;
}

.kAbr0a_panelContent > .kAbr0a_header {
  height: 28px;
  min-height: 28px;
  margin: 0;
}

.kAbr0a_panelContent .kAbr0a_header .kAbr0a_iconButton {
  width: 28px;
  min-width: 28px;
  height: 28px;
}

.kAbr0a_panelContent > .kAbr0a_statusRow {
  box-sizing: border-box;
  min-height: 24px;
  margin: 0;
  padding: 2px 6px;
}

.kAbr0a_panelContent > .kAbr0a_hint {
  margin: 0;
  font-size: 12px;
  line-height: 18px;
}

.kAbr0a_panelContent > .kAbr0a_error {
  margin: 0;
  padding: 4px 8px;
  line-height: 18px;
}

.kAbr0a_panelContent .kAbr0a_quickSpeed {
  gap: 3px;
  padding-top: 0;
}

.kAbr0a_panelContent .kAbr0a_quickSpeedHeader {
  line-height: 18px;
}

.kAbr0a_panelContent .kAbr0a_quickHint {
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 16px;
  overflow: hidden;
}

.kAbr0a_panelContent .kAbr0a_quickHint p {
  text-overflow: ellipsis;
  margin: 0;
  line-height: 16px;
  overflow: hidden;
}

.kAbr0a_panelContent > .kAbr0a_caption {
  box-sizing: border-box;
  height: 30px;
  min-height: 30px;
  margin: 0;
  padding: 4px 8px;
  line-height: 18px;
}

.kAbr0a_panelContent > .kAbr0a_quickConversation {
  flex-direction: column;
  flex: 1 1 0;
  min-height: 0;
  max-height: none;
  margin: 0;
  padding: 8px;
  display: flex;
  overflow: hidden;
}

.kAbr0a_quickConversation .kAbr0a_popoverHeader {
  flex: none;
  min-height: 28px;
  margin-bottom: 6px;
}

.kAbr0a_quickConversation .kAbr0a_recentMessages {
  overscroll-behavior: contain;
  min-height: 0;
  overflow-y: auto;
}

.kAbr0a_floating[data-compact-height="true"] .kAbr0a_panelContent {
  gap: 2px;
}

.kAbr0a_floating[data-compact-height="true"] :is(.kAbr0a_voiceTarget, .kAbr0a_existingSessionHome) > span {
  font-size: 10px;
}

.kAbr0a_floating[data-compact-height="true"] .kAbr0a_voiceTarget strong {
  font-size: 12px;
}

.kAbr0a_floating[data-compact-height="true"] .kAbr0a_statusRow[data-bound] .kAbr0a_status {
  line-height: 16px;
}

.kAbr0a_floating[data-compact-height="true"] .kAbr0a_existingSessionHome {
  height: 20px;
  min-height: 20px;
}

.kAbr0a_floating[data-compact-height="true"] .kAbr0a_inputCaptions {
  max-height: max(42px,calc(var(--whale-content-limit) - 137px));
}

.kAbr0a_floating[data-compact-height="true"] [data-has-input-caption] > .kAbr0a_audioDevices, .kAbr0a_floating[data-compact-height="true"] .kAbr0a_panelContent:has(.kAbr0a_currentDshTarget) > :is(.kAbr0a_audioDevices, .kAbr0a_quickSpeed), .kAbr0a_floating[data-compact-height="true"] .kAbr0a_panelContent > .kAbr0a_hint:not([data-home-important]), .kAbr0a_floating[data-compact-height="true"] .kAbr0a_panelContent .kAbr0a_quickSpeedHeader, .kAbr0a_floating[data-compact-height="true"] .kAbr0a_panelContent .kAbr0a_quickHint {
  display: none;
}

.kAbr0a_floating[data-compact-height="true"] .kAbr0a_quickActions {
  grid-template-columns: minmax(65px, .9fr) minmax(0, 2.1fr);
  align-items: center;
  gap: 4px;
}

.kAbr0a_floating[data-compact-height="true"] .kAbr0a_quickActions .kAbr0a_mainAction {
  white-space: normal;
  height: 30px;
  min-height: 30px;
  padding-inline: 4px;
  font-size: 12px;
  line-height: 1.15;
}

.kAbr0a_floating[data-compact-height="true"] .kAbr0a_quickActions .kAbr0a_quickSegments {
  padding: 2px;
}

.kAbr0a_floating[data-compact-height="true"] .kAbr0a_quickActions .kAbr0a_quickSegments button {
  white-space: nowrap;
  padding-inline: 1px;
  font-size: 11px;
}

.kAbr0a_floating[data-compact-height="true"] .kAbr0a_panelContent[data-size-detail="true"] > .kAbr0a_quickSpeed {
  display: none;
}

.kAbr0a_settingsBody {
  container-type: inline-size;
}

.kAbr0a_section > button {
  justify-self: start;
  max-width: 100%;
}

.kAbr0a_settingsBody button {
  white-space: normal;
  overflow-wrap: anywhere;
  height: auto;
  min-height: 36px;
}

.kAbr0a_settingsBody :is(.kAbr0a_actions, .kAbr0a_segmented, .kAbr0a_formActions) > button {
  flex: 0 auto;
}

.kAbr0a_inlineActions, .kAbr0a_inlineField, .kAbr0a_volumeRow, .kAbr0a_volumeControl {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.kAbr0a_inlineField {
  font-size: 12px;
}

.kAbr0a_inlineField .kAbr0a_deviceSelect {
  text-overflow: ellipsis;
  flex: 0 180px;
  width: 180px;
  max-width: 100%;
}

.kAbr0a_inlineField input[type="number"] {
  width: 80px;
}

.kAbr0a_fullName {
  color: var(--dsw-alias-label-secondary);
  min-width: 0;
  font-size: 12px;
}

.kAbr0a_fullName summary {
  padding: 2px 0;
  font-size: 12px;
  font-weight: 400;
}

.kAbr0a_fullName p {
  overflow-wrap: anywhere;
  margin-top: 4px;
}

.kAbr0a_disclosureRow {
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 8px;
  display: flex;
}

.kAbr0a_disclosureRow > details.kAbr0a_section {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  flex: 0 auto;
  min-width: 0;
  padding: 0 10px;
}

.kAbr0a_disclosureRow > details.kAbr0a_section > summary {
  min-height: 20px;
  padding: 7px 0;
}

.kAbr0a_disclosureRow > details[open].kAbr0a_section {
  flex: 100%;
  padding-bottom: 10px;
}

.kAbr0a_volumeControl {
  flex-wrap: nowrap;
  flex: 0 260px;
}

.kAbr0a_volumeControl input[type="range"] {
  width: 210px;
  min-width: 80px;
  max-width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
  flex: 210px;
}

.kAbr0a_volumeControl span {
  text-align: right;
  flex: none;
  min-width: 3em;
  font-size: 12px;
}

.kAbr0a_field:has( > input[type="number"]) {
  flex-wrap: wrap;
  align-items: center;
  display: flex;
}

.kAbr0a_field > input[type="number"] {
  width: 80px;
}

.kAbr0a_authorizationSteps {
  color: var(--dsw-alias-label-secondary);
  margin: 8px 0 12px;
  font-size: 12px;
}

.kAbr0a_agreement {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  gap: 14px;
  padding: 14px;
  font-size: 13px;
  line-height: 1.6;
  display: grid;
}

.kAbr0a_agreement p {
  margin: 0;
}

.kAbr0a_authorizationBody h3 {
  margin: 0 0 10px;
  font-size: 15px;
}

.kAbr0a_authorizationActions button {
  flex: 0 auto;
  min-height: 36px;
}

@container (width <= 340px) {
  .kAbr0a_inlineActions {
    align-items: flex-start;
  }

  .kAbr0a_inlineField .kAbr0a_deviceSelect {
    flex-basis: 160px;
    width: 160px;
  }

  .kAbr0a_volumeControl {
    flex-basis: 200px;
  }

  .kAbr0a_volumeControl input[type="range"] {
    width: 150px;
  }
}

.kAbr0a_audioDevices {
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  display: flex;
}

.kAbr0a_audioDeviceGrid {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 8px;
  display: grid;
}

.kAbr0a_audioDeviceField {
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  font-size: 12px;
  display: flex;
}

.kAbr0a_audioDeviceField > span {
  align-items: center;
  gap: 4px;
  line-height: 18px;
  display: flex;
}

.kAbr0a_audioDeviceField svg {
  flex: none;
  width: 14px;
  height: 14px;
}

.kAbr0a_audioDeviceField select {
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

.kAbr0a_audioDeviceField select[data-device-missing] {
  border-color: #b80;
}

.kAbr0a_audioDeviceHint, .kAbr0a_audioDeviceNotice {
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  font-size: 11px;
  line-height: 16px;
  overflow: hidden;
}

.kAbr0a_audioDeviceHint {
  color: var(--dsw-alias-label-secondary);
}

.kAbr0a_audioDeviceNotice {
  color: #805500;
}

[data-ds-dark-theme] .kAbr0a_audioDeviceNotice {
  color: #ffd277;
}

[data-ds-dark-theme] .kAbr0a_audioDeviceField select {
  color-scheme: dark;
}

.kAbr0a_floating[data-compact-height="true"] .kAbr0a_audioDeviceField > span {
  font-size: 11px;
  line-height: 14px;
}

.kAbr0a_floating[data-compact-height="true"] .kAbr0a_audioDeviceField select {
  height: 26px;
}

.kAbr0a_floating[data-compact-height="true"] .kAbr0a_audioDeviceHint, .kAbr0a_floating[data-compact-height="true"] .kAbr0a_audioDeviceNotice, .kAbr0a_floating[data-compact-height="true"] .kAbr0a_panelContent:has( > [data-home-important]) .kAbr0a_audioDeviceField > span {
  display: none;
}

.kAbr0a_pageHeading.kAbr0a_modelHeading {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  justify-content: flex-start;
  gap: 10px;
  min-height: 40px;
  margin-bottom: 6px;
  padding: 5px 12px;
}

.kAbr0a_modelHeading h3 {
  white-space: nowrap;
  font-size: 13px;
}

.kAbr0a_modelHeading .kAbr0a_modelNav {
  border: 0;
  flex: 1;
  gap: 3px;
  min-width: 0;
  margin: 0;
  padding: 0;
}

.kAbr0a_modelHeading .kAbr0a_modelNav button {
  white-space: nowrap;
  flex: 0 auto;
  height: 28px;
  min-height: 28px;
  padding: 0 6px;
}

.kAbr0a_currentModel {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  display: flex;
}

.kAbr0a_pathRow {
  grid-template-columns: 95px minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  font-size: 12px;
  display: grid;
}

.kAbr0a_pathRow > span {
  min-width: 0;
}

.kAbr0a_editNotice {
  margin-bottom: 7px;
  padding: 5px 8px;
}

.kAbr0a_editNotice span {
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
}

.kAbr0a_editNotice button {
  height: auto;
  min-height: 30px;
}

@media (width <= 360px) {
  .kAbr0a_pageHeading.kAbr0a_modelHeading {
    gap: 5px;
    padding: 5px 8px;
  }

  .kAbr0a_modelHeading .kAbr0a_modelNav button {
    padding: 0 3px;
    font-size: 11px;
  }

  .kAbr0a_pathRow {
    grid-template-columns: minmax(0, 1fr);
    gap: 4px;
  }
}

.kAbr0a_pathRow {
  display: block;
}

.kAbr0a_pathRow > div:first-child {
  flex-wrap: nowrap !important;
}

.kAbr0a_pathRow > div:first-child > label {
  flex: 1;
  grid-template-columns: 95px minmax(0, 1fr);
  display: grid !important;
}

.kAbr0a_pathRow input {
  width: 100% !important;
}

.kAbr0a_pathRow button {
  flex: none;
  min-height: 32px;
}

@media (width <= 420px) {
  .kAbr0a_pathRow > div:first-child {
    flex-wrap: wrap !important;
  }

  .kAbr0a_pathRow > div:first-child > label {
    grid-template-columns: 80px minmax(0, 1fr);
    min-width: 180px !important;
  }
}

.kAbr0a_floating :is(button, select, input, textarea, summary, a), .kAbr0a_settings :is(button, select, input, summary, a) {
  transition: background-color .12s ease-out,border-color .12s ease-out,color .12s ease-out,box-shadow .12s ease-out,transform var(--whale-duration, .2s) var(--whale-ease, ease-out);
}

.kAbr0a_floating :is(button, summary):hover:not(:disabled) {
  background-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,var(--dsw-alias-bg-layer-1));
}

.kAbr0a_floating button:active:not(:disabled), .kAbr0a_settings button:active:not(:disabled) {
  transform: scale(.97);
}

.kAbr0a_floating :is(input, select, textarea):hover:not(:disabled) {
  border-color: var(--dsw-alias-brand-primary);
}

.kAbr0a_radios label {
  transition: background-color .12s, border-color .12s, box-shadow .12s;
}

.kAbr0a_radios label:has(input:checked) {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,transparent);
}

.kAbr0a_authorizationBody, .kAbr0a_settingsLayout, .kAbr0a_panelContent > .kAbr0a_header, .kAbr0a_settingsBody > div:not([hidden]), .kAbr0a_section > div:not([hidden])[data-whale-tab-panel], .kAbr0a_floating [role="tabpanel"]:not([hidden]) {
  animation: kAbr0a_whalePageEnter var(--whale-duration, .2s) ease-out;
}

.kAbr0a_floating :is([role="menu"], [role="listbox"]), .kAbr0a_floating [data-whale-dropdown] {
  transform-origin: top;
  animation: .12s ease-out kAbr0a_whalePageEnter;
}

.kAbr0a_floating [data-whale-save-result] {
  animation: .16s ease-out kAbr0a_whaleFeedback;
}

.kAbr0a_floating summary {
  list-style: none;
}

.kAbr0a_floating summary::-webkit-details-marker {
  display: none;
}

.kAbr0a_floating summary:before {
  content: "\u203A";
  width: 1em;
  transition: transform .16s ease-out;
  display: inline-block;
  transform: rotate(0);
}

.kAbr0a_floating details[open] > summary:before {
  transform: rotate(90deg);
}

.kAbr0a_floating details[open] > :not(summary) {
  animation: .16s ease-out kAbr0a_whalePageEnter;
}

@supports (interpolate-size: allow-keywords) {
  .kAbr0a_floating details {
    interpolate-size: allow-keywords;
  }

  .kAbr0a_floating details::details-content {
    block-size: 0;
    transition: block-size .16s ease-out,content-visibility .16s allow-discrete;
    overflow: clip;
  }

  .kAbr0a_floating details[open]::details-content {
    block-size: auto;
  }
}

@keyframes kAbr0a_whalePageEnter {
  from {
    translate: 0 4px;
  }

  to {
    translate: 0;
  }
}

@keyframes kAbr0a_whaleFeedback {
  from {
    opacity: .5;
  }

  to {
    opacity: 1;
  }
}

[data-motion="firm"].kAbr0a_floating, [data-motion="firm"].kAbr0a_settings {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="firm"].kAbr0a_floating details::details-content, [data-motion="firm"].kAbr0a_floating summary:before {
  transition-duration: .1s;
}

[data-motion="off"].kAbr0a_floating *, [data-motion="off"].kAbr0a_settings *, [data-motion="off"].kAbr0a_floating :before, [data-motion="off"].kAbr0a_floating details::details-content {
  transition: none !important;
  animation: none !important;
}

[data-motion="off"].kAbr0a_floating button:active, [data-motion="off"].kAbr0a_settings button:active {
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .kAbr0a_floating *, .kAbr0a_settings *, .kAbr0a_floating :before, .kAbr0a_floating details::details-content {
    transition: none !important;
    animation: none !important;
  }

  .kAbr0a_floating button:active, .kAbr0a_settings button:active {
    transform: none;
  }
}

.kAbr0a_conversationChoice {
  gap: 6px;
  min-width: 0;
  display: grid;
  position: relative;
}

.kAbr0a_conversationChoice > button {
  text-align: left;
  justify-content: space-between;
  width: 100%;
  min-width: 0;
}

.kAbr0a_conversationOptions {
  overscroll-behavior: contain;
  gap: 3px;
  min-width: 0;
  max-height: 220px;
  padding: 6px;
  animation: .12s ease-out kAbr0a_whalePageEnter;
  display: grid;
  overflow: auto;
}

.kAbr0a_conversationOptions [role="option"] {
  text-align: left;
  border-radius: var(--dsw-radius-sm);
  justify-content: space-between;
  width: 100%;
  min-width: 0;
  padding: 7px 10px;
  transition: background-color .12s ease-out, color .12s ease-out;
}

.kAbr0a_conversationOptions [role="option"][aria-selected="true"] {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 18%,var(--dsw-alias-bg-layer-1));
  font-weight: 600;
}

.kAbr0a_conversationOptions [role="option"]:is(:hover, :focus-visible) {
  background: var(--dsw-alias-interactive-bg-active);
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: -2px;
}

.kAbr0a_conversationOptions [role="option"] small {
  color: var(--dsw-alias-label-secondary);
}

.kAbr0a_settings [data-whale-tab-panel]:not([hidden]) {
  animation: kAbr0a_whalePageEnter var(--whale-duration, .2s) ease-out;
}

.kAbr0a_modelHeading .kAbr0a_modelNav {
  scrollbar-width: thin;
  overflow-x: auto;
}

.kAbr0a_modelHeading .kAbr0a_modelNav button {
  flex-shrink: 0;
}

[data-motion="off"].kAbr0a_settings [data-whale-tab-panel] {
  animation: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .kAbr0a_settings [data-whale-tab-panel] {
    animation: none !important;
  }
}

.kAbr0a_panelContent, .kAbr0a_bubble {
  animation: none;
}

.kAbr0a_panelContent {
  height: auto;
}

.kAbr0a_panelContent[data-size-detail="true"] {
  height: 100%;
}

.kAbr0a_panelContent .kAbr0a_quickSegments {
  background: none;
  gap: 6px;
  padding: 0;
}

.kAbr0a_panelContent .kAbr0a_quickSegments button {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 8px;
  gap: 4px;
  height: 34px;
  min-height: 34px;
}

.kAbr0a_panelContent .kAbr0a_quickSegments button[aria-pressed="true"] {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 22%,var(--dsw-alias-bg-layer-1));
  box-shadow: inset 0 0 0 1px var(--dsw-alias-brand-primary);
}

.kAbr0a_panelContent .kAbr0a_quickSegments svg {
  width: 15px;
  height: 15px;
}

.kAbr0a_panelContent > .kAbr0a_quickConversation {
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

.kAbr0a_conversationHeader {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  font-size: 12px;
  display: flex;
}

.kAbr0a_conversationHeader > div {
  align-items: center;
  gap: 2px;
  display: flex;
}

.kAbr0a_conversationHeader button:not(.kAbr0a_iconButton), .kAbr0a_assistantName, .kAbr0a_loadHistory {
  color: inherit;
  font: inherit;
  cursor: pointer;
  background: none;
  border: 0;
  border-radius: 4px;
  padding: 3px;
}

.kAbr0a_conversationHeader .kAbr0a_iconButton {
  width: 26px;
  min-width: 26px;
  height: 28px;
}

.kAbr0a_historyScope {
  color: var(--dsw-alias-label-secondary);
  flex: none;
  margin: 2px 0;
  font-size: 10px;
  line-height: 14px;
}

.kAbr0a_quickConversation .kAbr0a_recentMessages {
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

.kAbr0a_message {
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

.kAbr0a_message[data-role="user"] {
  align-self: flex-end;
  align-items: flex-end;
}

.kAbr0a_messageName {
  min-height: 19px;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  line-height: 17px;
}

.kAbr0a_assistantName {
  overflow-wrap: anywhere;
  max-width: 100%;
  min-height: 19px;
  padding: 0 2px;
  font-size: 11px;
  line-height: 17px;
}

.kAbr0a_assistantName:hover {
  color: var(--dsw-alias-label-primary);
  text-underline-offset: 3px;
  text-decoration: underline;
}

.kAbr0a_assistantNameInput {
  box-sizing: border-box;
  width: 140px;
  min-width: 60px;
  max-width: 160px;
  height: 23px !important;
  min-height: 23px !important;
  padding: 1px 5px !important;
  font-size: 12px !important;
}

.kAbr0a_message p {
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

.kAbr0a_message[data-role="user"] p {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 28%,var(--dsw-alias-bg-layer-1));
  border-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 45%,var(--dsw-alias-border-l2));
}

.kAbr0a_message small {
  color: var(--dsw-alias-label-secondary);
  font-size: 10px;
}

.kAbr0a_loadHistory {
  align-self: center;
  padding: 5px;
  font-size: 11px;
}

.kAbr0a_newMessages {
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

.kAbr0a_bubble {
  gap: 6px;
  padding: 0 7px;
  font-size: 11px;
}

.kAbr0a_bubbleBrand {
  flex: none;
  font-size: 12px;
  font-weight: 600;
}

.kAbr0a_bubbleStatus {
  white-space: nowrap;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 3px;
  min-width: 0;
  display: flex;
}

.kAbr0a_bubbleStatus svg {
  flex: none;
  width: 15px;
  height: 15px;
}

.kAbr0a_bubble > svg:last-child {
  flex: none;
  width: 14px;
  height: 14px;
}

.kAbr0a_voiceBars {
  align-items: center;
  gap: 2px;
  height: 16px;
  display: flex;
}

.kAbr0a_voiceBars i {
  background: var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary));
  opacity: .5;
  border-radius: 1px;
  width: 3px;
  height: 13px;
  transform: scaleY(.31);
}

.kAbr0a_voiceBars[data-active="true"] i {
  background: var(--dsw-alias-brand-primary);
  opacity: 1;
  animation: .7s ease-in-out infinite alternate kAbr0a_whaleInputPulse;
}

.kAbr0a_voiceBars[data-active="true"] i:nth-child(2n) {
  animation-delay: -.3s;
}

.kAbr0a_voiceBars[data-active="true"] i:nth-child(3) {
  animation-delay: -.5s;
}

@keyframes kAbr0a_whaleInputPulse {
  from {
    transform: scaleY(.38);
  }

  to {
    transform: scaleY(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .kAbr0a_voiceBars[data-active="true"] i {
    animation: none;
    transform: scaleY(.69);
  }
}

.kAbr0a_floating[data-motion="off"] .kAbr0a_voiceBars[data-active="true"] i {
  animation: none;
  transform: scaleY(.69);
}

@media (forced-colors: active) {
  .kAbr0a_message p {
    border: 1px solid canvastext;
  }

  .kAbr0a_quickSegments button[aria-pressed="true"] {
    outline: 2px solid highlight;
  }

  .kAbr0a_voiceBars i {
    background: canvastext;
  }
}

.kAbr0a_voicePrompt {
  flex-direction: column;
  gap: 8px;
  display: flex;
}

.kAbr0a_voicePrompt label {
  font-size: 13px;
  font-weight: 600;
}

.kAbr0a_voicePrompt label span {
  margin-left: 10px;
  font-weight: 400;
}

.kAbr0a_voicePromptInput {
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

.kAbr0a_voicePromptInput::placeholder {
  color: var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary));
  opacity: 1;
}

.kAbr0a_voicePromptInput:disabled {
  opacity: .65;
  cursor: not-allowed;
}

.kAbr0a_voicePromptInput:focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: 2px;
}

.kAbr0a_voicePromptCount {
  text-align: right;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
}

.kAbr0a_voicePromptActions {
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  display: flex;
}

.kAbr0a_voicePromptActions .kAbr0a_actions {
  margin: 0;
}

.kAbr0a_voicePromptMode {
  color: var(--dsw-alias-state-success-primary, var(--dsw-alias-label-secondary));
  white-space: nowrap;
  font-size: 11px;
}

.kAbr0a_voicePromptMode:before {
  content: "\u2022";
  margin-right: 5px;
}
`};var se=require("react/jsx-runtime");function et({small:e=!1,state:n="idle"}){return(0,se.jsx)("svg",{viewBox:"0 0 1024 1024","data-state":n,className:e?h.markSmall:h.mark,"aria-hidden":"true",children:(0,se.jsx)("path",{fill:"currentColor",d:"M 920.377 65.087 C 928.064 63.083 932.973 107.434 932.987 114.072 C 933.092 165.045 924.256 210.594 901.365 256.376 C 855.379 348.348 758.325 392.662 681.124 453.829 C 619.898 502.339 580.980 567.068 558.933 641.286 C 543.187 694.296 538.293 750.695 527.468 804.833 C 520.391 840.227 514.008 874.928 493.687 905.451 C 474.447 934.348 431.832 972.135 393.948 957.487 C 358.248 943.683 373.787 884.228 380.635 856.964 C 401.585 773.552 460.283 657.712 419.105 573.931 C 381.383 497.183 304.815 488.756 234.259 458.353 C 195.522 441.661 157.383 413.822 133.190 378.905 C 115.301 353.087 100.999 326.148 94.423 295.130 C 93.358 290.109 88.245 266.804 93.252 264.337 C 93.759 264.087 133.145 277.445 138.791 278.433 C 174.563 284.693 209.339 281.307 245.016 275.980 C 288.094 269.548 333.679 260.367 376.940 270.872 C 414.858 280.080 448.414 297.981 474.046 327.930 C 483.707 339.219 491.970 352.034 498.604 365.302 C 499.492 367.078 503.519 377.817 505.784 377.367 C 506.966 377.132 507.537 375.084 507.926 374.169 C 513.160 361.862 518.091 349.606 524.078 337.631 C 541.287 303.214 562.597 270.184 592.119 244.919 C 633.676 209.352 683.585 187.330 735.895 172.601 C 770.712 162.797 806.633 155.544 838.984 138.655 C 862.849 126.195 882.544 110.622 901.022 91.328 C 905.036 87.137 916.896 65.995 920.377 65.087 Z"})})}var ud=()=>({pet:(0,se.jsxs)(se.Fragment,{children:[(0,se.jsx)("path",{d:"M5 11c-2-8 4-10 7-8 5-2 9 2 7 8M5 10l4-4 3 3 3-3 4 4v5c0 4-3 6-7 6s-7-2-7-6v-5Z"}),(0,se.jsx)("path",{d:"M8 13v2m8-2v2m-6 3h4"})]}),settings:(0,se.jsxs)(se.Fragment,{children:[(0,se.jsx)("path",{d:"m9 3 1-1h4l1 1 .5 2 2 .8 2-.6 2 3-.8 1.8.2 2.2 1.3 1.5-2 3-2.1-.2-1.7 1.3-.5 2.2h-4l-.6-2.1-1.8-1.1-2 .3-2-3 1.3-1.7V10L4 8.5l2-3 2 .5L9 3Z"}),(0,se.jsx)("circle",{cx:"12",cy:"11.5",r:"3"})]}),minus:(0,se.jsx)("path",{d:"M5 12h14"}),plus:(0,se.jsx)("path",{d:"M12 5v14M5 12h14"}),down:(0,se.jsx)("path",{d:"m6 9 6 6 6-6"}),refresh:(0,se.jsxs)(se.Fragment,{children:[(0,se.jsx)("path",{d:"M20 6v5h-5M4 18v-5h5"}),(0,se.jsx)("path",{d:"M6 7a7 7 0 0 1 12-1l2 5M4 13l2 5a7 7 0 0 0 12-1"})]}),up:(0,se.jsx)("path",{d:"m6 15 6-6 6 6"}),check:(0,se.jsx)("path",{d:"m5 12 4 4L19 6"}),micOff:(0,se.jsx)(se.Fragment,{children:(0,se.jsx)("path",{d:"M9 9v3a3 3 0 0 0 5.1 2.1M15 8V6a3 3 0 0 0-5.7-1.3M6 10v2a6 6 0 0 0 10.2 4.3M18 12v-2M12 18v3M9 21h6M3 3l18 18"})}),mic:(0,se.jsxs)(se.Fragment,{children:[(0,se.jsx)("rect",{x:"9",y:"3",width:"6",height:"12",rx:"3"}),(0,se.jsx)("path",{d:"M6 10v2a6 6 0 0 0 12 0v-2M12 18v3M9 21h6"})]}),volume:(0,se.jsxs)(se.Fragment,{children:[(0,se.jsx)("path",{d:"M3 9h4l5-4v14l-5-4H3Z"}),(0,se.jsx)("path",{d:"M16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"})]}),chat:(0,se.jsx)("path",{d:"M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9l-5 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"}),close:(0,se.jsx)("path",{d:"m6 6 12 12M18 6 6 18"}),search:(0,se.jsxs)(se.Fragment,{children:[(0,se.jsx)("circle",{cx:"10",cy:"10",r:"6"}),(0,se.jsx)("path",{d:"m15 15 5 5"})]}),chevron:(0,se.jsx)("path",{d:"m9 5 7 7-7 7"}),warning:(0,se.jsxs)(se.Fragment,{children:[(0,se.jsx)("path",{d:"m12 3 10 18H2L12 3Z"}),(0,se.jsx)("path",{d:"M12 9v5m0 3v.2"})]})});function Le({name:e,className:n=""}){return(0,se.jsx)("svg",{viewBox:"0 0 24 24",width:"18",height:"18","aria-hidden":"true",className:n,fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round",children:ud()[e]??ud().chat})}var Pe=require("react/jsx-runtime");function Ch({name:e,save:n,t}){let[r,o]=(0,Ze.useState)(!1),[i,a]=(0,Ze.useState)(e),l=(0,Ze.useRef)(!1),c=(0,Ze.useRef)(null),u=(0,Ze.useRef)(null),d=(0,Ze.useRef)(!1);(0,Ze.useLayoutEffect)(()=>{r?(c.current?.focus({preventScroll:!0}),c.current?.select()):d.current&&(d.current=!1,u.current?.focus({preventScroll:!0}))},[r]);let p=()=>{o(!1),a(e)},f=()=>{let m=i.trim();m&&m.length<=40&&(n?.(m),d.current=!0,o(!1))};return r?(0,Pe.jsx)(co.Input,{ref:c,className:h.assistantNameInput,"aria-label":t("assistantName"),value:i,maxLength:40,"data-no-drag":!0,onChange:m=>a(m.target.value),onCompositionStart:()=>{l.current=!0},onCompositionEnd:()=>{l.current=!1},onBlur:p,onKeyDown:m=>{m.stopPropagation(),!(l.current||m.nativeEvent.isComposing)&&(m.key==="Escape"&&(m.preventDefault(),d.current=!0,p()),m.key==="Enter"&&(m.preventDefault(),f()))}}):(0,Pe.jsx)("button",{ref:u,type:"button",className:h.assistantName,"data-no-drag":!0,title:t("renameAssistant"),onClick:()=>{a(e),o(!0)},children:e})}function dd({conversation:e,history:n,historyLoading:t,historyError:r,historyRetryCursor:o,loadHistory:i,assistantName:a,setAssistantName:l,close:c,t:u}){let[d,p]=(0,Ze.useState)(!1),[f,m]=(0,Ze.useState)(0),y=(0,Ze.useRef)(null),v=(0,Ze.useRef)(!0),b=(0,Ze.useRef)(null),x=(0,Ze.useRef)(null),z=e.rootSessionId,F=ju(n?.rootSessionId===z?n.items:[],e.items),Z=!v.current&&b.current?.firstId,N=Z?F.findIndex(_=>_.id===Z):-1,$=d?F:N>=0?F.slice(N):Ku(F),S=()=>{let _=y.current;if(!_)return;let P=_.getBoundingClientRect(),D=[..._.querySelectorAll("[data-message-id]")].find(A=>A.getBoundingClientRect().bottom>=P.top);x.current=D?{id:D.dataset.messageId,offset:D.getBoundingClientRect().top-P.top}:null},O=()=>{let _=y.current;_&&(_.scrollTop=_.scrollHeight),v.current=!0,m(0),S()},C=!d&&F.filter(_=>_.role==="user").length<10&&!!n?.nextCursor;return(0,Ze.useEffect)(()=>{C&&!t&&!r&&i?.(n.nextCursor)},[C,n?.nextCursor,t,r,z]),(0,Ze.useLayoutEffect)(()=>{let _=y.current;if(!_)return;let P=b.current;if((!P||P.root!==z)&&(v.current=!0,m(0)),v.current)_.scrollTop=_.scrollHeight;else{let D=x.current,A=D&&[..._.querySelectorAll("[data-message-id]")].find(E=>E.dataset.messageId===D.id);if(A?_.scrollTop+=A.getBoundingClientRect().top-_.getBoundingClientRect().top-D.offset:P&&(_.scrollTop=Math.min(P.top,_.scrollHeight-_.clientHeight)),P){let E=e.items.filter(I=>I.at>=P.lastAt&&!P.ids.has(I.id)).length;E&&m(I=>I+E)}}b.current={root:z,firstId:$[0]?.id,top:_.scrollTop,lastAt:Math.max(0,...F.map(D=>D.at)),ids:new Set(F.map(D=>D.id))},S()},[e,n,d,f]),(0,Pe.jsxs)("section",{className:h.quickConversation,"data-dropdown":"conversation","data-no-drag":!0,role:"region","aria-label":u("recentConversation"),onKeyDown:_=>{_.key==="Escape"&&(_.stopPropagation(),c())},children:[(0,Pe.jsxs)("div",{className:h.conversationHeader,children:[(0,Pe.jsx)("strong",{children:u(d?"allRecords":"recentTenTurns")}),(0,Pe.jsxs)("div",{children:[(0,Pe.jsx)("button",{type:"button",onClick:()=>{d?(v.current=!0,x.current=null,b.current=null,m(0)):S(),p(_=>!_)},children:u(d?"collapseToTen":"showAllRecords")}),(0,Pe.jsx)(co.Button,{className:h.iconButton,"aria-label":u("close"),title:u("collapseConversation"),onClick:c,children:(0,Pe.jsx)(Le,{name:"up"})})]})]}),d&&(0,Pe.jsxs)("p",{className:h.historyScope,children:[u("currentVoiceRecords"),n?.truncated?" \xB7 "+u("historyTruncated"):""]}),(0,Pe.jsxs)("div",{ref:y,className:h.recentMessages,"data-conversation-messages":!0,tabIndex:0,"aria-label":u("conversationMessages"),onWheel:_=>{_.deltaY<0&&(v.current=!1)},onScroll:()=>{let _=y.current;v.current=Wu(_),v.current&&m(0),b.current&&(b.current.top=_.scrollTop),S()},children:[d&&n?.nextCursor&&(0,Pe.jsx)("button",{className:h.loadHistory,disabled:t,onClick:()=>{S(),i?.(n.nextCursor)},children:u(t?"readingHistory":"loadEarlier")}),r&&(0,Pe.jsx)("button",{className:h.loadHistory,disabled:t,onClick:()=>{i?.(o??void 0)},children:u("retryHistory")}),$.map(_=>(0,Pe.jsxs)("div",{"data-message-id":_.id,"data-role":_.role,className:h.message,children:[(0,Pe.jsx)("div",{className:h.messageName,children:_.role==="user"?(0,Pe.jsx)("span",{children:u("you")}):(0,Pe.jsx)(Ch,{name:a,save:l,t:u})}),(0,Pe.jsx)("p",{children:_.text}),["speech-failed","interrupted"].includes(_.state)&&(0,Pe.jsx)("small",{children:u(_.state==="speech-failed"?"speechFailed":"speechInterrupted")})]},_.id)),!$.length&&(0,Pe.jsx)("p",{className:h.hint,children:u(t||C?"readingHistory":"noConversation")})]}),f>0&&(0,Pe.jsxs)("button",{className:h.newMessages,onClick:O,children:[(0,Pe.jsx)(Le,{name:"down"}),f," ",u("newMessages")]})]})}var nt=require("react"),Tt=require("@deepseek-ai/dsh-client-ui-primitives"),pn=require("react/jsx-runtime");function fr({label:e,value:n,onChange:t,kind:r,pickPath:o,sessionId:i,disabled:a,active:l=!0,scope:c,className:u,placeholder:d}){let[p,f]=(0,nt.useState)(!1),[m,y]=(0,nt.useState)(null),v=typeof n=="string"?n.split(/[\\/]/).filter(Boolean).at(-1)??n:"",b=(0,nt.useRef)(null),x=(0,nt.useRef)(null),z=()=>{b.current?.abort(),b.current=null,f(!1)};(0,nt.useEffect)(()=>(z(),y(null),z),[i,a,l,c,n]);let F=async()=>{if(b.current||a||!l||!o)return;let Z=new AbortController;b.current=Z,f(!0),y(null);try{let N=await o(i,r,Z.signal);b.current===Z&&!Z.signal.aborted&&!x.current?.closest("[hidden]")&&N!==null&&t(N)}catch(N){b.current===Z&&!Z.signal.aborted&&y(String(N?.message??N))}finally{b.current===Z&&(b.current=null,f(!1))}};return(0,pn.jsxs)("div",{ref:x,className:u,"data-native-path":r,children:[(0,pn.jsxs)("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,minWidth:0},children:[(0,pn.jsxs)("label",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,minWidth:0},children:[e,(0,pn.jsx)(Tt.Input,{"aria-label":e,title:n??"",value:v,placeholder:d,disabled:a,readOnly:!0,style:{width:190,maxWidth:"100%",minWidth:0,textOverflow:"ellipsis"}})]}),(0,pn.jsx)(Tt.Button,{variant:"outline",disabled:a||!l||!o||p,onClick:()=>{F()},children:p?"\u7B49\u5F85\u9009\u62E9\u2026":r==="referenceAudio"||r==="campplus"?"\u9009\u62E9\u6587\u4EF6\u2026":"\u9009\u62E9\u6587\u4EF6\u5939\u2026"})]}),r==="campplus"&&n&&(0,pn.jsx)(Tt.Button,{variant:"outline",disabled:a,onClick:()=>{z(),t("")},children:"\u6E05\u9664\u53EF\u9009\u6A21\u578B"}),p&&(0,pn.jsx)(Tt.Button,{variant:"outline",onClick:z,children:"\u53D6\u6D88\u9009\u62E9"}),n&&(0,pn.jsxs)("details",{style:{fontSize:12,minWidth:0},children:[(0,pn.jsx)("summary",{children:"\u67E5\u770B\u5B8C\u6574\u8DEF\u5F84"}),(0,pn.jsx)("p",{style:{margin:"4px 0",overflowWrap:"anywhere"},children:n})]}),m&&(0,pn.jsx)("p",{role:"alert",children:m})]})}var $t=require("react");var Ye=require("react/jsx-runtime"),hr=e=>e&&typeof e=="object"?`${e.backend}:${e.id}`:e==null?"":"__legacy";function pd({state:e,sessionId:n,run:t,t:r}){let o=(0,$t.useRef)({state:e,sessionId:n,run:t}),i=(0,$t.useRef)(void 0);o.current={state:e,sessionId:n,run:t},(0,$t.useEffect)(()=>{!e.settings||e.settingsFor!==n||e.busy||e.audioDevicesPending||i.current===n||(i.current=n,t(n,"read-audio-devices"))},[n,e.settingsFor,e.busy,e.audioDevicesPending]),(0,$t.useEffect)(()=>{let f=!1,m,y=async()=>{let v=o.current;!f&&v.sessionId===n&&!v.state.busy&&!document.hidden&&(v.state.settingsFor!==n&&await v.run(n,"read-settings"),f||await v.run(n,"read-audio-devices")),f||(m=document.defaultView.setTimeout(y,1e4))};return y(),()=>{f=!0,document.defaultView.clearTimeout(m)}},[n]);let a=!!(e.settings&&e.settingsFor===n),l=a?e.settings:null,c=l?.audioDevices??{input:l?.values?.device??null,output:null},u=e.audioDevicesFor===n?e.audioDevices:null,d=e.checkedFor===n&&!e.uncertain&&e.status?.enabled===!1&&e.status?.ownerSessionId===null&&e.status?.voiceControlBusy===!1&&e.status?.voiceSession?.fullyStopped===!0&&e.status?.voiceSession?.id==null,p=[];return(0,Ye.jsxs)("section",{className:h.audioDevices,"aria-label":r("audioDevices"),"data-audio-device-controls":!0,"data-no-drag":!0,children:[(0,Ye.jsx)("div",{className:h.audioDeviceGrid,children:["input","output"].map(f=>{let m=c[f],y=u?.[f],v=hr(m),b=y?.items?.some(N=>hr(N)===v),x=m&&typeof m=="object"&&y&&y.status!=="unavailable"&&!b,z=m==null?r("audioSystemDefault"):typeof m=="object"?m.name:String(m),F=f==="output"&&y?.reason==="AUDIO_PLATFORM_UNSUPPORTED",Z=!a||e.busy||e.uncertain||e.settingsConflict||F||f==="input"&&!d;return x&&p.push(r(f==="input"?"inputDeviceMissing":"outputDeviceMissing")),(0,Ye.jsxs)("label",{className:h.audioDeviceField,children:[(0,Ye.jsxs)("span",{children:[(0,Ye.jsx)(Le,{name:f==="input"?"mic":"volume"}),r(f==="input"?"audioInput":"audioOutput")]}),(0,Ye.jsxs)("select",{"aria-label":r(f==="input"?"audioInput":"audioOutput"),"data-device-missing":x||void 0,title:Z&&f==="input"&&!d?r("inputDeviceStopFirst"):F?r("outputDeviceUnsupported"):z,disabled:Z,value:v,onFocus:()=>{e.audioDevicesPending||t(n,"read-audio-devices")},onChange:N=>{let $=N.target.value;if($==="__legacy"||$===v)return;let S=$===""?null:y?.items?.find(O=>hr(O)===$);S!==void 0&&t(n,"save-audio-device",{revision:l.revision,direction:f,selection:S})},children:[(0,Ye.jsx)("option",{value:"",children:r("audioSystemDefault")}),m!=null&&!b&&(0,Ye.jsxs)("option",{value:v,children:[z,x?" \xB7 "+r("deviceDisconnected"):typeof m=="object"?"":" \xB7 "+r("deviceSaved")]}),y?.items?.map(N=>(0,Ye.jsx)("option",{value:hr(N),children:N.name},hr(N)))]})]},f)})}),p.length>0?(0,Ye.jsx)("p",{className:h.audioDeviceNotice,role:"status",children:p.join("\uFF1B")}):e.audioDevicesError||u?.input?.status==="unavailable"||u?.output?.status==="unavailable"&&u?.output?.reason!=="AUDIO_PLATFORM_UNSUPPORTED"?(0,Ye.jsx)("p",{className:h.audioDeviceHint,role:"status",children:r("deviceListRetry")}):u?.output?.reason==="AUDIO_PLATFORM_UNSUPPORTED"?(0,Ye.jsx)("p",{className:h.audioDeviceHint,children:r("outputDeviceUnsupported")}):!d&&a?(0,Ye.jsx)("p",{className:h.audioDeviceHint,children:r("inputDeviceStopFirst")}):null]})}var Ee=require("react"),mn=require("@deepseek-ai/dsh-client-ui-primitives");var ie=require("react/jsx-runtime"),Ph={busy:"\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F",archived:"\u4F1A\u8BDD\u5DF2\u5F52\u6863",unavailable:"\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528"},pt=e=>e.title?.trim()||`\u672A\u547D\u540D\u4F1A\u8BDD \xB7 ${e.sessionId.slice(-6).toUpperCase()}`,uo=e=>Ph[e.availability],qn=e=>["ready","busy"].includes(e?.availability),po=(e,n)=>e.checkedFor===n&&!e.uncertain&&!e.busy&&!e.ttsCancelling&&!e.existingSessionWritePending&&!e.existingSessionUnconfirmed&&e.status?.voiceControlBusy===!1&&e.status?.voiceSession?.fullyStopped===!0&&e.status?.enabled===!1;function md({sessionId:e,boundSession:n,state:t,controlContext:r,listExistingVoiceSessions:o,setExistingVoiceSession:i,readState:a,run:l,t:c}){let[u,d]=(0,Ee.useState)(),[p,f]=(0,Ee.useState)(!1),[m,y]=(0,Ee.useState)(!1),v=(0,Ee.useRef)(null),b=(0,Ee.useId)(),x=n?.sessionId??null,z=e===x,F=P=>po(P,e)&&Object.hasOwn(P.status,"existingVoiceSession")&&(P.status.existingVoiceSession?.sessionId??null)===x,Z=()=>r.currentConversation()===e&&r.sourceFor(e)===e;(0,Ee.useEffect)(()=>{let P=new AbortController;return v.current={signal:P.signal,choosing:!1},f(!1),o({sessionId:e},P.signal).then(D=>{P.signal.aborted||!Z()||(d(D.items.find(A=>A.sessionId===e)??null),(D.binding?.sessionId??null)!==x&&l(e,"status"))}).catch(()=>{P.signal.aborted||d(null)}),()=>P.abort()},[e,x,r,o]);let N=async()=>{let P=v.current;if(!(!P||P.signal.aborted||P.choosing||!Z())&&F(a())){P.choosing=!0,f(!0),y(!1);try{if(z){await i({sessionId:null,expectedSessionId:x});return}let D=await o({sessionId:e},P.signal);if(P.signal.aborted||!Z())return;let A=D.items.find(I=>I.sessionId===e),E=(D.binding?.sessionId??null)!==x;if(E||!qn(A)){d(A??null),y(!0),E&&l(e,"status");return}if(!F(a()))return;await i({sessionId:e,expectedSessionId:x})}catch{P.signal.aborted||y(!0)}finally{P.choosing=!1,P.signal.aborted||f(!1)}}},$=z?n:u,S=u===void 0&&!z,O=z||S||qn($);if(!O&&!m)return null;let C=c(z?"backToFishVoice":"chooseCurrentDshTarget"),_=S?c("checkingVoiceTarget"):$?pt($):"";return(0,ie.jsxs)("div",{className:h.currentDshTarget,"data-whale-current-target":!0,"data-no-drag":!0,children:[O&&(0,ie.jsxs)(mn.Button,{variant:"outline",className:h.currentDshAction,"data-whale-operation":z?"unbind-existing-session":"bind-current-session","aria-label":C,"aria-busy":p||S,"aria-describedby":b,disabled:!F(t)||p||S,onClick:()=>{N()},children:[(0,ie.jsx)("span",{children:C}),(0,ie.jsx)("span",{id:b,className:h.ellipsis,title:_,children:_})]}),m&&(0,ie.jsx)("p",{role:"alert",className:h.hint,children:c("currentDshTargetError")})]})}function Mi({state:e,sessionId:n,listExistingVoiceSessions:t,setExistingVoiceSession:r,openExistingVoiceSession:o,showHome:i,homePickerId:a,closeHomePicker:l,t:c}){let[u,d]=(0,Ee.useState)(null),[p,f]=(0,Ee.useState)(!1),[m,y]=(0,Ee.useState)(""),[v,b]=(0,Ee.useState)(null),[x,z]=(0,Ee.useState)(!1),[F,Z]=(0,Ee.useState)(!1),[N,$]=(0,Ee.useState)(null),S=(0,Ee.useRef)(null),O=(0,Ee.useRef)(!1),C=(0,Ee.useId)(),_=!!a,P=_||p,D=e.status,A=Object.hasOwn(D??{},"existingVoiceSession")?D.existingVoiceSession:u?.binding,E=D?.existingVoiceSessionSupported!==!1,I=po(e,n),H=e.existingSessionWritePending,L=u?.items.find(Y=>Y.sessionId===v),J=I&&!x&&!!A,K=I&&E&&!x&&!F&&!!u,ce=(0,Ee.useCallback)(async(Y="",ue)=>{S.current?.abort();let ge=new AbortController;S.current=ge,z(!0),Z(!1);try{let Ie=await t({...Y?{query:Y}:{},...ue?{cursor:ue}:{}},ge.signal);if(ge.signal.aborted)return;d(yn=>({...Ie,query:Y,items:ue&&yn?[...new Map([...yn.items,...Ie.items].map(Qe=>[Qe.sessionId,Qe])).values()]:Ie.items}))}catch{ge.signal.aborted||Z(!0)}finally{S.current===ge&&(S.current=null,z(!1))}},[t]);(0,Ee.useEffect)(()=>(O.current=!0,E?ce():z(!1),()=>{O.current=!1,S.current?.abort(),S.current=null}),[ce,E]);let de=Y=>{Y.preventDefault(),b(null),$(null),ce(m.trim())},me=async Y=>{if(!(!(Y===null?J:K)||Y===(A?.sessionId??null))){$(null);try{let{binding:ue}=await r({sessionId:Y,expectedSessionId:A?.sessionId??null});if(!O.current)return;if(_){l();return}d(ge=>ge&&{...ge,binding:ue}),f(!1),b(null),y(""),$({text:ue?"\u5DF2\u7ED1\u5B9A\u3002\u70B9\u51FB\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u540E\u5373\u53EF\u7EE7\u7EED\u8BE5\u4F1A\u8BDD\u3002":"\u5DF2\u89E3\u9664\uFF0C\u4E0B\u4E00\u6B21\u5F00\u59CB\u5BF9\u8BDD\u5C06\u4F7F\u7528\u9C7C\u5E94\u4F1A\u8BDD\u3002"}),E&&ce()}catch(ue){if(!O.current)return;$({error:!0,text:typeof ue?.message=="string"&&ue.message?ue.message.split(`
`)[0].slice(0,160):"\u4F1A\u8BDD\u7ED1\u5B9A\u672A\u786E\u8BA4\uFF0C\u8BF7\u6838\u5BF9\u5F53\u524D\u7ED1\u5B9A\u3002"}),b(null),E&&ce(P?m.trim():"")}}},j=(0,ie.jsxs)(ie.Fragment,{children:[x&&(0,ie.jsx)("p",{role:"status",className:h.hint,children:c("loadingVoiceTargets")}),F&&(0,ie.jsxs)("div",{role:"alert",className:h.notice,children:[c("voiceTargetListError")," ",(0,ie.jsx)(mn.Button,{variant:"outline",disabled:H,onClick:()=>{ce(m.trim())},children:c("retryVoiceTargets")})]})]}),T=N&&(0,ie.jsx)("p",{role:N.error?"alert":"status",className:N.error?h.notice:h.hint,children:N.text});return(0,ie.jsxs)("section",{id:a,className:_?h.homeTargetPicker:h.section,"data-whale-existing-session":!0,"aria-label":_?c("chooseVoiceTarget"):void 0,"data-no-drag":_||void 0,children:[!_&&(0,ie.jsxs)(ie.Fragment,{children:[(0,ie.jsx)("h3",{children:"\u8BED\u97F3\u5BF9\u8BDD\u76EE\u6807"}),(0,ie.jsxs)("div",{className:h.existingSessionTarget,children:[(0,ie.jsx)("strong",{className:h.sessionTitle,children:A?pt(A):"\u9C7C\u5E94\u4F1A\u8BDD"}),(0,ie.jsx)("p",{className:h.hint,children:A?"\u8BED\u97F3\u548C\u56DE\u7B54\u5199\u5165\u6B64\u4F1A\u8BDD\uFF0C\u9C7C\u5E94\u4EC5\u5728\u672C\u673A\u64AD\u62A5\u3002\u5176\u4ED6\u63D2\u4EF6\u7684\u8F6C\u53D1\u7531\u5176\u8BBE\u7F6E\u51B3\u5B9A\u3002":"\u53EF\u7ED1\u5B9A\u5DF2\u6709 DSH \u4F1A\u8BDD\uFF0C\u6CBF\u7528\u539F\u6765\u7684\u4E0A\u4E0B\u6587\u548C\u5386\u53F2\u3002"}),A&&uo(A)&&(0,ie.jsxs)("p",{role:"status",className:h.notice,children:[uo(A),"\u3002\u53EF\u89E3\u9664\u7ED1\u5B9A\u6216\u9009\u62E9\u5176\u4ED6\u4F1A\u8BDD\u3002"]}),!E&&(0,ie.jsx)("p",{role:"status",className:h.notice,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u4E0D\u652F\u6301\u7ED1\u5B9A\u5DF2\u6709\u4F1A\u8BDD\u3002"}),D?.enabled&&(0,ie.jsx)("p",{className:h.hint,children:"\u7ED3\u675F\u8BED\u97F3\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u7ED1\u5B9A\u3002"})]}),(0,ie.jsxs)("div",{className:h.actions,children:[(0,ie.jsx)(mn.Button,{variant:"outline","aria-expanded":P,disabled:!E||H,onClick:()=>{f(!P),b(null),y(""),P||ce()},children:P?"\u5173\u95ED\u4F1A\u8BDD\u5217\u8868":A?"\u66F4\u6362\u7ED1\u5B9A":"\u9009\u62E9\u5DF2\u6709\u4F1A\u8BDD"}),qn(A)&&o&&(0,ie.jsx)(mn.Button,{variant:"outline","data-whale-operation":"open-native-session",onClick:async()=>{$(null);try{await o(A.sessionId),await i?.()}catch{O.current&&$({error:!0,text:"DSH \u6682\u65F6\u65E0\u6CD5\u6253\u5F00\u539F\u4F1A\u8BDD\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"})}},children:"\u6253\u5F00\u539F\u4F1A\u8BDD"}),A&&(0,ie.jsx)(mn.Button,{variant:"outline","data-whale-operation":"unbind-existing-session",disabled:!J,onClick:()=>{me(null)},children:"\u89E3\u9664\u7ED1\u5B9A"})]})]}),P&&(0,ie.jsxs)("div",{className:h.existingSessionPicker,"aria-busy":x,children:[(0,ie.jsxs)("form",{className:h.existingSessionSearch,onSubmit:de,children:[(0,ie.jsx)(mn.Input,{type:"search","aria-label":c("searchVoiceTargets"),placeholder:c("searchVoiceTargets"),value:m,maxLength:128,disabled:H,onChange:Y=>y(Y.target.value)}),(0,ie.jsx)(mn.Button,{type:"submit",variant:"outline",disabled:H,children:c("searchVoiceTargetsAction")})]}),u?.items.length>0&&(0,ie.jsx)("ul",{className:h.existingSessionList,"aria-label":c("existingVoiceTargetList"),children:u.items.map(Y=>{let ue=A?.sessionId===Y.sessionId,ge=ue||!qn(Y),Ie=(0,ie.jsxs)("span",{className:h.hint,children:[ue?c("boundVoiceTarget")+" \xB7 ":"",c("voiceTargetAvailability_"+(Y.unavailableReason??Y.availability))," \xB7 ",Y.sessionId]});return(0,ie.jsx)("li",{children:_?(0,ie.jsxs)(mn.Button,{variant:"ghost",className:h.homeTargetRow,"data-whale-operation":"bind-existing-session",title:Y.sessionId,"aria-current":ue||void 0,"aria-disabled":!K,disabled:ge,onClick:()=>{me(Y.sessionId)},children:[(0,ie.jsx)("strong",{className:h.sessionTitle,children:pt(Y)}),Ie]}):(0,ie.jsxs)("label",{title:Y.sessionId,children:[(0,ie.jsx)("input",{type:"radio",name:C,value:Y.sessionId,checked:v===Y.sessionId,disabled:ge||x||H,onChange:()=>{b(Y.sessionId),$(null)}}),(0,ie.jsxs)("span",{children:[(0,ie.jsx)("strong",{className:h.sessionTitle,children:pt(Y)}),Ie]})]})},Y.sessionId)})}),j,!x&&!F&&u?.items.length===0&&(0,ie.jsx)("p",{role:"status",className:h.hint,children:c(u.query?"voiceTargetNoMatch":"voiceTargetEmptyList")}),L&&(0,ie.jsx)("p",{id:C+"-tts",className:h.hint,children:c("voiceTargetSynthesisNotice")}),T,(!_||u?.nextCursor||A)&&(0,ie.jsxs)("div",{className:h.actions,children:[!_&&(0,ie.jsx)(mn.Button,{variant:"primary","data-whale-operation":"bind-existing-session","aria-describedby":L?C+"-tts":void 0,disabled:!K||!qn(L)||L.sessionId===A?.sessionId,onClick:()=>{me(v)},children:c(H?"savingVoiceTarget":"bindVoiceTarget")}),!!u?.nextCursor&&(0,ie.jsx)(mn.Button,{variant:"outline",disabled:x||H,onClick:()=>{ce(u.query,u.nextCursor)},children:c("moreVoiceTargets")}),_&&A&&(0,ie.jsx)(mn.Button,{variant:"outline","data-whale-operation":"unbind-existing-session",disabled:!J,onClick:()=>{me(null)},children:c("backToFishVoice")})]})]}),!P&&(0,ie.jsxs)(ie.Fragment,{children:[j,T]})]})}var Ut=require("react"),Ot=require("@deepseek-ai/dsh-client-ui-primitives");var fo="dsh-fish-voice";var Zi={name:"Emikosama",url:"https://github.com/Emikosama"};var fd="https://github.com/Emikosama/dsh-fish-voice",gr={url:"https://github.com/Emikosama/dsh-fish-voice/issues"};var xe=require("react/jsx-runtime");function hd(e,n){let t=e.updates;return e.updatePending==="install"?n("update_installing"):e.updatePending==="check"?n("update_checking"):e.updatesUnavailable?n("updateConnection"):t?t.message||n("update_"+t.status):n("update_idle")}function gd({state:e,open:n,t}){let r=e.updates,o=!e.updatesUnavailable&&(r?.release||["restart-required","enable-required","installed"].includes(r?.status));return(0,xe.jsxs)("section",{className:h.section,"data-whale-update-settings":!0,children:[(0,xe.jsx)("h3",{children:t("updateTitle")}),r&&(0,xe.jsxs)("p",{className:h.hint,children:[t("updateCurrentVersion")," ",r.currentVersion," \xB7 ",t("updateChannel_"+r.channel)]}),(0,xe.jsx)("p",{children:hd(e,t)}),(0,xe.jsxs)("div",{className:h.actions,children:[o&&(0,xe.jsx)(Ot.Button,{variant:"outline",onClick:()=>n(!1),children:t("updateDetails")}),(0,xe.jsx)(Ot.Button,{variant:"outline",disabled:!!e.updatePending||!e.updatesUnavailable&&r?.status==="installing",onClick:()=>n(!0),children:t("updateCheck")}),(0,xe.jsx)("a",{href:gr.url,"data-whale-operation":"open-feedback",target:"_blank",rel:"noreferrer noopener",children:t("updateFeedback")})]})]})}function bd({state:e,close:n,run:t,t:r}){let o=(0,Ut.useRef)(null),i=(0,Ut.useId)();(0,Ut.useLayoutEffect)(()=>{let m=o.current;return typeof m.showModal=="function"?m.showModal():m.setAttribute("open",""),()=>{m.open&&m.close?.()}},[]);let a=e.updates,l=a?.release,c=!!e.updatePending||!e.updatesUnavailable&&["checking","installing"].includes(a?.status),u=!e.updatesUnavailable&&!c&&a?.canInstall&&l,d=!c&&(e.updatesUnavailable||!["restart-required","enable-required"].includes(a?.status)),p=!e.updatesUnavailable&&["available","incompatible"].includes(a?.status),f=u&&!a.message?null:hd(e,r);return(0,xe.jsxs)("dialog",{ref:o,className:h.updateDialog,"data-whale-update-dialog":!0,"data-no-drag":!0,"aria-labelledby":i,onCancel:m=>{m.preventDefault(),n()},onKeyDown:m=>m.stopPropagation(),children:[(0,xe.jsxs)("header",{className:h.updateHeader,children:[(0,xe.jsx)(et,{}),(0,xe.jsx)("h2",{id:i,children:r(p?"updateOfferTitle":"updateTitle")})]}),a&&(0,xe.jsxs)("p",{className:h.hint,children:[r("updateCurrentVersion")," ",a.currentVersion,l&&l.version!==a.currentVersion&&(0,xe.jsxs)(xe.Fragment,{children:[" \xB7 ",r("updateNewVersion")," ",l.version]})," \xB7 ",r("updateChannel_"+a.channel)]}),l?.announcement&&(0,xe.jsx)("p",{className:h.updateAnnouncement,children:l.announcement}),f&&(0,xe.jsx)("p",{className:h.hint,role:"status",children:f}),(0,xe.jsxs)("div",{className:h.actions,children:[(0,xe.jsx)(Ot.Button,{variant:"outline",onClick:n,children:r(p?"updateLater":"close")}),u&&(0,xe.jsx)(Ot.Button,{variant:"primary",className:h.primary,onClick:()=>{t({action:"install",version:l.version})},children:r("updateInstall")}),!u&&d&&(0,xe.jsx)(Ot.Button,{variant:"outline",onClick:()=>{t({action:"check"})},children:r("updateCheck")})]}),(0,xe.jsxs)("footer",{className:h.actions,children:[l?.url?.startsWith("https://")&&(0,xe.jsx)("a",{href:l.url,target:"_blank",rel:"noreferrer noopener",children:r("updateRelease")}),(0,xe.jsx)("a",{href:gr.url,"data-whale-operation":"open-feedback",target:"_blank",rel:"noreferrer noopener",children:r("updateFeedback")})]})]})}var Nh=new Map([["audio","settings-audio"],["interaction","settings-interaction"],["prompt","settings-prompt"],["models","settings-models"],["advanced","settings-advanced"],["pets","settings-pets"],["sessions","page-session-management"]]);function Eh(e){if(e.nativeEvent?.isTrusted!==!0)return null;let n=e.target;if(!n?.closest)return null;let t=n.closest("[data-whale-operation-log]");return t&&!(e.type==="click"&&n.closest("summary")?.parentElement===t)?null:n}function vd(e){let n=Eh(e);if(!n)return null;if(e.type==="submit")return"commit-form";if(e.type==="keydown")return e.key==="Escape"?"dismiss":["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key)&&n.closest('[data-settings-nav], [role="listbox"]')?"keyboard-navigation":null;if(e.type==="change")return n.matches('input[type="radio"]')&&["listen-mode-ptt","listen-mode-always","listen-mode-wake"].includes(n.dataset.whaleOperation)?n.dataset.whaleOperation:n.closest("[data-audio-device-controls] select")?"change-audio-device":n.matches('select, input[type="radio"], input[type="checkbox"]')?"edit-choice":null;if(e.type!=="click")return null;let t=n.closest("button, a[href], summary");if(!t||t.type==="submit"&&t.form)return null;let r=t.dataset.whaleOperation;return r==="open-feedback"&&t.matches("summary")&&t.parentElement.open?"dismiss":t.matches("summary")&&["session-history","subagent-history"].includes(r)?r+(t.parentElement.open?"-close":"-open"):r||(t.hasAttribute("data-settings-tab")?Nh.get(t.dataset.settingsTab)??"page-settings-tab":t.closest("[data-whale-session-management], [data-whale-existing-session]")?"manage-session":t.closest("[data-settings-page-heading] nav")?"page-model-tab":t.matches("summary")?"details-toggle":"activate-control")}var Ln=require("react"),Bi=require("@deepseek-ai/dsh-client-ui-primitives");var We=require("react/jsx-runtime"),Ih="fish-voice-operation-log.log",yd=256*1024,Th=(e,n)=>(e+n).slice(-yd);function wd({readOperationLog:e}){let[n,t]=(0,Ln.useState)(!1),[r,o]=(0,Ln.useState)(!1),[i,a]=(0,Ln.useState)(null),[l,c]=(0,Ln.useState)(null),u=(0,Ln.useRef)(null);if((0,Ln.useEffect)(()=>()=>u.current?.abort(),[]),!e)return null;let d=async f=>{if(u.current)return;let m=new AbortController;u.current=m,o(!0),c(null);try{let y=await e(m.signal);if(m.signal.aborted)return;if(f){let v=URL.createObjectURL(new Blob(y,{type:"text/plain;charset=utf-8"})),b=document.createElement("a");b.href=v,b.download=Ih,$h(b),setTimeout(()=>URL.revokeObjectURL(v),1e3),c("\u5DF2\u8BF7\u6C42\u4FDD\u5B58\u8BCA\u65AD\u65E5\u5FD7\u3002")}else a({text:y.reduce(Th,""),shortened:y.reduce((v,b)=>v+b.length,0)>yd})}catch{m.signal.aborted||c("\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u8BCA\u65AD\u65E5\u5FD7\uFF0C\u8BF7\u91CD\u8BD5\u3002")}finally{u.current===m&&(u.current=null),m.signal.aborted||o(!1)}},p=f=>{let m=f.currentTarget.open;t(m),m||(u.current?.abort(),u.current=null,o(!1),a(null),c(null))};return(0,We.jsxs)("details",{className:h.section,"data-whale-operation-log":!0,open:n,onToggle:p,children:[(0,We.jsx)("summary",{"data-whale-operation":"open-feedback",children:"\u6392\u67E5\u4E0E\u53CD\u9988"}),n&&(0,We.jsxs)(We.Fragment,{children:[(0,We.jsx)("p",{className:h.hint,children:"\u6700\u8FD1\u4E03\u5929\u7684\u64CD\u4F5C\u65E5\u5FD7\u3002\u53EF\u5148\u67E5\u770B\uFF0C\u518D\u81EA\u884C\u51B3\u5B9A\u662F\u5426\u968F\u53CD\u9988\u63D0\u4EA4\u3002"}),(0,We.jsxs)("div",{className:h.actions,children:[(0,We.jsx)(Bi.Button,{variant:"outline",disabled:r,onClick:()=>{d(!1)},children:"\u67E5\u770B\u8BCA\u65AD\u65E5\u5FD7"}),(0,We.jsx)(Bi.Button,{variant:"outline",disabled:r,onClick:()=>{d(!0)},children:"\u4FDD\u5B58\u8BCA\u65AD\u65E5\u5FD7"}),(0,We.jsx)("a",{href:gr.url+"/new",target:"_blank",rel:"noreferrer noopener",children:"\u63D0\u4EA4\u53CD\u9988"})]}),r&&(0,We.jsx)("p",{role:"status",className:h.hint,children:"\u6B63\u5728\u8BFB\u53D6\u8BCA\u65AD\u65E5\u5FD7\u2026"}),l&&(0,We.jsx)("p",{role:"status",className:h.hint,children:l}),i?.shortened&&(0,We.jsx)("p",{className:h.hint,children:"\u8FD9\u91CC\u53EA\u663E\u793A\u6700\u8FD1\u4E00\u6BB5\uFF0C\u4FDD\u5B58\u53EF\u53D6\u5F97\u5B8C\u6574\u65E5\u5FD7\u3002"}),i&&(0,We.jsx)("pre",{className:h.requestDetails,tabIndex:0,"aria-label":"\u64CD\u4F5C\u65E5\u5FD7\u9884\u89C8",children:i.text||"\u6682\u65E0\u64CD\u4F5C\u65E5\u5FD7\u3002"})]})]})}function $h(e){document.body.append(e);try{e.click()}finally{e.remove()}}var R=require("react"),G=require("@deepseek-ai/dsh-client-ui-primitives");var he=require("react"),pe=require("@deepseek-ai/dsh-client-ui-primitives");var B={selectedModel:"nKUg0q_selectedModel",modelInstaller:"nKUg0q_modelInstaller",badge:"nKUg0q_badge",consentActions:"nKUg0q_consentActions",section:"nKUg0q_section",choices:"nKUg0q_choices",hint:"nKUg0q_hint",wizardBody:"nKUg0q_wizardBody",inlineField:"nKUg0q_inlineField",wizard:"nKUg0q_wizard",primary:"nKUg0q_primary",modelChoices:"nKUg0q_modelChoices",header:"nKUg0q_header",hardwareSummary:"nKUg0q_hardwareSummary",switchRow:"nKUg0q_switchRow",field:"nKUg0q_field",actions:"nKUg0q_actions",sourceChoices:"nKUg0q_sourceChoices",wizardBodyContent:"nKUg0q_wizardBodyContent",installHistory:"nKUg0q_installHistory",fullName:"nKUg0q_fullName",installPath:"nKUg0q_installPath",choice:"nKUg0q_choice",plan:"nKUg0q_plan",currentModel:"nKUg0q_currentModel",note:"nKUg0q_note",jobHeading:"nKUg0q_jobHeading",setupEnter:"nKUg0q_setupEnter",switcher:"nKUg0q_switcher",job:"nKUg0q_job",jobs:"nKUg0q_jobs",details:"nKUg0q_details",text:`.nKUg0q_section {
  min-width: 0;
  color: var(--dsw-alias-label-primary);
  gap: 8px;
  display: grid;
}

.nKUg0q_section h3, .nKUg0q_wizard h2, .nKUg0q_plan h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
}

.nKUg0q_section p, .nKUg0q_wizard p {
  margin: 0;
  line-height: 1.6;
}

.nKUg0q_hint, .nKUg0q_section small, .nKUg0q_wizard small {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 1.6;
}

.nKUg0q_note {
  border-left: 2px solid var(--dsw-alias-state-warn-primary);
  background: var(--dsw-alias-bg-layer-2);
  padding: 8px 12px;
  font-size: 12px;
}

.nKUg0q_actions, .nKUg0q_header {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  display: flex;
}

.nKUg0q_header {
  justify-content: space-between;
  align-items: flex-start;
}

.nKUg0q_choices {
  border: 0;
  gap: 8px;
  min-width: 0;
  margin: 0;
  padding: 0;
  display: grid;
}

.nKUg0q_choices legend {
  color: var(--dsw-alias-label-secondary);
  padding: 0 0 8px;
  font-size: 12px;
}

.nKUg0q_choice {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  cursor: pointer;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 10px;
  display: flex;
}

.nKUg0q_choice[data-selected="true"] {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,var(--dsw-alias-bg-layer-1));
}

.nKUg0q_choice input {
  accent-color: var(--dsw-alias-brand-primary);
  margin: 4px 0 0;
}

.nKUg0q_choice span {
  min-width: 0;
}

.nKUg0q_choice small, .nKUg0q_plan small {
  overflow-wrap: anywhere;
  display: block;
}

.nKUg0q_choice strong {
  font-size: 13px;
}

.nKUg0q_field {
  gap: 6px;
  font-size: 12px;
  display: grid;
}

.nKUg0q_field input, .nKUg0q_field select {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}

.nKUg0q_field select {
  font: inherit;
  color: inherit;
  background: var(--dsw-alias-bg-layer-2);
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  padding: 8px;
}

.nKUg0q_details {
  border-top: 1px solid var(--dsw-alias-border-l2);
  min-width: 0;
  padding-top: 12px;
}

.nKUg0q_details summary {
  cursor: pointer;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

.nKUg0q_details[open] > summary {
  margin-bottom: 12px;
}

.nKUg0q_badge {
  border-radius: var(--dsw-radius-sm);
  color: var(--dsw-alias-label-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,var(--dsw-alias-bg-layer-1));
  margin-left: 8px;
  padding: 2px 6px;
  font-size: 11px;
}

.nKUg0q_plan, .nKUg0q_job {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  gap: 10px;
  min-width: 0;
  padding: 12px;
  display: grid;
}

.nKUg0q_plan dl {
  grid-template-columns: auto minmax(0, 1fr);
  gap: 6px 12px;
  margin: 0;
  font-size: 12px;
  display: grid;
}

.nKUg0q_plan dt {
  color: var(--dsw-alias-label-secondary);
}

.nKUg0q_plan dd {
  overflow-wrap: anywhere;
  margin: 0;
}

.nKUg0q_plan a {
  color: var(--dsw-alias-link);
  overflow-wrap: anywhere;
  font-size: 12px;
}

.nKUg0q_plan ul {
  margin: 0;
  padding-left: 16px;
  font-size: 12px;
}

.nKUg0q_jobs {
  gap: 12px;
  display: grid;
}

.nKUg0q_job progress {
  width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
}

.nKUg0q_wizard {
  box-sizing: border-box;
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-layer-1);
  border-radius: var(--dsw-radius-lg);
}

.nKUg0q_section button, .nKUg0q_wizard button {
  transition: transform var(--ds-transition-duration-fast, .1s) var(--whale-ease, ease-out);
}

.nKUg0q_section button:active:not(:disabled), .nKUg0q_wizard button:active:not(:disabled) {
  transform: scale(.97);
}

.nKUg0q_section :is(button, input, select, a, summary):focus-visible, .nKUg0q_wizard :is(button, summary):focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

[data-motion="firm"] .nKUg0q_wizard {
  --whale-duration: var(--ds-transition-duration-fast, .1s);
  --whale-ease: ease-out;
}

[data-motion="off"] .nKUg0q_wizard, [data-motion="off"] .nKUg0q_wizard *, [data-motion="off"] .nKUg0q_section * {
  transition: none !important;
  animation: none !important;
  transform: none !important;
}

@keyframes nKUg0q_setupEnter {
  from {
    translate: 0 4px;
  }

  to {
    translate: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nKUg0q_wizard, .nKUg0q_wizard *, .nKUg0q_section * {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
}

@media (width <= 520px) {
  .nKUg0q_wizard {
    padding: 12px;
  }

  .nKUg0q_plan dl {
    grid-template-columns: minmax(0, 1fr);
    gap: 3px;
  }

  .nKUg0q_plan dd {
    margin-bottom: 6px;
  }
}

@media (forced-colors: active) {
  .nKUg0q_choice[data-selected="true"] {
    outline: 2px solid highlight;
  }
}

.nKUg0q_wizard {
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

.nKUg0q_wizard > .nKUg0q_header, .nKUg0q_wizard > footer {
  flex-shrink: 0;
}

.nKUg0q_wizardBody {
  overscroll-behavior: contain;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.nKUg0q_wizardBodyContent {
  align-content: start;
  gap: 12px;
  display: grid;
}

.nKUg0q_primary {
  color: var(--dsw-alias-label-primary) !important;
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 16%,var(--dsw-alias-bg-layer-2)) !important;
  border: 1px solid var(--dsw-alias-border-l2) !important;
}

.nKUg0q_primary:disabled {
  opacity: .5;
}

.nKUg0q_choices {
  gap: 6px;
}

.nKUg0q_choice {
  box-sizing: border-box;
  align-items: center;
  min-height: 38px;
}

.nKUg0q_choice input {
  flex: none;
  margin: 0;
}

.nKUg0q_choice strong {
  display: block;
}

.nKUg0q_choice:has(input:disabled) {
  cursor: default;
  opacity: .65;
}

.nKUg0q_note p {
  margin: 0;
}

.nKUg0q_note button {
  margin-top: 8px;
}

.nKUg0q_wizard > footer {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

.nKUg0q_wizardBody {
  padding: 2px 4px 8px 0;
}

.nKUg0q_section > button, .nKUg0q_wizardBody > button {
  justify-self: start;
  max-width: 100%;
}

.nKUg0q_section button, .nKUg0q_wizard button {
  white-space: normal;
  max-width: 100%;
  height: auto;
  min-height: 36px;
}

.nKUg0q_actions > button {
  flex: 0 auto;
}

.nKUg0q_sourceChoices {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.nKUg0q_sourceChoices legend {
  grid-column: 1 / -1;
}

.nKUg0q_inlineField {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-width: 0;
  font-size: 12px;
  display: flex;
}

.nKUg0q_inlineField select {
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

.nKUg0q_inlineField input[type="number"] {
  width: 80px;
  min-width: 0;
}

.nKUg0q_field:has( > input[type="number"]) {
  flex-wrap: wrap;
  align-items: center;
  display: flex;
}

.nKUg0q_field > input[type="number"] {
  width: 80px;
}

.nKUg0q_details > summary {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  box-sizing: content-box;
  width: fit-content;
  max-width: 100%;
  min-height: 20px;
  padding: 7px 10px;
}

.nKUg0q_fullName {
  min-width: 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

.nKUg0q_fullName summary {
  cursor: pointer;
}

.nKUg0q_fullName p {
  overflow-wrap: anywhere;
}

.nKUg0q_consentActions {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  display: flex;
}

@container (width <= 360px) {
  .nKUg0q_sourceChoices {
    grid-template-columns: minmax(0, 1fr);
  }

  .nKUg0q_inlineField select {
    width: 150px;
  }
}

@media (width <= 420px) {
  .nKUg0q_wizard .nKUg0q_sourceChoices {
    grid-template-columns: minmax(0, 1fr);
  }
}

.nKUg0q_modelChoices {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.nKUg0q_modelChoices > legend {
  grid-column: 1 / -1;
  padding-bottom: 5px;
}

.nKUg0q_modelChoices .nKUg0q_choice {
  gap: 7px;
  min-height: 80px;
  padding: 8px;
}

.nKUg0q_modelChoices .nKUg0q_choice strong {
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  display: flex;
}

.nKUg0q_modelChoices .nKUg0q_badge {
  white-space: nowrap;
  margin-left: 0;
}

.nKUg0q_hardwareSummary {
  color: var(--dsw-alias-label-secondary);
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 2px 10px;
  font-size: 11px;
  display: flex;
}

.nKUg0q_hardwareSummary small {
  font-size: 10px;
}

.nKUg0q_currentModel, .nKUg0q_switchRow, .nKUg0q_jobHeading {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.nKUg0q_currentModel {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  padding: 7px 8px;
  font-size: 12px;
}

.nKUg0q_currentModel > span, .nKUg0q_switchRow > span {
  overflow-wrap: anywhere;
  min-width: 0;
}

.nKUg0q_currentModel button, .nKUg0q_switchRow button {
  flex: none;
  min-height: 30px;
  padding: 0 9px;
}

.nKUg0q_switcher {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  gap: 7px;
  padding: 8px;
  display: grid;
}

.nKUg0q_switchRow small {
  display: block;
}

.nKUg0q_selectedModel {
  border-top: 1px solid var(--dsw-alias-border-l2);
  gap: 7px;
  padding-top: 6px;
  display: grid;
}

.nKUg0q_selectedModel .nKUg0q_details {
  padding-top: 4px;
}

.nKUg0q_selectedModel .nKUg0q_details summary {
  border: 0;
  padding: 3px 0;
}

.nKUg0q_installHistory {
  border-top: 1px solid var(--dsw-alias-border-l2);
}

.nKUg0q_installHistory > summary {
  cursor: pointer;
  padding: 8px 0;
  font-size: 12px;
  display: list-item;
}

.nKUg0q_installHistory > summary small {
  margin-left: 12px;
}

.nKUg0q_installHistory .nKUg0q_job {
  gap: 6px;
  padding: 9px;
}

.nKUg0q_jobHeading {
  flex-wrap: wrap;
}

.nKUg0q_installPath {
  min-width: 0;
  font-size: 11px;
}

.nKUg0q_installPath summary {
  cursor: pointer;
  color: var(--dsw-alias-label-secondary);
}

.nKUg0q_installPath p {
  overflow-wrap: anywhere;
}

.nKUg0q_modelInstaller .nKUg0q_jobs:empty {
  display: none;
}

@container (width <= 300px) {
  .nKUg0q_modelChoices {
    grid-template-columns: minmax(0, 1fr);
  }

  .nKUg0q_currentModel {
    flex-wrap: wrap;
  }
}

.nKUg0q_section[aria-label="\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84"] p {
  overflow-wrap: anywhere;
}

.nKUg0q_choice {
  transition: background-color .12s ease-out, border-color .12s ease-out, box-shadow .12s ease-out;
}

.nKUg0q_choice:hover:has(input:not(:disabled)) {
  border-color: var(--dsw-alias-brand-primary);
}

.nKUg0q_choice:has(input:focus-visible) {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: 2px;
}

.nKUg0q_section :is(button, select, input, summary), .nKUg0q_wizard :is(button, select, input, summary) {
  transition: background-color .12s ease-out,border-color .12s ease-out,color .12s ease-out,transform var(--whale-duration, .2s) var(--whale-ease, ease-out);
}

.nKUg0q_section button:hover:not(:disabled), .nKUg0q_wizard button:hover:not(:disabled) {
  background-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,var(--dsw-alias-bg-layer-1));
}

.nKUg0q_plan, .nKUg0q_switcher, .nKUg0q_selectedModel, .nKUg0q_section [data-whale-save-result], .nKUg0q_wizardBodyContent > section {
  animation: nKUg0q_setupEnter var(--whale-duration, .2s) ease-out;
}

[data-motion="firm"] :is(.nKUg0q_section, .nKUg0q_wizard) {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="off"] :is(.nKUg0q_section, .nKUg0q_wizard), [data-motion="off"] :is(.nKUg0q_section, .nKUg0q_wizard) *, [data-motion="off"] :is(.nKUg0q_section, .nKUg0q_wizard) :before {
  transition: none !important;
  animation: none !important;
}

[data-motion="off"] :is(.nKUg0q_section, .nKUg0q_wizard) button:active {
  transform: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .nKUg0q_section, .nKUg0q_wizard, .nKUg0q_section *, .nKUg0q_wizard *, .nKUg0q_section :before, .nKUg0q_wizard :before {
    transition: none !important;
    animation: none !important;
  }

  .nKUg0q_section button:active, .nKUg0q_wizard button:active {
    transform: none !important;
  }
}
`};var g=require("react/jsx-runtime"),_d=[["deepseek","DeepSeek \u8BED\u97F3\u5408\u6210","\u5B98\u65B9 API \xB7 \u9ED8\u8BA4\u97F3\u8272\u6D77\u661F"],["local","\u672C\u5730\u8BED\u97F3\u6A21\u578B","\u5728\u672C\u673A\u5408\u6210\uFF0C\u9996\u6B21\u9700\u8981\u4E0B\u8F7D"],["off","\u4E0D\u53D1\u58F0","\u53EA\u663E\u793A\u6587\u5B57"]],xd={deepseek:"DeepSeek \u8BED\u97F3\u5408\u6210",local:"\u672C\u5730\u8BED\u97F3\u6A21\u578B"},ho={provider:"deepseek",deepseekVoice:"stella",deepseekTextTransmissionAccepted:!1,volume:.8,localModelId:null,localModelPath:null,referenceAudioPath:null},Ad="\u8BF7\u5728 DSH \u7684 DeepSeek API Key \u63D0\u4F9B\u5546\u4E2D\u914D\u7F6E\u5F00\u653E\u5E73\u53F0\u5BC6\u94A5\uFF0C\u518D\u91CD\u65B0\u68C0\u67E5\u3002",Sd="\u6717\u8BFB\u548C\u8BD5\u542C\u4F1A\u5411 DeepSeek \u53D1\u9001\u5F85\u6717\u8BFB\u7684\u6587\u5B57\uFF0C\u6309\u5B57\u7B26\u7528\u91CF\u8BA1\u8D39\u3002",br=e=>e.authorization?.scopes?.some(n=>n.id==="deepseek-text"&&n.allowed)===!0,Fi=e=>{let n={...e};return delete n.referenceAudioAccepted,n},zd=(e,n)=>({...Fi(e),referenceAudioAccepted:e.referenceAudioPath===n?.referenceAudioPath&&n?.referenceAudioAccepted===!0}),Cd=B.text,Oh=e=>({"restart-requires-resume":"\u5BBF\u4E3B\u5DF2\u91CD\u542F\uFF0C\u8BF7\u7EE7\u7EED\u540E\u91CD\u65B0\u6838\u9A8C\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u8986\u76D6\u8BBE\u7F6E\u3002","authorization-changed":"\u6388\u6743\u5DF2\u6539\u53D8\uFF0C\u8BF7\u5728\u6743\u9650\u4E2D\u6838\u67E5\u540E\u7EE7\u7EED\u3002",MODEL_SOURCE_AUTHORIZATION_REQUIRED:"\u6A21\u578B\u6765\u6E90\u6388\u6743\u5DF2\u53D8\u5316\uFF0C\u8BF7\u8865\u5145\u4E00\u6B21\u6388\u6743\u540E\u7EE7\u7EED\u3002",HUMAN_SETTING_PINNED:"\u8BBE\u7F6E\u6743\u9650\u5DF2\u64A4\u9500\uFF0C\u8BF7\u5728\u6743\u9650\u4E2D\u6838\u67E5\u540E\u7EE7\u7EED\u3002"})[e]??(typeof e=="string"&&/^[A-Z_:-]+$/.test(e)?"\u8FD0\u884C\u68C0\u67E5\u672A\u901A\u8FC7\uFF0C\u8BF7\u68C0\u67E5\u4F9D\u8D56\u6216\u67E5\u770B\u9AD8\u7EA7\u8BBE\u7F6E\u4E2D\u7684\u9519\u8BEF\u3002":e),vn=e=>Number.isFinite(e)&&e>=0?`${(e/1024**2).toFixed(1)} MiB`:"\u672A\u77E5";function Pd(e,n){let t=e.status;return!!(e.checkedFor===n&&e.settingsFor===n&&e.settings?.revision&&!e.ttsCancelling&&!e.ttsUncertain&&!e.uncertain&&!e.settingsConflict&&t?.enabled===!1&&t?.ownerSessionId===null&&t?.voiceControlBusy===!1&&t?.voiceSession?.fullyStopped===!0&&t?.voiceSession?.id===null&&!t?.ttsRuntime?.busy&&!t?.ttsRuntime?.blocked)}function mt(e,n){return!e.busy&&Pd(e,n)}function Rt(e,n){let t=(0,he.useRef)(!1),[r,o]=(0,he.useState)(!1),[i,a]=(0,he.useState)(null),[l,c]=(0,he.useState)(0);return[async(d,p)=>{if(t.current)return!1;t.current=!0,o(!0),a(d);try{return await e(n,d,p)}catch{return!1}finally{t.current=!1,o(!1),a(null),c(f=>f+1)}},r,i,{isLocked:()=>t.current,settled:l}]}function Nd({state:e,sessionId:n,run:t}){if(Pd(e,n))return null;let r=e.checkedFor===n&&(e.status?.enabled||e.status?.ownerSessionId);return(0,g.jsxs)("div",{className:B.note,role:"status",children:[(0,g.jsx)("p",{children:e.busy?"\u6B63\u5728\u8BFB\u53D6\u6216\u4FDD\u5B58\uFF0C\u8BF7\u7A0D\u5019\u2026":r?"\u8BF7\u5148\u505C\u6B62\u8BED\u97F3\uFF0C\u518D\u7F16\u8F91\u6216\u8BD5\u542C\u3002":e.ttsUncertain||e.uncertain?"\u6B63\u5728\u6838\u67E5\u4E0A\u6B21\u64CD\u4F5C\u3002":"\u6B63\u5728\u51C6\u5907\u8BBE\u7F6E\u2026"}),r&&n&&t&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:e.busy&&(!e.interruptibleRead||e.diagnosticStopPending)||e.ttsCancelling,onClick:()=>{t(n,"disable")},children:"\u505C\u6B62\u8BED\u97F3\u4EE5\u7F16\u8F91"})]})}function Ed(e){let n=e.state.settingsFor===e.sessionId?e.state.settings:null;return(0,g.jsx)(Uh,{...e,settings:n},`${e.sessionId}:${e.state.settingsKey??n?.revision??"unread"}`)}function Id({value:e,disabled:n,onChange:t}){return(0,g.jsxs)("label",{className:B.inlineField,children:["DeepSeek \u97F3\u8272",(0,g.jsxs)("select",{"aria-label":"DeepSeek \u97F3\u8272",value:e,disabled:n,onChange:r=>t(r.target.value),children:[(0,g.jsx)("option",{value:"stella",children:"\u6D77\u661F \xB7 \u5973\u58F0"}),(0,g.jsx)("option",{value:"tide",children:"\u6697\u6F6E \xB7 \u7537\u58F0"})]})]})}function Uh({state:e,sessionId:n,run:t,settings:r,prepared:o=!1,active:i=!0,markSettingsEdited:a,pickPath:l}){let[c,u]=(0,he.useState)(()=>({...ho,...r?.ttsSetup})),[d,p,f]=Rt(t,n),m=(0,he.useId)(),[y,v]=(0,he.useState)(!1),b=e.ttsCapabilitiesFor===n?e.ttsCapabilities:null,x=e.checkedFor===n?e.status?.ttsRuntime:null,z=e.ttsPreviewFor===n?e.ttsPreview:null,F=e.installerFor===n?e.installer?.jobs?.find(I=>bo(I,r)):null,Z=!mt(e,n)||p,N=JSON.stringify(c)!==JSON.stringify({...ho,...r?.ttsSetup}),$=c.provider==="deepseek",S=$&&(e.authorizationUncertain||c.deepseekTextTransmissionAccepted&&!e.authorization),O=$&&!S&&!(c.deepseekTextTransmissionAccepted&&br(e)),C=$&&b?.deepseekKeyAvailable!==!0,_=I=>{a?.("save-tts"),u(H=>({...H,...I}))},P=c.localModelId==="qwen3-tts-base-1.7b-gguf",D=Number(c.volume),A=!C&&!S&&(c.provider!=="local"||!!(c.localModelId&&c.localModelPath)&&(!c.referenceAudioPath||P))&&c.volume!==""&&Number.isFinite(D)&&D>=0&&D<=1,E={...c,volume:D,deepseekTextTransmissionAccepted:$||c.deepseekTextTransmissionAccepted};return(0,g.jsxs)("section",{className:B.section,"aria-label":"\u6717\u8BFB\u8BBE\u7F6E","data-settings-draft":"save-tts",children:[(0,g.jsx)("header",{children:(0,g.jsx)("h3",{children:"\u56DE\u7B54\u600E\u4E48\u53D1\u58F0"})}),(!o||n&&!(e.checkedFor===n&&(e.status?.enabled||e.status?.ownerSessionId)))&&(0,g.jsx)(Nd,{state:e,sessionId:n,run:t}),!$&&(!o||!r||!b||e.uncertain||e.ttsUncertain)&&(0,g.jsx)("div",{className:B.actions,children:(0,g.jsx)(pe.Button,{variant:"outline",disabled:e.busy||p,onClick:()=>d("inspect-tts"),children:"\u68C0\u6D4B\u672C\u673A\u8BED\u97F3"})}),(0,g.jsxs)("fieldset",{className:`${B.choices} ${B.sourceChoices}`,disabled:Z||!r,children:[(0,g.jsx)("legend",{children:"\u6717\u8BFB\u6765\u6E90"}),_d.map(([I,H,L])=>(0,g.jsxs)("label",{className:B.choice,"data-selected":c.provider===I,children:[(0,g.jsx)("input",{type:"radio",name:m,checked:c.provider===I,onChange:()=>_({provider:I})}),(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:H}),(0,g.jsx)("small",{children:L})]})]},I))]}),$&&(0,g.jsxs)("div",{className:B.section,children:[(0,g.jsx)("p",{className:B.hint,children:Sd}),S&&(0,g.jsx)("p",{role:"status",className:B.hint,children:"\u6B63\u5728\u8BFB\u53D6 DeepSeek \u6717\u8BFB\u6388\u6743\u2026"}),O&&(0,g.jsx)("p",{className:B.hint,children:"\u542F\u7528\u524D\uFF0C\u56DE\u7B54\u53EA\u663E\u793A\u6587\u5B57\u3002\u8BD5\u542C\u53EA\u53D1\u9001\u56FA\u5B9A\u793A\u4F8B\u3002"}),C&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("p",{role:"status",className:B.hint,children:Ad}),(0,g.jsx)(pe.Button,{variant:"outline",disabled:e.busy||p,onClick:()=>d("inspect-tts"),children:b?"\u91CD\u65B0\u68C0\u67E5 DeepSeek API Key":"\u68C0\u67E5 DeepSeek API Key"})]}),(0,g.jsx)(Id,{value:c.deepseekVoice,disabled:Z,onChange:I=>_({deepseekVoice:I})})]}),c.provider==="local"&&(c.localModelId?(0,g.jsxs)("div",{className:B.section,children:[(0,g.jsxs)("div",{className:B.currentModel,children:[(0,g.jsxs)("span",{children:["\u5F53\u524D\u6717\u8BFB\u6A21\u578B ",(0,g.jsx)("strong",{children:c.localModelId.startsWith("qwen3")?"Qwen3-TTS":c.localModelId.includes("melo")?"MeloTTS":c.localModelId})]}),(0,g.jsx)(pe.Button,{variant:"outline","aria-expanded":y,disabled:N,onClick:()=>v(I=>!I),children:"\u5207\u6362\u5F53\u524D\u6A21\u578B"})]}),y&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)($d,{state:e,sessionId:n,run:t,purpose:"tts"}),(0,g.jsxs)("details",{className:B.details,children:[(0,g.jsx)("summary",{children:"\u5B89\u88C5\u5176\u4ED6\u6717\u8BFB\u6A21\u578B"}),(0,g.jsx)(go,{pickPath:l,state:e,sessionId:n,run:t,active:i})]})]})]}):(0,g.jsx)(go,{pickPath:l,state:e,sessionId:n,run:t,active:i})),c.provider==="local"&&!N&&F?.modelId==="qwen3-tts-base-1.7b-gguf"&&(0,g.jsxs)("p",{className:B.hint,children:["\u5F53\u524D\u5B89\u88C5\u65B9\u6848\uFF1A",vr(F.compute),"\u3002",F.compute==="cpu"?"\u6B64\u5B89\u88C5\u53EA\u4F7F\u7528 CPU\u3002\u53EF\u5728\u201C\u5207\u6362\u5F53\u524D\u6A21\u578B \u2192 \u5B89\u88C5\u5176\u4ED6\u6717\u8BFB\u6A21\u578B\u201D\u9009\u62E9\u81EA\u52A8 GPU\uFF1B\u4E0B\u8F7D\u8FD0\u884C\u7EC4\u4EF6\u524D\u4ECD\u9700\u786E\u8BA4\u3002":"\u662F\u5426\u5B9E\u9645\u4F7F\u7528 GPU\uFF0C\u4EE5\u5B8C\u6210\u5408\u6210\u540E\u7684\u672C\u5730\u8BA1\u7B97\u72B6\u6001\u4E3A\u51C6\u3002"]}),(0,g.jsxs)("details",{className:B.details,children:[(0,g.jsx)("summary",{children:"\u97F3\u8272\u4E0E\u97F3\u91CF"}),(0,g.jsxs)("div",{className:B.section,children:[c.provider==="local"&&(P||c.referenceAudioPath)&&(0,g.jsxs)("div",{className:B.section,"data-reference-voice":!0,children:[(0,g.jsx)(fr,{className:B.field,label:"\u53C2\u8003\u97F3\u9891\uFF08WAV\uFF09",kind:"referenceAudio",value:c.referenceAudioPath,disabled:Z||!P,active:i,scope:c.provider+":"+c.localModelId,pickPath:l,sessionId:n,placeholder:"\u8BF7\u70B9\u51FB\u9009\u62E9\u6587\u4EF6",onChange:I=>_({referenceAudioPath:I.trim()||null})}),c.referenceAudioPath&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:Z,onClick:()=>_({referenceAudioPath:null}),children:"\u6E05\u9664\u53C2\u8003\u97F3\u8272"})]}),c.provider!=="local"&&c.referenceAudioPath&&(0,g.jsxs)("div",{className:B.section,children:[(0,g.jsx)("p",{className:B.hint,children:"\u672C\u5730\u53C2\u8003\u97F3\u8272\u5DF2\u4FDD\u7559\u3002"}),(0,g.jsx)(pe.Button,{variant:"outline",disabled:Z,onClick:()=>_({referenceAudioPath:null}),children:"\u6E05\u9664\u53C2\u8003\u97F3\u8272"})]}),(0,g.jsxs)("label",{className:B.inlineField,children:["\u6717\u8BFB\u97F3\u91CF",(0,g.jsx)(Lt,{"aria-label":"\u6717\u8BFB\u97F3\u91CF\u6ED1\u5757",min:"0",max:"1",step:"0.05",value:c.volume,disabled:Z,onChange:I=>_({volume:Number(I.target.value)})}),(0,g.jsx)(pe.Input,{type:"number",min:"0",max:"1",step:"0.05",value:c.volume,disabled:Z,onChange:I=>_({volume:I.target.value})})]})]})]}),(0,g.jsxs)("div",{className:B.actions,children:[(0,g.jsx)(pe.Button,{variant:"primary",className:B.primary,disabled:Z||!r||!A||!(N||O),onClick:()=>d("save-tts",{revision:r.revision,values:Fi(E)}),children:p?"\u5904\u7406\u4E2D\u2026":O?"\u542F\u7528 DeepSeek \u6717\u8BFB":"\u4FDD\u5B58\u6717\u8BFB\u8BBE\u7F6E"}),(0,g.jsx)(pe.Button,{variant:"outline",disabled:Z||!r?.ttsSetup||!A||c.provider==="off",onClick:()=>d("preview-tts",N||O?{revision:r.revision,values:zd(E,r.ttsSetup)}:void 0),children:O?"\u53D1\u9001\u793A\u4F8B\u5E76\u8BD5\u542C":N?"\u8BD5\u542C\u5F53\u524D\u9009\u62E9":"\u8BD5\u542C\u5DF2\u4FDD\u5B58\u914D\u7F6E"}),(0,g.jsx)(pe.Button,{variant:"outline",disabled:!(x?.busy||x?.blocked||e.ttsUncertain||e.ttsCancelling||z?.status==="preparing"||f==="preview-tts"),onClick:()=>{t(n,"cancel-tts")},children:"\u505C\u6B62\u8BD5\u542C"})]}),z&&(0,g.jsxs)("p",{role:"status",className:B.hint,children:[{preparing:"\u8BD5\u542C\u51C6\u5907\u4E2D",cancelling:"\u6B63\u5728\u505C\u6B62\u8BD5\u542C",cancelled:"\u8BD5\u542C\u5DF2\u53D6\u6D88",idle:"\u8BD5\u542C\u5DF2\u505C\u6B62",completed:"\u8BD5\u542C\u5DF2\u7ED3\u675F",failed:z.detail??"\u8BD5\u542C\u5931\u8D25\uFF0C\u6B63\u5728\u6838\u67E5\u72B6\u6001",unconfirmed:"\u65E0\u6CD5\u786E\u8BA4\u8BD5\u542C\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B"}[z.status]??z.status,xd[z.provider]?` \xB7 ${xd[z.provider]}`:""]}),x&&(0,g.jsxs)("p",{role:"status",className:B.hint,children:[x.blocked?"\u8BD5\u542C\u5C1A\u672A\u505C\u6B62\uFF0C\u8BF7\u91CD\u542F\u5BBF\u4E3B\u3002":`\u6717\u8BFB\u72B6\u6001\uFF1A${{idle:"\u7A7A\u95F2",preparing:"\u51C6\u5907\u4E2D",synthesizing:"\u5408\u6210\u4E2D","playback-requested":"\u5DF2\u8BF7\u6C42\u64AD\u653E","text-only":"\u5DF2\u663E\u793A\u6587\u5B57",completed:"\u8BD5\u542C\u5DF2\u7ED3\u675F",cancelled:"\u5DF2\u53D6\u6D88",failed:"\u5931\u8D25"}[x.state]??x.state}`,x.localComputeBackend?` \xB7 \u672C\u5730\u8BA1\u7B97\uFF1A${x.localComputeBackend.toUpperCase()}${x.localComputeVerified?"\uFF08\u5DF2\u5B8C\u6210\u5408\u6210\uFF09":"\uFF08\u5F85\u9A8C\u8BC1\uFF09"}`:"",x.localComputeFallback?" \xB7 \u5DF2\u56DE\u9000\u540C\u6A21\u578B CPU":""]}),x?.localTimings&&(0,g.jsxs)("details",{className:B.details,children:[(0,g.jsx)("summary",{children:"\u5DF2\u5B8C\u6210\u6717\u8BFB\u7247\u6BB5\u8017\u65F6"}),(0,g.jsxs)("p",{className:B.hint,children:["\u51C6\u5907 ",(x.localTimings.preparationMs/1e3).toFixed(2)," \u79D2 \xB7 \u8BBE\u5907\u9009\u62E9 ",(x.localTimings.deviceSelectionMs/1e3).toFixed(2)," \u79D2 \xB7 \u5408\u6210 ",(x.localTimings.synthesisMs/1e3).toFixed(2)," \u79D2 \xB7 \u64AD\u653E ",(x.localTimings.playbackMs/1e3).toFixed(2)," \u79D2"]}),(0,g.jsxs)("p",{className:B.hint,children:[x.localTimings.chunks," \u6BB5 \xB7 ",x.localTimings.modelResident?"\u4E0A\u6B21\u7247\u6BB5\u7ED3\u675F\u65F6\u6A21\u578B\u4ECD\u9A7B\u7559\uFF0C\u5B8C\u6574\u5408\u6210\u540E\u64AD\u653E\u3002\u51C6\u5907\u5305\u542B\u6587\u4EF6\u6821\u9A8C\uFF1B\u5408\u6210\u5305\u542B\u9996\u6B21\u52A0\u8F7D\u548C\u670D\u52A1\u54CD\u5E94\u3002":"\u5F53\u524D\u672C\u5730\u6A21\u578B\u9010\u6BB5\u542F\u52A8\uFF0C\u5B8C\u6574\u5408\u6210\u540E\u64AD\u653E\u3002\u51C6\u5907\u5305\u542B\u6587\u4EF6\u6821\u9A8C\uFF1B\u5408\u6210\u5305\u542B\u52A0\u8F7D\u4E0E\u5931\u8D25\u91CD\u8BD5\u3002","\u8017\u65F6\u4E0D\u662F\u9996\u97F3\u5EF6\u8FDF\u6216 GPU \u52A0\u901F\u6BD4\u3002"]})]})]})}function bo(e,n){if(e.status!=="installed"||!e.installedPath||!n)return!1;if(e.purpose==="tts"||e.recommendedSettings?.tts)return n.ttsSetup?.provider==="local"&&n.ttsSetup.localModelId===e.modelId&&n.ttsSetup.localModelPath===e.installedPath;let t=e.recommendedSettings;return!t||t.asr!==n.modelSetup?.asr?!1:Object.entries(t.models??{}).some(([r,o])=>o===e.installedPath&&n.modelSetup?.models?.[r]===o)}function Td(e,n){return(e?.models??[]).map(t=>{let r=(e.jobs??[]).filter(a=>a.modelId===t.id),o=r.filter(a=>a.status==="installed").sort((a,l)=>String(l.updatedAt??l.createdAt??"").localeCompare(String(a.updatedAt??a.createdAt??""))),i=o.find(a=>bo(a,n));return{model:t,jobs:r,installed:o,current:i,preferred:i??o[0],active:r.find(a=>["queued","running","paused","failed"].includes(a.status))}})}var vo=e=>(e?.title??e?.id??"").split(" \xB7 ")[0],vr=e=>({cpu:"CPU",auto:"\u81EA\u52A8 GPU",cuda:"CUDA / HIP",vulkan:"Vulkan"})[e]??e??"\u672A\u77E5",qi=e=>{let n=new Date(e);return Number.isFinite(n.getTime())?n.toLocaleString():"\u65F6\u95F4\u672A\u77E5"};function $d({state:e,sessionId:n,run:t,purpose:r}){let[o,i]=Rt(t,n),a=e.installerFor===n?e.installer:null,l=e.settingsFor===n?e.settings:null,c=Td(a,l).filter(d=>(!r||d.model.purpose===r)&&d.preferred),u=mt(e,n)&&!i&&!e.settingsDraftActions?.some(d=>["save-models","save-tts"].includes(d));return(0,g.jsxs)("section",{className:B.switcher,"aria-label":"\u5207\u6362\u5DF2\u5B89\u88C5\u6A21\u578B","data-no-settings-draft":!0,children:[a?c.length?c.map(({model:d,preferred:p,current:f})=>(0,g.jsxs)("div",{className:B.switchRow,children:[(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:vo(d)}),(0,g.jsxs)("small",{children:[d.purpose==="tts"?"\u6717\u8BFB":"\u8BC6\u522B"," \xB7 ",vr(p.compute),f?" \xB7 \u5F53\u524D\u914D\u7F6E":""]})]}),(0,g.jsxs)("div",{className:B.actions,children:[d.purpose==="tts"&&!f&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:!u||!p.installedPath,onClick:()=>o("preview-tts",{revision:l.revision,values:zd({...l.ttsSetup,provider:"local",localModelId:d.id,localModelPath:p.installedPath,referenceAudioPath:null},l.ttsSetup)}),children:"\u5148\u8BD5\u542C"}),(0,g.jsx)(pe.Button,{variant:"outline",disabled:!u||!!f,onClick:()=>o("apply-model-install",{id:p.id,revision:l.revision}),children:f?"\u5F53\u524D\u6A21\u578B":"\u9A8C\u8BC1\u5E76\u5207\u6362"})]})]},d.id)):(0,g.jsx)("p",{className:B.hint,children:"\u5C1A\u65E0\u53EF\u5207\u6362\u7684\u5DF2\u5B89\u88C5\u6A21\u578B\uFF0C\u8BF7\u5148\u5728\u6A21\u578B\u4E0B\u8F7D\u4E2D\u5B89\u88C5\u3002"}):(0,g.jsx)("p",{className:B.hint,children:"\u6B63\u5728\u8BFB\u53D6\u5DF2\u5B89\u88C5\u6A21\u578B\u3002"}),!!c.length&&!u&&(0,g.jsx)("p",{className:B.hint,children:"\u5207\u6362\u6A21\u578B\u524D\u9700\u505C\u6B62\u8BED\u97F3\uFF0C\u5DF2\u5B89\u88C5\u6587\u4EF6\u4E0D\u4F1A\u91CD\u65B0\u4E0B\u8F7D\u3002"})]})}function kd({job:e,snapshot:n,settings:t,disabled:r,writable:o,execute:i,history:a=!1}){let l=bo(e,t);return(0,g.jsxs)("article",{className:B.job,"data-model-job":e.id,children:[(0,g.jsxs)("div",{className:B.jobHeading,children:[(0,g.jsx)("strong",{children:vo(n.models.find(c=>c.id===e.modelId))||e.modelId}),(0,g.jsxs)("small",{children:[vr(e.compute)," \xB7 ",qi(e.createdAt)]})]}),(0,g.jsxs)("p",{role:"status",children:[l?"\u5F53\u524D\u914D\u7F6E \xB7 ":"",{queued:"\u7B49\u5F85\u4E2D",running:"\u5904\u7406\u4E2D",paused:"\u5DF2\u6682\u505C",failed:"\u5931\u8D25",cancelled:"\u5DF2\u53D6\u6D88",installed:"\u5DF2\u5B89\u88C5\uFF0C\u5B57\u8282\u6821\u9A8C\u901A\u8FC7","checking-runtime":"\u68C0\u67E5\u8FD0\u884C\u4F9D\u8D56","verifying-local":"\u6821\u9A8C\u672C\u673A\u5DF2\u6709\u6A21\u578B",downloading:"\u4E0B\u8F7D\u4E2D",verifying:"\u6821\u9A8C\u6587\u4EF6",installing:"\u63D0\u4EA4\u5B89\u88C5"}[e.stage]??e.stage]}),!a&&Number.isFinite(e.totalBytes)&&e.totalBytes>0&&Number.isFinite(e.receivedBytes)&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("progress",{max:e.totalBytes,value:Math.min(e.receivedBytes,e.totalBytes),"aria-label":"\u4E0B\u8F7D\u5B57\u8282\u8FDB\u5EA6"}),(0,g.jsxs)("small",{children:["\u4E0B\u8F7D ",vn(e.receivedBytes)," / ",vn(e.totalBytes)]})]}),e.error&&(0,g.jsx)("p",{role:"alert",children:e.error.message}),a&&e.installedPath&&(0,g.jsxs)("details",{className:B.installPath,children:[(0,g.jsx)("summary",{children:"\u5B89\u88C5\u4F4D\u7F6E"}),(0,g.jsx)("p",{children:e.installedPath})]}),(0,g.jsxs)("div",{className:B.actions,children:[["queued","running"].includes(e.status)&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:r,onClick:()=>i("control-model-install",{id:e.id,operation:"pause"}),children:"\u6682\u505C\uFF0C\u4FDD\u7559\u8FDB\u5EA6"}),["paused","failed"].includes(e.status)&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:r,onClick:()=>i("control-model-install",{id:e.id,operation:"resume"}),children:"\u6062\u590D\u540C\u4E00\u6765\u6E90\u4E0B\u8F7D"}),["queued","running","paused","failed"].includes(e.status)&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:r,onClick:()=>i("control-model-install",{id:e.id,operation:"cancel"}),children:"\u53D6\u6D88\u5E76\u6E05\u9664\u6B64\u4EFB\u52A1\u4E34\u65F6\u6587\u4EF6"}),e.status==="installed"&&!l&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:!o,onClick:()=>i("apply-model-install",{id:e.id,revision:t.revision}),children:"\u9A8C\u8BC1\u5E76\u5207\u6362"})]}),e.status==="installed"&&(0,g.jsx)("small",{children:"\u5207\u6362\u524D\u8BF7\u7ED3\u675F\u5BF9\u8BDD\u3002\u4E0B\u6B21\u5F00\u59CB\u5BF9\u8BDD\u65F6\u4F7F\u7528\u65B0\u6A21\u578B\u3002"})]})}function Od({state:e,sessionId:n,run:t}){let[r,o]=(0,he.useState)(""),[i,a]=(0,he.useState)("cpu"),[l,c]=(0,he.useState)(!1),[u,d]=Rt(t,n),p=e.installerFor===n?e.installer:null,f=e.settingsFor===n?e.settings:null,m=Td(p,f).filter(S=>S.model.id!=="sensevoice-int8-2024-07-17"||S.active),y=m.find(S=>S.model.id===r),v=y?.model,b=e.installPlanFor===n&&e.installPlan?.modelId===r&&e.installPlan?.compute===i&&!e.installPlan?.sourceDirectory?e.installPlan:null,x=!!e.busy||e.uncertain||e.installerUncertain||d,z=!d&&mt(e,n)&&!e.settingsDraftActions?.some(S=>["save-models","save-tts"].includes(S)),F=(0,he.useId)(),Z=(p?.jobs??[]).filter(S=>["installed","cancelled"].includes(S.status)).slice().reverse(),N=p?.hardware,$=p?.refresh?.observedAt??p?.compute?.observedAt;return(0,g.jsxs)("section",{className:`${B.section} ${B.modelInstaller}`,"aria-label":"\u6A21\u578B\u5B89\u88C5",children:[(0,g.jsxs)("div",{className:B.hardwareSummary,children:[(0,g.jsxs)("span",{children:["\u5185\u5B58 ",vn(N?.totalMemoryBytes)," \xB7 \u53EF\u7528 ",vn(N?.availableMemoryBytes)," \xB7 \u663E\u5B58 ",vn(N?.gpuMemoryBytes)]}),(0,g.jsxs)("small",{children:[$?"\u66F4\u65B0\u4E8E "+qi($):"\u7B49\u5F85\u68C0\u6D4B"," \xB7 \u6BCF 5 \u5206\u949F"]})]}),(p?.refresh?.error||e.modelComputeError)&&(0,g.jsxs)("p",{className:B.hint,role:"status",children:[p?.refresh?.error??"\u672C\u6B21\u786C\u4EF6\u68C0\u6D4B\u672A\u5B8C\u6210","\uFF1B\u4FDD\u7559\u4E0A\u6B21\u7ED3\u679C\u3002"]}),e.installerError&&(0,g.jsx)("p",{role:"alert",className:B.note,children:e.installerError}),e.installerUncertain&&(0,g.jsx)("p",{role:"status",className:B.note,children:"\u6B63\u5728\u6838\u67E5\u5B89\u88C5\u72B6\u6001\u3002"}),(0,g.jsxs)("div",{className:B.currentModel,children:[(0,g.jsxs)("span",{children:["\u8BC6\u522B ",(0,g.jsx)("strong",{children:"SenseVoice"})," \xB7 \u6717\u8BFB ",(0,g.jsx)("strong",{children:f?.ttsSetup?.provider==="local"?f.ttsSetup.localModelId?.startsWith("qwen3")?"Qwen3-TTS":f.ttsSetup.localModelId?.startsWith("vits-melo")?"MeloTTS":f.ttsSetup.localModelId??"\u672C\u5730\u6A21\u578B":f?.ttsSetup?.provider==="deepseek"?f.ttsSetup.deepseekTextTransmissionAccepted&&br(e)?"DeepSeek":"DeepSeek \u5F85\u542F\u7528":{off:"\u4E0D\u53D1\u58F0"}[f?.ttsSetup?.provider]??"\u672A\u914D\u7F6E"})]}),(0,g.jsx)(pe.Button,{variant:"outline","aria-expanded":l,onClick:()=>c(S=>!S),children:"\u5207\u6362\u5F53\u524D\u6A21\u578B"})]}),l&&(0,g.jsx)($d,{state:e,sessionId:n,run:t}),p?(0,g.jsxs)("fieldset",{className:`${B.choices} ${B.modelChoices}`,disabled:x,children:[(0,g.jsx)("legend",{children:"\u9009\u62E9\u6A21\u578B"}),m.map(({model:S,current:O,preferred:C,active:_})=>(0,g.jsxs)("label",{className:B.choice,"data-selected":r===S.id,children:[(0,g.jsx)("input",{type:"radio",name:F,checked:r===S.id,onChange:()=>{o(S.id),a(S.computeOptions?.includes("auto")?"auto":"cpu")}}),(0,g.jsxs)("span",{children:[(0,g.jsxs)("strong",{children:[vo(S),S.recommendation?.recommended&&(0,g.jsx)("span",{className:B.badge,children:"\u63A8\u8350"})]}),(0,g.jsxs)("small",{children:[S.purpose==="tts"?"\u6717\u8BFB":"\u8BC6\u522B"," \xB7 ",vn(S.totalBytes)]}),(0,g.jsx)("small",{children:O?"\u5F53\u524D\u914D\u7F6E":_?{queued:"\u7B49\u5F85\u4E0B\u8F7D",running:"\u4E0B\u8F7D\u5904\u7406\u4E2D",paused:"\u4E0B\u8F7D\u5DF2\u6682\u505C",failed:"\u4E0B\u8F7D\u5931\u8D25"}[_.status]:C?"\u5DF2\u5B89\u88C5\uFF0C\u53EF\u5207\u6362":S.available?"\u53EF\u51C6\u5907\u5B89\u88C5":"\u6682\u4E0D\u53EF\u5B89\u88C5"}),!S.available&&(0,g.jsx)("small",{children:S.reason??S.recommendation?.reason})]})]},S.id))]}):(0,g.jsx)("p",{className:B.note,children:"\u6B63\u5728\u8BFB\u53D6\u6A21\u578B\u5217\u8868\u3002"}),v&&(0,g.jsxs)("div",{className:B.selectedModel,children:[(0,g.jsxs)("label",{className:B.inlineField,children:["\u63A8\u7406\u8BBE\u5907",(0,g.jsx)("select",{value:i,disabled:x,onChange:S=>a(S.target.value),children:(v.computeOptions??["cpu"]).map(S=>(0,g.jsxs)("option",{value:S,children:[vr(S),S==="cpu"?"":" \xB7 CPU \u515C\u5E95"]},S))})]}),(0,g.jsxs)("div",{className:B.actions,children:[y.preferred&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:!z||!!y.current,onClick:()=>u("apply-model-install",{id:y.preferred.id,revision:f.revision}),children:y.current?"\u5F53\u524D\u6A21\u578B":"\u9A8C\u8BC1\u5E76\u5207\u6362"}),(0,g.jsx)(pe.Button,{variant:"outline",disabled:x||!v.available,onClick:()=>u("plan-model-install",{modelId:r,compute:i}),children:y.preferred?"\u67E5\u770B\u5176\u4ED6\u5B89\u88C5\u65B9\u6848":"\u67E5\u770B\u5B89\u88C5\u8BA1\u5212"})]}),(0,g.jsxs)("details",{className:B.details,children:[(0,g.jsx)("summary",{children:"\u63A8\u8350\u4F9D\u636E\u4E0E\u8BBE\u5907\u8BF4\u660E"}),(0,g.jsx)("p",{className:B.hint,children:v.recommendation?.reason??"\u63A8\u8350\u4F9D\u636E\u672A\u77E5\uFF0C\u53EF\u624B\u52A8\u9009\u62E9\u3002"}),(0,g.jsx)("p",{className:B.hint,children:v.purpose==="tts"?i==="cpu"?"\u4EC5\u51C6\u5907 CPU \u8FD0\u884C\u65F6\u3002":"\u51C6\u5907\u56FA\u5B9A Vulkan \u4E0E CPU \u7EC4\u4EF6\uFF0C\u5B9E\u9645\u53EF\u7528\u6027\u4ECD\u9700\u672C\u673A\u5408\u6210\u9A8C\u8BC1\u3002":"\u6B64\u6A21\u578B\u4F7F\u7528 CPU\u3002"})]})]}),b&&(0,g.jsxs)(pe.MenuSurface,{className:B.plan,"aria-label":"\u6A21\u578B\u5B89\u88C5\u8BA1\u5212",children:[(0,g.jsx)("h4",{children:"\u6A21\u578B\u5B89\u88C5"}),(0,g.jsxs)("dl",{children:[(0,g.jsx)("dt",{children:"\u6A21\u578B"}),(0,g.jsx)("dd",{children:v?.title??b.modelId}),(0,g.jsx)("dt",{children:"\u6765\u6E90"}),(0,g.jsx)("dd",{children:b.source}),(0,g.jsx)("dt",{children:"\u4E0B\u8F7D\u5927\u5C0F"}),(0,g.jsx)("dd",{children:vn(b.totalBytes)}),(0,g.jsx)("dt",{children:"\u4FDD\u5B58\u4F4D\u7F6E"}),(0,g.jsx)("dd",{children:b.destination}),(0,g.jsx)("dt",{children:"\u63A8\u7406\u8BBE\u5907"}),(0,g.jsx)("dd",{children:b.compute})]}),(0,g.jsx)("p",{children:b.licenseNote??"\u8BF7\u9605\u8BFB\u4E0B\u5217\u6A21\u578B\u8BB8\u53EF\u3002"}),b.licenseUrls?.map(S=>(0,g.jsx)("a",{href:S,target:"_blank",rel:"noreferrer",children:S},S)),(0,g.jsx)("p",{className:B.hint,children:b.notice}),(0,g.jsxs)("details",{className:B.details,children:[(0,g.jsx)("summary",{children:"\u6587\u4EF6\u548C\u6821\u9A8C\u8BE6\u60C5"}),(0,g.jsx)("ul",{children:b.files?.map(S=>(0,g.jsxs)("li",{children:[S.name," \xB7 ",vn(S.bytes),(0,g.jsxs)("small",{children:["SHA-256: ",S.sha256]}),(0,g.jsx)("small",{children:S.url})]},S.name))})]}),(0,g.jsx)(pe.Button,{variant:"primary",className:B.primary,disabled:x||!v?.available||!b.planHash,onClick:()=>u("start-model-install",{modelId:b.modelId,compute:b.compute,planHash:b.planHash,accepted:!0}),children:"\u5F00\u59CB\u4E0B\u8F7D"})]}),(0,g.jsx)("div",{className:B.jobs,children:(p?.jobs??[]).filter(S=>!["installed","cancelled"].includes(S.status)).map(S=>(0,g.jsx)(kd,{job:S,snapshot:p,settings:f,disabled:x,writable:z,execute:u},S.id))}),!!Z.length&&(0,g.jsxs)("details",{className:B.installHistory,children:[(0,g.jsxs)("summary",{children:["\u5B89\u88C5\u8BB0\u5F55\uFF08",Z.length,"\uFF09",(0,g.jsx)("small",{children:"\u65F6\u95F4 \xB7 \u8BBE\u5907 \xB7 \u4F4D\u7F6E"})]}),(0,g.jsx)("div",{className:B.jobs,children:Z.map(S=>(0,g.jsx)(kd,{job:S,snapshot:p,settings:f,disabled:x,writable:z,execute:u,history:!0},S.id))})]}),(0,g.jsx)("p",{className:B.hint,children:"\u6A21\u578B\u4E0B\u8F7D\u53EF\u5728\u540E\u53F0\u7EE7\u7EED\u3002\u68C0\u6D4B\u9759\u9ED8\u8FDB\u884C\uFF0C\u8FDB\u5165\u672C\u9875\u7ACB\u5373\u5237\u65B0\u3002"})]})}function go({state:e,sessionId:n,run:t,active:r=!0,pickPath:o,initialModelId:i=null,initialReuse:a=!1,reuseOnly:l=!1,onboarding:c=!1}){let[u,d,,p]=Rt(t,n),[f,m]=(0,he.useState)(i),[y,v]=(0,he.useState)(null),[b,x]=(0,he.useState)(a),[z,F]=(0,he.useState)(""),[Z,N]=(0,he.useState)("q8_0"),$=e.installerFor===n?e.installer:null,S=$?.models?.filter(j=>j.purpose==="tts"||["qwen3-tts-base-1.7b-gguf","vits-melo-tts-zh_en-int8"].includes(j.id))??[],O=S.find(j=>j.recommendation?.recommended&&j.available),C=f??O?.id??S.find(j=>j.available)?.id??S[0]?.id,_=S.find(j=>j.id===C),P=y??(_?.computeOptions?.includes("auto")?"auto":"cpu"),D=b&&C==="qwen3-tts-base-1.7b-gguf",A=D?{sourceDirectory:z,modelVariant:Z}:{},E=e.installPlanFor===n&&e.installPlan?.modelId===C&&e.installPlan?.compute===P&&(D?e.installPlan?.reused===!0&&(e.installPlanRequest?.sourceDirectory??e.installPlan?.sourceDirectory)===z&&e.installPlan?.modelVariant===Z:!e.installPlan?.sourceDirectory)?e.installPlan:null,I=[...$?.jobs??[]].reverse().find(j=>j.modelId===C&&j.status!=="cancelled"),H=$?.ttsInstallIntent,L=H&&I&&H.modelId===C&&H.jobId===I.id?H:null,J=["waiting","verifying"].includes(H?.status),K=e.settingsFor===n&&e.settings?.ttsSetup?.provider==="local"&&e.settings.ttsSetup.localModelId===C&&I?.status==="installed"&&!!I.installedPath&&e.settings.ttsSetup.localModelPath===I.installedPath,ce=(0,he.useRef)(void 0),de=(0,he.useRef)(null);(0,he.useEffect)(()=>{!r||$||e.busy||d||p.isLocked()||ce.current===n||(ce.current=n,u("model-installer"))},[r,n,!!$,e.busy,d,p.settled]),(0,he.useEffect)(()=>{let j=n+":"+C+":"+P;D||!r||!_?.available||e.busy||d||p.isLocked()||E||de.current===j||(de.current=j,u("plan-model-install",{modelId:C,compute:P}))},[r,n,C,P,_?.available,e.busy,d,!!E,D,p.settled]);let me=d||e.busy||e.installerUncertain;return(0,g.jsxs)("section",{className:B.section,"aria-label":"\u4E0B\u8F7D\u672C\u5730\u8BED\u97F3\u6A21\u578B","data-no-settings-draft":!0,children:[$?(0,g.jsxs)(g.Fragment,{children:[!l&&(0,g.jsxs)("label",{className:B.inlineField,children:["\u8BED\u97F3\u6A21\u578B",(0,g.jsx)("select",{"aria-label":"\u8BED\u97F3\u6A21\u578B",value:C??"",disabled:me||L?.status==="verifying",onChange:j=>{m(j.target.value),v(null)},children:S.map(j=>(0,g.jsxs)("option",{value:j.id,children:[j.title??j.id,j.recommendation?.recommended?" \xB7 \u63A8\u8350":"",j.available?"":" \xB7 \u6682\u4E0D\u53EF\u7528"]},j.id))})]}),!c&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("p",{className:B.hint,children:_?.recommendation?.reason}),(0,g.jsxs)("label",{className:B.inlineField,children:["\u672C\u5730\u8BA1\u7B97",(0,g.jsx)("select",{"aria-label":"\u672C\u5730\u8BA1\u7B97",value:P,disabled:me||J,onChange:j=>v(j.target.value),children:(_?.computeOptions??["cpu"]).map(j=>(0,g.jsx)("option",{value:j,children:{cpu:"CPU",auto:"\u81EA\u52A8 GPU \xB7 CPU \u515C\u5E95",vulkan:"Vulkan \xB7 CPU \u515C\u5E95"}[j]},j))})]})]}),!_?.available&&(0,g.jsx)("p",{role:"status",className:B.note,children:_?.reason??"\u6B64\u8BBE\u5907\u6682\u6CA1\u6709\u517C\u5BB9\u7684\u5B89\u88C5\u5305\u3002\u53EF\u9009\u62E9\u5176\u4ED6\u652F\u6301\u7684\u6A21\u578B\uFF0C\u6216\u5148\u4F7F\u7528\u6587\u5B57\u3002"}),E&&(0,g.jsxs)("div",{className:B.plan,children:[(0,g.jsxs)("strong",{children:["\u4E0B\u8F7D ",vn(E.totalBytes)," \xB7 ",E.compute.toUpperCase()]}),E.reused&&(0,g.jsxs)("p",{children:["\u590D\u7528\u6A21\u578B ",vn(E.reusedBytes)," \xB7 ",E.modelVariant]}),(0,g.jsxs)("details",{className:B.details,children:[(0,g.jsx)("summary",{children:"\u6765\u6E90\u3001\u8BB8\u53EF\u4E0E\u4FDD\u5B58\u4F4D\u7F6E"}),(0,g.jsx)("p",{children:E.source}),E.runtime&&(0,g.jsx)("p",{children:E.runtime.source}),(0,g.jsx)("p",{children:E.notice}),(0,g.jsx)("p",{children:E.verification}),(0,g.jsx)("p",{children:E.licenseNote}),E.licenseUrls?.map(j=>(0,g.jsx)("a",{href:j,target:"_blank",rel:"noreferrer",children:j},j)),(0,g.jsx)("p",{children:E.destination})]})]}),(0,g.jsxs)("div",{className:B.actions,children:[(!I||(D||I.compute!==P)&&I.status==="installed"&&!J)&&(0,g.jsx)(pe.Button,{variant:"primary",className:B.primary,disabled:me||!mt(e,n)||!_?.available||!E,onClick:()=>u("start-model-install",{modelId:C,compute:P,planHash:E.planHash,accepted:!0,useWhenReady:!0,...E.reused?{sourceDirectory:E.sourceDirectory,modelVariant:E.modelVariant}:{}}),children:D?"\u9A8C\u8BC1\u5E76\u4F7F\u7528":"\u4E0B\u8F7D\u5E76\u4F7F\u7528"}),C==="qwen3-tts-base-1.7b-gguf"&&!l&&(0,g.jsx)(pe.Button,{variant:"outline","aria-expanded":D,disabled:me||J,onClick:()=>x(j=>!j),children:"\u4F7F\u7528\u672C\u673A\u5DF2\u6709\u6587\u4EF6"})]}),D&&(0,g.jsxs)("div",{className:B.section,children:[(0,g.jsx)(fr,{className:B.field,label:"\u63D2\u4EF6\u6240\u5728\u673A\u5668\u7684\u6A21\u578B\u76EE\u5F55",kind:"sourceDirectory",value:z,disabled:me,active:r,scope:C+":"+Z,pickPath:o,sessionId:n,onChange:F}),(0,g.jsxs)("label",{className:B.inlineField,children:["\u5DF2\u6709\u6A21\u578B\u91CF\u5316\u7248\u672C",(0,g.jsxs)("select",{"aria-label":"\u5DF2\u6709\u6A21\u578B\u91CF\u5316\u7248\u672C",value:Z,disabled:me,onChange:j=>N(j.target.value),children:[(0,g.jsx)("option",{value:"q8_0",children:"Q8_0"}),(0,g.jsx)("option",{value:"q4_k_m",children:"Q4_K_M"})]})]}),(0,g.jsx)(pe.Button,{variant:"outline",disabled:me||!z.trim()||!_?.available,onClick:()=>u("plan-model-install",{modelId:C,compute:P,...A}),children:"\u68C0\u67E5\u590D\u7528\u8BA1\u5212"})]}),D&&I&&["failed","paused"].includes(I.status)&&(0,g.jsx)("p",{className:B.note,children:"\u5DF2\u6709\u672A\u5B8C\u6210\u7684\u5B89\u88C5\u4EFB\u52A1\u3002\u53EF\u7EE7\u7EED\u91CD\u8BD5\uFF1B\u5982\u9700\u66F4\u6362\u76EE\u5F55\u6216\u91CF\u5316\u7248\u672C\uFF0C\u8BF7\u5148\u53D6\u6D88\u8BE5\u4EFB\u52A1\uFF0C\u518D\u68C0\u67E5\u65B0\u7684\u590D\u7528\u8BA1\u5212\u3002"}),!D&&_?.available&&!E&&!I&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:me,onClick:()=>u("plan-model-install",{modelId:C,compute:P}),children:"\u91CD\u65B0\u8BFB\u53D6\u5B89\u88C5\u8BA1\u5212"}),I&&(0,g.jsxs)("div",{className:B.job,children:[(0,g.jsx)("p",{role:"status",children:L?.status==="verifying"?"\u6B63\u5728\u9A8C\u8BC1\u5408\u6210\uFF0C\u9996\u6B21\u53EF\u80FD\u9700\u8981\u51E0\u5206\u949F":L?.status==="applied"&&K?"\u5408\u6210\u9A8C\u8BC1\u901A\u8FC7\uFF0C\u5DF2\u8BBE\u4E3A\u6717\u8BFB\u6765\u6E90":L?.status==="blocked"?"\u9700\u8981\u5904\u7406\u540E\u518D\u7EE7\u7EED":{queued:"\u7B49\u5F85\u4E0B\u8F7D",running:I.stage==="verifying-local"?"\u6821\u9A8C\u672C\u673A\u5DF2\u6709\u6A21\u578B":"\u4E0B\u8F7D\u5904\u7406\u4E2D",paused:"\u5DF2\u6682\u505C",failed:"\u4E0B\u8F7D\u5931\u8D25",installed:"\u6587\u4EF6\u5DF2\u6821\u9A8C\uFF0C\u5C1A\u672A\u786E\u8BA4\u5408\u6210"}[I.status]??I.status}),I.totalBytes>0&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("progress",{"aria-label":"\u8BED\u97F3\u6A21\u578B\u4E0B\u8F7D\u8FDB\u5EA6",max:I.totalBytes,value:Math.min(I.receivedBytes,I.totalBytes)}),(0,g.jsxs)("small",{children:[vn(I.receivedBytes)," / ",vn(I.totalBytes)]})]}),I.error&&(0,g.jsx)("p",{role:"alert",children:I.error.message}),L?.reason&&(0,g.jsx)("p",{className:B.note,children:Oh(L.reason)}),(0,g.jsxs)("div",{className:B.actions,children:[L?.status==="verifying"&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:me,onClick:()=>u("control-model-install",{id:I.id,operation:"pause"}),children:"\u505C\u6B62\u9A8C\u8BC1"}),["queued","running"].includes(I.status)&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:me,onClick:()=>u("control-model-install",{id:I.id,operation:"pause"}),children:"\u6682\u505C"}),(["paused","failed"].includes(I.status)||L?.status==="blocked"||L?.status==="paused")&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:me,onClick:()=>u("control-model-install",{id:I.id,operation:"resume"}),children:"\u7EE7\u7EED\u4E0B\u8F7D\u5E76\u4F7F\u7528"}),["queued","running","paused","failed"].includes(I.status)&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:me,onClick:()=>u("control-model-install",{id:I.id,operation:"cancel"}),children:"\u53D6\u6D88\u4E0B\u8F7D"}),I.status==="installed"&&!K&&(!L||["applied","cancelled"].includes(L.status))&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:me||J||!mt(e,n),onClick:()=>u("apply-model-install",{id:I.id,revision:e.settings.revision}),children:"\u9A8C\u8BC1\u5E76\u4F7F\u7528"})]})]}),K&&(0,g.jsx)("p",{className:B.hint,children:"\u672C\u5730\u6A21\u578B\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u8BD5\u542C\u3002"})]}):(0,g.jsx)(g.Fragment,{children:(0,g.jsx)("p",{className:B.hint,children:"\u6B63\u5728\u8BFB\u53D6\u53EF\u5B89\u88C5\u6A21\u578B\u2026"})}),e.installerError&&(0,g.jsx)("p",{role:"alert",className:B.note,children:e.installerError}),e.installerUncertain&&(0,g.jsx)("p",{role:"status",children:"\u6B63\u5728\u6838\u67E5\u4E0B\u8F7D\u72B6\u6001\u3002"})]})}function Ud({state:e,sessionId:n,run:t,pickPath:r,active:o}){let i=e.settingsFor===n?e.settings:null,a=e.installerFor===n?e.installer:null,l=i?.ttsSetup?.localModelPath,[c,u]=Rt(t,n),[d,p]=(0,he.useState)(""),[f,m]=(0,he.useState)(!1),y=(a?.jobs??[]).filter(b=>b.status==="installed"&&(b.purpose==="tts"||b.recommendedSettings?.tts)),v=y.find(b=>b.id===d);return(0,g.jsxs)("section",{className:B.section,"aria-label":"\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84","data-no-settings-draft":!0,children:[(0,g.jsx)("h3",{children:"\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84"}),(0,g.jsx)("p",{className:B.hint,children:l||"\u5C1A\u672A\u914D\u7F6E\u672C\u5730\u6717\u8BFB\u6A21\u578B\u8DEF\u5F84\u3002"}),!!y.length&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("label",{className:B.inlineField,children:["\u5DF2\u5B89\u88C5\u76EE\u5F55",(0,g.jsxs)("select",{value:d,onChange:b=>p(b.target.value),children:[(0,g.jsx)("option",{value:"",children:"\u9009\u62E9\u5DF2\u6821\u9A8C\u7684\u5B89\u88C5\u76EE\u5F55"}),y.map(b=>(0,g.jsxs)("option",{value:b.id,children:[vo(a.models.find(x=>x.id===b.modelId))," \xB7 ",vr(b.compute)," \xB7 ",qi(b.createdAt)]},b.id))]})]}),v&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("p",{className:B.hint,children:v.installedPath}),(0,g.jsx)(pe.Button,{variant:"outline",disabled:u||!mt(e,n)||bo(v,i),onClick:()=>c("apply-model-install",{id:v.id,revision:i.revision}),children:"\u9A8C\u8BC1\u5E76\u4F7F\u7528\u6240\u9009\u8DEF\u5F84"})]})]}),(0,g.jsxs)("details",{className:B.details,onToggle:b=>m(b.currentTarget.open),children:[(0,g.jsx)("summary",{children:"\u590D\u7528\u672C\u673A Qwen \u6A21\u578B\u6587\u4EF6"}),(0,g.jsx)("p",{className:B.hint,children:"\u9009\u62E9\u5DF2\u6709\u6A21\u578B\u76EE\u5F55\u540E\u6821\u9A8C\u6587\u4EF6\uFF1B\u6821\u9A8C\u901A\u8FC7\u540E\u5B89\u88C5\u8FD0\u884C\u7EC4\u4EF6\u3002"}),f&&(0,g.jsx)(go,{state:e,sessionId:n,run:t,active:o,pickPath:r,initialModelId:"qwen3-tts-base-1.7b-gguf",initialReuse:!0,reuseOnly:!0})]})]})}function Rd({state:e,sessionId:n,run:t,onDismiss:r,onMinimize:o,onBackToAuthorization:i,asrStatus:a,pickPath:l}){let[c,u]=Rt(t,n),[d,p]=(0,he.useState)(0),f=(0,he.useRef)(null),m=(0,he.useRef)(0),y=(0,he.useRef)(null);(0,he.useLayoutEffect)(()=>()=>{m.current++},[n]);let v=j=>(m.current++,j?.());(0,he.useLayoutEffect)(()=>{let j=f.current?.closest("[data-whale-content]");j&&(j.scrollTop=0);let T=f.current?.querySelector("[data-wizard-body]");T&&(T.scrollTop=0)},[d]);let b=e.settingsFor===n?e.settings:null,[x,z]=(0,he.useState)(null),[F,Z]=(0,he.useState)(null),N=x??b?.listenMode??"ptt",$=b?.ttsSetup?.provider,S=F??$??ho.provider,O=e.ttsCapabilitiesFor===n?e.ttsCapabilities:null,C=typeof O?.deepseekKeyAvailable=="boolean",_=O?.deepseekKeyAvailable===!0,P=`${n??"owner"}:${b?.revision??"unread"}`,[D,A]=(0,he.useState)(null),E=D??b?.ttsSetup?.deepseekVoice??"stella",I=!C&&!u&&y.current===P&&!!e.error,H=()=>{u||e.busy||(y.current=P,c("inspect-tts"))};(0,he.useEffect)(()=>{d!==1||!b||S!=="deepseek"||C||u||e.busy||y.current===P||H()},[d,b,S,C,P,u,e.busy]);let L=S==="deepseek",J=L&&(e.authorizationUncertain||b?.ttsSetup?.deepseekTextTransmissionAccepted===!0&&!e.authorization),K=L&&!J&&!(b?.ttsSetup?.deepseekTextTransmissionAccepted===!0&&br(e)),ce=u||!mt(e,n),de=b?.ttsSetup?.provider==="local"&&!!b.ttsSetup.localModelId,me=async()=>{let j=m.current,T=()=>m.current===j;if(d===0)await c("listen-mode",{mode:N})===!0&&T()&&p(1);else if(d===1){if(L&&(!_||J))return;let Y=L&&E!==(b.ttsSetup?.deepseekVoice??"stella");if(S===$&&!K&&!Y){p(2);return}let ue=Fi({...ho,...b.ttsSetup,provider:S});L&&(ue.deepseekTextTransmissionAccepted=!0,ue.deepseekVoice=E),await c("save-tts",{revision:b.revision,values:ue})===!0&&T()&&p(2)}else await c("complete-setup",{revision:b.revision})===!0&&T()&&r?.()};return(0,g.jsxs)(pe.MenuSurface,{ref:f,className:B.wizard,role:"region","aria-label":"\u9C7C\u5E94\u9996\u6B21\u914D\u7F6E","data-whale-intrinsic":!0,children:[(0,g.jsxs)("header",{className:B.header,children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("h2",{children:"\u5F00\u59CB\u4F7F\u7528\u9C7C\u5E94"}),(0,g.jsxs)("p",{className:B.hint,children:["\u7B2C ",d+1," / 3 \u6B65 \xB7 \u5176\u4F59\u8BBE\u7F6E\u968F\u65F6\u518D\u8C03"]})]}),(0,g.jsx)(pe.Button,{onClick:o,children:"\u7A0D\u540E"})]}),(0,g.jsx)("div",{className:B.wizardBody,"data-wizard-body":!0,"data-no-drag":!0,children:(0,g.jsxs)("div",{className:B.wizardBodyContent,"data-whale-natural-content":!0,children:[(0,g.jsx)(Nd,{state:e,sessionId:n,run:t}),d===0&&(0,g.jsxs)("section",{className:B.section,children:[(0,g.jsx)("h3",{children:"\u600E\u4E48\u8BF4\u8BDD\uFF1F"}),(0,g.jsx)("fieldset",{className:B.choices,disabled:ce,children:[["ptt","\u6309\u952E\u8BF4\u8BDD","\u6309\u4F4F\u5FEB\u6377\u952E\u65F6\u6536\u97F3"],["always","\u81EA\u7531\u9EA6","\u5F00\u59CB\u5BF9\u8BDD\u540E\u6301\u7EED\u542C\u53D6\u8BED\u97F3"],["wake","\u5524\u9192\u8BCD","\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\uFF0C\u518D\u8BF4\u6307\u4EE4"]].map(([j,T,Y])=>(0,g.jsxs)("label",{className:B.choice,"data-selected":N===j,children:[(0,g.jsx)("input",{type:"radio",name:"setup-listen","data-whale-operation":`listen-mode-${j}`,checked:N===j,onChange:()=>z(j)}),(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:T}),(0,g.jsx)("small",{children:Y})]})]},j))})]}),d===1&&(0,g.jsxs)("section",{className:B.section,children:[(0,g.jsx)("h3",{children:"\u600E\u4E48\u542C\u56DE\u7B54\uFF1F"}),(0,g.jsx)("fieldset",{className:B.choices,disabled:ce,children:_d.map(([j,T,Y])=>(0,g.jsxs)("label",{className:B.choice,"data-selected":S===j,children:[(0,g.jsx)("input",{type:"radio",name:"setup-provider",checked:S===j,onChange:()=>Z(j)}),(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:T}),(0,g.jsx)("small",{children:Y})]})]},j))}),L&&(0,g.jsxs)("div",{className:B.note,"data-whale-deepseek-setup":!0,children:[(0,g.jsx)("p",{children:Sd}),J&&(0,g.jsx)("p",{role:"status",children:"\u6B63\u5728\u8BFB\u53D6 DeepSeek \u6717\u8BFB\u6388\u6743\u2026"}),!C&&!I&&(0,g.jsx)("p",{role:"status",children:"\u6B63\u5728\u68C0\u67E5 DSH \u4E2D\u4FDD\u5B58\u7684 DeepSeek API Key\u2026"}),C&&!_&&(0,g.jsx)("p",{role:"status",children:Ad}),I&&(0,g.jsx)("p",{role:"status",children:"\u6682\u65F6\u65E0\u6CD5\u68C0\u67E5 DeepSeek API Key\u3002"}),(I||C&&!_)&&(0,g.jsx)(pe.Button,{variant:"outline",disabled:ce,onClick:H,children:"\u91CD\u65B0\u68C0\u67E5 DeepSeek API Key"}),(0,g.jsx)(Id,{value:E,disabled:ce,onChange:A})]}),S==="local"&&(0,g.jsx)(go,{pickPath:l,state:e,sessionId:n,run:t,initialModelId:de?b.ttsSetup.localModelId:null,onboarding:!0})]}),d===2&&(0,g.jsxs)("section",{className:B.section,children:[(0,g.jsx)("h3",{children:"\u51C6\u5907\u8BED\u97F3\u8BC6\u522B"}),(0,g.jsx)("p",{children:"\u8BF4\u8BDD\u65B9\u5F0F\u548C\u6717\u8BFB\u914D\u7F6E\u5DF2\u4FDD\u5B58\u3002"}),a]}),(e.error||e.setupError)&&(0,g.jsx)("p",{role:"alert",className:B.note,children:"\u6682\u65F6\u672A\u80FD\u5B8C\u6210\uFF0C\u6B63\u5728\u6838\u67E5\u8BBE\u7F6E\u3002"})]})}),(0,g.jsxs)("footer",{className:B.actions,children:[(0,g.jsx)(pe.Button,{variant:"outline",disabled:u,onClick:()=>d>0?p(d-1):v(i),children:"\u4E0A\u4E00\u6B65"}),(0,g.jsx)(pe.Button,{variant:"primary",className:B.primary,disabled:ce||!b||d===1&&(S==="local"&&!de||L&&(!_||J)),onClick:()=>{me()},children:u?"\u4FDD\u5B58\u4E2D\u2026":d===2?"\u5B8C\u6210":d===1&&K?"\u542F\u7528 DeepSeek \u8BED\u97F3\u5408\u6210\u5E76\u7EE7\u7EED":"\u4E0B\u4E00\u6B65"})]})]})}var s=require("react/jsx-runtime"),yo=e=>e.setupOpen||e.setupStatus?.completed!==!0,Rh={ARCHIVED:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u5DF2\u5F52\u6863\u3002\u6062\u590D\u539F\u4F1A\u8BDD\u6216\u66F4\u6362\u7ED1\u5B9A\u540E\u518D\u5F00\u59CB\u8BED\u97F3\u3002",BUSY:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F\u3002\u7B49\u8FD9\u8F6E\u7ED3\u675F\u540E\u518D\u5F00\u59CB\u8BED\u97F3\u3002",UNAVAILABLE:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528\u3002\u53EF\u66F4\u6362\u7ED1\u5B9A\u6216\u89E3\u9664\u7ED1\u5B9A\u3002"},Bd=e=>e.authorizationOpen||e.authorizationLoading&&!e.authorization;function Fd(e){let[n,t]=(0,R.useState)(!1),r=(0,R.useRef)(null),o=(0,R.useRef)(null),i=(0,R.useRef)(null),a=(0,R.useRef)(null),l=e.useWhalePreferences(x=>x),c=e.useWhaleUi(x=>x),u=Bd(c),d=u||yo(c)?"setup":c.panelView??"home",p=n&&d!=="settings",f=(0,R.useCallback)(x=>{r.current=x,e.geometry.ref(x),e.sizing.ref(x)},[e.geometry,e.sizing]),m=(0,R.useCallback)(x=>{o.current=x,e.sizing.contentRef(x)},[e.sizing]);(0,R.useEffect)(()=>{e.setPanelVisible?.(!p)},[p]),(0,R.useLayoutEffect)(()=>{o.current&&(o.current.scrollTop=0)},[d]),(0,R.useLayoutEffect)(()=>e.sizing.update(),[d,p,u,c.sourcePending]),(0,R.useEffect)(()=>{let x=r.current,z=x?.ownerDocument;a.current&&x&&z&&(z.activeElement===z.body||x.contains(z.activeElement))&&(d==="home"?x.querySelector("[data-whale-settings-trigger]")?.focus({preventScroll:!0}):d!==a.current&&x.focus({preventScroll:!0})),a.current=d},[d]);let y=x=>{let z=vd(x);z&&e.recordUserOperation?.(z)},v=()=>{t(!0),requestAnimationFrame(()=>r.current?.querySelector("[data-whale-reopen]")?.focus())},b=()=>{e.refresh?.(),t(!1),requestAnimationFrame(()=>r.current?.focus())};return(0,Zd.createPortal)((0,s.jsx)("section",{ref:f,className:h.floating,"data-whale-panel":!0,"data-view":d,"data-collapsed":p||void 0,"data-source-pending":c.sourcePending||void 0,"data-motion":l.motion,tabIndex:0,"aria-label":e.t("drag"),title:e.t("dragHint"),onPointerDownCapture:()=>e.geometry.activate?.(),onFocusCapture:()=>e.geometry.activate?.(),onPointerDown:x=>{if(x.button!==0||x.pointerType&&x.pointerType!=="mouse"||!td(x.target,x.currentTarget)){i.current=null;return}let z=x.target,F=z.getBoundingClientRect?.();F&&z.scrollHeight>z.clientHeight&&z.offsetWidth>z.clientWidth&&x.clientX>=F.left+z.clientLeft+z.clientWidth||(i.current={id:x.pointerId,x:x.clientX,y:x.clientY,moved:!1},x.target.closest?.("button")||x.currentTarget.focus({preventScroll:!0}),e.geometry.pointerDown(x,x.target.closest?.("[data-drag-surface]")??x.currentTarget))},onPointerMove:x=>{let z=i.current;!z||x.pointerId!==z.id||(Math.hypot(x.clientX-z.x,x.clientY-z.y)>=4&&(z.moved=!0),e.geometry.pointerMove(x))},onPointerUp:x=>{x.nativeEvent?.isTrusted&&i.current?.id===x.pointerId&&i.current.moved&&e.recordUserOperation?.("panel-move"),e.geometry.pointerEnd(x)},onPointerCancel:x=>{e.geometry.pointerEnd(x),i.current=null},onLostPointerCapture:e.geometry.pointerEnd,onClickCapture:x=>{i.current?.moved&&x.detail!==0?(x.preventDefault(),x.stopPropagation()):y(x),i.current=null},onChangeCapture:y,onSubmitCapture:y,onKeyDownCapture:y,onKeyDown:x=>{x.key==="Escape"&&(x.stopPropagation(),d==="setup"&&!p?v():d==="settings"?e.showHome():p||v())},children:(0,s.jsx)("div",{ref:m,className:h.panelViewport,"data-whale-content":!0,children:e.renderSlot("whale-ear.panel.controls",{collapsed:p,collapse:v,expand:b})})}),document.body)}var Dd=()=>()=>{};function qd(e){let{controlContext:n}=e,t=(0,R.useSyncExternalStore)(n?.subscribe??Dd,()=>n?n.sourceFor(n.selectedSession()):e.sessionId??null),r=(0,R.useSyncExternalStore)(n?.subscribe??Dd,()=>{let f=n?.currentConversation();return f===t?f:null});e={...e,sessionId:t,currentConversationId:r};let o=e.useWhaleUi(f=>f),[i,a]=(0,R.useState)(!1);(0,R.useLayoutEffect)(()=>{e.setSession?.(t)},[t]);let l=Bd(o),c=o.updates?.release?.version,u=!e.collapsed&&!l&&!yo(o)&&o.panelView==="home"&&o.checkedFor===e.sessionId&&o.status?.enabled===!1&&o.status.ownerSessionId===null&&!o.status.voiceControlBusy&&o.status.voiceSession?.fullyStopped!==!1&&!o.busy&&!o.uncertain&&!o.updatesUnavailable&&o.updates?.status==="available"&&c&&c!==o.dismissedUpdateVersion;if((0,R.useEffect)(()=>{u&&a(!0)},[u]),l||yo(o)){let f=yo(o);return(0,s.jsxs)(s.Fragment,{children:[e.collapsed&&(0,s.jsx)(Ld,{t:e.t,expand:e.expand}),l?(0,s.jsx)("div",{hidden:e.collapsed,children:(0,s.jsx)(Dh,{state:o,save:e.saveAuthorization,close:f?e.collapse:e.closeAuthorization,continueSetup:f?()=>e.closeAuthorization({resumeSetup:!0}):null})}):(0,s.jsx)("div",{role:"dialog","aria-modal":"false","aria-label":"\u9C7C\u5E94\u9996\u6B21\u914D\u7F6E","data-whale-setup":!0,hidden:e.collapsed,children:(0,s.jsx)(Rd,{pickPath:e.pickPath,state:o,sessionId:e.sessionId,run:e.run,onDismiss:e.dismissSetup,onMinimize:e.collapse,onBackToAuthorization:e.openAuthorization,asrStatus:(0,s.jsx)(Vd,{action:e.senseVoiceAsrAction,active:!e.collapsed})})})]})}let d=f=>{a(!0),f&&e.updateAction?.({action:"check"})},p=()=>{e.dismissUpdate?.(c),a(!1)};return(0,s.jsxs)(s.Fragment,{children:[o.panelView==="settings"?(0,s.jsx)(Gh,{...e,openUpdate:d}):(0,s.jsx)(Mh,{...e}),i&&(0,s.jsx)(bd,{state:o,close:p,run:e.updateAction,t:e.t})]})}function Dh({state:e,save:n,close:t,continueSetup:r}){let o=e.authorization,i=e.authorizationBusy||e.authorizationLoading,a=o?.usageAgreement?.accepted===!0,l=o?.usageAgreement?.text??[];return(0,s.jsxs)("section",{role:"dialog","aria-modal":"false","aria-label":"\u9C7C\u5E94\u4F7F\u7528\u534F\u8BAE","data-whale-authorization":!0,"data-whale-intrinsic":!0,className:`${h.settings} ${h.authorization}`,children:[(0,s.jsxs)("header",{className:h.settingsHeader,children:[(0,s.jsx)(et,{}),(0,s.jsx)("h2",{children:a?"\u9C7C\u5E94\u4F7F\u7528\u534F\u8BAE":"\u6B22\u8FCE\u4F7F\u7528\u9C7C\u5E94"}),a&&!r&&(0,s.jsx)(G.Button,{variant:"outline",disabled:i,onClick:t,children:"\u8FD4\u56DE"})]}),(0,s.jsx)("div",{className:h.authorizationBody,"data-whale-authorization-body":!0,"data-no-drag":!0,children:(0,s.jsxs)("div",{"data-whale-natural-content":!0,children:[!a&&(0,s.jsx)("p",{className:h.authorizationSteps,children:"1 \u4F7F\u7528\u534F\u8BAE\u3000\xB7\u30002 \u57FA\u7840\u914D\u7F6E"}),(0,s.jsx)("h3",{children:"\u9C7C\u5E94\u64CD\u4F5C\u8303\u56F4"}),(0,s.jsx)("div",{className:h.agreement,children:l.map(c=>(0,s.jsx)("p",{children:c},c))}),e.authorizationLoading&&!o&&(0,s.jsx)("p",{role:"status",className:h.hint,children:"\u6B63\u5728\u8BFB\u53D6\u2026"}),o&&(0,s.jsxs)("details",{className:h.section,children:[(0,s.jsx)("summary",{children:"\u670D\u52A1\u4E0E\u6A21\u578B\u6765\u6E90"}),(0,s.jsx)("ul",{className:h.permissionList,children:o.scopes.map(c=>(0,s.jsxs)("li",{children:[(0,s.jsx)("strong",{children:c.title}),(0,s.jsx)("p",{className:h.hint,children:c.description})]},c.id))}),o.modelSources.map(c=>(0,s.jsxs)("div",{children:[(0,s.jsx)("strong",{children:c.modelId}),(0,s.jsx)("p",{className:h.hint,children:c.source}),c.runtime&&(0,s.jsxs)("p",{className:h.hint,children:["\u8FD0\u884C\u7EC4\u4EF6\uFF1A",(c.runtime.sources??[c.runtime.source]).join("\u3001")]}),(0,s.jsx)("p",{className:h.hint,children:c.licenseNote}),c.licenseUrls.map(u=>(0,s.jsx)("p",{className:h.hint,children:(0,s.jsx)("a",{href:u,target:"_blank",rel:"noreferrer",children:u})},u))]},c.modelId))]}),(e.authorizationError||o?.revocationUnconfirmed)&&(0,s.jsx)("p",{role:"alert",className:h.error,children:o?.revocationUnconfirmed?"\u505C\u6B62\u8BBE\u5907\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u68C0\u67E5\u6216\u91CD\u542F\u5BBF\u4E3B\u3002":e.authorizationUncertain?"\u4FDD\u5B58\u7ED3\u679C\u5F85\u786E\u8BA4\uFF0C\u6B63\u5728\u6838\u67E5\u3002":"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"})]})}),(0,s.jsxs)("div",{className:`${h.actions} ${h.authorizationActions}`,children:[(0,s.jsx)(G.Button,{className:h.primary,variant:"primary",disabled:!o||i||e.authorizationUncertain,onClick:()=>a&&o?.granted?(r??t)():void n(!0),children:a&&o?.granted?r?"\u7EE7\u7EED\u914D\u7F6E":"\u8FD4\u56DE":"\u4E00\u952E\u6388\u6743\u5E76\u7EE7\u7EED"}),(0,s.jsx)(G.Button,{variant:"outline",disabled:i,onClick:a&&o?.granted&&!r?()=>{n(!1)}:t,children:a&&o?.granted?r?"\u7A0D\u540E":"\u64A4\u9500\u6388\u6743":"\u6682\u4E0D\u4F7F\u7528"})]}),!a&&(0,s.jsx)("p",{className:h.hint,children:"\u4E0B\u4E00\u6B65\uFF1A\u9009\u62E9\u8BF4\u8BDD\u65B9\u5F0F\u4E0E\u8BED\u97F3\u6A21\u578B"})]})}function Ld({t:e,expand:n,markState:t="idle",compactState:r="off",enabled:o=!1}){return(0,s.jsxs)(G.Button,{className:h.bubble,"data-whale-reopen":!0,"data-whale-operation":"panel-open","data-drag-surface":!0,"aria-label":e("reopen"),title:e("title"),onClick:n,children:[(0,s.jsx)(et,{small:!0,state:t}),(0,s.jsx)("span",{className:h.bubbleBrand,children:e("title")}),(0,s.jsxs)("span",{className:h.bubbleStatus,"data-voice-state":r,children:[(0,s.jsx)(Le,{name:o===!1?"micOff":"mic"}),(0,s.jsx)("span",{children:e("compact_"+r)})]}),(0,s.jsx)("span",{className:h.voiceBars,"data-active":r==="listening"||void 0,"aria-hidden":"true",children:[0,1,2,3,4].map(i=>(0,s.jsx)("i",{},i))}),(0,s.jsx)(Le,{name:"down"})]})}function Mh(e){let{t:n,sessionId:t}=e,r=e.useWhaleUi(re=>re),o=r.status,i=r.busy,a=r.checkedFor===t,l=r.uncertain||!a,c=e.useWhalePreferences(re=>re),u=ur(o),d=r.conversationFor===t?r.conversation:null,p=u&&d?.rootSessionId===u&&!l?d:null,f=r.conversationHistoryFor===t&&!l&&(!o?.enabled||p?.rootSessionId===r.conversationHistory?.rootSessionId)?r.conversationHistory:null,m=p??{rootSessionId:f?.rootSessionId??null,items:[],latest:f?.items?.filter(re=>re.role==="assistant").at(-1)??null},y=!!(o?.enabled&&(r.conversationError||r.conversationFor===t&&r.conversation?.rootSessionId!==u)),v=o?.voiceSession?.recovery?.kind?.startsWith("helper-"),b=["predecessor-cleanup-pending","helper-cleanup-pending"].includes(o?.voiceSession?.recovery?.kind),x=["predecessor-stop-unconfirmed","helper-stop-unconfirmed"].includes(o?.voiceSession?.recovery?.kind)||/VOICE_(PREDECESSOR|HELPER)_STOP_UNCONFIRMED/.test(r.error??""),z=o?.voiceSession?.recovery?.kind==="live-root-conflict"||/VOICE_ROOT_OWNED_ELSEWHERE/.test(r.error??""),F=p?.helper??o?.helper,Z=r.listenModePending?r.listenModeBefore:p?.helper&&p.revision!==r.listenModeReceiptRevision?p.helper.listenMode:o?.listenMode,N=!!(o?.enabled&&F?.online===!1),$=y||!!(o?.enabled&&Z==null),S=!l&&!N&&!$&&yt.includes(Z),O=i||!S||b||x||z||!o?.capabilities?.listenMode||o?.voiceControlBusy||r.visibilityUncertain||r.ttsUncertain||r.ttsCancelling,C=o?.enabled?p?.inputError:null,_=!o?.enabled&&r.enableError,P=Rh[/VOICE_EXISTING_(ARCHIVED|BUSY|UNAVAILABLE)/.exec(_??"")?.[1]],D=/VOICE_EXISTING_BINDING_CHANGED/.test(_??""),A=_&&r.settings?.voiceSession?.performanceMode==="fast"&&/VOICE_EXACT_EFFORT_HOST_REQUIRED|VOICE_FAST_/.test(_),E=t&&o?.ownerSessionId&&o.ownerSessionId!==t&&u!==t,I=o?.existingVoiceSession,H=I?.sessionId,L=r.existingSessionWritePending||r.existingSessionUnconfirmed,J=o&&!l&&r.checkedFor===t&&!L,K=J&&o.existingVoiceSession,ce=J?K?pt(K):n("dedicatedVoiceTarget"):n("checkingVoiceTarget"),de=(0,R.useId)(),me=(0,R.useId)(),j=d?.inputDelivery,T=o?.enabled&&K&&p?.retryTranscripts?.sessionId===K.sessionId?p.retryTranscripts:null,Y=(T?.items??[]).map(re=>j?.id===re.id?{...j,state:re.state}:{...re,sessionId:T.sessionId});j&&!Y.some(re=>re.id===j.id)&&Y.push(j);let ue=[T?.items.length,...Y.map(re=>re.id)].join(","),ge=o?.existingVoiceSessionSupported===!0&&Object.hasOwn(o,"existingVoiceSession")&&e.listExistingVoiceSessions&&e.setExistingVoiceSession,Ie=ge&&po(r,t),yn=e.currentConversationId&&ge&&o.enabled===!1,Qe=!!(!K&&!L&&r.checkedFor===t&&o&&!i&&!o.voiceControlBusy&&!l&&!r.ttsUncertain&&!r.ttsCancelling&&!b&&!z&&!x&&!E),Vn=p?.wake??o?.wake,Hn=b?"pending":x||z||l||$||N?"unknown":i?"pending":p?.inputActive===!0?"input-active":o?.enabled?"authorized":"idle",[Re,te]=(0,R.useState)(null),[en,Be]=(0,R.useState)(!1),nn=Re==="targets"&&ge&&o.enabled===!1,ft=(0,R.useRef)(!1),tt=r.settingsFor===t?r.settings?.values:null,sn=r.settingsFor===t?r.settings?.ttsSetup:null,Pn=sn?.provider==="deepseek"&&(!sn.deepseekTextTransmissionAccepted||r.authorization&&!br(r)),rt=tt?.pttKeyboard?[...tt.pttKeyboard.modifiers||[],tt.pttKeyboard.code].join(" + "):tt?.pttMouse?n("sideButton")+" "+tt.pttMouse:null,ot=(0,R.useRef)({}),fn=()=>{ft.current=!0,te(null)};(0,R.useLayoutEffect)(()=>{te(re=>e.collapsed||re==="targets"?null:re),Be(!1)},[t,e.collapsed]),(0,R.useEffect)(()=>{Be(!1),H&&te(re=>re==="conversation"?null:re)},[H]),(0,R.useEffect)(()=>{o?.enabled&&te(re=>re==="targets"?null:re)},[o?.enabled]),(0,R.useEffect)(()=>{nn||!Ie||!ft.current||!ot.current.targets||(ft.current=!1,ot.current.targets.focus())},[nn,Ie,e.collapsed]),(0,R.useEffect)(()=>{!l&&!H&&Re==="conversation"&&o?.enabled===!1&&e.run(t,"read-history")},[Re,l,o?.enabled,t,H]);let xo=Ju({enabled:o?.enabled,active:p?.inputActive===!0,unknown:!o||l||$||N||x||z||!!C,pending:i||b}),Nn=()=>!H&&Re==="conversation"&&(0,s.jsx)(dd,{conversation:m,history:f,historyLoading:r.sourcePending||!l&&r.conversationHistoryLoading,historyError:l?null:r.conversationHistoryError,historyRetryCursor:r.conversationHistoryRequestCursor,loadHistory:re=>e.run(t,"read-history",re?{cursor:re}:{}),assistantName:c.assistantName||n("assistant"),setAssistantName:e.setAssistantName,t:n,close:()=>{te(null),ot.current.conversation?.focus()}},m.rootSessionId??"empty");return e.collapsed?(0,s.jsx)(Ld,{t:n,expand:e.expand,markState:Hn,compactState:xo,enabled:o?.enabled??null}):(0,s.jsxs)("div",{className:h.panelContent,"data-home-controls":!0,"data-has-input-caption":Y.length>0||void 0,"data-home-layout":[o?o.enabled?"active":"idle":"loading",wo(r,t),!!(r.error||_),!!C,N,b,x,!!K,ue].join(":"),"data-size-detail":Re==="conversation"||nn?"true":"false",onKeyDown:re=>{!nn||re.key!=="Escape"||(re.preventDefault(),re.stopPropagation(),fn())},children:[(0,s.jsxs)("div",{className:h.header,children:[(0,s.jsxs)("span",{className:h.brand,children:[(0,s.jsx)(et,{state:Hn}),(0,s.jsx)("strong",{children:n("title")})]}),(0,s.jsxs)("div",{className:h.headerActions,children:[(0,s.jsxs)(G.Button,{className:h.newChatButton,"data-whale-operation":"new-voice-session","aria-label":n("newChat"),title:K?"\u89E3\u9664\u5DF2\u6709\u4F1A\u8BDD\u7ED1\u5B9A\u540E\u53EF\u65B0\u5EFA\u9C7C\u5E94\u4F1A\u8BDD":n(E?"newChatOtherOwner":o?.enabled?"newChatActive":"newChat"),disabled:!Qe,onClick:()=>{e.run(t,"new",{expectedOwnerSessionId:o.ownerSessionId})},children:[(0,s.jsx)(Le,{name:"plus"}),(0,s.jsx)("span",{children:n("newChat")})]}),(0,s.jsx)(G.Button,{"data-whale-settings-trigger":!0,"data-whale-operation":"page-settings",className:h.iconButton,"aria-label":n("settings"),title:n("settings"),onClick:e.openSettings,children:(0,s.jsx)(Le,{name:"settings"})}),(0,s.jsx)(G.Button,{"data-whale-operation":"panel-close",className:h.iconButton,"aria-label":n("collapse"),title:n("collapseHint"),onClick:e.collapse,children:(0,s.jsx)(Le,{name:"minus"})})]})]}),(0,s.jsxs)("div",{className:h.statusRow,"data-bound":!!K||void 0,"data-recording":Hn==="input-active"||void 0,children:[(0,s.jsx)("div",{id:de,className:h.voiceTarget,"data-whale-voice-target":!0,children:ge?(0,s.jsxs)(G.Button,{ref:re=>{ot.current.targets=re},variant:"outline",className:h.existingSessionHome,"data-whale-bound-session":K?!0:void 0,"data-whale-target-trigger":!0,title:ce,"aria-expanded":!!nn,"aria-controls":nn?me:void 0,disabled:!nn&&!Ie,onClick:()=>nn?fn():te("targets"),children:[(0,s.jsx)("span",{children:n("voiceTarget")}),(0,s.jsx)("strong",{className:h.ellipsis,children:ce}),(0,s.jsx)(Le,{name:nn?"down":"chevron"})]}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("span",{children:n("voiceTarget")}),(0,s.jsx)("strong",{className:h.ellipsis,title:ce,children:ce})]})}),(0,s.jsxs)("div",{className:h.voiceStatus,children:[(0,s.jsx)(Le,{name:o?.enabled?"mic":"micOff"}),(0,s.jsx)("span",{className:h.status,role:"status",children:r.listenModePending?n(o?.enabled?"modeSwitching":"modeSaving"):i?n("pending"):o?b?n("voiceCleanupPending"):x?n("voiceRestartPending"):z?n("voiceRecoveryPending"):l?n("stale"):N?n("voiceInputUnavailable"):$?n("unknown"):C?n("inputError_"+C):p?.inputActive===!0?n("inputActive"):o.enabled&&Z==="wake"?n(ea(Vn)):o.enabled?n("enabled"):n("disabled"):n("unknown")})]})]}),nn?(0,s.jsx)(Mi,{...e,state:r,homePickerId:me,closeHomePicker:fn}):(0,s.jsxs)(s.Fragment,{children:[yn&&(0,s.jsx)(md,{...e,sessionId:e.currentConversationId,boundSession:I,state:r},e.currentConversationId),(0,s.jsxs)("div",{className:h.quickActions,children:[(0,s.jsx)(G.Button,{"data-whale-operation":o?.enabled||z?"stop-voice":"start-voice",className:`${h.mainAction} ${o?.enabled?"":h.primary}`,variant:o?.enabled?"outline":"primary","aria-describedby":de,disabled:!a||!!L||i&&!(o?.enabled&&r.interruptibleRead&&!r.diagnosticStopPending)||b||x&&!o?.enabled||!o||l&&!z&&!N||!o.enabled&&!z&&(!J||K&&!qn(K)),title:o?.enabled?n(T?.items.length?"endDiscardsRetries":"stopConsequence"):void 0,onClick:()=>{e.run(t,o?.enabled||z?"disable":"enable",o?.enabled||z?{}:{expectedOwnerSessionId:null,expectedExistingSessionId:K?.sessionId??null})},children:b?n("voiceCleanupPending"):x?n(o?.enabled?"endConversation":"voiceRestartPending"):z?n("voiceRecoveryCheck"):o?.enabled?n("endConversation"):n("startConversation")}),(0,s.jsx)("div",{className:h.quickSegments,role:"group","aria-label":n("mode"),"aria-busy":!!r.listenModePending,"data-listen-mode":S?Z:"unknown",children:yt.map(re=>(0,s.jsx)(G.Button,{"data-whale-operation":`listen-mode-${re}`,"aria-pressed":S&&Z===re,disabled:!!O,onClick:()=>{Z!==re&&e.run(t,"listen-mode",{mode:re})},children:n(Ar(re))},re))})]}),Y.length>0&&(0,s.jsx)("ul",{className:h.inputCaptions,tabIndex:0,"aria-label":n("voiceTranscriptCaptions"),"data-whale-input-captions":!0,"data-no-drag":!0,children:Y.map(re=>(0,s.jsx)(Zh,{item:re,t:n,pending:r.transcriptRetry,busy:i,canRetry:T?.items.some(it=>it.id===re.id),retry:()=>e.retryVoiceTranscript?.(t,re.id)},re.id))}),(!o||l||b||x||z)&&(0,s.jsx)("p",{className:h.hint,"data-home-important":b||x||z||void 0,children:n(b?v?"voiceHelperCleanupHint":"voiceCleanupHint":x?v?"voiceHelperRestartHint":"voiceRestartHint":z?"voiceRecoveryHint":i?"readingStatus":"statusRetry")}),!l&&(!$||N)&&o?.enabled&&!b&&!x&&(0,s.jsx)("p",{className:h.hint,"data-whale-input-hint":!0,"data-home-important":C||N?!0:void 0,children:N?n("voiceInputRecoveryHint"):C?n("inputHelp_"+C):Z==="wake"?n(Vn?.streamOpen&&Vn.detection==="asr-after-utterance"?"wakeFallbackHint":"wakeHint"):Z==="always"?n("alwaysWarning"):rt?n("holdToSpeak")+" "+rt:n("bindingMissing")}),o&&!l&&!o.capabilities?.listenMode&&(0,s.jsx)("p",{className:h.hint,children:n("modeUnavailable")}),r.listenModeError&&(0,s.jsx)("p",{role:"alert","data-whale-mode-error":!0,className:h.error,children:n(r.uncertain?"modeSwitchUnconfirmed":"modeSwitchFailed")}),r.readOnlyFailure&&l&&!z&&!x&&(0,s.jsx)(G.Button,{variant:"outline",disabled:i,onClick:()=>{e.run(t,"status")},children:n("retryStatus")}),(r.error||_)&&!r.readOnlyFailure&&!P&&!r.listenModeError&&!z&&!x&&(0,s.jsx)("p",{role:"alert",className:h.error,children:n(D?"voiceTargetChanged":A?"performanceFastUnavailable":!r.uncertain&&_?"enableFailed":"operationUnavailable")}),P&&(0,s.jsxs)("p",{role:"alert",className:h.notice,children:[P," ",(0,s.jsx)(G.Button,{variant:"outline",disabled:!Ie,onClick:()=>te("targets"),children:"\u7BA1\u7406\u7ED1\u5B9A"})]}),/VOICE_SESSION_ARCHIVED/.test(_??r.error??"")&&(0,s.jsxs)("p",{className:h.notice,children:["\u539F\u8BED\u97F3\u4F1A\u8BDD\u5DF2\u5F52\u6863\u3002",(0,s.jsx)(G.Button,{variant:"outline",onClick:()=>{e.openSettings("sessions")},children:"\u6062\u590D\u539F\u4F1A\u8BDD"})]}),/VOICE_ASR_(?:PREPARING|PREPARE_FAILED)/.test(_??r.error??"")&&(0,s.jsxs)("p",{className:h.notice,children:["SenseVoice \u5C1A\u672A\u5C31\u7EEA\u3002",(0,s.jsx)(G.Button,{variant:"outline",onClick:()=>{e.openSettings("models","download")},children:"\u67E5\u770B\u6A21\u578B\u8FDB\u5EA6"})]}),/VOICE_MODEL_REQUIRED/.test(_??r.error??"")&&(0,s.jsxs)("p",{className:h.notice,children:["\u8BF7\u5148\u9009\u62E9\u53EF\u7528\u7684\u5BF9\u8BDD\u6A21\u578B\u3002",(0,s.jsx)(G.Button,{variant:"outline",onClick:()=>{e.openSettings("models","conversation")},children:"\u8BBE\u7F6E\u5BF9\u8BDD\u6A21\u578B"})]}),Pn&&(0,s.jsxs)("p",{className:h.notice,"data-home-important":!0,children:["\u6717\u8BFB\u5F85\u542F\u7528\uFF0C\u56DE\u7B54\u4F1A\u663E\u793A\u4E3A\u6587\u5B57\u3002",(0,s.jsx)(G.Button,{variant:"outline",onClick:()=>{e.openSettings("models","voice")},children:"\u8BBE\u7F6E\u6717\u8BFB"})]}),K&&!qn(K)&&(0,s.jsx)("p",{className:h.hint,"data-home-important":!0,children:uo(K)}),p?.providerError&&(0,s.jsx)("p",{role:"alert","data-home-important":!0,"data-whale-provider-error":!0,className:h.error,children:p.providerError}),(0,s.jsx)(pd,{...e,state:r}),!K&&!r.error&&!C&&!z&&!x&&!b&&!N&&!$&&(0,s.jsx)(Bh,{...e,state:r}),en&&(0,s.jsx)("p",{role:"alert",className:h.notice,children:"DSH \u6682\u65F6\u65E0\u6CD5\u6253\u5F00\u539F\u4F1A\u8BDD\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"}),qn(K)&&e.openExistingVoiceSession&&(0,s.jsxs)(G.Button,{className:h.caption,"data-whale-operation":"open-native-session","aria-label":"\u6253\u5F00\u539F\u4F1A\u8BDD",onClick:async()=>{Be(!1);try{await e.openExistingVoiceSession(K.sessionId)}catch{Be(!0)}},children:[p?.latest?.text&&(0,s.jsx)("span",{className:h.ellipsis,children:p.latest.text}),(0,s.jsx)("span",{className:h.openOriginal,children:"\u6253\u5F00\u539F\u4F1A\u8BDD"}),(0,s.jsx)(Le,{name:"chevron"})]}),o&&!H&&(0,s.jsxs)(G.Button,{ref:re=>{ot.current.conversation=re},className:h.caption,onClick:()=>{let re=Re!=="conversation";te(re?"conversation":null),re&&e.run(t,"read-history")},"aria-label":n("recentConversation"),"aria-expanded":Re==="conversation",children:[(0,s.jsxs)("span",{className:h.ellipsis,children:[m.latest?.state==="speech-failed"?n("speechFailed")+": ":m.latest?.state==="interrupted"?n("speechInterrupted")+": ":"",m.latest?.text??n(r.newChatFor===t?"newChatCreated":"viewConversation")]}),(0,s.jsx)(Le,{name:"chevron"})]}),Nn()]})]})}function Zh({item:e,pending:n,busy:t,canRetry:r,retry:o,t:i}){let a=(0,R.useId)(),l=n?.id===e.id&&e.state==="ready"?n.state:e.state,c=pt(e);return(0,s.jsxs)("li",{className:h.inputCaption,"data-whale-input-caption":!0,"data-delivery-state":l,children:[(0,s.jsxs)("div",{id:a,children:[(0,s.jsx)("p",{className:h.inputCaptionText,children:e.text}),(0,s.jsxs)("p",{className:h.inputCaptionReceipt,role:"status",children:[(0,s.jsx)("span",{children:i("transcriptDelivery_"+l)}),(0,s.jsx)("span",{className:h.ellipsis,title:c,children:c})]})]}),r&&(0,s.jsx)(G.Button,{variant:"outline",disabled:t||!!n||l!=="ready",onClick:()=>{o()},"aria-describedby":a,"data-whale-operation":"retry-voice-transcript",children:i("retryTranscript")})]})}function wo(e,n){let t=e.status;return!!(e.settings?.revision&&e.checkedFor===n&&e.settingsFor===n&&!e.uncertain&&!e.visibilityUncertain&&!e.settingsConflict&&!e.ttsUncertain&&!e.ttsCancelling&&t?.enabled===!1&&t.ownerSessionId===null&&t.voiceControlBusy===!1&&t.voiceSession?.fullyStopped===!0&&t.voiceSession?.id===null)}function Bh({state:e,sessionId:n,t,run:r,readState:o}){let i=(0,R.useRef)(0);(0,R.useEffect)(()=>()=>{i.current++},[n]);let a=wo(e,n),l=e.settings?.voiceSession?.performanceMode,c=e.performanceFor===n?e.performance:null,u=["fast","balanced","high"],d=c?.modes?.some(m=>m.performanceMode===l&&!m.available),p=e.busy||e.performancePending||e.uncertain||e.visibilityUncertain||!a,f=async m=>{if(p||m===l)return;let y=++i.current;if(m!=="compatibility"&&!await r(n,"inspect-performance")||y!==i.current)return;let v=o?.();!v||!wo(v,n)||v.busy||m!=="compatibility"&&(v.performanceFor!==n||!v.performance?.modes?.find(b=>b.performanceMode===m)?.available)||await r(n,"set-performance-mode",{revision:v.settings.revision,performanceMode:m})};return a?(0,s.jsxs)("section",{className:h.quickSpeed,"aria-label":t("performanceTitle"),children:[(0,s.jsxs)("div",{className:h.quickSpeedHeader,children:[(0,s.jsx)("span",{children:t("performanceTitle")}),l==="compatibility"&&(0,s.jsx)("small",{children:t("performance_compatibility")})]}),(0,s.jsx)("div",{className:h.quickSegments,children:u.map(m=>(0,s.jsxs)(G.Button,{"aria-pressed":l===m,disabled:p||!!Li(c,m),title:t(Li(c,m)||(m==="fast"?"performanceFastHint":"performance_"+m)),onClick:()=>{f(m)},children:[l===m&&(0,s.jsx)(Le,{name:"check"}),(0,s.jsx)(Hd,{value:m,t})]},m))}),(0,s.jsx)(Kd,{capability:c,t,compact:!0,pending:e.performancePending,error:e.performanceError}),d&&(0,s.jsx)(G.Button,{variant:"outline",disabled:p,onClick:()=>{f("compatibility")},children:t("performance_compatibility")})]}):null}function Fh({settings:e,sessionId:n,busy:t,run:r,t:o,status:i,verified:a,statusFresh:l,tab:c,markSettingsEdited:u,discardSettingsDraft:d,bindingError:p,captureBindings:f}){let[m,y]=(0,R.useState)(e.values.device??null),[v,b]=(0,R.useState)(e.values.pttMouse),[x,z]=(0,R.useState)(e.values.pttKeyboard??null),[F,Z]=(0,R.useState)(e.values.speakerVerification.enabled),N=e.capabilities?.turnSignals===!0,[$,S]=(0,R.useState)(e.values.turnSignals?.enabled??!1),[O,C]=(0,R.useState)(e.values.turnSignals?.volume?.toString()??""),[_,P]=(0,R.useState)((e.values.wakeWordAliases??["\u5C0F\u9CB8\u9C7C"]).join("\uFF0C")),[D,A]=(0,R.useState)(String((e.values.wakeListenTimeoutMs??1e4)/1e3)),E=ta(_),I=Sr(E)&&Number.isInteger(Number(D)*1e3)&&Number(D)>=3&&Number(D)<=30,H=JSON.stringify(E)!==JSON.stringify(e.values.wakeWordAliases??["\u5C0F\u9CB8\u9C7C"])||Number(D)*1e3!==(e.values.wakeListenTimeoutMs??1e4),[L,J]=(0,R.useState)(e.values.semanticExperimental===!0),[K,ce]=(0,R.useState)(e.values.turnSignals?.headphonesConfirmed??!1),[de,me]=(0,R.useState)(e.values.turnSignals?.experimentalAutomaticBargeIn??!1),j=v!==e.values.pttMouse||JSON.stringify(x)!==JSON.stringify(e.values.pttKeyboard??null),[T,Y]=(0,R.useState)(!1),ue=l?i?.inputDevices:null,ge=m!==null&&typeof m=="object",Ie=ge||m==null||m===""||ue?.items?.some(te=>typeof m=="number"&&te.index===m),yn=T==="index"&&(String(m??"").trim()===""||!/^\d+$/.test(String(m).trim())||!Number.isSafeInteger(Number(m))),Qe=t||!l||i?.enabled!==!1||i?.ownerSessionId!==null||i?.voiceControlBusy!==!1||i?.voiceSession?.fullyStopped!==!0,Vn=()=>{if(t||!I||yn||H&&Qe)return;let te=ge&&!T?m:T==="index"?Number(m):m==null||m===""?null:T==="name"?String(m).trim():typeof m=="number"?m:m.trim();r(n,"save-settings",{revision:e.revision,values:{wakeWordAliases:E,wakeListenTimeoutMs:Number(D)*1e3,semanticExperimental:L,device:te,pttMouse:e.values.pttMouse,...e.capabilities?.pttKeyboard?{pttKeyboard:e.values.pttKeyboard??null}:{},speakerVerification:{enabled:F},...N?{turnSignals:{enabled:$,volume:Number(O),headphonesConfirmed:K,experimentalAutomaticBargeIn:de}}:{}}})},Hn=(0,s.jsx)(G.Button,{className:h.primary,variant:"primary",disabled:t||!I||yn||H&&Qe||N&&(O.trim()===""||!Number.isFinite(Number(O))||Number(O)<0||Number(O)>1),onClick:Vn,children:o(t?"pending":"save")}),Re=ge?m.name:ue?.items?.find(te=>te.index===m)?.name??(m==null||m===""?o("deviceDefault"):String(m));return(0,s.jsxs)("div",{className:h.section,"data-settings-draft":"save-settings",children:[(0,s.jsxs)("div",{hidden:c!=="audio",className:h.section,children:[(0,s.jsx)("h3",{children:o("mode")}),(0,s.jsxs)("p",{className:h.hint,children:["\u5F53\u524D\uFF1A",o(Ar(i?.listenMode??e.listenMode))]}),(0,s.jsx)("div",{className:h.segmented,children:["ptt","always","wake"].map(te=>(0,s.jsx)(G.Button,{"data-whale-operation":`listen-mode-${te}`,variant:"outline","aria-pressed":(i?.listenMode??e.listenMode)===te,disabled:!e.capabilities?.listenMode||!a||t,onClick:()=>{r(n,"listen-mode",{mode:te})},children:o(Ar(te))},te))}),(!e.capabilities?.listenMode||!a)&&(0,s.jsx)("p",{className:h.hint,children:o(e.capabilities?.listenMode?"modeNeedsGrant":"modeUnavailable")}),(0,s.jsxs)("div",{className:h.inlineActions,children:[(0,s.jsxs)("label",{className:h.inlineField,children:[o("device"),(0,s.jsxs)("select",{title:Re,className:h.deviceSelect,"aria-label":o("device"),disabled:t,value:T?"__manual-"+T:ge?"__stable":Ie?m??"":"__saved",onChange:te=>{let en=te.target.value;en.startsWith("__manual-")?(Y(en.slice(9)),ge&&y("")):en!=="__saved"&&en!=="__stable"&&(Y(!1),y(en===""?null:Number(en)))},children:[(0,s.jsx)("option",{value:"",children:o("deviceDefault")}),ge&&(0,s.jsx)("option",{value:"__stable",children:m.name}),ue?.items?.map(te=>(0,s.jsxs)("option",{value:String(te.index),children:[te.name," (",te.index,")"]},te.index)),!Ie&&(0,s.jsxs)("option",{value:"__saved",children:[o("deviceSaved"),": ",m]}),(0,s.jsx)("option",{value:"__manual-index",children:o("deviceManualIndex")}),(0,s.jsx)("option",{value:"__manual-name",children:o("deviceManualName")})]})]}),Hn]}),Re.length>22&&(0,s.jsxs)("details",{className:h.fullName,children:[(0,s.jsx)("summary",{children:"\u67E5\u770B\u8BBE\u5907\u5168\u540D"}),(0,s.jsx)("p",{children:Re})]}),(T||!Ie)&&(0,s.jsxs)("label",{className:h.field,children:[o("deviceManual"),(0,s.jsx)(G.Input,{"aria-label":o("deviceManual"),disabled:t,value:m??"",onChange:te=>{T||Y(typeof m=="number"?"index":"name"),y(te.target.value)}})]}),yn&&(0,s.jsx)("p",{className:h.notice,children:o("deviceIndexInvalid")}),ue?.status!=="available"&&(0,s.jsx)("p",{className:h.hint,children:o(ue?.status==="empty"?"deviceEmpty":"deviceUnknown")})]}),(0,s.jsx)("div",{hidden:c!=="interaction",className:h.section,children:(0,s.jsxs)("div",{className:h.bindingEditor,"data-settings-draft":"save-bindings",children:[(0,s.jsx)(Vh,{captureBindings:f,sessionId:n,active:c==="interaction",value:x,onChange:te=>{u?.("save-bindings"),z(te)},capability:e.capabilities?.pttKeyboard,disabled:t||!l,t:o}),(0,s.jsxs)("fieldset",{className:`${h.radios} ${h.mouseBinding}`,disabled:t||!l,children:[(0,s.jsx)("legend",{children:o("sideButton")}),[0,1,2].map((te,en)=>(0,s.jsxs)("label",{children:[(0,s.jsx)("input",{type:"radio",name:"whale-ear-mouse",value:te,checked:v===te,onChange:()=>{u?.("save-bindings"),b(te)}}),o(["sideOff","sideOne","sideTwo"][en])]},te))]}),p&&(0,s.jsx)("p",{role:"alert",className:h.notice,children:/RECORDING|KEYS_HELD/.test(p)?"\u8BF7\u5148\u677E\u5F00\u6309\u952E\uFF0C\u7B49\u5F85\u5F55\u97F3\u5904\u7406\u5B8C\u6210\uFF0C\u518D\u4FDD\u5B58\u3002":/UNCONFIRMED|STOP_UNCONFIRMED|ROLLBACK_UNCONFIRMED/.test(p)?"\u6309\u952E\u72B6\u6001\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u91CD\u542F DSH \u518D\u6838\u67E5\u6309\u952E\u3002":/STALE|配置已改变|语音会话已改变/.test(p)?"\u914D\u7F6E\u6216\u8BED\u97F3\u4F1A\u8BDD\u5DF2\u6539\u53D8\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6\u540E\u518D\u4FDD\u5B58\u3002":/UNSUPPORTED/.test(p)?"\u5F53\u524D\u7CFB\u7EDF\u4E0D\u652F\u6301\u5728\u5BF9\u8BDD\u4E2D\u66F4\u6362\u5168\u5C40\u6309\u952E\u3002":"\u672A\u80FD\u4FDD\u5B58\u6309\u952E\uFF0C\u8BF7\u67E5\u770B\u9AD8\u7EA7\u8BE6\u60C5\u3002"}),(0,s.jsxs)("div",{className:`${h.actions} ${h.bindingActions}`,children:[(0,s.jsx)(G.Button,{className:h.primary,variant:"primary",disabled:t||!l||!j||!e.bindingContext||x?.code==="F4"&&x.modifiers.includes("Alt"),onClick:()=>{r(n,"save-bindings",{revision:e.revision,bindingContext:e.bindingContext,values:{pttMouse:v,pttKeyboard:x}})},children:o("saveBindings")}),j&&(0,s.jsx)(G.Button,{variant:"outline",disabled:t,onClick:()=>{b(e.values.pttMouse),z(e.values.pttKeyboard??null),d?.("save-bindings")},children:o("discardBindings")})]})]})}),(0,s.jsxs)("div",{hidden:c!=="advanced"||!e.values.speakerVerification.enabled,className:h.section,children:[e.values.speakerVerification.enabled&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(Vt,{label:o("speaker"),checked:F,disabled:t,onChange:Z}),(0,s.jsx)("p",{className:h.hint,children:o("speakerHint")})]}),(0,s.jsx)("p",{className:h.hint,children:o("savedHint")})]}),(0,s.jsxs)("div",{hidden:c!=="audio",className:h.disclosureRow,children:[(0,s.jsxs)("details",{className:h.section,children:[(0,s.jsx)("summary",{children:o("wakeSettings")}),(0,s.jsx)("p",{className:h.hint,children:o("wakeMethod")}),(0,s.jsxs)("label",{className:h.field,children:[o("wakeAliases"),(0,s.jsx)(G.Input,{"aria-label":o("wakeAliases"),maxLength:208,value:_,disabled:Qe,onChange:te=>P(te.target.value)})]}),(0,s.jsx)("p",{className:h.hint,children:o("wakeAliasesHint")}),(0,s.jsxs)("label",{className:h.field,children:[o("wakeTimeout"),(0,s.jsx)(G.Input,{"aria-label":o("wakeTimeout"),type:"number",min:"3",max:"30",step:"1",value:D,disabled:Qe,onChange:te=>A(te.target.value)})]}),Qe&&(0,s.jsx)("p",{className:h.hint,children:o("wakeStopToEdit")}),!I&&(0,s.jsx)("p",{role:"alert",className:h.notice,children:o("wakeInvalid")})]}),(0,s.jsxs)("details",{className:h.section,children:[(0,s.jsx)("summary",{children:o("soundTitle")}),(0,s.jsx)(Vt,{label:o("soundEnabled"),checked:$,disabled:!N||t,onChange:S}),(0,s.jsxs)("label",{className:h.field,children:[o("soundVolume"),(0,s.jsx)(Lt,{"aria-label":o("soundVolume")+"\u6ED1\u5757",min:"0",max:"1",step:"0.05",value:O,disabled:!N||t,onChange:te=>C(te.target.value)}),(0,s.jsx)(G.Input,{type:"number",min:"0",max:"1",step:"0.05","aria-label":o("soundVolume"),disabled:!N||t,value:O,onChange:te=>C(te.target.value)})]}),(0,s.jsx)(Vt,{label:"\u5B9E\u9A8C\u6027\u5524\u9192\u5224\u65AD\uFF08\u9ED8\u8BA4\u5173\u95ED\uFF09",checked:L,disabled:t,onChange:J}),(0,s.jsx)("p",{className:h.hint,children:"\u5173\u95ED\u65F6\uFF0C\u81EA\u7531\u9EA6\u76F4\u63A5\u542C\u53D6\u6709\u6548\u8BED\u97F3\uFF1B\u5F00\u542F\u540E\u4F7F\u7528\u5524\u9192\u8BCD\u6216\u8BED\u4E49\u5224\u65AD\uFF0C\u53EF\u80FD\u6F0F\u5524\u9192\u3002\u5EFA\u8BAE\u4F7F\u7528\u8033\u673A\u51CF\u5C11\u56DE\u58F0\u3002"}),(0,s.jsx)(G.Checkbox,{label:o("headphones"),checked:K,disabled:!N||t,onChange:te=>{ce(te),te||me(!1)}}),(0,s.jsx)("p",{className:h.hint,children:o("headphonesHint")}),(0,s.jsx)(Vt,{label:o("automaticBargeIn"),checked:de,disabled:!N||!K||t,onChange:me}),N&&!K&&(0,s.jsx)("p",{className:h.hint,children:o("headphonesRequired")}),(0,s.jsx)("p",{className:h.hint,children:o(N?"soundAvailable":"soundUnavailable")})]})]}),c==="advanced"&&e.values.speakerVerification.enabled&&(0,s.jsx)("div",{className:h.formActions,children:Hn})]})}function Vd({action:e,active:n}){let[t,r]=(0,R.useState)(null),[o,i]=(0,R.useState)(0),a=(0,R.useRef)(0);if((0,R.useEffect)(()=>{if(!e||!n)return;let u=new AbortController,d,p=async m=>{try{let y=await e({operation:m},u.signal);if(u.signal.aborted)return;r(y),y.selected&&(m==="retry"||["idle","downloading"].includes(y.state))&&(d=setTimeout(()=>{p("status")},1e3))}catch{u.signal.aborted||r({state:"unavailable"})}},f=o>a.current?"retry":"status";return a.current=o,p(f),()=>{clearTimeout(d),u.abort()}},[e,n,o]),!e||!n)return null;let l=t?.totalBytes>0&&t?.state==="downloading",c=u=>(u/1e6).toFixed(1);return(0,s.jsxs)("div",{className:h.section,"data-whale-sensevoice":!0,children:[(0,s.jsx)("h3",{children:"SenseVoice"}),(0,s.jsx)("p",{role:"status",children:t?.selected===!1?"\u4F7F\u7528\u9AD8\u7EA7\u8DEF\u5F84\u4E2D\u6307\u5B9A\u7684\u672C\u5730 SenseVoice \u6A21\u578B\u3002":t?.state==="ready"?"\u5DF2\u5C31\u7EEA\uFF0C\u5728\u672C\u673A\u79BB\u7EBF\u8BC6\u522B\u3002":t?.state==="error"?t.message:t?.state==="unavailable"?"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u6A21\u578B\u72B6\u6001\u3002":l?`\u6B63\u5728\u4E0B\u8F7D \xB7 ${c(t.receivedBytes)} / ${c(t.totalBytes)} MB`:"\u6B63\u5728\u51C6\u5907\u672C\u5730\u8BC6\u522B\u6A21\u578B\u2026"}),l&&(0,s.jsx)("progress",{"aria-label":"SenseVoice \u4E0B\u8F7D\u8FDB\u5EA6",value:t.receivedBytes,max:t.totalBytes}),t?.selected&&t?.state==="error"&&(0,s.jsx)(G.Button,{variant:"outline",onClick:()=>{r(null),i(u=>u+1)},children:"\u91CD\u8BD5\u4E0B\u8F7D"})]})}function qh({settings:e,sessionId:n,busy:t,run:r,t:o,pickPath:i,active:a,modelTab:l,markSettingsEdited:c,senseVoiceAsrAction:u}){let[d,p]=(0,R.useState)(e.modelSetup.models),f=t,m=()=>c?.("save-models"),y=()=>{r(n,"save-models",{revision:e.revision,values:{asr:"sensevoice",modelCompute:"cpu",models:d}})};return(0,s.jsxs)("section",{className:h.section,"data-settings-draft":"save-models",hidden:!["download","paths"].includes(l),children:[(0,s.jsx)("div",{"data-whale-tab-panel":!0,hidden:l!=="download",children:(0,s.jsx)(Vd,{action:u,active:a&&l==="download"})}),(0,s.jsxs)("div",{hidden:l!=="paths",className:h.section,children:[(0,s.jsx)("h3",{children:"\u8BC6\u522B\u6A21\u578B\u672C\u5730\u8DEF\u5F84"}),(0,s.jsx)("p",{className:h.hint,children:"\u53EF\u5728\u201C\u6A21\u578B\u4E0B\u8F7D\u201D\u67E5\u770B\u51C6\u5907\u8FDB\u5EA6\uFF0C\u6216\u5728\u8FD9\u91CC\u6307\u5B9A\u672C\u673A\u5DF2\u6709\u7684 SenseVoice \u76EE\u5F55\u3002"}),[["sensevoiceDir","sensevoicePath"],["campplus","campplusPath"]].map(([v,b])=>(0,s.jsx)(fr,{className:h.pathRow,label:o(b),kind:v,value:d[v],disabled:f,active:a&&l==="paths",pickPath:i,sessionId:n,scope:"sensevoice",onChange:x=>{m(),p(z=>({...z,[v]:x}))}},v)),(0,s.jsx)(G.Button,{variant:"outline",disabled:f,onClick:y,children:o("saveModels")})]})]})}function Lh({settings:e,state:n,sessionId:t,run:r,t:o}){let[i,a]=(0,R.useState)(e.voiceSession.visibility),l=n.settingsFor===t,c=n.checkedFor===t&&n.status!==null,u=c?n.status.voiceCapabilities:e.voiceCapabilities,d=c?n.status.voiceSession:null,p=c&&(n.status.enabled||n.status.ownerSessionId!==null||d?.id!=null),f=c&&n.status.voiceControlBusy===!1,m=n.busy||n.uncertain||!l||!c||!f||p,y=v=>o(v==="workspace"?"workspaceMode":"hiddenMode");return(0,s.jsxs)("section",{className:h.section,"data-whale-visibility":!0,"data-settings-draft":"set-visibility",children:[(0,s.jsx)("h3",{children:o("capabilityTitle")}),(0,s.jsx)("dl",{className:h.details,children:["hidden","workspace"].map(v=>(0,s.jsxs)("div",{className:h.capabilityRow,children:[(0,s.jsx)("dt",{children:y(v)}),(0,s.jsxs)("dd",{children:[o(u?.[v]?.supported?"supported":"unsupported"),u?.[v]?.reason?` \xB7 ${u[v].reason}`:""]})]},v))}),(0,s.jsxs)("p",{className:h.hint,children:[o("taskCapability"),": ",o(u?.taskHandoff?.supported?"supported":"unsupported")," \xB7 ",u?.taskHandoff?.mode??o("unknown"),u?.taskHandoff?.reason?` \xB7 ${u.taskHandoff.reason}`:""]}),(0,s.jsxs)("p",{children:[o("configuredMode"),": ",y(e.voiceSession.visibility)]}),(0,s.jsx)("p",{className:h.hint,children:c?d?.id?`${o("currentVoiceMode")}: ${d.presentation?.requested?y(d.presentation.requested):o("unknown")} \xB7 ${d.id}`:o("noActiveVoice"):o("modeReadFirst")}),(0,s.jsxs)("fieldset",{className:h.radios,disabled:m,children:[(0,s.jsx)("legend",{children:o("chooseVisibility")}),(0,s.jsxs)("label",{children:[(0,s.jsx)("input",{type:"radio",name:"whale-ear-visibility",checked:i==="hidden",onChange:()=>a("hidden")}),o("hiddenMode")]}),(0,s.jsxs)("label",{children:[(0,s.jsx)("input",{type:"radio",name:"whale-ear-visibility",checked:i==="workspace",disabled:!u?.workspace?.supported,onChange:()=>a("workspace")}),o("workspaceMode")]})]}),(0,s.jsx)("p",{className:h.hint,children:o("workspaceWarning")}),(0,s.jsx)("p",{className:h.hint,children:o("visibilityNoMigration")}),(!l||!c)&&(0,s.jsx)("p",{className:h.hint,children:o("modeReadFirst")}),p&&(0,s.jsx)("p",{className:h.hint,children:o("closeBeforeMode")}),c&&!f&&(0,s.jsx)("p",{className:h.hint,children:o("modeControlPending")}),(0,s.jsx)("div",{children:(0,s.jsx)(G.Button,{variant:"outline",disabled:m||i===e.voiceSession.visibility||i==="workspace"&&!u?.workspace?.supported,onClick:()=>{r(t,"set-visibility",{revision:e.revision,visibility:i})},children:o(i==="workspace"?"saveWorkspace":"saveHidden")})})]})}function Vh({value:e,onChange:n,capability:t,disabled:r,t:o,captureBindings:i,sessionId:a,active:l}){let[c,u]=(0,R.useState)(!1),[d,p]=(0,R.useState)(!1),[f,m]=(0,R.useState)(null),y=(0,R.useRef)(null),v=(0,R.useRef)(0),b=(0,R.useRef)(null),x=(0,R.useRef)(!0),z=async N=>{v.current++,x.current&&u(!1);let $=y.current;if($){x.current&&p(!0);try{await i($.sessionId,{operation:"end",token:$.token}),y.current===$&&(y.current=null),x.current&&N&&n(N),x.current&&m(null)}catch(S){x.current&&m(String(S.message||S))}finally{x.current&&p(!1)}}},F=async()=>{if(y.current||d)return;let N=++v.current;p(!0),m(null);try{let $=await i(a,{operation:"begin"});if(y.current={...$,sessionId:a},!x.current||N!==v.current){await z();return}u(!0),b.current?.focus()}catch($){x.current&&m(String($.message||$))}finally{x.current&&p(!1)}};(0,R.useEffect)(()=>(x.current=!0,()=>{x.current=!1,z()}),[]),(0,R.useEffect)(()=>{(!l||r)&&(v.current++,z())},[l,r,a]),(0,R.useEffect)(()=>{if(!c)return;let N=null,$=!1,S=!1,O=E=>{S||(S=!0,z(E))},C=E=>{if(E.preventDefault(),E.stopPropagation(),E.code==="Escape"){N=null;return}E.repeat||["ControlLeft","ControlRight","AltLeft","AltRight","ShiftLeft","ShiftRight"].includes(E.code)||(N=rd(E),$=!1,m(N?null:o("bindingUnsupported")))},_=E=>{if(E.preventDefault(),E.stopPropagation(),E.code==="Escape"){O();return}N&&(E.code===N.code&&($=!0),$&&!E.ctrlKey&&!E.altKey&&!E.shiftKey&&O(N))},P=()=>O(),D=()=>{document.hidden&&P()};window.addEventListener("keydown",C,!0),window.addEventListener("keyup",_,!0),window.addEventListener("blur",P),document.addEventListener("visibilitychange",D);let A=setTimeout(P,1e4);return()=>{clearTimeout(A),window.removeEventListener("keydown",C,!0),window.removeEventListener("keyup",_,!0),window.removeEventListener("blur",P),document.removeEventListener("visibilitychange",D)}},[c]);let Z=e?[...e.modifiers||[],e.code].join(" + "):o("bindingOff");return(0,s.jsxs)("section",{className:h.keyBinding,children:[(0,s.jsx)("h3",{children:o("keyboardBinding")}),(0,s.jsxs)("div",{className:h.keyBindingRow,children:[(0,s.jsx)("span",{children:Z}),(0,s.jsxs)("div",{className:h.actions,children:[(0,s.jsx)(G.Button,{variant:"outline",ref:b,onBlur:()=>{c&&z()},disabled:r||d||!t?.supported||!i,onClick:()=>c?void z():void F(),children:d?"\u6B63\u5728\u4EA4\u63A5\u2026":c?"\u53D6\u6D88\u5F55\u5165":"\u5F55\u5165\u6309\u952E"}),e&&(0,s.jsx)(G.Button,{variant:"outline",disabled:r||d||c,onClick:()=>n(null),children:o("clearBinding")}),y.current&&!c&&!d&&(0,s.jsx)(G.Button,{variant:"outline",onClick:()=>{z()},children:"\u6062\u590D\u539F\u6309\u952E"})]})]}),c&&(0,s.jsx)("p",{role:"status",className:h.notice,children:"\u6309\u952E\u8BF4\u8BDD\u5DF2\u6682\u505C\u3002\u8BF7\u6309\u4E0B\u7EC4\u5408\u952E\u540E\u5168\u90E8\u677E\u5F00\uFF1BEsc \u53D6\u6D88\u3002"}),!t?.supported&&(0,s.jsx)("p",{className:h.hint,children:t?.reason||o("bindingUnavailable")}),f&&(0,s.jsx)("p",{role:"alert",children:f})]})}function Hd({value:e,t:n}){let t={fast:"performanceNoThinking",balanced:"performanceRecommended"}[e];return(0,s.jsxs)("span",{className:h.performanceChoice,children:[n("performance_"+e),t&&(0,s.jsxs)(s.Fragment,{children:[" ",(0,s.jsx)("small",{children:n(t)})]})]})}function Li(e,n){let t=e?.modes?.find(r=>r.performanceMode===n);return!t||t.available?null:t.reason==="provider_unsupported"?"performanceUnavailable":t.reason==="unknown"?"performanceProbeUnknown":n==="fast"?"performanceFastUnavailable":"performanceHostUnavailable"}function Kd({capability:e,t:n,compact:t=!1,pending:r=!1,error:o=null}){let i=e?.modes??[],a=i.map(v=>v.reason),l=e?.probe?.status,c=l==="unknown"||a.includes("unknown"),u=r||l==="pending"||l==="running",d=!t&&(l==="accepted"||a.includes("accepted")),p=!t&&a.includes("explicit_off"),f=i.some(v=>v.performanceMode==="fast"&&!v.available&&v.reason==="host_contract_blocked"),m=a.includes("provider_unsupported"),y=i.some(v=>v.performanceMode!=="fast"&&!v.available&&v.reason==="host_contract_blocked");if(!c&&!u&&!d&&!p&&!f&&!m&&!y&&!o)return null;if(t){let v=o||n(u?"performanceProbePending":f?"performanceFastUnavailable":m?"performanceUnavailable":c?"performanceProbeUnknown":"performanceHostUnavailable");return(0,s.jsx)("div",{role:"status",className:h.quickHint,"data-whale-probe-status":!0,title:v,children:v})}return(0,s.jsxs)("div",{role:"status",className:h.hint,"data-whale-probe-status":!0,children:[u&&(0,s.jsx)("p",{children:n("performanceProbePending")}),o&&(0,s.jsx)("p",{"data-whale-probe-error":!0,children:o}),f&&(0,s.jsx)("p",{children:n("performanceFastUnavailable")}),m&&(0,s.jsx)("p",{children:n("performanceUnavailable")}),y&&(0,s.jsx)("p",{children:n("performanceHostUnavailable")}),c&&(0,s.jsx)("p",{children:n("performanceProbeUnknown")}),d&&(0,s.jsx)("p",{children:n("performanceProbeAccepted")}),p&&(0,s.jsx)("p",{children:n("performanceFastHint")})]})}function Hh({state:e,sessionId:n,run:t,t:r,markSettingsEdited:o}){let i=e.settings,a=i?.voiceSession?.performanceMode??null,[l,c]=(0,R.useState)(a),u=wo(e,n),d=e.performanceFor===n?e.performance:null,p=d?.modes?.find(m=>m.performanceMode===l),f=e.busy||e.performancePending||e.uncertain||!u||!l||l!=="compatibility"&&!p?.available;return u?(0,s.jsxs)("section",{className:h.section,"data-whale-performance":!0,"data-settings-draft":"set-performance-mode",children:[(0,s.jsx)("h3",{children:r("performanceTitle")}),(0,s.jsx)("p",{className:h.hint,children:r("performanceHint")}),(0,s.jsx)("p",{className:h.hint,"data-whale-probe-cost":!0,children:"\u90E8\u5206\u6A21\u578B\u7684\u68C0\u6D4B\u4F1A\u53D1\u9001\u8BA1\u8D39\u77ED\u8BF7\u6C42\u3002"}),(0,s.jsxs)("details",{className:h.details,children:[(0,s.jsx)("summary",{children:"\u68C0\u6D4B\u8303\u56F4\u4E0E\u8D39\u7528"}),(0,s.jsx)("p",{children:r("performanceProbeCost")}),(0,s.jsx)("p",{children:r("performanceProbeScope")})]}),(0,s.jsx)(Kd,{capability:d,t:r,pending:e.performancePending,error:e.performanceError}),!d&&(0,s.jsx)("p",{className:h.hint,children:r("performanceReadFirst")}),a&&(0,s.jsxs)("p",{className:h.hint,children:["\u5F53\u524D\uFF1A",r("performance_"+a)]}),(0,s.jsx)("div",{className:h.segmented,children:["fast","balanced","high","compatibility"].map(m=>{let y=m==="compatibility"?null:d?Li(d,m):"performanceReadFirst";return(0,s.jsx)(G.Button,{title:y?r(y):void 0,"aria-pressed":l===m,disabled:e.busy||e.performancePending||!!y,onClick:()=>{o?.("set-performance-mode"),c(m)},children:(0,s.jsx)(Hd,{value:m,t:r})},m)})}),(0,s.jsxs)("div",{className:h.actions,children:[(0,s.jsx)(G.Button,{variant:"outline",disabled:e.busy||e.performancePending,onClick:()=>{t(n,"inspect-performance")},children:r("inspectPerformance")}),(0,s.jsx)(G.Button,{variant:"outline",disabled:f||l===a,onClick:()=>{t(n,"set-performance-mode",{revision:i.revision,performanceMode:l})},children:r("savePerformance")})]})]}):null}function Kh({state:e,sessionId:n,run:t,t:r}){let o=e.outputVolumeFor===n?e.outputVolume:null,[i,a]=(0,R.useState)(null),[l,c]=(0,R.useState)(null),u=i??o?.volume??1,d=i!==null&&l!==o?.revision;return(0,R.useEffect)(()=>{a(null),c(null)},[n]),(0,s.jsxs)("section",{className:h.section,children:[(0,s.jsx)("h3",{children:r("outputVolume")}),o&&!o.supported&&(0,s.jsx)("p",{className:h.hint,children:r("outputVolumeUnavailable")}),o?.supported&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:h.volumeRow,children:[(0,s.jsxs)("label",{className:h.volumeControl,children:[(0,s.jsx)(Lt,{"aria-label":r("outputVolume"),min:"0",max:"1",step:"0.01",value:u,disabled:!o.supported||e.busy||e.outputVolumeUncertain,onChange:p=>{i===null&&c(o.revision),a(Number(p.target.value))}}),(0,s.jsxs)("span",{children:[Math.round(u*100),"%"]})]}),(0,s.jsx)(G.Button,{variant:"outline",disabled:!o.supported||e.busy||e.outputVolumeUncertain||d||i===null,onClick:async()=>{await t(n,"set-output-volume",{revision:l,volume:i})&&a(null)},children:r("saveOutputVolume")})]}),(0,s.jsx)("p",{className:h.hint,children:"\u4E0B\u4E00\u6BB5\u64AD\u653E\u751F\u6548"})]}),d&&(0,s.jsxs)("p",{role:"status",className:h.notice,children:["\u97F3\u91CF\u5DF2\u5728\u522B\u5904\u66F4\u65B0\uFF0C\u5F53\u524D\u9009\u62E9\u5DF2\u4FDD\u7559\u3002",(0,s.jsx)(G.Button,{variant:"outline",disabled:e.busy,onClick:()=>a(null),children:"\u4F7F\u7528\u5F53\u524D\u97F3\u91CF"})]}),!o&&(0,s.jsx)("p",{role:"status",className:h.hint,children:e.busy?r("pending"):r("statusRetry")}),e.outputVolumeUncertain&&(0,s.jsx)("p",{role:"status",className:h.notice,children:r("outputVolumeUnknown")})]})}function jh({state:e,sessionId:n,run:t,markSettingsEdited:r,discardSettingsDraft:o}){let i=e.settingsFor===n?e.settings:null,a=i?.conversationModel??{mode:"auto",provider:null,model:null},[l,c]=(0,R.useState)(a),[u,d]=(0,R.useState)(""),[p,f]=(0,R.useState)(!1),m=(0,R.useRef)(!1),y=(0,R.useRef)(!0);(0,R.useEffect)(()=>(y.current=!0,()=>{y.current=!1}),[]);let v=e.conversationModelsFor===n?e.conversationModels:null,b=v?.providers??[],x=b.find(C=>C.id===l.provider),z=l.mode==="auto"||!!x?.models.some(C=>C.id===l.model),F=JSON.stringify(l)!==JSON.stringify(a),Z=e.status,N=e.checkedFor===n&&!e.uncertain&&Z?.enabled===!1&&Z?.ownerSessionId===null&&Z?.voiceControlBusy===!1&&Z?.voiceSession?.fullyStopped===!0&&Z?.voiceSession?.id===null,$=!i||!N||e.busy||e.settingsConflict||e.visibilityUncertain||p,S=C=>{r?.("save-conversation-model"),c(_=>({..._,...C})),d("")},O=async()=>{if($||m.current||!F||!z)return;m.current=!0,f(!0),d("");let C=await t(n,"save-conversation-model",{revision:i.revision,values:l.mode==="auto"?{mode:"auto",provider:null,model:null}:l});m.current=!1,y.current&&(f(!1),d(C?"\u9ED8\u8BA4\u5DF2\u4FDD\u5B58\uFF0C\u4E0B\u6B21\u5F00\u542F\u8BED\u97F3\u751F\u6548\u3002":"\u4FDD\u5B58\u672A\u6210\u529F\uFF0C\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002\u8BF7\u6838\u67E5\u63D0\u793A\u540E\u518D\u64CD\u4F5C\u3002"))};return(0,s.jsxs)("section",{className:h.section,"data-conversation-model":!0,"data-settings-draft":"save-conversation-model",children:[(0,s.jsx)("h3",{children:"\u9ED8\u8BA4\u5BF9\u8BDD\u6A21\u578B"}),(0,s.jsx)("p",{className:h.hint,children:"\u63A5\u6536\u8BED\u97F3\u8BC6\u522B\u540E\u7684\u6587\u5B57\uFF0C\u7528\u4E8E\u751F\u6210\u56DE\u7B54\u3002"}),(0,s.jsx)("fieldset",{className:h.radios,disabled:$,"aria-label":"\u5BF9\u8BDD\u6A21\u578B\u9009\u62E9\u65B9\u5F0F",children:[["auto","\u81EA\u52A8"],["manual","\u624B\u52A8\u6307\u5B9A"]].map(([C,_])=>(0,s.jsxs)("label",{children:[(0,s.jsx)("input",{type:"radio",name:"conversation-mode-"+n,checked:l.mode===C,onChange:()=>S(C==="auto"?{mode:C,provider:null,model:null}:{mode:C})}),_]},C))}),l.mode==="auto"&&(0,s.jsxs)("div",{className:h.section,children:[(0,s.jsx)("p",{className:h.hint,children:"\u8DDF\u968F\u5F53\u524D\u5BF9\u8BDD\u6240\u9009\u6A21\u578B\u3002\u7A7A\u767D\u9996\u9875\u4F7F\u7528 DSH \u7684\u9ED8\u8BA4\u6A21\u578B\u3002"}),(0,s.jsx)("p",{children:"\u5F00\u542F\u8BED\u97F3\u65F6\u786E\u5B9A\u6A21\u578B\u6765\u6E90"})]}),(0,s.jsx)(Xi,{open:l.mode==="manual",children:(0,s.jsxs)("div",{className:h.section,"data-conversation-manual":!0,children:[(0,s.jsx)(Md,{label:"\u4F9B\u5E94\u5546",value:l.provider,options:b,disabled:$||!v,onChange:C=>S({provider:C,model:null})}),(0,s.jsx)(Md,{label:"\u6A21\u578B",value:l.model,options:x?.models??[],disabled:$||!x,onChange:C=>S({model:C})}),(0,s.jsx)("p",{className:h.hint,children:"\u4EC5\u5217\u51FA\u5BBF\u4E3B\u5DF2\u914D\u7F6E\u7684\u5BF9\u8BDD\u4F9B\u5E94\u5546\u4E0E\u6A21\u578B\uFF0C\u4FDD\u5B58\u65F6\u518D\u6B21\u9A8C\u8BC1\u3002"}),!v&&(0,s.jsx)("p",{role:"status",children:e.conversationModelsError?"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u4F9B\u5E94\u5546\uFF0C\u8BF7\u91CD\u8BD5\u3002":"\u6B63\u5728\u8BFB\u53D6\u4F9B\u5E94\u5546\u2026"}),v&&!b.length&&(0,s.jsx)("p",{role:"status",children:"\u6682\u65E0\u53EF\u7528\u5BF9\u8BDD\u6A21\u578B\uFF0C\u8BF7\u5148\u5728 DSH \u4E2D\u914D\u7F6E\u4F9B\u5E94\u5546\u3002"}),l.provider&&!z&&(0,s.jsx)("p",{role:"status",children:"\u8BF7\u9009\u62E9\u5F53\u524D\u53EF\u7528\u7684\u4F9B\u5E94\u5546\u4E0E\u6A21\u578B\u3002\u539F\u9009\u62E9\u4E0D\u4F1A\u81EA\u52A8\u66FF\u6362\u3002"}),(0,s.jsx)(G.Button,{variant:"outline",disabled:e.busy,onClick:()=>{t(n,"conversation-models")},children:"\u5237\u65B0\u4F9B\u5E94\u5546"})]})}),(0,s.jsxs)("div",{className:h.actions,children:[(0,s.jsx)(G.Button,{variant:"primary",disabled:$||!F||!z,onClick:()=>{O()},children:p?"\u4FDD\u5B58\u4E2D\u2026":"\u4FDD\u5B58\u9ED8\u8BA4"}),(0,s.jsx)(G.Button,{variant:"outline",disabled:$||!F,onClick:()=>{c(a),d(""),o?.("save-conversation-model")},children:"\u53D6\u6D88\u4FEE\u6539"})]}),(0,s.jsx)("p",{role:"status",className:h.hint,children:u||(F?"\u5C1A\u672A\u4FDD\u5B58":a.mode==="auto"?"\u5DF2\u4FDD\u5B58\uFF1A\u81EA\u52A8 \xB7 \u8DDF\u968F\u5F53\u524D\u5BF9\u8BDD":`\u5DF2\u4FDD\u5B58\uFF1A${a.provider} / ${a.model}`)})]})}function Md({label:e,value:n,options:t,disabled:r,onChange:o}){let[i,a]=(0,R.useState)(!1),[l,c]=(0,R.useState)(0),u=(0,R.useRef)(null),d=(0,R.useRef)(null),p=(0,R.useRef)(null),f=(0,R.useId)(),m=t.find(b=>b.id===n);(0,R.useEffect)(()=>{r&&a(!1)},[r]),(0,R.useEffect)(()=>{i&&p.current?.querySelector('[data-option-index="'+l+'"]')?.focus()},[i,l]);let y=()=>{a(!1),d.current?.focus()},v=b=>{o(b.id),y()};return(0,s.jsxs)("div",{ref:u,className:h.conversationChoice,onBlur:b=>{b.currentTarget.contains(b.relatedTarget)||a(!1)},children:[(0,s.jsx)("span",{id:f+"-label",children:e}),(0,s.jsxs)(G.Button,{ref:d,variant:"outline",className:h.deviceSelect,"aria-label":e,"aria-haspopup":"listbox","aria-expanded":i,"aria-controls":f,disabled:r||!t.length,onClick:()=>{c(Math.max(0,t.findIndex(b=>b.id===n))),a(!i)},onKeyDown:b=>{["ArrowDown","ArrowUp"].includes(b.key)&&(b.preventDefault(),c(Math.max(0,t.findIndex(x=>x.id===n))),a(!0))},children:[m?.name||n||"\u8BF7\u9009\u62E9",(0,s.jsx)("span",{"aria-hidden":"true",children:"\u2304"})]}),i&&(0,s.jsx)(G.MenuSurface,{ref:p,id:f,className:h.conversationOptions,role:"listbox","aria-labelledby":f+"-label",onKeyDown:b=>{b.key==="Escape"?(b.preventDefault(),b.stopPropagation(),y()):["ArrowDown","ArrowUp","Home","End"].includes(b.key)&&(b.preventDefault(),c(x=>b.key==="Home"?0:b.key==="End"?t.length-1:(x+(b.key==="ArrowDown"?1:-1)+t.length)%t.length))},children:t.map((b,x)=>(0,s.jsxs)("button",{type:"button",role:"option","aria-selected":n===b.id,tabIndex:x===l?0:-1,"data-option-index":x,onClick:()=>v(b),children:[b.name,n===b.id&&(0,s.jsx)("span",{"aria-hidden":"true",children:" \u2713"})]},b.id))})]})}function Wh({state:e,sessionId:n,run:t,markSettingsEdited:r,discardSettingsDraft:o,t:i}){let a=e.settingsFor===n?e.settings:null,l=a?.voicePrompt,c=l?.text??"",[u,d]=(0,R.useState)(c),[p,f]=(0,R.useState)(!1),[m,y]=(0,R.useState)(""),v=(0,R.useRef)(!1),b=(0,R.useRef)(!0),x=(0,R.useRef)(c),z=(0,R.useId)();(0,R.useEffect)(()=>(b.current=!0,()=>{b.current=!1}),[]),(0,R.useEffect)(()=>{if(x.current!==c){let P=x.current;d(D=>D===P?c:D),x.current=c}},[c]);let F=u.trim()?u:"",Z=F!==(c.trim()?c:""),N=e.status,$=e.checkedFor===n&&!e.uncertain&&N?.enabled===!1&&N?.ownerSessionId===null&&N?.voiceControlBusy===!1&&N?.voiceSession?.fullyStopped===!0&&N?.voiceSession?.id===null,S=!a||!$||e.busy||e.settingsConflict||e.visibilityUncertain||p,O=!!F&&l?.customSupported!==!0,C=u.length<=32768&&!O,_=async()=>{if(S||v.current||!Z||!C)return;v.current=!0,f(!0),y("");let P=!1;try{P=await t(n,"save-voice-prompt",{revision:a.revision,values:{text:F}})}catch{P=!1}finally{v.current=!1,b.current&&(f(!1),y(i(P?"voicePromptSaved":"voicePromptSaveFailed")))}};return(0,s.jsxs)("section",{className:`${h.section} ${h.voicePrompt}`,"data-voice-prompt":!0,"data-settings-draft":"save-voice-prompt",children:[(0,s.jsxs)("label",{htmlFor:z,children:[i("voicePromptLabel")," ",(0,s.jsx)("span",{className:h.hint,children:i("voicePromptOptional")})]}),(0,s.jsx)("textarea",{id:z,className:h.voicePromptInput,value:u,maxLength:32768,disabled:S,placeholder:i("voicePromptPlaceholder"),"aria-describedby":z+"-count "+z+"-feedback",onChange:P=>{r?.("save-voice-prompt"),d(P.target.value),y("")}}),(0,s.jsxs)("div",{id:z+"-count",className:h.voicePromptCount,children:[u.length.toLocaleString("en-US")," / 32,768"]}),(0,s.jsxs)("div",{className:h.voicePromptActions,children:[(0,s.jsxs)("div",{className:h.actions,children:[(0,s.jsx)(G.Button,{variant:"primary",disabled:S||!Z||!C,onClick:()=>{_()},children:i(p?"voicePromptSaving":"voicePromptSave")}),(0,s.jsx)(G.Button,{variant:"outline",disabled:S||u===c,onClick:()=>{d(c),y(""),o?.("save-voice-prompt")},children:i("voicePromptCancel")})]}),(0,s.jsx)("span",{className:h.hint,children:i("voicePromptStopToEdit")})]}),(0,s.jsx)("p",{id:z+"-feedback",role:"status",className:h.hint,children:m||(u.length>32768?i("voicePromptTooLong"):l?.customSupported===!1||O?i("voicePromptUnsupported"):Z?i("voicePromptUnsaved"):"")})]})}var Yy=Object.freeze({version:1,available:!1,reason:"planned"}),Dt=["audio","interaction","prompt","models","advanced","sessions","pets"],Jh={audio:"\u9009\u62E9\u9EA6\u514B\u98CE\u3001\u8BF4\u8BDD\u65B9\u5F0F\u4E0E\u63D0\u793A\u97F3\u3002",interaction:"\u8BBE\u7F6E\u6309\u952E\u3001\u56DE\u7B54\u901F\u5EA6\u4E0E\u754C\u9762\u52A8\u753B\u3002",prompt:"\u8BBE\u7F6E\u8BED\u97F3\u5BF9\u8BDD\u7684\u8868\u8FBE\u65B9\u5F0F\u3002",models:"\u9009\u62E9\u6717\u8BFB\u65B9\u5F0F\uFF0C\u6216\u7BA1\u7406\u672C\u5730\u6A21\u578B\u3002",advanced:"\u67E5\u770B\u6743\u9650\u3001\u8BF7\u6C42\u4E0E\u8FD0\u884C\u8BE6\u60C5\u3002",sessions:"\u9009\u62E9\u8BED\u97F3\u5BF9\u8BDD\u76EE\u6807\uFF0C\u67E5\u770B\u9C7C\u5E94\u4F1A\u8BDD\u548C\u5B50\u4EE3\u7406\u3002",pets:"\u684C\u5BA0\u529F\u80FD\u5C1A\u672A\u5F00\u653E\u3002"};function Gh(e){let{t:n,sessionId:t}=e,r=e.useWhaleUi(O=>O),o=e.useWhalePreferences(O=>O),i=r.settingsTab||"audio",a=r.settingsModelTab||"conversation",[l,c]=(0,R.useState)(()=>new Set([r.settingsTab||"audio"])),[u,d]=(0,R.useState)(()=>new Set([r.settingsModelTab||"conversation"])),[p,f]=(0,R.useState)(0),m=(0,R.useRef)(null),y=(0,R.useRef)(null),v=(0,R.useRef)(0),b=(0,R.useRef)(new Set),x=(0,R.useRef)(r.readRefresh),z=(0,R.useId)();(0,R.useLayoutEffect)(()=>{m.current&&(m.current.scrollTop=0)},[i,a]),(0,R.useEffect)(()=>{e.setSession?.(t)},[t]),(0,R.useEffect)(()=>()=>{v.current++,e.cancelPreview?.(),e.discardDiagnostics?.()},[]),(0,R.useEffect)(()=>{b.current.clear()},[t,i,a]),(0,R.useEffect)(()=>{i==="models"&&e.refreshModelCompute?.(t)},[t,i,a]),(0,R.useEffect)(()=>{if(r.busy||r.ttsCancelling||["pets","sessions"].includes(i))return;let O=e.readState?.();if(O?.busy||O?.ttsCancelling)return;if(x.current!==r.readRefresh){x.current=r.readRefresh;for(let D of["read-output-volume","model-installer","agent-requests"])b.current.delete(D)}let P=[...!r.settings||r.settingsFor!==t?["read-settings"]:[],...!r.status||r.checkedFor!==t||i==="advanced"?["status"]:[],...i==="audio"?["read-output-volume"]:[],...i==="models"&&a==="conversation"?["conversation-models"]:[],...t&&i==="advanced"?["agent-requests"]:[],...t&&i==="interaction"&&r.performanceFor!==t?["inspect-performance"]:[],...i==="models"&&a==="voice"&&(!r.ttsCapabilities||r.ttsCapabilitiesFor!==t)?["inspect-tts"]:[],...i==="models"?["model-installer"]:[]].find(D=>!b.current.has(D));P&&(b.current.add(P),e.run(t,P,{},!0))},[t,i,a,r.readRefresh,r.busy,r.ttsCancelling,r.settingsFor,r.checkedFor,r.outputVolumeFor,r.agentRequestsFor,r.performanceFor,r.ttsCapabilitiesFor,r.installerFor]);let F=async(O,C=!1)=>{let _=++v.current;e.cancelPreview&&!await e.cancelPreview()||(e.discardDiagnostics?.(),_===v.current&&(c(P=>new Set([...P,O])),e.setSettingsTab(O),C&&y.current?.querySelector(`[data-settings-tab="${O}"]`)?.focus({preventScroll:!0})))},Z=async O=>{let C=++v.current;e.cancelPreview&&!await e.cancelPreview()||(e.discardDiagnostics?.(),C===v.current&&(d(_=>new Set([..._,O])),e.setSettingsModelTab(O)))},N=r.settingsFor===t?r.settings:null,$=!r.uncertain&&r.checkedFor===t,S=N&&(0,s.jsx)(Fh,{settings:N,sessionId:t,busy:r.busy||r.visibilityUncertain||r.settingsConflict,run:e.run,t:n,status:r.status,statusFresh:$,verified:$&&!!r.status,tab:i,markSettingsEdited:e.markSettingsEdited,discardSettingsDraft:e.discardSettingsDraft,bindingError:r.bindingError,captureBindings:e.captureBindings},t+":"+(r.settingsKey??N.revision));return(0,s.jsxs)("div",{className:h.settings,"data-whale-settings":!0,"data-motion":o.motion,children:[(0,s.jsxs)("header",{className:h.settingsHeader,"data-settings-header":!0,children:[(0,s.jsxs)(G.Button,{className:h.backButton,"data-whale-operation":"page-home",onClick:e.showHome,"aria-label":"\u8FD4\u56DE\u8BED\u97F3",children:[(0,s.jsx)(Le,{name:"chevron",className:h.backIcon}),(0,s.jsx)("span",{children:"\u8FD4\u56DE\u8BED\u97F3"})]}),(0,s.jsxs)("div",{className:h.settingsBrand,children:[(0,s.jsx)(et,{small:!0}),(0,s.jsx)("h2",{children:n("settingsTitle")})]}),(0,s.jsx)(G.Button,{className:h.guideButton,"data-whale-operation":"page-setup",onClick:e.openSetup,"aria-label":"\u91CD\u65B0\u6253\u5F00\u914D\u7F6E\u5F15\u5BFC",title:"\u91CD\u65B0\u6253\u5F00\u914D\u7F6E\u5F15\u5BFC",children:"\u914D\u7F6E\u5F15\u5BFC"})]}),(0,s.jsxs)("div",{className:h.settingsLayout,children:[(0,s.jsx)("nav",{ref:y,className:h.settingsNav,"data-settings-nav":!0,"aria-label":n("settingsSections"),onKeyDown:O=>{let C=Dt.indexOf(O.target.dataset.settingsTab);if(C<0||!["ArrowDown","ArrowUp","ArrowLeft","ArrowRight","Home","End"].includes(O.key))return;O.preventDefault();let _=O.key==="Home"?0:O.key==="End"?Dt.length-1:(C+(["ArrowDown","ArrowRight"].includes(O.key)?1:-1)+Dt.length)%Dt.length;F(Dt[_],!0)},children:Dt.map(O=>(0,s.jsx)(G.Button,{"data-settings-tab":O,"aria-pressed":i===O,"aria-controls":z+"-body",onClick:()=>{F(O)},children:n("tab_"+O)},O))}),(0,s.jsxs)("div",{className:h.settingsPage,children:[(0,s.jsxs)("div",{className:`${h.pageHeading} ${i==="models"?h.modelHeading:""}`,"data-settings-page-heading":!0,"data-no-drag":!0,children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{id:z,children:n("tab_"+i)}),i!=="models"&&(0,s.jsx)("p",{children:Jh[i]})]}),i==="prompt"&&N&&(0,s.jsx)("span",{className:h.voicePromptMode,"data-voice-prompt-mode":!0,children:n(N.voicePrompt?.mode==="custom"&&N.voicePrompt?.customSupported===!0?"voicePromptCustom":"voicePromptAgents")}),i==="models"&&(0,s.jsx)("nav",{className:h.modelNav,"aria-label":"\u6A21\u578B\u8BBE\u7F6E\u5206\u7C7B","data-no-drag":!0,children:[["conversation","\u5BF9\u8BDD\u6A21\u578B"],["voice","\u6717\u8BFB\u65B9\u5F0F"],["download","\u6A21\u578B\u4E0B\u8F7D"],["paths","\u9AD8\u7EA7\u8DEF\u5F84"]].map(([O,C])=>(0,s.jsx)(G.Button,{"aria-pressed":a===O,onClick:()=>{Z(O)},children:C},O))})]}),(0,s.jsxs)("div",{ref:m,id:z+"-body",className:h.settingsBody,"data-settings-body":!0,"data-no-drag":!0,onChangeCapture:O=>{let C=O.target.closest("[data-settings-draft]");C&&!O.target.closest("[data-no-settings-draft]")&&e.markSettingsEdited?.(C.dataset.settingsDraft)},tabIndex:0,"aria-label":n("settingsContent"),children:[i==="sessions"?(0,s.jsxs)(s.Fragment,{children:[e.listExistingVoiceSessions&&!r.sessionManagementRoot&&(0,s.jsx)(Mi,{...e,state:r}),(0,s.jsx)(Yh,{...e,state:r})]}):i==="pets"?(0,s.jsxs)("section",{className:h.placeholder,"data-whale-pet":!0,"aria-label":n("tab_pets"),children:[(0,s.jsx)(Le,{name:"pet"}),(0,s.jsx)("h3",{children:n("tab_pets")}),(0,s.jsx)("p",{children:n("planned")})]}):(0,s.jsxs)(s.Fragment,{children:[r.error&&(0,s.jsx)("div",{role:"alert",className:h.error,children:n("operationUnavailable")}),r.settingsConflict&&(0,s.jsxs)("p",{role:"status",className:h.notice,children:["\u8BBE\u7F6E\u5DF2\u5728\u522B\u5904\u66F4\u65B0\uFF0C\u5F53\u524D\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002",(0,s.jsx)(G.Button,{variant:"outline",disabled:r.busy,onClick:()=>e.discardSettingsDraft?.(),children:"\u653E\u5F03\u8349\u7A3F\u5E76\u4F7F\u7528\u6700\u65B0\u8BBE\u7F6E"})]}),r.visibilityUncertain&&(0,s.jsx)("p",{role:"status",className:h.notice,children:n("configurationUnknown")}),!N&&(0,s.jsx)("p",{role:"status",className:h.hint,children:r.busy?"\u6B63\u5728\u8BFB\u53D6\u8BBE\u7F6E\u2026":"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u8BBE\u7F6E\u3002\u8FD4\u56DE\u7A97\u53E3\u65F6\u4F1A\u81EA\u52A8\u6838\u67E5\u3002"}),i!=="interaction"&&$&&!(i==="models"&&a==="download")&&(r.status?.enabled||r.status?.ownerSessionId)&&(0,s.jsxs)("div",{className:h.editNotice,role:"status",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("strong",{children:"\u8BED\u97F3\u6B63\u5728\u4F7F\u7528"}),(0,s.jsx)("span",{children:" \xB7 \u505C\u6B62\u540E\u53EF\u4FEE\u6539\u76F8\u5173\u8BBE\u7F6E"})]}),(0,s.jsx)(G.Button,{variant:"outline",disabled:r.busy&&(!r.interruptibleRead||r.diagnosticStopPending)||r.ttsCancelling,onClick:()=>{e.run(t,"disable")},children:"\u505C\u6B62\u8BED\u97F3\u4EE5\u7F16\u8F91"})]})]}),(0,s.jsx)("div",{hidden:!["audio","interaction","advanced"].includes(i),children:S}),(i==="audio"||l.has("audio"))&&(0,s.jsx)("div",{hidden:i!=="audio",children:(0,s.jsx)(Kh,{...e,state:r})}),(i==="interaction"||l.has("interaction"))&&(0,s.jsxs)("div",{hidden:i!=="interaction",children:[N&&(0,s.jsx)(Hh,{...e,state:r},"performance:"+t+":"+(r.settingsKey??N.revision)),(0,s.jsxs)("section",{className:h.section,children:[(0,s.jsx)("h3",{children:n("motionTitle")}),(0,s.jsx)("div",{className:h.segmented,children:["spring","firm","off"].map(O=>(0,s.jsx)(G.Button,{"aria-pressed":o.motion===O,onClick:()=>{e.setMotion(O),f(p+1)},children:n("motion_"+O)},O))}),(0,s.jsx)("div",{className:h.motionPreview,"aria-hidden":"true",children:(0,s.jsx)(et,{small:!0})},p),(0,s.jsx)("p",{className:h.hint,children:n("motionHint")}),o.error&&(0,s.jsx)("p",{role:"status",children:n("motionNotSaved")})]})]}),(i==="prompt"||l.has("prompt"))&&N&&(0,s.jsx)("div",{hidden:i!=="prompt",children:(0,s.jsx)(Wh,{...e,state:r},"prompt:"+t+":"+(r.settingsKey??N.revision))}),(i==="models"||l.has("models"))&&(0,s.jsxs)("div",{hidden:i!=="models",children:[N&&(a==="conversation"||u.has("conversation"))&&(0,s.jsx)("div",{"data-whale-tab-panel":!0,hidden:a!=="conversation",children:(0,s.jsx)(jh,{...e,state:r},"conversation:"+t+":"+(r.settingsKey??N.revision))}),(a==="voice"||u.has("voice"))&&(0,s.jsx)("div",{"data-whale-tab-panel":!0,hidden:a!=="voice",children:(0,s.jsx)(Ed,{pickPath:e.pickPath,state:r,sessionId:t,run:e.run,markSettingsEdited:e.markSettingsEdited,prepared:!0,active:i==="models"&&a==="voice"})}),(a==="download"||u.has("download"))&&(0,s.jsx)("div",{"data-whale-tab-panel":!0,hidden:a!=="download",children:(0,s.jsx)(Od,{state:r,sessionId:t,run:e.run})}),N?.modelSetup&&(0,s.jsx)(qh,{modelTab:a,markSettingsEdited:e.markSettingsEdited,pickPath:e.pickPath,senseVoiceAsrAction:e.senseVoiceAsrAction,active:i==="models",settings:N,sessionId:t,busy:r.busy||r.visibilityUncertain||r.settingsConflict,run:e.run,t:n},t+":"+(r.settingsKey??N.revision)),(a==="paths"||u.has("paths"))&&(0,s.jsx)("div",{"data-whale-tab-panel":!0,hidden:a!=="paths",children:(0,s.jsx)(Ud,{state:r,sessionId:t,run:e.run,pickPath:e.pickPath,active:i==="models"&&a==="paths"})})]}),(i==="advanced"||l.has("advanced"))&&(0,s.jsxs)("div",{hidden:i!=="advanced",children:[e.updateAction&&(0,s.jsx)(gd,{state:r,open:e.openUpdate,t:n}),(0,s.jsxs)("section",{className:h.section,"aria-label":n("projectInfoTitle"),children:[(0,s.jsx)("h3",{children:n("projectInfoTitle")}),(0,s.jsxs)("dl",{className:h.details,children:[(0,s.jsx)("dt",{children:n("projectAuthor")}),(0,s.jsx)("dd",{children:(0,s.jsx)("a",{href:Zi.url,target:"_blank",rel:"noreferrer noopener",children:Zi.name})}),(0,s.jsx)("dt",{children:n("projectRepository")}),(0,s.jsx)("dd",{children:(0,s.jsxs)("a",{href:fd,target:"_blank",rel:"noreferrer noopener",children:["Emikosama/",fo]})}),(0,s.jsx)("dt",{children:n("projectNpm")}),(0,s.jsx)("dd",{children:(0,s.jsx)("a",{href:`https://www.npmjs.com/package/${fo}`,target:"_blank",rel:"noreferrer noopener",children:fo})})]})]}),(0,s.jsx)(eg,{...e,state:r,active:i==="advanced"}),(0,s.jsx)(wd,{readOperationLog:e.readOperationLog}),(0,s.jsx)(Qh,{state:r,sessionId:t,t:n}),(0,s.jsxs)("details",{className:h.section,children:[(0,s.jsx)("summary",{children:"\u5BF9\u8BDD\u663E\u793A\u4E0E\u517C\u5BB9\u6027"}),N?.voiceSession&&(0,s.jsx)(Lh,{settings:N,state:r,sessionId:t,run:e.run,t:n},"visibility:"+t+":"+(r.settingsKey??N.revision))]})]})]})]})]})]})}var Xh=new Intl.DateTimeFormat("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"});function Yh({manageSessions:e,openManagedSession:n,renameManagedSession:t,setSessionManagement:r,state:o}){let i=o.sessionManagementRoot??null,[a,l]=(0,R.useState)(null),[c,u]=(0,R.useState)(null),[d,p]=(0,R.useState)(!1),[f,m]=(0,R.useState)(null),[y,v]=(0,R.useState)(null),b=(0,R.useRef)(null),x=(0,R.useCallback)(async(D,{append:A=!1}={})=>{if(!e)return;b.current?.abort();let E=new AbortController;b.current=E,p(!0),m(null);try{D.operation!=="list"&&(await e(D,E.signal),E.signal.aborted||m(D.operation==="restore"?"\u5DF2\u53D6\u6D88\u5F52\u6863\u3002\u53EF\u6253\u5F00\u539F\u4F1A\u8BDD\u7EE7\u7EED\u3002":"\u5DF2\u516C\u5F00\u6B64\u4F1A\u8BDD\u3002"));let I=await e(D.operation==="list"?D:{operation:"list",...i?{rootId:i}:{}},E.signal);if(E.signal.aborted||b.current!==E)return;l(H=>A&&H?{...I,items:[...new Map([...H.items,...I.items].map(L=>[L.id,L])).values()]}:I)}catch(I){E.signal.aborted||m(String(I?.message??"\u65E0\u6CD5\u8BFB\u53D6\u9C7C\u5E94\u4F1A\u8BDD").slice(0,400))}finally{b.current===E&&(b.current=null,p(!1))}},[i,e]);(0,R.useEffect)(()=>(x({operation:"list",...i?{rootId:i}:{}}),()=>{let D=b.current;b.current=null,D?.abort()}),[x,i]);let z=D=>{l(null),u(null),v(null),r({rootId:D,historyOpen:!1})},F=(D,A)=>{v(null),u({operation:D,id:A.id,rootId:A.rootId})},Z=async D=>{try{await n(D)}catch(A){m(String(A?.message??"\u65E0\u6CD5\u5728 DSH \u6253\u5F00\u4F1A\u8BDD").slice(0,400))}},N=async D=>{D.preventDefault();let A=y.title.trim();if(!(!A||d)){p(!0),m(null);try{let E=await t(y.id,A);l(I=>I&&{...I,items:I.items.map(H=>H.id===y.id?{...H,title:E}:H)}),v(null),m("\u5DF2\u4FDD\u5B58\u4F1A\u8BDD\u540D\u79F0\u3002")}catch(E){m(String(E?.message??"\u65E0\u6CD5\u91CD\u547D\u540D\u4F1A\u8BDD").slice(0,400))}finally{p(!1)}}},$=i?a?.items?.find(D=>D.id===i):null,S={restore_unavailable:"\u6062\u590D\u63A5\u53E3\u4E0D\u53EF\u7528",archive_state_unavailable:"\u65E0\u6CD5\u8BFB\u53D6\u5F52\u6863\u72B6\u6001",persistence_unavailable:"\u4F1A\u8BDD\u5B58\u50A8\u6682\u65F6\u4E0D\u53EF\u7528",policy_mismatch:"\u5F53\u524D\u4F1A\u8BDD\u6743\u9650\u4E0E\u539F\u4F1A\u8BDD\u4E0D\u540C",presentation_mismatch:"\u5F53\u524D DSH \u65E0\u6CD5\u786E\u8BA4\u4F1A\u8BDD\u7684\u9690\u85CF\u72B6\u6001",visibility_mismatch:"\u5F53\u524D\u663E\u793A\u8BBE\u7F6E\u4E0E\u539F\u4F1A\u8BDD\u4E0D\u540C"},O=D=>(0,s.jsx)("ul",{className:h.permissionList,children:D.map(A=>(0,s.jsxs)("li",{children:[(0,s.jsx)("strong",{className:h.sessionTitle,children:A.title||(A.kind==="root"?"\u672A\u547D\u540D\u4F1A\u8BDD":"\u672A\u547D\u540D\u5B50\u4EE3\u7406")+" \xB7 "+A.id.slice(-6).toUpperCase()}),(0,s.jsxs)("p",{className:h.hint,children:[A.archived?"\u5DF2\u5F52\u6863":A.visibility==="hidden"?"\u5DF2\u9690\u85CF":A.visibility==="visible"||A.visibility==="workspace"?"\u53EF\u89C1":"\u53EF\u89C1\u6027\u672A\u77E5",S[A.reason]?" \xB7 "+S[A.reason]:""]}),Number.isFinite(A.createdAt)&&(0,s.jsxs)("p",{className:h.hint,children:["\u521B\u5EFA\u4E8E ",(0,s.jsx)("time",{dateTime:new Date(A.createdAt).toISOString(),children:Xh.format(A.createdAt)})]}),(0,s.jsxs)("div",{className:h.actions,children:[A.kind==="root"&&!i&&(0,s.jsx)(G.Button,{variant:"outline",disabled:d,"data-whale-operation":"show-subagents",onClick:()=>z(A.id),children:"\u67E5\u770B\u5B50\u4EE3\u7406"}),n&&["live","available"].includes(A.status)&&(0,s.jsx)(G.Button,{variant:"outline","data-whale-operation":A.kind==="root"?"open-native-session":"open-native-subagent",onClick:()=>Z(A),children:"\u5728 DSH \u6253\u5F00"}),t&&A.kind==="root"&&["live","available","archived"].includes(A.status)&&(0,s.jsx)(G.Button,{variant:"outline",disabled:d,onClick:()=>{u(null),v({id:A.id,title:A.title??""})},children:"\u91CD\u547D\u540D"}),A.canUnhide&&(0,s.jsx)(G.Button,{variant:"outline",disabled:d,onClick:()=>F("unhide",A),children:"\u53D6\u6D88\u9690\u85CF"}),A.canRestore&&(0,s.jsx)(G.Button,{variant:"outline",disabled:d,onClick:()=>F("restore",A),children:"\u6062\u590D\u5F52\u6863"})]}),c?.id===A.id&&(0,s.jsxs)("div",{className:h.actions,children:[(0,s.jsx)("span",{children:c.operation==="unhide"?"\u786E\u8BA4\u5728 DSH \u516C\u5F00\u6B64\u4F1A\u8BDD\uFF1F":"\u786E\u8BA4\u53D6\u6D88\u6B64\u4F1A\u8BDD\u7684\u5F52\u6863\uFF1F"}),(0,s.jsx)(G.Button,{variant:"primary",disabled:d,onClick:()=>{let E=c;u(null),x(E)},children:"\u786E\u8BA4"}),(0,s.jsx)(G.Button,{variant:"outline",onClick:()=>u(null),children:"\u53D6\u6D88"})]}),y?.id===A.id&&(0,s.jsxs)("form",{className:h.sessionRename,onSubmit:N,children:[(0,s.jsx)(G.Input,{"aria-label":"\u4F1A\u8BDD\u540D\u79F0",value:y.title,maxLength:128,disabled:d,onChange:E=>v({...y,title:E.target.value})}),(0,s.jsxs)("div",{className:h.actions,children:[(0,s.jsx)(G.Button,{type:"submit",variant:"primary",disabled:d||!y.title.trim(),children:"\u4FDD\u5B58\u540D\u79F0"}),(0,s.jsx)(G.Button,{type:"button",variant:"outline",disabled:d,onClick:()=>v(null),children:"\u53D6\u6D88"})]})]})]},A.id))}),C=(a?.items??[]).filter(D=>D.id!==i),_=C.filter(D=>D.active),P=C.filter(D=>!D.active).sort((D,A)=>(A.createdAt??-1)-(D.createdAt??-1));return(0,s.jsxs)("section",{className:h.section,"data-whale-session-management":!0,children:[i&&(0,s.jsx)(G.Button,{variant:"outline",disabled:d,"data-whale-operation":"show-main-sessions",onClick:()=>z(null),children:"\u8FD4\u56DE\u4E3B\u4F1A\u8BDD"}),d&&!a&&(0,s.jsx)("p",{role:"status",children:"\u6B63\u5728\u8BFB\u53D6\u9C7C\u5E94\u4F1A\u8BDD\u2026"}),f&&(0,s.jsx)("p",{role:"status",className:h.notice,children:f}),$&&O([$]),$?.childrenAvailable&&$?.childrenIncomplete&&(0,s.jsx)("p",{role:"status",children:"\u90E8\u5206\u5B50\u4EE3\u7406\u8BB0\u5F55\u6682\u65F6\u65E0\u6CD5\u6838\u9A8C\u3002\u5F53\u524D\u663E\u793A\u5DF2\u6838\u9A8C\u7684\u4F1A\u8BDD\u3002"}),$&&!$.childrenAvailable&&(0,s.jsx)("p",{role:"status",children:"\u5F53\u524D\u65E0\u6CD5\u8BFB\u53D6\u6B64\u4F1A\u8BDD\u7684\u5B50\u4EE3\u7406\u8BB0\u5F55\u3002"}),$?.childrenAvailable&&!$.childrenIncomplete&&!C.length&&(0,s.jsx)("p",{children:"\u6B64\u4F1A\u8BDD\u8FD8\u6CA1\u6709\u5B50\u4EE3\u7406\u3002"}),_.length>0&&O(_),a&&!i&&_.length===0&&(0,s.jsx)("p",{className:h.hint,children:"\u6682\u65E0\u6D3B\u8DC3\u4F1A\u8BDD\u3002"}),(P.length>0||a?.nextCursor)&&(0,s.jsxs)("details",{className:h.section,"data-whale-session-history":!0,open:o.sessionHistoryOpen===!0,onToggle:D=>{let{open:A}=D.currentTarget;A!==!!o.sessionHistoryOpen&&r({historyOpen:A})},children:[(0,s.jsx)("summary",{"data-whale-operation":i?"subagent-history":"session-history",children:i?"\u5386\u53F2\u5B50\u4EE3\u7406":"\u5386\u53F2\u4F1A\u8BDD"}),O(P),!!a?.nextCursor&&(0,s.jsx)(G.Button,{disabled:d,onClick:()=>{x({operation:"list",cursor:a.nextCursor},{append:!0})},children:"\u52A0\u8F7D\u66F4\u591A"})]}),(0,s.jsx)(G.Button,{variant:"outline",disabled:d,onClick:()=>{x({operation:"list",...i?{rootId:i}:{}})},children:"\u5237\u65B0\u4F1A\u8BDD"}),a?.capabilities?.unhide?.supported===!1&&(0,s.jsx)("p",{className:h.hint,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u65F6\u65E0\u6CD5\u628A\u5B50\u4EE3\u7406\u52A0\u5165\u4FA7\u8FB9\u680F\u3002"}),a?.capabilities?.restore?.supported===!1&&(0,s.jsx)("p",{className:h.hint,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u65F6\u65E0\u6CD5\u901A\u8FC7\u9C7C\u5E94\u53D6\u6D88\u5F52\u6863\u3002"})]})}function Qh({state:e,sessionId:n,t}){let r=e.status,o=r?.ownerSessionId,a=!e.uncertain&&e.checkedFor===n&&typeof r?.helper?.lastError=="string"?r.helper.lastError:null,l=e.error??e.enableError;return(0,s.jsxs)("details",{className:h.section,children:[(0,s.jsx)("summary",{children:t("details")}),(0,s.jsxs)("dl",{className:h.details,children:[(0,s.jsx)("dt",{children:t("source")}),(0,s.jsx)("dd",{"data-whale-owner":!0,"data-session-id":o??"",children:o||t("none")}),(0,s.jsx)("dt",{children:t("actor")}),(0,s.jsx)("dd",{"data-whale-actor":!0,"data-session-id":n??"",children:n||t("openSession")})]}),(0,s.jsx)("p",{className:h.hint,children:t("snapshot")}),l&&(0,s.jsx)("pre",{className:h.requestDetails,children:l}),a&&(0,s.jsxs)("div",{"data-whale-helper-error":!0,children:[(0,s.jsx)("strong",{children:t("inputDiagnosticTitle")}),(0,s.jsx)("pre",{className:h.requestDetails,children:a}),(0,s.jsx)("p",{className:h.hint,children:t("inputDiagnosticHistory")})]}),(0,s.jsx)("p",{className:h.hint,children:t("consequence")}),(0,s.jsx)("p",{className:h.hint,children:r?.helper?.online?t("helperOnline"):t("helperOffline")}),r?.turnSignals?.outputStartObservation?.status==="unsupported"&&(0,s.jsx)("p",{className:h.hint,children:t("outputObservationUnavailable")})]})}function eg({state:e,sessionId:n,run:t,openAuthorization:r,active:o=!0}){let i=(0,R.useRef)(null),a=(0,R.useRef)(0);(0,R.useEffect)(()=>{i.current=null,a.current++},[o,n]),(0,R.useEffect)(()=>{if(!o||!n||e.busy||e.agentRequestsFor===n||i.current===n)return;i.current=n;let c=a.current;a.current===c&&t(n,"agent-requests")},[o,n,e.busy]);let l=e.agentRequestsFor===n?e.agentRequests:null;return(0,s.jsxs)("section",{className:h.section,"data-whale-agent-requests":!0,children:[(0,s.jsx)("h3",{children:"Agent \u64CD\u4F5C\u8BB0\u5F55"}),(0,s.jsx)(G.Button,{"data-whale-operation":"page-authorization",onClick:()=>{r?.()},children:"\u6388\u6743\u8303\u56F4\u4E0E\u64A4\u9500"}),(e.agentPermissionUncertain||e.agentRequestUncertain)&&(0,s.jsx)("p",{role:"alert",className:h.notice,children:"\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u4F1A\u81EA\u52A8\u6838\u67E5\u5BF9\u5E94\u6743\u9650\u548C\u8BF7\u6C42\u72B6\u6001\uFF0C\u4E0D\u4F1A\u91CD\u590D\u6267\u884C\u3002"}),l?.items?.length===0&&(0,s.jsx)("p",{className:h.hint,children:"\u6CA1\u6709\u5F85\u5904\u7406\u8BF7\u6C42\u3002"}),l?.items?.map(c=>(0,s.jsxs)("section",{className:h.section,"data-agent-request":c.id,children:[(0,s.jsxs)("strong",{children:[c.title," \xB7 ",c.state]}),(0,s.jsxs)("p",{className:h.hint,children:["\u53D1\u8D77\u4F1A\u8BDD\uFF1A",c.sourceSessionId]}),(0,s.jsxs)("details",{children:[(0,s.jsx)("summary",{children:"\u6838\u5BF9\u5B8C\u6574\u53D8\u66F4\u8BA1\u5212"}),(0,s.jsx)("pre",{className:h.requestDetails,children:JSON.stringify({\u5F53\u524D\u8BBE\u7F6E:c.before,\u8BF7\u6C42:c.request,...c.installPlan?{\u4E0B\u8F7D\u8BA1\u5212:c.installPlan}:{},...c.modelApplyTarget?{\u6A21\u578B\u5E94\u7528\u76EE\u6807:c.modelApplyTarget}:{}},null,2)})]}),c.error&&(0,s.jsx)("p",{role:"alert",className:h.error,children:c.error.message}),c.state==="pending"&&(0,s.jsx)(G.Button,{variant:"outline",disabled:e.busy||e.agentRequestUncertain,onClick:()=>{t(n,"decide-agent-request",{id:c.id,approve:!1,acknowledgements:[]})},children:"\u53D6\u6D88\u9884\u89C8"}),c.nextAction&&(0,s.jsx)("p",{className:h.hint,children:c.nextAction})]},c.id))]})}var jd={startConversation:"\u5F00\u59CB\u5BF9\u8BDD",endConversation:"\u7ED3\u675F\u5BF9\u8BDD",voiceTarget:"\u6295\u9012\u5230",dedicatedVoiceTarget:"\u9C7C\u5E94\u4E13\u7528\u4F1A\u8BDD",checkingVoiceTarget:"\u6B63\u5728\u6838\u5BF9\u76EE\u6807\u2026",voiceTargetChanged:"\u8BED\u97F3\u6295\u9012\u76EE\u6807\u6709\u53D8\u5316\u3002\u8BF7\u6838\u5BF9\u9996\u9875\u7684\u4F1A\u8BDD\u540E\u518D\u5F00\u59CB\u3002",chooseCurrentDshTarget:"\u4F7F\u7528\u5F53\u524D\u6253\u5F00\u4F1A\u8BDD",backToFishVoice:"\u56DE\u5230\u9C7C\u5E94",currentDshTargetError:"\u65E0\u6CD5\u786E\u8BA4\u5F53\u524D DSH \u5BF9\u8BDD\uFF0C\u8BF7\u6838\u5BF9\u540E\u91CD\u8BD5\u3002",chooseVoiceTarget:"\u9009\u62E9\u6295\u9012\u4F1A\u8BDD",searchVoiceTargets:"\u641C\u7D22\u4F1A\u8BDD\u6807\u9898\u6216 ID",searchVoiceTargetsAction:"\u641C\u7D22",existingVoiceTargetList:"\u5DF2\u6709 DSH \u4F1A\u8BDD",boundVoiceTarget:"\u5F53\u524D\u7ED1\u5B9A",voiceTargetAvailability_ready:"\u53EF\u7528",voiceTargetAvailability_busy:"\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F",voiceTargetAvailability_archived:"\u4F1A\u8BDD\u5DF2\u5F52\u6863",voiceTargetAvailability_unavailable:"\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528",voiceTargetAvailability_managed:"\u9C7C\u5E94\u7BA1\u7406\u7684\u4F1A\u8BDD\uFF0C\u65E0\u6CD5\u76F4\u63A5\u6295\u9012",voiceTargetAvailability_subagent:"\u5B50\u4EE3\u7406\u4F1A\u8BDD\uFF0C\u65E0\u6CD5\u76F4\u63A5\u6295\u9012",voiceTargetNoMatch:"\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684\u4F1A\u8BDD\u3002",voiceTargetEmptyList:"\u6682\u65E0\u53EF\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u3002",voiceTargetSynthesisNotice:"\u4F7F\u7528\u5728\u7EBF\u97F3\u8272\u65F6\uFF0C\u56DE\u7B54\u6587\u5B57\u4F1A\u4EA4\u7ED9\u5DF2\u6388\u6743\u7684\u8BED\u97F3\u5408\u6210\u670D\u52A1\u3002\u82E5\u8981\u79BB\u7EBF\u6717\u8BFB\uFF0C\u53EF\u5728\u300C\u6A21\u578B \u2192 \u6717\u8BFB\u65B9\u5F0F\u300D\u9009\u7528\u672C\u5730\u97F3\u8272\u3002",bindVoiceTarget:"\u7ED1\u5B9A\u9009\u4E2D\u4F1A\u8BDD",savingVoiceTarget:"\u6B63\u5728\u4FDD\u5B58\u2026",moreVoiceTargets:"\u52A0\u8F7D\u66F4\u591A",loadingVoiceTargets:"\u6B63\u5728\u8BFB\u53D6 DSH \u4F1A\u8BDD\u2026",voiceTargetListError:"\u65E0\u6CD5\u8BFB\u53D6 DSH \u4F1A\u8BDD\u3002",retryVoiceTargets:"\u91CD\u8BD5\u8BFB\u53D6",voiceTranscriptCaptions:"\u8BED\u97F3\u5B57\u5E55",retryTranscript:"\u91CD\u53D1",transcriptDelivery_busy:"\u4F1A\u8BDD\u5FD9\uFF0C\u5F85\u53D1\u5230",transcriptDelivery_ready:"\u5F85\u91CD\u53D1\u5230",transcriptDelivery_sending:"\u6B63\u5728\u53D1\u5F80",transcriptDelivery_queued:"\u7B49\u5F85\u4F1A\u8BDD\u63A5\u6536",transcriptDelivery_delivered:"\u5DF2\u53D1\u5230",transcriptDelivery_uncertain:"\u6295\u9012\u5F85\u786E\u8BA4",transcriptDelivery_failed:"\u672A\u53D1\u5230",transcriptDelivery_discarded:"\u5F85\u53D1\u5DF2\u53D6\u6D88",endDiscardsRetries:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u6E05\u7A7A\u5F85\u53D1\u8F6C\u5199\u3002",modeSwitching:"\u6B63\u5728\u5207\u6362\u8BF4\u8BDD\u65B9\u5F0F\u2026",modeSaving:"\u6B63\u5728\u4FDD\u5B58\u8BF4\u8BDD\u65B9\u5F0F\u2026",modeSwitchUnconfirmed:"\u8BF4\u8BDD\u65B9\u5F0F\u66F4\u6539\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u6838\u67E5\u3002",modeSwitchFailed:"\u672A\u80FD\u786E\u8BA4\u66F4\u6539\uFF0C\u8BF7\u67E5\u770B\u5F53\u524D\u65B9\u5F0F\u540E\u518D\u8BD5\u3002",updateTitle:"\u9C7C\u5E94\u66F4\u65B0",updateOfferTitle:"\u9C7C\u5E94\u6709\u65B0\u7248\u672C",updateCurrentVersion:"\u5F53\u524D",updateNewVersion:"\u65B0\u7248",updateChannel_stable:"\u6B63\u5F0F\u7248",updateChannel_preview:"\u9884\u89C8\u7248",updateCheck:"\u68C0\u67E5\u66F4\u65B0",updateDetails:"\u67E5\u770B\u66F4\u65B0",updateLater:"\u7A0D\u540E",updateInstall:"\u4E00\u952E\u66F4\u65B0",updateRelease:"\u53D1\u5E03\u8BF4\u660E",updateFeedback:"\u53CD\u9988\u95EE\u9898",update_idle:"\u6B63\u5728\u8BFB\u53D6\u66F4\u65B0\u72B6\u6001\u2026",update_checking:"\u6B63\u5728\u68C0\u67E5\u66F4\u65B0\u2026",update_current:"\u5DF2\u662F\u6700\u65B0\u7248\u672C\u3002",update_available:"\u53EF\u4EE5\u66F4\u65B0\u3002",update_incompatible:"\u65B0\u7248\u4E0E\u5F53\u524D DSH \u73AF\u5883\u4E0D\u517C\u5BB9\u3002",update_installing:"\u6B63\u5728\u66F4\u65B0\uFF0C\u5BBF\u4E3B\u53EF\u80FD\u4F1A\u91CD\u65B0\u52A0\u8F7D\u9C7C\u5E94\u2026","update_restart-required":"\u66F4\u65B0\u5DF2\u5B89\u88C5\uFF0C\u91CD\u542F DSH \u540E\u751F\u6548\u3002","update_enable-required":"\u66F4\u65B0\u5DF2\u5B89\u88C5\uFF0C\u8BF7\u5728 DSH \u63D2\u4EF6\u7BA1\u7406\u4E2D\u542F\u7528\u9C7C\u5E94\u3002",update_installed:"\u66F4\u65B0\u5DF2\u5B8C\u6210\u3002",update_error:"\u66F4\u65B0\u51FA\u9519\uFF0C\u53EF\u68C0\u67E5\u66F4\u65B0\u540E\u91CD\u8BD5\u3002",update_unsupported:"\u5F53\u524D\u73AF\u5883\u65E0\u6CD5\u81EA\u52A8\u66F4\u65B0\uFF0C\u8BF7\u67E5\u770B\u5B98\u65B9\u53D1\u5E03\u8BF4\u660E\u3002",updateConnection:"\u6682\u65F6\u65E0\u6CD5\u786E\u8BA4\u66F4\u65B0\u72B6\u6001\uFF0C\u8BF7\u5728\u5BBF\u4E3B\u5C31\u7EEA\u540E\u91CD\u65B0\u68C0\u67E5\u3002",audioDevices:"\u97F3\u9891\u8BBE\u5907",audioSystemDefault:"\u7CFB\u7EDF\u9ED8\u8BA4",audioInput:"\u97F3\u9891\u8F93\u5165",audioOutput:"\u97F3\u9891\u8F93\u51FA",inputDeviceMissing:"\u9EA6\u514B\u98CE\u672A\u8FDE\u63A5\uFF0C\u5DF2\u4FDD\u7559\u9009\u62E9",outputDeviceMissing:"\u8F93\u51FA\u672A\u8FDE\u63A5\uFF0C\u4E0D\u4F1A\u5207\u5230\u5176\u4ED6\u8BBE\u5907",deviceDisconnected:"\u672A\u8FDE\u63A5",inputDeviceStopFirst:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5207\u6362\u8F93\u5165\u3002\u8F93\u51FA\u5728\u4E0B\u4E00\u6BB5\u64AD\u653E\u751F\u6548\u3002",outputDeviceUnsupported:"\u6B64\u73AF\u5883\u6682\u4E0D\u652F\u6301\u9009\u62E9\u6717\u8BFB\u8F93\u51FA\u8BBE\u5907\u3002",deviceListRetry:"\u8BBE\u5907\u5217\u8868\u6682\u4E0D\u53EF\u7528\uFF0C\u6253\u5F00\u4E0B\u62C9\u83DC\u5355\u53EF\u91CD\u8BD5\u3002",voiceHelperCleanupHint:"\u6B63\u5728\u786E\u8BA4\u9EA6\u514B\u98CE\u5DF2\u91CA\u653E\uFF0C\u786E\u8BA4\u524D\u4E0D\u4F1A\u5F00\u542F\u65B0\u7684\u5F55\u97F3\u3002",voiceHelperRestartHint:"\u9EA6\u514B\u98CE\u670D\u52A1\u9000\u51FA\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u91CD\u542F DSH \u540E\u518D\u70B9\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u3002",inputError_device:"\u9EA6\u514B\u98CE\u4E0D\u53EF\u7528",inputError_recognition:"\u8BED\u97F3\u8BC6\u522B\u5931\u8D25","inputError_no-speech":"\u6CA1\u542C\u6E05\uFF0C\u8BF7\u518D\u8BF4\u4E00\u6B21",inputHelp_device:"\u8BF7\u68C0\u67E5\u9EA6\u514B\u98CE\u8FDE\u63A5\u4E0E\u6743\u9650\u3002\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5728\u8BBE\u7F6E\u4E2D\u9009\u8BBE\u5907\u3002\u8BE6\u60C5\u89C1\u300C\u9AD8\u7EA7\u300D\u3002",inputDiagnosticTitle:"\u6700\u8FD1\u4E00\u6B21\u97F3\u9891\u9519\u8BEF",inputDiagnosticHistory:"\u8FD9\u662F\u6700\u8FD1\u4E00\u6B21\u8BB0\u5F55\uFF0C\u53EF\u80FD\u6765\u81EA\u4E4B\u524D\u7684\u5C1D\u8BD5\uFF1B\u4E0D\u4EE3\u8868\u5F53\u524D\u8BBE\u5907\u72B6\u6001\u3002",inputHelp_recognition:"\u8BF7\u91CD\u8BD5\u3002\u4ECD\u5931\u8D25\u65F6\uFF0C\u7ED3\u675F\u5BF9\u8BDD\u540E\u5728\u8BBE\u7F6E\u4E2D\u68C0\u67E5\u8BC6\u522B\u6A21\u578B\u3002","inputHelp_no-speech":"\u8BF7\u9760\u8FD1\u9EA6\u514B\u98CE\u91CD\u8BD5\uFF0C\u5E76\u68C0\u67E5\u662F\u5426\u9759\u97F3\u3002",speechFailed:"\u6717\u8BFB\u5931\u8D25",speechInterrupted:"\u6717\u8BFB\u5DF2\u4E2D\u65AD",wakeFallbackHint:"\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\u3002\u76EE\u524D\u6309\u8F6C\u5199\u5339\u914D\u3002\u5207\u6362\u6A21\u5F0F\u540E\u518D\u9009\u300C\u5524\u9192\u8BCD\u300D\u53EF\u91CD\u8BD5\u58F0\u97F3\u5339\u914D\u3002",wakeMode:"\u5524\u9192\u8BCD",switchToWake:"\u70B9\u6309\u5207\u5230\u5524\u9192\u8BCD\u6A21\u5F0F\uFF0C\u9EA6\u514B\u98CE\u5C06\u7B49\u5F85\u8BBE\u5B9A\u79F0\u547C",wakeDisabled:"\u5524\u9192\u76D1\u542C\u672A\u5F00\u542F",wakeStarting:"\u6B63\u5728\u542F\u52A8\u5524\u9192\u76D1\u542C\u2026",wakeWaiting:"\u7B49\u5F85\u5524\u9192\u8BCD",wakeListening:"\u6B63\u5728\u542C\u4E0B\u4E00\u53E5",wakePaused:"\u5524\u9192\u76D1\u542C\u5DF2\u6682\u505C",wakeError:"\u5524\u9192\u76D1\u542C\u4E0D\u53EF\u7528\uFF0C\u8BF7\u67E5\u770B\u8BBE\u7F6E",wakeHint:"\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\uFF0C\u518D\u8BF4\u6307\u4EE4\u3002\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u76D1\u542C\u3002",wakeMethod:"\u77ED\u53E5\u7ED3\u675F\u540E\u5728\u672C\u673A\u6BD4\u8F83\u79F0\u547C\u7684\u58F0\u97F3\u548C\u8F6C\u5199\u3002",wakeAliases:"\u5524\u9192\u79F0\u547C",wakeAliasesHint:"\u6700\u591A8\u4E2A\uFF0C\u9017\u53F7\u5206\u9694\uFF1B\u4E2D\u6587\u652F\u6301\u53E5\u9996\u8FD1\u97F3\uFF0C\u5EFA\u8BAE\u7528\u72EC\u7279\u76843\u5B57\u4EE5\u4E0A\u79F0\u547C\u3002",wakeTimeout:"\u5524\u9192\u540E\u7B49\u5F85\uFF08\u79D2\uFF09",wakeSettings:"\u5524\u9192\u8BCD\u8BBE\u7F6E",wakeStopToEdit:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u79F0\u547C\u548C\u7B49\u5F85\u65F6\u95F4\u3002",wakeInvalid:"\u8BF7\u586B1\u20138\u4E2A\u6709\u6548\u79F0\u547C\uFF0C\u7B49\u5F85\u65F6\u95F4\u4E3A3\u201330\u79D2\u3002",switchToPtt:"\u70B9\u6309\u5207\u56DE\u6309\u4F4F\u8BF4\u8BDD",switchToAlways:"\u70B9\u6309\u5207\u5230\u81EA\u7531\u9EA6\uFF0C\u9EA6\u514B\u98CE\u5C06\u6301\u7EED\u8046\u542C",quickSpeedStop:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5207\u6362\u901F\u5EA6",performanceReadFirst:"\u5148\u68C0\u67E5\u5F53\u524D\u6A21\u578B\u652F\u6301\u54EA\u4E9B\u901F\u5EA6\u3002",performanceUnavailable:"\u63D0\u4F9B\u5546\u5DF2\u660E\u786E\u62D2\u7EDD\u7070\u8272\u6863\u4F4D\u7684\u601D\u8003\u53C2\u6570\uFF1B\u5176\u4ED6\u6863\u4F4D\u4ECD\u53EF\u9009\u62E9\u3002",performanceProbeCost:"\u52A0\u8F7D\u65F6\u7528\u6700\u591A 3 \u4E2A\u56FA\u5B9A\u77ED\u8BF7\u6C42\u68C0\u6D4B\u6863\u4F4D\uFF0C\u6309\u6A21\u578B\u8BA1\u8D39\u3002",performanceProbeScope:"\u53EA\u6709\u63D0\u4F9B\u53EF\u68C0\u6D4B\u63A5\u53E3\u7684\u6A21\u578B\u8DEF\u7EBF\u4F1A\u53D1\u9001\u77ED\u8BF7\u6C42\uFF0C\u539F\u751F\u652F\u6301\u7684\u6863\u4F4D\u53EF\u76F4\u63A5\u67E5\u770B\u3002",performanceProbeUnknown:"\u90E8\u5206\u6863\u4F4D\u6682\u672A\u786E\u8BA4\u3002\u53EF\u68C0\u67E5\u7F51\u7EDC\u6216\u767B\u5F55\u540E\u91CD\u65B0\u68C0\u6D4B\u3002",performanceProbeAccepted:"\u6863\u4F4D\u8BF7\u6C42\u68C0\u6D4B\u901A\u8FC7\u3002",performanceProbePending:"\u6B63\u5728\u68C0\u67E5\u5F53\u524D\u6A21\u578B\u7684\u6863\u4F4D\u2026",holdToSpeak:"\u8BF4\u8BDD\u65F6\u6309\u4F4F",alwaysWarning:"\u81EA\u7531\u9EA6\u4F1A\u6301\u7EED\u542C\u53D6\u8BED\u97F3\u3002\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u76D1\u542C\u3002",bindingMissing:"\u672A\u7ED1\u5B9A\u8BF4\u8BDD\u6309\u952E\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u4E2D\u7ED1\u5B9A\uFF0C\u6216\u5207\u6362\u6301\u7EED\u8046\u542C\u3002",noSession:"\u8FD8\u6CA1\u6709\u6253\u5F00\u5BF9\u8BDD",otherWindow:"\u9EA6\u514B\u98CE\uFF1A\u53E6\u4E00\u4E2A\u7A97\u53E3",readingStatus:"\u6B63\u5728\u8BFB\u53D6\uFF0C\u4E0D\u4F1A\u542F\u52A8\u9EA6\u514B\u98CE\u6216\u6A21\u578B\u3002",statusRetry:"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u72B6\u6001\u3002\u8FD4\u56DE\u7A97\u53E3\u65F6\u4F1A\u81EA\u52A8\u6838\u67E5\u3002",retryStatus:"\u91CD\u65B0\u8BFB\u53D6\u72B6\u6001",collapseHint:"\u6536\u8D77\u540E\u4F1A\u7EE7\u7EED\u5BF9\u8BDD",stopConsequence:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u91CA\u653E\u9EA6\u514B\u98CE\u5E76\u505C\u6B62\u672C\u6B21\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u3002",transferTitle:"\u63A5\u7BA1\u53E6\u4E00\u4E2A\u7A97\u53E3\u7684\u9EA6\u514B\u98CE\uFF1F",transferWarning:"\u8FD9\u4F1A\u4E2D\u65AD\u53E6\u4E00\u4E2A\u7A97\u53E3\u7684\u8BED\u97F3\uFF0C\u5E76\u53EF\u80FD\u7ED3\u675F\u5B83\u7684\u540E\u53F0\u4EFB\u52A1\u3002",cancel:"\u53D6\u6D88",confirmTransfer:"\u786E\u8BA4\u63A5\u7BA1",bindingStopRequired:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u9F20\u6807\u6216\u952E\u76D8\u6309\u952E\u3002",bindingFinishing:"\u8BED\u97F3\u6B63\u5728\u505C\u6B62\uFF0C\u8BF7\u7A0D\u5019\u518D\u4FEE\u6539\u6309\u952E\u3002",headphonesRequired:"\u5148\u52FE\u9009\u201C\u6211\u5DF2\u4F7F\u7528\u8033\u673A\u201D\uFF0C\u624D\u80FD\u5F00\u542F\u81EA\u52A8\u6253\u65AD\u3002",deviceManualIndex:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u5E8F\u53F7",deviceManualName:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u540D\u79F0",deviceIndexInvalid:"\u8BBE\u5907\u5E8F\u53F7\u9700\u8981\u662F\u975E\u8D1F\u6574\u6570\u3002",deviceDefault:"\u4F7F\u7528\u7CFB\u7EDF\u9ED8\u8BA4\u9EA6\u514B\u98CE",deviceManual:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u540D\u79F0\u6216\u5E8F\u53F7",deviceSaved:"\u5DF2\u4FDD\u5B58\u7684\u8BBE\u5907",deviceEmpty:"\u97F3\u9891\u670D\u52A1\u6CA1\u6709\u627E\u5230\u9EA6\u514B\u98CE\u3002\u8BF7\u8FDE\u63A5\u8BBE\u5907\u5E76\u68C0\u67E5\u7CFB\u7EDF\u58F0\u97F3\u8BBE\u7F6E\u3002",deviceUnknown:"\u5F00\u59CB\u5BF9\u8BDD\u540E\u4F1A\u5217\u51FA\u68C0\u6D4B\u5230\u7684\u8BBE\u5907\u3002\u73B0\u5728\u53EF\u4F7F\u7528\u7CFB\u7EDF\u9ED8\u8BA4\uFF0C\u6216\u5728\u9AD8\u7EA7\u9009\u9879\u624B\u52A8\u586B\u5199\u3002",ttsBackend:"\u8BED\u97F3\u5408\u6210\u540E\u7AEF",ttsBackendHint:"\u58F0\u97F3\u7531\u5DF2\u5B89\u88C5\u7684 TTS \u540E\u7AEF\u63D0\u4F9B\uFF0C\u9700\u5728\u8BE5\u540E\u7AEF\u5B8C\u6210\u914D\u7F6E\u3002\u72EC\u7ACB\u97F3\u91CF\u4EC5\u5728\u9A8C\u8BC1\u652F\u6301\u65F6\u663E\u793A\u3002",ttsBackendPending:"\u66F4\u591A\u540E\u7AEF\u9009\u62E9\u6B63\u5728\u9002\u914D\uFF0C\u5F53\u524D\u4E0D\u4F1A\u81EA\u52A8\u63A5\u5165\u4E91\u670D\u52A1\u3002",voiceClone:"\u58F0\u97F3\u514B\u9686",voiceCloneAvailable:"Qwen \u652F\u6301\u672C\u5730\u53C2\u8003\u97F3\u8272\uFF0C\u53EF\u5728\u6717\u8BFB\u65B9\u5F0F\u7684\u97F3\u8272\u8BBE\u7F6E\u4E2D\u9009\u62E9 WAV\u3002",voiceClonePrivacy:"\u4EC5\u8BFB\u53D6\u4F60\u9009\u62E9\u4E14\u6709\u6743\u4F7F\u7528\u7684\u58F0\u97F3\u6837\u672C\uFF0C\u4E0D\u4E0A\u4F20\u3002",inputActive:"\u6B63\u5728\u63A5\u6536\u8BED\u97F3",modeUnknown:"\u542C\u53D6\u65B9\u5F0F\u672A\u77E5",voiceInputUnavailable:"\u5F55\u97F3\u6682\u4E0D\u53EF\u7528",voiceInputRecoveryHint:"\u8BED\u97F3\u670D\u52A1\u5DF2\u4E2D\u65AD\u3002\u8BF7\u7ED3\u675F\u5BF9\u8BDD\u540E\u91CD\u65B0\u5F00\u59CB\u3002",searchHistory:"\u641C\u7D22\u4F1A\u8BDD",searchScope:"\u641C\u7D22\u5DF2\u8F7D\u5165\u7684\u4F1A\u8BDD",noMatches:"\u6CA1\u6709\u5339\u914D\u7684\u4F1A\u8BDD",differentOwner:"\u9EA6\u514B\u98CE\u5728\u53E6\u4E00\u4E2A\u7A97\u53E3\u4F7F\u7528\u3002\u9700\u8981\u65F6\u53EF\u660E\u786E\u63A5\u7BA1\u3002",details:"\u8BCA\u65AD\u8BE6\u60C5",noReply:"\u8FD8\u6CA1\u6709\u5BF9\u8BDD",newChatCreated:"\u5DF2\u65B0\u5EFA\u4F1A\u8BDD",newChatActive:"\u65B0\u5EFA\u8BED\u97F3\u4F1A\u8BDD\u3002\u5F53\u524D\u4F1A\u8BDD\u7684\u540E\u53F0\u4EFB\u52A1\u4F1A\u505C\u6B62\uFF0C\u8BB0\u5F55\u4F1A\u4FDD\u7559\u3002",newChatOtherOwner:"\u8BF7\u5728\u5F53\u524D\u8BED\u97F3\u4F1A\u8BDD\u6216\u5F00\u542F\u9EA6\u514B\u98CE\u7684\u7A97\u53E3\u4E2D\u65B0\u5EFA\u3002",recentConversation:"\u5BF9\u8BDD",recentTenTurns:"\u6700\u8FD1 10 \u8F6E",allRecords:"\u5168\u90E8\u8BB0\u5F55",showAllRecords:"\u5C55\u5F00\u5168\u90E8",collapseToTen:"\u6536\u8D77\u81F3 10 \u8F6E",collapseConversation:"\u6536\u8D77\u5BF9\u8BDD",currentVoiceRecords:"\u5F53\u524D\u8BED\u97F3\u804A\u5929",historyTruncated:"\u5DF2\u5207\u6362\u663E\u793A\u533A\u95F4\uFF0C\u539F\u8BB0\u5F55\u4ECD\u4FDD\u7559",viewConversation:"\u67E5\u770B\u8BED\u97F3\u8BB0\u5F55",loadEarlier:"\u52A0\u8F7D\u66F4\u65E9\u8BB0\u5F55",readingHistory:"\u6B63\u5728\u8BFB\u53D6\u8BB0\u5F55\u2026",retryHistory:"\u8BFB\u53D6\u8BB0\u5F55\u5931\u8D25\uFF0C\u70B9\u51FB\u91CD\u8BD5",noConversation:"\u8FD8\u6CA1\u6709\u5BF9\u8BDD",newMessages:"\u6761\u65B0\u6D88\u606F",conversationMessages:"\u8BED\u97F3\u5BF9\u8BDD\u8BB0\u5F55",assistantName:"\u52A9\u624B\u79F0\u547C",renameAssistant:"\u70B9\u51FB\u6539\u540D\uFF0CEnter \u4FDD\u5B58\uFF0CEsc \u53D6\u6D88",compact_off:"\u672A\u5F00\u542F",compact_standby:"\u5F85\u673A",compact_listening:"\u8046\u542C\u4E2D",compact_pending:"\u5904\u7406\u4E2D",compact_unknown:"\u5F85\u68C0\u67E5",you:"\u4F60",assistant:"\u52A9\u624B",close:"\u5173\u95ED\u9762\u677F",keyboardBinding:"\u952E\u76D8\u6309\u4F4F\u8BF4\u8BDD",bindingOff:"\u672A\u7ED1\u5B9A",saveBindings:"\u4FDD\u5B58\u6309\u952E",discardBindings:"\u53D6\u6D88\u4FEE\u6539",bindingCapture:"\u6309\u4E0B\u8981\u7ED1\u5B9A\u7684\u952E\uFF08Esc \u53D6\u6D88\uFF09",clearBinding:"\u6E05\u9664\u7ED1\u5B9A",bindingUnsupported:"\u4E0D\u652F\u6301\u8BE5\u6309\u952E\u6216\u7CFB\u7EDF\u7EC4\u5408\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u3002",bindingGlobalHint:"Windows \u5168\u5C40\u5FEB\u6377\u952E\u3002\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5F55\u5165\uFF0C\u4FDD\u5B58\u540E\u4E0B\u6B21\u5F00\u59CB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002\u6309\u952E\u4E0D\u4F1A\u88AB\u62E6\u622A\uFF0C\u53EF\u80FD\u540C\u65F6\u89E6\u53D1\u5176\u4ED6\u5E94\u7528\u7684\u5FEB\u6377\u64CD\u4F5C\u3002",bindingUnavailable:"\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301\u5168\u5C40\u6309\u952E\u7ED1\u5B9A\u3002",bindingPrintableWarning:"\u5355\u72EC\u4F7F\u7528\u6587\u5B57\u3001\u6570\u5B57\u6216\u7A7A\u683C\u952E\u4F1A\u5728\u5176\u4ED6\u5E94\u7528\u8F93\u5165\u65F6\u89E6\u53D1\u6309\u952E\u8BF4\u8BDD\u3002",performanceTitle:"\u56DE\u7B54\u901F\u5EA6",performanceHint:"\u4E0B\u6B21\u5F00\u59CB\u9C7C\u5E94\u72EC\u7ACB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002\u7ED1\u5B9A\u539F\u4F1A\u8BDD\u65F6\uFF0C\u5728\u8BE5 DSH \u5BF9\u8BDD\u7684\u6A21\u578B\u83DC\u5355\u91CC\u8C03\u6574\u601D\u8003\u6863\u4F4D\u3002",inspectPerformance:"\u68C0\u67E5\u53EF\u7528\u901F\u5EA6",performance_fast:"\u5FEB",performanceNoThinking:"\u65E0\u601D\u8003",performanceRecommended:"[\u63A8\u8350]",performanceFastHint:"\u5FEB\u6863\u4F1A\u660E\u786E\u8BF7\u6C42\u5173\u95ED\u601D\u8003\u3002",performanceFastUnavailable:"\u5F53\u524D\u6A21\u578B\u8DEF\u7EBF\u65E0\u6CD5\u786E\u8BA4\u5173\u95ED\u601D\u8003\u3002\u53EF\u9009\u300C\u8DDF\u968F\u6A21\u578B\u300D\uFF0C\u6216\u5728\u6A21\u578B\u8BBE\u7F6E\u4E2D\u66F4\u6362\u652F\u6301\u65E0\u601D\u8003\u7684\u5BF9\u8BDD\u6A21\u578B\u3002",performanceHostUnavailable:"\u5F53\u524D\u6A21\u578B\u8DEF\u7EBF\u672A\u63D0\u4F9B\u90E8\u5206\u601D\u8003\u6863\u4F4D\u3002",performance_balanced:"\u6807\u51C6",performance_high:"\u4ED4\u7EC6",performance_compatibility:"\u8DDF\u968F\u6A21\u578B",performanceStopRequired:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u56DE\u7B54\u901F\u5EA6\u3002\u5F53\u524D\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u4F1A\u505C\u6B62\u3002",savePerformance:"\u4FDD\u5B58\u56DE\u7B54\u901F\u5EA6",outputVolume:"\u52A9\u624B\u8BED\u97F3\u97F3\u91CF",outputVolumeHint:"\u4EC5\u8C03\u6574\u5DF2\u5B89\u88C5\u7684 Windows dsh-speak \u540E\u7AEF\uFF0C\u4E0D\u4EE3\u8868\u5F53\u524D\u8BED\u97F3\u8DEF\u7531\u6B63\u5728\u4F7F\u7528\u5B83\uFF1B\u4E0D\u5F71\u54CD DSTuber\u3001\u7CFB\u7EDF\u603B\u97F3\u91CF\u6216\u63D0\u793A\u97F3\u3002\u4E0B\u4E00\u6BB5\u8F93\u51FA\u751F\u6548\u3002",readOutputVolume:"\u8BFB\u53D6\u8BED\u97F3\u97F3\u91CF",saveOutputVolume:"\u4FDD\u5B58\u8BED\u97F3\u97F3\u91CF",outputVolumeUnavailable:"\u5F53\u524D\u8BED\u97F3\u540E\u7AEF\u4E0D\u652F\u6301\u72EC\u7ACB\u97F3\u91CF\u8C03\u8282\u3002",outputVolumeUnknown:"\u97F3\u91CF\u4FDD\u5B58\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u4F1A\u81EA\u52A8\u6838\u67E5\uFF0C\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002",settingsTitle:"\u9C7C\u5E94\u8BBE\u7F6E",settingsSections:"\u8BBE\u7F6E\u5206\u7C7B",tab_audio:"\u97F3\u9891",tab_interaction:"\u4EA4\u4E92",tab_prompt:"\u63D0\u793A\u8BCD",voicePromptLabel:"\u81EA\u5B9A\u4E49\u63D0\u793A\u8BCD",voicePromptOptional:"\uFF08\u53EF\u9009\uFF09",voicePromptAgents:"\u8DDF\u968F AGENTS",voicePromptCustom:"\u5DF2\u9644\u52A0\u81EA\u5B9A\u4E49",voicePromptPlaceholder:`\u4F8B\u5982\uFF1A\u7528\u4E2D\u6587\u56DE\u590D\uFF0C\u5148\u8BF4\u7ED3\u8BBA\uFF0C\u8BED\u6C14\u81EA\u7136\u3002

\u5185\u5BB9\u4F1A\u9644\u52A0\u5728 AGENTS \u540E\u3002\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u8BBE\u7F6E\u3002`,voicePromptStopToEdit:"\u505C\u6B62\u8BED\u97F3\u540E\u53EF\u7F16\u8F91",voicePromptUnsupported:"\u5F53\u524D DSH \u6682\u4E0D\u652F\u6301\u81EA\u5B9A\u4E49\u63D0\u793A\u8BCD\u3002",voicePromptTooLong:"\u63D0\u793A\u8BCD\u4E0D\u80FD\u8D85\u8FC7 32,768 \u4E2A\u5B57\u7B26\u3002",voicePromptSaving:"\u4FDD\u5B58\u4E2D\u2026",voicePromptCancel:"\u53D6\u6D88\u4FEE\u6539",voicePromptSave:"\u4FDD\u5B58",voicePromptSaved:"\u5DF2\u4FDD\u5B58\uFF0C\u4E0B\u6B21\u5F00\u542F\u8BED\u97F3\u65F6\u751F\u6548\u3002",voicePromptSaveFailed:"\u4FDD\u5B58\u672A\u6210\u529F\uFF0C\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002",voicePromptUnsaved:"\u5C1A\u672A\u4FDD\u5B58",tab_models:"\u6A21\u578B",tab_advanced:"\u9AD8\u7EA7",projectInfoTitle:"\u5173\u4E8E\u9C7C\u5E94",projectAuthor:"\u4F5C\u8005",projectRepository:"\u5B98\u65B9\u4ED3\u5E93",projectNpm:"npm \u53D1\u5E03\u9875",tab_sessions:"\u4F1A\u8BDD\u7BA1\u7406",settingsContent:"\u8BBE\u7F6E\u5185\u5BB9",voiceCleanupPending:"\u6B63\u5728\u91CA\u653E\u65E7\u97F3\u9891\u670D\u52A1",voiceCleanupHint:"\u7B49\u5F85\u65E7\u4F1A\u8BDD\u548C\u5F55\u97F3\u9000\u51FA\uFF0C\u5B8C\u6210\u540E\u4F1A\u81EA\u52A8\u66F4\u65B0\u3002",voiceRestartPending:"\u9700\u8981\u91CD\u542F DSH",voiceRestartHint:"\u65E7\u7248\u97F3\u9891\u670D\u52A1\u7684\u9000\u51FA\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u91CD\u542F DSH \u540E\u518D\u70B9\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u3002\u5DF2\u4FDD\u5B58\u7684\u6388\u6743\u4E0D\u53D8\u3002",voiceRecoveryPending:"\u65E7\u8BED\u97F3\u4F1A\u8BDD\u5C1A\u672A\u9000\u51FA",voiceRecoveryCheck:"\u6838\u67E5\u5E76\u505C\u6B62",voiceRecoveryHint:"\u65E7\u5B9E\u4F8B\u4ECD\u5728\u9000\u51FA\uFF0C\u8BF7\u5148\u6838\u67E5\u505C\u6B62\u3002\u82E5\u4E00\u76F4\u672A\u9000\u51FA\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F DSH \u540E\u518D\u70B9\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u3002",operationUnavailable:"\u64CD\u4F5C\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\uFF1B\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002\u8BE6\u60C5\u89C1\u9AD8\u7EA7\u8BBE\u7F6E\u3002",enableFailed:"\u65E0\u6CD5\u5F00\u59CB\u5BF9\u8BDD\u3002\u8BF7\u5728\u8BBE\u7F6E\u7684\u300C\u9AD8\u7EA7\u300D\u67E5\u770B\u539F\u56E0\u540E\u91CD\u8BD5\u3002",tab_pets:"\u684C\u5BA0",planned:"\u8BA1\u5212\u5F00\u53D1\u4E2D",configurationUnknown:"\u914D\u7F6E\u4FDD\u5B58\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\uFF1B\u6838\u5B9E\u524D\u4E0D\u80FD\u7EE7\u7EED\u4FEE\u6539\u3002",motionTitle:"\u754C\u9762\u52A8\u753B",motion_spring:"Q \u5F39",motion_firm:"\u786C\u6717",motion_off:"\u5173\u95ED\u52A8\u753B",motionHint:"\u7ACB\u5373\u9884\u89C8\u5E76\u4FDD\u5B58\uFF1B\u64CD\u4F5C\u4E0D\u7B49\u5F85\u52A8\u753B\u3002\u7CFB\u7EDF\u51CF\u5C11\u52A8\u6001\u6548\u679C\u4F18\u5148\u3002",motionNotSaved:"\u672C\u6B21\u9884\u89C8\u5DF2\u5E94\u7528\uFF0C\u4F46\u6B64\u6D4F\u89C8\u5668\u65E0\u6CD5\u4FDD\u5B58\u52A8\u753B\u504F\u597D\u3002",modeControlPending:"\u8BED\u97F3\u63A7\u5236\u5C1A\u672A\u5B8C\u6210\u6216\u72B6\u6001\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\u3002",capabilityTitle:"\u5BF9\u8BDD\u5728\u4FA7\u680F\u4E2D\u7684\u663E\u793A",supported:"\u53EF\u7528",unsupported:"\u4E0D\u53EF\u7528\u6216\u5C1A\u672A\u786E\u8BA4",hiddenMode:"\u4E0D\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD",workspaceMode:"\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD",taskCapability:"\u540E\u53F0\u4EFB\u52A1\u652F\u6301",configuredMode:"\u5DF2\u4FDD\u5B58\u6A21\u5F0F",currentVoiceMode:"\u5F53\u524D\u5BF9\u8BDD\u7684\u5B9E\u9645\u6A21\u5F0F",noActiveVoice:"\u6CA1\u6709\u8FD0\u884C\u4E2D\u7684\u5BF9\u8BDD",chooseVisibility:"\u9009\u62E9\u663E\u793A\u6A21\u5F0F",workspaceWarning:"\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD\u4F1A\u628A\u5BF9\u8BDD\u663E\u793A\u5728\u666E\u901A\u5DE5\u4F5C\u533A\u4E2D\u3002\u9690\u85CF\u6A21\u5F0F\u4E0D\u53EF\u7528\u65F6\u4ECD\u4F1A\u62D2\u7EDD\u542F\u52A8\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u6539\u4E3A\u53EF\u89C1\u3002",visibilityNoMigration:"\u6B64\u8BBE\u7F6E\u7528\u4E8E\u540E\u7EED\u5BF9\u8BDD\uFF1B\u5DF2\u6709\u5BF9\u8BDD\u4FDD\u6301\u539F\u663E\u793A\u65B9\u5F0F\u3002",modeReadFirst:"\u6B63\u5728\u6838\u67E5\u5F53\u524D\u5BF9\u8BDD\u7684\u914D\u7F6E\u548C\u72B6\u6001\uFF0C\u786E\u8BA4\u540E\u53EF\u4FEE\u6539\u6A21\u5F0F\u3002",closeBeforeMode:"\u8BF7\u5148\u5173\u95ED\u8BED\u97F3\uFF0C\u786E\u8BA4\u5B8C\u5168\u505C\u6B62\u540E\u53EF\u4FEE\u6539\u663E\u793A\u6A21\u5F0F\u3002",saveWorkspace:"\u4FDD\u5B58\u5DE5\u4F5C\u533A\u53EF\u89C1\u6A21\u5F0F",saveHidden:"\u4FDD\u5B58\u9690\u85CF\u6A21\u5F0F",visibilityUnknownWrite:"\u663E\u793A\u6A21\u5F0F\u5199\u5165\u7ED3\u679C\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\u3002\u6838\u5B9E\u524D\u4E0D\u80FD\u7EE7\u7EED\u4FEE\u6539\uFF0C\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002",outputObservationUnavailable:"\u5C1A\u672A\u63A5\u5165\u771F\u5B9E\u64AD\u97F3\u5F00\u59CB\u4E8B\u4EF6\uFF0C\u65E0\u6CD5\u786E\u8BA4\u6B63\u5728\u64AD\u97F3",title:"\u9C7C\u5E94",description:"\u8BED\u97F3\u63A7\u5236\u3001\u97F3\u9891\u8BBE\u7F6E\u4E0E\u72EC\u7ACB\u5BF9\u8BDD\u3002",drag:"\u79FB\u52A8\u9C7C\u5E94\u60AC\u6D6E\u7A97",dragHint:"\u7528\u9F20\u6807\u62D6\u52A8\u7A7A\u767D\u533A\u57DF\u79FB\u52A8\uFF1B\u6309\u94AE\u548C\u8F93\u5165\u6846\u6B63\u5E38\u64CD\u4F5C",collapse:"\u6536\u8D77",reopen:"\u6253\u5F00\u9C7C\u5E94",refresh:"\u5237\u65B0\u72B6\u6001",settings:"\u8BBE\u7F6E",unknown:"\u6B63\u5728\u8BFB\u53D6\u72B6\u6001\u2026",enabled:"\u9EA6\u514B\u98CE\uFF1A\u5DF2\u5F00\u542F",disabled:"\u9EA6\u514B\u98CE\uFF1A\u672A\u5F00\u542F",identity:"\u5B8C\u6574\u4F1A\u8BDD\u6807\u8BC6",source:"\u6388\u6743\u6765\u6E90",actor:"\u64CD\u4F5C\u4F1A\u8BDD",none:"\u65E0",openSession:"\u5148\u5728 DSH \u4FA7\u680F\u65B0\u5EFA\u6216\u6253\u5F00\u4E00\u4E2A\u5BF9\u8BDD\uFF0C\u518D\u56DE\u5230\u9C7C\u5E94\u3002",enable:"\u5F00\u9EA6",transfer:"\u8BA9\u8FD9\u4E2A\u7A97\u53E3\u63A5\u7BA1\u9EA6\u514B\u98CE",disable:"\u5173\u9EA6",stale:"\u72B6\u6001\u6682\u65F6\u8BFB\u4E0D\u5230",snapshot:"\u4E0A\u6B21\u8BFB\u53D6\u7684\u72B6\u6001",consequence:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u672C\u6B21\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u3002\u6536\u8D77\u540E\u4F1A\u7EE7\u7EED\u5BF9\u8BDD\u3002",savedHint:"\u8BBE\u5907\u4E0E\u58F0\u7EB9\u8BBE\u7F6E\u5728\u4E0B\u6B21\u97F3\u9891\u64CD\u4F5C\u65F6\u751F\u6548",more:"\u66F4\u591A\u5BF9\u8BDD",historyOther:"\u5217\u8868\u6765\u81EA\u5176\u4ED6\u64CD\u4F5C\u4F1A\u8BDD\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6",helperOnline:"\u97F3\u9891\u670D\u52A1\u5728\u7EBF",helperOffline:"\u97F3\u9891\u670D\u52A1\u79BB\u7EBF",pending:"\u6B63\u5728\u5904\u7406\u2026",refreshHint:"\u53EA\u8BFB\u53D6\u72B6\u6001\uFF0C\u4E0D\u542F\u52A8\u9EA6\u514B\u98CE\u6216\u6A21\u578B",modelGuide:"\u9ED8\u8BA4 SenseVoice \u5728\u672C\u673A\u4F7F\u7528 CPU\u3002\u6A21\u578B\u6587\u4EF6\u548C\u8BB8\u53EF\u89C1 docs/model-setup.md\u3002",sensevoiceSource:"SenseVoice \u6765\u6E90",ttsSource:"\u5916\u90E8 TTS \u53C2\u8003",licenseNote:"SenseVoice \u8BB8\u53EF\u8BA8\u8BBA",modelTitle:"\u672C\u5730\u6A21\u578B",modelHint:"\u4FDD\u5B58\u5DF2\u6709 SenseVoice \u6216 CAM++ \u8DEF\u5F84\u3002\u6587\u4EF6\u5728\u4F7F\u7528\u524D\u6821\u9A8C\uFF0C\u58F0\u7EB9\u8FC7\u6EE4\u9700\u53E6\u884C\u5F00\u542F\u3002",asr:"\u8BED\u97F3\u8BC6\u522B",sensevoicePath:"SenseVoice \u672C\u5730\u76EE\u5F55",campplusPath:"CAM++ \u6587\u4EF6\uFF08\u53EF\u9009\uFF09",saveModels:"\u4FDD\u5B58\u6A21\u578B\u8DEF\u5F84",audioTitle:"\u97F3\u9891\u8BBE\u7F6E",soundTitle:"\u8F6E\u6B21\u63D0\u793A\u97F3",headphones:"\u6211\u5DF2\u4F7F\u7528\u8033\u673A",headphonesHint:"\u672A\u786E\u8BA4\u8033\u673A\u65F6\uFF0C\u4E3A\u907F\u514D\u5916\u653E\u56DE\u58F0\u4E0D\u64AD\u653E\u63D0\u793A\u97F3\uFF1B\u8FD9\u4E0D\u662F\u56DE\u58F0\u6D88\u9664\uFF0C\u4E5F\u4E0D\u4F1A\u88C1\u6389\u7528\u6237\u8BB2\u8BDD",automaticBargeIn:"\u542F\u7528\u5B9E\u9A8C\u6027\u81EA\u52A8\u6253\u65AD",stopRequested:"\u5DF2\u8BF7\u6C42\u505C\u6B62\u64AD\u653E\uFF0C\u5C1A\u672A\u786E\u8BA4",stopConfirmed:"\u5DF2\u786E\u8BA4\u505C\u6B62\u64AD\u653E",soundEnabled:"\u542F\u7528\u63D0\u793A\u97F3",soundVolume:"\u63D0\u793A\u97F3\u97F3\u91CF\uFF080\u20131\uFF09",soundUnavailable:"\u97F3\u6548\u6682\u672A\u63A5\u5165\uFF1B\u8FD9\u4E9B\u63A7\u4EF6\u4E0D\u4F1A\u5047\u88C5\u64AD\u653E",soundAvailable:"\u97F3\u6548\u5DF2\u63A5\u5165",mode:"\u8BF4\u8BDD\u65B9\u5F0F",alwaysOn:"\u5F00\u542F\u6301\u7EED\u8046\u542C\uFF08\u9EA6\u514B\u98CE\u5E38\u5F00\uFF09",alwaysOff:"\u5207\u56DE\u6309\u4F4F\u8BF4\u8BDD",modeUnavailable:"\u8BF4\u8BDD\u65B9\u5F0F\u63A7\u5236\u5C1A\u672A\u63A5\u5165",modeNeedsGrant:"\u8BF7\u5148\u8BFB\u53D6\u6700\u65B0\u72B6\u6001\u3002",pttMode:"\u6309\u952E\u8BF4\u8BDD",alwaysMode:"\u81EA\u7531\u9EA6",modeHint:"\u5F00\u59CB\u5BF9\u8BDD\u524D\u53EF\u9884\u9009\u8BF4\u8BDD\u65B9\u5F0F\u3002",readSettings:"\u8BFB\u53D6\u8BBE\u7F6E",device:"\u9EA6\u514B\u98CE\u8BBE\u5907",deviceHint:"\u8BBE\u5907\u540D\u79F0\u6765\u81EA\u97F3\u9891\u670D\u52A1\u7684\u6700\u8FD1\u8BFB\u53D6\u3002\u66F4\u6362\u8BBE\u5907\u540E\uFF0C\u5F00\u59CB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002",sideButton:"\u9F20\u6807\u6309\u4F4F\u8BF4\u8BDD",sideOff:"\u5173\u95ED",sideOne:"\u4FA7\u952E 1",sideTwo:"\u4FA7\u952E 2",speaker:"\u5B9E\u9A8C\u6027\u58F0\u7EB9\u8FC7\u6EE4",speakerHint:"\u6B64\u5F00\u5173\u53EA\u7528\u4E8E\u5DF2\u6709\u7684\u58F0\u7EB9\u914D\u7F6E\uFF1B\u5F53\u524D\u9762\u677F\u6CA1\u6709\u6CE8\u518C\u5165\u53E3\u3002",save:"\u4FDD\u5B58\u8BBE\u7F6E",saved:"\u8BBE\u7F6E\u5DF2\u4FDD\u5B58",historyTitle:"\u5BF9\u8BDD\u5386\u53F2",historyHint:"\u53EA\u663E\u793A\u9C7C\u5E94\u521B\u5EFA\u7684\u5BF9\u8BDD\uFF1B\u63A5\u7EED\u4E0D\u4F1A\u81EA\u52A8\u6062\u590D\u5DF2\u5F52\u6863\u804A\u5929",loadHistory:"\u8BFB\u53D6\u5BF9\u8BDD",newChat:"\u65B0\u4F1A\u8BDD",resume:"\u63A5\u7EED",active:"\u5F53\u524D",archived:"\u5DF2\u5F52\u6863",unavailable:"\u4E0D\u53EF\u7528",empty:"\u6682\u65E0\u53EF\u63A5\u7EED\u7684\u5BF9\u8BDD",noTitle:"\u5BF9\u8BDD",noResume:"\u5F53\u524D\u4E0D\u80FD\u63A5\u7EED",newHint:"\u65B0\u5EFA\u6216\u63A5\u7EED\u4F1A\u5207\u6362\u5F53\u524D\u8BED\u97F3\uFF0C\u64A4\u56DE\u65E7\u6388\u6743\uFF0C\u53EF\u80FD\u7ED3\u675F\u65E7\u540E\u53F0\u4EFB\u52A1\uFF1B\u4E0D\u5408\u5E76\u5386\u53F2\uFF0C\u4E5F\u4E0D\u91CD\u8DD1\u65E7\u4EFB\u52A1",historyStale:"\u70B9\u51FB\u8BFB\u53D6\u5BF9\u8BDD\u67E5\u770B\u6700\u65B0\u8BB0\u5F55"},Wd={startConversation:"Start conversation",endConversation:"End conversation",voiceTarget:"Send to",dedicatedVoiceTarget:"Fish Voice conversation",checkingVoiceTarget:"Checking target\u2026",voiceTargetChanged:"The delivery target changed. Check the chat shown here before starting.",chooseCurrentDshTarget:"Use current chat",backToFishVoice:"Back to Fish Voice",currentDshTargetError:"Could not confirm this DSH chat. Check the chat and try again.",chooseVoiceTarget:"Choose a delivery chat",searchVoiceTargets:"Search by chat title or ID",searchVoiceTargetsAction:"Search",existingVoiceTargetList:"Existing DSH chats",boundVoiceTarget:"Current target",voiceTargetAvailability_ready:"Available",voiceTargetAvailability_busy:"Chat is processing a message",voiceTargetAvailability_archived:"Chat is archived",voiceTargetAvailability_unavailable:"Chat is unavailable",voiceTargetAvailability_managed:"Managed by Fish Voice. Direct delivery unavailable.",voiceTargetAvailability_subagent:"Subagent chat. Direct delivery unavailable.",voiceTargetNoMatch:"No matching chats.",voiceTargetEmptyList:"No available chats.",voiceTargetSynthesisNotice:"With an online voice, replies are sent to the speech provider you approved. Select a local voice under Models \u2192 Read aloud to keep speech offline.",bindVoiceTarget:"Use selected chat",savingVoiceTarget:"Saving\u2026",moreVoiceTargets:"Load more",loadingVoiceTargets:"Loading DSH chats\u2026",voiceTargetListError:"Could not load DSH chats.",retryVoiceTargets:"Retry",voiceTranscriptCaptions:"Voice captions",retryTranscript:"Resend",transcriptDelivery_busy:"Chat busy, waiting to send to",transcriptDelivery_ready:"Ready to resend to",transcriptDelivery_sending:"Sending to",transcriptDelivery_queued:"Waiting for chat",transcriptDelivery_delivered:"Sent to",transcriptDelivery_uncertain:"Delivery unconfirmed",transcriptDelivery_failed:"Failed to send to",transcriptDelivery_discarded:"Pending send canceled",endDiscardsRetries:"Ending the conversation clears pending transcripts.",modeSwitching:"Switching listening mode\u2026",modeSaving:"Saving listening mode\u2026",modeSwitchUnconfirmed:"Checking which listening mode took effect\u2026",modeSwitchFailed:"The change could not be confirmed. Check the current mode and try again.",updateTitle:"Fish Voice updates",updateOfferTitle:"Fish Voice update available",updateCurrentVersion:"Installed",updateNewVersion:"New",updateChannel_stable:"Stable",updateChannel_preview:"Preview",updateCheck:"Check for updates",updateDetails:"View update",updateLater:"Later",updateInstall:"Update now",updateRelease:"Release notes",updateFeedback:"Send feedback",update_idle:"Reading update status\u2026",update_checking:"Checking for updates\u2026",update_current:"Fish Voice is up to date.",update_available:"An update is ready.",update_incompatible:"This update is incompatible with the current DSH environment.",update_installing:"Updating. DSH may reload Fish Voice\u2026","update_restart-required":"Update installed. Restart DSH to apply it.","update_enable-required":"Update installed. Enable Fish Voice in DSH plugin settings.",update_installed:"Update complete.",update_error:"The update encountered an error. Check for updates to retry.",update_unsupported:"Automatic updates are unavailable. See the official release notes.",updateConnection:"Update status could not be confirmed. Check again when DSH is ready.",audioDevices:"Audio devices",audioSystemDefault:"System default",audioInput:"Audio input",audioOutput:"Audio output",inputDeviceMissing:"Microphone disconnected; selection retained",outputDeviceMissing:"Output disconnected; no automatic fallback",deviceDisconnected:"Disconnected",inputDeviceStopFirst:"Turn off the microphone to switch input. Output changes at the next playback.",outputDeviceUnsupported:"Selecting speech output is not supported on this platform.",deviceListRetry:"Device list unavailable. Open a selector to retry.",voiceHelperCleanupHint:"Confirming microphone release. New recording stays off until this completes.",voiceHelperRestartHint:"Microphone helper exit is unconfirmed. Fully restart DSH before enabling voice.",inputError_device:"Microphone unavailable",inputError_recognition:"Recognition failed","inputError_no-speech":"No clear speech; try again",inputHelp_device:"Check mic access. Turn the mic off to select a device. Error details: Settings \u2192 Advanced \u2192 Diagnostics.",inputDiagnosticTitle:"Last reported audio error",inputDiagnosticHistory:"This is the last recorded error and may be from an earlier attempt. It does not confirm the current device state.",inputHelp_recognition:"Try again. If it fails, turn the mic off and check the model in Settings.","inputHelp_no-speech":"Move closer, check that your mic is unmuted, and try again.",speechFailed:"Speech failed",speechInterrupted:"Speech interrupted",wakeFallbackHint:"Say a configured name. Matching uses the transcript for now. Reselect Wake word after switching modes to retry sound matching.",wakeMode:"Wake word",switchToWake:"Switch to wake-word listening",wakeDisabled:"Wake listening is off",wakeStarting:"Starting wake listening\u2026",wakeWaiting:"Waiting for wake word",wakeListening:"Listening for the next instruction",wakePaused:"Wake listening paused",wakeError:"Wake listening unavailable; check settings",wakeHint:"Say a configured name, then your instruction. End the conversation to stop listening.",wakeMethod:"Matches the sound and transcript locally after the phrase ends.",wakeAliases:"Wake names",wakeAliasesHint:"Up to 8 comma-separated names. Mandarin near-sounds match only at the start; prefer a distinctive name of 3+ characters.",wakeTimeout:"Wait after wake (seconds)",wakeSettings:"Wake-word settings",wakeStopToEdit:"Turn off the microphone before editing wake names or timeout.",wakeInvalid:"Enter 1\u20138 valid names and a 3\u201330 second timeout.",switchToPtt:"Click to use push to talk",switchToAlways:"Click to leave the microphone listening",quickSpeedStop:"Turn the mic off to change speed",performanceReadFirst:"Check which speeds the current model supports first.",performanceUnavailable:"The provider explicitly rejected the reasoning parameter for unavailable modes; other modes remain selectable.",performanceProbeCost:"At load, up to 3 fixed short requests check the modes. Model charges apply.",performanceProbeScope:"Only routes with a testing interface send short requests. Native support can be read directly.",performanceProbeUnknown:"Some modes could not be confirmed. Check network access or sign-in, then retry.",performanceProbeAccepted:"The effort request check passed.",performanceProbePending:"Checking effort modes for the current model\u2026",holdToSpeak:"Hold to speak:",alwaysWarning:"The microphone keeps listening. Turn it off when finished.",bindingMissing:"Bind a push-to-talk shortcut in settings, or switch to continuous listening.",noSession:"No conversation is open",otherWindow:"Microphone: another window",readingStatus:"Reading status without starting the microphone or models.",statusRetry:"Status is unavailable. It will be checked automatically when you return to this window.",retryStatus:"Refresh voice status",collapseHint:"Collapsing keeps the microphone enabled",stopConsequence:"Ending the conversation releases the microphone and stops its background tasks.",transferTitle:"Take over the other window\u2019s microphone?",transferWarning:"This interrupts voice in the other window and may end its background tasks.",cancel:"Cancel",confirmTransfer:"Confirm takeover",bindingStopRequired:"Turn off the microphone before changing mouse or keyboard shortcuts.",bindingFinishing:"Voice is still stopping. Wait before changing shortcuts.",headphonesRequired:"Confirm that you are wearing headphones to enable automatic interruption.",deviceManualIndex:"Advanced: enter device index",deviceManualName:"Advanced: enter device name",deviceIndexInvalid:"Enter a nonnegative whole-number device index.",deviceDefault:"Use the system default microphone",deviceManual:"Advanced: enter name or index",deviceSaved:"Saved device",deviceEmpty:"No microphone was found. Connect a device and check system sound settings.",deviceUnknown:"Detected devices appear after enabling voice. Use the system default or enter a device manually.",ttsBackend:"Speech backend",ttsBackendHint:"Speech uses your installed TTS backend and its settings. Independent output volume appears only when verified.",ttsBackendPending:"Additional backend selection is being adapted. No cloud service is connected automatically.",voiceClone:"Voice cloning",voiceCloneAvailable:"Qwen supports a local reference voice. Choose a WAV in voice settings.",voiceClonePrivacy:"Reads only your selected, authorized sample locally. No audio upload.",inputActive:"Receiving voice input",modeUnknown:"Listening mode unknown",voiceInputUnavailable:"Voice input unavailable",voiceInputRecoveryHint:"The audio service stopped. Turn the microphone off, then on again. Your authorization is unchanged.",searchHistory:"Search chats",searchScope:"Search loaded chats",noMatches:"No matching chats",differentOwner:"Voice belongs to another session. Check the source first.",details:"Diagnostics",noReply:"No conversation yet",recentConversation:"Conversation",recentTenTurns:"Recent 10 turns",allRecords:"All records",showAllRecords:"Show all",collapseToTen:"Last 10 turns",collapseConversation:"Collapse conversation",currentVoiceRecords:"Current voice chat",historyTruncated:"Showing a limited range; original records retained",viewConversation:"View voice records",loadEarlier:"Load earlier",readingHistory:"Reading records\u2026",retryHistory:"Could not read records. Retry",noConversation:"No conversation yet",newMessages:"new messages",conversationMessages:"Voice conversation",assistantName:"Assistant name",renameAssistant:"Rename: Enter to save, Esc to cancel",newChatCreated:"New chat created",newChatActive:"Start a voice chat. Background work in the current chat will stop and its history will be kept.",newChatOtherOwner:"Open the current voice chat or the window that enabled the microphone to start a new chat.",compact_off:"Off",compact_standby:"Standby",compact_listening:"Listening",compact_pending:"Working",compact_unknown:"Check status",you:"You",assistant:"Assistant",close:"Close panel",keyboardBinding:"Push-to-talk binding",bindingOff:"Not bound",saveBindings:"Save shortcuts",discardBindings:"Discard changes",bindingCapture:"Press a key combination (Esc cancels)",clearBinding:"Clear binding",bindingUnsupported:"This key or system shortcut is not supported.",bindingGlobalHint:"Windows global shortcut. Disable voice before recording a binding; changes apply on the next voice enable. Keys are not swallowed and may also trigger another application.",bindingUnavailable:"Global key binding is unavailable on this platform.",bindingPrintableWarning:"A plain letter, digit or Space also triggers push-to-talk while typing in other applications.",performanceTitle:"Voice performance",performanceHint:"Applies to the next dedicated voice chat. For a linked conversation, use the model menu in that DSH chat to change its reasoning effort.",inspectPerformance:"Check available modes",performance_fast:"Fast",performanceNoThinking:"No thinking",performanceRecommended:"[Recommended]",performanceFastHint:"Fast explicitly requests thinking to be turned off.",performanceFastUnavailable:"The current route cannot confirm that thinking can be turned off. Choose Follow model or select a model route that supports turning it off.",performanceHostUnavailable:"The current model route does not offer some reasoning levels.",performance_balanced:"Standard",performance_high:"High",performance_compatibility:"Compatible default",performanceStopRequired:"Mode changes require fully stopped voice. Disabling voice can end background work belonging to its voice root.",savePerformance:"Save for next enable",outputVolume:"Assistant voice volume",outputVolumeHint:"Adjusts the installed Windows dsh-speak backend only. It does not verify the active voice route or change DSTuber, system or cue volume. Applies to the next output.",readOutputVolume:"Read voice volume",saveOutputVolume:"Save voice volume",outputVolumeUnavailable:"This speech backend does not support independent volume control.",outputVolumeUnknown:"The volume save is unconfirmed. It will be checked automatically without resubmitting.",settingsTitle:"\u9C7C\u5E94 settings",settingsSections:"Settings sections",tab_audio:"Audio",tab_interaction:"Interaction",tab_prompt:"Prompt",voicePromptLabel:"Custom prompt",voicePromptOptional:"(optional)",voicePromptAgents:"Follow AGENTS",voicePromptCustom:"Custom prompt added",voicePromptPlaceholder:`For example: Give the conclusion first and use a natural tone.

Added after AGENTS. Leave empty to use the default settings.`,voicePromptStopToEdit:"Stop voice to edit",voicePromptUnsupported:"This DSH version does not support custom prompts yet.",voicePromptTooLong:"The prompt must not exceed 32,768 characters.",voicePromptSaving:"Saving\u2026",voicePromptCancel:"Cancel changes",voicePromptSave:"Save",voicePromptSaved:"Saved. Applies when voice is next started.",voicePromptSaveFailed:"Could not save. Your draft has been kept.",voicePromptUnsaved:"Not saved",tab_models:"Models",tab_advanced:"Advanced",projectInfoTitle:"About \u9C7C\u5E94",projectAuthor:"Author",projectRepository:"Official repository",projectNpm:"npm package",tab_sessions:"Sessions",settingsContent:"Settings content",voiceCleanupPending:"Closing previous audio service",voiceCleanupHint:"Waiting for the previous session and recording to exit. Status will refresh without retrying microphone activation.",voiceRestartPending:"Restart DSH required",voiceRestartHint:"The previous audio service has not confirmed exit. Fully quit and reopen DSH before enabling voice. Your saved authorization is unchanged.",voiceRecoveryPending:"Previous voice session is still active",voiceRecoveryCheck:"Check and stop",voiceRecoveryHint:"The previous instance is still closing. Check and stop first. If it remains active, fully restart DSH before enabling voice. Your authorization is retained.",operationUnavailable:"The outcome is unconfirmed. Automatic readback will check the actual state without resubmitting. Details are in Advanced settings.",enableFailed:"Could not open the mic. Check Advanced settings for details before retrying.",tab_pets:"Desktop pet",planned:"Planned development",configurationUnknown:"The configuration write is unconfirmed. Automatic readback is in progress; changes stay locked until verified.",motionTitle:"Interface motion",motion_spring:"Spring",motion_firm:"Firm",motion_off:"Off",motionHint:"Preview and save immediately. Actions never wait for animation. System reduced-motion preference takes priority.",motionNotSaved:"Preview applied, but this browser could not save the preference.",modeControlPending:"Voice control is pending or unconfirmed. Refresh status when it finishes.",capabilityTitle:"Host capabilities and voice visibility",supported:"Available",unsupported:"Unavailable or unconfirmed",hiddenMode:"Hidden voice chat",workspaceMode:"Workspace-visible compatibility mode",taskCapability:"Persistent handoff",configuredMode:"Saved mode",currentVoiceMode:"Actual mode of the current voice chat",noActiveVoice:"No running voice chat",chooseVisibility:"Choose visibility",workspaceWarning:"Workspace-visible compatibility mode shows voice chats in the regular workspace. Unavailable hidden mode still refuses to start; it never falls back to visible mode.",visibilityNoMigration:"This preference applies to later chats. Existing chats keep their current visibility.",modeReadFirst:"Checking settings and status for this conversation before visibility can be changed.",closeBeforeMode:"Turn voice off and wait for confirmed shutdown before changing visibility.",saveWorkspace:"Save workspace-visible mode",saveHidden:"Save hidden mode",visibilityUnknownWrite:"The visibility write is unconfirmed. Automatic readback is in progress; changes stay locked. The original write will not be repeated.",outputObservationUnavailable:"Actual playback-start events are unavailable; playback has not been confirmed.",title:"\u9C7C\u5E94",description:"Voice controls, audio preferences, and separate voice chats.",drag:"Move Fish Voice panel",dragHint:"Drag background space with the mouse; controls remain interactive",collapse:"Collapse",reopen:"Open Fish Voice",refresh:"Refresh status",settings:"Settings",unknown:"Reading status\u2026",enabled:"Microphone enabled",disabled:"Microphone off",identity:"Full session identities",source:"Authorization source",actor:"Action session",none:"None",openSession:"Open a DSH conversation first",enable:"Enable for this session",transfer:"Authorize this session",disable:"Disable voice",stale:"Refresh to confirm status",snapshot:"Last read status",consequence:"Disabling or switching voice may end its background work. Collapsing this panel leaves voice enabled.",savedHint:"Device and speaker settings take effect on the next audio operation or helper reload.",more:"More voice chats",historyOther:"This list belongs to another action session; read it again",helperOnline:"Audio helper online",helperOffline:"Audio helper offline",pending:"Working\u2026",refreshHint:"Read status without starting the microphone or a model",modelGuide:"SenseVoice runs locally on the CPU. For model files and licenses, see docs/model-setup.md.",sensevoiceSource:"SenseVoice source",ttsSource:"External TTS reference",licenseNote:"SenseVoice licensing discussion",modelTitle:"Local models",modelHint:"Save existing SenseVoice or CAM++ paths. Files are verified before use. Speaker filtering is enabled separately.",asr:"Speech recognition",sensevoicePath:"Local SenseVoice directory",campplusPath:"CAM++ file (optional)",saveModels:"Save model paths",audioTitle:"Audio settings",soundTitle:"Turn sounds",headphones:"I am using headphones",headphonesHint:"Cues stay off until headphones are confirmed, to avoid speaker echo. This is not echo cancellation and does not trim your speech.",automaticBargeIn:"Enable experimental automatic interruption",stopRequested:"Stop requested; playback has not confirmed stopping",stopConfirmed:"Playback confirmed stopped",soundEnabled:"Enable turn sounds",soundVolume:"Sound volume (0\u20131)",soundUnavailable:"Sound playback is not connected; these controls cannot play cues yet.",soundAvailable:"Sound playback connected",mode:"Listening mode",alwaysOn:"Enable always listening (mic stays on)",alwaysOff:"Use push to talk",modeUnavailable:"Listening mode control is not connected",modeNeedsGrant:"Read the current voice status first",pttMode:"Push to talk",alwaysMode:"Open mic",modeHint:"The audio helper controls the active mode. Saving preferences never grants or starts microphone access.",readSettings:"Read settings",device:"Input device",deviceHint:"Blank uses the system default; enter a device name or index",sideButton:"Mouse push-to-talk",sideOff:"Off",sideOne:"Side button 1",sideTwo:"Side button 2",speaker:"Experimental speaker filtering",speakerHint:"Enable matching only; this page does not record or enroll a voiceprint",save:"Save settings",saved:"Settings saved",historyTitle:"Voice chats",historyHint:"Only Fish Voice voice chats appear here. Resume never unarchives a chat automatically.",loadHistory:"Read voice chats",newChat:"New chat",resume:"Resume",active:"Current",archived:"Archived",unavailable:"Unavailable",empty:"No voice chats available",noTitle:"Voice chat",noResume:"Cannot resume right now",newHint:"New or resumed chats switch current voice, revoke its old grant, and may end its background work. They do not merge history or replay old work.",historyStale:"Read voice chats to see the latest records"};var Cn=require("react");var ng=/^7b94c8e3-d6a1-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,Vi=e=>typeof e=="string"&&ng.test(e);var Jd="sidebar.workspaces",tg="workspace",rg="whaleWorkspacePresentation",og=["sidebar.workspaces.directoryFlow","sidebar.workspaces.session.row.action","sidebar.session.row.leading","sidebar.session.row.trailing","sidebar.session.row.hover"],ig=new Set(["one-shot","continuable","unknown"]);function ag(e,n){return e&&typeof e=="object"&&Object.keys(e).length===n.length&&n.every(t=>Object.hasOwn(e,t))}function sg(e){if(!Array.isArray(e)||e.length>512)return null;let n=[],t=new Set;for(let r of e){if(!ag(r,["id","parentId","mode"])||typeof r.id!="string"||!r.id||r.id.length>256||t.has(r.id))return null;if(r.parentId===null){if(r.mode!==null||!Vi(r.id))return null;n.push({id:r.id,parentId:null,mode:null})}else{if(typeof r.parentId!="string"||!r.parentId||r.parentId===r.id||!ig.has(r.mode))return null;n.push({id:r.id,parentId:r.parentId,mode:r.mode})}t.add(r.id)}return n}function lg(e,n){if(!e||typeof e!="object"||!e.byId||!Array.isArray(e.ids))return e;let t=new Map(n.map(c=>[c.id,c])),r=Object.create(null),o=new Set,i=!1;for(let[c,u]of Object.entries(e.byId)){let d=t.get(c);if(Vi(c)&&d===void 0){o.add(c),i=!0;continue}if(d?.parentId===null){if(u.parentId===void 0&&u.origin!=="subagent"){r[c]=u;continue}o.add(c),i=!0;continue}if(d&&u.origin==="subagent"&&u.parentId===d.parentId){let p={...u};delete p.origin,r[c]=p,i=!0;continue}r[c]=u}for(let c of n){let u=e.byId[c.id];u&&(c.parentId===null&&(u.parentId!==void 0||u.origin==="subagent")||c.parentId!==null&&(u.origin!=="subagent"||u.parentId!==c.parentId)||e.ids.includes(c.id)||(i=!0))}if(!i)return e;let a=e.ids.filter(c=>!o.has(c)&&r[c]!==void 0);for(let c of n)r[c.id]!==void 0&&!a.includes(c.id)&&a.push(c.id);let l=e.projectionsBySession;if(l&&o.size>0){let c={...l};for(let u of o)delete c[u];l=c}return{...e,ids:a,byId:r,projectionsBySession:l}}function cg(e,n){return!e||e.locale!==tg||e.options?.id!==void 0||e.options?.key!==void 0||(e.options?.priority??0)!==0||typeof n!="function"||n.name!=="WorkspaceBrowser"?!1:og.every(t=>Object.hasOwn(e.children??{},t))}function ug(e){if(!Object.isExtensible(e))return!1;let n=Object.getOwnPropertyDescriptor(e,"component");return n===void 0||n.writable===!0}function dg(e,n){return e.length===n.length&&e.every((t,r)=>{let o=n[r];return t.id===o.id&&t.parentId===o.parentId&&t.mode===o.mode})}function Gd(e,n){let t=[],r=0,o={revision:r,items:t},i,a=!1,l=!1,c=new Set,u=new Set,d=z=>{for(let F of[...z])F()},p={getSnapshot:()=>o,subscribe(z){return u.add(z),()=>u.delete(z)}},f=()=>{r++,o={revision:r,items:t},d(u),d(c)},m=z=>{a!==z&&(a=z,f())},y=()=>{let z=i;i=void 0,z&&z.entry.component===z.wrapper&&(z.entry.component=z.original)},v=()=>{if(l)return;let z;try{z=e.entries(Jd)}catch{z=void 0}let F=Array.isArray(z)?z.filter(O=>{let C=i&&i.entry===O&&O.component===i.wrapper?i.original:O?.component;return cg(O,C)}):[];if(F.length!==1||typeof n!="function"||!ug(F[0])){y(),m(!1);return}let Z=F[0];if(i?.entry===Z&&Z.component===i.wrapper)return;y(),m(!1);let N=Z.component,$=O=>{let C=O.useSessions(I=>I),_=O.useWhaleWorkspacePresentation(I=>I),P=(0,Cn.useMemo)(()=>lg(C,_.items),[C,_]),D=(0,Cn.useCallback)(I=>I(P),[P]),A=(0,Cn.useMemo)(()=>new Map(_.items.map(I=>[I.id,I])),[_]),E=(0,Cn.useCallback)(I=>{let H=A.get(I),L=C.byId[I];if(H?.parentId&&L?.origin==="subagent"&&L.parentId===H.parentId){n({childSessionId:I,parentSessionId:H.parentId,mode:H.mode});return}O.open?.(I)},[O.open,A,C]);return(0,Cn.createElement)(N,{...O,useSessions:D,open:E})},S=function(C){let _=typeof C?.useSessions=="function"&&typeof C?.useWhaleWorkspacePresentation=="function"&&typeof C?.open=="function";return(0,Cn.useEffect)(()=>{i?.entry===Z&&i.wrapper===S&&m(_)},[_]),(0,Cn.createElement)(_?$:N,C)};S.displayName="WhaleWorkspacePresentation",Z.component=S,i={entry:Z,original:N,wrapper:S}},b=()=>{},x=()=>{};try{b=e.provideRoot({hooks:{[rg]:p}}),typeof b!="function"&&(b=()=>{}),x=e.subscribe(Jd,v),typeof x!="function"&&(x=()=>{}),v()}catch{x(),y(),b(),m(!1)}return{supported:()=>a,subscribe(z){return c.add(z),()=>c.delete(z)},setOverrides(z){if(l)return!1;let F=sg(z);return F===null?(t.length>0&&(t=[],f()),!1):(dg(t,F)||(t=F,f()),!0)},dispose(){l||(l=!0,x(),y(),a=!1,f(),b(),c.clear(),u.clear())}}}var pg=["slots","locale","remote","uiSession"];function mg(e){let n=cd(),t=Xu(void 0,{observe:n.internal});t.enableAutomaticReads();let r=Yu();e.inject(["whaleFloatingLayout"],v=>{v.effect(()=>r.useLayoutService(v.whaleFloatingLayout),"whale-voice: optional magnetic layout")});let o=nd(),i=Qu(window,{onResize:v=>r.fit(v)}),a,l=()=>{};e.effect(()=>{let v=()=>{t.setReadVisibility(document.visibilityState!=="hidden"),document.visibilityState!=="hidden"&&(t.refresh(),a?.refresh(),l())};return window.addEventListener("focus",v),window.addEventListener("online",v),document.addEventListener("visibilitychange",v),v(),()=>{window.removeEventListener("focus",v),window.removeEventListener("online",v),document.removeEventListener("visibilitychange",v)}},"whale-voice: refresh visible state"),e.effect(()=>{let v=Gd(e.slots,S=>e.get?.("uiWorkspace")?.openSession(S)),b,x,z=()=>{x?.(),x=null};l=()=>{if(!v.supported()){z();return}if(!b||x)return;let S=b,O=!0;x=b.subscribePresentation(C=>{v.setOverrides(C.shown),O&&(O=!1,t.refresh({force:!0}))},C=>{b===S&&(z(),console.warn("\u9C7C\u5E94\u4FA7\u680F\u4F1A\u8BDD\u663E\u793A\u8FDE\u63A5\u4E2D\u65AD",C?.message??C))})};let F=v.subscribe(l),Z=!1;a=Yi(async()=>{let S=Z?"ui-reconnect":"ui-connect";n.internal(S,"requested");try{let O=await od(e,n.internal);return n.internal(S,"finished","ok"),O}catch(O){throw Z=!0,n.internal(S,"finished","failed"),O}},{visible:()=>t.getSnapshot().readVisible!==!1,onReady:S=>{z(),b=S,n.attach(S),t.attachConversationClient(S),l()},onError:S=>t.conversationUnavailable(S)});let N=t.getSnapshot().readVisible,$=t.subscribe(()=>{let S=t.getSnapshot().readVisible;S!==N&&(N=S,a.visibilityChanged())});return a.start(),()=>{l=()=>{},z(),F(),v.dispose(),$(),n.dispose(),a.dispose(),t.dispose()}},"whale-voice: private conversation stream"),e.effect(()=>()=>{t.dispose(),i.dispose(),r.dispose(),o.dispose()},"whale-ear-ui: state and geometry"),e.effect(()=>e.locale.register("whaleEar",{en:Wd,zh:jd}),"whale-ear-ui: dictionaries"),e.effect(()=>{let v=document.createElement("style");return v.dataset.plugin="dsh-whale-ear-ui",v.textContent=h.text+Cd+Gi,document.head.append(v),()=>v.remove()},"whale-ear-ui: stylesheet");let c=async v=>{let b=e.get?.("sessions");if(!b)throw new Error("DSH \u4F1A\u8BDD\u754C\u9762\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");return b.list.getSnapshot().byId[v]||await b.refresh(),b},u=0,d=async v=>{let b=++u;if(v.kind==="root"&&await c(v.id),b!==u)return;let x=e.get?.("uiWorkspace");if(!x?.openSession)throw new Error("DSH \u4F1A\u8BDD\u754C\u9762\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");return x.openSession(v.kind==="root"?v.id:{childSessionId:v.id,parentSessionId:v.parentId,mode:v.mode??"unknown"})},p=v=>d({kind:"root",id:v}),f={subscribe(v){let b=[e.uiSession.adapter?.current?.subscribe(v),e.get?.("layout")?.panelInfo?.subscribe(v),e.get?.("sessions")?.list?.subscribe?.(v)];return()=>b.forEach(x=>x?.())},selectedSession(){let v=e.uiSession.adapter?.current?.getSnapshot();return v?.hooks?.session?.getSnapshot()?.blank===!0?null:v?.props?.sessionId??null},currentConversation(){return e.get?.("layout")?.panelInfo?.getSnapshot()?.activePanelId===null?f.selectedSession():null},sourceFor(v){if(!v)return null;let b=e.get?.("sessions"),x=b?.list?.getSnapshot()?.byId?.[v];return b?.subagentAddress?.(v)||x?.origin==="subagent"||x?.parentId?null:v}},m=async(v,b)=>{let z=await(await c(v)).using(v,{source:"workspaceOperation"},F=>F.binding.session.rename(b));if(!z.ok)throw new Error(z.error.message);return z.value.title},y=()=>({captureBindings:t.captureBindings,refreshModelCompute:t.refreshModelCompute,pickPath:t.pickPath,readState:t.getSnapshot,markSettingsEdited:t.markSettingsEdited,discardSettingsDraft:t.discardSettingsDraft,openAuthorization:t.openAuthorization,closeAuthorization:t.closeAuthorization,saveAuthorization:t.saveAuthorization,readOperationLog:t.readOperationLog,manageSessions:t.manageSessions,listExistingVoiceSessions:t.listExistingVoiceSessions,setExistingVoiceSession:t.setExistingVoiceSession,setSettingsTab:t.setSettingsTab,setSettingsModelTab:t.setSettingsModelTab,setSessionManagement:t.setSessionManagement,senseVoiceAsrAction:t.senseVoiceAsrAction,updateAction:t.updateAction,dismissUpdate:t.dismissUpdate,openExistingVoiceSession:p,openManagedSession:d,renameManagedSession:m,hooks:{whaleUi:t,whalePreferences:o},setMotion:v=>o.setMotion(v),setAssistantName:v=>o.setAssistantName(v),run:(...v)=>t.run(...v),setSession:v=>t.setSession(v),cancelPreview:()=>t.cancelPreview(),discardDiagnostics:()=>t.discardDiagnostics(),dismissSetup:()=>t.dismissSetup(),openSetup:()=>t.openSetup(),showHome:()=>t.showHome(),openSettings:t.openSettings,refresh:()=>t.refresh()});e.slots.inject("shell.overlay",()=>e.slots.register({name:"shell.overlay",id:"whale-ear",locale:"whaleEar",inject:()=>({geometry:r,sizing:i,recordUserOperation:n.user,setPanelVisible:t.setPanelVisible,closeAuthorization:t.closeAuthorization,refresh:()=>t.refresh(),showHome:()=>t.showHome(),dismissSetup:()=>t.dismissSetup(),hooks:{whaleUi:t,whalePreferences:o}}),children:{"whale-ear.panel.controls":{kind:"single",scope:"root"}}},Fd)),e.slots.inject("whale-ear.panel.controls",()=>e.slots.register({name:"whale-ear.panel.controls",locale:"whaleEar",inject:()=>({...y(),controlContext:f,retryVoiceTranscript:t.retryVoiceTranscript})},qd))}
return module.exports;}});
