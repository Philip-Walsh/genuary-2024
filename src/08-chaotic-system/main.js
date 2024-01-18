const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
const particles = [];
let gravity = -0.2;

function createParticle() {
    return {
        x: Math.random() * canvas.width,
        y: canvas.height,
        vx: (Math.random() - 0.5) * 5,
        vy: -Math.random() * 8,
        color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)})`,
        size: Math.random() * 5 + 2,
        life: true
    };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        ctx.fillStyle = particle.color;
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += gravity;

        if (particle.y <= 0) {
            particle.life = false;
        }
    }

    particles.filter((particle) => particle.life);

    requestAnimationFrame(draw);
}

function launchFirework() {
    for (let i = 0; i < 50; i++) {
        particles.push(createParticle());
    }
}

canvas.addEventListener("click", launchFirework);

draw();
