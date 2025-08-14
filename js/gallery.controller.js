'use strict'

function renderGallery() {
    const imgs = getImgs()
    let strHTML = ''

    for (var i = 0; i < imgs.length; i++) {
        strHTML +=
            `<section class="gallery-item" onclick="onImageSelect(${i})">
    <img src="${imgs[i].url}">
    </section>`
    }

    document.querySelector('.imgs-container').innerHTML = strHTML

    // strHTML = imgs.map(img =>
    //     `<section class="gallery-item-${img.id}">
    //    <img src="${img.url}">
    //  </section>`
    // )

    // document.querySelector('.imgs-container').innerHTML = strHTML.join('')
}

function onShowGallery() {
    hideElement('.memes-editor-container')
    showElement('.gallery-container')

    renderGallery()
}

function onImageSelect(imgIdx) {
    hideElement('.gallery-container')
    showElement('.memes-editor-container')
    setImg(imgIdx)
    renderMeme()
}


function onRandomMeme() {
    const randImgIdx = getRandomImg()
    onImageSelect(randImgIdx)
    setRandomSentence()
    renderMeme()
}

