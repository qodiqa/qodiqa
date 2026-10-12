/* QODIQA execution-boundary visual: requests flow toward a deterministic gate.
   Each request is evaluated once at the boundary: ALLOW continues, DENY halts (fail-closed). */
(function(){'use strict';
var cv=document.querySelector('[data-gate]');if(!cv)return;
var host=cv.parentElement,ctx=cv.getContext('2d'),dpr=Math.min(window.devicePixelRatio||1,2);
var W=0,H=0,GX=0,lanes=[],parts=[],pulses=[],seq=0,running=false,last=0,col={};
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var STOPS=[[251,186,2],[252,106,2],[248,21,48],[192,46,98],[90,93,203],[1,137,253]];
function gradAt(t){t=Math.max(0,Math.min(1,t))*(STOPS.length-1);var i=Math.floor(t),f=t-i,a=STOPS[i],b=STOPS[Math.min(i+1,STOPS.length-1)];
  return [a[0]+(b[0]-a[0])*f|0,a[1]+(b[1]-a[1])*f|0,a[2]+(b[2]-a[2])*f|0];}
function readColors(){var cs=getComputedStyle(document.documentElement);
  col.text=cs.getPropertyValue('--text').trim()||'#fff';col.deny=cs.getPropertyValue('--deny').trim()||'#ff3d5e';
  col.dim=cs.getPropertyValue('--text-4').trim()||'#555';col.light=document.documentElement.getAttribute('data-theme')==='light';}
function hexToRgb(h){h=h.replace('#','');if(h.length===3)h=h.split('').map(function(c){return c+c}).join('');var n=parseInt(h,16);return [n>>16&255,n>>8&255,n&255];}
function resize(){var r=host.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
  GX=W<760?W-14:W*parseFloat(cv.dataset.gate||'0.7');
  var mt=host.querySelector('.x-meta');if(mt&&W>=760){var mr=mt.getBoundingClientRect().right-r.left;if(GX<mr+72)GX=Math.min(W-24,mr+72);}var n=Math.max(8,Math.round(H/34));lanes=[];
  for(var i=0;i<n;i++)lanes.push(H*(0.08+0.86*i/(n-1)));}
function spawn(x){var l=Math.random()*lanes.length|0;seq++;
  /* deterministic verdict from the request sequence number: same input, same decision */
  var h=(seq*2654435761>>>0)%100;
  parts.push({l:l,y:lanes[l],x:x==null?-40-Math.random()*200:x,v:60+Math.random()*90,len:24+Math.random()*60,allow:h>=24,st:0,t:0,id:seq});}
function step(dt){
  if(parts.length<lanes.length*2.2&&Math.random()<dt*9)spawn();
  for(var i=parts.length-1;i>=0;i--){var p=parts[i];
    if(p.st===0){p.x+=p.v*dt;if(p.x>=GX){if(p.allow){p.st=1;pulses.push({y:p.y,t:0,ok:1});}else{p.x=GX;p.st=2;pulses.push({y:p.y,t:0,ok:0});}}}
    else if(p.st===1){p.x+=p.v*1.9*dt;if(p.x-p.len>W+20)parts.splice(i,1);}
    else{p.t+=dt;if(p.t>1.1)parts.splice(i,1);}}
  for(var j=pulses.length-1;j>=0;j--){pulses[j].t+=dt;if(pulses[j].t>0.9)pulses.splice(j,1);}}
function draw(){ctx.clearRect(0,0,W,H);
  var base=hexToRgb(col.text.length>3?col.text:'#ffffff'),dim=col.light?0.18:0.10;
  /* lanes */
  ctx.lineWidth=1;for(var i=0;i<lanes.length;i++){var g=ctx.createLinearGradient(0,0,W,0);
    g.addColorStop(0,'rgba('+base+',0)');g.addColorStop(0.55,'rgba('+base+','+dim+')');g.addColorStop(1,'rgba('+base+','+dim*0.4+')');
    ctx.strokeStyle=g;ctx.beginPath();ctx.moveTo(0,lanes[i]+.5);ctx.lineTo(W,lanes[i]+.5);ctx.stroke();}
  /* gate */
  var gg=ctx.createLinearGradient(0,0,0,H);STOPS.forEach(function(s,k){gg.addColorStop(k/(STOPS.length-1),'rgb('+s+')');});
  ctx.save();ctx.shadowBlur=24;ctx.shadowColor='rgba(248,21,48,.6)';ctx.fillStyle=gg;ctx.fillRect(GX-1,0,2,H);ctx.restore();
  ctx.globalAlpha=.08;ctx.fillStyle=gg;ctx.fillRect(GX-18,0,36,H);ctx.globalAlpha=1;
  for(i=0;i<lanes.length;i++){ctx.fillStyle='rgba('+base+','+(col.light?.35:.25)+')';ctx.fillRect(GX-6,lanes[i]-.5,12,1);}
  /* pulses at the boundary */
  pulses.forEach(function(q){var a=1-q.t/0.9,r=4+q.t*26;ctx.beginPath();ctx.arc(GX,q.y,r,0,7);
    ctx.strokeStyle=q.ok?'rgba(46,229,157,'+a*.7+')':'rgba(255,61,94,'+a*.9+')';ctx.lineWidth=1.2;ctx.stroke();});
  /* requests */
  parts.forEach(function(p){var tail=p.x-p.len,c;
    if(p.st===0){var g2=ctx.createLinearGradient(tail,0,p.x,0);g2.addColorStop(0,'rgba('+base+',0)');g2.addColorStop(1,'rgba('+base+','+(col.light?.75:.85)+')');
      ctx.strokeStyle=g2;ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(tail,p.y);ctx.lineTo(p.x,p.y);ctx.stroke();
      ctx.fillStyle='rgba('+base+',.95)';ctx.fillRect(p.x-1.5,p.y-1.5,3,3);}
    else if(p.st===1){c=gradAt(p.y/H);var g3=ctx.createLinearGradient(tail,0,p.x,0);g3.addColorStop(0,'rgba('+c+',0)');g3.addColorStop(1,'rgba('+c+',1)');
      ctx.strokeStyle=g3;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(Math.max(tail,GX),p.y);ctx.lineTo(p.x,p.y);ctx.stroke();
      ctx.save();ctx.shadowBlur=12;ctx.shadowColor='rgb('+c+')';ctx.fillStyle='rgb('+c+')';ctx.fillRect(p.x-2,p.y-2,4,4);ctx.restore();}
    else{var a=Math.max(0,1-p.t/1.1);ctx.strokeStyle='rgba(255,61,94,'+a+')';ctx.lineWidth=1.6;
      ctx.beginPath();ctx.moveTo(GX-8,p.y-5);ctx.lineTo(GX-18,p.y+5);ctx.moveTo(GX-18,p.y-5);ctx.lineTo(GX-8,p.y+5);ctx.stroke();
      var g4=ctx.createLinearGradient(GX-p.len,0,GX,0);g4.addColorStop(0,'rgba(255,61,94,0)');g4.addColorStop(1,'rgba(255,61,94,'+a*.8+')');
      ctx.strokeStyle=g4;ctx.beginPath();ctx.moveTo(GX-p.len-20,p.y);ctx.lineTo(GX-22,p.y);ctx.stroke();}});
}
function frame(t){if(!running)return;var dt=Math.min(.05,(t-last)/1000||0);last=t;step(dt);draw();requestAnimationFrame(frame);}
function start(){if(running||reduce)return;running=true;last=performance.now();requestAnimationFrame(frame);}
function stop(){running=false;}
function prime(){for(var k=0;k<lanes.length*1.6;k++)spawn(Math.random()*W*0.95);for(var s=0;s<90;s++)step(1/30);}
readColors();resize();prime();draw();
addEventListener('resize',function(){resize();draw();});
new MutationObserver(function(){readColors();draw();}).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
if('IntersectionObserver' in window){new IntersectionObserver(function(e){e[0].isIntersecting?start():stop();}).observe(host);}else start();
document.addEventListener('visibilitychange',function(){document.hidden?stop():start();});
})();


