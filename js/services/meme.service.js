'use strict'

var gImgs = [
    { id: 1, url: 'imgs/square/1.jpg', keywords: ['angry', 'trump', 'politics'] },
    { id: 2, url: 'imgs/square/2.jpg', keywords: ['cute', 'dog'] },
    { id: 3, url: 'imgs/square/3.jpg', keywords: ['cute', 'dog', 'baby', 'sleep'] },
    { id: 4, url: 'imgs/square/4.jpg', keywords: ['cute', 'cat', 'sleep', 'boaring'] },
    { id: 5, url: 'imgs/square/5.jpg', keywords: ['funny', 'baby', 'win'] },
    { id: 6, url: 'imgs/square/6.jpg', keywords: ['funny', 'tired', 'clumsy', 'man'] },
    { id: 7, url: 'imgs/square/7.jpg', keywords: ['funny', 'baby'] },
    { id: 8, url: 'imgs/square/8.jpg', keywords: ['interesting', 'love', 'fantasy', 'movie'] },
    { id: 9, url: 'imgs/square/10.jpg', keywords: ['funny', 'kid', 'baby'] },]

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: `Add text here`,
            size: 40,
            color: 'white',
            pos: { x: 30, y: 80 }
        },
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
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

