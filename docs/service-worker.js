if(!self.define){let e,s={};const r=(r,n)=>(r=new URL(r+".js",n).href,s[r]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=s,document.head.appendChild(e)}else e=r,importScripts(r),s()})).then((()=>{let e=s[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(n,o)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const t=e=>r(e,i),l={module:{uri:i},exports:c,require:t};s[i]=Promise.all(n.map((e=>l[e]||t(e)))).then((e=>(o(...e),c)))}}define(["./workbox-2d118ab0"],(function(e){"use strict";e.setCacheNameDetails({prefix:"price-compare-frontend"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/css/app.53b8c664.css",revision:null},{url:"/css/chunk-vendors.9dfd7d18.css",revision:null},{url:"/downloadable/SaleImport.xlsx",revision:"d4b46d1f6d8c23b96059305eeb7b7764"},{url:"/index.html",revision:"9b787ff6d88843d10b8c2bffc9c9981c"},{url:"/js/app.5b2a87f4.js",revision:null},{url:"/manifest.json",revision:"0f4b9755c5a89271f0739ddde0309d54"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
