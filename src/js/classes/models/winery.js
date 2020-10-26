import {
    BoxGeometry,
    DoubleSide,
    EquirectangularReflectionMapping,
    Group,
    Mesh,
    MeshBasicMaterial,
    MeshStandardMaterial,
    PlaneGeometry,
    TextureLoader
} from "three";
import {CSG} from "three-csg-ts";
import skyPanoImg from "../../../resources/img/sky-dome-panorma.jpg";

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

        // ====================================================
        // create main wall
        // ====================================================
        let mainWallMesh = this.createMainWall(facadeMaterial);

        // set windows
        for (var i = 0; i < 19; ++i) {
            let window = this.createWindow(-9 * LOGIC_CUBE_SIZE + LOGIC_CUBE_SIZE * i, 0, -40 + 4.4);
            group.add(window.clone());
        }

        group.add(mainWallMesh);

        // ===================================================
        // create leftWall
        // ====================================================
        let geometry1 = new BoxGeometry(3 * LOGIC_CUBE_SIZE, LOGIC_CUBE_SIZE, 11 * LOGIC_CUBE_SIZE);
        let leftWall = new Mesh(geometry1, facadeMaterial.clone());
        leftWall.position.set(-35, 0, -28);
        leftWall.castShadow = true;
        leftWall.receiveShadow = true;
        group.add(leftWall);

        // ====================================================
        // create right wall
        // ====================================================
        let rightWall = new Mesh(geometry1, facadeMaterial.clone());
        rightWall.position.set(35, 0, -28);
        rightWall.castShadow = true;
        rightWall.receiveShadow = true;
        group.add(rightWall);

        // ====================================================
        // create tower
        // ====================================================

        let tower = this.createTower(facadeMaterial);
        group.add(tower);

        // add floor in tower
        group.add(this.createFloor());

        // set windows
        for (var j = 1; j < 4; ++j) {
            for (var i = 0; i < 3; ++i) {
                let window = this.createWindow(-LOGIC_CUBE_SIZE + LOGIC_CUBE_SIZE * i, j * LOGIC_CUBE_SIZE, -40 + 4.4);
                group.add(window.clone());
            }
        }

        return group;
    }

    createWindow(x, y, z) {
        let windowGeometry = new BoxGeometry(0.3 * LOGIC_CUBE_SIZE, 0.6 * LOGIC_CUBE_SIZE, 0.1);
        let window = new Mesh(windowGeometry);

        let textureLoader = new TextureLoader();

        let textureCube = textureLoader.load(skyPanoImg, function () {
            window.material.needsUpdate = true;
        });

        window.material.color.setHex(0xffffff);
        window.material.transparent = true;
        window.material.opacity = 0.4;
        window.material.envMap = textureCube;
        textureCube.mapping = EquirectangularReflectionMapping;
        window.position.set(x, y, z);

        return window;
    }

    createFloor(){
        let group = new Group();
        let geometry = new PlaneGeometry(3 * LOGIC_CUBE_SIZE, 3 * LOGIC_CUBE_SIZE, 32);
        let floor = new Mesh(geometry, new MeshStandardMaterial({color: 0x888888, side: DoubleSide}));
        floor.castShadow = true;
        floor.receiveShadow = true;
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        floor.castShadow = true;

        floor.position.set(0, 4.5, -40);
        group.add(floor);

        let floor2 = floor.clone();
        floor.position.set(0, 7.5, -40);
        group.add(floor2);

        let floor3 = floor.clone();
        floor.position.set(0, 1.5, -40);
        group.add(floor2);
        return group;
    }
    createMainWall(facadeMaterial) {
        let mainWallGeometry = new BoxGeometry(26 * LOGIC_CUBE_SIZE, LOGIC_CUBE_SIZE, 3 * LOGIC_CUBE_SIZE);
        let mainWall = new Mesh(mainWallGeometry);
        mainWall.updateMatrix();

        let emptyCube = this.createEmptyBox(mainWall);

        // windows box
        let windowGeometry = new BoxGeometry(0.3 * LOGIC_CUBE_SIZE, 0.6 * LOGIC_CUBE_SIZE, 4);


        for (var i = 0; i < 19; i++) {
            let windowMash = new Mesh(windowGeometry.clone());
            windowMash.position.set(-9 * LOGIC_CUBE_SIZE + LOGIC_CUBE_SIZE * i, 0, 4.5);
            windowMash.updateMatrix();
            let subtract_bsp = CSG.fromMesh(windowMash);
            emptyCube = emptyCube.subtract(subtract_bsp);
        }

        // cut windows box
        let mainWallMesh = CSG.toMesh(emptyCube, mainWall.matrix);
        mainWallMesh.material = facadeMaterial;
        mainWallMesh.position.set(0, 0, -40);
        mainWallMesh.castShadow = true;
        mainWallMesh.receiveShadow = true;

        return mainWallMesh;
    }

    createTower(facadeMaterial) {
        let geometry2 = new BoxGeometry(3 * LOGIC_CUBE_SIZE, 4 * LOGIC_CUBE_SIZE, 3 * LOGIC_CUBE_SIZE);
        let tower = new Mesh(geometry2);
        tower.updateMatrix();

        let emptyTower = this.createEmptyBox(tower);

        let windowGeometrySmall = new BoxGeometry(0.3 * LOGIC_CUBE_SIZE, 0.6 * LOGIC_CUBE_SIZE, 5);
        for (var j = 0; j < 3; ++j) {
            for (var i = 0; i < 3; i++) {
                let windowMash = new Mesh(windowGeometrySmall.clone());
                windowMash.position.set(-LOGIC_CUBE_SIZE + LOGIC_CUBE_SIZE * i, -4 + j * LOGIC_CUBE_SIZE, 4.5);
                windowMash.updateMatrix();
                let subtract_bsp = CSG.fromMesh(windowMash);
                emptyTower = emptyTower.subtract(subtract_bsp);
            }
        }

        tower = CSG.toMesh(emptyTower, tower.matrix);
        tower.material = facadeMaterial;
        tower.position.set(0, 7, -40);
        tower.castShadow = true;
        tower.receiveShadow = true;

        return tower;
    }

    createEmptyBox(box){
        // iner box
        let cutgeo = box.clone();
        cutgeo.scale.multiplyScalar(0.95);
        cutgeo.updateMatrix();

        // cut inner box
        let cube_bsp = CSG.fromMesh(box);
        let subtract_bsp = CSG.fromMesh(cutgeo);
        return cube_bsp.subtract(subtract_bsp);
    }
}