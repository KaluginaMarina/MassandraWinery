import {BoxGeometry, Mesh, MeshPhongMaterial, Group} from "three";

export default class Bird {
    constructor(scene) {
        this.bird = this.createBird();
        this.paws = this.creatPaws();
        scene.add(this.paws);
        scene.add(this.bird);
        this.time = 10;
    }

    createBird() {
        let group = new Group();

        // body
        let birdGeometry = new BoxGeometry(0.3,0.3,0.3);
        let material = new MeshPhongMaterial({color: 0x0e2433});
        let bird = new Mesh(birdGeometry, material);
        bird.castShadow = true;
        bird.receiveShadow = true;
        group.add(bird);

        // head
        birdGeometry = new BoxGeometry(0.2,0.2,0.2);
        bird = new Mesh(birdGeometry, material);
        bird.position.set(0.15, 0.15, 0);
        bird.castShadow = true;
        bird.receiveShadow = true;
        group.add(bird);

        // tail
        birdGeometry = new BoxGeometry(0.1,0.15,0.15);
        bird = new Mesh(birdGeometry, material);
        bird.rotateZ(Math.PI/16)
        bird.position.set(-0.15, -0.1, 0);
        bird.castShadow = true;
        bird.receiveShadow = true;
        group.add(bird);

        // wings
        birdGeometry = new BoxGeometry(0.2,0.15,0.15);
        bird = new Mesh(birdGeometry, material);
        bird.rotateY(Math.PI/16)
        bird.position.set(0, 0, -0.1);
        bird.castShadow = true;
        bird.receiveShadow = true;
        group.add(bird);

        bird = bird.clone();
        bird.rotateY(-Math.PI/8)
        bird.position.set(0, 0, 0.1);
        group.add(bird);

        // beak
        let beak = new BoxGeometry(0.2,0.05, 0.1);
        material = new MeshPhongMaterial({color: 0xff6600});
        bird = new Mesh(beak, material);
        bird.position.set(0.25, 0.15, 0);
        group.add(bird);

        return group;
    }

    creatPaws(){
        let group = new Group();
        let pawG = new BoxGeometry(0.07,0.3, 0.07);
        let material = new MeshPhongMaterial({color: 0xff6600});
        let paw = new Mesh(pawG, material);
        paw.position.set(0, -0.2, 0.05);
        group.add(paw);

        paw = paw.clone();
        paw.position.set(0, -0.2, -0.05);
        group.add(paw);
        return group;
    }

    update(){
        this.time--;

        if (this.time >= 10 && this.time <=75) {
            return;
        }

        if (this.time < 5 && this.time > 0) {
            this.bird.rotateZ(Math.PI/8);
            return;
        } else if (this.time === 0) {
            this.time = 50;
            return;
        } else if (this.time > 5 && this.time < 10) {
            this.bird.rotateZ(-Math.PI/8);
            return;
        }
    }
}