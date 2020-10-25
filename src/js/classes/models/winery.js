import {Group,
    BoxGeometry, MeshBasicMaterial, Mesh,
} from "three";

const FACADE_COLOR=0xe0cfb1;
const LOGIC_CUBE_SIZE = 3;

export default class Winery {

    constructor() {
        this.winery = this.createWinery();
    }

    createWinery(){
        var group = new Group();
        group.add(this.createFacade());
        group.add(this.createWindow());
        return group;
    }

    createFacade() {
        var group = new Group();

        const geometry = new BoxGeometry(26 * LOGIC_CUBE_SIZE  , LOGIC_CUBE_SIZE, 3 * LOGIC_CUBE_SIZE);
        const facadeMaterial = new MeshBasicMaterial({color: FACADE_COLOR});
        const mainWall = new Mesh(geometry, facadeMaterial);
        mainWall.position.set(0, 0, -40);
        group.add(mainWall);

        const geometry1 = new BoxGeometry(3 * LOGIC_CUBE_SIZE, LOGIC_CUBE_SIZE, 11 * LOGIC_CUBE_SIZE);
        const leftWall = new Mesh(geometry1, facadeMaterial.clone());
        leftWall.position.set(-34, 0, -28);
        group.add(leftWall);

        const rightWall = new Mesh(geometry1, facadeMaterial.clone());
        rightWall.position.set(34, 0, -28);
        group.add(rightWall);

        const geometry2 = new BoxGeometry(3 * LOGIC_CUBE_SIZE, 5 * LOGIC_CUBE_SIZE, 3 * LOGIC_CUBE_SIZE);
        const tower = new Mesh(geometry2, facadeMaterial.clone());
        tower.position.set(0, 6, -40);
        group.add(tower);

        return group;
    }

    createWindow() {
        var group = new Group();

        const windowGeometry = new BoxGeometry(0.3 * LOGIC_CUBE_SIZE, 0.6 * LOGIC_CUBE_SIZE, 0.1);
        const windowMaterial = new MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            wireframe: false,
            opacity: 0.4,
        });
        const window = new Mesh(windowGeometry, windowMaterial);
        window.position.set(0, 0, 0);
        group.add(window);

        return group;
    }
}