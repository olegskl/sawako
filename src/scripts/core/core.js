import {Vector2} from 'three.cjs';
import move from './move';
import init from './init';

const {scene, camera, mesh, renderer} = init();
const pressedKeys = {};
const movementVector = new Vector2(0, 0);

window.addEventListener('keydown', event => {
  pressedKeys[event.key] = true;
});

window.addEventListener('keyup', event => {
  delete pressedKeys[event.key];
});

function main() {
  requestAnimationFrame(main);

  move(movementVector, pressedKeys);
  mesh.position.x += movementVector.x * 30;
  mesh.position.y += movementVector.y * 30;

  renderer.render(scene, camera);
}

requestAnimationFrame(main);
