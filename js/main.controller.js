var gCanvas = document.querySelector('.canvas-box');
var gCtx = gCanvas.getContext('2d');
var imgs = getSerchImg(); 
let isDragging = false;
let startX, startY;
let selectedLineIdx = null;




function onInit() {
    renderGallery(imgs);

    const backToGalleryBtn = document.querySelector('.back-to-galery');
    backToGalleryBtn.addEventListener('click', () => {
        const galleryOverlay = document.querySelector('.main-gallery');
        const mainContainer = document.querySelector('.main-container');
        galleryOverlay.style.display = 'block'; 
        mainContainer.style.display = 'none'; 
    });
}

function handleTextInput(value) {
    const meme = getMeme();
    const selectedLine = meme.lines[meme.selectedLineIdx];
    selectedLine.text = value;

    drawTextOnCanvas(meme);
}

function alignText(align) {
    const meme = getMeme();
    const selectedLine = meme.lines[meme.selectedLineIdx];
    selectedLine.align = align;

    drawTextOnCanvas(meme);
}

function onSwitchLineClicked() {
    const meme = getMeme();
    
    meme.selectedLineIdx = (meme.selectedLineIdx + 1) % meme.lines.length;

    drawTextOnCanvas(meme);
    updateInputAndButtons(meme);
}

function changeFontSize(change) {
    const meme = getMeme();
    const selectedLine = meme.lines[meme.selectedLineIdx];
    selectedLine.size += change;

    drawTextOnCanvas(meme);
}

function changeFontColor(color) {
    const meme = getMeme();
    const selectedLine = meme.lines[meme.selectedLineIdx];
    selectedLine.color = color;

    drawTextOnCanvas(meme);
}

function changeFontFamily(font) {
    const meme = getMeme();
    const selectedLine = meme.lines[meme.selectedLineIdx];
    selectedLine.font = font;

    drawTextOnCanvas(meme);
}

function onDeleteLineClicked() {
    resetTextAndRedraw();
}

function onCanvasMouseDown(event) {
    const meme = getMeme();

    for (let i = 0; i < meme.lines.length; i++) {
        if (isTextClicked(event.offsetX, event.offsetY, meme.lines[i])) {
            isDragging = true;
            startX = event.offsetX;
            startY = event.offsetY;
            selectedLineIdx = i; // Установите выбранный индекс строки
            break;
        }
    }
}

function onCanvasMouseMove(event) {
    if (isDragging && selectedLineIdx !== null) {
        const meme = getMeme();
        const selectedLine = meme.lines[selectedLineIdx];

        const dx = event.offsetX - startX;
        const dy = event.offsetY - startY;

        selectedLine.x += dx;
        selectedLine.y += dy;

        startX = event.offsetX;
        startY = event.offsetY;

        drawTextOnCanvas(meme);
    }
}

function onCanvasMouseUp() {
    isDragging = false;
    selectedLineIdx = null; // Сбросьте выбранный индекс строки
}

function isTextClicked(x, y, textLine) {
    const textSize = gCtx.measureText(textLine.text);
    const textWidth = textSize.width;
    const textHeight = textLine.size; // Допустим, вы используете размер шрифта для высоты текстовой строки

    return (
        x > textLine.x && x < textLine.x + textWidth &&
        y > textLine.y - textHeight && y < textLine.y
    );
}

function addLine() {
    const meme = getMeme();
    const newLine = {
        text: `New Text ${meme.lines.length + 1}`,
        size: 40,
        font: 'Impact',
        color: 'white',
        x: gCanvas.width / 2,
        y: gCanvas.height / 2,
        align: 'center'
    };
    
    meme.lines.push(newLine);
    meme.selectedLineIdx = meme.lines.length - 1;

    drawTextOnCanvas(meme);
}

function onCanvasClick(event) {
    const meme = getMeme();

    for (let i = 0; i < meme.lines.length; i++) {
        if (isTextClicked(event.offsetX, event.offsetY, meme.lines[i])) {
            meme.selectedLineIdx = i;
            drawTextOnCanvas(meme);
            return;
        }
    }

    addLine();
}

function updateInputAndButtons(meme) {
    const selectedLine = meme.lines[meme.selectedLineIdx];
    const textInput = document.querySelector('.text-input');
    const switchButton = document.querySelector('.switch');

    textInput.value = selectedLine.text;
    
  
    const allTextButtons = document.querySelectorAll('.text-button');
    allTextButtons.forEach(button => button.classList.remove('selected'));
    switchButton.classList.add('selected');
}

function downloadCanvas(event, link) {
    const canvas = document.querySelector('.canvas-box');
    const dataURL = canvas.toDataURL('image/jpeg');
    link.href = dataURL;
}


function handleImageUpload(event) {
    const canvas = document.querySelector('.canvas-box');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    img.src = URL.createObjectURL(event.target.files[0]);
}
