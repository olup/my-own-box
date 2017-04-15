webpackJsonp([0,3],{0:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o=n(1),i=r(o),a=n(28),l=r(a),u=n(166),s=r(u),c=n(186),p=n(188),f=n(190),d=new s.default(p.simpleFetch);(0,c.startRouter)(d),l.default.render(i.default.createElement(f.App,{store:d}),document.querySelector("#app"))},166:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n,r){n&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(r):void 0})}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t,n,r,o){var i={};return Object.keys(r).forEach(function(e){i[e]=r[e]}),i.enumerable=!!i.enumerable,i.configurable=!!i.configurable,("value"in i||i.initializer)&&(i.writable=!0),i=n.slice().reverse().reduce(function(n,r){return r(e,t,n)||n},i),o&&void 0!==i.initializer&&(i.value=i.initializer?i.initializer.call(o):void 0,i.initializer=void 0),void 0===i.initializer&&(Object.defineProperty(e,t,i),i=null),i}Object.defineProperty(t,"__esModule",{value:!0});var l,u,s,c,p,f,d=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),h=n(167),m=(n(168),n(180)),y=r(m),v=n(181),g=r(v),b=n(185),w=r(b),E=(l=function(){function e(t){i(this,e),this.fetch=null,o(this,"currentUser",u,this),o(this,"currentView",s,this),o(this,"editData",c,this),o(this,"addData",p,this),o(this,"auth",f,this),this.fetch=t}return d(e,[{key:"get",value:function(e){var t=this;y.default.start(),this.fetch("/api"+e,{headers:{token:this.auth.token}}).then(function(e){y.default.done(),t.currentView={name:"file",data:e},t.editStop()}).catch(function(e){401==e.status&&(t.auth.isAuthenticated=!1,t.auth.token="")})}},{key:"put",value:function(e,t){var n=this,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";y.default.start();var i={content:r,name:o},a=g.default.join(e,t);this.fetch("/api"+a,{method:"PUT",body:JSON.stringify(i),headers:{Accept:"application/json","Content-Type":"application/json",token:this.auth.token}}).then(function(e){y.default.done(),r&&(n.currentView.data.content=r),o&&(n.currentView.data.name=o),n.editStop()})}},{key:"post",value:function(e,t,n){var r=this,o="file";"/"!=t.slice(-1)||n||(o="directory"),console.log(o),y.default.start();var i,a,l=g.default.join(e);n?(i=new FormData,i.append("file",n[0]),a={token:this.auth.token}):(i=JSON.stringify({name:t}),a={Accept:"application/json","Content-Type":"application/json",token:this.auth.token}),this.fetch("/api"+l,{method:"POST",body:i,headers:a}).then(function(e){y.default.done(),r.currentView.data.fileList.push(e),r.editStop()})}},{key:"delete",value:function(e,t){var n=this;y.default.start();var r=g.default.join(e,t);this.fetch("/api"+r,{method:"DELETE",headers:{token:this.auth.token}}).then(function(t){n.get(e),y.default.done(),n.editStop()})}},{key:"execute",value:function(e,t){y.default.start(),this.fetch("/api/exec",{method:"POST",headers:{token:this.auth.token,Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({command:e,path:t})}).then(function(e){y.default.done()})}},{key:"login",value:function(e,t){var n=this;return new Promise(function(r,o){n.fetch("/api/login",{method:"POST",body:JSON.stringify({username:e,password:t}),headers:{Accept:"application/json","Content-Type":"application/json"}}).then(function(e){n.auth.isAuthenticated=!0,n.auth.token=e.token,w.default.set("token",e.token),n.get(window.location.pathname),r()}).catch(function(){w.default.remove("token"),o()})})}},{key:"editContentStart",value:function(e){this.editData={editContent:!0,editTitle:!1,content:e,title:""}}},{key:"editTitleStart",value:function(e){this.editData={editContent:!1,editTitle:!0,title:e,content:""},console.log(this.editData.editTitle)}},{key:"editStop",value:function(){this.editData={editContent:!1,editTitle:!1,content:"",title:""},"activeElement"in document&&document.activeElement.blur(),this.addData.title=""}},{key:"currentPath",get:function(){if(!this.currentView)return window.location.pathname;var e=g.default.join(this.currentView.data.topPath,this.currentView.data.name);switch(this.currentView.name){case"file":return""+e}}}]),e}(),u=a(l.prototype,"currentUser",[h.observable],{enumerable:!0,initializer:function(){return null}}),s=a(l.prototype,"currentView",[h.observable],{enumerable:!0,initializer:function(){return null}}),c=a(l.prototype,"editData",[h.observable],{enumerable:!0,initializer:function(){return{editContent:!1,editTitle:!1,content:"",title:""}}}),p=a(l.prototype,"addData",[h.observable],{enumerable:!0,initializer:function(){return{title:""}}}),f=a(l.prototype,"auth",[h.observable],{enumerable:!0,initializer:function(){return{isAuthenticated:!0,token:""}}}),a(l.prototype,"currentPath",[h.computed],Object.getOwnPropertyDescriptor(l.prototype,"currentPath"),l.prototype),a(l.prototype,"get",[h.action],Object.getOwnPropertyDescriptor(l.prototype,"get"),l.prototype),a(l.prototype,"put",[h.action],Object.getOwnPropertyDescriptor(l.prototype,"put"),l.prototype),a(l.prototype,"post",[h.action],Object.getOwnPropertyDescriptor(l.prototype,"post"),l.prototype),a(l.prototype,"delete",[h.action],Object.getOwnPropertyDescriptor(l.prototype,"delete"),l.prototype),a(l.prototype,"execute",[h.action],Object.getOwnPropertyDescriptor(l.prototype,"execute"),l.prototype),a(l.prototype,"login",[h.action],Object.getOwnPropertyDescriptor(l.prototype,"login"),l.prototype),a(l.prototype,"editContentStart",[h.action],Object.getOwnPropertyDescriptor(l.prototype,"editContentStart"),l.prototype),a(l.prototype,"editTitleStart",[h.action],Object.getOwnPropertyDescriptor(l.prototype,"editTitleStart"),l.prototype),a(l.prototype,"editStop",[h.action],Object.getOwnPropertyDescriptor(l.prototype,"editStop"),l.prototype),l);t.default=E},181:function(e,t,n){(function(t){"use strict";function r(e,t){for(var n=[],r=0;r<e.length;r++){var o=e[r];o&&"."!==o&&(".."===o?n.length&&".."!==n[n.length-1]?n.pop():t&&n.push(".."):n.push(o))}return n}function o(e){for(var t=e.length-1,n=0;n<=t&&!e[n];n++);for(var r=t;r>=0&&!e[r];r--);return 0===n&&r===t?e:n>r?[]:e.slice(n,r+1)}function i(e){var t=p.exec(e),n=(t[1]||"")+(t[2]||""),r=t[3]||"",o=f.exec(r),i=o[1],a=o[2],l=o[3];return[n,i,a,l]}function a(e){var t=p.exec(e),n=t[1]||"",r=!!n&&":"!==n[1];return{device:n,isUnc:r,isAbsolute:r||!!t[2],tail:t[3]}}function l(e){return"\\\\"+e.replace(/^[\\\/]+/,"").replace(/[\\\/]+/g,"\\")}function u(e){return h.exec(e).slice(1)}var s="win32"===t.platform,c=n(182),p=/^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/,f=/^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/,d={};d.resolve=function(){for(var e="",n="",o=!1,i=arguments.length-1;i>=-1;i--){var u;if(i>=0?u=arguments[i]:e?(u=t.env["="+e],u&&u.substr(0,3).toLowerCase()===e.toLowerCase()+"\\"||(u=e+"\\")):u=t.cwd(),!c.isString(u))throw new TypeError("Arguments to path.resolve must be strings");if(u){var s=a(u),p=s.device,f=s.isUnc,d=s.isAbsolute,h=s.tail;if((!p||!e||p.toLowerCase()===e.toLowerCase())&&(e||(e=p),o||(n=h+"\\"+n,o=d),e&&o))break}}return f&&(e=l(e)),n=r(n.split(/[\\\/]+/),!o).join("\\"),e+(o?"\\":"")+n||"."},d.normalize=function(e){var t=a(e),n=t.device,o=t.isUnc,i=t.isAbsolute,u=t.tail,s=/[\\\/]$/.test(u);return u=r(u.split(/[\\\/]+/),!i).join("\\"),u||i||(u="."),u&&s&&(u+="\\"),o&&(n=l(n)),n+(i?"\\":"")+u},d.isAbsolute=function(e){return a(e).isAbsolute},d.join=function(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(!c.isString(n))throw new TypeError("Arguments to path.join must be strings");n&&e.push(n)}var r=e.join("\\");return/^[\\\/]{2}[^\\\/]/.test(e[0])||(r=r.replace(/^[\\\/]{2,}/,"\\")),d.normalize(r)},d.relative=function(e,t){e=d.resolve(e),t=d.resolve(t);for(var n=e.toLowerCase(),r=t.toLowerCase(),i=o(t.split("\\")),a=o(n.split("\\")),l=o(r.split("\\")),u=Math.min(a.length,l.length),s=u,c=0;c<u;c++)if(a[c]!==l[c]){s=c;break}if(0==s)return t;for(var p=[],c=s;c<a.length;c++)p.push("..");return p=p.concat(i.slice(s)),p.join("\\")},d._makeLong=function(e){if(!c.isString(e))return e;if(!e)return"";var t=d.resolve(e);return/^[a-zA-Z]\:\\/.test(t)?"\\\\?\\"+t:/^\\\\[^?.]/.test(t)?"\\\\?\\UNC\\"+t.substring(2):e},d.dirname=function(e){var t=i(e),n=t[0],r=t[1];return n||r?(r&&(r=r.substr(0,r.length-1)),n+r):"."},d.basename=function(e,t){var n=i(e)[2];return t&&n.substr(-1*t.length)===t&&(n=n.substr(0,n.length-t.length)),n},d.extname=function(e){return i(e)[3]},d.format=function(e){if(!c.isObject(e))throw new TypeError("Parameter 'pathObject' must be an object, not "+typeof e);var t=e.root||"";if(!c.isString(t))throw new TypeError("'pathObject.root' must be a string or undefined, not "+typeof e.root);var n=e.dir,r=e.base||"";return n?n[n.length-1]===d.sep?n+r:n+d.sep+r:r},d.parse=function(e){if(!c.isString(e))throw new TypeError("Parameter 'pathString' must be a string, not "+typeof e);var t=i(e);if(!t||4!==t.length)throw new TypeError("Invalid path '"+e+"'");return{root:t[0],dir:t[0]+t[1].slice(0,-1),base:t[2],ext:t[3],name:t[2].slice(0,t[2].length-t[3].length)}},d.sep="\\",d.delimiter=";";var h=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,m={};m.resolve=function(){for(var e="",n=!1,o=arguments.length-1;o>=-1&&!n;o--){var i=o>=0?arguments[o]:t.cwd();if(!c.isString(i))throw new TypeError("Arguments to path.resolve must be strings");i&&(e=i+"/"+e,n="/"===i[0])}return e=r(e.split("/"),!n).join("/"),(n?"/":"")+e||"."},m.normalize=function(e){var t=m.isAbsolute(e),n=e&&"/"===e[e.length-1];return e=r(e.split("/"),!t).join("/"),e||t||(e="."),e&&n&&(e+="/"),(t?"/":"")+e},m.isAbsolute=function(e){return"/"===e.charAt(0)},m.join=function(){for(var e="",t=0;t<arguments.length;t++){var n=arguments[t];if(!c.isString(n))throw new TypeError("Arguments to path.join must be strings");n&&(e+=e?"/"+n:n)}return m.normalize(e)},m.relative=function(e,t){e=m.resolve(e).substr(1),t=m.resolve(t).substr(1);for(var n=o(e.split("/")),r=o(t.split("/")),i=Math.min(n.length,r.length),a=i,l=0;l<i;l++)if(n[l]!==r[l]){a=l;break}for(var u=[],l=a;l<n.length;l++)u.push("..");return u=u.concat(r.slice(a)),u.join("/")},m._makeLong=function(e){return e},m.dirname=function(e){var t=u(e),n=t[0],r=t[1];return n||r?(r&&(r=r.substr(0,r.length-1)),n+r):"."},m.basename=function(e,t){var n=u(e)[2];return t&&n.substr(-1*t.length)===t&&(n=n.substr(0,n.length-t.length)),n},m.extname=function(e){return u(e)[3]},m.format=function(e){if(!c.isObject(e))throw new TypeError("Parameter 'pathObject' must be an object, not "+typeof e);var t=e.root||"";if(!c.isString(t))throw new TypeError("'pathObject.root' must be a string or undefined, not "+typeof e.root);var n=e.dir?e.dir+m.sep:"",r=e.base||"";return n+r},m.parse=function(e){if(!c.isString(e))throw new TypeError("Parameter 'pathString' must be a string, not "+typeof e);var t=u(e);if(!t||4!==t.length)throw new TypeError("Invalid path '"+e+"'");return t[1]=t[1]||"",t[2]=t[2]||"",t[3]=t[3]||"",{root:t[0],dir:t[0]+t[1].slice(0,-1),base:t[2],ext:t[3],name:t[2].slice(0,t[2].length-t[3].length)}},m.sep="/",m.delimiter=":",s?e.exports=d:e.exports=m,e.exports.posix=m,e.exports.win32=d}).call(t,n(109))},182:function(e,t,n){(function(e,r){function o(e,n){var r={seen:[],stylize:a};return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),m(n)?r.showHidden=n:n&&t._extend(r,n),E(r.showHidden)&&(r.showHidden=!1),E(r.depth)&&(r.depth=2),E(r.colors)&&(r.colors=!1),E(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=i),u(r,e,r.depth)}function i(e,t){var n=o.styles[t];return n?"["+o.colors[n][0]+"m"+e+"["+o.colors[n][1]+"m":e}function a(e,t){return e}function l(e){var t={};return e.forEach(function(e,n){t[e]=!0}),t}function u(e,n,r){if(e.customInspect&&n&&C(n.inspect)&&n.inspect!==t.inspect&&(!n.constructor||n.constructor.prototype!==n)){var o=n.inspect(r,e);return b(o)||(o=u(e,o,r)),o}var i=s(e,n);if(i)return i;var a=Object.keys(n),m=l(a);if(e.showHidden&&(a=Object.getOwnPropertyNames(n)),S(n)&&(a.indexOf("message")>=0||a.indexOf("description")>=0))return c(n);if(0===a.length){if(C(n)){var y=n.name?": "+n.name:"";return e.stylize("[Function"+y+"]","special")}if(j(n))return e.stylize(RegExp.prototype.toString.call(n),"regexp");if(k(n))return e.stylize(Date.prototype.toString.call(n),"date");if(S(n))return c(n)}var v="",g=!1,w=["{","}"];if(h(n)&&(g=!0,w=["[","]"]),C(n)){var E=n.name?": "+n.name:"";v=" [Function"+E+"]"}if(j(n)&&(v=" "+RegExp.prototype.toString.call(n)),k(n)&&(v=" "+Date.prototype.toUTCString.call(n)),S(n)&&(v=" "+c(n)),0===a.length&&(!g||0==n.length))return w[0]+v+w[1];if(r<0)return j(n)?e.stylize(RegExp.prototype.toString.call(n),"regexp"):e.stylize("[Object]","special");e.seen.push(n);var O;return O=g?p(e,n,r,m,a):a.map(function(t){return f(e,n,r,m,t,g)}),e.seen.pop(),d(O,v,w)}function s(e,t){if(E(t))return e.stylize("undefined","undefined");if(b(t)){var n="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(n,"string")}return g(t)?e.stylize(""+t,"number"):m(t)?e.stylize(""+t,"boolean"):y(t)?e.stylize("null","null"):void 0}function c(e){return"["+Error.prototype.toString.call(e)+"]"}function p(e,t,n,r,o){for(var i=[],a=0,l=t.length;a<l;++a)z(t,String(a))?i.push(f(e,t,n,r,String(a),!0)):i.push("");return o.forEach(function(o){o.match(/^\d+$/)||i.push(f(e,t,n,r,o,!0))}),i}function f(e,t,n,r,o,i){var a,l,s;if(s=Object.getOwnPropertyDescriptor(t,o)||{value:t[o]},s.get?l=s.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):s.set&&(l=e.stylize("[Setter]","special")),z(r,o)||(a="["+o+"]"),l||(e.seen.indexOf(s.value)<0?(l=y(n)?u(e,s.value,null):u(e,s.value,n-1),l.indexOf("\n")>-1&&(l=i?l.split("\n").map(function(e){return"  "+e}).join("\n").substr(2):"\n"+l.split("\n").map(function(e){return"   "+e}).join("\n"))):l=e.stylize("[Circular]","special")),E(a)){if(i&&o.match(/^\d+$/))return l;a=JSON.stringify(""+o),a.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(a=a.substr(1,a.length-2),a=e.stylize(a,"name")):(a=a.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),a=e.stylize(a,"string"))}return a+": "+l}function d(e,t,n){var r=0,o=e.reduce(function(e,t){return r++,t.indexOf("\n")>=0&&r++,e+t.replace(/\u001b\[\d\d?m/g,"").length+1},0);return o>60?n[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+n[1]:n[0]+t+" "+e.join(", ")+" "+n[1]}function h(e){return Array.isArray(e)}function m(e){return"boolean"==typeof e}function y(e){return null===e}function v(e){return null==e}function g(e){return"number"==typeof e}function b(e){return"string"==typeof e}function w(e){return"symbol"==typeof e}function E(e){return void 0===e}function j(e){return O(e)&&"[object RegExp]"===N(e)}function O(e){return"object"==typeof e&&null!==e}function k(e){return O(e)&&"[object Date]"===N(e)}function S(e){return O(e)&&("[object Error]"===N(e)||e instanceof Error)}function C(e){return"function"==typeof e}function P(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||"undefined"==typeof e}function N(e){return Object.prototype.toString.call(e)}function x(e){return e<10?"0"+e.toString(10):e.toString(10)}function D(){var e=new Date,t=[x(e.getHours()),x(e.getMinutes()),x(e.getSeconds())].join(":");return[e.getDate(),U[e.getMonth()],t].join(" ")}function z(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var _=/%[sdj%]/g;t.format=function(e){if(!b(e)){for(var t=[],n=0;n<arguments.length;n++)t.push(o(arguments[n]));return t.join(" ")}for(var n=1,r=arguments,i=r.length,a=String(e).replace(_,function(e){if("%%"===e)return"%";if(n>=i)return e;switch(e){case"%s":return String(r[n++]);case"%d":return Number(r[n++]);case"%j":try{return JSON.stringify(r[n++])}catch(e){return"[Circular]"}default:return e}}),l=r[n];n<i;l=r[++n])a+=y(l)||!O(l)?" "+l:" "+o(l);return a},t.deprecate=function(n,o){function i(){if(!a){if(r.throwDeprecation)throw new Error(o);r.traceDeprecation?console.trace(o):console.error(o),a=!0}return n.apply(this,arguments)}if(E(e.process))return function(){return t.deprecate(n,o).apply(this,arguments)};if(r.noDeprecation===!0)return n;var a=!1;return i};var T,A={};t.debuglog=function(e){if(E(T)&&(T=r.env.NODE_DEBUG||""),e=e.toUpperCase(),!A[e])if(new RegExp("\\b"+e+"\\b","i").test(T)){var n=r.pid;A[e]=function(){var r=t.format.apply(t,arguments);console.error("%s %d: %s",e,n,r)}}else A[e]=function(){};return A[e]},t.inspect=o,o.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},o.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},t.isArray=h,t.isBoolean=m,t.isNull=y,t.isNullOrUndefined=v,t.isNumber=g,t.isString=b,t.isSymbol=w,t.isUndefined=E,t.isRegExp=j,t.isObject=O,t.isDate=k,t.isError=S,t.isFunction=C,t.isPrimitive=P,t.isBuffer=n(183);var U=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];t.log=function(){console.log("%s - %s",D(),t.format.apply(t,arguments))},t.inherits=n(184),t._extend=function(e,t){if(!t||!O(t))return e;for(var n=Object.keys(t),r=n.length;r--;)e[n[r]]=t[n[r]];return e}}).call(t,function(){return this}(),n(109))},183:function(e,t){e.exports=function(e){return e&&"object"==typeof e&&"function"==typeof e.copy&&"function"==typeof e.fill&&"function"==typeof e.readUInt8}},184:function(e,t){"function"==typeof Object.create?e.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}},185:function(e,t,n){var r,o;!function(i){var a=!1;if(r=i,o="function"==typeof r?r.call(t,n,t,e):r,!(void 0!==o&&(e.exports=o)),a=!0,e.exports=i(),a=!0,!a){var l=window.Cookies,u=window.Cookies=i();u.noConflict=function(){return window.Cookies=l,u}}}(function(){function e(){for(var e=0,t={};e<arguments.length;e++){var n=arguments[e];for(var r in n)t[r]=n[r]}return t}function t(n){function r(t,o,i){var a;if("undefined"!=typeof document){if(arguments.length>1){if(i=e({path:"/"},r.defaults,i),"number"==typeof i.expires){var l=new Date;l.setMilliseconds(l.getMilliseconds()+864e5*i.expires),i.expires=l}try{a=JSON.stringify(o),/^[\{\[]/.test(a)&&(o=a)}catch(e){}return o=n.write?n.write(o,t):encodeURIComponent(String(o)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=encodeURIComponent(String(t)),t=t.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),t=t.replace(/[\(\)]/g,escape),document.cookie=[t,"=",o,i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}t||(a={});for(var u=document.cookie?document.cookie.split("; "):[],s=/(%[0-9A-Z]{2})+/g,c=0;c<u.length;c++){var p=u[c].split("="),f=p.slice(1).join("=");'"'===f.charAt(0)&&(f=f.slice(1,-1));try{var d=p[0].replace(s,decodeURIComponent);if(f=n.read?n.read(f,d):n(f,d)||f.replace(s,decodeURIComponent),this.json)try{f=JSON.parse(f)}catch(e){}if(t===d){a=f;break}t||(a[d]=f)}catch(e){}}return a}}return r.set=r,r.get=function(e){return r.call(r,e)},r.getJSON=function(){return r.apply({json:!0},[].slice.call(arguments))},r.defaults={},r.remove=function(t,n){r(t,"",e(n,{expires:-1}))},r.withConverter=t,r}return t(function(){})})},186:function(e,t,n){"use strict";function r(e){new o.Router({"/":function(t){return e.get("/")},"/(.*)":function(t){return e.get("/"+t)}}).configure({html5history:!0}).init();(0,i.autorun)(function(){var t=e.currentPath;t!==window.location.pathname&&window.history.pushState(null,null,t)})}Object.defineProperty(t,"__esModule",{value:!0}),t.startRouter=r;var o=n(187),i=n(167)},188:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.credentials="include",new Promise(function(n,r){window.fetch(e,t).then(function(e){return e.ok?void e.json().then(n).catch(r):(a.default.done(),r(e))}).catch(function(){return a.default.done(),r()})})}Object.defineProperty(t,"__esModule",{value:!0}),t.simpleFetch=o,n(189);var i=n(180),a=r(i)},190:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n,r){n&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(r):void 0})}function i(e,t,n,r,o){var i={};return Object.keys(r).forEach(function(e){i[e]=r[e]}),i.enumerable=!!i.enumerable,i.configurable=!!i.configurable,("value"in i||i.initializer)&&(i.writable=!0),i=n.slice().reverse().reduce(function(n,r){return r(e,t,n)||n},i),o&&void 0!==i.initializer&&(i.value=i.initializer?i.initializer.call(o):void 0,i.initializer=void 0),void 0===i.initializer&&(Object.defineProperty(e,t,i),i=null),i}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){var t=e.currentView;if(!e.auth.isAuthenticated)return w.default.createElement(U,{view:t,store:e});if(!t)return null;switch(t.name){case"file":return w.default.createElement(_,{view:t,store:e});default:return null}}function c(e){e=e.replace(/(^\s*)|(\s*$)/gi,""),e=e.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""),e=e.replace(/[ ]{2,}/gi," "),e=e.replace(/\n /,"\n");var t=e.split(" ");return 1==t.length&&""==t[0]?0:t.length}Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;var p,f,d,h,m,y,v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},g=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),b=n(1),w=r(b),E=n(191),j=n(192),O=(r(j),n(167)),k=n(181),S=r(k),C=n(193),P=r(C),N=n(195),x=r(N),D=n(196),z=(r(D),"/api"),_=(t.App=(0,E.observer)(function(e){var t=e.store;return w.default.createElement("div",null,s(t))}),(0,E.observer)(function(e){var t=e.view,n=e.store,r=t.data;if(!t.data)return null;var o,i=(n.editData.editTitle,n.editData.title),a=""==r.name;return w.default.createElement("div",{className:"main"},w.default.createElement("div",{className:"header"},w.default.createElement("div",{className:"container"},""!=r.name&&w.default.createElement("div",null,w.default.createElement("span",{className:"yeLink path"},w.default.createElement("a",{onClick:function(){return n.get("")}},"Root")),w.default.createElement("span",{className:"slash"},"/"),t.data.topPath.split("/").map(function(e){return e&&w.default.createElement("span",null,w.default.createElement("span",{className:"yeLink path"},w.default.createElement("a",{onClick:function(){return n.get("/"+e+"/")}},e)),w.default.createElement("span",{className:"slash"},"/"))})),!a&&w.default.createElement("h1",null,w.default.createElement(R,{className:"edit-name-input",onChange:function(e){return n.editData.title=e.target.value},value:i||r.name,onValidate:function(){return n.put(r.topPath,r.name,"",i)}}),w.default.createElement("span",{className:"octicon octicon-pencil edit-name"})),a&&w.default.createElement("span",{className:"slash"},"/"),a&&w.default.createElement("h1",null,"Root"),w.default.createElement("div",{className:"option-bar"},"file"==r.type&&w.default.createElement("a",{className:"btn btn-sm btn-secondary",href:z+S.default.join(r.topPath,r.name)+"?option=download"},"Download"),"file"==r.type&&w.default.createElement("a",{className:"btn btn-sm btn-secondary",href:z+S.default.join(r.topPath,r.name)+"?option=raw",target:"blank"},"Raw"),"directory"==r.type&&w.default.createElement("span",{className:"btn btn-sm btn-secondary",onClick:function(){return o.click()}},"Upload file"),w.default.createElement("span",{className:"btn btn-sm btn-secondary float-right",onClick:function(){return n.execute("hugo")}},"Rebuild Blog"),w.default.createElement("input",{style:{display:"none"},type:"file",onChange:function(e){return n.post(S.default.join(r.topPath,r.name),"file",e.target.files)},ref:function(e){return o=e}}),!a&&w.default.createElement("span",{className:"btn btn-sm btn-danger",onClick:function(){return n.delete(r.topPath,r.name)}},"Delete")))),w.default.createElement("div",{className:"bodi"},w.default.createElement("div",{className:"container"},"directory"==r.type?w.default.createElement(T,{view:t,store:n}):w.default.createElement(A,{view:t,store:n}))))})),T=(0,E.observer)(function(e){var t=e.view,n=e.store,r=t.data;return t.data?w.default.createElement("div",null,r.fileList.map(function(e){return w.default.createElement("div",{className:"pointer",onClick:function(){return n.get(S.default.join(r.topPath,r.name,e.name))}},w.default.createElement(L,{mimeType:e.mimeType}),e.name)}),w.default.createElement("div",null,w.default.createElement(R,{className:"add",placeholder:"New file or folder/",value:n.addData.title,onChange:function(e){return n.addData.title=e.target.value},onValidate:function(){return n.post(S.default.join(r.topPath,r.name),n.addData.title)}}),w.default.createElement("span",{className:"detail"},"finish with a / for folder creation"))):null}),A=(0,E.observer)(p=function(e){function t(){var e,n,r,o;a(this,t);for(var i=arguments.length,u=Array(i),s=0;s<i;s++)u[s]=arguments[s];return n=r=l(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),r.onKeyPress=function(e){e.ctrlKey&&preventDefualt()},o=n,l(r,o)}return u(t,e),g(t,[{key:"render",value:function(){var e=this,t=this.props.view.data,n=this.props.store.editData.editContent,r=this.props.store.editData;return this.props.view.data?w.default.createElement("div",null,void 0!==t.content&&w.default.createElement("div",null,w.default.createElement("div",{className:"editBar"},!n&&w.default.createElement("span",{className:"yeLink",onClick:function(){return e.props.store.editContentStart(t.content)}},"Edit"),n&&w.default.createElement("span",{className:"yeLink",onClick:function(){return e.props.store.put(t.topPath,t.name,e.props.store.editData.content)}},"Save"),n&&w.default.createElement("span",{className:"yeLink",onClick:function(){return e.props.store.editStop()}},"Cancel"),w.default.createElement("span",{className:"float-right placeholder"},w.default.createElement("span",null,r.content.length||t.content.length," chars / ",c(r.content)||c(t.content)," words"))),w.default.createElement("div",{className:"editBlock"},!n&&w.default.createElement("div",{className:"readBlock"},t.content||w.default.createElement("span",{className:"placeholder"},"// File is empty")),n&&w.default.createElement("div",null,w.default.createElement(P.default,{placeholder:"Write here...",className:"editArea",value:this.props.store.editData.content,onKeyPress:this.onKeyPress.bind(this),onChange:function(t){return e.props.store.editData.content=t.target.value}})))),t.mimeType.indexOf("image")!=-1&&w.default.createElement("div",null,w.default.createElement("img",{src:z+S.default.join(t.topPath,t.name)+"?option=raw"}))):null}}]),t}(w.default.Component))||p,U=(0,E.observer)((d=function(e){function t(){var e,n,r,i;a(this,t);for(var u=arguments.length,s=Array(u),c=0;c<u;c++)s[c]=arguments[c];return n=r=l(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),o(r,"username",h,r),o(r,"password",m,r),o(r,"message",y,r),i=n,l(r,i)}return u(t,e),g(t,[{key:"render",value:function(){var e=this;return w.default.createElement("div",{className:"login"},w.default.createElement("h1",null,"This data is protected - please login"),w.default.createElement("form",{className:"box",action:"javascript:void(0);"},this.message&&w.default.createElement("div",{className:"alert alert-danger"},this.message),w.default.createElement("input",{placeholder:"Username",className:"form-control",value:this.username,onChange:function(t){return e.username=t.target.value}}),w.default.createElement("input",{placeholder:"Password",type:"password",className:"form-control",value:this.password,onChange:function(t){return e.password=t.target.value}}),w.default.createElement("button",{className:"btn btn-block btn-success",onClick:this.onLogin.bind(this)},"Login")))}},{key:"onLogin",value:function(){var e=this;this.props.store.login(this.username,this.password).then().catch(function(t){e.message="Wrong creds...",e.username="",e.password=""})}}]),t}(w.default.Component),h=i(d.prototype,"username",[O.observable],{enumerable:!0,initializer:function(){return""}}),m=i(d.prototype,"password",[O.observable],{enumerable:!0,initializer:function(){return""}}),y=i(d.prototype,"message",[O.observable],{enumerable:!0,initializer:function(){return""}}),f=d))||f,R=function(e){function t(){var e,n,r,o;a(this,t);for(var i=arguments.length,u=Array(i),s=0;s<i;s++)u[s]=arguments[s];return n=r=l(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),r._handleKeyPress=function(e){"Enter"===e.key&&!!r.props.onValidate&&r.props.onValidate()},o=n,l(r,o)}return u(t,e),g(t,[{key:"render",value:function(){return w.default.createElement(x.default,v({type:"text"},this.props,{onKeyPress:this._handleKeyPress}))}}]),t}(w.default.Component),L=function(e){function t(){return a(this,t),l(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),g(t,[{key:"render",value:function(){if(!this.props.mimeType)return w.default.createElement("span",{className:"right-space octicon octicon-file-directory"});var e=this.props.mimeType.split("/"),t="right-space octicon ";return t+="image"==e[0]?"octicon-file-media":"text"==e[0]?"octicon-file-text":"pdf"==e[1]?"octicon-file-pdf":"x-rar-compressed"==e[1]&&"zip"==e[1]?"octicon-file-zip":"octicon-file",w.default.createElement("span",{className:t})}}]),t}(w.default.Component)},196:function(e,t,n){var r=n(1),o=r.createClass({getInitialState:function(){return{value:"",styles:{parent:{position:"relative"},file:{position:"absolute",top:0,left:0,opacity:0,width:"100%",zIndex:1},text:{position:"relative",zIndex:-1}}}},handleChange:function(e){this.setState({value:e.target.value.split(/(\\|\/)/g).pop()}),this.props.onChange&&this.props.onChange(e)},render:function(){return r.DOM.div({style:this.state.styles.parent},r.DOM.input({type:"file",name:this.props.name,className:this.props.className,onChange:this.handleChange,disabled:this.props.disabled,accept:this.props.accept,style:this.state.styles.file}),r.DOM.input({type:"text",tabIndex:-1,name:this.props.name+"_filename",value:this.state.value,className:this.props.className,onChange:function(){},placeholder:this.props.placeholder,disabled:this.props.disabled,style:this.state.styles.text}))}});e.exports=o}});
//# sourceMappingURL=src.js.map