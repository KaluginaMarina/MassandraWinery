import {CylinderGeometry, Mesh, MeshPhongMaterial, Group, BoxGeometry} from "three";
import {CSG} from "three-csg-ts";

export default class TowerClock {
    constructor() {
        this.clock = this.createClock();
        this.arrowS = this.createArrow(true);
        this.arrowS.rotateZ(Math.PI / 2);
        this.arrowM = this.createArrow(false);
        this.arrowM.rotateZ(Math.PI / 2);
        this.second = 0;
        this.i = 0;
    }

    createClock() {
        let group = new Group();

        let geometry = new CylinderGeometry(2.1, 2.1, 0.1, 52);
        let material = new MeshPhongMaterial({color: 0x999999});
        let clock = new Mesh(geometry, material);
        clock.position.y -= 0.01;
        clock.castShadow = true;
        clock.receiveShadow = true;
        group.add(clock);

        geometry = new CylinderGeometry(2, 2, 0.1, 52)
        material = new MeshPhongMaterial({color: 0xffffff});
        clock = new Mesh(geometry, material);
        clock.castShadow = true;
        clock.receiveShadow = true;
        group.add(clock);

        let knobGeometry = new CylinderGeometry(0.1, 0.1, 0.01 * 2 * 1.5, 16);
        material = new MeshPhongMaterial({color: 0x444444});
        let knob = new Mesh(knobGeometry, material);
        knob.position.y += 0.1;
        group.add(knob);

        group.rotateX(Math.PI / 2);
        group.position.set(0, 10, -35.5);

        return group;
    }

    createArrow(isSec) {
        let size = 2.8;
        if (isSec) {
            size = 3.8;
        }
        let arrowGeometry = new BoxGeometry(size, 0.1, 0.05);
        let material = new MeshPhongMaterial({color: 0x444444});
        let arrow = new Mesh(arrowGeometry, material);

        let box = new Mesh(new BoxGeometry(4, 0.1, 0.05));
        box.position.x = -2;
        arrow = this.substr(arrow, box);
        arrow.material = material;
        arrow.castShadow = true;
        arrow.receiveShadow = true;
        arrow.position.set(0, 10, -35.4);
        return arrow;
    }

    updateArrow() {
        let cur_sec = parseInt(new Date().getTime() / 1000) % 60;
        if (cur_sec !== this.second) {
            this.i++;
            if (this.i % 60 === 0) {
                this.i = 0;
                this.arrowM.rotateZ(-Math.PI / 30);
            }
            this.second = cur_sec;
            this.arrowS.rotateZ(-Math.PI / 30);
        }
    }

    substr(mesh1, mesh2) {
        mesh1.updateMatrix();
        mesh2.updateMatrix();
        let box = CSG.fromMesh(mesh1);
        let cut = CSG.fromMesh(mesh2);
        return CSG.toMesh(box.subtract(cut), mesh1.matrix);
    }

}