
let numCards = 60;
let currentCard = true;
const cardFileTitle = 'card back.svg';
const cardArrRef = document.getElementById('card-arr');
let targetCard = -1;
let steps = 0;
let cardNums = undefined;


function initialize(n = numCards) {
    numCards = n;
    cardNums = populateArray();
    pickTargetAndSteps();
    createCards();
    updateInfoFields();
}


function createCards() {
    for (let i=0; i<numCards; i++) {
        let col = undefined;

        if (currentCard) col = 'red';
        else col = 'blue';

        let container = document.createElement('div');
        container.classList.add('card-face-container');

        let img = document.createElement('img');
        img.classList.add('card');
        img.classList.add(col);
        img.classList.add(i);

        img.src = `images/${col} ${cardFileTitle}`;
        img.addEventListener('click', (e) => flipCard(e));
        container.appendChild(img);
        cardArrRef.appendChild(container);

        currentCard = !currentCard;
    }
}


function flipCard(e) {
    steps--;
    updateFlips();

    let cardColor = e.target.classList[1];
    let cardNum = parseInt(cardNums[e.target.classList[2]]);
    e.target.src = `images/${cardColor} card front.svg`;
    e.target.classList.add('card-face');
    e.target.classList.remove('card');

    let text = document.createElement('p');
    text.classList.add('centered');
    text.innerText = cardNum;
    e.target.parentElement.appendChild(text);

    if (cardNum === targetCard) checkWin(true);
    else if (steps === 0) checkWin(false);
}


// min and max included 
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function populateArray() {
    let hs = new Set();
    let arr = [...Array(numCards).keys()];

    arr = arr.map((element) => {
        // let min = ((element + 1) * 10) - 10 + 1;
        // let max = (element + 1) * 10;
        // // console.log(min, max);
        // return randomInt(min, max);

        let num = randomInt(1, 1000);
        while (hs.has(num)) {
            num = randomInt(1, 1000);
        }
        hs.add(num);
        return num;
    });
    return arr.sort((a, b) => a - b);
}


function pickTargetAndSteps() {
    targetCard = cardNums[randomInt(0, numCards - 1)];
    binarySearch(cardNums, targetCard, 0, numCards - 1);
}


function binarySearch(arr, target, head, tail) {
    if (head > tail) return -1;

    steps++;
    let median = head + Math.floor((tail - head) / 2);
    if (arr[median] === target) return median;

    if (target < arr[median]) {
        return binarySearch(arr, target, head, median - 1);
    }
    else {
        return binarySearch(arr, target, median + 1, tail);
    }
}


function updateInfoFields() {
    document.getElementById('target-text').innerText = 'Target Card: ' + targetCard;
    updateFlips();
}


function updateFlips() {
    const flipsTextRef = document.getElementById('flips-text');
    flipsTextRef.innerText = 'Flips remaining: ' + steps;
}


function checkWin(condition) {
    if (condition) {
        alert('You Win!');
    }
    else {
        alert('You Lose!');
    }
}


initialize();


function reset() {
    currentCard = true;
    targetCard = -1;
    steps = 0;
    cardNums = [];
    cardArrRef.replaceChildren();
    const n = parseInt(document.getElementById('reset-num').value);
    initialize(n);
}

