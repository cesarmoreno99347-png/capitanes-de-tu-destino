'use strict';
// Never store credentials here. Contact integrations are intentionally unconfigured.
const config = Object.freeze({whatsapp:null,booking:null,clubVideo:null,businessVideo:null,familyVideo:null});
const business = document.body.dataset.page === 'emprende';
const home = business ? 'index.html' : '';
document.querySelector('#header').innerHTML = `<header class="site-header"><a class="brand" href="index.html" aria-label="Capitanes de tu Destino, inicio"><span class="brand-mark">✧</span><span>CAPITANES<small>DE TU DESTINO</small></span></a><button class="menu-toggle" aria-expanded="false" aria-controls="main-nav">Menú <span>☰</span></button><nav id="main-nav" aria-label="Navegación principal"><a href="index.html" ${!business?'aria-current="page"':''}>Viajar</a><a href="${home}#historia">Mi historia</a><a href="${home}#comunidad">Comunidad</a><a href="emprende.html" ${business?'aria-current="page"':''}>Emprende conmigo</a><a class="nav-cta" href="#presentacion">Ver presentación ↗</a></nav></header>`;
document.querySelector('#footer').innerHTML = `<footer class="site-footer"><div class="footer-top"><a class="brand" href="index.html"><span class="brand-mark">✧</span><span>CAPITANES<small>DE TU DESTINO</small></span></a><p>Historias que comienzan con un sueño.<br>Decisiones que comienzan con información.</p><a href="https://www.instagram.com/cesarmorenoviaja/" target="_blank" rel="noopener">Instagram ↗</a></div><div class="footer-bottom"><span>César Moreno · Socio independiente de InCruises.<br>Capitanes de tu Destino es una comunidad independiente.</span><span>Vista previa de diseño · No publicada como oferta comercial.<br>Materiales y autorizaciones pendientes de revisión.</span></div></footer>`;
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
function closeMenu(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape') closeMenu();});
const plans=[{name:'STARTER',tag:'Para dar el primer paso',monthly:50,activation:0,initial:50,points:100,recurring:50,breakdown:'50 RP por registro + 50 RP por tu primera mensualidad.',note:'Después de cuatro pagos mensuales puntuales consecutivos, eres elegible para un beneficio de ascenso de US$100 que cubre la activación de CLASSIC. El cambio no es automático y corresponde la mensualidad del nuevo plan.'},{name:'CLASSIC',tag:'Para planificar con más puntos',monthly:100,activation:100,initial:200,points:350,recurring:200,breakdown:'100 RP por activación + 200 RP por tu primera mensualidad puntual + 50 RP por registro.',note:'Recibes 200 RP por cada mensualidad puntual de US$100. Los pagos tardíos tienen condiciones diferentes.'},{name:'PREMIUM',tag:'Para ampliar tus posibilidades',monthly:250,activation:250,initial:500,points:800,recurring:500,breakdown:'250 RP por activación + 500 RP por tu primera mensualidad puntual + 50 RP por registro.',note:'Recibes 500 RP por cada mensualidad puntual de US$250. Los pagos tardíos tienen condiciones diferentes.'}];
const planRoot=document.querySelector('#plans');
if(planRoot) {
 const order=[plans[1],plans[2],plans[0]];
 planRoot.innerHTML=order.map(p=>`<article class="plan plan-${p.name.toLowerCase()}"><div class="plan-head"><p class="eyebrow">${p.name==='STARTER'?'UN COMIENZO A TU RITMO':'EL DOBLE EN PUNTOS CON PAGOS PUNTUALES'}</p><h3>${p.name==='CLASSIC'?'Classic':p.name==='PREMIUM'?'Premium':'Starter'}</h3><p>${p.tag}</p></div><div class="plan-inner"><div class="conversion"><span>US$${p.monthly}</span><b>→</b><strong>${p.recurring} RP</strong></div><p class="conversion-label">Por cada pago mensual${p.name==='STARTER'?'':' puntual'}</p>${p.name!=='STARTER'?`<div class="plan-photo ${p.name.toLowerCase()}-photo" role="img" aria-label="Referencia visual de vacaciones, ilustrativa"></div>`:''}<div class="plan-totals"><div><span>Pago inicial total</span><strong>US$${p.initial}</strong></div><div><span>Puntos al comenzar</span><strong>${p.points} RP</strong></div></div><details><summary>¿Cómo se compone mi primer pago?</summary><p>Activación: US$${p.activation}. Primera mensualidad: US$${p.monthly}.</p><p>${p.breakdown}</p><p>${p.note}</p></details><button class="button ${p.name==='PREMIUM'?'gold':'navy'}" data-modal="contacto">Conocer ${p.name==='CLASSIC'?'Classic':p.name==='PREMIUM'?'Premium':'Starter'} ↗</button></div></article>`).join('');
}
const slots=document.querySelector('#compensation-slots');
if(slots) slots.innerHTML=Array.from({length:5},(_,i)=>`<details class="compensation-slot"><summary><span>0${i+1}</span>Vía de compensación · Por validar</summary><p>El nombre, funcionamiento y requisitos se incorporarán después de revisar la guía oficial vigente. No hay cifras de ganancias estimadas en esta vista previa.</p></details>`).join('');
const content={club:['Conoce el club, a tu ritmo','Aquí irá el video de César sobre las tres membresías. Estamos preparando el material; todavía no hay un video conectado. Puedes explorar el desglose de membresías en esta página.'],negocio:['Una presentación para emprender','Aquí irá el video de negocio de César, con información sobre responsabilidades, costos y condiciones oficiales. El video está pendiente.'],jeronimo:['La promesa que dio origen a todo','Este espacio está reservado para el fragmento real del video familiar de Jerónimo. El recorte y los subtítulos están pendientes de revisión; no se ha generado una voz ni una escena ficticia.'],contacto:['Hablemos con claridad','El canal de WhatsApp todavía no está configurado en esta vista previa. No se ha enviado ningún mensaje ni se han recogido datos.'],cita:['Una conversación con César','Estamos preparando el enlace para solicitar una conversación. Esta vista previa no reserva una cita ni envía una invitación a Teams o Zoom.']};
const modal=document.querySelector('#modal');
let previousFocus=null;
document.querySelectorAll('[data-modal]').forEach(b=>b.addEventListener('click',()=>{const item=content[b.dataset.modal];previousFocus=b;document.querySelector('#modal-title').textContent=item[0];document.querySelector('#modal-body').textContent=item[1];modal.showModal();}));
function closeModal(){modal.close();previousFocus?.focus();}
modal.querySelectorAll('.modal-close,.modal-done').forEach(b=>b.addEventListener('click',closeModal));
modal.addEventListener('click',e=>{const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) closeModal();});
modal.addEventListener('close',()=>previousFocus?.focus());
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){document.querySelector('.journey')?.setAttribute('data-active',e.target.dataset.step);const counter=document.querySelector('.scene-counter');if(counter) counter.innerHTML=`0${e.target.dataset.step} — 03 <span>UN PASO A LA VEZ</span>`;}});},{threshold:0.5});document.querySelectorAll('[data-step]').forEach(e=>observer.observe(e));}

