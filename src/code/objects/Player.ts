import { ExtendedObject3D } from 'enable3d';
import { AmmoPhysics } from 'enable3d/node_modules/@enable3d/ammo-physics';

const DEFAULT_MOVE_SPEED = 0.08;
const DEFAULT_TURN_SPEED = Math.PI * 0.02;
const BOOST_MOVE_SPEED = 0.25;
const BOOST_TURN_SPEED = Math.PI * 0.1;

export class Player {
  speed: number;
  turnSpeed: number;
  isJumping: boolean;
  sprite: ExtendedObject3D;
  physics: AmmoPhysics;

  constructor(physics: AmmoPhysics) {
    this.speed = DEFAULT_MOVE_SPEED;
    this.turnSpeed = DEFAULT_TURN_SPEED;
    this.isJumping = false;
    this.physics = physics;
    this.sprite = new ExtendedObject3D();
  }

  setSprite(sprite: ExtendedObject3D) {
    this.sprite = sprite;
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

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      //TODO: Add Jump Functionality
      setTimeout(() => (this.isJumping = false), 500);
    }
  }

  moveNorth() {}

  moveSouth() {}

  moveEast() {}

  moveWest() {}

  defaultSpeedMode() {
    this.speed = DEFAULT_MOVE_SPEED;
    this.turnSpeed = DEFAULT_TURN_SPEED;
  }

  boostSpeedMode() {
    this.speed = BOOST_MOVE_SPEED;
    this.turnSpeed = BOOST_TURN_SPEED;
  }
}
