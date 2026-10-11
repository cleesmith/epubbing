"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2723],{9470:(e,t,i)=>{let a,r,n;i.r(t),i.d(t,{MaxResolution:()=>tz,MediaError:()=>tF,MinResolution:()=>tX,RenditionOrder:()=>tJ,default:()=>vg,generatePlayerInitTime:()=>iq,playerSoftwareName:()=>vb,playerSoftwareVersion:()=>vE});var s=i(59586),o=Object.create,l=Object.defineProperty,d=Object.getOwnPropertyDescriptor,u=Object.getOwnPropertyNames,c=Object.getPrototypeOf,h=Object.prototype.hasOwnProperty,m=function(e,t){return function(){return e&&(t=e(e=0)),t}},v=function(e,t){return function(){return t||e((t={exports:{}}).exports,t),t.exports}},E=function(e,t,i,a){if(t&&"object"==typeof t||"function"==typeof t)for(var r,n=u(t),s=0,o=n.length;s<o;s++)r=n[s],h.call(e,r)||r===i||l(e,r,{get:(function(e){return t[e]}).bind(null,r),enumerable:!(a=d(t,r))||a.enumerable});return e},b=function(e,t,i){return i=null!=e?o(c(e)):{},E(!t&&e&&e.__esModule?i:l(i,"default",{value:e,enumerable:!0}),e)},g=v(function(e,t){t.exports="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{}});function f(e,t){return null!=t&&"undefined"!=typeof Symbol&&t[Symbol.hasInstance]?!!t[Symbol.hasInstance](e):f(e,t)}var _=m(function(){_()});function y(e){return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e}var T=m(function(){}),A=v(function(e,t){var i=Array.prototype.slice;t.exports=function(e,t){for(("length"in e)||(e=[e]),e=i.call(e);e.length;){var a=e.shift(),r=t(a);if(r)return r;a.childNodes&&a.childNodes.length&&(e=i.call(a.childNodes).concat(e))}}}),k=v(function(e,t){function i(e,t){if(!f(this,i))return new i(e,t);this.data=e,this.nodeValue=e,this.length=e.length,this.ownerDocument=t||null}_(),t.exports=i,i.prototype.nodeType=8,i.prototype.nodeName="#comment",i.prototype.toString=function(){return"[object Comment]"}}),w=v(function(e,t){function i(e,t){if(!f(this,i))return new i(e);this.data=e||"",this.length=this.data.length,this.ownerDocument=t||null}_(),t.exports=i,i.prototype.type="DOMTextNode",i.prototype.nodeType=3,i.prototype.nodeName="#text",i.prototype.toString=function(){return this.data},i.prototype.replaceData=function(e,t,i){var a=this.data,r=a.substring(0,e),n=a.substring(e+t,a.length);this.data=r+i+n,this.length=this.data.length}}),S=v(function(e,t){t.exports=function(e){var t=this,i=e.type;e.target||(e.target=t),t.listeners||(t.listeners={});var a=t.listeners[i];if(a)return a.forEach(function(i){e.currentTarget=t,"function"==typeof i?i(e):i.handleEvent(e)});t.parentNode&&t.parentNode.dispatchEvent(e)}}),I=v(function(e,t){t.exports=function(e,t){this.listeners||(this.listeners={}),this.listeners[e]||(this.listeners[e]=[]),-1===this.listeners[e].indexOf(t)&&this.listeners[e].push(t)}}),R=v(function(e,t){t.exports=function(e,t){if(this.listeners&&this.listeners[e]){var i=this.listeners[e],a=i.indexOf(t);-1!==a&&i.splice(a,1)}}}),D=v(function(e,t){T(),t.exports=function e(t){switch(t.nodeType){case 3:return r(t.data);case 8:return"\x3c!--"+t.data+"--\x3e";default:var n,s,o;return s=[],o=(n=t).tagName,"http://www.w3.org/1999/xhtml"===n.namespaceURI&&(o=o.toLowerCase()),s.push("<"+o+function(e){var t=[];for(var i in e)(function(e,t){var i=y(e[t]);return"style"===t&&Object.keys(e.style).length>0||e.hasOwnProperty(t)&&("string"===i||"boolean"===i||"number"===i)&&"nodeName"!==t&&"className"!==t&&"tagName"!==t&&"textContent"!==t&&"innerText"!==t&&"namespaceURI"!==t&&"innerHTML"!==t})(e,i)&&t.push({name:i,value:e[i]});for(var r in e._attributes)for(var n in e._attributes[r]){var s=e._attributes[r][n],o=(s.prefix?s.prefix+":":"")+n;t.push({name:o,value:s.value})}return e.className&&t.push({name:"class",value:e.className}),t.length?a(t):""}(n)+function(e){var t=e.dataset,i=[];for(var r in t)i.push({name:"data-"+r,value:t[r]});return i.length?a(i):""}(n)),i.indexOf(o)>-1?s.push(" />"):(s.push(">"),n.childNodes.length?s.push.apply(s,n.childNodes.map(e)):n.textContent||n.innerText?s.push(r(n.textContent||n.innerText)):n.innerHTML&&s.push(n.innerHTML),s.push("</"+o+">")),s.join("")}};var i=["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr"];function a(e){var t=[];return e.forEach(function(e){var i=e.name,a=e.value;"style"===i&&(a=function(e){if("string"==typeof e)return e;var t="";return Object.keys(e).forEach(function(i){var a=e[i];i=i.replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()}),t+=i+":"+a+";"}),t}(a)),t.push(i+'="'+r(a).replace(/"/g,"&quot;")+'"')}),t.length?" "+t.join(" "):""}function r(e){var t="";return"string"==typeof e?t=e:e&&(t=e.toString()),t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}),L=v(function(e,t){_();var i=A(),a=S(),r=I(),n=R(),s=D(),o="http://www.w3.org/1999/xhtml";function l(e,t,i){if(!f(this,l))return new l(e);var a=void 0===i?o:i||null;this.tagName=a===o?String(e).toUpperCase():e,this.nodeName=this.tagName,this.className="",this.dataset={},this.childNodes=[],this.parentNode=null,this.style={},this.ownerDocument=t||null,this.namespaceURI=a,this._attributes={},"INPUT"===this.tagName&&(this.type="text")}t.exports=l,l.prototype.type="DOMElement",l.prototype.nodeType=1,l.prototype.appendChild=function(e){return e.parentNode&&e.parentNode.removeChild(e),this.childNodes.push(e),e.parentNode=this,e},l.prototype.replaceChild=function(e,t){e.parentNode&&e.parentNode.removeChild(e);var i=this.childNodes.indexOf(t);return t.parentNode=null,this.childNodes[i]=e,e.parentNode=this,t},l.prototype.removeChild=function(e){var t=this.childNodes.indexOf(e);return this.childNodes.splice(t,1),e.parentNode=null,e},l.prototype.insertBefore=function(e,t){e.parentNode&&e.parentNode.removeChild(e);var i=null==t?-1:this.childNodes.indexOf(t);return i>-1?this.childNodes.splice(i,0,e):this.childNodes.push(e),e.parentNode=this,e},l.prototype.setAttributeNS=function(e,t,i){var a=null,r=t,n=t.indexOf(":");(n>-1&&(a=t.substr(0,n),r=t.substr(n+1)),"INPUT"===this.tagName&&"type"===t)?this.type=i:(this._attributes[e]||(this._attributes[e]={}))[r]={value:i,prefix:a}},l.prototype.getAttributeNS=function(e,t){var i=this._attributes[e],a=i&&i[t]&&i[t].value;return"INPUT"===this.tagName&&"type"===t?this.type:"string"!=typeof a?null:a},l.prototype.removeAttributeNS=function(e,t){var i=this._attributes[e];i&&delete i[t]},l.prototype.hasAttributeNS=function(e,t){var i=this._attributes[e];return!!i&&t in i},l.prototype.setAttribute=function(e,t){return this.setAttributeNS(null,e,t)},l.prototype.getAttribute=function(e){return this.getAttributeNS(null,e)},l.prototype.removeAttribute=function(e){return this.removeAttributeNS(null,e)},l.prototype.hasAttribute=function(e){return this.hasAttributeNS(null,e)},l.prototype.removeEventListener=n,l.prototype.addEventListener=r,l.prototype.dispatchEvent=a,l.prototype.focus=function(){},l.prototype.toString=function(){return s(this)},l.prototype.getElementsByClassName=function(e){var t=e.split(" "),a=[];return i(this,function(e){if(1===e.nodeType){var i=(e.className||"").split(" ");t.every(function(e){return -1!==i.indexOf(e)})&&a.push(e)}}),a},l.prototype.getElementsByTagName=function(e){e=e.toLowerCase();var t=[];return i(this.childNodes,function(i){1===i.nodeType&&("*"===e||i.tagName.toLowerCase()===e)&&t.push(i)}),t},l.prototype.contains=function(e){return i(this,function(t){return e===t})||!1}}),C=v(function(e,t){_();var i=L();function a(e){if(!f(this,a))return new a;this.childNodes=[],this.parentNode=null,this.ownerDocument=e||null}t.exports=a,a.prototype.type="DocumentFragment",a.prototype.nodeType=11,a.prototype.nodeName="#document-fragment",a.prototype.appendChild=i.prototype.appendChild,a.prototype.replaceChild=i.prototype.replaceChild,a.prototype.removeChild=i.prototype.removeChild,a.prototype.toString=function(){return this.childNodes.map(function(e){return String(e)}).join("")}}),M=v(function(e,t){function i(e){}t.exports=i,i.prototype.initEvent=function(e,t,i){this.type=e,this.bubbles=t,this.cancelable=i},i.prototype.preventDefault=function(){}}),O=v(function(e,t){_();var i=A(),a=k(),r=w(),n=L(),s=C(),o=M(),l=S(),d=I(),u=R();function c(){if(!f(this,c))return new c;this.head=this.createElement("head"),this.body=this.createElement("body"),this.documentElement=this.createElement("html"),this.documentElement.appendChild(this.head),this.documentElement.appendChild(this.body),this.childNodes=[this.documentElement],this.nodeType=9}t.exports=c;var h=c.prototype;h.createTextNode=function(e){return new r(e,this)},h.createElementNS=function(e,t){return new n(t,this,null===e?null:String(e))},h.createElement=function(e){return new n(e,this)},h.createDocumentFragment=function(){return new s(this)},h.createEvent=function(e){return new o(e)},h.createComment=function(e){return new a(e,this)},h.getElementById=function(e){return e=String(e),i(this.childNodes,function(t){if(String(t.id)===e)return t})||null},h.getElementsByClassName=n.prototype.getElementsByClassName,h.getElementsByTagName=n.prototype.getElementsByTagName,h.contains=n.prototype.contains,h.removeEventListener=u,h.addEventListener=d,h.dispatchEvent=l}),x=v(function(e,t){t.exports=new(O())}),N=v(function(e,t){var i,a="undefined"!=typeof global?global:"undefined"!=typeof window?window:{},r=x();"undefined"!=typeof document?i=document:(i=a["__GLOBAL_DOCUMENT_CACHE@4"])||(i=a["__GLOBAL_DOCUMENT_CACHE@4"]=r),t.exports=i});function P(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,a=Array(t);i<t;i++)a[i]=e[i];return a}function U(e,t){if(e){if("string"==typeof e)return P(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);if("Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i)return Array.from(i);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return P(e,t)}}function B(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var i=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=i){var a,r,n=[],s=!0,o=!1;try{for(i=i.call(e);!(s=(a=i.next()).done)&&(n.push(a.value),!(t&&n.length===t));s=!0);}catch(e){o=!0,r=e}finally{try{s||null==i.return||i.return()}finally{if(o)throw r}}return n}}(e,t)||U(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var H=b(g()),W=b(g()),V=b(g()),F={now:function(){var e=V.default.performance,t=e&&e.timing,i=t&&t.navigationStart;return Math.round("number"==typeof i&&"function"==typeof e.now?i+e.now():Date.now())}},$=function(){if("function"==typeof(null==(e=W.default.crypto)?void 0:e.getRandomValues)){i=new Uint8Array(32),W.default.crypto.getRandomValues(i);for(var e,t,i,a=0;a<32;a++)i[a]=i[a]%16}else{i=[];for(var r=0;r<32;r++)i[r]=16*Math.random()|0}var n=0;t="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t="x"===e?i[n]:3&i[n]|8;return n++,t.toString(16)});var s=F.now(),o=null==s?void 0:s.toString(16).substring(3);return o?t.substring(0,28)+o:t},K=function(){return("000000"+(0x81bf1000*Math.random()|0).toString(36)).slice(-6)},q=function(e){var t;if(e&&void 0!==e.nodeName)return e.muxId||(e.muxId=K()),e.muxId;try{t=document.querySelector(e)}catch(e){}return t&&!t.muxId&&(t.muxId=e),(null==t?void 0:t.muxId)||e},Y=function(e){e&&void 0!==e.nodeName?e=q(t=e):t=document.querySelector(e);var t,i=t&&t.nodeName?t.nodeName.toLowerCase():"";return[t,e,i]};function G(e){return function(e){if(Array.isArray(e))return P(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||U(e)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var j={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4},Q=function(e){var t,i,a,r,n,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3,o=e?[console,e]:[console],l=(t=console.trace).bind.apply(t,G(o)),d=(i=console.info).bind.apply(i,G(o)),u=(a=console.debug).bind.apply(a,G(o)),c=(r=console.warn).bind.apply(r,G(o)),h=(n=console.error).bind.apply(n,G(o)),m=s;return{trace:function(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];if(!(m>j.TRACE))return l.apply(void 0,G(t))},debug:function(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];if(!(m>j.DEBUG))return u.apply(void 0,G(t))},info:function(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];if(!(m>j.INFO))return d.apply(void 0,G(t))},warn:function(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];if(!(m>j.WARN))return c.apply(void 0,G(t))},error:function(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];if(!(m>j.ERROR))return h.apply(void 0,G(t))},get level(){return m},set level(p){p!==this.level&&(m=null!=p?p:s)}}}("[mux]"),Z=b(g());function z(){return"1"===(Z.default.doNotTrack||Z.default.navigator&&Z.default.navigator.doNotTrack)}function X(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function J(e,t){if(!f(e,t))throw TypeError("Cannot call a class as a function")}function ee(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function et(e,t,i){return t&&ee(e.prototype,t),i&&ee(e,i),e}function ei(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function ea(e){return(ea=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function er(e,t,i){return(er="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,i){var a=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=ea(e)););return e}(e,t);if(a){var r=Object.getOwnPropertyDescriptor(a,t);return r.get?r.get.call(i||e):r.value}})(e,t,i||e)}function en(e,t){return(en=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}_(),T();var es=function(e){return eo(e)[0]},eo=function(e){if("string"!=typeof e||""===e)return["localhost"];var t,i=(e.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/)||[])[4];return i&&(t=(i.match(/[^\.]+\.[^\.]+$/)||[])[0]),[i,t]},el=b(g()),ed={exists:function(){var e=el.default.performance;return void 0!==(e&&e.timing)},domContentLoadedEventEnd:function(){var e=el.default.performance,t=e&&e.timing;return t&&t.domContentLoadedEventEnd},navigationStart:function(){var e=el.default.performance,t=e&&e.timing;return t&&t.navigationStart}};function eu(e,t,i){i=void 0===i?1:i,e[t]=e[t]||0,e[t]+=i}function ec(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{},a=Object.keys(i);"function"==typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(i).filter(function(e){return Object.getOwnPropertyDescriptor(i,e).enumerable}))),a.forEach(function(t){ei(e,t,i[t])})}return e}function eh(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):(function(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);i.push.apply(i,a)}return i})(Object(t)).forEach(function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(t,i))}),e}var em=["x-request-id","cf-ray","x-amz-cf-id","x-akamai-request-id"],ep=["x-cdn","content-type"].concat(em);function ev(e){var t={};return(e=e||"").trim().split(/[\r\n]+/).forEach(function(e){if(e){var i=e.split(": "),a=i.shift();a&&(ep.indexOf(a.toLowerCase())>=0||0===a.toLowerCase().indexOf("x-litix-"))&&(t[a]=i.join(": "))}}),t}function eE(e){if(e){var t=em.find(function(t){return void 0!==e[t]});return t?e[t]:void 0}}var eb=function(e){var t={};for(var i in e){var a=e[i];-1!==a["DATA-ID"].search("io.litix.data.")&&(t[a["DATA-ID"].replace("io.litix.data.","")]=a.VALUE)}return t},eg=function(e){if(!e)return{};var t=ed.navigationStart(),i=e.loading,a=i?i.start:e.trequest,r=i?i.first:e.tfirst,n=i?i.end:e.tload;return{bytesLoaded:e.total,requestStart:Math.round(t+a),responseStart:Math.round(t+r),responseEnd:Math.round(t+n)}},ef=function(e){if(!(!e||"function"!=typeof e.getAllResponseHeaders))return ev(e.getAllResponseHeaders())},e_=function(e,t,i){arguments.length>3&&void 0!==arguments[3]&&arguments[3];var a=arguments.length>4?arguments[4]:void 0,r=e.log,n=e.utils.secondsToMs,s=function(e){var t,i=parseInt(a.version);return 1===i&&null!==e.programDateTime&&(t=e.programDateTime),0===i&&null!==e.pdt&&(t=e.pdt),t};if(!ed.exists())return void r.warn("performance timing not supported. Not tracking HLS.js.");var o=function(i,a){return e.emit(t,i,a)},l=function(e,t){var i=t.levels,a=t.audioTracks,r=t.url,n=t.stats,s=t.networkDetails,l=t.sessionData,d={},u={};i.forEach(function(e,t){d[t]={width:e.width,height:e.height,bitrate:e.bitrate,attrs:e.attrs}}),a.forEach(function(e,t){u[t]={name:e.name,language:e.lang,bitrate:e.bitrate}});var c=eg(n),h=c.bytesLoaded,m=c.requestStart,v=c.responseStart,E=c.responseEnd;o("requestcompleted",eh(ec({},eb(l)),{request_event_type:e,request_bytes_loaded:h,request_start:m,request_response_start:v,request_response_end:E,request_type:"manifest",request_hostname:es(r),request_response_headers:ef(s),request_rendition_lists:{media:d,audio:u,video:{}}}))};i.on(a.Events.MANIFEST_LOADED,l);var d=function(e,t){var i=t.details,a=t.level,r=t.networkDetails,l=eg(t.stats),d=l.bytesLoaded,u=l.requestStart,c=l.responseStart,h=l.responseEnd,m=i.fragments[i.fragments.length-1],v=s(m)+n(m.duration);o("requestcompleted",{request_event_type:e,request_bytes_loaded:d,request_start:u,request_response_start:c,request_response_end:h,request_current_level:a,request_type:"manifest",request_hostname:es(i.url),request_response_headers:ef(r),video_holdback:i.holdBack&&n(i.holdBack),video_part_holdback:i.partHoldBack&&n(i.partHoldBack),video_part_target_duration:i.partTarget&&n(i.partTarget),video_target_duration:i.targetduration&&n(i.targetduration),video_source_is_live:i.live,player_manifest_newest_program_time:isNaN(v)?void 0:v})};i.on(a.Events.LEVEL_LOADED,d);var u=function(e,t){var i=t.details,a=t.networkDetails,r=eg(t.stats);o("requestcompleted",{request_event_type:e,request_bytes_loaded:r.bytesLoaded,request_start:r.requestStart,request_response_start:r.responseStart,request_response_end:r.responseEnd,request_type:"manifest",request_hostname:es(i.url),request_response_headers:ef(a)})};i.on(a.Events.AUDIO_TRACK_LOADED,u);var c=function(e,t){var a=t.stats,r=t.networkDetails,n=t.frag,s=eg(a=a||n.stats),l=s.bytesLoaded,d=s.requestStart,u=s.responseStart,c=s.responseEnd,h=r?ef(r):void 0,m={request_event_type:e,request_bytes_loaded:l,request_start:d,request_response_start:u,request_response_end:c,request_hostname:r?es(r.responseURL):void 0,request_id:h?eE(h):void 0,request_response_headers:h,request_media_duration:n.duration,request_url:null==r?void 0:r.responseURL};"main"===n.type?(m.request_type="media",m.request_current_level=n.level,m.request_video_width=(i.levels[n.level]||{}).width,m.request_video_height=(i.levels[n.level]||{}).height,m.request_labeled_bitrate=(i.levels[n.level]||{}).bitrate):m.request_type=n.type,o("requestcompleted",m)};i.on(a.Events.FRAG_LOADED,c);var h=function(e,t){var i=t.frag,a=i.start;o("fragmentchange",{currentFragmentPDT:s(i),currentFragmentStart:n(a)})};i.on(a.Events.FRAG_CHANGED,h);var m=function(e,t){var i,r=t.type,n=t.details,s=t.response,l=t.fatal,d=t.frag,u=t.networkDetails,c=(null==d?void 0:d.url)||t.url||"",h=u?ef(u):void 0;(n===a.ErrorDetails.MANIFEST_LOAD_ERROR||n===a.ErrorDetails.MANIFEST_LOAD_TIMEOUT||n===a.ErrorDetails.FRAG_LOAD_ERROR||n===a.ErrorDetails.FRAG_LOAD_TIMEOUT||n===a.ErrorDetails.LEVEL_LOAD_ERROR||n===a.ErrorDetails.LEVEL_LOAD_TIMEOUT||n===a.ErrorDetails.AUDIO_TRACK_LOAD_ERROR||n===a.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT||n===a.ErrorDetails.SUBTITLE_LOAD_ERROR||n===a.ErrorDetails.SUBTITLE_LOAD_TIMEOUT||n===a.ErrorDetails.KEY_LOAD_ERROR||n===a.ErrorDetails.KEY_LOAD_TIMEOUT)&&o("requestfailed",{request_error:n,request_url:c,request_hostname:es(c),request_id:h?eE(h):void 0,request_type:n===a.ErrorDetails.FRAG_LOAD_ERROR||n===a.ErrorDetails.FRAG_LOAD_TIMEOUT?"media":n===a.ErrorDetails.AUDIO_TRACK_LOAD_ERROR||n===a.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT?"audio":n===a.ErrorDetails.SUBTITLE_LOAD_ERROR||n===a.ErrorDetails.SUBTITLE_LOAD_TIMEOUT?"subtitle":n===a.ErrorDetails.KEY_LOAD_ERROR||n===a.ErrorDetails.KEY_LOAD_TIMEOUT?"encryption":"manifest",request_error_code:null==s?void 0:s.code,request_error_text:null==s?void 0:s.text}),l&&o("error",{player_error_code:r,player_error_message:n,player_error_context:"".concat(c?"url: ".concat(c,"\n"):"")+"".concat(s&&(s.code||s.text)?"response: ".concat(s.code,", ").concat(s.text,"\n"):"")+"".concat(t.reason?"failure reason: ".concat(t.reason,"\n"):"")+"".concat(t.level?"level: ".concat(t.level,"\n"):"")+"".concat(t.parent?"parent stream controller: ".concat(t.parent,"\n"):"")+"".concat(t.buffer?"buffer length: ".concat(t.buffer,"\n"):"")+"".concat(t.error?"error: ".concat(t.error,"\n"):"")+"".concat(t.event?"event: ".concat(t.event,"\n"):"")+"".concat(t.err?"error message: ".concat(null==(i=t.err)?void 0:i.message,"\n"):"")})};i.on(a.Events.ERROR,m);var v=function(e,t){var i=t.frag,a=i&&i._url||"";o("requestcanceled",{request_event_type:e,request_url:a,request_type:"media",request_hostname:es(a)})};i.on(a.Events.FRAG_LOAD_EMERGENCY_ABORTED,v);var E=function(e,t){var a=t.level,n=i.levels[a];if(n&&n.attrs&&n.attrs.BANDWIDTH){var s,l=n.attrs.BANDWIDTH,d=parseFloat(n.attrs["FRAME-RATE"]);isNaN(d)||(s=d),l?o("renditionchange",{video_source_fps:s,video_source_bitrate:l,video_source_width:n.width,video_source_height:n.height,video_source_rendition_name:n.name,video_source_codec:null==n?void 0:n.videoCodec}):r.warn("missing BANDWIDTH from HLS manifest parsed by HLS.js")}};i.on(a.Events.LEVEL_SWITCHED,E),i._stopMuxMonitor=function(){i.off(a.Events.MANIFEST_LOADED,l),i.off(a.Events.LEVEL_LOADED,d),i.off(a.Events.AUDIO_TRACK_LOADED,u),i.off(a.Events.FRAG_LOADED,c),i.off(a.Events.FRAG_CHANGED,h),i.off(a.Events.ERROR,m),i.off(a.Events.FRAG_LOAD_EMERGENCY_ABORTED,v),i.off(a.Events.LEVEL_SWITCHED,E),i.off(a.Events.DESTROYING,i._stopMuxMonitor),delete i._stopMuxMonitor},i.on(a.Events.DESTROYING,i._stopMuxMonitor)},ey=function(e){e&&"function"==typeof e._stopMuxMonitor&&e._stopMuxMonitor()},eT=function(e,t){if(!e||!e.requestEndDate)return{};var i,a=es(e.url),r=e.url,n=e.bytesLoaded,s=new Date(e.requestStartDate).getTime(),o=new Date(e.firstByteDate).getTime(),l=new Date(e.requestEndDate).getTime(),d=isNaN(e.duration)?0:e.duration,u="function"==typeof t.getMetricsFor?t.getMetricsFor(e.mediaType).HttpList:t.getDashMetrics().getHttpRequests(e.mediaType);u.length>0&&(i=ev(u[u.length-1]._responseHeaders||""));var c=i?eE(i):void 0;return{requestStart:s,requestResponseStart:o,requestResponseEnd:l,requestBytesLoaded:n,requestResponseHeaders:i,requestMediaDuration:d,requestHostname:a,requestUrl:r,requestId:c}},eA=function(e,t){var i=t.getQualityFor(e),a=t.getCurrentTrackFor(e).bitrateList;return a?{currentLevel:i,renditionWidth:a[i].width||null,renditionHeight:a[i].height||null,renditionBitrate:a[i].bandwidth}:{}},ek=function(e){var t;return null==(t=e.match(/.*codecs\*?="(.*)"/))?void 0:t[1]},ew=function(e){try{var t,i;return null==(i=e.getVersion)||null==(t=i.call(e))?void 0:t.split(".").map(function(e){return parseInt(e)})[0]}catch(e){return!1}},eS=function(e,t,i){arguments.length>3&&void 0!==arguments[3]&&arguments[3];var a=e.log;if(!i||!i.on)return void a.warn("Invalid dash.js player reference. Monitoring blocked.");var r=ew(i),n=function(i,a){return e.emit(t,i,a)},s=function(e){var t=e.type,i=(e.data||{}).url;n("requestcompleted",{request_event_type:t,request_start:0,request_response_start:0,request_response_end:0,request_bytes_loaded:-1,request_type:"manifest",request_hostname:es(i),request_url:i})};i.on("manifestLoaded",s);var o={},l=function(e){if("function"!=typeof e.getRequests)return null;var t=e.getRequests({state:"executed"});return 0===t.length?null:t[t.length-1]},d=function(e){var t=e.type,a=e.chunk,r=e.request,s=(a||{}).mediaInfo||{},l=s.type,d=s.bitrateList,u={};(d=d||[]).forEach(function(e,t){u[t]={},u[t].width=e.width,u[t].height=e.height,u[t].bitrate=e.bandwidth,u[t].attrs={}}),"video"===l?o.video=u:"audio"===l?o.audio=u:o.media=u;var c=eT(r,i),h=c.requestStart,m=c.requestResponseStart,v=c.requestResponseEnd,E=c.requestResponseHeaders,b=c.requestMediaDuration,g=c.requestHostname,f=c.requestUrl;n("requestcompleted",{request_event_type:t,request_start:h,request_response_start:m,request_response_end:v,request_bytes_loaded:-1,request_type:l+"_init",request_response_headers:E,request_hostname:g,request_id:c.requestId,request_url:f,request_media_duration:b,request_rendition_lists:o})};r>=4?i.on("initFragmentLoaded",d):i.on("initFragmentLoaded",function(e){var t=e.type,i=e.fragmentModel,a=e.chunk;d({type:t,request:l(i),chunk:a})});var u=function(e){var t=e.type,a=e.chunk,r=e.request,s=a||{},o=s.mediaInfo,l=s.start,d=(o||{}).type,u=eT(r,i),c=u.requestStart,h=u.requestResponseStart,m=u.requestResponseEnd,v=u.requestBytesLoaded,E=u.requestResponseHeaders,b=u.requestMediaDuration,g=u.requestHostname,f=u.requestUrl,_=u.requestId,y=eA(d,i),T=y.currentLevel,A=y.renditionWidth,k=y.renditionHeight;n("requestcompleted",{request_event_type:t,request_start:c,request_response_start:h,request_response_end:m,request_bytes_loaded:v,request_type:d,request_response_headers:E,request_hostname:g,request_id:_,request_url:f,request_media_start_time:l,request_media_duration:b,request_current_level:T,request_labeled_bitrate:y.renditionBitrate,request_video_width:A,request_video_height:k})};r>=4?i.on("mediaFragmentLoaded",u):i.on("mediaFragmentLoaded",function(e){var t=e.type,i=e.fragmentModel,a=e.chunk;u({type:t,request:l(i),chunk:a})});var c={video:void 0,audio:void 0,totalBitrate:void 0},h=function(){if(c.video&&"number"==typeof c.video.bitrate){if(!(c.video.width&&c.video.height))return void a.warn("have bitrate info for video but missing width/height");var e=c.video.bitrate;if(c.audio&&"number"==typeof c.audio.bitrate&&(e+=c.audio.bitrate),e!==c.totalBitrate)return c.totalBitrate=e,{video_source_bitrate:e,video_source_height:c.video.height,video_source_width:c.video.width,video_source_codec:ek(c.video.codec)}}},m=function(e,t,r){if("number"!=typeof e.newQuality)return void a.warn("missing evt.newQuality in qualityChangeRendered event",e);var s=e.mediaType;if("audio"===s||"video"===s){var o=i.getBitrateInfoListFor(s).find(function(t){return t.qualityIndex===e.newQuality});if(!(o&&"number"==typeof o.bitrate))return void a.warn("missing bitrate info for ".concat(s));c[s]=eh(ec({},o),{codec:i.getCurrentTrackFor(s).codec});var l=h();l&&n("renditionchange",l)}};i.on("qualityChangeRendered",m);var v=function(e){var t=e.request,i=e.mediaType;n("requestcanceled",{request_event_type:(t=t||{}).type+"_"+t.action,request_url:t.url,request_type:i,request_hostname:es(t.url)})};i.on("fragmentLoadingAbandoned",v);var E=function(e){var t,i,a=e.error,r=(null==a||null==(t=a.data)?void 0:t.request)||{},s=(null==a||null==(i=a.data)?void 0:i.response)||{};(null==a?void 0:a.code)===27&&n("requestfailed",{request_error:r.type+"_"+r.action,request_url:r.url,request_hostname:es(r.url),request_type:r.mediaType,request_error_code:s.status,request_error_text:s.statusText});var o="".concat(null!=r&&r.url?"url: ".concat(r.url,"\n"):"")+"".concat(null!=s&&s.status||null!=s&&s.statusText?"response: ".concat(null==s?void 0:s.status,", ").concat(null==s?void 0:s.statusText,"\n"):"");n("error",{player_error_code:null==a?void 0:a.code,player_error_message:null==a?void 0:a.message,player_error_context:o})};i.on("error",E),i._stopMuxMonitor=function(){i.off("manifestLoaded",s),i.off("initFragmentLoaded",d),i.off("mediaFragmentLoaded",u),i.off("qualityChangeRendered",m),i.off("error",E),i.off("fragmentLoadingAbandoned",v),delete i._stopMuxMonitor}},eI=function(e){e&&"function"==typeof e._stopMuxMonitor&&e._stopMuxMonitor()},eR=0,eD=function(){function e(){J(this,e),ei(this,"_listeners",void 0)}return et(e,[{key:"on",value:function(e,t,i){return t._eventEmitterGuid=t._eventEmitterGuid||++eR,this._listeners=this._listeners||{},this._listeners[e]=this._listeners[e]||[],i&&(t=t.bind(i)),this._listeners[e].push(t),t}},{key:"off",value:function(e,t){var i=this._listeners&&this._listeners[e];i&&i.forEach(function(e,a){e._eventEmitterGuid===t._eventEmitterGuid&&i.splice(a,1)})}},{key:"one",value:function(e,t,i){var a=this;t._eventEmitterGuid=t._eventEmitterGuid||++eR;var r=function(){a.off(e,r),t.apply(i||this,arguments)};r._eventEmitterGuid=t._eventEmitterGuid,this.on(e,r)}},{key:"emit",value:function(e,t){var i=this;if(this._listeners){t=t||{};var a=this._listeners["before"+e]||[],r=this._listeners["before*"]||[],n=this._listeners[e]||[],s=this._listeners["after"+e]||[],o=function(t,a){(t=t.slice()).forEach(function(t){t.call(i,{type:e},a)})};o(a,t),o(r,t),o(n,t),o(s,t)}}}]),e}(),eL=b(g()),eC=function(){function e(t){var i=this;J(this,e),ei(this,"_playbackHeartbeatInterval",void 0),ei(this,"_playheadShouldBeProgressing",void 0),ei(this,"pm",void 0),this.pm=t,this._playbackHeartbeatInterval=null,this._playheadShouldBeProgressing=!1,t.on("playing",function(){i._playheadShouldBeProgressing=!0}),t.on("play",this._startPlaybackHeartbeatInterval.bind(this)),t.on("playing",this._startPlaybackHeartbeatInterval.bind(this)),t.on("adbreakstart",this._startPlaybackHeartbeatInterval.bind(this)),t.on("adplay",this._startPlaybackHeartbeatInterval.bind(this)),t.on("adplaying",this._startPlaybackHeartbeatInterval.bind(this)),t.on("devicewake",this._startPlaybackHeartbeatInterval.bind(this)),t.on("viewstart",this._startPlaybackHeartbeatInterval.bind(this)),t.on("rebufferstart",this._startPlaybackHeartbeatInterval.bind(this)),t.on("pause",this._stopPlaybackHeartbeatInterval.bind(this)),t.on("ended",this._stopPlaybackHeartbeatInterval.bind(this)),t.on("viewend",this._stopPlaybackHeartbeatInterval.bind(this)),t.on("error",this._stopPlaybackHeartbeatInterval.bind(this)),t.on("aderror",this._stopPlaybackHeartbeatInterval.bind(this)),t.on("adpause",this._stopPlaybackHeartbeatInterval.bind(this)),t.on("adended",this._stopPlaybackHeartbeatInterval.bind(this)),t.on("adbreakend",this._stopPlaybackHeartbeatInterval.bind(this)),t.on("seeked",function(){t.data.player_is_paused?i._stopPlaybackHeartbeatInterval():i._startPlaybackHeartbeatInterval()}),t.on("timeupdate",function(){null!==i._playbackHeartbeatInterval&&t.emit("playbackheartbeat")}),t.on("devicesleep",function(e,a){null!==i._playbackHeartbeatInterval&&(eL.default.clearInterval(i._playbackHeartbeatInterval),t.emit("playbackheartbeatend",{viewer_time:a.viewer_time}),i._playbackHeartbeatInterval=null)})}return et(e,[{key:"_startPlaybackHeartbeatInterval",value:function(){var e=this;null===this._playbackHeartbeatInterval&&(this.pm.emit("playbackheartbeat"),this._playbackHeartbeatInterval=eL.default.setInterval(function(){e.pm.emit("playbackheartbeat")},this.pm.playbackHeartbeatTime))}},{key:"_stopPlaybackHeartbeatInterval",value:function(){this._playheadShouldBeProgressing=!1,null!==this._playbackHeartbeatInterval&&(eL.default.clearInterval(this._playbackHeartbeatInterval),this.pm.emit("playbackheartbeatend"),this._playbackHeartbeatInterval=null)}}]),e}(),eM=function e(t){var i=this;J(this,e),ei(this,"viewErrored",void 0),t.on("viewinit",function(){i.viewErrored=!1}),t.on("error",function(e,a){try{var r=t.errorTranslator({player_error_code:a.player_error_code,player_error_message:a.player_error_message,player_error_context:a.player_error_context,player_error_severity:a.player_error_severity,player_error_business_exception:a.player_error_business_exception});r&&(t.data.player_error_code=r.player_error_code||a.player_error_code,t.data.player_error_message=r.player_error_message||a.player_error_message,t.data.player_error_context=r.player_error_context||a.player_error_context,t.data.player_error_severity=r.player_error_severity||a.player_error_severity,t.data.player_error_business_exception=r.player_error_business_exception||a.player_error_business_exception,i.viewErrored=!0)}catch(e){t.mux.log.warn("Exception in error translator callback.",e),i.viewErrored=!0}}),t.on("aftererror",function(){var e,i,a,r,n;null==(e=t.data)||delete e.player_error_code,null==(i=t.data)||delete i.player_error_message,null==(a=t.data)||delete a.player_error_context,null==(r=t.data)||delete r.player_error_severity,null==(n=t.data)||delete n.player_error_business_exception})},eO=function(){function e(t){J(this,e),ei(this,"_watchTimeTrackerLastCheckedTime",void 0),ei(this,"pm",void 0),this.pm=t,this._watchTimeTrackerLastCheckedTime=null,t.on("playbackheartbeat",this._updateWatchTime.bind(this)),t.on("playbackheartbeatend",this._clearWatchTimeState.bind(this))}return et(e,[{key:"_updateWatchTime",value:function(e,t){var i=t.viewer_time;null===this._watchTimeTrackerLastCheckedTime&&(this._watchTimeTrackerLastCheckedTime=i),eu(this.pm.data,"view_watch_time",i-this._watchTimeTrackerLastCheckedTime),this._watchTimeTrackerLastCheckedTime=i}},{key:"_clearWatchTimeState",value:function(e,t){this._updateWatchTime(e,t),this._watchTimeTrackerLastCheckedTime=null}}]),e}(),ex=function(){function e(t){var i=this;J(this,e),ei(this,"_playbackTimeTrackerLastPlayheadPosition",void 0),ei(this,"_lastTime",void 0),ei(this,"_isAdPlaying",void 0),ei(this,"_callbackUpdatePlaybackTime",void 0),ei(this,"pm",void 0),this.pm=t,this._playbackTimeTrackerLastPlayheadPosition=-1,this._lastTime=F.now(),this._isAdPlaying=!1,this._callbackUpdatePlaybackTime=null,t.on("viewinit",function(){i.pm.data.view_playing_time_ms_cumulative=0});var a=this._startPlaybackTimeTracking.bind(this);t.on("playing",a),t.on("adplaying",a),t.on("seeked",a),t.on("rebufferend",a);var r=this._stopPlaybackTimeTracking.bind(this);t.on("playbackheartbeatend",r),t.on("seeking",r),t.on("rebufferstart",r),t.on("adplaying",function(){i._isAdPlaying=!0}),t.on("adended",function(){i._isAdPlaying=!1}),t.on("adpause",function(){i._isAdPlaying=!1}),t.on("adbreakstart",function(){i._isAdPlaying=!1}),t.on("adbreakend",function(){i._isAdPlaying=!1}),t.on("adplay",function(){i._isAdPlaying=!1}),t.on("viewinit",function(){i._playbackTimeTrackerLastPlayheadPosition=-1,i._lastTime=F.now(),i._isAdPlaying=!1,i._callbackUpdatePlaybackTime=null})}return et(e,[{key:"_startPlaybackTimeTracking",value:function(){null===this._callbackUpdatePlaybackTime&&(this._callbackUpdatePlaybackTime=this._updatePlaybackTime.bind(this),this._playbackTimeTrackerLastPlayheadPosition=this.pm.data.player_playhead_time,this._lastTime=F.now(),this.pm.on("playbackheartbeat",this._callbackUpdatePlaybackTime))}},{key:"_stopPlaybackTimeTracking",value:function(){this._callbackUpdatePlaybackTime&&(this._updatePlaybackTime(),this.pm.off("playbackheartbeat",this._callbackUpdatePlaybackTime),this._callbackUpdatePlaybackTime=null,this._playbackTimeTrackerLastPlayheadPosition=-1)}},{key:"_updatePlaybackTime",value:function(){var e=this.pm.data.player_playhead_time||0,t=F.now(),i=t-this._lastTime,a=-1;this._playbackTimeTrackerLastPlayheadPosition>=0&&e>this._playbackTimeTrackerLastPlayheadPosition?a=e-this._playbackTimeTrackerLastPlayheadPosition:this._isAdPlaying&&(a=i),a>0&&a<=1e3&&eu(this.pm.data,"view_content_playback_time",a),null!==this._callbackUpdatePlaybackTime&&i>0&&i<=1e3&&(this._isAdPlaying&&eu(this.pm.data,"ad_playing_time_ms_cumulative",i),eu(this.pm.data,"view_playing_time_ms_cumulative",i)),this._playbackTimeTrackerLastPlayheadPosition=e,this._lastTime=t}}]),e}(),eN=function(){function e(t){J(this,e),ei(this,"pm",void 0),this.pm=t;var i=this._updatePlayheadTime.bind(this);t.on("playbackheartbeat",i),t.on("playbackheartbeatend",i),t.on("timeupdate",i),t.on("destroy",function(){t.off("timeupdate",i)})}return et(e,[{key:"_updateMaxPlayheadPosition",value:function(){this.pm.data.view_max_playhead_position=void 0===this.pm.data.view_max_playhead_position?this.pm.data.player_playhead_time:Math.max(this.pm.data.view_max_playhead_position,this.pm.data.player_playhead_time)}},{key:"_updatePlayheadTime",value:function(e,t){var i=this,a=function(){i.pm.currentFragmentPDT&&i.pm.currentFragmentStart&&(i.pm.data.player_program_time=i.pm.currentFragmentPDT+i.pm.data.player_playhead_time-i.pm.currentFragmentStart)};if(t&&t.player_playhead_time)this.pm.data.player_playhead_time=t.player_playhead_time,a(),this._updateMaxPlayheadPosition();else if(this.pm.getPlayheadTime){var r=this.pm.getPlayheadTime();void 0!==r&&(this.pm.data.player_playhead_time=r,a(),this._updateMaxPlayheadPosition())}}}]),e}(),eP=function e(t){if(J(this,e),!t.disableRebufferTracking){var i,a=function(e,t){r(t),i=void 0},r=function(e){if(i){var a=e.viewer_time-i;eu(t.data,"view_rebuffer_duration",a),i=e.viewer_time,t.data.view_rebuffer_duration>3e5&&(t.emit("viewend"),t.send("viewend"),t.mux.log.warn("Ending view after rebuffering for longer than ".concat(3e5,"ms, future events will be ignored unless a programchange or videochange occurs.")))}t.data.view_watch_time>=0&&t.data.view_rebuffer_count>0&&(t.data.view_rebuffer_frequency=t.data.view_rebuffer_count/t.data.view_watch_time,t.data.view_rebuffer_percentage=t.data.view_rebuffer_duration/t.data.view_watch_time)};t.on("playbackheartbeat",function(e,t){return r(t)}),t.on("rebufferstart",function(e,r){i||(eu(t.data,"view_rebuffer_count",1),i=r.viewer_time,t.one("rebufferend",a))}),t.on("viewinit",function(){i=void 0,t.off("rebufferend",a)})}},eU=function(){function e(t){var i=this;J(this,e),ei(this,"_lastCheckedTime",void 0),ei(this,"_lastPlayheadTime",void 0),ei(this,"_lastPlayheadTimeUpdatedTime",void 0),ei(this,"_rebuffering",void 0),ei(this,"pm",void 0),this.pm=t,t.disableRebufferTracking||t.disablePlayheadRebufferTracking||(this._lastCheckedTime=null,this._lastPlayheadTime=null,this._lastPlayheadTimeUpdatedTime=null,t.on("playbackheartbeat",this._checkIfRebuffering.bind(this)),t.on("playbackheartbeatend",this._cleanupRebufferTracker.bind(this)),t.on("seeking",function(){i._cleanupRebufferTracker(null,{viewer_time:F.now()})}))}return et(e,[{key:"_checkIfRebuffering",value:function(e,t){if(this.pm.seekingTracker.isSeeking||this.pm.adTracker.isAdBreak||!this.pm.playbackHeartbeat._playheadShouldBeProgressing)return void this._cleanupRebufferTracker(e,t);if(null===this._lastCheckedTime)return void this._prepareRebufferTrackerState(t.viewer_time);if(this._lastPlayheadTime!==this.pm.data.player_playhead_time)return void this._cleanupRebufferTracker(e,t,!0);var i=t.viewer_time-this._lastPlayheadTimeUpdatedTime;"number"==typeof this.pm.sustainedRebufferThreshold&&i>=this.pm.sustainedRebufferThreshold&&(this._rebuffering||(this._rebuffering=!0,this.pm.emit("rebufferstart",{viewer_time:this._lastPlayheadTimeUpdatedTime}))),this._lastCheckedTime=t.viewer_time}},{key:"_clearRebufferTrackerState",value:function(){this._lastCheckedTime=null,this._lastPlayheadTime=null,this._lastPlayheadTimeUpdatedTime=null}},{key:"_prepareRebufferTrackerState",value:function(e){this._lastCheckedTime=e,this._lastPlayheadTime=this.pm.data.player_playhead_time,this._lastPlayheadTimeUpdatedTime=e}},{key:"_cleanupRebufferTracker",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(this._rebuffering)this._rebuffering=!1,this.pm.emit("rebufferend",{viewer_time:t.viewer_time});else{if(null===this._lastCheckedTime)return;var a=this.pm.data.player_playhead_time-this._lastPlayheadTime,r=t.viewer_time-this._lastPlayheadTimeUpdatedTime;"number"==typeof this.pm.minimumRebufferDuration&&a>0&&r-a>this.pm.minimumRebufferDuration&&(this._lastCheckedTime=null,this.pm.emit("rebufferstart",{viewer_time:this._lastPlayheadTimeUpdatedTime}),this.pm.emit("rebufferend",{viewer_time:this._lastPlayheadTimeUpdatedTime+r-a}))}i?this._prepareRebufferTrackerState(t.viewer_time):this._clearRebufferTrackerState()}}]),e}(),eB=function(){function e(t){var i=this;J(this,e),ei(this,"pm",void 0),this.pm=t,t.on("viewinit",function(){var e=t.data,a=e.view_id;if(!e.view_program_changed){var r=function(e,r){var n=r.viewer_time;"playing"===e.type&&void 0===t.data.view_time_to_first_frame?i.calculateTimeToFirstFrame(n||F.now(),a):"adplaying"===e.type&&(void 0===t.data.view_time_to_first_frame||i._inPrerollPosition())&&i.calculateTimeToFirstFrame(n||F.now(),a)};t.one("playing",r),t.one("adplaying",r),t.one("viewend",function(){t.off("playing",r),t.off("adplaying",r)})}})}return et(e,[{key:"_inPrerollPosition",value:function(){return void 0===this.pm.data.view_content_playback_time||this.pm.data.view_content_playback_time<=1e3}},{key:"calculateTimeToFirstFrame",value:function(e,t){t===this.pm.data.view_id&&(this.pm.watchTimeTracker._updateWatchTime(null,{viewer_time:e}),this.pm.data.view_time_to_first_frame=this.pm.data.view_watch_time,(this.pm.data.player_autoplay_on||this.pm.data.video_is_autoplay)&&this.pm.pageLoadInitTime&&(this.pm.data.view_aggregate_startup_time=this.pm.data.view_start+this.pm.data.view_watch_time-this.pm.pageLoadInitTime))}}]),e}(),eH=function e(t){var i=this;J(this,e),ei(this,"_lastPlayerHeight",void 0),ei(this,"_lastPlayerWidth",void 0),ei(this,"_lastPlayheadPosition",void 0),ei(this,"_lastSourceHeight",void 0),ei(this,"_lastSourceWidth",void 0),t.on("viewinit",function(){i._lastPlayheadPosition=-1}),["pause","rebufferstart","seeking","error","adbreakstart","hb","renditionchange","orientationchange","viewend","playbackmodechange"].forEach(function(e){t.on(e,function(){if(i._lastPlayheadPosition>=0&&t.data.player_playhead_time>=0&&i._lastPlayerWidth>=0&&i._lastSourceWidth>0&&i._lastPlayerHeight>=0&&i._lastSourceHeight>0){var e=t.data.player_playhead_time-i._lastPlayheadPosition;if(e<0){i._lastPlayheadPosition=-1;return}var a=Math.min(i._lastPlayerWidth/i._lastSourceWidth,i._lastPlayerHeight/i._lastSourceHeight),r=Math.max(0,a-1),n=Math.max(0,1-a);t.data.view_max_upscale_percentage=Math.max(t.data.view_max_upscale_percentage||0,r),t.data.view_max_downscale_percentage=Math.max(t.data.view_max_downscale_percentage||0,n),eu(t.data,"view_total_content_playback_time",e),eu(t.data,"view_total_upscaling",r*e),eu(t.data,"view_total_downscaling",n*e)}i._lastPlayheadPosition=-1})}),["playing","hb","renditionchange","orientationchange","playbackmodechange"].forEach(function(e){t.on(e,function(){i._lastPlayheadPosition=t.data.player_playhead_time,i._lastPlayerWidth=t.data.player_width,i._lastPlayerHeight=t.data.player_height,i._lastSourceWidth=t.data.video_source_width,i._lastSourceHeight=t.data.video_source_height})})},eW=function e(t){var i=this;J(this,e),ei(this,"isSeeking",void 0),this.isSeeking=!1;var a=-1,r=function(){var e=F.now(),r=(t.data.viewer_time||e)-(a||e);eu(t.data,"view_seek_duration",r),t.data.view_max_seek_time=Math.max(t.data.view_max_seek_time||0,r),i.isSeeking=!1,a=-1};t.on("seeking",function(e,n){if(Object.assign(t.data,n),i.isSeeking&&n.viewer_time-a<=2e3){a=n.viewer_time;return}i.isSeeking&&r(),i.isSeeking=!0,a=n.viewer_time,eu(t.data,"view_seek_count",1),t.send("seeking")}),t.on("seeked",function(){r()}),t.on("viewend",function(){i.isSeeking&&(r(),t.send("seeked")),i.isSeeking=!1,a=-1})},eV=function(e,t){e.push(t),e.sort(function(e,t){return e.viewer_time-t.viewer_time})},eF=["adbreakstart","adrequest","adresponse","adplay","adplaying","adpause","adended","adbreakend","aderror","adclicked","adskipped"],e$=function(){function e(t){var i=this;J(this,e),ei(this,"_adHasPlayed",void 0),ei(this,"_adRequests",void 0),ei(this,"_adResponses",void 0),ei(this,"_currentAdRequestNumber",void 0),ei(this,"_currentAdResponseNumber",void 0),ei(this,"_prerollPlayTime",void 0),ei(this,"_wouldBeNewAdPlay",void 0),ei(this,"isAdBreak",void 0),ei(this,"pm",void 0),this.pm=t,t.on("viewinit",function(){i.isAdBreak=!1,i._currentAdRequestNumber=0,i._currentAdResponseNumber=0,i._adRequests=[],i._adResponses=[],i._adHasPlayed=!1,i._wouldBeNewAdPlay=!0,i._prerollPlayTime=void 0}),eF.forEach(function(e){return t.on(e,i._updateAdData.bind(i))});var a=function(){i.isAdBreak=!1};t.on("adbreakstart",function(){i.isAdBreak=!0}),t.on("play",a),t.on("playing",a),t.on("viewend",a),t.on("adrequest",function(e,a){a=Object.assign({ad_request_id:"generatedAdRequestId"+i._currentAdRequestNumber++},a),eV(i._adRequests,a),eu(t.data,"view_ad_request_count"),i.inPrerollPosition()&&(t.data.view_preroll_requested=!0,i._adHasPlayed||eu(t.data,"view_preroll_request_count"))}),t.on("adresponse",function(e,a){a=Object.assign({ad_request_id:"generatedAdRequestId"+i._currentAdResponseNumber++},a),eV(i._adResponses,a);var r=i.findAdRequest(a.ad_request_id);r&&eu(t.data,"view_ad_request_time",Math.max(0,a.viewer_time-r.viewer_time))}),t.on("adplay",function(e,a){i._adHasPlayed=!0,i._wouldBeNewAdPlay&&(i._wouldBeNewAdPlay=!1,eu(t.data,"view_ad_played_count")),i.inPrerollPosition()&&!t.data.view_preroll_played&&(t.data.view_preroll_played=!0,i._adRequests.length>0&&(t.data.view_preroll_request_time=Math.max(0,a.viewer_time-i._adRequests[0].viewer_time)),t.data.view_start&&(t.data.view_startup_preroll_request_time=Math.max(0,a.viewer_time-t.data.view_start)),i._prerollPlayTime=a.viewer_time)}),t.on("adplaying",function(e,a){i.inPrerollPosition()&&void 0===t.data.view_preroll_load_time&&void 0!==i._prerollPlayTime&&(t.data.view_preroll_load_time=a.viewer_time-i._prerollPlayTime,t.data.view_startup_preroll_load_time=a.viewer_time-i._prerollPlayTime)}),t.on("adclicked",function(e,a){i._wouldBeNewAdPlay||eu(t.data,"view_ad_clicked_count")}),t.on("adskipped",function(e,a){i._wouldBeNewAdPlay||eu(t.data,"view_ad_skipped_count")}),t.on("adended",function(){i._wouldBeNewAdPlay=!0}),t.on("aderror",function(){i._wouldBeNewAdPlay=!0})}return et(e,[{key:"inPrerollPosition",value:function(){return void 0===this.pm.data.view_content_playback_time||this.pm.data.view_content_playback_time<=1e3}},{key:"findAdRequest",value:function(e){for(var t=0;t<this._adRequests.length;t++)if(this._adRequests[t].ad_request_id===e)return this._adRequests[t]}},{key:"_updateAdData",value:function(e,t){if(this.inPrerollPosition()){if(!this.pm.data.view_preroll_ad_tag_hostname&&t.ad_tag_url){var i=B(eo(t.ad_tag_url),2),a=i[0],r=i[1];this.pm.data.view_preroll_ad_tag_domain=r,this.pm.data.view_preroll_ad_tag_hostname=a}if(!this.pm.data.view_preroll_ad_asset_hostname&&t.ad_asset_url){var n=B(eo(t.ad_asset_url),2),s=n[0],o=n[1];this.pm.data.view_preroll_ad_asset_domain=o,this.pm.data.view_preroll_ad_asset_hostname=s}this.pm.data.ad_type="preroll"}this.pm.data.ad_asset_url=null==t?void 0:t.ad_asset_url,this.pm.data.ad_tag_url=null==t?void 0:t.ad_tag_url,this.pm.data.ad_creative_id=null==t?void 0:t.ad_creative_id,this.pm.data.ad_id=null==t?void 0:t.ad_id,this.pm.data.ad_universal_id=null==t?void 0:t.ad_universal_id,null!=t&&t.ad_type&&(this.pm.data.ad_type=null==t?void 0:t.ad_type)}}]),e}(),eK=function e(t){var i=this;J(this,e),ei(this,"lastWallClockTime",void 0);var a=function(){i.lastWallClockTime=F.now(),t.on("before*",r)},r=function(e){var a=F.now(),r=i.lastWallClockTime;i.lastWallClockTime=a,a-r>3e4&&(t.emit("devicesleep",{viewer_time:r}),Object.assign(t.data,{viewer_time:r}),t.send("devicesleep"),t.emit("devicewake",{viewer_time:a}),Object.assign(t.data,{viewer_time:a}),t.send("devicewake"))};t.one("playbackheartbeat",a),t.on("playbackheartbeatend",function(){t.off("before*",r),t.one("playbackheartbeat",a)})},eq=b(g()),eY=function(){var e=function(){for(var e=0,t={};e<arguments.length;e++){var i=arguments[e];for(var a in i)t[a]=i[a]}return t};return function t(i){function a(t,r,n){var s;if("undefined"!=typeof document){if(arguments.length>1){if("number"==typeof(n=e({path:"/"},a.defaults,n)).expires){var o=new Date;o.setMilliseconds(o.getMilliseconds()+864e5*n.expires),n.expires=o}try{s=JSON.stringify(r),/^[\{\[]/.test(s)&&(r=s)}catch(e){}return r=i.write?i.write(r,t):encodeURIComponent(String(r)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=(t=(t=encodeURIComponent(String(t))).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent)).replace(/[\(\)]/g,escape),document.cookie=t+"="+r+(n.expires?"; expires="+n.expires.toUTCString():"")+(n.path?"; path="+n.path:"")+(n.domain?"; domain="+n.domain:"")+(n.secure?"; secure":"")}t||(s={});for(var l=document.cookie?document.cookie.split("; "):[],d=/(%[0-9A-Z]{2})+/g,u=0;u<l.length;u++){var c=l[u].split("="),h=c.slice(1).join("=");'"'===h.charAt(0)&&(h=h.slice(1,-1));try{var m=c[0].replace(d,decodeURIComponent);if(h=i.read?i.read(h,m):i(h,m)||h.replace(d,decodeURIComponent),this.json)try{h=JSON.parse(h)}catch(e){}if(t===m){s=h;break}t||(s[m]=h)}catch(e){}}return s}}return a.set=a,a.get=function(e){return a.call(a,e)},a.getJSON=function(){return a.apply({json:!0},[].slice.call(arguments))},a.defaults={},a.remove=function(t,i){a(t,"",e(i,{expires:-1}))},a.withConverter=t,a}(function(){})}(),eG="muxData",ej=function(){var e;try{e=(eY.get(eG)||"").split("&").reduce(function(e,t){var i=B(t.split("="),2),a=i[0],r=i[1],n=+r;return e[a]=r&&n==r?n:r,e},{})}catch(t){e={}}return e},eQ=function(e){try{eY.set(eG,Object.entries(e).map(function(e){var t=B(e,2),i=t[0],a=t[1];return"".concat(i,"=").concat(a)}).join("&"),{expires:365})}catch(e){}},eZ=function(){var e=ej();return e.mux_viewer_id=e.mux_viewer_id||$(),e.msn=e.msn||Math.random(),eQ(e),{mux_viewer_id:e.mux_viewer_id,mux_sample_number:e.msn}},ez=function(){var e=ej(),t=F.now();return e.session_start&&(e.sst=e.session_start,delete e.session_start),e.session_id&&(e.sid=e.session_id,delete e.session_id),e.session_expires&&(e.sex=e.session_expires,delete e.session_expires),(!e.sex||e.sex<t)&&(e.sid=$(),e.sst=t),e.sex=t+15e5,eQ(e),{session_id:e.sid,session_start:e.sst,session_expires:e.sex}},eX=b(g()),eJ=function(){var e;switch(e0()){case"cellular":e="cellular";break;case"ethernet":e="wired";break;case"wifi":e="wifi";break;case void 0:break;default:e="other"}return e},e0=function(){var e=eX.default.navigator,t=e&&(e.connection||e.mozConnection||e.webkitConnection);return t&&t.type};eJ.getConnectionFromAPI=e0;var e1=e3({a:"env",b:"beacon",c:"custom",d:"ad",e:"event",f:"experiment",i:"internal",m:"mux",n:"response",p:"player",q:"request",r:"retry",s:"session",t:"timestamp",u:"viewer",v:"video",w:"page",x:"view",y:"sub"}),e2=e3({ad:"ad",af:"affiliate",ag:"aggregate",ap:"api",al:"application",ao:"audio",ar:"architecture",as:"asset",au:"autoplay",av:"average",bi:"bitrate",bn:"brand",br:"break",bw:"browser",by:"bytes",bz:"business",ca:"cached",cb:"cancel",cc:"codec",cd:"code",cg:"category",ch:"changed",ci:"client",ck:"clicked",cl:"canceled",cm:"cmcd",cn:"config",co:"count",ce:"counter",cp:"complete",cq:"creator",cr:"creative",cs:"captions",ct:"content",cu:"current",cv:"cumulative",cx:"connection",cz:"context",da:"data",dg:"downscaling",dm:"domain",dn:"cdn",do:"downscale",dr:"drm",dp:"dropped",du:"duration",dv:"device",dy:"dynamic",eb:"enabled",ec:"encoding",ed:"edge",en:"end",eg:"engine",em:"embed",er:"error",ep:"experiments",es:"errorcode",et:"errortext",ee:"event",ev:"events",ex:"expires",ez:"exception",fa:"failed",fi:"first",fm:"family",ft:"format",fp:"fps",fq:"frequency",fr:"frame",fs:"fullscreen",ha:"has",hb:"holdback",he:"headers",ho:"host",hn:"hostname",ht:"height",id:"id",ii:"init",in:"instance",ip:"ip",is:"is",ke:"key",la:"language",lb:"labeled",le:"level",li:"live",ld:"loaded",lo:"load",ls:"lists",lt:"latency",ma:"max",md:"media",me:"message",mf:"manifest",mi:"mime",ml:"midroll",mm:"min",mn:"manufacturer",mo:"model",mp:"mode",ms:"ms",mx:"mux",ne:"newest",nm:"name",no:"number",on:"on",or:"origin",os:"os",pa:"paused",pb:"playback",pd:"producer",pe:"percentage",pf:"played",pg:"program",ph:"playhead",pi:"plugin",pl:"preroll",pn:"playing",po:"poster",pp:"pip",pr:"preload",ps:"position",pt:"part",pv:"previous",py:"property",px:"pop",pz:"plan",ra:"rate",rd:"requested",re:"rebuffer",rf:"rendition",rg:"range",rm:"remote",ro:"ratio",rp:"response",rq:"request",rs:"requests",sa:"sample",sd:"skipped",se:"session",sh:"shift",sk:"seek",sm:"stream",so:"source",sq:"sequence",sr:"series",ss:"status",st:"start",su:"startup",sv:"server",sw:"software",sy:"severity",ta:"tag",tc:"tech",te:"text",tg:"target",th:"throughput",ti:"time",tl:"total",to:"to",tt:"title",ty:"type",ug:"upscaling",un:"universal",up:"upscale",ur:"url",us:"user",va:"variant",vd:"viewed",vi:"video",ve:"version",vw:"view",vr:"viewer",wd:"width",wa:"watch",wt:"waiting"});function e3(e){var t={};for(var i in e)e.hasOwnProperty(i)&&(t[e[i]]=i);return t}function e4(e){var t={},i={};return Object.keys(e).forEach(function(a){var r=!1;if(e.hasOwnProperty(a)&&void 0!==e[a]){var n=a.split("_"),s=n[0],o=e1[s];o||(Q.info("Data key word `"+n[0]+"` not expected in "+a),o=s+"_"),n.splice(1).forEach(function(e){"url"===e&&(r=!0),e2[e]?o+=e2[e]:Number.isInteger(Number(e))?o+=e:(Q.info("Data key word `"+e+"` not expected in "+a),o+="_"+e+"_")}),r?i[o]=e[a]:t[o]=e[a]}}),Object.assign(t,i)}var e5=b(g()),e9=b(N()),e8={maxBeaconSize:300,maxQueueLength:3600,baseTimeBetweenBeacons:1e4,maxPayloadKBSize:500},e6=["hb","requestcompleted","requestfailed","requestcanceled"],e7=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this._beaconUrl=e||"https://img.litix.io",this._eventQueue=[],this._postInFlight=!1,this._resendAfterPost=!1,this._failureCount=0,this._sendTimeout=!1,this._options=Object.assign({},e8,t)};e7.prototype.queueEvent=function(e,t){var i=Object.assign({},t);return(this._eventQueue.length<=this._options.maxQueueLength||"eventrateexceeded"===e)&&(this._eventQueue.push(i),this._sendTimeout||this._startBeaconSending(),this._eventQueue.length<=this._options.maxQueueLength)},e7.prototype.flushEvents=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(e&&1===this._eventQueue.length)return void this._eventQueue.pop();this._eventQueue.length&&this._sendBeaconQueue(),this._startBeaconSending()},e7.prototype.destroy=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.destroyed=!0,e?this._clearBeaconQueue():this.flushEvents(),e5.default.clearTimeout(this._sendTimeout)},e7.prototype._clearBeaconQueue=function(){var e=this._eventQueue.length>this._options.maxBeaconSize?this._eventQueue.length-this._options.maxBeaconSize:0,t=this._eventQueue.slice(e);e>0&&Object.assign(t[t.length-1],e4({mux_view_message:"event queue truncated"}));var i=this._createPayload(t);tt(this._beaconUrl,i,!0,function(){})},e7.prototype._sendBeaconQueue=function(){var e=this;if(this._postInFlight){this._resendAfterPost=!0;return}var t=this._eventQueue.slice(0,this._options.maxBeaconSize);this._eventQueue=this._eventQueue.slice(this._options.maxBeaconSize),this._postInFlight=!0;var i=this._createPayload(t),a=F.now();tt(this._beaconUrl,i,!1,function(i,r){r?(e._eventQueue=t.concat(e._eventQueue),e._failureCount+=1,Q.info("Error sending beacon: "+r)):e._failureCount=0,e._roundTripTime=F.now()-a,e._postInFlight=!1,e._resendAfterPost&&(e._resendAfterPost=!1,e._eventQueue.length>0&&e._sendBeaconQueue())})},e7.prototype._getNextBeaconTime=function(){if(!this._failureCount)return this._options.baseTimeBetweenBeacons;var e=Math.pow(2,this._failureCount-1);return(1+(e*=Math.random()))*this._options.baseTimeBetweenBeacons},e7.prototype._startBeaconSending=function(){var e=this;e5.default.clearTimeout(this._sendTimeout),this.destroyed||(this._sendTimeout=e5.default.setTimeout(function(){e._eventQueue.length&&e._sendBeaconQueue(),e._startBeaconSending()},this._getNextBeaconTime()))},e7.prototype._createPayload=function(e){var t=this,i={transmission_timestamp:Math.round(F.now())};this._roundTripTime&&(i.rtt_ms=Math.round(this._roundTripTime));var a,r,n,s=function(){n=(a=JSON.stringify({metadata:i,events:r||e})).length/1024},o=function(){return n<=t._options.maxPayloadKBSize};return s(),o()||(Q.info("Payload size is too big ("+n+" kb). Removing unnecessary events."),r=e.filter(function(e){return -1===e6.indexOf(e.e)}),s()),o()||(Q.info("Payload size still too big ("+n+" kb). Cropping fields.."),r.forEach(function(e){for(var t in e){var i=e[t];"string"==typeof i&&i.length>51200&&(e[t]=i.substring(0,51200))}}),s()),a};var te="function"==typeof e9.default.exitPictureInPicture?function(e){return e.length<=57344}:function(e){return!1},tt=function(e,t,i,a){if(i&&navigator&&navigator.sendBeacon&&navigator.sendBeacon(e,t))return void a();if(e5.default.fetch)return void e5.default.fetch(e,{method:"POST",body:t,headers:{"Content-Type":"text/plain"},keepalive:te(t)}).then(function(e){return a(null,e.ok?null:"Error")}).catch(function(e){return a(null,e)});if(e5.default.XMLHttpRequest){var r=new e5.default.XMLHttpRequest;r.onreadystatechange=function(){if(4===r.readyState)return a(null,200!==r.status?"error":void 0)},r.open("POST",e),r.setRequestHeader("Content-Type","text/plain"),r.send(t);return}a()},ti=["env_key","view_id","view_sequence_number","player_sequence_number","beacon_domain","player_playhead_time","viewer_time","mux_api_version","event","video_id","player_instance_id","player_error_code","player_error_message","player_error_context","player_error_severity","player_error_business_exception","view_playing_time_ms_cumulative","ad_playing_time_ms_cumulative"],ta=["adplay","adplaying","adpause","adfirstquartile","admidpoint","adthirdquartile","adended","adresponse","adrequest"],tr=["ad_id","ad_creative_id","ad_universal_id"],tn=["viewstart","error","ended","viewend"],ts=function(){function e(t,i){var a,r,n,s,o,l,d,u,c,h,m,v,E,b,g,f,_,y,T,A=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};J(this,e),ei(this,"mux",void 0),ei(this,"envKey",void 0),ei(this,"options",void 0),ei(this,"eventQueue",void 0),ei(this,"sampleRate",void 0),ei(this,"disableCookies",void 0),ei(this,"respectDoNotTrack",void 0),ei(this,"previousBeaconData",void 0),ei(this,"lastEventTime",void 0),ei(this,"rateLimited",void 0),ei(this,"pageLevelData",void 0),ei(this,"viewerData",void 0),this.mux=t,this.envKey=i,this.options=A,this.previousBeaconData=null,this.lastEventTime=0,this.rateLimited=!1,this.eventQueue=new e7((a=this.envKey,n=(r=this.options).beaconCollectionDomain,s=r.beaconDomain,n?"https://"+n:(a=a||"inferred").match(/^[a-z0-9]+$/)?"https://"+a+"."+(s||"litix.io"):"https://img.litix.io/a.gif")),this.sampleRate=null!=(_=this.options.sampleRate)?_:1,this.disableCookies=null!=(y=this.options.disableCookies)&&y,this.respectDoNotTrack=null!=(T=this.options.respectDoNotTrack)&&T,this.previousBeaconData=null,this.lastEventTime=0,this.rateLimited=!1,this.pageLevelData={mux_api_version:this.mux.API_VERSION,mux_embed:this.mux.NAME,mux_embed_version:this.mux.VERSION,viewer_application_name:null==(o=this.options.platform)?void 0:o.name,viewer_application_version:null==(l=this.options.platform)?void 0:l.version,viewer_application_engine:null==(d=this.options.platform)?void 0:d.layout,viewer_device_name:null==(u=this.options.platform)?void 0:u.product,viewer_device_category:"",viewer_device_manufacturer:null==(c=this.options.platform)?void 0:c.manufacturer,viewer_os_family:null==(m=this.options.platform)||null==(h=m.os)?void 0:h.family,viewer_os_architecture:null==(E=this.options.platform)||null==(v=E.os)?void 0:v.architecture,viewer_os_version:null==(g=this.options.platform)||null==(b=g.os)?void 0:b.version,viewer_connection_type:eJ(),page_url:null===eq.default||void 0===eq.default||null==(f=eq.default.location)?void 0:f.href},this.viewerData=this.disableCookies?{}:eZ()}return et(e,[{key:"send",value:function(e,t){if(!(!e||!(null!=t&&t.view_id))){if(this.respectDoNotTrack&&z())return Q.info("Not sending `"+e+"` because Do Not Track is enabled");if(!t||"object"!=typeof t)return Q.error("A data object was expected in send() but was not provided");var i=this.disableCookies?{}:ez(),a=eh(ec({},this.pageLevelData,t,i,this.viewerData),{event:e,env_key:this.envKey});a.user_id&&(a.viewer_user_id=a.user_id,delete a.user_id);var r,n=(null!=(r=a.mux_sample_number)?r:0)>=this.sampleRate,s=e4(this._deduplicateBeaconData(e,a));if(this.lastEventTime=this.mux.utils.now(),n)return Q.info("Not sending event due to sample rate restriction",e,a,s);if(this.envKey||Q.info("Missing environment key (envKey) - beacons will be dropped if the video source is not a valid mux video URL",e,a,s),!this.rateLimited)if(Q.info("Sending event",e,a,s),this.rateLimited=!this.eventQueue.queueEvent(e,s),this.mux.WINDOW_UNLOADING&&"viewend"===e)this.eventQueue.destroy(!0);else{if(this.mux.WINDOW_HIDDEN&&"hb"===e)this.eventQueue.flushEvents(!0);else if(tn.indexOf(e)>=0){if("error"===e&&"warning"===t.player_error_severity)return;this.eventQueue.flushEvents()}if(this.rateLimited)return a.event="eventrateexceeded",s=e4(a),this.eventQueue.queueEvent(a.event,s),Q.error("Beaconing disabled due to rate limit.")}}}},{key:"destroy",value:function(){this.eventQueue.destroy(!1)}},{key:"_deduplicateBeaconData",value:function(e,t){var i=this,a={},r=t.view_id;if("-1"===r||"viewstart"===e||"viewend"===e||!this.previousBeaconData||this.mux.utils.now()-this.lastEventTime>=6e5)a=ec({},t),r&&(this.previousBeaconData=a),r&&"viewend"===e&&(this.previousBeaconData=null);else{var n=0===e.indexOf("request");Object.entries(t).forEach(function(t){var r=B(t,2),s=r[0],o=r[1];i.previousBeaconData&&(o!==i.previousBeaconData[s]||ti.indexOf(s)>-1||i.objectHasChanged(n,s,o,i.previousBeaconData[s])||i.eventRequiresKey(e,s))&&(a[s]=o,i.previousBeaconData[s]=o)})}return a}},{key:"objectHasChanged",value:function(e,t,i,a){return!!e&&0===t.indexOf("request_")&&("request_response_headers"===t||"object"!=typeof i||"object"!=typeof a||Object.keys(i||{}).length!==Object.keys(a||{}).length)}},{key:"eventRequiresKey",value:function(e,t){return!!("renditionchange"===e&&0===t.indexOf("video_source_")||tr.includes(t)&&ta.includes(e))}}]),e}(),to=function e(t){J(this,e);var i=0,a=0,r=0,n=0,s=0,o=0,l=0;t.on("requestcompleted",function(e,o){var l,d,u=o.request_start,c=o.request_response_start,h=o.request_response_end,m=o.request_bytes_loaded;if(n++,c?(l=c-(null!=u?u:0),d=(null!=h?h:0)-c):d=(null!=h?h:0)-(null!=u?u:0),d>0&&m&&m>0){var v=m/d*8e3;s++,a+=m,r+=d,t.data.view_min_request_throughput=Math.min(t.data.view_min_request_throughput||1/0,v),t.data.view_average_request_throughput=a/r*8e3,t.data.view_request_count=n,l>0&&(i+=l,t.data.view_max_request_latency=Math.max(t.data.view_max_request_latency||0,l),t.data.view_average_request_latency=i/s)}}),t.on("requestfailed",function(e,i){n++,o++,t.data.view_request_count=n,t.data.view_request_failed_count=o}),t.on("requestcanceled",function(e,i){n++,l++,t.data.view_request_count=n,t.data.view_request_canceled_count=l})},tl=function e(t){var i=this;J(this,e),ei(this,"_lastEventTime",void 0),t.on("before*",function(e,a){var r=a.viewer_time,n=F.now(),s=i._lastEventTime;if(i._lastEventTime=n,s&&n-s>36e5){var o=Object.keys(t.data).reduce(function(e,i){return 0===i.indexOf("video_")?Object.assign(e,ei({},i,t.data[i])):e},{});t.mux.log.info("Received event after at least an hour inactivity, creating a new view");var l=t.playbackHeartbeat._playheadShouldBeProgressing;t._resetView(Object.assign({viewer_time:r},o)),t.playbackHeartbeat._playheadShouldBeProgressing=l,t.playbackHeartbeat._playheadShouldBeProgressing&&"play"!==e.type&&"adbreakstart"!==e.type&&(t.emit("play",{viewer_time:r}),"playing"!==e.type&&t.emit("playing",{viewer_time:r}))}})};function td(e,t){return(null==e?void 0:e.toLowerCase())===(null==t?void 0:t.toLowerCase())}var tu=function e(t){J(this,e);var i=function(e){var i,a,r,o=null!=(i=e)&&i.request_type&&("media"===i.request_type||"video"===i.request_type)&&null!=(a=i.request_response_headers)&&a["x-cdn"]?i.request_response_headers["x-cdn"]:null!=i&&i.video_cdn?i.video_cdn:null,l=null!=(r=e)&&r.request_start?r.request_start:null!=r&&r.viewer_time?r.viewer_time:Date.now();null!=o&&!td(o,n)&&s<=l&&(n=o,s=l,t.emit("cdnchange",{video_cdn:o}))},a=null,r=null,n=null,s=0;t.on("viewinit",function(){a=null,r=null,n=null,s=0}),t.on("beforecdnchange",function(e,t){var i=null==t?void 0:t.video_cdn;i&&(void 0===t.video_previous_cdn||null===t.video_previous_cdn)&&(td(i,r)?t.video_previous_cdn=null!=a?a:void 0:(t.video_previous_cdn=null!=r?r:void 0,a=r,r=i))}),t.on("requestcompleted",function(e,t){i(t)})},tc=function(e){try{return JSON.parse(e),!0}catch(e){return!1}},th=function e(t){var i=this;J(this,e),ei(this,"_emittingAutomaticEvent",!1),ei(this,"_hasInitialized",!1),ei(this,"_currentMode","standard"),t.on("viewstart",function(){i._hasInitialized||(i._hasInitialized=!0,i._emittingAutomaticEvent=!0,t.emit("playbackmodechange",{player_playback_mode:i._currentMode,player_playback_mode_data:"{}"}),i._emittingAutomaticEvent=!1)}),t.on("viewend",function(){i._hasInitialized=!1}),t.on("playbackmodechange",function(e,a){i._emittingAutomaticEvent||(a.player_playback_mode_data?tc(a.player_playback_mode_data)||(t.mux.log.warn("Invalid JSON string for player_playback_mode_data"),a.player_playback_mode_data="{}"):a.player_playback_mode_data="{}",t.data.player_playback_mode_data=a.player_playback_mode_data,t.data.player_playback_mode=a.player_playback_mode,i._currentMode=a.player_playback_mode)})},tm=function(){function e(t){J(this,e),ei(this,"pm",void 0),ei(this,"_currentRangeStart",void 0),ei(this,"_lastPlayheadTime",void 0),this.pm=t,this._currentRangeStart=null,this._lastPlayheadTime=null,t.on("playbackheartbeat",this._updatePlaybackRange.bind(this)),t.on("playbackheartbeatend",this._endPlaybackRange.bind(this))}return et(e,[{key:"_updateLastRangeEnd",value:function(){var e=this.pm.data.video_playback_ranges;if(e&&e.length>0){var t=this.pm.data.player_playhead_time||0;e[e.length-1][1]=t}}},{key:"_updatePlaybackRange",value:function(){var e,t=this.pm.data.player_playhead_time||0;if(!(!this.pm.disableAdPlaybackRangeFiltering&&null!=(e=this.pm.adTracker)&&e.isAdBreak&&null!==this._lastPlayheadTime&&t<this._lastPlayheadTime)){if(null!==this._lastPlayheadTime&&null!==this._currentRangeStart&&Math.abs(t-this._lastPlayheadTime)>1e3){var i=this.pm.data.video_playback_ranges;i&&i.length>0&&(i[i.length-1][1]=this._lastPlayheadTime),this._currentRangeStart=null}if(null===this._currentRangeStart){var a=this.pm.data.video_playback_ranges||[];a.length>0&&a[a.length-1][1]===t?this._currentRangeStart=a[a.length-1][0]:(this._currentRangeStart=t,a.push([t,t])),this.pm.data.video_playback_ranges=a}else this._updateLastRangeEnd();this._lastPlayheadTime=t}}},{key:"_endPlaybackRange",value:function(){null!==this._currentRangeStart&&(this._updateLastRangeEnd(),this._currentRangeStart=null,this._lastPlayheadTime=null)}}]),e}(),tp=["viewstart","ended","loadstart","pause","play","playing","ratechange","waiting","adplay","adpause","adended","aderror","adplaying","adrequest","adresponse","adbreakstart","adbreakend","adfirstquartile","admidpoint","adthirdquartile","rebufferstart","rebufferend","seeked","error","hb","requestcompleted","requestfailed","requestcanceled","renditionchange","cdnchange","playbackmodechange"],tv=new Set(["requestcompleted","requestfailed","requestcanceled"]),tE=function(e){if("function"!=typeof e&&null!==e)throw TypeError("Super expression must either be null or a function");a.prototype=Object.create(e&&e.prototype,{constructor:{value:a,writable:!0,configurable:!0}}),e&&en(a,e);var t,i=(t=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}(),function(){var e,i=ea(a);return e=t?Reflect.construct(i,arguments,ea(this).constructor):i.apply(this,arguments),e&&("object"===y(e)||"function"==typeof e)?e:X(this)});function a(e,t,r){J(this,a),ei(X(n=i.call(this)),"pageLoadEndTime",void 0),ei(X(n),"pageLoadInitTime",void 0),ei(X(n),"_destroyed",void 0),ei(X(n),"_heartBeatTimeout",void 0),ei(X(n),"adTracker",void 0),ei(X(n),"dashjs",void 0),ei(X(n),"data",void 0),ei(X(n),"disablePlayheadRebufferTracking",void 0),ei(X(n),"disableRebufferTracking",void 0),ei(X(n),"disableAdPlaybackRangeFiltering",void 0),ei(X(n),"errorTracker",void 0),ei(X(n),"errorTranslator",void 0),ei(X(n),"emitTranslator",void 0),ei(X(n),"getAdData",void 0),ei(X(n),"getPlayheadTime",void 0),ei(X(n),"getStateData",void 0),ei(X(n),"stateDataTranslator",void 0),ei(X(n),"hlsjs",void 0),ei(X(n),"id",void 0),ei(X(n),"longResumeTracker",void 0),ei(X(n),"minimumRebufferDuration",void 0),ei(X(n),"mux",void 0),ei(X(n),"playbackEventDispatcher",void 0),ei(X(n),"playbackHeartbeat",void 0),ei(X(n),"playbackHeartbeatTime",void 0),ei(X(n),"playheadTime",void 0),ei(X(n),"seekingTracker",void 0),ei(X(n),"sustainedRebufferThreshold",void 0),ei(X(n),"watchTimeTracker",void 0),ei(X(n),"currentFragmentPDT",void 0),ei(X(n),"currentFragmentStart",void 0),n.pageLoadInitTime=ed.navigationStart(),n.pageLoadEndTime=ed.domContentLoadedEventEnd(),n.mux=e,n.id=t,null!=r&&r.beaconDomain&&n.mux.log.warn("The `beaconDomain` setting has been deprecated in favor of `beaconCollectionDomain`. Please change your integration to use `beaconCollectionDomain` instead of `beaconDomain`."),(r=Object.assign({debug:!1,minimumRebufferDuration:250,sustainedRebufferThreshold:1e3,playbackHeartbeatTime:25,beaconDomain:"litix.io",sampleRate:1,disableCookies:!1,respectDoNotTrack:!1,disableRebufferTracking:!1,disablePlayheadRebufferTracking:!1,disableAdPlaybackRangeFiltering:!1,errorTranslator:function(e){return e},emitTranslator:function(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];return t},stateDataTranslator:function(e){return e}},r)).data=r.data||{},r.data.property_key&&(r.data.env_key=r.data.property_key,delete r.data.property_key),Q.level=r.debug?j.DEBUG:j.WARN,n.getPlayheadTime=r.getPlayheadTime,n.getStateData=r.getStateData||function(){return{}},n.getAdData=r.getAdData||function(){},n.minimumRebufferDuration=r.minimumRebufferDuration,n.sustainedRebufferThreshold=r.sustainedRebufferThreshold,n.playbackHeartbeatTime=r.playbackHeartbeatTime,n.disableRebufferTracking=r.disableRebufferTracking,n.disableRebufferTracking&&n.mux.log.warn("Disabling rebuffer tracking. This should only be used in specific circumstances as a last resort when your player is known to unreliably track rebuffering."),n.disablePlayheadRebufferTracking=r.disablePlayheadRebufferTracking,n.disableAdPlaybackRangeFiltering=r.disableAdPlaybackRangeFiltering,n.errorTranslator=r.errorTranslator,n.emitTranslator=r.emitTranslator,n.stateDataTranslator=r.stateDataTranslator,n.playbackEventDispatcher=new ts(e,r.data.env_key,r),n.data={player_instance_id:$(),mux_sample_rate:r.sampleRate,beacon_domain:r.beaconCollectionDomain||r.beaconDomain},n.data.view_sequence_number=1,n.data.player_sequence_number=1;var n,s=(function(){void 0===this.data.view_start&&(this.data.view_start=this.mux.utils.now(),this.emit("viewstart"),this.emit("renditionchange"))}).bind(X(n));if(n.on("viewinit",function(e,t){this._resetVideoData(),this._resetViewData(),this._resetErrorData(),this._updateStateData(),Object.assign(this.data,t),this._initializeViewData(),this.one("play",s),this.one("adbreakstart",s)}),n.on("videochange",function(e,t){this._resetView(t)}),n.on("programchange",function(e,t){this.data.player_is_paused&&this.mux.log.warn("The `programchange` event is intended to be used when the content changes mid playback without the video source changing, however the video is not currently playing. If the video source is changing please use the videochange event otherwise you will lose startup time information."),this._resetView(Object.assign(t,{view_program_changed:!0})),s(),this.emit("play"),this.emit("playing")}),n.on("fragmentchange",function(e,t){this.currentFragmentPDT=t.currentFragmentPDT,this.currentFragmentStart=t.currentFragmentStart}),n.on("destroy",n.destroy),"undefined"!=typeof window&&"function"==typeof window.addEventListener&&"function"==typeof window.removeEventListener){var o=function(){var e=void 0!==n.data.view_start;n.mux.WINDOW_HIDDEN="hidden"===document.visibilityState,e&&n.mux.WINDOW_HIDDEN&&(n.data.player_is_paused||n.emit("hb"))};window.addEventListener("visibilitychange",o,!1);var l=function(e){e.persisted||n.destroy()};window.addEventListener("pagehide",l,!1),n.on("destroy",function(){window.removeEventListener("visibilitychange",o),window.removeEventListener("pagehide",l)})}return n.on("playerready",function(e,t){Object.assign(this.data,t)}),tp.forEach(function(e){n.on(e,function(t,i){0!==e.indexOf("ad")&&this._updateStateData(),Object.assign(this.data,i),this._sanitizeData()}),n.on("after"+e,function(){("error"!==e||this.errorTracker.viewErrored)&&this.send(e)})}),n.on("viewend",function(e,t){Object.assign(n.data,t)}),n.one("playerready",function(e){var t=this.mux.utils.now();this.data.player_init_time&&(this.data.player_startup_time=t-this.data.player_init_time),this.pageLoadInitTime=this.data.page_load_init_time||this.pageLoadInitTime,this.pageLoadEndTime=this.data.page_load_end_time||this.pageLoadEndTime,!this.mux.PLAYER_TRACKED&&this.pageLoadInitTime&&(this.mux.PLAYER_TRACKED=!0,(this.data.player_init_time||this.pageLoadEndTime)&&(this.data.page_load_time=Math.min(this.data.player_init_time||1/0,this.pageLoadEndTime||1/0)-this.pageLoadInitTime)),this.send("playerready"),delete this.data.player_startup_time,delete this.data.page_load_time}),n.longResumeTracker=new tl(X(n)),n.errorTracker=new eM(X(n)),new eK(X(n)),n.seekingTracker=new eW(X(n)),n.playheadTime=new eN(X(n)),n.playbackHeartbeat=new eC(X(n)),new eH(X(n)),n.watchTimeTracker=new eO(X(n)),new ex(X(n)),new tm(X(n)),n.adTracker=new e$(X(n)),new eU(X(n)),new eP(X(n)),new eB(X(n)),new to(X(n)),new tu(X(n)),new th(X(n)),r.hlsjs&&n.addHLSJS(r),r.dashjs&&n.addDashJS(r),n.emit("viewinit",r.data),n}return et(a,[{key:"emit",value:function(e,t){var i,r=Object.assign({viewer_time:this.mux.utils.now()},t),n=[e,r];if(this.emitTranslator)try{n=this.emitTranslator(e,r)}catch(e){this.mux.log.warn("Exception in emit translator callback.",e)}null!=n&&n.length&&(i=er(ea(a.prototype),"emit",this)).call.apply(i,[this].concat(G(n)))}},{key:"destroy",value:function(){this._destroyed||(this._destroyed=!0,void 0!==this.data.view_start&&(this.emit("viewend"),this.send("viewend")),this.playbackEventDispatcher.destroy(),this.removeHLSJS(),this.removeDashJS(),window.clearTimeout(this._heartBeatTimeout))}},{key:"send",value:function(e){if(this.data.view_id){var t=Object.assign({},this.data);if(void 0===t.video_source_is_live&&(t.player_source_duration===1/0||t.video_source_duration===1/0?t.video_source_is_live=!0:(t.player_source_duration>0||t.video_source_duration>0)&&(t.video_source_is_live=!1)),t.video_source_is_live||["player_program_time","player_manifest_newest_program_time","player_live_edge_program_time","player_program_time","video_holdback","video_part_holdback","video_target_duration","video_part_target_duration"].forEach(function(e){t[e]=void 0}),t.video_source_url=t.video_source_url||t.player_source_url,t.video_source_url){var i=B(eo(t.video_source_url),2),a=i[0];t.video_source_domain=i[1],t.video_source_hostname=a}delete t.ad_request_id,t.video_playback_ranges&&(t.video_playback_range=JSON.stringify(t.video_playback_ranges.filter(function(e){return e[0]!==e[1]}).map(function(e){return"".concat(e[0],":").concat(e[1])})),delete t.video_playback_ranges),this.playbackEventDispatcher.send(e,t),this.data.view_sequence_number++,this.data.player_sequence_number++,tv.has(e)||this._restartHeartBeat(),"viewend"===e&&delete this.data.view_id}}},{key:"_resetView",value:function(e){this.emit("viewend"),this.send("viewend"),this.emit("viewinit",e)}},{key:"_updateStateData",value:function(){var e,t=this.getStateData();if("function"==typeof this.stateDataTranslator)try{t=this.stateDataTranslator(t)}catch(e){this.mux.log.warn("Exception in stateDataTranslator translator callback.",e)}null!=(e=this.data)&&e.video_cdn&&null!=t&&t.video_cdn&&(t.video_cdn,t=function(e,t){if(null==e)return{};var i,a,r=function(e,t){if(null==e)return{};var i,a,r={},n=Object.keys(e);for(a=0;a<n.length;a++)i=n[a],t.indexOf(i)>=0||(r[i]=e[i]);return r}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(a=0;a<n.length;a++)i=n[a],!(t.indexOf(i)>=0)&&Object.prototype.propertyIsEnumerable.call(e,i)&&(r[i]=e[i])}return r}(t,["video_cdn"])),Object.assign(this.data,t),this.playheadTime._updatePlayheadTime(),this._sanitizeData()}},{key:"_sanitizeData",value:function(){var e=this;["player_width","player_height","video_source_width","video_source_height","player_playhead_time","video_source_bitrate"].forEach(function(t){var i=parseInt(e.data[t],10);e.data[t]=isNaN(i)?void 0:i}),["player_source_url","video_source_url"].forEach(function(t){if(e.data[t]){var i=e.data[t].toLowerCase();(0===i.indexOf("data:")||0===i.indexOf("blob:"))&&(e.data[t]="MSE style URL")}})}},{key:"_resetVideoData",value:function(){var e=this;Object.keys(this.data).forEach(function(t){0===t.indexOf("video_")&&delete e.data[t]})}},{key:"_resetViewData",value:function(){var e=this;Object.keys(this.data).forEach(function(t){0===t.indexOf("view_")&&delete e.data[t]}),this.data.view_sequence_number=1}},{key:"_resetErrorData",value:function(){delete this.data.player_error_code,delete this.data.player_error_message,delete this.data.player_error_context,delete this.data.player_error_severity,delete this.data.player_error_business_exception}},{key:"_initializeViewData",value:function(){var e=this,t=this.data.view_id=$(),i=function(){t===e.data.view_id&&eu(e.data,"player_view_count",1)};this.data.player_is_paused?this.one("play",i):i()}},{key:"_restartHeartBeat",value:function(){var e=this;window.clearTimeout(this._heartBeatTimeout),this._heartBeatTimeout=window.setTimeout(function(){e.data.player_is_paused||e.emit("hb")},1e4)}},{key:"addHLSJS",value:function(e){return e.hlsjs?this.hlsjs?void this.mux.log.warn("An instance of HLS.js is already being monitored for this player."):void(this.hlsjs=e.hlsjs,e_(this.mux,this.id,e.hlsjs,{},e.Hls||window.Hls)):void this.mux.log.warn("You must pass a valid hlsjs instance in order to track it.")}},{key:"removeHLSJS",value:function(){this.hlsjs&&(ey(this.hlsjs),this.hlsjs=void 0)}},{key:"addDashJS",value:function(e){return e.dashjs?this.dashjs?void this.mux.log.warn("An instance of Dash.js is already being monitored for this player."):void(this.dashjs=e.dashjs,eS(this.mux,this.id,e.dashjs)):void this.mux.log.warn("You must pass a valid dashjs instance in order to track it.")}},{key:"removeDashJS",value:function(){this.dashjs&&(eI(this.dashjs),this.dashjs=void 0)}}]),a}(eD),tb=b(N());function tg(){return tb.default&&!!(tb.default.fullscreenElement||tb.default.webkitFullscreenElement||tb.default.mozFullScreenElement||tb.default.msFullscreenElement)}var tf,t_=["loadstart","pause","play","playing","seeking","seeked","timeupdate","ratechange","stalled","waiting","error","ended"],ty={1:"MEDIA_ERR_ABORTED",2:"MEDIA_ERR_NETWORK",3:"MEDIA_ERR_DECODE",4:"MEDIA_ERR_SRC_NOT_SUPPORTED"},tT=b(g());tT.default&&tT.default.WeakMap&&(tf=new WeakMap);var tA={TARGET_DURATION:"#EXT-X-TARGETDURATION",PART_INF:"#EXT-X-PART-INF",SERVER_CONTROL:"#EXT-X-SERVER-CONTROL",INF:"#EXTINF",PROGRAM_DATE_TIME:"#EXT-X-PROGRAM-DATE-TIME",VERSION:"#EXT-X-VERSION",SESSION_DATA:"#EXT-X-SESSION-DATA"},tk=function(e){return this.buffer="",this.manifest={segments:[],serverControl:{},sessionData:{}},this.currentUri={},this.process(e),this.manifest};tk.prototype.process=function(e){var t;for(this.buffer+=e,t=this.buffer.indexOf("\n");t>-1;t=this.buffer.indexOf("\n"))this.processLine(this.buffer.substring(0,t)),this.buffer=this.buffer.substring(t+1)},tk.prototype.processLine=function(e){var t=e.indexOf(":"),i=tC(e,t),a=i[0],r=2===i.length?tI(i[1]):void 0;if("#"!==a[0])this.currentUri.uri=a,this.manifest.segments.push(this.currentUri),!this.manifest.targetDuration||"duration"in this.currentUri||(this.currentUri.duration=this.manifest.targetDuration),this.currentUri={};else switch(a){case tA.TARGET_DURATION:if(!isFinite(r)||r<0)return;this.manifest.targetDuration=r,this.setHoldBack();break;case tA.PART_INF:tw(this.manifest,i),this.manifest.partInf.partTarget&&(this.manifest.partTargetDuration=this.manifest.partInf.partTarget),this.setHoldBack();break;case tA.SERVER_CONTROL:tw(this.manifest,i),this.setHoldBack();break;case tA.INF:0===r?this.currentUri.duration=.01:r>0&&(this.currentUri.duration=r);break;case tA.PROGRAM_DATE_TIME:var n=new Date(r);this.manifest.dateTimeString||(this.manifest.dateTimeString=r,this.manifest.dateTimeObject=n),this.currentUri.dateTimeString=r,this.currentUri.dateTimeObject=n;break;case tA.VERSION:tw(this.manifest,i);break;case tA.SESSION_DATA:var s=eb(tM(i[1]));Object.assign(this.manifest.sessionData,s)}},tk.prototype.setHoldBack=function(){var e=this.manifest,t=e.serverControl,i=e.targetDuration,a=e.partTargetDuration;if(t){var r="holdBack",n="partHoldBack",s=i&&3*i,o=a&&2*a;i&&!t.hasOwnProperty(r)&&(t[r]=s),s&&t[r]<s&&(t[r]=s),a&&!t.hasOwnProperty(n)&&(t[n]=3*a),a&&t[n]<o&&(t[n]=o)}};var tw=function(e,t){var i,a=tS(t[0].replace("#EXT-X-",""));tL(t[1])?(i={},i=Object.assign(tD(t[1]),i)):i=tI(t[1]),e[a]=i},tS=function(e){return e.toLowerCase().replace(/-(\w)/g,function(e){return e[1].toUpperCase()})},tI=function(e){if("yes"===e.toLowerCase()||"no"===e.toLowerCase())return"yes"===e.toLowerCase();var t=-1!==e.indexOf(":")?e:parseFloat(e);return isNaN(t)?e:t},tR=function(e){var t={},i=e.split("=");return i.length>1&&(t[tS(i[0])]=tI(i[1])),t},tD=function(e){for(var t=e.split(","),i={},a=0;t.length>a;a++)i=Object.assign(tR(t[a]),i);return i},tL=function(e){return e.indexOf("=")>-1},tC=function(e,t){return -1===t?[e]:[e.substring(0,t),e.substring(t+1)]},tM=function(e){var t={};if(e){var i=e.search(",");return[e.slice(0,i),e.slice(i+1)].forEach(function(e,i){for(var a=e.replace(/['"]+/g,"").split("="),r=0;r<a.length;r++)"DATA-ID"===a[r]&&(t["DATA-ID"]=a[1-r]),"VALUE"===a[r]&&(t.VALUE=a[1-r])}),{data:t}}},tO={safeCall:function(e,t,i,a){var r=a;if(e&&"function"==typeof e[t])try{r=e[t].apply(e,i)}catch(e){Q.info("safeCall error",e)}return r},safeIncrement:eu,getComputedStyle:function(e,t){var i;return e&&t&&tT.default&&"function"==typeof tT.default.getComputedStyle?(tf&&tf.has(e)&&(i=tf.get(e)),i||(i=tT.default.getComputedStyle(e,null),tf&&tf.set(e,i)),i.getPropertyValue(t)):""},secondsToMs:function(e){return Math.floor(1e3*e)},assign:Object.assign,headersStringToObject:ev,cdnHeadersToRequestId:eE,extractHostnameAndDomain:eo,extractHostname:es,manifestParser:tk,generateShortID:K,generateUUID:$,now:F.now,findMediaElement:Y},tx={},tN=function(e){var t=arguments;"string"==typeof e?tN.hasOwnProperty(e)?H.default.setTimeout(function(){t=Array.prototype.splice.call(t,1),tN[e].apply(null,t)},0):Q.warn("`"+e+"` is an unknown task"):"function"==typeof e?H.default.setTimeout(function(){e(tN)},0):Q.warn("`"+e+"` is invalid.")},tP={loaded:F.now(),NAME:"mux-embed",VERSION:"5.16.0",API_VERSION:"2.1",PLAYER_TRACKED:!1,monitor:function(e,t){return function(e,t,i){var a=B(Y(t),3),r=a[0],n=a[1],s=a[2],o=e.log,l=e.utils.getComputedStyle,d=e.utils.secondsToMs;if(!r)return o.error("No element was found with the `"+n+"` query selector.");if("video"!==s&&"audio"!==s)return o.error("The element of `"+n+"` was not a media element.");r.mux&&(r.mux.destroy(),delete r.mux,o.warn("Already monitoring this video element, replacing existing event listeners")),(i=Object.assign({automaticErrorTracking:!0},i,{getPlayheadTime:function(){return d(r.currentTime)},getStateData:function(){var e,t,i=(null==(e=this.getPlayheadTime)?void 0:e.call(this))||d(r.currentTime),a=this.hlsjs&&this.hlsjs.url,n=this.dashjs&&"function"==typeof this.dashjs.getSource&&this.dashjs.getSource(),s={player_is_paused:r.paused,player_width:parseInt(l(r,"width")),player_height:parseInt(l(r,"height")),player_autoplay_on:r.autoplay,player_preload_on:r.preload,player_language_code:r.lang,player_is_fullscreen:tg(),video_poster_url:r.poster,video_source_url:a||n||r.currentSrc,video_source_duration:d(r.duration),video_source_height:r.videoHeight,video_source_width:r.videoWidth,view_dropped_frame_count:null==r||null==(t=r.getVideoPlaybackQuality)?void 0:t.call(r).droppedVideoFrames};if(r.getStartDate&&i>0){var o=r.getStartDate();if(o&&"function"==typeof o.getTime&&o.getTime()){var u=o.getTime();s.player_program_time=u+i,r.seekable.length>0&&(s.player_live_edge_program_time=u+r.seekable.end(r.seekable.length-1))}}return s}})).data=Object.assign({player_software:"HTML5 Video Element",player_mux_plugin_name:"VideoElementMonitor",player_mux_plugin_version:e.VERSION},i.data),r.mux=r.mux||{},r.mux.deleted=!1,r.mux.emit=function(t,i){e.emit(n,t,i)},r.mux.updateData=function(e){r.mux.emit("hb",e)};var u=function(){o.error("The monitor for this video element has already been destroyed.")};r.mux.destroy=function(){Object.keys(r.mux.listeners).forEach(function(e){r.removeEventListener(e,r.mux.listeners[e],!1)}),delete r.mux.listeners,r.mux.fullscreenChangeListener&&(document.removeEventListener("fullscreenchange",r.mux.fullscreenChangeListener,!1),delete r.mux.fullscreenChangeListener),r.mux.destroy=u,r.mux.swapElement=u,r.mux.emit=u,r.mux.addHLSJS=u,r.mux.addDashJS=u,r.mux.removeHLSJS=u,r.mux.removeDashJS=u,r.mux.updateData=u,r.mux.setEmitTranslator=u,r.mux.setStateDataTranslator=u,r.mux.setGetPlayheadTime=u,r.mux.deleted=!0,e.emit(n,"destroy")},r.mux.swapElement=function(t){var i=B(Y(t),3),a=i[0],n=i[1],s=i[2];return a?"video"!==s&&"audio"!==s?e.log.error("The element of `"+n+"` was not a media element."):void(a.muxId=r.muxId,delete r.muxId,a.mux=a.mux||{},a.mux.listeners=Object.assign({},r.mux.listeners),delete r.mux.listeners,Object.keys(a.mux.listeners).forEach(function(e){r.removeEventListener(e,a.mux.listeners[e],!1),a.addEventListener(e,a.mux.listeners[e],!1)}),a.mux.fullscreenChangeListener=r.mux.fullscreenChangeListener,delete r.mux.fullscreenChangeListener,a.mux.swapElement=r.mux.swapElement,a.mux.destroy=r.mux.destroy,delete r.mux,r=a):e.log.error("No element was found with the `"+n+"` query selector.")},r.mux.addHLSJS=function(t){e.addHLSJS(n,t)},r.mux.addDashJS=function(t){e.addDashJS(n,t)},r.mux.removeHLSJS=function(){e.removeHLSJS(n)},r.mux.removeDashJS=function(){e.removeDashJS(n)},r.mux.setEmitTranslator=function(t){e.setEmitTranslator(n,t)},r.mux.setStateDataTranslator=function(t){e.setStateDataTranslator(n,t)},r.mux.setGetPlayheadTime=function(t){t||(t=i.getPlayheadTime),e.setGetPlayheadTime(n,t)},e.init(n,i),e.emit(n,"playerready"),r.paused||(e.emit(n,"play"),r.readyState>2&&e.emit(n,"playing")),r.mux.listeners={},t_.forEach(function(t){("error"!==t||i.automaticErrorTracking)&&(r.mux.listeners[t]=function(){var i={};if("error"===t){if(!r.error||1===r.error.code)return;i.player_error_code=r.error.code,i.player_error_message=ty[r.error.code]||r.error.message}e.emit(n,t,i)},r.addEventListener(t,r.mux.listeners[t],!1))}),r.mux.listeners.enterpictureinpicture=function(){e.emit(n,"playbackmodechange",{player_playback_mode:"pip",player_playback_mode_data:"{}"})},r.mux.listeners.leavepictureinpicture=function(){var t=tg()?"fullscreen":"standard";e.emit(n,"playbackmodechange",{player_playback_mode:t,player_playback_mode_data:"{}"})},r.addEventListener("enterpictureinpicture",r.mux.listeners.enterpictureinpicture,!1),r.addEventListener("leavepictureinpicture",r.mux.listeners.leavepictureinpicture,!1),r.mux.fullscreenChangeListener=function(){var t=tg(),i=document.fullscreenElement;if(t&&(i===r||null!=i&&i.contains(r)))e.emit(n,"playbackmodechange",{player_playback_mode:"fullscreen",player_playback_mode_data:"{}"});else if(!t){var a=document.pictureInPictureElement===r;e.emit(n,"playbackmodechange",{player_playback_mode:a?"pip":"standard",player_playback_mode_data:"{}"})}},document.addEventListener("fullscreenchange",r.mux.fullscreenChangeListener,!1)}(tN,e,t)},destroyMonitor:function(e){var t=B(Y(e),1)[0];t&&t.mux&&"function"==typeof t.mux.destroy?t.mux.destroy():Q.error("A video element monitor for `"+e+"` has not been initialized via `mux.monitor`.")},addHLSJS:function(e,t){var i=q(e);tx[i]?tx[i].addHLSJS(t):Q.error("A monitor for `"+i+"` has not been initialized.")},addDashJS:function(e,t){var i=q(e);tx[i]?tx[i].addDashJS(t):Q.error("A monitor for `"+i+"` has not been initialized.")},removeHLSJS:function(e){var t=q(e);tx[t]?tx[t].removeHLSJS():Q.error("A monitor for `"+t+"` has not been initialized.")},removeDashJS:function(e){var t=q(e);tx[t]?tx[t].removeDashJS():Q.error("A monitor for `"+t+"` has not been initialized.")},init:function(e,t){z()&&t&&t.respectDoNotTrack&&Q.info("The browser's Do Not Track flag is enabled - Mux beaconing is disabled.");var i=q(e);tx[i]=new tE(tN,i,t)},emit:function(e,t,i){var a=q(e);tx[a]?(tx[a].emit(t,i),"destroy"===t&&delete tx[a]):Q.error("A monitor for `"+a+"` has not been initialized.")},updateData:function(e,t){var i=q(e);tx[i]?tx[i].emit("hb",t):Q.error("A monitor for `"+i+"` has not been initialized.")},setEmitTranslator:function(e,t){var i=q(e);tx[i]?tx[i].emitTranslator=t:Q.error("A monitor for `"+i+"` has not been initialized.")},setStateDataTranslator:function(e,t){var i=q(e);tx[i]?tx[i].stateDataTranslator=t:Q.error("A monitor for `"+i+"` has not been initialized.")},setGetPlayheadTime:function(e,t){var i=q(e);tx[i]?tx[i].getPlayheadTime=t:Q.error("A monitor for `"+i+"` has not been initialized.")},checkDoNotTrack:z,log:Q,utils:tO,events:{PLAYER_READY:"playerready",VIEW_INIT:"viewinit",VIDEO_CHANGE:"videochange",PLAY:"play",PAUSE:"pause",PLAYING:"playing",TIME_UPDATE:"timeupdate",SEEKING:"seeking",SEEKED:"seeked",REBUFFER_START:"rebufferstart",REBUFFER_END:"rebufferend",ERROR:"error",ENDED:"ended",RENDITION_CHANGE:"renditionchange",ORIENTATION_CHANGE:"orientationchange",PLAYBACK_MODE_CHANGE:"playbackmodechange",AD_REQUEST:"adrequest",AD_RESPONSE:"adresponse",AD_BREAK_START:"adbreakstart",AD_PLAY:"adplay",AD_PLAYING:"adplaying",AD_PAUSE:"adpause",AD_FIRST_QUARTILE:"adfirstquartile",AD_MID_POINT:"admidpoint",AD_THIRD_QUARTILE:"adthirdquartile",AD_ENDED:"adended",AD_BREAK_END:"adbreakend",AD_ERROR:"aderror",REQUEST_COMPLETED:"requestcompleted",REQUEST_FAILED:"requestfailed",REQUEST_CANCELLED:"requestcanceled",HEARTBEAT:"hb",DESTROY:"destroy"},WINDOW_HIDDEN:!1,WINDOW_UNLOADING:!1};Object.assign(tN,tP),void 0!==H.default&&"function"==typeof H.default.addEventListener&&H.default.addEventListener("pagehide",function(e){e.persisted||(tN.WINDOW_UNLOADING=!0)},!1);var tU=i(3586).Ay,tB={VIDEO:"video",DRM:"drm"},tH={NETWORK_OFFLINE:2000002,NETWORK_UNKNOWN_ERROR:2e6,NETWORK_INVALID_URL:24e5,NETWORK_NOT_FOUND:2404e3,NETWORK_NOT_READY:2412e3,NETWORK_TOKEN_MISSING:2403201,NETWORK_TOKEN_MALFORMED:2412202,NETWORK_TOKEN_EXPIRED:2403210,NETWORK_TOKEN_AUD_MISSING:2403221,NETWORK_TOKEN_AUD_MISMATCH:2403222,NETWORK_TOKEN_SUB_MISMATCH:2403232,ENCRYPTED_ERROR:5e6,ENCRYPTED_UNSUPPORTED_KEY_SYSTEM:5000001,ENCRYPTED_GENERATE_REQUEST_FAILED:5000002,ENCRYPTED_UPDATE_LICENSE_FAILED:5000003,ENCRYPTED_UPDATE_SERVER_CERT_FAILED:5000004,ENCRYPTED_CDM_ERROR:5000005,ENCRYPTED_OUTPUT_RESTRICTED:5000006,ENCRYPTED_MISSING_TOKEN:5000002},tW=e=>e===tB.VIDEO?"playback":e,tV=class e extends Error{constructor(t,i=e.MEDIA_ERR_CUSTOM,a,r){var n;super(t),this.name="MediaError",this.code=i,this.context=r,this.fatal=null!=a?a:i>=e.MEDIA_ERR_NETWORK&&i<=e.MEDIA_ERR_ENCRYPTED,this.message||(this.message=null!=(n=e.defaultMessages[this.code])?n:"")}};tV.MEDIA_ERR_ABORTED=1,tV.MEDIA_ERR_NETWORK=2,tV.MEDIA_ERR_DECODE=3,tV.MEDIA_ERR_SRC_NOT_SUPPORTED=4,tV.MEDIA_ERR_ENCRYPTED=5,tV.MEDIA_ERR_CUSTOM=100,tV.defaultMessages={1:"You aborted the media playback",2:"A network error caused the media download to fail.",3:"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.",4:"An unsupported error occurred. The server or network failed, or your browser does not support this format.",5:"The media is encrypted and there are no keys to decrypt it."};var tF=tV,t$=(e,t)=>null!=t&&e in t,tK={ANY:"any",MUTED:"muted"},tq={ON_DEMAND:"on-demand",LIVE:"live",UNKNOWN:"unknown"},tY={MSE:"mse",NATIVE:"native"},tG={HEADER:"header",QUERY:"query",NONE:"none"},tj=Object.values(tG),tQ={M3U8:"application/vnd.apple.mpegurl",MP4:"video/mp4"},tZ={HLS:tQ.M3U8},tz=(Object.keys(tZ),[...Object.values(tQ)],{upTo720p:"720p",upTo1080p:"1080p",upTo1440p:"1440p",upTo2160p:"2160p"}),tX={noLessThan480p:"480p",noLessThan540p:"540p",noLessThan720p:"720p",noLessThan1080p:"1080p",noLessThan1440p:"1440p",noLessThan2160p:"2160p"},tJ={DESCENDING:"desc"},t0={code:"en"},t1=(e,t,i,a,r=e)=>{r.addEventListener(t,i,a),e.addEventListener("teardown",()=>{r.removeEventListener(t,i)},{once:!0})},t2=e=>{let t=e.indexOf("?");return t<0?[e]:[e.slice(0,t),e.slice(t)]},t3=e=>{let{type:t}=e;if(t){let e=t.toUpperCase();return t$(e,tZ)?tZ[e]:t}return t9(e)},t4=e=>"VOD"===e?tq.ON_DEMAND:tq.LIVE,t5=e=>"EVENT"===e?1/0:"VOD"===e?NaN:0,t9=e=>{let{src:t}=e;if(!t)return"";let i="";try{i=new URL(t).pathname}catch{console.error("invalid url")}let a=i.lastIndexOf(".");if(a<0)return t6(e)?tQ.M3U8:"";let r=i.slice(a+1).toUpperCase();return t$(r,tQ)?tQ[r]:""},t8="mux.com",t6=({src:e,customDomain:t=t8})=>{let i;try{i=new URL(`${e}`)}catch{return!1}let a="https:"===i.protocol,r=i.hostname===`stream.${t}`.toLowerCase(),n=i.pathname.split("/"),s=2===n.length,o=!(null!=n&&n[1].includes("."));return a&&r&&s&&o},t7=e=>{let t=(null!=e?e:"").split(".")[1];if(t)try{let e=t.replace(/-/g,"+").replace(/_/g,"/"),i=decodeURIComponent(atob(e).split("").map(function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(i)}catch{return}};function ie(e,t=!0){var i;return new it(t&&null!=(i=null==t0?void 0:t0[e])?i:e,t?t0.code:"en")}var it=class{constructor(e,t=(e=>null!=(e=t0)?e:"en")()){this.message=e,this.locale=t}format(e){return this.message.replace(/\{(\w+)\}/g,(t,i)=>{var a;return null!=(a=e[i])?a:""})}toString(){return this.message}},ii=Object.values(tK),ia=e=>"boolean"==typeof e||"string"==typeof e&&ii.includes(e),ir=(e,t)=>{if(!t)return;let i=e.muted,a=()=>e.muted=i;switch(t){case tK.ANY:e.play().catch(()=>{e.muted=!0,e.play().catch(a)});break;case tK.MUTED:e.muted=!0,e.play().catch(a);break;default:e.play().catch(()=>{})}},is=e=>"time"in e?e.time:e.startTime;function io(e,t,i,a,r,n){let s=document.createElement("track");return s.kind=t,s.label=i,a&&(s.srclang=a),r&&(s.id=r),n&&(s.default=!0),s.track.mode=["subtitles","captions"].includes(t)?"disabled":"hidden",s.setAttribute("data-removeondestroy",""),e.append(s),s.track}function il(e,t,i){var a;return null==(a=Array.from(e.querySelectorAll("track")).find(e=>e.track.label===t&&e.track.kind===i))?void 0:a.track}async function id(e,t,i,a){let r=il(e,i,a);return r||((r=io(e,a,i)).mode="hidden",await new Promise(e=>setTimeout(()=>e(void 0),0))),"hidden"!==r.mode&&(r.mode="hidden"),[...t].sort((e,t)=>is(t)-is(e)).forEach(t=>{var i,n;let s=t.value,o=is(t);if("endTime"in t&&null!=t.endTime)null==r||r.addCue(new VTTCue(o,t.endTime,"chapters"===a?s:JSON.stringify(null!=s?s:null)));else{let t=Array.prototype.findIndex.call(null==r?void 0:r.cues,e=>e.startTime>=o),l=null==(i=null==r?void 0:r.cues)?void 0:i[t],d=l?l.startTime:Number.isFinite(e.duration)?e.duration:Number.MAX_SAFE_INTEGER,u=null==(n=null==r?void 0:r.cues)?void 0:n[t-1];u&&(u.endTime=o),null==r||r.addCue(new VTTCue(o,d,"chapters"===a?s:JSON.stringify(null!=s?s:null)))}}),e.textTracks.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),r}var iu="cuepoints",ic=Object.freeze({label:iu});async function ih(e,t,i=ic){return id(e,t,i.label,"metadata")}var im=e=>({time:e.startTime,value:JSON.parse(e.text)});function ip(e,t={label:iu}){var i,a;let r=il(e,t.label,"metadata");if(!(null!=(i=null==r?void 0:r.activeCues)&&i.length))return;if(1===r.activeCues.length)return im(r.activeCues[0]);let{currentTime:n}=e;return im(Array.prototype.find.call(null!=(a=r.activeCues)?a:[],({startTime:e,endTime:t})=>e<=n&&t>n)||r.activeCues[0])}async function iv(e,t=ic){return new Promise(i=>{t1(e,"loadstart",async()=>{let a=await ih(e,[],t);t1(e,"cuechange",()=>{let t=ip(e);if(t){let i=new CustomEvent("cuepointchange",{composed:!0,bubbles:!0,detail:t});e.dispatchEvent(i)}},{},a),i(a)})})}var iE="chapters",ib=Object.freeze({label:iE}),ig=e=>({startTime:e.startTime,endTime:e.endTime,value:e.text});async function i_(e,t,i=ib){return id(e,t,i.label,"chapters")}function iy(e,t={label:iE}){var i,a;let r=il(e,t.label,"chapters");if(!(null!=(i=null==r?void 0:r.activeCues)&&i.length))return;if(1===r.activeCues.length)return ig(r.activeCues[0]);let{currentTime:n}=e;return ig(Array.prototype.find.call(null!=(a=r.activeCues)?a:[],({startTime:e,endTime:t})=>e<=n&&t>n)||r.activeCues[0])}async function iT(e,t=ib){return new Promise(i=>{t1(e,"loadstart",async()=>{let a=await i_(e,[],t);t1(e,"cuechange",()=>{let t=iy(e);if(t){let i=new CustomEvent("chapterchange",{composed:!0,bubbles:!0,detail:t});e.dispatchEvent(i)}},{},a),i(a)})})}var iA={VIDEO:"v",THUMBNAIL:"t",STORYBOARD:"s",DRM:"d"},ik=(e,t,i,a,r=!1,n=!(e=>null==(e=globalThis.navigator)?void 0:e.onLine)())=>{var s,o;if(n){let i=ie("Your device appears to be offline",r),a=tF.MEDIA_ERR_NETWORK,n=new tF(i,a,!1,void 0);return n.errorCategory=t,n.muxCode=tH.NETWORK_OFFLINE,n.data=e,n}let l="status"in e?e.status:e.code,d=Date.now(),u=tF.MEDIA_ERR_NETWORK;if(200===l)return;let c=tW(t),h=((e,t)=>{var i,a;let r=tW(e),n=`${r}Token`;return null!=(i=t.tokens)&&i[r]?null==(a=t.tokens)?void 0:a[r]:t$(n,t)?t[n]:void 0})(t,i),m=(e=>e===tB.VIDEO?iA.VIDEO:e===tB.DRM?iA.DRM:void 0)(t),[v]=t2(null!=(s=i.playbackId)?s:"");if(!l||!v)return;let E=t7(h);if(h&&!E){let i=new tF(ie("The {tokenNamePrefix}-token provided is invalid or malformed.",r).format({tokenNamePrefix:c}),u,!0,ie("Compact JWT string: {token}",r).format({token:h}));return i.errorCategory=t,i.muxCode=tH.NETWORK_TOKEN_MALFORMED,i.data=e,i}if(l>=500){let e=new tF("",u,null==a||a);return e.errorCategory=t,e.muxCode=tH.NETWORK_UNKNOWN_ERROR,e}if(403===l)if(E){if((({exp:e},t=Date.now())=>!e||1e3*e<t)(E,d)){let i={timeStyle:"medium",dateStyle:"medium"},a=new tF(ie("The video’s secured {tokenNamePrefix}-token has expired.",r).format({tokenNamePrefix:c}),u,!0,ie("Expired at: {expiredDate}. Current time: {currentDate}.",r).format({expiredDate:new Intl.DateTimeFormat("en",i).format(null!=(o=E.exp)?o:0),currentDate:new Intl.DateTimeFormat("en",i).format(d)}));return a.errorCategory=t,a.muxCode=tH.NETWORK_TOKEN_EXPIRED,a.data=e,a}if((({sub:e},t)=>e!==t)(E,v)){let i=new tF(ie("The video’s playback ID does not match the one encoded in the {tokenNamePrefix}-token.",r).format({tokenNamePrefix:c}),u,!0,ie("Specified playback ID: {playbackId} and the playback ID encoded in the {tokenNamePrefix}-token: {tokenPlaybackId}",r).format({tokenNamePrefix:c,playbackId:v,tokenPlaybackId:E.sub}));return i.errorCategory=t,i.muxCode=tH.NETWORK_TOKEN_SUB_MISMATCH,i.data=e,i}if((({aud:e},t)=>!e)(E,0)){let i=new tF(ie("The {tokenNamePrefix}-token is formatted with incorrect information.",r).format({tokenNamePrefix:c}),u,!0,ie("The {tokenNamePrefix}-token has no aud value. aud value should be {expectedAud}.",r).format({tokenNamePrefix:c,expectedAud:m}));return i.errorCategory=t,i.muxCode=tH.NETWORK_TOKEN_AUD_MISSING,i.data=e,i}if((({aud:e},t)=>e!==t)(E,m)){let i=new tF(ie("The {tokenNamePrefix}-token is formatted with incorrect information.",r).format({tokenNamePrefix:c}),u,!0,ie("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.",r).format({tokenNamePrefix:c,expectedAud:m,aud:E.aud}));return i.errorCategory=t,i.muxCode=tH.NETWORK_TOKEN_AUD_MISMATCH,i.data=e,i}}else{let i=new tF(ie("Authorization error trying to access this {category} URL. If this is a signed URL, you might need to provide a {tokenNamePrefix}-token.",r).format({tokenNamePrefix:c,category:t}),u,null==a||a,ie("Specified playback ID: {playbackId}",r).format({playbackId:v}));return i.errorCategory=t,i.muxCode=tH.NETWORK_TOKEN_MISSING,i.data=e,i}if(412===l){let n=new tF(ie("This playback-id may belong to a live stream that is not currently active or an asset that is not ready.",r),u,null==a||a,ie("Specified playback ID: {playbackId}",r).format({playbackId:v}));return n.errorCategory=t,n.muxCode=tH.NETWORK_NOT_READY,n.streamType=i.streamType===tq.LIVE?"live":i.streamType===tq.ON_DEMAND?"on-demand":"unknown",n.data=e,n}if(404===l){let i=new tF(ie("This URL or playback-id does not exist. You may have used an Asset ID or an ID from a different resource.",r),u,null==a||a,ie("Specified playback ID: {playbackId}",r).format({playbackId:v}));return i.errorCategory=t,i.muxCode=tH.NETWORK_NOT_FOUND,i.data=e,i}if(400===l){let i=new tF(ie("The URL or playback-id was invalid. You may have used an invalid value as a playback-id."),u,null==a||a,ie("Specified playback ID: {playbackId}",r).format({playbackId:v}));return i.errorCategory=t,i.muxCode=tH.NETWORK_INVALID_URL,i.data=e,i}let b=new tF("",u,null==a||a);return b.errorCategory=t,b.muxCode=tH.NETWORK_UNKNOWN_ERROR,b.data=e,b},iw=tU.DefaultConfig.capLevelController,iS={"720p":921600,"1080p":2073600,"1440p":4194304,"2160p":8294400},iI=class e extends iw{constructor(e){super(e)}static setMaxAutoResolution(t,i){i?e.maxAutoResolution.set(t,i):e.maxAutoResolution.delete(t)}getMaxAutoResolution(){var t;let i=this.hls;return null!=(t=e.maxAutoResolution.get(i))?t:void 0}get levels(){var e;return null!=(e=this.hls.levels)?e:[]}getValidLevels(e){return this.levels.filter((t,i)=>this.isLevelAllowed(t)&&i<=e)}getMaxLevelCapped(e){let t=this.getValidLevels(e),i=this.getMaxAutoResolution();if(!i)return super.getMaxLevel(e);let a=iS[i.toLowerCase().trim()];if(!a)return super.getMaxLevel(e);let r=t.filter(e=>e.width*e.height<=a),n=r.findIndex(e=>e.width*e.height===a);if(-1!==n){let e=r[n];return t.findIndex(t=>t===e)}if(0===r.length)return 0;let s=r[r.length-1];return t.findIndex(e=>e===s)}getMaxLevel(t){if(void 0!==this.getMaxAutoResolution())return this.getMaxLevelCapped(t);let i=super.getMaxLevel(t),a=this.getValidLevels(t);if(!a[i])return i;let r=Math.min(a[i].width,a[i].height),n=e.minMaxResolution;return r>=n?i:iw.getMaxLevelByMediaSize(a,16/9*n,n)}};iI.minMaxResolution=720,iI.maxAutoResolution=new WeakMap;var iR,iD,iL,iC,iM,iO,ix={FAIRPLAY:"fairplay",PLAYREADY:"playready",WIDEVINE:"widevine"},iN=/([A-Z0-9-]+)="?(.*?)"?(?:,|$)/g,iP=async(e,t)=>{if(t===tQ.MP4)return{streamType:tq.ON_DEMAND,targetLiveWindow:NaN,liveEdgeStartOffset:void 0,sessionData:void 0};if(t===tQ.M3U8){let t=await fetch(e);if(!t.ok)return Promise.reject(t);let i=await t.text(),a=await fetch(i.split(`
`).find((e,t,i)=>t&&i[t-1].startsWith("#EXT-X-STREAM-INF"))).then(e=>200!==e.status?Promise.reject(e):e.text());return{...(e=>{let t=e.split(`
`).filter(e=>e.startsWith("#EXT-X-SESSION-DATA"));if(!t.length)return{};let i={};for(let e of t){let t=Object.fromEntries([...e.matchAll(iN)].map(([,e,t])=>[e,t])),a=t["DATA-ID"];a&&(i[a]={...t})}return{sessionData:i}})(i),...(e=>{var t,i,a;let r=e.split(`
`),n=null==(i=(null!=(t=r.find(e=>e.startsWith("#EXT-X-PLAYLIST-TYPE")))?t:"").split(":")[1])?void 0:i.trim(),s=t4(n),o=t5(n),l;if(s===tq.LIVE){let e=r.find(e=>e.startsWith("#EXT-X-PART-INF"));if(e)l=2*e.split(":")[1].split("=")[1];else{let e=r.find(e=>e.startsWith("#EXT-X-TARGETDURATION")),t=null==(a=null==e?void 0:e.split(":"))?void 0:a[1];l=(null!=t?t:6)*3}}return{streamType:s,targetLiveWindow:o,liveEdgeStartOffset:l}})(a)}}return console.error(`Media type ${t} is an unrecognized or unsupported type for src ${e}.`),{streamType:void 0,targetLiveWindow:void 0,liveEdgeStartOffset:void 0,sessionData:void 0}},iU=async(e,t,i=t3({src:e}))=>{var a,r,n,s;let{streamType:o,targetLiveWindow:l,liveEdgeStartOffset:d,sessionData:u}=await iP(e,i),c=null==u?void 0:u["com.apple.hls.chapters"];(null!=c&&c.URI||null!=c&&c.VALUE.toLocaleLowerCase().startsWith("http"))&&iB(null!=(a=c.URI)?a:c.VALUE,t),(null!=(r=iF.get(t))?r:{}).liveEdgeStartOffset=d,(null!=(n=iF.get(t))?n:{}).targetLiveWindow=l,t.dispatchEvent(new CustomEvent("targetlivewindowchange",{composed:!0,bubbles:!0})),(null!=(s=iF.get(t))?s:{}).streamType=o,t.dispatchEvent(new CustomEvent("streamtypechange",{composed:!0,bubbles:!0}))},iB=async(e,t)=>{var i,a;try{let r=await fetch(e);if(!r.ok)throw Error(`Failed to fetch Mux metadata: ${r.status} ${r.statusText}`);let n=await r.json(),s={};if(!(null!=(i=null==n?void 0:n[0])&&i.metadata))return;for(let e of n[0].metadata)e.key&&e.value&&(s[e.key]=e.value);(null!=(a=iF.get(t))?a:{}).metadata=s;let o=new CustomEvent("muxmetadata");t.dispatchEvent(o)}catch(e){console.error(e)}},iH=null!=(iD=null==(iR=null==globalThis?void 0:globalThis.navigator)?void 0:iR.userAgent)?iD:"",iW=null!=(iM=null==(iC=null==(iL=null==globalThis?void 0:globalThis.navigator)?void 0:iL.userAgentData)?void 0:iC.platform)?iM:"",iV=iH.toLowerCase().includes("android")||["x11","android"].some(e=>iW.toLowerCase().includes(e)),iF=new WeakMap,i$="mux.com",iK=null==(iO=tU.isSupported)?void 0:iO.call(tU),iq=()=>{if("undefined"!=typeof window)return tN.utils.now()},iY=tN.utils.generateUUID,iG=({playbackId:e,customDomain:t=i$,maxResolution:i,minResolution:a,renditionOrder:r,programStartTime:n,programEndTime:s,assetStartTime:o,assetEndTime:l,playbackToken:d,tokens:{playback:u=d}={},extraSourceParams:c={}}={})=>{if(!e)return;let[h,m=""]=t2(e),v=new URL(`https://stream.${t}/${h}.m3u8${m}`);return u||v.searchParams.has("token")?(v.searchParams.forEach((e,t)=>{"token"!=t&&v.searchParams.delete(t)}),u&&v.searchParams.set("token",u)):(i&&v.searchParams.set("max_resolution",i),a&&(v.searchParams.set("min_resolution",a),i&&+i.slice(0,-1)<+a.slice(0,-1)&&console.error("minResolution must be <= maxResolution","minResolution",a,"maxResolution",i)),r&&v.searchParams.set("rendition_order",r),n&&v.searchParams.set("program_start_time",`${n}`),s&&v.searchParams.set("program_end_time",`${s}`),o&&v.searchParams.set("asset_start_time",`${o}`),l&&v.searchParams.set("asset_end_time",`${l}`),Object.entries(c).forEach(([e,t])=>{null!=t&&v.searchParams.set(e,t)})),v.toString()},ij=e=>{if(!e)return;let[t]=e.split("?");return t||void 0},iQ=e=>{if(!e||!e.startsWith("https://stream."))return;let[t]=new URL(e).pathname.slice(1).split(/\.m3u8|\//);return t||void 0},iZ=e=>{var t;return null==(t=iF.get(e))?void 0:t.error},iz=e=>{var t,i;return null!=(i=null==(t=iF.get(e))?void 0:t.streamType)?i:tq.UNKNOWN},iX=e=>{var t,i;return null!=(i=null==(t=iF.get(e))?void 0:t.seekable)?i:e.seekable},iJ=.034,i0=(e,t,i=iJ)=>e>t||((e,t,i=iJ)=>Math.abs(e-t)<=i)(e,t,i),i1=(e,t)=>{var i,a,r;if(!t||!e.buffered.length)return;if(e.readyState>2)return!1;let n=t.currentLevel>=0?null==(a=null==(i=t.levels)?void 0:i[t.currentLevel])?void 0:a.details:null==(r=t.levels.find(e=>!!e.details))?void 0:r.details;if(!n||n.live)return;let{fragments:s}=n;if(!(null!=s&&s.length))return;if(e.currentTime<e.duration-(n.targetduration+.5))return!1;let o=s[s.length-1];if(e.currentTime<=o.start)return!1;let l=o.start+o.duration/2,d=e.buffered.start(e.buffered.length-1),u=e.buffered.end(e.buffered.length-1);return l>d&&l<u},i2=(e,t)=>e.ended||e.loop?e.ended:!!(t&&i1(e,t))||((e,t=iJ)=>e.paused&&i0(e.currentTime,e.duration,t))(e),i3=(e,t,i)=>{let a=null==t?void 0:t.engine;null!=e&&e.mux&&!e.mux.deleted&&(null!=i&&i.muxDataKeepSession?a&&e.mux.removeHLSJS():(e.mux.destroy(),delete e.mux)),a&&(a.detachMedia(),a.destroy()),e&&(e.hasAttribute("src")&&(e.removeAttribute("src"),e.load()),e.removeEventListener("error",aa),e.removeEventListener("error",an),e.removeEventListener("durationchange",ai),iF.delete(e),e.dispatchEvent(new Event("teardown")))};function i4(e,t){var i;let a=t3(e);if(a!==tQ.M3U8)return!0;let r=!a||null==(i=t.canPlayType(a))||i,{preferPlayback:n}=e,s=n===tY.MSE,o=n===tY.NATIVE,l=iK&&(s||iV||!(/^((?!chrome|android).)*safari/i.test(iH)&&t.canPlayType("application/vnd.apple.mpegurl")));return r&&(o||!l)}var i5=e=>e===tq.LIVE?{backBufferLength:8}:{},i9=e=>{let{tokens:{drm:t}={},playbackId:i,drmTypeCb:a}=e,r=ij(i);return t&&r?{emeEnabled:!0,drmSystems:{"com.apple.fps":{licenseUrl:i7(e,"fairplay"),serverCertificateUrl:ae(e,"fairplay")},"com.widevine.alpha":{licenseUrl:i7(e,"widevine")},"com.microsoft.playready":{licenseUrl:i7(e,"playready")}},requestMediaKeySystemAccessFunc:(e,t)=>("com.widevine.alpha"===e&&(t=[...t.map(e=>{var t;let i=null==(t=e.videoCapabilities)?void 0:t.map(e=>({...e,robustness:"HW_SECURE_ALL"}));return{...e,videoCapabilities:i}}),...t]),navigator.requestMediaKeySystemAccess(e,t).then(t=>{let i=(e=>e.includes("fps")?ix.FAIRPLAY:e.includes("playready")?ix.PLAYREADY:e.includes("widevine")?ix.WIDEVINE:void 0)(e);return null==a||a(i),t}))}:{}},i8=async e=>{let t=await fetch(e);return 200!==t.status?Promise.reject(t):await t.arrayBuffer()},i6=async(e,t)=>{let i=await fetch(t,{method:"POST",headers:{"Content-type":"application/octet-stream"},body:e});return 200!==i.status?Promise.reject(i):new Uint8Array(await i.arrayBuffer())},i7=({playbackId:e,tokens:{drm:t}={},customDomain:i=i$},a)=>{let r=ij(e);return`https://license.${i.toLocaleLowerCase().endsWith(i$)?i:i$}/license/${a}/${r}?token=${t}`},ae=({playbackId:e,tokens:{drm:t}={},customDomain:i=i$},a)=>{let r=ij(e);return`https://license.${i.toLocaleLowerCase().endsWith(i$)?i:i$}/appcert/${a}/${r}?token=${t}`},at=({playbackId:e,src:t,customDomain:i})=>{if(e)return!0;if("string"!=typeof t)return!1;let a=new URL(t,null==window?void 0:window.location.href).hostname.toLocaleLowerCase();return a.includes(i$)||!!i&&a.includes(i.toLocaleLowerCase())};function ai(e){var t;let i=e.target,a=null==(t=iF.get(i))?void 0:t.startTime;if(a&&function(e,t,i){t&&i>t&&(i=t);for(let t=0;t<e.length;t++)if(e.start(t)<=i&&e.end(t)>=i)return!0;return!1}(i.seekable,i.duration,a)){let e="auto"===i.preload;e&&(i.preload="none"),i.currentTime=a,e&&(i.preload="auto")}}async function aa(e){if(!e.isTrusted)return;e.stopImmediatePropagation();let t=e.target;if(!(null!=t&&t.error))return;let{message:i,code:a}=t.error,r=new tF(i,a);if(t.src&&a===tF.MEDIA_ERR_SRC_NOT_SUPPORTED&&t.readyState===HTMLMediaElement.HAVE_NOTHING)return void setTimeout(()=>{var e;let i=null!=(e=iZ(t))?e:t.error;(null==i?void 0:i.code)===tF.MEDIA_ERR_SRC_NOT_SUPPORTED&&ar(t,r)},500);if(t.src&&(a!==tF.MEDIA_ERR_DECODE||void 0!==a))try{let{status:e}=await fetch(t.src);r.data={response:{code:e}}}catch{}ar(t,r)}function ar(e,t){var i;t.fatal&&((null!=(i=iF.get(e))?i:{}).error=t,e.dispatchEvent(new CustomEvent("error",{detail:t})))}function an(e){var t,i;if(!(e instanceof CustomEvent)||!(e.detail instanceof tF))return;let a=e.target,r=e.detail;r&&r.fatal&&((null!=(t=iF.get(a))?t:{}).error=r,null==(i=a.mux)||i.emit("error",{player_error_code:r.code,player_error_message:r.message,player_error_context:r.context}))}var as,ao,al,ad,au,ac,ah,am,ap,av,aE,ab,ag=(e,t)=>{var i,a,r;e.fatal?console.error("getErrorFromHlsErrorData()",e):t.debug&&console.warn("getErrorFromHlsErrorData() (non-fatal)",e);let n={[tU.ErrorTypes.NETWORK_ERROR]:tF.MEDIA_ERR_NETWORK,[tU.ErrorTypes.MEDIA_ERROR]:tF.MEDIA_ERR_DECODE,[tU.ErrorTypes.KEY_SYSTEM_ERROR]:tF.MEDIA_ERR_ENCRYPTED},s,o=(e=>[tU.ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED,tU.ErrorDetails.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED].includes(e.details)?tF.MEDIA_ERR_NETWORK:n[e.type])(e);if(o===tF.MEDIA_ERR_NETWORK&&e.response){let r=null!=(i=(e=>e.type===tU.ErrorTypes.KEY_SYSTEM_ERROR?tB.DRM:e.type===tU.ErrorTypes.NETWORK_ERROR?tB.VIDEO:void 0)(e))?i:tB.VIDEO;s=null!=(a=ik(e.response,r,t,e.fatal))?a:new tF("",o,e.fatal)}else o===tF.MEDIA_ERR_ENCRYPTED?e.details===tU.ErrorDetails.KEY_SYSTEM_NO_CONFIGURED_LICENSE?((s=new tF(ie("Attempting to play DRM-protected content without providing a DRM token."),tF.MEDIA_ERR_ENCRYPTED,e.fatal)).errorCategory=tB.DRM,s.muxCode=tH.ENCRYPTED_MISSING_TOKEN):e.details===tU.ErrorDetails.KEY_SYSTEM_NO_ACCESS?((s=new tF(ie("Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser."),tF.MEDIA_ERR_ENCRYPTED,e.fatal)).errorCategory=tB.DRM,s.muxCode=tH.ENCRYPTED_UNSUPPORTED_KEY_SYSTEM):e.details===tU.ErrorDetails.KEY_SYSTEM_NO_SESSION?((s=new tF(ie("Failed to generate a DRM license request. This may be an issue with the player or your protected content."),tF.MEDIA_ERR_ENCRYPTED,!0)).errorCategory=tB.DRM,s.muxCode=tH.ENCRYPTED_GENERATE_REQUEST_FAILED):e.details===tU.ErrorDetails.KEY_SYSTEM_SESSION_UPDATE_FAILED?((s=new tF(ie("Failed to update DRM license. This may be an issue with the player or your protected content."),tF.MEDIA_ERR_ENCRYPTED,e.fatal)).errorCategory=tB.DRM,s.muxCode=tH.ENCRYPTED_UPDATE_LICENSE_FAILED):e.details===tU.ErrorDetails.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED?((s=new tF(ie("Your server certificate failed when attempting to set it. This may be an issue with a no longer valid certificate."),tF.MEDIA_ERR_ENCRYPTED,e.fatal)).errorCategory=tB.DRM,s.muxCode=tH.ENCRYPTED_UPDATE_SERVER_CERT_FAILED):e.details===tU.ErrorDetails.KEY_SYSTEM_STATUS_INTERNAL_ERROR?((s=new tF(ie("The DRM Content Decryption Module system had an internal failure. Try reloading the page, upading your browser, or playing in another browser."),tF.MEDIA_ERR_ENCRYPTED,e.fatal)).errorCategory=tB.DRM,s.muxCode=tH.ENCRYPTED_CDM_ERROR):e.details===tU.ErrorDetails.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED?((s=new tF(ie("DRM playback is being attempted in an environment that is not sufficiently secure. User may see black screen."),tF.MEDIA_ERR_ENCRYPTED,!1)).errorCategory=tB.DRM,s.muxCode=tH.ENCRYPTED_OUTPUT_RESTRICTED):((s=new tF(e.error.message,tF.MEDIA_ERR_ENCRYPTED,e.fatal)).errorCategory=tB.DRM,s.muxCode=tH.ENCRYPTED_ERROR):s=new tF("",o,e.fatal);return s.context||(s.context=`${e.url?`url: ${e.url}
`:""}${e.response&&(e.response.code||e.response.text)?`response: ${e.response.code}, ${e.response.text}
`:""}${e.reason?`failure reason: ${e.reason}
`:""}${e.level?`level: ${e.level}
`:""}${e.parent?`parent stream controller: ${e.parent}
`:""}${e.buffer?`buffer length: ${e.buffer}
`:""}${e.error?`error: ${e.error}
`:""}${e.event?`event: ${e.event}
`:""}${e.err?`error message: ${null==(r=e.err)?void 0:r.message}
`:""}`),s.data=e,s},af=i(75900),a_=e=>{throw TypeError(e)},ay=(e,t,i)=>t.has(e)||a_("Cannot "+i),aT=(e,t,i)=>(ay(e,t,"read from private field"),i?i.call(e):t.get(e)),aA=(e,t,i)=>t.has(e)?a_("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,i),ak=(e,t,i,a)=>(ay(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),aw=(e,t,i)=>(ay(e,t,"access private method"),i),aS=(()=>{try{return"0.29.2"}catch{}return"UNKNOWN"})(),aI=`
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" part="logo" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2" viewBox="0 0 1600 500"><g fill="#fff"><path d="M994.287 93.486c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31m0-93.486c-34.509 0-62.484 27.976-62.484 62.486v187.511c0 68.943-56.09 125.033-125.032 125.033s-125.03-56.09-125.03-125.033V62.486C681.741 27.976 653.765 0 619.256 0s-62.484 27.976-62.484 62.486v187.511C556.772 387.85 668.921 500 806.771 500c137.851 0 250.001-112.15 250.001-250.003V62.486c0-34.51-27.976-62.486-62.485-62.486M1537.51 468.511c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31m-275.883-218.509-143.33 143.329c-24.402 24.402-24.402 63.966 0 88.368 24.402 24.402 63.967 24.402 88.369 0l143.33-143.329 143.328 143.329c24.402 24.4 63.967 24.402 88.369 0 24.403-24.402 24.403-63.966.001-88.368l-143.33-143.329.001-.004 143.329-143.329c24.402-24.402 24.402-63.965 0-88.367s-63.967-24.402-88.369 0L1349.996 161.63 1206.667 18.302c-24.402-24.401-63.967-24.402-88.369 0s-24.402 63.965 0 88.367l143.329 143.329v.004ZM437.511 468.521c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31M461.426 4.759C438.078-4.913 411.2.432 393.33 18.303L249.999 161.632 106.669 18.303C88.798.432 61.922-4.913 38.573 4.759 15.224 14.43-.001 37.214-.001 62.488v375.026c0 34.51 27.977 62.486 62.487 62.486 34.51 0 62.486-27.976 62.486-62.486V213.341l80.843 80.844c24.404 24.402 63.965 24.402 88.369 0l80.843-80.844v224.173c0 34.51 27.976 62.486 62.486 62.486s62.486-27.976 62.486-62.486V62.488c0-25.274-15.224-48.058-38.573-57.729" style="fill-rule:nonzero"/></g></svg>`,aR={BEACON_COLLECTION_DOMAIN:"beacon-collection-domain",CUSTOM_DOMAIN:"custom-domain",DEBUG:"debug",DISABLE_TRACKING:"disable-tracking",DISABLE_COOKIES:"disable-cookies",DISABLE_PSEUDO_ENDED:"disable-pseudo-ended",DRM_TOKEN:"drm-token",PLAYBACK_TOKEN:"playback-token",ENV_KEY:"env-key",MAX_RESOLUTION:"max-resolution",MIN_RESOLUTION:"min-resolution",MAX_AUTO_RESOLUTION:"max-auto-resolution",RENDITION_ORDER:"rendition-order",PROGRAM_START_TIME:"program-start-time",PROGRAM_END_TIME:"program-end-time",ASSET_START_TIME:"asset-start-time",ASSET_END_TIME:"asset-end-time",METADATA_URL:"metadata-url",PLAYBACK_ID:"playback-id",PLAYER_SOFTWARE_NAME:"player-software-name",PLAYER_SOFTWARE_VERSION:"player-software-version",PLAYER_INIT_TIME:"player-init-time",PREFER_CMCD:"prefer-cmcd",PREFER_PLAYBACK:"prefer-playback",START_TIME:"start-time",STREAM_TYPE:"stream-type",TARGET_LIVE_WINDOW:"target-live-window",LIVE_EDGE_OFFSET:"live-edge-offset",TYPE:"type",LOGO:"logo"},aD=Object.values(aR),aL="mux-video",aC=class extends af.lB{constructor(){super(),aA(this,aE),aA(this,as),aA(this,ao),aA(this,al),aA(this,ad,{}),aA(this,au,{}),aA(this,ac),aA(this,ah),aA(this,am),aA(this,ap),aA(this,av,""),ak(this,al,iq()),this.nativeEl.addEventListener("muxmetadata",e=>{var t;let i=(e=>{var t;return null==(t=iF.get(e))?void 0:t.metadata})(this.nativeEl),a=null!=(t=this.metadata)?t:{};this.metadata={...i,...a},(null==i?void 0:i["com.mux.video.branding"])==="mux-free-plan"&&(ak(this,av,"default"),this.updateLogo())})}static get NAME(){return aL}static get VERSION(){return aS}static get observedAttributes(){var e;return[...aD,...null!=(e=af.lB.observedAttributes)?e:[]]}static getLogoHTML(e){return e&&"false"!==e?"default"===e?aI:`<img part="logo" src="${e}" />`:""}static getTemplateHTML(e={}){var t;return`
      ${af.lB.getTemplateHTML(e)}
      <style>
        :host {
          position: relative;
        }
        slot[name="logo"] {
          display: flex;
          justify-content: end;
          position: absolute;
          top: 1rem;
          right: 1rem;
          opacity: 0;
          transition: opacity 0.25s ease-in-out;
          z-index: 1;
        }
        slot[name="logo"]:has([part="logo"]) {
          opacity: 1;
        }
        slot[name="logo"] [part="logo"] {
          width: 5rem;
          pointer-events: none;
          user-select: none;
        }
      </style>
      <slot name="logo">
        ${this.getLogoHTML(null!=(t=e[aR.LOGO])?t:"")}
      </slot>
    `}get preferCmcd(){var e;return null!=(e=this.getAttribute(aR.PREFER_CMCD))?e:void 0}set preferCmcd(e){e!==this.preferCmcd&&(e?tj.includes(e)?this.setAttribute(aR.PREFER_CMCD,e):console.warn(`Invalid value for preferCmcd. Must be one of ${tj.join()}`):this.removeAttribute(aR.PREFER_CMCD))}get playerInitTime(){return this.hasAttribute(aR.PLAYER_INIT_TIME)?+this.getAttribute(aR.PLAYER_INIT_TIME):aT(this,al)}set playerInitTime(e){e!=this.playerInitTime&&(null==e?this.removeAttribute(aR.PLAYER_INIT_TIME):this.setAttribute(aR.PLAYER_INIT_TIME,`${+e}`))}get playerSoftwareName(){var e;return null!=(e=aT(this,am))?e:aL}set playerSoftwareName(e){ak(this,am,e)}get playerSoftwareVersion(){var e;return null!=(e=aT(this,ah))?e:aS}set playerSoftwareVersion(e){ak(this,ah,e)}get _hls(){var e;return null==(e=aT(this,as))?void 0:e.engine}get mux(){var e;return null==(e=this.nativeEl)?void 0:e.mux}get error(){var e;return null!=(e=iZ(this.nativeEl))?e:null}get errorTranslator(){return aT(this,ap)}set errorTranslator(e){ak(this,ap,e)}get src(){return this.getAttribute("src")}set src(e){e!==this.src&&(null==e?this.removeAttribute("src"):this.setAttribute("src",e))}get type(){var e;return null!=(e=this.getAttribute(aR.TYPE))?e:void 0}set type(e){e!==this.type&&(e?this.setAttribute(aR.TYPE,e):this.removeAttribute(aR.TYPE))}get preload(){let e=this.getAttribute("preload");return""===e?"auto":["none","metadata","auto"].includes(e)?e:super.preload}set preload(e){e!=this.getAttribute("preload")&&(["","none","metadata","auto"].includes(e)?this.setAttribute("preload",e):this.removeAttribute("preload"))}get debug(){return null!=this.getAttribute(aR.DEBUG)}set debug(e){e!==this.debug&&(e?this.setAttribute(aR.DEBUG,""):this.removeAttribute(aR.DEBUG))}get disableTracking(){return this.hasAttribute(aR.DISABLE_TRACKING)}set disableTracking(e){e!==this.disableTracking&&this.toggleAttribute(aR.DISABLE_TRACKING,!!e)}get disableCookies(){return this.hasAttribute(aR.DISABLE_COOKIES)}set disableCookies(e){e!==this.disableCookies&&(e?this.setAttribute(aR.DISABLE_COOKIES,""):this.removeAttribute(aR.DISABLE_COOKIES))}get disablePseudoEnded(){return this.hasAttribute(aR.DISABLE_PSEUDO_ENDED)}set disablePseudoEnded(e){e!==this.disablePseudoEnded&&(e?this.setAttribute(aR.DISABLE_PSEUDO_ENDED,""):this.removeAttribute(aR.DISABLE_PSEUDO_ENDED))}get startTime(){let e=this.getAttribute(aR.START_TIME);if(null==e)return;let t=+e;return Number.isNaN(t)?void 0:t}set startTime(e){e!==this.startTime&&(null==e?this.removeAttribute(aR.START_TIME):this.setAttribute(aR.START_TIME,`${e}`))}get playbackId(){var e;return this.hasAttribute(aR.PLAYBACK_ID)?this.getAttribute(aR.PLAYBACK_ID):null!=(e=iQ(this.src))?e:void 0}set playbackId(e){e!==this.playbackId&&(e?this.setAttribute(aR.PLAYBACK_ID,e):this.removeAttribute(aR.PLAYBACK_ID))}get maxResolution(){var e;return null!=(e=this.getAttribute(aR.MAX_RESOLUTION))?e:void 0}set maxResolution(e){e!==this.maxResolution&&(e?this.setAttribute(aR.MAX_RESOLUTION,e):this.removeAttribute(aR.MAX_RESOLUTION))}get minResolution(){var e;return null!=(e=this.getAttribute(aR.MIN_RESOLUTION))?e:void 0}set minResolution(e){e!==this.minResolution&&(e?this.setAttribute(aR.MIN_RESOLUTION,e):this.removeAttribute(aR.MIN_RESOLUTION))}get maxAutoResolution(){var e;return null!=(e=this.getAttribute(aR.MAX_AUTO_RESOLUTION))?e:void 0}set maxAutoResolution(e){null==e?this.removeAttribute(aR.MAX_AUTO_RESOLUTION):this.setAttribute(aR.MAX_AUTO_RESOLUTION,e)}get renditionOrder(){var e;return null!=(e=this.getAttribute(aR.RENDITION_ORDER))?e:void 0}set renditionOrder(e){e!==this.renditionOrder&&(e?this.setAttribute(aR.RENDITION_ORDER,e):this.removeAttribute(aR.RENDITION_ORDER))}get programStartTime(){let e=this.getAttribute(aR.PROGRAM_START_TIME);if(null==e)return;let t=+e;return Number.isNaN(t)?void 0:t}set programStartTime(e){null==e?this.removeAttribute(aR.PROGRAM_START_TIME):this.setAttribute(aR.PROGRAM_START_TIME,`${e}`)}get programEndTime(){let e=this.getAttribute(aR.PROGRAM_END_TIME);if(null==e)return;let t=+e;return Number.isNaN(t)?void 0:t}set programEndTime(e){null==e?this.removeAttribute(aR.PROGRAM_END_TIME):this.setAttribute(aR.PROGRAM_END_TIME,`${e}`)}get assetStartTime(){let e=this.getAttribute(aR.ASSET_START_TIME);if(null==e)return;let t=+e;return Number.isNaN(t)?void 0:t}set assetStartTime(e){null==e?this.removeAttribute(aR.ASSET_START_TIME):this.setAttribute(aR.ASSET_START_TIME,`${e}`)}get assetEndTime(){let e=this.getAttribute(aR.ASSET_END_TIME);if(null==e)return;let t=+e;return Number.isNaN(t)?void 0:t}set assetEndTime(e){null==e?this.removeAttribute(aR.ASSET_END_TIME):this.setAttribute(aR.ASSET_END_TIME,`${e}`)}get customDomain(){var e;return null!=(e=this.getAttribute(aR.CUSTOM_DOMAIN))?e:void 0}set customDomain(e){e!==this.customDomain&&(e?this.setAttribute(aR.CUSTOM_DOMAIN,e):this.removeAttribute(aR.CUSTOM_DOMAIN))}get drmToken(){var e;return null!=(e=this.getAttribute(aR.DRM_TOKEN))?e:void 0}set drmToken(e){e!==this.drmToken&&(e?this.setAttribute(aR.DRM_TOKEN,e):this.removeAttribute(aR.DRM_TOKEN))}get playbackToken(){var e,t,i,a;if(this.hasAttribute(aR.PLAYBACK_TOKEN))return null!=(e=this.getAttribute(aR.PLAYBACK_TOKEN))?e:void 0;if(this.hasAttribute(aR.PLAYBACK_ID)){let[,e]=t2(null!=(t=this.playbackId)?t:"");return null!=(i=new URLSearchParams(e).get("token"))?i:void 0}if(this.src)return null!=(a=new URLSearchParams(this.src).get("token"))?a:void 0}set playbackToken(e){e!==this.playbackToken&&(e?this.setAttribute(aR.PLAYBACK_TOKEN,e):this.removeAttribute(aR.PLAYBACK_TOKEN))}get tokens(){let e=this.getAttribute(aR.PLAYBACK_TOKEN),t=this.getAttribute(aR.DRM_TOKEN);return{...aT(this,au),...null!=e?{playback:e}:{},...null!=t?{drm:t}:{}}}set tokens(e){ak(this,au,null!=e?e:{})}get ended(){return i2(this.nativeEl,this._hls)}get envKey(){var e;return null!=(e=this.getAttribute(aR.ENV_KEY))?e:void 0}set envKey(e){e!==this.envKey&&(e?this.setAttribute(aR.ENV_KEY,e):this.removeAttribute(aR.ENV_KEY))}get beaconCollectionDomain(){var e;return null!=(e=this.getAttribute(aR.BEACON_COLLECTION_DOMAIN))?e:void 0}set beaconCollectionDomain(e){e!==this.beaconCollectionDomain&&(e?this.setAttribute(aR.BEACON_COLLECTION_DOMAIN,e):this.removeAttribute(aR.BEACON_COLLECTION_DOMAIN))}get streamType(){var e;return null!=(e=this.getAttribute(aR.STREAM_TYPE))?e:iz(this.nativeEl)}set streamType(e){e!==this.streamType&&(e?this.setAttribute(aR.STREAM_TYPE,e):this.removeAttribute(aR.STREAM_TYPE))}get targetLiveWindow(){var e,t,i;return this.hasAttribute(aR.TARGET_LIVE_WINDOW)?+this.getAttribute(aR.TARGET_LIVE_WINDOW):(e=this.nativeEl,null!=(i=null==(t=iF.get(e))?void 0:t.targetLiveWindow)?i:NaN)}set targetLiveWindow(e){e!=this.targetLiveWindow&&(null==e?this.removeAttribute(aR.TARGET_LIVE_WINDOW):this.setAttribute(aR.TARGET_LIVE_WINDOW,`${+e}`))}get liveEdgeStart(){var e,t;if(this.hasAttribute(aR.LIVE_EDGE_OFFSET)){let{liveEdgeOffset:i}=this,a=null!=(e=this.nativeEl.seekable.end(0))?e:0;return Math.max(null!=(t=this.nativeEl.seekable.start(0))?t:0,a-i)}return(e=>{var t;let i=null==(t=iF.get(e))?void 0:t.liveEdgeStartOffset;if("number"!=typeof i)return NaN;let a=iX(e);return a.length?a.end(a.length-1)-i:NaN})(this.nativeEl)}get liveEdgeOffset(){if(this.hasAttribute(aR.LIVE_EDGE_OFFSET))return+this.getAttribute(aR.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){e!=this.liveEdgeOffset&&(null==e?this.removeAttribute(aR.LIVE_EDGE_OFFSET):this.setAttribute(aR.LIVE_EDGE_OFFSET,`${+e}`))}get seekable(){return iX(this.nativeEl)}async addCuePoints(e){return ih(this.nativeEl,e)}get activeCuePoint(){return ip(this.nativeEl)}get cuePoints(){return function(e,t={label:iu}){let i=il(e,t.label,"metadata");return null!=i&&i.cues?Array.from(i.cues,e=>im(e)):[]}(this.nativeEl)}async addChapters(e){return i_(this.nativeEl,e)}get activeChapter(){return iy(this.nativeEl)}get chapters(){return function(e,t={label:iE}){var i;let a=il(e,t.label,"chapters");return null!=(i=null==a?void 0:a.cues)&&i.length?Array.from(a.cues,e=>ig(e)):[]}(this.nativeEl)}getStartDate(){return function(e,t){if(t){let i=t.playingDate;if(null!=i)return new Date(i.getTime()-1e3*e.currentTime)}return"function"==typeof e.getStartDate?e.getStartDate():new Date(NaN)}(this.nativeEl,this._hls)}get currentPdt(){var e,t;return e=this.nativeEl,(t=this._hls)&&t.playingDate?t.playingDate:new Date("function"==typeof e.getStartDate?e.getStartDate().getTime()+1e3*e.currentTime:NaN)}get preferPlayback(){let e=this.getAttribute(aR.PREFER_PLAYBACK);if(e===tY.MSE||e===tY.NATIVE)return e}set preferPlayback(e){e!==this.preferPlayback&&(e===tY.MSE||e===tY.NATIVE?this.setAttribute(aR.PREFER_PLAYBACK,e):this.removeAttribute(aR.PREFER_PLAYBACK))}get metadata(){return{...this.getAttributeNames().filter(e=>e.startsWith("metadata-")&&![aR.METADATA_URL].includes(e)).reduce((e,t)=>{let i=this.getAttribute(t);return null!=i&&(e[t.replace(/^metadata-/,"").replace(/-/g,"_")]=i),e},{}),...aT(this,ad)}}set metadata(e){ak(this,ad,null!=e?e:{}),this.mux&&this.mux.emit("hb",aT(this,ad))}get _hlsConfig(){return aT(this,ac)}set _hlsConfig(e){ak(this,ac,e)}get logo(){var e;return null!=(e=this.getAttribute(aR.LOGO))?e:aT(this,av)}set logo(e){e?this.setAttribute(aR.LOGO,e):this.removeAttribute(aR.LOGO)}load(){ak(this,as,((e,t,i)=>{var a,r,n,s;i3(t,i,e);let{metadata:o={}}=e,{view_session_id:l=iY()}=o,d=null!=(r=null==(a=e)?void 0:a.metadata)&&r.video_id?a.metadata.video_id:at(a)&&null!=(s=null!=(n=ij(a.playbackId))?n:iQ(a.src))?s:a.src;o.view_session_id=l,o.video_id=d,e.metadata=o,e.drmTypeCb=e=>{var i;null==(i=t.mux)||i.emit("hb",{view_drm_type:e})},iF.set(t,{retryCount:0});let u=((e,t)=>{let{debug:i,streamType:a,startTime:r=-1,metadata:n,preferCmcd:s,_hlsConfig:o={},maxAutoResolution:l}=e,d=t3(e)===tQ.M3U8,u=i4(e,t);if(d&&!u&&iK){let d=i5(a),u=i9(e),c=[tG.QUERY,tG.HEADER].includes(s)?{useHeaders:s===tG.HEADER,sessionId:null==n?void 0:n.view_session_id,contentId:null==n?void 0:n.video_id}:void 0,h=null==o.capLevelToPlayerSize?{capLevelController:iI}:{},m=new tU({debug:i,startPosition:r,cmcd:c,xhrSetup:(e,t)=>{var i,a;if(s&&s!==tG.QUERY)return;let r=new URL(t);if(!r.searchParams.has("CMCD"))return;let n=(null!=(a=null==(i=r.searchParams.get("CMCD"))?void 0:i.split(","))?a:[]).filter(e=>e.startsWith("sid")||e.startsWith("cid")).join(",");r.searchParams.set("CMCD",n),e.open("GET",r)},...h,backBufferLength:30,renderTextTracksNatively:!1,liveDurationInfinity:!0,capLevelToPlayerSize:!0,capLevelOnFPSDrop:!0,...d,...u,...o});return h.capLevelController===iI&&void 0!==l&&iI.setMaxAutoResolution(m,l),m.on(tU.Events.MANIFEST_PARSED,async function(e,i){var a,r;let n=null==(a=i.sessionData)?void 0:a["com.apple.hls.chapters"];(null!=n&&n.URI||null!=n&&n.VALUE.toLocaleLowerCase().startsWith("http"))&&iB(null!=(r=null==n?void 0:n.URI)?r:null==n?void 0:n.VALUE,t)}),m}})(e,t),c=(({preload:e,src:t},i,a)=>{let r=e=>{null!=e&&["","none","metadata","auto"].includes(e)?i.setAttribute("preload",e):i.removeAttribute("preload")};if(!a)return r(e),r;let n=!1,s=!1,o=a.config.maxBufferLength,l=a.config.maxBufferSize,d=e=>{r(e);let t=null!=e?e:i.preload;s||"none"===t||("metadata"===t?(a.config.maxBufferLength=1,a.config.maxBufferSize=1):(a.config.maxBufferLength=o,a.config.maxBufferSize=l),u())},u=()=>{!n&&t&&(n=!0,a.loadSource(t))};return t1(i,"play",()=>{s=!0,a.config.maxBufferLength=o,a.config.maxBufferSize=l,u()},{once:!0}),d(e),d})(e,t,u);null!=e&&e.muxDataKeepSession&&null!=t&&t.mux&&!t.mux.deleted?u&&t.mux.addHLSJS({hlsjs:u,Hls:u?tU:void 0}):((e,t,i)=>{var a;let{envKey:r,disableTracking:n,muxDataSDK:s=tN,muxDataSDKOptions:o={}}=e,l=at(e);if(!n&&(r||l)){let{playerInitTime:n,playerSoftwareName:l,playerSoftwareVersion:d,beaconCollectionDomain:u,debug:c,disableCookies:h}=e,m={...e.metadata,video_title:(null==(a=null==e?void 0:e.metadata)?void 0:a.video_title)||void 0};s.monitor(t,{debug:c,beaconCollectionDomain:u,hlsjs:i,Hls:i?tU:void 0,automaticErrorTracking:!1,errorTranslator:t=>"string"!=typeof t.player_error_code&&("function"==typeof e.errorTranslator?e.errorTranslator(t):t),disableCookies:h,...o,data:{...r?{env_key:r}:{},player_software_name:l,player_software:l,player_software_version:d,player_init_time:n,...m}})}})(e,t,u),((e,t,i)=>{var a,r;let n=i4(e,t),{src:s,customDomain:o=i$}=e,l=()=>{t.ended||e.disablePseudoEnded||!i2(t,i)||(i1(t,i)?t.currentTime=t.buffered.end(t.buffered.length-1):t.dispatchEvent(new Event("ended")))},d,u,c=()=>{let e=iX(t),i,a;e.length>0&&(i=e.start(0),a=e.end(0)),(u!==a||d!==i)&&t.dispatchEvent(new CustomEvent("seekablechange",{composed:!0})),d=i,u=a};if(t1(t,"durationchange",c),t&&n){let i=t3(e);if("string"==typeof s){if(s.endsWith(".mp4")&&s.includes(o)){let e=iQ(s);iB(new URL(`https://stream.${o}/${e}/metadata.json`).toString(),t)}let n=()=>{if(iz(t)!==tq.LIVE||Number.isFinite(t.duration))return;let e=setInterval(c,1e3);t.addEventListener("teardown",()=>{clearInterval(e)},{once:!0}),t1(t,"durationchange",()=>{Number.isFinite(t.duration)&&clearInterval(e)})},l=async()=>iU(s,t,i).then(n).catch(i=>{if(i instanceof Response){let a=ik(i,tB.VIDEO,e);if(a)return void ar(t,a)}});if("none"===t.preload){let e=()=>{l(),t.removeEventListener("loadedmetadata",i)},i=()=>{l(),t.removeEventListener("play",e)};t1(t,"play",e,{once:!0}),t1(t,"loadedmetadata",i,{once:!0})}else l();null!=(a=e.tokens)&&a.drm?((e,t)=>{let i=async i=>{let a=await navigator.requestMediaKeySystemAccess("com.apple.fps",[{initDataTypes:[i],videoCapabilities:[{contentType:"application/vnd.apple.mpegurl",robustness:""}],distinctiveIdentifier:"not-allowed",persistentState:"not-allowed",sessionTypes:["temporary"]}]).then(t=>{var i;return null==(i=e.drmTypeCb)||i.call(e,ix.FAIRPLAY),t}).catch(()=>{let e=new tF(ie("Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser."),tF.MEDIA_ERR_ENCRYPTED,!0);e.errorCategory=tB.DRM,e.muxCode=tH.ENCRYPTED_UNSUPPORTED_KEY_SYSTEM,ar(t,e)});if(!a)return;let r=await a.createMediaKeys();try{let t=await i8(ae(e,"fairplay")).catch(t=>{if(t instanceof Response){let i=ik(t,tB.DRM,e);return console.error("mediaError",null==i?void 0:i.message,null==i?void 0:i.context),i?Promise.reject(i):Promise.reject(Error("Unexpected error in app cert request"))}return Promise.reject(t)});await r.setServerCertificate(t).catch(()=>{let e=ie("Your server certificate failed when attempting to set it. This may be an issue with a no longer valid certificate."),t=new tF(e,tF.MEDIA_ERR_ENCRYPTED,!0);return t.errorCategory=tB.DRM,t.muxCode=tH.ENCRYPTED_UPDATE_SERVER_CERT_FAILED,Promise.reject(t)})}catch(e){ar(t,e);return}await t.setMediaKeys(r)},a=async(i,a)=>{let r=t.mediaKeys.createSession(),n=()=>{r.keyStatuses.forEach(e=>(e=>{let i;"internal-error"===e?((i=new tF(ie("The DRM Content Decryption Module system had an internal failure. Try reloading the page, upading your browser, or playing in another browser."),tF.MEDIA_ERR_ENCRYPTED,!0)).errorCategory=tB.DRM,i.muxCode=tH.ENCRYPTED_CDM_ERROR):("output-restricted"===e||"output-downscaled"===e)&&((i=new tF(ie("DRM playback is being attempted in an environment that is not sufficiently secure. User may see black screen."),tF.MEDIA_ERR_ENCRYPTED,!1)).errorCategory=tB.DRM,i.muxCode=tH.ENCRYPTED_OUTPUT_RESTRICTED),i&&ar(t,i)})(e))},s=async i=>{let a=i.message;try{let i=await i6(a,i7(e,"fairplay"));try{await r.update(i)}catch{let e=ie("Failed to update DRM license. This may be an issue with the player or your protected content."),i=new tF(e,tF.MEDIA_ERR_ENCRYPTED,!0);i.errorCategory=tB.DRM,i.muxCode=tH.ENCRYPTED_UPDATE_LICENSE_FAILED,ar(t,i)}}catch(i){if(i instanceof Response){let a=ik(i,tB.DRM,e);if(console.error("mediaError",null==a?void 0:a.message,null==a?void 0:a.context),a)return void ar(t,a);console.error("Unexpected error in license key request",i);return}console.error(i)}};r.addEventListener("keystatuseschange",n),r.addEventListener("message",s),t.addEventListener("teardown",()=>{r.removeEventListener("keystatuseschange",n),r.removeEventListener("message",s),r.close()},{once:!0}),await r.generateRequest(i,a).catch(e=>{console.error("Failed to generate license request",e);let t=new tF(ie("Failed to generate a DRM license request. This may be an issue with the player or your protected content."),tF.MEDIA_ERR_ENCRYPTED,!0);return t.errorCategory=tB.DRM,t.muxCode=tH.ENCRYPTED_GENERATE_REQUEST_FAILED,Promise.reject(t)})};t1(t,"encrypted",async e=>{try{let r=e.initDataType;if("skd"!==r)return void console.error(`Received unexpected initialization data type "${r}"`);t.mediaKeys||await i(r);let n=e.initData;if(null==n)return void console.error(`Could not start encrypted playback due to missing initData in ${e.type} event`);await a(r,n)}catch(e){ar(t,e);return}})})(e,t):t1(t,"encrypted",()=>{let e=new tF(ie("Attempting to play DRM-protected content without providing a DRM token."),tF.MEDIA_ERR_ENCRYPTED,!0);e.errorCategory=tB.DRM,e.muxCode=tH.ENCRYPTED_MISSING_TOKEN,ar(t,e)},{once:!0}),t.setAttribute("src",s),e.startTime&&((null!=(r=iF.get(t))?r:{}).startTime=e.startTime,t.addEventListener("durationchange",ai,{once:!0}))}else t.removeAttribute("src");t.addEventListener("error",aa),t.addEventListener("error",an),t.addEventListener("emptied",()=>{t.querySelectorAll("track[data-removeondestroy]").forEach(e=>{e.remove()})},{once:!0}),t1(t,"pause",l),t1(t,"seeked",l),t1(t,"play",()=>{t.ended||i0(t.currentTime,t.duration)&&(t.currentTime=t.seekable.length?t.seekable.start(0):0)})}else i&&s?(i.once(tU.Events.LEVEL_LOADED,(e,a)=>{((e,t,i)=>{var a,r,n,s,o,l,d,u;let{streamType:c,targetLiveWindow:h,liveEdgeStartOffset:m,lowLatency:v}=(e=>{var t;let i=e.type,a=t4(i),r=t5(i),n,s=!!(null!=(t=e.partList)&&t.length);return a===tq.LIVE&&(n=s?2*e.partTarget:3*e.targetduration),{streamType:a,targetLiveWindow:r,liveEdgeStartOffset:n,lowLatency:s}})(e);if(c===tq.LIVE){v?(i.config.backBufferLength=null!=(a=i.userConfig.backBufferLength)?a:4,i.config.maxFragLookUpTolerance=null!=(r=i.userConfig.maxFragLookUpTolerance)?r:.001,i.config.abrBandWidthUpFactor=null!=(n=i.userConfig.abrBandWidthUpFactor)?n:i.config.abrBandWidthFactor):i.config.backBufferLength=null!=(s=i.userConfig.backBufferLength)?s:8;let e=Object.freeze({get length(){return t.seekable.length},start:e=>t.seekable.start(e),end(e){var a;return e>this.length||e<0||Number.isFinite(t.duration)?t.seekable.end(e):null!=(a=i.liveSyncPosition)?a:t.seekable.end(e)}});(null!=(o=iF.get(t))?o:{}).seekable=e}(null!=(l=iF.get(t))?l:{}).liveEdgeStartOffset=m,(null!=(d=iF.get(t))?d:{}).targetLiveWindow=h,t.dispatchEvent(new CustomEvent("targetlivewindowchange",{composed:!0,bubbles:!0})),(null!=(u=iF.get(t))?u:{}).streamType=c,t.dispatchEvent(new CustomEvent("streamtypechange",{composed:!0,bubbles:!0}))})(a.details,t,i),c(),iz(t)!==tq.LIVE||Number.isFinite(t.duration)||(i.on(tU.Events.LEVEL_UPDATED,c),t1(t,"durationchange",()=>{Number.isFinite(t.duration)&&i.off(tU.Events.LEVELS_UPDATED,c)}))}),i.on(tU.Events.ERROR,(a,r)=>{var n,s;let o=ag(r,e);if(o.muxCode===tH.NETWORK_NOT_READY){let e=null!=(n=iF.get(t))?n:{},a=null!=(s=e.retryCount)?s:0;if(a<6){let n=0===a?5e3:6e4,s=new tF(`Retrying in ${n/1e3} seconds...`,o.code,o.fatal);Object.assign(s,o),ar(t,s),setTimeout(()=>{e.retryCount=a+1,"manifestLoadError"===r.details&&r.url&&i.loadSource(r.url)},n);return}{e.retryCount=0;let i=new tF('Try again later or <a href="#" onclick="window.location.reload(); return false;" style="color: #4a90e2;">click here to retry</a>',o.code,o.fatal);Object.assign(i,o),ar(t,i);return}}ar(t,o)}),i.on(tU.Events.MANIFEST_LOADED,()=>{let e=iF.get(t);e&&e.error&&(e.error=null,e.retryCount=0,t.dispatchEvent(new Event("emptied")),t.dispatchEvent(new Event("loadstart")))}),t.addEventListener("error",an),t1(t,"waiting",l),function(e,t){var i;if(!("videoTracks"in e))return;let a=new WeakMap;t.on(tU.Events.MANIFEST_PARSED,function(t,i){n();let r=e.addVideoTrack("main");for(let[e,t]of(r.selected=!0,i.levels.entries())){let i=r.addRendition(t.url[0],t.width,t.height,t.videoCodec,t.bitrate);a.set(t,`${e}`),i.id=`${e}`}}),t.on(tU.Events.AUDIO_TRACKS_UPDATED,function(t,i){for(let t of(r(),i.audioTracks)){let i=t.default?"main":"alternative",a=e.addAudioTrack(i,t.name,t.lang);a.id=`${t.id}`,t.default&&(a.enabled=!0)}}),e.audioTracks.addEventListener("change",()=>{var i;let a=+(null==(i=[...e.audioTracks].find(e=>e.enabled))?void 0:i.id),r=t.audioTracks.map(e=>e.id);a!=t.audioTrack&&r.includes(a)&&(t.audioTrack=a)}),t.on(tU.Events.LEVELS_UPDATED,function(t,i){var r;let n=e.videoTracks[null!=(r=e.videoTracks.selectedIndex)?r:0];if(!n)return;let s=i.levels.map(e=>a.get(e));for(let t of e.videoRenditions)t.id&&!s.includes(t.id)&&n.removeRendition(t)}),null==(i=e.videoRenditions)||i.addEventListener("change",e=>{let i=e.target.selectedIndex;i!=t.nextLevel&&(t.nextLevel=i)});let r=()=>{for(let t of e.audioTracks)e.removeAudioTrack(t)},n=()=>{(()=>{for(let t of e.videoTracks)e.removeVideoTrack(t)})(),r()};t.once(tU.Events.DESTROYING,n)}(e,i),function(e,t){t.on(tU.Events.NON_NATIVE_TEXT_TRACKS_FOUND,(i,{tracks:a})=>{a.forEach(i=>{var a,r;let n=null!=(a=i.subtitleTrack)?a:i.closedCaptions,s=t.subtitleTracks.findIndex(({lang:e,name:t,type:a})=>e==(null==n?void 0:n.lang)&&t===i.label&&a.toLowerCase()===i.kind),o=(null!=(r=i._id)?r:i.default)?"default":`${i.kind}${s}`;io(e,i.kind,i.label,null==n?void 0:n.lang,o,i.default)})});let i=()=>{if(!t.subtitleTracks.length)return;let i=Array.from(e.textTracks).find(e=>e.id&&"showing"===e.mode&&["subtitles","captions"].includes(e.kind));if(!i)return;let a=t.subtitleTracks[t.subtitleTrack],r=a?a.default?"default":`${t.subtitleTracks[t.subtitleTrack].type.toLowerCase()}${t.subtitleTrack}`:void 0;if(t.subtitleTrack<0||(null==i?void 0:i.id)!==r){let e=t.subtitleTracks.findIndex(({lang:e,name:t,type:a,default:r})=>"default"===i.id&&r||e==i.language&&t===i.label&&a.toLowerCase()===i.kind);t.subtitleTrack=e}(null==i?void 0:i.id)===r&&i.cues&&Array.from(i.cues).forEach(e=>{i.addCue(e)})};e.textTracks.addEventListener("change",i),t.on(tU.Events.CUES_PARSED,(t,{track:i,cues:a})=>{let r=e.textTracks.getTrackById(i);if(!r)return;let n="disabled"===r.mode;n&&(r.mode="hidden"),a.forEach(e=>{var t;null!=(t=r.cues)&&t.getCueById(e.id)||r.addCue(e)}),n&&(r.mode="disabled")}),t.once(tU.Events.DESTROYING,()=>{e.textTracks.removeEventListener("change",i),e.querySelectorAll("track[data-removeondestroy]").forEach(e=>{e.remove()})});let a=()=>{Array.from(e.textTracks).forEach(t=>{var i,a;if(!["subtitles","caption"].includes(t.kind)&&("thumbnails"===t.label||"chapters"===t.kind)){if(!(null!=(i=t.cues)&&i.length)){let i="track";t.kind&&(i+=`[kind="${t.kind}"]`),t.label&&(i+=`[label="${t.label}"]`);let r=e.querySelector(i),n=null!=(a=null==r?void 0:r.getAttribute("src"))?a:"";null==r||r.removeAttribute("src"),setTimeout(()=>{null==r||r.setAttribute("src",n)},0)}"hidden"!==t.mode&&(t.mode="hidden")}})};t.once(tU.Events.MANIFEST_LOADED,a),t.once(tU.Events.MEDIA_ATTACHED,a)}(t,i),i.attachMedia(t)):console.error("It looks like the video you're trying to play will not work on this system! If possible, try upgrading to the newest versions of your browser or software.")})(e,t,u),iv(t),iT(t);let h=((e,t,i)=>{let{autoplay:a}=e,r=!1,n=!1,s=ia(a)?a:!!a,o=()=>{r||t1(t,"playing",()=>{r=!0},{once:!0})};if(o(),t1(t,"loadstart",()=>{r=!1,o(),ir(t,s)},{once:!0}),t1(t,"loadstart",()=>{i||(n=e.streamType&&e.streamType!==tq.UNKNOWN?e.streamType===tq.LIVE:!Number.isFinite(t.duration)),ir(t,s)},{once:!0}),i&&i.once(tU.Events.LEVEL_LOADED,(t,i)=>{var a;n=e.streamType&&e.streamType!==tq.UNKNOWN?e.streamType===tq.LIVE:null!=(a=i.details.live)&&a}),!s){let a=()=>{!n||Number.isFinite(e.startTime)||(null!=i&&i.liveSyncPosition?t.currentTime=i.liveSyncPosition:Number.isFinite(t.seekable.end(0))&&(t.currentTime=t.seekable.end(0)))};i&&t1(t,"play",()=>{"metadata"===t.preload?i.once(tU.Events.LEVEL_UPDATED,a):a()},{once:!0})}return e=>{r||ir(t,s=ia(e)?e:!!e)}})(e,t,u);return{engine:u,setAutoplay:h,setPreload:c}})(this,this.nativeEl,aT(this,as)))}unload(){i3(this.nativeEl,aT(this,as),this),ak(this,as,void 0)}attributeChangedCallback(e,t,i){var a,r;switch(af.lB.observedAttributes.includes(e)&&!["src","autoplay","preload"].includes(e)&&super.attributeChangedCallback(e,t,i),e){case aR.PLAYER_SOFTWARE_NAME:this.playerSoftwareName=null!=i?i:void 0;break;case aR.PLAYER_SOFTWARE_VERSION:this.playerSoftwareVersion=null!=i?i:void 0;break;case"src":{let e=!!t,a=!!i;!e&&a?aw(this,aE,ab).call(this):e&&!a?this.unload():e&&a&&(this.unload(),aw(this,aE,ab).call(this));break}case"autoplay":if(i===t)break;null==(a=aT(this,as))||a.setAutoplay(this.autoplay);break;case"preload":if(i===t)break;null==(r=aT(this,as))||r.setPreload(i);break;case aR.PLAYBACK_ID:this.src=iG(this);break;case aR.DEBUG:{let e=this.debug;this.mux&&console.info("Cannot toggle debug mode of mux data after initialization. Make sure you set all metadata to override before setting the src."),this._hls&&(this._hls.config.debug=e);break}case aR.METADATA_URL:i&&fetch(i).then(e=>e.json()).then(e=>this.metadata=e).catch(()=>console.error(`Unable to load or parse metadata JSON from metadata-url ${i}!`));break;case aR.STREAM_TYPE:(null==i||i!==t)&&this.dispatchEvent(new CustomEvent("streamtypechange",{composed:!0,bubbles:!0}));break;case aR.TARGET_LIVE_WINDOW:(null==i||i!==t)&&this.dispatchEvent(new CustomEvent("targetlivewindowchange",{composed:!0,bubbles:!0,detail:this.targetLiveWindow}));break;case aR.LOGO:(null==i||i!==t)&&this.updateLogo();break;case aR.DISABLE_TRACKING:if(null==i||i!==t){let e=this.currentTime,t=this.paused;this.unload(),aw(this,aE,ab).call(this).then(()=>{this.currentTime=e,t||this.play()})}break;case aR.DISABLE_COOKIES:(null==i||i!==t)&&this.disableCookies&&document.cookie.split(";").forEach(e=>{e.trim().startsWith("muxData")&&(document.cookie=e.replace(/^ +/,"").replace(/=.*/,"=;expires="+new Date().toUTCString()+";path=/"))})}}updateLogo(){if(!this.shadowRoot)return;let e=this.shadowRoot.querySelector('slot[name="logo"]');e&&(e.innerHTML=this.constructor.getLogoHTML(aT(this,av)||this.logo))}connectedCallback(){var e;null==(e=super.connectedCallback)||e.call(this),this.nativeEl&&this.src&&!aT(this,as)&&aw(this,aE,ab).call(this)}disconnectedCallback(){this.unload()}handleEvent(e){e.target===this.nativeEl&&this.dispatchEvent(new CustomEvent(e.type,{composed:!0,detail:e.detail}))}};as=new WeakMap,ao=new WeakMap,al=new WeakMap,ad=new WeakMap,au=new WeakMap,ac=new WeakMap,ah=new WeakMap,am=new WeakMap,ap=new WeakMap,av=new WeakMap,aE=new WeakSet,ab=async function(){aT(this,ao)||(await ak(this,ao,Promise.resolve()),ak(this,ao,null),this.load())};let aM=new WeakMap;class aO extends Error{}class ax extends Error{}let aN=["application/x-mpegURL","application/vnd.apple.mpegurl","audio/mpegurl"];function aP(){return globalThis.cast?.framework?.CastContext.getInstance()}function aU(){return aP()?.getCurrentSession()}function aB(){return aU()?.getSessionObj().media[0]}function aH(e){return aP().setOptions({...aW(),...e})}function aW(){return{receiverApplicationId:"CC1AD845",autoJoinPolicy:"origin_scoped",androidReceiverCompatible:!1,language:"en-US",resumeSavedSession:!0}}async function aV(e){try{let t=(await fetch(e,{method:"HEAD"})).headers.get("Content-Type");return aN.some(e=>t===e)}catch(e){return console.error("Error while trying to get the Content-Type of the manifest",e),!1}}async function aF(e){try{let i=await (await fetch(e)).text(),a=i,r=function(e){let t=e.split("\n"),i=[];for(let e=0;e<t.length;e++)if(t[e].trim().startsWith("#EXT-X-STREAM-INF")){let a=t[e+1]?t[e+1].trim():"";a&&!a.startsWith("#")&&i.push(a)}return i}(i);if(r.length>0){let t=new URL(r[0],e).toString();a=await (await fetch(t)).text()}var t=a.split("\n").find(e=>!e.trim().startsWith("#")&&""!==e.trim());if(!t)return;let n=t.match(/\.([a-zA-Z0-9]+)(?:\?.*)?$/);return n?n[1]:null}catch(e){console.error("Error while trying to parse the manifest playlist",e);return}}let a$=new(globalThis.WeakRef?class extends Set{add(e){super.add(new WeakRef(e))}forEach(e){super.forEach(t=>{let i=t.deref();i&&e(i)})}}:Set),aK=new WeakSet;!function(e){globalThis.chrome?.cast?.isAvailable?globalThis.cast?.framework?e():customElements.whenDefined("google-cast-button").then(e):globalThis.__onGCastApiAvailable=()=>{customElements.whenDefined("google-cast-button").then(e)}}(()=>{if(!globalThis.chrome?.cast?.isAvailable)return void console.debug("chrome.cast.isAvailable",globalThis.chrome?.cast?.isAvailable);a||(a=cast.framework,aP().addEventListener(a.CastContextEventType.CAST_STATE_CHANGED,e=>{a$.forEach(t=>aM.get(t).onCastStateChanged?.(e))}),aP().addEventListener(a.CastContextEventType.SESSION_STATE_CHANGED,e=>{a$.forEach(t=>aM.get(t).onSessionStateChanged?.(e))}),a$.forEach(e=>aM.get(e).init?.()))});let aq=0;class aY extends EventTarget{#e;#t;#i;#a;#r="disconnected";#n=!1;#s=new Set;#o=new WeakMap;constructor(e){super(),this.#e=e,a$.add(this),aM.set(this,{init:()=>this.#l(),onCastStateChanged:()=>this.#d(),onSessionStateChanged:()=>this.#u(),getCastPlayer:()=>this.#c}),this.#l()}get #c(){if(aK.has(this.#e))return this.#i}get state(){return this.#r}async watchAvailability(e){if(this.#e.disableRemotePlayback)throw new aO("disableRemotePlayback attribute is present.");return this.#o.set(e,++aq),this.#s.add(e),queueMicrotask(()=>e(this.#h())),aq}async cancelWatchAvailability(e){if(this.#e.disableRemotePlayback)throw new aO("disableRemotePlayback attribute is present.");e?this.#s.delete(e):this.#s.clear()}async prompt(){if(this.#e.disableRemotePlayback)throw new aO("disableRemotePlayback attribute is present.");if(!globalThis.chrome?.cast?.isAvailable)throw new ax("The RemotePlayback API is disabled on this platform.");let e=aK.has(this.#e);aK.add(this.#e),aH(this.#e.castOptions),Object.entries(this.#a).forEach(([e,t])=>{this.#i.controller.addEventListener(e,t)});try{await aP().requestSession()}catch(t){if(e||aK.delete(this.#e),"cancel"===t)return;throw Error(t)}aM.get(this.#e)?.loadOnPrompt?.()}#m(){aK.has(this.#e)&&(Object.entries(this.#a).forEach(([e,t])=>{this.#i.controller.removeEventListener(e,t)}),aK.delete(this.#e),this.#e.muted=this.#i.isMuted,this.#e.currentTime=this.#i.savedPlayerState.currentTime,!1===this.#i.savedPlayerState.isPaused&&this.#e.play())}#h(){let e=aP()?.getCastState();return e&&"NO_DEVICES_AVAILABLE"!==e}#d(){let e=aP().getCastState();if(aK.has(this.#e)&&"CONNECTING"===e&&(this.#r="connecting",this.dispatchEvent(new Event("connecting"))),!this.#n&&e?.includes("CONNECT"))for(let e of(this.#n=!0,this.#s))e(!0);else if(this.#n&&(!e||"NO_DEVICES_AVAILABLE"===e))for(let e of(this.#n=!1,this.#s))e(!1)}async #u(){let{SESSION_RESUMED:e}=a.SessionState;if(aP().getSessionState()===e&&this.#e.castSrc===aB()?.media.contentId){aK.add(this.#e),Object.entries(this.#a).forEach(([e,t])=>{this.#i.controller.addEventListener(e,t)});try{var t;await (t=new chrome.cast.media.GetStatusRequest,new Promise((e,i)=>{aB().getStatus(t,e,i)}))}catch(e){console.error(e)}this.#a[a.RemotePlayerEventType.IS_PAUSED_CHANGED](),this.#a[a.RemotePlayerEventType.PLAYER_STATE_CHANGED]()}}#l(){a&&!this.#t&&(this.#t=!0,aH(this.#e.castOptions),this.#e.textTracks.addEventListener("change",()=>this.#p()),this.#d(),this.#i=new a.RemotePlayer,new a.RemotePlayerController(this.#i),this.#a={[a.RemotePlayerEventType.IS_CONNECTED_CHANGED]:({value:e})=>{!0===e?(this.#r="connected",this.dispatchEvent(new Event("connect"))):(this.#m(),this.#r="disconnected",this.dispatchEvent(new Event("disconnect")))},[a.RemotePlayerEventType.DURATION_CHANGED]:()=>{this.#e.dispatchEvent(new Event("durationchange"))},[a.RemotePlayerEventType.VOLUME_LEVEL_CHANGED]:()=>{this.#e.dispatchEvent(new Event("volumechange"))},[a.RemotePlayerEventType.IS_MUTED_CHANGED]:()=>{this.#e.dispatchEvent(new Event("volumechange"))},[a.RemotePlayerEventType.CURRENT_TIME_CHANGED]:()=>{this.#c?.isMediaLoaded&&this.#e.dispatchEvent(new Event("timeupdate"))},[a.RemotePlayerEventType.VIDEO_INFO_CHANGED]:()=>{this.#e.dispatchEvent(new Event("resize"))},[a.RemotePlayerEventType.IS_PAUSED_CHANGED]:()=>{this.#e.dispatchEvent(new Event(this.paused?"pause":"play"))},[a.RemotePlayerEventType.PLAYER_STATE_CHANGED]:()=>{this.#c?.playerState!==chrome.cast.media.PlayerState.PAUSED&&this.#e.dispatchEvent(new Event({[chrome.cast.media.PlayerState.PLAYING]:"playing",[chrome.cast.media.PlayerState.BUFFERING]:"waiting",[chrome.cast.media.PlayerState.IDLE]:"emptied"}[this.#c?.playerState]))},[a.RemotePlayerEventType.IS_MEDIA_LOADED_CHANGED]:async()=>{this.#c?.isMediaLoaded&&(await Promise.resolve(),this.#v())}})}#v(){this.#p()}async #p(){let e;if(!this.#c)return;let t=(this.#i.mediaInfo?.tracks??[]).filter(({type:e})=>e===chrome.cast.media.TrackType.TEXT),i=[...this.#e.textTracks].filter(({kind:e})=>"subtitles"===e||"captions"===e),a=t.map(({language:e,name:t,trackId:a})=>{let{mode:r}=i.find(i=>i.language===e&&i.label===t)??{};return!!r&&{mode:r,trackId:a}}).filter(Boolean),r=a.filter(({mode:e})=>"showing"!==e).map(({trackId:e})=>e),n=a.find(({mode:e})=>"showing"===e),s=aU()?.getSessionObj().media[0]?.activeTrackIds??[],o=s;if(s.length&&(o=o.filter(e=>!r.includes(e))),n?.trackId&&(o=[...o,n.trackId]),e=o=[...new Set(o)],!(s.length===e.length&&s.every(t=>e.includes(t))))try{let e=new chrome.cast.media.EditTracksInfoRequest(o);await new Promise((t,i)=>{aB().editTracksInfo(e,t,i)})}catch(e){console.error(e)}}}let aG=e=>class extends e{static observedAttributes=[...e.observedAttributes??[],"cast-src","cast-content-type","cast-stream-type","cast-receiver"];#E={paused:!1};#b=aW();#g;#f;get remote(){return this.#f?this.#f:globalThis.chrome?(this.disableRemotePlayback||function(){let e="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1";if(globalThis.chrome?.cast||document.querySelector(`script[src="${e}"]`))return;let t=document.createElement("script");t.src=e,document.head.append(t)}(),aM.set(this,{loadOnPrompt:()=>this.#_()}),this.#f=new aY(this)):super.remote}get #c(){return aM.get(this.remote)?.getCastPlayer?.()}attributeChangedCallback(e,t,i){if(super.attributeChangedCallback(e,t,i),"cast-receiver"===e&&i){this.#b.receiverApplicationId=i;return}if(this.#c)switch(e){case"cast-stream-type":case"cast-src":this.load()}}async #_(){this.#E.paused=super.paused,super.pause(),this.muted=super.muted;try{await this.load()}catch(e){console.error(e)}}async load(){if(!this.#c)return super.load();let e=new chrome.cast.media.MediaInfo(this.castSrc,this.castContentType);e.customData=this.castCustomData;let t=[...this.querySelectorAll("track")].filter(({kind:e,src:t})=>t&&("subtitles"===e||"captions"===e)),i=[],a=0;if(t.length&&(e.tracks=t.map(e=>{let t=++a;0===i.length&&"showing"===e.track.mode&&i.push(t);let r=new chrome.cast.media.Track(t,chrome.cast.media.TrackType.TEXT);return r.trackContentId=e.src,r.trackContentType="text/vtt",r.subtype="captions"===e.kind?chrome.cast.media.TextTrackType.CAPTIONS:chrome.cast.media.TextTrackType.SUBTITLES,r.name=e.label,r.language=e.srclang,r})),"live"===this.castStreamType?e.streamType=chrome.cast.media.StreamType.LIVE:e.streamType=chrome.cast.media.StreamType.BUFFERED,e.metadata=new chrome.cast.media.GenericMediaMetadata,e.metadata.title=this.title,e.metadata.images=[{url:this.poster}],aV(this.castSrc)){let t=await aF(this.castSrc);t?.includes("m4s")||t?.includes("mp4")?(e.hlsSegmentFormat=chrome.cast.media.HlsSegmentFormat.FMP4,e.hlsVideoSegmentFormat=chrome.cast.media.HlsVideoSegmentFormat.FMP4):t?.includes("ts")&&(e.hlsSegmentFormat=chrome.cast.media.HlsSegmentFormat.TS,e.hlsVideoSegmentFormat=chrome.cast.media.HlsVideoSegmentFormat.TS)}let r=new chrome.cast.media.LoadRequest(e);r.currentTime=super.currentTime??0,r.autoplay=!this.#E.paused,r.activeTrackIds=i,await aU()?.loadMedia(r),this.dispatchEvent(new Event("volumechange"))}play(){if(this.#c){this.#c.isPaused&&this.#c.controller?.playOrPause();return}return super.play()}pause(){if(this.#c){this.#c.isPaused||this.#c.controller?.playOrPause();return}super.pause()}get castOptions(){return this.#b}get castReceiver(){return this.getAttribute("cast-receiver")??void 0}set castReceiver(e){this.castReceiver!=e&&this.setAttribute("cast-receiver",`${e}`)}get castSrc(){return this.getAttribute("cast-src")??this.querySelector("source")?.src??this.currentSrc}set castSrc(e){this.castSrc!=e&&this.setAttribute("cast-src",`${e}`)}get castContentType(){return this.getAttribute("cast-content-type")??void 0}set castContentType(e){this.setAttribute("cast-content-type",`${e}`)}get castStreamType(){return this.getAttribute("cast-stream-type")??this.streamType??void 0}set castStreamType(e){this.setAttribute("cast-stream-type",`${e}`)}get castCustomData(){return this.#g}set castCustomData(e){let t=typeof e;if(!["object","undefined"].includes(t))return void console.error(`castCustomData must be nullish or an object but value was of type ${t}`);this.#g=e}get readyState(){if(this.#c)switch(this.#c.playerState){case chrome.cast.media.PlayerState.IDLE:return 0;case chrome.cast.media.PlayerState.BUFFERING:return 2;default:return 3}return super.readyState}get paused(){return this.#c?this.#c.isPaused:super.paused}get muted(){return this.#c?this.#c?.isMuted:super.muted}set muted(e){if(this.#c){(e&&!this.#c.isMuted||!e&&this.#c.isMuted)&&this.#c.controller?.muteOrUnmute();return}super.muted=e}get volume(){return this.#c?this.#c?.volumeLevel??1:super.volume}set volume(e){if(this.#c){this.#c.volumeLevel=+e,this.#c.controller?.setVolumeLevel();return}super.volume=e}get duration(){return this.#c&&this.#c?.isMediaLoaded?this.#c?.duration??NaN:super.duration}get currentTime(){return this.#c&&this.#c?.isMediaLoaded?this.#c?.currentTime??0:super.currentTime}set currentTime(e){if(this.#c){this.#c.currentTime=e,this.#c.controller?.seek();return}super.currentTime=e}};var aj=i(24201),aQ=e=>{throw TypeError(e)},aZ=(e,t,i)=>t.has(e)||aQ("Cannot "+i),az=(e,t,i)=>(aZ(e,t,"read from private field"),i?i.call(e):t.get(e)),aX=(e,t,i)=>t.has(e)?aQ("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,i),aJ=(e,t,i,a)=>(aZ(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),a0=class{addEventListener(){}removeEventListener(){}dispatchEvent(e){return!0}};if("undefined"==typeof DocumentFragment){class e extends a0{}globalThis.DocumentFragment=e}var a1,a2=class extends a0{},a3=class{constructor(e,t={}){aX(this,a1),aJ(this,a1,null==t?void 0:t.detail)}get detail(){return az(this,a1)}initCustomEvent(){}};a1=new WeakMap;var a4={document:{createElement:function(e,t){return new a2}},DocumentFragment,customElements:{get(e){},define(e,t,i){},getName:e=>null,upgrade(e){},whenDefined:e=>Promise.resolve(a2)},CustomEvent:a3,EventTarget:a0,HTMLElement:a2,HTMLVideoElement:class extends a0{}},a5="undefined"==typeof window||void 0===globalThis.customElements,a9=a5?a4:globalThis;a5?a4.document:globalThis.document;var a8,a6=class extends aG((0,aj.u6)(aC)){constructor(){super(...arguments),aX(this,a8)}get autoplay(){let e=this.getAttribute("autoplay");return null!==e&&(""===e||e)}set autoplay(e){e!==this.autoplay&&(e?this.setAttribute("autoplay","string"==typeof e?e:""):this.removeAttribute("autoplay"))}get muxCastCustomData(){return{mux:{playbackId:this.playbackId,minResolution:this.minResolution,maxResolution:this.maxResolution,renditionOrder:this.renditionOrder,customDomain:this.customDomain,tokens:{drm:this.drmToken},envKey:this.envKey,metadata:this.metadata,disableCookies:this.disableCookies,disableTracking:this.disableTracking,beaconCollectionDomain:this.beaconCollectionDomain,startTime:this.startTime,preferCmcd:this.preferCmcd}}}get castCustomData(){var e;return null!=(e=az(this,a8))?e:this.muxCastCustomData}set castCustomData(e){aJ(this,a8,e)}};a8=new WeakMap,a9.customElements.get("mux-video")||(a9.customElements.define("mux-video",a6),a9.MuxVideoElement=a6);let a7={MEDIA_PLAY_REQUEST:"mediaplayrequest",MEDIA_PAUSE_REQUEST:"mediapauserequest",MEDIA_MUTE_REQUEST:"mediamuterequest",MEDIA_UNMUTE_REQUEST:"mediaunmuterequest",MEDIA_LOOP_REQUEST:"medialooprequest",MEDIA_VOLUME_REQUEST:"mediavolumerequest",MEDIA_SEEK_REQUEST:"mediaseekrequest",MEDIA_AIRPLAY_REQUEST:"mediaairplayrequest",MEDIA_ENTER_FULLSCREEN_REQUEST:"mediaenterfullscreenrequest",MEDIA_EXIT_FULLSCREEN_REQUEST:"mediaexitfullscreenrequest",MEDIA_PREVIEW_REQUEST:"mediapreviewrequest",MEDIA_ENTER_PIP_REQUEST:"mediaenterpiprequest",MEDIA_EXIT_PIP_REQUEST:"mediaexitpiprequest",MEDIA_ENTER_CAST_REQUEST:"mediaentercastrequest",MEDIA_EXIT_CAST_REQUEST:"mediaexitcastrequest",MEDIA_SHOW_TEXT_TRACKS_REQUEST:"mediashowtexttracksrequest",MEDIA_HIDE_TEXT_TRACKS_REQUEST:"mediahidetexttracksrequest",MEDIA_SHOW_SUBTITLES_REQUEST:"mediashowsubtitlesrequest",MEDIA_DISABLE_SUBTITLES_REQUEST:"mediadisablesubtitlesrequest",MEDIA_TOGGLE_SUBTITLES_REQUEST:"mediatogglesubtitlesrequest",MEDIA_PLAYBACK_RATE_REQUEST:"mediaplaybackraterequest",MEDIA_RENDITION_REQUEST:"mediarenditionrequest",MEDIA_AUDIO_TRACK_REQUEST:"mediaaudiotrackrequest",MEDIA_SEEK_TO_LIVE_REQUEST:"mediaseektoliverequest",REGISTER_MEDIA_STATE_RECEIVER:"registermediastatereceiver",UNREGISTER_MEDIA_STATE_RECEIVER:"unregistermediastatereceiver"},re={MEDIA_CHROME_ATTRIBUTES:"mediachromeattributes",MEDIA_CONTROLLER:"mediacontroller"},rt={MEDIA_AIRPLAY_UNAVAILABLE:"mediaAirplayUnavailable",MEDIA_AUDIO_TRACK_ENABLED:"mediaAudioTrackEnabled",MEDIA_AUDIO_TRACK_LIST:"mediaAudioTrackList",MEDIA_AUDIO_TRACK_UNAVAILABLE:"mediaAudioTrackUnavailable",MEDIA_BUFFERED:"mediaBuffered",MEDIA_CAST_UNAVAILABLE:"mediaCastUnavailable",MEDIA_CHAPTERS_CUES:"mediaChaptersCues",MEDIA_CURRENT_TIME:"mediaCurrentTime",MEDIA_DURATION:"mediaDuration",MEDIA_ENDED:"mediaEnded",MEDIA_ERROR:"mediaError",MEDIA_ERROR_CODE:"mediaErrorCode",MEDIA_ERROR_MESSAGE:"mediaErrorMessage",MEDIA_FULLSCREEN_UNAVAILABLE:"mediaFullscreenUnavailable",MEDIA_HAS_PLAYED:"mediaHasPlayed",MEDIA_HEIGHT:"mediaHeight",MEDIA_IS_AIRPLAYING:"mediaIsAirplaying",MEDIA_IS_CASTING:"mediaIsCasting",MEDIA_IS_FULLSCREEN:"mediaIsFullscreen",MEDIA_IS_PIP:"mediaIsPip",MEDIA_LOADING:"mediaLoading",MEDIA_MUTED:"mediaMuted",MEDIA_LOOP:"mediaLoop",MEDIA_PAUSED:"mediaPaused",MEDIA_PIP_UNAVAILABLE:"mediaPipUnavailable",MEDIA_PLAYBACK_RATE:"mediaPlaybackRate",MEDIA_PREVIEW_CHAPTER:"mediaPreviewChapter",MEDIA_PREVIEW_COORDS:"mediaPreviewCoords",MEDIA_PREVIEW_IMAGE:"mediaPreviewImage",MEDIA_PREVIEW_TIME:"mediaPreviewTime",MEDIA_RENDITION_LIST:"mediaRenditionList",MEDIA_RENDITION_SELECTED:"mediaRenditionSelected",MEDIA_RENDITION_UNAVAILABLE:"mediaRenditionUnavailable",MEDIA_SEEKABLE:"mediaSeekable",MEDIA_STREAM_TYPE:"mediaStreamType",MEDIA_SUBTITLES_LIST:"mediaSubtitlesList",MEDIA_SUBTITLES_SHOWING:"mediaSubtitlesShowing",MEDIA_TARGET_LIVE_WINDOW:"mediaTargetLiveWindow",MEDIA_TIME_IS_LIVE:"mediaTimeIsLive",MEDIA_VOLUME:"mediaVolume",MEDIA_VOLUME_LEVEL:"mediaVolumeLevel",MEDIA_VOLUME_UNAVAILABLE:"mediaVolumeUnavailable",MEDIA_LANG:"mediaLang",MEDIA_WIDTH:"mediaWidth"},ri=Object.entries(rt),ra=ri.reduce((e,[t,i])=>(e[t]=i.toLowerCase(),e),{}),rr=ri.reduce((e,[t,i])=>(e[t]=i.toLowerCase(),e),{USER_INACTIVE_CHANGE:"userinactivechange",BREAKPOINTS_CHANGE:"breakpointchange",BREAKPOINTS_COMPUTED:"breakpointscomputed"});Object.entries(rr).reduce((e,[t,i])=>{let a=ra[t];return a&&(e[i]=a),e},{userinactivechange:"userinactive"});let rn=Object.entries(ra).reduce((e,[t,i])=>{let a=rr[t];return a&&(e[i]=a),e},{userinactive:"userinactivechange"}),rs={SUBTITLES:"subtitles",CAPTIONS:"captions",CHAPTERS:"chapters",METADATA:"metadata"},ro={DISABLED:"disabled",SHOWING:"showing"},rl={MOUSE:"mouse",PEN:"pen",TOUCH:"touch"},rd={UNAVAILABLE:"unavailable",UNSUPPORTED:"unsupported"},ru={LIVE:"live",ON_DEMAND:"on-demand",UNKNOWN:"unknown"},rc={FULLSCREEN:"fullscreen"};function rh(e){if(e){let{id:t,width:i,height:a}=e;return[t,i,a].filter(e=>null!=e).join(":")}}function rm(e){if(e){let[t,i,a]=e.split(":");return{id:t,width:+i,height:+a}}}function rp(e){if(e){let{id:t,kind:i,language:a,label:r}=e;return[t,i,a,r].filter(e=>null!=e).join(":")}}function rv(e){if(e){let[t,i,a,r]=e.split(":");return{id:t,kind:i,language:a,label:r}}}function rE(e){return"number"==typeof e&&!Number.isNaN(e)&&Number.isFinite(e)}function rb(e){return"string"==typeof e&&!isNaN(e)&&!isNaN(parseFloat(e))}let rg=e=>new Promise(t=>setTimeout(t,e)),rf=[{singular:"hour",plural:"hours"},{singular:"minute",plural:"minutes"},{singular:"second",plural:"seconds"}],r_=e=>{if(!rE(e))return"";let t=Math.abs(e),i=t!==e,a=new Date(0,0,0,0,0,t,0),r=[a.getHours(),a.getMinutes(),a.getSeconds()].map((e,t)=>e&&((e,t)=>{let i=1===e?rf[t].singular:rf[t].plural;return`${e} ${i}`})(e,t)).filter(e=>e).join(", ");return`${r}${i?" remaining":""}`};function ry(e,t){let i=!1;e<0&&(i=!0,e=0-e);let a=Math.floor((e=e<0?0:e)%60),r=Math.floor(e/60%60),n=Math.floor(e/3600),s=Math.floor(t/60%60),o=Math.floor(t/3600);return(isNaN(e)||e===1/0)&&(n=r=a="0"),r=(((n=n>0||o>0?n+":":"")||s>=10)&&r<10?"0"+r:r)+":",(i?"-":"")+n+r+(a=a<10?"0"+a:a)}Object.freeze({length:0,start(e){let t=e>>>0;if(t>=this.length)throw new DOMException(`Failed to execute 'start' on 'TimeRanges': The index provided (${t}) is greater than or equal to the maximum bound (${this.length}).`);return 0},end(e){let t=e>>>0;if(t>=this.length)throw new DOMException(`Failed to execute 'end' on 'TimeRanges': The index provided (${t}) is greater than or equal to the maximum bound (${this.length}).`);return 0}});let rT={en:{"Start airplay":"Start airplay","Stop airplay":"Stop airplay",Audio:"Audio",Captions:"Captions","Enable captions":"Enable captions","Disable captions":"Disable captions","Start casting":"Start casting","Stop casting":"Stop casting","Enter fullscreen mode":"Enter fullscreen mode","Exit fullscreen mode":"Exit fullscreen mode",Mute:"Mute",Unmute:"Unmute",Loop:"Loop","Enter picture in picture mode":"Enter picture in picture mode","Exit picture in picture mode":"Exit picture in picture mode",Play:"Play",Pause:"Pause","Playback rate":"Playback rate","Playback rate {playbackRate}":"Playback rate {playbackRate}",Quality:"Quality","Seek backward":"Seek backward","Seek forward":"Seek forward",Settings:"Settings",Auto:"Auto","audio player":"audio player","video player":"video player",volume:"volume",seek:"seek","closed captions":"closed captions","current playback rate":"current playback rate","playback time":"playback time","media loading":"media loading",settings:"settings","audio tracks":"audio tracks",quality:"quality",play:"play",pause:"pause",mute:"mute",unmute:"unmute","chapter: {chapterName}":"chapter: {chapterName}",live:"live",Off:"Off","start airplay":"start airplay","stop airplay":"stop airplay","start casting":"start casting","stop casting":"stop casting","enter fullscreen mode":"enter fullscreen mode","exit fullscreen mode":"exit fullscreen mode","enter picture in picture mode":"enter picture in picture mode","exit picture in picture mode":"exit picture in picture mode","seek to live":"seek to live","playing live":"playing live","seek back {seekOffset} seconds":"seek back {seekOffset} seconds","seek forward {seekOffset} seconds":"seek forward {seekOffset} seconds","Network Error":"Network Error","Decode Error":"Decode Error","Source Not Supported":"Source Not Supported","Encryption Error":"Encryption Error","A network error caused the media download to fail.":"A network error caused the media download to fail.","A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.":"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.","An unsupported error occurred. The server or network failed, or your browser does not support this format.":"An unsupported error occurred. The server or network failed, or your browser does not support this format.","The media is encrypted and there are no keys to decrypt it.":"The media is encrypted and there are no keys to decrypt it."}},rA=(null==(dj=globalThis.navigator)?void 0:dj.language)||"en",rk=(e,t={})=>(e=>{var t,i,a;let[r]=rA.split("-");return(null==(t=rT[rA])?void 0:t[e])||(null==(i=rT[r])?void 0:i[e])||(null==(a=rT.en)?void 0:a[e])||e})(e).replace(/\{(\w+)\}/g,(e,i)=>i in t?String(t[i]):`{${i}}`);class rw{addEventListener(){}removeEventListener(){}dispatchEvent(){return!0}}class rS extends rw{}class rI extends rS{constructor(){super(...arguments),this.role=null}}class rR{observe(){}unobserve(){}disconnect(){}}let rD={createElement:function(){return new rL.HTMLElement},createElementNS:function(){return new rL.HTMLElement},addEventListener(){},removeEventListener(){},dispatchEvent:e=>!1},rL={ResizeObserver:rR,document:rD,Node:rS,Element:rI,HTMLElement:class extends rI{constructor(){super(...arguments),this.innerHTML=""}get content(){return new rL.DocumentFragment}},DocumentFragment:class extends rw{},customElements:{get:function(){},define:function(){},whenDefined:function(){}},localStorage:{getItem:e=>null,setItem(e,t){},removeItem(e){}},CustomEvent:function(){},getComputedStyle:function(){},navigator:{languages:[],get userAgent(){return""}},matchMedia:e=>({matches:!1,media:e}),DOMParser:class{parseFromString(e,t){return{body:{textContent:e}}}}},rC="global"in globalThis&&(null==globalThis?void 0:globalThis.global)===globalThis||"undefined"==typeof window||void 0===window.customElements,rM=Object.keys(rL).every(e=>e in globalThis),rO=rC&&!rM?rL:globalThis,rx=rC&&!rM?rD:globalThis.document,rN=new WeakMap,rP=e=>{let t=rN.get(e);return t||rN.set(e,t=new Set),t},rU=new rO.ResizeObserver(e=>{for(let t of e)for(let e of rP(t.target))e(t)});function rB(e,t){rP(e).add(t),rU.observe(e)}function rH(e,t){let i=rP(e);i.delete(t),i.size||rU.unobserve(e)}function rW(e){let t={};for(let i of e)t[i.name]=i.value;return t}function rV(e){var t;return null!=(t=rF(e))?t:rY(e,"media-controller")}function rF(e){var t;let{MEDIA_CONTROLLER:i}=re,a=e.getAttribute(i);if(a)return null==(t=rj(e))?void 0:t.getElementById(a)}let r$=(e,t,i=".value")=>{let a=e.querySelector(i);a&&(a.textContent=t)},rK=(e,t)=>((e,t)=>{let i=`slot[name="${t}"]`,a=e.shadowRoot.querySelector(i);return a?a.children:[]})(e,t)[0],rq=(e,t)=>!!e&&!!t&&(null!=e&&!!e.contains(t)||rq(e,t.getRootNode().host)),rY=(e,t)=>{if(!e)return null;let i=e.closest(t);return i||rY(e.getRootNode().host,t)};function rG(e=document){var t;let i=null==e?void 0:e.activeElement;return i?null!=(t=rG(i.shadowRoot))?t:i:null}function rj(e){var t;let i=null==(t=null==e?void 0:e.getRootNode)?void 0:t.call(e);return i instanceof ShadowRoot||i instanceof Document?i:null}function rQ(e,{depth:t=3,checkOpacity:i=!0,checkVisibilityCSS:a=!0}={}){if(e.checkVisibility)return e.checkVisibility({checkOpacity:i,checkVisibilityCSS:a});let r=e;for(;r&&t>0;){let e=getComputedStyle(r);if(i&&"0"===e.opacity||a&&"hidden"===e.visibility||"none"===e.display)return!1;r=r.parentElement,t--}return!0}function rZ(e,t){let i=function(e,t){var i,a;let r;for(r of null!=(i=e.querySelectorAll("style:not([media])"))?i:[]){let e;try{e=null==(a=r.sheet)?void 0:a.cssRules}catch{continue}for(let i of null!=e?e:[])if(t(i.selectorText))return i}}(e,e=>e===t);return i||rz(e,t)}function rz(e,t){var i,a;let r=null!=(i=e.querySelectorAll("style:not([media])"))?i:[],n=null==r?void 0:r[r.length-1];return(null==n?void 0:n.sheet)?(null==n||n.sheet.insertRule(`${t}{}`,n.sheet.cssRules.length),null==(a=n.sheet.cssRules)?void 0:a[n.sheet.cssRules.length-1]):(console.warn("Media Chrome: No style sheet found on style tag of",e),{style:{setProperty:()=>{},removeProperty:()=>"",getPropertyValue:()=>""}})}function rX(e,t,i=NaN){let a=e.getAttribute(t);return null!=a?+a:i}function rJ(e,t,i){let a=+i;if(null==i||Number.isNaN(a)){e.hasAttribute(t)&&e.removeAttribute(t);return}rX(e,t,void 0)!==a&&e.setAttribute(t,`${a}`)}function r0(e,t){return e.hasAttribute(t)}function r1(e,t,i){if(null==i){e.hasAttribute(t)&&e.removeAttribute(t);return}r0(e,t)!=i&&e.toggleAttribute(t,i)}function r2(e,t,i=null){var a;return null!=(a=e.getAttribute(t))?a:i}function r3(e,t,i){if(null==i){e.hasAttribute(t)&&e.removeAttribute(t);return}let a=`${i}`;r2(e,t,void 0)!==a&&e.setAttribute(t,a)}var r4=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},r5=(e,t,i)=>(r4(e,t,"read from private field"),i?i.call(e):t.get(e)),r9=(e,t,i,a)=>(r4(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i);class r8 extends rO.HTMLElement{constructor(){if(super(),((e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)})(this,dQ,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=rW(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[re.MEDIA_CONTROLLER,ra.MEDIA_PAUSED]}attributeChangedCallback(e,t,i){var a,r,n,s,o;e===re.MEDIA_CONTROLLER&&(t&&(null==(r=null==(a=r5(this,dQ))?void 0:a.unassociateElement)||r.call(a,this),r9(this,dQ,null)),i&&this.isConnected&&(r9(this,dQ,null==(n=this.getRootNode())?void 0:n.getElementById(i)),null==(o=null==(s=r5(this,dQ))?void 0:s.associateElement)||o.call(s,this)))}connectedCallback(){var e,t,i,a;this.tabIndex=-1,this.setAttribute("aria-hidden","true"),r9(this,dQ,function(e){var t;let i=e.getAttribute(re.MEDIA_CONTROLLER);return i?null==(t=e.getRootNode())?void 0:t.getElementById(i):rY(e,"media-controller")}(this)),this.getAttribute(re.MEDIA_CONTROLLER)&&(null==(t=null==(e=r5(this,dQ))?void 0:e.associateElement)||t.call(e,this)),null==(i=r5(this,dQ))||i.addEventListener("pointerdown",this),null==(a=r5(this,dQ))||a.addEventListener("click",this)}disconnectedCallback(){var e,t,i,a;this.getAttribute(re.MEDIA_CONTROLLER)&&(null==(t=null==(e=r5(this,dQ))?void 0:e.unassociateElement)||t.call(e,this)),null==(i=r5(this,dQ))||i.removeEventListener("pointerdown",this),null==(a=r5(this,dQ))||a.removeEventListener("click",this),r9(this,dQ,null)}handleEvent(e){var t;let i=null==(t=e.composedPath())?void 0:t[0];if(["video","media-controller"].includes(null==i?void 0:i.localName)){if("pointerdown"===e.type)this._pointerType=e.pointerType;else if("click"===e.type){let{clientX:t,clientY:i}=e,{left:a,top:r,width:n,height:s}=this.getBoundingClientRect(),o=t-a,l=i-r;if(o<0||l<0||o>n||l>s||0===n&&0===s)return;let d=this._pointerType||"mouse";if(this._pointerType=void 0,d===rl.TOUCH)return void this.handleTap(e);if(d===rl.MOUSE||d===rl.PEN)return void this.handleMouseClick(e)}}}get mediaPaused(){return r0(this,ra.MEDIA_PAUSED)}set mediaPaused(e){r1(this,ra.MEDIA_PAUSED,e)}handleTap(e){}handleMouseClick(e){let t=this.mediaPaused?a7.MEDIA_PLAY_REQUEST:a7.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new rO.CustomEvent(t,{composed:!0,bubbles:!0}))}}dQ=new WeakMap,r8.shadowRootOptions={mode:"open"},r8.getTemplateHTML=function(e){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-gesture-receiver-display, inline-block));
        box-sizing: border-box;
      }
    </style>
  `},rO.customElements.get("media-gesture-receiver")||rO.customElements.define("media-gesture-receiver",r8);var r6=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},r7=(e,t,i)=>(r6(e,t,"read from private field"),i?i.call(e):t.get(e)),ne=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},nt=(e,t,i,a)=>(r6(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),ni=(e,t,i)=>(r6(e,t,"access private method"),i);let na={AUDIO:"audio",AUTOHIDE:"autohide",BREAKPOINTS:"breakpoints",GESTURES_DISABLED:"gesturesdisabled",KEYBOARD_CONTROL:"keyboardcontrol",NO_AUTOHIDE:"noautohide",USER_INACTIVE:"userinactive",AUTOHIDE_OVER_CONTROLS:"autohideovercontrols"},nr=Object.values(ra);function nn(e,t){var i,a,r;if(!e.isConnected)return;let n=Object.fromEntries((null!=(i=e.getAttribute(na.BREAKPOINTS))?i:"sm:384 md:576 lg:768 xl:960").split(/\s+/).map(e=>e.split(":"))),s=(a=n,r=t,Object.keys(a).filter(e=>r>=parseInt(a[e]))),o=!1;if(Object.keys(n).forEach(t=>{if(s.includes(t)){e.hasAttribute(`breakpoint${t}`)||(e.setAttribute(`breakpoint${t}`,""),o=!0);return}e.hasAttribute(`breakpoint${t}`)&&(e.removeAttribute(`breakpoint${t}`),o=!0)}),o){let t=new CustomEvent(rr.BREAKPOINTS_CHANGE,{detail:s});e.dispatchEvent(t)}e.breakpointsComputed||(e.breakpointsComputed=!0,e.dispatchEvent(new CustomEvent(rr.BREAKPOINTS_COMPUTED,{bubbles:!0,composed:!0})))}class ns extends rO.HTMLElement{constructor(){if(super(),ne(this,d1),ne(this,d5),ne(this,d8),ne(this,d7),ne(this,ut),ne(this,ua),ne(this,dZ,0),ne(this,dz,null),ne(this,dX,null),ne(this,dJ,void 0),this.breakpointsComputed=!1,ne(this,d0,new MutationObserver(ni(this,d1,d2).bind(this))),ne(this,d3,!1),ne(this,d4,e=>{r7(this,d3)||(setTimeout(()=>{!function(e){nn(e.target,e.contentRect.width)}(e),nt(this,d3,!1)},0),nt(this,d3,!0))}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=rW(this.attributes),t=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(t):this.shadowRoot.innerHTML=t}let e=this.querySelector(":scope > slot[slot=media]");e&&e.addEventListener("slotchange",()=>{if(!e.assignedElements({flatten:!0}).length){r7(this,dz)&&this.mediaUnsetCallback(r7(this,dz));return}this.handleMediaUpdated(this.media)})}static get observedAttributes(){return[na.AUTOHIDE,na.GESTURES_DISABLED].concat(nr).filter(e=>![ra.MEDIA_RENDITION_LIST,ra.MEDIA_AUDIO_TRACK_LIST,ra.MEDIA_CHAPTERS_CUES,ra.MEDIA_WIDTH,ra.MEDIA_HEIGHT,ra.MEDIA_ERROR,ra.MEDIA_ERROR_MESSAGE].includes(e))}attributeChangedCallback(e,t,i){e.toLowerCase()==na.AUTOHIDE&&(this.autohide=i)}get media(){let e=this.querySelector(":scope > [slot=media]");return(null==e?void 0:e.nodeName)=="SLOT"&&(e=e.assignedElements({flatten:!0})[0]),e}async handleMediaUpdated(e){e&&(nt(this,dz,e),e.localName.includes("-")&&await rO.customElements.whenDefined(e.localName),this.mediaSetCallback(e))}connectedCallback(){var e;r7(this,d0).observe(this,{childList:!0,subtree:!0}),rB(this,r7(this,d4));let t=null!=this.getAttribute(na.AUDIO)?rk("audio player"):rk("video player");this.setAttribute("role","region"),this.setAttribute("aria-label",t),this.handleMediaUpdated(this.media),this.setAttribute(na.USER_INACTIVE,""),nn(this,this.getBoundingClientRect().width),this.addEventListener("pointerdown",this),this.addEventListener("pointermove",this),this.addEventListener("pointerup",this),this.addEventListener("mouseleave",this),this.addEventListener("keyup",this),null==(e=rO.window)||e.addEventListener("mouseup",this)}disconnectedCallback(){var e;r7(this,d0).disconnect(),rH(this,r7(this,d4)),this.media&&this.mediaUnsetCallback(this.media),null==(e=rO.window)||e.removeEventListener("mouseup",this)}mediaSetCallback(e){}mediaUnsetCallback(e){nt(this,dz,null)}handleEvent(e){switch(e.type){case"pointerdown":nt(this,dZ,e.timeStamp);break;case"pointermove":ni(this,d5,d9).call(this,e);break;case"pointerup":ni(this,d8,d6).call(this,e);break;case"mouseleave":ni(this,d7,ue).call(this);break;case"mouseup":this.removeAttribute(na.KEYBOARD_CONTROL);break;case"keyup":ni(this,ua,ur).call(this),this.setAttribute(na.KEYBOARD_CONTROL,"")}}set autohide(e){let t=Number(e);nt(this,dJ,isNaN(t)?0:t)}get autohide(){return(void 0===r7(this,dJ)?2:r7(this,dJ)).toString()}get breakpoints(){return r2(this,na.BREAKPOINTS)}set breakpoints(e){r3(this,na.BREAKPOINTS,e)}get audio(){return r0(this,na.AUDIO)}set audio(e){r1(this,na.AUDIO,e)}get gesturesDisabled(){return r0(this,na.GESTURES_DISABLED)}set gesturesDisabled(e){r1(this,na.GESTURES_DISABLED,e)}get keyboardControl(){return r0(this,na.KEYBOARD_CONTROL)}set keyboardControl(e){r1(this,na.KEYBOARD_CONTROL,e)}get noAutohide(){return r0(this,na.NO_AUTOHIDE)}set noAutohide(e){r1(this,na.NO_AUTOHIDE,e)}get autohideOverControls(){return r0(this,na.AUTOHIDE_OVER_CONTROLS)}set autohideOverControls(e){r1(this,na.AUTOHIDE_OVER_CONTROLS,e)}get userInteractive(){return r0(this,na.USER_INACTIVE)}set userInteractive(e){r1(this,na.USER_INACTIVE,e)}}dZ=new WeakMap,dz=new WeakMap,dX=new WeakMap,dJ=new WeakMap,d0=new WeakMap,d1=new WeakSet,d2=function(e){let t=this.media;for(let i of e)if("childList"===i.type){for(let e of i.removedNodes){if("media"!=e.slot||i.target!=this)continue;let a=i.previousSibling&&i.previousSibling.previousElementSibling;if(a&&t){let t="media"!==a.slot;for(;null!==(a=a.previousSibling);)"media"==a.slot&&(t=!1);t&&this.mediaUnsetCallback(e)}else this.mediaUnsetCallback(e)}if(t)for(let e of i.addedNodes)e===t&&this.handleMediaUpdated(t)}},d3=new WeakMap,d4=new WeakMap,d5=new WeakSet,d9=function(e){if("mouse"!==e.pointerType&&e.timeStamp-r7(this,dZ)<250)return;ni(this,ut,ui).call(this),clearTimeout(r7(this,dX));let t=this.hasAttribute(na.AUTOHIDE_OVER_CONTROLS);([this,this.media].includes(e.target)||t)&&ni(this,ua,ur).call(this)},d8=new WeakSet,d6=function(e){if("touch"===e.pointerType){let t=!this.hasAttribute(na.USER_INACTIVE);[this,this.media].includes(e.target)&&t?ni(this,d7,ue).call(this):ni(this,ua,ur).call(this)}else e.composedPath().some(e=>["media-play-button","media-fullscreen-button"].includes(null==e?void 0:e.localName))&&ni(this,ua,ur).call(this)},d7=new WeakSet,ue=function(){if(0>r7(this,dJ)||this.hasAttribute(na.USER_INACTIVE))return;this.setAttribute(na.USER_INACTIVE,"");let e=new rO.CustomEvent(rr.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!0});this.dispatchEvent(e)},ut=new WeakSet,ui=function(){if(!this.hasAttribute(na.USER_INACTIVE))return;this.removeAttribute(na.USER_INACTIVE);let e=new rO.CustomEvent(rr.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!1});this.dispatchEvent(e)},ua=new WeakSet,ur=function(){ni(this,ut,ui).call(this),clearTimeout(r7(this,dX));let e=parseInt(this.autohide);e<0||nt(this,dX,setTimeout(()=>{ni(this,d7,ue).call(this)},1e3*e))},ns.shadowRootOptions={mode:"open"},ns.getTemplateHTML=function(e){return`
    <style>
      
      :host([${ra.MEDIA_IS_FULLSCREEN}]) ::slotted([slot=media]) {
        outline: none;
      }

      :host {
        box-sizing: border-box;
        position: relative;
        display: inline-block;
        line-height: 0;
        background-color: var(--media-background-color, #000);
        overflow: hidden;
      }

      :host(:not([${na.AUDIO}])) [part~=layer]:not([part~=media-layer]) {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        flex-flow: column nowrap;
        align-items: start;
        pointer-events: none;
        background: none;
      }

      slot[name=media] {
        display: var(--media-slot-display, contents);
      }

      
      :host([${na.AUDIO}]) slot[name=media] {
        display: var(--media-slot-display, none);
      }

      
      :host([${na.AUDIO}]) [part~=layer][part~=gesture-layer] {
        height: 0;
        display: block;
      }

      
      :host(:not([${na.AUDIO}])[${na.GESTURES_DISABLED}]) ::slotted([slot=gestures-chrome]),
          :host(:not([${na.AUDIO}])[${na.GESTURES_DISABLED}]) media-gesture-receiver[slot=gestures-chrome] {
        display: none;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not(media-loading-indicator):not([role=dialog]):not([hidden])) {
        pointer-events: auto;
      }

      :host(:not([${na.AUDIO}])) *[part~=layer][part~=centered-layer] {
        align-items: center;
        justify-content: center;
      }

      :host(:not([${na.AUDIO}])) ::slotted(media-gesture-receiver[slot=gestures-chrome]),
      :host(:not([${na.AUDIO}])) media-gesture-receiver[slot=gestures-chrome] {
        align-self: stretch;
        flex-grow: 1;
      }

      slot[name=middle-chrome] {
        display: inline;
        flex-grow: 1;
        pointer-events: none;
        background: none;
      }

      
      ::slotted([slot=media]),
      ::slotted([slot=poster]) {
        width: 100%;
        height: 100%;
      }

      
      :host(:not([${na.AUDIO}])) .spacer {
        flex-grow: 1;
      }

      
      :host(:-webkit-full-screen) {
        
        width: 100% !important;
        height: 100% !important;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not([${na.NO_AUTOHIDE}]):not([hidden]):not([role=dialog])) {
        opacity: 1;
        transition: var(--media-control-transition-in, opacity 0.25s);
      }

      
      :host([${na.USER_INACTIVE}]:not([${ra.MEDIA_PAUSED}]):not([${ra.MEDIA_IS_AIRPLAYING}]):not([${ra.MEDIA_IS_CASTING}]):not([${na.AUDIO}])) ::slotted(:not([slot=media]):not([slot=poster]):not([${na.NO_AUTOHIDE}]):not([role=dialog])) {
        opacity: 0;
        transition: var(--media-control-transition-out, opacity 1s);
      }

      :host([${na.USER_INACTIVE}]:not([${na.NO_AUTOHIDE}]):not([${ra.MEDIA_PAUSED}]):not([${ra.MEDIA_IS_CASTING}]):not([${na.AUDIO}])) ::slotted([slot=media]) {
        cursor: none;
      }

      :host([${na.USER_INACTIVE}][${na.AUTOHIDE_OVER_CONTROLS}]:not([${na.NO_AUTOHIDE}]):not([${ra.MEDIA_PAUSED}]):not([${ra.MEDIA_IS_CASTING}]):not([${na.AUDIO}])) * {
        --media-cursor: none;
        cursor: none;
      }


      ::slotted(media-control-bar)  {
        align-self: stretch;
      }

      
      :host(:not([${na.AUDIO}])[${ra.MEDIA_HAS_PLAYED}]) slot[name=poster] {
        display: none;
      }

      ::slotted([role=dialog]) {
        width: 100%;
        height: 100%;
        align-self: center;
      }

      ::slotted([role=menu]) {
        align-self: end;
      }
    </style>

    <slot name="media" part="layer media-layer"></slot>
    <slot name="poster" part="layer poster-layer"></slot>
    <slot name="gestures-chrome" part="layer gesture-layer">
      <media-gesture-receiver slot="gestures-chrome">
        <template shadowrootmode="${r8.shadowRootOptions.mode}">
          ${r8.getTemplateHTML({})}
        </template>
      </media-gesture-receiver>
    </slot>
    <span part="layer vertical-layer">
      <slot name="top-chrome" part="top chrome"></slot>
      <slot name="middle-chrome" part="middle chrome"></slot>
      <slot name="centered-chrome" part="layer centered-layer center centered chrome"></slot>
      
      <slot part="bottom chrome"></slot>
    </span>
    <slot name="dialog" part="layer dialog-layer"></slot>
  `},rO.customElements.get("media-container")||rO.customElements.define("media-container",ns);var no=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},nl=(e,t,i)=>(no(e,t,"read from private field"),i?i.call(e):t.get(e)),nd=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},nu=(e,t,i,a)=>(no(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i);class nc{constructor(e,t,{defaultValue:i}={defaultValue:void 0}){nd(this,ud),nd(this,un,void 0),nd(this,us,void 0),nd(this,uo,void 0),nd(this,ul,new Set),nu(this,un,e),nu(this,us,t),nu(this,uo,new Set(i))}[Symbol.iterator](){return nl(this,ud,uu).values()}get length(){return nl(this,ud,uu).size}get value(){var e;return null!=(e=[...nl(this,ud,uu)].join(" "))?e:""}set value(e){var t;e!==this.value&&(nu(this,ul,new Set),this.add(...null!=(t=null==e?void 0:e.split(" "))?t:[]))}toString(){return this.value}item(e){return[...nl(this,ud,uu)][e]}values(){return nl(this,ud,uu).values()}forEach(e,t){nl(this,ud,uu).forEach(e,t)}add(...e){var t,i;e.forEach(e=>nl(this,ul).add(e)),(""!==this.value||(null==(t=nl(this,un))?void 0:t.hasAttribute(`${nl(this,us)}`)))&&(null==(i=nl(this,un))||i.setAttribute(`${nl(this,us)}`,`${this.value}`))}remove(...e){var t;e.forEach(e=>nl(this,ul).delete(e)),null==(t=nl(this,un))||t.setAttribute(`${nl(this,us)}`,`${this.value}`)}contains(e){return nl(this,ud,uu).has(e)}toggle(e,t){if(void 0!==t)if(t)return this.add(e),!0;else return this.remove(e),!1;return this.contains(e)?(this.remove(e),!1):(this.add(e),!0)}replace(e,t){return this.remove(e),this.add(t),e===t}}un=new WeakMap,us=new WeakMap,uo=new WeakMap,ul=new WeakMap,ud=new WeakSet,uu=function(){return nl(this,ul).size?nl(this,ul):nl(this,uo)};let nh=(e="")=>{let[t,i,a]=e.split(":"),r=a?decodeURIComponent(a):void 0;return{kind:"cc"===t?rs.CAPTIONS:rs.SUBTITLES,language:i,label:r}},nm=(e="",t={})=>((e="")=>e.split(/\s+/))(e).map(e=>{let i=nh(e);return{...t,...i}}),np=e=>e?Array.isArray(e)?e.map(e=>"string"==typeof e?nh(e):e):"string"==typeof e?nm(e):[e]:[],nv=({kind:e,label:t,language:i}={kind:"subtitles"})=>t?`${"captions"===e?"cc":"sb"}:${i}:${encodeURIComponent(t)}`:i,nE=(e=[])=>Array.prototype.map.call(e,nv).join(" "),nb=e=>{let t=Object.entries(e).map(([e,t])=>i=>i[e]===t);return e=>t.every(t=>t(e))},ng=(e,t=[],i=[])=>{let a=np(i).map(nb);Array.from(t).filter(e=>a.some(t=>t(e))).forEach(t=>{t.mode=e})},nf=(e,t=()=>!0)=>{if(!(null==e?void 0:e.textTracks))return[];let i="function"==typeof t?t:nb(t);return Array.from(e.textTracks).filter(i)},n_=e=>{var t;return!!(null==(t=e.mediaSubtitlesShowing)?void 0:t.length)||e.hasAttribute(ra.MEDIA_SUBTITLES_SHOWING)},ny="exitFullscreen"in rx?"exitFullscreen":"webkitExitFullscreen"in rx?"webkitExitFullscreen":"webkitCancelFullScreen"in rx?"webkitCancelFullScreen":void 0,nT="fullscreenElement"in rx?"fullscreenElement":"webkitFullscreenElement"in rx?"webkitFullscreenElement":void 0,nA="fullscreenEnabled"in rx?"fullscreenEnabled":"webkitFullscreenEnabled"in rx?"webkitFullscreenEnabled":void 0,nk=()=>{var e;return r||(r=null==(e=null==rx?void 0:rx.createElement)?void 0:e.call(rx,"video"))},nw=async(e=nk())=>{if(!e)return!1;let t=e.volume;e.volume=t/2+.1;let i=new AbortController,a=await Promise.race([nS(e,i.signal),nI(e,t)]);return i.abort(),a},nS=(e,t)=>new Promise(i=>{e.addEventListener("volumechange",()=>i(!0),{signal:t})}),nI=async(e,t)=>{for(let i=0;i<10;i++){if(e.volume===t)return!1;await rg(10)}return e.volume!==t},nR=/.*Version\/.*Safari\/.*/.test(rO.navigator.userAgent),nD=(e=nk())=>(!rO.matchMedia("(display-mode: standalone)").matches||!nR)&&"function"==typeof(null==e?void 0:e.requestPictureInPicture),nL=(e=nk())=>(e=>{let{documentElement:t,media:i}=e;return!!(null==t?void 0:t[nA])||i&&"webkitSupportsFullscreen"in i})({documentElement:rx,media:e}),nC=nL(),nM=nD(),nO=!!rO.WebKitPlaybackTargetAvailabilityEvent,nx=!!rO.chrome,nN=e=>nf(e.media,e=>[rs.SUBTITLES,rs.CAPTIONS].includes(e.kind)).sort((e,t)=>e.kind>=t.kind?1:-1),nP=e=>nf(e.media,e=>e.mode===ro.SHOWING&&[rs.SUBTITLES,rs.CAPTIONS].includes(e.kind)),nU=(e,t)=>{let i=nN(e),a=nP(e),r=!!a.length;if(i.length){if(!1===t||r&&!0!==t)ng(ro.DISABLED,i,a);else if(!0===t||!r&&!1!==t){let t=i[0],{options:r}=e;if(!(null==r?void 0:r.noSubtitlesLangPref)){let e=globalThis.localStorage.getItem("media-chrome-pref-subtitles-lang"),a=e?[e,...globalThis.navigator.languages]:globalThis.navigator.languages,r=i.filter(e=>a.some(t=>e.language.toLowerCase().startsWith(t.split("-")[0]))).sort((e,t)=>a.findIndex(t=>e.language.toLowerCase().startsWith(t.split("-")[0]))-a.findIndex(e=>t.language.toLowerCase().startsWith(e.split("-")[0])));r[0]&&(t=r[0])}let{language:n,label:s,kind:o}=t;ng(ro.DISABLED,i,a),ng(ro.SHOWING,i,[{language:n,label:s,kind:o}])}}},nB=(e,t)=>e===t||null!=e&&null!=t&&typeof e==typeof t&&(!!("number"==typeof e&&Number.isNaN(e)&&Number.isNaN(t))||"object"==typeof e&&(Array.isArray(e)?nH(e,t):Object.entries(e).every(([e,i])=>e in t&&nB(i,t[e])))),nH=(e,t)=>{let i=Array.isArray(e),a=Array.isArray(t);return i===a&&(!i&&!a||e.length===t.length&&e.every((e,i)=>nB(e,t[i])))},nW=Object.values(ru),nV=nw().then(e=>n=e),nF=async(...e)=>{await Promise.all(e.filter(e=>e).map(async e=>{if(!("localName"in e&&e instanceof rO.HTMLElement))return;let t=e.localName;if(!t.includes("-"))return;let i=rO.customElements.get(t);i&&e instanceof i||(await rO.customElements.whenDefined(t),rO.customElements.upgrade(e))}))},n$=new rO.DOMParser,nK={mediaError:{get(e,t){let{media:i}=e;if((null==t?void 0:t.type)!=="playing")return null==i?void 0:i.error},mediaEvents:["emptied","error","playing"]},mediaErrorCode:{get(e,t){var i;let{media:a}=e;if((null==t?void 0:t.type)!=="playing")return null==(i=null==a?void 0:a.error)?void 0:i.code},mediaEvents:["emptied","error","playing"]},mediaErrorMessage:{get(e,t){var i,a;let{media:r}=e;if((null==t?void 0:t.type)!=="playing")return null!=(a=null==(i=null==r?void 0:r.error)?void 0:i.message)?a:""},mediaEvents:["emptied","error","playing"]},mediaWidth:{get(e){var t;let{media:i}=e;return null!=(t=null==i?void 0:i.videoWidth)?t:0},mediaEvents:["resize"]},mediaHeight:{get(e){var t;let{media:i}=e;return null!=(t=null==i?void 0:i.videoHeight)?t:0},mediaEvents:["resize"]},mediaPaused:{get(e){var t;let{media:i}=e;return null==(t=null==i?void 0:i.paused)||t},set(e,t){var i;let{media:a}=t;a&&(e?a.pause():null==(i=a.play())||i.catch(()=>{}))},mediaEvents:["play","playing","pause","emptied"]},mediaHasPlayed:{get(e,t){let{media:i}=e;return!!i&&(t?"playing"===t.type:!i.paused)},mediaEvents:["playing","emptied"]},mediaEnded:{get(e){var t;let{media:i}=e;return null!=(t=null==i?void 0:i.ended)&&t},mediaEvents:["seeked","ended","emptied"]},mediaPlaybackRate:{get(e){var t;let{media:i}=e;return null!=(t=null==i?void 0:i.playbackRate)?t:1},set(e,t){let{media:i}=t;i&&Number.isFinite(+e)&&(i.playbackRate=+e)},mediaEvents:["ratechange","loadstart"]},mediaMuted:{get(e){var t;let{media:i}=e;return null!=(t=null==i?void 0:i.muted)&&t},set(e,t){let{media:i,options:{noMutedPref:a}={}}=t;if(i){i.muted=e;try{let t=null!==rO.localStorage.getItem("media-chrome-pref-muted"),r=i.hasAttribute("muted");if(a){t&&rO.localStorage.removeItem("media-chrome-pref-muted");return}if(r&&!t)return;rO.localStorage.setItem("media-chrome-pref-muted",e?"true":"false")}catch(e){console.debug("Error setting muted pref",e)}}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(e,t)=>{let{options:{noMutedPref:i}}=t,{media:a}=t;if(a&&!a.muted&&!i)try{let i="true"===rO.localStorage.getItem("media-chrome-pref-muted");nK.mediaMuted.set(i,t),e(i)}catch(e){console.debug("Error getting muted pref",e)}}]},mediaLoop:{get(e){let{media:t}=e;return null==t?void 0:t.loop},set(e,t){let{media:i}=t;i&&(i.loop=e)},mediaEvents:["medialooprequest"]},mediaVolume:{get(e){var t;let{media:i}=e;return null!=(t=null==i?void 0:i.volume)?t:1},set(e,t){let{media:i,options:{noVolumePref:a}={}}=t;if(i){try{null==e?rO.localStorage.removeItem("media-chrome-pref-volume"):i.hasAttribute("muted")||a||rO.localStorage.setItem("media-chrome-pref-volume",e.toString())}catch(e){console.debug("Error setting volume pref",e)}Number.isFinite(+e)&&(i.volume=+e)}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(e,t)=>{let{options:{noVolumePref:i}}=t;if(!i)try{let{media:i}=t;if(!i)return;let a=rO.localStorage.getItem("media-chrome-pref-volume");if(null==a)return;nK.mediaVolume.set(+a,t),e(+a)}catch(e){console.debug("Error getting volume pref",e)}}]},mediaVolumeLevel:{get(e){let{media:t}=e;return void 0===(null==t?void 0:t.volume)?"high":t.muted||0===t.volume?"off":t.volume<.5?"low":t.volume<.75?"medium":"high"},mediaEvents:["volumechange"]},mediaCurrentTime:{get(e){var t;let{media:i}=e;return null!=(t=null==i?void 0:i.currentTime)?t:0},set(e,t){let{media:i}=t;i&&rE(e)&&(i.currentTime=e)},mediaEvents:["timeupdate","loadedmetadata"]},mediaDuration:{get(e){let{media:t,options:{defaultDuration:i}={}}=e;return i&&(!t||!t.duration||Number.isNaN(t.duration)||!Number.isFinite(t.duration))?i:Number.isFinite(null==t?void 0:t.duration)?t.duration:NaN},mediaEvents:["durationchange","loadedmetadata","emptied"]},mediaLoading:{get(e){let{media:t}=e;return(null==t?void 0:t.readyState)<3},mediaEvents:["waiting","playing","emptied"]},mediaSeekable:{get(e){var t;let{media:i}=e;if(!(null==(t=null==i?void 0:i.seekable)?void 0:t.length))return;let a=i.seekable.start(0),r=i.seekable.end(i.seekable.length-1);if(a||r)return[Number(a.toFixed(3)),Number(r.toFixed(3))]},mediaEvents:["loadedmetadata","emptied","progress","seekablechange"]},mediaBuffered:{get(e){var t;let{media:i}=e,a=null!=(t=null==i?void 0:i.buffered)?t:[];return Array.from(a).map((e,t)=>[Number(a.start(t).toFixed(3)),Number(a.end(t).toFixed(3))])},mediaEvents:["progress","emptied"]},mediaStreamType:{get(e){let{media:t,options:{defaultStreamType:i}={}}=e,a=[ru.LIVE,ru.ON_DEMAND].includes(i)?i:void 0;if(!t)return a;let{streamType:r}=t;if(nW.includes(r))return r===ru.UNKNOWN?a:r;let n=t.duration;return n===1/0?ru.LIVE:Number.isFinite(n)?ru.ON_DEMAND:a},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange"]},mediaTargetLiveWindow:{get(e){let{media:t}=e;if(!t)return NaN;let{targetLiveWindow:i}=t,a=nK.mediaStreamType.get(e);return(null==i||Number.isNaN(i))&&a===ru.LIVE?0:i},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange","targetlivewindowchange"]},mediaTimeIsLive:{get(e){let{media:t,options:{liveEdgeOffset:i=10}={}}=e;if(!t)return!1;if("number"==typeof t.liveEdgeStart)return!Number.isNaN(t.liveEdgeStart)&&t.currentTime>=t.liveEdgeStart;if(nK.mediaStreamType.get(e)!==ru.LIVE)return!1;let a=t.seekable;if(!a)return!0;if(!a.length)return!1;let r=a.end(a.length-1)-i;return t.currentTime>=r},mediaEvents:["playing","timeupdate","progress","waiting","emptied"]},mediaSubtitlesList:{get:e=>nN(e).map(({kind:e,label:t,language:i})=>({kind:e,label:t,language:i})),mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack"]},mediaSubtitlesShowing:{get:e=>nP(e).map(({kind:e,label:t,language:i})=>({kind:e,label:t,language:i})),mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(e,t)=>{var i,a;let{media:r,options:n}=t;if(!r)return;let s=e=>{var i;n.defaultSubtitles&&(e&&![rs.CAPTIONS,rs.SUBTITLES].includes(null==(i=null==e?void 0:e.track)?void 0:i.kind)||nU(t,!0))};return r.addEventListener("loadstart",s),null==(i=r.textTracks)||i.addEventListener("addtrack",s),null==(a=r.textTracks)||a.addEventListener("removetrack",s),()=>{var e,t;r.removeEventListener("loadstart",s),null==(e=r.textTracks)||e.removeEventListener("addtrack",s),null==(t=r.textTracks)||t.removeEventListener("removetrack",s)}}]},mediaChaptersCues:{get(e){var t;let{media:i}=e;if(!i)return[];let[a]=nf(i,{kind:rs.CHAPTERS});return Array.from(null!=(t=null==a?void 0:a.cues)?t:[]).map(({text:e,startTime:t,endTime:i})=>({text:e&&n$.parseFromString(e,"text/html").body.textContent||e,startTime:t,endTime:i}))},mediaEvents:["loadstart","loadedmetadata"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(e,t)=>{var i;let{media:a}=t;if(!a)return;let r=a.querySelector('track[kind="chapters"][default][src]'),n=null==(i=a.shadowRoot)?void 0:i.querySelector(':is(video,audio) > track[kind="chapters"][default][src]');return null==r||r.addEventListener("load",e),null==n||n.addEventListener("load",e),()=>{null==r||r.removeEventListener("load",e),null==n||n.removeEventListener("load",e)}}]},mediaIsPip:{get(e){var t,i;let{media:a,documentElement:r}=e;if(!a||!r||!r.pictureInPictureElement)return!1;if(r.pictureInPictureElement===a)return!0;if(r.pictureInPictureElement instanceof HTMLMediaElement)return!!(null==(t=a.localName)?void 0:t.includes("-"))&&rq(a,r.pictureInPictureElement);if(r.pictureInPictureElement.localName.includes("-")){let e=r.pictureInPictureElement.shadowRoot;for(;null==e?void 0:e.pictureInPictureElement;){if(e.pictureInPictureElement===a)return!0;e=null==(i=e.pictureInPictureElement)?void 0:i.shadowRoot}}return!1},set(e,t){let{media:i}=t;if(i)if(e){if(!rx.pictureInPictureEnabled)return void console.warn("MediaChrome: Picture-in-picture is not enabled");if(!i.requestPictureInPicture)return void console.warn("MediaChrome: The current media does not support picture-in-picture");let e=()=>{console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a readyState > 0.")};i.requestPictureInPicture().catch(t=>{if(11===t.code){if(!i.src)return void console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a src set.");if(0===i.readyState&&"none"===i.preload){let t=()=>{i.removeEventListener("loadedmetadata",a),i.preload="none"},a=()=>{i.requestPictureInPicture().catch(e),t()};i.addEventListener("loadedmetadata",a),i.preload="metadata",setTimeout(()=>{0===i.readyState&&e(),t()},1e3)}else throw t}else throw t})}else rx.pictureInPictureElement&&rx.exitPictureInPicture()},mediaEvents:["enterpictureinpicture","leavepictureinpicture"]},mediaRenditionList:{get(e){var t;let{media:i}=e;return[...null!=(t=null==i?void 0:i.videoRenditions)?t:[]].map(e=>({...e}))},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaRenditionSelected:{get(e){var t,i,a;let{media:r}=e;return null==(a=null==(i=null==r?void 0:r.videoRenditions)?void 0:i[null==(t=r.videoRenditions)?void 0:t.selectedIndex])?void 0:a.id},set(e,t){let{media:i}=t;if(!(null==i?void 0:i.videoRenditions))return void console.warn("MediaController: Rendition selection not supported by this media.");let a=Array.prototype.findIndex.call(i.videoRenditions,t=>t.id==e);i.videoRenditions.selectedIndex!=a&&(i.videoRenditions.selectedIndex=a)},mediaEvents:["emptied"],videoRenditionsEvents:["addrendition","removerendition","change"]},mediaAudioTrackList:{get(e){var t;let{media:i}=e;return[...null!=(t=null==i?void 0:i.audioTracks)?t:[]]},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaAudioTrackEnabled:{get(e){var t,i;let{media:a}=e;return null==(i=[...null!=(t=null==a?void 0:a.audioTracks)?t:[]].find(e=>e.enabled))?void 0:i.id},set(e,t){let{media:i}=t;if(!(null==i?void 0:i.audioTracks))return void console.warn("MediaChrome: Audio track selection not supported by this media.");for(let t of i.audioTracks)t.enabled=e==t.id},mediaEvents:["emptied"],audioTracksEvents:["addtrack","removetrack","change"]},mediaIsFullscreen:{get:e=>(e=>{var t;let{media:i,documentElement:a,fullscreenElement:r=i}=e;if(!i||!a)return!1;let n=(e=>{let{documentElement:t,media:i}=e,a=null==t?void 0:t[nT];return!a&&"webkitDisplayingFullscreen"in i&&"webkitPresentationMode"in i&&i.webkitDisplayingFullscreen&&i.webkitPresentationMode===rc.FULLSCREEN?i:a})(e);if(!n)return!1;if(n===r||n===i)return!0;if(n.localName.includes("-")){let e=n.shadowRoot;if(!(nT in e))return rq(n,r);for(;null==e?void 0:e[nT];){if(e[nT]===r)return!0;e=null==(t=e[nT])?void 0:t.shadowRoot}}return!1})(e),set(e,t,i){var a;e?((e=>{var t;let{media:i,fullscreenElement:a}=e;try{let e=a&&"requestFullscreen"in a?"requestFullscreen":a&&"webkitRequestFullScreen"in a?"webkitRequestFullScreen":void 0;if(e){let i=null==(t=a[e])?void 0:t.call(a);if(i instanceof Promise)return i.catch(()=>{})}else(null==i?void 0:i.webkitEnterFullscreen)?i.webkitEnterFullscreen():(null==i?void 0:i.requestFullscreen)&&i.requestFullscreen()}catch(e){console.error(e)}})(t),i.detail&&(null==(a=t.media)||a.focus())):(e=>{var t;let{documentElement:i}=e;if(ny){let e=null==(t=null==i?void 0:i[ny])?void 0:t.call(i);if(e instanceof Promise)return e.catch(()=>{})}})(t)},rootEvents:["fullscreenchange","webkitfullscreenchange"],mediaEvents:["webkitbeginfullscreen","webkitendfullscreen","webkitpresentationmodechanged"]},mediaIsCasting:{get(e){var t;let{media:i}=e;return!!(null==i?void 0:i.remote)&&(null==(t=i.remote)?void 0:t.state)!=="disconnected"&&!!i.remote.state},set(e,t){var i,a;let{media:r}=t;if(r&&(!e||(null==(i=r.remote)?void 0:i.state)==="disconnected")&&(e||(null==(a=r.remote)?void 0:a.state)==="connected")){if("function"!=typeof r.remote.prompt)return void console.warn("MediaChrome: Casting is not supported in this environment");r.remote.prompt().catch(()=>{})}},remoteEvents:["connect","connecting","disconnect"]},mediaIsAirplaying:{get:()=>!1,set(e,t){let{media:i}=t;if(i){if(!(i.webkitShowPlaybackTargetPicker&&rO.WebKitPlaybackTargetAvailabilityEvent))return void console.error("MediaChrome: received a request to select AirPlay but AirPlay is not supported in this environment");i.webkitShowPlaybackTargetPicker()}},mediaEvents:["webkitcurrentplaybacktargetiswirelesschanged"]},mediaFullscreenUnavailable:{get(e){let{media:t}=e;if(!nC||!nL(t))return rd.UNSUPPORTED}},mediaPipUnavailable:{get(e){let{media:t}=e;return nM&&nD(t)?(null==t?void 0:t.disablePictureInPicture)?rd.UNAVAILABLE:void 0:rd.UNSUPPORTED}},mediaVolumeUnavailable:{get(e){let{media:t}=e;if(!1===n||(null==t?void 0:t.volume)==void 0)return rd.UNSUPPORTED},stateOwnersUpdateHandlers:[e=>{null==n&&nV.then(t=>e(t?void 0:rd.UNSUPPORTED))}]},mediaCastUnavailable:{get(e,{availability:t="not-available"}={}){var i;let{media:a}=e;return nx&&(null==(i=null==a?void 0:a.remote)?void 0:i.state)?null!=t&&"available"!==t?rd.UNAVAILABLE:void 0:rd.UNSUPPORTED},stateOwnersUpdateHandlers:[(e,t)=>{var i;let{media:a}=t;if(a)return a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||null==(i=null==a?void 0:a.remote)||i.watchAvailability(t=>{e({availability:t?"available":"not-available"})}).catch(t=>{"NotSupportedError"===t.name?e({availability:null}):e({availability:"not-available"})}),()=>{var e;null==(e=null==a?void 0:a.remote)||e.cancelWatchAvailability().catch(()=>{})}}]},mediaAirplayUnavailable:{get:(e,t)=>nO?(null==t?void 0:t.availability)==="not-available"?rd.UNAVAILABLE:void 0:rd.UNSUPPORTED,mediaEvents:["webkitplaybacktargetavailabilitychanged"],stateOwnersUpdateHandlers:[(e,t)=>{var i;let{media:a}=t;if(a)return a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||null==(i=null==a?void 0:a.remote)||i.watchAvailability(t=>{e({availability:t?"available":"not-available"})}).catch(t=>{"NotSupportedError"===t.name?e({availability:null}):e({availability:"not-available"})}),()=>{var e;null==(e=null==a?void 0:a.remote)||e.cancelWatchAvailability().catch(()=>{})}}]},mediaRenditionUnavailable:{get(e){var t;let{media:i}=e;return(null==i?void 0:i.videoRenditions)?(null==(t=i.videoRenditions)?void 0:t.length)?void 0:rd.UNAVAILABLE:rd.UNSUPPORTED},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaAudioTrackUnavailable:{get(e){var t,i;let{media:a}=e;return(null==a?void 0:a.audioTracks)?(null!=(i=null==(t=a.audioTracks)?void 0:t.length)?i:0)<=1?rd.UNAVAILABLE:void 0:rd.UNSUPPORTED},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaLang:{get(e){let{options:{mediaLang:t}={}}=e;return null!=t?t:"en"}}},nq={[a7.MEDIA_PREVIEW_REQUEST](e,t,{detail:i}){var a,r,n;let s,o,{media:l}=t,d=null!=i?i:void 0;if(l&&null!=d){let[e]=nf(l,{kind:rs.METADATA,label:"thumbnails"}),t=Array.prototype.find.call(null!=(a=null==e?void 0:e.cues)?a:[],(e,t,i)=>0===t?e.endTime>d:t===i.length-1?e.startTime<=d:e.startTime<=d&&e.endTime>d);if(t){let e=/'^(?:[a-z]+:)?\/\//i.test(t.text)||null==(r=null==l?void 0:l.querySelector('track[label="thumbnails"]'))?void 0:r.src,i=new URL(t.text,e);o=new URLSearchParams(i.hash).get("#xywh").split(",").map(e=>+e),s=i.href}}let u=e.mediaDuration.get(t),c=null==(n=e.mediaChaptersCues.get(t).find((e,t,i)=>t===i.length-1&&u===e.endTime?e.startTime<=d&&e.endTime>=d:e.startTime<=d&&e.endTime>d))?void 0:n.text;return null!=i&&null==c&&(c=""),{mediaPreviewTime:d,mediaPreviewImage:s,mediaPreviewCoords:o,mediaPreviewChapter:c}},[a7.MEDIA_PAUSE_REQUEST](e,t){e.mediaPaused.set(!0,t)},[a7.MEDIA_PLAY_REQUEST](e,t){var i,a,r,n;let s=e.mediaStreamType.get(t)===ru.LIVE,o=!(null==(i=t.options)?void 0:i.noAutoSeekToLive),l=e.mediaTargetLiveWindow.get(t)>0;if(s&&o&&!l){let i=null==(a=e.mediaSeekable.get(t))?void 0:a[1];if(i){let a=null!=(n=null==(r=t.options)?void 0:r.seekToLiveOffset)?n:0;e.mediaCurrentTime.set(i-a,t)}}e.mediaPaused.set(!1,t)},[a7.MEDIA_PLAYBACK_RATE_REQUEST](e,t,{detail:i}){e.mediaPlaybackRate.set(i,t)},[a7.MEDIA_MUTE_REQUEST](e,t){e.mediaMuted.set(!0,t)},[a7.MEDIA_UNMUTE_REQUEST](e,t){e.mediaVolume.get(t)||e.mediaVolume.set(.25,t),e.mediaMuted.set(!1,t)},[a7.MEDIA_LOOP_REQUEST](e,t,{detail:i}){let a=!!i;return e.mediaLoop.set(a,t),{mediaLoop:a}},[a7.MEDIA_VOLUME_REQUEST](e,t,{detail:i}){i&&e.mediaMuted.get(t)&&e.mediaMuted.set(!1,t),e.mediaVolume.set(i,t)},[a7.MEDIA_SEEK_REQUEST](e,t,{detail:i}){e.mediaCurrentTime.set(i,t)},[a7.MEDIA_SEEK_TO_LIVE_REQUEST](e,t){var i,a,r;let n=null==(i=e.mediaSeekable.get(t))?void 0:i[1];if(Number.isNaN(Number(n)))return;let s=null!=(r=null==(a=t.options)?void 0:a.seekToLiveOffset)?r:0;e.mediaCurrentTime.set(n-s,t)},[a7.MEDIA_SHOW_SUBTITLES_REQUEST](e,t,{detail:i}){var a;let{options:r}=t,n=nN(t),s=np(i),o=null==(a=s[0])?void 0:a.language;o&&!r.noSubtitlesLangPref&&rO.localStorage.setItem("media-chrome-pref-subtitles-lang",o),ng(ro.SHOWING,n,s)},[a7.MEDIA_DISABLE_SUBTITLES_REQUEST](e,t,{detail:i}){let a=nN(t);ng(ro.DISABLED,a,null!=i?i:[])},[a7.MEDIA_TOGGLE_SUBTITLES_REQUEST](e,t,{detail:i}){nU(t,i)},[a7.MEDIA_RENDITION_REQUEST](e,t,{detail:i}){e.mediaRenditionSelected.set(i,t)},[a7.MEDIA_AUDIO_TRACK_REQUEST](e,t,{detail:i}){e.mediaAudioTrackEnabled.set(i,t)},[a7.MEDIA_ENTER_PIP_REQUEST](e,t){e.mediaIsFullscreen.get(t)&&e.mediaIsFullscreen.set(!1,t),e.mediaIsPip.set(!0,t)},[a7.MEDIA_EXIT_PIP_REQUEST](e,t){e.mediaIsPip.set(!1,t)},[a7.MEDIA_ENTER_FULLSCREEN_REQUEST](e,t,i){e.mediaIsPip.get(t)&&e.mediaIsPip.set(!1,t),e.mediaIsFullscreen.set(!0,t,i)},[a7.MEDIA_EXIT_FULLSCREEN_REQUEST](e,t){e.mediaIsFullscreen.set(!1,t)},[a7.MEDIA_ENTER_CAST_REQUEST](e,t){e.mediaIsFullscreen.get(t)&&e.mediaIsFullscreen.set(!1,t),e.mediaIsCasting.set(!0,t)},[a7.MEDIA_EXIT_CAST_REQUEST](e,t){e.mediaIsCasting.set(!1,t)},[a7.MEDIA_AIRPLAY_REQUEST](e,t){e.mediaIsAirplaying.set(!0,t)}};var nY=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},nG=(e,t,i)=>(nY(e,t,"read from private field"),i?i.call(e):t.get(e)),nj=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},nQ=(e,t,i,a)=>(nY(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),nZ=(e,t,i)=>(nY(e,t,"access private method"),i);let nz=["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Enter"," ","f","m","k","c","l","j",">","<","p"],nX={DEFAULT_SUBTITLES:"defaultsubtitles",DEFAULT_STREAM_TYPE:"defaultstreamtype",DEFAULT_DURATION:"defaultduration",FULLSCREEN_ELEMENT:"fullscreenelement",HOTKEYS:"hotkeys",KEYBOARD_BACKWARD_SEEK_OFFSET:"keyboardbackwardseekoffset",KEYBOARD_FORWARD_SEEK_OFFSET:"keyboardforwardseekoffset",KEYBOARD_DOWN_VOLUME_STEP:"keyboarddownvolumestep",KEYBOARD_UP_VOLUME_STEP:"keyboardupvolumestep",KEYS_USED:"keysused",LANG:"lang",LOOP:"loop",LIVE_EDGE_OFFSET:"liveedgeoffset",NO_AUTO_SEEK_TO_LIVE:"noautoseektolive",NO_DEFAULT_STORE:"nodefaultstore",NO_HOTKEYS:"nohotkeys",NO_MUTED_PREF:"nomutedpref",NO_SUBTITLES_LANG_PREF:"nosubtitleslangpref",NO_VOLUME_PREF:"novolumepref",SEEK_TO_LIVE_OFFSET:"seektoliveoffset"};class nJ extends ns{constructor(){super(),nj(this,uf),nj(this,uy),nj(this,uA),nj(this,uw),this.mediaStateReceivers=[],this.associatedElementSubscriptions=new Map,nj(this,uc,new nc(this,nX.HOTKEYS)),nj(this,uh,void 0),nj(this,um,void 0),nj(this,up,null),nj(this,uv,void 0),nj(this,uE,void 0),nj(this,ub,e=>{var t;null==(t=nG(this,um))||t.dispatch(e)}),nj(this,ug,void 0),this.associateElement(this);let e={};nQ(this,uv,t=>{Object.entries(t).forEach(([t,i])=>{if(t in e&&e[t]===i)return;this.propagateMediaState(t,i);let a=t.toLowerCase(),r=new rO.CustomEvent(rn[a],{composed:!0,detail:i});this.dispatchEvent(r)}),e=t}),this.hasAttribute(nX.NO_HOTKEYS)?this.disableHotkeys():this.enableHotkeys()}static get observedAttributes(){return super.observedAttributes.concat(nX.NO_HOTKEYS,nX.HOTKEYS,nX.DEFAULT_STREAM_TYPE,nX.DEFAULT_SUBTITLES,nX.DEFAULT_DURATION,nX.NO_MUTED_PREF,nX.NO_VOLUME_PREF,nX.LANG,nX.LOOP)}get mediaStore(){return nG(this,um)}set mediaStore(e){var t,i;if(nG(this,um)&&(null==(t=nG(this,uE))||t.call(this),nQ(this,uE,void 0)),nQ(this,um,e),!nG(this,um)&&!this.hasAttribute(nX.NO_DEFAULT_STORE))return void nZ(this,uf,u_).call(this);nQ(this,uE,null==(i=nG(this,um))?void 0:i.subscribe(nG(this,uv)))}get fullscreenElement(){var e;return null!=(e=nG(this,uh))?e:this}set fullscreenElement(e){var t;this.hasAttribute(nX.FULLSCREEN_ELEMENT)&&this.removeAttribute(nX.FULLSCREEN_ELEMENT),nQ(this,uh,e),null==(t=nG(this,um))||t.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}get defaultSubtitles(){return r0(this,nX.DEFAULT_SUBTITLES)}set defaultSubtitles(e){r1(this,nX.DEFAULT_SUBTITLES,e)}get defaultStreamType(){return r2(this,nX.DEFAULT_STREAM_TYPE)}set defaultStreamType(e){r3(this,nX.DEFAULT_STREAM_TYPE,e)}get defaultDuration(){return rX(this,nX.DEFAULT_DURATION)}set defaultDuration(e){rJ(this,nX.DEFAULT_DURATION,e)}get noHotkeys(){return r0(this,nX.NO_HOTKEYS)}set noHotkeys(e){r1(this,nX.NO_HOTKEYS,e)}get keysUsed(){return r2(this,nX.KEYS_USED)}set keysUsed(e){r3(this,nX.KEYS_USED,e)}get liveEdgeOffset(){return rX(this,nX.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){rJ(this,nX.LIVE_EDGE_OFFSET,e)}get noAutoSeekToLive(){return r0(this,nX.NO_AUTO_SEEK_TO_LIVE)}set noAutoSeekToLive(e){r1(this,nX.NO_AUTO_SEEK_TO_LIVE,e)}get noVolumePref(){return r0(this,nX.NO_VOLUME_PREF)}set noVolumePref(e){r1(this,nX.NO_VOLUME_PREF,e)}get noMutedPref(){return r0(this,nX.NO_MUTED_PREF)}set noMutedPref(e){r1(this,nX.NO_MUTED_PREF,e)}get noSubtitlesLangPref(){return r0(this,nX.NO_SUBTITLES_LANG_PREF)}set noSubtitlesLangPref(e){r1(this,nX.NO_SUBTITLES_LANG_PREF,e)}get noDefaultStore(){return r0(this,nX.NO_DEFAULT_STORE)}set noDefaultStore(e){r1(this,nX.NO_DEFAULT_STORE,e)}attributeChangedCallback(e,t,i){var a,r,n,s,o,l,d,u,c,h,m,v;if(super.attributeChangedCallback(e,t,i),e===nX.NO_HOTKEYS)i!==t&&""===i?(this.hasAttribute(nX.HOTKEYS)&&console.warn("Media Chrome: Both `hotkeys` and `nohotkeys` have been set. All hotkeys will be disabled."),this.disableHotkeys()):i!==t&&null===i&&this.enableHotkeys();else if(e===nX.HOTKEYS)nG(this,uc).value=i;else if(e===nX.DEFAULT_SUBTITLES&&i!==t)null==(a=nG(this,um))||a.dispatch({type:"optionschangerequest",detail:{defaultSubtitles:this.hasAttribute(nX.DEFAULT_SUBTITLES)}});else if(e===nX.DEFAULT_STREAM_TYPE)null==(n=nG(this,um))||n.dispatch({type:"optionschangerequest",detail:{defaultStreamType:null!=(r=this.getAttribute(nX.DEFAULT_STREAM_TYPE))?r:void 0}});else if(e===nX.LIVE_EDGE_OFFSET)null==(s=nG(this,um))||s.dispatch({type:"optionschangerequest",detail:{liveEdgeOffset:this.hasAttribute(nX.LIVE_EDGE_OFFSET)?+this.getAttribute(nX.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(nX.SEEK_TO_LIVE_OFFSET)?void 0:+this.getAttribute(nX.LIVE_EDGE_OFFSET)}});else if(e===nX.SEEK_TO_LIVE_OFFSET)null==(o=nG(this,um))||o.dispatch({type:"optionschangerequest",detail:{seekToLiveOffset:this.hasAttribute(nX.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(nX.SEEK_TO_LIVE_OFFSET):void 0}});else if(e===nX.NO_AUTO_SEEK_TO_LIVE)null==(l=nG(this,um))||l.dispatch({type:"optionschangerequest",detail:{noAutoSeekToLive:this.hasAttribute(nX.NO_AUTO_SEEK_TO_LIVE)}});else if(e===nX.FULLSCREEN_ELEMENT){let e=i?null==(d=this.getRootNode())?void 0:d.getElementById(i):void 0;nQ(this,uh,e),null==(u=nG(this,um))||u.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}else e===nX.LANG&&i!==t?(rA=i,null==(c=nG(this,um))||c.dispatch({type:"optionschangerequest",detail:{mediaLang:i}})):e===nX.LOOP&&i!==t?null==(h=nG(this,um))||h.dispatch({type:a7.MEDIA_LOOP_REQUEST,detail:null!=i}):e===nX.NO_VOLUME_PREF&&i!==t?null==(m=nG(this,um))||m.dispatch({type:"optionschangerequest",detail:{noVolumePref:this.hasAttribute(nX.NO_VOLUME_PREF)}}):e===nX.NO_MUTED_PREF&&i!==t&&(null==(v=nG(this,um))||v.dispatch({type:"optionschangerequest",detail:{noMutedPref:this.hasAttribute(nX.NO_MUTED_PREF)}}))}connectedCallback(){var e,t;nG(this,um)||this.hasAttribute(nX.NO_DEFAULT_STORE)||nZ(this,uf,u_).call(this),null==(e=nG(this,um))||e.dispatch({type:"documentelementchangerequest",detail:rx}),super.connectedCallback(),nG(this,um)&&!nG(this,uE)&&nQ(this,uE,null==(t=nG(this,um))?void 0:t.subscribe(nG(this,uv))),void 0!==nG(this,ug)&&nG(this,um)&&this.media&&setTimeout(()=>{var e,t,i;(null==(t=null==(e=this.media)?void 0:e.textTracks)?void 0:t.length)&&(null==(i=nG(this,um))||i.dispatch({type:a7.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:nG(this,ug)}))},0),this.hasAttribute(nX.NO_HOTKEYS)?this.disableHotkeys():this.enableHotkeys()}disconnectedCallback(){var e,t,i,a,r;if(null==(e=super.disconnectedCallback)||e.call(this),nG(this,um)){let e=nG(this,um).getState();nQ(this,ug,!!(null==(t=e.mediaSubtitlesShowing)?void 0:t.length)),null==(i=nG(this,um))||i.dispatch({type:"documentelementchangerequest",detail:void 0}),null==(a=nG(this,um))||a.dispatch({type:a7.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:!1})}nG(this,uE)&&(null==(r=nG(this,uE))||r.call(this),nQ(this,uE,void 0))}mediaSetCallback(e){var t;super.mediaSetCallback(e),null==(t=nG(this,um))||t.dispatch({type:"mediaelementchangerequest",detail:e}),e.hasAttribute("tabindex")||(e.tabIndex=-1)}mediaUnsetCallback(e){var t;super.mediaUnsetCallback(e),null==(t=nG(this,um))||t.dispatch({type:"mediaelementchangerequest",detail:void 0})}propagateMediaState(e,t){n6(this.mediaStateReceivers,e,t)}associateElement(e){if(!e)return;let{associatedElementSubscriptions:t}=this;if(t.has(e))return;let i=n7(e,this.registerMediaStateReceiver.bind(this),this.unregisterMediaStateReceiver.bind(this));Object.values(a7).forEach(t=>{e.addEventListener(t,nG(this,ub))}),t.set(e,i)}unassociateElement(e){if(!e)return;let{associatedElementSubscriptions:t}=this;t.has(e)&&(t.get(e)(),t.delete(e),Object.values(a7).forEach(t=>{e.removeEventListener(t,nG(this,ub))}))}registerMediaStateReceiver(e){if(!e)return;let t=this.mediaStateReceivers;!(t.indexOf(e)>-1)&&(t.push(e),nG(this,um)&&Object.entries(nG(this,um).getState()).forEach(([t,i])=>{n6([e],t,i)}))}unregisterMediaStateReceiver(e){let t=this.mediaStateReceivers,i=t.indexOf(e);i<0||t.splice(i,1)}enableHotkeys(){this.addEventListener("keydown",nZ(this,uA,uk))}disableHotkeys(){this.removeEventListener("keydown",nZ(this,uA,uk)),this.removeEventListener("keyup",nZ(this,uy,uT))}get hotkeys(){return r2(this,nX.HOTKEYS)}set hotkeys(e){r3(this,nX.HOTKEYS,e)}keyboardShortcutHandler(e){var t,i,a,r,n,s,o,l,d;let u,c,h,m=e.target;if(!((null!=(a=null!=(i=null==(t=m.getAttribute(nX.KEYS_USED))?void 0:t.split(" "))?i:null==m?void 0:m.keysUsed)?a:[]).map(e=>"Space"===e?" ":e).filter(Boolean).includes(e.key)||nG(this,uc).contains(`no${e.key.toLowerCase()}`)||" "===e.key&&nG(this,uc).contains("nospace"))&&!(e.shiftKey&&("/"===e.key||"?"===e.key)&&nG(this,uc).contains("noshift+/")))switch(e.key){case" ":case"k":u=nG(this,um).getState().mediaPaused?a7.MEDIA_PLAY_REQUEST:a7.MEDIA_PAUSE_REQUEST,this.dispatchEvent(new rO.CustomEvent(u,{composed:!0,bubbles:!0}));break;case"m":u="off"===this.mediaStore.getState().mediaVolumeLevel?a7.MEDIA_UNMUTE_REQUEST:a7.MEDIA_MUTE_REQUEST,this.dispatchEvent(new rO.CustomEvent(u,{composed:!0,bubbles:!0}));break;case"f":u=this.mediaStore.getState().mediaIsFullscreen?a7.MEDIA_EXIT_FULLSCREEN_REQUEST:a7.MEDIA_ENTER_FULLSCREEN_REQUEST,this.dispatchEvent(new rO.CustomEvent(u,{composed:!0,bubbles:!0}));break;case"c":this.dispatchEvent(new rO.CustomEvent(a7.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}));break;case"ArrowLeft":case"j":{let e=this.hasAttribute(nX.KEYBOARD_BACKWARD_SEEK_OFFSET)?+this.getAttribute(nX.KEYBOARD_BACKWARD_SEEK_OFFSET):10;c=Math.max((null!=(r=this.mediaStore.getState().mediaCurrentTime)?r:0)-e,0),h=new rO.CustomEvent(a7.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:c}),this.dispatchEvent(h);break}case"ArrowRight":case"l":{let e=this.hasAttribute(nX.KEYBOARD_FORWARD_SEEK_OFFSET)?+this.getAttribute(nX.KEYBOARD_FORWARD_SEEK_OFFSET):10;c=Math.max((null!=(n=this.mediaStore.getState().mediaCurrentTime)?n:0)+e,0),h=new rO.CustomEvent(a7.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:c}),this.dispatchEvent(h);break}case"ArrowUp":{let e=this.hasAttribute(nX.KEYBOARD_UP_VOLUME_STEP)?+this.getAttribute(nX.KEYBOARD_UP_VOLUME_STEP):.025;c=Math.min((null!=(s=this.mediaStore.getState().mediaVolume)?s:1)+e,1),h=new rO.CustomEvent(a7.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:c}),this.dispatchEvent(h);break}case"ArrowDown":{let e=this.hasAttribute(nX.KEYBOARD_DOWN_VOLUME_STEP)?+this.getAttribute(nX.KEYBOARD_DOWN_VOLUME_STEP):.025;c=Math.max((null!=(o=this.mediaStore.getState().mediaVolume)?o:1)-e,0),h=new rO.CustomEvent(a7.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:c}),this.dispatchEvent(h);break}case"<":c=Math.max((null!=(l=this.mediaStore.getState().mediaPlaybackRate)?l:1)-.25,.25).toFixed(2),h=new rO.CustomEvent(a7.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:c}),this.dispatchEvent(h);break;case">":c=Math.min((null!=(d=this.mediaStore.getState().mediaPlaybackRate)?d:1)+.25,2).toFixed(2),h=new rO.CustomEvent(a7.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:c}),this.dispatchEvent(h);break;case"/":case"?":e.shiftKey&&nZ(this,uw,uS).call(this);break;case"p":u=this.mediaStore.getState().mediaIsPip?a7.MEDIA_EXIT_PIP_REQUEST:a7.MEDIA_ENTER_PIP_REQUEST,h=new rO.CustomEvent(u,{composed:!0,bubbles:!0}),this.dispatchEvent(h)}}}uc=new WeakMap,uh=new WeakMap,um=new WeakMap,up=new WeakMap,uv=new WeakMap,uE=new WeakMap,ub=new WeakMap,ug=new WeakMap,uf=new WeakSet,u_=function(){var e;this.mediaStore=(({media:e,fullscreenElement:t,documentElement:i,stateMediator:a=nK,requestMap:r=nq,options:n={},monitorStateOwnersOnlyWithSubscriptions:s=!0})=>{let o,l=[],d={options:{...n}},u=Object.freeze({mediaPreviewTime:void 0,mediaPreviewImage:void 0,mediaPreviewCoords:void 0,mediaPreviewChapter:void 0}),c=e=>{void 0!=e&&(nB(e,u)||(u=Object.freeze({...u,...e}),l.forEach(e=>e(u))))},h=()=>{c(Object.entries(a).reduce((e,[t,{get:i}])=>(e[t]=i(d),e),{}))},m={},v=async(e,t)=>{var i,r,n,u,v,E,b,g,f,_,y,T,A,k,w,S;let I=!!o;if(o={...d,...null!=o?o:{},...e},I)return;await nF(...Object.values(e));let R=l.length>0&&0===t&&s,D=d.media!==o.media,L=(null==(i=d.media)?void 0:i.textTracks)!==(null==(r=o.media)?void 0:r.textTracks),C=(null==(n=d.media)?void 0:n.videoRenditions)!==(null==(u=o.media)?void 0:u.videoRenditions),M=(null==(v=d.media)?void 0:v.audioTracks)!==(null==(E=o.media)?void 0:E.audioTracks),O=(null==(b=d.media)?void 0:b.remote)!==(null==(g=o.media)?void 0:g.remote),x=d.documentElement!==o.documentElement,N=!!d.media&&(D||R),P=!!(null==(f=d.media)?void 0:f.textTracks)&&(L||R),U=!!(null==(_=d.media)?void 0:_.videoRenditions)&&(C||R),B=!!(null==(y=d.media)?void 0:y.audioTracks)&&(M||R),H=!!(null==(T=d.media)?void 0:T.remote)&&(O||R),W=!!d.documentElement&&(x||R),V=N||P||U||B||H||W,F=0===l.length&&1===t&&s,$=!!o.media&&(D||F),K=!!(null==(A=o.media)?void 0:A.textTracks)&&(L||F),q=!!(null==(k=o.media)?void 0:k.videoRenditions)&&(C||F),Y=!!(null==(w=o.media)?void 0:w.audioTracks)&&(M||F),G=!!(null==(S=o.media)?void 0:S.remote)&&(O||F),j=!!o.documentElement&&(x||F),Q=$||K||q||Y||G||j;if(!(V||Q)){Object.entries(o).forEach(([e,t])=>{d[e]=t}),h(),o=void 0;return}Object.entries(a).forEach(([e,{get:t,mediaEvents:i=[],textTracksEvents:a=[],videoRenditionsEvents:r=[],audioTracksEvents:n=[],remoteEvents:s=[],rootEvents:l=[],stateOwnersUpdateHandlers:u=[]}])=>{let h;m[e]||(m[e]={});let v=i=>{c({[e]:t(d,i)})};h=m[e].mediaEvents,i.forEach(t=>{h&&N&&(d.media.removeEventListener(t,h),m[e].mediaEvents=void 0),$&&(o.media.addEventListener(t,v),m[e].mediaEvents=v)}),h=m[e].textTracksEvents,a.forEach(t=>{var i,a;h&&P&&(null==(i=d.media.textTracks)||i.removeEventListener(t,h),m[e].textTracksEvents=void 0),K&&(null==(a=o.media.textTracks)||a.addEventListener(t,v),m[e].textTracksEvents=v)}),h=m[e].videoRenditionsEvents,r.forEach(t=>{var i,a;h&&U&&(null==(i=d.media.videoRenditions)||i.removeEventListener(t,h),m[e].videoRenditionsEvents=void 0),q&&(null==(a=o.media.videoRenditions)||a.addEventListener(t,v),m[e].videoRenditionsEvents=v)}),h=m[e].audioTracksEvents,n.forEach(t=>{var i,a;h&&B&&(null==(i=d.media.audioTracks)||i.removeEventListener(t,h),m[e].audioTracksEvents=void 0),Y&&(null==(a=o.media.audioTracks)||a.addEventListener(t,v),m[e].audioTracksEvents=v)}),h=m[e].remoteEvents,s.forEach(t=>{var i,a;h&&H&&(null==(i=d.media.remote)||i.removeEventListener(t,h),m[e].remoteEvents=void 0),G&&(null==(a=o.media.remote)||a.addEventListener(t,v),m[e].remoteEvents=v)}),h=m[e].rootEvents,l.forEach(t=>{h&&W&&(d.documentElement.removeEventListener(t,h),m[e].rootEvents=void 0),j&&(o.documentElement.addEventListener(t,v),m[e].rootEvents=v)});let E=m[e].stateOwnersUpdateHandlers;if(E&&V&&(Array.isArray(E)?E:[E]).forEach(e=>{"function"==typeof e&&e()}),Q){let t=u.map(e=>e(v,o)).filter(e=>"function"==typeof e);m[e].stateOwnersUpdateHandlers=1===t.length?t[0]:t}else V&&(m[e].stateOwnersUpdateHandlers=void 0)}),Object.entries(o).forEach(([e,t])=>{d[e]=t}),h(),o=void 0};return v({media:e,fullscreenElement:t,documentElement:i,options:n}),{dispatch(e){let{type:t,detail:i}=e;if(r[t]&&null==u.mediaErrorCode)return void c(r[t](a,d,e));"mediaelementchangerequest"===t?v({media:i}):"fullscreenelementchangerequest"===t?v({fullscreenElement:i}):"documentelementchangerequest"===t?v({documentElement:i}):"optionschangerequest"===t&&(Object.entries(null!=i?i:{}).forEach(([e,t])=>{d.options[e]=t}),h())},getState:()=>u,subscribe:e=>(v({},l.length+1),l.push(e),e(u),()=>{let t=l.indexOf(e);t>=0&&(v({},l.length-1),l.splice(t,1))})}})({media:this.media,fullscreenElement:this.fullscreenElement,options:{defaultSubtitles:this.hasAttribute(nX.DEFAULT_SUBTITLES),defaultDuration:this.hasAttribute(nX.DEFAULT_DURATION)?+this.getAttribute(nX.DEFAULT_DURATION):void 0,defaultStreamType:null!=(e=this.getAttribute(nX.DEFAULT_STREAM_TYPE))?e:void 0,liveEdgeOffset:this.hasAttribute(nX.LIVE_EDGE_OFFSET)?+this.getAttribute(nX.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(nX.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(nX.SEEK_TO_LIVE_OFFSET):this.hasAttribute(nX.LIVE_EDGE_OFFSET)?+this.getAttribute(nX.LIVE_EDGE_OFFSET):void 0,noAutoSeekToLive:this.hasAttribute(nX.NO_AUTO_SEEK_TO_LIVE),noVolumePref:this.hasAttribute(nX.NO_VOLUME_PREF),noMutedPref:this.hasAttribute(nX.NO_MUTED_PREF),noSubtitlesLangPref:this.hasAttribute(nX.NO_SUBTITLES_LANG_PREF)}})},uy=new WeakSet,uT=function(e){let{key:t,shiftKey:i}=e;if(!(i&&("/"===t||"?"===t)||nz.includes(t)))return void this.removeEventListener("keyup",nZ(this,uy,uT));this.keyboardShortcutHandler(e)},uA=new WeakSet,uk=function(e){var t;let{metaKey:i,altKey:a,key:r,shiftKey:n}=e,s=n&&("/"===r||"?"===r);if(s&&(null==(t=nG(this,up))?void 0:t.open)||i||a||!s&&!nz.includes(r))return void this.removeEventListener("keyup",nZ(this,uy,uT));let o=e.target,l=o instanceof HTMLElement&&("media-volume-range"===o.tagName.toLowerCase()||"media-time-range"===o.tagName.toLowerCase());![" ","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(r)||nG(this,uc).contains(`no${r.toLowerCase()}`)||" "===r&&nG(this,uc).contains("nospace")||l||e.preventDefault(),this.addEventListener("keyup",nZ(this,uy,uT),{once:!0})},uw=new WeakSet,uS=function(){nG(this,up)||(nQ(this,up,rx.createElement("media-keyboard-shortcuts-dialog")),this.appendChild(nG(this,up))),nG(this,up).open=!0};let n0=Object.values(ra),n1=Object.values(rt),n2=e=>{var t,i,a,r;let{observedAttributes:n}=e.constructor;!n&&(null==(t=e.nodeName)?void 0:t.includes("-"))&&(rO.customElements.upgrade(e),{observedAttributes:n}=e.constructor);let s=null==(r=null==(a=null==(i=null==e?void 0:e.getAttribute)?void 0:i.call(e,re.MEDIA_CHROME_ATTRIBUTES))?void 0:a.split)?void 0:r.call(a,/\s+/);return Array.isArray(n||s)?(n||s).filter(e=>n0.includes(e)):[]},n3=e=>(e=>{var t,i;return(null==(t=e.nodeName)?void 0:t.includes("-"))&&rO.customElements.get(null==(i=e.nodeName)?void 0:i.toLowerCase())&&!(e instanceof rO.customElements.get(e.nodeName.toLowerCase()))&&rO.customElements.upgrade(e),n1.some(t=>t in e)})(e)||!!n2(e).length,n4=e=>{var t;return null==(t=null==e?void 0:e.join)?void 0:t.call(e,":")},n5={[ra.MEDIA_SUBTITLES_LIST]:nE,[ra.MEDIA_SUBTITLES_SHOWING]:nE,[ra.MEDIA_SEEKABLE]:n4,[ra.MEDIA_BUFFERED]:e=>null==e?void 0:e.map(n4).join(" "),[ra.MEDIA_PREVIEW_COORDS]:e=>null==e?void 0:e.join(" "),[ra.MEDIA_RENDITION_LIST]:function(e){return null==e?void 0:e.map(rh).join(" ")},[ra.MEDIA_AUDIO_TRACK_LIST]:function(e){return null==e?void 0:e.map(rp).join(" ")}},n9=async(e,t,i)=>{var a,r;if(e.isConnected||await rg(0),"boolean"==typeof i||null==i)return r1(e,t,i);if("number"==typeof i)return rJ(e,t,i);if("string"==typeof i)return r3(e,t,i);if(Array.isArray(i)&&!i.length)return e.removeAttribute(t);let n=null!=(r=null==(a=n5[t])?void 0:a.call(n5,i))?r:i;return e.setAttribute(t,n)},n8=(e,t)=>{if((e=>{var t;return!!(null==(t=e.closest)?void 0:t.call(e,'*[slot="media"]'))})(e))return;let i=(e,t)=>{var i,a;n3(e)&&t(e);let{children:r=[]}=null!=e?e:{};[...r,...null!=(a=null==(i=null==e?void 0:e.shadowRoot)?void 0:i.children)?a:[]].forEach(e=>n8(e,t))},a=null==e?void 0:e.nodeName.toLowerCase();if(a.includes("-")&&!n3(e))return void rO.customElements.whenDefined(a).then(()=>{i(e,t)});i(e,t)},n6=(e,t,i)=>{e.forEach(e=>{if(t in e){e[t]=i;return}let a=n2(e),r=t.toLowerCase();a.includes(r)&&n9(e,r,i)})},n7=(e,t,i)=>{n8(e,t);let a=e=>{var i;t(null!=(i=null==e?void 0:e.composedPath()[0])?i:e.target)},r=e=>{var t;i(null!=(t=null==e?void 0:e.composedPath()[0])?t:e.target)};e.addEventListener(a7.REGISTER_MEDIA_STATE_RECEIVER,a),e.addEventListener(a7.UNREGISTER_MEDIA_STATE_RECEIVER,r);let n=[],s=e=>{let a=e.target;"media"!==a.name&&(n.forEach(e=>n8(e,i)),(n=[...a.assignedElements({flatten:!0})]).forEach(e=>n8(e,t)))};e.addEventListener("slotchange",s);let o=new MutationObserver(e=>{e.forEach(e=>{let{addedNodes:a=[],removedNodes:r=[],type:n,target:s,attributeName:o}=e;"childList"===n?(Array.prototype.forEach.call(a,e=>n8(e,t)),Array.prototype.forEach.call(r,e=>n8(e,i))):"attributes"===n&&o===re.MEDIA_CHROME_ATTRIBUTES&&(n3(s)?t(s):i(s))})});return o.observe(e,{childList:!0,attributes:!0,subtree:!0}),()=>{n8(e,i),e.removeEventListener("slotchange",s),o.disconnect(),e.removeEventListener(a7.REGISTER_MEDIA_STATE_RECEIVER,a),e.removeEventListener(a7.UNREGISTER_MEDIA_STATE_RECEIVER,r)}};rO.customElements.get("media-controller")||rO.customElements.define("media-controller",nJ);let se={PLACEMENT:"placement",BOUNDS:"bounds"};class st extends rO.HTMLElement{constructor(){if(super(),this.updateXOffset=()=>{var e;if(!rQ(this,{checkOpacity:!1,checkVisibilityCSS:!1}))return;let t=this.placement;if("left"===t||"right"===t)return void this.style.removeProperty("--media-tooltip-offset-x");let i=getComputedStyle(this),a=null!=(e=rY(this,"#"+this.bounds))?e:rV(this);if(!a)return;let{x:r,width:n}=a.getBoundingClientRect(),{x:s,width:o}=this.getBoundingClientRect(),l=i.getPropertyValue("--media-tooltip-offset-x"),d=l?parseFloat(l.replace("px","")):0,u=i.getPropertyValue("--media-tooltip-container-margin"),c=u?parseFloat(u.replace("px","")):0,h=s-r+d-c,m=s+o-(r+n)+d+c;return h<0?void this.style.setProperty("--media-tooltip-offset-x",`${h}px`):m>0?void this.style.setProperty("--media-tooltip-offset-x",`${m}px`):void this.style.removeProperty("--media-tooltip-offset-x")},!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=rW(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}if(this.arrowEl=this.shadowRoot.querySelector("#arrow"),Object.prototype.hasOwnProperty.call(this,"placement")){let e=this.placement;delete this.placement,this.placement=e}}static get observedAttributes(){return[se.PLACEMENT,se.BOUNDS]}get placement(){return r2(this,se.PLACEMENT)}set placement(e){r3(this,se.PLACEMENT,e)}get bounds(){return r2(this,se.BOUNDS)}set bounds(e){r3(this,se.BOUNDS,e)}}st.shadowRootOptions={mode:"open"},st.getTemplateHTML=function(e){return`
    <style>
      :host {
        --_tooltip-background-color: var(--media-tooltip-background-color, var(--media-secondary-color, rgba(20, 20, 30, .7)));
        --_tooltip-background: var(--media-tooltip-background, var(--_tooltip-background-color));
        --_tooltip-arrow-half-width: calc(var(--media-tooltip-arrow-width, 12px) / 2);
        --_tooltip-arrow-height: var(--media-tooltip-arrow-height, 5px);
        --_tooltip-arrow-background: var(--media-tooltip-arrow-color, var(--_tooltip-background-color));
        position: relative;
        pointer-events: none;
        display: var(--media-tooltip-display, inline-flex);
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        z-index: var(--media-tooltip-z-index, 1);
        background: var(--_tooltip-background);
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        font: var(--media-font,
          var(--media-font-weight, 400)
          var(--media-font-size, 13px) /
          var(--media-text-content-height, var(--media-control-height, 18px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        padding: var(--media-tooltip-padding, .35em .7em);
        border: var(--media-tooltip-border, none);
        border-radius: var(--media-tooltip-border-radius, 5px);
        filter: var(--media-tooltip-filter, drop-shadow(0 0 4px rgba(0, 0, 0, .2)));
        white-space: var(--media-tooltip-white-space, nowrap);
      }

      :host([hidden]) {
        display: none;
      }

      img, svg {
        display: inline-block;
      }

      #arrow {
        position: absolute;
        width: 0px;
        height: 0px;
        border-style: solid;
        display: var(--media-tooltip-arrow-display, block);
      }

      :host(:not([placement])),
      :host([placement="top"]) {
        position: absolute;
        bottom: calc(100% + var(--media-tooltip-distance, 12px));
        left: 50%;
        transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
      }
      :host(:not([placement])) #arrow,
      :host([placement="top"]) #arrow {
        top: 100%;
        left: 50%;
        border-width: var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width);
        border-color: var(--_tooltip-arrow-background) transparent transparent transparent;
        transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
      }

      :host([placement="right"]) {
        position: absolute;
        left: calc(100% + var(--media-tooltip-distance, 12px));
        top: 50%;
        transform: translate(0, -50%);
      }
      :host([placement="right"]) #arrow {
        top: 50%;
        right: 100%;
        border-width: var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0;
        border-color: transparent var(--_tooltip-arrow-background) transparent transparent;
        transform: translate(0, -50%);
      }

      :host([placement="bottom"]) {
        position: absolute;
        top: calc(100% + var(--media-tooltip-distance, 12px));
        left: 50%;
        transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
      }
      :host([placement="bottom"]) #arrow {
        bottom: 100%;
        left: 50%;
        border-width: 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width);
        border-color: transparent transparent var(--_tooltip-arrow-background) transparent;
        transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
      }

      :host([placement="left"]) {
        position: absolute;
        right: calc(100% + var(--media-tooltip-distance, 12px));
        top: 50%;
        transform: translate(0, -50%);
      }
      :host([placement="left"]) #arrow {
        top: 50%;
        left: 100%;
        border-width: var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height);
        border-color: transparent transparent transparent var(--_tooltip-arrow-background);
        transform: translate(0, -50%);
      }
      
      :host([placement="none"]) #arrow {
        display: none;
      }
    </style>
    <slot></slot>
    <div id="arrow"></div>
  `},rO.customElements.get("media-tooltip")||rO.customElements.define("media-tooltip",st);var si=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},sa=(e,t,i)=>(si(e,t,"read from private field"),i?i.call(e):t.get(e)),sr=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},sn=(e,t,i,a)=>(si(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i);let ss={TOOLTIP_PLACEMENT:"tooltipplacement",DISABLED:"disabled",NO_TOOLTIP:"notooltip"};class so extends rO.HTMLElement{constructor(){if(super(),sr(this,uM),sr(this,uI,void 0),this.preventClick=!1,this.tooltipEl=null,sr(this,uR,e=>{this.preventClick||this.handleClick(e),setTimeout(sa(this,uD),0)}),sr(this,uD,()=>{var e,t;null==(t=null==(e=this.tooltipEl)?void 0:e.updateXOffset)||t.call(e)}),sr(this,uL,e=>{let{key:t}=e;if(!this.keysUsed.includes(t))return void this.removeEventListener("keyup",sa(this,uL));this.preventClick||this.handleClick(e)}),sr(this,uC,e=>{let{metaKey:t,altKey:i,key:a}=e;if(t||i||!this.keysUsed.includes(a))return void this.removeEventListener("keyup",sa(this,uL));this.addEventListener("keyup",sa(this,uL),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=rW(this.attributes),t=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(t):this.shadowRoot.innerHTML=t}this.tooltipEl=this.shadowRoot.querySelector("media-tooltip")}static get observedAttributes(){return["disabled",ss.TOOLTIP_PLACEMENT,re.MEDIA_CONTROLLER,ra.MEDIA_LANG]}enable(){this.addEventListener("click",sa(this,uR)),this.addEventListener("keydown",sa(this,uC)),this.tabIndex=0}disable(){this.removeEventListener("click",sa(this,uR)),this.removeEventListener("keydown",sa(this,uC)),this.removeEventListener("keyup",sa(this,uL)),this.tabIndex=-1}attributeChangedCallback(e,t,i){var a,r,n,s,o;e===re.MEDIA_CONTROLLER?(t&&(null==(r=null==(a=sa(this,uI))?void 0:a.unassociateElement)||r.call(a,this),sn(this,uI,null)),i&&this.isConnected&&(sn(this,uI,null==(n=this.getRootNode())?void 0:n.getElementById(i)),null==(o=null==(s=sa(this,uI))?void 0:s.associateElement)||o.call(s,this))):"disabled"===e&&i!==t?null==i?this.enable():this.disable():e===ss.TOOLTIP_PLACEMENT&&this.tooltipEl&&i!==t?this.tooltipEl.placement=i:e===ra.MEDIA_LANG&&(this.shadowRoot.querySelector('slot[name="tooltip-content"]').innerHTML=this.constructor.getTooltipContentHTML()),sa(this,uD).call(this)}connectedCallback(){var e,t,i;let{style:a}=rZ(this.shadowRoot,":host");a.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),this.hasAttribute("disabled")?this.disable():this.enable(),this.setAttribute("role","button");let r=this.getAttribute(re.MEDIA_CONTROLLER);r&&(sn(this,uI,null==(e=this.getRootNode())?void 0:e.getElementById(r)),null==(i=null==(t=sa(this,uI))?void 0:t.associateElement)||i.call(t,this)),rO.customElements.whenDefined("media-tooltip").then(()=>{var e,t;return(e=uM,t=uO,si(this,e,"access private method"),t).call(this)})}disconnectedCallback(){var e,t;this.disable(),null==(t=null==(e=sa(this,uI))?void 0:e.unassociateElement)||t.call(e,this),sn(this,uI,null),this.removeEventListener("mouseenter",sa(this,uD)),this.removeEventListener("focus",sa(this,uD)),this.removeEventListener("click",sa(this,uR))}get keysUsed(){return["Enter"," "]}get tooltipPlacement(){return r2(this,ss.TOOLTIP_PLACEMENT)}set tooltipPlacement(e){r3(this,ss.TOOLTIP_PLACEMENT,e)}get mediaController(){return r2(this,re.MEDIA_CONTROLLER)}set mediaController(e){r3(this,re.MEDIA_CONTROLLER,e)}get disabled(){return r0(this,ss.DISABLED)}set disabled(e){r1(this,ss.DISABLED,e)}get noTooltip(){return r0(this,ss.NO_TOOLTIP)}set noTooltip(e){r1(this,ss.NO_TOOLTIP,e)}handleClick(e){}}uI=new WeakMap,uR=new WeakMap,uD=new WeakMap,uL=new WeakMap,uC=new WeakMap,uM=new WeakSet,uO=function(){this.addEventListener("mouseenter",sa(this,uD)),this.addEventListener("focus",sa(this,uD)),this.addEventListener("click",sa(this,uR));let e=this.tooltipPlacement;e&&this.tooltipEl&&(this.tooltipEl.placement=e)},so.shadowRootOptions={mode:"open"},so.getTemplateHTML=function(e,t={}){return`
    <style>
      :host {
        position: relative;
        font: var(--media-font,
          var(--media-font-weight, bold)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        padding: var(--media-button-padding, var(--media-control-padding, 10px));
        justify-content: var(--media-button-justify-content, center);
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
        box-sizing: border-box;
        transition: background .15s linear;
        pointer-events: auto;
        cursor: var(--media-cursor, pointer);
        -webkit-tap-highlight-color: transparent;
      }

      
      :host(:focus-visible) {
        box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: 0;
      }
      
      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }

      :host(:hover) {
        background: var(--media-control-hover-background, rgba(50 50 70 / .7));
      }

      svg, img, ::slotted(svg), ::slotted(img) {
        width: var(--media-button-icon-width);
        height: var(--media-button-icon-height, var(--media-control-height, 24px));
        transform: var(--media-button-icon-transform);
        transition: var(--media-button-icon-transition);
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        vertical-align: middle;
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
      }

      media-tooltip {
        
        max-width: 0;
        overflow-x: clip;
        opacity: 0;
        transition: opacity .3s, max-width 0s 9s;
      }

      :host(:hover) media-tooltip,
      :host(:focus-visible) media-tooltip {
        max-width: 100vw;
        opacity: 1;
        transition: opacity .3s;
      }

      :host([notooltip]) slot[name="tooltip"] {
        display: none;
      }
    </style>

    ${this.getSlotTemplateHTML(e,t)}

    <slot name="tooltip">
      <media-tooltip part="tooltip" aria-hidden="true">
        <template shadowrootmode="${st.shadowRootOptions.mode}">
          ${st.getTemplateHTML({})}
        </template>
        <slot name="tooltip-content">
          ${this.getTooltipContentHTML(e)}
        </slot>
      </media-tooltip>
    </slot>
  `},so.getSlotTemplateHTML=function(e,t){return`
    <slot></slot>
  `},so.getTooltipContentHTML=function(){return""},rO.customElements.get("media-chrome-button")||rO.customElements.define("media-chrome-button",so);let sl=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.13 3H3.87a.87.87 0 0 0-.87.87v13.26a.87.87 0 0 0 .87.87h3.4L9 16H5V5h16v11h-4l1.72 2h3.4a.87.87 0 0 0 .87-.87V3.87a.87.87 0 0 0-.86-.87Zm-8.75 11.44a.5.5 0 0 0-.76 0l-4.91 5.73a.5.5 0 0 0 .38.83h9.82a.501.501 0 0 0 .38-.83l-4.91-5.73Z"/>
</svg>
`,sd=e=>{let t=e.mediaIsAirplaying?rk("stop airplay"):rk("start airplay");e.setAttribute("aria-label",t)};class su extends so{static get observedAttributes(){return[...super.observedAttributes,ra.MEDIA_IS_AIRPLAYING,ra.MEDIA_AIRPLAY_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),sd(this)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===ra.MEDIA_IS_AIRPLAYING&&sd(this)}get mediaIsAirplaying(){return r0(this,ra.MEDIA_IS_AIRPLAYING)}set mediaIsAirplaying(e){r1(this,ra.MEDIA_IS_AIRPLAYING,e)}get mediaAirplayUnavailable(){return r2(this,ra.MEDIA_AIRPLAY_UNAVAILABLE)}set mediaAirplayUnavailable(e){r3(this,ra.MEDIA_AIRPLAY_UNAVAILABLE,e)}handleClick(){let e=new rO.CustomEvent(a7.MEDIA_AIRPLAY_REQUEST,{composed:!0,bubbles:!0});this.dispatchEvent(e)}}su.getSlotTemplateHTML=function(e){return`
    <style>
      :host([${ra.MEDIA_IS_AIRPLAYING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${ra.MEDIA_IS_AIRPLAYING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${ra.MEDIA_IS_AIRPLAYING}]) slot[name=tooltip-enter],
      :host(:not([${ra.MEDIA_IS_AIRPLAYING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${sl}</slot>
      <slot name="exit">${sl}</slot>
    </slot>
  `},su.getTooltipContentHTML=function(){return`
    <slot name="tooltip-enter">${rk("start airplay")}</slot>
    <slot name="tooltip-exit">${rk("stop airplay")}</slot>
  `},rO.customElements.get("media-airplay-button")||rO.customElements.define("media-airplay-button",su);let sc=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,sh=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`,sm=e=>{e.setAttribute("aria-checked",n_(e).toString())};class sp extends so{static get observedAttributes(){return[...super.observedAttributes,ra.MEDIA_SUBTITLES_LIST,ra.MEDIA_SUBTITLES_SHOWING]}connectedCallback(){super.connectedCallback(),this.setAttribute("role","switch"),this.setAttribute("aria-label",rk("closed captions")),sm(this)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===ra.MEDIA_SUBTITLES_SHOWING&&sm(this)}get mediaSubtitlesList(){return sv(this,ra.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){sE(this,ra.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return sv(this,ra.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){sE(this,ra.MEDIA_SUBTITLES_SHOWING,e)}handleClick(){this.dispatchEvent(new rO.CustomEvent(a7.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}))}}sp.getSlotTemplateHTML=function(e){return`
    <style>
      :host([aria-checked="true"]) slot[name=off] {
        display: none !important;
      }

      
      :host(:not([aria-checked="true"])) slot[name=on] {
        display: none !important;
      }

      :host([aria-checked="true"]) slot[name=tooltip-enable],
      :host(:not([aria-checked="true"])) slot[name=tooltip-disable] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="on">${sc}</slot>
      <slot name="off">${sh}</slot>
    </slot>
  `},sp.getTooltipContentHTML=function(){return`
    <slot name="tooltip-enable">${rk("Enable captions")}</slot>
    <slot name="tooltip-disable">${rk("Disable captions")}</slot>
  `};let sv=(e,t)=>{let i=e.getAttribute(t);return i?nm(i):[]},sE=(e,t,i)=>{if(!(null==i?void 0:i.length))return void e.removeAttribute(t);let a=nE(i);e.getAttribute(t)!==a&&e.setAttribute(t,a)};rO.customElements.get("media-captions-button")||rO.customElements.define("media-captions-button",sp);let sb=e=>{let t=e.mediaIsCasting?rk("stop casting"):rk("start casting");e.setAttribute("aria-label",t)};class sg extends so{static get observedAttributes(){return[...super.observedAttributes,ra.MEDIA_IS_CASTING,ra.MEDIA_CAST_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),sb(this)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===ra.MEDIA_IS_CASTING&&sb(this)}get mediaIsCasting(){return r0(this,ra.MEDIA_IS_CASTING)}set mediaIsCasting(e){r1(this,ra.MEDIA_IS_CASTING,e)}get mediaCastUnavailable(){return r2(this,ra.MEDIA_CAST_UNAVAILABLE)}set mediaCastUnavailable(e){r3(this,ra.MEDIA_CAST_UNAVAILABLE,e)}handleClick(){let e=this.mediaIsCasting?a7.MEDIA_EXIT_CAST_REQUEST:a7.MEDIA_ENTER_CAST_REQUEST;this.dispatchEvent(new rO.CustomEvent(e,{composed:!0,bubbles:!0}))}}sg.getSlotTemplateHTML=function(e){return`
    <style>
      :host([${ra.MEDIA_IS_CASTING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${ra.MEDIA_IS_CASTING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${ra.MEDIA_IS_CASTING}]) slot[name=tooltip-enter],
      :host(:not([${ra.MEDIA_IS_CASTING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter"><svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/></g></svg></slot>
      <slot name="exit"><svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/><path class="cast_caf_icon_boxfill" d="M5,7 L5,8.63 C8,8.6 13.37,14 13.37,17 L19,17 L19,7 Z"/></g></svg></slot>
    </slot>
  `},sg.getTooltipContentHTML=function(){return`
    <slot name="tooltip-enter">${rk("Start casting")}</slot>
    <slot name="tooltip-exit">${rk("Stop casting")}</slot>
  `},rO.customElements.get("media-cast-button")||rO.customElements.define("media-cast-button",sg);var sf=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},s_=(e,t,i)=>(sf(e,t,"read from private field"),i?i.call(e):t.get(e)),sy=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},sT=(e,t,i,a)=>(sf(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),sA=(e,t,i)=>(sf(e,t,"access private method"),i);let sk={OPEN:"open",ANCHOR:"anchor"};class sw extends rO.HTMLElement{constructor(){super(),sy(this,uU),sy(this,uH),sy(this,uV),sy(this,u$),sy(this,uq),sy(this,uG),sy(this,ux,!1),sy(this,uN,null),sy(this,uP,null),this.addEventListener("invoke",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this)}static get observedAttributes(){return[sk.OPEN,sk.ANCHOR]}get open(){return r0(this,sk.OPEN)}set open(e){r1(this,sk.OPEN,e)}handleEvent(e){switch(e.type){case"invoke":sA(this,u$,uK).call(this,e);break;case"focusout":sA(this,uq,uY).call(this,e);break;case"keydown":sA(this,uG,uj).call(this,e)}}connectedCallback(){sA(this,uU,uB).call(this),this.role||(this.role="dialog")}attributeChangedCallback(e,t,i){sA(this,uU,uB).call(this),e===sk.OPEN&&i!==t&&(this.open?sA(this,uH,uW).call(this):sA(this,uV,uF).call(this))}focus(){sT(this,uN,rG());let e=!this.dispatchEvent(new Event("focus",{composed:!0,cancelable:!0})),t=!this.dispatchEvent(new Event("focusin",{composed:!0,bubbles:!0,cancelable:!0}));if(e||t)return;let i=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');null==i||i.focus()}get keysUsed(){return["Escape","Tab"]}}ux=new WeakMap,uN=new WeakMap,uP=new WeakMap,uU=new WeakSet,uB=function(){if(!s_(this,ux)&&(sT(this,ux,!0),!this.shadowRoot)){this.attachShadow(this.constructor.shadowRootOptions);let e=rW(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e),queueMicrotask(()=>{let{style:e}=rZ(this.shadowRoot,":host");e.setProperty("transition","display .15s, visibility .15s, opacity .15s ease-in, transform .15s ease-in")})}},uH=new WeakSet,uW=function(){var e;null==(e=s_(this,uP))||e.setAttribute("aria-expanded","true"),this.dispatchEvent(new Event("open",{composed:!0,bubbles:!0})),this.addEventListener("transitionend",()=>this.focus(),{once:!0})},uV=new WeakSet,uF=function(){var e;null==(e=s_(this,uP))||e.setAttribute("aria-expanded","false"),this.dispatchEvent(new Event("close",{composed:!0,bubbles:!0}))},u$=new WeakSet,uK=function(e){sT(this,uP,e.relatedTarget),rq(this,e.relatedTarget)||(this.open=!this.open)},uq=new WeakSet,uY=function(e){var t;!rq(this,e.relatedTarget)&&(null==(t=s_(this,uN))||t.focus(),s_(this,uP)&&s_(this,uP)!==e.relatedTarget&&this.open&&(this.open=!1))},uG=new WeakSet,uj=function(e){var t,i,a,r,n;let{key:s,ctrlKey:o,altKey:l,metaKey:d}=e;o||l||d||this.keysUsed.includes(s)&&(e.preventDefault(),e.stopPropagation(),"Tab"===s?(e.shiftKey?null==(i=null==(t=this.previousElementSibling)?void 0:t.focus)||i.call(t):null==(r=null==(a=this.nextElementSibling)?void 0:a.focus)||r.call(a),this.blur()):"Escape"===s&&(null==(n=s_(this,uN))||n.focus(),this.open=!1))},sw.shadowRootOptions={mode:"open"},sw.getTemplateHTML=function(e){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        display: var(--media-dialog-display, inline-flex);
        justify-content: center;
        align-items: center;
        
        transition-behavior: allow-discrete;
        visibility: hidden;
        opacity: 0;
        transform: translateY(2px) scale(.99);
        pointer-events: none;
      }

      :host([open]) {
        transition: display .2s, visibility 0s, opacity .2s ease-out, transform .15s ease-out;
        visibility: visible;
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      #content {
        display: flex;
        position: relative;
        box-sizing: border-box;
        width: min(320px, 100%);
        word-wrap: break-word;
        max-height: 100%;
        overflow: auto;
        text-align: center;
        line-height: 1.4;
      }
    </style>
    ${this.getSlotTemplateHTML(e)}
  `},sw.getSlotTemplateHTML=function(e){return`
    <slot id="content"></slot>
  `},rO.customElements.get("media-chrome-dialog")||rO.customElements.define("media-chrome-dialog",sw);var sS=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},sI=(e,t,i)=>(sS(e,t,"read from private field"),i?i.call(e):t.get(e)),sR=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},sD=(e,t,i,a)=>(sS(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),sL=(e,t,i)=>(sS(e,t,"access private method"),i);class sC extends rO.HTMLElement{constructor(){if(super(),sR(this,u4),sR(this,u9),sR(this,u6),sR(this,ce),sR(this,ci),sR(this,cr),sR(this,cs),sR(this,cl),sR(this,uQ,void 0),sR(this,uZ,void 0),sR(this,uz,void 0),sR(this,uX,void 0),sR(this,uJ,{}),sR(this,u0,[]),sR(this,u1,()=>{if(this.range.matches(":focus-visible")){let{style:e}=rZ(this.shadowRoot,":host");e.setProperty("--_focus-visible-box-shadow","var(--_focus-box-shadow)")}}),sR(this,u2,()=>{let{style:e}=rZ(this.shadowRoot,":host");e.removeProperty("--_focus-visible-box-shadow")}),sR(this,u3,()=>{let e=this.shadowRoot.querySelector("#segments-clipping");e&&e.parentNode.append(e)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=rW(this.attributes),t=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(t):this.shadowRoot.innerHTML=t}this.container=this.shadowRoot.querySelector("#container"),sD(this,uz,this.shadowRoot.querySelector("#startpoint")),sD(this,uX,this.shadowRoot.querySelector("#endpoint")),this.range=this.shadowRoot.querySelector("#range"),this.appearance=this.shadowRoot.querySelector("#appearance")}static get observedAttributes(){return["disabled","aria-disabled",re.MEDIA_CONTROLLER]}attributeChangedCallback(e,t,i){var a,r,n,s,o;e===re.MEDIA_CONTROLLER?(t&&(null==(r=null==(a=sI(this,uQ))?void 0:a.unassociateElement)||r.call(a,this),sD(this,uQ,null)),i&&this.isConnected&&(sD(this,uQ,null==(n=this.getRootNode())?void 0:n.getElementById(i)),null==(o=null==(s=sI(this,uQ))?void 0:s.associateElement)||o.call(s,this))):("disabled"===e||"aria-disabled"===e&&t!==i)&&(null==i?(this.range.removeAttribute(e),sL(this,u9,u8).call(this)):(this.range.setAttribute(e,i),sL(this,u6,u7).call(this)))}connectedCallback(){var e,t,i;let{style:a}=rZ(this.shadowRoot,":host");a.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),sI(this,uJ).pointer=rZ(this.shadowRoot,"#pointer"),sI(this,uJ).progress=rZ(this.shadowRoot,"#progress"),sI(this,uJ).thumb=rZ(this.shadowRoot,'#thumb, ::slotted([slot="thumb"])'),sI(this,uJ).activeSegment=rZ(this.shadowRoot,"#segments-clipping rect:nth-child(0)");let r=this.getAttribute(re.MEDIA_CONTROLLER);r&&(sD(this,uQ,null==(e=this.getRootNode())?void 0:e.getElementById(r)),null==(i=null==(t=sI(this,uQ))?void 0:t.associateElement)||i.call(t,this)),this.updateBar(),this.shadowRoot.addEventListener("focusin",sI(this,u1)),this.shadowRoot.addEventListener("focusout",sI(this,u2)),sL(this,u9,u8).call(this),rB(this.container,sI(this,u3))}disconnectedCallback(){var e,t;sL(this,u6,u7).call(this),null==(t=null==(e=sI(this,uQ))?void 0:e.unassociateElement)||t.call(e,this),sD(this,uQ,null),this.shadowRoot.removeEventListener("focusin",sI(this,u1)),this.shadowRoot.removeEventListener("focusout",sI(this,u2)),rH(this.container,sI(this,u3))}updatePointerBar(e){var t;null==(t=sI(this,uJ).pointer)||t.style.setProperty("width",`${100*this.getPointerRatio(e)}%`)}updateBar(){var e,t;let i=100*this.range.valueAsNumber;null==(e=sI(this,uJ).progress)||e.style.setProperty("width",`${i}%`),null==(t=sI(this,uJ).thumb)||t.style.setProperty("left",`${i}%`)}updateSegments(e){let t=this.shadowRoot.querySelector("#segments-clipping");if(t.textContent="",this.container.classList.toggle("segments",!!(null==e?void 0:e.length)),!(null==e?void 0:e.length))return;let i=[...new Set([+this.range.min,...e.flatMap(e=>[e.start,e.end]),+this.range.max])];sD(this,u0,[...i]);let a=i.pop();for(let[e,r]of i.entries()){let[n,s]=[0===e,e===i.length-1],o=n?"calc(var(--segments-gap) / -1)":`${100*r}%`,l=s?a:i[e+1],d=`calc(${(l-r)*100}%${n||s?"":" - var(--segments-gap)"})`,u=rx.createElementNS("http://www.w3.org/2000/svg","rect"),c=rz(this.shadowRoot,`#segments-clipping rect:nth-child(${e+1})`);c.style.setProperty("x",o),c.style.setProperty("width",d),t.append(u)}}getPointerRatio(e){return function(e,t,i,a){let r=a.x-i.x,n=a.y-i.y,s=r*r+n*n;return 0===s?0:Math.max(0,Math.min(1,((e-i.x)*r+(t-i.y)*n)/s))}(e.clientX,e.clientY,sI(this,uz).getBoundingClientRect(),sI(this,uX).getBoundingClientRect())}get dragging(){return this.hasAttribute("dragging")}handleEvent(e){switch(e.type){case"pointermove":sL(this,cl,cd).call(this,e);break;case"input":this.updateBar();break;case"pointerenter":sL(this,ci,ca).call(this,e);break;case"pointerdown":sL(this,ce,ct).call(this,e);break;case"pointerup":sL(this,cr,cn).call(this);break;case"pointerleave":sL(this,cs,co).call(this)}}get keysUsed(){return["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"]}}uQ=new WeakMap,uZ=new WeakMap,uz=new WeakMap,uX=new WeakMap,uJ=new WeakMap,u0=new WeakMap,u1=new WeakMap,u2=new WeakMap,u3=new WeakMap,u4=new WeakSet,u5=function(e){let t=sI(this,uJ).activeSegment;if(!t)return;let i=this.getPointerRatio(e),a=sI(this,u0).findIndex((e,t,a)=>{let r=a[t+1];return null!=r&&i>=e&&i<=r}),r=`#segments-clipping rect:nth-child(${a+1})`;t.selectorText==r&&t.style.transform||(t.selectorText=r,t.style.setProperty("transform","var(--media-range-segment-hover-transform, scaleY(2))"))},u9=new WeakSet,u8=function(){this.hasAttribute("disabled")||(this.addEventListener("input",this),this.addEventListener("pointerdown",this),this.addEventListener("pointerenter",this))},u6=new WeakSet,u7=function(){var e,t;this.removeEventListener("input",this),this.removeEventListener("pointerdown",this),this.removeEventListener("pointerenter",this),null==(e=rO.window)||e.removeEventListener("pointerup",this),null==(t=rO.window)||t.removeEventListener("pointermove",this)},ce=new WeakSet,ct=function(e){var t;sD(this,uZ,e.composedPath().includes(this.range)),null==(t=rO.window)||t.addEventListener("pointerup",this)},ci=new WeakSet,ca=function(e){var t;"mouse"!==e.pointerType&&sL(this,ce,ct).call(this,e),this.addEventListener("pointerleave",this),null==(t=rO.window)||t.addEventListener("pointermove",this)},cr=new WeakSet,cn=function(){var e;null==(e=rO.window)||e.removeEventListener("pointerup",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled")},cs=new WeakSet,co=function(){var e,t;this.removeEventListener("pointerleave",this),null==(e=rO.window)||e.removeEventListener("pointermove",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled"),null==(t=sI(this,uJ).activeSegment)||t.style.removeProperty("transform")},cl=new WeakSet,cd=function(e){("pen"!==e.pointerType||0!==e.buttons)&&(this.toggleAttribute("dragging",1===e.buttons||"mouse"!==e.pointerType),this.updatePointerBar(e),sL(this,u4,u5).call(this,e),this.dragging&&("mouse"!==e.pointerType||!sI(this,uZ))&&(this.range.disabled=!0,this.range.valueAsNumber=this.getPointerRatio(e),this.range.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}))))},sC.shadowRootOptions={mode:"open"},sC.getTemplateHTML=function(e){return`
    <style>
      :host {
        --_focus-box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        --_media-range-padding: var(--media-range-padding, var(--media-control-padding, 10px));

        box-shadow: var(--_focus-visible-box-shadow, none);
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        height: calc(var(--media-control-height, 24px) + 2 * var(--_media-range-padding));
        display: inline-flex;
        align-items: center;
        
        vertical-align: middle;
        box-sizing: border-box;
        position: relative;
        width: 100px;
        transition: background .15s linear;
        cursor: var(--media-cursor, pointer);
        pointer-events: auto;
        touch-action: none; 
      }

      
      input[type=range]:focus {
        outline: 0;
      }
      input[type=range]:focus::-webkit-slider-runnable-track {
        outline: 0;
      }

      :host(:hover) {
        background: var(--media-control-hover-background, rgb(50 50 70 / .7));
      }

      #leftgap {
        padding-left: var(--media-range-padding-left, var(--_media-range-padding));
      }

      #rightgap {
        padding-right: var(--media-range-padding-right, var(--_media-range-padding));
      }

      #startpoint,
      #endpoint {
        position: absolute;
      }

      #endpoint {
        right: 0;
      }

      #container {
        
        width: var(--media-range-track-width, 100%);
        transform: translate(var(--media-range-track-translate-x, 0px), var(--media-range-track-translate-y, 0px));
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        min-width: 40px;
      }

      #range {
        
        display: var(--media-time-range-hover-display, block);
        bottom: var(--media-time-range-hover-bottom, -7px);
        height: var(--media-time-range-hover-height, max(100% + 7px, 25px));
        width: 100%;
        position: absolute;
        cursor: var(--media-cursor, pointer);

        -webkit-appearance: none; 
        -webkit-tap-highlight-color: transparent;
        background: transparent; 
        margin: 0;
        z-index: 1;
      }

      @media (hover: hover) {
        #range {
          bottom: var(--media-time-range-hover-bottom, -5px);
          height: var(--media-time-range-hover-height, max(100% + 5px, 20px));
        }
      }

      
      
      #range::-webkit-slider-thumb {
        -webkit-appearance: none;
        background: transparent;
        width: .1px;
        height: .1px;
      }

      
      #range::-moz-range-thumb {
        background: transparent;
        border: transparent;
        width: .1px;
        height: .1px;
      }

      #appearance {
        height: var(--media-range-track-height, 4px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        position: absolute;
        
        will-change: transform;
      }

      #track {
        background: var(--media-range-track-background, rgb(255 255 255 / .2));
        border-radius: var(--media-range-track-border-radius, 1px);
        border: var(--media-range-track-border, none);
        outline: var(--media-range-track-outline);
        outline-offset: var(--media-range-track-outline-offset);
        backdrop-filter: var(--media-range-track-backdrop-filter);
        -webkit-backdrop-filter: var(--media-range-track-backdrop-filter);
        box-shadow: var(--media-range-track-box-shadow, none);
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      #progress,
      #pointer {
        position: absolute;
        height: 100%;
        will-change: width;
      }

      #progress {
        background: var(--media-range-bar-color, var(--media-primary-color, rgb(238 238 238)));
        transition: var(--media-range-track-transition);
      }

      #pointer {
        background: var(--media-range-track-pointer-background);
        border-right: var(--media-range-track-pointer-border-right);
        transition: visibility .25s, opacity .25s;
        visibility: hidden;
        opacity: 0;
      }

      @media (hover: hover) {
        :host(:hover) #pointer {
          transition: visibility .5s, opacity .5s;
          visibility: visible;
          opacity: 1;
        }
      }

      #thumb,
      ::slotted([slot=thumb]) {
        width: var(--media-range-thumb-width, 10px);
        height: var(--media-range-thumb-height, 10px);
        transition: var(--media-range-thumb-transition);
        transform: var(--media-range-thumb-transform, none);
        opacity: var(--media-range-thumb-opacity, 1);
        translate: -50%;
        position: absolute;
        left: 0;
        cursor: var(--media-cursor, pointer);
      }

      #thumb {
        border-radius: var(--media-range-thumb-border-radius, 10px);
        background: var(--media-range-thumb-background, var(--media-primary-color, rgb(238 238 238)));
        box-shadow: var(--media-range-thumb-box-shadow, 1px 1px 1px transparent);
        border: var(--media-range-thumb-border, none);
      }

      :host([disabled]) #thumb {
        background-color: #777;
      }

      .segments #appearance {
        height: var(--media-range-segment-hover-height, 7px);
      }

      #track {
        clip-path: url(#segments-clipping);
      }

      #segments {
        --segments-gap: var(--media-range-segments-gap, 2px);
        position: absolute;
        width: 100%;
        height: 100%;
      }

      #segments-clipping {
        transform: translateX(calc(var(--segments-gap) / 2));
      }

      #segments-clipping:empty {
        display: none;
      }

      #segments-clipping rect {
        height: var(--media-range-track-height, 4px);
        y: calc((var(--media-range-segment-hover-height, 7px) - var(--media-range-track-height, 4px)) / 2);
        transition: var(--media-range-segment-transition, transform .1s ease-in-out);
        transform: var(--media-range-segment-transform, scaleY(1));
        transform-origin: center;
      }
    </style>
    <div id="leftgap"></div>
    <div id="container">
      <div id="startpoint"></div>
      <div id="endpoint"></div>
      <div id="appearance">
        <div id="track" part="track">
          <div id="pointer"></div>
          <div id="progress" part="progress"></div>
        </div>
        <slot name="thumb">
          <div id="thumb" part="thumb"></div>
        </slot>
        <svg id="segments"><clipPath id="segments-clipping"></clipPath></svg>
      </div>
      <input id="range" type="range" min="0" max="1" step="any" value="0">

      ${this.getContainerTemplateHTML(e)}
    </div>
    <div id="rightgap"></div>
  `},sC.getContainerTemplateHTML=function(e){return""},rO.customElements.get("media-chrome-range")||rO.customElements.define("media-chrome-range",sC);var sM=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},sO=(e,t,i)=>(sM(e,t,"read from private field"),i?i.call(e):t.get(e)),sx=(e,t,i,a)=>(sM(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i);class sN extends rO.HTMLElement{constructor(){if(super(),((e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)})(this,cu,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=rW(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[re.MEDIA_CONTROLLER]}attributeChangedCallback(e,t,i){var a,r,n,s,o;e===re.MEDIA_CONTROLLER&&(t&&(null==(r=null==(a=sO(this,cu))?void 0:a.unassociateElement)||r.call(a,this),sx(this,cu,null)),i&&this.isConnected&&(sx(this,cu,null==(n=this.getRootNode())?void 0:n.getElementById(i)),null==(o=null==(s=sO(this,cu))?void 0:s.associateElement)||o.call(s,this)))}connectedCallback(){var e,t,i;let a=this.getAttribute(re.MEDIA_CONTROLLER);a&&(sx(this,cu,null==(e=this.getRootNode())?void 0:e.getElementById(a)),null==(i=null==(t=sO(this,cu))?void 0:t.associateElement)||i.call(t,this))}disconnectedCallback(){var e,t;null==(t=null==(e=sO(this,cu))?void 0:e.unassociateElement)||t.call(e,this),sx(this,cu,null)}}cu=new WeakMap,sN.shadowRootOptions={mode:"open"},sN.getTemplateHTML=function(e){return`
    <style>
      :host {
        
        box-sizing: border-box;
        display: var(--media-control-display, var(--media-control-bar-display, inline-flex));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        --media-loading-indicator-icon-height: 44px;
      }

      ::slotted(media-time-range),
      ::slotted(media-volume-range) {
        min-height: 100%;
      }

      ::slotted(media-time-range),
      ::slotted(media-clip-selector) {
        flex-grow: 1;
      }

      ::slotted([role="menu"]) {
        position: absolute;
      }
    </style>

    <slot></slot>
  `},rO.customElements.get("media-control-bar")||rO.customElements.define("media-control-bar",sN);var sP=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},sU=(e,t,i)=>(sP(e,t,"read from private field"),i?i.call(e):t.get(e)),sB=(e,t,i,a)=>(sP(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i);class sH extends rO.HTMLElement{constructor(){if(super(),((e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)})(this,cc,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=rW(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[re.MEDIA_CONTROLLER]}attributeChangedCallback(e,t,i){var a,r,n,s,o;e===re.MEDIA_CONTROLLER&&(t&&(null==(r=null==(a=sU(this,cc))?void 0:a.unassociateElement)||r.call(a,this),sB(this,cc,null)),i&&this.isConnected&&(sB(this,cc,null==(n=this.getRootNode())?void 0:n.getElementById(i)),null==(o=null==(s=sU(this,cc))?void 0:s.associateElement)||o.call(s,this)))}connectedCallback(){var e,t,i;let{style:a}=rZ(this.shadowRoot,":host");a.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`);let r=this.getAttribute(re.MEDIA_CONTROLLER);r&&(sB(this,cc,null==(e=this.getRootNode())?void 0:e.getElementById(r)),null==(i=null==(t=sU(this,cc))?void 0:t.associateElement)||i.call(t,this))}disconnectedCallback(){var e,t;null==(t=null==(e=sU(this,cc))?void 0:e.unassociateElement)||t.call(e,this),sB(this,cc,null)}}cc=new WeakMap,sH.shadowRootOptions={mode:"open"},sH.getTemplateHTML=function(e,t={}){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        background: var(--media-text-background, var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7))));
        padding: var(--media-control-padding, 10px);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        box-sizing: border-box;
        text-align: center;
        pointer-events: auto;
      }

      
      :host(:focus-visible) {
        box-shadow: inset 0 0 0 2px rgb(27 127 204 / .9);
        outline: 0;
      }

      
      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }
    </style>

    ${this.getSlotTemplateHTML(e,t)}
  `},sH.getSlotTemplateHTML=function(e,t){return`
    <slot></slot>
  `},rO.customElements.get("media-text-display")||rO.customElements.define("media-text-display",sH);var sW=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},sV=(e,t,i)=>(sW(e,t,"read from private field"),i?i.call(e):t.get(e));class sF extends sH{constructor(){var e;super(),((e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)})(this,ch,void 0),((e,t,i,a)=>(sW(e,t,"write to private field"),a?a.call(e,i):t.set(e,i)))(this,ch,this.shadowRoot.querySelector("slot")),sV(this,ch).textContent=ry(null!=(e=this.mediaDuration)?e:0)}static get observedAttributes(){return[...super.observedAttributes,ra.MEDIA_DURATION]}attributeChangedCallback(e,t,i){e===ra.MEDIA_DURATION&&(sV(this,ch).textContent=ry(+i)),super.attributeChangedCallback(e,t,i)}get mediaDuration(){return rX(this,ra.MEDIA_DURATION)}set mediaDuration(e){rJ(this,ra.MEDIA_DURATION,e)}}ch=new WeakMap,sF.getSlotTemplateHTML=function(e,t){return`
    <slot>${ry(t.mediaDuration)}</slot>
  `},rO.customElements.get("media-duration-display")||rO.customElements.define("media-duration-display",sF);let s$={2:rk("Network Error"),3:rk("Decode Error"),4:rk("Source Not Supported"),5:rk("Encryption Error")},sK={2:rk("A network error caused the media download to fail."),3:rk("A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format."),4:rk("An unsupported error occurred. The server or network failed, or your browser does not support this format."),5:rk("The media is encrypted and there are no keys to decrypt it.")},sq=e=>{var t,i;return 1===e.code?null:{title:null!=(t=s$[e.code])?t:`Error ${e.code}`,message:null!=(i=sK[e.code])?i:e.message}};var sY=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)};function sG(e){var t;let{title:i,message:a}=null!=(t=sq(e))?t:{},r="";return i&&(r+=`<slot name="error-${e.code}-title"><h3>${i}</h3></slot>`),a&&(r+=`<slot name="error-${e.code}-message"><p>${a}</p></slot>`),r}let sj=[ra.MEDIA_ERROR_CODE,ra.MEDIA_ERROR_MESSAGE];class sQ extends sw{constructor(){super(...arguments),((e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)})(this,cm,null)}static get observedAttributes(){return[...super.observedAttributes,...sj]}formatErrorMessage(e){return this.constructor.formatErrorMessage(e)}attributeChangedCallback(e,t,i){var a;if(super.attributeChangedCallback(e,t,i),!sj.includes(e))return;let r=null!=(a=this.mediaError)?a:{code:this.mediaErrorCode,message:this.mediaErrorMessage};this.open=r.code&&null!==sq(r),this.open&&(this.shadowRoot.querySelector("slot").name=`error-${this.mediaErrorCode}`,this.shadowRoot.querySelector("#content").innerHTML=this.formatErrorMessage(r))}get mediaError(){var e,t;return sY(this,e=cm,"read from private field"),t?t.call(this):e.get(this)}set mediaError(e){var t,i;sY(this,t=cm,"write to private field"),i?i.call(this,e):t.set(this,e)}get mediaErrorCode(){return rX(this,"mediaerrorcode")}set mediaErrorCode(e){rJ(this,"mediaerrorcode",e)}get mediaErrorMessage(){return r2(this,"mediaerrormessage")}set mediaErrorMessage(e){r3(this,"mediaerrormessage",e)}}cm=new WeakMap,sQ.getSlotTemplateHTML=function(e){return`
    <style>
      :host {
        background: rgb(20 20 30 / .8);
      }

      #content {
        display: block;
        padding: 1.2em 1.5em;
      }

      h3,
      p {
        margin-block: 0 .3em;
      }
    </style>
    <slot name="error-${e.mediaerrorcode}" id="content">
      ${sG({code:+e.mediaerrorcode,message:e.mediaerrormessage})}
    </slot>
  `},sQ.formatErrorMessage=sG,rO.customElements.get("media-error-dialog")||rO.customElements.define("media-error-dialog",sQ);var sZ=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot read from private field");return i?i.call(e):t.get(e)},sz=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)};class sX extends sw{constructor(){super(...arguments),sz(this,cp,e=>{var t;if(!this.open)return;let i=null==(t=this.shadowRoot)?void 0:t.querySelector("#content");if(!i)return;let a=e.composedPath(),r=a[0]===this||a.includes(this),n=a.includes(i);r&&!n&&(this.open=!1)}),sz(this,cv,e=>{if(!this.open)return;let t=e.shiftKey&&("/"===e.key||"?"===e.key);"Escape"!==e.key&&!t||e.ctrlKey||e.altKey||e.metaKey||(this.open=!1,e.preventDefault(),e.stopPropagation())})}connectedCallback(){super.connectedCallback(),this.open&&(this.addEventListener("click",sZ(this,cp)),document.addEventListener("keydown",sZ(this,cv)))}disconnectedCallback(){this.removeEventListener("click",sZ(this,cp)),document.removeEventListener("keydown",sZ(this,cv))}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),"open"===e&&(this.open?(this.addEventListener("click",sZ(this,cp)),document.addEventListener("keydown",sZ(this,cv))):(this.removeEventListener("click",sZ(this,cp)),document.removeEventListener("keydown",sZ(this,cv))))}}cp=new WeakMap,cv=new WeakMap,sX.getSlotTemplateHTML=function(e){return`
    <style>
      :host {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        background: rgb(20 20 30 / .8);
        backdrop-filter: blur(10px);
      }

      #content {
        display: block;
        width: clamp(400px, 40vw, 700px);
        max-width: 90vw;
        text-align: left;
      }

      h2 {
        margin: 0 0 1.5rem 0;
        font-size: 1.5rem;
        font-weight: 500;
        text-align: center;
      }

      .shortcuts-table {
        width: 100%;
        border-collapse: collapse;
      }

      .shortcuts-table tr {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .shortcuts-table tr:last-child {
        border-bottom: none;
      }

      .shortcuts-table td {
        padding: 0.75rem 0.5rem;
      }

      .shortcuts-table td:first-child {
        text-align: right;
        padding-right: 1rem;
        width: 40%;
        min-width: 120px;
      }

      .shortcuts-table td:last-child {
        padding-left: 1rem;
      }

      .key {
        display: inline-block;
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        padding: 0.25rem 0.5rem;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        font-weight: 500;
        min-width: 1.5rem;
        text-align: center;
        margin: 0 0.2rem;
      }

      .description {
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.95rem;
      }

      .key-combo {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.3rem;
      }

      .key-separator {
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.9rem;
      }
    </style>
    <slot id="content">
      ${function(){let e=[{keys:["Space","k"],description:"Toggle Playback"},{keys:["m"],description:"Toggle mute"},{keys:["f"],description:"Toggle fullscreen"},{keys:["c"],description:"Toggle captions or subtitles, if available"},{keys:["p"],description:"Toggle Picture in Picture"},{keys:["←","j"],description:"Seek back 10s"},{keys:["→","l"],description:"Seek forward 10s"},{keys:["↑"],description:"Turn volume up"},{keys:["↓"],description:"Turn volume down"},{keys:["< (SHIFT+,)"],description:"Decrease playback rate"},{keys:["> (SHIFT+.)"],description:"Increase playback rate"}].map(({keys:e,description:t})=>{let i=e.map((e,t)=>t>0?`<span class="key-separator">or</span><span class="key">${e}</span>`:`<span class="key">${e}</span>`).join("");return`
      <tr>
        <td>
          <div class="key-combo">${i}</div>
        </td>
        <td class="description">${t}</td>
      </tr>
    `}).join("");return`
    <h2>Keyboard Shortcuts</h2>
    <table class="shortcuts-table">${e}</table>
  `}()}
    </slot>
  `},rO.customElements.get("media-keyboard-shortcuts-dialog")||rO.customElements.define("media-keyboard-shortcuts-dialog",sX);var sJ=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)};let s0=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M16 3v2.5h3.5V9H22V3h-6ZM4 9h2.5V5.5H10V3H4v6Zm15.5 9.5H16V21h6v-6h-2.5v3.5ZM6.5 15H4v6h6v-2.5H6.5V15Z"/>
</svg>`,s1=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M18.5 6.5V3H16v6h6V6.5h-3.5ZM16 21h2.5v-3.5H22V15h-6v6ZM4 17.5h3.5V21H10v-6H4v2.5Zm3.5-11H4V9h6V3H7.5v3.5Z"/>
</svg>`,s2=e=>{let t=e.mediaIsFullscreen?rk("exit fullscreen mode"):rk("enter fullscreen mode");e.setAttribute("aria-label",t)};class s3 extends so{constructor(){super(...arguments),((e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)})(this,cE,null)}static get observedAttributes(){return[...super.observedAttributes,ra.MEDIA_IS_FULLSCREEN,ra.MEDIA_FULLSCREEN_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),s2(this)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===ra.MEDIA_IS_FULLSCREEN&&s2(this)}get mediaFullscreenUnavailable(){return r2(this,ra.MEDIA_FULLSCREEN_UNAVAILABLE)}set mediaFullscreenUnavailable(e){r3(this,ra.MEDIA_FULLSCREEN_UNAVAILABLE,e)}get mediaIsFullscreen(){return r0(this,ra.MEDIA_IS_FULLSCREEN)}set mediaIsFullscreen(e){r1(this,ra.MEDIA_IS_FULLSCREEN,e)}handleClick(e){var t,i,a,r;sJ(this,t=cE,"write to private field"),i?i.call(this,e):t.set(this,e);let n=(sJ(this,a=cE,"read from private field"),(r?r.call(this):a.get(this))instanceof PointerEvent),s=this.mediaIsFullscreen?new rO.CustomEvent(a7.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0}):new rO.CustomEvent(a7.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0,detail:n});this.dispatchEvent(s)}}cE=new WeakMap,s3.getSlotTemplateHTML=function(e){return`
    <style>
      :host([${ra.MEDIA_IS_FULLSCREEN}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${ra.MEDIA_IS_FULLSCREEN}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${ra.MEDIA_IS_FULLSCREEN}]) slot[name=tooltip-enter],
      :host(:not([${ra.MEDIA_IS_FULLSCREEN}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${s0}</slot>
      <slot name="exit">${s1}</slot>
    </slot>
  `},s3.getTooltipContentHTML=function(){return`
    <slot name="tooltip-enter">${rk("Enter fullscreen mode")}</slot>
    <slot name="tooltip-exit">${rk("Exit fullscreen mode")}</slot>
  `},rO.customElements.get("media-fullscreen-button")||rO.customElements.define("media-fullscreen-button",s3);let{MEDIA_TIME_IS_LIVE:s4,MEDIA_PAUSED:s5}=ra,{MEDIA_SEEK_TO_LIVE_REQUEST:s9,MEDIA_PLAY_REQUEST:s8}=a7,s6=e=>{var t;let i=e.mediaPaused||!e.mediaTimeIsLive,a=i?rk("seek to live"):rk("playing live");e.setAttribute("aria-label",a);let r=null==(t=e.shadowRoot)?void 0:t.querySelector('slot[name="text"]');r&&(r.textContent=rk("live")),i?e.removeAttribute("aria-disabled"):e.setAttribute("aria-disabled","true")};class s7 extends so{static get observedAttributes(){return[...super.observedAttributes,s4,s5]}connectedCallback(){super.connectedCallback(),s6(this)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),s6(this)}get mediaPaused(){return r0(this,ra.MEDIA_PAUSED)}set mediaPaused(e){r1(this,ra.MEDIA_PAUSED,e)}get mediaTimeIsLive(){return r0(this,ra.MEDIA_TIME_IS_LIVE)}set mediaTimeIsLive(e){r1(this,ra.MEDIA_TIME_IS_LIVE,e)}handleClick(){(this.mediaPaused||!this.mediaTimeIsLive)&&(this.dispatchEvent(new rO.CustomEvent(s9,{composed:!0,bubbles:!0})),this.hasAttribute(s5)&&this.dispatchEvent(new rO.CustomEvent(s8,{composed:!0,bubbles:!0})))}}s7.getSlotTemplateHTML=function(e){return`
    <style>
      :host { --media-tooltip-display: none; }
      
      slot[name=indicator] > *,
      :host ::slotted([slot=indicator]) {
        
        min-width: auto;
        fill: var(--media-live-button-icon-color, rgb(140, 140, 140));
        color: var(--media-live-button-icon-color, rgb(140, 140, 140));
      }

      :host([${s4}]:not([${s5}])) slot[name=indicator] > *,
      :host([${s4}]:not([${s5}])) ::slotted([slot=indicator]) {
        fill: var(--media-live-button-indicator-color, rgb(255, 0, 0));
        color: var(--media-live-button-indicator-color, rgb(255, 0, 0));
      }

      :host([${s4}]:not([${s5}])) {
        cursor: var(--media-cursor, not-allowed);
      }

      slot[name=text]{
        text-transform: uppercase;
      }

    </style>

    <slot name="indicator"><svg viewBox="0 0 6 12"><circle cx="3" cy="6" r="2"></circle></svg></slot>
    
    <slot name="spacer">&nbsp;</slot><slot name="text">${rk("live")}</slot>
  `},rO.customElements.get("media-live-button")||rO.customElements.define("media-live-button",s7);var oe=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},ot=(e,t,i)=>(oe(e,t,"read from private field"),i?i.call(e):t.get(e)),oi=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},oa=(e,t,i,a)=>(oe(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i);let or={LOADING_DELAY:"loadingdelay",NO_AUTOHIDE:"noautohide"},on=`
<svg aria-hidden="true" viewBox="0 0 100 100">
  <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
    <animateTransform
       attributeName="transform"
       attributeType="XML"
       type="rotate"
       dur="1s"
       from="0 50 50"
       to="360 50 50"
       repeatCount="indefinite" />
  </path>
</svg>
`;class os extends rO.HTMLElement{constructor(){if(super(),oi(this,cb,void 0),oi(this,cg,500),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=rW(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[re.MEDIA_CONTROLLER,ra.MEDIA_PAUSED,ra.MEDIA_LOADING,or.LOADING_DELAY]}attributeChangedCallback(e,t,i){var a,r,n,s,o;e===or.LOADING_DELAY&&t!==i?this.loadingDelay=Number(i):e===re.MEDIA_CONTROLLER&&(t&&(null==(r=null==(a=ot(this,cb))?void 0:a.unassociateElement)||r.call(a,this),oa(this,cb,null)),i&&this.isConnected&&(oa(this,cb,null==(n=this.getRootNode())?void 0:n.getElementById(i)),null==(o=null==(s=ot(this,cb))?void 0:s.associateElement)||o.call(s,this)))}connectedCallback(){var e,t,i;let a=this.getAttribute(re.MEDIA_CONTROLLER);a&&(oa(this,cb,null==(e=this.getRootNode())?void 0:e.getElementById(a)),null==(i=null==(t=ot(this,cb))?void 0:t.associateElement)||i.call(t,this))}disconnectedCallback(){var e,t;null==(t=null==(e=ot(this,cb))?void 0:e.unassociateElement)||t.call(e,this),oa(this,cb,null)}get loadingDelay(){return ot(this,cg)}set loadingDelay(e){oa(this,cg,e);let{style:t}=rZ(this.shadowRoot,":host");t.setProperty("--_loading-indicator-delay",`var(--media-loading-indicator-transition-delay, ${e}ms)`)}get mediaPaused(){return r0(this,ra.MEDIA_PAUSED)}set mediaPaused(e){r1(this,ra.MEDIA_PAUSED,e)}get mediaLoading(){return r0(this,ra.MEDIA_LOADING)}set mediaLoading(e){r1(this,ra.MEDIA_LOADING,e)}get mediaController(){return r2(this,re.MEDIA_CONTROLLER)}set mediaController(e){r3(this,re.MEDIA_CONTROLLER,e)}get noAutohide(){return r0(this,or.NO_AUTOHIDE)}set noAutohide(e){r1(this,or.NO_AUTOHIDE,e)}}cb=new WeakMap,cg=new WeakMap,os.shadowRootOptions={mode:"open"},os.getTemplateHTML=function(e){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-loading-indicator-display, inline-block));
        vertical-align: middle;
        box-sizing: border-box;
        --_loading-indicator-delay: var(--media-loading-indicator-transition-delay, 500ms);
      }

      #status {
        color: rgba(0,0,0,0);
        width: 0px;
        height: 0px;
      }

      :host slot[name=icon] > *,
      :host ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 0);
        transition: opacity 0.15s;
      }

      :host([${ra.MEDIA_LOADING}]:not([${ra.MEDIA_PAUSED}])) slot[name=icon] > *,
      :host([${ra.MEDIA_LOADING}]:not([${ra.MEDIA_PAUSED}])) ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 1);
        transition: opacity 0.15s var(--_loading-indicator-delay);
      }

      :host #status {
        visibility: var(--media-loading-indicator-opacity, hidden);
        transition: visibility 0.15s;
      }

      :host([${ra.MEDIA_LOADING}]:not([${ra.MEDIA_PAUSED}])) #status {
        visibility: var(--media-loading-indicator-opacity, visible);
        transition: visibility 0.15s var(--_loading-indicator-delay);
      }

      svg, img, ::slotted(svg), ::slotted(img) {
        width: var(--media-loading-indicator-icon-width);
        height: var(--media-loading-indicator-icon-height, 100px);
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        vertical-align: middle;
      }
    </style>

    <slot name="icon">${on}</slot>
    <div id="status" role="status" aria-live="polite">${rk("media loading")}</div>
  `},rO.customElements.get("media-loading-indicator")||rO.customElements.define("media-loading-indicator",os);let oo=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.18l2.45 2.45a4.22 4.22 0 0 0 .05-.63Zm2.5 0a6.84 6.84 0 0 1-.54 2.64L20 16.15A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25A6.92 6.92 0 0 1 14 18.7v2.06A9 9 0 0 0 17.69 19l2 2.05L21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z"/>
</svg>`,ol=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4Z"/>
</svg>`,od=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z"/>
</svg>`,ou=e=>{let t="off"===e.mediaVolumeLevel?rk("unmute"):rk("mute");e.setAttribute("aria-label",t)};class oc extends so{static get observedAttributes(){return[...super.observedAttributes,ra.MEDIA_VOLUME_LEVEL]}connectedCallback(){super.connectedCallback(),ou(this)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===ra.MEDIA_VOLUME_LEVEL&&ou(this)}get mediaVolumeLevel(){return r2(this,ra.MEDIA_VOLUME_LEVEL)}set mediaVolumeLevel(e){r3(this,ra.MEDIA_VOLUME_LEVEL,e)}handleClick(){let e="off"===this.mediaVolumeLevel?a7.MEDIA_UNMUTE_REQUEST:a7.MEDIA_MUTE_REQUEST;this.dispatchEvent(new rO.CustomEvent(e,{composed:!0,bubbles:!0}))}}oc.getSlotTemplateHTML=function(e){return`
    <style>
      :host(:not([${ra.MEDIA_VOLUME_LEVEL}])) slot[name=icon] slot:not([name=high]),
      :host([${ra.MEDIA_VOLUME_LEVEL}=high]) slot[name=icon] slot:not([name=high]) {
        display: none !important;
      }

      :host([${ra.MEDIA_VOLUME_LEVEL}=off]) slot[name=icon] slot:not([name=off]) {
        display: none !important;
      }

      :host([${ra.MEDIA_VOLUME_LEVEL}=low]) slot[name=icon] slot:not([name=low]) {
        display: none !important;
      }

      :host([${ra.MEDIA_VOLUME_LEVEL}=medium]) slot[name=icon] slot:not([name=medium]) {
        display: none !important;
      }

      :host(:not([${ra.MEDIA_VOLUME_LEVEL}=off])) slot[name=tooltip-unmute],
      :host([${ra.MEDIA_VOLUME_LEVEL}=off]) slot[name=tooltip-mute] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="off">${oo}</slot>
      <slot name="low">${ol}</slot>
      <slot name="medium">${ol}</slot>
      <slot name="high">${od}</slot>
    </slot>
  `},oc.getTooltipContentHTML=function(){return`
    <slot name="tooltip-mute">${rk("Mute")}</slot>
    <slot name="tooltip-unmute">${rk("Unmute")}</slot>
  `},rO.customElements.get("media-mute-button")||rO.customElements.define("media-mute-button",oc);let oh=`<svg aria-hidden="true" viewBox="0 0 28 24">
  <path d="M24 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-1 16H5V5h18v14Zm-3-8h-7v5h7v-5Z"/>
</svg>`,om=e=>{let t=e.mediaIsPip?rk("exit picture in picture mode"):rk("enter picture in picture mode");e.setAttribute("aria-label",t)};class op extends so{static get observedAttributes(){return[...super.observedAttributes,ra.MEDIA_IS_PIP,ra.MEDIA_PIP_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),om(this)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===ra.MEDIA_IS_PIP&&om(this)}get mediaPipUnavailable(){return r2(this,ra.MEDIA_PIP_UNAVAILABLE)}set mediaPipUnavailable(e){r3(this,ra.MEDIA_PIP_UNAVAILABLE,e)}get mediaIsPip(){return r0(this,ra.MEDIA_IS_PIP)}set mediaIsPip(e){r1(this,ra.MEDIA_IS_PIP,e)}handleClick(){let e=this.mediaIsPip?a7.MEDIA_EXIT_PIP_REQUEST:a7.MEDIA_ENTER_PIP_REQUEST;this.dispatchEvent(new rO.CustomEvent(e,{composed:!0,bubbles:!0}))}}op.getSlotTemplateHTML=function(e){return`
    <style>
      :host([${ra.MEDIA_IS_PIP}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      :host(:not([${ra.MEDIA_IS_PIP}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${ra.MEDIA_IS_PIP}]) slot[name=tooltip-enter],
      :host(:not([${ra.MEDIA_IS_PIP}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${oh}</slot>
      <slot name="exit">${oh}</slot>
    </slot>
  `},op.getTooltipContentHTML=function(){return`
    <slot name="tooltip-enter">${rk("Enter picture in picture mode")}</slot>
    <slot name="tooltip-exit">${rk("Exit picture in picture mode")}</slot>
  `},rO.customElements.get("media-pip-button")||rO.customElements.define("media-pip-button",op);var ov=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot read from private field");return i?i.call(e):t.get(e)};let oE={RATES:"rates"},ob=[1,1.2,1.5,1.7,2];class og extends so{constructor(){var e;super(),((e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)})(this,cf,new nc(this,oE.RATES,{defaultValue:ob})),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${null!=(e=this.mediaPlaybackRate)?e:1}x`}static get observedAttributes(){return[...super.observedAttributes,ra.MEDIA_PLAYBACK_RATE,oE.RATES]}attributeChangedCallback(e,t,i){if(super.attributeChangedCallback(e,t,i),e===oE.RATES&&(ov(this,cf).value=i),e===ra.MEDIA_PLAYBACK_RATE){let e=i?+i:NaN,t=Number.isNaN(e)?1:e;this.container.innerHTML=`${t}x`,this.setAttribute("aria-label",rk("Playback rate {playbackRate}",{playbackRate:t}))}}get rates(){return ov(this,cf)}set rates(e){e?Array.isArray(e)?ov(this,cf).value=e.join(" "):"string"==typeof e&&(ov(this,cf).value=e):ov(this,cf).value=""}get mediaPlaybackRate(){return rX(this,ra.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){rJ(this,ra.MEDIA_PLAYBACK_RATE,e)}handleClick(){var e,t;let i=Array.from(ov(this,cf).values(),e=>+e).sort((e,t)=>e-t),a=null!=(t=null!=(e=i.find(e=>e>this.mediaPlaybackRate))?e:i[0])?t:1,r=new rO.CustomEvent(a7.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:a});this.dispatchEvent(r)}}cf=new WeakMap,og.getSlotTemplateHTML=function(e){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
    </style>
    <slot name="icon">${e.mediaplaybackrate||1}x</slot>
  `},og.getTooltipContentHTML=function(){return rk("Playback rate")},rO.customElements.get("media-playback-rate-button")||rO.customElements.define("media-playback-rate-button",og);let of=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="m6 21 15-9L6 3v18Z"/>
</svg>`,o_=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M6 20h4V4H6v16Zm8-16v16h4V4h-4Z"/>
</svg>`,oy=e=>{let t=e.mediaPaused?rk("play"):rk("pause");e.setAttribute("aria-label",t)};class oT extends so{static get observedAttributes(){return[...super.observedAttributes,ra.MEDIA_PAUSED,ra.MEDIA_ENDED]}connectedCallback(){super.connectedCallback(),oy(this)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),(e===ra.MEDIA_PAUSED||e===ra.MEDIA_LANG)&&oy(this)}get mediaPaused(){return r0(this,ra.MEDIA_PAUSED)}set mediaPaused(e){r1(this,ra.MEDIA_PAUSED,e)}handleClick(){let e=this.mediaPaused?a7.MEDIA_PLAY_REQUEST:a7.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new rO.CustomEvent(e,{composed:!0,bubbles:!0}))}}oT.getSlotTemplateHTML=function(e){return`
    <style>
      :host([${ra.MEDIA_PAUSED}]) slot[name=pause],
      :host(:not([${ra.MEDIA_PAUSED}])) slot[name=play] {
        display: none !important;
      }

      :host([${ra.MEDIA_PAUSED}]) slot[name=tooltip-pause],
      :host(:not([${ra.MEDIA_PAUSED}])) slot[name=tooltip-play] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="play">${of}</slot>
      <slot name="pause">${o_}</slot>
    </slot>
  `},oT.getTooltipContentHTML=function(){return`
    <slot name="tooltip-play">${rk("Play")}</slot>
    <slot name="tooltip-pause">${rk("Pause")}</slot>
  `},rO.customElements.get("media-play-button")||rO.customElements.define("media-play-button",oT);let oA={PLACEHOLDER_SRC:"placeholdersrc",SRC:"src"};class ok extends rO.HTMLElement{static get observedAttributes(){return[oA.PLACEHOLDER_SRC,oA.SRC]}constructor(){if(super(),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=rW(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.image=this.shadowRoot.querySelector("#image")}attributeChangedCallback(e,t,i){if(e===oA.SRC&&(null==i?this.image.removeAttribute(oA.SRC):this.image.setAttribute(oA.SRC,i)),e===oA.PLACEHOLDER_SRC)if(null==i)this.image.style.removeProperty("background-image");else{var a;a=this.image,a.style["background-image"]=`url('${i}')`}}get placeholderSrc(){return r2(this,oA.PLACEHOLDER_SRC)}set placeholderSrc(e){r3(this,oA.SRC,e)}get src(){return r2(this,oA.SRC)}set src(e){r3(this,oA.SRC,e)}}ok.shadowRootOptions={mode:"open"},ok.getTemplateHTML=function(e){return`
    <style>
      :host {
        pointer-events: none;
        display: var(--media-poster-image-display, inline-block);
        box-sizing: border-box;
      }

      img {
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
        min-height: 100%;
        background-repeat: no-repeat;
        background-position: var(--media-poster-image-background-position, var(--media-object-position, center));
        background-size: var(--media-poster-image-background-size, var(--media-object-fit, contain));
        object-fit: var(--media-object-fit, contain);
        object-position: var(--media-object-position, center);
      }
    </style>

    <img part="poster img" aria-hidden="true" id="image"/>
  `},rO.customElements.get("media-poster-image")||rO.customElements.define("media-poster-image",ok);var ow=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)};class oS extends sH{constructor(){super(),((e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)})(this,c_,void 0),((e,t,i,a)=>(ow(e,t,"write to private field"),a?a.call(e,i):t.set(e,i)))(this,c_,this.shadowRoot.querySelector("slot"))}static get observedAttributes(){return[...super.observedAttributes,ra.MEDIA_PREVIEW_CHAPTER,ra.MEDIA_LANG]}attributeChangedCallback(e,t,i){if(super.attributeChangedCallback(e,t,i),(e===ra.MEDIA_PREVIEW_CHAPTER||e===ra.MEDIA_LANG)&&i!==t&&null!=i){var a,r;if((ow(this,a=c_,"read from private field"),r?r.call(this):a.get(this)).textContent=i,""!==i){let e=rk("chapter: {chapterName}",{chapterName:i});this.setAttribute("aria-valuetext",e)}else this.removeAttribute("aria-valuetext")}}get mediaPreviewChapter(){return r2(this,ra.MEDIA_PREVIEW_CHAPTER)}set mediaPreviewChapter(e){r3(this,ra.MEDIA_PREVIEW_CHAPTER,e)}}c_=new WeakMap,rO.customElements.get("media-preview-chapter-display")||rO.customElements.define("media-preview-chapter-display",oS);var oI=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},oR=(e,t,i)=>(oI(e,t,"read from private field"),i?i.call(e):t.get(e)),oD=(e,t,i,a)=>(oI(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i);class oL extends rO.HTMLElement{constructor(){if(super(),((e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)})(this,cy,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=rW(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[re.MEDIA_CONTROLLER,ra.MEDIA_PREVIEW_IMAGE,ra.MEDIA_PREVIEW_COORDS]}connectedCallback(){var e,t,i;let a=this.getAttribute(re.MEDIA_CONTROLLER);a&&(oD(this,cy,null==(e=this.getRootNode())?void 0:e.getElementById(a)),null==(i=null==(t=oR(this,cy))?void 0:t.associateElement)||i.call(t,this))}disconnectedCallback(){var e,t;null==(t=null==(e=oR(this,cy))?void 0:e.unassociateElement)||t.call(e,this),oD(this,cy,null)}attributeChangedCallback(e,t,i){var a,r,n,s,o;[ra.MEDIA_PREVIEW_IMAGE,ra.MEDIA_PREVIEW_COORDS].includes(e)&&this.update(),e===re.MEDIA_CONTROLLER&&(t&&(null==(r=null==(a=oR(this,cy))?void 0:a.unassociateElement)||r.call(a,this),oD(this,cy,null)),i&&this.isConnected&&(oD(this,cy,null==(n=this.getRootNode())?void 0:n.getElementById(i)),null==(o=null==(s=oR(this,cy))?void 0:s.associateElement)||o.call(s,this)))}get mediaPreviewImage(){return r2(this,ra.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){r3(this,ra.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewCoords(){let e=this.getAttribute(ra.MEDIA_PREVIEW_COORDS);if(e)return e.split(/\s+/).map(e=>+e)}set mediaPreviewCoords(e){if(!e)return void this.removeAttribute(ra.MEDIA_PREVIEW_COORDS);this.setAttribute(ra.MEDIA_PREVIEW_COORDS,e.join(" "))}update(){let e=this.mediaPreviewCoords,t=this.mediaPreviewImage;if(!(e&&t))return;let[i,a,r,n]=e,s=t.split("#")[0],{maxWidth:o,maxHeight:l,minWidth:d,minHeight:u}=getComputedStyle(this),c=Math.min(parseInt(o)/r,parseInt(l)/n),h=Math.max(parseInt(d)/r,parseInt(u)/n),m=c<1,v=m?c:h>1?h:1,{style:E}=rZ(this.shadowRoot,":host"),b=rZ(this.shadowRoot,"img").style,g=this.shadowRoot.querySelector("img"),f=m?"min":"max";E.setProperty(`${f}-width`,"initial","important"),E.setProperty(`${f}-height`,"initial","important"),E.width=`${r*v}px`,E.height=`${n*v}px`;let _=()=>{b.width=`${this.imgWidth*v}px`,b.height=`${this.imgHeight*v}px`,b.display="block"};g.src!==s&&(g.onload=()=>{this.imgWidth=g.naturalWidth,this.imgHeight=g.naturalHeight,_()},g.src=s,_()),_(),b.transform=`translate(-${i*v}px, -${a*v}px)`}}cy=new WeakMap,oL.shadowRootOptions={mode:"open"},oL.getTemplateHTML=function(e){return`
    <style>
      :host {
        box-sizing: border-box;
        display: var(--media-control-display, var(--media-preview-thumbnail-display, inline-block));
        overflow: hidden;
      }

      img {
        display: none;
        position: relative;
      }
    </style>
    <img crossorigin loading="eager" decoding="async">
  `},rO.customElements.get("media-preview-thumbnail")||rO.customElements.define("media-preview-thumbnail",oL);var oC=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},oM=(e,t,i)=>(oC(e,t,"read from private field"),i?i.call(e):t.get(e));class oO extends sH{constructor(){super(),((e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)})(this,cT,void 0),((e,t,i,a)=>(oC(e,t,"write to private field"),a?a.call(e,i):t.set(e,i)))(this,cT,this.shadowRoot.querySelector("slot")),oM(this,cT).textContent=ry(0)}static get observedAttributes(){return[...super.observedAttributes,ra.MEDIA_PREVIEW_TIME]}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===ra.MEDIA_PREVIEW_TIME&&null!=i&&(oM(this,cT).textContent=ry(parseFloat(i)))}get mediaPreviewTime(){return rX(this,ra.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){rJ(this,ra.MEDIA_PREVIEW_TIME,e)}}cT=new WeakMap,rO.customElements.get("media-preview-time-display")||rO.customElements.define("media-preview-time-display",oO);let ox={SEEK_OFFSET:"seekoffset"};class oN extends so{static get observedAttributes(){return[...super.observedAttributes,ra.MEDIA_CURRENT_TIME,ox.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=rX(this,ox.SEEK_OFFSET,30)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===ox.SEEK_OFFSET&&(this.seekOffset=rX(this,ox.SEEK_OFFSET,30))}get seekOffset(){return rX(this,ox.SEEK_OFFSET,30)}set seekOffset(e){rJ(this,ox.SEEK_OFFSET,e),this.setAttribute("aria-label",rk("seek back {seekOffset} seconds",{seekOffset:this.seekOffset})),r$(rK(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return rX(this,ra.MEDIA_CURRENT_TIME,0)}set mediaCurrentTime(e){rJ(this,ra.MEDIA_CURRENT_TIME,e)}handleClick(){let e=Math.max(this.mediaCurrentTime-this.seekOffset,0),t=new rO.CustomEvent(a7.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)}}oN.getSlotTemplateHTML=function(e,t){let i;return`
    <slot name="icon">${i=t.seekOffset,`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(2.18 19.87)">${i}</text>
    <path d="M10 6V3L4.37 7 10 10.94V8a5.54 5.54 0 0 1 1.9 10.48v2.12A7.5 7.5 0 0 0 10 6Z"/>
  </svg>`}</slot>
  `},oN.getTooltipContentHTML=function(){return rk("Seek backward")},rO.customElements.get("media-seek-backward-button")||rO.customElements.define("media-seek-backward-button",oN);let oP={SEEK_OFFSET:"seekoffset"};class oU extends so{static get observedAttributes(){return[...super.observedAttributes,ra.MEDIA_CURRENT_TIME,oP.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=rX(this,oP.SEEK_OFFSET,30)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===oP.SEEK_OFFSET&&(this.seekOffset=rX(this,oP.SEEK_OFFSET,30))}get seekOffset(){return rX(this,oP.SEEK_OFFSET,30)}set seekOffset(e){rJ(this,oP.SEEK_OFFSET,e),this.setAttribute("aria-label",rk("seek forward {seekOffset} seconds",{seekOffset:this.seekOffset})),r$(rK(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return rX(this,ra.MEDIA_CURRENT_TIME,0)}set mediaCurrentTime(e){rJ(this,ra.MEDIA_CURRENT_TIME,e)}handleClick(){let e=this.mediaCurrentTime+this.seekOffset,t=new rO.CustomEvent(a7.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)}}oU.getSlotTemplateHTML=function(e,t){let i;return`
    <slot name="icon">${i=t.seekOffset,`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(8.9 19.87)">${i}</text>
    <path d="M10 6V3l5.61 4L10 10.94V8a5.54 5.54 0 0 0-1.9 10.48v2.12A7.5 7.5 0 0 1 10 6Z"/>
  </svg>`}</slot>
  `},oU.getTooltipContentHTML=function(){return rk("Seek forward")},rO.customElements.get("media-seek-forward-button")||rO.customElements.define("media-seek-forward-button",oU);var oB=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},oH=(e,t,i)=>(oB(e,t,"read from private field"),i?i.call(e):t.get(e));let oW={REMAINING:"remaining",SHOW_DURATION:"showduration",NO_TOGGLE:"notoggle"},oV=[...Object.values(oW),ra.MEDIA_CURRENT_TIME,ra.MEDIA_DURATION,ra.MEDIA_SEEKABLE],oF=["Enter"," "],o$="&nbsp;/&nbsp;",oK=(e,{timesSep:t=o$}={})=>{var i,a;let r=null!=(i=e.mediaCurrentTime)?i:0,[,n]=null!=(a=e.mediaSeekable)?a:[],s=0;Number.isFinite(e.mediaDuration)?s=e.mediaDuration:Number.isFinite(n)&&(s=n);let o=e.remaining?ry(0-(s-r)):ry(r);return e.showDuration?`${o}${t}${ry(s)}`:o};class oq extends sH{constructor(){super(),((e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)})(this,cA,void 0),((e,t,i,a)=>(oB(e,t,"write to private field"),a?a.call(e,i):t.set(e,i)))(this,cA,this.shadowRoot.querySelector("slot")),oH(this,cA).innerHTML=`${oK(this)}`}static get observedAttributes(){return[...super.observedAttributes,...oV,"disabled"]}connectedCallback(){let{style:e}=rZ(this.shadowRoot,":host(:hover:not([notoggle]))");e.setProperty("cursor","var(--media-cursor, pointer)"),e.setProperty("background","var(--media-control-hover-background, rgba(50 50 70 / .7))"),this.hasAttribute("disabled")||this.enable(),this.setAttribute("role","progressbar"),this.setAttribute("aria-label",rk("playback time"));let t=e=>{let{key:i}=e;if(!oF.includes(i))return void this.removeEventListener("keyup",t);this.toggleTimeDisplay()};this.addEventListener("keydown",e=>{let{metaKey:i,altKey:a,key:r}=e;if(i||a||!oF.includes(r))return void this.removeEventListener("keyup",t);this.addEventListener("keyup",t)}),this.addEventListener("click",this.toggleTimeDisplay),super.connectedCallback()}toggleTimeDisplay(){this.noToggle||(this.hasAttribute("remaining")?this.removeAttribute("remaining"):this.setAttribute("remaining",""))}disconnectedCallback(){this.disable(),super.disconnectedCallback()}attributeChangedCallback(e,t,i){oV.includes(e)?this.update():"disabled"===e&&i!==t&&(null==i?this.enable():this.disable()),super.attributeChangedCallback(e,t,i)}enable(){this.tabIndex=0}disable(){this.tabIndex=-1}get remaining(){return r0(this,oW.REMAINING)}set remaining(e){r1(this,oW.REMAINING,e)}get showDuration(){return r0(this,oW.SHOW_DURATION)}set showDuration(e){r1(this,oW.SHOW_DURATION,e)}get noToggle(){return r0(this,oW.NO_TOGGLE)}set noToggle(e){r1(this,oW.NO_TOGGLE,e)}get mediaDuration(){return rX(this,ra.MEDIA_DURATION)}set mediaDuration(e){rJ(this,ra.MEDIA_DURATION,e)}get mediaCurrentTime(){return rX(this,ra.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){rJ(this,ra.MEDIA_CURRENT_TIME,e)}get mediaSeekable(){let e=this.getAttribute(ra.MEDIA_SEEKABLE);if(e)return e.split(":").map(e=>+e)}set mediaSeekable(e){if(null==e)return void this.removeAttribute(ra.MEDIA_SEEKABLE);this.setAttribute(ra.MEDIA_SEEKABLE,e.join(":"))}update(){let e=oK(this);(e=>{var t;let i=e.mediaCurrentTime,[,a]=null!=(t=e.mediaSeekable)?t:[],r=null;if(Number.isFinite(e.mediaDuration)?r=e.mediaDuration:Number.isFinite(a)&&(r=a),null==i||null===r)return e.setAttribute("aria-valuetext","video not loaded, unknown time.");let n=e.remaining?r_(0-(r-i)):r_(i);if(!e.showDuration)return e.setAttribute("aria-valuetext",n);let s=r_(r),o=`${n} of ${s}`;e.setAttribute("aria-valuetext",o)})(this),e!==oH(this,cA).innerHTML&&(oH(this,cA).innerHTML=e)}}cA=new WeakMap,oq.getSlotTemplateHTML=function(e,t){return`
    <slot>${oK(t)}</slot>
  `},rO.customElements.get("media-time-display")||rO.customElements.define("media-time-display",oq);var oY=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},oG=(e,t,i)=>(oY(e,t,"read from private field"),i?i.call(e):t.get(e)),oj=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},oQ=(e,t,i,a)=>(oY(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i);class oZ{constructor(e,t,i){oj(this,ck,void 0),oj(this,cw,void 0),oj(this,cS,void 0),oj(this,cI,void 0),oj(this,cR,void 0),oj(this,cD,void 0),oj(this,cL,void 0),oj(this,cC,void 0),oj(this,cM,0),oj(this,cO,(e=performance.now())=>{oQ(this,cM,requestAnimationFrame(oG(this,cO))),oQ(this,cI,performance.now()-oG(this,cS));let t=1e3/this.fps;if(oG(this,cI)>t){oQ(this,cS,e-oG(this,cI)%t);let i=1e3/((e-oG(this,cw))/++((e,t,i,a)=>({set _(value){oQ(e,t,value,i)},get _(){return oG(e,t,a)}}))(this,cR)._),a=(e-oG(this,cD))/1e3/this.duration,r=oG(this,cL)+a*this.playbackRate;r-oG(this,ck).valueAsNumber>0?oQ(this,cC,this.playbackRate/this.duration/i):(oQ(this,cC,.995*oG(this,cC)),r=oG(this,ck).valueAsNumber+oG(this,cC)),this.callback(r)}}),oQ(this,ck,e),this.callback=t,this.fps=i}start(){0===oG(this,cM)&&(oQ(this,cS,performance.now()),oQ(this,cw,oG(this,cS)),oQ(this,cR,0),oG(this,cO).call(this))}stop(){0!==oG(this,cM)&&(cancelAnimationFrame(oG(this,cM)),oQ(this,cM,0))}update({start:e,duration:t,playbackRate:i}){let a=e-oG(this,ck).valueAsNumber,r=Math.abs(t-this.duration);(a>0||a<-.03||r>=.5)&&this.callback(e),oQ(this,cL,e),oQ(this,cD,performance.now()),this.duration=t,this.playbackRate=i}}ck=new WeakMap,cw=new WeakMap,cS=new WeakMap,cI=new WeakMap,cR=new WeakMap,cD=new WeakMap,cL=new WeakMap,cC=new WeakMap,cM=new WeakMap,cO=new WeakMap;var oz=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},oX=(e,t,i)=>(oz(e,t,"read from private field"),i?i.call(e):t.get(e)),oJ=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},o0=(e,t,i,a)=>(oz(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),o1=(e,t,i)=>(oz(e,t,"access private method"),i);let o2=(e,t=e.mediaCurrentTime)=>{let i=Number.isFinite(e.mediaSeekableStart)?e.mediaSeekableStart:0,a=Number.isFinite(e.mediaDuration)?e.mediaDuration:e.mediaSeekableEnd;return Number.isNaN(a)?0:Math.max(0,Math.min((t-i)/(a-i),1))},o3=(e,t=e.range.valueAsNumber)=>{let i=Number.isFinite(e.mediaSeekableStart)?e.mediaSeekableStart:0,a=Number.isFinite(e.mediaDuration)?e.mediaDuration:e.mediaSeekableEnd;return Number.isNaN(a)?0:t*(a-i)+i};class o4 extends sC{constructor(){super(),oJ(this,cK),oJ(this,cY),oJ(this,cQ),oJ(this,cz),oJ(this,cJ),oJ(this,c1),oJ(this,c3),oJ(this,c5),oJ(this,cx,void 0),oJ(this,cN,void 0),oJ(this,cP,void 0),oJ(this,cU,void 0),oJ(this,cB,void 0),oJ(this,cH,void 0),oJ(this,cW,void 0),oJ(this,cV,void 0),oJ(this,cF,void 0),oJ(this,c$,void 0),oJ(this,cj,e=>{!this.dragging&&(rE(e)&&(this.range.valueAsNumber=e),oX(this,c$)||this.updateBar())}),this.shadowRoot.querySelector("#track").insertAdjacentHTML("afterbegin",'<div id="buffered" part="buffered"></div>'),o0(this,cP,this.shadowRoot.querySelectorAll('[part~="box"]')),o0(this,cB,this.shadowRoot.querySelector('[part~="preview-box"]')),o0(this,cH,this.shadowRoot.querySelector('[part~="current-box"]'));let e=getComputedStyle(this);o0(this,cW,parseInt(e.getPropertyValue("--media-box-padding-left"))),o0(this,cV,parseInt(e.getPropertyValue("--media-box-padding-right"))),o0(this,cN,new oZ(this.range,oX(this,cj),60))}static get observedAttributes(){return[...super.observedAttributes,ra.MEDIA_PAUSED,ra.MEDIA_DURATION,ra.MEDIA_SEEKABLE,ra.MEDIA_CURRENT_TIME,ra.MEDIA_PREVIEW_IMAGE,ra.MEDIA_PREVIEW_TIME,ra.MEDIA_PREVIEW_CHAPTER,ra.MEDIA_BUFFERED,ra.MEDIA_PLAYBACK_RATE,ra.MEDIA_LOADING,ra.MEDIA_ENDED]}connectedCallback(){var e;super.connectedCallback(),this.range.setAttribute("aria-label",rk("seek")),o1(this,cK,cq).call(this),o0(this,cx,this.getRootNode()),null==(e=oX(this,cx))||e.addEventListener("transitionstart",this)}disconnectedCallback(){var e;super.disconnectedCallback(),o1(this,cK,cq).call(this),null==(e=oX(this,cx))||e.removeEventListener("transitionstart",this),o0(this,cx,null)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),t!=i&&(e===ra.MEDIA_CURRENT_TIME||e===ra.MEDIA_PAUSED||e===ra.MEDIA_ENDED||e===ra.MEDIA_LOADING||e===ra.MEDIA_DURATION||e===ra.MEDIA_SEEKABLE?(oX(this,cN).update({start:o2(this),duration:this.mediaSeekableEnd-this.mediaSeekableStart,playbackRate:this.mediaPlaybackRate}),o1(this,cK,cq).call(this),(e=>{let t=e.range,i=r_(+o3(e)),a=r_(+e.mediaSeekableEnd),r=i&&a?`${i} of ${a}`:"video not loaded, unknown time.";t.setAttribute("aria-valuetext",r)})(this)):e===ra.MEDIA_BUFFERED&&this.updateBufferedBar(),(e===ra.MEDIA_DURATION||e===ra.MEDIA_SEEKABLE)&&(this.mediaChaptersCues=oX(this,cF),this.updateBar()))}get mediaChaptersCues(){return oX(this,cF)}set mediaChaptersCues(e){var t;o0(this,cF,e),this.updateSegments(null==(t=oX(this,cF))?void 0:t.map(e=>({start:o2(this,e.startTime),end:o2(this,e.endTime)})))}get mediaPaused(){return r0(this,ra.MEDIA_PAUSED)}set mediaPaused(e){r1(this,ra.MEDIA_PAUSED,e)}get mediaLoading(){return r0(this,ra.MEDIA_LOADING)}set mediaLoading(e){r1(this,ra.MEDIA_LOADING,e)}get mediaDuration(){return rX(this,ra.MEDIA_DURATION)}set mediaDuration(e){rJ(this,ra.MEDIA_DURATION,e)}get mediaCurrentTime(){return rX(this,ra.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){rJ(this,ra.MEDIA_CURRENT_TIME,e)}get mediaPlaybackRate(){return rX(this,ra.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){rJ(this,ra.MEDIA_PLAYBACK_RATE,e)}get mediaBuffered(){let e=this.getAttribute(ra.MEDIA_BUFFERED);return e?e.split(" ").map(e=>e.split(":").map(e=>+e)):[]}set mediaBuffered(e){if(!e)return void this.removeAttribute(ra.MEDIA_BUFFERED);let t=e.map(e=>e.join(":")).join(" ");this.setAttribute(ra.MEDIA_BUFFERED,t)}get mediaSeekable(){let e=this.getAttribute(ra.MEDIA_SEEKABLE);if(e)return e.split(":").map(e=>+e)}set mediaSeekable(e){if(null==e)return void this.removeAttribute(ra.MEDIA_SEEKABLE);this.setAttribute(ra.MEDIA_SEEKABLE,e.join(":"))}get mediaSeekableEnd(){var e;let[,t=this.mediaDuration]=null!=(e=this.mediaSeekable)?e:[];return t}get mediaSeekableStart(){var e;let[t=0]=null!=(e=this.mediaSeekable)?e:[];return t}get mediaPreviewImage(){return r2(this,ra.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){r3(this,ra.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewTime(){return rX(this,ra.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){rJ(this,ra.MEDIA_PREVIEW_TIME,e)}get mediaEnded(){return r0(this,ra.MEDIA_ENDED)}set mediaEnded(e){r1(this,ra.MEDIA_ENDED,e)}updateBar(){super.updateBar(),this.updateBufferedBar(),this.updateCurrentBox()}updateBufferedBar(){var e;let t,i=this.mediaBuffered;if(!i.length)return;if(this.mediaEnded)t=1;else{let a=this.mediaCurrentTime,[,r=this.mediaSeekableStart]=null!=(e=i.find(([e,t])=>e<=a&&a<=t))?e:[];t=o2(this,r)}let{style:a}=rZ(this.shadowRoot,"#buffered");a.setProperty("width",`${100*t}%`)}updateCurrentBox(){if(!this.shadowRoot.querySelector('slot[name="current"]').assignedElements().length)return;let e=rZ(this.shadowRoot,"#current-rail"),t=rZ(this.shadowRoot,'[part~="current-box"]'),i=o1(this,cQ,cZ).call(this,oX(this,cH)),a=o1(this,cz,cX).call(this,i,this.range.valueAsNumber),r=o1(this,cJ,c0).call(this,i,this.range.valueAsNumber);e.style.transform=`translateX(${a})`,e.style.setProperty("--_range-width",`${i.range.width}`),t.style.setProperty("--_box-shift",`${r}`),t.style.setProperty("--_box-width",`${i.box.width}px`),t.style.setProperty("visibility","initial")}handleEvent(e){switch(super.handleEvent(e),e.type){case"input":o1(this,c5,c9).call(this);break;case"pointermove":o1(this,c1,c2).call(this,e);break;case"pointerup":oX(this,c$)&&o0(this,c$,!1);break;case"pointerdown":o0(this,c$,!0);break;case"pointerleave":o1(this,c3,c4).call(this,null);break;case"transitionstart":rq(e.target,this)&&setTimeout(()=>o1(this,cK,cq).call(this),0)}}}cx=new WeakMap,cN=new WeakMap,cP=new WeakMap,cU=new WeakMap,cB=new WeakMap,cH=new WeakMap,cW=new WeakMap,cV=new WeakMap,cF=new WeakMap,c$=new WeakMap,cK=new WeakSet,cq=function(){o1(this,cY,cG).call(this)?oX(this,cN).start():oX(this,cN).stop()},cY=new WeakSet,cG=function(){return this.isConnected&&!this.mediaPaused&&!this.mediaLoading&&!this.mediaEnded&&this.mediaSeekableEnd>0&&rQ(this)},cj=new WeakMap,cQ=new WeakSet,cZ=function(e){var t;let i=(null!=(t=this.getAttribute("bounds")?rY(this,`#${this.getAttribute("bounds")}`):this.parentElement)?t:this).getBoundingClientRect(),a=this.range.getBoundingClientRect(),r=e.offsetWidth,n=-(a.left-i.left-r/2),s=i.right-a.left-r/2;return{box:{width:r,min:n,max:s},bounds:i,range:a}},cz=new WeakSet,cX=function(e,t){let i=`${100*t}%`,{width:a,min:r,max:n}=e.box;if(!a)return i;if(!Number.isNaN(r)){let e=`calc(1 / var(--_range-width) * 100 * ${r}% + var(--media-box-padding-left))`;i=`max(${e}, ${i})`}if(!Number.isNaN(n)){let e=`calc(1 / var(--_range-width) * 100 * ${n}% - var(--media-box-padding-right))`;i=`min(${i}, ${e})`}return i},cJ=new WeakSet,c0=function(e,t){let{width:i,min:a,max:r}=e.box,n=t*e.range.width;if(n<a+oX(this,cW)){let t=e.range.left-e.bounds.left-oX(this,cW);return`${n-i/2+t}px`}if(n>r-oX(this,cV)){let t=e.bounds.right-e.range.right-oX(this,cV);return`${n+i/2-t-e.range.width}px`}return 0},c1=new WeakSet,c2=function(e){let t=[...oX(this,cP)].some(t=>e.composedPath().includes(t));if(!this.dragging&&(t||!e.composedPath().includes(this)))return void o1(this,c3,c4).call(this,null);let i=this.mediaSeekableEnd;if(!i)return;let a=rZ(this.shadowRoot,"#preview-rail"),r=rZ(this.shadowRoot,'[part~="preview-box"]'),n=o1(this,cQ,cZ).call(this,oX(this,cB)),s=(e.clientX-n.range.left)/n.range.width;s=Math.max(0,Math.min(1,s));let o=o1(this,cz,cX).call(this,n,s),l=o1(this,cJ,c0).call(this,n,s);a.style.transform=`translateX(${o})`,a.style.setProperty("--_range-width",`${n.range.width}`),r.style.setProperty("--_box-shift",`${l}`),r.style.setProperty("--_box-width",`${n.box.width}px`),1>Math.abs(Math.round(oX(this,cU))-Math.round(s*i))&&s>.01&&s<.99||(o0(this,cU,s*i),o1(this,c3,c4).call(this,oX(this,cU)))},c3=new WeakSet,c4=function(e){this.dispatchEvent(new rO.CustomEvent(a7.MEDIA_PREVIEW_REQUEST,{composed:!0,bubbles:!0,detail:e}))},c5=new WeakSet,c9=function(){oX(this,cN).stop();let e=o3(this);this.dispatchEvent(new rO.CustomEvent(a7.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e}))},o4.shadowRootOptions={mode:"open"},o4.getContainerTemplateHTML=function(e){return`
    <style>
      :host {
        --media-box-border-radius: 4px;
        --media-box-padding-left: 10px;
        --media-box-padding-right: 10px;
        --media-preview-border-radius: var(--media-box-border-radius);
        --media-box-arrow-offset: var(--media-box-border-radius);
        --_control-background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        --_preview-background: var(--media-preview-background, var(--_control-background));

        
        contain: layout;
      }

      #buffered {
        background: var(--media-time-range-buffered-color, rgb(255 255 255 / .4));
        position: absolute;
        height: 100%;
        will-change: width;
      }

      #preview-rail,
      #current-rail {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 100%;
        pointer-events: none;
        will-change: transform;
      }

      [part~="box"] {
        width: min-content;
        
        position: absolute;
        bottom: 100%;
        flex-direction: column;
        align-items: center;
        transform: translateX(-50%);
      }

      [part~="current-box"] {
        display: var(--media-current-box-display, var(--media-box-display, flex));
        margin: var(--media-current-box-margin, var(--media-box-margin, 0 0 5px));
        visibility: hidden;
      }

      [part~="preview-box"] {
        display: var(--media-preview-box-display, var(--media-box-display, flex));
        margin: var(--media-preview-box-margin, var(--media-box-margin, 0 0 5px));
        transition-property: var(--media-preview-transition-property, visibility, opacity);
        transition-duration: var(--media-preview-transition-duration-out, .25s);
        transition-delay: var(--media-preview-transition-delay-out, 0s);
        visibility: hidden;
        opacity: 0;
      }

      :host(:is([${ra.MEDIA_PREVIEW_IMAGE}], [${ra.MEDIA_PREVIEW_TIME}])[dragging]) [part~="preview-box"] {
        transition-duration: var(--media-preview-transition-duration-in, .5s);
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
        opacity: 1;
      }

      @media (hover: hover) {
        :host(:is([${ra.MEDIA_PREVIEW_IMAGE}], [${ra.MEDIA_PREVIEW_TIME}]):hover) [part~="preview-box"] {
          transition-duration: var(--media-preview-transition-duration-in, .5s);
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
          opacity: 1;
        }
      }

      media-preview-thumbnail,
      ::slotted(media-preview-thumbnail) {
        visibility: hidden;
        
        transition: visibility 0s .25s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-thumbnail-background, var(--_preview-background));
        box-shadow: var(--media-preview-thumbnail-box-shadow, 0 0 4px rgb(0 0 0 / .2));
        max-width: var(--media-preview-thumbnail-max-width, 180px);
        max-height: var(--media-preview-thumbnail-max-height, 160px);
        min-width: var(--media-preview-thumbnail-min-width, 120px);
        min-height: var(--media-preview-thumbnail-min-height, 80px);
        border: var(--media-preview-thumbnail-border);
        border-radius: var(--media-preview-thumbnail-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius) 0 0);
      }

      :host([${ra.MEDIA_PREVIEW_IMAGE}][dragging]) media-preview-thumbnail,
      :host([${ra.MEDIA_PREVIEW_IMAGE}][dragging]) ::slotted(media-preview-thumbnail) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
      }

      @media (hover: hover) {
        :host([${ra.MEDIA_PREVIEW_IMAGE}]:hover) media-preview-thumbnail,
        :host([${ra.MEDIA_PREVIEW_IMAGE}]:hover) ::slotted(media-preview-thumbnail) {
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
        }

        :host([${ra.MEDIA_PREVIEW_TIME}]:hover) {
          --media-time-range-hover-display: block;
        }
      }

      media-preview-chapter-display,
      ::slotted(media-preview-chapter-display) {
        font-size: var(--media-font-size, 13px);
        line-height: 17px;
        min-width: 0;
        visibility: hidden;
        
        transition: min-width 0s, border-radius 0s, margin 0s, padding 0s, visibility 0s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-chapter-background, var(--_preview-background));
        border-radius: var(--media-preview-chapter-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius)
          var(--media-preview-border-radius) var(--media-preview-border-radius));
        padding: var(--media-preview-chapter-padding, 3.5px 9px);
        margin: var(--media-preview-chapter-margin, 0 0 5px);
        text-shadow: var(--media-preview-chapter-text-shadow, 0 0 4px rgb(0 0 0 / .75));
      }

      :host([${ra.MEDIA_PREVIEW_IMAGE}]) media-preview-chapter-display,
      :host([${ra.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-chapter-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-chapter-border-radius, 0);
        padding: var(--media-preview-chapter-padding, 3.5px 9px 0);
        margin: var(--media-preview-chapter-margin, 0);
        min-width: 100%;
      }

      media-preview-chapter-display[${ra.MEDIA_PREVIEW_CHAPTER}],
      ::slotted(media-preview-chapter-display[${ra.MEDIA_PREVIEW_CHAPTER}]) {
        visibility: visible;
      }

      media-preview-chapter-display:not([aria-valuetext]),
      ::slotted(media-preview-chapter-display:not([aria-valuetext])) {
        display: none;
      }

      media-preview-time-display,
      ::slotted(media-preview-time-display),
      media-time-display,
      ::slotted(media-time-display) {
        font-size: var(--media-font-size, 13px);
        line-height: 17px;
        min-width: 0;
        
        transition: min-width 0s, border-radius 0s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-time-background, var(--_preview-background));
        border-radius: var(--media-preview-time-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius)
          var(--media-preview-border-radius) var(--media-preview-border-radius));
        padding: var(--media-preview-time-padding, 3.5px 9px);
        margin: var(--media-preview-time-margin, 0);
        text-shadow: var(--media-preview-time-text-shadow, 0 0 4px rgb(0 0 0 / .75));
        transform: translateX(min(
          max(calc(50% - var(--_box-width) / 2),
          calc(var(--_box-shift, 0))),
          calc(var(--_box-width) / 2 - 50%)
        ));
      }

      :host([${ra.MEDIA_PREVIEW_IMAGE}]) media-preview-time-display,
      :host([${ra.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-time-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-time-border-radius,
          0 0 var(--media-preview-border-radius) var(--media-preview-border-radius));
        min-width: 100%;
      }

      :host([${ra.MEDIA_PREVIEW_TIME}]:hover) {
        --media-time-range-hover-display: block;
      }

      [part~="arrow"],
      ::slotted([part~="arrow"]) {
        display: var(--media-box-arrow-display, inline-block);
        transform: translateX(min(
          max(calc(50% - var(--_box-width) / 2 + var(--media-box-arrow-offset)),
          calc(var(--_box-shift, 0))),
          calc(var(--_box-width) / 2 - 50% - var(--media-box-arrow-offset))
        ));
        
        border-color: transparent;
        border-top-color: var(--media-box-arrow-background, var(--_control-background));
        border-width: var(--media-box-arrow-border-width,
          var(--media-box-arrow-height, 5px) var(--media-box-arrow-width, 6px) 0);
        border-style: solid;
        justify-content: center;
        height: 0;
      }
    </style>
    <div id="preview-rail">
      <slot name="preview" part="box preview-box">
        <media-preview-thumbnail>
          <template shadowrootmode="${oL.shadowRootOptions.mode}">
            ${oL.getTemplateHTML({})}
          </template>
        </media-preview-thumbnail>
        <media-preview-chapter-display></media-preview-chapter-display>
        <media-preview-time-display></media-preview-time-display>
        <slot name="preview-arrow"><div part="arrow"></div></slot>
      </slot>
    </div>
    <div id="current-rail">
      <slot name="current" part="box current-box">
        
      </slot>
    </div>
  `},rO.customElements.get("media-time-range")||rO.customElements.define("media-time-range",o4);class o5 extends sC{static get observedAttributes(){return[...super.observedAttributes,ra.MEDIA_VOLUME,ra.MEDIA_MUTED,ra.MEDIA_VOLUME_UNAVAILABLE]}constructor(){super(),this.range.addEventListener("input",()=>{let e=this.range.value,t=new rO.CustomEvent(a7.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)})}connectedCallback(){super.connectedCallback(),this.range.setAttribute("aria-label",rk("volume"))}attributeChangedCallback(e,t,i){if(super.attributeChangedCallback(e,t,i),e===ra.MEDIA_VOLUME||e===ra.MEDIA_MUTED){let e;this.range.valueAsNumber=this.mediaMuted?0:this.mediaVolume,this.range.setAttribute("aria-valuetext",(e=this.range.valueAsNumber,`${Math.round(100*e)}%`)),this.updateBar()}}get mediaVolume(){return rX(this,ra.MEDIA_VOLUME,1)}set mediaVolume(e){rJ(this,ra.MEDIA_VOLUME,e)}get mediaMuted(){return r0(this,ra.MEDIA_MUTED)}set mediaMuted(e){r1(this,ra.MEDIA_MUTED,e)}get mediaVolumeUnavailable(){return r2(this,ra.MEDIA_VOLUME_UNAVAILABLE)}set mediaVolumeUnavailable(e){r3(this,ra.MEDIA_VOLUME_UNAVAILABLE,e)}}rO.customElements.get("media-volume-range")||rO.customElements.define("media-volume-range",o5);class o9 extends so{constructor(){super(...arguments),this.container=null}static get observedAttributes(){return[...super.observedAttributes,ra.MEDIA_LOOP]}connectedCallback(){var e;super.connectedCallback(),this.container=(null==(e=this.shadowRoot)?void 0:e.querySelector("#icon"))||null,this.container&&(this.container.textContent=rk("Loop"))}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===ra.MEDIA_LOOP&&this.container&&this.setAttribute("aria-checked",this.mediaLoop?"true":"false")}get mediaLoop(){return r0(this,ra.MEDIA_LOOP)}set mediaLoop(e){r1(this,ra.MEDIA_LOOP,e)}handleClick(){let e=!this.mediaLoop,t=new rO.CustomEvent(a7.MEDIA_LOOP_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)}}o9.getSlotTemplateHTML=function(e){return`
      <style>
        :host {
          min-width: 4ch;
          padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
          width: 100%;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1rem;
          font-weight: var(--media-button-font-weight, normal);
        }

        #checked-indicator {
          display: none;
        }

        :host([${ra.MEDIA_LOOP}]) #checked-indicator {
          display: block;
        }
      </style>
      
      <span id="icon">
     </span>

      <div id="checked-indicator">
        <svg aria-hidden="true" viewBox="0 1 24 24" part="checked-indicator indicator">
          <path d="m10 15.17 9.193-9.191 1.414 1.414-10.606 10.606-6.364-6.364 1.414-1.414 4.95 4.95Z"/>
        </svg>
      </div>
    `},o9.getTooltipContentHTML=function(){return rk("Loop")},rO.customElements.get("media-loop-button")||rO.customElements.define("media-loop-button",o9);var o8=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},o6=(e,t,i)=>(o8(e,t,"read from private field"),i?i.call(e):t.get(e)),o7=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},le=(e,t,i,a)=>(o8(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i);let lt={processCallback(e,t,i){if(i){for(let[e,a]of t)if(e in i){let t=i[e];"boolean"==typeof t&&a instanceof ld&&"boolean"==typeof a.element[a.attributeName]?a.booleanValue=t:"function"==typeof t&&a instanceof ld?a.element[a.attributeName]=t:a.value=t}}}};class li extends rO.DocumentFragment{constructor(e,t,i=lt){var a;super(),o7(this,c8,void 0),o7(this,c6,void 0),this.append(e.content.cloneNode(!0)),le(this,c8,la(this)),le(this,c6,i),null==(a=i.createCallback)||a.call(i,this,o6(this,c8),t),i.processCallback(this,o6(this,c8),t)}update(e){o6(this,c6).processCallback(this,o6(this,c8),e)}}c8=new WeakMap,c6=new WeakMap;let la=(e,t=[])=>{let i,a;for(let r of e.attributes||[])if(r.value.includes("{{")){let n=new ll;for([i,a]of ln(r.value))if(i){let i=new ld(e,r.name,r.namespaceURI);n.append(i),t.push([a,i])}else n.append(a);r.value=n.toString()}for(let r of e.childNodes)if(1!==r.nodeType||r instanceof HTMLTemplateElement){let n=r.data;if(1===r.nodeType||n.includes("{{")){let s=[];if(n)for([i,a]of ln(n))if(i){let i=new lu(e);s.push(i),t.push([a,i])}else s.push(new Text(a));else if(r instanceof HTMLTemplateElement){let i=new lc(e,r);s.push(i),t.push([i.expression,i])}r.replaceWith(...s.flatMap(e=>e.replacementNodes||[e]))}}else la(r,t);return t},lr={},ln=e=>{let t="",i=0,a=lr[e],r=0,n;if(a)return a;for(a=[];n=e[r];r++)"{"===n&&"{"===e[r+1]&&"\\"!==e[r-1]&&e[r+2]&&1==++i?(t&&a.push([0,t]),t="",r++):"}"!==n||"}"!==e[r+1]||"\\"===e[r-1]||--i?t+=n||"":(a.push([1,t.trim()]),t="",r++);return t&&a.push([0,(i>0?"{{":"")+t]),lr[e]=a};class ls{get value(){return""}set value(e){}toString(){return this.value}}let lo=new WeakMap;class ll{constructor(){o7(this,c7,[])}[Symbol.iterator](){return o6(this,c7).values()}get length(){return o6(this,c7).length}item(e){return o6(this,c7)[e]}append(...e){for(let t of e)t instanceof ld&&lo.set(t,this),o6(this,c7).push(t)}toString(){return o6(this,c7).join("")}}c7=new WeakMap;class ld extends ls{constructor(e,t,i){super(),o7(this,hr),o7(this,he,""),o7(this,ht,void 0),o7(this,hi,void 0),o7(this,ha,void 0),le(this,ht,e),le(this,hi,t),le(this,ha,i)}get attributeName(){return o6(this,hi)}get attributeNamespace(){return o6(this,ha)}get element(){return o6(this,ht)}get value(){return o6(this,he)}set value(e){o6(this,he)!==e&&(le(this,he,e),o6(this,hr,hn)&&1!==o6(this,hr,hn).length?o6(this,ht).setAttributeNS(o6(this,ha),o6(this,hi),o6(this,hr,hn).toString()):null==e?o6(this,ht).removeAttributeNS(o6(this,ha),o6(this,hi)):o6(this,ht).setAttributeNS(o6(this,ha),o6(this,hi),e))}get booleanValue(){return o6(this,ht).hasAttributeNS(o6(this,ha),o6(this,hi))}set booleanValue(e){if(o6(this,hr,hn)&&1!==o6(this,hr,hn).length)throw new DOMException("Value is not fully templatized");this.value=e?"":null}}he=new WeakMap,ht=new WeakMap,hi=new WeakMap,ha=new WeakMap,hr=new WeakSet,hn=function(){return lo.get(this)};class lu extends ls{constructor(e,t){super(),o7(this,hs,void 0),o7(this,ho,void 0),le(this,hs,e),le(this,ho,t?[...t]:[new Text])}get replacementNodes(){return o6(this,ho)}get parentNode(){return o6(this,hs)}get nextSibling(){return o6(this,ho)[o6(this,ho).length-1].nextSibling}get previousSibling(){return o6(this,ho)[0].previousSibling}get value(){return o6(this,ho).map(e=>e.textContent).join("")}set value(e){this.replace(e)}replace(...e){let t=e.flat().flatMap(e=>null==e?[new Text]:e.forEach?[...e]:11===e.nodeType?[...e.childNodes]:e.nodeType?[e]:[new Text(e)]);t.length||t.push(new Text),le(this,ho,function(e,t,i,a=null){let r=0,n,s,o,l=i.length,d=t.length;for(;r<l&&r<d&&t[r]==i[r];)r++;for(;r<l&&r<d&&i[l-1]==t[d-1];)a=i[--d,--l];if(r==d)for(;r<l;)e.insertBefore(i[r++],a);if(r==l)for(;r<d;)e.removeChild(t[r++]);else{for(n=t[r];r<l;)o=i[r++],s=n?n.nextSibling:a,n==o?n=s:r<l&&i[r]==s?(e.replaceChild(o,n),n=s):e.insertBefore(o,n);for(;n!=a;)s=n.nextSibling,e.removeChild(n),n=s}return i}(o6(this,ho)[0].parentNode,o6(this,ho),t,this.nextSibling))}}hs=new WeakMap,ho=new WeakMap;class lc extends lu{constructor(e,t){let i=t.getAttribute("directive")||t.getAttribute("type"),a=t.getAttribute("expression")||t.getAttribute(i)||"";a.startsWith("{{")&&(a=a.trim().slice(2,-2).trim()),super(e),this.expression=a,this.template=t,this.directive=i}}let lh={string:e=>String(e)};class lm{constructor(e){this.template=e,this.state=void 0}}let lp=new WeakMap,lv=new WeakMap,lE={partial:(e,t)=>{t[e.expression]=new lm(e.template)},if:(e,t)=>{var i;if(l_(e.expression,t))if(lp.get(e)!==e.template){lp.set(e,e.template);let i=new li(e.template,t,lg);e.replace(i),lv.set(e,i)}else null==(i=lv.get(e))||i.update(t);else e.replace(""),lp.delete(e),lv.delete(e)}},lb=Object.keys(lE),lg={processCallback(e,t,i){var a,r;if(i)for(let[e,n]of t){if(n instanceof lc){if(!n.directive){let e=lb.find(e=>n.template.hasAttribute(e));e&&(n.directive=e,n.expression=n.template.getAttribute(e))}null==(a=lE[n.directive])||a.call(lE,n,i);continue}let t=l_(e,i);if(t instanceof lm){lp.get(n)!==t.template?(lp.set(n,t.template),n.value=t=new li(t.template,t.state,lg),lv.set(n,t)):null==(r=lv.get(n))||r.update(t.state);continue}t?(n instanceof ld&&n.attributeName.startsWith("aria-")&&(t=String(t)),n instanceof ld?"boolean"==typeof t?n.booleanValue=t:"function"==typeof t?n.element[n.attributeName]=t:n.value=t:(n.value=t,lp.delete(n),lv.delete(n))):n instanceof ld?n.value=void 0:(n.value=void 0,lp.delete(n),lv.delete(n))}}},lf={"!":e=>!e,"!!":e=>!!e,"==":(e,t)=>e==t,"!=":(e,t)=>e!=t,">":(e,t)=>e>t,">=":(e,t)=>e>=t,"<":(e,t)=>e<t,"<=":(e,t)=>e<=t,"??":(e,t)=>null!=e?e:t,"|":(e,t)=>{var i;return null==(i=lh[t])?void 0:i.call(lh,e)}};function l_(e,t={}){var i,a,r,n,s,o,l;let d=(function(e,t){let i,a,r,n=[];for(;e;){for(let n in r=null,i=e.length,t)(a=t[n].exec(e))&&a.index<i&&(r={token:a[0],type:n,matches:a.slice(1)},i=a.index);i&&n.push({token:e.substr(0,i),type:void 0}),r&&n.push(r),e=e.substr(i+(r?r.token.length:0))}return n})(e,{boolean:/true|false/,number:/-?\d+\.?\d*/,string:/(["'])((?:\\.|[^\\])*?)\1/,operator:/[!=><][=!]?|\?\?|\|/,ws:/\s+/,param:/[$a-z_][$\w]*/i}).filter(({type:e})=>"ws"!==e);if(0===d.length||d.some(({type:e})=>!e))return ly(e);if((null==(i=d[0])?void 0:i.token)===">"){let i=t[null==(a=d[1])?void 0:a.token];if(!i)return ly(e);let o={...t};i.state=o;let l=d.slice(2);for(let e=0;e<l.length;e+=3){let i=null==(r=l[e])?void 0:r.token,a=null==(n=l[e+1])?void 0:n.token,d=null==(s=l[e+2])?void 0:s.token;i&&"="===a&&(o[i]=lA(d,t))}return i}if(1===d.length)return lT(d[0])?lA(d[0].token,t):ly(e);if(2===d.length){let i=lf[null==(o=d[0])?void 0:o.token];return i&&lT(d[1])?i(lA(d[1].token,t)):ly(e)}if(3===d.length){let i=null==(l=d[1])?void 0:l.token,a=lf[i];if(!a||!lT(d[0])||!lT(d[2]))return ly(e);let r=lA(d[0].token,t);return a(r,"|"===i?d[2].token:lA(d[2].token,t))}}function ly(e){return console.warn(`Warning: invalid expression \`${e}\``),!1}function lT({type:e}){return["number","boolean","string","param"].includes(e)}function lA(e,t){let i=e[0],a=e.slice(-1);return"true"===e||"false"===e?"true"===e:i===a&&["'",'"'].includes(i)?e.slice(1,-1):rb(e)?parseFloat(e):t[e]}var lk=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},lw=(e,t,i)=>(lk(e,t,"read from private field"),i?i.call(e):t.get(e)),lS=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},lI=(e,t,i,a)=>(lk(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),lR=(e,t,i)=>(lk(e,t,"access private method"),i);let lD={mediatargetlivewindow:"targetlivewindow",mediastreamtype:"streamtype"},lL=rx.createElement("template");lL.innerHTML=`
  <style>
    :host {
      display: inline-block;
      line-height: 0;
    }

    media-controller {
      width: 100%;
      height: 100%;
    }

    media-captions-button:not([mediasubtitleslist]),
    media-captions-menu:not([mediasubtitleslist]),
    media-captions-menu-button:not([mediasubtitleslist]),
    media-audio-track-menu[mediaaudiotrackunavailable],
    media-audio-track-menu-button[mediaaudiotrackunavailable],
    media-rendition-menu[mediarenditionunavailable],
    media-rendition-menu-button[mediarenditionunavailable],
    media-volume-range[mediavolumeunavailable],
    media-airplay-button[mediaairplayunavailable],
    media-fullscreen-button[mediafullscreenunavailable],
    media-cast-button[mediacastunavailable],
    media-pip-button[mediapipunavailable] {
      display: none;
    }
  </style>
`;class lC extends rO.HTMLElement{constructor(){super(),lS(this,hc),lS(this,hm),lS(this,hl,void 0),lS(this,hd,void 0),lS(this,hu,void 0),this.shadowRoot?this.renderRoot=this.shadowRoot:(this.renderRoot=this.attachShadow({mode:"open"}),this.createRenderer());let e=new MutationObserver(e=>{var t;(!this.mediaController||(null==(t=this.mediaController)?void 0:t.breakpointsComputed))&&e.some(e=>{let t=e.target;return t===this||"media-controller"===t.localName&&!!(lD[e.attributeName]||e.attributeName.startsWith("breakpoint"))})&&this.render()});e.observe(this,{attributes:!0}),e.observe(this.renderRoot,{attributes:!0,subtree:!0}),this.addEventListener(rr.BREAKPOINTS_COMPUTED,this.render),lR(this,hc,hh).call(this,"template")}get mediaController(){return this.renderRoot.querySelector("media-controller")}get template(){var e;return null!=(e=lw(this,hl))?e:this.constructor.template}set template(e){if(null===e)return void this.removeAttribute("template");"string"==typeof e?this.setAttribute("template",e):e instanceof HTMLTemplateElement&&(lI(this,hl,e),lI(this,hu,null),this.createRenderer())}get props(){var e,t,i;let a=[...Array.from(null!=(t=null==(e=this.mediaController)?void 0:e.attributes)?t:[]).filter(({name:e})=>lD[e]||e.startsWith("breakpoint")),...Array.from(this.attributes)],r={};for(let e of a){let t=null!=(i=lD[e.name])?i:e.name.replace(/[-_]([a-z])/g,(e,t)=>t.toUpperCase()),{value:a}=e;null!=a?(rb(a)&&(a=parseFloat(a)),r[t]=""===a||a):r[t]=!1}return r}attributeChangedCallback(e,t,i){"template"===e&&t!=i&&lR(this,hm,hp).call(this)}connectedCallback(){lR(this,hm,hp).call(this)}createRenderer(){this.template instanceof HTMLTemplateElement&&this.template!==lw(this,hd)&&(lI(this,hd,this.template),this.renderer=new li(this.template,this.props,this.constructor.processor),this.renderRoot.textContent="",this.renderRoot.append(lL.content.cloneNode(!0),this.renderer))}render(){var e;null==(e=this.renderer)||e.update(this.props)}}async function lM(e){let t=await fetch(e);if(200!==t.status)throw Error(`Failed to load resource: the server responded with a status of ${t.status}`);return t.text()}function lO(e){return e.split("-")[0]}hl=new WeakMap,hd=new WeakMap,hu=new WeakMap,hc=new WeakSet,hh=function(e){if(Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}},hm=new WeakSet,hp=function(){var e;let t=this.getAttribute("template");if(!t||t===lw(this,hu))return;let i=this.getRootNode(),a=null==(e=null==i?void 0:i.getElementById)?void 0:e.call(i,t);if(a){lI(this,hu,t),lI(this,hl,a),this.createRenderer();return}(function(e){if(!/^(\/|\.\/|https?:\/\/)/.test(e))return!1;let t=/^https?:\/\//.test(e)?void 0:location.origin;try{new URL(e,t)}catch(e){return!1}return!0})(t)&&(lI(this,hu,t),lM(t).then(e=>{let t=rx.createElement("template");t.innerHTML=e,lI(this,hl,t),this.createRenderer()}).catch(console.error))},lC.observedAttributes=["template"],lC.processor=lg,rO.customElements.get("media-theme")||rO.customElements.define("media-theme",lC);class lx extends Event{constructor({action:e="auto",relatedTarget:t,...i}){super("invoke",i),this.action=e,this.relatedTarget=t}}class lN extends Event{constructor({newState:e,oldState:t,...i}){super("toggle",i),this.newState=e,this.oldState=t}}var lP=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},lU=(e,t,i)=>(lP(e,t,"read from private field"),i?i.call(e):t.get(e)),lB=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},lH=(e,t,i,a)=>(lP(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),lW=(e,t,i)=>(lP(e,t,"access private method"),i);function lV({type:e,text:t,value:i,checked:a}){let r=rx.createElement("media-chrome-menu-item");r.type=null!=e?e:"",r.part.add("menu-item"),e&&r.part.add(e),r.value=i,r.checked=a;let n=rx.createElement("span");return n.textContent=t,r.append(n),r}function lF(e,t){let i=e.querySelector(`:scope > [slot="${t}"]`);if((null==i?void 0:i.nodeName)=="SLOT"&&(i=i.assignedElements({flatten:!0})[0]),i)return i.cloneNode(!0);let a=e.shadowRoot.querySelector(`[name="${t}"] > svg`);return a?a.cloneNode(!0):""}let l$={STYLE:"style",HIDDEN:"hidden",DISABLED:"disabled",ANCHOR:"anchor"};class lK extends rO.HTMLElement{constructor(){if(super(),lB(this,hT),lB(this,hk),lB(this,hI),lB(this,hD),lB(this,hC),lB(this,hO),lB(this,hU),lB(this,hH),lB(this,hV),lB(this,h$),lB(this,hq),lB(this,hG),lB(this,hQ),lB(this,hz),lB(this,hJ),lB(this,h1),lB(this,h3),lB(this,h5),lB(this,hv,null),lB(this,hE,null),lB(this,hb,null),lB(this,hg,new Set),lB(this,hf,void 0),lB(this,h_,!1),lB(this,hy,null),lB(this,hS,()=>{let e=lU(this,hg),t=new Set(this.items);for(let i of e)t.has(i)||this.dispatchEvent(new CustomEvent("removemenuitem",{detail:i}));for(let i of t)e.has(i)||this.dispatchEvent(new CustomEvent("addmenuitem",{detail:i}));lH(this,hg,t)}),lB(this,hN,()=>{lW(this,hU,hB).call(this),lW(this,hH,hW).call(this,!1)}),lB(this,hP,()=>{lW(this,hU,hB).call(this)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=rW(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.container=this.shadowRoot.querySelector("#container"),this.defaultSlot=this.shadowRoot.querySelector("slot:not([name])"),this.shadowRoot.addEventListener("slotchange",this),lH(this,hf,new MutationObserver(lU(this,hS))),lU(this,hf).observe(this.defaultSlot,{childList:!0})}static get observedAttributes(){return[l$.DISABLED,l$.HIDDEN,l$.STYLE,l$.ANCHOR,re.MEDIA_CONTROLLER]}static formatMenuItemText(e,t){return e}enable(){this.addEventListener("click",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this),this.addEventListener("invoke",this),this.addEventListener("toggle",this)}disable(){this.removeEventListener("click",this),this.removeEventListener("focusout",this),this.removeEventListener("keyup",this),this.removeEventListener("invoke",this),this.removeEventListener("toggle",this)}handleEvent(e){switch(e.type){case"slotchange":lW(this,hT,hA).call(this,e);break;case"invoke":lW(this,hD,hL).call(this,e);break;case"click":lW(this,hV,hF).call(this,e);break;case"toggle":lW(this,hq,hY).call(this,e);break;case"focusout":lW(this,hQ,hZ).call(this,e);break;case"keydown":lW(this,hz,hX).call(this,e)}}connectedCallback(){var e,t;lH(this,hy,rz(this.shadowRoot,":host")),lW(this,hI,hR).call(this),this.hasAttribute("disabled")||this.enable(),this.role||(this.role="menu"),lH(this,hv,rF(this)),null==(t=null==(e=lU(this,hv))?void 0:e.associateElement)||t.call(e,this),this.hidden||(rB(lY(this),lU(this,hN)),rB(this,lU(this,hP))),lW(this,hk,hw).call(this)}disconnectedCallback(){var e,t;rH(lY(this),lU(this,hN)),rH(this,lU(this,hP)),this.disable(),null==(t=null==(e=lU(this,hv))?void 0:e.unassociateElement)||t.call(e,this),lH(this,hv,null)}attributeChangedCallback(e,t,i){var a,r,n,s;e===l$.HIDDEN&&i!==t?(lU(this,h_)||lH(this,h_,!0),this.hidden?lW(this,hO,hx).call(this):lW(this,hC,hM).call(this),this.dispatchEvent(new lN({oldState:this.hidden?"open":"closed",newState:this.hidden?"closed":"open",bubbles:!0}))):e===re.MEDIA_CONTROLLER?(t&&(null==(r=null==(a=lU(this,hv))?void 0:a.unassociateElement)||r.call(a,this),lH(this,hv,null)),i&&this.isConnected&&(lH(this,hv,rF(this)),null==(s=null==(n=lU(this,hv))?void 0:n.associateElement)||s.call(n,this))):e===l$.DISABLED&&i!==t?null==i?this.enable():this.disable():e===l$.STYLE&&i!==t&&lW(this,hI,hR).call(this)}formatMenuItemText(e,t){return this.constructor.formatMenuItemText(e,t)}get anchor(){return this.getAttribute("anchor")}set anchor(e){this.setAttribute("anchor",`${e}`)}get anchorElement(){var e;return this.anchor?null==(e=rj(this))?void 0:e.querySelector(`#${this.anchor}`):null}get items(){return this.defaultSlot.assignedElements({flatten:!0}).filter(lq)}get radioGroupItems(){return this.items.filter(e=>"menuitemradio"===e.role)}get checkedItems(){return this.items.filter(e=>e.checked)}get value(){var e,t;return null!=(t=null==(e=this.checkedItems[0])?void 0:e.value)?t:""}set value(e){let t=this.items.find(t=>t.value===e);t&&lW(this,h5,h9).call(this,t)}focus(){if(lH(this,hE,rG()),this.items.length){lW(this,h3,h4).call(this,this.items[0]),this.items[0].focus();return}let e=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');null==e||e.focus()}handleSelect(e){var t;let i=lW(this,hJ,h0).call(this,e);i&&(lW(this,h5,h9).call(this,i,"checkbox"===i.type),lU(this,hb)&&!this.hidden&&(null==(t=lU(this,hE))||t.focus(),this.hidden=!0))}get keysUsed(){return["Enter","Escape","Tab"," ","ArrowDown","ArrowUp","Home","End"]}handleMove(e){var t,i;let{key:a}=e,r=this.items,n=null!=(i=null!=(t=lW(this,hJ,h0).call(this,e))?t:lW(this,h1,h2).call(this))?i:r[0],s=Math.max(0,r.indexOf(n));"ArrowDown"===a?s++:"ArrowUp"===a?s--:"Home"===e.key?s=0:"End"===e.key&&(s=r.length-1),s<0&&(s=r.length-1),s>r.length-1&&(s=0),lW(this,h3,h4).call(this,r[s]),r[s].focus()}}function lq(e){return["menuitem","menuitemradio","menuitemcheckbox"].includes(null==e?void 0:e.role)}function lY(e){var t;return null!=(t=e.getAttribute("bounds")?rY(e,`#${e.getAttribute("bounds")}`):rV(e)||e.parentElement)?t:e}hv=new WeakMap,hE=new WeakMap,hb=new WeakMap,hg=new WeakMap,hf=new WeakMap,h_=new WeakMap,hy=new WeakMap,hT=new WeakSet,hA=function(e){let t=e.target;for(let e of t.assignedNodes({flatten:!0}))3===e.nodeType&&""===e.textContent.trim()&&e.remove();["header","title"].includes(t.name)&&lW(this,hk,hw).call(this),t.name||lU(this,hS).call(this)},hk=new WeakSet,hw=function(){let e=this.shadowRoot.querySelector('slot[name="header"]');e.hidden=0===this.shadowRoot.querySelector('slot[name="title"]').assignedNodes().length&&0===e.assignedNodes().length},hS=new WeakMap,hI=new WeakSet,hR=function(){var e;let t=this.shadowRoot.querySelector("#layout-row"),i=null==(e=getComputedStyle(this).getPropertyValue("--media-menu-layout"))?void 0:e.trim();t.setAttribute("media","row"===i?"":"width:0")},hD=new WeakSet,hL=function(e){lH(this,hb,e.relatedTarget),rq(this,e.relatedTarget)||(this.hidden=!this.hidden)},hC=new WeakSet,hM=function(){var e;null==(e=lU(this,hb))||e.setAttribute("aria-expanded","true"),this.addEventListener("transitionend",()=>this.focus(),{once:!0}),rB(lY(this),lU(this,hN)),rB(this,lU(this,hP))},hO=new WeakSet,hx=function(){var e;null==(e=lU(this,hb))||e.setAttribute("aria-expanded","false"),rH(lY(this),lU(this,hN)),rH(this,lU(this,hP))},hN=new WeakMap,hP=new WeakMap,hU=new WeakSet,hB=function(e){if(this.hasAttribute("mediacontroller")&&!this.anchor||this.hidden||!this.anchorElement)return;let{x:t,y:i}=function({anchor:e,floating:t,placement:i}){let{x:a,y:r}=function({anchor:e,floating:t},i){let a,r="x"==(["top","bottom"].includes(lO(i))?"y":"x")?"y":"x",n="y"===r?"height":"width",s=lO(i),o=e.x+e.width/2-t.width/2,l=e.y+e.height/2-t.height/2,d=e[n]/2-t[n]/2;switch(s){case"top":a={x:o,y:e.y-t.height};break;case"bottom":a={x:o,y:e.y+e.height};break;case"right":a={x:e.x+e.width,y:l};break;case"left":a={x:e.x-t.width,y:l};break;default:a={x:e.x,y:e.y}}switch(i.split("-")[1]){case"start":a[r]-=d;break;case"end":a[r]+=d}return a}(function({anchor:e,floating:t}){return{anchor:function(e,t){var i;let a=e.getBoundingClientRect(),r=null!=(i=null==t?void 0:t.getBoundingClientRect())?i:{x:0,y:0};return{x:a.x-r.x,y:a.y-r.y,width:a.width,height:a.height}}(e,t.offsetParent),floating:{x:0,y:0,width:t.offsetWidth,height:t.offsetHeight}}}({anchor:e,floating:t}),i);return{x:a,y:r}}({anchor:this.anchorElement,floating:this,placement:"top-start"});null!=e||(e=this.offsetWidth);let a=lY(this).getBoundingClientRect(),r=a.width-t-e,n=a.height-i-this.offsetHeight,{style:s}=lU(this,hy);s.setProperty("position","absolute"),s.setProperty("right",`${Math.max(0,r)}px`),s.setProperty("--_menu-bottom",`${n}px`);let o=getComputedStyle(this),l=s.getPropertyValue("--_menu-bottom")===o.bottom?n:parseFloat(o.bottom),d=a.height-l-parseFloat(o.marginBottom);this.style.setProperty("--_menu-max-height",`${d}px`)},hH=new WeakSet,hW=function(e){let t=this.querySelector('[role="menuitem"][aria-haspopup][aria-expanded="true"]'),i=null==t?void 0:t.querySelector('[role="menu"]'),{style:a}=lU(this,hy);if(e||a.setProperty("--media-menu-transition-in","none"),i){let e=i.offsetHeight,a=Math.max(i.offsetWidth,t.offsetWidth);this.style.setProperty("min-width",`${a}px`),this.style.setProperty("min-height",`${e}px`),lW(this,hU,hB).call(this,a)}else this.style.removeProperty("min-width"),this.style.removeProperty("min-height"),lW(this,hU,hB).call(this);a.removeProperty("--media-menu-transition-in")},hV=new WeakSet,hF=function(e){var t;if(e.stopPropagation(),e.composedPath().includes(lU(this,h$,hK))){null==(t=lU(this,hE))||t.focus(),this.hidden=!0;return}let i=lW(this,hJ,h0).call(this,e);!i||i.hasAttribute("disabled")||(lW(this,h3,h4).call(this,i),this.handleSelect(e))},h$=new WeakSet,hK=function(){var e;return null==(e=this.shadowRoot.querySelector('slot[name="header"]').assignedElements({flatten:!0}))?void 0:e.find(e=>e.matches('button[part~="back"]'))},hq=new WeakSet,hY=function(e){if(e.target===this)return;lW(this,hG,hj).call(this);let t=Array.from(this.querySelectorAll('[role="menuitem"][aria-haspopup]'));for(let i of t)i.invokeTargetElement!=e.target&&("open"!=e.newState||"true"!=i.getAttribute("aria-expanded")||i.invokeTargetElement.hidden||i.invokeTargetElement.dispatchEvent(new lx({relatedTarget:i})));for(let e of t)e.setAttribute("aria-expanded",`${!e.submenuElement.hidden}`);lW(this,hH,hW).call(this,!0)},hG=new WeakSet,hj=function(){let e=this.querySelector('[role="menuitem"] > [role="menu"]:not([hidden])');this.container.classList.toggle("has-expanded",!!e)},hQ=new WeakSet,hZ=function(e){var t;rq(this,e.relatedTarget)||(lU(this,h_)&&(null==(t=lU(this,hE))||t.focus()),lU(this,hb)&&lU(this,hb)!==e.relatedTarget&&!this.hidden&&(this.hidden=!0))},hz=new WeakSet,hX=function(e){var t,i,a,r,n;let{key:s,ctrlKey:o,altKey:l,metaKey:d}=e;if(!o&&!l&&!d&&this.keysUsed.includes(s))if(e.preventDefault(),e.stopPropagation(),"Tab"===s){if(lU(this,h_)){this.hidden=!0;return}e.shiftKey?null==(i=null==(t=this.previousElementSibling)?void 0:t.focus)||i.call(t):null==(r=null==(a=this.nextElementSibling)?void 0:a.focus)||r.call(a),this.blur()}else"Escape"===s?(null==(n=lU(this,hE))||n.focus(),lU(this,h_)&&(this.hidden=!0)):"Enter"===s||" "===s?this.handleSelect(e):this.handleMove(e)},hJ=new WeakSet,h0=function(e){return e.composedPath().find(e=>["menuitemradio","menuitemcheckbox"].includes(e.role))},h1=new WeakSet,h2=function(){return this.items.find(e=>0===e.tabIndex)},h3=new WeakSet,h4=function(e){for(let t of this.items)t.tabIndex=t===e?0:-1},h5=new WeakSet,h9=function(e,t){let i=[...this.checkedItems];"radio"===e.type&&this.radioGroupItems.forEach(e=>e.checked=!1),t?e.checked=!e.checked:e.checked=!0,this.checkedItems.some((e,t)=>e!=i[t])&&this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))},lK.shadowRootOptions={mode:"open"},lK.getTemplateHTML=function(e){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        --_menu-bg: rgb(20 20 30 / .8);
        background: var(--media-menu-background, var(--media-control-background, var(--media-secondary-color, var(--_menu-bg))));
        border-radius: var(--media-menu-border-radius);
        border: var(--media-menu-border, none);
        display: var(--media-menu-display, inline-flex) !important;
        
        transition: var(--media-menu-transition-in,
          visibility 0s,
          opacity .2s ease-out,
          transform .15s ease-out,
          left .2s ease-in-out,
          min-width .2s ease-in-out,
          min-height .2s ease-in-out
        ) !important;
        
        visibility: var(--media-menu-visibility, visible);
        opacity: var(--media-menu-opacity, 1);
        max-height: var(--media-menu-max-height, var(--_menu-max-height, 300px));
        transform: var(--media-menu-transform-in, translateY(0) scale(1));
        flex-direction: column;
        
        min-height: 0;
        position: relative;
        bottom: var(--_menu-bottom);
        box-sizing: border-box;
      } 

      @-moz-document url-prefix() {
        :host{
          --_menu-bg: rgb(20 20 30);
        }
      }

      :host([hidden]) {
        transition: var(--media-menu-transition-out,
          visibility .15s ease-in,
          opacity .15s ease-in,
          transform .15s ease-in
        ) !important;
        visibility: var(--media-menu-hidden-visibility, hidden);
        opacity: var(--media-menu-hidden-opacity, 0);
        max-height: var(--media-menu-hidden-max-height,
          var(--media-menu-max-height, var(--_menu-max-height, 300px)));
        transform: var(--media-menu-transform-out, translateY(2px) scale(.99));
        pointer-events: none;
      }

      :host([slot="submenu"]) {
        background: none;
        width: 100%;
        min-height: 100%;
        position: absolute;
        bottom: 0;
        right: -100%;
      }

      #container {
        display: flex;
        flex-direction: column;
        min-height: 0;
        transition: transform .2s ease-out;
        transform: translate(0, 0);
      }

      #container.has-expanded {
        transition: transform .2s ease-in;
        transform: translate(-100%, 0);
      }

      button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        outline: inherit;
        display: inline-flex;
        align-items: center;
      }

      slot[name="header"][hidden] {
        display: none;
      }

      slot[name="header"] > *,
      slot[name="header"]::slotted(*) {
        padding: .4em .7em;
        border-bottom: 1px solid rgb(255 255 255 / .25);
        cursor: var(--media-cursor, default);
      }

      slot[name="header"] > button[part~="back"],
      slot[name="header"]::slotted(button[part~="back"]) {
        cursor: var(--media-cursor, pointer);
      }

      svg[part~="back"] {
        height: var(--media-menu-icon-height, var(--media-control-height, 24px));
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        display: block;
        margin-right: .5ch;
      }

      slot:not([name]) {
        gap: var(--media-menu-gap);
        flex-direction: var(--media-menu-flex-direction, column);
        overflow: var(--media-menu-overflow, hidden auto);
        display: flex;
        min-height: 0;
      }

      :host([role="menu"]) slot:not([name]) {
        padding-block: .4em;
      }

      slot:not([name])::slotted([role="menu"]) {
        background: none;
      }

      media-chrome-menu-item > span {
        margin-right: .5ch;
        max-width: var(--media-menu-item-max-width);
        text-overflow: ellipsis;
        overflow: hidden;
      }
    </style>
    <style id="layout-row" media="width:0">

      slot[name="header"] > *,
      slot[name="header"]::slotted(*) {
        padding: .4em .5em;
      }

      slot:not([name]) {
        gap: var(--media-menu-gap, .25em);
        flex-direction: var(--media-menu-flex-direction, row);
        padding-inline: .5em;
      }

      media-chrome-menu-item {
        padding: .3em .5em;
      }

      media-chrome-menu-item[aria-checked="true"] {
        background: var(--media-menu-item-checked-background, rgb(255 255 255 / .2));
      }

      
      media-chrome-menu-item::part(checked-indicator) {
        display: var(--media-menu-item-checked-indicator-display, none);
      }
    </style>
    <div id="container" part="container">
      <slot name="header" hidden>
        <button part="back button" aria-label="Back to previous menu">
          <slot name="back-icon">
            <svg aria-hidden="true" viewBox="0 0 20 24" part="back indicator">
              <path d="m11.88 17.585.742-.669-4.2-4.665 4.2-4.666-.743-.669-4.803 5.335 4.803 5.334Z"/>
            </svg>
          </slot>
          <slot name="title"></slot>
        </button>
      </slot>
      <slot></slot>
    </div>
    <slot name="checked-indicator" hidden></slot>
  `},rO.customElements.get("media-chrome-menu")||rO.customElements.define("media-chrome-menu",lK);var lG=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},lj=(e,t,i)=>(lG(e,t,"read from private field"),i?i.call(e):t.get(e)),lQ=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},lZ=(e,t,i,a)=>(lG(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),lz=(e,t,i)=>(lG(e,t,"access private method"),i);let lX={TYPE:"type",VALUE:"value",CHECKED:"checked",DISABLED:"disabled"};class lJ extends rO.HTMLElement{constructor(){if(super(),lQ(this,h7),lQ(this,mt),lQ(this,ma),lQ(this,ms),lQ(this,ml),lQ(this,mu),lQ(this,h8,!1),lQ(this,h6,void 0),lQ(this,mn,()=>{var e,t;this.submenuElement.items&&this.setAttribute("submenusize",`${this.submenuElement.items.length}`);let i=this.shadowRoot.querySelector('slot[name="description"]'),a=null==(e=this.submenuElement.checkedItems)?void 0:e[0],r=null!=(t=null==a?void 0:a.dataset.description)?t:null==a?void 0:a.text,n=rx.createElement("span");n.textContent=null!=r?r:"",i.replaceChildren(n)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=rW(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.shadowRoot.addEventListener("slotchange",this)}static get observedAttributes(){return[lX.TYPE,lX.DISABLED,lX.CHECKED,lX.VALUE]}enable(){this.hasAttribute("tabindex")||this.setAttribute("tabindex","-1"),l0(this)&&!this.hasAttribute("aria-checked")&&this.setAttribute("aria-checked","false"),this.addEventListener("click",this),this.addEventListener("keydown",this)}disable(){this.removeAttribute("tabindex"),this.removeEventListener("click",this),this.removeEventListener("keydown",this),this.removeEventListener("keyup",this)}handleEvent(e){switch(e.type){case"slotchange":lz(this,h7,me).call(this,e);break;case"click":this.handleClick(e);break;case"keydown":lz(this,ml,md).call(this,e);break;case"keyup":lz(this,ms,mo).call(this,e)}}attributeChangedCallback(e,t,i){e===lX.CHECKED&&l0(this)&&!lj(this,h8)?this.setAttribute("aria-checked",null!=i?"true":"false"):e===lX.TYPE&&i!==t?this.role="menuitem"+i:e===lX.DISABLED&&i!==t&&(null==i?this.enable():this.disable())}connectedCallback(){this.hasAttribute(lX.DISABLED)||this.enable(),this.role="menuitem"+this.type,lZ(this,h6,function e(t,i){if(!t)return null;let{host:a}=t.getRootNode();return!i&&a?e(t,a):(null==i?void 0:i.items)?i:e(i,null==i?void 0:i.parentNode)}(this,this.parentNode)),lz(this,mu,mc).call(this),this.submenuElement&&lz(this,mt,mi).call(this)}disconnectedCallback(){this.disable(),lz(this,mu,mc).call(this),lZ(this,h6,null)}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?null==(e=rj(this))?void 0:e.querySelector(`#${this.invokeTarget}`):this.submenuElement}get submenuElement(){return this.shadowRoot.querySelector('slot[name="submenu"]').assignedElements({flatten:!0})[0]}get type(){var e;return null!=(e=this.getAttribute(lX.TYPE))?e:""}set type(e){this.setAttribute(lX.TYPE,`${e}`)}get value(){var e;return null!=(e=this.getAttribute(lX.VALUE))?e:this.text}set value(e){this.setAttribute(lX.VALUE,e)}get text(){var e;return(null!=(e=this.textContent)?e:"").trim()}get checked(){if(l0(this))return"true"===this.getAttribute("aria-checked")}set checked(e){l0(this)&&(lZ(this,h8,!0),this.setAttribute("aria-checked",e?"true":"false"),e?this.part.add("checked"):this.part.remove("checked"))}handleClick(e){!l0(this)&&this.invokeTargetElement&&rq(this,e.target)&&this.invokeTargetElement.dispatchEvent(new lx({relatedTarget:this}))}get keysUsed(){return["Enter"," "]}}function l0(e){return"radio"===e.type||"checkbox"===e.type}h8=new WeakMap,h6=new WeakMap,h7=new WeakSet,me=function(e){let t=e.target;if(!(null==t?void 0:t.name))for(let e of t.assignedNodes({flatten:!0}))e instanceof Text&&""===e.textContent.trim()&&e.remove();"submenu"===t.name&&(this.submenuElement?lz(this,mt,mi).call(this):lz(this,ma,mr).call(this))},mt=new WeakSet,mi=async function(){this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",`${!this.submenuElement.hidden}`),this.submenuElement.addEventListener("change",lj(this,mn)),this.submenuElement.addEventListener("addmenuitem",lj(this,mn)),this.submenuElement.addEventListener("removemenuitem",lj(this,mn)),lj(this,mn).call(this)},ma=new WeakSet,mr=function(){this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"),this.submenuElement.removeEventListener("change",lj(this,mn)),this.submenuElement.removeEventListener("addmenuitem",lj(this,mn)),this.submenuElement.removeEventListener("removemenuitem",lj(this,mn)),lj(this,mn).call(this)},mn=new WeakMap,ms=new WeakSet,mo=function(e){let{key:t}=e;if(!this.keysUsed.includes(t))return void this.removeEventListener("keyup",lz(this,ms,mo));this.handleClick(e)},ml=new WeakSet,md=function(e){let{metaKey:t,altKey:i,key:a}=e;if(t||i||!this.keysUsed.includes(a))return void this.removeEventListener("keyup",lz(this,ms,mo));this.addEventListener("keyup",lz(this,ms,mo),{once:!0})},mu=new WeakSet,mc=function(){var e;let t=null==(e=lj(this,h6))?void 0:e.radioGroupItems;if(!t)return;let i=t.filter(e=>"true"===e.getAttribute("aria-checked")).pop();for(let e of(i||(i=t[0]),t))e.setAttribute("aria-checked","false");null==i||i.setAttribute("aria-checked","true")},lJ.shadowRootOptions={mode:"open"},lJ.getTemplateHTML=function(e){return`
    <style>
      :host {
        transition: var(--media-menu-item-transition,
          background .15s linear,
          opacity .2s ease-in-out
        );
        outline: var(--media-menu-item-outline, 0);
        outline-offset: var(--media-menu-item-outline-offset, -1px);
        cursor: var(--media-cursor, pointer);
        display: flex;
        align-items: center;
        align-self: stretch;
        justify-self: stretch;
        white-space: nowrap;
        white-space-collapse: collapse;
        text-wrap: nowrap;
        padding: .4em .8em .4em 1em;
      }

      :host(:focus-visible) {
        box-shadow: var(--media-menu-item-focus-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: var(--media-menu-item-hover-outline, 0);
        outline-offset: var(--media-menu-item-hover-outline-offset,  var(--media-menu-item-outline-offset, -1px));
      }

      :host(:hover) {
        cursor: var(--media-cursor, pointer);
        background: var(--media-menu-item-hover-background, rgb(92 92 102 / .5));
        outline: var(--media-menu-item-hover-outline);
        outline-offset: var(--media-menu-item-hover-outline-offset,  var(--media-menu-item-outline-offset, -1px));
      }

      :host([aria-checked="true"]) {
        background: var(--media-menu-item-checked-background);
      }

      :host([hidden]) {
        display: none;
      }

      :host([disabled]) {
        pointer-events: none;
        color: rgba(255, 255, 255, .3);
      }

      slot:not([name]) {
        width: 100%;
      }

      slot:not([name="submenu"]) {
        display: inline-flex;
        align-items: center;
        transition: inherit;
        opacity: var(--media-menu-item-opacity, 1);
      }

      slot[name="description"] {
        justify-content: end;
      }

      slot[name="description"] > span {
        display: inline-block;
        margin-inline: 1em .2em;
        max-width: var(--media-menu-item-description-max-width, 100px);
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: .8em;
        font-weight: 400;
        text-align: right;
        position: relative;
        top: .04em;
      }

      slot[name="checked-indicator"] {
        display: none;
      }

      :host(:is([role="menuitemradio"],[role="menuitemcheckbox"])) slot[name="checked-indicator"] {
        display: var(--media-menu-item-checked-indicator-display, inline-block);
      }

      
      svg, img, ::slotted(svg), ::slotted(img) {
        height: var(--media-menu-item-icon-height, var(--media-control-height, 24px));
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        display: block;
      }

      
      [part~="indicator"],
      ::slotted([part~="indicator"]) {
        fill: var(--media-menu-item-indicator-fill,
          var(--media-icon-color, var(--media-primary-color, rgb(238 238 238))));
        height: var(--media-menu-item-indicator-height, 1.25em);
        margin-right: .5ch;
      }

      [part~="checked-indicator"] {
        visibility: hidden;
      }

      :host([aria-checked="true"]) [part~="checked-indicator"] {
        visibility: visible;
      }
    </style>
    <slot name="checked-indicator">
      <svg aria-hidden="true" viewBox="0 1 24 24" part="checked-indicator indicator">
        <path d="m10 15.17 9.193-9.191 1.414 1.414-10.606 10.606-6.364-6.364 1.414-1.414 4.95 4.95Z"/>
      </svg>
    </slot>
    <slot name="prefix"></slot>
    <slot></slot>
    <slot name="description"></slot>
    <slot name="suffix">
      ${this.getSuffixSlotInnerHTML(e)}
    </slot>
    <slot name="submenu"></slot>
  `},lJ.getSuffixSlotInnerHTML=function(e){return""},rO.customElements.get("media-chrome-menu-item")||rO.customElements.define("media-chrome-menu-item",lJ);class l1 extends lK{get anchorElement(){return"auto"!==this.anchor?super.anchorElement:rV(this).querySelector("media-settings-menu-button")}}l1.getTemplateHTML=function(e){return`
    ${lK.getTemplateHTML(e)}
    <style>
      :host {
        --_menu-bg: rgb(20 20 30 / .8);
        background: var(--media-settings-menu-background,
            var(--media-menu-background,
              var(--media-control-background,
                var(--media-secondary-color, var(--_menu-bg)))));
        min-width: var(--media-settings-menu-min-width, 170px);
        border-radius: 2px 2px 0 0;
        overflow: hidden;
      }

      @-moz-document url-prefix() {
        :host{
          --_menu-bg: rgb(20 20 30);
        }
      }

      :host([role="menu"]) {
        
        justify-content: end;
      }

      slot:not([name]) {
        justify-content: var(--media-settings-menu-justify-content);
        flex-direction: var(--media-settings-menu-flex-direction, column);
        overflow: visible;
      }

      #container.has-expanded {
        --media-settings-menu-item-opacity: 0;
      }
    </style>
  `},rO.customElements.get("media-settings-menu")||rO.customElements.define("media-settings-menu",l1);class l2 extends lJ{}l2.shadowRootOptions={mode:"open"},l2.getTemplateHTML=function(e){return`
    ${lJ.getTemplateHTML.call(this,e)}
    <style>
      slot:not([name="submenu"]) {
        opacity: var(--media-settings-menu-item-opacity, var(--media-menu-item-opacity));
      }

      :host([aria-expanded="true"]:hover) {
        background: transparent;
      }
    </style>
  `},l2.getSuffixSlotInnerHTML=function(e){return`
    <svg aria-hidden="true" viewBox="0 0 20 24">
      <path d="m8.12 17.585-.742-.669 4.2-4.665-4.2-4.666.743-.669 4.803 5.335-4.803 5.334Z"/>
    </svg>
  `},rO.customElements.get("media-settings-menu-item")||rO.customElements.define("media-settings-menu-item",l2);class l3 extends so{connectedCallback(){super.connectedCallback(),this.invokeTargetElement&&this.setAttribute("aria-haspopup","menu")}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?null==(e=rj(this))?void 0:e.querySelector(`#${this.invokeTarget}`):null}handleClick(){var e;null==(e=this.invokeTargetElement)||e.dispatchEvent(new lx({relatedTarget:this}))}}rO.customElements.get("media-chrome-menu-button")||rO.customElements.define("media-chrome-menu-button",l3);class l4 extends l3{static get observedAttributes(){return[...super.observedAttributes,"target"]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",rk("settings"))}get invokeTargetElement(){return void 0!=this.invokeTarget?super.invokeTargetElement:rV(this).querySelector("media-settings-menu")}}l4.getSlotTemplateHTML=function(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M4.5 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm7.5 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm7.5 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
      </svg>
    </slot>
  `},l4.getTooltipContentHTML=function(){return rk("Settings")},rO.customElements.get("media-settings-menu-button")||rO.customElements.define("media-settings-menu-button",l4);var l5=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},l9=(e,t,i)=>(l5(e,t,"read from private field"),i?i.call(e):t.get(e)),l8=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},l6=(e,t,i,a)=>(l5(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),l7=(e,t,i)=>(l5(e,t,"access private method"),i);class de extends lK{constructor(){super(...arguments),l8(this,mp),l8(this,mE),l8(this,mh,[]),l8(this,mm,void 0)}static get observedAttributes(){return[...super.observedAttributes,ra.MEDIA_AUDIO_TRACK_LIST,ra.MEDIA_AUDIO_TRACK_ENABLED,ra.MEDIA_AUDIO_TRACK_UNAVAILABLE]}attributeChangedCallback(e,t,i){if(super.attributeChangedCallback(e,t,i),e===ra.MEDIA_AUDIO_TRACK_ENABLED&&t!==i)this.value=i;else if(e===ra.MEDIA_AUDIO_TRACK_LIST&&t!==i){var a;l6(this,mh,null==(a=null!=i?i:"")?void 0:a.split(/\s+/).map(rv)),l7(this,mp,mv).call(this)}}connectedCallback(){super.connectedCallback(),this.addEventListener("change",l7(this,mE,mb))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",l7(this,mE,mb))}get anchorElement(){var e;return"auto"!==this.anchor?super.anchorElement:null==(e=rV(this))?void 0:e.querySelector("media-audio-track-menu-button")}get mediaAudioTrackList(){return l9(this,mh)}set mediaAudioTrackList(e){l6(this,mh,e),l7(this,mp,mv).call(this)}get mediaAudioTrackEnabled(){var e;return null!=(e=r2(this,ra.MEDIA_AUDIO_TRACK_ENABLED))?e:""}set mediaAudioTrackEnabled(e){r3(this,ra.MEDIA_AUDIO_TRACK_ENABLED,e)}}mh=new WeakMap,mm=new WeakMap,mp=new WeakSet,mv=function(){if(l9(this,mm)===JSON.stringify(this.mediaAudioTrackList))return;l6(this,mm,JSON.stringify(this.mediaAudioTrackList));let e=this.mediaAudioTrackList;for(let t of(this.defaultSlot.textContent="",e.sort((e,t)=>e.id.localeCompare(t.id,void 0,{numeric:!0})),e)){let e=lV({type:"radio",text:this.formatMenuItemText(t.label,t),value:`${t.id}`,checked:t.enabled});e.prepend(lF(this,"checked-indicator")),this.defaultSlot.append(e)}},mE=new WeakSet,mb=function(){if(null==this.value)return;let e=new rO.CustomEvent(a7.MEDIA_AUDIO_TRACK_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(e)},rO.customElements.get("media-audio-track-menu")||rO.customElements.define("media-audio-track-menu",de);let dt=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M11 17H9.5V7H11v10Zm-3-3H6.5v-4H8v4Zm6-5h-1.5v6H14V9Zm3 7h-1.5V8H17v8Z"/>
  <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0Z"/>
</svg>`,di=e=>{let t=rk("Audio");e.setAttribute("aria-label",t)};class da extends l3{static get observedAttributes(){return[...super.observedAttributes,ra.MEDIA_AUDIO_TRACK_ENABLED,ra.MEDIA_AUDIO_TRACK_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),di(this)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===ra.MEDIA_LANG&&di(this)}get invokeTargetElement(){var e;return void 0!=this.invokeTarget?super.invokeTargetElement:null==(e=rV(this))?void 0:e.querySelector("media-audio-track-menu")}get mediaAudioTrackEnabled(){var e;return null!=(e=r2(this,ra.MEDIA_AUDIO_TRACK_ENABLED))?e:""}set mediaAudioTrackEnabled(e){r3(this,ra.MEDIA_AUDIO_TRACK_ENABLED,e)}}da.getSlotTemplateHTML=function(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${dt}</slot>
  `},da.getTooltipContentHTML=function(){return rk("Audio")},rO.customElements.get("media-audio-track-menu-button")||rO.customElements.define("media-audio-track-menu-button",da);var dr=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},dn=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},ds=(e,t,i)=>(dr(e,t,"access private method"),i);let dl=`
  <svg aria-hidden="true" viewBox="0 0 26 24" part="captions-indicator indicator">
    <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
  </svg>`;class dd extends lK{constructor(){super(...arguments),dn(this,mf),dn(this,my),dn(this,mg,void 0)}static get observedAttributes(){return[...super.observedAttributes,ra.MEDIA_SUBTITLES_LIST,ra.MEDIA_SUBTITLES_SHOWING]}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===ra.MEDIA_SUBTITLES_LIST&&t!==i?ds(this,mf,m_).call(this):e===ra.MEDIA_SUBTITLES_SHOWING&&t!==i&&(this.value=i||"",ds(this,mf,m_).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",ds(this,my,mT))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",ds(this,my,mT))}get anchorElement(){return"auto"!==this.anchor?super.anchorElement:rV(this).querySelector("media-captions-menu-button")}get mediaSubtitlesList(){return du(this,ra.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){dc(this,ra.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return du(this,ra.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){dc(this,ra.MEDIA_SUBTITLES_SHOWING,e)}}mg=new WeakMap,mf=new WeakSet,m_=function(){var e,t,i,a,r,n;let s=(dr(this,t=mg,"read from private field"),(i?i.call(this):t.get(this))!==JSON.stringify(this.mediaSubtitlesList)),o=this.value!==this.getAttribute(ra.MEDIA_SUBTITLES_SHOWING);if(!s&&!o)return;a=mg,r=JSON.stringify(this.mediaSubtitlesList),dr(this,a,"write to private field"),n?n.call(this,r):a.set(this,r),this.defaultSlot.textContent="";let l=!this.value,d=lV({type:"radio",text:this.formatMenuItemText(rk("Off")),value:"off",checked:l});for(let t of(d.prepend(lF(this,"checked-indicator")),this.defaultSlot.append(d),this.mediaSubtitlesList)){let i=lV({type:"radio",text:this.formatMenuItemText(t.label,t),value:nv(t),checked:this.value==nv(t)});i.prepend(lF(this,"checked-indicator")),"captions"===(null!=(e=t.kind)?e:"subs")&&i.append(lF(this,"captions-indicator")),this.defaultSlot.append(i)}},my=new WeakSet,mT=function(){let e=this.mediaSubtitlesShowing,t=this.getAttribute(ra.MEDIA_SUBTITLES_SHOWING),i=this.value!==t;if((null==e?void 0:e.length)&&i&&this.dispatchEvent(new rO.CustomEvent(a7.MEDIA_DISABLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:e})),!this.value||!i)return;let a=new rO.CustomEvent(a7.MEDIA_SHOW_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(a)},dd.getTemplateHTML=function(e){return`
    ${lK.getTemplateHTML(e)}
    <slot name="captions-indicator" hidden>${dl}</slot>
  `};let du=(e,t)=>{let i=e.getAttribute(t);return i?nm(i):[]},dc=(e,t,i)=>{if(!(null==i?void 0:i.length))return void e.removeAttribute(t);let a=nE(i);e.getAttribute(t)!==a&&e.setAttribute(t,a)};rO.customElements.get("media-captions-menu")||rO.customElements.define("media-captions-menu",dd);let dh=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,dm=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`,dp=e=>{e.setAttribute("data-captions-enabled",n_(e).toString())},dv=e=>{e.setAttribute("aria-label",rk("closed captions"))};class dE extends l3{static get observedAttributes(){return[...super.observedAttributes,ra.MEDIA_SUBTITLES_LIST,ra.MEDIA_SUBTITLES_SHOWING,ra.MEDIA_LANG]}connectedCallback(){super.connectedCallback(),dv(this),dp(this)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===ra.MEDIA_SUBTITLES_SHOWING?dp(this):e===ra.MEDIA_LANG&&dv(this)}get invokeTargetElement(){var e;return void 0!=this.invokeTarget?super.invokeTargetElement:null==(e=rV(this))?void 0:e.querySelector("media-captions-menu")}get mediaSubtitlesList(){return db(this,ra.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){dg(this,ra.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return db(this,ra.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){dg(this,ra.MEDIA_SUBTITLES_SHOWING,e)}}dE.getSlotTemplateHTML=function(){return`
    <style>
      :host([data-captions-enabled="true"]) slot[name=off] {
        display: none !important;
      }

      
      :host(:not([data-captions-enabled="true"])) slot[name=on] {
        display: none !important;
      }

      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="on">${dh}</slot>
      <slot name="off">${dm}</slot>
    </slot>
  `},dE.getTooltipContentHTML=function(){return rk("Captions")};let db=(e,t)=>{let i=e.getAttribute(t);return i?nm(i):[]},dg=(e,t,i)=>{if(!(null==i?void 0:i.length))return void e.removeAttribute(t);let a=nE(i);e.getAttribute(t)!==a&&e.setAttribute(t,a)};rO.customElements.get("media-captions-menu-button")||rO.customElements.define("media-captions-menu-button",dE);var df=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},d_=(e,t,i)=>(df(e,t,"read from private field"),i?i.call(e):t.get(e)),dy=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},dT=(e,t,i)=>(df(e,t,"access private method"),i);let dA={RATES:"rates"};class dk extends lK{constructor(){super(),dy(this,mk),dy(this,mS),dy(this,mA,new nc(this,dA.RATES,{defaultValue:ob})),dT(this,mk,mw).call(this)}static get observedAttributes(){return[...super.observedAttributes,ra.MEDIA_PLAYBACK_RATE,dA.RATES]}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===ra.MEDIA_PLAYBACK_RATE&&t!=i?(this.value=i,dT(this,mk,mw).call(this)):e===dA.RATES&&t!=i&&(d_(this,mA).value=i,dT(this,mk,mw).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",dT(this,mS,mI))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",dT(this,mS,mI))}get anchorElement(){return"auto"!==this.anchor?super.anchorElement:rV(this).querySelector("media-playback-rate-menu-button")}get rates(){return d_(this,mA)}set rates(e){e?Array.isArray(e)?d_(this,mA).value=e.join(" "):"string"==typeof e&&(d_(this,mA).value=e):d_(this,mA).value="",dT(this,mk,mw).call(this)}get mediaPlaybackRate(){return rX(this,ra.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){rJ(this,ra.MEDIA_PLAYBACK_RATE,e)}}mA=new WeakMap,mk=new WeakSet,mw=function(){this.defaultSlot.textContent="";let e=this.mediaPlaybackRate,t=new Set(Array.from(d_(this,mA)).map(e=>Number(e)));for(let i of(e>0&&!t.has(e)&&t.add(e),Array.from(t).sort((e,t)=>e-t))){let t=lV({type:"radio",text:this.formatMenuItemText(`${i}x`,i),value:i.toString(),checked:e===i});t.prepend(lF(this,"checked-indicator")),this.defaultSlot.append(t)}},mS=new WeakSet,mI=function(){if(!this.value)return;let e=new rO.CustomEvent(a7.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(e)},rO.customElements.get("media-playback-rate-menu")||rO.customElements.define("media-playback-rate-menu",dk);class dw extends l3{static get observedAttributes(){return[...super.observedAttributes,ra.MEDIA_PLAYBACK_RATE]}constructor(){var e;super(),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${null!=(e=this.mediaPlaybackRate)?e:1}x`}attributeChangedCallback(e,t,i){if(super.attributeChangedCallback(e,t,i),e===ra.MEDIA_PLAYBACK_RATE){let e=i?+i:NaN,t=Number.isNaN(e)?1:e;this.container.innerHTML=`${t}x`,this.setAttribute("aria-label",rk("Playback rate {playbackRate}",{playbackRate:t}))}}get invokeTargetElement(){return void 0!=this.invokeTarget?super.invokeTargetElement:rV(this).querySelector("media-playback-rate-menu")}get mediaPlaybackRate(){return rX(this,ra.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){rJ(this,ra.MEDIA_PLAYBACK_RATE,e)}}dw.getSlotTemplateHTML=function(e){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
      
      :host([aria-expanded="true"]) slot {
        display: block;
      }

      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${e.mediaplaybackrate||1}x</slot>
  `},dw.getTooltipContentHTML=function(){return rk("Playback rate")},rO.customElements.get("media-playback-rate-menu-button")||rO.customElements.define("media-playback-rate-menu-button",dw);var dS=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},dI=(e,t,i)=>(dS(e,t,"read from private field"),i?i.call(e):t.get(e)),dR=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},dD=(e,t,i,a)=>(dS(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),dL=(e,t,i)=>(dS(e,t,"access private method"),i);class dC extends lK{constructor(){super(...arguments),dR(this,mL),dR(this,mM),dR(this,mR,[]),dR(this,mD,{})}static get observedAttributes(){return[...super.observedAttributes,ra.MEDIA_RENDITION_LIST,ra.MEDIA_RENDITION_SELECTED,ra.MEDIA_RENDITION_UNAVAILABLE,ra.MEDIA_HEIGHT]}static formatMenuItemText(e,t){return super.formatMenuItemText(e,t)}static formatRendition(e,{showBitrate:t=!1}={}){let i=`${Math.min(e.width,e.height)}p`;if(t&&e.bitrate){let t=e.bitrate/1e6,a=`${t.toFixed(+(t<1))} Mbps`;return`${i} (${a})`}return this.formatMenuItemText(i,e)}static compareRendition(e,t){var i,a;return t.height===e.height?(null!=(i=t.bitrate)?i:0)-(null!=(a=e.bitrate)?a:0):t.height-e.height}attributeChangedCallback(e,t,i){if(super.attributeChangedCallback(e,t,i),e===ra.MEDIA_RENDITION_SELECTED&&t!==i)this.value=null!=i?i:"auto",dL(this,mL,mC).call(this);else if(e===ra.MEDIA_RENDITION_LIST&&t!==i)dD(this,mR,null==i?void 0:i.split(/\s+/).map(rm)),dL(this,mL,mC).call(this);else e===ra.MEDIA_HEIGHT&&t!==i&&dL(this,mL,mC).call(this)}connectedCallback(){super.connectedCallback(),this.addEventListener("change",dL(this,mM,mO))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",dL(this,mM,mO))}get anchorElement(){return"auto"!==this.anchor?super.anchorElement:rV(this).querySelector("media-rendition-menu-button")}get mediaRenditionList(){return dI(this,mR)}set mediaRenditionList(e){dD(this,mR,e),dL(this,mL,mC).call(this)}get mediaRenditionSelected(){return r2(this,ra.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){r3(this,ra.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return rX(this,ra.MEDIA_HEIGHT)}set mediaHeight(e){rJ(this,ra.MEDIA_HEIGHT,e)}compareRendition(e,t){return this.constructor.compareRendition(e,t)}formatMenuItemText(e,t){return this.constructor.formatMenuItemText(e,t)}formatRendition(e,t){return this.constructor.formatRendition(e,t)}showRenditionBitrate(e){return this.mediaRenditionList.some(t=>t!==e&&t.height===e.height&&t.bitrate!==e.bitrate)}}mR=new WeakMap,mD=new WeakMap,mL=new WeakSet,mC=function(){if(dI(this,mD).mediaRenditionList===JSON.stringify(this.mediaRenditionList)&&dI(this,mD).mediaHeight===this.mediaHeight)return;dI(this,mD).mediaRenditionList=JSON.stringify(this.mediaRenditionList),dI(this,mD).mediaHeight=this.mediaHeight;let e=this.mediaRenditionList.sort(this.compareRendition.bind(this)),t=e.find(e=>e.id===this.mediaRenditionSelected);for(let i of e)i.selected=i===t;this.defaultSlot.textContent="";let i=!this.mediaRenditionSelected;for(let t of e){let e=lV({type:"radio",text:this.formatRendition(t,{showBitrate:this.showRenditionBitrate(t)}),value:`${t.id}`,checked:t.selected&&!i});e.prepend(lF(this,"checked-indicator")),this.defaultSlot.append(e)}let a=t&&this.showRenditionBitrate(t),r=i?t?this.formatMenuItemText(`${rk("Auto")} \u2022 ${this.formatRendition(t,{showBitrate:a})}`,t):this.formatMenuItemText(`${rk("Auto")} (${this.mediaHeight}p)`):this.formatMenuItemText(rk("Auto")),n=lV({type:"radio",text:r,value:"auto",checked:i});n.dataset.description=r,n.prepend(lF(this,"checked-indicator")),this.defaultSlot.append(n)},mM=new WeakSet,mO=function(){if(null==this.value)return;let e=new rO.CustomEvent(a7.MEDIA_RENDITION_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(e)},rO.customElements.get("media-rendition-menu")||rO.customElements.define("media-rendition-menu",dC);let dM=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M13.5 2.5h2v6h-2v-2h-11v-2h11v-2Zm4 2h4v2h-4v-2Zm-12 4h2v6h-2v-2h-3v-2h3v-2Zm4 2h12v2h-12v-2Zm1 4h2v6h-2v-2h-8v-2h8v-2Zm4 2h7v2h-7v-2Z" />
</svg>`;class dO extends l3{static get observedAttributes(){return[...super.observedAttributes,ra.MEDIA_RENDITION_SELECTED,ra.MEDIA_RENDITION_UNAVAILABLE,ra.MEDIA_HEIGHT]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",rk("quality"))}get invokeTargetElement(){return void 0!=this.invokeTarget?super.invokeTargetElement:rV(this).querySelector("media-rendition-menu")}get mediaRenditionSelected(){return r2(this,ra.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){r3(this,ra.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return rX(this,ra.MEDIA_HEIGHT)}set mediaHeight(e){rJ(this,ra.MEDIA_HEIGHT,e)}}dO.getSlotTemplateHTML=function(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${dM}</slot>
  `},dO.getTooltipContentHTML=function(){return rk("Quality")},rO.customElements.get("media-rendition-menu-button")||rO.customElements.define("media-rendition-menu-button",dO);var dx=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},dN=(e,t,i)=>(dx(e,t,"read from private field"),i?i.call(e):t.get(e)),dP=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},dU=(e,t,i,a)=>(dx(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),dB=(e,t,i)=>(dx(e,t,"access private method"),i);class dH extends lK{constructor(){super(),dP(this,mN),dP(this,mU),dP(this,mH),dP(this,mV),dP(this,mK),dP(this,mx,!1),dP(this,m$,e=>{let t=e.target,i=(null==t?void 0:t.nodeName)==="VIDEO",a=dB(this,mV,mF).call(this,t);(i||a)&&(dN(this,mx)?dB(this,mU,mB).call(this):dB(this,mK,mq).call(this,e))}),dP(this,mY,e=>{let t=e.target,i=this.contains(t),a=2===e.button,r=(null==t?void 0:t.nodeName)==="VIDEO",n=dB(this,mV,mF).call(this,t);!i&&(a&&(r||n)||dB(this,mU,mB).call(this))}),dP(this,mG,e=>{"Escape"===e.key&&dB(this,mU,mB).call(this)}),dP(this,mj,e=>{var t,i;let a=e.target;if(null==(t=a.matches)?void 0:t.call(a,'button[invoke="copy"]')){let e=null==(i=a.closest("media-context-menu-item"))?void 0:i.querySelector('input[slot="copy"]');e&&navigator.clipboard.writeText(e.value)}dB(this,mU,mB).call(this)}),this.setAttribute("noautohide",""),dB(this,mN,mP).call(this)}connectedCallback(){super.connectedCallback(),rV(this).addEventListener("contextmenu",dN(this,m$)),this.addEventListener("click",dN(this,mj))}disconnectedCallback(){super.disconnectedCallback(),rV(this).removeEventListener("contextmenu",dN(this,m$)),this.removeEventListener("click",dN(this,mj)),document.removeEventListener("mousedown",dN(this,mY)),document.removeEventListener("keydown",dN(this,mG))}}mx=new WeakMap,mN=new WeakSet,mP=function(){this.hidden=!dN(this,mx)},mU=new WeakSet,mB=function(){dU(this,mx,!1),dB(this,mN,mP).call(this)},mH=new WeakSet,mW=function(){document.querySelectorAll("media-context-menu").forEach(e=>{e!==this&&dB(e,mU,mB).call(e)})},mV=new WeakSet,mF=function(e){return!!e&&(!!e.hasAttribute("slot")&&"media"===e.getAttribute("slot")||!!(e.nodeName.includes("-")&&e.tagName.includes("-"))&&(e.hasAttribute("src")||e.hasAttribute("poster")||e.hasAttribute("preload")||e.hasAttribute("playsinline")))},m$=new WeakMap,mK=new WeakSet,mq=function(e){e.preventDefault(),dB(this,mH,mW).call(this),dU(this,mx,!0),this.style.position="fixed",this.style.left=`${e.clientX}px`,this.style.top=`${e.clientY}px`,dB(this,mN,mP).call(this),document.addEventListener("mousedown",dN(this,mY),{once:!0}),document.addEventListener("keydown",dN(this,mG),{once:!0})},mY=new WeakMap,mG=new WeakMap,mj=new WeakMap,dH.getTemplateHTML=function(e){return`
      ${lK.getTemplateHTML(e)}
      <style>
        :host {
          --_menu-bg: rgb(20 20 30 / .8);
          background: var(--media-settings-menu-background,
            var(--media-menu-background,
              var(--media-control-background,
                var(--media-secondary-color, var(--_menu-bg)))));
          min-width: var(--media-settings-menu-min-width, 170px);
          border-radius: 2px;
          overflow: hidden;
        }
      </style>
    `},rO.customElements.get("media-context-menu")||rO.customElements.define("media-context-menu",dH);class dW extends lJ{}dW.shadowRootOptions={mode:"open"},dW.getTemplateHTML=function(e){return`
    ${lJ.getTemplateHTML.call(this,e)}
    <style>
        ::slotted(*) {
            color: var(--media-text-color, white);
            text-decoration: none;
            border: none;
            background: none;
            cursor: pointer;
            padding: 0;
            min-height: var(--media-control-height, 24px);
        }
    </style>
  `},rO.customElements.get("media-context-menu-item")||rO.customElements.define("media-context-menu-item",dW);var dV=e=>{throw TypeError(e)},dF=(e,t,i)=>t.has(e)||dV("Cannot "+i),d$=(e,t,i)=>(dF(e,t,"read from private field"),i?i.call(e):t.get(e)),dK=(e,t,i)=>t.has(e)?dV("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,i),dq=(e,t,i,a)=>(dF(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),dY=(e,t,i)=>(dF(e,t,"access private method"),i),dG=class{addEventListener(){}removeEventListener(){}dispatchEvent(e){return!0}};if("undefined"==typeof DocumentFragment){class e extends dG{}globalThis.DocumentFragment=e}var dj,dQ,dZ,dz,dX,dJ,d0,d1,d2,d3,d4,d5,d9,d8,d6,d7,ue,ut,ui,ua,ur,un,us,uo,ul,ud,uu,uc,uh,um,up,uv,uE,ub,ug,uf,u_,uy,uT,uA,uk,uw,uS,uI,uR,uD,uL,uC,uM,uO,ux,uN,uP,uU,uB,uH,uW,uV,uF,u$,uK,uq,uY,uG,uj,uQ,uZ,uz,uX,uJ,u0,u1,u2,u3,u4,u5,u9,u8,u6,u7,ce,ct,ci,ca,cr,cn,cs,co,cl,cd,cu,cc,ch,cm,cp,cv,cE,cb,cg,cf,c_,cy,cT,cA,ck,cw,cS,cI,cR,cD,cL,cC,cM,cO,cx,cN,cP,cU,cB,cH,cW,cV,cF,c$,cK,cq,cY,cG,cj,cQ,cZ,cz,cX,cJ,c0,c1,c2,c3,c4,c5,c9,c8,c6,c7,he,ht,hi,ha,hr,hn,hs,ho,hl,hd,hu,hc,hh,hm,hp,hv,hE,hb,hg,hf,h_,hy,hT,hA,hk,hw,hS,hI,hR,hD,hL,hC,hM,hO,hx,hN,hP,hU,hB,hH,hW,hV,hF,h$,hK,hq,hY,hG,hj,hQ,hZ,hz,hX,hJ,h0,h1,h2,h3,h4,h5,h9,h8,h6,h7,me,mt,mi,ma,mr,mn,ms,mo,ml,md,mu,mc,mh,mm,mp,mv,mE,mb,mg,mf,m_,my,mT,mA,mk,mw,mS,mI,mR,mD,mL,mC,mM,mO,mx,mN,mP,mU,mB,mH,mW,mV,mF,m$,mK,mq,mY,mG,mj,mQ,mZ=class extends dG{},mz=class{constructor(e,t={}){dK(this,mQ),dq(this,mQ,null==t?void 0:t.detail)}get detail(){return d$(this,mQ)}initCustomEvent(){}};mQ=new WeakMap;var mX={document:{createElement:function(e,t){return new mZ}},DocumentFragment,customElements:{get(e){},define(e,t,i){},getName:e=>null,upgrade(e){},whenDefined:e=>Promise.resolve(mZ)},CustomEvent:mz,EventTarget:dG,HTMLElement:mZ,HTMLVideoElement:class extends dG{}},mJ="undefined"==typeof window||void 0===globalThis.customElements,m0=mJ?mX:globalThis,m1=mJ?mX.document:globalThis.document;function m2(e){return e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}function m3(e){return e.replace(/[-_]([a-z])/g,(e,t)=>t.toUpperCase())}function m4(e){if(null==e)return;let t=+e;return Number.isNaN(t)?void 0:t}function m5(e){let t=(function(e){let t={};for(let i in e)null!=e[i]&&(t[i]=e[i]);return new URLSearchParams(t)})(e).toString();return t?"?"+t:""}var m9,m8,m6,m7=(e,t)=>!!e&&!!t&&(!!e.contains(t)||m7(e,t.getRootNode().host)),pe="mux.com",pt=(()=>{try{return"3.10.2"}catch{}return"UNKNOWN"})(),pi=e=>{if(e){if([tq.LIVE,tq.ON_DEMAND].includes(e))return e;if(null!=e&&e.includes("live"))return tq.LIVE}},pa={crossorigin:"crossOrigin",playsinline:"playsInline"},pr=class{constructor(e,t){dK(this,m9),dK(this,m8),dK(this,m6,[]),dq(this,m9,e),dq(this,m8,t)}[Symbol.iterator](){return d$(this,m6).values()}get length(){return d$(this,m6).length}get value(){var e;return null!=(e=d$(this,m6).join(" "))?e:""}set value(e){var t;e!==this.value&&(dq(this,m6,[]),this.add(...null!=(t=null==e?void 0:e.split(" "))?t:[]))}toString(){return this.value}item(e){return d$(this,m6)[e]}values(){return d$(this,m6).values()}keys(){return d$(this,m6).keys()}forEach(e){d$(this,m6).forEach(e)}add(...e){var t,i;e.forEach(e=>{this.contains(e)||d$(this,m6).push(e)}),(""!==this.value||null!=(t=d$(this,m9))&&t.hasAttribute(`${d$(this,m8)}`))&&null!=(i=d$(this,m9))&&i.setAttribute(`${d$(this,m8)}`,`${this.value}`)}remove(...e){var t;e.forEach(e=>{d$(this,m6).splice(d$(this,m6).indexOf(e),1)}),null==(t=d$(this,m9))||t.setAttribute(`${d$(this,m8)}`,`${this.value}`)}contains(e){return d$(this,m6).includes(e)}toggle(e,t){return void 0!==t?t?(this.add(e),!0):(this.remove(e),!1):this.contains(e)?(this.remove(e),!1):(this.add(e),!0)}replace(e,t){this.remove(e),this.add(t)}};m9=new WeakMap,m8=new WeakMap,m6=new WeakMap;var pn=`[mux-player ${pt}]`;function ps(...e){console.warn(pn,...e)}function po(...e){console.error(pn,...e)}function pl(e){var t;let i=null!=(t=e.message)?t:"";e.context&&(i+=` ${e.context}`),e.file&&(i+=` ${ie("Read more: ")}
https://github.com/muxinc/elements/blob/main/errors/${e.file}`),ps(i)}var pd={AUTOPLAY:"autoplay",CROSSORIGIN:"crossorigin",LOOP:"loop",MUTED:"muted",PLAYSINLINE:"playsinline",PRELOAD:"preload"},pu={VOLUME:"volume",PLAYBACKRATE:"playbackrate",MUTED:"muted"},pc=Object.freeze({length:0,start(e){let t=e>>>0;if(t>=this.length)throw new DOMException(`Failed to execute 'start' on 'TimeRanges': The index provided (${t}) is greater than or equal to the maximum bound (${this.length}).`);return 0},end(e){let t=e>>>0;if(t>=this.length)throw new DOMException(`Failed to execute 'end' on 'TimeRanges': The index provided (${t}) is greater than or equal to the maximum bound (${this.length}).`);return 0}}),ph=[...Object.values(pd).filter(e=>pd.PLAYSINLINE!==e),...Object.values(pu)];function pm(e,t){return e.media?e.media.getAttribute(t):e.getAttribute(t)}var pp=class extends m0.HTMLElement{static get observedAttributes(){return ph}constructor(){super()}attributeChangedCallback(e,t,i){var a,r;switch(e){case pu.MUTED:this.media&&(this.media.muted=null!=i,this.media.defaultMuted=null!=i);return;case pu.VOLUME:{let e=null!=(a=m4(i))?a:1;this.media&&(this.media.volume=e);return}case pu.PLAYBACKRATE:{let e=null!=(r=m4(i))?r:1;this.media&&(this.media.playbackRate=e,this.media.defaultPlaybackRate=e);return}}}play(){var e,t;return null!=(t=null==(e=this.media)?void 0:e.play())?t:Promise.reject()}pause(){var e;null==(e=this.media)||e.pause()}load(){var e;null==(e=this.media)||e.load()}get media(){var e;return null==(e=this.shadowRoot)?void 0:e.querySelector("mux-video")}get audioTracks(){return this.media.audioTracks}get videoTracks(){return this.media.videoTracks}get audioRenditions(){return this.media.audioRenditions}get videoRenditions(){return this.media.videoRenditions}get paused(){var e,t;return null==(t=null==(e=this.media)?void 0:e.paused)||t}get duration(){var e,t;return null!=(t=null==(e=this.media)?void 0:e.duration)?t:NaN}get ended(){var e,t;return null!=(t=null==(e=this.media)?void 0:e.ended)&&t}get buffered(){var e,t;return null!=(t=null==(e=this.media)?void 0:e.buffered)?t:pc}get seekable(){var e,t;return null!=(t=null==(e=this.media)?void 0:e.seekable)?t:pc}get readyState(){var e,t;return null!=(t=null==(e=this.media)?void 0:e.readyState)?t:0}get videoWidth(){var e,t;return null!=(t=null==(e=this.media)?void 0:e.videoWidth)?t:0}get videoHeight(){var e,t;return null!=(t=null==(e=this.media)?void 0:e.videoHeight)?t:0}get currentSrc(){var e,t;return null!=(t=null==(e=this.media)?void 0:e.currentSrc)?t:""}get currentTime(){var e,t;return null!=(t=null==(e=this.media)?void 0:e.currentTime)?t:0}set currentTime(e){this.media&&(this.media.currentTime=Number(e))}get volume(){var e,t;return null!=(t=null==(e=this.media)?void 0:e.volume)?t:1}set volume(e){this.media&&(this.media.volume=Number(e))}get playbackRate(){var e,t;return null!=(t=null==(e=this.media)?void 0:e.playbackRate)?t:1}set playbackRate(e){this.media&&(this.media.playbackRate=Number(e))}get defaultPlaybackRate(){var e;return null!=(e=m4(this.getAttribute(pu.PLAYBACKRATE)))?e:1}set defaultPlaybackRate(e){null!=e?this.setAttribute(pu.PLAYBACKRATE,`${e}`):this.removeAttribute(pu.PLAYBACKRATE)}get crossOrigin(){return pm(this,pd.CROSSORIGIN)}set crossOrigin(e){this.setAttribute(pd.CROSSORIGIN,`${e}`)}get autoplay(){return null!=pm(this,pd.AUTOPLAY)}set autoplay(e){e?this.setAttribute(pd.AUTOPLAY,"string"==typeof e?e:""):this.removeAttribute(pd.AUTOPLAY)}get loop(){return null!=pm(this,pd.LOOP)}set loop(e){e?this.setAttribute(pd.LOOP,""):this.removeAttribute(pd.LOOP)}get muted(){var e,t;return null!=(t=null==(e=this.media)?void 0:e.muted)&&t}set muted(e){this.media&&(this.media.muted=!!e)}get defaultMuted(){return null!=pm(this,pd.MUTED)}set defaultMuted(e){e?this.setAttribute(pd.MUTED,""):this.removeAttribute(pd.MUTED)}get playsInline(){return null!=pm(this,pd.PLAYSINLINE)}set playsInline(e){po("playsInline is set to true by default and is not currently supported as a setter.")}get preload(){return this.media?this.media.preload:this.getAttribute("preload")}set preload(e){["","none","metadata","auto"].includes(e)?this.setAttribute(pd.PRELOAD,e):this.removeAttribute(pd.PRELOAD)}},pv=`:host {
  --media-control-display: var(--controls);
  --media-loading-indicator-display: var(--loading-indicator);
  --media-dialog-display: var(--dialog);
  --media-play-button-display: var(--play-button);
  --media-live-button-display: var(--live-button);
  --media-seek-backward-button-display: var(--seek-backward-button);
  --media-seek-forward-button-display: var(--seek-forward-button);
  --media-mute-button-display: var(--mute-button);
  --media-captions-button-display: var(--captions-button);
  --media-captions-menu-button-display: var(--captions-menu-button, var(--media-captions-button-display));
  --media-rendition-menu-button-display: var(--rendition-menu-button);
  --media-audio-track-menu-button-display: var(--audio-track-menu-button);
  --media-airplay-button-display: var(--airplay-button);
  --media-pip-button-display: var(--pip-button);
  --media-fullscreen-button-display: var(--fullscreen-button);
  --media-cast-button-display: var(--cast-button, var(--_cast-button-drm-display));
  --media-playback-rate-button-display: var(--playback-rate-button);
  --media-playback-rate-menu-button-display: var(--playback-rate-menu-button);
  --media-volume-range-display: var(--volume-range);
  --media-time-range-display: var(--time-range);
  --media-time-display-display: var(--time-display);
  --media-duration-display-display: var(--duration-display);
  --media-title-display-display: var(--title-display);

  display: inline-block;
  line-height: 0;
  width: 100%;
}

a {
  color: #fff;
  font-size: 0.9em;
  text-decoration: underline;
}

media-theme {
  display: inline-block;
  line-height: 0;
  width: 100%;
  height: 100%;
  direction: ltr;
}

media-poster-image {
  display: inline-block;
  line-height: 0;
  width: 100%;
  height: 100%;
}

media-poster-image:not([src]):not([placeholdersrc]) {
  display: none;
}

::part(top),
[part~='top'] {
  --media-control-display: var(--controls, var(--top-controls));
  --media-play-button-display: var(--play-button, var(--top-play-button));
  --media-live-button-display: var(--live-button, var(--top-live-button));
  --media-seek-backward-button-display: var(--seek-backward-button, var(--top-seek-backward-button));
  --media-seek-forward-button-display: var(--seek-forward-button, var(--top-seek-forward-button));
  --media-mute-button-display: var(--mute-button, var(--top-mute-button));
  --media-captions-button-display: var(--captions-button, var(--top-captions-button));
  --media-captions-menu-button-display: var(
    --captions-menu-button,
    var(--media-captions-button-display, var(--top-captions-menu-button))
  );
  --media-rendition-menu-button-display: var(--rendition-menu-button, var(--top-rendition-menu-button));
  --media-audio-track-menu-button-display: var(--audio-track-menu-button, var(--top-audio-track-menu-button));
  --media-airplay-button-display: var(--airplay-button, var(--top-airplay-button));
  --media-pip-button-display: var(--pip-button, var(--top-pip-button));
  --media-fullscreen-button-display: var(--fullscreen-button, var(--top-fullscreen-button));
  --media-cast-button-display: var(--cast-button, var(--top-cast-button, var(--_cast-button-drm-display)));
  --media-playback-rate-button-display: var(--playback-rate-button, var(--top-playback-rate-button));
  --media-playback-rate-menu-button-display: var(
    --captions-menu-button,
    var(--media-playback-rate-button-display, var(--top-playback-rate-menu-button))
  );
  --media-volume-range-display: var(--volume-range, var(--top-volume-range));
  --media-time-range-display: var(--time-range, var(--top-time-range));
  --media-time-display-display: var(--time-display, var(--top-time-display));
  --media-duration-display-display: var(--duration-display, var(--top-duration-display));
  --media-title-display-display: var(--title-display, var(--top-title-display));
}

::part(center),
[part~='center'] {
  --media-control-display: var(--controls, var(--center-controls));
  --media-play-button-display: var(--play-button, var(--center-play-button));
  --media-live-button-display: var(--live-button, var(--center-live-button));
  --media-seek-backward-button-display: var(--seek-backward-button, var(--center-seek-backward-button));
  --media-seek-forward-button-display: var(--seek-forward-button, var(--center-seek-forward-button));
  --media-mute-button-display: var(--mute-button, var(--center-mute-button));
  --media-captions-button-display: var(--captions-button, var(--center-captions-button));
  --media-captions-menu-button-display: var(
    --captions-menu-button,
    var(--media-captions-button-display, var(--center-captions-menu-button))
  );
  --media-rendition-menu-button-display: var(--rendition-menu-button, var(--center-rendition-menu-button));
  --media-audio-track-menu-button-display: var(--audio-track-menu-button, var(--center-audio-track-menu-button));
  --media-airplay-button-display: var(--airplay-button, var(--center-airplay-button));
  --media-pip-button-display: var(--pip-button, var(--center-pip-button));
  --media-fullscreen-button-display: var(--fullscreen-button, var(--center-fullscreen-button));
  --media-cast-button-display: var(--cast-button, var(--center-cast-button, var(--_cast-button-drm-display)));
  --media-playback-rate-button-display: var(--playback-rate-button, var(--center-playback-rate-button));
  --media-playback-rate-menu-button-display: var(
    --playback-rate-menu-button,
    var(--media-playback-rate-button-display, var(--center-playback-rate-menu-button))
  );
  --media-volume-range-display: var(--volume-range, var(--center-volume-range));
  --media-time-range-display: var(--time-range, var(--center-time-range));
  --media-time-display-display: var(--time-display, var(--center-time-display));
  --media-duration-display-display: var(--duration-display, var(--center-duration-display));
}

::part(bottom),
[part~='bottom'] {
  --media-control-display: var(--controls, var(--bottom-controls));
  --media-play-button-display: var(--play-button, var(--bottom-play-button));
  --media-live-button-display: var(--live-button, var(--bottom-live-button));
  --media-seek-backward-button-display: var(--seek-backward-button, var(--bottom-seek-backward-button));
  --media-seek-forward-button-display: var(--seek-forward-button, var(--bottom-seek-forward-button));
  --media-mute-button-display: var(--mute-button, var(--bottom-mute-button));
  --media-captions-button-display: var(--captions-button, var(--bottom-captions-button));
  --media-captions-menu-button-display: var(
    --captions-menu-button,
    var(--media-captions-button-display, var(--bottom-captions-menu-button))
  );
  --media-rendition-menu-button-display: var(--rendition-menu-button, var(--bottom-rendition-menu-button));
  --media-audio-track-menu-button-display: var(--audio-track-menu-button, var(--bottom-audio-track-menu-button));
  --media-airplay-button-display: var(--airplay-button, var(--bottom-airplay-button));
  --media-pip-button-display: var(--pip-button, var(--bottom-pip-button));
  --media-fullscreen-button-display: var(--fullscreen-button, var(--bottom-fullscreen-button));
  --media-cast-button-display: var(--cast-button, var(--bottom-cast-button, var(--_cast-button-drm-display)));
  --media-playback-rate-button-display: var(--playback-rate-button, var(--bottom-playback-rate-button));
  --media-playback-rate-menu-button-display: var(
    --playback-rate-menu-button,
    var(--media-playback-rate-button-display, var(--bottom-playback-rate-menu-button))
  );
  --media-volume-range-display: var(--volume-range, var(--bottom-volume-range));
  --media-time-range-display: var(--time-range, var(--bottom-time-range));
  --media-time-display-display: var(--time-display, var(--bottom-time-display));
  --media-duration-display-display: var(--duration-display, var(--bottom-duration-display));
  --media-title-display-display: var(--title-display, var(--bottom-title-display));
}

:host([no-tooltips]) {
  --media-tooltip-display: none;
}
`,pE=new WeakMap,pb=class e{constructor(e,t){this.element=e,this.type=t,this.element.addEventListener(this.type,this);let i=pE.get(this.element);i&&i.set(this.type,this)}set(e){if("function"==typeof e)this.handleEvent=e.bind(this.element);else if("object"==typeof e&&"function"==typeof e.handleEvent)this.handleEvent=e.handleEvent.bind(e);else{this.element.removeEventListener(this.type,this);let e=pE.get(this.element);e&&e.delete(this.type)}}static for(t){pE.has(t.element)||pE.set(t.element,new Map);let i=t.attributeName.slice(2),a=pE.get(t.element);return a&&a.has(i)?a.get(i):new e(t.element,i)}},pg=new Map,pf=new WeakMap,p_=new WeakMap,py=class{constructor(e,t,i){this.strings=e,this.values=t,this.processor=i,this.stringsKey=this.strings.join("\x01")}get template(){if(pg.has(this.stringsKey))return pg.get(this.stringsKey);{let e=m1.createElement("template"),t=this.strings.length-1;return e.innerHTML=this.strings.reduce((e,i,a)=>e+i+(a<t?`{{ ${a} }}`:""),""),pg.set(this.stringsKey,e),e}}renderInto(e){var t;let i=this.template;if(pf.get(e)!==i){pf.set(e,i);let t=new li(i,this.values,this.processor);p_.set(e,t),e instanceof lu?e.replace(...t.children):e.appendChild(t);return}let a=p_.get(e);null==(t=null==a?void 0:a.update)||t.call(a,this.values)}},pT={processCallback(e,t,i){var a;if(i)for(let[e,r]of t)e in i&&function(e,t){(function(e,t){if(e instanceof ld&&t instanceof Element){let i=e.element;return i[e.attributeName]!==t&&(e.element.removeAttributeNS(e.attributeNamespace,e.attributeName),i[e.attributeName]=t),!0}return!1})(e,t)||function(e,t){if("boolean"==typeof t&&e instanceof ld){let i=e.attributeNamespace;return t!==e.element.hasAttributeNS(i,e.attributeName)&&(e.booleanValue=t),!0}return!1}(e,t)||e instanceof ld&&e.attributeName.startsWith("on")&&(pb.for(e).set(t),e.element.removeAttributeNS(e.attributeNamespace,e.attributeName),1)||!1===t&&e instanceof lu&&(e.replace(""),1)||t instanceof py&&e instanceof lu&&(t.renderInto(e),1)||t instanceof DocumentFragment&&e instanceof lu&&(t.childNodes.length&&e.replace(...t.childNodes),1)||function(e,t){if(e instanceof ld){let i=e.attributeNamespace,a=e.element.getAttributeNS(i,e.attributeName);return String(t)!==a&&(e.value=String(t))}e.value=String(t)}(e,t)}(r,null!=(a=i[e])?a:"")}};function pA(e,...t){return new py(e,t,pT)}var pk=Object.values({TOP:"top",CENTER:"center",BOTTOM:"bottom",LAYER:"layer",MEDIA_LAYER:"media-layer",POSTER_LAYER:"poster-layer",VERTICAL_LAYER:"vertical-layer",CENTERED_LAYER:"centered-layer",GESTURE_LAYER:"gesture-layer",CONTROLLER_LAYER:"controller",BUTTON:"button",RANGE:"range",THUMB:"thumb",DISPLAY:"display",CONTROL_BAR:"control-bar",MENU_BUTTON:"menu-button",MENU:"menu",MENU_ITEM:"menu-item",OPTION:"option",POSTER:"poster",LIVE:"live",PLAY:"play",PRE_PLAY:"pre-play",SEEK_BACKWARD:"seek-backward",SEEK_FORWARD:"seek-forward",MUTE:"mute",CAPTIONS:"captions",AIRPLAY:"airplay",PIP:"pip",FULLSCREEN:"fullscreen",CAST:"cast",PLAYBACK_RATE:"playback-rate",VOLUME:"volume",TIME:"time",TITLE:"title",AUDIO_TRACK:"audio-track",RENDITION:"rendition"}).join(", "),pw=e=>e.charAt(0).toUpperCase()+e.slice(1),pS=(e,t)=>{let i=(e=>{if(e.muxCode){if(e.muxCode===tH.NETWORK_TOKEN_EXPIRED)return"403-expired-token.md";if(e.muxCode===tH.NETWORK_TOKEN_MALFORMED)return"403-malformatted-token.md";if([tH.NETWORK_TOKEN_AUD_MISMATCH,tH.NETWORK_TOKEN_AUD_MISSING].includes(e.muxCode))return"403-incorrect-aud-value.md";if(e.muxCode===tH.NETWORK_TOKEN_SUB_MISMATCH)return"403-playback-id-mismatch.md";if(e.muxCode===tH.NETWORK_TOKEN_MISSING)return"missing-signed-tokens.md";if(e.muxCode===tH.NETWORK_NOT_FOUND)return"404-not-found.md";if(e.muxCode===tH.NETWORK_NOT_READY)return"412-not-playable.md"}if(e.code){if(e.code===tF.MEDIA_ERR_NETWORK)return"";if(e.code===tF.MEDIA_ERR_DECODE)return"media-decode-error.md";if(e.code===tF.MEDIA_ERR_SRC_NOT_SUPPORTED)return"media-src-not-supported.md"}return""})(e);return{message:e.message,context:e.context,file:i}},pI=`<template id="media-theme-gerwig">
  <style>
    @keyframes pre-play-hide {
      0% {
        transform: scale(1);
        opacity: 1;
      }

      30% {
        transform: scale(0.7);
      }

      100% {
        transform: scale(1.5);
        opacity: 0;
      }
    }

    :host {
      --_primary-color: var(--media-primary-color, #fff);
      --_secondary-color: var(--media-secondary-color, transparent);
      --_accent-color: var(--media-accent-color, #fa50b5);
      --_text-color: var(--media-text-color, #000);

      --media-icon-color: var(--_primary-color);
      --media-control-background: var(--_secondary-color);
      --media-control-hover-background: var(--_accent-color);
      --media-time-buffered-color: rgba(255, 255, 255, 0.4);
      --media-preview-time-text-shadow: none;
      --media-control-height: 14px;
      --media-control-padding: 6px;
      --media-tooltip-container-margin: 6px;
      --media-tooltip-distance: 18px;

      color: var(--_primary-color);
      display: inline-block;
      width: 100%;
      height: 100%;
    }

    :host([audio]) {
      --_secondary-color: var(--media-secondary-color, black);
      --media-preview-time-text-shadow: none;
    }

    :host([audio]) ::slotted([slot='media']) {
      height: 0px;
    }

    :host([audio]) media-loading-indicator {
      display: none;
    }

    :host([audio]) media-controller {
      background: transparent;
    }

    :host([audio]) media-controller::part(vertical-layer) {
      background: transparent;
    }

    :host([audio]) media-control-bar {
      width: 100%;
      background-color: var(--media-control-background);
    }

    /*
     * 0.433s is the transition duration for VTT Regions.
     * Borrowed here, so the captions don't move too fast.
     */
    media-controller {
      --media-webkit-text-track-transform: translateY(0) scale(0.98);
      --media-webkit-text-track-transition: transform 0.433s ease-out 0.3s;
    }
    media-controller:is([mediapaused], :not([userinactive])) {
      --media-webkit-text-track-transform: translateY(-50px) scale(0.98);
      --media-webkit-text-track-transition: transform 0.15s ease;
    }

    /*
     * CSS specific to iOS devices.
     * See: https://stackoverflow.com/questions/30102792/css-media-query-to-target-only-ios-devices/60220757#60220757
     */
    @supports (-webkit-touch-callout: none) {
      /* Disable subtitle adjusting for iOS Safari */
      media-controller[mediaisfullscreen] {
        --media-webkit-text-track-transform: unset;
        --media-webkit-text-track-transition: unset;
      }
    }

    media-time-range {
      --media-box-padding-left: 6px;
      --media-box-padding-right: 6px;
      --media-range-bar-color: var(--_accent-color);
      --media-time-range-buffered-color: var(--_primary-color);
      --media-range-track-color: transparent;
      --media-range-track-background: rgba(255, 255, 255, 0.4);
      --media-range-thumb-background: radial-gradient(
        circle,
        #000 0%,
        #000 25%,
        var(--_accent-color) 25%,
        var(--_accent-color)
      );
      --media-range-thumb-width: 12px;
      --media-range-thumb-height: 12px;
      --media-range-thumb-transform: scale(0);
      --media-range-thumb-transition: transform 0.3s;
      --media-range-thumb-opacity: 1;
      --media-preview-background: var(--_primary-color);
      --media-box-arrow-background: var(--_primary-color);
      --media-preview-thumbnail-border: 5px solid var(--_primary-color);
      --media-preview-border-radius: 5px;
      --media-text-color: var(--_text-color);
      --media-control-hover-background: transparent;
      --media-preview-chapter-text-shadow: none;
      color: var(--_accent-color);
      padding: 0 6px;
    }

    :host([audio]) media-time-range {
      --media-preview-time-padding: 1.5px 6px;
      --media-preview-box-margin: 0 0 -5px;
    }

    media-time-range:hover {
      --media-range-thumb-transform: scale(1);
    }

    media-preview-thumbnail {
      border-bottom-width: 0;
    }

    [part~='menu'] {
      border-radius: 2px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      bottom: 50px;
      padding: 2.5px 10px;
    }

    [part~='menu']::part(indicator) {
      fill: var(--_accent-color);
    }

    [part~='menu']::part(menu-item) {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: 6px 10px;
      min-height: 34px;
    }

    [part~='menu']::part(checked) {
      font-weight: 700;
    }

    media-captions-menu,
    media-rendition-menu,
    media-audio-track-menu,
    media-playback-rate-menu {
      position: absolute; /* ensure they don't take up space in DOM on load */
      --media-menu-background: var(--_primary-color);
      --media-menu-item-checked-background: transparent;
      --media-text-color: var(--_text-color);
      --media-menu-item-hover-background: transparent;
      --media-menu-item-hover-outline: var(--_accent-color) solid 1px;
    }

    media-rendition-menu {
      min-width: 140px;
    }

    /* The icon is a circle so make it 16px high instead of 14px for more balance. */
    media-audio-track-menu-button {
      --media-control-padding: 5px;
      --media-control-height: 16px;
    }

    media-playback-rate-menu-button {
      --media-control-padding: 6px 3px;
      min-width: 4.4ch;
    }

    media-playback-rate-menu {
      --media-menu-flex-direction: row;
      --media-menu-item-checked-background: var(--_accent-color);
      --media-menu-item-checked-indicator-display: none;
      margin-right: 6px;
      padding: 0;
      --media-menu-gap: 0.25em;
    }

    media-playback-rate-menu[part~='menu']::part(menu-item) {
      padding: 6px 6px 6px 8px;
    }

    media-playback-rate-menu[part~='menu']::part(checked) {
      color: #fff;
    }

    :host(:not([audio])) media-time-range {
      /* Adding px is required here for calc() */
      --media-range-padding: 0px;
      background: transparent;
      z-index: 10;
      height: 10px;
      bottom: -3px;
      width: 100%;
    }

    media-control-bar :is([role='button'], [role='switch'], button) {
      line-height: 0;
    }

    media-control-bar :is([part*='button'], [part*='range'], [part*='display']) {
      border-radius: 3px;
    }

    .spacer {
      flex-grow: 1;
      background-color: var(--media-control-background, rgba(20, 20, 30, 0.7));
    }

    media-control-bar[slot~='top-chrome'] {
      min-height: 42px;
      pointer-events: none;
    }

    media-control-bar {
      --gradient-steps:
        hsl(0 0% 0% / 0) 0%, hsl(0 0% 0% / 0.013) 8.1%, hsl(0 0% 0% / 0.049) 15.5%, hsl(0 0% 0% / 0.104) 22.5%,
        hsl(0 0% 0% / 0.175) 29%, hsl(0 0% 0% / 0.259) 35.3%, hsl(0 0% 0% / 0.352) 41.2%, hsl(0 0% 0% / 0.45) 47.1%,
        hsl(0 0% 0% / 0.55) 52.9%, hsl(0 0% 0% / 0.648) 58.8%, hsl(0 0% 0% / 0.741) 64.7%, hsl(0 0% 0% / 0.825) 71%,
        hsl(0 0% 0% / 0.896) 77.5%, hsl(0 0% 0% / 0.951) 84.5%, hsl(0 0% 0% / 0.987) 91.9%, hsl(0 0% 0%) 100%;
    }

    :host([title]) media-control-bar[slot='top-chrome']::before,
    :host([videotitle]) media-control-bar[slot='top-chrome']::before {
      content: '';
      position: absolute;
      width: 100%;
      padding-bottom: min(100px, 25%);
      background: linear-gradient(to top, var(--gradient-steps));
      opacity: 0.8;
      pointer-events: none;
    }

    :host(:not([audio])) media-control-bar[part~='bottom']::before {
      content: '';
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      padding-bottom: min(100px, 25%);
      background: linear-gradient(to bottom, var(--gradient-steps));
      opacity: 0.8;
      z-index: 1;
      pointer-events: none;
    }

    media-control-bar[part~='bottom'] > * {
      z-index: 20;
    }

    media-control-bar[part~='bottom'] {
      padding: 6px 6px;
    }

    media-control-bar[slot~='top-chrome'] > * {
      --media-control-background: transparent;
      --media-control-hover-background: transparent;
      position: relative;
    }

    media-controller::part(vertical-layer) {
      transition: background-color 1s;
    }

    media-controller:is([mediapaused], :not([userinactive]))::part(vertical-layer) {
      background-color: var(--controls-backdrop-color, var(--controls, transparent));
      transition: background-color 0.25s;
    }

    .center-controls {
      --media-button-icon-width: 100%;
      --media-button-icon-height: auto;
      --media-tooltip-display: none;
      pointer-events: none;
      width: 100%;
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: center;
      paint-order: stroke;
      stroke: rgba(102, 102, 102, 1);
      stroke-width: 0.3px;
      text-shadow:
        0 0 2px rgb(0 0 0 / 0.25),
        0 0 6px rgb(0 0 0 / 0.25);
    }

    .center-controls media-play-button {
      --media-control-background: transparent;
      --media-control-hover-background: transparent;
      --media-control-padding: 0;
      width: 40px;
      filter: drop-shadow(0 0 2px rgb(0 0 0 / 0.25)) drop-shadow(0 0 6px rgb(0 0 0 / 0.25));
    }

    [breakpointsm] .center-controls media-play-button {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      transition: background 0.4s;
      padding: 24px;
      --media-control-background: #000;
      --media-control-hover-background: var(--_accent-color);
    }

    .center-controls media-seek-backward-button,
    .center-controls media-seek-forward-button {
      --media-control-background: transparent;
      --media-control-hover-background: transparent;
      padding: 0;
      margin: 0 20px;
      width: max(33px, min(8%, 40px));
      text-shadow:
        0 0 2px rgb(0 0 0 / 0.25),
        0 0 6px rgb(0 0 0 / 0.25);
    }

    [breakpointsm]:not([audio]) .center-controls.pre-playback {
      display: grid;
      align-items: initial;
      justify-content: initial;
      height: 100%;
      overflow: hidden;
    }

    [breakpointsm]:not([audio]) .center-controls.pre-playback media-play-button {
      place-self: var(--_pre-playback-place, center);
      grid-area: 1 / 1;
      margin: 16px;
    }

    /* Show and hide controls or pre-playback state */

    [breakpointsm]:is([mediahasplayed], :not([mediapaused])):not([audio])
      .center-controls.pre-playback
      media-play-button {
      /* Using \`forwards\` would lead to a laggy UI after the animation got in the end state */
      animation: 0.3s linear pre-play-hide;
      opacity: 0;
      pointer-events: none;
    }

    .autoplay-unmute {
      --media-control-hover-background: transparent;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 0 2px rgb(0 0 0 / 0.25)) drop-shadow(0 0 6px rgb(0 0 0 / 0.25));
    }

    .autoplay-unmute-btn {
      --media-control-height: 16px;
      border-radius: 8px;
      background: #000;
      color: var(--_primary-color);
      display: flex;
      align-items: center;
      padding: 8px 16px;
      font-size: 18px;
      font-weight: 500;
      cursor: pointer;
    }

    .autoplay-unmute-btn:hover {
      background: var(--_accent-color);
    }

    [breakpointsm] .autoplay-unmute-btn {
      --media-control-height: 30px;
      padding: 14px 24px;
      font-size: 26px;
    }

    .autoplay-unmute-btn svg {
      margin: 0 6px 0 0;
    }

    [breakpointsm] .autoplay-unmute-btn svg {
      margin: 0 10px 0 0;
    }

    media-controller:not([audio]):not([mediahasplayed]) *:is(media-control-bar, media-time-range) {
      display: none;
    }

    media-error-dialog:not([mediaerrorcode]) {
      opacity: 0;
    }

    media-loading-indicator {
      --media-loading-icon-width: 100%;
      --media-button-icon-height: auto;
      display: var(--media-control-display, var(--media-loading-indicator-display, flex));
      pointer-events: none;
      position: absolute;
      width: min(15%, 150px);
      flex-flow: row;
      align-items: center;
      justify-content: center;
    }

    /* Intentionally don't target the div for transition but the children
     of the div. Prevents messing with media-chrome's autohide feature. */
    media-loading-indicator + div * {
      transition: opacity 0.15s;
      opacity: 1;
    }

    media-loading-indicator[medialoading]:not([mediapaused]) ~ div > * {
      opacity: 0;
      transition-delay: 400ms;
    }

    media-volume-range {
      width: min(100%, 100px);
      --media-range-padding-left: 10px;
      --media-range-padding-right: 10px;
      --media-range-thumb-width: 12px;
      --media-range-thumb-height: 12px;
      --media-range-thumb-background: radial-gradient(
        circle,
        #000 0%,
        #000 25%,
        var(--_primary-color) 25%,
        var(--_primary-color)
      );
      --media-control-hover-background: none;
    }

    media-time-display {
      white-space: nowrap;
    }

    /* Generic style for explicitly disabled controls */
    media-control-bar[part~='bottom'] [disabled],
    media-control-bar[part~='bottom'] [aria-disabled='true'] {
      opacity: 60%;
      cursor: not-allowed;
    }

    media-text-display {
      --media-font-size: 16px;
      --media-control-padding: 14px;
      font-weight: 500;
    }

    media-play-button.animated *:is(g, path) {
      transition: all 0.3s;
    }

    media-play-button.animated[mediapaused] .pause-icon-pt1 {
      opacity: 0;
    }

    media-play-button.animated[mediapaused] .pause-icon-pt2 {
      transform-origin: center center;
      transform: scaleY(0);
    }

    media-play-button.animated[mediapaused] .play-icon {
      clip-path: inset(0 0 0 0);
    }

    media-play-button.animated:not([mediapaused]) .play-icon {
      clip-path: inset(0 0 0 100%);
    }

    media-seek-forward-button,
    media-seek-backward-button {
      --media-font-weight: 400;
    }

    .mute-icon {
      display: inline-block;
    }

    .mute-icon :is(path, g) {
      transition: opacity 0.5s;
    }

    .muted {
      opacity: 0;
    }

    media-mute-button[mediavolumelevel='low'] :is(.volume-medium, .volume-high),
    media-mute-button[mediavolumelevel='medium'] :is(.volume-high) {
      opacity: 0;
    }

    media-mute-button[mediavolumelevel='off'] .unmuted {
      opacity: 0;
    }

    media-mute-button[mediavolumelevel='off'] .muted {
      opacity: 1;
    }

    /**
     * Our defaults for these buttons are to hide them at small sizes
     * users can override this with CSS
     */
    media-controller:not([breakpointsm]):not([audio]) {
      --bottom-play-button: none;
      --bottom-seek-backward-button: none;
      --bottom-seek-forward-button: none;
      --bottom-time-display: none;
      --bottom-playback-rate-menu-button: none;
      --bottom-pip-button: none;
    }

    [part='mux-badge'] {
      position: absolute;
      bottom: 10px;
      right: 10px;
      z-index: 2;
      opacity: 0.6;
      transition:
        opacity 0.2s ease-in-out,
        bottom 0.2s ease-in-out;
    }

    [part='mux-badge']:hover {
      opacity: 1;
    }

    [part='mux-badge'] a {
      font-size: 14px;
      font-family: var(--_font-family);
      color: var(--_primary-color);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    [part='mux-badge'] .mux-badge-text {
      transition: opacity 0.5s ease-in-out;
      opacity: 0;
    }

    [part='mux-badge'] .mux-badge-logo {
      width: 40px;
      height: auto;
      display: inline-block;
    }

    [part='mux-badge'] .mux-badge-logo svg {
      width: 100%;
      height: 100%;
      fill: white;
    }

    media-controller:not([userinactive]):not([mediahasplayed]) [part='mux-badge'],
    media-controller:not([userinactive]) [part='mux-badge'],
    media-controller[mediahasplayed][mediapaused] [part='mux-badge'] {
      transition: bottom 0.1s ease-in-out;
    }

    media-controller[userinactive]:not([mediapaused]) [part='mux-badge'] {
      transition: bottom 0.2s ease-in-out 0.62s;
    }

    media-controller:not([userinactive]) [part='mux-badge'] .mux-badge-text,
    media-controller[mediahasplayed][mediapaused] [part='mux-badge'] .mux-badge-text {
      opacity: 1;
    }

    media-controller[userinactive]:not([mediapaused]) [part='mux-badge'] .mux-badge-text {
      opacity: 0;
    }

    media-controller[userinactive]:not([mediapaused]) [part='mux-badge'] {
      bottom: 10px;
    }

    media-controller:not([userinactive]):not([mediahasplayed]) [part='mux-badge'] {
      bottom: 10px;
    }

    media-controller:not([userinactive])[mediahasplayed] [part='mux-badge'],
    media-controller[mediahasplayed][mediapaused] [part='mux-badge'] {
      bottom: calc(28px + var(--media-control-height, 0px) + var(--media-control-padding, 0px) * 2);
    }
  </style>

  <template partial="TitleDisplay">
    <template if="videotitle">
      <template if="videotitle != true">
        <media-text-display part="top title display" class="title-display">{{videotitle}}</media-text-display>
      </template>
    </template>
    <template if="!videotitle">
      <template if="title">
        <media-text-display part="top title display" class="title-display">{{title}}</media-text-display>
      </template>
    </template>
  </template>

  <template partial="PlayButton">
    <media-play-button
      part="{{section ?? 'bottom'}} play button"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
      class="animated"
    >
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="icon">
        <g class="play-icon">
          <path
            d="M15.5987 6.2911L3.45577 0.110898C2.83667 -0.204202 2.06287 0.189698 2.06287 0.819798V13.1802C2.06287 13.8103 2.83667 14.2042 3.45577 13.8891L15.5987 7.7089C16.2178 7.3938 16.2178 6.6061 15.5987 6.2911Z"
          />
        </g>
        <g class="pause-icon">
          <path
            class="pause-icon-pt1"
            d="M5.90709 0H2.96889C2.46857 0 2.06299 0.405585 2.06299 0.9059V13.0941C2.06299 13.5944 2.46857 14 2.96889 14H5.90709C6.4074 14 6.81299 13.5944 6.81299 13.0941V0.9059C6.81299 0.405585 6.4074 0 5.90709 0Z"
          />
          <path
            class="pause-icon-pt2"
            d="M15.1571 0H12.2189C11.7186 0 11.313 0.405585 11.313 0.9059V13.0941C11.313 13.5944 11.7186 14 12.2189 14H15.1571C15.6574 14 16.063 13.5944 16.063 13.0941V0.9059C16.063 0.405585 15.6574 0 15.1571 0Z"
          />
        </g>
      </svg>
    </media-play-button>
  </template>

  <template partial="PrePlayButton">
    <media-play-button
      part="{{section ?? 'center'}} play button pre-play"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="icon" style="transform: translate(3px, 0)">
        <path
          d="M15.5987 6.2911L3.45577 0.110898C2.83667 -0.204202 2.06287 0.189698 2.06287 0.819798V13.1802C2.06287 13.8103 2.83667 14.2042 3.45577 13.8891L15.5987 7.7089C16.2178 7.3938 16.2178 6.6061 15.5987 6.2911Z"
        />
      </svg>
    </media-play-button>
  </template>

  <template partial="SeekBackwardButton">
    <media-seek-backward-button
      seekoffset="{{backwardseekoffset}}"
      part="{{section ?? 'bottom'}} seek-backward button"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <svg viewBox="0 0 22 14" aria-hidden="true" slot="icon">
        <path
          d="M3.65 2.07888L0.0864 6.7279C-0.0288 6.87812 -0.0288 7.12188 0.0864 7.2721L3.65 11.9211C3.7792 12.0896 4 11.9703 4 11.7321V2.26787C4 2.02968 3.7792 1.9104 3.65 2.07888Z"
        />
        <text transform="translate(6 12)" style="font-size: 14px; font-family: 'ArialMT', 'Arial'">
          {{backwardseekoffset}}
        </text>
      </svg>
    </media-seek-backward-button>
  </template>

  <template partial="SeekForwardButton">
    <media-seek-forward-button
      seekoffset="{{forwardseekoffset}}"
      part="{{section ?? 'bottom'}} seek-forward button"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <svg viewBox="0 0 22 14" aria-hidden="true" slot="icon">
        <g>
          <text transform="translate(-1 12)" style="font-size: 14px; font-family: 'ArialMT', 'Arial'">
            {{forwardseekoffset}}
          </text>
          <path
            d="M18.35 11.9211L21.9136 7.2721C22.0288 7.12188 22.0288 6.87812 21.9136 6.7279L18.35 2.07888C18.2208 1.91041 18 2.02968 18 2.26787V11.7321C18 11.9703 18.2208 12.0896 18.35 11.9211Z"
          />
        </g>
      </svg>
    </media-seek-forward-button>
  </template>

  <template partial="MuteButton">
    <media-mute-button part="bottom mute button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" slot="icon" class="mute-icon" aria-hidden="true">
        <g class="unmuted">
          <path
            d="M6.76786 1.21233L3.98606 3.98924H1.19937C0.593146 3.98924 0.101743 4.51375 0.101743 5.1607V6.96412L0 6.99998L0.101743 7.03583V8.83926C0.101743 9.48633 0.593146 10.0108 1.19937 10.0108H3.98606L6.76773 12.7877C7.23561 13.2547 8 12.9007 8 12.2171V1.78301C8 1.09925 7.23574 0.745258 6.76786 1.21233Z"
          />
          <path
            class="volume-low"
            d="M10 3.54781C10.7452 4.55141 11.1393 5.74511 11.1393 6.99991C11.1393 8.25471 10.7453 9.44791 10 10.4515L10.7988 11.0496C11.6734 9.87201 12.1356 8.47161 12.1356 6.99991C12.1356 5.52821 11.6735 4.12731 10.7988 2.94971L10 3.54781Z"
          />
          <path
            class="volume-medium"
            d="M12.3778 2.40086C13.2709 3.76756 13.7428 5.35806 13.7428 7.00026C13.7428 8.64246 13.2709 10.233 12.3778 11.5992L13.2106 12.1484C14.2107 10.6185 14.739 8.83796 14.739 7.00016C14.739 5.16236 14.2107 3.38236 13.2106 1.85156L12.3778 2.40086Z"
          />
          <path
            class="volume-high"
            d="M15.5981 0.75L14.7478 1.2719C15.7937 2.9919 16.3468 4.9723 16.3468 7C16.3468 9.0277 15.7937 11.0082 14.7478 12.7281L15.5981 13.25C16.7398 11.3722 17.343 9.211 17.343 7C17.343 4.789 16.7398 2.6268 15.5981 0.75Z"
          />
        </g>
        <g class="muted">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.39976 4.98924H1.19937C1.19429 4.98924 1.17777 4.98961 1.15296 5.01609C1.1271 5.04369 1.10174 5.09245 1.10174 5.1607V8.83926C1.10174 8.90761 1.12714 8.95641 1.15299 8.984C1.17779 9.01047 1.1943 9.01084 1.19937 9.01084H4.39977L7 11.6066V2.39357L4.39976 4.98924ZM7.47434 1.92006C7.4743 1.9201 7.47439 1.92002 7.47434 1.92006V1.92006ZM6.76773 12.7877L3.98606 10.0108H1.19937C0.593146 10.0108 0.101743 9.48633 0.101743 8.83926V7.03583L0 6.99998L0.101743 6.96412V5.1607C0.101743 4.51375 0.593146 3.98924 1.19937 3.98924H3.98606L6.76786 1.21233C7.23574 0.745258 8 1.09925 8 1.78301V12.2171C8 12.9007 7.23561 13.2547 6.76773 12.7877Z"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.2677 9.30323C15.463 9.49849 15.7796 9.49849 15.9749 9.30323C16.1701 9.10796 16.1701 8.79138 15.9749 8.59612L14.2071 6.82841L15.9749 5.06066C16.1702 4.8654 16.1702 4.54882 15.9749 4.35355C15.7796 4.15829 15.4631 4.15829 15.2678 4.35355L13.5 6.1213L11.7322 4.35348C11.537 4.15822 11.2204 4.15822 11.0251 4.35348C10.8298 4.54874 10.8298 4.86532 11.0251 5.06058L12.7929 6.82841L11.0251 8.59619C10.8299 8.79146 10.8299 9.10804 11.0251 9.3033C11.2204 9.49856 11.537 9.49856 11.7323 9.3033L13.5 7.53552L15.2677 9.30323Z"
          />
        </g>
      </svg>
    </media-mute-button>
  </template>

  <template partial="PipButton">
    <media-pip-button part="bottom pip button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="icon">
        <path
          d="M15.9891 0H2.011C0.9004 0 0 0.9003 0 2.0109V11.989C0 13.0996 0.9004 14 2.011 14H15.9891C17.0997 14 18 13.0997 18 11.9891V2.0109C18 0.9003 17.0997 0 15.9891 0ZM17 11.9891C17 12.5465 16.5465 13 15.9891 13H2.011C1.4536 13 1.0001 12.5465 1.0001 11.9891V2.0109C1.0001 1.4535 1.4536 0.9999 2.011 0.9999H15.9891C16.5465 0.9999 17 1.4535 17 2.0109V11.9891Z"
        />
        <path
          d="M15.356 5.67822H8.19523C8.03253 5.67822 7.90063 5.81012 7.90063 5.97282V11.3836C7.90063 11.5463 8.03253 11.6782 8.19523 11.6782H15.356C15.5187 11.6782 15.6506 11.5463 15.6506 11.3836V5.97282C15.6506 5.81012 15.5187 5.67822 15.356 5.67822Z"
        />
      </svg>
    </media-pip-button>
  </template>

  <template partial="CaptionsMenu">
    <media-captions-menu-button part="bottom captions button">
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="on">
        <path
          d="M15.989 0H2.011C0.9004 0 0 0.9003 0 2.0109V11.9891C0 13.0997 0.9004 14 2.011 14H15.989C17.0997 14 18 13.0997 18 11.9891V2.0109C18 0.9003 17.0997 0 15.989 0ZM4.2292 8.7639C4.5954 9.1902 5.0935 9.4031 5.7233 9.4031C6.1852 9.4031 6.5544 9.301 6.8302 9.0969C7.1061 8.8933 7.2863 8.614 7.3702 8.26H8.4322C8.3062 8.884 8.0093 9.3733 7.5411 9.7273C7.0733 10.0813 6.4703 10.2581 5.732 10.2581C5.108 10.2581 4.5699 10.1219 4.1168 9.8489C3.6637 9.5759 3.3141 9.1946 3.0685 8.7058C2.8224 8.2165 2.6994 7.6511 2.6994 7.009C2.6994 6.3611 2.8224 5.7927 3.0685 5.3034C3.3141 4.8146 3.6637 4.4323 4.1168 4.1559C4.5699 3.88 5.108 3.7418 5.732 3.7418C6.4703 3.7418 7.0733 3.922 7.5411 4.2818C8.0094 4.6422 8.3062 5.1461 8.4322 5.794H7.3702C7.2862 5.4283 7.106 5.1368 6.8302 4.921C6.5544 4.7052 6.1852 4.5968 5.7233 4.5968C5.0934 4.5968 4.5954 4.8116 4.2292 5.2404C3.8635 5.6696 3.6804 6.259 3.6804 7.009C3.6804 7.7531 3.8635 8.3381 4.2292 8.7639ZM11.0974 8.7639C11.4636 9.1902 11.9617 9.4031 12.5915 9.4031C13.0534 9.4031 13.4226 9.301 13.6984 9.0969C13.9743 8.8933 14.1545 8.614 14.2384 8.26H15.3004C15.1744 8.884 14.8775 9.3733 14.4093 9.7273C13.9415 10.0813 13.3385 10.2581 12.6002 10.2581C11.9762 10.2581 11.4381 10.1219 10.985 9.8489C10.5319 9.5759 10.1823 9.1946 9.9367 8.7058C9.6906 8.2165 9.5676 7.6511 9.5676 7.009C9.5676 6.3611 9.6906 5.7927 9.9367 5.3034C10.1823 4.8146 10.5319 4.4323 10.985 4.1559C11.4381 3.88 11.9762 3.7418 12.6002 3.7418C13.3385 3.7418 13.9415 3.922 14.4093 4.2818C14.8776 4.6422 15.1744 5.1461 15.3004 5.794H14.2384C14.1544 5.4283 13.9742 5.1368 13.6984 4.921C13.4226 4.7052 13.0534 4.5968 12.5915 4.5968C11.9616 4.5968 11.4636 4.8116 11.0974 5.2404C10.7317 5.6696 10.5486 6.259 10.5486 7.009C10.5486 7.7531 10.7317 8.3381 11.0974 8.7639Z"
        />
      </svg>
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="off">
        <path
          d="M5.73219 10.258C5.10819 10.258 4.57009 10.1218 4.11699 9.8488C3.66389 9.5758 3.31429 9.1945 3.06869 8.7057C2.82259 8.2164 2.69958 7.651 2.69958 7.0089C2.69958 6.361 2.82259 5.7926 3.06869 5.3033C3.31429 4.8145 3.66389 4.4322 4.11699 4.1558C4.57009 3.8799 5.10819 3.7417 5.73219 3.7417C6.47049 3.7417 7.07348 3.9219 7.54128 4.2817C8.00958 4.6421 8.30638 5.146 8.43238 5.7939H7.37039C7.28639 5.4282 7.10618 5.1367 6.83039 4.9209C6.55459 4.7051 6.18538 4.5967 5.72348 4.5967C5.09358 4.5967 4.59559 4.8115 4.22939 5.2403C3.86369 5.6695 3.68058 6.2589 3.68058 7.0089C3.68058 7.753 3.86369 8.338 4.22939 8.7638C4.59559 9.1901 5.09368 9.403 5.72348 9.403C6.18538 9.403 6.55459 9.3009 6.83039 9.0968C7.10629 8.8932 7.28649 8.6139 7.37039 8.2599H8.43238C8.30638 8.8839 8.00948 9.3732 7.54128 9.7272C7.07348 10.0812 6.47049 10.258 5.73219 10.258Z"
        />
        <path
          d="M12.6003 10.258C11.9763 10.258 11.4382 10.1218 10.9851 9.8488C10.532 9.5758 10.1824 9.1945 9.93685 8.7057C9.69075 8.2164 9.56775 7.651 9.56775 7.0089C9.56775 6.361 9.69075 5.7926 9.93685 5.3033C10.1824 4.8145 10.532 4.4322 10.9851 4.1558C11.4382 3.8799 11.9763 3.7417 12.6003 3.7417C13.3386 3.7417 13.9416 3.9219 14.4094 4.2817C14.8777 4.6421 15.1745 5.146 15.3005 5.7939H14.2385C14.1545 5.4282 13.9743 5.1367 13.6985 4.9209C13.4227 4.7051 13.0535 4.5967 12.5916 4.5967C11.9617 4.5967 11.4637 4.8115 11.0975 5.2403C10.7318 5.6695 10.5487 6.2589 10.5487 7.0089C10.5487 7.753 10.7318 8.338 11.0975 8.7638C11.4637 9.1901 11.9618 9.403 12.5916 9.403C13.0535 9.403 13.4227 9.3009 13.6985 9.0968C13.9744 8.8932 14.1546 8.6139 14.2385 8.2599H15.3005C15.1745 8.8839 14.8776 9.3732 14.4094 9.7272C13.9416 10.0812 13.3386 10.258 12.6003 10.258Z"
        />
        <path
          d="M15.9891 1C16.5465 1 17 1.4535 17 2.011V11.9891C17 12.5465 16.5465 13 15.9891 13H2.0109C1.4535 13 1 12.5465 1 11.9891V2.0109C1 1.4535 1.4535 0.9999 2.0109 0.9999L15.9891 1ZM15.9891 0H2.0109C0.9003 0 0 0.9003 0 2.0109V11.9891C0 13.0997 0.9003 14 2.0109 14H15.9891C17.0997 14 18 13.0997 18 11.9891V2.0109C18 0.9003 17.0997 0 15.9891 0Z"
        />
      </svg>
    </media-captions-menu-button>
    <media-captions-menu
      hidden
      anchor="auto"
      part="bottom captions menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
      exportparts="menu-item"
    >
      <div slot="checked-indicator">
        <style>
          .indicator {
            position: relative;
            top: 1px;
            width: 0.9em;
            height: auto;
            fill: var(--_accent-color);
            margin-right: 5px;
          }

          [aria-checked='false'] .indicator {
            display: none;
          }
        </style>
        <svg viewBox="0 0 14 18" class="indicator">
          <path
            d="M12.252 3.48c-.115.033-.301.161-.425.291-.059.063-1.407 1.815-2.995 3.894s-2.897 3.79-2.908 3.802c-.013.014-.661-.616-1.672-1.624-.908-.905-1.702-1.681-1.765-1.723-.401-.27-.783-.211-1.176.183a1.285 1.285 0 0 0-.261.342.582.582 0 0 0-.082.35c0 .165.01.205.08.35.075.153.213.296 2.182 2.271 1.156 1.159 2.17 2.159 2.253 2.222.189.143.338.196.539.194.203-.003.412-.104.618-.299.205-.193 6.7-8.693 6.804-8.903a.716.716 0 0 0 .085-.345c.01-.179.005-.203-.062-.339-.124-.252-.45-.531-.746-.639a.784.784 0 0 0-.469-.027"
            fill-rule="evenodd"
          />
        </svg></div
    ></media-captions-menu>
  </template>

  <template partial="AirplayButton">
    <media-airplay-button part="bottom airplay button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="icon">
        <path
          d="M16.1383 0H1.8618C0.8335 0 0 0.8335 0 1.8617V10.1382C0 11.1664 0.8335 12 1.8618 12H3.076C3.1204 11.9433 3.1503 11.8785 3.2012 11.826L4.004 11H1.8618C1.3866 11 1 10.6134 1 10.1382V1.8617C1 1.3865 1.3866 0.9999 1.8618 0.9999H16.1383C16.6135 0.9999 17.0001 1.3865 17.0001 1.8617V10.1382C17.0001 10.6134 16.6135 11 16.1383 11H13.9961L14.7989 11.826C14.8499 11.8785 14.8798 11.9432 14.9241 12H16.1383C17.1665 12 18.0001 11.1664 18.0001 10.1382V1.8617C18 0.8335 17.1665 0 16.1383 0Z"
        />
        <path
          d="M9.55061 8.21903C9.39981 8.06383 9.20001 7.98633 9.00011 7.98633C8.80021 7.98633 8.60031 8.06383 8.44951 8.21903L4.09771 12.697C3.62471 13.1838 3.96961 13.9998 4.64831 13.9998H13.3518C14.0304 13.9998 14.3754 13.1838 13.9023 12.697L9.55061 8.21903Z"
        />
      </svg>
    </media-airplay-button>
  </template>

  <template partial="FullscreenButton">
    <media-fullscreen-button part="bottom fullscreen button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="enter">
        <path
          d="M1.00745 4.39539L1.01445 1.98789C1.01605 1.43049 1.47085 0.978289 2.02835 0.979989L6.39375 0.992589L6.39665 -0.007411L2.03125 -0.020011C0.920646 -0.023211 0.0176463 0.874489 0.0144463 1.98509L0.00744629 4.39539H1.00745Z"
        />
        <path
          d="M17.0144 2.03431L17.0076 4.39541H18.0076L18.0144 2.03721C18.0176 0.926712 17.1199 0.0237125 16.0093 0.0205125L11.6439 0.0078125L11.641 1.00781L16.0064 1.02041C16.5638 1.02201 17.016 1.47681 17.0144 2.03431Z"
        />
        <path
          d="M16.9925 9.60498L16.9855 12.0124C16.9839 12.5698 16.5291 13.022 15.9717 13.0204L11.6063 13.0078L11.6034 14.0078L15.9688 14.0204C17.0794 14.0236 17.9823 13.1259 17.9855 12.0153L17.9925 9.60498H16.9925Z"
        />
        <path
          d="M0.985626 11.9661L0.992426 9.60498H-0.0074737L-0.0142737 11.9632C-0.0174737 13.0738 0.880226 13.9767 1.99083 13.98L6.35623 13.9926L6.35913 12.9926L1.99373 12.98C1.43633 12.9784 0.983926 12.5236 0.985626 11.9661Z"
        />
      </svg>
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="exit">
        <path
          d="M5.39655 -0.0200195L5.38955 2.38748C5.38795 2.94488 4.93315 3.39708 4.37565 3.39538L0.0103463 3.38278L0.00744629 4.38278L4.37285 4.39538C5.48345 4.39858 6.38635 3.50088 6.38965 2.39028L6.39665 -0.0200195H5.39655Z"
        />
        <path
          d="M12.6411 2.36891L12.6479 0.0078125H11.6479L11.6411 2.36601C11.6379 3.47651 12.5356 4.37951 13.6462 4.38271L18.0116 4.39531L18.0145 3.39531L13.6491 3.38271C13.0917 3.38111 12.6395 2.92641 12.6411 2.36891Z"
        />
        <path
          d="M12.6034 14.0204L12.6104 11.613C12.612 11.0556 13.0668 10.6034 13.6242 10.605L17.9896 10.6176L17.9925 9.61759L13.6271 9.60499C12.5165 9.60179 11.6136 10.4995 11.6104 11.6101L11.6034 14.0204H12.6034Z"
        />
        <path
          d="M5.359 11.6315L5.3522 13.9926H6.3522L6.359 11.6344C6.3622 10.5238 5.4645 9.62088 4.3539 9.61758L-0.0115043 9.60498L-0.0144043 10.605L4.351 10.6176C4.9084 10.6192 5.3607 11.074 5.359 11.6315Z"
        />
      </svg>
    </media-fullscreen-button>
  </template>

  <template partial="CastButton">
    <media-cast-button part="bottom cast button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="enter">
        <path
          d="M16.0072 0H2.0291C0.9185 0 0.0181 0.9003 0.0181 2.011V5.5009C0.357 5.5016 0.6895 5.5275 1.0181 5.5669V2.011C1.0181 1.4536 1.4716 1 2.029 1H16.0072C16.5646 1 17.0181 1.4536 17.0181 2.011V11.9891C17.0181 12.5465 16.5646 13 16.0072 13H8.4358C8.4746 13.3286 8.4999 13.6611 8.4999 13.9999H16.0071C17.1177 13.9999 18.018 13.0996 18.018 11.989V2.011C18.0181 0.9003 17.1178 0 16.0072 0ZM0 6.4999V7.4999C3.584 7.4999 6.5 10.4159 6.5 13.9999H7.5C7.5 9.8642 4.1357 6.4999 0 6.4999ZM0 8.7499V9.7499C2.3433 9.7499 4.25 11.6566 4.25 13.9999H5.25C5.25 11.1049 2.895 8.7499 0 8.7499ZM0.0181 11V14H3.0181C3.0181 12.3431 1.675 11 0.0181 11Z"
        />
      </svg>
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="exit">
        <path
          d="M15.9891 0H2.01103C0.900434 0 3.35947e-05 0.9003 3.35947e-05 2.011V5.5009C0.338934 5.5016 0.671434 5.5275 1.00003 5.5669V2.011C1.00003 1.4536 1.45353 1 2.01093 1H15.9891C16.5465 1 17 1.4536 17 2.011V11.9891C17 12.5465 16.5465 13 15.9891 13H8.41773C8.45653 13.3286 8.48183 13.6611 8.48183 13.9999H15.989C17.0996 13.9999 17.9999 13.0996 17.9999 11.989V2.011C18 0.9003 17.0997 0 15.9891 0ZM-0.0180664 6.4999V7.4999C3.56593 7.4999 6.48193 10.4159 6.48193 13.9999H7.48193C7.48193 9.8642 4.11763 6.4999 -0.0180664 6.4999ZM-0.0180664 8.7499V9.7499C2.32523 9.7499 4.23193 11.6566 4.23193 13.9999H5.23193C5.23193 11.1049 2.87693 8.7499 -0.0180664 8.7499ZM3.35947e-05 11V14H3.00003C3.00003 12.3431 1.65693 11 3.35947e-05 11Z"
        />
        <path d="M2.15002 5.634C5.18352 6.4207 7.57252 8.8151 8.35282 11.8499H15.8501V2.1499H2.15002V5.634Z" />
      </svg>
    </media-cast-button>
  </template>

  <template partial="LiveButton">
    <media-live-button part="{{section ?? 'top'}} live button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <span slot="text">Live</span>
    </media-live-button>
  </template>

  <template partial="PlaybackRateMenu">
    <media-playback-rate-menu-button part="bottom playback-rate button"></media-playback-rate-menu-button>
    <media-playback-rate-menu
      hidden
      anchor="auto"
      rates="{{playbackrates}}"
      exportparts="menu-item"
      part="bottom playback-rate menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    ></media-playback-rate-menu>
  </template>

  <template partial="VolumeRange">
    <media-volume-range
      part="bottom volume range"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    ></media-volume-range>
  </template>

  <template partial="TimeDisplay">
    <media-time-display
      remaining="{{defaultshowremainingtime}}"
      showduration="{{!hideduration}}"
      part="bottom time display"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    ></media-time-display>
  </template>

  <template partial="TimeRange">
    <media-time-range part="bottom time range" disabled="{{disabled}}" aria-disabled="{{disabled}}" exportparts="thumb">
      <media-preview-thumbnail slot="preview"></media-preview-thumbnail>
      <media-preview-chapter-display slot="preview"></media-preview-chapter-display>
      <media-preview-time-display slot="preview"></media-preview-time-display>
      <div slot="preview" part="arrow"></div>
    </media-time-range>
  </template>

  <template partial="AudioTrackMenu">
    <media-audio-track-menu-button part="bottom audio-track button">
      <svg aria-hidden="true" slot="icon" viewBox="0 0 18 16">
        <path d="M9 15A7 7 0 1 1 9 1a7 7 0 0 1 0 14Zm0 1A8 8 0 1 0 9 0a8 8 0 0 0 0 16Z" />
        <path
          d="M5.2 6.3a.5.5 0 0 1 .5.5v2.4a.5.5 0 1 1-1 0V6.8a.5.5 0 0 1 .5-.5Zm2.4-2.4a.5.5 0 0 1 .5.5v7.2a.5.5 0 0 1-1 0V4.4a.5.5 0 0 1 .5-.5ZM10 5.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.4-.8a.5.5 0 0 1 .5.5v5.6a.5.5 0 0 1-1 0V5.2a.5.5 0 0 1 .5-.5Z"
        />
      </svg>
    </media-audio-track-menu-button>
    <media-audio-track-menu
      hidden
      anchor="auto"
      part="bottom audio-track menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
      exportparts="menu-item"
    >
      <div slot="checked-indicator">
        <style>
          .indicator {
            position: relative;
            top: 1px;
            width: 0.9em;
            height: auto;
            fill: var(--_accent-color);
            margin-right: 5px;
          }

          [aria-checked='false'] .indicator {
            display: none;
          }
        </style>
        <svg viewBox="0 0 14 18" class="indicator">
          <path
            d="M12.252 3.48c-.115.033-.301.161-.425.291-.059.063-1.407 1.815-2.995 3.894s-2.897 3.79-2.908 3.802c-.013.014-.661-.616-1.672-1.624-.908-.905-1.702-1.681-1.765-1.723-.401-.27-.783-.211-1.176.183a1.285 1.285 0 0 0-.261.342.582.582 0 0 0-.082.35c0 .165.01.205.08.35.075.153.213.296 2.182 2.271 1.156 1.159 2.17 2.159 2.253 2.222.189.143.338.196.539.194.203-.003.412-.104.618-.299.205-.193 6.7-8.693 6.804-8.903a.716.716 0 0 0 .085-.345c.01-.179.005-.203-.062-.339-.124-.252-.45-.531-.746-.639a.784.784 0 0 0-.469-.027"
            fill-rule="evenodd"
          />
        </svg>
      </div>
    </media-audio-track-menu>
  </template>

  <template partial="RenditionMenu">
    <media-rendition-menu-button part="bottom rendition button">
      <svg aria-hidden="true" slot="icon" viewBox="0 0 18 14">
        <path
          d="M2.25 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM9 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm6.75 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        />
      </svg>
    </media-rendition-menu-button>
    <media-rendition-menu
      hidden
      anchor="auto"
      part="bottom rendition menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <div slot="checked-indicator">
        <style>
          .indicator {
            position: relative;
            top: 1px;
            width: 0.9em;
            height: auto;
            fill: var(--_accent-color);
            margin-right: 5px;
          }

          [aria-checked='false'] .indicator {
            opacity: 0;
          }
        </style>
        <svg viewBox="0 0 14 18" class="indicator">
          <path
            d="M12.252 3.48c-.115.033-.301.161-.425.291-.059.063-1.407 1.815-2.995 3.894s-2.897 3.79-2.908 3.802c-.013.014-.661-.616-1.672-1.624-.908-.905-1.702-1.681-1.765-1.723-.401-.27-.783-.211-1.176.183a1.285 1.285 0 0 0-.261.342.582.582 0 0 0-.082.35c0 .165.01.205.08.35.075.153.213.296 2.182 2.271 1.156 1.159 2.17 2.159 2.253 2.222.189.143.338.196.539.194.203-.003.412-.104.618-.299.205-.193 6.7-8.693 6.804-8.903a.716.716 0 0 0 .085-.345c.01-.179.005-.203-.062-.339-.124-.252-.45-.531-.746-.639a.784.784 0 0 0-.469-.027"
            fill-rule="evenodd"
          />
        </svg>
      </div>
    </media-rendition-menu>
  </template>

  <template partial="MuxBadge">
    <div part="mux-badge">
      <a href="https://www.mux.com/player" target="_blank">
        <span class="mux-badge-text">Powered by</span>
        <div class="mux-badge-logo">
          <svg
            viewBox="0 0 1600 500"
            style="fill-rule: evenodd; clip-rule: evenodd; stroke-linejoin: round; stroke-miterlimit: 2"
          >
            <g>
              <path
                d="M994.287,93.486c-17.121,-0 -31,-13.879 -31,-31c0,-17.121 13.879,-31 31,-31c17.121,-0 31,13.879 31,31c0,17.121 -13.879,31 -31,31m0,-93.486c-34.509,-0 -62.484,27.976 -62.484,62.486l0,187.511c0,68.943 -56.09,125.033 -125.032,125.033c-68.942,-0 -125.03,-56.09 -125.03,-125.033l0,-187.511c0,-34.51 -27.976,-62.486 -62.485,-62.486c-34.509,-0 -62.484,27.976 -62.484,62.486l0,187.511c0,137.853 112.149,250.003 249.999,250.003c137.851,-0 250.001,-112.15 250.001,-250.003l0,-187.511c0,-34.51 -27.976,-62.486 -62.485,-62.486"
                style="fill-rule: nonzero"
              ></path>
              <path
                d="M1537.51,468.511c-17.121,-0 -31,-13.879 -31,-31c0,-17.121 13.879,-31 31,-31c17.121,-0 31,13.879 31,31c0,17.121 -13.879,31 -31,31m-275.883,-218.509l-143.33,143.329c-24.402,24.402 -24.402,63.966 0,88.368c24.402,24.402 63.967,24.402 88.369,-0l143.33,-143.329l143.328,143.329c24.402,24.4 63.967,24.402 88.369,-0c24.403,-24.402 24.403,-63.966 0.001,-88.368l-143.33,-143.329l0.001,-0.004l143.329,-143.329c24.402,-24.402 24.402,-63.965 0,-88.367c-24.402,-24.402 -63.967,-24.402 -88.369,-0l-143.329,143.328l-143.329,-143.328c-24.402,-24.401 -63.967,-24.402 -88.369,-0c-24.402,24.402 -24.402,63.965 0,88.367l143.329,143.329l0,0.004Z"
                style="fill-rule: nonzero"
              ></path>
              <path
                d="M437.511,468.521c-17.121,-0 -31,-13.879 -31,-31c0,-17.121 13.879,-31 31,-31c17.121,-0 31,13.879 31,31c0,17.121 -13.879,31 -31,31m23.915,-463.762c-23.348,-9.672 -50.226,-4.327 -68.096,13.544l-143.331,143.329l-143.33,-143.329c-17.871,-17.871 -44.747,-23.216 -68.096,-13.544c-23.349,9.671 -38.574,32.455 -38.574,57.729l0,375.026c0,34.51 27.977,62.486 62.487,62.486c34.51,-0 62.486,-27.976 62.486,-62.486l0,-224.173l80.843,80.844c24.404,24.402 63.965,24.402 88.369,-0l80.843,-80.844l0,224.173c0,34.51 27.976,62.486 62.486,62.486c34.51,-0 62.486,-27.976 62.486,-62.486l0,-375.026c0,-25.274 -15.224,-48.058 -38.573,-57.729"
                style="fill-rule: nonzero"
              ></path>
            </g>
          </svg>
        </div>
      </a>
    </div>
  </template>

  <media-controller
    part="controller"
    defaultstreamtype="{{defaultstreamtype ?? 'on-demand'}}"
    breakpoints="sm:470"
    gesturesdisabled="{{disabled}}"
    hotkeys="{{hotkeys}}"
    nohotkeys="{{nohotkeys}}"
    novolumepref="{{novolumepref}}"
    audio="{{audio}}"
    noautoseektolive="{{noautoseektolive}}"
    defaultsubtitles="{{defaultsubtitles}}"
    defaultduration="{{defaultduration ?? false}}"
    keyboardforwardseekoffset="{{forwardseekoffset}}"
    keyboardbackwardseekoffset="{{backwardseekoffset}}"
    exportparts="layer, media-layer, poster-layer, vertical-layer, centered-layer, gesture-layer"
    style="--_pre-playback-place:{{preplaybackplace ?? 'center'}}"
  >
    <slot name="media" slot="media"></slot>
    <slot name="poster" slot="poster"></slot>

    <media-loading-indicator slot="centered-chrome" noautohide></media-loading-indicator>

    <template if="!audio">
      <media-error-dialog slot="dialog" noautohide></media-error-dialog>
      <!-- Pre-playback UI -->
      <!-- same for both on-demand and live -->
      <div slot="centered-chrome" class="center-controls pre-playback">
        <template if="!breakpointsm">{{>PlayButton section="center"}}</template>
        <template if="breakpointsm">{{>PrePlayButton section="center"}}</template>
      </div>

      <!-- Mux Badge -->
      <template if="proudlydisplaymuxbadge"> {{>MuxBadge}} </template>

      <!-- Autoplay centered unmute button -->
      <!--
        todo: figure out how show this with available state variables
        needs to show when:
        - autoplay is enabled
        - playback has been successful
        - audio is muted
        - in place / instead of the pre-plaback play button
        - not to show again after user has interacted with this button
          - OR user has interacted with the mute button in the control bar
      -->
      <!--
        There should be a >MuteButton to the left of the "Unmute" text, but a templating bug
        makes it appear even if commented out in the markup, add it back when code is un-commented
      -->
      <!-- <div slot="centered-chrome" class="autoplay-unmute">
        <div role="button" class="autoplay-unmute-btn">Unmute</div>
      </div> -->

      <template if="streamtype == 'on-demand'">
        <template if="breakpointsm">
          <media-control-bar part="control-bar top" slot="top-chrome">{{>TitleDisplay}} </media-control-bar>
        </template>
        {{>TimeRange}}
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}} {{>SeekBackwardButton}} {{>SeekForwardButton}} {{>TimeDisplay}} {{>MuteButton}}
          {{>VolumeRange}}
          <div class="spacer"></div>
          {{>RenditionMenu}} {{>PlaybackRateMenu}} {{>AudioTrackMenu}} {{>CaptionsMenu}} {{>AirplayButton}}
          {{>CastButton}} {{>PipButton}} {{>FullscreenButton}}
        </media-control-bar>
      </template>

      <template if="streamtype == 'live'">
        <media-control-bar part="control-bar top" slot="top-chrome">
          {{>LiveButton}}
          <template if="breakpointsm"> {{>TitleDisplay}} </template>
        </media-control-bar>
        <template if="targetlivewindow > 0">{{>TimeRange}}</template>
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}}
          <template if="targetlivewindow > 0">{{>SeekBackwardButton}} {{>SeekForwardButton}}</template>
          {{>MuteButton}} {{>VolumeRange}}
          <div class="spacer"></div>
          {{>RenditionMenu}} {{>AudioTrackMenu}} {{>CaptionsMenu}} {{>AirplayButton}} {{>CastButton}} {{>PipButton}}
          {{>FullscreenButton}}
        </media-control-bar>
      </template>
    </template>

    <template if="audio">
      <template if="streamtype == 'on-demand'">
        <template if="title">
          <media-control-bar part="control-bar top">{{>TitleDisplay}}</media-control-bar>
        </template>
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}}
          <template if="breakpointsm"> {{>SeekBackwardButton}} {{>SeekForwardButton}} </template>
          {{>MuteButton}}
          <template if="breakpointsm">{{>VolumeRange}}</template>
          {{>TimeDisplay}} {{>TimeRange}}
          <template if="breakpointsm">{{>PlaybackRateMenu}}</template>
          {{>AirplayButton}} {{>CastButton}}
        </media-control-bar>
      </template>

      <template if="streamtype == 'live'">
        <template if="title">
          <media-control-bar part="control-bar top">{{>TitleDisplay}}</media-control-bar>
        </template>
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}} {{>LiveButton section="bottom"}} {{>MuteButton}}
          <template if="breakpointsm">
            {{>VolumeRange}}
            <template if="targetlivewindow > 0"> {{>SeekBackwardButton}} {{>SeekForwardButton}} </template>
          </template>
          <template if="targetlivewindow > 0"> {{>TimeDisplay}} {{>TimeRange}} </template>
          <template if="!targetlivewindow"><div class="spacer"></div></template>
          {{>AirplayButton}} {{>CastButton}}
        </media-control-bar>
      </template>
    </template>

    <slot></slot>
  </media-controller>
</template>
`,pR=m1.createElement("template");"innerHTML"in pR&&(pR.innerHTML=pI);var pD,pL,pC=class extends lC{};pC.template=null==(pL=null==(pD=pR.content)?void 0:pD.children)?void 0:pL[0],m0.customElements.get("media-theme-gerwig")||m0.customElements.define("media-theme-gerwig",pC);var pM={SRC:"src",POSTER:"poster"},pO={STYLE:"style",DEFAULT_HIDDEN_CAPTIONS:"default-hidden-captions",PRIMARY_COLOR:"primary-color",SECONDARY_COLOR:"secondary-color",ACCENT_COLOR:"accent-color",FORWARD_SEEK_OFFSET:"forward-seek-offset",BACKWARD_SEEK_OFFSET:"backward-seek-offset",PLAYBACK_TOKEN:"playback-token",THUMBNAIL_TOKEN:"thumbnail-token",STORYBOARD_TOKEN:"storyboard-token",FULLSCREEN_ELEMENT:"fullscreen-element",DRM_TOKEN:"drm-token",STORYBOARD_SRC:"storyboard-src",THUMBNAIL_TIME:"thumbnail-time",AUDIO:"audio",NOHOTKEYS:"nohotkeys",HOTKEYS:"hotkeys",PLAYBACK_RATES:"playbackrates",DEFAULT_SHOW_REMAINING_TIME:"default-show-remaining-time",DEFAULT_DURATION:"default-duration",TITLE:"title",VIDEO_TITLE:"video-title",PLACEHOLDER:"placeholder",THEME:"theme",DEFAULT_STREAM_TYPE:"default-stream-type",TARGET_LIVE_WINDOW:"target-live-window",EXTRA_SOURCE_PARAMS:"extra-source-params",NO_VOLUME_PREF:"no-volume-pref",NO_MUTED_PREF:"no-muted-pref",CAST_RECEIVER:"cast-receiver",NO_TOOLTIPS:"no-tooltips",PROUDLY_DISPLAY_MUX_BADGE:"proudly-display-mux-badge",DISABLE_PSEUDO_ENDED:"disable-pseudo-ended"},px=["audio","backwardseekoffset","defaultduration","defaultshowremainingtime","defaultsubtitles","noautoseektolive","disabled","exportparts","forwardseekoffset","hideduration","hotkeys","nohotkeys","playbackrates","defaultstreamtype","streamtype","style","targetlivewindow","template","title","videotitle","novolumepref","nomutedpref","proudlydisplaymuxbadge"],pN=sQ.formatErrorMessage;function pP(e){let t=e.videoTitle?{video_title:e.videoTitle}:{};return e.getAttributeNames().filter(e=>e.startsWith("metadata-")).reduce((t,i)=>{let a=e.getAttribute(i);return null!==a&&(t[i.replace(/^metadata-/,"").replace(/-/g,"_")]=a),t},t)}sQ.formatErrorMessage=e=>{var t,i;if(e instanceof tF){let a=((e,t=!1)=>({title:((e,t=!1)=>{var i,a;if(e.muxCode){let r=pw(null!=(i=e.errorCategory)?i:"video"),n=tW(null!=(a=e.errorCategory)?a:tB.VIDEO);if(e.muxCode===tH.NETWORK_OFFLINE)return ie("Your device appears to be offline",t);if(e.muxCode===tH.NETWORK_TOKEN_EXPIRED)return ie("{category} URL has expired",t).format({category:r});if([tH.NETWORK_TOKEN_SUB_MISMATCH,tH.NETWORK_TOKEN_AUD_MISMATCH,tH.NETWORK_TOKEN_AUD_MISSING,tH.NETWORK_TOKEN_MALFORMED].includes(e.muxCode))return ie("{category} URL is formatted incorrectly",t).format({category:r});if(e.muxCode===tH.NETWORK_TOKEN_MISSING)return ie("Invalid {categoryName} URL",t).format({categoryName:n});if(e.muxCode===tH.NETWORK_NOT_FOUND)return ie("{category} does not exist",t).format({category:r});if(e.muxCode===tH.NETWORK_NOT_READY){let i="live"===e.streamType?"Live stream":"Video";return ie("{mediaType} is not currently available",t).format({mediaType:i})}}if(e.code){if(e.code===tF.MEDIA_ERR_NETWORK)return ie("Network Error",t);if(e.code===tF.MEDIA_ERR_DECODE)return ie("Media Error",t);if(e.code===tF.MEDIA_ERR_SRC_NOT_SUPPORTED)return ie("Source Not Supported",t)}return ie("Error",t)})(e,t).toString(),message:((e,t=!1)=>{var i,a;if(e.muxCode){let r=pw(null!=(i=e.errorCategory)?i:"video"),n=tW(null!=(a=e.errorCategory)?a:tB.VIDEO);return e.muxCode===tH.NETWORK_OFFLINE?ie("Check your internet connection and try reloading this video.",t):e.muxCode===tH.NETWORK_TOKEN_EXPIRED?ie("The video’s secured {tokenNamePrefix}-token has expired.",t).format({tokenNamePrefix:n}):e.muxCode===tH.NETWORK_TOKEN_SUB_MISMATCH?ie("The video’s playback ID does not match the one encoded in the {tokenNamePrefix}-token.",t).format({tokenNamePrefix:n}):e.muxCode===tH.NETWORK_TOKEN_MALFORMED?ie("{category} URL is formatted incorrectly",t).format({category:r}):[tH.NETWORK_TOKEN_AUD_MISMATCH,tH.NETWORK_TOKEN_AUD_MISSING].includes(e.muxCode)?ie("The {tokenNamePrefix}-token is formatted with incorrect information.",t).format({tokenNamePrefix:n}):[tH.NETWORK_TOKEN_MISSING,tH.NETWORK_INVALID_URL].includes(e.muxCode)?ie("The video URL or {tokenNamePrefix}-token are formatted with incorrect or incomplete information.",t).format({tokenNamePrefix:n}):e.muxCode===tH.NETWORK_NOT_FOUND?"":e.message}return e.code&&(e.code===tF.MEDIA_ERR_NETWORK||e.code===tF.MEDIA_ERR_DECODE||e.code===tF.MEDIA_ERR_SRC_NOT_SUPPORTED),e.message})(e,t).toString()}))(e,!1);return`
      ${null!=a&&a.title?`<h3>${a.title}</h3>`:""}
      ${null!=a&&a.message||null!=a&&a.linkUrl?`<p>
        ${null==a?void 0:a.message}
        ${null!=a&&a.linkUrl?`<a
              href="${a.linkUrl}"
              target="_blank"
              rel="external noopener"
              aria-label="${null!=(t=a.linkText)?t:""} ${ie("(opens in a new window)")}"
              >${null!=(i=a.linkText)?i:a.linkUrl}</a
            >`:""}
      </p>`:""}
    `}return pN(e)};var pU,pB,pH,pW,pV,pF,p$,pK,pq,pY,pG,pj,pQ,pZ,pz,pX=Object.values(aR),pJ=Object.values(pM),p0=Object.values(pO),p1="mux-player",p2={isDialogOpen:!1},p3={redundant_streams:!0},p4=class extends pp{constructor(){super(),dK(this,p$),dK(this,pU),dK(this,pB,!1),dK(this,pH,{}),dK(this,pW,!0),dK(this,pV,new pr(this,"hotkeys")),dK(this,pF,{...p2,onCloseErrorDialog:e=>{var t;(null==(t=e.composedPath()[0])?void 0:t.localName)==="media-error-dialog"&&dY(this,p$,pY).call(this,{isDialogOpen:!1})},onFocusInErrorDialog:e=>{var t;(null==(t=e.composedPath()[0])?void 0:t.localName)==="media-error-dialog"&&(m7(this,m1.activeElement)||e.preventDefault())}}),dq(this,pU,iq()),this.attachShadow({mode:"open"}),dY(this,p$,pq).call(this),this.isConnected&&dY(this,p$,pK).call(this)}static get NAME(){return p1}static get VERSION(){return pt}static get observedAttributes(){var e;return[...null!=(e=pp.observedAttributes)?e:[],...pJ,...pX,...p0]}get mediaTheme(){var e;return null==(e=this.shadowRoot)?void 0:e.querySelector("media-theme")}get mediaController(){var e,t;return null==(t=null==(e=this.mediaTheme)?void 0:e.shadowRoot)?void 0:t.querySelector("media-controller")}connectedCallback(){let e=this.media;e&&(e.metadata=pP(this))}attributeChangedCallback(e,t,i){var a;switch(dY(this,p$,pK).call(this),super.attributeChangedCallback(e,t,i),e){case pO.HOTKEYS:d$(this,pV).value=i;break;case pO.THUMBNAIL_TIME:null!=i&&this.tokens.thumbnail&&ps(ie("Use of thumbnail-time with thumbnail-token is currently unsupported. Ignore thumbnail-time.").toString());break;case pO.THUMBNAIL_TOKEN:if(i){let e=t7(i);if(e){let{aud:t}=e,i=iA.THUMBNAIL;t!==i&&ps(ie("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:t,expectedAud:i,tokenNamePrefix:"thumbnail"}))}}break;case pO.STORYBOARD_TOKEN:if(i){let e=t7(i);if(e){let{aud:t}=e,i=iA.STORYBOARD;t!==i&&ps(ie("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:t,expectedAud:i,tokenNamePrefix:"storyboard"}))}}break;case pO.DRM_TOKEN:if(i){let e=t7(i);if(e){let{aud:t}=e,i=iA.DRM;t!==i&&ps(ie("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:t,expectedAud:i,tokenNamePrefix:"drm"}))}}break;case aR.PLAYBACK_ID:null!=i&&i.includes("?token")&&po(ie("The specificed playback ID {playbackId} contains a token which must be provided via the playback-token attribute.").format({playbackId:i}));break;case aR.STREAM_TYPE:i&&![tq.LIVE,tq.ON_DEMAND,tq.UNKNOWN].includes(i)?["ll-live","live:dvr","ll-live:dvr"].includes(this.streamType)?this.targetLiveWindow=i.includes("dvr")?1/0:0:pl({file:"invalid-stream-type.md",message:ie("Invalid stream-type value supplied: `{streamType}`. Please provide stream-type as either: `on-demand` or `live`").format({streamType:this.streamType})}):i===tq.LIVE?null==this.getAttribute(pO.TARGET_LIVE_WINDOW)&&(this.targetLiveWindow=0):this.targetLiveWindow=NaN;break;case pO.FULLSCREEN_ELEMENT:if(null!=i||i!==t){let e=m1.getElementById(i),t=null==e?void 0:e.querySelector("mux-player");this.mediaController&&e&&t&&(this.mediaController.fullscreenElement=e)}}[aR.PLAYBACK_ID,pM.SRC,pO.PLAYBACK_TOKEN].includes(e)&&t!==i&&dq(this,pF,{...d$(this,pF),...p2}),dY(this,p$,pG).call(this,{[null!=(a=pa[e])?a:m3(e)]:i})}async requestFullscreen(e){var t;if(!(!this.mediaController||this.mediaController.hasAttribute(ra.MEDIA_IS_FULLSCREEN)))return null==(t=this.mediaController)||t.dispatchEvent(new m0.CustomEvent(a7.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0})),new Promise((e,t)=>{var i;null==(i=this.mediaController)||i.addEventListener(rr.MEDIA_IS_FULLSCREEN,()=>e(),{once:!0})})}async exitFullscreen(){var e;if(!(!this.mediaController||!this.mediaController.hasAttribute(ra.MEDIA_IS_FULLSCREEN)))return null==(e=this.mediaController)||e.dispatchEvent(new m0.CustomEvent(a7.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0})),new Promise((e,t)=>{var i;null==(i=this.mediaController)||i.addEventListener(rr.MEDIA_IS_FULLSCREEN,()=>e(),{once:!0})})}get preferCmcd(){var e;return null!=(e=this.getAttribute(aR.PREFER_CMCD))?e:void 0}set preferCmcd(e){e!==this.preferCmcd&&(e?tj.includes(e)?this.setAttribute(aR.PREFER_CMCD,e):ps(`Invalid value for preferCmcd. Must be one of ${tj.join()}`):this.removeAttribute(aR.PREFER_CMCD))}get hasPlayed(){var e,t;return null!=(t=null==(e=this.mediaController)?void 0:e.hasAttribute(ra.MEDIA_HAS_PLAYED))&&t}get inLiveWindow(){var e;return null==(e=this.mediaController)?void 0:e.hasAttribute(ra.MEDIA_TIME_IS_LIVE)}get _hls(){var e;return null==(e=this.media)?void 0:e._hls}get mux(){var e;return null==(e=this.media)?void 0:e.mux}get theme(){var e;return null!=(e=this.getAttribute(pO.THEME))?e:"gerwig"}set theme(e){this.setAttribute(pO.THEME,`${e}`)}get themeProps(){let e=this.mediaTheme;if(!e)return;let t={};for(let i of e.getAttributeNames()){if(px.includes(i))continue;let a=e.getAttribute(i);t[m3(i)]=""===a||a}return t}set themeProps(e){var t,i;dY(this,p$,pK).call(this);let a={...this.themeProps,...e};for(let r in a){if(px.includes(r))continue;let a=null==e?void 0:e[r];"boolean"==typeof a||null==a?null==(t=this.mediaTheme)||t.toggleAttribute(m2(r),!!a):null==(i=this.mediaTheme)||i.setAttribute(m2(r),a)}}get playbackId(){var e;return null!=(e=this.getAttribute(aR.PLAYBACK_ID))?e:void 0}set playbackId(e){e?this.setAttribute(aR.PLAYBACK_ID,e):this.removeAttribute(aR.PLAYBACK_ID)}get src(){var e,t;return this.playbackId?null!=(e=p5(this,pM.SRC))?e:void 0:null!=(t=this.getAttribute(pM.SRC))?t:void 0}set src(e){e?this.setAttribute(pM.SRC,e):this.removeAttribute(pM.SRC)}get poster(){var e;let t=this.getAttribute(pM.POSTER);if(null!=t)return t;let{tokens:i}=this;return i.playback&&!i.thumbnail?void ps("Missing expected thumbnail token. No poster image will be shown"):this.playbackId&&!this.audio?((e,{token:t,customDomain:i=pe,thumbnailTime:a,programTime:r}={})=>{var n;let s=null==t?a:void 0,{aud:o}=null!=(n=t7(t))?n:{};if(!(t&&"t"!==o))return`https://image.${i}/${e}/thumbnail.webp${m5({token:t,time:s,program_time:r})}`})(this.playbackId,{customDomain:this.customDomain,thumbnailTime:null!=(e=this.thumbnailTime)?e:this.startTime,programTime:this.programStartTime,token:i.thumbnail}):void 0}set poster(e){e||""===e?this.setAttribute(pM.POSTER,e):this.removeAttribute(pM.POSTER)}get storyboardSrc(){var e;return null!=(e=this.getAttribute(pO.STORYBOARD_SRC))?e:void 0}set storyboardSrc(e){e?this.setAttribute(pO.STORYBOARD_SRC,e):this.removeAttribute(pO.STORYBOARD_SRC)}get storyboard(){let{tokens:e}=this;return this.storyboardSrc&&!e.storyboard?this.storyboardSrc:this.audio||!this.playbackId||!this.streamType||[tq.LIVE,tq.UNKNOWN].includes(this.streamType)||e.playback&&!e.storyboard?void 0:((e,{token:t,customDomain:i=pe,programStartTime:a,programEndTime:r}={})=>{var n;let{aud:s}=null!=(n=t7(t))?n:{};if(!(t&&"s"!==s))return`https://image.${i}/${e}/storyboard.vtt${m5({token:t,format:"webp",program_start_time:a,program_end_time:r})}`})(this.playbackId,{customDomain:this.customDomain,token:e.storyboard,programStartTime:this.programStartTime,programEndTime:this.programEndTime})}get audio(){return this.hasAttribute(pO.AUDIO)}set audio(e){if(!e)return void this.removeAttribute(pO.AUDIO);this.setAttribute(pO.AUDIO,"")}get hotkeys(){return d$(this,pV)}get nohotkeys(){return this.hasAttribute(pO.NOHOTKEYS)}set nohotkeys(e){if(!e)return void this.removeAttribute(pO.NOHOTKEYS);this.setAttribute(pO.NOHOTKEYS,"")}get thumbnailTime(){return m4(this.getAttribute(pO.THUMBNAIL_TIME))}set thumbnailTime(e){this.setAttribute(pO.THUMBNAIL_TIME,`${e}`)}get videoTitle(){var e,t;return null!=(t=null!=(e=this.getAttribute(pO.VIDEO_TITLE))?e:this.getAttribute(pO.TITLE))?t:""}set videoTitle(e){e!==this.videoTitle&&(e?this.setAttribute(pO.VIDEO_TITLE,e):this.removeAttribute(pO.VIDEO_TITLE))}get placeholder(){var e;return null!=(e=p5(this,pO.PLACEHOLDER))?e:""}set placeholder(e){this.setAttribute(pO.PLACEHOLDER,`${e}`)}get primaryColor(){var e,t;let i=this.getAttribute(pO.PRIMARY_COLOR);if(null!=i||this.mediaTheme&&(i=null==(t=null==(e=m0.getComputedStyle(this.mediaTheme))?void 0:e.getPropertyValue("--_primary-color"))?void 0:t.trim()))return i}set primaryColor(e){this.setAttribute(pO.PRIMARY_COLOR,`${e}`)}get secondaryColor(){var e,t;let i=this.getAttribute(pO.SECONDARY_COLOR);if(null!=i||this.mediaTheme&&(i=null==(t=null==(e=m0.getComputedStyle(this.mediaTheme))?void 0:e.getPropertyValue("--_secondary-color"))?void 0:t.trim()))return i}set secondaryColor(e){this.setAttribute(pO.SECONDARY_COLOR,`${e}`)}get accentColor(){var e,t;let i=this.getAttribute(pO.ACCENT_COLOR);if(null!=i||this.mediaTheme&&(i=null==(t=null==(e=m0.getComputedStyle(this.mediaTheme))?void 0:e.getPropertyValue("--_accent-color"))?void 0:t.trim()))return i}set accentColor(e){this.setAttribute(pO.ACCENT_COLOR,`${e}`)}get defaultShowRemainingTime(){return this.hasAttribute(pO.DEFAULT_SHOW_REMAINING_TIME)}set defaultShowRemainingTime(e){e?this.setAttribute(pO.DEFAULT_SHOW_REMAINING_TIME,""):this.removeAttribute(pO.DEFAULT_SHOW_REMAINING_TIME)}get playbackRates(){if(this.hasAttribute(pO.PLAYBACK_RATES))return this.getAttribute(pO.PLAYBACK_RATES).trim().split(/\s*,?\s+/).map(e=>Number(e)).filter(e=>!Number.isNaN(e)).sort((e,t)=>e-t)}set playbackRates(e){if(!e)return void this.removeAttribute(pO.PLAYBACK_RATES);this.setAttribute(pO.PLAYBACK_RATES,e.join(" "))}get forwardSeekOffset(){var e;return null!=(e=m4(this.getAttribute(pO.FORWARD_SEEK_OFFSET)))?e:10}set forwardSeekOffset(e){this.setAttribute(pO.FORWARD_SEEK_OFFSET,`${e}`)}get backwardSeekOffset(){var e;return null!=(e=m4(this.getAttribute(pO.BACKWARD_SEEK_OFFSET)))?e:10}set backwardSeekOffset(e){this.setAttribute(pO.BACKWARD_SEEK_OFFSET,`${e}`)}get defaultHiddenCaptions(){return this.hasAttribute(pO.DEFAULT_HIDDEN_CAPTIONS)}set defaultHiddenCaptions(e){e?this.setAttribute(pO.DEFAULT_HIDDEN_CAPTIONS,""):this.removeAttribute(pO.DEFAULT_HIDDEN_CAPTIONS)}get defaultDuration(){return m4(this.getAttribute(pO.DEFAULT_DURATION))}set defaultDuration(e){null==e?this.removeAttribute(pO.DEFAULT_DURATION):this.setAttribute(pO.DEFAULT_DURATION,`${e}`)}get playerInitTime(){return this.hasAttribute(aR.PLAYER_INIT_TIME)?m4(this.getAttribute(aR.PLAYER_INIT_TIME)):d$(this,pU)}set playerInitTime(e){e!=this.playerInitTime&&(null==e?this.removeAttribute(aR.PLAYER_INIT_TIME):this.setAttribute(aR.PLAYER_INIT_TIME,`${+e}`))}get playerSoftwareName(){var e;return null!=(e=this.getAttribute(aR.PLAYER_SOFTWARE_NAME))?e:p1}get playerSoftwareVersion(){var e;return null!=(e=this.getAttribute(aR.PLAYER_SOFTWARE_VERSION))?e:pt}get beaconCollectionDomain(){var e;return null!=(e=this.getAttribute(aR.BEACON_COLLECTION_DOMAIN))?e:void 0}set beaconCollectionDomain(e){e!==this.beaconCollectionDomain&&(e?this.setAttribute(aR.BEACON_COLLECTION_DOMAIN,e):this.removeAttribute(aR.BEACON_COLLECTION_DOMAIN))}get maxResolution(){var e;return null!=(e=this.getAttribute(aR.MAX_RESOLUTION))?e:void 0}set maxResolution(e){e!==this.maxResolution&&(e?this.setAttribute(aR.MAX_RESOLUTION,e):this.removeAttribute(aR.MAX_RESOLUTION))}get minResolution(){var e;return null!=(e=this.getAttribute(aR.MIN_RESOLUTION))?e:void 0}set minResolution(e){e!==this.minResolution&&(e?this.setAttribute(aR.MIN_RESOLUTION,e):this.removeAttribute(aR.MIN_RESOLUTION))}get maxAutoResolution(){var e;return null!=(e=this.getAttribute(aR.MAX_AUTO_RESOLUTION))?e:void 0}set maxAutoResolution(e){null==e?this.removeAttribute(aR.MAX_AUTO_RESOLUTION):this.setAttribute(aR.MAX_AUTO_RESOLUTION,e)}get renditionOrder(){var e;return null!=(e=this.getAttribute(aR.RENDITION_ORDER))?e:void 0}set renditionOrder(e){e!==this.renditionOrder&&(e?this.setAttribute(aR.RENDITION_ORDER,e):this.removeAttribute(aR.RENDITION_ORDER))}get programStartTime(){return m4(this.getAttribute(aR.PROGRAM_START_TIME))}set programStartTime(e){null==e?this.removeAttribute(aR.PROGRAM_START_TIME):this.setAttribute(aR.PROGRAM_START_TIME,`${e}`)}get programEndTime(){return m4(this.getAttribute(aR.PROGRAM_END_TIME))}set programEndTime(e){null==e?this.removeAttribute(aR.PROGRAM_END_TIME):this.setAttribute(aR.PROGRAM_END_TIME,`${e}`)}get assetStartTime(){return m4(this.getAttribute(aR.ASSET_START_TIME))}set assetStartTime(e){null==e?this.removeAttribute(aR.ASSET_START_TIME):this.setAttribute(aR.ASSET_START_TIME,`${e}`)}get assetEndTime(){return m4(this.getAttribute(aR.ASSET_END_TIME))}set assetEndTime(e){null==e?this.removeAttribute(aR.ASSET_END_TIME):this.setAttribute(aR.ASSET_END_TIME,`${e}`)}get extraSourceParams(){return this.hasAttribute(pO.EXTRA_SOURCE_PARAMS)?[...new URLSearchParams(this.getAttribute(pO.EXTRA_SOURCE_PARAMS)).entries()].reduce((e,[t,i])=>(e[t]=i,e),{}):p3}set extraSourceParams(e){null==e?this.removeAttribute(pO.EXTRA_SOURCE_PARAMS):this.setAttribute(pO.EXTRA_SOURCE_PARAMS,new URLSearchParams(e).toString())}get customDomain(){var e;return null!=(e=this.getAttribute(aR.CUSTOM_DOMAIN))?e:void 0}set customDomain(e){e!==this.customDomain&&(e?this.setAttribute(aR.CUSTOM_DOMAIN,e):this.removeAttribute(aR.CUSTOM_DOMAIN))}get envKey(){var e;return null!=(e=p5(this,aR.ENV_KEY))?e:void 0}set envKey(e){this.setAttribute(aR.ENV_KEY,`${e}`)}get noVolumePref(){return this.hasAttribute(pO.NO_VOLUME_PREF)}set noVolumePref(e){e?this.setAttribute(pO.NO_VOLUME_PREF,""):this.removeAttribute(pO.NO_VOLUME_PREF)}get noMutedPref(){return this.hasAttribute(pO.NO_MUTED_PREF)}set noMutedPref(e){e?this.setAttribute(pO.NO_MUTED_PREF,""):this.removeAttribute(pO.NO_MUTED_PREF)}get debug(){return null!=p5(this,aR.DEBUG)}set debug(e){e?this.setAttribute(aR.DEBUG,""):this.removeAttribute(aR.DEBUG)}get disableTracking(){return null!=p5(this,aR.DISABLE_TRACKING)}set disableTracking(e){this.toggleAttribute(aR.DISABLE_TRACKING,!!e)}get disableCookies(){return null!=p5(this,aR.DISABLE_COOKIES)}set disableCookies(e){e?this.setAttribute(aR.DISABLE_COOKIES,""):this.removeAttribute(aR.DISABLE_COOKIES)}get streamType(){var e,t,i;return null!=(i=null!=(t=this.getAttribute(aR.STREAM_TYPE))?t:null==(e=this.media)?void 0:e.streamType)?i:tq.UNKNOWN}set streamType(e){this.setAttribute(aR.STREAM_TYPE,`${e}`)}get defaultStreamType(){var e,t,i;return null!=(i=null!=(t=this.getAttribute(pO.DEFAULT_STREAM_TYPE))?t:null==(e=this.mediaController)?void 0:e.getAttribute(pO.DEFAULT_STREAM_TYPE))?i:tq.ON_DEMAND}set defaultStreamType(e){e?this.setAttribute(pO.DEFAULT_STREAM_TYPE,e):this.removeAttribute(pO.DEFAULT_STREAM_TYPE)}get targetLiveWindow(){var e,t;return this.hasAttribute(pO.TARGET_LIVE_WINDOW)?+this.getAttribute(pO.TARGET_LIVE_WINDOW):null!=(t=null==(e=this.media)?void 0:e.targetLiveWindow)?t:NaN}set targetLiveWindow(e){e==this.targetLiveWindow||Number.isNaN(e)&&Number.isNaN(this.targetLiveWindow)||(null==e?this.removeAttribute(pO.TARGET_LIVE_WINDOW):this.setAttribute(pO.TARGET_LIVE_WINDOW,`${+e}`))}get liveEdgeStart(){var e;return null==(e=this.media)?void 0:e.liveEdgeStart}get startTime(){return m4(p5(this,aR.START_TIME))}set startTime(e){this.setAttribute(aR.START_TIME,`${e}`)}get preferPlayback(){let e=this.getAttribute(aR.PREFER_PLAYBACK);if(e===tY.MSE||e===tY.NATIVE)return e}set preferPlayback(e){e!==this.preferPlayback&&(e===tY.MSE||e===tY.NATIVE?this.setAttribute(aR.PREFER_PLAYBACK,e):this.removeAttribute(aR.PREFER_PLAYBACK))}get metadata(){var e;return null==(e=this.media)?void 0:e.metadata}set metadata(e){if(dY(this,p$,pK).call(this),!this.media)return void po("underlying media element missing when trying to set metadata. metadata will not be set.");this.media.metadata={...pP(this),...e}}get _hlsConfig(){var e;return null==(e=this.media)?void 0:e._hlsConfig}set _hlsConfig(e){if(dY(this,p$,pK).call(this),!this.media)return void po("underlying media element missing when trying to set _hlsConfig. _hlsConfig will not be set.");this.media._hlsConfig=e}async addCuePoints(e){var t;return(dY(this,p$,pK).call(this),this.media)?null==(t=this.media)?void 0:t.addCuePoints(e):void po("underlying media element missing when trying to addCuePoints. cuePoints will not be added.")}get activeCuePoint(){var e;return null==(e=this.media)?void 0:e.activeCuePoint}get cuePoints(){var e,t;return null!=(t=null==(e=this.media)?void 0:e.cuePoints)?t:[]}addChapters(e){var t;return(dY(this,p$,pK).call(this),this.media)?null==(t=this.media)?void 0:t.addChapters(e):void po("underlying media element missing when trying to addChapters. chapters will not be added.")}get activeChapter(){var e;return null==(e=this.media)?void 0:e.activeChapter}get chapters(){var e,t;return null!=(t=null==(e=this.media)?void 0:e.chapters)?t:[]}getStartDate(){var e;return null==(e=this.media)?void 0:e.getStartDate()}get currentPdt(){var e;return null==(e=this.media)?void 0:e.currentPdt}get tokens(){let e=this.getAttribute(pO.PLAYBACK_TOKEN),t=this.getAttribute(pO.DRM_TOKEN),i=this.getAttribute(pO.THUMBNAIL_TOKEN),a=this.getAttribute(pO.STORYBOARD_TOKEN);return{...d$(this,pH),...null!=e?{playback:e}:{},...null!=t?{drm:t}:{},...null!=i?{thumbnail:i}:{},...null!=a?{storyboard:a}:{}}}set tokens(e){dq(this,pH,null!=e?e:{})}get playbackToken(){var e;return null!=(e=this.getAttribute(pO.PLAYBACK_TOKEN))?e:void 0}set playbackToken(e){this.setAttribute(pO.PLAYBACK_TOKEN,`${e}`)}get drmToken(){var e;return null!=(e=this.getAttribute(pO.DRM_TOKEN))?e:void 0}set drmToken(e){this.setAttribute(pO.DRM_TOKEN,`${e}`)}get thumbnailToken(){var e;return null!=(e=this.getAttribute(pO.THUMBNAIL_TOKEN))?e:void 0}set thumbnailToken(e){this.setAttribute(pO.THUMBNAIL_TOKEN,`${e}`)}get storyboardToken(){var e;return null!=(e=this.getAttribute(pO.STORYBOARD_TOKEN))?e:void 0}set storyboardToken(e){this.setAttribute(pO.STORYBOARD_TOKEN,`${e}`)}addTextTrack(e,t,i,a){var r;let n=null==(r=this.media)?void 0:r.nativeEl;if(n)return io(n,e,t,i,a)}removeTextTrack(e){var t;let i=null==(t=this.media)?void 0:t.nativeEl;if(i){let t;return void(null==(t=Array.prototype.find.call(i.querySelectorAll("track"),t=>t.track===e))||t.remove())}}get textTracks(){var e;return null==(e=this.media)?void 0:e.textTracks}get castReceiver(){var e;return null!=(e=this.getAttribute(pO.CAST_RECEIVER))?e:void 0}set castReceiver(e){e!==this.castReceiver&&(e?this.setAttribute(pO.CAST_RECEIVER,e):this.removeAttribute(pO.CAST_RECEIVER))}get castCustomData(){var e;return null==(e=this.media)?void 0:e.castCustomData}set castCustomData(e){if(!this.media)return void po("underlying media element missing when trying to set castCustomData. castCustomData will not be set.");this.media.castCustomData=e}get noTooltips(){return this.hasAttribute(pO.NO_TOOLTIPS)}set noTooltips(e){if(!e)return void this.removeAttribute(pO.NO_TOOLTIPS);this.setAttribute(pO.NO_TOOLTIPS,"")}get proudlyDisplayMuxBadge(){return this.hasAttribute(pO.PROUDLY_DISPLAY_MUX_BADGE)}set proudlyDisplayMuxBadge(e){e?this.setAttribute(pO.PROUDLY_DISPLAY_MUX_BADGE,""):this.removeAttribute(pO.PROUDLY_DISPLAY_MUX_BADGE)}};function p5(e,t){return e.media?e.media.getAttribute(t):e.getAttribute(t)}pU=new WeakMap,pB=new WeakMap,pH=new WeakMap,pW=new WeakMap,pV=new WeakMap,pF=new WeakMap,p$=new WeakSet,pK=function(){var e,t,i,a;if(!d$(this,pB)){dq(this,pB,!0),dY(this,p$,pG).call(this);try{if(customElements.upgrade(this.mediaTheme),!(this.mediaTheme instanceof m0.HTMLElement))throw""}catch{po("<media-theme> failed to upgrade!")}try{customElements.upgrade(this.media)}catch{po("underlying media element failed to upgrade!")}try{if(customElements.upgrade(this.mediaController),!(this.mediaController instanceof nJ))throw""}catch{po("<media-controller> failed to upgrade!")}dY(this,p$,pj).call(this),dY(this,p$,pQ).call(this),dY(this,p$,pZ).call(this),dq(this,pW,null==(t=null==(e=this.mediaController)?void 0:e.hasAttribute(na.USER_INACTIVE))||t),dY(this,p$,pz).call(this),null==(i=this.media)||i.addEventListener("streamtypechange",()=>dY(this,p$,pG).call(this)),null==(a=this.media)||a.addEventListener("loadstart",()=>dY(this,p$,pG).call(this))}},pq=function(){var e,t;try{null==(e=null==window?void 0:window.CSS)||e.registerProperty({name:"--media-primary-color",syntax:"<color>",inherits:!0}),null==(t=null==window?void 0:window.CSS)||t.registerProperty({name:"--media-secondary-color",syntax:"<color>",inherits:!0})}catch{}},pY=function(e){Object.assign(d$(this,pF),e),dY(this,p$,pG).call(this)},pG=function(e={}){var t,i,a,r,n,s,o,l,d,u,c,h,m,v,E,b,g,f,_,y,T,A,k,w,S,I,R,D,L,C,M,O,x,N,P,U,B,H,W,V,F,$,K,q,Y,G;let j,Q;t={...d$(this,pF),...e},j={src:!this.playbackId&&this.src,playbackId:this.playbackId,hasSrc:!!this.playbackId||!!this.src||!!this.currentSrc,poster:this.poster,storyboard:(null==(i=this.media)?void 0:i.currentSrc)&&this.storyboard,storyboardSrc:this.getAttribute(pO.STORYBOARD_SRC),fullscreenElement:this.getAttribute(pO.FULLSCREEN_ELEMENT),placeholder:this.getAttribute("placeholder"),themeTemplate:function(e){var t,i;let a=e.theme;if(a){let r=null==(i=null==(t=e.getRootNode())?void 0:t.getElementById)?void 0:i.call(t,a);if(r&&r instanceof HTMLTemplateElement)return r;a.startsWith("media-theme-")||(a=`media-theme-${a}`);let n=m0.customElements.get(a);if(null!=n&&n.template)return n.template}}(this),thumbnailTime:!this.tokens.thumbnail&&this.thumbnailTime,autoplay:this.autoplay,crossOrigin:this.crossOrigin,loop:this.loop,noHotKeys:this.hasAttribute(pO.NOHOTKEYS),hotKeys:this.getAttribute(pO.HOTKEYS),muted:this.muted,paused:this.paused,preload:this.preload,envKey:this.envKey,preferCmcd:this.preferCmcd,debug:this.debug,disableTracking:this.disableTracking,disableCookies:this.disableCookies,tokens:this.tokens,beaconCollectionDomain:this.beaconCollectionDomain,maxResolution:this.maxResolution,minResolution:this.minResolution,maxAutoResolution:this.maxAutoResolution,programStartTime:this.programStartTime,programEndTime:this.programEndTime,assetStartTime:this.assetStartTime,assetEndTime:this.assetEndTime,renditionOrder:this.renditionOrder,metadata:this.metadata,playerInitTime:this.playerInitTime,playerSoftwareName:this.playerSoftwareName,playerSoftwareVersion:this.playerSoftwareVersion,startTime:this.startTime,preferPlayback:this.preferPlayback,audio:this.audio,defaultStreamType:this.defaultStreamType,targetLiveWindow:this.getAttribute(aR.TARGET_LIVE_WINDOW),streamType:pi(this.getAttribute(aR.STREAM_TYPE)),primaryColor:this.getAttribute(pO.PRIMARY_COLOR),secondaryColor:this.getAttribute(pO.SECONDARY_COLOR),accentColor:this.getAttribute(pO.ACCENT_COLOR),forwardSeekOffset:this.forwardSeekOffset,backwardSeekOffset:this.backwardSeekOffset,defaultHiddenCaptions:this.defaultHiddenCaptions,defaultDuration:this.defaultDuration,defaultShowRemainingTime:this.defaultShowRemainingTime,hideDuration:(Q=null==(n=this.mediaController)?void 0:n.querySelector("media-time-display"))&&"none"===getComputedStyle(Q).getPropertyValue("--media-duration-display-display").trim(),playbackRates:this.getAttribute(pO.PLAYBACK_RATES),customDomain:null!=(a=this.getAttribute(aR.CUSTOM_DOMAIN))?a:void 0,title:this.getAttribute(pO.TITLE),videoTitle:null!=(r=this.getAttribute(pO.VIDEO_TITLE))?r:this.getAttribute(pO.TITLE),novolumepref:this.hasAttribute(pO.NO_VOLUME_PREF),nomutedpref:this.hasAttribute(pO.NO_MUTED_PREF),proudlyDisplayMuxBadge:this.hasAttribute(pO.PROUDLY_DISPLAY_MUX_BADGE),castReceiver:this.castReceiver,disablePseudoEnded:this.hasAttribute(pO.DISABLE_PSEUDO_ENDED),...t,extraSourceParams:this.extraSourceParams},s=pA`
  <style>
    ${(e=>{let{tokens:t}=e;return t.drm?":host(:not([cast-receiver])) { --_cast-button-drm-display: none; }":""})(j)}
    ${pv}
  </style>
  ${l=j,pA`
  <media-theme
    template="${l.themeTemplate||!1}"
    defaultstreamtype="${null!=(d=l.defaultStreamType)&&d}"
    hotkeys="${(e=>{let t=e.hotKeys?`${e.hotKeys}`:"";return"live"===pi(e.streamType)&&(t+=" noarrowleft noarrowright"),t})(l)||!1}"
    nohotkeys="${l.noHotKeys||!l.hasSrc||!1}"
    noautoseektolive="${!!(null!=(u=l.streamType)&&u.includes(tq.LIVE))&&0!==l.targetLiveWindow}"
    novolumepref="${l.novolumepref||!1}"
    nomutedpref="${l.nomutedpref||!1}"
    disabled="${!l.hasSrc||l.isDialogOpen}"
    audio="${null!=(c=l.audio)&&c}"
    style="${null!=(h=function(e){let t="";return Object.entries(e).forEach(([e,i])=>{null!=i&&(t+=`${m2(e)}: ${i}; `)}),t?t.trim():void 0}({"--media-primary-color":l.primaryColor,"--media-secondary-color":l.secondaryColor,"--media-accent-color":l.accentColor}))&&h}"
    defaultsubtitles="${!l.defaultHiddenCaptions}"
    forwardseekoffset="${null!=(m=l.forwardSeekOffset)&&m}"
    backwardseekoffset="${null!=(v=l.backwardSeekOffset)&&v}"
    playbackrates="${null!=(E=l.playbackRates)&&E}"
    defaultshowremainingtime="${null!=(b=l.defaultShowRemainingTime)&&b}"
    defaultduration="${null!=(g=l.defaultDuration)&&g}"
    hideduration="${null!=(f=l.hideDuration)&&f}"
    title="${null!=(_=l.title)&&_}"
    videotitle="${null!=(y=l.videoTitle)&&y}"
    proudlydisplaymuxbadge="${null!=(T=l.proudlyDisplayMuxBadge)&&T}"
    exportparts="${pk}"
    onclose="${l.onCloseErrorDialog}"
    onfocusin="${l.onFocusInErrorDialog}"
  >
    <mux-video
      slot="media"
      inert="${null!=(A=l.noHotKeys)&&A}"
      target-live-window="${null!=(k=l.targetLiveWindow)&&k}"
      stream-type="${null!=(w=pi(l.streamType))&&w}"
      crossorigin="${null!=(S=l.crossOrigin)?S:""}"
      playsinline
      autoplay="${null!=(I=l.autoplay)&&I}"
      muted="${null!=(R=l.muted)&&R}"
      loop="${null!=(D=l.loop)&&D}"
      preload="${null!=(L=l.preload)&&L}"
      debug="${null!=(C=l.debug)&&C}"
      prefer-cmcd="${null!=(M=l.preferCmcd)&&M}"
      disable-tracking="${null!=(O=l.disableTracking)&&O}"
      disable-cookies="${null!=(x=l.disableCookies)&&x}"
      prefer-playback="${null!=(N=l.preferPlayback)&&N}"
      start-time="${null!=l.startTime&&l.startTime}"
      beacon-collection-domain="${null!=(P=l.beaconCollectionDomain)&&P}"
      player-init-time="${null!=(U=l.playerInitTime)&&U}"
      player-software-name="${null!=(B=l.playerSoftwareName)&&B}"
      player-software-version="${null!=(H=l.playerSoftwareVersion)&&H}"
      env-key="${null!=(W=l.envKey)&&W}"
      custom-domain="${null!=(V=l.customDomain)&&V}"
      src="${l.src?l.src:!!l.playbackId&&iG(l)}"
      cast-src="${l.src?l.src:!!l.playbackId&&iG(l)}"
      cast-receiver="${null!=(F=l.castReceiver)&&F}"
      drm-token="${null!=(K=null==($=l.tokens)?void 0:$.drm)&&K}"
      exportparts="video"
      disable-pseudo-ended="${null!=(q=l.disablePseudoEnded)&&q}"
      max-auto-resolution="${null!=(Y=l.maxAutoResolution)&&Y}"
    >
      ${l.storyboard?pA`<track label="thumbnails" default kind="metadata" src="${l.storyboard}" />`:pA``}
      <slot></slot>
    </mux-video>
    <slot name="poster" slot="poster">
      <media-poster-image
        part="poster"
        exportparts="poster, img"
        src="${!!l.poster&&l.poster}"
        placeholdersrc="${null!=(G=l.placeholder)&&G}"
      ></media-poster-image>
    </slot>
  </media-theme>
`}
`,o=this.shadowRoot,s.renderInto(o)},pj=function(){let e=e=>{var t,i;if(!(null!=e&&e.startsWith("theme-")))return;let a=e.replace(/^theme-/,"");if(px.includes(a))return;let r=this.getAttribute(e);null!=r?null==(t=this.mediaTheme)||t.setAttribute(a,r):null==(i=this.mediaTheme)||i.removeAttribute(a)};new MutationObserver(t=>{for(let{attributeName:i}of t)e(i)}).observe(this,{attributes:!0}),this.getAttributeNames().forEach(e)},pQ=function(){let e=e=>{var t;let i=null==(t=this.media)?void 0:t.error;if(!(i instanceof tF)){let{message:e,code:t}=null!=i?i:{};i=new tF(e,t)}if(!(null!=i&&i.fatal)){ps(i),i.data&&ps(`${i.name} data:`,i.data);return}let a=pS(i,!1);a.message&&pl(a),po(i),i.data&&po(`${i.name} data:`,i.data),dY(this,p$,pY).call(this,{isDialogOpen:!0})};this.addEventListener("error",e),this.media&&(this.media.errorTranslator=(e={})=>{var t,i,a;if(!((null==(t=this.media)?void 0:t.error)instanceof tF))return e;let r=pS(null==(i=this.media)?void 0:i.error,!1);return{player_error_code:null==(a=this.media)?void 0:a.error.code,player_error_message:r.message?String(r.message):e.player_error_message,player_error_context:r.context?String(r.context):e.player_error_context}})},pZ=function(){var e,t,i,a;let r=()=>dY(this,p$,pG).call(this);null==(t=null==(e=this.media)?void 0:e.textTracks)||t.addEventListener("addtrack",r),null==(a=null==(i=this.media)?void 0:i.textTracks)||a.addEventListener("removetrack",r)},pz=function(){var e,t;if(!/Firefox/i.test(navigator.userAgent))return;let i,a=new WeakMap,r=()=>this.streamType===tq.LIVE&&!this.secondaryColor&&this.offsetWidth>=800,n=(e,t,i=!1)=>{r()||Array.from(e&&e.activeCues||[]).forEach(e=>{if(!(!e.snapToLines||e.line<-5||e.line>=0&&e.line<10))if(!t||this.paused){let t=e.text.split(`
`).length,r=-3;this.streamType===tq.LIVE&&(r=-2);let n=r-t;if(e.line===n&&!i)return;a.has(e)||a.set(e,e.line),e.line=n}else setTimeout(()=>{e.line=a.get(e)||"auto"},500)})},s=()=>{var e,t;n(i,null!=(t=null==(e=this.mediaController)?void 0:e.hasAttribute(na.USER_INACTIVE))&&t)},o=()=>{var e,t;let a=Array.from((null==(t=null==(e=this.mediaController)?void 0:e.media)?void 0:t.textTracks)||[]).filter(e=>["subtitles","captions"].includes(e.kind)&&"showing"===e.mode)[0];a!==i&&(null==i||i.removeEventListener("cuechange",s)),null==(i=a)||i.addEventListener("cuechange",s),n(i,d$(this,pW))};o(),null==(e=this.textTracks)||e.addEventListener("change",o),null==(t=this.textTracks)||t.addEventListener("addtrack",o),this.addEventListener("userinactivechange",()=>{var e,t;let a=null==(t=null==(e=this.mediaController)?void 0:e.hasAttribute(na.USER_INACTIVE))||t;d$(this,pW)!==a&&(dq(this,pW,a),n(i,d$(this,pW)))})};var p9=e=>{throw TypeError(e)},p8=(e,t,i)=>t.has(e)||p9("Cannot "+i),p6=class{addEventListener(){}removeEventListener(){}dispatchEvent(e){return!0}};if("undefined"==typeof DocumentFragment){class e extends p6{}globalThis.DocumentFragment=e}var p7,ve=class extends p6{},vt=class{constructor(e,t={}){((e,t,i)=>t.has(e)?p9("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,i))(this,p7),((e,t,i,a)=>(p8(e,t,"write to private field"),a?a.call(e,i):t.set(e,i)))(this,p7,null==t?void 0:t.detail)}get detail(){let e,t;return p8(this,e=p7,"read from private field"),t?t.call(this):e.get(this)}initCustomEvent(){}};p7=new WeakMap;var vi={document:{createElement:function(e,t){return new ve}},DocumentFragment,customElements:{get(e){},define(e,t,i){},getName:e=>null,upgrade(e){},whenDefined:e=>Promise.resolve(ve)},CustomEvent:vt,EventTarget:p6,HTMLElement:ve,HTMLVideoElement:class extends p6{}},va="undefined"==typeof window||void 0===globalThis.customElements,vr=va?vi:globalThis;va?vi.document:globalThis.document,vr.customElements.get("mux-player")||(vr.customElements.define("mux-player",p4),vr.MuxPlayerElement=p4);var vn=parseInt(s.version)>=19,vs={className:"class",classname:"class",htmlFor:"for",crossOrigin:"crossorigin",viewBox:"viewBox",playsInline:"playsinline",autoPlay:"autoplay",playbackRate:"playbackrate"},vo=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{ref:t,...i}=e;return Object.entries(i).reduce((e,t)=>{let[i,a]=t,r=((e,t)=>{if(!(!vn&&"boolean"==typeof t&&!t)){let i,a;if(i=e,null!=(a=vs)&&i in a)return vs[e];if(void 0!==t)return/[A-Z]/.test(e)?e.replace(/[A-Z]/g,e=>"-".concat(e.toLowerCase())):e}})(i,a);if(!r)return e;let n=vn||"boolean"!=typeof a?a:"";return e[r]=n,e},{})};function vl(e,t){if("function"==typeof e)return e(t);null!=e&&(e.current=t)}var vd=Object.prototype.hasOwnProperty,vu=(e,t,i)=>!((e,t)=>{if(Object.is(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;if(Array.isArray(e))return!!Array.isArray(t)&&e.length===t.length&&e.some((e,i)=>t[i]===e);let i=Object.keys(e),a=Object.keys(t);if(i.length!==a.length)return!1;for(let a=0;a<i.length;a++)if(!vd.call(t,i[a])||!Object.is(e[i[a]],t[i[a]]))return!1;return!0})(t,e[i]),vc=(e,t,i)=>{e[i]=t},vh=function(e,t,i){let a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:vc,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:vu;return(0,s.useEffect)(()=>{let n=null==i?void 0:i.current;n&&r(n,t,e)&&a(n,t,e)},[null==i?void 0:i.current,t])},vm=(()=>{try{return"3.10.2"}catch(e){}return"UNKNOWN"})(),vp=(e,t,i)=>(0,s.useEffect)(()=>{let a=null==t?void 0:t.current;if(a&&i)return a.addEventListener(e,i),()=>{a.removeEventListener(e,i)}},[null==t?void 0:t.current,i,e]),vv=s.forwardRef((e,t)=>{let{children:i,...a}=e;return s.createElement("mux-player",{suppressHydrationWarning:!0,...vo(a),ref:t},i)}),vE=vm,vb="mux-player-react",vg=s.forwardRef((e,t)=>{var i;let a=(0,s.useRef)(null),r=function(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];return s.useCallback(function(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];return e=>{let i=!1,a=t.map(t=>{let a=vl(t,e);return i||"function"!=typeof a||(i=!0),a});if(i)return()=>{for(let e=0;e<a.length;e++){let i=a[e];"function"==typeof i?i():vl(t[e],null)}}}}(...t),t)}(a,t),[n]=((e,t)=>{let{onAbort:i,onCanPlay:a,onCanPlayThrough:r,onEmptied:n,onLoadStart:s,onLoadedData:o,onLoadedMetadata:l,onProgress:d,onDurationChange:u,onVolumeChange:c,onRateChange:h,onResize:m,onWaiting:v,onPlay:E,onPlaying:b,onTimeUpdate:g,onPause:f,onSeeking:_,onSeeked:y,onStalled:T,onSuspend:A,onEnded:k,onError:w,onCuePointChange:S,onChapterChange:I,metadata:R,tokens:D,paused:L,playbackId:C,playbackRates:M,currentTime:O,themeProps:x,extraSourceParams:N,castCustomData:P,_hlsConfig:U,...B}=t;return vh("tokens",D,e),vh("playbackId",C,e),vh("playbackRates",M,e),vh("metadata",R,e),vh("extraSourceParams",N,e),vh("_hlsConfig",U,e),vh("themeProps",x,e),vh("castCustomData",P,e),vh("paused",L,e,(e,t)=>{null!=t&&(t?e.pause():e.play())},(e,t,i)=>(!e.hasAttribute("autoplay")||!!e.hasPlayed)&&vu(e,t,i)),vh("currentTime",O,e,(e,t)=>{null!=t&&(e.currentTime=t)}),vp("abort",e,i),vp("canplay",e,a),vp("canplaythrough",e,r),vp("emptied",e,n),vp("loadstart",e,s),vp("loadeddata",e,o),vp("loadedmetadata",e,l),vp("progress",e,d),vp("durationchange",e,u),vp("volumechange",e,c),vp("ratechange",e,h),vp("resize",e,m),vp("waiting",e,v),vp("play",e,E),vp("playing",e,b),vp("timeupdate",e,g),vp("pause",e,f),vp("seeking",e,_),vp("seeked",e,y),vp("stalled",e,T),vp("suspend",e,A),vp("ended",e,k),vp("error",e,w),vp("cuepointchange",e,S),vp("chapterchange",e,I),[B]})(a,e),[o]=(0,s.useState)(null!=(i=e.playerInitTime)?i:iq());return s.createElement(vv,{ref:r,defaultHiddenCaptions:e.defaultHiddenCaptions,playerSoftwareName:vb,playerSoftwareVersion:vE,playerInitTime:o,...n})})}}]);