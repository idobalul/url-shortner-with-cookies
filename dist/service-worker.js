if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise((async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()}))),r.then((()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]}))},r=(r,s)=>{Promise.all(r.map(e)).then((e=>s(1===e.length?e[0]:e)))},s={require:Promise.resolve(r)};self.define=(r,i,c)=>{s[r]||(s[r]=Promise.resolve().then((()=>{let s={};const o={uri:location.origin+r.slice(1)};return Promise.all(i.map((r=>{switch(r){case"exports":return s;case"module":return o;default:return e(r)}}))).then((e=>{const r=c(...e);return s.default||(s.default=r),s}))})))}}define("./service-worker.js",["./workbox-543be79b"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"auth.css",revision:"5a24092e5f2811efb4e9556697dea2fe"},{url:"auth.html",revision:"01f415077168be0a753e24bfc8a11bd7"},{url:"auth.js",revision:"22a8fa8e91f021a0cd8da6bf9af68c64"},{url:"favicon.ico",revision:"c51de1e3341db4d2ff6a75c59f7aee05"},{url:"index.css",revision:"da6e79e9b74242a9746abe7c0af8f61f"},{url:"index.html",revision:"e98230c4ee1c5ac18d68cf154f4cc05b"},{url:"index.js",revision:"0f0d1668c6dc01ee0cc790ff5edfae60"}],{})}));
