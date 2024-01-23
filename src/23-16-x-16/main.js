const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");
const outcomeList = document.getElementById("outcomeList");

const MAZE_ROWS = 16;
const MAZE_COLS = 16;
const CHAR_SIZE = 1;
const charColor = "#6895D2";
const wallColor = "#D04848";
const bgColor = "#F3B95F";
const exitColor = "#D4F4DD";

let maze;
let charX, charY;
let exitX, exitY;

let startTime;

function initializeGame() {
    maze = generateRandomMaze(MAZE_ROWS, MAZE_COLS);
    charX = MAZE_COLS - CHAR_SIZE;
    charY = Math.floor(MAZE_ROWS / 2);
    exitX = 0;
    exitY = Math.floor(MAZE_ROWS / 2);
    startTime = null;
}

function generateRandomMaze(rows, cols) {
    return new Array(rows)
        .fill(0)
        .map(() => new Array(cols).fill(0))
        .map((row) => row.map(() => (Math.random() > 0.7 ? 1 : 0)));
}

function drawMaze() {
    for (let i = 0; i < MAZE_ROWS; i++) {
        for (let j = 0; j < MAZE_COLS; j++) {
            ctx.fillStyle = maze[i][j] === 1 ? wallColor : bgColor;
            ctx.fillRect(j * 16, i * 16, 16, 16);
        }
    }

    ctx.fillStyle = exitColor;
    ctx.fillRect(exitX * 16, exitY * 16, 16, 16);
}

function drawCharacter() {
    ctx.fillStyle = charColor;
    ctx.fillRect(charX * 16, charY * 16, CHAR_SIZE * 16, CHAR_SIZE * 16);
}

function moveCharacter(e) {
    const canMove = (dx, dy) =>
        charY + dy >= 0 &&
        charY + dy <= MAZE_ROWS - CHAR_SIZE &&
        charX + dx >= 0 &&
        charX + dx <= MAZE_COLS - CHAR_SIZE &&
        maze[charY + dy][charX + dx] !== 1;

    switch (e.key) {
        case "ArrowUp":
            canMove(0, -1) ? charY-- : handleOutcome("die");
            break;
        case "ArrowDown":
            canMove(0, 1) ? charY++ : handleOutcome("die");
            break;
        case "ArrowLeft":
            canMove(-1, 0) ? charX-- : handleOutcome("die");
            break;
        case "ArrowRight":
            canMove(1, 0) ? charX++ : handleOutcome("die");
            break;
    }

    if (charX === exitX && charY === exitY) {
        handleOutcome("win");
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    drawCharacter();
}

function handleOutcome(outcome) {
    const endTime = new Date().getTime();
    const timeElapsed = (endTime - startTime) / 1000;

    const outcomeItem = document.createElement("li");
    outcomeItem.textContent = `${timeElapsed.toFixed(2)}s - You ${outcome}`;
    outcomeItem.classList.add(outcome);

    outcomeList.appendChild(outcomeItem);

    startTime = null;

    initializeGame();
}

document.addEventListener("keydown", (e) => {
    if (!startTime) {
        startTime = new Date().getTime();
    }
    moveCharacter(e);
});

initializeGame();
drawMaze();
drawCharacter();
