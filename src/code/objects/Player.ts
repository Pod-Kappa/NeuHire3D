import { ExtendedObject3D, ThirdPersonControls } from 'enable3d';
import { AmmoPhysics } from 'enable3d/node_modules/@enable3d/ammo-physics';

const DEFAULT_MOVE_SPEED = 0.05;
const DEFAULT_TURN_SPEED = Math.PI * 0.02;
const BOOST_MOVE_SPEED = 0.25;
const BOOST_TURN_SPEED = Math.PI * 0.1;
const DEFAULT_Y_ROTATION = -(Math.PI / 2);

export class Player {
  speed: number;
  turnSpeed: number;
  isJumping: boolean;
  isBraking: boolean;
  sprite: ExtendedObject3D;
  physics: AmmoPhysics;
  camera: any;
  offSetX: number;
  offSetY: number;
  offSetZ: number;
  isResetting: boolean;

  constructor(physics: AmmoPhysics, camera: any) {
    this.offSetX = 0;
    this.offSetY = 7;
    this.offSetZ = 9;
    this.speed = DEFAULT_MOVE_SPEED;
    this.turnSpeed = DEFAULT_TURN_SPEED;
    this.isJumping = false;
    this.isResetting = false;
    this.isBraking = false;
    this.physics = physics;
    this.camera = camera;
    this.sprite = new ExtendedObject3D();
  }

  setSprite(sprite: ExtendedObject3D) {
    this.sprite = sprite;
    this.updateCamera();
  }

  updateCamera() {
    let pos = this.sprite.position;
    this.camera.position.set(pos.x + this.offSetX, pos.y + this.offSetY, pos.z + this.offSetZ);
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

  reset() {
    if (!this.isResetting) {
      this.isResetting = true;

      this.sprite.body.setCollisionFlags(2);
      this.sprite.position.set(0, 0, 0);
      this.sprite.rotation.set(0, DEFAULT_Y_ROTATION, 0);
      this.sprite.body.needUpdate = true;

      this.sprite.body.once.update(() => {
        this.sprite.body.setCollisionFlags(0);
        this.sprite.body.setVelocity(0, 0, 0);
        this.sprite.body.setAngularVelocity(0, 0, 0);
      });

      this.updateCamera();
      setTimeout(() => (this.isResetting = false), 2000);
    }
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.sprite.body.applyForceY(5);
      setTimeout(() => (this.isJumping = false), 500);
    }
  }

  brake() {
    if (!this.isBraking) {
      this.isBraking = true;
      this.sprite.body.setFriction(1);
      setTimeout(() => (this.isBraking = false), 500);
    }
  }

  unBrake() {
    console.log('unbreak');
    this.sprite.body.setFriction(0);
  }

  moveNorth() {
    this.sprite.body.applyForceZ(-this.speed);
  }

  moveSouth() {
    this.sprite.body.applyForceZ(this.speed);
  }

  moveEast() {
    this.sprite.body.applyForceX(this.speed);
  }

  moveWest() {
    this.sprite.body.applyForceX(-this.speed);
  }

  defaultSpeedMode() {
    this.speed = DEFAULT_MOVE_SPEED;
    this.turnSpeed = DEFAULT_TURN_SPEED;
  }

  boostSpeedMode() {
    this.speed = BOOST_MOVE_SPEED;
    this.turnSpeed = BOOST_TURN_SPEED;
  }
}
