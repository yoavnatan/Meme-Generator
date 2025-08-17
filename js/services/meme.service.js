'use strict'

var storageKeyMemes = 'Memes'
var gMemes = []
var gSticker

var gImgs = [
    { id: 1, url: 'imgs/square/1.jpg', keywords: ['angry', 'trump', 'politics'] },
    { id: 2, url: 'imgs/square/2.jpg', keywords: ['cute', 'dog'] },
    { id: 3, url: 'imgs/square/3.jpg', keywords: ['cute', 'dog', 'baby', 'sleep'] },
    { id: 4, url: 'imgs/square/4.jpg', keywords: ['cute', 'cat', 'sleep', 'boaring'] },
    { id: 5, url: 'imgs/square/5.jpg', keywords: ['funny', 'baby', 'win'] },
    { id: 6, url: 'imgs/square/6.jpg', keywords: ['funny', 'tired', 'clumsy', 'man'] },
    { id: 7, url: 'imgs/square/7.jpg', keywords: ['funny', 'baby'] },
    { id: 8, url: 'imgs/square/8.jpg', keywords: ['interesting', 'love', 'fantasy', 'movie'] },
    { id: 9, url: 'imgs/square/10.jpg', keywords: ['politics', 'happy',] },
    { id: 10, url: 'imgs/square/16.jpg', keywords: ['movie', 'funny',] },
    { id: 9, url: 'imgs/square/17.jpg', keywords: ['politics'] },
    { id: 9, url: 'imgs/various-ratios/2.jpg', keywords: ['movie', 'happy'] },
    { id: 9, url: 'imgs/various-ratios/One-Does-Not-Simply.jpg', keywords: ['celeb', 'movie'] },
    { id: 9, url: 'imgs/various-ratios/Oprah-You-Get-A.jpg', keywords: ['celeb', 'oprah'] }]


var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: `Add text here`,
            size: 40,
            color: 'white',
            fontFamily: 'Impact',
            pos: { x: 100, y: 80 },
        },
        {
            txt: `Add text here`,
            size: 40,
            color: 'white',
            fontFamily: 'Impact',
            pos: { x: 100, y: 380 },
        },
    ]
}
var storageKeyMeme = 'Memes'
var gKeywordSearchCountMap = { 'funny': 3, 'cat': 5, 'baby': 1, 'politics': 8, 'happy': 10, 'movie': 1 }

function getMeme() {
    return gMeme
}

function getImgs(filterBy) {
    return _filterImgs(filterBy)
}
function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(imgIdx) {
    gMeme.selectedImgId = imgIdx
}

function scaleTxt(diff) {

    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function addLine() {
    const newLine = {
        txt: gSticker || `Add text here`,
        size: 40,
        color: 'white',
        fontFamily: 'Impact',
        pos: { x: 100, y: 230 }
    }
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx++
    gSticker = ''
}

function switchLine() {
    if (gMeme.lines.length === 1) return
    if (!gMeme.lines[gMeme.selectedLineIdx + 1]) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
    console.log(gMeme.selectedLineIdx)
}

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setFontSize(fontSize) {
    gMeme.lines[gMeme.selectedLineIdx].size = +fontSize
}

function setFontFamily(fontFamily) {
    gMeme.lines[gMeme.selectedLineIdx].fontFamily = fontFamily
}

function alignLeft() {
    const line = getSelectedLine()
    line.pos.x = 30
}

function alignCenter(center) {
    const line = getSelectedLine()
    line.pos.x = center - line.width / 2
}

function alignRight(right) {
    const line = getSelectedLine()
    line.pos.x = right - line.width - 30
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function moveLine(diff) {
    const line = getSelectedLine()
    line.pos.y -= 5 * diff
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function dragLine(dx, dy) {
    const line = getSelectedLine()
    line.pos.x += dx
    line.pos.y += dy
}

function getRandomImg() {
    return [getRandomInt(0, gImgs.length)]
}
function setRandomSentence() {
    gMeme.lines[gMeme.selectedLineIdx].txt = makeLorem(3)
}

function saveMemes() {
    saveToStorage(storageKeyMemes, gMemes)
}

function getMemes() {
    gMemes = loadFromStorage(storageKeyMemes) || []
    return gMemes
}

function setMemeData(memeId) {
    const { memeData } = getMemeById(memeId)
    gMeme = memeData
}

function getMemeById(memeId) {
    return gMemes.find(meme => meme.memeId === memeId)
}

function _filterImgs(filterBy) {
    let imgs = gImgs.slice()
    if (filterBy) {
        imgs = imgs.filter(img => img.keywords.map(keyword => keyword.toLowerCase()).join('').includes(filterBy.toLowerCase()))
    }
    return imgs
}

async function uploadImg(imgData, onSuccess) {
    const CLOUD_NAME = 'webify'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData()
    formData.append('file', imgData)
    formData.append('upload_preset', 'webify')
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        onSuccess(data.secure_url)

    } catch (err) {
        console.log(err)
    }
}

function rotateLine() {
    gMeme.lines[gMeme.selectedLineIdx].deg += 0.45

}

function removeMeme(memeIdx) {
    const idx = gMemes.findIndex(meme => meme.memeId === memeIdx)
    gMemes.splice(idx, 1)
    saveMemes()
}