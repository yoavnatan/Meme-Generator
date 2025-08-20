'use strict'

function toggleMenu() {
    document.body.classList.toggle('menu-open');
    document.querySelector('.btn-toggle-menu').innerText = (document.querySelector('.btn-toggle-menu').innerText === '☰') ? 'X' : '☰'
    setTimeout(() => { document.querySelector('.search-line-input-container').classList.toggle('disabled') }, 400)
    setTimeout(() => { document.querySelector('.btn-font-control.fa-upload').classList.toggle('disabled') }, 400)

}

function closeMenu() {
    document.body.classList.remove('menu-open');
    setTimeout(() => { document.querySelector('.search-line-input-container').classList.remove('disabled') }, 400)

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
