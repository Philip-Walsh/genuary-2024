const canvas = document.getElementById("kandinsky");
const ctx = canvas.getContext("2d");

function getRandomCoordinate(axis, size) {
    const buffer = size / 2;
    const canvasSize = axis === 'x' ? canvas.width : canvas.height;
    return Math.random() * (canvasSize - size - buffer * 2) + buffer;
}

function getRandomRadius() {
    return Math.random() * 50 + 20;
}

function drawTriangle() {
    const randomX = getRandomCoordinate('x', 100); // Adjusted for triangle size
    const randomY = getRandomCoordinate('y', 100); // Adjusted for triangle size
    const randomRotation = 14;

    ctx.save();
    ctx.translate(randomX, randomY);
    ctx.rotate(randomRotation);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    const sideLength = Math.random() * 100 + 110;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-sideLength, sideLength / 2);
    ctx.lineTo(-sideLength, -sideLength / 2);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}

function drawCircle() {
    const randomRadius = getRandomRadius();
    const randomX = getRandomCoordinate('x', randomRadius * 2);
    const randomY = getRandomCoordinate('y', randomRadius * 2);

    ctx.beginPath();
    ctx.arc(randomX, randomY, randomRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
}

function drawLine() {
    const segments = 9;
    const baseWidth = 1;
    const ySpacing = 70;
    const randomX = getRandomCoordinate('x', baseWidth);
    const randomY = Math.random() * 10;

    ctx.beginPath();
    ctx.moveTo(randomX, randomY);

    for (let i = 1; i <= segments; i++) {
        const controlX = randomX + i * (Math.random() * 5 - 2.5);
        const controlY = randomY - i * i + i * ySpacing;
        const endX = randomX + i * (Math.random() * 10 - 5);
        const endY = randomY - i * i + i * ySpacing;
        const lineWidth = baseWidth + (i / segments) * 8;

        ctx.quadraticCurveTo(controlX, controlY, endX, endY);
        ctx.lineWidth = lineWidth;
    }

    ctx.strokeStyle = "black";
    ctx.lineCap = "round";
    ctx.stroke();
}


function init() {
    drawTriangle();
    drawTriangle();
    drawCircle();
    drawCircle();
    drawCircle();
    drawLine();
    drawLine();
    drawLine();
}

document.addEventListener("DOMContentLoaded", init);
