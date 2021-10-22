import { PerspectiveCamera } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class Player {

    constructor (scene) {
        this.height = 2.5;
        this.offset = -5;
        this.speed = 0.08;
        this.turnSpeed = Math.PI * 0.02;
        this.initSprite(scene);
        this.camera = new PerspectiveCamera(90, 1280/720, 0.1, 1000);
    }

    initSprite(scene) {
        const loader = new GLTFLoader();
        loader.load('assets/glbs/Chair.glb', (glb) => {
            scene && scene.add(glb.scene)
            this.setSprite(glb.scene);
        });
    }

    setSprite(newSprite){
        this.sprite = newSprite;
        this.sprite.scale.set(.25,.25,.25);
    }

    getSprite() {
        return this.sprite;
    }

    moveLeft() {
        this.sprite.rotation.y += this.turnSpeed;
        this.sprite.position.x += this.speed;
        this.camera.position.x += this.speed;
    }

    moveRight() {
        this.sprite.rotation.y -= this.turnSpeed;
        this.sprite.position.x -= this.speed;
        this.camera.position.x -= this.speed;
    }

    moveForward() {
        this.sprite.rotation.y += this.turnSpeed;
        this.sprite.position.z += this.speed;
        this.camera.position.z += this.speed;
    }

    moveBackward() {
        this.sprite.rotation.y -= this.turnSpeed;
        this.sprite.position.z -= this.speed;
        this.camera.position.z -= this.speed;
    }
    
    cameraAdjustForward() {

    }
    cameraAdjustBackward() {
        
    }
}