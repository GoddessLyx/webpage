let rolls = [];
let rollCount = 0;
const maxRolls = 3;

// Three.js setup for 3D dice
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.set(0, 0, 5); // Fixed front view
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(300, 300);
document.getElementById('dice-container').appendChild(renderer.domElement);

// Create dice with rounded edges
const geometry = new THREE.BoxGeometry(1, 1, 1, 32, 32, 32, 0.1);
const material = new THREE.MeshPhongMaterial({ color: 0x000000, specular: 0x555555, shininess: 50 });
const dice = new THREE.Mesh(geometry, material);
scene.add(dice);

// Add red dots for dice faces
const dotGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const dotMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });

// Positions for dots on each face (1 to 6)
const dotPositions = [
    // Face 1: 1 dot
    [[0, 0, 0.51]],
    // Face 2: 2 dots
    [[-0.3, 0.3, 0.51], [0.3, -0.3, 0.51]],
    // Face 3: 3 dots
    [[-0.3, 0.3, 0.51], [0, 0, 0.51], [0.3, -0.3, 0.51]],
    // Face 4: 4 dots
    [[-0.3, 0.3, 0.51], [-0.3, -0.3, 0.51], [0.3, 0.3, 0.51], [0.3, -0.3, 0.51]],
    // Face 5: 5 dots
    [[-0.3, 0.3, 0.51], [-0.3, -0.3, 0.51], [0, 0, 0.51], [0.3, 0.3, 0.51], [0.3, -0.3, 0.51]],
    // Face 6: 6 dots
    [[-0.3, 0.3, 0.51], [-0.3, 0, 0.51], [-0.3, -0.3, 0.51], [0.3, 0.3, 0.51], [0.3, 0, 0.51], [0.3, -0.3, 0.51]]
];

// Initialize dots array for all faces
const dots = [[], [], [], [], [], []];

// Create dots for each face
dotPositions.forEach((face, index) => {
    face.forEach(pos => {
        const dot = new THREE.Mesh(dotGeometry, dotMaterial);
        dot.position.set(pos[0], pos[1], pos[2]);
        dice.add(dot);
        dots[index].push(dot);
    });
});

// Copy dots to opposite faces
dotPositions.forEach((face, index) => {
    face.forEach(pos => {
        const dot = new THREE.Mesh(dotGeometry, dotMaterial);
        dot.position.set(-pos[0], -pos[1], -pos[2]);
        dice.add(dot);
        const oppositeIndex = 5 - index; // Opposite faces: 1-6, 2-5, 3-4
        dots[oppositeIndex].push(dot);
    });
});

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

function animateDice(result) {
    let t = 0;
    // Hide all dots initially
    dots.forEach(face => face.forEach(dot => dot.visible = false));
    // Show dots for the result face
    dots[result - 1].forEach(dot => dot.visible = true);

    const targetRotation = [0, 0, 0]; // Always show front face

    const animate = () => {
        t += 0.1;
        dice.rotation.x += 0.2 * Math.random();
        dice.rotation.y += 0.2 * Math.random();
        renderer.render(scene, camera);
        if (t < 2) {
            requestAnimationFrame(animate);
        } else {
            dice.rotation.set(targetRotation[0], targetRotation[1], targetRotation[2]);
            renderer.render(scene, camera);
        }
    };
    animate();
}

function rollDice() {
    if (rollCount >= maxRolls) return;
    const result = Math.floor(Math.random() * 6) + 1;
    rolls.push(result);
    rollCount++;
    animateDice(result);

    // Update table
    const tbody = document.getElementById('roll-results');
    const row = document.createElement('tr');
    row.innerHTML = `<td>Tirada ${rollCount}</td><td>${result}</td>`;
    tbody.appendChild(row);

    // Update total
    const total = rolls.reduce((sum, val) => sum + val, 0);
    document.getElementById('total-sum').textContent = total;

    if (rollCount === maxRolls) {
        document.getElementById('roll-button').style.display = 'none';
        showResult(total);
    }
}

function showResult(total) {
    const modal = document.getElementById('modal');
    const resultMessage = document.getElementById('result-message');
    const ringImage = document.getElementById('ring-image');
    const ringLink = document.querySelector('.ring-link-button');

    // Map total to ring
    const rings = [
        { src: '../temp/1.jpg', message: 'Wow, este colgante clásico y elegante sería una elección divina como el primero. Le apetece que lo consigamos?', link: 'https://www.orovivo.com/es/collares/19519-colar-em-ouro-amarelo-18k-com-peridoto-e-citrino.html' },
        { src: '../temp/2.jpg', message: 'Olé, este anillo brilla con la luz de las estrellas, perfecto para usted! Lo elegimos como el primero?', link: 'https://www.orovivo.com/es/anillos/19517-anel-em-ouro-amarelo-18k-peridoto-e-citrino.html' },
        { src: '../temp/3.jpg', message: 'Boah, mi diosa, este colgante refleja su belleza única! Le apetece si le regalo el primero?', link: 'https://www.orovivo.com/es/collares/19512-colar-com-pendente-em-ouro-rosa-18k-e-cornalina.html' },
        { src: '../temp/4.avif', message: 'Mi preciosa Diosa, este anillo es un sueño! El destino lo ha elegido para usted. Lo compramos primero?', link: 'https://www.elcorteingles.es/joyeria-y-relojes/A47412946-anillo-de-oro-diamante-y-espinela/' },
        { src: '../temp/5.webp', message: 'Mi reina eterna, este anillo es la joya suprema, digno de su grandeza! Lo hacemos el primero?', link: 'https://www.joseluisjoyerias.com/producto/141946/Anillo-oro-18-quilates/' },
        { src: '../temp/6.webp', message: 'Mi Diosa vida, este anillo no es solo una joya, es un tributo a su luz y poder! Lo compramos el primero?', link: 'https://www.joseluisjoyerias.com/producto/124373/Anillo-oro-18-quilates/' }
    ];

    let ringIndex;
    if (total <= 4) ringIndex = 0;
    else if (total <= 7) ringIndex = 1;
    else if (total <= 10) ringIndex = 2;
    else if (total <= 13) ringIndex = 3;
    else if (total <= 16) ringIndex = 4;
    else ringIndex = 5;

    // Delay modal display by 1 second
    setTimeout(() => {
        resultMessage.textContent = rings[ringIndex].message;
        ringImage.src = rings[ringIndex].src;
        ringLink.href = rings[ringIndex].link;
        modal.style.display = 'flex';
    }, 1000);
}

function restartGame() {
    rolls = [];
    rollCount = 0;
    document.getElementById('roll-results').innerHTML = '';
    document.getElementById('total-sum').textContent = '0';
    document.getElementById('roll-button').style.display = 'inline';
    document.getElementById('modal').style.display = 'none';
}

// Initial render
renderer.render(scene, camera);