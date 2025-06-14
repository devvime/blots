(()=>{var u=(t,e)=>()=>(t&&(e=t(t=0)),e);var S=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var g=(t,e,r)=>new Promise((s,n)=>{var a=i=>{try{c(r.next(i))}catch(l){n(l)}},o=i=>{try{c(r.throw(i))}catch(l){n(l)}},c=i=>i.done?s(i.value):Promise.resolve(i.value).then(a,o);c((r=r.apply(t,e)).next())});var f,y=u(()=>{f=class{constructor(){this.routes=[],window.addEventListener("popstate",()=>this.resolve()),this.setDataLink()}add(e,r){this.routes.push({path:e,callback:r})}navigate(e){history.pushState({},"",e),document.querySelector("app").innerHTML="",this.resolve()}setDataLink(){document.querySelectorAll("a[data-link]").forEach(e=>{e.addEventListener("click",r=>{r.preventDefault();let s=r.currentTarget.getAttribute("href");s&&this.navigate(s)})})}resolve(){let e=window.location.pathname,r=this.parseQueryParams(window.location.search);for(let s of this.routes){let n=this.matchPath(s.path,e);if(n){s.callback(n,r);return}}console.warn("No route matched:",e)}matchPath(e,r){let s=e.split("/").filter(Boolean),n=r.split("/").filter(Boolean);if(s.length!==n.length)return null;let a={};for(let o=0;o<s.length;o++){let c=s[o],i=n[o];if(c.startsWith(":"))a[c.substring(1)]=decodeURIComponent(i);else if(c!==i)return null}return a}parseQueryParams(e){let r={};return new URLSearchParams(e).forEach((n,a)=>{r[a]=n}),r}}});function p(t,e){let r=e.split("."),s=t;for(let n of r)if(s&&typeof s=="object")s=s[n];else return;return s}var h=u(()=>{});function w(t,e){if(e.nodeType===3){let r=e.textContent.match(/{{\s*[\w.]+\s*}}/g);r&&r.forEach(s=>{let n=s.replace(/[{}]/g,"").trim(),a=p(t,n);e.textContent=e.textContent.replace(s,a!=null?a:"")})}}var b=u(()=>{h()});function x(t,e,r){let s=e.split("."),n=t;for(let a=0;a<s.length-1;a++){let o=s[a];o in n||(n[o]={}),n=n[o]}n[s[s.length-1]]=r,t.refresh_at=new Date().getMilliseconds()}var E=u(()=>{});function L(t,e){let r={},n=t.trim().slice(1,-1).split(",").map(a=>a.trim());for(let a of n){let[o,c]=a.split(":").map(l=>l.trim()),i=o.replace(/^["']|["']$/g,"");try{let l=new Function("data",`with(data) { return (${c}) }`);r[i]=l(e)}catch(l){console.warn(`Erro ao avaliar express\xE3o para @class: ${c}`,l)}}return r}var M=u(()=>{});function k(t,e,r,s){t.nodeType===1&&[...t.attributes].forEach(n=>{let a=n.name,o=n.value;a==="@click"&&t.addEventListener("click",r[o]),a==="@change"&&C(t,r,o),a==="@input"&&B(t,r),a==="@value"&&H(t,e,o),a==="@model"&&V(t,e,o),a==="@if"&&F(t,e,o),a==="@else"&&I(t,e,o),a==="@for"&&$(t,e,o),a==="@class"&&R(t,o,e)}),[...t.childNodes].forEach(n=>s(n))}function C(t,e,r){t.addEventListener("change",s=>{e[r]&&e[r](s)})}function B(t,e){t.addEventListener("input",r=>{e[value]&&e[value](r)})}function H(t,e,r){var s;t.value=(s=p(e,r))!=null?s:""}function V(t,e,r){var s;t.value=(s=p(e,r))!=null?s:"",t.addEventListener("input",n=>{x(e,r,n.target.value);let a=n.target.getAttribute("@name");document.querySelector(`[\\@name="${a}"]`).focus()})}function F(t,e,r){p(e,r)||t.remove()}function I(t,e,r){p(e,r)&&t.remove()}function $(t,e,r){let[s,,n]=r.split(" "),a=p(e,n);if(Array.isArray(a)){let o=t.parentElement;a.forEach(c=>{let i=t.cloneNode(!0);i.removeAttribute("@for"),i.innerHTML=i.innerHTML.replace(new RegExp(`{{\\s*${s}\\s*}}`,"g"),c),o.insertBefore(i,t)}),t.remove()}}function R(t,e,r){try{let s=L(e,r);for(let n in s)s[n]?t.classList.add(n):t.classList.remove(n)}catch(s){console.error("Error when interpreting @class:",s)}}var A=u(()=>{h();E();M()});function m(t,e,r){let s=document.querySelector(t);function n(a){w(e,a),k(a,e,r,n)}n(s)}var P=u(()=>{b();A()});function T(t,e){return new Proxy(t,{set(r,s,n){return r[s]=n,typeof e=="function"&&e({prop:s,value:n,target:r}),!0}})}var q=u(()=>{});var d,D=u(()=>{d=`<h1>{{ title }}</h1>

<input type="text" @change="updateTitle" />

<button @click="sayHello">Clique aqui</button>
<button @click="testIf">Test if</button>

<ul>
    <li @for="item in items">{{ item }}</li>
</ul>

<p @if="showMessage">Mensagem vis\xEDvel</p>

<button @click="toggle" @class="{ active: isActive }">
    <span @if="isActive">Desativar</span>
    <span @else="isActive">Ativar</span>
</button>

<input type="text" @model="name" @name="inputName">
<input type="text" @model="title" @name="inputTitle">
<input type="text" @model="user.name" @name="inputUserName">

<p>Ol\xE1, {{ name }}!</p>

<p>User name: {{ user.name }}</p>
<p>Address: street: {{ user.address.street }}</p>`});var j=S(N=>{y();P();q();D();var v=new f;v.add("/",()=>g(null,null,function*(){let t=T({name:"Victor",title:"Ol\xE1 mundo!",showMessage:!0,items:["Ma\xE7\xE3","Banana","Laranja"],isActive:!1,user:{name:"Steve",address:{street:"Rua de test"}},methods:{sayHello:()=>alert("Ol\xE1!"),testIf:()=>{t.showMessage=!t.showMessage},updateTitle:e=>{t.items=[...t.items,e.target.value]},toggle:()=>{t.isActive=!t.isActive}}},()=>{document.querySelector("app").innerHTML=d,m("app",t,t.methods)});document.querySelector("app").innerHTML=d,m("app",t,t.methods)}));v.add("/user/:id/:name",(t,e)=>{console.log("Params:",t),console.log("Query:",e)});v.resolve()});j();})();
//# sourceMappingURL=index.js.map
