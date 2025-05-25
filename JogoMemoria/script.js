const fruits = ['banana', 'banana', 'maca', 'maca', 'morango', 'morango'];
let countPlay = 0;
let allowClick = true;
let globalTries = Number(localStorage.getItem('globalTries')) || 0;

document.querySelector('.tries').innerHTML = `Tentativas: ${globalTries}`;
document.querySelector('.btn-restart').addEventListener('click', restartGame);

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function updateTries() {
    globalTries += 1;
    document.querySelector('.tries').innerHTML = `Tentativas: ${globalTries}`;
    localStorage.setItem('globalTries', globalTries);
}

function countPlays() {
    countPlay += 1;
    if (countPlay === 2) {
        allowClick = false;
        checkPlay();
        updateTries();
    }
}

function onCardClick(e) {
    if (!allowClick) return;
    const card = e.currentTarget;
    if (!card.classList.contains('flipped')) {
        card.classList.add('flipped');
        countPlays();
    }
}

function checkPlay() {
    const flippedCards = document.querySelectorAll('.card.flipped:not(.matched)');
    if (flippedCards.length !== 2) return;

    const fruit1 = flippedCards[0].querySelector('.card-back').getAttribute('src');
    const fruit2 = flippedCards[1].querySelector('.card-back').getAttribute('src');

    if (fruit1 === fruit2) {
        flippedCards[0].classList.add('matched');
        flippedCards[1].classList.add('matched');
        countPlay = 0;
        allowClick = true;
        checkWin();
    } else {
        setTimeout(() => {
            flippedCards[0].classList.remove('flipped');
            flippedCards[1].classList.remove('flipped');
            countPlay = 0;
            allowClick = true;
        }, 800);
    }
}

function checkWin() {
    const allFlippedCards = document.querySelectorAll('.card.flipped.matched');
    if (allFlippedCards.length === fruits.length) {
        setTimeout(() => {
            document.getElementById('modalWin').classList.add('active');
        }, 600);
    }
}

function createCards() {
    const container = document.querySelector('.container');
    container.innerHTML = '';
    shuffle(fruits);
    fruits.forEach(fruit => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-inner">
                <img src="assets/${fruit}.png" alt="Card Back" class="card-back">
                <img src="assets/card_back.png" alt="Card Front" class="card-front">
            </div>
        `;
        card.addEventListener('click', onCardClick);
        container.appendChild(card);
    });
}

function restartGame() {
    countPlay = 0;
    allowClick = true;
    createCards();
}

function closeModalAndRestart() {
    document.getElementById('modalWin').classList.remove('active');
    restartGame();
}

createCards();