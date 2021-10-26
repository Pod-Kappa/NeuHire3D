import { OrthographicCamera } from 'enable3d/node_modules/three';
import { PerspectiveCamera, WebGLRenderer } from 'three';
import { KeyboardController } from '../controller/KeyboardController';

export const addWindowEvents = (camera: any, renderer: any, keyboardController: KeyboardController) => {
  window.addEventListener('resize', () => {
    // Update sizes
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Update camera
    camera.updateProjectionMatrix();
    // Update renderer
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
  window.addEventListener('keydown', event => keyboardController.keyDown(event));
  window.addEventListener('keyup', event => keyboardController.keyUp(event));
};
