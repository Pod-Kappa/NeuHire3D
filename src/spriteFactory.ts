import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Scene, Vector3 } from 'three';
import { Player } from './player';

export class SpriteFactory {
  scene: Scene;
  constructor(scene: Scene) {
    this.scene = scene;
  }

  getGLBSprite(
    path: string,
    setPlayerSprite?: (sprite: any) => void,
    position: Vector3 = new Vector3(0, 0, 0),
    rotation: Vector3 = new Vector3(0, 0, 0),
    scale: Vector3 = new Vector3(1, 1, 1),
  ) {
    const loader = new GLTFLoader();
    loader.load(path, glb => {
      const newItem = glb.scene;
      newItem.rotation.set(rotation.x, rotation.y, rotation.z);
      newItem.position.set(position.x, position.y, position.z);
      newItem.scale.set(scale.x, scale.y, scale.z);
      this.scene && this.scene.add(newItem);
      setPlayerSprite && setPlayerSprite(newItem);
    });
  }

  getOBJSprite(
    path: string,
    position: Vector3 = new Vector3(0, 0, 0),
    rotation: Vector3 = new Vector3(0, 0, 0),
    scale: Vector3 = new Vector3(0, 0, 0),
  ) {
    const loader = new OBJLoader();
    loader.load(path, obj => {
      const newItem = obj;
      newItem.rotation.set(rotation.x, rotation.y, rotation.z);
      newItem.position.set(position.x, position.y, position.z);
      newItem.scale.set(scale.x, scale.y, scale.z);
      this.scene.add(obj);
    });
  }
}
