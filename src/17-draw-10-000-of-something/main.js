function getRandomDecimalEmoji() {
    const minDecimal = 128512;
    const maxDecimal = 127884;
    const randomDecimal =
        Math.floor(Math.random() * (maxDecimal - minDecimal + 1)) + minDecimal;
    return String.fromCodePoint(randomDecimal);
}

function createAndAppendEmoji() {
    const emoji = getRandomDecimalEmoji();
    const emojiElement = document.createElement("span");
    emojiElement.textContent = emoji;
    document.body.appendChild(emojiElement);
}

for (let i = 0; i < 10000; i++) {
    createAndAppendEmoji();
}
