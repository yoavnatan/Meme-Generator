'use strict'

function renderGallery(filterBy) {
    const imgs = getImgs(filterBy)
    let strHTML = ''

    for (var i = 0; i < imgs.length; i++) {
        strHTML +=
            `<section class="gallery-item" onclick="onImageSelect(${i})">
    <img src="${imgs[i].url}">
    </section>`
    }

    document.querySelector('.imgs-container').innerHTML = strHTML
    renderKeyWords()

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
    hideElement('.saved-memes-container')
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

function onClickKeyWord(elKeyWord) {

    const keyWord = elKeyWord.innerText
    renderGallery(keyWord)
    if (!gKeywordSearchCountMap[keyWord]) {
        gKeywordSearchCountMap[keyWord] = 0
    }
    gKeywordSearchCountMap[keyWord]++
    document.querySelector('.title-search').value = keyWord
    renderKeyWords()
    // elKeyWord.style.fontSize = `${gKeywordSearchCountMap[keyWord] * 2 + 16}px`
}

function renderKeyWords() {
    let strHTML = ''
    for (const keyWord in gKeywordSearchCountMap) {
        strHTML += `<span style="font-size:${gKeywordSearchCountMap[keyWord] * 2 + 16}px;" class="keyword" onclick="onClickKeyWord(this)" >${keyWord}</span>`
    }
    document.querySelector('.search-keywords-container').innerHTML = strHTML
}