window.__ModuleLoader__.load({id:"dsh-whale-ear-ui",factory:(require)=>{var module={exports:{}};var exports=module.exports;
var Gr=Object.defineProperty;var cp=Object.getOwnPropertyDescriptor;var lp=Object.getOwnPropertyNames;var up=Object.prototype.hasOwnProperty;var ns=(e,n)=>{for(var t in n)Gr(e,t,{get:n[t],enumerable:!0})},dp=(e,n,t,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let i of lp(n))!up.call(e,i)&&i!==t&&Gr(e,i,{get:()=>n[i],enumerable:!(o=cp(n,i))||o.enumerable});return e};var pp=e=>dp(Gr({},"__esModule",{value:!0}),e);var _g={};ns(_g,{apply:()=>yg,inject:()=>bg});module.exports=pp(_g);var Ft=require("react");var An={toggleTrack:"_0prjTG_toggleTrack",rail:"_0prjTG_rail",collapse:"_0prjTG_collapse",fill:"_0prjTG_fill",range:"_0prjTG_range",input:"_0prjTG_input",toggle:"_0prjTG_toggle",collapseInner:"_0prjTG_collapseInner",thumb:"_0prjTG_thumb",text:`._0prjTG_range {
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

._0prjTG_rail {
  background: var(--dsw-alias-border-l2, #8791a4);
  pointer-events: none;
  border-radius: 999px;
  height: 6px;
  position: absolute;
  inset: 13px 9px;
  min-width: 0 !important;
  margin: 0 !important;
}

._0prjTG_fill {
  width: var(--whale-range-position);
  background: var(--dsw-alias-brand-primary, #8ba9e7);
  border-radius: inherit;
  transition: width var(--whale-duration, .2s) var(--whale-ease, ease-out);
  position: absolute;
  inset: 0 auto 0 0;
  min-width: 0 !important;
  margin: 0 !important;
}

._0prjTG_thumb {
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

._0prjTG_range ._0prjTG_input {
  opacity: 0;
  cursor: pointer;
  touch-action: pan-y;
  height: 32px;
  margin: 0;
  position: absolute;
  inset: 0;
  width: 100% !important;
}

._0prjTG_range:focus-within {
  outline: 2px solid var(--dsw-focus-ring-color, #8ba9e7);
  outline-offset: 2px;
  border-radius: 6px;
}

._0prjTG_range:hover ._0prjTG_thumb {
  box-shadow: 0 0 0 4px color-mix(in srgb,var(--dsw-alias-brand-primary, #8ba9e7) 18%,transparent);
}

._0prjTG_range[data-dragging] :is(._0prjTG_thumb, ._0prjTG_fill) {
  transition-duration: 40ms;
  transition-timing-function: linear;
}

._0prjTG_range[data-disabled], ._0prjTG_toggle[data-disabled] {
  opacity: .5;
}

._0prjTG_range[data-disabled] ._0prjTG_input {
  cursor: not-allowed;
}

._0prjTG_collapse {
  opacity: 0;
  visibility: hidden;
  grid-template-rows: 0fr;
  transition: grid-template-rows .16s ease-out, opacity .12s ease-out, visibility .16s;
  display: grid;
}

._0prjTG_collapse[data-open="true"] {
  opacity: 1;
  visibility: visible;
  grid-template-rows: 1fr;
}

._0prjTG_collapseInner {
  min-height: 0;
  overflow: hidden;
}

._0prjTG_toggle {
  cursor: pointer;
  align-items: center;
  gap: 8px;
  width: fit-content;
  max-width: 100%;
  font-size: 12px;
  display: flex;
  position: relative;
}

._0prjTG_toggle > input {
  opacity: 0;
  width: 38px;
  height: 24px;
  margin: 0;
  position: absolute;
}

._0prjTG_toggleTrack {
  pointer-events: none;
  background: var(--dsw-alias-border-l2, #8791a4);
  width: 36px;
  height: 22px;
  transition: background-color var(--whale-duration, .2s);
  border-radius: 999px;
  flex: none;
  position: relative;
}

._0prjTG_toggleTrack > span {
  background: var(--dsw-alias-bg-layer-1, #fff);
  width: 16px;
  height: 16px;
  transition: left var(--whale-duration, .2s) var(--whale-ease, ease-out);
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
}

._0prjTG_toggle > input:checked + ._0prjTG_toggleTrack {
  background: var(--dsw-alias-brand-primary, #8ba9e7);
}

._0prjTG_toggle > input:checked + ._0prjTG_toggleTrack > span {
  left: 17px;
}

._0prjTG_toggle > input:focus-visible + ._0prjTG_toggleTrack {
  outline: 2px solid var(--dsw-focus-ring-color, #8ba9e7);
  outline-offset: 2px;
}

[data-motion="firm"] :is(._0prjTG_range, ._0prjTG_toggle, ._0prjTG_collapse) {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="firm"] ._0prjTG_collapse {
  transition-duration: .1s;
}

[data-motion="off"] :is(._0prjTG_range, ._0prjTG_toggle, ._0prjTG_collapse), [data-motion="off"] :is(._0prjTG_range, ._0prjTG_toggle, ._0prjTG_collapse) * {
  transition: none !important;
  animation: none !important;
}

@media (prefers-reduced-motion: reduce) {
  ._0prjTG_range, ._0prjTG_toggle, ._0prjTG_collapse, ._0prjTG_range *, ._0prjTG_toggle *, ._0prjTG_collapse * {
    transition: none !important;
    animation: none !important;
  }
}

@media (forced-colors: active) {
  ._0prjTG_range ._0prjTG_input {
    opacity: 1;
    position: relative;
  }

  ._0prjTG_rail {
    display: none;
  }

  ._0prjTG_toggleTrack {
    border: 1px solid buttontext;
  }

  ._0prjTG_toggleTrack > span {
    background: buttontext;
  }

  ._0prjTG_toggle > input:checked + ._0prjTG_toggleTrack {
    background: highlight;
  }
}
`};var rn=require("react/jsx-runtime"),ts=An.text;function Ut({value:e,defaultValue:n=0,min:t=0,max:o=100,disabled:i,onChange:r,onPointerDown:s,onPointerUp:a,onPointerCancel:l,onLostPointerCapture:u,className:d="",style:p,...f}){let[m,b]=(0,Ft.useState)(n),[g,_]=(0,Ft.useState)(!1);(0,Ft.useEffect)(()=>{i&&_(!1)},[i]);let x=Number(e??m),S=Number(t),Z=Number(o),D=Z>S&&Number.isFinite(x)?Math.max(0,Math.min(1,(x-S)/(Z-S))):0,G=N=>B=>{_(!1),N?.(B)};return(0,rn.jsxs)("span",{className:An.range,"data-whale-motion-range":!0,"data-dragging":g&&!i||void 0,"data-disabled":i||void 0,style:{"--whale-range-position":`${D*100}%`},children:[(0,rn.jsxs)("span",{className:An.rail,"aria-hidden":"true",children:[(0,rn.jsx)("span",{className:An.fill}),(0,rn.jsx)("span",{className:An.thumb})]}),(0,rn.jsx)("input",{...f,className:`${An.input} ${d}`,style:p,type:"range",min:t,max:o,value:e??m,disabled:i,onChange:N=>{i||(e===void 0&&b(N.target.value),r?.(N))},onPointerDown:N=>{i||_(!0),s?.(N)},onPointerUp:G(a),onPointerCancel:G(l),onLostPointerCapture:G(u),onBlur:N=>{_(!1),f.onBlur?.(N)}})]})}function os({open:e,children:n,className:t="",...o}){return(0,rn.jsx)("div",{...o,className:`${An.collapse} ${t}`,"data-open":!!e,"aria-hidden":!e,inert:e?void 0:"",children:(0,rn.jsx)("div",{className:An.collapseInner,children:n})})}function Lt({label:e,checked:n,disabled:t,onChange:o,...i}){return(0,rn.jsxs)("label",{className:An.toggle,"data-disabled":t||void 0,children:[(0,rn.jsx)("input",{...i,type:"checkbox",role:"switch",checked:n,disabled:t,onChange:r=>o?.(r.target.checked)}),(0,rn.jsx)("span",{className:An.toggleTrack,"aria-hidden":"true",children:(0,rn.jsx)("span",{})}),(0,rn.jsx)("span",{children:e})]})}function rs(e,{onReady:n,onError:t,visible:o=()=>!0,schedule:i=setTimeout,unschedule:r=clearTimeout}={}){let s=!1,a=!1,l=!1,u=null,d=0,p=null,f=()=>{u!==null&&r(u),u=null},m=async()=>{if(!(s||a||l||!o())){f(),a=!0;try{let b=await e();if(s){await b.dispose();return}try{n(b)}catch(g){throw await b.dispose(),g}p=b,l=!0,d=0}catch(b){if(s)return;t(b),d++,o()&&(u=i(()=>{u=null,m()},Math.min(3e4,750*2**Math.min(d-1,6))),u?.unref?.())}finally{a=!1}}};return{start:m,visibilityChanged(){o()?m():f()},refresh(){m()},dispose(){s=!0,f(),p?.dispose()}}}function Vt(e){return e===null||e&&typeof e=="object"&&!Array.isArray(e)&&Object.keys(e).sort().join(",")==="backend,id,name"&&["winmm","portaudio"].includes(e.backend)&&typeof e.id=="string"&&e.id.length>0&&e.id.length<=1024&&typeof e.name=="string"&&e.name.trim().length>0&&e.name.length<=256&&!/[\u0000-\u001f\u007f]/.test(e.id+e.name)}function is(e){return e&&e.schema===1&&["input","output"].every(n=>{let t=e[n];return!t||!["available","empty","unavailable"].includes(t.status)||!Array.isArray(t.items)||t.items.length>128||!(t.reason===null||typeof t.reason=="string"&&t.reason.length<=128)?!1:t.items.every(o=>o!==null&&Vt(o))&&new Set(t.items.map(o=>o.backend+":"+o.id)).size===t.items.length&&(t.status==="available"?t.items.length>0:t.items.length===0)})}var xt=Object.freeze(["ptt","always","wake"]),zo=e=>({ptt:"pttMode",always:"alwaysMode",wake:"wakeMode"})[e]??"modeUnknown",ss=e=>["waiting","listening"].includes(e?.state)&&e?.streamOpen!==!0?"unknown":{disabled:"wakeDisabled",starting:"wakeStarting",waiting:"wakeWaiting",listening:"wakeListening",paused:"wakePaused",error:"wakeError"}[e?.state]??"unknown",as=e=>e!==null&&typeof e=="object"&&!Array.isArray(e)&&["disabled","starting","waiting","listening","paused","error"].includes(e.state)&&(e.deadlineAt===null||Number.isFinite(e.deadlineAt)&&e.deadlineAt>=0)&&typeof e.streamOpen=="boolean"&&["asr-after-utterance","acoustic-after-utterance"].includes(e.detection),cs=e=>[...new Set(String(e).split(/[,，\n]/).map(n=>n.trim()).filter(Boolean))],Co=e=>Array.isArray(e)&&e.length>=1&&e.length<=8&&new Set(e.map(n=>typeof n=="string"?n.toLowerCase():n)).size===e.length&&e.every(n=>typeof n=="string"&&n.trim()===n&&n.length>=2&&n.length<=24&&!/[\p{C}]/u.test(n)&&/[\p{L}\p{N}]/u.test(n));function ls(e){if(!e||typeof e!="object"||Array.isArray(e)||!["unknown","available","empty","unavailable"].includes(e.status)||!Array.isArray(e.items)||e.items.length>128)return!1;if(e.status==="unknown")return e.observedAt===null&&e.items.length===0;if(!Number.isFinite(e.observedAt)||e.observedAt<0)return!1;if(e.status!=="available")return e.items.length===0;let n=new Set;return e.items.length>0&&e.items.every(t=>!t||typeof t!="object"||Array.isArray(t)||!Number.isSafeInteger(t.index)||t.index<0||n.has(t.index)||typeof t.name!="string"||!t.name.trim()||t.name.length>256||/[\u0000-\u001f\u007f]/.test(t.name)?!1:(n.add(t.index),!0))}var ce={};ns(ce,{BIGINT_FORMAT_RANGES:()=>To,CONSTANT_CATCH:()=>ys,Class:()=>Er,NUMBER_FORMAT_RANGES:()=>jt,aborted:()=>Sn,allowsEval:()=>Mr,assert:()=>bp,assertEqual:()=>mp,assertIs:()=>gp,assertNever:()=>vp,assertNotEqual:()=>fp,assignProp:()=>dn,attachSchema:()=>Qt,base64ToUint8Array:()=>vs,base64urlToUint8Array:()=>Op,cached:()=>St,captureStackTrace:()=>Go,cleanEnum:()=>$p,cleanRegex:()=>Ht,clone:()=>qn,cloneDef:()=>wp,codePointLength:()=>Wt,constantCatch:()=>_s,createTransparentProxy:()=>Bp,defineLazy:()=>Or,defineLazyInternal:()=>ge,derived:()=>Zp,esc:()=>Rr,escapeRegex:()=>Mn,explicitlyAborted:()=>Ur,extend:()=>Pp,finalizeIssue:()=>Bn,floatSafeRemainder:()=>$r,getElementAtPath:()=>xp,getEnumValues:()=>At,getLengthableOrigin:()=>Kt,getParsedType:()=>Sp,getSizableOrigin:()=>gs,hexToUint8Array:()=>Dp,hide:()=>$o,installLazyProp:()=>Vp,isObject:()=>dt,isPlainObject:()=>Xn,issue:()=>zt,joinValues:()=>Po,jsonStringifyReplacer:()=>qt,members:()=>Vr,merge:()=>Np,mergeDefs:()=>Dn,normalizeParams:()=>ie,nullish:()=>Ir,numKeys:()=>qp,objectClone:()=>yp,omit:()=>Cp,optionalKeys:()=>Fr,own:()=>Jn,parsedType:()=>Lr,partial:()=>Tp,pick:()=>zp,prefixIssues:()=>Zn,primitiveTypes:()=>fs,promiseAllObject:()=>kp,propertyKeyTypes:()=>Zr,randomString:()=>Ap,rawShape:()=>Bt,required:()=>Ep,safeExtend:()=>Gp,shallowClone:()=>ms,sizeCaps:()=>Io,slugify:()=>Dr,stringifyPrimitive:()=>No,toZod:()=>hp,uint8ArrayToBase64:()=>bs,uint8ArrayToBase64url:()=>Rp,uint8ArrayToHex:()=>Mp,unwrapMessage:()=>kt});function mp(e){return e}function fp(e){return e}function hp(){return e=>e}function gp(e){}function vp(e){throw new Error("Unexpected value in exhaustive check")}function bp(e){}function At(e){let n=Object.values(e).filter(o=>typeof o=="number");return Object.entries(e).filter(([o,i])=>n.indexOf(+o)===-1).map(([o,i])=>i)}function Po(e,n="|"){return e.map(t=>No(t)).join(n)}function qt(e,n){return typeof n=="bigint"?n.toString():n}var Tr=class{constructor(n){this._getter=n,this._value=void 0}get value(){let n=this._getter;return n!==void 0&&(this._value=n(),this._getter=void 0),this._value}};function St(e){return new Tr(e)}function Ir(e){return e==null}function Ht(e){let n=e.startsWith("^")?1:0,t=e.endsWith("$")?e.length-1:e.length;return e.slice(n,t)}function $r(e,n){let t=e/n,o=Math.round(t),i=4*Number.EPSILON*Math.max(Math.abs(t),1);return Math.abs(t-o)<i?0:t-o}var us=Symbol("evaluating");function Or(e,n,t){let o;Object.defineProperty(e,n,{get(){if(o!==us)return o===void 0&&(o=us,o=t()),o},set(i){Object.defineProperty(e,n,{value:i})},configurable:!0})}function yp(e){return Object.create(Object.getPrototypeOf(e),Object.getOwnPropertyDescriptors(e))}function dn(e,n,t){Object.defineProperty(e,n,{value:t,writable:!0,enumerable:!0,configurable:!0})}function Bt(e){let n=Object.getOwnPropertyDescriptor(e,"shape");return n?.get?n.get.raw:n?.value}function Rn(e){return Bt(e._zod.def)??e._zod.def.shape}function ds(e,n,t){Object.defineProperty(e,n,{get(){let o=t();return dn(this,n,o),o},enumerable:!0,configurable:!0})}function ps(e,n,t){n in e?dn(e,n,t):e[n]=t}function ut(e,n,t,o){let i=Rn(n);for(let r of t){let s=Object.getOwnPropertyDescriptor(i,r);s.enumerable&&(s.get?ds(e,r,()=>{let a=n._zod.def.shape[r];return o?o(a,r):a}):ps(e,r,o?o(s.value,r):s.value))}}function _p(e,n){for(let t of Reflect.ownKeys(n)){let o=Object.getOwnPropertyDescriptor(n,t);o.enumerable&&(o.get?ds(e,t,()=>n[t]):ps(e,t,o.value))}}function Dn(...e){let n={};for(let t of e){let o=Object.getOwnPropertyDescriptors(t);Object.assign(n,o)}return Object.defineProperties({},n)}function wp(e){return Dn(e._zod.def)}function xp(e,n){return n?n.reduce((t,o)=>t?.[o],e):e}function kp(e){let n=Object.keys(e),t=n.map(o=>e[o]);return Promise.all(t).then(o=>{let i={};for(let r=0;r<n.length;r++)i[n[r]]=o[r];return i})}function Ap(e=10){let n="abcdefghijklmnopqrstuvwxyz",t="";for(let o=0;o<e;o++)t+=n[Math.floor(Math.random()*n.length)];return t}function Rr(e){return JSON.stringify(e)}function Dr(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/[\s_-]+/g,"-").replace(/^-+|-+$/g,"")}var Go="captureStackTrace"in Error?Error.captureStackTrace:(...e)=>{};function dt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}var Mr=St(()=>{if(sn.jitless||typeof navigator<"u"&&navigator?.userAgent?.includes("Cloudflare"))return!1;try{let e=Function;return new e(""),!0}catch{return!1}});function Xn(e){if(dt(e)===!1)return!1;let n=e.constructor;if(n===void 0||typeof n!="function")return!0;let t=n.prototype;return!(dt(t)===!1||Object.prototype.hasOwnProperty.call(t,"isPrototypeOf")===!1)}function ms(e){return Xn(e)?{...e}:Array.isArray(e)?[...e]:e instanceof Map?new Map(e):e instanceof Set?new Set(e):e}function qp(e){let n=0;for(let t in e)Object.prototype.hasOwnProperty.call(e,t)&&n++;return n}var Sp=e=>{let n=typeof e;switch(n){case"undefined":return"undefined";case"string":return"string";case"number":return Number.isNaN(e)?"nan":"number";case"boolean":return"boolean";case"function":return"function";case"bigint":return"bigint";case"symbol":return"symbol";case"object":return Array.isArray(e)?"array":e===null?"null":e.then&&typeof e.then=="function"&&e.catch&&typeof e.catch=="function"?"promise":typeof Map<"u"&&e instanceof Map?"map":typeof Set<"u"&&e instanceof Set?"set":typeof Date<"u"&&e instanceof Date?"date":typeof File<"u"&&e instanceof File?"file":"object";default:throw new Error(`Unknown data type: ${n}`)}},Zr=new Set(["string","number","symbol"]),fs=new Set(["string","number","bigint","boolean","symbol","undefined"]);function Mn(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function qn(e,n,t){let o=new e._zod.constr(n??e._zod.def);return(!n||t?.parent)&&(o._zod.parent=e),o}function ie(e){let n=e;if(!n)return{};if(typeof n=="string")return{error:()=>n};if(n?.message!==void 0){if(n?.error!==void 0)throw new Error("Cannot specify both `message` and `error` params");n.error=n.message}return delete n.message,typeof n.error=="string"?{...n,error:()=>n.error}:n}function Bp(e){let n;return new Proxy({},{get(t,o,i){return n??(n=e()),Reflect.get(n,o,i)},set(t,o,i,r){return n??(n=e()),Reflect.set(n,o,i,r)},has(t,o){return n??(n=e()),Reflect.has(n,o)},deleteProperty(t,o){return n??(n=e()),Reflect.deleteProperty(n,o)},ownKeys(t){return n??(n=e()),Reflect.ownKeys(n)},getOwnPropertyDescriptor(t,o){return n??(n=e()),Reflect.getOwnPropertyDescriptor(n,o)},defineProperty(t,o,i){return n??(n=e()),Reflect.defineProperty(n,o,i)}})}function No(e){return typeof e=="bigint"?e.toString()+"n":typeof e=="string"?`"${e}"`:`${e}`}function Fr(e){return Object.keys(e).filter(n=>e[n]._zod.optin!==void 0&&e[n]._zod.optout==="optional")}var jt={safeint:[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],int32:[-2147483648,2147483647],uint32:[0,4294967295],float32:[-34028234663852886e22,34028234663852886e22],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]},To={int64:[BigInt("-9223372036854775808"),BigInt("9223372036854775807")],uint64:[BigInt(0),BigInt("18446744073709551615")]};function zp(e,n){let t=e._zod.def,o=t.checks;if(o&&o.length>0)throw new Error(".pick() cannot be used on object schemas containing refinements");let r={};return ut(r,e,Eo(e,n)),qn(e,Dn(t,{shape:r,checks:[]}))}function Eo(e,n){let t=Rn(e),o=[];for(let i of Reflect.ownKeys(n)){if(!Object.getOwnPropertyDescriptor(t,i)?.enumerable)throw new Error(`Unrecognized key: "${String(i)}"`);n[i]&&o.push(i)}return o}function Cp(e,n){let t=e._zod.def,o=t.checks;if(o&&o.length>0)throw new Error(".omit() cannot be used on object schemas containing refinements");let r=new Set(Eo(e,n)),s={};return ut(s,e,Reflect.ownKeys(Rn(e)).filter(a=>!r.has(a))),qn(e,Dn(t,{shape:s,checks:[]}))}function Pp(e,n){if(!Xn(n))throw new Error("Invalid input to extend: expected a plain object");let t=e._zod.def.checks;if(t&&t.length>0){let i=Rn(e);for(let r of Reflect.ownKeys(n))if(Object.getOwnPropertyDescriptor(i,r)!==void 0)throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.")}return qn(e,Dn(e._zod.def,{shape:hs(e,n)}))}function hs(e,n){let t={};return ut(t,e,Reflect.ownKeys(Rn(e))),_p(t,n),t}function Gp(e,n){if(!Xn(n))throw new Error("Invalid input to safeExtend: expected a plain object");return qn(e,Dn(e._zod.def,{shape:hs(e,n)}))}function Np(e,n){if(!n?._zod?.def)throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");if(e._zod.def.checks?.length)throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");let t={};ut(t,e,Reflect.ownKeys(Rn(e))),ut(t,n,Reflect.ownKeys(Rn(n)));let o=Dn(e._zod.def,{shape:t,get catchall(){return n._zod.def.catchall},checks:n._zod.def.checks??[]});return qn(e,o)}function Tp(e,n,t,o="partial"){let r=n._zod.def.checks;if(r&&r.length>0)throw new Error(`.${o}() cannot be used on object schemas containing refinements`);let a=t?new Set(Eo(n,t)):void 0,l={};return ut(l,n,Reflect.ownKeys(Rn(n)),e&&((u,d)=>a&&!a.has(d)?u:new e({type:"optional",innerType:u}))),qn(n,Dn(n._zod.def,{shape:l,checks:[]}))}function Ep(e,n,t){let o=t?new Set(Eo(n,t)):void 0,i={};return ut(i,n,Reflect.ownKeys(Rn(n)),(r,s)=>o&&!o.has(s)?r:new e({type:"nonoptional",innerType:r})),qn(n,Dn(n._zod.def,{shape:i}))}function Sn(e,n=0){if(e.aborted===!0)return!0;for(let t=n;t<e.issues.length;t++)if(e.issues[t]?.continue!==!0)return!0;return!1}function Ur(e,n=0){if(e.aborted===!0)return!0;for(let t=n;t<e.issues.length;t++)if(e.issues[t]?.continue===!1)return!0;return!1}function Zn(e,n){return n.map(t=>{var o;return(o=t).path??(o.path=[]),t.path.unshift(e),t})}function kt(e){return typeof e=="string"?e:e?.message}function Io(e){let n=[];for(let t of e??[]){let o=t._zod.def;if(!/_(length|size)$|_equals$/.test(o.check))break;let i=o.maximum??o.length??o.size;i>=0&&n.push([i,t])}return n}function Qt(e,n,t){var o;for(let i=n;i<e.length;i++)(o=e[i]).schema??(o.schema=t)}function Bn(e,n,t){var o;let i=e.inst?._zod?.traits;i?.has("$ZodType")&&(i.has("$ZodCheck")?(o=e).schema??(o.schema=e.inst):e.schema=e.inst);let r=e.schema!==e.inst?e.schema?._zod.def?.error:void 0,s=e.message?e.message:kt(e.inst?._zod.def?.error?.(e))??kt(r?.(e))??kt(n?.error?.(e))??kt(t.customError?.(e))??kt(t.localeError?.(e))??"Invalid input",a={};for(let l of Object.keys(e))l==="inst"||l==="schema"||l==="continue"||l==="input"||l==="__proto__"||(a[l]=e[l]);return a.path??(a.path=[]),a.message=s,n?.reportInput&&(a.input=e.input),a}function gs(e){return e instanceof Set?"set":e instanceof Map?"map":e instanceof File?"file":"unknown"}var Ip=/[\uD800-\uDBFF]/;function Wt(e){let n=e.length;if(!Ip.test(e))return n;let t=n;for(let o=0;o<n-1;o++)(e.charCodeAt(o)&64512)===55296&&(e.charCodeAt(o+1)&64512)===56320&&(t--,o++);return t}function Kt(e){return Array.isArray(e)?"array":typeof e=="string"?"string":"unknown"}function Lr(e){let n=typeof e;switch(n){case"number":return Number.isNaN(e)?"nan":"number";case"object":{if(e===null)return"null";if(Array.isArray(e))return"array";let t=e;if(t&&Object.getPrototypeOf(t)!==Object.prototype&&"constructor"in t&&t.constructor)return t.constructor.name}}return n}function zt(...e){let[n,t,o]=e;return typeof n=="string"?{message:n,code:"custom",input:t,inst:o}:{...n}}function $p(e){return Object.entries(e).filter(([n,t])=>Number.isNaN(Number.parseInt(n,10))).map(n=>n[1])}function vs(e){let n=atob(e),t=new Uint8Array(n.length);for(let o=0;o<n.length;o++)t[o]=n.charCodeAt(o);return t}function bs(e){let n="";for(let t=0;t<e.length;t++)n+=String.fromCharCode(e[t]);return btoa(n)}function Op(e){let n=e.replace(/-/g,"+").replace(/_/g,"/"),t="=".repeat((4-n.length%4)%4);return vs(n+t)}function Rp(e){return bs(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}function Dp(e){let n=e.replace(/^0x/,"");if(n.length%2!==0)throw new Error("Invalid hex string length");let t=new Uint8Array(n.length/2);for(let o=0;o<n.length;o+=2)t[o/2]=Number.parseInt(n.slice(o,o+2),16);return t}function Mp(e){return Array.from(e).map(n=>n.toString(16).padStart(2,"0")).join("")}var Er=class{constructor(...n){}};function Vr(e,n){for(let t in n){let o=Object.getOwnPropertyDescriptor(n,t);o.get?Object.defineProperty(e,t,{...o,enumerable:!1}):Fp(e,t,o.value)}}function Jn(e,n,t,o=!0){return Object.defineProperty(e,n,{configurable:!0,writable:!0,enumerable:o,value:t}),t}function $o(e,n,t){return Jn(e,n,t,!1)}function Zp(e,n){for(let t in e){let o=e[t];Object.defineProperty(n,t,{configurable:!0,enumerable:!0,get(){return Jn(this,t,o(this))},set(i){Jn(this,t,i)}})}return n}function Fp(e,n,t){Object.defineProperty(e,n,{configurable:!0,get(){return this==null?t:Jn(this,n,t.bind(this))},set(o){Jn(this,n,o)}})}function Up(e,n){let t=Object.getPrototypeOf(e);return n in t?void 0:t}var Nr,Kn=!1,Lp={configurable:!0,get(){Kn=!0}};function ge(e,n,t){let o=Object.getPrototypeOf(e._zod);if(n in o&&Nr!==e._zod){Nr=void 0;return}Nr=e._zod,Object.defineProperty(o,n,{configurable:!0,get(){Object.defineProperty(this,n,Lp);let i=Kn;Kn=!1;try{let r=t(this);return Kn?delete this[n]:Object.defineProperty(this,n,{configurable:!0,writable:!0,value:r}),Kn=Kn||i,r}catch(r){throw delete this[n],Kn=Kn||i,r}},set(i){Object.defineProperty(this,n,{configurable:!0,writable:!0,value:i})}})}function Vp(e,n,t,o){let i=Up(e,n);i&&Object.defineProperty(i,n,{configurable:!0,get(){let r={configurable:!0,writable:!0,enumerable:o,value:void 0};return Object.defineProperty(this,n,r),r.value=t(this),Object.defineProperty(this,n,r),r.value},set(r){Object.defineProperty(this,n,{configurable:!0,writable:!0,enumerable:o,value:r})}})}var ys="~constantCatch";function _s(e){let n=()=>e;return n[ys]=!0,n}var ws;var Hr={value:void 0,enumerable:!1},xs="captureStackTrace"in Error?Error:null;function Hp(e){let n=xs;if(n){let t=n.stackTraceLimit;if(typeof t=="number"){try{n.stackTraceLimit=0}catch{return xs=null,new e}try{return new e}finally{n.stackTraceLimit=t}}}return new e}function E(e,n,t,o){let i={};function r(f){this.def=f,this.constr=p,this.traits=new Set}r.prototype=i;let s=t,a=s&&new WeakSet;function l(f,m){if(f._zod){if(f._zod.traits.has(e))return}else{Hr.value=new r(m);try{Object.defineProperty(f,"_zod",Hr)}finally{Hr.value=void 0}}if(f._zod.traits.add(e),n(f,m),a){let g=Object.getPrototypeOf(f),_=f._zod.constr.prototype,x=g;for(;x&&x!==_;)x=Object.getPrototypeOf(x);let S=x??g;a.has(S)||(a.add(S),Vr(S,s))}let b=p.prototype;for(let g in b)Object.prototype.hasOwnProperty.call(b,g)&&(g in f||(f[g]=b[g].bind(f)))}let u=o?.Parent??Object;class d extends u{}Object.defineProperty(d,"name",{value:e});function p(f){let m=o?.Parent?Hp(d):this;l(m,f);let b=m._zod.deferred;if(b){for(let _ of b)_();m._zod.deferred=void 0}let g=globalThis.__zod_globalConfig?.postProcessor;return g&&g(m),m}return Object.defineProperty(p,"init",{value:l}),Object.defineProperty(p,Symbol.hasInstance,{value:f=>o?.Parent&&f instanceof o.Parent?!0:f?._zod?.traits?.has(e)}),Object.defineProperty(p,"name",{value:e}),p}var zn=class extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}},Ct=class extends Error{constructor(n){super(`Encountered unidirectional transform during encode: ${n}`),this.name="ZodEncodeError"}};(ws=globalThis).__zod_globalConfig??(ws.__zod_globalConfig={});var sn=globalThis.__zod_globalConfig;function pn(e){return e&&Object.assign(sn,e),sn}function jp(){let e=this._zod;return e.message??(e.message=JSON.stringify(e.def,qt,2)),e.message}function Qp(e){this._zod.message=e}var Wp={get:jp,set:Qp,enumerable:!0,configurable:!0},Qr={value:void 0,enumerable:!1},ks=new WeakSet([Object.prototype,Error.prototype]),As=(e,n)=>{e.name="$ZodError",Qr.value=n,Object.defineProperty(e,"issues",Qr),Qr.value=void 0,Object.defineProperty(e,"message",Wp);let t=Object.getPrototypeOf(e);ks.has(t)||(ks.add(t),Object.defineProperty(t,"toString",{configurable:!0,enumerable:!1,get(){let o=()=>this.message;return Object.defineProperty(this,"toString",{value:o,configurable:!0,writable:!0}),o},set(o){Object.defineProperty(this,"toString",{value:o,configurable:!0,writable:!0})}}))},qs=E("$ZodError",As),Ng=E("$ZodError",As,void 0,{Parent:Error});function Kp(e,n,t){return Object.prototype.hasOwnProperty.call(e,n)||(n==="__proto__"?Object.defineProperty(e,n,{value:t(),writable:!0,enumerable:!0,configurable:!0}):e[n]=t()),e[n]}function Ss(e,n=t=>t.message){let t={},o=[];for(let i of e.issues)i.path.length>0?Kp(t,i.path[0],()=>[]).push(n(i)):o.push(n(i));return{formErrors:o,fieldErrors:t}}function Bs(e,n=t=>t.message){let t={_errors:[]},o=(i,r=[])=>{for(let s of i.issues)if(s.code==="invalid_union"&&s.errors.length)s.errors.map(a=>o({issues:a},[...r,...s.path]));else if(s.code==="invalid_key")o({issues:s.issues},[...r,...s.path]);else if(s.code==="invalid_element")o({issues:s.issues},[...r,...s.path]);else{let a=[...r,...s.path];if(a.length===0)t._errors.push(n(s));else{let l=t,u=0;for(;u<a.length;){let d=a[u],p=u===a.length-1;if(d==="_errors"){p&&l._errors.push(n(s)),u++;continue}Object.prototype.hasOwnProperty.call(l,d)||Object.defineProperty(l,d,{value:{_errors:[]},enumerable:!0,writable:!0,configurable:!0});let f=l[d];p&&f._errors.push(n(s)),l=f,u++}}}};return o(e),t}function Oo(e,n){return{callee:n?.callee??e,Err:n?.Err}}var Ro=e=>{let n=(t,o,i,r)=>{let s=i?{...i,async:!1}:{async:!1},a=t._zod.run({value:o,issues:[]},s);if(a instanceof Promise)throw new zn;if(a.issues.length){let l=new(r?.Err??e)(a.issues.map(u=>Bn(u,s,pn())));throw Go(l,r?.callee??n),l}return a.value};return n};var Do=e=>{let n=async(t,o,i,r)=>{let s=i?{...i,async:!0}:{async:!0},a=t._zod.run({value:o,issues:[]},s);if(a instanceof Promise&&(a=await a),a.issues.length){let l=new(r?.Err??e)(a.issues.map(u=>Bn(u,s,pn())));throw Go(l,r?.callee??n),l}return a.value};return n};var Mo=e=>(n,t,o)=>{let i=o?{...o,async:!1}:{async:!1},r=n._zod.run({value:t,issues:[]},i);if(r instanceof Promise)throw new zn;return r.issues.length?zs(e,r.issues,i):{success:!0,data:r.value}};function zs(e,n,t){let o;return{success:!1,get error(){return o||(o=new e(n.map(i=>Bn(i,t,pn()))),n=void 0,t=void 0),o},set error(i){o=i,n=void 0,t=void 0}}}var Zo=e=>async(n,t,o)=>{let i=o?{...o,async:!0}:{async:!0},r=n._zod.run({value:t,issues:[]},i);return r instanceof Promise&&(r=await r),r.issues.length?zs(e,r.issues,i):{success:!0,data:r.value}};var Jp=Symbol.for("zod.compile.invalid"),Xp=Symbol.for("zod.compile.fallback"),Wr=((e,n,t)=>{let o=e._zod.bag.validator;if(o!==void 0){if(o(n)!==Jp)return!0;if(o.definite===!0&&t===void 0)return!1}return Yp(e,n,t)});function Yp(e,n,t){let o=t?{...t,async:!1,abortEarly:!0}:{async:!1,abortEarly:!0},i=e._zod.bag.fallbackRun,r;if(i?(o[Xp]=!0,r=i({value:n,issues:[]},o)):r=e._zod.run({value:n,issues:[]},o),r instanceof Promise)throw new zn;return r.issues.length===0}var Kr=async(e,n,t)=>{let o=t?{...t,async:!0,abortEarly:!0}:{async:!0,abortEarly:!0},i=e._zod.run({value:n,issues:[]},o);return i instanceof Promise&&(i=await i),i.issues.length===0},Cs=e=>{let n=Ro(e),t=(o,i,r,s)=>{let a=r?{...r,direction:"backward"}:{direction:"backward"};return n(o,i,a,Oo(t,s))};return t};var Ps=e=>{let n=Ro(e),t=(o,i,r,s)=>n(o,i,r,Oo(t,s));return t};var Gs=e=>{let n=Do(e),t=async(o,i,r,s)=>{let a=r?{...r,direction:"backward"}:{direction:"backward"};return await n(o,i,a,Oo(t,s))};return t};var Ns=e=>{let n=Do(e),t=async(o,i,r,s)=>await n(o,i,r,Oo(t,s));return t};var Ts=e=>(n,t,o)=>{let i=o?{...o,direction:"backward"}:{direction:"backward"};return Mo(e)(n,t,i)};var Es=e=>(n,t,o)=>Mo(e)(n,t,o);var Is=e=>async(n,t,o)=>{let i=o?{...o,direction:"backward"}:{direction:"backward"};return Zo(e)(n,t,i)};var $s=e=>async(n,t,o)=>Zo(e)(n,t,o);var Os=/^[cC][0-9a-z]{6,}$/,Rs=/^[0-9a-z]+$/,Ds=/^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/,Ms=/^[0-9a-vA-V]{20}$/,Zs=/^[A-Za-z0-9]{27}$/,Fs=/^[a-zA-Z0-9_-]{21}$/;function Us(e){return new RegExp(`^[a-zA-Z0-9_-]{${e}}$`)}var Ls=/^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;var Vs=/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,Xr=e=>e?new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`):/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;var Hs=/^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;var em="^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";function js(){return new RegExp(em,"u")}var Qs=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,Ws=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;var Ks=/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,Js=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,Xs=/^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,Ys=/^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/;var ea=/^https?$/,na=/^\+[1-9]\d{6,14}$/;var ta="(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";function nm(e){return new RegExp(`^${e}$`)}var oa=nm(ta);function Jr(e){let n="(?:[01]\\d|2[0-3]):[0-5]\\d";return typeof e.precision=="number"?e.precision===-1?`${n}`:e.precision===0?`${n}:[0-5]\\d`:`${n}:[0-5]\\d\\.\\d{${e.precision}}`:e.seconds?`${n}:[0-5]\\d(?:\\.\\d+)?`:`${n}(?::[0-5]\\d(?:\\.\\d+)?)?`}function ra(e){return new RegExp(`^${Jr(e)}$`)}function ia(e){let n=["Z"];e.offset&&n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");let t=`${Jr({precision:e.precision,seconds:!0})}(?:${n.join("|")})`,o=e.local?`${t}|${Jr({precision:e.precision})}`:t;return new RegExp(`^${ta}T(?:${o})$`)}var sa=/^[\s\S]{0,}$/;var Yr=/^-?\d+$/,Jt=/^-?\d+(?:\.\d+)?$/,aa=/^(?:true|false)$/i,ca=/^null$/i;var la=/^[^A-Z]*$/,ua=/^[^a-z]*$/;var Qe=E("$ZodCheck",(e,n)=>{var t;e._zod??(e._zod={}),e._zod.def=n,(t=e._zod).onattach??(t.onattach=[])});var ei=e=>{let n=e.value;return!Ir(n)&&n.length!==void 0},Fo={number:"number",bigint:"bigint",object:"date"},ni=E("$ZodCheckLessThan",(e,n)=>{Qe.init(e,n);let t=Fo[typeof n.value];e._zod.check=o=>{(n.inclusive?o.value<=n.value:o.value<n.value)||o.issues.push({origin:Fo[typeof o.value]??t,code:"too_big",maximum:typeof n.value=="object"?n.value.getTime():n.value,input:o.value,inclusive:n.inclusive,inst:e,continue:!n.abort})}}),ti=E("$ZodCheckGreaterThan",(e,n)=>{Qe.init(e,n);let t=Fo[typeof n.value];e._zod.check=o=>{(n.inclusive?o.value>=n.value:o.value>n.value)||o.issues.push({origin:Fo[typeof o.value]??t,code:"too_small",minimum:typeof n.value=="object"?n.value.getTime():n.value,input:o.value,inclusive:n.inclusive,inst:e,continue:!n.abort})}}),da=E("$ZodCheckMultipleOf",(e,n)=>{Qe.init(e,n),e._zod.check=t=>{if(typeof t.value!=typeof n.value)throw new Error("Cannot mix number and bigint in multiple_of check.");(typeof t.value=="bigint"?n.value!==BigInt(0)&&t.value%n.value===BigInt(0):$r(t.value,n.value)===0)||t.issues.push({origin:typeof t.value,code:"not_multiple_of",divisor:n.value,input:t.value,inst:e,continue:!n.abort})}}),pa=E("$ZodCheckNumberFormat",(e,n)=>{Qe.init(e,n),n.format=n.format||"float64";let t=n.format?.includes("int"),o=t?"int":"number",[i,r]=jt[n.format];e._zod.check=s=>{let a=s.value;if(t){if(!Number.isInteger(a)){s.issues.push({expected:o,format:n.format,code:"invalid_type",continue:!1,input:a,inst:e});return}if(!Number.isSafeInteger(a)){a>0?s.issues.push({input:a,code:"too_big",maximum:Number.MAX_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:o,inclusive:!0,continue:!n.abort}):s.issues.push({input:a,code:"too_small",minimum:Number.MIN_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:o,inclusive:!0,continue:!n.abort});return}}a<i&&s.issues.push({origin:"number",input:a,code:"too_small",minimum:i,inclusive:!0,inst:e,continue:!n.abort}),a>r&&s.issues.push({origin:"number",input:a,code:"too_big",maximum:r,inclusive:!0,inst:e,continue:!n.abort})}});var ma=E("$ZodCheckMaxLength",(e,n)=>{var t;Qe.init(e,n),(t=e._zod.def).when??(t.when=ei),e._zod.check=o=>{let i=o.value,r=i.length;if((typeof i=="string"&&r>n.maximum?Wt(i):r)<=n.maximum)return;let a=Kt(i);o.issues.push({origin:a,code:"too_big",maximum:n.maximum,inclusive:!0,input:i,inst:e,continue:!n.abort})}}),fa=E("$ZodCheckMinLength",(e,n)=>{var t;Qe.init(e,n),(t=e._zod.def).when??(t.when=ei),e._zod.check=o=>{let i=o.value,r=i.length;if((typeof i=="string"&&r>=n.minimum&&r<n.minimum*2?Wt(i):r)>=n.minimum)return;let a=Kt(i);o.issues.push({origin:a,code:"too_small",minimum:n.minimum,inclusive:!0,input:i,inst:e,continue:!n.abort})}}),ha=E("$ZodCheckLengthEquals",(e,n)=>{var t;Qe.init(e,n),(t=e._zod.def).when??(t.when=ei),e._zod.check=o=>{let i=o.value,r=i.length,s=typeof i=="string"&&r>=n.length&&r<=n.length*2?Wt(i):r;if(s===n.length)return;let a=Kt(i),l=s>n.length;o.issues.push({origin:a,...l?{code:"too_big",maximum:n.length}:{code:"too_small",minimum:n.length},inclusive:!0,exact:!0,input:o.value,inst:e,continue:!n.abort})}}),Yt=E("$ZodCheckStringFormat",(e,n)=>{var t,o;Qe.init(e,n),n.pattern?(t=e._zod).check??(t.check=i=>{n.pattern.lastIndex=0,!n.pattern.test(i.value)&&i.issues.push({origin:"string",code:"invalid_format",format:n.format,input:i.value,...n.pattern?{pattern:n.pattern.toString()}:{},inst:e,continue:!n.abort})}):(o=e._zod).check??(o.check=()=>{})}),ga=E("$ZodCheckRegex",(e,n)=>{Yt.init(e,n),e._zod.check=t=>{n.pattern.lastIndex=0,!n.pattern.test(t.value)&&t.issues.push({origin:"string",code:"invalid_format",format:"regex",input:t.value,pattern:n.pattern.toString(),inst:e,continue:!n.abort})}}),va=E("$ZodCheckLowerCase",(e,n)=>{n.pattern??(n.pattern=la),Yt.init(e,n)}),ba=E("$ZodCheckUpperCase",(e,n)=>{n.pattern??(n.pattern=ua),Yt.init(e,n)}),ya=E("$ZodCheckIncludes",(e,n)=>{Qe.init(e,n);let t=Mn(n.includes),o=new RegExp(typeof n.position=="number"?`^.{${n.position},}${t}`:t);n.pattern=o,e._zod.check=i=>{i.value.includes(n.includes,n.position)||i.issues.push({origin:"string",code:"invalid_format",format:"includes",includes:n.includes,input:i.value,inst:e,continue:!n.abort})}}),_a=E("$ZodCheckStartsWith",(e,n)=>{Qe.init(e,n);let t=new RegExp(`^${Mn(n.prefix)}.*`);n.pattern??(n.pattern=t),e._zod.check=o=>{o.value.startsWith(n.prefix)||o.issues.push({origin:"string",code:"invalid_format",format:"starts_with",prefix:n.prefix,input:o.value,inst:e,continue:!n.abort})}}),wa=E("$ZodCheckEndsWith",(e,n)=>{Qe.init(e,n);let t=new RegExp(`.*${Mn(n.suffix)}$`);n.pattern??(n.pattern=t),e._zod.check=o=>{o.value.endsWith(n.suffix)||o.issues.push({origin:"string",code:"invalid_format",format:"ends_with",suffix:n.suffix,input:o.value,inst:e,continue:!n.abort})}});var xa=E("$ZodCheckOverwrite",(e,n)=>{Qe.init(e,n),e._zod.check=t=>{t.value=n.tx(t.value)}});var Uo=class{constructor(n=[],t={}){this.content=[],this.indent=0,this.args=n,this.closed=t}indented(n){this.indent+=1;try{n(this)}finally{this.indent-=1}}write(n){if(typeof n=="function"){n(this,{execution:"sync"}),n(this,{execution:"async"});return}let o=n.split(`
`).filter(s=>s),i=Math.min(...o.map(s=>s.length-s.trimStart().length)),r=o.map(s=>s.slice(i)).map(s=>" ".repeat(this.indent*2)+s);for(let s of r)this.content.push(s)}compile(){let n=Function,t=this?.content??[""];return new n(...Object.keys(this.closed),`return function (${this.args.join(", ")}) {
${t.join(`
`)}
};`)(...Object.values(this.closed))}};var Aa={major:4,minor:6,patch:7};var qe=E("$ZodType",(e,n)=>{var t;e??(e={}),e._zod.def=n,e._zod.bag=e._zod.bag||{},e._zod.version=Aa;let o=e._zod.def.checks,i=e._zod.traits.has("$ZodCheck")?[e,...o??[]]:o?.length?[...o]:[];for(let r of i)for(let s of r._zod.onattach)s(e);if(i.length===0)(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{let r=(a,l,u)=>{if(a.memo)return a;let d=Sn(a),p;for(let f of l){if(f._zod.def.when){if(Ur(a)||!f._zod.def.when(a))continue}else if(d)continue;let m=a.issues.length,b=f._zod.check(a);if(b instanceof Promise&&u?.async===!1)throw new zn;if(p||b instanceof Promise)p=(p??Promise.resolve()).then(async()=>{await b,a.issues.length!==m&&(Qt(a.issues,m,e),d||(d=Sn(a,m)))});else{if(a.issues.length===m)continue;Qt(a.issues,m,e),d||(d=Sn(a,m))}}return p?p.then(()=>a):a},s=(a,l,u)=>{if(Sn(a))return a.aborted=!0,a;let d=r(l,i,u);if(d instanceof Promise){if(u.async===!1)throw new zn;return d.then(p=>e._zod.parse(p,u))}return e._zod.parse(d,u)};e._zod.run=(a,l)=>{if(l.skipChecks)return e._zod.parse(a,l);if(l.direction==="backward"){let d=e._zod.parse({value:a.value,issues:[]},{...l,skipChecks:!0});return d instanceof Promise?d.then(p=>s(p,a,l)):s(d,a,l)}let u=e._zod.parse(a,l);if(u instanceof Promise){if(l.async===!1)throw new zn;return u.then(d=>r(d,i,l))}return r(u,i,l)}}},{get"~standard"(){return $o(this,"~standard",ri(this))},set"~standard"(e){Jn(this,"~standard",e)}}),Ia=(e,n)=>e.issues.length?{issues:e.issues.map(t=>Bn(t,n,pn()))}:{value:e.value};async function tm(e,n){let t={async:!0};return Ia(await e._zod.run({value:n,issues:[]},t),t)}function ri(e){return{validate:n=>{let t={async:!1};try{let o=e._zod.run({value:n,issues:[]},t);if(!(o instanceof Promise))return Ia(o,t)}catch{}return tm(e,n)},vendor:"zod",version:1}}var jo=E("$ZodString",(e,n)=>{qe.init(e,n),e._zod.pattern=n.pattern??sa,e._zod.parse=(t,o)=>{if(n.coerce)try{t.value=String(t.value)}catch{}return typeof t.value=="string"||t.issues.push({expected:"string",code:"invalid_type",input:t.value,inst:e}),t}}),Be=E("$ZodStringFormat",(e,n)=>{Yt.init(e,n),jo.init(e,n)}),$a=E("$ZodGUID",(e,n)=>{n.pattern??(n.pattern=Vs),Be.init(e,n)}),Oa=E("$ZodUUID",(e,n)=>{if(n.version){let o={v1:1,v2:2,v3:3,v4:4,v5:5,v6:6,v7:7,v8:8}[n.version];if(o===void 0)throw new Error(`Invalid UUID version: "${n.version}"`);n.pattern??(n.pattern=Xr(o))}else n.pattern??(n.pattern=Xr());Be.init(e,n)}),Ra=E("$ZodEmail",(e,n)=>{n.pattern??(n.pattern=Hs),Be.init(e,n)}),Da=1,Vo=2;function Ma(e){try{return typeof URL<"u"&&typeof URL.canParse=="function"?URL.canParse(e):(new URL(e),!0)}catch{return!1}}function om(e,n){return!("normalize"in n)&&!("hostname"in n)&&!("protocol"in n)?Ma(e)||Vo:rm(e,n)}function rm(e,n){if(!n.normalize&&n.protocol?.source===ea.source&&!/^https?:\/\//i.test(e))return Da;try{if(typeof URL<"u"){let t=URL;if(typeof t.parse=="function")return t.parse(e)??Vo}return new URL(e)}catch{return Vo}}var im=/[\t\n\r]/g;function qa(e){return e.replace(im,"")}function sm(e,n){return n.lastIndex=0,n.test(e.hostname)}function am(e,n){return n.lastIndex=0,n.test(e.protocol.endsWith(":")?e.protocol.slice(0,-1):e.protocol)}var Za=E("$ZodURL",(e,n)=>{Be.init(e,n),e._zod.check=t=>{try{let o=t.value.trim(),i=om(o,n);if(i===Da){t.issues.push({code:"invalid_format",format:"url",note:"Invalid URL format",input:t.value,inst:e,continue:!n.abort});return}if(i===Vo){t.issues.push({code:"invalid_format",format:"url",input:t.value,inst:e,continue:!n.abort});return}if(i===!0){t.value=qa(o);return}n.hostname&&!sm(i,n.hostname)&&t.issues.push({code:"invalid_format",format:"url",note:"Invalid hostname",pattern:n.hostname.source,input:t.value,inst:e,continue:!n.abort}),n.protocol&&!am(i,n.protocol)&&t.issues.push({code:"invalid_format",format:"url",note:"Invalid protocol",pattern:n.protocol.source,input:t.value,inst:e,continue:!n.abort}),t.value=n.normalize?i.href:qa(o);return}catch{t.issues.push({code:"invalid_format",format:"url",input:t.value,inst:e,continue:!n.abort})}}}),Fa=E("$ZodEmoji",(e,n)=>{n.pattern??(n.pattern=js()),Be.init(e,n)}),Ua=E("$ZodNanoID",(e,n)=>{if(n.length!==void 0&&(!Number.isInteger(n.length)||n.length<1))throw new Error(`Invalid nanoid length: ${n.length}`);n.pattern??(n.pattern=n.length===void 0?Fs:Us(n.length)),Be.init(e,n)}),La=E("$ZodCUID",(e,n)=>{n.pattern??(n.pattern=Os),Be.init(e,n)}),Va=E("$ZodCUID2",(e,n)=>{n.pattern??(n.pattern=Rs),Be.init(e,n)}),Ha=E("$ZodULID",(e,n)=>{n.pattern??(n.pattern=Ds),Be.init(e,n)}),ja=E("$ZodXID",(e,n)=>{n.pattern??(n.pattern=Ms),Be.init(e,n)}),Qa=E("$ZodKSUID",(e,n)=>{n.pattern??(n.pattern=Zs),Be.init(e,n)}),Wa=E("$ZodISODateTime",(e,n)=>{n.pattern??(n.pattern=ia(n)),Be.init(e,n)}),Ka=E("$ZodISODate",(e,n)=>{n.pattern??(n.pattern=oa),Be.init(e,n)}),Ja=E("$ZodISOTime",(e,n)=>{n.pattern??(n.pattern=ra(n)),Be.init(e,n)}),Xa=E("$ZodISODuration",(e,n)=>{n.pattern??(n.pattern=Ls),Be.init(e,n)}),Ya=E("$ZodIPv4",(e,n)=>{n.pattern??(n.pattern=Qs),Be.init(e,n)}),cm=/^[0-9a-fA-F:.]+$/;function ec(e){return cm.test(e)?Ma(`http://[${e}]`):!1}var nc=E("$ZodIPv6",(e,n)=>{n.pattern??(n.pattern=Ws),Be.init(e,n),e._zod.check=t=>{ec(t.value)||t.issues.push({code:"invalid_format",format:"ipv6",input:t.value,inst:e,continue:!n.abort})}});var tc=E("$ZodCIDRv4",(e,n)=>{n.pattern??(n.pattern=Ks),Be.init(e,n)});function lm(e){let n=e.split("/");if(n.length!==2)return!1;let[t,o]=n;if(!o)return!1;let i=Number(o);return`${i}`!==o||i<0||i>128?!1:ec(t)}var oc=E("$ZodCIDRv6",(e,n)=>{n.pattern??(n.pattern=Js),Be.init(e,n),e._zod.check=t=>{lm(t.value)||t.issues.push({code:"invalid_format",format:"cidrv6",input:t.value,inst:e,continue:!n.abort})}});function rc(e){if(e==="")return!0;if(/\s/.test(e)||e.length%4!==0)return!1;try{return atob(e),!0}catch{return!1}}var ii=/^[0-9a-zA-Z+/]*={0,2}$/,ic=E("$ZodBase64",(e,n)=>{n.pattern??(n.pattern=ii),Be.init(e,n),e._zod.check=t=>{rc(t.value)||t.issues.push({code:"invalid_format",format:"base64",input:t.value,inst:e,continue:!n.abort})}}),Qo=/^[A-Za-z0-9_-]*$/;function um(e){if(!Qo.test(e))return!1;let n=e.replace(/[-_]/g,o=>o==="-"?"+":"/"),t=n.padEnd(Math.ceil(n.length/4)*4,"=");return rc(t)}var sc=E("$ZodBase64URL",(e,n)=>{n.pattern??(n.pattern=Qo),Be.init(e,n),e._zod.check=t=>{um(t.value)||t.issues.push({code:"invalid_format",format:"base64url",input:t.value,inst:e,continue:!n.abort})}}),ac=E("$ZodE164",(e,n)=>{n.pattern??(n.pattern=na),Be.init(e,n)});function dm(e,n=null){try{let t=e.split(".");if(t.length!==3)return!1;let[o]=t;if(!o)return!1;let i=JSON.parse(atob(o));return!("typ"in i&&i?.typ!=="JWT"||!i.alg||n&&(!("alg"in i)||i.alg!==n))}catch{return!1}}var cc=E("$ZodJWT",(e,n)=>{Be.init(e,n),e._zod.check=t=>{dm(t.value,n.alg)||t.issues.push({code:"invalid_format",format:"jwt",input:t.value,inst:e,continue:!n.abort})}});var si=E("$ZodNumber",(e,n)=>{qe.init(e,n),e._zod.pattern=Jt,e._zod.parse=(t,o)=>{if(n.coerce)try{t.value=Number(t.value)}catch{}let i=t.value;if(typeof i=="number"&&!Number.isNaN(i)&&Number.isFinite(i))return t;let r=typeof i=="number"?Number.isNaN(i)?"NaN":Number.isFinite(i)?void 0:String(i):void 0;return t.issues.push({expected:"number",code:"invalid_type",input:i,inst:e,...r?{received:r}:{}}),t}}),lc=E("$ZodNumberFormat",(e,n)=>{pa.init(e,n),si.init(e,n)}),uc=E("$ZodBoolean",(e,n)=>{qe.init(e,n),e._zod.pattern=aa,e._zod.parse=(t,o)=>{if(n.coerce)try{t.value=!!t.value}catch{}let i=t.value;return typeof i=="boolean"||t.issues.push({expected:"boolean",code:"invalid_type",input:i,inst:e}),t}});var dc=E("$ZodNull",(e,n)=>{qe.init(e,n),e._zod.pattern=ca,e._zod.values=new Set([null]),e._zod.parse=(t,o)=>{let i=t.value;return i===null||t.issues.push({expected:"null",code:"invalid_type",input:i,inst:e}),t}});var pc=E("$ZodUnknown",(e,n)=>{qe.init(e,n),e._zod.parse=t=>t}),mc=E("$ZodNever",(e,n)=>{qe.init(e,n),e._zod.parse=(t,o)=>(t.issues.push({expected:"never",code:"invalid_type",input:t.value,inst:e}),t)});function pm(e,n){let t=Io(e._zod.def.checks);if(!t.length)return;let o=Math.min(...t.map(r=>r[0])),i=e._zod.parse;e._zod.parse=(r,s)=>{let a=n(r.value);if(a>o&&!s?.skipChecks&&s?.direction!=="backward"){for(let[l,u]of Io(e._zod.def.checks))if(a>l&&u._zod.def.when(r)){let d=r.issues.length;return u._zod.check(r),r.issues[d].continue=!1,Qt(r.issues,d,e),r}}return i(r,s)}}var mm=e=>Array.isArray(e)?e.length:-1;function Sa(e,n,t){e.issues.length&&n.issues.push(...Zn(t,e.issues)),n.value[t]=e.value}var fc=E("$ZodArray",(e,n)=>{qe.init(e,n);let t=sn.memoizer;t?.attach(e),e._zod.parse=(o,i)=>{let r=o.value;if(!Array.isArray(r))return o.issues.push({expected:"array",code:"invalid_type",input:r,inst:e}),o;o.value=t?t.alloc(e,o,Array(r.length),i):Array(r.length);let s=[],a=i?.abortEarly;for(let l=0;l<r.length;l++){let u=r[l],d=n.element._zod.run({value:u,issues:[]},i);if(d instanceof Promise)s.push(d.then(p=>Sa(p,o,l)));else if(Sa(d,o,l),a&&d.issues.length!==0&&Sn(d))break}return s.length?Promise.all(s).then(()=>o):o},pm(e,mm)});function Ho(e,n,t,o,i,r){let s=t in o,a=r==="optional";if(!(!s&&a&&i==="optional")){if(e.issues.length){if(i!==void 0&&a&&!s)return;n.issues.push(...Zn(t,e.issues))}if(!s&&i===void 0){e.issues.length||n.issues.push({code:"invalid_type",expected:"nonoptional",input:void 0,path:[t]});return}e.value===void 0?(s||i==="defaulted"&&!a)&&(n.value[t]=void 0):n.value[t]=e.value}}var fm=[];function hc(e){let n=Object.keys(e.shape),t=Object.getOwnPropertySymbols(e.shape),o=t.length?t:fm,i=o.length?[...n,...o]:n;for(let s of i)if(!e.shape?.[s]?._zod?.traits?.has("$ZodType"))throw new Error(`Invalid element at key "${String(s)}": expected a Zod schema`);let r=Fr(e.shape);return{...e,allKeys:i,symbolKeys:o,keySet:new Set(n),numKeys:n.length,optionalKeys:new Set(r)}}function gc(e,n,t,o,i,r,s){let a=[],l=i.keySet,u=i.catchall._zod,d=u.def.type,p=u.optin,f=u.optout,m=0;for(let b in n){if(s&&t.issues.length!==m){if(Sn(t,m))break;m=t.issues.length}if(l.has(b))continue;if(b==="__proto__"){d==="never"&&a.push(b);continue}if(d==="never"){a.push(b);continue}let g=u.run({value:n[b],issues:[]},o);g instanceof Promise?e.push(g.then(_=>Ho(_,t,b,n,p,f))):Ho(g,t,b,n,p,f)}return a.length&&t.issues.push({code:"unrecognized_keys",keys:a,input:n,inst:r,continue:!0}),e.length?Promise.all(e).then(()=>t):t}var hm=E("$ZodObject",(e,n)=>{qe.init(e,n);let t=Object.getOwnPropertyDescriptor(n,"shape"),o=t?.get?t.get.raw:n.shape??{};if(o){let u=()=>{let d={...o};return Object.defineProperty(n,"shape",{value:d}),u.raw=d,d};u.raw=o,Object.defineProperty(n,"shape",{get:u})}let i=St(()=>hc(n));ge(e,"propValues",u=>{let d=u.def.shape,p={};for(let f in d){let m=d[f]._zod;if(m.values){Object.prototype.hasOwnProperty.call(p,f)||dn(p,f,new Set);for(let b of m.values)p[f].add(b);m.optin!==void 0&&p[f].add(void 0)}}return p});let r=dt,s=n.catchall,a,l=sn.memoizer;l?.attach(e),e._zod.parse=(u,d)=>{a??(a=i.value);let p=u.value;if(!r(p))return u.issues.push({expected:"object",code:"invalid_type",input:p,inst:e}),u;u.value=l?l.alloc(e,u,{},d):{};let f=[],m=a.shape,b=d?.abortEarly,g=u.issues.length;for(let _ of a.allKeys){if(b&&u.issues.length!==g){if(Sn(u,g))break;g=u.issues.length}if(_==="__proto__")continue;let x=m[_],S=x._zod.optin,Z=x._zod.optout,D=x._zod.run({value:p[_],issues:[]},d);D instanceof Promise?f.push(D.then(G=>Ho(G,u,_,p,S,Z))):Ho(D,u,_,p,S,Z)}return s?gc(f,p,u,d,i.value,e,b===!0):f.length?Promise.all(f).then(()=>u):u}}),vc=E("$ZodObjectJIT",(e,n)=>{hm.init(e,n);let t=e._zod.parse,o=St(()=>hc(n)),i=sn.memoizer,r=m=>{let b=o.value,g=b.symbolKeys,_=new Uo(["payload","ctx"],{shape:m,inst:e,memo:i,syms:g}),x=G=>`shape[${G}]._zod.run({ value: input[${G}], issues: [] }, ctx)`,S=(G,N)=>`
          let ${G}_ab = false;
          for (let i = 0; i < ${G}.issues.length; i++) {
            const iss = ${G}.issues[i];
            iss.path = iss.path ? [${N}, ...iss.path] : [${N}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${G}_ab = true;
          }
          if (${G}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;_.write("const input = payload.value;");let Z=Object.create(null),D=0;for(let G of b.allKeys)Z[G]=`key_${D++}`;_.write(i?"const newResult = memo.alloc(inst, payload, {}, ctx);":"const newResult = {};");for(let G of b.allKeys){if(G==="__proto__")continue;let N=Z[G],B=typeof G=="symbol"?`syms[${g.indexOf(G)}]`:Rr(G),O=`${B} in input`,q=m[G],k=q?._zod?.optin,z=k!==void 0,I=q?._zod?.optout==="optional";if(_.write(`const ${N} = ${x(B)};`),z&&I){let A=k==="optional"?`${N}_present`:`${N}.value !== undefined || ${N}_present`;_.write(`
        const ${N}_present = ${O};
        if (!${N}.issues.length || ${N}_present) {
          if (${N}.issues.length) {${S(N,B)}
          }

          if (${A}) {
            newResult[${B}] = ${N}.value;
          }
        }

      `)}else z?(_.write(`
        if (${N}.issues.length) {${S(N,B)}
        }
      `),k==="defaulted"?_.write(`newResult[${B}] = ${N}.value;`):_.write(`
        if (${N}.value !== undefined || ${O}) {
          newResult[${B}] = ${N}.value;
        }
      `)):_.write(`
        const ${N}_present = ${O};
        if (${N}.issues.length) {${S(N,B)}
        }
        if (!${N}_present && !${N}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${B}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${N}_present) {
          newResult[${B}] = ${N}.value;
        }

      `)}return _.write("payload.value = newResult;"),_.write("return payload;"),_.compile()},s,a=dt,l=!sn.jitless,d=l&&Mr.value,p=n.catchall,f;e._zod.parse=(m,b)=>{f??(f=o.value);let g=m.value;return a(g)?l&&d&&b?.async===!1&&b.jitless!==!0?(s||(s=r(n.shape)),m=s(m,b),p?gc([],g,m,b,f,e,b?.abortEarly===!0):m):t(m,b):(m.issues.push({expected:"object",code:"invalid_type",input:g,inst:e}),m)}});function Ba(e,n,t,o){for(let r of e)if(r.issues.length===0)return n.value=r.value,n;let i=e.filter(r=>!Sn(r));return i.length===1?(n.value=i[0].value,i[0]):(n.issues.push({code:"invalid_union",input:n.value,inst:t,errors:e.map(r=>r.issues.map(s=>Bn(s,o,pn())))}),n)}var ai=E("$ZodUnion",(e,n)=>{qe.init(e,n),ge(e,"optin",o=>o.def.options.some(i=>i._zod.optin==="defaulted")?"defaulted":o.def.options.some(i=>i._zod.optin!==void 0)?"optional":void 0),ge(e,"optout",o=>o.def.options.some(i=>i._zod.optout==="optional")?"optional":void 0),ge(e,"values",o=>{if(o.def.options.every(i=>i._zod.values))return new Set(o.def.options.flatMap(i=>Array.from(i._zod.values)))}),ge(e,"pattern",o=>{if(o.def.options.every(i=>i._zod.pattern)){let i=o.def.options.map(r=>r._zod.pattern);return new RegExp(`^(${i.map(r=>Ht(r.source)).join("|")})$`)}});let t=n.options.length===1?n.options[0]._zod.run:null;e._zod.parse=(o,i)=>{if(t)return t(o,i);let r=!1,s=[];for(let a of n.options){let l=a._zod.run({value:o.value,issues:[]},i);if(l instanceof Promise)s.push(l),r=!0;else{if(l.issues.length===0)return l;s.push(l)}}return r?Promise.all(s).then(a=>Ba(a,o,e,i)):Ba(s,o,e,i)}});function gm(e){let n=new Map;for(let t of e.options){let o=t._zod.propValues?.[e.discriminator];if(!o||o.size===0)throw new Error(`Invalid discriminated union option at index "${e.options.indexOf(t)}"`);for(let i of o)if(n.has(i)){if(i!==void 0)throw new Error(`Duplicate discriminator value "${String(i)}"`);n.set(i,null)}else n.set(i,t)}return n}var bc=E("$ZodDiscriminatedUnion",(e,n)=>{n.inclusive=!1,ai.init(e,n);let t=e._zod.parse;ge(e,"propValues",i=>{let r={},s=0;for(let a of i.def.options){let l=a._zod.propValues;if(!l||Object.keys(l).length===0)throw new Error(`Invalid discriminated union option at index "${i.def.options.indexOf(a)}"`);l[i.def.discriminator]?.has(void 0)&&s++;for(let[u,d]of Object.entries(l)){Object.prototype.hasOwnProperty.call(r,u)||dn(r,u,new Set);for(let p of d)r[u].add(p)}}return!i.def.unionFallback&&s>1&&r[i.def.discriminator]?.delete(void 0),r}),n.options.forEach((i,r)=>{let s=Bt(i._zod.def);if(s&&!Object.prototype.hasOwnProperty.call(s,n.discriminator))throw new Error(`Invalid discriminated union option at index "${r}"`)});let o=St(()=>gm(n));e._zod.parse=(i,r)=>{let s=i.value;if(!dt(s))return i.issues.push({code:"invalid_type",expected:"object",input:s,inst:e}),i;let a=s?.[n.discriminator],l=o.value.get(a);return l&&(a!==void 0||r.direction!=="backward")?l._zod.run(i,r):n.unionFallback||r.direction==="backward"?t(i,r):(i.issues.push({code:"invalid_union",errors:[],note:"No matching discriminator",discriminator:n.discriminator,options:Array.from(o.value.keys()).filter(u=>o.value.get(u)!==null),input:s,path:[n.discriminator],inst:e}),i)}}),yc=E("$ZodIntersection",(e,n)=>{qe.init(e,n),e._zod.parse=(t,o)=>{let i=t.value,r=n.left._zod.run({value:i,issues:[]},o),s=n.right._zod.run({value:i,issues:[]},o);return r instanceof Promise||s instanceof Promise?Promise.all([r,s]).then(([l,u])=>za(t,l,u)):za(t,r,s)}});function oi(e,n){if(e===n)return{valid:!0,data:e};if(e instanceof Date&&n instanceof Date&&+e==+n)return{valid:!0,data:e};if(Xn(e)&&Xn(n)){let t=Object.keys(n),o=Object.keys(e).filter(r=>t.indexOf(r)!==-1),i={...e,...n};Object.prototype.hasOwnProperty.call(i,"__proto__")&&delete i.__proto__;for(let r of o){if(r==="__proto__")continue;let s=oi(e[r],n[r]);if(!s.valid)return{valid:!1,mergeErrorPath:[r,...s.mergeErrorPath]};i[r]=s.data}return{valid:!0,data:i}}if(Array.isArray(e)&&Array.isArray(n)){if(e.length!==n.length)return{valid:!1,mergeErrorPath:[]};let t=[];for(let o=0;o<e.length;o++){let i=e[o],r=n[o],s=oi(i,r);if(!s.valid)return{valid:!1,mergeErrorPath:[o,...s.mergeErrorPath]};t.push(s.data)}return{valid:!0,data:t}}return{valid:!1,mergeErrorPath:[]}}function za(e,n,t){let o=new Map,i,r=new Map,s=(u,d)=>{let p;if(u.code==="unrecognized_keys"&&!u.path?.length)i??(i=u),p=u.keys;else if(u.code==="invalid_key"&&u.origin==="record"&&u.path?.length===1){let f=String(u.path[0]);r.has(f)||r.set(f,u),p=[f]}else return!1;for(let f of p)o.has(f)||o.set(f,{}),o.get(f)[d]=!0;return!0};for(let u of n.issues)s(u,"l")||e.issues.push(u);for(let u of t.issues)s(u,"r")||e.issues.push(u);let a=[...o].filter(([,u])=>u.l&&u.r).map(([u])=>u);if(a.length){let u=i?a.filter(d=>i.keys.includes(d)):[];u.length&&e.issues.push({...i,keys:u});for(let d of a)!u.includes(d)&&r.has(d)&&e.issues.push(r.get(d))}let l=oi(n.value,t.value);if(!l.valid){if(Sn(e))return e;throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(l.mergeErrorPath)}`)}return e.value=l.data,e}var _c=E("$ZodRecord",(e,n)=>{qe.init(e,n);let t=sn.memoizer;t?.attach(e),e._zod.parse=(o,i)=>{let r=o.value;if(!Xn(r))return o.issues.push({expected:"record",code:"invalid_type",input:r,inst:e}),o;let s=[],a=n.keyType._zod.values;if(a&&!n.partial){o.value=t?t.alloc(e,o,{},i):{};let l=new Set;for(let d of a)if(typeof d=="string"||typeof d=="number"||typeof d=="symbol"){if(l.add(typeof d=="number"?d.toString():d),d==="__proto__")continue;let p=n.keyType._zod.run({value:d,issues:[]},i);if(p instanceof Promise)throw new Error("Async schemas not supported in object keys currently");if(p.issues.length){o.issues.push({code:"invalid_key",origin:"record",issues:p.issues.map(b=>Bn(b,i,pn())),input:d,path:[d],inst:e});continue}let f=p.value;if(f==="__proto__")continue;let m=n.valueType._zod.run({value:r[d],issues:[]},i);m instanceof Promise?s.push(m.then(b=>{b.issues.length&&o.issues.push(...Zn(d,b.issues)),o.value[f]=b.value})):(m.issues.length&&o.issues.push(...Zn(d,m.issues)),o.value[f]=m.value)}let u;for(let d in r)if(!l.has(d))if(n.mode==="loose"){if(d==="__proto__")continue;o.value[d]=r[d]}else u=u??[],u.push(d);u&&u.length>0&&o.issues.push({code:"unrecognized_keys",input:r,inst:e,keys:u,continue:!0})}else{o.value=t?t.alloc(e,o,{},i):{};let l;for(let u of Reflect.ownKeys(r)){if(u==="__proto__"||!Object.prototype.propertyIsEnumerable.call(r,u))continue;let d=n.keyType._zod.run({value:u,issues:[]},i);if(d instanceof Promise)throw new Error("Async schemas not supported in object keys currently");if(typeof u=="string"&&Jt.test(u)&&d.issues.length){let b=n.keyType._zod.run({value:Number(u),issues:[]},i);if(b instanceof Promise)throw new Error("Async schemas not supported in object keys currently");b.issues.length===0&&(d=b)}if(d.issues.length){n.mode==="loose"?o.value[u]=r[u]:a?(l=l??[],l.push(u)):o.issues.push({code:"invalid_key",origin:"record",issues:d.issues.map(b=>Bn(b,i,pn())),input:u,path:[u],inst:e});continue}let f=d.value;if(f==="__proto__")continue;let m=n.valueType._zod.run({value:r[u],issues:[]},i);m instanceof Promise?s.push(m.then(b=>{b.issues.length&&o.issues.push(...Zn(u,b.issues)),o.value[f]=b.value})):(m.issues.length&&o.issues.push(...Zn(u,m.issues)),o.value[f]=m.value)}l&&l.length>0&&o.issues.push({code:"unrecognized_keys",input:r,inst:e,keys:l,continue:!0})}return s.length?Promise.all(s).then(()=>o):o}});var wc=E("$ZodEnum",(e,n)=>{qe.init(e,n);let t=At(n.entries),o=new Set(t);e._zod.values=o,ge(e,"pattern",i=>{let r=At(i.def.entries).filter(s=>Zr.has(typeof s));return new RegExp(r.length?`^(${r.map(s=>Mn(s.toString())).join("|")})$`:"^[^\\s\\S]$")}),e._zod.parse=(i,r)=>{let s=i.value;return o.has(s)||i.issues.push({code:"invalid_value",values:t,input:s,inst:e}),i}}),xc=E("$ZodLiteral",(e,n)=>{qe.init(e,n);let t=new Set(n.values);e._zod.values=t,ge(e,"pattern",o=>{let i=o.def.values;return new RegExp(i.length?`^(${i.map(r=>typeof r=="string"?Mn(r):r?Mn(r.toString()):String(r)).join("|")})$`:"^[^\\s\\S]$")}),e._zod.parse=(o,i)=>{let r=o.value;return t.has(r)||o.issues.push({code:"invalid_value",values:n.values,input:r,inst:e}),o}});var kc=E("$ZodTransform",(e,n)=>{qe.init(e,n),e._zod.optin="optional",sn.memoizer?.guard(e),e._zod.parse=(t,o)=>{if(o.direction==="backward")throw new Ct(e.constructor.name);let i=n.transform(t.value,t);if(o.async)return(i instanceof Promise?i:Promise.resolve(i)).then(s=>(t.value=s,t));if(i instanceof Promise)throw new zn;return t.value=i,t}});function Ca(e,n){return e.value=n.issues.length?void 0:n.value,e}var ci=E("$ZodOptional",(e,n)=>{qe.init(e,n),ge(e,"optin",t=>t.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),e._zod.optout="optional",ge(e,"values",t=>{let o=t.def.innerType._zod.values;return o?new Set([...o,void 0]):void 0}),ge(e,"pattern",t=>{let o=t.def.innerType._zod.pattern;return o?new RegExp(`^(${Ht(o.source)})?$`):void 0}),e._zod.parse=(t,o)=>{if(t.value===void 0){if(n.innerType._zod.optin!=="defaulted")return t;let i=n.innerType._zod.run({value:t.value,issues:[]},o);return i instanceof Promise?i.then(r=>Ca(t,r)):Ca(t,i)}return n.innerType._zod.run(t,o)}}),Ac=E("$ZodExactOptional",(e,n)=>{ci.init(e,n),ge(e,"values",t=>t.def.innerType._zod.values),ge(e,"pattern",t=>t.def.innerType._zod.pattern),e._zod.parse=(t,o)=>n.innerType._zod.run(t,o)}),qc=E("$ZodNullable",(e,n)=>{qe.init(e,n),ge(e,"optin",t=>t.def.innerType._zod.optin),ge(e,"optout",t=>t.def.innerType._zod.optout),ge(e,"pattern",t=>{let o=t.def.innerType._zod.pattern;return o?new RegExp(`^(${Ht(o.source)}|null)$`):void 0}),ge(e,"values",t=>t.def.innerType._zod.values?new Set([...t.def.innerType._zod.values,null]):void 0),e._zod.parse=(t,o)=>t.value===null?t:n.innerType._zod.run(t,o)}),Sc=E("$ZodDefault",(e,n)=>{qe.init(e,n),e._zod.optin="defaulted",ge(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,o)=>{if(o.direction==="backward")return n.innerType._zod.run(t,o);if(t.value===void 0)return t.value=n.defaultValue,t;let i=n.innerType._zod.run(t,o);return i instanceof Promise?i.then(r=>Pa(r,n)):Pa(i,n)}});function Pa(e,n){return e.value===void 0&&(e.value=n.defaultValue),e}var Bc=E("$ZodPrefault",(e,n)=>{qe.init(e,n),e._zod.optin="defaulted",ge(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,o)=>(o.direction==="backward"||t.value===void 0&&(t.value=n.defaultValue),n.innerType._zod.run(t,o))}),zc=E("$ZodNonOptional",(e,n)=>{qe.init(e,n),ge(e,"values",t=>{let o=t.def.innerType._zod.values;return o?new Set([...o].filter(i=>i!==void 0)):void 0}),e._zod.parse=(t,o)=>{let i=n.innerType._zod.run(t,o);return i instanceof Promise?i.then(r=>Ga(r,e)):Ga(i,e)}});function Ga(e,n){return!e.issues.length&&e.value===void 0&&e.issues.push({code:"invalid_type",expected:"nonoptional",input:e.value,inst:n}),e}function Na(e,n,t,o){return n.issues.length?(e.value=t.catchValue({...n,value:e.value,error:{issues:n.issues.map(i=>Bn(i,o,pn()))},input:e.value}),e):(e.value=n.value,n.memo&&(e.memo=!0),e)}var Cc=E("$ZodCatch",(e,n)=>{qe.init(e,n),ge(e,"optin",t=>t.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),ge(e,"optout",t=>t.def.innerType._zod.optout),ge(e,"values",t=>t.def.innerType._zod.values),e._zod.parse=(t,o)=>{if(o.direction==="backward")return n.innerType._zod.run(t,o);let i=n.innerType._zod.run({value:t.value,issues:[]},o);return i instanceof Promise?i.then(r=>Na(t,r,n,o)):Na(t,i,n,o)}});var Pc=E("$ZodPipe",(e,n)=>{qe.init(e,n),ge(e,"values",t=>t.def.in._zod.values),ge(e,"optin",t=>t.def.in._zod.optin),ge(e,"optout",t=>t.def.out._zod.optout),ge(e,"propValues",t=>t.def.in._zod.propValues),e._zod.parse=(t,o)=>{if(o.direction==="backward"){let r=n.out._zod.run(t,o);return r instanceof Promise?r.then(s=>Lo(s,n.in,o)):Lo(r,n.in,o)}let i=n.in._zod.run(t,o);return i instanceof Promise?i.then(r=>Lo(r,n.out,o)):Lo(i,n.out,o)}});function Lo(e,n,t){return e.issues.some(o=>o.code!=="unrecognized_keys")?(e.aborted=!0,e):n._zod.run({value:e.value,issues:e.issues},t)}var Gc=E("$ZodReadonly",(e,n)=>{qe.init(e,n),ge(e,"propValues",t=>t.def.innerType._zod.propValues),ge(e,"values",t=>t.def.innerType._zod.values),ge(e,"optin",t=>t.def.innerType?._zod?.optin),ge(e,"optout",t=>t.def.innerType?._zod?.optout),e._zod.parse=(t,o)=>{if(o.direction==="backward")return n.innerType._zod.run(t,o);let i=n.innerType._zod.run(t,o);return i instanceof Promise?i.then(Ta):Ta(i)}});function Ta(e){return e.memo||(e.value=Object.freeze(e.value)),e}var Nc=E("$ZodLazy",(e,n)=>{qe.init(e,n),Or(e._zod,"innerType",()=>{let t=n;return t._cachedInner||(t._cachedInner=n.getter()),t._cachedInner}),ge(e,"pattern",t=>t.innerType?._zod?.pattern),ge(e,"propValues",t=>t.innerType?._zod?.propValues),ge(e,"optin",t=>t.innerType?._zod?.optin??void 0),ge(e,"optout",t=>t.innerType?._zod?.optout??void 0),e._zod.parse=(t,o)=>e._zod.innerType._zod.run(t,o)}),Tc=E("$ZodCustom",(e,n)=>{Qe.init(e,n),qe.init(e,n),e._zod.parse=(t,o)=>t,e._zod.check=t=>{let o=t.value,i=n.fn(o);if(i instanceof Promise)return i.then(r=>Ea(r,t,o,e));Ea(i,t,o,e)}});function Ea(e,n,t,o){if(!e){let i={code:"custom",input:t,inst:o,path:[...o._zod.def.path??[]],continue:!o._zod.def.abort};o._zod.def.params&&(i.params=o._zod.def.params),n.issues.push(zt(i))}}var ui=class extends Error{constructor(){super("Cannot parse a reference cycle that closes through a transform"),this.name="ZodCyclicError"}},di="~memo",Ec=[];function Ic(e){return e!==null&&typeof e=="object"}function li(e){return e.map(n=>n.path?{...n,path:n.path.slice()}:{...n})}var $c=new WeakMap,eo=0,Jo=1,no=2;function Xo(e,n,t){let o=$c.get(e);if(o!==void 0)return o?no:eo;if(n.has(e))return no;n.add(e);let i=eo,r=d=>{if(i!==no&&d?._zod){let p=Xo(d,n,t);p>i&&(i=p)}},s=(d,p)=>{let f=eo;for(let m of Reflect.ownKeys(d)){let b=Object.getOwnPropertyDescriptor(d,m);if(p&&!b.enumerable)continue;let g=b.get?Jo:b.value?._zod?Xo(b.value,n,t):eo;g>f&&(f=g)}return f},a=d=>{d>i&&(i=d)},l=e._zod.def,u=l.type;switch(u){case"object":{let d=Bt(l);a(d?s(d,!0):Jo),r(l.catchall);break}case"array":r(l.element);break;case"tuple":for(let d of l.items)r(d);r(l.rest);break;case"record":case"map":r(l.keyType),r(l.valueType);break;case"set":r(l.valueType);break;case"union":for(let d of l.options)r(d);break;case"intersection":r(l.left),r(l.right);break;case"optional":case"nullable":case"default":case"prefault":case"catch":case"readonly":case"nonoptional":case"promise":case"success":r(l.innerType);break;case"pipe":r(l.in),r(l.out);break;case"function":r(l.input),r(l.output);break;case"lazy":{let d=l._cachedInner??(t?e._zod.innerType:void 0);a(d?Xo(d,n,!1):Jo);break}case"template_literal":case"string":case"number":case"int":case"boolean":case"bigint":case"symbol":case"undefined":case"null":case"void":case"never":case"any":case"unknown":case"date":case"nan":case"enum":case"literal":case"file":case"transform":case"custom":break;default:for(let d in l){let p=Object.getOwnPropertyDescriptor(l,d);if(!p||p.get)continue;let f=p.value;if(!(!f||typeof f!="object")){if(f._zod)r(f);else if(Array.isArray(f))for(let m of f)r(m)}}}return n.delete(e),vm(e,i)}function vm(e,n){return n!==Jo&&$c.set(e,n===no),n}function bm(e,n){let t=e.buckets.get(n);return t||(t=new WeakMap,e.buckets.set(n,t)),t}var Wo,Ko=[],ym={alloc(e,n,t){let o=Wo;if(!o)return t;Wo=void 0;let i={value:t,issues:null};return o.set(n.value,i),Ko.push(i),t},guard(e){var n;(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred.push(()=>{let t=e._zod.parse,o=(i,r)=>{if(r.direction!=="backward"&&_m(r,i.value))throw new ui;return t(i,r)};e._zod.parse=o,e._zod.run===t&&(e._zod.run=o)})},attach(e){var n;let t,o=!1,i,r;(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred.push(()=>{let s=e._zod.parse,a=(l,u)=>{if(t===void 0){let x=Xo(e,new Set,!1);if(x===eo)return e._zod.parse=s,e._zod.run===a&&(e._zod.run=s),s(l,u);x===no||o?t=!0:o=!0}let d=l.value;if(!Ic(d))return s(l,u);let p=u[di];p||(p={buckets:new WeakMap,backEdges:void 0},u[di]=p);let f;i===u?f=r:(f=bm(p,e),i=u,r=f);let m=f.get(d);if(m)return l.value=m.value,m.issues?m.issues.length&&l.issues.push(...li(m.issues)):(l.memo=!0,p.backEdges??(p.backEdges=new WeakSet),p.backEdges.add(m.value)),l;Wo=f;let b=Ko.length,g=s(l,u);Wo=void 0;let _=Ko.length>b?Ko.pop():void 0;return g instanceof Promise?g.then(x=>(_&&(_.issues=x.issues.length?li(x.issues):Ec),x)):(_&&(_.issues=g.issues.length?li(g.issues):Ec),g)};e._zod.parse=a,e._zod.run===s&&(e._zod.run=a)})}};function Oc(){return ym}function _m(e,n){let t=e[di]?.backEdges;return t!==void 0&&Ic(n)&&t.has(n)}var wm=()=>{let e={string:{unit:"characters",verb:"to have"},file:{unit:"bytes",verb:"to have"},array:{unit:"items",verb:"to have"},set:{unit:"items",verb:"to have"},map:{unit:"entries",verb:"to have"}};function n(r){return e[r]??null}let t={regex:"input",email:"email address",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO datetime",date:"ISO date",time:"ISO time",duration:"ISO duration",ipv4:"IPv4 address",ipv6:"IPv6 address",mac:"MAC address",cidrv4:"IPv4 range",cidrv6:"IPv6 range",base64:"base64-encoded string",base64url:"base64url-encoded string",json_string:"JSON string",e164:"E.164 number",currency_code:"currency code",credit_card:"credit card number",iban:"IBAN",jwt:"JWT",template_literal:"input"},o={nan:"NaN"};function i(r,s){return r==="number"&&typeof s=="number"&&!Number.isFinite(s)?String(s):o[r]??r}return r=>{switch(r.code){case"invalid_type":{let s=i(r.expected),a=Lr(r.input),l=i(a,r.input);return`Invalid input: expected ${s}, received ${l}`}case"invalid_value":return r.values.length===1?`Invalid input: expected ${No(r.values[0])}`:`Invalid option: expected one of ${Po(r.values,"|")}`;case"too_big":{let s=r.exact?"exactly ":r.inclusive?"<=":"<",a=n(r.origin);return a?`Too big: expected ${r.origin??"value"} to have ${s}${r.maximum.toString()} ${a.unit??"elements"}`:`Too big: expected ${r.origin??"value"} to be ${s}${r.maximum.toString()}`}case"too_small":{let s=r.exact?"exactly ":r.inclusive?">=":">",a=n(r.origin);return a?`Too small: expected ${r.origin} to have ${s}${r.minimum.toString()} ${a.unit}`:`Too small: expected ${r.origin} to be ${s}${r.minimum.toString()}`}case"invalid_format":{let s=r;return s.format==="starts_with"?`Invalid string: must start with "${s.prefix}"`:s.format==="ends_with"?`Invalid string: must end with "${s.suffix}"`:s.format==="includes"?`Invalid string: must include "${s.includes}"`:s.format==="regex"?`Invalid string: must match pattern ${s.pattern}`:`Invalid ${t[s.format]??r.format}`}case"not_multiple_of":return`Invalid number: must be a multiple of ${r.divisor}`;case"unrecognized_keys":return`Unrecognized key${r.keys.length>1?"s":""}: ${Po(r.keys,", ")}`;case"invalid_key":return`Invalid key in ${r.origin}`;case"invalid_union":return r.options&&Array.isArray(r.options)&&r.options.length>0?`Invalid discriminator value. Expected ${r.options.map(a=>`'${a}'`).join(" | ")}`:r.inclusive===!1?"Invalid input: more than one option matched":"Invalid input";case"invalid_element":return`Invalid value in ${r.origin}`;default:return"Invalid input"}}};function Rc(){return{localeError:wm()}}var Dc;var pi=class{constructor(){this._map=new WeakMap,this._idmap=new Map}add(n,...t){let o=t[0];return this._map.set(n,o),o&&typeof o=="object"&&"id"in o&&this._idmap.set(o.id,n),this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(n){let t=this._map.get(n);return t&&typeof t=="object"&&"id"in t&&this._idmap.delete(t.id),this._map.delete(n),this}get(n){let t=n._zod.parent;if(t){let o={...this.get(t)??{}};delete o.id;let i={...o,...this._map.get(n)};return Object.keys(i).length?i:void 0}return this._map.get(n)}has(n){return this._map.has(n)}};function xm(){return new pi}(Dc=globalThis).__zod_globalRegistry??(Dc.__zod_globalRegistry=xm());var pt=globalThis.__zod_globalRegistry;function Mc(e){return e.checks&&(e.checks=[...e.checks]),e}function Zc(e,n){return new e(Mc({type:"string",...ie(n)}))}function Fc(e,n){return new e({type:"string",format:"email",check:"string_format",abort:!1,...ie(n)})}function Uc(e,n){return new e({type:"string",format:"guid",check:"string_format",abort:!1,...ie(n)})}function Lc(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,...ie(n)})}function Vc(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v4",...ie(n)})}function Hc(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v6",...ie(n)})}function jc(e,n){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v7",...ie(n)})}function Qc(e,n){return new e({type:"string",format:"url",check:"string_format",abort:!1,...ie(n)})}function Wc(e,n){return new e({type:"string",format:"emoji",check:"string_format",abort:!1,...ie(n)})}function Kc(e,n){return new e({type:"string",format:"nanoid",check:"string_format",abort:!1,...ie(n)})}function Jc(e,n){return new e({type:"string",format:"cuid",check:"string_format",abort:!1,...ie(n)})}function Xc(e,n){return new e({type:"string",format:"cuid2",check:"string_format",abort:!1,...ie(n)})}function Yc(e,n){return new e({type:"string",format:"ulid",check:"string_format",abort:!1,...ie(n)})}function el(e,n){return new e({type:"string",format:"xid",check:"string_format",abort:!1,...ie(n)})}function nl(e,n){return new e({type:"string",format:"ksuid",check:"string_format",abort:!1,...ie(n)})}function tl(e,n){return new e({type:"string",format:"ipv4",check:"string_format",abort:!1,...ie(n)})}function ol(e,n){return new e({type:"string",format:"ipv6",check:"string_format",abort:!1,...ie(n)})}function rl(e,n){return new e({type:"string",format:"cidrv4",check:"string_format",abort:!1,...ie(n)})}function il(e,n){return new e({type:"string",format:"cidrv6",check:"string_format",abort:!1,...ie(n)})}function sl(e,n){return new e({type:"string",format:"base64",check:"string_format",abort:!1,...ie(n)})}function al(e,n){return new e({type:"string",format:"base64url",check:"string_format",abort:!1,...ie(n)})}function cl(e,n){return new e({type:"string",format:"e164",check:"string_format",abort:!1,...ie(n)})}function ll(e,n){return new e({type:"string",format:"jwt",check:"string_format",abort:!1,...ie(n)})}function ul(e,n){return new e({type:"string",format:"datetime",check:"string_format",offset:!1,local:!1,precision:null,...ie(n)})}function dl(e,n){return new e({type:"string",format:"date",check:"string_format",...ie(n)})}function pl(e,n){return new e({type:"string",format:"time",check:"string_format",precision:null,...ie(n)})}function ml(e,n){return new e({type:"string",format:"duration",check:"string_format",...ie(n)})}function fl(e,n){return new e(Mc({type:"number",checks:[],...ie(n)}))}function hl(e,n){return new e({type:"number",check:"number_format",abort:!1,format:"safeint",...ie(n)})}function gl(e,n){return new e({type:"boolean",...ie(n)})}function vl(e,n){return new e({type:"null",...ie(n)})}function bl(e){return new e({type:"unknown"})}function yl(e,n){return new e({type:"never",...ie(n)})}function Yo(e,n){return new ni({check:"less_than",...ie(n),value:e,inclusive:!1})}function to(e,n){return new ni({check:"less_than",...ie(n),value:e,inclusive:!0})}function er(e,n){return new ti({check:"greater_than",...ie(n),value:e,inclusive:!1})}function oo(e,n){return new ti({check:"greater_than",...ie(n),value:e,inclusive:!0})}function nr(e,n){return new da({check:"multiple_of",...ie(n),value:e})}function tr(e,n){return new ma({check:"max_length",...ie(n),maximum:e})}function Pt(e,n){return new fa({check:"min_length",...ie(n),minimum:e})}function or(e,n){return new ha({check:"length_equals",...ie(n),length:e})}function mi(e,n){return new ga({check:"string_format",format:"regex",...ie(n),pattern:e})}function fi(e){return new va({check:"string_format",format:"lowercase",...ie(e)})}function hi(e){return new ba({check:"string_format",format:"uppercase",...ie(e)})}function gi(e,n){return new ya({check:"string_format",format:"includes",...ie(n),includes:e})}function vi(e,n){return new _a({check:"string_format",format:"starts_with",...ie(n),prefix:e})}function bi(e,n){return new wa({check:"string_format",format:"ends_with",...ie(n),suffix:e})}function Yn(e){return new xa({check:"overwrite",tx:e})}function yi(e){return Yn(n=>n.normalize(e))}function _i(){return Yn(e=>e.trim())}function wi(){return Yn(e=>e.toLowerCase())}function xi(){return Yn(e=>e.toUpperCase())}function ki(){return Yn(e=>Dr(e))}function _l(e,n,t){return new e({type:"array",element:n,...ie(t)})}function wl(e,n,t){return new e({type:"custom",check:"custom",fn:n,...ie(t)})}function xl(e,n){let t=km(o=>(o.addIssue=i=>{if(typeof i=="string")o.issues.push(zt(i,o.value,t._zod.def));else{let r=i;r.fatal&&(r.continue=!1),r.code??(r.code="custom"),"input"in r||(r.input=o.value),r.inst??(r.inst=t),r.continue??(r.continue=!t._zod.def.abort),o.issues.push(zt(r))}},e(o.value,o)),n);return t}function km(e,n){let t=new Qe({check:"custom",...ie(n)});return t._zod.check=e,t}function ro(e,...n){for(let t of n)for(let o of Reflect.ownKeys(t))Object.prototype.propertyIsEnumerable.call(t,o)&&dn(e,o,t[o]);return e}function qi(e){let n=e?.target??"draft-2020-12";return n==="draft-4"&&(n="draft-04"),n==="draft-7"&&(n="draft-07"),{processors:e.processors??{},metadataRegistry:e?.metadata??pt,target:n,unrepresentable:e?.unrepresentable??"throw",override:e?.override??(()=>{}),io:e?.io??"output",counter:0,seen:new Map,sharedDefsExtractedFor:void 0,sharedEmitDoneFor:void 0,cycles:e?.cycles??"ref",reused:e?.reused??"inline",intersections:[],deferred:[],external:e?.external??void 0}}function Fn(e,n,t,o,i){let r=typeof n.unrepresentable=="function"?n.unrepresentable({zodSchema:e,path:o.path,message:i}):n.unrepresentable;if(r==="any")return!1;if(r===void 0||r==="throw")throw new Error(i);return Object.assign(t,r),!0}function Ne(e,n,t={path:[],schemaPath:[]}){var o;let i=e._zod.def,r=n.seen.get(e);if(r)return r.count++,t.schemaPath.includes(e)&&(r.cycle=t.path),r.schema;let s={schema:{},count:1,cycle:void 0,path:t.path};n.seen.set(e,s),n.sharedDefsExtractedFor=void 0,n.sharedEmitDoneFor=void 0;let a=e._zod.toJSONSchema?.();if(a)s.schema=a;else{let d={...t,schemaPath:[...t.schemaPath,e],path:t.path};if(e._zod.processJSONSchema)e._zod.processJSONSchema(n,s.schema,d);else{let f=s.schema,m=n.processors[i.type];if(!m)throw new Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);m(e,n,f,d)}let p=e._zod.parent;p&&(s.ref||(s.ref=p),Ne(p,n,d),n.seen.get(p).isParent=!0)}let l=n.metadataRegistry.get(e);return l&&ro(s.schema,l),n.io==="input"&&nn(e)&&(delete s.schema.examples,delete s.schema.default),n.io==="input"&&"_prefault"in s.schema&&((o=s.schema).default??(o.default=s.schema._prefault)),delete s.schema._prefault,n.seen.get(e).schema}function kl(e){return e.replace(/~/g,"~0").replace(/\//g,"~1")}function Si(e,n){let t=e.seen.get(n);if(!t)throw new Error("Unprocessed schema. This is a bug in Zod.");if(e.external&&e.sharedDefsExtractedFor===e.external)return;let o=new Map;for(let s of e.seen.entries()){let a=e.metadataRegistry.get(s[0])?.id;if(a){let l=o.get(a);if(l&&l!==s[0])throw new Error(`Duplicate schema id "${a}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);o.set(a,s[0])}}let i=s=>{let a=e.target==="draft-2020-12"?"$defs":"definitions";if(e.external){let p=e.external.registry.get(s[0])?.id,f=e.external.uri??(b=>b);if(p)return{ref:f(p)};let m=s[1].defId??s[1].schema.id??`schema${e.counter++}`;return s[1].defId=m,{defId:m,ref:`${f("__shared")}#/${a}/${kl(m)}`}}let l="#",u=`${l}/${a}/`;if(s[1]===t&&!s[1].schema.id)return{ref:l};let d=s[1].schema.id??`__schema${e.counter++}`;return{defId:d,ref:u+kl(d)}},r=s=>{if(s[1].schema.$ref)return;let a=s[1],{ref:l,defId:u}=i(s);a.def={...a.schema},u&&(a.defId=u);let d=a.schema;for(let p in d)delete d[p];d.$ref=l};if(e.cycles==="throw")for(let s of e.seen.entries()){let a=s[1];if(a.cycle)throw new Error(`Cycle detected: #/${a.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`)}for(let s of e.seen.entries()){let a=s[1];if(n===s[0]){r(s);continue}if(e.external){let u=e.external.registry.get(s[0])?.id;if(n!==s[0]&&u){r(s);continue}}if(e.metadataRegistry.get(s[0])?.id){r(s);continue}if(a.cycle){r(s);continue}a.count>1&&e.reused==="ref"&&r(s)}e.external&&(e.sharedDefsExtractedFor=e.external)}function Sl(e){let n=e.anyOf;if(!Array.isArray(n)||n.length===0||e.type!==void 0)return;let t=[];for(let o of n){if(!o||typeof o!="object")return;Sl(o);let i=Object.keys(o);if(i.length!==1||i[0]!=="type")return;let r=o.type;for(let s of Array.isArray(r)?r:[r]){if(typeof s!="string")return;t.includes(s)||t.push(s)}}delete e.anyOf,e.type=t.length===1?t[0]:t}var Bl=new Set(["type","properties","required","additionalProperties"]),Al=["oneOf","anyOf"];function ql(e){let n=e.additionalProperties;return n===void 0||n===!1||typeof n!="object"||n===null?null:Object.keys(n).length?n:null}function Ai(e){let n=[];for(let r of e){if(typeof r!="object"||r.type!=="object")return null;for(let s in r)if(!Bl.has(s))return null;n.push(r)}let t={},o=new Set;for(let r of n){for(let s in r.properties){if(Object.prototype.hasOwnProperty.call(t,s))continue;let a=[];for(let u of n){let d=u.properties?.[s]??ql(u);d!=null&&(a.some(p=>JSON.stringify(p)===JSON.stringify(d))||a.push(d))}let l=a.length===1?a[0]:Ai(a)??{allOf:a};dn(t,s,l)}for(let s of r.required??[])o.add(s)}let i={type:"object",properties:t};if(o.size&&(i.required=[...o]),n.every(r=>r.additionalProperties===!1))i.additionalProperties=!1;else{let r=[];for(let s of n){let a=ql(s);a&&!r.some(l=>JSON.stringify(l)===JSON.stringify(a))&&r.push(a)}r.length===1?i.additionalProperties=r[0]:r.length>1&&(i.additionalProperties={allOf:r})}return i}function Am(e){let n=e.allOf;if(!Array.isArray(n)||n.length<2)return;for(let i of Bl)if(i in e)return;let t=n.filter(i=>Al.some(r=>Array.isArray(i[r]))),o=null;if(!t.length)o=Ai(n);else{let i=t[0],r=Al.find(l=>Array.isArray(i[l]));if(Object.keys(i).length!==1)return;let s=n.filter(l=>l!==i),a=i[r].map(l=>Ai([...s,l]));if(a.some(l=>!l))return;o={[r]:a}}o&&(delete e.allOf,ro(e,o))}function Bi(e,n){let t=e.seen.get(n);if(!t)throw new Error("Unprocessed schema. This is a bug in Zod.");let o=a=>{let l=e.seen.get(a);if(l.ref===null)return;let u=l.def??l.schema,d={...u},p=l.ref;if(l.ref=null,p){o(p);let m=e.seen.get(p),b=m.schema;if(b.$ref&&(e.target==="draft-07"||e.target==="draft-04"||e.target==="openapi-3.0")?(u.allOf=u.allOf??[],u.allOf.push(b)):ro(u,b),ro(u,d),a._zod.parent===p)for(let _ in u)_==="$ref"||_==="allOf"||_ in d||delete u[_];if(b.$ref&&m.def)for(let _ in u)_==="$ref"||_==="allOf"||_ in m.def&&JSON.stringify(u[_])===JSON.stringify(m.def[_])&&delete u[_]}let f=a._zod.parent;if(f&&f!==p){o(f);let m=e.seen.get(f);if(m?.schema.$ref&&(u.$ref=m.schema.$ref,m.def))for(let b in u)b==="$ref"||b==="allOf"||b in m.def&&JSON.stringify(u[b])===JSON.stringify(m.def[b])&&delete u[b]}e.override({zodSchema:a,jsonSchema:u,path:l.path??[]})};if(!e.external||e.sharedEmitDoneFor!==e.external){for(let a of[...e.seen.entries()].reverse())o(a[0]);if(e.target!=="openapi-3.0")for(let a of e.seen.entries())Sl(a[1].def??a[1].schema);for(let a of e.deferred)a();if(e.intersections.length){let a=new Map;for(let l of e.seen.values())for(let u of[l.schema,l.def]){let d=u?.allOf;if(!Array.isArray(d))continue;let p=a.get(d);p?p.push(u):a.set(d,[u])}for(let l of e.intersections)for(let u of a.get(l)??[])Am(u)}}let i={};if(e.target==="draft-2020-12"?i.$schema="https://json-schema.org/draft/2020-12/schema":e.target==="draft-07"?i.$schema="http://json-schema.org/draft-07/schema#":e.target==="draft-04"?i.$schema="http://json-schema.org/draft-04/schema#":e.target,e.external?.uri){let a=e.external.registry.get(n)?.id;if(!a)throw new Error("Schema is missing an `id` property");i.$id=e.external.uri(a)}ro(i,t.defId?t.schema:t.def??t.schema);let r=e.metadataRegistry.get(n)?.id;r!==void 0&&i.id===r&&delete i.id;let s=e.external?.defs??{};if(!e.external||e.sharedEmitDoneFor!==e.external)for(let a of e.seen.entries()){let l=a[1];l.def&&l.defId&&(l.def.id===l.defId&&delete l.def.id,dn(s,l.defId,l.def))}e.external&&(e.sharedEmitDoneFor=e.external),e.external||Object.keys(s).length>0&&(e.target==="draft-2020-12"?i.$defs=s:i.definitions=s);try{let a=JSON.parse(JSON.stringify(i));return Object.defineProperty(a,"~standard",{value:{...n["~standard"],jsonSchema:{input:io(n,"input",e.processors),output:io(n,"output",e.processors)}},enumerable:!1,writable:!1}),a}catch{throw new Error("Error converting schema to JSON.")}}function nn(e,n){let t=n??{seen:new Set};if(t.seen.has(e))return!1;t.seen.add(e);let o=e._zod.def;if(o.type==="transform")return!0;if(o.type==="array")return nn(o.element,t);if(o.type==="set")return nn(o.valueType,t);if(o.type==="lazy")return nn(o.getter(),t);if(o.type==="promise"||o.type==="optional"||o.type==="nonoptional"||o.type==="nullable"||o.type==="readonly"||o.type==="default"||o.type==="prefault"||o.type==="catch")return nn(o.innerType,t);if(o.type==="intersection")return nn(o.left,t)||nn(o.right,t);if(o.type==="record"||o.type==="map")return nn(o.keyType,t)||nn(o.valueType,t);if(o.type==="pipe")return e._zod.traits.has("$ZodCodec")?!0:nn(o.in,t)||nn(o.out,t);if(o.type==="object"){for(let i in o.shape)if(nn(o.shape[i],t))return!0;return!1}if(o.type==="union"){for(let i of o.options)if(nn(i,t))return!0;return!1}if(o.type==="tuple"){for(let i of o.items)if(nn(i,t))return!0;return!!(o.rest&&nn(o.rest,t))}return!1}var zl=(e,n={})=>t=>{let o=qi({...t,processors:n});return Ne(e,o),Si(o,e),Bi(o,e)},io=(e,n,t={})=>o=>{let{libraryOptions:i,target:r}=o??{},s=qi({...i??{},target:r,io:n,processors:t});return Ne(e,s),Si(s,e),Bi(s,e)};var Gt=(e,n,t)=>{(e[n]===void 0||t>e[n])&&(e[n]=t)},Nt=(e,n,t)=>{(e[n]===void 0||t<e[n])&&(e[n]=t)},Cl=(e,n)=>{Gt(e,"minimum",n),Nt(e,"maximum",n)},Tl=(e,n)=>{e.multipleOf??(e.multipleOf=[]),e.multipleOf.includes(n)||e.multipleOf.push(n)},El=(e,n)=>{e.patterns??(e.patterns=new Set),e.patterns.add(n)},Il=(e,n)=>{e.mime=e.mime?e.mime.filter(t=>n.includes(t)):[...n]},$l=(e,n)=>{e.format=n,n.includes("int")&&(e.isInt=!0)},Pl=(e,n)=>Gt(e,"minimum",n.minimum),Gl=(e,n)=>Nt(e,"maximum",n.maximum),Nl=e=>(n,t)=>{$l(n,t.format);let[o,i]=e[t.format];Gt(n,"minimum",o),Nt(n,"maximum",i)},qm={greater_than:(e,n)=>Gt(e,n.inclusive?"minimum":"exclusiveMinimum",n.value),less_than:(e,n)=>Nt(e,n.inclusive?"maximum":"exclusiveMaximum",n.value),multiple_of:(e,n)=>Tl(e,n.value),number_format:Nl(jt),bigint_format:Nl(To),min_length:Pl,max_length:Gl,length_equals:(e,n)=>Cl(e,n.length),min_size:Pl,max_size:Gl,size_equals:(e,n)=>Cl(e,n.size),string_format:(e,n)=>{$l(e,n.format),n.pattern&&El(e,n.pattern),(n.format==="base64"||n.format==="base64url")&&(e.contentEncoding=n.format),(n.local||n.precision===-1)&&(e.laxFormat=!0)},mime_type:(e,n)=>Il(e,n.mime)};function bn(e){let n={},t=e._zod.def,o=e._zod.traits.has("$ZodCheck")?[e,...t.checks??[]]:t.checks??[];for(let r of o)qm[r._zod.def.check]?.(n,r._zod.def);let i=e._zod.bag;i.minimum!==void 0&&Gt(n,"minimum",i.minimum),i.exclusiveMinimum!==void 0&&Gt(n,"exclusiveMinimum",i.exclusiveMinimum),i.maximum!==void 0&&Nt(n,"maximum",i.maximum),i.exclusiveMaximum!==void 0&&Nt(n,"exclusiveMaximum",i.exclusiveMaximum),i.multipleOf!==void 0&&Tl(n,i.multipleOf),i.format!==void 0&&(n.format??(n.format=i.format),i.format.includes("int")&&(n.isInt=!0)),i.mime&&Il(n,i.mime);for(let r of i.patterns??[])El(n,r);return n}var Sm={guid:"uuid",url:"uri",datetime:"date-time",json_string:"json-string",regex:""},Bm=new Map([[ii,Xs],[Qo,Ys]]),Ol=e=>Bm.get(e)??e,Rl=(e,n,t,o)=>{let i=t;i.type="string";let{minimum:r,maximum:s,format:a,patterns:l,contentEncoding:u,laxFormat:d}=bn(e);if(typeof r=="number"&&(i.minLength=r),typeof s=="number"&&(i.maxLength=s),a&&(i.format=Sm[a]??a,i.format===""&&delete i.format,(a==="time"||d)&&delete i.format),u&&(i.contentEncoding=u),l&&l.size>0){let p=[...l].map(Ol);p.length===1?i.pattern=p[0].source:p.length>1&&(i.allOf=[...p.map(f=>({...n.target==="draft-07"||n.target==="draft-04"||n.target==="openapi-3.0"?{type:"string"}:{},pattern:f.source}))])}},Dl=(e,n,t,o)=>{let i=t,{minimum:r,maximum:s,multipleOf:a,exclusiveMaximum:l,exclusiveMinimum:u,isInt:d}=bn(e);i.type=d?"integer":"number";let p=typeof u=="number"&&u>=(r??Number.NEGATIVE_INFINITY),f=typeof l=="number"&&l<=(s??Number.POSITIVE_INFINITY),m=n.target==="draft-04"||n.target==="openapi-3.0";if(p?m?(i.minimum=u,i.exclusiveMinimum=!0):i.exclusiveMinimum=u:typeof r=="number"&&(i.minimum=r),f?m?(i.maximum=l,i.exclusiveMaximum=!0):i.exclusiveMaximum=l:typeof s=="number"&&(i.maximum=s),a){let b=new Set;for(let x of a)Number.isFinite(x)&&x!==0?b.add(Math.abs(x)):Fn(e,n,i,o,`A multipleOf divisor of ${x} cannot be represented in JSON Schema`);let[g,..._]=b;g!==void 0&&(i.multipleOf=g),_.length&&(i.allOf=[...i.allOf??[],..._.map(x=>({multipleOf:x}))])}},Ml=(e,n,t,o)=>{t.type="boolean"};var Zl=(e,n,t,o)=>{n.target==="openapi-3.0"?(t.type="string",t.nullable=!0,t.enum=[null]):t.type="null"};var Fl=(e,n,t,o)=>{t.not={}};var Ul=(e,n,t,o)=>{};var Ll=(e,n,t,o)=>{let i=e._zod.def,r=At(i.entries);if(r.length===0){t.not={};return}r.every(s=>typeof s=="number")&&(t.type="number"),r.every(s=>typeof s=="string")&&(t.type="string"),t.enum=r},Vl=(e,n,t,o)=>{let i=e._zod.def;if(i.values.length===0){t.not={};return}let r=[];for(let s of i.values)if(s===void 0){if(Fn(e,n,t,o,"Literal `undefined` cannot be represented in JSON Schema"))return}else if(typeof s=="bigint"){if(Fn(e,n,t,o,"BigInt literals cannot be represented in JSON Schema"))return;r.push(Number(s))}else r.push(s);if(r.length!==0)if(r.length===1){let s=r[0];t.type=s===null?"null":typeof s,n.target==="draft-04"||n.target==="openapi-3.0"?t.enum=[s]:t.const=s}else r.every(s=>typeof s=="number")&&(t.type="number"),r.every(s=>typeof s=="string")&&(t.type="string"),r.every(s=>typeof s=="boolean")&&(t.type="boolean"),r.every(s=>s===null)&&(t.type="null"),t.enum=r};var Hl=(e,n,t,o)=>{Fn(e,n,t,o,"Custom types cannot be represented in JSON Schema")};var jl=(e,n,t,o)=>{Fn(e,n,t,o,"Transforms cannot be represented in JSON Schema")};var Ql=(e,n,t,o)=>{let i=t,r=e._zod.def,{minimum:s,maximum:a}=bn(e);typeof s=="number"&&(i.minItems=s),typeof a=="number"&&(i.maxItems=a),i.type="array",i.items=Ne(r.element,n,{...o,path:[...o.path,"items"]})};function rr(e){let n=e._zod.def;return n.type==="pipe"&&n.in._zod.traits.has("$ZodTransform")?rr(n.out):n.type==="catch"?rr(n.innerType):e._zod.optin}var Wl=(e,n,t,o)=>{let i=t,r=e._zod.def,s=r.shape;if(Object.getOwnPropertySymbols(s).length&&Fn(e,n,i,o,"Symbol keys cannot be represented in JSON Schema"))return;i.type="object",i.properties={};for(let u in s)dn(i.properties,u,Ne(s[u],n,{...o,path:[...o.path,"properties",u]}));let l=[];for(let u of Object.keys(s)){let d=r.shape[u];(n.io==="input"?rr(d)===void 0:d._zod.optout===void 0)&&l.push(u)}l.length>0&&(i.required=l),r.catchall?._zod.def.type==="never"?i.additionalProperties=!1:r.catchall?r.catchall&&(i.additionalProperties=Ne(r.catchall,n,{...o,path:[...o.path,"additionalProperties"]})):n.io==="output"&&(i.additionalProperties=!1)},Kl=(e,n,t,o)=>{let i=e._zod.def,r=i.inclusive===!1,s=i.options.map((a,l)=>Ne(a,n,{...o,path:[...o.path,r?"oneOf":"anyOf",l]}));r?t.oneOf=s:t.anyOf=s},Jl=(e,n,t,o)=>{let i=e._zod.def,r=Ne(i.left,n,{...o,path:[...o.path,"allOf",0]}),s=Ne(i.right,n,{...o,path:[...o.path,"allOf",1]}),a=u=>"allOf"in u&&Object.keys(u).length===1,l=[...a(r)?r.allOf:[r],...a(s)?s.allOf:[s]];t.allOf=l,n.intersections.push(l)};function zi(e,n,t){if(n.$ref){if(t.has(n))return n;t.add(n);let b=e.get(n)?.def;if(!b)return n;let g=zi(e,b,t);return g===b?n:g}for(let b of["anyOf","oneOf"]){let g=n[b];if(!Array.isArray(g))continue;let _=g.map(x=>zi(e,x,t));_.some((x,S)=>x!==g[S])&&(n={...n,[b]:_})}let o=Array.isArray(n.type)?n.type:[n.type],i=!o.includes("string")&&o.some(b=>b==="number"||b==="integer"),r=n.enum??(n.const!==void 0?[n.const]:void 0);if(!i&&!r?.some(b=>typeof b=="number"))return n;let{minimum:s,maximum:a,exclusiveMinimum:l,exclusiveMaximum:u,multipleOf:d,format:p,id:f,...m}=n;return m.enum?m.enum=m.enum.map(b=>typeof b=="number"?String(b):b):typeof m.const=="number"&&(m.const=String(m.const)),i&&(m.type="string",r||(m.pattern=(o.includes("number")?Jt:Yr).source)),m}var Ci=new WeakMap;function zm(e){let n=new Map;for(let o of e.seen.values())o.def&&!n.has(o.schema)&&n.set(o.schema,o);let t=new Map;for(let o of Ci.get(e)??[]){let i=e.seen.get(o),r=(i?.def??i?.schema)?.propertyNames;if(!r||r===!0||t.has(r))continue;let s=zi(n,r,new Set);s!==r&&t.set(r,s)}if(t.size)for(let o of e.seen.values())for(let i of[o.schema,o.def]){let r=i&&t.get(i.propertyNames);r&&(i.propertyNames=r)}}var Xl=(e,n,t,o)=>{let i=t,r=e._zod.def;i.type="object";let s=r.keyType,a=bn(s).patterns;if(r.mode==="loose"&&a&&a.size>0){let d=Ne(r.valueType,n,{...o,path:[...o.path,"patternProperties","*"]});i.patternProperties={};for(let p of a)dn(i.patternProperties,Ol(p).source,d)}else{if(n.target==="draft-07"||n.target==="draft-2020-12"){i.propertyNames=Ne(r.keyType,n,{...o,path:[...o.path,"propertyNames"]});let d=Ci.get(n);d||(d=[],Ci.set(n,d),n.deferred.push(()=>zm(n))),d.push(e)}i.additionalProperties=Ne(r.valueType,n,{...o,path:[...o.path,"additionalProperties"]})}let l=s._zod.values,u=n.io==="input"&&rr(r.valueType)!==void 0;if(l&&!r.partial&&!u){let d=[...l].filter(p=>typeof p=="string"||typeof p=="number");d.length>0&&(i.required=d.map(String))}},Yl=(e,n,t,o)=>{let i=e._zod.def,r=Ne(i.innerType,n,o),s=n.seen.get(e);n.target==="openapi-3.0"?(s.ref=i.innerType,t.nullable=!0):t.anyOf=[r,{type:"null"}]},eu=(e,n,t,o)=>{let i=e._zod.def;Ne(i.innerType,n,o);let r=n.seen.get(e);r.ref=i.innerType},Pi=Symbol();function nu(e,n,t,o,i){let r=!1,s=JSON.stringify(e,(a,l)=>typeof l!="bigint"?l:(r=!0,null));return r?(Fn(n,t,o,i,"BigInt defaults cannot be represented in JSON Schema"),Pi):JSON.parse(s)}var tu=(e,n,t,o)=>{let i=e._zod.def;Ne(i.innerType,n,o);let r=n.seen.get(e);r.ref=i.innerType;let s=nu(i.defaultValue,e,n,t,o);s!==Pi&&(t.default=s)},ou=(e,n,t,o)=>{let i=e._zod.def;Ne(i.innerType,n,o);let r=n.seen.get(e);if(r.ref=i.innerType,n.io!=="input")return;let s=nu(i.defaultValue,e,n,t,o);s!==Pi&&(t._prefault=s)},ru=(e,n,t,o)=>{let i=e._zod.def;Ne(i.innerType,n,o);let r=n.seen.get(e);r.ref=i.innerType;let s;try{s=i.catchValue(void 0)}catch{Fn(e,n,t,o,"Dynamic catch values are not supported in JSON Schema");return}t.default=s},iu=(e,n,t,o)=>{let i=e._zod.def,r=i.in._zod.traits.has("$ZodTransform"),s=n.io==="input"?r?i.out:i.in:i.out;Ne(s,n,o);let a=n.seen.get(e);a.ref=s},su=(e,n,t,o)=>{let i=e._zod.def;Ne(i.innerType,n,o);let r=n.seen.get(e);r.ref=i.innerType,t.readOnly=!0};var Gi=(e,n,t,o)=>{let i=e._zod.def;Ne(i.innerType,n,o);let r=n.seen.get(e);r.ref=i.innerType},au=(e,n,t,o)=>{let i=e._zod.innerType;Ne(i,n,o);let r=n.seen.get(e);r.ref=i};var cu=new WeakSet([Object.prototype,Error.prototype]);function ir(e,n,t){Object.defineProperty(e,n,{configurable:!0,enumerable:!1,get(){let o=t(this);return Object.defineProperty(this,n,{value:o,configurable:!0,writable:!0}),o},set(o){Object.defineProperty(this,n,{value:o,configurable:!0,writable:!0})}})}var $m=(e,n)=>{qs.init(e,n),e.name="ZodError";let t=Object.getPrototypeOf(e);cu.has(t)||(cu.add(t),ir(t,"format",o=>i=>Bs(o,i)),ir(t,"flatten",o=>i=>Ss(o,i)),ir(t,"addIssue",o=>i=>{o.issues.push(i),o.message=JSON.stringify(o.issues,qt,2)}),ir(t,"addIssues",o=>i=>{o.issues.push(...i),o.message=JSON.stringify(o.issues,qt,2)}),Object.defineProperty(t,"isEmpty",{configurable:!0,enumerable:!1,get(){return this.issues.length===0}}))};var mn=E("ZodError",$m,void 0,{Parent:Error});var lu=Ro(mn),uu=Do(mn),du=Mo(mn),pu=Zo(mn),mu=Cs(mn),fu=Ps(mn),hu=Gs(mn),gu=Ns(mn),vu=Ts(mn),bu=Es(mn),yu=Is(mn),_u=$s(mn);function Rm(){sn.localeError||pn(Rc())}function ar(){sn.memoizer||pn({memoizer:Oc()})}var ze=E("ZodType",(e,n)=>(Rm(),qe.init(e,n),e.def=n,e.type=n.type,e),{check(...e){let n=this.def;return this.clone(ce.mergeDefs(n,{checks:[...n.checks??[],...e.map(t=>typeof t=="function"?{_zod:{check:t,def:{check:"custom"},onattach:[]}}:t)]}),{parent:!0})},with(...e){return this.check(...e)},clone(e,n){return qn(this,e,n)},brand(){return this},register(e,n){return e.add(this,n),this},refine(e,n){return this.check(Of(e,n))},superRefine(e,n){return this.check(Rf(e,n))},overwrite(e){return this.check(Yn(e))},optional(){return Au(this)},exactOptional(){return xf(this)},nullable(){return qu(this)},nullish(){return Au(qu(this))},nonoptional(e){return zf(this,e)},array(){return Se(this)},or(e){return Tt([this,e])},and(e){return bf(this,e)},transform(e){return Su(this,wf(e))},default(e){return qf(this,e)},prefault(e){return Bf(this,e)},catch(e){return Pf(this,e)},pipe(e){return Su(this,e)},readonly(){return Tf(this)},describe(e){let n=this.clone();return pt.add(n,{description:e}),n},meta(...e){if(e.length===0)return pt.get(this);let n=this.clone();return pt.add(n,e[0]),n},isOptional(){return this.safeParse(void 0).success},isNullable(){return this.safeParse(null).success},apply(e,...n){return n.length===0?e(this):e(this,...n)},get"~standard"(){return ce.hide(this,"~standard",{...ri(this),jsonSchema:{input:io(this,"input"),output:io(this,"output")}})},set"~standard"(e){ce.own(this,"~standard",e)},parse:function e(n,t){return lu(this,n,t,{callee:e})},parseAsync:async function e(n,t){return await uu(this,n,t,{callee:e})},safeParse(e,n){return du(this,e,n)},async safeParseAsync(e,n){return pu(this,e,n)},get spa(){return this?.safeParseAsync},set spa(e){ce.own(this,"spa",e)},validate(e,n){return Wr(this,e,n)},validateAsync(e,n){return Kr(this,e,n)},encode:function e(n,t){return mu(this,n,t,{callee:e})},decode:function e(n,t){return fu(this,n,t,{callee:e})},encodeAsync:async function e(n,t){return await hu(this,n,t,{callee:e})},decodeAsync:async function e(n,t){return await gu(this,n,t,{callee:e})},safeEncode(e,n){return vu(this,e,n)},safeDecode(e,n){return bu(this,e,n)},async safeEncodeAsync(e,n){return yu(this,e,n)},async safeDecodeAsync(e,n){return _u(this,e,n)},toJSONSchema(e){return zl(this,{})(e)},get description(){return pt.get(this)?.description},get _def(){return this._zod.def}}),Bu=E("_ZodString",(e,n)=>{jo.init(e,n),ze.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Rl(e,t,o,i)},ce.derived({format:e=>bn(e).format??null,minLength:e=>bn(e).minimum??null,maxLength:e=>bn(e).maximum??null},{regex(...e){return this.check(mi(...e))},includes(...e){return this.check(gi(...e))},startsWith(...e){return this.check(vi(...e))},endsWith(...e){return this.check(bi(...e))},min(...e){return this.check(Pt(...e))},max(...e){return this.check(tr(...e))},length(...e){return this.check(or(...e))},nonempty(...e){return this.check(Pt(1,...e))},lowercase(e){return this.check(fi(e))},uppercase(e){return this.check(hi(e))},trim(){return this.check(_i())},normalize(...e){return this.check(yi(...e))},toLowerCase(){return this.check(wi())},toUpperCase(){return this.check(xi())},slugify(){return this.check(ki())}})),Dm=E("ZodString",(e,n)=>{jo.init(e,n),Bu.init(e,n)},{email(e){return this.check(Fc(Lm,e))},url(e){return this.check(Qc(Hm,e))},jwt(e){return this.check(ll(cf,e))},emoji(e){return this.check(Wc(jm,e))},guid(e){return this.check(Uc(Vm,e))},uuid(e){return this.check(Lc(sr,e))},uuidv4(e){return this.check(Vc(sr,e))},uuidv6(e){return this.check(Hc(sr,e))},uuidv7(e){return this.check(jc(sr,e))},nanoid(e){return this.check(Kc(Qm,e))},cuid(e){return this.check(Jc(Wm,e))},cuid2(e){return this.check(Xc(Km,e))},ulid(e){return this.check(Yc(Jm,e))},base64(e){return this.check(sl(rf,e))},base64url(e){return this.check(al(sf,e))},xid(e){return this.check(el(Xm,e))},ksuid(e){return this.check(nl(Ym,e))},ipv4(e){return this.check(tl(ef,e))},ipv6(e){return this.check(ol(nf,e))},cidrv4(e){return this.check(rl(tf,e))},cidrv6(e){return this.check(il(of,e))},e164(e){return this.check(cl(af,e))},datetime(e){return this.check(ul(Mm,e))},date(e){return this.check(dl(Zm,e))},time(e){return this.check(pl(Fm,e))},duration(e){return this.check(ml(Um,e))}});function te(e){return Zc(Dm,e)}var Pe=E("ZodStringFormat",(e,n)=>{Be.init(e,n),Bu.init(e,n)}),Mm=E("ZodISODateTime",(e,n)=>{Wa.init(e,n),Pe.init(e,n)}),Zm=E("ZodISODate",(e,n)=>{Ka.init(e,n),Pe.init(e,n)}),Fm=E("ZodISOTime",(e,n)=>{Ja.init(e,n),Pe.init(e,n)}),Um=E("ZodISODuration",(e,n)=>{Xa.init(e,n),Pe.init(e,n)}),Lm=E("ZodEmail",(e,n)=>{Ra.init(e,n),Pe.init(e,n)});var Vm=E("ZodGUID",(e,n)=>{$a.init(e,n),Pe.init(e,n)});var sr=E("ZodUUID",(e,n)=>{Oa.init(e,n),Pe.init(e,n)});var Hm=E("ZodURL",(e,n)=>{Za.init(e,n),Pe.init(e,n)});var jm=E("ZodEmoji",(e,n)=>{Fa.init(e,n),Pe.init(e,n)});var Qm=E("ZodNanoID",(e,n)=>{Ua.init(e,n),Pe.init(e,n)});var Wm=E("ZodCUID",(e,n)=>{La.init(e,n),Pe.init(e,n)});var Km=E("ZodCUID2",(e,n)=>{Va.init(e,n),Pe.init(e,n)});var Jm=E("ZodULID",(e,n)=>{Ha.init(e,n),Pe.init(e,n)});var Xm=E("ZodXID",(e,n)=>{ja.init(e,n),Pe.init(e,n)});var Ym=E("ZodKSUID",(e,n)=>{Qa.init(e,n),Pe.init(e,n)});var ef=E("ZodIPv4",(e,n)=>{Ya.init(e,n),Pe.init(e,n)});var nf=E("ZodIPv6",(e,n)=>{nc.init(e,n),Pe.init(e,n)});var tf=E("ZodCIDRv4",(e,n)=>{tc.init(e,n),Pe.init(e,n)});var of=E("ZodCIDRv6",(e,n)=>{oc.init(e,n),Pe.init(e,n)});var rf=E("ZodBase64",(e,n)=>{ic.init(e,n),Pe.init(e,n)});var sf=E("ZodBase64URL",(e,n)=>{sc.init(e,n),Pe.init(e,n)});var af=E("ZodE164",(e,n)=>{ac.init(e,n),Pe.init(e,n)});var cf=E("ZodJWT",(e,n)=>{cc.init(e,n),Pe.init(e,n)});var zu=E("ZodNumber",(e,n)=>{si.init(e,n),ze.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Dl(e,t,o,i),e.isFinite=!0},ce.derived({minValue:e=>{let{minimum:n,exclusiveMinimum:t}=bn(e);return Math.max(n??Number.NEGATIVE_INFINITY,t??Number.NEGATIVE_INFINITY)},maxValue:e=>{let{maximum:n,exclusiveMaximum:t}=bn(e);return Math.min(n??Number.POSITIVE_INFINITY,t??Number.POSITIVE_INFINITY)},isInt:e=>{let{isInt:n,multipleOf:t}=bn(e);return!!n||!!t?.some(Number.isSafeInteger)},format:e=>bn(e).format??null},{gt(e,n){return this.check(er(e,n))},gte(e,n){return this.check(oo(e,n))},min(e,n){return this.check(oo(e,n))},lt(e,n){return this.check(Yo(e,n))},lte(e,n){return this.check(to(e,n))},max(e,n){return this.check(to(e,n))},int(e){return this.check(wu(e))},safe(e){return this.check(wu(e))},positive(e){return this.check(er(0,e))},nonnegative(e){return this.check(oo(0,e))},negative(e){return this.check(Yo(0,e))},nonpositive(e){return this.check(to(0,e))},multipleOf(e,n){return this.check(nr(e,n))},step(e,n){return this.check(nr(e,n))},finite(){return this}}));function an(e){return fl(zu,e)}var lf=E("ZodNumberFormat",(e,n)=>{lc.init(e,n),zu.init(e,n)});function wu(e){return hl(lf,e)}var uf=E("ZodBoolean",(e,n)=>{uc.init(e,n),ze.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Ml(e,t,o,i)});function be(e){return gl(uf,e)}var df=E("ZodNull",(e,n)=>{dc.init(e,n),ze.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Zl(e,t,o,i)});function so(e){return vl(df,e)}var pf=E("ZodUnknown",(e,n)=>{pc.init(e,n),ze.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Ul(e,t,o,i)});function xu(){return bl(pf)}var mf=E("ZodNever",(e,n)=>{mc.init(e,n),ze.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Fl(e,t,o,i)});function Cu(e){return yl(mf,e)}var ff=E("ZodArray",(e,n)=>{ar(),fc.init(e,n),ze.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Ql(e,t,o,i),e.element=n.element},{min(e,n){return this.check(Pt(e,n))},nonempty(e){return this.check(Pt(1,e))},max(e,n){return this.check(tr(e,n))},length(e,n){return this.check(or(e,n))},unwrap(){return this.element}});function Se(e,n){return _l(ff,e,n)}var hf=E("ZodObject",(e,n)=>{ar(),vc.init(e,n),ze.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Wl(e,t,o,i),ce.installLazyProp(e,"shape",t=>t._zod.def.shape,!1)},{keyof(){return ue(Object.keys(this._zod.def.shape))},catchall(e){return this.clone(ce.mergeDefs(this._zod.def,{catchall:e}))},passthrough(){return this.clone(ce.mergeDefs(this._zod.def,{catchall:xu()}))},loose(){return this.clone(ce.mergeDefs(this._zod.def,{catchall:xu()}))},strict(){return this.clone(ce.mergeDefs(this._zod.def,{catchall:Cu()}))},strip(){return this.clone(ce.mergeDefs(this._zod.def,{catchall:void 0}))},extend(e){return ce.extend(this,e)},safeExtend(e){return ce.safeExtend(this,e)},merge(e){return ce.merge(this,e)},pick(e){return ce.pick(this,e)},omit(e){return ce.omit(this,e)},partial(...e){return ce.partial(Gu,this,e[0])},exactPartial(...e){return ce.partial(Nu,this,e[0],"exactPartial")},required(...e){return ce.required(Tu,this,e[0])}});function W(e,n){return new hf({type:"object",shape:e,catchall:Cu(),...ce.normalizeParams(n)})}var Pu=E("ZodUnion",(e,n)=>{ai.init(e,n),ze.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Kl(e,t,o,i),e.options=n.options});function Tt(e,n){return new Pu({type:"union",options:e,...ce.normalizeParams(n)})}var gf=E("ZodDiscriminatedUnion",(e,n)=>{Pu.init(e,n),bc.init(e,n)});function ao(e,n,t){return new gf({type:"union",options:n,discriminator:e,...ce.normalizeParams(t)})}var vf=E("ZodIntersection",(e,n)=>{yc.init(e,n),ze.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Jl(e,t,o,i)});function bf(e,n){return new vf({type:"intersection",left:e,right:n})}var ku=E("ZodRecord",(e,n)=>{ar(),_c.init(e,n),ze.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Xl(e,t,o,i),e.keyType=n.keyType,e.valueType=n.valueType});function Ei(e,n,t){return!n||!n._zod?new ku({type:"record",keyType:te(),valueType:e,...ce.normalizeParams(n)}):new ku({type:"record",keyType:e,valueType:n,...ce.normalizeParams(t)})}var Ti=E("ZodEnum",(e,n)=>{wc.init(e,n),ze.init(e,n),e._zod.processJSONSchema=(o,i,r)=>Ll(e,o,i,r),e.enum=n.entries,e.options=[...e._zod.values];let t=new Set(Object.keys(n.entries));e.extract=(o,i)=>{let r={};for(let s of o)if(t.has(s))r[s]=n.entries[s];else throw new Error(`Key ${s} not found in enum`);return new Ti({...n,checks:[],...ce.normalizeParams(i),entries:r})},e.exclude=(o,i)=>{let r={...n.entries};for(let s of o)if(t.has(s))delete r[s];else throw new Error(`Key ${s} not found in enum`);return new Ti({...n,checks:[],...ce.normalizeParams(i),entries:r})}});function ue(e,n){let t=Array.isArray(e)?Object.fromEntries(e.map(o=>[o,o])):e;return new Ti({type:"enum",entries:t,...ce.normalizeParams(n)})}var yf=E("ZodLiteral",(e,n)=>{xc.init(e,n),ze.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Vl(e,t,o,i),e.values=new Set(n.values),Object.defineProperty(e,"value",{get(){if(n.values.length>1)throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");return n.values[0]}})});function ye(e,n){return new yf({type:"literal",values:Array.isArray(e)?e:[e],...ce.normalizeParams(n)})}var _f=E("ZodTransform",(e,n)=>{ar(),kc.init(e,n),ze.init(e,n),e._zod.processJSONSchema=(t,o,i)=>jl(e,t,o,i),e._zod.parse=(t,o)=>{if(o.direction==="backward")throw new Ct(e.constructor.name);t.addIssue=r=>{if(typeof r=="string")t.issues.push(ce.issue(r,t.value,n));else{let s=r;s.fatal&&(s.continue=!1),s.code??(s.code="custom"),"input"in s||(s.input=t.value),s.inst??(s.inst=e),t.issues.push(ce.issue(s))}};let i=n.transform(t.value,t);return i instanceof Promise?i.then(r=>(t.value=r,t)):(t.value=i,t)}});function wf(e){return new _f({type:"transform",transform:e})}var Gu=E("ZodOptional",(e,n)=>{ci.init(e,n),ze.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Gi(e,t,o,i),e.unwrap=()=>e._zod.def.innerType});function Au(e){return new Gu({type:"optional",innerType:e})}var Nu=E("ZodExactOptional",(e,n)=>{Ac.init(e,n),ze.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Gi(e,t,o,i),e.unwrap=()=>e._zod.def.innerType});function xf(e){return new Nu({type:"optional",innerType:e})}var kf=E("ZodNullable",(e,n)=>{qc.init(e,n),ze.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Yl(e,t,o,i),e.unwrap=()=>e._zod.def.innerType});function qu(e){return new kf({type:"nullable",innerType:e})}var Af=E("ZodDefault",(e,n)=>{Sc.init(e,n),ze.init(e,n),e._zod.processJSONSchema=(t,o,i)=>tu(e,t,o,i),e.unwrap=()=>e._zod.def.innerType,e.removeDefault=e.unwrap});function qf(e,n){return new Af({type:"default",innerType:e,get defaultValue(){return typeof n=="function"?n():ce.shallowClone(n)}})}var Sf=E("ZodPrefault",(e,n)=>{Bc.init(e,n),ze.init(e,n),e._zod.processJSONSchema=(t,o,i)=>ou(e,t,o,i),e.unwrap=()=>e._zod.def.innerType});function Bf(e,n){return new Sf({type:"prefault",innerType:e,get defaultValue(){return typeof n=="function"?n():ce.shallowClone(n)}})}var Tu=E("ZodNonOptional",(e,n)=>{zc.init(e,n),ze.init(e,n),e._zod.processJSONSchema=(t,o,i)=>eu(e,t,o,i),e.unwrap=()=>e._zod.def.innerType});function zf(e,n){return new Tu({type:"nonoptional",innerType:e,...ce.normalizeParams(n)})}var Cf=E("ZodCatch",(e,n)=>{Cc.init(e,n),ze.init(e,n),e._zod.processJSONSchema=(t,o,i)=>ru(e,t,o,i),e.unwrap=()=>e._zod.def.innerType,e.removeCatch=e.unwrap});function Pf(e,n){return new Cf({type:"catch",innerType:e,catchValue:typeof n=="function"?n:ce.constantCatch(n)})}var Gf=E("ZodPipe",(e,n)=>{Pc.init(e,n),ze.init(e,n),e._zod.processJSONSchema=(t,o,i)=>iu(e,t,o,i),e.in=n.in,e.out=n.out});function Su(e,n){return new Gf({type:"pipe",in:e,out:n})}var Nf=E("ZodReadonly",(e,n)=>{Gc.init(e,n),ze.init(e,n),e._zod.processJSONSchema=(t,o,i)=>su(e,t,o,i),e.unwrap=()=>e._zod.def.innerType});function Tf(e){return new Nf({type:"readonly",innerType:e})}var Ef=E("ZodLazy",(e,n)=>{Nc.init(e,n),ze.init(e,n),e._zod.processJSONSchema=(t,o,i)=>au(e,t,o,i),e.unwrap=()=>e._zod.def.getter()});function If(e){return new Ef({type:"lazy",getter:e})}var $f=E("ZodCustom",(e,n)=>{Tc.init(e,n),ze.init(e,n),e._zod.processJSONSchema=(t,o,i)=>Hl(e,t,o,i)});function Of(e,n={}){return wl($f,e,n)}function Rf(e,n){return xl(e,n)}function Eu(e){let n=If(()=>Tt([te(e),an(),be(),so(),Se(n),Ei(te(),n)]));return n}var cr=Object.freeze(["panel-open","panel-close","panel-move","page-home","page-settings","page-settings-tab","page-model-tab","page-setup","page-authorization","page-repair","page-session-management","open-native-session","open-feedback","change-listen-mode","change-audio-device","edit-choice","commit-form","activate-control","dismiss","details-toggle","keyboard-navigation","ui-connect","ui-reconnect","ui-status-refresh","ui-request","ui-stream","ui-render-error","ui-action-error","ui-read-recovery","manage-session","start-voice","stop-voice","ui-buffer-overflow","session-history-open","session-history-close","subagent-history-open","subagent-history-close","show-subagents","show-main-sessions","open-native-subagent","new-voice-session","bind-current-session","retry-voice-transcript","bind-existing-session","unbind-existing-session","listen-mode-ptt","listen-mode-always","listen-mode-wake","settings-audio","settings-interaction","settings-prompt","settings-models","settings-advanced","settings-pets"]),Iu=64*1024,co=64,$u=10080*60*1e3;var Ii="whaleConversation",we=(e,n)=>({mode:"strict",typeSymbol:`dsh-fish-voice/conversation#${e}`,create:n}),dr=we("sessionId",()=>te().min(1).max(256)),Df=we("settingsSessionId",()=>dr.create().nullable()),Lu=new Set(["status","read-settings","listen-mode","complete-setup","set-visibility","inspect-tts","save-tts","preview-tts","cancel-tts","save-models","model-installer","inspect-model-compute","plan-model-install","start-model-install","control-model-install","apply-model-install","pick-local-path","enable","disable","new","resume","read-history","read-audio-devices","save-audio-device","save-settings","capture-bindings","save-bindings","save-voice-prompt","conversation-models","save-conversation-model","inspect-performance","set-performance-mode","read-output-volume","set-output-volume"]),Mf=we("volumeRequest",()=>W({revision:an().int().nonnegative(),volume:an().min(0).max(1)})),Ou=W({id:te(),role:ue(["user","assistant"]),text:te().max(8e3),state:ue(["reply","interrupted","delivered","speech-requested","speech-failed"]),at:an()}),Zf=W({state:ue(["disabled","starting","waiting","listening","paused","error"]),deadlineAt:an().nonnegative().nullable(),streamOpen:be(),detection:ue(["asr-after-utterance","acoustic-after-utterance"])}),Oi=te().uuid(),Ff=W({id:Oi,text:te().max(8e3),sessionId:dr.create(),title:te().max(256).nullable(),state:ue(["sending","queued","busy","ready","delivered","uncertain","failed","discarded"])}),Uf=W({sessionId:dr.create(),items:Se(W({id:Oi,text:te().max(8e3),title:te().max(256).nullable().optional(),state:ue(["busy","ready","sending","uncertain"])})).max(8)}),Lf=we("snapshot",()=>W({revision:an().int().nonnegative(),historyGeneration:an().int().nonnegative().optional(),rootSessionId:te().nullable(),title:so(),latest:Ou.nullable(),items:Se(Ou).max(40),inputActive:be(),inputError:ue(["device","recognition","no-speech"]).nullable().optional(),providerError:te().max(480).optional(),inputDelivery:Ff.optional(),retryTranscripts:Uf.nullable().optional(),playbackConfirmed:ye(!1),wake:Zf.optional(),helper:W({online:be(),listenMode:ue(["ptt","always","wake"]).nullable()}).refine(e=>e.online||e.listenMode===null).optional()})),Vf=we("volume",()=>W({supported:be(),backend:ye("dsh-speak").nullable(),volume:an().min(0).max(1).nullable(),revision:an().int().nullable(),apply:ye("next-output").nullable(),reason:te().nullable()})),ee=te().max(4096),Ue=an().int().nonnegative().max(Number.MAX_SAFE_INTEGER),Hf=W({code:te().max(64),message:te().max(512)}),Ru=W({available:be(),reason:ee.nullable(),runtimeLoaded:ye(!1),backend:ee.optional(),provider:ee.optional(),device:ee.optional(),computeType:ee.optional(),supportedComputeTypes:Se(ee).max(32).optional(),deviceCount:Ue.optional(),deviceIndex:Ue.optional(),validation:ee.optional(),note:ee.optional(),providerAdvertised:be().optional()}),jf=W({schema:ye(1),default:ye("cpu"),observedAt:ee.nullable(),reason:ee.optional(),backends:W({sensevoice:W({cpu:Ru,cuda:Ru}).optional()})}),Qf=W({observedAt:ee,scope:ye("plugin-host"),platform:ee,arch:ee,cpuLogicalCores:Ue.nullable(),totalMemoryBytes:Ue.nullable(),availableMemoryBytes:Ue.nullable(),gpuMemoryBytes:Ue.nullable(),gpuMemoryReason:ee,gpuSource:ye("dxgi").nullable().optional(),gpuAdapters:Se(W({name:te().min(1).max(256),dedicatedVideoMemoryBytes:Ue,sharedSystemMemoryBytes:Ue})).max(32).optional()}),Wf=W({modelId:ee,confidence:ue(["not-assessed","unknown","heuristic-only"]),recommended:be(),badge:ee.nullable(),state:ue(["manual-choice","unknown","recommended-pending-runtime-validation","limited-memory","busy-memory","recommended-lightweight"]),reason:ee,policy:ee.optional(),runtimeValidated:ye(!1).optional(),gpuValidated:ye(!1).optional()}),Kf=W({release:ee,source:ee,sources:Se(ee).max(16).optional(),redirectHost:ee,platform:ee,arch:ee,executable:ee,licenseUrls:Se(ee).max(20)}),Jf=W({jobId:ee,modelId:ee,status:ue(["waiting","verifying","applied","blocked","paused","cancelled"]),reason:ee.nullable()}),Xf=W({id:ee,runtime:Kf.nullable().optional(),purpose:ue(["tts","asr"]).optional(),computeOptions:Se(ue(["cpu","auto","cuda","vulkan"])).max(4).optional(),recommendation:Wf,title:ee,backend:ee.nullable(),available:be(),reason:ee.nullable(),totalBytes:Ue.nullable(),source:ee.nullable(),licenseUrls:Se(ee).max(20),licenseNote:ee.nullable(),verification:ee.optional(),runtimeLoaded:ye(!1)}),Yf=W({id:te().uuid(),modelId:ee,compute:ue(["cpu","auto","cuda","vulkan"]),status:ue(["queued","running","paused","failed","cancelled","installed"]),stage:ue(["queued","running","paused","failed","cancelled","installed","checking-runtime","verifying-local","downloading","verifying","installing"]),createdAt:ee,updatedAt:ee,totalBytes:Ue,receivedBytes:Ue,runtimeLoaded:ye(!1),error:Hf.nullable(),currentFile:ee.nullable().optional(),files:Se(W({name:ee,bytes:Ue,receivedBytes:Ue,verified:be(),reused:be().optional()})).max(200),installedPath:ee.optional(),sourceDirectory:ee.optional(),modelVariant:ue(["q4_k_m","q8_0"]).optional(),reused:ye(!0).optional(),reusedBytes:Ue.optional(),purpose:ue(["tts","asr"]).optional(),recommendedSettings:Tt([W({tts:W({provider:ye("local"),localModelId:ee,localModelPath:ee})}),W({asr:ye("sensevoice"),models:W({sensevoiceDir:ee.optional()}),modelCompute:ue(["cpu","auto","cuda"])})]).optional()}),eh=we("modelSnapshot",()=>W({schema:ye(1),hardware:Qf,compute:jf,refresh:W({pending:be(),observedAt:te().max(64).nullable(),attemptedAt:te().max(64).nullable(),error:te().max(512).nullable(),intervalMs:ye(3e5)}).optional(),models:Se(Xf).max(32),jobs:Se(Yf).max(1e3),ttsInstallIntent:Jf.nullable().optional()})),nh=we("authorizationRequest",()=>W({revision:te().min(1).max(256),grant:be()})),th=we("senseVoiceAsrRequest",()=>ao("operation",[W({operation:ye("status")}),W({operation:ye("retry")})])),oh={state:ue(["idle","downloading","ready","error"]),receivedBytes:Ue,totalBytes:Ue},rh=we("senseVoiceAsrResult",()=>W({...oh,selected:be(),message:te().max(512).nullable()})),Du=we("authorization",()=>W({schema:ye(1),revision:te().min(1).max(256),completed:be(),granted:be(),usageAgreement:W({version:ye(1),accepted:be(),text:Se(ee).max(16)}).optional(),modelSourcesChanged:be().optional(),blockedOperations:Se(ee).max(32),revocationUnconfirmed:be(),scopes:Se(W({id:ee,title:ee,description:ee,allowed:be()})).max(16),modelSources:Se(W({modelId:ee,source:ee,licenseUrls:Se(ee).max(20),licenseNote:ee,runtime:W({source:ee,sources:Se(ee).max(16).optional(),licenseUrls:Se(ee).max(20),redirectHost:ee.nullable()}).optional()})).max(32),restrictions:Se(ee).max(16)})),ih=we("setup",()=>W({version:ye(1),completed:be()})),cn=te().min(1).max(256),Oe=te().min(1).max(256),Mu=ue(["cpu","auto","cuda","vulkan"]),Zu={sourceDirectory:te().min(1).max(4096).optional(),modelVariant:ue(["q4_k_m","q8_0"]).optional()},lr=Ei(te(),Eu()),sh=W({provider:ue(["deepseek","local"]),deepseekVoice:ue(["stella","tide"]),deepseekTextTransmissionAccepted:be(),volume:an().min(0).max(1),localModelId:te().max(128).nullable(),localModelPath:te().max(4096).nullable(),referenceAudioPath:te().max(4096).nullable(),referenceAudioAccepted:be()}),ah=W({backend:ue(["winmm","portaudio"]),id:te().min(1).max(1024),name:te().min(1).max(256)}).nullable(),ch={"read-history":{cursor:te().max(128).optional()},"read-audio-devices":{},"save-audio-device":{revision:cn,direction:ue(["input","output"]),selection:ah},"agent-permissions":{},"save-agent-permissions":{revision:cn,allowed:W({"set-performance-mode":be(),"set-visibility":be(),"set-output-volume":be()})},"agent-requests":{},"decide-agent-request":{id:Oe,approve:be(),acknowledgements:Se(te().max(80)).max(10)},"model-installer":{},"inspect-model-compute":{},"plan-model-install":{modelId:Oe,compute:Mu,...Zu},"start-model-install":{modelId:Oe,compute:Mu,...Zu,planHash:cn,accepted:ye(!0),useWhenReady:be().optional()},"control-model-install":{id:Oe,operation:ue(["pause","resume","cancel"])},"apply-model-install":{id:Oe,revision:cn},status:{},enable:{expectedOwnerSessionId:Oe.nullable().optional(),expectedExistingSessionId:Oe.nullable().optional()},disable:{},"read-settings":{},new:{expectedOwnerSessionId:Oe.nullable().optional()},"inspect-performance":{},"set-performance-mode":{revision:cn,performanceMode:ue(["fast","balanced","high","compatibility"])},"inspect-tts":{},"save-tts":{revision:cn,values:lr},"complete-setup":{revision:cn},"preview-tts":{revision:cn.optional(),values:sh.optional()},"cancel-tts":{},list:{cursor:te().max(2048).optional()},resume:{id:Oe},"listen-mode":{mode:ue(["ptt","always","wake"])},"set-visibility":{revision:cn,visibility:ue(["hidden","workspace"])},"pick-local-path":{kind:ue(["referenceAudio","sensevoiceDir","campplus","sourceDirectory"])},"capture-bindings":{operation:ue(["begin","end"]),token:Oe.optional(),inactive:be().optional()},"save-bindings":{revision:cn,values:lr,bindingContext:W({ownerSessionId:Oe.nullable(),epoch:Oe.nullable(),rootSessionId:Oe.nullable()})},"save-voice-prompt":{revision:cn,values:W({text:te().max(32768)})},"conversation-models":{},"save-conversation-model":{revision:cn,values:W({mode:ue(["auto","manual"]),provider:te().min(1).max(256).nullable(),model:te().min(1).max(256).nullable()})},"save-settings":{revision:cn,values:lr},"save-models":{revision:cn,values:lr}},lh=we("uiActionRequest",()=>ao("action",Object.entries(ch).map(([e,n])=>W({action:ye(e),...n}))).refine(e=>e.action!=="preview-tts"||Object.hasOwn(e,"revision")===Object.hasOwn(e,"values"),"\u8349\u7A3F\u8BD5\u542C\u5FC5\u987B\u540C\u65F6\u63D0\u4F9B\u914D\u7F6E\u7248\u672C\u548C\u8BBE\u7F6E").refine(e=>JSON.stringify(e).length<=(e.action==="save-voice-prompt"?2e5:8192),"\u64CD\u4F5C\u6570\u636E\u8FC7\u957F")),Fu=we("uiActionResult",()=>te().max(4*1024*1024)),uh=we("sessionManagementRequest",()=>ao("operation",[W({operation:ye("list"),rootId:Oe.optional(),cursor:te().max(2048).optional()}),W({operation:ye("unhide"),rootId:Oe,id:Oe}),W({operation:ye("restore"),rootId:Oe,id:Oe})])),dh=we("presentation",()=>W({shown:Se(Tt([W({id:Oe,parentId:so(),mode:so()}),W({id:Oe,parentId:Oe,mode:ue(["one-shot","continuable","unknown"])})]))})),$i=te().min(1).max(128),ph=we("updateRequest",()=>ao("action",[W({action:ye("check")}),W({action:ye("install"),version:$i})])),Uu=we("updateSnapshot",()=>W({schema:ye(1),revision:an().int().nonnegative().optional(),currentVersion:$i,channel:ue(["stable","preview"]),status:ue(["idle","checking","current","available","incompatible","installing","restart-required","enable-required","installed","error","unsupported"]),checkedAt:te().max(64).nullable(),release:W({version:$i,announcement:te().min(1).max(600),url:te().startsWith("https://github.com/Emikosama/dsh-fish-voice/releases/tag/v").max(256)}).nullable(),message:te().max(512).nullable(),canInstall:be()})),ur=dr.create(),lo=W({sessionId:ur,title:te().max(256).nullable(),availability:ue(["ready","busy","unavailable","archived"]),unavailableReason:ue(["managed","subagent"]).optional(),updatedAt:an().int().nonnegative().max(864e13).nullable().optional()}),Vu=te().min(1).max(512),mh=we("listExistingSessionsRequest",()=>Tt([W({sessionId:ur}),W({query:te().max(128).optional(),cursor:Vu.optional()})])),fh=we("listExistingSessionsResult",()=>W({items:Se(lo).max(100),nextCursor:Vu.nullable(),binding:lo.nullable()})),hh=we("setExistingSessionRequest",()=>W({sessionId:ur.nullable(),expectedSessionId:ur.nullable()})),gh=we("setExistingSessionResult",()=>W({binding:lo.nullable()})),Hu=te().min(1).max(160).regex(/^[A-Za-z0-9_-]+$/),vh=we("operationLogPageRequest",()=>W({cursor:Hu.optional()})),bh=we("operationLogPage",()=>W({text:te().max(Iu),nextCursor:Hu.nullable()})),ju=te().uuid(),yh=we("operationScopeResult",()=>W({scope:ju})),_h=we("recordOperationRequest",()=>W({scope:ju,events:Se(W({id:te().uuid(),at:Ue,action:ue(cr),source:ue(["user","ui"]),phase:ue(["requested","finished"]).optional(),result:ue(["ok","failed","cancelled"]).optional(),count:Ue.positive().optional()}).refine(e=>e.action==="ui-buffer-overflow"?e.source==="ui"&&e.count!==void 0:e.count===void 0)).min(1).max(co)})),wh=we("recordOperationResult",()=>W({accepted:be()})),xh=we("retryVoiceTranscriptRequest",()=>W({id:Oi})),kh=we("retryVoiceTranscriptResult",()=>W({accepted:be()})),Ah={retryVoiceTranscript:xh,recordClientOperations:_h,readOperationLog:vh,action:lh,saveAuthorization:nh,manageSessions:uh,senseVoiceAsrAction:th,updateAction:ph,listExistingVoiceSessions:mh,setExistingVoiceSession:hh},qh={readClientOperationScope:yh,recordClientOperations:wh,readOperationLog:bh,action:Fu,manageSessions:Fu,readAuthorization:Du,saveAuthorization:Du,senseVoiceAsrAction:rh,readSetup:ih,followPresentation:dh,followModels:eh,followUpdates:Uu,updateAction:Uu,listExistingVoiceSessions:fh,setExistingVoiceSession:gh,retryVoiceTranscript:kh},Ze=(e,n,t=!1)=>({id:`dsh-fish-voice#${Ii}/${e}`,service:Ii,namespace:Ii,method:e,invocation:{kind:"direct"},...t?{mode:"stream"}:{},parameters:n.map(o=>({name:o,wire:o,source:"json",codec:o==="sessionId"?Df:Ah[e]??Mf})),cancellation:{parameter:"signal"},result:qh[e]??(t?Lf:Vf)}),Qu={package:"dsh-fish-voice/conversation",descriptors:[Ze("action",["sessionId","request"]),Ze("follow",["sessionId"],!0),Ze("followModels",["sessionId"],!0),Ze("followPresentation",[],!0),Ze("followUpdates",[],!0),Ze("updateAction",["request"]),Ze("readSetup",[]),Ze("readAuthorization",[]),Ze("saveAuthorization",["request"]),Ze("senseVoiceAsrAction",["request"]),Ze("manageSessions",["sessionId","request"]),Ze("readClientOperationScope",[]),Ze("recordClientOperations",["request"]),Ze("readOperationLog",["request"]),Ze("listExistingVoiceSessions",["request"]),Ze("setExistingVoiceSession",["request"]),Ze("retryVoiceTranscript",["request"]),Ze("readVolume",["sessionId"]),Ze("setVolume",["sessionId","request"])]};var Le=e=>e!==null&&typeof e=="object"&&!Array.isArray(e),Cn=(e,n=1024)=>typeof e=="string"&&e.length<=n,et=e=>typeof e=="number"&&Number.isFinite(e),Ke=e=>typeof e=="boolean",Wu=e=>{if(!Cn(e,4096))return!1;try{let n=new URL(e);return["https:","http:"].includes(n.protocol)&&!n.username&&!n.password}catch{return!1}},yn=(e,n=4096)=>e==null||Cn(e,n),nt=e=>Cn(e,256)&&e.length>0,Te=()=>{throw new Error("\u914D\u7F6E\u63A5\u53E3\u8FD4\u56DE\u4E86\u65E0\u6548\u6570\u636E\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6")};function Ri(e){if(e.onboarding!==void 0&&(!Le(e.onboarding)||e.onboarding.version!==1||!Ke(e.onboarding.completed))&&Te(),e.ttsSetup!==void 0){let n=e.ttsSetup;(!Le(n)||!["deepseek","local","off"].includes(n.provider)||!["stella","tide"].includes(n.deepseekVoice)||!Ke(n.deepseekTextTransmissionAccepted)||!et(n.volume)||n.volume<0||n.volume>1||!(n.localModelId==null||nt(n.localModelId))||!yn(n.localModelPath)||!yn(n.referenceAudioPath)||!(n.referenceAudioAccepted===void 0||Ke(n.referenceAudioAccepted)))&&Te()}if(e.ttsRuntime?.localComputeBackend!=null&&(!["cpu","vulkan","cuda","hip"].includes(e.ttsRuntime.localComputeBackend)||!Ke(e.ttsRuntime.localComputeVerified)||!Ke(e.ttsRuntime.localComputeFallback))&&Te(),e.ttsRuntime?.localTimings!=null){let n=e.ttsRuntime.localTimings;(!Le(n)||typeof n.modelResident!="boolean"||["preparationMs","deviceSelectionMs","synthesisMs","playbackMs","totalMs","chunks"].some(t=>!Number.isSafeInteger(n[t])||n[t]<0)||n.chunks<1||n.chunks>4e3)&&Te()}return e.ttsRuntime!=null&&(!Le(e.ttsRuntime)||!Cn(e.ttsRuntime.state,64)||!Ke(e.ttsRuntime.busy)||!Ke(e.ttsRuntime.blocked))&&Te(),e}function Ju(e,n){if(Le(n)||Te(),e==="setup-status"&&(Object.keys(n).some(t=>!["version","completed"].includes(t))||n.version!==1||!Ke(n.completed))&&Te(),e==="inspect-tts"&&(!Cn(n.platform,32)||!Ke(n.playbackSupported)||!Ke(n.deepseekKeyAvailable)||n.autoDownload!==!1||!Ke(n.gpuSupported))&&Te(),e==="preview-tts"&&(!["deepseek","local"].includes(n.provider)||n.fallback!==!1||n.acousticConfirmation!==!1||n.playbackCompleted!==!0||n.textOnly!==void 0)&&Te(),e==="cancel-tts"&&!["idle","cancelled","unconfirmed"].includes(n.status)&&Te(),e==="model-installer"){if((n.schema!==1||!Array.isArray(n.models)||n.models.length>100||!Array.isArray(n.jobs)||n.jobs.length>1e3||!Le(n.hardware)||!Le(n.compute))&&Te(),n.refresh!=null){let t=n.refresh;(!Le(t)||!Ke(t.pending)||!yn(t.observedAt,64)||!yn(t.attemptedAt,64)||!yn(t.error,512)||!(t.intervalMs===void 0||et(t.intervalMs)&&t.intervalMs>0&&t.intervalMs<=36e5))&&Te()}for(let t of n.models)(!Le(t)||!nt(t.id)||!Ke(t.available)||t.runtimeLoaded!==!1||!yn(t.title)||!yn(t.reason)||!(t.totalBytes==null||et(t.totalBytes)&&t.totalBytes>=0))&&Te(),t.recommendation!=null&&(!Le(t.recommendation)||!Ke(t.recommendation.recommended)||!yn(t.recommendation.reason))&&Te();for(let t of n.jobs)Ku(t);if(n.ttsInstallIntent!=null){let t=n.ttsInstallIntent;(!Le(t)||!nt(t.jobId)||!nt(t.modelId)||!["waiting","verifying","applied","blocked","paused","cancelled"].includes(t.status)||!yn(t.reason))&&Te()}}return e==="inspect-model-compute"&&!Le(n.compute)&&!Le(n.backends)&&Te(),e==="plan-model-install"&&(n.reused!==void 0&&(!Ke(n.reused)||n.reused!==!0||!Cn(n.sourceDirectory,4096)||!n.sourceDirectory||!["q4_k_m","q8_0"].includes(n.modelVariant)||!et(n.reusedBytes)||n.reusedBytes<0)&&Te(),n.reused!==!0&&(n.sourceDirectory!==void 0||n.modelVariant!==void 0||n.reusedBytes!==void 0)&&Te(),Array.isArray(n.files)&&n.files.some(t=>Le(t)&&t.reused!==void 0&&!Ke(t.reused))&&Te(),(!nt(n.modelId)||!["cpu","auto","cuda","vulkan"].includes(n.compute)||!Cn(n.planHash,128)||!Array.isArray(n.files)||n.files.length>200||!et(n.totalBytes)||n.totalBytes<0||!Cn(n.destination,4096)||!Array.isArray(n.licenseUrls)||n.licenseUrls.some(t=>!Wu(t))||!yn(n.source)||!yn(n.notice)||!yn(n.licenseNote)||n.files.some(t=>!Le(t)||!nt(t.name)||!et(t.bytes)||t.bytes<0||!Cn(t.sha256,64)||!/^[a-f0-9]{64}$/i.test(t.sha256)||!Wu(t.url)))&&Te()),["start-model-install","control-model-install"].includes(e)&&Ku(n),Ri(n)}function Ku(e){Le(e)&&e.error!=null&&(!Le(e.error)||!Cn(e.error.message,512))&&Te(),(!Le(e)||!nt(e.id)||!nt(e.modelId)||!["cpu","auto","cuda","vulkan"].includes(e.compute)||!["queued","running","paused","failed","cancelled","installed"].includes(e.status)||!Cn(e.stage,128)||!et(e.receivedBytes)||e.receivedBytes<0||!(e.totalBytes===null||et(e.totalBytes)&&e.totalBytes>=0)||e.runtimeLoaded!==!1)&&Te()}function Un(e,n){let t=r=>r!==null&&typeof r=="object"&&!Array.isArray(r),o=r=>typeof r=="string"&&r.length>0&&r.length<=256,i=r=>r===null||t(r)&&Object.keys(r).sort().join(",")==="code,modifiers"&&typeof r.code=="string"&&/^(F([1-9]|1[0-9]|2[0-4])|Key[A-Z]|Digit[0-9]|Space)$/.test(r.code)&&Array.isArray(r.modifiers)&&r.modifiers.length<=3&&new Set(r.modifiers).size===r.modifiers.length&&r.modifiers.every(s=>["Control","Alt","Shift"].includes(s))&&!(r.code==="F4"&&r.modifiers.includes("Alt"));if(!t(n))throw new Error("Fish Voice UI returned invalid data");if(n.wake!==void 0&&!(n.wake===null&&e!=="conversation")&&!as(n.wake))throw new Error("Invalid wake state");if(n.listenMode!==void 0&&n.listenMode!==null&&!xt.includes(n.listenMode))throw new Error("Invalid listening mode");if(["status","enable","disable","new","resume","listen-mode"].includes(e)){if(!(n.ownerSessionId===null||o(n.ownerSessionId))||typeof n.enabled!="boolean"||!t(n.helper)||typeof n.helper.online!="boolean")throw new Error("Fish Voice UI returned an invalid status");if(n.existingVoiceSessionSupported!==void 0&&typeof n.existingVoiceSessionSupported!="boolean")throw new Error("Invalid existing session support");if(n.existingVoiceSession!=null&&!lo.safeParse(n.existingVoiceSession).success)throw new Error("Invalid existing voice session");if(n.helper.lastError!=null&&(typeof n.helper.lastError!="string"||n.helper.lastError.length>512))throw new Error("Invalid audio diagnostic")}else if(["save-voice-prompt","save-conversation-model","save-bindings","read-settings","save-settings","save-audio-device","save-models","set-visibility","set-performance-mode","save-tts","complete-setup","apply-model-install"].includes(e)){if(n.bindingContext!==void 0&&(!t(n.bindingContext)||["ownerSessionId","epoch","rootSessionId"].some(s=>n.bindingContext[s]!==null&&!o(n.bindingContext[s]))))throw new Error("Invalid binding context");let r=n.values;if(typeof n.revision!="string"||!n.revision||!t(r)||![0,1,2].includes(r.pttMouse)||!t(r.speakerVerification)||typeof r.speakerVerification.enabled!="boolean"||!(Vt(r.device)||typeof r.device=="string"&&r.device.length<=256&&!/[\u0000-\u001f\u007f]/.test(r.device)||Number.isSafeInteger(r.device)&&r.device>=0))throw new Error("Fish Voice UI returned invalid settings");if(r.wakeWordAliases!==void 0&&!Co(r.wakeWordAliases))throw new Error("Invalid wake aliases");if(r.wakeListenTimeoutMs!==void 0&&(!Number.isInteger(r.wakeListenTimeoutMs)||r.wakeListenTimeoutMs<3e3||r.wakeListenTimeoutMs>3e4))throw new Error("Invalid wake timeout");if(r.semanticExperimental!==void 0&&typeof r.semanticExperimental!="boolean")throw new Error("Invalid experimental wake setting");if(r.pttKeyboard!==void 0&&!i(r.pttKeyboard))throw new Error("Invalid keyboard binding");if(n.capabilities?.pttKeyboard!==void 0){let s=n.capabilities.pttKeyboard;if(!t(s)||typeof s.supported!="boolean"||s.scope!=="global"||s.platform!=="win32"||!["available","unsupported"].includes(s.status)||!(s.reason==null||typeof s.reason=="string")||s.supported!==(s.status==="available"))throw new Error("Invalid keyboard capability")}if(n.modelSetup!==void 0&&(!t(n.modelSetup)||n.modelSetup.asr!=="sensevoice"||!t(n.modelSetup.models)||n.modelSetup.modelCompute!==void 0&&!["cpu","auto","cuda"].includes(n.modelSetup.modelCompute)||["sensevoiceDir","campplus"].some(s=>typeof n.modelSetup.models[s]!="string")))throw new Error("Fish Voice UI returned invalid model configuration");if(n.capabilities?.turnSignals===!0){let s=r.turnSignals;if(!t(s)||typeof s.enabled!="boolean"||typeof s.headphonesConfirmed!="boolean"||typeof s.experimentalAutomaticBargeIn!="boolean"||typeof s.volume!="number"||!Number.isFinite(s.volume)||s.volume<0||s.volume>1)throw new Error("Fish Voice UI returned invalid turn sound settings")}}else if(e==="list"&&(!Array.isArray(n.items)||n.items.length>50||!(n.nextCursor==null||typeof n.nextCursor=="string"&&n.nextCursor.length<=2048)||n.items.some(r=>!t(r)||!o(r.id)||typeof r.archived!="boolean"||typeof r.available!="boolean"||typeof r.canResume!="boolean"||r.title!==void 0&&typeof r.title!="string"||r.reason!==void 0&&typeof r.reason!="string")))throw new Error("Fish Voice UI returned invalid voice history");if(n.voicePrompt!==void 0){let r=n.voicePrompt;if(!t(r)||typeof r.text!="string"||r.text.length>32768||!["agents","custom"].includes(r.mode)||typeof r.customSupported!="boolean"||!(r.unsupportedReason===null||typeof r.unsupportedReason=="string"&&r.unsupportedReason.length<=512)||r.mode==="custom"&&(!r.text.trim()||!r.customSupported)||r.mode==="agents"&&r.customSupported&&r.text.trim())throw new Error("Invalid voice prompt preference")}if(n.conversationModel!==void 0&&(!t(n.conversationModel)||!["auto","manual"].includes(n.conversationModel.mode)||![n.conversationModel.provider,n.conversationModel.model].every(r=>r===null||o(r))||n.conversationModel.mode==="auto"&&(n.conversationModel.provider!==null||n.conversationModel.model!==null)))throw new Error("Invalid conversation model preference");if(e==="conversation-models"&&(!Array.isArray(n.providers)||n.providers.length>256||new Set(n.providers.map(r=>r?.id)).size!==n.providers.length||n.providers.some(r=>!t(r)||!o(r.id)||!o(r.name)||!Array.isArray(r.models)||r.models.length>2048||new Set(r.models.map(s=>s?.id)).size!==r.models.length||r.models.some(s=>!t(s)||!o(s.id)||!o(s.name)))))throw new Error("Invalid conversation model catalog");if(e==="read-audio-devices"&&!is(n))throw new Error("Invalid audio device inventory");if(n.audioDevices!==void 0&&(!t(n.audioDevices)||!Vt(n.audioDevices.output)||!(Vt(n.audioDevices.input)||typeof n.audioDevices.input=="string"||Number.isSafeInteger(n.audioDevices.input))))throw new Error("Invalid audio device preferences");if(e==="inspect-performance"&&(!Array.isArray(n.modes)||n.modes.some(r=>!t(r)||!["fast","balanced","high"].includes(r.performanceMode)||typeof r.available!="boolean")))throw new Error("Invalid performance capabilities");if(e==="read-history"&&(!(n.rootSessionId===null||o(n.rootSessionId))||!Number.isSafeInteger(n.generation)||n.generation<0||!Number.isSafeInteger(n.revision)||n.revision<0||!["voice-session","current-voice-session"].includes(n.scope)||typeof n.truncated!="boolean"||!(n.nextCursor===null||typeof n.nextCursor=="string"&&/^\d+:\d+$/.test(n.nextCursor))||!Array.isArray(n.items)||n.items.length>100||new Set(n.items.map(r=>r?.id)).size!==n.items.length||n.items.some(r=>!t(r)||!o(r.id)||!["user","assistant"].includes(r.role)||typeof r.text!="string"||r.text.length>8e3||!["reply","interrupted","delivered","speech-requested","speech-failed"].includes(r.state)||!Number.isFinite(r.at))))throw new Error("Invalid conversation history");if(e==="conversation"){if(n.helper!==void 0&&(!t(n.helper)||typeof n.helper.online!="boolean"||!(n.helper.listenMode===null||xt.includes(n.helper.listenMode))||!n.helper.online&&n.helper.listenMode!==null))throw new Error("Invalid conversation helper state");if(n.inputError!=null&&!["device","recognition","no-speech"].includes(n.inputError))throw new Error("Invalid input error");if(n.providerError!==void 0&&(typeof n.providerError!="string"||n.providerError.length>480))throw new Error("Invalid provider error");if(!Number.isSafeInteger(n.revision)||n.revision<0||n.title!==null||!(n.rootSessionId===null||o(n.rootSessionId))||!Array.isArray(n.items)||n.items.length>40||typeof n.inputActive!="boolean"||n.playbackConfirmed!==!1||n.items.some(r=>!t(r)||!o(r.id)||!["user","assistant"].includes(r.role)||typeof r.text!="string"||r.text.length>8e3||!["reply","interrupted","delivered","speech-requested","speech-failed"].includes(r.state)||!Number.isFinite(r.at))||n.latest!==null&&(!t(n.latest)||!n.items.some(r=>r.id===n.latest.id&&r.text===n.latest.text&&r.role==="assistant")))throw new Error("Invalid conversation snapshot")}if(e==="output-volume"&&(typeof n.supported!="boolean"||n.supported&&(typeof n.volume!="number"||!Number.isFinite(n.volume)||n.volume<0||n.volume>1||n.revision==null)))throw new Error("Invalid output volume snapshot");if(["agent-permissions","save-agent-permissions"].includes(e)){let r=["set-performance-mode","set-visibility","set-output-volume"];if(n.schema!==1||!o(n.revision)||!Array.isArray(n.items)||n.items.length!==3||new Set(n.items.map(s=>s?.operation)).size!==3||n.items.some(s=>!t(s)||!r.includes(s.operation)||typeof s.allowed!="boolean"||typeof s.title!="string"||s.title.length>128||!(s.reason===null||typeof s.reason=="string"&&s.reason.length<=1024)))throw new Error("Invalid agent permissions")}if(["agent-requests","decide-agent-request"].includes(e)){let r=s=>t(s)&&o(s.id)&&o(s.sourceSessionId)&&o(s.operation)&&typeof s.title=="string"&&s.title.length<=128&&["pending","executing","completed","blocked","unknown","superseded","expired","cancelled","rejected"].includes(s.state)&&Number.isFinite(s.createdAt)&&Number.isFinite(s.expiresAt)&&Number.isSafeInteger(s.humanRevision)&&t(s.request)&&t(s.before)&&Array.isArray(s.acknowledgements)&&s.acknowledgements.length<=10&&s.acknowledgements.every(a=>t(a)&&o(a.id)&&typeof a.text=="string"&&a.text.length<=1024)&&(s.error===null||t(s.error)&&typeof s.error.code=="string"&&typeof s.error.message=="string"&&s.error.message.length<=1024)&&(s.nextAction===null||typeof s.nextAction=="string"&&s.nextAction.length<=1024);if(n.schema!==1||!Number.isSafeInteger(n.humanRevision)||n.humanRevision<0||!Array.isArray(n.items)||n.items.length>100||n.items.some(s=>!r(s))||e==="decide-agent-request"&&(!r(n.lastOutcome)||!n.items.some(s=>s.id===n.lastOutcome.id&&s.state===n.lastOutcome.state)))throw new Error("Invalid agent request snapshot")}if(e==="authorization"){if(n.usageAgreement!==void 0&&(!t(n.usageAgreement)||n.usageAgreement.version!==1||typeof n.usageAgreement.accepted!="boolean"||!Array.isArray(n.usageAgreement.text)||n.usageAgreement.text.length>16||n.usageAgreement.text.some(r=>typeof r!="string"||r.length>4096)))throw new Error("Invalid usage agreement snapshot");if(n.schema!==1||!o(n.revision)||!Array.isArray(n.blockedOperations)||n.blockedOperations.some(r=>typeof r!="string")||typeof n.revocationUnconfirmed!="boolean"||typeof n.completed!="boolean"||typeof n.granted!="boolean"||!Array.isArray(n.scopes)||n.scopes.length>16||new Set(n.scopes.map(r=>r?.id)).size!==n.scopes.length||n.scopes.some(r=>!t(r)||!o(r.id)||typeof r.title!="string"||typeof r.description!="string"||typeof r.allowed!="boolean")||!Array.isArray(n.modelSources)||n.modelSources.length>32||n.modelSources.some(r=>!t(r)||!o(r.modelId)||typeof r.source!="string"||!Array.isArray(r.licenseUrls)||r.licenseUrls.some(s=>typeof s!="string")||typeof r.licenseNote!="string")||!Array.isArray(n.restrictions)||n.restrictions.some(r=>typeof r!="string"))throw new Error("Invalid authorization snapshot")}if(n.inferenceCompute!=null){let r=n.inferenceCompute;if(!t(r)||!["cpu","auto","cuda"].includes(r.requested)||![null,"cpu","cuda"].includes(r.actual)||r.engine!=="sensevoice"||!(r.computeType===null||["int8","float16","int8_float16","int8_float32","float32"].includes(r.computeType))||!(r.deviceIndex===null||Number.isSafeInteger(r.deviceIndex)&&r.deviceIndex>=0&&r.deviceIndex<8)||![null,"gpu-unavailable","gpu-load-failed","gpu-inference-failed","model-gpu-unverified"].includes(r.fallbackReason)||typeof r.validated!="boolean")throw new Error("Invalid inference compute status")}if(n.inputDevices!==void 0&&!ls(n.inputDevices))throw new Error("Invalid input device inventory");if(n.ptt?.keyboard!==void 0&&n.ptt.keyboard!==null){let r=n.ptt.keyboard;if(!t(r)||typeof r.supported!="boolean"||r.scope!=="global"||!["unsupported","active","inactive","unknown"].includes(r.status)||typeof r.hookInstalled!="boolean"||typeof r.recording!="boolean"||!(r.observedAt==null||Number.isFinite(r.observedAt)))throw new Error("Invalid keyboard status")}if(n.voiceSession?.recovery!==void 0){let r=n.voiceSession.recovery;if(!t(r)||r.stopVerified!==void 0&&typeof r.stopVerified!="boolean"||r.stopVerified===!0&&(r.kind!=="none"||n.voiceSession.fullyStopped!==!0)||!["none","live-root-conflict","predecessor-cleanup-pending","predecessor-stop-unconfirmed","helper-cleanup-pending","helper-stop-unconfirmed","root-stop-unconfirmed"].includes(r.kind)||!(r.rootSessionId===null||o(r.rootSessionId))||r.kind!=="none"&&n.voiceSession.fullyStopped===!0)throw new Error("Invalid voice recovery state")}if(n.voiceSession?.visibility!==void 0&&!["hidden","workspace"].includes(n.voiceSession.visibility))throw new Error("Fish Voice UI returned invalid visibility");if(n.voiceCapabilities!==void 0){let r=n.voiceCapabilities;if(!t(r)||!(r.configuredVisibility===null||["hidden","workspace"].includes(r.configuredVisibility))||["hidden","workspace"].some(s=>!t(r[s])||typeof r[s].supported!="boolean")||!t(r.taskHandoff)||typeof r.taskHandoff.mode!="string")throw new Error("Fish Voice UI returned invalid host capabilities")}return Ri(n),["setup-status","inspect-tts","preview-tts","cancel-tts","model-installer","inspect-model-compute","plan-model-install","start-model-install","control-model-install"].includes(e)&&Ju(e,n),n}function Xu(e,n=10){let t=0;for(let o=e.length-1;o>=0;o--)if(e[o].role==="user"&&++t===n)return e.slice(o);return e}function Yu(e=[],n=[]){let t=new Map(e.map(o=>[o.id,o]));for(let o of n)t.set(o.id,o);return[...t.values()].sort((o,i)=>o.at-i.at)}function ed(e,n=36){return e.scrollHeight-e.scrollTop-e.clientHeight<=n}function nd({enabled:e,active:n,unknown:t,pending:o}){return t?"unknown":o?"pending":e?n?"listening":"standby":"off"}function uo(e){return e?.enabled?e.existingVoiceSession?.sessionId??e.voiceSession?.id??null:null}var td=["save-voice-prompt","save-conversation-model","save-bindings","read-settings","save-settings","save-audio-device","save-models","set-visibility","set-performance-mode","save-tts","complete-setup","apply-model-install"],po=td.filter(e=>e!=="read-settings"),mo=["status","enable","disable","new","resume","listen-mode"],Sh=new Set(["status","enable","disable","listen-mode","read-history"]),Bh=["save-bindings","inspect-tts","inspect-model-compute"],Ln=new Set(["conversation-models","status","read-settings","read-output-volume","model-installer","agent-permissions","agent-requests"]),mt=["conversation-models","agent-permissions","agent-requests","status","read-settings","list","read-output-volume","inspect-performance","inspect-tts","model-installer","inspect-model-compute","plan-model-install"],zh=e=>typeof e?.code=="string"?e.code:/\[([A-Z][A-Z0-9_]{0,79})\](?:\r?\n|$)/m.exec(String(e?.message??e))?.[1];function od(e,{schedule:n=(i,r)=>globalThis.setTimeout(i,r),unschedule:t=i=>globalThis.clearTimeout(i),observe:o=()=>{}}={}){let i=0,r={conversationHistory:null,conversationHistoryFor:null,conversationHistoryError:null,conversationHistoryLoading:!1,conversationHistoryRequestCursor:null},s={...r,conversationModels:null,conversationModelsFor:null,conversationModelsError:null,authorization:null,authorizationOpen:!1,authorizationLoading:!1,authorizationBusy:!1,authorizationUncertain:!1,authorizationNeedsReview:!1,authorizationWriteUnconfirmed:!1,authorizationError:null,agentRequests:null,agentRequestsFor:null,busy:!1,interruptibleRead:null,diagnosticStopPending:!1,voiceStopUnconfirmed:!1,error:null,status:null,settings:null,settingsFor:null,visibilityUncertain:!1,visibilityReadbackFor:null,catalog:null,checkedFor:null,catalogFor:null,uncertain:!1,performance:null,performanceFor:null,performancePending:!1,performanceError:null,conversation:null,conversationFor:null,conversationError:null,outputVolume:null,outputVolumeFor:null,outputVolumeUncertain:!1,setupStatus:null,setupOpen:!1,panelView:"home",setupError:null,ttsCapabilities:null,ttsCapabilitiesFor:null,ttsPreview:null,ttsPreviewFor:null,ttsCancelling:!1,ttsUncertain:!1,installer:null,installerFor:null,installerError:null,installerUncertain:!1,installPlan:null,installPlanFor:null},a=new Set,l=null,u=!0,d=!0,p=0,f=null,m=null,b=0,g=new Map,_=()=>{for(let y of g.values())y.stale=!0,y.abort.abort();g.clear()},x=()=>{_(),f&&(f.stale=!0,Ln.has(f.action)&&f.abort.abort())},S=!1,Z=null,D=!1,G=null,N=0,B=0,O=new Map,q=!0,k=null,z=null,I=null,A,C=null,P=0,L=0,U=!1,Q=null,j=null,me=new Set,pe=new Set,ne=new Set,Y=new Set,T=y=>{if(!q)return;let w=Object.hasOwn(y,"uncertain")?y.readOnlyFailure===!0:s.readOnlyFailure;s={...s,...y,readOnlyFailure:w};for(let $ of me)$()},K,re,de=0,_e=y=>["checking","installing"].includes(y?.status),wn=(y,w)=>{w?.revision!==void 0&&y.revision<w.revision||(w&&y.revision!==void 0&&(w.revision=y.revision),T({updates:y,updatesUnavailable:!1}))},He=()=>{if(!q||!k?.subscribeUpdates||K||!u)return;let y=k,w={};K=w,w.stop=y.subscribeUpdates($=>{!q||K!==w||(de++,En("update-stream"),wn($,w))},()=>{!q||K!==w||(K=null,T({updatesUnavailable:!0}),je(z,"update-stream"))})},Gn=()=>{let y=K;K=null,y?.stop?.(),re?.abort(),re=null,T({updates:null,updatePending:null,updatesUnavailable:!1})},gt=async y=>{if(!q||!k?.updateAction||re)return;let{action:w,version:$}=y;if(w==="install"&&(s.updatesUnavailable||s.updates?.canInstall!==!0||s.updates?.release?.version!==$))return;let F=k,J=new AbortController;re=J,He();let X=K,fe=de;T({updatePending:w});try{let $e=await F.updateAction(y,J.signal);q&&re===J&&K===X&&($e.revision===void 0&&_e($e)&&de!==fe&&!_e(s.updates)||wn($e,X))}catch{let $e=de!==fe&&!_e(s.updates);q&&re===J&&K===X&&!$e&&T({updatesUnavailable:!0})}finally{re===J&&(re=null,T({updatePending:null}))}},ln=0,ae=y=>{ln++,T({...y,ttsUncertain:!0})},We=()=>s.status?.existingVoiceSession?null:z,Ee=null,un=()=>{Ee=null,T({transcriptRetry:null})},wo=y=>{if(!Ee?.receipt||y?.rootSessionId!==Ee.sessionId)return;let w=y.retryTranscripts?.items.find($=>$.id===Ee.id);(!w||w.state!=="ready"||Ee.receipt==="unconfirmed"&&y.revision>Ee.revision)&&un()},vt=async(y,w)=>{let{status:$,conversation:F,checkedFor:J,conversationFor:X,uncertain:fe,busy:$e}=s,xe=$?.existingVoiceSession?.sessionId;if(!q||!k?.retryVoiceTranscript||Ee||fe||$e||z!==y||J!==y||X!==y||!$?.enabled||!xe||F?.rootSessionId!==xe||F.retryTranscripts?.sessionId!==xe||!F.retryTranscripts.items.some($n=>$n.id===w&&$n.state==="ready"))return;let Ye=k,De=new AbortController,xn=Ee={id:w,sessionId:xe,revision:F.revision,receipt:null};pe.add(De),T({transcriptRetry:{id:w,state:"sending"}});try{let $n=await Ye.retryVoiceTranscript({id:w},De.signal);if(!q||Ee!==xn)return;$n.accepted===!1?un():xn.receipt="accepted"}catch{if(!q||Ee!==xn)return;xn.receipt="unconfirmed"}finally{pe.delete(De),Ee===xn&&(xn.receipt==="unconfirmed"&&T({transcriptRetry:{id:w,state:"uncertain"}}),wo(s.conversation))}},Ie=async(y,w,$)=>{let F=e??k?.action;if(!F)throw new Error("\u9C7C\u5E94\u754C\u9762\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let J=s.status?.existingVoiceSession&&Sh.has(w.action)||s.existingSessionUnconfirmed&&w.action==="status"?null:y,X=await F(J,w,$);try{return Un(w.action,X)}catch(fe){throw o("ui-render-error","finished","failed"),fe}},gn=null,Nn=({clear:y=!1}={})=>{let w=gn;gn=null,w?.abort.abort(),T({audioDevicesPending:!1,audioDevicesError:null,...y?{audioDevices:null,audioDevicesFor:null}:{}})},xo=y=>{if(!q||z!==y)return Promise.resolve(!1);if(gn?.id===y&&gn.client===k)return gn.promise;Nn();let w={id:y,client:k,scope:B,abort:new AbortController,promise:null};gn=w,pe.add(w.abort),T({audioDevicesPending:!0,audioDevicesError:null});let $=()=>q&&gn===w&&z===y&&k===w.client&&B===w.scope;return w.promise=(async()=>{let F;try{let J=new Promise((fe,$e)=>{F=()=>$e(new Error("Device read cancelled")),w.abort.signal.addEventListener("abort",F,{once:!0})}),X=await Promise.race([Ie(y,{action:"read-audio-devices"},w.abort.signal),J]);return $()?(T({audioDevices:X,audioDevicesFor:y}),!0):!1}catch(J){return $()&&!w.abort.signal.aborted&&T({audioDevicesError:String(J?.message??J)}),!1}finally{w.abort.signal.removeEventListener("abort",F),pe.delete(w.abort),$()&&(gn=null,T({audioDevicesPending:!1}))}})(),w.promise},Tn=null,ko=y=>{if(!q||z!==y)return Promise.resolve(!1);if(Tn?.id===y&&Tn.scope===B)return Tn.promise;let w={id:y,scope:B,client:k,promise:null};Tn=w;let $=()=>q&&Tn===w&&z===y&&B===w.scope&&k===w.client;return T({modelComputePending:!0,modelComputeError:null}),w.promise=(async()=>{try{if(await Ie(y,{action:"inspect-model-compute"}),!$())return!1;let F=await Ie(y,{action:"model-installer"});return $()?(T({installer:F,installerFor:y,installerError:null}),U||(U=!0,jn(!0)),!0):!1}catch(F){if(!$())return!1;let J=F?.uncertain||/TTS_TERMINATION_UNCONFIRMED/.test(String(F?.code??"")+" "+String(F?.message??""));return T({modelComputeError:String(F?.message??F),...J?{installerUncertain:!0,installerTerminationUnconfirmed:!0}:{}}),!1}finally{$()&&(Tn=null,T({modelComputePending:!1}))}})(),w.promise},on=null,rt=0,it=({clear:y=!1}={})=>{rt++;let w=on;on=null,w?.abort.abort(),T({performancePending:!1,performanceError:null,...y?{performance:null,performanceFor:null}:{}})},Sr=y=>{if(!q||z!==y)return Promise.resolve(!1);if(on?.id===y&&on.client===k)return on.promise;it();let w={id:y,client:k,epoch:rt,abort:new AbortController,promise:null};on=w,pe.add(w.abort),T({performancePending:!0,performanceError:null});let $=()=>q&&on===w&&w.epoch===rt&&z===y&&k===w.client;return w.promise=(async()=>{let F;try{let J=new Promise((fe,$e)=>{F=()=>$e(new Error("Probe cancelled")),w.abort.signal.addEventListener("abort",F,{once:!0})}),X=await Promise.race([Ie(y,{action:"inspect-performance"},w.abort.signal),J]);return $()?(T({performance:X,performanceFor:y}),!0):!1}catch(J){return $()&&!w.abort.signal.aborted&&T({performanceError:String(J?.message??J)}),!1}finally{w.abort.signal.removeEventListener("abort",F),pe.delete(w.abort),$()&&(on=null,T({performancePending:!1}))}})(),w.promise},oe=()=>{let y=O.get("conversation-stream");y&&(y.timer!==null&&t(y.timer),y.timer=null,y.ready=!1);let w=++P;if(I?.(),I=null,i++,T({...r,conversation:null,conversationFor:null,conversationError:null,listenModeReceiptRevision:null}),A=void 0,!q||!k)return;let $=z;A=We(),I=k.subscribe(A,(F,J)=>{if(!(!q||w!==P||z!==$))try{let X=Un("conversation",F);J?.initial||En("conversation-stream"),s.conversationHistory&&(s.conversationHistory.rootSessionId!==X.rootSessionId||s.conversationHistory.scope!=="voice-session"&&s.conversationHistory.generation!==X.historyGeneration)&&(i++,T({...r}));let fe=s.conversationHistory,$e={};if(fe?.rootSessionId&&fe.rootSessionId===X.rootSessionId){let xe=new Map(fe.items.map(kn=>[kn.id,kn]));for(let kn of X.items)xe.set(kn.id,kn);let Ye=[...xe.values()].sort((kn,V)=>kn.at-V.at),De=Ye.slice(-4e3),xn=De.reduce((kn,V)=>kn+V.text.length,0),$n=Ye.length>4e3;for(;xn>4*1024*1024;)xn-=De.shift().text.length,$n=!0;$e={conversationHistory:{...fe,items:De,truncated:fe.truncated||$n}}}T({...$e,conversation:X,conversationFor:$,conversationError:null}),wo(X)}catch(X){i++,T({...r,conversation:null,conversationFor:null,conversationError:String(X.message)}),je($,"conversation-stream")}},F=>{q&&w===P&&(i++,T({...r,conversation:null,conversationFor:null,conversationError:String(F?.message??F)}),je($,"conversation-stream"))})},jn=(y=!1)=>{let w=O.get("model-stream");w&&(w.timer!==null&&t(w.timer),w.timer=null,w.ready=!1);let $=++L;if(C?.(),C=null,y||T({installer:null,installerFor:null,installerError:null}),!q||!k?.subscribeModels||!U)return;let F=z;C=k.subscribeModels(F,(J,X)=>{if(!(!q||$!==L||z!==F||X?.initial))try{let fe=Un("model-installer",J),$e=s.installer?.ttsInstallIntent;if(En("model-stream"),T({installer:fe,installerFor:F,installerError:null}),fe.ttsInstallIntent&&($e?.jobId!==fe.ttsInstallIntent.jobId||$e?.status!==fe.ttsInstallIntent.status)){let xe=fe.ttsInstallIntent.status==="applied";T({checkedFor:null}),Re({settings:xe,force:!0})}}catch(fe){T({installer:null,installerFor:null,installerError:String(fe.message)}),je(F,"model-stream")}},J=>{q&&$===L&&(T({installer:null,installerFor:null,installerError:String(J?.message??J)}),je(F,"model-stream"))})},In=()=>{if(j)return j;if(!Q)return Promise.resolve(!0);let y=Q,w=ln;return y.cancelled=!0,y.abort.abort(),T({ttsCancelling:!0,ttsPreview:{status:"cancelling"}}),j=(async()=>{let $=!1;try{let F=await Ie(y.id,{action:"cancel-tts"});return F.status==="unconfirmed"?(Z=null,ae({ttsPreview:F,uncertain:!0,error:"\u65E0\u6CD5\u786E\u8BA4\u6717\u8BFB\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B\u540E\u518D\u8BD5\u3002"}),!1):($=!0,T({ttsPreview:F,...w===ln?{ttsUncertain:!1}:{}}),!0)}catch(F){return Z=null,ae({ttsPreview:{status:"unconfirmed"},uncertain:!0,error:String(F?.message??F)}),!1}finally{$&&Q===y&&(Q=null),T({ttsCancelling:!1}),j=null,queueMicrotask(()=>{qo(),wt()})}})(),j},En=y=>{let w=O.get(y);w?.timer!=null&&t(w.timer),O.delete(y)},Br=()=>{for(let y of O.keys())En(y)},je=(y,w)=>{if(!q||!S||z!==y||!["authorization","setup-status","conversation-stream","model-stream","update-stream"].includes(w)&&!Ln.has(w))return;let $=O.get(w);$||($={id:y,scope:B,attempts:0,timer:null,ready:!1},O.set(w,$)),!($.timer!==null||$.ready||!u||!d)&&($.attempts++,o("ui-read-recovery","requested"),$.timer=n(()=>{$.timer=null,!(!q||z!==y||$.scope!==B||O.get(w)!==$)&&($.ready=!0,wt())},Math.min(3e4,750*2**Math.min($.attempts-1,6))),$.timer?.unref?.())},Qn=null,Ao=0,bt=()=>{Qn!==null&&t(Qn),Qn=null,Ao=0},Ji=y=>{!q||!u||!d||z!==y||Qn!==null||Ao>=10||(Qn=n(()=>{if(Qn=null,!(!q||z!==y||!["predecessor-cleanup-pending","helper-cleanup-pending"].includes(s.status?.voiceSession?.recovery?.kind))){if(s.busy||s.ttsCancelling){Ji(y);return}Ao++,Xe.run(y,"status")}},1e3),Qn?.unref?.())},Xe,st=0,yt=null,_t=null,at=null,Mt=!1,tp=async y=>{let w=k,$=[],F=new Set;if(!q||!w?.readOperationLog)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u672A\u5C31\u7EEA");let J=null;do{y?.throwIfAborted();let X=await w.readOperationLog(J?{cursor:J}:{},y);if(!q||k!==w||y?.aborted)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u8FDE\u63A5\u5DF2\u53D8\u5316");if(typeof X?.text!="string"||!(X.nextCursor===null||typeof X.nextCursor=="string"&&X.nextCursor)||F.has(X.nextCursor))throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u5206\u9875\u65E0\u6548");$.push(X.text),J=X.nextCursor,F.add(J)}while(J);return $},op=async(y,w)=>{if(!q||!k?.manageSessions)throw new Error("\u9C7C\u5E94\u4F1A\u8BDD\u7BA1\u7406\u5C1A\u672A\u5C31\u7EEA");let $=k,F=await $.manageSessions(null,y,w);if(!q||k!==$||w?.aborted)throw new Error("\u4F1A\u8BDD\u7BA1\u7406\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5");return F},rp=async(y,w)=>{if(!q||!k?.listExistingVoiceSessions)throw new Error("DSH \u4F1A\u8BDD\u5217\u8868\u6682\u4E0D\u53EF\u7528");let $=k,F=await $.listExistingVoiceSessions(y,w);if(!q||k!==$||w?.aborted)throw new Error("\u4F1A\u8BDD\u5217\u8868\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5");return F},ct=null,ip=async y=>{if(!q||!k?.setExistingVoiceSession||ct||s.existingSessionUnconfirmed)throw new Error("DSH \u4F1A\u8BDD\u7ED1\u5B9A\u6682\u4E0D\u53EF\u7528");let w=k,$=new AbortController;ct=$,pe.add($);for(let F of[g.get("status"),f])F?.action==="status"&&(F.stale=!0,F.abort.abort());T({existingSessionWritePending:!0});try{let F=await w.setExistingVoiceSession(y,$.signal);if(!q||k!==w||$.signal.aborted)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u8FDE\u63A5\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u786E\u8BA4");return s.status&&T({status:{...s.status,existingVoiceSession:F.binding}}),A!==We()&&oe(),F}catch(F){throw T({existingSessionUnconfirmed:!0}),F}finally{pe.delete($),ct=null,T({existingSessionWritePending:!1}),Re({force:!0})}},sp=async(y,w)=>{if(!q||!k?.senseVoiceAsrAction)throw new Error("\u8BC6\u522B\u6A21\u578B\u7BA1\u7406\u6682\u4E0D\u53EF\u7528");let $=k,F=await $.senseVoiceAsrAction(y,w);if(!q||k!==$||w?.aborted)throw new Error("\u8BC6\u522B\u6A21\u578B\u72B6\u6001\u5DF2\u5207\u6362");if(!(X=>X&&["idle","downloading","ready","error"].includes(X.state)&&Number.isSafeInteger(X.receivedBytes)&&Number.isSafeInteger(X.totalBytes)&&X.receivedBytes>=0&&X.receivedBytes<=X.totalBytes)(F)||typeof F.selected!="boolean"||F.message!==null&&(typeof F.message!="string"||F.message.length>512))throw new Error("\u8BC6\u522B\u6A21\u578B\u72B6\u6001\u65E0\u6548");return F},Wn=async({open:y=!1,initial:w=!1,review:$=!1}={})=>{if(!k?.readAuthorization)return!1;if(_t)return at={open:y||at?.open,initial:w||at?.initial,review:$||at?.review},y&&T({authorizationOpen:!0,...$?{authorizationNeedsReview:!0}:{}}),!1;yt?.abort();let F=++st,J=new AbortController,X=k;pe.add(J),yt=J,T({authorizationLoading:!0,authorizationError:null,...y?{authorizationOpen:!0}:{},...$?{authorizationNeedsReview:!0}:{}});try{let fe=Un("authorization",await X.readAuthorization(J.signal));return!q||F!==st||k!==X?!1:(En("authorization"),T({authorization:fe,authorizationUncertain:fe.revocationUnconfirmed,authorizationWriteUnconfirmed:!1,...w&&!Mt&&(!fe.completed||fe.usageAgreement?.accepted!==!0||fe.revocationUnconfirmed)?{authorizationOpen:!0}:{}}),!0)}catch(fe){return q&&F===st&&k===X&&(T({authorizationError:String(fe?.message??fe),authorizationUncertain:!0,...w?{authorizationOpen:!0}:{}}),je(z,"authorization")),!1}finally{pe.delete(J),yt===J&&(yt=null,q&&T({authorizationLoading:!1}))}},ap=async y=>{if(!k?.saveAuthorization||!s.authorization||s.authorizationBusy||s.authorizationLoading||s.authorizationUncertain)return!1;let w=s.setupStatus?.completed!==!0||s.setupOpen;yt?.abort();let $=new AbortController,F=++st,J=k;pe.add($),_t=$,T({authorizationBusy:!0,authorizationError:null});try{let X=Un("authorization",await J.saveAuthorization({revision:s.authorization.revision,grant:y},$.signal));return!q||F!==st||k!==J?!1:(Mt=!1,T({authorization:X,authorizationOpen:X.revocationUnconfirmed,authorizationUncertain:X.revocationUnconfirmed,authorizationNeedsReview:!1,authorizationWriteUnconfirmed:X.revocationUnconfirmed,...X.revocationUnconfirmed?{authorizationError:"\u6743\u9650\u5DF2\u64A4\u56DE\uFF0C\u4F46\u5F53\u524D\u97F3\u9891\u505C\u6B62\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u6838\u67E5\u72B6\u6001\u3002"}:{}}),y&&w&&!X.revocationUnconfirmed&&Xe.openSetup(),Re({settings:!0,force:!0}),!0)}catch(X){try{let fe=Un("authorization",await J.readAuthorization($.signal));if(q&&k===J&&F===st&&fe.completed&&fe.granted===y&&(!y||fe.usageAgreement?.accepted===!0&&fe.modelSourcesChanged!==!0)&&!fe.revocationUnconfirmed)return Mt=!1,T({authorization:fe,authorizationOpen:!1,authorizationUncertain:!1,authorizationNeedsReview:!1,authorizationWriteUnconfirmed:!1}),y&&w&&Xe.openSetup(),Re({settings:!0,force:!0}),!0}catch{}return q&&k===J&&F===st&&(T({authorizationUncertain:!0,authorizationWriteUnconfirmed:!0,authorizationError:String(X?.message??X)}),je(z,"authorization")),!1}finally{if(pe.delete($),_t===$&&(_t=null,q&&T({authorizationBusy:!1}),q&&(at||k!==J))){let X=at??{initial:!0};at=null,Wn(X)}}},lt=null,zr=0,Cr=()=>{if(!k?.readSetup||lt)return lt?.promise;let y=k,w=zr,$=new AbortController,F={promise:null};return lt=F,pe.add($),F.promise=(async()=>{try{let J=Un("setup-status",await y.readSetup($.signal));return!q||k!==y?!1:(En("setup-status"),T({setupStatus:J,...p===w&&!Mt?{setupOpen:!J.completed}:{},setupError:null}),J.completed?Re({settings:!0}):qo(),!0)}catch(J){return q&&k===y&&(T({setupError:String(J?.message??J)}),je(z,"setup-status")),!1}finally{pe.delete($),lt===F&&(lt=null)}})(),F.promise},wt=async()=>{if(!(e||k?.action||k?.readAuthorization||k?.readSetup||k?.subscribeUpdates)||!q||!S||!u||!d||D||ct||s.busy||s.ttsCancelling||!Z&&![...O.values()].some(F=>F.ready))return;if(!Z){let[F,J]=[...O].find(([,X])=>X.ready);if(J.ready=!1,J.id!==z||J.scope!==B){En(F);return}D=!0;try{F==="authorization"?await Wn():F==="setup-status"?await Cr():F==="conversation-stream"?oe():F==="model-stream"?jn(!0):F==="update-stream"?He():await Xe.run(J.id,F)}finally{D=!1,queueMicrotask(()=>{wt()})}return}let y=Z;Z=null;let w=()=>q&&y.id===z&&y.scope===B;if(!w())return;let $=()=>w()?!u||!d||ct||s.busy||s.ttsCancelling?(Z||(Z=y),!0):!1:!0;D=!0;try{if(y.notified||(y.notified=!0,G=y.id,N=Date.now(),T({readRefresh:(s.readRefresh??0)+1})),$()||(y.settings&&(y.settings=!1,await Xe.run(y.id,"read-settings",{},!0)),$()))return;y.status&&(y.status=!1,await Xe.run(y.id,"status",{},!0)),w()&&y.id&&!Y.has(y.id)&&(Y.add(y.id),Xe.run(y.id,"inspect-performance"))}finally{D=!1,queueMicrotask(()=>{wt()})}},Re=({settings:y=!1,force:w=!1}={})=>{if(He(),!(!q||!S)&&!(!w&&!y&&G===z&&Date.now()-N<1500)&&(s.authorizationUncertain&&!yt&&!_t&&Wn(),s.setupError&&!lt&&Cr(),!(!z&&!k?.action&&!s.setupOpen&&s.setupStatus===null))){s.installerError&&U&&jn(!0);for(let $ of O.values())$.id===z&&($.timer!==null&&t($.timer),$.timer=null,$.attempts=0,$.ready=!0);Qn===null&&(Ao=0),(!Z||Z.scope!==B)&&o("ui-status-refresh","requested"),Z={id:z,scope:B,settings:!0,status:!0,notified:!1},queueMicrotask(()=>{wt()})}},Xi=()=>{let y=u&&d;if(s.readVisible!==y){if(T({readVisible:y}),!y){_();for(let w of O.values())w.timer!==null&&t(w.timer),w.timer=null,w.ready=!1;bt();return}Re({force:!0})}},qo=async()=>{let y=z;!(e||k?.action)||s.setupStatus?.completed!==!1||ne.has(y)||s.busy||s.ttsCancelling||(ne.add(y),await Xe.run(y,"read-settings")&&z===y&&await Xe.run(y,"status"))};return Xe={getSnapshot:()=>s,async pickPath(y,w,$){if(!q||z!==y)return null;let F=B,J=e??k?.action;if(!J)throw new Error("\u9C7C\u5E94\u754C\u9762\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let X=await J(y,{action:"pick-local-path",kind:w},$);if(!q||z!==y||F!==B||$?.aborted)return null;if(!X||!(X.path===null||typeof X.path=="string"&&X.path.length>0&&X.path.length<=4096&&!/[\u0000-\u001f\u007f]/.test(X.path)))throw new Error("\u8DEF\u5F84\u9009\u62E9\u7ED3\u679C\u65E0\u6548");return X.path},async captureBindings(y,w){let $=await Ie(y,{action:"capture-bindings",...w});if(!$||typeof $.token!="string"||typeof $.paused!="boolean")throw new Error("\u6309\u952E\u5F55\u5165\u56DE\u6267\u65E0\u6548");return $},setReadVisibility(y){u=!!y,Xi()},setPanelVisible(y){d=!!y,Xi()},markSettingsEdited(y="save-settings"){po.includes(y)&&(a.add(y),T({settingsDraftActions:[...a]}))},discardSettingsDraft(y){y?a.delete(y):a.clear(),T({settingsDraftActions:[...a]}),!a.size&&(l&&T({settings:l,settingsFor:z}),l=null,T({settingsConflict:!1,settingsKey:s.settings?.revision}))},enableAutomaticReads(){S=!0,Re({settings:!0,force:!0})},refresh:Re,refreshModelCompute:ko,subscribe(y){return me.add(y),()=>me.delete(y)},setSession(y){z!==y&&(z=y,B++,Tn=null,a.clear(),l=null,T({sourcePending:!0,checkedFor:void 0,settingsFor:void 0,modelComputePending:!1,modelComputeError:null,enableError:null,listenModeError:!1,newChatFor:void 0,settingsConflict:!1,settingsDraftActions:[],installPlan:null,installPlanFor:null}),Br(),it({clear:!0}),Nn({clear:!0}),bt(),In(),x(),oe(),jn(),Re({settings:!0,force:!0}),qo())},attachConversationClient(y){k!==y&&(Gn(),B++,Tn=null,T({...e?{}:{sourcePending:!0,checkedFor:void 0,settingsFor:void 0},authorization:null,authorizationUncertain:!!_t,modelComputePending:!1,modelComputeError:null}),Br(),it({clear:!0}),Nn({clear:!0}),x(),ne.clear(),Y.clear()),k=y,Wn({initial:!0}),oe(),jn(),Re({settings:!0,force:!0}),k.readSetup&&(lt=null,zr=p,Cr())},conversationUnavailable(y){i++,T({...r,error:String(y?.message??y),conversation:null,conversationFor:null,conversationError:String(y?.message??y)})},async dismissSetup(){let y=++p,w=await In();return w&&y===p&&(x(),Xe.discardSettingsDraft(),T({setupOpen:!1})),w&&y===p},async showHome(){let y=++p,w=await In();return w&&y===p&&(x(),Xe.discardSettingsDraft(),T({setupOpen:!1,panelView:"home"}),Re()),w&&y===p},async openSettings(y="audio",w="conversation"){let $=++p,F=await In();return F&&$===p&&(x(),T({setupOpen:!1,panelView:"settings",settingsTab:["audio","interaction","prompt","models","advanced","sessions","pets"].includes(y)?y:"audio",settingsModelTab:w,sessionManagementRoot:null,sessionHistoryOpen:!1}),Re({settings:!0})),F&&$===p},readOperationLog:tp,manageSessions:op,listExistingVoiceSessions:rp,retryVoiceTranscript:vt,setExistingVoiceSession:ip,setSettingsTab(y){y!==s.settingsTab&&T({settingsTab:y,sessionManagementRoot:null,sessionHistoryOpen:!1})},setSettingsModelTab(y){T({settingsModelTab:y})},setSessionManagement({rootId:y=s.sessionManagementRoot,historyOpen:w}){T({sessionManagementRoot:y,sessionHistoryOpen:w})},senseVoiceAsrAction:sp,updateAction:gt,dismissUpdate(y){y&&T({dismissedUpdateVersion:y})},openSetup(){++p,x(),T({setupOpen:!0}),Re({settings:!0,force:!0}),!S&&!s.busy&&(async()=>{let y=z;await Xe.run(y,"read-settings")&&z===y&&await Xe.run(y,"status")})()},cancelPreview:In,discardDiagnostics:x,refreshAuthorization:Wn,saveAuthorization:ap,openAuthorization:()=>Wn({open:!0}),closeAuthorization({resumeSetup:y=!1}={}){return!s.authorizationBusy&&!s.authorizationLoading?(Mt=!y,++p,zr=p,T({authorizationOpen:!1,authorizationNeedsReview:!1,setupOpen:y}),y&&Re({settings:!0}),!0):!1},async run(y,w,$={},F=!1){if(!q||!e&&z!==y||ct&&w==="status"||(ct||s.existingSessionUnconfirmed)&&["enable","new","resume"].includes(w))return!1;let J=!!(F&&Ln.has(w)&&!s.uncertain&&s.checkedFor===y&&s.settingsFor===y&&s.status&&s.settings);if(J&&g.has(w))return!1;if(F||_(),w==="read-history"){if(z!==y||s.conversationHistoryLoading)return!1;let V=++i,ke=B,en=P;T({conversationHistoryLoading:!0,conversationHistoryError:null,conversationHistoryRequestCursor:$.cursor??null});try{let Me=await Ie(y,{action:w,...$});if(!q||z!==y||ke!==B||V!==i||en!==P||s.conversation?.rootSessionId&&(s.conversation.rootSessionId!==Me.rootSessionId||Me.scope!=="voice-session"&&s.conversation.historyGeneration!==Me.generation))return!1;let On=s.conversationHistory;if($.cursor&&(!On||On.generation!==Me.generation||On.rootSessionId!==Me.rootSessionId))return!1;let So=new Map(Me.items.map(vn=>[vn.id,vn]));if($.cursor)for(let vn of On.items)So.set(vn.id,vn);if(s.conversation?.rootSessionId===Me.rootSessionId)for(let vn of s.conversation?.items??[])So.set(vn.id,vn);let Zt=[...So.values()].sort((vn,Pr)=>vn.at-Pr.at),Bo=$.cursor?Zt.slice(0,4e3):Zt.slice(-4e3),Yi=Bo.reduce((vn,Pr)=>vn+Pr.text.length,0),es=Zt.length>4e3;for(;Yi>4*1024*1024;)Yi-=($.cursor?Bo.pop():Bo.shift()).text.length,es=!0;return T({conversationHistory:{...Me,items:Bo,truncated:Me.truncated||es||!!($.cursor&&On?.truncated)},conversationHistoryFor:y}),!0}catch(Me){return V===i&&T({conversationHistoryError:String(Me?.message??Me)}),!1}finally{V===i&&T({conversationHistoryLoading:!1})}}if(w==="apply-model-install"&&["save-models","save-tts"].some(V=>a.has(V)))return T({error:"\u8BF7\u5148\u4FDD\u5B58\u6216\u653E\u5F03\u6A21\u578B\u8BBE\u7F6E\u8349\u7A3F\uFF0C\u518D\u5207\u6362\u6A21\u578B\u3002"}),!1;if(w==="read-audio-devices")return xo(y);if(w==="inspect-performance")return Sr(y);if(w==="cancel-tts"){if(Q)return In();try{let V=await Ie(y,{action:w});return T({ttsPreview:V,ttsPreviewFor:y}),V.status==="unconfirmed"?(ae({uncertain:!0,error:"\u65E0\u6CD5\u786E\u8BA4\u6717\u8BFB\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B\u3002"}),!1):!0}catch(V){return ae({error:String(V?.message??V),uncertain:!0}),!1}}let X=w==="disable"&&f&&!m;if(s.busy&&!X||s.ttsCancelling||w==="disable"&&s.voiceStopUnconfirmed||s.settingsConflict&&po.includes(w)||s.agentPermissionUncertain&&w==="save-agent-permissions"||s.agentRequestUncertain&&w==="decide-agent-request"||s.ttsUncertain&&!mt.includes(w)&&w!=="disable")return!1;let fe=w==="disable"&&s.checkedFor===y&&(s.status?.enabled||s.status?.ownerSessionId||s.status?.voiceSession?.recovery?.kind==="live-root-conflict");if(s.visibilityUncertain&&!mt.includes(w)&&!fe||s.outputVolumeUncertain&&w==="set-output-volume"||s.installerUncertain&&["start-model-install","control-model-install","apply-model-install"].includes(w))return!1;if(!y&&(y!==null||!Lu.has(w)))return T({error:"\u6B64\u64CD\u4F5C\u9700\u8981\u4F1A\u8BDD\u6765\u6E90"}),!1;let $e;if(X&&(f.stale=!0,Ln.has(f.action)&&f.abort.abort(),$e=m=Symbol("diagnostic-stop")),!mt.includes(w)){bt();for(let V of Ln)En(V)}(po.includes(w)||mo.includes(w)&&w!=="status")&&it({clear:w!=="set-performance-mode"});let xe;(Bh.includes(w)||Ln.has(w))&&(xe={id:y,action:w,abort:new AbortController,stale:!1},J?g.set(w,xe):f=xe),J||(b++,T({busy:!0,error:null,...w==="enable"?{enableError:null}:{},...w==="save-bindings"?{bindingError:null}:{},interruptibleRead:f?.action??null,diagnosticStopPending:!!m,...w==="listen-mode"?{listenModePending:$.mode,listenModeBefore:s.conversation?.helper?.listenMode??s.status?.listenMode}:{},...w!=="status"&&mo.includes(w)?{listenModeError:!1}:{}}));let Ye,De=B,xn=uo(s.status),$n=s.checkedFor,kn=ln;try{if(xe?.stale)return!1;let V;if(["read-output-volume","set-output-volume"].includes(w)){if(!k)throw new Error("\u8BED\u97F3\u8F93\u51FA\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA");let ke=xe?.abort??new AbortController;pe.add(ke);let en;try{let Me=w==="read-output-volume"?k.readVolume(y,ke.signal):k.setVolume(y,$,ke.signal),On=w==="read-output-volume"?await Promise.race([Me,new Promise((So,Zt)=>{en=()=>Zt(new Error("Read cancelled")),ke.signal.addEventListener("abort",en,{once:!0})})]):await Me;V=Un("output-volume",On)}finally{ke.signal.removeEventListener("abort",en),pe.delete(ke)}}else{if(w==="preview-tts"&&(Ye={id:y,abort:new AbortController,cancelled:!1},Q=Ye,T({ttsPreview:{status:"preparing"},ttsPreviewFor:y})),Ln.has(w)){let ke,en=new Promise((Me,On)=>{ke=()=>On(new Error("Read cancelled")),xe.abort.signal.addEventListener("abort",ke,{once:!0})});try{V=await Promise.race([Ie(y,{...$,action:w},xe.abort.signal),en])}finally{xe.abort.signal.removeEventListener("abort",ke)}}else V=await Ie(y,{...$,action:w},Ye?.abort.signal??xe?.abort.signal);if(xe?.stale)return!1}if(!q)return!mt.includes(w);if(xe?.stale)return!1;if(De!==B)return mt.includes(w)?!1:(Re({settings:!0,force:!0}),!0);if(Ln.has(w)&&En(w),["agent-permissions","save-agent-permissions"].includes(w)&&T({agentPermissions:V,agentPermissionsFor:y,agentPermissionUncertain:!1}),["agent-requests","decide-agent-request"].includes(w)&&(T({agentRequests:V,agentRequestsFor:y,agentRequestUncertain:!1}),w==="decide-agent-request"&&V.lastOutcome?.state==="completed"&&(T({checkedFor:null}),Re({settings:!0,force:!0})),w==="decide-agent-request"&&V.lastOutcome?.state==="unknown"&&T({uncertain:!0,error:"\u64CD\u4F5C\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u5148\u8BFB\u53D6\u5B9E\u9645\u72B6\u6001\uFF0C\u4E0D\u8981\u91CD\u8BD5\u3002"})),mo.includes(w)){if(w==="listen-mode"){if(z!==y||De!==B)return!1;if(V.listenMode!==$.mode)throw new Error("\u8BF4\u8BDD\u65B9\u5F0F\u7684\u56DE\u6267\u5C1A\u672A\u786E\u8BA4")}if(De!==B)return!0;if(["status","disable"].includes(w)&&V.ttsRuntime){let Me=!!(V.ttsRuntime.blocked||s.ttsUncertain&&(V.ttsRuntime.busy||kn!==ln));V.ttsRuntime.blocked&&ln++,T({ttsUncertain:Me}),!Me&&!V.ttsRuntime.busy&&!j&&Q?.cancelled&&(Q=null)}let ke=s.visibilityUncertain&&!(w==="status"&&s.visibilityReadbackFor===y),en=Object.hasOwn(V,"existingVoiceSession");!en&&Object.hasOwn(s.status??{},"existingVoiceSession")&&(V={...V,existingVoiceSession:s.status.existingVoiceSession,existingVoiceSessionSupported:s.status.existingVoiceSessionSupported}),T({status:V,checkedFor:y,uncertain:ke,visibilityUncertain:ke,...ke?{}:{visibilityReadbackFor:null},...J?{error:null}:{},...z===y?{sourcePending:!1}:{},...["status","disable"].includes(w)?{voiceStopUnconfirmed:!1}:{},...w==="status"&&en?{existingSessionUnconfirmed:!1}:{},...w==="listen-mode"?{listenModeReceiptRevision:s.conversation?.revision??null}:{}}),Ee&&(!V.enabled||V.existingVoiceSession?.sessionId!==Ee.sessionId)&&un(),["predecessor-cleanup-pending","helper-cleanup-pending"].includes(V.voiceSession?.recovery?.kind)?Ji(y):bt()}if(td.includes(w)&&(w!=="read-settings"&&De===B&&(a.delete(w),T({settingsDraftActions:[...a]})),w==="read-settings"&&a.size>0&&s.settingsFor===y&&s.settings?.revision!==V.revision?(l=V,T({settingsConflict:!0})):(l=null,T({settings:V,settingsFor:y,settingsConflict:!1,settingsKey:a.size>0?s.settingsKey:V.revision})),V.onboarding&&En("setup-status"),T({...V.onboarding?{setupStatus:V.onboarding,setupError:null}:{},...w==="read-settings"&&s.visibilityUncertain&&["hidden","workspace"].includes(V.voiceSession?.visibility)?{visibilityReadbackFor:y}:{}})),w==="read-settings"&&s.visibilityUncertain&&je(y,"status"),w==="conversation-models"&&T({conversationModels:V,conversationModelsFor:y,conversationModelsError:null}),w==="inspect-tts"&&T({ttsCapabilities:V,ttsCapabilitiesFor:y}),w==="save-tts"&&V.ttsSetup?.provider==="deepseek"&&V.ttsSetup.deepseekTextTransmissionAccepted&&!s.authorization?.scopes?.some(ke=>ke.id==="deepseek-text"&&ke.allowed)&&Wn(),w==="preview-tts"&&!Ye.cancelled&&T({ttsPreview:{...V,status:"completed"},ttsPreviewFor:y}),["read-output-volume","set-output-volume"].includes(w)&&T({outputVolume:V,outputVolumeFor:y,outputVolumeUncertain:!1}),["save-voice-prompt","save-conversation-model","set-visibility","set-performance-mode","save-tts","apply-model-install"].includes(w)&&(T({status:null,checkedFor:null,catalog:null,catalogFor:null}),Re({force:!0})),w==="plan-model-install"&&T({installPlan:V,installPlanFor:y,installPlanRequest:{...$}}),w==="model-installer"&&(T({installer:V,installerFor:y,installerUncertain:!!s.installerTerminationUnconfirmed}),z===y&&!U&&(U=!0,jn(!0))),w==="inspect-model-compute"&&s.installerFor===y&&s.installer&&T({installer:{...s.installer,compute:V}}),w==="start-model-install"&&T({installPlan:null,installPlanFor:null}),w==="list"){let ke=$.cursor&&s.catalogFor===y?s.catalog?.items??[]:[];T({catalog:{...V,items:[...new Map([...ke,...V.items].map(en=>[en.id,en])).values()]},catalogFor:y})}return["new","resume","listen-mode"].includes(w)&&T({catalog:null}),["new","resume"].includes(w)&&z===y&&De===B&&(i++,T({...r,newChatFor:w==="new"&&$.expectedOwnerSessionId!==void 0?y:void 0})),w==="listen-mode"&&(s.setupOpen&&T({settingsFor:void 0}),Re({settings:!0,force:!0})),["status","enable","disable","new","resume"].includes(w)&&z===y&&(w!=="status"||$n!==y||xn!==uo(V)||A!==We()||s.conversationError)&&oe(),!0}catch(V){if(w==="listen-mode"&&(z!==y||De!==B)||(xe&&(V?.uncertain||/TTS_TERMINATION_UNCONFIRMED/.test(String(V?.code??"")+" "+String(V?.message??"")))&&(w==="inspect-tts"?ae({}):T({installerUncertain:!0,installerTerminationUnconfirmed:!0})),!q||xe?.stale||Ye?.cancelled))return!1;if(De!==B)return mt.includes(w)||Re({settings:!0,force:!0}),!1;w==="status"&&(bt(),z===y&&De===B&&T({sourcePending:!1})),mt.includes(w)||(Z=null);let ke=zh(V);if((ke==="AUTHORIZATION_REQUIRED"||ke==="USAGE_AGREEMENT_REQUIRED")&&Wn({open:!0,review:!0}),Ye&&ke?.startsWith("TTS_DEEPSEEK_")&&!V.uncertain){let en=ke==="TTS_DEEPSEEK_API_KEY_INVALID"?"DeepSeek \u5B98\u65B9\u6717\u8BFB\u63A5\u53E3\u62D2\u7EDD\u4E86\u672C\u6B21 API Key\uFF08401\uFF09\u3002\u8BF7\u5728 DSH \u6A21\u578B\u8BBE\u7F6E\u4E2D\u6838\u5BF9\u5F00\u653E\u5E73\u53F0 API Key\u3002":String(V?.message??V).split(`
`)[0].slice(0,256);return await In()&&De===B&&T({ttsPreview:{status:"failed",provider:"deepseek",detail:en},ttsPreviewFor:y}),!1}return Ye&&await In(),w==="preview-tts"&&ln++,w==="enable"&&z===y&&De===B&&T({enableError:String(V?.message??V)+(V?.code?" ["+V.code+"]":"")}),w==="listen-mode"&&z===y&&De===B&&T({listenModeError:!0}),w==="disable"&&T({voiceStopUnconfirmed:!0}),T({error:String(V?.message??V),...w==="conversation-models"?{conversationModelsError:String(V?.message??V),conversationModels:null,conversationModelsFor:y}:{},...w==="save-bindings"?{bindingError:String(V?.message??V)+(V?.code?" ["+V.code+"]":"")}:{},...w==="save-agent-permissions"?{agentPermissionUncertain:!0}:{},...w==="decide-agent-request"?{agentRequestUncertain:!0}:{},...w==="preview-tts"?{ttsPreviewFor:y,ttsUncertain:!0}:{},...w==="set-output-volume"?{outputVolumeUncertain:!0}:{},...po.includes(w)?{uncertain:!0,visibilityUncertain:!0,visibilityReadbackFor:null}:{},...["start-model-install","control-model-install"].includes(w)?{installerUncertain:!0}:{},...mo.includes(w)?{uncertain:!0,readOnlyFailure:w==="status"&&(!s.uncertain||s.readOnlyFailure===!0)}:{}}),Ln.has(w)&&je(y,w),po.includes(w)?(je(y,"read-settings"),je(y,"status")):mo.includes(w)&&w!=="status"?je(y,"status"):w==="set-output-volume"?je(y,"read-output-volume"):w==="save-agent-permissions"?je(y,"agent-permissions"):w==="decide-agent-request"?je(y,"agent-requests"):["start-model-install","control-model-install"].includes(w)&&je(y,"model-installer"),!1}finally{g.get(w)===xe&&g.delete(w),Ye&&Q===Ye&&!Ye.cancelled&&(Q=null),xe&&f===xe&&(f=null),$e&&m===$e&&(m=null),J||(b--,T({busy:b>0,interruptibleRead:f?.action??null,diagnosticStopPending:!!m,...w==="listen-mode"?{listenModePending:null}:{}})),queueMicrotask(()=>{qo(),wt()})}},dispose(){if(q){B++,Br(),a.clear(),l=null,T({settingsConflict:!1,settingsDraftActions:[]}),it({clear:!0}),Nn({clear:!0}),bt(),In(),x(),f?.abort.abort(),Gn(),q=!1,P++,L++,I?.(),C?.();for(let y of pe)y.abort();pe.clear(),me.clear()}}},Xe}function fo(e,n,t,o=12){let i=n.left+o,r=n.top+o;return{x:Math.max(i,Math.min(e.x,Math.max(i,n.right-t.width-o))),y:Math.max(r,Math.min(e.y,Math.max(r,n.bottom-t.height-o)))}}function rd(e=window){let n=null,t=null,o=null,i=null,r=null,s=null,a=null,l=null,u=null,d=()=>e.performance?.now?.()??Date.now(),p=e.matchMedia?.("(prefers-reduced-motion: reduce)"),f=()=>{l!==null&&e.cancelAnimationFrame?.(l),l=null,u&&(u=null,q("endDrag"))},m=A=>{if(l=null,!u||!n)return;if(p?.matches||n.dataset?.motion==="off"){f();return}let C=Math.max(0,A-u.time);u.time=A;let P={...i},L=!1;for(let U of["x","y"]){let Q=u[U],j=(Q.target-i[U])*Math.exp(-C/Q.tau);P[U]=Math.abs(j)<.5?Q.target:Q.target-j,P[U]!==Q.target&&(L=!0)}i=fo(P,r.box,r.size),g(),q("move");for(let U of["x","y"])Math.abs(i[U]-P[U])>.01&&(u[U].target=i[U]);!L||A-u.start>=2400?f():l=e.requestAnimationFrame(m)},b=(A,C)=>{n.style[A]!==C&&(n.style[A]=C)},g=()=>{b("left",`${i.x}px`),b("top",`${i.y}px`)},_=null,x=null,S="",Z=()=>{let A=(n?.closest("[data-shell-overlay]")??n?.ownerDocument?.querySelector?.("[data-shell-overlay]"))?.getBoundingClientRect(),C=e.visualViewport,P=Math.max(A?.left??0,C?.offsetLeft??0),L=Math.max(A?.top??0,C?.offsetTop??0),U=Math.min(A?.right??e.innerWidth,(C?.offsetLeft??0)+(C?.width??e.innerWidth)),Q=Math.min(A?.bottom??e.innerHeight,(C?.offsetTop??0)+(C?.height??e.innerHeight)),j=parseFloat(e.getComputedStyle(n).getPropertyValue("--dsh-frame-top-clearance"))||0;return{left:P,top:L+j,right:U,bottom:Q}},D=A=>{if(!n)return;let C=Number.isFinite(A?.width)&&Number.isFinite(A?.height),P=C&&r?r.box:Z();b("maxWidth",`${Math.max(1,P.right-P.left-24)}px`),b("maxHeight",`${Math.max(1,P.bottom-P.top-24)}px`);let L=C?A:n.getBoundingClientRect();r={box:P,size:{width:L.width,height:L.height}},i=fo(i??{x:P.right-L.width-20,y:P.bottom-L.height-20},P,L),g(),!o&&!u&&q("resize")},G=()=>{a!==null&&e.cancelAnimationFrame?.(a),a=null},N=()=>{G();let A=s;s=null,!(!o||!n||!A)&&(i=fo(A,r.box,r.size),g(),q("move"))},B=A=>{n?.dataset&&(A&&["left","right","top","bottom"].includes(A.edge)&&["preview","docked"].includes(A.phase)?(n.dataset.whaleDockEdge=A.edge,n.dataset.whaleDockPhase=A.phase):(delete n.dataset.whaleDockEdge,delete n.dataset.whaleDockPhase))},O=()=>{let A=x;x=null;try{A?.dispose()}catch{}B(null),n&&(n.style.zIndex=S)},q=A=>{try{typeof x?.[A]=="function"&&x[A]()}catch{O()}},k=()=>{if(O(),!(!n||_?.version!==1||typeof _.register!="function"))try{x=_.register({id:"whale-voice",read(){let{box:A,size:C}=r;return{rect:{...i,width:C.width,height:C.height},bounds:{x:A.left+12,y:A.top+12,width:Math.max(1,A.right-A.left-24),height:Math.max(1,A.bottom-A.top-24)},collapsed:n.hasAttribute?.("data-collapsed")===!0}},apply(A){!n||!Number.isFinite(A?.x)||!Number.isFinite(A?.y)||(i=fo(A,r.box,r.size),g())},onDock:B,onFront:A=>{n&&(n.style.zIndex=A===!0?"901":"900")}}),["beginDrag","move","endDrag","resize","detach","dispose"].every(A=>typeof x?.[A]=="function")||O()}catch{O()}},z=(A=!1,C=!1)=>{A?N():(G(),s=null);let P=o;o=null,P?.target.hasPointerCapture?.(P.id)&&P.target.releasePointerCapture(P.id);let L=d(),U=P?.samples??[],Q=U.at(-1),j=U[0],me=Q&&j?Q.time-j.time:0,pe=Q?L-Q.time:1/0,ne=Math.max(0,1-Math.max(0,pe-24)/56),Y=me>0?(Q.x-j.x)/me*ne:0,T=me>0?(Q.y-j.y)/me*ne:0;if(P&&C&&!p?.matches&&n?.dataset?.motion!=="off"&&typeof e.requestAnimationFrame=="function"&&Math.hypot(Y,T)>.04){let K=fo({x:i.x+Y*240,y:i.y+T*240},r.box,r.size),re=(de,_e)=>({target:K[de],tau:_e?Math.max(1,Math.abs((K[de]-i[de])/_e)):240});u={x:re("x",Y),y:re("y",T),time:L,start:L},l=e.requestAnimationFrame(m)}else P&&q(A?"endDrag":"detach")},I=()=>{f(),z(),O(),t?.disconnect(),t=null,e.removeEventListener("resize",D),e.visualViewport?.removeEventListener("resize",D),e.visualViewport?.removeEventListener("scroll",D),n=null,r=null};return{ref(A){if(A===n||(I(),!A))return;n=A,S=A.style.zIndex||"",n.style.transitionProperty="none",t=new e.ResizeObserver(P=>{let L=P?.find?.(Q=>Q.target===n),U=L?.borderBoxSize?.[0]??L?.borderBoxSize;Number.isFinite(U?.inlineSize)&&Number.isFinite(U?.blockSize)&&P.every(Q=>Q.target===n)?D({width:U.inlineSize,height:U.blockSize}):D()}),t.observe(n);let C=n.closest("[data-shell-overlay]")??n.ownerDocument?.querySelector?.("[data-shell-overlay]");C&&t.observe(C),e.addEventListener("resize",D),e.visualViewport?.addEventListener("resize",D),e.visualViewport?.addEventListener("scroll",D),D(),k()},useLayoutService(A){return _=A,k(),()=>{_===A&&(O(),_=null,D())}},activate(){f(),q("activate")},pointerDown(A,C=A.currentTarget){A.button!==0||A.pointerType&&A.pointerType!=="mouse"||!n||(f(),D(),q("beginDrag"),o={id:A.pointerId,target:C,x:A.clientX,y:A.clientY,start:{...i},samples:[{x:A.clientX,y:A.clientY,time:d()}]},C.setPointerCapture(A.pointerId),A.preventDefault())},pointerMove(A){if(!o||A.pointerId!==o.id)return;let C=d(),P=[A];try{P=[...A.getCoalescedEvents?.()??[],A]}catch{}for(let j of P){if(!Number.isFinite(j.clientX)||!Number.isFinite(j.clientY))continue;let me=Number.isFinite(j.timeStamp)&&Number.isFinite(A.timeStamp)?Math.min(0,j.timeStamp-A.timeStamp):0,pe=C+Math.max(-60,me),ne=o.samples.at(-1);if(pe<ne.time)continue;let Y={x:j.clientX,y:j.clientY,time:pe};pe===ne.time?o.samples[o.samples.length-1]=Y:o.samples.push(Y)}let L=C-60;for(;o.samples.length>2&&o.samples[1].time<=L;)o.samples.shift();let U=o.samples[0],Q=o.samples[1];if(Q&&U.time<L&&Q.time>L){let j=(L-U.time)/(Q.time-U.time);o.samples[0]={x:U.x+(Q.x-U.x)*j,y:U.y+(Q.y-U.y)*j,time:L}}s={x:o.start.x+A.clientX-o.x,y:o.start.y+A.clientY-o.y},typeof e.requestAnimationFrame!="function"?N():a===null&&(a=e.requestAnimationFrame(N))},pointerEnd(A){A.pointerId===o?.id&&z(!["pointercancel","lostpointercapture"].includes(A.type),A.type==="pointerup")},keyDown(){},fit:D,dispose:I}}var Di=Object.freeze({panel:320,settings:660,setup:420,collapsed:216});function id(e=window,{onResize:n=()=>{}}={}){let t=null,o=null,i=null,r=null,s=null,a=null,l=null,u=null,d=null,p=null,f=null,m=null,b=null,g=null,_=null,x=null,S={width:0,height:0},Z=e.matchMedia?.("(prefers-reduced-motion: reduce)"),D=()=>Z?.matches?"off":t?.dataset.motion??"spring",G=A=>Number.parseFloat(A)||0;function N(){let A=e.visualViewport,C=(t.closest?.("[data-shell-overlay]")??t.ownerDocument?.querySelector?.("[data-shell-overlay]"))?.getBoundingClientRect(),P=Math.max(C?.left??0,A?.offsetLeft??0),L=Math.max(C?.top??0,A?.offsetTop??0),U=Math.min(C?.right??e.innerWidth,(A?.offsetLeft??0)+(A?.width??e.innerWidth)),Q=Math.min(C?.bottom??e.innerHeight,(A?.offsetTop??0)+(A?.height??e.innerHeight)),j=e.getComputedStyle(t);return{width:Math.max(1,U-P-24),height:Math.max(1,Math.min((Q-L)*.6,Q-L-24-G(j.getPropertyValue("--dsh-frame-top-clearance")))),chrome:G(j.paddingTop)+G(j.paddingBottom)+G(j.borderTopWidth)+G(j.borderBottomWidth),horizontalChrome:G(j.paddingLeft)+G(j.paddingRight)+G(j.borderLeftWidth)+G(j.borderRightWidth),panelRadius:G(j.getPropertyValue("--dsw-radius-lg"))||12}}function B(){l!==null&&e.cancelAnimationFrame(l),l=null,d=null}function O(){!t||!p||(p.width=Math.max(1,Math.min(p.width,m.width)),p.height=Math.max(1,Math.min(p.height,m.height)),t.style.width=`${p.width.toFixed(3)}px`,t.style.height=`${p.height.toFixed(3)}px`,t.style.setProperty?.("--whale-visible-content",`${Math.max(1,p.height-m.chrome)}px`),x===null?t.style.removeProperty?.("--whale-animated-radius"):t.style.setProperty?.("--whale-animated-radius",`${x.toFixed(2)}px`),n({width:p.width,height:p.height}))}function q(A){if(l=null,!t||!f)return;let C=Math.min(.032,Math.max(.001,d===null?1/60:(A-d)/1e3));d=A;let P=_?560:D()==="firm"?420:360,L=_?47.4:D()==="firm"?41:30,U=!0;for(let Q of["width","height"]){for(let j=0;j<4;j++)S[Q]+=(P*(f[Q]-p[Q])-L*S[Q])*C/4,p[Q]+=S[Q]*C/4;(Math.abs(f[Q]-p[Q])>.25||Math.abs(S[Q])>1)&&(U=!1)}if(_){let Q=f.height-_.height,j=Math.abs(Q)>.25?Math.max(0,Math.min(1,(p.height-_.height)/Q)):1,me=b?f.height/2:m.panelRadius;x=_.radius+(me-_.radius)*j}(U||D()==="off")&&(p={...f},S={width:0,height:0},d=null,_=x=null),O(),!U&&D()!=="off"&&(l=e.requestAnimationFrame(q))}function k(){if(!t||!o)return;m=N(),t.dataset.compactHeight=m.height<300?"true":"false";let A=t.hasAttribute("data-collapsed")&&t.dataset.collapsed!=="false";if(p&&b!==null&&A!==b){let de=x??(b?p.height/2:m.panelRadius);_={height:p.height,radius:de},x=de,t.style.setProperty?.("--whale-animated-radius",`${de.toFixed(2)}px`),S={width:0,height:0}}let C=t.dataset.view,P=t.dataset.sourcePending&&C==="home"&&g===C&&!A&&b===A?f?.height:void 0;b=A,g=C;let L=Math.min(m.width,A?Di.collapsed:Di[C]??Di.panel);t.style.boxSizing="border-box",t.style.transitionProperty="none",t.style.overflow="hidden",t.style.maxWidth=`${m.width}px`,t.style.maxHeight=`${m.height}px`;let U=Math.max(1,m.height-m.chrome);o.style.width=`${Math.max(1,L-m.horizontalChrome)}px`,o.style.maxHeight=`${U}px`,o.style.overflowY="hidden",o.style.minHeight="0",t.style.setProperty?.("--whale-content-limit",`${U}px`);let Q=!!o.querySelector?.('[data-size-detail="true"]'),j=A?null:C==="setup"?o.querySelector?.("[data-whale-intrinsic]"):C==="home"&&!Q?o.querySelector?.("[data-home-controls]"):null,me=j?.querySelector?.("[data-whale-natural-content]"),pe=me??j;C==="setup"&&!A&&(o.style.height="auto"),pe!==a&&(s?.disconnect(),u!==null&&e.cancelAnimationFrame(u),u=null,s=null,a=pe,a&&e.ResizeObserver&&(s=new e.ResizeObserver(()=>{u===null&&(u=e.requestAnimationFrame(()=>{u=null,k()}))}),s.observe(a)));let ne=j?.getBoundingClientRect?.().height,Y=me?Math.max(0,me.offsetHeight-me.parentElement.clientHeight):0,T=ne+Y,K=A?44:T>0?Math.ceil(T+m.chrome):C==="home"?Q?520:320:480,re=Math.min(m.height,P??K);(C!=="setup"||A)&&(o.style.height=`${Math.max(1,re-m.chrome)}px`),f={width:L,height:re},!p||D()==="off"?(B(),p={...f},S={width:0,height:0},_=x=null,O()):l===null&&(Math.abs(p.width-L)>.25||Math.abs(p.height-re)>.25)&&(d=e.performance?.now?.()??null,l=e.requestAnimationFrame(q))}function z(){B(),i?.disconnect(),r?.disconnect(),s?.disconnect(),u!==null&&e.cancelAnimationFrame(u),u=null,s=a=null,e.removeEventListener("resize",k),e.visualViewport?.removeEventListener("resize",k),e.visualViewport?.removeEventListener("scroll",k),Z?.removeEventListener?.("change",k),i=r=null}function I(){if(z(),!(!t||!o)){if(e.ResizeObserver){i=new e.ResizeObserver(k);let A=t.closest?.("[data-shell-overlay]")??t.ownerDocument?.querySelector?.("[data-shell-overlay]");A&&i.observe(A)}e.MutationObserver&&(r=new e.MutationObserver(k),r.observe(t,{attributes:!0,attributeFilter:["data-view","data-motion","data-collapsed","data-source-pending"]}),r.observe(o,{attributes:!0,attributeFilter:["data-size-detail","data-home-layout"],subtree:!0})),e.addEventListener("resize",k),e.visualViewport?.addEventListener("resize",k),e.visualViewport?.addEventListener("scroll",k),Z?.addEventListener?.("change",k),k()}}return{ref(A){t!==A&&(t=A,p=f=b=g=_=x=null,S={width:0,height:0},I())},contentRef(A){o!==A&&(o=A,I())},update:k,dispose(){z(),t=o=p=f=null}}}var sd=["spring","firm","off"];function ad(e=window){let n="dsh-whale-voice:motion:v1",t="dsh-whale-voice:assistant-name:v1",o=()=>{try{let u=e.localStorage.getItem(t)?.trim();return u&&u.length<=40?u:null}catch{return null}},i=new Set,r=()=>{try{let u=e.localStorage.getItem(n);return sd.includes(u)?u:"spring"}catch{return"spring"}},s={motion:r(),assistantName:o(),error:null},a=u=>{s=u;for(let d of i)d()},l=u=>{[n,t,null].includes(u.key)&&a({motion:r(),assistantName:o(),error:null})};return e.addEventListener("storage",l),{getSnapshot:()=>s,subscribe(u){return i.add(u),()=>i.delete(u)},setMotion(u){if(!sd.includes(u))return!1;let d=null;try{e.localStorage.setItem(n,u)}catch{d="storage-unavailable"}return a({...s,motion:u,error:d}),!d},setAssistantName(u){if(typeof u!="string"||!u.trim()||u.trim().length>40)return!1;let d=u.trim(),p=null;try{e.localStorage.setItem(t,d)}catch{p="storage-unavailable"}return a({...s,assistantName:d,error:p}),!p},dispose(){e.removeEventListener("storage",l),i.clear()}}}var Ch='button,input,textarea,select,a,label,summary,[role="button"],[role="slider"],[role="tab"],[contenteditable="true"],[data-no-drag]';function cd(e,n){if(!e||!n?.contains(e))return!1;let t=e.closest?.(Ch);return!t||t.hasAttribute("data-drag-surface")}function ld(e){if(e.repeat||e.metaKey)return null;let n=e.code;return!/^(F([1-9]|1[0-9]|2[0-4])|Key[A-Z]|Digit[0-9]|Space)$/.test(n)||e.altKey&&n==="F4"?null:{code:n,modifiers:[e.ctrlKey&&"Control",e.altKey&&"Alt",e.shiftKey&&"Shift"].filter(Boolean)}}var pr=()=>({revision:0,rootSessionId:null,title:null,latest:null,items:[],inputActive:!1,inputError:null,playbackConfirmed:!1}),Mi=()=>({schema:1,hardware:null,compute:{schema:1,default:"cpu",observedAt:null,backends:{},reason:"\u5C1A\u672A\u68C0\u6D4B\u672C\u5730\u8BA1\u7B97\u540E\u7AEF\u3002"},models:[],jobs:[]});async function ud(e,n=()=>{}){let t=await e.remote.$mount(Qu),o,i;try{if(i=e.inject(["remote","remote.whaleConversation"],d=>{o=d.remote.whaleConversation}),await i.await(),!o)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5C1A\u672A\u5C31\u7EEA")}catch(d){throw await i?.dispose(),await t(),d}let r=new Set,s=new Map,a=!1,l=d=>{if(d?.ok!==!0)throw d?.error??new Error("\u8BED\u97F3\u63A5\u53E3\u54CD\u5E94\u65E0\u6548");return d.value},u=async(d,p,f=!0)=>{let m;try{m=await d()}catch(b){throw f&&!a&&n("ui-request","finished",p?.aborted?"cancelled":"failed"),b}return f&&m?.ok!==!0&&m?.error==null&&!p?.aborted&&n("ui-render-error","finished","failed"),l(m)};return{subscribeUpdates(d,p){let f=new AbortController;return r.add(f),Promise.resolve().then(async()=>{if(!f.signal.aborted)try{for await(let m of o.followUpdates(f.signal))f.signal.aborted||d(m);f.signal.aborted||(n("ui-stream","finished","failed"),p())}catch{f.signal.aborted||(n("ui-stream","finished","failed"),p())}finally{r.delete(f)}}),()=>{f.abort(),r.delete(f)}},updateAction(d,p){if(a)throw new Error("\u66F4\u65B0\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.updateAction(d,p),p)},subscribePresentation(d,p){let f=new AbortController;return r.add(f),(async()=>{try{for await(let m of o.followPresentation(f.signal))f.signal.aborted||d(m);f.signal.aborted||(n("ui-stream","finished","failed"),p(new Error("\u4F1A\u8BDD\u663E\u793A\u8FDE\u63A5\u5DF2\u7ED3\u675F")))}catch(m){f.signal.aborted||(n("ui-stream","finished","failed"),p(m))}finally{r.delete(f)}})(),()=>{f.abort(),r.delete(f)}},subscribe(d,p,f=()=>{}){let m=new AbortController;return r.add(m),p(pr(),{initial:!0}),(async()=>{try{for await(let b of o.follow(d,m.signal))m.signal.aborted||p(b);m.signal.aborted||(n("ui-stream","finished","failed"),p(pr(),{initial:!0}),f(new Error("\u8BED\u97F3\u72B6\u6001\u8FDE\u63A5\u5DF2\u7ED3\u675F\uFF0C\u6B63\u5728\u91CD\u65B0\u8FDE\u63A5")))}catch(b){m.signal.aborted||(n("ui-stream","finished","failed"),p(pr(),{initial:!0}),f(b))}finally{r.delete(m)}})(),()=>{m.abort(),r.delete(m),p(pr(),{initial:!0})}},subscribeModels(d,p,f=()=>{}){if(a)return p(Mi(),{initial:!0}),f(new Error("\u6A21\u578B\u8FDB\u5EA6\u63A5\u53E3\u5DF2\u5378\u8F7D")),()=>{};let m=new AbortController,b=!1,g=()=>{b||(b=!0,m.abort(),s.delete(m),p(Mi(),{initial:!0}))};return s.set(m,g),p(Mi(),{initial:!0}),(async()=>{try{for await(let _ of o.followModels(d,m.signal))!b&&!a&&!m.signal.aborted&&p(_);!b&&!a&&!m.signal.aborted&&(n("ui-stream","finished","failed"),g(),f(new Error("\u6A21\u578B\u8FDB\u5EA6\u8FDE\u63A5\u5DF2\u7ED3\u675F\uFF0C\u6B63\u5728\u91CD\u65B0\u8FDE\u63A5")))}catch(_){!b&&!a&&!m.signal.aborted&&(n("ui-stream","finished","failed"),g(),f(_))}finally{s.delete(m)}})(),g},async action(d,p,f){if(a)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");let m=await u(()=>o.action(d,p,f),f);try{let b=JSON.parse(m);if(b?.protocol!==1||b.action!==p.action||!b.value||typeof b.value!="object"||Array.isArray(b.value))throw new Error("Fish Voice UI protocol mismatch");return b.value}catch(b){throw n("ui-render-error","finished","failed"),b}},readAuthorization:d=>u(()=>o.readAuthorization(d),d),saveAuthorization:(d,p)=>u(()=>o.saveAuthorization(d,p),p),async senseVoiceAsrAction(d,p){if(a)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.senseVoiceAsrAction(d,p),p)},async manageSessions(d,p,f){if(a)throw new Error("\u8BED\u97F3\u63A5\u53E3\u5DF2\u5378\u8F7D");return JSON.parse(await u(()=>o.manageSessions(d,p,f),f))},listExistingVoiceSessions(d,p){if(a)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.listExistingVoiceSessions(d,p),p)},setExistingVoiceSession(d,p){if(a)throw new Error("\u4F1A\u8BDD\u7ED1\u5B9A\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.setExistingVoiceSession(d,p),p)},retryVoiceTranscript(d,p){if(a)throw new Error("\u8BED\u97F3\u91CD\u53D1\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.retryVoiceTranscript(d,p),p)},readClientOperationScope(d){if(a)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.readClientOperationScope(d),d,!1)},recordClientOperations(d,p){if(a)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.recordClientOperations(d,p),p,!1)},readOperationLog(d,p){if(a)throw new Error("\u8BCA\u65AD\u65E5\u5FD7\u63A5\u53E3\u5DF2\u5378\u8F7D");return u(()=>o.readOperationLog(d,p),p,!1)},readSetup:d=>u(()=>o.readSetup(d),d),readVolume:(d,p)=>u(()=>o.readVolume(d,p),p),setVolume:(d,p,f)=>u(()=>o.setVolume(d,p,f),f),async dispose(){a=!0;for(let d of[...s.values()])d();s.clear();for(let d of r)d.abort();r.clear(),await i.dispose(),await t()}}}var md=new Set(cr),fd=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,dd=256,Zi="dsh-fish-voice.pending-operation-log.v1",Fi="ui-buffer-overflow";function Ph(){let e=globalThis.crypto;if(e?.randomUUID)return e.randomUUID();let n=e?.getRandomValues(new Uint8Array(16));if(!n)return null;n[6]=n[6]&15|64,n[8]=n[8]&63|128;let t=Array.from(n,o=>o.toString(16).padStart(2,"0")).join("");return[t.slice(0,8),t.slice(8,12),t.slice(12,16),t.slice(16,20),t.slice(20)].join("-")}function Gh(){try{return globalThis.sessionStorage}catch{return}}function pd(e,n=!1){if(!e||typeof e.id!="string"||!fd.test(e.id)||!Number.isSafeInteger(e.at)||e.at<0||!md.has(e.action)||!["user","ui"].includes(e.source)||n!==(e.action===Fi)||n&&(e.source!=="ui"||!Number.isSafeInteger(e.count)||e.count<1))return null;let{id:t,at:o,action:i,source:r}=e;return{id:t,at:o,action:i,source:r,...n?{count:e.count}:{},...["requested","finished"].includes(e.phase)?{phase:e.phase}:{},...["ok","failed","cancelled"].includes(e.result)?{result:e.result}:{}}}function hd({schedule:e=setTimeout,unschedule:n=clearTimeout,now:t=Date.now,identify:o=Ph,storage:i=Gh()}={}){let r=[],s=null,a=null,l=null,u=!1,d,p,f,m=0,b=!1,g=()=>{p!==void 0&&(n(p),p=void 0)},_=k=>k&&k.at>=t()-$u,x=()=>{r=r.filter(_),_(s)||(s=null),_(a)||(a=null)},S=()=>r.length>0||s!==null||a!==null,Z=()=>{if(!(!l||!i))try{S()?i.setItem(Zi,JSON.stringify({scope:l,pending:r,overflow:s,dropped:a})):i.removeItem(Zi)}catch{}},D=(k,z)=>{a={count:Math.min(Number.MAX_SAFE_INTEGER,(a?.count??0)+k),at:Math.max(a?.at??0,z)}},G=k=>{r.length>=dd?D(1,k.at):r.push(k)},N=k=>{if(l===null){let z;try{z=JSON.parse(i?.getItem(Zi)??"null")}catch{}if(z?.scope===k){let I=r,A=a,C=Array.isArray(z.pending)?z.pending.slice(0,dd).map(P=>pd(P)).filter(_):[];r=[...new Map(C.map(P=>[P.id,P])).values()],s=pd(z.overflow,!0),a=z.dropped&&Number.isSafeInteger(z.dropped.count)&&z.dropped.count>0&&Number.isSafeInteger(z.dropped.at)&&_(z.dropped)?{count:z.dropped.count,at:z.dropped.at}:null,A&&D(A.count,A.at);for(let P of I)_(P)&&G(P)}}else l!==k&&(r=[],s=null,a=null);l=k,u=!0,x(),Z()},B=(k=160)=>{b||f||p!==void 0||u&&!S()||!d?.readClientOperationScope||!d?.recordClientOperations||(p=e(()=>{p=void 0,O()},k),p?.unref?.())};async function O(){let k=new AbortController,z=d;f=k;let I=()=>!b&&d===z&&f===k;try{let A=AbortSignal.any([k.signal,AbortSignal.timeout(1e4)]);if(!u){let U=await z.readClientOperationScope(A);if(!I())return;if(typeof U?.scope!="string"||!fd.test(U.scope))throw new Error("Operation scope unavailable");N(U.scope)}if(x(),!s&&a){let U=o();U&&(s={id:U,at:a.at,action:Fi,source:"ui",phase:"finished",count:a.count},a=null)}Z();let C=s?[s,...r.slice(0,co-1)]:r.slice(0,co);if(!C.length)return;let P=await z.recordClientOperations({scope:l,events:C},A);if(!I())return;if(P?.accepted!==!0)throw new Error("Operation batch was not accepted");let L=new Set(C.map(U=>U.id));r=r.filter(U=>!L.has(U.id)),s&&L.has(s.id)&&(s=null),m=0,Z()}catch{I()&&(u=!1,m++)}finally{I()&&(f=void 0,B(m?Math.min(3e4,750*2**Math.min(m-1,6)):160))}}function q(k,z,I,A){if(b||!md.has(k)||k===Fi)return;let C;try{C=o()}catch{return}C&&(x(),G({id:C,at:t(),action:k,source:z,...I?{phase:I}:{},...A?{result:A}:{}}),Z(),B())}return{user(k){q(k,"user")},internal(k,z,I){q(k,"ui",z,I)},attach(k){d===k||b||(g(),f?.abort(),f=void 0,d=k,u=!1,m=0,B(0))},dispose(){b=!0,g(),f?.abort(),r=[],s=null,a=null}}}var Ld=require("react-dom");var Fe=require("react"),mr=require("@deepseek-ai/dsh-client-ui-primitives");var h={status:"AmqGBq_status",iconButton:"AmqGBq_iconButton",hint:"AmqGBq_hint",motionPreview:"AmqGBq_motionPreview",sessionRename:"AmqGBq_sessionRename",popover:"AmqGBq_popover",editNotice:"AmqGBq_editNotice",keyBinding:"AmqGBq_keyBinding",bindingActions:"AmqGBq_bindingActions",popoverHeader:"AmqGBq_popoverHeader",audioDeviceField:"AmqGBq_audioDeviceField",currentModel:"AmqGBq_currentModel",statusRow:"AmqGBq_statusRow",settingsBody:"AmqGBq_settingsBody",voiceStatus:"AmqGBq_voiceStatus",message:"AmqGBq_message",homeTargetRow:"AmqGBq_homeTargetRow",bubbleBrand:"AmqGBq_bubbleBrand",markSmall:"AmqGBq_markSmall",guideButton:"AmqGBq_guideButton",settingsBrand:"AmqGBq_settingsBrand",whaleSpin:"AmqGBq_whaleSpin",headerActions:"AmqGBq_headerActions",sliderLabel:"AmqGBq_sliderLabel",currentDshTarget:"AmqGBq_currentDshTarget",caption:"AmqGBq_caption",newChatButton:"AmqGBq_newChatButton",recentMessages:"AmqGBq_recentMessages",loadHistory:"AmqGBq_loadHistory",whaleInputPulse:"AmqGBq_whaleInputPulse",conversationHeader:"AmqGBq_conversationHeader",modelNav:"AmqGBq_modelNav",quickHint:"AmqGBq_quickHint",quickSegments:"AmqGBq_quickSegments",capabilityRow:"AmqGBq_capabilityRow",voiceBars:"AmqGBq_voiceBars",voicePrompt:"AmqGBq_voicePrompt",agreement:"AmqGBq_agreement",field:"AmqGBq_field",placeholder:"AmqGBq_placeholder",historyScope:"AmqGBq_historyScope",segmented:"AmqGBq_segmented",whalePageEnter:"AmqGBq_whalePageEnter",radios:"AmqGBq_radios",inputCaptionReceipt:"AmqGBq_inputCaptionReceipt",header:"AmqGBq_header",backButton:"AmqGBq_backButton",updateAnnouncement:"AmqGBq_updateAnnouncement",quickActions:"AmqGBq_quickActions",inputCaption:"AmqGBq_inputCaption",newMessages:"AmqGBq_newMessages",mainAction:"AmqGBq_mainAction",existingSessionSearch:"AmqGBq_existingSessionSearch",brand:"AmqGBq_brand",backIcon:"AmqGBq_backIcon",deviceSelect:"AmqGBq_deviceSelect",authorization:"AmqGBq_authorization",inlineField:"AmqGBq_inlineField",inputCaptionText:"AmqGBq_inputCaptionText",voicePromptCount:"AmqGBq_voicePromptCount",panelContent:"AmqGBq_panelContent",bubble:"AmqGBq_bubble",performanceChoice:"AmqGBq_performanceChoice",ellipsis:"AmqGBq_ellipsis",voicePromptActions:"AmqGBq_voicePromptActions",voiceTarget:"AmqGBq_voiceTarget",settingsPage:"AmqGBq_settingsPage",notice:"AmqGBq_notice",error:"AmqGBq_error",permissionList:"AmqGBq_permissionList",updateHeader:"AmqGBq_updateHeader",primary:"AmqGBq_primary",audioDevices:"AmqGBq_audioDevices",audioDeviceGrid:"AmqGBq_audioDeviceGrid",pageHeading:"AmqGBq_pageHeading",inlineActions:"AmqGBq_inlineActions",volumeControl:"AmqGBq_volumeControl",fullName:"AmqGBq_fullName",assistantNameInput:"AmqGBq_assistantNameInput",actions:"AmqGBq_actions",bubbleStatus:"AmqGBq_bubbleStatus",voicePromptMode:"AmqGBq_voicePromptMode",existingSessionPicker:"AmqGBq_existingSessionPicker",authorizationSteps:"AmqGBq_authorizationSteps",authorizationBody:"AmqGBq_authorizationBody",audioDeviceNotice:"AmqGBq_audioDeviceNotice",mouseBinding:"AmqGBq_mouseBinding",inputCaptions:"AmqGBq_inputCaptions",whaleBreathe:"AmqGBq_whaleBreathe",authorizationActions:"AmqGBq_authorizationActions",audioDeviceHint:"AmqGBq_audioDeviceHint",conversationChoice:"AmqGBq_conversationChoice",keyBindingRow:"AmqGBq_keyBindingRow",settingsNav:"AmqGBq_settingsNav",sessionTitle:"AmqGBq_sessionTitle",settingsHeader:"AmqGBq_settingsHeader",whaleFeedback:"AmqGBq_whaleFeedback",disclosureRow:"AmqGBq_disclosureRow",quickConversation:"AmqGBq_quickConversation",assistantName:"AmqGBq_assistantName",messageName:"AmqGBq_messageName",formActions:"AmqGBq_formActions",whalePreview:"AmqGBq_whalePreview",openOriginal:"AmqGBq_openOriginal",homeTargetPicker:"AmqGBq_homeTargetPicker",voicePromptInput:"AmqGBq_voicePromptInput",note:"AmqGBq_note",existingSessionTarget:"AmqGBq_existingSessionTarget",floating:"AmqGBq_floating",settings:"AmqGBq_settings",bindingEditor:"AmqGBq_bindingEditor",quickSpeedHeader:"AmqGBq_quickSpeedHeader",currentDshAction:"AmqGBq_currentDshAction",existingSessionList:"AmqGBq_existingSessionList",pathRow:"AmqGBq_pathRow",conversationOptions:"AmqGBq_conversationOptions",section:"AmqGBq_section",details:"AmqGBq_details",whaleEnter:"AmqGBq_whaleEnter",mark:"AmqGBq_mark",modelHeading:"AmqGBq_modelHeading",requestDetails:"AmqGBq_requestDetails",existingSessionHome:"AmqGBq_existingSessionHome",spin:"AmqGBq_spin",updateDialog:"AmqGBq_updateDialog",panelViewport:"AmqGBq_panelViewport",quickSpeed:"AmqGBq_quickSpeed",volumeRow:"AmqGBq_volumeRow",settingsLayout:"AmqGBq_settingsLayout",text:`.AmqGBq_floating {
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

[data-ds-dark-theme] .AmqGBq_floating {
  --whale-solid-base: var(--dsw-static-neutral-bluish-950, #181a1e);
}

.AmqGBq_floating[data-collapsed] {
  border-radius: var(--whale-animated-radius, 999px);
  corner-shape: round;
  width: 216px;
  padding: 4px;
}

.AmqGBq_floating[data-view="settings"] {
  width: 660px;
  padding: 0;
}

.AmqGBq_floating[data-view="setup"]:not([data-collapsed]) {
  width: 420px;
}

.AmqGBq_floating:active {
  cursor: grabbing;
}

.AmqGBq_floating[data-whale-dock-phase="preview"] {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

.AmqGBq_floating [hidden] {
  display: none !important;
}

.AmqGBq_floating [data-no-drag] {
  cursor: auto;
  touch-action: pan-y;
}

.AmqGBq_panelViewport {
  overscroll-behavior: contain;
  min-width: 0;
  min-height: 0;
  overflow-x: hidden;
}

.AmqGBq_panelContent {
  min-width: 0;
  animation: AmqGBq_whaleEnter var(--whale-duration) var(--whale-ease);
}

.AmqGBq_mark {
  flex: none;
  width: 24px;
  height: 24px;
}

.AmqGBq_markSmall {
  flex: none;
  width: 20px;
  height: 20px;
}

.AmqGBq_brand, .AmqGBq_header, .AmqGBq_headerActions, .AmqGBq_actions, .AmqGBq_statusRow, .AmqGBq_caption {
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.AmqGBq_brand {
  font-size: 15px;
}

.AmqGBq_header {
  justify-content: space-between;
  margin-bottom: 12px;
}

.AmqGBq_headerActions {
  gap: 2px;
}

.AmqGBq_actions {
  flex-wrap: wrap;
}

.AmqGBq_iconButton {
  flex: none;
  width: 32px;
  min-width: 32px;
  height: 32px;
  padding: 0;
}

.AmqGBq_newChatButton {
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

.AmqGBq_newChatButton svg {
  width: 14px;
  height: 14px;
}

.AmqGBq_ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
}

.AmqGBq_statusRow {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  margin-bottom: 10px;
  padding: 4px 6px;
}

.AmqGBq_statusRow[data-recording] {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 19%,var(--dsw-alias-bg-module-platform));
}

.AmqGBq_statusRow[data-recording] .AmqGBq_voiceStatus > svg {
  color: var(--dsw-alias-brand-primary);
}

.AmqGBq_status {
  flex: 1;
  min-width: 0;
  margin: 0;
  font-size: 12px;
  line-height: 18px;
}

.AmqGBq_voiceTarget {
  flex: 1;
  align-items: center;
  gap: 4px;
  min-width: 0;
  line-height: 18px;
  display: flex;
}

.AmqGBq_voiceTarget > span, .AmqGBq_existingSessionHome > span {
  color: var(--dsw-alias-label-secondary);
  flex: none;
  font-size: 11px;
}

.AmqGBq_voiceTarget strong {
  font-size: 13px;
  font-weight: 600;
}

.AmqGBq_voiceStatus {
  align-items: center;
  gap: 4px;
  max-width: 47%;
  display: flex;
}

.AmqGBq_voiceStatus > svg {
  flex: none;
  width: 14px;
  height: 14px;
}

.AmqGBq_statusRow[data-bound] {
  flex-direction: column;
  align-items: stretch;
  gap: 0;
}

.AmqGBq_statusRow[data-bound] .AmqGBq_voiceStatus {
  max-width: 100%;
}

.AmqGBq_mainAction {
  width: 100%;
  min-height: 36px;
  font-weight: 500;
}

.AmqGBq_primary {
  color: var(--dsw-alias-label-primary) !important;
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 16%,var(--dsw-alias-bg-layer-2)) !important;
  border: 1px solid var(--dsw-alias-border-l2) !important;
}

.AmqGBq_bubble {
  corner-shape: round;
  cursor: grab;
  touch-action: none;
  width: 100%;
  max-width: 100%;
  height: 36px;
  animation: AmqGBq_whaleEnter var(--whale-duration) var(--whale-ease);
  border-radius: 999px;
  justify-content: flex-start;
  gap: 8px;
}

.AmqGBq_bubble .AmqGBq_ellipsis {
  text-align: left;
  flex: 1;
}

.AmqGBq_caption {
  text-align: left;
  justify-content: flex-start;
  width: 100%;
  margin-top: 8px;
  padding: 6px 0;
  font-size: 12px;
}

.AmqGBq_caption .AmqGBq_ellipsis {
  flex: 1;
}

.AmqGBq_openOriginal {
  flex: none;
}

.AmqGBq_hint, .AmqGBq_quickHint {
  color: var(--dsw-alias-label-secondary);
  overflow-wrap: anywhere;
  font-size: 12px;
}

.AmqGBq_hint {
  margin: 6px 0;
}

.AmqGBq_quickHint {
  margin: 0;
  font-size: 11px;
}

.AmqGBq_notice, .AmqGBq_note, .AmqGBq_error {
  border-radius: var(--dsw-radius-sm);
  overflow-wrap: anywhere;
  background: var(--dsw-alias-bg-module-platform);
  margin: 8px 0;
  padding: 8px 10px;
  font-size: 12px;
}

.AmqGBq_notice, .AmqGBq_note {
  border-left: 2px solid var(--dsw-alias-state-warn-primary);
}

.AmqGBq_error {
  border-left: 2px solid var(--dsw-alias-state-error-primary);
}

.AmqGBq_error button {
  margin-top: 8px;
}

.AmqGBq_popover {
  box-sizing: border-box;
  cursor: auto;
  touch-action: auto;
  width: 100%;
  animation: AmqGBq_whaleEnter var(--whale-duration) var(--whale-ease);
  margin: 0 0 10px;
  padding: 12px;
  position: relative;
  overflow: auto;
}

.AmqGBq_popoverHeader {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  display: flex;
}

.AmqGBq_popoverHeader > button {
  width: 28px;
  padding: 0;
}

.AmqGBq_quickConversation {
  max-height: 160px;
}

.AmqGBq_recentMessages {
  gap: 6px;
  display: grid;
}

.AmqGBq_message {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  padding: 5px 8px;
}

.AmqGBq_message strong {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

.AmqGBq_message p {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  margin: 3px 0 0;
}

.AmqGBq_quickActions {
  gap: 6px;
  min-width: 0;
  display: grid;
}

.AmqGBq_quickSpeed {
  gap: 5px;
  padding-top: 4px;
  display: grid;
}

.AmqGBq_quickSpeedHeader {
  color: var(--dsw-alias-label-secondary);
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  display: flex;
}

.AmqGBq_quickSpeedHeader small {
  font-size: 11px;
}

.AmqGBq_quickSegments {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  gap: 3px;
  padding: 3px;
  display: grid;
}

.AmqGBq_quickSegments button {
  min-width: 0;
  height: 28px;
  min-height: 28px;
  padding: 0 5px;
  font-size: 12px;
}

.AmqGBq_quickSegments button[aria-pressed="true"] {
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: 0 1px 3px #0001;
}

.AmqGBq_settings {
  height: 100%;
  min-height: 0;
  color: var(--dsw-alias-label-primary);
  flex-direction: column;
  display: flex;
  overflow: hidden;
}

.AmqGBq_settingsHeader {
  box-sizing: border-box;
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 4px 10px;
  display: flex;
}

.AmqGBq_settingsHeader h2 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.AmqGBq_settingsBrand {
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 6px;
  min-width: 0;
  display: flex;
}

.AmqGBq_backButton, .AmqGBq_guideButton {
  flex: none;
  padding: 0 8px;
  font-size: 12px;
}

.AmqGBq_backIcon {
  transform: rotate(180deg);
}

.AmqGBq_settingsLayout {
  flex: 1;
  grid-template-rows: minmax(0, 1fr);
  grid-template-columns: 104px minmax(0, 1fr);
  min-height: 0;
  display: grid;
  overflow: hidden;
}

.AmqGBq_settingsNav {
  border-right: 1px solid var(--dsw-alias-border-l2);
  background: var(--dsw-alias-bg-module-platform);
  flex-direction: column;
  gap: 3px;
  min-height: 0;
  padding: 8px 6px;
  display: flex;
  overflow-y: auto;
}

.AmqGBq_settingsNav button {
  justify-content: flex-start;
  min-width: 0;
  min-height: 34px;
  padding: 0 12px;
  font-size: 12px;
}

.AmqGBq_settingsNav button[aria-pressed="true"] {
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: inset 2px 0 0 var(--dsw-alias-brand-primary);
  font-weight: 600;
}

.AmqGBq_settingsPage {
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  display: flex;
  overflow: hidden;
}

.AmqGBq_pageHeading {
  flex: none;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 10px 12px 8px;
  display: flex;
}

.AmqGBq_pageHeading h3 {
  margin: 0;
  font-size: 15px;
}

.AmqGBq_pageHeading p {
  color: var(--dsw-alias-label-secondary);
  margin: 3px 0 0;
  font-size: 12px;
}

.AmqGBq_settingsBody {
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

.AmqGBq_settingsBody > .AmqGBq_section, .AmqGBq_settingsBody > div > .AmqGBq_section {
  margin: 0 0 12px;
}

.AmqGBq_section {
  align-content: start;
  gap: 8px;
  min-width: 0;
  display: grid;
}

.AmqGBq_section h3 {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
}

.AmqGBq_section p, .AmqGBq_section > .AmqGBq_section {
  margin: 0;
}

.AmqGBq_settingsBody > .AmqGBq_section + .AmqGBq_section {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

.AmqGBq_section summary {
  cursor: pointer;
  padding: 7px 0;
  font-size: 13px;
  font-weight: 500;
}

details.AmqGBq_section {
  border-top: 1px solid var(--dsw-alias-border-l2);
  display: block;
}

details.AmqGBq_section > :not(summary) {
  margin-top: 10px;
}

.AmqGBq_field {
  gap: 6px;
  font-size: 12px;
  display: grid;
}

.AmqGBq_field input {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}

.AmqGBq_deviceSelect {
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

.AmqGBq_radios {
  border: 0;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
  margin: 0;
  padding: 0;
  display: flex;
}

.AmqGBq_radios legend {
  margin-bottom: 6px;
  font-size: 12px;
}

.AmqGBq_radios label {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  cursor: pointer;
  align-items: center;
  gap: 6px;
  padding: 6px 9px;
  font-size: 12px;
  display: flex;
}

.AmqGBq_radios input {
  accent-color: var(--dsw-alias-brand-primary);
}

.AmqGBq_bindingEditor {
  gap: 14px;
  display: grid;
}

.AmqGBq_keyBinding {
  gap: 6px;
  display: grid;
}

.AmqGBq_keyBinding > :is(h3, p) {
  margin: 0;
}

.AmqGBq_keyBindingRow {
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 12px;
  min-width: 0;
  display: flex;
}

.AmqGBq_keyBindingRow > span {
  overflow-wrap: anywhere;
  min-width: 5em;
  font-size: 13px;
}

.AmqGBq_mouseBinding legend {
  font-size: 14px;
  font-weight: 600;
}

.AmqGBq_mouseBinding label {
  white-space: nowrap;
}

.AmqGBq_bindingActions {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

.AmqGBq_segmented {
  flex-wrap: wrap;
  gap: 4px;
  display: flex;
}

.AmqGBq_segmented button {
  min-width: 0;
  font-size: 12px;
}

.AmqGBq_segmented button[aria-pressed="true"], .AmqGBq_modelNav button[aria-pressed="true"] {
  background: var(--dsw-alias-interactive-bg-active);
  color: var(--dsw-alias-label-primary);
  box-shadow: inset 0 -2px 0 var(--dsw-alias-brand-primary);
}

.AmqGBq_modelNav {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  gap: 4px;
  margin-bottom: 12px;
  padding: 0 16px 10px;
  display: flex;
}

.AmqGBq_modelNav button {
  flex: 1;
  min-width: 0;
  padding: 0 6px;
  font-size: 12px;
}

.AmqGBq_sliderLabel {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  display: flex;
}

.AmqGBq_sliderLabel span {
  margin-left: auto;
}

.AmqGBq_sliderLabel input {
  width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
}

.AmqGBq_formActions {
  padding-top: 4px;
}

.AmqGBq_formActions button {
  min-width: 100px;
}

.AmqGBq_editNotice {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 8px;
  display: flex;
}

.AmqGBq_editNotice div {
  flex: 1;
  min-width: 0;
}

.AmqGBq_editNotice strong {
  font-size: 12px;
}

.AmqGBq_editNotice p {
  color: var(--dsw-alias-label-secondary);
  margin: 3px 0 0;
  font-size: 12px;
}

.AmqGBq_editNotice button {
  flex: none;
  font-size: 12px;
}

.AmqGBq_details {
  grid-template-columns: auto minmax(0, 1fr);
  gap: 6px 12px;
  margin: 0;
  font-size: 12px;
  display: grid;
}

.AmqGBq_details dt {
  color: var(--dsw-alias-label-secondary);
}

.AmqGBq_details dd {
  overflow-wrap: anywhere;
  margin: 0;
}

.AmqGBq_capabilityRow {
  display: contents;
}

.AmqGBq_requestDetails {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  max-height: 200px;
  padding: 8px;
  font-size: 11px;
  overflow: auto;
}

.AmqGBq_placeholder {
  text-align: center;
  min-height: 140px;
  color: var(--dsw-alias-label-secondary);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  display: flex;
}

.AmqGBq_placeholder h3, .AmqGBq_placeholder p {
  margin: 0;
}

.AmqGBq_placeholder svg {
  width: 32px;
  height: 32px;
}

.AmqGBq_motionPreview {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  width: 40px;
  height: 32px;
  animation: AmqGBq_whalePreview var(--whale-duration) var(--whale-ease);
  place-items: center;
  display: grid;
}

.AmqGBq_settings a {
  color: var(--dsw-alias-link);
  text-underline-offset: 2px;
  overflow-wrap: anywhere;
}

.AmqGBq_updateDialog {
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

.AmqGBq_updateDialog::backdrop {
  background: #0005;
}

.AmqGBq_updateHeader {
  align-items: center;
  gap: 8px;
  display: flex;
}

.AmqGBq_updateHeader h2 {
  margin: 0;
  font-size: 16px;
}

.AmqGBq_updateAnnouncement {
  white-space: pre-line;
  overflow-wrap: anywhere;
}

.AmqGBq_updateDialog .AmqGBq_actions {
  margin-top: 12px;
}

.AmqGBq_updateDialog a {
  color: var(--dsw-alias-link);
  text-underline-offset: 2px;
}

.AmqGBq_authorization {
  height: auto;
  max-height: min(var(--whale-content-limit, 60vh),var(--whale-visible-content, 60vh));
}

.AmqGBq_authorization .AmqGBq_settingsHeader {
  min-height: 42px;
  padding: 0 0 10px;
}

.AmqGBq_authorization .AmqGBq_settingsHeader h2 {
  flex: 1;
  font-size: 16px;
}

.AmqGBq_authorizationBody {
  overscroll-behavior: contain;
  flex: 1;
  min-height: 0;
  padding-right: 6px;
  overflow-y: auto;
}

.AmqGBq_authorizationActions {
  border-top: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  padding: 10px 0 0;
}

.AmqGBq_authorizationBody > [data-whale-natural-content] {
  display: flow-root;
}

.AmqGBq_permissionList {
  gap: 0;
  margin: 12px 0;
  padding: 0;
  list-style: none;
  display: grid;
}

.AmqGBq_permissionList li {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  padding: 10px 0;
}

.AmqGBq_permissionList p {
  margin: 3px 0 0;
}

.AmqGBq_permissionList strong {
  font-size: 13px;
}

.AmqGBq_sessionTitle {
  overflow-wrap: anywhere;
}

.AmqGBq_sessionRename {
  gap: 6px;
  margin-top: 8px;
  display: grid;
}

.AmqGBq_existingSessionHome {
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

.AmqGBq_existingSessionHome svg {
  flex: none;
  width: 12px;
  height: 12px;
}

.AmqGBq_existingSessionHome:disabled {
  opacity: 1;
  box-shadow: none;
  cursor: default;
}

.AmqGBq_existingSessionHome:disabled > svg {
  visibility: hidden;
}

.AmqGBq_currentDshTarget {
  gap: 4px;
  min-width: 0;
  display: grid;
}

.AmqGBq_currentDshAction {
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

.AmqGBq_currentDshAction > :first-child {
  white-space: nowrap;
  flex: none;
}

.AmqGBq_currentDshAction > :last-child {
  min-width: 0;
  color: var(--dsw-alias-label-secondary);
  text-align: right;
}

.AmqGBq_currentDshTarget > p {
  margin: 0;
}

.AmqGBq_inputCaptions {
  overscroll-behavior: contain;
  min-width: 0;
  max-height: 168px;
  margin: 0;
  padding: 0 6px;
  list-style: none;
  overflow: auto;
}

.AmqGBq_inputCaption {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 6px;
  padding: 4px 0;
  display: grid;
}

.AmqGBq_inputCaption + .AmqGBq_inputCaption {
  border-top: 1px solid var(--dsw-alias-border-l2);
}

.AmqGBq_inputCaption p {
  margin: 0;
}

.AmqGBq_inputCaptionText {
  overflow-wrap: anywhere;
  white-space: pre-wrap;
  user-select: text;
  font-size: 13px;
  line-height: 18px;
}

.AmqGBq_inputCaptionReceipt {
  color: var(--dsw-alias-label-secondary);
  align-items: baseline;
  gap: 4px;
  font-size: 11px;
  line-height: 16px;
  display: flex;
}

.AmqGBq_inputCaptionReceipt > :first-child {
  flex: none;
}

.AmqGBq_inputCaption button {
  height: 26px;
  min-height: 26px;
  padding: 0 6px;
  font-size: 12px;
}

.AmqGBq_existingSessionTarget > p {
  margin: 4px 0;
}

.AmqGBq_existingSessionPicker {
  gap: 8px;
  min-width: 0;
  margin-top: 10px;
  display: grid;
}

.AmqGBq_existingSessionSearch {
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 6px;
  display: grid;
}

.AmqGBq_existingSessionSearch input::placeholder {
  color: var(--dsw-alias-label-secondary);
  opacity: 1;
}

.AmqGBq_existingSessionList {
  max-height: clamp(96px, 26vh, 224px);
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: auto;
}

.AmqGBq_existingSessionList li {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
}

.AmqGBq_existingSessionList label {
  cursor: pointer;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: start;
  gap: 6px;
  padding: 6px 4px;
  display: grid;
}

.AmqGBq_existingSessionList label:has(input:disabled) {
  cursor: default;
}

.AmqGBq_existingSessionList label:has(input:checked) {
  background: var(--dsw-alias-interactive-bg-active);
}

.AmqGBq_existingSessionList input {
  accent-color: var(--dsw-alias-brand-primary);
  margin-top: 3px;
}

.AmqGBq_existingSessionList label span.AmqGBq_hint {
  overflow-wrap: anywhere;
  margin: 3px 0 0;
  display: block;
}

.AmqGBq_performanceChoice {
  line-height: 1.1;
}

.AmqGBq_performanceChoice small {
  white-space: nowrap;
  font-size: .85em;
}

.AmqGBq_floating [data-whale-setup] {
  min-height: 0;
}

.AmqGBq_floating :is(button, input, select, textarea, summary, a) {
  touch-action: manipulation;
}

.AmqGBq_floating button {
  transition: background-color .12s, color .12s;
}

.AmqGBq_floating :is(button, input, select, summary, a):focus-visible, .AmqGBq_floating:focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

.AmqGBq_spin {
  animation: .7s linear infinite AmqGBq_whaleSpin;
}

.AmqGBq_mark[data-state="authorized"], .AmqGBq_markSmall[data-state="authorized"] {
  color: var(--dsw-alias-brand-primary);
}

.AmqGBq_mark[data-state="unknown"], .AmqGBq_markSmall[data-state="unknown"] {
  color: var(--dsw-alias-state-warn-primary);
}

.AmqGBq_mark[data-state="input-active"], .AmqGBq_markSmall[data-state="input-active"] {
  color: var(--dsw-alias-brand-primary);
  animation: 1.35s ease-in-out infinite AmqGBq_whaleBreathe;
}

.AmqGBq_mark[data-state="pending"], .AmqGBq_markSmall[data-state="pending"] {
  color: var(--dsw-alias-label-secondary);
}

[data-motion="firm"].AmqGBq_floating {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="off"].AmqGBq_floating, [data-motion="off"].AmqGBq_floating * {
  transition: none !important;
  animation: none !important;
}

@keyframes AmqGBq_whaleEnter {
  from {
    opacity: .4;
    transform: translateY(3px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes AmqGBq_whalePreview {
  from {
    transform: scale(.88);
  }

  to {
    transform: scale(1);
  }
}

@keyframes AmqGBq_whaleSpin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes AmqGBq_whaleBreathe {
  0%, 100% {
    opacity: .65;
  }

  50% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .AmqGBq_floating, .AmqGBq_floating * {
    transition: none !important;
    animation: none !important;
  }
}

@media (width <= 520px), (height <= 560px) {
  .AmqGBq_settingsLayout {
    grid-template-rows: auto minmax(0, 1fr);
    grid-template-columns: minmax(0, 1fr);
  }

  .AmqGBq_settingsNav {
    border-right: 0;
    border-bottom: 1px solid var(--dsw-alias-border-l2);
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 2px;
    padding: 5px 8px;
    display: grid;
    overflow: hidden;
  }

  .AmqGBq_settingsNav button {
    justify-content: center;
    height: 30px;
    min-height: 30px;
    padding: 0 2px;
  }

  .AmqGBq_settingsNav button[aria-pressed="true"] {
    box-shadow: inset 0 -2px 0 var(--dsw-alias-brand-primary);
  }

  .AmqGBq_settingsHeader {
    gap: 3px;
    min-height: 44px;
    padding: 5px 8px;
  }

  .AmqGBq_backButton, .AmqGBq_guideButton {
    padding: 0 5px;
  }

  .AmqGBq_settingsBrand {
    gap: 4px;
  }

  .AmqGBq_settingsBrand .AmqGBq_markSmall {
    display: none;
  }

  .AmqGBq_pageHeading {
    padding: 10px 12px 8px;
  }

  .AmqGBq_pageHeading p {
    display: none;
  }

  .AmqGBq_settingsBody {
    padding: 4px 12px 12px;
  }

  .AmqGBq_modelNav {
    margin-bottom: 8px;
    padding: 0 10px 7px;
  }

  .AmqGBq_editNotice {
    flex-wrap: wrap;
  }

  .AmqGBq_editNotice button {
    width: 100%;
  }
}

@media (height <= 420px) {
  .AmqGBq_settingsHeader {
    height: 36px;
    min-height: 36px;
    padding: 2px 8px;
  }

  .AmqGBq_settingsHeader button {
    height: 30px;
    min-height: 30px;
  }

  .AmqGBq_settingsNav {
    padding: 2px 8px;
  }

  .AmqGBq_settingsNav button {
    height: 28px;
    min-height: 28px;
  }

  .AmqGBq_pageHeading {
    box-sizing: border-box;
    min-height: 32px;
    padding: 2px 12px;
  }

  .AmqGBq_pageHeading .AmqGBq_iconButton {
    width: 28px;
    min-width: 28px;
    height: 28px;
  }

  .AmqGBq_modelNav {
    margin-bottom: 4px;
    padding: 0 10px 3px;
  }

  .AmqGBq_modelNav button {
    height: 28px;
    min-height: 28px;
  }
}

@media (pointer: coarse) {
  .AmqGBq_field input, .AmqGBq_deviceSelect {
    font-size: 16px;
  }
}

@media (forced-colors: active) {
  .AmqGBq_floating, .AmqGBq_popover {
    outline: 1px solid canvastext;
  }

  .AmqGBq_settingsNav button[aria-pressed="true"], .AmqGBq_modelNav button[aria-pressed="true"] {
    outline: 2px solid highlight;
  }
}

.AmqGBq_floating[data-view="home"] .AmqGBq_panelViewport, .AmqGBq_floating[data-collapsed] .AmqGBq_panelViewport {
  overflow: hidden;
}

.AmqGBq_floating[data-view="home"]:not([data-collapsed]) {
  padding: 10px;
}

.AmqGBq_panelContent {
  flex-direction: column;
  gap: 4px;
  height: 100%;
  min-height: 0;
  display: flex;
}

.AmqGBq_panelContent > :not(.AmqGBq_quickConversation) {
  flex: none;
}

.AmqGBq_panelContent > .AmqGBq_homeTargetPicker {
  flex: 1 1 0;
  min-height: 0;
  padding: 2px;
  display: flex;
}

.AmqGBq_homeTargetPicker > .AmqGBq_existingSessionPicker {
  flex-direction: column;
  flex: 1;
  margin-top: 0;
  display: flex;
}

.AmqGBq_homeTargetPicker .AmqGBq_existingSessionList {
  overscroll-behavior: contain;
  flex: auto;
  min-height: 0;
  max-height: none;
}

.AmqGBq_homeTargetRow {
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

.AmqGBq_homeTargetRow:disabled {
  opacity: 1;
  cursor: default;
  color: var(--dsw-alias-label-secondary);
}

.AmqGBq_homeTargetRow .AmqGBq_hint {
  overflow-wrap: anywhere;
}

.AmqGBq_homeTargetPicker :is(.AmqGBq_existingSessionSearch, .AmqGBq_actions) {
  flex: none;
}

.AmqGBq_homeTargetPicker .AmqGBq_actions {
  margin-top: auto;
}

.AmqGBq_homeTargetPicker .AmqGBq_hint {
  margin: 0;
}

.AmqGBq_panelContent > .AmqGBq_header {
  height: 28px;
  min-height: 28px;
  margin: 0;
}

.AmqGBq_panelContent .AmqGBq_header .AmqGBq_iconButton {
  width: 28px;
  min-width: 28px;
  height: 28px;
}

.AmqGBq_panelContent > .AmqGBq_statusRow {
  box-sizing: border-box;
  min-height: 24px;
  margin: 0;
  padding: 2px 6px;
}

.AmqGBq_panelContent > .AmqGBq_hint {
  margin: 0;
  font-size: 12px;
  line-height: 18px;
}

.AmqGBq_panelContent > .AmqGBq_error {
  margin: 0;
  padding: 4px 8px;
  line-height: 18px;
}

.AmqGBq_panelContent .AmqGBq_quickSpeed {
  gap: 3px;
  padding-top: 0;
}

.AmqGBq_panelContent .AmqGBq_quickSpeedHeader {
  line-height: 18px;
}

.AmqGBq_panelContent .AmqGBq_quickHint {
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 16px;
  overflow: hidden;
}

.AmqGBq_panelContent .AmqGBq_quickHint p {
  text-overflow: ellipsis;
  margin: 0;
  line-height: 16px;
  overflow: hidden;
}

.AmqGBq_panelContent > .AmqGBq_caption {
  box-sizing: border-box;
  height: 30px;
  min-height: 30px;
  margin: 0;
  padding: 4px 8px;
  line-height: 18px;
}

.AmqGBq_panelContent > .AmqGBq_quickConversation {
  flex-direction: column;
  flex: 1 1 0;
  min-height: 0;
  max-height: none;
  margin: 0;
  padding: 8px;
  display: flex;
  overflow: hidden;
}

.AmqGBq_quickConversation .AmqGBq_popoverHeader {
  flex: none;
  min-height: 28px;
  margin-bottom: 6px;
}

.AmqGBq_quickConversation .AmqGBq_recentMessages {
  overscroll-behavior: contain;
  min-height: 0;
  overflow-y: auto;
}

.AmqGBq_floating[data-compact-height="true"] .AmqGBq_panelContent {
  gap: 2px;
}

.AmqGBq_floating[data-compact-height="true"] :is(.AmqGBq_voiceTarget, .AmqGBq_existingSessionHome) > span {
  font-size: 10px;
}

.AmqGBq_floating[data-compact-height="true"] .AmqGBq_voiceTarget strong {
  font-size: 12px;
}

.AmqGBq_floating[data-compact-height="true"] .AmqGBq_statusRow[data-bound] .AmqGBq_status {
  line-height: 16px;
}

.AmqGBq_floating[data-compact-height="true"] .AmqGBq_existingSessionHome {
  height: 20px;
  min-height: 20px;
}

.AmqGBq_floating[data-compact-height="true"] .AmqGBq_inputCaptions {
  max-height: max(42px,calc(var(--whale-content-limit) - 137px));
}

.AmqGBq_floating[data-compact-height="true"] [data-has-input-caption] > .AmqGBq_audioDevices, .AmqGBq_floating[data-compact-height="true"] .AmqGBq_panelContent:has(.AmqGBq_currentDshTarget) > :is(.AmqGBq_audioDevices, .AmqGBq_quickSpeed), .AmqGBq_floating[data-compact-height="true"] .AmqGBq_panelContent > .AmqGBq_hint:not([data-home-important]), .AmqGBq_floating[data-compact-height="true"] .AmqGBq_panelContent .AmqGBq_quickSpeedHeader, .AmqGBq_floating[data-compact-height="true"] .AmqGBq_panelContent .AmqGBq_quickHint {
  display: none;
}

.AmqGBq_floating[data-compact-height="true"] .AmqGBq_quickActions {
  grid-template-columns: minmax(65px, .9fr) minmax(0, 2.1fr);
  align-items: center;
  gap: 4px;
}

.AmqGBq_floating[data-compact-height="true"] .AmqGBq_quickActions .AmqGBq_mainAction {
  white-space: normal;
  height: 30px;
  min-height: 30px;
  padding-inline: 4px;
  font-size: 12px;
  line-height: 1.15;
}

.AmqGBq_floating[data-compact-height="true"] .AmqGBq_quickActions .AmqGBq_quickSegments {
  padding: 2px;
}

.AmqGBq_floating[data-compact-height="true"] .AmqGBq_quickActions .AmqGBq_quickSegments button {
  white-space: nowrap;
  padding-inline: 1px;
  font-size: 11px;
}

.AmqGBq_floating[data-compact-height="true"] .AmqGBq_panelContent[data-size-detail="true"] > .AmqGBq_quickSpeed {
  display: none;
}

.AmqGBq_settingsBody {
  container-type: inline-size;
}

.AmqGBq_section > button {
  justify-self: start;
  max-width: 100%;
}

.AmqGBq_settingsBody button {
  white-space: normal;
  overflow-wrap: anywhere;
  height: auto;
  min-height: 36px;
}

.AmqGBq_settingsBody :is(.AmqGBq_actions, .AmqGBq_segmented, .AmqGBq_formActions) > button {
  flex: 0 auto;
}

.AmqGBq_inlineActions, .AmqGBq_inlineField, .AmqGBq_volumeRow, .AmqGBq_volumeControl {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

.AmqGBq_inlineField {
  font-size: 12px;
}

.AmqGBq_inlineField .AmqGBq_deviceSelect {
  text-overflow: ellipsis;
  flex: 0 180px;
  width: 180px;
  max-width: 100%;
}

.AmqGBq_inlineField input[type="number"] {
  width: 80px;
}

.AmqGBq_fullName {
  color: var(--dsw-alias-label-secondary);
  min-width: 0;
  font-size: 12px;
}

.AmqGBq_fullName summary {
  padding: 2px 0;
  font-size: 12px;
  font-weight: 400;
}

.AmqGBq_fullName p {
  overflow-wrap: anywhere;
  margin-top: 4px;
}

.AmqGBq_disclosureRow {
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 8px;
  display: flex;
}

.AmqGBq_disclosureRow > details.AmqGBq_section {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  flex: 0 auto;
  min-width: 0;
  padding: 0 10px;
}

.AmqGBq_disclosureRow > details.AmqGBq_section > summary {
  min-height: 20px;
  padding: 7px 0;
}

.AmqGBq_disclosureRow > details[open].AmqGBq_section {
  flex: 100%;
  padding-bottom: 10px;
}

.AmqGBq_volumeControl {
  flex-wrap: nowrap;
  flex: 0 260px;
}

.AmqGBq_volumeControl input[type="range"] {
  width: 210px;
  min-width: 80px;
  max-width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
  flex: 210px;
}

.AmqGBq_volumeControl span {
  text-align: right;
  flex: none;
  min-width: 3em;
  font-size: 12px;
}

.AmqGBq_field:has( > input[type="number"]) {
  flex-wrap: wrap;
  align-items: center;
  display: flex;
}

.AmqGBq_field > input[type="number"] {
  width: 80px;
}

.AmqGBq_authorizationSteps {
  color: var(--dsw-alias-label-secondary);
  margin: 8px 0 12px;
  font-size: 12px;
}

.AmqGBq_agreement {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-module-platform);
  gap: 14px;
  padding: 14px;
  font-size: 13px;
  line-height: 1.6;
  display: grid;
}

.AmqGBq_agreement p {
  margin: 0;
}

.AmqGBq_authorizationBody h3 {
  margin: 0 0 10px;
  font-size: 15px;
}

.AmqGBq_authorizationActions button {
  flex: 0 auto;
  min-height: 36px;
}

@container (width <= 340px) {
  .AmqGBq_inlineActions {
    align-items: flex-start;
  }

  .AmqGBq_inlineField .AmqGBq_deviceSelect {
    flex-basis: 160px;
    width: 160px;
  }

  .AmqGBq_volumeControl {
    flex-basis: 200px;
  }

  .AmqGBq_volumeControl input[type="range"] {
    width: 150px;
  }
}

.AmqGBq_audioDevices {
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  display: flex;
}

.AmqGBq_audioDeviceGrid {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 8px;
  display: grid;
}

.AmqGBq_audioDeviceField {
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  font-size: 12px;
  display: flex;
}

.AmqGBq_audioDeviceField > span {
  align-items: center;
  gap: 4px;
  line-height: 18px;
  display: flex;
}

.AmqGBq_audioDeviceField svg {
  flex: none;
  width: 14px;
  height: 14px;
}

.AmqGBq_audioDeviceField select {
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

.AmqGBq_audioDeviceField select[data-device-missing] {
  border-color: #b80;
}

.AmqGBq_audioDeviceHint, .AmqGBq_audioDeviceNotice {
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  font-size: 11px;
  line-height: 16px;
  overflow: hidden;
}

.AmqGBq_audioDeviceHint {
  color: var(--dsw-alias-label-secondary);
}

.AmqGBq_audioDeviceNotice {
  color: #805500;
}

[data-ds-dark-theme] .AmqGBq_audioDeviceNotice {
  color: #ffd277;
}

[data-ds-dark-theme] .AmqGBq_audioDeviceField select {
  color-scheme: dark;
}

.AmqGBq_floating[data-compact-height="true"] .AmqGBq_audioDeviceField > span {
  font-size: 11px;
  line-height: 14px;
}

.AmqGBq_floating[data-compact-height="true"] .AmqGBq_audioDeviceField select {
  height: 26px;
}

.AmqGBq_floating[data-compact-height="true"] .AmqGBq_audioDeviceHint, .AmqGBq_floating[data-compact-height="true"] .AmqGBq_audioDeviceNotice, .AmqGBq_floating[data-compact-height="true"] .AmqGBq_panelContent:has( > [data-home-important]) .AmqGBq_audioDeviceField > span {
  display: none;
}

.AmqGBq_pageHeading.AmqGBq_modelHeading {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  justify-content: flex-start;
  gap: 10px;
  min-height: 40px;
  margin-bottom: 6px;
  padding: 5px 12px;
}

.AmqGBq_modelHeading h3 {
  white-space: nowrap;
  font-size: 13px;
}

.AmqGBq_modelHeading .AmqGBq_modelNav {
  border: 0;
  flex: 1;
  gap: 3px;
  min-width: 0;
  margin: 0;
  padding: 0;
}

.AmqGBq_modelHeading .AmqGBq_modelNav button {
  white-space: nowrap;
  flex: 0 auto;
  height: 28px;
  min-height: 28px;
  padding: 0 6px;
}

.AmqGBq_currentModel {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  display: flex;
}

.AmqGBq_pathRow {
  grid-template-columns: 95px minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  font-size: 12px;
  display: grid;
}

.AmqGBq_pathRow > span {
  min-width: 0;
}

.AmqGBq_editNotice {
  margin-bottom: 7px;
  padding: 5px 8px;
}

.AmqGBq_editNotice span {
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
}

.AmqGBq_editNotice button {
  height: auto;
  min-height: 30px;
}

@media (width <= 360px) {
  .AmqGBq_pageHeading.AmqGBq_modelHeading {
    gap: 5px;
    padding: 5px 8px;
  }

  .AmqGBq_modelHeading .AmqGBq_modelNav button {
    padding: 0 3px;
    font-size: 11px;
  }

  .AmqGBq_pathRow {
    grid-template-columns: minmax(0, 1fr);
    gap: 4px;
  }
}

.AmqGBq_pathRow {
  display: block;
}

.AmqGBq_pathRow > div:first-child {
  flex-wrap: nowrap !important;
}

.AmqGBq_pathRow > div:first-child > label {
  flex: 1;
  grid-template-columns: 95px minmax(0, 1fr);
  display: grid !important;
}

.AmqGBq_pathRow input {
  width: 100% !important;
}

.AmqGBq_pathRow button {
  flex: none;
  min-height: 32px;
}

@media (width <= 420px) {
  .AmqGBq_pathRow > div:first-child {
    flex-wrap: wrap !important;
  }

  .AmqGBq_pathRow > div:first-child > label {
    grid-template-columns: 80px minmax(0, 1fr);
    min-width: 180px !important;
  }
}

.AmqGBq_floating :is(button, select, input, textarea, summary, a), .AmqGBq_settings :is(button, select, input, summary, a) {
  transition: background-color .12s ease-out,border-color .12s ease-out,color .12s ease-out,box-shadow .12s ease-out,transform var(--whale-duration, .2s) var(--whale-ease, ease-out);
}

.AmqGBq_floating :is(button, summary):hover:not(:disabled) {
  background-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,var(--dsw-alias-bg-layer-1));
}

.AmqGBq_floating button:active:not(:disabled), .AmqGBq_settings button:active:not(:disabled) {
  transform: scale(.97);
}

.AmqGBq_floating :is(input, select, textarea):hover:not(:disabled) {
  border-color: var(--dsw-alias-brand-primary);
}

.AmqGBq_radios label {
  transition: background-color .12s, border-color .12s, box-shadow .12s;
}

.AmqGBq_radios label:has(input:checked) {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,transparent);
}

.AmqGBq_authorizationBody, .AmqGBq_settingsLayout, .AmqGBq_panelContent > .AmqGBq_header, .AmqGBq_settingsBody > div:not([hidden]), .AmqGBq_section > div:not([hidden])[data-whale-tab-panel], .AmqGBq_floating [role="tabpanel"]:not([hidden]) {
  animation: AmqGBq_whalePageEnter var(--whale-duration, .2s) ease-out;
}

.AmqGBq_floating :is([role="menu"], [role="listbox"]), .AmqGBq_floating [data-whale-dropdown] {
  transform-origin: top;
  animation: .12s ease-out AmqGBq_whalePageEnter;
}

.AmqGBq_floating [data-whale-save-result] {
  animation: .16s ease-out AmqGBq_whaleFeedback;
}

.AmqGBq_floating summary {
  list-style: none;
}

.AmqGBq_floating summary::-webkit-details-marker {
  display: none;
}

.AmqGBq_floating summary:before {
  content: "\u203A";
  width: 1em;
  transition: transform .16s ease-out;
  display: inline-block;
  transform: rotate(0);
}

.AmqGBq_floating details[open] > summary:before {
  transform: rotate(90deg);
}

.AmqGBq_floating details[open] > :not(summary) {
  animation: .16s ease-out AmqGBq_whalePageEnter;
}

@supports (interpolate-size: allow-keywords) {
  .AmqGBq_floating details {
    interpolate-size: allow-keywords;
  }

  .AmqGBq_floating details::details-content {
    block-size: 0;
    transition: block-size .16s ease-out,content-visibility .16s allow-discrete;
    overflow: clip;
  }

  .AmqGBq_floating details[open]::details-content {
    block-size: auto;
  }
}

@keyframes AmqGBq_whalePageEnter {
  from {
    translate: 0 4px;
  }

  to {
    translate: 0;
  }
}

@keyframes AmqGBq_whaleFeedback {
  from {
    opacity: .5;
  }

  to {
    opacity: 1;
  }
}

[data-motion="firm"].AmqGBq_floating, [data-motion="firm"].AmqGBq_settings {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="firm"].AmqGBq_floating details::details-content, [data-motion="firm"].AmqGBq_floating summary:before {
  transition-duration: .1s;
}

[data-motion="off"].AmqGBq_floating *, [data-motion="off"].AmqGBq_settings *, [data-motion="off"].AmqGBq_floating :before, [data-motion="off"].AmqGBq_floating details::details-content {
  transition: none !important;
  animation: none !important;
}

[data-motion="off"].AmqGBq_floating button:active, [data-motion="off"].AmqGBq_settings button:active {
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .AmqGBq_floating *, .AmqGBq_settings *, .AmqGBq_floating :before, .AmqGBq_floating details::details-content {
    transition: none !important;
    animation: none !important;
  }

  .AmqGBq_floating button:active, .AmqGBq_settings button:active {
    transform: none;
  }
}

.AmqGBq_conversationChoice {
  gap: 6px;
  min-width: 0;
  display: grid;
  position: relative;
}

.AmqGBq_conversationChoice > button {
  text-align: left;
  justify-content: space-between;
  width: 100%;
  min-width: 0;
}

.AmqGBq_conversationOptions {
  overscroll-behavior: contain;
  gap: 3px;
  min-width: 0;
  max-height: 220px;
  padding: 6px;
  animation: .12s ease-out AmqGBq_whalePageEnter;
  display: grid;
  overflow: auto;
}

.AmqGBq_conversationOptions [role="option"] {
  text-align: left;
  border-radius: var(--dsw-radius-sm);
  justify-content: space-between;
  width: 100%;
  min-width: 0;
  padding: 7px 10px;
  transition: background-color .12s ease-out, color .12s ease-out;
}

.AmqGBq_conversationOptions [role="option"][aria-selected="true"] {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 18%,var(--dsw-alias-bg-layer-1));
  font-weight: 600;
}

.AmqGBq_conversationOptions [role="option"]:is(:hover, :focus-visible) {
  background: var(--dsw-alias-interactive-bg-active);
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: -2px;
}

.AmqGBq_conversationOptions [role="option"] small {
  color: var(--dsw-alias-label-secondary);
}

.AmqGBq_settings [data-whale-tab-panel]:not([hidden]) {
  animation: AmqGBq_whalePageEnter var(--whale-duration, .2s) ease-out;
}

.AmqGBq_modelHeading .AmqGBq_modelNav {
  scrollbar-width: thin;
  overflow-x: auto;
}

.AmqGBq_modelHeading .AmqGBq_modelNav button {
  flex-shrink: 0;
}

[data-motion="off"].AmqGBq_settings [data-whale-tab-panel] {
  animation: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .AmqGBq_settings [data-whale-tab-panel] {
    animation: none !important;
  }
}

.AmqGBq_panelContent, .AmqGBq_bubble {
  animation: none;
}

.AmqGBq_panelContent {
  height: auto;
}

.AmqGBq_panelContent[data-size-detail="true"] {
  height: 100%;
}

.AmqGBq_panelContent .AmqGBq_quickSegments {
  background: none;
  gap: 6px;
  padding: 0;
}

.AmqGBq_panelContent .AmqGBq_quickSegments button {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 8px;
  gap: 4px;
  height: 34px;
  min-height: 34px;
}

.AmqGBq_panelContent .AmqGBq_quickSegments button[aria-pressed="true"] {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 22%,var(--dsw-alias-bg-layer-1));
  box-shadow: inset 0 0 0 1px var(--dsw-alias-brand-primary);
}

.AmqGBq_panelContent .AmqGBq_quickSegments svg {
  width: 15px;
  height: 15px;
}

.AmqGBq_panelContent > .AmqGBq_quickConversation {
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

.AmqGBq_conversationHeader {
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  flex: none;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  font-size: 12px;
  display: flex;
}

.AmqGBq_conversationHeader > div {
  align-items: center;
  gap: 2px;
  display: flex;
}

.AmqGBq_conversationHeader button:not(.AmqGBq_iconButton), .AmqGBq_assistantName, .AmqGBq_loadHistory {
  color: inherit;
  font: inherit;
  cursor: pointer;
  background: none;
  border: 0;
  border-radius: 4px;
  padding: 3px;
}

.AmqGBq_conversationHeader .AmqGBq_iconButton {
  width: 26px;
  min-width: 26px;
  height: 28px;
}

.AmqGBq_historyScope {
  color: var(--dsw-alias-label-secondary);
  flex: none;
  margin: 2px 0;
  font-size: 10px;
  line-height: 14px;
}

.AmqGBq_quickConversation .AmqGBq_recentMessages {
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

.AmqGBq_message {
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

.AmqGBq_message[data-role="user"] {
  align-self: flex-end;
  align-items: flex-end;
}

.AmqGBq_messageName {
  min-height: 19px;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  line-height: 17px;
}

.AmqGBq_assistantName {
  overflow-wrap: anywhere;
  max-width: 100%;
  min-height: 19px;
  padding: 0 2px;
  font-size: 11px;
  line-height: 17px;
}

.AmqGBq_assistantName:hover {
  color: var(--dsw-alias-label-primary);
  text-underline-offset: 3px;
  text-decoration: underline;
}

.AmqGBq_assistantNameInput {
  box-sizing: border-box;
  width: 140px;
  min-width: 60px;
  max-width: 160px;
  height: 23px !important;
  min-height: 23px !important;
  padding: 1px 5px !important;
  font-size: 12px !important;
}

.AmqGBq_message p {
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

.AmqGBq_message[data-role="user"] p {
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 28%,var(--dsw-alias-bg-layer-1));
  border-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 45%,var(--dsw-alias-border-l2));
}

.AmqGBq_message small {
  color: var(--dsw-alias-label-secondary);
  font-size: 10px;
}

.AmqGBq_loadHistory {
  align-self: center;
  padding: 5px;
  font-size: 11px;
}

.AmqGBq_newMessages {
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

.AmqGBq_bubble {
  gap: 6px;
  padding: 0 7px;
  font-size: 11px;
}

.AmqGBq_bubbleBrand {
  flex: none;
  font-size: 12px;
  font-weight: 600;
}

.AmqGBq_bubbleStatus {
  white-space: nowrap;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 3px;
  min-width: 0;
  display: flex;
}

.AmqGBq_bubbleStatus svg {
  flex: none;
  width: 15px;
  height: 15px;
}

.AmqGBq_bubble > svg:last-child {
  flex: none;
  width: 14px;
  height: 14px;
}

.AmqGBq_voiceBars {
  align-items: center;
  gap: 2px;
  height: 16px;
  display: flex;
}

.AmqGBq_voiceBars i {
  background: var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary));
  opacity: .5;
  border-radius: 1px;
  width: 3px;
  height: 13px;
  transform: scaleY(.31);
}

.AmqGBq_voiceBars[data-active="true"] i {
  background: var(--dsw-alias-brand-primary);
  opacity: 1;
  animation: .7s ease-in-out infinite alternate AmqGBq_whaleInputPulse;
}

.AmqGBq_voiceBars[data-active="true"] i:nth-child(2n) {
  animation-delay: -.3s;
}

.AmqGBq_voiceBars[data-active="true"] i:nth-child(3) {
  animation-delay: -.5s;
}

@keyframes AmqGBq_whaleInputPulse {
  from {
    transform: scaleY(.38);
  }

  to {
    transform: scaleY(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .AmqGBq_voiceBars[data-active="true"] i {
    animation: none;
    transform: scaleY(.69);
  }
}

.AmqGBq_floating[data-motion="off"] .AmqGBq_voiceBars[data-active="true"] i {
  animation: none;
  transform: scaleY(.69);
}

@media (forced-colors: active) {
  .AmqGBq_message p {
    border: 1px solid canvastext;
  }

  .AmqGBq_quickSegments button[aria-pressed="true"] {
    outline: 2px solid highlight;
  }

  .AmqGBq_voiceBars i {
    background: canvastext;
  }
}

.AmqGBq_voicePrompt {
  flex-direction: column;
  gap: 8px;
  display: flex;
}

.AmqGBq_voicePrompt label {
  font-size: 13px;
  font-weight: 600;
}

.AmqGBq_voicePrompt label span {
  margin-left: 10px;
  font-weight: 400;
}

.AmqGBq_voicePromptInput {
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

.AmqGBq_voicePromptInput::placeholder {
  color: var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary));
  opacity: 1;
}

.AmqGBq_voicePromptInput:disabled {
  opacity: .65;
  cursor: not-allowed;
}

.AmqGBq_voicePromptInput:focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: 2px;
}

.AmqGBq_voicePromptCount {
  text-align: right;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
}

.AmqGBq_voicePromptActions {
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  display: flex;
}

.AmqGBq_voicePromptActions .AmqGBq_actions {
  margin: 0;
}

.AmqGBq_voicePromptMode {
  color: var(--dsw-alias-state-success-primary, var(--dsw-alias-label-secondary));
  white-space: nowrap;
  font-size: 11px;
}

.AmqGBq_voicePromptMode:before {
  content: "\u2022";
  margin-right: 5px;
}
`};var le=require("react/jsx-runtime");function tt({small:e=!1,state:n="idle"}){return(0,le.jsx)("svg",{viewBox:"0 0 1024 1024","data-state":n,className:e?h.markSmall:h.mark,"aria-hidden":"true",children:(0,le.jsx)("path",{fill:"currentColor",d:"M 920.377 65.087 C 928.064 63.083 932.973 107.434 932.987 114.072 C 933.092 165.045 924.256 210.594 901.365 256.376 C 855.379 348.348 758.325 392.662 681.124 453.829 C 619.898 502.339 580.980 567.068 558.933 641.286 C 543.187 694.296 538.293 750.695 527.468 804.833 C 520.391 840.227 514.008 874.928 493.687 905.451 C 474.447 934.348 431.832 972.135 393.948 957.487 C 358.248 943.683 373.787 884.228 380.635 856.964 C 401.585 773.552 460.283 657.712 419.105 573.931 C 381.383 497.183 304.815 488.756 234.259 458.353 C 195.522 441.661 157.383 413.822 133.190 378.905 C 115.301 353.087 100.999 326.148 94.423 295.130 C 93.358 290.109 88.245 266.804 93.252 264.337 C 93.759 264.087 133.145 277.445 138.791 278.433 C 174.563 284.693 209.339 281.307 245.016 275.980 C 288.094 269.548 333.679 260.367 376.940 270.872 C 414.858 280.080 448.414 297.981 474.046 327.930 C 483.707 339.219 491.970 352.034 498.604 365.302 C 499.492 367.078 503.519 377.817 505.784 377.367 C 506.966 377.132 507.537 375.084 507.926 374.169 C 513.160 361.862 518.091 349.606 524.078 337.631 C 541.287 303.214 562.597 270.184 592.119 244.919 C 633.676 209.352 683.585 187.330 735.895 172.601 C 770.712 162.797 806.633 155.544 838.984 138.655 C 862.849 126.195 882.544 110.622 901.022 91.328 C 905.036 87.137 916.896 65.995 920.377 65.087 Z"})})}var gd=()=>({pet:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("path",{d:"M5 11c-2-8 4-10 7-8 5-2 9 2 7 8M5 10l4-4 3 3 3-3 4 4v5c0 4-3 6-7 6s-7-2-7-6v-5Z"}),(0,le.jsx)("path",{d:"M8 13v2m8-2v2m-6 3h4"})]}),settings:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("path",{d:"m9 3 1-1h4l1 1 .5 2 2 .8 2-.6 2 3-.8 1.8.2 2.2 1.3 1.5-2 3-2.1-.2-1.7 1.3-.5 2.2h-4l-.6-2.1-1.8-1.1-2 .3-2-3 1.3-1.7V10L4 8.5l2-3 2 .5L9 3Z"}),(0,le.jsx)("circle",{cx:"12",cy:"11.5",r:"3"})]}),minus:(0,le.jsx)("path",{d:"M5 12h14"}),plus:(0,le.jsx)("path",{d:"M12 5v14M5 12h14"}),down:(0,le.jsx)("path",{d:"m6 9 6 6 6-6"}),refresh:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("path",{d:"M20 6v5h-5M4 18v-5h5"}),(0,le.jsx)("path",{d:"M6 7a7 7 0 0 1 12-1l2 5M4 13l2 5a7 7 0 0 0 12-1"})]}),up:(0,le.jsx)("path",{d:"m6 15 6-6 6 6"}),check:(0,le.jsx)("path",{d:"m5 12 4 4L19 6"}),micOff:(0,le.jsx)(le.Fragment,{children:(0,le.jsx)("path",{d:"M9 9v3a3 3 0 0 0 5.1 2.1M15 8V6a3 3 0 0 0-5.7-1.3M6 10v2a6 6 0 0 0 10.2 4.3M18 12v-2M12 18v3M9 21h6M3 3l18 18"})}),mic:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("rect",{x:"9",y:"3",width:"6",height:"12",rx:"3"}),(0,le.jsx)("path",{d:"M6 10v2a6 6 0 0 0 12 0v-2M12 18v3M9 21h6"})]}),volume:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("path",{d:"M3 9h4l5-4v14l-5-4H3Z"}),(0,le.jsx)("path",{d:"M16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"})]}),chat:(0,le.jsx)("path",{d:"M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9l-5 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"}),close:(0,le.jsx)("path",{d:"m6 6 12 12M18 6 6 18"}),search:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("circle",{cx:"10",cy:"10",r:"6"}),(0,le.jsx)("path",{d:"m15 15 5 5"})]}),chevron:(0,le.jsx)("path",{d:"m9 5 7 7-7 7"}),warning:(0,le.jsxs)(le.Fragment,{children:[(0,le.jsx)("path",{d:"m12 3 10 18H2L12 3Z"}),(0,le.jsx)("path",{d:"M12 9v5m0 3v.2"})]})});function Ve({name:e,className:n=""}){return(0,le.jsx)("svg",{viewBox:"0 0 24 24",width:"18",height:"18","aria-hidden":"true",className:n,fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round",children:gd()[e]??gd().chat})}var Ce=require("react/jsx-runtime");function Nh({name:e,save:n,t}){let[o,i]=(0,Fe.useState)(!1),[r,s]=(0,Fe.useState)(e),a=(0,Fe.useRef)(!1),l=(0,Fe.useRef)(null),u=(0,Fe.useRef)(null),d=(0,Fe.useRef)(!1);(0,Fe.useLayoutEffect)(()=>{o?(l.current?.focus({preventScroll:!0}),l.current?.select()):d.current&&(d.current=!1,u.current?.focus({preventScroll:!0}))},[o]);let p=()=>{i(!1),s(e)},f=()=>{let m=r.trim();m&&m.length<=40&&(n?.(m),d.current=!0,i(!1))};return o?(0,Ce.jsx)(mr.Input,{ref:l,className:h.assistantNameInput,"aria-label":t("assistantName"),value:r,maxLength:40,"data-no-drag":!0,onChange:m=>s(m.target.value),onCompositionStart:()=>{a.current=!0},onCompositionEnd:()=>{a.current=!1},onBlur:p,onKeyDown:m=>{m.stopPropagation(),!(a.current||m.nativeEvent.isComposing)&&(m.key==="Escape"&&(m.preventDefault(),d.current=!0,p()),m.key==="Enter"&&(m.preventDefault(),f()))}}):(0,Ce.jsx)("button",{ref:u,type:"button",className:h.assistantName,"data-no-drag":!0,title:t("renameAssistant"),onClick:()=>{s(e),i(!0)},children:e})}function vd({conversation:e,history:n,historyLoading:t,historyError:o,historyRetryCursor:i,loadHistory:r,assistantName:s,setAssistantName:a,close:l,t:u}){let[d,p]=(0,Fe.useState)(!1),[f,m]=(0,Fe.useState)(0),b=(0,Fe.useRef)(null),g=(0,Fe.useRef)(!0),_=(0,Fe.useRef)(null),x=(0,Fe.useRef)(null),S=e.rootSessionId,Z=Yu(n?.rootSessionId===S?n.items:[],e.items),D=!g.current&&_.current?.firstId,G=D?Z.findIndex(k=>k.id===D):-1,N=d?Z:G>=0?Z.slice(G):Xu(Z),B=()=>{let k=b.current;if(!k)return;let z=k.getBoundingClientRect(),I=[...k.querySelectorAll("[data-message-id]")].find(A=>A.getBoundingClientRect().bottom>=z.top);x.current=I?{id:I.dataset.messageId,offset:I.getBoundingClientRect().top-z.top}:null},O=()=>{let k=b.current;k&&(k.scrollTop=k.scrollHeight),g.current=!0,m(0),B()},q=!d&&Z.filter(k=>k.role==="user").length<10&&!!n?.nextCursor;return(0,Fe.useEffect)(()=>{q&&!t&&!o&&r?.(n.nextCursor)},[q,n?.nextCursor,t,o,S]),(0,Fe.useLayoutEffect)(()=>{let k=b.current;if(!k)return;let z=_.current;if((!z||z.root!==S)&&(g.current=!0,m(0)),g.current)k.scrollTop=k.scrollHeight;else{let I=x.current,A=I&&[...k.querySelectorAll("[data-message-id]")].find(C=>C.dataset.messageId===I.id);if(A?k.scrollTop+=A.getBoundingClientRect().top-k.getBoundingClientRect().top-I.offset:z&&(k.scrollTop=Math.min(z.top,k.scrollHeight-k.clientHeight)),z){let C=e.items.filter(P=>P.at>=z.lastAt&&!z.ids.has(P.id)).length;C&&m(P=>P+C)}}_.current={root:S,firstId:N[0]?.id,top:k.scrollTop,lastAt:Math.max(0,...Z.map(I=>I.at)),ids:new Set(Z.map(I=>I.id))},B()},[e,n,d,f]),(0,Ce.jsxs)("section",{className:h.quickConversation,"data-dropdown":"conversation","data-no-drag":!0,role:"region","aria-label":u("recentConversation"),onKeyDown:k=>{k.key==="Escape"&&(k.stopPropagation(),l())},children:[(0,Ce.jsxs)("div",{className:h.conversationHeader,children:[(0,Ce.jsx)("strong",{children:u(d?"allRecords":"recentTenTurns")}),(0,Ce.jsxs)("div",{children:[(0,Ce.jsx)("button",{type:"button",onClick:()=>{d?(g.current=!0,x.current=null,_.current=null,m(0)):B(),p(k=>!k)},children:u(d?"collapseToTen":"showAllRecords")}),(0,Ce.jsx)(mr.Button,{className:h.iconButton,"aria-label":u("close"),title:u("collapseConversation"),onClick:l,children:(0,Ce.jsx)(Ve,{name:"up"})})]})]}),d&&(0,Ce.jsxs)("p",{className:h.historyScope,children:[u("currentVoiceRecords"),n?.truncated?" \xB7 "+u("historyTruncated"):""]}),(0,Ce.jsxs)("div",{ref:b,className:h.recentMessages,"data-conversation-messages":!0,tabIndex:0,"aria-label":u("conversationMessages"),onWheel:k=>{k.deltaY<0&&(g.current=!1)},onScroll:()=>{let k=b.current;g.current=ed(k),g.current&&m(0),_.current&&(_.current.top=k.scrollTop),B()},children:[d&&n?.nextCursor&&(0,Ce.jsx)("button",{className:h.loadHistory,disabled:t,onClick:()=>{B(),r?.(n.nextCursor)},children:u(t?"readingHistory":"loadEarlier")}),o&&(0,Ce.jsx)("button",{className:h.loadHistory,disabled:t,onClick:()=>{r?.(i??void 0)},children:u("retryHistory")}),N.map(k=>(0,Ce.jsxs)("div",{"data-message-id":k.id,"data-role":k.role,className:h.message,children:[(0,Ce.jsx)("div",{className:h.messageName,children:k.role==="user"?(0,Ce.jsx)("span",{children:u("you")}):(0,Ce.jsx)(Nh,{name:s,save:a,t:u})}),(0,Ce.jsx)("p",{children:k.text}),["speech-failed","interrupted"].includes(k.state)&&(0,Ce.jsx)("small",{children:u(k.state==="speech-failed"?"speechFailed":"speechInterrupted")})]},k.id)),!N.length&&(0,Ce.jsx)("p",{className:h.hint,children:u(t||q?"readingHistory":"noConversation")})]}),f>0&&(0,Ce.jsxs)("button",{className:h.newMessages,onClick:O,children:[(0,Ce.jsx)(Ve,{name:"down"}),f," ",u("newMessages")]})]})}var ot=require("react"),Et=require("@deepseek-ai/dsh-client-ui-primitives"),fn=require("react/jsx-runtime");function ho({label:e,value:n,onChange:t,kind:o,pickPath:i,sessionId:r,disabled:s,active:a=!0,scope:l,className:u,placeholder:d}){let[p,f]=(0,ot.useState)(!1),[m,b]=(0,ot.useState)(null),g=typeof n=="string"?n.split(/[\\/]/).filter(Boolean).at(-1)??n:"",_=(0,ot.useRef)(null),x=(0,ot.useRef)(null),S=()=>{_.current?.abort(),_.current=null,f(!1)};(0,ot.useEffect)(()=>(S(),b(null),S),[r,s,a,l,n]);let Z=async()=>{if(_.current||s||!a||!i)return;let D=new AbortController;_.current=D,f(!0),b(null);try{let G=await i(r,o,D.signal);_.current===D&&!D.signal.aborted&&!x.current?.closest("[hidden]")&&G!==null&&t(G)}catch(G){_.current===D&&!D.signal.aborted&&b(String(G?.message??G))}finally{_.current===D&&(_.current=null,f(!1))}};return(0,fn.jsxs)("div",{ref:x,className:u,"data-native-path":o,children:[(0,fn.jsxs)("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,minWidth:0},children:[(0,fn.jsxs)("label",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,minWidth:0},children:[e,(0,fn.jsx)(Et.Input,{"aria-label":e,title:n??"",value:g,placeholder:d,disabled:s,readOnly:!0,style:{width:190,maxWidth:"100%",minWidth:0,textOverflow:"ellipsis"}})]}),(0,fn.jsx)(Et.Button,{variant:"outline",disabled:s||!a||!i||p,onClick:()=>{Z()},children:p?"\u7B49\u5F85\u9009\u62E9\u2026":o==="referenceAudio"||o==="campplus"?"\u9009\u62E9\u6587\u4EF6\u2026":"\u9009\u62E9\u6587\u4EF6\u5939\u2026"})]}),o==="campplus"&&n&&(0,fn.jsx)(Et.Button,{variant:"outline",disabled:s,onClick:()=>{S(),t("")},children:"\u6E05\u9664\u53EF\u9009\u6A21\u578B"}),p&&(0,fn.jsx)(Et.Button,{variant:"outline",onClick:S,children:"\u53D6\u6D88\u9009\u62E9"}),n&&(0,fn.jsxs)("details",{style:{fontSize:12,minWidth:0},children:[(0,fn.jsx)("summary",{children:"\u67E5\u770B\u5B8C\u6574\u8DEF\u5F84"}),(0,fn.jsx)("p",{style:{margin:"4px 0",overflowWrap:"anywhere"},children:n})]}),m&&(0,fn.jsx)("p",{role:"alert",children:m})]})}var It=require("react");var tn=require("react/jsx-runtime"),go=e=>e&&typeof e=="object"?`${e.backend}:${e.id}`:e==null?"":"__legacy";function bd({state:e,sessionId:n,run:t,t:o}){let i=(0,It.useRef)({state:e,sessionId:n,run:t}),r=(0,It.useRef)(void 0);i.current={state:e,sessionId:n,run:t},(0,It.useEffect)(()=>{!e.settings||e.settingsFor!==n||e.busy||e.audioDevicesPending||r.current===n||(r.current=n,t(n,"read-audio-devices"))},[n,e.settingsFor,e.busy,e.audioDevicesPending]),(0,It.useEffect)(()=>{let f=!1,m,b=async()=>{let g=i.current;!f&&g.sessionId===n&&!g.state.busy&&!document.hidden&&(g.state.settingsFor!==n&&await g.run(n,"read-settings"),f||await g.run(n,"read-audio-devices")),f||(m=document.defaultView.setTimeout(b,1e4))};return b(),()=>{f=!0,document.defaultView.clearTimeout(m)}},[n]);let s=!!(e.settings&&e.settingsFor===n),a=s?e.settings:null,l=a?.audioDevices??{input:a?.values?.device??null,output:null},u=e.audioDevicesFor===n?e.audioDevices:null,d=e.checkedFor===n&&!e.uncertain&&e.status?.enabled===!1&&e.status?.ownerSessionId===null&&e.status?.voiceControlBusy===!1&&e.status?.voiceSession?.fullyStopped===!0&&e.status?.voiceSession?.id==null,p=[];return(0,tn.jsxs)("section",{className:h.audioDevices,"aria-label":o("audioDevices"),"data-audio-device-controls":!0,"data-no-drag":!0,children:[(0,tn.jsx)("div",{className:h.audioDeviceGrid,children:["input","output"].map(f=>{let m=l[f],b=u?.[f],g=go(m),_=b?.items?.some(G=>go(G)===g),x=m&&typeof m=="object"&&b&&b.status!=="unavailable"&&!_,S=m==null?o("audioSystemDefault"):typeof m=="object"?m.name:String(m),Z=f==="output"&&b?.reason==="AUDIO_PLATFORM_UNSUPPORTED",D=!s||e.busy||e.uncertain||e.settingsConflict||Z||f==="input"&&!d;return x&&p.push(o(f==="input"?"inputDeviceMissing":"outputDeviceMissing")),(0,tn.jsxs)("label",{className:h.audioDeviceField,children:[(0,tn.jsxs)("span",{children:[(0,tn.jsx)(Ve,{name:f==="input"?"mic":"volume"}),o(f==="input"?"audioInput":"audioOutput")]}),(0,tn.jsxs)("select",{"aria-label":o(f==="input"?"audioInput":"audioOutput"),"data-device-missing":x||void 0,title:D&&f==="input"&&!d?o("inputDeviceStopFirst"):Z?o("outputDeviceUnsupported"):S,disabled:D,value:g,onFocus:()=>{e.audioDevicesPending||t(n,"read-audio-devices")},onChange:G=>{let N=G.target.value;if(N==="__legacy"||N===g)return;let B=N===""?null:b?.items?.find(O=>go(O)===N);B!==void 0&&t(n,"save-audio-device",{revision:a.revision,direction:f,selection:B})},children:[(0,tn.jsx)("option",{value:"",children:o("audioSystemDefault")}),m!=null&&!_&&(0,tn.jsxs)("option",{value:g,children:[S,x?" \xB7 "+o("deviceDisconnected"):typeof m=="object"?"":" \xB7 "+o("deviceSaved")]}),b?.items?.map(G=>(0,tn.jsx)("option",{value:go(G),children:G.name},go(G)))]})]},f)})}),p.length>0?(0,tn.jsx)("p",{className:h.audioDeviceNotice,role:"status",children:p.join("\uFF1B")}):e.audioDevicesError||u?.input?.status==="unavailable"||u?.output?.status==="unavailable"&&u?.output?.reason!=="AUDIO_PLATFORM_UNSUPPORTED"?(0,tn.jsx)("p",{className:h.audioDeviceHint,role:"status",children:o("deviceListRetry")}):u?.output?.reason==="AUDIO_PLATFORM_UNSUPPORTED"?(0,tn.jsx)("p",{className:h.audioDeviceHint,children:o("outputDeviceUnsupported")}):!d&&s?(0,tn.jsx)("p",{className:h.audioDeviceHint,children:o("inputDeviceStopFirst")}):null]})}var Ge=require("react"),hn=require("@deepseek-ai/dsh-client-ui-primitives");var se=require("react/jsx-runtime"),Th={busy:"\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F",archived:"\u4F1A\u8BDD\u5DF2\u5F52\u6863",unavailable:"\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528"},ft=e=>e.title?.trim()||`\u672A\u547D\u540D\u4F1A\u8BDD \xB7 ${e.sessionId.slice(-6).toUpperCase()}`,fr=e=>Th[e.availability],Vn=e=>["ready","busy"].includes(e?.availability),hr=(e,n)=>e.checkedFor===n&&!e.uncertain&&!e.busy&&!e.ttsCancelling&&!e.existingSessionWritePending&&!e.existingSessionUnconfirmed&&e.status?.voiceControlBusy===!1&&e.status?.voiceSession?.fullyStopped===!0&&e.status?.enabled===!1;function yd({sessionId:e,boundSession:n,state:t,controlContext:o,listExistingVoiceSessions:i,setExistingVoiceSession:r,readState:s,run:a,t:l}){let[u,d]=(0,Ge.useState)(),[p,f]=(0,Ge.useState)(!1),[m,b]=(0,Ge.useState)(!1),g=(0,Ge.useRef)(null),_=(0,Ge.useId)(),x=n?.sessionId??null,S=e===x,Z=z=>hr(z,e)&&Object.hasOwn(z.status,"existingVoiceSession")&&(z.status.existingVoiceSession?.sessionId??null)===x,D=()=>o.currentConversation()===e&&o.sourceFor(e)===e;(0,Ge.useEffect)(()=>{let z=new AbortController;return g.current={signal:z.signal,choosing:!1},f(!1),i({sessionId:e},z.signal).then(I=>{z.signal.aborted||!D()||(d(I.items.find(A=>A.sessionId===e)??null),(I.binding?.sessionId??null)!==x&&a(e,"status"))}).catch(()=>{z.signal.aborted||d(null)}),()=>z.abort()},[e,x,o,i]);let G=async()=>{let z=g.current;if(!(!z||z.signal.aborted||z.choosing||!D())&&Z(s())){z.choosing=!0,f(!0),b(!1);try{if(S){await r({sessionId:null,expectedSessionId:x});return}let I=await i({sessionId:e},z.signal);if(z.signal.aborted||!D())return;let A=I.items.find(P=>P.sessionId===e),C=(I.binding?.sessionId??null)!==x;if(C||!Vn(A)){d(A??null),b(!0),C&&a(e,"status");return}if(!Z(s()))return;await r({sessionId:e,expectedSessionId:x})}catch{z.signal.aborted||b(!0)}finally{z.choosing=!1,z.signal.aborted||f(!1)}}},N=S?n:u,B=u===void 0&&!S,O=S||B||Vn(N);if(!O&&!m)return null;let q=l(S?"backToFishVoice":"chooseCurrentDshTarget"),k=B?l("checkingVoiceTarget"):N?ft(N):"";return(0,se.jsxs)("div",{className:h.currentDshTarget,"data-whale-current-target":!0,"data-no-drag":!0,children:[O&&(0,se.jsxs)(hn.Button,{variant:"outline",className:h.currentDshAction,"data-whale-operation":S?"unbind-existing-session":"bind-current-session","aria-label":q,"aria-busy":p||B,"aria-describedby":_,disabled:!Z(t)||p||B,onClick:()=>{G()},children:[(0,se.jsx)("span",{children:q}),(0,se.jsx)("span",{id:_,className:h.ellipsis,title:k,children:k})]}),m&&(0,se.jsx)("p",{role:"alert",className:h.hint,children:l("currentDshTargetError")})]})}function Ui({state:e,sessionId:n,listExistingVoiceSessions:t,setExistingVoiceSession:o,openExistingVoiceSession:i,showHome:r,homePickerId:s,closeHomePicker:a,t:l}){let[u,d]=(0,Ge.useState)(null),[p,f]=(0,Ge.useState)(!1),[m,b]=(0,Ge.useState)(""),[g,_]=(0,Ge.useState)(null),[x,S]=(0,Ge.useState)(!1),[Z,D]=(0,Ge.useState)(!1),[G,N]=(0,Ge.useState)(null),B=(0,Ge.useRef)(null),O=(0,Ge.useRef)(!1),q=(0,Ge.useId)(),k=!!s,z=k||p,I=e.status,A=Object.hasOwn(I??{},"existingVoiceSession")?I.existingVoiceSession:u?.binding,C=I?.existingVoiceSessionSupported!==!1,P=hr(e,n),L=e.existingSessionWritePending,U=u?.items.find(K=>K.sessionId===g),Q=P&&!x&&!!A,j=P&&C&&!x&&!Z&&!!u,me=(0,Ge.useCallback)(async(K="",re)=>{B.current?.abort();let de=new AbortController;B.current=de,S(!0),D(!1);try{let _e=await t({...K?{query:K}:{},...re?{cursor:re}:{}},de.signal);if(de.signal.aborted)return;d(wn=>({..._e,query:K,items:re&&wn?[...new Map([...wn.items,..._e.items].map(He=>[He.sessionId,He])).values()]:_e.items}))}catch{de.signal.aborted||D(!0)}finally{B.current===de&&(B.current=null,S(!1))}},[t]);(0,Ge.useEffect)(()=>(O.current=!0,C?me():S(!1),()=>{O.current=!1,B.current?.abort(),B.current=null}),[me,C]);let pe=K=>{K.preventDefault(),_(null),N(null),me(m.trim())},ne=async K=>{if(!(!(K===null?Q:j)||K===(A?.sessionId??null))){N(null);try{let{binding:re}=await o({sessionId:K,expectedSessionId:A?.sessionId??null});if(!O.current)return;if(k){a();return}d(de=>de&&{...de,binding:re}),f(!1),_(null),b(""),N({text:re?"\u5DF2\u7ED1\u5B9A\u3002\u70B9\u51FB\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u540E\u5373\u53EF\u7EE7\u7EED\u8BE5\u4F1A\u8BDD\u3002":"\u5DF2\u89E3\u9664\uFF0C\u4E0B\u4E00\u6B21\u5F00\u59CB\u5BF9\u8BDD\u5C06\u4F7F\u7528\u9C7C\u5E94\u4F1A\u8BDD\u3002"}),C&&me()}catch(re){if(!O.current)return;N({error:!0,text:typeof re?.message=="string"&&re.message?re.message.split(`
`)[0].slice(0,160):"\u4F1A\u8BDD\u7ED1\u5B9A\u672A\u786E\u8BA4\uFF0C\u8BF7\u6838\u5BF9\u5F53\u524D\u7ED1\u5B9A\u3002"}),_(null),C&&me(z?m.trim():"")}}},Y=(0,se.jsxs)(se.Fragment,{children:[x&&(0,se.jsx)("p",{role:"status",className:h.hint,children:l("loadingVoiceTargets")}),Z&&(0,se.jsxs)("div",{role:"alert",className:h.notice,children:[l("voiceTargetListError")," ",(0,se.jsx)(hn.Button,{variant:"outline",disabled:L,onClick:()=>{me(m.trim())},children:l("retryVoiceTargets")})]})]}),T=G&&(0,se.jsx)("p",{role:G.error?"alert":"status",className:G.error?h.notice:h.hint,children:G.text});return(0,se.jsxs)("section",{id:s,className:k?h.homeTargetPicker:h.section,"data-whale-existing-session":!0,"aria-label":k?l("chooseVoiceTarget"):void 0,"data-no-drag":k||void 0,children:[!k&&(0,se.jsxs)(se.Fragment,{children:[(0,se.jsx)("h3",{children:"\u8BED\u97F3\u5BF9\u8BDD\u76EE\u6807"}),(0,se.jsxs)("div",{className:h.existingSessionTarget,children:[(0,se.jsx)("strong",{className:h.sessionTitle,children:A?ft(A):"\u9C7C\u5E94\u4F1A\u8BDD"}),(0,se.jsx)("p",{className:h.hint,children:A?"\u8BED\u97F3\u548C\u56DE\u7B54\u5199\u5165\u6B64\u4F1A\u8BDD\uFF0C\u9C7C\u5E94\u4EC5\u5728\u672C\u673A\u64AD\u62A5\u3002\u5176\u4ED6\u63D2\u4EF6\u7684\u8F6C\u53D1\u7531\u5176\u8BBE\u7F6E\u51B3\u5B9A\u3002":"\u53EF\u7ED1\u5B9A\u5DF2\u6709 DSH \u4F1A\u8BDD\uFF0C\u6CBF\u7528\u539F\u6765\u7684\u4E0A\u4E0B\u6587\u548C\u5386\u53F2\u3002"}),A&&fr(A)&&(0,se.jsxs)("p",{role:"status",className:h.notice,children:[fr(A),"\u3002\u53EF\u89E3\u9664\u7ED1\u5B9A\u6216\u9009\u62E9\u5176\u4ED6\u4F1A\u8BDD\u3002"]}),!C&&(0,se.jsx)("p",{role:"status",className:h.notice,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u4E0D\u652F\u6301\u7ED1\u5B9A\u5DF2\u6709\u4F1A\u8BDD\u3002"}),I?.enabled&&(0,se.jsx)("p",{className:h.hint,children:"\u7ED3\u675F\u8BED\u97F3\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u7ED1\u5B9A\u3002"})]}),(0,se.jsxs)("div",{className:h.actions,children:[(0,se.jsx)(hn.Button,{variant:"outline","aria-expanded":z,disabled:!C||L,onClick:()=>{f(!z),_(null),b(""),z||me()},children:z?"\u5173\u95ED\u4F1A\u8BDD\u5217\u8868":A?"\u66F4\u6362\u7ED1\u5B9A":"\u9009\u62E9\u5DF2\u6709\u4F1A\u8BDD"}),Vn(A)&&i&&(0,se.jsx)(hn.Button,{variant:"outline","data-whale-operation":"open-native-session",onClick:async()=>{N(null);try{await i(A.sessionId),await r?.()}catch{O.current&&N({error:!0,text:"DSH \u6682\u65F6\u65E0\u6CD5\u6253\u5F00\u539F\u4F1A\u8BDD\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"})}},children:"\u6253\u5F00\u539F\u4F1A\u8BDD"}),A&&(0,se.jsx)(hn.Button,{variant:"outline","data-whale-operation":"unbind-existing-session",disabled:!Q,onClick:()=>{ne(null)},children:"\u89E3\u9664\u7ED1\u5B9A"})]})]}),z&&(0,se.jsxs)("div",{className:h.existingSessionPicker,"aria-busy":x,children:[(0,se.jsxs)("form",{className:h.existingSessionSearch,onSubmit:pe,children:[(0,se.jsx)(hn.Input,{type:"search","aria-label":l("searchVoiceTargets"),placeholder:l("searchVoiceTargets"),value:m,maxLength:128,disabled:L,onChange:K=>b(K.target.value)}),(0,se.jsx)(hn.Button,{type:"submit",variant:"outline",disabled:L,children:l("searchVoiceTargetsAction")})]}),u?.items.length>0&&(0,se.jsx)("ul",{className:h.existingSessionList,"aria-label":l("existingVoiceTargetList"),children:u.items.map(K=>{let re=A?.sessionId===K.sessionId,de=re||!Vn(K),_e=(0,se.jsxs)("span",{className:h.hint,children:[re?l("boundVoiceTarget")+" \xB7 ":"",l("voiceTargetAvailability_"+(K.unavailableReason??K.availability))," \xB7 ",K.sessionId]});return(0,se.jsx)("li",{children:k?(0,se.jsxs)(hn.Button,{variant:"ghost",className:h.homeTargetRow,"data-whale-operation":"bind-existing-session",title:K.sessionId,"aria-current":re||void 0,"aria-disabled":!j,disabled:de,onClick:()=>{ne(K.sessionId)},children:[(0,se.jsx)("strong",{className:h.sessionTitle,children:ft(K)}),_e]}):(0,se.jsxs)("label",{title:K.sessionId,children:[(0,se.jsx)("input",{type:"radio",name:q,value:K.sessionId,checked:g===K.sessionId,disabled:de||x||L,onChange:()=>{_(K.sessionId),N(null)}}),(0,se.jsxs)("span",{children:[(0,se.jsx)("strong",{className:h.sessionTitle,children:ft(K)}),_e]})]})},K.sessionId)})}),Y,!x&&!Z&&u?.items.length===0&&(0,se.jsx)("p",{role:"status",className:h.hint,children:l(u.query?"voiceTargetNoMatch":"voiceTargetEmptyList")}),U&&(0,se.jsx)("p",{id:q+"-tts",className:h.hint,children:l("voiceTargetSynthesisNotice")}),T,(!k||u?.nextCursor||A)&&(0,se.jsxs)("div",{className:h.actions,children:[!k&&(0,se.jsx)(hn.Button,{variant:"primary","data-whale-operation":"bind-existing-session","aria-describedby":U?q+"-tts":void 0,disabled:!j||!Vn(U)||U.sessionId===A?.sessionId,onClick:()=>{ne(g)},children:l(L?"savingVoiceTarget":"bindVoiceTarget")}),!!u?.nextCursor&&(0,se.jsx)(hn.Button,{variant:"outline",disabled:x||L,onClick:()=>{me(u.query,u.nextCursor)},children:l("moreVoiceTargets")}),k&&A&&(0,se.jsx)(hn.Button,{variant:"outline","data-whale-operation":"unbind-existing-session",disabled:!Q,onClick:()=>{ne(null)},children:l("backToFishVoice")})]})]}),!z&&(0,se.jsxs)(se.Fragment,{children:[Y,T]})]})}var Ot=require("react"),$t=require("@deepseek-ai/dsh-client-ui-primitives");var vr="dsh-fish-voice";var Li={name:"Emikosama",url:"https://github.com/Emikosama"};var _d="https://github.com/Emikosama/dsh-fish-voice",vo={url:"https://github.com/Emikosama/dsh-fish-voice/issues"};var Ae=require("react/jsx-runtime");function wd(e,n){let t=e.updates;return e.updatePending==="install"?n("update_installing"):e.updatePending==="check"?n("update_checking"):e.updatesUnavailable?n("updateConnection"):t?t.message||n("update_"+t.status):n("update_idle")}function xd({state:e,open:n,t}){let o=e.updates,i=!e.updatesUnavailable&&(o?.release||["restart-required","enable-required","installed"].includes(o?.status));return(0,Ae.jsxs)("section",{className:h.section,"data-whale-update-settings":!0,children:[(0,Ae.jsx)("h3",{children:t("updateTitle")}),o&&(0,Ae.jsxs)("p",{className:h.hint,children:[t("updateCurrentVersion")," ",o.currentVersion," \xB7 ",t("updateChannel_"+o.channel)]}),(0,Ae.jsx)("p",{children:wd(e,t)}),(0,Ae.jsxs)("div",{className:h.actions,children:[i&&(0,Ae.jsx)($t.Button,{variant:"outline",onClick:()=>n(!1),children:t("updateDetails")}),(0,Ae.jsx)($t.Button,{variant:"outline",disabled:!!e.updatePending||!e.updatesUnavailable&&o?.status==="installing",onClick:()=>n(!0),children:t("updateCheck")}),(0,Ae.jsx)("a",{href:vo.url,"data-whale-operation":"open-feedback",target:"_blank",rel:"noreferrer noopener",children:t("updateFeedback")})]})]})}function kd({state:e,close:n,run:t,t:o}){let i=(0,Ot.useRef)(null),r=(0,Ot.useId)();(0,Ot.useLayoutEffect)(()=>{let m=i.current;return typeof m.showModal=="function"?m.showModal():m.setAttribute("open",""),()=>{m.open&&m.close?.()}},[]);let s=e.updates,a=s?.release,l=!!e.updatePending||!e.updatesUnavailable&&["checking","installing"].includes(s?.status),u=!e.updatesUnavailable&&!l&&s?.canInstall&&a,d=!l&&(e.updatesUnavailable||!["restart-required","enable-required"].includes(s?.status)),p=!e.updatesUnavailable&&["available","incompatible"].includes(s?.status),f=u&&!s.message?null:wd(e,o);return(0,Ae.jsxs)("dialog",{ref:i,className:h.updateDialog,"data-whale-update-dialog":!0,"data-no-drag":!0,"aria-labelledby":r,onCancel:m=>{m.preventDefault(),n()},onKeyDown:m=>m.stopPropagation(),children:[(0,Ae.jsxs)("header",{className:h.updateHeader,children:[(0,Ae.jsx)(tt,{}),(0,Ae.jsx)("h2",{id:r,children:o(p?"updateOfferTitle":"updateTitle")})]}),s&&(0,Ae.jsxs)("p",{className:h.hint,children:[o("updateCurrentVersion")," ",s.currentVersion,a&&a.version!==s.currentVersion&&(0,Ae.jsxs)(Ae.Fragment,{children:[" \xB7 ",o("updateNewVersion")," ",a.version]})," \xB7 ",o("updateChannel_"+s.channel)]}),a?.announcement&&(0,Ae.jsx)("p",{className:h.updateAnnouncement,children:a.announcement}),f&&(0,Ae.jsx)("p",{className:h.hint,role:"status",children:f}),(0,Ae.jsxs)("div",{className:h.actions,children:[(0,Ae.jsx)($t.Button,{variant:"outline",onClick:n,children:o(p?"updateLater":"close")}),u&&(0,Ae.jsx)($t.Button,{variant:"primary",className:h.primary,onClick:()=>{t({action:"install",version:a.version})},children:o("updateInstall")}),!u&&d&&(0,Ae.jsx)($t.Button,{variant:"outline",onClick:()=>{t({action:"check"})},children:o("updateCheck")})]}),(0,Ae.jsxs)("footer",{className:h.actions,children:[a?.url?.startsWith("https://")&&(0,Ae.jsx)("a",{href:a.url,target:"_blank",rel:"noreferrer noopener",children:o("updateRelease")}),(0,Ae.jsx)("a",{href:vo.url,"data-whale-operation":"open-feedback",target:"_blank",rel:"noreferrer noopener",children:o("updateFeedback")})]})]})}var Eh=new Map([["audio","settings-audio"],["interaction","settings-interaction"],["prompt","settings-prompt"],["models","settings-models"],["advanced","settings-advanced"],["pets","settings-pets"],["sessions","page-session-management"]]);function Ih(e){if(e.nativeEvent?.isTrusted!==!0)return null;let n=e.target;if(!n?.closest)return null;let t=n.closest("[data-whale-operation-log]");return t&&!(e.type==="click"&&n.closest("summary")?.parentElement===t)?null:n}function Ad(e){let n=Ih(e);if(!n)return null;if(e.type==="submit")return"commit-form";if(e.type==="keydown")return e.key==="Escape"?"dismiss":["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key)&&n.closest('[data-settings-nav], [role="listbox"]')?"keyboard-navigation":null;if(e.type==="change")return n.matches('input[type="radio"]')&&["listen-mode-ptt","listen-mode-always","listen-mode-wake"].includes(n.dataset.whaleOperation)?n.dataset.whaleOperation:n.closest("[data-audio-device-controls] select")?"change-audio-device":n.matches('select, input[type="radio"], input[type="checkbox"]')?"edit-choice":null;if(e.type!=="click")return null;let t=n.closest("button, a[href], summary");if(!t||t.type==="submit"&&t.form)return null;let o=t.dataset.whaleOperation;return o==="open-feedback"&&t.matches("summary")&&t.parentElement.open?"dismiss":t.matches("summary")&&["session-history","subagent-history"].includes(o)?o+(t.parentElement.open?"-close":"-open"):o||(t.hasAttribute("data-settings-tab")?Eh.get(t.dataset.settingsTab)??"page-settings-tab":t.closest("[data-whale-session-management], [data-whale-existing-session]")?"manage-session":t.closest("[data-settings-page-heading] nav")?"page-model-tab":t.matches("summary")?"details-toggle":"activate-control")}var Hn=require("react"),Vi=require("@deepseek-ai/dsh-client-ui-primitives");var Je=require("react/jsx-runtime"),$h="fish-voice-operation-log.log",qd=256*1024,Oh=(e,n)=>(e+n).slice(-qd);function Sd({readOperationLog:e}){let[n,t]=(0,Hn.useState)(!1),[o,i]=(0,Hn.useState)(!1),[r,s]=(0,Hn.useState)(null),[a,l]=(0,Hn.useState)(null),u=(0,Hn.useRef)(null);if((0,Hn.useEffect)(()=>()=>u.current?.abort(),[]),!e)return null;let d=async f=>{if(u.current)return;let m=new AbortController;u.current=m,i(!0),l(null);try{let b=await e(m.signal);if(m.signal.aborted)return;if(f){let g=URL.createObjectURL(new Blob(b,{type:"text/plain;charset=utf-8"})),_=document.createElement("a");_.href=g,_.download=$h,Rh(_),setTimeout(()=>URL.revokeObjectURL(g),1e3),l("\u5DF2\u8BF7\u6C42\u4FDD\u5B58\u8BCA\u65AD\u65E5\u5FD7\u3002")}else s({text:b.reduce(Oh,""),shortened:b.reduce((g,_)=>g+_.length,0)>qd})}catch{m.signal.aborted||l("\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u8BCA\u65AD\u65E5\u5FD7\uFF0C\u8BF7\u91CD\u8BD5\u3002")}finally{u.current===m&&(u.current=null),m.signal.aborted||i(!1)}},p=f=>{let m=f.currentTarget.open;t(m),m||(u.current?.abort(),u.current=null,i(!1),s(null),l(null))};return(0,Je.jsxs)("details",{className:h.section,"data-whale-operation-log":!0,open:n,onToggle:p,children:[(0,Je.jsx)("summary",{"data-whale-operation":"open-feedback",children:"\u6392\u67E5\u4E0E\u53CD\u9988"}),n&&(0,Je.jsxs)(Je.Fragment,{children:[(0,Je.jsx)("p",{className:h.hint,children:"\u6700\u8FD1\u4E03\u5929\u7684\u64CD\u4F5C\u65E5\u5FD7\u3002\u53EF\u5148\u67E5\u770B\uFF0C\u518D\u81EA\u884C\u51B3\u5B9A\u662F\u5426\u968F\u53CD\u9988\u63D0\u4EA4\u3002"}),(0,Je.jsxs)("div",{className:h.actions,children:[(0,Je.jsx)(Vi.Button,{variant:"outline",disabled:o,onClick:()=>{d(!1)},children:"\u67E5\u770B\u8BCA\u65AD\u65E5\u5FD7"}),(0,Je.jsx)(Vi.Button,{variant:"outline",disabled:o,onClick:()=>{d(!0)},children:"\u4FDD\u5B58\u8BCA\u65AD\u65E5\u5FD7"}),(0,Je.jsx)("a",{href:vo.url+"/new",target:"_blank",rel:"noreferrer noopener",children:"\u63D0\u4EA4\u53CD\u9988"})]}),o&&(0,Je.jsx)("p",{role:"status",className:h.hint,children:"\u6B63\u5728\u8BFB\u53D6\u8BCA\u65AD\u65E5\u5FD7\u2026"}),a&&(0,Je.jsx)("p",{role:"status",className:h.hint,children:a}),r?.shortened&&(0,Je.jsx)("p",{className:h.hint,children:"\u8FD9\u91CC\u53EA\u663E\u793A\u6700\u8FD1\u4E00\u6BB5\uFF0C\u4FDD\u5B58\u53EF\u53D6\u5F97\u5B8C\u6574\u65E5\u5FD7\u3002"}),r&&(0,Je.jsx)("pre",{className:h.requestDetails,tabIndex:0,"aria-label":"\u64CD\u4F5C\u65E5\u5FD7\u9884\u89C8",children:r.text||"\u6682\u65E0\u64CD\u4F5C\u65E5\u5FD7\u3002"})]})]})}function Rh(e){document.body.append(e);try{e.click()}finally{e.remove()}}var R=require("react"),H=require("@deepseek-ai/dsh-client-ui-primitives");var ve=require("react"),he=require("@deepseek-ai/dsh-client-ui-primitives");var M={note:"_6gceQG_note",job:"_6gceQG_job",choices:"_6gceQG_choices",sourceChoices:"_6gceQG_sourceChoices",modelInstaller:"_6gceQG_modelInstaller",badge:"_6gceQG_badge",primary:"_6gceQG_primary",hardwareSummary:"_6gceQG_hardwareSummary",switchRow:"_6gceQG_switchRow",inlineField:"_6gceQG_inlineField",wizardBody:"_6gceQG_wizardBody",hint:"_6gceQG_hint",fullName:"_6gceQG_fullName",details:"_6gceQG_details",wizard:"_6gceQG_wizard",modelChoices:"_6gceQG_modelChoices",jobHeading:"_6gceQG_jobHeading",installPath:"_6gceQG_installPath",installHistory:"_6gceQG_installHistory",header:"_6gceQG_header",switcher:"_6gceQG_switcher",actions:"_6gceQG_actions",wizardBodyContent:"_6gceQG_wizardBodyContent",consentActions:"_6gceQG_consentActions",currentModel:"_6gceQG_currentModel",setupEnter:"_6gceQG_setupEnter",selectedModel:"_6gceQG_selectedModel",section:"_6gceQG_section",choice:"_6gceQG_choice",plan:"_6gceQG_plan",jobs:"_6gceQG_jobs",field:"_6gceQG_field",text:`._6gceQG_section {
  min-width: 0;
  color: var(--dsw-alias-label-primary);
  gap: 8px;
  display: grid;
}

._6gceQG_section h3, ._6gceQG_wizard h2, ._6gceQG_plan h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
}

._6gceQG_section p, ._6gceQG_wizard p {
  margin: 0;
  line-height: 1.6;
}

._6gceQG_hint, ._6gceQG_section small, ._6gceQG_wizard small {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 1.6;
}

._6gceQG_note {
  border-left: 2px solid var(--dsw-alias-state-warn-primary);
  background: var(--dsw-alias-bg-layer-2);
  padding: 8px 12px;
  font-size: 12px;
}

._6gceQG_actions, ._6gceQG_header {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  display: flex;
}

._6gceQG_header {
  justify-content: space-between;
  align-items: flex-start;
}

._6gceQG_choices {
  border: 0;
  gap: 8px;
  min-width: 0;
  margin: 0;
  padding: 0;
  display: grid;
}

._6gceQG_choices legend {
  color: var(--dsw-alias-label-secondary);
  padding: 0 0 8px;
  font-size: 12px;
}

._6gceQG_choice {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  cursor: pointer;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 10px;
  display: flex;
}

._6gceQG_choice[data-selected="true"] {
  border-color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,var(--dsw-alias-bg-layer-1));
}

._6gceQG_choice input {
  accent-color: var(--dsw-alias-brand-primary);
  margin: 4px 0 0;
}

._6gceQG_choice span {
  min-width: 0;
}

._6gceQG_choice small, ._6gceQG_plan small {
  overflow-wrap: anywhere;
  display: block;
}

._6gceQG_choice strong {
  font-size: 13px;
}

._6gceQG_field {
  gap: 6px;
  font-size: 12px;
  display: grid;
}

._6gceQG_field input, ._6gceQG_field select {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}

._6gceQG_field select {
  font: inherit;
  color: inherit;
  background: var(--dsw-alias-bg-layer-2);
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  padding: 8px;
}

._6gceQG_details {
  border-top: 1px solid var(--dsw-alias-border-l2);
  min-width: 0;
  padding-top: 12px;
}

._6gceQG_details summary {
  cursor: pointer;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

._6gceQG_details[open] > summary {
  margin-bottom: 12px;
}

._6gceQG_badge {
  border-radius: var(--dsw-radius-sm);
  color: var(--dsw-alias-label-primary);
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,var(--dsw-alias-bg-layer-1));
  margin-left: 8px;
  padding: 2px 6px;
  font-size: 11px;
}

._6gceQG_plan, ._6gceQG_job {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-md);
  gap: 10px;
  min-width: 0;
  padding: 12px;
  display: grid;
}

._6gceQG_plan dl {
  grid-template-columns: auto minmax(0, 1fr);
  gap: 6px 12px;
  margin: 0;
  font-size: 12px;
  display: grid;
}

._6gceQG_plan dt {
  color: var(--dsw-alias-label-secondary);
}

._6gceQG_plan dd {
  overflow-wrap: anywhere;
  margin: 0;
}

._6gceQG_plan a {
  color: var(--dsw-alias-link);
  overflow-wrap: anywhere;
  font-size: 12px;
}

._6gceQG_plan ul {
  margin: 0;
  padding-left: 16px;
  font-size: 12px;
}

._6gceQG_jobs {
  gap: 12px;
  display: grid;
}

._6gceQG_job progress {
  width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
}

._6gceQG_wizard {
  box-sizing: border-box;
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-layer-1);
  border-radius: var(--dsw-radius-lg);
}

._6gceQG_section button, ._6gceQG_wizard button {
  transition: transform var(--ds-transition-duration-fast, .1s) var(--whale-ease, ease-out);
}

._6gceQG_section button:active:not(:disabled), ._6gceQG_wizard button:active:not(:disabled) {
  transform: scale(.97);
}

._6gceQG_section :is(button, input, select, a, summary):focus-visible, ._6gceQG_wizard :is(button, summary):focus-visible {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
  outline-offset: 2px;
}

[data-motion="firm"] ._6gceQG_wizard {
  --whale-duration: var(--ds-transition-duration-fast, .1s);
  --whale-ease: ease-out;
}

[data-motion="off"] ._6gceQG_wizard, [data-motion="off"] ._6gceQG_wizard *, [data-motion="off"] ._6gceQG_section * {
  transition: none !important;
  animation: none !important;
  transform: none !important;
}

@keyframes _6gceQG_setupEnter {
  from {
    translate: 0 4px;
  }

  to {
    translate: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  ._6gceQG_wizard, ._6gceQG_wizard *, ._6gceQG_section * {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
}

@media (width <= 520px) {
  ._6gceQG_wizard {
    padding: 12px;
  }

  ._6gceQG_plan dl {
    grid-template-columns: minmax(0, 1fr);
    gap: 3px;
  }

  ._6gceQG_plan dd {
    margin-bottom: 6px;
  }
}

@media (forced-colors: active) {
  ._6gceQG_choice[data-selected="true"] {
    outline: 2px solid highlight;
  }
}

._6gceQG_wizard {
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

._6gceQG_wizard > ._6gceQG_header, ._6gceQG_wizard > footer {
  flex-shrink: 0;
}

._6gceQG_wizardBody {
  overscroll-behavior: contain;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

._6gceQG_wizardBodyContent {
  align-content: start;
  gap: 12px;
  display: grid;
}

._6gceQG_primary {
  color: var(--dsw-alias-label-primary) !important;
  background: color-mix(in srgb,var(--dsw-alias-brand-primary) 16%,var(--dsw-alias-bg-layer-2)) !important;
  border: 1px solid var(--dsw-alias-border-l2) !important;
}

._6gceQG_primary:disabled {
  opacity: .5;
}

._6gceQG_choices {
  gap: 6px;
}

._6gceQG_choice {
  box-sizing: border-box;
  align-items: center;
  min-height: 38px;
}

._6gceQG_choice input {
  flex: none;
  margin: 0;
}

._6gceQG_choice strong {
  display: block;
}

._6gceQG_choice:has(input:disabled) {
  cursor: default;
  opacity: .65;
}

._6gceQG_note p {
  margin: 0;
}

._6gceQG_note button {
  margin-top: 8px;
}

._6gceQG_wizard > footer {
  border-top: 1px solid var(--dsw-alias-border-l2);
  padding-top: 10px;
}

._6gceQG_wizardBody {
  padding: 2px 4px 8px 0;
}

._6gceQG_section > button, ._6gceQG_wizardBody > button {
  justify-self: start;
  max-width: 100%;
}

._6gceQG_section button, ._6gceQG_wizard button {
  white-space: normal;
  max-width: 100%;
  height: auto;
  min-height: 36px;
}

._6gceQG_actions > button {
  flex: 0 auto;
}

._6gceQG_sourceChoices {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

._6gceQG_sourceChoices legend {
  grid-column: 1 / -1;
}

._6gceQG_inlineField {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-width: 0;
  font-size: 12px;
  display: flex;
}

._6gceQG_inlineField select {
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

._6gceQG_inlineField input[type="number"] {
  width: 80px;
  min-width: 0;
}

._6gceQG_field:has( > input[type="number"]) {
  flex-wrap: wrap;
  align-items: center;
  display: flex;
}

._6gceQG_field > input[type="number"] {
  width: 80px;
}

._6gceQG_details > summary {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  box-sizing: content-box;
  width: fit-content;
  max-width: 100%;
  min-height: 20px;
  padding: 7px 10px;
}

._6gceQG_fullName {
  min-width: 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

._6gceQG_fullName summary {
  cursor: pointer;
}

._6gceQG_fullName p {
  overflow-wrap: anywhere;
}

._6gceQG_consentActions {
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  display: flex;
}

@container (width <= 360px) {
  ._6gceQG_sourceChoices {
    grid-template-columns: minmax(0, 1fr);
  }

  ._6gceQG_inlineField select {
    width: 150px;
  }
}

@media (width <= 420px) {
  ._6gceQG_wizard ._6gceQG_sourceChoices {
    grid-template-columns: minmax(0, 1fr);
  }
}

._6gceQG_modelChoices {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

._6gceQG_modelChoices > legend {
  grid-column: 1 / -1;
  padding-bottom: 5px;
}

._6gceQG_modelChoices ._6gceQG_choice {
  gap: 7px;
  min-height: 80px;
  padding: 8px;
}

._6gceQG_modelChoices ._6gceQG_choice strong {
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  display: flex;
}

._6gceQG_modelChoices ._6gceQG_badge {
  white-space: nowrap;
  margin-left: 0;
}

._6gceQG_hardwareSummary {
  color: var(--dsw-alias-label-secondary);
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 2px 10px;
  font-size: 11px;
  display: flex;
}

._6gceQG_hardwareSummary small {
  font-size: 10px;
}

._6gceQG_currentModel, ._6gceQG_switchRow, ._6gceQG_jobHeading {
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  min-width: 0;
  display: flex;
}

._6gceQG_currentModel {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  padding: 7px 8px;
  font-size: 12px;
}

._6gceQG_currentModel > span, ._6gceQG_switchRow > span {
  overflow-wrap: anywhere;
  min-width: 0;
}

._6gceQG_currentModel button, ._6gceQG_switchRow button {
  flex: none;
  min-height: 30px;
  padding: 0 9px;
}

._6gceQG_switcher {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-sm);
  gap: 7px;
  padding: 8px;
  display: grid;
}

._6gceQG_switchRow small {
  display: block;
}

._6gceQG_selectedModel {
  border-top: 1px solid var(--dsw-alias-border-l2);
  gap: 7px;
  padding-top: 6px;
  display: grid;
}

._6gceQG_selectedModel ._6gceQG_details {
  padding-top: 4px;
}

._6gceQG_selectedModel ._6gceQG_details summary {
  border: 0;
  padding: 3px 0;
}

._6gceQG_installHistory {
  border-top: 1px solid var(--dsw-alias-border-l2);
}

._6gceQG_installHistory > summary {
  cursor: pointer;
  padding: 8px 0;
  font-size: 12px;
  display: list-item;
}

._6gceQG_installHistory > summary small {
  margin-left: 12px;
}

._6gceQG_installHistory ._6gceQG_job {
  gap: 6px;
  padding: 9px;
}

._6gceQG_jobHeading {
  flex-wrap: wrap;
}

._6gceQG_installPath {
  min-width: 0;
  font-size: 11px;
}

._6gceQG_installPath summary {
  cursor: pointer;
  color: var(--dsw-alias-label-secondary);
}

._6gceQG_installPath p {
  overflow-wrap: anywhere;
}

._6gceQG_modelInstaller ._6gceQG_jobs:empty {
  display: none;
}

@container (width <= 300px) {
  ._6gceQG_modelChoices {
    grid-template-columns: minmax(0, 1fr);
  }

  ._6gceQG_currentModel {
    flex-wrap: wrap;
  }
}

._6gceQG_section[aria-label="\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84"] p {
  overflow-wrap: anywhere;
}

._6gceQG_choice {
  transition: background-color .12s ease-out, border-color .12s ease-out, box-shadow .12s ease-out;
}

._6gceQG_choice:hover:has(input:not(:disabled)) {
  border-color: var(--dsw-alias-brand-primary);
}

._6gceQG_choice:has(input:focus-visible) {
  outline: 2px solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary));
  outline-offset: 2px;
}

._6gceQG_section :is(button, select, input, summary), ._6gceQG_wizard :is(button, select, input, summary) {
  transition: background-color .12s ease-out,border-color .12s ease-out,color .12s ease-out,transform var(--whale-duration, .2s) var(--whale-ease, ease-out);
}

._6gceQG_section button:hover:not(:disabled), ._6gceQG_wizard button:hover:not(:disabled) {
  background-color: color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,var(--dsw-alias-bg-layer-1));
}

._6gceQG_plan, ._6gceQG_switcher, ._6gceQG_selectedModel, ._6gceQG_section [data-whale-save-result], ._6gceQG_wizardBodyContent > section {
  animation: _6gceQG_setupEnter var(--whale-duration, .2s) ease-out;
}

[data-motion="firm"] :is(._6gceQG_section, ._6gceQG_wizard) {
  --whale-duration: .1s;
  --whale-ease: ease-out;
}

[data-motion="off"] :is(._6gceQG_section, ._6gceQG_wizard), [data-motion="off"] :is(._6gceQG_section, ._6gceQG_wizard) *, [data-motion="off"] :is(._6gceQG_section, ._6gceQG_wizard) :before {
  transition: none !important;
  animation: none !important;
}

[data-motion="off"] :is(._6gceQG_section, ._6gceQG_wizard) button:active {
  transform: none !important;
}

@media (prefers-reduced-motion: reduce) {
  ._6gceQG_section, ._6gceQG_wizard, ._6gceQG_section *, ._6gceQG_wizard *, ._6gceQG_section :before, ._6gceQG_wizard :before {
    transition: none !important;
    animation: none !important;
  }

  ._6gceQG_section button:active, ._6gceQG_wizard button:active {
    transform: none !important;
  }
}
`};var v=require("react/jsx-runtime"),Cd=[["deepseek","DeepSeek \u8BED\u97F3\u5408\u6210","\u5B98\u65B9 API \xB7 \u9ED8\u8BA4\u97F3\u8272\u6D77\u661F"],["local","\u672C\u5730\u8BED\u97F3\u6A21\u578B","\u5728\u672C\u673A\u5408\u6210\uFF0C\u9996\u6B21\u9700\u8981\u4E0B\u8F7D"],["off","\u4E0D\u53D1\u58F0","\u53EA\u663E\u793A\u6587\u5B57"]],Bd={deepseek:"DeepSeek \u8BED\u97F3\u5408\u6210",local:"\u672C\u5730\u8BED\u97F3\u6A21\u578B"},br={provider:"deepseek",deepseekVoice:"stella",deepseekTextTransmissionAccepted:!1,volume:.8,localModelId:null,localModelPath:null,referenceAudioPath:null},Pd="\u8BF7\u5728 DSH \u7684 DeepSeek API Key \u63D0\u4F9B\u5546\u4E2D\u914D\u7F6E\u5F00\u653E\u5E73\u53F0\u5BC6\u94A5\uFF0C\u518D\u91CD\u65B0\u68C0\u67E5\u3002",Gd="\u6717\u8BFB\u548C\u8BD5\u542C\u4F1A\u5411 DeepSeek \u53D1\u9001\u5F85\u6717\u8BFB\u7684\u6587\u5B57\uFF0C\u6309\u5B57\u7B26\u7528\u91CF\u8BA1\u8D39\u3002",bo=e=>e.authorization?.scopes?.some(n=>n.id==="deepseek-text"&&n.allowed)===!0,Hi=e=>{let n={...e};return delete n.referenceAudioAccepted,n},Nd=(e,n)=>({...Hi(e),referenceAudioAccepted:e.referenceAudioPath===n?.referenceAudioPath&&n?.referenceAudioAccepted===!0}),Td=M.text,Dh=e=>({"restart-requires-resume":"\u5BBF\u4E3B\u5DF2\u91CD\u542F\uFF0C\u8BF7\u7EE7\u7EED\u540E\u91CD\u65B0\u6838\u9A8C\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u8986\u76D6\u8BBE\u7F6E\u3002","authorization-changed":"\u6388\u6743\u5DF2\u6539\u53D8\uFF0C\u8BF7\u5728\u6743\u9650\u4E2D\u6838\u67E5\u540E\u7EE7\u7EED\u3002",MODEL_SOURCE_AUTHORIZATION_REQUIRED:"\u6A21\u578B\u6765\u6E90\u6388\u6743\u5DF2\u53D8\u5316\uFF0C\u8BF7\u8865\u5145\u4E00\u6B21\u6388\u6743\u540E\u7EE7\u7EED\u3002",HUMAN_SETTING_PINNED:"\u8BBE\u7F6E\u6743\u9650\u5DF2\u64A4\u9500\uFF0C\u8BF7\u5728\u6743\u9650\u4E2D\u6838\u67E5\u540E\u7EE7\u7EED\u3002"})[e]??(typeof e=="string"&&/^[A-Z_:-]+$/.test(e)?"\u8FD0\u884C\u68C0\u67E5\u672A\u901A\u8FC7\uFF0C\u8BF7\u68C0\u67E5\u4F9D\u8D56\u6216\u67E5\u770B\u9AD8\u7EA7\u8BBE\u7F6E\u4E2D\u7684\u9519\u8BEF\u3002":e),_n=e=>Number.isFinite(e)&&e>=0?`${(e/1024**2).toFixed(1)} MiB`:"\u672A\u77E5",Mh={"live-root-conflict":{kind:"conflict",label:"voiceRecoveryPending",hint:"voiceRecoveryHint"},"predecessor-cleanup-pending":{kind:"cleanup",label:"voiceCleanupPending",hint:"voiceCleanupHint"},"helper-cleanup-pending":{kind:"cleanup",label:"voiceCleanupPending",hint:"voiceHelperCleanupHint"},"predecessor-stop-unconfirmed":{kind:"restart",label:"voiceRestartPending",hint:"voiceRestartHint"},"helper-stop-unconfirmed":{kind:"restart",label:"voiceRestartPending",hint:"voiceHelperRestartHint"},"root-stop-unconfirmed":{kind:"restart",label:"voiceRestartPending",hint:"voiceRootRestartHint"}};function _r(e,n){return e.checkedFor!==n?null:Mh[e.status?.voiceSession?.recovery?.kind]??null}var ji=e=>!e.ttsCancelling&&!e.voiceStopUnconfirmed&&(!e.busy||!!(e.interruptibleRead&&!e.diagnosticStopPending));function yo(e,n){let t=e.checkedFor===n?e.status:null;return!e.uncertain&&t?.enabled===!1&&t.ownerSessionId===null&&t.voiceControlBusy===!1&&t.voiceSession?.fullyStopped===!0&&t.voiceSession.id===null&&!_r(e,n)}function Ed(e,n){return!!(yo(e,n)&&e.settingsFor===n&&e.settings?.revision&&!e.ttsCancelling&&!e.ttsUncertain&&!e.visibilityUncertain&&!e.settingsConflict&&!e.status.ttsRuntime?.busy&&!e.status.ttsRuntime?.blocked)}function ht(e,n){return!e.busy&&Ed(e,n)}function Rt(e,n){let t=(0,ve.useRef)(!1),[o,i]=(0,ve.useState)(!1),[r,s]=(0,ve.useState)(null),[a,l]=(0,ve.useState)(0);return[async(d,p)=>{if(t.current)return!1;t.current=!0,i(!0),s(d);try{return await e(n,d,p)}catch{return!1}finally{t.current=!1,i(!1),s(null),l(f=>f+1)}},o,r,{isLocked:()=>t.current,settled:a}]}function wr({state:e,sessionId:n,run:t,refresh:o,canStopTts:i=!0,t:r=s=>s}){if(Ed(e,n))return null;let s=e.checkedFor===n?e.status:null,a=_r(e,n),l=e.settingsFor===n&&e.settings?.revision,u,d,p;e.voiceStopUnconfirmed?(u="\u505C\u6B62\u7ED3\u679C\u5C1A\u5F85\u786E\u8BA4\u3002",d=r("retryStatus"),p="status"):a?(u=r(a.hint),a.kind==="conflict"&&(d=r("voiceRecoveryCheck"),p="disable"),a.kind==="cleanup"&&(d=r("retryStatus"),p="status")):s?.enabled||s?.ownerSessionId?(u="\u8BF7\u5148\u505C\u6B62\u8BED\u97F3\uFF0C\u518D\u7F16\u8F91\u6216\u8BD5\u542C\u3002",d="\u505C\u6B62\u8BED\u97F3\u4EE5\u7F16\u8F91",p="disable"):e.settingsConflict?u="\u8BBE\u7F6E\u5DF2\u5728\u522B\u5904\u66F4\u65B0\u3002\u8BF7\u5148\u5904\u7406\u5F53\u524D\u8349\u7A3F\u3002":e.ttsCancelling||e.busy&&(!s||!l)?u="\u6B63\u5728\u8BFB\u53D6\u3001\u4FDD\u5B58\u6216\u505C\u6B62\u8BED\u97F3\uFF0C\u8BF7\u7A0D\u5019\u2026":s?.ttsRuntime?.blocked?u="\u6717\u8BFB\u505C\u6B62\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u91CD\u542F DSH\u3002":s?.ttsRuntime?.busy?(u="\u6717\u8BFB\u6B63\u5728\u8FDB\u884C\uFF0C\u7ED3\u675F\u540E\u53EF\u7F16\u8F91\u3002",i&&(d="\u505C\u6B62\u8BD5\u542C",p="cancel-tts")):e.ttsUncertain||e.uncertain||e.visibilityUncertain?(u="\u4E0A\u6B21\u64CD\u4F5C\u7684\u72B6\u6001\u5C1A\u5F85\u6838\u67E5\u3002",d=r("retryStatus"),p=e.visibilityUncertain||!s?"read-settings":"status"):!s||!l?(u=e.sourcePending&&!e.error?"\u6B63\u5728\u8BFB\u53D6\u8BED\u97F3\u72B6\u6001\u548C\u8BBE\u7F6E\u2026":"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u8BED\u97F3\u72B6\u6001\u6216\u8BBE\u7F6E\u3002",d="\u91CD\u65B0\u8BFB\u53D6",p=l?"status":"read-settings"):(u="\u8BED\u97F3\u5C1A\u672A\u786E\u8BA4\u505C\u6B62\u3002\u8BF7\u91CD\u65B0\u8BFB\u53D6\u72B6\u6001\u540E\u7F16\u8F91\u3002",d=r("retryStatus"),p="status");let f=()=>{p==="read-settings"&&o?o({settings:!0,force:!0}):t?.(n,p)};return(0,v.jsxs)("div",{className:M.note,role:"status","data-whale-settings-gate":a?.kind??p??"notice",children:[(0,v.jsx)("p",{children:u}),p&&t&&(0,v.jsx)(he.Button,{variant:"outline","data-whale-operation":p==="disable"?"stop-voice":void 0,disabled:p==="disable"?!ji(e):p!=="cancel-tts"&&e.busy,onClick:f,children:d})]})}function Id(e){let n=e.state.settingsFor===e.sessionId?e.state.settings:null;return(0,v.jsx)(Zh,{...e,settings:n},`${e.sessionId}:${e.state.settingsKey??n?.revision??"unread"}`)}function $d({value:e,disabled:n,onChange:t}){return(0,v.jsxs)("label",{className:M.inlineField,children:["DeepSeek \u97F3\u8272",(0,v.jsxs)("select",{"aria-label":"DeepSeek \u97F3\u8272",value:e,disabled:n,onChange:o=>t(o.target.value),children:[(0,v.jsx)("option",{value:"stella",children:"\u6D77\u661F \xB7 \u5973\u58F0"}),(0,v.jsx)("option",{value:"tide",children:"\u6697\u6F6E \xB7 \u7537\u58F0"})]})]})}function Zh({state:e,sessionId:n,run:t,settings:o,prepared:i=!1,active:r=!0,markSettingsEdited:s,pickPath:a}){let[l,u]=(0,ve.useState)(()=>({...br,...o?.ttsSetup})),[d,p,f]=Rt(t,n),m=(0,ve.useId)(),[b,g]=(0,ve.useState)(!1),_=e.ttsCapabilitiesFor===n?e.ttsCapabilities:null,x=e.checkedFor===n?e.status?.ttsRuntime:null,S=e.ttsPreviewFor===n?e.ttsPreview:null,Z=e.installerFor===n?e.installer?.jobs?.find(P=>xr(P,o)):null,D=!ht(e,n)||p,G=JSON.stringify(l)!==JSON.stringify({...br,...o?.ttsSetup}),N=l.provider==="deepseek",B=N&&(e.authorizationUncertain||l.deepseekTextTransmissionAccepted&&!e.authorization),O=N&&!B&&!(l.deepseekTextTransmissionAccepted&&bo(e)),q=N&&_?.deepseekKeyAvailable!==!0,k=P=>{s?.("save-tts"),u(L=>({...L,...P}))},z=l.localModelId==="qwen3-tts-base-1.7b-gguf",I=Number(l.volume),A=!q&&!B&&(l.provider!=="local"||!!(l.localModelId&&l.localModelPath)&&(!l.referenceAudioPath||z))&&l.volume!==""&&Number.isFinite(I)&&I>=0&&I<=1,C={...l,volume:I,deepseekTextTransmissionAccepted:N||l.deepseekTextTransmissionAccepted};return(0,v.jsxs)("section",{className:M.section,"aria-label":"\u6717\u8BFB\u8BBE\u7F6E","data-settings-draft":"save-tts",children:[(0,v.jsx)("header",{children:(0,v.jsx)("h3",{children:"\u56DE\u7B54\u600E\u4E48\u53D1\u58F0"})}),!i&&(0,v.jsx)(wr,{state:e,sessionId:n,run:t,canStopTts:!1}),!N&&(!i||!o||!_||e.uncertain||e.ttsUncertain)&&(0,v.jsx)("div",{className:M.actions,children:(0,v.jsx)(he.Button,{variant:"outline",disabled:e.busy||p,onClick:()=>d("inspect-tts"),children:"\u68C0\u6D4B\u672C\u673A\u8BED\u97F3"})}),(0,v.jsxs)("fieldset",{className:`${M.choices} ${M.sourceChoices}`,disabled:D||!o,children:[(0,v.jsx)("legend",{children:"\u6717\u8BFB\u6765\u6E90"}),Cd.map(([P,L,U])=>(0,v.jsxs)("label",{className:M.choice,"data-selected":l.provider===P,children:[(0,v.jsx)("input",{type:"radio",name:m,checked:l.provider===P,onChange:()=>k({provider:P})}),(0,v.jsxs)("span",{children:[(0,v.jsx)("strong",{children:L}),(0,v.jsx)("small",{children:U})]})]},P))]}),N&&(0,v.jsxs)("div",{className:M.section,children:[(0,v.jsx)("p",{className:M.hint,children:Gd}),B&&(0,v.jsx)("p",{role:"status",className:M.hint,children:"\u6B63\u5728\u8BFB\u53D6 DeepSeek \u6717\u8BFB\u6388\u6743\u2026"}),O&&(0,v.jsx)("p",{className:M.hint,children:"\u542F\u7528\u524D\uFF0C\u56DE\u7B54\u53EA\u663E\u793A\u6587\u5B57\u3002\u8BD5\u542C\u53EA\u53D1\u9001\u56FA\u5B9A\u793A\u4F8B\u3002"}),q&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("p",{role:"status",className:M.hint,children:Pd}),(0,v.jsx)(he.Button,{variant:"outline",disabled:e.busy||p,onClick:()=>d("inspect-tts"),children:_?"\u91CD\u65B0\u68C0\u67E5 DeepSeek API Key":"\u68C0\u67E5 DeepSeek API Key"})]}),(0,v.jsx)($d,{value:l.deepseekVoice,disabled:D,onChange:P=>k({deepseekVoice:P})})]}),l.provider==="local"&&(l.localModelId?(0,v.jsxs)("div",{className:M.section,children:[(0,v.jsxs)("div",{className:M.currentModel,children:[(0,v.jsxs)("span",{children:["\u5F53\u524D\u6717\u8BFB\u6A21\u578B ",(0,v.jsx)("strong",{children:l.localModelId.startsWith("qwen3")?"Qwen3-TTS":l.localModelId.includes("melo")?"MeloTTS":l.localModelId})]}),(0,v.jsx)(he.Button,{variant:"outline","aria-expanded":b,disabled:G,onClick:()=>g(P=>!P),children:"\u5207\u6362\u5F53\u524D\u6A21\u578B"})]}),b&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(Rd,{state:e,sessionId:n,run:t,purpose:"tts"}),(0,v.jsxs)("details",{className:M.details,children:[(0,v.jsx)("summary",{children:"\u5B89\u88C5\u5176\u4ED6\u6717\u8BFB\u6A21\u578B"}),(0,v.jsx)(yr,{pickPath:a,state:e,sessionId:n,run:t,active:r})]})]})]}):(0,v.jsx)(yr,{pickPath:a,state:e,sessionId:n,run:t,active:r})),l.provider==="local"&&!G&&Z?.modelId==="qwen3-tts-base-1.7b-gguf"&&(0,v.jsxs)("p",{className:M.hint,children:["\u5F53\u524D\u5B89\u88C5\u65B9\u6848\uFF1A",_o(Z.compute),"\u3002",Z.compute==="cpu"?"\u6B64\u5B89\u88C5\u53EA\u4F7F\u7528 CPU\u3002\u53EF\u5728\u201C\u5207\u6362\u5F53\u524D\u6A21\u578B \u2192 \u5B89\u88C5\u5176\u4ED6\u6717\u8BFB\u6A21\u578B\u201D\u9009\u62E9\u81EA\u52A8 GPU\uFF1B\u4E0B\u8F7D\u8FD0\u884C\u7EC4\u4EF6\u524D\u4ECD\u9700\u786E\u8BA4\u3002":"\u662F\u5426\u5B9E\u9645\u4F7F\u7528 GPU\uFF0C\u4EE5\u5B8C\u6210\u5408\u6210\u540E\u7684\u672C\u5730\u8BA1\u7B97\u72B6\u6001\u4E3A\u51C6\u3002"]}),(0,v.jsxs)("details",{className:M.details,children:[(0,v.jsx)("summary",{children:"\u97F3\u8272\u4E0E\u97F3\u91CF"}),(0,v.jsxs)("div",{className:M.section,children:[l.provider==="local"&&(z||l.referenceAudioPath)&&(0,v.jsxs)("div",{className:M.section,"data-reference-voice":!0,children:[(0,v.jsx)(ho,{className:M.field,label:"\u53C2\u8003\u97F3\u9891\uFF08WAV\uFF09",kind:"referenceAudio",value:l.referenceAudioPath,disabled:D||!z,active:r,scope:l.provider+":"+l.localModelId,pickPath:a,sessionId:n,placeholder:"\u8BF7\u70B9\u51FB\u9009\u62E9\u6587\u4EF6",onChange:P=>k({referenceAudioPath:P.trim()||null})}),l.referenceAudioPath&&(0,v.jsx)(he.Button,{variant:"outline",disabled:D,onClick:()=>k({referenceAudioPath:null}),children:"\u6E05\u9664\u53C2\u8003\u97F3\u8272"})]}),l.provider!=="local"&&l.referenceAudioPath&&(0,v.jsxs)("div",{className:M.section,children:[(0,v.jsx)("p",{className:M.hint,children:"\u672C\u5730\u53C2\u8003\u97F3\u8272\u5DF2\u4FDD\u7559\u3002"}),(0,v.jsx)(he.Button,{variant:"outline",disabled:D,onClick:()=>k({referenceAudioPath:null}),children:"\u6E05\u9664\u53C2\u8003\u97F3\u8272"})]}),(0,v.jsxs)("label",{className:M.inlineField,children:["\u6717\u8BFB\u97F3\u91CF",(0,v.jsx)(Ut,{"aria-label":"\u6717\u8BFB\u97F3\u91CF\u6ED1\u5757",min:"0",max:"1",step:"0.05",value:l.volume,disabled:D,onChange:P=>k({volume:Number(P.target.value)})}),(0,v.jsx)(he.Input,{type:"number",min:"0",max:"1",step:"0.05",value:l.volume,disabled:D,onChange:P=>k({volume:P.target.value})})]})]})]}),(0,v.jsxs)("div",{className:M.actions,children:[(0,v.jsx)(he.Button,{variant:"primary",className:M.primary,disabled:D||!o||!A||!(G||O),onClick:()=>d("save-tts",{revision:o.revision,values:Hi(C)}),children:p?"\u5904\u7406\u4E2D\u2026":O?"\u542F\u7528 DeepSeek \u6717\u8BFB":"\u4FDD\u5B58\u6717\u8BFB\u8BBE\u7F6E"}),(0,v.jsx)(he.Button,{variant:"outline",disabled:D||!o?.ttsSetup||!A||l.provider==="off",onClick:()=>d("preview-tts",G||O?{revision:o.revision,values:Nd(C,o.ttsSetup)}:void 0),children:O?"\u53D1\u9001\u793A\u4F8B\u5E76\u8BD5\u542C":G?"\u8BD5\u542C\u5F53\u524D\u9009\u62E9":"\u8BD5\u542C\u5DF2\u4FDD\u5B58\u914D\u7F6E"}),(0,v.jsx)(he.Button,{variant:"outline",disabled:!(x?.busy||x?.blocked||e.ttsUncertain||e.ttsCancelling||S?.status==="preparing"||f==="preview-tts"),onClick:()=>{t(n,"cancel-tts")},children:"\u505C\u6B62\u8BD5\u542C"})]}),S&&(0,v.jsxs)("p",{role:"status",className:M.hint,children:[{preparing:"\u8BD5\u542C\u51C6\u5907\u4E2D",cancelling:"\u6B63\u5728\u505C\u6B62\u8BD5\u542C",cancelled:"\u8BD5\u542C\u5DF2\u53D6\u6D88",idle:"\u8BD5\u542C\u5DF2\u505C\u6B62",completed:"\u8BD5\u542C\u5DF2\u7ED3\u675F",failed:S.detail??"\u8BD5\u542C\u5931\u8D25\uFF0C\u6B63\u5728\u6838\u67E5\u72B6\u6001",unconfirmed:"\u65E0\u6CD5\u786E\u8BA4\u8BD5\u542C\u505C\u6B62\uFF0C\u8BF7\u5B8C\u6574\u91CD\u542F\u5BBF\u4E3B"}[S.status]??S.status,Bd[S.provider]?` \xB7 ${Bd[S.provider]}`:""]}),x&&(0,v.jsxs)("p",{role:"status",className:M.hint,children:[x.blocked?"\u8BD5\u542C\u5C1A\u672A\u505C\u6B62\uFF0C\u8BF7\u91CD\u542F\u5BBF\u4E3B\u3002":`\u6717\u8BFB\u72B6\u6001\uFF1A${{idle:"\u7A7A\u95F2",preparing:"\u51C6\u5907\u4E2D",synthesizing:"\u5408\u6210\u4E2D","playback-requested":"\u5DF2\u8BF7\u6C42\u64AD\u653E","text-only":"\u5DF2\u663E\u793A\u6587\u5B57",completed:"\u8BD5\u542C\u5DF2\u7ED3\u675F",cancelled:"\u5DF2\u53D6\u6D88",failed:"\u5931\u8D25"}[x.state]??x.state}`,x.localComputeBackend?` \xB7 \u672C\u5730\u8BA1\u7B97\uFF1A${x.localComputeBackend.toUpperCase()}${x.localComputeVerified?"\uFF08\u5DF2\u5B8C\u6210\u5408\u6210\uFF09":"\uFF08\u5F85\u9A8C\u8BC1\uFF09"}`:"",x.localComputeFallback?" \xB7 \u5DF2\u56DE\u9000\u540C\u6A21\u578B CPU":""]}),x?.localTimings&&(0,v.jsxs)("details",{className:M.details,children:[(0,v.jsx)("summary",{children:"\u5DF2\u5B8C\u6210\u6717\u8BFB\u7247\u6BB5\u8017\u65F6"}),(0,v.jsxs)("p",{className:M.hint,children:["\u51C6\u5907 ",(x.localTimings.preparationMs/1e3).toFixed(2)," \u79D2 \xB7 \u8BBE\u5907\u9009\u62E9 ",(x.localTimings.deviceSelectionMs/1e3).toFixed(2)," \u79D2 \xB7 \u5408\u6210 ",(x.localTimings.synthesisMs/1e3).toFixed(2)," \u79D2 \xB7 \u64AD\u653E ",(x.localTimings.playbackMs/1e3).toFixed(2)," \u79D2"]}),(0,v.jsxs)("p",{className:M.hint,children:[x.localTimings.chunks," \u6BB5 \xB7 ",x.localTimings.modelResident?"\u4E0A\u6B21\u7247\u6BB5\u7ED3\u675F\u65F6\u6A21\u578B\u4ECD\u9A7B\u7559\uFF0C\u5B8C\u6574\u5408\u6210\u540E\u64AD\u653E\u3002\u51C6\u5907\u5305\u542B\u6587\u4EF6\u6821\u9A8C\uFF1B\u5408\u6210\u5305\u542B\u9996\u6B21\u52A0\u8F7D\u548C\u670D\u52A1\u54CD\u5E94\u3002":"\u5F53\u524D\u672C\u5730\u6A21\u578B\u9010\u6BB5\u542F\u52A8\uFF0C\u5B8C\u6574\u5408\u6210\u540E\u64AD\u653E\u3002\u51C6\u5907\u5305\u542B\u6587\u4EF6\u6821\u9A8C\uFF1B\u5408\u6210\u5305\u542B\u52A0\u8F7D\u4E0E\u5931\u8D25\u91CD\u8BD5\u3002","\u8017\u65F6\u4E0D\u662F\u9996\u97F3\u5EF6\u8FDF\u6216 GPU \u52A0\u901F\u6BD4\u3002"]})]})]})}function xr(e,n){if(e.status!=="installed"||!e.installedPath||!n)return!1;if(e.purpose==="tts"||e.recommendedSettings?.tts)return n.ttsSetup?.provider==="local"&&n.ttsSetup.localModelId===e.modelId&&n.ttsSetup.localModelPath===e.installedPath;let t=e.recommendedSettings;return!t||t.asr!==n.modelSetup?.asr?!1:Object.entries(t.models??{}).some(([o,i])=>i===e.installedPath&&n.modelSetup?.models?.[o]===i)}function Od(e,n){return(e?.models??[]).map(t=>{let o=(e.jobs??[]).filter(s=>s.modelId===t.id),i=o.filter(s=>s.status==="installed").sort((s,a)=>String(a.updatedAt??a.createdAt??"").localeCompare(String(s.updatedAt??s.createdAt??""))),r=i.find(s=>xr(s,n));return{model:t,jobs:o,installed:i,current:r,preferred:r??i[0],active:o.find(s=>["queued","running","paused","failed"].includes(s.status))}})}var kr=e=>(e?.title??e?.id??"").split(" \xB7 ")[0],_o=e=>({cpu:"CPU",auto:"\u81EA\u52A8 GPU",cuda:"CUDA / HIP",vulkan:"Vulkan"})[e]??e??"\u672A\u77E5",Qi=e=>{let n=new Date(e);return Number.isFinite(n.getTime())?n.toLocaleString():"\u65F6\u95F4\u672A\u77E5"};function Rd({state:e,sessionId:n,run:t,purpose:o}){let[i,r]=Rt(t,n),s=e.installerFor===n?e.installer:null,a=e.settingsFor===n?e.settings:null,l=Od(s,a).filter(d=>(!o||d.model.purpose===o)&&d.preferred),u=ht(e,n)&&!r&&!e.settingsDraftActions?.some(d=>["save-models","save-tts"].includes(d));return(0,v.jsxs)("section",{className:M.switcher,"aria-label":"\u5207\u6362\u5DF2\u5B89\u88C5\u6A21\u578B","data-no-settings-draft":!0,children:[s?l.length?l.map(({model:d,preferred:p,current:f})=>(0,v.jsxs)("div",{className:M.switchRow,children:[(0,v.jsxs)("span",{children:[(0,v.jsx)("strong",{children:kr(d)}),(0,v.jsxs)("small",{children:[d.purpose==="tts"?"\u6717\u8BFB":"\u8BC6\u522B"," \xB7 ",_o(p.compute),f?" \xB7 \u5F53\u524D\u914D\u7F6E":""]})]}),(0,v.jsxs)("div",{className:M.actions,children:[d.purpose==="tts"&&!f&&(0,v.jsx)(he.Button,{variant:"outline",disabled:!u||!p.installedPath,onClick:()=>i("preview-tts",{revision:a.revision,values:Nd({...a.ttsSetup,provider:"local",localModelId:d.id,localModelPath:p.installedPath,referenceAudioPath:null},a.ttsSetup)}),children:"\u5148\u8BD5\u542C"}),(0,v.jsx)(he.Button,{variant:"outline",disabled:!u||!!f,onClick:()=>i("apply-model-install",{id:p.id,revision:a.revision}),children:f?"\u5F53\u524D\u6A21\u578B":"\u9A8C\u8BC1\u5E76\u5207\u6362"})]})]},d.id)):(0,v.jsx)("p",{className:M.hint,children:"\u5C1A\u65E0\u53EF\u5207\u6362\u7684\u5DF2\u5B89\u88C5\u6A21\u578B\uFF0C\u8BF7\u5148\u5728\u6A21\u578B\u4E0B\u8F7D\u4E2D\u5B89\u88C5\u3002"}):(0,v.jsx)("p",{className:M.hint,children:"\u6B63\u5728\u8BFB\u53D6\u5DF2\u5B89\u88C5\u6A21\u578B\u3002"}),!!l.length&&!u&&(0,v.jsx)("p",{className:M.hint,children:"\u5207\u6362\u6A21\u578B\u524D\u9700\u505C\u6B62\u8BED\u97F3\uFF0C\u5DF2\u5B89\u88C5\u6587\u4EF6\u4E0D\u4F1A\u91CD\u65B0\u4E0B\u8F7D\u3002"})]})}function zd({job:e,snapshot:n,settings:t,disabled:o,writable:i,execute:r,history:s=!1}){let a=xr(e,t);return(0,v.jsxs)("article",{className:M.job,"data-model-job":e.id,children:[(0,v.jsxs)("div",{className:M.jobHeading,children:[(0,v.jsx)("strong",{children:kr(n.models.find(l=>l.id===e.modelId))||e.modelId}),(0,v.jsxs)("small",{children:[_o(e.compute)," \xB7 ",Qi(e.createdAt)]})]}),(0,v.jsxs)("p",{role:"status",children:[a?"\u5F53\u524D\u914D\u7F6E \xB7 ":"",{queued:"\u7B49\u5F85\u4E2D",running:"\u5904\u7406\u4E2D",paused:"\u5DF2\u6682\u505C",failed:"\u5931\u8D25",cancelled:"\u5DF2\u53D6\u6D88",installed:"\u5DF2\u5B89\u88C5\uFF0C\u5B57\u8282\u6821\u9A8C\u901A\u8FC7","checking-runtime":"\u68C0\u67E5\u8FD0\u884C\u4F9D\u8D56","verifying-local":"\u6821\u9A8C\u672C\u673A\u5DF2\u6709\u6A21\u578B",downloading:"\u4E0B\u8F7D\u4E2D",verifying:"\u6821\u9A8C\u6587\u4EF6",installing:"\u63D0\u4EA4\u5B89\u88C5"}[e.stage]??e.stage]}),!s&&Number.isFinite(e.totalBytes)&&e.totalBytes>0&&Number.isFinite(e.receivedBytes)&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("progress",{max:e.totalBytes,value:Math.min(e.receivedBytes,e.totalBytes),"aria-label":"\u4E0B\u8F7D\u5B57\u8282\u8FDB\u5EA6"}),(0,v.jsxs)("small",{children:["\u4E0B\u8F7D ",_n(e.receivedBytes)," / ",_n(e.totalBytes)]})]}),e.error&&(0,v.jsx)("p",{role:"alert",children:e.error.message}),s&&e.installedPath&&(0,v.jsxs)("details",{className:M.installPath,children:[(0,v.jsx)("summary",{children:"\u5B89\u88C5\u4F4D\u7F6E"}),(0,v.jsx)("p",{children:e.installedPath})]}),(0,v.jsxs)("div",{className:M.actions,children:[["queued","running"].includes(e.status)&&(0,v.jsx)(he.Button,{variant:"outline",disabled:o,onClick:()=>r("control-model-install",{id:e.id,operation:"pause"}),children:"\u6682\u505C\uFF0C\u4FDD\u7559\u8FDB\u5EA6"}),["paused","failed"].includes(e.status)&&(0,v.jsx)(he.Button,{variant:"outline",disabled:o,onClick:()=>r("control-model-install",{id:e.id,operation:"resume"}),children:"\u6062\u590D\u540C\u4E00\u6765\u6E90\u4E0B\u8F7D"}),["queued","running","paused","failed"].includes(e.status)&&(0,v.jsx)(he.Button,{variant:"outline",disabled:o,onClick:()=>r("control-model-install",{id:e.id,operation:"cancel"}),children:"\u53D6\u6D88\u5E76\u6E05\u9664\u6B64\u4EFB\u52A1\u4E34\u65F6\u6587\u4EF6"}),e.status==="installed"&&!a&&(0,v.jsx)(he.Button,{variant:"outline",disabled:!i,onClick:()=>r("apply-model-install",{id:e.id,revision:t.revision}),children:"\u9A8C\u8BC1\u5E76\u5207\u6362"})]}),e.status==="installed"&&(0,v.jsx)("small",{children:"\u5207\u6362\u524D\u8BF7\u7ED3\u675F\u5BF9\u8BDD\u3002\u4E0B\u6B21\u5F00\u59CB\u5BF9\u8BDD\u65F6\u4F7F\u7528\u65B0\u6A21\u578B\u3002"})]})}function Dd({state:e,sessionId:n,run:t}){let[o,i]=(0,ve.useState)(""),[r,s]=(0,ve.useState)("cpu"),[a,l]=(0,ve.useState)(!1),[u,d]=Rt(t,n),p=e.installerFor===n?e.installer:null,f=e.settingsFor===n?e.settings:null,m=Od(p,f).filter(B=>B.model.id!=="sensevoice-int8-2024-07-17"||B.active),b=m.find(B=>B.model.id===o),g=b?.model,_=e.installPlanFor===n&&e.installPlan?.modelId===o&&e.installPlan?.compute===r&&!e.installPlan?.sourceDirectory?e.installPlan:null,x=!!e.busy||e.uncertain||e.installerUncertain||d,S=!d&&ht(e,n)&&!e.settingsDraftActions?.some(B=>["save-models","save-tts"].includes(B)),Z=(0,ve.useId)(),D=(p?.jobs??[]).filter(B=>["installed","cancelled"].includes(B.status)).slice().reverse(),G=p?.hardware,N=p?.refresh?.observedAt??p?.compute?.observedAt;return(0,v.jsxs)("section",{className:`${M.section} ${M.modelInstaller}`,"aria-label":"\u6A21\u578B\u5B89\u88C5",children:[(0,v.jsxs)("div",{className:M.hardwareSummary,children:[(0,v.jsxs)("span",{children:["\u5185\u5B58 ",_n(G?.totalMemoryBytes)," \xB7 \u53EF\u7528 ",_n(G?.availableMemoryBytes)," \xB7 \u663E\u5B58 ",_n(G?.gpuMemoryBytes)]}),(0,v.jsxs)("small",{children:[N?"\u66F4\u65B0\u4E8E "+Qi(N):"\u7B49\u5F85\u68C0\u6D4B"," \xB7 \u6BCF 5 \u5206\u949F"]})]}),(p?.refresh?.error||e.modelComputeError)&&(0,v.jsxs)("p",{className:M.hint,role:"status",children:[p?.refresh?.error??"\u672C\u6B21\u786C\u4EF6\u68C0\u6D4B\u672A\u5B8C\u6210","\uFF1B\u4FDD\u7559\u4E0A\u6B21\u7ED3\u679C\u3002"]}),e.installerError&&(0,v.jsx)("p",{role:"alert",className:M.note,children:e.installerError}),e.installerUncertain&&(0,v.jsx)("p",{role:"status",className:M.note,children:"\u6B63\u5728\u6838\u67E5\u5B89\u88C5\u72B6\u6001\u3002"}),(0,v.jsxs)("div",{className:M.currentModel,children:[(0,v.jsxs)("span",{children:["\u8BC6\u522B ",(0,v.jsx)("strong",{children:"SenseVoice"})," \xB7 \u6717\u8BFB ",(0,v.jsx)("strong",{children:f?.ttsSetup?.provider==="local"?f.ttsSetup.localModelId?.startsWith("qwen3")?"Qwen3-TTS":f.ttsSetup.localModelId?.startsWith("vits-melo")?"MeloTTS":f.ttsSetup.localModelId??"\u672C\u5730\u6A21\u578B":f?.ttsSetup?.provider==="deepseek"?f.ttsSetup.deepseekTextTransmissionAccepted&&bo(e)?"DeepSeek":"DeepSeek \u5F85\u542F\u7528":{off:"\u4E0D\u53D1\u58F0"}[f?.ttsSetup?.provider]??"\u672A\u914D\u7F6E"})]}),(0,v.jsx)(he.Button,{variant:"outline","aria-expanded":a,onClick:()=>l(B=>!B),children:"\u5207\u6362\u5F53\u524D\u6A21\u578B"})]}),a&&(0,v.jsx)(Rd,{state:e,sessionId:n,run:t}),p?(0,v.jsxs)("fieldset",{className:`${M.choices} ${M.modelChoices}`,disabled:x,children:[(0,v.jsx)("legend",{children:"\u9009\u62E9\u6A21\u578B"}),m.map(({model:B,current:O,preferred:q,active:k})=>(0,v.jsxs)("label",{className:M.choice,"data-selected":o===B.id,children:[(0,v.jsx)("input",{type:"radio",name:Z,checked:o===B.id,onChange:()=>{i(B.id),s(B.computeOptions?.includes("auto")?"auto":"cpu")}}),(0,v.jsxs)("span",{children:[(0,v.jsxs)("strong",{children:[kr(B),B.recommendation?.recommended&&(0,v.jsx)("span",{className:M.badge,children:"\u63A8\u8350"})]}),(0,v.jsxs)("small",{children:[B.purpose==="tts"?"\u6717\u8BFB":"\u8BC6\u522B"," \xB7 ",_n(B.totalBytes)]}),(0,v.jsx)("small",{children:O?"\u5F53\u524D\u914D\u7F6E":k?{queued:"\u7B49\u5F85\u4E0B\u8F7D",running:"\u4E0B\u8F7D\u5904\u7406\u4E2D",paused:"\u4E0B\u8F7D\u5DF2\u6682\u505C",failed:"\u4E0B\u8F7D\u5931\u8D25"}[k.status]:q?"\u5DF2\u5B89\u88C5\uFF0C\u53EF\u5207\u6362":B.available?"\u53EF\u51C6\u5907\u5B89\u88C5":"\u6682\u4E0D\u53EF\u5B89\u88C5"}),!B.available&&(0,v.jsx)("small",{children:B.reason??B.recommendation?.reason})]})]},B.id))]}):(0,v.jsx)("p",{className:M.note,children:"\u6B63\u5728\u8BFB\u53D6\u6A21\u578B\u5217\u8868\u3002"}),g&&(0,v.jsxs)("div",{className:M.selectedModel,children:[(0,v.jsxs)("label",{className:M.inlineField,children:["\u63A8\u7406\u8BBE\u5907",(0,v.jsx)("select",{value:r,disabled:x,onChange:B=>s(B.target.value),children:(g.computeOptions??["cpu"]).map(B=>(0,v.jsxs)("option",{value:B,children:[_o(B),B==="cpu"?"":" \xB7 CPU \u515C\u5E95"]},B))})]}),(0,v.jsxs)("div",{className:M.actions,children:[b.preferred&&(0,v.jsx)(he.Button,{variant:"outline",disabled:!S||!!b.current,onClick:()=>u("apply-model-install",{id:b.preferred.id,revision:f.revision}),children:b.current?"\u5F53\u524D\u6A21\u578B":"\u9A8C\u8BC1\u5E76\u5207\u6362"}),(0,v.jsx)(he.Button,{variant:"outline",disabled:x||!g.available,onClick:()=>u("plan-model-install",{modelId:o,compute:r}),children:b.preferred?"\u67E5\u770B\u5176\u4ED6\u5B89\u88C5\u65B9\u6848":"\u67E5\u770B\u5B89\u88C5\u8BA1\u5212"})]}),(0,v.jsxs)("details",{className:M.details,children:[(0,v.jsx)("summary",{children:"\u63A8\u8350\u4F9D\u636E\u4E0E\u8BBE\u5907\u8BF4\u660E"}),(0,v.jsx)("p",{className:M.hint,children:g.recommendation?.reason??"\u63A8\u8350\u4F9D\u636E\u672A\u77E5\uFF0C\u53EF\u624B\u52A8\u9009\u62E9\u3002"}),(0,v.jsx)("p",{className:M.hint,children:g.purpose==="tts"?r==="cpu"?"\u4EC5\u51C6\u5907 CPU \u8FD0\u884C\u65F6\u3002":"\u51C6\u5907\u56FA\u5B9A Vulkan \u4E0E CPU \u7EC4\u4EF6\uFF0C\u5B9E\u9645\u53EF\u7528\u6027\u4ECD\u9700\u672C\u673A\u5408\u6210\u9A8C\u8BC1\u3002":"\u6B64\u6A21\u578B\u4F7F\u7528 CPU\u3002"})]})]}),_&&(0,v.jsxs)(he.MenuSurface,{className:M.plan,"aria-label":"\u6A21\u578B\u5B89\u88C5\u8BA1\u5212",children:[(0,v.jsx)("h4",{children:"\u6A21\u578B\u5B89\u88C5"}),(0,v.jsxs)("dl",{children:[(0,v.jsx)("dt",{children:"\u6A21\u578B"}),(0,v.jsx)("dd",{children:g?.title??_.modelId}),(0,v.jsx)("dt",{children:"\u6765\u6E90"}),(0,v.jsx)("dd",{children:_.source}),(0,v.jsx)("dt",{children:"\u4E0B\u8F7D\u5927\u5C0F"}),(0,v.jsx)("dd",{children:_n(_.totalBytes)}),(0,v.jsx)("dt",{children:"\u4FDD\u5B58\u4F4D\u7F6E"}),(0,v.jsx)("dd",{children:_.destination}),(0,v.jsx)("dt",{children:"\u63A8\u7406\u8BBE\u5907"}),(0,v.jsx)("dd",{children:_.compute})]}),(0,v.jsx)("p",{children:_.licenseNote??"\u8BF7\u9605\u8BFB\u4E0B\u5217\u6A21\u578B\u8BB8\u53EF\u3002"}),_.licenseUrls?.map(B=>(0,v.jsx)("a",{href:B,target:"_blank",rel:"noreferrer",children:B},B)),(0,v.jsx)("p",{className:M.hint,children:_.notice}),(0,v.jsxs)("details",{className:M.details,children:[(0,v.jsx)("summary",{children:"\u6587\u4EF6\u548C\u6821\u9A8C\u8BE6\u60C5"}),(0,v.jsx)("ul",{children:_.files?.map(B=>(0,v.jsxs)("li",{children:[B.name," \xB7 ",_n(B.bytes),(0,v.jsxs)("small",{children:["SHA-256: ",B.sha256]}),(0,v.jsx)("small",{children:B.url})]},B.name))})]}),(0,v.jsx)(he.Button,{variant:"primary",className:M.primary,disabled:x||!g?.available||!_.planHash,onClick:()=>u("start-model-install",{modelId:_.modelId,compute:_.compute,planHash:_.planHash,accepted:!0}),children:"\u5F00\u59CB\u4E0B\u8F7D"})]}),(0,v.jsx)("div",{className:M.jobs,children:(p?.jobs??[]).filter(B=>!["installed","cancelled"].includes(B.status)).map(B=>(0,v.jsx)(zd,{job:B,snapshot:p,settings:f,disabled:x,writable:S,execute:u},B.id))}),!!D.length&&(0,v.jsxs)("details",{className:M.installHistory,children:[(0,v.jsxs)("summary",{children:["\u5B89\u88C5\u8BB0\u5F55\uFF08",D.length,"\uFF09",(0,v.jsx)("small",{children:"\u65F6\u95F4 \xB7 \u8BBE\u5907 \xB7 \u4F4D\u7F6E"})]}),(0,v.jsx)("div",{className:M.jobs,children:D.map(B=>(0,v.jsx)(zd,{job:B,snapshot:p,settings:f,disabled:x,writable:S,execute:u,history:!0},B.id))})]}),(0,v.jsx)("p",{className:M.hint,children:"\u6A21\u578B\u4E0B\u8F7D\u53EF\u5728\u540E\u53F0\u7EE7\u7EED\u3002\u68C0\u6D4B\u9759\u9ED8\u8FDB\u884C\uFF0C\u8FDB\u5165\u672C\u9875\u7ACB\u5373\u5237\u65B0\u3002"})]})}function yr({state:e,sessionId:n,run:t,active:o=!0,pickPath:i,initialModelId:r=null,initialReuse:s=!1,reuseOnly:a=!1,onboarding:l=!1}){let[u,d,,p]=Rt(t,n),[f,m]=(0,ve.useState)(r),[b,g]=(0,ve.useState)(null),[_,x]=(0,ve.useState)(s),[S,Z]=(0,ve.useState)(""),[D,G]=(0,ve.useState)("q8_0"),N=e.installerFor===n?e.installer:null,B=N?.models?.filter(Y=>Y.purpose==="tts"||["qwen3-tts-base-1.7b-gguf","vits-melo-tts-zh_en-int8"].includes(Y.id))??[],O=B.find(Y=>Y.recommendation?.recommended&&Y.available),q=f??O?.id??B.find(Y=>Y.available)?.id??B[0]?.id,k=B.find(Y=>Y.id===q),z=b??(k?.computeOptions?.includes("auto")?"auto":"cpu"),I=_&&q==="qwen3-tts-base-1.7b-gguf",A=I?{sourceDirectory:S,modelVariant:D}:{},C=e.installPlanFor===n&&e.installPlan?.modelId===q&&e.installPlan?.compute===z&&(I?e.installPlan?.reused===!0&&(e.installPlanRequest?.sourceDirectory??e.installPlan?.sourceDirectory)===S&&e.installPlan?.modelVariant===D:!e.installPlan?.sourceDirectory)?e.installPlan:null,P=[...N?.jobs??[]].reverse().find(Y=>Y.modelId===q&&Y.status!=="cancelled"),L=N?.ttsInstallIntent,U=L&&P&&L.modelId===q&&L.jobId===P.id?L:null,Q=["waiting","verifying"].includes(L?.status),j=e.settingsFor===n&&e.settings?.ttsSetup?.provider==="local"&&e.settings.ttsSetup.localModelId===q&&P?.status==="installed"&&!!P.installedPath&&e.settings.ttsSetup.localModelPath===P.installedPath,me=(0,ve.useRef)(void 0),pe=(0,ve.useRef)(null);(0,ve.useEffect)(()=>{!o||N||e.busy||d||p.isLocked()||me.current===n||(me.current=n,u("model-installer"))},[o,n,!!N,e.busy,d,p.settled]),(0,ve.useEffect)(()=>{let Y=n+":"+q+":"+z;I||!o||!k?.available||e.busy||d||p.isLocked()||C||pe.current===Y||(pe.current=Y,u("plan-model-install",{modelId:q,compute:z}))},[o,n,q,z,k?.available,e.busy,d,!!C,I,p.settled]);let ne=d||e.busy||e.installerUncertain;return(0,v.jsxs)("section",{className:M.section,"aria-label":"\u4E0B\u8F7D\u672C\u5730\u8BED\u97F3\u6A21\u578B","data-no-settings-draft":!0,children:[N?(0,v.jsxs)(v.Fragment,{children:[!a&&(0,v.jsxs)("label",{className:M.inlineField,children:["\u8BED\u97F3\u6A21\u578B",(0,v.jsx)("select",{"aria-label":"\u8BED\u97F3\u6A21\u578B",value:q??"",disabled:ne||U?.status==="verifying",onChange:Y=>{m(Y.target.value),g(null)},children:B.map(Y=>(0,v.jsxs)("option",{value:Y.id,children:[Y.title??Y.id,Y.recommendation?.recommended?" \xB7 \u63A8\u8350":"",Y.available?"":" \xB7 \u6682\u4E0D\u53EF\u7528"]},Y.id))})]}),!l&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("p",{className:M.hint,children:k?.recommendation?.reason}),(0,v.jsxs)("label",{className:M.inlineField,children:["\u672C\u5730\u8BA1\u7B97",(0,v.jsx)("select",{"aria-label":"\u672C\u5730\u8BA1\u7B97",value:z,disabled:ne||Q,onChange:Y=>g(Y.target.value),children:(k?.computeOptions??["cpu"]).map(Y=>(0,v.jsx)("option",{value:Y,children:{cpu:"CPU",auto:"\u81EA\u52A8 GPU \xB7 CPU \u515C\u5E95",vulkan:"Vulkan \xB7 CPU \u515C\u5E95"}[Y]},Y))})]})]}),!k?.available&&(0,v.jsx)("p",{role:"status",className:M.note,children:k?.reason??"\u6B64\u8BBE\u5907\u6682\u6CA1\u6709\u517C\u5BB9\u7684\u5B89\u88C5\u5305\u3002\u53EF\u9009\u62E9\u5176\u4ED6\u652F\u6301\u7684\u6A21\u578B\uFF0C\u6216\u5148\u4F7F\u7528\u6587\u5B57\u3002"}),C&&(0,v.jsxs)("div",{className:M.plan,children:[(0,v.jsxs)("strong",{children:["\u4E0B\u8F7D ",_n(C.totalBytes)," \xB7 ",C.compute.toUpperCase()]}),C.reused&&(0,v.jsxs)("p",{children:["\u590D\u7528\u6A21\u578B ",_n(C.reusedBytes)," \xB7 ",C.modelVariant]}),(0,v.jsxs)("details",{className:M.details,children:[(0,v.jsx)("summary",{children:"\u6765\u6E90\u3001\u8BB8\u53EF\u4E0E\u4FDD\u5B58\u4F4D\u7F6E"}),(0,v.jsx)("p",{children:C.source}),C.runtime&&(0,v.jsx)("p",{children:C.runtime.source}),(0,v.jsx)("p",{children:C.notice}),(0,v.jsx)("p",{children:C.verification}),(0,v.jsx)("p",{children:C.licenseNote}),C.licenseUrls?.map(Y=>(0,v.jsx)("a",{href:Y,target:"_blank",rel:"noreferrer",children:Y},Y)),(0,v.jsx)("p",{children:C.destination})]})]}),(0,v.jsxs)("div",{className:M.actions,children:[(!P||(I||P.compute!==z)&&P.status==="installed"&&!Q)&&(0,v.jsx)(he.Button,{variant:"primary",className:M.primary,disabled:ne||!ht(e,n)||!k?.available||!C,onClick:()=>u("start-model-install",{modelId:q,compute:z,planHash:C.planHash,accepted:!0,useWhenReady:!0,...C.reused?{sourceDirectory:C.sourceDirectory,modelVariant:C.modelVariant}:{}}),children:I?"\u9A8C\u8BC1\u5E76\u4F7F\u7528":"\u4E0B\u8F7D\u5E76\u4F7F\u7528"}),q==="qwen3-tts-base-1.7b-gguf"&&!a&&(0,v.jsx)(he.Button,{variant:"outline","aria-expanded":I,disabled:ne||Q,onClick:()=>x(Y=>!Y),children:"\u4F7F\u7528\u672C\u673A\u5DF2\u6709\u6587\u4EF6"})]}),I&&(0,v.jsxs)("div",{className:M.section,children:[(0,v.jsx)(ho,{className:M.field,label:"\u63D2\u4EF6\u6240\u5728\u673A\u5668\u7684\u6A21\u578B\u76EE\u5F55",kind:"sourceDirectory",value:S,disabled:ne,active:o,scope:q+":"+D,pickPath:i,sessionId:n,onChange:Z}),(0,v.jsxs)("label",{className:M.inlineField,children:["\u5DF2\u6709\u6A21\u578B\u91CF\u5316\u7248\u672C",(0,v.jsxs)("select",{"aria-label":"\u5DF2\u6709\u6A21\u578B\u91CF\u5316\u7248\u672C",value:D,disabled:ne,onChange:Y=>G(Y.target.value),children:[(0,v.jsx)("option",{value:"q8_0",children:"Q8_0"}),(0,v.jsx)("option",{value:"q4_k_m",children:"Q4_K_M"})]})]}),(0,v.jsx)(he.Button,{variant:"outline",disabled:ne||!S.trim()||!k?.available,onClick:()=>u("plan-model-install",{modelId:q,compute:z,...A}),children:"\u68C0\u67E5\u590D\u7528\u8BA1\u5212"})]}),I&&P&&["failed","paused"].includes(P.status)&&(0,v.jsx)("p",{className:M.note,children:"\u5DF2\u6709\u672A\u5B8C\u6210\u7684\u5B89\u88C5\u4EFB\u52A1\u3002\u53EF\u7EE7\u7EED\u91CD\u8BD5\uFF1B\u5982\u9700\u66F4\u6362\u76EE\u5F55\u6216\u91CF\u5316\u7248\u672C\uFF0C\u8BF7\u5148\u53D6\u6D88\u8BE5\u4EFB\u52A1\uFF0C\u518D\u68C0\u67E5\u65B0\u7684\u590D\u7528\u8BA1\u5212\u3002"}),!I&&k?.available&&!C&&!P&&(0,v.jsx)(he.Button,{variant:"outline",disabled:ne,onClick:()=>u("plan-model-install",{modelId:q,compute:z}),children:"\u91CD\u65B0\u8BFB\u53D6\u5B89\u88C5\u8BA1\u5212"}),P&&(0,v.jsxs)("div",{className:M.job,children:[(0,v.jsx)("p",{role:"status",children:U?.status==="verifying"?"\u6B63\u5728\u9A8C\u8BC1\u5408\u6210\uFF0C\u9996\u6B21\u53EF\u80FD\u9700\u8981\u51E0\u5206\u949F":U?.status==="applied"&&j?"\u5408\u6210\u9A8C\u8BC1\u901A\u8FC7\uFF0C\u5DF2\u8BBE\u4E3A\u6717\u8BFB\u6765\u6E90":U?.status==="blocked"?"\u9700\u8981\u5904\u7406\u540E\u518D\u7EE7\u7EED":{queued:"\u7B49\u5F85\u4E0B\u8F7D",running:P.stage==="verifying-local"?"\u6821\u9A8C\u672C\u673A\u5DF2\u6709\u6A21\u578B":"\u4E0B\u8F7D\u5904\u7406\u4E2D",paused:"\u5DF2\u6682\u505C",failed:"\u4E0B\u8F7D\u5931\u8D25",installed:"\u6587\u4EF6\u5DF2\u6821\u9A8C\uFF0C\u5C1A\u672A\u786E\u8BA4\u5408\u6210"}[P.status]??P.status}),P.totalBytes>0&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("progress",{"aria-label":"\u8BED\u97F3\u6A21\u578B\u4E0B\u8F7D\u8FDB\u5EA6",max:P.totalBytes,value:Math.min(P.receivedBytes,P.totalBytes)}),(0,v.jsxs)("small",{children:[_n(P.receivedBytes)," / ",_n(P.totalBytes)]})]}),P.error&&(0,v.jsx)("p",{role:"alert",children:P.error.message}),U?.reason&&(0,v.jsx)("p",{className:M.note,children:Dh(U.reason)}),(0,v.jsxs)("div",{className:M.actions,children:[U?.status==="verifying"&&(0,v.jsx)(he.Button,{variant:"outline",disabled:ne,onClick:()=>u("control-model-install",{id:P.id,operation:"pause"}),children:"\u505C\u6B62\u9A8C\u8BC1"}),["queued","running"].includes(P.status)&&(0,v.jsx)(he.Button,{variant:"outline",disabled:ne,onClick:()=>u("control-model-install",{id:P.id,operation:"pause"}),children:"\u6682\u505C"}),(["paused","failed"].includes(P.status)||U?.status==="blocked"||U?.status==="paused")&&(0,v.jsx)(he.Button,{variant:"outline",disabled:ne,onClick:()=>u("control-model-install",{id:P.id,operation:"resume"}),children:"\u7EE7\u7EED\u4E0B\u8F7D\u5E76\u4F7F\u7528"}),["queued","running","paused","failed"].includes(P.status)&&(0,v.jsx)(he.Button,{variant:"outline",disabled:ne,onClick:()=>u("control-model-install",{id:P.id,operation:"cancel"}),children:"\u53D6\u6D88\u4E0B\u8F7D"}),P.status==="installed"&&!j&&(!U||["applied","cancelled"].includes(U.status))&&(0,v.jsx)(he.Button,{variant:"outline",disabled:ne||Q||!ht(e,n),onClick:()=>u("apply-model-install",{id:P.id,revision:e.settings.revision}),children:"\u9A8C\u8BC1\u5E76\u4F7F\u7528"})]})]}),j&&(0,v.jsx)("p",{className:M.hint,children:"\u672C\u5730\u6A21\u578B\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u8BD5\u542C\u3002"})]}):(0,v.jsx)(v.Fragment,{children:(0,v.jsx)("p",{className:M.hint,children:"\u6B63\u5728\u8BFB\u53D6\u53EF\u5B89\u88C5\u6A21\u578B\u2026"})}),e.installerError&&(0,v.jsx)("p",{role:"alert",className:M.note,children:e.installerError}),e.installerUncertain&&(0,v.jsx)("p",{role:"status",children:"\u6B63\u5728\u6838\u67E5\u4E0B\u8F7D\u72B6\u6001\u3002"})]})}function Md({state:e,sessionId:n,run:t,pickPath:o,active:i}){let r=e.settingsFor===n?e.settings:null,s=e.installerFor===n?e.installer:null,a=r?.ttsSetup?.localModelPath,[l,u]=Rt(t,n),[d,p]=(0,ve.useState)(""),[f,m]=(0,ve.useState)(!1),b=(s?.jobs??[]).filter(_=>_.status==="installed"&&(_.purpose==="tts"||_.recommendedSettings?.tts)),g=b.find(_=>_.id===d);return(0,v.jsxs)("section",{className:M.section,"aria-label":"\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84","data-no-settings-draft":!0,children:[(0,v.jsx)("h3",{children:"\u6717\u8BFB\u6A21\u578B\u672C\u5730\u8DEF\u5F84"}),(0,v.jsx)("p",{className:M.hint,children:a||"\u5C1A\u672A\u914D\u7F6E\u672C\u5730\u6717\u8BFB\u6A21\u578B\u8DEF\u5F84\u3002"}),!!b.length&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("label",{className:M.inlineField,children:["\u5DF2\u5B89\u88C5\u76EE\u5F55",(0,v.jsxs)("select",{value:d,onChange:_=>p(_.target.value),children:[(0,v.jsx)("option",{value:"",children:"\u9009\u62E9\u5DF2\u6821\u9A8C\u7684\u5B89\u88C5\u76EE\u5F55"}),b.map(_=>(0,v.jsxs)("option",{value:_.id,children:[kr(s.models.find(x=>x.id===_.modelId))," \xB7 ",_o(_.compute)," \xB7 ",Qi(_.createdAt)]},_.id))]})]}),g&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("p",{className:M.hint,children:g.installedPath}),(0,v.jsx)(he.Button,{variant:"outline",disabled:u||!ht(e,n)||xr(g,r),onClick:()=>l("apply-model-install",{id:g.id,revision:r.revision}),children:"\u9A8C\u8BC1\u5E76\u4F7F\u7528\u6240\u9009\u8DEF\u5F84"})]})]}),(0,v.jsxs)("details",{className:M.details,onToggle:_=>m(_.currentTarget.open),children:[(0,v.jsx)("summary",{children:"\u590D\u7528\u672C\u673A Qwen \u6A21\u578B\u6587\u4EF6"}),(0,v.jsx)("p",{className:M.hint,children:"\u9009\u62E9\u5DF2\u6709\u6A21\u578B\u76EE\u5F55\u540E\u6821\u9A8C\u6587\u4EF6\uFF1B\u6821\u9A8C\u901A\u8FC7\u540E\u5B89\u88C5\u8FD0\u884C\u7EC4\u4EF6\u3002"}),f&&(0,v.jsx)(yr,{state:e,sessionId:n,run:t,active:i,pickPath:o,initialModelId:"qwen3-tts-base-1.7b-gguf",initialReuse:!0,reuseOnly:!0})]})]})}function Zd({state:e,sessionId:n,run:t,refresh:o,t:i,onDismiss:r,onMinimize:s,onBackToAuthorization:a,asrStatus:l,pickPath:u}){let[d,p]=Rt(t,n),[f,m]=(0,ve.useState)(0),b=(0,ve.useRef)(null),g=(0,ve.useRef)(0),_=(0,ve.useRef)(null);(0,ve.useLayoutEffect)(()=>()=>{g.current++},[n]);let x=K=>(g.current++,K?.());(0,ve.useLayoutEffect)(()=>{let K=b.current?.closest("[data-whale-content]");K&&(K.scrollTop=0);let re=b.current?.querySelector("[data-wizard-body]");re&&(re.scrollTop=0)},[f]);let S=e.settingsFor===n?e.settings:null,[Z,D]=(0,ve.useState)(null),[G,N]=(0,ve.useState)(null),B=Z??S?.listenMode??"ptt",O=S?.ttsSetup?.provider,q=G??O??br.provider,k=e.ttsCapabilitiesFor===n?e.ttsCapabilities:null,z=typeof k?.deepseekKeyAvailable=="boolean",I=k?.deepseekKeyAvailable===!0,A=`${n??"owner"}:${S?.revision??"unread"}`,[C,P]=(0,ve.useState)(null),L=C??S?.ttsSetup?.deepseekVoice??"stella",U=!z&&!p&&_.current===A&&!!e.error,Q=()=>{p||e.busy||(_.current=A,d("inspect-tts"))};(0,ve.useEffect)(()=>{f!==1||!S||q!=="deepseek"||z||p||e.busy||_.current===A||Q()},[f,S,q,z,A,p,e.busy]);let j=q==="deepseek",me=j&&(e.authorizationUncertain||S?.ttsSetup?.deepseekTextTransmissionAccepted===!0&&!e.authorization),pe=j&&!me&&!(S?.ttsSetup?.deepseekTextTransmissionAccepted===!0&&bo(e)),ne=p||!ht(e,n),Y=S?.ttsSetup?.provider==="local"&&!!S.ttsSetup.localModelId,T=async()=>{if(ne||!S)return;let K=g.current,re=()=>g.current===K;if(f===0)await d("listen-mode",{mode:B})===!0&&re()&&m(1);else if(f===1){if(j&&(!I||me))return;let de=j&&L!==(S.ttsSetup?.deepseekVoice??"stella");if(q===O&&!pe&&!de){m(2);return}let _e=Hi({...br,...S.ttsSetup,provider:q});j&&(_e.deepseekTextTransmissionAccepted=!0,_e.deepseekVoice=L),await d("save-tts",{revision:S.revision,values:_e})===!0&&re()&&m(2)}else await d("complete-setup",{revision:S.revision})===!0&&re()&&r?.()};return(0,v.jsxs)(he.MenuSurface,{ref:b,className:M.wizard,role:"region","aria-label":"\u9C7C\u5E94\u9996\u6B21\u914D\u7F6E","data-whale-intrinsic":!0,children:[(0,v.jsxs)("header",{className:M.header,children:[(0,v.jsxs)("div",{children:[(0,v.jsx)("h2",{children:"\u5F00\u59CB\u4F7F\u7528\u9C7C\u5E94"}),(0,v.jsxs)("p",{className:M.hint,children:["\u7B2C ",f+1," / 3 \u6B65 \xB7 \u5176\u4F59\u8BBE\u7F6E\u968F\u65F6\u518D\u8C03"]})]}),(0,v.jsx)(he.Button,{onClick:e.setupStatus?.completed===!0?r:s,children:e.setupStatus?.completed===!0?"\u8FD4\u56DE\u8BBE\u7F6E":"\u7A0D\u540E"})]}),(0,v.jsx)("div",{className:M.wizardBody,"data-wizard-body":!0,"data-no-drag":!0,children:(0,v.jsxs)("div",{className:M.wizardBodyContent,"data-whale-natural-content":!0,children:[(0,v.jsx)(wr,{state:e,sessionId:n,run:t,refresh:o,t:i}),f===0&&(0,v.jsxs)("section",{className:M.section,children:[(0,v.jsx)("h3",{children:"\u600E\u4E48\u8BF4\u8BDD\uFF1F"}),(0,v.jsx)("fieldset",{className:M.choices,disabled:ne,children:[["ptt","\u6309\u952E\u8BF4\u8BDD","\u6309\u4F4F\u5FEB\u6377\u952E\u65F6\u6536\u97F3"],["always","\u81EA\u7531\u9EA6","\u5F00\u59CB\u5BF9\u8BDD\u540E\u6301\u7EED\u542C\u53D6\u8BED\u97F3"],["wake","\u5524\u9192\u8BCD","\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\uFF0C\u518D\u8BF4\u6307\u4EE4"]].map(([K,re,de])=>(0,v.jsxs)("label",{className:M.choice,"data-selected":B===K,children:[(0,v.jsx)("input",{type:"radio",name:"setup-listen","data-whale-operation":`listen-mode-${K}`,checked:B===K,onChange:()=>D(K)}),(0,v.jsxs)("span",{children:[(0,v.jsx)("strong",{children:re}),(0,v.jsx)("small",{children:de})]})]},K))})]}),f===1&&(0,v.jsxs)("section",{className:M.section,children:[(0,v.jsx)("h3",{children:"\u600E\u4E48\u542C\u56DE\u7B54\uFF1F"}),(0,v.jsx)("fieldset",{className:M.choices,disabled:ne,children:Cd.map(([K,re,de])=>(0,v.jsxs)("label",{className:M.choice,"data-selected":q===K,children:[(0,v.jsx)("input",{type:"radio",name:"setup-provider",checked:q===K,onChange:()=>N(K)}),(0,v.jsxs)("span",{children:[(0,v.jsx)("strong",{children:re}),(0,v.jsx)("small",{children:de})]})]},K))}),j&&(0,v.jsxs)("div",{className:M.note,"data-whale-deepseek-setup":!0,children:[(0,v.jsx)("p",{children:Gd}),me&&(0,v.jsx)("p",{role:"status",children:"\u6B63\u5728\u8BFB\u53D6 DeepSeek \u6717\u8BFB\u6388\u6743\u2026"}),!z&&!U&&(0,v.jsx)("p",{role:"status",children:"\u6B63\u5728\u68C0\u67E5 DSH \u4E2D\u4FDD\u5B58\u7684 DeepSeek API Key\u2026"}),z&&!I&&(0,v.jsx)("p",{role:"status",children:Pd}),U&&(0,v.jsx)("p",{role:"status",children:"\u6682\u65F6\u65E0\u6CD5\u68C0\u67E5 DeepSeek API Key\u3002"}),(U||z&&!I)&&(0,v.jsx)(he.Button,{variant:"outline",disabled:ne,onClick:Q,children:"\u91CD\u65B0\u68C0\u67E5 DeepSeek API Key"}),(0,v.jsx)($d,{value:L,disabled:ne,onChange:P})]}),q==="local"&&(0,v.jsx)(yr,{pickPath:u,state:e,sessionId:n,run:t,initialModelId:Y?S.ttsSetup.localModelId:null,onboarding:!0})]}),f===2&&(0,v.jsxs)("section",{className:M.section,children:[(0,v.jsx)("h3",{children:"\u51C6\u5907\u8BED\u97F3\u8BC6\u522B"}),(0,v.jsx)("p",{children:"\u8BF4\u8BDD\u65B9\u5F0F\u548C\u6717\u8BFB\u914D\u7F6E\u5DF2\u4FDD\u5B58\u3002"}),l]}),(e.error||e.setupError)&&(0,v.jsx)("p",{role:"alert",className:M.note,children:"\u6682\u65F6\u672A\u80FD\u5B8C\u6210\uFF0C\u6B63\u5728\u6838\u67E5\u8BBE\u7F6E\u3002"})]})}),(0,v.jsxs)("footer",{className:M.actions,children:[(0,v.jsx)(he.Button,{variant:"outline",disabled:p,onClick:()=>f>0?m(f-1):x(a),children:"\u4E0A\u4E00\u6B65"}),(0,v.jsx)(he.Button,{variant:"primary",className:M.primary,disabled:ne||!S||f===1&&(q==="local"&&!Y||j&&(!I||me)),onClick:()=>{T()},children:p?"\u4FDD\u5B58\u4E2D\u2026":f===2?"\u5B8C\u6210":f===1&&pe?"\u542F\u7528 DeepSeek \u8BED\u97F3\u5408\u6210\u5E76\u7EE7\u7EED":"\u4E0B\u4E00\u6B65"})]})]})}var c=require("react/jsx-runtime"),Ar=e=>e.setupOpen||e.setupStatus?.completed!==!0,Fh={ARCHIVED:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u5DF2\u5F52\u6863\u3002\u6062\u590D\u539F\u4F1A\u8BDD\u6216\u66F4\u6362\u7ED1\u5B9A\u540E\u518D\u5F00\u59CB\u8BED\u97F3\u3002",BUSY:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F\u3002\u7B49\u8FD9\u8F6E\u7ED3\u675F\u540E\u518D\u5F00\u59CB\u8BED\u97F3\u3002",UNAVAILABLE:"\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528\u3002\u53EF\u66F4\u6362\u7ED1\u5B9A\u6216\u89E3\u9664\u7ED1\u5B9A\u3002"},Vd=e=>e.authorizationOpen||e.authorizationLoading&&!e.authorization;function Hd(e){let[n,t]=(0,R.useState)(!1),o=(0,R.useRef)(null),i=(0,R.useRef)(null),r=(0,R.useRef)(null),s=(0,R.useRef)(null),a=e.useWhalePreferences(x=>x),l=e.useWhaleUi(x=>x),u=Vd(l),d=u||Ar(l)?"setup":l.panelView??"home",p=n&&d!=="settings",f=(0,R.useCallback)(x=>{o.current=x,e.geometry.ref(x),e.sizing.ref(x)},[e.geometry,e.sizing]),m=(0,R.useCallback)(x=>{i.current=x,e.sizing.contentRef(x)},[e.sizing]);(0,R.useEffect)(()=>{e.setPanelVisible?.(!p)},[p]),(0,R.useLayoutEffect)(()=>{i.current&&(i.current.scrollTop=0)},[d]),(0,R.useLayoutEffect)(()=>e.sizing.update(),[d,p,u,l.sourcePending]),(0,R.useEffect)(()=>{let x=o.current,S=x?.ownerDocument;s.current&&x&&S&&(S.activeElement===S.body||x.contains(S.activeElement))&&(d==="home"?x.querySelector("[data-whale-settings-trigger]")?.focus({preventScroll:!0}):d!==s.current&&x.focus({preventScroll:!0})),s.current=d},[d]);let b=x=>{let S=Ad(x);S&&e.recordUserOperation?.(S)},g=()=>{t(!0),requestAnimationFrame(()=>o.current?.querySelector("[data-whale-reopen]")?.focus())},_=()=>{e.refresh?.(),t(!1),requestAnimationFrame(()=>o.current?.focus())};return(0,Ld.createPortal)((0,c.jsx)("section",{ref:f,className:h.floating,"data-whale-panel":!0,"data-view":d,"data-collapsed":p||void 0,"data-source-pending":l.sourcePending||void 0,"data-motion":a.motion,tabIndex:0,"aria-label":e.t("drag"),title:e.t("dragHint"),onPointerDownCapture:()=>e.geometry.activate?.(),onFocusCapture:()=>e.geometry.activate?.(),onPointerDown:x=>{if(x.button!==0||x.pointerType&&x.pointerType!=="mouse"||!cd(x.target,x.currentTarget)){r.current=null;return}let S=x.target,Z=S.getBoundingClientRect?.();Z&&S.scrollHeight>S.clientHeight&&S.offsetWidth>S.clientWidth&&x.clientX>=Z.left+S.clientLeft+S.clientWidth||(r.current={id:x.pointerId,x:x.clientX,y:x.clientY,moved:!1},x.target.closest?.("button")||x.currentTarget.focus({preventScroll:!0}),e.geometry.pointerDown(x,x.target.closest?.("[data-drag-surface]")??x.currentTarget))},onPointerMove:x=>{let S=r.current;!S||x.pointerId!==S.id||(Math.hypot(x.clientX-S.x,x.clientY-S.y)>=4&&(S.moved=!0),e.geometry.pointerMove(x))},onPointerUp:x=>{x.nativeEvent?.isTrusted&&r.current?.id===x.pointerId&&r.current.moved&&e.recordUserOperation?.("panel-move"),e.geometry.pointerEnd(x)},onPointerCancel:x=>{e.geometry.pointerEnd(x),r.current=null},onLostPointerCapture:e.geometry.pointerEnd,onClickCapture:x=>{r.current?.moved&&x.detail!==0?(x.preventDefault(),x.stopPropagation()):b(x),r.current=null},onChangeCapture:b,onSubmitCapture:b,onKeyDownCapture:b,onKeyDown:x=>{x.key==="Escape"&&(x.stopPropagation(),d==="setup"&&!p?g():d==="settings"?e.showHome():p||g())},children:(0,c.jsx)("div",{ref:m,className:h.panelViewport,"data-whale-content":!0,children:e.renderSlot("whale-ear.panel.controls",{collapsed:p,collapse:g,expand:_})})}),document.body)}var Fd=()=>()=>{};function jd(e){let{controlContext:n}=e,t=(0,R.useSyncExternalStore)(n?.subscribe??Fd,()=>n?n.sourceFor(n.selectedSession()):e.sessionId??null),o=(0,R.useSyncExternalStore)(n?.subscribe??Fd,()=>{let f=n?.currentConversation();return f===t?f:null});e={...e,sessionId:t,currentConversationId:o};let i=e.useWhaleUi(f=>f),[r,s]=(0,R.useState)(!1);(0,R.useLayoutEffect)(()=>{e.setSession?.(t)},[t]);let a=Vd(i),l=i.updates?.release?.version,u=!e.collapsed&&!a&&!Ar(i)&&i.panelView==="home"&&i.checkedFor===e.sessionId&&i.status?.enabled===!1&&i.status.ownerSessionId===null&&!i.status.voiceControlBusy&&i.status.voiceSession?.fullyStopped!==!1&&!i.busy&&!i.uncertain&&!i.updatesUnavailable&&i.updates?.status==="available"&&l&&l!==i.dismissedUpdateVersion;if((0,R.useEffect)(()=>{u&&s(!0)},[u]),a||Ar(i)){let f=Ar(i);return(0,c.jsxs)(c.Fragment,{children:[e.collapsed&&(0,c.jsx)(Qd,{t:e.t,expand:e.expand}),a?(0,c.jsx)("div",{hidden:e.collapsed,children:(0,c.jsx)(Uh,{state:i,save:e.saveAuthorization,reload:e.openAuthorization,close:f?e.collapse:e.closeAuthorization,continueSetup:f?()=>e.closeAuthorization({resumeSetup:!0}):null})}):(0,c.jsx)("div",{role:"dialog","aria-modal":"false","aria-label":"\u9C7C\u5E94\u9996\u6B21\u914D\u7F6E","data-whale-setup":!0,hidden:e.collapsed,children:(0,c.jsx)(Zd,{pickPath:e.pickPath,state:i,sessionId:e.sessionId,run:e.run,refresh:e.refresh,t:e.t,onDismiss:e.dismissSetup,onMinimize:e.collapse,onBackToAuthorization:e.openAuthorization,asrStatus:(0,c.jsx)(Wd,{action:e.senseVoiceAsrAction,active:!e.collapsed})})})]})}let d=f=>{s(!0),f&&e.updateAction?.({action:"check"})},p=()=>{e.dismissUpdate?.(l),s(!1)};return(0,c.jsxs)(c.Fragment,{children:[i.panelView==="settings"?(0,c.jsx)(tg,{...e,openUpdate:d}):(0,c.jsx)(Lh,{...e}),r&&(0,c.jsx)(kd,{state:i,close:p,run:e.updateAction,t:e.t})]})}function Uh({state:e,save:n,reload:t,close:o,continueSetup:i}){let r=e.authorization,s=e.authorizationBusy||e.authorizationLoading,a=r?.usageAgreement?.accepted===!0,l=a&&(e.authorizationNeedsReview||r?.granted&&r.modelSourcesChanged===!0),u=a&&r?.granted&&!l,d=r?.usageAgreement?.text??[];return(0,c.jsxs)("section",{role:"dialog","aria-modal":"false","aria-label":"\u9C7C\u5E94\u4F7F\u7528\u534F\u8BAE","data-whale-authorization":!0,"data-whale-intrinsic":!0,className:`${h.settings} ${h.authorization}`,children:[(0,c.jsxs)("header",{className:h.settingsHeader,children:[(0,c.jsx)(tt,{}),(0,c.jsx)("h2",{children:a?"\u9C7C\u5E94\u4F7F\u7528\u534F\u8BAE":"\u6B22\u8FCE\u4F7F\u7528\u9C7C\u5E94"}),a&&!i&&(0,c.jsx)(H.Button,{variant:"outline",disabled:s,onClick:o,children:"\u8FD4\u56DE"})]}),(0,c.jsx)("div",{className:h.authorizationBody,"data-whale-authorization-body":!0,"data-no-drag":!0,children:(0,c.jsxs)("div",{"data-whale-natural-content":!0,children:[!a&&(0,c.jsx)("p",{className:h.authorizationSteps,children:"1 \u4F7F\u7528\u534F\u8BAE\u3000\xB7\u30002 \u57FA\u7840\u914D\u7F6E"}),(0,c.jsx)("h3",{children:"\u9C7C\u5E94\u64CD\u4F5C\u8303\u56F4"}),(0,c.jsx)("div",{className:h.agreement,children:d.map(p=>(0,c.jsx)("p",{children:p},p))}),e.authorizationLoading&&!r&&(0,c.jsx)("p",{role:"status",className:h.hint,children:"\u6B63\u5728\u8BFB\u53D6\u2026"}),r&&(0,c.jsxs)("details",{className:h.section,children:[(0,c.jsx)("summary",{children:"\u670D\u52A1\u4E0E\u6A21\u578B\u6765\u6E90"}),(0,c.jsx)("ul",{className:h.permissionList,children:r.scopes.map(p=>(0,c.jsxs)("li",{children:[(0,c.jsx)("strong",{children:p.title}),(0,c.jsx)("p",{className:h.hint,children:p.description})]},p.id))}),r.modelSources.map(p=>(0,c.jsxs)("div",{children:[(0,c.jsx)("strong",{children:p.modelId}),(0,c.jsx)("p",{className:h.hint,children:p.source}),p.runtime&&(0,c.jsxs)("p",{className:h.hint,children:["\u8FD0\u884C\u7EC4\u4EF6\uFF1A",(p.runtime.sources??[p.runtime.source]).join("\u3001")]}),(0,c.jsx)("p",{className:h.hint,children:p.licenseNote}),p.licenseUrls.map(f=>(0,c.jsx)("p",{className:h.hint,children:(0,c.jsx)("a",{href:f,target:"_blank",rel:"noreferrer",children:f})},f))]},p.modelId))]}),l&&(0,c.jsx)("p",{role:"status",className:h.hint,children:"\u5F53\u524D\u64CD\u4F5C\u9700\u8981\u8865\u5145\u6388\u6743\u3002\u8BF7\u5148\u6838\u5BF9\u670D\u52A1\u4E0E\u6A21\u578B\u6765\u6E90\u3002"}),(e.authorizationError||r?.revocationUnconfirmed)&&(0,c.jsx)("p",{role:"alert",className:h.error,children:r?.revocationUnconfirmed?"\u505C\u6B62\u8BBE\u5907\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u68C0\u67E5\u6216\u91CD\u542F\u5BBF\u4E3B\u3002":e.authorizationWriteUnconfirmed?"\u6388\u6743\u4FDD\u5B58\u7ED3\u679C\u5F85\u786E\u8BA4\u3002":"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u6388\u6743\u3002"}),(e.authorizationError||r?.revocationUnconfirmed)&&(0,c.jsx)(H.Button,{variant:"outline",disabled:s,onClick:()=>{t?.()},children:"\u91CD\u65B0\u8BFB\u53D6\u6388\u6743"})]})}),(0,c.jsxs)("div",{className:`${h.actions} ${h.authorizationActions}`,children:[(0,c.jsx)(H.Button,{className:h.primary,variant:"primary",disabled:!r||s||e.authorizationUncertain,onClick:()=>u?(i??o)():void n(!0),children:u?i?"\u7EE7\u7EED\u914D\u7F6E":"\u8FD4\u56DE":a&&l?"\u8865\u5145\u6388\u6743":"\u4E00\u952E\u6388\u6743\u5E76\u7EE7\u7EED"}),(0,c.jsx)(H.Button,{variant:"outline",disabled:s,onClick:u&&!i?()=>{n(!1)}:o,children:u?i?"\u7A0D\u540E":"\u64A4\u9500\u6388\u6743":l?"\u6682\u4E0D\u8C03\u6574":"\u6682\u4E0D\u4F7F\u7528"})]}),!a&&(0,c.jsx)("p",{className:h.hint,children:"\u4E0B\u4E00\u6B65\uFF1A\u9009\u62E9\u8BF4\u8BDD\u65B9\u5F0F\u4E0E\u8BED\u97F3\u6A21\u578B"})]})}function Qd({t:e,expand:n,markState:t="idle",compactState:o="off",enabled:i=!1}){return(0,c.jsxs)(H.Button,{className:h.bubble,"data-whale-reopen":!0,"data-whale-operation":"panel-open","data-drag-surface":!0,"aria-label":e("reopen"),title:e("title"),onClick:n,children:[(0,c.jsx)(tt,{small:!0,state:t}),(0,c.jsx)("span",{className:h.bubbleBrand,children:e("title")}),(0,c.jsxs)("span",{className:h.bubbleStatus,"data-voice-state":o,children:[(0,c.jsx)(Ve,{name:i===!1?"micOff":"mic"}),(0,c.jsx)("span",{children:e("compact_"+o)})]}),(0,c.jsx)("span",{className:h.voiceBars,"data-active":o==="listening"||void 0,"aria-hidden":"true",children:[0,1,2,3,4].map(r=>(0,c.jsx)("i",{},r))}),(0,c.jsx)(Ve,{name:"down"})]})}function Lh(e){let{t:n,sessionId:t}=e,o=e.useWhaleUi(oe=>oe),i=o.checkedFor===t?o.status:null,r=o.busy,s=!!i,a=o.uncertain||!s,l=e.useWhalePreferences(oe=>oe),u=uo(i),d=o.conversationFor===t?o.conversation:null,p=u&&d?.rootSessionId===u&&!a?d:null,f=o.conversationHistoryFor===t&&!a&&(!i?.enabled||p?.rootSessionId===o.conversationHistory?.rootSessionId)?o.conversationHistory:null,m=p??{rootSessionId:f?.rootSessionId??null,items:[],latest:f?.items?.filter(oe=>oe.role==="assistant").at(-1)??null},b=!!(i?.enabled&&(o.conversationError||o.conversationFor===t&&o.conversation?.rootSessionId!==u)),g=_r(o,t),_=g?.kind==="cleanup",x=g?.kind==="restart",S=g?.kind==="conflict",Z=i?.enabled||S,D=i?.enabled===!1&&i.voiceSession?.fullyStopped===!1,G=p?.helper??i?.helper,N=o.listenModePending?o.listenModeBefore:p?.helper&&p.revision!==o.listenModeReceiptRevision?p.helper.listenMode:i?.listenMode,B=!!(i?.enabled&&G?.online===!1),O=b||!!(i?.enabled&&N==null),q=!a&&!B&&!O&&xt.includes(N),k=r||D||!q||_||x||S||!i?.capabilities?.listenMode||i?.voiceControlBusy||o.visibilityUncertain||o.ttsUncertain||o.ttsCancelling,z=i?.enabled?p?.inputError:null,I=!i?.enabled&&o.enableError,A=Fh[/VOICE_EXISTING_(ARCHIVED|BUSY|UNAVAILABLE)/.exec(I??"")?.[1]],C=/VOICE_ROOT_OWNED_ELSEWHERE/.test(I??""),P=/VOICE_EXISTING_BINDING_CHANGED/.test(I??""),L=I&&o.settings?.voiceSession?.performanceMode==="fast"&&/VOICE_EXACT_EFFORT_HOST_REQUIRED|VOICE_FAST_/.test(I),U=t&&i?.ownerSessionId&&i.ownerSessionId!==t&&u!==t,Q=i?.existingVoiceSession,j=Q?.sessionId,me=o.existingSessionWritePending||o.existingSessionUnconfirmed,pe=i&&!a&&o.checkedFor===t&&!me,ne=pe&&i.existingVoiceSession,Y=pe?ne?ft(ne):n("dedicatedVoiceTarget"):n("checkingVoiceTarget"),T=(0,R.useId)(),K=(0,R.useId)(),re=d?.inputDelivery,de=i?.enabled&&ne&&p?.retryTranscripts?.sessionId===ne.sessionId?p.retryTranscripts:null,_e=(de?.items??[]).map(oe=>re?.id===oe.id?{...re,state:oe.state}:{...oe,sessionId:de.sessionId});re&&!_e.some(oe=>oe.id===re.id)&&_e.push(re);let wn=[de?.items.length,..._e.map(oe=>oe.id)].join(","),He=i?.existingVoiceSessionSupported===!0&&Object.hasOwn(i,"existingVoiceSession")&&e.listExistingVoiceSessions&&e.setExistingVoiceSession,Gn=He&&hr(o,t),gt=e.currentConversationId&&He&&i.enabled===!1,ln=!!(!ne&&!me&&o.checkedFor===t&&i&&!r&&!i.voiceControlBusy&&!a&&!o.ttsUncertain&&!o.ttsCancelling&&!D&&!g&&!U),ae=p?.wake??i?.wake,We=_?"pending":x||S||D||a||O||B?"unknown":r?"pending":p?.inputActive===!0?"input-active":i?.enabled?"authorized":"idle",[Ee,un]=(0,R.useState)(null),[wo,vt]=(0,R.useState)(!1),Ie=Ee==="targets"&&He&&i.enabled===!1,gn=(0,R.useRef)(!1),Nn=o.settingsFor===t?o.settings?.values:null,xo=o.settingsFor===t?o.settings?.ttsSetup:null,Tn=xo?.provider==="deepseek"&&(!xo.deepseekTextTransmissionAccepted||o.authorization&&!bo(o)),ko=Nn?.pttKeyboard?[...Nn.pttKeyboard.modifiers||[],Nn.pttKeyboard.code].join(" + "):Nn?.pttMouse?n("sideButton")+" "+Nn.pttMouse:null,on=(0,R.useRef)({}),rt=()=>{gn.current=!0,un(null)};(0,R.useLayoutEffect)(()=>{un(oe=>e.collapsed||oe==="targets"?null:oe),vt(!1)},[t,e.collapsed]),(0,R.useEffect)(()=>{vt(!1),j&&un(oe=>oe==="conversation"?null:oe)},[j]),(0,R.useEffect)(()=>{i?.enabled&&un(oe=>oe==="targets"?null:oe)},[i?.enabled]),(0,R.useEffect)(()=>{Ie||!Gn||!gn.current||!on.current.targets||(gn.current=!1,on.current.targets.focus())},[Ie,Gn,e.collapsed]),(0,R.useEffect)(()=>{!a&&!j&&Ee==="conversation"&&i?.enabled===!1&&e.run(t,"read-history")},[Ee,a,i?.enabled,t,j]);let it=nd({enabled:i?.enabled,active:p?.inputActive===!0,unknown:!i||a||O||B||!!g||D||!!z,pending:r||_}),Sr=()=>!j&&Ee==="conversation"&&(0,c.jsx)(vd,{conversation:m,history:f,historyLoading:o.sourcePending||!a&&o.conversationHistoryLoading,historyError:a?null:o.conversationHistoryError,historyRetryCursor:o.conversationHistoryRequestCursor,loadHistory:oe=>e.run(t,"read-history",oe?{cursor:oe}:{}),assistantName:l.assistantName||n("assistant"),setAssistantName:e.setAssistantName,t:n,close:()=>{un(null),on.current.conversation?.focus()}},m.rootSessionId??"empty");return e.collapsed?(0,c.jsx)(Qd,{t:n,expand:e.expand,markState:We,compactState:it,enabled:i?.enabled??null}):(0,c.jsxs)("div",{className:h.panelContent,"data-home-controls":!0,"data-has-input-caption":_e.length>0||void 0,"data-home-layout":[i?i.enabled?"active":"idle":"loading",qr(o,t),!!(o.error||I),!!z,B,g?.kind,D,!!ne,wn].join(":"),"data-size-detail":Ee==="conversation"||Ie?"true":"false",onKeyDown:oe=>{!Ie||oe.key!=="Escape"||(oe.preventDefault(),oe.stopPropagation(),rt())},children:[(0,c.jsxs)("div",{className:h.header,children:[(0,c.jsxs)("span",{className:h.brand,children:[(0,c.jsx)(tt,{state:We}),(0,c.jsx)("strong",{children:n("title")})]}),(0,c.jsxs)("div",{className:h.headerActions,children:[(0,c.jsxs)(H.Button,{className:h.newChatButton,"data-whale-operation":"new-voice-session","aria-label":n("newChat"),title:ne?"\u89E3\u9664\u5DF2\u6709\u4F1A\u8BDD\u7ED1\u5B9A\u540E\u53EF\u65B0\u5EFA\u9C7C\u5E94\u4F1A\u8BDD":n(U?"newChatOtherOwner":i?.enabled?"newChatActive":"newChat"),disabled:!ln,onClick:()=>{e.run(t,"new",{expectedOwnerSessionId:i.ownerSessionId})},children:[(0,c.jsx)(Ve,{name:"plus"}),(0,c.jsx)("span",{children:n("newChat")})]}),(0,c.jsx)(H.Button,{"data-whale-settings-trigger":!0,"data-whale-operation":"page-settings",className:h.iconButton,"aria-label":n("settings"),title:n("settings"),onClick:e.openSettings,children:(0,c.jsx)(Ve,{name:"settings"})}),(0,c.jsx)(H.Button,{"data-whale-operation":"panel-close",className:h.iconButton,"aria-label":n("collapse"),title:n("collapseHint"),onClick:e.collapse,children:(0,c.jsx)(Ve,{name:"minus"})})]})]}),(0,c.jsxs)("div",{className:h.statusRow,"data-bound":!!ne||void 0,"data-recording":We==="input-active"||void 0,children:[(0,c.jsx)("div",{id:T,className:h.voiceTarget,"data-whale-voice-target":!0,children:He?(0,c.jsxs)(H.Button,{ref:oe=>{on.current.targets=oe},variant:"outline",className:h.existingSessionHome,"data-whale-bound-session":ne?!0:void 0,"data-whale-target-trigger":!0,title:Y,"aria-expanded":!!Ie,"aria-controls":Ie?K:void 0,disabled:!Ie&&!Gn,onClick:()=>Ie?rt():un("targets"),children:[(0,c.jsx)("span",{children:n("voiceTarget")}),(0,c.jsx)("strong",{className:h.ellipsis,children:Y}),(0,c.jsx)(Ve,{name:Ie?"down":"chevron"})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("span",{children:n("voiceTarget")}),(0,c.jsx)("strong",{className:h.ellipsis,title:Y,children:Y})]})}),(0,c.jsxs)("div",{className:h.voiceStatus,children:[(0,c.jsx)(Ve,{name:i?.enabled?"mic":"micOff"}),(0,c.jsx)("span",{className:h.status,role:"status",children:o.listenModePending?n(i?.enabled?"modeSwitching":"modeSaving"):r?n("pending"):g?n(g.label):i?D?n("voiceStopPending"):a?n("stale"):B?n("voiceInputUnavailable"):O?n("unknown"):z?n("inputError_"+z):p?.inputActive===!0?n("inputActive"):i.enabled&&N==="wake"?n(ss(ae)):i.enabled?n("enabled"):n("disabled"):n("unknown")})]})]}),Ie?(0,c.jsx)(Ui,{...e,state:o,homePickerId:K,closeHomePicker:rt}):(0,c.jsxs)(c.Fragment,{children:[gt&&(0,c.jsx)(yd,{...e,sessionId:e.currentConversationId,boundSession:Q,state:o},e.currentConversationId),(0,c.jsxs)("div",{className:h.quickActions,children:[(0,c.jsx)(H.Button,{"data-whale-operation":Z?"stop-voice":"start-voice",className:`${h.mainAction} ${i?.enabled?"":h.primary}`,variant:i?.enabled?"outline":"primary","aria-describedby":T,disabled:!s||(Z?!ji(o)||_:r||!!me||!!g||D||!pe||!!(ne&&!Vn(ne))),title:i?.enabled?n(de?.items.length?"endDiscardsRetries":"stopConsequence"):void 0,onClick:()=>{e.run(t,Z?"disable":"enable",Z?{}:{expectedOwnerSessionId:null,expectedExistingSessionId:ne?.sessionId??null})},children:_?n("voiceCleanupPending"):x?n(i?.enabled?"endConversation":"voiceRestartPending"):S?n("voiceRecoveryCheck"):i?.enabled?n("endConversation"):n("startConversation")}),(0,c.jsx)("div",{className:h.quickSegments,role:"group","aria-label":n("mode"),"aria-busy":!!o.listenModePending,"data-listen-mode":q?N:"unknown",children:xt.map(oe=>(0,c.jsx)(H.Button,{"data-whale-operation":`listen-mode-${oe}`,"aria-pressed":q&&N===oe,disabled:!!k,onClick:()=>{N!==oe&&e.run(t,"listen-mode",{mode:oe})},children:n(zo(oe))},oe))})]}),_e.length>0&&(0,c.jsx)("ul",{className:h.inputCaptions,tabIndex:0,"aria-label":n("voiceTranscriptCaptions"),"data-whale-input-captions":!0,"data-no-drag":!0,children:_e.map(oe=>(0,c.jsx)(Vh,{item:oe,t:n,pending:o.transcriptRetry,busy:r,canRetry:de?.items.some(jn=>jn.id===oe.id),retry:()=>e.retryVoiceTranscript?.(t,oe.id)},oe.id))}),(!i||a||g||D)&&(0,c.jsx)("p",{className:h.hint,"data-home-important":!!g||D||void 0,children:n(g?.hint??(D?"voiceStopHint":r?"readingStatus":"statusRetry"))}),!a&&(!O||B)&&i?.enabled&&!_&&!x&&(0,c.jsx)("p",{className:h.hint,"data-whale-input-hint":!0,"data-home-important":z||B?!0:void 0,children:B?n("voiceInputRecoveryHint"):z?n("inputHelp_"+z):N==="wake"?n(ae?.streamOpen&&ae.detection==="asr-after-utterance"?"wakeFallbackHint":"wakeHint"):N==="always"?n("alwaysWarning"):ko?n("holdToSpeak")+" "+ko:n("bindingMissing")}),i&&!a&&!i.capabilities?.listenMode&&(0,c.jsx)("p",{className:h.hint,children:n("modeUnavailable")}),o.listenModeError&&(0,c.jsx)("p",{role:"alert","data-whale-mode-error":!0,className:h.error,children:n(o.uncertain?"modeSwitchUnconfirmed":"modeSwitchFailed")}),((o.readOnlyFailure&&a||D)&&!g||_||o.voiceStopUnconfirmed)&&(0,c.jsx)(H.Button,{variant:"outline",disabled:r,onClick:()=>{e.run(t,"status")},children:n("retryStatus")}),(o.error||I)&&!o.readOnlyFailure&&!A&&!C&&!o.listenModeError&&!S&&!x&&(0,c.jsx)("p",{role:"alert",className:h.error,children:n(P?"voiceTargetChanged":L?"performanceFastUnavailable":!o.uncertain&&I?"enableFailed":"operationUnavailable")}),C&&!g&&(0,c.jsxs)("p",{role:"alert",className:h.notice,children:[n("voiceTargetOccupied"),Gn&&(0,c.jsx)(H.Button,{variant:"outline",onClick:()=>un("targets"),children:n("chooseVoiceTarget")})]}),A&&(0,c.jsxs)("p",{role:"alert",className:h.notice,children:[A," ",(0,c.jsx)(H.Button,{variant:"outline",disabled:!Gn,onClick:()=>un("targets"),children:"\u7BA1\u7406\u7ED1\u5B9A"})]}),/VOICE_SESSION_ARCHIVED/.test(I??o.error??"")&&(0,c.jsxs)("p",{className:h.notice,children:["\u539F\u8BED\u97F3\u4F1A\u8BDD\u5DF2\u5F52\u6863\u3002",(0,c.jsx)(H.Button,{variant:"outline",onClick:()=>{e.openSettings("sessions")},children:"\u6062\u590D\u539F\u4F1A\u8BDD"})]}),/VOICE_ASR_(?:PREPARING|PREPARE_FAILED)/.test(I??o.error??"")&&(0,c.jsxs)("p",{className:h.notice,children:["SenseVoice \u5C1A\u672A\u5C31\u7EEA\u3002",(0,c.jsx)(H.Button,{variant:"outline",onClick:()=>{e.openSettings("models","download")},children:"\u67E5\u770B\u6A21\u578B\u8FDB\u5EA6"})]}),/VOICE_MODEL_REQUIRED/.test(I??o.error??"")&&(0,c.jsxs)("p",{className:h.notice,children:["\u8BF7\u5148\u9009\u62E9\u53EF\u7528\u7684\u5BF9\u8BDD\u6A21\u578B\u3002",(0,c.jsx)(H.Button,{variant:"outline",onClick:()=>{e.openSettings("models","conversation")},children:"\u8BBE\u7F6E\u5BF9\u8BDD\u6A21\u578B"})]}),Tn&&(0,c.jsxs)("p",{className:h.notice,"data-home-important":!0,children:["\u6717\u8BFB\u5F85\u542F\u7528\uFF0C\u56DE\u7B54\u4F1A\u663E\u793A\u4E3A\u6587\u5B57\u3002",(0,c.jsx)(H.Button,{variant:"outline",onClick:()=>{e.openSettings("models","voice")},children:"\u8BBE\u7F6E\u6717\u8BFB"})]}),ne&&!Vn(ne)&&(0,c.jsx)("p",{className:h.hint,"data-home-important":!0,children:fr(ne)}),p?.providerError&&(0,c.jsx)("p",{role:"alert","data-home-important":!0,"data-whale-provider-error":!0,className:h.error,children:p.providerError}),(0,c.jsx)(bd,{...e,state:o}),!ne&&!o.error&&!z&&!g&&!D&&!B&&!O&&(0,c.jsx)(Hh,{...e,state:o}),wo&&(0,c.jsx)("p",{role:"alert",className:h.notice,children:"DSH \u6682\u65F6\u65E0\u6CD5\u6253\u5F00\u539F\u4F1A\u8BDD\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"}),Vn(ne)&&e.openExistingVoiceSession&&(0,c.jsxs)(H.Button,{className:h.caption,"data-whale-operation":"open-native-session","aria-label":"\u6253\u5F00\u539F\u4F1A\u8BDD",onClick:async()=>{vt(!1);try{await e.openExistingVoiceSession(ne.sessionId)}catch{vt(!0)}},children:[p?.latest?.text&&(0,c.jsx)("span",{className:h.ellipsis,children:p.latest.text}),(0,c.jsx)("span",{className:h.openOriginal,children:"\u6253\u5F00\u539F\u4F1A\u8BDD"}),(0,c.jsx)(Ve,{name:"chevron"})]}),i&&!j&&(0,c.jsxs)(H.Button,{ref:oe=>{on.current.conversation=oe},className:h.caption,onClick:()=>{let oe=Ee!=="conversation";un(oe?"conversation":null),oe&&e.run(t,"read-history")},"aria-label":n("recentConversation"),"aria-expanded":Ee==="conversation",children:[(0,c.jsxs)("span",{className:h.ellipsis,children:[m.latest?.state==="speech-failed"?n("speechFailed")+": ":m.latest?.state==="interrupted"?n("speechInterrupted")+": ":"",m.latest?.text??n(o.newChatFor===t?"newChatCreated":"viewConversation")]}),(0,c.jsx)(Ve,{name:"chevron"})]}),Sr()]})]})}function Vh({item:e,pending:n,busy:t,canRetry:o,retry:i,t:r}){let s=(0,R.useId)(),a=n?.id===e.id&&e.state==="ready"?n.state:e.state,l=ft(e);return(0,c.jsxs)("li",{className:h.inputCaption,"data-whale-input-caption":!0,"data-delivery-state":a,children:[(0,c.jsxs)("div",{id:s,children:[(0,c.jsx)("p",{className:h.inputCaptionText,children:e.text}),(0,c.jsxs)("p",{className:h.inputCaptionReceipt,role:"status",children:[(0,c.jsx)("span",{children:r("transcriptDelivery_"+a)}),(0,c.jsx)("span",{className:h.ellipsis,title:l,children:l})]})]}),o&&(0,c.jsx)(H.Button,{variant:"outline",disabled:t||!!n||a!=="ready",onClick:()=>{i()},"aria-describedby":s,"data-whale-operation":"retry-voice-transcript",children:r("retryTranscript")})]})}function qr(e,n){return!!(e.settings?.revision&&e.settingsFor===n&&!e.visibilityUncertain&&!e.settingsConflict&&!e.ttsUncertain&&!e.ttsCancelling&&yo(e,n))}function Hh({state:e,sessionId:n,t,run:o,readState:i}){let r=(0,R.useRef)(0);(0,R.useEffect)(()=>()=>{r.current++},[n]);let s=qr(e,n),a=e.settings?.voiceSession?.performanceMode,l=e.performanceFor===n?e.performance:null,u=["fast","balanced","high"],d=l?.modes?.some(m=>m.performanceMode===a&&!m.available),p=e.busy||e.performancePending||e.uncertain||e.visibilityUncertain||!s,f=async m=>{if(p||m===a)return;let b=++r.current;if(m!=="compatibility"&&!await o(n,"inspect-performance")||b!==r.current)return;let g=i?.();!g||!qr(g,n)||g.busy||m!=="compatibility"&&(g.performanceFor!==n||!g.performance?.modes?.find(_=>_.performanceMode===m)?.available)||await o(n,"set-performance-mode",{revision:g.settings.revision,performanceMode:m})};return s?(0,c.jsxs)("section",{className:h.quickSpeed,"aria-label":t("performanceTitle"),children:[(0,c.jsxs)("div",{className:h.quickSpeedHeader,children:[(0,c.jsx)("span",{children:t("performanceTitle")}),a==="compatibility"&&(0,c.jsx)("small",{children:t("performance_compatibility")})]}),(0,c.jsx)("div",{className:h.quickSegments,children:u.map(m=>(0,c.jsxs)(H.Button,{"aria-pressed":a===m,disabled:p||!!Wi(l,m),title:t(Wi(l,m)||(m==="fast"?"performanceFastHint":"performance_"+m)),onClick:()=>{f(m)},children:[a===m&&(0,c.jsx)(Ve,{name:"check"}),(0,c.jsx)(Kd,{value:m,t})]},m))}),(0,c.jsx)(Jd,{capability:l,t,compact:!0,pending:e.performancePending,error:e.performanceError}),d&&(0,c.jsx)(H.Button,{variant:"outline",disabled:p,onClick:()=>{f("compatibility")},children:t("performance_compatibility")})]}):null}function jh({settings:e,sessionId:n,busy:t,run:o,t:i,status:r,verified:s,statusFresh:a,tab:l,markSettingsEdited:u,discardSettingsDraft:d,bindingError:p,captureBindings:f}){let[m,b]=(0,R.useState)(e.values.device??null),[g,_]=(0,R.useState)(e.values.pttMouse),[x,S]=(0,R.useState)(e.values.pttKeyboard??null),[Z,D]=(0,R.useState)(e.values.speakerVerification.enabled),G=e.capabilities?.turnSignals===!0,[N,B]=(0,R.useState)(e.values.turnSignals?.enabled??!1),[O,q]=(0,R.useState)(e.values.turnSignals?.volume?.toString()??""),[k,z]=(0,R.useState)((e.values.wakeWordAliases??["\u5C0F\u9CB8\u9C7C"]).join("\uFF0C")),[I,A]=(0,R.useState)(String((e.values.wakeListenTimeoutMs??1e4)/1e3)),C=cs(k),P=Co(C)&&Number.isInteger(Number(I)*1e3)&&Number(I)>=3&&Number(I)<=30,L=JSON.stringify(C)!==JSON.stringify(e.values.wakeWordAliases??["\u5C0F\u9CB8\u9C7C"])||Number(I)*1e3!==(e.values.wakeListenTimeoutMs??1e4),[U,Q]=(0,R.useState)(e.values.semanticExperimental===!0),[j,me]=(0,R.useState)(e.values.turnSignals?.headphonesConfirmed??!1),[pe,ne]=(0,R.useState)(e.values.turnSignals?.experimentalAutomaticBargeIn??!1),Y=g!==e.values.pttMouse||JSON.stringify(x)!==JSON.stringify(e.values.pttKeyboard??null),[T,K]=(0,R.useState)(!1),re=a?r?.inputDevices:null,de=m!==null&&typeof m=="object",_e=de||m==null||m===""||re?.items?.some(ae=>typeof m=="number"&&ae.index===m),wn=T==="index"&&(String(m??"").trim()===""||!/^\d+$/.test(String(m).trim())||!Number.isSafeInteger(Number(m))),He=t||!a||r?.enabled!==!1||r?.ownerSessionId!==null||r?.voiceControlBusy!==!1||r?.voiceSession?.fullyStopped!==!0,Gn=()=>{if(t||!P||wn||L&&He)return;let ae=de&&!T?m:T==="index"?Number(m):m==null||m===""?null:T==="name"?String(m).trim():typeof m=="number"?m:m.trim();o(n,"save-settings",{revision:e.revision,values:{wakeWordAliases:C,wakeListenTimeoutMs:Number(I)*1e3,semanticExperimental:U,device:ae,pttMouse:e.values.pttMouse,...e.capabilities?.pttKeyboard?{pttKeyboard:e.values.pttKeyboard??null}:{},speakerVerification:{enabled:Z},...G?{turnSignals:{enabled:N,volume:Number(O),headphonesConfirmed:j,experimentalAutomaticBargeIn:pe}}:{}}})},gt=(0,c.jsx)(H.Button,{className:h.primary,variant:"primary",disabled:t||!P||wn||L&&He||G&&(O.trim()===""||!Number.isFinite(Number(O))||Number(O)<0||Number(O)>1),onClick:Gn,children:i(t?"pending":"save")}),ln=de?m.name:re?.items?.find(ae=>ae.index===m)?.name??(m==null||m===""?i("deviceDefault"):String(m));return(0,c.jsxs)("div",{className:h.section,"data-settings-draft":"save-settings",children:[(0,c.jsxs)("div",{hidden:l!=="audio",className:h.section,children:[(0,c.jsx)("h3",{children:i("mode")}),(0,c.jsxs)("p",{className:h.hint,children:["\u5F53\u524D\uFF1A",i(zo(r?.listenMode??e.listenMode))]}),(0,c.jsx)("div",{className:h.segmented,children:["ptt","always","wake"].map(ae=>(0,c.jsx)(H.Button,{"data-whale-operation":`listen-mode-${ae}`,variant:"outline","aria-pressed":(r?.listenMode??e.listenMode)===ae,disabled:!e.capabilities?.listenMode||!s||t,onClick:()=>{o(n,"listen-mode",{mode:ae})},children:i(zo(ae))},ae))}),(!e.capabilities?.listenMode||!s)&&(0,c.jsx)("p",{className:h.hint,children:i(e.capabilities?.listenMode?"modeNeedsGrant":"modeUnavailable")}),(0,c.jsxs)("div",{className:h.inlineActions,children:[(0,c.jsxs)("label",{className:h.inlineField,children:[i("device"),(0,c.jsxs)("select",{title:ln,className:h.deviceSelect,"aria-label":i("device"),disabled:t,value:T?"__manual-"+T:de?"__stable":_e?m??"":"__saved",onChange:ae=>{let We=ae.target.value;We.startsWith("__manual-")?(K(We.slice(9)),de&&b("")):We!=="__saved"&&We!=="__stable"&&(K(!1),b(We===""?null:Number(We)))},children:[(0,c.jsx)("option",{value:"",children:i("deviceDefault")}),de&&(0,c.jsx)("option",{value:"__stable",children:m.name}),re?.items?.map(ae=>(0,c.jsxs)("option",{value:String(ae.index),children:[ae.name," (",ae.index,")"]},ae.index)),!_e&&(0,c.jsxs)("option",{value:"__saved",children:[i("deviceSaved"),": ",m]}),(0,c.jsx)("option",{value:"__manual-index",children:i("deviceManualIndex")}),(0,c.jsx)("option",{value:"__manual-name",children:i("deviceManualName")})]})]}),gt]}),ln.length>22&&(0,c.jsxs)("details",{className:h.fullName,children:[(0,c.jsx)("summary",{children:"\u67E5\u770B\u8BBE\u5907\u5168\u540D"}),(0,c.jsx)("p",{children:ln})]}),(T||!_e)&&(0,c.jsxs)("label",{className:h.field,children:[i("deviceManual"),(0,c.jsx)(H.Input,{"aria-label":i("deviceManual"),disabled:t,value:m??"",onChange:ae=>{T||K(typeof m=="number"?"index":"name"),b(ae.target.value)}})]}),wn&&(0,c.jsx)("p",{className:h.notice,children:i("deviceIndexInvalid")}),re?.status!=="available"&&(0,c.jsx)("p",{className:h.hint,children:i(re?.status==="empty"?"deviceEmpty":"deviceUnknown")})]}),(0,c.jsx)("div",{hidden:l!=="interaction",className:h.section,children:(0,c.jsxs)("div",{className:h.bindingEditor,"data-settings-draft":"save-bindings",children:[(0,c.jsx)(Kh,{captureBindings:f,sessionId:n,active:l==="interaction",value:x,onChange:ae=>{u?.("save-bindings"),S(ae)},capability:e.capabilities?.pttKeyboard,disabled:t||!a,t:i}),(0,c.jsxs)("fieldset",{className:`${h.radios} ${h.mouseBinding}`,disabled:t||!a,children:[(0,c.jsx)("legend",{children:i("sideButton")}),[0,1,2].map((ae,We)=>(0,c.jsxs)("label",{children:[(0,c.jsx)("input",{type:"radio",name:"whale-ear-mouse",value:ae,checked:g===ae,onChange:()=>{u?.("save-bindings"),_(ae)}}),i(["sideOff","sideOne","sideTwo"][We])]},ae))]}),p&&(0,c.jsx)("p",{role:"alert",className:h.notice,children:/RECORDING|KEYS_HELD/.test(p)?"\u8BF7\u5148\u677E\u5F00\u6309\u952E\uFF0C\u7B49\u5F85\u5F55\u97F3\u5904\u7406\u5B8C\u6210\uFF0C\u518D\u4FDD\u5B58\u3002":/UNCONFIRMED|STOP_UNCONFIRMED|ROLLBACK_UNCONFIRMED/.test(p)?"\u6309\u952E\u72B6\u6001\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u91CD\u542F DSH \u518D\u6838\u67E5\u6309\u952E\u3002":/STALE|配置已改变|语音会话已改变/.test(p)?"\u914D\u7F6E\u6216\u8BED\u97F3\u4F1A\u8BDD\u5DF2\u6539\u53D8\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6\u540E\u518D\u4FDD\u5B58\u3002":/UNSUPPORTED/.test(p)?"\u5F53\u524D\u7CFB\u7EDF\u4E0D\u652F\u6301\u5728\u5BF9\u8BDD\u4E2D\u66F4\u6362\u5168\u5C40\u6309\u952E\u3002":"\u672A\u80FD\u4FDD\u5B58\u6309\u952E\uFF0C\u8BF7\u67E5\u770B\u9AD8\u7EA7\u8BE6\u60C5\u3002"}),(0,c.jsxs)("div",{className:`${h.actions} ${h.bindingActions}`,children:[(0,c.jsx)(H.Button,{className:h.primary,variant:"primary",disabled:t||!a||!Y||!e.bindingContext||x?.code==="F4"&&x.modifiers.includes("Alt"),onClick:()=>{o(n,"save-bindings",{revision:e.revision,bindingContext:e.bindingContext,values:{pttMouse:g,pttKeyboard:x}})},children:i("saveBindings")}),Y&&(0,c.jsx)(H.Button,{variant:"outline",disabled:t,onClick:()=>{_(e.values.pttMouse),S(e.values.pttKeyboard??null),d?.("save-bindings")},children:i("discardBindings")})]})]})}),(0,c.jsxs)("div",{hidden:l!=="advanced"||!e.values.speakerVerification.enabled,className:h.section,children:[e.values.speakerVerification.enabled&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(Lt,{label:i("speaker"),checked:Z,disabled:t,onChange:D}),(0,c.jsx)("p",{className:h.hint,children:i("speakerHint")})]}),(0,c.jsx)("p",{className:h.hint,children:i("savedHint")})]}),(0,c.jsxs)("div",{hidden:l!=="audio",className:h.disclosureRow,children:[(0,c.jsxs)("details",{className:h.section,children:[(0,c.jsx)("summary",{children:i("wakeSettings")}),(0,c.jsx)("p",{className:h.hint,children:i("wakeMethod")}),(0,c.jsxs)("label",{className:h.field,children:[i("wakeAliases"),(0,c.jsx)(H.Input,{"aria-label":i("wakeAliases"),maxLength:208,value:k,disabled:He,onChange:ae=>z(ae.target.value)})]}),(0,c.jsx)("p",{className:h.hint,children:i("wakeAliasesHint")}),(0,c.jsxs)("label",{className:h.field,children:[i("wakeTimeout"),(0,c.jsx)(H.Input,{"aria-label":i("wakeTimeout"),type:"number",min:"3",max:"30",step:"1",value:I,disabled:He,onChange:ae=>A(ae.target.value)})]}),He&&(0,c.jsx)("p",{className:h.hint,children:i("wakeStopToEdit")}),!P&&(0,c.jsx)("p",{role:"alert",className:h.notice,children:i("wakeInvalid")})]}),(0,c.jsxs)("details",{className:h.section,children:[(0,c.jsx)("summary",{children:i("soundTitle")}),(0,c.jsx)(Lt,{label:i("soundEnabled"),checked:N,disabled:!G||t,onChange:B}),(0,c.jsxs)("label",{className:h.field,children:[i("soundVolume"),(0,c.jsx)(Ut,{"aria-label":i("soundVolume")+"\u6ED1\u5757",min:"0",max:"1",step:"0.05",value:O,disabled:!G||t,onChange:ae=>q(ae.target.value)}),(0,c.jsx)(H.Input,{type:"number",min:"0",max:"1",step:"0.05","aria-label":i("soundVolume"),disabled:!G||t,value:O,onChange:ae=>q(ae.target.value)})]}),(0,c.jsx)(Lt,{label:"\u5B9E\u9A8C\u6027\u5524\u9192\u5224\u65AD\uFF08\u9ED8\u8BA4\u5173\u95ED\uFF09",checked:U,disabled:t,onChange:Q}),(0,c.jsx)("p",{className:h.hint,children:"\u5173\u95ED\u65F6\uFF0C\u81EA\u7531\u9EA6\u76F4\u63A5\u542C\u53D6\u6709\u6548\u8BED\u97F3\uFF1B\u5F00\u542F\u540E\u4F7F\u7528\u5524\u9192\u8BCD\u6216\u8BED\u4E49\u5224\u65AD\uFF0C\u53EF\u80FD\u6F0F\u5524\u9192\u3002\u5EFA\u8BAE\u4F7F\u7528\u8033\u673A\u51CF\u5C11\u56DE\u58F0\u3002"}),(0,c.jsx)(H.Checkbox,{label:i("headphones"),checked:j,disabled:!G||t,onChange:ae=>{me(ae),ae||ne(!1)}}),(0,c.jsx)("p",{className:h.hint,children:i("headphonesHint")}),(0,c.jsx)(Lt,{label:i("automaticBargeIn"),checked:pe,disabled:!G||!j||t,onChange:ne}),G&&!j&&(0,c.jsx)("p",{className:h.hint,children:i("headphonesRequired")}),(0,c.jsx)("p",{className:h.hint,children:i(G?"soundAvailable":"soundUnavailable")})]})]}),l==="advanced"&&e.values.speakerVerification.enabled&&(0,c.jsx)("div",{className:h.formActions,children:gt})]})}function Wd({action:e,active:n}){let[t,o]=(0,R.useState)(null),[i,r]=(0,R.useState)(0),s=(0,R.useRef)(0);if((0,R.useEffect)(()=>{if(!e||!n)return;let u=new AbortController,d,p=async m=>{try{let b=await e({operation:m},u.signal);if(u.signal.aborted)return;o(b),b.selected&&(m==="retry"||["idle","downloading"].includes(b.state))&&(d=setTimeout(()=>{p("status")},1e3))}catch{u.signal.aborted||o({state:"unavailable"})}},f=i>s.current?"retry":"status";return s.current=i,p(f),()=>{clearTimeout(d),u.abort()}},[e,n,i]),!e||!n)return null;let a=t?.totalBytes>0&&t?.state==="downloading",l=u=>(u/1e6).toFixed(1);return(0,c.jsxs)("div",{className:h.section,"data-whale-sensevoice":!0,children:[(0,c.jsx)("h3",{children:"SenseVoice"}),(0,c.jsx)("p",{role:"status",children:t?.selected===!1?"\u4F7F\u7528\u9AD8\u7EA7\u8DEF\u5F84\u4E2D\u6307\u5B9A\u7684\u672C\u5730 SenseVoice \u6A21\u578B\u3002":t?.state==="ready"?"\u5DF2\u5C31\u7EEA\uFF0C\u5728\u672C\u673A\u79BB\u7EBF\u8BC6\u522B\u3002":t?.state==="error"?t.message:t?.state==="unavailable"?"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u6A21\u578B\u72B6\u6001\u3002":a?`\u6B63\u5728\u4E0B\u8F7D \xB7 ${l(t.receivedBytes)} / ${l(t.totalBytes)} MB`:"\u6B63\u5728\u51C6\u5907\u672C\u5730\u8BC6\u522B\u6A21\u578B\u2026"}),a&&(0,c.jsx)("progress",{"aria-label":"SenseVoice \u4E0B\u8F7D\u8FDB\u5EA6",value:t.receivedBytes,max:t.totalBytes}),t?.selected&&t?.state==="error"&&(0,c.jsx)(H.Button,{variant:"outline",onClick:()=>{o(null),r(u=>u+1)},children:"\u91CD\u8BD5\u4E0B\u8F7D"})]})}function Qh({settings:e,sessionId:n,busy:t,run:o,t:i,pickPath:r,active:s,modelTab:a,markSettingsEdited:l,senseVoiceAsrAction:u}){let[d,p]=(0,R.useState)(e.modelSetup.models),f=t,m=()=>l?.("save-models"),b=()=>{o(n,"save-models",{revision:e.revision,values:{asr:"sensevoice",modelCompute:"cpu",models:d}})};return(0,c.jsxs)("section",{className:h.section,"data-settings-draft":"save-models",hidden:!["download","paths"].includes(a),children:[(0,c.jsx)("div",{"data-whale-tab-panel":!0,hidden:a!=="download",children:(0,c.jsx)(Wd,{action:u,active:s&&a==="download"})}),(0,c.jsxs)("div",{hidden:a!=="paths",className:h.section,children:[(0,c.jsx)("h3",{children:"\u8BC6\u522B\u6A21\u578B\u672C\u5730\u8DEF\u5F84"}),(0,c.jsx)("p",{className:h.hint,children:"\u53EF\u5728\u201C\u6A21\u578B\u4E0B\u8F7D\u201D\u67E5\u770B\u51C6\u5907\u8FDB\u5EA6\uFF0C\u6216\u5728\u8FD9\u91CC\u6307\u5B9A\u672C\u673A\u5DF2\u6709\u7684 SenseVoice \u76EE\u5F55\u3002"}),[["sensevoiceDir","sensevoicePath"],["campplus","campplusPath"]].map(([g,_])=>(0,c.jsx)(ho,{className:h.pathRow,label:i(_),kind:g,value:d[g],disabled:f,active:s&&a==="paths",pickPath:r,sessionId:n,scope:"sensevoice",onChange:x=>{m(),p(S=>({...S,[g]:x}))}},g)),(0,c.jsx)(H.Button,{variant:"outline",disabled:f,onClick:b,children:i("saveModels")})]})]})}function Wh({settings:e,state:n,sessionId:t,run:o,t:i}){let[r,s]=(0,R.useState)(e.voiceSession.visibility),a=n.settingsFor===t,l=n.checkedFor===t&&n.status!==null,u=l?n.status.voiceCapabilities:e.voiceCapabilities,d=l?n.status.voiceSession:null,p=l&&(n.status.enabled||n.status.ownerSessionId!==null||d?.id!=null),f=l&&n.status.voiceControlBusy===!1,m=n.busy||n.uncertain||!a||!l||!f||p,b=g=>i(g==="workspace"?"workspaceMode":"hiddenMode");return(0,c.jsxs)("section",{className:h.section,"data-whale-visibility":!0,"data-settings-draft":"set-visibility",children:[(0,c.jsx)("h3",{children:i("capabilityTitle")}),(0,c.jsx)("dl",{className:h.details,children:["hidden","workspace"].map(g=>(0,c.jsxs)("div",{className:h.capabilityRow,children:[(0,c.jsx)("dt",{children:b(g)}),(0,c.jsxs)("dd",{children:[i(u?.[g]?.supported?"supported":"unsupported"),u?.[g]?.reason?` \xB7 ${u[g].reason}`:""]})]},g))}),(0,c.jsxs)("p",{className:h.hint,children:[i("taskCapability"),": ",i(u?.taskHandoff?.supported?"supported":"unsupported")," \xB7 ",u?.taskHandoff?.mode??i("unknown"),u?.taskHandoff?.reason?` \xB7 ${u.taskHandoff.reason}`:""]}),(0,c.jsxs)("p",{children:[i("configuredMode"),": ",b(e.voiceSession.visibility)]}),(0,c.jsx)("p",{className:h.hint,children:l?d?.id?`${i("currentVoiceMode")}: ${d.presentation?.requested?b(d.presentation.requested):i("unknown")} \xB7 ${d.id}`:i("noActiveVoice"):i("modeReadFirst")}),(0,c.jsxs)("fieldset",{className:h.radios,disabled:m,children:[(0,c.jsx)("legend",{children:i("chooseVisibility")}),(0,c.jsxs)("label",{children:[(0,c.jsx)("input",{type:"radio",name:"whale-ear-visibility",checked:r==="hidden",onChange:()=>s("hidden")}),i("hiddenMode")]}),(0,c.jsxs)("label",{children:[(0,c.jsx)("input",{type:"radio",name:"whale-ear-visibility",checked:r==="workspace",disabled:!u?.workspace?.supported,onChange:()=>s("workspace")}),i("workspaceMode")]})]}),(0,c.jsx)("p",{className:h.hint,children:i("workspaceWarning")}),(0,c.jsx)("p",{className:h.hint,children:i("visibilityNoMigration")}),(!a||!l)&&(0,c.jsx)("p",{className:h.hint,children:i("modeReadFirst")}),p&&(0,c.jsx)("p",{className:h.hint,children:i("closeBeforeMode")}),l&&!f&&(0,c.jsx)("p",{className:h.hint,children:i("modeControlPending")}),(0,c.jsx)("div",{children:(0,c.jsx)(H.Button,{variant:"outline",disabled:m||r===e.voiceSession.visibility||r==="workspace"&&!u?.workspace?.supported,onClick:()=>{o(t,"set-visibility",{revision:e.revision,visibility:r})},children:i(r==="workspace"?"saveWorkspace":"saveHidden")})})]})}function Kh({value:e,onChange:n,capability:t,disabled:o,t:i,captureBindings:r,sessionId:s,active:a}){let[l,u]=(0,R.useState)(!1),[d,p]=(0,R.useState)(!1),[f,m]=(0,R.useState)(null),b=(0,R.useRef)(null),g=(0,R.useRef)(0),_=(0,R.useRef)(null),x=(0,R.useRef)(!0),S=async G=>{g.current++,x.current&&u(!1);let N=b.current;if(N){x.current&&p(!0);try{await r(N.sessionId,{operation:"end",token:N.token}),b.current===N&&(b.current=null),x.current&&G&&n(G),x.current&&m(null)}catch(B){x.current&&m(String(B.message||B))}finally{x.current&&p(!1)}}},Z=async()=>{if(b.current||d)return;let G=++g.current;p(!0),m(null);try{let N=await r(s,{operation:"begin"});if(b.current={...N,sessionId:s},!x.current||G!==g.current){await S();return}u(!0),_.current?.focus()}catch(N){x.current&&m(String(N.message||N))}finally{x.current&&p(!1)}};(0,R.useEffect)(()=>(x.current=!0,()=>{x.current=!1,S()}),[]),(0,R.useEffect)(()=>{(!a||o)&&(g.current++,S())},[a,o,s]),(0,R.useEffect)(()=>{if(!l)return;let G=null,N=!1,B=!1,O=C=>{B||(B=!0,S(C))},q=C=>{if(C.preventDefault(),C.stopPropagation(),C.code==="Escape"){G=null;return}C.repeat||["ControlLeft","ControlRight","AltLeft","AltRight","ShiftLeft","ShiftRight"].includes(C.code)||(G=ld(C),N=!1,m(G?null:i("bindingUnsupported")))},k=C=>{if(C.preventDefault(),C.stopPropagation(),C.code==="Escape"){O();return}G&&(C.code===G.code&&(N=!0),N&&!C.ctrlKey&&!C.altKey&&!C.shiftKey&&O(G))},z=()=>O(),I=()=>{document.hidden&&z()};window.addEventListener("keydown",q,!0),window.addEventListener("keyup",k,!0),window.addEventListener("blur",z),document.addEventListener("visibilitychange",I);let A=setTimeout(z,1e4);return()=>{clearTimeout(A),window.removeEventListener("keydown",q,!0),window.removeEventListener("keyup",k,!0),window.removeEventListener("blur",z),document.removeEventListener("visibilitychange",I)}},[l]);let D=e?[...e.modifiers||[],e.code].join(" + "):i("bindingOff");return(0,c.jsxs)("section",{className:h.keyBinding,children:[(0,c.jsx)("h3",{children:i("keyboardBinding")}),(0,c.jsxs)("div",{className:h.keyBindingRow,children:[(0,c.jsx)("span",{children:D}),(0,c.jsxs)("div",{className:h.actions,children:[(0,c.jsx)(H.Button,{variant:"outline",ref:_,onBlur:()=>{l&&S()},disabled:o||d||!t?.supported||!r,onClick:()=>l?void S():void Z(),children:d?"\u6B63\u5728\u4EA4\u63A5\u2026":l?"\u53D6\u6D88\u5F55\u5165":"\u5F55\u5165\u6309\u952E"}),e&&(0,c.jsx)(H.Button,{variant:"outline",disabled:o||d||l,onClick:()=>n(null),children:i("clearBinding")}),b.current&&!l&&!d&&(0,c.jsx)(H.Button,{variant:"outline",onClick:()=>{S()},children:"\u6062\u590D\u539F\u6309\u952E"})]})]}),l&&(0,c.jsx)("p",{role:"status",className:h.notice,children:"\u6309\u952E\u8BF4\u8BDD\u5DF2\u6682\u505C\u3002\u8BF7\u6309\u4E0B\u7EC4\u5408\u952E\u540E\u5168\u90E8\u677E\u5F00\uFF1BEsc \u53D6\u6D88\u3002"}),!t?.supported&&(0,c.jsx)("p",{className:h.hint,children:t?.reason||i("bindingUnavailable")}),f&&(0,c.jsx)("p",{role:"alert",children:f})]})}function Kd({value:e,t:n}){let t={fast:"performanceNoThinking",balanced:"performanceRecommended"}[e];return(0,c.jsxs)("span",{className:h.performanceChoice,children:[n("performance_"+e),t&&(0,c.jsxs)(c.Fragment,{children:[" ",(0,c.jsx)("small",{children:n(t)})]})]})}function Wi(e,n){let t=e?.modes?.find(o=>o.performanceMode===n);return!t||t.available?null:t.reason==="provider_unsupported"?"performanceUnavailable":t.reason==="unknown"?"performanceProbeUnknown":n==="fast"?"performanceFastUnavailable":"performanceHostUnavailable"}function Jd({capability:e,t:n,compact:t=!1,pending:o=!1,error:i=null}){let r=e?.modes??[],s=r.map(g=>g.reason),a=e?.probe?.status,l=a==="unknown"||s.includes("unknown"),u=o||a==="pending"||a==="running",d=!t&&(a==="accepted"||s.includes("accepted")),p=!t&&s.includes("explicit_off"),f=r.some(g=>g.performanceMode==="fast"&&!g.available&&g.reason==="host_contract_blocked"),m=s.includes("provider_unsupported"),b=r.some(g=>g.performanceMode!=="fast"&&!g.available&&g.reason==="host_contract_blocked");if(!l&&!u&&!d&&!p&&!f&&!m&&!b&&!i)return null;if(t){let g=i||n(u?"performanceProbePending":f?"performanceFastUnavailable":m?"performanceUnavailable":l?"performanceProbeUnknown":"performanceHostUnavailable");return(0,c.jsx)("div",{role:"status",className:h.quickHint,"data-whale-probe-status":!0,title:g,children:g})}return(0,c.jsxs)("div",{role:"status",className:h.hint,"data-whale-probe-status":!0,children:[u&&(0,c.jsx)("p",{children:n("performanceProbePending")}),i&&(0,c.jsx)("p",{"data-whale-probe-error":!0,children:i}),f&&(0,c.jsx)("p",{children:n("performanceFastUnavailable")}),m&&(0,c.jsx)("p",{children:n("performanceUnavailable")}),b&&(0,c.jsx)("p",{children:n("performanceHostUnavailable")}),l&&(0,c.jsx)("p",{children:n("performanceProbeUnknown")}),d&&(0,c.jsx)("p",{children:n("performanceProbeAccepted")}),p&&(0,c.jsx)("p",{children:n("performanceFastHint")})]})}function Jh({state:e,sessionId:n,run:t,t:o,markSettingsEdited:i}){let r=e.settings,s=r?.voiceSession?.performanceMode??null,[a,l]=(0,R.useState)(s),u=qr(e,n),d=e.performanceFor===n?e.performance:null,p=d?.modes?.find(m=>m.performanceMode===a),f=e.busy||e.performancePending||e.uncertain||!u||!a||a!=="compatibility"&&!p?.available;return u?(0,c.jsxs)("section",{className:h.section,"data-whale-performance":!0,"data-settings-draft":"set-performance-mode",children:[(0,c.jsx)("h3",{children:o("performanceTitle")}),(0,c.jsx)("p",{className:h.hint,children:o("performanceHint")}),(0,c.jsx)("p",{className:h.hint,"data-whale-probe-cost":!0,children:"\u90E8\u5206\u6A21\u578B\u7684\u68C0\u6D4B\u4F1A\u53D1\u9001\u8BA1\u8D39\u77ED\u8BF7\u6C42\u3002"}),(0,c.jsxs)("details",{className:h.details,children:[(0,c.jsx)("summary",{children:"\u68C0\u6D4B\u8303\u56F4\u4E0E\u8D39\u7528"}),(0,c.jsx)("p",{children:o("performanceProbeCost")}),(0,c.jsx)("p",{children:o("performanceProbeScope")})]}),(0,c.jsx)(Jd,{capability:d,t:o,pending:e.performancePending,error:e.performanceError}),!d&&(0,c.jsx)("p",{className:h.hint,children:o("performanceReadFirst")}),s&&(0,c.jsxs)("p",{className:h.hint,children:["\u5F53\u524D\uFF1A",o("performance_"+s)]}),(0,c.jsx)("div",{className:h.segmented,children:["fast","balanced","high","compatibility"].map(m=>{let b=m==="compatibility"?null:d?Wi(d,m):"performanceReadFirst";return(0,c.jsx)(H.Button,{title:b?o(b):void 0,"aria-pressed":a===m,disabled:e.busy||e.performancePending||!!b,onClick:()=>{i?.("set-performance-mode"),l(m)},children:(0,c.jsx)(Kd,{value:m,t:o})},m)})}),(0,c.jsxs)("div",{className:h.actions,children:[(0,c.jsx)(H.Button,{variant:"outline",disabled:e.busy||e.performancePending,onClick:()=>{t(n,"inspect-performance")},children:o("inspectPerformance")}),(0,c.jsx)(H.Button,{variant:"outline",disabled:f||a===s,onClick:()=>{t(n,"set-performance-mode",{revision:r.revision,performanceMode:a})},children:o("savePerformance")})]})]}):null}function Xh({state:e,sessionId:n,run:t,t:o}){let i=e.outputVolumeFor===n?e.outputVolume:null,[r,s]=(0,R.useState)(null),[a,l]=(0,R.useState)(null),u=r??i?.volume??1,d=r!==null&&a!==i?.revision;return(0,R.useEffect)(()=>{s(null),l(null)},[n]),(0,c.jsxs)("section",{className:h.section,children:[(0,c.jsx)("h3",{children:o("outputVolume")}),i&&!i.supported&&(0,c.jsx)("p",{className:h.hint,children:o("outputVolumeUnavailable")}),i?.supported&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{className:h.volumeRow,children:[(0,c.jsxs)("label",{className:h.volumeControl,children:[(0,c.jsx)(Ut,{"aria-label":o("outputVolume"),min:"0",max:"1",step:"0.01",value:u,disabled:!i.supported||e.busy||e.outputVolumeUncertain,onChange:p=>{r===null&&l(i.revision),s(Number(p.target.value))}}),(0,c.jsxs)("span",{children:[Math.round(u*100),"%"]})]}),(0,c.jsx)(H.Button,{variant:"outline",disabled:!i.supported||e.busy||e.outputVolumeUncertain||d||r===null,onClick:async()=>{await t(n,"set-output-volume",{revision:a,volume:r})&&s(null)},children:o("saveOutputVolume")})]}),(0,c.jsx)("p",{className:h.hint,children:"\u4E0B\u4E00\u6BB5\u64AD\u653E\u751F\u6548"})]}),d&&(0,c.jsxs)("p",{role:"status",className:h.notice,children:["\u97F3\u91CF\u5DF2\u5728\u522B\u5904\u66F4\u65B0\uFF0C\u5F53\u524D\u9009\u62E9\u5DF2\u4FDD\u7559\u3002",(0,c.jsx)(H.Button,{variant:"outline",disabled:e.busy,onClick:()=>s(null),children:"\u4F7F\u7528\u5F53\u524D\u97F3\u91CF"})]}),!i&&(0,c.jsx)("p",{role:"status",className:h.hint,children:e.busy?o("pending"):o("statusRetry")}),e.outputVolumeUncertain&&(0,c.jsx)("p",{role:"status",className:h.notice,children:o("outputVolumeUnknown")})]})}function Yh({state:e,sessionId:n,run:t,markSettingsEdited:o,discardSettingsDraft:i}){let r=e.settingsFor===n?e.settings:null,s=r?.conversationModel??{mode:"auto",provider:null,model:null},[a,l]=(0,R.useState)(s),[u,d]=(0,R.useState)(""),[p,f]=(0,R.useState)(!1),m=(0,R.useRef)(!1),b=(0,R.useRef)(!0);(0,R.useEffect)(()=>(b.current=!0,()=>{b.current=!1}),[]);let g=e.conversationModelsFor===n?e.conversationModels:null,_=g?.providers??[],x=_.find(O=>O.id===a.provider),S=a.mode==="auto"||!!x?.models.some(O=>O.id===a.model),Z=JSON.stringify(a)!==JSON.stringify(s),D=yo(e,n),G=!r||!D||e.busy||e.settingsConflict||e.visibilityUncertain||p,N=O=>{o?.("save-conversation-model"),l(q=>({...q,...O})),d("")},B=async()=>{if(G||m.current||!Z||!S)return;m.current=!0,f(!0),d("");let O=await t(n,"save-conversation-model",{revision:r.revision,values:a.mode==="auto"?{mode:"auto",provider:null,model:null}:a});m.current=!1,b.current&&(f(!1),d(O?"\u9ED8\u8BA4\u5DF2\u4FDD\u5B58\uFF0C\u4E0B\u6B21\u5F00\u542F\u8BED\u97F3\u751F\u6548\u3002":"\u4FDD\u5B58\u672A\u6210\u529F\uFF0C\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002\u8BF7\u6838\u67E5\u63D0\u793A\u540E\u518D\u64CD\u4F5C\u3002"))};return(0,c.jsxs)("section",{className:h.section,"data-conversation-model":!0,"data-settings-draft":"save-conversation-model",children:[(0,c.jsx)("h3",{children:"\u9ED8\u8BA4\u5BF9\u8BDD\u6A21\u578B"}),(0,c.jsx)("p",{className:h.hint,children:"\u63A5\u6536\u8BED\u97F3\u8BC6\u522B\u540E\u7684\u6587\u5B57\uFF0C\u7528\u4E8E\u751F\u6210\u56DE\u7B54\u3002"}),(0,c.jsx)("fieldset",{className:h.radios,disabled:G,"aria-label":"\u5BF9\u8BDD\u6A21\u578B\u9009\u62E9\u65B9\u5F0F",children:[["auto","\u81EA\u52A8"],["manual","\u624B\u52A8\u6307\u5B9A"]].map(([O,q])=>(0,c.jsxs)("label",{children:[(0,c.jsx)("input",{type:"radio",name:"conversation-mode-"+n,checked:a.mode===O,onChange:()=>N(O==="auto"?{mode:O,provider:null,model:null}:{mode:O})}),q]},O))}),a.mode==="auto"&&(0,c.jsxs)("div",{className:h.section,children:[(0,c.jsx)("p",{className:h.hint,children:"\u8DDF\u968F\u5F53\u524D\u5BF9\u8BDD\u6240\u9009\u6A21\u578B\u3002\u7A7A\u767D\u9996\u9875\u4F7F\u7528 DSH \u7684\u9ED8\u8BA4\u6A21\u578B\u3002"}),(0,c.jsx)("p",{children:"\u5F00\u542F\u8BED\u97F3\u65F6\u786E\u5B9A\u6A21\u578B\u6765\u6E90"})]}),(0,c.jsx)(os,{open:a.mode==="manual",children:(0,c.jsxs)("div",{className:h.section,"data-conversation-manual":!0,children:[(0,c.jsx)(Ud,{label:"\u4F9B\u5E94\u5546",value:a.provider,options:_,disabled:G||!g,onChange:O=>N({provider:O,model:null})}),(0,c.jsx)(Ud,{label:"\u6A21\u578B",value:a.model,options:x?.models??[],disabled:G||!x,onChange:O=>N({model:O})}),(0,c.jsx)("p",{className:h.hint,children:"\u4EC5\u5217\u51FA\u5BBF\u4E3B\u5DF2\u914D\u7F6E\u7684\u5BF9\u8BDD\u4F9B\u5E94\u5546\u4E0E\u6A21\u578B\uFF0C\u4FDD\u5B58\u65F6\u518D\u6B21\u9A8C\u8BC1\u3002"}),!g&&(0,c.jsx)("p",{role:"status",children:e.conversationModelsError?"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u4F9B\u5E94\u5546\uFF0C\u8BF7\u91CD\u8BD5\u3002":"\u6B63\u5728\u8BFB\u53D6\u4F9B\u5E94\u5546\u2026"}),g&&!_.length&&(0,c.jsx)("p",{role:"status",children:"\u6682\u65E0\u53EF\u7528\u5BF9\u8BDD\u6A21\u578B\uFF0C\u8BF7\u5148\u5728 DSH \u4E2D\u914D\u7F6E\u4F9B\u5E94\u5546\u3002"}),a.provider&&!S&&(0,c.jsx)("p",{role:"status",children:"\u8BF7\u9009\u62E9\u5F53\u524D\u53EF\u7528\u7684\u4F9B\u5E94\u5546\u4E0E\u6A21\u578B\u3002\u539F\u9009\u62E9\u4E0D\u4F1A\u81EA\u52A8\u66FF\u6362\u3002"}),(0,c.jsx)(H.Button,{variant:"outline",disabled:e.busy,onClick:()=>{t(n,"conversation-models")},children:"\u5237\u65B0\u4F9B\u5E94\u5546"})]})}),(0,c.jsxs)("div",{className:h.actions,children:[(0,c.jsx)(H.Button,{variant:"primary",disabled:G||!Z||!S,onClick:()=>{B()},children:p?"\u4FDD\u5B58\u4E2D\u2026":"\u4FDD\u5B58\u9ED8\u8BA4"}),(0,c.jsx)(H.Button,{variant:"outline",disabled:G||!Z,onClick:()=>{l(s),d(""),i?.("save-conversation-model")},children:"\u53D6\u6D88\u4FEE\u6539"})]}),(0,c.jsx)("p",{role:"status",className:h.hint,children:u||(Z?"\u5C1A\u672A\u4FDD\u5B58":s.mode==="auto"?"\u5DF2\u4FDD\u5B58\uFF1A\u81EA\u52A8 \xB7 \u8DDF\u968F\u5F53\u524D\u5BF9\u8BDD":`\u5DF2\u4FDD\u5B58\uFF1A${s.provider} / ${s.model}`)})]})}function Ud({label:e,value:n,options:t,disabled:o,onChange:i}){let[r,s]=(0,R.useState)(!1),[a,l]=(0,R.useState)(0),u=(0,R.useRef)(null),d=(0,R.useRef)(null),p=(0,R.useRef)(null),f=(0,R.useId)(),m=t.find(_=>_.id===n);(0,R.useEffect)(()=>{o&&s(!1)},[o]),(0,R.useEffect)(()=>{r&&p.current?.querySelector('[data-option-index="'+a+'"]')?.focus()},[r,a]);let b=()=>{s(!1),d.current?.focus()},g=_=>{i(_.id),b()};return(0,c.jsxs)("div",{ref:u,className:h.conversationChoice,onBlur:_=>{_.currentTarget.contains(_.relatedTarget)||s(!1)},children:[(0,c.jsx)("span",{id:f+"-label",children:e}),(0,c.jsxs)(H.Button,{ref:d,variant:"outline",className:h.deviceSelect,"aria-label":e,"aria-haspopup":"listbox","aria-expanded":r,"aria-controls":f,disabled:o||!t.length,onClick:()=>{l(Math.max(0,t.findIndex(_=>_.id===n))),s(!r)},onKeyDown:_=>{["ArrowDown","ArrowUp"].includes(_.key)&&(_.preventDefault(),l(Math.max(0,t.findIndex(x=>x.id===n))),s(!0))},children:[m?.name||n||"\u8BF7\u9009\u62E9",(0,c.jsx)("span",{"aria-hidden":"true",children:"\u2304"})]}),r&&(0,c.jsx)(H.MenuSurface,{ref:p,id:f,className:h.conversationOptions,role:"listbox","aria-labelledby":f+"-label",onKeyDown:_=>{_.key==="Escape"?(_.preventDefault(),_.stopPropagation(),b()):["ArrowDown","ArrowUp","Home","End"].includes(_.key)&&(_.preventDefault(),l(x=>_.key==="Home"?0:_.key==="End"?t.length-1:(x+(_.key==="ArrowDown"?1:-1)+t.length)%t.length))},children:t.map((_,x)=>(0,c.jsxs)("button",{type:"button",role:"option","aria-selected":n===_.id,tabIndex:x===a?0:-1,"data-option-index":x,onClick:()=>g(_),children:[_.name,n===_.id&&(0,c.jsx)("span",{"aria-hidden":"true",children:" \u2713"})]},_.id))})]})}function eg({state:e,sessionId:n,run:t,markSettingsEdited:o,discardSettingsDraft:i,t:r}){let s=e.settingsFor===n?e.settings:null,a=s?.voicePrompt,l=a?.text??"",[u,d]=(0,R.useState)(l),[p,f]=(0,R.useState)(!1),[m,b]=(0,R.useState)(""),g=(0,R.useRef)(!1),_=(0,R.useRef)(!0),x=(0,R.useRef)(l),S=(0,R.useId)();(0,R.useEffect)(()=>(_.current=!0,()=>{_.current=!1}),[]),(0,R.useEffect)(()=>{if(x.current!==l){let k=x.current;d(z=>z===k?l:z),x.current=l}},[l]);let Z=u.trim()?u:"",D=Z!==(l.trim()?l:""),G=yo(e,n),N=!s||!G||e.busy||e.settingsConflict||e.visibilityUncertain||p,B=!!Z&&a?.customSupported!==!0,O=u.length<=32768&&!B,q=async()=>{if(N||g.current||!D||!O)return;g.current=!0,f(!0),b("");let k=!1;try{k=await t(n,"save-voice-prompt",{revision:s.revision,values:{text:Z}})}catch{k=!1}finally{g.current=!1,_.current&&(f(!1),b(r(k?"voicePromptSaved":"voicePromptSaveFailed")))}};return(0,c.jsxs)("section",{className:`${h.section} ${h.voicePrompt}`,"data-voice-prompt":!0,"data-settings-draft":"save-voice-prompt",children:[(0,c.jsxs)("label",{htmlFor:S,children:[r("voicePromptLabel")," ",(0,c.jsx)("span",{className:h.hint,children:r("voicePromptOptional")})]}),(0,c.jsx)("textarea",{id:S,className:h.voicePromptInput,value:u,maxLength:32768,disabled:N,placeholder:r("voicePromptPlaceholder"),"aria-describedby":S+"-count "+S+"-feedback",onChange:k=>{o?.("save-voice-prompt"),d(k.target.value),b("")}}),(0,c.jsxs)("div",{id:S+"-count",className:h.voicePromptCount,children:[u.length.toLocaleString("en-US")," / 32,768"]}),(0,c.jsxs)("div",{className:h.voicePromptActions,children:[(0,c.jsxs)("div",{className:h.actions,children:[(0,c.jsx)(H.Button,{variant:"primary",disabled:N||!D||!O,onClick:()=>{q()},children:r(p?"voicePromptSaving":"voicePromptSave")}),(0,c.jsx)(H.Button,{variant:"outline",disabled:N||u===l,onClick:()=>{d(l),b(""),i?.("save-voice-prompt")},children:r("voicePromptCancel")})]}),(0,c.jsx)("span",{className:h.hint,children:r("voicePromptStopToEdit")})]}),(0,c.jsx)("p",{id:S+"-feedback",role:"status",className:h.hint,children:m||(u.length>32768?r("voicePromptTooLong"):a?.customSupported===!1||B?r("voicePromptUnsupported"):D?r("voicePromptUnsaved"):"")})]})}var r_=Object.freeze({version:1,available:!1,reason:"planned"}),Dt=["audio","interaction","prompt","models","advanced","sessions","pets"],ng={audio:"\u9009\u62E9\u9EA6\u514B\u98CE\u3001\u8BF4\u8BDD\u65B9\u5F0F\u4E0E\u63D0\u793A\u97F3\u3002",interaction:"\u8BBE\u7F6E\u6309\u952E\u3001\u56DE\u7B54\u901F\u5EA6\u4E0E\u754C\u9762\u52A8\u753B\u3002",prompt:"\u8BBE\u7F6E\u8BED\u97F3\u5BF9\u8BDD\u7684\u8868\u8FBE\u65B9\u5F0F\u3002",models:"\u9009\u62E9\u6717\u8BFB\u65B9\u5F0F\uFF0C\u6216\u7BA1\u7406\u672C\u5730\u6A21\u578B\u3002",advanced:"\u67E5\u770B\u6743\u9650\u3001\u8BF7\u6C42\u4E0E\u8FD0\u884C\u8BE6\u60C5\u3002",sessions:"\u9009\u62E9\u8BED\u97F3\u5BF9\u8BDD\u76EE\u6807\uFF0C\u67E5\u770B\u9C7C\u5E94\u4F1A\u8BDD\u548C\u5B50\u4EE3\u7406\u3002",pets:"\u684C\u5BA0\u529F\u80FD\u5C1A\u672A\u5F00\u653E\u3002"};function tg(e){let{t:n,sessionId:t}=e,o=e.useWhaleUi(q=>q),i=e.useWhalePreferences(q=>q),r=o.settingsTab||"audio",s=o.settingsModelTab||"conversation",[a,l]=(0,R.useState)(()=>new Set([o.settingsTab||"audio"])),[u,d]=(0,R.useState)(()=>new Set([o.settingsModelTab||"conversation"])),[p,f]=(0,R.useState)(0),m=(0,R.useRef)(null),b=(0,R.useRef)(null),g=(0,R.useRef)(0),_=(0,R.useRef)(new Set),x=(0,R.useRef)(o.readRefresh),S=(0,R.useId)();(0,R.useLayoutEffect)(()=>{m.current&&(m.current.scrollTop=0)},[r,s]),(0,R.useEffect)(()=>{e.setSession?.(t)},[t]),(0,R.useEffect)(()=>()=>{g.current++,e.cancelPreview?.(),e.discardDiagnostics?.()},[]),(0,R.useEffect)(()=>{_.current.clear()},[t,r,s]),(0,R.useEffect)(()=>{r==="models"&&e.refreshModelCompute?.(t)},[t,r,s]),(0,R.useEffect)(()=>{if(o.busy||o.ttsCancelling||["pets","sessions"].includes(r))return;let q=e.readState?.();if(q?.busy||q?.ttsCancelling)return;if(x.current!==o.readRefresh){x.current=o.readRefresh;for(let A of["read-output-volume","model-installer","agent-requests"])_.current.delete(A)}let I=[...!o.settings||o.settingsFor!==t?["read-settings"]:[],...!o.status||o.checkedFor!==t||r==="advanced"?["status"]:[],...r==="audio"?["read-output-volume"]:[],...r==="models"&&s==="conversation"?["conversation-models"]:[],...t&&r==="advanced"?["agent-requests"]:[],...t&&r==="interaction"&&o.performanceFor!==t?["inspect-performance"]:[],...r==="models"&&s==="voice"&&(!o.ttsCapabilities||o.ttsCapabilitiesFor!==t)?["inspect-tts"]:[],...r==="models"?["model-installer"]:[]].find(A=>!_.current.has(A));I&&(_.current.add(I),e.run(t,I,{},!0))},[t,r,s,o.readRefresh,o.busy,o.ttsCancelling,o.settingsFor,o.checkedFor,o.outputVolumeFor,o.agentRequestsFor,o.performanceFor,o.ttsCapabilitiesFor,o.installerFor]);let Z=async(q,k=!1)=>{let z=++g.current;e.cancelPreview&&!await e.cancelPreview()||(e.discardDiagnostics?.(),z===g.current&&(l(I=>new Set([...I,q])),e.setSettingsTab(q),k&&b.current?.querySelector(`[data-settings-tab="${q}"]`)?.focus({preventScroll:!0})))},D=async q=>{let k=++g.current;e.cancelPreview&&!await e.cancelPreview()||(e.discardDiagnostics?.(),k===g.current&&(d(z=>new Set([...z,q])),e.setSettingsModelTab(q)))},G=o.settingsFor===t?o.settings:null,N=!o.uncertain&&o.checkedFor===t,B=N&&o.status?.enabled&&(r==="interaction"||r==="models"&&s==="download"),O=G&&(0,c.jsx)(jh,{settings:G,sessionId:t,busy:o.busy||o.visibilityUncertain||o.settingsConflict,run:e.run,t:n,status:o.status,statusFresh:N,verified:N&&!!o.status,tab:r,markSettingsEdited:e.markSettingsEdited,discardSettingsDraft:e.discardSettingsDraft,bindingError:o.bindingError,captureBindings:e.captureBindings},t+":"+(o.settingsKey??G.revision));return(0,c.jsxs)("div",{className:h.settings,"data-whale-settings":!0,"data-motion":i.motion,children:[(0,c.jsxs)("header",{className:h.settingsHeader,"data-settings-header":!0,children:[(0,c.jsxs)(H.Button,{className:h.backButton,"data-whale-operation":"page-home",onClick:e.showHome,"aria-label":"\u8FD4\u56DE\u8BED\u97F3",children:[(0,c.jsx)(Ve,{name:"chevron",className:h.backIcon}),(0,c.jsx)("span",{children:"\u8FD4\u56DE\u8BED\u97F3"})]}),(0,c.jsxs)("div",{className:h.settingsBrand,children:[(0,c.jsx)(tt,{small:!0}),(0,c.jsx)("h2",{children:n("settingsTitle")})]}),(0,c.jsx)(H.Button,{className:h.guideButton,"data-whale-operation":"page-setup",onClick:e.openSetup,"aria-label":"\u91CD\u65B0\u6253\u5F00\u914D\u7F6E\u5F15\u5BFC",title:"\u91CD\u65B0\u6253\u5F00\u914D\u7F6E\u5F15\u5BFC",children:"\u914D\u7F6E\u5F15\u5BFC"})]}),(0,c.jsxs)("div",{className:h.settingsLayout,children:[(0,c.jsx)("nav",{ref:b,className:h.settingsNav,"data-settings-nav":!0,"aria-label":n("settingsSections"),onKeyDown:q=>{let k=Dt.indexOf(q.target.dataset.settingsTab);if(k<0||!["ArrowDown","ArrowUp","ArrowLeft","ArrowRight","Home","End"].includes(q.key))return;q.preventDefault();let z=q.key==="Home"?0:q.key==="End"?Dt.length-1:(k+(["ArrowDown","ArrowRight"].includes(q.key)?1:-1)+Dt.length)%Dt.length;Z(Dt[z],!0)},children:Dt.map(q=>(0,c.jsx)(H.Button,{"data-settings-tab":q,"aria-pressed":r===q,"aria-controls":S+"-body",onClick:()=>{Z(q)},children:n("tab_"+q)},q))}),(0,c.jsxs)("div",{className:h.settingsPage,children:[(0,c.jsxs)("div",{className:`${h.pageHeading} ${r==="models"?h.modelHeading:""}`,"data-settings-page-heading":!0,"data-no-drag":!0,children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("h3",{id:S,children:n("tab_"+r)}),r!=="models"&&(0,c.jsx)("p",{children:ng[r]})]}),r==="prompt"&&G&&(0,c.jsx)("span",{className:h.voicePromptMode,"data-voice-prompt-mode":!0,children:n(G.voicePrompt?.mode==="custom"&&G.voicePrompt?.customSupported===!0?"voicePromptCustom":"voicePromptAgents")}),r==="models"&&(0,c.jsx)("nav",{className:h.modelNav,"aria-label":"\u6A21\u578B\u8BBE\u7F6E\u5206\u7C7B","data-no-drag":!0,children:[["conversation","\u5BF9\u8BDD\u6A21\u578B"],["voice","\u6717\u8BFB\u65B9\u5F0F"],["download","\u6A21\u578B\u4E0B\u8F7D"],["paths","\u9AD8\u7EA7\u8DEF\u5F84"]].map(([q,k])=>(0,c.jsx)(H.Button,{"aria-pressed":s===q,onClick:()=>{D(q)},children:k},q))})]}),(0,c.jsxs)("div",{ref:m,id:S+"-body",className:h.settingsBody,"data-settings-body":!0,"data-no-drag":!0,onChangeCapture:q=>{let k=q.target.closest("[data-settings-draft]");k&&!q.target.closest("[data-no-settings-draft]")&&e.markSettingsEdited?.(k.dataset.settingsDraft)},tabIndex:0,"aria-label":n("settingsContent"),children:[r==="sessions"?(0,c.jsxs)(c.Fragment,{children:[e.listExistingVoiceSessions&&!o.sessionManagementRoot&&(0,c.jsx)(Ui,{...e,state:o}),(0,c.jsx)(rg,{...e,state:o})]}):r==="pets"?(0,c.jsxs)("section",{className:h.placeholder,"data-whale-pet":!0,"aria-label":n("tab_pets"),children:[(0,c.jsx)(Ve,{name:"pet"}),(0,c.jsx)("h3",{children:n("tab_pets")}),(0,c.jsx)("p",{children:n("planned")})]}):(0,c.jsxs)(c.Fragment,{children:[o.error&&(0,c.jsx)("div",{role:"alert",className:h.error,children:n("operationUnavailable")}),o.settingsConflict&&(0,c.jsxs)("p",{role:"status",className:h.notice,children:["\u8BBE\u7F6E\u5DF2\u5728\u522B\u5904\u66F4\u65B0\uFF0C\u5F53\u524D\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002",(0,c.jsx)(H.Button,{variant:"outline",disabled:o.busy,onClick:()=>e.discardSettingsDraft?.(),children:"\u653E\u5F03\u8349\u7A3F\u5E76\u4F7F\u7528\u6700\u65B0\u8BBE\u7F6E"})]}),o.visibilityUncertain&&(0,c.jsx)("p",{role:"status",className:h.notice,children:n("configurationUnknown")}),!B&&(0,c.jsx)(wr,{state:o,sessionId:t,run:e.run,refresh:e.refresh,canStopTts:r!=="models"||s!=="voice",t:n})]}),(0,c.jsx)("div",{hidden:!["audio","interaction","advanced"].includes(r),children:O}),(r==="audio"||a.has("audio"))&&(0,c.jsx)("div",{hidden:r!=="audio",children:(0,c.jsx)(Xh,{...e,state:o})}),(r==="interaction"||a.has("interaction"))&&(0,c.jsxs)("div",{hidden:r!=="interaction",children:[G&&(0,c.jsx)(Jh,{...e,state:o},"performance:"+t+":"+(o.settingsKey??G.revision)),(0,c.jsxs)("section",{className:h.section,children:[(0,c.jsx)("h3",{children:n("motionTitle")}),(0,c.jsx)("div",{className:h.segmented,children:["spring","firm","off"].map(q=>(0,c.jsx)(H.Button,{"aria-pressed":i.motion===q,onClick:()=>{e.setMotion(q),f(p+1)},children:n("motion_"+q)},q))}),(0,c.jsx)("div",{className:h.motionPreview,"aria-hidden":"true",children:(0,c.jsx)(tt,{small:!0})},p),(0,c.jsx)("p",{className:h.hint,children:n("motionHint")}),i.error&&(0,c.jsx)("p",{role:"status",children:n("motionNotSaved")})]})]}),(r==="prompt"||a.has("prompt"))&&G&&(0,c.jsx)("div",{hidden:r!=="prompt",children:(0,c.jsx)(eg,{...e,state:o},"prompt:"+t+":"+(o.settingsKey??G.revision))}),(r==="models"||a.has("models"))&&(0,c.jsxs)("div",{hidden:r!=="models",children:[G&&(s==="conversation"||u.has("conversation"))&&(0,c.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="conversation",children:(0,c.jsx)(Yh,{...e,state:o},"conversation:"+t+":"+(o.settingsKey??G.revision))}),(s==="voice"||u.has("voice"))&&(0,c.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="voice",children:(0,c.jsx)(Id,{pickPath:e.pickPath,state:o,sessionId:t,run:e.run,markSettingsEdited:e.markSettingsEdited,prepared:!0,active:r==="models"&&s==="voice"})}),(s==="download"||u.has("download"))&&(0,c.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="download",children:(0,c.jsx)(Dd,{state:o,sessionId:t,run:e.run})}),G?.modelSetup&&(0,c.jsx)(Qh,{modelTab:s,markSettingsEdited:e.markSettingsEdited,pickPath:e.pickPath,senseVoiceAsrAction:e.senseVoiceAsrAction,active:r==="models",settings:G,sessionId:t,busy:o.busy||o.visibilityUncertain||o.settingsConflict,run:e.run,t:n},t+":"+(o.settingsKey??G.revision)),(s==="paths"||u.has("paths"))&&(0,c.jsx)("div",{"data-whale-tab-panel":!0,hidden:s!=="paths",children:(0,c.jsx)(Md,{state:o,sessionId:t,run:e.run,pickPath:e.pickPath,active:r==="models"&&s==="paths"})})]}),(r==="advanced"||a.has("advanced"))&&(0,c.jsxs)("div",{hidden:r!=="advanced",children:[e.updateAction&&(0,c.jsx)(xd,{state:o,open:e.openUpdate,t:n}),(0,c.jsxs)("section",{className:h.section,"aria-label":n("projectInfoTitle"),children:[(0,c.jsx)("h3",{children:n("projectInfoTitle")}),(0,c.jsxs)("dl",{className:h.details,children:[(0,c.jsx)("dt",{children:n("projectAuthor")}),(0,c.jsx)("dd",{children:(0,c.jsx)("a",{href:Li.url,target:"_blank",rel:"noreferrer noopener",children:Li.name})}),(0,c.jsx)("dt",{children:n("projectRepository")}),(0,c.jsx)("dd",{children:(0,c.jsxs)("a",{href:_d,target:"_blank",rel:"noreferrer noopener",children:["Emikosama/",vr]})}),(0,c.jsx)("dt",{children:n("projectNpm")}),(0,c.jsx)("dd",{children:(0,c.jsx)("a",{href:`https://www.npmjs.com/package/${vr}`,target:"_blank",rel:"noreferrer noopener",children:vr})})]})]}),(0,c.jsx)(sg,{...e,state:o,active:r==="advanced"}),(0,c.jsx)(Sd,{readOperationLog:e.readOperationLog}),(0,c.jsx)(ig,{state:o,sessionId:t,t:n}),(0,c.jsxs)("details",{className:h.section,children:[(0,c.jsx)("summary",{children:"\u5BF9\u8BDD\u663E\u793A\u4E0E\u517C\u5BB9\u6027"}),G?.voiceSession&&(0,c.jsx)(Wh,{settings:G,state:o,sessionId:t,run:e.run,t:n},"visibility:"+t+":"+(o.settingsKey??G.revision))]})]})]})]})]})]})}var og=new Intl.DateTimeFormat("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"});function rg({manageSessions:e,openManagedSession:n,renameManagedSession:t,setSessionManagement:o,state:i}){let r=i.sessionManagementRoot??null,[s,a]=(0,R.useState)(null),[l,u]=(0,R.useState)(null),[d,p]=(0,R.useState)(!1),[f,m]=(0,R.useState)(null),[b,g]=(0,R.useState)(null),_=(0,R.useRef)(null),x=(0,R.useCallback)(async(I,{append:A=!1}={})=>{if(!e)return;_.current?.abort();let C=new AbortController;_.current=C,p(!0),m(null);try{I.operation!=="list"&&(await e(I,C.signal),C.signal.aborted||m(I.operation==="restore"?"\u5DF2\u53D6\u6D88\u5F52\u6863\u3002\u53EF\u6253\u5F00\u539F\u4F1A\u8BDD\u7EE7\u7EED\u3002":"\u5DF2\u516C\u5F00\u6B64\u4F1A\u8BDD\u3002"));let P=await e(I.operation==="list"?I:{operation:"list",...r?{rootId:r}:{}},C.signal);if(C.signal.aborted||_.current!==C)return;a(L=>A&&L?{...P,items:[...new Map([...L.items,...P.items].map(U=>[U.id,U])).values()]}:P)}catch(P){C.signal.aborted||m(String(P?.message??"\u65E0\u6CD5\u8BFB\u53D6\u9C7C\u5E94\u4F1A\u8BDD").slice(0,400))}finally{_.current===C&&(_.current=null,p(!1))}},[r,e]);(0,R.useEffect)(()=>(x({operation:"list",...r?{rootId:r}:{}}),()=>{let I=_.current;_.current=null,I?.abort()}),[x,r]);let S=I=>{a(null),u(null),g(null),o({rootId:I,historyOpen:!1})},Z=(I,A)=>{g(null),u({operation:I,id:A.id,rootId:A.rootId})},D=async I=>{try{await n(I)}catch(A){m(String(A?.message??"\u65E0\u6CD5\u5728 DSH \u6253\u5F00\u4F1A\u8BDD").slice(0,400))}},G=async I=>{I.preventDefault();let A=b.title.trim();if(!(!A||d)){p(!0),m(null);try{let C=await t(b.id,A);a(P=>P&&{...P,items:P.items.map(L=>L.id===b.id?{...L,title:C}:L)}),g(null),m("\u5DF2\u4FDD\u5B58\u4F1A\u8BDD\u540D\u79F0\u3002")}catch(C){m(String(C?.message??"\u65E0\u6CD5\u91CD\u547D\u540D\u4F1A\u8BDD").slice(0,400))}finally{p(!1)}}},N=r?s?.items?.find(I=>I.id===r):null,B={restore_unavailable:"\u6062\u590D\u63A5\u53E3\u4E0D\u53EF\u7528",archive_state_unavailable:"\u65E0\u6CD5\u8BFB\u53D6\u5F52\u6863\u72B6\u6001",persistence_unavailable:"\u4F1A\u8BDD\u5B58\u50A8\u6682\u65F6\u4E0D\u53EF\u7528",policy_mismatch:"\u5F53\u524D\u4F1A\u8BDD\u6743\u9650\u4E0E\u539F\u4F1A\u8BDD\u4E0D\u540C",presentation_mismatch:"\u5F53\u524D DSH \u65E0\u6CD5\u786E\u8BA4\u4F1A\u8BDD\u7684\u9690\u85CF\u72B6\u6001",visibility_mismatch:"\u5F53\u524D\u663E\u793A\u8BBE\u7F6E\u4E0E\u539F\u4F1A\u8BDD\u4E0D\u540C"},O=I=>(0,c.jsx)("ul",{className:h.permissionList,children:I.map(A=>(0,c.jsxs)("li",{children:[(0,c.jsx)("strong",{className:h.sessionTitle,children:A.title||(A.kind==="root"?"\u672A\u547D\u540D\u4F1A\u8BDD":"\u672A\u547D\u540D\u5B50\u4EE3\u7406")+" \xB7 "+A.id.slice(-6).toUpperCase()}),(0,c.jsxs)("p",{className:h.hint,children:[A.archived?"\u5DF2\u5F52\u6863":A.visibility==="hidden"?"\u5DF2\u9690\u85CF":A.visibility==="visible"||A.visibility==="workspace"?"\u53EF\u89C1":"\u53EF\u89C1\u6027\u672A\u77E5",B[A.reason]?" \xB7 "+B[A.reason]:""]}),Number.isFinite(A.createdAt)&&(0,c.jsxs)("p",{className:h.hint,children:["\u521B\u5EFA\u4E8E ",(0,c.jsx)("time",{dateTime:new Date(A.createdAt).toISOString(),children:og.format(A.createdAt)})]}),(0,c.jsxs)("div",{className:h.actions,children:[A.kind==="root"&&!r&&(0,c.jsx)(H.Button,{variant:"outline",disabled:d,"data-whale-operation":"show-subagents",onClick:()=>S(A.id),children:"\u67E5\u770B\u5B50\u4EE3\u7406"}),n&&["live","available"].includes(A.status)&&(0,c.jsx)(H.Button,{variant:"outline","data-whale-operation":A.kind==="root"?"open-native-session":"open-native-subagent",onClick:()=>D(A),children:"\u5728 DSH \u6253\u5F00"}),t&&A.kind==="root"&&["live","available","archived"].includes(A.status)&&(0,c.jsx)(H.Button,{variant:"outline",disabled:d,onClick:()=>{u(null),g({id:A.id,title:A.title??""})},children:"\u91CD\u547D\u540D"}),A.canUnhide&&(0,c.jsx)(H.Button,{variant:"outline",disabled:d,onClick:()=>Z("unhide",A),children:"\u53D6\u6D88\u9690\u85CF"}),A.canRestore&&(0,c.jsx)(H.Button,{variant:"outline",disabled:d,onClick:()=>Z("restore",A),children:"\u6062\u590D\u5F52\u6863"})]}),l?.id===A.id&&(0,c.jsxs)("div",{className:h.actions,children:[(0,c.jsx)("span",{children:l.operation==="unhide"?"\u786E\u8BA4\u5728 DSH \u516C\u5F00\u6B64\u4F1A\u8BDD\uFF1F":"\u786E\u8BA4\u53D6\u6D88\u6B64\u4F1A\u8BDD\u7684\u5F52\u6863\uFF1F"}),(0,c.jsx)(H.Button,{variant:"primary",disabled:d,onClick:()=>{let C=l;u(null),x(C)},children:"\u786E\u8BA4"}),(0,c.jsx)(H.Button,{variant:"outline",onClick:()=>u(null),children:"\u53D6\u6D88"})]}),b?.id===A.id&&(0,c.jsxs)("form",{className:h.sessionRename,onSubmit:G,children:[(0,c.jsx)(H.Input,{"aria-label":"\u4F1A\u8BDD\u540D\u79F0",value:b.title,maxLength:128,disabled:d,onChange:C=>g({...b,title:C.target.value})}),(0,c.jsxs)("div",{className:h.actions,children:[(0,c.jsx)(H.Button,{type:"submit",variant:"primary",disabled:d||!b.title.trim(),children:"\u4FDD\u5B58\u540D\u79F0"}),(0,c.jsx)(H.Button,{type:"button",variant:"outline",disabled:d,onClick:()=>g(null),children:"\u53D6\u6D88"})]})]})]},A.id))}),q=(s?.items??[]).filter(I=>I.id!==r),k=q.filter(I=>I.active),z=q.filter(I=>!I.active).sort((I,A)=>(A.createdAt??-1)-(I.createdAt??-1));return(0,c.jsxs)("section",{className:h.section,"data-whale-session-management":!0,children:[r&&(0,c.jsx)(H.Button,{variant:"outline",disabled:d,"data-whale-operation":"show-main-sessions",onClick:()=>S(null),children:"\u8FD4\u56DE\u4E3B\u4F1A\u8BDD"}),d&&!s&&(0,c.jsx)("p",{role:"status",children:"\u6B63\u5728\u8BFB\u53D6\u9C7C\u5E94\u4F1A\u8BDD\u2026"}),f&&(0,c.jsx)("p",{role:"status",className:h.notice,children:f}),N&&O([N]),N?.childrenAvailable&&N?.childrenIncomplete&&(0,c.jsx)("p",{role:"status",children:"\u90E8\u5206\u5B50\u4EE3\u7406\u8BB0\u5F55\u6682\u65F6\u65E0\u6CD5\u6838\u9A8C\u3002\u5F53\u524D\u663E\u793A\u5DF2\u6838\u9A8C\u7684\u4F1A\u8BDD\u3002"}),N&&!N.childrenAvailable&&(0,c.jsx)("p",{role:"status",children:"\u5F53\u524D\u65E0\u6CD5\u8BFB\u53D6\u6B64\u4F1A\u8BDD\u7684\u5B50\u4EE3\u7406\u8BB0\u5F55\u3002"}),N?.childrenAvailable&&!N.childrenIncomplete&&!q.length&&(0,c.jsx)("p",{children:"\u6B64\u4F1A\u8BDD\u8FD8\u6CA1\u6709\u5B50\u4EE3\u7406\u3002"}),k.length>0&&O(k),s&&!r&&k.length===0&&(0,c.jsx)("p",{className:h.hint,children:"\u6682\u65E0\u6D3B\u8DC3\u4F1A\u8BDD\u3002"}),(z.length>0||s?.nextCursor)&&(0,c.jsxs)("details",{className:h.section,"data-whale-session-history":!0,open:i.sessionHistoryOpen===!0,onToggle:I=>{let{open:A}=I.currentTarget;A!==!!i.sessionHistoryOpen&&o({historyOpen:A})},children:[(0,c.jsx)("summary",{"data-whale-operation":r?"subagent-history":"session-history",children:r?"\u5386\u53F2\u5B50\u4EE3\u7406":"\u5386\u53F2\u4F1A\u8BDD"}),O(z),!!s?.nextCursor&&(0,c.jsx)(H.Button,{disabled:d,onClick:()=>{x({operation:"list",cursor:s.nextCursor},{append:!0})},children:"\u52A0\u8F7D\u66F4\u591A"})]}),(0,c.jsx)(H.Button,{variant:"outline",disabled:d,onClick:()=>{x({operation:"list",...r?{rootId:r}:{}})},children:"\u5237\u65B0\u4F1A\u8BDD"}),s?.capabilities?.unhide?.supported===!1&&(0,c.jsx)("p",{className:h.hint,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u65F6\u65E0\u6CD5\u628A\u5B50\u4EE3\u7406\u52A0\u5165\u4FA7\u8FB9\u680F\u3002"}),s?.capabilities?.restore?.supported===!1&&(0,c.jsx)("p",{className:h.hint,children:"\u5F53\u524D DSH \u7248\u672C\u6682\u65F6\u65E0\u6CD5\u901A\u8FC7\u9C7C\u5E94\u53D6\u6D88\u5F52\u6863\u3002"})]})}function ig({state:e,sessionId:n,t}){let o=e.status,i=o?.ownerSessionId,s=!e.uncertain&&e.checkedFor===n&&typeof o?.helper?.lastError=="string"?o.helper.lastError:null,a=e.error??e.enableError;return(0,c.jsxs)("details",{className:h.section,children:[(0,c.jsx)("summary",{children:t("details")}),(0,c.jsxs)("dl",{className:h.details,children:[(0,c.jsx)("dt",{children:t("source")}),(0,c.jsx)("dd",{"data-whale-owner":!0,"data-session-id":i??"",children:i||t("none")}),(0,c.jsx)("dt",{children:t("actor")}),(0,c.jsx)("dd",{"data-whale-actor":!0,"data-session-id":n??"",children:n||t("openSession")})]}),(0,c.jsx)("p",{className:h.hint,children:t("snapshot")}),a&&(0,c.jsx)("pre",{className:h.requestDetails,children:a}),s&&(0,c.jsxs)("div",{"data-whale-helper-error":!0,children:[(0,c.jsx)("strong",{children:t("inputDiagnosticTitle")}),(0,c.jsx)("pre",{className:h.requestDetails,children:s}),(0,c.jsx)("p",{className:h.hint,children:t("inputDiagnosticHistory")})]}),(0,c.jsx)("p",{className:h.hint,children:t("consequence")}),(0,c.jsx)("p",{className:h.hint,children:o?.helper?.online?t("helperOnline"):t("helperOffline")}),o?.turnSignals?.outputStartObservation?.status==="unsupported"&&(0,c.jsx)("p",{className:h.hint,children:t("outputObservationUnavailable")})]})}function sg({state:e,sessionId:n,run:t,openAuthorization:o,active:i=!0}){let r=(0,R.useRef)(null),s=(0,R.useRef)(0);(0,R.useEffect)(()=>{r.current=null,s.current++},[i,n]),(0,R.useEffect)(()=>{if(!i||!n||e.busy||e.agentRequestsFor===n||r.current===n)return;r.current=n;let l=s.current;s.current===l&&t(n,"agent-requests")},[i,n,e.busy]);let a=e.agentRequestsFor===n?e.agentRequests:null;return(0,c.jsxs)("section",{className:h.section,"data-whale-agent-requests":!0,children:[(0,c.jsx)("h3",{children:"Agent \u64CD\u4F5C\u8BB0\u5F55"}),(0,c.jsx)(H.Button,{"data-whale-operation":"page-authorization",onClick:()=>{o?.()},children:"\u6388\u6743\u8303\u56F4\u4E0E\u64A4\u9500"}),(e.agentPermissionUncertain||e.agentRequestUncertain)&&(0,c.jsx)("p",{role:"alert",className:h.notice,children:"\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u4F1A\u81EA\u52A8\u6838\u67E5\u5BF9\u5E94\u6743\u9650\u548C\u8BF7\u6C42\u72B6\u6001\uFF0C\u4E0D\u4F1A\u91CD\u590D\u6267\u884C\u3002"}),a?.items?.length===0&&(0,c.jsx)("p",{className:h.hint,children:"\u6CA1\u6709\u5F85\u5904\u7406\u8BF7\u6C42\u3002"}),a?.items?.map(l=>(0,c.jsxs)("section",{className:h.section,"data-agent-request":l.id,children:[(0,c.jsxs)("strong",{children:[l.title," \xB7 ",l.state]}),(0,c.jsxs)("p",{className:h.hint,children:["\u53D1\u8D77\u4F1A\u8BDD\uFF1A",l.sourceSessionId]}),(0,c.jsxs)("details",{children:[(0,c.jsx)("summary",{children:"\u6838\u5BF9\u5B8C\u6574\u53D8\u66F4\u8BA1\u5212"}),(0,c.jsx)("pre",{className:h.requestDetails,children:JSON.stringify({\u5F53\u524D\u8BBE\u7F6E:l.before,\u8BF7\u6C42:l.request,...l.installPlan?{\u4E0B\u8F7D\u8BA1\u5212:l.installPlan}:{},...l.modelApplyTarget?{\u6A21\u578B\u5E94\u7528\u76EE\u6807:l.modelApplyTarget}:{}},null,2)})]}),l.error&&(0,c.jsx)("p",{role:"alert",className:h.error,children:l.error.message}),l.state==="pending"&&(0,c.jsx)(H.Button,{variant:"outline",disabled:e.busy||e.agentRequestUncertain,onClick:()=>{t(n,"decide-agent-request",{id:l.id,approve:!1,acknowledgements:[]})},children:"\u53D6\u6D88\u9884\u89C8"}),l.nextAction&&(0,c.jsx)("p",{className:h.hint,children:l.nextAction})]},l.id))]})}var Xd={startConversation:"\u5F00\u59CB\u5BF9\u8BDD",endConversation:"\u7ED3\u675F\u5BF9\u8BDD",voiceTarget:"\u6295\u9012\u5230",dedicatedVoiceTarget:"\u9C7C\u5E94\u4E13\u7528\u4F1A\u8BDD",checkingVoiceTarget:"\u6B63\u5728\u6838\u5BF9\u76EE\u6807\u2026",voiceTargetChanged:"\u8BED\u97F3\u6295\u9012\u76EE\u6807\u6709\u53D8\u5316\u3002\u8BF7\u6838\u5BF9\u9996\u9875\u7684\u4F1A\u8BDD\u540E\u518D\u5F00\u59CB\u3002",chooseCurrentDshTarget:"\u4F7F\u7528\u5F53\u524D\u6253\u5F00\u4F1A\u8BDD",backToFishVoice:"\u56DE\u5230\u9C7C\u5E94",currentDshTargetError:"\u65E0\u6CD5\u786E\u8BA4\u5F53\u524D DSH \u5BF9\u8BDD\uFF0C\u8BF7\u6838\u5BF9\u540E\u91CD\u8BD5\u3002",chooseVoiceTarget:"\u9009\u62E9\u6295\u9012\u4F1A\u8BDD",searchVoiceTargets:"\u641C\u7D22\u4F1A\u8BDD\u6807\u9898\u6216 ID",searchVoiceTargetsAction:"\u641C\u7D22",existingVoiceTargetList:"\u5DF2\u6709 DSH \u4F1A\u8BDD",boundVoiceTarget:"\u5F53\u524D\u7ED1\u5B9A",voiceTargetAvailability_ready:"\u53EF\u7528",voiceTargetAvailability_busy:"\u4F1A\u8BDD\u6B63\u5728\u5904\u7406\u6D88\u606F",voiceTargetAvailability_archived:"\u4F1A\u8BDD\u5DF2\u5F52\u6863",voiceTargetAvailability_unavailable:"\u4F1A\u8BDD\u6682\u4E0D\u53EF\u7528",voiceTargetAvailability_managed:"\u9C7C\u5E94\u7BA1\u7406\u7684\u4F1A\u8BDD\uFF0C\u65E0\u6CD5\u76F4\u63A5\u6295\u9012",voiceTargetAvailability_subagent:"\u5B50\u4EE3\u7406\u4F1A\u8BDD\uFF0C\u65E0\u6CD5\u76F4\u63A5\u6295\u9012",voiceTargetNoMatch:"\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684\u4F1A\u8BDD\u3002",voiceTargetEmptyList:"\u6682\u65E0\u53EF\u7ED1\u5B9A\u7684\u4F1A\u8BDD\u3002",voiceTargetSynthesisNotice:"\u4F7F\u7528\u5728\u7EBF\u97F3\u8272\u65F6\uFF0C\u56DE\u7B54\u6587\u5B57\u4F1A\u4EA4\u7ED9\u5DF2\u6388\u6743\u7684\u8BED\u97F3\u5408\u6210\u670D\u52A1\u3002\u82E5\u8981\u79BB\u7EBF\u6717\u8BFB\uFF0C\u53EF\u5728\u300C\u6A21\u578B \u2192 \u6717\u8BFB\u65B9\u5F0F\u300D\u9009\u7528\u672C\u5730\u97F3\u8272\u3002",bindVoiceTarget:"\u7ED1\u5B9A\u9009\u4E2D\u4F1A\u8BDD",savingVoiceTarget:"\u6B63\u5728\u4FDD\u5B58\u2026",moreVoiceTargets:"\u52A0\u8F7D\u66F4\u591A",loadingVoiceTargets:"\u6B63\u5728\u8BFB\u53D6 DSH \u4F1A\u8BDD\u2026",voiceTargetListError:"\u65E0\u6CD5\u8BFB\u53D6 DSH \u4F1A\u8BDD\u3002",retryVoiceTargets:"\u91CD\u8BD5\u8BFB\u53D6",voiceTranscriptCaptions:"\u8BED\u97F3\u5B57\u5E55",retryTranscript:"\u91CD\u53D1",transcriptDelivery_busy:"\u4F1A\u8BDD\u5FD9\uFF0C\u5F85\u53D1\u5230",transcriptDelivery_ready:"\u5F85\u91CD\u53D1\u5230",transcriptDelivery_sending:"\u6B63\u5728\u53D1\u5F80",transcriptDelivery_queued:"\u7B49\u5F85\u4F1A\u8BDD\u63A5\u6536",transcriptDelivery_delivered:"\u5DF2\u53D1\u5230",transcriptDelivery_uncertain:"\u6295\u9012\u5F85\u786E\u8BA4",transcriptDelivery_failed:"\u672A\u53D1\u5230",transcriptDelivery_discarded:"\u5F85\u53D1\u5DF2\u53D6\u6D88",endDiscardsRetries:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u6E05\u7A7A\u5F85\u53D1\u8F6C\u5199\u3002",modeSwitching:"\u6B63\u5728\u5207\u6362\u8BF4\u8BDD\u65B9\u5F0F\u2026",modeSaving:"\u6B63\u5728\u4FDD\u5B58\u8BF4\u8BDD\u65B9\u5F0F\u2026",modeSwitchUnconfirmed:"\u8BF4\u8BDD\u65B9\u5F0F\u66F4\u6539\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u6838\u67E5\u3002",modeSwitchFailed:"\u672A\u80FD\u786E\u8BA4\u66F4\u6539\uFF0C\u8BF7\u67E5\u770B\u5F53\u524D\u65B9\u5F0F\u540E\u518D\u8BD5\u3002",updateTitle:"\u9C7C\u5E94\u66F4\u65B0",updateOfferTitle:"\u9C7C\u5E94\u6709\u65B0\u7248\u672C",updateCurrentVersion:"\u5F53\u524D",updateNewVersion:"\u65B0\u7248",updateChannel_stable:"\u6B63\u5F0F\u7248",updateChannel_preview:"\u9884\u89C8\u7248",updateCheck:"\u68C0\u67E5\u66F4\u65B0",updateDetails:"\u67E5\u770B\u66F4\u65B0",updateLater:"\u7A0D\u540E",updateInstall:"\u4E00\u952E\u66F4\u65B0",updateRelease:"\u53D1\u5E03\u8BF4\u660E",updateFeedback:"\u53CD\u9988\u95EE\u9898",update_idle:"\u6B63\u5728\u8BFB\u53D6\u66F4\u65B0\u72B6\u6001\u2026",update_checking:"\u6B63\u5728\u68C0\u67E5\u66F4\u65B0\u2026",update_current:"\u5DF2\u662F\u6700\u65B0\u7248\u672C\u3002",update_available:"\u53EF\u4EE5\u66F4\u65B0\u3002",update_incompatible:"\u65B0\u7248\u4E0E\u5F53\u524D DSH \u73AF\u5883\u4E0D\u517C\u5BB9\u3002",update_installing:"\u6B63\u5728\u66F4\u65B0\uFF0C\u5BBF\u4E3B\u53EF\u80FD\u4F1A\u91CD\u65B0\u52A0\u8F7D\u9C7C\u5E94\u2026","update_restart-required":"\u66F4\u65B0\u5DF2\u5B89\u88C5\uFF0C\u91CD\u542F DSH \u540E\u751F\u6548\u3002","update_enable-required":"\u66F4\u65B0\u5DF2\u5B89\u88C5\uFF0C\u8BF7\u5728 DSH \u63D2\u4EF6\u7BA1\u7406\u4E2D\u542F\u7528\u9C7C\u5E94\u3002",update_installed:"\u66F4\u65B0\u5DF2\u5B8C\u6210\u3002",update_error:"\u66F4\u65B0\u51FA\u9519\uFF0C\u53EF\u68C0\u67E5\u66F4\u65B0\u540E\u91CD\u8BD5\u3002",update_unsupported:"\u5F53\u524D\u73AF\u5883\u65E0\u6CD5\u81EA\u52A8\u66F4\u65B0\uFF0C\u8BF7\u67E5\u770B\u5B98\u65B9\u53D1\u5E03\u8BF4\u660E\u3002",updateConnection:"\u6682\u65F6\u65E0\u6CD5\u786E\u8BA4\u66F4\u65B0\u72B6\u6001\uFF0C\u8BF7\u5728\u5BBF\u4E3B\u5C31\u7EEA\u540E\u91CD\u65B0\u68C0\u67E5\u3002",audioDevices:"\u97F3\u9891\u8BBE\u5907",audioSystemDefault:"\u7CFB\u7EDF\u9ED8\u8BA4",audioInput:"\u97F3\u9891\u8F93\u5165",audioOutput:"\u97F3\u9891\u8F93\u51FA",inputDeviceMissing:"\u9EA6\u514B\u98CE\u672A\u8FDE\u63A5\uFF0C\u5DF2\u4FDD\u7559\u9009\u62E9",outputDeviceMissing:"\u8F93\u51FA\u672A\u8FDE\u63A5\uFF0C\u4E0D\u4F1A\u5207\u5230\u5176\u4ED6\u8BBE\u5907",deviceDisconnected:"\u672A\u8FDE\u63A5",inputDeviceStopFirst:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5207\u6362\u8F93\u5165\u3002\u8F93\u51FA\u5728\u4E0B\u4E00\u6BB5\u64AD\u653E\u751F\u6548\u3002",outputDeviceUnsupported:"\u6B64\u73AF\u5883\u6682\u4E0D\u652F\u6301\u9009\u62E9\u6717\u8BFB\u8F93\u51FA\u8BBE\u5907\u3002",deviceListRetry:"\u8BBE\u5907\u5217\u8868\u6682\u4E0D\u53EF\u7528\uFF0C\u6253\u5F00\u4E0B\u62C9\u83DC\u5355\u53EF\u91CD\u8BD5\u3002",voiceHelperCleanupHint:"\u6B63\u5728\u786E\u8BA4\u9EA6\u514B\u98CE\u5DF2\u91CA\u653E\uFF0C\u786E\u8BA4\u524D\u4E0D\u4F1A\u5F00\u542F\u65B0\u7684\u5F55\u97F3\u3002",voiceHelperRestartHint:"\u9EA6\u514B\u98CE\u670D\u52A1\u9000\u51FA\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u91CD\u542F DSH \u540E\u518D\u70B9\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u3002",inputError_device:"\u9EA6\u514B\u98CE\u4E0D\u53EF\u7528",inputError_recognition:"\u8BED\u97F3\u8BC6\u522B\u5931\u8D25","inputError_no-speech":"\u6CA1\u542C\u6E05\uFF0C\u8BF7\u518D\u8BF4\u4E00\u6B21",inputHelp_device:"\u8BF7\u68C0\u67E5\u9EA6\u514B\u98CE\u8FDE\u63A5\u4E0E\u6743\u9650\u3002\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5728\u8BBE\u7F6E\u4E2D\u9009\u8BBE\u5907\u3002\u8BE6\u60C5\u89C1\u300C\u9AD8\u7EA7\u300D\u3002",inputDiagnosticTitle:"\u6700\u8FD1\u4E00\u6B21\u97F3\u9891\u9519\u8BEF",inputDiagnosticHistory:"\u8FD9\u662F\u6700\u8FD1\u4E00\u6B21\u8BB0\u5F55\uFF0C\u53EF\u80FD\u6765\u81EA\u4E4B\u524D\u7684\u5C1D\u8BD5\uFF1B\u4E0D\u4EE3\u8868\u5F53\u524D\u8BBE\u5907\u72B6\u6001\u3002",inputHelp_recognition:"\u8BF7\u91CD\u8BD5\u3002\u4ECD\u5931\u8D25\u65F6\uFF0C\u7ED3\u675F\u5BF9\u8BDD\u540E\u5728\u8BBE\u7F6E\u4E2D\u68C0\u67E5\u8BC6\u522B\u6A21\u578B\u3002","inputHelp_no-speech":"\u8BF7\u9760\u8FD1\u9EA6\u514B\u98CE\u91CD\u8BD5\uFF0C\u5E76\u68C0\u67E5\u662F\u5426\u9759\u97F3\u3002",speechFailed:"\u6717\u8BFB\u5931\u8D25",speechInterrupted:"\u6717\u8BFB\u5DF2\u4E2D\u65AD",wakeFallbackHint:"\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\u3002\u76EE\u524D\u6309\u8F6C\u5199\u5339\u914D\u3002\u5207\u6362\u6A21\u5F0F\u540E\u518D\u9009\u300C\u5524\u9192\u8BCD\u300D\u53EF\u91CD\u8BD5\u58F0\u97F3\u5339\u914D\u3002",wakeMode:"\u5524\u9192\u8BCD",switchToWake:"\u70B9\u6309\u5207\u5230\u5524\u9192\u8BCD\u6A21\u5F0F\uFF0C\u9EA6\u514B\u98CE\u5C06\u7B49\u5F85\u8BBE\u5B9A\u79F0\u547C",wakeDisabled:"\u5524\u9192\u76D1\u542C\u672A\u5F00\u542F",wakeStarting:"\u6B63\u5728\u542F\u52A8\u5524\u9192\u76D1\u542C\u2026",wakeWaiting:"\u7B49\u5F85\u5524\u9192\u8BCD",wakeListening:"\u6B63\u5728\u542C\u4E0B\u4E00\u53E5",wakePaused:"\u5524\u9192\u76D1\u542C\u5DF2\u6682\u505C",wakeError:"\u5524\u9192\u76D1\u542C\u4E0D\u53EF\u7528\uFF0C\u8BF7\u67E5\u770B\u8BBE\u7F6E",wakeHint:"\u5148\u53EB\u8BBE\u5B9A\u79F0\u547C\uFF0C\u518D\u8BF4\u6307\u4EE4\u3002\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u76D1\u542C\u3002",wakeMethod:"\u77ED\u53E5\u7ED3\u675F\u540E\u5728\u672C\u673A\u6BD4\u8F83\u79F0\u547C\u7684\u58F0\u97F3\u548C\u8F6C\u5199\u3002",wakeAliases:"\u5524\u9192\u79F0\u547C",wakeAliasesHint:"\u6700\u591A8\u4E2A\uFF0C\u9017\u53F7\u5206\u9694\uFF1B\u4E2D\u6587\u652F\u6301\u53E5\u9996\u8FD1\u97F3\uFF0C\u5EFA\u8BAE\u7528\u72EC\u7279\u76843\u5B57\u4EE5\u4E0A\u79F0\u547C\u3002",wakeTimeout:"\u5524\u9192\u540E\u7B49\u5F85\uFF08\u79D2\uFF09",wakeSettings:"\u5524\u9192\u8BCD\u8BBE\u7F6E",wakeStopToEdit:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u79F0\u547C\u548C\u7B49\u5F85\u65F6\u95F4\u3002",wakeInvalid:"\u8BF7\u586B1\u20138\u4E2A\u6709\u6548\u79F0\u547C\uFF0C\u7B49\u5F85\u65F6\u95F4\u4E3A3\u201330\u79D2\u3002",switchToPtt:"\u70B9\u6309\u5207\u56DE\u6309\u4F4F\u8BF4\u8BDD",switchToAlways:"\u70B9\u6309\u5207\u5230\u81EA\u7531\u9EA6\uFF0C\u9EA6\u514B\u98CE\u5C06\u6301\u7EED\u8046\u542C",quickSpeedStop:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5207\u6362\u901F\u5EA6",performanceReadFirst:"\u5148\u68C0\u67E5\u5F53\u524D\u6A21\u578B\u652F\u6301\u54EA\u4E9B\u901F\u5EA6\u3002",performanceUnavailable:"\u63D0\u4F9B\u5546\u5DF2\u660E\u786E\u62D2\u7EDD\u7070\u8272\u6863\u4F4D\u7684\u601D\u8003\u53C2\u6570\uFF1B\u5176\u4ED6\u6863\u4F4D\u4ECD\u53EF\u9009\u62E9\u3002",performanceProbeCost:"\u52A0\u8F7D\u65F6\u7528\u6700\u591A 3 \u4E2A\u56FA\u5B9A\u77ED\u8BF7\u6C42\u68C0\u6D4B\u6863\u4F4D\uFF0C\u6309\u6A21\u578B\u8BA1\u8D39\u3002",performanceProbeScope:"\u53EA\u6709\u63D0\u4F9B\u53EF\u68C0\u6D4B\u63A5\u53E3\u7684\u6A21\u578B\u8DEF\u7EBF\u4F1A\u53D1\u9001\u77ED\u8BF7\u6C42\uFF0C\u539F\u751F\u652F\u6301\u7684\u6863\u4F4D\u53EF\u76F4\u63A5\u67E5\u770B\u3002",performanceProbeUnknown:"\u90E8\u5206\u6863\u4F4D\u6682\u672A\u786E\u8BA4\u3002\u53EF\u68C0\u67E5\u7F51\u7EDC\u6216\u767B\u5F55\u540E\u91CD\u65B0\u68C0\u6D4B\u3002",performanceProbeAccepted:"\u6863\u4F4D\u8BF7\u6C42\u68C0\u6D4B\u901A\u8FC7\u3002",performanceProbePending:"\u6B63\u5728\u68C0\u67E5\u5F53\u524D\u6A21\u578B\u7684\u6863\u4F4D\u2026",holdToSpeak:"\u8BF4\u8BDD\u65F6\u6309\u4F4F",alwaysWarning:"\u81EA\u7531\u9EA6\u4F1A\u6301\u7EED\u542C\u53D6\u8BED\u97F3\u3002\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u76D1\u542C\u3002",bindingMissing:"\u672A\u7ED1\u5B9A\u8BF4\u8BDD\u6309\u952E\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u4E2D\u7ED1\u5B9A\uFF0C\u6216\u5207\u6362\u6301\u7EED\u8046\u542C\u3002",noSession:"\u8FD8\u6CA1\u6709\u6253\u5F00\u5BF9\u8BDD",otherWindow:"\u9EA6\u514B\u98CE\uFF1A\u53E6\u4E00\u4E2A\u7A97\u53E3",readingStatus:"\u6B63\u5728\u8BFB\u53D6\uFF0C\u4E0D\u4F1A\u542F\u52A8\u9EA6\u514B\u98CE\u6216\u6A21\u578B\u3002",statusRetry:"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u72B6\u6001\u3002\u8FD4\u56DE\u7A97\u53E3\u65F6\u4F1A\u81EA\u52A8\u6838\u67E5\u3002",retryStatus:"\u91CD\u65B0\u8BFB\u53D6\u72B6\u6001",collapseHint:"\u6536\u8D77\u540E\u4F1A\u7EE7\u7EED\u5BF9\u8BDD",stopConsequence:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u91CA\u653E\u9EA6\u514B\u98CE\u5E76\u505C\u6B62\u672C\u6B21\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u3002",transferTitle:"\u63A5\u7BA1\u53E6\u4E00\u4E2A\u7A97\u53E3\u7684\u9EA6\u514B\u98CE\uFF1F",transferWarning:"\u8FD9\u4F1A\u4E2D\u65AD\u53E6\u4E00\u4E2A\u7A97\u53E3\u7684\u8BED\u97F3\uFF0C\u5E76\u53EF\u80FD\u7ED3\u675F\u5B83\u7684\u540E\u53F0\u4EFB\u52A1\u3002",cancel:"\u53D6\u6D88",confirmTransfer:"\u786E\u8BA4\u63A5\u7BA1",bindingStopRequired:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u9F20\u6807\u6216\u952E\u76D8\u6309\u952E\u3002",bindingFinishing:"\u8BED\u97F3\u6B63\u5728\u505C\u6B62\uFF0C\u8BF7\u7A0D\u5019\u518D\u4FEE\u6539\u6309\u952E\u3002",headphonesRequired:"\u5148\u52FE\u9009\u201C\u6211\u5DF2\u4F7F\u7528\u8033\u673A\u201D\uFF0C\u624D\u80FD\u5F00\u542F\u81EA\u52A8\u6253\u65AD\u3002",deviceManualIndex:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u5E8F\u53F7",deviceManualName:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u540D\u79F0",deviceIndexInvalid:"\u8BBE\u5907\u5E8F\u53F7\u9700\u8981\u662F\u975E\u8D1F\u6574\u6570\u3002",deviceDefault:"\u4F7F\u7528\u7CFB\u7EDF\u9ED8\u8BA4\u9EA6\u514B\u98CE",deviceManual:"\u9AD8\u7EA7\uFF1A\u624B\u52A8\u586B\u540D\u79F0\u6216\u5E8F\u53F7",deviceSaved:"\u5DF2\u4FDD\u5B58\u7684\u8BBE\u5907",deviceEmpty:"\u97F3\u9891\u670D\u52A1\u6CA1\u6709\u627E\u5230\u9EA6\u514B\u98CE\u3002\u8BF7\u8FDE\u63A5\u8BBE\u5907\u5E76\u68C0\u67E5\u7CFB\u7EDF\u58F0\u97F3\u8BBE\u7F6E\u3002",deviceUnknown:"\u5F00\u59CB\u5BF9\u8BDD\u540E\u4F1A\u5217\u51FA\u68C0\u6D4B\u5230\u7684\u8BBE\u5907\u3002\u73B0\u5728\u53EF\u4F7F\u7528\u7CFB\u7EDF\u9ED8\u8BA4\uFF0C\u6216\u5728\u9AD8\u7EA7\u9009\u9879\u624B\u52A8\u586B\u5199\u3002",ttsBackend:"\u8BED\u97F3\u5408\u6210\u540E\u7AEF",ttsBackendHint:"\u58F0\u97F3\u7531\u5DF2\u5B89\u88C5\u7684 TTS \u540E\u7AEF\u63D0\u4F9B\uFF0C\u9700\u5728\u8BE5\u540E\u7AEF\u5B8C\u6210\u914D\u7F6E\u3002\u72EC\u7ACB\u97F3\u91CF\u4EC5\u5728\u9A8C\u8BC1\u652F\u6301\u65F6\u663E\u793A\u3002",ttsBackendPending:"\u66F4\u591A\u540E\u7AEF\u9009\u62E9\u6B63\u5728\u9002\u914D\uFF0C\u5F53\u524D\u4E0D\u4F1A\u81EA\u52A8\u63A5\u5165\u4E91\u670D\u52A1\u3002",voiceClone:"\u58F0\u97F3\u514B\u9686",voiceCloneAvailable:"Qwen \u652F\u6301\u672C\u5730\u53C2\u8003\u97F3\u8272\uFF0C\u53EF\u5728\u6717\u8BFB\u65B9\u5F0F\u7684\u97F3\u8272\u8BBE\u7F6E\u4E2D\u9009\u62E9 WAV\u3002",voiceClonePrivacy:"\u4EC5\u8BFB\u53D6\u4F60\u9009\u62E9\u4E14\u6709\u6743\u4F7F\u7528\u7684\u58F0\u97F3\u6837\u672C\uFF0C\u4E0D\u4E0A\u4F20\u3002",inputActive:"\u6B63\u5728\u63A5\u6536\u8BED\u97F3",modeUnknown:"\u542C\u53D6\u65B9\u5F0F\u672A\u77E5",voiceInputUnavailable:"\u5F55\u97F3\u6682\u4E0D\u53EF\u7528",voiceInputRecoveryHint:"\u8BED\u97F3\u670D\u52A1\u5DF2\u4E2D\u65AD\u3002\u8BF7\u7ED3\u675F\u5BF9\u8BDD\u540E\u91CD\u65B0\u5F00\u59CB\u3002",searchHistory:"\u641C\u7D22\u4F1A\u8BDD",searchScope:"\u641C\u7D22\u5DF2\u8F7D\u5165\u7684\u4F1A\u8BDD",noMatches:"\u6CA1\u6709\u5339\u914D\u7684\u4F1A\u8BDD",differentOwner:"\u9EA6\u514B\u98CE\u5728\u53E6\u4E00\u4E2A\u7A97\u53E3\u4F7F\u7528\u3002\u9700\u8981\u65F6\u53EF\u660E\u786E\u63A5\u7BA1\u3002",details:"\u8BCA\u65AD\u8BE6\u60C5",noReply:"\u8FD8\u6CA1\u6709\u5BF9\u8BDD",newChatCreated:"\u5DF2\u65B0\u5EFA\u4F1A\u8BDD",newChatActive:"\u65B0\u5EFA\u8BED\u97F3\u4F1A\u8BDD\u3002\u5F53\u524D\u4F1A\u8BDD\u7684\u540E\u53F0\u4EFB\u52A1\u4F1A\u505C\u6B62\uFF0C\u8BB0\u5F55\u4F1A\u4FDD\u7559\u3002",newChatOtherOwner:"\u8BF7\u5728\u5F53\u524D\u8BED\u97F3\u4F1A\u8BDD\u6216\u5F00\u542F\u9EA6\u514B\u98CE\u7684\u7A97\u53E3\u4E2D\u65B0\u5EFA\u3002",recentConversation:"\u5BF9\u8BDD",recentTenTurns:"\u6700\u8FD1 10 \u8F6E",allRecords:"\u5168\u90E8\u8BB0\u5F55",showAllRecords:"\u5C55\u5F00\u5168\u90E8",collapseToTen:"\u6536\u8D77\u81F3 10 \u8F6E",collapseConversation:"\u6536\u8D77\u5BF9\u8BDD",currentVoiceRecords:"\u5F53\u524D\u8BED\u97F3\u804A\u5929",historyTruncated:"\u5DF2\u5207\u6362\u663E\u793A\u533A\u95F4\uFF0C\u539F\u8BB0\u5F55\u4ECD\u4FDD\u7559",viewConversation:"\u67E5\u770B\u8BED\u97F3\u8BB0\u5F55",loadEarlier:"\u52A0\u8F7D\u66F4\u65E9\u8BB0\u5F55",readingHistory:"\u6B63\u5728\u8BFB\u53D6\u8BB0\u5F55\u2026",retryHistory:"\u8BFB\u53D6\u8BB0\u5F55\u5931\u8D25\uFF0C\u70B9\u51FB\u91CD\u8BD5",noConversation:"\u8FD8\u6CA1\u6709\u5BF9\u8BDD",newMessages:"\u6761\u65B0\u6D88\u606F",conversationMessages:"\u8BED\u97F3\u5BF9\u8BDD\u8BB0\u5F55",assistantName:"\u52A9\u624B\u79F0\u547C",renameAssistant:"\u70B9\u51FB\u6539\u540D\uFF0CEnter \u4FDD\u5B58\uFF0CEsc \u53D6\u6D88",compact_off:"\u672A\u5F00\u542F",compact_standby:"\u5F85\u673A",compact_listening:"\u8046\u542C\u4E2D",compact_pending:"\u5904\u7406\u4E2D",compact_unknown:"\u5F85\u68C0\u67E5",you:"\u4F60",assistant:"\u52A9\u624B",close:"\u5173\u95ED\u9762\u677F",keyboardBinding:"\u952E\u76D8\u6309\u4F4F\u8BF4\u8BDD",bindingOff:"\u672A\u7ED1\u5B9A",saveBindings:"\u4FDD\u5B58\u6309\u952E",discardBindings:"\u53D6\u6D88\u4FEE\u6539",bindingCapture:"\u6309\u4E0B\u8981\u7ED1\u5B9A\u7684\u952E\uFF08Esc \u53D6\u6D88\uFF09",clearBinding:"\u6E05\u9664\u7ED1\u5B9A",bindingUnsupported:"\u4E0D\u652F\u6301\u8BE5\u6309\u952E\u6216\u7CFB\u7EDF\u7EC4\u5408\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u3002",bindingGlobalHint:"Windows \u5168\u5C40\u5FEB\u6377\u952E\u3002\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u5F55\u5165\uFF0C\u4FDD\u5B58\u540E\u4E0B\u6B21\u5F00\u59CB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002\u6309\u952E\u4E0D\u4F1A\u88AB\u62E6\u622A\uFF0C\u53EF\u80FD\u540C\u65F6\u89E6\u53D1\u5176\u4ED6\u5E94\u7528\u7684\u5FEB\u6377\u64CD\u4F5C\u3002",bindingUnavailable:"\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301\u5168\u5C40\u6309\u952E\u7ED1\u5B9A\u3002",bindingPrintableWarning:"\u5355\u72EC\u4F7F\u7528\u6587\u5B57\u3001\u6570\u5B57\u6216\u7A7A\u683C\u952E\u4F1A\u5728\u5176\u4ED6\u5E94\u7528\u8F93\u5165\u65F6\u89E6\u53D1\u6309\u952E\u8BF4\u8BDD\u3002",performanceTitle:"\u56DE\u7B54\u901F\u5EA6",performanceHint:"\u4E0B\u6B21\u5F00\u59CB\u9C7C\u5E94\u72EC\u7ACB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002\u7ED1\u5B9A\u539F\u4F1A\u8BDD\u65F6\uFF0C\u5728\u8BE5 DSH \u5BF9\u8BDD\u7684\u6A21\u578B\u83DC\u5355\u91CC\u8C03\u6574\u601D\u8003\u6863\u4F4D\u3002",inspectPerformance:"\u68C0\u67E5\u53EF\u7528\u901F\u5EA6",performance_fast:"\u5FEB",performanceNoThinking:"\u65E0\u601D\u8003",performanceRecommended:"[\u63A8\u8350]",performanceFastHint:"\u5FEB\u6863\u4F1A\u660E\u786E\u8BF7\u6C42\u5173\u95ED\u601D\u8003\u3002",performanceFastUnavailable:"\u5F53\u524D\u6A21\u578B\u8DEF\u7EBF\u65E0\u6CD5\u786E\u8BA4\u5173\u95ED\u601D\u8003\u3002\u53EF\u9009\u300C\u8DDF\u968F\u6A21\u578B\u300D\uFF0C\u6216\u5728\u6A21\u578B\u8BBE\u7F6E\u4E2D\u66F4\u6362\u652F\u6301\u65E0\u601D\u8003\u7684\u5BF9\u8BDD\u6A21\u578B\u3002",performanceHostUnavailable:"\u5F53\u524D\u6A21\u578B\u8DEF\u7EBF\u672A\u63D0\u4F9B\u90E8\u5206\u601D\u8003\u6863\u4F4D\u3002",performance_balanced:"\u6807\u51C6",performance_high:"\u4ED4\u7EC6",performance_compatibility:"\u8DDF\u968F\u6A21\u578B",performanceStopRequired:"\u7ED3\u675F\u5BF9\u8BDD\u540E\u53EF\u4FEE\u6539\u56DE\u7B54\u901F\u5EA6\u3002\u5F53\u524D\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u4F1A\u505C\u6B62\u3002",savePerformance:"\u4FDD\u5B58\u56DE\u7B54\u901F\u5EA6",outputVolume:"\u52A9\u624B\u8BED\u97F3\u97F3\u91CF",outputVolumeHint:"\u4EC5\u8C03\u6574\u5DF2\u5B89\u88C5\u7684 Windows dsh-speak \u540E\u7AEF\uFF0C\u4E0D\u4EE3\u8868\u5F53\u524D\u8BED\u97F3\u8DEF\u7531\u6B63\u5728\u4F7F\u7528\u5B83\uFF1B\u4E0D\u5F71\u54CD DSTuber\u3001\u7CFB\u7EDF\u603B\u97F3\u91CF\u6216\u63D0\u793A\u97F3\u3002\u4E0B\u4E00\u6BB5\u8F93\u51FA\u751F\u6548\u3002",readOutputVolume:"\u8BFB\u53D6\u8BED\u97F3\u97F3\u91CF",saveOutputVolume:"\u4FDD\u5B58\u8BED\u97F3\u97F3\u91CF",outputVolumeUnavailable:"\u5F53\u524D\u8BED\u97F3\u540E\u7AEF\u4E0D\u652F\u6301\u72EC\u7ACB\u97F3\u91CF\u8C03\u8282\u3002",outputVolumeUnknown:"\u97F3\u91CF\u4FDD\u5B58\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u4F1A\u81EA\u52A8\u6838\u67E5\uFF0C\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002",settingsTitle:"\u9C7C\u5E94\u8BBE\u7F6E",settingsSections:"\u8BBE\u7F6E\u5206\u7C7B",tab_audio:"\u97F3\u9891",tab_interaction:"\u4EA4\u4E92",tab_prompt:"\u63D0\u793A\u8BCD",voicePromptLabel:"\u81EA\u5B9A\u4E49\u63D0\u793A\u8BCD",voicePromptOptional:"\uFF08\u53EF\u9009\uFF09",voicePromptAgents:"\u8DDF\u968F AGENTS",voicePromptCustom:"\u5DF2\u9644\u52A0\u81EA\u5B9A\u4E49",voicePromptPlaceholder:`\u4F8B\u5982\uFF1A\u7528\u4E2D\u6587\u56DE\u590D\uFF0C\u5148\u8BF4\u7ED3\u8BBA\uFF0C\u8BED\u6C14\u81EA\u7136\u3002

\u5185\u5BB9\u4F1A\u9644\u52A0\u5728 AGENTS \u540E\u3002\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u8BBE\u7F6E\u3002`,voicePromptStopToEdit:"\u505C\u6B62\u8BED\u97F3\u540E\u53EF\u7F16\u8F91",voicePromptUnsupported:"\u5F53\u524D DSH \u6682\u4E0D\u652F\u6301\u81EA\u5B9A\u4E49\u63D0\u793A\u8BCD\u3002",voicePromptTooLong:"\u63D0\u793A\u8BCD\u4E0D\u80FD\u8D85\u8FC7 32,768 \u4E2A\u5B57\u7B26\u3002",voicePromptSaving:"\u4FDD\u5B58\u4E2D\u2026",voicePromptCancel:"\u53D6\u6D88\u4FEE\u6539",voicePromptSave:"\u4FDD\u5B58",voicePromptSaved:"\u5DF2\u4FDD\u5B58\uFF0C\u4E0B\u6B21\u5F00\u542F\u8BED\u97F3\u65F6\u751F\u6548\u3002",voicePromptSaveFailed:"\u4FDD\u5B58\u672A\u6210\u529F\uFF0C\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002",voicePromptUnsaved:"\u5C1A\u672A\u4FDD\u5B58",tab_models:"\u6A21\u578B",tab_advanced:"\u9AD8\u7EA7",projectInfoTitle:"\u5173\u4E8E\u9C7C\u5E94",projectAuthor:"\u4F5C\u8005",projectRepository:"\u5B98\u65B9\u4ED3\u5E93",projectNpm:"npm \u53D1\u5E03\u9875",tab_sessions:"\u4F1A\u8BDD\u7BA1\u7406",settingsContent:"\u8BBE\u7F6E\u5185\u5BB9",voiceCleanupPending:"\u6B63\u5728\u91CA\u653E\u65E7\u97F3\u9891\u670D\u52A1",voiceCleanupHint:"\u7B49\u5F85\u65E7\u4F1A\u8BDD\u548C\u5F55\u97F3\u9000\u51FA\uFF0C\u5B8C\u6210\u540E\u4F1A\u81EA\u52A8\u66F4\u65B0\u3002",voiceRestartPending:"\u9700\u8981\u91CD\u542F DSH",voiceRestartHint:"\u65E7\u7248\u97F3\u9891\u670D\u52A1\u7684\u9000\u51FA\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u91CD\u542F DSH \u540E\u518D\u70B9\u300C\u5F00\u59CB\u5BF9\u8BDD\u300D\u3002\u5DF2\u4FDD\u5B58\u7684\u6388\u6743\u4E0D\u53D8\u3002",voiceRootRestartHint:"\u65E7\u8BED\u97F3\u4F1A\u8BDD\u7684\u505C\u6B62\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u5B8C\u6574\u9000\u51FA\u5E76\u91CD\u65B0\u6253\u5F00 DSH\u3002",voiceStopPending:"\u8BED\u97F3\u5C1A\u672A\u786E\u8BA4\u505C\u6B62",voiceStopHint:"\u8BF7\u91CD\u65B0\u8BFB\u53D6\u8BED\u97F3\u72B6\u6001\uFF0C\u786E\u8BA4\u505C\u6B62\u540E\u518D\u5F00\u59CB\u5BF9\u8BDD\u3002",voiceTargetOccupied:"\u4E0A\u6B21\u7684\u8BED\u97F3\u4F1A\u8BDD\u6B63\u5728 DSH \u4E2D\u6253\u5F00\u3002\u53EF\u4EE5\u65B0\u5EFA\u9C7C\u5E94\u4F1A\u8BDD\uFF0C\u6216\u9009\u62E9\u8981\u7EE7\u7EED\u7684 DSH \u5BF9\u8BDD\u3002",voiceRecoveryPending:"\u65E7\u8BED\u97F3\u4F1A\u8BDD\u5C1A\u672A\u9000\u51FA",voiceRecoveryCheck:"\u6838\u67E5\u5E76\u505C\u6B62",voiceRecoveryHint:"\u65E7\u5B9E\u4F8B\u4ECD\u5728\u9000\u51FA\uFF0C\u8BF7\u5148\u6838\u67E5\u505C\u6B62\u3002\u82E5\u4E00\u76F4\u672A\u9000\u51FA\uFF0C\u8BF7\u5B8C\u6574\u9000\u51FA\u5E76\u91CD\u65B0\u6253\u5F00 DSH\u3002",operationUnavailable:"\u64CD\u4F5C\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\uFF1B\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002\u8BE6\u60C5\u89C1\u9AD8\u7EA7\u8BBE\u7F6E\u3002",enableFailed:"\u65E0\u6CD5\u5F00\u59CB\u5BF9\u8BDD\u3002\u8BF7\u5728\u8BBE\u7F6E\u7684\u300C\u9AD8\u7EA7\u300D\u67E5\u770B\u539F\u56E0\u540E\u91CD\u8BD5\u3002",tab_pets:"\u684C\u5BA0",planned:"\u8BA1\u5212\u5F00\u53D1\u4E2D",configurationUnknown:"\u914D\u7F6E\u4FDD\u5B58\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\uFF1B\u6838\u5B9E\u524D\u4E0D\u80FD\u7EE7\u7EED\u4FEE\u6539\u3002",motionTitle:"\u754C\u9762\u52A8\u753B",motion_spring:"Q \u5F39",motion_firm:"\u786C\u6717",motion_off:"\u5173\u95ED\u52A8\u753B",motionHint:"\u7ACB\u5373\u9884\u89C8\u5E76\u4FDD\u5B58\uFF1B\u64CD\u4F5C\u4E0D\u7B49\u5F85\u52A8\u753B\u3002\u7CFB\u7EDF\u51CF\u5C11\u52A8\u6001\u6548\u679C\u4F18\u5148\u3002",motionNotSaved:"\u672C\u6B21\u9884\u89C8\u5DF2\u5E94\u7528\uFF0C\u4F46\u6B64\u6D4F\u89C8\u5668\u65E0\u6CD5\u4FDD\u5B58\u52A8\u753B\u504F\u597D\u3002",modeControlPending:"\u8BED\u97F3\u63A7\u5236\u5C1A\u672A\u5B8C\u6210\u6216\u72B6\u6001\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\u3002",capabilityTitle:"\u5BF9\u8BDD\u5728\u4FA7\u680F\u4E2D\u7684\u663E\u793A",supported:"\u53EF\u7528",unsupported:"\u4E0D\u53EF\u7528\u6216\u5C1A\u672A\u786E\u8BA4",hiddenMode:"\u4E0D\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD",workspaceMode:"\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD",taskCapability:"\u540E\u53F0\u4EFB\u52A1\u652F\u6301",configuredMode:"\u5DF2\u4FDD\u5B58\u6A21\u5F0F",currentVoiceMode:"\u5F53\u524D\u5BF9\u8BDD\u7684\u5B9E\u9645\u6A21\u5F0F",noActiveVoice:"\u6CA1\u6709\u8FD0\u884C\u4E2D\u7684\u5BF9\u8BDD",chooseVisibility:"\u9009\u62E9\u663E\u793A\u6A21\u5F0F",workspaceWarning:"\u5728\u4FA7\u680F\u663E\u793A\u5BF9\u8BDD\u4F1A\u628A\u5BF9\u8BDD\u663E\u793A\u5728\u666E\u901A\u5DE5\u4F5C\u533A\u4E2D\u3002\u9690\u85CF\u6A21\u5F0F\u4E0D\u53EF\u7528\u65F6\u4ECD\u4F1A\u62D2\u7EDD\u542F\u52A8\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u6539\u4E3A\u53EF\u89C1\u3002",visibilityNoMigration:"\u6B64\u8BBE\u7F6E\u7528\u4E8E\u540E\u7EED\u5BF9\u8BDD\uFF1B\u5DF2\u6709\u5BF9\u8BDD\u4FDD\u6301\u539F\u663E\u793A\u65B9\u5F0F\u3002",modeReadFirst:"\u6B63\u5728\u6838\u67E5\u5F53\u524D\u5BF9\u8BDD\u7684\u914D\u7F6E\u548C\u72B6\u6001\uFF0C\u786E\u8BA4\u540E\u53EF\u4FEE\u6539\u6A21\u5F0F\u3002",closeBeforeMode:"\u8BF7\u5148\u5173\u95ED\u8BED\u97F3\uFF0C\u786E\u8BA4\u5B8C\u5168\u505C\u6B62\u540E\u53EF\u4FEE\u6539\u663E\u793A\u6A21\u5F0F\u3002",saveWorkspace:"\u4FDD\u5B58\u5DE5\u4F5C\u533A\u53EF\u89C1\u6A21\u5F0F",saveHidden:"\u4FDD\u5B58\u9690\u85CF\u6A21\u5F0F",visibilityUnknownWrite:"\u663E\u793A\u6A21\u5F0F\u5199\u5165\u7ED3\u679C\u672A\u786E\u8BA4\uFF0C\u6B63\u5728\u81EA\u52A8\u6838\u67E5\u3002\u6838\u5B9E\u524D\u4E0D\u80FD\u7EE7\u7EED\u4FEE\u6539\uFF0C\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002",outputObservationUnavailable:"\u5C1A\u672A\u63A5\u5165\u771F\u5B9E\u64AD\u97F3\u5F00\u59CB\u4E8B\u4EF6\uFF0C\u65E0\u6CD5\u786E\u8BA4\u6B63\u5728\u64AD\u97F3",title:"\u9C7C\u5E94",description:"\u8BED\u97F3\u63A7\u5236\u3001\u97F3\u9891\u8BBE\u7F6E\u4E0E\u72EC\u7ACB\u5BF9\u8BDD\u3002",drag:"\u79FB\u52A8\u9C7C\u5E94\u60AC\u6D6E\u7A97",dragHint:"\u7528\u9F20\u6807\u62D6\u52A8\u7A7A\u767D\u533A\u57DF\u79FB\u52A8\uFF1B\u6309\u94AE\u548C\u8F93\u5165\u6846\u6B63\u5E38\u64CD\u4F5C",collapse:"\u6536\u8D77",reopen:"\u6253\u5F00\u9C7C\u5E94",refresh:"\u5237\u65B0\u72B6\u6001",settings:"\u8BBE\u7F6E",unknown:"\u6B63\u5728\u8BFB\u53D6\u72B6\u6001\u2026",enabled:"\u9EA6\u514B\u98CE\uFF1A\u5DF2\u5F00\u542F",disabled:"\u9EA6\u514B\u98CE\uFF1A\u672A\u5F00\u542F",identity:"\u5B8C\u6574\u4F1A\u8BDD\u6807\u8BC6",source:"\u6388\u6743\u6765\u6E90",actor:"\u64CD\u4F5C\u4F1A\u8BDD",none:"\u65E0",openSession:"\u5148\u5728 DSH \u4FA7\u680F\u65B0\u5EFA\u6216\u6253\u5F00\u4E00\u4E2A\u5BF9\u8BDD\uFF0C\u518D\u56DE\u5230\u9C7C\u5E94\u3002",enable:"\u5F00\u9EA6",transfer:"\u8BA9\u8FD9\u4E2A\u7A97\u53E3\u63A5\u7BA1\u9EA6\u514B\u98CE",disable:"\u5173\u9EA6",stale:"\u72B6\u6001\u6682\u65F6\u8BFB\u4E0D\u5230",snapshot:"\u4E0A\u6B21\u8BFB\u53D6\u7684\u72B6\u6001",consequence:"\u7ED3\u675F\u5BF9\u8BDD\u4F1A\u505C\u6B62\u672C\u6B21\u8BED\u97F3\u7684\u540E\u53F0\u4EFB\u52A1\u3002\u6536\u8D77\u540E\u4F1A\u7EE7\u7EED\u5BF9\u8BDD\u3002",savedHint:"\u8BBE\u5907\u4E0E\u58F0\u7EB9\u8BBE\u7F6E\u5728\u4E0B\u6B21\u97F3\u9891\u64CD\u4F5C\u65F6\u751F\u6548",more:"\u66F4\u591A\u5BF9\u8BDD",historyOther:"\u5217\u8868\u6765\u81EA\u5176\u4ED6\u64CD\u4F5C\u4F1A\u8BDD\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6",helperOnline:"\u97F3\u9891\u670D\u52A1\u5728\u7EBF",helperOffline:"\u97F3\u9891\u670D\u52A1\u79BB\u7EBF",pending:"\u6B63\u5728\u5904\u7406\u2026",refreshHint:"\u53EA\u8BFB\u53D6\u72B6\u6001\uFF0C\u4E0D\u542F\u52A8\u9EA6\u514B\u98CE\u6216\u6A21\u578B",modelGuide:"\u9ED8\u8BA4 SenseVoice \u5728\u672C\u673A\u4F7F\u7528 CPU\u3002\u6A21\u578B\u6587\u4EF6\u548C\u8BB8\u53EF\u89C1 docs/model-setup.md\u3002",sensevoiceSource:"SenseVoice \u6765\u6E90",ttsSource:"\u5916\u90E8 TTS \u53C2\u8003",licenseNote:"SenseVoice \u8BB8\u53EF\u8BA8\u8BBA",modelTitle:"\u672C\u5730\u6A21\u578B",modelHint:"\u4FDD\u5B58\u5DF2\u6709 SenseVoice \u6216 CAM++ \u8DEF\u5F84\u3002\u6587\u4EF6\u5728\u4F7F\u7528\u524D\u6821\u9A8C\uFF0C\u58F0\u7EB9\u8FC7\u6EE4\u9700\u53E6\u884C\u5F00\u542F\u3002",asr:"\u8BED\u97F3\u8BC6\u522B",sensevoicePath:"SenseVoice \u672C\u5730\u76EE\u5F55",campplusPath:"CAM++ \u6587\u4EF6\uFF08\u53EF\u9009\uFF09",saveModels:"\u4FDD\u5B58\u6A21\u578B\u8DEF\u5F84",audioTitle:"\u97F3\u9891\u8BBE\u7F6E",soundTitle:"\u8F6E\u6B21\u63D0\u793A\u97F3",headphones:"\u6211\u5DF2\u4F7F\u7528\u8033\u673A",headphonesHint:"\u672A\u786E\u8BA4\u8033\u673A\u65F6\uFF0C\u4E3A\u907F\u514D\u5916\u653E\u56DE\u58F0\u4E0D\u64AD\u653E\u63D0\u793A\u97F3\uFF1B\u8FD9\u4E0D\u662F\u56DE\u58F0\u6D88\u9664\uFF0C\u4E5F\u4E0D\u4F1A\u88C1\u6389\u7528\u6237\u8BB2\u8BDD",automaticBargeIn:"\u542F\u7528\u5B9E\u9A8C\u6027\u81EA\u52A8\u6253\u65AD",stopRequested:"\u5DF2\u8BF7\u6C42\u505C\u6B62\u64AD\u653E\uFF0C\u5C1A\u672A\u786E\u8BA4",stopConfirmed:"\u5DF2\u786E\u8BA4\u505C\u6B62\u64AD\u653E",soundEnabled:"\u542F\u7528\u63D0\u793A\u97F3",soundVolume:"\u63D0\u793A\u97F3\u97F3\u91CF\uFF080\u20131\uFF09",soundUnavailable:"\u97F3\u6548\u6682\u672A\u63A5\u5165\uFF1B\u8FD9\u4E9B\u63A7\u4EF6\u4E0D\u4F1A\u5047\u88C5\u64AD\u653E",soundAvailable:"\u97F3\u6548\u5DF2\u63A5\u5165",mode:"\u8BF4\u8BDD\u65B9\u5F0F",alwaysOn:"\u5F00\u542F\u6301\u7EED\u8046\u542C\uFF08\u9EA6\u514B\u98CE\u5E38\u5F00\uFF09",alwaysOff:"\u5207\u56DE\u6309\u4F4F\u8BF4\u8BDD",modeUnavailable:"\u8BF4\u8BDD\u65B9\u5F0F\u63A7\u5236\u5C1A\u672A\u63A5\u5165",modeNeedsGrant:"\u8BF7\u5148\u8BFB\u53D6\u6700\u65B0\u72B6\u6001\u3002",pttMode:"\u6309\u952E\u8BF4\u8BDD",alwaysMode:"\u81EA\u7531\u9EA6",modeHint:"\u5F00\u59CB\u5BF9\u8BDD\u524D\u53EF\u9884\u9009\u8BF4\u8BDD\u65B9\u5F0F\u3002",readSettings:"\u8BFB\u53D6\u8BBE\u7F6E",device:"\u9EA6\u514B\u98CE\u8BBE\u5907",deviceHint:"\u8BBE\u5907\u540D\u79F0\u6765\u81EA\u97F3\u9891\u670D\u52A1\u7684\u6700\u8FD1\u8BFB\u53D6\u3002\u66F4\u6362\u8BBE\u5907\u540E\uFF0C\u5F00\u59CB\u5BF9\u8BDD\u65F6\u751F\u6548\u3002",sideButton:"\u9F20\u6807\u6309\u4F4F\u8BF4\u8BDD",sideOff:"\u5173\u95ED",sideOne:"\u4FA7\u952E 1",sideTwo:"\u4FA7\u952E 2",speaker:"\u5B9E\u9A8C\u6027\u58F0\u7EB9\u8FC7\u6EE4",speakerHint:"\u6B64\u5F00\u5173\u53EA\u7528\u4E8E\u5DF2\u6709\u7684\u58F0\u7EB9\u914D\u7F6E\uFF1B\u5F53\u524D\u9762\u677F\u6CA1\u6709\u6CE8\u518C\u5165\u53E3\u3002",save:"\u4FDD\u5B58\u8BBE\u7F6E",saved:"\u8BBE\u7F6E\u5DF2\u4FDD\u5B58",historyTitle:"\u5BF9\u8BDD\u5386\u53F2",historyHint:"\u53EA\u663E\u793A\u9C7C\u5E94\u521B\u5EFA\u7684\u5BF9\u8BDD\uFF1B\u63A5\u7EED\u4E0D\u4F1A\u81EA\u52A8\u6062\u590D\u5DF2\u5F52\u6863\u804A\u5929",loadHistory:"\u8BFB\u53D6\u5BF9\u8BDD",newChat:"\u65B0\u4F1A\u8BDD",resume:"\u63A5\u7EED",active:"\u5F53\u524D",archived:"\u5DF2\u5F52\u6863",unavailable:"\u4E0D\u53EF\u7528",empty:"\u6682\u65E0\u53EF\u63A5\u7EED\u7684\u5BF9\u8BDD",noTitle:"\u5BF9\u8BDD",noResume:"\u5F53\u524D\u4E0D\u80FD\u63A5\u7EED",newHint:"\u65B0\u5EFA\u6216\u63A5\u7EED\u4F1A\u5207\u6362\u5F53\u524D\u8BED\u97F3\uFF0C\u64A4\u56DE\u65E7\u6388\u6743\uFF0C\u53EF\u80FD\u7ED3\u675F\u65E7\u540E\u53F0\u4EFB\u52A1\uFF1B\u4E0D\u5408\u5E76\u5386\u53F2\uFF0C\u4E5F\u4E0D\u91CD\u8DD1\u65E7\u4EFB\u52A1",historyStale:"\u70B9\u51FB\u8BFB\u53D6\u5BF9\u8BDD\u67E5\u770B\u6700\u65B0\u8BB0\u5F55"},Yd={startConversation:"Start conversation",endConversation:"End conversation",voiceTarget:"Send to",dedicatedVoiceTarget:"Fish Voice conversation",checkingVoiceTarget:"Checking target\u2026",voiceTargetChanged:"The delivery target changed. Check the chat shown here before starting.",chooseCurrentDshTarget:"Use current chat",backToFishVoice:"Back to Fish Voice",currentDshTargetError:"Could not confirm this DSH chat. Check the chat and try again.",chooseVoiceTarget:"Choose a delivery chat",searchVoiceTargets:"Search by chat title or ID",searchVoiceTargetsAction:"Search",existingVoiceTargetList:"Existing DSH chats",boundVoiceTarget:"Current target",voiceTargetAvailability_ready:"Available",voiceTargetAvailability_busy:"Chat is processing a message",voiceTargetAvailability_archived:"Chat is archived",voiceTargetAvailability_unavailable:"Chat is unavailable",voiceTargetAvailability_managed:"Managed by Fish Voice. Direct delivery unavailable.",voiceTargetAvailability_subagent:"Subagent chat. Direct delivery unavailable.",voiceTargetNoMatch:"No matching chats.",voiceTargetEmptyList:"No available chats.",voiceTargetSynthesisNotice:"With an online voice, replies are sent to the speech provider you approved. Select a local voice under Models \u2192 Read aloud to keep speech offline.",bindVoiceTarget:"Use selected chat",savingVoiceTarget:"Saving\u2026",moreVoiceTargets:"Load more",loadingVoiceTargets:"Loading DSH chats\u2026",voiceTargetListError:"Could not load DSH chats.",retryVoiceTargets:"Retry",voiceTranscriptCaptions:"Voice captions",retryTranscript:"Resend",transcriptDelivery_busy:"Chat busy, waiting to send to",transcriptDelivery_ready:"Ready to resend to",transcriptDelivery_sending:"Sending to",transcriptDelivery_queued:"Waiting for chat",transcriptDelivery_delivered:"Sent to",transcriptDelivery_uncertain:"Delivery unconfirmed",transcriptDelivery_failed:"Failed to send to",transcriptDelivery_discarded:"Pending send canceled",endDiscardsRetries:"Ending the conversation clears pending transcripts.",modeSwitching:"Switching listening mode\u2026",modeSaving:"Saving listening mode\u2026",modeSwitchUnconfirmed:"Checking which listening mode took effect\u2026",modeSwitchFailed:"The change could not be confirmed. Check the current mode and try again.",updateTitle:"Fish Voice updates",updateOfferTitle:"Fish Voice update available",updateCurrentVersion:"Installed",updateNewVersion:"New",updateChannel_stable:"Stable",updateChannel_preview:"Preview",updateCheck:"Check for updates",updateDetails:"View update",updateLater:"Later",updateInstall:"Update now",updateRelease:"Release notes",updateFeedback:"Send feedback",update_idle:"Reading update status\u2026",update_checking:"Checking for updates\u2026",update_current:"Fish Voice is up to date.",update_available:"An update is ready.",update_incompatible:"This update is incompatible with the current DSH environment.",update_installing:"Updating. DSH may reload Fish Voice\u2026","update_restart-required":"Update installed. Restart DSH to apply it.","update_enable-required":"Update installed. Enable Fish Voice in DSH plugin settings.",update_installed:"Update complete.",update_error:"The update encountered an error. Check for updates to retry.",update_unsupported:"Automatic updates are unavailable. See the official release notes.",updateConnection:"Update status could not be confirmed. Check again when DSH is ready.",audioDevices:"Audio devices",audioSystemDefault:"System default",audioInput:"Audio input",audioOutput:"Audio output",inputDeviceMissing:"Microphone disconnected; selection retained",outputDeviceMissing:"Output disconnected; no automatic fallback",deviceDisconnected:"Disconnected",inputDeviceStopFirst:"Turn off the microphone to switch input. Output changes at the next playback.",outputDeviceUnsupported:"Selecting speech output is not supported on this platform.",deviceListRetry:"Device list unavailable. Open a selector to retry.",voiceHelperCleanupHint:"Confirming microphone release. New recording stays off until this completes.",voiceHelperRestartHint:"Microphone helper exit is unconfirmed. Fully restart DSH before enabling voice.",inputError_device:"Microphone unavailable",inputError_recognition:"Recognition failed","inputError_no-speech":"No clear speech; try again",inputHelp_device:"Check mic access. Turn the mic off to select a device. Error details: Settings \u2192 Advanced \u2192 Diagnostics.",inputDiagnosticTitle:"Last reported audio error",inputDiagnosticHistory:"This is the last recorded error and may be from an earlier attempt. It does not confirm the current device state.",inputHelp_recognition:"Try again. If it fails, turn the mic off and check the model in Settings.","inputHelp_no-speech":"Move closer, check that your mic is unmuted, and try again.",speechFailed:"Speech failed",speechInterrupted:"Speech interrupted",wakeFallbackHint:"Say a configured name. Matching uses the transcript for now. Reselect Wake word after switching modes to retry sound matching.",wakeMode:"Wake word",switchToWake:"Switch to wake-word listening",wakeDisabled:"Wake listening is off",wakeStarting:"Starting wake listening\u2026",wakeWaiting:"Waiting for wake word",wakeListening:"Listening for the next instruction",wakePaused:"Wake listening paused",wakeError:"Wake listening unavailable; check settings",wakeHint:"Say a configured name, then your instruction. End the conversation to stop listening.",wakeMethod:"Matches the sound and transcript locally after the phrase ends.",wakeAliases:"Wake names",wakeAliasesHint:"Up to 8 comma-separated names. Mandarin near-sounds match only at the start; prefer a distinctive name of 3+ characters.",wakeTimeout:"Wait after wake (seconds)",wakeSettings:"Wake-word settings",wakeStopToEdit:"Turn off the microphone before editing wake names or timeout.",wakeInvalid:"Enter 1\u20138 valid names and a 3\u201330 second timeout.",switchToPtt:"Click to use push to talk",switchToAlways:"Click to leave the microphone listening",quickSpeedStop:"Turn the mic off to change speed",performanceReadFirst:"Check which speeds the current model supports first.",performanceUnavailable:"The provider explicitly rejected the reasoning parameter for unavailable modes; other modes remain selectable.",performanceProbeCost:"At load, up to 3 fixed short requests check the modes. Model charges apply.",performanceProbeScope:"Only routes with a testing interface send short requests. Native support can be read directly.",performanceProbeUnknown:"Some modes could not be confirmed. Check network access or sign-in, then retry.",performanceProbeAccepted:"The effort request check passed.",performanceProbePending:"Checking effort modes for the current model\u2026",holdToSpeak:"Hold to speak:",alwaysWarning:"The microphone keeps listening. Turn it off when finished.",bindingMissing:"Bind a push-to-talk shortcut in settings, or switch to continuous listening.",noSession:"No conversation is open",otherWindow:"Microphone: another window",readingStatus:"Reading status without starting the microphone or models.",statusRetry:"Status is unavailable. It will be checked automatically when you return to this window.",retryStatus:"Refresh voice status",collapseHint:"Collapsing keeps the microphone enabled",stopConsequence:"Ending the conversation releases the microphone and stops its background tasks.",transferTitle:"Take over the other window\u2019s microphone?",transferWarning:"This interrupts voice in the other window and may end its background tasks.",cancel:"Cancel",confirmTransfer:"Confirm takeover",bindingStopRequired:"Turn off the microphone before changing mouse or keyboard shortcuts.",bindingFinishing:"Voice is still stopping. Wait before changing shortcuts.",headphonesRequired:"Confirm that you are wearing headphones to enable automatic interruption.",deviceManualIndex:"Advanced: enter device index",deviceManualName:"Advanced: enter device name",deviceIndexInvalid:"Enter a nonnegative whole-number device index.",deviceDefault:"Use the system default microphone",deviceManual:"Advanced: enter name or index",deviceSaved:"Saved device",deviceEmpty:"No microphone was found. Connect a device and check system sound settings.",deviceUnknown:"Detected devices appear after enabling voice. Use the system default or enter a device manually.",ttsBackend:"Speech backend",ttsBackendHint:"Speech uses your installed TTS backend and its settings. Independent output volume appears only when verified.",ttsBackendPending:"Additional backend selection is being adapted. No cloud service is connected automatically.",voiceClone:"Voice cloning",voiceCloneAvailable:"Qwen supports a local reference voice. Choose a WAV in voice settings.",voiceClonePrivacy:"Reads only your selected, authorized sample locally. No audio upload.",inputActive:"Receiving voice input",modeUnknown:"Listening mode unknown",voiceInputUnavailable:"Voice input unavailable",voiceInputRecoveryHint:"The audio service stopped. Turn the microphone off, then on again. Your authorization is unchanged.",searchHistory:"Search chats",searchScope:"Search loaded chats",noMatches:"No matching chats",differentOwner:"Voice belongs to another session. Check the source first.",details:"Diagnostics",noReply:"No conversation yet",recentConversation:"Conversation",recentTenTurns:"Recent 10 turns",allRecords:"All records",showAllRecords:"Show all",collapseToTen:"Last 10 turns",collapseConversation:"Collapse conversation",currentVoiceRecords:"Current voice chat",historyTruncated:"Showing a limited range; original records retained",viewConversation:"View voice records",loadEarlier:"Load earlier",readingHistory:"Reading records\u2026",retryHistory:"Could not read records. Retry",noConversation:"No conversation yet",newMessages:"new messages",conversationMessages:"Voice conversation",assistantName:"Assistant name",renameAssistant:"Rename: Enter to save, Esc to cancel",newChatCreated:"New chat created",newChatActive:"Start a voice chat. Background work in the current chat will stop and its history will be kept.",newChatOtherOwner:"Open the current voice chat or the window that enabled the microphone to start a new chat.",compact_off:"Off",compact_standby:"Standby",compact_listening:"Listening",compact_pending:"Working",compact_unknown:"Check status",you:"You",assistant:"Assistant",close:"Close panel",keyboardBinding:"Push-to-talk binding",bindingOff:"Not bound",saveBindings:"Save shortcuts",discardBindings:"Discard changes",bindingCapture:"Press a key combination (Esc cancels)",clearBinding:"Clear binding",bindingUnsupported:"This key or system shortcut is not supported.",bindingGlobalHint:"Windows global shortcut. Disable voice before recording a binding; changes apply on the next voice enable. Keys are not swallowed and may also trigger another application.",bindingUnavailable:"Global key binding is unavailable on this platform.",bindingPrintableWarning:"A plain letter, digit or Space also triggers push-to-talk while typing in other applications.",performanceTitle:"Voice performance",performanceHint:"Applies to the next dedicated voice chat. For a linked conversation, use the model menu in that DSH chat to change its reasoning effort.",inspectPerformance:"Check available modes",performance_fast:"Fast",performanceNoThinking:"No thinking",performanceRecommended:"[Recommended]",performanceFastHint:"Fast explicitly requests thinking to be turned off.",performanceFastUnavailable:"The current route cannot confirm that thinking can be turned off. Choose Follow model or select a model route that supports turning it off.",performanceHostUnavailable:"The current model route does not offer some reasoning levels.",performance_balanced:"Standard",performance_high:"High",performance_compatibility:"Compatible default",performanceStopRequired:"Mode changes require fully stopped voice. Disabling voice can end background work belonging to its voice root.",savePerformance:"Save for next enable",outputVolume:"Assistant voice volume",outputVolumeHint:"Adjusts the installed Windows dsh-speak backend only. It does not verify the active voice route or change DSTuber, system or cue volume. Applies to the next output.",readOutputVolume:"Read voice volume",saveOutputVolume:"Save voice volume",outputVolumeUnavailable:"This speech backend does not support independent volume control.",outputVolumeUnknown:"The volume save is unconfirmed. It will be checked automatically without resubmitting.",settingsTitle:"\u9C7C\u5E94 settings",settingsSections:"Settings sections",tab_audio:"Audio",tab_interaction:"Interaction",tab_prompt:"Prompt",voicePromptLabel:"Custom prompt",voicePromptOptional:"(optional)",voicePromptAgents:"Follow AGENTS",voicePromptCustom:"Custom prompt added",voicePromptPlaceholder:`For example: Give the conclusion first and use a natural tone.

Added after AGENTS. Leave empty to use the default settings.`,voicePromptStopToEdit:"Stop voice to edit",voicePromptUnsupported:"This DSH version does not support custom prompts yet.",voicePromptTooLong:"The prompt must not exceed 32,768 characters.",voicePromptSaving:"Saving\u2026",voicePromptCancel:"Cancel changes",voicePromptSave:"Save",voicePromptSaved:"Saved. Applies when voice is next started.",voicePromptSaveFailed:"Could not save. Your draft has been kept.",voicePromptUnsaved:"Not saved",tab_models:"Models",tab_advanced:"Advanced",projectInfoTitle:"About \u9C7C\u5E94",projectAuthor:"Author",projectRepository:"Official repository",projectNpm:"npm package",tab_sessions:"Sessions",settingsContent:"Settings content",voiceCleanupPending:"Closing previous audio service",voiceCleanupHint:"Waiting for the previous session and recording to exit. Status will refresh without retrying microphone activation.",voiceRestartPending:"Restart DSH required",voiceRestartHint:"The previous audio service has not confirmed exit. Fully quit and reopen DSH before enabling voice. Your saved authorization is unchanged.",voiceRootRestartHint:"Voice session shutdown is unconfirmed. Fully quit and reopen DSH.",voiceStopPending:"Voice stop unconfirmed",voiceStopHint:"Refresh the status and confirm voice has stopped before starting a dialogue.",voiceTargetOccupied:"The previous voice session is open in DSH. Start a new Fish Voice session or choose a DSH conversation.",voiceRecoveryPending:"Previous voice session is still active",voiceRecoveryCheck:"Check and stop",voiceRecoveryHint:"The previous instance is still closing. Check and stop first. If it remains active, fully quit and reopen DSH.",operationUnavailable:"The outcome is unconfirmed. Automatic readback will check the actual state without resubmitting. Details are in Advanced settings.",enableFailed:"Could not open the mic. Check Advanced settings for details before retrying.",tab_pets:"Desktop pet",planned:"Planned development",configurationUnknown:"The configuration write is unconfirmed. Automatic readback is in progress; changes stay locked until verified.",motionTitle:"Interface motion",motion_spring:"Spring",motion_firm:"Firm",motion_off:"Off",motionHint:"Preview and save immediately. Actions never wait for animation. System reduced-motion preference takes priority.",motionNotSaved:"Preview applied, but this browser could not save the preference.",modeControlPending:"Voice control is pending or unconfirmed. Refresh status when it finishes.",capabilityTitle:"Host capabilities and voice visibility",supported:"Available",unsupported:"Unavailable or unconfirmed",hiddenMode:"Hidden voice chat",workspaceMode:"Workspace-visible compatibility mode",taskCapability:"Persistent handoff",configuredMode:"Saved mode",currentVoiceMode:"Actual mode of the current voice chat",noActiveVoice:"No running voice chat",chooseVisibility:"Choose visibility",workspaceWarning:"Workspace-visible compatibility mode shows voice chats in the regular workspace. Unavailable hidden mode still refuses to start; it never falls back to visible mode.",visibilityNoMigration:"This preference applies to later chats. Existing chats keep their current visibility.",modeReadFirst:"Checking settings and status for this conversation before visibility can be changed.",closeBeforeMode:"Turn voice off and wait for confirmed shutdown before changing visibility.",saveWorkspace:"Save workspace-visible mode",saveHidden:"Save hidden mode",visibilityUnknownWrite:"The visibility write is unconfirmed. Automatic readback is in progress; changes stay locked. The original write will not be repeated.",outputObservationUnavailable:"Actual playback-start events are unavailable; playback has not been confirmed.",title:"\u9C7C\u5E94",description:"Voice controls, audio preferences, and separate voice chats.",drag:"Move Fish Voice panel",dragHint:"Drag background space with the mouse; controls remain interactive",collapse:"Collapse",reopen:"Open Fish Voice",refresh:"Refresh status",settings:"Settings",unknown:"Reading status\u2026",enabled:"Microphone enabled",disabled:"Microphone off",identity:"Full session identities",source:"Authorization source",actor:"Action session",none:"None",openSession:"Open a DSH conversation first",enable:"Enable for this session",transfer:"Authorize this session",disable:"Disable voice",stale:"Refresh to confirm status",snapshot:"Last read status",consequence:"Disabling or switching voice may end its background work. Collapsing this panel leaves voice enabled.",savedHint:"Device and speaker settings take effect on the next audio operation or helper reload.",more:"More voice chats",historyOther:"This list belongs to another action session; read it again",helperOnline:"Audio helper online",helperOffline:"Audio helper offline",pending:"Working\u2026",refreshHint:"Read status without starting the microphone or a model",modelGuide:"SenseVoice runs locally on the CPU. For model files and licenses, see docs/model-setup.md.",sensevoiceSource:"SenseVoice source",ttsSource:"External TTS reference",licenseNote:"SenseVoice licensing discussion",modelTitle:"Local models",modelHint:"Save existing SenseVoice or CAM++ paths. Files are verified before use. Speaker filtering is enabled separately.",asr:"Speech recognition",sensevoicePath:"Local SenseVoice directory",campplusPath:"CAM++ file (optional)",saveModels:"Save model paths",audioTitle:"Audio settings",soundTitle:"Turn sounds",headphones:"I am using headphones",headphonesHint:"Cues stay off until headphones are confirmed, to avoid speaker echo. This is not echo cancellation and does not trim your speech.",automaticBargeIn:"Enable experimental automatic interruption",stopRequested:"Stop requested; playback has not confirmed stopping",stopConfirmed:"Playback confirmed stopped",soundEnabled:"Enable turn sounds",soundVolume:"Sound volume (0\u20131)",soundUnavailable:"Sound playback is not connected; these controls cannot play cues yet.",soundAvailable:"Sound playback connected",mode:"Listening mode",alwaysOn:"Enable always listening (mic stays on)",alwaysOff:"Use push to talk",modeUnavailable:"Listening mode control is not connected",modeNeedsGrant:"Read the current voice status first",pttMode:"Push to talk",alwaysMode:"Open mic",modeHint:"The audio helper controls the active mode. Saving preferences never grants or starts microphone access.",readSettings:"Read settings",device:"Input device",deviceHint:"Blank uses the system default; enter a device name or index",sideButton:"Mouse push-to-talk",sideOff:"Off",sideOne:"Side button 1",sideTwo:"Side button 2",speaker:"Experimental speaker filtering",speakerHint:"Enable matching only; this page does not record or enroll a voiceprint",save:"Save settings",saved:"Settings saved",historyTitle:"Voice chats",historyHint:"Only Fish Voice voice chats appear here. Resume never unarchives a chat automatically.",loadHistory:"Read voice chats",newChat:"New chat",resume:"Resume",active:"Current",archived:"Archived",unavailable:"Unavailable",empty:"No voice chats available",noTitle:"Voice chat",noResume:"Cannot resume right now",newHint:"New or resumed chats switch current voice, revoke its old grant, and may end its background work. They do not merge history or replay old work.",historyStale:"Read voice chats to see the latest records"};var Pn=require("react");var ag=/^7b94c8e3-d6a1-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,Ki=e=>typeof e=="string"&&ag.test(e);var ep="sidebar.workspaces",cg="workspace",lg="whaleWorkspacePresentation",ug=["sidebar.workspaces.directoryFlow","sidebar.workspaces.session.row.action","sidebar.session.row.leading","sidebar.session.row.trailing","sidebar.session.row.hover"],dg=new Set(["one-shot","continuable","unknown"]);function pg(e,n){return e&&typeof e=="object"&&Object.keys(e).length===n.length&&n.every(t=>Object.hasOwn(e,t))}function mg(e){if(!Array.isArray(e)||e.length>512)return null;let n=[],t=new Set;for(let o of e){if(!pg(o,["id","parentId","mode"])||typeof o.id!="string"||!o.id||o.id.length>256||t.has(o.id))return null;if(o.parentId===null){if(o.mode!==null||!Ki(o.id))return null;n.push({id:o.id,parentId:null,mode:null})}else{if(typeof o.parentId!="string"||!o.parentId||o.parentId===o.id||!dg.has(o.mode))return null;n.push({id:o.id,parentId:o.parentId,mode:o.mode})}t.add(o.id)}return n}function fg(e,n){if(!e||typeof e!="object"||!e.byId||!Array.isArray(e.ids))return e;let t=new Map(n.map(l=>[l.id,l])),o=Object.create(null),i=new Set,r=!1;for(let[l,u]of Object.entries(e.byId)){let d=t.get(l);if(Ki(l)&&d===void 0){i.add(l),r=!0;continue}if(d?.parentId===null){if(u.parentId===void 0&&u.origin!=="subagent"){o[l]=u;continue}i.add(l),r=!0;continue}if(d&&u.origin==="subagent"&&u.parentId===d.parentId){let p={...u};delete p.origin,o[l]=p,r=!0;continue}o[l]=u}for(let l of n){let u=e.byId[l.id];u&&(l.parentId===null&&(u.parentId!==void 0||u.origin==="subagent")||l.parentId!==null&&(u.origin!=="subagent"||u.parentId!==l.parentId)||e.ids.includes(l.id)||(r=!0))}if(!r)return e;let s=e.ids.filter(l=>!i.has(l)&&o[l]!==void 0);for(let l of n)o[l.id]!==void 0&&!s.includes(l.id)&&s.push(l.id);let a=e.projectionsBySession;if(a&&i.size>0){let l={...a};for(let u of i)delete l[u];a=l}return{...e,ids:s,byId:o,projectionsBySession:a}}function hg(e,n){return!e||e.locale!==cg||e.options?.id!==void 0||e.options?.key!==void 0||(e.options?.priority??0)!==0||typeof n!="function"||n.name!=="WorkspaceBrowser"?!1:ug.every(t=>Object.hasOwn(e.children??{},t))}function gg(e){if(!Object.isExtensible(e))return!1;let n=Object.getOwnPropertyDescriptor(e,"component");return n===void 0||n.writable===!0}function vg(e,n){return e.length===n.length&&e.every((t,o)=>{let i=n[o];return t.id===i.id&&t.parentId===i.parentId&&t.mode===i.mode})}function np(e,n){let t=[],o=0,i={revision:o,items:t},r,s=!1,a=!1,l=new Set,u=new Set,d=S=>{for(let Z of[...S])Z()},p={getSnapshot:()=>i,subscribe(S){return u.add(S),()=>u.delete(S)}},f=()=>{o++,i={revision:o,items:t},d(u),d(l)},m=S=>{s!==S&&(s=S,f())},b=()=>{let S=r;r=void 0,S&&S.entry.component===S.wrapper&&(S.entry.component=S.original)},g=()=>{if(a)return;let S;try{S=e.entries(ep)}catch{S=void 0}let Z=Array.isArray(S)?S.filter(O=>{let q=r&&r.entry===O&&O.component===r.wrapper?r.original:O?.component;return hg(O,q)}):[];if(Z.length!==1||typeof n!="function"||!gg(Z[0])){b(),m(!1);return}let D=Z[0];if(r?.entry===D&&D.component===r.wrapper)return;b(),m(!1);let G=D.component,N=O=>{let q=O.useSessions(P=>P),k=O.useWhaleWorkspacePresentation(P=>P),z=(0,Pn.useMemo)(()=>fg(q,k.items),[q,k]),I=(0,Pn.useCallback)(P=>P(z),[z]),A=(0,Pn.useMemo)(()=>new Map(k.items.map(P=>[P.id,P])),[k]),C=(0,Pn.useCallback)(P=>{let L=A.get(P),U=q.byId[P];if(L?.parentId&&U?.origin==="subagent"&&U.parentId===L.parentId){n({childSessionId:P,parentSessionId:L.parentId,mode:L.mode});return}O.open?.(P)},[O.open,A,q]);return(0,Pn.createElement)(G,{...O,useSessions:I,open:C})},B=function(q){let k=typeof q?.useSessions=="function"&&typeof q?.useWhaleWorkspacePresentation=="function"&&typeof q?.open=="function";return(0,Pn.useEffect)(()=>{r?.entry===D&&r.wrapper===B&&m(k)},[k]),(0,Pn.createElement)(k?N:G,q)};B.displayName="WhaleWorkspacePresentation",D.component=B,r={entry:D,original:G,wrapper:B}},_=()=>{},x=()=>{};try{_=e.provideRoot({hooks:{[lg]:p}}),typeof _!="function"&&(_=()=>{}),x=e.subscribe(ep,g),typeof x!="function"&&(x=()=>{}),g()}catch{x(),b(),_(),m(!1)}return{supported:()=>s,subscribe(S){return l.add(S),()=>l.delete(S)},setOverrides(S){if(a)return!1;let Z=mg(S);return Z===null?(t.length>0&&(t=[],f()),!1):(vg(t,Z)||(t=Z,f()),!0)},dispose(){a||(a=!0,x(),b(),s=!1,f(),_(),l.clear(),u.clear())}}}var bg=["slots","locale","remote","uiSession"];function yg(e){let n=hd(),t=od(void 0,{observe:n.internal});t.enableAutomaticReads();let o=rd();e.inject(["whaleFloatingLayout"],g=>{g.effect(()=>o.useLayoutService(g.whaleFloatingLayout),"whale-voice: optional magnetic layout")});let i=ad(),r=id(window,{onResize:g=>o.fit(g)}),s,a=()=>{};e.effect(()=>{let g=()=>{t.setReadVisibility(document.visibilityState!=="hidden"),document.visibilityState!=="hidden"&&(t.refresh(),s?.refresh(),a())};return window.addEventListener("focus",g),window.addEventListener("online",g),document.addEventListener("visibilitychange",g),g(),()=>{window.removeEventListener("focus",g),window.removeEventListener("online",g),document.removeEventListener("visibilitychange",g)}},"whale-voice: refresh visible state"),e.effect(()=>{let g=np(e.slots,B=>e.get?.("uiWorkspace")?.openSession(B)),_,x,S=()=>{x?.(),x=null};a=()=>{if(!g.supported()){S();return}if(!_||x)return;let B=_,O=!0;x=_.subscribePresentation(q=>{g.setOverrides(q.shown),O&&(O=!1,t.refresh({force:!0}))},q=>{_===B&&(S(),console.warn("\u9C7C\u5E94\u4FA7\u680F\u4F1A\u8BDD\u663E\u793A\u8FDE\u63A5\u4E2D\u65AD",q?.message??q))})};let Z=g.subscribe(a),D=!1;s=rs(async()=>{let B=D?"ui-reconnect":"ui-connect";n.internal(B,"requested");try{let O=await ud(e,n.internal);return n.internal(B,"finished","ok"),O}catch(O){throw D=!0,n.internal(B,"finished","failed"),O}},{visible:()=>t.getSnapshot().readVisible!==!1,onReady:B=>{S(),_=B,n.attach(B),t.attachConversationClient(B),a()},onError:B=>t.conversationUnavailable(B)});let G=t.getSnapshot().readVisible,N=t.subscribe(()=>{let B=t.getSnapshot().readVisible;B!==G&&(G=B,s.visibilityChanged())});return s.start(),()=>{a=()=>{},S(),Z(),g.dispose(),N(),n.dispose(),s.dispose(),t.dispose()}},"whale-voice: private conversation stream"),e.effect(()=>()=>{t.dispose(),r.dispose(),o.dispose(),i.dispose()},"whale-ear-ui: state and geometry"),e.effect(()=>e.locale.register("whaleEar",{en:Yd,zh:Xd}),"whale-ear-ui: dictionaries"),e.effect(()=>{let g=document.createElement("style");return g.dataset.plugin="dsh-whale-ear-ui",g.textContent=h.text+Td+ts,document.head.append(g),()=>g.remove()},"whale-ear-ui: stylesheet");let l=async g=>{let _=e.get?.("sessions");if(!_)throw new Error("DSH \u4F1A\u8BDD\u754C\u9762\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");return _.list.getSnapshot().byId[g]||await _.refresh(),_},u=0,d=async g=>{let _=++u;if(g.kind==="root"&&await l(g.id),_!==u)return;let x=e.get?.("uiWorkspace");if(!x?.openSession)throw new Error("DSH \u4F1A\u8BDD\u754C\u9762\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");return x.openSession(g.kind==="root"?g.id:{childSessionId:g.id,parentSessionId:g.parentId,mode:g.mode??"unknown"})},p=g=>d({kind:"root",id:g}),f={subscribe(g){let _=[e.uiSession.adapter?.current?.subscribe(g),e.get?.("layout")?.panelInfo?.subscribe(g),e.get?.("sessions")?.list?.subscribe?.(g)];return()=>_.forEach(x=>x?.())},selectedSession(){let g=e.uiSession.adapter?.current?.getSnapshot();return g?.hooks?.session?.getSnapshot()?.blank===!0?null:g?.props?.sessionId??null},currentConversation(){return e.get?.("layout")?.panelInfo?.getSnapshot()?.activePanelId===null?f.selectedSession():null},sourceFor(g){if(!g)return null;let _=e.get?.("sessions"),x=_?.list?.getSnapshot()?.byId?.[g];return _?.subagentAddress?.(g)||x?.origin==="subagent"||x?.parentId?null:g}},m=async(g,_)=>{let S=await(await l(g)).using(g,{source:"workspaceOperation"},Z=>Z.binding.session.rename(_));if(!S.ok)throw new Error(S.error.message);return S.value.title},b=()=>({captureBindings:t.captureBindings,refreshModelCompute:t.refreshModelCompute,pickPath:t.pickPath,readState:t.getSnapshot,markSettingsEdited:t.markSettingsEdited,discardSettingsDraft:t.discardSettingsDraft,openAuthorization:t.openAuthorization,closeAuthorization:t.closeAuthorization,saveAuthorization:t.saveAuthorization,readOperationLog:t.readOperationLog,manageSessions:t.manageSessions,listExistingVoiceSessions:t.listExistingVoiceSessions,setExistingVoiceSession:t.setExistingVoiceSession,setSettingsTab:t.setSettingsTab,setSettingsModelTab:t.setSettingsModelTab,setSessionManagement:t.setSessionManagement,senseVoiceAsrAction:t.senseVoiceAsrAction,updateAction:t.updateAction,dismissUpdate:t.dismissUpdate,openExistingVoiceSession:p,openManagedSession:d,renameManagedSession:m,hooks:{whaleUi:t,whalePreferences:i},setMotion:g=>i.setMotion(g),setAssistantName:g=>i.setAssistantName(g),run:(...g)=>t.run(...g),setSession:g=>t.setSession(g),cancelPreview:()=>t.cancelPreview(),discardDiagnostics:()=>t.discardDiagnostics(),dismissSetup:()=>t.dismissSetup(),openSetup:()=>t.openSetup(),showHome:()=>t.showHome(),openSettings:t.openSettings,refresh:g=>t.refresh(g)});e.slots.inject("shell.overlay",()=>e.slots.register({name:"shell.overlay",id:"whale-ear",locale:"whaleEar",inject:()=>({geometry:o,sizing:r,recordUserOperation:n.user,setPanelVisible:t.setPanelVisible,closeAuthorization:t.closeAuthorization,refresh:g=>t.refresh(g),showHome:()=>t.showHome(),dismissSetup:()=>t.dismissSetup(),hooks:{whaleUi:t,whalePreferences:i}}),children:{"whale-ear.panel.controls":{kind:"single",scope:"root"}}},Hd)),e.slots.inject("whale-ear.panel.controls",()=>e.slots.register({name:"whale-ear.panel.controls",locale:"whaleEar",inject:()=>({...b(),controlContext:f,retryVoiceTranscript:t.retryVoiceTranscript})},jd))}
return module.exports;}});
