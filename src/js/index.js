import "./../css/style.css";

import {
  Scene,
  Clock,
  TextureLoader,
  SphereBufferGeometry,
  Mesh,
  CameraHelper, BoxGeometry, MeshBasicMaterial, PlaneGeometry, MeshPhongMaterial, MeshStandardMaterial, SphereGeometry,
} from "three";
import { WEBGL } from "three/examples/jsm/WebGL.js";
import { THREEx } from "./libs/threex.skydomeshader";

import Controls from "./classes/controllers/controls";
import Renderer from "./classes/controllers/renderer";
import Camera from "./classes/controllers/camera";
import InteractionController from "./classes/controllers/interactionController";
import SnowParticles from "./utils/snowParticles";
import * as Lights from "./utils/lights";
import * as Ground from "./utils/ground";

import Winery from "./classes/models/winery";
import Moon from "./classes/models/moon";

if (WEBGL.isWebGLAvailable()) {
  init();
} else {
  let warning = WEBGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}

function init() {
  let container = document.body;
  let clock = new Clock();
  let delta = 0;

  let scene = new Scene();

  let renderer = new Renderer(container);
  let camera = new Camera(renderer.threeRenderer);
  let controls = new Controls(
    camera.threeCamera,
    renderer.threeRenderer.domElement
  );
  controls.threeControls.update();

  // let particles = new Particles(scene);
  let particles = new SnowParticles(scene);

  // SKYBOX
  let skyGeo = new SphereBufferGeometry(400, 32, 15);
  let skyMat = THREEx.skyDomeShaderMaterial();

  let sky = new Mesh(skyGeo, skyMat);
  scene.add(sky);

  // GROUND
  scene.add(Ground.default());

  Lights.default(scene);

  // MOON
  scene.add(new Moon().moon);

  scene.add(new Winery().winery);

  // new InteractionController(scene, camera.threeCamera, container);

  function update(delta) {
    particles.update(delta);
    controls.threeControls.update();
  }

  function animate() {
    requestAnimationFrame(animate);
    delta = clock.getDelta();
    update(delta);
    renderer.render(scene, camera.threeCamera);
  }

  animate();
}
