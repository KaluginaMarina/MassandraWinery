import {
    Group,
    BoxGeometry, MeshBasicMaterial, Mesh, ShadowMaterial, MeshStandardMaterial
} from "three";
import {CSG} from "three-csg-ts";

const FACADE_COLOR = 0xe0cfb1;
const LOGIC_CUBE_SIZE = 3;

export default class Winery {

    constructor() {
        this.winery = this.createWinery();
    }

    createWinery() {
        var group = new Group();

        group.add(this.createFacade());
        return group;
    }

    createFacade() {
        const facadeMaterial = new MeshStandardMaterial({
            color: FACADE_COLOR,
            reflectivity: 0.8
        });

        const group = new Group();

        // create main wall
        const geometry = new BoxGeometry(26 * LOGIC_CUBE_SIZE, LOGIC_CUBE_SIZE, 3 * LOGIC_CUBE_SIZE);
        const mainWall = new Mesh(geometry);
        mainWall.updateMatrix();

        // inner box
        const cutgeo = mainWall.clone();
        cutgeo.scale.multiplyScalar(0.95);
        cutgeo.updateMatrix();

        // cut inner box
        var cube_bsp = CSG.fromMesh(mainWall);
        var subtract_bsp = CSG.fromMesh(cutgeo);
        const emptyCube = cube_bsp.subtract(subtract_bsp);

        // window box
        const windowGeometry = new BoxGeometry(0.3 * LOGIC_CUBE_SIZE, 0.6 * LOGIC_CUBE_SIZE, 3);
        const windowMash = new Mesh(windowGeometry);
        windowMash.updateMatrix();
        windowMash.position.set(10,0,4);

        // group.add(mainWall.clone());
        // group.add(windowMash);



        // cut windows box
        subtract_bsp = CSG.fromMesh(windowMash);
        var cubeWithWind = emptyCube.subtract(subtract_bsp);

        const mainWallMesh = CSG.toMesh(cubeWithWind, mainWall.matrix);
        mainWallMesh.material = facadeMaterial;
        mainWallMesh.position.set(0, 0, -40);
        mainWallMesh.castShadow = true;
        mainWallMesh.receiveShadow = true;

        group.add(mainWallMesh);

        const geometry1 = new BoxGeometry(3 * LOGIC_CUBE_SIZE, LOGIC_CUBE_SIZE, 11 * LOGIC_CUBE_SIZE);
        const leftWall = new Mesh(geometry1, facadeMaterial.clone());
        leftWall.position.set(-35, 0, -28);
        leftWall.castShadow = true;
        leftWall.receiveShadow = true;
        group.add(leftWall);

        const rightWall = new Mesh(geometry1, facadeMaterial.clone());
        rightWall.position.set(35, 0, -28);
        rightWall.castShadow = true;
        rightWall.receiveShadow = true;
        group.add(rightWall);

        const geometry2 = new BoxGeometry(3 * LOGIC_CUBE_SIZE, 4 * LOGIC_CUBE_SIZE, 3 * LOGIC_CUBE_SIZE);
        const tower = new Mesh(geometry2, facadeMaterial.clone());
        tower.position.set(0, 6, -40);
        tower.castShadow = true;
        tower.receiveShadow = true;
        group.add(tower);

        return group;
    }

    createWindow(x, y, z) {
        var group = new Group();

        const windowGeometry = new BoxGeometry(0.3 * LOGIC_CUBE_SIZE, 0.6 * LOGIC_CUBE_SIZE, 0.1);
        const windowMaterial = new MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            wireframe: false,
            opacity: 0.4,
        });
        const window = new Mesh(windowGeometry, windowMaterial);
        window.position.set(x, y, z);
        group.add(window);

        return group;
    }
}