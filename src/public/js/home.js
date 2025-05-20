console.log("Home frontend javascript file");

// function fitElementToParent(el, padding) {
//   let timeout = null;

//   function resize() {
//     if (timeout) clearTimeout(timeout);
//     anime.set(el, { scale: 1 });
//     let pad = padding || 0;
//     let parentEl = el.parentNode;
//     let elOffsetWidth = el.offsetWidth - pad;
//     let parentOffsetWidth = parentEl.offsetWidth;
//     let ratio = parentOffsetWidth / elOffsetWidth;
//     timeout = setTimeout(anime.set(el, { scale: ratio }), 10);
//   }

//   resize();
//   window.addEventListener("resize", resize);
// }

// (function () {
//   const sphereEl = document.querySelector(".sphere-animation");
//   const spherePathEls = sphereEl.querySelectorAll(".sphere path");
//   const pathLength = spherePathEls.length;
//   const animations = [];

//   fitElementToParent(sphereEl);

//   const breathAnimation = anime({
//     begin: function () {
//       for (let i = 0; i < pathLength; i++) {
//         animations.push(
//           anime({
//             targets: spherePathEls[i],
//             stroke: {
//               value: ["rgba(255,75,75,1)", "rgba(80,80,80,.35)"],
//               duration: 500,
//             },
//             translateX: [2, -4],
//             translateY: [2, -4],
//             easing: "easeOutQuad",
//             autoplay: false,
//           })
//         );
//       }
//     },
//     update: function (ins) {
//       animations.forEach(function (animation, i) {
//         let percent = (1 - Math.sin(i * 0.35 + 0.0022 * ins.currentTime)) / 2;
//         animation.seek(animation.duration * percent);
//       });
//     },
//     duration: Infinity,
//     autoplay: false,
//   });

//   const introAnimation = anime
//     .timeline({
//       autoplay: false,
//     })
//     .add(
//       {
//         targets: spherePathEls,
//         strokeDashoffset: {
//           value: [anime.setDashoffset, 0],
//           duration: 3900,
//           easing: "easeInOutCirc",
//           delay: anime.stagger(190, { direction: "reverse" }),
//         },
//         duration: 2000,
//         delay: anime.stagger(60, { direction: "reverse" }),
//         easing: "linear",
//       },
//       0
//     );

//   const shadowAnimation = anime(
//     {
//       targets: "#sphereGradient",
//       x1: "25%",
//       x2: "25%",
//       y1: "0%",
//       y2: "75%",
//       duration: 30000,
//       easing: "easeOutQuint",
//       autoplay: false,
//     },
//     0
//   );

//   function init() {
//     introAnimation.play();
//     breathAnimation.play();
//     shadowAnimation.play();
//   }

//   init();
// })();
import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import {OrbitControls} from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls";

console.clear();

let scene = new THREE.Scene();
scene.background = new THREE.Color(0x160016);
let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
camera.position.set(0, 4, 21);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener("resize", event => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
})

let controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;

let gu = {
  time: {value: 0}
}

let sizes = [];
let shift = [];
let pushShift = () => {
  shift.push(
    Math.random() * Math.PI, 
    Math.random() * Math.PI * 2, 
    (Math.random() * 0.9 + 0.1) * Math.PI * 0.1,
    Math.random() * 0.9 + 0.1
  );
}
let pts = new Array(50000).fill().map(p => {
  sizes.push(Math.random() * 1.5 + 0.5);
  pushShift();
  return new THREE.Vector3().randomDirection().multiplyScalar(Math.random() * 0.5 + 9.5);
})
for(let i = 0; i < 100000; i++){
  let r = 10, R = 40;
  let rand = Math.pow(Math.random(), 1.5);
  let radius = Math.sqrt(R * R * rand + (1 - rand) * r * r);
  pts.push(new THREE.Vector3().setFromCylindricalCoords(radius, Math.random() * 2 * Math.PI, (Math.random() - 0.5) * 2 ));
  sizes.push(Math.random() * 1.5 + 0.5);
  pushShift();
}

let g = new THREE.BufferGeometry().setFromPoints(pts);
g.setAttribute("sizes", new THREE.Float32BufferAttribute(sizes, 1));
g.setAttribute("shift", new THREE.Float32BufferAttribute(shift, 4));
let m = new THREE.PointsMaterial({
  size: 0.125,
  transparent: true,
  depthTest: false,
  blending: THREE.AdditiveBlending,
  onBeforeCompile: shader => {
    shader.uniforms.time = gu.time;
    shader.vertexShader = `
      uniform float time;
      attribute float sizes;
      attribute vec4 shift;
      varying vec3 vColor;
      ${shader.vertexShader}
    `.replace(
      `gl_PointSize = size;`,
      `gl_PointSize = size * sizes;`
    ).replace(
      `#include <color_vertex>`,
      `#include <color_vertex>
        float d = length(abs(position) / vec3(40., 10., 40));
        d = clamp(d, 0., 1.);
        vColor = mix(vec3(227., 155., 0.), vec3(100., 50., 255.), d) / 255.;
      `
    ).replace(
      `#include <begin_vertex>`,
      `#include <begin_vertex>
        float t = time;
        float moveT = mod(shift.x + shift.z * t, PI2);
        float moveS = mod(shift.y + shift.z * t, PI2);
        transformed += vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.w;
      `
    );
    //console.log(shader.vertexShader);
    shader.fragmentShader = `
      varying vec3 vColor;
      ${shader.fragmentShader}
    `.replace(
      `#include <clipping_planes_fragment>`,
      `#include <clipping_planes_fragment>
        float d = length(gl_PointCoord.xy - 0.5);
        //if (d > 0.5) discard;
      `
    ).replace(
      `vec4 diffuseColor = vec4( diffuse, opacity );`,
      `vec4 diffuseColor = vec4( vColor, smoothstep(0.5, 0.1, d)/* * 0.5 + 0.5*/ );`
    );
    //console.log(shader.fragmentShader);
  }
});
let p = new THREE.Points(g, m);
p.rotation.order = "ZYX";
p.rotation.z = 0.2;
scene.add(p)

let clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
  controls.update();
  let t = clock.getElapsedTime() * 0.5;
  gu.time.value = t * Math.PI;
  p.rotation.y = t * 0.05;
  renderer.render(scene, camera);
});