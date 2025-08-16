'use strict'

var gElCanvas
var gCtx
var gIsMouseDown = false
var gLastPos

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    onShowGallery()
}

function renderMeme() {
    document.querySelector('.share-container').innerHTML = ''

    resizeCanvas()
    const { selectedImgId: imgId, selectedLineIdx: lineIdx, lines } = getMeme()
    let img = new Image
    img.src = gImgs[imgId].url

    img.onload = () => {
        renderImg(img)
        if (gMeme.lines.length > 0) renderTxt(lines)
        if (gMeme.selectedLineIdx !== null) drawFrame(lineIdx)
    }
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth - 20
}

function onDown(ev) {
    const pos = getEvPos(ev)
    onLineClicked(pos)
    const line = getSelectedLine()
    if (!line) return
    gIsMouseDown = true
    gLastPos = pos
    document.body.style.cursor = 'grabbing'
}

function onUp() {
    gIsMouseDown = false
    gLastPos = null
    document.body.style.cursor = 'default'

}

function onMove(ev) {
    if (!gIsMouseDown) return
    const pos = getEvPos(ev)
    const dx = pos.x - gLastPos.x
    const dy = pos.y - gLastPos.y
    dragLine(dx, dy)
    gLastPos = pos
    renderMeme()

}

function renderImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderTxt(lines) {
    lines.forEach(line => {
        gCtx.lineWidth = 1.5
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = `${line.color}`
        gCtx.font = `${line.size}px ${line.fontFamily}`
        // gCtx.textAlign = 'left'
        // gCtx.textBaseline = 'middle'
        gCtx.fillText(line.txt, line.pos.x, line.pos.y)
        gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
        line.width = gCtx.measureText(line.txt).width
        line.height = gCtx.measureText(line.txt).hangingBaseline * -1
    })

}

function onSetLineTxt(elTxt) {
    setLineTxt(elTxt)
    renderMeme()
}

function onDownloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'My-Meme'
}

function onScaleTxt(diff) {
    scaleTxt(diff)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
}

function onColorPick(elColor) {
    setColor(elColor)
    renderMeme()

}

function drawRect(x, y, width, height) {
    gCtx.beginPath()
    gCtx.strokeStyle = 'blue'
    // gCtx.fillStyle = 'yellow'
    gCtx.lineWidth = 3
    // gCtx.fillRect(x, y, gBrush.size, gBrush.size)
    gCtx.strokeRect(x - 5, y + 5, width + 10, height - 10)

}

function drawFrame(lineIdx) {
    let selectedLine = gMeme.lines[lineIdx]
    drawRect(selectedLine.pos.x, selectedLine.pos.y + 4, selectedLine.width, selectedLine.height - 4)

}

function onLineClicked(position) {
    const { x: offsetX, y: offsetY } = position
    const clickedLine = gMeme.lines.findIndex(line => {

        return (offsetX >= line.pos.x && offsetX <= line.pos.x + line.width + 5 &&
            offsetY <= line.pos.y && offsetY >= line.pos.y + line.height)
    })
    if (clickedLine >= 0) {
        gMeme.selectedLineIdx = clickedLine
        renderMeme()
    }
    else {
        gMeme.selectedLineIdx = null
        renderMeme()
    }
}

function onSetFontSize(inputSize) {
    setFontSize(inputSize)
    renderMeme()
}

function onSetFontFamily(inputFont) {
    setFontFamily(inputFont)
    renderMeme()
}

function onAlignLeft() {
    alignLeft()
    renderMeme()
}

function onAlignCenter() {
    const canvasCenter = gElCanvas.clientWidth / 2
    alignCenter(canvasCenter)
    renderMeme()
}

function onAlignRight() {
    const canvasRihgt = gElCanvas.clientWidth
    alignRight(canvasRihgt)
    renderMeme()
}

function onMoveLine(diff) {
    moveLine(diff)
    renderMeme()
}

function onRemoveLine() {
    removeLine()
    renderMeme()
}


function getEvPos(ev) {
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        //* Prevent triggering the default mouse behavior
        ev.preventDefault()

        //* Gets the first touch point (could be multiple in touch event)
        ev = ev.changedTouches[0]

        /* 
        * Calculate touch coordinates relative to canvas 
        * position by subtracting canvas offsets (left and top) from page coordinates
        */
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,

        }
    }
    return pos
}

function onSaveMeme() {

    const memeSnapShot = gElCanvas.toDataURL()
    const memeId = makeId(5)
    const memeData = gMeme
    const memeToSave = { memeId, memeData, memeSnapShot }
    gMemes.unshift(memeToSave)
    saveMemes()
}

function renderSavedMemes() {
    const memes = getMemes()
    let strHTML = ''
    memes.onload =
        strHTML = memes.map(meme =>
            `<section class="gallery-item" onclick="onMemeClicked('${meme.memeId}')">
            <img src="${meme.memeSnapShot}"><button class="btn-remove" onclick="onRemoveMeme(event,'${meme.memeId}')"
            </section>`)

    document.querySelector('.saved-memes-container').innerHTML = strHTML.join('')
}

function onShowMemes() {
    hideElement('.memes-editor-container')
    hideElement('.gallery-container')
    showElement('.saved-memes-container')

    renderSavedMemes()
}

function onMemeClicked(memeId) {
    setMemeData(memeId)
    hideElement('.saved-memes-container')
    showElement('.memes-editor-container')
    renderMeme()
}


function onInputImg(ev) {
    loadImageFromInput(ev, renderInputImg)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    const reader = new FileReader()

    reader.onload = (event) => {
        const img = new Image()
        img.src = event.target.result

        img.onload = () => {
            onImageReady(img)
        }
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderInputImg(img) {
    const newImg = { id: 0, url: img.src }
    gMeme.selectedImgId = 0;
    gImgs.unshift(newImg)
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    hideElement('.gallery-container')
    showElement('.memes-editor-container')
    renderMeme()
    gImgs.shift()
}

function onClearSearch() {
    document.querySelector('.title-search').value = ''
    renderGallery()
}

function onUploadToFB(url) {
    // console.log('url:', url)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
}


function onUploadImg(ev) {
    ev.preventDefault()
    document.querySelector('.share-container').innerHTML = ''
    const canvasData = gElCanvas.toDataURL('image/jpeg')

    // After a successful upload, allow the user to share on Facebook
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
            <a href="${uploadedImgUrl}">Image Url</a>
            <p>Image url: ${uploadedImgUrl}</p>
           
            <button class="btn-facebook" target="_blank" onclick="onUploadToFB('${encodedUploadedImgUrl}')">
                Share on Facebook  
            </button>
        `
    }

    uploadImg(canvasData, onSuccess)
}

function onDrawSticker(elSticker) {
    gSticker = elSticker.innerText
    addLine()
    renderMeme()
}