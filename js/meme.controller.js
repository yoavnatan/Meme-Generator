'use strict'

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    onShowGallery()
}

function renderMeme() {
    const { selectedImgId: imgId, selectedLineIdx: lineIdx, lines } = getMeme()
    let img = new Image
    img.src = gImgs[imgId].url

    img.onload = () => {
        renderImg(img)
        renderTxt(lines)
    }
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth - 40
}

function onDraw() {

}

function renderImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderTxt(lines, x = 10, y = 100) {
    lines.forEach(line => {
        gCtx.lineWidth = 1.5
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = `${line.color}`
        gCtx.font = `${line.size}px Arial`
        // gCtx.textAlign = 'center'
        // gCtx.textBaseline = 'middle'
        gCtx.fillText(line.txt, line.pos.x, line.pos.y)
        gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
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