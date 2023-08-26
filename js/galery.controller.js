
const searchInput = document.querySelector('.searchtxt');
const searchQuery = searchInput.value.toLowerCase();

function renderGallery(imgs) {
    const galleryEl = document.querySelector('.main-gallery');
    const strHTML = imgs.map(img => `
        <img class="img-gallery" id="${img.id}" src="${img.url}" onclick="onImgSelected(${img.id})">
    `).join('');
    galleryEl.innerHTML = strHTML;
}


function onImgSelected(imgId) {
    const galleryOverlay = document.querySelector('.main-gallery');
    const mainContainer = document.querySelector('.main-container');
    const canvasSection = document.querySelector('.canvas-section');
    const selectedImg = imgs.find(img => img.id === imgId);

    if (selectedImg) {
        galleryOverlay.style.display = 'none'; 
        mainContainer.style.display = 'grid';

        const canvas = document.querySelector('.canvas-box');
        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.src = selectedImg.url;

        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height); 
            
            const meme = getMeme(); 
            meme.selectedImgId = selectedImg.id;
            meme.selectedImgUrl = selectedImg.url;
            
            drawTextOnCanvas(meme)
        };
    }
}

function filterImagesByKeyword(images, keyword) {
    const searchQuery = keyword.toLowerCase();
    return images.filter(image => image.keywords.some(kw => kw.includes(searchQuery)));
}



searchInput.addEventListener('input', () => {
    const searchQuery = searchInput.value.toLowerCase();
    const filteredImages = filterImagesByKeyword(imgs, searchQuery);
    renderGallery(filteredImages);
});