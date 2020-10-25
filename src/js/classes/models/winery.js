import {
    Group,
    BoxGeometry, MeshBasicMaterial, Mesh, ShadowMaterial, MeshStandardMaterial, Geometry
} from "three";
import {CSG} from "three-csg-ts";

let FACADE_COLOR = 0xe0cfb1;
let LOGIC_CUBE_SIZE = 3;

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
        let facadeMaterial = new MeshStandardMaterial({
            color: FACADE_COLOR,
            reflectivity: 0.8
        });

        let group = new Group();

        // create main wall
        let mainWallGeometry = new BoxGeometry(26 * LOGIC_CUBE_SIZE, LOGIC_CUBE_SIZE, 3 * LOGIC_CUBE_SIZE);
        let mainWall = new Mesh(mainWallGeometry);
        mainWall.updateMatrix();

        // inner box
        let cutgeo = mainWall.clone();
        cutgeo.scale.multiplyScalar(0.95);
        cutgeo.updateMatrix();

        // cut inner box
        let cube_bsp = CSG.fromMesh(mainWall);
        let subtract_bsp = CSG.fromMesh(cutgeo);
        let emptyCube = cube_bsp.subtract(subtract_bsp);

        // windows box
        let windowGeometry = new BoxGeometry(0.3 * LOGIC_CUBE_SIZE, 0.6 * LOGIC_CUBE_SIZE, 40);

        // for (var i = 0; i < 19; ++i){
        //     let windowMash = new Mesh(windowGeometry.clone());
        //     windowMash.position.set(-9 * LOGIC_CUBE_SIZE + LOGIC_CUBE_SIZE * i, 0, -40 + 4.5);
        //     windowMash.updateMatrix();
        //
        //     subtract_bsp = CSG.fromMesh(windowMash);
        //     emptyCube = emptyCube.subtract(subtract_bsp);
        // }

        // cut windows box
        let windowMash = new Mesh(windowGeometry);
        windowMash.position.set(0, 0, -40 + 4.5);
        windowMash.updateMatrix();

        subtract_bsp = CSG.fromMesh(windowMash);
        let cubeWithWind = emptyCube.subtract(subtract_bsp);

        let mainWallMesh = CSG.toMesh(cubeWithWind, mainWall.matrix);
        mainWallMesh.material = facadeMaterial;
        mainWallMesh.position.set(0, 0, -40);
        mainWallMesh.castShadow = true;
        mainWallMesh.receiveShadow = true;

        for (var i = 0; i < 19; ++i) {
            let window = this.createWindow(-9 * LOGIC_CUBE_SIZE + LOGIC_CUBE_SIZE * i, 0, -40 + 4.5);
            group.add(window.clone());
        }
        group.add(mainWallMesh);

        let geometry1 = new BoxGeometry(3 * LOGIC_CUBE_SIZE, LOGIC_CUBE_SIZE, 11 * LOGIC_CUBE_SIZE);
        let leftWall = new Mesh(geometry1, facadeMaterial.clone());
        leftWall.position.set(-35, 0, -28);
        leftWall.castShadow = true;
        leftWall.receiveShadow = true;
        group.add(leftWall);

        let rightWall = new Mesh(geometry1, facadeMaterial.clone());
        rightWall.position.set(35, 0, -28);
        rightWall.castShadow = true;
        rightWall.receiveShadow = true;
        group.add(rightWall);

        let geometry2 = new BoxGeometry(3 * LOGIC_CUBE_SIZE, 4 * LOGIC_CUBE_SIZE, 3 * LOGIC_CUBE_SIZE);
        let tower = new Mesh(geometry2, facadeMaterial.clone());
        tower.position.set(0, 7, -40);
        tower.castShadow = true;
        tower.receiveShadow = true;
        group.add(tower);

        return group;
    }

    createWindow(x, y, z) {

        let windowGeometry = new BoxGeometry(0.3 * LOGIC_CUBE_SIZE, 0.6 * LOGIC_CUBE_SIZE, 0.1);
        let windowMaterial = new MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            wireframe: false,
            opacity: 0.4,
        });
        let window = new Mesh(windowGeometry, windowMaterial);
        window.position.set(x, y, z);

        return window;
    }
}