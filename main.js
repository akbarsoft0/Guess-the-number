const elements = {
    again: document.querySelector('.again'),
    secret: document.querySelector('.secret'),
    guess: document.querySelector('.guess'),
    check: document.querySelector('.check'),
    message: document.querySelector('.message'),
    chance: document.querySelector('.chance span'),
    score: document.querySelector('.score span'),
    body: document.querySelector('body'),
};

let secretNumber = Math.floor(Math.random() * 100) + 1;
let score = 0;
let remainingChances = 20;

function updateMessage(message, color) {
    elements.message.textContent = message;
    elements.message.style.color = color;
}

function updateBackground(color) {
    elements.body.style.backgroundColor = color;
}

function updateScoreAndChances() {
    if (remainingChances > score) {
        score = remainingChances;
        elements.score.textContent = score;
    }
}

function handleGuess() {
    const guessValue = parseInt(elements.guess.value);
    let message = '';
    let messageColor = '';
    let backgroundColor = '';

    if (isNaN(guessValue)) {
        message = '⛔ no input!';
    } else if (guessValue === secretNumber) {
        message = '🎉 correct number!';
        messageColor = '#FF9800';
        backgroundColor = '#4CAF50';
        elements.secret.textContent = secretNumber;
        elements.secret.style.width = '30rem';
        updateScoreAndChances();
    } else {
        if (remainingChances > 1) {
            message = guessValue > secretNumber ? '📈 too high!' : '📉 too low!';
            messageColor = guessValue > secretNumber ? 'red' : 'blue';
            remainingChances--;
            elements.chance.textContent = remainingChances;
        } else {
            message = '🤦‍♂️ you lost!';
            messageColor = 'red';
            elements.chance.textContent = 0;
        }
    }

    updateMessage(message, messageColor);
    updateBackground(backgroundColor);
}

elements.guess.addEventListener('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        handleGuess();
    }
});

elements.check.addEventListener('click', handleGuess);

elements.again.addEventListener('click', () => {
    remainingChances = 20;
    secretNumber = Math.floor(Math.random() * 100) + 1;
    elements.chance.textContent = remainingChances;
    elements.guess.value = '';
    updateMessage('🤔 Start Guessing...', '#fff');
    elements.secret.style.width = '15rem';
    updateBackground('#009688');
    elements.secret.textContent = '?';
});
