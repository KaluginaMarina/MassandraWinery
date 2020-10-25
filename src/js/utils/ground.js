import {Mesh, MeshPhongMaterial, PlaneGeometry} from "three";

export default function ground() {
    var geometry2 = new PlaneGeometry(10000, 10000, 1, 1);
    var material2 = new MeshPhongMaterial({color: 0xffffff});
    var plane2 = new Mesh(geometry2, material2);
    plane2.receiveShadow = true;
    plane2.castShadow = true;
    plane2.rotation.x = -Math.PI / 2;
    plane2.position.y = -1.50;
    return plane2;
}