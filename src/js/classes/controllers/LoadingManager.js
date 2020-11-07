// instantiate a loader
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js';
import ROUNDWOOD from "../../../resources/models/OBJ/Wood.obj";
import {Color, EquirectangularReflectionMapping, Mesh, MeshPhysicalMaterial, TextureLoader} from "three";
import roundWoodTexture from "../../../resources/models/OBJ/WoodTexture.png";

export default function (scene) {
    const loader = new OBJLoader();

// load a resource
    loader.load(
        // resource URL
        ROUNDWOOD,
        // called when resource is loaded
        function (object) {

            let textureLoader = new TextureLoader();


            // object.children[c]
            let textureCube = textureLoader.load(roundWoodTexture, function () {

            });
            //
            // object.material.transparent = true;
            textureCube.mapping = EquirectangularReflectionMapping;
            textureCube.needsUpdate = true;

            object.traverse(function (child) {

                if (child instanceof Mesh) {
                    child.material = new MeshPhysicalMaterial();
                    child.material.map = textureCube;
                    child.material.envMap = textureCube;
                    child.castShadow = true;
                    child.receiveShadow = true;
                }

            });

            object.castShadow = true;
            object.receiveShadow = true;

            object.position.set(20, -1.2, -30);
            object.rotateY(Math.PI / 4);
            object.scale.set(0.3, 0.3, 0.3);
            scene.add(object);

        },

        // called when loading is in progresses
        function (xhr) {

            console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        },
        // called when loading has errors
        function (error) {

            console.log('An error happened');

        }
    );
}