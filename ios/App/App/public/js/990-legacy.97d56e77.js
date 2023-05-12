"use strict";(self["webpackChunksonrey_cafe"]=self["webpackChunksonrey_cafe"]||[]).push([[990],{8990:(e,t,n)=>{n.r(t),n.d(t,{createSwipeBackGesture:()=>c});var r=n(6587),s=n(545),a=n(6515);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const c=(e,t,n,c,o)=>{const i=e.ownerDocument.defaultView,u=(0,s.i)(e),h=e=>{const t=50,{startX:n}=e;return u?n>=i.innerWidth-t:n<=t},l=e=>u?-e.deltaX:e.deltaX,d=e=>u?-e.velocityX:e.velocityX,f=e=>h(e)&&t(),k=e=>{const t=l(e),n=t/i.innerWidth;c(n)},w=e=>{const t=l(e),n=i.innerWidth,s=t/n,a=d(e),c=n/2,u=a>=0&&(a>.2||t>c),h=u?1-s:s,f=h*n;let k=0;if(f>5){const e=f/Math.abs(a);k=Math.min(e,540)}o(u,s<=0?.01:(0,r.h)(0,s,.9999),k)};return(0,a.createGesture)({el:e,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:f,onStart:n,onMove:k,onEnd:w})}}}]);
//# sourceMappingURL=990-legacy.97d56e77.js.map