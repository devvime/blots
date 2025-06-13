(()=>{var h=(a,t)=>()=>(a&&(t=a(a=0)),t);var S=(a,t)=>()=>(t||a((t={exports:{}}).exports,t),t.exports);var E=(a,t,s)=>new Promise((i,c)=>{var l=r=>{try{o(s.next(r))}catch(n){c(n)}},e=r=>{try{o(s.throw(r))}catch(n){c(n)}},o=r=>r.done?i(r.value):Promise.resolve(r.value).then(l,e);o((s=s.apply(a,t)).next())});var v,L=h(()=>{v=class{constructor(){this.routes=[],window.addEventListener("popstate",()=>this.resolve()),this.setDataLink()}add(t,s){this.routes.push({path:t,callback:s})}navigate(t){history.pushState({},"",t),document.querySelector("app").innerHTML="",this.resolve()}setDataLink(){document.querySelectorAll("a[data-link]").forEach(t=>{t.addEventListener("click",s=>{s.preventDefault();let i=s.currentTarget.getAttribute("href");i&&this.navigate(i)})})}resolve(){let t=window.location.pathname,s=this.parseQueryParams(window.location.search);for(let i of this.routes){let c=this.matchPath(i.path,t);if(c){i.callback(c,s);return}}console.warn("No route matched:",t)}matchPath(t,s){let i=t.split("/").filter(Boolean),c=s.split("/").filter(Boolean);if(i.length!==c.length)return null;let l={};for(let e=0;e<i.length;e++){let o=i[e],r=c[e];if(o.startsWith(":"))l[o.substring(1)]=decodeURIComponent(r);else if(o!==r)return null}return l}parseQueryParams(t){let s={};return new URLSearchParams(t).forEach((c,l)=>{s[l]=c}),s}}});function d(a,t,s){let i=document.querySelector(a);function c(e){if(e.nodeType===3){let o=e.textContent.match(/{{\s*[\w.]+\s*}}/g);o&&o.forEach(r=>{let n=r.replace(/[{}]/g,"").trim(),f=l(n);e.textContent=e.textContent.replace(r,f!=null?f:"")})}e.nodeType===1&&[...e.attributes].forEach(o=>{var f,w;let r=o.name,n=o.value;if(r==="@click"&&e.addEventListener("click",s[n]),r==="@change"&&e.addEventListener("change",u=>{s[n]&&s[n](u)}),r==="@input"&&e.addEventListener("input",u=>{s[n]&&s[n](u)}),r==="@value"&&(e.value=(f=l(n))!=null?f:""),r==="@model"&&(e.value=(w=l(n))!=null?w:"",e.addEventListener("input",u=>{t[n]=u.target.value;let p=u.target.getAttribute("@name");document.querySelector(`[\\@name="${p}"]`).focus()})),r==="@if"&&(l(n)||e.remove()),r==="@else"&&l(n)&&e.remove(),r==="@for"){let[u,,p]=n.split(" "),g=l(p);if(Array.isArray(g)){let T=e.parentElement;g.forEach(q=>{let m=e.cloneNode(!0);m.removeAttribute("@for"),m.innerHTML=m.innerHTML.replace(new RegExp(`{{\\s*${u}\\s*}}`,"g"),q),T.insertBefore(m,e)}),e.remove()}}if(r==="@class")try{let u=B(n,t);for(let p in u)u[p]?e.classList.add(p):e.classList.remove(p)}catch(u){console.error("Error when interpreting @class:",u)}}),[...e.childNodes].forEach(o=>c(o))}function l(e){let o=e.split("."),r=t;for(let n of o)if(r&&typeof r=="object")r=r[n];else return;return r}c(i)}function B(a,t){let s={},c=a.trim().slice(1,-1).split(",").map(l=>l.trim());for(let l of c){let[e,o]=l.split(":").map(n=>n.trim()),r=e.replace(/^["']|["']$/g,"");try{let n=new Function("data",`with(data) { return (${o}) }`);s[r]=n(t)}catch(n){console.warn(`Erro ao avaliar express\xE3o para @class: ${o}`,n)}}return s}var x=h(()=>{});function A(a,t){return new Proxy(a,{set(s,i,c){return s[i]=c,typeof t=="function"&&t({prop:i,value:c,target:s}),!0}})}var M=h(()=>{});var y,k=h(()=>{y=`<h1>{{ title }}</h1>

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
<p>Ol\xE1, {{ name }}!</p>`});var N=S(P=>{L();x();M();k();var b=new v;b.add("/",()=>E(null,null,function*(){let a=A({name:"Victor",title:"Ol\xE1 mundo!",showMessage:!0,items:["Ma\xE7\xE3","Banana","Laranja"],isActive:!1,methods:{sayHello:()=>alert("Ol\xE1!"),testIf:()=>{a.showMessage=!a.showMessage},updateTitle:t=>{a.items=[...a.items,t.target.value]},toggle:()=>{a.isActive=!a.isActive}}},()=>{document.querySelector("app").innerHTML=y,d("app",a,a.methods)});document.querySelector("app").innerHTML=y,d("app",a,a.methods)}));b.add("/user/:id/:name",(a,t)=>{console.log("Params:",a),console.log("Query:",t)});b.resolve()});N();})();
//# sourceMappingURL=index.js.map
