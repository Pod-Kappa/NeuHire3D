import { OrthographicCamera } from 'enable3d/node_modules/three';
import { PerspectiveCamera, WebGLRenderer } from 'three';

export const addWindowEvents = (camera: any, renderer: any) => {
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
};
