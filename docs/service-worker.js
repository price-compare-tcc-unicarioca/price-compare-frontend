if(!self.define){let e,r={};const n=(n,o)=>(n=new URL(n+".js",o).href,r[n]||new Promise((r=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=r,document.head.appendChild(e)}else e=n,importScripts(n),r()})).then((()=>{let e=r[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(o,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(r[i])return;let s={};const t=e=>n(e,i),d={module:{uri:i},exports:s,require:t};r[i]=Promise.all(o.map((e=>d[e]||t(e)))).then((e=>(c(...e),s)))}}define(["./workbox-2d118ab0"],(function(e){"use strict";e.setCacheNameDetails({prefix:"price-compare-frontend"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/price-compare-frontend/css/app.0f9827ed.css",revision:null},{url:"/price-compare-frontend/css/chunk-vendors.9dfd7d18.css",revision:null},{url:"/price-compare-frontend/downloadable/SaleImport.xlsx",revision:"d4b46d1f6d8c23b96059305eeb7b7764"},{url:"/price-compare-frontend/index.html",revision:"d086caf52c962b8ab036c444b846344e"},{url:"/price-compare-frontend/js/app.6c49f602.js",revision:null},{url:"/price-compare-frontend/manifest.json",revision:"01a6251443660b7784d01691be5666d8"},{url:"/price-compare-frontend/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
