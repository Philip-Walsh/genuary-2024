document.addEventListener("DOMContentLoaded", function () {
    const gridContainer = document.querySelector("body");

    for (let i = 0; i < 300; i++) {
        const div = document.createElement("div");
        div.classList.add("moving-div");
        gridContainer.appendChild(div);
        moveDiv(div);
    }

    function moveDiv(div) {
        const maxX = window.innerWidth - div.clientWidth;
        const maxY = window.innerHeight - div.clientHeight;

        div.style.left = `${Math.random() * maxX}px`;
        div.style.top = `${Math.random() * maxY}px`;
        div.style.background =
            "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");

        setInterval(() => {
            div.style.left = `${Math.random() * maxX}px`;
            div.style.top = `${Math.random() * maxY}px`;

            const scale = Math.random() * (1 - 5);
            div.style.transform = `scale(${scale})`;
        }, 2000);
    }
});
