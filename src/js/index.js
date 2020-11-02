import "./../css/style.css";

import {
    Scene,
    Clock,
    SphereBufferGeometry,
    Mesh, AudioLoader, Audio, AudioListener
} from "three";
import {WEBGL} from "three/examples/jsm/WebGL.js";
import {THREEx} from "./libs/threex.skydomeshader";

import Controls from "./classes/controllers/controls";
import Renderer from "./classes/controllers/renderer";
import Camera from "./classes/controllers/camera";
import InteractionController from "./classes/controllers/interactionController";
import SnowParticles from "./utils/snowParticles";
import * as Lights from "./utils/lights";

import * as Ground from "./utils/ground";

import Winery from "./classes/models/winery";
import Moon from "./classes/models/moon";
import {LightsAnimations} from "./classes/models/lightsAnimations";
import * as TWEEN from "@tweenjs/tween.js";
import Bird from "./classes/models/bird";
import TowerClock from "./classes/models/clock";
import Tree from "./classes/models/tree";

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

    // BIRDS
    let birds = [new Bird(scene, -20, -1.2, -20, 10, 1, -Math.PI / 8),
        new Bird(scene, -16, -1.2, -16, 20, 1.1, Math.PI / 8),
        new Bird(scene, -33, 3.8, -33, 15, 0.8, Math.PI / 8),
        new Bird(scene, -14, -1.2, -23, 25, 0.9, 5 / 4 * Math.PI),
    ];

    let particles = new SnowParticles(scene);

    // SKYBOX
    let skyGeo = new SphereBufferGeometry(400, 32, 15);
    let skyMat = THREEx.skyDomeShaderMaterial();

    let sky = new Mesh(skyGeo, skyMat);
    scene.add(sky);

    // GROUND
    scene.add(Ground.default());

    // LIGHTS
    Lights.default(scene);
    let lights = [new LightsAnimations(-35, 0, -28, scene),
        new LightsAnimations(0, 0, -40, scene),
        new LightsAnimations(6, 0, -40, scene),
        new LightsAnimations(12, 0, -40, scene),
        new LightsAnimations(18, 0, -40, scene),
        new LightsAnimations(-6, 0, -40, scene),
        new LightsAnimations(-12, 0, -40, scene),
        new LightsAnimations(-18, 0, -40, scene),
        new LightsAnimations(-24, 0, -40, scene),
        new LightsAnimations(24, 0, -40, scene),
        new LightsAnimations(0, 3, -40, scene),
        new LightsAnimations(0, 9, -40, scene),
        new LightsAnimations(35, 0, -28, scene),
        new LightsAnimations(-35, 0, -18, scene),
        new LightsAnimations(35, 0, -18, scene)
    ];

    // MOON
    scene.add(new Moon().moon);

    // WINERY
    scene.add(new Winery(true, camera.threeCamera).winery);

    let winery = new Winery(false, camera.threeCamera).winery;
    winery.rotateX(Math.PI);
    winery.rotateZ(Math.PI);
    scene.add(winery);

    // CLOCK
    let towerClock = new TowerClock();
    scene.add(towerClock.clock);
    scene.add(towerClock.arrowS);
    scene.add(towerClock.arrowM);

    // DOOR MOVEMENT
    new InteractionController(scene, camera.threeCamera, container);

    // TREE
    scene.add(new Tree(-23, -2.5, -30, 1.3, 1.3, 1.3).tree);
    scene.add(new Tree(23, -2.5, -30, 1.3, 1.3, 1.3).tree);
    scene.add(new Tree(23, -2.5, 30, 1.3, 1.3, 1.3).tree);
    scene.add(new Tree(26, -2.5, 33, 1.3, 1.5, 1.3).tree);
    scene.add(new Tree(-26, -2.5, 33, 1.3, 1.5, 1.3).tree);
    scene.add(new Tree(-23, -2.5, 30, 1.3, 1.3, 1.3).tree);
    scene.add(new Tree(-25, -2.3, 25, 0.9, 1.1, 0.9).tree);

    var i = 0;

    function update(delta) {
        TWEEN.update();
        particles.update(delta);
        controls.threeControls.update();
        if (i++ % 10 === 0) {
            for (var l in lights) {
                lights[l].checkLights();
            }
        }
        towerClock.updateArrow();
        for (var bird in birds) {
            birds[bird].update();
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        delta = clock.getDelta();
        update(delta);
        renderer.render(scene, camera.threeCamera);
    }

    animate();
}
