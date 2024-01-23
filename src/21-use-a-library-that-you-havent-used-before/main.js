let BoxSpacing = 3;
const numberOfBoxes = 6;

function getRandomPosition() {
    const x = (Math.random() - 0.5) * 3;
    const y = (Math.random() - 0.5) * 3;
    const z = (Math.random() - 0.5) * 3;
    return { x, y, z };
}

function getRandomColor() {
    const r = Math.random();
    const g = Math.random();
    const b = Math.random();
    return new THREE.Color(r, g, b);
}

function createCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: getRandomColor() });

    const cube = new THREE.Mesh(geometry, material);
    const position = getRandomPosition();
    cube.position.set(position.x, position.y, position.z);

    // Adjust wireframe vertices based on cube position
    const wireframeGeometry = new THREE.WireframeGeometry(
        new THREE.BufferGeometry().setFromPoints(
            geometry.vertices.map((vertex) => vertex.clone().add(cube.position))
        )
    );

    const wireframeMaterial = new THREE.LineBasicMaterial({ color: getRandomColor() });

    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);

    const cubeGroup = new THREE.Group();
    cubeGroup.add(cube);
    cubeGroup.add(wireframe);

    return cubeGroup;
}

function addLights(scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 10);
    scene.add(ambientLight);
    scene.add(directionalLight);
}

function createScene() {
    const scene = new THREE.Scene();
    addLights(scene);

    const spacing = BoxSpacing;

    // Calculate the total width of all boxes
    const totalWidth = numberOfBoxes * spacing;

    // Offset to center the boxes
    const offset = -totalWidth / 2;

    for (let i = 0; i < numberOfBoxes; i++) {
        const cubeGroup = createCube();
        cubeGroup.position.x = offset + i * spacing;
        scene.add(cubeGroup);
    }

    return scene;
}

function createCamera() {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;
    return camera;
}

function createRenderer() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    return renderer;
}

function animate(scene, camera, renderer) {
    function animateFrame() {
        requestAnimationFrame(animateFrame);

        scene.children.forEach((cubeGroup) => {
            cubeGroup.rotation.x += 0.01;
            cubeGroup.rotation.y += 0.01;
        });

        renderer.render(scene, camera);
    }

    animateFrame();
}

const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();

animate(scene, camera, renderer);
