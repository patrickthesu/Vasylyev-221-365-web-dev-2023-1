"use strict";

let step = true;
let count = 0;
let win = false;

const body = document.querySelector('body');
const popup = document.getElementById('popup-wrapper');
const field = document.querySelector('.field');
const menu = document.getElementById('menu');
const notification = document.getElementById('notification');

const notificationNextButton = document.getElementById("continue");
const changeThemeButton = document.getElementById('change-theme');
const newGameButton = document.getElementById('start-game');


function hidePopoup() {
    console.log('hiding popup');
    popup.classList.add('hiden');
}
function showPopoup() {
    popup.classList.remove('hiden');
}

function setDarkTheme() {
    body.classList.add('dark-theme');
    body.classList.remove('white-theme');
}

function setWhiteTheme() {
    body.classList.add('white-theme');
    body.classList.remove('dark-theme');
}

function changeTheme() { 
    body.classList.contains('white-theme') ? setDarkTheme() : setWhiteTheme();
}

function addElems() {
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        field.append(cell);
    }
}

function showNotification(message, className) {
    showPopoup();
    popup.classList.add(className);
    notification.classList.remove('hiden');
    notification.textContent = message;
    notificationNextButton.classList.remove('hiden');
    menu.classList.add('hiden');
}

function showNotificationNext() {
    popup.classList.remove('win');
    popup.classList.remove('lose');
    popup.classList.remove('draw'); 
    menu.classList.remove('hiden');
    notificationNextButton.classList.add('hiden');
    notification.classList.add('hiden');
}

function winable() {
    const items = document.querySelectorAll('.cell');
    for (let i = 0; i < 3; i++) {
        let counter = 0;
        for (let j = 0; j < 2; j++) {
            if (items[i * 3 + j].textContent === 
                items[i * 3 + j + 1].textContent && 
                items[i * 3 + j].textContent !== ''
            ) {
                counter++;
            }
        }
        if (counter === 2) {
            win = true;
            showNotification((!step 
                ? 'Победили крестики'
                : 'Победили нолики'), 'win'
            );
            return;
        }
    }
}

function diagonalMainChecked() {
    let items = document.querySelectorAll('.cell');
    let count = 0;
    for (let i = 0; i < 2; i++) {
        if (items[i * 4].textContent === '') {
            break;
        }
        if (items[i * 4].textContent === items[(i + 1) * 4].textContent) {
            count++;
        }
    }
    if (count == 2) {
        win = true;
        showNotification((!step ? 
            'Победили крестики' : 
            'Победили нолики'), 'win'
        );
    }
}

function diagonalSecondChecked() {
    let items = document.querySelectorAll('.cell');
    let count = 0;
    for (let i = 0; i < 2; i++) {
        if (items[i * 2 + 2].textContent === '') {
            break;
        }
        if (items[i * 2 + 2].textContent === items[i * 2 + 4].textContent) {
            count++;
        }
    }
    if (count == 2) {
        win = true;
        showNotification((!step ? 
            'Победили крестики' : 
            'Победили нолики'), 'win'
        );
    }
}

function notwin() {
    const items = document.querySelectorAll('.cell');
    for (let i = 0; i < items.length; i++) {
        if (items[i].textContent === '') {
            return false;
        }
    }
    return true;
}

function verticalWin() {
    const items = document.querySelectorAll('.cell');
    for (let i = 0; i < 3; i++) {
        let counter = 0;
        for (let j = 0; j < 2; j++) {
            if (items[j * 3 + i].textContent 
                === items[j * 3 + i + 3].textContent
                && items[j * 3 + i].textContent !== '') {
                counter++;
            }
        }
        if (counter === 2) {
            win = true;
            showNotification((!step 
                ? 'Победили крестики'
                : 'Победили нолики'), 'win');
            return;
        }
    }
}

function clicked(event) {
    const target = event.target;
    if (target.textContent !== '') {
        return;
    }
    if (step) {
        step = false;
        target.textContent = 'X';
    } else {
        step = true;
        target.textContent = 'O';
    }
    if (win) {
        showNotification('Игра окончена. Начните заново', 'lose');
        return;
    }
    if (notwin()) {
        showNotification('Ничья', 'draw');
        return;
    } 
    count++;
    winable();
    diagonalMainChecked();
    diagonalSecondChecked();
    verticalWin();
}


function cleanGameField() {
    hidePopoup();
    const items = document.querySelectorAll('.cell');
    for (let i = 0; i < items.length; i++) {
        items[i].textContent = '';
    }
    step = true;
    count = 0;
    win = false;
}

field.addEventListener('click', clicked);
newGameButton.addEventListener('click', cleanGameField);
changeThemeButton.onclick = changeTheme;
notificationNextButton.onclick = showNotificationNext;

window.onload = addElems;
