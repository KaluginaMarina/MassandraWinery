import {PointLight} from "three";

export class LightsAnimations {

    constructor(x, y, z, scene) {
        this.pointLight = new PointLight(0xffff55, 2);
        this.pointLight.distance = 12;
        this.pointLight.position.set(x, y, z);
        this.pointLight.castShadow = true;
        this.time = (this.getRandomInt(40) + 10);
        scene.add(this.pointLight);
        if (this.time % 2 === 0){
            this.pointLight.visible = false;
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    checkLights() {
        this.time--;
        if (this.time > 0) {
            return;
        }
        if (this.pointLight.visible) {
            this.time = (this.getRandomInt(30) + 30);
            this.pointLight.visible = false;
        } else {
            this.time = (this.getRandomInt(20) + 10);
            this.pointLight.visible = true;
        }
    }
}