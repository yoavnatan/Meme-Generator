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
            txt: `I don't know how`,
            size: 60,
            color: 'white',
            pos: { x: 80, y: 100 }
        },
        {
            txt: `But I'm gonna do this`,
            size: 50,
            color: 'white',
            pos: { x: 70, y: 500 }
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gMeme
}