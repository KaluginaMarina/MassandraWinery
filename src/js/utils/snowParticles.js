import { TextureLoader, Vector3, Color } from "three";
import SPE from "shader-particle-engine";

import snowflake from "../../resources/img/snowflake.png";

export default class Particles {
  constructor(scene) {
    const loader = new TextureLoader();

    const particleGroup = new SPE.Group({
      texture: {
        value: loader.load(snowflake),
      },
      fog: true,
      maxParticleCount: 10000,
    });

    const emitter = new SPE.Emitter({
      maxAge: {
        value: 33,
      },
      position: {
        value: new Vector3(0, 30, 0),
        spread: new Vector3(90, 0, 90),
      },

      rotation: {
      },

      acceleration: {
        value: new Vector3(0, -0.02, 0),
      },

      velocity: {
        value: new Vector3(0, -0.4, 0),
        spread: new Vector3(0.5, -0.01, 0.2),
      },

      color: {
        value: [new Color(0xccccff)],
      },

      opacity: {
        value: [1, 0.5],
      },

      size: {
        value: [0.7, 1],
        spread: [0.05, 0.1],
      },
      activeMultiplier: 0.5,
      particleCount: 10000,
    });

    particleGroup.addEmitter(emitter);
    emitter.enabled = true;
    scene.add(particleGroup.mesh);
    particleGroup.tick(16);

    this.emitter = emitter;
    this.particleGroup = particleGroup;

    this.stop = function () {
      emitter.disable();
    };

    this.start = function () {
      // sound.play();
      emitter.enable();
    };

    this.update = function (delta) {
      if (particleGroup) {
        particleGroup.tick(delta);
      }
    };
  }
}
