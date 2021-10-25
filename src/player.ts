import { Group, PerspectiveCamera, Scene } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Vector3 } from 'three';
import { SpriteFactory } from './spriteFactory';

const DEFAULT_MOVE_SPEED = 0.08;
const DEFAULT_TURN_SPEED = Math.PI * 0.02;
const BOOST_MOVE_SPEED = 0.25;
const BOOST_TURN_SPEED = Math.PI * 0.1;

export class Player {
  height: number;
  offsetZ: number;
  speed: number;
  turnSpeed: number;
  isJumping: boolean;
  camera: any;
  sprite: Group;
  offsetX: number;
  handleSetSpriteFromFactory: (sprite: Group) => void;

  constructor(scene: Scene) {
    this.height = 6;
    this.offsetZ = -6;
    this.offsetX = 0;
    this.speed = DEFAULT_MOVE_SPEED;
    this.turnSpeed = DEFAULT_TURN_SPEED;
    this.isJumping = false;
    this.camera = new PerspectiveCamera(90, 1280 / 720, 0.1, 1000);
    this.camera.position.set(this.offsetX, this.height, this.offsetZ);
    this.camera.lookAt(new Vector3(0, 0, 0));
    this.sprite = new Group();
    this.handleSetSpriteFromFactory = (sprite: Group) => {
      this.sprite = sprite;
      this.sprite.rotation.y = Math.PI / 2;
    };
    this.init(scene);
  }

  init(scene: Scene) {
    const spriteFactory = new SpriteFactory(scene);
    spriteFactory.getGLBSprite(
      '/assets/glbs/Chair.glb',
      this.handleSetSpriteFromFactory,
      new Vector3(0, 0, 0),
      new Vector3(0, 0, 0),
      new Vector3(0.25, 0.25, 0.25),
    );
  }

  setSprite(sprite: Group) {
    this.sprite = sprite;
  }

  Sprite() {
    return this.sprite;
  }

  getPosition() {
    return this.sprite.position;
  }

  getRotation() {
    return this.sprite.rotation;
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.sprite.position.y += 1;
      setTimeout(() => (this.isJumping = false), 500);
    }
  }

  moveNorth() {
    this.sprite.rotation.y += this.turnSpeed;
    this.sprite.position.z += this.speed;
    this.camera.position.z += this.speed;
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