(function(){'use strict';
try{if('scrollRestoration' in history)history.scrollRestoration='manual';}catch(e){}
if(!location.hash){scrollTo(0,0);addEventListener('load',function(){if(!location.hash)scrollTo(0,0);});addEventListener('pageshow',function(e){if(e.persisted&&!location.hash)scrollTo(0,0);});}
var root=document.documentElement,KEY='qodiqa-theme';
try{var t=localStorage.getItem(KEY);if(t==='light')root.setAttribute('data-theme','light');}catch(e){}
var tb=document.getElementById('themeToggle');
if(tb)tb.addEventListener('click',function(){var light=root.getAttribute('data-theme')!=='light';if(light)root.setAttribute('data-theme','light');else root.removeAttribute('data-theme');try{localStorage.setItem(KEY,light?'light':'dark');}catch(e){}});
var prog=document.getElementById('progress'),pct=document.getElementById('pct'),bt=document.getElementById('back-to-top');
var links=[].slice.call(document.querySelectorAll('#sidebar .nav-item'));
var secs=links.map(function(a){var id=(a.getAttribute('href')||'').slice(1);return {a:a,el:id&&document.getElementById(id)};}).filter(function(s){return s.el;});
var sb=document.getElementById('sidebar');
function tick(){var h=document.documentElement.scrollHeight-innerHeight,p=h>0?Math.min(1,scrollY/h):0;
  if(prog)prog.style.setProperty('--p',p.toFixed(4));if(pct)pct.textContent=Math.round(p*100)+'%';
  if(bt)bt.classList.toggle('visible',scrollY>900);
  if(!secs.length)return;var y=innerHeight*0.28,act=null;
  if(innerHeight+scrollY>=document.documentElement.scrollHeight-2)act=secs[secs.length-1];
  else for(var i=0;i<secs.length;i++){if(secs[i].el.getBoundingClientRect().top<=y)act=secs[i];else break;}
  links.forEach(function(l){l.classList.toggle('active',!!act&&l===act.a);});
  if(act&&sb&&innerWidth>960){var r=act.a.getBoundingClientRect(),sr=sb.getBoundingClientRect();if(r.top<sr.top+60||r.bottom>sr.bottom-60)sb.scrollTop+=r.top-sr.top-sr.height/3;}}
var q=false;addEventListener('scroll',function(){if(!q){q=true;requestAnimationFrame(function(){tick();q=false;});}},{passive:true});tick();
var ov=document.getElementById('overlay'),nt=document.getElementById('navToggle');
function setOpen(o){if(!sb)return;sb.classList.toggle('open',o);if(ov)ov.classList.toggle('visible',o);root.classList.toggle('x-lock',o);if(nt){nt.setAttribute('aria-expanded',o?'true':'false');nt.classList.toggle('is-open',o);}}
if(nt&&sb)nt.addEventListener('click',function(e){e.preventDefault();setOpen(!sb.classList.contains('open'));});
if(ov)ov.addEventListener('click',function(){setOpen(false);});
addEventListener('keydown',function(e){if(e.key==='Escape')setOpen(false);});
addEventListener('resize',function(){if(innerWidth>960)setOpen(false);});
if(sb)[].forEach.call(sb.querySelectorAll('a'),function(a){a.addEventListener('click',function(){if(innerWidth<=960)setOpen(false);});});
if(bt)bt.addEventListener('click',function(){scrollTo({top:0,behavior:'smooth'});});
})();
