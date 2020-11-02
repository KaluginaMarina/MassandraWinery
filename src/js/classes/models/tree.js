import {CylinderGeometry, Group, Mesh, MeshLambertMaterial, MeshPhysicalMaterial} from "three";

export default class Tree {

    // x, y, z - position
    // x1, y1, z1 - сжатие ели по x, y, z
    constructor(x, y, z, x1, y1, z1) {
        this.tree = this.createTree();
        this.tree.position.set(x, y, z);
        this.tree.scale.set(0.2 * x1, 0.2 * y1, 0.2 * z1);
    }

    createTree() {
        let group = new Group();

        let brownMaterial = new MeshPhysicalMaterial({color: 0x3d2817}); // brown
        let greenMaterial = new MeshPhysicalMaterial({color: 0x2d4c1e}); // green

        let c0 = new Mesh(new CylinderGeometry(2, 2, 12, 6, 1, true), brownMaterial);
        c0.position.y = 6;
        c0.receiveShadow = true;
        c0.castShadow = true;
        let c1 = new Mesh(new CylinderGeometry(0, 10, 14, 8), greenMaterial);
        c1.position.y = 18;
        c1.receiveShadow = true;
        c1.castShadow = true;
        c1.material = greenMaterial
        let c2 = new Mesh(new CylinderGeometry(0, 8, 13, 8), greenMaterial);
        c2.position.y = 25;
        c2.receiveShadow = true;
        c2.castShadow = true;
        let c3 = new Mesh(new CylinderGeometry(0, 6, 12, 8), greenMaterial);
        c3.position.y = 32;
        c3.receiveShadow = true;
        c3.castShadow = true;

        group.add(c0);
        group.add(c1);
        group.add(c2);
        group.add(c3);
        return group;
    }
}