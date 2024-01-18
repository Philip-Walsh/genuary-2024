const canvas = document.getElementById("vera");
const ctx = canvas.getContext("2d");
const gridSize = 10; // Increase the grid size
const patternSize = 70; // Decrease the size of each pattern
const colors = ["#FF5733", "#33FF57", "#5733FF", "#FF3357", "#33FFD4"];
let colorOpt;
function drawSquareishPattern(x, y) {
    const iterations = 30;
    const angleIncrement = 90;
    const angleVariation = 10;
    const lengthReduction = 0.95;
    const initialLength = 50; // Adjust initial length based on the pattern size

    let position = {
        x: x + patternSize / 2,
        y: y + patternSize / 2
    };

    let length = initialLength;

    for (let i = 0; i < iterations; i++) {
        ctx.beginPath();
        ctx.moveTo(position.x, position.y);

        const angle = (i * angleIncrement) + (Math.random() - 0.5) * angleVariation;
        const randomLength = length * (0.8 + Math.random() * 0.4);

        position.x += randomLength * Math.cos(angle * (Math.PI / 180));
        position.y += randomLength * Math.sin(angle * (Math.PI / 180));

        ctx.lineTo(position.x, position.y);
        ctx.strokeStyle = colorOpt;
        ctx.lineWidth = 2;
        ctx.stroke();

        length *= lengthReduction;
    }
}

for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        colorOpt = colors[Math.floor(Math.random() * colors.length)];
        drawSquareishPattern(i * patternSize, j * patternSize);
    }
}
