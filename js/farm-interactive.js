/**
 * FARM INTERACTIVE 3D VIEWER
 * Toggle farm elements and control 3D farm model
 */

// ==========================================
// GLOBAL VARIABLES
// ==========================================

let farmScene, farmCamera, farmRenderer, farmControls;
let farmElements = {
    soil: null,
    solar: null,
    hydro: null,
    mulch: null,
    irrigation: null
};
let activeLayers = 5;

// ==========================================
// INITIALIZE FARM 3D VIEWER
// ==========================================

function initFarm3DViewer() {
    const canvas = document.getElementById('farm-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    // Scene setup
    farmScene = new THREE.Scene();
    farmScene.background = new THREE.Color(0xf5f5f5);

    farmCamera = new THREE.PerspectiveCamera(
        50,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
    );
    farmCamera.position.set(8, 6, 8);
    farmCamera.lookAt(0, 0, 0);

    farmRenderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    farmRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
    farmRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    farmRenderer.shadowMap.enabled = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    farmScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    farmScene.add(directionalLight);

    const sunLight = new THREE.DirectionalLight(0xFFC107, 0.4);
    sunLight.position.set(-5, 8, -5);
    farmScene.add(sunLight);

    // OrbitControls (if available)
    if (typeof THREE.OrbitControls !== 'undefined') {
        farmControls = new THREE.OrbitControls(farmCamera, farmRenderer.domElement);
        farmControls.enableDamping = true;
        farmControls.dampingFactor = 0.05;
        farmControls.maxPolarAngle = Math.PI / 2;
    }

    // Create farm elements
    createFarmElements();

    // Animation loop
    animateFarm();

    // Handle resize
    window.addEventListener('resize', () => {
        farmCamera.aspect = canvas.clientWidth / canvas.clientHeight;
        farmCamera.updateProjectionMatrix();
        farmRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}

// ==========================================
// CREATE FARM ELEMENTS (3D MODELS)
// ==========================================

function createFarmElements() {
    // Ground/Soil Layer
    const soilGeometry = new THREE.BoxGeometry(10, 0.2, 10);
    const soilMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        roughness: 0.8
    });
    farmElements.soil = new THREE.Mesh(soilGeometry, soilMaterial);
    farmElements.soil.position.y = -0.1;
    farmElements.soil.receiveShadow = true;
    farmScene.add(farmElements.soil);

    // Mulch Layer
    const mulchGeometry = new THREE.PlaneGeometry(10, 10);
    const mulchMaterial = new THREE.MeshStandardMaterial({
        color: 0x654321,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
    });
    farmElements.mulch = new THREE.Mesh(mulchGeometry, mulchMaterial);
    farmElements.mulch.rotation.x = -Math.PI / 2;
    farmElements.mulch.position.y = 0.05;
    farmScene.add(farmElements.mulch);

    // Soil Crops (represented as simple plants)
    const cropsGroup = new THREE.Group();
    for (let i = 0; i < 20; i++) {
        const x = (Math.random() - 0.5) * 8;
        const z = (Math.random() - 0.5) * 8;

        // Stem
        const stemGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.8, 8);
        const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
        const stem = new THREE.Mesh(stemGeometry, stemMaterial);
        stem.position.set(x, 0.4, z);
        stem.castShadow = true;
        cropsGroup.add(stem);

        // Leaf
        const leafGeometry = new THREE.SphereGeometry(0.2, 8, 8);
        const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x32CD32 });
        const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        leaf.position.set(x, 0.8, z);
        leaf.castShadow = true;
        cropsGroup.add(leaf);
    }
    farmElements.soil.add(cropsGroup);

    // Agrivoltaic Solar Panels
    const solarGroup = new THREE.Group();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 2; j++) {
            // Support pole
            const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 4, 8);
            const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
            const pole = new THREE.Mesh(poleGeometry, poleMaterial);
            pole.position.set(i * 3 - 3, 2, j * 4 - 2);
            pole.castShadow = true;
            solarGroup.add(pole);

            // Solar panel
            const panelGeometry = new THREE.BoxGeometry(2.5, 0.05, 1.5);
            const panelMaterial = new THREE.MeshStandardMaterial({
                color: 0x1a237e,
                metalness: 0.5,
                roughness: 0.3
            });
            const panel = new THREE.Mesh(panelGeometry, panelMaterial);
            panel.position.set(i * 3 - 3, 4, j * 4 - 2);
            panel.rotation.x = -Math.PI / 6;
            panel.castShadow = true;
            solarGroup.add(panel);
        }
    }
    farmElements.solar = solarGroup;
    farmScene.add(farmElements.solar);

    // Hydroponic Vertical Units
    const hydroGroup = new THREE.Group();
    for (let i = 0; i < 2; i++) {
        // Structure
        const structureGeometry = new THREE.BoxGeometry(1.5, 3, 1);
        const structureMaterial = new THREE.MeshStandardMaterial({
            color: 0xE0E0E0,
            transparent: true,
            opacity: 0.6
        });
        const structure = new THREE.Mesh(structureGeometry, structureMaterial);
        structure.position.set(i * 4 - 2, 1.5, -4);
        structure.castShadow = true;
        hydroGroup.add(structure);

        // Growing trays (3 levels)
        for (let level = 0; level < 3; level++) {
            const trayGeometry = new THREE.BoxGeometry(1.4, 0.1, 0.9);
            const trayMaterial = new THREE.MeshStandardMaterial({ color: 0x4CAF50 });
            const tray = new THREE.Mesh(trayGeometry, trayMaterial);
            tray.position.set(i * 4 - 2, level + 0.5, -4);
            hydroGroup.add(tray);
        }
    }
    farmElements.hydro = hydroGroup;
    farmScene.add(farmElements.hydro);

    // Smart Irrigation System
    const irrigationGroup = new THREE.Group();

    // Main pipe
    const pipeGeometry = new THREE.CylinderGeometry(0.08, 0.08, 10, 8);
    const pipeMaterial = new THREE.MeshStandardMaterial({ color: 0x2196F3 });
    const mainPipe = new THREE.Mesh(pipeGeometry, pipeMaterial);
    mainPipe.rotation.z = Math.PI / 2;
    mainPipe.position.y = 0.2;
    irrigationGroup.add(mainPipe);

    // Drip emitters
    for (let i = 0; i < 10; i++) {
        const emitterGeometry = new THREE.SphereGeometry(0.05, 8, 8);
        const emitterMaterial = new THREE.MeshStandardMaterial({ color: 0x03A9F4 });
        const emitter = new THREE.Mesh(emitterGeometry, emitterMaterial);
        emitter.position.set(i - 5, 0.2, 0);
        irrigationGroup.add(emitter);
    }

    farmElements.irrigation = irrigationGroup;
    farmScene.add(farmElements.irrigation);
}

