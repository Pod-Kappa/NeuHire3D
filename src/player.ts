import { Group, PerspectiveCamera, Scene } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Vector3 } from 'three';

const DEFAULT_MOVE_SPEED = 0.08;
const DEFAULT_TURN_SPEED = Math.PI * 0.02;
const BOOST_MOVE_SPEED = 0.25;
const BOOST_TURN_SPEED = Math.PI * 0.1;

export class Player {
  height: number;
  offset: number;
  speed: number;
  turnSpeed: number;
  isJumping: boolean;
  camera: any;
  sprite: any;

  constructor(scene: Scene) {
    this.height = 2.5;
    this.offset = -5;
    this.speed = DEFAULT_MOVE_SPEED;
    this.turnSpeed = DEFAULT_TURN_SPEED;
    this.isJumping = false;
    this.initSprite(scene);
    this.camera = new PerspectiveCamera(90, 1280 / 720, 0.1, 1000);
    this.camera.position.set(0, this.height, this.offset);
    this.camera.lookAt(new Vector3(0, this.height, 0));
  }

  initSprite(scene: Scene) {
    const loader = new GLTFLoader();
    loader.load('assets/glbs/Chair.glb', glb => {
      scene && scene.add(glb.scene);
      this.setSprite(glb.scene);
    });
  }

  setSprite(newSprite: any) {
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

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.sprite.position.y += 1;
      setTimeout(() => (this.isJumping = false), 500);
    }
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

  updateCamera() {
    console.log();
  }
}
