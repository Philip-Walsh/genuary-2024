const logo = document.querySelector(".logo");

let posX = 0;
let posY = 0;
let speedX = 2;
let speedY = 2;
logoWidth = 100;
logoHeight = 40;

function updatePosition() {
    const containerWidth = document.querySelector(".container").offsetWidth;
    const containerHeight = document.querySelector(".container").offsetHeight;
    posX += speedX;
    posY += speedY;

    if (posX + logoWidth > containerWidth || posX < 0) {
        speedX = -speedX;
        console.log("X collision:", posX, posY);
    }

    if (posY + logoHeight > containerHeight || posY < 0) {
        speedY = -speedY;
        console.log("Y collision:", posX, posY);
    }

    logo.style.transform = `translate(${posX}px, ${posY}px)`;

    requestAnimationFrame(updatePosition);
}

updatePosition();
