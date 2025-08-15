'use strict'

var storageKeyMemes = 'Memes'
var gMemes = []

var gImgs = [
    { id: 1, url: 'imgs/square/1.jpg', keywords: ['angry', 'trump', 'politics'] },
    { id: 2, url: 'imgs/square/2.jpg', keywords: ['cute', 'dog'] },
    { id: 3, url: 'imgs/square/3.jpg', keywords: ['cute', 'dog', 'baby', 'sleep'] },
    { id: 4, url: 'imgs/square/4.jpg', keywords: ['cute', 'cat', 'sleep', 'boaring'] },
    { id: 5, url: 'imgs/square/5.jpg', keywords: ['funny', 'baby', 'win'] },
    { id: 6, url: 'imgs/square/6.jpg', keywords: ['funny', 'tired', 'clumsy', 'man'] },
    { id: 7, url: 'imgs/square/7.jpg', keywords: ['funny', 'baby'] },
    { id: 8, url: 'imgs/square/8.jpg', keywords: ['interesting', 'love', 'fantasy', 'movie'] },
    { id: 9, url: 'imgs/square/10.jpg', keywords: ['politics', 'happy',] },]

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: `Add text here`,
            size: 40,
            color: 'white',
            fontFamily: 'Impact',
            pos: { x: 30, y: 80 }
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
        txt: `Add text here`,
        size: 30,
        color: 'white',
        fontFamily: 'Impact',
        pos: { x: 30, y: 250 }
    }
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx++
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