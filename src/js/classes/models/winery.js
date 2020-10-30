import {
    BoxGeometry, CylinderBufferGeometry,
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

        group.add(this.createLeftWall(facadeMaterial));

        // set windows
        for (var i = 0; i < 3; ++i) {
            let window = this.createWindow(-LOGIC_CUBE_SIZE + LOGIC_CUBE_SIZE * i - 35, 0, 5 * LOGIC_CUBE_SIZE - 26.8);
            group.add(window.clone());
        }

        for (var i = 0; i < 10; i++) {
            let window = this.createWindow(4.5 - 35.2, 0, -4 * LOGIC_CUBE_SIZE + LOGIC_CUBE_SIZE * i - 28);
            window.rotateY(Math.PI / 2)
            group.add(window.clone());
        }


        // ====================================================
        // create right wall
        // ====================================================
        group.add(this.createRightWall(facadeMaterial));

        // set windows
        for (var i = 0; i < 3; ++i) {
            let window = this.createWindow(-LOGIC_CUBE_SIZE + LOGIC_CUBE_SIZE * i + 35, 0, 5 * LOGIC_CUBE_SIZE - 26.8);
            group.add(window.clone());
        }

        for (var i = 0; i < 10; i++) {
            let window = this.createWindow(-4.5 + 35.2, 0, -4 * LOGIC_CUBE_SIZE + LOGIC_CUBE_SIZE * i - 28);
            window.rotateY(Math.PI / 2)
            group.add(window.clone());
        }

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

        // ====================================================
        // Create roof
        // ====================================================
        group.add(this.createRoof())

        // ====================================================
        // add rooms
        // ====================================================
        group.add(this.addRooms());

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

    createLeftWall(facadeMaterial) {
        let group = new Group();
        let geometry1 = new BoxGeometry(3 * LOGIC_CUBE_SIZE, LOGIC_CUBE_SIZE, 11 * LOGIC_CUBE_SIZE);
        let leftWall = new Mesh(geometry1, facadeMaterial.clone());
        leftWall.updateMatrix();

        let emptyCube = this.createEmptyBox(leftWall);

        // windows box
        let windowGeometry = new BoxGeometry(0.3 * LOGIC_CUBE_SIZE, 0.6 * LOGIC_CUBE_SIZE, 4);

        for (var i = 0; i < 3; ++i) {
            let windowMash = new Mesh(windowGeometry.clone());
            windowMash.position.set(-LOGIC_CUBE_SIZE + LOGIC_CUBE_SIZE * i, 0, 5 * LOGIC_CUBE_SIZE);
            windowMash.updateMatrix();
            let subtract_bsp = CSG.fromMesh(windowMash);
            emptyCube = emptyCube.subtract(subtract_bsp);
        }

        for (var i = 0; i < 10; i++) {
            let windowMash = new Mesh(windowGeometry.clone());
            windowMash.rotateY(Math.PI / 2)
            windowMash.position.set(4.5, 0, -2 * LOGIC_CUBE_SIZE + LOGIC_CUBE_SIZE * i);
            windowMash.updateMatrix();
            let subtract_bsp = CSG.fromMesh(windowMash);
            emptyCube = emptyCube.subtract(subtract_bsp);
        }
        leftWall = CSG.toMesh(emptyCube, leftWall.matrix);
        leftWall.material = facadeMaterial;
        leftWall.position.set(-35, 0, -28);
        leftWall.castShadow = true;
        leftWall.receiveShadow = true;
        group.add(leftWall);

        return group;
    }

    createRightWall(facadeMaterial) {
        let group = new Group();
        let geometry1 = new BoxGeometry(3 * LOGIC_CUBE_SIZE, LOGIC_CUBE_SIZE, 11 * LOGIC_CUBE_SIZE);
        let rightWall = new Mesh(geometry1, facadeMaterial.clone());
        rightWall.updateMatrix();

        let emptyCube = this.createEmptyBox(rightWall);

        // windows box
        let windowGeometry = new BoxGeometry(0.3 * LOGIC_CUBE_SIZE, 0.6 * LOGIC_CUBE_SIZE, 4);

        for (var i = 0; i < 3; ++i) {
            let windowMash = new Mesh(windowGeometry.clone());
            windowMash.position.set(-LOGIC_CUBE_SIZE + LOGIC_CUBE_SIZE * i, 0, 5 * LOGIC_CUBE_SIZE);
            windowMash.updateMatrix();
            let subtract_bsp = CSG.fromMesh(windowMash);
            emptyCube = emptyCube.subtract(subtract_bsp);
        }

        for (var i = 0; i < 10; i++) {
            let windowMash = new Mesh(windowGeometry.clone());
            windowMash.rotateY(Math.PI / 2)
            windowMash.position.set(-4.5, 0, -2 * LOGIC_CUBE_SIZE + LOGIC_CUBE_SIZE * i);
            windowMash.updateMatrix();
            let subtract_bsp = CSG.fromMesh(windowMash);
            emptyCube = emptyCube.subtract(subtract_bsp);
        }
        rightWall = CSG.toMesh(emptyCube, rightWall.matrix);
        rightWall.material = facadeMaterial;
        rightWall.position.set(35, 0, -28);
        rightWall.castShadow = true;
        rightWall.receiveShadow = true;
        group.add(rightWall);

        return group;
    }

    createFloor() {
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
        group.add(floor3);
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

    createEmptyBox(box) {
        // iner box
        let cutgeo = box.clone();
        cutgeo.scale.multiplyScalar(0.95);
        cutgeo.updateMatrix();

        // cut inner box
        let cube_bsp = CSG.fromMesh(box);
        let subtract_bsp = CSG.fromMesh(cutgeo);
        return cube_bsp.subtract(subtract_bsp);
    }

    createRoof() {
        let group = new Group();

        // Tower roof
        let roofGeometry = new CylinderBufferGeometry(0, LOGIC_CUBE_SIZE * 2.2, 4, 4);
        let cylinder = new Mesh(roofGeometry, new MeshStandardMaterial());
        cylinder.material.color.setHex(0xffffff);
        cylinder.rotation.y = (45 * Math.PI) / 180;
        cylinder.position.set(0, LOGIC_CUBE_SIZE * 5, -40);
        cylinder.matrixAutoUpdate = false;
        cylinder.updateMatrix();
        group.add(cylinder);

        let roofGeometry2 = new CylinderBufferGeometry(3, LOGIC_CUBE_SIZE * 2.2, 2, 4);
        var cylinder2 = new Mesh(roofGeometry2);
        cylinder2.rotation.y = (45 * Math.PI) / 180;
        cylinder2.updateMatrix();

        var res = CSG.fromMesh(cylinder2.clone());

        for (var i = 1; i < 11; ++i) {
            let geo = cylinder2.clone();
            geo.position.set(i * 3, 0, 0);
            geo.updateMatrix();
            let cube_bsp = CSG.fromMesh(geo);
            res = res.union(cube_bsp);
        }

        let box = new BoxGeometry(3 * LOGIC_CUBE_SIZE, 3.5 * LOGIC_CUBE_SIZE, 3.5 * LOGIC_CUBE_SIZE);
        let boxMesh = new Mesh(box);
        boxMesh.position.set(35.1, -3, 0);
        boxMesh.updateMatrix();

        let boxCSG = CSG.fromMesh(boxMesh);
        res = res.subtract(boxCSG);

        cylinder2 = CSG.toMesh(res, cylinder2.matrix);
        cylinder2.material.color.setHex(0xffffff);
        cylinder2.material = new MeshStandardMaterial();
        cylinder2.castShadow = true;
        cylinder2.receiveShadow = true;
        cylinder2.position.set(-LOGIC_CUBE_SIZE * 11.7, LOGIC_CUBE_SIZE - 0.5, -40);
        cylinder2.updateMatrix();
        group.add(cylinder2);

        let cylinder3 = cylinder2.clone();
        cylinder3.rotateY(Math.PI);
        cylinder3.position.set(LOGIC_CUBE_SIZE * 11.7, LOGIC_CUBE_SIZE - 0.5, -40);
        group.add(cylinder3);

        let cylinder4 = cylinder3.clone();
        cylinder4.rotateY(-Math.PI / 2);
        cylinder4.position.set(LOGIC_CUBE_SIZE * 11.7, LOGIC_CUBE_SIZE - 0.5, -16);

        let boxMesh1 = new Mesh(new BoxGeometry(10, 10, 10));
        boxMesh1.position.set(LOGIC_CUBE_SIZE * 11.7, LOGIC_CUBE_SIZE - 0.5, -43);

        cylinder4 = this.substr(cylinder4, boxMesh1);
        cylinder4.material.color.setHex(0xffffff);
        cylinder4.material = new MeshStandardMaterial();
        cylinder4.castShadow = true;
        cylinder4.receiveShadow = true;
        cylinder4.updateMatrix();
        group.add(cylinder4);

        let cylinder5 = cylinder4.clone();
        cylinder5.position.set(-LOGIC_CUBE_SIZE * 11.7, LOGIC_CUBE_SIZE - 0.5, -16);
        group.add(cylinder5);
        return group;
    }

    substr(mesh1, mesh2) {
        mesh1.updateMatrix();
        mesh2.updateMatrix();
        let box = CSG.fromMesh(mesh1);
        let cut = CSG.fromMesh(mesh2);
        return CSG.toMesh(box.subtract(cut), mesh1.matrix);
    }

    addRooms() {
        let group = new Group();
        let geometry = new PlaneGeometry(LOGIC_CUBE_SIZE, 3 * LOGIC_CUBE_SIZE, 32);
        let room = new Mesh(geometry, new MeshStandardMaterial({color: 0x888888, side: DoubleSide}));
        room.rotateZ(Math.PI / 2)
        room.rotateX(Math.PI / 2);
        room.castShadow = true;
        room.receiveShadow = true;
        room.receiveShadow = true;
        room.castShadow = true;

        for (var i = -3; i < 3; ++i) {
            room.position.set(-4.5 - 3 * LOGIC_CUBE_SIZE * i, 0, -40);
            group.add(room.clone());
        }

        room.rotateX(Math.PI / 2);
        room.position.set(35, 0, -28 + 3 * LOGIC_CUBE_SIZE - 1.5);
        group.add(room.clone());

        room.position.set(-35, 0, -28 + 3 * LOGIC_CUBE_SIZE - 1.5);
        group.add(room.clone());
        return group;
    }
}