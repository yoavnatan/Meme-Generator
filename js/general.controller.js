'use strict'

function toggleMenu() {
    document.body.classList.toggle('menu-open');
    document.querySelector('.btn-toggle-menu').innerText = (document.querySelector('.btn-toggle-menu').innerText === '☰') ? 'X' : '☰'
}

