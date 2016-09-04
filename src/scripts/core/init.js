import THREE from 'three.cjs';

export default function init(fov, width, height) {
  const scene = new THREE.Scene();
  const aspectRatio = width / height;

  const camera = new THREE.PerspectiveCamera(fov, aspectRatio, 1, 10000);
  camera.position.z = 1000;

  const geometry = new THREE.CircleGeometry(20, 32);
  const material = new THREE.MeshBasicMaterial({color: 0xff0000});

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(width, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  return {
    scene,
    camera,
    mesh,
    renderer
  };
}
