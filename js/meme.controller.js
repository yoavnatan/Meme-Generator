'use strict'

var gImgs = [
    { id: 1, url: 'imgs/square/img1.jpg', keywords: ['angry', 'trump', 'politics'] },
    { id: 2, url: 'imgs/square/img2.jpg', keywords: ['cute', 'dog'] },
    { id: 3, url: 'imgs/square/img3.jpg', keywords: ['cute', 'dog', 'baby', 'sleep'] },
    { id: 4, url: 'imgs/square/img4.jpg', keywords: ['cute', 'cat', 'sleep', 'boaring'] },
    { id: 5, url: 'imgs/square/img5.jpg', keywords: ['funny', 'baby', 'win'] },
    { id: 6, url: 'imgs/square/img6.jpg', keywords: ['funny', 'tired', 'clumsy', 'man'] },
    { id: 7, url: 'imgs/square/img7.jpg', keywords: ['funny', 'baby'] },
    { id: 8, url: 'imgs/square/img8.jpg', keywords: ['interesting', 'love', 'fantasy', 'movie'] },
    { id: 9, url: 'imgs/square/img10.jpg', keywords: ['funny', 'kid', 'baby'] },]
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Write your text here'
            ,
            size: 20,
            color: 'white'
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }