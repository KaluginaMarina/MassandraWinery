import {Group,
    BoxGeometry, MeshBasicMaterial, Mesh,
} from "three";

const FACADE_COLOR=0xe0cfb1;
const LOGIC_CUBE_SIZE = 3;

export default class Winery {

    constructor() {
        this.winery = this.createFacade();
    }

    createFacade() {
        var group = new Group();

        const geometry = new BoxGeometry(26 * LOGIC_CUBE_SIZE  , LOGIC_CUBE_SIZE, 3 * LOGIC_CUBE_SIZE);
        const material = new MeshBasicMaterial({color: FACADE_COLOR});
        const mainWall = new Mesh(geometry, material);
        mainWall.position.set(0, 0, -40);
        group.add(mainWall);

        const geometry1 = new BoxGeometry(3 * LOGIC_CUBE_SIZE, LOGIC_CUBE_SIZE, 11 * LOGIC_CUBE_SIZE);
        const material1 = new MeshBasicMaterial({color: FACADE_COLOR});
        const leftWall = new Mesh(geometry1, material1);
        leftWall.position.set(-34, 0, -28);
        group.add(leftWall);

        const rightWall = new Mesh(geometry1, material1);
        rightWall.position.set(34, 0, -28);
        group.add(rightWall);

        const geometry2 = new BoxGeometry(3 * LOGIC_CUBE_SIZE, 5 * LOGIC_CUBE_SIZE, 3 * LOGIC_CUBE_SIZE);
        const material2 = new MeshBasicMaterial({color: FACADE_COLOR});
        const tower = new Mesh(geometry2, material2);
        tower.position.set(0, 6, -40);
        group.add(tower);

        return group;
    }
}