let loremApiUrl = 'https://wizard-world-api.herokuapp.com/Spells';
const fontFamilies = [
    'Bebas Neue',
    'Climate Crisis',
    'Grape Nuts',
    'Moirai One',
    'Mynerve',
    'Play',
    'Roboto',
    'Rubik Burned',
    'Sevillana'
];

async function getRandomIncantation() {
    const response = await fetch(loremApiUrl);

    if (!response.ok) {
        throw new Error('API request failed');
    }

    const spells = await response.json();
    const randomSpell = spells[Math.floor(Math.random() * spells.length)];

    if (randomSpell && randomSpell.incantation && randomSpell.effect) {
        return [randomSpell.incantation, randomSpell.effect];
    } else {
        console.error('Invalid spell data:', randomSpell);
        throw new Error('Invalid spell data');
    }

}
function addParagraph(content) {
    let paragraph = document.createElement('p');
    paragraph.innerText = content;
    paragraph.id = [content]
    document.body.appendChild(paragraph);
}
function addRandomFont() {
    const randomIndex = Math.floor(Math.random() * fontFamilies.length);
    const randomFontFamily = fontFamilies[randomIndex];
    document.body.style.fontFamily = `'${randomFontFamily}', sans-serif`;
}
function getRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }
async function addTypography() {
    try {
        let [incantation, effect] = await getRandomIncantation();
        addParagraph(incantation);
        addParagraph(effect);
        addRandomFont();
        
        const color1 = getRandomColor();
        const color2 = getRandomColor();

        const paragraphs = document.querySelectorAll('p');
        paragraphs.forEach(paragraph => {
            paragraph.style.background = `conic-gradient(${color1}, ${color2})`;
            paragraph.style.backgroundClip = 'text';
            paragraph.style.color = 'transparent';
            const boxShadow = `0 0 10px 10px ${color1}, 0 0 100px 10px ${color1}, inset 0 0 10px 10px ${color1}`;
            paragraph.style.boxShadow = boxShadow;
          });

    } catch (error) {
        addTypography();
    }
}

document.addEventListener("DOMContentLoaded", addTypography);
