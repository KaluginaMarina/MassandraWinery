import {Color, EquirectangularReflectionMapping, Mesh, SphereGeometry, TextureLoader} from "three";
import moonPanoImg from "../../../resources/img/giant-moon-floor-pillow-4.jpg";

export default class Moon {
    constructor() {
        this.moon = this.createMoon();
    }

    createMoon(){
        let moonGeometry = new SphereGeometry( 5, 152, 152 );
        let sphere = new Mesh( moonGeometry);
        sphere.position.set(-100, 40, 0);

        let textureLoader = new TextureLoader();

        let textureCube = textureLoader.load(moonPanoImg, function () {
            sphere.material.needsUpdate = true;
        });
        sphere.material.envMap = textureCube;
        sphere.material.transparent = true;
        sphere.material.color = new Color(0xffff55);
        textureCube.mapping = EquirectangularReflectionMapping;
        return sphere;
    }
}