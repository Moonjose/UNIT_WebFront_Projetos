const whiteCar = document.getElementById('white');
const redCar = document.getElementById('red');
const resultText = document.getElementById('result');
const resetBtn = document.getElementById('resetar');
const acelerarBtn = document.getElementById('acelerar');
const desacelerarBtn = document.getElementById('desacelerar');
const btnBranco = document.getElementById('branco');
const btnVermelho = document.getElementById('vermelho');

let selectedCar = null;
let carSizes = {
    white: 50,
    red: 50
};
const baseSize = 50;     
const minSize = 20;      
const maxSize = 100;     

let leftOffset = 205;    
let rightOffset = 205;   
let topWhite = 60;       
let topRed = 60;         

const maxHorizontalDisplacement = 30; 
const maxVerticalDisplacement = 30;   

function selectCar(color) {
    selectedCar = color;
    resultText.textContent = color === 'white' ? 'Branco' : 'Vermelho';

    acelerarBtn.style.display = 'inline-block';
    desacelerarBtn.style.display = 'inline-block';
    resetBtn.style.display = 'inline-block';
}

function updateCarSize() {
    if (!selectedCar) return;

    const size = carSizes[selectedCar];
    let factor = (baseSize - size) / (baseSize - minSize);

    let horizontalDisplacement = factor * maxHorizontalDisplacement;
    let verticalDisplacement = factor * maxVerticalDisplacement;

    if (selectedCar === 'white') {
        whiteCar.style.width = `${size}px`;
        whiteCar.style.height = `${size}px`;
        whiteCar.style.left = `${leftOffset + horizontalDisplacement}px`;
        whiteCar.style.top = `${topWhite - verticalDisplacement}px`;
    } else if (selectedCar === 'red') {
        redCar.style.width = `${size}px`;
        redCar.style.height = `${size}px`;
        redCar.style.right = `${rightOffset + horizontalDisplacement}px`;
        redCar.style.top = `${topRed - verticalDisplacement}px`;
    }
}

function acelerar() {
    if (selectedCar && carSizes[selectedCar] > minSize) {
        carSizes[selectedCar] -= 10;
        updateCarSize();
    }
}

function desacelerar() {
    if (selectedCar && carSizes[selectedCar] < maxSize) {
        carSizes[selectedCar] += 10;
        updateCarSize();
    }
}

function reset() {
    selectedCar = null;
    carSizes.white = baseSize;
    carSizes.red = baseSize;

    whiteCar.style.width = `${baseSize}px`;
    whiteCar.style.height = `${baseSize}px`;
    whiteCar.style.left = `${leftOffset}px`;
    whiteCar.style.top = `${topWhite}px`;

    redCar.style.width = `${baseSize}px`;
    redCar.style.height = `${baseSize}px`;
    redCar.style.right = `${rightOffset}px`;
    redCar.style.top = `${topRed}px`;

    resultText.textContent = '?';

    acelerarBtn.style.display = 'none';
    desacelerarBtn.style.display = 'none';
    resetBtn.style.display = 'none';
}

btnBranco.addEventListener('click', () => selectCar('white'));
btnVermelho.addEventListener('click', () => selectCar('red'));
whiteCar.addEventListener('click', () => selectCar('white'));
redCar.addEventListener('click', () => selectCar('red'));

acelerarBtn.addEventListener('click', acelerar);
desacelerarBtn.addEventListener('click', desacelerar);
resetBtn.addEventListener('click', reset);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        acelerar();
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        desacelerar();
    }
});
