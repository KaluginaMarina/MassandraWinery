import THREE from "three.js";

export class Primitive {

    constructor() {}

    renderCube() {
        const geometry = new THREE.BoxGeometry(10, 10, 10);
        const material = new THREE.MeshBasicMaterial({color: 0x123456});
        return new THREE.Mesh(geometry, material);
    }

    renderSmallCube() {
        const geometry = new THREE.BoxGeometry(1, 11, 1);
        const material = new THREE.MeshBasicMaterial({color: 0x111111});
        return new THREE.Mesh(geometry, material);
    }

    renderGroupOfCube() {
        var group = new THREE.Group();
        group.add( this.renderCube() );
        group.add( this.renderSmallCube() );

        return group;
    }
}