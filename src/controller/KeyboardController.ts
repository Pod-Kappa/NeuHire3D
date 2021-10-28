import { Player } from '../code/objects/Player';

export class KeyboardController {
  pressedKeys: string[];
  player: Player;
  spacePressed: boolean;

  constructor(player: Player) {
    this.player = player;
    this.pressedKeys = [];
    this.spacePressed = false;
  }

  resolvePlayerInputMovement() {
    /* Player Movement */
    (this.pressedKeys.includes('KeyW') || this.pressedKeys.includes('ArrowUp')) && this.player.moveNorth(); // Up-Arrow or W
    (this.pressedKeys.includes('KeyA') || this.pressedKeys.includes('ArrowLeft')) && this.player.moveWest(); // Left-Arrow or A
    (this.pressedKeys.includes('KeyS') || this.pressedKeys.includes('ArrowDown')) && this.player.moveSouth(); // Down-Arrow or S
    (this.pressedKeys.includes('KeyD') || this.pressedKeys.includes('ArrowRight')) && this.player.moveEast(); // Right-Arrow Or D
    this.pressedKeys.includes('KeyB') && this.player.brake(); // B
    this.pressedKeys.includes('KeyR') && this.player.reset();
  }

  keyDown(event: KeyboardEvent) {
    if (event.code === 'ShiftLeft') {
      this.player.boostSpeedMode();
    } else if (event.code === 'Space') {
      if (!this.spacePressed) {
        this.spacePressed = true;
        this.player.jump();
      }
    } else {
      !this.pressedKeys.includes(event.code) && this.pressedKeys.push(event.code);
    }
    // console.log(this.pressedKeys);
  }

  keyUp(event: KeyboardEvent) {
    if (event.code === 'ShiftLeft') {
      event.code === 'ShiftLeft' && this.player.defaultSpeedMode();
    } else if (event.code === 'Space') {
      this.spacePressed = false;
    } else {
      event.code === 'KeyB' && this.player.unBrake();
      this.pressedKeys = this.pressedKeys.filter(key => key !== event.code);
    }
  }
}
