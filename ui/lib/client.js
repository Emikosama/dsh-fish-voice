window.__ModuleLoader__.load({id:"dsh-whale-ear-ui",factory:(require)=>{var module={exports:{}};var exports=module.exports;
var Nr=Object.defineProperty;var pp=Object.getOwnPropertyDescriptor;var mp=Object.getOwnPropertyNames;var fp=Object.prototype.hasOwnProperty;var is=(e,n)=>{for(var t in n)Nr(e,t,{get:n[t],enumerable:!0})},hp=(e,n,t,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let i of mp(n))!fp.call(e,i)&&i!==t&&Nr(e,i,{get:()=>n[i],enumerable:!(o=pp(n,i))||o.enumerable});return e};var gp=e=>hp(Nr({},"__esModule",{value:!0}),e);var Gg={};is(Gg,{apply:()=>Ig,inject:()=>Og});module.exports=gp(Gg);var qt=require("react");var $n={input:"kgQDzG_input",collapse:"kgQDzG_collapse",toggle:"kgQDzG_toggle",toggleTrack:"kgQDzG_toggleTrack",fill:"kgQDzG_fill",rail:"kgQDzG_rail",thumb:"kgQDzG_thumb",range:"kgQDzG_range",collapseInner:"kgQDzG_collapseInner",text:`.kgQDzG_range {
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

.kgQDzG_rail {
  background: var(--dsw-alias-border-l2, #8791a4);
  pointer-events: none;
  border-radius: 999px;
  height: 6px;
  position: absolute;
  inset: 13px 9px;
  min-width: 0 !important;
  margin: 0 !important;
}

.kgQDzG_fill {
  width: var(--whale-range-position);
  background: var(--dsw-alias-brand-primary, #8ba9e7);
  border-radius: inherit;
  transition: width var(--whale-duration, .2s) var(--whale-ease, ease-out);
  position: absolute;
  inset: 0 auto 0 0;
  min-width: 0 !important;
  margin: 0 !important;
}

.kgQDzG_thumb {
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

.kgQDzG_range .kgQDzG_input {
  opacity: 0;
  cursor: pointer;
  touch-action: pan-y;
  height: 32px;
  margin: 0;
  position: absolute;
  inset: 0;
  width: 100% !important;
}

.kgQDzG_range:focus-within {
  outline: 2px solid var(--dsw-focus-ring-color, #8ba9e7);
  outline-offset: 2px;
  border-radius: 6px;
}

.kgQDzG_range:hover .kgQDzG_thumb {
  box-shadow: 0 0 0 4px color-mix(in srgb,var(--dsw-alias-brand-primary, #8ba9e7) 18%,transparent);
}

.kgQDzG_range[data-dragging] :is(.kgQDzG_thumb, .kgQDzG_fill) {
  transition-duration: 40ms;
  transition-timing-function: linear;
}

.kgQDzG_range[data-disabled], .kgQDzG_toggle[data-disabled] {
  opacity: .5;
}

.kgQDzG_range[data-disabled] .kgQDzG_input {
  cursor: not-allowed;
}

.kgQDzG_collapse {
  opacity: 0;
  visibility: hidden;
  grid-template-rows: 0fr;
  transition: grid-template-rows .16s ease-out, opacity .12s ease-out, visibility .16s;
  display: grid;
}

.kgQDzG_collapse[data-open="true"] {
  opacity: 1;
  visibility: visible;
  grid-template-rows: 1fr;
}

.kgQDzG_collapseInner {
  min-height: 0;
  overflow: hidden;
}

.kgQDzG_toggle {
  cursor: pointer;
  align-items: center;
  gap: 8px;
  width: fit-content;
  max-width: 100%;
  font-size: 12px;
  display: flex;
  position: relative;
}

.kgQDzG_toggle > input {
  opacity: 0;
  width: 38px;
  height: 24px;
  margin: 0;
  position: absolute;
}

.kgQDzG_toggleTrack {
  pointer-events: none;
  background: var(--dsw-alias-border-l2, #8791a4);
  width: 36px;
  height: 22px;
  transition: background-color var(--whale-duration, .2s);
  border-radius: 999px;
  flex: none;
  position: relative;
}

.kgQDzG_toggleTrack > span {
  background: var(--dsw-alias-bg-layer-1, #fff);
  width: 16px;
  height: 16px;
  transition: left var(--whale-duration, .2s) var(--whale-ease, ease-out);
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
}

.kgQDzG_toggle > input:checked + .kgQDzG_toggleTrack {
  background: var(--dsw-alias-brand-primary, #8ba9e7);
}

.kgQDzG_toggle > input:checked + .kgQDzG_toggleTrack > span {
  left: 17px;
}

.kgQDzG_toggle > input:focus-visible + .kgQDzG_toggleTrack {
  outline: 2px solid var(--dsw-focus-ring-color, #8ba9e7);
  outline-offset: 2px;
}

[data-motion="firm"] :is(.kgQDzG_range, .kgQDzG_toggle, .kgQDzG_collapse) {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="firm"] .kgQDzG_collapse {
  transition-duration: .1s;
}

[data-motion="off"] :is(.kgQDzG_range, .kgQDzG_toggle, .kgQDzG_collapse), [data-motion="off"] :is(.kgQDzG_range, .kgQDzG_toggle, .kgQDzG_collapse) * {
  transition: none !important;
  animation: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .kgQDzG_range, .kgQDzG_toggle, .kgQDzG_collapse, .kgQDzG_range *, .kgQDzG_toggle *, .kgQDzG_collapse * {
    transition: none !important;
    animation: none !important;
  }
}

@media (forced-colors: active) {
  .kgQDzG_range .kgQDzG_input {
    opacity: 1;
    position: relative;
  }

  .kgQDzG_rail {
    display: none;
  }

  .kgQDzG_toggleTrack {
    border: 1px solid buttontext;
  }

  .kgQDzG_toggleTrack > span {
    background: buttontext;
  }

  .kgQDzG_toggle > input:checked + .kgQDzG_toggleTrack {
    background: highlight;
  }
}
`};var un=require("react/jsx-runtime"),ss=$n.text;function Kt({value:e,defaultValue:n=0,min:t=0,max:o=100,disabled:i,onChange:r,onPointerDown:s,onPointerUp:a,onPointerCancel:d,onLostPointerCapture:l,className:u="",style:p,...f}){let[m,b]=(0,qt.useState)(n),[v,w]=(0,qt.useState)(!1);(0,qt.useEffect)(()=>{i&&w(!1)},[i]);let k=Number(e??m),z=Number(t),H=Number(o),B=H>z&&Number.isFinite(k)?Math.max(0,Math.min(1,(k-z)/(H-z))):0,O=I=>E=>{w(!1),I?.(E)};return(0,un.jsxs)("span",{className:$n.range,"data-whale-motion-range":!0,"data-dragging":v&&!i||void 0,"data-disabled":i||void 0,style:{"--whale-range-position":`${B*100}%`},children:[(0,un.jsxs)("span",{className:$n.rail,"aria-hidden":"true",children:[(0,un.jsx)("span",{className:$n.fill}),(0,un.jsx)("span",{className:$n.thumb})]}),(0,un.jsx)("input",{...f,className:`${$n.input} ${u}`,style:p,type:"range",min:t,max:o,value:e??m,disabled:i,onChange:I=>{i||(e===void 0&&b(I.target.value),r?.(I))},onPointerDown:I=>{i||w(!0),s?.(I)},onPointerUp:O(a),onPointerCancel:O(d),onLostPointerCapture:O(l),onBlur:I=>{w(!1),f.onBlur?.(I)}})]})}function as({open:e,children:n,className:t="",...o}){return(0,un.jsx)("div",{...o,className:`${$n.collapse} ${t}`,"data-open":!!e,"aria-hidden":!e,inert:e?void 0:"",children:(0,un.jsx)("div",{className:$n.collapseInner,children:n})})}function Jt({label:e,checked:n,disabled:t,onChange:o,...i}){return(0,un.jsxs)("label",{className:$n.toggle,"data-disabled":t||void 0,children:[(0,un.jsx)("input",{...i,type:"checkbox",role:"switch",checked:n,disabled:t,onChange:r=>o?.(r.target.checked)}),(0,un.jsx)("span",{className:$n.toggleTrack,"aria-hidden":"true",children:(0,un.jsx)("span",{})}),(0,un.jsx)("span",{children:e})]})}function cs(e,{onReady:n,onError:t,visible:o=()=>!0,schedule:i=setTimeout,unschedule:r=clearTimeout}={}){let s=!1,a=!1,d=!1,l=null,u=0,p=null,f=()=>{l!==null&&r(l),l=null},m=async()=>{if(!(s||a||d||!o())){f(),a=!0;try{let b=await e();if(s){await b.dispose();return}try{n(b)}catch(v){throw await b.dispose(),v}p=b,d=!0,u=0}catch(b){if(s)return;t(b),u++,o()&&(l=i(()=>{l=null,m()},Math.min(3e4,750*2**Math.min(u-1,6))),l?.unref?.())}finally{a=!1}}};return{start:m,visibilityChanged(){o()?m():f()},refresh(){m()},dispose(){s=!0,f(),p?.dispose()}}}function Qt(e){return e===null||e&&typeof e=="object"&&!Array.isArray(e)&&Object.keys(e).sort().join(",")==="backend,id,name"&&["winmm","portaudio"].includes(e.backend)&&typeof e.id=="string"&&e.id.length>0&&e.id.length<=1024&&typeof e.name=="string"&&e.name.trim().length>0&&e.name.length<=256&&!/[\u0000-\u001f\u007f]/.test(e.id+e.name)}function ls(e){return e&&e.schema===1&&["input","output"].every(n=>{let t=e[n];return!t||!["available","empty","unavailable"].includes(t.status)||!Array.isArray(t.items)||t.items.length>128||!(t.reason===null||typeof t.reason=="string"&&t.reason.length<=128)?!1:t.items.every(o=>o!==null&&Qt(o))&&new Set(t.items.map(o=>o.backend+":"+o.id)).size===t.items.length&&(t.status==="available"?t.items.length>0:t.items.length===0)})}var Tt=Object.freeze(["ptt","always","wake"]),Ao=e=>({ptt:"pttMode",always:"alwaysMode",wake:"wakeMode"})[e]??"modeUnknown",us=e=>["waiting","listening"].includes(e?.state)&&e?.streamOpen!==!0?"unknown":{disabled:"wakeDisabled",starting:"wakeStarting",waiting:"wakeWaiting",listening:"wakeListening",paused:"wakePaused",error:"wakeError"}[e?.state]??"unknown",ds=e=>e!==null&&typeof e=="object"&&!Array.isArray(e)&&["disabled","starting","waiting","listening","paused","error"].includes(e.state)&&(e.deadlineAt===null||Number.isFinite(e.deadlineAt)&&e.deadlineAt>=0)&&typeof e.streamOpen=="boolean"&&["asr-after-utterance","acoustic-after-utterance"].includes(e.detection),ps=e=>[...new Set(String(e).split(/[,，\n]/).map(n=>n.trim()).filter(Boolean))],Oo=e=>Array.isArray(e)&&e.length>=1&&e.length<=8&&new Set(e.map(n=>typeof n=="string"?n.toLowerCase():n)).size===e.length&&e.every(n=>typeof n=="string"&&n.trim()===n&&n.length>=2&&n.length<=24&&!/[\p{C}]/u.test(n)&&/[\p{L}\p{N}]/u.test(n));function ms(e){if(!e||typeof e!="object"||Array.isArray(e)||!["unknown","available","empty","unavailable"].includes(e.status)||!Array.isArray(e.items)||e.items.length>128)return!1;if(e.status==="unknown")return e.observedAt===null&&e.items.length===0;if(!Number.isFinite(e.observedAt)||e.observedAt<0)return!1;if(e.status!=="available")return e.items.length===0;let n=new Set;return e.items.length>0&&e.items.every(t=>!t||typeof t!="object"||Array.isArray(t)||!Number.isSafeInteger(t.index)||t.index<0||n.has(t.index)||typeof t.name!="string"||!t.name.trim()||t.name.length>256||/[\u0000-\u001f\u007f]/.test(t.name)?!1:(n.add(t.index),!0))}var ce={};is(ce,{BIGINT_FORMAT_RANGES:()=>Ro,CONSTANT_CATCH:()=>Ps,Class:()=>Ir,NUMBER_FORMAT_RANGES:()=>Xt,aborted:()=>Dn,allowsEval:()=>Hr,assert:()=>_p,assertEqual:()=>vp,assertIs:()=>wp,assertNever:()=>xp,assertNotEqual:()=>bp,assignProp:()=>vn,attachSchema:()=>eo,base64ToUint8Array:()=>xs,base64urlToUint8Array:()=>Bp,cached:()=>At,captureStackTrace:()=>Go,cleanEnum:()=>Zp,cleanRegex:()=>Yt,clone:()=>Rn,cloneDef:()=>Sp,codePointLength:()=>no,constantCatch:()=>ks,createTransparentProxy:()=>Ap,defineLazy:()=>Rr,defineLazyInternal:()=>ve,derived:()=>Vp,esc:()=>Dr,escapeRegex:()=>Wn,explicitlyAborted:()=>Fr,extend:()=>Gp,finalizeIssue:()=>Mn,floatSafeRemainder:()=>$r,getElementAtPath:()=>Ep,getEnumValues:()=>Ct,getLengthableOrigin:()=>to,getParsedType:()=>Np,getSizableOrigin:()=>ws,hexToUint8Array:()=>Up,hide:()=>Ho,installLazyProp:()=>Kp,isObject:()=>ht,isPlainObject:()=>rt,issue:()=>It,joinValues:()=>Io,jsonStringifyReplacer:()=>Nt,members:()=>jr,merge:()=>Rp,mergeDefs:()=>Ln,normalizeParams:()=>ie,nullish:()=>Gr,numKeys:()=>Cp,objectClone:()=>Pp,omit:()=>Ip,optionalKeys:()=>Br,own:()=>ot,parsedType:()=>Ur,partial:()=>Dp,pick:()=>Op,prefixIssues:()=>qn,primitiveTypes:()=>bs,promiseAllObject:()=>Tp,propertyKeyTypes:()=>Zr,randomString:()=>zp,rawShape:()=>Ot,required:()=>Mp,safeExtend:()=>$p,shallowClone:()=>vs,sizeCaps:()=>Mo,slugify:()=>Mr,stringifyPrimitive:()=>$o,toZod:()=>yp,uint8ArrayToBase64:()=>_s,uint8ArrayToBase64url:()=>Fp,uint8ArrayToHex:()=>jp,unwrapMessage:()=>zt});function vp(e){return e}function bp(e){return e}function yp(){return e=>e}function wp(e){}function xp(e){throw new Error("Unexpected value in exhaustive check")}function _p(e){}function Ct(e){let n=Object.values(e).filter(o=>typeof o=="number");return Object.entries(e).filter(([o,i])=>n.indexOf(+o)===-1).map(([o,i])=>i)}function Io(e,n="|"){return e.map(t=>$o(t)).join(n)}function Nt(e,n){return typeof n=="bigint"?n.toString():n}var Or=class{constructor(n){this._getter=n,this._value=void 0}get value(){let n=this._getter;return n!==void 0&&(this._value=n(),this._getter=void 0),this._value}};function At(e){return new Or(e)}function Gr(e){return e==null}function Yt(e){let n=e.startsWith("^")?1:0,t=e.endsWith("$")?e.length-1:e.length;return e.slice(n,t)}function $r(e,n){let t=e/n,o=Math.round(t),i=4*Number.EPSILON*Math.max(Math.abs(t),1);return Math.abs(t-o)<i?0:t-o}var fs=Symbol("evaluating");function Rr(e,n,t){let o;Object.defineProperty(e,n,{get(){if(o!==fs)return o===void 0&&(o=fs,o=t()),o},set(i){Object.defineProperty(e,n,{value:i})},configurable:!0})}function Pp(e){return Object.create(Object.getPrototypeOf(e),Object.getOwnPropertyDescriptors(e))}function vn(e,n,t){Object.defineProperty(e,n,{value:t,writable:!0,enumerable:!0,configurable:!0})}function Ot(e){let n=Object.getOwnPropertyDescriptor(e,"shape");return n?.get?n.get.raw:n?.value}function Vn(e){return Ot(e._zod.def)??e._zod.def.shape}function hs(e,n,t){Object.defineProperty(e,n,{get(){let o=t();return vn(this,n,o),o},enumerable:!0,configurable:!0})}function gs(e,n,t){n in e?vn(e,n,t):e[n]=t}function ft(e,n,t,o){let i=Vn(n);for(let r of t){let s=Object.getOwnPropertyDescriptor(i,r);s.enumerable&&(s.get?hs(e,r,()=>{let a=n._zod.def.shape[r];return o?o(a,r):a}):gs(e,r,o?o(s.value,r):s.value))}}function kp(e,n){for(let t of Reflect.ownKeys(n)){let o=Object.getOwnPropertyDescriptor(n,t);o.enumerable&&(o.get?hs(e,t,()=>n[t]):gs(e,t,o.value))}}function Ln(...e){let n={};for(let t of e){let o=Object.getOwnPropertyDescriptors(t);Object.assign(n,o)}return Object.defineProperties({},n)}function Sp(e){return Ln(e._zod.def)}function Ep(e,n){return n?n.reduce((t,o)=>t?.[o],e):e}function Tp(e){let n=Object.keys(e),t=n.map(o=>e[o]);return Promise.all(t).then(o=>{let i={};for(let r=0;r<n.length;r++)i[n[r]]=o[r];return i})}function zp(e=10){let n="abcdefghijklmnopqrstuvwxyz",t="";for(let o=0;o<e;o++)t+=n[Math.floor(Math.random()*n.length)];return t}function Dr(e){return JSON.stringify(e)}function Mr(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/[\s_-]+/g,"-").replace(/^-+|-+$/g,"")}var Go="captureStackTrace"in Error?Error.captureStackTrace:(...e)=>{};function ht(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}var Hr=At(()=>{if(dn.jitless||typeof navigator<"u"&&navigator?.userAgent?.includes("Cloudflare"))return!1;try{let e=Function;return new e(""),!0}catch{return!1}});function rt(e){if(ht(e)===!1)return!1;let n=e.constructor;if(n===void 0||typeof n!="function")return!0;let t=n.prototype;return!(ht(t)===!1||Object.prototype.hasOwnProperty.call(t,"isPrototypeOf")===!1)}function vs(e){return rt(e)?{...e}:Array.isArray(e)?[...e]:e instanceof Map?new Map(e):e instanceof Set?new Set(e):e}function Cp(e){let n=0;for(let t in e)Object.prototype.hasOwnProperty.call(e,t)&&n++;return n}var Np=e=>{let n=typeof e;switch(n){case"undefined":return"undefined";case"string":return"string";case"number":return Number.isNaN(e)?"nan":"number";case"boolean":return"boolean";case"function":return"function";case"bigint":return"bigint";case"symbol":return"symbol";case"object":return Array.isArray(e)?"array":e===null?"null":e.then&&typeof e.then=="function"&&e.catch&&typeof e.catch=="function"?"promise":typeof Map<"u"&&e instanceof Map?"map":typeof Set<"u"&&e instanceof Set?"set":typeof Date<"u"&&e instanceof Date?"date":typeof File<"u"&&e instanceof File?"file":"object";default:throw new Error(`Unknown data type: ${n}`)}},Zr=new Set(["string","number","symbol"]),bs=new Set(["string","number","bigint","boolean","symbol","undefined"]);function Wn(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Rn(e,n,t){let o=new e._zod.constr(n??e._zod.def);return(!n||t?.parent)&&(o._zod.parent=e),o}function ie(e){let n=e;if(!n)return{};if(typeof n=="string")return{error:()=>n};if(n?.message!==void 0){if(n?.error!==void 0)throw new Error("Cannot specify both `message` and `error` params");n.error=n.message}return delete n.message,typeof n.error=="string"?{...n,error:()=>n.error}:n}function Ap(e){let n;return new Proxy({},{get(t,o,i){return n??(n=e()),Reflect.get(n,o,i)},set(t,o,i,r){return n??(n=e()),Reflect.set(n,o,i,r)},has(t,o){return n??(n=e()),Reflect.has(n,o)},deleteProperty(t,o){return n??(n=e()),Reflect.deleteProperty(n,o)},ownKeys(t){return n??(n=e()),Reflect.ownKeys(n)},getOwnPropertyDescriptor(t,o){return n??(n=e()),Reflect.getOwnPropertyDescriptor(n,o)},defineProperty(t,o,i){return n??(n=e()),Reflect.defineProperty(n,o,i)}})}function $o(e){return typeof e=="bigint"?e.toString()+"n":typeof e=="string"?`"${e}"`:`${e}`}function Br(e){return Object.keys(e).filter(n=>e[n]._zod.optin!==void 0&&e[n]._zod.optout==="optional")}var Xt={safeint:[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],int32:[-2147483648,2147483647],uint32:[0,4294967295],float32:[-34028234663852886e22,34028234663852886e22],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]},Ro={int64:[BigInt("-9223372036854775808"),BigInt("9223372036854775807")],uint64:[BigInt(0),BigInt("18446744073709551615")]};function Op(e,n){let t=e._zod.def,o=t.checks;if(o&&o.length>0)throw new Error(".pick() cannot be used on object schemas containing refinements");let r={};return ft(r,e,Do(e,n)),Rn(e,Ln(t,{shape:r,checks:[]}))}function Do(e,n){let t=Vn(e),o=[];for(let i of Reflect.ownKeys(n)){if(!Object.getOwnPropertyDescriptor(t,i)?.enumerable)throw new Error(`Unrecognized key: "${String(i)}"`);n[i]&&o.push(i)}return o}function Ip(e,n){let t=e._zod.def,o=t.checks;if(o&&o.length>0)throw new Error(".omit() cannot be used on object schemas containing refinements");let r=new Set(Do(e,n)),s={};return ft(s,e,Reflect.ownKeys(Vn(e)).filter(a=>!r.has(a))),Rn(e,Ln(t,{shape:s,checks:[]}))}function Gp(e,n){if(!rt(n))throw new Error("Invalid input to extend: expected a plain object");let t=e._zod.def.checks;if(t&&t.length>0){let i=Vn(e);for(let r of Reflect.ownKeys(n))if(Object.getOwnPropertyDescriptor(i,r)!==void 0)throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.")}return Rn(e,Ln(e._zod.def,{shape:ys(e,n)}))}function ys(e,n){let t={};return ft(t,e,Reflect.ownKeys(Vn(e))),kp(t,n),t}function $p(e,n){if(!rt(n))throw new Error("Invalid input to safeExtend: expected a plain object");return Rn(e,Ln(e._zod.def,{shape:ys(e,n)}))}function Rp(e,n){if(!n?._zod?.def)throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");if(e._zod.def.checks?.length)throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");let t={};ft(t,e,Reflect.ownKeys(Vn(e))),ft(t,n,Reflect.ownKeys(Vn(n)));let o=Ln(e._zod.def,{shape:t,get catchall(){return n._zod.def.catchall},checks:n._zod.def.checks??[]});return Rn(e,o)}function Dp(e,n,t,o="partial"){let r=n._zod.def.checks;if(r&&r.length>0)throw new Error(`.${o}() cannot be used on object schemas containing refinements`);let a=t?new Set(Do(n,t)):void 0,d={};return ft(d,n,Reflect.ownKeys(Vn(n)),e&&((l,u)=>a&&!a.has(u)?l:new e({type:"optional",innerType:l}))),Rn(n,Ln(n._zod.def,{shape:d,checks:[]}))}function Mp(e,n,t){let o=t?new Set(Do(n,t)):void 0,i={};return ft(i,n,Reflect.ownKeys(Vn(n)),(r,s)=>o&&!o.has(s)?r:new e({type:"nonoptional",innerType:r})),Rn(n,Ln(n._zod.def,{shape:i}))}function Dn(e,n=0){if(e.aborted===!0)return!0;for(let t=n;t<e.issues.length;t++)if(e.issues[t]?.continue!==!0)return!0;return!1}function Fr(e,n=0){if(e.aborted===!0)return!0;for(let t=n;t<e.issues.length;t++)if(e.issues[t]?.continue===!1)return!0;return!1}function qn(e,n){return n.map(t=>{var o;return(o=t).path??(o.path=[]),t.path.unshift(e),t})}function zt(e){return typeof e=="string"?e:e?.message}function Mo(e){let n=[];for(let t of e??[]){let o=t._zod.def;if(!/_(length|size)$|_equals$/.test(o.check))break;let i=o.maximum??o.length??o.size;i>=0&&n.push([i,t])}return n}function eo(e,n,t){var o;for(let i=n;i<e.length;i++)(o=e[i]).schema??(o.schema=t)}function Mn(e,n,t){var o;let i=e.inst?._zod?.traits;i?.has("$ZodType")&&(i.has("$ZodCheck")?(o=e).schema??(o.schema=e.inst):e.schema=e.inst);let r=e.schema!==e.inst?e.schema?._zod.def?.error:void 0,s=e.message?e.message:zt(e.inst?._zod.def?.error?.(e))??zt(r?.(e))??zt(n?.error?.(e))??zt(t.customError?.(e))??zt(t.localeError?.(e))??"Invalid input",a={};for(let d of Object.keys(e))d==="inst"||d==="schema"||d==="continue"||d==="input"||d==="__proto__"||(a[d]=e[d]);return a.path??(a.path=[]),a.message=s,n?.reportInput&&(a.input=e.input),a}function ws(e){return e instanceof Set?"set":e instanceof Map?"map":e instanceof File?"file":"unknown"}var Hp=/[\uD800-\uDBFF]/;function no(e){let n=e.length;if(!Hp.test(e))return n;let t=n;for(let o=0;o<n-1;o++)(e.charCodeAt(o)&64512)===55296&&(e.charCodeAt(o+1)&64512)===56320&&(t--,o++);return t}function to(e){return Array.isArray(e)?"array":typeof e=="string"?"string":"unknown"}function Ur(e){let n=typeof e;switch(n){case"number":return Number.isNaN(e)?"nan":"number";case"object":{if(e===null)return"null";if(Array.isArray(e))return"array";let t=e;if(t&&Object.getPrototypeOf(t)!==Object.prototype&&"constructor"in t&&t.constructor)return t.constructor.name}}return n}function It(...e){let[n,t,o]=e;return typeof n=="string"?{message:n,code:"custom",input:t,inst:o}:{...n}}function Zp(e){return Object.entries(e).filter(([n,t])=>Number.isNaN(Number.parseInt(n,10))).map(n=>n[1])}function xs(e){let n=atob(e),t=new Uint8Array(n.length);for(let o=0;o<n.length;o++)t[o]=n.charCodeAt(o);return t}function _s(e){let n="";for(let t=0;t<e.length;t++)n+=String.fromCharCode(e[t]);return btoa(n)}function Bp(e){let n=e.replace(/-/g,"+").replace(/_/g,"/"),t="=".repeat((4-n.length%4)%4);return xs(n+t)}function Fp(e){return _s(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}function Up(e){let n=e.replace(/^0x/,"");if(n.length%2!==0)throw new Error("Invalid hex string length");let t=new Uint8Array(n.length/2);for(let o=0;o<n.length;o+=2)t[o/2]=Number.parseInt(n.slice(o,o+2),16);return t}function jp(e){return Array.from(e).map(n=>n.toString(16).padStart(2,"0")).join("")}var Ir=class{constructor(...n){}};function jr(e,n){for(let t in n){let o=Object.getOwnPropertyDescriptor(n,t);o.get?Object.defineProperty(e,t,{...o,enumerable:!1}):Lp(e,t,o.value)}}function ot(e,n,t,o=!0){return Object.defineProperty(e,n,{configurable:!0,writable:!0,enumerable:o,value:t}),t}function Ho(e,n,t){return ot(e,n,t,!1)}function Vp(e,n){for(let t in e){let o=e[t];Object.defineProperty(n,t,{configurable:!0,enumerable:!0,get(){return ot(this,t,o(this))},set(i){ot(this,t,i)}})}return n}function Lp(e,n,t){Object.defineProperty(e,n,{configurable:!0,get(){return this==null?t:ot(this,n,t.bind(this))},set(o){ot(this,n,o)}})}function Wp(e,n){let t=Object.getPrototypeOf(e);return n in t?void 0:t}var Ar,tt=!1,qp={configurable:!0,get(){tt=!0}};function ve(e,n,t){let o=Object.getPrototypeOf(e._zod);if(n in o&&Ar!==e._zod){Ar=void 0;return}Ar=e._zod,Object.defineProperty(o,n,{configurable:!0,get(){Object.defineProperty(this,n,qp);let i=tt;tt=!1;try{let r=t(this);return tt?delete this[n]:Object.defineProperty(this,n,{configurable:!0,writable:!0,value:r}),tt=tt||i,r}catch(r){throw delete this[n],tt=tt||i,r}},set(i){Object.defineProperty(this,n,{configurable:!0,writable:!0,value:i})}})}function Kp(e,n,t,o){let i=Wp(e,n);i&&Object.defineProperty(i,n,{configurable:!0,get(){let r={configurable:!0,writable:!0,enumerable:o,value:void 0};return Object.defineProperty(this,n,r),r.value=t(this),Object.defineProperty(this,n,r),r.value},set(r){Object.defineProperty(this,n,{configurable:!0,writable:!0,enumerable:o,value:r})}})}var Ps="~constantCatch";function ks(e){let n=()=>e;return n[Ps]=!0,n}var Ss;var Vr={value:void 0,enumerable:!1},Es="captureStackTrace"in Error?Error:null;function Jp(e){let n=Es;if(n){let t=n.stackTraceLimit;if(typeof t=="number"){try{n.stackTraceLimit=0}catch{return Es=null,new e}try{return new e}finally{n.stackTraceLimit=t}}}return new e}function $(e,n,t,o){let i={};function r(f){this.def=f,this.constr=p,this.traits=new Set}r.prototype=i;let s=t,a=s&&new WeakSet;function d(f,m){if(f._zod){if(f._zod.traits.has(e))return}else{Vr.value=new r(m);try{Object.defineProperty(f,"_zod",Vr)}finally{Vr.value=void 0}}if(f._zod.traits.add(e),n(f,m),a){let v=Object.getPrototypeOf(f),w=f._zod.constr.prototype,k=v;for(;k&&k!==w;)k=Object.getPrototypeOf(k);let z=k??v;a.has(z)||(a.add(z),jr(z,s))}let b=p.prototype;for(let v in b)Object.prototype.hasOwnProperty.call(b,v)&&(v in f||(f[v]=b[v].bind(f)))}let l=o?.Parent??Object;class u extends l{}Object.defineProperty(u,"name",{value:e});function p(f){let m=o?.Parent?Jp(u):this;d(m,f);let b=m._zod.deferred;if(b){for(let w of b)w();m._zod.deferred=void 0}let v=globalThis.__zod_globalConfig?.postProcessor;return v&&v(m),m}return Object.defineProperty(p,"init",{value:d}),Object.defineProperty(p,Symbol.hasInstance,{value:f=>o?.Parent&&f instanceof o.Parent?!0:f?._zod?.traits?.has(e)}),Object.defineProperty(p,"name",{value:e}),p}var Hn=class extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}},Gt=class extends Error{constructor(n){super(`Encountered unidirectional transform during encode: ${n}`),this.name="ZodEncodeError"}};(Ss=globalThis).__zod_globalConfig??(Ss.__zod_globalConfig={});var dn=globalThis.__zod_globalConfig;function bn(e){return e&&Object.assign(dn,e),dn}function Qp(){let e=this._zod;return e.message??(e.message=JSON.stringify(e.def,Nt,2)),e.message}function Yp(e){this._zod.message=e}var Xp={get:Qp,set:Yp,enumerable:!0,configurable:!0},Wr={value:void 0,enumerable:!1},Ts=new WeakSet([Object.prototype,Error.prototype]),zs=(e,n)=>{e.name="$ZodError",Wr.value=n,Object.defineProperty(e,"issues",Wr),Wr.value=void 0,Object.defineProperty(e,"message",Xp);let t=Object.getPrototypeOf(e);Ts.has(t)||(Ts.add(t),Object.defineProperty(t,"toString",{configurable:!0,enumerable:!1,get(){let o=()=>this.message;return Object.defineProperty(this,"toString",{value:o,configurable:!0,writable:!0}),o},set(o){Object.defineProperty(this,"toString",{value:o,configurable:!0,writable:!0})}}))},Cs=$("$ZodError",zs),Lg=$("$ZodError",zs,void 0,{Parent:Error});function em(e,n,t){return Object.prototype.hasOwnProperty.call(e,n)||(n==="__proto__"?Object.defineProperty(e,n,{value:t(),writable:!0,enumerable:!0,configurable:!0}):e[n]=t()),e[n]}function Ns(e,n=t=>t.message){let t={},o=[];for(let i of e.issues)i.path.length>0?em(t,i.path[0],()=>[]).push(n(i)):o.push(n(i));return{formErrors:o,fieldErrors:t}}function As(e,n=t=>t.message){let t={_errors:[]},o=(i,r=[])=>{for(let s of i.issues)if(s.code==="invalid_union"&&s.errors.length)s.errors.map(a=>o({issues:a},[...r,...s.path]));else if(s.code==="invalid_key")o({issues:s.issues},[...r,...s.path]);else if(s.code==="invalid_element")o({issues:s.issues},[...r,...s.path]);else{let a=[...r,...s.path];if(a.length===0)t._errors.push(n(s));else{let d=t,l=0;for(;l<a.length;){let u=a[l],p=l===a.length-1;if(u==="_errors"){p&&d._errors.push(n(s)),l++;continue}Object.prototype.hasOwnProperty.call(d,u)||Object.defineProperty(d,u,{value:{_errors:[]},enumerable:!0,writable:!0,configurable:!0});let f=d[u];p&&f._errors.push(n(s)),d=f,l++}}}};return o(e),t}function Zo(e,n){return{callee:n?.callee??e,Err:n?.Err}}var Bo=e=>{let n=(t,o,i,r)=>{let s=i?{...i,async:!1}:{async:!1},a=t._zod.run({value:o,issues:[]},s);if(a instanceof Promise)throw new Hn;if(a.issues.length){let d=new(r?.Err??e)(a.issues.map(l=>Mn(l,s,bn())));throw Go(d,r?.callee??n),d}return a.value};return n};var Fo=e=>{let n=async(t,o,i,r)=>{let s=i?{...i,async:!0}:{async:!0},a=t._zod.run({value:o,issues:[]},s);if(a instanceof Promise&&(a=await a),a.issues.length){let d=new(r?.Err??e)(a.issues.map(l=>Mn(l,s,bn())));throw Go(d,r?.callee??n),d}return a.value};return n};var Uo=e=>(n,t,o)=>{let i=o?{...o,async:!1}:{async:!1},r=n._zod.run({value:t,issues:[]},i);if(r instanceof Promise)throw new Hn;return r.issues.length?Os(e,r.issues,i):{success:!0,data:r.value}};function Os(e,n,t){let o;return{success:!1,get error(){return o||(o=new e(n.map(i=>Mn(i,t,bn()))),n=void 0,t=void 0),o},set error(i){o=i,n=void 0,t=void 0}}}var jo=e=>async(n,t,o)=>{let i=o?{...o,async:!0}:{async:!0},r=n._zod.run({value:t,issues:[]},i);return r instanceof Promise&&(r=await r),r.issues.length?Os(e,r.issues,i):{success:!0,data:r.value}};var nm=Symbol.for("zod.compile.invalid"),tm=Symbol.for("zod.compile.fallback"),qr=((e,n,t)=>{let o=e._zod.bag.validator;if(o!==void 0){if(o(n)!==nm)return!0;if(o.definite===!0&&t===void 0)return!1}return om(e,n,t)});function om(e,n,t){let o=t?{...t,async:!1,abortEarly:!0}:{async:!1,abortEarly:!0},i=e._zod.bag.fallbackRun,r;if(i?(o[tm]=!0,r=i({value:n,issues:[]},o)):r=e._zod.run({value:n,issues:[]},o),r instanceof Promise)throw new Hn;return r.issues.length===0}var Kr=async(e,n,t)=>{let o=t?{...t,async:!0,abortEarly:!0}:{async:!0,abortEarly:!0},i=e._zod.run({value:n,issues:[]},o);return i instanceof Promise&&(i=await i),i.issues.length===0},Is=e=>{let n=Bo(e),t=(o,i,r,s)=>{let a=r?{...r,direction:"backward"}:{direction:"backward"};return n(o,i,a,Zo(t,s))};return t};var Gs=e=>{let n=Bo(e),t=(o,i,r,s)=>n(o,i,r,Zo(t,s));return t};var $s=e=>{let n=Fo(e),t=async(o,i,r,s)=>{let a=r?{...r,direction:"backward"}:{direction:"backward"};return await n(o,i,a,Zo(t,s))};return t};var Rs=e=>{let n=Fo(e),t=async(o,i,r,s)=>await n(o,i,r,Zo(t,s));return t};var Ds=e=>(n,t,o)=>{let i=o?{...o,direction:"backward"}:{direction:"backward"};return Uo(e)(n,t,i)};var Ms=e=>(n,t,o)=>Uo(e)(n,t,o);var Hs=e=>async(n,t,o)=>{let i=o?{...o,direction:"backward"}:{direction:"backward"};return jo(e)(n,t,i)};var Zs=e=>async(n,t,o)=>jo(e)(n,t,o);var Bs=/^[cC][0-9a-z]{6,}$/,Fs=/^[0-9a-z]+$/,Us=/^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/,js=/^[0-9a-vA-V]{20}$/,Vs=/^[A-Za-z0-9]{27}$/,Ls=/^[a-zA-Z0-9_-]{21}$/;function Ws(e){return new RegExp(`^[a-zA-Z0-9_-]{${e}}$`)}var qs=/^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;var Ks=/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,Qr=e=>e?new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`):/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;var Js=/^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;var rm="^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";function Qs(){return new RegExp(rm,"u")}var Ys=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,Xs=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;var ea=/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,na=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,ta=/^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,oa=/^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/;var ra=/^https?$/,ia=/^\+[1-9]\d{6,14}$/;var sa="(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";function im(e){return new RegExp(`^${e}$`)}var aa=im(sa);function Jr(e){let n="(?:[01]\\d|2[0-3]):[0-5]\\d";return typeof e.precision=="number"?e.precision===-1?`${n}`:e.precision===0?`${n}:[0-5]\\d`:`${n}:[0-5]\\d\\.\\d{${e.precision}}`:e.seconds?`${n}:[0-5]\\d(?:\\.\\d+)?`:`${n}(?::[0-5]\\d(?:\\.\\d+)?)?`}function ca(e){return new RegExp(`^${Jr(e)}$`)}function la(e){let n=["Z"];e.offset&&n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");let t=`${Jr({precision:e.precision,seconds:!0})}(?:${n.join("|")})`,o=e.local?`${t}|${Jr({precision:e.precision})}`:t;return new RegExp(`^${sa}T(?:${o})$`)}var ua=/^[\s\S]{0,}$/;var Yr=/^-?\d+$/,oo=/^-?\d+(?:\.\d+)?$/,da=/^(?:true|false)$/i,pa=/^null$/i;var ma=/^[^A-Z]*$/,fa=/^[^a-z]*$/;var en=$("$ZodCheck",(e,n)=>{var t;e._zod??(e._zod={}),e._zod.def=n,(t=e._zod).onattach??(t.onattach=[])});var Xr=e=>{let n=e.value;return!Gr(n)&&n.length!==void 0},Vo={number:"number",bigint:"bigint",object:"date"},ei=$("$ZodCheckLessThan",(e,n)=>{en.init(e,n);let t=Vo[typeof n.value];e._zod.check=o=>{(n.inclusive?o.value<=n.value:o.value<n.value)||o.issues.push({origin:Vo[typeof o.value]??t,code:"too_big",maximum:typeof n.value=="object"?n.value.getTime():n.value,input:o.value,inclusive:n.inclusive,inst:e,continue:!n.abort})}}),ni=$("$ZodCheckGreaterThan",(e,n)=>{en.init(e,n);let t=Vo[typeof n.value];e._zod.check=o=>{(n.inclusive?o.value>=n.value:o.value>n.value)||o.issues.push({origin:Vo[typeof o.value]??t,code:"too_small",minimum:typeof n.value=="object"?n.value.getTime():n.value,input:o.value,inclusive:n.inclusive,inst:e,continue:!n.abort})}}),ha=$("$ZodCheckMultipleOf",(e,n)=>{en.init(e,n),e._zod.check=t=>{if(typeof t.value!=typeof n.value)throw new Error("Cannot mix number and bigint in multiple_of check.");(typeof t.value=="bigint"?n.value!==BigInt(0)&&t.value%n.value===BigInt(0):$r(t.value,n.value)===0)||t.issues.push({origin:typeof t.value,code:"not_multiple_of",divisor:n.value,input:t.value,inst:e,continue:!n.abort})}}),ga=$("$ZodCheckNumberFormat",(e,n)=>{en.init(e,n),n.format=n.format||"float64";let t=n.format?.includes("int"),o=t?"int":"number",[i,r]=Xt[n.format];e._zod.check=s=>{let a=s.value;if(t){if(!Number.isInteger(a)){s.issues.push({expected:o,format:n.format,code:"invalid_type",continue:!1,input:a,inst:e});return}if(!Number.isSafeInteger(a)){a>0?s.issues.push({input:a,code:"too_big",maximum:Number.MAX_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:o,inclusive:!0,continue:!n.abort}):s.issues.push({input:a,code:"too_small",minimum:Number.MIN_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:o,inclusive:!0,continue:!n.abort});return}}a<i&&s.issues.push({origin:"number",input:a,code:"too_small",minimum:i,inclusive:!0,inst:e,continue:!n.abort}),a>r&&s.issues.push({origin:"number",input:a,code:"too_big",maximum:r,inclusive:!0,inst:e,continue:!n.abort})}});var va=$("$ZodCheckMaxLength",(e,n)=>{var t;en.init(e,n),(t=e._zod.def).when??(t.when=Xr),e._zod.check=o=>{let i=o.value,r=i.length;if((typeof i=="string"&&r>n.maximum?no(i):r)<=n.maximum)return;let a=to(i);o.issues.push({origin:a,code:"too_big",maximum:n.maximum,inclusive:!0,input:i,inst:e,continue:!n.abort})}}),ba=$("$ZodCheckMinLength",(e,n)=>{var t;en.init(e,n),(t=e._zod.def).when??(t.when=Xr),e._zod.check=o=>{let i=o.value,r=i.length;if((typeof i=="string"&&r>=n.minimum&&r<n.minimum*2?no(i):r)>=n.minimum)return;let a=to(i);o.issues.push({origin:a,code:"too_small",minimum:n.minimum,inclusive:!0,input:i,inst:e,continue:!n.abort})}}),ya=$("$ZodCheckLengthEquals",(e,n)=>{var t;en.init(e,n),(t=e._zod.def).when??(t.when=Xr),e._zod.check=o=>{let i=o.value,r=i.length,s=typeof i=="string"&&r>=n.length&&r<=n.length*2?no(i):r;if(s===n.length)return;let a=to(i),d=s>n.length;o.issues.push({origin:a,...d?{code:"too_big",maximum:n.length}:{code:"too_small",minimum:n.length},inclusive:!0,exact:!0,input:o.value,inst:e,continue:!n.abort})}}),io=$("$ZodCheckStringFormat",(e,n)=>{var t,o;en.init(e,n),n.pattern?(t=e._zod).check??(t.check=i=>{n.pattern.lastIndex=0,!n.pattern.test(i.value)&&i.issues.push({origin:"string",code:"invalid_format",format:n.format,input:i.value,...n.pattern?{pattern:n.pattern.toString()}:{},inst:e,continue:!n.abort})}):(o=e._zod).check??(o.check=()=>{})}),wa=$("$ZodCheckRegex",(e,n)=>{io.init(e,n),e._zod.check=t=>{n.pattern.lastIndex=0,!n.pattern.test(t.value)&&t.issues.push({origin:"string",code:"invalid_format",format:"regex",input:t.value,pattern:n.pattern.toString(),inst:e,continue:!n.abort})}}),xa=$("$ZodCheckLowerCase",(e,n)=>{n.pattern??(n.pattern=ma),io.init(e,n)}),_a=$("$ZodCheckUpperCase",(e,n)=>{n.pattern??(n.pattern=fa),io.init(e,n)}),Pa=$("$ZodCheckIncludes",(e,n)=>{en.init(e,n);let t=Wn(n.includes),o=new RegExp(typeof n.position=="number"?`^.{${n.position},}${t}`:t);n.pattern=o,e._zod.check=i=>{i.value.includes(n.includes,n.position)||i.issues.push({origin:"string",code:"invalid_format",format:"includes",includes:n.includes,input:i.value,inst:e,continue:!n.abort})}}),ka=$("$ZodCheckStartsWith",(e,n)=>{en.init(e,n);let t=new RegExp(`^${Wn(n.prefix)}.*`);n.pattern??(n.pattern=t),e._zod.check=o=>{o.value.startsWith(n.prefix)||o.issues.push({origin:"string",code:"invalid_format",format:"starts_with",prefix:n.prefix,input:o.value,inst:e,continue:!n.abort})}}),Sa=$("$ZodCheckEndsWith",(e,n)=>{en.init(e,n);let t=new RegExp(`.*${Wn(n.suffix)}$`);n.pattern??(n.pattern=t),e._zod.check=o=>{o.value.endsWith(n.suffix)||o.issues.push({origin:"string",code:"invalid_format",format:"ends_with",suffix:n.suffix,input:o.value,inst:e,continue:!n.abort})}});var Ea=$("$ZodCheckOverwrite",(e,n)=>{en.init(e,n),e._zod.check=t=>{t.value=n.tx(t.value)}});var Lo=class{constructor(n=[],t={}){this.content=[],this.indent=0,this.args=n,this.closed=t}indented(n){this.indent+=1;try{n(this)}finally{this.indent-=1}}write(n){if(typeof n=="function"){n(this,{execution:"sync"}),n(this,{execution:"async"});return}let o=n.split(`
`).filter(s=>s),i=Math.min(...o.map(s=>s.length-s.trimStart().length)),r=o.map(s=>s.slice(i)).map(s=>" ".repeat(this.indent*2)+s);for(let s of r)this.content.push(s)}compile(){let n=Function,t=this?.content??[""];return new n(...Object.keys(this.closed),`return function (${this.args.join(", ")}) {
${t.join(`
`)}
};`)(...Object.values(this.closed))}};var za={major:4,minor:6,patch:7};var Te=$("$ZodType",(e,n)=>{var t;e??(e={}),e._zod.def=n,e._zod.bag=e._zod.bag||{},e._zod.version=za;let o=e._zod.def.checks,i=e._zod.traits.has("$ZodCheck")?[e,...o??[]]:o?.length?[...o]:[];for(let r of i)for(let s of r._zod.onattach)s(e);if(i.length===0)(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{let r=(a,d,l)=>{if(a.memo)return a;let u=Dn(a),p;for(let f of d){if(f._zod.def.when){if(Fr(a)||!f._zod.def.when(a))continue}else if(u)continue;let m=a.issues.length,b=f._zod.check(a);if(b instanceof Promise&&l?.async===!1)throw new Hn;if(p||b instanceof Promise)p=(p??Promise.resolve()).then(async()=>{await b,a.issues.length!==m&&(eo(a.issues,m,e),u||(u=Dn(a,m)))});else{if(a.issues.length===m)continue;eo(a.issues,m,e),u||(u=Dn(a,m))}}return p?p.then(()=>a):a},s=(a,d,l)=>{if(Dn(a))return a.aborted=!0,a;let u=r(d,i,l);if(u instanceof Promise){if(l.async===!1)throw new Hn;return u.then(p=>e._zod.parse(p,l))}return e._zod.parse(u,l)};e._zod.run=(a,d)=>{if(d.skipChecks)return e._zod.parse(a,d);if(d.direction==="backward"){let u=e._zod.parse({value:a.value,issues:[]},{...d,skipChecks:!0});return u instanceof Promise?u.then(p=>s(p,a,d)):s(u,a,d)}let l=e._zod.parse(a,d);if(l instanceof Promise){if(d.async===!1)throw new Hn;return l.then(u=>r(u,i,d))}return r(l,i,d)}}},{get"~standard"(){return Ho(this,"~standard",oi(this))},set"~standard"(e){ot(this,"~standard",e)}}),Ha=(e,n)=>e.issues.length?{issues:e.issues.map(t=>Mn(t,n,bn()))}:{value:e.value};async function sm(e,n){let t={async:!0};return Ha(await e._zod.run({value:n,issues:[]},t),t)}function oi(e){return{validate:n=>{let t={async:!1};try{let o=e._zod.run({value:n,issues:[]},t);if(!(o instanceof Promise))return Ha(o,t)}catch{}return sm(e,n)},vendor:"zod",version:1}}var Jo=$("$ZodString",(e,n)=>{Te.init(e,n),e._zod.pattern=n.pattern??ua,e._zod.parse=(t,o)=>{if(n.coerce)try{t.value=String(t.value)}catch{}return typeof t.value=="string"||t.issues.push({expected:"string",code:"invalid_type",input:t.value,inst:e}),t}}),Ae=$("$ZodStringFormat",(e,n)=>{io.init(e,n),Jo.init(e,n)}),Za=$("$ZodGUID",(e,n)=>{n.pattern??(n.pattern=Ks),Ae.init(e,n)}),Ba=$("$ZodUUID",(e,n)=>{if(n.version){let o={v1:1,v2:2,v3:3,v4:4,v5:5,v6:6,v7:7,v8:8}[n.version];if(o===void 0)throw new Error(`Invalid UUID version: "${n.version}"`);n.pattern??(n.pattern=Qr(o))}else n.pattern??(n.pattern=Qr());Ae.init(e,n)}),Fa=$("$ZodEmail",(e,n)=>{n.pattern??(n.pattern=Js),Ae.init(e,n)}),Ua=1,qo=2;function ja(e){try{return typeof URL<"u"&&typeof URL.canParse=="function"?URL.canParse(e):(new URL(e),!0)}catch{return!1}}function am(e,n){return!("normalize"in n)&&!("hostname"in n)&&!("protocol"in n)?ja(e)||qo:cm(e,n)}function cm(e,n){if(!n.normalize&&n.protocol?.source===ra.source&&!/^https?:\/\//i.test(e))return Ua;try{if(typeof URL<"u"){let t=URL;if(typeof t.parse=="function")return t.parse(e)??qo}return new URL(e)}catch{return qo}}var lm=/[\t\n\r]/g;function Ca(e){return e.replace(lm,"")}function um(e,n){return n.lastIndex=0,n.test(e.hostname)}function dm(e,n){return n.lastIndex=0,n.test(e.protocol.endsWith(":")?e.protocol.slice(0,-1):e.protocol)}var Va=$("$ZodURL",(e,n)=>{Ae.init(e,n),e._zod.check=t=>{try{let o=t.value.trim(),i=am(o,n);if(i===Ua){t.issues.push({code:"invalid_format",format:"url",note:"Invalid URL format",input:t.value,inst:e,continue:!n.abort});return}if(i===qo){t.issues.push({code:"invalid_format",format:"url",input:t.value,inst:e,continue:!n.abort});return}if(i===!0){t.value=Ca(o);return}n.hostname&&!um(i,n.hostname)&&t.issues.push({code:"invalid_format",format:"url",note:"Invalid hostname",pattern:n.hostname.source,input:t.value,inst:e,continue:!n.abort}),n.protocol&&!dm(i,n.protocol)&&t.issues.push({code:"invalid_format",format:"url",note:"Invalid protocol",pattern:n.protocol.source,input:t.value,inst:e,continue:!n.abort}),t.value=n.normalize?i.href:Ca(o);return}catch{t.issues.push({code:"invalid_format",format:"url",input:t.value,inst:e,continue:!n.abort})}}}),La=$("$ZodEmoji",(e,n)=>{n.pattern??(n.pattern=Qs()),Ae.init(e,n)}),Wa=$("$ZodNanoID",(e,n)=>{if(n.length!==void 0&&(!Number.isInteger(n.length)||n.length<1))throw new Error(`Invalid nanoid length: ${n.length}`);n.pattern??(n.pattern=n.length===void 0?Ls:Ws(n.length)),Ae.init(e,n)}),qa=$("$ZodCUID",(e,n)=>{n.pattern??(n.pattern=Bs),Ae.init(e,n)}),Ka=$("$ZodCUID2",(e,n)=>{n.pattern??(n.pattern=Fs),Ae.init(e,n)}),Ja=$("$ZodULID",(e,n)=>{n.pattern??(n.pattern=Us),Ae.init(e,n)}),Qa=$("$ZodXID",(e,n)=>{n.pattern??(n.pattern=js),Ae.init(e,n)}),Ya=$("$ZodKSUID",(e,n)=>{n.pattern??(n.pattern=Vs),Ae.init(e,n)}),Xa=$("$ZodISODateTime",(e,n)=>{n.pattern??(n.pattern=la(n)),Ae.init(e,n)}),ec=$("$ZodISODate",(e,n)=>{n.pattern??(n.pattern=aa),Ae.init(e,n)}),nc=$("$ZodISOTime",(e,n)=>{n.pattern??(n.pattern=ca(n)),Ae.init(e,n)}),tc=$("$ZodISODuration",(e,n)=>{n.pattern??(n.pattern=qs),Ae.init(e,n)}),oc=$("$ZodIPv4",(e,n)=>{n.pattern??(n.pattern=Ys),Ae.init(e,n)}),pm=/^[0-9a-fA-F:.]+$/;function rc(e){return pm.test(e)?ja(`http://[${e}]`):!1}var ic=$("$ZodIPv6",(e,n)=>{n.pattern??(n.pattern=Xs),Ae.init(e,n),e._zod.check=t=>{rc(t.value)||t.issues.push({code:"invalid_format",format:"ipv6",input:t.value,inst:e,continue:!n.abort})}});var sc=$("$ZodCIDRv4",(e,n)=>{n.pattern??(n.pattern=ea),Ae.init(e,n)});function mm(e){let n=e.split("/");if(n.length!==2)return!1;let[t,o]=n;if(!o)return!1;let i=Number(o);return`${i}`!==o||i<0||i>128?!1:rc(t)}var ac=$("$ZodCIDRv6",(e,n)=>{n.pattern??(n.pattern=na),Ae.init(e,n),e._zod.check=t=>{mm(t.value)||t.issues.push({code:"invalid_format",format:"cidrv6",input:t.value,inst:e,continue:!n.abort})}});function cc(e){if(e==="")return!0;if(/\s/.test(e)||e.length%4!==0)return!1;try{return atob(e),!0}catch{return!1}}var ri=/^[0-9a-zA-Z+/]*={0,2}$/,lc=$("$ZodBase64",(e,n)=>{n.pattern??(n.pattern=ri),Ae.init(e,n),e._zod.check=t=>{cc(t.value)||t.issues.push({code:"invalid_format",format:"base64",input:t.value,inst:e,continue:!n.abort})}}),Qo=/^[A-Za-z0-9_-]*$/;function fm(e){if(!Qo.test(e))return!1;let n=e.replace(/[-_]/g,o=>o==="-"?"+":"/"),t=n.padEnd(Math.ceil(n.length/4)*4,"=");return cc(t)}var uc=$("$ZodBase64URL",(e,n)=>{n.pattern??(n.pattern=Qo),Ae.init(e,n),e._zod.check=t=>{fm(t.value)||t.issues.push({code:"invalid_format",format:"base64url",input:t.value,inst:e,continue:!n.abort})}}),dc=$("$ZodE164",(e,n)=>{n.pattern??(n.pattern=ia),Ae.init(e,n)});function hm(e,n=null){try{let t=e.split(".");if(t.length!==3)return!1;let[o]=t;if(!o)return!1;let i=JSON.parse(atob(o));return!("typ"in i&&i?.typ!=="JWT"||!i.alg||n&&(!("alg"in i)||i.alg!==n))}catch{return!1}}var pc=$("$ZodJWT",(e,n)=>{Ae.init(e,n),e._zod.check=t=>{hm(t.value,n.alg)||t.issues.push({code:"invalid_format",format:"jwt",input:t.value,inst:e,continue:!n.abort})}});var ii=$("$ZodNumber",(e,n)=>{Te.init(e,n),e._zod.pattern=oo,e._zod.parse=(t,o)=>{if(n.coerce)try{t.value=Number(t.value)}catch{}let i=t.value;if(typeof i=="number"&&!Number.isNaN(i)&&Number.isFinite(i))return t;let r=typeof i=="number"?Number.isNaN(i)?"NaN":Number.isFinite(i)?void 0:String(i):void 0;return t.issues.push({expected:"number",code:"invalid_type",input:i,inst:e,...r?{received:r}:{}}),t}}),mc=$("$ZodNumberFormat",(e,n)=>{ga.init(e,n),ii.init(e,n)}),fc=$("$ZodBoolean",(e,n)=>{Te.init(e,n),e._zod.pattern=da,e._zod.parse=(t,o)=>{if(n.coerce)try{t.value=!!t.value}catch{}let i=t.value;return typeof i=="boolean"||t.issues.push({expected:"boolean",code:"invalid_type",input:i,inst:e}),t}});var hc=$("$ZodNull",(e,n)=>{Te.init(e,n),e._zod.pattern=pa,e._zod.values=new Set([null]),e._zod.parse=(t,o)=>{let i=t.value;return i===null||t.issues.push({expected:"null",code:"invalid_type",input:i,inst:e}),t}});var gc=$("$ZodUnknown",(e,n)=>{Te.init(e,n),e._zod.parse=t=>t}),vc=$("$ZodNever",(e,n)=>{Te.init(e,n),e._zod.parse=(t,o)=>(t.issues.push({expected:"never",code:"invalid_type",input:t.value,inst:e}),t)});function gm(e,n){let t=Mo(e._zod.def.checks);if(!t.length)return;let o=Math.min(...t.map(r=>r[0])),i=e._zod.parse;e._zod.parse=(r,s)=>{let a=n(r.value);if(a>o&&!s?.skipChecks&&s?.direction!=="backward"){for(let[d,l]of Mo(e._zod.def.checks))if(a>d&&l._zod.def.when(r)){let u=r.issues.length;return l._zod.check(r),r.issues[u].continue=!1,eo(r.issues,u,e),r}}return i(r,s)}}var vm=e=>Array.isArray(e)?e.length:-1;function Na(e,n,t){e.issues.length&&n.issues.push(...qn(t,e.issues)),n.value[t]=e.value}var bc=$("$ZodArray",(e,n)=>{Te.init(e,n);let t=dn.memoizer;t?.attach(e),e._zod.parse=(o,i)=>{let r=o.value;if(!Array.isArray(r))return o.issues.push({expected:"array",code:"invalid_type",input:r,inst:e}),o;o.value=t?t.alloc(e,o,Array(r.length),i):Array(r.length);let s=[],a=i?.abortEarly;for(let d=0;d<r.length;d++){let l=r[d],u=n.element._zod.run({value:l,issues:[]},i);if(u instanceof Promise)s.push(u.then(p=>Na(p,o,d)));else if(Na(u,o,d),a&&u.issues.length!==0&&Dn(u))break}return s.length?Promise.all(s).then(()=>o):o},gm(e,vm)});function Ko(e,n,t,o,i,r){let s=t in o,a=r==="optional";if(!(!s&&a&&i==="optional")){if(e.issues.length){if(i!==void 0&&a&&!s)return;n.issues.push(...qn(t,e.issues))}if(!s&&i===void 0){e.issues.length||n.issues.push({code:"invalid_type",expected:"nonoptional",input:void 0,path:[t]});return}e.value===void 0?(s||i==="defaulted"&&!a)&&(n.value[t]=void 0):n.value[t]=e.value}}var bm=[];function yc(e){let n=Object.keys(e.shape),t=Object.getOwnPropertySymbols(e.shape),o=t.length?t:bm,i=o.length?[...n,...o]:n;for(let s of i)if(!e.shape?.[s]?._zod?.traits?.has("$ZodType"))throw new Error(`Invalid element at key "${String(s)}": expected a Zod schema`);let r=Br(e.shape);return{...e,allKeys:i,symbolKeys:o,keySet:new Set(n),numKeys:n.length,optionalKeys:new Set(r)}}function wc(e,n,t,o,i,r,s){let a=[],d=i.keySet,l=i.catchall._zod,u=l.def.type,p=l.optin,f=l.optout,m=0;for(let b in n){if(s&&t.issues.length!==m){if(Dn(t,m))break;m=t.issues.length}if(d.has(b))continue;if(b==="__proto__"){u==="never"&&a.push(b);continue}if(u==="never"){a.push(b);continue}let v=l.run({value:n[b],issues:[]},o);v instanceof Promise?e.push(v.then(w=>Ko(w,t,b,n,p,f))):Ko(v,t,b,n,p,f)}return a.length&&t.issues.push({code:"unrecognized_keys",keys:a,input:n,inst:r,continue:!0}),e.length?Promise.all(e).then(()=>t):t}var ym=$("$ZodObject",(e,n)=>{Te.init(e,n);let t=Object.getOwnPropertyDescriptor(n,"shape"),o=t?.get?t.get.raw:n.shape??{};if(o){let l=()=>{let u={...o};return Object.defineProperty(n,"shape",{value:u}),l.raw=u,u};l.raw=o,Object.defineProperty(n,"shape",{get:l})}let i=At(()=>yc(n));ve(e,"propValues",l=>{let u=l.def.shape,p={};for(let f in u){let m=u[f]._zod;if(m.values){Object.prototype.hasOwnProperty.call(p,f)||vn(p,f,new Set);for(let b of m.values)p[f].add(b);m.optin!==void 0&&p[f].add(void 0)}}return p});let r=ht,s=n.catchall,a,d=dn.memoizer;d?.attach(e),e._zod.parse=(l,u)=>{a??(a=i.value);let p=l.value;if(!r(p))return l.issues.push({expected:"object",code:"invalid_type",input:p,inst:e}),l;l.value=d?d.alloc(e,l,{},u):{};let f=[],m=a.shape,b=u?.abortEarly,v=l.issues.length;for(let w of a.allKeys){if(b&&l.issues.length!==v){if(Dn(l,v))break;v=l.issues.length}if(w==="__proto__")continue;let k=m[w],z=k._zod.optin,H=k._zod.optout,B=k._zod.run({value:p[w],issues:[]},u);B instanceof Promise?f.push(B.then(O=>Ko(O,l,w,p,z,H))):Ko(B,l,w,p,z,H)}return s?wc(f,p,l,u,i.value,e,b===!0):f.length?Promise.all(f).then(()=>l):l}}),xc=$("$ZodObjectJIT",(e,n)=>{ym.init(e,n);let t=e._zod.parse,o=At(()=>yc(n)),i=dn.memoizer,r=m=>{let b=o.value,v=b.symbolKeys,w=new Lo(["payload","ctx"],{shape:m,inst:e,memo:i,syms:v}),k=O=>`shape[${O}]._zod.run({ value: input[${O}], issues: [] }, ctx)`,z=(O,I)=>`
          let ${O}_ab = false;
          for (let i = 0; i < ${O}.issues.length; i++) {
            const iss = ${O}.issues[i];
            iss.path = iss.path ? [${I}, ...iss.path] : [${I}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${O}_ab = true;
          }
          if (${O}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;w.write("const input = payload.value;");let H=Object.create(null),B=0;for(let O of b.allKeys)H[O]=`key_${B++}`;w.write(i?"const newResult = memo.alloc(inst, payload, {}, ctx);":"const newResult = {};");for(let O of b.allKeys){if(O==="__proto__")continue;let I=H[O],E=typeof O=="symbol"?`syms[${v.indexOf(O)}]`:Dr(O),G=`${E} in input`,S=m[O],_=S?._zod?.optin,T=_!==void 0,N=S?._zod?.optout==="optional";if(w.write(`const ${I} = ${k(E)};`),T&&N){let P=_==="optional"?`${I}_present`:`${I}.value !== undefined || ${I}_present`;w.write(`
        const ${I}_present = ${G};
        if (!${I}.issues.length || ${I}_present) {
          if (${I}.issues.length) {${z(I,E)}
          }

          if (${P}) {
            newResult[${E}] = ${I}.value;
          }
        }

      `)}else T?(w.write(`
        if (${I}.issues.length) {${z(I,E)}
        }
      `),_==="defaulted"?w.write(`newResult[${E}] = ${I}.value;`):w.write(`
        if (${I}.value !== undefined || ${G}) {
          newResult[${E}] = ${I}.value;
        }
      `)):w.write(`
        const ${I}_present = ${G};
        if (${I}.issues.length) {${z(I,E)}
        }
        if (!${I}_present && !${I}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${E}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${I}_present) {
          newResult[${E}] = ${I}.value;
        }

      `)}return w.write("payload.value = newResult;"),w.write("return payload;"),w.compile()},s,a=ht,d=!dn.jitless,u=d&&Hr.value,p=n.catchall,f;e._zod.parse=(m,b)=>{f??(f=o.value);let v=m.value;return a(v)?d&&u&&b?.async===!1&&b.jitless!==!0?(s||(s=r(n.shape)),m=s(m,b),p?wc([],v,m,b,f,e,b?.abortEarly===!0):m):t(m,b):(m.issues.push({expected:"object",code:"invalid_type",input:v,inst:e}),m)}});function Aa(e,n,t,o){for(let r of e)if(r.issues.length===0)return n.value=r.value,n;let i=e.filter(r=>!Dn(r));return i.length===1?(n.value=i[0].value,i[0]):(n.issues.push({code:"invalid_union",input:n.value,inst:t,errors:e.map(r=>r.issues.map(s=>Mn(s,o,bn())))}),n)}var si=$("$ZodUnion",(e,n)=>{Te.init(e,n),ve(e,"optin",o=>o.def.options.some(i=>i._zod.optin==="defaulted")?"defaulted":o.def.options.some(i=>i._zod.optin!==void 0)?"optional":void 0),ve(e,"optout",o=>o.def.options.some(i=>i._zod.optout==="optional")?"optional":void 0),ve(e,"values",o=>{if(o.def.options.every(i=>i._zod.values))return new Set(o.def.options.flatMap(i=>Array.from(i._zod.values)))}),ve(e,"pattern",o=>{if(o.def.options.every(i=>i._zod.pattern)){let i=o.def.options.map(r=>r._zod.pattern);return new RegExp(`^(${i.map(r=>Yt(r.source)).join("|")})$`)}});let t=n.options.length===1?n.options[0]._zod.run:null;e._zod.parse=(o,i)=>{if(t)return t(o,i);let r=!1,s=[];for(let a of n.options){let d=a._zod.run({value:o.value,issues:[]},i);if(d instanceof Promise)s.push(d),r=!0;else{if(d.issues.length===0)return d;s.push(d)}}return r?Promise.all(s).then(a=>Aa(a,o,e,i)):Aa(s,o,e,i)}});function wm(e){let n=new Map;for(let t of e.options){let o=t._zod.propValues?.[e.discriminator];if(!o||o.size===0)throw new Error(`Invalid discriminated union option at index "${e.options.indexOf(t)}"`);for(let i of o)if(n.has(i)){if(i!==void 0)throw new Error(`Duplicate discriminator value "${String(i)}"`);n.set(i,null)}else n.set(i,t)}return n}var _c=$("$ZodDiscriminatedUnion",(e,n)=>{n.inclusive=!1,si.init(e,n);let t=e._zod.parse;ve(e,"propValues",i=>{let r={},s=0;for(let a of i.def.options){let d=a._zod.propValues;if(!d||Object.keys(d).length===0)throw new Error(`Invalid discriminated union option at index "${i.def.options.indexOf(a)}"`);d[i.def.discriminator]?.has(void 0)&&s++;for(let[l,u]of Object.entries(d)){Object.prototype.hasOwnProperty.call(r,l)||vn(r,l,new Set);for(let p of u)r[l].add(p)}}return!i.def.unionFallback&&s>1&&r[i.def.discriminator]?.delete(void 0),r}),n.options.forEach((i,r)=>{let s=Ot(i._zod.def);if(s&&!Object.prototype.hasOwnProperty.call(s,n.discriminator))throw new Error(`Invalid discriminated union option at index "${r}"`)});let o=At(()=>wm(n));e._zod.parse=(i,r)=>{let s=i.value;if(!ht(s))return i.issues.push({code:"invalid_type",expected:"object",input:s,inst:e}),i;let a=s?.[n.discriminator],d=o.value.get(a);return d&&(a!==void 0||r.direction!=="backward")?d._zod.run(i,r):n.unionFallback||r.direction==="backward"?t(i,r):(i.issues.push({code:"invalid_union",errors:[],note:"No matching discriminator",discriminator:n.discriminator,options:Array.from(o.value.keys()).filter(l=>o.value.get(l)!==null),input:s,path:[n.discriminator],inst:e}),i)}}),Pc=$("$ZodIntersection",(e,n)=>{Te.init(e,n),e._zod.parse=(t,o)=>{let i=t.value,r=n.left._zod.run({value:i,issues:[]},o),s=n.right._zod.run({value:i,issues:[]},o);return r instanceof Promise||s instanceof Promise?Promise.all([r,s]).then(([d,l])=>Oa(t,d,l)):Oa(t,r,s)}});function ti(e,n){if(e===n)return{valid:!0,data:e};if(e instanceof Date&&n instanceof Date&&+e==+n)return{valid:!0,data:e};if(rt(e)&&rt(n)){let t=Object.keys(n),o=Object.keys(e).filter(r=>t.indexOf(r)!==-1),i={...e,...n};Object.prototype.hasOwnProperty.call(i,"__proto__")&&delete i.__proto__;for(let r of o){if(r==="__proto__")continue;let s=ti(e[r],n[r]);if(!s.valid)return{valid:!1,mergeErrorPath:[r,...s.mergeErrorPath]};i[r]=s.data}return{valid:!0,data:i}}if(Array.isArray(e)&&Array.isArray(n)){if(e.length!==n.length)return{valid:!1,mergeErrorPath:[]};let t=[];for(let o=0;o<e.length;o++){let i=e[o],r=n[o],s=ti(i,r);if(!s.valid)return{valid:!1,mergeErrorPath:[o,...s.mergeErrorPath]};t.push(s.data)}return{valid:!0,data:t}}return{valid:!1,mergeErrorPath:[]}}function Oa(e,n,t){let o=new Map,i,r=new Map,s=(l,u)=>{let p;if(l.code==="unrecognized_keys"&&!l.path?.length)i??(i=l),p=l.keys;else if(l.code==="invalid_key"&&l.origin==="record"&&l.path?.length===1){let f=String(l.path[0]);r.has(f)||r.set(f,l),p=[f]}else return!1;for(let f of p)o.has(f)||o.set(f,{}),o.get(f)[u]=!0;return!0};for(let l of n.issues)s(l,"l")||e.issues.push(l);for(let l of t.issues)s(l,"r")||e.issues.push(l);let a=[...o].filter(([,l])=>l.l&&l.r).map(([l])=>l);if(a.length){let l=i?a.filter(u=>i.keys.includes(u)):[];l.length&&e.issues.push({...i,keys:l});for(let u of a)!l.includes(u)&&r.has(u)&&e.issues.push(r.get(u))}let d=ti(n.value,t.value);if(!d.valid){if(Dn(e))return e;throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(d.mergeErrorPath)}`)}return e.value=d.data,e}var kc=$("$ZodRecord",(e,n)=>{Te.init(e,n);let t=dn.memoizer;t?.attach(e),e._zod.parse=(o,i)=>{let r=o.value;if(!rt(r))return o.issues.push({expected:"record",code:"invalid_type",input:r,inst:e}),o;let s=[],a=n.keyType._zod.values;if(a&&!n.partial){o.value=t?t.alloc(e,o,{},i):{};let d=new Set;for(let u of a)if(typeof u=="string"||typeof u=="number"||typeof u=="symbol"){if(d.add(typeof u=="number"?u.toString():u),u==="__proto__")continue;let p=n.keyType._zod.run({value:u,issues:[]},i);if(p instanceof Promise)throw new Error("Async schemas not supported in object keys currently");if(p.issues.length){o.issues.push({code:"invalid_key",origin:"record",issues:p.issues.map(b=>Mn(b,i,bn())),input:u,path:[u],inst:e});continue}let f=p.value;if(f==="__proto__")continue;let m=n.valueType._zod.run({value:r[u],issues:[]},i);m instanceof Promise?s.push(m.then(b=>{b.issues.length&&o.issues.push(...qn(u,b.issues)),o.value[f]=b.value})):(m.issues.length&&o.issues.push(...qn(u,m.issues)),o.value[f]=m.value)}let l;for(let u in r)if(!d.has(u))if(n.mode==="loose"){if(u==="__proto__")continue;o.value[u]=r[u]}else l=l??[],l.push(u);l&&l.length>0&&o.issues.push({code:"unrecognized_keys",input:r,inst:e,keys:l,continue:!0})}else{o.value=t?t.alloc(e,o,{},i):{};let d;for(let l of Reflect.ownKeys(r)){if(l==="__proto__"||!Object.prototype.propertyIsEnumerable.call(r,l))continue;let u=n.keyType._zod.run({value:l,issues:[]},i);if(u instanceof Promise)throw new Error("Async schemas not supported in object keys currently");if(typeof l=="string"&&oo.test(l)&&u.issues.length){let b=n.keyType._zod.run({value:Number(l),issues:[]},i);if(b instanceof Promise)throw new Error("Async schemas not supported in object keys currently");b.issues.length===0&&(u=b)}if(u.issues.length){n.mode==="loose"?o.value[l]=r[l]:a?(d=d??[],d.push(l)):o.issues.push({code:"invalid_key",origin:"record",issues:u.issues.map(b=>Mn(b,i,bn())),input:l,path:[l],inst:e});continue}let f=u.value;if(f==="__proto__")continue;let m=n.valueType._zod.run({value:r[l],issues:[]},i);m instanceof Promise?s.push(m.then(b=>{b.issues.length&&o.issues.push(...qn(l,b.issues)),o.value[f]=b.value})):(m.issues.length&&o.issues.push(...qn(l,m.issues)),o.value[f]=m.value)}d&&d.length>0&&o.issues.push({code:"unrecognized_keys",input:r,inst:e,keys:d,continue:!0})}return s.length?Promise.all(s).then(()=>o):o}});var Sc=$("$ZodEnum",(e,n)=>{Te.init(e,n);let t=Ct(n.entries),o=new Set(t);e._zod.values=o,ve(e,"pattern",i=>{let r=Ct(i.def.entries).filter(s=>Zr.has(typeof s));return new RegExp(r.length?`^(${r.map(s=>Wn(s.toString())).join("|")})$`:"^[^\\s\\S]$")}),e._zod.parse=(i,r)=>{let s=i.value;return o.has(s)||i.issues.push({code:"invalid_value",values:t,input:s,inst:e}),i}}),Ec=$("$ZodLiteral",(e,n)=>{Te.init(e,n);let t=new Set(n.values);e._zod.values=t,ve(e,"pattern",o=>{let i=o.def.values;return new RegExp(i.length?`^(${i.map(r=>typeof r=="string"?Wn(r):r?Wn(r.toString()):String(r)).join("|")})$`:"^[^\\s\\S]$")}),e._zod.parse=(o,i)=>{let r=o.value;return t.has(r)||o.issues.push({code:"invalid_value",values:n.values,input:r,inst:e}),o}});var Tc=$("$ZodTransform",(e,n)=>{Te.init(e,n),e._zod.optin="optional",dn.memoizer?.guard(e),e._zod.parse=(t,o)=>{if(o.direction==="backward")throw new Gt(e.constructor.name);let i=n.transform(t.value,t);if(o.async)return(i instanceof Promise?i:Promise.resolve(i)).then(s=>(t.value=s,t));if(i instanceof Promise)throw new Hn;return t.value=i,t}});function Ia(e,n){return e.value=n.issues.length?void 0:n.value,e}var ai=$("$ZodOptional",(e,n)=>{Te.init(e,n),ve(e,"optin",t=>t.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),e._zod.optout="optional",ve(e,"values",t=>{let o=t.def.innerType._zod.values;return o?new Set([...o,void 0]):void 0}),ve(e,"pattern",t=>{let o=t.def.innerType._zod.pattern;return o?new RegExp(`^(${Yt(o.source)})?$`):void 0}),e._zod.parse=(t,o)=>{if(t.value===void 0){if(n.innerType._zod.optin!=="defaulted")return t;let i=n.innerType._zod.run({value:t.value,issues:[]},o);return i instanceof Promise?i.then(r=>Ia(t,r)):Ia(t,i)}return n.innerType._zod.run(t,o)}}),zc=$("$ZodExactOptional",(e,n)=>{ai.init(e,n),ve(e,"values",t=>t.def.innerType._zod.values),ve(e,"pattern",t=>t.def.innerType._zod.pattern),e._zod.parse=(t,o)=>n.innerType._zod.run(t,o)}),Cc=$("$ZodNullable",(e,n)=>{Te.init(e,n),ve(e,"optin",t=>t.def.innerType._zod.optin),ve(e,"optout",t=>t.def.innerType._zod.optout),ve(e,"pattern",t=>{let o=t.def.innerType._zod.pattern;return o?new RegExp(`^(${Yt(o.source)}|null)$`):void 0}),ve(e,"values",t=>t.def.innerType._zod.values?new Set([...t.def.innerType._zod.values,null]):void 0),e._zod.parse=(t,o)=>t.value===null?t:n.innerType._zod.run(t,o)}),Nc=$("$ZodDefault",(e,n)=>{Te.init(e,n),e._zod.optin="defaulted",ve(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,o)=>{if(o.direction==="backward")return n.innerType._zod.run(t,o);if(t.value===void 0)return t.value=n.defaultValue,t;let i=n.innerType._zod.run(t,o);return i instanceof Promise?i.then(r=>Ga(r,n)):Ga(i,n)}});function Ga(e,n){return e.value===void 0&&(e.value=n.defaultValue),e}var Ac=$("$ZodPrefault",(e,n)=>{Te.init(e,n),e._zod.optin="defaulted",ve(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,o)=>(o.direction==="backward"||t.value===void 0&&(t.value=n.defaultValue),n.innerType._zod.run(t,o))}),Oc=$("$ZodNonOptional",(e,n)=>{Te.init(e,n),ve(e,"values",t=>{let o=t.def.innerType._zod.values;return o?new Set([...o].filter(i=>i!==void 0)):void 0}),e._zod.parse=(t,o)=>{let i=n.innerType._zod.run(t,o);return i instanceof Promise?i.then(r=>$a(r,e)):$a(i,e)}});function $a(e,n){return!e.issues.length&&e.value===void 0&&e.issues.push({code:"invalid_type",expected:"nonoptional",input:e.value,inst:n}),e}function Ra(e,n,t,o){return n.issues.length?(e.value=t.catchValue({...n,value:e.value,error:{issues:n.issues.map(i=>Mn(i,o,bn()))},input:e.value}),e):(e.value=n.value,n.memo&&(e.memo=!0),e)}var Ic=$("$ZodCatch",(e,n)=>{Te.init(e,n),ve(e,"optin",t=>t.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),ve(e,"optout",t=>t.def.innerType._zod.optout),ve(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,o)=>{if(o.direction==="backward")return n.innerType._zod.run(t,o);let i=n.innerType._zod.run({value:t.value,issues:[]},o);return i instanceof Promise?i.then(r=>Ra(t,r,n,o)):Ra(t,i,n,o)}});var Gc=$("$ZodPipe",(e,n)=>{Te.init(e,n),ve(e,"values",t=>t.def.in._zod.values),ve(e,"optin",t=>t.def.in._zod.optin),ve(e,"optout",t=>t.def.out._zod.optout),ve(e,"propValues",t=>t.def.in._zod.propValues),e._zod.parse=(t,o)=>{if(o.direction==="backward"){let r=n.out._zod.run(t,o);return r instanceof Promise?r.then(s=>Wo(s,n.in,o)):Wo(r,n.in,o)}let i=n.in._zod.run(t,o);return i instanceof Promise?i.then(r=>Wo(r,n.out,o)):Wo(i,n.out,o)}});function Wo(e,n,t){return e.issues.some(o=>o.code!=="unrecognized_keys")?(e.aborted=!0,e):n._zod.run({value:e.value,issues:e.issues},t)}var $c=$("$ZodReadonly",(e,n)=>{Te.init(e,n),ve(e,"propValues",t=>t.def.innerType._zod.propValues),ve(e,"values",t=>t.def.innerType._zod.values),ve(e,"optin",t=>t.def.innerType?._zod?.optin),ve(e,"optout",t=>t.def.innerType?._zod?.optout),e._zod.parse=(t,o)=>{if(o.direction==="backward")return n.innerType._zod.run(t,o);let i=n.innerType._zod.run(t,o);return i instanceof Promise?i.then(Da):Da(i)}});function Da(e){return e.memo||(e.value=Object.freeze(e.value)),e}var Rc=$("$ZodLazy",(e,n)=>{Te.init(e,n),Rr(e._zod,"innerType",()=>{let t=n;return t._cachedInner||(t._cachedInner=n.getter()),t._cachedInner}),ve(e,"pattern",t=>t.innerType?._zod?.pattern),ve(e,"propValues",t=>t.innerType?._zod?.propValues),ve(e,"optin",t=>t.innerType?._zod?.optin??void 0),ve(e,"optout",t=>t.innerType?._zod?.optout??void 0),e._zod.parse=(t,o)=>e._zod.innerType._zod.run(t,o)}),Dc=$("$ZodCustom",(e,n)=>{en.init(e,n),Te.init(e,n),e._zod.parse=(t,o)=>t,e._zod.check=t=>{let o=t.value,i=n.fn(o);if(i instanceof Promise)return i.then(r=>Ma(r,t,o,e));Ma(i,t,o,e)}});function Ma(e,n,t,o){if(!e){let i={code:"custom",input:t,inst:o,path:[...o._zod.def.path??[]],continue:!o._zod.def.abort};o._zod.def.params&&(i.params=o._zod.def.params),n.issues.push(It(i))}}var li=class extends Error{constructor(){super("Cannot parse a reference cycle that closes through a transform"),this.name="ZodCyclicError"}},ui="~memo",Mc=[];function Hc(e){return e!==null&&typeof e=="object"}function ci(e){return e.map(n=>n.path?{...n,path:n.path.slice()}:{...n})}var Zc=new WeakMap,so=0,er=1,ao=2;function nr(e,n,t){let o=Zc.get(e);if(o!==void 0)return o?ao:so;if(n.has(e))return ao;n.add(e);let i=so,r=u=>{if(i!==ao&&u?._zod){let p=nr(u,n,t);p>i&&(i=p)}},s=(u,p)=>{let f=so;for(let m of Reflect.ownKeys(u)){let b=Object.getOwnPropertyDescriptor(u,m);if(p&&!b.enumerable)continue;let v=b.get?er:b.value?._zod?nr(b.value,n,t):so;v>f&&(f=v)}return f},a=u=>{u>i&&(i=u)},d=e._zod.def,l=d.type;switch(l){case"object":{let u=Ot(d);a(u?s(u,!0):er),r(d.catchall);break}case"array":r(d.element);break;case"tuple":for(let u of d.items)r(u);r(d.rest);break;case"record":case"map":r(d.keyType),r(d.valueType);break;case"set":r(d.valueType);break;case"union":for(let u of d.options)r(u);break;case"intersection":r(d.left),r(d.right);break;case"optional":case"nullable":case"default":case"prefault":case"catch":case"readonly":case"nonoptional":case"promise":case"success":r(d.innerType);break;case"pipe":r(d.in),r(d.out);break;case"function":r(d.input),r(d.output);break;case"lazy":{let u=d._cachedInner??(t?e._zod.innerType:void 0);a(u?nr(u,n,!1):er);break}case"template_literal":case"string":case"number":case"int":case"boolean":case"bigint":case"symbol":case"undefined":case"null":case"void":case"never":case"any":case"unknown":case"date":case"nan":case"enum":case"literal":case"file":case"transform":case"custom":break;default:for(let u in d){let p=Object.getOwnPropertyDescriptor(d,u);if(!p||p.get)continue;let f=p.value;if(!(!f||typeof f!="object")){if(f._zod)r(f);else if(Array.isArray(f))for(let m of f)r(m)}}}return n.delete(e),xm(e,i)}function xm(e,n){return n!==er&&Zc.set(e,n===ao),n}function _m(e,n){let t=e.buckets.get(n);return t||(t=new WeakMap,e.buckets.set(n,t)),t}var Yo,Xo=[],Pm={alloc(e,n,t){let o=Yo;if(!o)return t;Yo=void 0;let i={value:t,issues:null};return o.set(n.value,i),Xo.push(i),t},guard(e){var n;(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred.push(()=>{let t=e._zod.parse,o=(i,r)=>{if(r.direction!=="backward"&&km(r,i.value))throw new li;return t(i,r)};e._zod.parse=o,e._zod.run===t&&(e._zod.run=o)})},attach(e){var n;let t,o=!1,i,r;(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred.push(()=>{let s=e._zod.parse,a=(d,l)=>{if(t===void 0){let k=nr(e,new Set,!1);if(k===so)return e._zod.parse=s,e._zod.run===a&&(e._zod.run=s),s(d,l);k===ao||o?t=!0:o=!0}let u=d.value;if(!Hc(u))return s(d,l);let p=l[ui];p||(p={buckets:new WeakMap,backEdges:void 0},l[ui]=p);let f;i===l?f=r:(f=_m(p,e),i=l,r=f);let m=f.get(u);if(m)return d.value=m.value,m.issues?m.issues.length&&d.issues.push(...ci(m.issues)):(d.memo=!0,p.backEdges??(p.backEdges=new WeakSet),p.backEdges.add(m.value)),d;Yo=f;let b=Xo.length,v=s(d,l);Yo=void 0;let w=Xo.length>b?Xo.pop():void 0;return v instanceof Promise?v.then(k=>(w&&(w.issues=k.issues.length?ci(k.issues):Mc),k)):(w&&(w.issues=v.issues.length?ci(v.issues):Mc),v)};e._zod.parse=a,e._zod.run===s&&(e._zod.run=a)})}};function Bc(){return Pm}function km(e,n){let t=e[ui]?.backEdges;return t!==void 0&&Hc(n)&&t.has(n)}var Sm=()=>{let e={string:{unit:"characters",verb:"to have"},file:{unit:"bytes",verb:"to have"},array:{unit:"items",verb:"to have"},set:{unit:"items",verb:"to have"},map:{unit:"entries",verb:"to have"}};function n(r){return e[r]??null}let t={regex:"input",email:"email address",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO datetime",date:"ISO date",time:"ISO time",duration:"ISO duration",ipv4:"IPv4 address",ipv6:"IPv6 address",mac:"MAC address",cidrv4:"IPv4 range",cidrv6:"IPv6 range",base64:"base64-encoded string",base64url:"base64url-encoded string",json_string:"JSON string",e164:"E.164 number",currency_code:"currency code",credit_card:"credit card number",iban:"IBAN",jwt:"JWT",template_literal:"input"},o={nan:"NaN"};function i(r,s){return r==="number"&&typeof s=="number"&&!Number.isFinite(s)?String(s):o[r]??r}return r=>{switch(r.code){case"invalid_type":{let s=i(r.expected),a=Ur(r.input),d=i(a,r.input);return`Invalid input: expected ${s}, received ${d}`}case"invalid_value":return r.values.length===1?`Invalid input: expected ${$o(r.values[0])}`:`Invalid option: expected one of ${Io(r.values,"|")}`;case"too_big":{let s=r.exact?"exactly ":r.inclusive?"<=":"<",a=n(r.origin);return a?`Too big: expected ${r.origin??"value"} to have ${s}${r.maximum.toString()} ${a.unit??"elements"}`:`Too big: expected ${r.origin??"value"} to be ${s}${r.maximum.toString()}`}case"too_small":{let s=r.exact?"exactly ":r.inclusive?">=":">",a=n(r.origin);return a?`Too small: expected ${r.origin} to have ${s}${r.minimum.toString()} ${a.unit}`:`Too small: expected ${r.origin} to be ${s}${r.minimum.toString()}`}case"invalid_format":{let s=r;return s.format==="starts_with"?`Invalid string: must start with "${s.prefix}"`:s.format==="ends_with"?`Invalid string: must end with "${s.suffix}"`:s.format==="includes"?`Invalid string: must include "${s.includes}"`:s.format==="regex"?`Invalid string: must match pattern ${s.pattern}`:`Invalid ${t[s.format]??r.format}`}case"not_multiple_of":return`Invalid number: must be a multiple of ${r.divisor}`;case"unrecognized_keys":return`Unrecognized key${r.keys.length>1?"s":""}: ${Io(r.keys,", ")}`;case"invalid_key":return`Invalid key in ${r.origin}`;case"invalid_union":return r.options&&Array.isArray(r.options)&&r.options.length>0?`Invalid discriminator value. Expected ${r.options.map(a=>`'${a}'`).join(" | ")}`:r.inclusive===!1?"Invalid input: more than one option matched":"Invalid input";case"invalid_element":return`Invalid value in ${r.origin}`;default:return"Invalid input"}}};function Fc(){return{localeError:Sm()}}var Uc;var di=class{constructor(){this._map=new WeakMap,this._idmap=new Map}add(n,...t){let o=t[0];return this._map.set(n,o),o&&typeof o=="object"&&"id"in o&&this._idmap.set(o.id,n),this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(n){let t=this._map.get(n);return t&&typeof t=="object"&&"id"in t&&this._idmap.delete(t.id),this._map.delete(n),this}get(n){let t=n._zod.parent;if(t){let o={...this.get(t)??{}};delete o.id;let i={...o,...this._map.get(n)};return Object.keys(i).length?i:void 0}return this._map.get(n)}has(n){return this._map.has(n)}};function Em(){return new di}(Uc=globalThis).__zod_globalRegistry??(Uc.__zod_globalRegistry=Em());var gt=globalThis.__zod_globalRegistry;function jc(e){return e.checks&&(e.checks=[...e.checks]),e}function Vc(e,n){return new e(jc({type:"string",...ie(n)}))}function Lc(e,n){return new e({type:"string",format:"email",check:"string_format",abort:!1,...ie(n)})}function Wc(e,n){return new e({type:"string",format:"guid",check:"string_format",abort:!1,...ie(n)})}function qc(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,...ie(n)})}function Kc(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v4",...ie(n)})}function Jc(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v6",...ie(n)})}function Qc(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v7",...ie(n)})}function Yc(e,n){return new e({type:"string",format:"url",check:"string_format",abort:!1,...ie(n)})}function Xc(e,n){return new e({type:"string",format:"emoji",check:"string_format",abort:!1,...ie(n)})}function el(e,n){return new e({type:"string",format:"nanoid",check:"string_format",abort:!1,...ie(n)})}function nl(e,n){return new e({type:"string",format:"cuid",check:"string_format",abort:!1,...ie(n)})}function tl(e,n){return new e({type:"string",format:"cuid2",check:"string_format",abort:!1,...ie(n)})}function ol(e,n){return new e({type:"string",format:"ulid",check:"string_format",abort:!1,...ie(n)})}function rl(e,n){return new e({type:"string",format:"xid",check:"string_format",abort:!1,...ie(n)})}function il(e,n){return new e({type:"string",format:"ksuid",check:"string_format",abort:!1,...ie(n)})}function sl(e,n){return new e({type:"string",format:"ipv4",check:"string_format",abort:!1,...ie(n)})}function al(e,n){return new e({type:"string",format:"ipv6",check:"string_format",abort:!1,...ie(n)})}function cl(e,n){return new e({type:"string",format:"cidrv4",check:"string_format",abort:!1,...ie(n)})}function ll(e,n){return new e({type:"string",format:"cidrv6",check:"string_format",abort:!1,...ie(n)})}function ul(e,n){return new e({type:"string",format:"base64",check:"string_format",abort:!1,...ie(n)})}function dl(e,n){return new e({type:"string",format:"base64url",check:"string_format",abort:!1,...ie(n)})}function pl(e,n){return new e({type:"string",format:"e164",check:"string_format",abort:!1,...ie(n)})}function ml(e,n){return new e({type:"string",format:"jwt",check:"string_format",abort:!1,...ie(n)})}function fl(e,n){return new e({type:"string",format:"datetime",check:"string_format",offset:!1,local:!1,precision:null,...ie(n)})}function hl(e,n){return new e({type:"string",format:"date",check:"string_format",...ie(n)})}function gl(e,n){return new e({type:"string",format:"time",check:"string_format",precision:null,...ie(n)})}function vl(e,n){return new e({type:"string",format:"duration",check:"string_format",...ie(n)})}function bl(e,n){return new e(jc({type:"number",checks:[],...ie(n)}))}function yl(e,n){return new e({type:"number",check:"number_format",abort:!1,format:"safeint",...ie(n)})}function wl(e,n){return new e({type:"boolean",...ie(n)})}function xl(e,n){return new e({type:"null",...ie(n)})}function _l(e){return new e({type:"unknown"})}function Pl(e,n){return new e({type:"never",...ie(n)})}function tr(e,n){return new ei({check:"less_than",...ie(n),value:e,inclusive:!1})}function co(e,n){return new ei({check:"less_than",...ie(n),value:e,inclusive:!0})}function or(e,n){return new ni({check:"greater_than",...ie(n),value:e,inclusive:!1})}function lo(e,n){return new ni({check:"greater_than",...ie(n),value:e,inclusive:!0})}function rr(e,n){return new ha({check:"multiple_of",...ie(n),value:e})}function ir(e,n){return new va({check:"max_length",...ie(n),maximum:e})}function $t(e,n){return new ba({check:"min_length",...ie(n),minimum:e})}function sr(e,n){return new ya({check:"length_equals",...ie(n),length:e})}function pi(e,n){return new wa({check:"string_format",format:"regex",...ie(n),pattern:e})}function mi(e){return new xa({check:"string_format",format:"lowercase",...ie(e)})}function fi(e){return new _a({check:"string_format",format:"uppercase",...ie(e)})}function hi(e,n){return new Pa({check:"string_format",format:"includes",...ie(n),includes:e})}function gi(e,n){return new ka({check:"string_format",format:"starts_with",...ie(n),prefix:e})}function vi(e,n){return new Sa({check:"string_format",format:"ends_with",...ie(n),suffix:e})}function it(e){return new Ea({check:"overwrite",tx:e})}function bi(e){return it(n=>n.normalize(e))}function yi(){return it(e=>e.trim())}function wi(){return it(e=>e.toLowerCase())}function xi(){return it(e=>e.toUpperCase())}function _i(){return it(e=>Mr(e))}function kl(e,n,t){return new e({type:"array",element:n,...ie(t)})}function Sl(e,n,t){return new e({type:"custom",check:"custom",fn:n,...ie(t)})}function El(e,n){let t=Tm(o=>(o.addIssue=i=>{if(typeof i=="string")o.issues.push(It(i,o.value,t._zod.def));else{let r=i;r.fatal&&(r.continue=!1),r.code??(r.code="custom"),"input"in r||(r.input=o.value),r.inst??(r.inst=t),r.continue??(r.continue=!t._zod.def.abort),o.issues.push(It(r))}},e(o.value,o)),n);return t}function Tm(e,n){let t=new en({check:"custom",...ie(n)});return t._zod.check=e,t}function uo(e,...n){for(let t of n)for(let o of Reflect.ownKeys(t))Object.prototype.propertyIsEnumerable.call(t,o)&&vn(e,o,t[o]);return e}function ki(e){let n=e?.target??"draft-2020-12";return n==="draft-4"&&(n="draft-04"),n==="draft-7"&&(n="draft-07"),{processors:e.processors??{},metadataRegistry:e?.metadata??gt,target:n,unrepresentable:e?.unrepresentable??"throw",override:e?.override??(()=>{}),io:e?.io??"output",counter:0,seen:new Map,sharedDefsExtractedFor:void 0,sharedEmitDoneFor:void 0,cycles:e?.cycles??"ref",reused:e?.reused??"inline",intersections:[],deferred:[],external:e?.external??void 0}}function Kn(e,n,t,o,i){let r=typeof n.unrepresentable=="function"?n.unrepresentable({zodSchema:e,path:o.path,message:i}):n.unrepresentable;if(r==="any")return!1;if(r===void 0||r==="throw")throw new Error(i);return Object.assign(t,r),!0}function Be(e,n,t={path:[],schemaPath:[]}){var o;let i=e._zod.def,r=n.seen.get(e);if(r)return r.count++,t.schemaPath.includes(e)&&(r.cycle=t.path),r.schema;let s={schema:{},count:1,cycle:void 0,path:t.path};n.seen.set(e,s),n.sharedDefsExtractedFor=void 0,n.sharedEmitDoneFor=void 0;let a=e._zod.toJSONSchema?.();if(a)s.schema=a;else{let u={...t,schemaPath:[...t.schemaPath,e],path:t.path};if(e._zod.processJSONSchema)e._zod.processJSONSchema(n,s.schema,u);else{let f=s.schema,m=n.processors[i.type];if(!m)throw new Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);m(e,n,f,u)}let p=e._zod.parent;p&&(s.ref||(s.ref=p),Be(p,n,u),n.seen.get(p).isParent=!0)}let d=n.metadataRegistry.get(e);return d&&uo(s.schema,d),n.io==="input"&&sn(e)&&(delete s.schema.examples,delete s.schema.default),n.io==="input"&&"_prefault"in s.schema&&((o=s.schema).default??(o.default=s.schema._prefault)),delete s.schema._prefault,n.seen.get(e).schema}function Tl(e){return e.replace(/~/g,"~0").replace(/\//g,"~1")}function Si(e,n){let t=e.seen.get(n);if(!t)throw new Error("Unprocessed schema. This is a bug in Zod.");if(e.external&&e.sharedDefsExtractedFor===e.external)return;let o=new Map;for(let s of e.seen.entries()){let a=e.metadataRegistry.get(s[0])?.id;if(a){let d=o.get(a);if(d&&d!==s[0])throw new Error(`Duplicate schema id "${a}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);o.set(a,s[0])}}let i=s=>{let a=e.target==="draft-2020-12"?"$defs":"definitions";if(e.external){let p=e.external.registry.get(s[0])?.id,f=e.external.uri??(b=>b);if(p)return{ref:f(p)};let m=s[1].defId??s[1].schema.id??`schema${e.counter++}`;return s[1].defId=m,{defId:m,ref:`${f("__shared")}#/${a}/${Tl(m)}`}}let d="#",l=`${d}/${a}/`;if(s[1]===t&&!s[1].schema.id)return{ref:d};let u=s[1].schema.id??`__schema${e.counter++}`;return{defId:u,ref:l+Tl(u)}},r=s=>{if(s[1].schema.$ref)return;let a=s[1],{ref:d,defId:l}=i(s);a.def={...a.schema},l&&(a.defId=l);let u=a.schema;for(let p in u)delete u[p];u.$ref=d};if(e.cycles==="throw")for(let s of e.seen.entries()){let a=s[1];if(a.cycle)throw new Error(`Cycle detected: #/${a.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`)}for(let s of e.seen.entries()){let a=s[1];if(n===s[0]){r(s);continue}if(e.external){let l=e.external.registry.get(s[0])?.id;if(n!==s[0]&&l){r(s);continue}}if(e.metadataRegistry.get(s[0])?.id){r(s);continue}if(a.cycle){r(s);continue}a.count>1&&e.reused==="ref"&&r(s)}e.external&&(e.sharedDefsExtractedFor=e.external)}function Nl(e){let n=e.anyOf;if(!Array.isArray(n)||n.length===0||e.type!==void 0)return;let t=[];for(let o of n){if(!o||typeof o!="object")return;Nl(o);let i=Object.keys(o);if(i.length!==1||i[0]!=="type")return;let r=o.type;for(let s of Array.isArray(r)?r:[r]){if(typeof s!="string")return;t.includes(s)||t.push(s)}}delete e.anyOf,e.type=t.length===1?t[0]:t}var Al=new Set(["type","properties","required","additionalProperties"]),zl=["oneOf","anyOf"];function Cl(e){let n=e.additionalProperties;return n===void 0||n===!1||typeof n!="object"||n===null?null:Object.keys(n).length?n:null}function Pi(e){let n=[];for(let r of e){if(typeof r!="object"||r.type!=="object")return null;for(let s in r)if(!Al.has(s))return null;n.push(r)}let t={},o=new Set;for(let r of n){for(let s in r.properties){if(Object.prototype.hasOwnProperty.call(t,s))continue;let a=[];for(let l of n){let u=l.properties?.[s]??Cl(l);u!=null&&(a.some(p=>JSON.stringify(p)===JSON.stringify(u))||a.push(u))}let d=a.length===1?a[0]:Pi(a)??{allOf:a};vn(t,s,d)}for(let s of r.required??[])o.add(s)}let i={type:"object",properties:t};if(o.size&&(i.required=[...o]),n.every(r=>r.additionalProperties===!1))i.additionalProperties=!1;else{let r=[];for(let s of n){let a=Cl(s);a&&!r.some(d=>JSON.stringify(d)===JSON.stringify(a))&&r.push(a)}r.length===1?i.additionalProperties=r[0]:r.length>1&&(i.additionalProperties={allOf:r})}return i}function zm(e){let n=e.allOf;if(!Array.isArray(n)||n.length<2)return;for(let i of Al)if(i in e)return;let t=n.filter(i=>zl.some(r=>Array.isArray(i[r]))),o=null;if(!t.length)o=Pi(n);else{let i=t[0],r=zl.find(d=>Array.isArray(i[d]));if(Object.keys(i).length!==1)return;let s=n.filter(d=>d!==i),a=i[r].map(d=>Pi([...s,d]));if(a.some(d=>!d))return;o={[r]:a}}o&&(delete e.allOf,uo(e,o))}function Ei(e,n){let t=e.seen.get(n);if(!t)throw new Error("Unprocessed schema. This is a bug in Zod.");let o=a=>{let d=e.seen.get(a);if(d.ref===null)return;let l=d.def??d.schema,u={...l},p=d.ref;if(d.ref=null,p){o(p);let m=e.seen.get(p),b=m.schema;if(b.$ref&&(e.target==="draft-07"||e.target==="draft-04"||e.target==="openapi-3.0")?(l.allOf=l.allOf??[],l.allOf.push(b)):uo(l,b),uo(l,u),a._zod.parent===p)for(let w in l)w==="$ref"||w==="allOf"||w in u||delete l[w];if(b.$ref&&m.def)for(let w in l)w==="$ref"||w==="allOf"||w in m.def&&JSON.stringify(l[w])===JSON.stringify(m.def[w])&&delete l[w]}let f=a._zod.parent;if(f&&f!==p){o(f);let m=e.seen.get(f);if(m?.schema.$ref&&(l.$ref=m.schema.$ref,m.def))for(let b in l)b==="$ref"||b==="allOf"||b in m.def&&JSON.stringify(l[b])===JSON.stringify(m.def[b])&&delete l[b]}e.override({zodSchema:a,jsonSchema:l,path:d.path??[]})};if(!e.external||e.sharedEmitDoneFor!==e.external){for(let a of[...e.seen.entries()].reverse())o(a[0]);if(e.target!=="openapi-3.0")for(let a of e.seen.entries())Nl(a[1].def??a[1].schema);for(let a of e.deferred)a();if(e.intersections.length){let a=new Map;for(let d of e.seen.values())for(let l of[d.schema,d.def]){let u=l?.allOf;if(!Array.isArray(u))continue;let p=a.get(u);p?p.push(l):a.set(u,[l])}for(let d of e.intersections)for(let l of a.get(d)??[])zm(l)}}let i={};if(e.target==="draft-2020-12"?i.$schema="https://json-schema.org/draft/2020-12/schema":e.target==="draft-07"?i.$schema="http://json-schema.org/draft-07/schema#":e.target==="draft-04"?i.$schema="http://json-schema.org/draft-04/schema#":e.target,e.external?.uri){let a=e.external.registry.get(n)?.id;if(!a)throw new Error("Schema is missing an `id` property");i.$id=e.external.uri(a)}uo(i,t.defId?t.schema:t.def??t.schema);let r=e.metadataRegistry.get(n)?.id;r!==void 0&&i.id===r&&delete i.id;let s=e.external?.defs??{};if(!e.external||e.sharedEmitDoneFor!==e.external)for(let a of e.seen.entries()){let d=a[1];d.def&&d.defId&&(d.def.id===d.defId&&delete d.def.id,vn(s,d.defId,d.def))}e.external&&(e.sharedEmitDoneFor=e.external),e.external||Object.keys(s).length>0&&(e.target==="draft-2020-12"?i.$defs=s:i.definitions=s);try{let a=JSON.parse(JSON.stringify(i));return Object.defineProperty(a,"~standard",{value:{...n["~standard"],jsonSchema:{input:po(n,"input",e.processors),output:po(n,"output",e.processors)}},enumerable:!1,writable:!1}),a}catch{throw new Error("Error converting schema to JSON.")}}function sn(e,n){let t=n??{seen:new Set};if(t.seen.has(e))return!1;t.seen.add(e);let o=e._zod.def;if(o.type==="transform")return!0;if(o.type==="array")return sn(o.element,t);if(o.type==="set")return sn(o.valueType,t);if(o.type==="lazy")return sn(o.getter(),t);if(o.type==="promise"||o.type==="optional"||o.type==="nonoptional"||o.type==="nullable"||o.type==="readonly"||o.type==="default"||o.type==="prefault"||o.type==="catch")return sn(o.innerType,t);if(o.type==="intersection")return sn(o.left,t)||sn(o.right,t);if(o.type==="record"||o.type==="map")return sn(o.keyType,t)||sn(o.valueType,t);if(o.type==="pipe")return e._zod.traits.has("$ZodCodec")?!0:sn(o.in,t)||sn(o.out,t);if(o.type==="object"){for(let i in o.shape)if(sn(o.shape[i],t))return!0;return!1}if(o.type==="union"){for(let i of o.options)if(sn(i,t))return!0;return!1}if(o.type==="tuple"){for(let i of o.items)if(sn(i,t))return!0;return!!(o.rest&&sn(o.rest,t))}return!1}var Ol=(e,n={})=>t=>{let o=ki({...t,processors:n});return Be(e,o),Si(o,e),Ei(o,e)},po=(e,n,t={})=>o=>{let{libraryOptions:i,target:r}=o??{},s=ki({...i??{},target:r,io:n,processors:t});return Be(e,s),Si(s,e),Ei(s,e)};var Rt=(e,n,t)=>{(e[n]===void 0||t>e[n])&&(e[n]=t)},Dt=(e,n,t)=>{(e[n]===void 0||t<e[n])&&(e[n]=t)},Il=(e,n)=>{Rt(e,"minimum",n),Dt(e,"maximum",n)},Dl=(e,n)=>{e.multipleOf??(e.multipleOf=[]),e.multipleOf.includes(n)||e.multipleOf.push(n)},Ml=(e,n)=>{e.patterns??(e.patterns=new Set),e.patterns.add(n)},Hl=(e,n)=>{e.mime=e.mime?e.mime.filter(t=>n.includes(t)):[...n]},Zl=(e,n)=>{e.format=n,n.includes("int")&&(e.isInt=!0)},Gl=(e,n)=>Rt(e,"minimum",n.minimum),$l=(e,n)=>Dt(e,"maximum",n.maximum),Rl=e=>(n,t)=>{Zl(n,t.format);let[o,i]=e[t.format];Rt(n,"minimum",o),Dt(n,"maximum",i)},Cm={greater_than:(e,n)=>Rt(e,n.inclusive?"minimum":"exclusiveMinimum",n.value),less_than:(e,n)=>Dt(e,n.inclusive?"maximum":"exclusiveMaximum",n.value),multiple_of:(e,n)=>Dl(e,n.value),number_format:Rl(Xt),bigint_format:Rl(Ro),min_length:Gl,max_length:$l,length_equals:(e,n)=>Il(e,n.length),min_size:Gl,max_size:$l,size_equals:(e,n)=>Il(e,n.size),string_format:(e,n)=>{Zl(e,n.format),n.pattern&&Ml(e,n.pattern),(n.format==="base64"||n.format==="base64url")&&(e.contentEncoding=n.format),(n.local||n.precision===-1)&&(e.laxFormat=!0)},mime_type:(e,n)=>Hl(e,n.mime)};function zn(e){let n={},t=e._zod.def,o=e._zod.traits.has("$ZodCheck")?[e,...t.checks??[]]:t.checks??[];for(let r of o)Cm[r._zod.def.check]?.(n,r._zod.def);let i=e._zod.bag;i.minimum!==void 0&&Rt(n,"minimum",i.minimum),i.exclusiveMinimum!==void 0&&Rt(n,"exclusiveMinimum",i.exclusiveMinimum),i.maximum!==void 0&&Dt(n,"maximum",i.maximum),i.exclusiveMaximum!==void 0&&Dt(n,"exclusiveMaximum",i.exclusiveMaximum),i.multipleOf!==void 0&&Dl(n,i.multipleOf),i.format!==void 0&&(n.format??(n.format=i.format),i.format.includes("int")&&(n.isInt=!0)),i.mime&&Hl(n,i.mime);for(let r of i.patterns??[])Ml(n,r);return n}var Nm={guid:"uuid",url:"uri",datetime:"date-time",json_string:"json-string",regex:""},Am=new Map([[ri,ta],[Qo,oa]]),Bl=e=>Am.get(e)??e,Fl=(e,n,t,o)=>{let i=t;i.type="string";let{minimum:r,maximum:s,format:a,patterns:d,contentEncoding:l,laxFormat:u}=zn(e);if(typeof r=="number"&&(i.minLength=r),typeof s=="number"&&(i.maxLength=s),a&&(i.format=Nm[a]??a,i.format===""&&delete i.format,(a==="time"||u)&&delete i.format),l&&(i.contentEncoding=l),d&&d.size>0){let p=[...d].map(Bl);p.length===1?i.pattern=p[0].source:p.length>1&&(i.allOf=[...p.map(f=>({...n.target==="draft-07"||n.target==="draft-04"||n.target==="openapi-3.0"?{type:"string"}:{},pattern:f.source}))])}},Ul=(e,n,t,o)=>{let i=t,{minimum:r,maximum:s,multipleOf:a,exclusiveMaximum:d,exclusiveMinimum:l,isInt:u}=zn(e);i.type=u?"integer":"number";let p=typeof l=="number"&&l>=(r??Number.NEGATIVE_INFINITY),f=typeof d=="number"&&d<=(s??Number.POSITIVE_INFINITY),m=n.target==="draft-04"||n.target==="openapi-3.0";if(p?m?(i.minimum=l,i.exclusiveMinimum=!0):i.exclusiveMinimum=l:typeof r=="number"&&(i.minimum=r),f?m?(i.maximum=d,i.exclusiveMaximum=!0):i.exclusiveMaximum=d:typeof s=="number"&&(i.maximum=s),a){let b=new Set;for(let k of a)Number.isFinite(k)&&k!==0?b.add(Math.abs(k)):Kn(e,n,i,o,`A multipleOf divisor of ${k} cannot be represented in JSON Schema`);let[v,...w]=b;v!==void 0&&(i.multipleOf=v),w.length&&(i.allOf=[...i.allOf??[],...w.map(k=>({multipleOf:k}))])}},jl=(e,n,t,o)=>{t.type="boolean"};var Vl=(e,n,t,o)=>{n.target==="openapi-3.0"?(t.type="string",t.nullable=!0,t.enum=[null]):t.type="null"};var Ll=(e,n,t,o)=>{t.not={}};var Wl=(e,n,t,o)=>{};var ql=(e,n,t,o)=>{let i=e._zod.def,r=Ct(i.entries);if(r.length===0){t.not={};return}r.every(s=>typeof s=="number")&&(t.type="number"),r.every(s=>typeof s=="string")&&(t.type="string"),t.enum=r},Kl=(e,n,t,o)=>{let i=e._zod.def;if(i.values.length===0){t.not={};return}let r=[];for(let s of i.values)if(s===void 0){if(Kn(e,n,t,o,"Literal `undefined` cannot be represented in JSON Schema"))return}else if(typeof s=="bigint"){if(Kn(e,n,t,o,"BigInt literals cannot be represented in JSON Schema"))return;r.push(Number(s))}else r.push(s);if(r.length!==0)if(r.length===1){let s=r[0];t.type=s===null?"null":typeof s,n.target==="draft-04"||n.target==="openapi-3.0"?t.enum=[s]:t.const=s}else r.every(s=>typeof s=="number")&&(t.type="number"),r.every(s=>typeof s=="string")&&(t.type="string"),r.every(s=>typeof s=="boolean")&&(t.type="boolean"),r.every(s=>s===null)&&(t.type="null"),t.enum=r};var Jl=(e,n,t,o)=>{Kn(e,n,t,o,"Custom types cannot be represented in JSON Schema")};var Ql=(e,n,t,o)=>{Kn(e,n,t,o,"Transforms cannot be represented in JSON Schema")};var Yl=(e,n,t,o)=>{let i=t,r=e._zod.def,{minimum:s,maximum:a}=zn(e);typeof s=="number"&&(i.minItems=s),typeof a=="number"&&(i.maxItems=a),i.type="array",i.items=Be(r.element,n,{...o,path:[...o.path,"items"]})};function ar(e){let n=e._zod.def;return n.type==="pipe"&&n.in._zod.traits.has("$ZodTransform")?ar(n.out):n.type==="catch"?ar(n.innerType):e._zod.optin}var Xl=(e,n,t,o)=>{let i=t,r=e._zod.def,s=r.shape;if(Object.getOwnPropertySymbols(s).length&&Kn(e,n,i,o,"Symbol keys cannot be represented in JSON Schema"))return;i.type="object",i.properties={};for(let l in s)vn(i.properties,l,Be(s[l],n,{...o,path:[...o.path,"properties",l]}));let d=[];for(let l of Object.keys(s)){let u=r.shape[l];(n.io==="input"?ar(u)===void 0:u._zod.optout===void 0)&&d.push(l)}d.length>0&&(i.required=d),r.catchall?._zod.def.type==="never"?i.additionalProperties=!1:r.catchall?r.catchall&&(i.additionalProperties=Be(r.catchall,n,{...o,path:[...o.path,"additionalProperties"]})):n.io==="output"&&(i.additionalProperties=!1)},eu=(e,n,t,o)=>{let i=e._zod.def,r=i.inclusive===!1,s=i.options.map((a,d)=>Be(a,n,{...o,path:[...o.path,r?"oneOf":"anyOf",d]}));r?t.oneOf=s:t.anyOf=s},nu=(e,n,t,o)=>{let i=e._zod.def,r=Be(i.left,n,{...o,path:[...o.path,"allOf",0]}),s=Be(i.right,n,{...o,path:[...o.path,"allOf",1]}),a=l=>"allOf"in l&&Object.keys(l).length===1,d=[...a(r)?r.allOf:[r],...a(s)?s.allOf:[s]];t.allOf=d,n.intersections.push(d)};function Ti(e,n,t){if(n.$ref){if(t.has(n))return n;t.add(n);let b=e.get(n)?.def;if(!b)return n;let v=Ti(e,b,t);return v===b?n:v}for(let b of["anyOf","oneOf"]){let v=n[b];if(!Array.isArray(v))continue;let w=v.map(k=>Ti(e,k,t));w.some((k,z)=>k!==v[z])&&(n={...n,[b]:w})}let o=Array.isArray(n.type)?n.type:[n.type],i=!o.includes("string")&&o.some(b=>b==="number"||b==="integer"),r=n.enum??(n.const!==void 0?[n.const]:void 0);if(!i&&!r?.some(b=>typeof b=="number"))return n;let{minimum:s,maximum:a,exclusiveMinimum:d,exclusiveMaximum:l,multipleOf:u,format:p,id:f,...m}=n;return m.enum?m.enum=m.enum.map(b=>typeof b=="number"?String(b):b):typeof m.const=="number"&&(m.const=String(m.const)),i&&(m.type="string",r||(m.pattern=(o.includes("number")?oo:Yr).source)),m}var zi=new WeakMap;function Om(e){let n=new Map;for(let o of e.seen.values())o.def&&!n.has(o.schema)&&n.set(o.schema,o);let t=new Map;for(let o of zi.get(e)??[]){let i=e.seen.get(o),r=(i?.def??i?.schema)?.propertyNames;if(!r||r===!0||t.has(r))continue;let s=Ti(n,r,new Set);s!==r&&t.set(r,s)}if(t.size)for(let o of e.seen.values())for(let i of[o.schema,o.def]){let r=i&&t.get(i.propertyNames);r&&(i.propertyNames=r)}}var tu=(e,n,t,o)=>{let i=t,r=e._zod.def;i.type="object";let s=r.keyType,a=zn(s).patterns;if(r.mode==="loose"&&a&&a.size>0){let u=Be(r.valueType,n,{...o,path:[...o.path,"patternProperties","*"]});i.patternProperties={};for(let p of a)vn(i.patternProperties,Bl(p).source,u)}else{if(n.target==="draft-07"||n.target==="draft-2020-12"){i.propertyNames=Be(r.keyType,n,{...o,path:[...o.path,"propertyNames"]});let u=zi.get(n);u||(u=[],zi.set(n,u),n.deferred.push(()=>Om(n))),u.push(e)}i.additionalProperties=Be(r.valueType,n,{...o,path:[...o.path,"additionalProperties"]})}let d=s._zod.values,l=n.io==="input"&&ar(r.valueType)!==void 0;if(d&&!r.partial&&!l){let u=[...d].filter(p=>typeof p=="string"||typeof p=="number");u.length>0&&(i.required=u.map(String))}},ou=(e,n,t,o)=>{let i=e._zod.def,r=Be(i.innerType,n,o),s=n.seen.get(e);n.target==="openapi-3.0"?(s.ref=i.innerType,t.nullable=!0):t.anyOf=[r,{type:"null"}]},ru=(e,n,t,o)=>{let i=e._zod.def;Be(i.innerType,n,o);let r=n.seen.get(e);r.ref=i.innerType},Ci=Symbol();function iu(e,n,t,o,i){let r=!1,s=JSON.stringify(e,(a,d)=>typeof d!="bigint"?d:(r=!0,null));return r?(Kn(n,t,o,i,"BigInt defaults cannot be represented in JSON Schema"),Ci):JSON.parse(s)}var su=(e,n,t,o)=>{let i=e._zod.def;Be(i.innerType,n,o);let r=n.seen.get(e);r.ref=i.innerType;let s=iu(i.defaultValue,e,n,t,o);s!==Ci&&(t.default=s)},au=(e,n,t,o)=>{let i=e._zod.def;Be(i.innerType,n,o);let r=n.seen.get(e);if(r.ref=i.innerType,n.io!=="input")return;let s=iu(i.defaultValue,e,n,t,o);s!==Ci&&(t._prefault=s)},cu=(e,n,t,o)=>{let i=e._zod.def;Be(i.innerType,n,o);let r=n.seen.get(e);r.ref=i.innerType;let s;try{s=i.catchValue(void 0)}catch{Kn(e,n,t,o,"Dynamic catch values are not supported in JSON Schema");return}t.default=s},lu=(e,n,t,o)=>{let i=e._zod.def,r=i.in._zod.traits.has("$ZodTransform"),s=n.io==="input"?r?i.out:i.in:i.out;Be(s,n,o);let a=n.seen.get(e);a.ref=s},uu=(e,n,t,o)=>{let i=e._zod.def;Be(i.innerType,n,o);let r=n.seen.get(e);r.ref=i.innerType,t.readOnly=!0};var Ni=(e,n,t,o)=>{let i=e._zod.def;Be(i.innerType,n,o);let r=n.seen.get(e);r.ref=i.innerType},du=(e,n,t,o)=>{let i=e._zod.innerType;Be(i,n,o);let r=n.seen.get(e);r.ref=i};var pu=new WeakSet([Object.prototype,Error.prototype]);function cr(e,n,t){Object.defineProperty(e,n,{configurable:!0,enumerable:!1,get(){let o=t(this);return Object.defineProperty(this,n,{value:o,configurable:!0,writable:!0}),o},set(o){Object.defineProperty(this,n,{value:o,configurable:!0,writable:!0})}})}var Zm=(e,n)=>{Cs.init(e,n),e.name="ZodError";let t=Object.getPrototypeOf(e);pu.has(t)||(pu.add(t),cr(t,"format",o=>i=>As(o,i)),cr(t,"flatten",o=>i=>Ns(o,i)),cr(t,"addIssue",o=>i=>{o.issues.push(i),o.message=JSON.stringify(o.issues,Nt,2)}),cr(t,"addIssues",o=>i=>{o.issues.push(...i),o.message=JSON.stringify(o.issues,Nt,2)}),Object.defineProperty(t,"isEmpty",{configurable:!0,enumerable:!1,get(){return this.issues.length===0}}))};var yn=$("ZodError",Zm,void 0,{Parent:Error});var mu=Bo(yn),fu=Fo(yn),hu=Uo(yn),gu=jo(yn),vu=Is(yn),bu=Gs(yn),yu=$s(yn),wu=Rs(yn),xu=Ds(yn),_u=Ms(yn),Pu=Hs(yn),ku=Zs(yn);function Fm(){dn.localeError||bn(Fc())}function ur(){dn.memoizer||bn({memoizer:Bc()})}var Oe=$("ZodType",(e,n)=>(Fm(),Te.init(e,n),e.def=n,e.type=n.type,e),{check(...e){let n=this.def;return this.clone(ce.mergeDefs(n,{checks:[...n.checks??[],...e.map(t=>typeof t=="function"?{_zod:{check:t,def:{check:"custom"},onattach:[]}}:t)]}),{parent:!0})},with(...e){return this.check(...e)},clone(e,n){return Rn(this,e,n)},brand(){return this},register(e,n){return e.add(this,n),this},refine(e,n){return this.check(Bf(e,n))},superRefine(e,n){return this.check(Ff(e,n))},overwrite(e){return this.check(it(e))},optional(){return zu(this)},exactOptional(){return Ef(this)},nullable(){return Cu(this)},nullish(){return zu(Cu(this))},nonoptional(e){return Of(this,e)},array(){return ze(this)},or(e){return Mt([this,e])},and(e){return _f(this,e)},transform(e){return Nu(this,Sf(e))},default(e){return Cf(this,e)},prefault(e){return Af(this,e)},catch(e){return Gf(this,e)},pipe(e){return Nu(this,e)},readonly(){return Df(this)},describe(e){let n=this.clone();return gt.add(n,{description:e}),n},meta(...e){if(e.length===0)return gt.get(this);let n=this.clone();return gt.add(n,e[0]),n},isOptional(){return this.safeParse(void 0).success},isNullable(){return this.safeParse(null).success},apply(e,...n){return n.length===0?e(this):e(this,...n)},get"~standard"(){return ce.hide(this,"~standard",{...oi(this),jsonSchema:{input:po(this,"input"),output:po(this,"output")}})},set"~standard"(e){ce.own(this,"~standard",e)},parse:function e(n,t){return mu(this,n,t,{callee:e})},parseAsync:async function e(n,t){return await fu(this,n,t,{callee:e})},safeParse(e,n){return hu(this,e,n)},async safeParseAsync(e,n){return gu(this,e,n)},get spa(){return this?.safeParseAsync},set spa(e){ce.own(this,"spa",e)},validate(e,n){return qr(this,e,n)},validateAsync(e,n){return Kr(this,e,n)},encode:function e(n,t){return vu(this,n,t,{callee:e})},decode:function e(n,t){return bu(this,n,t,{callee:e})},encodeAsync:async function e(n,t){return await yu(this,n,t,{callee:e})},decodeAsync:async function e(n,t){return await wu(this,n,t,{callee:e})},safeEncode(e,n){return xu(this,e,n)},safeDecode(e,n){return _u(this,e,n)},async safeEncodeAsync(e,n){return Pu(this,e,n)},async safeDecodeAsync(e,n){return ku(this,e,n)},toJSONSchema(e){return Ol(this,{})(e)},get description(){return gt.get(this)?.description},get _def(){return this._zod.def}}),Au=$("_ZodString",(e,n)=>{Jo.init(e,n),Oe.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Fl(e,t,o,i)},ce.derived({format:e=>zn(e).format??null,minLength:e=>zn(e).minimum??null,maxLength:e=>zn(e).maximum??null},{regex(...e){return this.check(pi(...e))},includes(...e){return this.check(hi(...e))},startsWith(...e){return this.check(gi(...e))},endsWith(...e){return this.check(vi(...e))},min(...e){return this.check($t(...e))},max(...e){return this.check(ir(...e))},length(...e){return this.check(sr(...e))},nonempty(...e){return this.check($t(1,...e))},lowercase(e){return this.check(mi(e))},uppercase(e){return this.check(fi(e))},trim(){return this.check(yi())},normalize(...e){return this.check(bi(...e))},toLowerCase(){return this.check(wi())},toUpperCase(){return this.check(xi())},slugify(){return this.check(_i())}})),Um=$("ZodString",(e,n)=>{Jo.init(e,n),Au.init(e,n)},{email(e){return this.check(Lc(qm,e))},url(e){return this.check(Yc(Jm,e))},jwt(e){return this.check(ml(pf,e))},emoji(e){return this.check(Xc(Qm,e))},guid(e){return this.check(Wc(Km,e))},uuid(e){return this.check(qc(lr,e))},uuidv4(e){return this.check(Kc(lr,e))},uuidv6(e){return this.check(Jc(lr,e))},uuidv7(e){return this.check(Qc(lr,e))},nanoid(e){return this.check(el(Ym,e))},cuid(e){return this.check(nl(Xm,e))},cuid2(e){return this.check(tl(ef,e))},ulid(e){return this.check(ol(nf,e))},base64(e){return this.check(ul(lf,e))},base64url(e){return this.check(dl(uf,e))},xid(e){return this.check(rl(tf,e))},ksuid(e){return this.check(il(of,e))},ipv4(e){return this.check(sl(rf,e))},ipv6(e){return this.check(al(sf,e))},cidrv4(e){return this.check(cl(af,e))},cidrv6(e){return this.check(ll(cf,e))},e164(e){return this.check(pl(df,e))},datetime(e){return this.check(fl(jm,e))},date(e){return this.check(hl(Vm,e))},time(e){return this.check(gl(Lm,e))},duration(e){return this.check(vl(Wm,e))}});function ne(e){return Vc(Um,e)}var Me=$("ZodStringFormat",(e,n)=>{Ae.init(e,n),Au.init(e,n)}),jm=$("ZodISODateTime",(e,n)=>{Xa.init(e,n),Me.init(e,n)}),Vm=$("ZodISODate",(e,n)=>{ec.init(e,n),Me.init(e,n)}),Lm=$("ZodISOTime",(e,n)=>{nc.init(e,n),Me.init(e,n)}),Wm=$("ZodISODuration",(e,n)=>{tc.init(e,n),Me.init(e,n)}),qm=$("ZodEmail",(e,n)=>{Fa.init(e,n),Me.init(e,n)});var Km=$("ZodGUID",(e,n)=>{Za.init(e,n),Me.init(e,n)});var lr=$("ZodUUID",(e,n)=>{Ba.init(e,n),Me.init(e,n)});var Jm=$("ZodURL",(e,n)=>{Va.init(e,n),Me.init(e,n)});var Qm=$("ZodEmoji",(e,n)=>{La.init(e,n),Me.init(e,n)});var Ym=$("ZodNanoID",(e,n)=>{Wa.init(e,n),Me.init(e,n)});var Xm=$("ZodCUID",(e,n)=>{qa.init(e,n),Me.init(e,n)});var ef=$("ZodCUID2",(e,n)=>{Ka.init(e,n),Me.init(e,n)});var nf=$("ZodULID",(e,n)=>{Ja.init(e,n),Me.init(e,n)});var tf=$("ZodXID",(e,n)=>{Qa.init(e,n),Me.init(e,n)});var of=$("ZodKSUID",(e,n)=>{Ya.init(e,n),Me.init(e,n)});var rf=$("ZodIPv4",(e,n)=>{oc.init(e,n),Me.init(e,n)});var sf=$("ZodIPv6",(e,n)=>{ic.init(e,n),Me.init(e,n)});var af=$("ZodCIDRv4",(e,n)=>{sc.init(e,n),Me.init(e,n)});var cf=$("ZodCIDRv6",(e,n)=>{ac.init(e,n),Me.init(e,n)});var lf=$("ZodBase64",(e,n)=>{lc.init(e,n),Me.init(e,n)});var uf=$("ZodBase64URL",(e,n)=>{uc.init(e,n),Me.init(e,n)});var df=$("ZodE164",(e,n)=>{dc.init(e,n),Me.init(e,n)});var pf=$("ZodJWT",(e,n)=>{pc.init(e,n),Me.init(e,n)});var Ou=$("ZodNumber",(e,n)=>{ii.init(e,n),Oe.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Ul(e,t,o,i),e.isFinite=!0},ce.derived({minValue:e=>{let{minimum:n,exclusiveMinimum:t}=zn(e);return Math.max(n??Number.NEGATIVE_INFINITY,t??Number.NEGATIVE_INFINITY)},maxValue:e=>{let{maximum:n,exclusiveMaximum:t}=zn(e);return Math.min(n??Number.POSITIVE_INFINITY,t??Number.POSITIVE_INFINITY)},isInt:e=>{let{isInt:n,multipleOf:t}=zn(e);return!!n||!!t?.some(Number.isSafeInteger)},format:e=>zn(e).format??null},{gt(e,n){return this.check(or(e,n))},gte(e,n){return this.check(lo(e,n))},min(e,n){return this.check(lo(e,n))},lt(e,n){return this.check(tr(e,n))},lte(e,n){return this.check(co(e,n))},max(e,n){return this.check(co(e,n))},int(e){return this.check(Su(e))},safe(e){return this.check(Su(e))},positive(e){return this.check(or(0,e))},nonnegative(e){return this.check(lo(0,e))},negative(e){return this.check(tr(0,e))},nonpositive(e){return this.check(co(0,e))},multipleOf(e,n){return this.check(rr(e,n))},step(e,n){return this.check(rr(e,n))},finite(){return this}}));function pn(e){return bl(Ou,e)}var mf=$("ZodNumberFormat",(e,n)=>{mc.init(e,n),Ou.init(e,n)});function Su(e){return yl(mf,e)}var ff=$("ZodBoolean",(e,n)=>{fc.init(e,n),Oe.init(e,n),e._zod.processJSONSchema=(t,o,i)=>jl(e,t,o,i)});function be(e){return wl(ff,e)}var hf=$("ZodNull",(e,n)=>{hc.init(e,n),Oe.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Vl(e,t,o,i)});function mo(e){return xl(hf,e)}var gf=$("ZodUnknown",(e,n)=>{gc.init(e,n),Oe.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Wl(e,t,o,i)});function Eu(){return _l(gf)}var vf=$("ZodNever",(e,n)=>{vc.init(e,n),Oe.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Ll(e,t,o,i)});function Iu(e){return Pl(vf,e)}var bf=$("ZodArray",(e,n)=>{ur(),bc.init(e,n),Oe.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Yl(e,t,o,i),e.element=n.element},{min(e,n){return this.check($t(e,n))},nonempty(e){return this.check($t(1,e))},max(e,n){return this.check(ir(e,n))},length(e,n){return this.check(sr(e,n))},unwrap(){return this.element}});function ze(e,n){return kl(bf,e,n)}var yf=$("ZodObject",(e,n)=>{ur(),xc.init(e,n),Oe.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Xl(e,t,o,i),ce.installLazyProp(e,"shape",t=>t._zod.def.shape,!1)},{keyof(){return ue(Object.keys(this._zod.def.shape))},catchall(e){return this.clone(ce.mergeDefs(this._zod.def,{catchall:e}))},passthrough(){return this.clone(ce.mergeDefs(this._zod.def,{catchall:Eu()}))},loose(){return this.clone(ce.mergeDefs(this._zod.def,{catchall:Eu()}))},strict(){return this.clone(ce.mergeDefs(this._zod.def,{catchall:Iu()}))},strip(){return this.clone(ce.mergeDefs(this._zod.def,{catchall:void 0}))},extend(e){return ce.extend(this,e)},safeExtend(e){return ce.safeExtend(this,e)},merge(e){return ce.merge(this,e)},pick(e){return ce.pick(this,e)},omit(e){return ce.omit(this,e)},partial(...e){return ce.partial($u,this,e[0])},exactPartial(...e){return ce.partial(Ru,this,e[0],"exactPartial")},required(...e){return ce.required(Du,this,e[0])}});function K(e,n){return new yf({type:"object",shape:e,catchall:Iu(),...ce.normalizeParams(n)})}var Gu=$("ZodUnion",(e,n)=>{si.init(e,n),Oe.init(e,n),e._zod.processJSONSchema=(t,o,i)=>eu(e,t,o,i),e.options=n.options});function Mt(e,n){return new Gu({type:"union",options:e,...ce.normalizeParams(n)})}var wf=$("ZodDiscriminatedUnion",(e,n)=>{Gu.init(e,n),_c.init(e,n)});function fo(e,n,t){return new wf({type:"union",options:n,discriminator:e,...ce.normalizeParams(t)})}var xf=$("ZodIntersection",(e,n)=>{Pc.init(e,n),Oe.init(e,n),e._zod.processJSONSchema=(t,o,i)=>nu(e,t,o,i)});function _f(e,n){return new xf({type:"intersection",left:e,right:n})}var Tu=$("ZodRecord",(e,n)=>{ur(),kc.init(e,n),Oe.init(e,n),e._zod.processJSONSchema=(t,o,i)=>tu(e,t,o,i),e.keyType=n.keyType,e.valueType=n.valueType});function Ii(e,n,t){return!n||!n._zod?new Tu({type:"record",keyType:ne(),valueType:e,...ce.normalizeParams(n)}):new Tu({type:"record",keyType:e,valueType:n,...ce.normalizeParams(t)})}var Oi=$("ZodEnum",(e,n)=>{Sc.init(e,n),Oe.init(e,n),e._zod.processJSONSchema=(o,i,r)=>ql(e,o,i,r),e.enum=n.entries,e.options=[...e._zod.values];let t=new Set(Object.keys(n.entries));e.extract=(o,i)=>{let r={};for(let s of o)if(t.has(s))r[s]=n.entries[s];else throw new Error(`Key ${s} not found in enum`);return new Oi({...n,checks:[],...ce.normalizeParams(i),entries:r})},e.exclude=(o,i)=>{let r={...n.entries};for(let s of o)if(t.has(s))delete r[s];else throw new Error(`Key ${s} not found in enum`);return new Oi({...n,checks:[],...ce.normalizeParams(i),entries:r})}});function ue(e,n){let t=Array.isArray(e)?Object.fromEntries(e.map(o=>[o,o])):e;return new Oi({type:"enum",entries:t,...ce.normalizeParams(n)})}var Pf=$("ZodLiteral",(e,n)=>{Ec.init(e,n),Oe.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Kl(e,t,o,i),e.values=new Set(n.values),Object.defineProperty(e,"value",{get(){if(n.values.length>1)throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");return n.values[0]}})});function we(e,n){return new Pf({type:"literal",values:Array.isArray(e)?e:[e],...ce.normalizeParams(n)})}var kf=$("ZodTransform",(e,n)=>{ur(),Tc.init(e,n),Oe.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Ql(e,t,o,i),e._zod.parse=(t,o)=>{if(o.direction==="backward")throw new Gt(e.constructor.name);t.addIssue=r=>{if(typeof r=="string")t.issues.push(ce.issue(r,t.value,n));else{let s=r;s.fatal&&(s.continue=!1),s.code??(s.code="custom"),"input"in s||(s.input=t.value),s.inst??(s.inst=e),t.issues.push(ce.issue(s))}};let i=n.transform(t.value,t);return i instanceof Promise?i.then(r=>(t.value=r,t)):(t.value=i,t)}});function Sf(e){return new kf({type:"transform",transform:e})}var $u=$("ZodOptional",(e,n)=>{ai.init(e,n),Oe.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Ni(e,t,o,i),e.unwrap=()=>e._zod.def.innerType});function zu(e){return new $u({type:"optional",innerType:e})}var Ru=$("ZodExactOptional",(e,n)=>{zc.init(e,n),Oe.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Ni(e,t,o,i),e.unwrap=()=>e._zod.def.innerType});function Ef(e){return new Ru({type:"optional",innerType:e})}var Tf=$("ZodNullable",(e,n)=>{Cc.init(e,n),Oe.init(e,n),e._zod.processJSONSchema=(t,o,i)=>ou(e,t,o,i),e.unwrap=()=>e._zod.def.innerType});function Cu(e){return new Tf({type:"nullable",innerType:e})}var zf=$("ZodDefault",(e,n)=>{Nc.init(e,n),Oe.init(e,n),e._zod.processJSONSchema=(t,o,i)=>su(e,t,o,i),e.unwrap=()=>e._zod.def.innerType,e.removeDefault=e.unwrap});function Cf(e,n){return new zf({type:"default",innerType:e,get defaultValue(){return typeof n=="function"?n():ce.shallowClone(n)}})}var Nf=$("ZodPrefault",(e,n)=>{Ac.init(e,n),Oe.init(e,n),e._zod.processJSONSchema=(t,o,i)=>au(e,t,o,i),e.unwrap=()=>e._zod.def.innerType});function Af(e,n){return new Nf({type:"prefault",innerType:e,get defaultValue(){return typeof n=="function"?n():ce.shallowClone(n)}})}var Du=$("ZodNonOptional",(e,n)=>{Oc.init(e,n),Oe.init(e,n),e._zod.processJSONSchema=(t,o,i)=>ru(e,t,o,i),e.unwrap=()=>e._zod.def.innerType});function Of(e,n){return new Du({type:"nonoptional",innerType:e,...ce.normalizeParams(n)})}var If=$("ZodCatch",(e,n)=>{Ic.init(e,n),Oe.init(e,n),e._zod.processJSONSchema=(t,o,i)=>cu(e,t,o,i),e.unwrap=()=>e._zod.def.innerType,e.removeCatch=e.unwrap});function Gf(e,n){return new If({type:"catch",innerType:e,catchValue:typeof n=="function"?n:ce.constantCatch(n)})}var $f=$("ZodPipe",(e,n)=>{Gc.init(e,n),Oe.init(e,n),e._zod.processJSONSchema=(t,o,i)=>lu(e,t,o,i),e.in=n.in,e.out=n.out});function Nu(e,n){return new $f({type:"pipe",in:e,out:n})}var Rf=$("ZodReadonly",(e,n)=>{$c.init(e,n),Oe.init(e,n),e._zod.processJSONSchema=(t,o,i)=>uu(e,t,o,i),e.unwrap=()=>e._zod.def.innerType});function Df(e){return new Rf({type:"readonly",innerType:e})}var Mf=$("ZodLazy",(e,n)=>{Rc.init(e,n),Oe.init(e,n),e._zod.processJSONSchema=(t,o,i)=>du(e,t,o,i),e.unwrap=()=>e._zod.def.getter()});function Hf(e){return new Mf({type:"lazy",getter:e})}var Zf=$("ZodCustom",(e,n)=>{Dc.init(e,n),Oe.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Jl(e,t,o,i)});function Bf(e,n={}){return Sl(Zf,e,n)}function Ff(e,n){return El(e,n)}function Mu(e){let n=Hf(()=>Mt([ne(e),pn(),be(),mo(),ze(n),Ii(ne(),n)]));return n}var dr=Object.freeze(["panel-open","panel-close","panel-move","page-home","page-settings","page-settings-tab","page-model-tab","page-setup","page-authorization","page-repair","page-session-management","open-native-session","open-feedback","change-listen-mode","change-audio-device","edit-choice","commit-form","activate-control","dismiss","details-toggle","keyboard-navigation","ui-connect","ui-reconnect","ui-status-refresh","ui-request","ui-stream","ui-render-error","ui-action-error","ui-read-recovery","manage-session","start-voice","stop-voice","ui-buffer-overflow","session-history-open","session-history-close","subagent-history-open","subagent-history-close","show-subagents","show-main-sessions","open-native-subagent","new-voice-session","bind-current-session","retry-voice-transcript","bind-existing-session","unbind-existing-session","listen-mode-ptt","listen-mode-always","listen-mode-wake","settings-audio","settings-interaction","settings-prompt","settings-models","settings-advanced","settings-pets"]),Hu=64*1024,ho=64,Zu=10080*60*1e3;var Gi="whaleConversation",ke=(e,n)=>({mode:"strict",typeSymbol:`dsh-fish-voice/conversation#${e}`,create:n}),fr=ke("sessionId",()=>ne().min(1).max(256)),Uf=ke("settingsSessionId",()=>fr.create().nullable()),qu=new Set(["status","read-settings","listen-mode","complete-setup","set-visibility","inspect-tts","save-tts","preview-tts","cancel-tts","save-models","model-installer","inspect-model-compute","plan-model-install","start-model-install","control-model-install","apply-model-install","pick-local-path","enable","disable","new","resume","read-history","read-audio-devices","save-audio-device","save-settings","capture-bindings","save-bindings","save-voice-prompt","conversation-models","save-conversation-model","inspect-performance","set-performance-mode","read-output-volume","set-output-volume"]),jf=ke("volumeRequest",()=>K({revision:pn().int().nonnegative(),volume:pn().min(0).max(1)})),Bu=K({id:ne(),role:ue(["user","assistant"]),text:ne().max(8e3),state:ue(["reply","interrupted","delivered","speech-requested","speech-failed"]),at:pn()}),Vf=K({state:ue(["disabled","starting","waiting","listening","paused","error"]),deadlineAt:pn().nonnegative().nullable(),streamOpen:be(),detection:ue(["asr-after-utterance","acoustic-after-utterance"])}),Ri=ne().uuid(),Lf=K({id:Ri,text:ne().max(8e3),sessionId:fr.create(),title:ne().max(256).nullable(),state:ue(["sending","queued","busy","ready","delivered","uncertain","failed","discarded"])}),Wf=K({sessionId:fr.create(),items:ze(K({id:Ri,text:ne().max(8e3),title:ne().max(256).nullable().optional(),state:ue(["busy","ready","sending","uncertain"])})).max(8)}),qf=ke("snapshot",()=>K({revision:pn().int().nonnegative(),historyGeneration:pn().int().nonnegative().optional(),rootSessionId:ne().nullable(),title:mo(),latest:Bu.nullable(),items:ze(Bu).max(40),inputActive:be(),inputError:ue(["device","recognition","no-speech"]).nullable().optional(),providerError:ne().max(480).optional(),inputDelivery:Lf.optional(),retryTranscripts:Wf.nullable().optional(),playbackConfirmed:we(!1),wake:Vf.optional(),helper:K({online:be(),listenMode:ue(["ptt","always","wake"]).nullable()}).refine(e=>e.online||e.listenMode===null).optional()})),Kf=ke("volume",()=>K({supported:be(),backend:we("dsh-speak").nullable(),volume:pn().min(0).max(1).nullable(),revision:pn().int().nullable(),apply:we("next-output").nullable(),reason:ne().nullable()})),ee=ne().max(4096),Je=pn().int().nonnegative().max(Number.MAX_SAFE_INTEGER),Jf=K({code:ne().max(64),message:ne().max(512)}),Fu=K({available:be(),reason:ee.nullable(),runtimeLoaded:we(!1),backend:ee.optional(),provider:ee.optional(),device:ee.optional(),computeType:ee.optional(),supportedComputeTypes:ze(ee).max(32).optional(),deviceCount:Je.optional(),deviceIndex:Je.optional(),validation:ee.optional(),note:ee.optional(),providerAdvertised:be().optional()}),Qf=K({schema:we(1),default:we("cpu"),observedAt:ee.nullable(),reason:ee.optional(),backends:K({sensevoice:K({cpu:Fu,cuda:Fu}).optional()})}),Yf=K({observedAt:ee,scope:we("plugin-host"),platform:ee,arch:ee,cpuLogicalCores:Je.nullable(),totalMemoryBytes:Je.nullable(),availableMemoryBytes:Je.nullable(),gpuMemoryBytes:Je.nullable(),gpuMemoryReason:ee,gpuSource:we("dxgi").nullable().optional(),gpuAdapters:ze(K({name:ne().min(1).max(256),dedicatedVideoMemoryBytes:Je,sharedSystemMemoryBytes:Je})).max(32).optional()}),Xf=K({modelId:ee,confidence:ue(["not-assessed","unknown","heuristic-only"]),recommended:be(),badge:ee.nullable(),state:ue(["manual-choice","unknown","recommended-pending-runtime-validation","limited-memory","busy-memory","recommended-lightweight"]),reason:ee,policy:ee.optional(),runtimeValidated:we(!1).optional(),gpuValidated:we(!1).optional()}),eh=K({release:ee,source:ee,sources:ze(ee).max(16).optional(),redirectHost:ee,platform:ee,arch:ee,executable:ee,licenseUrls:ze(ee).max(20)}),nh=K({jobId:ee,modelId:ee,status:ue(["waiting","verifying","applied","blocked","paused","cancelled"]),reason:ee.nullable()}),th=K({id:ee,runtime:eh.nullable().optional(),purpose:ue(["tts","asr"]).optional(),computeOptions:ze(ue(["cpu","auto","cuda","vulkan"])).max(4).optional(),recommendation:Xf,title:ee,backend:ee.nullable(),available:be(),reason:ee.nullable(),totalBytes:Je.nullable(),source:ee.nullable(),licenseUrls:ze(ee).max(20),licenseNote:ee.nullable(),verification:ee.optional(),runtimeLoaded:we(!1)}),oh=K({id:ne().uuid(),modelId:ee,compute:ue(["cpu","auto","cuda","vulkan"]),status:ue(["queued","running","paused","failed","cancelled","installed","blocked"]),stage:ue(["queued","running","paused","failed","cancelled","installed","checking-runtime","verifying-local","downloading","verifying","installing","blocked"]),createdAt:ee,updatedAt:ee,totalBytes:Je.nullable(),receivedBytes:Je,runtimeLoaded:we(!1),error:Jf.nullable(),currentFile:ee.nullable().optional(),files:ze(K({name:ee,bytes:Je,receivedBytes:Je,verified:be(),reused:be().optional()})).max(200),installedPath:ee.optional(),sourceDirectory:ee.optional(),modelVariant:ue(["q4_k_m","q8_0"]).optional(),reused:we(!0).optional(),reusedBytes:Je.optional(),purpose:ue(["tts","asr"]).optional(),recommendedSettings:Mt([K({tts:K({provider:we("local"),localModelId:ee,localModelPath:ee})}),K({asr:we("sensevoice"),models:K({sensevoiceDir:ee.optional()}),modelCompute:ue(["cpu","auto","cuda"])})]).optional()}).refine(e=>e.status==="blocked"?e.stage==="blocked"&&e.error!==null&&e.installedPath===void 0&&e.recommendedSettings===void 0:e.stage!=="blocked"&&e.totalBytes!==null),rh=ke("modelSnapshot",()=>K({schema:we(1),hardware:Yf,compute:Qf,refresh:K({pending:be(),observedAt:ne().max(64).nullable(),attemptedAt:ne().max(64).nullable(),error:ne().max(512).nullable(),intervalMs:we(3e5)}).optional(),models:ze(th).max(32),jobs:ze(oh).max(1e3),ttsInstallIntent:nh.nullable().optional()})),ih=ke("authorizationRequest",()=>K({revision:ne().min(1).max(256),grant:be()})),sh=ke("senseVoiceAsrRequest",()=>fo("operation",[K({operation:we("status")}),K({operation:we("retry")})])),ah={state:ue(["idle","downloading","ready","error"]),receivedBytes:Je,totalBytes:Je},ch=ke("senseVoiceAsrResult",()=>K({...ah,selected:be(),message:ne().max(512).nullable()})),Uu=ke("authorization",()=>K({schema:we(1),revision:ne().min(1).max(256),completed:be(),granted:be(),usageAgreement:K({version:we(1),accepted:be(),text:ze(ee).max(16)}).optional(),modelSourcesChanged:be().optional(),blockedOperations:ze(ee).max(32),revocationUnconfirmed:be(),scopes:ze(K({id:ee,title:ee,description:ee,allowed:be()})).max(16),modelSources:ze(K({modelId:ee,source:ee,licenseUrls:ze(ee).max(20),licenseNote:ee,runtime:K({source:ee,sources:ze(ee).max(16).optional(),licenseUrls:ze(ee).max(20),redirectHost:ee.nullable()}).optional()})).max(32),restrictions:ze(ee).max(16)})),lh=ke("setup",()=>K({version:we(1),completed:be()})),mn=ne().min(1).max(256),Ue=ne().min(1).max(256),ju=ue(["cpu","auto","cuda","vulkan"]),Vu={sourceDirectory:ne().min(1).max(4096).optional(),modelVariant:ue(["q4_k_m","q8_0"]).optional()},pr=Ii(ne(),Mu()),uh=K({baseUrl:ne().min(1).max(2048),model:ne().min(1).max(256),voice:ne().min(1).max(256),apiKeyEnv:ne().max(128).regex(/^[A-Za-z_][A-Za-z0-9_]*$/).nullable(),format:ue(["wav","mp3"]),textTransmissionAccepted:be()}),Ku=ne().min(1).max(512).refine(e=>!!e.trim()&&!/[\u0000-\u001f\u007f]/.test(e)).nullable().optional(),dh=pr.refine(e=>e.customTts===void 0?e.provider!=="custom":uh.safeParse(e.customTts).success,"\u81EA\u5B9A\u4E49 TTS \u914D\u7F6E\u65E0\u6548").refine(e=>Ku.safeParse(e.systemVoiceId).success,"Windows \u7CFB\u7EDF\u97F3\u8272\u65E0\u6548"),ph=K({provider:ue(["system","deepseek","local"]),systemVoiceId:Ku,deepseekVoice:ue(["stella","tide"]),deepseekTextTransmissionAccepted:be(),volume:pn().min(0).max(1),localModelId:ne().max(128).nullable(),localModelPath:ne().max(4096).nullable(),referenceAudioPath:ne().max(4096).nullable(),referenceAudioAccepted:be()}),mh=K({backend:ue(["winmm","portaudio"]),id:ne().min(1).max(1024),name:ne().min(1).max(256)}).nullable(),fh={"read-history":{cursor:ne().max(128).optional()},"read-audio-devices":{},"save-audio-device":{revision:mn,direction:ue(["input","output"]),selection:mh},"agent-permissions":{},"save-agent-permissions":{revision:mn,allowed:K({"set-performance-mode":be(),"set-visibility":be(),"set-output-volume":be()})},"agent-requests":{},"decide-agent-request":{id:Ue,approve:be(),acknowledgements:ze(ne().max(80)).max(10)},"model-installer":{},"inspect-model-compute":{},"plan-model-install":{modelId:Ue,compute:ju,...Vu},"start-model-install":{modelId:Ue,compute:ju,...Vu,planHash:mn,accepted:we(!0),useWhenReady:be().optional()},"control-model-install":{id:Ue,operation:ue(["pause","resume","cancel"])},"apply-model-install":{id:Ue,revision:mn},status:{},enable:{expectedOwnerSessionId:Ue.nullable().optional(),expectedExistingSessionId:Ue.nullable().optional()},disable:{},"read-settings":{},new:{expectedOwnerSessionId:Ue.nullable().optional()},"inspect-performance":{},"set-performance-mode":{revision:mn,performanceMode:ue(["fast","balanced","high","compatibility"])},"inspect-tts":{},"save-tts":{revision:mn,values:dh},"complete-setup":{revision:mn},"preview-tts":{revision:mn.optional(),values:ph.optional()},"cancel-tts":{},list:{cursor:ne().max(2048).optional()},resume:{id:Ue},"listen-mode":{mode:ue(["ptt","always","wake"])},"set-visibility":{revision:mn,visibility:ue(["hidden","workspace"])},"pick-local-path":{kind:ue(["referenceAudio","sensevoiceDir","campplus","sourceDirectory"])},"capture-bindings":{operation:ue(["begin","end"]),token:Ue.optional(),inactive:be().optional()},"save-bindings":{revision:mn,values:pr,bindingContext:K({ownerSessionId:Ue.nullable(),epoch:Ue.nullable(),rootSessionId:Ue.nullable()})},"save-voice-prompt":{revision:mn,values:K({text:ne().max(32768)})},"conversation-models":{},"save-conversation-model":{revision:mn,values:K({mode:ue(["auto","manual"]),provider:ne().min(1).max(256).nullable(),model:ne().min(1).max(256).nullable()})},"save-settings":{revision:mn,values:pr},"save-models":{revision:mn,values:pr}},hh=ke("uiActionRequest",()=>fo("action",Object.entries(fh).map(([e,n])=>K({action:we(e),...n}))).refine(e=>e.action!=="preview-tts"||Object.hasOwn(e,"revision")===Object.hasOwn(e,"values"),"\u8349\u7A3F\u8BD5\u542C\u5FC5\u987B\u540C\u65F6\u63D0\u4F9B\u914D\u7F6E\u7248\u672C\u548C\u8BBE\u7F6E").refine(e=>JSON.stringify(e).length<=(e.action==="save-voice-prompt"?2e5:8192),"\u64CD\u4F5C\u6570\u636E\u8FC7\u957F")),Lu=ke("uiActionResult",()=>ne().max(4*1024*1024)),gh=ke("sessionManagementRequest",()=>fo("operation",[K({operation:we("list"),rootId:Ue.optional(),cursor:ne().max(2048).optional()}),K({operation:we("unhide"),rootId:Ue,id:Ue}),K({operation:we("restore"),rootId:Ue,id:Ue})])),vh=ke("presentation",()=>K({shown:ze(Mt([K({id:Ue,parentId:mo(),mode:mo()}),K({id:Ue,parentId:Ue,mode:ue(["one-shot","continuable","unknown"])})]))})),$i=ne().min(1).max(128),bh=ke("updateRequest",()=>fo("action",[K({action:we("check")}),K({action:we("install"),version:$i})])),Wu=ke("updateSnapshot",()=>K({schema:we(1),revision:pn().int().nonnegative().optional(),currentVersion:$i,channel:ue(["stable","preview"]),status:ue(["idle","checking","current","available","incompatible","installing","restart-required","enable-required","installed","error","unsupported"]),checkedAt:ne().max(64).nullable(),release:K({version:$i,announcement:ne().min(1).max(600),url:ne().startsWith("https://github.com/Emikosama/dsh-fish-voice/releases/tag/v").max(256)}).nullable(),message:ne().max(512).nullable(),canInstall:be()})),mr=fr.create(),go=K({sessionId:mr,title:ne().max(256).nullable(),availability:ue(["ready","busy","unavailable","archived"]),unavailableReason:ue(["managed","subagent"]).optional(),updatedAt:pn().int().nonnegative().max(864e13).nullable().optional()}),Ju=ne().min(1).max(512),yh=ke("listExistingSessionsRequest",()=>Mt([K({sessionId:mr}),K({query:ne().max(128).optional(),cursor:Ju.optional()})])),wh=ke("listExistingSessionsResult",()=>K({items:ze(go).max(100),nextCursor:Ju.nullable(),binding:go.nullable()})),xh=ke("setExistingSessionRequest",()=>K({sessionId:mr.nullable(),expectedSessionId:mr.nullable()})),_h=ke("setExistingSessionResult",()=>K({binding:go.nullable()})),Qu=ne().min(1).max(160).regex(/^[A-Za-z0-9_-]+$/),Ph=ke("operationLogPageRequest",()=>K({cursor:Qu.optional()})),kh=ke("operationLogPage",()=>K({text:ne().max(Hu),nextCursor:Qu.nullable()})),Yu=ne().uuid(),Sh=ke("operationScopeResult",()=>K({scope:Yu})),Eh=ke("recordOperationRequest",()=>K({scope:Yu,events:ze(K({id:ne().uuid(),at:Je,action:ue(dr),source:ue(["user","ui"]),phase:ue(["requested","finished"]).optional(),result:ue(["ok","failed","cancelled"]).optional(),count:Je.positive().optional()}).refine(e=>e.action==="ui-buffer-overflow"?e.source==="ui"&&e.count!==void 0:e.count===void 0)).min(1).max(ho)})),Th=ke("recordOperationResult",()=>K({accepted:be()})),zh=ke("retryVoiceTranscriptRequest",()=>K({id:Ri})),Ch=ke("retryVoiceTranscriptResult",()=>K({accepted:be()})),Nh={retryVoiceTranscript:zh,recordClientOperations:Eh,readOperationLog:Ph,action:hh,saveAuthorization:ih,manageSessions:gh,senseVoiceAsrAction:sh,updateAction:bh,listExistingVoiceSessions:yh,setExistingVoiceSession:xh},Ah={readClientOperationScope:Sh,recordClientOperations:Th,readOperationLog:kh,action:Lu,manageSessions:Lu,readAuthorization:Uu,saveAuthorization:Uu,senseVoiceAsrAction:ch,readSetup:lh,followPresentation:vh,followModels:rh,followUpdates:Wu,updateAction:Wu,listExistingVoiceSessions:wh,setExistingVoiceSession:_h,retryVoiceTranscript:Ch},We=(e,n,t=!1)=>({id:`dsh-fish-voice#${Gi}/${e}`,service:Gi,namespace:Gi,method:e,invocation:{kind:"direct"},...t?{mode:"stream"}:{},parameters:n.map(o=>({name:o,wire:o,source:"json",codec:o==="sessionId"?Uf:Nh[e]??jf})),cancellation:{parameter:"signal"},result:Ah[e]??(t?qf:Kf)}),Xu={package:"dsh-fish-voice/conversation",descriptors:[We("action",["sessionId","request"]),We("follow",["sessionId"],!0),We("followModels",["sessionId"],!0),We("followPresentation",[],!0),We("followUpdates",[],!0),We("updateAction",["request"]),We("readSetup",[]),We("readAuthorization",[]),We("saveAuthorization",["request"]),We("senseVoiceAsrAction",["request"]),We("manageSessions",["sessionId","request"]),We("readClientOperationScope",[]),We("recordClientOperations",["request"]),We("readOperationLog",["request"]),We("listExistingVoiceSessions",["request"]),We("setExistingVoiceSession",["request"]),We("retryVoiceTranscript",["request"]),We("readVolume",["sessionId"]),We("setVolume",["sessionId","request"])]};var je=e=>e!==null&&typeof e=="object"&&!Array.isArray(e),Nn=(e,n=1024)=>typeof e=="string"&&e.length<=n,st=e=>typeof e=="number"&&Number.isFinite(e),nn=e=>typeof e=="boolean",Di=e=>{if(!Nn(e,4096))return!1;try{let n=new URL(e);return["https:","http:"].includes(n.protocol)&&!n.username&&!n.password}catch{return!1}},Cn=(e,n=4096)=>e==null||Nn(e,n),Jn=e=>Nn(e,256)&&e.length>0,td=["system","deepseek","local","custom"],ed=[...td,"off"],vo=(e,n)=>Nn(e,n)&&!!e.trim(),Ht=(e,n)=>vo(e,n)&&!/[\u0000-\u001f\u007f]/.test(e),Oh=["baseUrl","model","voice","apiKeyEnv","format","textTransmissionAccepted"],Ih=e=>je(e)&&Object.keys(e).every(n=>Oh.includes(n))&&vo(e.baseUrl,2048)&&vo(e.model,256)&&vo(e.voice,256)&&(e.apiKeyEnv===null||vo(e.apiKeyEnv,128)&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(e.apiKeyEnv))&&["wav","mp3"].includes(e.format)&&nn(e.textTransmissionAccepted),Ce=()=>{throw new Error("\u914D\u7F6E\u63A5\u53E3\u8FD4\u56DE\u4E86\u65E0\u6548\u6570\u636E\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6")};function Mi(e){if(e.onboarding!==void 0&&(!je(e.onboarding)||e.onboarding.version!==1||!nn(e.onboarding.completed))&&Ce(),e.ttsSetup!==void 0){let n=e.ttsSetup;(!je(n)||!ed.includes(n.provider)||!["stella","tide"].includes(n.deepseekVoice)||!nn(n.deepseekTextTransmissionAccepted)||!st(n.volume)||n.volume<0||n.volume>1||!(n.localModelId==null||Jn(n.localModelId))||!Cn(n.localModelPath)||!Cn(n.referenceAudioPath)||!(n.referenceAudioAccepted===void 0||nn(n.referenceAudioAccepted))||!(n.systemVoiceId==null||Ht(n.systemVoiceId,512))||(n.customTts===void 0?n.provider==="custom":!Ih(n.customTts)))&&Ce()}if(e.ttsRuntime?.localComputeBackend!=null&&(!["cpu","vulkan","cuda","hip"].includes(e.ttsRuntime.localComputeBackend)||!nn(e.ttsRuntime.localComputeVerified)||!nn(e.ttsRuntime.localComputeFallback))&&Ce(),e.ttsRuntime?.localTimings!=null){let n=e.ttsRuntime.localTimings;(!je(n)||typeof n.modelResident!="boolean"||["preparationMs","deviceSelectionMs","synthesisMs","playbackMs","totalMs","chunks"].some(t=>!Number.isSafeInteger(n[t])||n[t]<0)||n.chunks<1||n.chunks>4e3)&&Ce()}return e.ttsRuntime!=null&&(!je(e.ttsRuntime)||!Nn(e.ttsRuntime.state,64)||!nn(e.ttsRuntime.busy)||!nn(e.ttsRuntime.blocked)||e.ttsRuntime.provider!=null&&!ed.includes(e.ttsRuntime.provider))&&Ce(),e}function od(e,n){if(je(n)||Ce(),e==="setup-status"&&(Object.keys(n).some(t=>!["version","completed"].includes(t))||n.version!==1||!nn(n.completed))&&Ce(),e==="inspect-tts"&&((!Nn(n.platform,32)||!nn(n.playbackSupported)||!nn(n.deepseekKeyAvailable)||n.autoDownload!==!1||!nn(n.gpuSupported))&&Ce(),n.systemVoices!==void 0&&(!Array.isArray(n.systemVoices)||n.systemVoices.length>128||n.systemVoices.some(t=>!je(t)||!Ht(t.id,512)||!Ht(t.name,256)||!Ht(t.language,64)))&&Ce(),n.systemDefaultVoiceId==null||Ht(n.systemDefaultVoiceId,512)||Ce()),e==="preview-tts"&&((!td.includes(n.provider)||n.fallback!==!1||n.acousticConfirmation!==!1||n.playbackCompleted!==!0||n.textOnly!==void 0)&&Ce(),n.systemVoiceId!==void 0&&(n.provider!=="system"||!Ht(n.systemVoiceId,512))&&Ce()),e==="cancel-tts"&&!["idle","cancelled","unconfirmed"].includes(n.status)&&Ce(),e==="model-installer"){if((n.schema!==1||!Array.isArray(n.models)||n.models.length>100||!Array.isArray(n.jobs)||n.jobs.length>1e3||!je(n.hardware)||!je(n.compute))&&Ce(),n.refresh!=null){let t=n.refresh;(!je(t)||!nn(t.pending)||!Cn(t.observedAt,64)||!Cn(t.attemptedAt,64)||!Cn(t.error,512)||!(t.intervalMs===void 0||st(t.intervalMs)&&t.intervalMs>0&&t.intervalMs<=36e5))&&Ce()}for(let t of n.models)(!je(t)||!Jn(t.id)||!nn(t.available)||t.runtimeLoaded!==!1||!Cn(t.title)||!Cn(t.reason)||!(t.totalBytes==null||st(t.totalBytes)&&t.totalBytes>=0))&&Ce(),t.recommendation!=null&&(!je(t.recommendation)||!nn(t.recommendation.recommended)||!Cn(t.recommendation.reason))&&Ce();for(let t of n.jobs)nd(t);if(n.ttsInstallIntent!=null){let t=n.ttsInstallIntent;(!je(t)||!Jn(t.jobId)||!Jn(t.modelId)||!["waiting","verifying","applied","blocked","paused","cancelled"].includes(t.status)||!Cn(t.reason))&&Ce()}}return e==="inspect-model-compute"&&!je(n.compute)&&!je(n.backends)&&Ce(),e==="plan-model-install"&&(n.reused!==void 0&&(!nn(n.reused)||n.reused!==!0||!Nn(n.sourceDirectory,4096)||!n.sourceDirectory||!["q4_k_m","q8_0"].includes(n.modelVariant)||!st(n.reusedBytes)||n.reusedBytes<0)&&Ce(),n.reused!==!0&&(n.sourceDirectory!==void 0||n.modelVariant!==void 0||n.reusedBytes!==void 0)&&Ce(),Array.isArray(n.files)&&n.files.some(t=>je(t)&&t.reused!==void 0&&!nn(t.reused))&&Ce(),(!Jn(n.modelId)||!["cpu","auto","cuda","vulkan"].includes(n.compute)||!Nn(n.planHash,128)||!Array.isArray(n.files)||n.files.length>200||!st(n.totalBytes)||n.totalBytes<0||!Nn(n.destination,4096)||!Array.isArray(n.licenseUrls)||n.licenseUrls.some(t=>!Di(t))||!Cn(n.source)||!Cn(n.notice)||!Cn(n.licenseNote)||n.files.some(t=>!je(t)||!Jn(t.name)||!st(t.bytes)||t.bytes<0||!Nn(t.sha256,64)||!/^[a-f0-9]{64}$/i.test(t.sha256)||!Di(t.url)||t.downloadUrls!==void 0&&(!Array.isArray(t.downloadUrls)||t.downloadUrls.length>4||t.downloadUrls.some(o=>!Di(o)))))&&Ce()),["start-model-install","control-model-install"].includes(e)&&nd(n),Mi(n)}function nd(e){je(e)&&e.error!=null&&(!je(e.error)||!Nn(e.error.message,512))&&Ce(),(!je(e)||!Jn(e.id)||!Jn(e.modelId)||!["cpu","auto","cuda","vulkan"].includes(e.compute)||!["queued","running","paused","failed","cancelled","installed","blocked"].includes(e.status)||!Nn(e.stage,128)||!st(e.receivedBytes)||e.receivedBytes<0||!(e.totalBytes===null||st(e.totalBytes)&&e.totalBytes>=0)||e.runtimeLoaded!==!1)&&Ce(),e.status==="blocked"&&(e.stage!=="blocked"||!Jn(e.error?.code)||e.installedPath!==void 0||e.recommendedSettings!==void 0)&&Ce()}function Qn(e,n){let t=r=>r!==null&&typeof r=="object"&&!Array.isArray(r),o=r=>typeof r=="string"&&r.length>0&&r.length<=256,i=r=>r===null||t(r)&&Object.keys(r).sort().join(",")==="code,modifiers"&&typeof r.code=="string"&&/^(F([1-9]|1[0-9]|2[0-4])|Key[A-Z]|Digit[0-9]|Space)$/.test(r.code)&&Array.isArray(r.modifiers)&&r.modifiers.length<=3&&new Set(r.modifiers).size===r.modifiers.length&&r.modifiers.every(s=>["Control","Alt","Shift"].includes(s))&&!(r.code==="F4"&&r.modifiers.includes("Alt"));if(!t(n))throw new Error("Fish Voice UI returned invalid data");if(n.wake!==void 0&&!(n.wake===null&&e!=="conversation")&&!ds(n.wake))throw new Error("Invalid wake state");if(n.listenMode!==void 0&&n.listenMode!==null&&!Tt.includes(n.listenMode))throw new Error("Invalid listening mode");if(["status","enable","disable","new","resume","listen-mode"].includes(e)){if(!(n.ownerSessionId===null||o(n.ownerSessionId))||typeof n.enabled!="boolean"||!t(n.helper)||typeof n.helper.online!="boolean")throw new Error("Fish Voice UI returned an invalid status");if(n.existingVoiceSessionSupported!==void 0&&typeof n.existingVoiceSessionSupported!="boolean")throw new Error("Invalid existing session support");if(n.existingVoiceSession!=null&&!go.safeParse(n.existingVoiceSession).success)throw new Error("Invalid existing voice session");if(n.helper.lastError!=null&&(typeof n.helper.lastError!="string"||n.helper.lastError.length>512))throw new Error("Invalid audio diagnostic")}else if(["save-voice-prompt","save-conversation-model","save-bindings","read-settings","save-settings","save-audio-device","save-models","set-visibility","set-performance-mode","save-tts","complete-setup","apply-model-install"].includes(e)){if(n.bindingContext!==void 0&&(!t(n.bindingContext)||["ownerSessionId","epoch","rootSessionId"].some(s=>n.bindingContext[s]!==null&&!o(n.bindingContext[s]))))throw new Error("Invalid binding context");let r=n.values;if(typeof n.revision!="string"||!n.revision||!t(r)||![0,1,2].includes(r.pttMouse)||!t(r.speakerVerification)||typeof r.speakerVerification.enabled!="boolean"||!(Qt(r.device)||typeof r.device=="string"&&r.device.length<=256&&!/[\u0000-\u001f\u007f]/.test(r.device)||Number.isSafeInteger(r.device)&&r.device>=0))throw new Error("Fish Voice UI returned invalid settings");if(r.wakeWordAliases!==void 0&&!Oo(r.wakeWordAliases))throw new Error("Invalid wake aliases");if(r.wakeListenTimeoutMs!==void 0&&(!Number.isInteger(r.wakeListenTimeoutMs)||r.wakeListenTimeoutMs<3e3||r.wakeListenTimeoutMs>3e4))throw new Error("Invalid wake timeout");if(r.semanticExperimental!==void 0&&typeof r.semanticExperimental!="boolean")throw new Error("Invalid experimental wake setting");if(r.pttKeyboard!==void 0&&!i(r.pttKeyboard))throw new Error("Invalid keyboard binding");if(n.capabilities?.pttKeyboard!==void 0){let s=n.capabilities.pttKeyboard;if(!t(s)||typeof s.supported!="boolean"||s.scope!=="global"||s.platform!=="win32"||!["available","unsupported"].includes(s.status)||!(s.reason==null||typeof s.reason=="string")||s.supported!==(s.status==="available"))throw new Error("Invalid keyboard capability")}if(n.modelSetup!==void 0&&(!t(n.modelSetup)||n.modelSetup.asr!=="sensevoice"||!t(n.modelSetup.models)||n.modelSetup.modelCompute!==void 0&&!["cpu","auto","cuda"].includes(n.modelSetup.modelCompute)||["sensevoiceDir","campplus"].some(s=>typeof n.modelSetup.models[s]!="string")))throw new Error("Fish Voice UI returned invalid model configuration");if(n.capabilities?.turnSignals===!0){let s=r.turnSignals;if(!t(s)||typeof s.enabled!="boolean"||typeof s.headphonesConfirmed!="boolean"||typeof s.experimentalAutomaticBargeIn!="boolean"||typeof s.volume!="number"||!Number.isFinite(s.volume)||s.volume<0||s.volume>1)throw new Error("Fish Voice UI returned invalid turn sound settings")}}else if(e==="list"&&(!Array.isArray(n.items)||n.items.length>50||!(n.nextCursor==null||typeof n.nextCursor=="string"&&n.nextCursor.length<=2048)||n.items.some(r=>!t(r)||!o(r.id)||typeof r.archived!="boolean"||typeof r.available!="boolean"||typeof r.canResume!="boolean"||r.title!==void 0&&typeof r.title!="string"||r.reason!==void 0&&typeof r.reason!="string")))throw new Error("Fish Voice UI returned invalid voice history");if(n.voicePrompt!==void 0){let r=n.voicePrompt;if(!t(r)||typeof r.text!="string"||r.text.length>32768||!["agents","custom"].includes(r.mode)||typeof r.customSupported!="boolean"||!(r.unsupportedReason===null||typeof r.unsupportedReason=="string"&&r.unsupportedReason.length<=512)||r.mode==="custom"&&(!r.text.trim()||!r.customSupported)||r.mode==="agents"&&r.customSupported&&r.text.trim())throw new Error("Invalid voice prompt preference")}if(n.conversationModel!==void 0&&(!t(n.conversationModel)||!["auto","manual"].includes(n.conversationModel.mode)||![n.conversationModel.provider,n.conversationModel.model].every(r=>r===null||o(r))||n.conversationModel.mode==="auto"&&(n.conversationModel.provider!==null||n.conversationModel.model!==null)))throw new Error("Invalid conversation model preference");if(e==="conversation-models"&&(!Array.isArray(n.providers)||n.providers.length>256||new Set(n.providers.map(r=>r?.id)).size!==n.providers.length||n.providers.some(r=>!t(r)||!o(r.id)||!o(r.name)||!Array.isArray(r.models)||r.models.length>2048||new Set(r.models.map(s=>s?.id)).size!==r.models.length||r.models.some(s=>!t(s)||!o(s.id)||!o(s.name)))))throw new Error("Invalid conversation model catalog");if(e==="read-audio-devices"&&!ls(n))throw new Error("Invalid audio device inventory");if(n.audioDevices!==void 0&&(!t(n.audioDevices)||!Qt(n.audioDevices.output)||!(Qt(n.audioDevices.input)||typeof n.audioDevices.input=="string"||Number.isSafeInteger(n.audioDevices.input))))throw new Error("Invalid audio device preferences");if(e==="inspect-performance"&&(!Array.isArray(n.modes)||n.modes.some(r=>!t(r)||!["fast","balanced","high"].includes(r.performanceMode)||typeof r.available!="boolean")))throw new Error("Invalid performance capabilities");if(e==="read-history"&&(!(n.rootSessionId===null||o(n.rootSessionId))||!Number.isSafeInteger(n.generation)||n.generation<0||!Number.isSafeInteger(n.revision)||n.revision<0||!["voice-session","current-voice-session"].includes(n.scope)||typeof n.truncated!="boolean"||!(n.nextCursor===null||typeof n.nextCursor=="string"&&/^\d+:\d+$/.test(n.nextCursor))||!Array.isArray(n.items)||n.items.length>100||new Set(n.items.map(r=>r?.id)).size!==n.items.length||n.items.some(r=>!t(r)||!o(r.id)||!["user","assistant"].includes(r.role)||typeof r.text!="string"||r.text.length>8e3||!["reply","interrupted","delivered","speech-requested","speech-failed"].includes(r.state)||!Number.isFinite(r.at))))throw new Error("Invalid conversation history");if(e==="conversation"){if(n.helper!==void 0&&(!t(n.helper)||typeof n.helper.online!="boolean"||!(n.helper.listenMode===null||Tt.includes(n.helper.listenMode))||!n.helper.online&&n.helper.listenMode!==null))throw new Error("Invalid conversation helper state");if(n.inputError!=null&&!["device","recognition","no-speech"].includes(n.inputError))throw new Error("Invalid input error");if(n.providerError!==void 0&&(typeof n.providerError!="string"||n.providerError.length>480))throw new Error("Invalid provider error");if(!Number.isSafeInteger(n.revision)||n.revision<0||n.title!==null||!(n.rootSessionId===null||o(n.rootSessionId))||!Array.isArray(n.items)||n.items.length>40||typeof n.inputActive!="boolean"||n.playbackConfirmed!==!1||n.items.some(r=>!t(r)||!o(r.id)||!["user","assistant"].includes(r.role)||typeof r.text!="string"||r.text.length>8e3||!["reply","interrupted","delivered","speech-requested","speech-failed"].includes(r.state)||!Number.isFinite(r.at))||n.latest!==null&&(!t(n.latest)||!n.items.some(r=>r.id===n.latest.id&&r.text===n.latest.text&&r.role==="assistant")))throw new Error("Invalid conversation snapshot")}if(e==="output-volume"&&(typeof n.supported!="boolean"||n.supported&&(typeof n.volume!="number"||!Number.isFinite(n.volume)||n.volume<0||n.volume>1||n.revision==null)))throw new Error("Invalid output volume snapshot");if(["agent-permissions","save-agent-permissions"].includes(e)){let r=["set-performance-mode","set-visibility","set-output-volume"];if(n.schema!==1||!o(n.revision)||!Array.isArray(n.items)||n.items.length!==3||new Set(n.items.map(s=>s?.operation)).size!==3||n.items.some(s=>!t(s)||!r.includes(s.operation)||typeof s.allowed!="boolean"||typeof s.title!="string"||s.title.length>128||!(s.reason===null||typeof s.reason=="string"&&s.reason.length<=1024)))throw new Error("Invalid agent permissions")}if(["agent-requests","decide-agent-request"].includes(e)){let r=s=>t(s)&&o(s.id)&&o(s.sourceSessionId)&&o(s.operation)&&typeof s.title=="string"&&s.title.length<=128&&["pending","executing","completed","blocked","unknown","superseded","expired","cancelled","rejected"].includes(s.state)&&Number.isFinite(s.createdAt)&&Number.isFinite(s.expiresAt)&&Number.isSafeInteger(s.humanRevision)&&t(s.request)&&t(s.before)&&Array.isArray(s.acknowledgements)&&s.acknowledgements.length<=10&&s.acknowledgements.every(a=>t(a)&&o(a.id)&&typeof a.text=="string"&&a.text.length<=1024)&&(s.error===null||t(s.error)&&typeof s.error.code=="string"&&typeof s.error.message=="string"&&s.error.message.length<=1024)&&(s.nextAction===null||typeof s.nextAction=="string"&&s.nextAction.length<=1024);if(n.schema!==1||!Number.isSafeInteger(n.humanRevision)||n.humanRevision<0||!Array.isArray(n.items)||n.items.length>100||n.items.some(s=>!r(s))||e==="decide-agent-request"&&(!r(n.lastOutcome)||!n.items.some(s=>s.id===n.lastOutcome.id&&s.state===n.lastOutcome.state)))throw new Error("Invalid agent request snapshot")}if(e==="authorization"){if(n.usageAgreement!==void 0&&(!t(n.usageAgreement)||n.usageAgreement.version!==1||typeof n.usageAgreement.accepted!="boolean"||!Array.isArray(n.usageAgreement.text)||n.usageAgreement.text.length>16||n.usageAgreement.text.some(r=>typeof r!="string"||r.length>4096)))throw new Error("Invalid usage agreement snapshot");if(n.schema!==1||!o(n.revision)||!Array.isArray(n.blockedOperations)||n.blockedOperations.some(r=>typeof r!="string")||typeof n.revocationUnconfirmed!="boolean"||typeof n.completed!="boolean"||typeof n.granted!="boolean"||!Array.isArray(n.scopes)||n.scopes.length>16||new Set(n.scopes.map(r=>r?.id)).size!==n.scopes.length||n.scopes.some(r=>!t(r)||!o(r.id)||typeof r.title!="string"||typeof r.description!="string"||typeof r.allowed!="boolean")||!Array.isArray(n.modelSources)||n.modelSources.length>32||n.modelSources.some(r=>!t(r)||!o(r.modelId)||typeof r.source!="string"||!Array.isArray(r.licenseUrls)||r.licenseUrls.some(s=>typeof s!="string")||typeof r.licenseNote!="string")||!Array.isArray(n.restrictions)||n.restrictions.some(r=>typeof r!="string"))throw new Error("Invalid authorization snapshot")}if(n.inferenceCompute!=null){let r=n.inferenceCompute;if(!t(r)||!["cpu","auto","cuda"].includes(r.requested)||![null,"cpu","cuda"].includes(r.actual)||r.engine!=="sensevoice"||!(r.computeType===null||["int8","float16","int8_float16","int8_float32","float32"].includes(r.computeType))||!(r.deviceIndex===null||Number.isSafeInteger(r.deviceIndex)&&r.deviceIndex>=0&&r.deviceIndex<8)||![null,"gpu-unavailable","gpu-load-failed","gpu-inference-failed","model-gpu-unverified"].includes(r.fallbackReason)||typeof r.validated!="boolean")throw new Error("Invalid inference compute status")}if(n.inputDevices!==void 0&&!ms(n.inputDevices))throw new Error("Invalid input device inventory");if(n.ptt?.keyboard!==void 0&&n.ptt.keyboard!==null){let r=n.ptt.keyboard;if(!t(r)||typeof r.supported!="boolean"||r.scope!=="global"||!["unsupported","active","inactive","unknown"].includes(r.status)||typeof r.hookInstalled!="boolean"||typeof r.recording!="boolean"||!(r.observedAt==null||Number.isFinite(r.observedAt)))throw new Error("Invalid keyboard status")}if(n.voiceSession?.recovery!==void 0){let r=n.voiceSession.recovery;if(!t(r)||r.stopVerified!==void 0&&typeof r.stopVerified!="boolean"||r.stopVerified===!0&&(r.kind!=="none"||n.voiceSession.fullyStopped!==!0)||!["none","live-root-conflict","predecessor-cleanup-pending","predecessor-stop-unconfirmed","helper-cleanup-pending","helper-stop-unconfirmed","root-stop-unconfirmed"].includes(r.kind)||!(r.rootSessionId===null||o(r.rootSessionId))||r.kind!=="none"&&n.voiceSession.fullyStopped===!0)throw new Error("Invalid voice recovery state")}if(n.voiceSession?.visibility!==void 0&&!["hidden","workspace"].includes(n.voiceSession.visibility))throw new Error("Fish Voice UI returned invalid visibility");if(n.voiceCapabilities!==void 0){let r=n.voiceCapabilities;if(!t(r)||!(r.configuredVisibility===null||["hidden","workspace"].includes(r.configuredVisibility))||["hidden","workspace"].some(s=>!t(r[s])||typeof r[s].supported!="boolean")||!t(r.taskHandoff)||typeof r.taskHandoff.mode!="string")throw new Error("Fish Voice UI returned invalid host capabilities")}return Mi(n),["setup-status","inspect-tts","preview-tts","cancel-tts","model-installer","inspect-model-compute","plan-model-install","start-model-install","control-model-install"].includes(e)&&od(e,n),n}function rd(e,n=10){let t=0;for(let o=e.length-1;o>=0;o--)if(e[o].role==="user"&&++t===n)return e.slice(o);return e}function id(e=[],n=[]){let t=new Map(e.map(o=>[o.id,o]));for(let o of n)t.set(o.id,o);return[...t.values()].sort((o,i)=>o.at-i.at)}function sd(e,n=36){return e.scrollHeight-e.scrollTop-e.clientHeight<=n}function ad({enabled:e,active:n,unknown:t,pending:o}){return t?"unknown":o?"pending":e?n?"listening":"standby":"off"}function bo(e){return e?.enabled?e.existingVoiceSession?.sessionId??e.voiceSession?.id??null:null}var cd=["save-voice-prompt","save-conversation-model","save-bindings","read-settings","save-settings","save-audio-device","save-models","set-visibility","set-performance-mode","save-tts","complete-setup","apply-model-install"],yo=cd.filter(e=>e!=="read-settings"),wo=["status","enable","disable","new","resume","listen-mode"],Gh=new Set(["status","enable","disable","listen-mode","read-history"]),$h=["save-bindings","inspect-tts","inspect-model-compute"],Yn=new Set(["conversation-models","status","read-settings","read-output-volume","model-installer","agent-permissions","agent-requests"]),vt=["conversation-models","agent-permissions","agent-requests","status","read-settings","list","read-output-volume","inspect-performance","inspect-tts","model-installer","inspect-model-compute","plan-model-install"],Rh=e=>{let n=String(e?.message??e);return/^\[([A-Z][A-Z0-9_]{0,79})\]\r?$/m.exec(n)?.[1]??(typeof e?.code=="string"?e.code:/\[([A-Z][A-Z0-9_]{0,79})\]$/m.exec(n)?.[1])};function ld(e,{schedule:n=(i,r)=>globalThis.setTimeout(i,r),unschedule:t=i=>globalThis.clearTimeout(i),observe:o=()=>{}}={}){let i=0,r={conversationHistory:null,conversationHistoryFor:null,conversationHistoryError:null,conversationHistoryLoading:!1,conversationHistoryRequestCursor:null},s={...r,conversationModels:null,conversationModelsFor:null,conversationModelsError:null,authorization:null,authorizationOpen:!1,authorizationLoading:!1,authorizationBusy:!1,authorizationUncertain:!1,authorizationNeedsReview:!1,authorizationWriteUnconfirmed:!1,authorizationError:null,agentRequests:null,agentRequestsFor:null,busy:!1,interruptibleRead:null,diagnosticStopPending:!1,voiceStopUnconfirmed:!1,error:null,status:null,settings:null,settingsFor:null,visibilityUncertain:!1,visibilityReadbackFor:null,catalog:null,checkedFor:null,catalogFor:null,uncertain:!1,performance:null,performanceFor:null,performancePending:!1,performanceError:null,conversation:null,conversationFor:null,conversationError:null,outputVolume:null,outputVolumeFor:null,outputVolumeUncertain:!1,setupStatus:null,setupOpen:!1,panelView:"home",setupError:null,ttsCapabilities:null,ttsCapabilitiesFor:null,ttsPreview:null,ttsPreviewFor:null,ttsCancelling:!1,ttsUncertain:!1,installer:null,installerFor:null,installerError:null,installerUncertain:!1,installPlan:null,installPlanFor:null},a=new Set,d=null,l=!0,u=!0,p=0,f=null,m=null,b=0,v=new Map,w=()=>{for(let y of v.values())y.stale=!0,y.abort.abort();v.clear()},k=()=>{w(),f&&(f.stale=!0,Yn.has(f.action)&&f.abort.abort())},z=!1,H=null,B=!1,O=null,I=0,E=0,G=new Map,S=!0,_=null,T=null,N=null,P,C=null,F=0,V=0,Z=!1,J=null,q=null,ae=new Set,le=new Set,pe=new Set,xe=new Set,A=y=>{if(!S)return;let x=Object.hasOwn(y,"uncertain")?y.readOnlyFailure===!0:s.readOnlyFailure;s={...s,...y,readOnlyFailure:x};for(let D of ae)D()},oe,X,U=0,_e=y=>["checking","installing"].includes(y?.status),on=(y,x)=>{x?.revision!==void 0&&y.revision<x.revision||(x&&y.revision!==void 0&&(x.revision=y.revision),A({updates:y,updatesUnavailable:!1}))},Fe=()=>{if(!S||!_?.subscribeUpdates||oe||!l)return;let y=_,x={};oe=x,x.stop=y.subscribeUpdates(D=>{!S||oe!==x||(U++,gn("update-stream"),on(D,x))},()=>{!S||oe!==x||(oe=null,A({updatesUnavailable:!0}),Ee(T,"update-stream"))})},_n=()=>{let y=oe;oe=null,y?.stop?.(),X?.abort(),X=null,A({updates:null,updatePending:null,updatesUnavailable:!1})},lt=async y=>{if(!S||!_?.updateAction||X)return;let{action:x,version:D}=y;if(x==="install"&&(s.updatesUnavailable||s.updates?.canInstall!==!0||s.updates?.release?.version!==D))return;let j=_,Q=new AbortController;X=Q,Fe();let Y=oe,fe=U;A({updatePending:x});try{let $e=await j.updateAction(y,Q.signal);S&&X===Q&&oe===Y&&($e.revision===void 0&&_e($e)&&U!==fe&&!_e(s.updates)||on($e,Y))}catch{let $e=U!==fe&&!_e(s.updates);S&&X===Q&&oe===Y&&!$e&&A({updatesUnavailable:!0})}finally{X===Q&&(X=null,A({updatePending:null}))}},Ye=0,re=y=>{Ye++,A({...y,ttsUncertain:!0})},De=()=>s.status?.existingVoiceSession?null:T,Ie=null,Ge=()=>{Ie=null,A({transcriptRetry:null})},wt=y=>{if(!Ie?.receipt||y?.rootSessionId!==Ie.sessionId)return;let x=y.retryTranscripts?.items.find(D=>D.id===Ie.id);(!x||x.state!=="ready"||Ie.receipt==="unconfirmed"&&y.revision>Ie.revision)&&Ge()},nt=async(y,x)=>{let{status:D,conversation:j,checkedFor:Q,conversationFor:Y,uncertain:fe,busy:$e}=s,Pe=D?.existingVoiceSession?.sessionId;if(!S||!_?.retryVoiceTranscript||Ie||fe||$e||T!==y||Q!==y||Y!==y||!D?.enabled||!Pe||j?.rootSessionId!==Pe||j.retryTranscripts?.sessionId!==Pe||!j.retryTranscripts.items.some(jn=>jn.id===x&&jn.state==="ready"))return;let Ke=_,Le=new AbortController,On=Ie={id:x,sessionId:Pe,revision:j.revision,receipt:null};le.add(Le),A({transcriptRetry:{id:x,state:"sending"}});try{let jn=await Ke.retryVoiceTranscript({id:x},Le.signal);if(!S||Ie!==On)return;jn.accepted===!1?Ge():On.receipt="accepted"}catch{if(!S||Ie!==On)return;On.receipt="unconfirmed"}finally{le.delete(Le),Ie===On&&(On.receipt==="unconfirmed"&&A({transcriptRetry:{id:x,state:"uncertain"}}),wt(s.conversation))}},Ne=async(y,x,D)=>{let j=e??_?.action;if(!j)throw new Error("\u9C7C\u5E94\u754C\u9762\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let Q=s.status?.existingVoiceSession&&Gh.has(x.action)||s.existingSessionUnconfirmed&&x.action==="status"?null:y,Y=await j(Q,x,D);try{return Qn(x.action,Y)}catch(fe){throw o("ui-render-error","finished","failed"),fe}},Xe=null,Pn=({clear:y=!1}={})=>{let x=Xe;Xe=null,x?.abort.abort(),A({audioDevicesPending:!1,audioDevicesError:null,...y?{audioDevices:null,audioDevicesFor:null}:{}})},Bn=y=>{if(!S||T!==y)return Promise.resolve(!1);if(Xe?.id===y&&Xe.client===_)return Xe.promise;Pn();let x={id:y,client:_,scope:E,abort:new AbortController,promise:null};Xe=x,le.add(x.abort),A({audioDevicesPending:!0,audioDevicesError:null});let D=()=>S&&Xe===x&&T===y&&_===x.client&&E===x.scope;return x.promise=(async()=>{let j;try{let Q=new Promise((fe,$e)=>{j=()=>$e(new Error("Device read cancelled")),x.abort.signal.addEventListener("abort",j,{once:!0})}),Y=await Promise.race([Ne(y,{action:"read-audio-devices"},x.abort.signal),Q]);return D()?(A({audioDevices:Y,audioDevicesFor:y}),!0):!1}catch(Q){return D()&&!x.abort.signal.aborted&&A({audioDevicesError:String(Q?.message??Q)}),!1}finally{x.abort.signal.removeEventListener("abort",j),le.delete(x.abort),D()&&(Xe=null,A({audioDevicesPending:!1}))}})(),x.promise},cn=null,xt=y=>{if(!S||T!==y)return Promise.resolve(!1);if(cn?.id===y&&cn.scope===E)return cn.promise;let x={id:y,scope:E,client:_,promise:null};cn=x;let D=()=>S&&cn===x&&T===y&&E===x.scope&&_===x.client;return A({modelComputePending:!0,modelComputeError:null}),x.promise=(async()=>{try{if(await Ne(y,{action:"inspect-model-compute"}),!D())return!1;let j=await Ne(y,{action:"model-installer"});return D()?(A({installer:j,installerFor:y,installerError:null}),Z||(Z=!0,te(!0)),!0):!1}catch(j){if(!D())return!1;let Q=j?.uncertain||/TTS_TERMINATION_UNCONFIRMED/.test(String(j?.code??"")+" "+String(j?.message??""));return A({modelComputeError:String(j?.message??j),...Q?{installerUncertain:!0,installerTerminationUnconfirmed:!0}:{}}),!1}finally{D()&&(cn=null,A({modelComputePending:!1}))}})(),x.promise},fn=null,kn=0,Sn=({clear:y=!1}={})=>{kn++;let x=fn;fn=null,x?.abort.abort(),A({performancePending:!1,performanceError:null,...y?{performance:null,performanceFor:null}:{}})},_t=y=>{if(!S||T!==y)return Promise.resolve(!1);if(fn?.id===y&&fn.client===_)return fn.promise;Sn();let x={id:y,client:_,epoch:kn,abort:new AbortController,promise:null};fn=x,le.add(x.abort),A({performancePending:!0,performanceError:null});let D=()=>S&&fn===x&&x.epoch===kn&&T===y&&_===x.client;return x.promise=(async()=>{let j;try{let Q=new Promise((fe,$e)=>{j=()=>$e(new Error("Probe cancelled")),x.abort.signal.addEventListener("abort",j,{once:!0})}),Y=await Promise.race([Ne(y,{action:"inspect-performance"},x.abort.signal),Q]);return D()?(A({performance:Y,performanceFor:y}),!0):!1}catch(Q){return D()&&!x.abort.signal.aborted&&A({performanceError:String(Q?.message??Q)}),!1}finally{x.abort.signal.removeEventListener("abort",j),le.delete(x.abort),D()&&(fn=null,A({performancePending:!1}))}})(),x.promise},En=()=>{let y=G.get("conversation-stream");y&&(y.timer!==null&&t(y.timer),y.timer=null,y.ready=!1);let x=++F;if(N?.(),N=null,i++,A({...r,conversation:null,conversationFor:null,conversationError:null,listenModeReceiptRevision:null}),P=void 0,!S||!_)return;let D=T;P=De(),N=_.subscribe(P,(j,Q)=>{if(!(!S||x!==F||T!==D))try{let Y=Qn("conversation",j);Q?.initial||gn("conversation-stream"),s.conversationHistory&&(s.conversationHistory.rootSessionId!==Y.rootSessionId||s.conversationHistory.scope!=="voice-session"&&s.conversationHistory.generation!==Y.historyGeneration)&&(i++,A({...r}));let fe=s.conversationHistory,$e={};if(fe?.rootSessionId&&fe.rootSessionId===Y.rootSessionId){let Pe=new Map(fe.items.map(In=>[In.id,In]));for(let In of Y.items)Pe.set(In.id,In);let Ke=[...Pe.values()].sort((In,L)=>In.at-L.at),Le=Ke.slice(-4e3),On=Le.reduce((In,L)=>In+L.text.length,0),jn=Ke.length>4e3;for(;On>4*1024*1024;)On-=Le.shift().text.length,jn=!0;$e={conversationHistory:{...fe,items:Le,truncated:fe.truncated||jn}}}A({...$e,conversation:Y,conversationFor:D,conversationError:null}),wt(Y)}catch(Y){i++,A({...r,conversation:null,conversationFor:null,conversationError:String(Y.message)}),Ee(D,"conversation-stream")}},j=>{S&&x===F&&(i++,A({...r,conversation:null,conversationFor:null,conversationError:String(j?.message??j)}),Ee(D,"conversation-stream"))})},te=(y=!1)=>{let x=G.get("model-stream");x&&(x.timer!==null&&t(x.timer),x.timer=null,x.ready=!1);let D=++V;if(C?.(),C=null,y||A({installer:null,installerFor:null,installerError:null}),!S||!_?.subscribeModels||!Z)return;let j=T;C=_.subscribeModels(j,(Q,Y)=>{if(!(!S||D!==V||T!==j||Y?.initial))try{let fe=Qn("model-installer",Q),$e=fe.ttsInstallIntent,Pe=s.installer?.ttsInstallIntent;gn("model-stream"),A({installer:fe,installerFor:j,installerError:null}),$e&&(Pe?.jobId!==$e.jobId||Pe?.status!==$e.status)&&!fe.jobs.some(Ke=>Ke.id===$e.jobId&&Ke.status==="blocked")&&(A({checkedFor:null}),Ve({settings:$e.status==="applied",force:!0}))}catch(fe){A({installer:null,installerFor:null,installerError:String(fe.message)}),Ee(j,"model-stream")}},Q=>{S&&D===V&&(A({installer:null,installerFor:null,installerError:String(Q?.message??Q)}),Ee(j,"model-stream"))})},hn=()=>{if(q)return q;if(!J)return Promise.resolve(!0);let y=J,x=Ye;return y.cancelled=!0,y.abort.abort(),A({ttsCancelling:!0,ttsPreview:{status:"cancelling"}}),q=(async()=>{let D=!1;try{let j=await Ne(y.id,{action:"cancel-tts"});return j.status==="unconfirmed"?(H=null,re({ttsPreview:j,uncertain:!0,error:"\u65E0\u6CD5\u786E\u8BA4\u6717\u8BFB\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B\u540E\u518D\u8BD5\u3002"}),!1):(D=!0,A({ttsPreview:j,...x===Ye?{ttsUncertain:!1}:{}}),!0)}catch(j){return H=null,re({ttsPreview:{status:"unconfirmed"},uncertain:!0,error:String(j?.message??j)}),!1}finally{D&&J===y&&(J=null),A({ttsCancelling:!1}),q=null,queueMicrotask(()=>{zo(),Et()})}})(),q},gn=y=>{let x=G.get(y);x?.timer!=null&&t(x.timer),G.delete(y)},ge=()=>{for(let y of G.keys())gn(y)},Ee=(y,x)=>{if(!S||!z||T!==y||!["authorization","setup-status","conversation-stream","model-stream","update-stream"].includes(x)&&!Yn.has(x))return;let D=G.get(x);D||(D={id:y,scope:E,attempts:0,timer:null,ready:!1},G.set(x,D)),!(D.timer!==null||D.ready||!l||!u)&&(D.attempts++,o("ui-read-recovery","requested"),D.timer=n(()=>{D.timer=null,!(!S||T!==y||D.scope!==E||G.get(x)!==D)&&(D.ready=!0,Et())},Math.min(3e4,750*2**Math.min(D.attempts-1,6))),D.timer?.unref?.())},Fn=null,To=0,Pt=()=>{Fn!==null&&t(Fn),Fn=null,To=0},ns=y=>{!S||!l||!u||T!==y||Fn!==null||To>=10||(Fn=n(()=>{if(Fn=null,!(!S||T!==y||!["predecessor-cleanup-pending","helper-cleanup-pending"].includes(s.status?.voiceSession?.recovery?.kind))){if(s.busy||s.ttsCancelling){ns(y);return}To++,rn.run(y,"status")}},1e3),Fn?.unref?.())},rn,ut=0,kt=null,St=null,dt=null,Lt=!1,sp=async y=>{let x=_,D=[],j=new Set;if(!S||!x?.readOperationLog)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u672A\u5C31\u7EEA");let Q=null;do{y?.throwIfAborted();let Y=await x.readOperationLog(Q?{cursor:Q}:{},y);if(!S||_!==x||y?.aborted)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u8FDE\u63A5\u5DF2\u53D8\u5316");if(typeof Y?.text!="string"||!(Y.nextCursor===null||typeof Y.nextCursor=="string"&&Y.nextCursor)||j.has(Y.nextCursor))throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u5206\u9875\u65E0\u6548");D.push(Y.text),Q=Y.nextCursor,j.add(Q)}while(Q);return D},ap=async(y,x)=>{if(!S||!_?.manageSessions)throw new Error("\u9C7C\u5E94\u4F1A\u8BDD\u7BA1\u7406\u5C1A\u672A\u5C31\u7EEA");let D=_,j=await D.manageSessions(null,y,x);if(!S||_!==D||x?.aborted)throw new Error("\u4F1A\u8BDD\u7BA1\u7406\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5");return j},cp=async(y,x)=>{if(!S||!_?.listExistingVoiceSessions)throw new Error("DSH \u4F1A\u8BDD\u5217\u8868\u6682\u4E0D\u53EF\u7528");let D=_,j=await D.listExistingVoiceSessions(y,x);if(!S||_!==D||x?.aborted)throw new Error("\u4F1A\u8BDD\u5217\u8868\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5");return j},pt=null,lp=async y=>{if(!S||!_?.setExistingVoiceSession||pt||s.existingSessionUnconfirmed)throw new Error("DSH \u4F1A\u8BDD\u7ED1\u5B9A\u6682\u4E0D\u53EF\u7528");let x=_,D=new AbortController;pt=D,le.add(D);for(let j of[v.get("status"),f])j?.action==="status"&&(j.stale=!0,j.abort.abort());A({existingSessionWritePending:!0});try{let j=await x.setExistingVoiceSession(y,D.signal);if(!S||_!==x||D.signal.aborted)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u786E\u8BA4");return s.status&&A({status:{...s.status,existingVoiceSession:j.binding}}),P!==De()&&En(),j}catch(j){throw A({existingSessionUnconfirmed:!0}),j}finally{le.delete(D),pt=null,A({existingSessionWritePending:!1}),Ve({force:!0})}},up=async(y,x)=>{if(!S||!_?.senseVoiceAsrAction)throw new Error("\u8BC6\u522B\u6A21\u578B\u7BA1\u7406\u6682\u4E0D\u53EF\u7528");let D=_,j=await D.senseVoiceAsrAction(y,x);if(!S||_!==D||x?.aborted)throw new Error("\u8BC6\u522B\u6A21\u578B\u72B6\u6001\u5DF2\u5207\u6362");if(!(Y=>Y&&["idle","downloading","ready","error"].includes(Y.state)&&Number.isSafeInteger(Y.receivedBytes)&&Number.isSafeInteger(Y.totalBytes)&&Y.receivedBytes>=0&&Y.receivedBytes<=Y.totalBytes)(j)||typeof j.selected!="boolean"||j.message!==null&&(typeof j.message!="string"||j.message.length>512))throw new Error("\u8BC6\u522B\u6A21\u578B\u72B6\u6001\u65E0\u6548");return j},Un=async({open:y=!1,initial:x=!1,review:D=!1}={})=>{if(!_?.readAuthorization)return!1;if(St)return dt={open:y||dt?.open,initial:x||dt?.initial,review:D||dt?.review},y&&A({authorizationOpen:!0,...D?{authorizationNeedsReview:!0}:{}}),!1;kt?.abort();let j=++ut,Q=new AbortController,Y=_;le.add(Q),kt=Q,A({authorizationLoading:!0,authorizationError:null,...y?{authorizationOpen:!0}:{},...D?{authorizationNeedsReview:!0}:{}});try{let fe=Qn("authorization",await Y.readAuthorization(Q.signal));return!S||j!==ut||_!==Y?!1:(gn("authorization"),A({authorization:fe,authorizationUncertain:fe.revocationUnconfirmed,authorizationWriteUnconfirmed:!1,...x&&!Lt&&(!fe.completed||fe.usageAgreement?.accepted!==!0||fe.revocationUnconfirmed)?{authorizationOpen:!0}:{}}),!0)}catch(fe){return S&&j===ut&&_===Y&&(A({authorizationError:String(fe?.message??fe),authorizationUncertain:!0,...x?{authorizationOpen:!0}:{}}),Ee(T,"authorization")),!1}finally{le.delete(Q),kt===Q&&(kt=null,S&&A({authorizationLoading:!1}))}},dp=async y=>{if(!_?.saveAuthorization||!s.authorization||s.authorizationBusy||s.authorizationLoading||s.authorizationUncertain)return!1;let x=s.setupStatus?.completed!==!0||s.setupOpen;kt?.abort();let D=new AbortController,j=++ut,Q=_;le.add(D),St=D,A({authorizationBusy:!0,authorizationError:null});try{let Y=Qn("authorization",await Q.saveAuthorization({revision:s.authorization.revision,grant:y},D.signal));return!S||j!==ut||_!==Q?!1:(Lt=!1,A({authorization:Y,authorizationOpen:Y.revocationUnconfirmed,authorizationUncertain:Y.revocationUnconfirmed,authorizationNeedsReview:!1,authorizationWriteUnconfirmed:Y.revocationUnconfirmed,...Y.revocationUnconfirmed?{authorizationError:"\u6743\u9650\u5DF2\u64A4\u56DE\uFF0C\u4F46\u5F53\u524D\u97F3\u9891\u505C\u6B62\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u6838\u67E5\u72B6\u6001\u3002"}:{}}),y&&x&&!Y.revocationUnconfirmed&&rn.openSetup(),Ve({settings:!0,force:!0}),!0)}catch(Y){try{let fe=Qn("authorization",await Q.readAuthorization(D.signal));if(S&&_===Q&&j===ut&&fe.completed&&fe.granted===y&&(!y||fe.usageAgreement?.accepted===!0&&fe.modelSourcesChanged!==!0)&&!fe.revocationUnconfirmed)return Lt=!1,A({authorization:fe,authorizationOpen:!1,authorizationUncertain:!1,authorizationNeedsReview:!1,authorizationWriteUnconfirmed:!1}),y&&x&&rn.openSetup(),Ve({settings:!0,force:!0}),!0}catch{}return S&&_===Q&&j===ut&&(A({authorizationUncertain:!0,authorizationWriteUnconfirmed:!0,authorizationError:String(Y?.message??Y)}),Ee(T,"authorization")),!1}finally{if(le.delete(D),St===D&&(St=null,S&&A({authorizationBusy:!1}),S&&(dt||_!==Q))){let Y=dt??{initial:!0};dt=null,Un(Y)}}},mt=null,Tr=0,zr=()=>{if(!_?.readSetup||mt)return mt?.promise;let y=_,x=Tr,D=new AbortController,j={promise:null};return mt=j,le.add(D),j.promise=(async()=>{try{let Q=Qn("setup-status",await y.readSetup(D.signal));return!S||_!==y?!1:(gn("setup-status"),A({setupStatus:Q,...p===x&&!Lt?{setupOpen:!Q.completed}:{},setupError:null}),Q.completed?Ve({settings:!0}):zo(),!0)}catch(Q){return S&&_===y&&(A({setupError:String(Q?.message??Q)}),Ee(T,"setup-status")),!1}finally{le.delete(D),mt===j&&(mt=null)}})(),j.promise},Et=async()=>{if(!(e||_?.action||_?.readAuthorization||_?.readSetup||_?.subscribeUpdates)||!S||!z||!l||!u||B||pt||s.busy||s.ttsCancelling||!H&&![...G.values()].some(j=>j.ready))return;if(!H){let[j,Q]=[...G].find(([,Y])=>Y.ready);if(Q.ready=!1,Q.id!==T||Q.scope!==E){gn(j);return}B=!0;try{j==="authorization"?await Un():j==="setup-status"?await zr():j==="conversation-stream"?En():j==="model-stream"?te(!0):j==="update-stream"?Fe():await rn.run(Q.id,j)}finally{B=!1,queueMicrotask(()=>{Et()})}return}let y=H;H=null;let x=()=>S&&y.id===T&&y.scope===E;if(!x())return;let D=()=>x()?!l||!u||pt||s.busy||s.ttsCancelling?(H||(H=y),!0):!1:!0;B=!0;try{if(y.notified||(y.notified=!0,O=y.id,I=Date.now(),A({readRefresh:(s.readRefresh??0)+1})),D()||(y.settings&&(y.settings=!1,await rn.run(y.id,"read-settings",{},!0)),D()))return;y.status&&(y.status=!1,await rn.run(y.id,"status",{},!0)),x()&&y.id&&!xe.has(y.id)&&(xe.add(y.id),rn.run(y.id,"inspect-performance"))}finally{B=!1,queueMicrotask(()=>{Et()})}},Ve=({settings:y=!1,force:x=!1}={})=>{if(Fe(),!(!S||!z)&&!(!x&&!y&&O===T&&Date.now()-I<1500)&&(s.authorizationUncertain&&!kt&&!St&&Un(),s.setupError&&!mt&&zr(),!(!T&&!_?.action&&!s.setupOpen&&s.setupStatus===null))){s.installerError&&Z&&te(!0);for(let D of G.values())D.id===T&&(D.timer!==null&&t(D.timer),D.timer=null,D.attempts=0,D.ready=!0);Fn===null&&(To=0),(!H||H.scope!==E)&&o("ui-status-refresh","requested"),H={id:T,scope:E,settings:!0,status:!0,notified:!1},queueMicrotask(()=>{Et()})}},ts=()=>{let y=l&&u;if(s.readVisible!==y){if(A({readVisible:y}),!y){w();for(let x of G.values())x.timer!==null&&t(x.timer),x.timer=null,x.ready=!1;Pt();return}Ve({force:!0})}},zo=async()=>{let y=T;!(e||_?.action)||s.setupStatus?.completed!==!1||pe.has(y)||s.busy||s.ttsCancelling||(pe.add(y),await rn.run(y,"read-settings")&&T===y&&await rn.run(y,"status"))};return rn={getSnapshot:()=>s,async pickPath(y,x,D){if(!S||T!==y)return null;let j=E,Q=e??_?.action;if(!Q)throw new Error("\u9C7C\u5E94\u754C\u9762\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let Y=await Q(y,{action:"pick-local-path",kind:x},D);if(!S||T!==y||j!==E||D?.aborted)return null;if(!Y||!(Y.path===null||typeof Y.path=="string"&&Y.path.length>0&&Y.path.length<=4096&&!/[\u0000-\u001f\u007f]/.test(Y.path)))throw new Error("\u8DEF\u5F84\u9009\u62E9\u7ED3\u679C\u65E0\u6548");return Y.path},async captureBindings(y,x){let D=await Ne(y,{action:"capture-bindings",...x});if(!D||typeof D.token!="string"||typeof D.paused!="boolean")throw new Error("\u6309\u952E\u5F55\u5165\u56DE\u6267\u65E0\u6548");return D},setReadVisibility(y){l=!!y,ts()},setPanelVisible(y){u=!!y,ts()},markSettingsEdited(y="save-settings"){yo.includes(y)&&(a.add(y),A({settingsDraftActions:[...a]}))},discardSettingsDraft(y){y?a.delete(y):a.clear(),A({settingsDraftActions:[...a]}),!a.size&&(d&&A({settings:d,settingsFor:T}),d=null,A({settingsConflict:!1,settingsKey:s.settings?.revision}))},enableAutomaticReads(){z=!0,Ve({settings:!0,force:!0})},refresh:Ve,refreshModelCompute:xt,subscribe(y){return ae.add(y),()=>ae.delete(y)},setSession(y){T!==y&&(T=y,E++,cn=null,a.clear(),d=null,A({sourcePending:!0,checkedFor:void 0,settingsFor:void 0,modelComputePending:!1,modelComputeError:null,enableError:null,listenModeError:!1,newChatFor:void 0,settingsConflict:!1,settingsDraftActions:[],installPlan:null,installPlanFor:null}),ge(),Sn({clear:!0}),Pn({clear:!0}),Pt(),hn(),k(),En(),te(),Ve({settings:!0,force:!0}),zo())},attachConversationClient(y){_!==y&&(_n(),E++,cn=null,A({...e?{}:{sourcePending:!0,checkedFor:void 0,settingsFor:void 0},authorization:null,authorizationUncertain:!!St,modelComputePending:!1,modelComputeError:null}),ge(),Sn({clear:!0}),Pn({clear:!0}),k(),pe.clear(),xe.clear()),_=y,Un({initial:!0}),En(),te(),Ve({settings:!0,force:!0}),_.readSetup&&(mt=null,Tr=p,zr())},conversationUnavailable(y){i++,A({...r,error:String(y?.message??y),conversation:null,conversationFor:null,conversationError:String(y?.message??y)})},async dismissSetup(){let y=++p,x=await hn();return x&&y===p&&(k(),rn.discardSettingsDraft(),A({setupOpen:!1})),x&&y===p},async showHome(){let y=++p,x=await hn();return x&&y===p&&(k(),rn.discardSettingsDraft(),A({setupOpen:!1,panelView:"home"}),Ve()),x&&y===p},async openSettings(y="audio",x="conversation"){let D=++p,j=await hn();return j&&D===p&&(k(),A({setupOpen:!1,panelView:"settings",settingsTab:["audio","interaction","prompt","models","advanced","sessions","pets"].includes(y)?y:"audio",settingsModelTab:x,sessionManagementRoot:null,sessionHistoryOpen:!1}),Ve({settings:!0})),j&&D===p},readOperationLog:sp,manageSessions:ap,listExistingVoiceSessions:cp,retryVoiceTranscript:nt,setExistingVoiceSession:lp,setSettingsTab(y){y!==s.settingsTab&&A({settingsTab:y,sessionManagementRoot:null,sessionHistoryOpen:!1})},setSettingsModelTab(y){A({settingsModelTab:y})},setSessionManagement({rootId:y=s.sessionManagementRoot,historyOpen:x}){A({sessionManagementRoot:y,sessionHistoryOpen:x})},senseVoiceAsrAction:up,updateAction:lt,dismissUpdate(y){y&&A({dismissedUpdateVersion:y})},openSetup(){++p,k(),A({setupOpen:!0}),Ve({settings:!0,force:!0}),!z&&!s.busy&&(async()=>{let y=T;await rn.run(y,"read-settings")&&T===y&&await rn.run(y,"status")})()},cancelPreview:hn,discardDiagnostics:k,refreshAuthorization:Un,saveAuthorization:dp,openAuthorization:()=>Un({open:!0}),closeAuthorization({resumeSetup:y=!1}={}){return!s.authorizationBusy&&!s.authorizationLoading?(Lt=!y,++p,Tr=p,A({authorizationOpen:!1,authorizationNeedsReview:!1,setupOpen:y}),y&&Ve({settings:!0}),!0):!1},async run(y,x,D={},j=!1){if(!S||!e&&T!==y||pt&&x==="status"||(pt||s.existingSessionUnconfirmed)&&["enable","new","resume"].includes(x))return!1;let Q=!!(j&&Yn.has(x)&&!s.uncertain&&s.checkedFor===y&&s.settingsFor===y&&s.status&&s.settings);if(Q&&v.has(x))return!1;if(j||w(),x==="read-history"){if(T!==y||s.conversationHistoryLoading)return!1;let L=++i,ye=E,ln=F;A({conversationHistoryLoading:!0,conversationHistoryError:null,conversationHistoryRequestCursor:D.cursor??null});try{let Ze=await Ne(y,{action:x,...D});if(!S||T!==y||ye!==E||L!==i||ln!==F||s.conversation?.rootSessionId&&(s.conversation.rootSessionId!==Ze.rootSessionId||Ze.scope!=="voice-session"&&s.conversation.historyGeneration!==Ze.generation))return!1;let Gn=s.conversationHistory;if(D.cursor&&(!Gn||Gn.generation!==Ze.generation||Gn.rootSessionId!==Ze.rootSessionId))return!1;let Co=new Map(Ze.items.map(Tn=>[Tn.id,Tn]));if(D.cursor)for(let Tn of Gn.items)Co.set(Tn.id,Tn);if(s.conversation?.rootSessionId===Ze.rootSessionId)for(let Tn of s.conversation?.items??[])Co.set(Tn.id,Tn);let Wt=[...Co.values()].sort((Tn,Cr)=>Tn.at-Cr.at),No=D.cursor?Wt.slice(0,4e3):Wt.slice(-4e3),os=No.reduce((Tn,Cr)=>Tn+Cr.text.length,0),rs=Wt.length>4e3;for(;os>4*1024*1024;)os-=(D.cursor?No.pop():No.shift()).text.length,rs=!0;return A({conversationHistory:{...Ze,items:No,truncated:Ze.truncated||rs||!!(D.cursor&&Gn?.truncated)},conversationHistoryFor:y}),!0}catch(Ze){return L===i&&A({conversationHistoryError:String(Ze?.message??Ze)}),!1}finally{L===i&&A({conversationHistoryLoading:!1})}}if(x==="apply-model-install"&&["save-models","save-tts"].some(L=>a.has(L)))return A({error:"\u8BF7\u5148\u4FDD\u5B58\u6216\u653E\u5F03\u6A21\u578B\u8BBE\u7F6E\u8349\u7A3F\uFF0C\u518D\u5207\u6362\u6A21\u578B\u3002"}),!1;if(x==="read-audio-devices")return Bn(y);if(x==="inspect-performance")return _t(y);if(x==="cancel-tts"){if(J)return hn();try{let L=await Ne(y,{action:x});return A({ttsPreview:L,ttsPreviewFor:y}),L.status==="unconfirmed"?(re({uncertain:!0,error:"\u65E0\u6CD5\u786E\u8BA4\u6717\u8BFB\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B\u3002"}),!1):!0}catch(L){return re({error:String(L?.message??L),uncertain:!0}),!1}}let Y=x==="disable"&&f&&!m;if(s.busy&&!Y||s.ttsCancelling||x==="disable"&&s.voiceStopUnconfirmed||s.settingsConflict&&yo.includes(x)||s.agentPermissionUncertain&&x==="save-agent-permissions"||s.agentRequestUncertain&&x==="decide-agent-request"||s.ttsUncertain&&!vt.includes(x)&&x!=="disable")return!1;let fe=x==="disable"&&s.checkedFor===y&&(s.status?.enabled||s.status?.ownerSessionId||s.status?.voiceSession?.recovery?.kind==="live-root-conflict");if(s.visibilityUncertain&&!vt.includes(x)&&!fe||s.outputVolumeUncertain&&x==="set-output-volume"||s.installerUncertain&&["start-model-install","control-model-install","apply-model-install"].includes(x))return!1;if(!y&&(y!==null||!qu.has(x)))return A({error:"\u6B64\u64CD\u4F5C\u9700\u8981\u4F1A\u8BDD\u6765\u6E90"}),!1;let $e;if(Y&&(f.stale=!0,Yn.has(f.action)&&f.abort.abort(),$e=m=Symbol("diagnostic-stop")),!vt.includes(x)){Pt();for(let L of Yn)gn(L)}(yo.includes(x)||wo.includes(x)&&x!=="status")&&Sn({clear:x!=="set-performance-mode"});let Pe;($h.includes(x)||Yn.has(x))&&(Pe={id:y,action:x,abort:new AbortController,stale:!1},Q?v.set(x,Pe):f=Pe),Q||(b++,A({busy:!0,error:null,...x==="enable"?{enableError:null}:{},...x==="save-bindings"?{bindingError:null}:{},interruptibleRead:f?.action??null,diagnosticStopPending:!!m,...x==="listen-mode"?{listenModePending:D.mode,listenModeBefore:s.conversation?.helper?.listenMode??s.status?.listenMode}:{},...x!=="status"&&wo.includes(x)?{listenModeError:!1}:{}}));let Ke,Le=E,On=bo(s.status),jn=s.checkedFor,In=Ye;try{if(Pe?.stale)return!1;let L;if(["read-output-volume","set-output-volume"].includes(x)){if(!_)throw new Error("\u8BED\u97F3\u8F93\u51FA\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let ye=Pe?.abort??new AbortController;le.add(ye);let ln;try{let Ze=x==="read-output-volume"?_.readVolume(y,ye.signal):_.setVolume(y,D,ye.signal),Gn=x==="read-output-volume"?await Promise.race([Ze,new Promise((Co,Wt)=>{ln=()=>Wt(new Error("Read cancelled")),ye.signal.addEventListener("abort",ln,{once:!0})})]):await Ze;L=Qn("output-volume",Gn)}finally{ye.signal.removeEventListener("abort",ln),le.delete(ye)}}else{if(x==="preview-tts"&&(Ke={id:y,abort:new AbortController,cancelled:!1},J=Ke,A({ttsPreview:{status:"preparing"},ttsPreviewFor:y})),Yn.has(x)){let ye,ln=new Promise((Ze,Gn)=>{ye=()=>Gn(new Error("Read cancelled")),Pe.abort.signal.addEventListener("abort",ye,{once:!0})});try{L=await Promise.race([Ne(y,{...D,action:x},Pe.abort.signal),ln])}finally{Pe.abort.signal.removeEventListener("abort",ye)}}else L=await Ne(y,{...D,action:x},Ke?.abort.signal??Pe?.abort.signal);if(Pe?.stale)return!1}if(!S)return!vt.includes(x);if(Pe?.stale)return!1;if(Le!==E)return vt.includes(x)?!1:(Ve({settings:!0,force:!0}),!0);if(Yn.has(x)&&gn(x),["agent-permissions","save-agent-permissions"].includes(x)&&A({agentPermissions:L,agentPermissionsFor:y,agentPermissionUncertain:!1}),["agent-requests","decide-agent-request"].includes(x)&&(A({agentRequests:L,agentRequestsFor:y,agentRequestUncertain:!1}),x==="decide-agent-request"&&L.lastOutcome?.state==="completed"&&(A({checkedFor:null}),Ve({settings:!0,force:!0})),x==="decide-agent-request"&&L.lastOutcome?.state==="unknown"&&A({uncertain:!0,error:"\u64CD\u4F5C\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u5148\u8BFB\u53D6\u5B9E\u9645\u72B6\u6001\uFF0C\u4E0D\u8981\u91CD\u8BD5\u3002"})),wo.includes(x)){if(x==="listen-mode"){if(T!==y||Le!==E)return!1;if(L.listenMode!==D.mode)throw new Error("\u8BF4\u8BDD\u65B9\u5F0F\u7684\u56DE\u6267\u5C1A\u672A\u786E\u8BA4")}if(Le!==E)return!0;if(["status","disable"].includes(x)&&L.ttsRuntime){let Ze=!!(L.ttsRuntime.blocked||s.ttsUncertain&&(L.ttsRuntime.busy||In!==Ye));L.ttsRuntime.blocked&&Ye++,A({ttsUncertain:Ze}),!Ze&&!L.ttsRuntime.busy&&!q&&J?.cancelled&&(J=null)}let ye=s.visibilityUncertain&&!(x==="status"&&s.visibilityReadbackFor===y),ln=Object.hasOwn(L,"existingVoiceSession");!ln&&Object.hasOwn(s.status??{},"existingVoiceSession")&&(L={...L,existingVoiceSession:s.status.existingVoiceSession,existingVoiceSessionSupported:s.status.existingVoiceSessionSupported}),A({status:L,checkedFor:y,uncertain:ye,visibilityUncertain:ye,...ye?{}:{visibilityReadbackFor:null},...Q?{error:null}:{},...T===y?{sourcePending:!1}:{},...["status","disable"].includes(x)?{voiceStopUnconfirmed:!1}:{},...x==="status"&&ln?{existingSessionUnconfirmed:!1}:{},...x==="listen-mode"?{listenModeReceiptRevision:s.conversation?.revision??null}:{}}),Ie&&(!L.enabled||L.existingVoiceSession?.sessionId!==Ie.sessionId)&&Ge(),["predecessor-cleanup-pending","helper-cleanup-pending"].includes(L.voiceSession?.recovery?.kind)?ns(y):Pt()}if(cd.includes(x)&&(x!=="read-settings"&&Le===E&&(a.delete(x),A({settingsDraftActions:[...a]})),x==="read-settings"&&a.size>0&&s.settingsFor===y&&s.settings?.revision!==L.revision?(d=L,A({settingsConflict:!0})):(d=null,A({settings:L,settingsFor:y,settingsConflict:!1,settingsKey:a.size>0?s.settingsKey:L.revision})),L.onboarding&&gn("setup-status"),A({...L.onboarding?{setupStatus:L.onboarding,setupError:null}:{},...x==="read-settings"&&s.visibilityUncertain&&["hidden","workspace"].includes(L.voiceSession?.visibility)?{visibilityReadbackFor:y}:{}})),x==="read-settings"&&s.visibilityUncertain&&Ee(y,"status"),x==="conversation-models"&&A({conversationModels:L,conversationModelsFor:y,conversationModelsError:null}),x==="inspect-tts"&&A({ttsCapabilities:L,ttsCapabilitiesFor:y}),x==="save-tts"&&L.ttsSetup?.provider==="deepseek"&&L.ttsSetup.deepseekTextTransmissionAccepted&&!s.authorization?.scopes?.some(ye=>ye.id==="deepseek-text"&&ye.allowed)&&Un(),x==="save-tts"&&L.ttsSetup?.provider==="custom"&&L.ttsSetup.customTts?.textTransmissionAccepted&&!s.authorization?.scopes?.some(ye=>ye.id==="custom-tts-text"&&ye.allowed)&&Un(),x==="preview-tts"&&!Ke.cancelled&&A({ttsPreview:{...L,status:"completed"},ttsPreviewFor:y}),["read-output-volume","set-output-volume"].includes(x)&&A({outputVolume:L,outputVolumeFor:y,outputVolumeUncertain:!1}),["save-voice-prompt","save-conversation-model","set-visibility","set-performance-mode","save-tts","apply-model-install"].includes(x)&&(A({status:null,checkedFor:null,catalog:null,catalogFor:null}),Ve({force:!0})),x==="plan-model-install"&&A({installPlan:L,installPlanFor:y,installPlanRequest:{...D}}),x==="model-installer"&&(A({installer:L,installerFor:y,installerUncertain:!!s.installerTerminationUnconfirmed}),T===y&&!Z&&(Z=!0,te(!0))),x==="inspect-model-compute"&&s.installerFor===y&&s.installer&&A({installer:{...s.installer,compute:L}}),x==="start-model-install"&&A({installPlan:null,installPlanFor:null}),x==="list"){let ye=D.cursor&&s.catalogFor===y?s.catalog?.items??[]:[];A({catalog:{...L,items:[...new Map([...ye,...L.items].map(ln=>[ln.id,ln])).values()]},catalogFor:y})}return["new","resume","listen-mode"].includes(x)&&A({catalog:null}),["new","resume"].includes(x)&&T===y&&Le===E&&(i++,A({...r,newChatFor:x==="new"&&D.expectedOwnerSessionId!==void 0?y:void 0})),x==="listen-mode"&&(s.setupOpen&&A({settingsFor:void 0}),Ve({settings:!0,force:!0})),["status","enable","disable","new","resume"].includes(x)&&T===y&&(x!=="status"||jn!==y||On!==bo(L)||P!==De()||s.conversationError)&&En(),!0}catch(L){if(x==="listen-mode"&&(T!==y||Le!==E)||(Pe&&(L?.uncertain||/TTS_TERMINATION_UNCONFIRMED/.test(String(L?.code??"")+" "+String(L?.message??"")))&&(x==="inspect-tts"?re({}):A({installerUncertain:!0,installerTerminationUnconfirmed:!0})),!S||Pe?.stale||Ke?.cancelled))return!1;if(Le!==E)return vt.includes(x)||Ve({settings:!0,force:!0}),!1;x==="status"&&(Pt(),T===y&&Le===E&&A({sourcePending:!1})),vt.includes(x)||(H=null);let ye=Rh(L);(ye==="AUTHORIZATION_REQUIRED"||ye==="USAGE_AGREEMENT_REQUIRED")&&Un({open:!0,review:!0});let Ze=ye?.startsWith("TTS_CUSTOM_")||ye==="TTS_INVALID_AUDIO"&&s.settings?.ttsSetup?.provider==="custom"&&!D.values?"custom":ye?.startsWith("TTS_SYSTEM_")?"system":ye?.startsWith("TTS_DEEPSEEK_")?"deepseek":null;if(Ke&&Ze&&!L.uncertain){let Gn=ye==="TTS_DEEPSEEK_API_KEY_INVALID"?"DeepSeek \u5B98\u65B9\u6717\u8BFB\u63A5\u53E3\u62D2\u7EDD\u4E86\u672C\u6B21 API Key\uFF08401\uFF09\u3002\u8BF7\u5728 DSH \u6A21\u578B\u8BBE\u7F6E\u4E2D\u6838\u5BF9\u5F00\u653E\u5E73\u53F0 API Key\u3002":String(L?.message??L).split(`
`)[0].slice(0,256);return await hn()&&Le===E&&A({ttsPreview:{status:"failed",provider:Ze,detail:Gn},ttsPreviewFor:y}),!1}return Ke&&await hn(),x==="preview-tts"&&Ye++,x==="enable"&&T===y&&Le===E&&A({enableError:String(L?.message??L)+(L?.code?" ["+L.code+"]":"")}),x==="listen-mode"&&T===y&&Le===E&&A({listenModeError:!0}),x==="disable"&&A({voiceStopUnconfirmed:!0}),A({error:String(L?.message??L),...x==="conversation-models"?{conversationModelsError:String(L?.message??L),conversationModels:null,conversationModelsFor:y}:{},...x==="save-bindings"?{bindingError:String(L?.message??L)+(L?.code?" ["+L.code+"]":"")}:{},...x==="save-agent-permissions"?{agentPermissionUncertain:!0}:{},...x==="decide-agent-request"?{agentRequestUncertain:!0}:{},...x==="preview-tts"?{ttsPreviewFor:y,ttsUncertain:!0}:{},...x==="set-output-volume"?{outputVolumeUncertain:!0}:{},...yo.includes(x)?{uncertain:!0,visibilityUncertain:!0,visibilityReadbackFor:null}:{},...["start-model-install","control-model-install"].includes(x)?{installerUncertain:!0}:{},...wo.includes(x)?{uncertain:!0,readOnlyFailure:x==="status"&&(!s.uncertain||s.readOnlyFailure===!0)}:{}}),Yn.has(x)&&Ee(y,x),yo.includes(x)?(Ee(y,"read-settings"),Ee(y,"status")):wo.includes(x)&&x!=="status"?Ee(y,"status"):x==="set-output-volume"?Ee(y,"read-output-volume"):x==="save-agent-permissions"?Ee(y,"agent-permissions"):x==="decide-agent-request"?Ee(y,"agent-requests"):["start-model-install","control-model-install"].includes(x)&&Ee(y,"model-installer"),!1}finally{v.get(x)===Pe&&v.delete(x),Ke&&J===Ke&&!Ke.cancelled&&(J=null),Pe&&f===Pe&&(f=null),$e&&m===$e&&(m=null),Q||(b--,A({busy:b>0,interruptibleRead:f?.action??null,diagnosticStopPending:!!m,...x==="listen-mode"?{listenModePending:null}:{}})),queueMicrotask(()=>{zo(),Et()})}},dispose(){if(S){E++,ge(),a.clear(),d=null,A({settingsConflict:!1,settingsDraftActions:[]}),Sn({clear:!0}),Pn({clear:!0}),Pt(),hn(),k(),f?.abort.abort(),_n(),S=!1,F++,V++,N?.(),C?.();for(let y of le)y.abort();le.clear(),ae.clear()}}},rn}function xo(e,n,t,o=12){let i=n.left+o,r=n.top+o;return{x:Math.max(i,Math.min(e.x,Math.max(i,n.right-t.width-o))),y:Math.max(r,Math.min(e.y,Math.max(r,n.bottom-t.height-o)))}}function ud(e=window){let n=null,t=null,o=null,i=null,r=null,s=null,a=null,d=null,l=null,u=()=>e.performance?.now?.()??Date.now(),p=e.matchMedia?.("(prefers-reduced-motion: reduce)"),f=()=>{d!==null&&e.cancelAnimationFrame?.(d),d=null,l&&(l=null,S("endDrag"))},m=P=>{if(d=null,!l||!n)return;if(p?.matches||n.dataset?.motion==="off"){f();return}let C=Math.max(0,P-l.time);l.time=P;let F={...i},V=!1;for(let Z of["x","y"]){let J=l[Z],q=(J.target-i[Z])*Math.exp(-C/J.tau);F[Z]=Math.abs(q)<.5?J.target:J.target-q,F[Z]!==J.target&&(V=!0)}i=xo(F,r.box,r.size),v(),S("move");for(let Z of["x","y"])Math.abs(i[Z]-F[Z])>.01&&(l[Z].target=i[Z]);!V||P-l.start>=2400?f():d=e.requestAnimationFrame(m)},b=(P,C)=>{n.style[P]!==C&&(n.style[P]=C)},v=()=>{b("left",`${i.x}px`),b("top",`${i.y}px`)},w=null,k=null,z="",H=()=>{let P=(n?.closest("[data-shell-overlay]")??n?.ownerDocument?.querySelector?.("[data-shell-overlay]"))?.getBoundingClientRect(),C=e.visualViewport,F=Math.max(P?.left??0,C?.offsetLeft??0),V=Math.max(P?.top??0,C?.offsetTop??0),Z=Math.min(P?.right??e.innerWidth,(C?.offsetLeft??0)+(C?.width??e.innerWidth)),J=Math.min(P?.bottom??e.innerHeight,(C?.offsetTop??0)+(C?.height??e.innerHeight)),q=parseFloat(e.getComputedStyle(n).getPropertyValue("--dsh-frame-top-clearance"))||0;return{left:F,top:V+q,right:Z,bottom:J}},B=P=>{if(!n)return;let C=Number.isFinite(P?.width)&&Number.isFinite(P?.height),F=C&&r?r.box:H();b("maxWidth",`${Math.max(1,F.right-F.left-24)}px`),b("maxHeight",`${Math.max(1,F.bottom-F.top-24)}px`);let V=C?P:n.getBoundingClientRect();r={box:F,size:{width:V.width,height:V.height}},i=xo(i??{x:F.right-V.width-20,y:F.bottom-V.height-20},F,V),v(),!o&&!l&&S("resize")},O=()=>{a!==null&&e.cancelAnimationFrame?.(a),a=null},I=()=>{O();let P=s;s=null,!(!o||!n||!P)&&(i=xo(P,r.box,r.size),v(),S("move"))},E=P=>{n?.dataset&&(P&&["left","right","top","bottom"].includes(P.edge)&&["preview","docked"].includes(P.phase)?(n.dataset.whaleDockEdge=P.edge,n.dataset.whaleDockPhase=P.phase):(delete n.dataset.whaleDockEdge,delete n.dataset.whaleDockPhase))},G=()=>{let P=k;k=null;try{P?.dispose()}catch{}E(null),n&&(n.style.zIndex=z)},S=P=>{try{typeof k?.[P]=="function"&&k[P]()}catch{G()}},_=()=>{if(G(),!(!n||w?.version!==1||typeof w.register!="function"))try{k=w.register({id:"whale-voice",read(){let{box:P,size:C}=r;return{rect:{...i,width:C.width,height:C.height},bounds:{x:P.left+12,y:P.top+12,width:Math.max(1,P.right-P.left-24),height:Math.max(1,P.bottom-P.top-24)},collapsed:n.hasAttribute?.("data-collapsed")===!0}},apply(P){!n||!Number.isFinite(P?.x)||!Number.isFinite(P?.y)||(i=xo(P,r.box,r.size),v())},onDock:E,onFront:P=>{n&&(n.style.zIndex=P===!0?"901":"900")}}),["beginDrag","move","endDrag","resize","detach","dispose"].every(P=>typeof k?.[P]=="function")||G()}catch{G()}},T=(P=!1,C=!1)=>{P?I():(O(),s=null);let F=o;o=null,F?.target.hasPointerCapture?.(F.id)&&F.target.releasePointerCapture(F.id);let V=u(),Z=F?.samples??[],J=Z.at(-1),q=Z[0],ae=J&&q?J.time-q.time:0,le=J?V-J.time:1/0,pe=Math.max(0,1-Math.max(0,le-24)/56),xe=ae>0?(J.x-q.x)/ae*pe:0,A=ae>0?(J.y-q.y)/ae*pe:0;if(F&&C&&!p?.matches&&n?.dataset?.motion!=="off"&&typeof e.requestAnimationFrame=="function"&&Math.hypot(xe,A)>.04){let oe=xo({x:i.x+xe*240,y:i.y+A*240},r.box,r.size),X=(U,_e)=>({target:oe[U],tau:_e?Math.max(1,Math.abs((oe[U]-i[U])/_e)):240});l={x:X("x",xe),y:X("y",A),time:V,start:V},d=e.requestAnimationFrame(m)}else F&&S(P?"endDrag":"detach")},N=()=>{f(),T(),G(),t?.disconnect(),t=null,e.removeEventListener("resize",B),e.visualViewport?.removeEventListener("resize",B),e.visualViewport?.removeEventListener("scroll",B),n=null,r=null};return{ref(P){if(P===n||(N(),!P))return;n=P,z=P.style.zIndex||"",n.style.transitionProperty="none",t=new e.ResizeObserver(F=>{let V=F?.find?.(J=>J.target===n),Z=V?.borderBoxSize?.[0]??V?.borderBoxSize;Number.isFinite(Z?.inlineSize)&&Number.isFinite(Z?.blockSize)&&F.every(J=>J.target===n)?B({width:Z.inlineSize,height:Z.blockSize}):B()}),t.observe(n);let C=n.closest("[data-shell-overlay]")??n.ownerDocument?.querySelector?.("[data-shell-overlay]");C&&t.observe(C),e.addEventListener("resize",B),e.visualViewport?.addEventListener("resize",B),e.visualViewport?.addEventListener("scroll",B),B(),_()},useLayoutService(P){return w=P,_(),()=>{w===P&&(G(),w=null,B())}},activate(){f(),S("activate")},pointerDown(P,C=P.currentTarget){P.button!==0||P.pointerType&&P.pointerType!=="mouse"||!n||(f(),B(),S("beginDrag"),o={id:P.pointerId,target:C,x:P.clientX,y:P.clientY,start:{...i},samples:[{x:P.clientX,y:P.clientY,time:u()}]},C.setPointerCapture(P.pointerId),P.preventDefault())},pointerMove(P){if(!o||P.pointerId!==o.id)return;let C=u(),F=[P];try{F=[...P.getCoalescedEvents?.()??[],P]}catch{}for(let q of F){if(!Number.isFinite(q.clientX)||!Number.isFinite(q.clientY))continue;let ae=Number.isFinite(q.timeStamp)&&Number.isFinite(P.timeStamp)?Math.min(0,q.timeStamp-P.timeStamp):0,le=C+Math.max(-60,ae),pe=o.samples.at(-1);if(le<pe.time)continue;let xe={x:q.clientX,y:q.clientY,time:le};le===pe.time?o.samples[o.samples.length-1]=xe:o.samples.push(xe)}let V=C-60;for(;o.samples.length>2&&o.samples[1].time<=V;)o.samples.shift();let Z=o.samples[0],J=o.samples[1];if(J&&Z.time<V&&J.time>V){let q=(V-Z.time)/(J.time-Z.time);o.samples[0]={x:Z.x+(J.x-Z.x)*q,y:Z.y+(J.y-Z.y)*q,time:V}}s={x:o.start.x+P.clientX-o.x,y:o.start.y+P.clientY-o.y},typeof e.requestAnimationFrame!="function"?I():a===null&&(a=e.requestAnimationFrame(I))},pointerEnd(P){P.pointerId===o?.id&&T(!["pointercancel","lostpointercapture"].includes(P.type),P.type==="pointerup")},keyDown(){},fit:B,dispose:N}}var Hi=Object.freeze({panel:320,settings:660,setup:420,collapsed:216});function dd(e=window,{onResize:n=()=>{}}={}){let t=null,o=null,i=null,r=null,s=null,a=null,d=null,l=null,u=null,p=null,f=null,m=null,b=null,v=null,w=null,k=null,z={width:0,height:0},H=e.matchMedia?.("(prefers-reduced-motion: reduce)"),B=()=>H?.matches?"off":t?.dataset.motion??"spring",O=P=>Number.parseFloat(P)||0;function I(){let P=e.visualViewport,C=(t.closest?.("[data-shell-overlay]")??t.ownerDocument?.querySelector?.("[data-shell-overlay]"))?.getBoundingClientRect(),F=Math.max(C?.left??0,P?.offsetLeft??0),V=Math.max(C?.top??0,P?.offsetTop??0),Z=Math.min(C?.right??e.innerWidth,(P?.offsetLeft??0)+(P?.width??e.innerWidth)),J=Math.min(C?.bottom??e.innerHeight,(P?.offsetTop??0)+(P?.height??e.innerHeight)),q=e.getComputedStyle(t);return{width:Math.max(1,Z-F-24),height:Math.max(1,Math.min((J-V)*.6,J-V-24-O(q.getPropertyValue("--dsh-frame-top-clearance")))),chrome:O(q.paddingTop)+O(q.paddingBottom)+O(q.borderTopWidth)+O(q.borderBottomWidth),horizontalChrome:O(q.paddingLeft)+O(q.paddingRight)+O(q.borderLeftWidth)+O(q.borderRightWidth),panelRadius:O(q.getPropertyValue("--dsw-radius-lg"))||12}}function E(){d!==null&&e.cancelAnimationFrame(d),d=null,u=null}function G(){!t||!p||(p.width=Math.max(1,Math.min(p.width,m.width)),p.height=Math.max(1,Math.min(p.height,m.height)),t.style.width=`${p.width.toFixed(3)}px`,t.style.height=`${p.height.toFixed(3)}px`,t.style.setProperty?.("--whale-visible-content",`${Math.max(1,p.height-m.chrome)}px`),k===null?t.style.removeProperty?.("--whale-animated-radius"):t.style.setProperty?.("--whale-animated-radius",`${k.toFixed(2)}px`),n({width:p.width,height:p.height}))}function S(P){if(d=null,!t||!f)return;let C=Math.min(.032,Math.max(.001,u===null?1/60:(P-u)/1e3));u=P;let F=w?560:B()==="firm"?420:360,V=w?47.4:B()==="firm"?41:30,Z=!0;for(let J of["width","height"]){for(let q=0;q<4;q++)z[J]+=(F*(f[J]-p[J])-V*z[J])*C/4,p[J]+=z[J]*C/4;(Math.abs(f[J]-p[J])>.25||Math.abs(z[J])>1)&&(Z=!1)}if(w){let J=f.height-w.height,q=Math.abs(J)>.25?Math.max(0,Math.min(1,(p.height-w.height)/J)):1,ae=b?f.height/2:m.panelRadius;k=w.radius+(ae-w.radius)*q}(Z||B()==="off")&&(p={...f},z={width:0,height:0},u=null,w=k=null),G(),!Z&&B()!=="off"&&(d=e.requestAnimationFrame(S))}function _(){if(!t||!o)return;m=I(),t.dataset.compactHeight=m.height<300?"true":"false";let P=t.hasAttribute("data-collapsed")&&t.dataset.collapsed!=="false";if(p&&b!==null&&P!==b){let U=k??(b?p.height/2:m.panelRadius);w={height:p.height,radius:U},k=U,t.style.setProperty?.("--whale-animated-radius",`${U.toFixed(2)}px`),z={width:0,height:0}}let C=t.dataset.view,F=t.dataset.sourcePending&&C==="home"&&v===C&&!P&&b===P?f?.height:void 0;b=P,v=C;let V=Math.min(m.width,P?Hi.collapsed:Hi[C]??Hi.panel);t.style.boxSizing="border-box",t.style.transitionProperty="none",t.style.overflow="hidden",t.style.maxWidth=`${m.width}px`,t.style.maxHeight=`${m.height}px`;let Z=Math.max(1,m.height-m.chrome);o.style.width=`${Math.max(1,V-m.horizontalChrome)}px`,o.style.maxHeight=`${Z}px`,o.style.overflowY="hidden",o.style.minHeight="0",t.style.setProperty?.("--whale-content-limit",`${Z}px`);let J=!!o.querySelector?.('[data-size-detail="true"]'),q=P?null:C==="setup"?o.querySelector?.("[data-whale-intrinsic]"):C==="home"&&!J?o.querySelector?.("[data-home-controls]"):null,ae=q?.querySelector?.("[data-whale-natural-content]"),le=ae??q;C==="setup"&&!P&&(o.style.height="auto"),le!==a&&(s?.disconnect(),l!==null&&e.cancelAnimationFrame(l),l=null,s=null,a=le,a&&e.ResizeObserver&&(s=new e.ResizeObserver(()=>{l===null&&(l=e.requestAnimationFrame(()=>{l=null,_()}))}),s.observe(a)));let pe=q?.getBoundingClientRect?.().height,xe=ae?Math.max(0,ae.offsetHeight-ae.parentElement.clientHeight):0,A=pe+xe,oe=P?44:A>0?Math.ceil(A+m.chrome):C==="home"?J?520:320:480,X=Math.min(m.height,F??oe);(C!=="setup"||P)&&(o.style.height=`${Math.max(1,X-m.chrome)}px`),f={width:V,height:X},!p||B()==="off"?(E(),p={...f},z={width:0,height:0},w=k=null,G()):d===null&&(Math.abs(p.width-V)>.25||Math.abs(p.height-X)>.25)&&(u=e.performance?.now?.()??null,d=e.requestAnimationFrame(S))}function T(){E(),i?.disconnect(),r?.disconnect(),s?.disconnect(),l!==null&&e.cancelAnimationFrame(l),l=null,s=a=null,e.removeEventListener("resize",_),e.visualViewport?.removeEventListener("resize",_),e.visualViewport?.removeEventListener("scroll",_),H?.removeEventListener?.("change",_),i=r=null}function N(){if(T(),!(!t||!o)){if(e.ResizeObserver){i=new e.ResizeObserver(_);let P=t.closest?.("[data-shell-overlay]")??t.ownerDocument?.querySelector?.("[data-shell-overlay]");P&&i.observe(P)}e.MutationObserver&&(r=new e.MutationObserver(_),r.observe(t,{attributes:!0,attributeFilter:["data-view","data-motion","data-collapsed","data-source-pending"]}),r.observe(o,{attributes:!0,attributeFilter:["data-size-detail","data-home-layout"],subtree:!0})),e.addEventListener("resize",_),e.visualViewport?.addEventListener("resize",_),e.visualViewport?.addEventListener("scroll",_),H?.addEventListener?.("change",_),_()}}return{ref(P){t!==P&&(t=P,p=f=b=v=w=k=null,z={width:0,height:0},N())},contentRef(P){o!==P&&(o=P,N())},update:_,dispose(){T(),t=o=p=f=null}}}var pd=["spring","firm","off"];function md(e=window){let n="dsh-whale-voice:motion:v1",t="dsh-whale-voice:assistant-name:v1",o=()=>{try{let l=e.localStorage.getItem(t)?.trim();return l&&l.length<=40?l:null}catch{return null}},i=new Set,r=()=>{try{let l=e.localStorage.getItem(n);return pd.includes(l)?l:"spring"}catch{return"spring"}},s={motion:r(),assistantName:o(),error:null},a=l=>{s=l;for(let u of i)u()},d=l=>{[n,t,null].includes(l.key)&&a({motion:r(),assistantName:o(),error:null})};return e.addEventListener("storage",d),{getSnapshot:()=>s,subscribe(l){return i.add(l),()=>i.delete(l)},setMotion(l){if(!pd.includes(l))return!1;let u=null;try{e.localStorage.setItem(n,l)}catch{u="storage-unavailable"}return a({...s,motion:l,error:u}),!u},setAssistantName(l){if(typeof l!="string"||!l.trim()||l.trim().length>40)return!1;let u=l.trim(),p=null;try{e.localStorage.setItem(t,u)}catch{p="storage-unavailable"}return a({...s,assistantName:u,error:p}),!p},dispose(){e.removeEventListener("storage",d),i.clear()}}}var Dh='button,input,textarea,select,a,label,summary,[role="button"],[role="slider"],[role="tab"],[contenteditable="true"],[data-no-drag]';function fd(e,n){if(!e||!n?.contains(e))return!1;let t=e.closest?.(Dh);return!t||t.hasAttribute("data-drag-surface")}function hd(e){if(e.repeat||e.metaKey)return null;let n=e.code;return!/^(F([1-9]|1[0-9]|2[0-4])|Key[A-Z]|Digit[0-9]|Space)$/.test(n)||e.altKey&&n==="F4"?null:{code:n,modifiers:[e.ctrlKey&&"Control",e.altKey&&"Alt",e.shiftKey&&"Shift"].filter(Boolean)}}var hr=()=>({revision:0,rootSessionId:null,title:null,latest:null,items:[],inputActive:!1,inputError:null,playbackConfirmed:!1}),Zi=()=>({schema:1,hardware:null,compute:{schema:1,default:"cpu",observedAt:null,backends:{},reason:"\u5C1A\u672A\u68C0\u6D4B\u672C\u5730\u8BA1\u7B97\u540E\u7AEF\u3002"},models:[],jobs:[]});async function gd(e,n=()=>{}){let t=await e.remote.$mount(Xu),o,i;try{if(i=e.inject(["remote","remote.whaleConversation"],u=>{o=u.remote.whaleConversation}),await i.await(),!o)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA")}catch(u){throw await i?.dispose(),await t(),u}let r=new Set,s=new Map,a=!1,d=u=>{if(u?.ok!==!0)throw u?.error??new Error("\u8BED\u97F3\u63A5\u53E3\u54CD\u5E94\u65E0\u6548");return u.value},l=async(u,p,f=!0)=>{let m;try{m=await u()}catch(b){throw f&&!a&&n("ui-request","finished",p?.aborted?"cancelled":"failed"),b}return f&&m?.ok!==!0&&m?.error==null&&!p?.aborted&&n("ui-render-error","finished","failed"),d(m)};return{subscribeUpdates(u,p){let f=new AbortController;return r.add(f),Promise.resolve().then(async()=>{if(!f.signal.aborted)try{for await(let m of o.followUpdates(f.signal))f.signal.aborted||u(m);f.signal.aborted||(n("ui-stream","finished","failed"),p())}catch{f.signal.aborted||(n("ui-stream","finished","failed"),p())}finally{r.delete(f)}}),()=>{f.abort(),r.delete(f)}},updateAction(u,p){if(a)throw new Error("\u66F4\u65B0\u63A5\u53E3\u5DF2\u5378\u8F7D");return l(()=>o.updateAction(u,p),p)},subscribePresentation(u,p){let f=new AbortController;return r.add(f),(async()=>{try{for await(let m of o.followPresentation(f.signal))f.signal.aborted||u(m);f.signal.aborted||(n("ui-stream","finished","failed"),p(new Error("\u4F1A\u8BDD\u663E\u793A\u8FDE\u63A5\u5DF2\u7ED3\u675F")))}catch(m){f.signal.aborted||(n("ui-stream","finished","failed"),p(m))}finally{r.delete(f)}})(),()=>{f.abort(),r.delete(f)}},subscribe(u,p,f=()=>{}){let m=new AbortController;return r.add(m),p(hr(),{initial:!0}),(async()=>{try{for await(let b of o.follow(u,m.signal))m.signal.aborted||p(b);m.signal.aborted||(n("ui-stream","finished","failed"),p(hr(),{initial:!0}),f(new Error("\u8BED\u97F3\u72B6\u6001\u8FDE\u63A5\u5DF2\u7ED3\u675F\uFF0C\u6B63\u5728\u91CD\u65B0\u8FDE\u63A5")))}catch(b){m.signal.aborted||(n("ui-stream","finished","failed"),p(hr(),{initial:!0}),f(b))}finally{r.delete(m)}})(),()=>{m.abort(),r.delete(m),p(hr(),{initial:!0})}},subscribeModels(u,p,f=()=>{}){if(a)return p(Zi(),{initial:!0}),f(new Error("\u6A21\u578B\u8FDB\u5EA6\u63A5\u53E3\u5DF2\u5378\u8F7D")),()=>{};let m=new AbortController,b=!1,v=()=>{b||(b=!0,m.abort(),s.delete(m),p(Zi(),{initial:!0}))};return s.set(m,v),p(Zi(),{initial:!0}),(async()=>{try{for await(let w of o.followModels(u,m.signal))!b&&!a&&!m.signal.aborted&&p(w);!b&&!a&&!m.signal.aborted&&(n("ui-stream","finished","failed"),v(),f(new Error("\u6A21\u578B\u8FDB\u5EA6\u8FDE\u63A5\u5DF2\u7ED3\u675F\uFF0C\u6B63\u5728\u91CD\u65B0\u8FDE\u63A5")))}catch(w){!b&&!a&&!m.signal.aborted&&(n("ui-stream","finished","failed"),v(),f(w))}finally{s.delete(m)}})(),v},async action(u,p,f){if(a)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");let m=await l(()=>o.action(u,p,f),f);try{let b=JSON.parse(m);if(b?.protocol!==1||b.action!==p.action||!b.value||typeof b.value!="object"||Array.isArray(b.value))throw new Error("Fish Voice UI protocol mismatch");return b.value}catch(b){throw n("ui-render-error","finished","failed"),b}},readAuthorization:u=>l(()=>o.readAuthorization(u),u),saveAuthorization:(u,p)=>l(()=>o.saveAuthorization(u,p),p),async senseVoiceAsrAction(u,p){if(a)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");return l(()=>o.senseVoiceAsrAction(u,p),p)},async manageSessions(u,p,f){if(a)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");return JSON.parse(await l(()=>o.manageSessions(u,p,f),f))},listExistingVoiceSessions(u,p){if(a)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u63A5\u53E3\u5DF2\u5378\u8F7D");return l(()=>o.listExistingVoiceSessions(u,p),p)},setExistingVoiceSession(u,p){if(a)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u63A5\u53E3\u5DF2\u5378\u8F7D");return l(()=>o.setExistingVoiceSession(u,p),p)},retryVoiceTranscript(u,p){if(a)throw new Error("\u8BED\u97F3\u91CD\u53D1\u63A5\u53E3\u5DF2\u5378\u8F7D");return l(()=>o.retryVoiceTranscript(u,p),p)},readClientOperationScope(u){if(a)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return l(()=>o.readClientOperationScope(u),u,!1)},recordClientOperations(u,p){if(a)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return l(()=>o.recordClientOperations(u,p),p,!1)},readOperationLog(u,p){if(a)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return l(()=>o.readOperationLog(u,p),p,!1)},readSetup:u=>l(()=>o.readSetup(u),u),readVolume:(u,p)=>l(()=>o.readVolume(u,p),p),setVolume:(u,p,f)=>l(()=>o.setVolume(u,p,f),f),async dispose(){a=!0;for(let u of[...s.values()])u();s.clear();for(let u of r)u.abort();r.clear(),await i.dispose(),await t()}}}var yd=new Set(dr),wd=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,vd=256,Bi="dsh-fish-voice.pending-operation-log.v1",Fi="ui-buffer-overflow";function Mh(){let e=globalThis.crypto;if(e?.randomUUID)return e.randomUUID();let n=e?.getRandomValues(new Uint8Array(16));if(!n)return null;n[6]=n[6]&15|64,n[8]=n[8]&63|128;let t=Array.from(n,o=>o.toString(16).padStart(2,"0")).join("");return[t.slice(0,8),t.slice(8,12),t.slice(12,16),t.slice(16,20),t.slice(20)].join("-")}function Hh(){try{return globalThis.sessionStorage}catch{return}}function bd(e,n=!1){if(!e||typeof e.id!="string"||!wd.test(e.id)||!Number.isSafeInteger(e.at)||e.at<0||!yd.has(e.action)||!["user","ui"].includes(e.source)||n!==(e.action===Fi)||n&&(e.source!=="ui"||!Number.isSafeInteger(e.count)||e.count<1))return null;let{id:t,at:o,action:i,source:r}=e;return{id:t,at:o,action:i,source:r,...n?{count:e.count}:{},...["requested","finished"].includes(e.phase)?{phase:e.phase}:{},...["ok","failed","cancelled"].includes(e.result)?{result:e.result}:{}}}function xd({schedule:e=setTimeout,unschedule:n=clearTimeout,now:t=Date.now,identify:o=Mh,storage:i=Hh()}={}){let r=[],s=null,a=null,d=null,l=!1,u,p,f,m=0,b=!1,v=()=>{p!==void 0&&(n(p),p=void 0)},w=_=>_&&_.at>=t()-Zu,k=()=>{r=r.filter(w),w(s)||(s=null),w(a)||(a=null)},z=()=>r.length>0||s!==null||a!==null,H=()=>{if(!(!d||!i))try{z()?i.setItem(Bi,JSON.stringify({scope:d,pending:r,overflow:s,dropped:a})):i.removeItem(Bi)}catch{}},B=(_,T)=>{a={count:Math.min(Number.MAX_SAFE_INTEGER,(a?.count??0)+_),at:Math.max(a?.at??0,T)}},O=_=>{r.length>=vd?B(1,_.at):r.push(_)},I=_=>{if(d===null){let T;try{T=JSON.parse(i?.getItem(Bi)??"null")}catch{}if(T?.scope===_){let N=r,P=a,C=Array.isArray(T.pending)?T.pending.slice(0,vd).map(F=>bd(F)).filter(w):[];r=[...new Map(C.map(F=>[F.id,F])).values()],s=bd(T.overflow,!0),a=T.dropped&&Number.isSafeInteger(T.dropped.count)&&T.dropped.count>0&&Number.isSafeInteger(T.dropped.at)&&w(T.dropped)?{count:T.dropped.count,at:T.dropped.at}:null,P&&B(P.count,P.at);for(let F of N)w(F)&&O(F)}}else d!==_&&(r=[],s=null,a=null);d=_,l=!0,k(),H()},E=(_=160)=>{b||f||p!==void 0||l&&!z()||!u?.readClientOperationScope||!u?.recordClientOperations||(p=e(()=>{p=void 0,G()},_),p?.unref?.())};async function G(){let _=new AbortController,T=u;f=_;let N=()=>!b&&u===T&&f===_;try{let P=AbortSignal.any([_.signal,AbortSignal.timeout(1e4)]);if(!l){let Z=await T.readClientOperationScope(P);if(!N())return;if(typeof Z?.scope!="string"||!wd.test(Z.scope))throw new Error("Operation scope unavailable");I(Z.scope)}if(k(),!s&&a){let Z=o();Z&&(s={id:Z,at:a.at,action:Fi,source:"ui",phase:"finished",count:a.count},a=null)}H();let C=s?[s,...r.slice(0,ho-1)]:r.slice(0,ho);if(!C.length)return;let F=await T.recordClientOperations({scope:d,events:C},P);if(!N())return;if(F?.accepted!==!0)throw new Error("Operation batch was not accepted");let V=new Set(C.map(Z=>Z.id));r=r.filter(Z=>!V.has(Z.id)),s&&V.has(s.id)&&(s=null),m=0,H()}catch{N()&&(l=!1,m++)}finally{N()&&(f=void 0,E(m?Math.min(3e4,750*2**Math.min(m-1,6)):160))}}function S(_,T,N,P){if(b||!yd.has(_)||_===Fi)return;let C;try{C=o()}catch{return}C&&(k(),O({id:C,at:t(),action:_,source:T,...N?{phase:N}:{},...P?{result:P}:{}}),H(),E())}return{user(_){S(_,"user")},internal(_,T,N){S(_,"ui",T,N)},attach(_){u===_||b||(v(),f?.abort(),f=void 0,u=_,l=!1,m=0,E(0))},dispose(){b=!0,v(),f?.abort(),r=[],s=null,a=null}}}var Wd=require("react-dom");var qe=require("react"),gr=require("@deepseek-ai/dsh-client-ui-primitives");var h={newChatButton:"PcPTEG_newChatButton",settingsBody:"PcPTEG_settingsBody",status:"PcPTEG_status",currentDshTarget:"PcPTEG_currentDshTarget",audioDeviceGrid:"PcPTEG_audioDeviceGrid",settingsNav:"PcPTEG_settingsNav",voicePromptCount:"PcPTEG_voicePromptCount",updateHeader:"PcPTEG_updateHeader",assistantName:"PcPTEG_assistantName",motionPreview:"PcPTEG_motionPreview",quickSpeed:"PcPTEG_quickSpeed",details:"PcPTEG_details",audioDeviceNotice:"PcPTEG_audioDeviceNotice",voiceBars:"PcPTEG_voiceBars",authorizationSteps:"PcPTEG_authorizationSteps",quickSegments:"PcPTEG_quickSegments",updateDialog:"PcPTEG_updateDialog",whaleEnter:"PcPTEG_whaleEnter",panelContent:"PcPTEG_panelContent",quickHint:"PcPTEG_quickHint",settingsLayout:"PcPTEG_settingsLayout",audioDevices:"PcPTEG_audioDevices",conversationChoice:"PcPTEG_conversationChoice",bubbleBrand:"PcPTEG_bubbleBrand",editNotice:"PcPTEG_editNotice",updateAnnouncement:"PcPTEG_updateAnnouncement",voicePromptInput:"PcPTEG_voicePromptInput",messageName:"PcPTEG_messageName",sessionTitle:"PcPTEG_sessionTitle",existingSessionHome:"PcPTEG_existingSessionHome",keyBindingRow:"PcPTEG_keyBindingRow",actions:"PcPTEG_actions",headerActions:"PcPTEG_headerActions",currentModel:"PcPTEG_currentModel",authorizationActions:"PcPTEG_authorizationActions",conversationOptions:"PcPTEG_conversationOptions",settingsHeader:"PcPTEG_settingsHeader",voicePromptMode:"PcPTEG_voicePromptMode",volumeControl:"PcPTEG_volumeControl",authorizationBody:"PcPTEG_authorizationBody",guideButton:"PcPTEG_guideButton",pageHeading:"PcPTEG_pageHeading",header:"PcPTEG_header",authorization:"PcPTEG_authorization",hint:"PcPTEG_hint",floating:"PcPTEG_floating",voiceTarget:"PcPTEG_voiceTarget",quickConversation:"PcPTEG_quickConversation",homeTargetRow:"PcPTEG_homeTargetRow",whalePreview:"PcPTEG_whalePreview",sessionRename:"PcPTEG_sessionRename",existingSessionList:"PcPTEG_existingSessionList",modelHeading:"PcPTEG_modelHeading",modelNav:"PcPTEG_modelNav",whaleInputPulse:"PcPTEG_whaleInputPulse",deviceSelect:"PcPTEG_deviceSelect",bubble:"PcPTEG_bubble",openOriginal:"PcPTEG_openOriginal",inlineActions:"PcPTEG_inlineActions",notice:"PcPTEG_notice",backButton:"PcPTEG_backButton",brand:"PcPTEG_brand",assistantNameInput:"PcPTEG_assistantNameInput",mark:"PcPTEG_mark",voiceStatus:"PcPTEG_voiceStatus",voicePrompt:"PcPTEG_voicePrompt",fullName:"PcPTEG_fullName",settingsPage:"PcPTEG_settingsPage",error:"PcPTEG_error",radios:"PcPTEG_radios",newMessages:"PcPTEG_newMessages",capabilityRow:"PcPTEG_capabilityRow",whaleFeedback:"PcPTEG_whaleFeedback",caption:"PcPTEG_caption",requestDetails:"PcPTEG_requestDetails",sliderLabel:"PcPTEG_sliderLabel",whaleSpin:"PcPTEG_whaleSpin",permissionList:"PcPTEG_permissionList",volumeRow:"PcPTEG_volumeRow",placeholder:"PcPTEG_placeholder",pathRow:"PcPTEG_pathRow",audioDeviceField:"PcPTEG_audioDeviceField",formActions:"PcPTEG_formActions",popover:"PcPTEG_popover",bindingActions:"PcPTEG_bindingActions",mouseBinding:"PcPTEG_mouseBinding",section:"PcPTEG_section",existingSessionSearch:"PcPTEG_existingSessionSearch",inlineField:"PcPTEG_inlineField",note:"PcPTEG_note",voicePromptActions:"PcPTEG_voicePromptActions",recentMessages:"PcPTEG_recentMessages",panelViewport:"PcPTEG_panelViewport",segmented:"PcPTEG_segmented",agreement:"PcPTEG_agreement",ellipsis:"PcPTEG_ellipsis",performanceChoice:"PcPTEG_performanceChoice",bubbleStatus:"PcPTEG_bubbleStatus",loadHistory:"PcPTEG_loadHistory",mainAction:"PcPTEG_mainAction",quickActions:"PcPTEG_quickActions",markSmall:"PcPTEG_markSmall",settings:"PcPTEG_settings",primary:"PcPTEG_primary",spin:"PcPTEG_spin",iconButton:"PcPTEG_iconButton",inputCaptionReceipt:"PcPTEG_inputCaptionReceipt",settingsBrand:"PcPTEG_settingsBrand",bindingEditor:"PcPTEG_bindingEditor",message:"PcPTEG_message",inputCaptionText:"PcPTEG_inputCaptionText",quickSpeedHeader:"PcPTEG_quickSpeedHeader",popoverHeader:"PcPTEG_popoverHeader",inputCaption:"PcPTEG_inputCaption",backIcon:"PcPTEG_backIcon",disclosureRow:"PcPTEG_disclosureRow",field:"PcPTEG_field",conversationHeader:"PcPTEG_conversationHeader",inputCaptions:"PcPTEG_inputCaptions",currentDshAction:"PcPTEG_currentDshAction",homeTargetPicker:"PcPTEG_homeTargetPicker",audioDeviceHint:"PcPTEG_audioDeviceHint",existingSessionTarget:"PcPTEG_existingSessionTarget",whaleBreathe:"PcPTEG_whaleBreathe",existingSessionPicker:"PcPTEG_existingSessionPicker",historyScope:"PcPTEG_historyScope",statusRow:"PcPTEG_statusRow",whalePageEnter:"PcPTEG_whalePageEnter",keyBinding:"PcPTEG_keyBinding",text:`.PcPTEG_floating {
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

[data-ds-dark-theme] .PcPTEG_floating {
  --whale-solid-base: var(--dsw-static-neutral-bluish-950, #181a1e);
}

.PcPTEG_floating[data-collapsed] {
  border-radius: var(--whale-animated-radius, 999px);
  corner-shape: round;
  width: 216px;
  padding: 4px;
}

.PcPTEG_floating[data-view="settings"] {
  width: 660px;
  padding: 0;
}

.PcPTEG_floating[data-view="setup"]:not([data-collapsed]) {
  width: 420px;
}

.PcPTEG_floating:active {
  cursor: grabbing;
}

.PcPTEG_floating[data-whale-dock-phase="preview"] {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

.PcPTEG_floating [hidden] {
  display: none !important;
}

.PcPTEG_floating [data-no-drag] {
  cursor: auto;
  touch-action: pan-y;
}

.PcPTEG_panelViewport {
  overscroll-behavior: contain;
  min-width: 0;
  min-height: 0;
  overflow-x: hidden;
}

.PcPTEG_panelContent {
  min-width: 0;
  animation: PcPTEG_whaleEnter var(--whale-duration) var(--whale-ease);
}

.PcPTEG_mark {
  flex: none;
  width: 24px;
  height: 24px;
}

.PcPTEG_markSmall {
  flex: none;
  width: 20px;
  height: 20px;
}

.PcPTEG_brand, .PcPTEG_header, .PcPTEG_headerActions, .PcPTEG_actions, .PcPTEG_statusRow, .PcPTEG_caption {
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.PcPTEG_brand {
  font-size: 15px;
}

.PcPTEG_header {
  justify-content: space-between;
  margin-bottom: 12px;
}

.PcPTEG_headerActions {
  gap: 2px;
}

.PcPTEG_actions {
  flex-wrap: wrap;
}

.PcPTEG_iconButton {
  flex: none;
  width: 32px;
  min-width: 32px;
  height: 32px;
  padding: 0;
}

.PcPTEG_newChatButton {
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

.PcPTEG_newChatButton svg {
  width: 14px;
  height: 14px;
}

.PcPTEG_ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
}

.PcPTEG_statusRow {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  margin-bottom: 10px;
  padding: 4px 6px;
}

.PcPTEG_statusRow[data-recording] {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 19%,var(--dsw-alias-bg-module-platform));
}

.PcPTEG_statusRow[data-recording] .PcPTEG_voiceStatus > svg {
  color: var(--dsw-alias-brand-primary);
}

.PcPTEG_status {
  flex: 1;
  min-width: 0;
  margin: 0;
  font-size: 12px;
  line-height: 18px;
}

.PcPTEG_voiceTarget {
  flex: 1;
  align-items: center;
  gap: 4px;
  min-width: 0;
  line-height: 18px;
  display: flex;
}

.PcPTEG_voiceTarget > span, .PcPTEG_existingSessionHome > span {
  color: var(--dsw-alias-label-secondary);
  flex: none;
  font-size: 11px;
}

.PcPTEG_voiceTarget strong {
  font-size: 13px;
  font-weight: 600;
}

.PcPTEG_voiceStatus {
  align-items: center;
  gap: 4px;
  max-width: 47%;
  display: flex;
}

.PcPTEG_voiceStatus > svg {
  flex: none;
  width: 14px;
  height: 14px;
}

.PcPTEG_statusRow[data-bound] {
  flex-direction: column;
  align-items: stretch;
  gap: 0;
}

.PcPTEG_statusRow[data-bound] .PcPTEG_voiceStatus {
  max-width: 100%;
}

.PcPTEG_mainAction {
  width: 100%;
  min-height: 36px;
  font-weight: 500;
}

.PcPTEG_primary {
  color: var(--dsw-alias-label-primary) !important;
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 16%,var(--dsw-alias-bg-layer-2)) !important;
  border: 1px solid var(--dsw-alias-border-l2) !important;
}

.PcPTEG_bubble {
  corner-shape: round;
  cursor: grab;
  touch-action: none;
  width: 100%;
  max-width: 100%;
  height: 36px;
  animation: PcPTEG_whaleEnter var(--whale-duration) var(--whale-ease);
  border-radius: 999px;
  justify-content: flex-start;
  gap: 8px;
}

.PcPTEG_bubble .PcPTEG_ellipsis {
  text-align: left;
  flex: 1;
}

.PcPTEG_caption {
  text-align: left;
  justify-content: flex-start;
  width: 100%;
  margin-top: 8px;
  padding: 6px 0;
  font-size: 12px;
}

.PcPTEG_caption .PcPTEG_ellipsis {
  flex: 1;
}

.PcPTEG_openOriginal {
  flex: none;
}

.PcPTEG_hint, .PcPTEG_quickHint {
  color: var(--dsw-alias-label-secondary);
  overflow-wrap: anywhere;
  font-size: 12px;
}

.PcPTEG_hint {
  margin: 6px 0;
}

.PcPTEG_quickHint {
  margin: 0;
  font-size: 11px;
}

.PcPTEG_notice, .PcPTEG_note, .PcPTEG_error {
  border-radius: var(--dsw-radius-sm);
  overflow-wrap: anywhere;
  background: var(--dsw-alias-bg-module-platform);
  margin: 8px 0;
  padding: 8px 10px;
  font-size: 12px;
}

.PcPTEG_notice, .PcPTEG_note {
  border-left: 2px solid var(--dsw-alias-state-warn-primary);
}

.PcPTEG_error {
  border-left: 2px solid var(--dsw-alias-state-error-primary);
}

.PcPTEG_error button {
  margin-top: 8px;
}

.PcPTEG_popover {
  box-sizing: border-box;
  cursor: auto;
  touch-action: auto;
  width: 100%;
  animation: PcPTEG_whaleEnter var(--whale-duration) var(--whale-ease);
  margin: 0 0 10px;
  padding: 12px;
  position: relative;
  overflow: auto;
}

.PcPTEG_popoverHeader {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  display: flex;
}

.PcPTEG_popoverHeader > button {
  width: 28px;
  padding: 0;
}

.PcPTEG_quickConversation {
  max-height: 160px;
}

.PcPTEG_recentMessages {
  gap: 6px;
  display: grid;
}

.PcPTEG_message {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  padding: 5px 8px;
}

.PcPTEG_message strong {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

.PcPTEG_message p {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  margin: 3px 0 0;
}

.PcPTEG_quickActions {
  gap: 6px;
  min-width: 0;
  display: grid;
}

.PcPTEG_quickSpeed {
  gap: 5px;
  padding-top: 4px;
  display: grid;
}

.PcPTEG_quickSpeedHeader {
  color: var(--dsw-alias-label-secondary);
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  display: flex;
}

.PcPTEG_quickSpeedHeader small {
  font-size: 11px;
}

.PcPTEG_quickSegments {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  gap: 3px;
  padding: 3px;
  display: grid;
}

.PcPTEG_quickSegments button {
  min-width: 0;
  height: 28px;
  min-height: 28px;
  padding: 0 5px;
  font-size: 12px;
}

.PcPTEG_quickSegments button[aria-pressed="true"] {
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: 0 1px 3px #0001;
}

.PcPTEG_settings {
  height: 100%;
  min-height: 0;
  color: var(--dsw-alias-label-primary);
  flex-direction: column;
  display: flex;
  overflow: hidden;
}

.PcPTEG_settingsHeader {
  box-sizing: border-box;
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 4px 10px;
  display: flex;
}

.PcPTEG_settingsHeader h2 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.PcPTEG_settingsBrand {
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 6px;
  min-width: 0;
  display: flex;
}

.PcPTEG_backButton, .PcPTEG_guideButton {
  flex: none;
  padding: 0 8px;
  font-size: 12px;
}

.PcPTEG_backIcon {
  transform: rotate(180deg);
}

.PcPTEG_settingsLayout {
  flex: 1;
  grid-template-rows: minmax(0, 1fr);
  grid-template-columns: 104px minmax(0, 1fr);
  min-height: 0;
  display: grid;
  overflow: hidden;
}

.PcPTEG_settingsNav {
  border-right: 1px solid var(--dsw-alias-border-l2);
  background: var(--dsw-alias-bg-module-platform);
  flex-direction: column;
  gap: 3px;
  min-height: 0;
  padding: 8px 6px;
  display: flex;
  overflow-y: auto;
}

.PcPTEG_settingsNav button {
  justify-content: flex-start;
  min-width: 0;
  min-height: 34px;
  padding: 0 12px;
  font-size: 12px;
}

.PcPTEG_settingsNav button[aria-pressed="true"] {
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: inset 2px 0 0 var(--dsw-alias-brand-primary);
  font-weight: 600;
}

.PcPTEG_settingsPage {
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  display: flex;
  overflow: hidden;
}

.PcPTEG_pageHeading {
  flex: none;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 10px 12px 8px;
  display: flex;
}

.PcPTEG_pageHeading h3 {
  margin: 0;
  font-size: 15px;
}

.PcPTEG_pageHeading p {
  color: var(--dsw-alias-label-secondary);
  margin: 3px 0 0;
  font-size: 12px;
}

.PcPTEG_settingsBody {
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

.PcPTEG_settingsBody > .PcPTEG_section, .PcPTEG_settingsBody > div > .PcPTEG_section {
  margin: 0 0 12px;
}

.PcPTEG_section {
  align-content: start;
  gap: 8px;
  min-width: 0;
  display: grid;
}

.PcPTEG_section h3 {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
}

.PcPTEG_section p, .PcPTEG_section > .PcPTEG_section {
  margin: 0;
}

.PcPTEG_settingsBody > .PcPTEG_section + .PcPTEG_section {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

.PcPTEG_section summary {
  cursor: pointer;
  padding: 7px 0;
  font-size: 13px;
  font-weight: 500;
}

details.PcPTEG_section {
  border-top: 1px solid var(--dsw-alias-border-l2);
  display: block;
}

details.PcPTEG_section > :not(summary) {
  margin-top: 10px;
}

.PcPTEG_field {
  gap: 6px;
  font-size: 12px;
  display: grid;
}

.PcPTEG_field input {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}

.PcPTEG_deviceSelect {
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

.PcPTEG_radios {
  border: 0;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
  margin: 0;
  padding: 0;
  display: flex;
}

.PcPTEG_radios legend {
  margin-bottom: 6px;
  font-size: 12px;
}

.PcPTEG_radios label {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  cursor: pointer;
  align-items: center;
  gap: 6px;
  padding: 6px 9px;
  font-size: 12px;
  display: flex;
}

.PcPTEG_radios input {
  accent-color: var(--dsw-alias-brand-primary);
}

.PcPTEG_bindingEditor {
  gap: 14px;
  display: grid;
}

.PcPTEG_keyBinding {
  gap: 6px;
  display: grid;
}

.PcPTEG_keyBinding > :is(h3, p) {
  margin: 0;
}

.PcPTEG_keyBindingRow {
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 12px;
  min-width: 0;
  display: flex;
}

.PcPTEG_keyBindingRow > span {
  overflow-wrap: anywhere;
  min-width: 5em;
  font-size: 13px;
}

.PcPTEG_mouseBinding legend {
  font-size: 14px;
  font-weight: 600;
}

.PcPTEG_mouseBinding label {
  white-space: nowrap;
}

.PcPTEG_bindingActions {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

.PcPTEG_segmented {
  flex-wrap: wrap;
  gap: 4px;
  display: flex;
}

.PcPTEG_segmented button {
  min-width: 0;
  font-size: 12px;
}

.PcPTEG_segmented button[aria-pressed="true"], .PcPTEG_modelNav button[aria-pressed="true"] {
  background: var(--dsw-alias-interactive-bg-active);
  color: var(--dsw-alias-label-primary);
  box-shadow: inset 0 -2px 0 var(--dsw-alias-brand-primary);
}

.PcPTEG_modelNav {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  gap: 4px;
  margin-bottom: 12px;
  padding: 0 16px 10px;
  display: flex;
}

.PcPTEG_modelNav button {
  flex: 1;
  min-width: 0;
  padding: 0 6px;
  font-size: 12px;
}

.PcPTEG_sliderLabel {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  display: flex;
}

.PcPTEG_sliderLabel span {
  margin-left: auto;
}

.PcPTEG_sliderLabel input {
  width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
}

.PcPTEG_formActions {
  padding-top: 4px;
}

.PcPTEG_formActions button {
  min-width: 100px;
}

.PcPTEG_editNotice {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 8px;
  display: flex;
}

.PcPTEG_editNotice div {
  flex: 1;
  min-width: 0;
}

.PcPTEG_editNotice strong {
  font-size: 12px;
}

.PcPTEG_editNotice p {
  color: var(--dsw-alias-label-secondary);
  margin: 3px 0 0;
  font-size: 12px;
}

.PcPTEG_editNotice button {
  flex: none;
  font-size: 12px;
}

.PcPTEG_details {
  grid-template-columns: auto minmax(0, 1fr);
  gap: 6px 12px;
  margin: 0;
  font-size: 12px;
  display: grid;
}

.PcPTEG_details dt {
  color: var(--dsw-alias-label-secondary);
}

.PcPTEG_details dd {
  overflow-wrap: anywhere;
  margin: 0;
}

.PcPTEG_capabilityRow {
  display: contents;
}

.PcPTEG_requestDetails {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  max-height: 200px;
  padding: 8px;
  font-size: 11px;
  overflow: auto;
}

.PcPTEG_placeholder {
  text-align: center;
  min-height: 140px;
  color: var(--dsw-alias-label-secondary);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  display: flex;
}

.PcPTEG_placeholder h3, .PcPTEG_placeholder p {
  margin: 0;
}

.PcPTEG_placeholder svg {
  width: 32px;
  height: 32px;
}

.PcPTEG_motionPreview {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  width: 40px;
  height: 32px;
  animation: PcPTEG_whalePreview var(--whale-duration) var(--whale-ease);
  place-items: center;
  display: grid;
}

.PcPTEG_settings a {
  color: var(--dsw-alias-link);
  text-underline-offset: 2px;
  overflow-wrap: anywhere;
}

.PcPTEG_updateDialog {
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

.PcPTEG_updateDialog::backdrop {
  background: #0005;
}

.PcPTEG_updateHeader {
  align-items: center;
  gap: 8px;
  display: flex;
}

.PcPTEG_updateHeader h2 {
  margin: 0;
  font-size: 16px;
}

.PcPTEG_updateAnnouncement {
  white-space: pre-line;
  overflow-wrap: anywhere;
}

.PcPTEG_updateDialog .PcPTEG_actions {
  margin-top: 12px;
}

.PcPTEG_updateDialog a {
  color: var(--dsw-alias-link);
  text-underline-offset: 2px;
}

.PcPTEG_authorization {
  height: auto;
  max-height: min(var(--whale-content-limit, 60vh),var(--whale-visible-content, 60vh));
}

.PcPTEG_authorization .PcPTEG_settingsHeader {
  min-height: 42px;
  padding: 0 0 10px;
}

.PcPTEG_authorization .PcPTEG_settingsHeader h2 {
  flex: 1;
  font-size: 16px;
}

.PcPTEG_authorizationBody {
  overscroll-behavior: contain;
  flex: 1;
  min-height: 0;
  padding-right: 6px;
  overflow-y: auto;
}

.PcPTEG_authorizationActions {
  border-top: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  padding: 10px 0 0;
}

.PcPTEG_authorizationBody > [data-whale-natural-content] {
  display: flow-root;
}

.PcPTEG_permissionList {
  gap: 0;
  margin: 12px 0;
  padding: 0;
  list-style: none;
  display: grid;
}

.PcPTEG_permissionList li {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  padding: 10px 0;
}

.PcPTEG_permissionList p {
  margin: 3px 0 0;
}

.PcPTEG_permissionList strong {
  font-size: 13px;
}

.PcPTEG_sessionTitle {
  overflow-wrap: anywhere;
}

.PcPTEG_sessionRename {
  gap: 6px;
  margin-top: 8px;
  display: grid;
}

.PcPTEG_existingSessionHome {
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

.PcPTEG_existingSessionHome svg {
  flex: none;
  width: 12px;
  height: 12px;
}

.PcPTEG_existingSessionHome:disabled {
  opacity: 1;
  box-shadow: none;
  cursor: default;
}

.PcPTEG_existingSessionHome:disabled > svg {
  visibility: hidden;
}

.PcPTEG_currentDshTarget {
  gap: 4px;
  min-width: 0;
  display: grid;
}

.PcPTEG_currentDshAction {
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

.PcPTEG_currentDshAction > :first-child {
  white-space: nowrap;
  flex: none;
}

.PcPTEG_currentDshAction > :last-child {
  min-width: 0;
  color: var(--dsw-alias-label-secondary);
  text-align: right;
}

.PcPTEG_currentDshTarget > p {
  margin: 0;
}

.PcPTEG_inputCaptions {
  overscroll-behavior: contain;
  min-width: 0;
  max-height: 168px;
  margin: 0;
  padding: 0 6px;
  list-style: none;
  overflow: auto;
}

.PcPTEG_inputCaption {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 6px;
  padding: 4px 0;
  display: grid;
}

.PcPTEG_inputCaption + .PcPTEG_inputCaption {
  border-top: 1px solid var(--dsw-alias-border-l2);
}

.PcPTEG_inputCaption p {
  margin: 0;
}

.PcPTEG_inputCaptionText {
  overflow-wrap: anywhere;
  white-space: pre-wrap;
  user-select: text;
  font-size: 13px;
  line-height: 18px;
}

.PcPTEG_inputCaptionReceipt {
  color: var(--dsw-alias-label-secondary);
  align-items: baseline;
  gap: 4px;
  font-size: 11px;
  line-height: 16px;
  display: flex;
}

.PcPTEG_inputCaptionReceipt > :first-child {
  flex: none;
}

.PcPTEG_inputCaption button {
  height: 26px;
  min-height: 26px;
  padding: 0 6px;
  font-size: 12px;
}

.PcPTEG_existingSessionTarget > p {
  margin: 4px 0;
}

.PcPTEG_existingSessionPicker {
  gap: 8px;
  min-width: 0;
  margin-top: 10px;
  display: grid;
}

.PcPTEG_existingSessionSearch {
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 6px;
  display: grid;
}

.PcPTEG_existingSessionSearch input::placeholder {
  color: var(--dsw-alias-label-secondary);
  opacity: 1;
}

.PcPTEG_existingSessionList {
  max-height: clamp(96px, 26vh, 224px);
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: auto;
}

.PcPTEG_existingSessionList li {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
}

.PcPTEG_existingSessionList label {
  cursor: pointer;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: start;
  gap: 6px;
  padding: 6px 4px;
  display: grid;
}

.PcPTEG_existingSessionList label:has(input:disabled) {
  cursor: default;
}

.PcPTEG_existingSessionList label:has(input:checked) {
  background: var(--dsw-alias-interactive-bg-active);
}

.PcPTEG_existingSessionList input {
  accent-color: var(--dsw-alias-brand-primary);
  margin-top: 3px;
}

.PcPTEG_existingSessionList label span.PcPTEG_hint {
  overflow-wrap: anywhere;
  margin: 3px 0 0;
  display: block;
}

.PcPTEG_performanceChoice {
  line-height: 1.1;
}

.PcPTEG_performanceChoice small {
  white-space: nowrap;
  font-size: .85em;
}

.PcPTEG_floating [data-whale-setup] {
  min-height: 0;
}

.PcPTEG_floating :is(button, input, select, textarea, summary, a) {
  touch-action: manipulation;
}

.PcPTEG_floating button {
  transition: background-color .12s, color .12s;
}

.PcPTEG_floating :is(button, input, select, summary, a):focus-visible, .PcPTEG_floating:focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

.PcPTEG_spin {
  animation: .7s linear infinite PcPTEG_whaleSpin;
}

.PcPTEG_mark[data-state="authorized"], .PcPTEG_markSmall[data-state="authorized"] {
  color: var(--dsw-alias-brand-primary);
}

.PcPTEG_mark[data-state="unknown"], .PcPTEG_markSmall[data-state="unknown"] {
  color: var(--dsw-alias-state-warn-primary);
}

.PcPTEG_mark[data-state="input-active"], .PcPTEG_markSmall[data-state="input-active"] {
  color: var(--dsw-alias-brand-primary);
  animation: 1.35s ease-in-out infinite PcPTEG_whaleBreathe;
}

.PcPTEG_mark[data-state="pending"], .PcPTEG_markSmall[data-state="pending"] {
  color: var(--dsw-alias-label-secondary);
}

[data-motion="firm"].PcPTEG_floating {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="off"].PcPTEG_floating, [data-motion="off"].PcPTEG_floating * {
  transition: none !important;
  animation: none !important;
}

@keyframes PcPTEG_whaleEnter {
  from {
    opacity: .4;
    transform: translateY(3px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes PcPTEG_whalePreview {
  from {
    transform: scale(.88);
  }

  to {
    transform: scale(1);
  }
}

@keyframes PcPTEG_whaleSpin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes PcPTEG_whaleBreathe {
  0%, 100% {
    opacity: .65;
  }

  50% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .PcPTEG_floating, .PcPTEG_floating * {
    transition: none !important;
    animation: none !important;
  }
}

@media (width <= 520px), (height <= 560px) {
  .PcPTEG_settingsLayout {
    grid-template-rows: auto minmax(0, 1fr);
    grid-template-columns: minmax(0, 1fr);
  }

  .PcPTEG_settingsNav {
    border-right: 0;
    border-bottom: 1px solid var(--dsw-alias-border-l2);
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 2px;
    padding: 5px 8px;
    display: grid;
    overflow: hidden;
  }

  .PcPTEG_settingsNav button {
    justify-content: center;
    height: 30px;
    min-height: 30px;
    padding: 0 2px;
  }

  .PcPTEG_settingsNav button[aria-pressed="true"] {
    box-shadow: inset 0 -2px 0 var(--dsw-alias-brand-primary);
  }

  .PcPTEG_settingsHeader {
    gap: 3px;
    min-height: 44px;
    padding: 5px 8px;
  }

  .PcPTEG_backButton, .PcPTEG_guideButton {
    padding: 0 5px;
  }

  .PcPTEG_settingsBrand {
    gap: 4px;
  }

  .PcPTEG_settingsBrand .PcPTEG_markSmall {
    display: none;
  }

  .PcPTEG_pageHeading {
    padding: 10px 12px 8px;
  }

  .PcPTEG_pageHeading p {
    display: none;
  }

  .PcPTEG_settingsBody {
    padding: 4px 12px 12px;
  }

  .PcPTEG_modelNav {
    margin-bottom: 8px;
    padding: 0 10px 7px;
  }

  .PcPTEG_editNotice {
    flex-wrap: wrap;
  }

  .PcPTEG_editNotice button {
    width: 100%;
  }
}

@media (height <= 420px) {
  .PcPTEG_settingsHeader {
    height: 36px;
    min-height: 36px;
    padding: 2px 8px;
  }

  .PcPTEG_settingsHeader button {
    height: 30px;
    min-height: 30px;
  }

  .PcPTEG_settingsNav {
    padding: 2px 8px;
  }

  .PcPTEG_settingsNav button {
    height: 28px;
    min-height: 28px;
  }

  .PcPTEG_pageHeading {
    box-sizing: border-box;
    min-height: 32px;
    padding: 2px 12px;
  }

  .PcPTEG_pageHeading .PcPTEG_iconButton {
    width: 28px;
    min-width: 28px;
    height: 28px;
  }

  .PcPTEG_modelNav {
    margin-bottom: 4px;
    padding: 0 10px 3px;
  }

  .PcPTEG_modelNav button {
    height: 28px;
    min-height: 28px;
  }
}

@media (pointer: coarse) {
  .PcPTEG_field input, .PcPTEG_deviceSelect {
    font-size: 16px;
  }
}

@media (forced-colors: active) {
  .PcPTEG_floating, .PcPTEG_popover {
    outline: 1px solid canvastext;
  }

  .PcPTEG_settingsNav button[aria-pressed="true"], .PcPTEG_modelNav button[aria-pressed="true"] {
    outline: 2px solid highlight;
  }
}

.PcPTEG_floating[data-view="home"] .PcPTEG_panelViewport, .PcPTEG_floating[data-collapsed] .PcPTEG_panelViewport {
  overflow: hidden;
}

.PcPTEG_floating[data-view="home"]:not([data-collapsed]) {
  padding: 10px;
}

.PcPTEG_panelContent {
  flex-direction: column;
  gap: 4px;
  height: 100%;
  min-height: 0;
  display: flex;
}

.PcPTEG_panelContent > :not(.PcPTEG_quickConversation) {
  flex: none;
}

.PcPTEG_panelContent > .PcPTEG_homeTargetPicker {
  flex: 1 1 0;
  min-height: 0;
  padding: 2px;
  display: flex;
}

.PcPTEG_homeTargetPicker > .PcPTEG_existingSessionPicker {
  flex-direction: column;
  flex: 1;
  margin-top: 0;
  display: flex;
}

.PcPTEG_homeTargetPicker .PcPTEG_existingSessionList {
  overscroll-behavior: contain;
  flex: auto;
  min-height: 0;
  max-height: none;
}

.PcPTEG_homeTargetRow {
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

.PcPTEG_homeTargetRow:disabled {
  opacity: 1;
  cursor: default;
  color: var(--dsw-alias-label-secondary);
}

.PcPTEG_homeTargetRow .PcPTEG_hint {
  overflow-wrap: anywhere;
}

.PcPTEG_homeTargetPicker :is(.PcPTEG_existingSessionSearch, .PcPTEG_actions) {
  flex: none;
}

.PcPTEG_homeTargetPicker .PcPTEG_actions {
  margin-top: auto;
}

.PcPTEG_homeTargetPicker .PcPTEG_hint {
  margin: 0;
}

.PcPTEG_panelContent > .PcPTEG_header {
  height: 28px;
  min-height: 28px;
  margin: 0;
}

.PcPTEG_panelContent .PcPTEG_header .PcPTEG_iconButton {
  width: 28px;
  min-width: 28px;
  height: 28px;
}

.PcPTEG_panelContent > .PcPTEG_statusRow {
  box-sizing: border-box;
  min-height: 24px;
  margin: 0;
  padding: 2px 6px;
}

.PcPTEG_panelContent > .PcPTEG_hint {
  margin: 0;
  font-size: 12px;
  line-height: 18px;
}

.PcPTEG_panelContent > .PcPTEG_error {
  margin: 0;
  padding: 4px 8px;
  line-height: 18px;
}

.PcPTEG_panelContent .PcPTEG_quickSpeed {
  gap: 3px;
  padding-top: 0;
}

.PcPTEG_panelContent .PcPTEG_quickSpeedHeader {
  line-height: 18px;
}

.PcPTEG_panelContent .PcPTEG_quickHint {
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 16px;
  overflow: hidden;
}

.PcPTEG_panelContent .PcPTEG_quickHint p {
  text-overflow: ellipsis;
  margin: 0;
  line-height: 16px;
  overflow: hidden;
}

.PcPTEG_panelContent > .PcPTEG_caption {
  box-sizing: border-box;
  height: 30px;
  min-height: 30px;
  margin: 0;
  padding: 4px 8px;
  line-height: 18px;
}

.PcPTEG_panelContent > .PcPTEG_quickConversation {
  flex-direction: column;
  flex: 1 1 0;
  min-height: 0;
  max-height: none;
  margin: 0;
  padding: 8px;
  display: flex;
  overflow: hidden;
}

.PcPTEG_quickConversation .PcPTEG_popoverHeader {
  flex: none;
  min-height: 28px;
  margin-bottom: 6px;
}

.PcPTEG_quickConversation .PcPTEG_recentMessages {
  overscroll-behavior: contain;
  min-height: 0;
  overflow-y: auto;
}

.PcPTEG_floating[data-compact-height="true"] .PcPTEG_panelContent {
  gap: 2px;
}

.PcPTEG_floating[data-compact-height="true"] :is(.PcPTEG_voiceTarget, .PcPTEG_existingSessionHome) > span {
  font-size: 10px;
}

.PcPTEG_floating[data-compact-height="true"] .PcPTEG_voiceTarget strong {
  font-size: 12px;
}

.PcPTEG_floating[data-compact-height="true"] .PcPTEG_statusRow[data-bound] .PcPTEG_status {
  line-height: 16px;
}

.PcPTEG_floating[data-compact-height="true"] .PcPTEG_existingSessionHome {
  height: 20px;
  min-height: 20px;
}

.PcPTEG_floating[data-compact-height="true"] .PcPTEG_inputCaptions {
  max-height: max(42px,calc(var(--whale-content-limit) - 137px));
}

.PcPTEG_floating[data-compact-height="true"] [data-has-input-caption] > .PcPTEG_audioDevices, .PcPTEG_floating[data-compact-height="true"] .PcPTEG_panelContent:has(.PcPTEG_currentDshTarget) > :is(.PcPTEG_audioDevices, .PcPTEG_quickSpeed), .PcPTEG_floating[data-compact-height="true"] .PcPTEG_panelContent > .PcPTEG_hint:not([data-home-important]), .PcPTEG_floating[data-compact-height="true"] .PcPTEG_panelContent .PcPTEG_quickSpeedHeader, .PcPTEG_floating[data-compact-height="true"] .PcPTEG_panelContent .PcPTEG_quickHint {
  display: none;
}

.PcPTEG_floating[data-compact-height="true"] .PcPTEG_quickActions {
  grid-template-columns: minmax(65px, .9fr) minmax(0, 2.1fr);
  align-items: center;
  gap: 4px;
}

.PcPTEG_floating[data-compact-height="true"] .PcPTEG_quickActions .PcPTEG_mainAction {
  white-space: normal;
  height: 30px;
  min-height: 30px;
  padding-inline: 4px;
  font-size: 12px;
  line-height: 1.15;
}

.PcPTEG_floating[data-compact-height="true"] .PcPTEG_quickActions .PcPTEG_quickSegments {
  padding: 2px;
}

.PcPTEG_floating[data-compact-height="true"] .PcPTEG_quickActions .PcPTEG_quickSegments button {
  white-space: nowrap;
  padding-inline: 1px;
  font-size: 11px;
}

.PcPTEG_floating[data-compact-height="true"] .PcPTEG_panelContent[data-size-detail="true"] > .PcPTEG_quickSpeed {
  display: none;
}

.PcPTEG_settingsBody {
  container-type: inline-size;
}

.PcPTEG_section > button {
  justify-self: start;
  max-width: 100%;
}

.PcPTEG_settingsBody button {
  white-space: normal;
  overflow-wrap: anywhere;
  height: auto;
  min-height: 36px;
}

.PcPTEG_settingsBody :is(.PcPTEG_actions, .PcPTEG_segmented, .PcPTEG_formActions) > button {
  flex: 0 auto;
}

.PcPTEG_inlineActions, .PcPTEG_inlineField, .PcPTEG_volumeRow, .PcPTEG_volumeControl {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.PcPTEG_inlineField {
  font-size: 12px;
}

.PcPTEG_inlineField .PcPTEG_deviceSelect {
  text-overflow: ellipsis;
  flex: 0 180px;
  width: 180px;
  max-width: 100%;
}

.PcPTEG_inlineField input[type="number"] {
  width: 80px;
}

.PcPTEG_fullName {
  color: var(--dsw-alias-label-secondary);
  min-width: 0;
  font-size: 12px;
}

.PcPTEG_fullName summary {
  padding: 2px 0;
  font-size: 12px;
  font-weight: 400;
}

.PcPTEG_fullName p {
  overflow-wrap: anywhere;
  margin-top: 4px;
}

.PcPTEG_disclosureRow {
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 8px;
  display: flex;
}

.PcPTEG_disclosureRow > details.PcPTEG_section {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  flex: 0 auto;
  min-width: 0;
  padding: 0 10px;
}

.PcPTEG_disclosureRow > details.PcPTEG_section > summary {
  min-height: 20px;
  padding: 7px 0;
}

.PcPTEG_disclosureRow > details[open].PcPTEG_section {
  flex: 100%;
  padding-bottom: 10px;
}

.PcPTEG_volumeControl {
  flex-wrap: nowrap;
  flex: 0 260px;
}

.PcPTEG_volumeControl input[type="range"] {
  width: 210px;
  min-width: 80px;
  max-width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
  flex: 210px;
}

.PcPTEG_volumeControl span {
  text-align: right;
  flex: none;
  min-width: 3em;
  font-size: 12px;
}

.PcPTEG_field:has( > input[type="number"]) {
  flex-wrap: wrap;
  align-items: center;
  display: flex;
}

.PcPTEG_field > input[type="number"] {
  width: 80px;
}

.PcPTEG_authorizationSteps {
  color: var(--dsw-alias-label-secondary);
  margin: 8px 0 12px;
  font-size: 12px;
}

.PcPTEG_agreement {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  gap: 14px;
  padding: 14px;
  font-size: 13px;
  line-height: 1.6;
  display: grid;
}

.PcPTEG_agreement p {
  margin: 0;
}

.PcPTEG_authorizationBody h3 {
  margin: 0 0 10px;
  font-size: 15px;
}

.PcPTEG_authorizationActions button {
  flex: 0 auto;
  min-height: 36px;
}

@container (width <= 340px) {
  .PcPTEG_inlineActions {
    align-items: flex-start;
  }

  .PcPTEG_inlineField .PcPTEG_deviceSelect {
    flex-basis: 160px;
    width: 160px;
  }

  .PcPTEG_volumeControl {
    flex-basis: 200px;
  }

  .PcPTEG_volumeControl input[type="range"] {
    width: 150px;
  }
}

.PcPTEG_audioDevices {
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  display: flex;
}

.PcPTEG_audioDeviceGrid {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 8px;
  display: grid;
}

.PcPTEG_audioDeviceField {
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  font-size: 12px;
  display: flex;
}

.PcPTEG_audioDeviceField > span {
  align-items: center;
  gap: 4px;
  line-height: 18px;
  display: flex;
}

.PcPTEG_audioDeviceField svg {
  flex: none;
  width: 14px;
  height: 14px;
}

.PcPTEG_audioDeviceField select {
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

.PcPTEG_audioDeviceField select[data-device-missing] {
  border-color: #b80;
}

.PcPTEG_audioDeviceHint, .PcPTEG_audioDeviceNotice {
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  font-size: 11px;
  line-height: 16px;
  overflow: hidden;
}

.PcPTEG_audioDeviceHint {
  color: var(--dsw-alias-label-secondary);
}

.PcPTEG_audioDeviceNotice {
  color: #805500;
}

[data-ds-dark-theme] .PcPTEG_audioDeviceNotice {
  color: #ffd277;
}

[data-ds-dark-theme] .PcPTEG_audioDeviceField select {
  color-scheme: dark;
}

.PcPTEG_floating[data-compact-height="true"] .PcPTEG_audioDeviceField > span {
  font-size: 11px;
  line-height: 14px;
}

.PcPTEG_floating[data-compact-height="true"] .PcPTEG_audioDeviceField select {
  height: 26px;
}

.PcPTEG_floating[data-compact-height="true"] .PcPTEG_audioDeviceHint, .PcPTEG_floating[data-compact-height="true"] .PcPTEG_audioDeviceNotice, .PcPTEG_floating[data-compact-height="true"] .PcPTEG_panelContent:has( > [data-home-important]) .PcPTEG_audioDeviceField > span {
  display: none;
}

.PcPTEG_pageHeading.PcPTEG_modelHeading {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  justify-content: flex-start;
  gap: 10px;
  min-height: 40px;
  margin-bottom: 6px;
  padding: 5px 12px;
}

.PcPTEG_modelHeading h3 {
  white-space: nowrap;
  font-size: 13px;
}

.PcPTEG_modelHeading .PcPTEG_modelNav {
  border: 0;
  flex: 1;
  gap: 3px;
  min-width: 0;
  margin: 0;
  padding: 0;
}

.PcPTEG_modelHeading .PcPTEG_modelNav button {
  white-space: nowrap;
  flex: 0 auto;
  height: 28px;
  min-height: 28px;
  padding: 0 6px;
}

.PcPTEG_currentModel {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  display: flex;
}

.PcPTEG_pathRow {
  grid-template-columns: 95px minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  font-size: 12px;
  display: grid;
}

.PcPTEG_pathRow > span {
  min-width: 0;
}

.PcPTEG_editNotice {
  margin-bottom: 7px;
  padding: 5px 8px;
}

.PcPTEG_editNotice span {
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
}

.PcPTEG_editNotice button {
  height: auto;
  min-height: 30px;
}

@media (width <= 360px) {
  .PcPTEG_pageHeading.PcPTEG_modelHeading {
    gap: 5px;
    padding: 5px 8px;
  }

  .PcPTEG_modelHeading .PcPTEG_modelNav button {
    padding: 0 3px;
    font-size: 11px;
  }

  .PcPTEG_pathRow {
    grid-template-columns: minmax(0, 1fr);
    gap: 4px;
  }
}

.PcPTEG_pathRow {
  display: block;
}

.PcPTEG_pathRow > div:first-child {
  flex-wrap: nowrap !important;
}

.PcPTEG_pathRow > div:first-child > label {
  flex: 1;
  grid-template-columns: 95px minmax(0, 1fr);
  display: grid !important;
}

.PcPTEG_pathRow input {
  width: 100% !important;
}

.PcPTEG_pathRow button {
  flex: none;
  min-height: 32px;
}

@media (width <= 420px) {
  .PcPTEG_pathRow > div:first-child {
    flex-wrap: wrap !important;
  }

  .PcPTEG_pathRow > div:first-child > label {
    grid-template-columns: 80px minmax(0, 1fr);
    min-width: 180px !important;
  }
}

.PcPTEG_floating :is(button, select, input, textarea, summary, a), .PcPTEG_settings :is(button, select, input, summary, a) {
  transition: background-color .12s ease-out,border-color .12s ease-out,color .12s ease-out,box-shadow .12s ease-out,transform var(--whale-duration, .2s) var(--whale-ease, ease-out);
}

.PcPTEG_floating :is(button, summary):hover:not(:disabled) {
  background-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,var(--dsw-alias-bg-layer-1));
}

.PcPTEG_floating button:active:not(:disabled), .PcPTEG_settings button:active:not(:disabled) {
  transform: scale(.97);
}

.PcPTEG_floating :is(input, select, textarea):hover:not(:disabled) {
  border-color: var(--dsw-alias-brand-primary);
}

.PcPTEG_radios label {
  transition: background-color .12s, border-color .12s, box-shadow .12s;
}

.PcPTEG_radios label:has(input:checked) {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,transparent);
}

.PcPTEG_authorizationBody, .PcPTEG_settingsLayout, .PcPTEG_panelContent > .PcPTEG_header, .PcPTEG_settingsBody > div:not([hidden]), .PcPTEG_section > div:not([hidden])[data-whale-tab-panel], .PcPTEG_floating [role="tabpanel"]:not([hidden]) {
  animation: PcPTEG_whalePageEnter var(--whale-duration, .2s) ease-out;
}

.PcPTEG_floating :is([role="menu"], [role="listbox"]), .PcPTEG_floating [data-whale-dropdown] {
  transform-origin: top;
  animation: .12s ease-out PcPTEG_whalePageEnter;
}

.PcPTEG_floating [data-whale-save-result] {
  animation: .16s ease-out PcPTEG_whaleFeedback;
}

.PcPTEG_floating summary {
  list-style: none;
}

.PcPTEG_floating summary::-webkit-details-marker {
  display: none;
}

.PcPTEG_floating summary:before {
  content: "\u203A";
  width: 1em;
  transition: transform .16s ease-out;
  display: inline-block;
  transform: rotate(0);
}

.PcPTEG_floating details[open] > summary:before {
  transform: rotate(90deg);
}

.PcPTEG_floating details[open] > :not(summary) {
  animation: .16s ease-out PcPTEG_whalePageEnter;
}

@supports (interpolate-size: allow-keywords) {
  .PcPTEG_floating details {
    interpolate-size: allow-keywords;
  }

  .PcPTEG_floating details::details-content {
    block-size: 0;
    transition: block-size .16s ease-out,content-visibility .16s allow-discrete;
    overflow: clip;
  }

  .PcPTEG_floating details[open]::details-content {
    block-size: auto;
  }
}

@keyframes PcPTEG_whalePageEnter {
  from {
    translate: 0 4px;
  }

  to {
    translate: 0;
  }
}

@keyframes PcPTEG_whaleFeedback {
  from {
    opacity: .5;
  }

  to {
    opacity: 1;
  }
}

[data-motion="firm"].PcPTEG_floating, [data-motion="firm"].PcPTEG_settings {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="firm"].PcPTEG_floating details::details-content, [data-motion="firm"].PcPTEG_floating summary:before {
  transition-duration: .1s;
}

[data-motion="off"].PcPTEG_floating *, [data-motion="off"].PcPTEG_settings *, [data-motion="off"].PcPTEG_floating :before, [data-motion="off"].PcPTEG_floating details::details-content {
  transition: none !important;
  animation: none !important;
}

[data-motion="off"].PcPTEG_floating button:active, [data-motion="off"].PcPTEG_settings button:active {
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .PcPTEG_floating *, .PcPTEG_settings *, .PcPTEG_floating :before, .PcPTEG_floating details::details-content {
    transition: none !important;
    animation: none !important;
  }

  .PcPTEG_floating button:active, .PcPTEG_settings button:active {
    transform: none;
  }
}

.PcPTEG_conversationChoice {
  gap: 6px;
  min-width: 0;
  display: grid;
  position: relative;
}

.PcPTEG_conversationChoice > button {
  text-align: left;
  justify-content: space-between;
  width: 100%;
  min-width: 0;
}

.PcPTEG_conversationOptions {
  overscroll-behavior: contain;
  gap: 3px;
  min-width: 0;
  max-height: 220px;
  padding: 6px;
  animation: .12s ease-out PcPTEG_whalePageEnter;
  display: grid;
  overflow: auto;
}

.PcPTEG_conversationOptions [role="option"] {
  text-align: left;
  border-radius: var(--dsw-radius-sm);
  justify-content: space-between;
  width: 100%;
  min-width: 0;
  padding: 7px 10px;
  transition: background-color .12s ease-out, color .12s ease-out;
}

.PcPTEG_conversationOptions [role="option"][aria-selected="true"] {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 18%,var(--dsw-alias-bg-layer-1));
  font-weight: 600;
}

.PcPTEG_conversationOptions [role="option"]:is(:hover, :focus-visible) {
  background: var(--dsw-alias-interactive-bg-active);
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: -2px;
}

.PcPTEG_conversationOptions [role="option"] small {
  color: var(--dsw-alias-label-secondary);
}

.PcPTEG_settings [data-whale-tab-panel]:not([hidden]) {
  animation: PcPTEG_whalePageEnter var(--whale-duration, .2s) ease-out;
}

.PcPTEG_modelHeading .PcPTEG_modelNav {
  scrollbar-width: thin;
  overflow-x: auto;
}

.PcPTEG_modelHeading .PcPTEG_modelNav button {
  flex-shrink: 0;
}

[data-motion="off"].PcPTEG_settings [data-whale-tab-panel] {
  animation: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .PcPTEG_settings [data-whale-tab-panel] {
    animation: none !important;
  }
}

.PcPTEG_panelContent, .PcPTEG_bubble {
  animation: none;
}

.PcPTEG_panelContent {
  height: auto;
}

.PcPTEG_panelContent[data-size-detail="true"] {
  height: 100%;
}

.PcPTEG_panelContent .PcPTEG_quickSegments {
  background: none;
  gap: 6px;
  padding: 0;
}

.PcPTEG_panelContent .PcPTEG_quickSegments button {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 8px;
  gap: 4px;
  height: 34px;
  min-height: 34px;
}

.PcPTEG_panelContent .PcPTEG_quickSegments button[aria-pressed="true"] {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 22%,var(--dsw-alias-bg-layer-1));
  box-shadow: inset 0 0 0 1px var(--dsw-alias-brand-primary);
}

.PcPTEG_panelContent .PcPTEG_quickSegments svg {
  width: 15px;
  height: 15px;
}

.PcPTEG_panelContent > .PcPTEG_quickConversation {
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

.PcPTEG_conversationHeader {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  font-size: 12px;
  display: flex;
}

.PcPTEG_conversationHeader > div {
  align-items: center;
  gap: 2px;
  display: flex;
}

.PcPTEG_conversationHeader button:not(.PcPTEG_iconButton), .PcPTEG_assistantName, .PcPTEG_loadHistory {
  color: inherit;
  font: inherit;
  cursor: pointer;
  background: none;
  border: 0;
  border-radius: 4px;
  padding: 3px;
}

.PcPTEG_conversationHeader .PcPTEG_iconButton {
  width: 26px;
  min-width: 26px;
  height: 28px;
}

.PcPTEG_historyScope {
  color: var(--dsw-alias-label-secondary);
  flex: none;
  margin: 2px 0;
  font-size: 10px;
  line-height: 14px;
}

.PcPTEG_quickConversation .PcPTEG_recentMessages {
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

.PcPTEG_message {
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

.PcPTEG_message[data-role="user"] {
  align-self: flex-end;
  align-items: flex-end;
}

.PcPTEG_messageName {
  min-height: 19px;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  line-height: 17px;
}

.PcPTEG_assistantName {
  overflow-wrap: anywhere;
  max-width: 100%;
  min-height: 19px;
  padding: 0 2px;
  font-size: 11px;
  line-height: 17px;
}

.PcPTEG_assistantName:hover {
  color: var(--dsw-alias-label-primary);
  text-underline-offset: 3px;
  text-decoration: underline;
}

.PcPTEG_assistantNameInput {
  box-sizing: border-box;
  width: 140px;
  min-width: 60px;
  max-width: 160px;
  height: 23px !important;
  min-height: 23px !important;
  padding: 1px 5px !important;
  font-size: 12px !important;
}

.PcPTEG_message p {
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

.PcPTEG_message[data-role="user"] p {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 28%,var(--dsw-alias-bg-layer-1));
  border-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 45%,var(--dsw-alias-border-l2));
}

.PcPTEG_message small {
  color: var(--dsw-alias-label-secondary);
  font-size: 10px;
}

.PcPTEG_loadHistory {
  align-self: center;
  padding: 5px;
  font-size: 11px;
}

.PcPTEG_newMessages {
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

.PcPTEG_bubble {
  gap: 6px;
  padding: 0 7px;
  font-size: 11px;
}

.PcPTEG_bubbleBrand {
  flex: none;
  font-size: 12px;
  font-weight: 600;
}

.PcPTEG_bubbleStatus {
  white-space: nowrap;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 3px;
  min-width: 0;
  display: flex;
}

.PcPTEG_bubbleStatus svg {
  flex: none;
  width: 15px;
  height: 15px;
}

.PcPTEG_bubble > svg:last-child {
  flex: none;
  width: 14px;
  height: 14px;
}

.PcPTEG_voiceBars {
  align-items: center;
  gap: 2px;
  height: 16px;
  display: flex;
}

.PcPTEG_voiceBars i {
  background: var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary));
  opacity: .5;
  border-radius: 1px;
  width: 3px;
  height: 13px;
  transform: scaleY(.31);
}

.PcPTEG_voiceBars[data-active="true"] i {
  background: var(--dsw-alias-brand-primary);
  opacity: 1;
  animation: .7s ease-in-out infinite alternate PcPTEG_whaleInputPulse;
}

.PcPTEG_voiceBars[data-active="true"] i:nth-child(2n) {
  animation-delay: -.3s;
}

.PcPTEG_voiceBars[data-active="true"] i:nth-child(3) {
  animation-delay: -.5s;
}

@keyframes PcPTEG_whaleInputPulse {
  from {
    transform: scaleY(.38);
  }

  to {
    transform: scaleY(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .PcPTEG_voiceBars[data-active="true"] i {
    animation: none;
    transform: scaleY(.69);
  }
}

.PcPTEG_floating[data-motion="off"] .PcPTEG_voiceBars[data-active="true"] i {
  animation: none;
  transform: scaleY(.69);
}

@media (forced-colors: active) {
  .PcPTEG_message p {
    border: 1px solid canvastext;
  }

  .PcPTEG_quickSegments button[aria-pressed="true"] {
    outline: 2px solid highlight;
  }

  .PcPTEG_voiceBars i {
    background: canvastext;
  }
}

.PcPTEG_voicePrompt {
  flex-direction: column;
  gap: 8px;
  display: flex;
}

.PcPTEG_voicePrompt label {
  font-size: 13px;
  font-weight: 600;
}

.PcPTEG_voicePrompt label span {
  margin-left: 10px;
  font-weight: 400;
}

.PcPTEG_voicePromptInput {
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

.PcPTEG_voicePromptInput::placeholder {
  color: var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary));
  opacity: 1;
}

.PcPTEG_voicePromptInput:disabled {
  opacity: .65;
  cursor: not-allowed;
}

.PcPTEG_voicePromptInput:focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: 2px;
}

.PcPTEG_voicePromptCount {
  text-align: right;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
}

.PcPTEG_voicePromptActions {
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  display: flex;
}

.PcPTEG_voicePromptActions .PcPTEG_actions {
  margin: 0;
}

.PcPTEG_voicePromptMode {
  color: var(--dsw-alias-state-success-primary, var(--dsw-alias-label-secondary));
  white-space: nowrap;
  font-size: 11px;
}

.PcPTEG_voicePromptMode:before {
  content: "\u2022";
  margin-right: 5px;
}
`};var de=require("react/jsx-runtime");function at({small:e=!1,state:n="idle"}){return(0,de.jsx)("svg",{viewBox:"0 0 1024 1024","data-state":n,className:e?h.markSmall:h.mark,"aria-hidden":"true",children:(0,de.jsx)("path",{fill:"currentColor",d:"M 920.377 65.087 C 928.064 63.083 932.973 107.434 932.987 114.072 C 933.092 165.045 924.256 210.594 901.365 256.376 C 855.379 348.348 758.325 392.662 681.124 453.829 C 619.898 502.339 580.980 567.068 558.933 641.286 C 543.187 694.296 538.293 750.695 527.468 804.833 C 520.391 840.227 514.008 874.928 493.687 905.451 C 474.447 934.348 431.832 972.135 393.948 957.487 C 358.248 943.683 373.787 884.228 380.635 856.964 C 401.585 773.552 460.283 657.712 419.105 573.931 C 381.383 497.183 304.815 488.756 234.259 458.353 C 195.522 441.661 157.383 413.822 133.190 378.905 C 115.301 353.087 100.999 326.148 94.423 295.130 C 93.358 290.109 88.245 266.804 93.252 264.337 C 93.759 264.087 133.145 277.445 138.791 278.433 C 174.563 284.693 209.339 281.307 245.016 275.980 C 288.094 269.548 333.679 260.367 376.940 270.872 C 414.858 280.080 448.414 297.981 474.046 327.930 C 483.707 339.219 491.970 352.034 498.604 365.302 C 499.492 367.078 503.519 377.817 505.784 377.367 C 506.966 377.132 507.537 375.084 507.926 374.169 C 513.160 361.862 518.091 349.606 524.078 337.631 C 541.287 303.214 562.597 270.184 592.119 244.919 C 633.676 209.352 683.585 187.330 735.895 172.601 C 770.712 162.797 806.633 155.544 838.984 138.655 C 862.849 126.195 882.544 110.622 901.022 91.328 C 905.036 87.137 916.896 65.995 920.377 65.087 Z"})})}var _d=()=>({pet:(0,de.jsxs)(de.Fragment,{children:[(0,de.jsx)("path",{d:"M5 11c-2-8 4-10 7-8 5-2 9 2 7 8M5 10l4-4 3 3 3-3 4 4v5c0 4-3 6-7 6s-7-2-7-6v-5Z"}),(0,de.jsx)("path",{d:"M8 13v2m8-2v2m-6 3h4"})]}),settings:(0,de.jsxs)(de.Fragment,{children:[(0,de.jsx)("path",{d:"m9 3 1-1h4l1 1 .5 2 2 .8 2-.6 2 3-.8 1.8.2 2.2 1.3 1.5-2 3-2.1-.2-1.7 1.3-.5 2.2h-4l-.6-2.1-1.8-1.1-2 .3-2-3 1.3-1.7V10L4 8.5l2-3 2 .5L9 3Z"}),(0,de.jsx)("circle",{cx:"12",cy:"11.5",r:"3"})]}),minus:(0,de.jsx)("path",{d:"M5 12h14"}),plus:(0,de.jsx)("path",{d:"M12 5v14M5 12h14"}),down:(0,de.jsx)("path",{d:"m6 9 6 6 6-6"}),refresh:(0,de.jsxs)(de.Fragment,{children:[(0,de.jsx)("path",{d:"M20 6v5h-5M4 18v-5h5"}),(0,de.jsx)("path",{d:"M6 7a7 7 0 0 1 12-1l2 5M4 13l2 5a7 7 0 0 0 12-1"})]}),up:(0,de.jsx)("path",{d:"m6 15 6-6 6 6"}),check:(0,de.jsx)("path",{d:"m5 12 4 4L19 6"}),micOff:(0,de.jsx)(de.Fragment,{children:(0,de.jsx)("path",{d:"M9 9v3a3 3 0 0 0 5.1 2.1M15 8V6a3 3 0 0 0-5.7-1.3M6 10v2a6 6 0 0 0 10.2 4.3M18 12v-2M12 18v3M9 21h6M3 3l18 18"})}),mic:(0,de.jsxs)(de.Fragment,{children:[(0,de.jsx)("rect",{x:"9",y:"3",width:"6",height:"12",rx:"3"}),(0,de.jsx)("path",{d:"M6 10v2a6 6 0 0 0 12 0v-2M12 18v3M9 21h6"})]}),volume:(0,de.jsxs)(de.Fragment,{children:[(0,de.jsx)("path",{d:"M3 9h4l5-4v14l-5-4H3Z"}),(0,de.jsx)("path",{d:"M16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"})]}),chat:(0,de.jsx)("path",{d:"M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9l-5 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"}),close:(0,de.jsx)("path",{d:"m6 6 12 12M18 6 6 18"}),search:(0,de.jsxs)(de.Fragment,{children:[(0,de.jsx)("circle",{cx:"10",cy:"10",r:"6"}),(0,de.jsx)("path",{d:"m15 15 5 5"})]}),chevron:(0,de.jsx)("path",{d:"m9 5 7 7-7 7"}),warning:(0,de.jsxs)(de.Fragment,{children:[(0,de.jsx)("path",{d:"m12 3 10 18H2L12 3Z"}),(0,de.jsx)("path",{d:"M12 9v5m0 3v.2"})]})});function Qe({name:e,className:n=""}){return(0,de.jsx)("svg",{viewBox:"0 0 24 24",width:"18",height:"18","aria-hidden":"true",className:n,fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round",children:_d()[e]??_d().chat})}var Re=require("react/jsx-runtime");function Zh({name:e,save:n,t}){let[o,i]=(0,qe.useState)(!1),[r,s]=(0,qe.useState)(e),a=(0,qe.useRef)(!1),d=(0,qe.useRef)(null),l=(0,qe.useRef)(null),u=(0,qe.useRef)(!1);(0,qe.useLayoutEffect)(()=>{o?(d.current?.focus({preventScroll:!0}),d.current?.select()):u.current&&(u.current=!1,l.current?.focus({preventScroll:!0}))},[o]);let p=()=>{i(!1),s(e)},f=()=>{let m=r.trim();m&&m.length<=40&&(n?.(m),u.current=!0,i(!1))};return o?(0,Re.jsx)(gr.Input,{ref:d,className:h.assistantNameInput,"aria-label":t("assistantName"),value:r,maxLength:40,"data-no-drag":!0,onChange:m=>s(m.target.value),onCompositionStart:()=>{a.current=!0},onCompositionEnd:()=>{a.current=!1},onBlur:p,onKeyDown:m=>{m.stopPropagation(),!(a.current||m.nativeEvent.isComposing)&&(m.key==="Escape"&&(m.preventDefault(),u.current=!0,p()),m.key==="Enter"&&(m.preventDefault(),f()))}}):(0,Re.jsx)("button",{ref:l,type:"button",className:h.assistantName,"data-no-drag":!0,title:t("renameAssistant"),onClick:()=>{s(e),i(!0)},children:e})}function Pd({conversation:e,history:n,historyLoading:t,historyError:o,historyRetryCursor:i,loadHistory:r,assistantName:s,setAssistantName:a,close:d,t:l}){let[u,p]=(0,qe.useState)(!1),[f,m]=(0,qe.useState)(0),b=(0,qe.useRef)(null),v=(0,qe.useRef)(!0),w=(0,qe.useRef)(null),k=(0,qe.useRef)(null),z=e.rootSessionId,H=id(n?.rootSessionId===z?n.items:[],e.items),B=!v.current&&w.current?.firstId,O=B?H.findIndex(_=>_.id===B):-1,I=u?H:O>=0?H.slice(O):rd(H),E=()=>{let _=b.current;if(!_)return;let T=_.getBoundingClientRect(),N=[..._.querySelectorAll("[data-message-id]")].find(P=>P.getBoundingClientRect().bottom>=T.top);k.current=N?{id:N.dataset.messageId,offset:N.getBoundingClientRect().top-T.top}:null},G=()=>{let _=b.current;_&&(_.scrollTop=_.scrollHeight),v.current=!0,m(0),E()},S=!u&&H.filter(_=>_.role==="user").length<10&&!!n?.nextCursor;return(0,qe.useEffect)(()=>{S&&!t&&!o&&r?.(n.nextCursor)},[S,n?.nextCursor,t,o,z]),(0,qe.useLayoutEffect)(()=>{let _=b.current;if(!_)return;let T=w.current;if((!T||T.root!==z)&&(v.current=!0,m(0)),v.current)_.scrollTop=_.scrollHeight;else{let N=k.current,P=N&&[..._.querySelectorAll("[data-message-id]")].find(C=>C.dataset.messageId===N.id);if(P?_.scrollTop+=P.getBoundingClientRect().top-_.getBoundingClientRect().top-N.offset:T&&(_.scrollTop=Math.min(T.top,_.scrollHeight-_.clientHeight)),T){let C=e.items.filter(F=>F.at>=T.lastAt&&!T.ids.has(F.id)).length;C&&m(F=>F+C)}}w.current={root:z,firstId:I[0]?.id,top:_.scrollTop,lastAt:Math.max(0,...H.map(N=>N.at)),ids:new Set(H.map(N=>N.id))},E()},[e,n,u,f]),(0,Re.jsxs)("section",{className:h.quickConversation,"data-dropdown":"conversation","data-no-drag":!0,role:"region","aria-label":l("recentConversation"),onKeyDown:_=>{_.key==="Escape"&&(_.stopPropagation(),d())},children:[(0,Re.jsxs)("div",{className:h.conversationHeader,children:[(0,Re.jsx)("strong",{children:l(u?"allRecords":"recentTenTurns")}),(0,Re.jsxs)("div",{children:[(0,Re.jsx)("button",{type:"button",onClick:()=>{u?(v.current=!0,k.current=null,w.current=null,m(0)):E(),p(_=>!_)},children:l(u?"collapseToTen":"showAllRecords")}),(0,Re.jsx)(gr.Button,{className:h.iconButton,"aria-label":l("close"),title:l("collapseConversation"),onClick:d,children:(0,Re.jsx)(Qe,{name:"up"})})]})]}),u&&(0,Re.jsxs)("p",{className:h.historyScope,children:[l("currentVoiceRecords"),n?.truncated?" \xB7 "+l("historyTruncated"):""]}),(0,Re.jsxs)("div",{ref:b,className:h.recentMessages,"data-conversation-messages":!0,tabIndex:0,"aria-label":l("conversationMessages"),onWheel:_=>{_.deltaY<0&&(v.current=!1)},onScroll:()=>{let _=b.current;v.current=sd(_),v.current&&m(0),w.current&&(w.current.top=_.scrollTop),E()},children:[u&&n?.nextCursor&&(0,Re.jsx)("button",{className:h.loadHistory,disabled:t,onClick:()=>{E(),r?.(n.nextCursor)},children:l(t?"readingHistory":"loadEarlier")}),o&&(0,Re.jsx)("button",{className:h.loadHistory,disabled:t,onClick:()=>{r?.(i??void 0)},children:l("retryHistory")}),I.map(_=>(0,Re.jsxs)("div",{"data-message-id":_.id,"data-role":_.role,className:h.message,children:[(0,Re.jsx)("div",{className:h.messageName,children:_.role==="user"?(0,Re.jsx)("span",{children:l("you")}):(0,Re.jsx)(Zh,{name:s,save:a,t:l})}),(0,Re.jsx)("p",{children:_.text}),["speech-failed","interrupted"].includes(_.state)&&(0,Re.jsx)("small",{children:l(_.state==="speech-failed"?"speechFailed":"speechInterrupted")})]},_.id)),!I.length&&(0,Re.jsx)("p",{className:h.hint,children:l(t||S?"readingHistory":"noConversation")})]}),f>0&&(0,Re.jsxs)("button",{className:h.newMessages,onClick:G,children:[(0,Re.jsx)(Qe,{name:"down"}),f," ",l("newMessages")]})]})}var ct=require("react"),Zt=require("@deepseek-ai/dsh-client-ui-primitives"),wn=require("react/jsx-runtime");function _o({label:e,value:n,onChange:t,kind:o,pickPath:i,sessionId:r,disabled:s,active:a=!0,scope:d,className:l,placeholder:u}){let[p,f]=(0,ct.useState)(!1),[m,b]=(0,ct.useState)(null),v=typeof n=="string"?n.split(/[\\/]/).filter(Boolean).at(-1)??n:"",w=(0,ct.useRef)(null),k=(0,ct.useRef)(null),z=()=>{w.current?.abort(),w.current=null,f(!1)};(0,ct.useEffect)(()=>(z(),b(null),z),[r,s,a,d,n]);let H=async()=>{if(w.current||s||!a||!i)return;let B=new AbortController;w.current=B,f(!0),b(null);try{let O=await i(r,o,B.signal);w.current===B&&!B.signal.aborted&&!k.current?.closest("[hidden]")&&O!==null&&t(O)}catch(O){w.current===B&&!B.signal.aborted&&b(String(O?.message??O))}finally{w.current===B&&(w.current=null,f(!1))}};return(0,wn.jsxs)("div",{ref:k,className:l,"data-native-path":o,children:[(0,wn.jsxs)("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,minWidth:0},children:[(0,wn.jsxs)("label",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,minWidth:0},children:[e,(0,wn.jsx)(Zt.Input,{"aria-label":e,title:n??"",value:v,placeholder:u,disabled:s,readOnly:!0,style:{width:190,maxWidth:"100%",minWidth:0,textOverflow:"ellipsis"}})]}),(0,wn.jsx)(Zt.Button,{variant:"outline",disabled:s||!a||!i||p,onClick:()=>{H()},children:p?"\u7B49\u5F85\u9009\u62E9\u2026":o==="referenceAudio"||o==="campplus"?"\u9009\u62E9\u6587\u4EF6\u2026":"\u9009\u62E9\u6587\u4EF6\u5939\u2026"})]}),o==="campplus"&&n&&(0,wn.jsx)(Zt.Button,{variant:"outline",disabled:s,onClick:()=>{z(),t("")},children:"\u6E05\u9664\u53EF\u9009\u6A21\u578B"}),p&&(0,wn.jsx)(Zt.Button,{variant:"outline",onClick:z,children:"\u53D6\u6D88\u9009\u62E9"}),n&&(0,wn.jsxs)("details",{style:{fontSize:12,minWidth:0},children:[(0,wn.jsx)("summary",{children:"\u67E5\u770B\u5B8C\u6574\u8DEF\u5F84"}),(0,wn.jsx)("p",{style:{margin:"4px 0",overflowWrap:"anywhere"},children:n})]}),m&&(0,wn.jsx)("p",{role:"alert",children:m})]})}var Bt=require("react");var an=require("react/jsx-runtime"),Po=e=>e&&typeof e=="object"?`${e.backend}:${e.id}`:e==null?"":"__legacy";function kd({state:e,sessionId:n,run:t,t:o}){let i=(0,Bt.useRef)({state:e,sessionId:n,run:t}),r=(0,Bt.useRef)(void 0);i.current={state:e,sessionId:n,run:t},(0,Bt.useEffect)(()=>{!e.settings||e.settingsFor!==n||e.busy||e.audioDevicesPending||r.current===n||(r.current=n,t(n,"read-audio-devices"))},[n,e.settingsFor,e.busy,e.audioDevicesPending]),(0,Bt.useEffect)(()=>{let f=!1,m,b=async()=>{let v=i.current;!f&&v.sessionId===n&&!v.state.busy&&!document.hidden&&(v.state.settingsFor!==n&&await v.run(n,"read-settings"),f||await v.run(n,"read-audio-devices")),f||(m=document.defaultView.setTimeout(b,1e4))};return b(),()=>{f=!0,document.defaultView.clearTimeout(m)}},[n]);let s=!!(e.settings&&e.settingsFor===n),a=s?e.settings:null,d=a?.audioDevices??{input:a?.values?.device??null,output:null},l=e.audioDevicesFor===n?e.audioDevices:null,u=e.checkedFor===n&&!e.uncertain&&e.status?.enabled===!1&&e.status?.ownerSessionId===null&&e.status?.voiceControlBusy===!1&&e.status?.voiceSession?.fullyStopped===!0&&e.status?.voiceSession?.id==null,p=[];return(0,an.jsxs)("section",{className:h.audioDevices,"aria-label":o("audioDevices"),"data-audio-device-controls":!0,"data-no-drag":!0,children:[(0,an.jsx)("div",{className:h.audioDeviceGrid,children:["input","output"].map(f=>{let m=d[f],b=l?.[f],v=Po(m),w=b?.items?.some(O=>Po(O)===v),k=m&&typeof m=="object"&&b&&b.status!=="unavailable"&&!w,z=m==null?o("audioSystemDefault"):typeof m=="object"?m.name:String(m),H=f==="output"&&b?.reason==="AUDIO_PLATFORM_UNSUPPORTED",B=!s||e.busy||e.uncertain||e.settingsConflict||H||f==="input"&&!u;return k&&p.push(o(f==="input"?"inputDeviceMissing":"outputDeviceMissing")),(0,an.jsxs)("label",{className:h.audioDeviceField,children:[(0,an.jsxs)("span",{children:[(0,an.jsx)(Qe,{name:f==="input"?"mic":"volume"}),o(f==="input"?"audioInput":"audioOutput")]}),(0,an.jsxs)("select",{"aria-label":o(f==="input"?"audioInput":"audioOutput"),"data-device-missing":k||void 0,title:B&&f==="input"&&!u?o("inputDeviceStopFirst"):H?o("outputDeviceUnsupported"):z,disabled:B,value:v,onFocus:()=>{e.audioDevicesPending||t(n,"read-audio-devices")},onChange:O=>{let I=O.target.value;if(I==="__legacy"||I===v)return;let E=I===""?null:b?.items?.find(G=>Po(G)===I);E!==void 0&&t(n,"save-audio-device",{revision:a.revision,direction:f,selection:E})},children:[(0,an.jsx)("option",{value:"",children:o("audioSystemDefault")}),m!=null&&!w&&(0,an.jsxs)("option",{value:v,children:[z,k?" \xB7 "+o("deviceDisconnected"):typeof m=="object"?"":" \xB7 "+o("deviceSaved")]}),b?.items?.map(O=>(0,an.jsx)("option",{value:Po(O),children:O.name},Po(O)))]})]},f)})}),p.length>0?(0,an.jsx)("p",{className:h.audioDeviceNotice,role:"status",children:p.join("\uFF1B")}):e.audioDevicesError||l?.input?.status==="unavailable"||l?.output?.status==="unavailable"&&l?.output?.reason!=="AUDIO_PLATFORM_UNSUPPORTED"?(0,an.jsx)("p",{className:h.audioDeviceHint,role:"status",children:o("deviceListRetry")}):l?.output?.reason==="AUDIO_PLATFORM_UNSUPPORTED"?(0,an.jsx)("p",{className:h.audioDeviceHint,children:o("outputDeviceUnsupported")}):!u&&s?(0,an.jsx)("p",{className:h.audioDeviceHint,children:o("inputDeviceStopFirst")}):null]})}var He=require("react"),xn=require("@deepseek-ai/dsh-client-ui-primitives");var se=require("react/jsx-runtime"),Bh={busy:"\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F",archived:"\u4F1A\u8BDD\u5DF2\u5F52\u6863",unavailable:"\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528"},bt=e=>e.title?.trim()||`\u672A\u547D\u540D\u4F1A\u8BDD \xB7 ${e.sessionId.slice(-6).toUpperCase()}`,vr=e=>Bh[e.availability],Xn=e=>["ready","busy"].includes(e?.availability),br=(e,n)=>e.checkedFor===n&&!e.uncertain&&!e.busy&&!e.ttsCancelling&&!e.existingSessionWritePending&&!e.existingSessionUnconfirmed&&e.status?.voiceControlBusy===!1&&e.status?.voiceSession?.fullyStopped===!0&&e.status?.enabled===!1;function Sd({sessionId:e,boundSession:n,state:t,controlContext:o,listExistingVoiceSessions:i,setExistingVoiceSession:r,readState:s,run:a,t:d}){let[l,u]=(0,He.useState)(),[p,f]=(0,He.useState)(!1),[m,b]=(0,He.useState)(!1),v=(0,He.useRef)(null),w=(0,He.useId)(),k=n?.sessionId??null,z=e===k,H=T=>br(T,e)&&Object.hasOwn(T.status,"existingVoiceSession")&&(T.status.existingVoiceSession?.sessionId??null)===k,B=()=>o.currentConversation()===e&&o.sourceFor(e)===e;(0,He.useEffect)(()=>{let T=new AbortController;return v.current={signal:T.signal,choosing:!1},f(!1),i({sessionId:e},T.signal).then(N=>{T.signal.aborted||!B()||(u(N.items.find(P=>P.sessionId===e)??null),(N.binding?.sessionId??null)!==k&&a(e,"status"))}).catch(()=>{T.signal.aborted||u(null)}),()=>T.abort()},[e,k,o,i]);let O=async()=>{let T=v.current;if(!(!T||T.signal.aborted||T.choosing||!B())&&H(s())){T.choosing=!0,f(!0),b(!1);try{if(z){await r({sessionId:null,expectedSessionId:k});return}let N=await i({sessionId:e},T.signal);if(T.signal.aborted||!B())return;let P=N.items.find(F=>F.sessionId===e),C=(N.binding?.sessionId??null)!==k;if(C||!Xn(P)){u(P??null),b(!0),C&&a(e,"status");return}if(!H(s()))return;await r({sessionId:e,expectedSessionId:k})}catch{T.signal.aborted||b(!0)}finally{T.choosing=!1,T.signal.aborted||f(!1)}}},I=z?n:l,E=l===void 0&&!z,G=z||E||Xn(I);if(!G&&!m)return null;let S=d(z?"backToFishVoice":"chooseCurrentDshTarget"),_=E?d("checkingVoiceTarget"):I?bt(I):"";return(0,se.jsxs)("div",{className:h.currentDshTarget,"data-whale-current-target":!0,"data-no-drag":!0,children:[G&&(0,se.jsxs)(xn.Button,{variant:"outline",className:h.currentDshAction,"data-whale-operation":z?"unbind-existing-session":"bind-current-session","aria-label":S,"aria-busy":p||E,"aria-describedby":w,disabled:!H(t)||p||E,onClick:()=>{O()},children:[(0,se.jsx)("span",{children:S}),(0,se.jsx)("span",{id:w,className:h.ellipsis,title:_,children:_})]}),m&&(0,se.jsx)("p",{role:"alert",className:h.hint,children:d("currentDshTargetError")})]})}function Ui({state:e,sessionId:n,listExistingVoiceSessions:t,setExistingVoiceSession:o,openExistingVoiceSession:i,showHome:r,homePickerId:s,closeHomePicker:a,t:d}){let[l,u]=(0,He.useState)(null),[p,f]=(0,He.useState)(!1),[m,b]=(0,He.useState)(""),[v,w]=(0,He.useState)(null),[k,z]=(0,He.useState)(!1),[H,B]=(0,He.useState)(!1),[O,I]=(0,He.useState)(null),E=(0,He.useRef)(null),G=(0,He.useRef)(!1),S=(0,He.useId)(),_=!!s,T=_||p,N=e.status,P=Object.hasOwn(N??{},"existingVoiceSession")?N.existingVoiceSession:l?.binding,C=N?.existingVoiceSessionSupported!==!1,F=br(e,n),V=e.existingSessionWritePending,Z=l?.items.find(oe=>oe.sessionId===v),J=F&&!k&&!!P,q=F&&C&&!k&&!H&&!!l,ae=(0,He.useCallback)(async(oe="",X)=>{E.current?.abort();let U=new AbortController;E.current=U,z(!0),B(!1);try{let _e=await t({...oe?{query:oe}:{},...X?{cursor:X}:{}},U.signal);if(U.signal.aborted)return;u(on=>({..._e,query:oe,items:X&&on?[...new Map([...on.items,..._e.items].map(Fe=>[Fe.sessionId,Fe])).values()]:_e.items}))}catch{U.signal.aborted||B(!0)}finally{E.current===U&&(E.current=null,z(!1))}},[t]);(0,He.useEffect)(()=>(G.current=!0,C?ae():z(!1),()=>{G.current=!1,E.current?.abort(),E.current=null}),[ae,C]);let le=oe=>{oe.preventDefault(),w(null),I(null),ae(m.trim())},pe=async oe=>{if(!(!(oe===null?J:q)||oe===(P?.sessionId??null))){I(null);try{let{binding:X}=await o({sessionId:oe,expectedSessionId:P?.sessionId??null});if(!G.current)return;if(_){a();return}u(U=>U&&{...U,binding:X}),f(!1),w(null),b(""),I({text:X?"\u5DF2\u7ED1\u5B9A\u3002\u70B9\u51FB\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u540E\u5373\u53EF\u7EE7\u7EED\u8BE5\u4F1A\u8BDD\u3002":"\u5DF2\u89E3\u9664\uFF0C\u4E0B\u4E00\u6B21\u5F00\u59CB\u5BF9\u8BDD\u5C06\u4F7F\u7528\u9C7C\u5E94\u4F1A\u8BDD\u3002"}),C&&ae()}catch(X){if(!G.current)return;I({error:!0,text:typeof X?.message=="string"&&X.message?X.message.split(`
`)[0].slice(0,160):"\u4F1A\u8BDD\u7ED1\u5B9A\u672A\u786E\u8BA4\uFF0C\u8BF7\u6838\u5BF9\u5F53\u524D\u7ED1\u5B9A\u3002"}),w(null),C&&ae(T?m.trim():"")}}},xe=(0,se.jsxs)(se.Fragment,{children:[k&&(0,se.jsx)("p",{role:"status",className:h.hint,children:d("loadingVoiceTargets")}),H&&(0,se.jsxs)("div",{role:"alert",className:h.notice,children:[d("voiceTargetListError")," ",(0,se.jsx)(xn.Button,{variant:"outline",disabled:V,onClick:()=>{ae(m.trim())},children:d("retryVoiceTargets")})]})]}),A=O&&(0,se.jsx)("p",{role:O.error?"alert":"status",className:O.error?h.notice:h.hint,children:O.text});return(0,se.jsxs)("section",{id:s,className:_?h.homeTargetPicker:h.section,"data-whale-existing-session":!0,"aria-label":_?d("chooseVoiceTarget"):void 0,"data-no-drag":_||void 0,children:[!_&&(0,se.jsxs)(se.Fragment,{children:[(0,se.jsx)("h3",{children:"\u8BED\u97F3\u5BF9\u8BDD\u76EE\u6807"}),(0,se.jsxs)("div",{className:h.existingSessionTarget,children:[(0,se.jsx)("strong",{className:h.sessionTitle,children:P?bt(P):"\u9C7C\u5E94\u4F1A\u8BDD"}),(0,se.jsx)("p",{className:h.hint,children:P?"\u8BED\u97F3\u548C\u56DE\u7B54\u5199\u5165\u6B64\u4F1A\u8BDD\uFF0C\u9C7C\u5E94\u4EC5\u5728\u672C\u673A\u64AD\u62A5\u3002\u5176\u4ED6\u63D2\u4EF6\u7684\u8F6C\u53D1\u7531\u5176\u8BBE\u7F6E\u51B3\u5B9A\u3002":"\u53EF\u7ED1\u5B9A\u5DF2\u6709 DSH \u4F1A\u8BDD\uFF0C\u6CBF\u7528\u539F\u6765\u7684\u4E0A\u4E0B\u6587\u548C\u5386\u53F2\u3002"}),P&&vr(P)&&(0,se.jsxs)("p",{role:"status",className:h.notice,children:[vr(P),"\u3002\u53EF\u89E3\u9664\u7ED1\u5B9A\u6216\u9009\u62E9\u5176\u4ED6\u4F1A\u8BDD\u3002"]}),!C&&(0,se.jsx)("p",{role:"status",className:h.notice,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u4E0D\u652F\u6301\u7ED1\u5B9A\u5DF2\u6709\u4F1A\u8BDD\u3002"}),N?.enabled&&(0,se.jsx)("p",{className:h.hint,children:"\u7ED3\u675F\u8BED\u97F3\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u7ED1\u5B9A\u3002"})]}),(0,se.jsxs)("div",{className:h.actions,children:[(0,se.jsx)(xn.Button,{variant:"outline","aria-expanded":T,disabled:!C||V,onClick:()=>{f(!T),w(null),b(""),T||ae()},children:T?"\u5173\u95ED\u4F1A\u8BDD\u5217\u8868":P?"\u66F4\u6362\u7ED1\u5B9A":"\u9009\u62E9\u5DF2\u6709\u4F1A\u8BDD"}),Xn(P)&&i&&(0,se.jsx)(xn.Button,{variant:"outline","data-whale-operation":"open-native-session",onClick:async()=>{I(null);try{await i(P.sessionId),await r?.()}catch{G.current&&I({error:!0,text:"DSH \u6682\u65F6\u65E0\u6CD5\u6253\u5F00\u539F\u4F1A\u8BDD\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"})}},children:"\u6253\u5F00\u539F\u4F1A\u8BDD"}),P&&(0,se.jsx)(xn.Button,{variant:"outline","data-whale-operation":"unbind-existing-session",disabled:!J,onClick:()=>{pe(null)},children:"\u89E3\u9664\u7ED1\u5B9A"})]})]}),T&&(0,se.jsxs)("div",{className:h.existingSessionPicker,"aria-busy":k,children:[(0,se.jsxs)("form",{className:h.existingSessionSearch,onSubmit:le,children:[(0,se.jsx)(xn.Input,{type:"search","aria-label":d("searchVoiceTargets"),placeholder:d("searchVoiceTargets"),value:m,maxLength:128,disabled:V,onChange:oe=>b(oe.target.value)}),(0,se.jsx)(xn.Button,{type:"submit",variant:"outline",disabled:V,children:d("searchVoiceTargetsAction")})]}),l?.items.length>0&&(0,se.jsx)("ul",{className:h.existingSessionList,"aria-label":d("existingVoiceTargetList"),children:l.items.map(oe=>{let X=P?.sessionId===oe.sessionId,U=X||!Xn(oe),_e=(0,se.jsxs)("span",{className:h.hint,children:[X?d("boundVoiceTarget")+" \xB7 ":"",d("voiceTargetAvailability_"+(oe.unavailableReason??oe.availability))," \xB7 ",oe.sessionId]});return(0,se.jsx)("li",{children:_?(0,se.jsxs)(xn.Button,{variant:"ghost",className:h.homeTargetRow,"data-whale-operation":"bind-existing-session",title:oe.sessionId,"aria-current":X||void 0,"aria-disabled":!q,disabled:U,onClick:()=>{pe(oe.sessionId)},children:[(0,se.jsx)("strong",{className:h.sessionTitle,children:bt(oe)}),_e]}):(0,se.jsxs)("label",{title:oe.sessionId,children:[(0,se.jsx)("input",{type:"radio",name:S,value:oe.sessionId,checked:v===oe.sessionId,disabled:U||k||V,onChange:()=>{w(oe.sessionId),I(null)}}),(0,se.jsxs)("span",{children:[(0,se.jsx)("strong",{className:h.sessionTitle,children:bt(oe)}),_e]})]})},oe.sessionId)})}),xe,!k&&!H&&l?.items.length===0&&(0,se.jsx)("p",{role:"status",className:h.hint,children:d(l.query?"voiceTargetNoMatch":"voiceTargetEmptyList")}),Z&&(0,se.jsx)("p",{id:S+"-tts",className:h.hint,children:d("voiceTargetSynthesisNotice")}),A,(!_||l?.nextCursor||P)&&(0,se.jsxs)("div",{className:h.actions,children:[!_&&(0,se.jsx)(xn.Button,{variant:"primary","data-whale-operation":"bind-existing-session","aria-describedby":Z?S+"-tts":void 0,disabled:!q||!Xn(Z)||Z.sessionId===P?.sessionId,onClick:()=>{pe(v)},children:d(V?"savingVoiceTarget":"bindVoiceTarget")}),!!l?.nextCursor&&(0,se.jsx)(xn.Button,{variant:"outline",disabled:k||V,onClick:()=>{ae(l.query,l.nextCursor)},children:d("moreVoiceTargets")}),_&&P&&(0,se.jsx)(xn.Button,{variant:"outline","data-whale-operation":"unbind-existing-session",disabled:!J,onClick:()=>{pe(null)},children:d("backToFishVoice")})]})]}),!T&&(0,se.jsxs)(se.Fragment,{children:[xe,A]})]})}var Ut=require("react"),Ft=require("@deepseek-ai/dsh-client-ui-primitives");var wr="dsh-fish-voice";var ji={name:"Emikosama",url:"https://github.com/Emikosama"};var Ed="https://github.com/Emikosama/dsh-fish-voice",ko={url:"https://github.com/Emikosama/dsh-fish-voice/issues"};var Se=require("react/jsx-runtime");function Td(e,n){let t=e.updates;return e.updatePending==="install"?n("update_installing"):e.updatePending==="check"?n("update_checking"):e.updatesUnavailable?n("updateConnection"):t?t.message||n("update_"+t.status):n("update_idle")}function zd({state:e,open:n,t}){let o=e.updates,i=!e.updatesUnavailable&&(o?.release||["restart-required","enable-required","installed"].includes(o?.status));return(0,Se.jsxs)("section",{className:h.section,"data-whale-update-settings":!0,children:[(0,Se.jsx)("h3",{children:t("updateTitle")}),o&&(0,Se.jsxs)("p",{className:h.hint,children:[t("updateCurrentVersion")," ",o.currentVersion," \xB7 ",t("updateChannel_"+o.channel)]}),(0,Se.jsx)("p",{children:Td(e,t)}),(0,Se.jsxs)("div",{className:h.actions,children:[i&&(0,Se.jsx)(Ft.Button,{variant:"outline",onClick:()=>n(!1),children:t("updateDetails")}),(0,Se.jsx)(Ft.Button,{variant:"outline",disabled:!!e.updatePending||!e.updatesUnavailable&&o?.status==="installing",onClick:()=>n(!0),children:t("updateCheck")}),(0,Se.jsx)("a",{href:ko.url,"data-whale-operation":"open-feedback",target:"_blank",rel:"noreferrer noopener",children:t("updateFeedback")})]})]})}function Cd({state:e,close:n,run:t,t:o}){let i=(0,Ut.useRef)(null),r=(0,Ut.useId)();(0,Ut.useLayoutEffect)(()=>{let m=i.current;return typeof m.showModal=="function"?m.showModal():m.setAttribute("open",""),()=>{m.open&&m.close?.()}},[]);let s=e.updates,a=s?.release,d=!!e.updatePending||!e.updatesUnavailable&&["checking","installing"].includes(s?.status),l=!e.updatesUnavailable&&!d&&s?.canInstall&&a,u=!d&&(e.updatesUnavailable||!["restart-required","enable-required"].includes(s?.status)),p=!e.updatesUnavailable&&["available","incompatible"].includes(s?.status),f=l&&!s.message?null:Td(e,o);return(0,Se.jsxs)("dialog",{ref:i,className:h.updateDialog,"data-whale-update-dialog":!0,"data-no-drag":!0,"aria-labelledby":r,onCancel:m=>{m.preventDefault(),n()},onKeyDown:m=>m.stopPropagation(),children:[(0,Se.jsxs)("header",{className:h.updateHeader,children:[(0,Se.jsx)(at,{}),(0,Se.jsx)("h2",{id:r,children:o(p?"updateOfferTitle":"updateTitle")})]}),s&&(0,Se.jsxs)("p",{className:h.hint,children:[o("updateCurrentVersion")," ",s.currentVersion,a&&a.version!==s.currentVersion&&(0,Se.jsxs)(Se.Fragment,{children:[" \xB7 ",o("updateNewVersion")," ",a.version]})," \xB7 ",o("updateChannel_"+s.channel)]}),a?.announcement&&(0,Se.jsx)("p",{className:h.updateAnnouncement,children:a.announcement}),f&&(0,Se.jsx)("p",{className:h.hint,role:"status",children:f}),(0,Se.jsxs)("div",{className:h.actions,children:[(0,Se.jsx)(Ft.Button,{variant:"outline",onClick:n,children:o(p?"updateLater":"close")}),l&&(0,Se.jsx)(Ft.Button,{variant:"primary",className:h.primary,onClick:()=>{t({action:"install",version:a.version})},children:o("updateInstall")}),!l&&u&&(0,Se.jsx)(Ft.Button,{variant:"outline",onClick:()=>{t({action:"check"})},children:o("updateCheck")})]}),(0,Se.jsxs)("footer",{className:h.actions,children:[a?.url?.startsWith("https://")&&(0,Se.jsx)("a",{href:a.url,target:"_blank",rel:"noreferrer noopener",children:o("updateRelease")}),(0,Se.jsx)("a",{href:ko.url,"data-whale-operation":"open-feedback",target:"_blank",rel:"noreferrer noopener",children:o("updateFeedback")})]})]})}var Fh=new Map([["audio","settings-audio"],["interaction","settings-interaction"],["prompt","settings-prompt"],["models","settings-models"],["advanced","settings-advanced"],["pets","settings-pets"],["sessions","page-session-management"]]);function Uh(e){if(e.nativeEvent?.isTrusted!==!0)return null;let n=e.target;if(!n?.closest)return null;let t=n.closest("[data-whale-operation-log]");return t&&!(e.type==="click"&&n.closest("summary")?.parentElement===t)?null:n}function Nd(e){let n=Uh(e);if(!n)return null;if(e.type==="submit")return"commit-form";if(e.type==="keydown")return e.key==="Escape"?"dismiss":["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key)&&n.closest('[data-settings-nav], [role="listbox"]')?"keyboard-navigation":null;if(e.type==="change")return n.matches('input[type="radio"]')&&["listen-mode-ptt","listen-mode-always","listen-mode-wake"].includes(n.dataset.whaleOperation)?n.dataset.whaleOperation:n.closest("[data-audio-device-controls] select")?"change-audio-device":n.matches('select, input[type="radio"], input[type="checkbox"]')?"edit-choice":null;if(e.type!=="click")return null;let t=n.closest("button, a[href], summary");if(!t||t.type==="submit"&&t.form)return null;let o=t.dataset.whaleOperation;return o==="open-feedback"&&t.matches("summary")&&t.parentElement.open?"dismiss":t.matches("summary")&&["session-history","subagent-history"].includes(o)?o+(t.parentElement.open?"-close":"-open"):o||(t.hasAttribute("data-settings-tab")?Fh.get(t.dataset.settingsTab)??"page-settings-tab":t.closest("[data-whale-session-management], [data-whale-existing-session]")?"manage-session":t.closest("[data-settings-page-heading] nav")?"page-model-tab":t.matches("summary")?"details-toggle":"activate-control")}var et=require("react"),Vi=require("@deepseek-ai/dsh-client-ui-primitives");var tn=require("react/jsx-runtime"),jh="fish-voice-operation-log.log",Ad=256*1024,Vh=(e,n)=>(e+n).slice(-Ad);function Od({readOperationLog:e}){let[n,t]=(0,et.useState)(!1),[o,i]=(0,et.useState)(!1),[r,s]=(0,et.useState)(null),[a,d]=(0,et.useState)(null),l=(0,et.useRef)(null);if((0,et.useEffect)(()=>()=>l.current?.abort(),[]),!e)return null;let u=async f=>{if(l.current)return;let m=new AbortController;l.current=m,i(!0),d(null);try{let b=await e(m.signal);if(m.signal.aborted)return;if(f){let v=URL.createObjectURL(new Blob(b,{type:"text/plain;charset=utf-8"})),w=document.createElement("a");w.href=v,w.download=jh,Lh(w),setTimeout(()=>URL.revokeObjectURL(v),1e3),d("\u5DF2\u8BF7\u6C42\u4FDD\u5B58\u8BCA\u65AD\u65E5\u5FD7\u3002")}else s({text:b.reduce(Vh,""),shortened:b.reduce((v,w)=>v+w.length,0)>Ad})}catch{m.signal.aborted||d("\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u8BCA\u65AD\u65E5\u5FD7\uFF0C\u8BF7\u91CD\u8BD5\u3002")}finally{l.current===m&&(l.current=null),m.signal.aborted||i(!1)}},p=f=>{let m=f.currentTarget.open;t(m),m||(l.current?.abort(),l.current=null,i(!1),s(null),d(null))};return(0,tn.jsxs)("details",{className:h.section,"data-whale-operation-log":!0,open:n,onToggle:p,children:[(0,tn.jsx)("summary",{"data-whale-operation":"open-feedback",children:"\u6392\u67E5\u4E0E\u53CD\u9988"}),n&&(0,tn.jsxs)(tn.Fragment,{children:[(0,tn.jsx)("p",{className:h.hint,children:"\u6700\u8FD1\u4E03\u5929\u7684\u64CD\u4F5C\u65E5\u5FD7\u3002\u53EF\u5148\u67E5\u770B\uFF0C\u518D\u81EA\u884C\u51B3\u5B9A\u662F\u5426\u968F\u53CD\u9988\u63D0\u4EA4\u3002"}),(0,tn.jsxs)("div",{className:h.actions,children:[(0,tn.jsx)(Vi.Button,{variant:"outline",disabled:o,onClick:()=>{u(!1)},children:"\u67E5\u770B\u8BCA\u65AD\u65E5\u5FD7"}),(0,tn.jsx)(Vi.Button,{variant:"outline",disabled:o,onClick:()=>{u(!0)},children:"\u4FDD\u5B58\u8BCA\u65AD\u65E5\u5FD7"}),(0,tn.jsx)("a",{href:ko.url+"/new",target:"_blank",rel:"noreferrer noopener",children:"\u63D0\u4EA4\u53CD\u9988"})]}),o&&(0,tn.jsx)("p",{role:"status",className:h.hint,children:"\u6B63\u5728\u8BFB\u53D6\u8BCA\u65AD\u65E5\u5FD7\u2026"}),a&&(0,tn.jsx)("p",{role:"status",className:h.hint,children:a}),r?.shortened&&(0,tn.jsx)("p",{className:h.hint,children:"\u8FD9\u91CC\u53EA\u663E\u793A\u6700\u8FD1\u4E00\u6BB5\uFF0C\u4FDD\u5B58\u53EF\u53D6\u5F97\u5B8C\u6574\u65E5\u5FD7\u3002"}),r&&(0,tn.jsx)("pre",{className:h.requestDetails,tabIndex:0,"aria-label":"\u64CD\u4F5C\u65E5\u5FD7\u9884\u89C8",children:r.text||"\u6682\u65E0\u64CD\u4F5C\u65E5\u5FD7\u3002"})]})]})}function Lh(e){document.body.append(e);try{e.click()}finally{e.remove()}}var M=require("react"),W=require("@deepseek-ai/dsh-client-ui-primitives");var he=require("react"),me=require("@deepseek-ai/dsh-client-ui-primitives");var R={field:"sj7OHW_field",primary:"sj7OHW_primary",jobs:"sj7OHW_jobs",wizardBody:"sj7OHW_wizardBody",hardwareSummary:"sj7OHW_hardwareSummary",modelChoices:"sj7OHW_modelChoices",selectedModel:"sj7OHW_selectedModel",installHistory:"sj7OHW_installHistory",section:"sj7OHW_section",setupEnter:"sj7OHW_setupEnter",actions:"sj7OHW_actions",choices:"sj7OHW_choices",jobHeading:"sj7OHW_jobHeading",wizard:"sj7OHW_wizard",switchRow:"sj7OHW_switchRow",wizardBodyContent:"sj7OHW_wizardBodyContent",inlineField:"sj7OHW_inlineField",choice:"sj7OHW_choice",fullName:"sj7OHW_fullName",currentModel:"sj7OHW_currentModel",plan:"sj7OHW_plan",hint:"sj7OHW_hint",header:"sj7OHW_header",note:"sj7OHW_note",switcher:"sj7OHW_switcher",sourceChoices:"sj7OHW_sourceChoices",job:"sj7OHW_job",consentActions:"sj7OHW_consentActions",installPath:"sj7OHW_installPath",details:"sj7OHW_details",modelInstaller:"sj7OHW_modelInstaller",badge:"sj7OHW_badge",text:`.sj7OHW_section {
  min-width: 0;
  color: var(--dsw-alias-label-primary);
  gap: 8px;
  display: grid;
}

.sj7OHW_section h3, .sj7OHW_wizard h2, .sj7OHW_plan h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
}

.sj7OHW_section p, .sj7OHW_wizard p {
  margin: 0;
  line-height: 1.6;
}

.sj7OHW_hint, .sj7OHW_section small, .sj7OHW_wizard small {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 1.6;
}

.sj7OHW_note {
  border-left: 2px solid var(--dsw-alias-state-warn-primary);
  background: var(--dsw-alias-bg-layer-2);
  padding: 8px 12px;
  font-size: 12px;
}

.sj7OHW_actions, .sj7OHW_header {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  display: flex;
}

.sj7OHW_header {
  justify-content: space-between;
  align-items: flex-start;
}

.sj7OHW_choices {
  border: 0;
  gap: 8px;
  min-width: 0;
  margin: 0;
  padding: 0;
  display: grid;
}

.sj7OHW_choices legend {
  color: var(--dsw-alias-label-secondary);
  padding: 0 0 8px;
  font-size: 12px;
}

.sj7OHW_choice {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  cursor: pointer;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 10px;
  display: flex;
}

.sj7OHW_choice[data-selected="true"] {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,var(--dsw-alias-bg-layer-1));
}

.sj7OHW_choice input {
  accent-color: var(--dsw-alias-brand-primary);
  margin: 4px 0 0;
}

.sj7OHW_choice span {
  min-width: 0;
}

.sj7OHW_choice small, .sj7OHW_plan small {
  overflow-wrap: anywhere;
  display: block;
}

.sj7OHW_choice strong {
  font-size: 13px;
}

.sj7OHW_field {
  gap: 6px;
  font-size: 12px;
  display: grid;
}

.sj7OHW_field input, .sj7OHW_field select {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}

.sj7OHW_field select {
  font: inherit;
  color: inherit;
  background: var(--dsw-alias-bg-layer-2);
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  padding: 8px;
}

.sj7OHW_details {
  border-top: 1px solid var(--dsw-alias-border-l2);
  min-width: 0;
  padding-top: 12px;
}

.sj7OHW_details summary {
  cursor: pointer;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

.sj7OHW_details[open] > summary {
  margin-bottom: 12px;
}

.sj7OHW_badge {
  border-radius: var(--dsw-radius-sm);
  color: var(--dsw-alias-label-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,var(--dsw-alias-bg-layer-1));
  margin-left: 8px;
  padding: 2px 6px;
  font-size: 11px;
}

.sj7OHW_plan, .sj7OHW_job {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  gap: 10px;
  min-width: 0;
  padding: 12px;
  display: grid;
}

.sj7OHW_plan dl {
  grid-template-columns: auto minmax(0, 1fr);
  gap: 6px 12px;
  margin: 0;
  font-size: 12px;
  display: grid;
}

.sj7OHW_plan dt {
  color: var(--dsw-alias-label-secondary);
}

.sj7OHW_plan dd {
  overflow-wrap: anywhere;
  margin: 0;
}

.sj7OHW_plan a {
  color: var(--dsw-alias-link);
  overflow-wrap: anywhere;
  font-size: 12px;
}

.sj7OHW_plan ul {
  margin: 0;
  padding-left: 16px;
  font-size: 12px;
}

.sj7OHW_jobs {
  gap: 12px;
  display: grid;
}

.sj7OHW_job progress {
  width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
}

.sj7OHW_wizard {
  box-sizing: border-box;
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-layer-1);
  border-radius: var(--dsw-radius-lg);
}

.sj7OHW_section button, .sj7OHW_wizard button {
  transition: transform var(--ds-transition-duration-fast, .1s) var(--whale-ease, ease-out);
}

.sj7OHW_section button:active:not(:disabled), .sj7OHW_wizard button:active:not(:disabled) {
  transform: scale(.97);
}

.sj7OHW_section :is(button, input, select, a, summary):focus-visible, .sj7OHW_wizard :is(button, summary):focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

[data-motion="firm"] .sj7OHW_wizard {
  --whale-duration: var(--ds-transition-duration-fast, .1s);
  --whale-ease: ease-out;
}

[data-motion="off"] .sj7OHW_wizard, [data-motion="off"] .sj7OHW_wizard *, [data-motion="off"] .sj7OHW_section * {
  transition: none !important;
  animation: none !important;
  transform: none !important;
}

@keyframes sj7OHW_setupEnter {
  from {
    translate: 0 4px;
  }

  to {
    translate: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sj7OHW_wizard, .sj7OHW_wizard *, .sj7OHW_section * {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
}

@media (width <= 520px) {
  .sj7OHW_wizard {
    padding: 12px;
  }

  .sj7OHW_plan dl {
    grid-template-columns: minmax(0, 1fr);
    gap: 3px;
  }

  .sj7OHW_plan dd {
    margin-bottom: 6px;
  }
}

@media (forced-colors: active) {
  .sj7OHW_choice[data-selected="true"] {
    outline: 2px solid highlight;
  }
}

.sj7OHW_wizard {
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

.sj7OHW_wizard > .sj7OHW_header, .sj7OHW_wizard > footer {
  flex-shrink: 0;
}

.sj7OHW_wizardBody {
  overscroll-behavior: contain;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.sj7OHW_wizardBodyContent {
  align-content: start;
  gap: 12px;
  display: grid;
}

.sj7OHW_primary {
  color: var(--dsw-alias-label-primary) !important;
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 16%,var(--dsw-alias-bg-layer-2)) !important;
  border: 1px solid var(--dsw-alias-border-l2) !important;
}

.sj7OHW_primary:disabled {
  opacity: .5;
}

.sj7OHW_choices {
  gap: 6px;
}

.sj7OHW_choice {
  box-sizing: border-box;
  align-items: center;
  min-height: 38px;
}

.sj7OHW_choice input {
  flex: none;
  margin: 0;
}

.sj7OHW_choice strong {
  display: block;
}

.sj7OHW_choice:has(input:disabled) {
  cursor: default;
  opacity: .65;
}

.sj7OHW_note p {
  margin: 0;
}

.sj7OHW_note button {
  margin-top: 8px;
}

.sj7OHW_wizard > footer {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

.sj7OHW_wizardBody {
  padding: 2px 4px 8px 0;
}

.sj7OHW_section > button, .sj7OHW_wizardBody > button {
  justify-self: start;
  max-width: 100%;
}

.sj7OHW_section button, .sj7OHW_wizard button {
  white-space: normal;
  max-width: 100%;
  height: auto;
  min-height: 36px;
}

.sj7OHW_actions > button {
  flex: 0 auto;
}

.sj7OHW_sourceChoices {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.sj7OHW_sourceChoices legend {
  grid-column: 1 / -1;
}

.sj7OHW_inlineField {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-width: 0;
  font-size: 12px;
  display: flex;
}

.sj7OHW_inlineField select {
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

.sj7OHW_inlineField input[type="number"] {
  width: 80px;
  min-width: 0;
}

.sj7OHW_field:has( > input[type="number"]) {
  flex-wrap: wrap;
  align-items: center;
  display: flex;
}

.sj7OHW_field > input[type="number"] {
  width: 80px;
}

.sj7OHW_details > summary {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  box-sizing: content-box;
  width: fit-content;
  max-width: 100%;
  min-height: 20px;
  padding: 7px 10px;
}

.sj7OHW_fullName {
  min-width: 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

.sj7OHW_fullName summary {
  cursor: pointer;
}

.sj7OHW_fullName p {
  overflow-wrap: anywhere;
}

.sj7OHW_consentActions {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  display: flex;
}

@container (width <= 360px) {
  .sj7OHW_sourceChoices {
    grid-template-columns: minmax(0, 1fr);
  }

  .sj7OHW_inlineField select {
    width: 150px;
  }
}

@media (width <= 420px) {
  .sj7OHW_wizard .sj7OHW_sourceChoices {
    grid-template-columns: minmax(0, 1fr);
  }
}

.sj7OHW_modelChoices {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.sj7OHW_modelChoices > legend {
  grid-column: 1 / -1;
  padding-bottom: 5px;
}

.sj7OHW_modelChoices .sj7OHW_choice {
  gap: 7px;
  min-height: 80px;
  padding: 8px;
}

.sj7OHW_modelChoices .sj7OHW_choice strong {
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  display: flex;
}

.sj7OHW_modelChoices .sj7OHW_badge {
  white-space: nowrap;
  margin-left: 0;
}

.sj7OHW_hardwareSummary {
  color: var(--dsw-alias-label-secondary);
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 2px 10px;
  font-size: 11px;
  display: flex;
}

.sj7OHW_hardwareSummary small {
  font-size: 10px;
}

.sj7OHW_currentModel, .sj7OHW_switchRow, .sj7OHW_jobHeading {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.sj7OHW_currentModel {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  padding: 7px 8px;
  font-size: 12px;
}

.sj7OHW_currentModel > span, .sj7OHW_switchRow > span {
  overflow-wrap: anywhere;
  min-width: 0;
}

.sj7OHW_currentModel button, .sj7OHW_switchRow button {
  flex: none;
  min-height: 30px;
  padding: 0 9px;
}

.sj7OHW_switcher {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  gap: 7px;
  padding: 8px;
  display: grid;
}

.sj7OHW_switchRow small {
  display: block;
}

.sj7OHW_selectedModel {
  border-top: 1px solid var(--dsw-alias-border-l2);
  gap: 7px;
  padding-top: 6px;
  display: grid;
}

.sj7OHW_selectedModel .sj7OHW_details {
  padding-top: 4px;
}

.sj7OHW_selectedModel .sj7OHW_details summary {
  border: 0;
  padding: 3px 0;
}

.sj7OHW_installHistory {
  border-top: 1px solid var(--dsw-alias-border-l2);
}

.sj7OHW_installHistory > summary {
  cursor: pointer;
  padding: 8px 0;
  font-size: 12px;
  display: list-item;
}

.sj7OHW_installHistory > summary small {
  margin-left: 12px;
}

.sj7OHW_installHistory .sj7OHW_job {
  gap: 6px;
  padding: 9px;
}

.sj7OHW_jobHeading {
  flex-wrap: wrap;
}

.sj7OHW_installPath {
  min-width: 0;
  font-size: 11px;
}

.sj7OHW_installPath summary {
  cursor: pointer;
  color: var(--dsw-alias-label-secondary);
}

.sj7OHW_installPath p {
  overflow-wrap: anywhere;
}

.sj7OHW_modelInstaller .sj7OHW_jobs:empty {
  display: none;
}

@container (width <= 300px) {
  .sj7OHW_modelChoices {
    grid-template-columns: minmax(0, 1fr);
  }

  .sj7OHW_currentModel {
    flex-wrap: wrap;
  }
}

.sj7OHW_section[aria-label="\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84"] p {
  overflow-wrap: anywhere;
}

.sj7OHW_choice {
  transition: background-color .12s ease-out, border-color .12s ease-out, box-shadow .12s ease-out;
}

.sj7OHW_choice:hover:has(input:not(:disabled)) {
  border-color: var(--dsw-alias-brand-primary);
}

.sj7OHW_choice:has(input:focus-visible) {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: 2px;
}

.sj7OHW_section :is(button, select, input, summary), .sj7OHW_wizard :is(button, select, input, summary) {
  transition: background-color .12s ease-out,border-color .12s ease-out,color .12s ease-out,transform var(--whale-duration, .2s) var(--whale-ease, ease-out);
}

.sj7OHW_section button:hover:not(:disabled), .sj7OHW_wizard button:hover:not(:disabled) {
  background-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,var(--dsw-alias-bg-layer-1));
}

.sj7OHW_plan, .sj7OHW_switcher, .sj7OHW_selectedModel, .sj7OHW_section [data-whale-save-result], .sj7OHW_wizardBodyContent > section {
  animation: sj7OHW_setupEnter var(--whale-duration, .2s) ease-out;
}

[data-motion="firm"] :is(.sj7OHW_section, .sj7OHW_wizard) {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="off"] :is(.sj7OHW_section, .sj7OHW_wizard), [data-motion="off"] :is(.sj7OHW_section, .sj7OHW_wizard) *, [data-motion="off"] :is(.sj7OHW_section, .sj7OHW_wizard) :before {
  transition: none !important;
  animation: none !important;
}

[data-motion="off"] :is(.sj7OHW_section, .sj7OHW_wizard) button:active {
  transform: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .sj7OHW_section, .sj7OHW_wizard, .sj7OHW_section *, .sj7OHW_wizard *, .sj7OHW_section :before, .sj7OHW_wizard :before {
    transition: none !important;
    animation: none !important;
  }

  .sj7OHW_section button:active, .sj7OHW_wizard button:active {
    transform: none !important;
  }
}
`};var g=require("react/jsx-runtime"),Id=[["system","Windows \u7CFB\u7EDF\u8BED\u97F3","\u4F7F\u7528\u5DF2\u5B89\u88C5\u7684\u97F3\u8272\uFF0C\u65E0\u9700\u4E0B\u8F7D\u6717\u8BFB\u6A21\u578B"],["deepseek","DeepSeek \u8BED\u97F3\u5408\u6210","\u8054\u7F51\u8C03\u7528\u5B98\u65B9 API\uFF0C\u6309\u5B57\u7B26\u8BA1\u8D39"],["local","\u672C\u5730\u8BED\u97F3\u6A21\u578B","\u5728\u672C\u673A\u5408\u6210\uFF0C\u9996\u6B21\u9700\u8981\u4E0B\u8F7D"],["custom","\u81EA\u5B9A\u4E49 TTS","\u517C\u5BB9 OpenAI \u97F3\u9891\u63A5\u53E3\u7684\u8BED\u97F3\u670D\u52A1"],["off","\u4E0D\u53D1\u58F0","\u53EA\u663E\u793A\u6587\u5B57"]],Wi=Object.fromEntries(Id.map(([e,n])=>[e,n])),Li={provider:"system",systemVoiceId:null,deepseekVoice:"stella",deepseekTextTransmissionAccepted:!1,volume:.8,localModelId:null,localModelPath:null,referenceAudioPath:null},Wh={baseUrl:"",model:"",voice:"",apiKeyEnv:null,format:"wav",textTransmissionAccepted:!1},qh="\u8BF7\u5728 DSH \u7684 DeepSeek API Key \u63D0\u4F9B\u5546\u4E2D\u914D\u7F6E\u5F00\u653E\u5E73\u53F0\u5BC6\u94A5\uFF0C\u518D\u91CD\u65B0\u68C0\u67E5\u3002",Kh="\u6717\u8BFB\u548C\u8BD5\u542C\u4F1A\u5411 DeepSeek \u53D1\u9001\u5F85\u6717\u8BFB\u7684\u6587\u5B57\uFF0C\u6309\u5B57\u7B26\u7528\u91CF\u8BA1\u8D39\u3002",xr=e=>e.authorization?.scopes?.some(n=>n.id==="deepseek-text"&&n.allowed)===!0,Ji=e=>e.authorization?.scopes?.some(n=>n.id==="custom-tts-text"&&n.allowed)===!0,Gd=e=>{let n={...e};return delete n.referenceAudioAccepted,n},$d=(e,n)=>{let t=Gd(e);return delete t.customTts,{...t,referenceAudioAccepted:e.referenceAudioPath===n?.referenceAudioPath&&n?.referenceAudioAccepted===!0}},Rd=R.text,Jh=e=>({"restart-requires-resume":"\u5BBF\u4E3B\u5DF2\u91CD\u542F\uFF0C\u8BF7\u7EE7\u7EED\u540E\u91CD\u65B0\u6838\u9A8C\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u8986\u76D6\u8BBE\u7F6E\u3002","authorization-changed":"\u6388\u6743\u5DF2\u6539\u53D8\uFF0C\u8BF7\u5728\u6743\u9650\u4E2D\u6838\u67E5\u540E\u7EE7\u7EED\u3002",MODEL_SOURCE_AUTHORIZATION_REQUIRED:"\u6A21\u578B\u6765\u6E90\u6388\u6743\u5DF2\u53D8\u5316\uFF0C\u8BF7\u8865\u5145\u4E00\u6B21\u6388\u6743\u540E\u7EE7\u7EED\u3002",HUMAN_SETTING_PINNED:"\u8BBE\u7F6E\u6743\u9650\u5DF2\u64A4\u9500\uFF0C\u8BF7\u5728\u6743\u9650\u4E2D\u6838\u67E5\u540E\u7EE7\u7EED\u3002"})[e]??(typeof e=="string"&&/^[A-Z_:-]+$/.test(e)?"\u8FD0\u884C\u68C0\u67E5\u672A\u901A\u8FC7\uFF0C\u8BF7\u68C0\u67E5\u4F9D\u8D56\u6216\u67E5\u770B\u9AD8\u7EA7\u8BBE\u7F6E\u4E2D\u7684\u9519\u8BEF\u3002":e),An=e=>Number.isFinite(e)&&e>=0?`${(e/1024**2).toFixed(1)} MiB`:"\u672A\u77E5",Qh={"live-root-conflict":{kind:"conflict",label:"voiceRecoveryPending",hint:"voiceRecoveryHint"},"predecessor-cleanup-pending":{kind:"cleanup",label:"voiceCleanupPending",hint:"voiceCleanupHint"},"helper-cleanup-pending":{kind:"cleanup",label:"voiceCleanupPending",hint:"voiceHelperCleanupHint"},"predecessor-stop-unconfirmed":{kind:"restart",label:"voiceRestartPending",hint:"voiceRestartHint"},"helper-stop-unconfirmed":{kind:"restart",label:"voiceRestartPending",hint:"voiceHelperRestartHint"},"root-stop-unconfirmed":{kind:"restart",label:"voiceRestartPending",hint:"voiceRootRestartHint"}};function _r(e,n){return e.checkedFor!==n?null:Qh[e.status?.voiceSession?.recovery?.kind]??null}var Qi=e=>!e.ttsCancelling&&!e.voiceStopUnconfirmed&&(!e.busy||!!(e.interruptibleRead&&!e.diagnosticStopPending));function So(e,n){let t=e.checkedFor===n?e.status:null;return!e.uncertain&&t?.enabled===!1&&t.ownerSessionId===null&&t.voiceControlBusy===!1&&t.voiceSession?.fullyStopped===!0&&t.voiceSession.id===null&&!_r(e,n)}function Dd(e,n){return!!(So(e,n)&&e.settingsFor===n&&e.settings?.revision&&!e.ttsCancelling&&!e.ttsUncertain&&!e.visibilityUncertain&&!e.settingsConflict&&!e.status.ttsRuntime?.busy&&!e.status.ttsRuntime?.blocked)}function yt(e,n){return!e.busy&&Dd(e,n)}function jt(e,n){let t=(0,he.useRef)(!1),[o,i]=(0,he.useState)(!1),[r,s]=(0,he.useState)(null),[a,d]=(0,he.useState)(0);return[async(u,p)=>{if(t.current)return!1;t.current=!0,i(!0),s(u);try{return await e(n,u,p)}catch{return!1}finally{t.current=!1,i(!1),s(null),d(f=>f+1)}},o,r,{isLocked:()=>t.current,settled:a}]}function Pr({state:e,sessionId:n,run:t,refresh:o,canStopTts:i=!0,t:r=s=>s}){if(Dd(e,n))return null;let s=e.checkedFor===n?e.status:null,a=_r(e,n),d=e.settingsFor===n&&e.settings?.revision,l,u,p;e.voiceStopUnconfirmed?(l="\u505C\u6B62\u7ED3\u679C\u5C1A\u5F85\u786E\u8BA4\u3002",u=r("retryStatus"),p="status"):a?(l=r(a.hint),a.kind==="conflict"&&(u=r("voiceRecoveryCheck"),p="disable"),a.kind==="cleanup"&&(u=r("retryStatus"),p="status")):s?.enabled||s?.ownerSessionId?(l="\u8BF7\u5148\u505C\u6B62\u8BED\u97F3\uFF0C\u518D\u7F16\u8F91\u6216\u8BD5\u542C\u3002",u="\u505C\u6B62\u8BED\u97F3\u4EE5\u7F16\u8F91",p="disable"):e.settingsConflict?l="\u8BBE\u7F6E\u5DF2\u5728\u522B\u5904\u66F4\u65B0\u3002\u8BF7\u5148\u5904\u7406\u5F53\u524D\u8349\u7A3F\u3002":e.ttsCancelling||e.busy&&(!s||!d)?l="\u6B63\u5728\u8BFB\u53D6\u3001\u4FDD\u5B58\u6216\u505C\u6B62\u8BED\u97F3\uFF0C\u8BF7\u7A0D\u5019\u2026":s?.ttsRuntime?.blocked?l="\u6717\u8BFB\u505C\u6B62\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u91CD\u542F DSH\u3002":s?.ttsRuntime?.busy?(l="\u6717\u8BFB\u6B63\u5728\u8FDB\u884C\uFF0C\u7ED3\u675F\u540E\u53EF\u7F16\u8F91\u3002",i&&(u="\u505C\u6B62\u8BD5\u542C",p="cancel-tts")):e.ttsUncertain||e.uncertain||e.visibilityUncertain?(l="\u4E0A\u6B21\u64CD\u4F5C\u7684\u72B6\u6001\u5C1A\u5F85\u6838\u67E5\u3002",u=r("retryStatus"),p=e.visibilityUncertain||!s?"read-settings":"status"):!s||!d?(l=e.sourcePending&&!e.error?"\u6B63\u5728\u8BFB\u53D6\u8BED\u97F3\u72B6\u6001\u548C\u8BBE\u7F6E\u2026":"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u8BED\u97F3\u72B6\u6001\u6216\u8BBE\u7F6E\u3002",u="\u91CD\u65B0\u8BFB\u53D6",p=d?"status":"read-settings"):(l="\u8BED\u97F3\u5C1A\u672A\u786E\u8BA4\u505C\u6B62\u3002\u8BF7\u91CD\u65B0\u8BFB\u53D6\u72B6\u6001\u540E\u7F16\u8F91\u3002",u=r("retryStatus"),p="status");let f=()=>{p==="read-settings"&&o?o({settings:!0,force:!0}):t?.(n,p)};return(0,g.jsxs)("div",{className:R.note,role:"status","data-whale-settings-gate":a?.kind??p??"notice",children:[(0,g.jsx)("p",{children:l}),p&&t&&(0,g.jsx)(me.Button,{variant:"outline","data-whale-operation":p==="disable"?"stop-voice":void 0,disabled:p==="disable"?!Qi(e):p!=="cancel-tts"&&e.busy,onClick:f,children:u})]})}function Md(e){let n=e.state.settingsFor===e.sessionId?e.state.settings:null;return(0,g.jsx)(Hd,{...e,settings:n},`${e.sessionId}:${e.state.settingsKey??n?.revision??"unread"}`)}function Yh({value:e,disabled:n,onChange:t}){return(0,g.jsxs)("label",{className:R.inlineField,children:["DeepSeek \u97F3\u8272",(0,g.jsxs)("select",{"aria-label":"DeepSeek \u97F3\u8272",value:e,disabled:n,onChange:o=>t(o.target.value),children:[(0,g.jsx)("option",{value:"stella",children:"\u6D77\u661F \xB7 \u5973\u58F0"}),(0,g.jsx)("option",{value:"tide",children:"\u6697\u6F6E \xB7 \u7537\u58F0"})]})]})}function Xh({value:e,capabilities:n,disabled:t,inspecting:o,checkFailed:i,unavailable:r,onChange:s}){let a=n?.systemVoices??[];return(0,g.jsxs)("div",{className:R.section,"data-system-tts":!0,children:[(0,g.jsxs)("label",{className:R.field,children:["\u7CFB\u7EDF\u97F3\u8272",(0,g.jsxs)("select",{value:e??"",disabled:t||!a.length&&!e,onChange:d=>s(d.target.value||null),children:[(0,g.jsx)("option",{value:"",children:"\u81EA\u52A8\u9009\u62E9\uFF08\u6309\u6587\u5B57\u8BED\u8A00\uFF09"}),e&&!a.some(d=>d.id===e)&&(0,g.jsx)("option",{value:e,children:n?"\u5DF2\u9009\u97F3\u8272\u4E0D\u53EF\u7528":"\u5DF2\u4FDD\u5B58\u97F3\u8272"}),a.map(d=>(0,g.jsxs)("option",{value:d.id,children:[d.name," \xB7 ",d.language]},d.id))]})]}),o&&(0,g.jsx)("p",{className:R.hint,role:"status",children:"\u6B63\u5728\u8BFB\u53D6 Windows \u7CFB\u7EDF\u97F3\u8272\u2026"}),!o&&(i||n?.platform==="win32"&&!n.systemVoices)&&(0,g.jsx)("p",{className:R.hint,role:"status",children:"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6 Windows \u7CFB\u7EDF\u97F3\u8272\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5\u3002"}),n?.platform!==void 0&&n.platform!=="win32"&&(0,g.jsx)("p",{className:R.hint,role:"status",children:"\u6B64\u8BBE\u5907\u65E0\u6CD5\u4F7F\u7528 Windows \u7CFB\u7EDF\u8BED\u97F3\uFF0C\u8BF7\u9009\u62E9\u5176\u4ED6\u6717\u8BFB\u6765\u6E90\u3002"}),n?.systemVoices?.length===0&&(0,g.jsx)("p",{className:R.hint,role:"status",children:"\u8BF7\u5728 Windows \u7684\u8BED\u97F3\u8BBE\u7F6E\u4E2D\u5B89\u88C5\u97F3\u8272\uFF0C\u518D\u5237\u65B0\u5217\u8868\u3002"}),r&&a.length>0&&(0,g.jsx)("p",{className:R.hint,role:"status",children:"\u5DF2\u9009\u97F3\u8272\u4E0D\u53EF\u7528\uFF0C\u8BF7\u4ECE\u5217\u8868\u9009\u62E9\u5176\u4ED6\u97F3\u8272\u3002"})]})}function eg({baseUrl:e,model:n,voice:t,apiKeyEnv:o}){let i=/[\x00-\x1f\x7f-\x9f]/;if(!e.trim()||!n.trim()||!t.trim())return"\u8BF7\u586B\u5199\u670D\u52A1\u5730\u5740\u3001\u6A21\u578B\u548C\u97F3\u8272\u3002";let r=e.trim(),s=/^https?:\/\/([^/]+)/i.exec(r)?.[1],a;try{a=new URL(r)}catch{}return!a||!s||/[\s\\?#]/.test(r)||s.includes("@")||i.test(e)||a.protocol==="http:"&&!/^(?:localhost|127\.0\.0\.1|\[::1\])(?::[0-9]+)?$/i.test(s)?"\u8BF7\u4F7F\u7528 HTTPS \u5730\u5740\u3002\u672C\u673A\u7684 localhost\u3001127.0.0.1 \u548C [::1] \u4E5F\u53EF\u4F7F\u7528 HTTP\u3002\u5730\u5740\u4E0D\u80FD\u5305\u542B\u8D26\u53F7\u3001\u5BC6\u7801\u3001\u67E5\u8BE2\u53C2\u6570\u6216\u7247\u6BB5\u3002":i.test(n)||i.test(t)?"\u6A21\u578B\u548C\u97F3\u8272\u4E0D\u80FD\u5305\u542B\u63A7\u5236\u5B57\u7B26\u3002":o?.trim()&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(o.trim())?"API Key \u73AF\u5883\u53D8\u91CF\u540D\u53EA\u80FD\u5305\u542B\u82F1\u6587\u5B57\u6BCD\u3001\u6570\u5B57\u548C\u4E0B\u5212\u7EBF\uFF0C\u4E14\u4E0D\u80FD\u4EE5\u6570\u5B57\u5F00\u5934\u3002":null}function ng({value:e,disabled:n,fieldError:t,onChange:o,onConsent:i}){return(0,g.jsxs)("div",{className:R.section,"data-custom-tts":!0,children:[(0,g.jsxs)("label",{className:R.field,children:["\u670D\u52A1\u5730\u5740\uFF08Base URL\uFF09",(0,g.jsx)(me.Input,{value:e.baseUrl,disabled:n,maxLength:2048,inputMode:"url",autoComplete:"off",spellCheck:!1,placeholder:"https://tts.example.com/v1",onChange:r=>o("baseUrl",r.target.value)}),(0,g.jsx)("small",{children:"\u53EF\u586B\u5199\u57FA\u7840\u5730\u5740\u6216\u4EE5 /audio/speech \u7ED3\u5C3E\u7684\u5B8C\u6574\u63A5\u53E3\u5730\u5740\u3002"})]}),(0,g.jsxs)("label",{className:R.field,children:["\u6A21\u578B",(0,g.jsx)(me.Input,{value:e.model,disabled:n,maxLength:256,autoComplete:"off",spellCheck:!1,onChange:r=>o("model",r.target.value)})]}),(0,g.jsxs)("label",{className:R.field,children:["\u97F3\u8272",(0,g.jsx)(me.Input,{value:e.voice,disabled:n,maxLength:256,autoComplete:"off",spellCheck:!1,onChange:r=>o("voice",r.target.value)})]}),(0,g.jsxs)("label",{className:R.field,children:["API Key \u73AF\u5883\u53D8\u91CF\u540D\uFF08\u53EF\u9009\uFF09",(0,g.jsx)(me.Input,{value:e.apiKeyEnv??"",disabled:n,maxLength:128,autoComplete:"off",spellCheck:!1,placeholder:"MY_TTS_API_KEY",onChange:r=>o("apiKeyEnv",r.target.value)}),(0,g.jsx)("small",{children:"\u5728\u8FD0\u884C DSH \u7684\u73AF\u5883\u4E2D\u8BBE\u7F6E\u5BC6\u94A5\uFF0C\u8FD9\u91CC\u53EA\u586B\u53D8\u91CF\u540D\u3002\u670D\u52A1\u65E0\u9700\u5BC6\u94A5\u65F6\u53EF\u7559\u7A7A\u3002"})]}),(0,g.jsxs)("label",{className:R.inlineField,children:["\u97F3\u9891\u683C\u5F0F",(0,g.jsxs)("select",{value:e.format,disabled:n,onChange:r=>o("format",r.target.value),children:[(0,g.jsx)("option",{value:"wav",children:"WAV"}),(0,g.jsx)("option",{value:"mp3",children:"MP3"})]})]}),(0,g.jsx)("p",{className:R.hint,children:"\u6717\u8BFB\u4F1A\u5411\u670D\u52A1\u53D1\u9001\u56DE\u7B54\u4E2D\u5F85\u6717\u8BFB\u7684\u6587\u5B57\u3002\u4FDD\u5B58\u8BBE\u7F6E\u540E\u53EF\u53D1\u9001\u56FA\u5B9A\u793A\u4F8B\u8BD5\u542C\u3002"}),(0,g.jsxs)("label",{className:R.inlineField,children:[(0,g.jsx)("input",{type:"checkbox",checked:e.textTransmissionAccepted,disabled:n,onChange:r=>i(r.target.checked)}),"\u540C\u610F\u53D1\u9001\u5F85\u6717\u8BFB\u7684\u6587\u5B57"]}),t&&(0,g.jsx)("p",{className:R.hint,role:"status",children:t})]})}function Hd({state:e,sessionId:n,run:t,settings:o,prepared:i=!1,active:r=!0,markSettingsEdited:s,pickPath:a,renderStep:d,advanceTts:l}){let[u,p]=(0,he.useState)(()=>({...Li,...o?.ttsSetup})),f=JSON.stringify(o?.ttsSetup),[m,b]=(0,he.useState)(f),[v,w]=(0,he.useState)(null),[k,z,H]=jt(t,n),B=(0,he.useId)(),[O,I]=(0,he.useState)(!1),E=(0,he.useRef)(!1),G=!!d;G&&o&&f!==m&&(b(f),p({...Li,...o.ttsSetup}),w(null));let S=e.ttsCapabilitiesFor===n?e.ttsCapabilities:null,_=e.checkedFor===n?e.status?.ttsRuntime:null,T=e.ttsPreviewFor===n?e.ttsPreview:null,N=e.installerFor===n?e.installer?.jobs?.find(ge=>kr(ge,o)):null,P=!yt(e,n)||z,C=u.provider==="system",F=u.provider==="deepseek",V=u.provider==="custom",Z=()=>{E.current=!0,k("inspect-tts")};(0,he.useEffect)(()=>{G&&r&&!P&&o&&!S&&!E.current&&(C||F)&&Z()},[G,r,P,o,S,C,F]);let J=S?.systemVoices??[],q=!!(S&&u.systemVoiceId&&!J.some(ge=>ge.id===u.systemVoiceId)),ae=J.length>0&&!q,le={...Li,...o?.ttsSetup},{customTts:pe,...xe}=u,A=V?pe:le.customTts,oe=A?{...xe,customTts:A}:xe,X=Object.entries(oe).some(([ge,Ee])=>JSON.stringify(Ee)!==JSON.stringify(le[ge])),U=pe??Wh,_e=V?eg(U):null,on=Ji(e),Fe=V&&(e.authorizationUncertain||le.customTts?.textTransmissionAccepted&&!e.authorization),_n=V&&!on,Ye=(v?.revision===e.authorization?.revision?v?.accepted:void 0)??(U.textTransmissionAccepted&&on),re=F&&(e.authorizationUncertain||u.deepseekTextTransmissionAccepted&&!e.authorization),De=F&&!re&&!(u.deepseekTextTransmissionAccepted&&xr(e)),Ie=F&&S?.deepseekKeyAvailable!==!0,Ge=ge=>{s?.("save-tts"),p(Ee=>({...Ee,...ge}))},wt=(ge,Ee)=>{U[ge]!==Ee&&(w(null),Ge({customTts:{...U,[ge]:Ee,textTransmissionAccepted:!1}}))},nt=ge=>{w({revision:e.authorization?.revision,accepted:ge}),Ge({customTts:{...U,textTransmissionAccepted:ge}})},Ne=u.localModelId==="qwen3-tts-base-1.7b-gguf",Xe=Number(u.volume),Pn=!!(u.localModelId&&u.localModelPath)&&(!G||le.provider==="local")&&(!u.referenceAudioPath||Ne),Bn=!Ie&&!re&&(!V||!_e&&!Fe&&Ye)&&(u.provider!=="local"||Pn)&&u.volume!==""&&Number.isFinite(Xe)&&Xe>=0&&Xe<=1,cn={...oe,volume:Xe,deepseekTextTransmissionAccepted:F||u.deepseekTextTransmissionAccepted};V&&(cn.customTts={...U,baseUrl:U.baseUrl.trim(),model:U.model.trim(),voice:U.voice.trim(),apiKeyEnv:U.apiKeyEnv?.trim()||null,textTransmissionAccepted:Ye});let xt=o&&(X||De||_n||!o.ttsSetup),fn=C||!V&&(X||De),kn=async()=>{let ge=await k("save-tts",{revision:o.revision,values:Gd(cn)});return ge&&(G&&b(null),w(null)),ge},Sn=_?.busy||_?.blocked||e.ttsUncertain||e.ttsCancelling||T?.status==="preparing"||H==="preview-tts",_t=(0,g.jsxs)(g.Fragment,{children:[(!G||u.provider!=="off")&&(0,g.jsx)(me.Button,{variant:"outline",disabled:P||!o||!Bn||u.provider==="off"||C&&!ae||V&&(X||!on),onClick:()=>k("preview-tts",fn?{revision:o.revision,values:$d(cn,o.ttsSetup)}:void 0),children:C?"\u8BD5\u542C\u7CFB\u7EDF\u97F3\u8272":De?"\u53D1\u9001\u793A\u4F8B\u5E76\u8BD5\u542C":!V&&X?"\u8BD5\u542C\u5F53\u524D\u9009\u62E9":"\u8BD5\u542C\u5DF2\u4FDD\u5B58\u914D\u7F6E"}),(0,g.jsx)(me.Button,{variant:"outline",disabled:!Sn,onClick:()=>{t(n,"cancel-tts")},children:"\u505C\u6B62\u8BD5\u542C"})]}),En=G&&C,te=T&&(0,g.jsxs)("p",{role:"status",className:R.hint,children:[{preparing:"\u8BD5\u542C\u51C6\u5907\u4E2D",cancelling:"\u6B63\u5728\u505C\u6B62\u8BD5\u542C",cancelled:"\u8BD5\u542C\u5DF2\u53D6\u6D88",idle:"\u8BD5\u542C\u5DF2\u505C\u6B62",completed:"\u8BD5\u542C\u5DF2\u7ED3\u675F",failed:T.detail??"\u8BD5\u542C\u5931\u8D25\uFF0C\u6B63\u5728\u6838\u67E5\u72B6\u6001",unconfirmed:"\u65E0\u6CD5\u786E\u8BA4\u8BD5\u542C\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B"}[T.status]??T.status,Wi[T.provider]?` \xB7 ${Wi[T.provider]}`:""]}),hn=(!G||u.provider!=="off"||Sn)&&(0,g.jsxs)("div",{className:R.actions,children:[(!G||V)&&(0,g.jsx)(me.Button,{variant:"primary",className:R.primary,disabled:P||!Bn||!xt,onClick:()=>{kn()},children:H==="save-tts"?"\u4FDD\u5B58\u4E2D\u2026":De?"\u542F\u7528 DeepSeek \u6717\u8BFB":"\u4FDD\u5B58\u6717\u8BFB\u8BBE\u7F6E"}),!En&&_t,C&&(0,g.jsx)(me.Button,{variant:"outline",disabled:P,onClick:Z,children:"\u5237\u65B0\u7CFB\u7EDF\u97F3\u8272"})]}),gn=(0,g.jsxs)("section",{className:R.section,"aria-label":"\u6717\u8BFB\u8BBE\u7F6E","data-settings-draft":"save-tts",children:[(0,g.jsx)("h3",{tabIndex:G?-1:void 0,children:G?"\u600E\u4E48\u542C\u56DE\u7B54\uFF1F":"\u56DE\u7B54\u600E\u4E48\u53D1\u58F0"}),!i&&(0,g.jsx)(Pr,{state:e,sessionId:n,run:t,canStopTts:!1}),!G&&!C&&!F&&!V&&(!i||!o||!S||e.uncertain||e.ttsUncertain)&&(0,g.jsx)("div",{className:R.actions,children:(0,g.jsx)(me.Button,{variant:"outline",disabled:e.busy||z,onClick:Z,children:"\u68C0\u6D4B\u672C\u673A\u8BED\u97F3"})}),(0,g.jsxs)("fieldset",{className:`${R.choices} ${R.sourceChoices}`,disabled:P||!o,children:[(0,g.jsx)("legend",{children:"\u6717\u8BFB\u6765\u6E90"}),Id.map(([ge,Ee,Fn])=>(0,g.jsxs)("label",{className:R.choice,"data-selected":u.provider===ge,children:[(0,g.jsx)("input",{type:"radio",name:G?"setup-provider":B,checked:u.provider===ge,onChange:()=>Ge({provider:ge})}),(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:Ee}),(0,g.jsx)("small",{children:Fn})]})]},ge))]}),C&&(0,g.jsx)(Xh,{value:u.systemVoiceId,capabilities:S,disabled:P,inspecting:H==="inspect-tts",checkFailed:E.current&&!z&&!S&&!!e.error,unavailable:q,onChange:ge=>Ge({systemVoiceId:ge})}),F&&(0,g.jsxs)("div",{className:R.section,"data-whale-deepseek-setup":!0,children:[(0,g.jsx)("p",{className:R.hint,children:Kh}),re&&(0,g.jsx)("p",{role:"status",className:R.hint,children:"\u6B63\u5728\u8BFB\u53D6 DeepSeek \u6717\u8BFB\u6388\u6743\u2026"}),De&&(0,g.jsx)("p",{className:R.hint,children:"\u542F\u7528\u524D\uFF0C\u56DE\u7B54\u53EA\u663E\u793A\u6587\u5B57\u3002\u8BD5\u542C\u53EA\u53D1\u9001\u56FA\u5B9A\u793A\u4F8B\u3002"}),Ie&&(H==="inspect-tts"?(0,g.jsx)("p",{role:"status",className:R.hint,children:"\u6B63\u5728\u68C0\u67E5 DSH \u4E2D\u4FDD\u5B58\u7684 DeepSeek API Key\u2026"}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("p",{role:"status",className:R.hint,children:S?qh:"\u6682\u65F6\u65E0\u6CD5\u68C0\u67E5 DeepSeek API Key\u3002"}),(0,g.jsx)(me.Button,{variant:"outline",disabled:e.busy||z,onClick:Z,children:S?"\u91CD\u65B0\u68C0\u67E5 DeepSeek API Key":"\u68C0\u67E5 DeepSeek API Key"})]})),(0,g.jsx)(Yh,{value:u.deepseekVoice,disabled:P,onChange:ge=>Ge({deepseekVoice:ge})})]}),V&&(0,g.jsx)(ng,{value:{...U,textTransmissionAccepted:Ye},disabled:P||Fe,fieldError:Fe?"\u6B63\u5728\u8BFB\u53D6\u81EA\u5B9A\u4E49 TTS \u6717\u8BFB\u6388\u6743\u2026":_e,onChange:wt,onConsent:nt}),u.provider==="local"&&(u.localModelId&&!G?(0,g.jsxs)("div",{className:R.section,children:[(0,g.jsxs)("div",{className:R.currentModel,children:[(0,g.jsxs)("span",{children:["\u5F53\u524D\u6717\u8BFB\u6A21\u578B ",(0,g.jsx)("strong",{children:u.localModelId.startsWith("qwen3")?"Qwen3-TTS":u.localModelId.includes("melo")?"MeloTTS":u.localModelId})]}),(0,g.jsx)(me.Button,{variant:"outline","aria-expanded":O,disabled:X,onClick:()=>I(ge=>!ge),children:"\u5207\u6362\u5F53\u524D\u6A21\u578B"})]}),O&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(Bd,{state:e,sessionId:n,run:t,purpose:"tts"}),(0,g.jsxs)("details",{className:R.details,children:[(0,g.jsx)("summary",{children:"\u5B89\u88C5\u5176\u4ED6\u6717\u8BFB\u6A21\u578B"}),(0,g.jsx)(Ki,{pickPath:a,state:e,sessionId:n,run:t,active:r})]})]})]}):(0,g.jsx)(Ki,{pickPath:a,state:e,sessionId:n,run:t,active:r,onboarding:G,initialModelId:u.localModelId})),u.provider==="local"&&!X&&N?.modelId==="qwen3-tts-base-1.7b-gguf"&&(0,g.jsxs)("p",{className:R.hint,children:["\u5F53\u524D\u5B89\u88C5\u65B9\u6848\uFF1A",Eo(N.compute),"\u3002",N.compute==="cpu"?"\u6B64\u5B89\u88C5\u53EA\u4F7F\u7528 CPU\u3002\u53EF\u5728\u201C\u5207\u6362\u5F53\u524D\u6A21\u578B \u2192 \u5B89\u88C5\u5176\u4ED6\u6717\u8BFB\u6A21\u578B\u201D\u9009\u62E9\u81EA\u52A8 GPU\uFF1B\u4E0B\u8F7D\u8FD0\u884C\u7EC4\u4EF6\u524D\u4ECD\u9700\u786E\u8BA4\u3002":"\u662F\u5426\u5B9E\u9645\u4F7F\u7528 GPU\uFF0C\u4EE5\u5B8C\u6210\u5408\u6210\u540E\u7684\u672C\u5730\u8BA1\u7B97\u72B6\u6001\u4E3A\u51C6\u3002"]}),hn,!G&&(0,g.jsxs)("details",{className:R.details,children:[(0,g.jsx)("summary",{children:"\u97F3\u8272\u4E0E\u97F3\u91CF"}),(0,g.jsxs)("div",{className:R.section,children:[u.provider==="local"&&(Ne||u.referenceAudioPath)&&(0,g.jsxs)("div",{className:R.section,"data-reference-voice":!0,children:[(0,g.jsx)(_o,{className:R.field,label:"\u53C2\u8003\u97F3\u9891\uFF08WAV\uFF09",kind:"referenceAudio",value:u.referenceAudioPath,disabled:P||!Ne,active:r,scope:u.provider+":"+u.localModelId,pickPath:a,sessionId:n,placeholder:"\u8BF7\u70B9\u51FB\u9009\u62E9\u6587\u4EF6",onChange:ge=>Ge({referenceAudioPath:ge.trim()||null})}),u.referenceAudioPath&&(0,g.jsx)(me.Button,{variant:"outline",disabled:P,onClick:()=>Ge({referenceAudioPath:null}),children:"\u6E05\u9664\u53C2\u8003\u97F3\u8272"})]}),u.provider!=="local"&&u.referenceAudioPath&&(0,g.jsxs)("div",{className:R.section,children:[(0,g.jsx)("p",{className:R.hint,children:"\u672C\u5730\u53C2\u8003\u97F3\u8272\u5DF2\u4FDD\u7559\u3002"}),(0,g.jsx)(me.Button,{variant:"outline",disabled:P,onClick:()=>Ge({referenceAudioPath:null}),children:"\u6E05\u9664\u53C2\u8003\u97F3\u8272"})]}),(0,g.jsxs)("label",{className:R.inlineField,children:["\u6717\u8BFB\u97F3\u91CF",(0,g.jsx)(Kt,{"aria-label":"\u6717\u8BFB\u97F3\u91CF\u6ED1\u5757",min:"0",max:"1",step:"0.05",value:u.volume,disabled:P,onChange:ge=>Ge({volume:Number(ge.target.value)})}),(0,g.jsx)(me.Input,{type:"number",min:"0",max:"1",step:"0.05",value:u.volume,disabled:P,onChange:ge=>Ge({volume:ge.target.value})})]})]})]}),!En&&te,!G&&_&&(0,g.jsxs)("p",{role:"status",className:R.hint,children:[_.blocked?"\u8BD5\u542C\u5C1A\u672A\u505C\u6B62\uFF0C\u8BF7\u91CD\u542F\u5BBF\u4E3B\u3002":`\u6717\u8BFB\u72B6\u6001\uFF1A${{idle:"\u7A7A\u95F2",preparing:"\u51C6\u5907\u4E2D",synthesizing:"\u5408\u6210\u4E2D","playback-requested":"\u5DF2\u8BF7\u6C42\u64AD\u653E","text-only":"\u5DF2\u663E\u793A\u6587\u5B57",completed:"\u8BD5\u542C\u5DF2\u7ED3\u675F",cancelled:"\u5DF2\u53D6\u6D88",failed:"\u5931\u8D25"}[_.state]??_.state}`,_.localComputeBackend?` \xB7 \u672C\u5730\u8BA1\u7B97\uFF1A${_.localComputeBackend.toUpperCase()}${_.localComputeVerified?"\uFF08\u5DF2\u5B8C\u6210\u5408\u6210\uFF09":"\uFF08\u5F85\u9A8C\u8BC1\uFF09"}`:"",_.localComputeFallback?" \xB7 \u5DF2\u56DE\u9000\u540C\u6A21\u578B CPU":""]}),!G&&_?.localTimings&&(0,g.jsxs)("details",{className:R.details,children:[(0,g.jsx)("summary",{children:"\u5DF2\u5B8C\u6210\u6717\u8BFB\u7247\u6BB5\u8017\u65F6"}),(0,g.jsxs)("p",{className:R.hint,children:["\u51C6\u5907 ",(_.localTimings.preparationMs/1e3).toFixed(2)," \u79D2 \xB7 \u8BBE\u5907\u9009\u62E9 ",(_.localTimings.deviceSelectionMs/1e3).toFixed(2)," \u79D2 \xB7 \u5408\u6210 ",(_.localTimings.synthesisMs/1e3).toFixed(2)," \u79D2 \xB7 \u64AD\u653E ",(_.localTimings.playbackMs/1e3).toFixed(2)," \u79D2"]}),(0,g.jsxs)("p",{className:R.hint,children:[_.localTimings.chunks," \u6BB5 \xB7 ",_.localTimings.modelResident?"\u4E0A\u6B21\u7247\u6BB5\u7ED3\u675F\u65F6\u6A21\u578B\u4ECD\u9A7B\u7559\uFF0C\u5B8C\u6574\u5408\u6210\u540E\u64AD\u653E\u3002\u51C6\u5907\u5305\u542B\u6587\u4EF6\u6821\u9A8C\uFF1B\u5408\u6210\u5305\u542B\u9996\u6B21\u52A0\u8F7D\u548C\u670D\u52A1\u54CD\u5E94\u3002":"\u5F53\u524D\u672C\u5730\u6A21\u578B\u9010\u6BB5\u542F\u52A8\uFF0C\u5B8C\u6574\u5408\u6210\u540E\u64AD\u653E\u3002\u51C6\u5907\u5305\u542B\u6587\u4EF6\u6821\u9A8C\uFF1B\u5408\u6210\u5305\u542B\u52A0\u8F7D\u4E0E\u5931\u8D25\u91CD\u8BD5\u3002","\u8017\u65F6\u4E0D\u662F\u9996\u97F3\u5EF6\u8FDF\u6216 GPU \u52A0\u901F\u6BD4\u3002"]})]})]});return G?d(gn,{pending:z,disabled:P||!o||!Bn,label:H==="save-tts"?"\u4FDD\u5B58\u4E2D\u2026":De?"\u542F\u7528 DeepSeek \u8BED\u97F3\u5408\u6210\u5E76\u7EE7\u7EED":"\u4E0B\u4E00\u6B65",onClick:()=>l(xt?kn:null),audition:En?_t:null,feedback:En?te:null}):gn}function kr(e,n){if(e.status!=="installed"||!e.installedPath||!n)return!1;if(e.purpose==="tts"||e.recommendedSettings?.tts)return n.ttsSetup?.provider==="local"&&n.ttsSetup.localModelId===e.modelId&&n.ttsSetup.localModelPath===e.installedPath;let t=e.recommendedSettings;return!t||t.asr!==n.modelSetup?.asr?!1:Object.entries(t.models??{}).some(([o,i])=>i===e.installedPath&&n.modelSetup?.models?.[o]===i)}function Zd(e,n){return(e?.models??[]).map(t=>{let o=(e.jobs??[]).filter(s=>s.modelId===t.id),i=o.filter(s=>s.status==="installed").sort((s,a)=>String(a.updatedAt??a.createdAt??"").localeCompare(String(s.updatedAt??s.createdAt??""))),r=i.find(s=>kr(s,n));return{model:t,jobs:o,installed:i,current:r,preferred:r??i[0],active:o.find(s=>["queued","running","paused","failed"].includes(s.status))}})}var Sr=e=>(e?.title??e?.id??"").split(" \xB7 ")[0],Eo=e=>({cpu:"CPU",auto:"\u81EA\u52A8 GPU",cuda:"CUDA / HIP",vulkan:"Vulkan"})[e]??e??"\u672A\u77E5",Yi=e=>{let n=new Date(e);return Number.isFinite(n.getTime())?n.toLocaleString():"\u65F6\u95F4\u672A\u77E5"};function Bd({state:e,sessionId:n,run:t,purpose:o}){let[i,r]=jt(t,n),s=e.installerFor===n?e.installer:null,a=e.settingsFor===n?e.settings:null,d=Zd(s,a).filter(u=>(!o||u.model.purpose===o)&&u.preferred),l=yt(e,n)&&!r&&!e.settingsDraftActions?.some(u=>["save-models","save-tts"].includes(u));return(0,g.jsxs)("section",{className:R.switcher,"aria-label":"\u5207\u6362\u5DF2\u5B89\u88C5\u6A21\u578B","data-no-settings-draft":!0,children:[s?d.length?d.map(({model:u,preferred:p,current:f})=>(0,g.jsxs)("div",{className:R.switchRow,children:[(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:Sr(u)}),(0,g.jsxs)("small",{children:[u.purpose==="tts"?"\u6717\u8BFB":"\u8BC6\u522B"," \xB7 ",Eo(p.compute),f?" \xB7 \u5F53\u524D\u914D\u7F6E":""]})]}),(0,g.jsxs)("div",{className:R.actions,children:[u.purpose==="tts"&&!f&&(0,g.jsx)(me.Button,{variant:"outline",disabled:!l||!p.installedPath,onClick:()=>i("preview-tts",{revision:a.revision,values:$d({...a.ttsSetup,provider:"local",localModelId:u.id,localModelPath:p.installedPath,referenceAudioPath:null},a.ttsSetup)}),children:"\u5148\u8BD5\u542C"}),(0,g.jsx)(me.Button,{variant:"outline",disabled:!l||!!f,onClick:()=>i("apply-model-install",{id:p.id,revision:a.revision}),children:f?"\u5F53\u524D\u6A21\u578B":"\u9A8C\u8BC1\u5E76\u5207\u6362"})]})]},u.id)):(0,g.jsx)("p",{className:R.hint,children:"\u5C1A\u65E0\u53EF\u5207\u6362\u7684\u5DF2\u5B89\u88C5\u6A21\u578B\uFF0C\u8BF7\u5148\u5728\u6A21\u578B\u4E0B\u8F7D\u4E2D\u5B89\u88C5\u3002"}):(0,g.jsx)("p",{className:R.hint,children:"\u6B63\u5728\u8BFB\u53D6\u5DF2\u5B89\u88C5\u6A21\u578B\u3002"}),!!d.length&&!l&&(0,g.jsx)("p",{className:R.hint,children:"\u5207\u6362\u6A21\u578B\u524D\u9700\u505C\u6B62\u8BED\u97F3\uFF0C\u5DF2\u5B89\u88C5\u6587\u4EF6\u4E0D\u4F1A\u91CD\u65B0\u4E0B\u8F7D\u3002"})]})}function qi({job:e,snapshot:n,settings:t,disabled:o,writable:i,execute:r,history:s=!1}){let a=e.status==="blocked",d=kr(e,t);return(0,g.jsxs)("article",{className:R.job,"data-model-job":e.id,children:[(0,g.jsxs)("div",{className:R.jobHeading,children:[(0,g.jsx)("strong",{children:Sr(n.models.find(l=>l.id===e.modelId))||e.modelId}),(0,g.jsxs)("small",{children:[Eo(e.compute)," \xB7 ",Yi(e.createdAt)]})]}),(0,g.jsxs)("p",{role:"status",children:[d?"\u5F53\u524D\u914D\u7F6E \xB7 ":"",a?e.error?.code==="CATALOG_CHANGED"?"\u5B89\u88C5\u6E05\u5355\u5DF2\u53D8\u66F4\uFF0C\u65E7\u4EFB\u52A1\u5DF2\u9694\u79BB":"\u6B64\u5B89\u88C5\u4EFB\u52A1\u5DF2\u505C\u6B62":{queued:"\u7B49\u5F85\u4E2D",running:"\u5904\u7406\u4E2D",paused:"\u5DF2\u6682\u505C",failed:"\u5931\u8D25",cancelled:"\u5DF2\u53D6\u6D88",installed:"\u5DF2\u5B89\u88C5\uFF0C\u5B57\u8282\u6821\u9A8C\u901A\u8FC7","checking-runtime":"\u68C0\u67E5\u8FD0\u884C\u4F9D\u8D56","verifying-local":"\u6821\u9A8C\u672C\u673A\u5DF2\u6709\u6A21\u578B",downloading:"\u4E0B\u8F7D\u4E2D",verifying:"\u6821\u9A8C\u6587\u4EF6",installing:"\u63D0\u4EA4\u5B89\u88C5"}[e.stage]??e.stage]}),!a&&!s&&Number.isFinite(e.totalBytes)&&e.totalBytes>0&&Number.isFinite(e.receivedBytes)&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("progress",{max:e.totalBytes,value:Math.min(e.receivedBytes,e.totalBytes),"aria-label":"\u4E0B\u8F7D\u5B57\u8282\u8FDB\u5EA6"}),(0,g.jsxs)("small",{children:["\u4E0B\u8F7D ",An(e.receivedBytes)," / ",An(e.totalBytes)]})]}),e.error&&(0,g.jsx)("p",{role:"alert",children:e.error.message}),s&&e.installedPath&&(0,g.jsxs)("details",{className:R.installPath,children:[(0,g.jsx)("summary",{children:"\u5B89\u88C5\u4F4D\u7F6E"}),(0,g.jsx)("p",{children:e.installedPath})]}),!a&&(0,g.jsxs)("div",{className:R.actions,children:[["queued","running"].includes(e.status)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:o,onClick:()=>r("control-model-install",{id:e.id,operation:"pause"}),children:"\u6682\u505C\uFF0C\u4FDD\u7559\u8FDB\u5EA6"}),["paused","failed"].includes(e.status)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:o,onClick:()=>r("control-model-install",{id:e.id,operation:"resume"}),children:"\u7EE7\u7EED\u4E0B\u8F7D"}),["queued","running","paused","failed"].includes(e.status)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:o,onClick:()=>r("control-model-install",{id:e.id,operation:"cancel"}),children:"\u53D6\u6D88\u5E76\u6E05\u9664\u6B64\u4EFB\u52A1\u4E34\u65F6\u6587\u4EF6"}),e.status==="installed"&&!d&&(0,g.jsx)(me.Button,{variant:"outline",disabled:!i,onClick:()=>r("apply-model-install",{id:e.id,revision:t.revision}),children:"\u9A8C\u8BC1\u5E76\u5207\u6362"})]}),e.status==="installed"&&(0,g.jsx)("small",{children:"\u5207\u6362\u524D\u8BF7\u7ED3\u675F\u5BF9\u8BDD\u3002\u4E0B\u6B21\u5F00\u59CB\u5BF9\u8BDD\u65F6\u4F7F\u7528\u65B0\u6A21\u578B\u3002"})]})}function Fd({state:e,sessionId:n,run:t}){let[o,i]=(0,he.useState)(""),[r,s]=(0,he.useState)("cpu"),[a,d]=(0,he.useState)(!1),[l,u]=jt(t,n),p=e.installerFor===n?e.installer:null,f=e.settingsFor===n?e.settings:null,m=Zd(p,f).filter(E=>E.model.id!=="sensevoice-int8-2024-07-17"||E.active),b=m.find(E=>E.model.id===o),v=b?.model,w=e.installPlanFor===n&&e.installPlan?.modelId===o&&e.installPlan?.compute===r&&!e.installPlan?.sourceDirectory?e.installPlan:null,k=!!e.busy||e.uncertain||e.installerUncertain||u,z=!u&&yt(e,n)&&!e.settingsDraftActions?.some(E=>["save-models","save-tts"].includes(E)),H=(0,he.useId)(),B=(p?.jobs??[]).filter(E=>["installed","cancelled"].includes(E.status)).slice().reverse(),O=p?.hardware,I=p?.refresh?.observedAt??p?.compute?.observedAt;return(0,g.jsxs)("section",{className:`${R.section} ${R.modelInstaller}`,"aria-label":"\u6A21\u578B\u5B89\u88C5",children:[(0,g.jsxs)("div",{className:R.hardwareSummary,children:[(0,g.jsxs)("span",{children:["\u5185\u5B58 ",An(O?.totalMemoryBytes)," \xB7 \u53EF\u7528 ",An(O?.availableMemoryBytes)," \xB7 \u663E\u5B58 ",An(O?.gpuMemoryBytes)]}),(0,g.jsxs)("small",{children:[I?"\u66F4\u65B0\u4E8E "+Yi(I):"\u7B49\u5F85\u68C0\u6D4B"," \xB7 \u6BCF 5 \u5206\u949F"]})]}),(p?.refresh?.error||e.modelComputeError)&&(0,g.jsxs)("p",{className:R.hint,role:"status",children:[p?.refresh?.error??"\u672C\u6B21\u786C\u4EF6\u68C0\u6D4B\u672A\u5B8C\u6210","\uFF1B\u4FDD\u7559\u4E0A\u6B21\u7ED3\u679C\u3002"]}),e.installerError&&(0,g.jsx)("p",{role:"alert",className:R.note,children:e.installerError}),e.installerUncertain&&(0,g.jsx)("p",{role:"status",className:R.note,children:"\u6B63\u5728\u6838\u67E5\u5B89\u88C5\u72B6\u6001\u3002"}),(0,g.jsxs)("div",{className:R.currentModel,children:[(0,g.jsxs)("span",{children:["\u8BC6\u522B ",(0,g.jsx)("strong",{children:"SenseVoice"})," \xB7 \u6717\u8BFB ",(0,g.jsx)("strong",{children:f?.ttsSetup?.provider==="local"?f.ttsSetup.localModelId?.startsWith("qwen3")?"Qwen3-TTS":f.ttsSetup.localModelId?.startsWith("vits-melo")?"MeloTTS":f.ttsSetup.localModelId??"\u672C\u5730\u6A21\u578B":f?.ttsSetup?.provider==="deepseek"?f.ttsSetup.deepseekTextTransmissionAccepted&&xr(e)?"DeepSeek":"DeepSeek \u5F85\u542F\u7528":Wi[f?.ttsSetup?.provider]??"\u672A\u914D\u7F6E"})]}),(0,g.jsx)(me.Button,{variant:"outline","aria-expanded":a,onClick:()=>d(E=>!E),children:"\u5207\u6362\u5F53\u524D\u6A21\u578B"})]}),a&&(0,g.jsx)(Bd,{state:e,sessionId:n,run:t}),p?(0,g.jsxs)("fieldset",{className:`${R.choices} ${R.modelChoices}`,disabled:k,children:[(0,g.jsx)("legend",{children:"\u9009\u62E9\u6A21\u578B"}),m.map(({model:E,current:G,preferred:S,active:_})=>(0,g.jsxs)("label",{className:R.choice,"data-selected":o===E.id,children:[(0,g.jsx)("input",{type:"radio",name:H,checked:o===E.id,onChange:()=>{i(E.id),s(E.computeOptions?.includes("auto")?"auto":"cpu")}}),(0,g.jsxs)("span",{children:[(0,g.jsxs)("strong",{children:[Sr(E),E.recommendation?.recommended&&(0,g.jsx)("span",{className:R.badge,children:"\u63A8\u8350"})]}),(0,g.jsxs)("small",{children:[E.purpose==="tts"?"\u6717\u8BFB":"\u8BC6\u522B"," \xB7 ",An(E.totalBytes)]}),(0,g.jsx)("small",{children:G?"\u5F53\u524D\u914D\u7F6E":_?{queued:"\u7B49\u5F85\u4E0B\u8F7D",running:"\u4E0B\u8F7D\u5904\u7406\u4E2D",paused:"\u4E0B\u8F7D\u5DF2\u6682\u505C",failed:"\u4E0B\u8F7D\u5931\u8D25"}[_.status]:S?"\u5DF2\u5B89\u88C5\uFF0C\u53EF\u5207\u6362":E.available?"\u53EF\u51C6\u5907\u5B89\u88C5":"\u6682\u4E0D\u53EF\u5B89\u88C5"}),!E.available&&(0,g.jsx)("small",{children:E.reason??E.recommendation?.reason})]})]},E.id))]}):(0,g.jsx)("p",{className:R.note,children:"\u6B63\u5728\u8BFB\u53D6\u6A21\u578B\u5217\u8868\u3002"}),v&&(0,g.jsxs)("div",{className:R.selectedModel,children:[(0,g.jsxs)("label",{className:R.inlineField,children:["\u63A8\u7406\u8BBE\u5907",(0,g.jsx)("select",{value:r,disabled:k,onChange:E=>s(E.target.value),children:(v.computeOptions??["cpu"]).map(E=>(0,g.jsxs)("option",{value:E,children:[Eo(E),E==="cpu"?"":" \xB7 CPU \u515C\u5E95"]},E))})]}),(0,g.jsxs)("div",{className:R.actions,children:[b.preferred&&(0,g.jsx)(me.Button,{variant:"outline",disabled:!z||!!b.current,onClick:()=>l("apply-model-install",{id:b.preferred.id,revision:f.revision}),children:b.current?"\u5F53\u524D\u6A21\u578B":"\u9A8C\u8BC1\u5E76\u5207\u6362"}),(0,g.jsx)(me.Button,{variant:"outline",disabled:k||!v.available,onClick:()=>l("plan-model-install",{modelId:o,compute:r}),children:b.preferred?"\u67E5\u770B\u5176\u4ED6\u5B89\u88C5\u65B9\u6848":"\u67E5\u770B\u5B89\u88C5\u8BA1\u5212"})]}),(0,g.jsxs)("details",{className:R.details,children:[(0,g.jsx)("summary",{children:"\u63A8\u8350\u4F9D\u636E\u4E0E\u8BBE\u5907\u8BF4\u660E"}),(0,g.jsx)("p",{className:R.hint,children:v.recommendation?.reason??"\u63A8\u8350\u4F9D\u636E\u672A\u77E5\uFF0C\u53EF\u624B\u52A8\u9009\u62E9\u3002"}),(0,g.jsx)("p",{className:R.hint,children:v.purpose==="tts"?r==="cpu"?"\u4EC5\u51C6\u5907 CPU \u8FD0\u884C\u65F6\u3002":"\u51C6\u5907\u56FA\u5B9A Vulkan \u4E0E CPU \u7EC4\u4EF6\uFF0C\u5B9E\u9645\u53EF\u7528\u6027\u4ECD\u9700\u672C\u673A\u5408\u6210\u9A8C\u8BC1\u3002":"\u6B64\u6A21\u578B\u4F7F\u7528 CPU\u3002"})]})]}),w&&(0,g.jsxs)(me.MenuSurface,{className:R.plan,"aria-label":"\u6A21\u578B\u5B89\u88C5\u8BA1\u5212",children:[(0,g.jsx)("h4",{children:"\u6A21\u578B\u5B89\u88C5"}),(0,g.jsxs)("dl",{children:[(0,g.jsx)("dt",{children:"\u6A21\u578B"}),(0,g.jsx)("dd",{children:v?.title??w.modelId}),(0,g.jsx)("dt",{children:"\u6765\u6E90"}),(0,g.jsx)("dd",{children:w.source}),(0,g.jsx)("dt",{children:"\u4E0B\u8F7D\u5927\u5C0F"}),(0,g.jsx)("dd",{children:An(w.totalBytes)}),(0,g.jsx)("dt",{children:"\u4FDD\u5B58\u4F4D\u7F6E"}),(0,g.jsx)("dd",{children:w.destination}),(0,g.jsx)("dt",{children:"\u63A8\u7406\u8BBE\u5907"}),(0,g.jsx)("dd",{children:w.compute})]}),(0,g.jsx)("p",{children:w.licenseNote??"\u8BF7\u9605\u8BFB\u4E0B\u5217\u6A21\u578B\u8BB8\u53EF\u3002"}),w.licenseUrls?.map(E=>(0,g.jsx)("a",{href:E,target:"_blank",rel:"noreferrer",children:E},E)),(0,g.jsx)("p",{className:R.hint,children:w.notice}),(0,g.jsxs)("details",{className:R.details,children:[(0,g.jsx)("summary",{children:"\u6587\u4EF6\u548C\u6821\u9A8C\u8BE6\u60C5"}),(0,g.jsx)("ul",{children:w.files?.map(E=>(0,g.jsxs)("li",{children:[E.name," \xB7 ",An(E.bytes),(0,g.jsxs)("small",{children:["SHA-256: ",E.sha256]}),(E.downloadUrls??[E.url]).map(G=>(0,g.jsx)("small",{children:G},G))]},E.name))})]}),(0,g.jsx)(me.Button,{variant:"primary",className:R.primary,disabled:k||!v?.available||!w.planHash,onClick:()=>l("start-model-install",{modelId:w.modelId,compute:w.compute,planHash:w.planHash,accepted:!0}),children:"\u5F00\u59CB\u4E0B\u8F7D"})]}),(0,g.jsx)("div",{className:R.jobs,children:(p?.jobs??[]).filter(E=>!["installed","cancelled"].includes(E.status)).map(E=>(0,g.jsx)(qi,{job:E,snapshot:p,settings:f,disabled:k,writable:z,execute:l},E.id))}),!!B.length&&(0,g.jsxs)("details",{className:R.installHistory,children:[(0,g.jsxs)("summary",{children:["\u5B89\u88C5\u8BB0\u5F55\uFF08",B.length,"\uFF09",(0,g.jsx)("small",{children:"\u65F6\u95F4 \xB7 \u8BBE\u5907 \xB7 \u4F4D\u7F6E"})]}),(0,g.jsx)("div",{className:R.jobs,children:B.map(E=>(0,g.jsx)(qi,{job:E,snapshot:p,settings:f,disabled:k,writable:z,execute:l,history:!0},E.id))})]}),(0,g.jsx)("p",{className:R.hint,children:"\u6A21\u578B\u4E0B\u8F7D\u53EF\u5728\u540E\u53F0\u7EE7\u7EED\u3002\u68C0\u6D4B\u9759\u9ED8\u8FDB\u884C\uFF0C\u8FDB\u5165\u672C\u9875\u7ACB\u5373\u5237\u65B0\u3002"})]})}function Ki({state:e,sessionId:n,run:t,active:o=!0,pickPath:i,initialModelId:r=null,initialReuse:s=!1,reuseOnly:a=!1,onboarding:d=!1}){let[l,u,,p]=jt(t,n),[f,m]=(0,he.useState)(r),[b,v]=(0,he.useState)(null),[w,k]=(0,he.useState)(s),[z,H]=(0,he.useState)(""),[B,O]=(0,he.useState)("q8_0"),I=e.installerFor===n?e.installer:null,E=I?.models?.filter(U=>U.purpose==="tts"||["qwen3-tts-base-1.7b-gguf","vits-melo-tts-zh_en-int8"].includes(U.id))??[],G=E.find(U=>U.recommendation?.recommended&&U.available),S=f??G?.id??E.find(U=>U.available)?.id??E[0]?.id,_=E.find(U=>U.id===S),T=b??(_?.computeOptions?.includes("auto")?"auto":"cpu"),N=w&&S==="qwen3-tts-base-1.7b-gguf",P=N?{sourceDirectory:z,modelVariant:B}:{},C=e.installPlanFor===n&&e.installPlan?.modelId===S&&e.installPlan?.compute===T&&(N?e.installPlan?.reused===!0&&(e.installPlanRequest?.sourceDirectory??e.installPlan?.sourceDirectory)===z&&e.installPlan?.modelVariant===B:!e.installPlan?.sourceDirectory)?e.installPlan:null,F=I?.jobs??[],V=F.filter(U=>U.modelId===S&&U.status!=="cancelled").reverse(),Z=V.find(U=>U.status!=="blocked"),J=V.find(U=>U.status==="blocked"),q=I?.ttsInstallIntent,ae=q&&Z&&q.modelId===S&&q.jobId===Z.id?q:null,le=["waiting","verifying"].includes(q?.status)&&!F.some(U=>U.id===q.jobId&&U.status==="blocked"),pe=!Z||Z.status==="installed"&&!le&&(N||Z.compute!==T||J===V[0]),xe=e.settingsFor===n&&e.settings?.ttsSetup?.provider==="local"&&e.settings.ttsSetup.localModelId===S&&Z?.status==="installed"&&!!Z.installedPath&&e.settings.ttsSetup.localModelPath===Z.installedPath,A=(0,he.useRef)(void 0),oe=(0,he.useRef)(null);(0,he.useEffect)(()=>{!o||I||e.busy||u||p.isLocked()||A.current===n||(A.current=n,l("model-installer"))},[o,n,!!I,e.busy,u,p.settled]),(0,he.useEffect)(()=>{let U=n+":"+S+":"+T;N||!o||!_?.available||e.busy||u||p.isLocked()||C||oe.current===U||(oe.current=U,l("plan-model-install",{modelId:S,compute:T}))},[o,n,S,T,_?.available,e.busy,u,!!C,N,p.settled]);let X=u||e.busy||e.installerUncertain;return(0,g.jsxs)("section",{className:R.section,"aria-label":"\u4E0B\u8F7D\u672C\u5730\u8BED\u97F3\u6A21\u578B","data-no-settings-draft":!0,children:[I?(0,g.jsxs)(g.Fragment,{children:[!a&&(0,g.jsxs)("label",{className:R.inlineField,children:["\u8BED\u97F3\u6A21\u578B",(0,g.jsx)("select",{"aria-label":"\u8BED\u97F3\u6A21\u578B",value:S??"",disabled:X||ae?.status==="verifying",onChange:U=>{m(U.target.value),v(null)},children:E.map(U=>(0,g.jsxs)("option",{value:U.id,children:[U.title??U.id,U.recommendation?.recommended?" \xB7 \u63A8\u8350":"",U.available?"":" \xB7 \u6682\u4E0D\u53EF\u7528"]},U.id))})]}),!d&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("p",{className:R.hint,children:_?.recommendation?.reason}),(0,g.jsxs)("label",{className:R.inlineField,children:["\u672C\u5730\u8BA1\u7B97",(0,g.jsx)("select",{"aria-label":"\u672C\u5730\u8BA1\u7B97",value:T,disabled:X||le,onChange:U=>v(U.target.value),children:(_?.computeOptions??["cpu"]).map(U=>(0,g.jsx)("option",{value:U,children:{cpu:"CPU",auto:"\u81EA\u52A8 GPU \xB7 CPU \u515C\u5E95",vulkan:"Vulkan \xB7 CPU \u515C\u5E95"}[U]},U))})]})]}),!_?.available&&(0,g.jsx)("p",{role:"status",className:R.note,children:_?.reason??"\u6B64\u8BBE\u5907\u6682\u6CA1\u6709\u517C\u5BB9\u7684\u5B89\u88C5\u5305\u3002\u53EF\u9009\u62E9\u5176\u4ED6\u652F\u6301\u7684\u6A21\u578B\uFF0C\u6216\u5148\u4F7F\u7528\u6587\u5B57\u3002"}),C&&(0,g.jsxs)("div",{className:R.plan,children:[(0,g.jsxs)("strong",{children:["\u4E0B\u8F7D ",An(C.totalBytes)," \xB7 ",C.compute.toUpperCase()]}),C.reused&&(0,g.jsxs)("p",{children:["\u590D\u7528\u6A21\u578B ",An(C.reusedBytes)," \xB7 ",C.modelVariant]}),(0,g.jsxs)("details",{className:R.details,children:[(0,g.jsx)("summary",{children:"\u6765\u6E90\u3001\u8BB8\u53EF\u4E0E\u4FDD\u5B58\u4F4D\u7F6E"}),(0,g.jsx)("p",{children:C.source}),C.runtime&&(0,g.jsx)("p",{children:C.runtime.source}),C.files?.some(U=>!U.reused&&U.downloadUrls?.length>1)&&(0,g.jsxs)("p",{children:["\u4E0B\u8F7D\u7AD9\u70B9 ",Array.from(new Set(C.files.filter(U=>!U.reused).flatMap(U=>(U.downloadUrls??[U.url]).map(_e=>new URL(_e).hostname)))).join("\u3001")]}),(0,g.jsx)("p",{children:C.notice}),(0,g.jsx)("p",{children:C.verification}),(0,g.jsx)("p",{children:C.licenseNote}),C.licenseUrls?.map(U=>(0,g.jsx)("a",{href:U,target:"_blank",rel:"noreferrer",children:U},U)),(0,g.jsx)("p",{children:C.destination})]})]}),(0,g.jsxs)("div",{className:R.actions,children:[pe&&(0,g.jsx)(me.Button,{variant:"primary",className:R.primary,disabled:X||!yt(e,n)||!_?.available||!C,onClick:()=>l("start-model-install",{modelId:S,compute:T,planHash:C.planHash,accepted:!0,useWhenReady:!0,...C.reused?{sourceDirectory:C.sourceDirectory,modelVariant:C.modelVariant}:{}}),children:N?"\u9A8C\u8BC1\u5E76\u4F7F\u7528":"\u4E0B\u8F7D\u5E76\u4F7F\u7528"}),S==="qwen3-tts-base-1.7b-gguf"&&!a&&(0,g.jsx)(me.Button,{variant:"outline","aria-expanded":N,disabled:X||le,onClick:()=>k(U=>!U),children:"\u4F7F\u7528\u672C\u673A\u5DF2\u6709\u6587\u4EF6"})]}),N&&(0,g.jsxs)("div",{className:R.section,children:[(0,g.jsx)(_o,{className:R.field,label:"\u63D2\u4EF6\u6240\u5728\u673A\u5668\u7684\u6A21\u578B\u76EE\u5F55",kind:"sourceDirectory",value:z,disabled:X,active:o,scope:S+":"+B,pickPath:i,sessionId:n,onChange:H}),(0,g.jsxs)("label",{className:R.inlineField,children:["\u5DF2\u6709\u6A21\u578B\u91CF\u5316\u7248\u672C",(0,g.jsxs)("select",{"aria-label":"\u5DF2\u6709\u6A21\u578B\u91CF\u5316\u7248\u672C",value:B,disabled:X,onChange:U=>O(U.target.value),children:[(0,g.jsx)("option",{value:"q8_0",children:"Q8_0"}),(0,g.jsx)("option",{value:"q4_k_m",children:"Q4_K_M"})]})]}),(0,g.jsx)(me.Button,{variant:"outline",disabled:X||!z.trim()||!_?.available,onClick:()=>l("plan-model-install",{modelId:S,compute:T,...P}),children:"\u68C0\u67E5\u590D\u7528\u8BA1\u5212"})]}),N&&Z&&["failed","paused"].includes(Z.status)&&(0,g.jsx)("p",{className:R.note,children:"\u5DF2\u6709\u672A\u5B8C\u6210\u7684\u5B89\u88C5\u4EFB\u52A1\u3002\u53EF\u7EE7\u7EED\u91CD\u8BD5\uFF1B\u5982\u9700\u66F4\u6362\u76EE\u5F55\u6216\u91CF\u5316\u7248\u672C\uFF0C\u8BF7\u5148\u53D6\u6D88\u8BE5\u4EFB\u52A1\uFF0C\u518D\u68C0\u67E5\u65B0\u7684\u590D\u7528\u8BA1\u5212\u3002"}),!N&&_?.available&&!C&&pe&&(0,g.jsx)(me.Button,{variant:"outline",disabled:X,onClick:()=>l("plan-model-install",{modelId:S,compute:T}),children:"\u91CD\u65B0\u8BFB\u53D6\u5B89\u88C5\u8BA1\u5212"}),J&&(0,g.jsx)(qi,{job:J,snapshot:I}),Z&&(0,g.jsxs)("div",{className:R.job,children:[(0,g.jsx)("p",{role:"status",children:ae?.status==="verifying"?"\u6B63\u5728\u9A8C\u8BC1\u5408\u6210\uFF0C\u9996\u6B21\u53EF\u80FD\u9700\u8981\u51E0\u5206\u949F":ae?.status==="applied"&&xe?"\u5408\u6210\u9A8C\u8BC1\u901A\u8FC7\uFF0C\u5DF2\u8BBE\u4E3A\u6717\u8BFB\u6765\u6E90":ae?.status==="blocked"?"\u9700\u8981\u5904\u7406\u540E\u518D\u7EE7\u7EED":{queued:"\u7B49\u5F85\u4E0B\u8F7D",running:Z.stage==="verifying-local"?"\u6821\u9A8C\u672C\u673A\u5DF2\u6709\u6A21\u578B":"\u4E0B\u8F7D\u5904\u7406\u4E2D",paused:"\u5DF2\u6682\u505C",failed:"\u4E0B\u8F7D\u5931\u8D25",installed:"\u6587\u4EF6\u5DF2\u6821\u9A8C\uFF0C\u5C1A\u672A\u786E\u8BA4\u5408\u6210"}[Z.status]??Z.status}),Z.totalBytes>0&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("progress",{"aria-label":"\u8BED\u97F3\u6A21\u578B\u4E0B\u8F7D\u8FDB\u5EA6",max:Z.totalBytes,value:Math.min(Z.receivedBytes,Z.totalBytes)}),(0,g.jsxs)("small",{children:[An(Z.receivedBytes)," / ",An(Z.totalBytes)]})]}),Z.error&&(0,g.jsx)("p",{role:"alert",children:Z.error.message}),ae?.reason&&(0,g.jsx)("p",{className:R.note,children:Jh(ae.reason)}),(0,g.jsxs)("div",{className:R.actions,children:[ae?.status==="verifying"&&(0,g.jsx)(me.Button,{variant:"outline",disabled:X,onClick:()=>l("control-model-install",{id:Z.id,operation:"pause"}),children:"\u505C\u6B62\u9A8C\u8BC1"}),["queued","running"].includes(Z.status)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:X,onClick:()=>l("control-model-install",{id:Z.id,operation:"pause"}),children:"\u6682\u505C"}),(["paused","failed"].includes(Z.status)||ae?.status==="blocked"||ae?.status==="paused")&&(0,g.jsx)(me.Button,{variant:"outline",disabled:X,onClick:()=>l("control-model-install",{id:Z.id,operation:"resume"}),children:"\u7EE7\u7EED\u4E0B\u8F7D\u5E76\u4F7F\u7528"}),["queued","running","paused","failed"].includes(Z.status)&&(0,g.jsx)(me.Button,{variant:"outline",disabled:X,onClick:()=>l("control-model-install",{id:Z.id,operation:"cancel"}),children:"\u53D6\u6D88\u4E0B\u8F7D"}),Z.status==="installed"&&!xe&&(!ae||["applied","cancelled"].includes(ae.status))&&(0,g.jsx)(me.Button,{variant:"outline",disabled:X||le||!yt(e,n),onClick:()=>l("apply-model-install",{id:Z.id,revision:e.settings.revision}),children:"\u9A8C\u8BC1\u5E76\u4F7F\u7528"})]})]}),xe&&(0,g.jsx)("p",{className:R.hint,children:"\u672C\u5730\u6A21\u578B\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u8BD5\u542C\u3002"})]}):(0,g.jsx)(g.Fragment,{children:(0,g.jsx)("p",{className:R.hint,children:"\u6B63\u5728\u8BFB\u53D6\u53EF\u5B89\u88C5\u6A21\u578B\u2026"})}),e.installerError&&(0,g.jsx)("p",{role:"alert",className:R.note,children:e.installerError}),e.installerUncertain&&(0,g.jsx)("p",{role:"status",children:"\u6B63\u5728\u6838\u67E5\u4E0B\u8F7D\u72B6\u6001\u3002"})]})}function Ud({state:e,sessionId:n,run:t,pickPath:o,active:i}){let r=e.settingsFor===n?e.settings:null,s=e.installerFor===n?e.installer:null,a=r?.ttsSetup?.localModelPath,[d,l]=jt(t,n),[u,p]=(0,he.useState)(""),[f,m]=(0,he.useState)(!1),b=(s?.jobs??[]).filter(w=>w.status==="installed"&&(w.purpose==="tts"||w.recommendedSettings?.tts)),v=b.find(w=>w.id===u);return(0,g.jsxs)("section",{className:R.section,"aria-label":"\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84","data-no-settings-draft":!0,children:[(0,g.jsx)("h3",{children:"\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84"}),(0,g.jsx)("p",{className:R.hint,children:a||"\u5C1A\u672A\u914D\u7F6E\u672C\u5730\u6717\u8BFB\u6A21\u578B\u8DEF\u5F84\u3002"}),!!b.length&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("label",{className:R.inlineField,children:["\u5DF2\u5B89\u88C5\u76EE\u5F55",(0,g.jsxs)("select",{value:u,onChange:w=>p(w.target.value),children:[(0,g.jsx)("option",{value:"",children:"\u9009\u62E9\u5DF2\u6821\u9A8C\u7684\u5B89\u88C5\u76EE\u5F55"}),b.map(w=>(0,g.jsxs)("option",{value:w.id,children:[Sr(s.models.find(k=>k.id===w.modelId))," \xB7 ",Eo(w.compute)," \xB7 ",Yi(w.createdAt)]},w.id))]})]}),v&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("p",{className:R.hint,children:v.installedPath}),(0,g.jsx)(me.Button,{variant:"outline",disabled:l||!yt(e,n)||kr(v,r),onClick:()=>d("apply-model-install",{id:v.id,revision:r.revision}),children:"\u9A8C\u8BC1\u5E76\u4F7F\u7528\u6240\u9009\u8DEF\u5F84"})]})]}),(0,g.jsxs)("details",{className:R.details,onToggle:w=>m(w.currentTarget.open),children:[(0,g.jsx)("summary",{children:"\u590D\u7528\u672C\u673A Qwen \u6A21\u578B\u6587\u4EF6"}),(0,g.jsx)("p",{className:R.hint,children:"\u9009\u62E9\u5DF2\u6709\u6A21\u578B\u76EE\u5F55\u540E\u6821\u9A8C\u6587\u4EF6\uFF1B\u6821\u9A8C\u901A\u8FC7\u540E\u5B89\u88C5\u8FD0\u884C\u7EC4\u4EF6\u3002"}),f&&(0,g.jsx)(Ki,{state:e,sessionId:n,run:t,active:i,pickPath:o,initialModelId:"qwen3-tts-base-1.7b-gguf",initialReuse:!0,reuseOnly:!0})]})]})}function jd({state:e,sessionId:n,run:t,refresh:o,t:i,onDismiss:r,onMinimize:s,onBackToAuthorization:a,asrStatus:d,pickPath:l,active:u=!0}){let[p,f]=jt(t,n),[m,b]=(0,he.useState)(0),v=(0,he.useRef)(null),w=(0,he.useRef)(0),k=(0,he.useRef)(m);(0,he.useLayoutEffect)(()=>()=>{w.current++},[n]);let z=T=>(w.current++,T?.());(0,he.useLayoutEffect)(()=>{let T=v.current?.closest("[data-whale-content]"),N=v.current?.querySelector("[data-wizard-body]");T&&(T.scrollTop=0),N&&(N.scrollTop=0),k.current!==m&&N?.querySelector("h3")?.focus({preventScroll:!0}),k.current=m},[m]);let H=e.settingsFor===n?e.settings:null,[B,O]=(0,he.useState)(null),I=B??H?.listenMode??"ptt",E=f||!yt(e,n),G=async T=>{let N=w.current;(!T||await T()===!0)&&w.current===N&&b(2)},S=async()=>{if(E||!H)return;let T=w.current,N=()=>w.current===T;m===0?await p("listen-mode",{mode:I})===!0&&N()&&b(1):m===2&&await p("complete-setup",{revision:H.revision})===!0&&N()&&r?.()},_=(T,N)=>(0,g.jsxs)(me.MenuSurface,{ref:v,className:R.wizard,role:"region","aria-label":"\u9C7C\u5E94\u9996\u6B21\u914D\u7F6E","data-whale-intrinsic":!0,children:[(0,g.jsxs)("header",{className:R.header,children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("h2",{children:"\u5F00\u59CB\u4F7F\u7528\u9C7C\u5E94"}),(0,g.jsxs)("p",{className:R.hint,children:["\u7B2C ",m+1," / 3 \u6B65 \xB7 \u5176\u4F59\u8BBE\u7F6E\u968F\u65F6\u518D\u8C03"]})]}),(0,g.jsx)(me.Button,{onClick:()=>z(e.setupStatus?.completed===!0?r:s),children:e.setupStatus?.completed===!0?"\u8FD4\u56DE\u8BBE\u7F6E":"\u7A0D\u540E"})]}),(0,g.jsx)("div",{className:R.wizardBody,"data-wizard-body":!0,"data-no-drag":!0,children:(0,g.jsxs)("div",{className:R.wizardBodyContent,"data-whale-natural-content":!0,children:[(0,g.jsx)(Pr,{state:e,sessionId:n,run:t,refresh:o,t:i,canStopTts:m!==1}),T,(e.error||e.setupError)&&(0,g.jsx)("p",{role:"alert",className:R.note,children:"\u6682\u65F6\u672A\u80FD\u5B8C\u6210\uFF0C\u6B63\u5728\u6838\u67E5\u8BBE\u7F6E\u3002"})]})}),(0,g.jsxs)("footer",{className:R.actions,children:[(0,g.jsx)(me.Button,{variant:"outline",disabled:N.pending,onClick:()=>m>0?b(m-1):z(a),children:"\u4E0A\u4E00\u6B65"}),(0,g.jsx)(me.Button,{variant:"primary",className:R.primary,disabled:N.disabled,onClick:()=>{N.onClick()},children:N.label}),N.audition,N.feedback]})]});return m===1?(0,g.jsx)(Hd,{state:e,sessionId:n,run:t,settings:H,prepared:!0,active:u,pickPath:l,renderStep:_,advanceTts:G},n):_((0,g.jsxs)(g.Fragment,{children:[m===0&&(0,g.jsxs)("section",{className:R.section,children:[(0,g.jsx)("h3",{tabIndex:-1,children:"\u600E\u4E48\u8BF4\u8BDD\uFF1F"}),(0,g.jsx)("fieldset",{className:R.choices,disabled:E,children:[["ptt","\u6309\u952E\u8BF4\u8BDD","\u6309\u4F4F\u5FEB\u6377\u952E\u65F6\u6536\u97F3"],["always","\u81EA\u7531\u9EA6","\u5F00\u59CB\u5BF9\u8BDD\u540E\u6301\u7EED\u542C\u53D6\u8BED\u97F3"],["wake","\u5524\u9192\u8BCD","\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\uFF0C\u518D\u8BF4\u6307\u4EE4"]].map(([T,N,P])=>(0,g.jsxs)("label",{className:R.choice,"data-selected":I===T,children:[(0,g.jsx)("input",{type:"radio",name:"setup-listen","data-whale-operation":`listen-mode-${T}`,checked:I===T,onChange:()=>O(T)}),(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:N}),(0,g.jsx)("small",{children:P})]})]},T))})]}),m===2&&(0,g.jsxs)("section",{className:R.section,children:[(0,g.jsx)("h3",{tabIndex:-1,children:"\u51C6\u5907\u8BED\u97F3\u8BC6\u522B"}),(0,g.jsx)("p",{children:"\u8BF4\u8BDD\u65B9\u5F0F\u548C\u6717\u8BFB\u914D\u7F6E\u5DF2\u4FDD\u5B58\u3002"}),d]})]}),{pending:f,disabled:E||!H,label:f?"\u4FDD\u5B58\u4E2D\u2026":m===2?"\u5B8C\u6210":"\u4E0B\u4E00\u6B65",onClick:S})}var c=require("react/jsx-runtime"),qd=e=>e.setupOpen||e.setupStatus?.completed!==!0,tg={ARCHIVED:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u5DF2\u5F52\u6863\u3002\u6062\u590D\u539F\u4F1A\u8BDD\u6216\u66F4\u6362\u7ED1\u5B9A\u540E\u518D\u5F00\u59CB\u8BED\u97F3\u3002",BUSY:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F\u3002\u7B49\u8FD9\u8F6E\u7ED3\u675F\u540E\u518D\u5F00\u59CB\u8BED\u97F3\u3002",UNAVAILABLE:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528\u3002\u53EF\u66F4\u6362\u7ED1\u5B9A\u6216\u89E3\u9664\u7ED1\u5B9A\u3002"},Kd=e=>e.authorizationOpen||e.authorizationLoading&&!e.authorization;function Jd(e){let[n,t]=(0,M.useState)(!1),o=(0,M.useRef)(null),i=(0,M.useRef)(null),r=(0,M.useRef)(null),s=(0,M.useRef)(null),a=e.useWhalePreferences(k=>k),d=e.useWhaleUi(k=>k),l=Kd(d),u=l||qd(d)?"setup":d.panelView??"home",p=n&&u!=="settings",f=(0,M.useCallback)(k=>{o.current=k,e.geometry.ref(k),e.sizing.ref(k)},[e.geometry,e.sizing]),m=(0,M.useCallback)(k=>{i.current=k,e.sizing.contentRef(k)},[e.sizing]);(0,M.useEffect)(()=>{e.setPanelVisible?.(!p)},[p]),(0,M.useLayoutEffect)(()=>{i.current&&(i.current.scrollTop=0)},[u]),(0,M.useLayoutEffect)(()=>e.sizing.update(),[u,p,l,d.sourcePending]),(0,M.useEffect)(()=>{let k=o.current,z=k?.ownerDocument;s.current&&k&&z&&(z.activeElement===z.body||k.contains(z.activeElement))&&(u==="home"?k.querySelector("[data-whale-settings-trigger]")?.focus({preventScroll:!0}):u!==s.current&&k.focus({preventScroll:!0})),s.current=u},[u]);let b=k=>{let z=Nd(k);z&&e.recordUserOperation?.(z)},v=()=>{t(!0),requestAnimationFrame(()=>o.current?.querySelector("[data-whale-reopen]")?.focus())},w=()=>{e.refresh?.(),t(!1),requestAnimationFrame(()=>o.current?.focus())};return(0,Wd.createPortal)((0,c.jsx)("section",{ref:f,className:h.floating,"data-whale-panel":!0,"data-view":u,"data-collapsed":p||void 0,"data-source-pending":d.sourcePending||void 0,"data-motion":a.motion,tabIndex:0,"aria-label":e.t("drag"),title:e.t("dragHint"),onPointerDownCapture:()=>e.geometry.activate?.(),onFocusCapture:()=>e.geometry.activate?.(),onPointerDown:k=>{if(k.button!==0||k.pointerType&&k.pointerType!=="mouse"||!fd(k.target,k.currentTarget)){r.current=null;return}let z=k.target,H=z.getBoundingClientRect?.();H&&z.scrollHeight>z.clientHeight&&z.offsetWidth>z.clientWidth&&k.clientX>=H.left+z.clientLeft+z.clientWidth||(r.current={id:k.pointerId,x:k.clientX,y:k.clientY,moved:!1},k.target.closest?.("button")||k.currentTarget.focus({preventScroll:!0}),e.geometry.pointerDown(k,k.target.closest?.("[data-drag-surface]")??k.currentTarget))},onPointerMove:k=>{let z=r.current;!z||k.pointerId!==z.id||(Math.hypot(k.clientX-z.x,k.clientY-z.y)>=4&&(z.moved=!0),e.geometry.pointerMove(k))},onPointerUp:k=>{k.nativeEvent?.isTrusted&&r.current?.id===k.pointerId&&r.current.moved&&e.recordUserOperation?.("panel-move"),e.geometry.pointerEnd(k)},onPointerCancel:k=>{e.geometry.pointerEnd(k),r.current=null},onLostPointerCapture:e.geometry.pointerEnd,onClickCapture:k=>{r.current?.moved&&k.detail!==0?(k.preventDefault(),k.stopPropagation()):b(k),r.current=null},onChangeCapture:b,onSubmitCapture:b,onKeyDownCapture:b,onKeyDown:k=>{k.key==="Escape"&&(k.stopPropagation(),u==="setup"&&!p?v():u==="settings"?e.showHome():p||v())},children:(0,c.jsx)("div",{ref:m,className:h.panelViewport,"data-whale-content":!0,children:e.renderSlot("whale-ear.panel.controls",{collapsed:p,collapse:v,expand:w})})}),document.body)}var Vd=()=>()=>{};function Qd(e){let{controlContext:n}=e,t=(0,M.useSyncExternalStore)(n?.subscribe??Vd,()=>n?n.sourceFor(n.selectedSession()):e.sessionId??null),o=(0,M.useSyncExternalStore)(n?.subscribe??Vd,()=>{let m=n?.currentConversation();return m===t?m:null});e={...e,sessionId:t,currentConversationId:o};let i=e.useWhaleUi(m=>m),[r,s]=(0,M.useState)(!1);(0,M.useLayoutEffect)(()=>{e.setSession?.(t)},[t]);let a=Kd(i),d=qd(i);(0,M.useEffect)(()=>{d&&e.collapsed&&e.cancelPreview?.()},[d,e.collapsed]);let l=i.updates?.release?.version,u=!e.collapsed&&!a&&!d&&i.panelView==="home"&&i.checkedFor===e.sessionId&&i.status?.enabled===!1&&i.status.ownerSessionId===null&&!i.status.voiceControlBusy&&i.status.voiceSession?.fullyStopped!==!1&&!i.busy&&!i.uncertain&&!i.updatesUnavailable&&i.updates?.status==="available"&&l&&l!==i.dismissedUpdateVersion;if((0,M.useEffect)(()=>{u&&s(!0)},[u]),a||d)return(0,c.jsxs)(c.Fragment,{children:[e.collapsed&&(0,c.jsx)(Yd,{t:e.t,expand:e.expand}),a?(0,c.jsx)("div",{hidden:e.collapsed,children:(0,c.jsx)(og,{state:i,save:e.saveAuthorization,reload:e.openAuthorization,close:d?e.collapse:e.closeAuthorization,continueSetup:d?()=>e.closeAuthorization({resumeSetup:!0}):null})}):(0,c.jsx)("div",{role:"dialog","aria-modal":"false","aria-label":"\u9C7C\u5E94\u9996\u6B21\u914D\u7F6E","data-whale-setup":!0,hidden:e.collapsed,children:(0,c.jsx)(jd,{pickPath:e.pickPath,state:i,sessionId:e.sessionId,run:e.run,refresh:e.refresh,t:e.t,active:!e.collapsed,onDismiss:e.dismissSetup,onMinimize:e.collapse,onBackToAuthorization:e.openAuthorization,asrStatus:(0,c.jsx)(Xd,{action:e.senseVoiceAsrAction,active:!e.collapsed})})})]});let p=m=>{s(!0),m&&e.updateAction?.({action:"check"})},f=()=>{e.dismissUpdate?.(l),s(!1)};return(0,c.jsxs)(c.Fragment,{children:[i.panelView==="settings"?(0,c.jsx)(gg,{...e,openUpdate:p}):(0,c.jsx)(rg,{...e}),r&&(0,c.jsx)(Cd,{state:i,close:f,run:e.updateAction,t:e.t})]})}function og({state:e,save:n,reload:t,close:o,continueSetup:i}){let r=e.authorization,s=e.authorizationBusy||e.authorizationLoading,a=r?.usageAgreement?.accepted===!0,d=a&&(e.authorizationNeedsReview||r?.granted&&r.modelSourcesChanged===!0),l=a&&r?.granted&&!d,u=r?.usageAgreement?.text??[];return(0,c.jsxs)("section",{role:"dialog","aria-modal":"false","aria-label":"\u9C7C\u5E94\u4F7F\u7528\u534F\u8BAE","data-whale-authorization":!0,"data-whale-intrinsic":!0,className:`${h.settings} ${h.authorization}`,children:[(0,c.jsxs)("header",{className:h.settingsHeader,children:[(0,c.jsx)(at,{}),(0,c.jsx)("h2",{children:a?"\u9C7C\u5E94\u4F7F\u7528\u534F\u8BAE":"\u6B22\u8FCE\u4F7F\u7528\u9C7C\u5E94"}),a&&!i&&(0,c.jsx)(W.Button,{variant:"outline",disabled:s,onClick:o,children:"\u8FD4\u56DE"})]}),(0,c.jsx)("div",{className:h.authorizationBody,"data-whale-authorization-body":!0,"data-no-drag":!0,children:(0,c.jsxs)("div",{"data-whale-natural-content":!0,children:[!a&&(0,c.jsx)("p",{className:h.authorizationSteps,children:"1 \u4F7F\u7528\u534F\u8BAE\u3000\xB7\u30002 \u57FA\u7840\u914D\u7F6E"}),(0,c.jsx)("h3",{children:"\u9C7C\u5E94\u64CD\u4F5C\u8303\u56F4"}),(0,c.jsx)("div",{className:h.agreement,children:u.map(p=>(0,c.jsx)("p",{children:p},p))}),e.authorizationLoading&&!r&&(0,c.jsx)("p",{role:"status",className:h.hint,children:"\u6B63\u5728\u8BFB\u53D6\u2026"}),r&&(0,c.jsxs)("details",{className:h.section,children:[(0,c.jsx)("summary",{children:"\u670D\u52A1\u4E0E\u6A21\u578B\u6765\u6E90"}),(0,c.jsx)("ul",{className:h.permissionList,children:r.scopes.map(p=>(0,c.jsxs)("li",{children:[(0,c.jsx)("strong",{children:p.title}),(0,c.jsx)("p",{className:h.hint,children:p.description})]},p.id))}),r.modelSources.map(p=>(0,c.jsxs)("div",{children:[(0,c.jsx)("strong",{children:p.modelId}),(0,c.jsx)("p",{className:h.hint,children:p.source}),p.runtime&&(0,c.jsxs)("p",{className:h.hint,children:["\u8FD0\u884C\u7EC4\u4EF6\uFF1A",(p.runtime.sources??[p.runtime.source]).join("\u3001")]}),(0,c.jsx)("p",{className:h.hint,children:p.licenseNote}),p.licenseUrls.map(f=>(0,c.jsx)("p",{className:h.hint,children:(0,c.jsx)("a",{href:f,target:"_blank",rel:"noreferrer",children:f})},f))]},p.modelId))]}),d&&(0,c.jsx)("p",{role:"status",className:h.hint,children:"\u5F53\u524D\u64CD\u4F5C\u9700\u8981\u8865\u5145\u6388\u6743\u3002\u8BF7\u5148\u6838\u5BF9\u670D\u52A1\u4E0E\u6A21\u578B\u6765\u6E90\u3002"}),(e.authorizationError||r?.revocationUnconfirmed)&&(0,c.jsx)("p",{role:"alert",className:h.error,children:r?.revocationUnconfirmed?"\u505C\u6B62\u8BBE\u5907\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u68C0\u67E5\u6216\u91CD\u542F\u5BBF\u4E3B\u3002":e.authorizationWriteUnconfirmed?"\u6388\u6743\u4FDD\u5B58\u7ED3\u679C\u5F85\u786E\u8BA4\u3002":"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u6388\u6743\u3002"}),(e.authorizationError||r?.revocationUnconfirmed)&&(0,c.jsx)(W.Button,{variant:"outline",disabled:s,onClick:()=>{t?.()},children:"\u91CD\u65B0\u8BFB\u53D6\u6388\u6743"})]})}),(0,c.jsxs)("div",{className:`${h.actions} ${h.authorizationActions}`,children:[(0,c.jsx)(W.Button,{className:h.primary,variant:"primary",disabled:!r||s||e.authorizationUncertain,onClick:()=>l?(i??o)():void n(!0),children:l?i?"\u7EE7\u7EED\u914D\u7F6E":"\u8FD4\u56DE":a&&d?"\u8865\u5145\u6388\u6743":"\u4E00\u952E\u6388\u6743\u5E76\u7EE7\u7EED"}),(0,c.jsx)(W.Button,{variant:"outline",disabled:s,onClick:l&&!i?()=>{n(!1)}:o,children:l?i?"\u7A0D\u540E":"\u64A4\u9500\u6388\u6743":d?"\u6682\u4E0D\u8C03\u6574":"\u6682\u4E0D\u4F7F\u7528"})]}),!a&&(0,c.jsx)("p",{className:h.hint,children:"\u4E0B\u4E00\u6B65\uFF1A\u9009\u62E9\u8BF4\u8BDD\u65B9\u5F0F\u4E0E\u8BED\u97F3\u6A21\u578B"})]})}function Yd({t:e,expand:n,markState:t="idle",compactState:o="off",enabled:i=!1}){return(0,c.jsxs)(W.Button,{className:h.bubble,"data-whale-reopen":!0,"data-whale-operation":"panel-open","data-drag-surface":!0,"aria-label":e("reopen"),title:e("title"),onClick:n,children:[(0,c.jsx)(at,{small:!0,state:t}),(0,c.jsx)("span",{className:h.bubbleBrand,children:e("title")}),(0,c.jsxs)("span",{className:h.bubbleStatus,"data-voice-state":o,children:[(0,c.jsx)(Qe,{name:i===!1?"micOff":"mic"}),(0,c.jsx)("span",{children:e("compact_"+o)})]}),(0,c.jsx)("span",{className:h.voiceBars,"data-active":o==="listening"||void 0,"aria-hidden":"true",children:[0,1,2,3,4].map(r=>(0,c.jsx)("i",{},r))}),(0,c.jsx)(Qe,{name:"down"})]})}function rg(e){let{t:n,sessionId:t}=e,o=e.useWhaleUi(te=>te),i=o.checkedFor===t?o.status:null,r=o.busy,s=!!i,a=o.uncertain||!s,d=e.useWhalePreferences(te=>te),l=bo(i),u=o.conversationFor===t?o.conversation:null,p=l&&u?.rootSessionId===l&&!a?u:null,f=o.conversationHistoryFor===t&&!a&&(!i?.enabled||p?.rootSessionId===o.conversationHistory?.rootSessionId)?o.conversationHistory:null,m=p??{rootSessionId:f?.rootSessionId??null,items:[],latest:f?.items?.filter(te=>te.role==="assistant").at(-1)??null},b=!!(i?.enabled&&(o.conversationError||o.conversationFor===t&&o.conversation?.rootSessionId!==l)),v=_r(o,t),w=v?.kind==="cleanup",k=v?.kind==="restart",z=v?.kind==="conflict",H=i?.enabled||z,B=i?.enabled===!1&&i.voiceSession?.fullyStopped===!1,O=p?.helper??i?.helper,I=o.listenModePending?o.listenModeBefore:p?.helper&&p.revision!==o.listenModeReceiptRevision?p.helper.listenMode:i?.listenMode,E=!!(i?.enabled&&O?.online===!1),G=b||!!(i?.enabled&&I==null),S=!a&&!E&&!G&&Tt.includes(I),_=r||B||!S||w||k||z||!i?.capabilities?.listenMode||i?.voiceControlBusy||o.visibilityUncertain||o.ttsUncertain||o.ttsCancelling,T=i?.enabled?p?.inputError:null,N=!i?.enabled&&o.enableError,P=tg[/VOICE_EXISTING_(ARCHIVED|BUSY|UNAVAILABLE)/.exec(N??"")?.[1]],C=/VOICE_ROOT_OWNED_ELSEWHERE/.test(N??""),F=/VOICE_EXISTING_BINDING_CHANGED/.test(N??""),V=N&&o.settings?.voiceSession?.performanceMode==="fast"&&/VOICE_EXACT_EFFORT_HOST_REQUIRED|VOICE_FAST_/.test(N),Z=t&&i?.ownerSessionId&&i.ownerSessionId!==t&&l!==t,J=i?.existingVoiceSession,q=J?.sessionId,ae=o.existingSessionWritePending||o.existingSessionUnconfirmed,le=i&&!a&&o.checkedFor===t&&!ae,pe=le&&i.existingVoiceSession,xe=le?pe?bt(pe):n("dedicatedVoiceTarget"):n("checkingVoiceTarget"),A=(0,M.useId)(),oe=(0,M.useId)(),X=u?.inputDelivery,U=i?.enabled&&pe&&p?.retryTranscripts?.sessionId===pe.sessionId?p.retryTranscripts:null,_e=(U?.items??[]).map(te=>X?.id===te.id?{...X,state:te.state}:{...te,sessionId:U.sessionId});X&&!_e.some(te=>te.id===X.id)&&_e.push(X);let on=[U?.items.length,..._e.map(te=>te.id)].join(","),Fe=i?.existingVoiceSessionSupported===!0&&Object.hasOwn(i,"existingVoiceSession")&&e.listExistingVoiceSessions&&e.setExistingVoiceSession,_n=Fe&&br(o,t),lt=e.currentConversationId&&Fe&&i.enabled===!1,Ye=!!(!pe&&!ae&&o.checkedFor===t&&i&&!r&&!i.voiceControlBusy&&!a&&!o.ttsUncertain&&!o.ttsCancelling&&!B&&!v&&!Z),re=p?.wake??i?.wake,De=w?"pending":k||z||B||a||G||E?"unknown":r?"pending":p?.inputActive===!0?"input-active":i?.enabled?"authorized":"idle",[Ie,Ge]=(0,M.useState)(null),[wt,nt]=(0,M.useState)(!1),Ne=Ie==="targets"&&Fe&&i.enabled===!1,Xe=(0,M.useRef)(!1),Pn=o.settingsFor===t?o.settings?.values:null,Bn=o.settingsFor===t?o.settings?.ttsSetup:null,cn=Bn?.provider==="deepseek"&&(!Bn.deepseekTextTransmissionAccepted||o.authorization&&!xr(o)),xt=Bn?.provider==="custom"&&(!Bn.customTts?.textTransmissionAccepted||!Ji(o)),fn=Pn?.pttKeyboard?[...Pn.pttKeyboard.modifiers||[],Pn.pttKeyboard.code].join(" + "):Pn?.pttMouse?n("sideButton")+" "+Pn.pttMouse:null,kn=(0,M.useRef)({}),Sn=()=>{Xe.current=!0,Ge(null)};(0,M.useLayoutEffect)(()=>{Ge(te=>e.collapsed||te==="targets"?null:te),nt(!1)},[t,e.collapsed]),(0,M.useEffect)(()=>{nt(!1),q&&Ge(te=>te==="conversation"?null:te)},[q]),(0,M.useEffect)(()=>{i?.enabled&&Ge(te=>te==="targets"?null:te)},[i?.enabled]),(0,M.useEffect)(()=>{Ne||!_n||!Xe.current||!kn.current.targets||(Xe.current=!1,kn.current.targets.focus())},[Ne,_n,e.collapsed]),(0,M.useEffect)(()=>{!a&&!q&&Ie==="conversation"&&i?.enabled===!1&&e.run(t,"read-history")},[Ie,a,i?.enabled,t,q]);let _t=ad({enabled:i?.enabled,active:p?.inputActive===!0,unknown:!i||a||G||E||!!v||B||!!T,pending:r||w}),En=()=>!q&&Ie==="conversation"&&(0,c.jsx)(Pd,{conversation:m,history:f,historyLoading:o.sourcePending||!a&&o.conversationHistoryLoading,historyError:a?null:o.conversationHistoryError,historyRetryCursor:o.conversationHistoryRequestCursor,loadHistory:te=>e.run(t,"read-history",te?{cursor:te}:{}),assistantName:d.assistantName||n("assistant"),setAssistantName:e.setAssistantName,t:n,close:()=>{Ge(null),kn.current.conversation?.focus()}},m.rootSessionId??"empty");return e.collapsed?(0,c.jsx)(Yd,{t:n,expand:e.expand,markState:De,compactState:_t,enabled:i?.enabled??null}):(0,c.jsxs)("div",{className:h.panelContent,"data-home-controls":!0,"data-has-input-caption":_e.length>0||void 0,"data-home-layout":[i?i.enabled?"active":"idle":"loading",Er(o,t),!!(o.error||N),!!T,E,v?.kind,B,!!pe,on].join(":"),"data-size-detail":Ie==="conversation"||Ne?"true":"false",onKeyDown:te=>{!Ne||te.key!=="Escape"||(te.preventDefault(),te.stopPropagation(),Sn())},children:[(0,c.jsxs)("div",{className:h.header,children:[(0,c.jsxs)("span",{className:h.brand,children:[(0,c.jsx)(at,{state:De}),(0,c.jsx)("strong",{children:n("title")})]}),(0,c.jsxs)("div",{className:h.headerActions,children:[(0,c.jsxs)(W.Button,{className:h.newChatButton,"data-whale-operation":"new-voice-session","aria-label":n("newChat"),title:pe?"\u89E3\u9664\u5DF2\u6709\u4F1A\u8BDD\u7ED1\u5B9A\u540E\u53EF\u65B0\u5EFA\u9C7C\u5E94\u4F1A\u8BDD":n(Z?"newChatOtherOwner":i?.enabled?"newChatActive":"newChat"),disabled:!Ye,onClick:()=>{e.run(t,"new",{expectedOwnerSessionId:i.ownerSessionId})},children:[(0,c.jsx)(Qe,{name:"plus"}),(0,c.jsx)("span",{children:n("newChat")})]}),(0,c.jsx)(W.Button,{"data-whale-settings-trigger":!0,"data-whale-operation":"page-settings",className:h.iconButton,"aria-label":n("settings"),title:n("settings"),onClick:e.openSettings,children:(0,c.jsx)(Qe,{name:"settings"})}),(0,c.jsx)(W.Button,{"data-whale-operation":"panel-close",className:h.iconButton,"aria-label":n("collapse"),title:n("collapseHint"),onClick:e.collapse,children:(0,c.jsx)(Qe,{name:"minus"})})]})]}),(0,c.jsxs)("div",{className:h.statusRow,"data-bound":!!pe||void 0,"data-recording":De==="input-active"||void 0,children:[(0,c.jsx)("div",{id:A,className:h.voiceTarget,"data-whale-voice-target":!0,children:Fe?(0,c.jsxs)(W.Button,{ref:te=>{kn.current.targets=te},variant:"outline",className:h.existingSessionHome,"data-whale-bound-session":pe?!0:void 0,"data-whale-target-trigger":!0,title:xe,"aria-expanded":!!Ne,"aria-controls":Ne?oe:void 0,disabled:!Ne&&!_n,onClick:()=>Ne?Sn():Ge("targets"),children:[(0,c.jsx)("span",{children:n("voiceTarget")}),(0,c.jsx)("strong",{className:h.ellipsis,children:xe}),(0,c.jsx)(Qe,{name:Ne?"down":"chevron"})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("span",{children:n("voiceTarget")}),(0,c.jsx)("strong",{className:h.ellipsis,title:xe,children:xe})]})}),(0,c.jsxs)("div",{className:h.voiceStatus,children:[(0,c.jsx)(Qe,{name:i?.enabled?"mic":"micOff"}),(0,c.jsx)("span",{className:h.status,role:"status",children:o.listenModePending?n(i?.enabled?"modeSwitching":"modeSaving"):r?n("pending"):v?n(v.label):i?B?n("voiceStopPending"):a?n("stale"):E?n("voiceInputUnavailable"):G?n("unknown"):T?n("inputError_"+T):p?.inputActive===!0?n("inputActive"):i.enabled&&I==="wake"?n(us(re)):i.enabled?n("enabled"):n("disabled"):n("unknown")})]})]}),Ne?(0,c.jsx)(Ui,{...e,state:o,homePickerId:oe,closeHomePicker:Sn}):(0,c.jsxs)(c.Fragment,{children:[lt&&(0,c.jsx)(Sd,{...e,sessionId:e.currentConversationId,boundSession:J,state:o},e.currentConversationId),(0,c.jsxs)("div",{className:h.quickActions,children:[(0,c.jsx)(W.Button,{"data-whale-operation":H?"stop-voice":"start-voice",className:`${h.mainAction} ${i?.enabled?"":h.primary}`,variant:i?.enabled?"outline":"primary","aria-describedby":A,disabled:!s||(H?!Qi(o)||w:r||!!ae||!!v||B||!le||!!(pe&&!Xn(pe))),title:i?.enabled?n(U?.items.length?"endDiscardsRetries":"stopConsequence"):void 0,onClick:()=>{e.run(t,H?"disable":"enable",H?{}:{expectedOwnerSessionId:null,expectedExistingSessionId:pe?.sessionId??null})},children:w?n("voiceCleanupPending"):k?n(i?.enabled?"endConversation":"voiceRestartPending"):z?n("voiceRecoveryCheck"):i?.enabled?n("endConversation"):n("startConversation")}),(0,c.jsx)("div",{className:h.quickSegments,role:"group","aria-label":n("mode"),"aria-busy":!!o.listenModePending,"data-listen-mode":S?I:"unknown",children:Tt.map(te=>(0,c.jsx)(W.Button,{"data-whale-operation":`listen-mode-${te}`,"aria-pressed":S&&I===te,disabled:!!_,onClick:()=>{I!==te&&e.run(t,"listen-mode",{mode:te})},children:n(Ao(te))},te))})]}),_e.length>0&&(0,c.jsx)("ul",{className:h.inputCaptions,tabIndex:0,"aria-label":n("voiceTranscriptCaptions"),"data-whale-input-captions":!0,"data-no-drag":!0,children:_e.map(te=>(0,c.jsx)(ig,{item:te,t:n,pending:o.transcriptRetry,busy:r,canRetry:U?.items.some(hn=>hn.id===te.id),retry:()=>e.retryVoiceTranscript?.(t,te.id)},te.id))}),(!i||a||v||B)&&(0,c.jsx)("p",{className:h.hint,"data-home-important":!!v||B||void 0,children:n(v?.hint??(B?"voiceStopHint":r?"readingStatus":"statusRetry"))}),!a&&(!G||E)&&i?.enabled&&!w&&!k&&(0,c.jsx)("p",{className:h.hint,"data-whale-input-hint":!0,"data-home-important":T||E?!0:void 0,children:E?n("voiceInputRecoveryHint"):T?n("inputHelp_"+T):I==="wake"?n(re?.streamOpen&&re.detection==="asr-after-utterance"?"wakeFallbackHint":"wakeHint"):I==="always"?n("alwaysWarning"):fn?n("holdToSpeak")+" "+fn:n("bindingMissing")}),i&&!a&&!i.capabilities?.listenMode&&(0,c.jsx)("p",{className:h.hint,children:n("modeUnavailable")}),o.listenModeError&&(0,c.jsx)("p",{role:"alert","data-whale-mode-error":!0,className:h.error,children:n(o.uncertain?"modeSwitchUnconfirmed":"modeSwitchFailed")}),((o.readOnlyFailure&&a||B)&&!v||w||o.voiceStopUnconfirmed)&&(0,c.jsx)(W.Button,{variant:"outline",disabled:r,onClick:()=>{e.run(t,"status")},children:n("retryStatus")}),(o.error||N)&&!o.readOnlyFailure&&!P&&!C&&!o.listenModeError&&!z&&!k&&(0,c.jsx)("p",{role:"alert",className:h.error,children:n(F?"voiceTargetChanged":V?"performanceFastUnavailable":!o.uncertain&&N?"enableFailed":"operationUnavailable")}),C&&!v&&(0,c.jsxs)("p",{role:"alert",className:h.notice,children:[n("voiceTargetOccupied"),_n&&(0,c.jsx)(W.Button,{variant:"outline",onClick:()=>Ge("targets"),children:n("chooseVoiceTarget")})]}),P&&(0,c.jsxs)("p",{role:"alert",className:h.notice,children:[P," ",(0,c.jsx)(W.Button,{variant:"outline",disabled:!_n,onClick:()=>Ge("targets"),children:"\u7BA1\u7406\u7ED1\u5B9A"})]}),/VOICE_SESSION_ARCHIVED/.test(N??o.error??"")&&(0,c.jsxs)("p",{className:h.notice,children:["\u539F\u8BED\u97F3\u4F1A\u8BDD\u5DF2\u5F52\u6863\u3002",(0,c.jsx)(W.Button,{variant:"outline",onClick:()=>{e.openSettings("sessions")},children:"\u6062\u590D\u539F\u4F1A\u8BDD"})]}),/VOICE_ASR_(?:PREPARING|PREPARE_FAILED)/.test(N??o.error??"")&&(0,c.jsxs)("p",{className:h.notice,children:["SenseVoice \u5C1A\u672A\u5C31\u7EEA\u3002",(0,c.jsx)(W.Button,{variant:"outline",onClick:()=>{e.openSettings("models","download")},children:"\u67E5\u770B\u6A21\u578B\u8FDB\u5EA6"})]}),/VOICE_MODEL_REQUIRED/.test(N??o.error??"")&&(0,c.jsxs)("p",{className:h.notice,children:["\u8BF7\u5148\u9009\u62E9\u53EF\u7528\u7684\u5BF9\u8BDD\u6A21\u578B\u3002",(0,c.jsx)(W.Button,{variant:"outline",onClick:()=>{e.openSettings("models","conversation")},children:"\u8BBE\u7F6E\u5BF9\u8BDD\u6A21\u578B"})]}),(cn||xt)&&(0,c.jsxs)("p",{className:h.notice,"data-home-important":!0,children:["\u6717\u8BFB\u5F85\u542F\u7528\uFF0C\u56DE\u7B54\u4F1A\u663E\u793A\u4E3A\u6587\u5B57\u3002",(0,c.jsx)(W.Button,{variant:"outline",onClick:()=>{e.openSettings("models","voice")},children:"\u8BBE\u7F6E\u6717\u8BFB"})]}),pe&&!Xn(pe)&&(0,c.jsx)("p",{className:h.hint,"data-home-important":!0,children:vr(pe)}),p?.providerError&&(0,c.jsx)("p",{role:"alert","data-home-important":!0,"data-whale-provider-error":!0,className:h.error,children:p.providerError}),(0,c.jsx)(kd,{...e,state:o}),!pe&&!o.error&&!T&&!v&&!B&&!E&&!G&&(0,c.jsx)(sg,{...e,state:o}),wt&&(0,c.jsx)("p",{role:"alert",className:h.notice,children:"DSH \u6682\u65F6\u65E0\u6CD5\u6253\u5F00\u539F\u4F1A\u8BDD\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"}),Xn(pe)&&e.openExistingVoiceSession&&(0,c.jsxs)(W.Button,{className:h.caption,"data-whale-operation":"open-native-session","aria-label":"\u6253\u5F00\u539F\u4F1A\u8BDD",onClick:async()=>{nt(!1);try{await e.openExistingVoiceSession(pe.sessionId)}catch{nt(!0)}},children:[p?.latest?.text&&(0,c.jsx)("span",{className:h.ellipsis,children:p.latest.text}),(0,c.jsx)("span",{className:h.openOriginal,children:"\u6253\u5F00\u539F\u4F1A\u8BDD"}),(0,c.jsx)(Qe,{name:"chevron"})]}),i&&!q&&(0,c.jsxs)(W.Button,{ref:te=>{kn.current.conversation=te},className:h.caption,onClick:()=>{let te=Ie!=="conversation";Ge(te?"conversation":null),te&&e.run(t,"read-history")},"aria-label":n("recentConversation"),"aria-expanded":Ie==="conversation",children:[(0,c.jsxs)("span",{className:h.ellipsis,children:[m.latest?.state==="speech-failed"?n("speechFailed")+": ":m.latest?.state==="interrupted"?n("speechInterrupted")+": ":"",m.latest?.text??n(o.newChatFor===t?"newChatCreated":"viewConversation")]}),(0,c.jsx)(Qe,{name:"chevron"})]}),En()]})]})}function ig({item:e,pending:n,busy:t,canRetry:o,retry:i,t:r}){let s=(0,M.useId)(),a=n?.id===e.id&&e.state==="ready"?n.state:e.state,d=bt(e);return(0,c.jsxs)("li",{className:h.inputCaption,"data-whale-input-caption":!0,"data-delivery-state":a,children:[(0,c.jsxs)("div",{id:s,children:[(0,c.jsx)("p",{className:h.inputCaptionText,children:e.text}),(0,c.jsxs)("p",{className:h.inputCaptionReceipt,role:"status",children:[(0,c.jsx)("span",{children:r("transcriptDelivery_"+a)}),(0,c.jsx)("span",{className:h.ellipsis,title:d,children:d})]})]}),o&&(0,c.jsx)(W.Button,{variant:"outline",disabled:t||!!n||a!=="ready",onClick:()=>{i()},"aria-describedby":s,"data-whale-operation":"retry-voice-transcript",children:r("retryTranscript")})]})}function Er(e,n){return!!(e.settings?.revision&&e.settingsFor===n&&!e.visibilityUncertain&&!e.settingsConflict&&!e.ttsUncertain&&!e.ttsCancelling&&So(e,n))}function sg({state:e,sessionId:n,t,run:o,readState:i}){let r=(0,M.useRef)(0);(0,M.useEffect)(()=>()=>{r.current++},[n]);let s=Er(e,n),a=e.settings?.voiceSession?.performanceMode,d=e.performanceFor===n?e.performance:null,l=["fast","balanced","high"],u=d?.modes?.some(m=>m.performanceMode===a&&!m.available),p=e.busy||e.performancePending||e.uncertain||e.visibilityUncertain||!s,f=async m=>{if(p||m===a)return;let b=++r.current;if(m!=="compatibility"&&!await o(n,"inspect-performance")||b!==r.current)return;let v=i?.();!v||!Er(v,n)||v.busy||m!=="compatibility"&&(v.performanceFor!==n||!v.performance?.modes?.find(w=>w.performanceMode===m)?.available)||await o(n,"set-performance-mode",{revision:v.settings.revision,performanceMode:m})};return s?(0,c.jsxs)("section",{className:h.quickSpeed,"aria-label":t("performanceTitle"),children:[(0,c.jsxs)("div",{className:h.quickSpeedHeader,children:[(0,c.jsx)("span",{children:t("performanceTitle")}),a==="compatibility"&&(0,c.jsx)("small",{children:t("performance_compatibility")})]}),(0,c.jsx)("div",{className:h.quickSegments,children:l.map(m=>(0,c.jsxs)(W.Button,{"aria-pressed":a===m,disabled:p||!!Xi(d,m),title:t(Xi(d,m)||(m==="fast"?"performanceFastHint":"performance_"+m)),onClick:()=>{f(m)},children:[a===m&&(0,c.jsx)(Qe,{name:"check"}),(0,c.jsx)(ep,{value:m,t})]},m))}),(0,c.jsx)(np,{capability:d,t,compact:!0,pending:e.performancePending,error:e.performanceError}),u&&(0,c.jsx)(W.Button,{variant:"outline",disabled:p,onClick:()=>{f("compatibility")},children:t("performance_compatibility")})]}):null}function ag({settings:e,sessionId:n,busy:t,run:o,t:i,status:r,verified:s,statusFresh:a,tab:d,markSettingsEdited:l,discardSettingsDraft:u,bindingError:p,captureBindings:f}){let[m,b]=(0,M.useState)(e.values.device??null),[v,w]=(0,M.useState)(e.values.pttMouse),[k,z]=(0,M.useState)(e.values.pttKeyboard??null),[H,B]=(0,M.useState)(e.values.speakerVerification.enabled),O=e.capabilities?.turnSignals===!0,[I,E]=(0,M.useState)(e.values.turnSignals?.enabled??!1),[G,S]=(0,M.useState)(e.values.turnSignals?.volume?.toString()??""),[_,T]=(0,M.useState)((e.values.wakeWordAliases??["\u5C0F\u9CB8\u9C7C"]).join("\uFF0C")),[N,P]=(0,M.useState)(String((e.values.wakeListenTimeoutMs??1e4)/1e3)),C=ps(_),F=Oo(C)&&Number.isInteger(Number(N)*1e3)&&Number(N)>=3&&Number(N)<=30,V=JSON.stringify(C)!==JSON.stringify(e.values.wakeWordAliases??["\u5C0F\u9CB8\u9C7C"])||Number(N)*1e3!==(e.values.wakeListenTimeoutMs??1e4),[Z,J]=(0,M.useState)(e.values.semanticExperimental===!0),[q,ae]=(0,M.useState)(e.values.turnSignals?.headphonesConfirmed??!1),[le,pe]=(0,M.useState)(e.values.turnSignals?.experimentalAutomaticBargeIn??!1),xe=v!==e.values.pttMouse||JSON.stringify(k)!==JSON.stringify(e.values.pttKeyboard??null),[A,oe]=(0,M.useState)(!1),X=a?r?.inputDevices:null,U=m!==null&&typeof m=="object",_e=U||m==null||m===""||X?.items?.some(re=>typeof m=="number"&&re.index===m),on=A==="index"&&(String(m??"").trim()===""||!/^\d+$/.test(String(m).trim())||!Number.isSafeInteger(Number(m))),Fe=t||!a||r?.enabled!==!1||r?.ownerSessionId!==null||r?.voiceControlBusy!==!1||r?.voiceSession?.fullyStopped!==!0,_n=()=>{if(t||!F||on||V&&Fe)return;let re=U&&!A?m:A==="index"?Number(m):m==null||m===""?null:A==="name"?String(m).trim():typeof m=="number"?m:m.trim();o(n,"save-settings",{revision:e.revision,values:{wakeWordAliases:C,wakeListenTimeoutMs:Number(N)*1e3,semanticExperimental:Z,device:re,pttMouse:e.values.pttMouse,...e.capabilities?.pttKeyboard?{pttKeyboard:e.values.pttKeyboard??null}:{},speakerVerification:{enabled:H},...O?{turnSignals:{enabled:I,volume:Number(G),headphonesConfirmed:q,experimentalAutomaticBargeIn:le}}:{}}})},lt=(0,c.jsx)(W.Button,{className:h.primary,variant:"primary",disabled:t||!F||on||V&&Fe||O&&(G.trim()===""||!Number.isFinite(Number(G))||Number(G)<0||Number(G)>1),onClick:_n,children:i(t?"pending":"save")}),Ye=U?m.name:X?.items?.find(re=>re.index===m)?.name??(m==null||m===""?i("deviceDefault"):String(m));return(0,c.jsxs)("div",{className:h.section,"data-settings-draft":"save-settings",children:[(0,c.jsxs)("div",{hidden:d!=="audio",className:h.section,children:[(0,c.jsx)("h3",{children:i("mode")}),(0,c.jsxs)("p",{className:h.hint,children:["\u5F53\u524D\uFF1A",i(Ao(r?.listenMode??e.listenMode))]}),(0,c.jsx)("div",{className:h.segmented,children:["ptt","always","wake"].map(re=>(0,c.jsx)(W.Button,{"data-whale-operation":`listen-mode-${re}`,variant:"outline","aria-pressed":(r?.listenMode??e.listenMode)===re,disabled:!e.capabilities?.listenMode||!s||t,onClick:()=>{o(n,"listen-mode",{mode:re})},children:i(Ao(re))},re))}),(!e.capabilities?.listenMode||!s)&&(0,c.jsx)("p",{className:h.hint,children:i(e.capabilities?.listenMode?"modeNeedsGrant":"modeUnavailable")}),(0,c.jsxs)("div",{className:h.inlineActions,children:[(0,c.jsxs)("label",{className:h.inlineField,children:[i("device"),(0,c.jsxs)("select",{title:Ye,className:h.deviceSelect,"aria-label":i("device"),disabled:t,value:A?"__manual-"+A:U?"__stable":_e?m??"":"__saved",onChange:re=>{let De=re.target.value;De.startsWith("__manual-")?(oe(De.slice(9)),U&&b("")):De!=="__saved"&&De!=="__stable"&&(oe(!1),b(De===""?null:Number(De)))},children:[(0,c.jsx)("option",{value:"",children:i("deviceDefault")}),U&&(0,c.jsx)("option",{value:"__stable",children:m.name}),X?.items?.map(re=>(0,c.jsxs)("option",{value:String(re.index),children:[re.name," (",re.index,")"]},re.index)),!_e&&(0,c.jsxs)("option",{value:"__saved",children:[i("deviceSaved"),": ",m]}),(0,c.jsx)("option",{value:"__manual-index",children:i("deviceManualIndex")}),(0,c.jsx)("option",{value:"__manual-name",children:i("deviceManualName")})]})]}),lt]}),Ye.length>22&&(0,c.jsxs)("details",{className:h.fullName,children:[(0,c.jsx)("summary",{children:"\u67E5\u770B\u8BBE\u5907\u5168\u540D"}),(0,c.jsx)("p",{children:Ye})]}),(A||!_e)&&(0,c.jsxs)("label",{className:h.field,children:[i("deviceManual"),(0,c.jsx)(W.Input,{"aria-label":i("deviceManual"),disabled:t,value:m??"",onChange:re=>{A||oe(typeof m=="number"?"index":"name"),b(re.target.value)}})]}),on&&(0,c.jsx)("p",{className:h.notice,children:i("deviceIndexInvalid")}),X?.status!=="available"&&(0,c.jsx)("p",{className:h.hint,children:i(X?.status==="empty"?"deviceEmpty":"deviceUnknown")})]}),(0,c.jsx)("div",{hidden:d!=="interaction",className:h.section,children:(0,c.jsxs)("div",{className:h.bindingEditor,"data-settings-draft":"save-bindings",children:[(0,c.jsx)(ug,{captureBindings:f,sessionId:n,active:d==="interaction",value:k,onChange:re=>{l?.("save-bindings"),z(re)},capability:e.capabilities?.pttKeyboard,disabled:t||!a,t:i}),(0,c.jsxs)("fieldset",{className:`${h.radios} ${h.mouseBinding}`,disabled:t||!a,children:[(0,c.jsx)("legend",{children:i("sideButton")}),[0,1,2].map((re,De)=>(0,c.jsxs)("label",{children:[(0,c.jsx)("input",{type:"radio",name:"whale-ear-mouse",value:re,checked:v===re,onChange:()=>{l?.("save-bindings"),w(re)}}),i(["sideOff","sideOne","sideTwo"][De])]},re))]}),p&&(0,c.jsx)("p",{role:"alert",className:h.notice,children:/RECORDING|KEYS_HELD/.test(p)?"\u8BF7\u5148\u677E\u5F00\u6309\u952E\uFF0C\u7B49\u5F85\u5F55\u97F3\u5904\u7406\u5B8C\u6210\uFF0C\u518D\u4FDD\u5B58\u3002":/UNCONFIRMED|STOP_UNCONFIRMED|ROLLBACK_UNCONFIRMED/.test(p)?"\u6309\u952E\u72B6\u6001\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u91CD\u542F DSH \u518D\u6838\u67E5\u6309\u952E\u3002":/STALE|配置已改变|语音会话已改变/.test(p)?"\u914D\u7F6E\u6216\u8BED\u97F3\u4F1A\u8BDD\u5DF2\u6539\u53D8\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6\u540E\u518D\u4FDD\u5B58\u3002":/UNSUPPORTED/.test(p)?"\u5F53\u524D\u7CFB\u7EDF\u4E0D\u652F\u6301\u5728\u5BF9\u8BDD\u4E2D\u66F4\u6362\u5168\u5C40\u6309\u952E\u3002":"\u672A\u80FD\u4FDD\u5B58\u6309\u952E\uFF0C\u8BF7\u67E5\u770B\u9AD8\u7EA7\u8BE6\u60C5\u3002"}),(0,c.jsxs)("div",{className:`${h.actions} ${h.bindingActions}`,children:[(0,c.jsx)(W.Button,{className:h.primary,variant:"primary",disabled:t||!a||!xe||!e.bindingContext||k?.code==="F4"&&k.modifiers.includes("Alt"),onClick:()=>{o(n,"save-bindings",{revision:e.revision,bindingContext:e.bindingContext,values:{pttMouse:v,pttKeyboard:k}})},children:i("saveBindings")}),xe&&(0,c.jsx)(W.Button,{variant:"outline",disabled:t,onClick:()=>{w(e.values.pttMouse),z(e.values.pttKeyboard??null),u?.("save-bindings")},children:i("discardBindings")})]})]})}),(0,c.jsxs)("div",{hidden:d!=="advanced"||!e.values.speakerVerification.enabled,className:h.section,children:[e.values.speakerVerification.enabled&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(Jt,{label:i("speaker"),checked:H,disabled:t,onChange:B}),(0,c.jsx)("p",{className:h.hint,children:i("speakerHint")})]}),(0,c.jsx)("p",{className:h.hint,children:i("savedHint")})]}),(0,c.jsxs)("div",{hidden:d!=="audio",className:h.disclosureRow,children:[(0,c.jsxs)("details",{className:h.section,children:[(0,c.jsx)("summary",{children:i("wakeSettings")}),(0,c.jsx)("p",{className:h.hint,children:i("wakeMethod")}),(0,c.jsxs)("label",{className:h.field,children:[i("wakeAliases"),(0,c.jsx)(W.Input,{"aria-label":i("wakeAliases"),maxLength:208,value:_,disabled:Fe,onChange:re=>T(re.target.value)})]}),(0,c.jsx)("p",{className:h.hint,children:i("wakeAliasesHint")}),(0,c.jsxs)("label",{className:h.field,children:[i("wakeTimeout"),(0,c.jsx)(W.Input,{"aria-label":i("wakeTimeout"),type:"number",min:"3",max:"30",step:"1",value:N,disabled:Fe,onChange:re=>P(re.target.value)})]}),Fe&&(0,c.jsx)("p",{className:h.hint,children:i("wakeStopToEdit")}),!F&&(0,c.jsx)("p",{role:"alert",className:h.notice,children:i("wakeInvalid")})]}),(0,c.jsxs)("details",{className:h.section,children:[(0,c.jsx)("summary",{children:i("soundTitle")}),(0,c.jsx)(Jt,{label:i("soundEnabled"),checked:I,disabled:!O||t,onChange:E}),(0,c.jsxs)("label",{className:h.field,children:[i("soundVolume"),(0,c.jsx)(Kt,{"aria-label":i("soundVolume")+"\u6ED1\u5757",min:"0",max:"1",step:"0.05",value:G,disabled:!O||t,onChange:re=>S(re.target.value)}),(0,c.jsx)(W.Input,{type:"number",min:"0",max:"1",step:"0.05","aria-label":i("soundVolume"),disabled:!O||t,value:G,onChange:re=>S(re.target.value)})]}),(0,c.jsx)(Jt,{label:"\u5B9E\u9A8C\u6027\u5524\u9192\u5224\u65AD\uFF08\u9ED8\u8BA4\u5173\u95ED\uFF09",checked:Z,disabled:t,onChange:J}),(0,c.jsx)("p",{className:h.hint,children:"\u5173\u95ED\u65F6\uFF0C\u81EA\u7531\u9EA6\u76F4\u63A5\u542C\u53D6\u6709\u6548\u8BED\u97F3\uFF1B\u5F00\u542F\u540E\u4F7F\u7528\u5524\u9192\u8BCD\u6216\u8BED\u4E49\u5224\u65AD\uFF0C\u53EF\u80FD\u6F0F\u5524\u9192\u3002\u5EFA\u8BAE\u4F7F\u7528\u8033\u673A\u51CF\u5C11\u56DE\u58F0\u3002"}),(0,c.jsx)(W.Checkbox,{label:i("headphones"),checked:q,disabled:!O||t,onChange:re=>{ae(re),re||pe(!1)}}),(0,c.jsx)("p",{className:h.hint,children:i("headphonesHint")}),(0,c.jsx)(Jt,{label:i("automaticBargeIn"),checked:le,disabled:!O||!q||t,onChange:pe}),O&&!q&&(0,c.jsx)("p",{className:h.hint,children:i("headphonesRequired")}),(0,c.jsx)("p",{className:h.hint,children:i(O?"soundAvailable":"soundUnavailable")})]})]}),d==="advanced"&&e.values.speakerVerification.enabled&&(0,c.jsx)("div",{className:h.formActions,children:lt})]})}function Xd({action:e,active:n}){let[t,o]=(0,M.useState)(null),[i,r]=(0,M.useState)(0),s=(0,M.useRef)(0);if((0,M.useEffect)(()=>{if(!e||!n)return;let l=new AbortController,u,p=async m=>{try{let b=await e({operation:m},l.signal);if(l.signal.aborted)return;o(b),b.selected&&(m==="retry"||["idle","downloading"].includes(b.state))&&(u=setTimeout(()=>{p("status")},1e3))}catch{l.signal.aborted||o({state:"unavailable"})}},f=i>s.current?"retry":"status";return s.current=i,p(f),()=>{clearTimeout(u),l.abort()}},[e,n,i]),!e||!n)return null;let a=t?.totalBytes>0&&t?.state==="downloading",d=l=>(l/1e6).toFixed(1);return(0,c.jsxs)("div",{className:h.section,"data-whale-sensevoice":!0,children:[(0,c.jsx)("h3",{children:"SenseVoice"}),(0,c.jsx)("p",{role:"status",children:t?.selected===!1?"\u4F7F\u7528\u9AD8\u7EA7\u8DEF\u5F84\u4E2D\u6307\u5B9A\u7684\u672C\u5730 SenseVoice \u6A21\u578B\u3002":t?.state==="ready"?"\u5DF2\u5C31\u7EEA\uFF0C\u5728\u672C\u673A\u79BB\u7EBF\u8BC6\u522B\u3002":t?.state==="error"?t.message:t?.state==="unavailable"?"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u6A21\u578B\u72B6\u6001\u3002":a?`\u6B63\u5728\u4E0B\u8F7D \xB7 ${d(t.receivedBytes)} / ${d(t.totalBytes)} MB`:"\u6B63\u5728\u51C6\u5907\u672C\u5730\u8BC6\u522B\u6A21\u578B\u2026"}),a&&(0,c.jsx)("progress",{"aria-label":"SenseVoice \u4E0B\u8F7D\u8FDB\u5EA6",value:t.receivedBytes,max:t.totalBytes}),t?.selected&&t?.state==="error"&&(0,c.jsx)(W.Button,{variant:"outline",onClick:()=>{o(null),r(l=>l+1)},children:"\u91CD\u8BD5\u4E0B\u8F7D"})]})}function cg({settings:e,sessionId:n,busy:t,run:o,t:i,pickPath:r,active:s,modelTab:a,markSettingsEdited:d,senseVoiceAsrAction:l}){let[u,p]=(0,M.useState)(e.modelSetup.models),f=t,m=()=>d?.("save-models"),b=()=>{o(n,"save-models",{revision:e.revision,values:{asr:"sensevoice",modelCompute:"cpu",models:u}})};return(0,c.jsxs)("section",{className:h.section,"data-settings-draft":"save-models",hidden:!["download","paths"].includes(a),children:[(0,c.jsx)("div",{"data-whale-tab-panel":!0,hidden:a!=="download",children:(0,c.jsx)(Xd,{action:l,active:s&&a==="download"})}),(0,c.jsxs)("div",{hidden:a!=="paths",className:h.section,children:[(0,c.jsx)("h3",{children:"\u8BC6\u522B\u6A21\u578B\u672C\u5730\u8DEF\u5F84"}),(0,c.jsx)("p",{className:h.hint,children:"\u53EF\u5728\u201C\u6A21\u578B\u4E0B\u8F7D\u201D\u67E5\u770B\u51C6\u5907\u8FDB\u5EA6\uFF0C\u6216\u5728\u8FD9\u91CC\u6307\u5B9A\u672C\u673A\u5DF2\u6709\u7684 SenseVoice \u76EE\u5F55\u3002"}),[["sensevoiceDir","sensevoicePath"],["campplus","campplusPath"]].map(([v,w])=>(0,c.jsx)(_o,{className:h.pathRow,label:i(w),kind:v,value:u[v],disabled:f,active:s&&a==="paths",pickPath:r,sessionId:n,scope:"sensevoice",onChange:k=>{m(),p(z=>({...z,[v]:k}))}},v)),(0,c.jsx)(W.Button,{variant:"outline",disabled:f,onClick:b,children:i("saveModels")})]})]})}function lg({settings:e,state:n,sessionId:t,run:o,t:i}){let[r,s]=(0,M.useState)(e.voiceSession.visibility),a=n.settingsFor===t,d=n.checkedFor===t&&n.status!==null,l=d?n.status.voiceCapabilities:e.voiceCapabilities,u=d?n.status.voiceSession:null,p=d&&(n.status.enabled||n.status.ownerSessionId!==null||u?.id!=null),f=d&&n.status.voiceControlBusy===!1,m=n.busy||n.uncertain||!a||!d||!f||p,b=v=>i(v==="workspace"?"workspaceMode":"hiddenMode");return(0,c.jsxs)("section",{className:h.section,"data-whale-visibility":!0,"data-settings-draft":"set-visibility",children:[(0,c.jsx)("h3",{children:i("capabilityTitle")}),(0,c.jsx)("dl",{className:h.details,children:["hidden","workspace"].map(v=>(0,c.jsxs)("div",{className:h.capabilityRow,children:[(0,c.jsx)("dt",{children:b(v)}),(0,c.jsxs)("dd",{children:[i(l?.[v]?.supported?"supported":"unsupported"),l?.[v]?.reason?` \xB7 ${l[v].reason}`:""]})]},v))}),(0,c.jsxs)("p",{className:h.hint,children:[i("taskCapability"),": ",i(l?.taskHandoff?.supported?"supported":"unsupported")," \xB7 ",l?.taskHandoff?.mode??i("unknown"),l?.taskHandoff?.reason?` \xB7 ${l.taskHandoff.reason}`:""]}),(0,c.jsxs)("p",{children:[i("configuredMode"),": ",b(e.voiceSession.visibility)]}),(0,c.jsx)("p",{className:h.hint,children:d?u?.id?`${i("currentVoiceMode")}: ${u.presentation?.requested?b(u.presentation.requested):i("unknown")} \xB7 ${u.id}`:i("noActiveVoice"):i("modeReadFirst")}),(0,c.jsxs)("fieldset",{className:h.radios,disabled:m,children:[(0,c.jsx)("legend",{children:i("chooseVisibility")}),(0,c.jsxs)("label",{children:[(0,c.jsx)("input",{type:"radio",name:"whale-ear-visibility",checked:r==="hidden",onChange:()=>s("hidden")}),i("hiddenMode")]}),(0,c.jsxs)("label",{children:[(0,c.jsx)("input",{type:"radio",name:"whale-ear-visibility",checked:r==="workspace",disabled:!l?.workspace?.supported,onChange:()=>s("workspace")}),i("workspaceMode")]})]}),(0,c.jsx)("p",{className:h.hint,children:i("workspaceWarning")}),(0,c.jsx)("p",{className:h.hint,children:i("visibilityNoMigration")}),(!a||!d)&&(0,c.jsx)("p",{className:h.hint,children:i("modeReadFirst")}),p&&(0,c.jsx)("p",{className:h.hint,children:i("closeBeforeMode")}),d&&!f&&(0,c.jsx)("p",{className:h.hint,children:i("modeControlPending")}),(0,c.jsx)("div",{children:(0,c.jsx)(W.Button,{variant:"outline",disabled:m||r===e.voiceSession.visibility||r==="workspace"&&!l?.workspace?.supported,onClick:()=>{o(t,"set-visibility",{revision:e.revision,visibility:r})},children:i(r==="workspace"?"saveWorkspace":"saveHidden")})})]})}function ug({value:e,onChange:n,capability:t,disabled:o,t:i,captureBindings:r,sessionId:s,active:a}){let[d,l]=(0,M.useState)(!1),[u,p]=(0,M.useState)(!1),[f,m]=(0,M.useState)(null),b=(0,M.useRef)(null),v=(0,M.useRef)(0),w=(0,M.useRef)(null),k=(0,M.useRef)(!0),z=async O=>{v.current++,k.current&&l(!1);let I=b.current;if(I){k.current&&p(!0);try{await r(I.sessionId,{operation:"end",token:I.token}),b.current===I&&(b.current=null),k.current&&O&&n(O),k.current&&m(null)}catch(E){k.current&&m(String(E.message||E))}finally{k.current&&p(!1)}}},H=async()=>{if(b.current||u)return;let O=++v.current;p(!0),m(null);try{let I=await r(s,{operation:"begin"});if(b.current={...I,sessionId:s},!k.current||O!==v.current){await z();return}l(!0),w.current?.focus()}catch(I){k.current&&m(String(I.message||I))}finally{k.current&&p(!1)}};(0,M.useEffect)(()=>(k.current=!0,()=>{k.current=!1,z()}),[]),(0,M.useEffect)(()=>{(!a||o)&&(v.current++,z())},[a,o,s]),(0,M.useEffect)(()=>{if(!d)return;let O=null,I=!1,E=!1,G=C=>{E||(E=!0,z(C))},S=C=>{if(C.preventDefault(),C.stopPropagation(),C.code==="Escape"){O=null;return}C.repeat||["ControlLeft","ControlRight","AltLeft","AltRight","ShiftLeft","ShiftRight"].includes(C.code)||(O=hd(C),I=!1,m(O?null:i("bindingUnsupported")))},_=C=>{if(C.preventDefault(),C.stopPropagation(),C.code==="Escape"){G();return}O&&(C.code===O.code&&(I=!0),I&&!C.ctrlKey&&!C.altKey&&!C.shiftKey&&G(O))},T=()=>G(),N=()=>{document.hidden&&T()};window.addEventListener("keydown",S,!0),window.addEventListener("keyup",_,!0),window.addEventListener("blur",T),document.addEventListener("visibilitychange",N);let P=setTimeout(T,1e4);return()=>{clearTimeout(P),window.removeEventListener("keydown",S,!0),window.removeEventListener("keyup",_,!0),window.removeEventListener("blur",T),document.removeEventListener("visibilitychange",N)}},[d]);let B=e?[...e.modifiers||[],e.code].join(" + "):i("bindingOff");return(0,c.jsxs)("section",{className:h.keyBinding,children:[(0,c.jsx)("h3",{children:i("keyboardBinding")}),(0,c.jsxs)("div",{className:h.keyBindingRow,children:[(0,c.jsx)("span",{children:B}),(0,c.jsxs)("div",{className:h.actions,children:[(0,c.jsx)(W.Button,{variant:"outline",ref:w,onBlur:()=>{d&&z()},disabled:o||u||!t?.supported||!r,onClick:()=>d?void z():void H(),children:u?"\u6B63\u5728\u4EA4\u63A5\u2026":d?"\u53D6\u6D88\u5F55\u5165":"\u5F55\u5165\u6309\u952E"}),e&&(0,c.jsx)(W.Button,{variant:"outline",disabled:o||u||d,onClick:()=>n(null),children:i("clearBinding")}),b.current&&!d&&!u&&(0,c.jsx)(W.Button,{variant:"outline",onClick:()=>{z()},children:"\u6062\u590D\u539F\u6309\u952E"})]})]}),d&&(0,c.jsx)("p",{role:"status",className:h.notice,children:"\u6309\u952E\u8BF4\u8BDD\u5DF2\u6682\u505C\u3002\u8BF7\u6309\u4E0B\u7EC4\u5408\u952E\u540E\u5168\u90E8\u677E\u5F00\uFF1BEsc \u53D6\u6D88\u3002"}),!t?.supported&&(0,c.jsx)("p",{className:h.hint,children:t?.reason||i("bindingUnavailable")}),f&&(0,c.jsx)("p",{role:"alert",children:f})]})}function ep({value:e,t:n}){let t={fast:"performanceNoThinking",balanced:"performanceRecommended"}[e];return(0,c.jsxs)("span",{className:h.performanceChoice,children:[n("performance_"+e),t&&(0,c.jsxs)(c.Fragment,{children:[" ",(0,c.jsx)("small",{children:n(t)})]})]})}function Xi(e,n){let t=e?.modes?.find(o=>o.performanceMode===n);return!t||t.available?null:t.reason==="provider_unsupported"?"performanceUnavailable":t.reason==="unknown"?"performanceProbeUnknown":n==="fast"?"performanceFastUnavailable":"performanceHostUnavailable"}function np({capability:e,t:n,compact:t=!1,pending:o=!1,error:i=null}){let r=e?.modes??[],s=r.map(v=>v.reason),a=e?.probe?.status,d=a==="unknown"||s.includes("unknown"),l=o||a==="pending"||a==="running",u=!t&&(a==="accepted"||s.includes("accepted")),p=!t&&s.includes("explicit_off"),f=r.some(v=>v.performanceMode==="fast"&&!v.available&&v.reason==="host_contract_blocked"),m=s.includes("provider_unsupported"),b=r.some(v=>v.performanceMode!=="fast"&&!v.available&&v.reason==="host_contract_blocked");if(!d&&!l&&!u&&!p&&!f&&!m&&!b&&!i)return null;if(t){let v=i||n(l?"performanceProbePending":f?"performanceFastUnavailable":m?"performanceUnavailable":d?"performanceProbeUnknown":"performanceHostUnavailable");return(0,c.jsx)("div",{role:"status",className:h.quickHint,"data-whale-probe-status":!0,title:v,children:v})}return(0,c.jsxs)("div",{role:"status",className:h.hint,"data-whale-probe-status":!0,children:[l&&(0,c.jsx)("p",{children:n("performanceProbePending")}),i&&(0,c.jsx)("p",{"data-whale-probe-error":!0,children:i}),f&&(0,c.jsx)("p",{children:n("performanceFastUnavailable")}),m&&(0,c.jsx)("p",{children:n("performanceUnavailable")}),b&&(0,c.jsx)("p",{children:n("performanceHostUnavailable")}),d&&(0,c.jsx)("p",{children:n("performanceProbeUnknown")}),u&&(0,c.jsx)("p",{children:n("performanceProbeAccepted")}),p&&(0,c.jsx)("p",{children:n("performanceFastHint")})]})}function dg({state:e,sessionId:n,run:t,t:o,markSettingsEdited:i}){let r=e.settings,s=r?.voiceSession?.performanceMode??null,[a,d]=(0,M.useState)(s),l=Er(e,n),u=e.performanceFor===n?e.performance:null,p=u?.modes?.find(m=>m.performanceMode===a),f=e.busy||e.performancePending||e.uncertain||!l||!a||a!=="compatibility"&&!p?.available;return l?(0,c.jsxs)("section",{className:h.section,"data-whale-performance":!0,"data-settings-draft":"set-performance-mode",children:[(0,c.jsx)("h3",{children:o("performanceTitle")}),(0,c.jsx)("p",{className:h.hint,children:o("performanceHint")}),(0,c.jsx)("p",{className:h.hint,"data-whale-probe-cost":!0,children:"\u90E8\u5206\u6A21\u578B\u7684\u68C0\u6D4B\u4F1A\u53D1\u9001\u8BA1\u8D39\u77ED\u8BF7\u6C42\u3002"}),(0,c.jsxs)("details",{className:h.details,children:[(0,c.jsx)("summary",{children:"\u68C0\u6D4B\u8303\u56F4\u4E0E\u8D39\u7528"}),(0,c.jsx)("p",{children:o("performanceProbeCost")}),(0,c.jsx)("p",{children:o("performanceProbeScope")})]}),(0,c.jsx)(np,{capability:u,t:o,pending:e.performancePending,error:e.performanceError}),!u&&(0,c.jsx)("p",{className:h.hint,children:o("performanceReadFirst")}),s&&(0,c.jsxs)("p",{className:h.hint,children:["\u5F53\u524D\uFF1A",o("performance_"+s)]}),(0,c.jsx)("div",{className:h.segmented,children:["fast","balanced","high","compatibility"].map(m=>{let b=m==="compatibility"?null:u?Xi(u,m):"performanceReadFirst";return(0,c.jsx)(W.Button,{title:b?o(b):void 0,"aria-pressed":a===m,disabled:e.busy||e.performancePending||!!b,onClick:()=>{i?.("set-performance-mode"),d(m)},children:(0,c.jsx)(ep,{value:m,t:o})},m)})}),(0,c.jsxs)("div",{className:h.actions,children:[(0,c.jsx)(W.Button,{variant:"outline",disabled:e.busy||e.performancePending,onClick:()=>{t(n,"inspect-performance")},children:o("inspectPerformance")}),(0,c.jsx)(W.Button,{variant:"outline",disabled:f||a===s,onClick:()=>{t(n,"set-performance-mode",{revision:r.revision,performanceMode:a})},children:o("savePerformance")})]})]}):null}function pg({state:e,sessionId:n,run:t,t:o}){let i=e.outputVolumeFor===n?e.outputVolume:null,[r,s]=(0,M.useState)(null),[a,d]=(0,M.useState)(null),l=r??i?.volume??1,u=r!==null&&a!==i?.revision;return(0,M.useEffect)(()=>{s(null),d(null)},[n]),(0,c.jsxs)("section",{className:h.section,children:[(0,c.jsx)("h3",{children:o("outputVolume")}),i&&!i.supported&&(0,c.jsx)("p",{className:h.hint,children:o("outputVolumeUnavailable")}),i?.supported&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{className:h.volumeRow,children:[(0,c.jsxs)("label",{className:h.volumeControl,children:[(0,c.jsx)(Kt,{"aria-label":o("outputVolume"),min:"0",max:"1",step:"0.01",value:l,disabled:!i.supported||e.busy||e.outputVolumeUncertain,onChange:p=>{r===null&&d(i.revision),s(Number(p.target.value))}}),(0,c.jsxs)("span",{children:[Math.round(l*100),"%"]})]}),(0,c.jsx)(W.Button,{variant:"outline",disabled:!i.supported||e.busy||e.outputVolumeUncertain||u||r===null,onClick:async()=>{await t(n,"set-output-volume",{revision:a,volume:r})&&s(null)},children:o("saveOutputVolume")})]}),(0,c.jsx)("p",{className:h.hint,children:"\u4E0B\u4E00\u6BB5\u64AD\u653E\u751F\u6548"})]}),u&&(0,c.jsxs)("p",{role:"status",className:h.notice,children:["\u97F3\u91CF\u5DF2\u5728\u522B\u5904\u66F4\u65B0\uFF0C\u5F53\u524D\u9009\u62E9\u5DF2\u4FDD\u7559\u3002",(0,c.jsx)(W.Button,{variant:"outline",disabled:e.busy,onClick:()=>s(null),children:"\u4F7F\u7528\u5F53\u524D\u97F3\u91CF"})]}),!i&&(0,c.jsx)("p",{role:"status",className:h.hint,children:e.busy?o("pending"):o("statusRetry")}),e.outputVolumeUncertain&&(0,c.jsx)("p",{role:"status",className:h.notice,children:o("outputVolumeUnknown")})]})}function mg({state:e,sessionId:n,run:t,markSettingsEdited:o,discardSettingsDraft:i}){let r=e.settingsFor===n?e.settings:null,s=r?.conversationModel??{mode:"auto",provider:null,model:null},[a,d]=(0,M.useState)(s),[l,u]=(0,M.useState)(""),[p,f]=(0,M.useState)(!1),m=(0,M.useRef)(!1),b=(0,M.useRef)(!0);(0,M.useEffect)(()=>(b.current=!0,()=>{b.current=!1}),[]);let v=e.conversationModelsFor===n?e.conversationModels:null,w=v?.providers??[],k=w.find(G=>G.id===a.provider),z=a.mode==="auto"||!!k?.models.some(G=>G.id===a.model),H=JSON.stringify(a)!==JSON.stringify(s),B=So(e,n),O=!r||!B||e.busy||e.settingsConflict||e.visibilityUncertain||p,I=G=>{o?.("save-conversation-model"),d(S=>({...S,...G})),u("")},E=async()=>{if(O||m.current||!H||!z)return;m.current=!0,f(!0),u("");let G=await t(n,"save-conversation-model",{revision:r.revision,values:a.mode==="auto"?{mode:"auto",provider:null,model:null}:a});m.current=!1,b.current&&(f(!1),u(G?"\u9ED8\u8BA4\u5DF2\u4FDD\u5B58\uFF0C\u4E0B\u6B21\u5F00\u542F\u8BED\u97F3\u751F\u6548\u3002":"\u4FDD\u5B58\u672A\u6210\u529F\uFF0C\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002\u8BF7\u6838\u67E5\u63D0\u793A\u540E\u518D\u64CD\u4F5C\u3002"))};return(0,c.jsxs)("section",{className:h.section,"data-conversation-model":!0,"data-settings-draft":"save-conversation-model",children:[(0,c.jsx)("h3",{children:"\u9ED8\u8BA4\u5BF9\u8BDD\u6A21\u578B"}),(0,c.jsx)("p",{className:h.hint,children:"\u63A5\u6536\u8BED\u97F3\u8BC6\u522B\u540E\u7684\u6587\u5B57\uFF0C\u7528\u4E8E\u751F\u6210\u56DE\u7B54\u3002"}),(0,c.jsx)("fieldset",{className:h.radios,disabled:O,"aria-label":"\u5BF9\u8BDD\u6A21\u578B\u9009\u62E9\u65B9\u5F0F",children:[["auto","\u81EA\u52A8"],["manual","\u624B\u52A8\u6307\u5B9A"]].map(([G,S])=>(0,c.jsxs)("label",{children:[(0,c.jsx)("input",{type:"radio",name:"conversation-mode-"+n,checked:a.mode===G,onChange:()=>I(G==="auto"?{mode:G,provider:null,model:null}:{mode:G})}),S]},G))}),a.mode==="auto"&&(0,c.jsxs)("div",{className:h.section,children:[(0,c.jsx)("p",{className:h.hint,children:"\u8DDF\u968F\u5F53\u524D\u5BF9\u8BDD\u6240\u9009\u6A21\u578B\u3002\u7A7A\u767D\u9996\u9875\u4F7F\u7528 DSH \u7684\u9ED8\u8BA4\u6A21\u578B\u3002"}),(0,c.jsx)("p",{children:"\u5F00\u542F\u8BED\u97F3\u65F6\u786E\u5B9A\u6A21\u578B\u6765\u6E90"})]}),(0,c.jsx)(as,{open:a.mode==="manual",children:(0,c.jsxs)("div",{className:h.section,"data-conversation-manual":!0,children:[(0,c.jsx)(Ld,{label:"\u4F9B\u5E94\u5546",value:a.provider,options:w,disabled:O||!v,onChange:G=>I({provider:G,model:null})}),(0,c.jsx)(Ld,{label:"\u6A21\u578B",value:a.model,options:k?.models??[],disabled:O||!k,onChange:G=>I({model:G})}),(0,c.jsx)("p",{className:h.hint,children:"\u4EC5\u5217\u51FA\u5BBF\u4E3B\u5DF2\u914D\u7F6E\u7684\u5BF9\u8BDD\u4F9B\u5E94\u5546\u4E0E\u6A21\u578B\uFF0C\u4FDD\u5B58\u65F6\u518D\u6B21\u9A8C\u8BC1\u3002"}),!v&&(0,c.jsx)("p",{role:"status",children:e.conversationModelsError?"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u4F9B\u5E94\u5546\uFF0C\u8BF7\u91CD\u8BD5\u3002":"\u6B63\u5728\u8BFB\u53D6\u4F9B\u5E94\u5546\u2026"}),v&&!w.length&&(0,c.jsx)("p",{role:"status",children:"\u6682\u65E0\u53EF\u7528\u5BF9\u8BDD\u6A21\u578B\uFF0C\u8BF7\u5148\u5728 DSH \u4E2D\u914D\u7F6E\u4F9B\u5E94\u5546\u3002"}),a.provider&&!z&&(0,c.jsx)("p",{role:"status",children:"\u8BF7\u9009\u62E9\u5F53\u524D\u53EF\u7528\u7684\u4F9B\u5E94\u5546\u4E0E\u6A21\u578B\u3002\u539F\u9009\u62E9\u4E0D\u4F1A\u81EA\u52A8\u66FF\u6362\u3002"}),(0,c.jsx)(W.Button,{variant:"outline",disabled:e.busy,onClick:()=>{t(n,"conversation-models")},children:"\u5237\u65B0\u4F9B\u5E94\u5546"})]})}),(0,c.jsxs)("div",{className:h.actions,children:[(0,c.jsx)(W.Button,{variant:"primary",disabled:O||!H||!z,onClick:()=>{E()},children:p?"\u4FDD\u5B58\u4E2D\u2026":"\u4FDD\u5B58\u9ED8\u8BA4"}),(0,c.jsx)(W.Button,{variant:"outline",disabled:O||!H,onClick:()=>{d(s),u(""),i?.("save-conversation-model")},children:"\u53D6\u6D88\u4FEE\u6539"})]}),(0,c.jsx)("p",{role:"status",className:h.hint,children:l||(H?"\u5C1A\u672A\u4FDD\u5B58":s.mode==="auto"?"\u5DF2\u4FDD\u5B58\uFF1A\u81EA\u52A8 \xB7 \u8DDF\u968F\u5F53\u524D\u5BF9\u8BDD":`\u5DF2\u4FDD\u5B58\uFF1A${s.provider} / ${s.model}`)})]})}function Ld({label:e,value:n,options:t,disabled:o,onChange:i}){let[r,s]=(0,M.useState)(!1),[a,d]=(0,M.useState)(0),l=(0,M.useRef)(null),u=(0,M.useRef)(null),p=(0,M.useRef)(null),f=(0,M.useId)(),m=t.find(w=>w.id===n);(0,M.useEffect)(()=>{o&&s(!1)},[o]),(0,M.useEffect)(()=>{r&&p.current?.querySelector('[data-option-index="'+a+'"]')?.focus()},[r,a]);let b=()=>{s(!1),u.current?.focus()},v=w=>{i(w.id),b()};return(0,c.jsxs)("div",{ref:l,className:h.conversationChoice,onBlur:w=>{w.currentTarget.contains(w.relatedTarget)||s(!1)},children:[(0,c.jsx)("span",{id:f+"-label",children:e}),(0,c.jsxs)(W.Button,{ref:u,variant:"outline",className:h.deviceSelect,"aria-label":e,"aria-haspopup":"listbox","aria-expanded":r,"aria-controls":f,disabled:o||!t.length,onClick:()=>{d(Math.max(0,t.findIndex(w=>w.id===n))),s(!r)},onKeyDown:w=>{["ArrowDown","ArrowUp"].includes(w.key)&&(w.preventDefault(),d(Math.max(0,t.findIndex(k=>k.id===n))),s(!0))},children:[m?.name||n||"\u8BF7\u9009\u62E9",(0,c.jsx)("span",{"aria-hidden":"true",children:"\u2304"})]}),r&&(0,c.jsx)(W.MenuSurface,{ref:p,id:f,className:h.conversationOptions,role:"listbox","aria-labelledby":f+"-label",onKeyDown:w=>{w.key==="Escape"?(w.preventDefault(),w.stopPropagation(),b()):["ArrowDown","ArrowUp","Home","End"].includes(w.key)&&(w.preventDefault(),d(k=>w.key==="Home"?0:w.key==="End"?t.length-1:(k+(w.key==="ArrowDown"?1:-1)+t.length)%t.length))},children:t.map((w,k)=>(0,c.jsxs)("button",{type:"button",role:"option","aria-selected":n===w.id,tabIndex:k===a?0:-1,"data-option-index":k,onClick:()=>v(w),children:[w.name,n===w.id&&(0,c.jsx)("span",{"aria-hidden":"true",children:" \u2713"})]},w.id))})]})}function fg({state:e,sessionId:n,run:t,markSettingsEdited:o,discardSettingsDraft:i,t:r}){let s=e.settingsFor===n?e.settings:null,a=s?.voicePrompt,d=a?.text??"",[l,u]=(0,M.useState)(d),[p,f]=(0,M.useState)(!1),[m,b]=(0,M.useState)(""),v=(0,M.useRef)(!1),w=(0,M.useRef)(!0),k=(0,M.useRef)(d),z=(0,M.useId)();(0,M.useEffect)(()=>(w.current=!0,()=>{w.current=!1}),[]),(0,M.useEffect)(()=>{if(k.current!==d){let _=k.current;u(T=>T===_?d:T),k.current=d}},[d]);let H=l.trim()?l:"",B=H!==(d.trim()?d:""),O=So(e,n),I=!s||!O||e.busy||e.settingsConflict||e.visibilityUncertain||p,E=!!H&&a?.customSupported!==!0,G=l.length<=32768&&!E,S=async()=>{if(I||v.current||!B||!G)return;v.current=!0,f(!0),b("");let _=!1;try{_=await t(n,"save-voice-prompt",{revision:s.revision,values:{text:H}})}catch{_=!1}finally{v.current=!1,w.current&&(f(!1),b(r(_?"voicePromptSaved":"voicePromptSaveFailed")))}};return(0,c.jsxs)("section",{className:`${h.section} ${h.voicePrompt}`,"data-voice-prompt":!0,"data-settings-draft":"save-voice-prompt",children:[(0,c.jsxs)("label",{htmlFor:z,children:[r("voicePromptLabel")," ",(0,c.jsx)("span",{className:h.hint,children:r("voicePromptOptional")})]}),(0,c.jsx)("textarea",{id:z,className:h.voicePromptInput,value:l,maxLength:32768,disabled:I,placeholder:r("voicePromptPlaceholder"),"aria-describedby":z+"-count "+z+"-feedback",onChange:_=>{o?.("save-voice-prompt"),u(_.target.value),b("")}}),(0,c.jsxs)("div",{id:z+"-count",className:h.voicePromptCount,children:[l.length.toLocaleString("en-US")," / 32,768"]}),(0,c.jsxs)("div",{className:h.voicePromptActions,children:[(0,c.jsxs)("div",{className:h.actions,children:[(0,c.jsx)(W.Button,{variant:"primary",disabled:I||!B||!G,onClick:()=>{S()},children:r(p?"voicePromptSaving":"voicePromptSave")}),(0,c.jsx)(W.Button,{variant:"outline",disabled:I||l===d,onClick:()=>{u(d),b(""),i?.("save-voice-prompt")},children:r("voicePromptCancel")})]}),(0,c.jsx)("span",{className:h.hint,children:r("voicePromptStopToEdit")})]}),(0,c.jsx)("p",{id:z+"-feedback",role:"status",className:h.hint,children:m||(l.length>32768?r("voicePromptTooLong"):a?.customSupported===!1||E?r("voicePromptUnsupported"):B?r("voicePromptUnsaved"):"")})]})}var bw=Object.freeze({version:1,available:!1,reason:"planned"}),Vt=["audio","interaction","prompt","models","advanced","sessions","pets"],hg={audio:"\u9009\u62E9\u9EA6\u514B\u98CE\u3001\u8BF4\u8BDD\u65B9\u5F0F\u4E0E\u63D0\u793A\u97F3\u3002",interaction:"\u8BBE\u7F6E\u6309\u952E\u3001\u56DE\u7B54\u901F\u5EA6\u4E0E\u754C\u9762\u52A8\u753B\u3002",prompt:"\u8BBE\u7F6E\u8BED\u97F3\u5BF9\u8BDD\u7684\u8868\u8FBE\u65B9\u5F0F\u3002",models:"\u9009\u62E9\u6717\u8BFB\u65B9\u5F0F\uFF0C\u6216\u7BA1\u7406\u672C\u5730\u6A21\u578B\u3002",advanced:"\u67E5\u770B\u6743\u9650\u3001\u8BF7\u6C42\u4E0E\u8FD0\u884C\u8BE6\u60C5\u3002",sessions:"\u9009\u62E9\u8BED\u97F3\u5BF9\u8BDD\u76EE\u6807\uFF0C\u67E5\u770B\u9C7C\u5E94\u4F1A\u8BDD\u548C\u5B50\u4EE3\u7406\u3002",pets:"\u684C\u5BA0\u529F\u80FD\u5C1A\u672A\u5F00\u653E\u3002"};function gg(e){let{t:n,sessionId:t}=e,o=e.useWhaleUi(S=>S),i=e.useWhalePreferences(S=>S),r=o.settingsTab||"audio",s=o.settingsModelTab||"conversation",[a,d]=(0,M.useState)(()=>new Set([o.settingsTab||"audio"])),[l,u]=(0,M.useState)(()=>new Set([o.settingsModelTab||"conversation"])),[p,f]=(0,M.useState)(0),m=(0,M.useRef)(null),b=(0,M.useRef)(null),v=(0,M.useRef)(0),w=(0,M.useRef)(new Set),k=(0,M.useRef)(o.readRefresh),z=(0,M.useId)();(0,M.useLayoutEffect)(()=>{m.current&&(m.current.scrollTop=0)},[r,s]),(0,M.useEffect)(()=>{e.setSession?.(t)},[t]),(0,M.useEffect)(()=>()=>{v.current++,e.cancelPreview?.(),e.discardDiagnostics?.()},[]),(0,M.useEffect)(()=>{w.current.clear()},[t,r,s]),(0,M.useEffect)(()=>{r==="models"&&e.refreshModelCompute?.(t)},[t,r,s]),(0,M.useEffect)(()=>{if(o.busy||o.ttsCancelling||["pets","sessions"].includes(r))return;let S=e.readState?.();if(S?.busy||S?.ttsCancelling)return;if(k.current!==o.readRefresh){k.current=o.readRefresh;for(let P of["read-output-volume","model-installer","agent-requests"])w.current.delete(P)}let N=[...!o.settings||o.settingsFor!==t?["read-settings"]:[],...!o.status||o.checkedFor!==t||r==="advanced"?["status"]:[],...r==="audio"?["read-output-volume"]:[],...r==="models"&&s==="conversation"?["conversation-models"]:[],...t&&r==="advanced"?["agent-requests"]:[],...t&&r==="interaction"&&o.performanceFor!==t?["inspect-performance"]:[],...r==="models"&&s==="voice"&&(!o.ttsCapabilities||o.ttsCapabilitiesFor!==t)?["inspect-tts"]:[],...r==="models"?["model-installer"]:[]].find(P=>!w.current.has(P));N&&(w.current.add(N),e.run(t,N,{},!0))},[t,r,s,o.readRefresh,o.busy,o.ttsCancelling,o.settingsFor,o.checkedFor,o.outputVolumeFor,o.agentRequestsFor,o.performanceFor,o.ttsCapabilitiesFor,o.installerFor]);let H=async(S,_=!1)=>{let T=++v.current;e.cancelPreview&&!await e.cancelPreview()||(e.discardDiagnostics?.(),T===v.current&&(d(N=>new Set([...N,S])),e.setSettingsTab(S),_&&b.current?.querySelector(`[data-settings-tab="${S}"]`)?.focus({preventScroll:!0})))},B=async S=>{let _=++v.current;e.cancelPreview&&!await e.cancelPreview()||(e.discardDiagnostics?.(),_===v.current&&(u(T=>new Set([...T,S])),e.setSettingsModelTab(S)))},O=o.settingsFor===t?o.settings:null,I=!o.uncertain&&o.checkedFor===t,E=I&&o.status?.enabled&&(r==="interaction"||r==="models"&&s==="download"),G=O&&(0,c.jsx)(ag,{settings:O,sessionId:t,busy:o.busy||o.visibilityUncertain||o.settingsConflict,run:e.run,t:n,status:o.status,statusFresh:I,verified:I&&!!o.status,tab:r,markSettingsEdited:e.markSettingsEdited,discardSettingsDraft:e.discardSettingsDraft,bindingError:o.bindingError,captureBindings:e.captureBindings},t+":"+(o.settingsKey??O.revision));return(0,c.jsxs)("div",{className:h.settings,"data-whale-settings":!0,"data-motion":i.motion,children:[(0,c.jsxs)("header",{className:h.settingsHeader,"data-settings-header":!0,children:[(0,c.jsxs)(W.Button,{className:h.backButton,"data-whale-operation":"page-home",onClick:e.showHome,"aria-label":"\u8FD4\u56DE\u8BED\u97F3",children:[(0,c.jsx)(Qe,{name:"chevron",className:h.backIcon}),(0,c.jsx)("span",{children:"\u8FD4\u56DE\u8BED\u97F3"})]}),(0,c.jsxs)("div",{className:h.settingsBrand,children:[(0,c.jsx)(at,{small:!0}),(0,c.jsx)("h2",{children:n("settingsTitle")})]}),(0,c.jsx)(W.Button,{className:h.guideButton,"data-whale-operation":"page-setup",onClick:e.openSetup,"aria-label":"\u91CD\u65B0\u6253\u5F00\u914D\u7F6E\u5F15\u5BFC",title:"\u91CD\u65B0\u6253\u5F00\u914D\u7F6E\u5F15\u5BFC",children:"\u914D\u7F6E\u5F15\u5BFC"})]}),(0,c.jsxs)("div",{className:h.settingsLayout,children:[(0,c.jsx)("nav",{ref:b,className:h.settingsNav,"data-settings-nav":!0,"aria-label":n("settingsSections"),onKeyDown:S=>{let _=Vt.indexOf(S.target.dataset.settingsTab);if(_<0||!["ArrowDown","ArrowUp","ArrowLeft","ArrowRight","Home","End"].includes(S.key))return;S.preventDefault();let T=S.key==="Home"?0:S.key==="End"?Vt.length-1:(_+(["ArrowDown","ArrowRight"].includes(S.key)?1:-1)+Vt.length)%Vt.length;H(Vt[T],!0)},children:Vt.map(S=>(0,c.jsx)(W.Button,{"data-settings-tab":S,"aria-pressed":r===S,"aria-controls":z+"-body",onClick:()=>{H(S)},children:n("tab_"+S)},S))}),(0,c.jsxs)("div",{className:h.settingsPage,children:[(0,c.jsxs)("div",{className:`${h.pageHeading} ${r==="models"?h.modelHeading:""}`,"data-settings-page-heading":!0,"data-no-drag":!0,children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("h3",{id:z,children:n("tab_"+r)}),r!=="models"&&(0,c.jsx)("p",{children:hg[r]})]}),r==="prompt"&&O&&(0,c.jsx)("span",{className:h.voicePromptMode,"data-voice-prompt-mode":!0,children:n(O.voicePrompt?.mode==="custom"&&O.voicePrompt?.customSupported===!0?"voicePromptCustom":"voicePromptAgents")}),r==="models"&&(0,c.jsx)("nav",{className:h.modelNav,"aria-label":"\u6A21\u578B\u8BBE\u7F6E\u5206\u7C7B","data-no-drag":!0,children:[["conversation","\u5BF9\u8BDD\u6A21\u578B"],["voice","\u6717\u8BFB\u65B9\u5F0F"],["download","\u6A21\u578B\u4E0B\u8F7D"],["paths","\u9AD8\u7EA7\u8DEF\u5F84"]].map(([S,_])=>(0,c.jsx)(W.Button,{"aria-pressed":s===S,onClick:()=>{B(S)},children:_},S))})]}),(0,c.jsxs)("div",{ref:m,id:z+"-body",className:h.settingsBody,"data-settings-body":!0,"data-no-drag":!0,onChangeCapture:S=>{let _=S.target.closest("[data-settings-draft]");_&&!S.target.closest("[data-no-settings-draft]")&&e.markSettingsEdited?.(_.dataset.settingsDraft)},tabIndex:0,"aria-label":n("settingsContent"),children:[r==="sessions"?(0,c.jsxs)(c.Fragment,{children:[e.listExistingVoiceSessions&&!o.sessionManagementRoot&&(0,c.jsx)(Ui,{...e,state:o}),(0,c.jsx)(bg,{...e,state:o})]}):r==="pets"?(0,c.jsxs)("section",{className:h.placeholder,"data-whale-pet":!0,"aria-label":n("tab_pets"),children:[(0,c.jsx)(Qe,{name:"pet"}),(0,c.jsx)("h3",{children:n("tab_pets")}),(0,c.jsx)("p",{children:n("planned")})]}):(0,c.jsxs)(c.Fragment,{children:[o.error&&(0,c.jsx)("div",{role:"alert",className:h.error,children:n("operationUnavailable")}),o.settingsConflict&&(0,c.jsxs)("p",{role:"status",className:h.notice,children:["\u8BBE\u7F6E\u5DF2\u5728\u522B\u5904\u66F4\u65B0\uFF0C\u5F53\u524D\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002",(0,c.jsx)(W.Button,{variant:"outline",disabled:o.busy,onClick:()=>e.discardSettingsDraft?.(),children:"\u653E\u5F03\u8349\u7A3F\u5E76\u4F7F\u7528\u6700\u65B0\u8BBE\u7F6E"})]}),o.visibilityUncertain&&(0,c.jsx)("p",{role:"status",className:h.notice,children:n("configurationUnknown")}),!E&&(0,c.jsx)(Pr,{state:o,sessionId:t,run:e.run,refresh:e.refresh,canStopTts:r!=="models"||s!=="voice",t:n})]}),(0,c.jsx)("div",{hidden:!["audio","interaction","advanced"].includes(r),children:G}),(r==="audio"||a.has("audio"))&&(0,c.jsx)("div",{hidden:r!=="audio",children:(0,c.jsx)(pg,{...e,state:o})}),(r==="interaction"||a.has("interaction"))&&(0,c.jsxs)("div",{hidden:r!=="interaction",children:[O&&(0,c.jsx)(dg,{...e,state:o},"performance:"+t+":"+(o.settingsKey??O.revision)),(0,c.jsxs)("section",{className:h.section,children:[(0,c.jsx)("h3",{children:n("motionTitle")}),(0,c.jsx)("div",{className:h.segmented,children:["spring","firm","off"].map(S=>(0,c.jsx)(W.Button,{"aria-pressed":i.motion===S,onClick:()=>{e.setMotion(S),f(p+1)},children:n("motion_"+S)},S))}),(0,c.jsx)("div",{className:h.motionPreview,"aria-hidden":"true",children:(0,c.jsx)(at,{small:!0})},p),(0,c.jsx)("p",{className:h.hint,children:n("motionHint")}),i.error&&(0,c.jsx)("p",{role:"status",children:n("motionNotSaved")})]})]}),(r==="prompt"||a.has("prompt"))&&O&&(0,c.jsx)("div",{hidden:r!=="prompt",children:(0,c.jsx)(fg,{...e,state:o},"prompt:"+t+":"+(o.settingsKey??O.revision))}),(r==="models"||a.has("models"))&&(0,c.jsxs)("div",{hidden:r!=="models",children:[O&&(s==="conversation"||l.has("conversation"))&&(0,c.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="conversation",children:(0,c.jsx)(mg,{...e,state:o},"conversation:"+t+":"+(o.settingsKey??O.revision))}),(s==="voice"||l.has("voice"))&&(0,c.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="voice",children:(0,c.jsx)(Md,{pickPath:e.pickPath,state:o,sessionId:t,run:e.run,markSettingsEdited:e.markSettingsEdited,prepared:!0,active:r==="models"&&s==="voice"})}),(s==="download"||l.has("download"))&&(0,c.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="download",children:(0,c.jsx)(Fd,{state:o,sessionId:t,run:e.run})}),O?.modelSetup&&(0,c.jsx)(cg,{modelTab:s,markSettingsEdited:e.markSettingsEdited,pickPath:e.pickPath,senseVoiceAsrAction:e.senseVoiceAsrAction,active:r==="models",settings:O,sessionId:t,busy:o.busy||o.visibilityUncertain||o.settingsConflict,run:e.run,t:n},t+":"+(o.settingsKey??O.revision)),(s==="paths"||l.has("paths"))&&(0,c.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="paths",children:(0,c.jsx)(Ud,{state:o,sessionId:t,run:e.run,pickPath:e.pickPath,active:r==="models"&&s==="paths"})})]}),(r==="advanced"||a.has("advanced"))&&(0,c.jsxs)("div",{hidden:r!=="advanced",children:[e.updateAction&&(0,c.jsx)(zd,{state:o,open:e.openUpdate,t:n}),(0,c.jsxs)("section",{className:h.section,"aria-label":n("projectInfoTitle"),children:[(0,c.jsx)("h3",{children:n("projectInfoTitle")}),(0,c.jsxs)("dl",{className:h.details,children:[(0,c.jsx)("dt",{children:n("projectAuthor")}),(0,c.jsx)("dd",{children:(0,c.jsx)("a",{href:ji.url,target:"_blank",rel:"noreferrer noopener",children:ji.name})}),(0,c.jsx)("dt",{children:n("projectRepository")}),(0,c.jsx)("dd",{children:(0,c.jsxs)("a",{href:Ed,target:"_blank",rel:"noreferrer noopener",children:["Emikosama/",wr]})}),(0,c.jsx)("dt",{children:n("projectNpm")}),(0,c.jsx)("dd",{children:(0,c.jsx)("a",{href:`https://www.npmjs.com/package/${wr}`,target:"_blank",rel:"noreferrer noopener",children:wr})})]})]}),(0,c.jsx)(wg,{...e,state:o,active:r==="advanced"}),(0,c.jsx)(Od,{readOperationLog:e.readOperationLog}),(0,c.jsx)(yg,{state:o,sessionId:t,t:n}),(0,c.jsxs)("details",{className:h.section,children:[(0,c.jsx)("summary",{children:"\u5BF9\u8BDD\u663E\u793A\u4E0E\u517C\u5BB9\u6027"}),O?.voiceSession&&(0,c.jsx)(lg,{settings:O,state:o,sessionId:t,run:e.run,t:n},"visibility:"+t+":"+(o.settingsKey??O.revision))]})]})]})]})]})]})}var vg=new Intl.DateTimeFormat("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"});function bg({manageSessions:e,openManagedSession:n,renameManagedSession:t,setSessionManagement:o,state:i}){let r=i.sessionManagementRoot??null,[s,a]=(0,M.useState)(null),[d,l]=(0,M.useState)(null),[u,p]=(0,M.useState)(!1),[f,m]=(0,M.useState)(null),[b,v]=(0,M.useState)(null),w=(0,M.useRef)(null),k=(0,M.useCallback)(async(N,{append:P=!1}={})=>{if(!e)return;w.current?.abort();let C=new AbortController;w.current=C,p(!0),m(null);try{N.operation!=="list"&&(await e(N,C.signal),C.signal.aborted||m(N.operation==="restore"?"\u5DF2\u53D6\u6D88\u5F52\u6863\u3002\u53EF\u6253\u5F00\u539F\u4F1A\u8BDD\u7EE7\u7EED\u3002":"\u5DF2\u516C\u5F00\u6B64\u4F1A\u8BDD\u3002"));let F=await e(N.operation==="list"?N:{operation:"list",...r?{rootId:r}:{}},C.signal);if(C.signal.aborted||w.current!==C)return;a(V=>P&&V?{...F,items:[...new Map([...V.items,...F.items].map(Z=>[Z.id,Z])).values()]}:F)}catch(F){C.signal.aborted||m(String(F?.message??"\u65E0\u6CD5\u8BFB\u53D6\u9C7C\u5E94\u4F1A\u8BDD").slice(0,400))}finally{w.current===C&&(w.current=null,p(!1))}},[r,e]);(0,M.useEffect)(()=>(k({operation:"list",...r?{rootId:r}:{}}),()=>{let N=w.current;w.current=null,N?.abort()}),[k,r]);let z=N=>{a(null),l(null),v(null),o({rootId:N,historyOpen:!1})},H=(N,P)=>{v(null),l({operation:N,id:P.id,rootId:P.rootId})},B=async N=>{try{await n(N)}catch(P){m(String(P?.message??"\u65E0\u6CD5\u5728 DSH \u6253\u5F00\u4F1A\u8BDD").slice(0,400))}},O=async N=>{N.preventDefault();let P=b.title.trim();if(!(!P||u)){p(!0),m(null);try{let C=await t(b.id,P);a(F=>F&&{...F,items:F.items.map(V=>V.id===b.id?{...V,title:C}:V)}),v(null),m("\u5DF2\u4FDD\u5B58\u4F1A\u8BDD\u540D\u79F0\u3002")}catch(C){m(String(C?.message??"\u65E0\u6CD5\u91CD\u547D\u540D\u4F1A\u8BDD").slice(0,400))}finally{p(!1)}}},I=r?s?.items?.find(N=>N.id===r):null,E={restore_unavailable:"\u6062\u590D\u63A5\u53E3\u4E0D\u53EF\u7528",archive_state_unavailable:"\u65E0\u6CD5\u8BFB\u53D6\u5F52\u6863\u72B6\u6001",persistence_unavailable:"\u4F1A\u8BDD\u5B58\u50A8\u6682\u65F6\u4E0D\u53EF\u7528",policy_mismatch:"\u5F53\u524D\u4F1A\u8BDD\u6743\u9650\u4E0E\u539F\u4F1A\u8BDD\u4E0D\u540C",presentation_mismatch:"\u5F53\u524D DSH \u65E0\u6CD5\u786E\u8BA4\u4F1A\u8BDD\u7684\u9690\u85CF\u72B6\u6001",visibility_mismatch:"\u5F53\u524D\u663E\u793A\u8BBE\u7F6E\u4E0E\u539F\u4F1A\u8BDD\u4E0D\u540C"},G=N=>(0,c.jsx)("ul",{className:h.permissionList,children:N.map(P=>(0,c.jsxs)("li",{children:[(0,c.jsx)("strong",{className:h.sessionTitle,children:P.title||(P.kind==="root"?"\u672A\u547D\u540D\u4F1A\u8BDD":"\u672A\u547D\u540D\u5B50\u4EE3\u7406")+" \xB7 "+P.id.slice(-6).toUpperCase()}),(0,c.jsxs)("p",{className:h.hint,children:[P.archived?"\u5DF2\u5F52\u6863":P.visibility==="hidden"?"\u5DF2\u9690\u85CF":P.visibility==="visible"||P.visibility==="workspace"?"\u53EF\u89C1":"\u53EF\u89C1\u6027\u672A\u77E5",E[P.reason]?" \xB7 "+E[P.reason]:""]}),Number.isFinite(P.createdAt)&&(0,c.jsxs)("p",{className:h.hint,children:["\u521B\u5EFA\u4E8E ",(0,c.jsx)("time",{dateTime:new Date(P.createdAt).toISOString(),children:vg.format(P.createdAt)})]}),(0,c.jsxs)("div",{className:h.actions,children:[P.kind==="root"&&!r&&(0,c.jsx)(W.Button,{variant:"outline",disabled:u,"data-whale-operation":"show-subagents",onClick:()=>z(P.id),children:"\u67E5\u770B\u5B50\u4EE3\u7406"}),n&&["live","available"].includes(P.status)&&(0,c.jsx)(W.Button,{variant:"outline","data-whale-operation":P.kind==="root"?"open-native-session":"open-native-subagent",onClick:()=>B(P),children:"\u5728 DSH \u6253\u5F00"}),t&&P.kind==="root"&&["live","available","archived"].includes(P.status)&&(0,c.jsx)(W.Button,{variant:"outline",disabled:u,onClick:()=>{l(null),v({id:P.id,title:P.title??""})},children:"\u91CD\u547D\u540D"}),P.canUnhide&&(0,c.jsx)(W.Button,{variant:"outline",disabled:u,onClick:()=>H("unhide",P),children:"\u53D6\u6D88\u9690\u85CF"}),P.canRestore&&(0,c.jsx)(W.Button,{variant:"outline",disabled:u,onClick:()=>H("restore",P),children:"\u6062\u590D\u5F52\u6863"})]}),d?.id===P.id&&(0,c.jsxs)("div",{className:h.actions,children:[(0,c.jsx)("span",{children:d.operation==="unhide"?"\u786E\u8BA4\u5728 DSH \u516C\u5F00\u6B64\u4F1A\u8BDD\uFF1F":"\u786E\u8BA4\u53D6\u6D88\u6B64\u4F1A\u8BDD\u7684\u5F52\u6863\uFF1F"}),(0,c.jsx)(W.Button,{variant:"primary",disabled:u,onClick:()=>{let C=d;l(null),k(C)},children:"\u786E\u8BA4"}),(0,c.jsx)(W.Button,{variant:"outline",onClick:()=>l(null),children:"\u53D6\u6D88"})]}),b?.id===P.id&&(0,c.jsxs)("form",{className:h.sessionRename,onSubmit:O,children:[(0,c.jsx)(W.Input,{"aria-label":"\u4F1A\u8BDD\u540D\u79F0",value:b.title,maxLength:128,disabled:u,onChange:C=>v({...b,title:C.target.value})}),(0,c.jsxs)("div",{className:h.actions,children:[(0,c.jsx)(W.Button,{type:"submit",variant:"primary",disabled:u||!b.title.trim(),children:"\u4FDD\u5B58\u540D\u79F0"}),(0,c.jsx)(W.Button,{type:"button",variant:"outline",disabled:u,onClick:()=>v(null),children:"\u53D6\u6D88"})]})]})]},P.id))}),S=(s?.items??[]).filter(N=>N.id!==r),_=S.filter(N=>N.active),T=S.filter(N=>!N.active).sort((N,P)=>(P.createdAt??-1)-(N.createdAt??-1));return(0,c.jsxs)("section",{className:h.section,"data-whale-session-management":!0,children:[r&&(0,c.jsx)(W.Button,{variant:"outline",disabled:u,"data-whale-operation":"show-main-sessions",onClick:()=>z(null),children:"\u8FD4\u56DE\u4E3B\u4F1A\u8BDD"}),u&&!s&&(0,c.jsx)("p",{role:"status",children:"\u6B63\u5728\u8BFB\u53D6\u9C7C\u5E94\u4F1A\u8BDD\u2026"}),f&&(0,c.jsx)("p",{role:"status",className:h.notice,children:f}),I&&G([I]),I?.childrenAvailable&&I?.childrenIncomplete&&(0,c.jsx)("p",{role:"status",children:"\u90E8\u5206\u5B50\u4EE3\u7406\u8BB0\u5F55\u6682\u65F6\u65E0\u6CD5\u6838\u9A8C\u3002\u5F53\u524D\u663E\u793A\u5DF2\u6838\u9A8C\u7684\u4F1A\u8BDD\u3002"}),I&&!I.childrenAvailable&&(0,c.jsx)("p",{role:"status",children:"\u5F53\u524D\u65E0\u6CD5\u8BFB\u53D6\u6B64\u4F1A\u8BDD\u7684\u5B50\u4EE3\u7406\u8BB0\u5F55\u3002"}),I?.childrenAvailable&&!I.childrenIncomplete&&!S.length&&(0,c.jsx)("p",{children:"\u6B64\u4F1A\u8BDD\u8FD8\u6CA1\u6709\u5B50\u4EE3\u7406\u3002"}),_.length>0&&G(_),s&&!r&&_.length===0&&(0,c.jsx)("p",{className:h.hint,children:"\u6682\u65E0\u6D3B\u8DC3\u4F1A\u8BDD\u3002"}),(T.length>0||s?.nextCursor)&&(0,c.jsxs)("details",{className:h.section,"data-whale-session-history":!0,open:i.sessionHistoryOpen===!0,onToggle:N=>{let{open:P}=N.currentTarget;P!==!!i.sessionHistoryOpen&&o({historyOpen:P})},children:[(0,c.jsx)("summary",{"data-whale-operation":r?"subagent-history":"session-history",children:r?"\u5386\u53F2\u5B50\u4EE3\u7406":"\u5386\u53F2\u4F1A\u8BDD"}),G(T),!!s?.nextCursor&&(0,c.jsx)(W.Button,{disabled:u,onClick:()=>{k({operation:"list",cursor:s.nextCursor},{append:!0})},children:"\u52A0\u8F7D\u66F4\u591A"})]}),(0,c.jsx)(W.Button,{variant:"outline",disabled:u,onClick:()=>{k({operation:"list",...r?{rootId:r}:{}})},children:"\u5237\u65B0\u4F1A\u8BDD"}),s?.capabilities?.unhide?.supported===!1&&(0,c.jsx)("p",{className:h.hint,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u65F6\u65E0\u6CD5\u628A\u5B50\u4EE3\u7406\u52A0\u5165\u4FA7\u8FB9\u680F\u3002"}),s?.capabilities?.restore?.supported===!1&&(0,c.jsx)("p",{className:h.hint,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u65F6\u65E0\u6CD5\u901A\u8FC7\u9C7C\u5E94\u53D6\u6D88\u5F52\u6863\u3002"})]})}function yg({state:e,sessionId:n,t}){let o=e.status,i=o?.ownerSessionId,s=!e.uncertain&&e.checkedFor===n&&typeof o?.helper?.lastError=="string"?o.helper.lastError:null,a=e.error??e.enableError;return(0,c.jsxs)("details",{className:h.section,children:[(0,c.jsx)("summary",{children:t("details")}),(0,c.jsxs)("dl",{className:h.details,children:[(0,c.jsx)("dt",{children:t("source")}),(0,c.jsx)("dd",{"data-whale-owner":!0,"data-session-id":i??"",children:i||t("none")}),(0,c.jsx)("dt",{children:t("actor")}),(0,c.jsx)("dd",{"data-whale-actor":!0,"data-session-id":n??"",children:n||t("openSession")})]}),(0,c.jsx)("p",{className:h.hint,children:t("snapshot")}),a&&(0,c.jsx)("pre",{className:h.requestDetails,children:a}),s&&(0,c.jsxs)("div",{"data-whale-helper-error":!0,children:[(0,c.jsx)("strong",{children:t("inputDiagnosticTitle")}),(0,c.jsx)("pre",{className:h.requestDetails,children:s}),(0,c.jsx)("p",{className:h.hint,children:t("inputDiagnosticHistory")})]}),(0,c.jsx)("p",{className:h.hint,children:t("consequence")}),(0,c.jsx)("p",{className:h.hint,children:o?.helper?.online?t("helperOnline"):t("helperOffline")}),o?.turnSignals?.outputStartObservation?.status==="unsupported"&&(0,c.jsx)("p",{className:h.hint,children:t("outputObservationUnavailable")})]})}function wg({state:e,sessionId:n,run:t,openAuthorization:o,active:i=!0}){let r=(0,M.useRef)(null),s=(0,M.useRef)(0);(0,M.useEffect)(()=>{r.current=null,s.current++},[i,n]),(0,M.useEffect)(()=>{if(!i||!n||e.busy||e.agentRequestsFor===n||r.current===n)return;r.current=n;let d=s.current;s.current===d&&t(n,"agent-requests")},[i,n,e.busy]);let a=e.agentRequestsFor===n?e.agentRequests:null;return(0,c.jsxs)("section",{className:h.section,"data-whale-agent-requests":!0,children:[(0,c.jsx)("h3",{children:"Agent \u64CD\u4F5C\u8BB0\u5F55"}),(0,c.jsx)(W.Button,{"data-whale-operation":"page-authorization",onClick:()=>{o?.()},children:"\u6388\u6743\u8303\u56F4\u4E0E\u64A4\u9500"}),(e.agentPermissionUncertain||e.agentRequestUncertain)&&(0,c.jsx)("p",{role:"alert",className:h.notice,children:"\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u4F1A\u81EA\u52A8\u6838\u67E5\u5BF9\u5E94\u6743\u9650\u548C\u8BF7\u6C42\u72B6\u6001\uFF0C\u4E0D\u4F1A\u91CD\u590D\u6267\u884C\u3002"}),a?.items?.length===0&&(0,c.jsx)("p",{className:h.hint,children:"\u6CA1\u6709\u5F85\u5904\u7406\u8BF7\u6C42\u3002"}),a?.items?.map(d=>(0,c.jsxs)("section",{className:h.section,"data-agent-request":d.id,children:[(0,c.jsxs)("strong",{children:[d.title," \xB7 ",d.state]}),(0,c.jsxs)("p",{className:h.hint,children:["\u53D1\u8D77\u4F1A\u8BDD\uFF1A",d.sourceSessionId]}),(0,c.jsxs)("details",{children:[(0,c.jsx)("summary",{children:"\u6838\u5BF9\u5B8C\u6574\u53D8\u66F4\u8BA1\u5212"}),(0,c.jsx)("pre",{className:h.requestDetails,children:JSON.stringify({\u5F53\u524D\u8BBE\u7F6E:d.before,\u8BF7\u6C42:d.request,...d.installPlan?{\u4E0B\u8F7D\u8BA1\u5212:d.installPlan}:{},...d.modelApplyTarget?{\u6A21\u578B\u5E94\u7528\u76EE\u6807:d.modelApplyTarget}:{}},null,2)})]}),d.error&&(0,c.jsx)("p",{role:"alert",className:h.error,children:d.error.message}),d.state==="pending"&&(0,c.jsx)(W.Button,{variant:"outline",disabled:e.busy||e.agentRequestUncertain,onClick:()=>{t(n,"decide-agent-request",{id:d.id,approve:!1,acknowledgements:[]})},children:"\u53D6\u6D88\u9884\u89C8"}),d.nextAction&&(0,c.jsx)("p",{className:h.hint,children:d.nextAction})]},d.id))]})}var tp={startConversation:"\u5F00\u59CB\u5BF9\u8BDD",endConversation:"\u7ED3\u675F\u5BF9\u8BDD",voiceTarget:"\u6295\u9012\u5230",dedicatedVoiceTarget:"\u9C7C\u5E94\u4E13\u7528\u4F1A\u8BDD",checkingVoiceTarget:"\u6B63\u5728\u6838\u5BF9\u76EE\u6807\u2026",voiceTargetChanged:"\u8BED\u97F3\u6295\u9012\u76EE\u6807\u6709\u53D8\u5316\u3002\u8BF7\u6838\u5BF9\u9996\u9875\u7684\u4F1A\u8BDD\u540E\u518D\u5F00\u59CB\u3002",chooseCurrentDshTarget:"\u4F7F\u7528\u5F53\u524D\u6253\u5F00\u4F1A\u8BDD",backToFishVoice:"\u56DE\u5230\u9C7C\u5E94",currentDshTargetError:"\u65E0\u6CD5\u786E\u8BA4\u5F53\u524D DSH \u5BF9\u8BDD\uFF0C\u8BF7\u6838\u5BF9\u540E\u91CD\u8BD5\u3002",chooseVoiceTarget:"\u9009\u62E9\u6295\u9012\u4F1A\u8BDD",searchVoiceTargets:"\u641C\u7D22\u4F1A\u8BDD\u6807\u9898\u6216 ID",searchVoiceTargetsAction:"\u641C\u7D22",existingVoiceTargetList:"\u5DF2\u6709 DSH \u4F1A\u8BDD",boundVoiceTarget:"\u5F53\u524D\u7ED1\u5B9A",voiceTargetAvailability_ready:"\u53EF\u7528",voiceTargetAvailability_busy:"\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F",voiceTargetAvailability_archived:"\u4F1A\u8BDD\u5DF2\u5F52\u6863",voiceTargetAvailability_unavailable:"\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528",voiceTargetAvailability_managed:"\u9C7C\u5E94\u7BA1\u7406\u7684\u4F1A\u8BDD\uFF0C\u65E0\u6CD5\u76F4\u63A5\u6295\u9012",voiceTargetAvailability_subagent:"\u5B50\u4EE3\u7406\u4F1A\u8BDD\uFF0C\u65E0\u6CD5\u76F4\u63A5\u6295\u9012",voiceTargetNoMatch:"\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684\u4F1A\u8BDD\u3002",voiceTargetEmptyList:"\u6682\u65E0\u53EF\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u3002",voiceTargetSynthesisNotice:"\u4F7F\u7528\u5728\u7EBF\u97F3\u8272\u65F6\uFF0C\u56DE\u7B54\u6587\u5B57\u4F1A\u4EA4\u7ED9\u5DF2\u6388\u6743\u7684\u8BED\u97F3\u5408\u6210\u670D\u52A1\u3002\u82E5\u8981\u79BB\u7EBF\u6717\u8BFB\uFF0C\u53EF\u5728\u300C\u6A21\u578B \u2192 \u6717\u8BFB\u65B9\u5F0F\u300D\u9009\u7528\u672C\u5730\u97F3\u8272\u3002",bindVoiceTarget:"\u7ED1\u5B9A\u9009\u4E2D\u4F1A\u8BDD",savingVoiceTarget:"\u6B63\u5728\u4FDD\u5B58\u2026",moreVoiceTargets:"\u52A0\u8F7D\u66F4\u591A",loadingVoiceTargets:"\u6B63\u5728\u8BFB\u53D6 DSH \u4F1A\u8BDD\u2026",voiceTargetListError:"\u65E0\u6CD5\u8BFB\u53D6 DSH \u4F1A\u8BDD\u3002",retryVoiceTargets:"\u91CD\u8BD5\u8BFB\u53D6",voiceTranscriptCaptions:"\u8BED\u97F3\u5B57\u5E55",retryTranscript:"\u91CD\u53D1",transcriptDelivery_busy:"\u4F1A\u8BDD\u5FD9\uFF0C\u5F85\u53D1\u5230",transcriptDelivery_ready:"\u5F85\u91CD\u53D1\u5230",transcriptDelivery_sending:"\u6B63\u5728\u53D1\u5F80",transcriptDelivery_queued:"\u7B49\u5F85\u4F1A\u8BDD\u63A5\u6536",transcriptDelivery_delivered:"\u5DF2\u53D1\u5230",transcriptDelivery_uncertain:"\u6295\u9012\u5F85\u786E\u8BA4",transcriptDelivery_failed:"\u672A\u53D1\u5230",transcriptDelivery_discarded:"\u5F85\u53D1\u5DF2\u53D6\u6D88",endDiscardsRetries:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u6E05\u7A7A\u5F85\u53D1\u8F6C\u5199\u3002",modeSwitching:"\u6B63\u5728\u5207\u6362\u8BF4\u8BDD\u65B9\u5F0F\u2026",modeSaving:"\u6B63\u5728\u4FDD\u5B58\u8BF4\u8BDD\u65B9\u5F0F\u2026",modeSwitchUnconfirmed:"\u8BF4\u8BDD\u65B9\u5F0F\u66F4\u6539\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u6838\u67E5\u3002",modeSwitchFailed:"\u672A\u80FD\u786E\u8BA4\u66F4\u6539\uFF0C\u8BF7\u67E5\u770B\u5F53\u524D\u65B9\u5F0F\u540E\u518D\u8BD5\u3002",updateTitle:"\u9C7C\u5E94\u66F4\u65B0",updateOfferTitle:"\u9C7C\u5E94\u6709\u65B0\u7248\u672C",updateCurrentVersion:"\u5F53\u524D",updateNewVersion:"\u65B0\u7248",updateChannel_stable:"\u6B63\u5F0F\u7248",updateChannel_preview:"\u9884\u89C8\u7248",updateCheck:"\u68C0\u67E5\u66F4\u65B0",updateDetails:"\u67E5\u770B\u66F4\u65B0",updateLater:"\u7A0D\u540E",updateInstall:"\u4E00\u952E\u66F4\u65B0",updateRelease:"\u53D1\u5E03\u8BF4\u660E",updateFeedback:"\u53CD\u9988\u95EE\u9898",update_idle:"\u6B63\u5728\u8BFB\u53D6\u66F4\u65B0\u72B6\u6001\u2026",update_checking:"\u6B63\u5728\u68C0\u67E5\u66F4\u65B0\u2026",update_current:"\u5DF2\u662F\u6700\u65B0\u7248\u672C\u3002",update_available:"\u53EF\u4EE5\u66F4\u65B0\u3002",update_incompatible:"\u65B0\u7248\u4E0E\u5F53\u524D DSH \u73AF\u5883\u4E0D\u517C\u5BB9\u3002",update_installing:"\u6B63\u5728\u66F4\u65B0\uFF0C\u5BBF\u4E3B\u53EF\u80FD\u4F1A\u91CD\u65B0\u52A0\u8F7D\u9C7C\u5E94\u2026","update_restart-required":"\u66F4\u65B0\u5DF2\u5B89\u88C5\uFF0C\u91CD\u542F DSH \u540E\u751F\u6548\u3002","update_enable-required":"\u66F4\u65B0\u5DF2\u5B89\u88C5\uFF0C\u8BF7\u5728 DSH \u63D2\u4EF6\u7BA1\u7406\u4E2D\u542F\u7528\u9C7C\u5E94\u3002",update_installed:"\u66F4\u65B0\u5DF2\u5B8C\u6210\u3002",update_error:"\u66F4\u65B0\u51FA\u9519\uFF0C\u53EF\u68C0\u67E5\u66F4\u65B0\u540E\u91CD\u8BD5\u3002",update_unsupported:"\u5F53\u524D\u73AF\u5883\u65E0\u6CD5\u81EA\u52A8\u66F4\u65B0\uFF0C\u8BF7\u67E5\u770B\u5B98\u65B9\u53D1\u5E03\u8BF4\u660E\u3002",updateConnection:"\u6682\u65F6\u65E0\u6CD5\u786E\u8BA4\u66F4\u65B0\u72B6\u6001\uFF0C\u8BF7\u5728\u5BBF\u4E3B\u5C31\u7EEA\u540E\u91CD\u65B0\u68C0\u67E5\u3002",audioDevices:"\u97F3\u9891\u8BBE\u5907",audioSystemDefault:"\u7CFB\u7EDF\u9ED8\u8BA4",audioInput:"\u97F3\u9891\u8F93\u5165",audioOutput:"\u97F3\u9891\u8F93\u51FA",inputDeviceMissing:"\u9EA6\u514B\u98CE\u672A\u8FDE\u63A5\uFF0C\u5DF2\u4FDD\u7559\u9009\u62E9",outputDeviceMissing:"\u8F93\u51FA\u672A\u8FDE\u63A5\uFF0C\u4E0D\u4F1A\u5207\u5230\u5176\u4ED6\u8BBE\u5907",deviceDisconnected:"\u672A\u8FDE\u63A5",inputDeviceStopFirst:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5207\u6362\u8F93\u5165\u3002\u8F93\u51FA\u5728\u4E0B\u4E00\u6BB5\u64AD\u653E\u751F\u6548\u3002",outputDeviceUnsupported:"\u6B64\u73AF\u5883\u6682\u4E0D\u652F\u6301\u9009\u62E9\u6717\u8BFB\u8F93\u51FA\u8BBE\u5907\u3002",deviceListRetry:"\u8BBE\u5907\u5217\u8868\u6682\u4E0D\u53EF\u7528\uFF0C\u6253\u5F00\u4E0B\u62C9\u83DC\u5355\u53EF\u91CD\u8BD5\u3002",voiceHelperCleanupHint:"\u6B63\u5728\u786E\u8BA4\u9EA6\u514B\u98CE\u5DF2\u91CA\u653E\uFF0C\u786E\u8BA4\u524D\u4E0D\u4F1A\u5F00\u542F\u65B0\u7684\u5F55\u97F3\u3002",voiceHelperRestartHint:"\u9EA6\u514B\u98CE\u670D\u52A1\u9000\u51FA\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u91CD\u542F DSH \u540E\u518D\u70B9\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u3002",inputError_device:"\u9EA6\u514B\u98CE\u4E0D\u53EF\u7528",inputError_recognition:"\u8BED\u97F3\u8BC6\u522B\u5931\u8D25","inputError_no-speech":"\u6CA1\u542C\u6E05\uFF0C\u8BF7\u518D\u8BF4\u4E00\u6B21",inputHelp_device:"\u8BF7\u68C0\u67E5\u9EA6\u514B\u98CE\u8FDE\u63A5\u4E0E\u6743\u9650\u3002\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5728\u8BBE\u7F6E\u4E2D\u9009\u8BBE\u5907\u3002\u8BE6\u60C5\u89C1\u300C\u9AD8\u7EA7\u300D\u3002",inputDiagnosticTitle:"\u6700\u8FD1\u4E00\u6B21\u97F3\u9891\u9519\u8BEF",inputDiagnosticHistory:"\u8FD9\u662F\u6700\u8FD1\u4E00\u6B21\u8BB0\u5F55\uFF0C\u53EF\u80FD\u6765\u81EA\u4E4B\u524D\u7684\u5C1D\u8BD5\uFF1B\u4E0D\u4EE3\u8868\u5F53\u524D\u8BBE\u5907\u72B6\u6001\u3002",inputHelp_recognition:"\u8BF7\u91CD\u8BD5\u3002\u4ECD\u5931\u8D25\u65F6\uFF0C\u7ED3\u675F\u5BF9\u8BDD\u540E\u5728\u8BBE\u7F6E\u4E2D\u68C0\u67E5\u8BC6\u522B\u6A21\u578B\u3002","inputHelp_no-speech":"\u8BF7\u9760\u8FD1\u9EA6\u514B\u98CE\u91CD\u8BD5\uFF0C\u5E76\u68C0\u67E5\u662F\u5426\u9759\u97F3\u3002",speechFailed:"\u6717\u8BFB\u5931\u8D25",speechInterrupted:"\u6717\u8BFB\u5DF2\u4E2D\u65AD",wakeFallbackHint:"\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\u3002\u76EE\u524D\u6309\u8F6C\u5199\u5339\u914D\u3002\u5207\u6362\u6A21\u5F0F\u540E\u518D\u9009\u300C\u5524\u9192\u8BCD\u300D\u53EF\u91CD\u8BD5\u58F0\u97F3\u5339\u914D\u3002",wakeMode:"\u5524\u9192\u8BCD",switchToWake:"\u70B9\u6309\u5207\u5230\u5524\u9192\u8BCD\u6A21\u5F0F\uFF0C\u9EA6\u514B\u98CE\u5C06\u7B49\u5F85\u8BBE\u5B9A\u79F0\u547C",wakeDisabled:"\u5524\u9192\u76D1\u542C\u672A\u5F00\u542F",wakeStarting:"\u6B63\u5728\u542F\u52A8\u5524\u9192\u76D1\u542C\u2026",wakeWaiting:"\u7B49\u5F85\u5524\u9192\u8BCD",wakeListening:"\u6B63\u5728\u542C\u4E0B\u4E00\u53E5",wakePaused:"\u5524\u9192\u76D1\u542C\u5DF2\u6682\u505C",wakeError:"\u5524\u9192\u76D1\u542C\u4E0D\u53EF\u7528\uFF0C\u8BF7\u67E5\u770B\u8BBE\u7F6E",wakeHint:"\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\uFF0C\u518D\u8BF4\u6307\u4EE4\u3002\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u76D1\u542C\u3002",wakeMethod:"\u77ED\u53E5\u7ED3\u675F\u540E\u5728\u672C\u673A\u6BD4\u8F83\u79F0\u547C\u7684\u58F0\u97F3\u548C\u8F6C\u5199\u3002",wakeAliases:"\u5524\u9192\u79F0\u547C",wakeAliasesHint:"\u6700\u591A8\u4E2A\uFF0C\u9017\u53F7\u5206\u9694\uFF1B\u4E2D\u6587\u652F\u6301\u53E5\u9996\u8FD1\u97F3\uFF0C\u5EFA\u8BAE\u7528\u72EC\u7279\u76843\u5B57\u4EE5\u4E0A\u79F0\u547C\u3002",wakeTimeout:"\u5524\u9192\u540E\u7B49\u5F85\uFF08\u79D2\uFF09",wakeSettings:"\u5524\u9192\u8BCD\u8BBE\u7F6E",wakeStopToEdit:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u79F0\u547C\u548C\u7B49\u5F85\u65F6\u95F4\u3002",wakeInvalid:"\u8BF7\u586B1\u20138\u4E2A\u6709\u6548\u79F0\u547C\uFF0C\u7B49\u5F85\u65F6\u95F4\u4E3A3\u201330\u79D2\u3002",switchToPtt:"\u70B9\u6309\u5207\u56DE\u6309\u4F4F\u8BF4\u8BDD",switchToAlways:"\u70B9\u6309\u5207\u5230\u81EA\u7531\u9EA6\uFF0C\u9EA6\u514B\u98CE\u5C06\u6301\u7EED\u8046\u542C",quickSpeedStop:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5207\u6362\u901F\u5EA6",performanceReadFirst:"\u5148\u68C0\u67E5\u5F53\u524D\u6A21\u578B\u652F\u6301\u54EA\u4E9B\u901F\u5EA6\u3002",performanceUnavailable:"\u63D0\u4F9B\u5546\u5DF2\u660E\u786E\u62D2\u7EDD\u7070\u8272\u6863\u4F4D\u7684\u601D\u8003\u53C2\u6570\uFF1B\u5176\u4ED6\u6863\u4F4D\u4ECD\u53EF\u9009\u62E9\u3002",performanceProbeCost:"\u52A0\u8F7D\u65F6\u7528\u6700\u591A 3 \u4E2A\u56FA\u5B9A\u77ED\u8BF7\u6C42\u68C0\u6D4B\u6863\u4F4D\uFF0C\u6309\u6A21\u578B\u8BA1\u8D39\u3002",performanceProbeScope:"\u53EA\u6709\u63D0\u4F9B\u53EF\u68C0\u6D4B\u63A5\u53E3\u7684\u6A21\u578B\u8DEF\u7EBF\u4F1A\u53D1\u9001\u77ED\u8BF7\u6C42\uFF0C\u539F\u751F\u652F\u6301\u7684\u6863\u4F4D\u53EF\u76F4\u63A5\u67E5\u770B\u3002",performanceProbeUnknown:"\u90E8\u5206\u6863\u4F4D\u6682\u672A\u786E\u8BA4\u3002\u53EF\u68C0\u67E5\u7F51\u7EDC\u6216\u767B\u5F55\u540E\u91CD\u65B0\u68C0\u6D4B\u3002",performanceProbeAccepted:"\u6863\u4F4D\u8BF7\u6C42\u68C0\u6D4B\u901A\u8FC7\u3002",performanceProbePending:"\u6B63\u5728\u68C0\u67E5\u5F53\u524D\u6A21\u578B\u7684\u6863\u4F4D\u2026",holdToSpeak:"\u8BF4\u8BDD\u65F6\u6309\u4F4F",alwaysWarning:"\u81EA\u7531\u9EA6\u4F1A\u6301\u7EED\u542C\u53D6\u8BED\u97F3\u3002\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u76D1\u542C\u3002",bindingMissing:"\u672A\u7ED1\u5B9A\u8BF4\u8BDD\u6309\u952E\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u4E2D\u7ED1\u5B9A\uFF0C\u6216\u5207\u6362\u6301\u7EED\u8046\u542C\u3002",noSession:"\u8FD8\u6CA1\u6709\u6253\u5F00\u5BF9\u8BDD",otherWindow:"\u9EA6\u514B\u98CE\uFF1A\u53E6\u4E00\u4E2A\u7A97\u53E3",readingStatus:"\u6B63\u5728\u8BFB\u53D6\uFF0C\u4E0D\u4F1A\u542F\u52A8\u9EA6\u514B\u98CE\u6216\u6A21\u578B\u3002",statusRetry:"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u72B6\u6001\u3002\u8FD4\u56DE\u7A97\u53E3\u65F6\u4F1A\u81EA\u52A8\u6838\u67E5\u3002",retryStatus:"\u91CD\u65B0\u8BFB\u53D6\u72B6\u6001",collapseHint:"\u6536\u8D77\u540E\u4F1A\u7EE7\u7EED\u5BF9\u8BDD",stopConsequence:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u91CA\u653E\u9EA6\u514B\u98CE\u5E76\u505C\u6B62\u672C\u6B21\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u3002",transferTitle:"\u63A5\u7BA1\u53E6\u4E00\u4E2A\u7A97\u53E3\u7684\u9EA6\u514B\u98CE\uFF1F",transferWarning:"\u8FD9\u4F1A\u4E2D\u65AD\u53E6\u4E00\u4E2A\u7A97\u53E3\u7684\u8BED\u97F3\uFF0C\u5E76\u53EF\u80FD\u7ED3\u675F\u5B83\u7684\u540E\u53F0\u4EFB\u52A1\u3002",cancel:"\u53D6\u6D88",confirmTransfer:"\u786E\u8BA4\u63A5\u7BA1",bindingStopRequired:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u9F20\u6807\u6216\u952E\u76D8\u6309\u952E\u3002",bindingFinishing:"\u8BED\u97F3\u6B63\u5728\u505C\u6B62\uFF0C\u8BF7\u7A0D\u5019\u518D\u4FEE\u6539\u6309\u952E\u3002",headphonesRequired:"\u5148\u52FE\u9009\u201C\u6211\u5DF2\u4F7F\u7528\u8033\u673A\u201D\uFF0C\u624D\u80FD\u5F00\u542F\u81EA\u52A8\u6253\u65AD\u3002",deviceManualIndex:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u5E8F\u53F7",deviceManualName:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u540D\u79F0",deviceIndexInvalid:"\u8BBE\u5907\u5E8F\u53F7\u9700\u8981\u662F\u975E\u8D1F\u6574\u6570\u3002",deviceDefault:"\u4F7F\u7528\u7CFB\u7EDF\u9ED8\u8BA4\u9EA6\u514B\u98CE",deviceManual:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u540D\u79F0\u6216\u5E8F\u53F7",deviceSaved:"\u5DF2\u4FDD\u5B58\u7684\u8BBE\u5907",deviceEmpty:"\u97F3\u9891\u670D\u52A1\u6CA1\u6709\u627E\u5230\u9EA6\u514B\u98CE\u3002\u8BF7\u8FDE\u63A5\u8BBE\u5907\u5E76\u68C0\u67E5\u7CFB\u7EDF\u58F0\u97F3\u8BBE\u7F6E\u3002",deviceUnknown:"\u5F00\u59CB\u5BF9\u8BDD\u540E\u4F1A\u5217\u51FA\u68C0\u6D4B\u5230\u7684\u8BBE\u5907\u3002\u73B0\u5728\u53EF\u4F7F\u7528\u7CFB\u7EDF\u9ED8\u8BA4\uFF0C\u6216\u5728\u9AD8\u7EA7\u9009\u9879\u624B\u52A8\u586B\u5199\u3002",ttsBackend:"\u8BED\u97F3\u5408\u6210\u540E\u7AEF",ttsBackendHint:"\u58F0\u97F3\u7531\u5DF2\u5B89\u88C5\u7684 TTS \u540E\u7AEF\u63D0\u4F9B\uFF0C\u9700\u5728\u8BE5\u540E\u7AEF\u5B8C\u6210\u914D\u7F6E\u3002\u72EC\u7ACB\u97F3\u91CF\u4EC5\u5728\u9A8C\u8BC1\u652F\u6301\u65F6\u663E\u793A\u3002",ttsBackendPending:"\u66F4\u591A\u540E\u7AEF\u9009\u62E9\u6B63\u5728\u9002\u914D\uFF0C\u5F53\u524D\u4E0D\u4F1A\u81EA\u52A8\u63A5\u5165\u4E91\u670D\u52A1\u3002",voiceClone:"\u58F0\u97F3\u514B\u9686",voiceCloneAvailable:"Qwen \u652F\u6301\u672C\u5730\u53C2\u8003\u97F3\u8272\uFF0C\u53EF\u5728\u6717\u8BFB\u65B9\u5F0F\u7684\u97F3\u8272\u8BBE\u7F6E\u4E2D\u9009\u62E9 WAV\u3002",voiceClonePrivacy:"\u4EC5\u8BFB\u53D6\u4F60\u9009\u62E9\u4E14\u6709\u6743\u4F7F\u7528\u7684\u58F0\u97F3\u6837\u672C\uFF0C\u4E0D\u4E0A\u4F20\u3002",inputActive:"\u6B63\u5728\u63A5\u6536\u8BED\u97F3",modeUnknown:"\u542C\u53D6\u65B9\u5F0F\u672A\u77E5",voiceInputUnavailable:"\u5F55\u97F3\u6682\u4E0D\u53EF\u7528",voiceInputRecoveryHint:"\u8BED\u97F3\u670D\u52A1\u5DF2\u4E2D\u65AD\u3002\u8BF7\u7ED3\u675F\u5BF9\u8BDD\u540E\u91CD\u65B0\u5F00\u59CB\u3002",searchHistory:"\u641C\u7D22\u4F1A\u8BDD",searchScope:"\u641C\u7D22\u5DF2\u8F7D\u5165\u7684\u4F1A\u8BDD",noMatches:"\u6CA1\u6709\u5339\u914D\u7684\u4F1A\u8BDD",differentOwner:"\u9EA6\u514B\u98CE\u5728\u53E6\u4E00\u4E2A\u7A97\u53E3\u4F7F\u7528\u3002\u9700\u8981\u65F6\u53EF\u660E\u786E\u63A5\u7BA1\u3002",details:"\u8BCA\u65AD\u8BE6\u60C5",noReply:"\u8FD8\u6CA1\u6709\u5BF9\u8BDD",newChatCreated:"\u5DF2\u65B0\u5EFA\u4F1A\u8BDD",newChatActive:"\u65B0\u5EFA\u8BED\u97F3\u4F1A\u8BDD\u3002\u5F53\u524D\u4F1A\u8BDD\u7684\u540E\u53F0\u4EFB\u52A1\u4F1A\u505C\u6B62\uFF0C\u8BB0\u5F55\u4F1A\u4FDD\u7559\u3002",newChatOtherOwner:"\u8BF7\u5728\u5F53\u524D\u8BED\u97F3\u4F1A\u8BDD\u6216\u5F00\u542F\u9EA6\u514B\u98CE\u7684\u7A97\u53E3\u4E2D\u65B0\u5EFA\u3002",recentConversation:"\u5BF9\u8BDD",recentTenTurns:"\u6700\u8FD1 10 \u8F6E",allRecords:"\u5168\u90E8\u8BB0\u5F55",showAllRecords:"\u5C55\u5F00\u5168\u90E8",collapseToTen:"\u6536\u8D77\u81F3 10 \u8F6E",collapseConversation:"\u6536\u8D77\u5BF9\u8BDD",currentVoiceRecords:"\u5F53\u524D\u8BED\u97F3\u804A\u5929",historyTruncated:"\u5DF2\u5207\u6362\u663E\u793A\u533A\u95F4\uFF0C\u539F\u8BB0\u5F55\u4ECD\u4FDD\u7559",viewConversation:"\u67E5\u770B\u8BED\u97F3\u8BB0\u5F55",loadEarlier:"\u52A0\u8F7D\u66F4\u65E9\u8BB0\u5F55",readingHistory:"\u6B63\u5728\u8BFB\u53D6\u8BB0\u5F55\u2026",retryHistory:"\u8BFB\u53D6\u8BB0\u5F55\u5931\u8D25\uFF0C\u70B9\u51FB\u91CD\u8BD5",noConversation:"\u8FD8\u6CA1\u6709\u5BF9\u8BDD",newMessages:"\u6761\u65B0\u6D88\u606F",conversationMessages:"\u8BED\u97F3\u5BF9\u8BDD\u8BB0\u5F55",assistantName:"\u52A9\u624B\u79F0\u547C",renameAssistant:"\u70B9\u51FB\u6539\u540D\uFF0CEnter \u4FDD\u5B58\uFF0CEsc \u53D6\u6D88",compact_off:"\u672A\u5F00\u542F",compact_standby:"\u5F85\u673A",compact_listening:"\u8046\u542C\u4E2D",compact_pending:"\u5904\u7406\u4E2D",compact_unknown:"\u5F85\u68C0\u67E5",you:"\u4F60",assistant:"\u52A9\u624B",close:"\u5173\u95ED\u9762\u677F",keyboardBinding:"\u952E\u76D8\u6309\u4F4F\u8BF4\u8BDD",bindingOff:"\u672A\u7ED1\u5B9A",saveBindings:"\u4FDD\u5B58\u6309\u952E",discardBindings:"\u53D6\u6D88\u4FEE\u6539",bindingCapture:"\u6309\u4E0B\u8981\u7ED1\u5B9A\u7684\u952E\uFF08Esc \u53D6\u6D88\uFF09",clearBinding:"\u6E05\u9664\u7ED1\u5B9A",bindingUnsupported:"\u4E0D\u652F\u6301\u8BE5\u6309\u952E\u6216\u7CFB\u7EDF\u7EC4\u5408\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u3002",bindingGlobalHint:"Windows \u5168\u5C40\u5FEB\u6377\u952E\u3002\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5F55\u5165\uFF0C\u4FDD\u5B58\u540E\u4E0B\u6B21\u5F00\u59CB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002\u6309\u952E\u4E0D\u4F1A\u88AB\u62E6\u622A\uFF0C\u53EF\u80FD\u540C\u65F6\u89E6\u53D1\u5176\u4ED6\u5E94\u7528\u7684\u5FEB\u6377\u64CD\u4F5C\u3002",bindingUnavailable:"\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301\u5168\u5C40\u6309\u952E\u7ED1\u5B9A\u3002",bindingPrintableWarning:"\u5355\u72EC\u4F7F\u7528\u6587\u5B57\u3001\u6570\u5B57\u6216\u7A7A\u683C\u952E\u4F1A\u5728\u5176\u4ED6\u5E94\u7528\u8F93\u5165\u65F6\u89E6\u53D1\u6309\u952E\u8BF4\u8BDD\u3002",performanceTitle:"\u56DE\u7B54\u901F\u5EA6",performanceHint:"\u4E0B\u6B21\u5F00\u59CB\u9C7C\u5E94\u72EC\u7ACB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002\u7ED1\u5B9A\u539F\u4F1A\u8BDD\u65F6\uFF0C\u5728\u8BE5 DSH \u5BF9\u8BDD\u7684\u6A21\u578B\u83DC\u5355\u91CC\u8C03\u6574\u601D\u8003\u6863\u4F4D\u3002",inspectPerformance:"\u68C0\u67E5\u53EF\u7528\u901F\u5EA6",performance_fast:"\u5FEB",performanceNoThinking:"\u65E0\u601D\u8003",performanceRecommended:"[\u63A8\u8350]",performanceFastHint:"\u5FEB\u6863\u4F1A\u660E\u786E\u8BF7\u6C42\u5173\u95ED\u601D\u8003\u3002",performanceFastUnavailable:"\u5F53\u524D\u6A21\u578B\u8DEF\u7EBF\u65E0\u6CD5\u786E\u8BA4\u5173\u95ED\u601D\u8003\u3002\u53EF\u9009\u300C\u8DDF\u968F\u6A21\u578B\u300D\uFF0C\u6216\u5728\u6A21\u578B\u8BBE\u7F6E\u4E2D\u66F4\u6362\u652F\u6301\u65E0\u601D\u8003\u7684\u5BF9\u8BDD\u6A21\u578B\u3002",performanceHostUnavailable:"\u5F53\u524D\u6A21\u578B\u8DEF\u7EBF\u672A\u63D0\u4F9B\u90E8\u5206\u601D\u8003\u6863\u4F4D\u3002",performance_balanced:"\u6807\u51C6",performance_high:"\u4ED4\u7EC6",performance_compatibility:"\u8DDF\u968F\u6A21\u578B",performanceStopRequired:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u56DE\u7B54\u901F\u5EA6\u3002\u5F53\u524D\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u4F1A\u505C\u6B62\u3002",savePerformance:"\u4FDD\u5B58\u56DE\u7B54\u901F\u5EA6",outputVolume:"\u52A9\u624B\u8BED\u97F3\u97F3\u91CF",outputVolumeHint:"\u4EC5\u8C03\u6574\u5DF2\u5B89\u88C5\u7684 Windows dsh-speak \u540E\u7AEF\uFF0C\u4E0D\u4EE3\u8868\u5F53\u524D\u8BED\u97F3\u8DEF\u7531\u6B63\u5728\u4F7F\u7528\u5B83\uFF1B\u4E0D\u5F71\u54CD DSTuber\u3001\u7CFB\u7EDF\u603B\u97F3\u91CF\u6216\u63D0\u793A\u97F3\u3002\u4E0B\u4E00\u6BB5\u8F93\u51FA\u751F\u6548\u3002",readOutputVolume:"\u8BFB\u53D6\u8BED\u97F3\u97F3\u91CF",saveOutputVolume:"\u4FDD\u5B58\u8BED\u97F3\u97F3\u91CF",outputVolumeUnavailable:"\u5F53\u524D\u8BED\u97F3\u540E\u7AEF\u4E0D\u652F\u6301\u72EC\u7ACB\u97F3\u91CF\u8C03\u8282\u3002",outputVolumeUnknown:"\u97F3\u91CF\u4FDD\u5B58\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u4F1A\u81EA\u52A8\u6838\u67E5\uFF0C\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002",settingsTitle:"\u9C7C\u5E94\u8BBE\u7F6E",settingsSections:"\u8BBE\u7F6E\u5206\u7C7B",tab_audio:"\u97F3\u9891",tab_interaction:"\u4EA4\u4E92",tab_prompt:"\u63D0\u793A\u8BCD",voicePromptLabel:"\u81EA\u5B9A\u4E49\u63D0\u793A\u8BCD",voicePromptOptional:"\uFF08\u53EF\u9009\uFF09",voicePromptAgents:"\u8DDF\u968F AGENTS",voicePromptCustom:"\u5DF2\u9644\u52A0\u81EA\u5B9A\u4E49",voicePromptPlaceholder:`\u4F8B\u5982\uFF1A\u7528\u4E2D\u6587\u56DE\u590D\uFF0C\u5148\u8BF4\u7ED3\u8BBA\uFF0C\u8BED\u6C14\u81EA\u7136\u3002

\u5185\u5BB9\u4F1A\u9644\u52A0\u5728 AGENTS \u540E\u3002\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u8BBE\u7F6E\u3002`,voicePromptStopToEdit:"\u505C\u6B62\u8BED\u97F3\u540E\u53EF\u7F16\u8F91",voicePromptUnsupported:"\u5F53\u524D DSH \u6682\u4E0D\u652F\u6301\u81EA\u5B9A\u4E49\u63D0\u793A\u8BCD\u3002",voicePromptTooLong:"\u63D0\u793A\u8BCD\u4E0D\u80FD\u8D85\u8FC7 32,768 \u4E2A\u5B57\u7B26\u3002",voicePromptSaving:"\u4FDD\u5B58\u4E2D\u2026",voicePromptCancel:"\u53D6\u6D88\u4FEE\u6539",voicePromptSave:"\u4FDD\u5B58",voicePromptSaved:"\u5DF2\u4FDD\u5B58\uFF0C\u4E0B\u6B21\u5F00\u542F\u8BED\u97F3\u65F6\u751F\u6548\u3002",voicePromptSaveFailed:"\u4FDD\u5B58\u672A\u6210\u529F\uFF0C\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002",voicePromptUnsaved:"\u5C1A\u672A\u4FDD\u5B58",tab_models:"\u6A21\u578B",tab_advanced:"\u9AD8\u7EA7",projectInfoTitle:"\u5173\u4E8E\u9C7C\u5E94",projectAuthor:"\u4F5C\u8005",projectRepository:"\u5B98\u65B9\u4ED3\u5E93",projectNpm:"npm \u53D1\u5E03\u9875",tab_sessions:"\u4F1A\u8BDD\u7BA1\u7406",settingsContent:"\u8BBE\u7F6E\u5185\u5BB9",voiceCleanupPending:"\u6B63\u5728\u91CA\u653E\u65E7\u97F3\u9891\u670D\u52A1",voiceCleanupHint:"\u7B49\u5F85\u65E7\u4F1A\u8BDD\u548C\u5F55\u97F3\u9000\u51FA\uFF0C\u5B8C\u6210\u540E\u4F1A\u81EA\u52A8\u66F4\u65B0\u3002",voiceRestartPending:"\u9700\u8981\u91CD\u542F DSH",voiceRestartHint:"\u65E7\u7248\u97F3\u9891\u670D\u52A1\u7684\u9000\u51FA\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u91CD\u542F DSH \u540E\u518D\u70B9\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u3002\u5DF2\u4FDD\u5B58\u7684\u6388\u6743\u4E0D\u53D8\u3002",voiceRootRestartHint:"\u65E7\u8BED\u97F3\u4F1A\u8BDD\u7684\u505C\u6B62\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u9000\u51FA\u5E76\u91CD\u65B0\u6253\u5F00 DSH\u3002",voiceStopPending:"\u8BED\u97F3\u5C1A\u672A\u786E\u8BA4\u505C\u6B62",voiceStopHint:"\u8BF7\u91CD\u65B0\u8BFB\u53D6\u8BED\u97F3\u72B6\u6001\uFF0C\u786E\u8BA4\u505C\u6B62\u540E\u518D\u5F00\u59CB\u5BF9\u8BDD\u3002",voiceTargetOccupied:"\u4E0A\u6B21\u7684\u8BED\u97F3\u4F1A\u8BDD\u6B63\u5728 DSH \u4E2D\u6253\u5F00\u3002\u53EF\u4EE5\u65B0\u5EFA\u9C7C\u5E94\u4F1A\u8BDD\uFF0C\u6216\u9009\u62E9\u8981\u7EE7\u7EED\u7684 DSH \u5BF9\u8BDD\u3002",voiceRecoveryPending:"\u65E7\u8BED\u97F3\u4F1A\u8BDD\u5C1A\u672A\u9000\u51FA",voiceRecoveryCheck:"\u6838\u67E5\u5E76\u505C\u6B62",voiceRecoveryHint:"\u65E7\u5B9E\u4F8B\u4ECD\u5728\u9000\u51FA\uFF0C\u8BF7\u5148\u6838\u67E5\u505C\u6B62\u3002\u82E5\u4E00\u76F4\u672A\u9000\u51FA\uFF0C\u8BF7\u5B8C\u6574\u9000\u51FA\u5E76\u91CD\u65B0\u6253\u5F00 DSH\u3002",operationUnavailable:"\u64CD\u4F5C\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\uFF1B\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002\u8BE6\u60C5\u89C1\u9AD8\u7EA7\u8BBE\u7F6E\u3002",enableFailed:"\u65E0\u6CD5\u5F00\u59CB\u5BF9\u8BDD\u3002\u8BF7\u5728\u8BBE\u7F6E\u7684\u300C\u9AD8\u7EA7\u300D\u67E5\u770B\u539F\u56E0\u540E\u91CD\u8BD5\u3002",tab_pets:"\u684C\u5BA0",planned:"\u8BA1\u5212\u5F00\u53D1\u4E2D",configurationUnknown:"\u914D\u7F6E\u4FDD\u5B58\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\uFF1B\u6838\u5B9E\u524D\u4E0D\u80FD\u7EE7\u7EED\u4FEE\u6539\u3002",motionTitle:"\u754C\u9762\u52A8\u753B",motion_spring:"Q \u5F39",motion_firm:"\u786C\u6717",motion_off:"\u5173\u95ED\u52A8\u753B",motionHint:"\u7ACB\u5373\u9884\u89C8\u5E76\u4FDD\u5B58\uFF1B\u64CD\u4F5C\u4E0D\u7B49\u5F85\u52A8\u753B\u3002\u7CFB\u7EDF\u51CF\u5C11\u52A8\u6001\u6548\u679C\u4F18\u5148\u3002",motionNotSaved:"\u672C\u6B21\u9884\u89C8\u5DF2\u5E94\u7528\uFF0C\u4F46\u6B64\u6D4F\u89C8\u5668\u65E0\u6CD5\u4FDD\u5B58\u52A8\u753B\u504F\u597D\u3002",modeControlPending:"\u8BED\u97F3\u63A7\u5236\u5C1A\u672A\u5B8C\u6210\u6216\u72B6\u6001\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\u3002",capabilityTitle:"\u5BF9\u8BDD\u5728\u4FA7\u680F\u4E2D\u7684\u663E\u793A",supported:"\u53EF\u7528",unsupported:"\u4E0D\u53EF\u7528\u6216\u5C1A\u672A\u786E\u8BA4",hiddenMode:"\u4E0D\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD",workspaceMode:"\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD",taskCapability:"\u540E\u53F0\u4EFB\u52A1\u652F\u6301",configuredMode:"\u5DF2\u4FDD\u5B58\u6A21\u5F0F",currentVoiceMode:"\u5F53\u524D\u5BF9\u8BDD\u7684\u5B9E\u9645\u6A21\u5F0F",noActiveVoice:"\u6CA1\u6709\u8FD0\u884C\u4E2D\u7684\u5BF9\u8BDD",chooseVisibility:"\u9009\u62E9\u663E\u793A\u6A21\u5F0F",workspaceWarning:"\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD\u4F1A\u628A\u5BF9\u8BDD\u663E\u793A\u5728\u666E\u901A\u5DE5\u4F5C\u533A\u4E2D\u3002\u9690\u85CF\u6A21\u5F0F\u4E0D\u53EF\u7528\u65F6\u4ECD\u4F1A\u62D2\u7EDD\u542F\u52A8\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u6539\u4E3A\u53EF\u89C1\u3002",visibilityNoMigration:"\u6B64\u8BBE\u7F6E\u7528\u4E8E\u540E\u7EED\u5BF9\u8BDD\uFF1B\u5DF2\u6709\u5BF9\u8BDD\u4FDD\u6301\u539F\u663E\u793A\u65B9\u5F0F\u3002",modeReadFirst:"\u6B63\u5728\u6838\u67E5\u5F53\u524D\u5BF9\u8BDD\u7684\u914D\u7F6E\u548C\u72B6\u6001\uFF0C\u786E\u8BA4\u540E\u53EF\u4FEE\u6539\u6A21\u5F0F\u3002",closeBeforeMode:"\u8BF7\u5148\u5173\u95ED\u8BED\u97F3\uFF0C\u786E\u8BA4\u5B8C\u5168\u505C\u6B62\u540E\u53EF\u4FEE\u6539\u663E\u793A\u6A21\u5F0F\u3002",saveWorkspace:"\u4FDD\u5B58\u5DE5\u4F5C\u533A\u53EF\u89C1\u6A21\u5F0F",saveHidden:"\u4FDD\u5B58\u9690\u85CF\u6A21\u5F0F",visibilityUnknownWrite:"\u663E\u793A\u6A21\u5F0F\u5199\u5165\u7ED3\u679C\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\u3002\u6838\u5B9E\u524D\u4E0D\u80FD\u7EE7\u7EED\u4FEE\u6539\uFF0C\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002",outputObservationUnavailable:"\u5C1A\u672A\u63A5\u5165\u771F\u5B9E\u64AD\u97F3\u5F00\u59CB\u4E8B\u4EF6\uFF0C\u65E0\u6CD5\u786E\u8BA4\u6B63\u5728\u64AD\u97F3",title:"\u9C7C\u5E94",description:"\u8BED\u97F3\u63A7\u5236\u3001\u97F3\u9891\u8BBE\u7F6E\u4E0E\u72EC\u7ACB\u5BF9\u8BDD\u3002",drag:"\u79FB\u52A8\u9C7C\u5E94\u60AC\u6D6E\u7A97",dragHint:"\u7528\u9F20\u6807\u62D6\u52A8\u7A7A\u767D\u533A\u57DF\u79FB\u52A8\uFF1B\u6309\u94AE\u548C\u8F93\u5165\u6846\u6B63\u5E38\u64CD\u4F5C",collapse:"\u6536\u8D77",reopen:"\u6253\u5F00\u9C7C\u5E94",refresh:"\u5237\u65B0\u72B6\u6001",settings:"\u8BBE\u7F6E",unknown:"\u6B63\u5728\u8BFB\u53D6\u72B6\u6001\u2026",enabled:"\u9EA6\u514B\u98CE\uFF1A\u5DF2\u5F00\u542F",disabled:"\u9EA6\u514B\u98CE\uFF1A\u672A\u5F00\u542F",identity:"\u5B8C\u6574\u4F1A\u8BDD\u6807\u8BC6",source:"\u6388\u6743\u6765\u6E90",actor:"\u64CD\u4F5C\u4F1A\u8BDD",none:"\u65E0",openSession:"\u5148\u5728 DSH \u4FA7\u680F\u65B0\u5EFA\u6216\u6253\u5F00\u4E00\u4E2A\u5BF9\u8BDD\uFF0C\u518D\u56DE\u5230\u9C7C\u5E94\u3002",enable:"\u5F00\u9EA6",transfer:"\u8BA9\u8FD9\u4E2A\u7A97\u53E3\u63A5\u7BA1\u9EA6\u514B\u98CE",disable:"\u5173\u9EA6",stale:"\u72B6\u6001\u6682\u65F6\u8BFB\u4E0D\u5230",snapshot:"\u4E0A\u6B21\u8BFB\u53D6\u7684\u72B6\u6001",consequence:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u672C\u6B21\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u3002\u6536\u8D77\u540E\u4F1A\u7EE7\u7EED\u5BF9\u8BDD\u3002",savedHint:"\u8BBE\u5907\u4E0E\u58F0\u7EB9\u8BBE\u7F6E\u5728\u4E0B\u6B21\u97F3\u9891\u64CD\u4F5C\u65F6\u751F\u6548",more:"\u66F4\u591A\u5BF9\u8BDD",historyOther:"\u5217\u8868\u6765\u81EA\u5176\u4ED6\u64CD\u4F5C\u4F1A\u8BDD\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6",helperOnline:"\u97F3\u9891\u670D\u52A1\u5728\u7EBF",helperOffline:"\u97F3\u9891\u670D\u52A1\u79BB\u7EBF",pending:"\u6B63\u5728\u5904\u7406\u2026",refreshHint:"\u53EA\u8BFB\u53D6\u72B6\u6001\uFF0C\u4E0D\u542F\u52A8\u9EA6\u514B\u98CE\u6216\u6A21\u578B",modelGuide:"\u9ED8\u8BA4 SenseVoice \u5728\u672C\u673A\u4F7F\u7528 CPU\u3002\u6A21\u578B\u6587\u4EF6\u548C\u8BB8\u53EF\u89C1 docs/model-setup.md\u3002",sensevoiceSource:"SenseVoice \u6765\u6E90",ttsSource:"\u5916\u90E8 TTS \u53C2\u8003",licenseNote:"SenseVoice \u8BB8\u53EF\u8BA8\u8BBA",modelTitle:"\u672C\u5730\u6A21\u578B",modelHint:"\u4FDD\u5B58\u5DF2\u6709 SenseVoice \u6216 CAM++ \u8DEF\u5F84\u3002\u6587\u4EF6\u5728\u4F7F\u7528\u524D\u6821\u9A8C\uFF0C\u58F0\u7EB9\u8FC7\u6EE4\u9700\u53E6\u884C\u5F00\u542F\u3002",asr:"\u8BED\u97F3\u8BC6\u522B",sensevoicePath:"SenseVoice \u672C\u5730\u76EE\u5F55",campplusPath:"CAM++ \u6587\u4EF6\uFF08\u53EF\u9009\uFF09",saveModels:"\u4FDD\u5B58\u6A21\u578B\u8DEF\u5F84",audioTitle:"\u97F3\u9891\u8BBE\u7F6E",soundTitle:"\u8F6E\u6B21\u63D0\u793A\u97F3",headphones:"\u6211\u5DF2\u4F7F\u7528\u8033\u673A",headphonesHint:"\u672A\u786E\u8BA4\u8033\u673A\u65F6\uFF0C\u4E3A\u907F\u514D\u5916\u653E\u56DE\u58F0\u4E0D\u64AD\u653E\u63D0\u793A\u97F3\uFF1B\u8FD9\u4E0D\u662F\u56DE\u58F0\u6D88\u9664\uFF0C\u4E5F\u4E0D\u4F1A\u88C1\u6389\u7528\u6237\u8BB2\u8BDD",automaticBargeIn:"\u542F\u7528\u5B9E\u9A8C\u6027\u81EA\u52A8\u6253\u65AD",stopRequested:"\u5DF2\u8BF7\u6C42\u505C\u6B62\u64AD\u653E\uFF0C\u5C1A\u672A\u786E\u8BA4",stopConfirmed:"\u5DF2\u786E\u8BA4\u505C\u6B62\u64AD\u653E",soundEnabled:"\u542F\u7528\u63D0\u793A\u97F3",soundVolume:"\u63D0\u793A\u97F3\u97F3\u91CF\uFF080\u20131\uFF09",soundUnavailable:"\u97F3\u6548\u6682\u672A\u63A5\u5165\uFF1B\u8FD9\u4E9B\u63A7\u4EF6\u4E0D\u4F1A\u5047\u88C5\u64AD\u653E",soundAvailable:"\u97F3\u6548\u5DF2\u63A5\u5165",mode:"\u8BF4\u8BDD\u65B9\u5F0F",alwaysOn:"\u5F00\u542F\u6301\u7EED\u8046\u542C\uFF08\u9EA6\u514B\u98CE\u5E38\u5F00\uFF09",alwaysOff:"\u5207\u56DE\u6309\u4F4F\u8BF4\u8BDD",modeUnavailable:"\u8BF4\u8BDD\u65B9\u5F0F\u63A7\u5236\u5C1A\u672A\u63A5\u5165",modeNeedsGrant:"\u8BF7\u5148\u8BFB\u53D6\u6700\u65B0\u72B6\u6001\u3002",pttMode:"\u6309\u952E\u8BF4\u8BDD",alwaysMode:"\u81EA\u7531\u9EA6",modeHint:"\u5F00\u59CB\u5BF9\u8BDD\u524D\u53EF\u9884\u9009\u8BF4\u8BDD\u65B9\u5F0F\u3002",readSettings:"\u8BFB\u53D6\u8BBE\u7F6E",device:"\u9EA6\u514B\u98CE\u8BBE\u5907",deviceHint:"\u8BBE\u5907\u540D\u79F0\u6765\u81EA\u97F3\u9891\u670D\u52A1\u7684\u6700\u8FD1\u8BFB\u53D6\u3002\u66F4\u6362\u8BBE\u5907\u540E\uFF0C\u5F00\u59CB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002",sideButton:"\u9F20\u6807\u6309\u4F4F\u8BF4\u8BDD",sideOff:"\u5173\u95ED",sideOne:"\u4FA7\u952E 1",sideTwo:"\u4FA7\u952E 2",speaker:"\u5B9E\u9A8C\u6027\u58F0\u7EB9\u8FC7\u6EE4",speakerHint:"\u6B64\u5F00\u5173\u53EA\u7528\u4E8E\u5DF2\u6709\u7684\u58F0\u7EB9\u914D\u7F6E\uFF1B\u5F53\u524D\u9762\u677F\u6CA1\u6709\u6CE8\u518C\u5165\u53E3\u3002",save:"\u4FDD\u5B58\u8BBE\u7F6E",saved:"\u8BBE\u7F6E\u5DF2\u4FDD\u5B58",historyTitle:"\u5BF9\u8BDD\u5386\u53F2",historyHint:"\u53EA\u663E\u793A\u9C7C\u5E94\u521B\u5EFA\u7684\u5BF9\u8BDD\uFF1B\u63A5\u7EED\u4E0D\u4F1A\u81EA\u52A8\u6062\u590D\u5DF2\u5F52\u6863\u804A\u5929",loadHistory:"\u8BFB\u53D6\u5BF9\u8BDD",newChat:"\u65B0\u4F1A\u8BDD",resume:"\u63A5\u7EED",active:"\u5F53\u524D",archived:"\u5DF2\u5F52\u6863",unavailable:"\u4E0D\u53EF\u7528",empty:"\u6682\u65E0\u53EF\u63A5\u7EED\u7684\u5BF9\u8BDD",noTitle:"\u5BF9\u8BDD",noResume:"\u5F53\u524D\u4E0D\u80FD\u63A5\u7EED",newHint:"\u65B0\u5EFA\u6216\u63A5\u7EED\u4F1A\u5207\u6362\u5F53\u524D\u8BED\u97F3\uFF0C\u64A4\u56DE\u65E7\u6388\u6743\uFF0C\u53EF\u80FD\u7ED3\u675F\u65E7\u540E\u53F0\u4EFB\u52A1\uFF1B\u4E0D\u5408\u5E76\u5386\u53F2\uFF0C\u4E5F\u4E0D\u91CD\u8DD1\u65E7\u4EFB\u52A1",historyStale:"\u70B9\u51FB\u8BFB\u53D6\u5BF9\u8BDD\u67E5\u770B\u6700\u65B0\u8BB0\u5F55"},op={startConversation:"Start conversation",endConversation:"End conversation",voiceTarget:"Send to",dedicatedVoiceTarget:"Fish Voice conversation",checkingVoiceTarget:"Checking target\u2026",voiceTargetChanged:"The delivery target changed. Check the chat shown here before starting.",chooseCurrentDshTarget:"Use current chat",backToFishVoice:"Back to Fish Voice",currentDshTargetError:"Could not confirm this DSH chat. Check the chat and try again.",chooseVoiceTarget:"Choose a delivery chat",searchVoiceTargets:"Search by chat title or ID",searchVoiceTargetsAction:"Search",existingVoiceTargetList:"Existing DSH chats",boundVoiceTarget:"Current target",voiceTargetAvailability_ready:"Available",voiceTargetAvailability_busy:"Chat is processing a message",voiceTargetAvailability_archived:"Chat is archived",voiceTargetAvailability_unavailable:"Chat is unavailable",voiceTargetAvailability_managed:"Managed by Fish Voice. Direct delivery unavailable.",voiceTargetAvailability_subagent:"Subagent chat. Direct delivery unavailable.",voiceTargetNoMatch:"No matching chats.",voiceTargetEmptyList:"No available chats.",voiceTargetSynthesisNotice:"With an online voice, replies are sent to the speech provider you approved. Select a local voice under Models \u2192 Read aloud to keep speech offline.",bindVoiceTarget:"Use selected chat",savingVoiceTarget:"Saving\u2026",moreVoiceTargets:"Load more",loadingVoiceTargets:"Loading DSH chats\u2026",voiceTargetListError:"Could not load DSH chats.",retryVoiceTargets:"Retry",voiceTranscriptCaptions:"Voice captions",retryTranscript:"Resend",transcriptDelivery_busy:"Chat busy, waiting to send to",transcriptDelivery_ready:"Ready to resend to",transcriptDelivery_sending:"Sending to",transcriptDelivery_queued:"Waiting for chat",transcriptDelivery_delivered:"Sent to",transcriptDelivery_uncertain:"Delivery unconfirmed",transcriptDelivery_failed:"Failed to send to",transcriptDelivery_discarded:"Pending send canceled",endDiscardsRetries:"Ending the conversation clears pending transcripts.",modeSwitching:"Switching listening mode\u2026",modeSaving:"Saving listening mode\u2026",modeSwitchUnconfirmed:"Checking which listening mode took effect\u2026",modeSwitchFailed:"The change could not be confirmed. Check the current mode and try again.",updateTitle:"Fish Voice updates",updateOfferTitle:"Fish Voice update available",updateCurrentVersion:"Installed",updateNewVersion:"New",updateChannel_stable:"Stable",updateChannel_preview:"Preview",updateCheck:"Check for updates",updateDetails:"View update",updateLater:"Later",updateInstall:"Update now",updateRelease:"Release notes",updateFeedback:"Send feedback",update_idle:"Reading update status\u2026",update_checking:"Checking for updates\u2026",update_current:"Fish Voice is up to date.",update_available:"An update is ready.",update_incompatible:"This update is incompatible with the current DSH environment.",update_installing:"Updating. DSH may reload Fish Voice\u2026","update_restart-required":"Update installed. Restart DSH to apply it.","update_enable-required":"Update installed. Enable Fish Voice in DSH plugin settings.",update_installed:"Update complete.",update_error:"The update encountered an error. Check for updates to retry.",update_unsupported:"Automatic updates are unavailable. See the official release notes.",updateConnection:"Update status could not be confirmed. Check again when DSH is ready.",audioDevices:"Audio devices",audioSystemDefault:"System default",audioInput:"Audio input",audioOutput:"Audio output",inputDeviceMissing:"Microphone disconnected; selection retained",outputDeviceMissing:"Output disconnected; no automatic fallback",deviceDisconnected:"Disconnected",inputDeviceStopFirst:"Turn off the microphone to switch input. Output changes at the next playback.",outputDeviceUnsupported:"Selecting speech output is not supported on this platform.",deviceListRetry:"Device list unavailable. Open a selector to retry.",voiceHelperCleanupHint:"Confirming microphone release. New recording stays off until this completes.",voiceHelperRestartHint:"Microphone helper exit is unconfirmed. Fully restart DSH before enabling voice.",inputError_device:"Microphone unavailable",inputError_recognition:"Recognition failed","inputError_no-speech":"No clear speech; try again",inputHelp_device:"Check mic access. Turn the mic off to select a device. Error details: Settings \u2192 Advanced \u2192 Diagnostics.",inputDiagnosticTitle:"Last reported audio error",inputDiagnosticHistory:"This is the last recorded error and may be from an earlier attempt. It does not confirm the current device state.",inputHelp_recognition:"Try again. If it fails, turn the mic off and check the model in Settings.","inputHelp_no-speech":"Move closer, check that your mic is unmuted, and try again.",speechFailed:"Speech failed",speechInterrupted:"Speech interrupted",wakeFallbackHint:"Say a configured name. Matching uses the transcript for now. Reselect Wake word after switching modes to retry sound matching.",wakeMode:"Wake word",switchToWake:"Switch to wake-word listening",wakeDisabled:"Wake listening is off",wakeStarting:"Starting wake listening\u2026",wakeWaiting:"Waiting for wake word",wakeListening:"Listening for the next instruction",wakePaused:"Wake listening paused",wakeError:"Wake listening unavailable; check settings",wakeHint:"Say a configured name, then your instruction. End the conversation to stop listening.",wakeMethod:"Matches the sound and transcript locally after the phrase ends.",wakeAliases:"Wake names",wakeAliasesHint:"Up to 8 comma-separated names. Mandarin near-sounds match only at the start; prefer a distinctive name of 3+ characters.",wakeTimeout:"Wait after wake (seconds)",wakeSettings:"Wake-word settings",wakeStopToEdit:"Turn off the microphone before editing wake names or timeout.",wakeInvalid:"Enter 1\u20138 valid names and a 3\u201330 second timeout.",switchToPtt:"Click to use push to talk",switchToAlways:"Click to leave the microphone listening",quickSpeedStop:"Turn the mic off to change speed",performanceReadFirst:"Check which speeds the current model supports first.",performanceUnavailable:"The provider explicitly rejected the reasoning parameter for unavailable modes; other modes remain selectable.",performanceProbeCost:"At load, up to 3 fixed short requests check the modes. Model charges apply.",performanceProbeScope:"Only routes with a testing interface send short requests. Native support can be read directly.",performanceProbeUnknown:"Some modes could not be confirmed. Check network access or sign-in, then retry.",performanceProbeAccepted:"The effort request check passed.",performanceProbePending:"Checking effort modes for the current model\u2026",holdToSpeak:"Hold to speak:",alwaysWarning:"The microphone keeps listening. Turn it off when finished.",bindingMissing:"Bind a push-to-talk shortcut in settings, or switch to continuous listening.",noSession:"No conversation is open",otherWindow:"Microphone: another window",readingStatus:"Reading status without starting the microphone or models.",statusRetry:"Status is unavailable. It will be checked automatically when you return to this window.",retryStatus:"Refresh voice status",collapseHint:"Collapsing keeps the microphone enabled",stopConsequence:"Ending the conversation releases the microphone and stops its background tasks.",transferTitle:"Take over the other window\u2019s microphone?",transferWarning:"This interrupts voice in the other window and may end its background tasks.",cancel:"Cancel",confirmTransfer:"Confirm takeover",bindingStopRequired:"Turn off the microphone before changing mouse or keyboard shortcuts.",bindingFinishing:"Voice is still stopping. Wait before changing shortcuts.",headphonesRequired:"Confirm that you are wearing headphones to enable automatic interruption.",deviceManualIndex:"Advanced: enter device index",deviceManualName:"Advanced: enter device name",deviceIndexInvalid:"Enter a nonnegative whole-number device index.",deviceDefault:"Use the system default microphone",deviceManual:"Advanced: enter name or index",deviceSaved:"Saved device",deviceEmpty:"No microphone was found. Connect a device and check system sound settings.",deviceUnknown:"Detected devices appear after enabling voice. Use the system default or enter a device manually.",ttsBackend:"Speech backend",ttsBackendHint:"Speech uses your installed TTS backend and its settings. Independent output volume appears only when verified.",ttsBackendPending:"Additional backend selection is being adapted. No cloud service is connected automatically.",voiceClone:"Voice cloning",voiceCloneAvailable:"Qwen supports a local reference voice. Choose a WAV in voice settings.",voiceClonePrivacy:"Reads only your selected, authorized sample locally. No audio upload.",inputActive:"Receiving voice input",modeUnknown:"Listening mode unknown",voiceInputUnavailable:"Voice input unavailable",voiceInputRecoveryHint:"The audio service stopped. Turn the microphone off, then on again. Your authorization is unchanged.",searchHistory:"Search chats",searchScope:"Search loaded chats",noMatches:"No matching chats",differentOwner:"Voice belongs to another session. Check the source first.",details:"Diagnostics",noReply:"No conversation yet",recentConversation:"Conversation",recentTenTurns:"Recent 10 turns",allRecords:"All records",showAllRecords:"Show all",collapseToTen:"Last 10 turns",collapseConversation:"Collapse conversation",currentVoiceRecords:"Current voice chat",historyTruncated:"Showing a limited range; original records retained",viewConversation:"View voice records",loadEarlier:"Load earlier",readingHistory:"Reading records\u2026",retryHistory:"Could not read records. Retry",noConversation:"No conversation yet",newMessages:"new messages",conversationMessages:"Voice conversation",assistantName:"Assistant name",renameAssistant:"Rename: Enter to save, Esc to cancel",newChatCreated:"New chat created",newChatActive:"Start a voice chat. Background work in the current chat will stop and its history will be kept.",newChatOtherOwner:"Open the current voice chat or the window that enabled the microphone to start a new chat.",compact_off:"Off",compact_standby:"Standby",compact_listening:"Listening",compact_pending:"Working",compact_unknown:"Check status",you:"You",assistant:"Assistant",close:"Close panel",keyboardBinding:"Push-to-talk binding",bindingOff:"Not bound",saveBindings:"Save shortcuts",discardBindings:"Discard changes",bindingCapture:"Press a key combination (Esc cancels)",clearBinding:"Clear binding",bindingUnsupported:"This key or system shortcut is not supported.",bindingGlobalHint:"Windows global shortcut. Disable voice before recording a binding; changes apply on the next voice enable. Keys are not swallowed and may also trigger another application.",bindingUnavailable:"Global key binding is unavailable on this platform.",bindingPrintableWarning:"A plain letter, digit or Space also triggers push-to-talk while typing in other applications.",performanceTitle:"Voice performance",performanceHint:"Applies to the next dedicated voice chat. For a linked conversation, use the model menu in that DSH chat to change its reasoning effort.",inspectPerformance:"Check available modes",performance_fast:"Fast",performanceNoThinking:"No thinking",performanceRecommended:"[Recommended]",performanceFastHint:"Fast explicitly requests thinking to be turned off.",performanceFastUnavailable:"The current route cannot confirm that thinking can be turned off. Choose Follow model or select a model route that supports turning it off.",performanceHostUnavailable:"The current model route does not offer some reasoning levels.",performance_balanced:"Standard",performance_high:"High",performance_compatibility:"Compatible default",performanceStopRequired:"Mode changes require fully stopped voice. Disabling voice can end background work belonging to its voice root.",savePerformance:"Save for next enable",outputVolume:"Assistant voice volume",outputVolumeHint:"Adjusts the installed Windows dsh-speak backend only. It does not verify the active voice route or change DSTuber, system or cue volume. Applies to the next output.",readOutputVolume:"Read voice volume",saveOutputVolume:"Save voice volume",outputVolumeUnavailable:"This speech backend does not support independent volume control.",outputVolumeUnknown:"The volume save is unconfirmed. It will be checked automatically without resubmitting.",settingsTitle:"\u9C7C\u5E94 settings",settingsSections:"Settings sections",tab_audio:"Audio",tab_interaction:"Interaction",tab_prompt:"Prompt",voicePromptLabel:"Custom prompt",voicePromptOptional:"(optional)",voicePromptAgents:"Follow AGENTS",voicePromptCustom:"Custom prompt added",voicePromptPlaceholder:`For example: Give the conclusion first and use a natural tone.

Added after AGENTS. Leave empty to use the default settings.`,voicePromptStopToEdit:"Stop voice to edit",voicePromptUnsupported:"This DSH version does not support custom prompts yet.",voicePromptTooLong:"The prompt must not exceed 32,768 characters.",voicePromptSaving:"Saving\u2026",voicePromptCancel:"Cancel changes",voicePromptSave:"Save",voicePromptSaved:"Saved. Applies when voice is next started.",voicePromptSaveFailed:"Could not save. Your draft has been kept.",voicePromptUnsaved:"Not saved",tab_models:"Models",tab_advanced:"Advanced",projectInfoTitle:"About \u9C7C\u5E94",projectAuthor:"Author",projectRepository:"Official repository",projectNpm:"npm package",tab_sessions:"Sessions",settingsContent:"Settings content",voiceCleanupPending:"Closing previous audio service",voiceCleanupHint:"Waiting for the previous session and recording to exit. Status will refresh without retrying microphone activation.",voiceRestartPending:"Restart DSH required",voiceRestartHint:"The previous audio service has not confirmed exit. Fully quit and reopen DSH before enabling voice. Your saved authorization is unchanged.",voiceRootRestartHint:"Voice session shutdown is unconfirmed. Fully quit and reopen DSH.",voiceStopPending:"Voice stop unconfirmed",voiceStopHint:"Refresh the status and confirm voice has stopped before starting a dialogue.",voiceTargetOccupied:"The previous voice session is open in DSH. Start a new Fish Voice session or choose a DSH conversation.",voiceRecoveryPending:"Previous voice session is still active",voiceRecoveryCheck:"Check and stop",voiceRecoveryHint:"The previous instance is still closing. Check and stop first. If it remains active, fully quit and reopen DSH.",operationUnavailable:"The outcome is unconfirmed. Automatic readback will check the actual state without resubmitting. Details are in Advanced settings.",enableFailed:"Could not open the mic. Check Advanced settings for details before retrying.",tab_pets:"Desktop pet",planned:"Planned development",configurationUnknown:"The configuration write is unconfirmed. Automatic readback is in progress; changes stay locked until verified.",motionTitle:"Interface motion",motion_spring:"Spring",motion_firm:"Firm",motion_off:"Off",motionHint:"Preview and save immediately. Actions never wait for animation. System reduced-motion preference takes priority.",motionNotSaved:"Preview applied, but this browser could not save the preference.",modeControlPending:"Voice control is pending or unconfirmed. Refresh status when it finishes.",capabilityTitle:"Host capabilities and voice visibility",supported:"Available",unsupported:"Unavailable or unconfirmed",hiddenMode:"Hidden voice chat",workspaceMode:"Workspace-visible compatibility mode",taskCapability:"Persistent handoff",configuredMode:"Saved mode",currentVoiceMode:"Actual mode of the current voice chat",noActiveVoice:"No running voice chat",chooseVisibility:"Choose visibility",workspaceWarning:"Workspace-visible compatibility mode shows voice chats in the regular workspace. Unavailable hidden mode still refuses to start; it never falls back to visible mode.",visibilityNoMigration:"This preference applies to later chats. Existing chats keep their current visibility.",modeReadFirst:"Checking settings and status for this conversation before visibility can be changed.",closeBeforeMode:"Turn voice off and wait for confirmed shutdown before changing visibility.",saveWorkspace:"Save workspace-visible mode",saveHidden:"Save hidden mode",visibilityUnknownWrite:"The visibility write is unconfirmed. Automatic readback is in progress; changes stay locked. The original write will not be repeated.",outputObservationUnavailable:"Actual playback-start events are unavailable; playback has not been confirmed.",title:"\u9C7C\u5E94",description:"Voice controls, audio preferences, and separate voice chats.",drag:"Move Fish Voice panel",dragHint:"Drag background space with the mouse; controls remain interactive",collapse:"Collapse",reopen:"Open Fish Voice",refresh:"Refresh status",settings:"Settings",unknown:"Reading status\u2026",enabled:"Microphone enabled",disabled:"Microphone off",identity:"Full session identities",source:"Authorization source",actor:"Action session",none:"None",openSession:"Open a DSH conversation first",enable:"Enable for this session",transfer:"Authorize this session",disable:"Disable voice",stale:"Refresh to confirm status",snapshot:"Last read status",consequence:"Disabling or switching voice may end its background work. Collapsing this panel leaves voice enabled.",savedHint:"Device and speaker settings take effect on the next audio operation or helper reload.",more:"More voice chats",historyOther:"This list belongs to another action session; read it again",helperOnline:"Audio helper online",helperOffline:"Audio helper offline",pending:"Working\u2026",refreshHint:"Read status without starting the microphone or a model",modelGuide:"SenseVoice runs locally on the CPU. For model files and licenses, see docs/model-setup.md.",sensevoiceSource:"SenseVoice source",ttsSource:"External TTS reference",licenseNote:"SenseVoice licensing discussion",modelTitle:"Local models",modelHint:"Save existing SenseVoice or CAM++ paths. Files are verified before use. Speaker filtering is enabled separately.",asr:"Speech recognition",sensevoicePath:"Local SenseVoice directory",campplusPath:"CAM++ file (optional)",saveModels:"Save model paths",audioTitle:"Audio settings",soundTitle:"Turn sounds",headphones:"I am using headphones",headphonesHint:"Cues stay off until headphones are confirmed, to avoid speaker echo. This is not echo cancellation and does not trim your speech.",automaticBargeIn:"Enable experimental automatic interruption",stopRequested:"Stop requested; playback has not confirmed stopping",stopConfirmed:"Playback confirmed stopped",soundEnabled:"Enable turn sounds",soundVolume:"Sound volume (0\u20131)",soundUnavailable:"Sound playback is not connected; these controls cannot play cues yet.",soundAvailable:"Sound playback connected",mode:"Listening mode",alwaysOn:"Enable always listening (mic stays on)",alwaysOff:"Use push to talk",modeUnavailable:"Listening mode control is not connected",modeNeedsGrant:"Read the current voice status first",pttMode:"Push to talk",alwaysMode:"Open mic",modeHint:"The audio helper controls the active mode. Saving preferences never grants or starts microphone access.",readSettings:"Read settings",device:"Input device",deviceHint:"Blank uses the system default; enter a device name or index",sideButton:"Mouse push-to-talk",sideOff:"Off",sideOne:"Side button 1",sideTwo:"Side button 2",speaker:"Experimental speaker filtering",speakerHint:"Enable matching only; this page does not record or enroll a voiceprint",save:"Save settings",saved:"Settings saved",historyTitle:"Voice chats",historyHint:"Only Fish Voice voice chats appear here. Resume never unarchives a chat automatically.",loadHistory:"Read voice chats",newChat:"New chat",resume:"Resume",active:"Current",archived:"Archived",unavailable:"Unavailable",empty:"No voice chats available",noTitle:"Voice chat",noResume:"Cannot resume right now",newHint:"New or resumed chats switch current voice, revoke its old grant, and may end its background work. They do not merge history or replay old work.",historyStale:"Read voice chats to see the latest records"};var Zn=require("react");var xg=/^7b94c8e3-d6a1-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,es=e=>typeof e=="string"&&xg.test(e);var rp="sidebar.workspaces",_g="workspace",Pg="whaleWorkspacePresentation",kg=["sidebar.workspaces.directoryFlow","sidebar.workspaces.session.row.action","sidebar.session.row.leading","sidebar.session.row.trailing","sidebar.session.row.hover"],Sg=new Set(["one-shot","continuable","unknown"]);function Eg(e,n){return e&&typeof e=="object"&&Object.keys(e).length===n.length&&n.every(t=>Object.hasOwn(e,t))}function Tg(e){if(!Array.isArray(e)||e.length>512)return null;let n=[],t=new Set;for(let o of e){if(!Eg(o,["id","parentId","mode"])||typeof o.id!="string"||!o.id||o.id.length>256||t.has(o.id))return null;if(o.parentId===null){if(o.mode!==null||!es(o.id))return null;n.push({id:o.id,parentId:null,mode:null})}else{if(typeof o.parentId!="string"||!o.parentId||o.parentId===o.id||!Sg.has(o.mode))return null;n.push({id:o.id,parentId:o.parentId,mode:o.mode})}t.add(o.id)}return n}function zg(e,n){if(!e||typeof e!="object"||!e.byId||!Array.isArray(e.ids))return e;let t=new Map(n.map(d=>[d.id,d])),o=Object.create(null),i=new Set,r=!1;for(let[d,l]of Object.entries(e.byId)){let u=t.get(d);if(es(d)&&u===void 0){i.add(d),r=!0;continue}if(u?.parentId===null){if(l.parentId===void 0&&l.origin!=="subagent"){o[d]=l;continue}i.add(d),r=!0;continue}if(u&&l.origin==="subagent"&&l.parentId===u.parentId){let p={...l};delete p.origin,o[d]=p,r=!0;continue}o[d]=l}for(let d of n){let l=e.byId[d.id];l&&(d.parentId===null&&(l.parentId!==void 0||l.origin==="subagent")||d.parentId!==null&&(l.origin!=="subagent"||l.parentId!==d.parentId)||e.ids.includes(d.id)||(r=!0))}if(!r)return e;let s=e.ids.filter(d=>!i.has(d)&&o[d]!==void 0);for(let d of n)o[d.id]!==void 0&&!s.includes(d.id)&&s.push(d.id);let a=e.projectionsBySession;if(a&&i.size>0){let d={...a};for(let l of i)delete d[l];a=d}return{...e,ids:s,byId:o,projectionsBySession:a}}function Cg(e,n){return!e||e.locale!==_g||e.options?.id!==void 0||e.options?.key!==void 0||(e.options?.priority??0)!==0||typeof n!="function"||n.name!=="WorkspaceBrowser"?!1:kg.every(t=>Object.hasOwn(e.children??{},t))}function Ng(e){if(!Object.isExtensible(e))return!1;let n=Object.getOwnPropertyDescriptor(e,"component");return n===void 0||n.writable===!0}function Ag(e,n){return e.length===n.length&&e.every((t,o)=>{let i=n[o];return t.id===i.id&&t.parentId===i.parentId&&t.mode===i.mode})}function ip(e,n){let t=[],o=0,i={revision:o,items:t},r,s=!1,a=!1,d=new Set,l=new Set,u=z=>{for(let H of[...z])H()},p={getSnapshot:()=>i,subscribe(z){return l.add(z),()=>l.delete(z)}},f=()=>{o++,i={revision:o,items:t},u(l),u(d)},m=z=>{s!==z&&(s=z,f())},b=()=>{let z=r;r=void 0,z&&z.entry.component===z.wrapper&&(z.entry.component=z.original)},v=()=>{if(a)return;let z;try{z=e.entries(rp)}catch{z=void 0}let H=Array.isArray(z)?z.filter(G=>{let S=r&&r.entry===G&&G.component===r.wrapper?r.original:G?.component;return Cg(G,S)}):[];if(H.length!==1||typeof n!="function"||!Ng(H[0])){b(),m(!1);return}let B=H[0];if(r?.entry===B&&B.component===r.wrapper)return;b(),m(!1);let O=B.component,I=G=>{let S=G.useSessions(F=>F),_=G.useWhaleWorkspacePresentation(F=>F),T=(0,Zn.useMemo)(()=>zg(S,_.items),[S,_]),N=(0,Zn.useCallback)(F=>F(T),[T]),P=(0,Zn.useMemo)(()=>new Map(_.items.map(F=>[F.id,F])),[_]),C=(0,Zn.useCallback)(F=>{let V=P.get(F),Z=S.byId[F];if(V?.parentId&&Z?.origin==="subagent"&&Z.parentId===V.parentId){n({childSessionId:F,parentSessionId:V.parentId,mode:V.mode});return}G.open?.(F)},[G.open,P,S]);return(0,Zn.createElement)(O,{...G,useSessions:N,open:C})},E=function(S){let _=typeof S?.useSessions=="function"&&typeof S?.useWhaleWorkspacePresentation=="function"&&typeof S?.open=="function";return(0,Zn.useEffect)(()=>{r?.entry===B&&r.wrapper===E&&m(_)},[_]),(0,Zn.createElement)(_?I:O,S)};E.displayName="WhaleWorkspacePresentation",B.component=E,r={entry:B,original:O,wrapper:E}},w=()=>{},k=()=>{};try{w=e.provideRoot({hooks:{[Pg]:p}}),typeof w!="function"&&(w=()=>{}),k=e.subscribe(rp,v),typeof k!="function"&&(k=()=>{}),v()}catch{k(),b(),w(),m(!1)}return{supported:()=>s,subscribe(z){return d.add(z),()=>d.delete(z)},setOverrides(z){if(a)return!1;let H=Tg(z);return H===null?(t.length>0&&(t=[],f()),!1):(Ag(t,H)||(t=H,f()),!0)},dispose(){a||(a=!0,k(),b(),s=!1,f(),w(),d.clear(),l.clear())}}}var Og=["slots","locale","remote","uiSession"];function Ig(e){let n=xd(),t=ld(void 0,{observe:n.internal});t.enableAutomaticReads();let o=ud();e.inject(["whaleFloatingLayout"],v=>{v.effect(()=>o.useLayoutService(v.whaleFloatingLayout),"whale-voice: optional magnetic layout")});let i=md(),r=dd(window,{onResize:v=>o.fit(v)}),s,a=()=>{};e.effect(()=>{let v=()=>{t.setReadVisibility(document.visibilityState!=="hidden"),document.visibilityState!=="hidden"&&(t.refresh(),s?.refresh(),a())};return window.addEventListener("focus",v),window.addEventListener("online",v),document.addEventListener("visibilitychange",v),v(),()=>{window.removeEventListener("focus",v),window.removeEventListener("online",v),document.removeEventListener("visibilitychange",v)}},"whale-voice: refresh visible state"),e.effect(()=>{let v=ip(e.slots,E=>e.get?.("uiWorkspace")?.openSession(E)),w,k,z=()=>{k?.(),k=null};a=()=>{if(!v.supported()){z();return}if(!w||k)return;let E=w,G=!0;k=w.subscribePresentation(S=>{v.setOverrides(S.shown),G&&(G=!1,t.refresh({force:!0}))},S=>{w===E&&(z(),console.warn("\u9C7C\u5E94\u4FA7\u680F\u4F1A\u8BDD\u663E\u793A\u8FDE\u63A5\u4E2D\u65AD",S?.message??S))})};let H=v.subscribe(a),B=!1;s=cs(async()=>{let E=B?"ui-reconnect":"ui-connect";n.internal(E,"requested");try{let G=await gd(e,n.internal);return n.internal(E,"finished","ok"),G}catch(G){throw B=!0,n.internal(E,"finished","failed"),G}},{visible:()=>t.getSnapshot().readVisible!==!1,onReady:E=>{z(),w=E,n.attach(E),t.attachConversationClient(E),a()},onError:E=>t.conversationUnavailable(E)});let O=t.getSnapshot().readVisible,I=t.subscribe(()=>{let E=t.getSnapshot().readVisible;E!==O&&(O=E,s.visibilityChanged())});return s.start(),()=>{a=()=>{},z(),H(),v.dispose(),I(),n.dispose(),s.dispose(),t.dispose()}},"whale-voice: private conversation stream"),e.effect(()=>()=>{t.dispose(),r.dispose(),o.dispose(),i.dispose()},"whale-ear-ui: state and geometry"),e.effect(()=>e.locale.register("whaleEar",{en:op,zh:tp}),"whale-ear-ui: dictionaries"),e.effect(()=>{let v=document.createElement("style");return v.dataset.plugin="dsh-whale-ear-ui",v.textContent=h.text+Rd+ss,document.head.append(v),()=>v.remove()},"whale-ear-ui: stylesheet");let d=async v=>{let w=e.get?.("sessions");if(!w)throw new Error("DSH \u4F1A\u8BDD\u754C\u9762\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");return w.list.getSnapshot().byId[v]||await w.refresh(),w},l=0,u=async v=>{let w=++l;if(v.kind==="root"&&await d(v.id),w!==l)return;let k=e.get?.("uiWorkspace");if(!k?.openSession)throw new Error("DSH \u4F1A\u8BDD\u754C\u9762\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");return k.openSession(v.kind==="root"?v.id:{childSessionId:v.id,parentSessionId:v.parentId,mode:v.mode??"unknown"})},p=v=>u({kind:"root",id:v}),f={subscribe(v){let w=[e.uiSession.adapter?.current?.subscribe(v),e.get?.("layout")?.panelInfo?.subscribe(v),e.get?.("sessions")?.list?.subscribe?.(v)];return()=>w.forEach(k=>k?.())},selectedSession(){let v=e.uiSession.adapter?.current?.getSnapshot();return v?.hooks?.session?.getSnapshot()?.blank===!0?null:v?.props?.sessionId??null},currentConversation(){return e.get?.("layout")?.panelInfo?.getSnapshot()?.activePanelId===null?f.selectedSession():null},sourceFor(v){if(!v)return null;let w=e.get?.("sessions"),k=w?.list?.getSnapshot()?.byId?.[v];return w?.subagentAddress?.(v)||k?.origin==="subagent"||k?.parentId?null:v}},m=async(v,w)=>{let z=await(await d(v)).using(v,{source:"workspaceOperation"},H=>H.binding.session.rename(w));if(!z.ok)throw new Error(z.error.message);return z.value.title},b=()=>({captureBindings:t.captureBindings,refreshModelCompute:t.refreshModelCompute,pickPath:t.pickPath,readState:t.getSnapshot,markSettingsEdited:t.markSettingsEdited,discardSettingsDraft:t.discardSettingsDraft,openAuthorization:t.openAuthorization,closeAuthorization:t.closeAuthorization,saveAuthorization:t.saveAuthorization,readOperationLog:t.readOperationLog,manageSessions:t.manageSessions,listExistingVoiceSessions:t.listExistingVoiceSessions,setExistingVoiceSession:t.setExistingVoiceSession,setSettingsTab:t.setSettingsTab,setSettingsModelTab:t.setSettingsModelTab,setSessionManagement:t.setSessionManagement,senseVoiceAsrAction:t.senseVoiceAsrAction,updateAction:t.updateAction,dismissUpdate:t.dismissUpdate,openExistingVoiceSession:p,openManagedSession:u,renameManagedSession:m,hooks:{whaleUi:t,whalePreferences:i},setMotion:v=>i.setMotion(v),setAssistantName:v=>i.setAssistantName(v),run:(...v)=>t.run(...v),setSession:v=>t.setSession(v),cancelPreview:()=>t.cancelPreview(),discardDiagnostics:()=>t.discardDiagnostics(),dismissSetup:()=>t.dismissSetup(),openSetup:()=>t.openSetup(),showHome:()=>t.showHome(),openSettings:t.openSettings,refresh:v=>t.refresh(v)});e.slots.inject("shell.overlay",()=>e.slots.register({name:"shell.overlay",id:"whale-ear",locale:"whaleEar",inject:()=>({geometry:o,sizing:r,recordUserOperation:n.user,setPanelVisible:t.setPanelVisible,closeAuthorization:t.closeAuthorization,refresh:v=>t.refresh(v),showHome:()=>t.showHome(),dismissSetup:()=>t.dismissSetup(),hooks:{whaleUi:t,whalePreferences:i}}),children:{"whale-ear.panel.controls":{kind:"single",scope:"root"}}},Jd)),e.slots.inject("whale-ear.panel.controls",()=>e.slots.register({name:"whale-ear.panel.controls",locale:"whaleEar",inject:()=>({...b(),controlContext:f,retryVoiceTranscript:t.retryVoiceTranscript})},Qd))}
return module.exports;}});
