import { ExtendedObject3D, ThirdPersonControls } from 'enable3d';
import { AmmoPhysics } from 'enable3d/node_modules/@enable3d/ammo-physics';
import { Vector3 } from 'three';

const DEFAULT_MOVE_SPEED = 10;
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
      this.teleport(new Vector3(0, 0, 0));
      this.rotate(new Vector3(0, -(Math.PI / 2), 0));
      this.updateCamera();
      setTimeout(() => (this.isResetting = false), 2000);
    }
  }

  teleport(position: Vector3) {
    this.sprite.body.setCollisionFlags(2);
    this.sprite.position.set(position.x, position.y, position.z);
    this.update();
  }

  rotate(rotation: Vector3) {
    this.sprite.body.setCollisionFlags(2);
    this.sprite.rotation.set(rotation.x, rotation.y, rotation.z);
    this.update();
  }

  update() {
    this.sprite.body.needUpdate = true;
    this.sprite.body.once.update(() => {
      this.sprite.body.setCollisionFlags(0);
      this.sprite.body.setVelocity(0, 0, 0);
      this.sprite.body.setAngularVelocity(0, 0, 0);
    });
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.sprite.body.applyForceY(200);
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
    this.sprite.body.setFriction(0);
  }

  moveNorth() {
    if (this.sprite.body.rotation.y > -(Math.PI / 2)) {
      this.sprite.body.applyTorque(0, -(Math.PI / 2), 0);
    } else if (this.sprite.body.rotation.y < -(Math.PI / 2)) {
      this.sprite.body.applyTorque(0, Math.PI / 2, 0);
    }
    this.sprite.body.applyForceZ(-this.speed);
  }

  moveSouth() {
    if (this.sprite.body.rotation.y > Math.PI / 2) {
      this.sprite.body.applyTorque(0, -(Math.PI / 2), 0);
    } else if (this.sprite.body.rotation.y < Math.PI / 2) {
      this.sprite.body.applyTorque(0, Math.PI / 2, 0);
    }
    this.sprite.body.applyForceZ(this.speed);
  }

  moveWest() {
    if (this.sprite.body.rotation.y > 0) {
      this.sprite.body.applyTorque(0, -Math.PI, 0);
    } else if (this.sprite.body.rotation.y < 0) {
      this.sprite.body.applyTorque(0, Math.PI, 0);
    }
    this.sprite.body.applyForceX(-this.speed);
  }

  moveEast() {
    if (this.sprite.body.rotation.y > Math.PI) {
      this.sprite.body.applyTorque(0, -Math.PI, 0);
    } else if (this.sprite.body.rotation.y < Math.PI) {
      this.sprite.body.applyTorque(0, Math.PI, 0);
    }
    this.sprite.body.applyForceX(this.speed);
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
