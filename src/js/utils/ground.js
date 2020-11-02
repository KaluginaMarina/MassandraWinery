import {Mesh, MeshPhongMaterial, MeshStandardMaterial, PlaneGeometry, RepeatWrapping, TextureLoader} from "three";
import snowTexture from "../../resources/img/snow.jpg";

export default function ground() {
    const textureLoader = new TextureLoader();

    let snow = textureLoader.load(snowTexture);
    snow.wrapT = RepeatWrapping;
    snow.wrapS = RepeatWrapping;
    snow.repeat.set(500, 500);

    let snowMaterial = new MeshStandardMaterial({
        color: 0xffffff,
        map: snow
    });


    var geometry2 = new PlaneGeometry(500, 500, 1, 1);
    var material2 = snowMaterial;
    var plane2 = new Mesh(geometry2, material2);
    plane2.receiveShadow = true;
    plane2.castShadow = true;
    plane2.rotation.x = -Math.PI / 2;
    plane2.position.y = -1.50;
    return plane2;
}