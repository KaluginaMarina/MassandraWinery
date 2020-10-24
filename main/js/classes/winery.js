import THREE from "three.js";

const FACADE_COLOR=0xe0cfb1

export default class Winery {

    constructor() {
        this.winery = this.createFacade();
    }

    createFacade() {
        var group = new THREE.Group();

        const geometry = new THREE.BoxGeometry(200  , 20, 10);
        const material = new THREE.MeshBasicMaterial({color: FACADE_COLOR});
        const mainWall = new THREE.Mesh(geometry, material);
        mainWall.position.set(0, 0, -100);
        group.add(mainWall);

        const geometry1 = new THREE.BoxGeometry(30, 20, 50);
        const material1 = new THREE.MeshBasicMaterial({color: FACADE_COLOR});
        const leftWall = new THREE.Mesh(geometry1, material1);
        leftWall.position.set(-100, 0, -75);
        group.add(leftWall);

        const rightWall = new THREE.Mesh(geometry1, material1);
        rightWall.position.set(100, 0, -75);
        group.add(rightWall);

        const geometry2 = new THREE.BoxGeometry(30, 50, 10);
        const material2 = new THREE.MeshBasicMaterial({color: FACADE_COLOR});
        const tower = new THREE.Mesh(geometry2, material2);
        tower.position.set(0, 15, -100);
        group.add(tower);

        return group;
    }
}