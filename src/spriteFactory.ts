import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { Scene, Vector3, Group } from 'three';

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
      /* Edit Object */
      const newItem: Group = glb.scene;
      newItem.rotation.set(rotation.x, rotation.y, rotation.z);
      newItem.scale.set(scale.x, scale.y, scale.z);

      /* Add Object To Scene */
      this.scene && this.scene.add(newItem);

      /* Add Object To Physics World */

      /* If Player, Add To Sprite */
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
      /* Edit Object */
      const newItem = obj;
      newItem.rotation.set(rotation.x, rotation.y, rotation.z);
      newItem.position.set(position.x, position.y, position.z);
      newItem.scale.set(scale.x, scale.y, scale.z);

      /* Add Object To Scene */
      this.scene.add(obj);

      /* Add Object To Physics World */
      //TODO:
    });
  }

  getOBJSpriteWithMtl(
    mtlPath: string,
    objPath: string,
    position: Vector3 = new Vector3(0, 0, 0),
    rotation: Vector3 = new Vector3(0, 0, 0),
    scale: Vector3 = new Vector3(0, 0, 0),
  ) {
    const mtlLoader = new MTLLoader();
    mtlLoader.load(
      mtlPath,
      material => {
        material.preload();
        const loader = new OBJLoader();
        loader.setMaterials(material);
        loader.load(
          objPath,
          obj => {
            /* Edit Object */
            const newItem = obj;
            newItem.rotation.set(rotation.x, rotation.y, rotation.z);
            newItem.position.set(position.x, position.y, position.z);
            newItem.scale.set(scale.x, scale.y, scale.z);

            /* Add Object To Scene */
            this.scene.add(obj);

            /* Add Object To Physics World */
            //TODO:
          },
          () => console.log(`failed to load obj: ${objPath}`),
        );
      },
      () => console.log(`failed to load mtl: ${mtlPath}`),
    );
  }
}
