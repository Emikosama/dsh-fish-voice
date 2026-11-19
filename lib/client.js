window.__ModuleLoader__.load({id:"dsh-fish-voice",factory:(require)=>{var module={exports:{}};var exports=module.exports;
var Nr=Object.defineProperty;var pp=Object.getOwnPropertyDescriptor;var fp=Object.getOwnPropertyNames;var mp=Object.prototype.hasOwnProperty;var rs=(e,n)=>{for(var t in n)Nr(e,t,{get:n[t],enumerable:!0})},hp=(e,n,t,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let i of fp(n))!mp.call(e,i)&&i!==t&&Nr(e,i,{get:()=>n[i],enumerable:!(o=pp(n,i))||o.enumerable});return e};var gp=e=>hp(Nr({},"__esModule",{value:!0}),e);var $g={};rs($g,{apply:()=>Tg,inject:()=>Eg});module.exports=gp($g);var Gt=require("react");var On={rail:"_6--8Gq_rail",toggle:"_6--8Gq_toggle",thumb:"_6--8Gq_thumb",input:"_6--8Gq_input",collapseInner:"_6--8Gq_collapseInner",range:"_6--8Gq_range",fill:"_6--8Gq_fill",toggleTrack:"_6--8Gq_toggleTrack",collapse:"_6--8Gq_collapse",text:`._6--8Gq_range {
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

._6--8Gq_rail {
  background: var(--dsw-alias-border-l2, #8791a4);
  pointer-events: none;
  border-radius: 999px;
  height: 6px;
  position: absolute;
  inset: 13px 9px;
  min-width: 0 !important;
  margin: 0 !important;
}

._6--8Gq_fill {
  width: var(--whale-range-position);
  background: var(--dsw-alias-brand-primary, #8ba9e7);
  border-radius: inherit;
  transition: width var(--whale-duration, .2s) var(--whale-ease, ease-out);
  position: absolute;
  inset: 0 auto 0 0;
  min-width: 0 !important;
  margin: 0 !important;
}

._6--8Gq_thumb {
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

._6--8Gq_range ._6--8Gq_input {
  opacity: 0;
  cursor: pointer;
  touch-action: pan-y;
  height: 32px;
  margin: 0;
  position: absolute;
  inset: 0;
  width: 100% !important;
}

._6--8Gq_range:focus-within {
  outline: 2px solid var(--dsw-focus-ring-color, #8ba9e7);
  outline-offset: 2px;
  border-radius: 6px;
}

._6--8Gq_range:hover ._6--8Gq_thumb {
  box-shadow: 0 0 0 4px color-mix(in srgb,var(--dsw-alias-brand-primary, #8ba9e7) 18%,transparent);
}

._6--8Gq_range[data-dragging] :is(._6--8Gq_thumb, ._6--8Gq_fill) {
  transition-duration: 40ms;
  transition-timing-function: linear;
}

._6--8Gq_range[data-disabled], ._6--8Gq_toggle[data-disabled] {
  opacity: .5;
}

._6--8Gq_range[data-disabled] ._6--8Gq_input {
  cursor: not-allowed;
}

._6--8Gq_collapse {
  opacity: 0;
  visibility: hidden;
  grid-template-rows: 0fr;
  transition: grid-template-rows .16s ease-out, opacity .12s ease-out, visibility .16s;
  display: grid;
}

._6--8Gq_collapse[data-open="true"] {
  opacity: 1;
  visibility: visible;
  grid-template-rows: 1fr;
}

._6--8Gq_collapseInner {
  min-height: 0;
  overflow: hidden;
}

._6--8Gq_toggle {
  cursor: pointer;
  align-items: center;
  gap: 8px;
  width: fit-content;
  max-width: 100%;
  font-size: 12px;
  display: flex;
  position: relative;
}

._6--8Gq_toggle > input {
  opacity: 0;
  width: 38px;
  height: 24px;
  margin: 0;
  position: absolute;
}

._6--8Gq_toggleTrack {
  pointer-events: none;
  background: var(--dsw-alias-border-l2, #8791a4);
  width: 36px;
  height: 22px;
  transition: background-color var(--whale-duration, .2s);
  border-radius: 999px;
  flex: none;
  position: relative;
}

._6--8Gq_toggleTrack > span {
  background: var(--dsw-alias-bg-layer-1, #fff);
  width: 16px;
  height: 16px;
  transition: left var(--whale-duration, .2s) var(--whale-ease, ease-out);
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
}

._6--8Gq_toggle > input:checked + ._6--8Gq_toggleTrack {
  background: var(--dsw-alias-brand-primary, #8ba9e7);
}

._6--8Gq_toggle > input:checked + ._6--8Gq_toggleTrack > span {
  left: 17px;
}

._6--8Gq_toggle > input:focus-visible + ._6--8Gq_toggleTrack {
  outline: 2px solid var(--dsw-focus-ring-color, #8ba9e7);
  outline-offset: 2px;
}

[data-motion="firm"] :is(._6--8Gq_range, ._6--8Gq_toggle, ._6--8Gq_collapse) {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="firm"] ._6--8Gq_collapse {
  transition-duration: .1s;
}

[data-motion="off"] :is(._6--8Gq_range, ._6--8Gq_toggle, ._6--8Gq_collapse), [data-motion="off"] :is(._6--8Gq_range, ._6--8Gq_toggle, ._6--8Gq_collapse) * {
  transition: none !important;
  animation: none !important;
}

@media (prefers-reduced-motion: reduce) {
  ._6--8Gq_range, ._6--8Gq_toggle, ._6--8Gq_collapse, ._6--8Gq_range *, ._6--8Gq_toggle *, ._6--8Gq_collapse * {
    transition: none !important;
    animation: none !important;
  }
}

@media (forced-colors: active) {
  ._6--8Gq_range ._6--8Gq_input {
    opacity: 1;
    position: relative;
  }

  ._6--8Gq_rail {
    display: none;
  }

  ._6--8Gq_toggleTrack {
    border: 1px solid buttontext;
  }

  ._6--8Gq_toggleTrack > span {
    background: buttontext;
  }

  ._6--8Gq_toggle > input:checked + ._6--8Gq_toggleTrack {
    background: highlight;
  }
}
`};var un=require("react/jsx-runtime"),is=On.text;function jt({value:e,defaultValue:n=0,min:t=0,max:o=100,disabled:i,onChange:r,onPointerDown:s,onPointerUp:a,onPointerCancel:d,onLostPointerCapture:l,className:u="",style:p,...m}){let[f,b]=(0,Gt.useState)(n),[v,w]=(0,Gt.useState)(!1);(0,Gt.useEffect)(()=>{i&&w(!1)},[i]);let k=Number(e??f),P=Number(t),M=Number(o),B=M>P&&Number.isFinite(k)?Math.max(0,Math.min(1,(k-P)/(M-P))):0,E=T=>z=>{w(!1),T?.(z)};return(0,un.jsxs)("span",{className:On.range,"data-whale-motion-range":!0,"data-dragging":v&&!i||void 0,"data-disabled":i||void 0,style:{"--whale-range-position":`${B*100}%`},children:[(0,un.jsxs)("span",{className:On.rail,"aria-hidden":"true",children:[(0,un.jsx)("span",{className:On.fill}),(0,un.jsx)("span",{className:On.thumb})]}),(0,un.jsx)("input",{...m,className:`${On.input} ${u}`,style:p,type:"range",min:t,max:o,value:e??f,disabled:i,onChange:T=>{i||(e===void 0&&b(T.target.value),r?.(T))},onPointerDown:T=>{i||w(!0),s?.(T)},onPointerUp:E(a),onPointerCancel:E(d),onLostPointerCapture:E(l),onBlur:T=>{w(!1),m.onBlur?.(T)}})]})}function ss({open:e,children:n,className:t="",...o}){return(0,un.jsx)("div",{...o,className:`${On.collapse} ${t}`,"data-open":!!e,"aria-hidden":!e,inert:e?void 0:"",children:(0,un.jsx)("div",{className:On.collapseInner,children:n})})}function Xt({label:e,checked:n,disabled:t,onChange:o,...i}){return(0,un.jsxs)("label",{className:On.toggle,"data-disabled":t||void 0,children:[(0,un.jsx)("input",{...i,type:"checkbox",role:"switch",checked:n,disabled:t,onChange:r=>o?.(r.target.checked)}),(0,un.jsx)("span",{className:On.toggleTrack,"aria-hidden":"true",children:(0,un.jsx)("span",{})}),(0,un.jsx)("span",{children:e})]})}function as(e,{onReady:n,onError:t,visible:o=()=>!0,schedule:i=setTimeout,unschedule:r=clearTimeout}={}){let s=!1,a=!1,d=!1,l=null,u=0,p=null,m=()=>{l!==null&&r(l),l=null},f=async()=>{if(!(s||a||d||!o())){m(),a=!0;try{let b=await e();if(s){await b.dispose();return}try{n(b)}catch(v){throw await b.dispose(),v}p=b,d=!0,u=0}catch(b){if(s)return;t(b),u++,o()&&(l=i(()=>{l=null,f()},Math.min(3e4,750*2**Math.min(u-1,6))),l?.unref?.())}finally{a=!1}}};return{start:f,visibilityChanged(){o()?f():m()},refresh(){f()},dispose(){s=!0,m(),p?.dispose()}}}function Kt(e){return e===null||e&&typeof e=="object"&&!Array.isArray(e)&&Object.keys(e).sort().join(",")==="backend,id,name"&&["winmm","portaudio"].includes(e.backend)&&typeof e.id=="string"&&e.id.length>0&&e.id.length<=1024&&typeof e.name=="string"&&e.name.trim().length>0&&e.name.length<=256&&!/[\u0000-\u001f\u007f]/.test(e.id+e.name)}function cs(e){return e&&e.schema===1&&["input","output"].every(n=>{let t=e[n];return!t||!["available","empty","unavailable"].includes(t.status)||!Array.isArray(t.items)||t.items.length>128||!(t.reason===null||typeof t.reason=="string"&&t.reason.length<=128)?!1:t.items.every(o=>o!==null&&Kt(o))&&new Set(t.items.map(o=>o.backend+":"+o.id)).size===t.items.length&&(t.status==="available"?t.items.length>0:t.items.length===0)})}var Ct=Object.freeze(["ptt","always","wake"]),Ao=e=>({ptt:"pttMode",always:"alwaysMode",wake:"wakeMode"})[e]??"modeUnknown",ls=e=>["waiting","listening"].includes(e?.state)&&e?.streamOpen!==!0?"unknown":{disabled:"wakeDisabled",starting:"wakeStarting",waiting:"wakeWaiting",listening:"wakeListening",paused:"wakePaused",error:"wakeError"}[e?.state]??"unknown",us=e=>e!==null&&typeof e=="object"&&!Array.isArray(e)&&["disabled","starting","waiting","listening","paused","error"].includes(e.state)&&(e.deadlineAt===null||Number.isFinite(e.deadlineAt)&&e.deadlineAt>=0)&&typeof e.streamOpen=="boolean"&&["asr-after-utterance","acoustic-after-utterance"].includes(e.detection),ds=e=>[...new Set(String(e).split(/[,，\n]/).map(n=>n.trim()).filter(Boolean))],Eo=e=>Array.isArray(e)&&e.length>=1&&e.length<=8&&new Set(e.map(n=>typeof n=="string"?n.toLowerCase():n)).size===e.length&&e.every(n=>typeof n=="string"&&n.trim()===n&&n.length>=2&&n.length<=24&&!/[\p{C}]/u.test(n)&&/[\p{L}\p{N}]/u.test(n));function ps(e){if(!e||typeof e!="object"||Array.isArray(e)||!["unknown","available","empty","unavailable"].includes(e.status)||!Array.isArray(e.items)||e.items.length>128)return!1;if(e.status==="unknown")return e.observedAt===null&&e.items.length===0;if(!Number.isFinite(e.observedAt)||e.observedAt<0)return!1;if(e.status!=="available")return e.items.length===0;let n=new Set;return e.items.length>0&&e.items.every(t=>!t||typeof t!="object"||Array.isArray(t)||!Number.isSafeInteger(t.index)||t.index<0||n.has(t.index)||typeof t.name!="string"||!t.name.trim()||t.name.length>256||/[\u0000-\u001f\u007f]/.test(t.name)?!1:(n.add(t.index),!0))}var ce={};rs(ce,{BIGINT_FORMAT_RANGES:()=>Ro,CONSTANT_CATCH:()=>_s,Class:()=>Tr,NUMBER_FORMAT_RANGES:()=>Qt,aborted:()=>Yn,allowsEval:()=>Mr,assert:()=>_p,assertEqual:()=>vp,assertIs:()=>wp,assertNever:()=>xp,assertNotEqual:()=>bp,assignProp:()=>vn,attachSchema:()=>eo,base64ToUint8Array:()=>ws,base64urlToUint8Array:()=>Bp,cached:()=>At,captureStackTrace:()=>$o,cleanEnum:()=>Zp,cleanRegex:()=>Jt,clone:()=>Rn,cloneDef:()=>Wp,codePointLength:()=>no,constantCatch:()=>Ss,createTransparentProxy:()=>Ap,defineLazy:()=>Rr,defineLazyInternal:()=>ve,derived:()=>Lp,esc:()=>Yr,escapeRegex:()=>qn,explicitlyAborted:()=>Fr,extend:()=>$p,finalizeIssue:()=>Dn,floatSafeRemainder:()=>Or,getElementAtPath:()=>zp,getEnumValues:()=>It,getLengthableOrigin:()=>to,getParsedType:()=>Np,getSizableOrigin:()=>ys,hexToUint8Array:()=>Up,hide:()=>Mo,installLazyProp:()=>jp,isObject:()=>ht,isPlainObject:()=>rt,issue:()=>Tt,joinValues:()=>To,jsonStringifyReplacer:()=>Nt,members:()=>Vr,merge:()=>Rp,mergeDefs:()=>Hn,normalizeParams:()=>ie,nullish:()=>$r,numKeys:()=>Ip,objectClone:()=>Sp,omit:()=>Tp,optionalKeys:()=>Br,own:()=>ot,parsedType:()=>Ur,partial:()=>Yp,pick:()=>Ep,prefixIssues:()=>Gn,primitiveTypes:()=>vs,promiseAllObject:()=>Cp,propertyKeyTypes:()=>Zr,randomString:()=>Pp,rawShape:()=>Et,required:()=>Dp,safeExtend:()=>Op,shallowClone:()=>gs,sizeCaps:()=>Do,slugify:()=>Dr,stringifyPrimitive:()=>Oo,toZod:()=>yp,uint8ArrayToBase64:()=>xs,uint8ArrayToBase64url:()=>Fp,uint8ArrayToHex:()=>Vp,unwrapMessage:()=>Pt});function vp(e){return e}function bp(e){return e}function yp(){return e=>e}function wp(e){}function xp(e){throw new Error("Unexpected value in exhaustive check")}function _p(e){}function It(e){let n=Object.values(e).filter(o=>typeof o=="number");return Object.entries(e).filter(([o,i])=>n.indexOf(+o)===-1).map(([o,i])=>i)}function To(e,n="|"){return e.map(t=>Oo(t)).join(n)}function Nt(e,n){return typeof n=="bigint"?n.toString():n}var Er=class{constructor(n){this._getter=n,this._value=void 0}get value(){let n=this._getter;return n!==void 0&&(this._value=n(),this._getter=void 0),this._value}};function At(e){return new Er(e)}function $r(e){return e==null}function Jt(e){let n=e.startsWith("^")?1:0,t=e.endsWith("$")?e.length-1:e.length;return e.slice(n,t)}function Or(e,n){let t=e/n,o=Math.round(t),i=4*Number.EPSILON*Math.max(Math.abs(t),1);return Math.abs(t-o)<i?0:t-o}var fs=Symbol("evaluating");function Rr(e,n,t){let o;Object.defineProperty(e,n,{get(){if(o!==fs)return o===void 0&&(o=fs,o=t()),o},set(i){Object.defineProperty(e,n,{value:i})},configurable:!0})}function Sp(e){return Object.create(Object.getPrototypeOf(e),Object.getOwnPropertyDescriptors(e))}function vn(e,n,t){Object.defineProperty(e,n,{value:t,writable:!0,enumerable:!0,configurable:!0})}function Et(e){let n=Object.getOwnPropertyDescriptor(e,"shape");return n?.get?n.get.raw:n?.value}function Ln(e){return Et(e._zod.def)??e._zod.def.shape}function ms(e,n,t){Object.defineProperty(e,n,{get(){let o=t();return vn(this,n,o),o},enumerable:!0,configurable:!0})}function hs(e,n,t){n in e?vn(e,n,t):e[n]=t}function mt(e,n,t,o){let i=Ln(n);for(let r of t){let s=Object.getOwnPropertyDescriptor(i,r);s.enumerable&&(s.get?ms(e,r,()=>{let a=n._zod.def.shape[r];return o?o(a,r):a}):hs(e,r,o?o(s.value,r):s.value))}}function kp(e,n){for(let t of Reflect.ownKeys(n)){let o=Object.getOwnPropertyDescriptor(n,t);o.enumerable&&(o.get?ms(e,t,()=>n[t]):hs(e,t,o.value))}}function Hn(...e){let n={};for(let t of e){let o=Object.getOwnPropertyDescriptors(t);Object.assign(n,o)}return Object.defineProperties({},n)}function Wp(e){return Hn(e._zod.def)}function zp(e,n){return n?n.reduce((t,o)=>t?.[o],e):e}function Cp(e){let n=Object.keys(e),t=n.map(o=>e[o]);return Promise.all(t).then(o=>{let i={};for(let r=0;r<n.length;r++)i[n[r]]=o[r];return i})}function Pp(e=10){let n="abcdefghijklmnopqrstuvwxyz",t="";for(let o=0;o<e;o++)t+=n[Math.floor(Math.random()*n.length)];return t}function Yr(e){return JSON.stringify(e)}function Dr(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/[\s_-]+/g,"-").replace(/^-+|-+$/g,"")}var $o="captureStackTrace"in Error?Error.captureStackTrace:(...e)=>{};function ht(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}var Mr=At(()=>{if(dn.jitless||typeof navigator<"u"&&navigator?.userAgent?.includes("Cloudflare"))return!1;try{let e=Function;return new e(""),!0}catch{return!1}});function rt(e){if(ht(e)===!1)return!1;let n=e.constructor;if(n===void 0||typeof n!="function")return!0;let t=n.prototype;return!(ht(t)===!1||Object.prototype.hasOwnProperty.call(t,"isPrototypeOf")===!1)}function gs(e){return rt(e)?{...e}:Array.isArray(e)?[...e]:e instanceof Map?new Map(e):e instanceof Set?new Set(e):e}function Ip(e){let n=0;for(let t in e)Object.prototype.hasOwnProperty.call(e,t)&&n++;return n}var Np=e=>{let n=typeof e;switch(n){case"undefined":return"undefined";case"string":return"string";case"number":return Number.isNaN(e)?"nan":"number";case"boolean":return"boolean";case"function":return"function";case"bigint":return"bigint";case"symbol":return"symbol";case"object":return Array.isArray(e)?"array":e===null?"null":e.then&&typeof e.then=="function"&&e.catch&&typeof e.catch=="function"?"promise":typeof Map<"u"&&e instanceof Map?"map":typeof Set<"u"&&e instanceof Set?"set":typeof Date<"u"&&e instanceof Date?"date":typeof File<"u"&&e instanceof File?"file":"object";default:throw new Error(`Unknown data type: ${n}`)}},Zr=new Set(["string","number","symbol"]),vs=new Set(["string","number","bigint","boolean","symbol","undefined"]);function qn(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Rn(e,n,t){let o=new e._zod.constr(n??e._zod.def);return(!n||t?.parent)&&(o._zod.parent=e),o}function ie(e){let n=e;if(!n)return{};if(typeof n=="string")return{error:()=>n};if(n?.message!==void 0){if(n?.error!==void 0)throw new Error("Cannot specify both `message` and `error` params");n.error=n.message}return delete n.message,typeof n.error=="string"?{...n,error:()=>n.error}:n}function Ap(e){let n;return new Proxy({},{get(t,o,i){return n??(n=e()),Reflect.get(n,o,i)},set(t,o,i,r){return n??(n=e()),Reflect.set(n,o,i,r)},has(t,o){return n??(n=e()),Reflect.has(n,o)},deleteProperty(t,o){return n??(n=e()),Reflect.deleteProperty(n,o)},ownKeys(t){return n??(n=e()),Reflect.ownKeys(n)},getOwnPropertyDescriptor(t,o){return n??(n=e()),Reflect.getOwnPropertyDescriptor(n,o)},defineProperty(t,o,i){return n??(n=e()),Reflect.defineProperty(n,o,i)}})}function Oo(e){return typeof e=="bigint"?e.toString()+"n":typeof e=="string"?`"${e}"`:`${e}`}function Br(e){return Object.keys(e).filter(n=>e[n]._zod.optin!==void 0&&e[n]._zod.optout==="optional")}var Qt={safeint:[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],int32:[-2147483648,2147483647],uint32:[0,4294967295],float32:[-34028234663852886e22,34028234663852886e22],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]},Ro={int64:[BigInt("-9223372036854775808"),BigInt("9223372036854775807")],uint64:[BigInt(0),BigInt("18446744073709551615")]};function Ep(e,n){let t=e._zod.def,o=t.checks;if(o&&o.length>0)throw new Error(".pick() cannot be used on object schemas containing refinements");let r={};return mt(r,e,Yo(e,n)),Rn(e,Hn(t,{shape:r,checks:[]}))}function Yo(e,n){let t=Ln(e),o=[];for(let i of Reflect.ownKeys(n)){if(!Object.getOwnPropertyDescriptor(t,i)?.enumerable)throw new Error(`Unrecognized key: "${String(i)}"`);n[i]&&o.push(i)}return o}function Tp(e,n){let t=e._zod.def,o=t.checks;if(o&&o.length>0)throw new Error(".omit() cannot be used on object schemas containing refinements");let r=new Set(Yo(e,n)),s={};return mt(s,e,Reflect.ownKeys(Ln(e)).filter(a=>!r.has(a))),Rn(e,Hn(t,{shape:s,checks:[]}))}function $p(e,n){if(!rt(n))throw new Error("Invalid input to extend: expected a plain object");let t=e._zod.def.checks;if(t&&t.length>0){let i=Ln(e);for(let r of Reflect.ownKeys(n))if(Object.getOwnPropertyDescriptor(i,r)!==void 0)throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.")}return Rn(e,Hn(e._zod.def,{shape:bs(e,n)}))}function bs(e,n){let t={};return mt(t,e,Reflect.ownKeys(Ln(e))),kp(t,n),t}function Op(e,n){if(!rt(n))throw new Error("Invalid input to safeExtend: expected a plain object");return Rn(e,Hn(e._zod.def,{shape:bs(e,n)}))}function Rp(e,n){if(!n?._zod?.def)throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");if(e._zod.def.checks?.length)throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");let t={};mt(t,e,Reflect.ownKeys(Ln(e))),mt(t,n,Reflect.ownKeys(Ln(n)));let o=Hn(e._zod.def,{shape:t,get catchall(){return n._zod.def.catchall},checks:n._zod.def.checks??[]});return Rn(e,o)}function Yp(e,n,t,o="partial"){let r=n._zod.def.checks;if(r&&r.length>0)throw new Error(`.${o}() cannot be used on object schemas containing refinements`);let a=t?new Set(Yo(n,t)):void 0,d={};return mt(d,n,Reflect.ownKeys(Ln(n)),e&&((l,u)=>a&&!a.has(u)?l:new e({type:"optional",innerType:l}))),Rn(n,Hn(n._zod.def,{shape:d,checks:[]}))}function Dp(e,n,t){let o=t?new Set(Yo(n,t)):void 0,i={};return mt(i,n,Reflect.ownKeys(Ln(n)),(r,s)=>o&&!o.has(s)?r:new e({type:"nonoptional",innerType:r})),Rn(n,Hn(n._zod.def,{shape:i}))}function Yn(e,n=0){if(e.aborted===!0)return!0;for(let t=n;t<e.issues.length;t++)if(e.issues[t]?.continue!==!0)return!0;return!1}function Fr(e,n=0){if(e.aborted===!0)return!0;for(let t=n;t<e.issues.length;t++)if(e.issues[t]?.continue===!1)return!0;return!1}function Gn(e,n){return n.map(t=>{var o;return(o=t).path??(o.path=[]),t.path.unshift(e),t})}function Pt(e){return typeof e=="string"?e:e?.message}function Do(e){let n=[];for(let t of e??[]){let o=t._zod.def;if(!/_(length|size)$|_equals$/.test(o.check))break;let i=o.maximum??o.length??o.size;i>=0&&n.push([i,t])}return n}function eo(e,n,t){var o;for(let i=n;i<e.length;i++)(o=e[i]).schema??(o.schema=t)}function Dn(e,n,t){var o;let i=e.inst?._zod?.traits;i?.has("$ZodType")&&(i.has("$ZodCheck")?(o=e).schema??(o.schema=e.inst):e.schema=e.inst);let r=e.schema!==e.inst?e.schema?._zod.def?.error:void 0,s=e.message?e.message:Pt(e.inst?._zod.def?.error?.(e))??Pt(r?.(e))??Pt(n?.error?.(e))??Pt(t.customError?.(e))??Pt(t.localeError?.(e))??"Invalid input",a={};for(let d of Object.keys(e))d==="inst"||d==="schema"||d==="continue"||d==="input"||d==="__proto__"||(a[d]=e[d]);return a.path??(a.path=[]),a.message=s,n?.reportInput&&(a.input=e.input),a}function ys(e){return e instanceof Set?"set":e instanceof Map?"map":e instanceof File?"file":"unknown"}var Mp=/[\uD800-\uDBFF]/;function no(e){let n=e.length;if(!Mp.test(e))return n;let t=n;for(let o=0;o<n-1;o++)(e.charCodeAt(o)&64512)===55296&&(e.charCodeAt(o+1)&64512)===56320&&(t--,o++);return t}function to(e){return Array.isArray(e)?"array":typeof e=="string"?"string":"unknown"}function Ur(e){let n=typeof e;switch(n){case"number":return Number.isNaN(e)?"nan":"number";case"object":{if(e===null)return"null";if(Array.isArray(e))return"array";let t=e;if(t&&Object.getPrototypeOf(t)!==Object.prototype&&"constructor"in t&&t.constructor)return t.constructor.name}}return n}function Tt(...e){let[n,t,o]=e;return typeof n=="string"?{message:n,code:"custom",input:t,inst:o}:{...n}}function Zp(e){return Object.entries(e).filter(([n,t])=>Number.isNaN(Number.parseInt(n,10))).map(n=>n[1])}function ws(e){let n=atob(e),t=new Uint8Array(n.length);for(let o=0;o<n.length;o++)t[o]=n.charCodeAt(o);return t}function xs(e){let n="";for(let t=0;t<e.length;t++)n+=String.fromCharCode(e[t]);return btoa(n)}function Bp(e){let n=e.replace(/-/g,"+").replace(/_/g,"/"),t="=".repeat((4-n.length%4)%4);return ws(n+t)}function Fp(e){return xs(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}function Up(e){let n=e.replace(/^0x/,"");if(n.length%2!==0)throw new Error("Invalid hex string length");let t=new Uint8Array(n.length/2);for(let o=0;o<n.length;o+=2)t[o/2]=Number.parseInt(n.slice(o,o+2),16);return t}function Vp(e){return Array.from(e).map(n=>n.toString(16).padStart(2,"0")).join("")}var Tr=class{constructor(...n){}};function Vr(e,n){for(let t in n){let o=Object.getOwnPropertyDescriptor(n,t);o.get?Object.defineProperty(e,t,{...o,enumerable:!1}):Hp(e,t,o.value)}}function ot(e,n,t,o=!0){return Object.defineProperty(e,n,{configurable:!0,writable:!0,enumerable:o,value:t}),t}function Mo(e,n,t){return ot(e,n,t,!1)}function Lp(e,n){for(let t in e){let o=e[t];Object.defineProperty(n,t,{configurable:!0,enumerable:!0,get(){return ot(this,t,o(this))},set(i){ot(this,t,i)}})}return n}function Hp(e,n,t){Object.defineProperty(e,n,{configurable:!0,get(){return this==null?t:ot(this,n,t.bind(this))},set(o){ot(this,n,o)}})}function qp(e,n){let t=Object.getPrototypeOf(e);return n in t?void 0:t}var Ar,tt=!1,Gp={configurable:!0,get(){tt=!0}};function ve(e,n,t){let o=Object.getPrototypeOf(e._zod);if(n in o&&Ar!==e._zod){Ar=void 0;return}Ar=e._zod,Object.defineProperty(o,n,{configurable:!0,get(){Object.defineProperty(this,n,Gp);let i=tt;tt=!1;try{let r=t(this);return tt?delete this[n]:Object.defineProperty(this,n,{configurable:!0,writable:!0,value:r}),tt=tt||i,r}catch(r){throw delete this[n],tt=tt||i,r}},set(i){Object.defineProperty(this,n,{configurable:!0,writable:!0,value:i})}})}function jp(e,n,t,o){let i=qp(e,n);i&&Object.defineProperty(i,n,{configurable:!0,get(){let r={configurable:!0,writable:!0,enumerable:o,value:void 0};return Object.defineProperty(this,n,r),r.value=t(this),Object.defineProperty(this,n,r),r.value},set(r){Object.defineProperty(this,n,{configurable:!0,writable:!0,enumerable:o,value:r})}})}var _s="~constantCatch";function Ss(e){let n=()=>e;return n[_s]=!0,n}var ks;var Lr={value:void 0,enumerable:!1},Ws="captureStackTrace"in Error?Error:null;function Xp(e){let n=Ws;if(n){let t=n.stackTraceLimit;if(typeof t=="number"){try{n.stackTraceLimit=0}catch{return Ws=null,new e}try{return new e}finally{n.stackTraceLimit=t}}}return new e}function O(e,n,t,o){let i={};function r(m){this.def=m,this.constr=p,this.traits=new Set}r.prototype=i;let s=t,a=s&&new WeakSet;function d(m,f){if(m._zod){if(m._zod.traits.has(e))return}else{Lr.value=new r(f);try{Object.defineProperty(m,"_zod",Lr)}finally{Lr.value=void 0}}if(m._zod.traits.add(e),n(m,f),a){let v=Object.getPrototypeOf(m),w=m._zod.constr.prototype,k=v;for(;k&&k!==w;)k=Object.getPrototypeOf(k);let P=k??v;a.has(P)||(a.add(P),Vr(P,s))}let b=p.prototype;for(let v in b)Object.prototype.hasOwnProperty.call(b,v)&&(v in m||(m[v]=b[v].bind(m)))}let l=o?.Parent??Object;class u extends l{}Object.defineProperty(u,"name",{value:e});function p(m){let f=o?.Parent?Xp(u):this;d(f,m);let b=f._zod.deferred;if(b){for(let w of b)w();f._zod.deferred=void 0}let v=globalThis.__zod_globalConfig?.postProcessor;return v&&v(f),f}return Object.defineProperty(p,"init",{value:d}),Object.defineProperty(p,Symbol.hasInstance,{value:m=>o?.Parent&&m instanceof o.Parent?!0:m?._zod?.traits?.has(e)}),Object.defineProperty(p,"name",{value:e}),p}var Mn=class extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}},$t=class extends Error{constructor(n){super(`Encountered unidirectional transform during encode: ${n}`),this.name="ZodEncodeError"}};(ks=globalThis).__zod_globalConfig??(ks.__zod_globalConfig={});var dn=globalThis.__zod_globalConfig;function bn(e){return e&&Object.assign(dn,e),dn}function Kp(){let e=this._zod;return e.message??(e.message=JSON.stringify(e.def,Nt,2)),e.message}function Jp(e){this._zod.message=e}var Qp={get:Kp,set:Jp,enumerable:!0,configurable:!0},qr={value:void 0,enumerable:!1},zs=new WeakSet([Object.prototype,Error.prototype]),Cs=(e,n)=>{e.name="$ZodError",qr.value=n,Object.defineProperty(e,"issues",qr),qr.value=void 0,Object.defineProperty(e,"message",Qp);let t=Object.getPrototypeOf(e);zs.has(t)||(zs.add(t),Object.defineProperty(t,"toString",{configurable:!0,enumerable:!1,get(){let o=()=>this.message;return Object.defineProperty(this,"toString",{value:o,configurable:!0,writable:!0}),o},set(o){Object.defineProperty(this,"toString",{value:o,configurable:!0,writable:!0})}}))},Ps=O("$ZodError",Cs),Hg=O("$ZodError",Cs,void 0,{Parent:Error});function ef(e,n,t){return Object.prototype.hasOwnProperty.call(e,n)||(n==="__proto__"?Object.defineProperty(e,n,{value:t(),writable:!0,enumerable:!0,configurable:!0}):e[n]=t()),e[n]}function Is(e,n=t=>t.message){let t={},o=[];for(let i of e.issues)i.path.length>0?ef(t,i.path[0],()=>[]).push(n(i)):o.push(n(i));return{formErrors:o,fieldErrors:t}}function Ns(e,n=t=>t.message){let t={_errors:[]},o=(i,r=[])=>{for(let s of i.issues)if(s.code==="invalid_union"&&s.errors.length)s.errors.map(a=>o({issues:a},[...r,...s.path]));else if(s.code==="invalid_key")o({issues:s.issues},[...r,...s.path]);else if(s.code==="invalid_element")o({issues:s.issues},[...r,...s.path]);else{let a=[...r,...s.path];if(a.length===0)t._errors.push(n(s));else{let d=t,l=0;for(;l<a.length;){let u=a[l],p=l===a.length-1;if(u==="_errors"){p&&d._errors.push(n(s)),l++;continue}Object.prototype.hasOwnProperty.call(d,u)||Object.defineProperty(d,u,{value:{_errors:[]},enumerable:!0,writable:!0,configurable:!0});let m=d[u];p&&m._errors.push(n(s)),d=m,l++}}}};return o(e),t}function Zo(e,n){return{callee:n?.callee??e,Err:n?.Err}}var Bo=e=>{let n=(t,o,i,r)=>{let s=i?{...i,async:!1}:{async:!1},a=t._zod.run({value:o,issues:[]},s);if(a instanceof Promise)throw new Mn;if(a.issues.length){let d=new(r?.Err??e)(a.issues.map(l=>Dn(l,s,bn())));throw $o(d,r?.callee??n),d}return a.value};return n};var Fo=e=>{let n=async(t,o,i,r)=>{let s=i?{...i,async:!0}:{async:!0},a=t._zod.run({value:o,issues:[]},s);if(a instanceof Promise&&(a=await a),a.issues.length){let d=new(r?.Err??e)(a.issues.map(l=>Dn(l,s,bn())));throw $o(d,r?.callee??n),d}return a.value};return n};var Uo=e=>(n,t,o)=>{let i=o?{...o,async:!1}:{async:!1},r=n._zod.run({value:t,issues:[]},i);if(r instanceof Promise)throw new Mn;return r.issues.length?As(e,r.issues,i):{success:!0,data:r.value}};function As(e,n,t){let o;return{success:!1,get error(){return o||(o=new e(n.map(i=>Dn(i,t,bn()))),n=void 0,t=void 0),o},set error(i){o=i,n=void 0,t=void 0}}}var Vo=e=>async(n,t,o)=>{let i=o?{...o,async:!0}:{async:!0},r=n._zod.run({value:t,issues:[]},i);return r instanceof Promise&&(r=await r),r.issues.length?As(e,r.issues,i):{success:!0,data:r.value}};var nf=Symbol.for("zod.compile.invalid"),tf=Symbol.for("zod.compile.fallback"),Gr=((e,n,t)=>{let o=e._zod.bag.validator;if(o!==void 0){if(o(n)!==nf)return!0;if(o.definite===!0&&t===void 0)return!1}return of(e,n,t)});function of(e,n,t){let o=t?{...t,async:!1,abortEarly:!0}:{async:!1,abortEarly:!0},i=e._zod.bag.fallbackRun,r;if(i?(o[tf]=!0,r=i({value:n,issues:[]},o)):r=e._zod.run({value:n,issues:[]},o),r instanceof Promise)throw new Mn;return r.issues.length===0}var jr=async(e,n,t)=>{let o=t?{...t,async:!0,abortEarly:!0}:{async:!0,abortEarly:!0},i=e._zod.run({value:n,issues:[]},o);return i instanceof Promise&&(i=await i),i.issues.length===0},Es=e=>{let n=Bo(e),t=(o,i,r,s)=>{let a=r?{...r,direction:"backward"}:{direction:"backward"};return n(o,i,a,Zo(t,s))};return t};var Ts=e=>{let n=Bo(e),t=(o,i,r,s)=>n(o,i,r,Zo(t,s));return t};var $s=e=>{let n=Fo(e),t=async(o,i,r,s)=>{let a=r?{...r,direction:"backward"}:{direction:"backward"};return await n(o,i,a,Zo(t,s))};return t};var Os=e=>{let n=Fo(e),t=async(o,i,r,s)=>await n(o,i,r,Zo(t,s));return t};var Rs=e=>(n,t,o)=>{let i=o?{...o,direction:"backward"}:{direction:"backward"};return Uo(e)(n,t,i)};var Ys=e=>(n,t,o)=>Uo(e)(n,t,o);var Ds=e=>async(n,t,o)=>{let i=o?{...o,direction:"backward"}:{direction:"backward"};return Vo(e)(n,t,i)};var Ms=e=>async(n,t,o)=>Vo(e)(n,t,o);var Zs=/^[cC][0-9a-z]{6,}$/,Bs=/^[0-9a-z]+$/,Fs=/^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/,Us=/^[0-9a-vA-V]{20}$/,Vs=/^[A-Za-z0-9]{27}$/,Ls=/^[a-zA-Z0-9_-]{21}$/;function Hs(e){return new RegExp(`^[a-zA-Z0-9_-]{${e}}$`)}var qs=/^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;var Gs=/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,Kr=e=>e?new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`):/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;var js=/^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;var rf="^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";function Xs(){return new RegExp(rf,"u")}var Ks=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,Js=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;var Qs=/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,ea=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,na=/^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,ta=/^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/;var oa=/^https?$/,ra=/^\+[1-9]\d{6,14}$/;var ia="(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";function sf(e){return new RegExp(`^${e}$`)}var sa=sf(ia);function Xr(e){let n="(?:[01]\\d|2[0-3]):[0-5]\\d";return typeof e.precision=="number"?e.precision===-1?`${n}`:e.precision===0?`${n}:[0-5]\\d`:`${n}:[0-5]\\d\\.\\d{${e.precision}}`:e.seconds?`${n}:[0-5]\\d(?:\\.\\d+)?`:`${n}(?::[0-5]\\d(?:\\.\\d+)?)?`}function aa(e){return new RegExp(`^${Xr(e)}$`)}function ca(e){let n=["Z"];e.offset&&n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");let t=`${Xr({precision:e.precision,seconds:!0})}(?:${n.join("|")})`,o=e.local?`${t}|${Xr({precision:e.precision})}`:t;return new RegExp(`^${ia}T(?:${o})$`)}var la=/^[\s\S]{0,}$/;var Jr=/^-?\d+$/,oo=/^-?\d+(?:\.\d+)?$/,ua=/^(?:true|false)$/i,da=/^null$/i;var pa=/^[^A-Z]*$/,fa=/^[^a-z]*$/;var en=O("$ZodCheck",(e,n)=>{var t;e._zod??(e._zod={}),e._zod.def=n,(t=e._zod).onattach??(t.onattach=[])});var Qr=e=>{let n=e.value;return!$r(n)&&n.length!==void 0},Lo={number:"number",bigint:"bigint",object:"date"},ei=O("$ZodCheckLessThan",(e,n)=>{en.init(e,n);let t=Lo[typeof n.value];e._zod.check=o=>{(n.inclusive?o.value<=n.value:o.value<n.value)||o.issues.push({origin:Lo[typeof o.value]??t,code:"too_big",maximum:typeof n.value=="object"?n.value.getTime():n.value,input:o.value,inclusive:n.inclusive,inst:e,continue:!n.abort})}}),ni=O("$ZodCheckGreaterThan",(e,n)=>{en.init(e,n);let t=Lo[typeof n.value];e._zod.check=o=>{(n.inclusive?o.value>=n.value:o.value>n.value)||o.issues.push({origin:Lo[typeof o.value]??t,code:"too_small",minimum:typeof n.value=="object"?n.value.getTime():n.value,input:o.value,inclusive:n.inclusive,inst:e,continue:!n.abort})}}),ma=O("$ZodCheckMultipleOf",(e,n)=>{en.init(e,n),e._zod.check=t=>{if(typeof t.value!=typeof n.value)throw new Error("Cannot mix number and bigint in multiple_of check.");(typeof t.value=="bigint"?n.value!==BigInt(0)&&t.value%n.value===BigInt(0):Or(t.value,n.value)===0)||t.issues.push({origin:typeof t.value,code:"not_multiple_of",divisor:n.value,input:t.value,inst:e,continue:!n.abort})}}),ha=O("$ZodCheckNumberFormat",(e,n)=>{en.init(e,n),n.format=n.format||"float64";let t=n.format?.includes("int"),o=t?"int":"number",[i,r]=Qt[n.format];e._zod.check=s=>{let a=s.value;if(t){if(!Number.isInteger(a)){s.issues.push({expected:o,format:n.format,code:"invalid_type",continue:!1,input:a,inst:e});return}if(!Number.isSafeInteger(a)){a>0?s.issues.push({input:a,code:"too_big",maximum:Number.MAX_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:o,inclusive:!0,continue:!n.abort}):s.issues.push({input:a,code:"too_small",minimum:Number.MIN_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:o,inclusive:!0,continue:!n.abort});return}}a<i&&s.issues.push({origin:"number",input:a,code:"too_small",minimum:i,inclusive:!0,inst:e,continue:!n.abort}),a>r&&s.issues.push({origin:"number",input:a,code:"too_big",maximum:r,inclusive:!0,inst:e,continue:!n.abort})}});var ga=O("$ZodCheckMaxLength",(e,n)=>{var t;en.init(e,n),(t=e._zod.def).when??(t.when=Qr),e._zod.check=o=>{let i=o.value,r=i.length;if((typeof i=="string"&&r>n.maximum?no(i):r)<=n.maximum)return;let a=to(i);o.issues.push({origin:a,code:"too_big",maximum:n.maximum,inclusive:!0,input:i,inst:e,continue:!n.abort})}}),va=O("$ZodCheckMinLength",(e,n)=>{var t;en.init(e,n),(t=e._zod.def).when??(t.when=Qr),e._zod.check=o=>{let i=o.value,r=i.length;if((typeof i=="string"&&r>=n.minimum&&r<n.minimum*2?no(i):r)>=n.minimum)return;let a=to(i);o.issues.push({origin:a,code:"too_small",minimum:n.minimum,inclusive:!0,input:i,inst:e,continue:!n.abort})}}),ba=O("$ZodCheckLengthEquals",(e,n)=>{var t;en.init(e,n),(t=e._zod.def).when??(t.when=Qr),e._zod.check=o=>{let i=o.value,r=i.length,s=typeof i=="string"&&r>=n.length&&r<=n.length*2?no(i):r;if(s===n.length)return;let a=to(i),d=s>n.length;o.issues.push({origin:a,...d?{code:"too_big",maximum:n.length}:{code:"too_small",minimum:n.length},inclusive:!0,exact:!0,input:o.value,inst:e,continue:!n.abort})}}),io=O("$ZodCheckStringFormat",(e,n)=>{var t,o;en.init(e,n),n.pattern?(t=e._zod).check??(t.check=i=>{n.pattern.lastIndex=0,!n.pattern.test(i.value)&&i.issues.push({origin:"string",code:"invalid_format",format:n.format,input:i.value,...n.pattern?{pattern:n.pattern.toString()}:{},inst:e,continue:!n.abort})}):(o=e._zod).check??(o.check=()=>{})}),ya=O("$ZodCheckRegex",(e,n)=>{io.init(e,n),e._zod.check=t=>{n.pattern.lastIndex=0,!n.pattern.test(t.value)&&t.issues.push({origin:"string",code:"invalid_format",format:"regex",input:t.value,pattern:n.pattern.toString(),inst:e,continue:!n.abort})}}),wa=O("$ZodCheckLowerCase",(e,n)=>{n.pattern??(n.pattern=pa),io.init(e,n)}),xa=O("$ZodCheckUpperCase",(e,n)=>{n.pattern??(n.pattern=fa),io.init(e,n)}),_a=O("$ZodCheckIncludes",(e,n)=>{en.init(e,n);let t=qn(n.includes),o=new RegExp(typeof n.position=="number"?`^.{${n.position},}${t}`:t);n.pattern=o,e._zod.check=i=>{i.value.includes(n.includes,n.position)||i.issues.push({origin:"string",code:"invalid_format",format:"includes",includes:n.includes,input:i.value,inst:e,continue:!n.abort})}}),Sa=O("$ZodCheckStartsWith",(e,n)=>{en.init(e,n);let t=new RegExp(`^${qn(n.prefix)}.*`);n.pattern??(n.pattern=t),e._zod.check=o=>{o.value.startsWith(n.prefix)||o.issues.push({origin:"string",code:"invalid_format",format:"starts_with",prefix:n.prefix,input:o.value,inst:e,continue:!n.abort})}}),ka=O("$ZodCheckEndsWith",(e,n)=>{en.init(e,n);let t=new RegExp(`.*${qn(n.suffix)}$`);n.pattern??(n.pattern=t),e._zod.check=o=>{o.value.endsWith(n.suffix)||o.issues.push({origin:"string",code:"invalid_format",format:"ends_with",suffix:n.suffix,input:o.value,inst:e,continue:!n.abort})}});var Wa=O("$ZodCheckOverwrite",(e,n)=>{en.init(e,n),e._zod.check=t=>{t.value=n.tx(t.value)}});var Ho=class{constructor(n=[],t={}){this.content=[],this.indent=0,this.args=n,this.closed=t}indented(n){this.indent+=1;try{n(this)}finally{this.indent-=1}}write(n){if(typeof n=="function"){n(this,{execution:"sync"}),n(this,{execution:"async"});return}let o=n.split(`
`).filter(s=>s),i=Math.min(...o.map(s=>s.length-s.trimStart().length)),r=o.map(s=>s.slice(i)).map(s=>" ".repeat(this.indent*2)+s);for(let s of r)this.content.push(s)}compile(){let n=Function,t=this?.content??[""];return new n(...Object.keys(this.closed),`return function (${this.args.join(", ")}) {
${t.join(`
`)}
};`)(...Object.values(this.closed))}};var Ca={major:4,minor:6,patch:7};var Ce=O("$ZodType",(e,n)=>{var t;e??(e={}),e._zod.def=n,e._zod.bag=e._zod.bag||{},e._zod.version=Ca;let o=e._zod.def.checks,i=e._zod.traits.has("$ZodCheck")?[e,...o??[]]:o?.length?[...o]:[];for(let r of i)for(let s of r._zod.onattach)s(e);if(i.length===0)(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{let r=(a,d,l)=>{if(a.memo)return a;let u=Yn(a),p;for(let m of d){if(m._zod.def.when){if(Fr(a)||!m._zod.def.when(a))continue}else if(u)continue;let f=a.issues.length,b=m._zod.check(a);if(b instanceof Promise&&l?.async===!1)throw new Mn;if(p||b instanceof Promise)p=(p??Promise.resolve()).then(async()=>{await b,a.issues.length!==f&&(eo(a.issues,f,e),u||(u=Yn(a,f)))});else{if(a.issues.length===f)continue;eo(a.issues,f,e),u||(u=Yn(a,f))}}return p?p.then(()=>a):a},s=(a,d,l)=>{if(Yn(a))return a.aborted=!0,a;let u=r(d,i,l);if(u instanceof Promise){if(l.async===!1)throw new Mn;return u.then(p=>e._zod.parse(p,l))}return e._zod.parse(u,l)};e._zod.run=(a,d)=>{if(d.skipChecks)return e._zod.parse(a,d);if(d.direction==="backward"){let u=e._zod.parse({value:a.value,issues:[]},{...d,skipChecks:!0});return u instanceof Promise?u.then(p=>s(p,a,d)):s(u,a,d)}let l=e._zod.parse(a,d);if(l instanceof Promise){if(d.async===!1)throw new Mn;return l.then(u=>r(u,i,d))}return r(l,i,d)}}},{get"~standard"(){return Mo(this,"~standard",oi(this))},set"~standard"(e){ot(this,"~standard",e)}}),Da=(e,n)=>e.issues.length?{issues:e.issues.map(t=>Dn(t,n,bn()))}:{value:e.value};async function af(e,n){let t={async:!0};return Da(await e._zod.run({value:n,issues:[]},t),t)}function oi(e){return{validate:n=>{let t={async:!1};try{let o=e._zod.run({value:n,issues:[]},t);if(!(o instanceof Promise))return Da(o,t)}catch{}return af(e,n)},vendor:"zod",version:1}}var Xo=O("$ZodString",(e,n)=>{Ce.init(e,n),e._zod.pattern=n.pattern??la,e._zod.parse=(t,o)=>{if(n.coerce)try{t.value=String(t.value)}catch{}return typeof t.value=="string"||t.issues.push({expected:"string",code:"invalid_type",input:t.value,inst:e}),t}}),Ae=O("$ZodStringFormat",(e,n)=>{io.init(e,n),Xo.init(e,n)}),Ma=O("$ZodGUID",(e,n)=>{n.pattern??(n.pattern=Gs),Ae.init(e,n)}),Za=O("$ZodUUID",(e,n)=>{if(n.version){let o={v1:1,v2:2,v3:3,v4:4,v5:5,v6:6,v7:7,v8:8}[n.version];if(o===void 0)throw new Error(`Invalid UUID version: "${n.version}"`);n.pattern??(n.pattern=Kr(o))}else n.pattern??(n.pattern=Kr());Ae.init(e,n)}),Ba=O("$ZodEmail",(e,n)=>{n.pattern??(n.pattern=js),Ae.init(e,n)}),Fa=1,Go=2;function Ua(e){try{return typeof URL<"u"&&typeof URL.canParse=="function"?URL.canParse(e):(new URL(e),!0)}catch{return!1}}function cf(e,n){return!("normalize"in n)&&!("hostname"in n)&&!("protocol"in n)?Ua(e)||Go:lf(e,n)}function lf(e,n){if(!n.normalize&&n.protocol?.source===oa.source&&!/^https?:\/\//i.test(e))return Fa;try{if(typeof URL<"u"){let t=URL;if(typeof t.parse=="function")return t.parse(e)??Go}return new URL(e)}catch{return Go}}var uf=/[\t\n\r]/g;function Pa(e){return e.replace(uf,"")}function df(e,n){return n.lastIndex=0,n.test(e.hostname)}function pf(e,n){return n.lastIndex=0,n.test(e.protocol.endsWith(":")?e.protocol.slice(0,-1):e.protocol)}var Va=O("$ZodURL",(e,n)=>{Ae.init(e,n),e._zod.check=t=>{try{let o=t.value.trim(),i=cf(o,n);if(i===Fa){t.issues.push({code:"invalid_format",format:"url",note:"Invalid URL format",input:t.value,inst:e,continue:!n.abort});return}if(i===Go){t.issues.push({code:"invalid_format",format:"url",input:t.value,inst:e,continue:!n.abort});return}if(i===!0){t.value=Pa(o);return}n.hostname&&!df(i,n.hostname)&&t.issues.push({code:"invalid_format",format:"url",note:"Invalid hostname",pattern:n.hostname.source,input:t.value,inst:e,continue:!n.abort}),n.protocol&&!pf(i,n.protocol)&&t.issues.push({code:"invalid_format",format:"url",note:"Invalid protocol",pattern:n.protocol.source,input:t.value,inst:e,continue:!n.abort}),t.value=n.normalize?i.href:Pa(o);return}catch{t.issues.push({code:"invalid_format",format:"url",input:t.value,inst:e,continue:!n.abort})}}}),La=O("$ZodEmoji",(e,n)=>{n.pattern??(n.pattern=Xs()),Ae.init(e,n)}),Ha=O("$ZodNanoID",(e,n)=>{if(n.length!==void 0&&(!Number.isInteger(n.length)||n.length<1))throw new Error(`Invalid nanoid length: ${n.length}`);n.pattern??(n.pattern=n.length===void 0?Ls:Hs(n.length)),Ae.init(e,n)}),qa=O("$ZodCUID",(e,n)=>{n.pattern??(n.pattern=Zs),Ae.init(e,n)}),Ga=O("$ZodCUID2",(e,n)=>{n.pattern??(n.pattern=Bs),Ae.init(e,n)}),ja=O("$ZodULID",(e,n)=>{n.pattern??(n.pattern=Fs),Ae.init(e,n)}),Xa=O("$ZodXID",(e,n)=>{n.pattern??(n.pattern=Us),Ae.init(e,n)}),Ka=O("$ZodKSUID",(e,n)=>{n.pattern??(n.pattern=Vs),Ae.init(e,n)}),Ja=O("$ZodISODateTime",(e,n)=>{n.pattern??(n.pattern=ca(n)),Ae.init(e,n)}),Qa=O("$ZodISODate",(e,n)=>{n.pattern??(n.pattern=sa),Ae.init(e,n)}),ec=O("$ZodISOTime",(e,n)=>{n.pattern??(n.pattern=aa(n)),Ae.init(e,n)}),nc=O("$ZodISODuration",(e,n)=>{n.pattern??(n.pattern=qs),Ae.init(e,n)}),tc=O("$ZodIPv4",(e,n)=>{n.pattern??(n.pattern=Ks),Ae.init(e,n)}),ff=/^[0-9a-fA-F:.]+$/;function oc(e){return ff.test(e)?Ua(`http://[${e}]`):!1}var rc=O("$ZodIPv6",(e,n)=>{n.pattern??(n.pattern=Js),Ae.init(e,n),e._zod.check=t=>{oc(t.value)||t.issues.push({code:"invalid_format",format:"ipv6",input:t.value,inst:e,continue:!n.abort})}});var ic=O("$ZodCIDRv4",(e,n)=>{n.pattern??(n.pattern=Qs),Ae.init(e,n)});function mf(e){let n=e.split("/");if(n.length!==2)return!1;let[t,o]=n;if(!o)return!1;let i=Number(o);return`${i}`!==o||i<0||i>128?!1:oc(t)}var sc=O("$ZodCIDRv6",(e,n)=>{n.pattern??(n.pattern=ea),Ae.init(e,n),e._zod.check=t=>{mf(t.value)||t.issues.push({code:"invalid_format",format:"cidrv6",input:t.value,inst:e,continue:!n.abort})}});function ac(e){if(e==="")return!0;if(/\s/.test(e)||e.length%4!==0)return!1;try{return atob(e),!0}catch{return!1}}var ri=/^[0-9a-zA-Z+/]*={0,2}$/,cc=O("$ZodBase64",(e,n)=>{n.pattern??(n.pattern=ri),Ae.init(e,n),e._zod.check=t=>{ac(t.value)||t.issues.push({code:"invalid_format",format:"base64",input:t.value,inst:e,continue:!n.abort})}}),Ko=/^[A-Za-z0-9_-]*$/;function hf(e){if(!Ko.test(e))return!1;let n=e.replace(/[-_]/g,o=>o==="-"?"+":"/"),t=n.padEnd(Math.ceil(n.length/4)*4,"=");return ac(t)}var lc=O("$ZodBase64URL",(e,n)=>{n.pattern??(n.pattern=Ko),Ae.init(e,n),e._zod.check=t=>{hf(t.value)||t.issues.push({code:"invalid_format",format:"base64url",input:t.value,inst:e,continue:!n.abort})}}),uc=O("$ZodE164",(e,n)=>{n.pattern??(n.pattern=ra),Ae.init(e,n)});function gf(e,n=null){try{let t=e.split(".");if(t.length!==3)return!1;let[o]=t;if(!o)return!1;let i=JSON.parse(atob(o));return!("typ"in i&&i?.typ!=="JWT"||!i.alg||n&&(!("alg"in i)||i.alg!==n))}catch{return!1}}var dc=O("$ZodJWT",(e,n)=>{Ae.init(e,n),e._zod.check=t=>{gf(t.value,n.alg)||t.issues.push({code:"invalid_format",format:"jwt",input:t.value,inst:e,continue:!n.abort})}});var ii=O("$ZodNumber",(e,n)=>{Ce.init(e,n),e._zod.pattern=oo,e._zod.parse=(t,o)=>{if(n.coerce)try{t.value=Number(t.value)}catch{}let i=t.value;if(typeof i=="number"&&!Number.isNaN(i)&&Number.isFinite(i))return t;let r=typeof i=="number"?Number.isNaN(i)?"NaN":Number.isFinite(i)?void 0:String(i):void 0;return t.issues.push({expected:"number",code:"invalid_type",input:i,inst:e,...r?{received:r}:{}}),t}}),pc=O("$ZodNumberFormat",(e,n)=>{ha.init(e,n),ii.init(e,n)}),fc=O("$ZodBoolean",(e,n)=>{Ce.init(e,n),e._zod.pattern=ua,e._zod.parse=(t,o)=>{if(n.coerce)try{t.value=!!t.value}catch{}let i=t.value;return typeof i=="boolean"||t.issues.push({expected:"boolean",code:"invalid_type",input:i,inst:e}),t}});var mc=O("$ZodNull",(e,n)=>{Ce.init(e,n),e._zod.pattern=da,e._zod.values=new Set([null]),e._zod.parse=(t,o)=>{let i=t.value;return i===null||t.issues.push({expected:"null",code:"invalid_type",input:i,inst:e}),t}});var hc=O("$ZodUnknown",(e,n)=>{Ce.init(e,n),e._zod.parse=t=>t}),gc=O("$ZodNever",(e,n)=>{Ce.init(e,n),e._zod.parse=(t,o)=>(t.issues.push({expected:"never",code:"invalid_type",input:t.value,inst:e}),t)});function vf(e,n){let t=Do(e._zod.def.checks);if(!t.length)return;let o=Math.min(...t.map(r=>r[0])),i=e._zod.parse;e._zod.parse=(r,s)=>{let a=n(r.value);if(a>o&&!s?.skipChecks&&s?.direction!=="backward"){for(let[d,l]of Do(e._zod.def.checks))if(a>d&&l._zod.def.when(r)){let u=r.issues.length;return l._zod.check(r),r.issues[u].continue=!1,eo(r.issues,u,e),r}}return i(r,s)}}var bf=e=>Array.isArray(e)?e.length:-1;function Ia(e,n,t){e.issues.length&&n.issues.push(...Gn(t,e.issues)),n.value[t]=e.value}var vc=O("$ZodArray",(e,n)=>{Ce.init(e,n);let t=dn.memoizer;t?.attach(e),e._zod.parse=(o,i)=>{let r=o.value;if(!Array.isArray(r))return o.issues.push({expected:"array",code:"invalid_type",input:r,inst:e}),o;o.value=t?t.alloc(e,o,Array(r.length),i):Array(r.length);let s=[],a=i?.abortEarly;for(let d=0;d<r.length;d++){let l=r[d],u=n.element._zod.run({value:l,issues:[]},i);if(u instanceof Promise)s.push(u.then(p=>Ia(p,o,d)));else if(Ia(u,o,d),a&&u.issues.length!==0&&Yn(u))break}return s.length?Promise.all(s).then(()=>o):o},vf(e,bf)});function jo(e,n,t,o,i,r){let s=t in o,a=r==="optional";if(!(!s&&a&&i==="optional")){if(e.issues.length){if(i!==void 0&&a&&!s)return;n.issues.push(...Gn(t,e.issues))}if(!s&&i===void 0){e.issues.length||n.issues.push({code:"invalid_type",expected:"nonoptional",input:void 0,path:[t]});return}e.value===void 0?(s||i==="defaulted"&&!a)&&(n.value[t]=void 0):n.value[t]=e.value}}var yf=[];function bc(e){let n=Object.keys(e.shape),t=Object.getOwnPropertySymbols(e.shape),o=t.length?t:yf,i=o.length?[...n,...o]:n;for(let s of i)if(!e.shape?.[s]?._zod?.traits?.has("$ZodType"))throw new Error(`Invalid element at key "${String(s)}": expected a Zod schema`);let r=Br(e.shape);return{...e,allKeys:i,symbolKeys:o,keySet:new Set(n),numKeys:n.length,optionalKeys:new Set(r)}}function yc(e,n,t,o,i,r,s){let a=[],d=i.keySet,l=i.catchall._zod,u=l.def.type,p=l.optin,m=l.optout,f=0;for(let b in n){if(s&&t.issues.length!==f){if(Yn(t,f))break;f=t.issues.length}if(d.has(b))continue;if(b==="__proto__"){u==="never"&&a.push(b);continue}if(u==="never"){a.push(b);continue}let v=l.run({value:n[b],issues:[]},o);v instanceof Promise?e.push(v.then(w=>jo(w,t,b,n,p,m))):jo(v,t,b,n,p,m)}return a.length&&t.issues.push({code:"unrecognized_keys",keys:a,input:n,inst:r,continue:!0}),e.length?Promise.all(e).then(()=>t):t}var wf=O("$ZodObject",(e,n)=>{Ce.init(e,n);let t=Object.getOwnPropertyDescriptor(n,"shape"),o=t?.get?t.get.raw:n.shape??{};if(o){let l=()=>{let u={...o};return Object.defineProperty(n,"shape",{value:u}),l.raw=u,u};l.raw=o,Object.defineProperty(n,"shape",{get:l})}let i=At(()=>bc(n));ve(e,"propValues",l=>{let u=l.def.shape,p={};for(let m in u){let f=u[m]._zod;if(f.values){Object.prototype.hasOwnProperty.call(p,m)||vn(p,m,new Set);for(let b of f.values)p[m].add(b);f.optin!==void 0&&p[m].add(void 0)}}return p});let r=ht,s=n.catchall,a,d=dn.memoizer;d?.attach(e),e._zod.parse=(l,u)=>{a??(a=i.value);let p=l.value;if(!r(p))return l.issues.push({expected:"object",code:"invalid_type",input:p,inst:e}),l;l.value=d?d.alloc(e,l,{},u):{};let m=[],f=a.shape,b=u?.abortEarly,v=l.issues.length;for(let w of a.allKeys){if(b&&l.issues.length!==v){if(Yn(l,v))break;v=l.issues.length}if(w==="__proto__")continue;let k=f[w],P=k._zod.optin,M=k._zod.optout,B=k._zod.run({value:p[w],issues:[]},u);B instanceof Promise?m.push(B.then(E=>jo(E,l,w,p,P,M))):jo(B,l,w,p,P,M)}return s?yc(m,p,l,u,i.value,e,b===!0):m.length?Promise.all(m).then(()=>l):l}}),wc=O("$ZodObjectJIT",(e,n)=>{wf.init(e,n);let t=e._zod.parse,o=At(()=>bc(n)),i=dn.memoizer,r=f=>{let b=o.value,v=b.symbolKeys,w=new Ho(["payload","ctx"],{shape:f,inst:e,memo:i,syms:v}),k=E=>`shape[${E}]._zod.run({ value: input[${E}], issues: [] }, ctx)`,P=(E,T)=>`
          let ${E}_ab = false;
          for (let i = 0; i < ${E}.issues.length; i++) {
            const iss = ${E}.issues[i];
            iss.path = iss.path ? [${T}, ...iss.path] : [${T}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${E}_ab = true;
          }
          if (${E}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;w.write("const input = payload.value;");let M=Object.create(null),B=0;for(let E of b.allKeys)M[E]=`key_${B++}`;w.write(i?"const newResult = memo.alloc(inst, payload, {}, ctx);":"const newResult = {};");for(let E of b.allKeys){if(E==="__proto__")continue;let T=M[E],z=typeof E=="symbol"?`syms[${v.indexOf(E)}]`:Yr(E),$=`${z} in input`,W=f[E],_=W?._zod?.optin,C=_!==void 0,N=W?._zod?.optout==="optional";if(w.write(`const ${T} = ${k(z)};`),C&&N){let S=_==="optional"?`${T}_present`:`${T}.value !== undefined || ${T}_present`;w.write(`
        const ${T}_present = ${$};
        if (!${T}.issues.length || ${T}_present) {
          if (${T}.issues.length) {${P(T,z)}
          }

          if (${S}) {
            newResult[${z}] = ${T}.value;
          }
        }

      `)}else C?(w.write(`
        if (${T}.issues.length) {${P(T,z)}
        }
      `),_==="defaulted"?w.write(`newResult[${z}] = ${T}.value;`):w.write(`
        if (${T}.value !== undefined || ${$}) {
          newResult[${z}] = ${T}.value;
        }
      `)):w.write(`
        const ${T}_present = ${$};
        if (${T}.issues.length) {${P(T,z)}
        }
        if (!${T}_present && !${T}.issues.length) {
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

        if (${T}_present) {
          newResult[${z}] = ${T}.value;
        }

      `)}return w.write("payload.value = newResult;"),w.write("return payload;"),w.compile()},s,a=ht,d=!dn.jitless,u=d&&Mr.value,p=n.catchall,m;e._zod.parse=(f,b)=>{m??(m=o.value);let v=f.value;return a(v)?d&&u&&b?.async===!1&&b.jitless!==!0?(s||(s=r(n.shape)),f=s(f,b),p?yc([],v,f,b,m,e,b?.abortEarly===!0):f):t(f,b):(f.issues.push({expected:"object",code:"invalid_type",input:v,inst:e}),f)}});function Na(e,n,t,o){for(let r of e)if(r.issues.length===0)return n.value=r.value,n;let i=e.filter(r=>!Yn(r));return i.length===1?(n.value=i[0].value,i[0]):(n.issues.push({code:"invalid_union",input:n.value,inst:t,errors:e.map(r=>r.issues.map(s=>Dn(s,o,bn())))}),n)}var si=O("$ZodUnion",(e,n)=>{Ce.init(e,n),ve(e,"optin",o=>o.def.options.some(i=>i._zod.optin==="defaulted")?"defaulted":o.def.options.some(i=>i._zod.optin!==void 0)?"optional":void 0),ve(e,"optout",o=>o.def.options.some(i=>i._zod.optout==="optional")?"optional":void 0),ve(e,"values",o=>{if(o.def.options.every(i=>i._zod.values))return new Set(o.def.options.flatMap(i=>Array.from(i._zod.values)))}),ve(e,"pattern",o=>{if(o.def.options.every(i=>i._zod.pattern)){let i=o.def.options.map(r=>r._zod.pattern);return new RegExp(`^(${i.map(r=>Jt(r.source)).join("|")})$`)}});let t=n.options.length===1?n.options[0]._zod.run:null;e._zod.parse=(o,i)=>{if(t)return t(o,i);let r=!1,s=[];for(let a of n.options){let d=a._zod.run({value:o.value,issues:[]},i);if(d instanceof Promise)s.push(d),r=!0;else{if(d.issues.length===0)return d;s.push(d)}}return r?Promise.all(s).then(a=>Na(a,o,e,i)):Na(s,o,e,i)}});function xf(e){let n=new Map;for(let t of e.options){let o=t._zod.propValues?.[e.discriminator];if(!o||o.size===0)throw new Error(`Invalid discriminated union option at index "${e.options.indexOf(t)}"`);for(let i of o)if(n.has(i)){if(i!==void 0)throw new Error(`Duplicate discriminator value "${String(i)}"`);n.set(i,null)}else n.set(i,t)}return n}var xc=O("$ZodDiscriminatedUnion",(e,n)=>{n.inclusive=!1,si.init(e,n);let t=e._zod.parse;ve(e,"propValues",i=>{let r={},s=0;for(let a of i.def.options){let d=a._zod.propValues;if(!d||Object.keys(d).length===0)throw new Error(`Invalid discriminated union option at index "${i.def.options.indexOf(a)}"`);d[i.def.discriminator]?.has(void 0)&&s++;for(let[l,u]of Object.entries(d)){Object.prototype.hasOwnProperty.call(r,l)||vn(r,l,new Set);for(let p of u)r[l].add(p)}}return!i.def.unionFallback&&s>1&&r[i.def.discriminator]?.delete(void 0),r}),n.options.forEach((i,r)=>{let s=Et(i._zod.def);if(s&&!Object.prototype.hasOwnProperty.call(s,n.discriminator))throw new Error(`Invalid discriminated union option at index "${r}"`)});let o=At(()=>xf(n));e._zod.parse=(i,r)=>{let s=i.value;if(!ht(s))return i.issues.push({code:"invalid_type",expected:"object",input:s,inst:e}),i;let a=s?.[n.discriminator],d=o.value.get(a);return d&&(a!==void 0||r.direction!=="backward")?d._zod.run(i,r):n.unionFallback||r.direction==="backward"?t(i,r):(i.issues.push({code:"invalid_union",errors:[],note:"No matching discriminator",discriminator:n.discriminator,options:Array.from(o.value.keys()).filter(l=>o.value.get(l)!==null),input:s,path:[n.discriminator],inst:e}),i)}}),_c=O("$ZodIntersection",(e,n)=>{Ce.init(e,n),e._zod.parse=(t,o)=>{let i=t.value,r=n.left._zod.run({value:i,issues:[]},o),s=n.right._zod.run({value:i,issues:[]},o);return r instanceof Promise||s instanceof Promise?Promise.all([r,s]).then(([d,l])=>Aa(t,d,l)):Aa(t,r,s)}});function ti(e,n){if(e===n)return{valid:!0,data:e};if(e instanceof Date&&n instanceof Date&&+e==+n)return{valid:!0,data:e};if(rt(e)&&rt(n)){let t=Object.keys(n),o=Object.keys(e).filter(r=>t.indexOf(r)!==-1),i={...e,...n};Object.prototype.hasOwnProperty.call(i,"__proto__")&&delete i.__proto__;for(let r of o){if(r==="__proto__")continue;let s=ti(e[r],n[r]);if(!s.valid)return{valid:!1,mergeErrorPath:[r,...s.mergeErrorPath]};i[r]=s.data}return{valid:!0,data:i}}if(Array.isArray(e)&&Array.isArray(n)){if(e.length!==n.length)return{valid:!1,mergeErrorPath:[]};let t=[];for(let o=0;o<e.length;o++){let i=e[o],r=n[o],s=ti(i,r);if(!s.valid)return{valid:!1,mergeErrorPath:[o,...s.mergeErrorPath]};t.push(s.data)}return{valid:!0,data:t}}return{valid:!1,mergeErrorPath:[]}}function Aa(e,n,t){let o=new Map,i,r=new Map,s=(l,u)=>{let p;if(l.code==="unrecognized_keys"&&!l.path?.length)i??(i=l),p=l.keys;else if(l.code==="invalid_key"&&l.origin==="record"&&l.path?.length===1){let m=String(l.path[0]);r.has(m)||r.set(m,l),p=[m]}else return!1;for(let m of p)o.has(m)||o.set(m,{}),o.get(m)[u]=!0;return!0};for(let l of n.issues)s(l,"l")||e.issues.push(l);for(let l of t.issues)s(l,"r")||e.issues.push(l);let a=[...o].filter(([,l])=>l.l&&l.r).map(([l])=>l);if(a.length){let l=i?a.filter(u=>i.keys.includes(u)):[];l.length&&e.issues.push({...i,keys:l});for(let u of a)!l.includes(u)&&r.has(u)&&e.issues.push(r.get(u))}let d=ti(n.value,t.value);if(!d.valid){if(Yn(e))return e;throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(d.mergeErrorPath)}`)}return e.value=d.data,e}var Sc=O("$ZodRecord",(e,n)=>{Ce.init(e,n);let t=dn.memoizer;t?.attach(e),e._zod.parse=(o,i)=>{let r=o.value;if(!rt(r))return o.issues.push({expected:"record",code:"invalid_type",input:r,inst:e}),o;let s=[],a=n.keyType._zod.values;if(a&&!n.partial){o.value=t?t.alloc(e,o,{},i):{};let d=new Set;for(let u of a)if(typeof u=="string"||typeof u=="number"||typeof u=="symbol"){if(d.add(typeof u=="number"?u.toString():u),u==="__proto__")continue;let p=n.keyType._zod.run({value:u,issues:[]},i);if(p instanceof Promise)throw new Error("Async schemas not supported in object keys currently");if(p.issues.length){o.issues.push({code:"invalid_key",origin:"record",issues:p.issues.map(b=>Dn(b,i,bn())),input:u,path:[u],inst:e});continue}let m=p.value;if(m==="__proto__")continue;let f=n.valueType._zod.run({value:r[u],issues:[]},i);f instanceof Promise?s.push(f.then(b=>{b.issues.length&&o.issues.push(...Gn(u,b.issues)),o.value[m]=b.value})):(f.issues.length&&o.issues.push(...Gn(u,f.issues)),o.value[m]=f.value)}let l;for(let u in r)if(!d.has(u))if(n.mode==="loose"){if(u==="__proto__")continue;o.value[u]=r[u]}else l=l??[],l.push(u);l&&l.length>0&&o.issues.push({code:"unrecognized_keys",input:r,inst:e,keys:l,continue:!0})}else{o.value=t?t.alloc(e,o,{},i):{};let d;for(let l of Reflect.ownKeys(r)){if(l==="__proto__"||!Object.prototype.propertyIsEnumerable.call(r,l))continue;let u=n.keyType._zod.run({value:l,issues:[]},i);if(u instanceof Promise)throw new Error("Async schemas not supported in object keys currently");if(typeof l=="string"&&oo.test(l)&&u.issues.length){let b=n.keyType._zod.run({value:Number(l),issues:[]},i);if(b instanceof Promise)throw new Error("Async schemas not supported in object keys currently");b.issues.length===0&&(u=b)}if(u.issues.length){n.mode==="loose"?o.value[l]=r[l]:a?(d=d??[],d.push(l)):o.issues.push({code:"invalid_key",origin:"record",issues:u.issues.map(b=>Dn(b,i,bn())),input:l,path:[l],inst:e});continue}let m=u.value;if(m==="__proto__")continue;let f=n.valueType._zod.run({value:r[l],issues:[]},i);f instanceof Promise?s.push(f.then(b=>{b.issues.length&&o.issues.push(...Gn(l,b.issues)),o.value[m]=b.value})):(f.issues.length&&o.issues.push(...Gn(l,f.issues)),o.value[m]=f.value)}d&&d.length>0&&o.issues.push({code:"unrecognized_keys",input:r,inst:e,keys:d,continue:!0})}return s.length?Promise.all(s).then(()=>o):o}});var kc=O("$ZodEnum",(e,n)=>{Ce.init(e,n);let t=It(n.entries),o=new Set(t);e._zod.values=o,ve(e,"pattern",i=>{let r=It(i.def.entries).filter(s=>Zr.has(typeof s));return new RegExp(r.length?`^(${r.map(s=>qn(s.toString())).join("|")})$`:"^[^\\s\\S]$")}),e._zod.parse=(i,r)=>{let s=i.value;return o.has(s)||i.issues.push({code:"invalid_value",values:t,input:s,inst:e}),i}}),Wc=O("$ZodLiteral",(e,n)=>{Ce.init(e,n);let t=new Set(n.values);e._zod.values=t,ve(e,"pattern",o=>{let i=o.def.values;return new RegExp(i.length?`^(${i.map(r=>typeof r=="string"?qn(r):r?qn(r.toString()):String(r)).join("|")})$`:"^[^\\s\\S]$")}),e._zod.parse=(o,i)=>{let r=o.value;return t.has(r)||o.issues.push({code:"invalid_value",values:n.values,input:r,inst:e}),o}});var zc=O("$ZodTransform",(e,n)=>{Ce.init(e,n),e._zod.optin="optional",dn.memoizer?.guard(e),e._zod.parse=(t,o)=>{if(o.direction==="backward")throw new $t(e.constructor.name);let i=n.transform(t.value,t);if(o.async)return(i instanceof Promise?i:Promise.resolve(i)).then(s=>(t.value=s,t));if(i instanceof Promise)throw new Mn;return t.value=i,t}});function Ea(e,n){return e.value=n.issues.length?void 0:n.value,e}var ai=O("$ZodOptional",(e,n)=>{Ce.init(e,n),ve(e,"optin",t=>t.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),e._zod.optout="optional",ve(e,"values",t=>{let o=t.def.innerType._zod.values;return o?new Set([...o,void 0]):void 0}),ve(e,"pattern",t=>{let o=t.def.innerType._zod.pattern;return o?new RegExp(`^(${Jt(o.source)})?$`):void 0}),e._zod.parse=(t,o)=>{if(t.value===void 0){if(n.innerType._zod.optin!=="defaulted")return t;let i=n.innerType._zod.run({value:t.value,issues:[]},o);return i instanceof Promise?i.then(r=>Ea(t,r)):Ea(t,i)}return n.innerType._zod.run(t,o)}}),Cc=O("$ZodExactOptional",(e,n)=>{ai.init(e,n),ve(e,"values",t=>t.def.innerType._zod.values),ve(e,"pattern",t=>t.def.innerType._zod.pattern),e._zod.parse=(t,o)=>n.innerType._zod.run(t,o)}),Pc=O("$ZodNullable",(e,n)=>{Ce.init(e,n),ve(e,"optin",t=>t.def.innerType._zod.optin),ve(e,"optout",t=>t.def.innerType._zod.optout),ve(e,"pattern",t=>{let o=t.def.innerType._zod.pattern;return o?new RegExp(`^(${Jt(o.source)}|null)$`):void 0}),ve(e,"values",t=>t.def.innerType._zod.values?new Set([...t.def.innerType._zod.values,null]):void 0),e._zod.parse=(t,o)=>t.value===null?t:n.innerType._zod.run(t,o)}),Ic=O("$ZodDefault",(e,n)=>{Ce.init(e,n),e._zod.optin="defaulted",ve(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,o)=>{if(o.direction==="backward")return n.innerType._zod.run(t,o);if(t.value===void 0)return t.value=n.defaultValue,t;let i=n.innerType._zod.run(t,o);return i instanceof Promise?i.then(r=>Ta(r,n)):Ta(i,n)}});function Ta(e,n){return e.value===void 0&&(e.value=n.defaultValue),e}var Nc=O("$ZodPrefault",(e,n)=>{Ce.init(e,n),e._zod.optin="defaulted",ve(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,o)=>(o.direction==="backward"||t.value===void 0&&(t.value=n.defaultValue),n.innerType._zod.run(t,o))}),Ac=O("$ZodNonOptional",(e,n)=>{Ce.init(e,n),ve(e,"values",t=>{let o=t.def.innerType._zod.values;return o?new Set([...o].filter(i=>i!==void 0)):void 0}),e._zod.parse=(t,o)=>{let i=n.innerType._zod.run(t,o);return i instanceof Promise?i.then(r=>$a(r,e)):$a(i,e)}});function $a(e,n){return!e.issues.length&&e.value===void 0&&e.issues.push({code:"invalid_type",expected:"nonoptional",input:e.value,inst:n}),e}function Oa(e,n,t,o){return n.issues.length?(e.value=t.catchValue({...n,value:e.value,error:{issues:n.issues.map(i=>Dn(i,o,bn()))},input:e.value}),e):(e.value=n.value,n.memo&&(e.memo=!0),e)}var Ec=O("$ZodCatch",(e,n)=>{Ce.init(e,n),ve(e,"optin",t=>t.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),ve(e,"optout",t=>t.def.innerType._zod.optout),ve(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,o)=>{if(o.direction==="backward")return n.innerType._zod.run(t,o);let i=n.innerType._zod.run({value:t.value,issues:[]},o);return i instanceof Promise?i.then(r=>Oa(t,r,n,o)):Oa(t,i,n,o)}});var Tc=O("$ZodPipe",(e,n)=>{Ce.init(e,n),ve(e,"values",t=>t.def.in._zod.values),ve(e,"optin",t=>t.def.in._zod.optin),ve(e,"optout",t=>t.def.out._zod.optout),ve(e,"propValues",t=>t.def.in._zod.propValues),e._zod.parse=(t,o)=>{if(o.direction==="backward"){let r=n.out._zod.run(t,o);return r instanceof Promise?r.then(s=>qo(s,n.in,o)):qo(r,n.in,o)}let i=n.in._zod.run(t,o);return i instanceof Promise?i.then(r=>qo(r,n.out,o)):qo(i,n.out,o)}});function qo(e,n,t){return e.issues.some(o=>o.code!=="unrecognized_keys")?(e.aborted=!0,e):n._zod.run({value:e.value,issues:e.issues},t)}var $c=O("$ZodReadonly",(e,n)=>{Ce.init(e,n),ve(e,"propValues",t=>t.def.innerType._zod.propValues),ve(e,"values",t=>t.def.innerType._zod.values),ve(e,"optin",t=>t.def.innerType?._zod?.optin),ve(e,"optout",t=>t.def.innerType?._zod?.optout),e._zod.parse=(t,o)=>{if(o.direction==="backward")return n.innerType._zod.run(t,o);let i=n.innerType._zod.run(t,o);return i instanceof Promise?i.then(Ra):Ra(i)}});function Ra(e){return e.memo||(e.value=Object.freeze(e.value)),e}var Oc=O("$ZodLazy",(e,n)=>{Ce.init(e,n),Rr(e._zod,"innerType",()=>{let t=n;return t._cachedInner||(t._cachedInner=n.getter()),t._cachedInner}),ve(e,"pattern",t=>t.innerType?._zod?.pattern),ve(e,"propValues",t=>t.innerType?._zod?.propValues),ve(e,"optin",t=>t.innerType?._zod?.optin??void 0),ve(e,"optout",t=>t.innerType?._zod?.optout??void 0),e._zod.parse=(t,o)=>e._zod.innerType._zod.run(t,o)}),Rc=O("$ZodCustom",(e,n)=>{en.init(e,n),Ce.init(e,n),e._zod.parse=(t,o)=>t,e._zod.check=t=>{let o=t.value,i=n.fn(o);if(i instanceof Promise)return i.then(r=>Ya(r,t,o,e));Ya(i,t,o,e)}});function Ya(e,n,t,o){if(!e){let i={code:"custom",input:t,inst:o,path:[...o._zod.def.path??[]],continue:!o._zod.def.abort};o._zod.def.params&&(i.params=o._zod.def.params),n.issues.push(Tt(i))}}var li=class extends Error{constructor(){super("Cannot parse a reference cycle that closes through a transform"),this.name="ZodCyclicError"}},ui="~memo",Yc=[];function Dc(e){return e!==null&&typeof e=="object"}function ci(e){return e.map(n=>n.path?{...n,path:n.path.slice()}:{...n})}var Mc=new WeakMap,so=0,er=1,ao=2;function nr(e,n,t){let o=Mc.get(e);if(o!==void 0)return o?ao:so;if(n.has(e))return ao;n.add(e);let i=so,r=u=>{if(i!==ao&&u?._zod){let p=nr(u,n,t);p>i&&(i=p)}},s=(u,p)=>{let m=so;for(let f of Reflect.ownKeys(u)){let b=Object.getOwnPropertyDescriptor(u,f);if(p&&!b.enumerable)continue;let v=b.get?er:b.value?._zod?nr(b.value,n,t):so;v>m&&(m=v)}return m},a=u=>{u>i&&(i=u)},d=e._zod.def,l=d.type;switch(l){case"object":{let u=Et(d);a(u?s(u,!0):er),r(d.catchall);break}case"array":r(d.element);break;case"tuple":for(let u of d.items)r(u);r(d.rest);break;case"record":case"map":r(d.keyType),r(d.valueType);break;case"set":r(d.valueType);break;case"union":for(let u of d.options)r(u);break;case"intersection":r(d.left),r(d.right);break;case"optional":case"nullable":case"default":case"prefault":case"catch":case"readonly":case"nonoptional":case"promise":case"success":r(d.innerType);break;case"pipe":r(d.in),r(d.out);break;case"function":r(d.input),r(d.output);break;case"lazy":{let u=d._cachedInner??(t?e._zod.innerType:void 0);a(u?nr(u,n,!1):er);break}case"template_literal":case"string":case"number":case"int":case"boolean":case"bigint":case"symbol":case"undefined":case"null":case"void":case"never":case"any":case"unknown":case"date":case"nan":case"enum":case"literal":case"file":case"transform":case"custom":break;default:for(let u in d){let p=Object.getOwnPropertyDescriptor(d,u);if(!p||p.get)continue;let m=p.value;if(!(!m||typeof m!="object")){if(m._zod)r(m);else if(Array.isArray(m))for(let f of m)r(f)}}}return n.delete(e),_f(e,i)}function _f(e,n){return n!==er&&Mc.set(e,n===ao),n}function Sf(e,n){let t=e.buckets.get(n);return t||(t=new WeakMap,e.buckets.set(n,t)),t}var Jo,Qo=[],kf={alloc(e,n,t){let o=Jo;if(!o)return t;Jo=void 0;let i={value:t,issues:null};return o.set(n.value,i),Qo.push(i),t},guard(e){var n;(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred.push(()=>{let t=e._zod.parse,o=(i,r)=>{if(r.direction!=="backward"&&Wf(r,i.value))throw new li;return t(i,r)};e._zod.parse=o,e._zod.run===t&&(e._zod.run=o)})},attach(e){var n;let t,o=!1,i,r;(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred.push(()=>{let s=e._zod.parse,a=(d,l)=>{if(t===void 0){let k=nr(e,new Set,!1);if(k===so)return e._zod.parse=s,e._zod.run===a&&(e._zod.run=s),s(d,l);k===ao||o?t=!0:o=!0}let u=d.value;if(!Dc(u))return s(d,l);let p=l[ui];p||(p={buckets:new WeakMap,backEdges:void 0},l[ui]=p);let m;i===l?m=r:(m=Sf(p,e),i=l,r=m);let f=m.get(u);if(f)return d.value=f.value,f.issues?f.issues.length&&d.issues.push(...ci(f.issues)):(d.memo=!0,p.backEdges??(p.backEdges=new WeakSet),p.backEdges.add(f.value)),d;Jo=m;let b=Qo.length,v=s(d,l);Jo=void 0;let w=Qo.length>b?Qo.pop():void 0;return v instanceof Promise?v.then(k=>(w&&(w.issues=k.issues.length?ci(k.issues):Yc),k)):(w&&(w.issues=v.issues.length?ci(v.issues):Yc),v)};e._zod.parse=a,e._zod.run===s&&(e._zod.run=a)})}};function Zc(){return kf}function Wf(e,n){let t=e[ui]?.backEdges;return t!==void 0&&Dc(n)&&t.has(n)}var zf=()=>{let e={string:{unit:"characters",verb:"to have"},file:{unit:"bytes",verb:"to have"},array:{unit:"items",verb:"to have"},set:{unit:"items",verb:"to have"},map:{unit:"entries",verb:"to have"}};function n(r){return e[r]??null}let t={regex:"input",email:"email address",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO datetime",date:"ISO date",time:"ISO time",duration:"ISO duration",ipv4:"IPv4 address",ipv6:"IPv6 address",mac:"MAC address",cidrv4:"IPv4 range",cidrv6:"IPv6 range",base64:"base64-encoded string",base64url:"base64url-encoded string",json_string:"JSON string",e164:"E.164 number",currency_code:"currency code",credit_card:"credit card number",iban:"IBAN",jwt:"JWT",template_literal:"input"},o={nan:"NaN"};function i(r,s){return r==="number"&&typeof s=="number"&&!Number.isFinite(s)?String(s):o[r]??r}return r=>{switch(r.code){case"invalid_type":{let s=i(r.expected),a=Ur(r.input),d=i(a,r.input);return`Invalid input: expected ${s}, received ${d}`}case"invalid_value":return r.values.length===1?`Invalid input: expected ${Oo(r.values[0])}`:`Invalid option: expected one of ${To(r.values,"|")}`;case"too_big":{let s=r.exact?"exactly ":r.inclusive?"<=":"<",a=n(r.origin);return a?`Too big: expected ${r.origin??"value"} to have ${s}${r.maximum.toString()} ${a.unit??"elements"}`:`Too big: expected ${r.origin??"value"} to be ${s}${r.maximum.toString()}`}case"too_small":{let s=r.exact?"exactly ":r.inclusive?">=":">",a=n(r.origin);return a?`Too small: expected ${r.origin} to have ${s}${r.minimum.toString()} ${a.unit}`:`Too small: expected ${r.origin} to be ${s}${r.minimum.toString()}`}case"invalid_format":{let s=r;return s.format==="starts_with"?`Invalid string: must start with "${s.prefix}"`:s.format==="ends_with"?`Invalid string: must end with "${s.suffix}"`:s.format==="includes"?`Invalid string: must include "${s.includes}"`:s.format==="regex"?`Invalid string: must match pattern ${s.pattern}`:`Invalid ${t[s.format]??r.format}`}case"not_multiple_of":return`Invalid number: must be a multiple of ${r.divisor}`;case"unrecognized_keys":return`Unrecognized key${r.keys.length>1?"s":""}: ${To(r.keys,", ")}`;case"invalid_key":return`Invalid key in ${r.origin}`;case"invalid_union":return r.options&&Array.isArray(r.options)&&r.options.length>0?`Invalid discriminator value. Expected ${r.options.map(a=>`'${a}'`).join(" | ")}`:r.inclusive===!1?"Invalid input: more than one option matched":"Invalid input";case"invalid_element":return`Invalid value in ${r.origin}`;default:return"Invalid input"}}};function Bc(){return{localeError:zf()}}var Fc;var di=class{constructor(){this._map=new WeakMap,this._idmap=new Map}add(n,...t){let o=t[0];return this._map.set(n,o),o&&typeof o=="object"&&"id"in o&&this._idmap.set(o.id,n),this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(n){let t=this._map.get(n);return t&&typeof t=="object"&&"id"in t&&this._idmap.delete(t.id),this._map.delete(n),this}get(n){let t=n._zod.parent;if(t){let o={...this.get(t)??{}};delete o.id;let i={...o,...this._map.get(n)};return Object.keys(i).length?i:void 0}return this._map.get(n)}has(n){return this._map.has(n)}};function Cf(){return new di}(Fc=globalThis).__zod_globalRegistry??(Fc.__zod_globalRegistry=Cf());var gt=globalThis.__zod_globalRegistry;function Uc(e){return e.checks&&(e.checks=[...e.checks]),e}function Vc(e,n){return new e(Uc({type:"string",...ie(n)}))}function Lc(e,n){return new e({type:"string",format:"email",check:"string_format",abort:!1,...ie(n)})}function Hc(e,n){return new e({type:"string",format:"guid",check:"string_format",abort:!1,...ie(n)})}function qc(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,...ie(n)})}function Gc(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v4",...ie(n)})}function jc(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v6",...ie(n)})}function Xc(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v7",...ie(n)})}function Kc(e,n){return new e({type:"string",format:"url",check:"string_format",abort:!1,...ie(n)})}function Jc(e,n){return new e({type:"string",format:"emoji",check:"string_format",abort:!1,...ie(n)})}function Qc(e,n){return new e({type:"string",format:"nanoid",check:"string_format",abort:!1,...ie(n)})}function el(e,n){return new e({type:"string",format:"cuid",check:"string_format",abort:!1,...ie(n)})}function nl(e,n){return new e({type:"string",format:"cuid2",check:"string_format",abort:!1,...ie(n)})}function tl(e,n){return new e({type:"string",format:"ulid",check:"string_format",abort:!1,...ie(n)})}function ol(e,n){return new e({type:"string",format:"xid",check:"string_format",abort:!1,...ie(n)})}function rl(e,n){return new e({type:"string",format:"ksuid",check:"string_format",abort:!1,...ie(n)})}function il(e,n){return new e({type:"string",format:"ipv4",check:"string_format",abort:!1,...ie(n)})}function sl(e,n){return new e({type:"string",format:"ipv6",check:"string_format",abort:!1,...ie(n)})}function al(e,n){return new e({type:"string",format:"cidrv4",check:"string_format",abort:!1,...ie(n)})}function cl(e,n){return new e({type:"string",format:"cidrv6",check:"string_format",abort:!1,...ie(n)})}function ll(e,n){return new e({type:"string",format:"base64",check:"string_format",abort:!1,...ie(n)})}function ul(e,n){return new e({type:"string",format:"base64url",check:"string_format",abort:!1,...ie(n)})}function dl(e,n){return new e({type:"string",format:"e164",check:"string_format",abort:!1,...ie(n)})}function pl(e,n){return new e({type:"string",format:"jwt",check:"string_format",abort:!1,...ie(n)})}function fl(e,n){return new e({type:"string",format:"datetime",check:"string_format",offset:!1,local:!1,precision:null,...ie(n)})}function ml(e,n){return new e({type:"string",format:"date",check:"string_format",...ie(n)})}function hl(e,n){return new e({type:"string",format:"time",check:"string_format",precision:null,...ie(n)})}function gl(e,n){return new e({type:"string",format:"duration",check:"string_format",...ie(n)})}function vl(e,n){return new e(Uc({type:"number",checks:[],...ie(n)}))}function bl(e,n){return new e({type:"number",check:"number_format",abort:!1,format:"safeint",...ie(n)})}function yl(e,n){return new e({type:"boolean",...ie(n)})}function wl(e,n){return new e({type:"null",...ie(n)})}function xl(e){return new e({type:"unknown"})}function _l(e,n){return new e({type:"never",...ie(n)})}function tr(e,n){return new ei({check:"less_than",...ie(n),value:e,inclusive:!1})}function co(e,n){return new ei({check:"less_than",...ie(n),value:e,inclusive:!0})}function or(e,n){return new ni({check:"greater_than",...ie(n),value:e,inclusive:!1})}function lo(e,n){return new ni({check:"greater_than",...ie(n),value:e,inclusive:!0})}function rr(e,n){return new ma({check:"multiple_of",...ie(n),value:e})}function ir(e,n){return new ga({check:"max_length",...ie(n),maximum:e})}function Ot(e,n){return new va({check:"min_length",...ie(n),minimum:e})}function sr(e,n){return new ba({check:"length_equals",...ie(n),length:e})}function pi(e,n){return new ya({check:"string_format",format:"regex",...ie(n),pattern:e})}function fi(e){return new wa({check:"string_format",format:"lowercase",...ie(e)})}function mi(e){return new xa({check:"string_format",format:"uppercase",...ie(e)})}function hi(e,n){return new _a({check:"string_format",format:"includes",...ie(n),includes:e})}function gi(e,n){return new Sa({check:"string_format",format:"starts_with",...ie(n),prefix:e})}function vi(e,n){return new ka({check:"string_format",format:"ends_with",...ie(n),suffix:e})}function it(e){return new Wa({check:"overwrite",tx:e})}function bi(e){return it(n=>n.normalize(e))}function yi(){return it(e=>e.trim())}function wi(){return it(e=>e.toLowerCase())}function xi(){return it(e=>e.toUpperCase())}function _i(){return it(e=>Dr(e))}function Sl(e,n,t){return new e({type:"array",element:n,...ie(t)})}function kl(e,n,t){return new e({type:"custom",check:"custom",fn:n,...ie(t)})}function Wl(e,n){let t=Pf(o=>(o.addIssue=i=>{if(typeof i=="string")o.issues.push(Tt(i,o.value,t._zod.def));else{let r=i;r.fatal&&(r.continue=!1),r.code??(r.code="custom"),"input"in r||(r.input=o.value),r.inst??(r.inst=t),r.continue??(r.continue=!t._zod.def.abort),o.issues.push(Tt(r))}},e(o.value,o)),n);return t}function Pf(e,n){let t=new en({check:"custom",...ie(n)});return t._zod.check=e,t}function uo(e,...n){for(let t of n)for(let o of Reflect.ownKeys(t))Object.prototype.propertyIsEnumerable.call(t,o)&&vn(e,o,t[o]);return e}function ki(e){let n=e?.target??"draft-2020-12";return n==="draft-4"&&(n="draft-04"),n==="draft-7"&&(n="draft-07"),{processors:e.processors??{},metadataRegistry:e?.metadata??gt,target:n,unrepresentable:e?.unrepresentable??"throw",override:e?.override??(()=>{}),io:e?.io??"output",counter:0,seen:new Map,sharedDefsExtractedFor:void 0,sharedEmitDoneFor:void 0,cycles:e?.cycles??"ref",reused:e?.reused??"inline",intersections:[],deferred:[],external:e?.external??void 0}}function jn(e,n,t,o,i){let r=typeof n.unrepresentable=="function"?n.unrepresentable({zodSchema:e,path:o.path,message:i}):n.unrepresentable;if(r==="any")return!1;if(r===void 0||r==="throw")throw new Error(i);return Object.assign(t,r),!0}function Be(e,n,t={path:[],schemaPath:[]}){var o;let i=e._zod.def,r=n.seen.get(e);if(r)return r.count++,t.schemaPath.includes(e)&&(r.cycle=t.path),r.schema;let s={schema:{},count:1,cycle:void 0,path:t.path};n.seen.set(e,s),n.sharedDefsExtractedFor=void 0,n.sharedEmitDoneFor=void 0;let a=e._zod.toJSONSchema?.();if(a)s.schema=a;else{let u={...t,schemaPath:[...t.schemaPath,e],path:t.path};if(e._zod.processJSONSchema)e._zod.processJSONSchema(n,s.schema,u);else{let m=s.schema,f=n.processors[i.type];if(!f)throw new Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);f(e,n,m,u)}let p=e._zod.parent;p&&(s.ref||(s.ref=p),Be(p,n,u),n.seen.get(p).isParent=!0)}let d=n.metadataRegistry.get(e);return d&&uo(s.schema,d),n.io==="input"&&sn(e)&&(delete s.schema.examples,delete s.schema.default),n.io==="input"&&"_prefault"in s.schema&&((o=s.schema).default??(o.default=s.schema._prefault)),delete s.schema._prefault,n.seen.get(e).schema}function zl(e){return e.replace(/~/g,"~0").replace(/\//g,"~1")}function Wi(e,n){let t=e.seen.get(n);if(!t)throw new Error("Unprocessed schema. This is a bug in Zod.");if(e.external&&e.sharedDefsExtractedFor===e.external)return;let o=new Map;for(let s of e.seen.entries()){let a=e.metadataRegistry.get(s[0])?.id;if(a){let d=o.get(a);if(d&&d!==s[0])throw new Error(`Duplicate schema id "${a}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);o.set(a,s[0])}}let i=s=>{let a=e.target==="draft-2020-12"?"$defs":"definitions";if(e.external){let p=e.external.registry.get(s[0])?.id,m=e.external.uri??(b=>b);if(p)return{ref:m(p)};let f=s[1].defId??s[1].schema.id??`schema${e.counter++}`;return s[1].defId=f,{defId:f,ref:`${m("__shared")}#/${a}/${zl(f)}`}}let d="#",l=`${d}/${a}/`;if(s[1]===t&&!s[1].schema.id)return{ref:d};let u=s[1].schema.id??`__schema${e.counter++}`;return{defId:u,ref:l+zl(u)}},r=s=>{if(s[1].schema.$ref)return;let a=s[1],{ref:d,defId:l}=i(s);a.def={...a.schema},l&&(a.defId=l);let u=a.schema;for(let p in u)delete u[p];u.$ref=d};if(e.cycles==="throw")for(let s of e.seen.entries()){let a=s[1];if(a.cycle)throw new Error(`Cycle detected: #/${a.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`)}for(let s of e.seen.entries()){let a=s[1];if(n===s[0]){r(s);continue}if(e.external){let l=e.external.registry.get(s[0])?.id;if(n!==s[0]&&l){r(s);continue}}if(e.metadataRegistry.get(s[0])?.id){r(s);continue}if(a.cycle){r(s);continue}a.count>1&&e.reused==="ref"&&r(s)}e.external&&(e.sharedDefsExtractedFor=e.external)}function Il(e){let n=e.anyOf;if(!Array.isArray(n)||n.length===0||e.type!==void 0)return;let t=[];for(let o of n){if(!o||typeof o!="object")return;Il(o);let i=Object.keys(o);if(i.length!==1||i[0]!=="type")return;let r=o.type;for(let s of Array.isArray(r)?r:[r]){if(typeof s!="string")return;t.includes(s)||t.push(s)}}delete e.anyOf,e.type=t.length===1?t[0]:t}var Nl=new Set(["type","properties","required","additionalProperties"]),Cl=["oneOf","anyOf"];function Pl(e){let n=e.additionalProperties;return n===void 0||n===!1||typeof n!="object"||n===null?null:Object.keys(n).length?n:null}function Si(e){let n=[];for(let r of e){if(typeof r!="object"||r.type!=="object")return null;for(let s in r)if(!Nl.has(s))return null;n.push(r)}let t={},o=new Set;for(let r of n){for(let s in r.properties){if(Object.prototype.hasOwnProperty.call(t,s))continue;let a=[];for(let l of n){let u=l.properties?.[s]??Pl(l);u!=null&&(a.some(p=>JSON.stringify(p)===JSON.stringify(u))||a.push(u))}let d=a.length===1?a[0]:Si(a)??{allOf:a};vn(t,s,d)}for(let s of r.required??[])o.add(s)}let i={type:"object",properties:t};if(o.size&&(i.required=[...o]),n.every(r=>r.additionalProperties===!1))i.additionalProperties=!1;else{let r=[];for(let s of n){let a=Pl(s);a&&!r.some(d=>JSON.stringify(d)===JSON.stringify(a))&&r.push(a)}r.length===1?i.additionalProperties=r[0]:r.length>1&&(i.additionalProperties={allOf:r})}return i}function If(e){let n=e.allOf;if(!Array.isArray(n)||n.length<2)return;for(let i of Nl)if(i in e)return;let t=n.filter(i=>Cl.some(r=>Array.isArray(i[r]))),o=null;if(!t.length)o=Si(n);else{let i=t[0],r=Cl.find(d=>Array.isArray(i[d]));if(Object.keys(i).length!==1)return;let s=n.filter(d=>d!==i),a=i[r].map(d=>Si([...s,d]));if(a.some(d=>!d))return;o={[r]:a}}o&&(delete e.allOf,uo(e,o))}function zi(e,n){let t=e.seen.get(n);if(!t)throw new Error("Unprocessed schema. This is a bug in Zod.");let o=a=>{let d=e.seen.get(a);if(d.ref===null)return;let l=d.def??d.schema,u={...l},p=d.ref;if(d.ref=null,p){o(p);let f=e.seen.get(p),b=f.schema;if(b.$ref&&(e.target==="draft-07"||e.target==="draft-04"||e.target==="openapi-3.0")?(l.allOf=l.allOf??[],l.allOf.push(b)):uo(l,b),uo(l,u),a._zod.parent===p)for(let w in l)w==="$ref"||w==="allOf"||w in u||delete l[w];if(b.$ref&&f.def)for(let w in l)w==="$ref"||w==="allOf"||w in f.def&&JSON.stringify(l[w])===JSON.stringify(f.def[w])&&delete l[w]}let m=a._zod.parent;if(m&&m!==p){o(m);let f=e.seen.get(m);if(f?.schema.$ref&&(l.$ref=f.schema.$ref,f.def))for(let b in l)b==="$ref"||b==="allOf"||b in f.def&&JSON.stringify(l[b])===JSON.stringify(f.def[b])&&delete l[b]}e.override({zodSchema:a,jsonSchema:l,path:d.path??[]})};if(!e.external||e.sharedEmitDoneFor!==e.external){for(let a of[...e.seen.entries()].reverse())o(a[0]);if(e.target!=="openapi-3.0")for(let a of e.seen.entries())Il(a[1].def??a[1].schema);for(let a of e.deferred)a();if(e.intersections.length){let a=new Map;for(let d of e.seen.values())for(let l of[d.schema,d.def]){let u=l?.allOf;if(!Array.isArray(u))continue;let p=a.get(u);p?p.push(l):a.set(u,[l])}for(let d of e.intersections)for(let l of a.get(d)??[])If(l)}}let i={};if(e.target==="draft-2020-12"?i.$schema="https://json-schema.org/draft/2020-12/schema":e.target==="draft-07"?i.$schema="http://json-schema.org/draft-07/schema#":e.target==="draft-04"?i.$schema="http://json-schema.org/draft-04/schema#":e.target,e.external?.uri){let a=e.external.registry.get(n)?.id;if(!a)throw new Error("Schema is missing an `id` property");i.$id=e.external.uri(a)}uo(i,t.defId?t.schema:t.def??t.schema);let r=e.metadataRegistry.get(n)?.id;r!==void 0&&i.id===r&&delete i.id;let s=e.external?.defs??{};if(!e.external||e.sharedEmitDoneFor!==e.external)for(let a of e.seen.entries()){let d=a[1];d.def&&d.defId&&(d.def.id===d.defId&&delete d.def.id,vn(s,d.defId,d.def))}e.external&&(e.sharedEmitDoneFor=e.external),e.external||Object.keys(s).length>0&&(e.target==="draft-2020-12"?i.$defs=s:i.definitions=s);try{let a=JSON.parse(JSON.stringify(i));return Object.defineProperty(a,"~standard",{value:{...n["~standard"],jsonSchema:{input:po(n,"input",e.processors),output:po(n,"output",e.processors)}},enumerable:!1,writable:!1}),a}catch{throw new Error("Error converting schema to JSON.")}}function sn(e,n){let t=n??{seen:new Set};if(t.seen.has(e))return!1;t.seen.add(e);let o=e._zod.def;if(o.type==="transform")return!0;if(o.type==="array")return sn(o.element,t);if(o.type==="set")return sn(o.valueType,t);if(o.type==="lazy")return sn(o.getter(),t);if(o.type==="promise"||o.type==="optional"||o.type==="nonoptional"||o.type==="nullable"||o.type==="readonly"||o.type==="default"||o.type==="prefault"||o.type==="catch")return sn(o.innerType,t);if(o.type==="intersection")return sn(o.left,t)||sn(o.right,t);if(o.type==="record"||o.type==="map")return sn(o.keyType,t)||sn(o.valueType,t);if(o.type==="pipe")return e._zod.traits.has("$ZodCodec")?!0:sn(o.in,t)||sn(o.out,t);if(o.type==="object"){for(let i in o.shape)if(sn(o.shape[i],t))return!0;return!1}if(o.type==="union"){for(let i of o.options)if(sn(i,t))return!0;return!1}if(o.type==="tuple"){for(let i of o.items)if(sn(i,t))return!0;return!!(o.rest&&sn(o.rest,t))}return!1}var Al=(e,n={})=>t=>{let o=ki({...t,processors:n});return Be(e,o),Wi(o,e),zi(o,e)},po=(e,n,t={})=>o=>{let{libraryOptions:i,target:r}=o??{},s=ki({...i??{},target:r,io:n,processors:t});return Be(e,s),Wi(s,e),zi(s,e)};var Rt=(e,n,t)=>{(e[n]===void 0||t>e[n])&&(e[n]=t)},Yt=(e,n,t)=>{(e[n]===void 0||t<e[n])&&(e[n]=t)},El=(e,n)=>{Rt(e,"minimum",n),Yt(e,"maximum",n)},Rl=(e,n)=>{e.multipleOf??(e.multipleOf=[]),e.multipleOf.includes(n)||e.multipleOf.push(n)},Yl=(e,n)=>{e.patterns??(e.patterns=new Set),e.patterns.add(n)},Dl=(e,n)=>{e.mime=e.mime?e.mime.filter(t=>n.includes(t)):[...n]},Ml=(e,n)=>{e.format=n,n.includes("int")&&(e.isInt=!0)},Tl=(e,n)=>Rt(e,"minimum",n.minimum),$l=(e,n)=>Yt(e,"maximum",n.maximum),Ol=e=>(n,t)=>{Ml(n,t.format);let[o,i]=e[t.format];Rt(n,"minimum",o),Yt(n,"maximum",i)},Nf={greater_than:(e,n)=>Rt(e,n.inclusive?"minimum":"exclusiveMinimum",n.value),less_than:(e,n)=>Yt(e,n.inclusive?"maximum":"exclusiveMaximum",n.value),multiple_of:(e,n)=>Rl(e,n.value),number_format:Ol(Qt),bigint_format:Ol(Ro),min_length:Tl,max_length:$l,length_equals:(e,n)=>El(e,n.length),min_size:Tl,max_size:$l,size_equals:(e,n)=>El(e,n.size),string_format:(e,n)=>{Ml(e,n.format),n.pattern&&Yl(e,n.pattern),(n.format==="base64"||n.format==="base64url")&&(e.contentEncoding=n.format),(n.local||n.precision===-1)&&(e.laxFormat=!0)},mime_type:(e,n)=>Dl(e,n.mime)};function Pn(e){let n={},t=e._zod.def,o=e._zod.traits.has("$ZodCheck")?[e,...t.checks??[]]:t.checks??[];for(let r of o)Nf[r._zod.def.check]?.(n,r._zod.def);let i=e._zod.bag;i.minimum!==void 0&&Rt(n,"minimum",i.minimum),i.exclusiveMinimum!==void 0&&Rt(n,"exclusiveMinimum",i.exclusiveMinimum),i.maximum!==void 0&&Yt(n,"maximum",i.maximum),i.exclusiveMaximum!==void 0&&Yt(n,"exclusiveMaximum",i.exclusiveMaximum),i.multipleOf!==void 0&&Rl(n,i.multipleOf),i.format!==void 0&&(n.format??(n.format=i.format),i.format.includes("int")&&(n.isInt=!0)),i.mime&&Dl(n,i.mime);for(let r of i.patterns??[])Yl(n,r);return n}var Af={guid:"uuid",url:"uri",datetime:"date-time",json_string:"json-string",regex:""},Ef=new Map([[ri,na],[Ko,ta]]),Zl=e=>Ef.get(e)??e,Bl=(e,n,t,o)=>{let i=t;i.type="string";let{minimum:r,maximum:s,format:a,patterns:d,contentEncoding:l,laxFormat:u}=Pn(e);if(typeof r=="number"&&(i.minLength=r),typeof s=="number"&&(i.maxLength=s),a&&(i.format=Af[a]??a,i.format===""&&delete i.format,(a==="time"||u)&&delete i.format),l&&(i.contentEncoding=l),d&&d.size>0){let p=[...d].map(Zl);p.length===1?i.pattern=p[0].source:p.length>1&&(i.allOf=[...p.map(m=>({...n.target==="draft-07"||n.target==="draft-04"||n.target==="openapi-3.0"?{type:"string"}:{},pattern:m.source}))])}},Fl=(e,n,t,o)=>{let i=t,{minimum:r,maximum:s,multipleOf:a,exclusiveMaximum:d,exclusiveMinimum:l,isInt:u}=Pn(e);i.type=u?"integer":"number";let p=typeof l=="number"&&l>=(r??Number.NEGATIVE_INFINITY),m=typeof d=="number"&&d<=(s??Number.POSITIVE_INFINITY),f=n.target==="draft-04"||n.target==="openapi-3.0";if(p?f?(i.minimum=l,i.exclusiveMinimum=!0):i.exclusiveMinimum=l:typeof r=="number"&&(i.minimum=r),m?f?(i.maximum=d,i.exclusiveMaximum=!0):i.exclusiveMaximum=d:typeof s=="number"&&(i.maximum=s),a){let b=new Set;for(let k of a)Number.isFinite(k)&&k!==0?b.add(Math.abs(k)):jn(e,n,i,o,`A multipleOf divisor of ${k} cannot be represented in JSON Schema`);let[v,...w]=b;v!==void 0&&(i.multipleOf=v),w.length&&(i.allOf=[...i.allOf??[],...w.map(k=>({multipleOf:k}))])}},Ul=(e,n,t,o)=>{t.type="boolean"};var Vl=(e,n,t,o)=>{n.target==="openapi-3.0"?(t.type="string",t.nullable=!0,t.enum=[null]):t.type="null"};var Ll=(e,n,t,o)=>{t.not={}};var Hl=(e,n,t,o)=>{};var ql=(e,n,t,o)=>{let i=e._zod.def,r=It(i.entries);if(r.length===0){t.not={};return}r.every(s=>typeof s=="number")&&(t.type="number"),r.every(s=>typeof s=="string")&&(t.type="string"),t.enum=r},Gl=(e,n,t,o)=>{let i=e._zod.def;if(i.values.length===0){t.not={};return}let r=[];for(let s of i.values)if(s===void 0){if(jn(e,n,t,o,"Literal `undefined` cannot be represented in JSON Schema"))return}else if(typeof s=="bigint"){if(jn(e,n,t,o,"BigInt literals cannot be represented in JSON Schema"))return;r.push(Number(s))}else r.push(s);if(r.length!==0)if(r.length===1){let s=r[0];t.type=s===null?"null":typeof s,n.target==="draft-04"||n.target==="openapi-3.0"?t.enum=[s]:t.const=s}else r.every(s=>typeof s=="number")&&(t.type="number"),r.every(s=>typeof s=="string")&&(t.type="string"),r.every(s=>typeof s=="boolean")&&(t.type="boolean"),r.every(s=>s===null)&&(t.type="null"),t.enum=r};var jl=(e,n,t,o)=>{jn(e,n,t,o,"Custom types cannot be represented in JSON Schema")};var Xl=(e,n,t,o)=>{jn(e,n,t,o,"Transforms cannot be represented in JSON Schema")};var Kl=(e,n,t,o)=>{let i=t,r=e._zod.def,{minimum:s,maximum:a}=Pn(e);typeof s=="number"&&(i.minItems=s),typeof a=="number"&&(i.maxItems=a),i.type="array",i.items=Be(r.element,n,{...o,path:[...o.path,"items"]})};function ar(e){let n=e._zod.def;return n.type==="pipe"&&n.in._zod.traits.has("$ZodTransform")?ar(n.out):n.type==="catch"?ar(n.innerType):e._zod.optin}var Jl=(e,n,t,o)=>{let i=t,r=e._zod.def,s=r.shape;if(Object.getOwnPropertySymbols(s).length&&jn(e,n,i,o,"Symbol keys cannot be represented in JSON Schema"))return;i.type="object",i.properties={};for(let l in s)vn(i.properties,l,Be(s[l],n,{...o,path:[...o.path,"properties",l]}));let d=[];for(let l of Object.keys(s)){let u=r.shape[l];(n.io==="input"?ar(u)===void 0:u._zod.optout===void 0)&&d.push(l)}d.length>0&&(i.required=d),r.catchall?._zod.def.type==="never"?i.additionalProperties=!1:r.catchall?r.catchall&&(i.additionalProperties=Be(r.catchall,n,{...o,path:[...o.path,"additionalProperties"]})):n.io==="output"&&(i.additionalProperties=!1)},Ql=(e,n,t,o)=>{let i=e._zod.def,r=i.inclusive===!1,s=i.options.map((a,d)=>Be(a,n,{...o,path:[...o.path,r?"oneOf":"anyOf",d]}));r?t.oneOf=s:t.anyOf=s},eu=(e,n,t,o)=>{let i=e._zod.def,r=Be(i.left,n,{...o,path:[...o.path,"allOf",0]}),s=Be(i.right,n,{...o,path:[...o.path,"allOf",1]}),a=l=>"allOf"in l&&Object.keys(l).length===1,d=[...a(r)?r.allOf:[r],...a(s)?s.allOf:[s]];t.allOf=d,n.intersections.push(d)};function Ci(e,n,t){if(n.$ref){if(t.has(n))return n;t.add(n);let b=e.get(n)?.def;if(!b)return n;let v=Ci(e,b,t);return v===b?n:v}for(let b of["anyOf","oneOf"]){let v=n[b];if(!Array.isArray(v))continue;let w=v.map(k=>Ci(e,k,t));w.some((k,P)=>k!==v[P])&&(n={...n,[b]:w})}let o=Array.isArray(n.type)?n.type:[n.type],i=!o.includes("string")&&o.some(b=>b==="number"||b==="integer"),r=n.enum??(n.const!==void 0?[n.const]:void 0);if(!i&&!r?.some(b=>typeof b=="number"))return n;let{minimum:s,maximum:a,exclusiveMinimum:d,exclusiveMaximum:l,multipleOf:u,format:p,id:m,...f}=n;return f.enum?f.enum=f.enum.map(b=>typeof b=="number"?String(b):b):typeof f.const=="number"&&(f.const=String(f.const)),i&&(f.type="string",r||(f.pattern=(o.includes("number")?oo:Jr).source)),f}var Pi=new WeakMap;function Tf(e){let n=new Map;for(let o of e.seen.values())o.def&&!n.has(o.schema)&&n.set(o.schema,o);let t=new Map;for(let o of Pi.get(e)??[]){let i=e.seen.get(o),r=(i?.def??i?.schema)?.propertyNames;if(!r||r===!0||t.has(r))continue;let s=Ci(n,r,new Set);s!==r&&t.set(r,s)}if(t.size)for(let o of e.seen.values())for(let i of[o.schema,o.def]){let r=i&&t.get(i.propertyNames);r&&(i.propertyNames=r)}}var nu=(e,n,t,o)=>{let i=t,r=e._zod.def;i.type="object";let s=r.keyType,a=Pn(s).patterns;if(r.mode==="loose"&&a&&a.size>0){let u=Be(r.valueType,n,{...o,path:[...o.path,"patternProperties","*"]});i.patternProperties={};for(let p of a)vn(i.patternProperties,Zl(p).source,u)}else{if(n.target==="draft-07"||n.target==="draft-2020-12"){i.propertyNames=Be(r.keyType,n,{...o,path:[...o.path,"propertyNames"]});let u=Pi.get(n);u||(u=[],Pi.set(n,u),n.deferred.push(()=>Tf(n))),u.push(e)}i.additionalProperties=Be(r.valueType,n,{...o,path:[...o.path,"additionalProperties"]})}let d=s._zod.values,l=n.io==="input"&&ar(r.valueType)!==void 0;if(d&&!r.partial&&!l){let u=[...d].filter(p=>typeof p=="string"||typeof p=="number");u.length>0&&(i.required=u.map(String))}},tu=(e,n,t,o)=>{let i=e._zod.def,r=Be(i.innerType,n,o),s=n.seen.get(e);n.target==="openapi-3.0"?(s.ref=i.innerType,t.nullable=!0):t.anyOf=[r,{type:"null"}]},ou=(e,n,t,o)=>{let i=e._zod.def;Be(i.innerType,n,o);let r=n.seen.get(e);r.ref=i.innerType},Ii=Symbol();function ru(e,n,t,o,i){let r=!1,s=JSON.stringify(e,(a,d)=>typeof d!="bigint"?d:(r=!0,null));return r?(jn(n,t,o,i,"BigInt defaults cannot be represented in JSON Schema"),Ii):JSON.parse(s)}var iu=(e,n,t,o)=>{let i=e._zod.def;Be(i.innerType,n,o);let r=n.seen.get(e);r.ref=i.innerType;let s=ru(i.defaultValue,e,n,t,o);s!==Ii&&(t.default=s)},su=(e,n,t,o)=>{let i=e._zod.def;Be(i.innerType,n,o);let r=n.seen.get(e);if(r.ref=i.innerType,n.io!=="input")return;let s=ru(i.defaultValue,e,n,t,o);s!==Ii&&(t._prefault=s)},au=(e,n,t,o)=>{let i=e._zod.def;Be(i.innerType,n,o);let r=n.seen.get(e);r.ref=i.innerType;let s;try{s=i.catchValue(void 0)}catch{jn(e,n,t,o,"Dynamic catch values are not supported in JSON Schema");return}t.default=s},cu=(e,n,t,o)=>{let i=e._zod.def,r=i.in._zod.traits.has("$ZodTransform"),s=n.io==="input"?r?i.out:i.in:i.out;Be(s,n,o);let a=n.seen.get(e);a.ref=s},lu=(e,n,t,o)=>{let i=e._zod.def;Be(i.innerType,n,o);let r=n.seen.get(e);r.ref=i.innerType,t.readOnly=!0};var Ni=(e,n,t,o)=>{let i=e._zod.def;Be(i.innerType,n,o);let r=n.seen.get(e);r.ref=i.innerType},uu=(e,n,t,o)=>{let i=e._zod.innerType;Be(i,n,o);let r=n.seen.get(e);r.ref=i};var du=new WeakSet([Object.prototype,Error.prototype]);function cr(e,n,t){Object.defineProperty(e,n,{configurable:!0,enumerable:!1,get(){let o=t(this);return Object.defineProperty(this,n,{value:o,configurable:!0,writable:!0}),o},set(o){Object.defineProperty(this,n,{value:o,configurable:!0,writable:!0})}})}var Bf=(e,n)=>{Ps.init(e,n),e.name="ZodError";let t=Object.getPrototypeOf(e);du.has(t)||(du.add(t),cr(t,"format",o=>i=>Ns(o,i)),cr(t,"flatten",o=>i=>Is(o,i)),cr(t,"addIssue",o=>i=>{o.issues.push(i),o.message=JSON.stringify(o.issues,Nt,2)}),cr(t,"addIssues",o=>i=>{o.issues.push(...i),o.message=JSON.stringify(o.issues,Nt,2)}),Object.defineProperty(t,"isEmpty",{configurable:!0,enumerable:!1,get(){return this.issues.length===0}}))};var yn=O("ZodError",Bf,void 0,{Parent:Error});var pu=Bo(yn),fu=Fo(yn),mu=Uo(yn),hu=Vo(yn),gu=Es(yn),vu=Ts(yn),bu=$s(yn),yu=Os(yn),wu=Rs(yn),xu=Ys(yn),_u=Ds(yn),Su=Ms(yn);function Uf(){dn.localeError||bn(Bc())}function ur(){dn.memoizer||bn({memoizer:Zc()})}var Ee=O("ZodType",(e,n)=>(Uf(),Ce.init(e,n),e.def=n,e.type=n.type,e),{check(...e){let n=this.def;return this.clone(ce.mergeDefs(n,{checks:[...n.checks??[],...e.map(t=>typeof t=="function"?{_zod:{check:t,def:{check:"custom"},onattach:[]}}:t)]}),{parent:!0})},with(...e){return this.check(...e)},clone(e,n){return Rn(this,e,n)},brand(){return this},register(e,n){return e.add(this,n),this},refine(e,n){return this.check(Bm(e,n))},superRefine(e,n){return this.check(Fm(e,n))},overwrite(e){return this.check(it(e))},optional(){return Cu(this)},exactOptional(){return zm(this)},nullable(){return Pu(this)},nullish(){return Cu(Pu(this))},nonoptional(e){return Em(this,e)},array(){return Pe(this)},or(e){return Dt([this,e])},and(e){return _m(this,e)},transform(e){return Iu(this,Wm(e))},default(e){return Im(this,e)},prefault(e){return Am(this,e)},catch(e){return $m(this,e)},pipe(e){return Iu(this,e)},readonly(){return Ym(this)},describe(e){let n=this.clone();return gt.add(n,{description:e}),n},meta(...e){if(e.length===0)return gt.get(this);let n=this.clone();return gt.add(n,e[0]),n},isOptional(){return this.safeParse(void 0).success},isNullable(){return this.safeParse(null).success},apply(e,...n){return n.length===0?e(this):e(this,...n)},get"~standard"(){return ce.hide(this,"~standard",{...oi(this),jsonSchema:{input:po(this,"input"),output:po(this,"output")}})},set"~standard"(e){ce.own(this,"~standard",e)},parse:function e(n,t){return pu(this,n,t,{callee:e})},parseAsync:async function e(n,t){return await fu(this,n,t,{callee:e})},safeParse(e,n){return mu(this,e,n)},async safeParseAsync(e,n){return hu(this,e,n)},get spa(){return this?.safeParseAsync},set spa(e){ce.own(this,"spa",e)},validate(e,n){return Gr(this,e,n)},validateAsync(e,n){return jr(this,e,n)},encode:function e(n,t){return gu(this,n,t,{callee:e})},decode:function e(n,t){return vu(this,n,t,{callee:e})},encodeAsync:async function e(n,t){return await bu(this,n,t,{callee:e})},decodeAsync:async function e(n,t){return await yu(this,n,t,{callee:e})},safeEncode(e,n){return wu(this,e,n)},safeDecode(e,n){return xu(this,e,n)},async safeEncodeAsync(e,n){return _u(this,e,n)},async safeDecodeAsync(e,n){return Su(this,e,n)},toJSONSchema(e){return Al(this,{})(e)},get description(){return gt.get(this)?.description},get _def(){return this._zod.def}}),Nu=O("_ZodString",(e,n)=>{Xo.init(e,n),Ee.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Bl(e,t,o,i)},ce.derived({format:e=>Pn(e).format??null,minLength:e=>Pn(e).minimum??null,maxLength:e=>Pn(e).maximum??null},{regex(...e){return this.check(pi(...e))},includes(...e){return this.check(hi(...e))},startsWith(...e){return this.check(gi(...e))},endsWith(...e){return this.check(vi(...e))},min(...e){return this.check(Ot(...e))},max(...e){return this.check(ir(...e))},length(...e){return this.check(sr(...e))},nonempty(...e){return this.check(Ot(1,...e))},lowercase(e){return this.check(fi(e))},uppercase(e){return this.check(mi(e))},trim(){return this.check(yi())},normalize(...e){return this.check(bi(...e))},toLowerCase(){return this.check(wi())},toUpperCase(){return this.check(xi())},slugify(){return this.check(_i())}})),Vf=O("ZodString",(e,n)=>{Xo.init(e,n),Nu.init(e,n)},{email(e){return this.check(Lc(jf,e))},url(e){return this.check(Kc(Kf,e))},jwt(e){return this.check(pl(pm,e))},emoji(e){return this.check(Jc(Jf,e))},guid(e){return this.check(Hc(Xf,e))},uuid(e){return this.check(qc(lr,e))},uuidv4(e){return this.check(Gc(lr,e))},uuidv6(e){return this.check(jc(lr,e))},uuidv7(e){return this.check(Xc(lr,e))},nanoid(e){return this.check(Qc(Qf,e))},cuid(e){return this.check(el(em,e))},cuid2(e){return this.check(nl(nm,e))},ulid(e){return this.check(tl(tm,e))},base64(e){return this.check(ll(lm,e))},base64url(e){return this.check(ul(um,e))},xid(e){return this.check(ol(om,e))},ksuid(e){return this.check(rl(rm,e))},ipv4(e){return this.check(il(im,e))},ipv6(e){return this.check(sl(sm,e))},cidrv4(e){return this.check(al(am,e))},cidrv6(e){return this.check(cl(cm,e))},e164(e){return this.check(dl(dm,e))},datetime(e){return this.check(fl(Lf,e))},date(e){return this.check(ml(Hf,e))},time(e){return this.check(hl(qf,e))},duration(e){return this.check(gl(Gf,e))}});function ne(e){return Vc(Vf,e)}var De=O("ZodStringFormat",(e,n)=>{Ae.init(e,n),Nu.init(e,n)}),Lf=O("ZodISODateTime",(e,n)=>{Ja.init(e,n),De.init(e,n)}),Hf=O("ZodISODate",(e,n)=>{Qa.init(e,n),De.init(e,n)}),qf=O("ZodISOTime",(e,n)=>{ec.init(e,n),De.init(e,n)}),Gf=O("ZodISODuration",(e,n)=>{nc.init(e,n),De.init(e,n)}),jf=O("ZodEmail",(e,n)=>{Ba.init(e,n),De.init(e,n)});var Xf=O("ZodGUID",(e,n)=>{Ma.init(e,n),De.init(e,n)});var lr=O("ZodUUID",(e,n)=>{Za.init(e,n),De.init(e,n)});var Kf=O("ZodURL",(e,n)=>{Va.init(e,n),De.init(e,n)});var Jf=O("ZodEmoji",(e,n)=>{La.init(e,n),De.init(e,n)});var Qf=O("ZodNanoID",(e,n)=>{Ha.init(e,n),De.init(e,n)});var em=O("ZodCUID",(e,n)=>{qa.init(e,n),De.init(e,n)});var nm=O("ZodCUID2",(e,n)=>{Ga.init(e,n),De.init(e,n)});var tm=O("ZodULID",(e,n)=>{ja.init(e,n),De.init(e,n)});var om=O("ZodXID",(e,n)=>{Xa.init(e,n),De.init(e,n)});var rm=O("ZodKSUID",(e,n)=>{Ka.init(e,n),De.init(e,n)});var im=O("ZodIPv4",(e,n)=>{tc.init(e,n),De.init(e,n)});var sm=O("ZodIPv6",(e,n)=>{rc.init(e,n),De.init(e,n)});var am=O("ZodCIDRv4",(e,n)=>{ic.init(e,n),De.init(e,n)});var cm=O("ZodCIDRv6",(e,n)=>{sc.init(e,n),De.init(e,n)});var lm=O("ZodBase64",(e,n)=>{cc.init(e,n),De.init(e,n)});var um=O("ZodBase64URL",(e,n)=>{lc.init(e,n),De.init(e,n)});var dm=O("ZodE164",(e,n)=>{uc.init(e,n),De.init(e,n)});var pm=O("ZodJWT",(e,n)=>{dc.init(e,n),De.init(e,n)});var Au=O("ZodNumber",(e,n)=>{ii.init(e,n),Ee.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Fl(e,t,o,i),e.isFinite=!0},ce.derived({minValue:e=>{let{minimum:n,exclusiveMinimum:t}=Pn(e);return Math.max(n??Number.NEGATIVE_INFINITY,t??Number.NEGATIVE_INFINITY)},maxValue:e=>{let{maximum:n,exclusiveMaximum:t}=Pn(e);return Math.min(n??Number.POSITIVE_INFINITY,t??Number.POSITIVE_INFINITY)},isInt:e=>{let{isInt:n,multipleOf:t}=Pn(e);return!!n||!!t?.some(Number.isSafeInteger)},format:e=>Pn(e).format??null},{gt(e,n){return this.check(or(e,n))},gte(e,n){return this.check(lo(e,n))},min(e,n){return this.check(lo(e,n))},lt(e,n){return this.check(tr(e,n))},lte(e,n){return this.check(co(e,n))},max(e,n){return this.check(co(e,n))},int(e){return this.check(ku(e))},safe(e){return this.check(ku(e))},positive(e){return this.check(or(0,e))},nonnegative(e){return this.check(lo(0,e))},negative(e){return this.check(tr(0,e))},nonpositive(e){return this.check(co(0,e))},multipleOf(e,n){return this.check(rr(e,n))},step(e,n){return this.check(rr(e,n))},finite(){return this}}));function pn(e){return vl(Au,e)}var fm=O("ZodNumberFormat",(e,n)=>{pc.init(e,n),Au.init(e,n)});function ku(e){return bl(fm,e)}var mm=O("ZodBoolean",(e,n)=>{fc.init(e,n),Ee.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Ul(e,t,o,i)});function be(e){return yl(mm,e)}var hm=O("ZodNull",(e,n)=>{mc.init(e,n),Ee.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Vl(e,t,o,i)});function fo(e){return wl(hm,e)}var gm=O("ZodUnknown",(e,n)=>{hc.init(e,n),Ee.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Hl(e,t,o,i)});function Wu(){return xl(gm)}var vm=O("ZodNever",(e,n)=>{gc.init(e,n),Ee.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Ll(e,t,o,i)});function Eu(e){return _l(vm,e)}var bm=O("ZodArray",(e,n)=>{ur(),vc.init(e,n),Ee.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Kl(e,t,o,i),e.element=n.element},{min(e,n){return this.check(Ot(e,n))},nonempty(e){return this.check(Ot(1,e))},max(e,n){return this.check(ir(e,n))},length(e,n){return this.check(sr(e,n))},unwrap(){return this.element}});function Pe(e,n){return Sl(bm,e,n)}var ym=O("ZodObject",(e,n)=>{ur(),wc.init(e,n),Ee.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Jl(e,t,o,i),ce.installLazyProp(e,"shape",t=>t._zod.def.shape,!1)},{keyof(){return ue(Object.keys(this._zod.def.shape))},catchall(e){return this.clone(ce.mergeDefs(this._zod.def,{catchall:e}))},passthrough(){return this.clone(ce.mergeDefs(this._zod.def,{catchall:Wu()}))},loose(){return this.clone(ce.mergeDefs(this._zod.def,{catchall:Wu()}))},strict(){return this.clone(ce.mergeDefs(this._zod.def,{catchall:Eu()}))},strip(){return this.clone(ce.mergeDefs(this._zod.def,{catchall:void 0}))},extend(e){return ce.extend(this,e)},safeExtend(e){return ce.safeExtend(this,e)},merge(e){return ce.merge(this,e)},pick(e){return ce.pick(this,e)},omit(e){return ce.omit(this,e)},partial(...e){return ce.partial($u,this,e[0])},exactPartial(...e){return ce.partial(Ou,this,e[0],"exactPartial")},required(...e){return ce.required(Ru,this,e[0])}});function j(e,n){return new ym({type:"object",shape:e,catchall:Eu(),...ce.normalizeParams(n)})}var Tu=O("ZodUnion",(e,n)=>{si.init(e,n),Ee.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Ql(e,t,o,i),e.options=n.options});function Dt(e,n){return new Tu({type:"union",options:e,...ce.normalizeParams(n)})}var wm=O("ZodDiscriminatedUnion",(e,n)=>{Tu.init(e,n),xc.init(e,n)});function mo(e,n,t){return new wm({type:"union",options:n,discriminator:e,...ce.normalizeParams(t)})}var xm=O("ZodIntersection",(e,n)=>{_c.init(e,n),Ee.init(e,n),e._zod.processJSONSchema=(t,o,i)=>eu(e,t,o,i)});function _m(e,n){return new xm({type:"intersection",left:e,right:n})}var zu=O("ZodRecord",(e,n)=>{ur(),Sc.init(e,n),Ee.init(e,n),e._zod.processJSONSchema=(t,o,i)=>nu(e,t,o,i),e.keyType=n.keyType,e.valueType=n.valueType});function Ti(e,n,t){return!n||!n._zod?new zu({type:"record",keyType:ne(),valueType:e,...ce.normalizeParams(n)}):new zu({type:"record",keyType:e,valueType:n,...ce.normalizeParams(t)})}var Ei=O("ZodEnum",(e,n)=>{kc.init(e,n),Ee.init(e,n),e._zod.processJSONSchema=(o,i,r)=>ql(e,o,i,r),e.enum=n.entries,e.options=[...e._zod.values];let t=new Set(Object.keys(n.entries));e.extract=(o,i)=>{let r={};for(let s of o)if(t.has(s))r[s]=n.entries[s];else throw new Error(`Key ${s} not found in enum`);return new Ei({...n,checks:[],...ce.normalizeParams(i),entries:r})},e.exclude=(o,i)=>{let r={...n.entries};for(let s of o)if(t.has(s))delete r[s];else throw new Error(`Key ${s} not found in enum`);return new Ei({...n,checks:[],...ce.normalizeParams(i),entries:r})}});function ue(e,n){let t=Array.isArray(e)?Object.fromEntries(e.map(o=>[o,o])):e;return new Ei({type:"enum",entries:t,...ce.normalizeParams(n)})}var Sm=O("ZodLiteral",(e,n)=>{Wc.init(e,n),Ee.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Gl(e,t,o,i),e.values=new Set(n.values),Object.defineProperty(e,"value",{get(){if(n.values.length>1)throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");return n.values[0]}})});function we(e,n){return new Sm({type:"literal",values:Array.isArray(e)?e:[e],...ce.normalizeParams(n)})}var km=O("ZodTransform",(e,n)=>{ur(),zc.init(e,n),Ee.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Xl(e,t,o,i),e._zod.parse=(t,o)=>{if(o.direction==="backward")throw new $t(e.constructor.name);t.addIssue=r=>{if(typeof r=="string")t.issues.push(ce.issue(r,t.value,n));else{let s=r;s.fatal&&(s.continue=!1),s.code??(s.code="custom"),"input"in s||(s.input=t.value),s.inst??(s.inst=e),t.issues.push(ce.issue(s))}};let i=n.transform(t.value,t);return i instanceof Promise?i.then(r=>(t.value=r,t)):(t.value=i,t)}});function Wm(e){return new km({type:"transform",transform:e})}var $u=O("ZodOptional",(e,n)=>{ai.init(e,n),Ee.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Ni(e,t,o,i),e.unwrap=()=>e._zod.def.innerType});function Cu(e){return new $u({type:"optional",innerType:e})}var Ou=O("ZodExactOptional",(e,n)=>{Cc.init(e,n),Ee.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Ni(e,t,o,i),e.unwrap=()=>e._zod.def.innerType});function zm(e){return new Ou({type:"optional",innerType:e})}var Cm=O("ZodNullable",(e,n)=>{Pc.init(e,n),Ee.init(e,n),e._zod.processJSONSchema=(t,o,i)=>tu(e,t,o,i),e.unwrap=()=>e._zod.def.innerType});function Pu(e){return new Cm({type:"nullable",innerType:e})}var Pm=O("ZodDefault",(e,n)=>{Ic.init(e,n),Ee.init(e,n),e._zod.processJSONSchema=(t,o,i)=>iu(e,t,o,i),e.unwrap=()=>e._zod.def.innerType,e.removeDefault=e.unwrap});function Im(e,n){return new Pm({type:"default",innerType:e,get defaultValue(){return typeof n=="function"?n():ce.shallowClone(n)}})}var Nm=O("ZodPrefault",(e,n)=>{Nc.init(e,n),Ee.init(e,n),e._zod.processJSONSchema=(t,o,i)=>su(e,t,o,i),e.unwrap=()=>e._zod.def.innerType});function Am(e,n){return new Nm({type:"prefault",innerType:e,get defaultValue(){return typeof n=="function"?n():ce.shallowClone(n)}})}var Ru=O("ZodNonOptional",(e,n)=>{Ac.init(e,n),Ee.init(e,n),e._zod.processJSONSchema=(t,o,i)=>ou(e,t,o,i),e.unwrap=()=>e._zod.def.innerType});function Em(e,n){return new Ru({type:"nonoptional",innerType:e,...ce.normalizeParams(n)})}var Tm=O("ZodCatch",(e,n)=>{Ec.init(e,n),Ee.init(e,n),e._zod.processJSONSchema=(t,o,i)=>au(e,t,o,i),e.unwrap=()=>e._zod.def.innerType,e.removeCatch=e.unwrap});function $m(e,n){return new Tm({type:"catch",innerType:e,catchValue:typeof n=="function"?n:ce.constantCatch(n)})}var Om=O("ZodPipe",(e,n)=>{Tc.init(e,n),Ee.init(e,n),e._zod.processJSONSchema=(t,o,i)=>cu(e,t,o,i),e.in=n.in,e.out=n.out});function Iu(e,n){return new Om({type:"pipe",in:e,out:n})}var Rm=O("ZodReadonly",(e,n)=>{$c.init(e,n),Ee.init(e,n),e._zod.processJSONSchema=(t,o,i)=>lu(e,t,o,i),e.unwrap=()=>e._zod.def.innerType});function Ym(e){return new Rm({type:"readonly",innerType:e})}var Dm=O("ZodLazy",(e,n)=>{Oc.init(e,n),Ee.init(e,n),e._zod.processJSONSchema=(t,o,i)=>uu(e,t,o,i),e.unwrap=()=>e._zod.def.getter()});function Mm(e){return new Dm({type:"lazy",getter:e})}var Zm=O("ZodCustom",(e,n)=>{Rc.init(e,n),Ee.init(e,n),e._zod.processJSONSchema=(t,o,i)=>jl(e,t,o,i)});function Bm(e,n={}){return kl(Zm,e,n)}function Fm(e,n){return Wl(e,n)}function Yu(e){let n=Mm(()=>Dt([ne(e),pn(),be(),fo(),Pe(n),Ti(ne(),n)]));return n}var dr=Object.freeze(["panel-open","panel-close","panel-move","page-home","page-settings","page-settings-tab","page-model-tab","page-setup","page-authorization","page-repair","page-session-management","open-native-session","open-feedback","change-listen-mode","change-audio-device","edit-choice","commit-form","activate-control","dismiss","details-toggle","keyboard-navigation","ui-connect","ui-reconnect","ui-status-refresh","ui-request","ui-stream","ui-render-error","ui-action-error","ui-read-recovery","manage-session","start-voice","stop-voice","ui-buffer-overflow","session-history-open","session-history-close","subagent-history-open","subagent-history-close","show-subagents","show-main-sessions","open-native-subagent","new-voice-session","bind-current-session","retry-voice-transcript","bind-existing-session","unbind-existing-session","listen-mode-ptt","listen-mode-always","listen-mode-wake","settings-audio","settings-interaction","settings-prompt","settings-models","settings-advanced","settings-pets"]),Du=64*1024,ho=64,Mu=10080*60*1e3;var $i="whaleConversation",Se=(e,n)=>({mode:"strict",typeSymbol:`dsh-fish-voice/conversation#${e}`,create:n}),mr=Se("sessionId",()=>ne().min(1).max(256)),Um=Se("settingsSessionId",()=>mr.create().nullable()),qu=new Set(["status","read-settings","listen-mode","complete-setup","set-visibility","inspect-tts","save-tts","preview-tts","cancel-tts","save-models","model-installer","inspect-model-compute","plan-model-install","start-model-install","control-model-install","apply-model-install","pick-local-path","enable","disable","new","resume","read-history","read-audio-devices","save-audio-device","save-settings","capture-bindings","save-bindings","save-voice-prompt","conversation-models","save-conversation-model","inspect-performance","set-performance-mode","read-output-volume","set-output-volume"]),Vm=Se("volumeRequest",()=>j({revision:pn().int().nonnegative(),volume:pn().min(0).max(1)})),Zu=j({id:ne(),role:ue(["user","assistant"]),text:ne().max(8e3),state:ue(["reply","interrupted","delivered","speech-requested","speech-failed"]),at:pn()}),Lm=j({state:ue(["disabled","starting","waiting","listening","paused","error"]),deadlineAt:pn().nonnegative().nullable(),streamOpen:be(),detection:ue(["asr-after-utterance","acoustic-after-utterance"])}),Ri=ne().uuid(),Hm=j({id:Ri,text:ne().max(8e3),sessionId:mr.create(),title:ne().max(256).nullable(),state:ue(["sending","queued","busy","ready","delivered","uncertain","failed","discarded"])}),qm=j({sessionId:mr.create(),items:Pe(j({id:Ri,text:ne().max(8e3),title:ne().max(256).nullable().optional(),state:ue(["busy","ready","sending","uncertain"])})).max(8)}),Gm=Se("snapshot",()=>j({revision:pn().int().nonnegative(),historyGeneration:pn().int().nonnegative().optional(),rootSessionId:ne().nullable(),title:fo(),latest:Zu.nullable(),items:Pe(Zu).max(40),inputActive:be(),inputError:ue(["device","recognition","no-speech"]).nullable().optional(),providerError:ne().max(480).optional(),inputDelivery:Hm.optional(),retryTranscripts:qm.nullable().optional(),playbackConfirmed:we(!1),wake:Lm.optional(),helper:j({online:be(),listenMode:ue(["ptt","always","wake"]).nullable()}).refine(e=>e.online||e.listenMode===null).optional()})),jm=Se("volume",()=>j({supported:be(),backend:we("dsh-speak").nullable(),volume:pn().min(0).max(1).nullable(),revision:pn().int().nullable(),apply:we("next-output").nullable(),reason:ne().nullable()})),ee=ne().max(4096),Xe=pn().int().nonnegative().max(Number.MAX_SAFE_INTEGER),Xm=j({code:ne().max(64),message:ne().max(512)}),Bu=j({available:be(),reason:ee.nullable(),runtimeLoaded:we(!1),backend:ee.optional(),provider:ee.optional(),device:ee.optional(),computeType:ee.optional(),supportedComputeTypes:Pe(ee).max(32).optional(),deviceCount:Xe.optional(),deviceIndex:Xe.optional(),validation:ee.optional(),note:ee.optional(),providerAdvertised:be().optional()}),Km=j({schema:we(1),default:we("cpu"),observedAt:ee.nullable(),reason:ee.optional(),backends:j({sensevoice:j({cpu:Bu,cuda:Bu}).optional()})}),Jm=j({observedAt:ee,scope:we("plugin-host"),platform:ee,arch:ee,cpuLogicalCores:Xe.nullable(),totalMemoryBytes:Xe.nullable(),availableMemoryBytes:Xe.nullable(),gpuMemoryBytes:Xe.nullable(),gpuMemoryReason:ee,gpuSource:we("dxgi").nullable().optional(),gpuAdapters:Pe(j({name:ne().min(1).max(256),dedicatedVideoMemoryBytes:Xe,sharedSystemMemoryBytes:Xe})).max(32).optional()}),Qm=j({modelId:ee,confidence:ue(["not-assessed","unknown","heuristic-only"]),recommended:be(),badge:ee.nullable(),state:ue(["manual-choice","unknown","recommended-pending-runtime-validation","limited-memory","busy-memory","recommended-lightweight"]),reason:ee,policy:ee.optional(),runtimeValidated:we(!1).optional(),gpuValidated:we(!1).optional()}),eh=j({release:ee,source:ee,sources:Pe(ee).max(16).optional(),redirectHost:ee,platform:ee,arch:ee,executable:ee,licenseUrls:Pe(ee).max(20)}),nh=j({jobId:ee,modelId:ee,status:ue(["waiting","verifying","applied","blocked","paused","cancelled"]),reason:ee.nullable()}),th=j({id:ee,runtime:eh.nullable().optional(),purpose:ue(["tts","asr"]).optional(),computeOptions:Pe(ue(["cpu","auto","cuda","vulkan"])).max(4).optional(),recommendation:Qm,title:ee,backend:ee.nullable(),available:be(),reason:ee.nullable(),totalBytes:Xe.nullable(),source:ee.nullable(),licenseUrls:Pe(ee).max(20),licenseNote:ee.nullable(),verification:ee.optional(),runtimeLoaded:we(!1)}),oh=j({id:ne().uuid(),modelId:ee,compute:ue(["cpu","auto","cuda","vulkan"]),status:ue(["queued","running","paused","failed","cancelled","installed","blocked"]),stage:ue(["queued","running","paused","failed","cancelled","installed","checking-runtime","verifying-local","downloading","verifying","installing","blocked"]),createdAt:ee,updatedAt:ee,totalBytes:Xe.nullable(),receivedBytes:Xe,runtimeLoaded:we(!1),error:Xm.nullable(),currentFile:ee.nullable().optional(),files:Pe(j({name:ee,bytes:Xe,receivedBytes:Xe,verified:be(),reused:be().optional()})).max(200),installedPath:ee.optional(),sourceDirectory:ee.optional(),modelVariant:ue(["q4_k_m","q8_0"]).optional(),reused:we(!0).optional(),reusedBytes:Xe.optional(),purpose:ue(["tts","asr"]).optional(),recommendedSettings:Dt([j({tts:j({provider:we("local"),localModelId:ee,localModelPath:ee})}),j({asr:we("sensevoice"),models:j({sensevoiceDir:ee.optional()}),modelCompute:ue(["cpu","auto","cuda"])})]).optional()}).refine(e=>e.status==="blocked"?e.stage==="blocked"&&e.error!==null&&e.installedPath===void 0&&e.recommendedSettings===void 0:e.stage!=="blocked"&&e.totalBytes!==null),rh=Se("modelSnapshot",()=>j({schema:we(1),hardware:Jm,compute:Km,refresh:j({pending:be(),observedAt:ne().max(64).nullable(),attemptedAt:ne().max(64).nullable(),error:ne().max(512).nullable(),intervalMs:we(3e5)}).optional(),models:Pe(th).max(32),jobs:Pe(oh).max(1e3),ttsInstallIntent:nh.nullable().optional()})),ih=Se("authorizationRequest",()=>j({revision:ne().min(1).max(256),grant:be()})),sh=Se("senseVoiceAsrRequest",()=>mo("operation",[j({operation:we("status")}),j({operation:we("retry")})])),ah={state:ue(["idle","downloading","ready","error"]),receivedBytes:Xe,totalBytes:Xe},ch=Se("senseVoiceAsrResult",()=>j({...ah,selected:be(),message:ne().max(512).nullable()})),Fu=Se("authorization",()=>j({schema:we(1),revision:ne().min(1).max(256),completed:be(),granted:be(),usageAgreement:j({version:we(1),accepted:be(),text:Pe(ee).max(16)}).optional(),modelSourcesChanged:be().optional(),blockedOperations:Pe(ee).max(32),revocationUnconfirmed:be(),scopes:Pe(j({id:ee,title:ee,description:ee,allowed:be()})).max(16),modelSources:Pe(j({modelId:ee,source:ee,licenseUrls:Pe(ee).max(20),licenseNote:ee,runtime:j({source:ee,sources:Pe(ee).max(16).optional(),licenseUrls:Pe(ee).max(20),redirectHost:ee.nullable()}).optional()})).max(32),restrictions:Pe(ee).max(16)})),lh=Se("setup",()=>j({version:we(1),completed:be()})),fn=ne().min(1).max(256),Ue=ne().min(1).max(256),Uu=ue(["cpu","auto","cuda","vulkan"]),Vu={sourceDirectory:ne().min(1).max(4096).optional(),modelVariant:ue(["q4_k_m","q8_0"]).optional()},pr=Ti(ne(),Yu()),uh=j({baseUrl:ne().min(1).max(2048),model:ne().min(1).max(256),voice:ne().min(1).max(256),apiKeyEnv:ne().max(128).regex(/^[A-Za-z_][A-Za-z0-9_]*$/).nullable(),format:ue(["wav","mp3"]),textTransmissionAccepted:be()}),Gu=ne().min(1).max(512).refine(e=>!!e.trim()&&!/[\u0000-\u001f\u007f]/.test(e)).nullable().optional(),dh=pr.refine(e=>e.customTts===void 0?e.provider!=="custom":uh.safeParse(e.customTts).success,"\u81EA\u5B9A\u4E49 TTS \u914D\u7F6E\u65E0\u6548").refine(e=>Gu.safeParse(e.systemVoiceId).success,"Windows \u7CFB\u7EDF\u97F3\u8272\u65E0\u6548"),ph=j({provider:ue(["system","deepseek","local"]),systemVoiceId:Gu,deepseekVoice:ue(["stella","tide"]),deepseekTextTransmissionAccepted:be(),volume:pn().min(0).max(1),localModelId:ne().max(128).nullable(),localModelPath:ne().max(4096).nullable(),referenceAudioPath:ne().max(4096).nullable(),referenceAudioAccepted:be()}),fh=j({backend:ue(["winmm","portaudio"]),id:ne().min(1).max(1024),name:ne().min(1).max(256)}).nullable(),mh={"read-history":{cursor:ne().max(128).optional()},"read-audio-devices":{},"save-audio-device":{revision:fn,direction:ue(["input","output"]),selection:fh},"agent-permissions":{},"save-agent-permissions":{revision:fn,allowed:j({"set-performance-mode":be(),"set-visibility":be(),"set-output-volume":be()})},"agent-requests":{},"decide-agent-request":{id:Ue,approve:be(),acknowledgements:Pe(ne().max(80)).max(10)},"model-installer":{},"inspect-model-compute":{},"plan-model-install":{modelId:Ue,compute:Uu,...Vu},"start-model-install":{modelId:Ue,compute:Uu,...Vu,planHash:fn,accepted:we(!0),useWhenReady:be().optional()},"control-model-install":{id:Ue,operation:ue(["pause","resume","cancel"])},"apply-model-install":{id:Ue,revision:fn},status:{},enable:{expectedOwnerSessionId:Ue.nullable().optional(),expectedExistingSessionId:Ue.nullable().optional()},disable:{},"read-settings":{},new:{expectedOwnerSessionId:Ue.nullable().optional()},"inspect-performance":{},"set-performance-mode":{revision:fn,performanceMode:ue(["fast","balanced","high","compatibility"])},"inspect-tts":{},"save-tts":{revision:fn,values:dh},"complete-setup":{revision:fn},"preview-tts":{revision:fn.optional(),values:ph.optional()},"cancel-tts":{},list:{cursor:ne().max(2048).optional()},resume:{id:Ue},"listen-mode":{mode:ue(["ptt","always","wake"])},"set-visibility":{revision:fn,visibility:ue(["hidden","workspace"])},"pick-local-path":{kind:ue(["referenceAudio","sensevoiceDir","campplus","sourceDirectory"])},"capture-bindings":{operation:ue(["begin","end"]),token:Ue.optional(),inactive:be().optional()},"save-bindings":{revision:fn,values:pr,bindingContext:j({ownerSessionId:Ue.nullable(),epoch:Ue.nullable(),rootSessionId:Ue.nullable()})},"save-voice-prompt":{revision:fn,values:j({text:ne().max(32768)})},"conversation-models":{},"save-conversation-model":{revision:fn,values:j({mode:ue(["auto","manual"]),provider:ne().min(1).max(256).nullable(),model:ne().min(1).max(256).nullable()})},"save-settings":{revision:fn,values:pr},"save-models":{revision:fn,values:pr}},hh=Se("uiActionRequest",()=>mo("action",Object.entries(mh).map(([e,n])=>j({action:we(e),...n}))).refine(e=>e.action!=="preview-tts"||Object.hasOwn(e,"revision")===Object.hasOwn(e,"values"),"\u8349\u7A3F\u8BD5\u542C\u5FC5\u987B\u540C\u65F6\u63D0\u4F9B\u914D\u7F6E\u7248\u672C\u548C\u8BBE\u7F6E").refine(e=>JSON.stringify(e).length<=(e.action==="save-voice-prompt"?2e5:8192),"\u64CD\u4F5C\u6570\u636E\u8FC7\u957F")),Lu=Se("uiActionResult",()=>ne().max(4*1024*1024)),gh=Se("sessionManagementRequest",()=>mo("operation",[j({operation:we("list"),rootId:Ue.optional(),cursor:ne().max(2048).optional()}),j({operation:we("unhide"),rootId:Ue,id:Ue}),j({operation:we("restore"),rootId:Ue,id:Ue})])),vh=Se("presentation",()=>j({shown:Pe(Dt([j({id:Ue,parentId:fo(),mode:fo()}),j({id:Ue,parentId:Ue,mode:ue(["one-shot","continuable","unknown"])})]))})),Oi=ne().min(1).max(128),bh=Se("updateRequest",()=>mo("action",[j({action:we("check")}),j({action:we("install"),version:Oi})])),Hu=Se("updateSnapshot",()=>j({schema:we(1),revision:pn().int().nonnegative().optional(),currentVersion:Oi,channel:ue(["stable","preview"]),status:ue(["idle","checking","current","available","incompatible","installing","restart-required","enable-required","installed","error","unsupported"]),checkedAt:ne().max(64).nullable(),release:j({version:Oi,announcement:ne().min(1).max(600),url:ne().startsWith("https://github.com/Emikosama/dsh-fish-voice/releases/tag/v").max(256)}).nullable(),message:ne().max(512).nullable(),canInstall:be()})),fr=mr.create(),go=j({sessionId:fr,title:ne().max(256).nullable(),availability:ue(["ready","busy","unavailable","archived"]),unavailableReason:ue(["managed","subagent"]).optional(),updatedAt:pn().int().nonnegative().max(864e13).nullable().optional()}),ju=ne().min(1).max(512),yh=Se("listExistingSessionsRequest",()=>Dt([j({sessionId:fr}),j({query:ne().max(128).optional(),cursor:ju.optional()})])),wh=Se("listExistingSessionsResult",()=>j({items:Pe(go).max(100),nextCursor:ju.nullable(),binding:go.nullable()})),xh=Se("setExistingSessionRequest",()=>j({sessionId:fr.nullable(),expectedSessionId:fr.nullable()})),_h=Se("setExistingSessionResult",()=>j({binding:go.nullable()})),Xu=ne().min(1).max(160).regex(/^[A-Za-z0-9_-]+$/),Sh=Se("operationLogPageRequest",()=>j({cursor:Xu.optional()})),kh=Se("operationLogPage",()=>j({text:ne().max(Du),nextCursor:Xu.nullable()})),Ku=ne().uuid(),Wh=Se("operationScopeResult",()=>j({scope:Ku})),zh=Se("recordOperationRequest",()=>j({scope:Ku,events:Pe(j({id:ne().uuid(),at:Xe,action:ue(dr),source:ue(["user","ui"]),phase:ue(["requested","finished"]).optional(),result:ue(["ok","failed","cancelled"]).optional(),count:Xe.positive().optional()}).refine(e=>e.action==="ui-buffer-overflow"?e.source==="ui"&&e.count!==void 0:e.count===void 0)).min(1).max(ho)})),Ch=Se("recordOperationResult",()=>j({accepted:be()})),Ph=Se("retryVoiceTranscriptRequest",()=>j({id:Ri})),Ih=Se("retryVoiceTranscriptResult",()=>j({accepted:be()})),Nh={retryVoiceTranscript:Ph,recordClientOperations:zh,readOperationLog:Sh,action:hh,saveAuthorization:ih,manageSessions:gh,senseVoiceAsrAction:sh,updateAction:bh,listExistingVoiceSessions:yh,setExistingVoiceSession:xh},Ah={readClientOperationScope:Wh,recordClientOperations:Ch,readOperationLog:kh,action:Lu,manageSessions:Lu,readAuthorization:Fu,saveAuthorization:Fu,senseVoiceAsrAction:ch,readSetup:lh,followPresentation:vh,followModels:rh,followUpdates:Hu,updateAction:Hu,listExistingVoiceSessions:wh,setExistingVoiceSession:_h,retryVoiceTranscript:Ih},qe=(e,n,t=!1)=>({id:`dsh-fish-voice#${$i}/${e}`,service:$i,namespace:$i,method:e,invocation:{kind:"direct"},...t?{mode:"stream"}:{},parameters:n.map(o=>({name:o,wire:o,source:"json",codec:o==="sessionId"?Um:Nh[e]??Vm})),cancellation:{parameter:"signal"},result:Ah[e]??(t?Gm:jm)}),Ju={package:"dsh-fish-voice/conversation",descriptors:[qe("action",["sessionId","request"]),qe("follow",["sessionId"],!0),qe("followModels",["sessionId"],!0),qe("followPresentation",[],!0),qe("followUpdates",[],!0),qe("updateAction",["request"]),qe("readSetup",[]),qe("readAuthorization",[]),qe("saveAuthorization",["request"]),qe("senseVoiceAsrAction",["request"]),qe("manageSessions",["sessionId","request"]),qe("readClientOperationScope",[]),qe("recordClientOperations",["request"]),qe("readOperationLog",["request"]),qe("listExistingVoiceSessions",["request"]),qe("setExistingVoiceSession",["request"]),qe("retryVoiceTranscript",["request"]),qe("readVolume",["sessionId"]),qe("setVolume",["sessionId","request"])]};var Ve=e=>e!==null&&typeof e=="object"&&!Array.isArray(e),Nn=(e,n=1024)=>typeof e=="string"&&e.length<=n,st=e=>typeof e=="number"&&Number.isFinite(e),nn=e=>typeof e=="boolean",Qu=e=>{if(!Nn(e,4096))return!1;try{let n=new URL(e);return["https:","http:"].includes(n.protocol)&&!n.username&&!n.password}catch{return!1}},In=(e,n=4096)=>e==null||Nn(e,n),Xn=e=>Nn(e,256)&&e.length>0,td=["system","deepseek","local","custom"],ed=[...td,"off"],vo=(e,n)=>Nn(e,n)&&!!e.trim(),Mt=(e,n)=>vo(e,n)&&!/[\u0000-\u001f\u007f]/.test(e),Eh=["baseUrl","model","voice","apiKeyEnv","format","textTransmissionAccepted"],Th=e=>Ve(e)&&Object.keys(e).every(n=>Eh.includes(n))&&vo(e.baseUrl,2048)&&vo(e.model,256)&&vo(e.voice,256)&&(e.apiKeyEnv===null||vo(e.apiKeyEnv,128)&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(e.apiKeyEnv))&&["wav","mp3"].includes(e.format)&&nn(e.textTransmissionAccepted),Ie=()=>{throw new Error("\u914D\u7F6E\u63A5\u53E3\u8FD4\u56DE\u4E86\u65E0\u6548\u6570\u636E\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6")};function Yi(e){if(e.onboarding!==void 0&&(!Ve(e.onboarding)||e.onboarding.version!==1||!nn(e.onboarding.completed))&&Ie(),e.ttsSetup!==void 0){let n=e.ttsSetup;(!Ve(n)||!ed.includes(n.provider)||!["stella","tide"].includes(n.deepseekVoice)||!nn(n.deepseekTextTransmissionAccepted)||!st(n.volume)||n.volume<0||n.volume>1||!(n.localModelId==null||Xn(n.localModelId))||!In(n.localModelPath)||!In(n.referenceAudioPath)||!(n.referenceAudioAccepted===void 0||nn(n.referenceAudioAccepted))||!(n.systemVoiceId==null||Mt(n.systemVoiceId,512))||(n.customTts===void 0?n.provider==="custom":!Th(n.customTts)))&&Ie()}if(e.ttsRuntime?.localComputeBackend!=null&&(!["cpu","vulkan","cuda","hip"].includes(e.ttsRuntime.localComputeBackend)||!nn(e.ttsRuntime.localComputeVerified)||!nn(e.ttsRuntime.localComputeFallback))&&Ie(),e.ttsRuntime?.localTimings!=null){let n=e.ttsRuntime.localTimings;(!Ve(n)||typeof n.modelResident!="boolean"||["preparationMs","deviceSelectionMs","synthesisMs","playbackMs","totalMs","chunks"].some(t=>!Number.isSafeInteger(n[t])||n[t]<0)||n.chunks<1||n.chunks>4e3)&&Ie()}return e.ttsRuntime!=null&&(!Ve(e.ttsRuntime)||!Nn(e.ttsRuntime.state,64)||!nn(e.ttsRuntime.busy)||!nn(e.ttsRuntime.blocked)||e.ttsRuntime.provider!=null&&!ed.includes(e.ttsRuntime.provider))&&Ie(),e}function od(e,n){if(Ve(n)||Ie(),e==="setup-status"&&(Object.keys(n).some(t=>!["version","completed"].includes(t))||n.version!==1||!nn(n.completed))&&Ie(),e==="inspect-tts"&&((!Nn(n.platform,32)||!nn(n.playbackSupported)||!nn(n.deepseekKeyAvailable)||n.autoDownload!==!1||!nn(n.gpuSupported))&&Ie(),n.systemVoices!==void 0&&(!Array.isArray(n.systemVoices)||n.systemVoices.length>128||n.systemVoices.some(t=>!Ve(t)||!Mt(t.id,512)||!Mt(t.name,256)||!Mt(t.language,64)))&&Ie(),n.systemDefaultVoiceId==null||Mt(n.systemDefaultVoiceId,512)||Ie()),e==="preview-tts"&&((!td.includes(n.provider)||n.fallback!==!1||n.acousticConfirmation!==!1||n.playbackCompleted!==!0||n.textOnly!==void 0)&&Ie(),n.systemVoiceId!==void 0&&(n.provider!=="system"||!Mt(n.systemVoiceId,512))&&Ie()),e==="cancel-tts"&&!["idle","cancelled","unconfirmed"].includes(n.status)&&Ie(),e==="model-installer"){if((n.schema!==1||!Array.isArray(n.models)||n.models.length>100||!Array.isArray(n.jobs)||n.jobs.length>1e3||!Ve(n.hardware)||!Ve(n.compute))&&Ie(),n.refresh!=null){let t=n.refresh;(!Ve(t)||!nn(t.pending)||!In(t.observedAt,64)||!In(t.attemptedAt,64)||!In(t.error,512)||!(t.intervalMs===void 0||st(t.intervalMs)&&t.intervalMs>0&&t.intervalMs<=36e5))&&Ie()}for(let t of n.models)(!Ve(t)||!Xn(t.id)||!nn(t.available)||t.runtimeLoaded!==!1||!In(t.title)||!In(t.reason)||!(t.totalBytes==null||st(t.totalBytes)&&t.totalBytes>=0))&&Ie(),t.recommendation!=null&&(!Ve(t.recommendation)||!nn(t.recommendation.recommended)||!In(t.recommendation.reason))&&Ie();for(let t of n.jobs)nd(t);if(n.ttsInstallIntent!=null){let t=n.ttsInstallIntent;(!Ve(t)||!Xn(t.jobId)||!Xn(t.modelId)||!["waiting","verifying","applied","blocked","paused","cancelled"].includes(t.status)||!In(t.reason))&&Ie()}}return e==="inspect-model-compute"&&!Ve(n.compute)&&!Ve(n.backends)&&Ie(),e==="plan-model-install"&&(n.reused!==void 0&&(!nn(n.reused)||n.reused!==!0||!Nn(n.sourceDirectory,4096)||!n.sourceDirectory||!["q4_k_m","q8_0"].includes(n.modelVariant)||!st(n.reusedBytes)||n.reusedBytes<0)&&Ie(),n.reused!==!0&&(n.sourceDirectory!==void 0||n.modelVariant!==void 0||n.reusedBytes!==void 0)&&Ie(),Array.isArray(n.files)&&n.files.some(t=>Ve(t)&&t.reused!==void 0&&!nn(t.reused))&&Ie(),(!Xn(n.modelId)||!["cpu","auto","cuda","vulkan"].includes(n.compute)||!Nn(n.planHash,128)||!Array.isArray(n.files)||n.files.length>200||!st(n.totalBytes)||n.totalBytes<0||!Nn(n.destination,4096)||!Array.isArray(n.licenseUrls)||n.licenseUrls.some(t=>!Qu(t))||!In(n.source)||!In(n.notice)||!In(n.licenseNote)||n.files.some(t=>!Ve(t)||!Xn(t.name)||!st(t.bytes)||t.bytes<0||!Nn(t.sha256,64)||!/^[a-f0-9]{64}$/i.test(t.sha256)||!Qu(t.url)))&&Ie()),["start-model-install","control-model-install"].includes(e)&&nd(n),Yi(n)}function nd(e){Ve(e)&&e.error!=null&&(!Ve(e.error)||!Nn(e.error.message,512))&&Ie(),(!Ve(e)||!Xn(e.id)||!Xn(e.modelId)||!["cpu","auto","cuda","vulkan"].includes(e.compute)||!["queued","running","paused","failed","cancelled","installed","blocked"].includes(e.status)||!Nn(e.stage,128)||!st(e.receivedBytes)||e.receivedBytes<0||!(e.totalBytes===null||st(e.totalBytes)&&e.totalBytes>=0)||e.runtimeLoaded!==!1)&&Ie(),e.status==="blocked"&&(e.stage!=="blocked"||!Xn(e.error?.code)||e.installedPath!==void 0||e.recommendedSettings!==void 0)&&Ie()}function Kn(e,n){let t=r=>r!==null&&typeof r=="object"&&!Array.isArray(r),o=r=>typeof r=="string"&&r.length>0&&r.length<=256,i=r=>r===null||t(r)&&Object.keys(r).sort().join(",")==="code,modifiers"&&typeof r.code=="string"&&/^(F([1-9]|1[0-9]|2[0-4])|Key[A-Z]|Digit[0-9]|Space)$/.test(r.code)&&Array.isArray(r.modifiers)&&r.modifiers.length<=3&&new Set(r.modifiers).size===r.modifiers.length&&r.modifiers.every(s=>["Control","Alt","Shift"].includes(s))&&!(r.code==="F4"&&r.modifiers.includes("Alt"));if(!t(n))throw new Error("Fish Voice UI returned invalid data");if(n.wake!==void 0&&!(n.wake===null&&e!=="conversation")&&!us(n.wake))throw new Error("Invalid wake state");if(n.listenMode!==void 0&&n.listenMode!==null&&!Ct.includes(n.listenMode))throw new Error("Invalid listening mode");if(["status","enable","disable","new","resume","listen-mode"].includes(e)){if(!(n.ownerSessionId===null||o(n.ownerSessionId))||typeof n.enabled!="boolean"||!t(n.helper)||typeof n.helper.online!="boolean")throw new Error("Fish Voice UI returned an invalid status");if(n.existingVoiceSessionSupported!==void 0&&typeof n.existingVoiceSessionSupported!="boolean")throw new Error("Invalid existing session support");if(n.existingVoiceSession!=null&&!go.safeParse(n.existingVoiceSession).success)throw new Error("Invalid existing voice session");if(n.helper.lastError!=null&&(typeof n.helper.lastError!="string"||n.helper.lastError.length>512))throw new Error("Invalid audio diagnostic")}else if(["save-voice-prompt","save-conversation-model","save-bindings","read-settings","save-settings","save-audio-device","save-models","set-visibility","set-performance-mode","save-tts","complete-setup","apply-model-install"].includes(e)){if(n.bindingContext!==void 0&&(!t(n.bindingContext)||["ownerSessionId","epoch","rootSessionId"].some(s=>n.bindingContext[s]!==null&&!o(n.bindingContext[s]))))throw new Error("Invalid binding context");let r=n.values;if(typeof n.revision!="string"||!n.revision||!t(r)||![0,1,2].includes(r.pttMouse)||!t(r.speakerVerification)||typeof r.speakerVerification.enabled!="boolean"||!(Kt(r.device)||typeof r.device=="string"&&r.device.length<=256&&!/[\u0000-\u001f\u007f]/.test(r.device)||Number.isSafeInteger(r.device)&&r.device>=0))throw new Error("Fish Voice UI returned invalid settings");if(r.wakeWordAliases!==void 0&&!Eo(r.wakeWordAliases))throw new Error("Invalid wake aliases");if(r.wakeListenTimeoutMs!==void 0&&(!Number.isInteger(r.wakeListenTimeoutMs)||r.wakeListenTimeoutMs<3e3||r.wakeListenTimeoutMs>3e4))throw new Error("Invalid wake timeout");if(r.semanticExperimental!==void 0&&typeof r.semanticExperimental!="boolean")throw new Error("Invalid experimental wake setting");if(r.pttKeyboard!==void 0&&!i(r.pttKeyboard))throw new Error("Invalid keyboard binding");if(n.capabilities?.pttKeyboard!==void 0){let s=n.capabilities.pttKeyboard;if(!t(s)||typeof s.supported!="boolean"||s.scope!=="global"||s.platform!=="win32"||!["available","unsupported"].includes(s.status)||!(s.reason==null||typeof s.reason=="string")||s.supported!==(s.status==="available"))throw new Error("Invalid keyboard capability")}if(n.modelSetup!==void 0&&(!t(n.modelSetup)||n.modelSetup.asr!=="sensevoice"||!t(n.modelSetup.models)||n.modelSetup.modelCompute!==void 0&&!["cpu","auto","cuda"].includes(n.modelSetup.modelCompute)||["sensevoiceDir","campplus"].some(s=>typeof n.modelSetup.models[s]!="string")))throw new Error("Fish Voice UI returned invalid model configuration");if(n.capabilities?.turnSignals===!0){let s=r.turnSignals;if(!t(s)||typeof s.enabled!="boolean"||typeof s.headphonesConfirmed!="boolean"||typeof s.experimentalAutomaticBargeIn!="boolean"||typeof s.volume!="number"||!Number.isFinite(s.volume)||s.volume<0||s.volume>1)throw new Error("Fish Voice UI returned invalid turn sound settings")}}else if(e==="list"&&(!Array.isArray(n.items)||n.items.length>50||!(n.nextCursor==null||typeof n.nextCursor=="string"&&n.nextCursor.length<=2048)||n.items.some(r=>!t(r)||!o(r.id)||typeof r.archived!="boolean"||typeof r.available!="boolean"||typeof r.canResume!="boolean"||r.title!==void 0&&typeof r.title!="string"||r.reason!==void 0&&typeof r.reason!="string")))throw new Error("Fish Voice UI returned invalid voice history");if(n.voicePrompt!==void 0){let r=n.voicePrompt;if(!t(r)||typeof r.text!="string"||r.text.length>32768||!["agents","custom"].includes(r.mode)||typeof r.customSupported!="boolean"||!(r.unsupportedReason===null||typeof r.unsupportedReason=="string"&&r.unsupportedReason.length<=512)||r.mode==="custom"&&(!r.text.trim()||!r.customSupported)||r.mode==="agents"&&r.customSupported&&r.text.trim())throw new Error("Invalid voice prompt preference")}if(n.conversationModel!==void 0&&(!t(n.conversationModel)||!["auto","manual"].includes(n.conversationModel.mode)||![n.conversationModel.provider,n.conversationModel.model].every(r=>r===null||o(r))||n.conversationModel.mode==="auto"&&(n.conversationModel.provider!==null||n.conversationModel.model!==null)))throw new Error("Invalid conversation model preference");if(e==="conversation-models"&&(!Array.isArray(n.providers)||n.providers.length>256||new Set(n.providers.map(r=>r?.id)).size!==n.providers.length||n.providers.some(r=>!t(r)||!o(r.id)||!o(r.name)||!Array.isArray(r.models)||r.models.length>2048||new Set(r.models.map(s=>s?.id)).size!==r.models.length||r.models.some(s=>!t(s)||!o(s.id)||!o(s.name)))))throw new Error("Invalid conversation model catalog");if(e==="read-audio-devices"&&!cs(n))throw new Error("Invalid audio device inventory");if(n.audioDevices!==void 0&&(!t(n.audioDevices)||!Kt(n.audioDevices.output)||!(Kt(n.audioDevices.input)||typeof n.audioDevices.input=="string"||Number.isSafeInteger(n.audioDevices.input))))throw new Error("Invalid audio device preferences");if(e==="inspect-performance"&&(!Array.isArray(n.modes)||n.modes.some(r=>!t(r)||!["fast","balanced","high"].includes(r.performanceMode)||typeof r.available!="boolean")))throw new Error("Invalid performance capabilities");if(e==="read-history"&&(!(n.rootSessionId===null||o(n.rootSessionId))||!Number.isSafeInteger(n.generation)||n.generation<0||!Number.isSafeInteger(n.revision)||n.revision<0||!["voice-session","current-voice-session"].includes(n.scope)||typeof n.truncated!="boolean"||!(n.nextCursor===null||typeof n.nextCursor=="string"&&/^\d+:\d+$/.test(n.nextCursor))||!Array.isArray(n.items)||n.items.length>100||new Set(n.items.map(r=>r?.id)).size!==n.items.length||n.items.some(r=>!t(r)||!o(r.id)||!["user","assistant"].includes(r.role)||typeof r.text!="string"||r.text.length>8e3||!["reply","interrupted","delivered","speech-requested","speech-failed"].includes(r.state)||!Number.isFinite(r.at))))throw new Error("Invalid conversation history");if(e==="conversation"){if(n.helper!==void 0&&(!t(n.helper)||typeof n.helper.online!="boolean"||!(n.helper.listenMode===null||Ct.includes(n.helper.listenMode))||!n.helper.online&&n.helper.listenMode!==null))throw new Error("Invalid conversation helper state");if(n.inputError!=null&&!["device","recognition","no-speech"].includes(n.inputError))throw new Error("Invalid input error");if(n.providerError!==void 0&&(typeof n.providerError!="string"||n.providerError.length>480))throw new Error("Invalid provider error");if(!Number.isSafeInteger(n.revision)||n.revision<0||n.title!==null||!(n.rootSessionId===null||o(n.rootSessionId))||!Array.isArray(n.items)||n.items.length>40||typeof n.inputActive!="boolean"||n.playbackConfirmed!==!1||n.items.some(r=>!t(r)||!o(r.id)||!["user","assistant"].includes(r.role)||typeof r.text!="string"||r.text.length>8e3||!["reply","interrupted","delivered","speech-requested","speech-failed"].includes(r.state)||!Number.isFinite(r.at))||n.latest!==null&&(!t(n.latest)||!n.items.some(r=>r.id===n.latest.id&&r.text===n.latest.text&&r.role==="assistant")))throw new Error("Invalid conversation snapshot")}if(e==="output-volume"&&(typeof n.supported!="boolean"||n.supported&&(typeof n.volume!="number"||!Number.isFinite(n.volume)||n.volume<0||n.volume>1||n.revision==null)))throw new Error("Invalid output volume snapshot");if(["agent-permissions","save-agent-permissions"].includes(e)){let r=["set-performance-mode","set-visibility","set-output-volume"];if(n.schema!==1||!o(n.revision)||!Array.isArray(n.items)||n.items.length!==3||new Set(n.items.map(s=>s?.operation)).size!==3||n.items.some(s=>!t(s)||!r.includes(s.operation)||typeof s.allowed!="boolean"||typeof s.title!="string"||s.title.length>128||!(s.reason===null||typeof s.reason=="string"&&s.reason.length<=1024)))throw new Error("Invalid agent permissions")}if(["agent-requests","decide-agent-request"].includes(e)){let r=s=>t(s)&&o(s.id)&&o(s.sourceSessionId)&&o(s.operation)&&typeof s.title=="string"&&s.title.length<=128&&["pending","executing","completed","blocked","unknown","superseded","expired","cancelled","rejected"].includes(s.state)&&Number.isFinite(s.createdAt)&&Number.isFinite(s.expiresAt)&&Number.isSafeInteger(s.humanRevision)&&t(s.request)&&t(s.before)&&Array.isArray(s.acknowledgements)&&s.acknowledgements.length<=10&&s.acknowledgements.every(a=>t(a)&&o(a.id)&&typeof a.text=="string"&&a.text.length<=1024)&&(s.error===null||t(s.error)&&typeof s.error.code=="string"&&typeof s.error.message=="string"&&s.error.message.length<=1024)&&(s.nextAction===null||typeof s.nextAction=="string"&&s.nextAction.length<=1024);if(n.schema!==1||!Number.isSafeInteger(n.humanRevision)||n.humanRevision<0||!Array.isArray(n.items)||n.items.length>100||n.items.some(s=>!r(s))||e==="decide-agent-request"&&(!r(n.lastOutcome)||!n.items.some(s=>s.id===n.lastOutcome.id&&s.state===n.lastOutcome.state)))throw new Error("Invalid agent request snapshot")}if(e==="authorization"){if(n.usageAgreement!==void 0&&(!t(n.usageAgreement)||n.usageAgreement.version!==1||typeof n.usageAgreement.accepted!="boolean"||!Array.isArray(n.usageAgreement.text)||n.usageAgreement.text.length>16||n.usageAgreement.text.some(r=>typeof r!="string"||r.length>4096)))throw new Error("Invalid usage agreement snapshot");if(n.schema!==1||!o(n.revision)||!Array.isArray(n.blockedOperations)||n.blockedOperations.some(r=>typeof r!="string")||typeof n.revocationUnconfirmed!="boolean"||typeof n.completed!="boolean"||typeof n.granted!="boolean"||!Array.isArray(n.scopes)||n.scopes.length>16||new Set(n.scopes.map(r=>r?.id)).size!==n.scopes.length||n.scopes.some(r=>!t(r)||!o(r.id)||typeof r.title!="string"||typeof r.description!="string"||typeof r.allowed!="boolean")||!Array.isArray(n.modelSources)||n.modelSources.length>32||n.modelSources.some(r=>!t(r)||!o(r.modelId)||typeof r.source!="string"||!Array.isArray(r.licenseUrls)||r.licenseUrls.some(s=>typeof s!="string")||typeof r.licenseNote!="string")||!Array.isArray(n.restrictions)||n.restrictions.some(r=>typeof r!="string"))throw new Error("Invalid authorization snapshot")}if(n.inferenceCompute!=null){let r=n.inferenceCompute;if(!t(r)||!["cpu","auto","cuda"].includes(r.requested)||![null,"cpu","cuda"].includes(r.actual)||r.engine!=="sensevoice"||!(r.computeType===null||["int8","float16","int8_float16","int8_float32","float32"].includes(r.computeType))||!(r.deviceIndex===null||Number.isSafeInteger(r.deviceIndex)&&r.deviceIndex>=0&&r.deviceIndex<8)||![null,"gpu-unavailable","gpu-load-failed","gpu-inference-failed","model-gpu-unverified"].includes(r.fallbackReason)||typeof r.validated!="boolean")throw new Error("Invalid inference compute status")}if(n.inputDevices!==void 0&&!ps(n.inputDevices))throw new Error("Invalid input device inventory");if(n.ptt?.keyboard!==void 0&&n.ptt.keyboard!==null){let r=n.ptt.keyboard;if(!t(r)||typeof r.supported!="boolean"||r.scope!=="global"||!["unsupported","active","inactive","unknown"].includes(r.status)||typeof r.hookInstalled!="boolean"||typeof r.recording!="boolean"||!(r.observedAt==null||Number.isFinite(r.observedAt)))throw new Error("Invalid keyboard status")}if(n.voiceSession?.recovery!==void 0){let r=n.voiceSession.recovery;if(!t(r)||r.stopVerified!==void 0&&typeof r.stopVerified!="boolean"||r.stopVerified===!0&&(r.kind!=="none"||n.voiceSession.fullyStopped!==!0)||!["none","live-root-conflict","predecessor-cleanup-pending","predecessor-stop-unconfirmed","helper-cleanup-pending","helper-stop-unconfirmed","root-stop-unconfirmed"].includes(r.kind)||!(r.rootSessionId===null||o(r.rootSessionId))||r.kind!=="none"&&n.voiceSession.fullyStopped===!0)throw new Error("Invalid voice recovery state")}if(n.voiceSession?.visibility!==void 0&&!["hidden","workspace"].includes(n.voiceSession.visibility))throw new Error("Fish Voice UI returned invalid visibility");if(n.voiceCapabilities!==void 0){let r=n.voiceCapabilities;if(!t(r)||!(r.configuredVisibility===null||["hidden","workspace"].includes(r.configuredVisibility))||["hidden","workspace"].some(s=>!t(r[s])||typeof r[s].supported!="boolean")||!t(r.taskHandoff)||typeof r.taskHandoff.mode!="string")throw new Error("Fish Voice UI returned invalid host capabilities")}return Yi(n),["setup-status","inspect-tts","preview-tts","cancel-tts","model-installer","inspect-model-compute","plan-model-install","start-model-install","control-model-install"].includes(e)&&od(e,n),n}function rd(e,n=10){let t=0;for(let o=e.length-1;o>=0;o--)if(e[o].role==="user"&&++t===n)return e.slice(o);return e}function id(e=[],n=[]){let t=new Map(e.map(o=>[o.id,o]));for(let o of n)t.set(o.id,o);return[...t.values()].sort((o,i)=>o.at-i.at)}function sd(e,n=36){return e.scrollHeight-e.scrollTop-e.clientHeight<=n}function ad({enabled:e,active:n,unknown:t,pending:o}){return t?"unknown":o?"pending":e?n?"listening":"standby":"off"}function bo(e){return e?.enabled?e.existingVoiceSession?.sessionId??e.voiceSession?.id??null:null}var cd=["save-voice-prompt","save-conversation-model","save-bindings","read-settings","save-settings","save-audio-device","save-models","set-visibility","set-performance-mode","save-tts","complete-setup","apply-model-install"],yo=cd.filter(e=>e!=="read-settings"),wo=["status","enable","disable","new","resume","listen-mode"],$h=new Set(["status","enable","disable","listen-mode","read-history"]),Oh=["save-bindings","inspect-tts","inspect-model-compute"],Jn=new Set(["conversation-models","status","read-settings","read-output-volume","model-installer","agent-permissions","agent-requests"]),vt=["conversation-models","agent-permissions","agent-requests","status","read-settings","list","read-output-volume","inspect-performance","inspect-tts","model-installer","inspect-model-compute","plan-model-install"],Rh=e=>{let n=String(e?.message??e);return/^\[([A-Z][A-Z0-9_]{0,79})\]\r?$/m.exec(n)?.[1]??(typeof e?.code=="string"?e.code:/\[([A-Z][A-Z0-9_]{0,79})\]$/m.exec(n)?.[1])};function ld(e,{schedule:n=(i,r)=>globalThis.setTimeout(i,r),unschedule:t=i=>globalThis.clearTimeout(i),observe:o=()=>{}}={}){let i=0,r={conversationHistory:null,conversationHistoryFor:null,conversationHistoryError:null,conversationHistoryLoading:!1,conversationHistoryRequestCursor:null},s={...r,conversationModels:null,conversationModelsFor:null,conversationModelsError:null,authorization:null,authorizationOpen:!1,authorizationLoading:!1,authorizationBusy:!1,authorizationUncertain:!1,authorizationNeedsReview:!1,authorizationWriteUnconfirmed:!1,authorizationError:null,agentRequests:null,agentRequestsFor:null,busy:!1,interruptibleRead:null,diagnosticStopPending:!1,voiceStopUnconfirmed:!1,error:null,status:null,settings:null,settingsFor:null,visibilityUncertain:!1,visibilityReadbackFor:null,catalog:null,checkedFor:null,catalogFor:null,uncertain:!1,performance:null,performanceFor:null,performancePending:!1,performanceError:null,conversation:null,conversationFor:null,conversationError:null,outputVolume:null,outputVolumeFor:null,outputVolumeUncertain:!1,setupStatus:null,setupOpen:!1,panelView:"home",setupError:null,ttsCapabilities:null,ttsCapabilitiesFor:null,ttsPreview:null,ttsPreviewFor:null,ttsCancelling:!1,ttsUncertain:!1,installer:null,installerFor:null,installerError:null,installerUncertain:!1,installPlan:null,installPlanFor:null},a=new Set,d=null,l=!0,u=!0,p=0,m=null,f=null,b=0,v=new Map,w=()=>{for(let y of v.values())y.stale=!0,y.abort.abort();v.clear()},k=()=>{w(),m&&(m.stale=!0,Jn.has(m.action)&&m.abort.abort())},P=!1,M=null,B=!1,E=null,T=0,z=0,$=new Map,W=!0,_=null,C=null,N=null,S,I=null,F=0,L=0,Z=!1,X=null,G=null,ae=new Set,le=new Set,pe=new Set,xe=new Set,A=y=>{if(!W)return;let x=Object.hasOwn(y,"uncertain")?y.readOnlyFailure===!0:s.readOnlyFailure;s={...s,...y,readOnlyFailure:x};for(let Y of ae)Y()},oe,Q,V=0,ke=y=>["checking","installing"].includes(y?.status),on=(y,x)=>{x?.revision!==void 0&&y.revision<x.revision||(x&&y.revision!==void 0&&(x.revision=y.revision),A({updates:y,updatesUnavailable:!1}))},Fe=()=>{if(!W||!_?.subscribeUpdates||oe||!l)return;let y=_,x={};oe=x,x.stop=y.subscribeUpdates(Y=>{!W||oe!==x||(V++,gn("update-stream"),on(Y,x))},()=>{!W||oe!==x||(oe=null,A({updatesUnavailable:!0}),ze(C,"update-stream"))})},_n=()=>{let y=oe;oe=null,y?.stop?.(),Q?.abort(),Q=null,A({updates:null,updatePending:null,updatesUnavailable:!1})},lt=async y=>{if(!W||!_?.updateAction||Q)return;let{action:x,version:Y}=y;if(x==="install"&&(s.updatesUnavailable||s.updates?.canInstall!==!0||s.updates?.release?.version!==Y))return;let U=_,K=new AbortController;Q=K,Fe();let J=oe,me=V;A({updatePending:x});try{let Oe=await U.updateAction(y,K.signal);W&&Q===K&&oe===J&&(Oe.revision===void 0&&ke(Oe)&&V!==me&&!ke(s.updates)||on(Oe,J))}catch{let Oe=V!==me&&!ke(s.updates);W&&Q===K&&oe===J&&!Oe&&A({updatesUnavailable:!0})}finally{Q===K&&(Q=null,A({updatePending:null}))}},Je=0,re=y=>{Je++,A({...y,ttsUncertain:!0})},Ye=()=>s.status?.existingVoiceSession?null:C,Te=null,$e=()=>{Te=null,A({transcriptRetry:null})},wt=y=>{if(!Te?.receipt||y?.rootSessionId!==Te.sessionId)return;let x=y.retryTranscripts?.items.find(Y=>Y.id===Te.id);(!x||x.state!=="ready"||Te.receipt==="unconfirmed"&&y.revision>Te.revision)&&$e()},nt=async(y,x)=>{let{status:Y,conversation:U,checkedFor:K,conversationFor:J,uncertain:me,busy:Oe}=s,_e=Y?.existingVoiceSession?.sessionId;if(!W||!_?.retryVoiceTranscript||Te||me||Oe||C!==y||K!==y||J!==y||!Y?.enabled||!_e||U?.rootSessionId!==_e||U.retryTranscripts?.sessionId!==_e||!U.retryTranscripts.items.some(Vn=>Vn.id===x&&Vn.state==="ready"))return;let je=_,He=new AbortController,En=Te={id:x,sessionId:_e,revision:U.revision,receipt:null};le.add(He),A({transcriptRetry:{id:x,state:"sending"}});try{let Vn=await je.retryVoiceTranscript({id:x},He.signal);if(!W||Te!==En)return;Vn.accepted===!1?$e():En.receipt="accepted"}catch{if(!W||Te!==En)return;En.receipt="unconfirmed"}finally{le.delete(He),Te===En&&(En.receipt==="unconfirmed"&&A({transcriptRetry:{id:x,state:"uncertain"}}),wt(s.conversation))}},Ne=async(y,x,Y)=>{let U=e??_?.action;if(!U)throw new Error("\u9C7C\u5E94\u754C\u9762\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let K=s.status?.existingVoiceSession&&$h.has(x.action)||s.existingSessionUnconfirmed&&x.action==="status"?null:y,J=await U(K,x,Y);try{return Kn(x.action,J)}catch(me){throw o("ui-render-error","finished","failed"),me}},Qe=null,Sn=({clear:y=!1}={})=>{let x=Qe;Qe=null,x?.abort.abort(),A({audioDevicesPending:!1,audioDevicesError:null,...y?{audioDevices:null,audioDevicesFor:null}:{}})},Bn=y=>{if(!W||C!==y)return Promise.resolve(!1);if(Qe?.id===y&&Qe.client===_)return Qe.promise;Sn();let x={id:y,client:_,scope:z,abort:new AbortController,promise:null};Qe=x,le.add(x.abort),A({audioDevicesPending:!0,audioDevicesError:null});let Y=()=>W&&Qe===x&&C===y&&_===x.client&&z===x.scope;return x.promise=(async()=>{let U;try{let K=new Promise((me,Oe)=>{U=()=>Oe(new Error("Device read cancelled")),x.abort.signal.addEventListener("abort",U,{once:!0})}),J=await Promise.race([Ne(y,{action:"read-audio-devices"},x.abort.signal),K]);return Y()?(A({audioDevices:J,audioDevicesFor:y}),!0):!1}catch(K){return Y()&&!x.abort.signal.aborted&&A({audioDevicesError:String(K?.message??K)}),!1}finally{x.abort.signal.removeEventListener("abort",U),le.delete(x.abort),Y()&&(Qe=null,A({audioDevicesPending:!1}))}})(),x.promise},cn=null,xt=y=>{if(!W||C!==y)return Promise.resolve(!1);if(cn?.id===y&&cn.scope===z)return cn.promise;let x={id:y,scope:z,client:_,promise:null};cn=x;let Y=()=>W&&cn===x&&C===y&&z===x.scope&&_===x.client;return A({modelComputePending:!0,modelComputeError:null}),x.promise=(async()=>{try{if(await Ne(y,{action:"inspect-model-compute"}),!Y())return!1;let U=await Ne(y,{action:"model-installer"});return Y()?(A({installer:U,installerFor:y,installerError:null}),Z||(Z=!0,te(!0)),!0):!1}catch(U){if(!Y())return!1;let K=U?.uncertain||/TTS_TERMINATION_UNCONFIRMED/.test(String(U?.code??"")+" "+String(U?.message??""));return A({modelComputeError:String(U?.message??U),...K?{installerUncertain:!0,installerTerminationUnconfirmed:!0}:{}}),!1}finally{Y()&&(cn=null,A({modelComputePending:!1}))}})(),x.promise},mn=null,kn=0,Wn=({clear:y=!1}={})=>{kn++;let x=mn;mn=null,x?.abort.abort(),A({performancePending:!1,performanceError:null,...y?{performance:null,performanceFor:null}:{}})},_t=y=>{if(!W||C!==y)return Promise.resolve(!1);if(mn?.id===y&&mn.client===_)return mn.promise;Wn();let x={id:y,client:_,epoch:kn,abort:new AbortController,promise:null};mn=x,le.add(x.abort),A({performancePending:!0,performanceError:null});let Y=()=>W&&mn===x&&x.epoch===kn&&C===y&&_===x.client;return x.promise=(async()=>{let U;try{let K=new Promise((me,Oe)=>{U=()=>Oe(new Error("Probe cancelled")),x.abort.signal.addEventListener("abort",U,{once:!0})}),J=await Promise.race([Ne(y,{action:"inspect-performance"},x.abort.signal),K]);return Y()?(A({performance:J,performanceFor:y}),!0):!1}catch(K){return Y()&&!x.abort.signal.aborted&&A({performanceError:String(K?.message??K)}),!1}finally{x.abort.signal.removeEventListener("abort",U),le.delete(x.abort),Y()&&(mn=null,A({performancePending:!1}))}})(),x.promise},zn=()=>{let y=$.get("conversation-stream");y&&(y.timer!==null&&t(y.timer),y.timer=null,y.ready=!1);let x=++F;if(N?.(),N=null,i++,A({...r,conversation:null,conversationFor:null,conversationError:null,listenModeReceiptRevision:null}),S=void 0,!W||!_)return;let Y=C;S=Ye(),N=_.subscribe(S,(U,K)=>{if(!(!W||x!==F||C!==Y))try{let J=Kn("conversation",U);K?.initial||gn("conversation-stream"),s.conversationHistory&&(s.conversationHistory.rootSessionId!==J.rootSessionId||s.conversationHistory.scope!=="voice-session"&&s.conversationHistory.generation!==J.historyGeneration)&&(i++,A({...r}));let me=s.conversationHistory,Oe={};if(me?.rootSessionId&&me.rootSessionId===J.rootSessionId){let _e=new Map(me.items.map(Tn=>[Tn.id,Tn]));for(let Tn of J.items)_e.set(Tn.id,Tn);let je=[..._e.values()].sort((Tn,H)=>Tn.at-H.at),He=je.slice(-4e3),En=He.reduce((Tn,H)=>Tn+H.text.length,0),Vn=je.length>4e3;for(;En>4*1024*1024;)En-=He.shift().text.length,Vn=!0;Oe={conversationHistory:{...me,items:He,truncated:me.truncated||Vn}}}A({...Oe,conversation:J,conversationFor:Y,conversationError:null}),wt(J)}catch(J){i++,A({...r,conversation:null,conversationFor:null,conversationError:String(J.message)}),ze(Y,"conversation-stream")}},U=>{W&&x===F&&(i++,A({...r,conversation:null,conversationFor:null,conversationError:String(U?.message??U)}),ze(Y,"conversation-stream"))})},te=(y=!1)=>{let x=$.get("model-stream");x&&(x.timer!==null&&t(x.timer),x.timer=null,x.ready=!1);let Y=++L;if(I?.(),I=null,y||A({installer:null,installerFor:null,installerError:null}),!W||!_?.subscribeModels||!Z)return;let U=C;I=_.subscribeModels(U,(K,J)=>{if(!(!W||Y!==L||C!==U||J?.initial))try{let me=Kn("model-installer",K),Oe=me.ttsInstallIntent,_e=s.installer?.ttsInstallIntent;gn("model-stream"),A({installer:me,installerFor:U,installerError:null}),Oe&&(_e?.jobId!==Oe.jobId||_e?.status!==Oe.status)&&!me.jobs.some(je=>je.id===Oe.jobId&&je.status==="blocked")&&(A({checkedFor:null}),Le({settings:Oe.status==="applied",force:!0}))}catch(me){A({installer:null,installerFor:null,installerError:String(me.message)}),ze(U,"model-stream")}},K=>{W&&Y===L&&(A({installer:null,installerFor:null,installerError:String(K?.message??K)}),ze(U,"model-stream"))})},hn=()=>{if(G)return G;if(!X)return Promise.resolve(!0);let y=X,x=Je;return y.cancelled=!0,y.abort.abort(),A({ttsCancelling:!0,ttsPreview:{status:"cancelling"}}),G=(async()=>{let Y=!1;try{let U=await Ne(y.id,{action:"cancel-tts"});return U.status==="unconfirmed"?(M=null,re({ttsPreview:U,uncertain:!0,error:"\u65E0\u6CD5\u786E\u8BA4\u6717\u8BFB\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B\u540E\u518D\u8BD5\u3002"}),!1):(Y=!0,A({ttsPreview:U,...x===Je?{ttsUncertain:!1}:{}}),!0)}catch(U){return M=null,re({ttsPreview:{status:"unconfirmed"},uncertain:!0,error:String(U?.message??U)}),!1}finally{Y&&X===y&&(X=null),A({ttsCancelling:!1}),G=null,queueMicrotask(()=>{Po(),zt()})}})(),G},gn=y=>{let x=$.get(y);x?.timer!=null&&t(x.timer),$.delete(y)},ge=()=>{for(let y of $.keys())gn(y)},ze=(y,x)=>{if(!W||!P||C!==y||!["authorization","setup-status","conversation-stream","model-stream","update-stream"].includes(x)&&!Jn.has(x))return;let Y=$.get(x);Y||(Y={id:y,scope:z,attempts:0,timer:null,ready:!1},$.set(x,Y)),!(Y.timer!==null||Y.ready||!l||!u)&&(Y.attempts++,o("ui-read-recovery","requested"),Y.timer=n(()=>{Y.timer=null,!(!W||C!==y||Y.scope!==z||$.get(x)!==Y)&&(Y.ready=!0,zt())},Math.min(3e4,750*2**Math.min(Y.attempts-1,6))),Y.timer?.unref?.())},Fn=null,Co=0,St=()=>{Fn!==null&&t(Fn),Fn=null,Co=0},es=y=>{!W||!l||!u||C!==y||Fn!==null||Co>=10||(Fn=n(()=>{if(Fn=null,!(!W||C!==y||!["predecessor-cleanup-pending","helper-cleanup-pending"].includes(s.status?.voiceSession?.recovery?.kind))){if(s.busy||s.ttsCancelling){es(y);return}Co++,rn.run(y,"status")}},1e3),Fn?.unref?.())},rn,ut=0,kt=null,Wt=null,dt=null,Ht=!1,sp=async y=>{let x=_,Y=[],U=new Set;if(!W||!x?.readOperationLog)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u672A\u5C31\u7EEA");let K=null;do{y?.throwIfAborted();let J=await x.readOperationLog(K?{cursor:K}:{},y);if(!W||_!==x||y?.aborted)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u8FDE\u63A5\u5DF2\u53D8\u5316");if(typeof J?.text!="string"||!(J.nextCursor===null||typeof J.nextCursor=="string"&&J.nextCursor)||U.has(J.nextCursor))throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u5206\u9875\u65E0\u6548");Y.push(J.text),K=J.nextCursor,U.add(K)}while(K);return Y},ap=async(y,x)=>{if(!W||!_?.manageSessions)throw new Error("\u9C7C\u5E94\u4F1A\u8BDD\u7BA1\u7406\u5C1A\u672A\u5C31\u7EEA");let Y=_,U=await Y.manageSessions(null,y,x);if(!W||_!==Y||x?.aborted)throw new Error("\u4F1A\u8BDD\u7BA1\u7406\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5");return U},cp=async(y,x)=>{if(!W||!_?.listExistingVoiceSessions)throw new Error("DSH \u4F1A\u8BDD\u5217\u8868\u6682\u4E0D\u53EF\u7528");let Y=_,U=await Y.listExistingVoiceSessions(y,x);if(!W||_!==Y||x?.aborted)throw new Error("\u4F1A\u8BDD\u5217\u8868\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5");return U},pt=null,lp=async y=>{if(!W||!_?.setExistingVoiceSession||pt||s.existingSessionUnconfirmed)throw new Error("DSH \u4F1A\u8BDD\u7ED1\u5B9A\u6682\u4E0D\u53EF\u7528");let x=_,Y=new AbortController;pt=Y,le.add(Y);for(let U of[v.get("status"),m])U?.action==="status"&&(U.stale=!0,U.abort.abort());A({existingSessionWritePending:!0});try{let U=await x.setExistingVoiceSession(y,Y.signal);if(!W||_!==x||Y.signal.aborted)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u786E\u8BA4");return s.status&&A({status:{...s.status,existingVoiceSession:U.binding}}),S!==Ye()&&zn(),U}catch(U){throw A({existingSessionUnconfirmed:!0}),U}finally{le.delete(Y),pt=null,A({existingSessionWritePending:!1}),Le({force:!0})}},up=async(y,x)=>{if(!W||!_?.senseVoiceAsrAction)throw new Error("\u8BC6\u522B\u6A21\u578B\u7BA1\u7406\u6682\u4E0D\u53EF\u7528");let Y=_,U=await Y.senseVoiceAsrAction(y,x);if(!W||_!==Y||x?.aborted)throw new Error("\u8BC6\u522B\u6A21\u578B\u72B6\u6001\u5DF2\u5207\u6362");if(!(J=>J&&["idle","downloading","ready","error"].includes(J.state)&&Number.isSafeInteger(J.receivedBytes)&&Number.isSafeInteger(J.totalBytes)&&J.receivedBytes>=0&&J.receivedBytes<=J.totalBytes)(U)||typeof U.selected!="boolean"||U.message!==null&&(typeof U.message!="string"||U.message.length>512))throw new Error("\u8BC6\u522B\u6A21\u578B\u72B6\u6001\u65E0\u6548");return U},Un=async({open:y=!1,initial:x=!1,review:Y=!1}={})=>{if(!_?.readAuthorization)return!1;if(Wt)return dt={open:y||dt?.open,initial:x||dt?.initial,review:Y||dt?.review},y&&A({authorizationOpen:!0,...Y?{authorizationNeedsReview:!0}:{}}),!1;kt?.abort();let U=++ut,K=new AbortController,J=_;le.add(K),kt=K,A({authorizationLoading:!0,authorizationError:null,...y?{authorizationOpen:!0}:{},...Y?{authorizationNeedsReview:!0}:{}});try{let me=Kn("authorization",await J.readAuthorization(K.signal));return!W||U!==ut||_!==J?!1:(gn("authorization"),A({authorization:me,authorizationUncertain:me.revocationUnconfirmed,authorizationWriteUnconfirmed:!1,...x&&!Ht&&(!me.completed||me.usageAgreement?.accepted!==!0||me.revocationUnconfirmed)?{authorizationOpen:!0}:{}}),!0)}catch(me){return W&&U===ut&&_===J&&(A({authorizationError:String(me?.message??me),authorizationUncertain:!0,...x?{authorizationOpen:!0}:{}}),ze(C,"authorization")),!1}finally{le.delete(K),kt===K&&(kt=null,W&&A({authorizationLoading:!1}))}},dp=async y=>{if(!_?.saveAuthorization||!s.authorization||s.authorizationBusy||s.authorizationLoading||s.authorizationUncertain)return!1;let x=s.setupStatus?.completed!==!0||s.setupOpen;kt?.abort();let Y=new AbortController,U=++ut,K=_;le.add(Y),Wt=Y,A({authorizationBusy:!0,authorizationError:null});try{let J=Kn("authorization",await K.saveAuthorization({revision:s.authorization.revision,grant:y},Y.signal));return!W||U!==ut||_!==K?!1:(Ht=!1,A({authorization:J,authorizationOpen:J.revocationUnconfirmed,authorizationUncertain:J.revocationUnconfirmed,authorizationNeedsReview:!1,authorizationWriteUnconfirmed:J.revocationUnconfirmed,...J.revocationUnconfirmed?{authorizationError:"\u6743\u9650\u5DF2\u64A4\u56DE\uFF0C\u4F46\u5F53\u524D\u97F3\u9891\u505C\u6B62\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u6838\u67E5\u72B6\u6001\u3002"}:{}}),y&&x&&!J.revocationUnconfirmed&&rn.openSetup(),Le({settings:!0,force:!0}),!0)}catch(J){try{let me=Kn("authorization",await K.readAuthorization(Y.signal));if(W&&_===K&&U===ut&&me.completed&&me.granted===y&&(!y||me.usageAgreement?.accepted===!0&&me.modelSourcesChanged!==!0)&&!me.revocationUnconfirmed)return Ht=!1,A({authorization:me,authorizationOpen:!1,authorizationUncertain:!1,authorizationNeedsReview:!1,authorizationWriteUnconfirmed:!1}),y&&x&&rn.openSetup(),Le({settings:!0,force:!0}),!0}catch{}return W&&_===K&&U===ut&&(A({authorizationUncertain:!0,authorizationWriteUnconfirmed:!0,authorizationError:String(J?.message??J)}),ze(C,"authorization")),!1}finally{if(le.delete(Y),Wt===Y&&(Wt=null,W&&A({authorizationBusy:!1}),W&&(dt||_!==K))){let J=dt??{initial:!0};dt=null,Un(J)}}},ft=null,Cr=0,Pr=()=>{if(!_?.readSetup||ft)return ft?.promise;let y=_,x=Cr,Y=new AbortController,U={promise:null};return ft=U,le.add(Y),U.promise=(async()=>{try{let K=Kn("setup-status",await y.readSetup(Y.signal));return!W||_!==y?!1:(gn("setup-status"),A({setupStatus:K,...p===x&&!Ht?{setupOpen:!K.completed}:{},setupError:null}),K.completed?Le({settings:!0}):Po(),!0)}catch(K){return W&&_===y&&(A({setupError:String(K?.message??K)}),ze(C,"setup-status")),!1}finally{le.delete(Y),ft===U&&(ft=null)}})(),U.promise},zt=async()=>{if(!(e||_?.action||_?.readAuthorization||_?.readSetup||_?.subscribeUpdates)||!W||!P||!l||!u||B||pt||s.busy||s.ttsCancelling||!M&&![...$.values()].some(U=>U.ready))return;if(!M){let[U,K]=[...$].find(([,J])=>J.ready);if(K.ready=!1,K.id!==C||K.scope!==z){gn(U);return}B=!0;try{U==="authorization"?await Un():U==="setup-status"?await Pr():U==="conversation-stream"?zn():U==="model-stream"?te(!0):U==="update-stream"?Fe():await rn.run(K.id,U)}finally{B=!1,queueMicrotask(()=>{zt()})}return}let y=M;M=null;let x=()=>W&&y.id===C&&y.scope===z;if(!x())return;let Y=()=>x()?!l||!u||pt||s.busy||s.ttsCancelling?(M||(M=y),!0):!1:!0;B=!0;try{if(y.notified||(y.notified=!0,E=y.id,T=Date.now(),A({readRefresh:(s.readRefresh??0)+1})),Y()||(y.settings&&(y.settings=!1,await rn.run(y.id,"read-settings",{},!0)),Y()))return;y.status&&(y.status=!1,await rn.run(y.id,"status",{},!0)),x()&&y.id&&!xe.has(y.id)&&(xe.add(y.id),rn.run(y.id,"inspect-performance"))}finally{B=!1,queueMicrotask(()=>{zt()})}},Le=({settings:y=!1,force:x=!1}={})=>{if(Fe(),!(!W||!P)&&!(!x&&!y&&E===C&&Date.now()-T<1500)&&(s.authorizationUncertain&&!kt&&!Wt&&Un(),s.setupError&&!ft&&Pr(),!(!C&&!_?.action&&!s.setupOpen&&s.setupStatus===null))){s.installerError&&Z&&te(!0);for(let Y of $.values())Y.id===C&&(Y.timer!==null&&t(Y.timer),Y.timer=null,Y.attempts=0,Y.ready=!0);Fn===null&&(Co=0),(!M||M.scope!==z)&&o("ui-status-refresh","requested"),M={id:C,scope:z,settings:!0,status:!0,notified:!1},queueMicrotask(()=>{zt()})}},ns=()=>{let y=l&&u;if(s.readVisible!==y){if(A({readVisible:y}),!y){w();for(let x of $.values())x.timer!==null&&t(x.timer),x.timer=null,x.ready=!1;St();return}Le({force:!0})}},Po=async()=>{let y=C;!(e||_?.action)||s.setupStatus?.completed!==!1||pe.has(y)||s.busy||s.ttsCancelling||(pe.add(y),await rn.run(y,"read-settings")&&C===y&&await rn.run(y,"status"))};return rn={getSnapshot:()=>s,async pickPath(y,x,Y){if(!W||C!==y)return null;let U=z,K=e??_?.action;if(!K)throw new Error("\u9C7C\u5E94\u754C\u9762\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let J=await K(y,{action:"pick-local-path",kind:x},Y);if(!W||C!==y||U!==z||Y?.aborted)return null;if(!J||!(J.path===null||typeof J.path=="string"&&J.path.length>0&&J.path.length<=4096&&!/[\u0000-\u001f\u007f]/.test(J.path)))throw new Error("\u8DEF\u5F84\u9009\u62E9\u7ED3\u679C\u65E0\u6548");return J.path},async captureBindings(y,x){let Y=await Ne(y,{action:"capture-bindings",...x});if(!Y||typeof Y.token!="string"||typeof Y.paused!="boolean")throw new Error("\u6309\u952E\u5F55\u5165\u56DE\u6267\u65E0\u6548");return Y},setReadVisibility(y){l=!!y,ns()},setPanelVisible(y){u=!!y,ns()},markSettingsEdited(y="save-settings"){yo.includes(y)&&(a.add(y),A({settingsDraftActions:[...a]}))},discardSettingsDraft(y){y?a.delete(y):a.clear(),A({settingsDraftActions:[...a]}),!a.size&&(d&&A({settings:d,settingsFor:C}),d=null,A({settingsConflict:!1,settingsKey:s.settings?.revision}))},enableAutomaticReads(){P=!0,Le({settings:!0,force:!0})},refresh:Le,refreshModelCompute:xt,subscribe(y){return ae.add(y),()=>ae.delete(y)},setSession(y){C!==y&&(C=y,z++,cn=null,a.clear(),d=null,A({sourcePending:!0,checkedFor:void 0,settingsFor:void 0,modelComputePending:!1,modelComputeError:null,enableError:null,listenModeError:!1,newChatFor:void 0,settingsConflict:!1,settingsDraftActions:[],installPlan:null,installPlanFor:null}),ge(),Wn({clear:!0}),Sn({clear:!0}),St(),hn(),k(),zn(),te(),Le({settings:!0,force:!0}),Po())},attachConversationClient(y){_!==y&&(_n(),z++,cn=null,A({...e?{}:{sourcePending:!0,checkedFor:void 0,settingsFor:void 0},authorization:null,authorizationUncertain:!!Wt,modelComputePending:!1,modelComputeError:null}),ge(),Wn({clear:!0}),Sn({clear:!0}),k(),pe.clear(),xe.clear()),_=y,Un({initial:!0}),zn(),te(),Le({settings:!0,force:!0}),_.readSetup&&(ft=null,Cr=p,Pr())},conversationUnavailable(y){i++,A({...r,error:String(y?.message??y),conversation:null,conversationFor:null,conversationError:String(y?.message??y)})},async dismissSetup(){let y=++p,x=await hn();return x&&y===p&&(k(),rn.discardSettingsDraft(),A({setupOpen:!1})),x&&y===p},async showHome(){let y=++p,x=await hn();return x&&y===p&&(k(),rn.discardSettingsDraft(),A({setupOpen:!1,panelView:"home"}),Le()),x&&y===p},async openSettings(y="audio",x="conversation"){let Y=++p,U=await hn();return U&&Y===p&&(k(),A({setupOpen:!1,panelView:"settings",settingsTab:["audio","interaction","prompt","models","advanced","sessions","pets"].includes(y)?y:"audio",settingsModelTab:x,sessionManagementRoot:null,sessionHistoryOpen:!1}),Le({settings:!0})),U&&Y===p},readOperationLog:sp,manageSessions:ap,listExistingVoiceSessions:cp,retryVoiceTranscript:nt,setExistingVoiceSession:lp,setSettingsTab(y){y!==s.settingsTab&&A({settingsTab:y,sessionManagementRoot:null,sessionHistoryOpen:!1})},setSettingsModelTab(y){A({settingsModelTab:y})},setSessionManagement({rootId:y=s.sessionManagementRoot,historyOpen:x}){A({sessionManagementRoot:y,sessionHistoryOpen:x})},senseVoiceAsrAction:up,updateAction:lt,dismissUpdate(y){y&&A({dismissedUpdateVersion:y})},openSetup(){++p,k(),A({setupOpen:!0}),Le({settings:!0,force:!0}),!P&&!s.busy&&(async()=>{let y=C;await rn.run(y,"read-settings")&&C===y&&await rn.run(y,"status")})()},cancelPreview:hn,discardDiagnostics:k,refreshAuthorization:Un,saveAuthorization:dp,openAuthorization:()=>Un({open:!0}),closeAuthorization({resumeSetup:y=!1}={}){return!s.authorizationBusy&&!s.authorizationLoading?(Ht=!y,++p,Cr=p,A({authorizationOpen:!1,authorizationNeedsReview:!1,setupOpen:y}),y&&Le({settings:!0}),!0):!1},async run(y,x,Y={},U=!1){if(!W||!e&&C!==y||pt&&x==="status"||(pt||s.existingSessionUnconfirmed)&&["enable","new","resume"].includes(x))return!1;let K=!!(U&&Jn.has(x)&&!s.uncertain&&s.checkedFor===y&&s.settingsFor===y&&s.status&&s.settings);if(K&&v.has(x))return!1;if(U||w(),x==="read-history"){if(C!==y||s.conversationHistoryLoading)return!1;let H=++i,ye=z,ln=F;A({conversationHistoryLoading:!0,conversationHistoryError:null,conversationHistoryRequestCursor:Y.cursor??null});try{let Ze=await Ne(y,{action:x,...Y});if(!W||C!==y||ye!==z||H!==i||ln!==F||s.conversation?.rootSessionId&&(s.conversation.rootSessionId!==Ze.rootSessionId||Ze.scope!=="voice-session"&&s.conversation.historyGeneration!==Ze.generation))return!1;let $n=s.conversationHistory;if(Y.cursor&&(!$n||$n.generation!==Ze.generation||$n.rootSessionId!==Ze.rootSessionId))return!1;let Io=new Map(Ze.items.map(Cn=>[Cn.id,Cn]));if(Y.cursor)for(let Cn of $n.items)Io.set(Cn.id,Cn);if(s.conversation?.rootSessionId===Ze.rootSessionId)for(let Cn of s.conversation?.items??[])Io.set(Cn.id,Cn);let qt=[...Io.values()].sort((Cn,Ir)=>Cn.at-Ir.at),No=Y.cursor?qt.slice(0,4e3):qt.slice(-4e3),ts=No.reduce((Cn,Ir)=>Cn+Ir.text.length,0),os=qt.length>4e3;for(;ts>4*1024*1024;)ts-=(Y.cursor?No.pop():No.shift()).text.length,os=!0;return A({conversationHistory:{...Ze,items:No,truncated:Ze.truncated||os||!!(Y.cursor&&$n?.truncated)},conversationHistoryFor:y}),!0}catch(Ze){return H===i&&A({conversationHistoryError:String(Ze?.message??Ze)}),!1}finally{H===i&&A({conversationHistoryLoading:!1})}}if(x==="apply-model-install"&&["save-models","save-tts"].some(H=>a.has(H)))return A({error:"\u8BF7\u5148\u4FDD\u5B58\u6216\u653E\u5F03\u6A21\u578B\u8BBE\u7F6E\u8349\u7A3F\uFF0C\u518D\u5207\u6362\u6A21\u578B\u3002"}),!1;if(x==="read-audio-devices")return Bn(y);if(x==="inspect-performance")return _t(y);if(x==="cancel-tts"){if(X)return hn();try{let H=await Ne(y,{action:x});return A({ttsPreview:H,ttsPreviewFor:y}),H.status==="unconfirmed"?(re({uncertain:!0,error:"\u65E0\u6CD5\u786E\u8BA4\u6717\u8BFB\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B\u3002"}),!1):!0}catch(H){return re({error:String(H?.message??H),uncertain:!0}),!1}}let J=x==="disable"&&m&&!f;if(s.busy&&!J||s.ttsCancelling||x==="disable"&&s.voiceStopUnconfirmed||s.settingsConflict&&yo.includes(x)||s.agentPermissionUncertain&&x==="save-agent-permissions"||s.agentRequestUncertain&&x==="decide-agent-request"||s.ttsUncertain&&!vt.includes(x)&&x!=="disable")return!1;let me=x==="disable"&&s.checkedFor===y&&(s.status?.enabled||s.status?.ownerSessionId||s.status?.voiceSession?.recovery?.kind==="live-root-conflict");if(s.visibilityUncertain&&!vt.includes(x)&&!me||s.outputVolumeUncertain&&x==="set-output-volume"||s.installerUncertain&&["start-model-install","control-model-install","apply-model-install"].includes(x))return!1;if(!y&&(y!==null||!qu.has(x)))return A({error:"\u6B64\u64CD\u4F5C\u9700\u8981\u4F1A\u8BDD\u6765\u6E90"}),!1;let Oe;if(J&&(m.stale=!0,Jn.has(m.action)&&m.abort.abort(),Oe=f=Symbol("diagnostic-stop")),!vt.includes(x)){St();for(let H of Jn)gn(H)}(yo.includes(x)||wo.includes(x)&&x!=="status")&&Wn({clear:x!=="set-performance-mode"});let _e;(Oh.includes(x)||Jn.has(x))&&(_e={id:y,action:x,abort:new AbortController,stale:!1},K?v.set(x,_e):m=_e),K||(b++,A({busy:!0,error:null,...x==="enable"?{enableError:null}:{},...x==="save-bindings"?{bindingError:null}:{},interruptibleRead:m?.action??null,diagnosticStopPending:!!f,...x==="listen-mode"?{listenModePending:Y.mode,listenModeBefore:s.conversation?.helper?.listenMode??s.status?.listenMode}:{},...x!=="status"&&wo.includes(x)?{listenModeError:!1}:{}}));let je,He=z,En=bo(s.status),Vn=s.checkedFor,Tn=Je;try{if(_e?.stale)return!1;let H;if(["read-output-volume","set-output-volume"].includes(x)){if(!_)throw new Error("\u8BED\u97F3\u8F93\u51FA\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let ye=_e?.abort??new AbortController;le.add(ye);let ln;try{let Ze=x==="read-output-volume"?_.readVolume(y,ye.signal):_.setVolume(y,Y,ye.signal),$n=x==="read-output-volume"?await Promise.race([Ze,new Promise((Io,qt)=>{ln=()=>qt(new Error("Read cancelled")),ye.signal.addEventListener("abort",ln,{once:!0})})]):await Ze;H=Kn("output-volume",$n)}finally{ye.signal.removeEventListener("abort",ln),le.delete(ye)}}else{if(x==="preview-tts"&&(je={id:y,abort:new AbortController,cancelled:!1},X=je,A({ttsPreview:{status:"preparing"},ttsPreviewFor:y})),Jn.has(x)){let ye,ln=new Promise((Ze,$n)=>{ye=()=>$n(new Error("Read cancelled")),_e.abort.signal.addEventListener("abort",ye,{once:!0})});try{H=await Promise.race([Ne(y,{...Y,action:x},_e.abort.signal),ln])}finally{_e.abort.signal.removeEventListener("abort",ye)}}else H=await Ne(y,{...Y,action:x},je?.abort.signal??_e?.abort.signal);if(_e?.stale)return!1}if(!W)return!vt.includes(x);if(_e?.stale)return!1;if(He!==z)return vt.includes(x)?!1:(Le({settings:!0,force:!0}),!0);if(Jn.has(x)&&gn(x),["agent-permissions","save-agent-permissions"].includes(x)&&A({agentPermissions:H,agentPermissionsFor:y,agentPermissionUncertain:!1}),["agent-requests","decide-agent-request"].includes(x)&&(A({agentRequests:H,agentRequestsFor:y,agentRequestUncertain:!1}),x==="decide-agent-request"&&H.lastOutcome?.state==="completed"&&(A({checkedFor:null}),Le({settings:!0,force:!0})),x==="decide-agent-request"&&H.lastOutcome?.state==="unknown"&&A({uncertain:!0,error:"\u64CD\u4F5C\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u5148\u8BFB\u53D6\u5B9E\u9645\u72B6\u6001\uFF0C\u4E0D\u8981\u91CD\u8BD5\u3002"})),wo.includes(x)){if(x==="listen-mode"){if(C!==y||He!==z)return!1;if(H.listenMode!==Y.mode)throw new Error("\u8BF4\u8BDD\u65B9\u5F0F\u7684\u56DE\u6267\u5C1A\u672A\u786E\u8BA4")}if(He!==z)return!0;if(["status","disable"].includes(x)&&H.ttsRuntime){let Ze=!!(H.ttsRuntime.blocked||s.ttsUncertain&&(H.ttsRuntime.busy||Tn!==Je));H.ttsRuntime.blocked&&Je++,A({ttsUncertain:Ze}),!Ze&&!H.ttsRuntime.busy&&!G&&X?.cancelled&&(X=null)}let ye=s.visibilityUncertain&&!(x==="status"&&s.visibilityReadbackFor===y),ln=Object.hasOwn(H,"existingVoiceSession");!ln&&Object.hasOwn(s.status??{},"existingVoiceSession")&&(H={...H,existingVoiceSession:s.status.existingVoiceSession,existingVoiceSessionSupported:s.status.existingVoiceSessionSupported}),A({status:H,checkedFor:y,uncertain:ye,visibilityUncertain:ye,...ye?{}:{visibilityReadbackFor:null},...K?{error:null}:{},...C===y?{sourcePending:!1}:{},...["status","disable"].includes(x)?{voiceStopUnconfirmed:!1}:{},...x==="status"&&ln?{existingSessionUnconfirmed:!1}:{},...x==="listen-mode"?{listenModeReceiptRevision:s.conversation?.revision??null}:{}}),Te&&(!H.enabled||H.existingVoiceSession?.sessionId!==Te.sessionId)&&$e(),["predecessor-cleanup-pending","helper-cleanup-pending"].includes(H.voiceSession?.recovery?.kind)?es(y):St()}if(cd.includes(x)&&(x!=="read-settings"&&He===z&&(a.delete(x),A({settingsDraftActions:[...a]})),x==="read-settings"&&a.size>0&&s.settingsFor===y&&s.settings?.revision!==H.revision?(d=H,A({settingsConflict:!0})):(d=null,A({settings:H,settingsFor:y,settingsConflict:!1,settingsKey:a.size>0?s.settingsKey:H.revision})),H.onboarding&&gn("setup-status"),A({...H.onboarding?{setupStatus:H.onboarding,setupError:null}:{},...x==="read-settings"&&s.visibilityUncertain&&["hidden","workspace"].includes(H.voiceSession?.visibility)?{visibilityReadbackFor:y}:{}})),x==="read-settings"&&s.visibilityUncertain&&ze(y,"status"),x==="conversation-models"&&A({conversationModels:H,conversationModelsFor:y,conversationModelsError:null}),x==="inspect-tts"&&A({ttsCapabilities:H,ttsCapabilitiesFor:y}),x==="save-tts"&&H.ttsSetup?.provider==="deepseek"&&H.ttsSetup.deepseekTextTransmissionAccepted&&!s.authorization?.scopes?.some(ye=>ye.id==="deepseek-text"&&ye.allowed)&&Un(),x==="save-tts"&&H.ttsSetup?.provider==="custom"&&H.ttsSetup.customTts?.textTransmissionAccepted&&!s.authorization?.scopes?.some(ye=>ye.id==="custom-tts-text"&&ye.allowed)&&Un(),x==="preview-tts"&&!je.cancelled&&A({ttsPreview:{...H,status:"completed"},ttsPreviewFor:y}),["read-output-volume","set-output-volume"].includes(x)&&A({outputVolume:H,outputVolumeFor:y,outputVolumeUncertain:!1}),["save-voice-prompt","save-conversation-model","set-visibility","set-performance-mode","save-tts","apply-model-install"].includes(x)&&(A({status:null,checkedFor:null,catalog:null,catalogFor:null}),Le({force:!0})),x==="plan-model-install"&&A({installPlan:H,installPlanFor:y,installPlanRequest:{...Y}}),x==="model-installer"&&(A({installer:H,installerFor:y,installerUncertain:!!s.installerTerminationUnconfirmed}),C===y&&!Z&&(Z=!0,te(!0))),x==="inspect-model-compute"&&s.installerFor===y&&s.installer&&A({installer:{...s.installer,compute:H}}),x==="start-model-install"&&A({installPlan:null,installPlanFor:null}),x==="list"){let ye=Y.cursor&&s.catalogFor===y?s.catalog?.items??[]:[];A({catalog:{...H,items:[...new Map([...ye,...H.items].map(ln=>[ln.id,ln])).values()]},catalogFor:y})}return["new","resume","listen-mode"].includes(x)&&A({catalog:null}),["new","resume"].includes(x)&&C===y&&He===z&&(i++,A({...r,newChatFor:x==="new"&&Y.expectedOwnerSessionId!==void 0?y:void 0})),x==="listen-mode"&&(s.setupOpen&&A({settingsFor:void 0}),Le({settings:!0,force:!0})),["status","enable","disable","new","resume"].includes(x)&&C===y&&(x!=="status"||Vn!==y||En!==bo(H)||S!==Ye()||s.conversationError)&&zn(),!0}catch(H){if(x==="listen-mode"&&(C!==y||He!==z)||(_e&&(H?.uncertain||/TTS_TERMINATION_UNCONFIRMED/.test(String(H?.code??"")+" "+String(H?.message??"")))&&(x==="inspect-tts"?re({}):A({installerUncertain:!0,installerTerminationUnconfirmed:!0})),!W||_e?.stale||je?.cancelled))return!1;if(He!==z)return vt.includes(x)||Le({settings:!0,force:!0}),!1;x==="status"&&(St(),C===y&&He===z&&A({sourcePending:!1})),vt.includes(x)||(M=null);let ye=Rh(H);(ye==="AUTHORIZATION_REQUIRED"||ye==="USAGE_AGREEMENT_REQUIRED")&&Un({open:!0,review:!0});let Ze=ye?.startsWith("TTS_CUSTOM_")||ye==="TTS_INVALID_AUDIO"&&s.settings?.ttsSetup?.provider==="custom"&&!Y.values?"custom":ye?.startsWith("TTS_SYSTEM_")?"system":ye?.startsWith("TTS_DEEPSEEK_")?"deepseek":null;if(je&&Ze&&!H.uncertain){let $n=ye==="TTS_DEEPSEEK_API_KEY_INVALID"?"DeepSeek \u5B98\u65B9\u6717\u8BFB\u63A5\u53E3\u62D2\u7EDD\u4E86\u672C\u6B21 API Key\uFF08401\uFF09\u3002\u8BF7\u5728 DSH \u6A21\u578B\u8BBE\u7F6E\u4E2D\u6838\u5BF9\u5F00\u653E\u5E73\u53F0 API Key\u3002":String(H?.message??H).split(`
`)[0].slice(0,256);return await hn()&&He===z&&A({ttsPreview:{status:"failed",provider:Ze,detail:$n},ttsPreviewFor:y}),!1}return je&&await hn(),x==="preview-tts"&&Je++,x==="enable"&&C===y&&He===z&&A({enableError:String(H?.message??H)+(H?.code?" ["+H.code+"]":"")}),x==="listen-mode"&&C===y&&He===z&&A({listenModeError:!0}),x==="disable"&&A({voiceStopUnconfirmed:!0}),A({error:String(H?.message??H),...x==="conversation-models"?{conversationModelsError:String(H?.message??H),conversationModels:null,conversationModelsFor:y}:{},...x==="save-bindings"?{bindingError:String(H?.message??H)+(H?.code?" ["+H.code+"]":"")}:{},...x==="save-agent-permissions"?{agentPermissionUncertain:!0}:{},...x==="decide-agent-request"?{agentRequestUncertain:!0}:{},...x==="preview-tts"?{ttsPreviewFor:y,ttsUncertain:!0}:{},...x==="set-output-volume"?{outputVolumeUncertain:!0}:{},...yo.includes(x)?{uncertain:!0,visibilityUncertain:!0,visibilityReadbackFor:null}:{},...["start-model-install","control-model-install"].includes(x)?{installerUncertain:!0}:{},...wo.includes(x)?{uncertain:!0,readOnlyFailure:x==="status"&&(!s.uncertain||s.readOnlyFailure===!0)}:{}}),Jn.has(x)&&ze(y,x),yo.includes(x)?(ze(y,"read-settings"),ze(y,"status")):wo.includes(x)&&x!=="status"?ze(y,"status"):x==="set-output-volume"?ze(y,"read-output-volume"):x==="save-agent-permissions"?ze(y,"agent-permissions"):x==="decide-agent-request"?ze(y,"agent-requests"):["start-model-install","control-model-install"].includes(x)&&ze(y,"model-installer"),!1}finally{v.get(x)===_e&&v.delete(x),je&&X===je&&!je.cancelled&&(X=null),_e&&m===_e&&(m=null),Oe&&f===Oe&&(f=null),K||(b--,A({busy:b>0,interruptibleRead:m?.action??null,diagnosticStopPending:!!f,...x==="listen-mode"?{listenModePending:null}:{}})),queueMicrotask(()=>{Po(),zt()})}},dispose(){if(W){z++,ge(),a.clear(),d=null,A({settingsConflict:!1,settingsDraftActions:[]}),Wn({clear:!0}),Sn({clear:!0}),St(),hn(),k(),m?.abort.abort(),_n(),W=!1,F++,L++,N?.(),I?.();for(let y of le)y.abort();le.clear(),ae.clear()}}},rn}function xo(e,n,t,o=12){let i=n.left+o,r=n.top+o;return{x:Math.max(i,Math.min(e.x,Math.max(i,n.right-t.width-o))),y:Math.max(r,Math.min(e.y,Math.max(r,n.bottom-t.height-o)))}}function ud(e=window){let n=null,t=null,o=null,i=null,r=null,s=null,a=null,d=null,l=null,u=()=>e.performance?.now?.()??Date.now(),p=e.matchMedia?.("(prefers-reduced-motion: reduce)"),m=()=>{d!==null&&e.cancelAnimationFrame?.(d),d=null,l&&(l=null,W("endDrag"))},f=S=>{if(d=null,!l||!n)return;if(p?.matches||n.dataset?.motion==="off"){m();return}let I=Math.max(0,S-l.time);l.time=S;let F={...i},L=!1;for(let Z of["x","y"]){let X=l[Z],G=(X.target-i[Z])*Math.exp(-I/X.tau);F[Z]=Math.abs(G)<.5?X.target:X.target-G,F[Z]!==X.target&&(L=!0)}i=xo(F,r.box,r.size),v(),W("move");for(let Z of["x","y"])Math.abs(i[Z]-F[Z])>.01&&(l[Z].target=i[Z]);!L||S-l.start>=2400?m():d=e.requestAnimationFrame(f)},b=(S,I)=>{n.style[S]!==I&&(n.style[S]=I)},v=()=>{b("left",`${i.x}px`),b("top",`${i.y}px`)},w=null,k=null,P="",M=()=>{let S=(n?.closest("[data-shell-overlay]")??n?.ownerDocument?.querySelector?.("[data-shell-overlay]"))?.getBoundingClientRect(),I=e.visualViewport,F=Math.max(S?.left??0,I?.offsetLeft??0),L=Math.max(S?.top??0,I?.offsetTop??0),Z=Math.min(S?.right??e.innerWidth,(I?.offsetLeft??0)+(I?.width??e.innerWidth)),X=Math.min(S?.bottom??e.innerHeight,(I?.offsetTop??0)+(I?.height??e.innerHeight)),G=parseFloat(e.getComputedStyle(n).getPropertyValue("--dsh-frame-top-clearance"))||0;return{left:F,top:L+G,right:Z,bottom:X}},B=S=>{if(!n)return;let I=Number.isFinite(S?.width)&&Number.isFinite(S?.height),F=I&&r?r.box:M();b("maxWidth",`${Math.max(1,F.right-F.left-24)}px`),b("maxHeight",`${Math.max(1,F.bottom-F.top-24)}px`);let L=I?S:n.getBoundingClientRect();r={box:F,size:{width:L.width,height:L.height}},i=xo(i??{x:F.right-L.width-20,y:F.bottom-L.height-20},F,L),v(),!o&&!l&&W("resize")},E=()=>{a!==null&&e.cancelAnimationFrame?.(a),a=null},T=()=>{E();let S=s;s=null,!(!o||!n||!S)&&(i=xo(S,r.box,r.size),v(),W("move"))},z=S=>{n?.dataset&&(S&&["left","right","top","bottom"].includes(S.edge)&&["preview","docked"].includes(S.phase)?(n.dataset.whaleDockEdge=S.edge,n.dataset.whaleDockPhase=S.phase):(delete n.dataset.whaleDockEdge,delete n.dataset.whaleDockPhase))},$=()=>{let S=k;k=null;try{S?.dispose()}catch{}z(null),n&&(n.style.zIndex=P)},W=S=>{try{typeof k?.[S]=="function"&&k[S]()}catch{$()}},_=()=>{if($(),!(!n||w?.version!==1||typeof w.register!="function"))try{k=w.register({id:"whale-voice",read(){let{box:S,size:I}=r;return{rect:{...i,width:I.width,height:I.height},bounds:{x:S.left+12,y:S.top+12,width:Math.max(1,S.right-S.left-24),height:Math.max(1,S.bottom-S.top-24)},collapsed:n.hasAttribute?.("data-collapsed")===!0}},apply(S){!n||!Number.isFinite(S?.x)||!Number.isFinite(S?.y)||(i=xo(S,r.box,r.size),v())},onDock:z,onFront:S=>{n&&(n.style.zIndex=S===!0?"901":"900")}}),["beginDrag","move","endDrag","resize","detach","dispose"].every(S=>typeof k?.[S]=="function")||$()}catch{$()}},C=(S=!1,I=!1)=>{S?T():(E(),s=null);let F=o;o=null,F?.target.hasPointerCapture?.(F.id)&&F.target.releasePointerCapture(F.id);let L=u(),Z=F?.samples??[],X=Z.at(-1),G=Z[0],ae=X&&G?X.time-G.time:0,le=X?L-X.time:1/0,pe=Math.max(0,1-Math.max(0,le-24)/56),xe=ae>0?(X.x-G.x)/ae*pe:0,A=ae>0?(X.y-G.y)/ae*pe:0;if(F&&I&&!p?.matches&&n?.dataset?.motion!=="off"&&typeof e.requestAnimationFrame=="function"&&Math.hypot(xe,A)>.04){let oe=xo({x:i.x+xe*240,y:i.y+A*240},r.box,r.size),Q=(V,ke)=>({target:oe[V],tau:ke?Math.max(1,Math.abs((oe[V]-i[V])/ke)):240});l={x:Q("x",xe),y:Q("y",A),time:L,start:L},d=e.requestAnimationFrame(f)}else F&&W(S?"endDrag":"detach")},N=()=>{m(),C(),$(),t?.disconnect(),t=null,e.removeEventListener("resize",B),e.visualViewport?.removeEventListener("resize",B),e.visualViewport?.removeEventListener("scroll",B),n=null,r=null};return{ref(S){if(S===n||(N(),!S))return;n=S,P=S.style.zIndex||"",n.style.transitionProperty="none",t=new e.ResizeObserver(F=>{let L=F?.find?.(X=>X.target===n),Z=L?.borderBoxSize?.[0]??L?.borderBoxSize;Number.isFinite(Z?.inlineSize)&&Number.isFinite(Z?.blockSize)&&F.every(X=>X.target===n)?B({width:Z.inlineSize,height:Z.blockSize}):B()}),t.observe(n);let I=n.closest("[data-shell-overlay]")??n.ownerDocument?.querySelector?.("[data-shell-overlay]");I&&t.observe(I),e.addEventListener("resize",B),e.visualViewport?.addEventListener("resize",B),e.visualViewport?.addEventListener("scroll",B),B(),_()},useLayoutService(S){return w=S,_(),()=>{w===S&&($(),w=null,B())}},activate(){m(),W("activate")},pointerDown(S,I=S.currentTarget){S.button!==0||S.pointerType&&S.pointerType!=="mouse"||!n||(m(),B(),W("beginDrag"),o={id:S.pointerId,target:I,x:S.clientX,y:S.clientY,start:{...i},samples:[{x:S.clientX,y:S.clientY,time:u()}]},I.setPointerCapture(S.pointerId),S.preventDefault())},pointerMove(S){if(!o||S.pointerId!==o.id)return;let I=u(),F=[S];try{F=[...S.getCoalescedEvents?.()??[],S]}catch{}for(let G of F){if(!Number.isFinite(G.clientX)||!Number.isFinite(G.clientY))continue;let ae=Number.isFinite(G.timeStamp)&&Number.isFinite(S.timeStamp)?Math.min(0,G.timeStamp-S.timeStamp):0,le=I+Math.max(-60,ae),pe=o.samples.at(-1);if(le<pe.time)continue;let xe={x:G.clientX,y:G.clientY,time:le};le===pe.time?o.samples[o.samples.length-1]=xe:o.samples.push(xe)}let L=I-60;for(;o.samples.length>2&&o.samples[1].time<=L;)o.samples.shift();let Z=o.samples[0],X=o.samples[1];if(X&&Z.time<L&&X.time>L){let G=(L-Z.time)/(X.time-Z.time);o.samples[0]={x:Z.x+(X.x-Z.x)*G,y:Z.y+(X.y-Z.y)*G,time:L}}s={x:o.start.x+S.clientX-o.x,y:o.start.y+S.clientY-o.y},typeof e.requestAnimationFrame!="function"?T():a===null&&(a=e.requestAnimationFrame(T))},pointerEnd(S){S.pointerId===o?.id&&C(!["pointercancel","lostpointercapture"].includes(S.type),S.type==="pointerup")},keyDown(){},fit:B,dispose:N}}var Di=Object.freeze({panel:320,settings:660,setup:420,collapsed:216});function dd(e=window,{onResize:n=()=>{}}={}){let t=null,o=null,i=null,r=null,s=null,a=null,d=null,l=null,u=null,p=null,m=null,f=null,b=null,v=null,w=null,k=null,P={width:0,height:0},M=e.matchMedia?.("(prefers-reduced-motion: reduce)"),B=()=>M?.matches?"off":t?.dataset.motion??"spring",E=S=>Number.parseFloat(S)||0;function T(){let S=e.visualViewport,I=(t.closest?.("[data-shell-overlay]")??t.ownerDocument?.querySelector?.("[data-shell-overlay]"))?.getBoundingClientRect(),F=Math.max(I?.left??0,S?.offsetLeft??0),L=Math.max(I?.top??0,S?.offsetTop??0),Z=Math.min(I?.right??e.innerWidth,(S?.offsetLeft??0)+(S?.width??e.innerWidth)),X=Math.min(I?.bottom??e.innerHeight,(S?.offsetTop??0)+(S?.height??e.innerHeight)),G=e.getComputedStyle(t);return{width:Math.max(1,Z-F-24),height:Math.max(1,Math.min((X-L)*.6,X-L-24-E(G.getPropertyValue("--dsh-frame-top-clearance")))),chrome:E(G.paddingTop)+E(G.paddingBottom)+E(G.borderTopWidth)+E(G.borderBottomWidth),horizontalChrome:E(G.paddingLeft)+E(G.paddingRight)+E(G.borderLeftWidth)+E(G.borderRightWidth),panelRadius:E(G.getPropertyValue("--dsw-radius-lg"))||12}}function z(){d!==null&&e.cancelAnimationFrame(d),d=null,u=null}function $(){!t||!p||(p.width=Math.max(1,Math.min(p.width,f.width)),p.height=Math.max(1,Math.min(p.height,f.height)),t.style.width=`${p.width.toFixed(3)}px`,t.style.height=`${p.height.toFixed(3)}px`,t.style.setProperty?.("--whale-visible-content",`${Math.max(1,p.height-f.chrome)}px`),k===null?t.style.removeProperty?.("--whale-animated-radius"):t.style.setProperty?.("--whale-animated-radius",`${k.toFixed(2)}px`),n({width:p.width,height:p.height}))}function W(S){if(d=null,!t||!m)return;let I=Math.min(.032,Math.max(.001,u===null?1/60:(S-u)/1e3));u=S;let F=w?560:B()==="firm"?420:360,L=w?47.4:B()==="firm"?41:30,Z=!0;for(let X of["width","height"]){for(let G=0;G<4;G++)P[X]+=(F*(m[X]-p[X])-L*P[X])*I/4,p[X]+=P[X]*I/4;(Math.abs(m[X]-p[X])>.25||Math.abs(P[X])>1)&&(Z=!1)}if(w){let X=m.height-w.height,G=Math.abs(X)>.25?Math.max(0,Math.min(1,(p.height-w.height)/X)):1,ae=b?m.height/2:f.panelRadius;k=w.radius+(ae-w.radius)*G}(Z||B()==="off")&&(p={...m},P={width:0,height:0},u=null,w=k=null),$(),!Z&&B()!=="off"&&(d=e.requestAnimationFrame(W))}function _(){if(!t||!o)return;f=T(),t.dataset.compactHeight=f.height<300?"true":"false";let S=t.hasAttribute("data-collapsed")&&t.dataset.collapsed!=="false";if(p&&b!==null&&S!==b){let V=k??(b?p.height/2:f.panelRadius);w={height:p.height,radius:V},k=V,t.style.setProperty?.("--whale-animated-radius",`${V.toFixed(2)}px`),P={width:0,height:0}}let I=t.dataset.view,F=t.dataset.sourcePending&&I==="home"&&v===I&&!S&&b===S?m?.height:void 0;b=S,v=I;let L=Math.min(f.width,S?Di.collapsed:Di[I]??Di.panel);t.style.boxSizing="border-box",t.style.transitionProperty="none",t.style.overflow="hidden",t.style.maxWidth=`${f.width}px`,t.style.maxHeight=`${f.height}px`;let Z=Math.max(1,f.height-f.chrome);o.style.width=`${Math.max(1,L-f.horizontalChrome)}px`,o.style.maxHeight=`${Z}px`,o.style.overflowY="hidden",o.style.minHeight="0",t.style.setProperty?.("--whale-content-limit",`${Z}px`);let X=!!o.querySelector?.('[data-size-detail="true"]'),G=S?null:I==="setup"?o.querySelector?.("[data-whale-intrinsic]"):I==="home"&&!X?o.querySelector?.("[data-home-controls]"):null,ae=G?.querySelector?.("[data-whale-natural-content]"),le=ae??G;I==="setup"&&!S&&(o.style.height="auto"),le!==a&&(s?.disconnect(),l!==null&&e.cancelAnimationFrame(l),l=null,s=null,a=le,a&&e.ResizeObserver&&(s=new e.ResizeObserver(()=>{l===null&&(l=e.requestAnimationFrame(()=>{l=null,_()}))}),s.observe(a)));let pe=G?.getBoundingClientRect?.().height,xe=ae?Math.max(0,ae.offsetHeight-ae.parentElement.clientHeight):0,A=pe+xe,oe=S?44:A>0?Math.ceil(A+f.chrome):I==="home"?X?520:320:480,Q=Math.min(f.height,F??oe);(I!=="setup"||S)&&(o.style.height=`${Math.max(1,Q-f.chrome)}px`),m={width:L,height:Q},!p||B()==="off"?(z(),p={...m},P={width:0,height:0},w=k=null,$()):d===null&&(Math.abs(p.width-L)>.25||Math.abs(p.height-Q)>.25)&&(u=e.performance?.now?.()??null,d=e.requestAnimationFrame(W))}function C(){z(),i?.disconnect(),r?.disconnect(),s?.disconnect(),l!==null&&e.cancelAnimationFrame(l),l=null,s=a=null,e.removeEventListener("resize",_),e.visualViewport?.removeEventListener("resize",_),e.visualViewport?.removeEventListener("scroll",_),M?.removeEventListener?.("change",_),i=r=null}function N(){if(C(),!(!t||!o)){if(e.ResizeObserver){i=new e.ResizeObserver(_);let S=t.closest?.("[data-shell-overlay]")??t.ownerDocument?.querySelector?.("[data-shell-overlay]");S&&i.observe(S)}e.MutationObserver&&(r=new e.MutationObserver(_),r.observe(t,{attributes:!0,attributeFilter:["data-view","data-motion","data-collapsed","data-source-pending"]}),r.observe(o,{attributes:!0,attributeFilter:["data-size-detail","data-home-layout"],subtree:!0})),e.addEventListener("resize",_),e.visualViewport?.addEventListener("resize",_),e.visualViewport?.addEventListener("scroll",_),M?.addEventListener?.("change",_),_()}}return{ref(S){t!==S&&(t=S,p=m=b=v=w=k=null,P={width:0,height:0},N())},contentRef(S){o!==S&&(o=S,N())},update:_,dispose(){C(),t=o=p=m=null}}}var pd=["spring","firm","off"];function fd(e=window){let n="dsh-whale-voice:motion:v1",t="dsh-whale-voice:assistant-name:v1",o=()=>{try{let l=e.localStorage.getItem(t)?.trim();return l&&l.length<=40?l:null}catch{return null}},i=new Set,r=()=>{try{let l=e.localStorage.getItem(n);return pd.includes(l)?l:"spring"}catch{return"spring"}},s={motion:r(),assistantName:o(),error:null},a=l=>{s=l;for(let u of i)u()},d=l=>{[n,t,null].includes(l.key)&&a({motion:r(),assistantName:o(),error:null})};return e.addEventListener("storage",d),{getSnapshot:()=>s,subscribe(l){return i.add(l),()=>i.delete(l)},setMotion(l){if(!pd.includes(l))return!1;let u=null;try{e.localStorage.setItem(n,l)}catch{u="storage-unavailable"}return a({...s,motion:l,error:u}),!u},setAssistantName(l){if(typeof l!="string"||!l.trim()||l.trim().length>40)return!1;let u=l.trim(),p=null;try{e.localStorage.setItem(t,u)}catch{p="storage-unavailable"}return a({...s,assistantName:u,error:p}),!p},dispose(){e.removeEventListener("storage",d),i.clear()}}}var Yh='button,input,textarea,select,a,label,summary,[role="button"],[role="slider"],[role="tab"],[contenteditable="true"],[data-no-drag]';function md(e,n){if(!e||!n?.contains(e))return!1;let t=e.closest?.(Yh);return!t||t.hasAttribute("data-drag-surface")}function hd(e){if(e.repeat||e.metaKey)return null;let n=e.code;return!/^(F([1-9]|1[0-9]|2[0-4])|Key[A-Z]|Digit[0-9]|Space)$/.test(n)||e.altKey&&n==="F4"?null:{code:n,modifiers:[e.ctrlKey&&"Control",e.altKey&&"Alt",e.shiftKey&&"Shift"].filter(Boolean)}}var hr=()=>({revision:0,rootSessionId:null,title:null,latest:null,items:[],inputActive:!1,inputError:null,playbackConfirmed:!1}),Mi=()=>({schema:1,hardware:null,compute:{schema:1,default:"cpu",observedAt:null,backends:{},reason:"\u5C1A\u672A\u68C0\u6D4B\u672C\u5730\u8BA1\u7B97\u540E\u7AEF\u3002"},models:[],jobs:[]});async function gd(e,n=()=>{}){let t=await e.remote.$mount(Ju),o,i;try{if(i=e.inject(["remote","remote.whaleConversation"],u=>{o=u.remote.whaleConversation}),await i.await(),!o)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA")}catch(u){throw await i?.dispose(),await t(),u}let r=new Set,s=new Map,a=!1,d=u=>{if(u?.ok!==!0)throw u?.error??new Error("\u8BED\u97F3\u63A5\u53E3\u54CD\u5E94\u65E0\u6548");return u.value},l=async(u,p,m=!0)=>{let f;try{f=await u()}catch(b){throw m&&!a&&n("ui-request","finished",p?.aborted?"cancelled":"failed"),b}return m&&f?.ok!==!0&&f?.error==null&&!p?.aborted&&n("ui-render-error","finished","failed"),d(f)};return{subscribeUpdates(u,p){let m=new AbortController;return r.add(m),Promise.resolve().then(async()=>{if(!m.signal.aborted)try{for await(let f of o.followUpdates(m.signal))m.signal.aborted||u(f);m.signal.aborted||(n("ui-stream","finished","failed"),p())}catch{m.signal.aborted||(n("ui-stream","finished","failed"),p())}finally{r.delete(m)}}),()=>{m.abort(),r.delete(m)}},updateAction(u,p){if(a)throw new Error("\u66F4\u65B0\u63A5\u53E3\u5DF2\u5378\u8F7D");return l(()=>o.updateAction(u,p),p)},subscribePresentation(u,p){let m=new AbortController;return r.add(m),(async()=>{try{for await(let f of o.followPresentation(m.signal))m.signal.aborted||u(f);m.signal.aborted||(n("ui-stream","finished","failed"),p(new Error("\u4F1A\u8BDD\u663E\u793A\u8FDE\u63A5\u5DF2\u7ED3\u675F")))}catch(f){m.signal.aborted||(n("ui-stream","finished","failed"),p(f))}finally{r.delete(m)}})(),()=>{m.abort(),r.delete(m)}},subscribe(u,p,m=()=>{}){let f=new AbortController;return r.add(f),p(hr(),{initial:!0}),(async()=>{try{for await(let b of o.follow(u,f.signal))f.signal.aborted||p(b);f.signal.aborted||(n("ui-stream","finished","failed"),p(hr(),{initial:!0}),m(new Error("\u8BED\u97F3\u72B6\u6001\u8FDE\u63A5\u5DF2\u7ED3\u675F\uFF0C\u6B63\u5728\u91CD\u65B0\u8FDE\u63A5")))}catch(b){f.signal.aborted||(n("ui-stream","finished","failed"),p(hr(),{initial:!0}),m(b))}finally{r.delete(f)}})(),()=>{f.abort(),r.delete(f),p(hr(),{initial:!0})}},subscribeModels(u,p,m=()=>{}){if(a)return p(Mi(),{initial:!0}),m(new Error("\u6A21\u578B\u8FDB\u5EA6\u63A5\u53E3\u5DF2\u5378\u8F7D")),()=>{};let f=new AbortController,b=!1,v=()=>{b||(b=!0,f.abort(),s.delete(f),p(Mi(),{initial:!0}))};return s.set(f,v),p(Mi(),{initial:!0}),(async()=>{try{for await(let w of o.followModels(u,f.signal))!b&&!a&&!f.signal.aborted&&p(w);!b&&!a&&!f.signal.aborted&&(n("ui-stream","finished","failed"),v(),m(new Error("\u6A21\u578B\u8FDB\u5EA6\u8FDE\u63A5\u5DF2\u7ED3\u675F\uFF0C\u6B63\u5728\u91CD\u65B0\u8FDE\u63A5")))}catch(w){!b&&!a&&!f.signal.aborted&&(n("ui-stream","finished","failed"),v(),m(w))}finally{s.delete(f)}})(),v},async action(u,p,m){if(a)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");let f=await l(()=>o.action(u,p,m),m);try{let b=JSON.parse(f);if(b?.protocol!==1||b.action!==p.action||!b.value||typeof b.value!="object"||Array.isArray(b.value))throw new Error("Fish Voice UI protocol mismatch");return b.value}catch(b){throw n("ui-render-error","finished","failed"),b}},readAuthorization:u=>l(()=>o.readAuthorization(u),u),saveAuthorization:(u,p)=>l(()=>o.saveAuthorization(u,p),p),async senseVoiceAsrAction(u,p){if(a)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");return l(()=>o.senseVoiceAsrAction(u,p),p)},async manageSessions(u,p,m){if(a)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");return JSON.parse(await l(()=>o.manageSessions(u,p,m),m))},listExistingVoiceSessions(u,p){if(a)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u63A5\u53E3\u5DF2\u5378\u8F7D");return l(()=>o.listExistingVoiceSessions(u,p),p)},setExistingVoiceSession(u,p){if(a)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u63A5\u53E3\u5DF2\u5378\u8F7D");return l(()=>o.setExistingVoiceSession(u,p),p)},retryVoiceTranscript(u,p){if(a)throw new Error("\u8BED\u97F3\u91CD\u53D1\u63A5\u53E3\u5DF2\u5378\u8F7D");return l(()=>o.retryVoiceTranscript(u,p),p)},readClientOperationScope(u){if(a)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return l(()=>o.readClientOperationScope(u),u,!1)},recordClientOperations(u,p){if(a)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return l(()=>o.recordClientOperations(u,p),p,!1)},readOperationLog(u,p){if(a)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return l(()=>o.readOperationLog(u,p),p,!1)},readSetup:u=>l(()=>o.readSetup(u),u),readVolume:(u,p)=>l(()=>o.readVolume(u,p),p),setVolume:(u,p,m)=>l(()=>o.setVolume(u,p,m),m),async dispose(){a=!0;for(let u of[...s.values()])u();s.clear();for(let u of r)u.abort();r.clear(),await i.dispose(),await t()}}}var yd=new Set(dr),wd=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,vd=256,Zi="dsh-fish-voice.pending-operation-log.v1",Bi="ui-buffer-overflow";function Dh(){let e=globalThis.crypto;if(e?.randomUUID)return e.randomUUID();let n=e?.getRandomValues(new Uint8Array(16));if(!n)return null;n[6]=n[6]&15|64,n[8]=n[8]&63|128;let t=Array.from(n,o=>o.toString(16).padStart(2,"0")).join("");return[t.slice(0,8),t.slice(8,12),t.slice(12,16),t.slice(16,20),t.slice(20)].join("-")}function Mh(){try{return globalThis.sessionStorage}catch{return}}function bd(e,n=!1){if(!e||typeof e.id!="string"||!wd.test(e.id)||!Number.isSafeInteger(e.at)||e.at<0||!yd.has(e.action)||!["user","ui"].includes(e.source)||n!==(e.action===Bi)||n&&(e.source!=="ui"||!Number.isSafeInteger(e.count)||e.count<1))return null;let{id:t,at:o,action:i,source:r}=e;return{id:t,at:o,action:i,source:r,...n?{count:e.count}:{},...["requested","finished"].includes(e.phase)?{phase:e.phase}:{},...["ok","failed","cancelled"].includes(e.result)?{result:e.result}:{}}}function xd({schedule:e=setTimeout,unschedule:n=clearTimeout,now:t=Date.now,identify:o=Dh,storage:i=Mh()}={}){let r=[],s=null,a=null,d=null,l=!1,u,p,m,f=0,b=!1,v=()=>{p!==void 0&&(n(p),p=void 0)},w=_=>_&&_.at>=t()-Mu,k=()=>{r=r.filter(w),w(s)||(s=null),w(a)||(a=null)},P=()=>r.length>0||s!==null||a!==null,M=()=>{if(!(!d||!i))try{P()?i.setItem(Zi,JSON.stringify({scope:d,pending:r,overflow:s,dropped:a})):i.removeItem(Zi)}catch{}},B=(_,C)=>{a={count:Math.min(Number.MAX_SAFE_INTEGER,(a?.count??0)+_),at:Math.max(a?.at??0,C)}},E=_=>{r.length>=vd?B(1,_.at):r.push(_)},T=_=>{if(d===null){let C;try{C=JSON.parse(i?.getItem(Zi)??"null")}catch{}if(C?.scope===_){let N=r,S=a,I=Array.isArray(C.pending)?C.pending.slice(0,vd).map(F=>bd(F)).filter(w):[];r=[...new Map(I.map(F=>[F.id,F])).values()],s=bd(C.overflow,!0),a=C.dropped&&Number.isSafeInteger(C.dropped.count)&&C.dropped.count>0&&Number.isSafeInteger(C.dropped.at)&&w(C.dropped)?{count:C.dropped.count,at:C.dropped.at}:null,S&&B(S.count,S.at);for(let F of N)w(F)&&E(F)}}else d!==_&&(r=[],s=null,a=null);d=_,l=!0,k(),M()},z=(_=160)=>{b||m||p!==void 0||l&&!P()||!u?.readClientOperationScope||!u?.recordClientOperations||(p=e(()=>{p=void 0,$()},_),p?.unref?.())};async function $(){let _=new AbortController,C=u;m=_;let N=()=>!b&&u===C&&m===_;try{let S=AbortSignal.any([_.signal,AbortSignal.timeout(1e4)]);if(!l){let Z=await C.readClientOperationScope(S);if(!N())return;if(typeof Z?.scope!="string"||!wd.test(Z.scope))throw new Error("Operation scope unavailable");T(Z.scope)}if(k(),!s&&a){let Z=o();Z&&(s={id:Z,at:a.at,action:Bi,source:"ui",phase:"finished",count:a.count},a=null)}M();let I=s?[s,...r.slice(0,ho-1)]:r.slice(0,ho);if(!I.length)return;let F=await C.recordClientOperations({scope:d,events:I},S);if(!N())return;if(F?.accepted!==!0)throw new Error("Operation batch was not accepted");let L=new Set(I.map(Z=>Z.id));r=r.filter(Z=>!L.has(Z.id)),s&&L.has(s.id)&&(s=null),f=0,M()}catch{N()&&(l=!1,f++)}finally{N()&&(m=void 0,z(f?Math.min(3e4,750*2**Math.min(f-1,6)):160))}}function W(_,C,N,S){if(b||!yd.has(_)||_===Bi)return;let I;try{I=o()}catch{return}I&&(k(),E({id:I,at:t(),action:_,source:C,...N?{phase:N}:{},...S?{result:S}:{}}),M(),z())}return{user(_){W(_,"user")},internal(_,C,N){W(_,"ui",C,N)},attach(_){u===_||b||(v(),m?.abort(),m=void 0,u=_,l=!1,f=0,z(0))},dispose(){b=!0,v(),m?.abort(),r=[],s=null,a=null}}}var qd=require("react-dom");var Ge=require("react"),gr=require("@deepseek-ai/dsh-client-ui-primitives");var h={headerActions:"S9YW7W_headerActions",whaleEnter:"S9YW7W_whaleEnter",section:"S9YW7W_section",settingsHeader:"S9YW7W_settingsHeader",iconButton:"S9YW7W_iconButton",ellipsis:"S9YW7W_ellipsis",audioDeviceField:"S9YW7W_audioDeviceField",keyBindingRow:"S9YW7W_keyBindingRow",mark:"S9YW7W_mark",messageName:"S9YW7W_messageName",settingsBrand:"S9YW7W_settingsBrand",existingSessionHome:"S9YW7W_existingSessionHome",newMessages:"S9YW7W_newMessages",bubbleStatus:"S9YW7W_bubbleStatus",voiceBars:"S9YW7W_voiceBars",note:"S9YW7W_note",quickConversation:"S9YW7W_quickConversation",whaleBreathe:"S9YW7W_whaleBreathe",voiceTarget:"S9YW7W_voiceTarget",modelNav:"S9YW7W_modelNav",pageHeading:"S9YW7W_pageHeading",settingsPage:"S9YW7W_settingsPage",authorizationBody:"S9YW7W_authorizationBody",assistantNameInput:"S9YW7W_assistantNameInput",quickSpeedHeader:"S9YW7W_quickSpeedHeader",bindingEditor:"S9YW7W_bindingEditor",caption:"S9YW7W_caption",details:"S9YW7W_details",motionPreview:"S9YW7W_motionPreview",message:"S9YW7W_message",voicePromptCount:"S9YW7W_voicePromptCount",updateAnnouncement:"S9YW7W_updateAnnouncement",existingSessionSearch:"S9YW7W_existingSessionSearch",bindingActions:"S9YW7W_bindingActions",audioDeviceGrid:"S9YW7W_audioDeviceGrid",homeTargetPicker:"S9YW7W_homeTargetPicker",inlineActions:"S9YW7W_inlineActions",loadHistory:"S9YW7W_loadHistory",bubbleBrand:"S9YW7W_bubbleBrand",modelHeading:"S9YW7W_modelHeading",mainAction:"S9YW7W_mainAction",floating:"S9YW7W_floating",inputCaptions:"S9YW7W_inputCaptions",fullName:"S9YW7W_fullName",conversationOptions:"S9YW7W_conversationOptions",actions:"S9YW7W_actions",popoverHeader:"S9YW7W_popoverHeader",mouseBinding:"S9YW7W_mouseBinding",requestDetails:"S9YW7W_requestDetails",quickSegments:"S9YW7W_quickSegments",voiceStatus:"S9YW7W_voiceStatus",existingSessionPicker:"S9YW7W_existingSessionPicker",audioDeviceHint:"S9YW7W_audioDeviceHint",field:"S9YW7W_field",whalePageEnter:"S9YW7W_whalePageEnter",inputCaptionReceipt:"S9YW7W_inputCaptionReceipt",deviceSelect:"S9YW7W_deviceSelect",settingsNav:"S9YW7W_settingsNav",voicePrompt:"S9YW7W_voicePrompt",currentDshAction:"S9YW7W_currentDshAction",keyBinding:"S9YW7W_keyBinding",panelContent:"S9YW7W_panelContent",inputCaptionText:"S9YW7W_inputCaptionText",voicePromptInput:"S9YW7W_voicePromptInput",newChatButton:"S9YW7W_newChatButton",volumeControl:"S9YW7W_volumeControl",historyScope:"S9YW7W_historyScope",whaleSpin:"S9YW7W_whaleSpin",brand:"S9YW7W_brand",quickActions:"S9YW7W_quickActions",whalePreview:"S9YW7W_whalePreview",primary:"S9YW7W_primary",audioDevices:"S9YW7W_audioDevices",inputCaption:"S9YW7W_inputCaption",sessionTitle:"S9YW7W_sessionTitle",spin:"S9YW7W_spin",voicePromptActions:"S9YW7W_voicePromptActions",panelViewport:"S9YW7W_panelViewport",radios:"S9YW7W_radios",status:"S9YW7W_status",agreement:"S9YW7W_agreement",conversationChoice:"S9YW7W_conversationChoice",existingSessionList:"S9YW7W_existingSessionList",popover:"S9YW7W_popover",recentMessages:"S9YW7W_recentMessages",quickSpeed:"S9YW7W_quickSpeed",authorizationSteps:"S9YW7W_authorizationSteps",guideButton:"S9YW7W_guideButton",segmented:"S9YW7W_segmented",bubble:"S9YW7W_bubble",authorizationActions:"S9YW7W_authorizationActions",markSmall:"S9YW7W_markSmall",error:"S9YW7W_error",pathRow:"S9YW7W_pathRow",performanceChoice:"S9YW7W_performanceChoice",whaleInputPulse:"S9YW7W_whaleInputPulse",statusRow:"S9YW7W_statusRow",quickHint:"S9YW7W_quickHint",sessionRename:"S9YW7W_sessionRename",placeholder:"S9YW7W_placeholder",permissionList:"S9YW7W_permissionList",currentDshTarget:"S9YW7W_currentDshTarget",header:"S9YW7W_header",sliderLabel:"S9YW7W_sliderLabel",capabilityRow:"S9YW7W_capabilityRow",backIcon:"S9YW7W_backIcon",settingsBody:"S9YW7W_settingsBody",backButton:"S9YW7W_backButton",formActions:"S9YW7W_formActions",conversationHeader:"S9YW7W_conversationHeader",existingSessionTarget:"S9YW7W_existingSessionTarget",hint:"S9YW7W_hint",assistantName:"S9YW7W_assistantName",updateDialog:"S9YW7W_updateDialog",notice:"S9YW7W_notice",inlineField:"S9YW7W_inlineField",currentModel:"S9YW7W_currentModel",openOriginal:"S9YW7W_openOriginal",settings:"S9YW7W_settings",settingsLayout:"S9YW7W_settingsLayout",homeTargetRow:"S9YW7W_homeTargetRow",audioDeviceNotice:"S9YW7W_audioDeviceNotice",volumeRow:"S9YW7W_volumeRow",disclosureRow:"S9YW7W_disclosureRow",voicePromptMode:"S9YW7W_voicePromptMode",authorization:"S9YW7W_authorization",whaleFeedback:"S9YW7W_whaleFeedback",updateHeader:"S9YW7W_updateHeader",editNotice:"S9YW7W_editNotice",text:`.S9YW7W_floating {
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

[data-ds-dark-theme] .S9YW7W_floating {
  --whale-solid-base: var(--dsw-static-neutral-bluish-950, #181a1e);
}

.S9YW7W_floating[data-collapsed] {
  border-radius: var(--whale-animated-radius, 999px);
  corner-shape: round;
  width: 216px;
  padding: 4px;
}

.S9YW7W_floating[data-view="settings"] {
  width: 660px;
  padding: 0;
}

.S9YW7W_floating[data-view="setup"]:not([data-collapsed]) {
  width: 420px;
}

.S9YW7W_floating:active {
  cursor: grabbing;
}

.S9YW7W_floating[data-whale-dock-phase="preview"] {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

.S9YW7W_floating [hidden] {
  display: none !important;
}

.S9YW7W_floating [data-no-drag] {
  cursor: auto;
  touch-action: pan-y;
}

.S9YW7W_panelViewport {
  overscroll-behavior: contain;
  min-width: 0;
  min-height: 0;
  overflow-x: hidden;
}

.S9YW7W_panelContent {
  min-width: 0;
  animation: S9YW7W_whaleEnter var(--whale-duration) var(--whale-ease);
}

.S9YW7W_mark {
  flex: none;
  width: 24px;
  height: 24px;
}

.S9YW7W_markSmall {
  flex: none;
  width: 20px;
  height: 20px;
}

.S9YW7W_brand, .S9YW7W_header, .S9YW7W_headerActions, .S9YW7W_actions, .S9YW7W_statusRow, .S9YW7W_caption {
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.S9YW7W_brand {
  font-size: 15px;
}

.S9YW7W_header {
  justify-content: space-between;
  margin-bottom: 12px;
}

.S9YW7W_headerActions {
  gap: 2px;
}

.S9YW7W_actions {
  flex-wrap: wrap;
}

.S9YW7W_iconButton {
  flex: none;
  width: 32px;
  min-width: 32px;
  height: 32px;
  padding: 0;
}

.S9YW7W_newChatButton {
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

.S9YW7W_newChatButton svg {
  width: 14px;
  height: 14px;
}

.S9YW7W_ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
}

.S9YW7W_statusRow {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  margin-bottom: 10px;
  padding: 4px 6px;
}

.S9YW7W_statusRow[data-recording] {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 19%,var(--dsw-alias-bg-module-platform));
}

.S9YW7W_statusRow[data-recording] .S9YW7W_voiceStatus > svg {
  color: var(--dsw-alias-brand-primary);
}

.S9YW7W_status {
  flex: 1;
  min-width: 0;
  margin: 0;
  font-size: 12px;
  line-height: 18px;
}

.S9YW7W_voiceTarget {
  flex: 1;
  align-items: center;
  gap: 4px;
  min-width: 0;
  line-height: 18px;
  display: flex;
}

.S9YW7W_voiceTarget > span, .S9YW7W_existingSessionHome > span {
  color: var(--dsw-alias-label-secondary);
  flex: none;
  font-size: 11px;
}

.S9YW7W_voiceTarget strong {
  font-size: 13px;
  font-weight: 600;
}

.S9YW7W_voiceStatus {
  align-items: center;
  gap: 4px;
  max-width: 47%;
  display: flex;
}

.S9YW7W_voiceStatus > svg {
  flex: none;
  width: 14px;
  height: 14px;
}

.S9YW7W_statusRow[data-bound] {
  flex-direction: column;
  align-items: stretch;
  gap: 0;
}

.S9YW7W_statusRow[data-bound] .S9YW7W_voiceStatus {
  max-width: 100%;
}

.S9YW7W_mainAction {
  width: 100%;
  min-height: 36px;
  font-weight: 500;
}

.S9YW7W_primary {
  color: var(--dsw-alias-label-primary) !important;
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 16%,var(--dsw-alias-bg-layer-2)) !important;
  border: 1px solid var(--dsw-alias-border-l2) !important;
}

.S9YW7W_bubble {
  corner-shape: round;
  cursor: grab;
  touch-action: none;
  width: 100%;
  max-width: 100%;
  height: 36px;
  animation: S9YW7W_whaleEnter var(--whale-duration) var(--whale-ease);
  border-radius: 999px;
  justify-content: flex-start;
  gap: 8px;
}

.S9YW7W_bubble .S9YW7W_ellipsis {
  text-align: left;
  flex: 1;
}

.S9YW7W_caption {
  text-align: left;
  justify-content: flex-start;
  width: 100%;
  margin-top: 8px;
  padding: 6px 0;
  font-size: 12px;
}

.S9YW7W_caption .S9YW7W_ellipsis {
  flex: 1;
}

.S9YW7W_openOriginal {
  flex: none;
}

.S9YW7W_hint, .S9YW7W_quickHint {
  color: var(--dsw-alias-label-secondary);
  overflow-wrap: anywhere;
  font-size: 12px;
}

.S9YW7W_hint {
  margin: 6px 0;
}

.S9YW7W_quickHint {
  margin: 0;
  font-size: 11px;
}

.S9YW7W_notice, .S9YW7W_note, .S9YW7W_error {
  border-radius: var(--dsw-radius-sm);
  overflow-wrap: anywhere;
  background: var(--dsw-alias-bg-module-platform);
  margin: 8px 0;
  padding: 8px 10px;
  font-size: 12px;
}

.S9YW7W_notice, .S9YW7W_note {
  border-left: 2px solid var(--dsw-alias-state-warn-primary);
}

.S9YW7W_error {
  border-left: 2px solid var(--dsw-alias-state-error-primary);
}

.S9YW7W_error button {
  margin-top: 8px;
}

.S9YW7W_popover {
  box-sizing: border-box;
  cursor: auto;
  touch-action: auto;
  width: 100%;
  animation: S9YW7W_whaleEnter var(--whale-duration) var(--whale-ease);
  margin: 0 0 10px;
  padding: 12px;
  position: relative;
  overflow: auto;
}

.S9YW7W_popoverHeader {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  display: flex;
}

.S9YW7W_popoverHeader > button {
  width: 28px;
  padding: 0;
}

.S9YW7W_quickConversation {
  max-height: 160px;
}

.S9YW7W_recentMessages {
  gap: 6px;
  display: grid;
}

.S9YW7W_message {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  padding: 5px 8px;
}

.S9YW7W_message strong {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

.S9YW7W_message p {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  margin: 3px 0 0;
}

.S9YW7W_quickActions {
  gap: 6px;
  min-width: 0;
  display: grid;
}

.S9YW7W_quickSpeed {
  gap: 5px;
  padding-top: 4px;
  display: grid;
}

.S9YW7W_quickSpeedHeader {
  color: var(--dsw-alias-label-secondary);
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  display: flex;
}

.S9YW7W_quickSpeedHeader small {
  font-size: 11px;
}

.S9YW7W_quickSegments {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  gap: 3px;
  padding: 3px;
  display: grid;
}

.S9YW7W_quickSegments button {
  min-width: 0;
  height: 28px;
  min-height: 28px;
  padding: 0 5px;
  font-size: 12px;
}

.S9YW7W_quickSegments button[aria-pressed="true"] {
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: 0 1px 3px #0001;
}

.S9YW7W_settings {
  height: 100%;
  min-height: 0;
  color: var(--dsw-alias-label-primary);
  flex-direction: column;
  display: flex;
  overflow: hidden;
}

.S9YW7W_settingsHeader {
  box-sizing: border-box;
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 4px 10px;
  display: flex;
}

.S9YW7W_settingsHeader h2 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.S9YW7W_settingsBrand {
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 6px;
  min-width: 0;
  display: flex;
}

.S9YW7W_backButton, .S9YW7W_guideButton {
  flex: none;
  padding: 0 8px;
  font-size: 12px;
}

.S9YW7W_backIcon {
  transform: rotate(180deg);
}

.S9YW7W_settingsLayout {
  flex: 1;
  grid-template-rows: minmax(0, 1fr);
  grid-template-columns: 104px minmax(0, 1fr);
  min-height: 0;
  display: grid;
  overflow: hidden;
}

.S9YW7W_settingsNav {
  border-right: 1px solid var(--dsw-alias-border-l2);
  background: var(--dsw-alias-bg-module-platform);
  flex-direction: column;
  gap: 3px;
  min-height: 0;
  padding: 8px 6px;
  display: flex;
  overflow-y: auto;
}

.S9YW7W_settingsNav button {
  justify-content: flex-start;
  min-width: 0;
  min-height: 34px;
  padding: 0 12px;
  font-size: 12px;
}

.S9YW7W_settingsNav button[aria-pressed="true"] {
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: inset 2px 0 0 var(--dsw-alias-brand-primary);
  font-weight: 600;
}

.S9YW7W_settingsPage {
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  display: flex;
  overflow: hidden;
}

.S9YW7W_pageHeading {
  flex: none;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 10px 12px 8px;
  display: flex;
}

.S9YW7W_pageHeading h3 {
  margin: 0;
  font-size: 15px;
}

.S9YW7W_pageHeading p {
  color: var(--dsw-alias-label-secondary);
  margin: 3px 0 0;
  font-size: 12px;
}

.S9YW7W_settingsBody {
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

.S9YW7W_settingsBody > .S9YW7W_section, .S9YW7W_settingsBody > div > .S9YW7W_section {
  margin: 0 0 12px;
}

.S9YW7W_section {
  align-content: start;
  gap: 8px;
  min-width: 0;
  display: grid;
}

.S9YW7W_section h3 {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
}

.S9YW7W_section p, .S9YW7W_section > .S9YW7W_section {
  margin: 0;
}

.S9YW7W_settingsBody > .S9YW7W_section + .S9YW7W_section {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

.S9YW7W_section summary {
  cursor: pointer;
  padding: 7px 0;
  font-size: 13px;
  font-weight: 500;
}

details.S9YW7W_section {
  border-top: 1px solid var(--dsw-alias-border-l2);
  display: block;
}

details.S9YW7W_section > :not(summary) {
  margin-top: 10px;
}

.S9YW7W_field {
  gap: 6px;
  font-size: 12px;
  display: grid;
}

.S9YW7W_field input {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}

.S9YW7W_deviceSelect {
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

.S9YW7W_radios {
  border: 0;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
  margin: 0;
  padding: 0;
  display: flex;
}

.S9YW7W_radios legend {
  margin-bottom: 6px;
  font-size: 12px;
}

.S9YW7W_radios label {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  cursor: pointer;
  align-items: center;
  gap: 6px;
  padding: 6px 9px;
  font-size: 12px;
  display: flex;
}

.S9YW7W_radios input {
  accent-color: var(--dsw-alias-brand-primary);
}

.S9YW7W_bindingEditor {
  gap: 14px;
  display: grid;
}

.S9YW7W_keyBinding {
  gap: 6px;
  display: grid;
}

.S9YW7W_keyBinding > :is(h3, p) {
  margin: 0;
}

.S9YW7W_keyBindingRow {
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 12px;
  min-width: 0;
  display: flex;
}

.S9YW7W_keyBindingRow > span {
  overflow-wrap: anywhere;
  min-width: 5em;
  font-size: 13px;
}

.S9YW7W_mouseBinding legend {
  font-size: 14px;
  font-weight: 600;
}

.S9YW7W_mouseBinding label {
  white-space: nowrap;
}

.S9YW7W_bindingActions {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

.S9YW7W_segmented {
  flex-wrap: wrap;
  gap: 4px;
  display: flex;
}

.S9YW7W_segmented button {
  min-width: 0;
  font-size: 12px;
}

.S9YW7W_segmented button[aria-pressed="true"], .S9YW7W_modelNav button[aria-pressed="true"] {
  background: var(--dsw-alias-interactive-bg-active);
  color: var(--dsw-alias-label-primary);
  box-shadow: inset 0 -2px 0 var(--dsw-alias-brand-primary);
}

.S9YW7W_modelNav {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  gap: 4px;
  margin-bottom: 12px;
  padding: 0 16px 10px;
  display: flex;
}

.S9YW7W_modelNav button {
  flex: 1;
  min-width: 0;
  padding: 0 6px;
  font-size: 12px;
}

.S9YW7W_sliderLabel {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  display: flex;
}

.S9YW7W_sliderLabel span {
  margin-left: auto;
}

.S9YW7W_sliderLabel input {
  width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
}

.S9YW7W_formActions {
  padding-top: 4px;
}

.S9YW7W_formActions button {
  min-width: 100px;
}

.S9YW7W_editNotice {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 8px;
  display: flex;
}

.S9YW7W_editNotice div {
  flex: 1;
  min-width: 0;
}

.S9YW7W_editNotice strong {
  font-size: 12px;
}

.S9YW7W_editNotice p {
  color: var(--dsw-alias-label-secondary);
  margin: 3px 0 0;
  font-size: 12px;
}

.S9YW7W_editNotice button {
  flex: none;
  font-size: 12px;
}

.S9YW7W_details {
  grid-template-columns: auto minmax(0, 1fr);
  gap: 6px 12px;
  margin: 0;
  font-size: 12px;
  display: grid;
}

.S9YW7W_details dt {
  color: var(--dsw-alias-label-secondary);
}

.S9YW7W_details dd {
  overflow-wrap: anywhere;
  margin: 0;
}

.S9YW7W_capabilityRow {
  display: contents;
}

.S9YW7W_requestDetails {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  max-height: 200px;
  padding: 8px;
  font-size: 11px;
  overflow: auto;
}

.S9YW7W_placeholder {
  text-align: center;
  min-height: 140px;
  color: var(--dsw-alias-label-secondary);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  display: flex;
}

.S9YW7W_placeholder h3, .S9YW7W_placeholder p {
  margin: 0;
}

.S9YW7W_placeholder svg {
  width: 32px;
  height: 32px;
}

.S9YW7W_motionPreview {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  width: 40px;
  height: 32px;
  animation: S9YW7W_whalePreview var(--whale-duration) var(--whale-ease);
  place-items: center;
  display: grid;
}

.S9YW7W_settings a {
  color: var(--dsw-alias-link);
  text-underline-offset: 2px;
  overflow-wrap: anywhere;
}

.S9YW7W_updateDialog {
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

.S9YW7W_updateDialog::backdrop {
  background: #0005;
}

.S9YW7W_updateHeader {
  align-items: center;
  gap: 8px;
  display: flex;
}

.S9YW7W_updateHeader h2 {
  margin: 0;
  font-size: 16px;
}

.S9YW7W_updateAnnouncement {
  white-space: pre-line;
  overflow-wrap: anywhere;
}

.S9YW7W_updateDialog .S9YW7W_actions {
  margin-top: 12px;
}

.S9YW7W_updateDialog a {
  color: var(--dsw-alias-link);
  text-underline-offset: 2px;
}

.S9YW7W_authorization {
  height: auto;
  max-height: min(var(--whale-content-limit, 60vh),var(--whale-visible-content, 60vh));
}

.S9YW7W_authorization .S9YW7W_settingsHeader {
  min-height: 42px;
  padding: 0 0 10px;
}

.S9YW7W_authorization .S9YW7W_settingsHeader h2 {
  flex: 1;
  font-size: 16px;
}

.S9YW7W_authorizationBody {
  overscroll-behavior: contain;
  flex: 1;
  min-height: 0;
  padding-right: 6px;
  overflow-y: auto;
}

.S9YW7W_authorizationActions {
  border-top: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  padding: 10px 0 0;
}

.S9YW7W_authorizationBody > [data-whale-natural-content] {
  display: flow-root;
}

.S9YW7W_permissionList {
  gap: 0;
  margin: 12px 0;
  padding: 0;
  list-style: none;
  display: grid;
}

.S9YW7W_permissionList li {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  padding: 10px 0;
}

.S9YW7W_permissionList p {
  margin: 3px 0 0;
}

.S9YW7W_permissionList strong {
  font-size: 13px;
}

.S9YW7W_sessionTitle {
  overflow-wrap: anywhere;
}

.S9YW7W_sessionRename {
  gap: 6px;
  margin-top: 8px;
  display: grid;
}

.S9YW7W_existingSessionHome {
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

.S9YW7W_existingSessionHome svg {
  flex: none;
  width: 12px;
  height: 12px;
}

.S9YW7W_existingSessionHome:disabled {
  opacity: 1;
  box-shadow: none;
  cursor: default;
}

.S9YW7W_existingSessionHome:disabled > svg {
  visibility: hidden;
}

.S9YW7W_currentDshTarget {
  gap: 4px;
  min-width: 0;
  display: grid;
}

.S9YW7W_currentDshAction {
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

.S9YW7W_currentDshAction > :first-child {
  white-space: nowrap;
  flex: none;
}

.S9YW7W_currentDshAction > :last-child {
  min-width: 0;
  color: var(--dsw-alias-label-secondary);
  text-align: right;
}

.S9YW7W_currentDshTarget > p {
  margin: 0;
}

.S9YW7W_inputCaptions {
  overscroll-behavior: contain;
  min-width: 0;
  max-height: 168px;
  margin: 0;
  padding: 0 6px;
  list-style: none;
  overflow: auto;
}

.S9YW7W_inputCaption {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 6px;
  padding: 4px 0;
  display: grid;
}

.S9YW7W_inputCaption + .S9YW7W_inputCaption {
  border-top: 1px solid var(--dsw-alias-border-l2);
}

.S9YW7W_inputCaption p {
  margin: 0;
}

.S9YW7W_inputCaptionText {
  overflow-wrap: anywhere;
  white-space: pre-wrap;
  user-select: text;
  font-size: 13px;
  line-height: 18px;
}

.S9YW7W_inputCaptionReceipt {
  color: var(--dsw-alias-label-secondary);
  align-items: baseline;
  gap: 4px;
  font-size: 11px;
  line-height: 16px;
  display: flex;
}

.S9YW7W_inputCaptionReceipt > :first-child {
  flex: none;
}

.S9YW7W_inputCaption button {
  height: 26px;
  min-height: 26px;
  padding: 0 6px;
  font-size: 12px;
}

.S9YW7W_existingSessionTarget > p {
  margin: 4px 0;
}

.S9YW7W_existingSessionPicker {
  gap: 8px;
  min-width: 0;
  margin-top: 10px;
  display: grid;
}

.S9YW7W_existingSessionSearch {
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 6px;
  display: grid;
}

.S9YW7W_existingSessionSearch input::placeholder {
  color: var(--dsw-alias-label-secondary);
  opacity: 1;
}

.S9YW7W_existingSessionList {
  max-height: clamp(96px, 26vh, 224px);
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: auto;
}

.S9YW7W_existingSessionList li {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
}

.S9YW7W_existingSessionList label {
  cursor: pointer;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: start;
  gap: 6px;
  padding: 6px 4px;
  display: grid;
}

.S9YW7W_existingSessionList label:has(input:disabled) {
  cursor: default;
}

.S9YW7W_existingSessionList label:has(input:checked) {
  background: var(--dsw-alias-interactive-bg-active);
}

.S9YW7W_existingSessionList input {
  accent-color: var(--dsw-alias-brand-primary);
  margin-top: 3px;
}

.S9YW7W_existingSessionList label span.S9YW7W_hint {
  overflow-wrap: anywhere;
  margin: 3px 0 0;
  display: block;
}

.S9YW7W_performanceChoice {
  line-height: 1.1;
}

.S9YW7W_performanceChoice small {
  white-space: nowrap;
  font-size: .85em;
}

.S9YW7W_floating [data-whale-setup] {
  min-height: 0;
}

.S9YW7W_floating :is(button, input, select, textarea, summary, a) {
  touch-action: manipulation;
}

.S9YW7W_floating button {
  transition: background-color .12s, color .12s;
}

.S9YW7W_floating :is(button, input, select, summary, a):focus-visible, .S9YW7W_floating:focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

.S9YW7W_spin {
  animation: .7s linear infinite S9YW7W_whaleSpin;
}

.S9YW7W_mark[data-state="authorized"], .S9YW7W_markSmall[data-state="authorized"] {
  color: var(--dsw-alias-brand-primary);
}

.S9YW7W_mark[data-state="unknown"], .S9YW7W_markSmall[data-state="unknown"] {
  color: var(--dsw-alias-state-warn-primary);
}

.S9YW7W_mark[data-state="input-active"], .S9YW7W_markSmall[data-state="input-active"] {
  color: var(--dsw-alias-brand-primary);
  animation: 1.35s ease-in-out infinite S9YW7W_whaleBreathe;
}

.S9YW7W_mark[data-state="pending"], .S9YW7W_markSmall[data-state="pending"] {
  color: var(--dsw-alias-label-secondary);
}

[data-motion="firm"].S9YW7W_floating {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="off"].S9YW7W_floating, [data-motion="off"].S9YW7W_floating * {
  transition: none !important;
  animation: none !important;
}

@keyframes S9YW7W_whaleEnter {
  from {
    opacity: .4;
    transform: translateY(3px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes S9YW7W_whalePreview {
  from {
    transform: scale(.88);
  }

  to {
    transform: scale(1);
  }
}

@keyframes S9YW7W_whaleSpin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes S9YW7W_whaleBreathe {
  0%, 100% {
    opacity: .65;
  }

  50% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .S9YW7W_floating, .S9YW7W_floating * {
    transition: none !important;
    animation: none !important;
  }
}

@media (width <= 520px), (height <= 560px) {
  .S9YW7W_settingsLayout {
    grid-template-rows: auto minmax(0, 1fr);
    grid-template-columns: minmax(0, 1fr);
  }

  .S9YW7W_settingsNav {
    border-right: 0;
    border-bottom: 1px solid var(--dsw-alias-border-l2);
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 2px;
    padding: 5px 8px;
    display: grid;
    overflow: hidden;
  }

  .S9YW7W_settingsNav button {
    justify-content: center;
    height: 30px;
    min-height: 30px;
    padding: 0 2px;
  }

  .S9YW7W_settingsNav button[aria-pressed="true"] {
    box-shadow: inset 0 -2px 0 var(--dsw-alias-brand-primary);
  }

  .S9YW7W_settingsHeader {
    gap: 3px;
    min-height: 44px;
    padding: 5px 8px;
  }

  .S9YW7W_backButton, .S9YW7W_guideButton {
    padding: 0 5px;
  }

  .S9YW7W_settingsBrand {
    gap: 4px;
  }

  .S9YW7W_settingsBrand .S9YW7W_markSmall {
    display: none;
  }

  .S9YW7W_pageHeading {
    padding: 10px 12px 8px;
  }

  .S9YW7W_pageHeading p {
    display: none;
  }

  .S9YW7W_settingsBody {
    padding: 4px 12px 12px;
  }

  .S9YW7W_modelNav {
    margin-bottom: 8px;
    padding: 0 10px 7px;
  }

  .S9YW7W_editNotice {
    flex-wrap: wrap;
  }

  .S9YW7W_editNotice button {
    width: 100%;
  }
}

@media (height <= 420px) {
  .S9YW7W_settingsHeader {
    height: 36px;
    min-height: 36px;
    padding: 2px 8px;
  }

  .S9YW7W_settingsHeader button {
    height: 30px;
    min-height: 30px;
  }

  .S9YW7W_settingsNav {
    padding: 2px 8px;
  }

  .S9YW7W_settingsNav button {
    height: 28px;
    min-height: 28px;
  }

  .S9YW7W_pageHeading {
    box-sizing: border-box;
    min-height: 32px;
    padding: 2px 12px;
  }

  .S9YW7W_pageHeading .S9YW7W_iconButton {
    width: 28px;
    min-width: 28px;
    height: 28px;
  }

  .S9YW7W_modelNav {
    margin-bottom: 4px;
    padding: 0 10px 3px;
  }

  .S9YW7W_modelNav button {
    height: 28px;
    min-height: 28px;
  }
}

@media (pointer: coarse) {
  .S9YW7W_field input, .S9YW7W_deviceSelect {
    font-size: 16px;
  }
}

@media (forced-colors: active) {
  .S9YW7W_floating, .S9YW7W_popover {
    outline: 1px solid canvastext;
  }

  .S9YW7W_settingsNav button[aria-pressed="true"], .S9YW7W_modelNav button[aria-pressed="true"] {
    outline: 2px solid highlight;
  }
}

.S9YW7W_floating[data-view="home"] .S9YW7W_panelViewport, .S9YW7W_floating[data-collapsed] .S9YW7W_panelViewport {
  overflow: hidden;
}

.S9YW7W_floating[data-view="home"]:not([data-collapsed]) {
  padding: 10px;
}

.S9YW7W_panelContent {
  flex-direction: column;
  gap: 4px;
  height: 100%;
  min-height: 0;
  display: flex;
}

.S9YW7W_panelContent > :not(.S9YW7W_quickConversation) {
  flex: none;
}

.S9YW7W_panelContent > .S9YW7W_homeTargetPicker {
  flex: 1 1 0;
  min-height: 0;
  padding: 2px;
  display: flex;
}

.S9YW7W_homeTargetPicker > .S9YW7W_existingSessionPicker {
  flex-direction: column;
  flex: 1;
  margin-top: 0;
  display: flex;
}

.S9YW7W_homeTargetPicker .S9YW7W_existingSessionList {
  overscroll-behavior: contain;
  flex: auto;
  min-height: 0;
  max-height: none;
}

.S9YW7W_homeTargetRow {
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

.S9YW7W_homeTargetRow:disabled {
  opacity: 1;
  cursor: default;
  color: var(--dsw-alias-label-secondary);
}

.S9YW7W_homeTargetRow .S9YW7W_hint {
  overflow-wrap: anywhere;
}

.S9YW7W_homeTargetPicker :is(.S9YW7W_existingSessionSearch, .S9YW7W_actions) {
  flex: none;
}

.S9YW7W_homeTargetPicker .S9YW7W_actions {
  margin-top: auto;
}

.S9YW7W_homeTargetPicker .S9YW7W_hint {
  margin: 0;
}

.S9YW7W_panelContent > .S9YW7W_header {
  height: 28px;
  min-height: 28px;
  margin: 0;
}

.S9YW7W_panelContent .S9YW7W_header .S9YW7W_iconButton {
  width: 28px;
  min-width: 28px;
  height: 28px;
}

.S9YW7W_panelContent > .S9YW7W_statusRow {
  box-sizing: border-box;
  min-height: 24px;
  margin: 0;
  padding: 2px 6px;
}

.S9YW7W_panelContent > .S9YW7W_hint {
  margin: 0;
  font-size: 12px;
  line-height: 18px;
}

.S9YW7W_panelContent > .S9YW7W_error {
  margin: 0;
  padding: 4px 8px;
  line-height: 18px;
}

.S9YW7W_panelContent .S9YW7W_quickSpeed {
  gap: 3px;
  padding-top: 0;
}

.S9YW7W_panelContent .S9YW7W_quickSpeedHeader {
  line-height: 18px;
}

.S9YW7W_panelContent .S9YW7W_quickHint {
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 16px;
  overflow: hidden;
}

.S9YW7W_panelContent .S9YW7W_quickHint p {
  text-overflow: ellipsis;
  margin: 0;
  line-height: 16px;
  overflow: hidden;
}

.S9YW7W_panelContent > .S9YW7W_caption {
  box-sizing: border-box;
  height: 30px;
  min-height: 30px;
  margin: 0;
  padding: 4px 8px;
  line-height: 18px;
}

.S9YW7W_panelContent > .S9YW7W_quickConversation {
  flex-direction: column;
  flex: 1 1 0;
  min-height: 0;
  max-height: none;
  margin: 0;
  padding: 8px;
  display: flex;
  overflow: hidden;
}

.S9YW7W_quickConversation .S9YW7W_popoverHeader {
  flex: none;
  min-height: 28px;
  margin-bottom: 6px;
}

.S9YW7W_quickConversation .S9YW7W_recentMessages {
  overscroll-behavior: contain;
  min-height: 0;
  overflow-y: auto;
}

.S9YW7W_floating[data-compact-height="true"] .S9YW7W_panelContent {
  gap: 2px;
}

.S9YW7W_floating[data-compact-height="true"] :is(.S9YW7W_voiceTarget, .S9YW7W_existingSessionHome) > span {
  font-size: 10px;
}

.S9YW7W_floating[data-compact-height="true"] .S9YW7W_voiceTarget strong {
  font-size: 12px;
}

.S9YW7W_floating[data-compact-height="true"] .S9YW7W_statusRow[data-bound] .S9YW7W_status {
  line-height: 16px;
}

.S9YW7W_floating[data-compact-height="true"] .S9YW7W_existingSessionHome {
  height: 20px;
  min-height: 20px;
}

.S9YW7W_floating[data-compact-height="true"] .S9YW7W_inputCaptions {
  max-height: max(42px,calc(var(--whale-content-limit) - 137px));
}

.S9YW7W_floating[data-compact-height="true"] [data-has-input-caption] > .S9YW7W_audioDevices, .S9YW7W_floating[data-compact-height="true"] .S9YW7W_panelContent:has(.S9YW7W_currentDshTarget) > :is(.S9YW7W_audioDevices, .S9YW7W_quickSpeed), .S9YW7W_floating[data-compact-height="true"] .S9YW7W_panelContent > .S9YW7W_hint:not([data-home-important]), .S9YW7W_floating[data-compact-height="true"] .S9YW7W_panelContent .S9YW7W_quickSpeedHeader, .S9YW7W_floating[data-compact-height="true"] .S9YW7W_panelContent .S9YW7W_quickHint {
  display: none;
}

.S9YW7W_floating[data-compact-height="true"] .S9YW7W_quickActions {
  grid-template-columns: minmax(65px, .9fr) minmax(0, 2.1fr);
  align-items: center;
  gap: 4px;
}

.S9YW7W_floating[data-compact-height="true"] .S9YW7W_quickActions .S9YW7W_mainAction {
  white-space: normal;
  height: 30px;
  min-height: 30px;
  padding-inline: 4px;
  font-size: 12px;
  line-height: 1.15;
}

.S9YW7W_floating[data-compact-height="true"] .S9YW7W_quickActions .S9YW7W_quickSegments {
  padding: 2px;
}

.S9YW7W_floating[data-compact-height="true"] .S9YW7W_quickActions .S9YW7W_quickSegments button {
  white-space: nowrap;
  padding-inline: 1px;
  font-size: 11px;
}

.S9YW7W_floating[data-compact-height="true"] .S9YW7W_panelContent[data-size-detail="true"] > .S9YW7W_quickSpeed {
  display: none;
}

.S9YW7W_settingsBody {
  container-type: inline-size;
}

.S9YW7W_section > button {
  justify-self: start;
  max-width: 100%;
}

.S9YW7W_settingsBody button {
  white-space: normal;
  overflow-wrap: anywhere;
  height: auto;
  min-height: 36px;
}

.S9YW7W_settingsBody :is(.S9YW7W_actions, .S9YW7W_segmented, .S9YW7W_formActions) > button {
  flex: 0 auto;
}

.S9YW7W_inlineActions, .S9YW7W_inlineField, .S9YW7W_volumeRow, .S9YW7W_volumeControl {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.S9YW7W_inlineField {
  font-size: 12px;
}

.S9YW7W_inlineField .S9YW7W_deviceSelect {
  text-overflow: ellipsis;
  flex: 0 180px;
  width: 180px;
  max-width: 100%;
}

.S9YW7W_inlineField input[type="number"] {
  width: 80px;
}

.S9YW7W_fullName {
  color: var(--dsw-alias-label-secondary);
  min-width: 0;
  font-size: 12px;
}

.S9YW7W_fullName summary {
  padding: 2px 0;
  font-size: 12px;
  font-weight: 400;
}

.S9YW7W_fullName p {
  overflow-wrap: anywhere;
  margin-top: 4px;
}

.S9YW7W_disclosureRow {
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 8px;
  display: flex;
}

.S9YW7W_disclosureRow > details.S9YW7W_section {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  flex: 0 auto;
  min-width: 0;
  padding: 0 10px;
}

.S9YW7W_disclosureRow > details.S9YW7W_section > summary {
  min-height: 20px;
  padding: 7px 0;
}

.S9YW7W_disclosureRow > details[open].S9YW7W_section {
  flex: 100%;
  padding-bottom: 10px;
}

.S9YW7W_volumeControl {
  flex-wrap: nowrap;
  flex: 0 260px;
}

.S9YW7W_volumeControl input[type="range"] {
  width: 210px;
  min-width: 80px;
  max-width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
  flex: 210px;
}

.S9YW7W_volumeControl span {
  text-align: right;
  flex: none;
  min-width: 3em;
  font-size: 12px;
}

.S9YW7W_field:has( > input[type="number"]) {
  flex-wrap: wrap;
  align-items: center;
  display: flex;
}

.S9YW7W_field > input[type="number"] {
  width: 80px;
}

.S9YW7W_authorizationSteps {
  color: var(--dsw-alias-label-secondary);
  margin: 8px 0 12px;
  font-size: 12px;
}

.S9YW7W_agreement {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  gap: 14px;
  padding: 14px;
  font-size: 13px;
  line-height: 1.6;
  display: grid;
}

.S9YW7W_agreement p {
  margin: 0;
}

.S9YW7W_authorizationBody h3 {
  margin: 0 0 10px;
  font-size: 15px;
}

.S9YW7W_authorizationActions button {
  flex: 0 auto;
  min-height: 36px;
}

@container (width <= 340px) {
  .S9YW7W_inlineActions {
    align-items: flex-start;
  }

  .S9YW7W_inlineField .S9YW7W_deviceSelect {
    flex-basis: 160px;
    width: 160px;
  }

  .S9YW7W_volumeControl {
    flex-basis: 200px;
  }

  .S9YW7W_volumeControl input[type="range"] {
    width: 150px;
  }
}

.S9YW7W_audioDevices {
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  display: flex;
}

.S9YW7W_audioDeviceGrid {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 8px;
  display: grid;
}

.S9YW7W_audioDeviceField {
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  font-size: 12px;
  display: flex;
}

.S9YW7W_audioDeviceField > span {
  align-items: center;
  gap: 4px;
  line-height: 18px;
  display: flex;
}

.S9YW7W_audioDeviceField svg {
  flex: none;
  width: 14px;
  height: 14px;
}

.S9YW7W_audioDeviceField select {
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

.S9YW7W_audioDeviceField select[data-device-missing] {
  border-color: #b80;
}

.S9YW7W_audioDeviceHint, .S9YW7W_audioDeviceNotice {
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  font-size: 11px;
  line-height: 16px;
  overflow: hidden;
}

.S9YW7W_audioDeviceHint {
  color: var(--dsw-alias-label-secondary);
}

.S9YW7W_audioDeviceNotice {
  color: #805500;
}

[data-ds-dark-theme] .S9YW7W_audioDeviceNotice {
  color: #ffd277;
}

[data-ds-dark-theme] .S9YW7W_audioDeviceField select {
  color-scheme: dark;
}

.S9YW7W_floating[data-compact-height="true"] .S9YW7W_audioDeviceField > span {
  font-size: 11px;
  line-height: 14px;
}

.S9YW7W_floating[data-compact-height="true"] .S9YW7W_audioDeviceField select {
  height: 26px;
}

.S9YW7W_floating[data-compact-height="true"] .S9YW7W_audioDeviceHint, .S9YW7W_floating[data-compact-height="true"] .S9YW7W_audioDeviceNotice, .S9YW7W_floating[data-compact-height="true"] .S9YW7W_panelContent:has( > [data-home-important]) .S9YW7W_audioDeviceField > span {
  display: none;
}

.S9YW7W_pageHeading.S9YW7W_modelHeading {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  justify-content: flex-start;
  gap: 10px;
  min-height: 40px;
  margin-bottom: 6px;
  padding: 5px 12px;
}

.S9YW7W_modelHeading h3 {
  white-space: nowrap;
  font-size: 13px;
}

.S9YW7W_modelHeading .S9YW7W_modelNav {
  border: 0;
  flex: 1;
  gap: 3px;
  min-width: 0;
  margin: 0;
  padding: 0;
}

.S9YW7W_modelHeading .S9YW7W_modelNav button {
  white-space: nowrap;
  flex: 0 auto;
  height: 28px;
  min-height: 28px;
  padding: 0 6px;
}

.S9YW7W_currentModel {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  display: flex;
}

.S9YW7W_pathRow {
  grid-template-columns: 95px minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  font-size: 12px;
  display: grid;
}

.S9YW7W_pathRow > span {
  min-width: 0;
}

.S9YW7W_editNotice {
  margin-bottom: 7px;
  padding: 5px 8px;
}

.S9YW7W_editNotice span {
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
}

.S9YW7W_editNotice button {
  height: auto;
  min-height: 30px;
}

@media (width <= 360px) {
  .S9YW7W_pageHeading.S9YW7W_modelHeading {
    gap: 5px;
    padding: 5px 8px;
  }

  .S9YW7W_modelHeading .S9YW7W_modelNav button {
    padding: 0 3px;
    font-size: 11px;
  }

  .S9YW7W_pathRow {
    grid-template-columns: minmax(0, 1fr);
    gap: 4px;
  }
}

.S9YW7W_pathRow {
  display: block;
}

.S9YW7W_pathRow > div:first-child {
  flex-wrap: nowrap !important;
}

.S9YW7W_pathRow > div:first-child > label {
  flex: 1;
  grid-template-columns: 95px minmax(0, 1fr);
  display: grid !important;
}

.S9YW7W_pathRow input {
  width: 100% !important;
}

.S9YW7W_pathRow button {
  flex: none;
  min-height: 32px;
}

@media (width <= 420px) {
  .S9YW7W_pathRow > div:first-child {
    flex-wrap: wrap !important;
  }

  .S9YW7W_pathRow > div:first-child > label {
    grid-template-columns: 80px minmax(0, 1fr);
    min-width: 180px !important;
  }
}

.S9YW7W_floating :is(button, select, input, textarea, summary, a), .S9YW7W_settings :is(button, select, input, summary, a) {
  transition: background-color .12s ease-out,border-color .12s ease-out,color .12s ease-out,box-shadow .12s ease-out,transform var(--whale-duration, .2s) var(--whale-ease, ease-out);
}

.S9YW7W_floating :is(button, summary):hover:not(:disabled) {
  background-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,var(--dsw-alias-bg-layer-1));
}

.S9YW7W_floating button:active:not(:disabled), .S9YW7W_settings button:active:not(:disabled) {
  transform: scale(.97);
}

.S9YW7W_floating :is(input, select, textarea):hover:not(:disabled) {
  border-color: var(--dsw-alias-brand-primary);
}

.S9YW7W_radios label {
  transition: background-color .12s, border-color .12s, box-shadow .12s;
}

.S9YW7W_radios label:has(input:checked) {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,transparent);
}

.S9YW7W_authorizationBody, .S9YW7W_settingsLayout, .S9YW7W_panelContent > .S9YW7W_header, .S9YW7W_settingsBody > div:not([hidden]), .S9YW7W_section > div:not([hidden])[data-whale-tab-panel], .S9YW7W_floating [role="tabpanel"]:not([hidden]) {
  animation: S9YW7W_whalePageEnter var(--whale-duration, .2s) ease-out;
}

.S9YW7W_floating :is([role="menu"], [role="listbox"]), .S9YW7W_floating [data-whale-dropdown] {
  transform-origin: top;
  animation: .12s ease-out S9YW7W_whalePageEnter;
}

.S9YW7W_floating [data-whale-save-result] {
  animation: .16s ease-out S9YW7W_whaleFeedback;
}

.S9YW7W_floating summary {
  list-style: none;
}

.S9YW7W_floating summary::-webkit-details-marker {
  display: none;
}

.S9YW7W_floating summary:before {
  content: "\u203A";
  width: 1em;
  transition: transform .16s ease-out;
  display: inline-block;
  transform: rotate(0);
}

.S9YW7W_floating details[open] > summary:before {
  transform: rotate(90deg);
}

.S9YW7W_floating details[open] > :not(summary) {
  animation: .16s ease-out S9YW7W_whalePageEnter;
}

@supports (interpolate-size: allow-keywords) {
  .S9YW7W_floating details {
    interpolate-size: allow-keywords;
  }

  .S9YW7W_floating details::details-content {
    block-size: 0;
    transition: block-size .16s ease-out,content-visibility .16s allow-discrete;
    overflow: clip;
  }

  .S9YW7W_floating details[open]::details-content {
    block-size: auto;
  }
}

@keyframes S9YW7W_whalePageEnter {
  from {
    translate: 0 4px;
  }

  to {
    translate: 0;
  }
}

@keyframes S9YW7W_whaleFeedback {
  from {
    opacity: .5;
  }

  to {
    opacity: 1;
  }
}

[data-motion="firm"].S9YW7W_floating, [data-motion="firm"].S9YW7W_settings {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="firm"].S9YW7W_floating details::details-content, [data-motion="firm"].S9YW7W_floating summary:before {
  transition-duration: .1s;
}

[data-motion="off"].S9YW7W_floating *, [data-motion="off"].S9YW7W_settings *, [data-motion="off"].S9YW7W_floating :before, [data-motion="off"].S9YW7W_floating details::details-content {
  transition: none !important;
  animation: none !important;
}

[data-motion="off"].S9YW7W_floating button:active, [data-motion="off"].S9YW7W_settings button:active {
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .S9YW7W_floating *, .S9YW7W_settings *, .S9YW7W_floating :before, .S9YW7W_floating details::details-content {
    transition: none !important;
    animation: none !important;
  }

  .S9YW7W_floating button:active, .S9YW7W_settings button:active {
    transform: none;
  }
}

.S9YW7W_conversationChoice {
  gap: 6px;
  min-width: 0;
  display: grid;
  position: relative;
}

.S9YW7W_conversationChoice > button {
  text-align: left;
  justify-content: space-between;
  width: 100%;
  min-width: 0;
}

.S9YW7W_conversationOptions {
  overscroll-behavior: contain;
  gap: 3px;
  min-width: 0;
  max-height: 220px;
  padding: 6px;
  animation: .12s ease-out S9YW7W_whalePageEnter;
  display: grid;
  overflow: auto;
}

.S9YW7W_conversationOptions [role="option"] {
  text-align: left;
  border-radius: var(--dsw-radius-sm);
  justify-content: space-between;
  width: 100%;
  min-width: 0;
  padding: 7px 10px;
  transition: background-color .12s ease-out, color .12s ease-out;
}

.S9YW7W_conversationOptions [role="option"][aria-selected="true"] {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 18%,var(--dsw-alias-bg-layer-1));
  font-weight: 600;
}

.S9YW7W_conversationOptions [role="option"]:is(:hover, :focus-visible) {
  background: var(--dsw-alias-interactive-bg-active);
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: -2px;
}

.S9YW7W_conversationOptions [role="option"] small {
  color: var(--dsw-alias-label-secondary);
}

.S9YW7W_settings [data-whale-tab-panel]:not([hidden]) {
  animation: S9YW7W_whalePageEnter var(--whale-duration, .2s) ease-out;
}

.S9YW7W_modelHeading .S9YW7W_modelNav {
  scrollbar-width: thin;
  overflow-x: auto;
}

.S9YW7W_modelHeading .S9YW7W_modelNav button {
  flex-shrink: 0;
}

[data-motion="off"].S9YW7W_settings [data-whale-tab-panel] {
  animation: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .S9YW7W_settings [data-whale-tab-panel] {
    animation: none !important;
  }
}

.S9YW7W_panelContent, .S9YW7W_bubble {
  animation: none;
}

.S9YW7W_panelContent {
  height: auto;
}

.S9YW7W_panelContent[data-size-detail="true"] {
  height: 100%;
}

.S9YW7W_panelContent .S9YW7W_quickSegments {
  background: none;
  gap: 6px;
  padding: 0;
}

.S9YW7W_panelContent .S9YW7W_quickSegments button {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 8px;
  gap: 4px;
  height: 34px;
  min-height: 34px;
}

.S9YW7W_panelContent .S9YW7W_quickSegments button[aria-pressed="true"] {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 22%,var(--dsw-alias-bg-layer-1));
  box-shadow: inset 0 0 0 1px var(--dsw-alias-brand-primary);
}

.S9YW7W_panelContent .S9YW7W_quickSegments svg {
  width: 15px;
  height: 15px;
}

.S9YW7W_panelContent > .S9YW7W_quickConversation {
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

.S9YW7W_conversationHeader {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  font-size: 12px;
  display: flex;
}

.S9YW7W_conversationHeader > div {
  align-items: center;
  gap: 2px;
  display: flex;
}

.S9YW7W_conversationHeader button:not(.S9YW7W_iconButton), .S9YW7W_assistantName, .S9YW7W_loadHistory {
  color: inherit;
  font: inherit;
  cursor: pointer;
  background: none;
  border: 0;
  border-radius: 4px;
  padding: 3px;
}

.S9YW7W_conversationHeader .S9YW7W_iconButton {
  width: 26px;
  min-width: 26px;
  height: 28px;
}

.S9YW7W_historyScope {
  color: var(--dsw-alias-label-secondary);
  flex: none;
  margin: 2px 0;
  font-size: 10px;
  line-height: 14px;
}

.S9YW7W_quickConversation .S9YW7W_recentMessages {
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

.S9YW7W_message {
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

.S9YW7W_message[data-role="user"] {
  align-self: flex-end;
  align-items: flex-end;
}

.S9YW7W_messageName {
  min-height: 19px;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  line-height: 17px;
}

.S9YW7W_assistantName {
  overflow-wrap: anywhere;
  max-width: 100%;
  min-height: 19px;
  padding: 0 2px;
  font-size: 11px;
  line-height: 17px;
}

.S9YW7W_assistantName:hover {
  color: var(--dsw-alias-label-primary);
  text-underline-offset: 3px;
  text-decoration: underline;
}

.S9YW7W_assistantNameInput {
  box-sizing: border-box;
  width: 140px;
  min-width: 60px;
  max-width: 160px;
  height: 23px !important;
  min-height: 23px !important;
  padding: 1px 5px !important;
  font-size: 12px !important;
}

.S9YW7W_message p {
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

.S9YW7W_message[data-role="user"] p {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 28%,var(--dsw-alias-bg-layer-1));
  border-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 45%,var(--dsw-alias-border-l2));
}

.S9YW7W_message small {
  color: var(--dsw-alias-label-secondary);
  font-size: 10px;
}

.S9YW7W_loadHistory {
  align-self: center;
  padding: 5px;
  font-size: 11px;
}

.S9YW7W_newMessages {
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

.S9YW7W_bubble {
  gap: 6px;
  padding: 0 7px;
  font-size: 11px;
}

.S9YW7W_bubbleBrand {
  flex: none;
  font-size: 12px;
  font-weight: 600;
}

.S9YW7W_bubbleStatus {
  white-space: nowrap;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 3px;
  min-width: 0;
  display: flex;
}

.S9YW7W_bubbleStatus svg {
  flex: none;
  width: 15px;
  height: 15px;
}

.S9YW7W_bubble > svg:last-child {
  flex: none;
  width: 14px;
  height: 14px;
}

.S9YW7W_voiceBars {
  align-items: center;
  gap: 2px;
  height: 16px;
  display: flex;
}

.S9YW7W_voiceBars i {
  background: var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary));
  opacity: .5;
  border-radius: 1px;
  width: 3px;
  height: 13px;
  transform: scaleY(.31);
}

.S9YW7W_voiceBars[data-active="true"] i {
  background: var(--dsw-alias-brand-primary);
  opacity: 1;
  animation: .7s ease-in-out infinite alternate S9YW7W_whaleInputPulse;
}

.S9YW7W_voiceBars[data-active="true"] i:nth-child(2n) {
  animation-delay: -.3s;
}

.S9YW7W_voiceBars[data-active="true"] i:nth-child(3) {
  animation-delay: -.5s;
}

@keyframes S9YW7W_whaleInputPulse {
  from {
    transform: scaleY(.38);
  }

  to {
    transform: scaleY(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .S9YW7W_voiceBars[data-active="true"] i {
    animation: none;
    transform: scaleY(.69);
  }
}

.S9YW7W_floating[data-motion="off"] .S9YW7W_voiceBars[data-active="true"] i {
  animation: none;
  transform: scaleY(.69);
}

@media (forced-colors: active) {
  .S9YW7W_message p {
    border: 1px solid canvastext;
  }

  .S9YW7W_quickSegments button[aria-pressed="true"] {
    outline: 2px solid highlight;
  }

  .S9YW7W_voiceBars i {
    background: canvastext;
  }
}

.S9YW7W_voicePrompt {
  flex-direction: column;
  gap: 8px;
  display: flex;
}

.S9YW7W_voicePrompt label {
  font-size: 13px;
  font-weight: 600;
}

.S9YW7W_voicePrompt label span {
  margin-left: 10px;
  font-weight: 400;
}

.S9YW7W_voicePromptInput {
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

.S9YW7W_voicePromptInput::placeholder {
  color: var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary));
  opacity: 1;
}

.S9YW7W_voicePromptInput:disabled {
  opacity: .65;
  cursor: not-allowed;
}

.S9YW7W_voicePromptInput:focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: 2px;
}

.S9YW7W_voicePromptCount {
  text-align: right;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
}

.S9YW7W_voicePromptActions {
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  display: flex;
}

.S9YW7W_voicePromptActions .S9YW7W_actions {
  margin: 0;
}

.S9YW7W_voicePromptMode {
  color: var(--dsw-alias-state-success-primary, var(--dsw-alias-label-secondary));
  white-space: nowrap;
  font-size: 11px;
}

.S9YW7W_voicePromptMode:before {
  content: "\u2022";
  margin-right: 5px;
}
`};var de=require("react/jsx-runtime");function at({small:e=!1,state:n="idle"}){return(0,de.jsx)("svg",{viewBox:"0 0 1024 1024","data-state":n,className:e?h.markSmall:h.mark,"aria-hidden":"true",children:(0,de.jsx)("path",{fill:"currentColor",d:"M 920.377 65.087 C 928.064 63.083 932.973 107.434 932.987 114.072 C 933.092 165.045 924.256 210.594 901.365 256.376 C 855.379 348.348 758.325 392.662 681.124 453.829 C 619.898 502.339 580.980 567.068 558.933 641.286 C 543.187 694.296 538.293 750.695 527.468 804.833 C 520.391 840.227 514.008 874.928 493.687 905.451 C 474.447 934.348 431.832 972.135 393.948 957.487 C 358.248 943.683 373.787 884.228 380.635 856.964 C 401.585 773.552 460.283 657.712 419.105 573.931 C 381.383 497.183 304.815 488.756 234.259 458.353 C 195.522 441.661 157.383 413.822 133.190 378.905 C 115.301 353.087 100.999 326.148 94.423 295.130 C 93.358 290.109 88.245 266.804 93.252 264.337 C 93.759 264.087 133.145 277.445 138.791 278.433 C 174.563 284.693 209.339 281.307 245.016 275.980 C 288.094 269.548 333.679 260.367 376.940 270.872 C 414.858 280.080 448.414 297.981 474.046 327.930 C 483.707 339.219 491.970 352.034 498.604 365.302 C 499.492 367.078 503.519 377.817 505.784 377.367 C 506.966 377.132 507.537 375.084 507.926 374.169 C 513.160 361.862 518.091 349.606 524.078 337.631 C 541.287 303.214 562.597 270.184 592.119 244.919 C 633.676 209.352 683.585 187.330 735.895 172.601 C 770.712 162.797 806.633 155.544 838.984 138.655 C 862.849 126.195 882.544 110.622 901.022 91.328 C 905.036 87.137 916.896 65.995 920.377 65.087 Z"})})}var _d=()=>({pet:(0,de.jsxs)(de.Fragment,{children:[(0,de.jsx)("path",{d:"M5 11c-2-8 4-10 7-8 5-2 9 2 7 8M5 10l4-4 3 3 3-3 4 4v5c0 4-3 6-7 6s-7-2-7-6v-5Z"}),(0,de.jsx)("path",{d:"M8 13v2m8-2v2m-6 3h4"})]}),settings:(0,de.jsxs)(de.Fragment,{children:[(0,de.jsx)("path",{d:"m9 3 1-1h4l1 1 .5 2 2 .8 2-.6 2 3-.8 1.8.2 2.2 1.3 1.5-2 3-2.1-.2-1.7 1.3-.5 2.2h-4l-.6-2.1-1.8-1.1-2 .3-2-3 1.3-1.7V10L4 8.5l2-3 2 .5L9 3Z"}),(0,de.jsx)("circle",{cx:"12",cy:"11.5",r:"3"})]}),minus:(0,de.jsx)("path",{d:"M5 12h14"}),plus:(0,de.jsx)("path",{d:"M12 5v14M5 12h14"}),down:(0,de.jsx)("path",{d:"m6 9 6 6 6-6"}),refresh:(0,de.jsxs)(de.Fragment,{children:[(0,de.jsx)("path",{d:"M20 6v5h-5M4 18v-5h5"}),(0,de.jsx)("path",{d:"M6 7a7 7 0 0 1 12-1l2 5M4 13l2 5a7 7 0 0 0 12-1"})]}),up:(0,de.jsx)("path",{d:"m6 15 6-6 6 6"}),check:(0,de.jsx)("path",{d:"m5 12 4 4L19 6"}),micOff:(0,de.jsx)(de.Fragment,{children:(0,de.jsx)("path",{d:"M9 9v3a3 3 0 0 0 5.1 2.1M15 8V6a3 3 0 0 0-5.7-1.3M6 10v2a6 6 0 0 0 10.2 4.3M18 12v-2M12 18v3M9 21h6M3 3l18 18"})}),mic:(0,de.jsxs)(de.Fragment,{children:[(0,de.jsx)("rect",{x:"9",y:"3",width:"6",height:"12",rx:"3"}),(0,de.jsx)("path",{d:"M6 10v2a6 6 0 0 0 12 0v-2M12 18v3M9 21h6"})]}),volume:(0,de.jsxs)(de.Fragment,{children:[(0,de.jsx)("path",{d:"M3 9h4l5-4v14l-5-4H3Z"}),(0,de.jsx)("path",{d:"M16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"})]}),chat:(0,de.jsx)("path",{d:"M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9l-5 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"}),close:(0,de.jsx)("path",{d:"m6 6 12 12M18 6 6 18"}),search:(0,de.jsxs)(de.Fragment,{children:[(0,de.jsx)("circle",{cx:"10",cy:"10",r:"6"}),(0,de.jsx)("path",{d:"m15 15 5 5"})]}),chevron:(0,de.jsx)("path",{d:"m9 5 7 7-7 7"}),warning:(0,de.jsxs)(de.Fragment,{children:[(0,de.jsx)("path",{d:"m12 3 10 18H2L12 3Z"}),(0,de.jsx)("path",{d:"M12 9v5m0 3v.2"})]})});function Ke({name:e,className:n=""}){return(0,de.jsx)("svg",{viewBox:"0 0 24 24",width:"18",height:"18","aria-hidden":"true",className:n,fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round",children:_d()[e]??_d().chat})}var Re=require("react/jsx-runtime");function Zh({name:e,save:n,t}){let[o,i]=(0,Ge.useState)(!1),[r,s]=(0,Ge.useState)(e),a=(0,Ge.useRef)(!1),d=(0,Ge.useRef)(null),l=(0,Ge.useRef)(null),u=(0,Ge.useRef)(!1);(0,Ge.useLayoutEffect)(()=>{o?(d.current?.focus({preventScroll:!0}),d.current?.select()):u.current&&(u.current=!1,l.current?.focus({preventScroll:!0}))},[o]);let p=()=>{i(!1),s(e)},m=()=>{let f=r.trim();f&&f.length<=40&&(n?.(f),u.current=!0,i(!1))};return o?(0,Re.jsx)(gr.Input,{ref:d,className:h.assistantNameInput,"aria-label":t("assistantName"),value:r,maxLength:40,"data-no-drag":!0,onChange:f=>s(f.target.value),onCompositionStart:()=>{a.current=!0},onCompositionEnd:()=>{a.current=!1},onBlur:p,onKeyDown:f=>{f.stopPropagation(),!(a.current||f.nativeEvent.isComposing)&&(f.key==="Escape"&&(f.preventDefault(),u.current=!0,p()),f.key==="Enter"&&(f.preventDefault(),m()))}}):(0,Re.jsx)("button",{ref:l,type:"button",className:h.assistantName,"data-no-drag":!0,title:t("renameAssistant"),onClick:()=>{s(e),i(!0)},children:e})}function Sd({conversation:e,history:n,historyLoading:t,historyError:o,historyRetryCursor:i,loadHistory:r,assistantName:s,setAssistantName:a,close:d,t:l}){let[u,p]=(0,Ge.useState)(!1),[m,f]=(0,Ge.useState)(0),b=(0,Ge.useRef)(null),v=(0,Ge.useRef)(!0),w=(0,Ge.useRef)(null),k=(0,Ge.useRef)(null),P=e.rootSessionId,M=id(n?.rootSessionId===P?n.items:[],e.items),B=!v.current&&w.current?.firstId,E=B?M.findIndex(_=>_.id===B):-1,T=u?M:E>=0?M.slice(E):rd(M),z=()=>{let _=b.current;if(!_)return;let C=_.getBoundingClientRect(),N=[..._.querySelectorAll("[data-message-id]")].find(S=>S.getBoundingClientRect().bottom>=C.top);k.current=N?{id:N.dataset.messageId,offset:N.getBoundingClientRect().top-C.top}:null},$=()=>{let _=b.current;_&&(_.scrollTop=_.scrollHeight),v.current=!0,f(0),z()},W=!u&&M.filter(_=>_.role==="user").length<10&&!!n?.nextCursor;return(0,Ge.useEffect)(()=>{W&&!t&&!o&&r?.(n.nextCursor)},[W,n?.nextCursor,t,o,P]),(0,Ge.useLayoutEffect)(()=>{let _=b.current;if(!_)return;let C=w.current;if((!C||C.root!==P)&&(v.current=!0,f(0)),v.current)_.scrollTop=_.scrollHeight;else{let N=k.current,S=N&&[..._.querySelectorAll("[data-message-id]")].find(I=>I.dataset.messageId===N.id);if(S?_.scrollTop+=S.getBoundingClientRect().top-_.getBoundingClientRect().top-N.offset:C&&(_.scrollTop=Math.min(C.top,_.scrollHeight-_.clientHeight)),C){let I=e.items.filter(F=>F.at>=C.lastAt&&!C.ids.has(F.id)).length;I&&f(F=>F+I)}}w.current={root:P,firstId:T[0]?.id,top:_.scrollTop,lastAt:Math.max(0,...M.map(N=>N.at)),ids:new Set(M.map(N=>N.id))},z()},[e,n,u,m]),(0,Re.jsxs)("section",{className:h.quickConversation,"data-dropdown":"conversation","data-no-drag":!0,role:"region","aria-label":l("recentConversation"),onKeyDown:_=>{_.key==="Escape"&&(_.stopPropagation(),d())},children:[(0,Re.jsxs)("div",{className:h.conversationHeader,children:[(0,Re.jsx)("strong",{children:l(u?"allRecords":"recentTenTurns")}),(0,Re.jsxs)("div",{children:[(0,Re.jsx)("button",{type:"button",onClick:()=>{u?(v.current=!0,k.current=null,w.current=null,f(0)):z(),p(_=>!_)},children:l(u?"collapseToTen":"showAllRecords")}),(0,Re.jsx)(gr.Button,{className:h.iconButton,"aria-label":l("close"),title:l("collapseConversation"),onClick:d,children:(0,Re.jsx)(Ke,{name:"up"})})]})]}),u&&(0,Re.jsxs)("p",{className:h.historyScope,children:[l("currentVoiceRecords"),n?.truncated?" \xB7 "+l("historyTruncated"):""]}),(0,Re.jsxs)("div",{ref:b,className:h.recentMessages,"data-conversation-messages":!0,tabIndex:0,"aria-label":l("conversationMessages"),onWheel:_=>{_.deltaY<0&&(v.current=!1)},onScroll:()=>{let _=b.current;v.current=sd(_),v.current&&f(0),w.current&&(w.current.top=_.scrollTop),z()},children:[u&&n?.nextCursor&&(0,Re.jsx)("button",{className:h.loadHistory,disabled:t,onClick:()=>{z(),r?.(n.nextCursor)},children:l(t?"readingHistory":"loadEarlier")}),o&&(0,Re.jsx)("button",{className:h.loadHistory,disabled:t,onClick:()=>{r?.(i??void 0)},children:l("retryHistory")}),T.map(_=>(0,Re.jsxs)("div",{"data-message-id":_.id,"data-role":_.role,className:h.message,children:[(0,Re.jsx)("div",{className:h.messageName,children:_.role==="user"?(0,Re.jsx)("span",{children:l("you")}):(0,Re.jsx)(Zh,{name:s,save:a,t:l})}),(0,Re.jsx)("p",{children:_.text}),["speech-failed","interrupted"].includes(_.state)&&(0,Re.jsx)("small",{children:l(_.state==="speech-failed"?"speechFailed":"speechInterrupted")})]},_.id)),!T.length&&(0,Re.jsx)("p",{className:h.hint,children:l(t||W?"readingHistory":"noConversation")})]}),m>0&&(0,Re.jsxs)("button",{className:h.newMessages,onClick:$,children:[(0,Re.jsx)(Ke,{name:"down"}),m," ",l("newMessages")]})]})}var ct=require("react"),Zt=require("@deepseek-ai/dsh-client-ui-primitives"),wn=require("react/jsx-runtime");function _o({label:e,value:n,onChange:t,kind:o,pickPath:i,sessionId:r,disabled:s,active:a=!0,scope:d,className:l,placeholder:u}){let[p,m]=(0,ct.useState)(!1),[f,b]=(0,ct.useState)(null),v=typeof n=="string"?n.split(/[\\/]/).filter(Boolean).at(-1)??n:"",w=(0,ct.useRef)(null),k=(0,ct.useRef)(null),P=()=>{w.current?.abort(),w.current=null,m(!1)};(0,ct.useEffect)(()=>(P(),b(null),P),[r,s,a,d,n]);let M=async()=>{if(w.current||s||!a||!i)return;let B=new AbortController;w.current=B,m(!0),b(null);try{let E=await i(r,o,B.signal);w.current===B&&!B.signal.aborted&&!k.current?.closest("[hidden]")&&E!==null&&t(E)}catch(E){w.current===B&&!B.signal.aborted&&b(String(E?.message??E))}finally{w.current===B&&(w.current=null,m(!1))}};return(0,wn.jsxs)("div",{ref:k,className:l,"data-native-path":o,children:[(0,wn.jsxs)("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,minWidth:0},children:[(0,wn.jsxs)("label",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,minWidth:0},children:[e,(0,wn.jsx)(Zt.Input,{"aria-label":e,title:n??"",value:v,placeholder:u,disabled:s,readOnly:!0,style:{width:190,maxWidth:"100%",minWidth:0,textOverflow:"ellipsis"}})]}),(0,wn.jsx)(Zt.Button,{variant:"outline",disabled:s||!a||!i||p,onClick:()=>{M()},children:p?"\u7B49\u5F85\u9009\u62E9\u2026":o==="referenceAudio"||o==="campplus"?"\u9009\u62E9\u6587\u4EF6\u2026":"\u9009\u62E9\u6587\u4EF6\u5939\u2026"})]}),o==="campplus"&&n&&(0,wn.jsx)(Zt.Button,{variant:"outline",disabled:s,onClick:()=>{P(),t("")},children:"\u6E05\u9664\u53EF\u9009\u6A21\u578B"}),p&&(0,wn.jsx)(Zt.Button,{variant:"outline",onClick:P,children:"\u53D6\u6D88\u9009\u62E9"}),n&&(0,wn.jsxs)("details",{style:{fontSize:12,minWidth:0},children:[(0,wn.jsx)("summary",{children:"\u67E5\u770B\u5B8C\u6574\u8DEF\u5F84"}),(0,wn.jsx)("p",{style:{margin:"4px 0",overflowWrap:"anywhere"},children:n})]}),f&&(0,wn.jsx)("p",{role:"alert",children:f})]})}var Bt=require("react");var an=require("react/jsx-runtime"),So=e=>e&&typeof e=="object"?`${e.backend}:${e.id}`:e==null?"":"__legacy";function kd({state:e,sessionId:n,run:t,t:o}){let i=(0,Bt.useRef)({state:e,sessionId:n,run:t}),r=(0,Bt.useRef)(void 0);i.current={state:e,sessionId:n,run:t},(0,Bt.useEffect)(()=>{!e.settings||e.settingsFor!==n||e.busy||e.audioDevicesPending||r.current===n||(r.current=n,t(n,"read-audio-devices"))},[n,e.settingsFor,e.busy,e.audioDevicesPending]),(0,Bt.useEffect)(()=>{let m=!1,f,b=async()=>{let v=i.current;!m&&v.sessionId===n&&!v.state.busy&&!document.hidden&&(v.state.settingsFor!==n&&await v.run(n,"read-settings"),m||await v.run(n,"read-audio-devices")),m||(f=document.defaultView.setTimeout(b,1e4))};return b(),()=>{m=!0,document.defaultView.clearTimeout(f)}},[n]);let s=!!(e.settings&&e.settingsFor===n),a=s?e.settings:null,d=a?.audioDevices??{input:a?.values?.device??null,output:null},l=e.audioDevicesFor===n?e.audioDevices:null,u=e.checkedFor===n&&!e.uncertain&&e.status?.enabled===!1&&e.status?.ownerSessionId===null&&e.status?.voiceControlBusy===!1&&e.status?.voiceSession?.fullyStopped===!0&&e.status?.voiceSession?.id==null,p=[];return(0,an.jsxs)("section",{className:h.audioDevices,"aria-label":o("audioDevices"),"data-audio-device-controls":!0,"data-no-drag":!0,children:[(0,an.jsx)("div",{className:h.audioDeviceGrid,children:["input","output"].map(m=>{let f=d[m],b=l?.[m],v=So(f),w=b?.items?.some(E=>So(E)===v),k=f&&typeof f=="object"&&b&&b.status!=="unavailable"&&!w,P=f==null?o("audioSystemDefault"):typeof f=="object"?f.name:String(f),M=m==="output"&&b?.reason==="AUDIO_PLATFORM_UNSUPPORTED",B=!s||e.busy||e.uncertain||e.settingsConflict||M||m==="input"&&!u;return k&&p.push(o(m==="input"?"inputDeviceMissing":"outputDeviceMissing")),(0,an.jsxs)("label",{className:h.audioDeviceField,children:[(0,an.jsxs)("span",{children:[(0,an.jsx)(Ke,{name:m==="input"?"mic":"volume"}),o(m==="input"?"audioInput":"audioOutput")]}),(0,an.jsxs)("select",{"aria-label":o(m==="input"?"audioInput":"audioOutput"),"data-device-missing":k||void 0,title:B&&m==="input"&&!u?o("inputDeviceStopFirst"):M?o("outputDeviceUnsupported"):P,disabled:B,value:v,onFocus:()=>{e.audioDevicesPending||t(n,"read-audio-devices")},onChange:E=>{let T=E.target.value;if(T==="__legacy"||T===v)return;let z=T===""?null:b?.items?.find($=>So($)===T);z!==void 0&&t(n,"save-audio-device",{revision:a.revision,direction:m,selection:z})},children:[(0,an.jsx)("option",{value:"",children:o("audioSystemDefault")}),f!=null&&!w&&(0,an.jsxs)("option",{value:v,children:[P,k?" \xB7 "+o("deviceDisconnected"):typeof f=="object"?"":" \xB7 "+o("deviceSaved")]}),b?.items?.map(E=>(0,an.jsx)("option",{value:So(E),children:E.name},So(E)))]})]},m)})}),p.length>0?(0,an.jsx)("p",{className:h.audioDeviceNotice,role:"status",children:p.join("\uFF1B")}):e.audioDevicesError||l?.input?.status==="unavailable"||l?.output?.status==="unavailable"&&l?.output?.reason!=="AUDIO_PLATFORM_UNSUPPORTED"?(0,an.jsx)("p",{className:h.audioDeviceHint,role:"status",children:o("deviceListRetry")}):l?.output?.reason==="AUDIO_PLATFORM_UNSUPPORTED"?(0,an.jsx)("p",{className:h.audioDeviceHint,children:o("outputDeviceUnsupported")}):!u&&s?(0,an.jsx)("p",{className:h.audioDeviceHint,children:o("inputDeviceStopFirst")}):null]})}var Me=require("react"),xn=require("@deepseek-ai/dsh-client-ui-primitives");var se=require("react/jsx-runtime"),Bh={busy:"\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F",archived:"\u4F1A\u8BDD\u5DF2\u5F52\u6863",unavailable:"\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528"},bt=e=>e.title?.trim()||`\u672A\u547D\u540D\u4F1A\u8BDD \xB7 ${e.sessionId.slice(-6).toUpperCase()}`,vr=e=>Bh[e.availability],Qn=e=>["ready","busy"].includes(e?.availability),br=(e,n)=>e.checkedFor===n&&!e.uncertain&&!e.busy&&!e.ttsCancelling&&!e.existingSessionWritePending&&!e.existingSessionUnconfirmed&&e.status?.voiceControlBusy===!1&&e.status?.voiceSession?.fullyStopped===!0&&e.status?.enabled===!1;function Wd({sessionId:e,boundSession:n,state:t,controlContext:o,listExistingVoiceSessions:i,setExistingVoiceSession:r,readState:s,run:a,t:d}){let[l,u]=(0,Me.useState)(),[p,m]=(0,Me.useState)(!1),[f,b]=(0,Me.useState)(!1),v=(0,Me.useRef)(null),w=(0,Me.useId)(),k=n?.sessionId??null,P=e===k,M=C=>br(C,e)&&Object.hasOwn(C.status,"existingVoiceSession")&&(C.status.existingVoiceSession?.sessionId??null)===k,B=()=>o.currentConversation()===e&&o.sourceFor(e)===e;(0,Me.useEffect)(()=>{let C=new AbortController;return v.current={signal:C.signal,choosing:!1},m(!1),i({sessionId:e},C.signal).then(N=>{C.signal.aborted||!B()||(u(N.items.find(S=>S.sessionId===e)??null),(N.binding?.sessionId??null)!==k&&a(e,"status"))}).catch(()=>{C.signal.aborted||u(null)}),()=>C.abort()},[e,k,o,i]);let E=async()=>{let C=v.current;if(!(!C||C.signal.aborted||C.choosing||!B())&&M(s())){C.choosing=!0,m(!0),b(!1);try{if(P){await r({sessionId:null,expectedSessionId:k});return}let N=await i({sessionId:e},C.signal);if(C.signal.aborted||!B())return;let S=N.items.find(F=>F.sessionId===e),I=(N.binding?.sessionId??null)!==k;if(I||!Qn(S)){u(S??null),b(!0),I&&a(e,"status");return}if(!M(s()))return;await r({sessionId:e,expectedSessionId:k})}catch{C.signal.aborted||b(!0)}finally{C.choosing=!1,C.signal.aborted||m(!1)}}},T=P?n:l,z=l===void 0&&!P,$=P||z||Qn(T);if(!$&&!f)return null;let W=d(P?"backToFishVoice":"chooseCurrentDshTarget"),_=z?d("checkingVoiceTarget"):T?bt(T):"";return(0,se.jsxs)("div",{className:h.currentDshTarget,"data-whale-current-target":!0,"data-no-drag":!0,children:[$&&(0,se.jsxs)(xn.Button,{variant:"outline",className:h.currentDshAction,"data-whale-operation":P?"unbind-existing-session":"bind-current-session","aria-label":W,"aria-busy":p||z,"aria-describedby":w,disabled:!M(t)||p||z,onClick:()=>{E()},children:[(0,se.jsx)("span",{children:W}),(0,se.jsx)("span",{id:w,className:h.ellipsis,title:_,children:_})]}),f&&(0,se.jsx)("p",{role:"alert",className:h.hint,children:d("currentDshTargetError")})]})}function Fi({state:e,sessionId:n,listExistingVoiceSessions:t,setExistingVoiceSession:o,openExistingVoiceSession:i,showHome:r,homePickerId:s,closeHomePicker:a,t:d}){let[l,u]=(0,Me.useState)(null),[p,m]=(0,Me.useState)(!1),[f,b]=(0,Me.useState)(""),[v,w]=(0,Me.useState)(null),[k,P]=(0,Me.useState)(!1),[M,B]=(0,Me.useState)(!1),[E,T]=(0,Me.useState)(null),z=(0,Me.useRef)(null),$=(0,Me.useRef)(!1),W=(0,Me.useId)(),_=!!s,C=_||p,N=e.status,S=Object.hasOwn(N??{},"existingVoiceSession")?N.existingVoiceSession:l?.binding,I=N?.existingVoiceSessionSupported!==!1,F=br(e,n),L=e.existingSessionWritePending,Z=l?.items.find(oe=>oe.sessionId===v),X=F&&!k&&!!S,G=F&&I&&!k&&!M&&!!l,ae=(0,Me.useCallback)(async(oe="",Q)=>{z.current?.abort();let V=new AbortController;z.current=V,P(!0),B(!1);try{let ke=await t({...oe?{query:oe}:{},...Q?{cursor:Q}:{}},V.signal);if(V.signal.aborted)return;u(on=>({...ke,query:oe,items:Q&&on?[...new Map([...on.items,...ke.items].map(Fe=>[Fe.sessionId,Fe])).values()]:ke.items}))}catch{V.signal.aborted||B(!0)}finally{z.current===V&&(z.current=null,P(!1))}},[t]);(0,Me.useEffect)(()=>($.current=!0,I?ae():P(!1),()=>{$.current=!1,z.current?.abort(),z.current=null}),[ae,I]);let le=oe=>{oe.preventDefault(),w(null),T(null),ae(f.trim())},pe=async oe=>{if(!(!(oe===null?X:G)||oe===(S?.sessionId??null))){T(null);try{let{binding:Q}=await o({sessionId:oe,expectedSessionId:S?.sessionId??null});if(!$.current)return;if(_){a();return}u(V=>V&&{...V,binding:Q}),m(!1),w(null),b(""),T({text:Q?"\u5DF2\u7ED1\u5B9A\u3002\u70B9\u51FB\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u540E\u5373\u53EF\u7EE7\u7EED\u8BE5\u4F1A\u8BDD\u3002":"\u5DF2\u89E3\u9664\uFF0C\u4E0B\u4E00\u6B21\u5F00\u59CB\u5BF9\u8BDD\u5C06\u4F7F\u7528\u9C7C\u5E94\u4F1A\u8BDD\u3002"}),I&&ae()}catch(Q){if(!$.current)return;T({error:!0,text:typeof Q?.message=="string"&&Q.message?Q.message.split(`
`)[0].slice(0,160):"\u4F1A\u8BDD\u7ED1\u5B9A\u672A\u786E\u8BA4\uFF0C\u8BF7\u6838\u5BF9\u5F53\u524D\u7ED1\u5B9A\u3002"}),w(null),I&&ae(C?f.trim():"")}}},xe=(0,se.jsxs)(se.Fragment,{children:[k&&(0,se.jsx)("p",{role:"status",className:h.hint,children:d("loadingVoiceTargets")}),M&&(0,se.jsxs)("div",{role:"alert",className:h.notice,children:[d("voiceTargetListError")," ",(0,se.jsx)(xn.Button,{variant:"outline",disabled:L,onClick:()=>{ae(f.trim())},children:d("retryVoiceTargets")})]})]}),A=E&&(0,se.jsx)("p",{role:E.error?"alert":"status",className:E.error?h.notice:h.hint,children:E.text});return(0,se.jsxs)("section",{id:s,className:_?h.homeTargetPicker:h.section,"data-whale-existing-session":!0,"aria-label":_?d("chooseVoiceTarget"):void 0,"data-no-drag":_||void 0,children:[!_&&(0,se.jsxs)(se.Fragment,{children:[(0,se.jsx)("h3",{children:"\u8BED\u97F3\u5BF9\u8BDD\u76EE\u6807"}),(0,se.jsxs)("div",{className:h.existingSessionTarget,children:[(0,se.jsx)("strong",{className:h.sessionTitle,children:S?bt(S):"\u9C7C\u5E94\u4F1A\u8BDD"}),(0,se.jsx)("p",{className:h.hint,children:S?"\u8BED\u97F3\u548C\u56DE\u7B54\u5199\u5165\u6B64\u4F1A\u8BDD\uFF0C\u9C7C\u5E94\u4EC5\u5728\u672C\u673A\u64AD\u62A5\u3002\u5176\u4ED6\u63D2\u4EF6\u7684\u8F6C\u53D1\u7531\u5176\u8BBE\u7F6E\u51B3\u5B9A\u3002":"\u53EF\u7ED1\u5B9A\u5DF2\u6709 DSH \u4F1A\u8BDD\uFF0C\u6CBF\u7528\u539F\u6765\u7684\u4E0A\u4E0B\u6587\u548C\u5386\u53F2\u3002"}),S&&vr(S)&&(0,se.jsxs)("p",{role:"status",className:h.notice,children:[vr(S),"\u3002\u53EF\u89E3\u9664\u7ED1\u5B9A\u6216\u9009\u62E9\u5176\u4ED6\u4F1A\u8BDD\u3002"]}),!I&&(0,se.jsx)("p",{role:"status",className:h.notice,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u4E0D\u652F\u6301\u7ED1\u5B9A\u5DF2\u6709\u4F1A\u8BDD\u3002"}),N?.enabled&&(0,se.jsx)("p",{className:h.hint,children:"\u7ED3\u675F\u8BED\u97F3\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u7ED1\u5B9A\u3002"})]}),(0,se.jsxs)("div",{className:h.actions,children:[(0,se.jsx)(xn.Button,{variant:"outline","aria-expanded":C,disabled:!I||L,onClick:()=>{m(!C),w(null),b(""),C||ae()},children:C?"\u5173\u95ED\u4F1A\u8BDD\u5217\u8868":S?"\u66F4\u6362\u7ED1\u5B9A":"\u9009\u62E9\u5DF2\u6709\u4F1A\u8BDD"}),Qn(S)&&i&&(0,se.jsx)(xn.Button,{variant:"outline","data-whale-operation":"open-native-session",onClick:async()=>{T(null);try{await i(S.sessionId),await r?.()}catch{$.current&&T({error:!0,text:"DSH \u6682\u65F6\u65E0\u6CD5\u6253\u5F00\u539F\u4F1A\u8BDD\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"})}},children:"\u6253\u5F00\u539F\u4F1A\u8BDD"}),S&&(0,se.jsx)(xn.Button,{variant:"outline","data-whale-operation":"unbind-existing-session",disabled:!X,onClick:()=>{pe(null)},children:"\u89E3\u9664\u7ED1\u5B9A"})]})]}),C&&(0,se.jsxs)("div",{className:h.existingSessionPicker,"aria-busy":k,children:[(0,se.jsxs)("form",{className:h.existingSessionSearch,onSubmit:le,children:[(0,se.jsx)(xn.Input,{type:"search","aria-label":d("searchVoiceTargets"),placeholder:d("searchVoiceTargets"),value:f,maxLength:128,disabled:L,onChange:oe=>b(oe.target.value)}),(0,se.jsx)(xn.Button,{type:"submit",variant:"outline",disabled:L,children:d("searchVoiceTargetsAction")})]}),l?.items.length>0&&(0,se.jsx)("ul",{className:h.existingSessionList,"aria-label":d("existingVoiceTargetList"),children:l.items.map(oe=>{let Q=S?.sessionId===oe.sessionId,V=Q||!Qn(oe),ke=(0,se.jsxs)("span",{className:h.hint,children:[Q?d("boundVoiceTarget")+" \xB7 ":"",d("voiceTargetAvailability_"+(oe.unavailableReason??oe.availability))," \xB7 ",oe.sessionId]});return(0,se.jsx)("li",{children:_?(0,se.jsxs)(xn.Button,{variant:"ghost",className:h.homeTargetRow,"data-whale-operation":"bind-existing-session",title:oe.sessionId,"aria-current":Q||void 0,"aria-disabled":!G,disabled:V,onClick:()=>{pe(oe.sessionId)},children:[(0,se.jsx)("strong",{className:h.sessionTitle,children:bt(oe)}),ke]}):(0,se.jsxs)("label",{title:oe.sessionId,children:[(0,se.jsx)("input",{type:"radio",name:W,value:oe.sessionId,checked:v===oe.sessionId,disabled:V||k||L,onChange:()=>{w(oe.sessionId),T(null)}}),(0,se.jsxs)("span",{children:[(0,se.jsx)("strong",{className:h.sessionTitle,children:bt(oe)}),ke]})]})},oe.sessionId)})}),xe,!k&&!M&&l?.items.length===0&&(0,se.jsx)("p",{role:"status",className:h.hint,children:d(l.query?"voiceTargetNoMatch":"voiceTargetEmptyList")}),Z&&(0,se.jsx)("p",{id:W+"-tts",className:h.hint,children:d("voiceTargetSynthesisNotice")}),A,(!_||l?.nextCursor||S)&&(0,se.jsxs)("div",{className:h.actions,children:[!_&&(0,se.jsx)(xn.Button,{variant:"primary","data-whale-operation":"bind-existing-session","aria-describedby":Z?W+"-tts":void 0,disabled:!G||!Qn(Z)||Z.sessionId===S?.sessionId,onClick:()=>{pe(v)},children:d(L?"savingVoiceTarget":"bindVoiceTarget")}),!!l?.nextCursor&&(0,se.jsx)(xn.Button,{variant:"outline",disabled:k||L,onClick:()=>{ae(l.query,l.nextCursor)},children:d("moreVoiceTargets")}),_&&S&&(0,se.jsx)(xn.Button,{variant:"outline","data-whale-operation":"unbind-existing-session",disabled:!X,onClick:()=>{pe(null)},children:d("backToFishVoice")})]})]}),!C&&(0,se.jsxs)(se.Fragment,{children:[xe,A]})]})}var Ut=require("react"),Ft=require("@deepseek-ai/dsh-client-ui-primitives");var wr="dsh-fish-voice";var Ui={name:"Emikosama",url:"https://github.com/Emikosama"};var zd="https://github.com/Emikosama/dsh-fish-voice",ko={url:"https://github.com/Emikosama/dsh-fish-voice/issues"};var We=require("react/jsx-runtime");function Cd(e,n){let t=e.updates;return e.updatePending==="install"?n("update_installing"):e.updatePending==="check"?n("update_checking"):e.updatesUnavailable?n("updateConnection"):t?t.message||n("update_"+t.status):n("update_idle")}function Pd({state:e,open:n,t}){let o=e.updates,i=!e.updatesUnavailable&&(o?.release||["restart-required","enable-required","installed"].includes(o?.status));return(0,We.jsxs)("section",{className:h.section,"data-whale-update-settings":!0,children:[(0,We.jsx)("h3",{children:t("updateTitle")}),o&&(0,We.jsxs)("p",{className:h.hint,children:[t("updateCurrentVersion")," ",o.currentVersion," \xB7 ",t("updateChannel_"+o.channel)]}),(0,We.jsx)("p",{children:Cd(e,t)}),(0,We.jsxs)("div",{className:h.actions,children:[i&&(0,We.jsx)(Ft.Button,{variant:"outline",onClick:()=>n(!1),children:t("updateDetails")}),(0,We.jsx)(Ft.Button,{variant:"outline",disabled:!!e.updatePending||!e.updatesUnavailable&&o?.status==="installing",onClick:()=>n(!0),children:t("updateCheck")}),(0,We.jsx)("a",{href:ko.url,"data-whale-operation":"open-feedback",target:"_blank",rel:"noreferrer noopener",children:t("updateFeedback")})]})]})}function Id({state:e,close:n,run:t,t:o}){let i=(0,Ut.useRef)(null),r=(0,Ut.useId)();(0,Ut.useLayoutEffect)(()=>{let f=i.current;return typeof f.showModal=="function"?f.showModal():f.setAttribute("open",""),()=>{f.open&&f.close?.()}},[]);let s=e.updates,a=s?.release,d=!!e.updatePending||!e.updatesUnavailable&&["checking","installing"].includes(s?.status),l=!e.updatesUnavailable&&!d&&s?.canInstall&&a,u=!d&&(e.updatesUnavailable||!["restart-required","enable-required"].includes(s?.status)),p=!e.updatesUnavailable&&["available","incompatible"].includes(s?.status),m=l&&!s.message?null:Cd(e,o);return(0,We.jsxs)("dialog",{ref:i,className:h.updateDialog,"data-whale-update-dialog":!0,"data-no-drag":!0,"aria-labelledby":r,onCancel:f=>{f.preventDefault(),n()},onKeyDown:f=>f.stopPropagation(),children:[(0,We.jsxs)("header",{className:h.updateHeader,children:[(0,We.jsx)(at,{}),(0,We.jsx)("h2",{id:r,children:o(p?"updateOfferTitle":"updateTitle")})]}),s&&(0,We.jsxs)("p",{className:h.hint,children:[o("updateCurrentVersion")," ",s.currentVersion,a&&a.version!==s.currentVersion&&(0,We.jsxs)(We.Fragment,{children:[" \xB7 ",o("updateNewVersion")," ",a.version]})," \xB7 ",o("updateChannel_"+s.channel)]}),a?.announcement&&(0,We.jsx)("p",{className:h.updateAnnouncement,children:a.announcement}),m&&(0,We.jsx)("p",{className:h.hint,role:"status",children:m}),(0,We.jsxs)("div",{className:h.actions,children:[(0,We.jsx)(Ft.Button,{variant:"outline",onClick:n,children:o(p?"updateLater":"close")}),l&&(0,We.jsx)(Ft.Button,{variant:"primary",className:h.primary,onClick:()=>{t({action:"install",version:a.version})},children:o("updateInstall")}),!l&&u&&(0,We.jsx)(Ft.Button,{variant:"outline",onClick:()=>{t({action:"check"})},children:o("updateCheck")})]}),(0,We.jsxs)("footer",{className:h.actions,children:[a?.url?.startsWith("https://")&&(0,We.jsx)("a",{href:a.url,target:"_blank",rel:"noreferrer noopener",children:o("updateRelease")}),(0,We.jsx)("a",{href:ko.url,"data-whale-operation":"open-feedback",target:"_blank",rel:"noreferrer noopener",children:o("updateFeedback")})]})]})}var Fh=new Map([["audio","settings-audio"],["interaction","settings-interaction"],["prompt","settings-prompt"],["models","settings-models"],["advanced","settings-advanced"],["pets","settings-pets"],["sessions","page-session-management"]]);function Uh(e){if(e.nativeEvent?.isTrusted!==!0)return null;let n=e.target;if(!n?.closest)return null;let t=n.closest("[data-whale-operation-log]");return t&&!(e.type==="click"&&n.closest("summary")?.parentElement===t)?null:n}function Nd(e){let n=Uh(e);if(!n)return null;if(e.type==="submit")return"commit-form";if(e.type==="keydown")return e.key==="Escape"?"dismiss":["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key)&&n.closest('[data-settings-nav], [role="listbox"]')?"keyboard-navigation":null;if(e.type==="change")return n.matches('input[type="radio"]')&&["listen-mode-ptt","listen-mode-always","listen-mode-wake"].includes(n.dataset.whaleOperation)?n.dataset.whaleOperation:n.closest("[data-audio-device-controls] select")?"change-audio-device":n.matches('select, input[type="radio"], input[type="checkbox"]')?"edit-choice":null;if(e.type!=="click")return null;let t=n.closest("button, a[href], summary");if(!t||t.type==="submit"&&t.form)return null;let o=t.dataset.whaleOperation;return o==="open-feedback"&&t.matches("summary")&&t.parentElement.open?"dismiss":t.matches("summary")&&["session-history","subagent-history"].includes(o)?o+(t.parentElement.open?"-close":"-open"):o||(t.hasAttribute("data-settings-tab")?Fh.get(t.dataset.settingsTab)??"page-settings-tab":t.closest("[data-whale-session-management], [data-whale-existing-session]")?"manage-session":t.closest("[data-settings-page-heading] nav")?"page-model-tab":t.matches("summary")?"details-toggle":"activate-control")}var et=require("react"),Vi=require("@deepseek-ai/dsh-client-ui-primitives");var tn=require("react/jsx-runtime"),Vh="fish-voice-operation-log.log",Ad=256*1024,Lh=(e,n)=>(e+n).slice(-Ad);function Ed({readOperationLog:e}){let[n,t]=(0,et.useState)(!1),[o,i]=(0,et.useState)(!1),[r,s]=(0,et.useState)(null),[a,d]=(0,et.useState)(null),l=(0,et.useRef)(null);if((0,et.useEffect)(()=>()=>l.current?.abort(),[]),!e)return null;let u=async m=>{if(l.current)return;let f=new AbortController;l.current=f,i(!0),d(null);try{let b=await e(f.signal);if(f.signal.aborted)return;if(m){let v=URL.createObjectURL(new Blob(b,{type:"text/plain;charset=utf-8"})),w=document.createElement("a");w.href=v,w.download=Vh,Hh(w),setTimeout(()=>URL.revokeObjectURL(v),1e3),d("\u5DF2\u8BF7\u6C42\u4FDD\u5B58\u8BCA\u65AD\u65E5\u5FD7\u3002")}else s({text:b.reduce(Lh,""),shortened:b.reduce((v,w)=>v+w.length,0)>Ad})}catch{f.signal.aborted||d("\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u8BCA\u65AD\u65E5\u5FD7\uFF0C\u8BF7\u91CD\u8BD5\u3002")}finally{l.current===f&&(l.current=null),f.signal.aborted||i(!1)}},p=m=>{let f=m.currentTarget.open;t(f),f||(l.current?.abort(),l.current=null,i(!1),s(null),d(null))};return(0,tn.jsxs)("details",{className:h.section,"data-whale-operation-log":!0,open:n,onToggle:p,children:[(0,tn.jsx)("summary",{"data-whale-operation":"open-feedback",children:"\u6392\u67E5\u4E0E\u53CD\u9988"}),n&&(0,tn.jsxs)(tn.Fragment,{children:[(0,tn.jsx)("p",{className:h.hint,children:"\u6700\u8FD1\u4E03\u5929\u7684\u64CD\u4F5C\u65E5\u5FD7\u3002\u53EF\u5148\u67E5\u770B\uFF0C\u518D\u81EA\u884C\u51B3\u5B9A\u662F\u5426\u968F\u53CD\u9988\u63D0\u4EA4\u3002"}),(0,tn.jsxs)("div",{className:h.actions,children:[(0,tn.jsx)(Vi.Button,{variant:"outline",disabled:o,onClick:()=>{u(!1)},children:"\u67E5\u770B\u8BCA\u65AD\u65E5\u5FD7"}),(0,tn.jsx)(Vi.Button,{variant:"outline",disabled:o,onClick:()=>{u(!0)},children:"\u4FDD\u5B58\u8BCA\u65AD\u65E5\u5FD7"}),(0,tn.jsx)("a",{href:ko.url+"/new",target:"_blank",rel:"noreferrer noopener",children:"\u63D0\u4EA4\u53CD\u9988"})]}),o&&(0,tn.jsx)("p",{role:"status",className:h.hint,children:"\u6B63\u5728\u8BFB\u53D6\u8BCA\u65AD\u65E5\u5FD7\u2026"}),a&&(0,tn.jsx)("p",{role:"status",className:h.hint,children:a}),r?.shortened&&(0,tn.jsx)("p",{className:h.hint,children:"\u8FD9\u91CC\u53EA\u663E\u793A\u6700\u8FD1\u4E00\u6BB5\uFF0C\u4FDD\u5B58\u53EF\u53D6\u5F97\u5B8C\u6574\u65E5\u5FD7\u3002"}),r&&(0,tn.jsx)("pre",{className:h.requestDetails,tabIndex:0,"aria-label":"\u64CD\u4F5C\u65E5\u5FD7\u9884\u89C8",children:r.text||"\u6682\u65E0\u64CD\u4F5C\u65E5\u5FD7\u3002"})]})]})}function Hh(e){document.body.append(e);try{e.click()}finally{e.remove()}}var D=require("react"),q=require("@deepseek-ai/dsh-client-ui-primitives");var he=require("react"),fe=require("@deepseek-ai/dsh-client-ui-primitives");var R={sourceChoices:"IfcX3G_sourceChoices",primary:"IfcX3G_primary",modelInstaller:"IfcX3G_modelInstaller",setupEnter:"IfcX3G_setupEnter",actions:"IfcX3G_actions",inlineField:"IfcX3G_inlineField",selectedModel:"IfcX3G_selectedModel",fullName:"IfcX3G_fullName",wizardBodyContent:"IfcX3G_wizardBodyContent",installHistory:"IfcX3G_installHistory",section:"IfcX3G_section",field:"IfcX3G_field",hint:"IfcX3G_hint",details:"IfcX3G_details",badge:"IfcX3G_badge",job:"IfcX3G_job",currentModel:"IfcX3G_currentModel",switchRow:"IfcX3G_switchRow",note:"IfcX3G_note",choice:"IfcX3G_choice",choices:"IfcX3G_choices",jobHeading:"IfcX3G_jobHeading",switcher:"IfcX3G_switcher",installPath:"IfcX3G_installPath",wizardBody:"IfcX3G_wizardBody",jobs:"IfcX3G_jobs",hardwareSummary:"IfcX3G_hardwareSummary",header:"IfcX3G_header",wizard:"IfcX3G_wizard",plan:"IfcX3G_plan",modelChoices:"IfcX3G_modelChoices",consentActions:"IfcX3G_consentActions",text:`.IfcX3G_section {
  min-width: 0;
  color: var(--dsw-alias-label-primary);
  gap: 8px;
  display: grid;
}

.IfcX3G_section h3, .IfcX3G_wizard h2, .IfcX3G_plan h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
}

.IfcX3G_section p, .IfcX3G_wizard p {
  margin: 0;
  line-height: 1.6;
}

.IfcX3G_hint, .IfcX3G_section small, .IfcX3G_wizard small {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 1.6;
}

.IfcX3G_note {
  border-left: 2px solid var(--dsw-alias-state-warn-primary);
  background: var(--dsw-alias-bg-layer-2);
  padding: 8px 12px;
  font-size: 12px;
}

.IfcX3G_actions, .IfcX3G_header {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  display: flex;
}

.IfcX3G_header {
  justify-content: space-between;
  align-items: flex-start;
}

.IfcX3G_choices {
  border: 0;
  gap: 8px;
  min-width: 0;
  margin: 0;
  padding: 0;
  display: grid;
}

.IfcX3G_choices legend {
  color: var(--dsw-alias-label-secondary);
  padding: 0 0 8px;
  font-size: 12px;
}

.IfcX3G_choice {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  cursor: pointer;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 10px;
  display: flex;
}

.IfcX3G_choice[data-selected="true"] {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,var(--dsw-alias-bg-layer-1));
}

.IfcX3G_choice input {
  accent-color: var(--dsw-alias-brand-primary);
  margin: 4px 0 0;
}

.IfcX3G_choice span {
  min-width: 0;
}

.IfcX3G_choice small, .IfcX3G_plan small {
  overflow-wrap: anywhere;
  display: block;
}

.IfcX3G_choice strong {
  font-size: 13px;
}

.IfcX3G_field {
  gap: 6px;
  font-size: 12px;
  display: grid;
}

.IfcX3G_field input, .IfcX3G_field select {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}

.IfcX3G_field select {
  font: inherit;
  color: inherit;
  background: var(--dsw-alias-bg-layer-2);
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  padding: 8px;
}

.IfcX3G_details {
  border-top: 1px solid var(--dsw-alias-border-l2);
  min-width: 0;
  padding-top: 12px;
}

.IfcX3G_details summary {
  cursor: pointer;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

.IfcX3G_details[open] > summary {
  margin-bottom: 12px;
}

.IfcX3G_badge {
  border-radius: var(--dsw-radius-sm);
  color: var(--dsw-alias-label-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,var(--dsw-alias-bg-layer-1));
  margin-left: 8px;
  padding: 2px 6px;
  font-size: 11px;
}

.IfcX3G_plan, .IfcX3G_job {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  gap: 10px;
  min-width: 0;
  padding: 12px;
  display: grid;
}

.IfcX3G_plan dl {
  grid-template-columns: auto minmax(0, 1fr);
  gap: 6px 12px;
  margin: 0;
  font-size: 12px;
  display: grid;
}

.IfcX3G_plan dt {
  color: var(--dsw-alias-label-secondary);
}

.IfcX3G_plan dd {
  overflow-wrap: anywhere;
  margin: 0;
}

.IfcX3G_plan a {
  color: var(--dsw-alias-link);
  overflow-wrap: anywhere;
  font-size: 12px;
}

.IfcX3G_plan ul {
  margin: 0;
  padding-left: 16px;
  font-size: 12px;
}

.IfcX3G_jobs {
  gap: 12px;
  display: grid;
}

.IfcX3G_job progress {
  width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
}

.IfcX3G_wizard {
  box-sizing: border-box;
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-layer-1);
  border-radius: var(--dsw-radius-lg);
}

.IfcX3G_section button, .IfcX3G_wizard button {
  transition: transform var(--ds-transition-duration-fast, .1s) var(--whale-ease, ease-out);
}

.IfcX3G_section button:active:not(:disabled), .IfcX3G_wizard button:active:not(:disabled) {
  transform: scale(.97);
}

.IfcX3G_section :is(button, input, select, a, summary):focus-visible, .IfcX3G_wizard :is(button, summary):focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

[data-motion="firm"] .IfcX3G_wizard {
  --whale-duration: var(--ds-transition-duration-fast, .1s);
  --whale-ease: ease-out;
}

[data-motion="off"] .IfcX3G_wizard, [data-motion="off"] .IfcX3G_wizard *, [data-motion="off"] .IfcX3G_section * {
  transition: none !important;
  animation: none !important;
  transform: none !important;
}

@keyframes IfcX3G_setupEnter {
  from {
    translate: 0 4px;
  }

  to {
    translate: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .IfcX3G_wizard, .IfcX3G_wizard *, .IfcX3G_section * {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
}

@media (width <= 520px) {
  .IfcX3G_wizard {
    padding: 12px;
  }

  .IfcX3G_plan dl {
    grid-template-columns: minmax(0, 1fr);
    gap: 3px;
  }

  .IfcX3G_plan dd {
    margin-bottom: 6px;
  }
}

@media (forced-colors: active) {
  .IfcX3G_choice[data-selected="true"] {
    outline: 2px solid highlight;
  }
}

.IfcX3G_wizard {
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

.IfcX3G_wizard > .IfcX3G_header, .IfcX3G_wizard > footer {
  flex-shrink: 0;
}

.IfcX3G_wizardBody {
  overscroll-behavior: contain;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.IfcX3G_wizardBodyContent {
  align-content: start;
  gap: 12px;
  display: grid;
}

.IfcX3G_primary {
  color: var(--dsw-alias-label-primary) !important;
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 16%,var(--dsw-alias-bg-layer-2)) !important;
  border: 1px solid var(--dsw-alias-border-l2) !important;
}

.IfcX3G_primary:disabled {
  opacity: .5;
}

.IfcX3G_choices {
  gap: 6px;
}

.IfcX3G_choice {
  box-sizing: border-box;
  align-items: center;
  min-height: 38px;
}

.IfcX3G_choice input {
  flex: none;
  margin: 0;
}

.IfcX3G_choice strong {
  display: block;
}

.IfcX3G_choice:has(input:disabled) {
  cursor: default;
  opacity: .65;
}

.IfcX3G_note p {
  margin: 0;
}

.IfcX3G_note button {
  margin-top: 8px;
}

.IfcX3G_wizard > footer {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

.IfcX3G_wizardBody {
  padding: 2px 4px 8px 0;
}

.IfcX3G_section > button, .IfcX3G_wizardBody > button {
  justify-self: start;
  max-width: 100%;
}

.IfcX3G_section button, .IfcX3G_wizard button {
  white-space: normal;
  max-width: 100%;
  height: auto;
  min-height: 36px;
}

.IfcX3G_actions > button {
  flex: 0 auto;
}

.IfcX3G_sourceChoices {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.IfcX3G_sourceChoices legend {
  grid-column: 1 / -1;
}

.IfcX3G_inlineField {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-width: 0;
  font-size: 12px;
  display: flex;
}

.IfcX3G_inlineField select {
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

.IfcX3G_inlineField input[type="number"] {
  width: 80px;
  min-width: 0;
}

.IfcX3G_field:has( > input[type="number"]) {
  flex-wrap: wrap;
  align-items: center;
  display: flex;
}

.IfcX3G_field > input[type="number"] {
  width: 80px;
}

.IfcX3G_details > summary {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  box-sizing: content-box;
  width: fit-content;
  max-width: 100%;
  min-height: 20px;
  padding: 7px 10px;
}

.IfcX3G_fullName {
  min-width: 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

.IfcX3G_fullName summary {
  cursor: pointer;
}

.IfcX3G_fullName p {
  overflow-wrap: anywhere;
}

.IfcX3G_consentActions {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  display: flex;
}

@container (width <= 360px) {
  .IfcX3G_sourceChoices {
    grid-template-columns: minmax(0, 1fr);
  }

  .IfcX3G_inlineField select {
    width: 150px;
  }
}

@media (width <= 420px) {
  .IfcX3G_wizard .IfcX3G_sourceChoices {
    grid-template-columns: minmax(0, 1fr);
  }
}

.IfcX3G_modelChoices {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.IfcX3G_modelChoices > legend {
  grid-column: 1 / -1;
  padding-bottom: 5px;
}

.IfcX3G_modelChoices .IfcX3G_choice {
  gap: 7px;
  min-height: 80px;
  padding: 8px;
}

.IfcX3G_modelChoices .IfcX3G_choice strong {
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  display: flex;
}

.IfcX3G_modelChoices .IfcX3G_badge {
  white-space: nowrap;
  margin-left: 0;
}

.IfcX3G_hardwareSummary {
  color: var(--dsw-alias-label-secondary);
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 2px 10px;
  font-size: 11px;
  display: flex;
}

.IfcX3G_hardwareSummary small {
  font-size: 10px;
}

.IfcX3G_currentModel, .IfcX3G_switchRow, .IfcX3G_jobHeading {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.IfcX3G_currentModel {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  padding: 7px 8px;
  font-size: 12px;
}

.IfcX3G_currentModel > span, .IfcX3G_switchRow > span {
  overflow-wrap: anywhere;
  min-width: 0;
}

.IfcX3G_currentModel button, .IfcX3G_switchRow button {
  flex: none;
  min-height: 30px;
  padding: 0 9px;
}

.IfcX3G_switcher {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  gap: 7px;
  padding: 8px;
  display: grid;
}

.IfcX3G_switchRow small {
  display: block;
}

.IfcX3G_selectedModel {
  border-top: 1px solid var(--dsw-alias-border-l2);
  gap: 7px;
  padding-top: 6px;
  display: grid;
}

.IfcX3G_selectedModel .IfcX3G_details {
  padding-top: 4px;
}

.IfcX3G_selectedModel .IfcX3G_details summary {
  border: 0;
  padding: 3px 0;
}

.IfcX3G_installHistory {
  border-top: 1px solid var(--dsw-alias-border-l2);
}

.IfcX3G_installHistory > summary {
  cursor: pointer;
  padding: 8px 0;
  font-size: 12px;
  display: list-item;
}

.IfcX3G_installHistory > summary small {
  margin-left: 12px;
}

.IfcX3G_installHistory .IfcX3G_job {
  gap: 6px;
  padding: 9px;
}

.IfcX3G_jobHeading {
  flex-wrap: wrap;
}

.IfcX3G_installPath {
  min-width: 0;
  font-size: 11px;
}

.IfcX3G_installPath summary {
  cursor: pointer;
  color: var(--dsw-alias-label-secondary);
}

.IfcX3G_installPath p {
  overflow-wrap: anywhere;
}

.IfcX3G_modelInstaller .IfcX3G_jobs:empty {
  display: none;
}

@container (width <= 300px) {
  .IfcX3G_modelChoices {
    grid-template-columns: minmax(0, 1fr);
  }

  .IfcX3G_currentModel {
    flex-wrap: wrap;
  }
}

.IfcX3G_section[aria-label="\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84"] p {
  overflow-wrap: anywhere;
}

.IfcX3G_choice {
  transition: background-color .12s ease-out, border-color .12s ease-out, box-shadow .12s ease-out;
}

.IfcX3G_choice:hover:has(input:not(:disabled)) {
  border-color: var(--dsw-alias-brand-primary);
}

.IfcX3G_choice:has(input:focus-visible) {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: 2px;
}

.IfcX3G_section :is(button, select, input, summary), .IfcX3G_wizard :is(button, select, input, summary) {
  transition: background-color .12s ease-out,border-color .12s ease-out,color .12s ease-out,transform var(--whale-duration, .2s) var(--whale-ease, ease-out);
}

.IfcX3G_section button:hover:not(:disabled), .IfcX3G_wizard button:hover:not(:disabled) {
  background-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,var(--dsw-alias-bg-layer-1));
}

.IfcX3G_plan, .IfcX3G_switcher, .IfcX3G_selectedModel, .IfcX3G_section [data-whale-save-result], .IfcX3G_wizardBodyContent > section {
  animation: IfcX3G_setupEnter var(--whale-duration, .2s) ease-out;
}

[data-motion="firm"] :is(.IfcX3G_section, .IfcX3G_wizard) {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="off"] :is(.IfcX3G_section, .IfcX3G_wizard), [data-motion="off"] :is(.IfcX3G_section, .IfcX3G_wizard) *, [data-motion="off"] :is(.IfcX3G_section, .IfcX3G_wizard) :before {
  transition: none !important;
  animation: none !important;
}

[data-motion="off"] :is(.IfcX3G_section, .IfcX3G_wizard) button:active {
  transform: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .IfcX3G_section, .IfcX3G_wizard, .IfcX3G_section *, .IfcX3G_wizard *, .IfcX3G_section :before, .IfcX3G_wizard :before {
    transition: none !important;
    animation: none !important;
  }

  .IfcX3G_section button:active, .IfcX3G_wizard button:active {
    transform: none !important;
  }
}
`};var g=require("react/jsx-runtime"),Td=[["system","Windows \u7CFB\u7EDF\u8BED\u97F3","\u4F7F\u7528\u5DF2\u5B89\u88C5\u7684\u97F3\u8272\uFF0C\u65E0\u9700\u4E0B\u8F7D\u6717\u8BFB\u6A21\u578B"],["deepseek","DeepSeek \u8BED\u97F3\u5408\u6210","\u8054\u7F51\u8C03\u7528\u5B98\u65B9 API\uFF0C\u6309\u5B57\u7B26\u8BA1\u8D39"],["local","\u672C\u5730\u8BED\u97F3\u6A21\u578B","\u5728\u672C\u673A\u5408\u6210\uFF0C\u9996\u6B21\u9700\u8981\u4E0B\u8F7D"],["custom","\u81EA\u5B9A\u4E49 TTS","\u517C\u5BB9 OpenAI \u97F3\u9891\u63A5\u53E3\u7684\u8BED\u97F3\u670D\u52A1"],["off","\u4E0D\u53D1\u58F0","\u53EA\u663E\u793A\u6587\u5B57"]],Hi=Object.fromEntries(Td.map(([e,n])=>[e,n])),Li={provider:"system",systemVoiceId:null,deepseekVoice:"stella",deepseekTextTransmissionAccepted:!1,volume:.8,localModelId:null,localModelPath:null,referenceAudioPath:null},qh={baseUrl:"",model:"",voice:"",apiKeyEnv:null,format:"wav",textTransmissionAccepted:!1},Gh="\u8BF7\u5728 DSH \u7684 DeepSeek API Key \u63D0\u4F9B\u5546\u4E2D\u914D\u7F6E\u5F00\u653E\u5E73\u53F0\u5BC6\u94A5\uFF0C\u518D\u91CD\u65B0\u68C0\u67E5\u3002",jh="\u6717\u8BFB\u548C\u8BD5\u542C\u4F1A\u5411 DeepSeek \u53D1\u9001\u5F85\u6717\u8BFB\u7684\u6587\u5B57\uFF0C\u6309\u5B57\u7B26\u7528\u91CF\u8BA1\u8D39\u3002",xr=e=>e.authorization?.scopes?.some(n=>n.id==="deepseek-text"&&n.allowed)===!0,ji=e=>e.authorization?.scopes?.some(n=>n.id==="custom-tts-text"&&n.allowed)===!0,$d=e=>{let n={...e};return delete n.referenceAudioAccepted,n},Od=(e,n)=>{let t=$d(e);return delete t.customTts,{...t,referenceAudioAccepted:e.referenceAudioPath===n?.referenceAudioPath&&n?.referenceAudioAccepted===!0}},Rd=R.text,Xh=e=>({"restart-requires-resume":"\u5BBF\u4E3B\u5DF2\u91CD\u542F\uFF0C\u8BF7\u7EE7\u7EED\u540E\u91CD\u65B0\u6838\u9A8C\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u8986\u76D6\u8BBE\u7F6E\u3002","authorization-changed":"\u6388\u6743\u5DF2\u6539\u53D8\uFF0C\u8BF7\u5728\u6743\u9650\u4E2D\u6838\u67E5\u540E\u7EE7\u7EED\u3002",MODEL_SOURCE_AUTHORIZATION_REQUIRED:"\u6A21\u578B\u6765\u6E90\u6388\u6743\u5DF2\u53D8\u5316\uFF0C\u8BF7\u8865\u5145\u4E00\u6B21\u6388\u6743\u540E\u7EE7\u7EED\u3002",HUMAN_SETTING_PINNED:"\u8BBE\u7F6E\u6743\u9650\u5DF2\u64A4\u9500\uFF0C\u8BF7\u5728\u6743\u9650\u4E2D\u6838\u67E5\u540E\u7EE7\u7EED\u3002"})[e]??(typeof e=="string"&&/^[A-Z_:-]+$/.test(e)?"\u8FD0\u884C\u68C0\u67E5\u672A\u901A\u8FC7\uFF0C\u8BF7\u68C0\u67E5\u4F9D\u8D56\u6216\u67E5\u770B\u9AD8\u7EA7\u8BBE\u7F6E\u4E2D\u7684\u9519\u8BEF\u3002":e),An=e=>Number.isFinite(e)&&e>=0?`${(e/1024**2).toFixed(1)} MiB`:"\u672A\u77E5",Kh={"live-root-conflict":{kind:"conflict",label:"voiceRecoveryPending",hint:"voiceRecoveryHint"},"predecessor-cleanup-pending":{kind:"cleanup",label:"voiceCleanupPending",hint:"voiceCleanupHint"},"helper-cleanup-pending":{kind:"cleanup",label:"voiceCleanupPending",hint:"voiceHelperCleanupHint"},"predecessor-stop-unconfirmed":{kind:"restart",label:"voiceRestartPending",hint:"voiceRestartHint"},"helper-stop-unconfirmed":{kind:"restart",label:"voiceRestartPending",hint:"voiceHelperRestartHint"},"root-stop-unconfirmed":{kind:"restart",label:"voiceRestartPending",hint:"voiceRootRestartHint"}};function _r(e,n){return e.checkedFor!==n?null:Kh[e.status?.voiceSession?.recovery?.kind]??null}var Xi=e=>!e.ttsCancelling&&!e.voiceStopUnconfirmed&&(!e.busy||!!(e.interruptibleRead&&!e.diagnosticStopPending));function Wo(e,n){let t=e.checkedFor===n?e.status:null;return!e.uncertain&&t?.enabled===!1&&t.ownerSessionId===null&&t.voiceControlBusy===!1&&t.voiceSession?.fullyStopped===!0&&t.voiceSession.id===null&&!_r(e,n)}function Yd(e,n){return!!(Wo(e,n)&&e.settingsFor===n&&e.settings?.revision&&!e.ttsCancelling&&!e.ttsUncertain&&!e.visibilityUncertain&&!e.settingsConflict&&!e.status.ttsRuntime?.busy&&!e.status.ttsRuntime?.blocked)}function yt(e,n){return!e.busy&&Yd(e,n)}function Vt(e,n){let t=(0,he.useRef)(!1),[o,i]=(0,he.useState)(!1),[r,s]=(0,he.useState)(null),[a,d]=(0,he.useState)(0);return[async(u,p)=>{if(t.current)return!1;t.current=!0,i(!0),s(u);try{return await e(n,u,p)}catch{return!1}finally{t.current=!1,i(!1),s(null),d(m=>m+1)}},o,r,{isLocked:()=>t.current,settled:a}]}function Sr({state:e,sessionId:n,run:t,refresh:o,canStopTts:i=!0,t:r=s=>s}){if(Yd(e,n))return null;let s=e.checkedFor===n?e.status:null,a=_r(e,n),d=e.settingsFor===n&&e.settings?.revision,l,u,p;e.voiceStopUnconfirmed?(l="\u505C\u6B62\u7ED3\u679C\u5C1A\u5F85\u786E\u8BA4\u3002",u=r("retryStatus"),p="status"):a?(l=r(a.hint),a.kind==="conflict"&&(u=r("voiceRecoveryCheck"),p="disable"),a.kind==="cleanup"&&(u=r("retryStatus"),p="status")):s?.enabled||s?.ownerSessionId?(l="\u8BF7\u5148\u505C\u6B62\u8BED\u97F3\uFF0C\u518D\u7F16\u8F91\u6216\u8BD5\u542C\u3002",u="\u505C\u6B62\u8BED\u97F3\u4EE5\u7F16\u8F91",p="disable"):e.settingsConflict?l="\u8BBE\u7F6E\u5DF2\u5728\u522B\u5904\u66F4\u65B0\u3002\u8BF7\u5148\u5904\u7406\u5F53\u524D\u8349\u7A3F\u3002":e.ttsCancelling||e.busy&&(!s||!d)?l="\u6B63\u5728\u8BFB\u53D6\u3001\u4FDD\u5B58\u6216\u505C\u6B62\u8BED\u97F3\uFF0C\u8BF7\u7A0D\u5019\u2026":s?.ttsRuntime?.blocked?l="\u6717\u8BFB\u505C\u6B62\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u91CD\u542F DSH\u3002":s?.ttsRuntime?.busy?(l="\u6717\u8BFB\u6B63\u5728\u8FDB\u884C\uFF0C\u7ED3\u675F\u540E\u53EF\u7F16\u8F91\u3002",i&&(u="\u505C\u6B62\u8BD5\u542C",p="cancel-tts")):e.ttsUncertain||e.uncertain||e.visibilityUncertain?(l="\u4E0A\u6B21\u64CD\u4F5C\u7684\u72B6\u6001\u5C1A\u5F85\u6838\u67E5\u3002",u=r("retryStatus"),p=e.visibilityUncertain||!s?"read-settings":"status"):!s||!d?(l=e.sourcePending&&!e.error?"\u6B63\u5728\u8BFB\u53D6\u8BED\u97F3\u72B6\u6001\u548C\u8BBE\u7F6E\u2026":"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u8BED\u97F3\u72B6\u6001\u6216\u8BBE\u7F6E\u3002",u="\u91CD\u65B0\u8BFB\u53D6",p=d?"status":"read-settings"):(l="\u8BED\u97F3\u5C1A\u672A\u786E\u8BA4\u505C\u6B62\u3002\u8BF7\u91CD\u65B0\u8BFB\u53D6\u72B6\u6001\u540E\u7F16\u8F91\u3002",u=r("retryStatus"),p="status");let m=()=>{p==="read-settings"&&o?o({settings:!0,force:!0}):t?.(n,p)};return(0,g.jsxs)("div",{className:R.note,role:"status","data-whale-settings-gate":a?.kind??p??"notice",children:[(0,g.jsx)("p",{children:l}),p&&t&&(0,g.jsx)(fe.Button,{variant:"outline","data-whale-operation":p==="disable"?"stop-voice":void 0,disabled:p==="disable"?!Xi(e):p!=="cancel-tts"&&e.busy,onClick:m,children:u})]})}function Dd(e){let n=e.state.settingsFor===e.sessionId?e.state.settings:null;return(0,g.jsx)(Md,{...e,settings:n},`${e.sessionId}:${e.state.settingsKey??n?.revision??"unread"}`)}function Jh({value:e,disabled:n,onChange:t}){return(0,g.jsxs)("label",{className:R.inlineField,children:["DeepSeek \u97F3\u8272",(0,g.jsxs)("select",{"aria-label":"DeepSeek \u97F3\u8272",value:e,disabled:n,onChange:o=>t(o.target.value),children:[(0,g.jsx)("option",{value:"stella",children:"\u6D77\u661F \xB7 \u5973\u58F0"}),(0,g.jsx)("option",{value:"tide",children:"\u6697\u6F6E \xB7 \u7537\u58F0"})]})]})}function Qh({value:e,capabilities:n,disabled:t,inspecting:o,checkFailed:i,unavailable:r,onChange:s}){let a=n?.systemVoices??[];return(0,g.jsxs)("div",{className:R.section,"data-system-tts":!0,children:[(0,g.jsxs)("label",{className:R.field,children:["\u7CFB\u7EDF\u97F3\u8272",(0,g.jsxs)("select",{value:e??"",disabled:t||!a.length&&!e,onChange:d=>s(d.target.value||null),children:[(0,g.jsx)("option",{value:"",children:"\u81EA\u52A8\u9009\u62E9\uFF08\u6309\u6587\u5B57\u8BED\u8A00\uFF09"}),e&&!a.some(d=>d.id===e)&&(0,g.jsx)("option",{value:e,children:n?"\u5DF2\u9009\u97F3\u8272\u4E0D\u53EF\u7528":"\u5DF2\u4FDD\u5B58\u97F3\u8272"}),a.map(d=>(0,g.jsxs)("option",{value:d.id,children:[d.name," \xB7 ",d.language]},d.id))]})]}),o&&(0,g.jsx)("p",{className:R.hint,role:"status",children:"\u6B63\u5728\u8BFB\u53D6 Windows \u7CFB\u7EDF\u97F3\u8272\u2026"}),!o&&(i||n?.platform==="win32"&&!n.systemVoices)&&(0,g.jsx)("p",{className:R.hint,role:"status",children:"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6 Windows \u7CFB\u7EDF\u97F3\u8272\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5\u3002"}),n?.platform!==void 0&&n.platform!=="win32"&&(0,g.jsx)("p",{className:R.hint,role:"status",children:"\u6B64\u8BBE\u5907\u65E0\u6CD5\u4F7F\u7528 Windows \u7CFB\u7EDF\u8BED\u97F3\uFF0C\u8BF7\u9009\u62E9\u5176\u4ED6\u6717\u8BFB\u6765\u6E90\u3002"}),n?.systemVoices?.length===0&&(0,g.jsx)("p",{className:R.hint,role:"status",children:"\u8BF7\u5728 Windows \u7684\u8BED\u97F3\u8BBE\u7F6E\u4E2D\u5B89\u88C5\u97F3\u8272\uFF0C\u518D\u5237\u65B0\u5217\u8868\u3002"}),r&&a.length>0&&(0,g.jsx)("p",{className:R.hint,role:"status",children:"\u5DF2\u9009\u97F3\u8272\u4E0D\u53EF\u7528\uFF0C\u8BF7\u4ECE\u5217\u8868\u9009\u62E9\u5176\u4ED6\u97F3\u8272\u3002"})]})}function eg({baseUrl:e,model:n,voice:t,apiKeyEnv:o}){let i=/[\x00-\x1f\x7f-\x9f]/;if(!e.trim()||!n.trim()||!t.trim())return"\u8BF7\u586B\u5199\u670D\u52A1\u5730\u5740\u3001\u6A21\u578B\u548C\u97F3\u8272\u3002";let r=e.trim(),s=/^https?:\/\/([^/]+)/i.exec(r)?.[1],a;try{a=new URL(r)}catch{}return!a||!s||/[\s\\?#]/.test(r)||s.includes("@")||i.test(e)||a.protocol==="http:"&&!/^(?:localhost|127\.0\.0\.1|\[::1\])(?::[0-9]+)?$/i.test(s)?"\u8BF7\u4F7F\u7528 HTTPS \u5730\u5740\u3002\u672C\u673A\u7684 localhost\u3001127.0.0.1 \u548C [::1] \u4E5F\u53EF\u4F7F\u7528 HTTP\u3002\u5730\u5740\u4E0D\u80FD\u5305\u542B\u8D26\u53F7\u3001\u5BC6\u7801\u3001\u67E5\u8BE2\u53C2\u6570\u6216\u7247\u6BB5\u3002":i.test(n)||i.test(t)?"\u6A21\u578B\u548C\u97F3\u8272\u4E0D\u80FD\u5305\u542B\u63A7\u5236\u5B57\u7B26\u3002":o?.trim()&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(o.trim())?"API Key \u73AF\u5883\u53D8\u91CF\u540D\u53EA\u80FD\u5305\u542B\u82F1\u6587\u5B57\u6BCD\u3001\u6570\u5B57\u548C\u4E0B\u5212\u7EBF\uFF0C\u4E14\u4E0D\u80FD\u4EE5\u6570\u5B57\u5F00\u5934\u3002":null}function ng({value:e,disabled:n,fieldError:t,onChange:o,onConsent:i}){return(0,g.jsxs)("div",{className:R.section,"data-custom-tts":!0,children:[(0,g.jsxs)("label",{className:R.field,children:["\u670D\u52A1\u5730\u5740\uFF08Base URL\uFF09",(0,g.jsx)(fe.Input,{value:e.baseUrl,disabled:n,maxLength:2048,inputMode:"url",autoComplete:"off",spellCheck:!1,placeholder:"https://tts.example.com/v1",onChange:r=>o("baseUrl",r.target.value)}),(0,g.jsx)("small",{children:"\u53EF\u586B\u5199\u57FA\u7840\u5730\u5740\u6216\u4EE5 /audio/speech \u7ED3\u5C3E\u7684\u5B8C\u6574\u63A5\u53E3\u5730\u5740\u3002"})]}),(0,g.jsxs)("label",{className:R.field,children:["\u6A21\u578B",(0,g.jsx)(fe.Input,{value:e.model,disabled:n,maxLength:256,autoComplete:"off",spellCheck:!1,onChange:r=>o("model",r.target.value)})]}),(0,g.jsxs)("label",{className:R.field,children:["\u97F3\u8272",(0,g.jsx)(fe.Input,{value:e.voice,disabled:n,maxLength:256,autoComplete:"off",spellCheck:!1,onChange:r=>o("voice",r.target.value)})]}),(0,g.jsxs)("label",{className:R.field,children:["API Key \u73AF\u5883\u53D8\u91CF\u540D\uFF08\u53EF\u9009\uFF09",(0,g.jsx)(fe.Input,{value:e.apiKeyEnv??"",disabled:n,maxLength:128,autoComplete:"off",spellCheck:!1,placeholder:"MY_TTS_API_KEY",onChange:r=>o("apiKeyEnv",r.target.value)}),(0,g.jsx)("small",{children:"\u5728\u8FD0\u884C DSH \u7684\u73AF\u5883\u4E2D\u8BBE\u7F6E\u5BC6\u94A5\uFF0C\u8FD9\u91CC\u53EA\u586B\u53D8\u91CF\u540D\u3002\u670D\u52A1\u65E0\u9700\u5BC6\u94A5\u65F6\u53EF\u7559\u7A7A\u3002"})]}),(0,g.jsxs)("label",{className:R.inlineField,children:["\u97F3\u9891\u683C\u5F0F",(0,g.jsxs)("select",{value:e.format,disabled:n,onChange:r=>o("format",r.target.value),children:[(0,g.jsx)("option",{value:"wav",children:"WAV"}),(0,g.jsx)("option",{value:"mp3",children:"MP3"})]})]}),(0,g.jsx)("p",{className:R.hint,children:"\u6717\u8BFB\u4F1A\u5411\u670D\u52A1\u53D1\u9001\u56DE\u7B54\u4E2D\u5F85\u6717\u8BFB\u7684\u6587\u5B57\u3002\u4FDD\u5B58\u8BBE\u7F6E\u540E\u53EF\u53D1\u9001\u56FA\u5B9A\u793A\u4F8B\u8BD5\u542C\u3002"}),(0,g.jsxs)("label",{className:R.inlineField,children:[(0,g.jsx)("input",{type:"checkbox",checked:e.textTransmissionAccepted,disabled:n,onChange:r=>i(r.target.checked)}),"\u540C\u610F\u53D1\u9001\u5F85\u6717\u8BFB\u7684\u6587\u5B57"]}),t&&(0,g.jsx)("p",{className:R.hint,role:"status",children:t})]})}function Md({state:e,sessionId:n,run:t,settings:o,prepared:i=!1,active:r=!0,markSettingsEdited:s,pickPath:a,renderStep:d,advanceTts:l}){let[u,p]=(0,he.useState)(()=>({...Li,...o?.ttsSetup})),m=JSON.stringify(o?.ttsSetup),[f,b]=(0,he.useState)(m),[v,w]=(0,he.useState)(null),[k,P,M]=Vt(t,n),B=(0,he.useId)(),[E,T]=(0,he.useState)(!1),z=(0,he.useRef)(!1),$=!!d;$&&o&&m!==f&&(b(m),p({...Li,...o.ttsSetup}),w(null));let W=e.ttsCapabilitiesFor===n?e.ttsCapabilities:null,_=e.checkedFor===n?e.status?.ttsRuntime:null,C=e.ttsPreviewFor===n?e.ttsPreview:null,N=e.installerFor===n?e.installer?.jobs?.find(ge=>kr(ge,o)):null,S=!yt(e,n)||P,I=u.provider==="system",F=u.provider==="deepseek",L=u.provider==="custom",Z=()=>{z.current=!0,k("inspect-tts")};(0,he.useEffect)(()=>{$&&r&&!S&&o&&!W&&!z.current&&(I||F)&&Z()},[$,r,S,o,W,I,F]);let X=W?.systemVoices??[],G=!!(W&&u.systemVoiceId&&!X.some(ge=>ge.id===u.systemVoiceId)),ae=X.length>0&&!G,le={...Li,...o?.ttsSetup},{customTts:pe,...xe}=u,A=L?pe:le.customTts,oe=A?{...xe,customTts:A}:xe,Q=Object.entries(oe).some(([ge,ze])=>JSON.stringify(ze)!==JSON.stringify(le[ge])),V=pe??qh,ke=L?eg(V):null,on=ji(e),Fe=L&&(e.authorizationUncertain||le.customTts?.textTransmissionAccepted&&!e.authorization),_n=L&&!on,Je=(v?.revision===e.authorization?.revision?v?.accepted:void 0)??(V.textTransmissionAccepted&&on),re=F&&(e.authorizationUncertain||u.deepseekTextTransmissionAccepted&&!e.authorization),Ye=F&&!re&&!(u.deepseekTextTransmissionAccepted&&xr(e)),Te=F&&W?.deepseekKeyAvailable!==!0,$e=ge=>{s?.("save-tts"),p(ze=>({...ze,...ge}))},wt=(ge,ze)=>{V[ge]!==ze&&(w(null),$e({customTts:{...V,[ge]:ze,textTransmissionAccepted:!1}}))},nt=ge=>{w({revision:e.authorization?.revision,accepted:ge}),$e({customTts:{...V,textTransmissionAccepted:ge}})},Ne=u.localModelId==="qwen3-tts-base-1.7b-gguf",Qe=Number(u.volume),Sn=!!(u.localModelId&&u.localModelPath)&&(!$||le.provider==="local")&&(!u.referenceAudioPath||Ne),Bn=!Te&&!re&&(!L||!ke&&!Fe&&Je)&&(u.provider!=="local"||Sn)&&u.volume!==""&&Number.isFinite(Qe)&&Qe>=0&&Qe<=1,cn={...oe,volume:Qe,deepseekTextTransmissionAccepted:F||u.deepseekTextTransmissionAccepted};L&&(cn.customTts={...V,baseUrl:V.baseUrl.trim(),model:V.model.trim(),voice:V.voice.trim(),apiKeyEnv:V.apiKeyEnv?.trim()||null,textTransmissionAccepted:Je});let xt=o&&(Q||Ye||_n||!o.ttsSetup),mn=I||!L&&(Q||Ye),kn=async()=>{let ge=await k("save-tts",{revision:o.revision,values:$d(cn)});return ge&&($&&b(null),w(null)),ge},Wn=_?.busy||_?.blocked||e.ttsUncertain||e.ttsCancelling||C?.status==="preparing"||M==="preview-tts",_t=(0,g.jsxs)(g.Fragment,{children:[(!$||u.provider!=="off")&&(0,g.jsx)(fe.Button,{variant:"outline",disabled:S||!o||!Bn||u.provider==="off"||I&&!ae||L&&(Q||!on),onClick:()=>k("preview-tts",mn?{revision:o.revision,values:Od(cn,o.ttsSetup)}:void 0),children:I?"\u8BD5\u542C\u7CFB\u7EDF\u97F3\u8272":Ye?"\u53D1\u9001\u793A\u4F8B\u5E76\u8BD5\u542C":!L&&Q?"\u8BD5\u542C\u5F53\u524D\u9009\u62E9":"\u8BD5\u542C\u5DF2\u4FDD\u5B58\u914D\u7F6E"}),(0,g.jsx)(fe.Button,{variant:"outline",disabled:!Wn,onClick:()=>{t(n,"cancel-tts")},children:"\u505C\u6B62\u8BD5\u542C"})]}),zn=$&&I,te=C&&(0,g.jsxs)("p",{role:"status",className:R.hint,children:[{preparing:"\u8BD5\u542C\u51C6\u5907\u4E2D",cancelling:"\u6B63\u5728\u505C\u6B62\u8BD5\u542C",cancelled:"\u8BD5\u542C\u5DF2\u53D6\u6D88",idle:"\u8BD5\u542C\u5DF2\u505C\u6B62",completed:"\u8BD5\u542C\u5DF2\u7ED3\u675F",failed:C.detail??"\u8BD5\u542C\u5931\u8D25\uFF0C\u6B63\u5728\u6838\u67E5\u72B6\u6001",unconfirmed:"\u65E0\u6CD5\u786E\u8BA4\u8BD5\u542C\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B"}[C.status]??C.status,Hi[C.provider]?` \xB7 ${Hi[C.provider]}`:""]}),hn=(!$||u.provider!=="off"||Wn)&&(0,g.jsxs)("div",{className:R.actions,children:[(!$||L)&&(0,g.jsx)(fe.Button,{variant:"primary",className:R.primary,disabled:S||!Bn||!xt,onClick:()=>{kn()},children:M==="save-tts"?"\u4FDD\u5B58\u4E2D\u2026":Ye?"\u542F\u7528 DeepSeek \u6717\u8BFB":"\u4FDD\u5B58\u6717\u8BFB\u8BBE\u7F6E"}),!zn&&_t,I&&(0,g.jsx)(fe.Button,{variant:"outline",disabled:S,onClick:Z,children:"\u5237\u65B0\u7CFB\u7EDF\u97F3\u8272"})]}),gn=(0,g.jsxs)("section",{className:R.section,"aria-label":"\u6717\u8BFB\u8BBE\u7F6E","data-settings-draft":"save-tts",children:[(0,g.jsx)("h3",{tabIndex:$?-1:void 0,children:$?"\u600E\u4E48\u542C\u56DE\u7B54\uFF1F":"\u56DE\u7B54\u600E\u4E48\u53D1\u58F0"}),!i&&(0,g.jsx)(Sr,{state:e,sessionId:n,run:t,canStopTts:!1}),!$&&!I&&!F&&!L&&(!i||!o||!W||e.uncertain||e.ttsUncertain)&&(0,g.jsx)("div",{className:R.actions,children:(0,g.jsx)(fe.Button,{variant:"outline",disabled:e.busy||P,onClick:Z,children:"\u68C0\u6D4B\u672C\u673A\u8BED\u97F3"})}),(0,g.jsxs)("fieldset",{className:`${R.choices} ${R.sourceChoices}`,disabled:S||!o,children:[(0,g.jsx)("legend",{children:"\u6717\u8BFB\u6765\u6E90"}),Td.map(([ge,ze,Fn])=>(0,g.jsxs)("label",{className:R.choice,"data-selected":u.provider===ge,children:[(0,g.jsx)("input",{type:"radio",name:$?"setup-provider":B,checked:u.provider===ge,onChange:()=>$e({provider:ge})}),(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:ze}),(0,g.jsx)("small",{children:Fn})]})]},ge))]}),I&&(0,g.jsx)(Qh,{value:u.systemVoiceId,capabilities:W,disabled:S,inspecting:M==="inspect-tts",checkFailed:z.current&&!P&&!W&&!!e.error,unavailable:G,onChange:ge=>$e({systemVoiceId:ge})}),F&&(0,g.jsxs)("div",{className:R.section,"data-whale-deepseek-setup":!0,children:[(0,g.jsx)("p",{className:R.hint,children:jh}),re&&(0,g.jsx)("p",{role:"status",className:R.hint,children:"\u6B63\u5728\u8BFB\u53D6 DeepSeek \u6717\u8BFB\u6388\u6743\u2026"}),Ye&&(0,g.jsx)("p",{className:R.hint,children:"\u542F\u7528\u524D\uFF0C\u56DE\u7B54\u53EA\u663E\u793A\u6587\u5B57\u3002\u8BD5\u542C\u53EA\u53D1\u9001\u56FA\u5B9A\u793A\u4F8B\u3002"}),Te&&(M==="inspect-tts"?(0,g.jsx)("p",{role:"status",className:R.hint,children:"\u6B63\u5728\u68C0\u67E5 DSH \u4E2D\u4FDD\u5B58\u7684 DeepSeek API Key\u2026"}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("p",{role:"status",className:R.hint,children:W?Gh:"\u6682\u65F6\u65E0\u6CD5\u68C0\u67E5 DeepSeek API Key\u3002"}),(0,g.jsx)(fe.Button,{variant:"outline",disabled:e.busy||P,onClick:Z,children:W?"\u91CD\u65B0\u68C0\u67E5 DeepSeek API Key":"\u68C0\u67E5 DeepSeek API Key"})]})),(0,g.jsx)(Jh,{value:u.deepseekVoice,disabled:S,onChange:ge=>$e({deepseekVoice:ge})})]}),L&&(0,g.jsx)(ng,{value:{...V,textTransmissionAccepted:Je},disabled:S||Fe,fieldError:Fe?"\u6B63\u5728\u8BFB\u53D6\u81EA\u5B9A\u4E49 TTS \u6717\u8BFB\u6388\u6743\u2026":ke,onChange:wt,onConsent:nt}),u.provider==="local"&&(u.localModelId&&!$?(0,g.jsxs)("div",{className:R.section,children:[(0,g.jsxs)("div",{className:R.currentModel,children:[(0,g.jsxs)("span",{children:["\u5F53\u524D\u6717\u8BFB\u6A21\u578B ",(0,g.jsx)("strong",{children:u.localModelId.startsWith("qwen3")?"Qwen3-TTS":u.localModelId.includes("melo")?"MeloTTS":u.localModelId})]}),(0,g.jsx)(fe.Button,{variant:"outline","aria-expanded":E,disabled:Q,onClick:()=>T(ge=>!ge),children:"\u5207\u6362\u5F53\u524D\u6A21\u578B"})]}),E&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(Bd,{state:e,sessionId:n,run:t,purpose:"tts"}),(0,g.jsxs)("details",{className:R.details,children:[(0,g.jsx)("summary",{children:"\u5B89\u88C5\u5176\u4ED6\u6717\u8BFB\u6A21\u578B"}),(0,g.jsx)(Gi,{pickPath:a,state:e,sessionId:n,run:t,active:r})]})]})]}):(0,g.jsx)(Gi,{pickPath:a,state:e,sessionId:n,run:t,active:r,onboarding:$,initialModelId:u.localModelId})),u.provider==="local"&&!Q&&N?.modelId==="qwen3-tts-base-1.7b-gguf"&&(0,g.jsxs)("p",{className:R.hint,children:["\u5F53\u524D\u5B89\u88C5\u65B9\u6848\uFF1A",zo(N.compute),"\u3002",N.compute==="cpu"?"\u6B64\u5B89\u88C5\u53EA\u4F7F\u7528 CPU\u3002\u53EF\u5728\u201C\u5207\u6362\u5F53\u524D\u6A21\u578B \u2192 \u5B89\u88C5\u5176\u4ED6\u6717\u8BFB\u6A21\u578B\u201D\u9009\u62E9\u81EA\u52A8 GPU\uFF1B\u4E0B\u8F7D\u8FD0\u884C\u7EC4\u4EF6\u524D\u4ECD\u9700\u786E\u8BA4\u3002":"\u662F\u5426\u5B9E\u9645\u4F7F\u7528 GPU\uFF0C\u4EE5\u5B8C\u6210\u5408\u6210\u540E\u7684\u672C\u5730\u8BA1\u7B97\u72B6\u6001\u4E3A\u51C6\u3002"]}),hn,!$&&(0,g.jsxs)("details",{className:R.details,children:[(0,g.jsx)("summary",{children:"\u97F3\u8272\u4E0E\u97F3\u91CF"}),(0,g.jsxs)("div",{className:R.section,children:[u.provider==="local"&&(Ne||u.referenceAudioPath)&&(0,g.jsxs)("div",{className:R.section,"data-reference-voice":!0,children:[(0,g.jsx)(_o,{className:R.field,label:"\u53C2\u8003\u97F3\u9891\uFF08WAV\uFF09",kind:"referenceAudio",value:u.referenceAudioPath,disabled:S||!Ne,active:r,scope:u.provider+":"+u.localModelId,pickPath:a,sessionId:n,placeholder:"\u8BF7\u70B9\u51FB\u9009\u62E9\u6587\u4EF6",onChange:ge=>$e({referenceAudioPath:ge.trim()||null})}),u.referenceAudioPath&&(0,g.jsx)(fe.Button,{variant:"outline",disabled:S,onClick:()=>$e({referenceAudioPath:null}),children:"\u6E05\u9664\u53C2\u8003\u97F3\u8272"})]}),u.provider!=="local"&&u.referenceAudioPath&&(0,g.jsxs)("div",{className:R.section,children:[(0,g.jsx)("p",{className:R.hint,children:"\u672C\u5730\u53C2\u8003\u97F3\u8272\u5DF2\u4FDD\u7559\u3002"}),(0,g.jsx)(fe.Button,{variant:"outline",disabled:S,onClick:()=>$e({referenceAudioPath:null}),children:"\u6E05\u9664\u53C2\u8003\u97F3\u8272"})]}),(0,g.jsxs)("label",{className:R.inlineField,children:["\u6717\u8BFB\u97F3\u91CF",(0,g.jsx)(jt,{"aria-label":"\u6717\u8BFB\u97F3\u91CF\u6ED1\u5757",min:"0",max:"1",step:"0.05",value:u.volume,disabled:S,onChange:ge=>$e({volume:Number(ge.target.value)})}),(0,g.jsx)(fe.Input,{type:"number",min:"0",max:"1",step:"0.05",value:u.volume,disabled:S,onChange:ge=>$e({volume:ge.target.value})})]})]})]}),!zn&&te,!$&&_&&(0,g.jsxs)("p",{role:"status",className:R.hint,children:[_.blocked?"\u8BD5\u542C\u5C1A\u672A\u505C\u6B62\uFF0C\u8BF7\u91CD\u542F\u5BBF\u4E3B\u3002":`\u6717\u8BFB\u72B6\u6001\uFF1A${{idle:"\u7A7A\u95F2",preparing:"\u51C6\u5907\u4E2D",synthesizing:"\u5408\u6210\u4E2D","playback-requested":"\u5DF2\u8BF7\u6C42\u64AD\u653E","text-only":"\u5DF2\u663E\u793A\u6587\u5B57",completed:"\u8BD5\u542C\u5DF2\u7ED3\u675F",cancelled:"\u5DF2\u53D6\u6D88",failed:"\u5931\u8D25"}[_.state]??_.state}`,_.localComputeBackend?` \xB7 \u672C\u5730\u8BA1\u7B97\uFF1A${_.localComputeBackend.toUpperCase()}${_.localComputeVerified?"\uFF08\u5DF2\u5B8C\u6210\u5408\u6210\uFF09":"\uFF08\u5F85\u9A8C\u8BC1\uFF09"}`:"",_.localComputeFallback?" \xB7 \u5DF2\u56DE\u9000\u540C\u6A21\u578B CPU":""]}),!$&&_?.localTimings&&(0,g.jsxs)("details",{className:R.details,children:[(0,g.jsx)("summary",{children:"\u5DF2\u5B8C\u6210\u6717\u8BFB\u7247\u6BB5\u8017\u65F6"}),(0,g.jsxs)("p",{className:R.hint,children:["\u51C6\u5907 ",(_.localTimings.preparationMs/1e3).toFixed(2)," \u79D2 \xB7 \u8BBE\u5907\u9009\u62E9 ",(_.localTimings.deviceSelectionMs/1e3).toFixed(2)," \u79D2 \xB7 \u5408\u6210 ",(_.localTimings.synthesisMs/1e3).toFixed(2)," \u79D2 \xB7 \u64AD\u653E ",(_.localTimings.playbackMs/1e3).toFixed(2)," \u79D2"]}),(0,g.jsxs)("p",{className:R.hint,children:[_.localTimings.chunks," \u6BB5 \xB7 ",_.localTimings.modelResident?"\u4E0A\u6B21\u7247\u6BB5\u7ED3\u675F\u65F6\u6A21\u578B\u4ECD\u9A7B\u7559\uFF0C\u5B8C\u6574\u5408\u6210\u540E\u64AD\u653E\u3002\u51C6\u5907\u5305\u542B\u6587\u4EF6\u6821\u9A8C\uFF1B\u5408\u6210\u5305\u542B\u9996\u6B21\u52A0\u8F7D\u548C\u670D\u52A1\u54CD\u5E94\u3002":"\u5F53\u524D\u672C\u5730\u6A21\u578B\u9010\u6BB5\u542F\u52A8\uFF0C\u5B8C\u6574\u5408\u6210\u540E\u64AD\u653E\u3002\u51C6\u5907\u5305\u542B\u6587\u4EF6\u6821\u9A8C\uFF1B\u5408\u6210\u5305\u542B\u52A0\u8F7D\u4E0E\u5931\u8D25\u91CD\u8BD5\u3002","\u8017\u65F6\u4E0D\u662F\u9996\u97F3\u5EF6\u8FDF\u6216 GPU \u52A0\u901F\u6BD4\u3002"]})]})]});return $?d(gn,{pending:P,disabled:S||!o||!Bn,label:M==="save-tts"?"\u4FDD\u5B58\u4E2D\u2026":Ye?"\u542F\u7528 DeepSeek \u8BED\u97F3\u5408\u6210\u5E76\u7EE7\u7EED":"\u4E0B\u4E00\u6B65",onClick:()=>l(xt?kn:null),audition:zn?_t:null,feedback:zn?te:null}):gn}function kr(e,n){if(e.status!=="installed"||!e.installedPath||!n)return!1;if(e.purpose==="tts"||e.recommendedSettings?.tts)return n.ttsSetup?.provider==="local"&&n.ttsSetup.localModelId===e.modelId&&n.ttsSetup.localModelPath===e.installedPath;let t=e.recommendedSettings;return!t||t.asr!==n.modelSetup?.asr?!1:Object.entries(t.models??{}).some(([o,i])=>i===e.installedPath&&n.modelSetup?.models?.[o]===i)}function Zd(e,n){return(e?.models??[]).map(t=>{let o=(e.jobs??[]).filter(s=>s.modelId===t.id),i=o.filter(s=>s.status==="installed").sort((s,a)=>String(a.updatedAt??a.createdAt??"").localeCompare(String(s.updatedAt??s.createdAt??""))),r=i.find(s=>kr(s,n));return{model:t,jobs:o,installed:i,current:r,preferred:r??i[0],active:o.find(s=>["queued","running","paused","failed"].includes(s.status))}})}var Wr=e=>(e?.title??e?.id??"").split(" \xB7 ")[0],zo=e=>({cpu:"CPU",auto:"\u81EA\u52A8 GPU",cuda:"CUDA / HIP",vulkan:"Vulkan"})[e]??e??"\u672A\u77E5",Ki=e=>{let n=new Date(e);return Number.isFinite(n.getTime())?n.toLocaleString():"\u65F6\u95F4\u672A\u77E5"};function Bd({state:e,sessionId:n,run:t,purpose:o}){let[i,r]=Vt(t,n),s=e.installerFor===n?e.installer:null,a=e.settingsFor===n?e.settings:null,d=Zd(s,a).filter(u=>(!o||u.model.purpose===o)&&u.preferred),l=yt(e,n)&&!r&&!e.settingsDraftActions?.some(u=>["save-models","save-tts"].includes(u));return(0,g.jsxs)("section",{className:R.switcher,"aria-label":"\u5207\u6362\u5DF2\u5B89\u88C5\u6A21\u578B","data-no-settings-draft":!0,children:[s?d.length?d.map(({model:u,preferred:p,current:m})=>(0,g.jsxs)("div",{className:R.switchRow,children:[(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:Wr(u)}),(0,g.jsxs)("small",{children:[u.purpose==="tts"?"\u6717\u8BFB":"\u8BC6\u522B"," \xB7 ",zo(p.compute),m?" \xB7 \u5F53\u524D\u914D\u7F6E":""]})]}),(0,g.jsxs)("div",{className:R.actions,children:[u.purpose==="tts"&&!m&&(0,g.jsx)(fe.Button,{variant:"outline",disabled:!l||!p.installedPath,onClick:()=>i("preview-tts",{revision:a.revision,values:Od({...a.ttsSetup,provider:"local",localModelId:u.id,localModelPath:p.installedPath,referenceAudioPath:null},a.ttsSetup)}),children:"\u5148\u8BD5\u542C"}),(0,g.jsx)(fe.Button,{variant:"outline",disabled:!l||!!m,onClick:()=>i("apply-model-install",{id:p.id,revision:a.revision}),children:m?"\u5F53\u524D\u6A21\u578B":"\u9A8C\u8BC1\u5E76\u5207\u6362"})]})]},u.id)):(0,g.jsx)("p",{className:R.hint,children:"\u5C1A\u65E0\u53EF\u5207\u6362\u7684\u5DF2\u5B89\u88C5\u6A21\u578B\uFF0C\u8BF7\u5148\u5728\u6A21\u578B\u4E0B\u8F7D\u4E2D\u5B89\u88C5\u3002"}):(0,g.jsx)("p",{className:R.hint,children:"\u6B63\u5728\u8BFB\u53D6\u5DF2\u5B89\u88C5\u6A21\u578B\u3002"}),!!d.length&&!l&&(0,g.jsx)("p",{className:R.hint,children:"\u5207\u6362\u6A21\u578B\u524D\u9700\u505C\u6B62\u8BED\u97F3\uFF0C\u5DF2\u5B89\u88C5\u6587\u4EF6\u4E0D\u4F1A\u91CD\u65B0\u4E0B\u8F7D\u3002"})]})}function qi({job:e,snapshot:n,settings:t,disabled:o,writable:i,execute:r,history:s=!1}){let a=e.status==="blocked",d=kr(e,t);return(0,g.jsxs)("article",{className:R.job,"data-model-job":e.id,children:[(0,g.jsxs)("div",{className:R.jobHeading,children:[(0,g.jsx)("strong",{children:Wr(n.models.find(l=>l.id===e.modelId))||e.modelId}),(0,g.jsxs)("small",{children:[zo(e.compute)," \xB7 ",Ki(e.createdAt)]})]}),(0,g.jsxs)("p",{role:"status",children:[d?"\u5F53\u524D\u914D\u7F6E \xB7 ":"",a?e.error?.code==="CATALOG_CHANGED"?"\u5B89\u88C5\u6E05\u5355\u5DF2\u53D8\u66F4\uFF0C\u65E7\u4EFB\u52A1\u5DF2\u9694\u79BB":"\u6B64\u5B89\u88C5\u4EFB\u52A1\u5DF2\u505C\u6B62":{queued:"\u7B49\u5F85\u4E2D",running:"\u5904\u7406\u4E2D",paused:"\u5DF2\u6682\u505C",failed:"\u5931\u8D25",cancelled:"\u5DF2\u53D6\u6D88",installed:"\u5DF2\u5B89\u88C5\uFF0C\u5B57\u8282\u6821\u9A8C\u901A\u8FC7","checking-runtime":"\u68C0\u67E5\u8FD0\u884C\u4F9D\u8D56","verifying-local":"\u6821\u9A8C\u672C\u673A\u5DF2\u6709\u6A21\u578B",downloading:"\u4E0B\u8F7D\u4E2D",verifying:"\u6821\u9A8C\u6587\u4EF6",installing:"\u63D0\u4EA4\u5B89\u88C5"}[e.stage]??e.stage]}),!a&&!s&&Number.isFinite(e.totalBytes)&&e.totalBytes>0&&Number.isFinite(e.receivedBytes)&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("progress",{max:e.totalBytes,value:Math.min(e.receivedBytes,e.totalBytes),"aria-label":"\u4E0B\u8F7D\u5B57\u8282\u8FDB\u5EA6"}),(0,g.jsxs)("small",{children:["\u4E0B\u8F7D ",An(e.receivedBytes)," / ",An(e.totalBytes)]})]}),e.error&&(0,g.jsx)("p",{role:"alert",children:e.error.message}),s&&e.installedPath&&(0,g.jsxs)("details",{className:R.installPath,children:[(0,g.jsx)("summary",{children:"\u5B89\u88C5\u4F4D\u7F6E"}),(0,g.jsx)("p",{children:e.installedPath})]}),!a&&(0,g.jsxs)("div",{className:R.actions,children:[["queued","running"].includes(e.status)&&(0,g.jsx)(fe.Button,{variant:"outline",disabled:o,onClick:()=>r("control-model-install",{id:e.id,operation:"pause"}),children:"\u6682\u505C\uFF0C\u4FDD\u7559\u8FDB\u5EA6"}),["paused","failed"].includes(e.status)&&(0,g.jsx)(fe.Button,{variant:"outline",disabled:o,onClick:()=>r("control-model-install",{id:e.id,operation:"resume"}),children:"\u6062\u590D\u540C\u4E00\u6765\u6E90\u4E0B\u8F7D"}),["queued","running","paused","failed"].includes(e.status)&&(0,g.jsx)(fe.Button,{variant:"outline",disabled:o,onClick:()=>r("control-model-install",{id:e.id,operation:"cancel"}),children:"\u53D6\u6D88\u5E76\u6E05\u9664\u6B64\u4EFB\u52A1\u4E34\u65F6\u6587\u4EF6"}),e.status==="installed"&&!d&&(0,g.jsx)(fe.Button,{variant:"outline",disabled:!i,onClick:()=>r("apply-model-install",{id:e.id,revision:t.revision}),children:"\u9A8C\u8BC1\u5E76\u5207\u6362"})]}),e.status==="installed"&&(0,g.jsx)("small",{children:"\u5207\u6362\u524D\u8BF7\u7ED3\u675F\u5BF9\u8BDD\u3002\u4E0B\u6B21\u5F00\u59CB\u5BF9\u8BDD\u65F6\u4F7F\u7528\u65B0\u6A21\u578B\u3002"})]})}function Fd({state:e,sessionId:n,run:t}){let[o,i]=(0,he.useState)(""),[r,s]=(0,he.useState)("cpu"),[a,d]=(0,he.useState)(!1),[l,u]=Vt(t,n),p=e.installerFor===n?e.installer:null,m=e.settingsFor===n?e.settings:null,f=Zd(p,m).filter(z=>z.model.id!=="sensevoice-int8-2024-07-17"||z.active),b=f.find(z=>z.model.id===o),v=b?.model,w=e.installPlanFor===n&&e.installPlan?.modelId===o&&e.installPlan?.compute===r&&!e.installPlan?.sourceDirectory?e.installPlan:null,k=!!e.busy||e.uncertain||e.installerUncertain||u,P=!u&&yt(e,n)&&!e.settingsDraftActions?.some(z=>["save-models","save-tts"].includes(z)),M=(0,he.useId)(),B=(p?.jobs??[]).filter(z=>["installed","cancelled"].includes(z.status)).slice().reverse(),E=p?.hardware,T=p?.refresh?.observedAt??p?.compute?.observedAt;return(0,g.jsxs)("section",{className:`${R.section} ${R.modelInstaller}`,"aria-label":"\u6A21\u578B\u5B89\u88C5",children:[(0,g.jsxs)("div",{className:R.hardwareSummary,children:[(0,g.jsxs)("span",{children:["\u5185\u5B58 ",An(E?.totalMemoryBytes)," \xB7 \u53EF\u7528 ",An(E?.availableMemoryBytes)," \xB7 \u663E\u5B58 ",An(E?.gpuMemoryBytes)]}),(0,g.jsxs)("small",{children:[T?"\u66F4\u65B0\u4E8E "+Ki(T):"\u7B49\u5F85\u68C0\u6D4B"," \xB7 \u6BCF 5 \u5206\u949F"]})]}),(p?.refresh?.error||e.modelComputeError)&&(0,g.jsxs)("p",{className:R.hint,role:"status",children:[p?.refresh?.error??"\u672C\u6B21\u786C\u4EF6\u68C0\u6D4B\u672A\u5B8C\u6210","\uFF1B\u4FDD\u7559\u4E0A\u6B21\u7ED3\u679C\u3002"]}),e.installerError&&(0,g.jsx)("p",{role:"alert",className:R.note,children:e.installerError}),e.installerUncertain&&(0,g.jsx)("p",{role:"status",className:R.note,children:"\u6B63\u5728\u6838\u67E5\u5B89\u88C5\u72B6\u6001\u3002"}),(0,g.jsxs)("div",{className:R.currentModel,children:[(0,g.jsxs)("span",{children:["\u8BC6\u522B ",(0,g.jsx)("strong",{children:"SenseVoice"})," \xB7 \u6717\u8BFB ",(0,g.jsx)("strong",{children:m?.ttsSetup?.provider==="local"?m.ttsSetup.localModelId?.startsWith("qwen3")?"Qwen3-TTS":m.ttsSetup.localModelId?.startsWith("vits-melo")?"MeloTTS":m.ttsSetup.localModelId??"\u672C\u5730\u6A21\u578B":m?.ttsSetup?.provider==="deepseek"?m.ttsSetup.deepseekTextTransmissionAccepted&&xr(e)?"DeepSeek":"DeepSeek \u5F85\u542F\u7528":Hi[m?.ttsSetup?.provider]??"\u672A\u914D\u7F6E"})]}),(0,g.jsx)(fe.Button,{variant:"outline","aria-expanded":a,onClick:()=>d(z=>!z),children:"\u5207\u6362\u5F53\u524D\u6A21\u578B"})]}),a&&(0,g.jsx)(Bd,{state:e,sessionId:n,run:t}),p?(0,g.jsxs)("fieldset",{className:`${R.choices} ${R.modelChoices}`,disabled:k,children:[(0,g.jsx)("legend",{children:"\u9009\u62E9\u6A21\u578B"}),f.map(({model:z,current:$,preferred:W,active:_})=>(0,g.jsxs)("label",{className:R.choice,"data-selected":o===z.id,children:[(0,g.jsx)("input",{type:"radio",name:M,checked:o===z.id,onChange:()=>{i(z.id),s(z.computeOptions?.includes("auto")?"auto":"cpu")}}),(0,g.jsxs)("span",{children:[(0,g.jsxs)("strong",{children:[Wr(z),z.recommendation?.recommended&&(0,g.jsx)("span",{className:R.badge,children:"\u63A8\u8350"})]}),(0,g.jsxs)("small",{children:[z.purpose==="tts"?"\u6717\u8BFB":"\u8BC6\u522B"," \xB7 ",An(z.totalBytes)]}),(0,g.jsx)("small",{children:$?"\u5F53\u524D\u914D\u7F6E":_?{queued:"\u7B49\u5F85\u4E0B\u8F7D",running:"\u4E0B\u8F7D\u5904\u7406\u4E2D",paused:"\u4E0B\u8F7D\u5DF2\u6682\u505C",failed:"\u4E0B\u8F7D\u5931\u8D25"}[_.status]:W?"\u5DF2\u5B89\u88C5\uFF0C\u53EF\u5207\u6362":z.available?"\u53EF\u51C6\u5907\u5B89\u88C5":"\u6682\u4E0D\u53EF\u5B89\u88C5"}),!z.available&&(0,g.jsx)("small",{children:z.reason??z.recommendation?.reason})]})]},z.id))]}):(0,g.jsx)("p",{className:R.note,children:"\u6B63\u5728\u8BFB\u53D6\u6A21\u578B\u5217\u8868\u3002"}),v&&(0,g.jsxs)("div",{className:R.selectedModel,children:[(0,g.jsxs)("label",{className:R.inlineField,children:["\u63A8\u7406\u8BBE\u5907",(0,g.jsx)("select",{value:r,disabled:k,onChange:z=>s(z.target.value),children:(v.computeOptions??["cpu"]).map(z=>(0,g.jsxs)("option",{value:z,children:[zo(z),z==="cpu"?"":" \xB7 CPU \u515C\u5E95"]},z))})]}),(0,g.jsxs)("div",{className:R.actions,children:[b.preferred&&(0,g.jsx)(fe.Button,{variant:"outline",disabled:!P||!!b.current,onClick:()=>l("apply-model-install",{id:b.preferred.id,revision:m.revision}),children:b.current?"\u5F53\u524D\u6A21\u578B":"\u9A8C\u8BC1\u5E76\u5207\u6362"}),(0,g.jsx)(fe.Button,{variant:"outline",disabled:k||!v.available,onClick:()=>l("plan-model-install",{modelId:o,compute:r}),children:b.preferred?"\u67E5\u770B\u5176\u4ED6\u5B89\u88C5\u65B9\u6848":"\u67E5\u770B\u5B89\u88C5\u8BA1\u5212"})]}),(0,g.jsxs)("details",{className:R.details,children:[(0,g.jsx)("summary",{children:"\u63A8\u8350\u4F9D\u636E\u4E0E\u8BBE\u5907\u8BF4\u660E"}),(0,g.jsx)("p",{className:R.hint,children:v.recommendation?.reason??"\u63A8\u8350\u4F9D\u636E\u672A\u77E5\uFF0C\u53EF\u624B\u52A8\u9009\u62E9\u3002"}),(0,g.jsx)("p",{className:R.hint,children:v.purpose==="tts"?r==="cpu"?"\u4EC5\u51C6\u5907 CPU \u8FD0\u884C\u65F6\u3002":"\u51C6\u5907\u56FA\u5B9A Vulkan \u4E0E CPU \u7EC4\u4EF6\uFF0C\u5B9E\u9645\u53EF\u7528\u6027\u4ECD\u9700\u672C\u673A\u5408\u6210\u9A8C\u8BC1\u3002":"\u6B64\u6A21\u578B\u4F7F\u7528 CPU\u3002"})]})]}),w&&(0,g.jsxs)(fe.MenuSurface,{className:R.plan,"aria-label":"\u6A21\u578B\u5B89\u88C5\u8BA1\u5212",children:[(0,g.jsx)("h4",{children:"\u6A21\u578B\u5B89\u88C5"}),(0,g.jsxs)("dl",{children:[(0,g.jsx)("dt",{children:"\u6A21\u578B"}),(0,g.jsx)("dd",{children:v?.title??w.modelId}),(0,g.jsx)("dt",{children:"\u6765\u6E90"}),(0,g.jsx)("dd",{children:w.source}),(0,g.jsx)("dt",{children:"\u4E0B\u8F7D\u5927\u5C0F"}),(0,g.jsx)("dd",{children:An(w.totalBytes)}),(0,g.jsx)("dt",{children:"\u4FDD\u5B58\u4F4D\u7F6E"}),(0,g.jsx)("dd",{children:w.destination}),(0,g.jsx)("dt",{children:"\u63A8\u7406\u8BBE\u5907"}),(0,g.jsx)("dd",{children:w.compute})]}),(0,g.jsx)("p",{children:w.licenseNote??"\u8BF7\u9605\u8BFB\u4E0B\u5217\u6A21\u578B\u8BB8\u53EF\u3002"}),w.licenseUrls?.map(z=>(0,g.jsx)("a",{href:z,target:"_blank",rel:"noreferrer",children:z},z)),(0,g.jsx)("p",{className:R.hint,children:w.notice}),(0,g.jsxs)("details",{className:R.details,children:[(0,g.jsx)("summary",{children:"\u6587\u4EF6\u548C\u6821\u9A8C\u8BE6\u60C5"}),(0,g.jsx)("ul",{children:w.files?.map(z=>(0,g.jsxs)("li",{children:[z.name," \xB7 ",An(z.bytes),(0,g.jsxs)("small",{children:["SHA-256: ",z.sha256]}),(0,g.jsx)("small",{children:z.url})]},z.name))})]}),(0,g.jsx)(fe.Button,{variant:"primary",className:R.primary,disabled:k||!v?.available||!w.planHash,onClick:()=>l("start-model-install",{modelId:w.modelId,compute:w.compute,planHash:w.planHash,accepted:!0}),children:"\u5F00\u59CB\u4E0B\u8F7D"})]}),(0,g.jsx)("div",{className:R.jobs,children:(p?.jobs??[]).filter(z=>!["installed","cancelled"].includes(z.status)).map(z=>(0,g.jsx)(qi,{job:z,snapshot:p,settings:m,disabled:k,writable:P,execute:l},z.id))}),!!B.length&&(0,g.jsxs)("details",{className:R.installHistory,children:[(0,g.jsxs)("summary",{children:["\u5B89\u88C5\u8BB0\u5F55\uFF08",B.length,"\uFF09",(0,g.jsx)("small",{children:"\u65F6\u95F4 \xB7 \u8BBE\u5907 \xB7 \u4F4D\u7F6E"})]}),(0,g.jsx)("div",{className:R.jobs,children:B.map(z=>(0,g.jsx)(qi,{job:z,snapshot:p,settings:m,disabled:k,writable:P,execute:l,history:!0},z.id))})]}),(0,g.jsx)("p",{className:R.hint,children:"\u6A21\u578B\u4E0B\u8F7D\u53EF\u5728\u540E\u53F0\u7EE7\u7EED\u3002\u68C0\u6D4B\u9759\u9ED8\u8FDB\u884C\uFF0C\u8FDB\u5165\u672C\u9875\u7ACB\u5373\u5237\u65B0\u3002"})]})}function Gi({state:e,sessionId:n,run:t,active:o=!0,pickPath:i,initialModelId:r=null,initialReuse:s=!1,reuseOnly:a=!1,onboarding:d=!1}){let[l,u,,p]=Vt(t,n),[m,f]=(0,he.useState)(r),[b,v]=(0,he.useState)(null),[w,k]=(0,he.useState)(s),[P,M]=(0,he.useState)(""),[B,E]=(0,he.useState)("q8_0"),T=e.installerFor===n?e.installer:null,z=T?.models?.filter(V=>V.purpose==="tts"||["qwen3-tts-base-1.7b-gguf","vits-melo-tts-zh_en-int8"].includes(V.id))??[],$=z.find(V=>V.recommendation?.recommended&&V.available),W=m??$?.id??z.find(V=>V.available)?.id??z[0]?.id,_=z.find(V=>V.id===W),C=b??(_?.computeOptions?.includes("auto")?"auto":"cpu"),N=w&&W==="qwen3-tts-base-1.7b-gguf",S=N?{sourceDirectory:P,modelVariant:B}:{},I=e.installPlanFor===n&&e.installPlan?.modelId===W&&e.installPlan?.compute===C&&(N?e.installPlan?.reused===!0&&(e.installPlanRequest?.sourceDirectory??e.installPlan?.sourceDirectory)===P&&e.installPlan?.modelVariant===B:!e.installPlan?.sourceDirectory)?e.installPlan:null,F=T?.jobs??[],L=F.filter(V=>V.modelId===W&&V.status!=="cancelled").reverse(),Z=L.find(V=>V.status!=="blocked"),X=L.find(V=>V.status==="blocked"),G=T?.ttsInstallIntent,ae=G&&Z&&G.modelId===W&&G.jobId===Z.id?G:null,le=["waiting","verifying"].includes(G?.status)&&!F.some(V=>V.id===G.jobId&&V.status==="blocked"),pe=!Z||Z.status==="installed"&&!le&&(N||Z.compute!==C||X===L[0]),xe=e.settingsFor===n&&e.settings?.ttsSetup?.provider==="local"&&e.settings.ttsSetup.localModelId===W&&Z?.status==="installed"&&!!Z.installedPath&&e.settings.ttsSetup.localModelPath===Z.installedPath,A=(0,he.useRef)(void 0),oe=(0,he.useRef)(null);(0,he.useEffect)(()=>{!o||T||e.busy||u||p.isLocked()||A.current===n||(A.current=n,l("model-installer"))},[o,n,!!T,e.busy,u,p.settled]),(0,he.useEffect)(()=>{let V=n+":"+W+":"+C;N||!o||!_?.available||e.busy||u||p.isLocked()||I||oe.current===V||(oe.current=V,l("plan-model-install",{modelId:W,compute:C}))},[o,n,W,C,_?.available,e.busy,u,!!I,N,p.settled]);let Q=u||e.busy||e.installerUncertain;return(0,g.jsxs)("section",{className:R.section,"aria-label":"\u4E0B\u8F7D\u672C\u5730\u8BED\u97F3\u6A21\u578B","data-no-settings-draft":!0,children:[T?(0,g.jsxs)(g.Fragment,{children:[!a&&(0,g.jsxs)("label",{className:R.inlineField,children:["\u8BED\u97F3\u6A21\u578B",(0,g.jsx)("select",{"aria-label":"\u8BED\u97F3\u6A21\u578B",value:W??"",disabled:Q||ae?.status==="verifying",onChange:V=>{f(V.target.value),v(null)},children:z.map(V=>(0,g.jsxs)("option",{value:V.id,children:[V.title??V.id,V.recommendation?.recommended?" \xB7 \u63A8\u8350":"",V.available?"":" \xB7 \u6682\u4E0D\u53EF\u7528"]},V.id))})]}),!d&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("p",{className:R.hint,children:_?.recommendation?.reason}),(0,g.jsxs)("label",{className:R.inlineField,children:["\u672C\u5730\u8BA1\u7B97",(0,g.jsx)("select",{"aria-label":"\u672C\u5730\u8BA1\u7B97",value:C,disabled:Q||le,onChange:V=>v(V.target.value),children:(_?.computeOptions??["cpu"]).map(V=>(0,g.jsx)("option",{value:V,children:{cpu:"CPU",auto:"\u81EA\u52A8 GPU \xB7 CPU \u515C\u5E95",vulkan:"Vulkan \xB7 CPU \u515C\u5E95"}[V]},V))})]})]}),!_?.available&&(0,g.jsx)("p",{role:"status",className:R.note,children:_?.reason??"\u6B64\u8BBE\u5907\u6682\u6CA1\u6709\u517C\u5BB9\u7684\u5B89\u88C5\u5305\u3002\u53EF\u9009\u62E9\u5176\u4ED6\u652F\u6301\u7684\u6A21\u578B\uFF0C\u6216\u5148\u4F7F\u7528\u6587\u5B57\u3002"}),I&&(0,g.jsxs)("div",{className:R.plan,children:[(0,g.jsxs)("strong",{children:["\u4E0B\u8F7D ",An(I.totalBytes)," \xB7 ",I.compute.toUpperCase()]}),I.reused&&(0,g.jsxs)("p",{children:["\u590D\u7528\u6A21\u578B ",An(I.reusedBytes)," \xB7 ",I.modelVariant]}),(0,g.jsxs)("details",{className:R.details,children:[(0,g.jsx)("summary",{children:"\u6765\u6E90\u3001\u8BB8\u53EF\u4E0E\u4FDD\u5B58\u4F4D\u7F6E"}),(0,g.jsx)("p",{children:I.source}),I.runtime&&(0,g.jsx)("p",{children:I.runtime.source}),(0,g.jsx)("p",{children:I.notice}),(0,g.jsx)("p",{children:I.verification}),(0,g.jsx)("p",{children:I.licenseNote}),I.licenseUrls?.map(V=>(0,g.jsx)("a",{href:V,target:"_blank",rel:"noreferrer",children:V},V)),(0,g.jsx)("p",{children:I.destination})]})]}),(0,g.jsxs)("div",{className:R.actions,children:[pe&&(0,g.jsx)(fe.Button,{variant:"primary",className:R.primary,disabled:Q||!yt(e,n)||!_?.available||!I,onClick:()=>l("start-model-install",{modelId:W,compute:C,planHash:I.planHash,accepted:!0,useWhenReady:!0,...I.reused?{sourceDirectory:I.sourceDirectory,modelVariant:I.modelVariant}:{}}),children:N?"\u9A8C\u8BC1\u5E76\u4F7F\u7528":"\u4E0B\u8F7D\u5E76\u4F7F\u7528"}),W==="qwen3-tts-base-1.7b-gguf"&&!a&&(0,g.jsx)(fe.Button,{variant:"outline","aria-expanded":N,disabled:Q||le,onClick:()=>k(V=>!V),children:"\u4F7F\u7528\u672C\u673A\u5DF2\u6709\u6587\u4EF6"})]}),N&&(0,g.jsxs)("div",{className:R.section,children:[(0,g.jsx)(_o,{className:R.field,label:"\u63D2\u4EF6\u6240\u5728\u673A\u5668\u7684\u6A21\u578B\u76EE\u5F55",kind:"sourceDirectory",value:P,disabled:Q,active:o,scope:W+":"+B,pickPath:i,sessionId:n,onChange:M}),(0,g.jsxs)("label",{className:R.inlineField,children:["\u5DF2\u6709\u6A21\u578B\u91CF\u5316\u7248\u672C",(0,g.jsxs)("select",{"aria-label":"\u5DF2\u6709\u6A21\u578B\u91CF\u5316\u7248\u672C",value:B,disabled:Q,onChange:V=>E(V.target.value),children:[(0,g.jsx)("option",{value:"q8_0",children:"Q8_0"}),(0,g.jsx)("option",{value:"q4_k_m",children:"Q4_K_M"})]})]}),(0,g.jsx)(fe.Button,{variant:"outline",disabled:Q||!P.trim()||!_?.available,onClick:()=>l("plan-model-install",{modelId:W,compute:C,...S}),children:"\u68C0\u67E5\u590D\u7528\u8BA1\u5212"})]}),N&&Z&&["failed","paused"].includes(Z.status)&&(0,g.jsx)("p",{className:R.note,children:"\u5DF2\u6709\u672A\u5B8C\u6210\u7684\u5B89\u88C5\u4EFB\u52A1\u3002\u53EF\u7EE7\u7EED\u91CD\u8BD5\uFF1B\u5982\u9700\u66F4\u6362\u76EE\u5F55\u6216\u91CF\u5316\u7248\u672C\uFF0C\u8BF7\u5148\u53D6\u6D88\u8BE5\u4EFB\u52A1\uFF0C\u518D\u68C0\u67E5\u65B0\u7684\u590D\u7528\u8BA1\u5212\u3002"}),!N&&_?.available&&!I&&pe&&(0,g.jsx)(fe.Button,{variant:"outline",disabled:Q,onClick:()=>l("plan-model-install",{modelId:W,compute:C}),children:"\u91CD\u65B0\u8BFB\u53D6\u5B89\u88C5\u8BA1\u5212"}),X&&(0,g.jsx)(qi,{job:X,snapshot:T}),Z&&(0,g.jsxs)("div",{className:R.job,children:[(0,g.jsx)("p",{role:"status",children:ae?.status==="verifying"?"\u6B63\u5728\u9A8C\u8BC1\u5408\u6210\uFF0C\u9996\u6B21\u53EF\u80FD\u9700\u8981\u51E0\u5206\u949F":ae?.status==="applied"&&xe?"\u5408\u6210\u9A8C\u8BC1\u901A\u8FC7\uFF0C\u5DF2\u8BBE\u4E3A\u6717\u8BFB\u6765\u6E90":ae?.status==="blocked"?"\u9700\u8981\u5904\u7406\u540E\u518D\u7EE7\u7EED":{queued:"\u7B49\u5F85\u4E0B\u8F7D",running:Z.stage==="verifying-local"?"\u6821\u9A8C\u672C\u673A\u5DF2\u6709\u6A21\u578B":"\u4E0B\u8F7D\u5904\u7406\u4E2D",paused:"\u5DF2\u6682\u505C",failed:"\u4E0B\u8F7D\u5931\u8D25",installed:"\u6587\u4EF6\u5DF2\u6821\u9A8C\uFF0C\u5C1A\u672A\u786E\u8BA4\u5408\u6210"}[Z.status]??Z.status}),Z.totalBytes>0&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("progress",{"aria-label":"\u8BED\u97F3\u6A21\u578B\u4E0B\u8F7D\u8FDB\u5EA6",max:Z.totalBytes,value:Math.min(Z.receivedBytes,Z.totalBytes)}),(0,g.jsxs)("small",{children:[An(Z.receivedBytes)," / ",An(Z.totalBytes)]})]}),Z.error&&(0,g.jsx)("p",{role:"alert",children:Z.error.message}),ae?.reason&&(0,g.jsx)("p",{className:R.note,children:Xh(ae.reason)}),(0,g.jsxs)("div",{className:R.actions,children:[ae?.status==="verifying"&&(0,g.jsx)(fe.Button,{variant:"outline",disabled:Q,onClick:()=>l("control-model-install",{id:Z.id,operation:"pause"}),children:"\u505C\u6B62\u9A8C\u8BC1"}),["queued","running"].includes(Z.status)&&(0,g.jsx)(fe.Button,{variant:"outline",disabled:Q,onClick:()=>l("control-model-install",{id:Z.id,operation:"pause"}),children:"\u6682\u505C"}),(["paused","failed"].includes(Z.status)||ae?.status==="blocked"||ae?.status==="paused")&&(0,g.jsx)(fe.Button,{variant:"outline",disabled:Q,onClick:()=>l("control-model-install",{id:Z.id,operation:"resume"}),children:"\u7EE7\u7EED\u4E0B\u8F7D\u5E76\u4F7F\u7528"}),["queued","running","paused","failed"].includes(Z.status)&&(0,g.jsx)(fe.Button,{variant:"outline",disabled:Q,onClick:()=>l("control-model-install",{id:Z.id,operation:"cancel"}),children:"\u53D6\u6D88\u4E0B\u8F7D"}),Z.status==="installed"&&!xe&&(!ae||["applied","cancelled"].includes(ae.status))&&(0,g.jsx)(fe.Button,{variant:"outline",disabled:Q||le||!yt(e,n),onClick:()=>l("apply-model-install",{id:Z.id,revision:e.settings.revision}),children:"\u9A8C\u8BC1\u5E76\u4F7F\u7528"})]})]}),xe&&(0,g.jsx)("p",{className:R.hint,children:"\u672C\u5730\u6A21\u578B\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u8BD5\u542C\u3002"})]}):(0,g.jsx)(g.Fragment,{children:(0,g.jsx)("p",{className:R.hint,children:"\u6B63\u5728\u8BFB\u53D6\u53EF\u5B89\u88C5\u6A21\u578B\u2026"})}),e.installerError&&(0,g.jsx)("p",{role:"alert",className:R.note,children:e.installerError}),e.installerUncertain&&(0,g.jsx)("p",{role:"status",children:"\u6B63\u5728\u6838\u67E5\u4E0B\u8F7D\u72B6\u6001\u3002"})]})}function Ud({state:e,sessionId:n,run:t,pickPath:o,active:i}){let r=e.settingsFor===n?e.settings:null,s=e.installerFor===n?e.installer:null,a=r?.ttsSetup?.localModelPath,[d,l]=Vt(t,n),[u,p]=(0,he.useState)(""),[m,f]=(0,he.useState)(!1),b=(s?.jobs??[]).filter(w=>w.status==="installed"&&(w.purpose==="tts"||w.recommendedSettings?.tts)),v=b.find(w=>w.id===u);return(0,g.jsxs)("section",{className:R.section,"aria-label":"\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84","data-no-settings-draft":!0,children:[(0,g.jsx)("h3",{children:"\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84"}),(0,g.jsx)("p",{className:R.hint,children:a||"\u5C1A\u672A\u914D\u7F6E\u672C\u5730\u6717\u8BFB\u6A21\u578B\u8DEF\u5F84\u3002"}),!!b.length&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("label",{className:R.inlineField,children:["\u5DF2\u5B89\u88C5\u76EE\u5F55",(0,g.jsxs)("select",{value:u,onChange:w=>p(w.target.value),children:[(0,g.jsx)("option",{value:"",children:"\u9009\u62E9\u5DF2\u6821\u9A8C\u7684\u5B89\u88C5\u76EE\u5F55"}),b.map(w=>(0,g.jsxs)("option",{value:w.id,children:[Wr(s.models.find(k=>k.id===w.modelId))," \xB7 ",zo(w.compute)," \xB7 ",Ki(w.createdAt)]},w.id))]})]}),v&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("p",{className:R.hint,children:v.installedPath}),(0,g.jsx)(fe.Button,{variant:"outline",disabled:l||!yt(e,n)||kr(v,r),onClick:()=>d("apply-model-install",{id:v.id,revision:r.revision}),children:"\u9A8C\u8BC1\u5E76\u4F7F\u7528\u6240\u9009\u8DEF\u5F84"})]})]}),(0,g.jsxs)("details",{className:R.details,onToggle:w=>f(w.currentTarget.open),children:[(0,g.jsx)("summary",{children:"\u590D\u7528\u672C\u673A Qwen \u6A21\u578B\u6587\u4EF6"}),(0,g.jsx)("p",{className:R.hint,children:"\u9009\u62E9\u5DF2\u6709\u6A21\u578B\u76EE\u5F55\u540E\u6821\u9A8C\u6587\u4EF6\uFF1B\u6821\u9A8C\u901A\u8FC7\u540E\u5B89\u88C5\u8FD0\u884C\u7EC4\u4EF6\u3002"}),m&&(0,g.jsx)(Gi,{state:e,sessionId:n,run:t,active:i,pickPath:o,initialModelId:"qwen3-tts-base-1.7b-gguf",initialReuse:!0,reuseOnly:!0})]})]})}function Vd({state:e,sessionId:n,run:t,refresh:o,t:i,onDismiss:r,onMinimize:s,onBackToAuthorization:a,asrStatus:d,pickPath:l,active:u=!0}){let[p,m]=Vt(t,n),[f,b]=(0,he.useState)(0),v=(0,he.useRef)(null),w=(0,he.useRef)(0),k=(0,he.useRef)(f);(0,he.useLayoutEffect)(()=>()=>{w.current++},[n]);let P=C=>(w.current++,C?.());(0,he.useLayoutEffect)(()=>{let C=v.current?.closest("[data-whale-content]"),N=v.current?.querySelector("[data-wizard-body]");C&&(C.scrollTop=0),N&&(N.scrollTop=0),k.current!==f&&N?.querySelector("h3")?.focus({preventScroll:!0}),k.current=f},[f]);let M=e.settingsFor===n?e.settings:null,[B,E]=(0,he.useState)(null),T=B??M?.listenMode??"ptt",z=m||!yt(e,n),$=async C=>{let N=w.current;(!C||await C()===!0)&&w.current===N&&b(2)},W=async()=>{if(z||!M)return;let C=w.current,N=()=>w.current===C;f===0?await p("listen-mode",{mode:T})===!0&&N()&&b(1):f===2&&await p("complete-setup",{revision:M.revision})===!0&&N()&&r?.()},_=(C,N)=>(0,g.jsxs)(fe.MenuSurface,{ref:v,className:R.wizard,role:"region","aria-label":"\u9C7C\u5E94\u9996\u6B21\u914D\u7F6E","data-whale-intrinsic":!0,children:[(0,g.jsxs)("header",{className:R.header,children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("h2",{children:"\u5F00\u59CB\u4F7F\u7528\u9C7C\u5E94"}),(0,g.jsxs)("p",{className:R.hint,children:["\u7B2C ",f+1," / 3 \u6B65 \xB7 \u5176\u4F59\u8BBE\u7F6E\u968F\u65F6\u518D\u8C03"]})]}),(0,g.jsx)(fe.Button,{onClick:()=>P(e.setupStatus?.completed===!0?r:s),children:e.setupStatus?.completed===!0?"\u8FD4\u56DE\u8BBE\u7F6E":"\u7A0D\u540E"})]}),(0,g.jsx)("div",{className:R.wizardBody,"data-wizard-body":!0,"data-no-drag":!0,children:(0,g.jsxs)("div",{className:R.wizardBodyContent,"data-whale-natural-content":!0,children:[(0,g.jsx)(Sr,{state:e,sessionId:n,run:t,refresh:o,t:i,canStopTts:f!==1}),C,(e.error||e.setupError)&&(0,g.jsx)("p",{role:"alert",className:R.note,children:"\u6682\u65F6\u672A\u80FD\u5B8C\u6210\uFF0C\u6B63\u5728\u6838\u67E5\u8BBE\u7F6E\u3002"})]})}),(0,g.jsxs)("footer",{className:R.actions,children:[(0,g.jsx)(fe.Button,{variant:"outline",disabled:N.pending,onClick:()=>f>0?b(f-1):P(a),children:"\u4E0A\u4E00\u6B65"}),(0,g.jsx)(fe.Button,{variant:"primary",className:R.primary,disabled:N.disabled,onClick:()=>{N.onClick()},children:N.label}),N.audition,N.feedback]})]});return f===1?(0,g.jsx)(Md,{state:e,sessionId:n,run:t,settings:M,prepared:!0,active:u,pickPath:l,renderStep:_,advanceTts:$},n):_((0,g.jsxs)(g.Fragment,{children:[f===0&&(0,g.jsxs)("section",{className:R.section,children:[(0,g.jsx)("h3",{tabIndex:-1,children:"\u600E\u4E48\u8BF4\u8BDD\uFF1F"}),(0,g.jsx)("fieldset",{className:R.choices,disabled:z,children:[["ptt","\u6309\u952E\u8BF4\u8BDD","\u6309\u4F4F\u5FEB\u6377\u952E\u65F6\u6536\u97F3"],["always","\u81EA\u7531\u9EA6","\u5F00\u59CB\u5BF9\u8BDD\u540E\u6301\u7EED\u542C\u53D6\u8BED\u97F3"],["wake","\u5524\u9192\u8BCD","\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\uFF0C\u518D\u8BF4\u6307\u4EE4"]].map(([C,N,S])=>(0,g.jsxs)("label",{className:R.choice,"data-selected":T===C,children:[(0,g.jsx)("input",{type:"radio",name:"setup-listen","data-whale-operation":`listen-mode-${C}`,checked:T===C,onChange:()=>E(C)}),(0,g.jsxs)("span",{children:[(0,g.jsx)("strong",{children:N}),(0,g.jsx)("small",{children:S})]})]},C))})]}),f===2&&(0,g.jsxs)("section",{className:R.section,children:[(0,g.jsx)("h3",{tabIndex:-1,children:"\u51C6\u5907\u8BED\u97F3\u8BC6\u522B"}),(0,g.jsx)("p",{children:"\u8BF4\u8BDD\u65B9\u5F0F\u548C\u6717\u8BFB\u914D\u7F6E\u5DF2\u4FDD\u5B58\u3002"}),d]})]}),{pending:m,disabled:z||!M,label:m?"\u4FDD\u5B58\u4E2D\u2026":f===2?"\u5B8C\u6210":"\u4E0B\u4E00\u6B65",onClick:W})}var c=require("react/jsx-runtime"),Gd=e=>e.setupOpen||e.setupStatus?.completed!==!0,tg={ARCHIVED:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u5DF2\u5F52\u6863\u3002\u6062\u590D\u539F\u4F1A\u8BDD\u6216\u66F4\u6362\u7ED1\u5B9A\u540E\u518D\u5F00\u59CB\u8BED\u97F3\u3002",BUSY:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F\u3002\u7B49\u8FD9\u8F6E\u7ED3\u675F\u540E\u518D\u5F00\u59CB\u8BED\u97F3\u3002",UNAVAILABLE:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528\u3002\u53EF\u66F4\u6362\u7ED1\u5B9A\u6216\u89E3\u9664\u7ED1\u5B9A\u3002"},jd=e=>e.authorizationOpen||e.authorizationLoading&&!e.authorization;function Xd(e){let[n,t]=(0,D.useState)(!1),o=(0,D.useRef)(null),i=(0,D.useRef)(null),r=(0,D.useRef)(null),s=(0,D.useRef)(null),a=e.useWhalePreferences(k=>k),d=e.useWhaleUi(k=>k),l=jd(d),u=l||Gd(d)?"setup":d.panelView??"home",p=n&&u!=="settings",m=(0,D.useCallback)(k=>{o.current=k,e.geometry.ref(k),e.sizing.ref(k)},[e.geometry,e.sizing]),f=(0,D.useCallback)(k=>{i.current=k,e.sizing.contentRef(k)},[e.sizing]);(0,D.useEffect)(()=>{e.setPanelVisible?.(!p)},[p]),(0,D.useLayoutEffect)(()=>{i.current&&(i.current.scrollTop=0)},[u]),(0,D.useLayoutEffect)(()=>e.sizing.update(),[u,p,l,d.sourcePending]),(0,D.useEffect)(()=>{let k=o.current,P=k?.ownerDocument;s.current&&k&&P&&(P.activeElement===P.body||k.contains(P.activeElement))&&(u==="home"?k.querySelector("[data-whale-settings-trigger]")?.focus({preventScroll:!0}):u!==s.current&&k.focus({preventScroll:!0})),s.current=u},[u]);let b=k=>{let P=Nd(k);P&&e.recordUserOperation?.(P)},v=()=>{t(!0),requestAnimationFrame(()=>o.current?.querySelector("[data-whale-reopen]")?.focus())},w=()=>{e.refresh?.(),t(!1),requestAnimationFrame(()=>o.current?.focus())};return(0,qd.createPortal)((0,c.jsx)("section",{ref:m,className:h.floating,"data-whale-panel":!0,"data-view":u,"data-collapsed":p||void 0,"data-source-pending":d.sourcePending||void 0,"data-motion":a.motion,tabIndex:0,"aria-label":e.t("drag"),title:e.t("dragHint"),onPointerDownCapture:()=>e.geometry.activate?.(),onFocusCapture:()=>e.geometry.activate?.(),onPointerDown:k=>{if(k.button!==0||k.pointerType&&k.pointerType!=="mouse"||!md(k.target,k.currentTarget)){r.current=null;return}let P=k.target,M=P.getBoundingClientRect?.();M&&P.scrollHeight>P.clientHeight&&P.offsetWidth>P.clientWidth&&k.clientX>=M.left+P.clientLeft+P.clientWidth||(r.current={id:k.pointerId,x:k.clientX,y:k.clientY,moved:!1},k.target.closest?.("button")||k.currentTarget.focus({preventScroll:!0}),e.geometry.pointerDown(k,k.target.closest?.("[data-drag-surface]")??k.currentTarget))},onPointerMove:k=>{let P=r.current;!P||k.pointerId!==P.id||(Math.hypot(k.clientX-P.x,k.clientY-P.y)>=4&&(P.moved=!0),e.geometry.pointerMove(k))},onPointerUp:k=>{k.nativeEvent?.isTrusted&&r.current?.id===k.pointerId&&r.current.moved&&e.recordUserOperation?.("panel-move"),e.geometry.pointerEnd(k)},onPointerCancel:k=>{e.geometry.pointerEnd(k),r.current=null},onLostPointerCapture:e.geometry.pointerEnd,onClickCapture:k=>{r.current?.moved&&k.detail!==0?(k.preventDefault(),k.stopPropagation()):b(k),r.current=null},onChangeCapture:b,onSubmitCapture:b,onKeyDownCapture:b,onKeyDown:k=>{k.key==="Escape"&&(k.stopPropagation(),u==="setup"&&!p?v():u==="settings"?e.showHome():p||v())},children:(0,c.jsx)("div",{ref:f,className:h.panelViewport,"data-whale-content":!0,children:e.renderSlot("whale-ear.panel.controls",{collapsed:p,collapse:v,expand:w})})}),document.body)}var Ld=()=>()=>{};function Kd(e){let{controlContext:n}=e,t=(0,D.useSyncExternalStore)(n?.subscribe??Ld,()=>n?n.sourceFor(n.selectedSession()):e.sessionId??null),o=(0,D.useSyncExternalStore)(n?.subscribe??Ld,()=>{let f=n?.currentConversation();return f===t?f:null});e={...e,sessionId:t,currentConversationId:o};let i=e.useWhaleUi(f=>f),[r,s]=(0,D.useState)(!1);(0,D.useLayoutEffect)(()=>{e.setSession?.(t)},[t]);let a=jd(i),d=Gd(i);(0,D.useEffect)(()=>{d&&e.collapsed&&e.cancelPreview?.()},[d,e.collapsed]);let l=i.updates?.release?.version,u=!e.collapsed&&!a&&!d&&i.panelView==="home"&&i.checkedFor===e.sessionId&&i.status?.enabled===!1&&i.status.ownerSessionId===null&&!i.status.voiceControlBusy&&i.status.voiceSession?.fullyStopped!==!1&&!i.busy&&!i.uncertain&&!i.updatesUnavailable&&i.updates?.status==="available"&&l&&l!==i.dismissedUpdateVersion;if((0,D.useEffect)(()=>{u&&s(!0)},[u]),a||d)return(0,c.jsxs)(c.Fragment,{children:[e.collapsed&&(0,c.jsx)(Jd,{t:e.t,expand:e.expand}),a?(0,c.jsx)("div",{hidden:e.collapsed,children:(0,c.jsx)(og,{state:i,save:e.saveAuthorization,reload:e.openAuthorization,close:d?e.collapse:e.closeAuthorization,continueSetup:d?()=>e.closeAuthorization({resumeSetup:!0}):null})}):(0,c.jsx)("div",{role:"dialog","aria-modal":"false","aria-label":"\u9C7C\u5E94\u9996\u6B21\u914D\u7F6E","data-whale-setup":!0,hidden:e.collapsed,children:(0,c.jsx)(Vd,{pickPath:e.pickPath,state:i,sessionId:e.sessionId,run:e.run,refresh:e.refresh,t:e.t,active:!e.collapsed,onDismiss:e.dismissSetup,onMinimize:e.collapse,onBackToAuthorization:e.openAuthorization,asrStatus:(0,c.jsx)(Qd,{action:e.senseVoiceAsrAction,active:!e.collapsed})})})]});let p=f=>{s(!0),f&&e.updateAction?.({action:"check"})},m=()=>{e.dismissUpdate?.(l),s(!1)};return(0,c.jsxs)(c.Fragment,{children:[i.panelView==="settings"?(0,c.jsx)(gg,{...e,openUpdate:p}):(0,c.jsx)(rg,{...e}),r&&(0,c.jsx)(Id,{state:i,close:m,run:e.updateAction,t:e.t})]})}function og({state:e,save:n,reload:t,close:o,continueSetup:i}){let r=e.authorization,s=e.authorizationBusy||e.authorizationLoading,a=r?.usageAgreement?.accepted===!0,d=a&&(e.authorizationNeedsReview||r?.granted&&r.modelSourcesChanged===!0),l=a&&r?.granted&&!d,u=r?.usageAgreement?.text??[];return(0,c.jsxs)("section",{role:"dialog","aria-modal":"false","aria-label":"\u9C7C\u5E94\u4F7F\u7528\u534F\u8BAE","data-whale-authorization":!0,"data-whale-intrinsic":!0,className:`${h.settings} ${h.authorization}`,children:[(0,c.jsxs)("header",{className:h.settingsHeader,children:[(0,c.jsx)(at,{}),(0,c.jsx)("h2",{children:a?"\u9C7C\u5E94\u4F7F\u7528\u534F\u8BAE":"\u6B22\u8FCE\u4F7F\u7528\u9C7C\u5E94"}),a&&!i&&(0,c.jsx)(q.Button,{variant:"outline",disabled:s,onClick:o,children:"\u8FD4\u56DE"})]}),(0,c.jsx)("div",{className:h.authorizationBody,"data-whale-authorization-body":!0,"data-no-drag":!0,children:(0,c.jsxs)("div",{"data-whale-natural-content":!0,children:[!a&&(0,c.jsx)("p",{className:h.authorizationSteps,children:"1 \u4F7F\u7528\u534F\u8BAE\u3000\xB7\u30002 \u57FA\u7840\u914D\u7F6E"}),(0,c.jsx)("h3",{children:"\u9C7C\u5E94\u64CD\u4F5C\u8303\u56F4"}),(0,c.jsx)("div",{className:h.agreement,children:u.map(p=>(0,c.jsx)("p",{children:p},p))}),e.authorizationLoading&&!r&&(0,c.jsx)("p",{role:"status",className:h.hint,children:"\u6B63\u5728\u8BFB\u53D6\u2026"}),r&&(0,c.jsxs)("details",{className:h.section,children:[(0,c.jsx)("summary",{children:"\u670D\u52A1\u4E0E\u6A21\u578B\u6765\u6E90"}),(0,c.jsx)("ul",{className:h.permissionList,children:r.scopes.map(p=>(0,c.jsxs)("li",{children:[(0,c.jsx)("strong",{children:p.title}),(0,c.jsx)("p",{className:h.hint,children:p.description})]},p.id))}),r.modelSources.map(p=>(0,c.jsxs)("div",{children:[(0,c.jsx)("strong",{children:p.modelId}),(0,c.jsx)("p",{className:h.hint,children:p.source}),p.runtime&&(0,c.jsxs)("p",{className:h.hint,children:["\u8FD0\u884C\u7EC4\u4EF6\uFF1A",(p.runtime.sources??[p.runtime.source]).join("\u3001")]}),(0,c.jsx)("p",{className:h.hint,children:p.licenseNote}),p.licenseUrls.map(m=>(0,c.jsx)("p",{className:h.hint,children:(0,c.jsx)("a",{href:m,target:"_blank",rel:"noreferrer",children:m})},m))]},p.modelId))]}),d&&(0,c.jsx)("p",{role:"status",className:h.hint,children:"\u5F53\u524D\u64CD\u4F5C\u9700\u8981\u8865\u5145\u6388\u6743\u3002\u8BF7\u5148\u6838\u5BF9\u670D\u52A1\u4E0E\u6A21\u578B\u6765\u6E90\u3002"}),(e.authorizationError||r?.revocationUnconfirmed)&&(0,c.jsx)("p",{role:"alert",className:h.error,children:r?.revocationUnconfirmed?"\u505C\u6B62\u8BBE\u5907\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u68C0\u67E5\u6216\u91CD\u542F\u5BBF\u4E3B\u3002":e.authorizationWriteUnconfirmed?"\u6388\u6743\u4FDD\u5B58\u7ED3\u679C\u5F85\u786E\u8BA4\u3002":"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u6388\u6743\u3002"}),(e.authorizationError||r?.revocationUnconfirmed)&&(0,c.jsx)(q.Button,{variant:"outline",disabled:s,onClick:()=>{t?.()},children:"\u91CD\u65B0\u8BFB\u53D6\u6388\u6743"})]})}),(0,c.jsxs)("div",{className:`${h.actions} ${h.authorizationActions}`,children:[(0,c.jsx)(q.Button,{className:h.primary,variant:"primary",disabled:!r||s||e.authorizationUncertain,onClick:()=>l?(i??o)():void n(!0),children:l?i?"\u7EE7\u7EED\u914D\u7F6E":"\u8FD4\u56DE":a&&d?"\u8865\u5145\u6388\u6743":"\u4E00\u952E\u6388\u6743\u5E76\u7EE7\u7EED"}),(0,c.jsx)(q.Button,{variant:"outline",disabled:s,onClick:l&&!i?()=>{n(!1)}:o,children:l?i?"\u7A0D\u540E":"\u64A4\u9500\u6388\u6743":d?"\u6682\u4E0D\u8C03\u6574":"\u6682\u4E0D\u4F7F\u7528"})]}),!a&&(0,c.jsx)("p",{className:h.hint,children:"\u4E0B\u4E00\u6B65\uFF1A\u9009\u62E9\u8BF4\u8BDD\u65B9\u5F0F\u4E0E\u8BED\u97F3\u6A21\u578B"})]})}function Jd({t:e,expand:n,markState:t="idle",compactState:o="off",enabled:i=!1}){return(0,c.jsxs)(q.Button,{className:h.bubble,"data-whale-reopen":!0,"data-whale-operation":"panel-open","data-drag-surface":!0,"aria-label":e("reopen"),title:e("title"),onClick:n,children:[(0,c.jsx)(at,{small:!0,state:t}),(0,c.jsx)("span",{className:h.bubbleBrand,children:e("title")}),(0,c.jsxs)("span",{className:h.bubbleStatus,"data-voice-state":o,children:[(0,c.jsx)(Ke,{name:i===!1?"micOff":"mic"}),(0,c.jsx)("span",{children:e("compact_"+o)})]}),(0,c.jsx)("span",{className:h.voiceBars,"data-active":o==="listening"||void 0,"aria-hidden":"true",children:[0,1,2,3,4].map(r=>(0,c.jsx)("i",{},r))}),(0,c.jsx)(Ke,{name:"down"})]})}function rg(e){let{t:n,sessionId:t}=e,o=e.useWhaleUi(te=>te),i=o.checkedFor===t?o.status:null,r=o.busy,s=!!i,a=o.uncertain||!s,d=e.useWhalePreferences(te=>te),l=bo(i),u=o.conversationFor===t?o.conversation:null,p=l&&u?.rootSessionId===l&&!a?u:null,m=o.conversationHistoryFor===t&&!a&&(!i?.enabled||p?.rootSessionId===o.conversationHistory?.rootSessionId)?o.conversationHistory:null,f=p??{rootSessionId:m?.rootSessionId??null,items:[],latest:m?.items?.filter(te=>te.role==="assistant").at(-1)??null},b=!!(i?.enabled&&(o.conversationError||o.conversationFor===t&&o.conversation?.rootSessionId!==l)),v=_r(o,t),w=v?.kind==="cleanup",k=v?.kind==="restart",P=v?.kind==="conflict",M=i?.enabled||P,B=i?.enabled===!1&&i.voiceSession?.fullyStopped===!1,E=p?.helper??i?.helper,T=o.listenModePending?o.listenModeBefore:p?.helper&&p.revision!==o.listenModeReceiptRevision?p.helper.listenMode:i?.listenMode,z=!!(i?.enabled&&E?.online===!1),$=b||!!(i?.enabled&&T==null),W=!a&&!z&&!$&&Ct.includes(T),_=r||B||!W||w||k||P||!i?.capabilities?.listenMode||i?.voiceControlBusy||o.visibilityUncertain||o.ttsUncertain||o.ttsCancelling,C=i?.enabled?p?.inputError:null,N=!i?.enabled&&o.enableError,S=tg[/VOICE_EXISTING_(ARCHIVED|BUSY|UNAVAILABLE)/.exec(N??"")?.[1]],I=/VOICE_ROOT_OWNED_ELSEWHERE/.test(N??""),F=/VOICE_EXISTING_BINDING_CHANGED/.test(N??""),L=N&&o.settings?.voiceSession?.performanceMode==="fast"&&/VOICE_EXACT_EFFORT_HOST_REQUIRED|VOICE_FAST_/.test(N),Z=t&&i?.ownerSessionId&&i.ownerSessionId!==t&&l!==t,X=i?.existingVoiceSession,G=X?.sessionId,ae=o.existingSessionWritePending||o.existingSessionUnconfirmed,le=i&&!a&&o.checkedFor===t&&!ae,pe=le&&i.existingVoiceSession,xe=le?pe?bt(pe):n("dedicatedVoiceTarget"):n("checkingVoiceTarget"),A=(0,D.useId)(),oe=(0,D.useId)(),Q=u?.inputDelivery,V=i?.enabled&&pe&&p?.retryTranscripts?.sessionId===pe.sessionId?p.retryTranscripts:null,ke=(V?.items??[]).map(te=>Q?.id===te.id?{...Q,state:te.state}:{...te,sessionId:V.sessionId});Q&&!ke.some(te=>te.id===Q.id)&&ke.push(Q);let on=[V?.items.length,...ke.map(te=>te.id)].join(","),Fe=i?.existingVoiceSessionSupported===!0&&Object.hasOwn(i,"existingVoiceSession")&&e.listExistingVoiceSessions&&e.setExistingVoiceSession,_n=Fe&&br(o,t),lt=e.currentConversationId&&Fe&&i.enabled===!1,Je=!!(!pe&&!ae&&o.checkedFor===t&&i&&!r&&!i.voiceControlBusy&&!a&&!o.ttsUncertain&&!o.ttsCancelling&&!B&&!v&&!Z),re=p?.wake??i?.wake,Ye=w?"pending":k||P||B||a||$||z?"unknown":r?"pending":p?.inputActive===!0?"input-active":i?.enabled?"authorized":"idle",[Te,$e]=(0,D.useState)(null),[wt,nt]=(0,D.useState)(!1),Ne=Te==="targets"&&Fe&&i.enabled===!1,Qe=(0,D.useRef)(!1),Sn=o.settingsFor===t?o.settings?.values:null,Bn=o.settingsFor===t?o.settings?.ttsSetup:null,cn=Bn?.provider==="deepseek"&&(!Bn.deepseekTextTransmissionAccepted||o.authorization&&!xr(o)),xt=Bn?.provider==="custom"&&(!Bn.customTts?.textTransmissionAccepted||!ji(o)),mn=Sn?.pttKeyboard?[...Sn.pttKeyboard.modifiers||[],Sn.pttKeyboard.code].join(" + "):Sn?.pttMouse?n("sideButton")+" "+Sn.pttMouse:null,kn=(0,D.useRef)({}),Wn=()=>{Qe.current=!0,$e(null)};(0,D.useLayoutEffect)(()=>{$e(te=>e.collapsed||te==="targets"?null:te),nt(!1)},[t,e.collapsed]),(0,D.useEffect)(()=>{nt(!1),G&&$e(te=>te==="conversation"?null:te)},[G]),(0,D.useEffect)(()=>{i?.enabled&&$e(te=>te==="targets"?null:te)},[i?.enabled]),(0,D.useEffect)(()=>{Ne||!_n||!Qe.current||!kn.current.targets||(Qe.current=!1,kn.current.targets.focus())},[Ne,_n,e.collapsed]),(0,D.useEffect)(()=>{!a&&!G&&Te==="conversation"&&i?.enabled===!1&&e.run(t,"read-history")},[Te,a,i?.enabled,t,G]);let _t=ad({enabled:i?.enabled,active:p?.inputActive===!0,unknown:!i||a||$||z||!!v||B||!!C,pending:r||w}),zn=()=>!G&&Te==="conversation"&&(0,c.jsx)(Sd,{conversation:f,history:m,historyLoading:o.sourcePending||!a&&o.conversationHistoryLoading,historyError:a?null:o.conversationHistoryError,historyRetryCursor:o.conversationHistoryRequestCursor,loadHistory:te=>e.run(t,"read-history",te?{cursor:te}:{}),assistantName:d.assistantName||n("assistant"),setAssistantName:e.setAssistantName,t:n,close:()=>{$e(null),kn.current.conversation?.focus()}},f.rootSessionId??"empty");return e.collapsed?(0,c.jsx)(Jd,{t:n,expand:e.expand,markState:Ye,compactState:_t,enabled:i?.enabled??null}):(0,c.jsxs)("div",{className:h.panelContent,"data-home-controls":!0,"data-has-input-caption":ke.length>0||void 0,"data-home-layout":[i?i.enabled?"active":"idle":"loading",zr(o,t),!!(o.error||N),!!C,z,v?.kind,B,!!pe,on].join(":"),"data-size-detail":Te==="conversation"||Ne?"true":"false",onKeyDown:te=>{!Ne||te.key!=="Escape"||(te.preventDefault(),te.stopPropagation(),Wn())},children:[(0,c.jsxs)("div",{className:h.header,children:[(0,c.jsxs)("span",{className:h.brand,children:[(0,c.jsx)(at,{state:Ye}),(0,c.jsx)("strong",{children:n("title")})]}),(0,c.jsxs)("div",{className:h.headerActions,children:[(0,c.jsxs)(q.Button,{className:h.newChatButton,"data-whale-operation":"new-voice-session","aria-label":n("newChat"),title:pe?"\u89E3\u9664\u5DF2\u6709\u4F1A\u8BDD\u7ED1\u5B9A\u540E\u53EF\u65B0\u5EFA\u9C7C\u5E94\u4F1A\u8BDD":n(Z?"newChatOtherOwner":i?.enabled?"newChatActive":"newChat"),disabled:!Je,onClick:()=>{e.run(t,"new",{expectedOwnerSessionId:i.ownerSessionId})},children:[(0,c.jsx)(Ke,{name:"plus"}),(0,c.jsx)("span",{children:n("newChat")})]}),(0,c.jsx)(q.Button,{"data-whale-settings-trigger":!0,"data-whale-operation":"page-settings",className:h.iconButton,"aria-label":n("settings"),title:n("settings"),onClick:e.openSettings,children:(0,c.jsx)(Ke,{name:"settings"})}),(0,c.jsx)(q.Button,{"data-whale-operation":"panel-close",className:h.iconButton,"aria-label":n("collapse"),title:n("collapseHint"),onClick:e.collapse,children:(0,c.jsx)(Ke,{name:"minus"})})]})]}),(0,c.jsxs)("div",{className:h.statusRow,"data-bound":!!pe||void 0,"data-recording":Ye==="input-active"||void 0,children:[(0,c.jsx)("div",{id:A,className:h.voiceTarget,"data-whale-voice-target":!0,children:Fe?(0,c.jsxs)(q.Button,{ref:te=>{kn.current.targets=te},variant:"outline",className:h.existingSessionHome,"data-whale-bound-session":pe?!0:void 0,"data-whale-target-trigger":!0,title:xe,"aria-expanded":!!Ne,"aria-controls":Ne?oe:void 0,disabled:!Ne&&!_n,onClick:()=>Ne?Wn():$e("targets"),children:[(0,c.jsx)("span",{children:n("voiceTarget")}),(0,c.jsx)("strong",{className:h.ellipsis,children:xe}),(0,c.jsx)(Ke,{name:Ne?"down":"chevron"})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("span",{children:n("voiceTarget")}),(0,c.jsx)("strong",{className:h.ellipsis,title:xe,children:xe})]})}),(0,c.jsxs)("div",{className:h.voiceStatus,children:[(0,c.jsx)(Ke,{name:i?.enabled?"mic":"micOff"}),(0,c.jsx)("span",{className:h.status,role:"status",children:o.listenModePending?n(i?.enabled?"modeSwitching":"modeSaving"):r?n("pending"):v?n(v.label):i?B?n("voiceStopPending"):a?n("stale"):z?n("voiceInputUnavailable"):$?n("unknown"):C?n("inputError_"+C):p?.inputActive===!0?n("inputActive"):i.enabled&&T==="wake"?n(ls(re)):i.enabled?n("enabled"):n("disabled"):n("unknown")})]})]}),Ne?(0,c.jsx)(Fi,{...e,state:o,homePickerId:oe,closeHomePicker:Wn}):(0,c.jsxs)(c.Fragment,{children:[lt&&(0,c.jsx)(Wd,{...e,sessionId:e.currentConversationId,boundSession:X,state:o},e.currentConversationId),(0,c.jsxs)("div",{className:h.quickActions,children:[(0,c.jsx)(q.Button,{"data-whale-operation":M?"stop-voice":"start-voice",className:`${h.mainAction} ${i?.enabled?"":h.primary}`,variant:i?.enabled?"outline":"primary","aria-describedby":A,disabled:!s||(M?!Xi(o)||w:r||!!ae||!!v||B||!le||!!(pe&&!Qn(pe))),title:i?.enabled?n(V?.items.length?"endDiscardsRetries":"stopConsequence"):void 0,onClick:()=>{e.run(t,M?"disable":"enable",M?{}:{expectedOwnerSessionId:null,expectedExistingSessionId:pe?.sessionId??null})},children:w?n("voiceCleanupPending"):k?n(i?.enabled?"endConversation":"voiceRestartPending"):P?n("voiceRecoveryCheck"):i?.enabled?n("endConversation"):n("startConversation")}),(0,c.jsx)("div",{className:h.quickSegments,role:"group","aria-label":n("mode"),"aria-busy":!!o.listenModePending,"data-listen-mode":W?T:"unknown",children:Ct.map(te=>(0,c.jsx)(q.Button,{"data-whale-operation":`listen-mode-${te}`,"aria-pressed":W&&T===te,disabled:!!_,onClick:()=>{T!==te&&e.run(t,"listen-mode",{mode:te})},children:n(Ao(te))},te))})]}),ke.length>0&&(0,c.jsx)("ul",{className:h.inputCaptions,tabIndex:0,"aria-label":n("voiceTranscriptCaptions"),"data-whale-input-captions":!0,"data-no-drag":!0,children:ke.map(te=>(0,c.jsx)(ig,{item:te,t:n,pending:o.transcriptRetry,busy:r,canRetry:V?.items.some(hn=>hn.id===te.id),retry:()=>e.retryVoiceTranscript?.(t,te.id)},te.id))}),(!i||a||v||B)&&(0,c.jsx)("p",{className:h.hint,"data-home-important":!!v||B||void 0,children:n(v?.hint??(B?"voiceStopHint":r?"readingStatus":"statusRetry"))}),!a&&(!$||z)&&i?.enabled&&!w&&!k&&(0,c.jsx)("p",{className:h.hint,"data-whale-input-hint":!0,"data-home-important":C||z?!0:void 0,children:z?n("voiceInputRecoveryHint"):C?n("inputHelp_"+C):T==="wake"?n(re?.streamOpen&&re.detection==="asr-after-utterance"?"wakeFallbackHint":"wakeHint"):T==="always"?n("alwaysWarning"):mn?n("holdToSpeak")+" "+mn:n("bindingMissing")}),i&&!a&&!i.capabilities?.listenMode&&(0,c.jsx)("p",{className:h.hint,children:n("modeUnavailable")}),o.listenModeError&&(0,c.jsx)("p",{role:"alert","data-whale-mode-error":!0,className:h.error,children:n(o.uncertain?"modeSwitchUnconfirmed":"modeSwitchFailed")}),((o.readOnlyFailure&&a||B)&&!v||w||o.voiceStopUnconfirmed)&&(0,c.jsx)(q.Button,{variant:"outline",disabled:r,onClick:()=>{e.run(t,"status")},children:n("retryStatus")}),(o.error||N)&&!o.readOnlyFailure&&!S&&!I&&!o.listenModeError&&!P&&!k&&(0,c.jsx)("p",{role:"alert",className:h.error,children:n(F?"voiceTargetChanged":L?"performanceFastUnavailable":!o.uncertain&&N?"enableFailed":"operationUnavailable")}),I&&!v&&(0,c.jsxs)("p",{role:"alert",className:h.notice,children:[n("voiceTargetOccupied"),_n&&(0,c.jsx)(q.Button,{variant:"outline",onClick:()=>$e("targets"),children:n("chooseVoiceTarget")})]}),S&&(0,c.jsxs)("p",{role:"alert",className:h.notice,children:[S," ",(0,c.jsx)(q.Button,{variant:"outline",disabled:!_n,onClick:()=>$e("targets"),children:"\u7BA1\u7406\u7ED1\u5B9A"})]}),/VOICE_SESSION_ARCHIVED/.test(N??o.error??"")&&(0,c.jsxs)("p",{className:h.notice,children:["\u539F\u8BED\u97F3\u4F1A\u8BDD\u5DF2\u5F52\u6863\u3002",(0,c.jsx)(q.Button,{variant:"outline",onClick:()=>{e.openSettings("sessions")},children:"\u6062\u590D\u539F\u4F1A\u8BDD"})]}),/VOICE_ASR_(?:PREPARING|PREPARE_FAILED)/.test(N??o.error??"")&&(0,c.jsxs)("p",{className:h.notice,children:["SenseVoice \u5C1A\u672A\u5C31\u7EEA\u3002",(0,c.jsx)(q.Button,{variant:"outline",onClick:()=>{e.openSettings("models","download")},children:"\u67E5\u770B\u6A21\u578B\u8FDB\u5EA6"})]}),/VOICE_MODEL_REQUIRED/.test(N??o.error??"")&&(0,c.jsxs)("p",{className:h.notice,children:["\u8BF7\u5148\u9009\u62E9\u53EF\u7528\u7684\u5BF9\u8BDD\u6A21\u578B\u3002",(0,c.jsx)(q.Button,{variant:"outline",onClick:()=>{e.openSettings("models","conversation")},children:"\u8BBE\u7F6E\u5BF9\u8BDD\u6A21\u578B"})]}),(cn||xt)&&(0,c.jsxs)("p",{className:h.notice,"data-home-important":!0,children:["\u6717\u8BFB\u5F85\u542F\u7528\uFF0C\u56DE\u7B54\u4F1A\u663E\u793A\u4E3A\u6587\u5B57\u3002",(0,c.jsx)(q.Button,{variant:"outline",onClick:()=>{e.openSettings("models","voice")},children:"\u8BBE\u7F6E\u6717\u8BFB"})]}),pe&&!Qn(pe)&&(0,c.jsx)("p",{className:h.hint,"data-home-important":!0,children:vr(pe)}),p?.providerError&&(0,c.jsx)("p",{role:"alert","data-home-important":!0,"data-whale-provider-error":!0,className:h.error,children:p.providerError}),(0,c.jsx)(kd,{...e,state:o}),!pe&&!o.error&&!C&&!v&&!B&&!z&&!$&&(0,c.jsx)(sg,{...e,state:o}),wt&&(0,c.jsx)("p",{role:"alert",className:h.notice,children:"DSH \u6682\u65F6\u65E0\u6CD5\u6253\u5F00\u539F\u4F1A\u8BDD\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"}),Qn(pe)&&e.openExistingVoiceSession&&(0,c.jsxs)(q.Button,{className:h.caption,"data-whale-operation":"open-native-session","aria-label":"\u6253\u5F00\u539F\u4F1A\u8BDD",onClick:async()=>{nt(!1);try{await e.openExistingVoiceSession(pe.sessionId)}catch{nt(!0)}},children:[p?.latest?.text&&(0,c.jsx)("span",{className:h.ellipsis,children:p.latest.text}),(0,c.jsx)("span",{className:h.openOriginal,children:"\u6253\u5F00\u539F\u4F1A\u8BDD"}),(0,c.jsx)(Ke,{name:"chevron"})]}),i&&!G&&(0,c.jsxs)(q.Button,{ref:te=>{kn.current.conversation=te},className:h.caption,onClick:()=>{let te=Te!=="conversation";$e(te?"conversation":null),te&&e.run(t,"read-history")},"aria-label":n("recentConversation"),"aria-expanded":Te==="conversation",children:[(0,c.jsxs)("span",{className:h.ellipsis,children:[f.latest?.state==="speech-failed"?n("speechFailed")+": ":f.latest?.state==="interrupted"?n("speechInterrupted")+": ":"",f.latest?.text??n(o.newChatFor===t?"newChatCreated":"viewConversation")]}),(0,c.jsx)(Ke,{name:"chevron"})]}),zn()]})]})}function ig({item:e,pending:n,busy:t,canRetry:o,retry:i,t:r}){let s=(0,D.useId)(),a=n?.id===e.id&&e.state==="ready"?n.state:e.state,d=bt(e);return(0,c.jsxs)("li",{className:h.inputCaption,"data-whale-input-caption":!0,"data-delivery-state":a,children:[(0,c.jsxs)("div",{id:s,children:[(0,c.jsx)("p",{className:h.inputCaptionText,children:e.text}),(0,c.jsxs)("p",{className:h.inputCaptionReceipt,role:"status",children:[(0,c.jsx)("span",{children:r("transcriptDelivery_"+a)}),(0,c.jsx)("span",{className:h.ellipsis,title:d,children:d})]})]}),o&&(0,c.jsx)(q.Button,{variant:"outline",disabled:t||!!n||a!=="ready",onClick:()=>{i()},"aria-describedby":s,"data-whale-operation":"retry-voice-transcript",children:r("retryTranscript")})]})}function zr(e,n){return!!(e.settings?.revision&&e.settingsFor===n&&!e.visibilityUncertain&&!e.settingsConflict&&!e.ttsUncertain&&!e.ttsCancelling&&Wo(e,n))}function sg({state:e,sessionId:n,t,run:o,readState:i}){let r=(0,D.useRef)(0);(0,D.useEffect)(()=>()=>{r.current++},[n]);let s=zr(e,n),a=e.settings?.voiceSession?.performanceMode,d=e.performanceFor===n?e.performance:null,l=["fast","balanced","high"],u=d?.modes?.some(f=>f.performanceMode===a&&!f.available),p=e.busy||e.performancePending||e.uncertain||e.visibilityUncertain||!s,m=async f=>{if(p||f===a)return;let b=++r.current;if(f!=="compatibility"&&!await o(n,"inspect-performance")||b!==r.current)return;let v=i?.();!v||!zr(v,n)||v.busy||f!=="compatibility"&&(v.performanceFor!==n||!v.performance?.modes?.find(w=>w.performanceMode===f)?.available)||await o(n,"set-performance-mode",{revision:v.settings.revision,performanceMode:f})};return s?(0,c.jsxs)("section",{className:h.quickSpeed,"aria-label":t("performanceTitle"),children:[(0,c.jsxs)("div",{className:h.quickSpeedHeader,children:[(0,c.jsx)("span",{children:t("performanceTitle")}),a==="compatibility"&&(0,c.jsx)("small",{children:t("performance_compatibility")})]}),(0,c.jsx)("div",{className:h.quickSegments,children:l.map(f=>(0,c.jsxs)(q.Button,{"aria-pressed":a===f,disabled:p||!!Ji(d,f),title:t(Ji(d,f)||(f==="fast"?"performanceFastHint":"performance_"+f)),onClick:()=>{m(f)},children:[a===f&&(0,c.jsx)(Ke,{name:"check"}),(0,c.jsx)(ep,{value:f,t})]},f))}),(0,c.jsx)(np,{capability:d,t,compact:!0,pending:e.performancePending,error:e.performanceError}),u&&(0,c.jsx)(q.Button,{variant:"outline",disabled:p,onClick:()=>{m("compatibility")},children:t("performance_compatibility")})]}):null}function ag({settings:e,sessionId:n,busy:t,run:o,t:i,status:r,verified:s,statusFresh:a,tab:d,markSettingsEdited:l,discardSettingsDraft:u,bindingError:p,captureBindings:m}){let[f,b]=(0,D.useState)(e.values.device??null),[v,w]=(0,D.useState)(e.values.pttMouse),[k,P]=(0,D.useState)(e.values.pttKeyboard??null),[M,B]=(0,D.useState)(e.values.speakerVerification.enabled),E=e.capabilities?.turnSignals===!0,[T,z]=(0,D.useState)(e.values.turnSignals?.enabled??!1),[$,W]=(0,D.useState)(e.values.turnSignals?.volume?.toString()??""),[_,C]=(0,D.useState)((e.values.wakeWordAliases??["\u5C0F\u9CB8\u9C7C"]).join("\uFF0C")),[N,S]=(0,D.useState)(String((e.values.wakeListenTimeoutMs??1e4)/1e3)),I=ds(_),F=Eo(I)&&Number.isInteger(Number(N)*1e3)&&Number(N)>=3&&Number(N)<=30,L=JSON.stringify(I)!==JSON.stringify(e.values.wakeWordAliases??["\u5C0F\u9CB8\u9C7C"])||Number(N)*1e3!==(e.values.wakeListenTimeoutMs??1e4),[Z,X]=(0,D.useState)(e.values.semanticExperimental===!0),[G,ae]=(0,D.useState)(e.values.turnSignals?.headphonesConfirmed??!1),[le,pe]=(0,D.useState)(e.values.turnSignals?.experimentalAutomaticBargeIn??!1),xe=v!==e.values.pttMouse||JSON.stringify(k)!==JSON.stringify(e.values.pttKeyboard??null),[A,oe]=(0,D.useState)(!1),Q=a?r?.inputDevices:null,V=f!==null&&typeof f=="object",ke=V||f==null||f===""||Q?.items?.some(re=>typeof f=="number"&&re.index===f),on=A==="index"&&(String(f??"").trim()===""||!/^\d+$/.test(String(f).trim())||!Number.isSafeInteger(Number(f))),Fe=t||!a||r?.enabled!==!1||r?.ownerSessionId!==null||r?.voiceControlBusy!==!1||r?.voiceSession?.fullyStopped!==!0,_n=()=>{if(t||!F||on||L&&Fe)return;let re=V&&!A?f:A==="index"?Number(f):f==null||f===""?null:A==="name"?String(f).trim():typeof f=="number"?f:f.trim();o(n,"save-settings",{revision:e.revision,values:{wakeWordAliases:I,wakeListenTimeoutMs:Number(N)*1e3,semanticExperimental:Z,device:re,pttMouse:e.values.pttMouse,...e.capabilities?.pttKeyboard?{pttKeyboard:e.values.pttKeyboard??null}:{},speakerVerification:{enabled:M},...E?{turnSignals:{enabled:T,volume:Number($),headphonesConfirmed:G,experimentalAutomaticBargeIn:le}}:{}}})},lt=(0,c.jsx)(q.Button,{className:h.primary,variant:"primary",disabled:t||!F||on||L&&Fe||E&&($.trim()===""||!Number.isFinite(Number($))||Number($)<0||Number($)>1),onClick:_n,children:i(t?"pending":"save")}),Je=V?f.name:Q?.items?.find(re=>re.index===f)?.name??(f==null||f===""?i("deviceDefault"):String(f));return(0,c.jsxs)("div",{className:h.section,"data-settings-draft":"save-settings",children:[(0,c.jsxs)("div",{hidden:d!=="audio",className:h.section,children:[(0,c.jsx)("h3",{children:i("mode")}),(0,c.jsxs)("p",{className:h.hint,children:["\u5F53\u524D\uFF1A",i(Ao(r?.listenMode??e.listenMode))]}),(0,c.jsx)("div",{className:h.segmented,children:["ptt","always","wake"].map(re=>(0,c.jsx)(q.Button,{"data-whale-operation":`listen-mode-${re}`,variant:"outline","aria-pressed":(r?.listenMode??e.listenMode)===re,disabled:!e.capabilities?.listenMode||!s||t,onClick:()=>{o(n,"listen-mode",{mode:re})},children:i(Ao(re))},re))}),(!e.capabilities?.listenMode||!s)&&(0,c.jsx)("p",{className:h.hint,children:i(e.capabilities?.listenMode?"modeNeedsGrant":"modeUnavailable")}),(0,c.jsxs)("div",{className:h.inlineActions,children:[(0,c.jsxs)("label",{className:h.inlineField,children:[i("device"),(0,c.jsxs)("select",{title:Je,className:h.deviceSelect,"aria-label":i("device"),disabled:t,value:A?"__manual-"+A:V?"__stable":ke?f??"":"__saved",onChange:re=>{let Ye=re.target.value;Ye.startsWith("__manual-")?(oe(Ye.slice(9)),V&&b("")):Ye!=="__saved"&&Ye!=="__stable"&&(oe(!1),b(Ye===""?null:Number(Ye)))},children:[(0,c.jsx)("option",{value:"",children:i("deviceDefault")}),V&&(0,c.jsx)("option",{value:"__stable",children:f.name}),Q?.items?.map(re=>(0,c.jsxs)("option",{value:String(re.index),children:[re.name," (",re.index,")"]},re.index)),!ke&&(0,c.jsxs)("option",{value:"__saved",children:[i("deviceSaved"),": ",f]}),(0,c.jsx)("option",{value:"__manual-index",children:i("deviceManualIndex")}),(0,c.jsx)("option",{value:"__manual-name",children:i("deviceManualName")})]})]}),lt]}),Je.length>22&&(0,c.jsxs)("details",{className:h.fullName,children:[(0,c.jsx)("summary",{children:"\u67E5\u770B\u8BBE\u5907\u5168\u540D"}),(0,c.jsx)("p",{children:Je})]}),(A||!ke)&&(0,c.jsxs)("label",{className:h.field,children:[i("deviceManual"),(0,c.jsx)(q.Input,{"aria-label":i("deviceManual"),disabled:t,value:f??"",onChange:re=>{A||oe(typeof f=="number"?"index":"name"),b(re.target.value)}})]}),on&&(0,c.jsx)("p",{className:h.notice,children:i("deviceIndexInvalid")}),Q?.status!=="available"&&(0,c.jsx)("p",{className:h.hint,children:i(Q?.status==="empty"?"deviceEmpty":"deviceUnknown")})]}),(0,c.jsx)("div",{hidden:d!=="interaction",className:h.section,children:(0,c.jsxs)("div",{className:h.bindingEditor,"data-settings-draft":"save-bindings",children:[(0,c.jsx)(ug,{captureBindings:m,sessionId:n,active:d==="interaction",value:k,onChange:re=>{l?.("save-bindings"),P(re)},capability:e.capabilities?.pttKeyboard,disabled:t||!a,t:i}),(0,c.jsxs)("fieldset",{className:`${h.radios} ${h.mouseBinding}`,disabled:t||!a,children:[(0,c.jsx)("legend",{children:i("sideButton")}),[0,1,2].map((re,Ye)=>(0,c.jsxs)("label",{children:[(0,c.jsx)("input",{type:"radio",name:"whale-ear-mouse",value:re,checked:v===re,onChange:()=>{l?.("save-bindings"),w(re)}}),i(["sideOff","sideOne","sideTwo"][Ye])]},re))]}),p&&(0,c.jsx)("p",{role:"alert",className:h.notice,children:/RECORDING|KEYS_HELD/.test(p)?"\u8BF7\u5148\u677E\u5F00\u6309\u952E\uFF0C\u7B49\u5F85\u5F55\u97F3\u5904\u7406\u5B8C\u6210\uFF0C\u518D\u4FDD\u5B58\u3002":/UNCONFIRMED|STOP_UNCONFIRMED|ROLLBACK_UNCONFIRMED/.test(p)?"\u6309\u952E\u72B6\u6001\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u91CD\u542F DSH \u518D\u6838\u67E5\u6309\u952E\u3002":/STALE|配置已改变|语音会话已改变/.test(p)?"\u914D\u7F6E\u6216\u8BED\u97F3\u4F1A\u8BDD\u5DF2\u6539\u53D8\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6\u540E\u518D\u4FDD\u5B58\u3002":/UNSUPPORTED/.test(p)?"\u5F53\u524D\u7CFB\u7EDF\u4E0D\u652F\u6301\u5728\u5BF9\u8BDD\u4E2D\u66F4\u6362\u5168\u5C40\u6309\u952E\u3002":"\u672A\u80FD\u4FDD\u5B58\u6309\u952E\uFF0C\u8BF7\u67E5\u770B\u9AD8\u7EA7\u8BE6\u60C5\u3002"}),(0,c.jsxs)("div",{className:`${h.actions} ${h.bindingActions}`,children:[(0,c.jsx)(q.Button,{className:h.primary,variant:"primary",disabled:t||!a||!xe||!e.bindingContext||k?.code==="F4"&&k.modifiers.includes("Alt"),onClick:()=>{o(n,"save-bindings",{revision:e.revision,bindingContext:e.bindingContext,values:{pttMouse:v,pttKeyboard:k}})},children:i("saveBindings")}),xe&&(0,c.jsx)(q.Button,{variant:"outline",disabled:t,onClick:()=>{w(e.values.pttMouse),P(e.values.pttKeyboard??null),u?.("save-bindings")},children:i("discardBindings")})]})]})}),(0,c.jsxs)("div",{hidden:d!=="advanced"||!e.values.speakerVerification.enabled,className:h.section,children:[e.values.speakerVerification.enabled&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(Xt,{label:i("speaker"),checked:M,disabled:t,onChange:B}),(0,c.jsx)("p",{className:h.hint,children:i("speakerHint")})]}),(0,c.jsx)("p",{className:h.hint,children:i("savedHint")})]}),(0,c.jsxs)("div",{hidden:d!=="audio",className:h.disclosureRow,children:[(0,c.jsxs)("details",{className:h.section,children:[(0,c.jsx)("summary",{children:i("wakeSettings")}),(0,c.jsx)("p",{className:h.hint,children:i("wakeMethod")}),(0,c.jsxs)("label",{className:h.field,children:[i("wakeAliases"),(0,c.jsx)(q.Input,{"aria-label":i("wakeAliases"),maxLength:208,value:_,disabled:Fe,onChange:re=>C(re.target.value)})]}),(0,c.jsx)("p",{className:h.hint,children:i("wakeAliasesHint")}),(0,c.jsxs)("label",{className:h.field,children:[i("wakeTimeout"),(0,c.jsx)(q.Input,{"aria-label":i("wakeTimeout"),type:"number",min:"3",max:"30",step:"1",value:N,disabled:Fe,onChange:re=>S(re.target.value)})]}),Fe&&(0,c.jsx)("p",{className:h.hint,children:i("wakeStopToEdit")}),!F&&(0,c.jsx)("p",{role:"alert",className:h.notice,children:i("wakeInvalid")})]}),(0,c.jsxs)("details",{className:h.section,children:[(0,c.jsx)("summary",{children:i("soundTitle")}),(0,c.jsx)(Xt,{label:i("soundEnabled"),checked:T,disabled:!E||t,onChange:z}),(0,c.jsxs)("label",{className:h.field,children:[i("soundVolume"),(0,c.jsx)(jt,{"aria-label":i("soundVolume")+"\u6ED1\u5757",min:"0",max:"1",step:"0.05",value:$,disabled:!E||t,onChange:re=>W(re.target.value)}),(0,c.jsx)(q.Input,{type:"number",min:"0",max:"1",step:"0.05","aria-label":i("soundVolume"),disabled:!E||t,value:$,onChange:re=>W(re.target.value)})]}),(0,c.jsx)(Xt,{label:"\u5B9E\u9A8C\u6027\u5524\u9192\u5224\u65AD\uFF08\u9ED8\u8BA4\u5173\u95ED\uFF09",checked:Z,disabled:t,onChange:X}),(0,c.jsx)("p",{className:h.hint,children:"\u5173\u95ED\u65F6\uFF0C\u81EA\u7531\u9EA6\u76F4\u63A5\u542C\u53D6\u6709\u6548\u8BED\u97F3\uFF1B\u5F00\u542F\u540E\u4F7F\u7528\u5524\u9192\u8BCD\u6216\u8BED\u4E49\u5224\u65AD\uFF0C\u53EF\u80FD\u6F0F\u5524\u9192\u3002\u5EFA\u8BAE\u4F7F\u7528\u8033\u673A\u51CF\u5C11\u56DE\u58F0\u3002"}),(0,c.jsx)(q.Checkbox,{label:i("headphones"),checked:G,disabled:!E||t,onChange:re=>{ae(re),re||pe(!1)}}),(0,c.jsx)("p",{className:h.hint,children:i("headphonesHint")}),(0,c.jsx)(Xt,{label:i("automaticBargeIn"),checked:le,disabled:!E||!G||t,onChange:pe}),E&&!G&&(0,c.jsx)("p",{className:h.hint,children:i("headphonesRequired")}),(0,c.jsx)("p",{className:h.hint,children:i(E?"soundAvailable":"soundUnavailable")})]})]}),d==="advanced"&&e.values.speakerVerification.enabled&&(0,c.jsx)("div",{className:h.formActions,children:lt})]})}function Qd({action:e,active:n}){let[t,o]=(0,D.useState)(null),[i,r]=(0,D.useState)(0),s=(0,D.useRef)(0);if((0,D.useEffect)(()=>{if(!e||!n)return;let l=new AbortController,u,p=async f=>{try{let b=await e({operation:f},l.signal);if(l.signal.aborted)return;o(b),b.selected&&(f==="retry"||["idle","downloading"].includes(b.state))&&(u=setTimeout(()=>{p("status")},1e3))}catch{l.signal.aborted||o({state:"unavailable"})}},m=i>s.current?"retry":"status";return s.current=i,p(m),()=>{clearTimeout(u),l.abort()}},[e,n,i]),!e||!n)return null;let a=t?.totalBytes>0&&t?.state==="downloading",d=l=>(l/1e6).toFixed(1);return(0,c.jsxs)("div",{className:h.section,"data-whale-sensevoice":!0,children:[(0,c.jsx)("h3",{children:"SenseVoice"}),(0,c.jsx)("p",{role:"status",children:t?.selected===!1?"\u4F7F\u7528\u9AD8\u7EA7\u8DEF\u5F84\u4E2D\u6307\u5B9A\u7684\u672C\u5730 SenseVoice \u6A21\u578B\u3002":t?.state==="ready"?"\u5DF2\u5C31\u7EEA\uFF0C\u5728\u672C\u673A\u79BB\u7EBF\u8BC6\u522B\u3002":t?.state==="error"?t.message:t?.state==="unavailable"?"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u6A21\u578B\u72B6\u6001\u3002":a?`\u6B63\u5728\u4E0B\u8F7D \xB7 ${d(t.receivedBytes)} / ${d(t.totalBytes)} MB`:"\u6B63\u5728\u51C6\u5907\u672C\u5730\u8BC6\u522B\u6A21\u578B\u2026"}),a&&(0,c.jsx)("progress",{"aria-label":"SenseVoice \u4E0B\u8F7D\u8FDB\u5EA6",value:t.receivedBytes,max:t.totalBytes}),t?.selected&&t?.state==="error"&&(0,c.jsx)(q.Button,{variant:"outline",onClick:()=>{o(null),r(l=>l+1)},children:"\u91CD\u8BD5\u4E0B\u8F7D"})]})}function cg({settings:e,sessionId:n,busy:t,run:o,t:i,pickPath:r,active:s,modelTab:a,markSettingsEdited:d,senseVoiceAsrAction:l}){let[u,p]=(0,D.useState)(e.modelSetup.models),m=t,f=()=>d?.("save-models"),b=()=>{o(n,"save-models",{revision:e.revision,values:{asr:"sensevoice",modelCompute:"cpu",models:u}})};return(0,c.jsxs)("section",{className:h.section,"data-settings-draft":"save-models",hidden:!["download","paths"].includes(a),children:[(0,c.jsx)("div",{"data-whale-tab-panel":!0,hidden:a!=="download",children:(0,c.jsx)(Qd,{action:l,active:s&&a==="download"})}),(0,c.jsxs)("div",{hidden:a!=="paths",className:h.section,children:[(0,c.jsx)("h3",{children:"\u8BC6\u522B\u6A21\u578B\u672C\u5730\u8DEF\u5F84"}),(0,c.jsx)("p",{className:h.hint,children:"\u53EF\u5728\u201C\u6A21\u578B\u4E0B\u8F7D\u201D\u67E5\u770B\u51C6\u5907\u8FDB\u5EA6\uFF0C\u6216\u5728\u8FD9\u91CC\u6307\u5B9A\u672C\u673A\u5DF2\u6709\u7684 SenseVoice \u76EE\u5F55\u3002"}),[["sensevoiceDir","sensevoicePath"],["campplus","campplusPath"]].map(([v,w])=>(0,c.jsx)(_o,{className:h.pathRow,label:i(w),kind:v,value:u[v],disabled:m,active:s&&a==="paths",pickPath:r,sessionId:n,scope:"sensevoice",onChange:k=>{f(),p(P=>({...P,[v]:k}))}},v)),(0,c.jsx)(q.Button,{variant:"outline",disabled:m,onClick:b,children:i("saveModels")})]})]})}function lg({settings:e,state:n,sessionId:t,run:o,t:i}){let[r,s]=(0,D.useState)(e.voiceSession.visibility),a=n.settingsFor===t,d=n.checkedFor===t&&n.status!==null,l=d?n.status.voiceCapabilities:e.voiceCapabilities,u=d?n.status.voiceSession:null,p=d&&(n.status.enabled||n.status.ownerSessionId!==null||u?.id!=null),m=d&&n.status.voiceControlBusy===!1,f=n.busy||n.uncertain||!a||!d||!m||p,b=v=>i(v==="workspace"?"workspaceMode":"hiddenMode");return(0,c.jsxs)("section",{className:h.section,"data-whale-visibility":!0,"data-settings-draft":"set-visibility",children:[(0,c.jsx)("h3",{children:i("capabilityTitle")}),(0,c.jsx)("dl",{className:h.details,children:["hidden","workspace"].map(v=>(0,c.jsxs)("div",{className:h.capabilityRow,children:[(0,c.jsx)("dt",{children:b(v)}),(0,c.jsxs)("dd",{children:[i(l?.[v]?.supported?"supported":"unsupported"),l?.[v]?.reason?` \xB7 ${l[v].reason}`:""]})]},v))}),(0,c.jsxs)("p",{className:h.hint,children:[i("taskCapability"),": ",i(l?.taskHandoff?.supported?"supported":"unsupported")," \xB7 ",l?.taskHandoff?.mode??i("unknown"),l?.taskHandoff?.reason?` \xB7 ${l.taskHandoff.reason}`:""]}),(0,c.jsxs)("p",{children:[i("configuredMode"),": ",b(e.voiceSession.visibility)]}),(0,c.jsx)("p",{className:h.hint,children:d?u?.id?`${i("currentVoiceMode")}: ${u.presentation?.requested?b(u.presentation.requested):i("unknown")} \xB7 ${u.id}`:i("noActiveVoice"):i("modeReadFirst")}),(0,c.jsxs)("fieldset",{className:h.radios,disabled:f,children:[(0,c.jsx)("legend",{children:i("chooseVisibility")}),(0,c.jsxs)("label",{children:[(0,c.jsx)("input",{type:"radio",name:"whale-ear-visibility",checked:r==="hidden",onChange:()=>s("hidden")}),i("hiddenMode")]}),(0,c.jsxs)("label",{children:[(0,c.jsx)("input",{type:"radio",name:"whale-ear-visibility",checked:r==="workspace",disabled:!l?.workspace?.supported,onChange:()=>s("workspace")}),i("workspaceMode")]})]}),(0,c.jsx)("p",{className:h.hint,children:i("workspaceWarning")}),(0,c.jsx)("p",{className:h.hint,children:i("visibilityNoMigration")}),(!a||!d)&&(0,c.jsx)("p",{className:h.hint,children:i("modeReadFirst")}),p&&(0,c.jsx)("p",{className:h.hint,children:i("closeBeforeMode")}),d&&!m&&(0,c.jsx)("p",{className:h.hint,children:i("modeControlPending")}),(0,c.jsx)("div",{children:(0,c.jsx)(q.Button,{variant:"outline",disabled:f||r===e.voiceSession.visibility||r==="workspace"&&!l?.workspace?.supported,onClick:()=>{o(t,"set-visibility",{revision:e.revision,visibility:r})},children:i(r==="workspace"?"saveWorkspace":"saveHidden")})})]})}function ug({value:e,onChange:n,capability:t,disabled:o,t:i,captureBindings:r,sessionId:s,active:a}){let[d,l]=(0,D.useState)(!1),[u,p]=(0,D.useState)(!1),[m,f]=(0,D.useState)(null),b=(0,D.useRef)(null),v=(0,D.useRef)(0),w=(0,D.useRef)(null),k=(0,D.useRef)(!0),P=async E=>{v.current++,k.current&&l(!1);let T=b.current;if(T){k.current&&p(!0);try{await r(T.sessionId,{operation:"end",token:T.token}),b.current===T&&(b.current=null),k.current&&E&&n(E),k.current&&f(null)}catch(z){k.current&&f(String(z.message||z))}finally{k.current&&p(!1)}}},M=async()=>{if(b.current||u)return;let E=++v.current;p(!0),f(null);try{let T=await r(s,{operation:"begin"});if(b.current={...T,sessionId:s},!k.current||E!==v.current){await P();return}l(!0),w.current?.focus()}catch(T){k.current&&f(String(T.message||T))}finally{k.current&&p(!1)}};(0,D.useEffect)(()=>(k.current=!0,()=>{k.current=!1,P()}),[]),(0,D.useEffect)(()=>{(!a||o)&&(v.current++,P())},[a,o,s]),(0,D.useEffect)(()=>{if(!d)return;let E=null,T=!1,z=!1,$=I=>{z||(z=!0,P(I))},W=I=>{if(I.preventDefault(),I.stopPropagation(),I.code==="Escape"){E=null;return}I.repeat||["ControlLeft","ControlRight","AltLeft","AltRight","ShiftLeft","ShiftRight"].includes(I.code)||(E=hd(I),T=!1,f(E?null:i("bindingUnsupported")))},_=I=>{if(I.preventDefault(),I.stopPropagation(),I.code==="Escape"){$();return}E&&(I.code===E.code&&(T=!0),T&&!I.ctrlKey&&!I.altKey&&!I.shiftKey&&$(E))},C=()=>$(),N=()=>{document.hidden&&C()};window.addEventListener("keydown",W,!0),window.addEventListener("keyup",_,!0),window.addEventListener("blur",C),document.addEventListener("visibilitychange",N);let S=setTimeout(C,1e4);return()=>{clearTimeout(S),window.removeEventListener("keydown",W,!0),window.removeEventListener("keyup",_,!0),window.removeEventListener("blur",C),document.removeEventListener("visibilitychange",N)}},[d]);let B=e?[...e.modifiers||[],e.code].join(" + "):i("bindingOff");return(0,c.jsxs)("section",{className:h.keyBinding,children:[(0,c.jsx)("h3",{children:i("keyboardBinding")}),(0,c.jsxs)("div",{className:h.keyBindingRow,children:[(0,c.jsx)("span",{children:B}),(0,c.jsxs)("div",{className:h.actions,children:[(0,c.jsx)(q.Button,{variant:"outline",ref:w,onBlur:()=>{d&&P()},disabled:o||u||!t?.supported||!r,onClick:()=>d?void P():void M(),children:u?"\u6B63\u5728\u4EA4\u63A5\u2026":d?"\u53D6\u6D88\u5F55\u5165":"\u5F55\u5165\u6309\u952E"}),e&&(0,c.jsx)(q.Button,{variant:"outline",disabled:o||u||d,onClick:()=>n(null),children:i("clearBinding")}),b.current&&!d&&!u&&(0,c.jsx)(q.Button,{variant:"outline",onClick:()=>{P()},children:"\u6062\u590D\u539F\u6309\u952E"})]})]}),d&&(0,c.jsx)("p",{role:"status",className:h.notice,children:"\u6309\u952E\u8BF4\u8BDD\u5DF2\u6682\u505C\u3002\u8BF7\u6309\u4E0B\u7EC4\u5408\u952E\u540E\u5168\u90E8\u677E\u5F00\uFF1BEsc \u53D6\u6D88\u3002"}),!t?.supported&&(0,c.jsx)("p",{className:h.hint,children:t?.reason||i("bindingUnavailable")}),m&&(0,c.jsx)("p",{role:"alert",children:m})]})}function ep({value:e,t:n}){let t={fast:"performanceNoThinking",balanced:"performanceRecommended"}[e];return(0,c.jsxs)("span",{className:h.performanceChoice,children:[n("performance_"+e),t&&(0,c.jsxs)(c.Fragment,{children:[" ",(0,c.jsx)("small",{children:n(t)})]})]})}function Ji(e,n){let t=e?.modes?.find(o=>o.performanceMode===n);return!t||t.available?null:t.reason==="provider_unsupported"?"performanceUnavailable":t.reason==="unknown"?"performanceProbeUnknown":n==="fast"?"performanceFastUnavailable":"performanceHostUnavailable"}function np({capability:e,t:n,compact:t=!1,pending:o=!1,error:i=null}){let r=e?.modes??[],s=r.map(v=>v.reason),a=e?.probe?.status,d=a==="unknown"||s.includes("unknown"),l=o||a==="pending"||a==="running",u=!t&&(a==="accepted"||s.includes("accepted")),p=!t&&s.includes("explicit_off"),m=r.some(v=>v.performanceMode==="fast"&&!v.available&&v.reason==="host_contract_blocked"),f=s.includes("provider_unsupported"),b=r.some(v=>v.performanceMode!=="fast"&&!v.available&&v.reason==="host_contract_blocked");if(!d&&!l&&!u&&!p&&!m&&!f&&!b&&!i)return null;if(t){let v=i||n(l?"performanceProbePending":m?"performanceFastUnavailable":f?"performanceUnavailable":d?"performanceProbeUnknown":"performanceHostUnavailable");return(0,c.jsx)("div",{role:"status",className:h.quickHint,"data-whale-probe-status":!0,title:v,children:v})}return(0,c.jsxs)("div",{role:"status",className:h.hint,"data-whale-probe-status":!0,children:[l&&(0,c.jsx)("p",{children:n("performanceProbePending")}),i&&(0,c.jsx)("p",{"data-whale-probe-error":!0,children:i}),m&&(0,c.jsx)("p",{children:n("performanceFastUnavailable")}),f&&(0,c.jsx)("p",{children:n("performanceUnavailable")}),b&&(0,c.jsx)("p",{children:n("performanceHostUnavailable")}),d&&(0,c.jsx)("p",{children:n("performanceProbeUnknown")}),u&&(0,c.jsx)("p",{children:n("performanceProbeAccepted")}),p&&(0,c.jsx)("p",{children:n("performanceFastHint")})]})}function dg({state:e,sessionId:n,run:t,t:o,markSettingsEdited:i}){let r=e.settings,s=r?.voiceSession?.performanceMode??null,[a,d]=(0,D.useState)(s),l=zr(e,n),u=e.performanceFor===n?e.performance:null,p=u?.modes?.find(f=>f.performanceMode===a),m=e.busy||e.performancePending||e.uncertain||!l||!a||a!=="compatibility"&&!p?.available;return l?(0,c.jsxs)("section",{className:h.section,"data-whale-performance":!0,"data-settings-draft":"set-performance-mode",children:[(0,c.jsx)("h3",{children:o("performanceTitle")}),(0,c.jsx)("p",{className:h.hint,children:o("performanceHint")}),(0,c.jsx)("p",{className:h.hint,"data-whale-probe-cost":!0,children:"\u90E8\u5206\u6A21\u578B\u7684\u68C0\u6D4B\u4F1A\u53D1\u9001\u8BA1\u8D39\u77ED\u8BF7\u6C42\u3002"}),(0,c.jsxs)("details",{className:h.details,children:[(0,c.jsx)("summary",{children:"\u68C0\u6D4B\u8303\u56F4\u4E0E\u8D39\u7528"}),(0,c.jsx)("p",{children:o("performanceProbeCost")}),(0,c.jsx)("p",{children:o("performanceProbeScope")})]}),(0,c.jsx)(np,{capability:u,t:o,pending:e.performancePending,error:e.performanceError}),!u&&(0,c.jsx)("p",{className:h.hint,children:o("performanceReadFirst")}),s&&(0,c.jsxs)("p",{className:h.hint,children:["\u5F53\u524D\uFF1A",o("performance_"+s)]}),(0,c.jsx)("div",{className:h.segmented,children:["fast","balanced","high","compatibility"].map(f=>{let b=f==="compatibility"?null:u?Ji(u,f):"performanceReadFirst";return(0,c.jsx)(q.Button,{title:b?o(b):void 0,"aria-pressed":a===f,disabled:e.busy||e.performancePending||!!b,onClick:()=>{i?.("set-performance-mode"),d(f)},children:(0,c.jsx)(ep,{value:f,t:o})},f)})}),(0,c.jsxs)("div",{className:h.actions,children:[(0,c.jsx)(q.Button,{variant:"outline",disabled:e.busy||e.performancePending,onClick:()=>{t(n,"inspect-performance")},children:o("inspectPerformance")}),(0,c.jsx)(q.Button,{variant:"outline",disabled:m||a===s,onClick:()=>{t(n,"set-performance-mode",{revision:r.revision,performanceMode:a})},children:o("savePerformance")})]})]}):null}function pg({state:e,sessionId:n,run:t,t:o}){let i=e.outputVolumeFor===n?e.outputVolume:null,[r,s]=(0,D.useState)(null),[a,d]=(0,D.useState)(null),l=r??i?.volume??1,u=r!==null&&a!==i?.revision;return(0,D.useEffect)(()=>{s(null),d(null)},[n]),(0,c.jsxs)("section",{className:h.section,children:[(0,c.jsx)("h3",{children:o("outputVolume")}),i&&!i.supported&&(0,c.jsx)("p",{className:h.hint,children:o("outputVolumeUnavailable")}),i?.supported&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{className:h.volumeRow,children:[(0,c.jsxs)("label",{className:h.volumeControl,children:[(0,c.jsx)(jt,{"aria-label":o("outputVolume"),min:"0",max:"1",step:"0.01",value:l,disabled:!i.supported||e.busy||e.outputVolumeUncertain,onChange:p=>{r===null&&d(i.revision),s(Number(p.target.value))}}),(0,c.jsxs)("span",{children:[Math.round(l*100),"%"]})]}),(0,c.jsx)(q.Button,{variant:"outline",disabled:!i.supported||e.busy||e.outputVolumeUncertain||u||r===null,onClick:async()=>{await t(n,"set-output-volume",{revision:a,volume:r})&&s(null)},children:o("saveOutputVolume")})]}),(0,c.jsx)("p",{className:h.hint,children:"\u4E0B\u4E00\u6BB5\u64AD\u653E\u751F\u6548"})]}),u&&(0,c.jsxs)("p",{role:"status",className:h.notice,children:["\u97F3\u91CF\u5DF2\u5728\u522B\u5904\u66F4\u65B0\uFF0C\u5F53\u524D\u9009\u62E9\u5DF2\u4FDD\u7559\u3002",(0,c.jsx)(q.Button,{variant:"outline",disabled:e.busy,onClick:()=>s(null),children:"\u4F7F\u7528\u5F53\u524D\u97F3\u91CF"})]}),!i&&(0,c.jsx)("p",{role:"status",className:h.hint,children:e.busy?o("pending"):o("statusRetry")}),e.outputVolumeUncertain&&(0,c.jsx)("p",{role:"status",className:h.notice,children:o("outputVolumeUnknown")})]})}function fg({state:e,sessionId:n,run:t,markSettingsEdited:o,discardSettingsDraft:i}){let r=e.settingsFor===n?e.settings:null,s=r?.conversationModel??{mode:"auto",provider:null,model:null},[a,d]=(0,D.useState)(s),[l,u]=(0,D.useState)(""),[p,m]=(0,D.useState)(!1),f=(0,D.useRef)(!1),b=(0,D.useRef)(!0);(0,D.useEffect)(()=>(b.current=!0,()=>{b.current=!1}),[]);let v=e.conversationModelsFor===n?e.conversationModels:null,w=v?.providers??[],k=w.find($=>$.id===a.provider),P=a.mode==="auto"||!!k?.models.some($=>$.id===a.model),M=JSON.stringify(a)!==JSON.stringify(s),B=Wo(e,n),E=!r||!B||e.busy||e.settingsConflict||e.visibilityUncertain||p,T=$=>{o?.("save-conversation-model"),d(W=>({...W,...$})),u("")},z=async()=>{if(E||f.current||!M||!P)return;f.current=!0,m(!0),u("");let $=await t(n,"save-conversation-model",{revision:r.revision,values:a.mode==="auto"?{mode:"auto",provider:null,model:null}:a});f.current=!1,b.current&&(m(!1),u($?"\u9ED8\u8BA4\u5DF2\u4FDD\u5B58\uFF0C\u4E0B\u6B21\u5F00\u542F\u8BED\u97F3\u751F\u6548\u3002":"\u4FDD\u5B58\u672A\u6210\u529F\uFF0C\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002\u8BF7\u6838\u67E5\u63D0\u793A\u540E\u518D\u64CD\u4F5C\u3002"))};return(0,c.jsxs)("section",{className:h.section,"data-conversation-model":!0,"data-settings-draft":"save-conversation-model",children:[(0,c.jsx)("h3",{children:"\u9ED8\u8BA4\u5BF9\u8BDD\u6A21\u578B"}),(0,c.jsx)("p",{className:h.hint,children:"\u63A5\u6536\u8BED\u97F3\u8BC6\u522B\u540E\u7684\u6587\u5B57\uFF0C\u7528\u4E8E\u751F\u6210\u56DE\u7B54\u3002"}),(0,c.jsx)("fieldset",{className:h.radios,disabled:E,"aria-label":"\u5BF9\u8BDD\u6A21\u578B\u9009\u62E9\u65B9\u5F0F",children:[["auto","\u81EA\u52A8"],["manual","\u624B\u52A8\u6307\u5B9A"]].map(([$,W])=>(0,c.jsxs)("label",{children:[(0,c.jsx)("input",{type:"radio",name:"conversation-mode-"+n,checked:a.mode===$,onChange:()=>T($==="auto"?{mode:$,provider:null,model:null}:{mode:$})}),W]},$))}),a.mode==="auto"&&(0,c.jsxs)("div",{className:h.section,children:[(0,c.jsx)("p",{className:h.hint,children:"\u8DDF\u968F\u5F53\u524D\u5BF9\u8BDD\u6240\u9009\u6A21\u578B\u3002\u7A7A\u767D\u9996\u9875\u4F7F\u7528 DSH \u7684\u9ED8\u8BA4\u6A21\u578B\u3002"}),(0,c.jsx)("p",{children:"\u5F00\u542F\u8BED\u97F3\u65F6\u786E\u5B9A\u6A21\u578B\u6765\u6E90"})]}),(0,c.jsx)(ss,{open:a.mode==="manual",children:(0,c.jsxs)("div",{className:h.section,"data-conversation-manual":!0,children:[(0,c.jsx)(Hd,{label:"\u4F9B\u5E94\u5546",value:a.provider,options:w,disabled:E||!v,onChange:$=>T({provider:$,model:null})}),(0,c.jsx)(Hd,{label:"\u6A21\u578B",value:a.model,options:k?.models??[],disabled:E||!k,onChange:$=>T({model:$})}),(0,c.jsx)("p",{className:h.hint,children:"\u4EC5\u5217\u51FA\u5BBF\u4E3B\u5DF2\u914D\u7F6E\u7684\u5BF9\u8BDD\u4F9B\u5E94\u5546\u4E0E\u6A21\u578B\uFF0C\u4FDD\u5B58\u65F6\u518D\u6B21\u9A8C\u8BC1\u3002"}),!v&&(0,c.jsx)("p",{role:"status",children:e.conversationModelsError?"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u4F9B\u5E94\u5546\uFF0C\u8BF7\u91CD\u8BD5\u3002":"\u6B63\u5728\u8BFB\u53D6\u4F9B\u5E94\u5546\u2026"}),v&&!w.length&&(0,c.jsx)("p",{role:"status",children:"\u6682\u65E0\u53EF\u7528\u5BF9\u8BDD\u6A21\u578B\uFF0C\u8BF7\u5148\u5728 DSH \u4E2D\u914D\u7F6E\u4F9B\u5E94\u5546\u3002"}),a.provider&&!P&&(0,c.jsx)("p",{role:"status",children:"\u8BF7\u9009\u62E9\u5F53\u524D\u53EF\u7528\u7684\u4F9B\u5E94\u5546\u4E0E\u6A21\u578B\u3002\u539F\u9009\u62E9\u4E0D\u4F1A\u81EA\u52A8\u66FF\u6362\u3002"}),(0,c.jsx)(q.Button,{variant:"outline",disabled:e.busy,onClick:()=>{t(n,"conversation-models")},children:"\u5237\u65B0\u4F9B\u5E94\u5546"})]})}),(0,c.jsxs)("div",{className:h.actions,children:[(0,c.jsx)(q.Button,{variant:"primary",disabled:E||!M||!P,onClick:()=>{z()},children:p?"\u4FDD\u5B58\u4E2D\u2026":"\u4FDD\u5B58\u9ED8\u8BA4"}),(0,c.jsx)(q.Button,{variant:"outline",disabled:E||!M,onClick:()=>{d(s),u(""),i?.("save-conversation-model")},children:"\u53D6\u6D88\u4FEE\u6539"})]}),(0,c.jsx)("p",{role:"status",className:h.hint,children:l||(M?"\u5C1A\u672A\u4FDD\u5B58":s.mode==="auto"?"\u5DF2\u4FDD\u5B58\uFF1A\u81EA\u52A8 \xB7 \u8DDF\u968F\u5F53\u524D\u5BF9\u8BDD":`\u5DF2\u4FDD\u5B58\uFF1A${s.provider} / ${s.model}`)})]})}function Hd({label:e,value:n,options:t,disabled:o,onChange:i}){let[r,s]=(0,D.useState)(!1),[a,d]=(0,D.useState)(0),l=(0,D.useRef)(null),u=(0,D.useRef)(null),p=(0,D.useRef)(null),m=(0,D.useId)(),f=t.find(w=>w.id===n);(0,D.useEffect)(()=>{o&&s(!1)},[o]),(0,D.useEffect)(()=>{r&&p.current?.querySelector('[data-option-index="'+a+'"]')?.focus()},[r,a]);let b=()=>{s(!1),u.current?.focus()},v=w=>{i(w.id),b()};return(0,c.jsxs)("div",{ref:l,className:h.conversationChoice,onBlur:w=>{w.currentTarget.contains(w.relatedTarget)||s(!1)},children:[(0,c.jsx)("span",{id:m+"-label",children:e}),(0,c.jsxs)(q.Button,{ref:u,variant:"outline",className:h.deviceSelect,"aria-label":e,"aria-haspopup":"listbox","aria-expanded":r,"aria-controls":m,disabled:o||!t.length,onClick:()=>{d(Math.max(0,t.findIndex(w=>w.id===n))),s(!r)},onKeyDown:w=>{["ArrowDown","ArrowUp"].includes(w.key)&&(w.preventDefault(),d(Math.max(0,t.findIndex(k=>k.id===n))),s(!0))},children:[f?.name||n||"\u8BF7\u9009\u62E9",(0,c.jsx)("span",{"aria-hidden":"true",children:"\u2304"})]}),r&&(0,c.jsx)(q.MenuSurface,{ref:p,id:m,className:h.conversationOptions,role:"listbox","aria-labelledby":m+"-label",onKeyDown:w=>{w.key==="Escape"?(w.preventDefault(),w.stopPropagation(),b()):["ArrowDown","ArrowUp","Home","End"].includes(w.key)&&(w.preventDefault(),d(k=>w.key==="Home"?0:w.key==="End"?t.length-1:(k+(w.key==="ArrowDown"?1:-1)+t.length)%t.length))},children:t.map((w,k)=>(0,c.jsxs)("button",{type:"button",role:"option","aria-selected":n===w.id,tabIndex:k===a?0:-1,"data-option-index":k,onClick:()=>v(w),children:[w.name,n===w.id&&(0,c.jsx)("span",{"aria-hidden":"true",children:" \u2713"})]},w.id))})]})}function mg({state:e,sessionId:n,run:t,markSettingsEdited:o,discardSettingsDraft:i,t:r}){let s=e.settingsFor===n?e.settings:null,a=s?.voicePrompt,d=a?.text??"",[l,u]=(0,D.useState)(d),[p,m]=(0,D.useState)(!1),[f,b]=(0,D.useState)(""),v=(0,D.useRef)(!1),w=(0,D.useRef)(!0),k=(0,D.useRef)(d),P=(0,D.useId)();(0,D.useEffect)(()=>(w.current=!0,()=>{w.current=!1}),[]),(0,D.useEffect)(()=>{if(k.current!==d){let _=k.current;u(C=>C===_?d:C),k.current=d}},[d]);let M=l.trim()?l:"",B=M!==(d.trim()?d:""),E=Wo(e,n),T=!s||!E||e.busy||e.settingsConflict||e.visibilityUncertain||p,z=!!M&&a?.customSupported!==!0,$=l.length<=32768&&!z,W=async()=>{if(T||v.current||!B||!$)return;v.current=!0,m(!0),b("");let _=!1;try{_=await t(n,"save-voice-prompt",{revision:s.revision,values:{text:M}})}catch{_=!1}finally{v.current=!1,w.current&&(m(!1),b(r(_?"voicePromptSaved":"voicePromptSaveFailed")))}};return(0,c.jsxs)("section",{className:`${h.section} ${h.voicePrompt}`,"data-voice-prompt":!0,"data-settings-draft":"save-voice-prompt",children:[(0,c.jsxs)("label",{htmlFor:P,children:[r("voicePromptLabel")," ",(0,c.jsx)("span",{className:h.hint,children:r("voicePromptOptional")})]}),(0,c.jsx)("textarea",{id:P,className:h.voicePromptInput,value:l,maxLength:32768,disabled:T,placeholder:r("voicePromptPlaceholder"),"aria-describedby":P+"-count "+P+"-feedback",onChange:_=>{o?.("save-voice-prompt"),u(_.target.value),b("")}}),(0,c.jsxs)("div",{id:P+"-count",className:h.voicePromptCount,children:[l.length.toLocaleString("en-US")," / 32,768"]}),(0,c.jsxs)("div",{className:h.voicePromptActions,children:[(0,c.jsxs)("div",{className:h.actions,children:[(0,c.jsx)(q.Button,{variant:"primary",disabled:T||!B||!$,onClick:()=>{W()},children:r(p?"voicePromptSaving":"voicePromptSave")}),(0,c.jsx)(q.Button,{variant:"outline",disabled:T||l===d,onClick:()=>{u(d),b(""),i?.("save-voice-prompt")},children:r("voicePromptCancel")})]}),(0,c.jsx)("span",{className:h.hint,children:r("voicePromptStopToEdit")})]}),(0,c.jsx)("p",{id:P+"-feedback",role:"status",className:h.hint,children:f||(l.length>32768?r("voicePromptTooLong"):a?.customSupported===!1||z?r("voicePromptUnsupported"):B?r("voicePromptUnsaved"):"")})]})}var bw=Object.freeze({version:1,available:!1,reason:"planned"}),Lt=["audio","interaction","prompt","models","advanced","sessions","pets"],hg={audio:"\u9009\u62E9\u9EA6\u514B\u98CE\u3001\u8BF4\u8BDD\u65B9\u5F0F\u4E0E\u63D0\u793A\u97F3\u3002",interaction:"\u8BBE\u7F6E\u6309\u952E\u3001\u56DE\u7B54\u901F\u5EA6\u4E0E\u754C\u9762\u52A8\u753B\u3002",prompt:"\u8BBE\u7F6E\u8BED\u97F3\u5BF9\u8BDD\u7684\u8868\u8FBE\u65B9\u5F0F\u3002",models:"\u9009\u62E9\u6717\u8BFB\u65B9\u5F0F\uFF0C\u6216\u7BA1\u7406\u672C\u5730\u6A21\u578B\u3002",advanced:"\u67E5\u770B\u6743\u9650\u3001\u8BF7\u6C42\u4E0E\u8FD0\u884C\u8BE6\u60C5\u3002",sessions:"\u9009\u62E9\u8BED\u97F3\u5BF9\u8BDD\u76EE\u6807\uFF0C\u67E5\u770B\u9C7C\u5E94\u4F1A\u8BDD\u548C\u5B50\u4EE3\u7406\u3002",pets:"\u684C\u5BA0\u529F\u80FD\u5C1A\u672A\u5F00\u653E\u3002"};function gg(e){let{t:n,sessionId:t}=e,o=e.useWhaleUi(W=>W),i=e.useWhalePreferences(W=>W),r=o.settingsTab||"audio",s=o.settingsModelTab||"conversation",[a,d]=(0,D.useState)(()=>new Set([o.settingsTab||"audio"])),[l,u]=(0,D.useState)(()=>new Set([o.settingsModelTab||"conversation"])),[p,m]=(0,D.useState)(0),f=(0,D.useRef)(null),b=(0,D.useRef)(null),v=(0,D.useRef)(0),w=(0,D.useRef)(new Set),k=(0,D.useRef)(o.readRefresh),P=(0,D.useId)();(0,D.useLayoutEffect)(()=>{f.current&&(f.current.scrollTop=0)},[r,s]),(0,D.useEffect)(()=>{e.setSession?.(t)},[t]),(0,D.useEffect)(()=>()=>{v.current++,e.cancelPreview?.(),e.discardDiagnostics?.()},[]),(0,D.useEffect)(()=>{w.current.clear()},[t,r,s]),(0,D.useEffect)(()=>{r==="models"&&e.refreshModelCompute?.(t)},[t,r,s]),(0,D.useEffect)(()=>{if(o.busy||o.ttsCancelling||["pets","sessions"].includes(r))return;let W=e.readState?.();if(W?.busy||W?.ttsCancelling)return;if(k.current!==o.readRefresh){k.current=o.readRefresh;for(let S of["read-output-volume","model-installer","agent-requests"])w.current.delete(S)}let N=[...!o.settings||o.settingsFor!==t?["read-settings"]:[],...!o.status||o.checkedFor!==t||r==="advanced"?["status"]:[],...r==="audio"?["read-output-volume"]:[],...r==="models"&&s==="conversation"?["conversation-models"]:[],...t&&r==="advanced"?["agent-requests"]:[],...t&&r==="interaction"&&o.performanceFor!==t?["inspect-performance"]:[],...r==="models"&&s==="voice"&&(!o.ttsCapabilities||o.ttsCapabilitiesFor!==t)?["inspect-tts"]:[],...r==="models"?["model-installer"]:[]].find(S=>!w.current.has(S));N&&(w.current.add(N),e.run(t,N,{},!0))},[t,r,s,o.readRefresh,o.busy,o.ttsCancelling,o.settingsFor,o.checkedFor,o.outputVolumeFor,o.agentRequestsFor,o.performanceFor,o.ttsCapabilitiesFor,o.installerFor]);let M=async(W,_=!1)=>{let C=++v.current;e.cancelPreview&&!await e.cancelPreview()||(e.discardDiagnostics?.(),C===v.current&&(d(N=>new Set([...N,W])),e.setSettingsTab(W),_&&b.current?.querySelector(`[data-settings-tab="${W}"]`)?.focus({preventScroll:!0})))},B=async W=>{let _=++v.current;e.cancelPreview&&!await e.cancelPreview()||(e.discardDiagnostics?.(),_===v.current&&(u(C=>new Set([...C,W])),e.setSettingsModelTab(W)))},E=o.settingsFor===t?o.settings:null,T=!o.uncertain&&o.checkedFor===t,z=T&&o.status?.enabled&&(r==="interaction"||r==="models"&&s==="download"),$=E&&(0,c.jsx)(ag,{settings:E,sessionId:t,busy:o.busy||o.visibilityUncertain||o.settingsConflict,run:e.run,t:n,status:o.status,statusFresh:T,verified:T&&!!o.status,tab:r,markSettingsEdited:e.markSettingsEdited,discardSettingsDraft:e.discardSettingsDraft,bindingError:o.bindingError,captureBindings:e.captureBindings},t+":"+(o.settingsKey??E.revision));return(0,c.jsxs)("div",{className:h.settings,"data-whale-settings":!0,"data-motion":i.motion,children:[(0,c.jsxs)("header",{className:h.settingsHeader,"data-settings-header":!0,children:[(0,c.jsxs)(q.Button,{className:h.backButton,"data-whale-operation":"page-home",onClick:e.showHome,"aria-label":"\u8FD4\u56DE\u8BED\u97F3",children:[(0,c.jsx)(Ke,{name:"chevron",className:h.backIcon}),(0,c.jsx)("span",{children:"\u8FD4\u56DE\u8BED\u97F3"})]}),(0,c.jsxs)("div",{className:h.settingsBrand,children:[(0,c.jsx)(at,{small:!0}),(0,c.jsx)("h2",{children:n("settingsTitle")})]}),(0,c.jsx)(q.Button,{className:h.guideButton,"data-whale-operation":"page-setup",onClick:e.openSetup,"aria-label":"\u91CD\u65B0\u6253\u5F00\u914D\u7F6E\u5F15\u5BFC",title:"\u91CD\u65B0\u6253\u5F00\u914D\u7F6E\u5F15\u5BFC",children:"\u914D\u7F6E\u5F15\u5BFC"})]}),(0,c.jsxs)("div",{className:h.settingsLayout,children:[(0,c.jsx)("nav",{ref:b,className:h.settingsNav,"data-settings-nav":!0,"aria-label":n("settingsSections"),onKeyDown:W=>{let _=Lt.indexOf(W.target.dataset.settingsTab);if(_<0||!["ArrowDown","ArrowUp","ArrowLeft","ArrowRight","Home","End"].includes(W.key))return;W.preventDefault();let C=W.key==="Home"?0:W.key==="End"?Lt.length-1:(_+(["ArrowDown","ArrowRight"].includes(W.key)?1:-1)+Lt.length)%Lt.length;M(Lt[C],!0)},children:Lt.map(W=>(0,c.jsx)(q.Button,{"data-settings-tab":W,"aria-pressed":r===W,"aria-controls":P+"-body",onClick:()=>{M(W)},children:n("tab_"+W)},W))}),(0,c.jsxs)("div",{className:h.settingsPage,children:[(0,c.jsxs)("div",{className:`${h.pageHeading} ${r==="models"?h.modelHeading:""}`,"data-settings-page-heading":!0,"data-no-drag":!0,children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("h3",{id:P,children:n("tab_"+r)}),r!=="models"&&(0,c.jsx)("p",{children:hg[r]})]}),r==="prompt"&&E&&(0,c.jsx)("span",{className:h.voicePromptMode,"data-voice-prompt-mode":!0,children:n(E.voicePrompt?.mode==="custom"&&E.voicePrompt?.customSupported===!0?"voicePromptCustom":"voicePromptAgents")}),r==="models"&&(0,c.jsx)("nav",{className:h.modelNav,"aria-label":"\u6A21\u578B\u8BBE\u7F6E\u5206\u7C7B","data-no-drag":!0,children:[["conversation","\u5BF9\u8BDD\u6A21\u578B"],["voice","\u6717\u8BFB\u65B9\u5F0F"],["download","\u6A21\u578B\u4E0B\u8F7D"],["paths","\u9AD8\u7EA7\u8DEF\u5F84"]].map(([W,_])=>(0,c.jsx)(q.Button,{"aria-pressed":s===W,onClick:()=>{B(W)},children:_},W))})]}),(0,c.jsxs)("div",{ref:f,id:P+"-body",className:h.settingsBody,"data-settings-body":!0,"data-no-drag":!0,onChangeCapture:W=>{let _=W.target.closest("[data-settings-draft]");_&&!W.target.closest("[data-no-settings-draft]")&&e.markSettingsEdited?.(_.dataset.settingsDraft)},tabIndex:0,"aria-label":n("settingsContent"),children:[r==="sessions"?(0,c.jsxs)(c.Fragment,{children:[e.listExistingVoiceSessions&&!o.sessionManagementRoot&&(0,c.jsx)(Fi,{...e,state:o}),(0,c.jsx)(bg,{...e,state:o})]}):r==="pets"?(0,c.jsxs)("section",{className:h.placeholder,"data-whale-pet":!0,"aria-label":n("tab_pets"),children:[(0,c.jsx)(Ke,{name:"pet"}),(0,c.jsx)("h3",{children:n("tab_pets")}),(0,c.jsx)("p",{children:n("planned")})]}):(0,c.jsxs)(c.Fragment,{children:[o.error&&(0,c.jsx)("div",{role:"alert",className:h.error,children:n("operationUnavailable")}),o.settingsConflict&&(0,c.jsxs)("p",{role:"status",className:h.notice,children:["\u8BBE\u7F6E\u5DF2\u5728\u522B\u5904\u66F4\u65B0\uFF0C\u5F53\u524D\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002",(0,c.jsx)(q.Button,{variant:"outline",disabled:o.busy,onClick:()=>e.discardSettingsDraft?.(),children:"\u653E\u5F03\u8349\u7A3F\u5E76\u4F7F\u7528\u6700\u65B0\u8BBE\u7F6E"})]}),o.visibilityUncertain&&(0,c.jsx)("p",{role:"status",className:h.notice,children:n("configurationUnknown")}),!z&&(0,c.jsx)(Sr,{state:o,sessionId:t,run:e.run,refresh:e.refresh,canStopTts:r!=="models"||s!=="voice",t:n})]}),(0,c.jsx)("div",{hidden:!["audio","interaction","advanced"].includes(r),children:$}),(r==="audio"||a.has("audio"))&&(0,c.jsx)("div",{hidden:r!=="audio",children:(0,c.jsx)(pg,{...e,state:o})}),(r==="interaction"||a.has("interaction"))&&(0,c.jsxs)("div",{hidden:r!=="interaction",children:[E&&(0,c.jsx)(dg,{...e,state:o},"performance:"+t+":"+(o.settingsKey??E.revision)),(0,c.jsxs)("section",{className:h.section,children:[(0,c.jsx)("h3",{children:n("motionTitle")}),(0,c.jsx)("div",{className:h.segmented,children:["spring","firm","off"].map(W=>(0,c.jsx)(q.Button,{"aria-pressed":i.motion===W,onClick:()=>{e.setMotion(W),m(p+1)},children:n("motion_"+W)},W))}),(0,c.jsx)("div",{className:h.motionPreview,"aria-hidden":"true",children:(0,c.jsx)(at,{small:!0})},p),(0,c.jsx)("p",{className:h.hint,children:n("motionHint")}),i.error&&(0,c.jsx)("p",{role:"status",children:n("motionNotSaved")})]})]}),(r==="prompt"||a.has("prompt"))&&E&&(0,c.jsx)("div",{hidden:r!=="prompt",children:(0,c.jsx)(mg,{...e,state:o},"prompt:"+t+":"+(o.settingsKey??E.revision))}),(r==="models"||a.has("models"))&&(0,c.jsxs)("div",{hidden:r!=="models",children:[E&&(s==="conversation"||l.has("conversation"))&&(0,c.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="conversation",children:(0,c.jsx)(fg,{...e,state:o},"conversation:"+t+":"+(o.settingsKey??E.revision))}),(s==="voice"||l.has("voice"))&&(0,c.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="voice",children:(0,c.jsx)(Dd,{pickPath:e.pickPath,state:o,sessionId:t,run:e.run,markSettingsEdited:e.markSettingsEdited,prepared:!0,active:r==="models"&&s==="voice"})}),(s==="download"||l.has("download"))&&(0,c.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="download",children:(0,c.jsx)(Fd,{state:o,sessionId:t,run:e.run})}),E?.modelSetup&&(0,c.jsx)(cg,{modelTab:s,markSettingsEdited:e.markSettingsEdited,pickPath:e.pickPath,senseVoiceAsrAction:e.senseVoiceAsrAction,active:r==="models",settings:E,sessionId:t,busy:o.busy||o.visibilityUncertain||o.settingsConflict,run:e.run,t:n},t+":"+(o.settingsKey??E.revision)),(s==="paths"||l.has("paths"))&&(0,c.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="paths",children:(0,c.jsx)(Ud,{state:o,sessionId:t,run:e.run,pickPath:e.pickPath,active:r==="models"&&s==="paths"})})]}),(r==="advanced"||a.has("advanced"))&&(0,c.jsxs)("div",{hidden:r!=="advanced",children:[e.updateAction&&(0,c.jsx)(Pd,{state:o,open:e.openUpdate,t:n}),(0,c.jsxs)("section",{className:h.section,"aria-label":n("projectInfoTitle"),children:[(0,c.jsx)("h3",{children:n("projectInfoTitle")}),(0,c.jsxs)("dl",{className:h.details,children:[(0,c.jsx)("dt",{children:n("projectAuthor")}),(0,c.jsx)("dd",{children:(0,c.jsx)("a",{href:Ui.url,target:"_blank",rel:"noreferrer noopener",children:Ui.name})}),(0,c.jsx)("dt",{children:n("projectRepository")}),(0,c.jsx)("dd",{children:(0,c.jsxs)("a",{href:zd,target:"_blank",rel:"noreferrer noopener",children:["Emikosama/",wr]})}),(0,c.jsx)("dt",{children:n("projectNpm")}),(0,c.jsx)("dd",{children:(0,c.jsx)("a",{href:`https://www.npmjs.com/package/${wr}`,target:"_blank",rel:"noreferrer noopener",children:wr})})]})]}),(0,c.jsx)(wg,{...e,state:o,active:r==="advanced"}),(0,c.jsx)(Ed,{readOperationLog:e.readOperationLog}),(0,c.jsx)(yg,{state:o,sessionId:t,t:n}),(0,c.jsxs)("details",{className:h.section,children:[(0,c.jsx)("summary",{children:"\u5BF9\u8BDD\u663E\u793A\u4E0E\u517C\u5BB9\u6027"}),E?.voiceSession&&(0,c.jsx)(lg,{settings:E,state:o,sessionId:t,run:e.run,t:n},"visibility:"+t+":"+(o.settingsKey??E.revision))]})]})]})]})]})]})}var vg=new Intl.DateTimeFormat("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"});function bg({manageSessions:e,openManagedSession:n,renameManagedSession:t,setSessionManagement:o,state:i}){let r=i.sessionManagementRoot??null,[s,a]=(0,D.useState)(null),[d,l]=(0,D.useState)(null),[u,p]=(0,D.useState)(!1),[m,f]=(0,D.useState)(null),[b,v]=(0,D.useState)(null),w=(0,D.useRef)(null),k=(0,D.useCallback)(async(N,{append:S=!1}={})=>{if(!e)return;w.current?.abort();let I=new AbortController;w.current=I,p(!0),f(null);try{N.operation!=="list"&&(await e(N,I.signal),I.signal.aborted||f(N.operation==="restore"?"\u5DF2\u53D6\u6D88\u5F52\u6863\u3002\u53EF\u6253\u5F00\u539F\u4F1A\u8BDD\u7EE7\u7EED\u3002":"\u5DF2\u516C\u5F00\u6B64\u4F1A\u8BDD\u3002"));let F=await e(N.operation==="list"?N:{operation:"list",...r?{rootId:r}:{}},I.signal);if(I.signal.aborted||w.current!==I)return;a(L=>S&&L?{...F,items:[...new Map([...L.items,...F.items].map(Z=>[Z.id,Z])).values()]}:F)}catch(F){I.signal.aborted||f(String(F?.message??"\u65E0\u6CD5\u8BFB\u53D6\u9C7C\u5E94\u4F1A\u8BDD").slice(0,400))}finally{w.current===I&&(w.current=null,p(!1))}},[r,e]);(0,D.useEffect)(()=>(k({operation:"list",...r?{rootId:r}:{}}),()=>{let N=w.current;w.current=null,N?.abort()}),[k,r]);let P=N=>{a(null),l(null),v(null),o({rootId:N,historyOpen:!1})},M=(N,S)=>{v(null),l({operation:N,id:S.id,rootId:S.rootId})},B=async N=>{try{await n(N)}catch(S){f(String(S?.message??"\u65E0\u6CD5\u5728 DSH \u6253\u5F00\u4F1A\u8BDD").slice(0,400))}},E=async N=>{N.preventDefault();let S=b.title.trim();if(!(!S||u)){p(!0),f(null);try{let I=await t(b.id,S);a(F=>F&&{...F,items:F.items.map(L=>L.id===b.id?{...L,title:I}:L)}),v(null),f("\u5DF2\u4FDD\u5B58\u4F1A\u8BDD\u540D\u79F0\u3002")}catch(I){f(String(I?.message??"\u65E0\u6CD5\u91CD\u547D\u540D\u4F1A\u8BDD").slice(0,400))}finally{p(!1)}}},T=r?s?.items?.find(N=>N.id===r):null,z={restore_unavailable:"\u6062\u590D\u63A5\u53E3\u4E0D\u53EF\u7528",archive_state_unavailable:"\u65E0\u6CD5\u8BFB\u53D6\u5F52\u6863\u72B6\u6001",persistence_unavailable:"\u4F1A\u8BDD\u5B58\u50A8\u6682\u65F6\u4E0D\u53EF\u7528",policy_mismatch:"\u5F53\u524D\u4F1A\u8BDD\u6743\u9650\u4E0E\u539F\u4F1A\u8BDD\u4E0D\u540C",presentation_mismatch:"\u5F53\u524D DSH \u65E0\u6CD5\u786E\u8BA4\u4F1A\u8BDD\u7684\u9690\u85CF\u72B6\u6001",visibility_mismatch:"\u5F53\u524D\u663E\u793A\u8BBE\u7F6E\u4E0E\u539F\u4F1A\u8BDD\u4E0D\u540C"},$=N=>(0,c.jsx)("ul",{className:h.permissionList,children:N.map(S=>(0,c.jsxs)("li",{children:[(0,c.jsx)("strong",{className:h.sessionTitle,children:S.title||(S.kind==="root"?"\u672A\u547D\u540D\u4F1A\u8BDD":"\u672A\u547D\u540D\u5B50\u4EE3\u7406")+" \xB7 "+S.id.slice(-6).toUpperCase()}),(0,c.jsxs)("p",{className:h.hint,children:[S.archived?"\u5DF2\u5F52\u6863":S.visibility==="hidden"?"\u5DF2\u9690\u85CF":S.visibility==="visible"||S.visibility==="workspace"?"\u53EF\u89C1":"\u53EF\u89C1\u6027\u672A\u77E5",z[S.reason]?" \xB7 "+z[S.reason]:""]}),Number.isFinite(S.createdAt)&&(0,c.jsxs)("p",{className:h.hint,children:["\u521B\u5EFA\u4E8E ",(0,c.jsx)("time",{dateTime:new Date(S.createdAt).toISOString(),children:vg.format(S.createdAt)})]}),(0,c.jsxs)("div",{className:h.actions,children:[S.kind==="root"&&!r&&(0,c.jsx)(q.Button,{variant:"outline",disabled:u,"data-whale-operation":"show-subagents",onClick:()=>P(S.id),children:"\u67E5\u770B\u5B50\u4EE3\u7406"}),n&&["live","available"].includes(S.status)&&(0,c.jsx)(q.Button,{variant:"outline","data-whale-operation":S.kind==="root"?"open-native-session":"open-native-subagent",onClick:()=>B(S),children:"\u5728 DSH \u6253\u5F00"}),t&&S.kind==="root"&&["live","available","archived"].includes(S.status)&&(0,c.jsx)(q.Button,{variant:"outline",disabled:u,onClick:()=>{l(null),v({id:S.id,title:S.title??""})},children:"\u91CD\u547D\u540D"}),S.canUnhide&&(0,c.jsx)(q.Button,{variant:"outline",disabled:u,onClick:()=>M("unhide",S),children:"\u53D6\u6D88\u9690\u85CF"}),S.canRestore&&(0,c.jsx)(q.Button,{variant:"outline",disabled:u,onClick:()=>M("restore",S),children:"\u6062\u590D\u5F52\u6863"})]}),d?.id===S.id&&(0,c.jsxs)("div",{className:h.actions,children:[(0,c.jsx)("span",{children:d.operation==="unhide"?"\u786E\u8BA4\u5728 DSH \u516C\u5F00\u6B64\u4F1A\u8BDD\uFF1F":"\u786E\u8BA4\u53D6\u6D88\u6B64\u4F1A\u8BDD\u7684\u5F52\u6863\uFF1F"}),(0,c.jsx)(q.Button,{variant:"primary",disabled:u,onClick:()=>{let I=d;l(null),k(I)},children:"\u786E\u8BA4"}),(0,c.jsx)(q.Button,{variant:"outline",onClick:()=>l(null),children:"\u53D6\u6D88"})]}),b?.id===S.id&&(0,c.jsxs)("form",{className:h.sessionRename,onSubmit:E,children:[(0,c.jsx)(q.Input,{"aria-label":"\u4F1A\u8BDD\u540D\u79F0",value:b.title,maxLength:128,disabled:u,onChange:I=>v({...b,title:I.target.value})}),(0,c.jsxs)("div",{className:h.actions,children:[(0,c.jsx)(q.Button,{type:"submit",variant:"primary",disabled:u||!b.title.trim(),children:"\u4FDD\u5B58\u540D\u79F0"}),(0,c.jsx)(q.Button,{type:"button",variant:"outline",disabled:u,onClick:()=>v(null),children:"\u53D6\u6D88"})]})]})]},S.id))}),W=(s?.items??[]).filter(N=>N.id!==r),_=W.filter(N=>N.active),C=W.filter(N=>!N.active).sort((N,S)=>(S.createdAt??-1)-(N.createdAt??-1));return(0,c.jsxs)("section",{className:h.section,"data-whale-session-management":!0,children:[r&&(0,c.jsx)(q.Button,{variant:"outline",disabled:u,"data-whale-operation":"show-main-sessions",onClick:()=>P(null),children:"\u8FD4\u56DE\u4E3B\u4F1A\u8BDD"}),u&&!s&&(0,c.jsx)("p",{role:"status",children:"\u6B63\u5728\u8BFB\u53D6\u9C7C\u5E94\u4F1A\u8BDD\u2026"}),m&&(0,c.jsx)("p",{role:"status",className:h.notice,children:m}),T&&$([T]),T?.childrenAvailable&&T?.childrenIncomplete&&(0,c.jsx)("p",{role:"status",children:"\u90E8\u5206\u5B50\u4EE3\u7406\u8BB0\u5F55\u6682\u65F6\u65E0\u6CD5\u6838\u9A8C\u3002\u5F53\u524D\u663E\u793A\u5DF2\u6838\u9A8C\u7684\u4F1A\u8BDD\u3002"}),T&&!T.childrenAvailable&&(0,c.jsx)("p",{role:"status",children:"\u5F53\u524D\u65E0\u6CD5\u8BFB\u53D6\u6B64\u4F1A\u8BDD\u7684\u5B50\u4EE3\u7406\u8BB0\u5F55\u3002"}),T?.childrenAvailable&&!T.childrenIncomplete&&!W.length&&(0,c.jsx)("p",{children:"\u6B64\u4F1A\u8BDD\u8FD8\u6CA1\u6709\u5B50\u4EE3\u7406\u3002"}),_.length>0&&$(_),s&&!r&&_.length===0&&(0,c.jsx)("p",{className:h.hint,children:"\u6682\u65E0\u6D3B\u8DC3\u4F1A\u8BDD\u3002"}),(C.length>0||s?.nextCursor)&&(0,c.jsxs)("details",{className:h.section,"data-whale-session-history":!0,open:i.sessionHistoryOpen===!0,onToggle:N=>{let{open:S}=N.currentTarget;S!==!!i.sessionHistoryOpen&&o({historyOpen:S})},children:[(0,c.jsx)("summary",{"data-whale-operation":r?"subagent-history":"session-history",children:r?"\u5386\u53F2\u5B50\u4EE3\u7406":"\u5386\u53F2\u4F1A\u8BDD"}),$(C),!!s?.nextCursor&&(0,c.jsx)(q.Button,{disabled:u,onClick:()=>{k({operation:"list",cursor:s.nextCursor},{append:!0})},children:"\u52A0\u8F7D\u66F4\u591A"})]}),(0,c.jsx)(q.Button,{variant:"outline",disabled:u,onClick:()=>{k({operation:"list",...r?{rootId:r}:{}})},children:"\u5237\u65B0\u4F1A\u8BDD"}),s?.capabilities?.unhide?.supported===!1&&(0,c.jsx)("p",{className:h.hint,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u65F6\u65E0\u6CD5\u628A\u5B50\u4EE3\u7406\u52A0\u5165\u4FA7\u8FB9\u680F\u3002"}),s?.capabilities?.restore?.supported===!1&&(0,c.jsx)("p",{className:h.hint,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u65F6\u65E0\u6CD5\u901A\u8FC7\u9C7C\u5E94\u53D6\u6D88\u5F52\u6863\u3002"})]})}function yg({state:e,sessionId:n,t}){let o=e.status,i=o?.ownerSessionId,s=!e.uncertain&&e.checkedFor===n&&typeof o?.helper?.lastError=="string"?o.helper.lastError:null,a=e.error??e.enableError;return(0,c.jsxs)("details",{className:h.section,children:[(0,c.jsx)("summary",{children:t("details")}),(0,c.jsxs)("dl",{className:h.details,children:[(0,c.jsx)("dt",{children:t("source")}),(0,c.jsx)("dd",{"data-whale-owner":!0,"data-session-id":i??"",children:i||t("none")}),(0,c.jsx)("dt",{children:t("actor")}),(0,c.jsx)("dd",{"data-whale-actor":!0,"data-session-id":n??"",children:n||t("openSession")})]}),(0,c.jsx)("p",{className:h.hint,children:t("snapshot")}),a&&(0,c.jsx)("pre",{className:h.requestDetails,children:a}),s&&(0,c.jsxs)("div",{"data-whale-helper-error":!0,children:[(0,c.jsx)("strong",{children:t("inputDiagnosticTitle")}),(0,c.jsx)("pre",{className:h.requestDetails,children:s}),(0,c.jsx)("p",{className:h.hint,children:t("inputDiagnosticHistory")})]}),(0,c.jsx)("p",{className:h.hint,children:t("consequence")}),(0,c.jsx)("p",{className:h.hint,children:o?.helper?.online?t("helperOnline"):t("helperOffline")}),o?.turnSignals?.outputStartObservation?.status==="unsupported"&&(0,c.jsx)("p",{className:h.hint,children:t("outputObservationUnavailable")})]})}function wg({state:e,sessionId:n,run:t,openAuthorization:o,active:i=!0}){let r=(0,D.useRef)(null),s=(0,D.useRef)(0);(0,D.useEffect)(()=>{r.current=null,s.current++},[i,n]),(0,D.useEffect)(()=>{if(!i||!n||e.busy||e.agentRequestsFor===n||r.current===n)return;r.current=n;let d=s.current;s.current===d&&t(n,"agent-requests")},[i,n,e.busy]);let a=e.agentRequestsFor===n?e.agentRequests:null;return(0,c.jsxs)("section",{className:h.section,"data-whale-agent-requests":!0,children:[(0,c.jsx)("h3",{children:"Agent \u64CD\u4F5C\u8BB0\u5F55"}),(0,c.jsx)(q.Button,{"data-whale-operation":"page-authorization",onClick:()=>{o?.()},children:"\u6388\u6743\u8303\u56F4\u4E0E\u64A4\u9500"}),(e.agentPermissionUncertain||e.agentRequestUncertain)&&(0,c.jsx)("p",{role:"alert",className:h.notice,children:"\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u4F1A\u81EA\u52A8\u6838\u67E5\u5BF9\u5E94\u6743\u9650\u548C\u8BF7\u6C42\u72B6\u6001\uFF0C\u4E0D\u4F1A\u91CD\u590D\u6267\u884C\u3002"}),a?.items?.length===0&&(0,c.jsx)("p",{className:h.hint,children:"\u6CA1\u6709\u5F85\u5904\u7406\u8BF7\u6C42\u3002"}),a?.items?.map(d=>(0,c.jsxs)("section",{className:h.section,"data-agent-request":d.id,children:[(0,c.jsxs)("strong",{children:[d.title," \xB7 ",d.state]}),(0,c.jsxs)("p",{className:h.hint,children:["\u53D1\u8D77\u4F1A\u8BDD\uFF1A",d.sourceSessionId]}),(0,c.jsxs)("details",{children:[(0,c.jsx)("summary",{children:"\u6838\u5BF9\u5B8C\u6574\u53D8\u66F4\u8BA1\u5212"}),(0,c.jsx)("pre",{className:h.requestDetails,children:JSON.stringify({\u5F53\u524D\u8BBE\u7F6E:d.before,\u8BF7\u6C42:d.request,...d.installPlan?{\u4E0B\u8F7D\u8BA1\u5212:d.installPlan}:{},...d.modelApplyTarget?{\u6A21\u578B\u5E94\u7528\u76EE\u6807:d.modelApplyTarget}:{}},null,2)})]}),d.error&&(0,c.jsx)("p",{role:"alert",className:h.error,children:d.error.message}),d.state==="pending"&&(0,c.jsx)(q.Button,{variant:"outline",disabled:e.busy||e.agentRequestUncertain,onClick:()=>{t(n,"decide-agent-request",{id:d.id,approve:!1,acknowledgements:[]})},children:"\u53D6\u6D88\u9884\u89C8"}),d.nextAction&&(0,c.jsx)("p",{className:h.hint,children:d.nextAction})]},d.id))]})}var tp={startConversation:"\u5F00\u59CB\u5BF9\u8BDD",endConversation:"\u7ED3\u675F\u5BF9\u8BDD",voiceTarget:"\u6295\u9012\u5230",dedicatedVoiceTarget:"\u9C7C\u5E94\u4E13\u7528\u4F1A\u8BDD",checkingVoiceTarget:"\u6B63\u5728\u6838\u5BF9\u76EE\u6807\u2026",voiceTargetChanged:"\u8BED\u97F3\u6295\u9012\u76EE\u6807\u6709\u53D8\u5316\u3002\u8BF7\u6838\u5BF9\u9996\u9875\u7684\u4F1A\u8BDD\u540E\u518D\u5F00\u59CB\u3002",chooseCurrentDshTarget:"\u4F7F\u7528\u5F53\u524D\u6253\u5F00\u4F1A\u8BDD",backToFishVoice:"\u56DE\u5230\u9C7C\u5E94",currentDshTargetError:"\u65E0\u6CD5\u786E\u8BA4\u5F53\u524D DSH \u5BF9\u8BDD\uFF0C\u8BF7\u6838\u5BF9\u540E\u91CD\u8BD5\u3002",chooseVoiceTarget:"\u9009\u62E9\u6295\u9012\u4F1A\u8BDD",searchVoiceTargets:"\u641C\u7D22\u4F1A\u8BDD\u6807\u9898\u6216 ID",searchVoiceTargetsAction:"\u641C\u7D22",existingVoiceTargetList:"\u5DF2\u6709 DSH \u4F1A\u8BDD",boundVoiceTarget:"\u5F53\u524D\u7ED1\u5B9A",voiceTargetAvailability_ready:"\u53EF\u7528",voiceTargetAvailability_busy:"\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F",voiceTargetAvailability_archived:"\u4F1A\u8BDD\u5DF2\u5F52\u6863",voiceTargetAvailability_unavailable:"\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528",voiceTargetAvailability_managed:"\u9C7C\u5E94\u7BA1\u7406\u7684\u4F1A\u8BDD\uFF0C\u65E0\u6CD5\u76F4\u63A5\u6295\u9012",voiceTargetAvailability_subagent:"\u5B50\u4EE3\u7406\u4F1A\u8BDD\uFF0C\u65E0\u6CD5\u76F4\u63A5\u6295\u9012",voiceTargetNoMatch:"\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684\u4F1A\u8BDD\u3002",voiceTargetEmptyList:"\u6682\u65E0\u53EF\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u3002",voiceTargetSynthesisNotice:"\u4F7F\u7528\u5728\u7EBF\u97F3\u8272\u65F6\uFF0C\u56DE\u7B54\u6587\u5B57\u4F1A\u4EA4\u7ED9\u5DF2\u6388\u6743\u7684\u8BED\u97F3\u5408\u6210\u670D\u52A1\u3002\u82E5\u8981\u79BB\u7EBF\u6717\u8BFB\uFF0C\u53EF\u5728\u300C\u6A21\u578B \u2192 \u6717\u8BFB\u65B9\u5F0F\u300D\u9009\u7528\u672C\u5730\u97F3\u8272\u3002",bindVoiceTarget:"\u7ED1\u5B9A\u9009\u4E2D\u4F1A\u8BDD",savingVoiceTarget:"\u6B63\u5728\u4FDD\u5B58\u2026",moreVoiceTargets:"\u52A0\u8F7D\u66F4\u591A",loadingVoiceTargets:"\u6B63\u5728\u8BFB\u53D6 DSH \u4F1A\u8BDD\u2026",voiceTargetListError:"\u65E0\u6CD5\u8BFB\u53D6 DSH \u4F1A\u8BDD\u3002",retryVoiceTargets:"\u91CD\u8BD5\u8BFB\u53D6",voiceTranscriptCaptions:"\u8BED\u97F3\u5B57\u5E55",retryTranscript:"\u91CD\u53D1",transcriptDelivery_busy:"\u4F1A\u8BDD\u5FD9\uFF0C\u5F85\u53D1\u5230",transcriptDelivery_ready:"\u5F85\u91CD\u53D1\u5230",transcriptDelivery_sending:"\u6B63\u5728\u53D1\u5F80",transcriptDelivery_queued:"\u7B49\u5F85\u4F1A\u8BDD\u63A5\u6536",transcriptDelivery_delivered:"\u5DF2\u53D1\u5230",transcriptDelivery_uncertain:"\u6295\u9012\u5F85\u786E\u8BA4",transcriptDelivery_failed:"\u672A\u53D1\u5230",transcriptDelivery_discarded:"\u5F85\u53D1\u5DF2\u53D6\u6D88",endDiscardsRetries:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u6E05\u7A7A\u5F85\u53D1\u8F6C\u5199\u3002",modeSwitching:"\u6B63\u5728\u5207\u6362\u8BF4\u8BDD\u65B9\u5F0F\u2026",modeSaving:"\u6B63\u5728\u4FDD\u5B58\u8BF4\u8BDD\u65B9\u5F0F\u2026",modeSwitchUnconfirmed:"\u8BF4\u8BDD\u65B9\u5F0F\u66F4\u6539\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u6838\u67E5\u3002",modeSwitchFailed:"\u672A\u80FD\u786E\u8BA4\u66F4\u6539\uFF0C\u8BF7\u67E5\u770B\u5F53\u524D\u65B9\u5F0F\u540E\u518D\u8BD5\u3002",updateTitle:"\u9C7C\u5E94\u66F4\u65B0",updateOfferTitle:"\u9C7C\u5E94\u6709\u65B0\u7248\u672C",updateCurrentVersion:"\u5F53\u524D",updateNewVersion:"\u65B0\u7248",updateChannel_stable:"\u6B63\u5F0F\u7248",updateChannel_preview:"\u9884\u89C8\u7248",updateCheck:"\u68C0\u67E5\u66F4\u65B0",updateDetails:"\u67E5\u770B\u66F4\u65B0",updateLater:"\u7A0D\u540E",updateInstall:"\u4E00\u952E\u66F4\u65B0",updateRelease:"\u53D1\u5E03\u8BF4\u660E",updateFeedback:"\u53CD\u9988\u95EE\u9898",update_idle:"\u6B63\u5728\u8BFB\u53D6\u66F4\u65B0\u72B6\u6001\u2026",update_checking:"\u6B63\u5728\u68C0\u67E5\u66F4\u65B0\u2026",update_current:"\u5DF2\u662F\u6700\u65B0\u7248\u672C\u3002",update_available:"\u53EF\u4EE5\u66F4\u65B0\u3002",update_incompatible:"\u65B0\u7248\u4E0E\u5F53\u524D DSH \u73AF\u5883\u4E0D\u517C\u5BB9\u3002",update_installing:"\u6B63\u5728\u66F4\u65B0\uFF0C\u5BBF\u4E3B\u53EF\u80FD\u4F1A\u91CD\u65B0\u52A0\u8F7D\u9C7C\u5E94\u2026","update_restart-required":"\u66F4\u65B0\u5DF2\u5B89\u88C5\uFF0C\u91CD\u542F DSH \u540E\u751F\u6548\u3002","update_enable-required":"\u66F4\u65B0\u5DF2\u5B89\u88C5\uFF0C\u8BF7\u5728 DSH \u63D2\u4EF6\u7BA1\u7406\u4E2D\u542F\u7528\u9C7C\u5E94\u3002",update_installed:"\u66F4\u65B0\u5DF2\u5B8C\u6210\u3002",update_error:"\u66F4\u65B0\u51FA\u9519\uFF0C\u53EF\u68C0\u67E5\u66F4\u65B0\u540E\u91CD\u8BD5\u3002",update_unsupported:"\u5F53\u524D\u73AF\u5883\u65E0\u6CD5\u81EA\u52A8\u66F4\u65B0\uFF0C\u8BF7\u67E5\u770B\u5B98\u65B9\u53D1\u5E03\u8BF4\u660E\u3002",updateConnection:"\u6682\u65F6\u65E0\u6CD5\u786E\u8BA4\u66F4\u65B0\u72B6\u6001\uFF0C\u8BF7\u5728\u5BBF\u4E3B\u5C31\u7EEA\u540E\u91CD\u65B0\u68C0\u67E5\u3002",audioDevices:"\u97F3\u9891\u8BBE\u5907",audioSystemDefault:"\u7CFB\u7EDF\u9ED8\u8BA4",audioInput:"\u97F3\u9891\u8F93\u5165",audioOutput:"\u97F3\u9891\u8F93\u51FA",inputDeviceMissing:"\u9EA6\u514B\u98CE\u672A\u8FDE\u63A5\uFF0C\u5DF2\u4FDD\u7559\u9009\u62E9",outputDeviceMissing:"\u8F93\u51FA\u672A\u8FDE\u63A5\uFF0C\u4E0D\u4F1A\u5207\u5230\u5176\u4ED6\u8BBE\u5907",deviceDisconnected:"\u672A\u8FDE\u63A5",inputDeviceStopFirst:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5207\u6362\u8F93\u5165\u3002\u8F93\u51FA\u5728\u4E0B\u4E00\u6BB5\u64AD\u653E\u751F\u6548\u3002",outputDeviceUnsupported:"\u6B64\u73AF\u5883\u6682\u4E0D\u652F\u6301\u9009\u62E9\u6717\u8BFB\u8F93\u51FA\u8BBE\u5907\u3002",deviceListRetry:"\u8BBE\u5907\u5217\u8868\u6682\u4E0D\u53EF\u7528\uFF0C\u6253\u5F00\u4E0B\u62C9\u83DC\u5355\u53EF\u91CD\u8BD5\u3002",voiceHelperCleanupHint:"\u6B63\u5728\u786E\u8BA4\u9EA6\u514B\u98CE\u5DF2\u91CA\u653E\uFF0C\u786E\u8BA4\u524D\u4E0D\u4F1A\u5F00\u542F\u65B0\u7684\u5F55\u97F3\u3002",voiceHelperRestartHint:"\u9EA6\u514B\u98CE\u670D\u52A1\u9000\u51FA\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u91CD\u542F DSH \u540E\u518D\u70B9\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u3002",inputError_device:"\u9EA6\u514B\u98CE\u4E0D\u53EF\u7528",inputError_recognition:"\u8BED\u97F3\u8BC6\u522B\u5931\u8D25","inputError_no-speech":"\u6CA1\u542C\u6E05\uFF0C\u8BF7\u518D\u8BF4\u4E00\u6B21",inputHelp_device:"\u8BF7\u68C0\u67E5\u9EA6\u514B\u98CE\u8FDE\u63A5\u4E0E\u6743\u9650\u3002\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5728\u8BBE\u7F6E\u4E2D\u9009\u8BBE\u5907\u3002\u8BE6\u60C5\u89C1\u300C\u9AD8\u7EA7\u300D\u3002",inputDiagnosticTitle:"\u6700\u8FD1\u4E00\u6B21\u97F3\u9891\u9519\u8BEF",inputDiagnosticHistory:"\u8FD9\u662F\u6700\u8FD1\u4E00\u6B21\u8BB0\u5F55\uFF0C\u53EF\u80FD\u6765\u81EA\u4E4B\u524D\u7684\u5C1D\u8BD5\uFF1B\u4E0D\u4EE3\u8868\u5F53\u524D\u8BBE\u5907\u72B6\u6001\u3002",inputHelp_recognition:"\u8BF7\u91CD\u8BD5\u3002\u4ECD\u5931\u8D25\u65F6\uFF0C\u7ED3\u675F\u5BF9\u8BDD\u540E\u5728\u8BBE\u7F6E\u4E2D\u68C0\u67E5\u8BC6\u522B\u6A21\u578B\u3002","inputHelp_no-speech":"\u8BF7\u9760\u8FD1\u9EA6\u514B\u98CE\u91CD\u8BD5\uFF0C\u5E76\u68C0\u67E5\u662F\u5426\u9759\u97F3\u3002",speechFailed:"\u6717\u8BFB\u5931\u8D25",speechInterrupted:"\u6717\u8BFB\u5DF2\u4E2D\u65AD",wakeFallbackHint:"\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\u3002\u76EE\u524D\u6309\u8F6C\u5199\u5339\u914D\u3002\u5207\u6362\u6A21\u5F0F\u540E\u518D\u9009\u300C\u5524\u9192\u8BCD\u300D\u53EF\u91CD\u8BD5\u58F0\u97F3\u5339\u914D\u3002",wakeMode:"\u5524\u9192\u8BCD",switchToWake:"\u70B9\u6309\u5207\u5230\u5524\u9192\u8BCD\u6A21\u5F0F\uFF0C\u9EA6\u514B\u98CE\u5C06\u7B49\u5F85\u8BBE\u5B9A\u79F0\u547C",wakeDisabled:"\u5524\u9192\u76D1\u542C\u672A\u5F00\u542F",wakeStarting:"\u6B63\u5728\u542F\u52A8\u5524\u9192\u76D1\u542C\u2026",wakeWaiting:"\u7B49\u5F85\u5524\u9192\u8BCD",wakeListening:"\u6B63\u5728\u542C\u4E0B\u4E00\u53E5",wakePaused:"\u5524\u9192\u76D1\u542C\u5DF2\u6682\u505C",wakeError:"\u5524\u9192\u76D1\u542C\u4E0D\u53EF\u7528\uFF0C\u8BF7\u67E5\u770B\u8BBE\u7F6E",wakeHint:"\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\uFF0C\u518D\u8BF4\u6307\u4EE4\u3002\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u76D1\u542C\u3002",wakeMethod:"\u77ED\u53E5\u7ED3\u675F\u540E\u5728\u672C\u673A\u6BD4\u8F83\u79F0\u547C\u7684\u58F0\u97F3\u548C\u8F6C\u5199\u3002",wakeAliases:"\u5524\u9192\u79F0\u547C",wakeAliasesHint:"\u6700\u591A8\u4E2A\uFF0C\u9017\u53F7\u5206\u9694\uFF1B\u4E2D\u6587\u652F\u6301\u53E5\u9996\u8FD1\u97F3\uFF0C\u5EFA\u8BAE\u7528\u72EC\u7279\u76843\u5B57\u4EE5\u4E0A\u79F0\u547C\u3002",wakeTimeout:"\u5524\u9192\u540E\u7B49\u5F85\uFF08\u79D2\uFF09",wakeSettings:"\u5524\u9192\u8BCD\u8BBE\u7F6E",wakeStopToEdit:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u79F0\u547C\u548C\u7B49\u5F85\u65F6\u95F4\u3002",wakeInvalid:"\u8BF7\u586B1\u20138\u4E2A\u6709\u6548\u79F0\u547C\uFF0C\u7B49\u5F85\u65F6\u95F4\u4E3A3\u201330\u79D2\u3002",switchToPtt:"\u70B9\u6309\u5207\u56DE\u6309\u4F4F\u8BF4\u8BDD",switchToAlways:"\u70B9\u6309\u5207\u5230\u81EA\u7531\u9EA6\uFF0C\u9EA6\u514B\u98CE\u5C06\u6301\u7EED\u8046\u542C",quickSpeedStop:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5207\u6362\u901F\u5EA6",performanceReadFirst:"\u5148\u68C0\u67E5\u5F53\u524D\u6A21\u578B\u652F\u6301\u54EA\u4E9B\u901F\u5EA6\u3002",performanceUnavailable:"\u63D0\u4F9B\u5546\u5DF2\u660E\u786E\u62D2\u7EDD\u7070\u8272\u6863\u4F4D\u7684\u601D\u8003\u53C2\u6570\uFF1B\u5176\u4ED6\u6863\u4F4D\u4ECD\u53EF\u9009\u62E9\u3002",performanceProbeCost:"\u52A0\u8F7D\u65F6\u7528\u6700\u591A 3 \u4E2A\u56FA\u5B9A\u77ED\u8BF7\u6C42\u68C0\u6D4B\u6863\u4F4D\uFF0C\u6309\u6A21\u578B\u8BA1\u8D39\u3002",performanceProbeScope:"\u53EA\u6709\u63D0\u4F9B\u53EF\u68C0\u6D4B\u63A5\u53E3\u7684\u6A21\u578B\u8DEF\u7EBF\u4F1A\u53D1\u9001\u77ED\u8BF7\u6C42\uFF0C\u539F\u751F\u652F\u6301\u7684\u6863\u4F4D\u53EF\u76F4\u63A5\u67E5\u770B\u3002",performanceProbeUnknown:"\u90E8\u5206\u6863\u4F4D\u6682\u672A\u786E\u8BA4\u3002\u53EF\u68C0\u67E5\u7F51\u7EDC\u6216\u767B\u5F55\u540E\u91CD\u65B0\u68C0\u6D4B\u3002",performanceProbeAccepted:"\u6863\u4F4D\u8BF7\u6C42\u68C0\u6D4B\u901A\u8FC7\u3002",performanceProbePending:"\u6B63\u5728\u68C0\u67E5\u5F53\u524D\u6A21\u578B\u7684\u6863\u4F4D\u2026",holdToSpeak:"\u8BF4\u8BDD\u65F6\u6309\u4F4F",alwaysWarning:"\u81EA\u7531\u9EA6\u4F1A\u6301\u7EED\u542C\u53D6\u8BED\u97F3\u3002\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u76D1\u542C\u3002",bindingMissing:"\u672A\u7ED1\u5B9A\u8BF4\u8BDD\u6309\u952E\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u4E2D\u7ED1\u5B9A\uFF0C\u6216\u5207\u6362\u6301\u7EED\u8046\u542C\u3002",noSession:"\u8FD8\u6CA1\u6709\u6253\u5F00\u5BF9\u8BDD",otherWindow:"\u9EA6\u514B\u98CE\uFF1A\u53E6\u4E00\u4E2A\u7A97\u53E3",readingStatus:"\u6B63\u5728\u8BFB\u53D6\uFF0C\u4E0D\u4F1A\u542F\u52A8\u9EA6\u514B\u98CE\u6216\u6A21\u578B\u3002",statusRetry:"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u72B6\u6001\u3002\u8FD4\u56DE\u7A97\u53E3\u65F6\u4F1A\u81EA\u52A8\u6838\u67E5\u3002",retryStatus:"\u91CD\u65B0\u8BFB\u53D6\u72B6\u6001",collapseHint:"\u6536\u8D77\u540E\u4F1A\u7EE7\u7EED\u5BF9\u8BDD",stopConsequence:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u91CA\u653E\u9EA6\u514B\u98CE\u5E76\u505C\u6B62\u672C\u6B21\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u3002",transferTitle:"\u63A5\u7BA1\u53E6\u4E00\u4E2A\u7A97\u53E3\u7684\u9EA6\u514B\u98CE\uFF1F",transferWarning:"\u8FD9\u4F1A\u4E2D\u65AD\u53E6\u4E00\u4E2A\u7A97\u53E3\u7684\u8BED\u97F3\uFF0C\u5E76\u53EF\u80FD\u7ED3\u675F\u5B83\u7684\u540E\u53F0\u4EFB\u52A1\u3002",cancel:"\u53D6\u6D88",confirmTransfer:"\u786E\u8BA4\u63A5\u7BA1",bindingStopRequired:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u9F20\u6807\u6216\u952E\u76D8\u6309\u952E\u3002",bindingFinishing:"\u8BED\u97F3\u6B63\u5728\u505C\u6B62\uFF0C\u8BF7\u7A0D\u5019\u518D\u4FEE\u6539\u6309\u952E\u3002",headphonesRequired:"\u5148\u52FE\u9009\u201C\u6211\u5DF2\u4F7F\u7528\u8033\u673A\u201D\uFF0C\u624D\u80FD\u5F00\u542F\u81EA\u52A8\u6253\u65AD\u3002",deviceManualIndex:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u5E8F\u53F7",deviceManualName:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u540D\u79F0",deviceIndexInvalid:"\u8BBE\u5907\u5E8F\u53F7\u9700\u8981\u662F\u975E\u8D1F\u6574\u6570\u3002",deviceDefault:"\u4F7F\u7528\u7CFB\u7EDF\u9ED8\u8BA4\u9EA6\u514B\u98CE",deviceManual:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u540D\u79F0\u6216\u5E8F\u53F7",deviceSaved:"\u5DF2\u4FDD\u5B58\u7684\u8BBE\u5907",deviceEmpty:"\u97F3\u9891\u670D\u52A1\u6CA1\u6709\u627E\u5230\u9EA6\u514B\u98CE\u3002\u8BF7\u8FDE\u63A5\u8BBE\u5907\u5E76\u68C0\u67E5\u7CFB\u7EDF\u58F0\u97F3\u8BBE\u7F6E\u3002",deviceUnknown:"\u5F00\u59CB\u5BF9\u8BDD\u540E\u4F1A\u5217\u51FA\u68C0\u6D4B\u5230\u7684\u8BBE\u5907\u3002\u73B0\u5728\u53EF\u4F7F\u7528\u7CFB\u7EDF\u9ED8\u8BA4\uFF0C\u6216\u5728\u9AD8\u7EA7\u9009\u9879\u624B\u52A8\u586B\u5199\u3002",ttsBackend:"\u8BED\u97F3\u5408\u6210\u540E\u7AEF",ttsBackendHint:"\u58F0\u97F3\u7531\u5DF2\u5B89\u88C5\u7684 TTS \u540E\u7AEF\u63D0\u4F9B\uFF0C\u9700\u5728\u8BE5\u540E\u7AEF\u5B8C\u6210\u914D\u7F6E\u3002\u72EC\u7ACB\u97F3\u91CF\u4EC5\u5728\u9A8C\u8BC1\u652F\u6301\u65F6\u663E\u793A\u3002",ttsBackendPending:"\u66F4\u591A\u540E\u7AEF\u9009\u62E9\u6B63\u5728\u9002\u914D\uFF0C\u5F53\u524D\u4E0D\u4F1A\u81EA\u52A8\u63A5\u5165\u4E91\u670D\u52A1\u3002",voiceClone:"\u58F0\u97F3\u514B\u9686",voiceCloneAvailable:"Qwen \u652F\u6301\u672C\u5730\u53C2\u8003\u97F3\u8272\uFF0C\u53EF\u5728\u6717\u8BFB\u65B9\u5F0F\u7684\u97F3\u8272\u8BBE\u7F6E\u4E2D\u9009\u62E9 WAV\u3002",voiceClonePrivacy:"\u4EC5\u8BFB\u53D6\u4F60\u9009\u62E9\u4E14\u6709\u6743\u4F7F\u7528\u7684\u58F0\u97F3\u6837\u672C\uFF0C\u4E0D\u4E0A\u4F20\u3002",inputActive:"\u6B63\u5728\u63A5\u6536\u8BED\u97F3",modeUnknown:"\u542C\u53D6\u65B9\u5F0F\u672A\u77E5",voiceInputUnavailable:"\u5F55\u97F3\u6682\u4E0D\u53EF\u7528",voiceInputRecoveryHint:"\u8BED\u97F3\u670D\u52A1\u5DF2\u4E2D\u65AD\u3002\u8BF7\u7ED3\u675F\u5BF9\u8BDD\u540E\u91CD\u65B0\u5F00\u59CB\u3002",searchHistory:"\u641C\u7D22\u4F1A\u8BDD",searchScope:"\u641C\u7D22\u5DF2\u8F7D\u5165\u7684\u4F1A\u8BDD",noMatches:"\u6CA1\u6709\u5339\u914D\u7684\u4F1A\u8BDD",differentOwner:"\u9EA6\u514B\u98CE\u5728\u53E6\u4E00\u4E2A\u7A97\u53E3\u4F7F\u7528\u3002\u9700\u8981\u65F6\u53EF\u660E\u786E\u63A5\u7BA1\u3002",details:"\u8BCA\u65AD\u8BE6\u60C5",noReply:"\u8FD8\u6CA1\u6709\u5BF9\u8BDD",newChatCreated:"\u5DF2\u65B0\u5EFA\u4F1A\u8BDD",newChatActive:"\u65B0\u5EFA\u8BED\u97F3\u4F1A\u8BDD\u3002\u5F53\u524D\u4F1A\u8BDD\u7684\u540E\u53F0\u4EFB\u52A1\u4F1A\u505C\u6B62\uFF0C\u8BB0\u5F55\u4F1A\u4FDD\u7559\u3002",newChatOtherOwner:"\u8BF7\u5728\u5F53\u524D\u8BED\u97F3\u4F1A\u8BDD\u6216\u5F00\u542F\u9EA6\u514B\u98CE\u7684\u7A97\u53E3\u4E2D\u65B0\u5EFA\u3002",recentConversation:"\u5BF9\u8BDD",recentTenTurns:"\u6700\u8FD1 10 \u8F6E",allRecords:"\u5168\u90E8\u8BB0\u5F55",showAllRecords:"\u5C55\u5F00\u5168\u90E8",collapseToTen:"\u6536\u8D77\u81F3 10 \u8F6E",collapseConversation:"\u6536\u8D77\u5BF9\u8BDD",currentVoiceRecords:"\u5F53\u524D\u8BED\u97F3\u804A\u5929",historyTruncated:"\u5DF2\u5207\u6362\u663E\u793A\u533A\u95F4\uFF0C\u539F\u8BB0\u5F55\u4ECD\u4FDD\u7559",viewConversation:"\u67E5\u770B\u8BED\u97F3\u8BB0\u5F55",loadEarlier:"\u52A0\u8F7D\u66F4\u65E9\u8BB0\u5F55",readingHistory:"\u6B63\u5728\u8BFB\u53D6\u8BB0\u5F55\u2026",retryHistory:"\u8BFB\u53D6\u8BB0\u5F55\u5931\u8D25\uFF0C\u70B9\u51FB\u91CD\u8BD5",noConversation:"\u8FD8\u6CA1\u6709\u5BF9\u8BDD",newMessages:"\u6761\u65B0\u6D88\u606F",conversationMessages:"\u8BED\u97F3\u5BF9\u8BDD\u8BB0\u5F55",assistantName:"\u52A9\u624B\u79F0\u547C",renameAssistant:"\u70B9\u51FB\u6539\u540D\uFF0CEnter \u4FDD\u5B58\uFF0CEsc \u53D6\u6D88",compact_off:"\u672A\u5F00\u542F",compact_standby:"\u5F85\u673A",compact_listening:"\u8046\u542C\u4E2D",compact_pending:"\u5904\u7406\u4E2D",compact_unknown:"\u5F85\u68C0\u67E5",you:"\u4F60",assistant:"\u52A9\u624B",close:"\u5173\u95ED\u9762\u677F",keyboardBinding:"\u952E\u76D8\u6309\u4F4F\u8BF4\u8BDD",bindingOff:"\u672A\u7ED1\u5B9A",saveBindings:"\u4FDD\u5B58\u6309\u952E",discardBindings:"\u53D6\u6D88\u4FEE\u6539",bindingCapture:"\u6309\u4E0B\u8981\u7ED1\u5B9A\u7684\u952E\uFF08Esc \u53D6\u6D88\uFF09",clearBinding:"\u6E05\u9664\u7ED1\u5B9A",bindingUnsupported:"\u4E0D\u652F\u6301\u8BE5\u6309\u952E\u6216\u7CFB\u7EDF\u7EC4\u5408\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u3002",bindingGlobalHint:"Windows \u5168\u5C40\u5FEB\u6377\u952E\u3002\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5F55\u5165\uFF0C\u4FDD\u5B58\u540E\u4E0B\u6B21\u5F00\u59CB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002\u6309\u952E\u4E0D\u4F1A\u88AB\u62E6\u622A\uFF0C\u53EF\u80FD\u540C\u65F6\u89E6\u53D1\u5176\u4ED6\u5E94\u7528\u7684\u5FEB\u6377\u64CD\u4F5C\u3002",bindingUnavailable:"\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301\u5168\u5C40\u6309\u952E\u7ED1\u5B9A\u3002",bindingPrintableWarning:"\u5355\u72EC\u4F7F\u7528\u6587\u5B57\u3001\u6570\u5B57\u6216\u7A7A\u683C\u952E\u4F1A\u5728\u5176\u4ED6\u5E94\u7528\u8F93\u5165\u65F6\u89E6\u53D1\u6309\u952E\u8BF4\u8BDD\u3002",performanceTitle:"\u56DE\u7B54\u901F\u5EA6",performanceHint:"\u4E0B\u6B21\u5F00\u59CB\u9C7C\u5E94\u72EC\u7ACB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002\u7ED1\u5B9A\u539F\u4F1A\u8BDD\u65F6\uFF0C\u5728\u8BE5 DSH \u5BF9\u8BDD\u7684\u6A21\u578B\u83DC\u5355\u91CC\u8C03\u6574\u601D\u8003\u6863\u4F4D\u3002",inspectPerformance:"\u68C0\u67E5\u53EF\u7528\u901F\u5EA6",performance_fast:"\u5FEB",performanceNoThinking:"\u65E0\u601D\u8003",performanceRecommended:"[\u63A8\u8350]",performanceFastHint:"\u5FEB\u6863\u4F1A\u660E\u786E\u8BF7\u6C42\u5173\u95ED\u601D\u8003\u3002",performanceFastUnavailable:"\u5F53\u524D\u6A21\u578B\u8DEF\u7EBF\u65E0\u6CD5\u786E\u8BA4\u5173\u95ED\u601D\u8003\u3002\u53EF\u9009\u300C\u8DDF\u968F\u6A21\u578B\u300D\uFF0C\u6216\u5728\u6A21\u578B\u8BBE\u7F6E\u4E2D\u66F4\u6362\u652F\u6301\u65E0\u601D\u8003\u7684\u5BF9\u8BDD\u6A21\u578B\u3002",performanceHostUnavailable:"\u5F53\u524D\u6A21\u578B\u8DEF\u7EBF\u672A\u63D0\u4F9B\u90E8\u5206\u601D\u8003\u6863\u4F4D\u3002",performance_balanced:"\u6807\u51C6",performance_high:"\u4ED4\u7EC6",performance_compatibility:"\u8DDF\u968F\u6A21\u578B",performanceStopRequired:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u56DE\u7B54\u901F\u5EA6\u3002\u5F53\u524D\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u4F1A\u505C\u6B62\u3002",savePerformance:"\u4FDD\u5B58\u56DE\u7B54\u901F\u5EA6",outputVolume:"\u52A9\u624B\u8BED\u97F3\u97F3\u91CF",outputVolumeHint:"\u4EC5\u8C03\u6574\u5DF2\u5B89\u88C5\u7684 Windows dsh-speak \u540E\u7AEF\uFF0C\u4E0D\u4EE3\u8868\u5F53\u524D\u8BED\u97F3\u8DEF\u7531\u6B63\u5728\u4F7F\u7528\u5B83\uFF1B\u4E0D\u5F71\u54CD DSTuber\u3001\u7CFB\u7EDF\u603B\u97F3\u91CF\u6216\u63D0\u793A\u97F3\u3002\u4E0B\u4E00\u6BB5\u8F93\u51FA\u751F\u6548\u3002",readOutputVolume:"\u8BFB\u53D6\u8BED\u97F3\u97F3\u91CF",saveOutputVolume:"\u4FDD\u5B58\u8BED\u97F3\u97F3\u91CF",outputVolumeUnavailable:"\u5F53\u524D\u8BED\u97F3\u540E\u7AEF\u4E0D\u652F\u6301\u72EC\u7ACB\u97F3\u91CF\u8C03\u8282\u3002",outputVolumeUnknown:"\u97F3\u91CF\u4FDD\u5B58\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u4F1A\u81EA\u52A8\u6838\u67E5\uFF0C\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002",settingsTitle:"\u9C7C\u5E94\u8BBE\u7F6E",settingsSections:"\u8BBE\u7F6E\u5206\u7C7B",tab_audio:"\u97F3\u9891",tab_interaction:"\u4EA4\u4E92",tab_prompt:"\u63D0\u793A\u8BCD",voicePromptLabel:"\u81EA\u5B9A\u4E49\u63D0\u793A\u8BCD",voicePromptOptional:"\uFF08\u53EF\u9009\uFF09",voicePromptAgents:"\u8DDF\u968F AGENTS",voicePromptCustom:"\u5DF2\u9644\u52A0\u81EA\u5B9A\u4E49",voicePromptPlaceholder:`\u4F8B\u5982\uFF1A\u7528\u4E2D\u6587\u56DE\u590D\uFF0C\u5148\u8BF4\u7ED3\u8BBA\uFF0C\u8BED\u6C14\u81EA\u7136\u3002

\u5185\u5BB9\u4F1A\u9644\u52A0\u5728 AGENTS \u540E\u3002\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u8BBE\u7F6E\u3002`,voicePromptStopToEdit:"\u505C\u6B62\u8BED\u97F3\u540E\u53EF\u7F16\u8F91",voicePromptUnsupported:"\u5F53\u524D DSH \u6682\u4E0D\u652F\u6301\u81EA\u5B9A\u4E49\u63D0\u793A\u8BCD\u3002",voicePromptTooLong:"\u63D0\u793A\u8BCD\u4E0D\u80FD\u8D85\u8FC7 32,768 \u4E2A\u5B57\u7B26\u3002",voicePromptSaving:"\u4FDD\u5B58\u4E2D\u2026",voicePromptCancel:"\u53D6\u6D88\u4FEE\u6539",voicePromptSave:"\u4FDD\u5B58",voicePromptSaved:"\u5DF2\u4FDD\u5B58\uFF0C\u4E0B\u6B21\u5F00\u542F\u8BED\u97F3\u65F6\u751F\u6548\u3002",voicePromptSaveFailed:"\u4FDD\u5B58\u672A\u6210\u529F\uFF0C\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002",voicePromptUnsaved:"\u5C1A\u672A\u4FDD\u5B58",tab_models:"\u6A21\u578B",tab_advanced:"\u9AD8\u7EA7",projectInfoTitle:"\u5173\u4E8E\u9C7C\u5E94",projectAuthor:"\u4F5C\u8005",projectRepository:"\u5B98\u65B9\u4ED3\u5E93",projectNpm:"npm \u53D1\u5E03\u9875",tab_sessions:"\u4F1A\u8BDD\u7BA1\u7406",settingsContent:"\u8BBE\u7F6E\u5185\u5BB9",voiceCleanupPending:"\u6B63\u5728\u91CA\u653E\u65E7\u97F3\u9891\u670D\u52A1",voiceCleanupHint:"\u7B49\u5F85\u65E7\u4F1A\u8BDD\u548C\u5F55\u97F3\u9000\u51FA\uFF0C\u5B8C\u6210\u540E\u4F1A\u81EA\u52A8\u66F4\u65B0\u3002",voiceRestartPending:"\u9700\u8981\u91CD\u542F DSH",voiceRestartHint:"\u65E7\u7248\u97F3\u9891\u670D\u52A1\u7684\u9000\u51FA\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u91CD\u542F DSH \u540E\u518D\u70B9\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u3002\u5DF2\u4FDD\u5B58\u7684\u6388\u6743\u4E0D\u53D8\u3002",voiceRootRestartHint:"\u65E7\u8BED\u97F3\u4F1A\u8BDD\u7684\u505C\u6B62\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u9000\u51FA\u5E76\u91CD\u65B0\u6253\u5F00 DSH\u3002",voiceStopPending:"\u8BED\u97F3\u5C1A\u672A\u786E\u8BA4\u505C\u6B62",voiceStopHint:"\u8BF7\u91CD\u65B0\u8BFB\u53D6\u8BED\u97F3\u72B6\u6001\uFF0C\u786E\u8BA4\u505C\u6B62\u540E\u518D\u5F00\u59CB\u5BF9\u8BDD\u3002",voiceTargetOccupied:"\u4E0A\u6B21\u7684\u8BED\u97F3\u4F1A\u8BDD\u6B63\u5728 DSH \u4E2D\u6253\u5F00\u3002\u53EF\u4EE5\u65B0\u5EFA\u9C7C\u5E94\u4F1A\u8BDD\uFF0C\u6216\u9009\u62E9\u8981\u7EE7\u7EED\u7684 DSH \u5BF9\u8BDD\u3002",voiceRecoveryPending:"\u65E7\u8BED\u97F3\u4F1A\u8BDD\u5C1A\u672A\u9000\u51FA",voiceRecoveryCheck:"\u6838\u67E5\u5E76\u505C\u6B62",voiceRecoveryHint:"\u65E7\u5B9E\u4F8B\u4ECD\u5728\u9000\u51FA\uFF0C\u8BF7\u5148\u6838\u67E5\u505C\u6B62\u3002\u82E5\u4E00\u76F4\u672A\u9000\u51FA\uFF0C\u8BF7\u5B8C\u6574\u9000\u51FA\u5E76\u91CD\u65B0\u6253\u5F00 DSH\u3002",operationUnavailable:"\u64CD\u4F5C\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\uFF1B\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002\u8BE6\u60C5\u89C1\u9AD8\u7EA7\u8BBE\u7F6E\u3002",enableFailed:"\u65E0\u6CD5\u5F00\u59CB\u5BF9\u8BDD\u3002\u8BF7\u5728\u8BBE\u7F6E\u7684\u300C\u9AD8\u7EA7\u300D\u67E5\u770B\u539F\u56E0\u540E\u91CD\u8BD5\u3002",tab_pets:"\u684C\u5BA0",planned:"\u8BA1\u5212\u5F00\u53D1\u4E2D",configurationUnknown:"\u914D\u7F6E\u4FDD\u5B58\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\uFF1B\u6838\u5B9E\u524D\u4E0D\u80FD\u7EE7\u7EED\u4FEE\u6539\u3002",motionTitle:"\u754C\u9762\u52A8\u753B",motion_spring:"Q \u5F39",motion_firm:"\u786C\u6717",motion_off:"\u5173\u95ED\u52A8\u753B",motionHint:"\u7ACB\u5373\u9884\u89C8\u5E76\u4FDD\u5B58\uFF1B\u64CD\u4F5C\u4E0D\u7B49\u5F85\u52A8\u753B\u3002\u7CFB\u7EDF\u51CF\u5C11\u52A8\u6001\u6548\u679C\u4F18\u5148\u3002",motionNotSaved:"\u672C\u6B21\u9884\u89C8\u5DF2\u5E94\u7528\uFF0C\u4F46\u6B64\u6D4F\u89C8\u5668\u65E0\u6CD5\u4FDD\u5B58\u52A8\u753B\u504F\u597D\u3002",modeControlPending:"\u8BED\u97F3\u63A7\u5236\u5C1A\u672A\u5B8C\u6210\u6216\u72B6\u6001\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\u3002",capabilityTitle:"\u5BF9\u8BDD\u5728\u4FA7\u680F\u4E2D\u7684\u663E\u793A",supported:"\u53EF\u7528",unsupported:"\u4E0D\u53EF\u7528\u6216\u5C1A\u672A\u786E\u8BA4",hiddenMode:"\u4E0D\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD",workspaceMode:"\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD",taskCapability:"\u540E\u53F0\u4EFB\u52A1\u652F\u6301",configuredMode:"\u5DF2\u4FDD\u5B58\u6A21\u5F0F",currentVoiceMode:"\u5F53\u524D\u5BF9\u8BDD\u7684\u5B9E\u9645\u6A21\u5F0F",noActiveVoice:"\u6CA1\u6709\u8FD0\u884C\u4E2D\u7684\u5BF9\u8BDD",chooseVisibility:"\u9009\u62E9\u663E\u793A\u6A21\u5F0F",workspaceWarning:"\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD\u4F1A\u628A\u5BF9\u8BDD\u663E\u793A\u5728\u666E\u901A\u5DE5\u4F5C\u533A\u4E2D\u3002\u9690\u85CF\u6A21\u5F0F\u4E0D\u53EF\u7528\u65F6\u4ECD\u4F1A\u62D2\u7EDD\u542F\u52A8\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u6539\u4E3A\u53EF\u89C1\u3002",visibilityNoMigration:"\u6B64\u8BBE\u7F6E\u7528\u4E8E\u540E\u7EED\u5BF9\u8BDD\uFF1B\u5DF2\u6709\u5BF9\u8BDD\u4FDD\u6301\u539F\u663E\u793A\u65B9\u5F0F\u3002",modeReadFirst:"\u6B63\u5728\u6838\u67E5\u5F53\u524D\u5BF9\u8BDD\u7684\u914D\u7F6E\u548C\u72B6\u6001\uFF0C\u786E\u8BA4\u540E\u53EF\u4FEE\u6539\u6A21\u5F0F\u3002",closeBeforeMode:"\u8BF7\u5148\u5173\u95ED\u8BED\u97F3\uFF0C\u786E\u8BA4\u5B8C\u5168\u505C\u6B62\u540E\u53EF\u4FEE\u6539\u663E\u793A\u6A21\u5F0F\u3002",saveWorkspace:"\u4FDD\u5B58\u5DE5\u4F5C\u533A\u53EF\u89C1\u6A21\u5F0F",saveHidden:"\u4FDD\u5B58\u9690\u85CF\u6A21\u5F0F",visibilityUnknownWrite:"\u663E\u793A\u6A21\u5F0F\u5199\u5165\u7ED3\u679C\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\u3002\u6838\u5B9E\u524D\u4E0D\u80FD\u7EE7\u7EED\u4FEE\u6539\uFF0C\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002",outputObservationUnavailable:"\u5C1A\u672A\u63A5\u5165\u771F\u5B9E\u64AD\u97F3\u5F00\u59CB\u4E8B\u4EF6\uFF0C\u65E0\u6CD5\u786E\u8BA4\u6B63\u5728\u64AD\u97F3",title:"\u9C7C\u5E94",description:"\u8BED\u97F3\u63A7\u5236\u3001\u97F3\u9891\u8BBE\u7F6E\u4E0E\u72EC\u7ACB\u5BF9\u8BDD\u3002",drag:"\u79FB\u52A8\u9C7C\u5E94\u60AC\u6D6E\u7A97",dragHint:"\u7528\u9F20\u6807\u62D6\u52A8\u7A7A\u767D\u533A\u57DF\u79FB\u52A8\uFF1B\u6309\u94AE\u548C\u8F93\u5165\u6846\u6B63\u5E38\u64CD\u4F5C",collapse:"\u6536\u8D77",reopen:"\u6253\u5F00\u9C7C\u5E94",refresh:"\u5237\u65B0\u72B6\u6001",settings:"\u8BBE\u7F6E",unknown:"\u6B63\u5728\u8BFB\u53D6\u72B6\u6001\u2026",enabled:"\u9EA6\u514B\u98CE\uFF1A\u5DF2\u5F00\u542F",disabled:"\u9EA6\u514B\u98CE\uFF1A\u672A\u5F00\u542F",identity:"\u5B8C\u6574\u4F1A\u8BDD\u6807\u8BC6",source:"\u6388\u6743\u6765\u6E90",actor:"\u64CD\u4F5C\u4F1A\u8BDD",none:"\u65E0",openSession:"\u5148\u5728 DSH \u4FA7\u680F\u65B0\u5EFA\u6216\u6253\u5F00\u4E00\u4E2A\u5BF9\u8BDD\uFF0C\u518D\u56DE\u5230\u9C7C\u5E94\u3002",enable:"\u5F00\u9EA6",transfer:"\u8BA9\u8FD9\u4E2A\u7A97\u53E3\u63A5\u7BA1\u9EA6\u514B\u98CE",disable:"\u5173\u9EA6",stale:"\u72B6\u6001\u6682\u65F6\u8BFB\u4E0D\u5230",snapshot:"\u4E0A\u6B21\u8BFB\u53D6\u7684\u72B6\u6001",consequence:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u672C\u6B21\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u3002\u6536\u8D77\u540E\u4F1A\u7EE7\u7EED\u5BF9\u8BDD\u3002",savedHint:"\u8BBE\u5907\u4E0E\u58F0\u7EB9\u8BBE\u7F6E\u5728\u4E0B\u6B21\u97F3\u9891\u64CD\u4F5C\u65F6\u751F\u6548",more:"\u66F4\u591A\u5BF9\u8BDD",historyOther:"\u5217\u8868\u6765\u81EA\u5176\u4ED6\u64CD\u4F5C\u4F1A\u8BDD\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6",helperOnline:"\u97F3\u9891\u670D\u52A1\u5728\u7EBF",helperOffline:"\u97F3\u9891\u670D\u52A1\u79BB\u7EBF",pending:"\u6B63\u5728\u5904\u7406\u2026",refreshHint:"\u53EA\u8BFB\u53D6\u72B6\u6001\uFF0C\u4E0D\u542F\u52A8\u9EA6\u514B\u98CE\u6216\u6A21\u578B",modelGuide:"\u9ED8\u8BA4 SenseVoice \u5728\u672C\u673A\u4F7F\u7528 CPU\u3002\u6A21\u578B\u6587\u4EF6\u548C\u8BB8\u53EF\u89C1 docs/model-setup.md\u3002",sensevoiceSource:"SenseVoice \u6765\u6E90",ttsSource:"\u5916\u90E8 TTS \u53C2\u8003",licenseNote:"SenseVoice \u8BB8\u53EF\u8BA8\u8BBA",modelTitle:"\u672C\u5730\u6A21\u578B",modelHint:"\u4FDD\u5B58\u5DF2\u6709 SenseVoice \u6216 CAM++ \u8DEF\u5F84\u3002\u6587\u4EF6\u5728\u4F7F\u7528\u524D\u6821\u9A8C\uFF0C\u58F0\u7EB9\u8FC7\u6EE4\u9700\u53E6\u884C\u5F00\u542F\u3002",asr:"\u8BED\u97F3\u8BC6\u522B",sensevoicePath:"SenseVoice \u672C\u5730\u76EE\u5F55",campplusPath:"CAM++ \u6587\u4EF6\uFF08\u53EF\u9009\uFF09",saveModels:"\u4FDD\u5B58\u6A21\u578B\u8DEF\u5F84",audioTitle:"\u97F3\u9891\u8BBE\u7F6E",soundTitle:"\u8F6E\u6B21\u63D0\u793A\u97F3",headphones:"\u6211\u5DF2\u4F7F\u7528\u8033\u673A",headphonesHint:"\u672A\u786E\u8BA4\u8033\u673A\u65F6\uFF0C\u4E3A\u907F\u514D\u5916\u653E\u56DE\u58F0\u4E0D\u64AD\u653E\u63D0\u793A\u97F3\uFF1B\u8FD9\u4E0D\u662F\u56DE\u58F0\u6D88\u9664\uFF0C\u4E5F\u4E0D\u4F1A\u88C1\u6389\u7528\u6237\u8BB2\u8BDD",automaticBargeIn:"\u542F\u7528\u5B9E\u9A8C\u6027\u81EA\u52A8\u6253\u65AD",stopRequested:"\u5DF2\u8BF7\u6C42\u505C\u6B62\u64AD\u653E\uFF0C\u5C1A\u672A\u786E\u8BA4",stopConfirmed:"\u5DF2\u786E\u8BA4\u505C\u6B62\u64AD\u653E",soundEnabled:"\u542F\u7528\u63D0\u793A\u97F3",soundVolume:"\u63D0\u793A\u97F3\u97F3\u91CF\uFF080\u20131\uFF09",soundUnavailable:"\u97F3\u6548\u6682\u672A\u63A5\u5165\uFF1B\u8FD9\u4E9B\u63A7\u4EF6\u4E0D\u4F1A\u5047\u88C5\u64AD\u653E",soundAvailable:"\u97F3\u6548\u5DF2\u63A5\u5165",mode:"\u8BF4\u8BDD\u65B9\u5F0F",alwaysOn:"\u5F00\u542F\u6301\u7EED\u8046\u542C\uFF08\u9EA6\u514B\u98CE\u5E38\u5F00\uFF09",alwaysOff:"\u5207\u56DE\u6309\u4F4F\u8BF4\u8BDD",modeUnavailable:"\u8BF4\u8BDD\u65B9\u5F0F\u63A7\u5236\u5C1A\u672A\u63A5\u5165",modeNeedsGrant:"\u8BF7\u5148\u8BFB\u53D6\u6700\u65B0\u72B6\u6001\u3002",pttMode:"\u6309\u952E\u8BF4\u8BDD",alwaysMode:"\u81EA\u7531\u9EA6",modeHint:"\u5F00\u59CB\u5BF9\u8BDD\u524D\u53EF\u9884\u9009\u8BF4\u8BDD\u65B9\u5F0F\u3002",readSettings:"\u8BFB\u53D6\u8BBE\u7F6E",device:"\u9EA6\u514B\u98CE\u8BBE\u5907",deviceHint:"\u8BBE\u5907\u540D\u79F0\u6765\u81EA\u97F3\u9891\u670D\u52A1\u7684\u6700\u8FD1\u8BFB\u53D6\u3002\u66F4\u6362\u8BBE\u5907\u540E\uFF0C\u5F00\u59CB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002",sideButton:"\u9F20\u6807\u6309\u4F4F\u8BF4\u8BDD",sideOff:"\u5173\u95ED",sideOne:"\u4FA7\u952E 1",sideTwo:"\u4FA7\u952E 2",speaker:"\u5B9E\u9A8C\u6027\u58F0\u7EB9\u8FC7\u6EE4",speakerHint:"\u6B64\u5F00\u5173\u53EA\u7528\u4E8E\u5DF2\u6709\u7684\u58F0\u7EB9\u914D\u7F6E\uFF1B\u5F53\u524D\u9762\u677F\u6CA1\u6709\u6CE8\u518C\u5165\u53E3\u3002",save:"\u4FDD\u5B58\u8BBE\u7F6E",saved:"\u8BBE\u7F6E\u5DF2\u4FDD\u5B58",historyTitle:"\u5BF9\u8BDD\u5386\u53F2",historyHint:"\u53EA\u663E\u793A\u9C7C\u5E94\u521B\u5EFA\u7684\u5BF9\u8BDD\uFF1B\u63A5\u7EED\u4E0D\u4F1A\u81EA\u52A8\u6062\u590D\u5DF2\u5F52\u6863\u804A\u5929",loadHistory:"\u8BFB\u53D6\u5BF9\u8BDD",newChat:"\u65B0\u4F1A\u8BDD",resume:"\u63A5\u7EED",active:"\u5F53\u524D",archived:"\u5DF2\u5F52\u6863",unavailable:"\u4E0D\u53EF\u7528",empty:"\u6682\u65E0\u53EF\u63A5\u7EED\u7684\u5BF9\u8BDD",noTitle:"\u5BF9\u8BDD",noResume:"\u5F53\u524D\u4E0D\u80FD\u63A5\u7EED",newHint:"\u65B0\u5EFA\u6216\u63A5\u7EED\u4F1A\u5207\u6362\u5F53\u524D\u8BED\u97F3\uFF0C\u64A4\u56DE\u65E7\u6388\u6743\uFF0C\u53EF\u80FD\u7ED3\u675F\u65E7\u540E\u53F0\u4EFB\u52A1\uFF1B\u4E0D\u5408\u5E76\u5386\u53F2\uFF0C\u4E5F\u4E0D\u91CD\u8DD1\u65E7\u4EFB\u52A1",historyStale:"\u70B9\u51FB\u8BFB\u53D6\u5BF9\u8BDD\u67E5\u770B\u6700\u65B0\u8BB0\u5F55"},op={startConversation:"Start conversation",endConversation:"End conversation",voiceTarget:"Send to",dedicatedVoiceTarget:"Fish Voice conversation",checkingVoiceTarget:"Checking target\u2026",voiceTargetChanged:"The delivery target changed. Check the chat shown here before starting.",chooseCurrentDshTarget:"Use current chat",backToFishVoice:"Back to Fish Voice",currentDshTargetError:"Could not confirm this DSH chat. Check the chat and try again.",chooseVoiceTarget:"Choose a delivery chat",searchVoiceTargets:"Search by chat title or ID",searchVoiceTargetsAction:"Search",existingVoiceTargetList:"Existing DSH chats",boundVoiceTarget:"Current target",voiceTargetAvailability_ready:"Available",voiceTargetAvailability_busy:"Chat is processing a message",voiceTargetAvailability_archived:"Chat is archived",voiceTargetAvailability_unavailable:"Chat is unavailable",voiceTargetAvailability_managed:"Managed by Fish Voice. Direct delivery unavailable.",voiceTargetAvailability_subagent:"Subagent chat. Direct delivery unavailable.",voiceTargetNoMatch:"No matching chats.",voiceTargetEmptyList:"No available chats.",voiceTargetSynthesisNotice:"With an online voice, replies are sent to the speech provider you approved. Select a local voice under Models \u2192 Read aloud to keep speech offline.",bindVoiceTarget:"Use selected chat",savingVoiceTarget:"Saving\u2026",moreVoiceTargets:"Load more",loadingVoiceTargets:"Loading DSH chats\u2026",voiceTargetListError:"Could not load DSH chats.",retryVoiceTargets:"Retry",voiceTranscriptCaptions:"Voice captions",retryTranscript:"Resend",transcriptDelivery_busy:"Chat busy, waiting to send to",transcriptDelivery_ready:"Ready to resend to",transcriptDelivery_sending:"Sending to",transcriptDelivery_queued:"Waiting for chat",transcriptDelivery_delivered:"Sent to",transcriptDelivery_uncertain:"Delivery unconfirmed",transcriptDelivery_failed:"Failed to send to",transcriptDelivery_discarded:"Pending send canceled",endDiscardsRetries:"Ending the conversation clears pending transcripts.",modeSwitching:"Switching listening mode\u2026",modeSaving:"Saving listening mode\u2026",modeSwitchUnconfirmed:"Checking which listening mode took effect\u2026",modeSwitchFailed:"The change could not be confirmed. Check the current mode and try again.",updateTitle:"Fish Voice updates",updateOfferTitle:"Fish Voice update available",updateCurrentVersion:"Installed",updateNewVersion:"New",updateChannel_stable:"Stable",updateChannel_preview:"Preview",updateCheck:"Check for updates",updateDetails:"View update",updateLater:"Later",updateInstall:"Update now",updateRelease:"Release notes",updateFeedback:"Send feedback",update_idle:"Reading update status\u2026",update_checking:"Checking for updates\u2026",update_current:"Fish Voice is up to date.",update_available:"An update is ready.",update_incompatible:"This update is incompatible with the current DSH environment.",update_installing:"Updating. DSH may reload Fish Voice\u2026","update_restart-required":"Update installed. Restart DSH to apply it.","update_enable-required":"Update installed. Enable Fish Voice in DSH plugin settings.",update_installed:"Update complete.",update_error:"The update encountered an error. Check for updates to retry.",update_unsupported:"Automatic updates are unavailable. See the official release notes.",updateConnection:"Update status could not be confirmed. Check again when DSH is ready.",audioDevices:"Audio devices",audioSystemDefault:"System default",audioInput:"Audio input",audioOutput:"Audio output",inputDeviceMissing:"Microphone disconnected; selection retained",outputDeviceMissing:"Output disconnected; no automatic fallback",deviceDisconnected:"Disconnected",inputDeviceStopFirst:"Turn off the microphone to switch input. Output changes at the next playback.",outputDeviceUnsupported:"Selecting speech output is not supported on this platform.",deviceListRetry:"Device list unavailable. Open a selector to retry.",voiceHelperCleanupHint:"Confirming microphone release. New recording stays off until this completes.",voiceHelperRestartHint:"Microphone helper exit is unconfirmed. Fully restart DSH before enabling voice.",inputError_device:"Microphone unavailable",inputError_recognition:"Recognition failed","inputError_no-speech":"No clear speech; try again",inputHelp_device:"Check mic access. Turn the mic off to select a device. Error details: Settings \u2192 Advanced \u2192 Diagnostics.",inputDiagnosticTitle:"Last reported audio error",inputDiagnosticHistory:"This is the last recorded error and may be from an earlier attempt. It does not confirm the current device state.",inputHelp_recognition:"Try again. If it fails, turn the mic off and check the model in Settings.","inputHelp_no-speech":"Move closer, check that your mic is unmuted, and try again.",speechFailed:"Speech failed",speechInterrupted:"Speech interrupted",wakeFallbackHint:"Say a configured name. Matching uses the transcript for now. Reselect Wake word after switching modes to retry sound matching.",wakeMode:"Wake word",switchToWake:"Switch to wake-word listening",wakeDisabled:"Wake listening is off",wakeStarting:"Starting wake listening\u2026",wakeWaiting:"Waiting for wake word",wakeListening:"Listening for the next instruction",wakePaused:"Wake listening paused",wakeError:"Wake listening unavailable; check settings",wakeHint:"Say a configured name, then your instruction. End the conversation to stop listening.",wakeMethod:"Matches the sound and transcript locally after the phrase ends.",wakeAliases:"Wake names",wakeAliasesHint:"Up to 8 comma-separated names. Mandarin near-sounds match only at the start; prefer a distinctive name of 3+ characters.",wakeTimeout:"Wait after wake (seconds)",wakeSettings:"Wake-word settings",wakeStopToEdit:"Turn off the microphone before editing wake names or timeout.",wakeInvalid:"Enter 1\u20138 valid names and a 3\u201330 second timeout.",switchToPtt:"Click to use push to talk",switchToAlways:"Click to leave the microphone listening",quickSpeedStop:"Turn the mic off to change speed",performanceReadFirst:"Check which speeds the current model supports first.",performanceUnavailable:"The provider explicitly rejected the reasoning parameter for unavailable modes; other modes remain selectable.",performanceProbeCost:"At load, up to 3 fixed short requests check the modes. Model charges apply.",performanceProbeScope:"Only routes with a testing interface send short requests. Native support can be read directly.",performanceProbeUnknown:"Some modes could not be confirmed. Check network access or sign-in, then retry.",performanceProbeAccepted:"The effort request check passed.",performanceProbePending:"Checking effort modes for the current model\u2026",holdToSpeak:"Hold to speak:",alwaysWarning:"The microphone keeps listening. Turn it off when finished.",bindingMissing:"Bind a push-to-talk shortcut in settings, or switch to continuous listening.",noSession:"No conversation is open",otherWindow:"Microphone: another window",readingStatus:"Reading status without starting the microphone or models.",statusRetry:"Status is unavailable. It will be checked automatically when you return to this window.",retryStatus:"Refresh voice status",collapseHint:"Collapsing keeps the microphone enabled",stopConsequence:"Ending the conversation releases the microphone and stops its background tasks.",transferTitle:"Take over the other window\u2019s microphone?",transferWarning:"This interrupts voice in the other window and may end its background tasks.",cancel:"Cancel",confirmTransfer:"Confirm takeover",bindingStopRequired:"Turn off the microphone before changing mouse or keyboard shortcuts.",bindingFinishing:"Voice is still stopping. Wait before changing shortcuts.",headphonesRequired:"Confirm that you are wearing headphones to enable automatic interruption.",deviceManualIndex:"Advanced: enter device index",deviceManualName:"Advanced: enter device name",deviceIndexInvalid:"Enter a nonnegative whole-number device index.",deviceDefault:"Use the system default microphone",deviceManual:"Advanced: enter name or index",deviceSaved:"Saved device",deviceEmpty:"No microphone was found. Connect a device and check system sound settings.",deviceUnknown:"Detected devices appear after enabling voice. Use the system default or enter a device manually.",ttsBackend:"Speech backend",ttsBackendHint:"Speech uses your installed TTS backend and its settings. Independent output volume appears only when verified.",ttsBackendPending:"Additional backend selection is being adapted. No cloud service is connected automatically.",voiceClone:"Voice cloning",voiceCloneAvailable:"Qwen supports a local reference voice. Choose a WAV in voice settings.",voiceClonePrivacy:"Reads only your selected, authorized sample locally. No audio upload.",inputActive:"Receiving voice input",modeUnknown:"Listening mode unknown",voiceInputUnavailable:"Voice input unavailable",voiceInputRecoveryHint:"The audio service stopped. Turn the microphone off, then on again. Your authorization is unchanged.",searchHistory:"Search chats",searchScope:"Search loaded chats",noMatches:"No matching chats",differentOwner:"Voice belongs to another session. Check the source first.",details:"Diagnostics",noReply:"No conversation yet",recentConversation:"Conversation",recentTenTurns:"Recent 10 turns",allRecords:"All records",showAllRecords:"Show all",collapseToTen:"Last 10 turns",collapseConversation:"Collapse conversation",currentVoiceRecords:"Current voice chat",historyTruncated:"Showing a limited range; original records retained",viewConversation:"View voice records",loadEarlier:"Load earlier",readingHistory:"Reading records\u2026",retryHistory:"Could not read records. Retry",noConversation:"No conversation yet",newMessages:"new messages",conversationMessages:"Voice conversation",assistantName:"Assistant name",renameAssistant:"Rename: Enter to save, Esc to cancel",newChatCreated:"New chat created",newChatActive:"Start a voice chat. Background work in the current chat will stop and its history will be kept.",newChatOtherOwner:"Open the current voice chat or the window that enabled the microphone to start a new chat.",compact_off:"Off",compact_standby:"Standby",compact_listening:"Listening",compact_pending:"Working",compact_unknown:"Check status",you:"You",assistant:"Assistant",close:"Close panel",keyboardBinding:"Push-to-talk binding",bindingOff:"Not bound",saveBindings:"Save shortcuts",discardBindings:"Discard changes",bindingCapture:"Press a key combination (Esc cancels)",clearBinding:"Clear binding",bindingUnsupported:"This key or system shortcut is not supported.",bindingGlobalHint:"Windows global shortcut. Disable voice before recording a binding; changes apply on the next voice enable. Keys are not swallowed and may also trigger another application.",bindingUnavailable:"Global key binding is unavailable on this platform.",bindingPrintableWarning:"A plain letter, digit or Space also triggers push-to-talk while typing in other applications.",performanceTitle:"Voice performance",performanceHint:"Applies to the next dedicated voice chat. For a linked conversation, use the model menu in that DSH chat to change its reasoning effort.",inspectPerformance:"Check available modes",performance_fast:"Fast",performanceNoThinking:"No thinking",performanceRecommended:"[Recommended]",performanceFastHint:"Fast explicitly requests thinking to be turned off.",performanceFastUnavailable:"The current route cannot confirm that thinking can be turned off. Choose Follow model or select a model route that supports turning it off.",performanceHostUnavailable:"The current model route does not offer some reasoning levels.",performance_balanced:"Standard",performance_high:"High",performance_compatibility:"Compatible default",performanceStopRequired:"Mode changes require fully stopped voice. Disabling voice can end background work belonging to its voice root.",savePerformance:"Save for next enable",outputVolume:"Assistant voice volume",outputVolumeHint:"Adjusts the installed Windows dsh-speak backend only. It does not verify the active voice route or change DSTuber, system or cue volume. Applies to the next output.",readOutputVolume:"Read voice volume",saveOutputVolume:"Save voice volume",outputVolumeUnavailable:"This speech backend does not support independent volume control.",outputVolumeUnknown:"The volume save is unconfirmed. It will be checked automatically without resubmitting.",settingsTitle:"\u9C7C\u5E94 settings",settingsSections:"Settings sections",tab_audio:"Audio",tab_interaction:"Interaction",tab_prompt:"Prompt",voicePromptLabel:"Custom prompt",voicePromptOptional:"(optional)",voicePromptAgents:"Follow AGENTS",voicePromptCustom:"Custom prompt added",voicePromptPlaceholder:`For example: Give the conclusion first and use a natural tone.

Added after AGENTS. Leave empty to use the default settings.`,voicePromptStopToEdit:"Stop voice to edit",voicePromptUnsupported:"This DSH version does not support custom prompts yet.",voicePromptTooLong:"The prompt must not exceed 32,768 characters.",voicePromptSaving:"Saving\u2026",voicePromptCancel:"Cancel changes",voicePromptSave:"Save",voicePromptSaved:"Saved. Applies when voice is next started.",voicePromptSaveFailed:"Could not save. Your draft has been kept.",voicePromptUnsaved:"Not saved",tab_models:"Models",tab_advanced:"Advanced",projectInfoTitle:"About \u9C7C\u5E94",projectAuthor:"Author",projectRepository:"Official repository",projectNpm:"npm package",tab_sessions:"Sessions",settingsContent:"Settings content",voiceCleanupPending:"Closing previous audio service",voiceCleanupHint:"Waiting for the previous session and recording to exit. Status will refresh without retrying microphone activation.",voiceRestartPending:"Restart DSH required",voiceRestartHint:"The previous audio service has not confirmed exit. Fully quit and reopen DSH before enabling voice. Your saved authorization is unchanged.",voiceRootRestartHint:"Voice session shutdown is unconfirmed. Fully quit and reopen DSH.",voiceStopPending:"Voice stop unconfirmed",voiceStopHint:"Refresh the status and confirm voice has stopped before starting a dialogue.",voiceTargetOccupied:"The previous voice session is open in DSH. Start a new Fish Voice session or choose a DSH conversation.",voiceRecoveryPending:"Previous voice session is still active",voiceRecoveryCheck:"Check and stop",voiceRecoveryHint:"The previous instance is still closing. Check and stop first. If it remains active, fully quit and reopen DSH.",operationUnavailable:"The outcome is unconfirmed. Automatic readback will check the actual state without resubmitting. Details are in Advanced settings.",enableFailed:"Could not open the mic. Check Advanced settings for details before retrying.",tab_pets:"Desktop pet",planned:"Planned development",configurationUnknown:"The configuration write is unconfirmed. Automatic readback is in progress; changes stay locked until verified.",motionTitle:"Interface motion",motion_spring:"Spring",motion_firm:"Firm",motion_off:"Off",motionHint:"Preview and save immediately. Actions never wait for animation. System reduced-motion preference takes priority.",motionNotSaved:"Preview applied, but this browser could not save the preference.",modeControlPending:"Voice control is pending or unconfirmed. Refresh status when it finishes.",capabilityTitle:"Host capabilities and voice visibility",supported:"Available",unsupported:"Unavailable or unconfirmed",hiddenMode:"Hidden voice chat",workspaceMode:"Workspace-visible compatibility mode",taskCapability:"Persistent handoff",configuredMode:"Saved mode",currentVoiceMode:"Actual mode of the current voice chat",noActiveVoice:"No running voice chat",chooseVisibility:"Choose visibility",workspaceWarning:"Workspace-visible compatibility mode shows voice chats in the regular workspace. Unavailable hidden mode still refuses to start; it never falls back to visible mode.",visibilityNoMigration:"This preference applies to later chats. Existing chats keep their current visibility.",modeReadFirst:"Checking settings and status for this conversation before visibility can be changed.",closeBeforeMode:"Turn voice off and wait for confirmed shutdown before changing visibility.",saveWorkspace:"Save workspace-visible mode",saveHidden:"Save hidden mode",visibilityUnknownWrite:"The visibility write is unconfirmed. Automatic readback is in progress; changes stay locked. The original write will not be repeated.",outputObservationUnavailable:"Actual playback-start events are unavailable; playback has not been confirmed.",title:"\u9C7C\u5E94",description:"Voice controls, audio preferences, and separate voice chats.",drag:"Move Fish Voice panel",dragHint:"Drag background space with the mouse; controls remain interactive",collapse:"Collapse",reopen:"Open Fish Voice",refresh:"Refresh status",settings:"Settings",unknown:"Reading status\u2026",enabled:"Microphone enabled",disabled:"Microphone off",identity:"Full session identities",source:"Authorization source",actor:"Action session",none:"None",openSession:"Open a DSH conversation first",enable:"Enable for this session",transfer:"Authorize this session",disable:"Disable voice",stale:"Refresh to confirm status",snapshot:"Last read status",consequence:"Disabling or switching voice may end its background work. Collapsing this panel leaves voice enabled.",savedHint:"Device and speaker settings take effect on the next audio operation or helper reload.",more:"More voice chats",historyOther:"This list belongs to another action session; read it again",helperOnline:"Audio helper online",helperOffline:"Audio helper offline",pending:"Working\u2026",refreshHint:"Read status without starting the microphone or a model",modelGuide:"SenseVoice runs locally on the CPU. For model files and licenses, see docs/model-setup.md.",sensevoiceSource:"SenseVoice source",ttsSource:"External TTS reference",licenseNote:"SenseVoice licensing discussion",modelTitle:"Local models",modelHint:"Save existing SenseVoice or CAM++ paths. Files are verified before use. Speaker filtering is enabled separately.",asr:"Speech recognition",sensevoicePath:"Local SenseVoice directory",campplusPath:"CAM++ file (optional)",saveModels:"Save model paths",audioTitle:"Audio settings",soundTitle:"Turn sounds",headphones:"I am using headphones",headphonesHint:"Cues stay off until headphones are confirmed, to avoid speaker echo. This is not echo cancellation and does not trim your speech.",automaticBargeIn:"Enable experimental automatic interruption",stopRequested:"Stop requested; playback has not confirmed stopping",stopConfirmed:"Playback confirmed stopped",soundEnabled:"Enable turn sounds",soundVolume:"Sound volume (0\u20131)",soundUnavailable:"Sound playback is not connected; these controls cannot play cues yet.",soundAvailable:"Sound playback connected",mode:"Listening mode",alwaysOn:"Enable always listening (mic stays on)",alwaysOff:"Use push to talk",modeUnavailable:"Listening mode control is not connected",modeNeedsGrant:"Read the current voice status first",pttMode:"Push to talk",alwaysMode:"Open mic",modeHint:"The audio helper controls the active mode. Saving preferences never grants or starts microphone access.",readSettings:"Read settings",device:"Input device",deviceHint:"Blank uses the system default; enter a device name or index",sideButton:"Mouse push-to-talk",sideOff:"Off",sideOne:"Side button 1",sideTwo:"Side button 2",speaker:"Experimental speaker filtering",speakerHint:"Enable matching only; this page does not record or enroll a voiceprint",save:"Save settings",saved:"Settings saved",historyTitle:"Voice chats",historyHint:"Only Fish Voice voice chats appear here. Resume never unarchives a chat automatically.",loadHistory:"Read voice chats",newChat:"New chat",resume:"Resume",active:"Current",archived:"Archived",unavailable:"Unavailable",empty:"No voice chats available",noTitle:"Voice chat",noResume:"Cannot resume right now",newHint:"New or resumed chats switch current voice, revoke its old grant, and may end its background work. They do not merge history or replay old work.",historyStale:"Read voice chats to see the latest records"};var Zn=require("react");var xg=/^7b94c8e3-d6a1-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,Qi=e=>typeof e=="string"&&xg.test(e);var rp="sidebar.workspaces",_g="workspace",Sg="whaleWorkspacePresentation",kg=["sidebar.workspaces.directoryFlow","sidebar.workspaces.session.row.action","sidebar.session.row.leading","sidebar.session.row.trailing","sidebar.session.row.hover"],Wg=new Set(["one-shot","continuable","unknown"]);function zg(e,n){return e&&typeof e=="object"&&Object.keys(e).length===n.length&&n.every(t=>Object.hasOwn(e,t))}function Cg(e){if(!Array.isArray(e)||e.length>512)return null;let n=[],t=new Set;for(let o of e){if(!zg(o,["id","parentId","mode"])||typeof o.id!="string"||!o.id||o.id.length>256||t.has(o.id))return null;if(o.parentId===null){if(o.mode!==null||!Qi(o.id))return null;n.push({id:o.id,parentId:null,mode:null})}else{if(typeof o.parentId!="string"||!o.parentId||o.parentId===o.id||!Wg.has(o.mode))return null;n.push({id:o.id,parentId:o.parentId,mode:o.mode})}t.add(o.id)}return n}function Pg(e,n){if(!e||typeof e!="object"||!e.byId||!Array.isArray(e.ids))return e;let t=new Map(n.map(d=>[d.id,d])),o=Object.create(null),i=new Set,r=!1;for(let[d,l]of Object.entries(e.byId)){let u=t.get(d);if(Qi(d)&&u===void 0){i.add(d),r=!0;continue}if(u?.parentId===null){if(l.parentId===void 0&&l.origin!=="subagent"){o[d]=l;continue}i.add(d),r=!0;continue}if(u&&l.origin==="subagent"&&l.parentId===u.parentId){let p={...l};delete p.origin,o[d]=p,r=!0;continue}o[d]=l}for(let d of n){let l=e.byId[d.id];l&&(d.parentId===null&&(l.parentId!==void 0||l.origin==="subagent")||d.parentId!==null&&(l.origin!=="subagent"||l.parentId!==d.parentId)||e.ids.includes(d.id)||(r=!0))}if(!r)return e;let s=e.ids.filter(d=>!i.has(d)&&o[d]!==void 0);for(let d of n)o[d.id]!==void 0&&!s.includes(d.id)&&s.push(d.id);let a=e.projectionsBySession;if(a&&i.size>0){let d={...a};for(let l of i)delete d[l];a=d}return{...e,ids:s,byId:o,projectionsBySession:a}}function Ig(e,n){return!e||e.locale!==_g||e.options?.id!==void 0||e.options?.key!==void 0||(e.options?.priority??0)!==0||typeof n!="function"||n.name!=="WorkspaceBrowser"?!1:kg.every(t=>Object.hasOwn(e.children??{},t))}function Ng(e){if(!Object.isExtensible(e))return!1;let n=Object.getOwnPropertyDescriptor(e,"component");return n===void 0||n.writable===!0}function Ag(e,n){return e.length===n.length&&e.every((t,o)=>{let i=n[o];return t.id===i.id&&t.parentId===i.parentId&&t.mode===i.mode})}function ip(e,n){let t=[],o=0,i={revision:o,items:t},r,s=!1,a=!1,d=new Set,l=new Set,u=P=>{for(let M of[...P])M()},p={getSnapshot:()=>i,subscribe(P){return l.add(P),()=>l.delete(P)}},m=()=>{o++,i={revision:o,items:t},u(l),u(d)},f=P=>{s!==P&&(s=P,m())},b=()=>{let P=r;r=void 0,P&&P.entry.component===P.wrapper&&(P.entry.component=P.original)},v=()=>{if(a)return;let P;try{P=e.entries(rp)}catch{P=void 0}let M=Array.isArray(P)?P.filter($=>{let W=r&&r.entry===$&&$.component===r.wrapper?r.original:$?.component;return Ig($,W)}):[];if(M.length!==1||typeof n!="function"||!Ng(M[0])){b(),f(!1);return}let B=M[0];if(r?.entry===B&&B.component===r.wrapper)return;b(),f(!1);let E=B.component,T=$=>{let W=$.useSessions(F=>F),_=$.useWhaleWorkspacePresentation(F=>F),C=(0,Zn.useMemo)(()=>Pg(W,_.items),[W,_]),N=(0,Zn.useCallback)(F=>F(C),[C]),S=(0,Zn.useMemo)(()=>new Map(_.items.map(F=>[F.id,F])),[_]),I=(0,Zn.useCallback)(F=>{let L=S.get(F),Z=W.byId[F];if(L?.parentId&&Z?.origin==="subagent"&&Z.parentId===L.parentId){n({childSessionId:F,parentSessionId:L.parentId,mode:L.mode});return}$.open?.(F)},[$.open,S,W]);return(0,Zn.createElement)(E,{...$,useSessions:N,open:I})},z=function(W){let _=typeof W?.useSessions=="function"&&typeof W?.useWhaleWorkspacePresentation=="function"&&typeof W?.open=="function";return(0,Zn.useEffect)(()=>{r?.entry===B&&r.wrapper===z&&f(_)},[_]),(0,Zn.createElement)(_?T:E,W)};z.displayName="WhaleWorkspacePresentation",B.component=z,r={entry:B,original:E,wrapper:z}},w=()=>{},k=()=>{};try{w=e.provideRoot({hooks:{[Sg]:p}}),typeof w!="function"&&(w=()=>{}),k=e.subscribe(rp,v),typeof k!="function"&&(k=()=>{}),v()}catch{k(),b(),w(),f(!1)}return{supported:()=>s,subscribe(P){return d.add(P),()=>d.delete(P)},setOverrides(P){if(a)return!1;let M=Cg(P);return M===null?(t.length>0&&(t=[],m()),!1):(Ag(t,M)||(t=M,m()),!0)},dispose(){a||(a=!0,k(),b(),s=!1,m(),w(),d.clear(),l.clear())}}}var Eg=["slots","locale","remote","uiSession"];function Tg(e){let n=xd(),t=ld(void 0,{observe:n.internal});t.enableAutomaticReads();let o=ud();e.inject(["whaleFloatingLayout"],v=>{v.effect(()=>o.useLayoutService(v.whaleFloatingLayout),"whale-voice: optional magnetic layout")});let i=fd(),r=dd(window,{onResize:v=>o.fit(v)}),s,a=()=>{};e.effect(()=>{let v=()=>{t.setReadVisibility(document.visibilityState!=="hidden"),document.visibilityState!=="hidden"&&(t.refresh(),s?.refresh(),a())};return window.addEventListener("focus",v),window.addEventListener("online",v),document.addEventListener("visibilitychange",v),v(),()=>{window.removeEventListener("focus",v),window.removeEventListener("online",v),document.removeEventListener("visibilitychange",v)}},"whale-voice: refresh visible state"),e.effect(()=>{let v=ip(e.slots,z=>e.get?.("uiWorkspace")?.openSession(z)),w,k,P=()=>{k?.(),k=null};a=()=>{if(!v.supported()){P();return}if(!w||k)return;let z=w,$=!0;k=w.subscribePresentation(W=>{v.setOverrides(W.shown),$&&($=!1,t.refresh({force:!0}))},W=>{w===z&&(P(),console.warn("\u9C7C\u5E94\u4FA7\u680F\u4F1A\u8BDD\u663E\u793A\u8FDE\u63A5\u4E2D\u65AD",W?.message??W))})};let M=v.subscribe(a),B=!1;s=as(async()=>{let z=B?"ui-reconnect":"ui-connect";n.internal(z,"requested");try{let $=await gd(e,n.internal);return n.internal(z,"finished","ok"),$}catch($){throw B=!0,n.internal(z,"finished","failed"),$}},{visible:()=>t.getSnapshot().readVisible!==!1,onReady:z=>{P(),w=z,n.attach(z),t.attachConversationClient(z),a()},onError:z=>t.conversationUnavailable(z)});let E=t.getSnapshot().readVisible,T=t.subscribe(()=>{let z=t.getSnapshot().readVisible;z!==E&&(E=z,s.visibilityChanged())});return s.start(),()=>{a=()=>{},P(),M(),v.dispose(),T(),n.dispose(),s.dispose(),t.dispose()}},"whale-voice: private conversation stream"),e.effect(()=>()=>{t.dispose(),r.dispose(),o.dispose(),i.dispose()},"whale-ear-ui: state and geometry"),e.effect(()=>e.locale.register("whaleEar",{en:op,zh:tp}),"whale-ear-ui: dictionaries"),e.effect(()=>{let v=document.createElement("style");return v.dataset.plugin="dsh-whale-ear-ui",v.textContent=h.text+Rd+is,document.head.append(v),()=>v.remove()},"whale-ear-ui: stylesheet");let d=async v=>{let w=e.get?.("sessions");if(!w)throw new Error("DSH \u4F1A\u8BDD\u754C\u9762\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");return w.list.getSnapshot().byId[v]||await w.refresh(),w},l=0,u=async v=>{let w=++l;if(v.kind==="root"&&await d(v.id),w!==l)return;let k=e.get?.("uiWorkspace");if(!k?.openSession)throw new Error("DSH \u4F1A\u8BDD\u754C\u9762\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");return k.openSession(v.kind==="root"?v.id:{childSessionId:v.id,parentSessionId:v.parentId,mode:v.mode??"unknown"})},p=v=>u({kind:"root",id:v}),m={subscribe(v){let w=[e.uiSession.adapter?.current?.subscribe(v),e.get?.("layout")?.panelInfo?.subscribe(v),e.get?.("sessions")?.list?.subscribe?.(v)];return()=>w.forEach(k=>k?.())},selectedSession(){let v=e.uiSession.adapter?.current?.getSnapshot();return v?.hooks?.session?.getSnapshot()?.blank===!0?null:v?.props?.sessionId??null},currentConversation(){return e.get?.("layout")?.panelInfo?.getSnapshot()?.activePanelId===null?m.selectedSession():null},sourceFor(v){if(!v)return null;let w=e.get?.("sessions"),k=w?.list?.getSnapshot()?.byId?.[v];return w?.subagentAddress?.(v)||k?.origin==="subagent"||k?.parentId?null:v}},f=async(v,w)=>{let P=await(await d(v)).using(v,{source:"workspaceOperation"},M=>M.binding.session.rename(w));if(!P.ok)throw new Error(P.error.message);return P.value.title},b=()=>({captureBindings:t.captureBindings,refreshModelCompute:t.refreshModelCompute,pickPath:t.pickPath,readState:t.getSnapshot,markSettingsEdited:t.markSettingsEdited,discardSettingsDraft:t.discardSettingsDraft,openAuthorization:t.openAuthorization,closeAuthorization:t.closeAuthorization,saveAuthorization:t.saveAuthorization,readOperationLog:t.readOperationLog,manageSessions:t.manageSessions,listExistingVoiceSessions:t.listExistingVoiceSessions,setExistingVoiceSession:t.setExistingVoiceSession,setSettingsTab:t.setSettingsTab,setSettingsModelTab:t.setSettingsModelTab,setSessionManagement:t.setSessionManagement,senseVoiceAsrAction:t.senseVoiceAsrAction,updateAction:t.updateAction,dismissUpdate:t.dismissUpdate,openExistingVoiceSession:p,openManagedSession:u,renameManagedSession:f,hooks:{whaleUi:t,whalePreferences:i},setMotion:v=>i.setMotion(v),setAssistantName:v=>i.setAssistantName(v),run:(...v)=>t.run(...v),setSession:v=>t.setSession(v),cancelPreview:()=>t.cancelPreview(),discardDiagnostics:()=>t.discardDiagnostics(),dismissSetup:()=>t.dismissSetup(),openSetup:()=>t.openSetup(),showHome:()=>t.showHome(),openSettings:t.openSettings,refresh:v=>t.refresh(v)});e.slots.inject("shell.overlay",()=>e.slots.register({name:"shell.overlay",id:"whale-ear",locale:"whaleEar",inject:()=>({geometry:o,sizing:r,recordUserOperation:n.user,setPanelVisible:t.setPanelVisible,closeAuthorization:t.closeAuthorization,refresh:v=>t.refresh(v),showHome:()=>t.showHome(),dismissSetup:()=>t.dismissSetup(),hooks:{whaleUi:t,whalePreferences:i}}),children:{"whale-ear.panel.controls":{kind:"single",scope:"root"}}},Xd)),e.slots.inject("whale-ear.panel.controls",()=>e.slots.register({name:"whale-ear.panel.controls",locale:"whaleEar",inject:()=>({...b(),controlContext:m,retryVoiceTranscript:t.retryVoiceTranscript})},Kd))}
return module.exports;}});
