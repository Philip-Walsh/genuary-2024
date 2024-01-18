function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function addRotatingBox(parent, size) {
    const initialRotation = Math.random() * 1000;

    function animate() {
        size *= 0.95;

        if (size <= 5) {
            parent.innerHTML = "";
            addRotatingBox(parent, 1000);
            return;
        }

        const newBox = document.createElement("div");
        newBox.style.transform = `rotate(${initialRotation}deg)`;
        newBox.style.width = size + "px";
        newBox.style.height = size + "px";
        newBox.style.border = "3px solid " + getRandomColor();
        newBox.style.position = "absolute";
        newBox.style.right = "50%";
        newBox.style.top = "50%";
        newBox.style.transformOrigin = "center";
        parent.appendChild(newBox);

        requestAnimationFrame(animate);
    }

    animate();
}

addRotatingBox(document.body, 1000);
