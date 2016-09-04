import THREE from 'three.cjs';

const geometry = new THREE.CircleGeometry(6, 32);
const material = new THREE.MeshBasicMaterial({
  color: new THREE.Color(0.5, 0.5, 1)
});

export function addParticles(particleCount, scene, width, height) {
  const particles = [];

  for (let i = 0; i < particleCount; i += 1) {
    const mesh = new THREE.Mesh(geometry, material);
    // create a particle with random position values
    mesh.position.x = Math.random() * width * 2 - width;
    mesh.position.y = Math.random() * height * 2 - height;
    mesh.position.z = Math.random() * 500;

    // add it to the geometry
    particles.push(mesh);
    scene.add(mesh);
  }

  return particles;
}

export function moveParticles(particles, width, height) {
  const upperBound = height + 100;
  const lowerBound = -height - 100;
  for (let i = 0; i < particles.length; i += 1) {
    if (particles[i].position.y < lowerBound) {
      particles[i].position.y = upperBound;
    } else {
      particles[i].position.y -= 5;
    }
  }
}
