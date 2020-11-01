import TWEEN from "@tweenjs/tween.js";

export default function tweenY(object, rotation) {
    new TWEEN.Tween(object.rotation)
        .to(
            {
                x: 0,
                y: rotation,
                z: 0,
            },
            800
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