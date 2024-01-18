document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");
    let particles = [];

    function createParticle(x, y, speedX, speedY, color) {
        return {
            x: x,
            y: y,
            radius: 5,
            color: color,
            speedX: speedX,
            speedY: speedY
        };
    }

    particles.push(createParticle(50, 50, 3, 1, "blue"));

    function updateParticles() {
        particles.forEach((particle) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Bounce off horizontal walls
            if (
                particle.x - particle.radius < 0 ||
                particle.x + particle.radius > canvas.width
            ) {
                particle.speedX = -particle.speedX;
            }

            // Bounce off vertical walls
            if (
                particle.y - particle.radius < 0 ||
                particle.y + particle.radius > canvas.height
            ) {
                particle.speedY = -particle.speedY;
            }
        });

        // Remove particles exceeding the maximum limit
        if (particles.length > 1000) {
            particles.splice(0, particles.length - 1000);
        }

        // Create new particles at the position of the bouncing particle
        createNewParticles();
    }

    function createNewParticles() {
        const bouncingParticle = particles[particles.length - 1];
        const newColor = getRandomColor();

        // Create particles with random velocities away from the walls
        particles.push(
            createParticle(
                bouncingParticle.x,
                bouncingParticle.y,
                getRandomSpeed(),
                getRandomSpeed(),
                newColor
            )
        );
        particles.push(
            createParticle(
                bouncingParticle.x,
                bouncingParticle.y,
                getRandomSpeed(),
                getRandomSpeed(),
                newColor
            )
        );
    }

    function getRandomSpeed() {
        // Generate a random speed between -3 and 3 (excluding 0)
        return Math.random() * 6 - 3;
    }

    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        updateParticles();

        particles.forEach((particle) => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            ctx.closePath();
        });

        requestAnimationFrame(draw);
    }

    draw();
});
