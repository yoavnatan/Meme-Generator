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
    document.querySelector('.text-editor').focus()
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

function onSetLang() {

    changeDirection()
    setLang()
    doTrans()

}


function changeDirection() {
    if (gLang === 'en') {
        document.querySelector('.trans').innerText = 'en'
        // document.querySelector('body').style.direction = 'rtl'
    }
    else if (gLang = 'he') {
        document.querySelector('.trans').innerText = 'עב'
        // document.querySelector('body').style.direction = 'ltr'

    }
}

function doTrans() {

    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const trans = getTrans(transKey)
        el.innerText = trans
    })
    const transKey = document.querySelector('#filter').dataset.trans
    const trans = getTrans(transKey)
    document.querySelector('#filter').placeholder = trans
    const transKey2 = document.querySelector('#text-editor').dataset.trans
    const trans2 = getTrans(transKey2)
    document.querySelector('#text-editor').placeholder = trans2

}