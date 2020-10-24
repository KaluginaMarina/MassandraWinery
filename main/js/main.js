window.onload = function () {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    renderCube(scene, camera, renderer)
}

function renderCube(scene, camera, renderer){

    const geometry = new THREE.BoxGeometry( 10, 10, 10);
    const material = new THREE.MeshBasicMaterial( { color: 0x123456 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 25;

    function render() {
        requestAnimationFrame( render );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
    render();
}
