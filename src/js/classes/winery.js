import {Group,
    BoxGeometry, MeshBasicMaterial, Mesh,
} from "three";

const FACADE_COLOR=0xe0cfb1

export default class Winery {

    constructor() {
        this.winery = this.createFacade();
    }

    createFacade() {
        var group = new Group();

        const geometry = new BoxGeometry(200  , 20, 10);
        const material = new MeshBasicMaterial({color: FACADE_COLOR});
        const mainWall = new Mesh(geometry, material);
        mainWall.position.set(0, 0, -100);
        group.add(mainWall);

        const geometry1 = new BoxGeometry(30, 20, 50);
        const material1 = new MeshBasicMaterial({color: FACADE_COLOR});
        const leftWall = new Mesh(geometry1, material1);
        leftWall.position.set(-100, 0, -75);
        group.add(leftWall);

        const rightWall = new Mesh(geometry1, material1);
        rightWall.position.set(100, 0, -75);
        group.add(rightWall);

        const geometry2 = new BoxGeometry(30, 50, 10);
        const material2 = new MeshBasicMaterial({color: FACADE_COLOR});
        const tower = new Mesh(geometry2, material2);
        tower.position.set(0, 15, -100);
        group.add(tower);

        return group;
    }
}