// Decorative hero video: muted, visible-only playback, pause and reduced-motion support.
const heroVideo=document.querySelector('#hero-cruise-video');
const heroToggle=document.querySelector('#hero-video-toggle');
if(heroVideo && heroToggle){
 const motion=matchMedia('(prefers-reduced-motion: reduce)');let userPaused=false;let visible=true;
 function syncVideoUI(){const paused=heroVideo.paused;heroToggle.textContent=paused?'Reproducir ▶':'Pausar Ⅱ';heroToggle.setAttribute('aria-label',paused?'Reproducir animación':'Pausar animación');}
 function startVideo(){if(!userPaused&&!motion.matches&&visible&&!document.hidden)heroVideo.play().catch(()=>syncVideoUI());else heroVideo.pause();}
 heroVideo.addEventListener('play',syncVideoUI);heroVideo.addEventListener('pause',syncVideoUI);
 if(motion.matches){heroVideo.autoplay=false;heroVideo.pause();}
 heroToggle.addEventListener('click',()=>{if(heroVideo.paused){userPaused=false;heroVideo.play().catch(()=>syncVideoUI());}else{userPaused=true;heroVideo.pause();}});
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;startVideo();},{threshold:.1}).observe(heroVideo);
 document.addEventListener('visibilitychange',startVideo);motion.addEventListener('change',startVideo);
 heroVideo.addEventListener('error',()=>{heroToggle.hidden=true;});syncVideoUI();
}
