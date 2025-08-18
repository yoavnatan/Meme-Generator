'use strict'

function toggleMenu() {
    document.body.classList.toggle('menu-open');
    document.querySelector('.btn-toggle-menu').innerText = (document.querySelector('.btn-toggle-menu').innerText === '☰') ? 'X' : '☰'
}

function closeMenu() {
    document.body.classList.remove('menu-open');
    document.querySelector('.btn-toggle-menu').innerText = '☰'
}


function flashMsg(msg) {
    const elUserMsg = document.querySelector('.user-msg')
    elUserMsg.innerText = msg
    elUserMsg.classList.add('open')

    setTimeout(() => {
        elUserMsg.classList.remove('open')
    }, 3000)
}