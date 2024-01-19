let canvas;
let ctx;
let boids = [];
let width;
let height;
let boidCount = 1;
const debug = true;

class Boid {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velocityX = Math.random() * 2 - 1;
        this.velocityY = Math.random() * 2 - 1;
        this.acceleration = 0.05;
        this.maxVelocity = 2;
        this.jitterAngle = 0.1;
        this.angle = Math.random() * (Math.PI * 2);
    }

    update() {
        // Apply friction for deceleration
        this.velocityX *= 0.99;
        this.velocityY *= 0.99;

        // Update angle based on acceleration and introduce jitter
        this.angle += (Math.random() * this.jitterAngle * 2) - this.jitterAngle;

        // Update velocity based on angle and acceleration
        this.velocityX += Math.cos(this.angle) * this.acceleration;
        this.velocityY += Math.sin(this.angle) * this.acceleration;

        // Limit velocity to maxVelocity
        const speed = Math.sqrt(this.velocityX ** 2 + this.velocityY ** 2);
        if (speed > this.maxVelocity) {
            this.velocityX = (this.velocityX / speed) * this.maxVelocity;
            this.velocityY = (this.velocityY / speed) * this.maxVelocity;
        }

        // Update position based on velocity
        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
            this.angle += 2;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.strokeStyle = "#04242e";
        ctx.fillStyle = '#186c87';
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-20, 5);
        ctx.lineTo(-20, -5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        if (debug) {
            // debug orientation arrow
            ctx.strokeStyle = "#bf6265";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(40, 0);
            ctx.stroke();

            // debug circle
            ctx.beginPath();
            ctx.arc(0, 0, 30, 0, Math.PI * 2);
            ctx.strokeStyle = "#00FF00";
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.closePath();
        }



        ctx.restore();
    }
}

function setup() {
    canvas = document.getElementById('boids');
    width = canvas.width;
    height = canvas.height;

    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        for (let step = 0; step < boidCount; step++) {
            boids.push(new Boid(width / 2, height / 2));
        }
        draw();
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let boid of boids) {
        boid.draw();
        boid.update();
    }

    requestAnimationFrame(draw);
}

document.addEventListener("DOMContentLoaded", setup);
