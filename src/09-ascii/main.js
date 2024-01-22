function loadImage() {
    console.log("Fetching image...");
    return fetch("https://picsum.photos/100")
        .then((response) => response.blob())
        .then((blob) => URL.createObjectURL(blob))
        .then((url) => {
            const image = new Image();

            return new Promise((resolve) => {
                image.onload = () => {
                    console.log("Image loaded successfully.");
                    resolve(image);
                };
                image.src = url;
            });
        });
}


function convertToASCII(image) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    const asciiOutput = [];

    for (let y = 0; y < canvas.height; y += 2) {
        let line = "";
        for (let x = 0; x < canvas.width; x++) {
            const pixel = ctx.getImageData(x, y, 1, 1).data;
            const brightness = (pixel[0] + pixel[1] + pixel[2]) / (3 * 255);

            const characters = [
                " ",
                ".",
                ",",
                ":",
                "-",
                "=",
                "+",
                "*",
                "#",
                "%",
                "8",
                "@"
            ];

            const charIndex = Math.floor(brightness * (characters.length - 1));
            line += characters[charIndex];
        }
        asciiOutput.push(line);
    }

    console.log("ASCII conversion completed.");
    return asciiOutput.join("\n");
}

async function displayASCIIArt() {
    console.log("Displaying ASCII art and original image...");
    const image = await loadImage();
    const asciiOutput = convertToASCII(image);
    const ansiOutputContainer = document.getElementById("ansiOutput");
    ansiOutputContainer.innerText = asciiOutput;


    const originalImageContainer = document.createElement("img");
    originalImageContainer.src = image.src;
    originalImageContainer.alt = "Original Image";

    document.body.appendChild(originalImageContainer);

    console.log("ASCII art and original image displayed.");
}


displayASCIIArt();
