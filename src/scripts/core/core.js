import {Vector2} from 'three.cjs';
import move from './move';
import init from './init';
import {restrict, dimensions} from './restrict';
import {addParticles, moveParticles} from './particles';

const fov = 75;

const {scene, camera, mesh, renderer} = init(fov, window.innerWidth, window.innerHeight);
const pressedKeys = {};
const movementVector = new Vector2(0, 0);
const d = dimensions(fov, window.innerWidth / window.innerHeight);
const xMax = d.width / 2 - 20;
const yMax = d.height / 2 - 20;
const particles = addParticles(100, scene, xMax, yMax);

window.addEventListener('keydown', event => {
  pressedKeys[event.key] = true;
});

window.addEventListener('keyup', event => {
  delete pressedKeys[event.key];
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function main() {
  requestAnimationFrame(main);

  moveParticles(particles, xMax, yMax);

  move(movementVector, pressedKeys);
  const maxSpeed = pressedKeys.Shift ? 8 : 20;
  mesh.position.x += movementVector.x * maxSpeed;
  mesh.position.y += movementVector.y * maxSpeed;

  restrict(mesh.position, xMax, yMax);

  renderer.render(scene, camera);
}

requestAnimationFrame(main);
