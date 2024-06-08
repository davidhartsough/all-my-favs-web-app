"use strict";(()=>{var vo=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},ol=function(n){let e=[],t=0,r=0;for(;t<n.length;){let i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){let s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){let s=n[t++],o=n[t++],a=n[t++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{let s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},yo={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){let s=n[i],o=i+1<n.length,a=o?n[i+1]:0,c=i+2<n.length,l=c?n[i+2]:0,u=s>>2,d=(s&3)<<4|a>>4,f=(a&15)<<2|l>>6,y=l&63;c||(y=64,o||(f=64)),r.push(t[u],t[d],t[f],t[y])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(vo(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):ol(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){let s=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;let l=i<n.length?t[n.charAt(i)]:64;++i;let d=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||a==null||l==null||d==null)throw new Zr;let f=s<<2|a>>4;if(r.push(f),l!==64){let y=a<<4&240|l>>2;if(r.push(y),d!==64){let g=l<<6&192|d;r.push(g)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},Zr=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},al=function(n){let e=vo(n);return yo.encodeByteArray(e,!0)},Mt=function(n){return al(n).replace(/\./g,"")},ti=function(n){try{return yo.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function cl(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var ll=()=>cl().__FIREBASE_DEFAULTS__,ul=()=>{if(typeof process>"u"||typeof process.env>"u")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},dl=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=n&&ti(n[1]);return e&&JSON.parse(e)},ni=()=>{try{return ll()||ul()||dl()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ri=n=>{var e,t;return(t=(e=ni())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},wo=n=>{let e=ri(n);if(!e)return;let t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},ii=()=>{var n;return(n=ni())===null||n===void 0?void 0:n.config},si=n=>{var e;return(e=ni())===null||e===void 0?void 0:e[`_${n}`]};var In=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};function Eo(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Mt(JSON.stringify(t)),Mt(JSON.stringify(o)),""].join(".")}function H(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Io(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(H())}function bo(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function To(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function So(){let n=H();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Ao(){try{return typeof indexedDB=="object"}catch{return!1}}function Po(){return new Promise((n,e)=>{try{let t=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}var hl="FirebaseError",ne=class n extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=hl,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Se.prototype.create)}},Se=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?fl(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new ne(i,a,r)}};function fl(n,e){return n.replace(pl,(t,r)=>{let i=e[r];return i!=null?String(i):`<${r}?>`})}var pl=/\{\$([^}]+)}/g;function Ro(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Ye(n,e){if(n===e)return!0;let t=Object.keys(n),r=Object.keys(e);for(let i of t){if(!r.includes(i))return!1;let s=n[i],o=e[i];if(_o(s)&&_o(o)){if(!Ye(s,o))return!1}else if(s!==o)return!1}for(let i of r)if(!t.includes(i))return!1;return!0}function _o(n){return n!==null&&typeof n=="object"}function ut(n){let e=[];for(let[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function dt(n){let e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){let[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function ht(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Do(n,e){let t=new ei(n,e);return t.subscribe.bind(t)}var ei=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");ml(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=Qr),i.error===void 0&&(i.error=Qr),i.complete===void 0&&(i.complete=Qr);let s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function ml(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Qr(){}var $f=4*60*60*1e3;function K(n){return n&&n._delegate?n._delegate:n}var ce=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var Je="[DEFAULT]";var oi=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let r=new In;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let r=this.normalizeInstanceIdentifier(e?.identifier),i=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(_l(e))try{this.getOrInitializeService({instanceIdentifier:Je})}catch{}for(let[t,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(t);try{let s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Je){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Je){return this.instances.has(e)}getOptions(e=Je){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[s,o]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,t){var r;let i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);let o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:gl(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Je){return this.component?this.component.multipleInstances?e:Je:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function gl(n){return n===Je?void 0:n}function _l(n){return n.instantiationMode==="EAGER"}var bn=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new oi(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var vl=[],S;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(S||(S={}));var yl={debug:S.DEBUG,verbose:S.VERBOSE,info:S.INFO,warn:S.WARN,error:S.ERROR,silent:S.SILENT},wl=S.INFO,El={[S.DEBUG]:"log",[S.VERBOSE]:"log",[S.INFO]:"info",[S.WARN]:"warn",[S.ERROR]:"error"},Il=(n,e,...t)=>{if(e<n.logLevel)return;let r=new Date().toISOString(),i=El[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},xe=class{constructor(e){this.name=e,this._logLevel=wl,this._logHandler=Il,this._userLogHandler=null,vl.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in S))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?yl[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,S.DEBUG,...e),this._logHandler(this,S.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,S.VERBOSE,...e),this._logHandler(this,S.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,S.INFO,...e),this._logHandler(this,S.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,S.WARN,...e),this._logHandler(this,S.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,S.ERROR,...e),this._logHandler(this,S.ERROR,...e)}};var bl=(n,e)=>e.some(t=>n instanceof t),Oo,Co;function Tl(){return Oo||(Oo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Sl(){return Co||(Co=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var No=new WeakMap,ci=new WeakMap,ko=new WeakMap,ai=new WeakMap,ui=new WeakMap;function Al(n){let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(ge(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&No.set(t,n)}).catch(()=>{}),ui.set(e,n),e}function Pl(n){if(ci.has(n))return;let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});ci.set(n,e)}var li={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ci.get(n);if(e==="objectStoreNames")return n.objectStoreNames||ko.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ge(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Lo(n){li=n(li)}function Rl(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let r=n.call(Tn(this),e,...t);return ko.set(r,e.sort?e.sort():[e]),ge(r)}:Sl().includes(n)?function(...e){return n.apply(Tn(this),e),ge(No.get(this))}:function(...e){return ge(n.apply(Tn(this),e))}}function Dl(n){return typeof n=="function"?Rl(n):(n instanceof IDBTransaction&&Pl(n),bl(n,Tl())?new Proxy(n,li):n)}function ge(n){if(n instanceof IDBRequest)return Al(n);if(ai.has(n))return ai.get(n);let e=Dl(n);return e!==n&&(ai.set(n,e),ui.set(e,n)),e}var Tn=n=>ui.get(n);function xo(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){let o=indexedDB.open(n,e),a=ge(o);return r&&o.addEventListener("upgradeneeded",c=>{r(ge(o.result),c.oldVersion,c.newVersion,ge(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}var Ol=["get","getKey","getAll","getAllKeys","count"],Cl=["put","add","delete","clear"],di=new Map;function Mo(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(di.get(e))return di.get(e);let t=e.replace(/FromIndex$/,""),r=e!==t,i=Cl.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Ol.includes(t)))return;let s=async function(o,...a){let c=this.transaction(o,i?"readwrite":"readonly"),l=c.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[t](...a),i&&c.done]))[0]};return di.set(e,s),s}Lo(n=>({...n,get:(e,t,r)=>Mo(e,t)||n.get(e,t,r),has:(e,t)=>!!Mo(e,t)||n.has(e,t)}));var fi=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Nl(t)){let r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}};function Nl(n){let e=n.getComponent();return e?.type==="VERSION"}var pi="@firebase/app",Vo="0.10.2";var Xe=new xe("@firebase/app"),kl="@firebase/app-compat",Ll="@firebase/analytics-compat",Ml="@firebase/analytics",xl="@firebase/app-check-compat",Vl="@firebase/app-check",Fl="@firebase/auth",Ul="@firebase/auth-compat",ql="@firebase/database",Bl="@firebase/database-compat",jl="@firebase/functions",Hl="@firebase/functions-compat",$l="@firebase/installations",Wl="@firebase/installations-compat",zl="@firebase/messaging",Gl="@firebase/messaging-compat",Kl="@firebase/performance",Yl="@firebase/performance-compat",Jl="@firebase/remote-config",Xl="@firebase/remote-config-compat",Ql="@firebase/storage",Zl="@firebase/storage-compat",eu="@firebase/firestore",tu="@firebase/firestore-compat",nu="firebase",ru="10.11.1";var mi="[DEFAULT]",iu={[pi]:"fire-core",[kl]:"fire-core-compat",[Ml]:"fire-analytics",[Ll]:"fire-analytics-compat",[Vl]:"fire-app-check",[xl]:"fire-app-check-compat",[Fl]:"fire-auth",[Ul]:"fire-auth-compat",[ql]:"fire-rtdb",[Bl]:"fire-rtdb-compat",[jl]:"fire-fn",[Hl]:"fire-fn-compat",[$l]:"fire-iid",[Wl]:"fire-iid-compat",[zl]:"fire-fcm",[Gl]:"fire-fcm-compat",[Kl]:"fire-perf",[Yl]:"fire-perf-compat",[Jl]:"fire-rc",[Xl]:"fire-rc-compat",[Ql]:"fire-gcs",[Zl]:"fire-gcs-compat",[eu]:"fire-fst",[tu]:"fire-fst-compat","fire-js":"fire-js",[nu]:"fire-js-all"};var Sn=new Map,su=new Map,gi=new Map;function Fo(n,e){try{n.container.addComponent(e)}catch(t){Xe.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Fe(n){let e=n.name;if(gi.has(e))return Xe.debug(`There were multiple attempts to register component ${e}.`),!1;gi.set(e,n);for(let t of Sn.values())Fo(t,n);for(let t of su.values())Fo(t,n);return!0}function Vt(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ae(n){return n.settings!==void 0}var ou={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ve=new Se("app","Firebase",ou);var _i=class{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new ce("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ve.create("app-deleted",{appName:this._name})}};var Ue=ru;function wi(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let r=Object.assign({name:mi,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw Ve.create("bad-app-name",{appName:String(i)});if(t||(t=ii()),!t)throw Ve.create("no-options");let s=Sn.get(i);if(s){if(Ye(t,s.options)&&Ye(r,s.config))return s;throw Ve.create("duplicate-app",{appName:i})}let o=new bn(i);for(let c of gi.values())o.addComponent(c);let a=new _i(t,r,o);return Sn.set(i,a),a}function An(n=mi){let e=Sn.get(n);if(!e&&n===mi&&ii())return wi();if(!e)throw Ve.create("no-app",{appName:n});return e}function ue(n,e,t){var r;let i=(r=iu[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);let s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){let a=[`Unable to register library "${i}" with version "${e}":`];s&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Xe.warn(a.join(" "));return}Fe(new ce(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}var au="firebase-heartbeat-database",cu=1,xt="firebase-heartbeat-store",hi=null;function jo(){return hi||(hi=xo(au,cu,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(xt)}catch(t){console.warn(t)}}}}).catch(n=>{throw Ve.create("idb-open",{originalErrorMessage:n.message})})),hi}async function lu(n){try{let t=(await jo()).transaction(xt),r=await t.objectStore(xt).get(Ho(n));return await t.done,r}catch(e){if(e instanceof ne)Xe.warn(e.message);else{let t=Ve.create("idb-get",{originalErrorMessage:e?.message});Xe.warn(t.message)}}}async function Uo(n,e){try{let r=(await jo()).transaction(xt,"readwrite");await r.objectStore(xt).put(e,Ho(n)),await r.done}catch(t){if(t instanceof ne)Xe.warn(t.message);else{let r=Ve.create("idb-set",{originalErrorMessage:t?.message});Xe.warn(r.message)}}}function Ho(n){return`${n.name}!${n.options.appId}`}var uu=1024,du=30*24*60*60*1e3,vi=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new yi(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;let i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=qo();if(!(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null))&&!(this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)))return this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{let a=new Date(o.date).valueOf();return Date.now()-a<=du}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){var e;if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let t=qo(),{heartbeatsToSend:r,unsentEntries:i}=hu(this._heartbeatsCache.heartbeats),s=Mt(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}};function qo(){return new Date().toISOString().substring(0,10)}function hu(n,e=uu){let t=[],r=n.slice();for(let i of n){let s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Bo(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Bo(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}var yi=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ao()?Po().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await lu(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return Uo(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return Uo(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}};function Bo(n){return Mt(JSON.stringify({version:2,heartbeats:n})).length}function fu(n){Fe(new ce("platform-logger",e=>new fi(e),"PRIVATE")),Fe(new ce("heartbeat",e=>new vi(e),"PRIVATE")),ue(pi,Vo,n),ue(pi,Vo,"esm2017"),ue("fire-js","")}fu("");function Pn(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function aa(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var ca=aa,la=new Se("auth","Firebase",aa());var kn=new xe("@firebase/auth");function pu(n,...e){kn.logLevel<=S.WARN&&kn.warn(`Auth (${Ue}): ${n}`,...e)}function Dn(n,...e){kn.logLevel<=S.ERROR&&kn.error(`Auth (${Ue}): ${n}`,...e)}function de(n,...e){throw Bi(n,...e)}function ve(n,...e){return Bi(n,...e)}function ua(n,e,t){let r=Object.assign(Object.assign({},ca()),{[e]:t});return new Se("auth","Firebase",r).create(e,{appName:n.name})}function Qe(n){return ua(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Bi(n,...e){if(typeof n!="string"){let t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return la.create(n,...e)}function p(n,e,...t){if(!n)throw Bi(e,...t)}function _e(n){let e="INTERNAL ASSERTION FAILED: "+n;throw Dn(e),new Error(e)}function Re(n,e){n||_e(e)}function bi(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function mu(){return $o()==="http:"||$o()==="https:"}function $o(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}function gu(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(mu()||bo()||"connection"in navigator)?navigator.onLine:!0}function _u(){if(typeof navigator>"u")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}var Ze=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,Re(t>e,"Short delay should be less than long delay!"),this.isMobile=Io()||To()}get(){return gu()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function ji(n,e){Re(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}var Ln=class{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;_e("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;_e("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;_e("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var vu={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var yu=new Ze(3e4,6e4);function F(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Y(n,e,t,r,i={}){return da(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});let a=ut(Object.assign({key:n.config.apiKey},o)).slice(1),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode),Ln.fetch()(ha(n,n.config.apiHost,t,a),Object.assign({method:e,headers:c,referrerPolicy:"no-referrer"},s))})}async function da(n,e,t){n._canInitEmulator=!1;let r=Object.assign(Object.assign({},vu),e);try{let i=new Ti(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();let o=await s.json();if("needConfirmation"in o)throw Ft(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{let a=s.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ft(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Ft(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw Ft(n,"user-disabled",o);let u=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw ua(n,u,l);de(n,u)}}catch(i){if(i instanceof ne)throw i;de(n,"network-request-failed",{message:String(i)})}}async function it(n,e,t,r,i={}){let s=await Y(n,e,t,r,i);return"mfaPendingCredential"in s&&de(n,"multi-factor-auth-required",{_serverResponse:s}),s}function ha(n,e,t,r){let i=`${e}${t}?${r}`;return n.config.emulator?ji(n.config,i):`${n.config.apiScheme}://${i}`}function wu(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var Ti=class{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(ve(this.auth,"network-request-failed")),yu.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}};function Ft(n,e,t){let r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);let i=ve(n,e,r);return i.customData._tokenResponse=t,i}function Wo(n){return n!==void 0&&n.enterprise!==void 0}var Si=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return wu(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}};async function Eu(n,e){return Y(n,"GET","/v2/recaptchaConfig",F(n,e))}async function Iu(n,e){return Y(n,"POST","/v1/accounts:delete",e)}async function fa(n,e){return Y(n,"POST","/v1/accounts:lookup",e)}function Ut(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function pa(n,e=!1){let t=K(n),r=await t.getIdToken(e),i=Hi(r);p(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");let s=typeof i.firebase=="object"?i.firebase:void 0,o=s?.sign_in_provider;return{claims:i,token:r,authTime:Ut(Ei(i.auth_time)),issuedAtTime:Ut(Ei(i.iat)),expirationTime:Ut(Ei(i.exp)),signInProvider:o||null,signInSecondFactor:s?.sign_in_second_factor||null}}function Ei(n){return Number(n)*1e3}function Hi(n){let[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Dn("JWT malformed, contained fewer than 3 sections"),null;try{let i=ti(t);return i?JSON.parse(i):(Dn("Failed to decode base64 JWT payload"),null)}catch(i){return Dn("Caught error parsing JWT payload as JSON",i?.toString()),null}}function zo(n){let e=Hi(n);return p(e,"internal-error"),p(typeof e.exp<"u","internal-error"),p(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}async function Bt(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof ne&&bu(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function bu({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}var Ai=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){let r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;let i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var jt=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ut(this.lastLoginAt),this.creationTime=Ut(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function Mn(n){var e;let t=n.auth,r=await n.getIdToken(),i=await Bt(n,fa(t,{idToken:r}));p(i?.users.length,t,"internal-error");let s=i.users[0];n._notifyReloadListener(s);let o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?ga(s.providerUserInfo):[],a=Tu(n.providerData,o),c=n.isAnonymous,l=!(n.email&&s.passwordHash)&&!a?.length,u=c?l:!1,d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new jt(s.createdAt,s.lastLoginAt),isAnonymous:u};Object.assign(n,d)}async function ma(n){let e=K(n);await Mn(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Tu(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function ga(n){return n.map(e=>{var{providerId:t}=e,r=Pn(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}async function Su(n,e){let t=await da(n,{},async()=>{let r=ut({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=ha(n,i,"/v1/token",`key=${s}`),a=await n._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",Ln.fetch()(o,{method:"POST",headers:a,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Au(n,e){return Y(n,"POST","/v2/accounts:revokeToken",F(n,e))}var qt=class n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){p(e.idToken,"internal-error"),p(typeof e.idToken<"u","internal-error"),p(typeof e.refreshToken<"u","internal-error");let t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):zo(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){p(e.length!==0,"internal-error");let t=zo(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(p(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:i,expiresIn:s}=await Su(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){let{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new n;return r&&(p(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(p(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(p(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new n,this.toJSON())}_performRefresh(){return _e("not implemented")}};function qe(n,e){p(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}var pt=class n{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=Pn(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Ai(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new jt(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){let t=await Bt(this,this.stsTokenManager.getToken(this.auth,e));return p(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return pa(this,e)}reload(){return ma(this)}_assign(e){this!==e&&(p(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new n(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){p(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Mn(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ae(this.auth.app))return Promise.reject(Qe(this.auth));let e=await this.getIdToken();return await Bt(this,Iu(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,o,a,c,l,u;let d=(r=t.displayName)!==null&&r!==void 0?r:void 0,f=(i=t.email)!==null&&i!==void 0?i:void 0,y=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,g=(o=t.photoURL)!==null&&o!==void 0?o:void 0,I=(a=t.tenantId)!==null&&a!==void 0?a:void 0,N=(c=t._redirectEventId)!==null&&c!==void 0?c:void 0,q=(l=t.createdAt)!==null&&l!==void 0?l:void 0,P=(u=t.lastLoginAt)!==null&&u!==void 0?u:void 0,{uid:B,emailVerified:V,isAnonymous:ae,providerData:z,stsTokenManager:G}=t;p(B&&G,e,"internal-error");let ze=qt.fromJSON(this.name,G);p(typeof B=="string",e,"internal-error"),qe(d,e.name),qe(f,e.name),p(typeof V=="boolean",e,"internal-error"),p(typeof ae=="boolean",e,"internal-error"),qe(y,e.name),qe(g,e.name),qe(I,e.name),qe(N,e.name),qe(q,e.name),qe(P,e.name);let j=new n({uid:B,auth:e,email:f,emailVerified:V,displayName:d,isAnonymous:ae,photoURL:g,phoneNumber:y,tenantId:I,stsTokenManager:ze,createdAt:q,lastLoginAt:P});return z&&Array.isArray(z)&&(j.providerData=z.map(Ge=>Object.assign({},Ge))),N&&(j._redirectEventId=N),j}static async _fromIdTokenResponse(e,t,r=!1){let i=new qt;i.updateFromServerResponse(t);let s=new n({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Mn(s),s}static async _fromGetAccountInfoResponse(e,t,r){let i=t.users[0];p(i.localId!==void 0,"internal-error");let s=i.providerUserInfo!==void 0?ga(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!s?.length,a=new qt;a.updateFromIdToken(r);let c=new n({uid:i.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new jt(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!s?.length};return Object.assign(c,l),c}};var Go=new Map;function Pe(n){Re(n instanceof Function,"Expected a class definition");let e=Go.get(n);return e?(Re(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Go.set(n,e),e)}var xn=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};xn.type="NONE";var Pi=xn;function On(n,e,t){return`firebase:${n}:${e}:${t}`}var Vn=class n{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:i,name:s}=this.auth;this.fullUserKey=On(this.userKey,i.apiKey,s),this.fullPersistenceKey=On("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);return e?pt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new n(Pe(Pi),e,r);let i=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l),s=i[0]||Pe(Pi),o=On(r,e.config.apiKey,e.name),a=null;for(let l of t)try{let u=await l._get(o);if(u){let d=pt._fromJSON(e,u);l!==s&&(a=d),s=l;break}}catch{}let c=i.filter(l=>l._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new n(s,e,r):(s=c[0],a&&await s._set(o,a.toJSON()),await Promise.all(t.map(async l=>{if(l!==s)try{await l._remove(o)}catch{}})),new n(s,e,r))}};function Ko(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(ya(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(_a(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ea(e))return"Blackberry";if(Ia(e))return"Webos";if($i(e))return"Safari";if((e.includes("chrome/")||va(e))&&!e.includes("edge/"))return"Chrome";if(wa(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function _a(n=H()){return/firefox\//i.test(n)}function $i(n=H()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function va(n=H()){return/crios\//i.test(n)}function ya(n=H()){return/iemobile/i.test(n)}function wa(n=H()){return/android/i.test(n)}function Ea(n=H()){return/blackberry/i.test(n)}function Ia(n=H()){return/webos/i.test(n)}function tr(n=H()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Pu(n=H()){var e;return tr(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Ru(){return So()&&document.documentMode===10}function ba(n=H()){return tr(n)||wa(n)||Ia(n)||Ea(n)||/windows phone/i.test(n)||ya(n)}function Du(){try{return!!(window&&window!==window.top)}catch{return!1}}function Ta(n,e=[]){let t;switch(n){case"Browser":t=Ko(H());break;case"Worker":t=`${Ko(H())}-${n}`;break;default:t=n}let r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Ue}/${r}`}var Ri=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=s=>new Promise((o,a)=>{try{let c=e(s);o(c)}catch(c){a(c)}});r.onAbort=t,this.queue.push(r);let i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(let i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}};async function Ou(n,e={}){return Y(n,"GET","/v2/passwordPolicy",F(n,e))}var Cu=6,Di=class{constructor(e){var t,r,i,s;let o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:Cu,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,o,a;let c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(t=c.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),c.isValid&&(c.isValid=(r=c.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(i=c.containsLowercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(s=c.containsUppercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(a=c.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),c}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}};var Oi=class{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Fn(this),this.idTokenSubscription=new Fn(this),this.beforeStateQueue=new Ri(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=la,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Pe(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Vn.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await fa(this,{idToken:e}),r=await pt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Ae(this.app)){let o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}let r=await this.assertedPersistence.getCurrentUser(),i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,a=i?._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&c?.user&&(i=c.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return p(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Mn(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=_u()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ae(this.app))return Promise.reject(Qe(this));let t=e?K(e):null;return t&&p(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&p(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ae(this.app)?Promise.reject(Qe(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ae(this.app)?Promise.reject(Qe(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Pe(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await Ou(this),t=new Di(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Se("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Au(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&Pe(e)||this._popupRedirectResolver;p(t,this,"argument-error"),this.redirectPersistenceManager=await Vn.create(this,[Pe(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};let s=typeof t=="function"?t:t.next.bind(t),o=!1,a=this._isInitialized?Promise.resolve():this._initializationPromise;if(p(a,this,"internal-error"),a.then(()=>{o||s(this.currentUser)}),typeof t=="function"){let c=e.addObserver(t,r,i);return()=>{o=!0,c()}}else{let c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return p(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ta(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);let i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;let t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&pu(`Error while retrieving App Check token: ${t.error}`),t?.token}};function Xt(n){return K(n)}var Fn=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=Do(t=>this.observer=t)}get next(){return p(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};var nr={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Nu(n){nr=n}function Sa(n){return nr.loadJS(n)}function ku(){return nr.recaptchaEnterpriseScript}function Lu(){return nr.gapiScript}function Aa(n){return`__${n}${Math.floor(Math.random()*1e6)}`}var Mu="recaptcha-enterprise",xu="NO_RECAPTCHA",Ci=class{constructor(e){this.type=Mu,this.auth=Xt(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,a)=>{Eu(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{let l=new Si(c);return s.tenantId==null?s._agentRecaptchaConfig=l:s._tenantRecaptchaConfigs[s.tenantId]=l,o(l.siteKey)}}).catch(c=>{a(c)})})}function i(s,o,a){let c=window.grecaptcha;Wo(c)?c.enterprise.ready(()=>{c.enterprise.execute(s,{action:e}).then(l=>{o(l)}).catch(()=>{o(xu)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{r(this.auth).then(a=>{if(!t&&Wo(window.grecaptcha))i(a,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=ku();c.length!==0&&(c+=a),Sa(c).then(()=>{i(a,s,o)}).catch(l=>{o(l)})}}).catch(a=>{o(a)})})}};async function Yo(n,e,t,r=!1){let i=new Ci(n),s;try{s=await i.verify(t)}catch{s=await i.verify(t,!0)}let o=Object.assign({},e);return r?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function Jo(n,e,t,r){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let s=await Yo(n,e,t,t==="getOobCode");return r(n,s)}else return r(n,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let o=await Yo(n,e,t,t==="getOobCode");return r(n,o)}else return Promise.reject(s)})}function Pa(n,e){let t=Vt(n,"auth");if(t.isInitialized()){let i=t.getImmediate(),s=t.getOptions();if(Ye(s,e??{}))return i;de(i,"already-initialized")}return t.initialize({options:e})}function Vu(n,e){let t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(Pe);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function Ra(n,e,t){let r=Xt(n);p(r._canInitEmulator,r,"emulator-config-failed"),p(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");let i=!!t?.disableWarnings,s=Da(e),{host:o,port:a}=Fu(e),c=a===null?"":`:${a}`;r.config.emulator={url:`${s}//${o}${c}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||Uu()}function Da(n){let e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Fu(n){let e=Da(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};let r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){let s=i[1];return{host:s,port:Xo(r.substr(s.length+1))}}else{let[s,o]=r.split(":");return{host:s,port:Xo(o)}}}function Xo(n){if(!n)return null;let e=Number(n);return isNaN(e)?null:e}function Uu(){function n(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}var et=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return _e("not implemented")}_getIdTokenResponse(e){return _e("not implemented")}_linkToIdToken(e,t){return _e("not implemented")}_getReauthenticationResolver(e){return _e("not implemented")}};async function qu(n,e){return Y(n,"POST","/v1/accounts:signUp",e)}async function Bu(n,e){return it(n,"POST","/v1/accounts:signInWithPassword",F(n,e))}async function ju(n,e){return it(n,"POST","/v1/accounts:signInWithEmailLink",F(n,e))}async function Hu(n,e){return it(n,"POST","/v1/accounts:signInWithEmailLink",F(n,e))}var Ht=class n extends et{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new n(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new n(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Jo(e,t,"signInWithPassword",Bu);case"emailLink":return ju(e,{email:this._email,oobCode:this._password});default:de(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Jo(e,r,"signUpPassword",qu);case"emailLink":return Hu(e,{idToken:t,email:this._email,oobCode:this._password});default:de(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function ft(n,e){return it(n,"POST","/v1/accounts:signInWithIdp",F(n,e))}var $u="http://localhost",tt=class n extends et{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):de("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=Pn(t,["providerId","signInMethod"]);if(!r||!i)return null;let o=new n(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){let t=this.buildRequest();return ft(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,ft(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,ft(e,t)}buildRequest(){let e={requestUri:$u,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ut(t)}return e}};async function Wu(n,e){return Y(n,"POST","/v1/accounts:sendVerificationCode",F(n,e))}async function zu(n,e){return it(n,"POST","/v1/accounts:signInWithPhoneNumber",F(n,e))}async function Gu(n,e){let t=await it(n,"POST","/v1/accounts:signInWithPhoneNumber",F(n,e));if(t.temporaryProof)throw Ft(n,"account-exists-with-different-credential",t);return t}var Ku={USER_NOT_FOUND:"user-not-found"};async function Yu(n,e){let t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return it(n,"POST","/v1/accounts:signInWithPhoneNumber",F(n,t),Ku)}var $t=class n extends et{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new n({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new n({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return zu(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return Gu(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return Yu(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new n({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}};function Ju(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Xu(n){let e=dt(ht(n)).link,t=e?dt(ht(e)).deep_link_id:null,r=dt(ht(n)).deep_link_id;return(r?dt(ht(r)).link:null)||r||t||e||n}var Un=class n{constructor(e){var t,r,i,s,o,a;let c=dt(ht(e)),l=(t=c.apiKey)!==null&&t!==void 0?t:null,u=(r=c.oobCode)!==null&&r!==void 0?r:null,d=Ju((i=c.mode)!==null&&i!==void 0?i:null);p(l&&u&&d,"argument-error"),this.apiKey=l,this.operation=d,this.code=u,this.continueUrl=(s=c.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=c.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=c.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){let t=Xu(e);try{return new n(t)}catch{return null}}};var mt=class n{constructor(){this.providerId=n.PROVIDER_ID}static credential(e,t){return Ht._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=Un.parseLink(t);return p(r,"argument-error"),Ht._fromEmailAndCode(e,r.code,r.tenantId)}};mt.PROVIDER_ID="password";mt.EMAIL_PASSWORD_SIGN_IN_METHOD="password";mt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var qn=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var nt=class extends qn{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var Wt=class n extends nt{constructor(){super("facebook.com")}static credential(e){return tt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Wt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Wt.PROVIDER_ID="facebook.com";var gt=class n extends nt{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return tt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return n.credential(t,r)}catch{return null}}};gt.GOOGLE_SIGN_IN_METHOD="google.com";gt.PROVIDER_ID="google.com";var zt=class n extends nt{constructor(){super("github.com")}static credential(e){return tt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};zt.GITHUB_SIGN_IN_METHOD="github.com";zt.PROVIDER_ID="github.com";var Gt=class n extends nt{constructor(){super("twitter.com")}static credential(e,t){return tt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return n.credential(t,r)}catch{return null}}};Gt.TWITTER_SIGN_IN_METHOD="twitter.com";Gt.PROVIDER_ID="twitter.com";var Kt=class n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){let s=await pt._fromIdTokenResponse(e,r,i),o=Qo(r);return new n({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);let i=Qo(r);return new n({user:e,providerId:i,_tokenResponse:r,operationType:t})}};function Qo(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}var Ni=class n extends ne{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,n.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new n(e,t,r,i)}};function Oa(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Ni._fromErrorAndOperation(n,s,e,r):s})}async function Qu(n,e,t=!1){let r=await Bt(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Kt._forOperation(n,"link",r)}async function Zu(n,e,t=!1){let{auth:r}=n;if(Ae(r.app))return Promise.reject(Qe(r));let i="reauthenticate";try{let s=await Bt(n,Oa(r,i,e,n),t);p(s.idToken,r,"internal-error");let o=Hi(s.idToken);p(o,r,"internal-error");let{sub:a}=o;return p(n.uid===a,r,"user-mismatch"),Kt._forOperation(n,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&de(r,"user-mismatch"),s}}async function ed(n,e,t=!1){if(Ae(n.app))return Promise.reject(Qe(n));let r="signIn",i=await Oa(n,r,e),s=await Kt._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}function Ca(n,e,t,r){return K(n).onIdTokenChanged(e,t,r)}function Na(n,e,t){return K(n).beforeAuthStateChanged(e,t)}function Wi(n,e,t,r){return K(n).onAuthStateChanged(e,t,r)}function td(n,e){return Y(n,"POST","/v2/accounts/mfaEnrollment:start",F(n,e))}function nd(n,e){return Y(n,"POST","/v2/accounts/mfaEnrollment:finalize",F(n,e))}function rd(n,e){return Y(n,"POST","/v2/accounts/mfaEnrollment:start",F(n,e))}function id(n,e){return Y(n,"POST","/v2/accounts/mfaEnrollment:finalize",F(n,e))}var Bn="__sak";var jn=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Bn,"1"),this.storage.removeItem(Bn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};function sd(){let n=H();return $i(n)||tr(n)}var od=1e3,ad=10,Hn=class extends jn{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=sd()&&Du(),this.fallbackToPolling=ba(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}let r=e.key;if(t?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){let o=this.storage.getItem(r);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!t)return}let i=()=>{let o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);Ru()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,ad):i()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},od)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};Hn.type="LOCAL";var ka=Hn;var $n=class extends jn{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};$n.type="SESSION";var zi=$n;function cd(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var Wn=class n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;let r=new n(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});let a=Array.from(o).map(async l=>l(t.origin,s)),c=await cd(a);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};Wn.receivers=[];function Gi(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}var ki=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,c)=>{let l=Gi("",20);i.port1.start();let u=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(d){let f=d;if(f.data.eventId===l)switch(f.data.status){case"ack":clearTimeout(u),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(f.data.response);break;default:clearTimeout(u),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}};function ye(){return window}function ld(n){ye().location.href=n}function La(){return typeof ye().WorkerGlobalScope<"u"&&typeof ye().importScripts=="function"}async function ud(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function dd(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function hd(){return La()?self:null}var Ma="firebaseLocalStorageDb",fd=1,zn="firebaseLocalStorage",xa="fbase_key",rt=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function rr(n,e){return n.transaction([zn],e?"readwrite":"readonly").objectStore(zn)}function pd(){let n=indexedDB.deleteDatabase(Ma);return new rt(n).toPromise()}function Li(){let n=indexedDB.open(Ma,fd);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let r=n.result;try{r.createObjectStore(zn,{keyPath:xa})}catch(i){t(i)}}),n.addEventListener("success",async()=>{let r=n.result;r.objectStoreNames.contains(zn)?e(r):(r.close(),await pd(),e(await Li()))})})}async function Zo(n,e,t){let r=rr(n,!0).put({[xa]:e,value:t});return new rt(r).toPromise()}async function md(n,e){let t=rr(n,!1).get(e),r=await new rt(t).toPromise();return r===void 0?null:r.value}function ea(n,e){let t=rr(n,!0).delete(e);return new rt(t).toPromise()}var gd=800,_d=3,Gn=class{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Li(),this.db)}async _withRetries(e){let t=0;for(;;)try{let r=await this._openDb();return await e(r)}catch(r){if(t++>_d)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return La()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Wn._getInstance(hd()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await ud(),!this.activeServiceWorker)return;this.sender=new ki(this.activeServiceWorker);let r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||dd()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await Li();return await Zo(e,Bn,"1"),await ea(e,Bn),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Zo(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(r=>md(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>ea(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(i=>{let s=rr(i,!1).getAll();return new rt(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],r=new Set;if(e.length!==0)for(let{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(let i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),gd)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};Gn.type="LOCAL";var Va=Gn;function vd(n,e){return Y(n,"POST","/v2/accounts/mfaSignIn:start",F(n,e))}function yd(n,e){return Y(n,"POST","/v2/accounts/mfaSignIn:finalize",F(n,e))}function wd(n,e){return Y(n,"POST","/v2/accounts/mfaSignIn:finalize",F(n,e))}var pp=Aa("rcb"),mp=new Ze(3e4,6e4);var Ed="recaptcha";async function Id(n,e,t){var r;let i=await t.verify();try{p(typeof i=="string",n,"argument-error"),p(t.type===Ed,n,"argument-error");let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){let o=s.session;if("phoneNumber"in s)return p(o.type==="enroll",n,"internal-error"),(await td(n,{idToken:o.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,recaptchaToken:i}})).phoneSessionInfo.sessionInfo;{p(o.type==="signin",n,"internal-error");let a=((r=s.multiFactorHint)===null||r===void 0?void 0:r.uid)||s.multiFactorUid;return p(a,n,"missing-multi-factor-info"),(await vd(n,{mfaPendingCredential:o.credential,mfaEnrollmentId:a,phoneSignInInfo:{recaptchaToken:i}})).phoneResponseInfo.sessionInfo}}else{let{sessionInfo:o}=await Wu(n,{phoneNumber:s.phoneNumber,recaptchaToken:i});return o}}finally{t._reset()}}var Yt=class n{constructor(e){this.providerId=n.PROVIDER_ID,this.auth=Xt(e)}verifyPhoneNumber(e,t){return Id(this.auth,e,K(t))}static credential(e,t){return $t._fromVerification(e,t)}static credentialFromResult(e){let t=e;return n.credentialFromTaggedObject(t)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?$t._fromTokenResponse(t,r):null}};Yt.PROVIDER_ID="phone";Yt.PHONE_SIGN_IN_METHOD="phone";function bd(n,e){return e?Pe(e):(p(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}var Jt=class extends et{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ft(e,this._buildIdpRequest())}_linkToIdToken(e,t){return ft(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return ft(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function Td(n){return ed(n.auth,new Jt(n),n.bypassAuthState)}function Sd(n){let{auth:e,user:t}=n;return p(t,e,"internal-error"),Zu(t,new Jt(n),n.bypassAuthState)}async function Ad(n){let{auth:e,user:t}=n;return p(t,e,"internal-error"),Qu(t,new Jt(n),n.bypassAuthState)}var Kn=class{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}let c={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Td;case"linkViaPopup":case"linkViaRedirect":return Ad;case"reauthViaPopup":case"reauthViaRedirect":return Sd;default:de(this.auth,"internal-error")}}resolve(e){Re(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Re(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var Pd=new Ze(2e3,1e4);var Mi=class n extends Kn{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,n.currentPopupAction&&n.currentPopupAction.cancel(),n.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return p(e,this.auth,"internal-error"),e}async onExecution(){Re(this.filter.length===1,"Popup operations only handle one event");let e=Gi();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ve(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(ve(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,n.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ve(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Pd.get())};e()}};Mi.currentPopupAction=null;var Rd="pendingRedirect",Cn=new Map,xi=class extends Kn{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Cn.get(this.auth._key());if(!e){try{let r=await Dd(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Cn.set(this.auth._key(),e)}return this.bypassAuthState||Cn.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function Dd(n,e){let t=Nd(e),r=Cd(n);if(!await r._isAvailable())return!1;let i=await r._get(t)==="true";return await r._remove(t),i}function Od(n,e){Cn.set(n._key(),e)}function Cd(n){return Pe(n._redirectPersistence)}function Nd(n){return On(Rd,n.config.apiKey,n.name)}async function kd(n,e,t=!1){if(Ae(n.app))return Promise.reject(Qe(n));let r=Xt(n),i=bd(r,e),o=await new xi(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}var Ld=10*60*1e3,Vi=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Md(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Fa(e)){let i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(ve(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Ld&&this.cachedEventUids.clear(),this.cachedEventUids.has(ta(e))}saveEventToCache(e){this.cachedEventUids.add(ta(e)),this.lastProcessedEventTime=Date.now()}};function ta(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Fa({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function Md(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Fa(n);default:return!1}}async function xd(n,e={}){return Y(n,"GET","/v1/projects",e)}var Vd=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Fd=/^https?/;async function Ud(n){if(n.config.emulator)return;let{authorizedDomains:e}=await xd(n);for(let t of e)try{if(qd(t))return}catch{}de(n,"unauthorized-domain")}function qd(n){let e=bi(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){let o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!Fd.test(t))return!1;if(Vd.test(n))return r===n;let i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}var Bd=new Ze(3e4,6e4);function na(){let n=ye().___jsl;if(n?.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function jd(n){return new Promise((e,t)=>{var r,i,s;function o(){na(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{na(),t(ve(n,"network-request-failed"))},timeout:Bd.get()})}if(!((i=(r=ye().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=ye().gapi)===null||s===void 0)&&s.load)o();else{let a=Aa("iframefcb");return ye()[a]=()=>{gapi.load?o():t(ve(n,"network-request-failed"))},Sa(`${Lu()}?onload=${a}`).catch(c=>t(c))}}).catch(e=>{throw Nn=null,e})}var Nn=null;function Hd(n){return Nn=Nn||jd(n),Nn}var $d=new Ze(5e3,15e3),Wd="__/auth/iframe",zd="emulator/auth/iframe",Gd={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Kd=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Yd(n){let e=n.config;p(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?ji(e,zd):`https://${n.config.authDomain}/${Wd}`,r={apiKey:e.apiKey,appName:n.name,v:Ue},i=Kd.get(n.config.apiHost);i&&(r.eid=i);let s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${ut(r).slice(1)}`}async function Jd(n){let e=await Hd(n),t=ye().gapi;return p(t,n,"internal-error"),e.open({where:document.body,url:Yd(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Gd,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});let o=ve(n,"network-request-failed"),a=ye().setTimeout(()=>{s(o)},$d.get());function c(){ye().clearTimeout(a),i(r)}r.ping(c).then(c,()=>{s(o)})}))}var Xd={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Qd=500,Zd=600,eh="_blank",th="http://localhost",Yn=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function nh(n,e,t,r=Qd,i=Zd){let s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString(),a="",c=Object.assign(Object.assign({},Xd),{width:r.toString(),height:i.toString(),top:s,left:o}),l=H().toLowerCase();t&&(a=va(l)?eh:t),_a(l)&&(e=e||th,c.scrollbars="yes");let u=Object.entries(c).reduce((f,[y,g])=>`${f}${y}=${g},`,"");if(Pu(l)&&a!=="_self")return rh(e||"",a),new Yn(null);let d=window.open(e||"",a,u);p(d,n,"popup-blocked");try{d.focus()}catch{}return new Yn(d)}function rh(n,e){let t=document.createElement("a");t.href=n,t.target=e;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}var ih="__/auth/handler",sh="emulator/auth/handler",oh=encodeURIComponent("fac");async function ra(n,e,t,r,i,s){p(n.config.authDomain,n,"auth-domain-config-required"),p(n.config.apiKey,n,"invalid-api-key");let o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Ue,eventId:i};if(e instanceof qn){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Ro(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(let[u,d]of Object.entries(s||{}))o[u]=d}if(e instanceof nt){let u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}n.tenantId&&(o.tid=n.tenantId);let a=o;for(let u of Object.keys(a))a[u]===void 0&&delete a[u];let c=await n._getAppCheckToken(),l=c?`#${oh}=${encodeURIComponent(c)}`:"";return`${ah(n)}?${ut(a).slice(1)}${l}`}function ah({config:n}){return n.emulator?ji(n,sh):`https://${n.authDomain}/${ih}`}var Ii="webStorageSupport",Fi=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=zi,this._completeRedirectFn=kd,this._overrideRedirectResult=Od}async _openPopup(e,t,r,i){var s;Re((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");let o=await ra(e,t,r,bi(),i);return nh(e,o,Gi())}async _openRedirect(e,t,r,i){await this._originValidation(e);let s=await ra(e,t,r,bi(),i);return ld(s),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(Re(s,"If manager is not set, promise should be"),s)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await Jd(e),r=new Vi(e);return t.register("authEvent",i=>(p(i?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ii,{type:Ii},i=>{var s;let o=(s=i?.[0])===null||s===void 0?void 0:s[Ii];o!==void 0&&t(!!o),de(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Ud(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return ba()||$i()||tr()}},Ua=Fi,Jn=class{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return _e("unexpected MultiFactorSessionType")}}},Ui=class n extends Jn{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n(e)}_finalizeEnroll(e,t,r){return nd(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return yd(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},Xn=class{constructor(){}static assertion(e){return Ui._fromCredential(e)}};Xn.FACTOR_ID="phone";var Qn=class{static assertionForEnrollment(e,t){return Zn._fromSecret(e,t)}static assertionForSignIn(e,t){return Zn._fromEnrollmentId(e,t)}static async generateSecret(e){var t;let r=e;p(typeof((t=r.user)===null||t===void 0?void 0:t.auth)<"u","internal-error");let i=await rd(r.user.auth,{idToken:r.credential,totpEnrollmentInfo:{}});return er._fromStartTotpMfaEnrollmentResponse(i,r.user.auth)}};Qn.FACTOR_ID="totp";var Zn=class n extends Jn{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new n(t,void 0,e)}static _fromEnrollmentId(e,t){return new n(t,e)}async _finalizeEnroll(e,t,r){return p(typeof this.secret<"u",e,"argument-error"),id(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){p(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let r={verificationCode:this.otp};return wd(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}},er=class n{constructor(e,t,r,i,s,o,a){this.sessionInfo=o,this.auth=a,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var r;let i=!1;return(Rn(e)||Rn(t))&&(i=!0),i&&(Rn(e)&&(e=((r=this.auth.currentUser)===null||r===void 0?void 0:r.email)||"unknownuser"),Rn(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function Rn(n){return typeof n>"u"||n?.length===0}var ia="@firebase/auth",sa="1.7.2";var qi=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){p(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function ch(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function lh(n){Fe(new ce("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;p(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});let c={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ta(n)},l=new Oi(r,i,s,c);return Vu(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Fe(new ce("auth-internal",e=>{let t=Xt(e.getProvider("auth").getImmediate());return(r=>new qi(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),ue(ia,sa,ch(n)),ue(ia,sa,"esm2017")}var uh=5*60,dh=si("authIdTokenMaxAge")||uh,oa=null,hh=n=>async e=>{let t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>dh)return;let i=t?.token;oa!==i&&(oa=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function Ki(n=An()){let e=Vt(n,"auth");if(e.isInitialized())return e.getImmediate();let t=Pa(n,{popupRedirectResolver:Ua,persistence:[Va,ka,zi]}),r=si("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){let s=new URL(r,location.origin);if(location.origin===s.origin){let o=hh(s.toString());Na(t,o,()=>o(t.currentUser)),Ca(t,a=>o(a))}}let i=ri("auth");return i&&Ra(t,`http://${i}`),t}function fh(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}Nu({loadJS(n){return new Promise((e,t)=>{let r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{let s=ve("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",fh().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});lh("Browser");var yh="firebase",wh="10.11.1";ue(yh,wh,"app");var Eh={apiKey:process.env.API_KEY,authDomain:"all-my-favs.firebaseapp.com",projectId:"all-my-favs",storageBucket:"all-my-favs.appspot.com",messagingSenderId:"681035335387",appId:"1:681035335387:web:b5e8b4c606f38816486efe",measurementId:"G-1JZ3EFMXT1"},Ih=wi(Eh),ir=Ih;var M=n=>document.getElementById(n),sr=M("app"),Yi='<div id="loader"> <img src="/icon.svg" alt="All My Favs logo icon" /> <div class="spinner"></div> </div>';function qa(){sr.innerHTML=Yi}var or=n=>n&&typeof n=="string"&&n.length>1,bh=/^[\p{L}\p{N}\p{P} ]+$/u;function Ji(n){return or(n)&&bh.test(n)&&n.length<=80}function Ba(n){return M(n).content.cloneNode(!0)}var J=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};J.UNAUTHENTICATED=new J(null),J.GOOGLE_CREDENTIALS=new J("google-credentials-uid"),J.FIRST_PARTY=new J("first-party-uid"),J.MOCK_USER=new J("mock-user");var St="10.11.1";var yt=new xe("@firebase/firestore");function lr(n,...e){if(yt.logLevel<=S.DEBUG){let t=e.map(Bs);yt.debug(`Firestore (${St}): ${n}`,...t)}}function qs(n,...e){if(yt.logLevel<=S.ERROR){let t=e.map(Bs);yt.error(`Firestore (${St}): ${n}`,...t)}}function rc(n,...e){if(yt.logLevel<=S.WARN){let t=e.map(Bs);yt.warn(`Firestore (${St}): ${n}`,...t)}}function Bs(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}function O(n="Unexpected state"){let e=`FIRESTORE (${St}) INTERNAL ASSERTION FAILED: `+n;throw qs(e),new Error(e)}function Be(n,e){n||O()}function Or(n,e){return n}var ja="ok",Th="cancelled",Qt="unknown",E="invalid-argument",Sh="deadline-exceeded",Ah="not-found";var Ph="permission-denied",Qi="unauthenticated",Rh="resource-exhausted",wt="failed-precondition",Dh="aborted",Oh="out-of-range",ic="unimplemented",Ch="internal",Nh="unavailable";var m=class extends ne{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var ur=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},Zi=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(J.UNAUTHENTICATED))}shutdown(){}},es=class{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}},ts=class{constructor(e){this.auth=null,e.onInit(t=>{this.auth=t})}getToken(){return this.auth?this.auth.getToken().then(e=>e?(Be(typeof e.accessToken=="string"),new ur(e.accessToken,new J(this.auth.getUid()))):null):Promise.resolve(null)}invalidateToken(){}start(e,t){}shutdown(){}},ns=class{constructor(e,t,r){this.t=e,this.i=t,this.o=r,this.type="FirstParty",this.user=J.FIRST_PARTY,this.u=new Map}l(){return this.o?this.o():null}get headers(){this.u.set("X-Goog-AuthUser",this.t);let e=this.l();return e&&this.u.set("Authorization",e),this.i&&this.u.set("X-Goog-Iam-Authorization-Token",this.i),this.u}},rs=class{constructor(e,t,r){this.t=e,this.i=t,this.o=r}getToken(){return Promise.resolve(new ns(this.t,this.i,this.o))}start(e,t){e.enqueueRetryable(()=>t(J.FIRST_PARTY))}shutdown(){}invalidateToken(){}},is=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},ss=class{constructor(e){this.h=e,this.appCheck=null,e.onInit(t=>{this.appCheck=t})}getToken(){return this.appCheck?this.appCheck.getToken().then(e=>e?(Be(typeof e.token=="string"),new is(e.token)):null):Promise.resolve(null)}invalidateToken(){}start(e,t){}shutdown(){}};var os=class{constructor(e,t,r,i,s,o,a,c,l){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=c,this.useFetchStreams=l}},dr=class n{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new n("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof n&&e.projectId===this.projectId&&e.database===this.database}},hr=class n{constructor(e,t,r){t===void 0?t=0:t>e.length&&O(),r===void 0?r=e.length-t:r>e.length-t&&O(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return n.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof n?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let i=0;i<r;i++){let s=e.get(i),o=t.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}},$=class n extends hr{construct(e,t,r){return new n(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new m(E,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new n(t)}static emptyPath(){return new n([])}},kh=/^[_a-zA-Z][_a-zA-Z0-9]*$/,we=class n extends hr{construct(e,t,r){return new n(e,t,r)}static isValidIdentifier(e){return kh.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),n.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new n(["__name__"])}static fromServerFormat(e){let t=[],r="",i=0,s=()=>{if(r.length===0)throw new m(E,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},o=!1;for(;i<e.length;){let a=e[i];if(a==="\\"){if(i+1===e.length)throw new m(E,"Path has trailing escape character: "+e);let c=e[i+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new m(E,"Path has invalid escape sequence: "+e);r+=c,i+=2}else a==="`"?(o=!o,i++):a!=="."||o?(r+=a,i++):(s(),i++)}if(s(),o)throw new m(E,"Unterminated ` in path: "+e);return new n(t)}static emptyPath(){return new n([])}};var ee=class n{constructor(e){this.path=e}static fromPath(e){return new n($.fromString(e))}static fromName(e){return new n($.fromString(e).popFirst(5))}static empty(){return new n($.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&$.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return $.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new n(new $(e.slice()))}};function sc(n,e,t){if(!t)throw new m(E,`Function ${n}() cannot be called with an empty ${e}.`)}function Ha(n){if(!ee.isDocumentKey(n))throw new m(E,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function $a(n){if(ee.isDocumentKey(n))throw new m(E,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Cr(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":O()}function Nr(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new m(E,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=Cr(n);throw new m(E,`Expected type '${e.name}', but it was: ${t}`)}}return n}function oc(n){let e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}var ar=null;function Lh(){return ar===null?ar=function(){return 268435456+Math.round(2147483648*Math.random())}():ar++,"0x"+ar.toString(16)}function Mh(n){return n==null}function fr(n){return n===0&&1/n==-1/0}var xh={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};var Wa,b;function za(n){if(n===void 0)return qs("RPC_ERROR","HTTP error has no status"),Qt;switch(n){case 200:return ja;case 400:return wt;case 401:return Qi;case 403:return Ph;case 404:return Ah;case 409:return Dh;case 416:return Oh;case 429:return Rh;case 499:return Th;case 500:return Qt;case 501:return ic;case 503:return Nh;case 504:return Sh;default:return n>=200&&n<300?ja:n>=400&&n<500?wt:n>=500&&n<600?Ch:Qt}}(b=Wa||(Wa={}))[b.OK=0]="OK",b[b.CANCELLED=1]="CANCELLED",b[b.UNKNOWN=2]="UNKNOWN",b[b.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",b[b.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",b[b.NOT_FOUND=5]="NOT_FOUND",b[b.ALREADY_EXISTS=6]="ALREADY_EXISTS",b[b.PERMISSION_DENIED=7]="PERMISSION_DENIED",b[b.UNAUTHENTICATED=16]="UNAUTHENTICATED",b[b.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",b[b.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",b[b.ABORTED=10]="ABORTED",b[b.OUT_OF_RANGE=11]="OUT_OF_RANGE",b[b.UNIMPLEMENTED=12]="UNIMPLEMENTED",b[b.INTERNAL=13]="INTERNAL",b[b.UNAVAILABLE=14]="UNAVAILABLE",b[b.DATA_LOSS=15]="DATA_LOSS";var as=class extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;let r=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.m=r+"://"+t.host,this.A=`projects/${i}/databases/${s}`,this.T=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get R(){return!1}P(t,r,i,s,o){let a=Lh(),c=this.I(t,r.toUriEncodedString());lr("RestConnection",`Sending RPC '${t}' ${a}:`,c,i);let l={"google-cloud-resource-prefix":this.A,"x-goog-request-params":this.T};return this.V(l,s,o),this.p(t,c,l,i).then(u=>(lr("RestConnection",`Received RPC '${t}' ${a}: `,u),u),u=>{throw rc("RestConnection",`RPC '${t}' ${a} failed with error: `,u,"url: ",c,"request:",i),u})}g(t,r,i,s,o,a){return this.P(t,r,i,s,o)}V(t,r,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+St}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,o)=>t[o]=s),i&&i.headers.forEach((s,o)=>t[o]=s)}I(t,r){let i=xh[t];return`${this.m}/v1/${r}:${i}`}terminate(){}}{constructor(e,t){super(e),this.F=t}v(e,t){throw new Error("Not supported by FetchConnection")}async p(e,t,r,i){var s;let o=JSON.stringify(i),a;try{a=await this.F(t,{method:"POST",headers:r,body:o})}catch(c){let l=c;throw new m(za(l.status),"Request failed with error: "+l.statusText)}if(!a.ok){let c=await a.json();Array.isArray(c)&&(c=c[0]);let l=(s=c?.error)===null||s===void 0?void 0:s.message;throw new m(za(a.status),`Request failed with error: ${l??a.statusText}`)}return a.json()}};function Vh(n){let e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}var cs=class{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length,r="";for(;r.length<20;){let i=Vh(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%e.length))}return r}};function U(n,e){return n<e?-1:n>e?1:0}function ac(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}function Ga(n){let e=0;for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function kr(n,e){for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}var ls=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var je=class n{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new ls("Invalid base64 string: "+s):s}}(e);return new n(t)}static fromUint8Array(e){let t=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new n(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){let r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return U(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};je.EMPTY_BYTE_STRING=new je("");var Fh=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function st(n){if(Be(!!n),typeof n=="string"){let e=0,t=Fh.exec(n);if(Be(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:x(n.seconds),nanos:x(n.nanos)}}function x(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function tn(n){return typeof n=="string"?je.fromBase64String(n):je.fromUint8Array(n)}var he=class n{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new m(E,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new m(E,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new m(E,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new m(E,"Timestamp seconds out of range: "+e)}static now(){return n.fromMillis(Date.now())}static fromDate(e){return n.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new n(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?U(this.nanoseconds,e.nanoseconds):U(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){let e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};function cc(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function lc(n){let e=n.mapValue.fields.__previous_value__;return cc(e)?lc(e):e}function nn(n){let e=st(n.mapValue.fields.__local_write_time__.timestampValue);return new he(e.seconds,e.nanos)}var cr={fields:{__type__:{stringValue:"__max__"}}};function ot(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?cc(n)?4:function(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}(n)?9007199254740991:10:O()}function pr(n,e){if(n===e)return!0;let t=ot(n);if(t!==ot(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return nn(n).isEqual(nn(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;let o=st(i.timestampValue),a=st(s.timestampValue);return o.seconds===a.seconds&&o.nanos===a.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return tn(i.bytesValue).isEqual(tn(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return x(i.geoPointValue.latitude)===x(s.geoPointValue.latitude)&&x(i.geoPointValue.longitude)===x(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return x(i.integerValue)===x(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){let o=x(i.doubleValue),a=x(s.doubleValue);return o===a?fr(o)===fr(a):isNaN(o)&&isNaN(a)}return!1}(n,e);case 9:return ac(n.arrayValue.values||[],e.arrayValue.values||[],pr);case 10:return function(i,s){let o=i.mapValue.fields||{},a=s.mapValue.fields||{};if(Ga(o)!==Ga(a))return!1;for(let c in o)if(o.hasOwnProperty(c)&&(a[c]===void 0||!pr(o[c],a[c])))return!1;return!0}(n,e);default:return O()}}function rn(n,e){return(n.values||[]).find(t=>pr(t,e))!==void 0}function mr(n,e){if(n===e)return 0;let t=ot(n),r=ot(e);if(t!==r)return U(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return U(n.booleanValue,e.booleanValue);case 2:return function(s,o){let a=x(s.integerValue||s.doubleValue),c=x(o.integerValue||o.doubleValue);return a<c?-1:a>c?1:a===c?0:isNaN(a)?isNaN(c)?0:-1:1}(n,e);case 3:return Ka(n.timestampValue,e.timestampValue);case 4:return Ka(nn(n),nn(e));case 5:return U(n.stringValue,e.stringValue);case 6:return function(s,o){let a=tn(s),c=tn(o);return a.compareTo(c)}(n.bytesValue,e.bytesValue);case 7:return function(s,o){let a=s.split("/"),c=o.split("/");for(let l=0;l<a.length&&l<c.length;l++){let u=U(a[l],c[l]);if(u!==0)return u}return U(a.length,c.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,o){let a=U(x(s.latitude),x(o.latitude));return a!==0?a:U(x(s.longitude),x(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return function(s,o){let a=s.values||[],c=o.values||[];for(let l=0;l<a.length&&l<c.length;++l){let u=mr(a[l],c[l]);if(u)return u}return U(a.length,c.length)}(n.arrayValue,e.arrayValue);case 10:return function(s,o){if(s===cr&&o===cr)return 0;if(s===cr)return 1;if(o===cr)return-1;let a=s.fields||{},c=Object.keys(a),l=o.fields||{},u=Object.keys(l);c.sort(),u.sort();for(let d=0;d<c.length&&d<u.length;++d){let f=U(c[d],u[d]);if(f!==0)return f;let y=mr(a[c[d]],l[u[d]]);if(y!==0)return y}return U(c.length,u.length)}(n.mapValue,e.mapValue);default:throw O()}}function Ka(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return U(n,e);let t=st(n),r=st(e),i=U(t.seconds,r.seconds);return i!==0?i:U(t.nanos,r.nanos)}function Ya(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function uc(n){return!!n&&"arrayValue"in n}function Ja(n){return!!n&&"nullValue"in n}function Xa(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Xi(n){return!!n&&"mapValue"in n}function Zt(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){let e={mapValue:{fields:{}}};return kr(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Zt(r)),e}if(n.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Zt(n.arrayValue.values[t]);return e}return Object.assign({},n)}var gr=class{constructor(e,t){this.position=e,this.inclusive=t}};var _r=class{},fe=class n extends _r{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new us(e,t,r):t==="array-contains"?new fs(e,r):t==="in"?new ps(e,r):t==="not-in"?new ms(e,r):t==="array-contains-any"?new gs(e,r):new n(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new ds(e,r):new hs(e,r)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(mr(t,this.value)):t!==null&&ot(this.value)===ot(t)&&this.matchesComparison(mr(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return O()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},sn=class n extends _r{constructor(e,t){super(),this.filters=e,this.op=t,this.D=null}static create(e,t){return new n(e,t)}matches(e){return function(r){return r.op==="and"}(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.D!==null||(this.D=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.D}getFilters(){return Object.assign([],this.filters)}};var us=class extends fe{constructor(e,t,r){super(e,t,r),this.key=ee.fromName(r.referenceValue)}matches(e){let t=ee.comparator(e.key,this.key);return this.matchesComparison(t)}},ds=class extends fe{constructor(e,t){super(e,"in",t),this.keys=dc("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}},hs=class extends fe{constructor(e,t){super(e,"not-in",t),this.keys=dc("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}};function dc(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>ee.fromName(r.referenceValue))}var fs=class extends fe{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return uc(t)&&rn(t.arrayValue,this.value)}},ps=class extends fe{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&rn(this.value.arrayValue,t)}},ms=class extends fe{constructor(e,t){super(e,"not-in",t)}matches(e){if(rn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&!rn(this.value.arrayValue,t)}},gs=class extends fe{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!uc(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>rn(this.value.arrayValue,r))}};var on=class{constructor(e,t="asc"){this.field=e,this.dir=t}};var Z=class n{constructor(e){this.timestamp=e}static fromTimestamp(e){return new n(e)}static min(){return new n(new he(0,0))}static max(){return new n(new he(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var _s=class n{constructor(e,t){this.comparator=e,this.root=t||Ee.EMPTY}insert(e,t){return new n(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ee.BLACK,null,null))}remove(e){return new n(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ee.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new vt(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new vt(this.root,e,this.comparator,!1)}getReverseIterator(){return new vt(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new vt(this.root,e,this.comparator,!0)}},vt=class{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},Ee=class n{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??n.RED,this.left=i??n.EMPTY,this.right=s??n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new n(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this,s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return n.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw O();let e=this.left.check();if(e!==this.right.check())throw O();return e+(this.isRed()?0:1)}};Ee.EMPTY=null,Ee.RED=!0,Ee.BLACK=!1;Ee.EMPTY=new class{constructor(){this.size=0}get key(){throw O()}get value(){throw O()}get color(){throw O()}get left(){throw O()}get right(){throw O()}copy(e,t,r,i,s){return this}insert(e,t,r){return new Ee(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var vr=class n{constructor(e){this.comparator=e,this.data=new _s(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new yr(this.data.getIterator())}getIteratorFrom(e){return new yr(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new n(this.comparator);return t.data=e,t}},yr=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};var wr=class n{constructor(e){this.fields=e,e.sort(we.comparator)}static empty(){return new n([])}unionWith(e){let t=new vr(we.comparator);for(let r of this.fields)t=t.add(r);for(let r of e)t=t.add(r);return new n(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return ac(this.fields,e.fields,(t,r)=>t.isEqual(r))}};var De=class n{constructor(e){this.value=e}static empty(){return new n({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Xi(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Zt(t)}setAll(e){let t=we.emptyPath(),r={},i=[];e.forEach((o,a)=>{if(!t.isImmediateParentOf(a)){let c=this.getFieldsMap(t);this.applyChanges(c,r,i),r={},i=[],t=a.popLast()}o?r[a.lastSegment()]=Zt(o):i.push(a.lastSegment())});let s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){let t=this.field(e.popLast());Xi(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return pr(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];Xi(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){kr(t,(i,s)=>e[i]=s);for(let i of r)delete e[i]}clone(){return new n(Zt(this.value))}};var vs=class n{constructor(e,t,r,i,s,o,a){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=a}static newInvalidDocument(e){return new n(e,0,Z.min(),Z.min(),Z.min(),De.empty(),0)}static newFoundDocument(e,t,r,i){return new n(e,1,t,Z.min(),r,i,0)}static newNoDocument(e,t){return new n(e,2,t,Z.min(),Z.min(),De.empty(),0)}static newUnknownDocument(e,t){return new n(e,3,t,Z.min(),Z.min(),De.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(Z.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=De.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=De.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Z.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof n&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var ys=class{constructor(e,t=null,r=[],i=[],s=null,o=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=a,this.C=null}};function Qa(n,e=null,t=[],r=[],i=null,s=null,o=null){return new ys(n,e,t,r,i,s,o)}var Er=class{constructor(e,t=null,r=[],i=[],s=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=a,this.endAt=c,this.S=null,this.N=null,this.O=null,this.startAt,this.endAt}};function Uh(n){return n.collectionGroup!==null}function qh(n){let e=Or(n);if(e.S===null){e.S=[];let t=new Set;for(let s of e.explicitOrderBy)e.S.push(s),t.add(s.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let a=new vr(we.comparator);return o.filters.forEach(c=>{c.getFlattenedFilters().forEach(l=>{l.isInequality()&&(a=a.add(l.field))})}),a})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.S.push(new on(s,r))}),t.has(we.keyField().canonicalString())||e.S.push(new on(we.keyField(),r))}return e.S}function Bh(n){let e=Or(n);return e.N||(e.N=jh(e,qh(n))),e.N}function jh(n,e){if(n.limitType==="F")return Qa(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{let s=i.dir==="desc"?"asc":"desc";return new on(i.field,s)});let t=n.endAt?new gr(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new gr(n.startAt.position,n.startAt.inclusive):null;return Qa(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function ws(n,e){let t=n.filters.concat([e]);return new Er(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Hh(n,e){return function(r){return typeof r=="number"&&Number.isInteger(r)&&!fr(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}(e)?function(r){return{integerValue:""+r}}(e):function(r,i){if(r.useProto3Json){if(isNaN(i))return{doubleValue:"NaN"};if(i===1/0)return{doubleValue:"Infinity"};if(i===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:fr(i)?"-0":i}}(n,e)}var Et=class{constructor(){this._=void 0}},Es=class extends Et{},Is=class extends Et{constructor(e){super(),this.elements=e}},bs=class extends Et{constructor(e){super(),this.elements=e}},Ts=class extends Et{constructor(e,t){super(),this.serializer=e,this.q=t}};var Ir=class n{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new n}static exists(e){return new n(void 0,e)}static updateTime(e){return new n(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}},It=class{},br=class extends It{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}},Tr=class extends It{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}},Ss=class extends It{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},As=class extends It{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var $h={asc:"ASCENDING",desc:"DESCENDING"},Wh={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},zh={and:"AND",or:"OR"},Ps=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function Rs(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Gh(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Kh(n,e){return Rs(n,e.toTimestamp())}function Za(n){return Be(!!n),Z.fromTimestamp(function(t){let r=st(t);return new he(r.seconds,r.nanos)}(n))}function js(n,e){return Ds(n,e).canonicalString()}function Ds(n,e){let t=function(i){return new $(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Os(n,e){return js(n.databaseId,e.path)}function Yh(n,e){let t=function(i){let s=$.fromString(i);return Be(fc(s)),s}(e);if(t.get(1)!==n.databaseId.projectId)throw new m(E,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new m(E,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new ee(function(i){return Be(i.length>4&&i.get(4)==="documents"),i.popFirst(5)}(t))}function ec(n,e,t){return{name:Os(n,e),fields:t.value.mapValue.fields}}function Jh(n,e){let t;if(e instanceof br)t={update:ec(n,e.key,e.value)};else if(e instanceof Ss)t={delete:Os(n,e.key)};else if(e instanceof Tr)t={update:ec(n,e.key,e.data),updateMask:tf(e.fieldMask)};else{if(!(e instanceof As))return O();t={verify:Os(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,o){let a=o.transform;if(a instanceof Es)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof Is)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof bs)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof Ts)return{fieldPath:o.field.canonicalString(),increment:a.q};throw O()}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:Kh(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:O()}(n,e.precondition)),t}function Xh(n,e){let t={structuredQuery:{}},r=e.path,i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=function(l,u){return js(l.databaseId,u)}(n,i);let s=function(l){if(l.length!==0)return hc(sn.create(l,"and"))}(e.filters);s&&(t.structuredQuery.where=s);let o=function(l){if(l.length!==0)return l.map(u=>function(f){return{field:_t(f.field),direction:Qh(f.dir)}}(u))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);let a=function(l,u){return l.useProto3Json||Mh(u)?u:{value:u}}(n,e.limit);return a!==null&&(t.structuredQuery.limit=a),e.startAt&&(t.structuredQuery.startAt=function(l){return{before:l.inclusive,values:l.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(l){return{before:!l.inclusive,values:l.position}}(e.endAt)),{B:t,parent:i}}function Qh(n){return $h[n]}function Zh(n){return Wh[n]}function ef(n){return zh[n]}function _t(n){return{fieldPath:n.canonicalString()}}function hc(n){return n instanceof fe?function(t){if(t.op==="=="){if(Xa(t.value))return{unaryFilter:{field:_t(t.field),op:"IS_NAN"}};if(Ja(t.value))return{unaryFilter:{field:_t(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Xa(t.value))return{unaryFilter:{field:_t(t.field),op:"IS_NOT_NAN"}};if(Ja(t.value))return{unaryFilter:{field:_t(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:_t(t.field),op:Zh(t.op),value:t.value}}}(n):n instanceof sn?function(t){let r=t.getFilters().map(i=>hc(i));return r.length===1?r[0]:{compositeFilter:{op:ef(t.op),filters:r}}}(n):O()}function tf(n){let e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function fc(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Hs(n){return new Ps(n,!0)}var Cs=class extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.Y=!1}Z(){if(this.Y)throw new m(wt,"The client has already been terminated.")}P(e,t,r,i){return this.Z(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.P(e,Ds(t,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===Qi&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new m(Qt,s.toString())})}g(e,t,r,i,s){return this.Z(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.g(e,Ds(t,r),i,o,a,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===Qi&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new m(Qt,o.toString())})}terminate(){this.Y=!0,this.connection.terminate()}};async function pc(n,e){let t=Or(n),r={writes:e.map(i=>Jh(t.serializer,i))};await t.P("Commit",t.serializer.databaseId,$.emptyPath(),r)}async function nf(n,e){let t=Or(n),{B:r,parent:i}=Xh(t.serializer,Bh(e));return(await t.g("RunQuery",t.serializer.databaseId,i,{structuredQuery:r.structuredQuery})).filter(s=>!!s.document).map(s=>function(a,c,l){let u=Yh(a,c.name),d=Za(c.updateTime),f=c.createTime?Za(c.createTime):Z.min(),y=new De({mapValue:{fields:c.fields}}),g=vs.newFoundDocument(u,d,f,y);return l&&g.setHasCommittedMutations(),l?g.setHasCommittedMutations():g}(t.serializer,s.document,void 0))}var en=new Map;function $s(n){if(n._terminated)throw new m(wt,"The client has already been terminated.");if(!en.has(n)){lr("ComponentProvider","Initializing Datastore");let e=function(s){return new as(s,fetch.bind(null))}(function(s,o,a,c){return new os(s,o,a,c.host,c.ssl,c.experimentalForceLongPolling,c.experimentalAutoDetectLongPolling,oc(c.experimentalLongPollingOptions),c.useFetchStreams)}(n._databaseId,n.app.options.appId||"",n._persistenceKey,n._freezeSettings())),t=Hs(n._databaseId),r=function(s,o,a,c){return new Cs(s,o,a,c)}(n._authCredentials,n._appCheckCredentials,e,t);en.set(n,r)}return en.get(n)}var Sr=class{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new m(E,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new m(E,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(s,o,a,c){if(o===!0&&c===!0)throw new m(E,`${s} and ${a} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=oc((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new m(E,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new m(E,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new m(E,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}},bt=class{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Sr({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new m(wt,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new m(wt,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Sr(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Zi;switch(r.type){case"firstParty":return new rs(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new m(E,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){let r=en.get(t);r&&(lr("ComponentProvider","Removing Datastore"),en.delete(t),r.terminate())}(this),Promise.resolve()}};function mc(n,e){let t=typeof n=="object"?n:An(),r=typeof n=="string"?n:e||"(default)",i=Vt(t,"firestore/lite").getImmediate({identifier:r});if(!i._initialized){let s=wo("firestore");s&&rf(i,...s)}return i}function rf(n,e,t,r={}){var i;let s=(n=Nr(n,bt))._getSettings(),o=`${e}:${t}`;if(s.host!=="firestore.googleapis.com"&&s.host!==o&&rc("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),r.mockUserToken){let a,c;if(typeof r.mockUserToken=="string")a=r.mockUserToken,c=J.MOCK_USER;else{a=Eo(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);let l=r.mockUserToken.sub||r.mockUserToken.user_id;if(!l)throw new m(E,"mockUserToken must contain 'sub' or 'user_id' field!");c=new J(l)}n._authCredentials=new es(new ur(a,c))}}var Tt=class n{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new n(this.firestore,e,this._query)}},re=class n{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Oe(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new n(this.firestore,e,this._key)}},Oe=class n extends Tt{constructor(e,t,r){super(e,t,function(s){return new Er(s)}(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new re(this.firestore,null,new ee(e))}withConverter(e){return new n(this.firestore,e,this._path)}};function Lr(n,e,...t){if(n=K(n),sc("collection","path",e),n instanceof bt){let r=$.fromString(e,...t);return $a(r),new Oe(n,null,r)}{if(!(n instanceof re||n instanceof Oe))throw new m(E,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child($.fromString(e,...t));return $a(r),new Oe(n.firestore,null,r)}}function Ws(n,e,...t){if(n=K(n),arguments.length===1&&(e=cs.newId()),sc("doc","path",e),n instanceof bt){let r=$.fromString(e,...t);return Ha(r),new re(n,null,new ee(r))}{if(!(n instanceof re||n instanceof Oe))throw new m(E,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child($.fromString(e,...t));return Ha(r),new re(n.firestore,n instanceof Oe?n.converter:null,new ee(r))}}var an=class n{constructor(e){this._byteString=e}static fromBase64String(e){try{return new n(je.fromBase64String(e))}catch(t){throw new m(E,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new n(je.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}};var cn=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new m(E,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new we(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};var Ar=class{constructor(e){this._methodName=e}};var ln=class{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new m(E,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new m(E,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return U(this._lat,e._lat)||U(this._long,e._long)}};var sf=/^__.*__$/,Ns=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Tr(e,this.data,this.fieldMask,t,this.fieldTransforms):new br(e,this.data,t,this.fieldTransforms)}};function gc(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw O()}}var ks=class n{constructor(e,t,r,i,s,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.tt(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get et(){return this.settings.et}rt(e){return new n(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}nt(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.rt({path:r,it:!1});return i.st(e),i}ot(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.rt({path:r,it:!1});return i.tt(),i}ut(e){return this.rt({path:void 0,it:!0})}_t(e){return Pr(e,this.settings.methodName,this.settings.ct||!1,this.path,this.settings.lt)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}tt(){if(this.path)for(let e=0;e<this.path.length;e++)this.st(this.path.get(e))}st(e){if(e.length===0)throw this._t("Document fields must not be empty");if(gc(this.et)&&sf.test(e))throw this._t('Document fields cannot begin and end with "__"')}},Ls=class{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Hs(e)}ht(e,t,r,i=!1){return new ks({et:e,methodName:t,lt:r,path:we.emptyPath(),it:!1,ct:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function zs(n){let e=n._freezeSettings(),t=Hs(n._databaseId);return new Ls(n._databaseId,!!e.ignoreUndefinedProperties,t)}function _c(n,e,t,r,i,s={}){let o=n.ht(s.merge||s.mergeFields?2:0,e,t,i);wc("Data must be an object, but it was:",o,r);let a=vc(r,o),c,l;if(s.merge)c=new wr(o.fieldMask),l=o.fieldTransforms;else if(s.mergeFields){let u=[];for(let d of s.mergeFields){let f=af(e,d,t);if(!o.contains(f))throw new m(E,`Field '${f}' is specified in your field mask but missing from your input data.`);lf(u,f)||u.push(f)}c=new wr(u),l=o.fieldTransforms.filter(d=>c.covers(d.field))}else c=null,l=o.fieldTransforms;return new Ns(new De(a),c,l)}function of(n,e,t,r=!1){return Gs(t,n.ht(r?4:3,e))}function Gs(n,e){if(yc(n=K(n)))return wc("Unsupported field value:",e,n),vc(n,e);if(n instanceof Ar)return function(r,i){if(!gc(i.et))throw i._t(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i._t(`${r._methodName}() is not currently supported inside arrays`);let s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.it&&e.et!==4)throw e._t("Nested arrays are not supported");return function(r,i){let s=[],o=0;for(let a of r){let c=Gs(a,i.ut(o));c==null&&(c={nullValue:"NULL_VALUE"}),s.push(c),o++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=K(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Hh(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){let s=he.fromDate(r);return{timestampValue:Rs(i.serializer,s)}}if(r instanceof he){let s=new he(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Rs(i.serializer,s)}}if(r instanceof ln)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof an)return{bytesValue:Gh(i.serializer,r._byteString)};if(r instanceof re){let s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i._t(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:js(r.firestore._databaseId||i.databaseId,r._key.path)}}throw i._t(`Unsupported field value: ${Cr(r)}`)}(n,e)}function vc(n,e){let t={};return function(i){for(let s in i)if(Object.prototype.hasOwnProperty.call(i,s))return!1;return!0}(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):kr(n,(r,i)=>{let s=Gs(i,e.nt(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function yc(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof he||n instanceof ln||n instanceof an||n instanceof re||n instanceof Ar)}function wc(n,e,t){if(!yc(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){let r=Cr(t);throw r==="an object"?e._t(n+" a custom object"):e._t(n+" "+r)}}function af(n,e,t){if((e=K(e))instanceof cn)return e._internalPath;if(typeof e=="string")return Ec(n,e);throw Pr("Field path arguments must be of type string or ",n,!1,void 0,t)}var cf=new RegExp("[~\\*/\\[\\]]");function Ec(n,e,t){if(e.search(cf)>=0)throw Pr(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new cn(...e.split("."))._internalPath}catch{throw Pr(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Pr(n,e,t,r,i){let s=r&&!r.isEmpty(),o=i!==void 0,a=`Function ${e}() called with invalid data`;t&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(s||o)&&(c+=" (found",s&&(c+=` in field ${r}`),o&&(c+=` in document ${i}`),c+=")"),new m(E,a+n+c)}function lf(n,e){return n.some(t=>t.isEqual(e))}var Ms=class{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new re(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new Rr(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(Ic("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},Rr=class extends Ms{data(){return super.data()}},xs=class{constructor(e,t){this._docs=t,this.query=e}get docs(){return[...this._docs]}get size(){return this.docs.length}get empty(){return this.docs.length===0}forEach(e,t){this._docs.forEach(e,t)}};function Ic(n,e){return typeof e=="string"?Ec(n,e):e instanceof cn?e._internalPath:e._delegate._internalPath}var un=class{},Vs=class extends un{};function Ks(n,e,...t){let r=[];e instanceof un&&r.push(e),r=r.concat(t),function(s){let o=s.filter(c=>c instanceof Fs).length,a=s.filter(c=>c instanceof Dr).length;if(o>1||o>0&&a>0)throw new m(E,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(let i of r)n=i._apply(n);return n}var Dr=class n extends Vs{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new n(e,t,r)}_apply(e){let t=this._parse(e);return bc(e._query,t),new Tt(e.firestore,e.converter,ws(e._query,t))}_parse(e){let t=zs(e.firestore);return function(s,o,a,c,l,u,d){let f;if(l.isKeyField()){if(u==="array-contains"||u==="array-contains-any")throw new m(E,`Invalid Query. You can't perform '${u}' queries on documentId().`);if(u==="in"||u==="not-in"){nc(d,u);let y=[];for(let g of d)y.push(tc(c,s,g));f={arrayValue:{values:y}}}else f=tc(c,s,d)}else u!=="in"&&u!=="not-in"&&u!=="array-contains-any"||nc(d,u),f=of(a,o,d,u==="in"||u==="not-in");return fe.create(l,u,f)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}};function Ys(n,e,t){let r=e,i=Ic("where",n);return Dr._create(i,r,t)}var Fs=class n extends un{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new n(e,t)}_parse(e){let t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:sn.create(t,this._getOperator())}_apply(e){let t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let o=i,a=s.getFlattenedFilters();for(let c of a)bc(o,c),o=ws(o,c)}(e._query,t),new Tt(e.firestore,e.converter,ws(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}};function tc(n,e,t){if(typeof(t=K(t))=="string"){if(t==="")throw new m(E,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Uh(e)&&t.indexOf("/")!==-1)throw new m(E,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);let r=e.path.child($.fromString(t));if(!ee.isDocumentKey(r))throw new m(E,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Ya(n,new ee(r))}if(t instanceof re)return Ya(n,t._key);throw new m(E,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Cr(t)}.`)}function nc(n,e){if(!Array.isArray(n)||n.length===0)throw new m(E,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function bc(n,e){let t=function(i,s){for(let o of i)for(let a of o.getFlattenedFilters())if(s.indexOf(a.op)>=0)return a.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new m(E,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new m(E,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function Tc(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}var Us=class extends class{convertValue(t,r="none"){switch(ot(t)){case 0:return null;case 1:return t.booleanValue;case 2:return x(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,r);case 5:return t.stringValue;case 6:return this.convertBytes(tn(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,r);case 10:return this.convertObject(t.mapValue,r);default:throw O()}}convertObject(t,r){return this.convertObjectMap(t.fields,r)}convertObjectMap(t,r="none"){let i={};return kr(t,(s,o)=>{i[s]=this.convertValue(o,r)}),i}convertGeoPoint(t){return new ln(x(t.latitude),x(t.longitude))}convertArray(t,r){return(t.values||[]).map(i=>this.convertValue(i,r))}convertServerTimestamp(t,r){switch(r){case"previous":let i=lc(t);return i==null?null:this.convertValue(i,r);case"estimate":return this.convertTimestamp(nn(t));default:return null}}convertTimestamp(t){let r=st(t);return new he(r.seconds,r.nanos)}convertDocumentKey(t,r){let i=$.fromString(t);Be(fc(i));let s=new dr(i.get(1),i.get(3)),o=new ee(i.popFirst(5));return s.isEqual(r)||qs(`Document ${o} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${r.projectId}/${r.database}) instead.`),o}}{constructor(e){super(),this.firestore=e}convertBytes(e){return new an(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new re(this.firestore,null,t)}};function Js(n){(function(i){if(i.limitType==="L"&&i.explicitOrderBy.length===0)throw new m(ic,"limitToLast() queries require specifying at least one orderBy() clause")})((n=Nr(n,Tt))._query);let e=$s(n.firestore),t=new Us(n.firestore);return nf(e,n._query).then(r=>{let i=r.map(s=>new Rr(n.firestore,t,s.key,s,n.converter));return n._query.limitType==="L"&&i.reverse(),new xs(n,i)})}function Sc(n,e,t){let r=Tc((n=Nr(n,re)).converter,e,t),i=_c(zs(n.firestore),"setDoc",n._key,r,n.converter!==null,t);return pc($s(n.firestore),[i.toMutation(n._key,Ir.none())])}function Ac(n,e){let t=Ws(n=Nr(n,Oe)),r=Tc(n.converter,e),i=_c(zs(n.firestore),"addDoc",t._key,r,t.converter!==null,{});return pc($s(n.firestore),[i.toMutation(t._key,Ir.exists(!1))]).then(()=>t)}(function(){(function(t){St=t})(`${Ue}_lite`),Fe(new ce("firestore/lite",(e,{instanceIdentifier:t,options:r})=>{let i=e.getProvider("app").getImmediate(),s=new bt(new ts(e.getProvider("auth-internal")),new ss(e.getProvider("app-check-internal")),function(a,c){if(!Object.prototype.hasOwnProperty.apply(a.options,["projectId"]))throw new m(E,'"projectId" not provided in firebase.initializeApp.');return new dr(a.options.projectId,c)}(i,t),i);return r&&s._setSettings(r),s},"PUBLIC").setMultipleInstances(!0)),ue("firestore-lite","4.6.1",""),ue("firestore-lite","4.6.1","esm2017")})();var Mr=mc(ir);function Pc(n,e,t){window.localStorage.setItem(n,JSON.stringify({id:e,name:t}))}function uf(n){let e=window.localStorage.getItem(n);if(e){let t=JSON.parse(e),{id:r,name:i}=t;if(or(r)&&or(i))return{uid:n,name:i,id:r};window.localStorage.removeItem(n)}return null}async function df(n){let e=Ks(Lr(Mr,"users"),Ys("uid","==",n)),t=await Js(e);if(t.empty)return null;let r=t.docs[0],i=r.data().name,{id:s}=r;return{uid:n,id:s,name:i}}async function Rc(n){let e=uf(n);if(e)return e;let t=await df(n);if(t){let{uid:r,id:i,name:s}=t;return Pc(r,i,s),t}return null}async function Dc(n,e,t){return await Sc(Ws(Mr,"users",e),{name:t},{merge:!0}),Pc(n,e,t),!0}async function Oc(n){let e=Ks(Lr(Mr,"lists"),Ys("username","==",n)),t=await Js(e);return t.empty?[]:t.docs.map(r=>({id:r.id,...r.data()}))}async function Cc(n,e,t,r,i,s){let o={uid:n,username:e,title:t,items:r,numbered:i,order:s};return{id:(await Ac(Lr(Mr,"lists"),o)).id,...o}}var hf=Ki(ir);function Nc(n){Wi(hf,e=>{if(e){let{uid:t,displayName:r,email:i}=e;qa(),Rc(e.uid).then(s=>{n(s?{...s,displayName:r,email:i}:{id:null,name:null,uid:t,displayName:r,email:i})})}else n(null)})}function kc(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(n,i).enumerable})),t.push.apply(t,r)}return t}function be(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?kc(Object(t),!0).forEach(function(r){ff(n,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):kc(Object(t)).forEach(function(r){Object.defineProperty(n,r,Object.getOwnPropertyDescriptor(t,r))})}return n}function qr(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?qr=function(e){return typeof e}:qr=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},qr(n)}function ff(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function Ne(){return Ne=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},Ne.apply(this,arguments)}function pf(n,e){if(n==null)return{};var t={},r=Object.keys(n),i,s;for(s=0;s<r.length;s++)i=r[s],!(e.indexOf(i)>=0)&&(t[i]=n[i]);return t}function mf(n,e){if(n==null)return{};var t=pf(n,e),r,i;if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(n);for(i=0;i<s.length;i++)r=s[i],!(e.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(n,r)&&(t[r]=n[r])}return t}var gf="1.15.2";function Ce(n){if(typeof window<"u"&&window.navigator)return!!navigator.userAgent.match(n)}var ke=Ce(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),yn=Ce(/Edge/i),Lc=Ce(/firefox/i),pn=Ce(/safari/i)&&!Ce(/chrome/i)&&!Ce(/android/i),jc=Ce(/iP(ad|od|hone)/i),Hc=Ce(/chrome/i)&&Ce(/android/i),$c={capture:!1,passive:!1};function A(n,e,t){n.addEventListener(e,t,!ke&&$c)}function T(n,e,t){n.removeEventListener(e,t,!ke&&$c)}function Wr(n,e){if(e){if(e[0]===">"&&(e=e.substring(1)),n)try{if(n.matches)return n.matches(e);if(n.msMatchesSelector)return n.msMatchesSelector(e);if(n.webkitMatchesSelector)return n.webkitMatchesSelector(e)}catch{return!1}return!1}}function _f(n){return n.host&&n!==document&&n.host.nodeType?n.host:n.parentNode}function me(n,e,t,r){if(n){t=t||document;do{if(e!=null&&(e[0]===">"?n.parentNode===t&&Wr(n,e):Wr(n,e))||r&&n===t)return n;if(n===t)break}while(n=_f(n))}return null}var Mc=/\s+/g;function ie(n,e,t){if(n&&e)if(n.classList)n.classList[t?"add":"remove"](e);else{var r=(" "+n.className+" ").replace(Mc," ").replace(" "+e+" "," ");n.className=(r+(t?" "+e:"")).replace(Mc," ")}}function _(n,e,t){var r=n&&n.style;if(r){if(t===void 0)return document.defaultView&&document.defaultView.getComputedStyle?t=document.defaultView.getComputedStyle(n,""):n.currentStyle&&(t=n.currentStyle),e===void 0?t:t[e];!(e in r)&&e.indexOf("webkit")===-1&&(e="-webkit-"+e),r[e]=t+(typeof t=="string"?"":"px")}}function Ot(n,e){var t="";if(typeof n=="string")t=n;else do{var r=_(n,"transform");r&&r!=="none"&&(t=r+" "+t)}while(!e&&(n=n.parentNode));var i=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return i&&new i(t)}function Wc(n,e,t){if(n){var r=n.getElementsByTagName(e),i=0,s=r.length;if(t)for(;i<s;i++)t(r[i],i);return r}return[]}function Ie(){var n=document.scrollingElement;return n||document.documentElement}function L(n,e,t,r,i){if(!(!n.getBoundingClientRect&&n!==window)){var s,o,a,c,l,u,d;if(n!==window&&n.parentNode&&n!==Ie()?(s=n.getBoundingClientRect(),o=s.top,a=s.left,c=s.bottom,l=s.right,u=s.height,d=s.width):(o=0,a=0,c=window.innerHeight,l=window.innerWidth,u=window.innerHeight,d=window.innerWidth),(e||t)&&n!==window&&(i=i||n.parentNode,!ke))do if(i&&i.getBoundingClientRect&&(_(i,"transform")!=="none"||t&&_(i,"position")!=="static")){var f=i.getBoundingClientRect();o-=f.top+parseInt(_(i,"border-top-width")),a-=f.left+parseInt(_(i,"border-left-width")),c=o+s.height,l=a+s.width;break}while(i=i.parentNode);if(r&&n!==window){var y=Ot(i||n),g=y&&y.a,I=y&&y.d;y&&(o/=I,a/=g,d/=g,u/=I,c=o+u,l=a+d)}return{top:o,left:a,bottom:c,right:l,width:d,height:u}}}function xc(n,e,t){for(var r=We(n,!0),i=L(n)[e];r;){var s=L(r)[t],o=void 0;if(t==="top"||t==="left"?o=i>=s:o=i<=s,!o)return r;if(r===Ie())break;r=We(r,!1)}return!1}function Ct(n,e,t,r){for(var i=0,s=0,o=n.children;s<o.length;){if(o[s].style.display!=="none"&&o[s]!==v.ghost&&(r||o[s]!==v.dragged)&&me(o[s],t.draggable,n,!1)){if(i===e)return o[s];i++}s++}return null}function uo(n,e){for(var t=n.lastElementChild;t&&(t===v.ghost||_(t,"display")==="none"||e&&!Wr(t,e));)t=t.previousElementSibling;return t||null}function le(n,e){var t=0;if(!n||!n.parentNode)return-1;for(;n=n.previousElementSibling;)n.nodeName.toUpperCase()!=="TEMPLATE"&&n!==v.clone&&(!e||Wr(n,e))&&t++;return t}function Vc(n){var e=0,t=0,r=Ie();if(n)do{var i=Ot(n),s=i.a,o=i.d;e+=n.scrollLeft*s,t+=n.scrollTop*o}while(n!==r&&(n=n.parentNode));return[e,t]}function vf(n,e){for(var t in n)if(n.hasOwnProperty(t)){for(var r in e)if(e.hasOwnProperty(r)&&e[r]===n[t][r])return Number(t)}return-1}function We(n,e){if(!n||!n.getBoundingClientRect)return Ie();var t=n,r=!1;do if(t.clientWidth<t.scrollWidth||t.clientHeight<t.scrollHeight){var i=_(t);if(t.clientWidth<t.scrollWidth&&(i.overflowX=="auto"||i.overflowX=="scroll")||t.clientHeight<t.scrollHeight&&(i.overflowY=="auto"||i.overflowY=="scroll")){if(!t.getBoundingClientRect||t===document.body)return Ie();if(r||e)return t;r=!0}}while(t=t.parentNode);return Ie()}function yf(n,e){if(n&&e)for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t]);return n}function Xs(n,e){return Math.round(n.top)===Math.round(e.top)&&Math.round(n.left)===Math.round(e.left)&&Math.round(n.height)===Math.round(e.height)&&Math.round(n.width)===Math.round(e.width)}var mn;function zc(n,e){return function(){if(!mn){var t=arguments,r=this;t.length===1?n.call(r,t[0]):n.apply(r,t),mn=setTimeout(function(){mn=void 0},e)}}}function wf(){clearTimeout(mn),mn=void 0}function Gc(n,e,t){n.scrollLeft+=e,n.scrollTop+=t}function Kc(n){var e=window.Polymer,t=window.jQuery||window.Zepto;return e&&e.dom?e.dom(n).cloneNode(!0):t?t(n).clone(!0)[0]:n.cloneNode(!0)}function Yc(n,e,t){var r={};return Array.from(n.children).forEach(function(i){var s,o,a,c;if(!(!me(i,e.draggable,n,!1)||i.animated||i===t)){var l=L(i);r.left=Math.min((s=r.left)!==null&&s!==void 0?s:1/0,l.left),r.top=Math.min((o=r.top)!==null&&o!==void 0?o:1/0,l.top),r.right=Math.max((a=r.right)!==null&&a!==void 0?a:-1/0,l.right),r.bottom=Math.max((c=r.bottom)!==null&&c!==void 0?c:-1/0,l.bottom)}}),r.width=r.right-r.left,r.height=r.bottom-r.top,r.x=r.left,r.y=r.top,r}var oe="Sortable"+new Date().getTime();function Ef(){var n=[],e;return{captureAnimationState:function(){if(n=[],!!this.options.animation){var r=[].slice.call(this.el.children);r.forEach(function(i){if(!(_(i,"display")==="none"||i===v.ghost)){n.push({target:i,rect:L(i)});var s=be({},n[n.length-1].rect);if(i.thisAnimationDuration){var o=Ot(i,!0);o&&(s.top-=o.f,s.left-=o.e)}i.fromRect=s}})}},addAnimationState:function(r){n.push(r)},removeAnimationState:function(r){n.splice(vf(n,{target:r}),1)},animateAll:function(r){var i=this;if(!this.options.animation){clearTimeout(e),typeof r=="function"&&r();return}var s=!1,o=0;n.forEach(function(a){var c=0,l=a.target,u=l.fromRect,d=L(l),f=l.prevFromRect,y=l.prevToRect,g=a.rect,I=Ot(l,!0);I&&(d.top-=I.f,d.left-=I.e),l.toRect=d,l.thisAnimationDuration&&Xs(f,d)&&!Xs(u,d)&&(g.top-d.top)/(g.left-d.left)===(u.top-d.top)/(u.left-d.left)&&(c=bf(g,f,y,i.options)),Xs(d,u)||(l.prevFromRect=u,l.prevToRect=d,c||(c=i.options.animation),i.animate(l,g,d,c)),c&&(s=!0,o=Math.max(o,c),clearTimeout(l.animationResetTimer),l.animationResetTimer=setTimeout(function(){l.animationTime=0,l.prevFromRect=null,l.fromRect=null,l.prevToRect=null,l.thisAnimationDuration=null},c),l.thisAnimationDuration=c)}),clearTimeout(e),s?e=setTimeout(function(){typeof r=="function"&&r()},o):typeof r=="function"&&r(),n=[]},animate:function(r,i,s,o){if(o){_(r,"transition",""),_(r,"transform","");var a=Ot(this.el),c=a&&a.a,l=a&&a.d,u=(i.left-s.left)/(c||1),d=(i.top-s.top)/(l||1);r.animatingX=!!u,r.animatingY=!!d,_(r,"transform","translate3d("+u+"px,"+d+"px,0)"),this.forRepaintDummy=If(r),_(r,"transition","transform "+o+"ms"+(this.options.easing?" "+this.options.easing:"")),_(r,"transform","translate3d(0,0,0)"),typeof r.animated=="number"&&clearTimeout(r.animated),r.animated=setTimeout(function(){_(r,"transition",""),_(r,"transform",""),r.animated=!1,r.animatingX=!1,r.animatingY=!1},o)}}}}function If(n){return n.offsetWidth}function bf(n,e,t,r){return Math.sqrt(Math.pow(e.top-n.top,2)+Math.pow(e.left-n.left,2))/Math.sqrt(Math.pow(e.top-t.top,2)+Math.pow(e.left-t.left,2))*r.animation}var At=[],Qs={initializeByDefault:!0},wn={mount:function(e){for(var t in Qs)Qs.hasOwnProperty(t)&&!(t in e)&&(e[t]=Qs[t]);At.forEach(function(r){if(r.pluginName===e.pluginName)throw"Sortable: Cannot mount plugin ".concat(e.pluginName," more than once")}),At.push(e)},pluginEvent:function(e,t,r){var i=this;this.eventCanceled=!1,r.cancel=function(){i.eventCanceled=!0};var s=e+"Global";At.forEach(function(o){t[o.pluginName]&&(t[o.pluginName][s]&&t[o.pluginName][s](be({sortable:t},r)),t.options[o.pluginName]&&t[o.pluginName][e]&&t[o.pluginName][e](be({sortable:t},r)))})},initializePlugins:function(e,t,r,i){At.forEach(function(a){var c=a.pluginName;if(!(!e.options[c]&&!a.initializeByDefault)){var l=new a(e,t,e.options);l.sortable=e,l.options=e.options,e[c]=l,Ne(r,l.defaults)}});for(var s in e.options)if(e.options.hasOwnProperty(s)){var o=this.modifyOption(e,s,e.options[s]);typeof o<"u"&&(e.options[s]=o)}},getEventProperties:function(e,t){var r={};return At.forEach(function(i){typeof i.eventProperties=="function"&&Ne(r,i.eventProperties.call(t[i.pluginName],e))}),r},modifyOption:function(e,t,r){var i;return At.forEach(function(s){e[s.pluginName]&&s.optionListeners&&typeof s.optionListeners[t]=="function"&&(i=s.optionListeners[t].call(e[s.pluginName],r))}),i}};function Tf(n){var e=n.sortable,t=n.rootEl,r=n.name,i=n.targetEl,s=n.cloneEl,o=n.toEl,a=n.fromEl,c=n.oldIndex,l=n.newIndex,u=n.oldDraggableIndex,d=n.newDraggableIndex,f=n.originalEvent,y=n.putSortable,g=n.extraEventProperties;if(e=e||t&&t[oe],!!e){var I,N=e.options,q="on"+r.charAt(0).toUpperCase()+r.substr(1);window.CustomEvent&&!ke&&!yn?I=new CustomEvent(r,{bubbles:!0,cancelable:!0}):(I=document.createEvent("Event"),I.initEvent(r,!0,!0)),I.to=o||t,I.from=a||t,I.item=i||t,I.clone=s,I.oldIndex=c,I.newIndex=l,I.oldDraggableIndex=u,I.newDraggableIndex=d,I.originalEvent=f,I.pullMode=y?y.lastPutMode:void 0;var P=be(be({},g),wn.getEventProperties(r,e));for(var B in P)I[B]=P[B];t&&t.dispatchEvent(I),N[q]&&N[q].call(e,I)}}var Sf=["evt"],te=function(e,t){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},i=r.evt,s=mf(r,Sf);wn.pluginEvent.bind(v)(e,t,be({dragEl:h,parentEl:C,ghostEl:w,rootEl:R,nextEl:lt,lastDownEl:Br,cloneEl:D,cloneHidden:$e,dragStarted:dn,putSortable:W,activeSortable:v.active,originalEvent:i,oldIndex:Dt,oldDraggableIndex:gn,newIndex:se,newDraggableIndex:He,hideGhostForTarget:Zc,unhideGhostForTarget:el,cloneNowHidden:function(){$e=!0},cloneNowShown:function(){$e=!1},dispatchSortableEvent:function(a){Q({sortable:t,name:a,originalEvent:i})}},s))};function Q(n){Tf(be({putSortable:W,cloneEl:D,targetEl:h,rootEl:R,oldIndex:Dt,oldDraggableIndex:gn,newIndex:se,newDraggableIndex:He},n))}var h,C,w,R,lt,Br,D,$e,Dt,se,gn,He,xr,W,Rt=!1,zr=!1,Gr=[],at,pe,Zs,eo,Fc,Uc,dn,Pt,_n,vn=!1,Vr=!1,jr,X,to=[],oo=!1,Kr=[],Jr=typeof document<"u",Fr=jc,qc=yn||ke?"cssFloat":"float",Af=Jr&&!Hc&&!jc&&"draggable"in document.createElement("div"),Jc=function(){if(Jr){if(ke)return!1;var n=document.createElement("x");return n.style.cssText="pointer-events:auto",n.style.pointerEvents==="auto"}}(),Xc=function(e,t){var r=_(e),i=parseInt(r.width)-parseInt(r.paddingLeft)-parseInt(r.paddingRight)-parseInt(r.borderLeftWidth)-parseInt(r.borderRightWidth),s=Ct(e,0,t),o=Ct(e,1,t),a=s&&_(s),c=o&&_(o),l=a&&parseInt(a.marginLeft)+parseInt(a.marginRight)+L(s).width,u=c&&parseInt(c.marginLeft)+parseInt(c.marginRight)+L(o).width;if(r.display==="flex")return r.flexDirection==="column"||r.flexDirection==="column-reverse"?"vertical":"horizontal";if(r.display==="grid")return r.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(s&&a.float&&a.float!=="none"){var d=a.float==="left"?"left":"right";return o&&(c.clear==="both"||c.clear===d)?"vertical":"horizontal"}return s&&(a.display==="block"||a.display==="flex"||a.display==="table"||a.display==="grid"||l>=i&&r[qc]==="none"||o&&r[qc]==="none"&&l+u>i)?"vertical":"horizontal"},Pf=function(e,t,r){var i=r?e.left:e.top,s=r?e.right:e.bottom,o=r?e.width:e.height,a=r?t.left:t.top,c=r?t.right:t.bottom,l=r?t.width:t.height;return i===a||s===c||i+o/2===a+l/2},Rf=function(e,t){var r;return Gr.some(function(i){var s=i[oe].options.emptyInsertThreshold;if(!(!s||uo(i))){var o=L(i),a=e>=o.left-s&&e<=o.right+s,c=t>=o.top-s&&t<=o.bottom+s;if(a&&c)return r=i}}),r},Qc=function(e){function t(s,o){return function(a,c,l,u){var d=a.options.group.name&&c.options.group.name&&a.options.group.name===c.options.group.name;if(s==null&&(o||d))return!0;if(s==null||s===!1)return!1;if(o&&s==="clone")return s;if(typeof s=="function")return t(s(a,c,l,u),o)(a,c,l,u);var f=(o?a:c).options.group.name;return s===!0||typeof s=="string"&&s===f||s.join&&s.indexOf(f)>-1}}var r={},i=e.group;(!i||qr(i)!="object")&&(i={name:i}),r.name=i.name,r.checkPull=t(i.pull,!0),r.checkPut=t(i.put),r.revertClone=i.revertClone,e.group=r},Zc=function(){!Jc&&w&&_(w,"display","none")},el=function(){!Jc&&w&&_(w,"display","")};Jr&&!Hc&&document.addEventListener("click",function(n){if(zr)return n.preventDefault(),n.stopPropagation&&n.stopPropagation(),n.stopImmediatePropagation&&n.stopImmediatePropagation(),zr=!1,!1},!0);var ct=function(e){if(h){e=e.touches?e.touches[0]:e;var t=Rf(e.clientX,e.clientY);if(t){var r={};for(var i in e)e.hasOwnProperty(i)&&(r[i]=e[i]);r.target=r.rootEl=t,r.preventDefault=void 0,r.stopPropagation=void 0,t[oe]._onDragOver(r)}}},Df=function(e){h&&h.parentNode[oe]._isOutsideThisEl(e.target)};function v(n,e){if(!(n&&n.nodeType&&n.nodeType===1))throw"Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(n));this.el=n,this.options=e=Ne({},e),n[oe]=this;var t={group:null,sort:!0,disabled:!1,store:null,handle:null,draggable:/^[uo]l$/i.test(n.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return Xc(n,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(o,a){o.setData("Text",a.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:v.supportPointer!==!1&&"PointerEvent"in window&&!pn,emptyInsertThreshold:5};wn.initializePlugins(this,n,t);for(var r in t)!(r in e)&&(e[r]=t[r]);Qc(e);for(var i in this)i.charAt(0)==="_"&&typeof this[i]=="function"&&(this[i]=this[i].bind(this));this.nativeDraggable=e.forceFallback?!1:Af,this.nativeDraggable&&(this.options.touchStartThreshold=1),e.supportPointer?A(n,"pointerdown",this._onTapStart):(A(n,"mousedown",this._onTapStart),A(n,"touchstart",this._onTapStart)),this.nativeDraggable&&(A(n,"dragover",this),A(n,"dragenter",this)),Gr.push(this.el),e.store&&e.store.get&&this.sort(e.store.get(this)||[]),Ne(this,Ef())}v.prototype={constructor:v,_isOutsideThisEl:function(e){!this.el.contains(e)&&e!==this.el&&(Pt=null)},_getDirection:function(e,t){return typeof this.options.direction=="function"?this.options.direction.call(this,e,t,h):this.options.direction},_onTapStart:function(e){if(e.cancelable){var t=this,r=this.el,i=this.options,s=i.preventOnFilter,o=e.type,a=e.touches&&e.touches[0]||e.pointerType&&e.pointerType==="touch"&&e,c=(a||e).target,l=e.target.shadowRoot&&(e.path&&e.path[0]||e.composedPath&&e.composedPath()[0])||c,u=i.filter;if(Vf(r),!h&&!(/mousedown|pointerdown/.test(o)&&e.button!==0||i.disabled)&&!l.isContentEditable&&!(!this.nativeDraggable&&pn&&c&&c.tagName.toUpperCase()==="SELECT")&&(c=me(c,i.draggable,r,!1),!(c&&c.animated)&&Br!==c)){if(Dt=le(c),gn=le(c,i.draggable),typeof u=="function"){if(u.call(this,e,c,this)){Q({sortable:t,rootEl:l,name:"filter",targetEl:c,toEl:r,fromEl:r}),te("filter",t,{evt:e}),s&&e.cancelable&&e.preventDefault();return}}else if(u&&(u=u.split(",").some(function(d){if(d=me(l,d.trim(),r,!1),d)return Q({sortable:t,rootEl:d,name:"filter",targetEl:c,fromEl:r,toEl:r}),te("filter",t,{evt:e}),!0}),u)){s&&e.cancelable&&e.preventDefault();return}i.handle&&!me(l,i.handle,r,!1)||this._prepareDragStart(e,a,c)}}},_prepareDragStart:function(e,t,r){var i=this,s=i.el,o=i.options,a=s.ownerDocument,c;if(r&&!h&&r.parentNode===s){var l=L(r);if(R=s,h=r,C=h.parentNode,lt=h.nextSibling,Br=r,xr=o.group,v.dragged=h,at={target:h,clientX:(t||e).clientX,clientY:(t||e).clientY},Fc=at.clientX-l.left,Uc=at.clientY-l.top,this._lastX=(t||e).clientX,this._lastY=(t||e).clientY,h.style["will-change"]="all",c=function(){if(te("delayEnded",i,{evt:e}),v.eventCanceled){i._onDrop();return}i._disableDelayedDragEvents(),!Lc&&i.nativeDraggable&&(h.draggable=!0),i._triggerDragStart(e,t),Q({sortable:i,name:"choose",originalEvent:e}),ie(h,o.chosenClass,!0)},o.ignore.split(",").forEach(function(u){Wc(h,u.trim(),no)}),A(a,"dragover",ct),A(a,"mousemove",ct),A(a,"touchmove",ct),A(a,"mouseup",i._onDrop),A(a,"touchend",i._onDrop),A(a,"touchcancel",i._onDrop),Lc&&this.nativeDraggable&&(this.options.touchStartThreshold=4,h.draggable=!0),te("delayStart",this,{evt:e}),o.delay&&(!o.delayOnTouchOnly||t)&&(!this.nativeDraggable||!(yn||ke))){if(v.eventCanceled){this._onDrop();return}A(a,"mouseup",i._disableDelayedDrag),A(a,"touchend",i._disableDelayedDrag),A(a,"touchcancel",i._disableDelayedDrag),A(a,"mousemove",i._delayedDragTouchMoveHandler),A(a,"touchmove",i._delayedDragTouchMoveHandler),o.supportPointer&&A(a,"pointermove",i._delayedDragTouchMoveHandler),i._dragStartTimer=setTimeout(c,o.delay)}else c()}},_delayedDragTouchMoveHandler:function(e){var t=e.touches?e.touches[0]:e;Math.max(Math.abs(t.clientX-this._lastX),Math.abs(t.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){h&&no(h),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var e=this.el.ownerDocument;T(e,"mouseup",this._disableDelayedDrag),T(e,"touchend",this._disableDelayedDrag),T(e,"touchcancel",this._disableDelayedDrag),T(e,"mousemove",this._delayedDragTouchMoveHandler),T(e,"touchmove",this._delayedDragTouchMoveHandler),T(e,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(e,t){t=t||e.pointerType=="touch"&&e,!this.nativeDraggable||t?this.options.supportPointer?A(document,"pointermove",this._onTouchMove):t?A(document,"touchmove",this._onTouchMove):A(document,"mousemove",this._onTouchMove):(A(h,"dragend",this),A(R,"dragstart",this._onDragStart));try{document.selection?Hr(function(){document.selection.empty()}):window.getSelection().removeAllRanges()}catch{}},_dragStarted:function(e,t){if(Rt=!1,R&&h){te("dragStarted",this,{evt:t}),this.nativeDraggable&&A(document,"dragover",Df);var r=this.options;!e&&ie(h,r.dragClass,!1),ie(h,r.ghostClass,!0),v.active=this,e&&this._appendGhost(),Q({sortable:this,name:"start",originalEvent:t})}else this._nulling()},_emulateDragOver:function(){if(pe){this._lastX=pe.clientX,this._lastY=pe.clientY,Zc();for(var e=document.elementFromPoint(pe.clientX,pe.clientY),t=e;e&&e.shadowRoot&&(e=e.shadowRoot.elementFromPoint(pe.clientX,pe.clientY),e!==t);)t=e;if(h.parentNode[oe]._isOutsideThisEl(e),t)do{if(t[oe]){var r=void 0;if(r=t[oe]._onDragOver({clientX:pe.clientX,clientY:pe.clientY,target:e,rootEl:t}),r&&!this.options.dragoverBubble)break}e=t}while(t=t.parentNode);el()}},_onTouchMove:function(e){if(at){var t=this.options,r=t.fallbackTolerance,i=t.fallbackOffset,s=e.touches?e.touches[0]:e,o=w&&Ot(w,!0),a=w&&o&&o.a,c=w&&o&&o.d,l=Fr&&X&&Vc(X),u=(s.clientX-at.clientX+i.x)/(a||1)+(l?l[0]-to[0]:0)/(a||1),d=(s.clientY-at.clientY+i.y)/(c||1)+(l?l[1]-to[1]:0)/(c||1);if(!v.active&&!Rt){if(r&&Math.max(Math.abs(s.clientX-this._lastX),Math.abs(s.clientY-this._lastY))<r)return;this._onDragStart(e,!0)}if(w){o?(o.e+=u-(Zs||0),o.f+=d-(eo||0)):o={a:1,b:0,c:0,d:1,e:u,f:d};var f="matrix(".concat(o.a,",").concat(o.b,",").concat(o.c,",").concat(o.d,",").concat(o.e,",").concat(o.f,")");_(w,"webkitTransform",f),_(w,"mozTransform",f),_(w,"msTransform",f),_(w,"transform",f),Zs=u,eo=d,pe=s}e.cancelable&&e.preventDefault()}},_appendGhost:function(){if(!w){var e=this.options.fallbackOnBody?document.body:R,t=L(h,!0,Fr,!0,e),r=this.options;if(Fr){for(X=e;_(X,"position")==="static"&&_(X,"transform")==="none"&&X!==document;)X=X.parentNode;X!==document.body&&X!==document.documentElement?(X===document&&(X=Ie()),t.top+=X.scrollTop,t.left+=X.scrollLeft):X=Ie(),to=Vc(X)}w=h.cloneNode(!0),ie(w,r.ghostClass,!1),ie(w,r.fallbackClass,!0),ie(w,r.dragClass,!0),_(w,"transition",""),_(w,"transform",""),_(w,"box-sizing","border-box"),_(w,"margin",0),_(w,"top",t.top),_(w,"left",t.left),_(w,"width",t.width),_(w,"height",t.height),_(w,"opacity","0.8"),_(w,"position",Fr?"absolute":"fixed"),_(w,"zIndex","100000"),_(w,"pointerEvents","none"),v.ghost=w,e.appendChild(w),_(w,"transform-origin",Fc/parseInt(w.style.width)*100+"% "+Uc/parseInt(w.style.height)*100+"%")}},_onDragStart:function(e,t){var r=this,i=e.dataTransfer,s=r.options;if(te("dragStart",this,{evt:e}),v.eventCanceled){this._onDrop();return}te("setupClone",this),v.eventCanceled||(D=Kc(h),D.removeAttribute("id"),D.draggable=!1,D.style["will-change"]="",this._hideClone(),ie(D,this.options.chosenClass,!1),v.clone=D),r.cloneId=Hr(function(){te("clone",r),!v.eventCanceled&&(r.options.removeCloneOnHide||R.insertBefore(D,h),r._hideClone(),Q({sortable:r,name:"clone"}))}),!t&&ie(h,s.dragClass,!0),t?(zr=!0,r._loopId=setInterval(r._emulateDragOver,50)):(T(document,"mouseup",r._onDrop),T(document,"touchend",r._onDrop),T(document,"touchcancel",r._onDrop),i&&(i.effectAllowed="move",s.setData&&s.setData.call(r,i,h)),A(document,"drop",r),_(h,"transform","translateZ(0)")),Rt=!0,r._dragStartId=Hr(r._dragStarted.bind(r,t,e)),A(document,"selectstart",r),dn=!0,pn&&_(document.body,"user-select","none")},_onDragOver:function(e){var t=this.el,r=e.target,i,s,o,a=this.options,c=a.group,l=v.active,u=xr===c,d=a.sort,f=W||l,y,g=this,I=!1;if(oo)return;function N(Lt,il){te(Lt,g,be({evt:e,isOwner:u,axis:y?"vertical":"horizontal",revert:o,dragRect:i,targetRect:s,canSort:d,fromSortable:f,target:r,completed:P,onMove:function(go,sl){return Ur(R,t,h,i,go,L(go),e,sl)},changed:B},il))}function q(){N("dragOverAnimationCapture"),g.captureAnimationState(),g!==f&&f.captureAnimationState()}function P(Lt){return N("dragOverCompleted",{insertion:Lt}),Lt&&(u?l._hideClone():l._showClone(g),g!==f&&(ie(h,W?W.options.ghostClass:l.options.ghostClass,!1),ie(h,a.ghostClass,!0)),W!==g&&g!==v.active?W=g:g===v.active&&W&&(W=null),f===g&&(g._ignoreWhileAnimating=r),g.animateAll(function(){N("dragOverAnimationComplete"),g._ignoreWhileAnimating=null}),g!==f&&(f.animateAll(),f._ignoreWhileAnimating=null)),(r===h&&!h.animated||r===t&&!r.animated)&&(Pt=null),!a.dragoverBubble&&!e.rootEl&&r!==document&&(h.parentNode[oe]._isOutsideThisEl(e.target),!Lt&&ct(e)),!a.dragoverBubble&&e.stopPropagation&&e.stopPropagation(),I=!0}function B(){se=le(h),He=le(h,a.draggable),Q({sortable:g,name:"change",toEl:t,newIndex:se,newDraggableIndex:He,originalEvent:e})}if(e.preventDefault!==void 0&&e.cancelable&&e.preventDefault(),r=me(r,a.draggable,t,!0),N("dragOver"),v.eventCanceled)return I;if(h.contains(e.target)||r.animated&&r.animatingX&&r.animatingY||g._ignoreWhileAnimating===r)return P(!1);if(zr=!1,l&&!a.disabled&&(u?d||(o=C!==R):W===this||(this.lastPutMode=xr.checkPull(this,l,h,e))&&c.checkPut(this,l,h,e))){if(y=this._getDirection(e,r)==="vertical",i=L(h),N("dragOverValid"),v.eventCanceled)return I;if(o)return C=R,q(),this._hideClone(),N("revert"),v.eventCanceled||(lt?R.insertBefore(h,lt):R.appendChild(h)),P(!0);var V=uo(t,a.draggable);if(!V||kf(e,y,this)&&!V.animated){if(V===h)return P(!1);if(V&&t===e.target&&(r=V),r&&(s=L(r)),Ur(R,t,h,i,r,s,e,!!r)!==!1)return q(),V&&V.nextSibling?t.insertBefore(h,V.nextSibling):t.appendChild(h),C=t,B(),P(!0)}else if(V&&Nf(e,y,this)){var ae=Ct(t,0,a,!0);if(ae===h)return P(!1);if(r=ae,s=L(r),Ur(R,t,h,i,r,s,e,!1)!==!1)return q(),t.insertBefore(h,ae),C=t,B(),P(!0)}else if(r.parentNode===t){s=L(r);var z=0,G,ze=h.parentNode!==t,j=!Pf(h.animated&&h.toRect||i,r.animated&&r.toRect||s,y),Ge=y?"top":"left",Le=xc(r,"top","top")||xc(h,"top","top"),Nt=Le?Le.scrollTop:void 0;Pt!==r&&(G=s[Ge],vn=!1,Vr=!j&&a.invertSwap||ze),z=Lf(e,r,s,y,j?1:a.swapThreshold,a.invertedSwapThreshold==null?a.swapThreshold:a.invertedSwapThreshold,Vr,Pt===r);var Te;if(z!==0){var Ke=le(h);do Ke-=z,Te=C.children[Ke];while(Te&&(_(Te,"display")==="none"||Te===w))}if(z===0||Te===r)return P(!1);Pt=r,_n=z;var kt=r.nextElementSibling,Me=!1;Me=z===1;var En=Ur(R,t,h,i,r,s,e,Me);if(En!==!1)return(En===1||En===-1)&&(Me=En===1),oo=!0,setTimeout(Cf,30),q(),Me&&!kt?t.appendChild(h):r.parentNode.insertBefore(h,Me?kt:r),Le&&Gc(Le,0,Nt-Le.scrollTop),C=h.parentNode,G!==void 0&&!Vr&&(jr=Math.abs(G-L(r)[Ge])),B(),P(!0)}if(t.contains(h))return P(!1)}return!1},_ignoreWhileAnimating:null,_offMoveEvents:function(){T(document,"mousemove",this._onTouchMove),T(document,"touchmove",this._onTouchMove),T(document,"pointermove",this._onTouchMove),T(document,"dragover",ct),T(document,"mousemove",ct),T(document,"touchmove",ct)},_offUpEvents:function(){var e=this.el.ownerDocument;T(e,"mouseup",this._onDrop),T(e,"touchend",this._onDrop),T(e,"pointerup",this._onDrop),T(e,"touchcancel",this._onDrop),T(document,"selectstart",this)},_onDrop:function(e){var t=this.el,r=this.options;if(se=le(h),He=le(h,r.draggable),te("drop",this,{evt:e}),C=h&&h.parentNode,se=le(h),He=le(h,r.draggable),v.eventCanceled){this._nulling();return}Rt=!1,Vr=!1,vn=!1,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),ao(this.cloneId),ao(this._dragStartId),this.nativeDraggable&&(T(document,"drop",this),T(t,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),pn&&_(document.body,"user-select",""),_(h,"transform",""),e&&(dn&&(e.cancelable&&e.preventDefault(),!r.dropBubble&&e.stopPropagation()),w&&w.parentNode&&w.parentNode.removeChild(w),(R===C||W&&W.lastPutMode!=="clone")&&D&&D.parentNode&&D.parentNode.removeChild(D),h&&(this.nativeDraggable&&T(h,"dragend",this),no(h),h.style["will-change"]="",dn&&!Rt&&ie(h,W?W.options.ghostClass:this.options.ghostClass,!1),ie(h,this.options.chosenClass,!1),Q({sortable:this,name:"unchoose",toEl:C,newIndex:null,newDraggableIndex:null,originalEvent:e}),R!==C?(se>=0&&(Q({rootEl:C,name:"add",toEl:C,fromEl:R,originalEvent:e}),Q({sortable:this,name:"remove",toEl:C,originalEvent:e}),Q({rootEl:C,name:"sort",toEl:C,fromEl:R,originalEvent:e}),Q({sortable:this,name:"sort",toEl:C,originalEvent:e})),W&&W.save()):se!==Dt&&se>=0&&(Q({sortable:this,name:"update",toEl:C,originalEvent:e}),Q({sortable:this,name:"sort",toEl:C,originalEvent:e})),v.active&&((se==null||se===-1)&&(se=Dt,He=gn),Q({sortable:this,name:"end",toEl:C,originalEvent:e}),this.save()))),this._nulling()},_nulling:function(){te("nulling",this),R=h=C=w=lt=D=Br=$e=at=pe=dn=se=He=Dt=gn=Pt=_n=W=xr=v.dragged=v.ghost=v.clone=v.active=null,Kr.forEach(function(e){e.checked=!0}),Kr.length=Zs=eo=0},handleEvent:function(e){switch(e.type){case"drop":case"dragend":this._onDrop(e);break;case"dragenter":case"dragover":h&&(this._onDragOver(e),Of(e));break;case"selectstart":e.preventDefault();break}},toArray:function(){for(var e=[],t,r=this.el.children,i=0,s=r.length,o=this.options;i<s;i++)t=r[i],me(t,o.draggable,this.el,!1)&&e.push(t.getAttribute(o.dataIdAttr)||xf(t));return e},sort:function(e,t){var r={},i=this.el;this.toArray().forEach(function(s,o){var a=i.children[o];me(a,this.options.draggable,i,!1)&&(r[s]=a)},this),t&&this.captureAnimationState(),e.forEach(function(s){r[s]&&(i.removeChild(r[s]),i.appendChild(r[s]))}),t&&this.animateAll()},save:function(){var e=this.options.store;e&&e.set&&e.set(this)},closest:function(e,t){return me(e,t||this.options.draggable,this.el,!1)},option:function(e,t){var r=this.options;if(t===void 0)return r[e];var i=wn.modifyOption(this,e,t);typeof i<"u"?r[e]=i:r[e]=t,e==="group"&&Qc(r)},destroy:function(){te("destroy",this);var e=this.el;e[oe]=null,T(e,"mousedown",this._onTapStart),T(e,"touchstart",this._onTapStart),T(e,"pointerdown",this._onTapStart),this.nativeDraggable&&(T(e,"dragover",this),T(e,"dragenter",this)),Array.prototype.forEach.call(e.querySelectorAll("[draggable]"),function(t){t.removeAttribute("draggable")}),this._onDrop(),this._disableDelayedDragEvents(),Gr.splice(Gr.indexOf(this.el),1),this.el=e=null},_hideClone:function(){if(!$e){if(te("hideClone",this),v.eventCanceled)return;_(D,"display","none"),this.options.removeCloneOnHide&&D.parentNode&&D.parentNode.removeChild(D),$e=!0}},_showClone:function(e){if(e.lastPutMode!=="clone"){this._hideClone();return}if($e){if(te("showClone",this),v.eventCanceled)return;h.parentNode==R&&!this.options.group.revertClone?R.insertBefore(D,h):lt?R.insertBefore(D,lt):R.appendChild(D),this.options.group.revertClone&&this.animate(h,D),_(D,"display",""),$e=!1}}};function Of(n){n.dataTransfer&&(n.dataTransfer.dropEffect="move"),n.cancelable&&n.preventDefault()}function Ur(n,e,t,r,i,s,o,a){var c,l=n[oe],u=l.options.onMove,d;return window.CustomEvent&&!ke&&!yn?c=new CustomEvent("move",{bubbles:!0,cancelable:!0}):(c=document.createEvent("Event"),c.initEvent("move",!0,!0)),c.to=e,c.from=n,c.dragged=t,c.draggedRect=r,c.related=i||e,c.relatedRect=s||L(e),c.willInsertAfter=a,c.originalEvent=o,n.dispatchEvent(c),u&&(d=u.call(l,c,o)),d}function no(n){n.draggable=!1}function Cf(){oo=!1}function Nf(n,e,t){var r=L(Ct(t.el,0,t.options,!0)),i=Yc(t.el,t.options,w),s=10;return e?n.clientX<i.left-s||n.clientY<r.top&&n.clientX<r.right:n.clientY<i.top-s||n.clientY<r.bottom&&n.clientX<r.left}function kf(n,e,t){var r=L(uo(t.el,t.options.draggable)),i=Yc(t.el,t.options,w),s=10;return e?n.clientX>i.right+s||n.clientY>r.bottom&&n.clientX>r.left:n.clientY>i.bottom+s||n.clientX>r.right&&n.clientY>r.top}function Lf(n,e,t,r,i,s,o,a){var c=r?n.clientY:n.clientX,l=r?t.height:t.width,u=r?t.top:t.left,d=r?t.bottom:t.right,f=!1;if(!o){if(a&&jr<l*i){if(!vn&&(_n===1?c>u+l*s/2:c<d-l*s/2)&&(vn=!0),vn)f=!0;else if(_n===1?c<u+jr:c>d-jr)return-_n}else if(c>u+l*(1-i)/2&&c<d-l*(1-i)/2)return Mf(e)}return f=f||o,f&&(c<u+l*s/2||c>d-l*s/2)?c>u+l/2?1:-1:0}function Mf(n){return le(h)<le(n)?1:-1}function xf(n){for(var e=n.tagName+n.className+n.src+n.href+n.textContent,t=e.length,r=0;t--;)r+=e.charCodeAt(t);return r.toString(36)}function Vf(n){Kr.length=0;for(var e=n.getElementsByTagName("input"),t=e.length;t--;){var r=e[t];r.checked&&Kr.push(r)}}function Hr(n){return setTimeout(n,0)}function ao(n){return clearTimeout(n)}Jr&&A(document,"touchmove",function(n){(v.active||Rt)&&n.cancelable&&n.preventDefault()});v.utils={on:A,off:T,css:_,find:Wc,is:function(e,t){return!!me(e,t,e,!1)},extend:yf,throttle:zc,closest:me,toggleClass:ie,clone:Kc,index:le,nextTick:Hr,cancelNextTick:ao,detectDirection:Xc,getChild:Ct};v.get=function(n){return n[oe]};v.mount=function(){for(var n=arguments.length,e=new Array(n),t=0;t<n;t++)e[t]=arguments[t];e[0].constructor===Array&&(e=e[0]),e.forEach(function(r){if(!r.prototype||!r.prototype.constructor)throw"Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(r));r.utils&&(v.utils=be(be({},v.utils),r.utils)),wn.mount(r)})};v.create=function(n,e){return new v(n,e)};v.version=gf;var k=[],hn,co,lo=!1,ro,io,Yr,fn;function Ff(){function n(){this.defaults={scroll:!0,forceAutoScrollFallback:!1,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0};for(var e in this)e.charAt(0)==="_"&&typeof this[e]=="function"&&(this[e]=this[e].bind(this))}return n.prototype={dragStarted:function(t){var r=t.originalEvent;this.sortable.nativeDraggable?A(document,"dragover",this._handleAutoScroll):this.options.supportPointer?A(document,"pointermove",this._handleFallbackAutoScroll):r.touches?A(document,"touchmove",this._handleFallbackAutoScroll):A(document,"mousemove",this._handleFallbackAutoScroll)},dragOverCompleted:function(t){var r=t.originalEvent;!this.options.dragOverBubble&&!r.rootEl&&this._handleAutoScroll(r)},drop:function(){this.sortable.nativeDraggable?T(document,"dragover",this._handleAutoScroll):(T(document,"pointermove",this._handleFallbackAutoScroll),T(document,"touchmove",this._handleFallbackAutoScroll),T(document,"mousemove",this._handleFallbackAutoScroll)),Bc(),$r(),wf()},nulling:function(){Yr=co=hn=lo=fn=ro=io=null,k.length=0},_handleFallbackAutoScroll:function(t){this._handleAutoScroll(t,!0)},_handleAutoScroll:function(t,r){var i=this,s=(t.touches?t.touches[0]:t).clientX,o=(t.touches?t.touches[0]:t).clientY,a=document.elementFromPoint(s,o);if(Yr=t,r||this.options.forceAutoScrollFallback||yn||ke||pn){so(t,this.options,a,r);var c=We(a,!0);lo&&(!fn||s!==ro||o!==io)&&(fn&&Bc(),fn=setInterval(function(){var l=We(document.elementFromPoint(s,o),!0);l!==c&&(c=l,$r()),so(t,i.options,l,r)},10),ro=s,io=o)}else{if(!this.options.bubbleScroll||We(a,!0)===Ie()){$r();return}so(t,this.options,We(a,!1),!1)}}},Ne(n,{pluginName:"scroll",initializeByDefault:!0})}function $r(){k.forEach(function(n){clearInterval(n.pid)}),k=[]}function Bc(){clearInterval(fn)}var so=zc(function(n,e,t,r){if(e.scroll){var i=(n.touches?n.touches[0]:n).clientX,s=(n.touches?n.touches[0]:n).clientY,o=e.scrollSensitivity,a=e.scrollSpeed,c=Ie(),l=!1,u;co!==t&&(co=t,$r(),hn=e.scroll,u=e.scrollFn,hn===!0&&(hn=We(t,!0)));var d=0,f=hn;do{var y=f,g=L(y),I=g.top,N=g.bottom,q=g.left,P=g.right,B=g.width,V=g.height,ae=void 0,z=void 0,G=y.scrollWidth,ze=y.scrollHeight,j=_(y),Ge=y.scrollLeft,Le=y.scrollTop;y===c?(ae=B<G&&(j.overflowX==="auto"||j.overflowX==="scroll"||j.overflowX==="visible"),z=V<ze&&(j.overflowY==="auto"||j.overflowY==="scroll"||j.overflowY==="visible")):(ae=B<G&&(j.overflowX==="auto"||j.overflowX==="scroll"),z=V<ze&&(j.overflowY==="auto"||j.overflowY==="scroll"));var Nt=ae&&(Math.abs(P-i)<=o&&Ge+B<G)-(Math.abs(q-i)<=o&&!!Ge),Te=z&&(Math.abs(N-s)<=o&&Le+V<ze)-(Math.abs(I-s)<=o&&!!Le);if(!k[d])for(var Ke=0;Ke<=d;Ke++)k[Ke]||(k[Ke]={});(k[d].vx!=Nt||k[d].vy!=Te||k[d].el!==y)&&(k[d].el=y,k[d].vx=Nt,k[d].vy=Te,clearInterval(k[d].pid),(Nt!=0||Te!=0)&&(l=!0,k[d].pid=setInterval(function(){r&&this.layer===0&&v.active._onTouchMove(Yr);var kt=k[this.layer].vy?k[this.layer].vy*a:0,Me=k[this.layer].vx?k[this.layer].vx*a:0;typeof u=="function"&&u.call(v.dragged.parentNode[oe],Me,kt,n,Yr,k[this.layer].el)!=="continue"||Gc(k[this.layer].el,Me,kt)}.bind({layer:d}),24))),d++}while(e.bubbleScroll&&f!==c&&(f=We(f,!1)));lo=l}},30),tl=function(e){var t=e.originalEvent,r=e.putSortable,i=e.dragEl,s=e.activeSortable,o=e.dispatchSortableEvent,a=e.hideGhostForTarget,c=e.unhideGhostForTarget;if(t){var l=r||s;a();var u=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:t,d=document.elementFromPoint(u.clientX,u.clientY);c(),l&&!l.el.contains(d)&&(o("spill"),this.onSpill({dragEl:i,putSortable:r}))}};function ho(){}ho.prototype={startIndex:null,dragStart:function(e){var t=e.oldDraggableIndex;this.startIndex=t},onSpill:function(e){var t=e.dragEl,r=e.putSortable;this.sortable.captureAnimationState(),r&&r.captureAnimationState();var i=Ct(this.sortable.el,this.startIndex,this.options);i?this.sortable.el.insertBefore(t,i):this.sortable.el.appendChild(t),this.sortable.animateAll(),r&&r.animateAll()},drop:tl};Ne(ho,{pluginName:"revertOnSpill"});function fo(){}fo.prototype={onSpill:function(e){var t=e.dragEl,r=e.putSortable,i=r||this.sortable;i.captureAnimationState(),t.parentNode&&t.parentNode.removeChild(t),i.animateAll()},drop:tl};Ne(fo,{pluginName:"removeOnSpill"});v.mount(new Ff);v.mount(fo,ho);var nl=v;function rl({id:n,title:e,items:t,numbered:r}){let i=document.createElement("div"),s=r?"o":"u";i.innerHTML=`
    <section class="show">
      <h3 tabindex="1">${e}</h3>
      <${s}l>
        <li>${t.join("</li> <li>")}</li>
      </${s}l>
    </section>
    <form class="hide">
      <input type="hidden" value="${n}" />
    </form>
  `,sr.appendChild(i)}function Uf(n){n.slice().sort((e,t)=>e.order-t.order).forEach(rl)}var po=0,qf=n=>{for(let e=n.length-1;e>0;e--){let t=Math.floor(Math.random()*(e+1));[n[e],n[t]]=[n[t],n[e]]}return n};function mo(n){Bf(),n.target?.removeEventListener("input",mo)}var Xr=M("list-item-inputs");function Bf(){let n=Ba("list-item-template"),e=n.querySelector("input");e.addEventListener("input",mo),n.querySelector(".remove").addEventListener("click",()=>{Xr.childElementCount>2&&e.value!==""?e.parentElement?.remove():e.value=""}),Xr.appendChild(n)}async function jf(n,e,t){let r=M("loading"),i=M("saved"),s=M("name"),o=M("save-name-btn");s.value=t;let a=()=>{o.disabled=s.value===t||!Ji(s.value)};s.addEventListener("change",a),s.addEventListener("input",a),M("name-form").addEventListener("submit",q=>{q.preventDefault();let P=s.value.trim();return P!==t&&Ji(s.value)&&(r.className="show",s.readOnly=!0,o.classList.add("hide"),Dc(n,e,P).then(()=>{r.className="hide",i.className="show"})),!1});let c=await Oc(e),l=c.length>0;sr.innerHTML="",l&&(po=c.length,Uf(c));let u=["musicians","bands","songs, albums","TED Talks, speakers","YouTube channels, YouTube videos","roller coaster rides","teams","cars","board games","card games","video games","hobbies","cities","conversation topics","values","basketball players","guitarists","comedians","outdoor rock climbing spots","karaoke go-to's","parks","TV shows","disc golf courses","apps","shoes","drinks","meals","cafes","animals","places to camp","hot springs"];M("extra-examples").innerText=qf(u).join(", "),M("footer").className="";let d=M("new-list-form"),f=M("new-btn-container");M("new-btn").addEventListener("click",()=>{d.className="show",f.className="hide"});let g=M("form-title");l||(d.className="show",f.className="hide",M("examples").open=!0,g.innerText="Make your first list!");let I=M("first-item");I.addEventListener("input",mo),nl.create(Xr,{animation:150,draggable:".list-item",handle:".move",direction:"vertical"});let N=M("form-overlay");d.addEventListener("submit",q=>{q.preventDefault();let P=new FormData(q.target),B=P.get("title").toString(),V=P.get("numbered")==="on",ae=P.getAll("item").map(G=>G.toString().trim()).filter(G=>G.length>0),z=po+1;return N.className="show",N.innerHTML=Yi,Cc(n,e,B,ae,V,z).then(G=>{rl(G),po+=1,d.className="hide",f.className="show",g.innerText="Create a new list",M("new-list-title").value="",I.value="",Xr.innerHTML='<input type="text" name="item" id="first-item" maxlength="80" placeholder="Your first item on the list" autocomplete="off" required />',N.className="hide",N.innerHTML=""}),!1})}Nc(n=>{if(n){let{uid:e,id:t,name:r}=n;if(t&&r){jf(e,t,r);return}else{window.location.href=window.location.origin;return}}else{window.location.href=window.location.origin;return}});})();
/*! Bundled license information:

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-fbeda258.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
  * @license
  * Copyright 2020 Google LLC
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

sortablejs/modular/sortable.esm.js:
  (**!
   * Sortable 1.15.2
   * @author	RubaXa   <trash@rubaxa.org>
   * @author	owenm    <owen23355@gmail.com>
   * @license MIT
   *)
*/
//# sourceMappingURL=edit.js.map
