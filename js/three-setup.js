/**
 * THREE.JS SETUP
 * 3D Background animations for hero and vision sections
 */

// ==========================================
// HERO SECTION 3D BACKGROUND
// ==========================================

function initHeroBackground() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    camera.position.z = 5;

    // Create grid field (representing farmland)
    const gridGeometry = new THREE.PlaneGeometry(20, 20, 20, 20);
    const gridMaterial = new THREE.MeshBasicMaterial({
        color: 0x4CAF50,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const grid = new THREE.Mesh(gridGeometry, gridMaterial);
    grid.rotation.x = -Math.PI / 3;
    scene.add(grid);

    // Add particles (representing seeds/growth)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        color: 0xFFC107,
        size: 0.05,
        transparent: true,
        opacity: 0.6
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Animate grid
        grid.rotation.z = Math.sin(time * 0.3) * 0.1;

        // Animate particles
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            positions[i3 + 1] = Math.sin(time + i) * 0.5;
        }
        particles.geometry.attributes.position.needsUpdate = true;
        particles.rotation.y = time * 0.1;

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}

// ==========================================
// VISION SECTION 3D BACKGROUND
// ==========================================

function initVisionBackground() {
    const canvas = document.getElementById('vision-canvas');
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    camera.position.z = 5;

    // Create expanding field effect
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.MeshBasicMaterial({
        color: 0x4CAF50,
        wireframe: true,
        transparent: true,
        opacity: 0.4
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Add rings (representing expansion)
    const rings = [];
    for (let i = 0; i < 3; i++) {
        const ringGeometry = new THREE.TorusGeometry(1 + i, 0.02, 16, 100);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0xFFC107,
            transparent: true,
            opacity: 0.5 - i * 0.1
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        rings.push(ring);
        scene.add(ring);
    }

    // Animation
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Rotate sphere
        sphere.rotation.x = time * 0.3;
        sphere.rotation.y = time * 0.2;

        // Animate rings
        rings.forEach((ring, index) => {
            ring.rotation.z = time * (0.5 + index * 0.2);
            ring.scale.set(
                1 + Math.sin(time + index) * 0.1,
                1 + Math.sin(time + index) * 0.1,
                1
            );
        });

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}

// ==========================================
// INITIALIZE ALL 3D SCENES
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Check if Three.js is loaded
    if (typeof THREE !== 'undefined') {
        initHeroBackground();
        initVisionBackground();
    } else {
        console.warn('Three.js not loaded. 3D backgrounds will not be displayed.');
    }
});
