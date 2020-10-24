import OrbitControls from "orbit-controls-es6";
import THREE from "three.js";
import {Winery} from "./classes/winery"

var scene;
var camera;
var renderer;
var controls;

window.onload = function () {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    controls = new OrbitControls(camera, renderer.domElement);

    animate();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var winery = new Winery();

    scene.add(winery.winery);

    camera.position.z = 25;
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}