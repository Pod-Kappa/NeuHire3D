import { PerspectiveCamera } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const DEFAULT_MOVE_SPEED = 0.08;
const DEFAULT_TURN_SPEED = Math.PI * 0.02;
const BOOST_MOVE_SPEED = 0.25;
const BOOST_TURN_SPEED = Math.PI * 0.1;
export class Player {
  constructor(scene) {
    this.height = 2.5;
    this.offset = -5;
    this.speed = DEFAULT_MOVE_SPEED;
    this.turnSpeed = DEFAULT_TURN_SPEED;
    this.initSprite(scene);
    this.camera = new PerspectiveCamera(90, 1280 / 720, 0.1, 1000);
  }

  initSprite(scene) {
    const loader = new GLTFLoader();
    loader.load('assets/glbs/Chair.glb', glb => {
      scene && scene.add(glb.scene);
      this.setSprite(glb.scene);
    });
  }

  setSprite(newSprite) {
    this.sprite = newSprite;
    this.sprite.scale.set(0.25, 0.25, 0.25);
  }

  getSprite() {
    return this.sprite;
  }

  getPosition() {
    return this.sprite.position;
  }

  getRotation() {
    return this.sprite.rotation;
  }

  moveNorth() {
    this.sprite.rotation.y += this.turnSpeed;
    this.sprite.position.z += this.speed;
    this.camera.position.z += this.speed;
  }

  rotateClockwise() {
    //TODO: Rotate Camera Clockwise Around Chair
  }

  rotateCounterClockwise() {
    //TODO: Rotate Camera Counter Clockwise Around Chair
  }

  moveSouth() {
    this.sprite.rotation.y -= this.turnSpeed;
    this.sprite.position.z -= this.speed;
    this.camera.position.z -= this.speed;
  }

  moveEast() {
    this.sprite.rotation.y -= this.turnSpeed;
    this.sprite.position.x -= this.speed;
    this.camera.position.x -= this.speed;
  }

  moveWest() {
    this.sprite.rotation.y += this.turnSpeed;
    this.sprite.position.x += this.speed;
    this.camera.position.x += this.speed;
  }

  defaultSpeedMode() {
    this.speed = DEFAULT_MOVE_SPEED;
    this.turnSpeed = DEFAULT_TURN_SPEED;
  }

  boostSpeedMode() {
    this.speed = BOOST_MOVE_SPEED;
    this.turnSpeed = BOOST_TURN_SPEED;
  }

  updateCamera(e) {
    console.log(e);
  }
}
