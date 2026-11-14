import * as THREE from './vendor/three.module.min.js';
import { SVGRenderer } from './vendor/SVGRenderer.js';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function makeShip(){
 const ship=new THREE.Group();
 const mats={white:new THREE.MeshPhongMaterial({color:0xffffff,shininess:45}),cream:new THREE.MeshPhongMaterial({color:0xe8f8fc,shininess:45}),blue:new THREE.MeshPhongMaterial({color:0x07539b,shininess:70}),glass:new THREE.MeshPhongMaterial({color:0x123f67,shininess:100}),orange:new THREE.MeshPhongMaterial({color:0xff861d,shininess:35}),wood:new THREE.MeshPhongMaterial({color:0xf0c98c,shininess:10}),pool:new THREE.MeshPhongMaterial({color:0x06d9e0,shininess:90}),rail:new THREE.MeshPhongMaterial({color:0xd9f3ff,shininess:60})};
 const box=(w,h,d,x,y,z,m)=>{const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mats[m]);mesh.position.set(x,y,z);ship.add(mesh);return mesh;};
 const shape=new THREE.Shape();shape.moveTo(-5.6,-1.02);shape.lineTo(3.65,-1.02);shape.bezierCurveTo(4.8,-1.02,5.85,-.35,6.15,0);shape.bezierCurveTo(5.85,.35,4.8,1.02,3.65,1.02);shape.lineTo(-5.6,1.02);shape.quadraticCurveTo(-5.95,0,-5.6,-1.02);
 function hull(depth,y,scale,material){const g=new THREE.ExtrudeGeometry(shape,{depth,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.12,bevelThickness:.12,curveSegments:22});g.rotateX(-Math.PI/2);const m=new THREE.Mesh(g,mats[material]);m.position.y=y;m.scale.set(scale,1,scale);ship.add(m);}
 hull(.8,.1,1,'white');hull(.16,-.05,.97,'blue');hull(.1,.95,.98,'wood');
 // Seven stepped decks, with glass balcony bands on both sides.
 for(let level=0;level<7;level++){
  const len=9.7-level*.47;const x=-.35-level*.12;const y=1.1+level*.37;const width=1.87-level*.065;
  box(len,.27,width,x,y,0,level>4?'white':'cream');
  box(len+.13,.055,width+.12,x,y+.16,0,'white');
  for(const side of [-1,1]){
   box(len-.15,.12,.025,x,y+.015,side*(width/2+.012),'glass');
   for(let i=0;i<Math.floor(len/.34);i++){box(.018,.19,.06,x-len/2+.17+i*.34,y+.035,side*(width/2+.04),'white');}
  }
 }
 // Bridge wrapping around the forward top deck.
 box(1.2,.38,1.65,3.05,3.03,0,'white');box(1.12,.18,1.69,3.09,3.09,0,'glass');box(1.45,.06,1.9,3,3.25,0,'white');
 box(7.2,.12,1.48,-.9,3.68,0,'wood');
 // Pools inset in bright white rims.
 for(const x of [-2.3,.5]){box(1.6,.075,.83,x,3.78,0,'white');box(1.39,.08,.63,x,3.79,0,'pool');}
 for(let i=0;i<16;i++){const x=-3.9+i*.42;for(const z of [-.62,.62]){box(.27,.065,.12,x,3.8,z,'orange');}}
 // Funnel and navy cap.
 box(.9,.65,.77,-.55,4.06,0,'orange');box(1.04,.13,.87,-.55,4.42,0,'blue');
 // Lifeboats with rounded ends.
 const boatGeo=new THREE.CapsuleGeometry(.12,.61,3,8);boatGeo.rotateZ(Math.PI/2);
 for(const z of [-1.05,1.05])for(let i=0;i<7;i++){const boat=new THREE.Mesh(boatGeo,mats.orange);boat.position.set(-3.9+i*1.05,1.72,z);ship.add(boat);}
 // Radar domes and mast.
 for(const x of [-3.7,2.1]){box(.05,.65,.05,x,4.05,0,'white');const dome=new THREE.Mesh(new THREE.SphereGeometry(.19,12,8),mats.white);dome.position.set(x,4.4,0);ship.add(dome);}
 box(.035,.8,.035,3.65,3.75,0,'white');box(.035,.035,1,3.65,4,0,'white');
 for(let i=0;i<23;i++)for(const z of [-1.025,1.025]){const port=new THREE.Mesh(new THREE.CircleGeometry(.045,8),mats.glass);port.position.set(-5+i*.44,.5,z);if(z<0)port.rotation.y=Math.PI;ship.add(port);}
 ship.position.y=-1.8;return ship;
}
function mount(host){
 let renderer,software=false;try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch{renderer=new SVGRenderer();renderer.setQuality('high');software=true;}
 host.append(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');host.dataset.mode='webgl';
 const status=host.parentElement.querySelector('.ship-status');if(status) status.textContent='3D interactivo · Arrastra para explorar';
 if(!software){renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.55;}else{renderer.setClearColor(0x009ed0,0);}
 const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(32,1,.1,100);camera.position.set(12,8.6,15.7);camera.lookAt(0,.25,0);
 scene.add(new THREE.HemisphereLight(0xdff8ff,0x148bc0,2.8));const sun=new THREE.DirectionalLight(0xfff2de,4);sun.position.set(2,10,8);scene.add(sun);const fill=new THREE.DirectionalLight(0x81edff,2);fill.position.set(-8,3,-6);scene.add(fill);
 const boat=makeShip();scene.add(boat);boat.rotation.y=-.1;
 const water=new THREE.Mesh(new THREE.CircleGeometry(9,64),new THREE.MeshBasicMaterial({color:0x00b8d2,transparent:true,opacity:.18,depthWrite:false}));water.rotation.x=-Math.PI/2;water.scale.set(1,.42,1);water.position.y=-1.84;scene.add(water);
 const rings=[];for(let i=0;i<6;i++){const ring=new THREE.Mesh(new THREE.RingGeometry(5+i*.55,5.015+i*.55,80),new THREE.MeshBasicMaterial({color:0xe4ffff,transparent:true,opacity:.22,side:THREE.DoubleSide,depthWrite:false}));ring.rotation.x=-Math.PI/2;ring.scale.set(1,.4,1);ring.position.y=-1.8;rings.push(ring);scene.add(ring);}
 let yaw=-.1,pitch=0,drag=false,last=0,inView=false;const journey=host.closest('.journey');
 function resize(){const w=host.clientWidth,h=host.clientHeight;if(w<1||h<1)return;renderer.setSize(w,h);camera.aspect=w/h;camera.position.z=w/h<1?22:15.7;camera.updateProjectionMatrix();render();}
 function render(t=0){if(journey&&!drag){const step=Number(journey.dataset.active||1);yaw=[0,-.1,.85,1.9][step];}boat.rotation.y+=(yaw-boat.rotation.y)*.065;boat.rotation.z=reduced.matches?0:Math.sin(t*.0006)*.012;boat.rotation.x=pitch;renderer.render(scene,camera);}
 const loop=t=>{if(inView&&!document.hidden)render(t);};
 let timer=null;function startLoop(){if(timer)cancelAnimationFrame(timer);if(reduced.matches)return;let prev=0;const frame=t=>{timer=requestAnimationFrame(frame);if(t-prev>(software?65:25)){prev=t;loop(t);}};timer=requestAnimationFrame(frame);}startLoop();
 const observer=new IntersectionObserver(es=>{inView=es[0].isIntersecting;if(inView)render();});observer.observe(host);
 new ResizeObserver(resize).observe(host);
 host.addEventListener('pointerdown',e=>{drag=true;last=e.clientX;host.setPointerCapture(e.pointerId);});
 host.addEventListener('pointermove',e=>{if(drag){yaw+=(e.clientX-last)*.009;last=e.clientX;render();}});
 host.addEventListener('pointerup',()=>{drag=false;});host.addEventListener('pointercancel',()=>{drag=false;});
 const turn=host.parentElement.querySelector('.ship-turn');turn?.addEventListener('click',()=>{yaw+=Math.PI/3;if(reduced.matches){boat.rotation.y=yaw;render();}});
 reduced.addEventListener('change',()=>{startLoop();render();});
 if(journey)new MutationObserver(()=>{if(reduced.matches){boat.rotation.y=[0,-.1,.85,1.9][Number(journey.dataset.active||1)];render();}}).observe(journey,{attributes:true,attributeFilter:['data-active']});
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();if(timer)cancelAnimationFrame(timer);host.dataset.mode='fallback';if(status)status.textContent='Vista ilustrada · Recarga para volver al 3D';});resize();
}
const lazy=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){lazy.unobserve(e.target);mount(e.target);}},{rootMargin:'200px'});document.querySelectorAll('[data-ship3d]').forEach(h=>lazy.observe(h));