// ==========================================
// ANIMATION LOOP
// ==========================================

function animateFarm() {
    requestAnimationFrame(animateFarm);

    if (farmControls) {
        farmControls.update();
    }

    farmRenderer.render(farmScene, farmCamera);
}

// ==========================================
// TOGGLE CONTROLS
// ==========================================

function initToggleControls() {
    const toggleItems = document.querySelectorAll('.toggle-item');

    toggleItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const layer = item.getAttribute('data-layer');

        checkbox.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            toggleFarmLayer(layer, isChecked);
            updateFarmStats();
        });
    });
}

function toggleFarmLayer(layer, visible) {
    if (!farmElements[layer]) return;

    farmElements[layer].visible = visible;

    // Update active layers count
    activeLayers = Object.values(farmElements).filter(el => el && el.visible).length;
}

function updateFarmStats() {
    const activeLayersEl = document.getElementById('active-layers');
    const efficiencyEl = document.getElementById('efficiency');

    if (activeLayersEl) {
        activeLayersEl.textContent = activeLayers;
    }

    if (efficiencyEl) {
        const efficiency = (activeLayers / 5) * 100;
        efficiencyEl.textContent = Math.round(efficiency) + '%';
    }
}

// ==========================================
// VIEW CONTROLS
// ==========================================

function initViewControls() {
    const viewControls = document.querySelectorAll('.view-control');

    viewControls.forEach(control => {
        control.addEventListener('click', () => {
            // Remove active class from all
            viewControls.forEach(c => c.classList.remove('active'));
            control.classList.add('active');

            const view = control.getAttribute('data-view');
            setFarmView(view);
        });
    });
}

function setFarmView(view) {
    if (!farmCamera || !farmControls) return;

    const duration = 1000; // Animation duration in ms
    const startPosition = farmCamera.position.clone();
    const startTime = Date.now();

    let targetPosition;

    switch (view) {
        case 'top':
            targetPosition = new THREE.Vector3(0, 12, 0);
            break;
        case 'side':
            targetPosition = new THREE.Vector3(12, 4, 0);
            break;
        case 'perspective':
        default:
            targetPosition = new THREE.Vector3(8, 6, 8);
            break;
    }

    function animateCamera() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const eased = 1 - Math.pow(1 - progress, 3);

        farmCamera.position.lerpVectors(startPosition, targetPosition, eased);
        farmCamera.lookAt(0, 0, 0);

        if (progress < 1) {
            requestAnimationFrame(animateCamera);
        }
    }

    animateCamera();
}

// ==========================================
// INITIALIZE ALL FARM INTERACTIONS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE !== 'undefined') {
        initFarm3DViewer();
        initToggleControls();
        initViewControls();
    }
});
