// Memory Game

// переменные

const cards = document.querySelectorAll('.game__card');
// исходное состояние карты - перевернутое
let hasFlippedCard = false;
let firstCard, secondCard;
// нельзя нажимать на более 2-х карт
let lockBoard = false;


// функция переворота карточки
function flipCard() {
    if(lockBoard) return;
    // избежание двойного клика на одну и ту же карту подряд
    if(this === firstCard) return;
    this.classList.toggle('flip');
    if(!hasFlippedCard) {
        //     первый клик
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
        //     второй клик
        hasFlippedCard = false;
        secondCard = this;

        //     карты выбраны?
        checkForMatch();
}


// функция для проверки, с какими атрибутами "data-name" выбраны карты
function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disabledCards() : unFlipCards();
}


// функция, дающая одинаковым картам disable
function disabledCards() {
    firstCard.addEventListener('click', flipCard);
    secondCard.addEventListener('click', flipCard);
}


// функция, переворачивающая разные карты в исходное положение
function unFlipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
    }, 1000);
}


// тасовка карт перед началом раунда
(function shuffle() {
    cards.forEach(card => {
        let randomNum = Math.floor(Math.random() * 12);
        card.style.order = randomNum;
    });
})();


// обработчик события для всех карточек на странице
cards.forEach((card) => {
    card.addEventListener('click', flipCard);
});