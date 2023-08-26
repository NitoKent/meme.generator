var gMeme = {
    selectedImgId: null,
    selectedImgUrl: null,
    lines: [
        { text: 'Text 1', size: 40, font: 'Impact', color: 'white', x: 200, y: 50, align: 'left' },  
        { text: 'Text 2', size: 40, font: 'Impact',color: 'white', x: 200, y: 400, align: 'left' }
    ],
    selectedLineIdx: 0
};
function getMeme() {
    return gMeme;
}

function drawTextOnCanvas(meme) {
    const canvas = document.querySelector('.canvas-box');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    const img = new Image();
    img.src = meme.selectedImgUrl;

    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        meme.lines.forEach(line => {
            ctx.font = `${line.size}px ${line.font}`;
            ctx.fillStyle = line.color;
            ctx.textAlign = line.align;
            ctx.fillText(line.text, line.x, line.y);
        });
    };
}

function resetTextValues(meme) {
    for (const line of meme.lines) {
        line.text = `Text ${meme.lines.indexOf(line) + 1}`;
    }
}

function resetTextAndRedraw() {
    const meme = getMeme();
    resetTextValues(meme);
    drawTextOnCanvas(meme);
}
