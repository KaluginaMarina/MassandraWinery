import {PointLight} from "three";

export class LightsAnimations {

    constructor(x, y, z, scene) {
        this.pointLight = new PointLight(0xffff55, 3);
        this.pointLight.distance = 12;
        this.pointLight.position.set(x, y, z);
        this.pointLight.castShadow = true;
        this.time = (this.getRandomInt(20) + 10) * 10;
        scene.add(this.pointLight);
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    checkLights() {
        if (this.pointLight.distance > 0 && this.time === 0) {
            this.time = (this.getRandomInt(20) + 10) * 10;
            this.pointLight.distance = 0;
            this.pointLight.intensity = 0;
        } else if (this.pointLight.distance === 0 && this.time === 0) {
            this.time = (this.getRandomInt(20) + 10) * 10;
            this.pointLight.distance = 12;
            this.pointLight.intensity = 3;
        } else {
            this.time--;
        }
    }
}