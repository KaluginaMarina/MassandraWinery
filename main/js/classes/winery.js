import THREE from "three.js";

const FACADE_COLOR=0xe0cfb1

export class Winery {

    constructor() {
        this.winery = this.createFacade();
    }

    createFacade() {
        var group = new THREE.Group();

        const geometry = new THREE.BoxGeometry(100, 20, 10);
        const material = new THREE.MeshBasicMaterial({color: FACADE_COLOR});
        const mainWall = new THREE.Mesh(geometry, material);
        mainWall.position.set(0, 0, -50);
        group.add(mainWall);

        const geometry1 = new THREE.BoxGeometry(10, 20, 50);
        const material1 = new THREE.MeshBasicMaterial({color: FACADE_COLOR});
        const leftWall = new THREE.Mesh(geometry1, material1);
        leftWall.position.set(-50, 0, -25);
        group.add(leftWall);

        const rightWall = new THREE.Mesh(geometry1, material1);
        rightWall.position.set(50, 0, -25);
        group.add(rightWall);

        const geometry2 = new THREE.BoxGeometry(30, 40, 10);
        const material2 = new THREE.MeshBasicMaterial({color: FACADE_COLOR});
        const tower = new THREE.Mesh(geometry2, material2);
        tower.position.set(0, 10, -50);
        group.add(tower);

        return group;
    }
}