import THREE from "three.js";
import Winery from "./classes/winery"
import Controls from "./classes/control";
import Camera from "./classes/camera";
import Renderer from "./classes/renderer";


window.onload = function () {

    const container = document.body;

    var scene = new THREE.Scene();

    var renderer = new Renderer(container);
    var camera = new Camera(renderer.threeRenderer);
    var controls = new Controls(camera.threeCamera, renderer.threeRenderer.domElement);

    renderer.threeRenderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.threeRenderer.domElement);

    var winery = new Winery();

    scene.add(winery.winery);

    camera.threeCamera.position.z = 25;

    renderer.threeRenderer.render(scene, camera.threeCamera);

    function animate() {
        requestAnimationFrame(animate);
        controls.threeControls.update();
        renderer.threeRenderer.render(scene, camera.threeCamera);
    }

    animate();
}

