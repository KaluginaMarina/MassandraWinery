import "./../css/style.css";

import {
  Scene,
  Clock,
  TextureLoader,
  SphereBufferGeometry,
  Mesh,
} from "three";
import { WEBGL } from "three/examples/jsm/WebGL.js";
import { THREEx } from "./libs/threex.skydomeshader";

import Controls from "./classes/controls";
import Renderer from "./classes/renderer";
import Camera from "./classes/camera";
import InteractionController from "./classes/interactionController";
import SnowParticles from "./utils/snowParticles";
import * as Lights from "./utils/lights";

import Winery from "./classes/winery";

if (WEBGL.isWebGLAvailable()) {
  init();
} else {
  const warning = WEBGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}

function init() {
  const container = document.body;
  const clock = new Clock();
  let delta = 0;

  const scene = new Scene();

  const renderer = new Renderer(container);
  const camera = new Camera(renderer.threeRenderer);
  const controls = new Controls(
    camera.threeCamera,
    renderer.threeRenderer.domElement
  );
  controls.threeControls.update();

  const textureLoader = new TextureLoader();

  // const particles = new Particles(scene);
  const particles = new SnowParticles(scene);

  // SKYBOX
  const skyGeo = new SphereBufferGeometry(400, 32, 15);
  const skyMat = THREEx.skyDomeShaderMaterial();

  const sky = new Mesh(skyGeo, skyMat);
  scene.add(sky);

  Lights.default(scene);


  scene.add(new Winery().winery);

  new InteractionController(scene, camera.threeCamera, container);

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
