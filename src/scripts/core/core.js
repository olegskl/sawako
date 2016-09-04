import move from './move';
import init from './init';

const {scene, camera, mesh, renderer} = init();

const pressedKeys = {};

window.addEventListener('keydown', event => {
  pressedKeys[event.key] = true;
});

window.addEventListener('keyup', event => {
  delete pressedKeys[event.key];
});

function main() {
  requestAnimationFrame(main);

  move(mesh, pressedKeys);

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;

  renderer.render(scene, camera);
}

requestAnimationFrame(main);
