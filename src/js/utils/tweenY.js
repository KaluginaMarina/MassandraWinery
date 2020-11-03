import TWEEN from "@tweenjs/tween.js";
import {Audio, AudioListener, AudioLoader} from "three";
import doorMP3 from '../../resources/audio/door.ogg';

export default function tweenY(object, rotation, camera) {
    // create an AudioListener and add it to the camera
    const listener = new AudioListener();
    camera.add(listener);

    // create a global audio source
    const sound = new Audio(listener);

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new AudioLoader();
    audioLoader.load(doorMP3, function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(false);
        sound.setVolume(0.5);
        sound.play();
    });

    new TWEEN.Tween(object.rotation)
        .to(
            {
                x: 0,
                y: rotation,
                z: 0,
            },
            2000
        )
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .start();
}

export function tweenR(object, posx, posy) {
    new TWEEN.Tween(object.position)
        .to(
            {
                x: object.position.x + posx,
                y: object.position.y,
                z: object.position.z + posy
            },
            200,
        )
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .start();
}