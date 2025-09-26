// Enhanced localStorage functionality
// Check if localStorage is available
function isLocalStorageAvailable() {
    try {
        const test = 'localStorage-test';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

// Initialize score with localStorage or default values
let score;
if (isLocalStorageAvailable()) {
    score = JSON.parse(localStorage.getItem('score')) || {
        wins: 0,
        losses: 0,
        ties: 0
    };
} else {
    console.warn('⚠️ localStorage not available, using in-memory storage only');
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    };
}

// Add visual feedback for localStorage loading
function showStorageStatus() {
    const hasStoredScore = localStorage.getItem('score') !== null;
    if (hasStoredScore) {
        console.log('✅ Score loaded from localStorage');
        // Optional: Add a subtle visual indicator
        document.querySelector('.js-score').style.opacity = '0.7';
        setTimeout(() => {
            document.querySelector('.js-score').style.opacity = '1';
        }, 500);
    } else {
        console.log('🆕 Starting with fresh score');
    }
}

updateScoreElement();
showStorageStatus();

/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;

        const autoPlayButton = document.querySelector('.js-auto-play-button');
        autoPlayButton.innerHTML = 'Stop Playing';
        autoPlayButton.style.background = 'linear-gradient(145deg, #f44336, #d32f2f)';
        autoPlayButton.style.boxShadow = '0 4px 15px rgba(244, 67, 54, 0.3)';

    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;

        const autoPlayButton = document.querySelector('.js-auto-play-button');
        autoPlayButton.innerHTML = 'Auto Play';
        autoPlayButton.style.background = 'linear-gradient(145deg, #4CAF50, #45a049)';
        autoPlayButton.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.3)';
    }
}

document.querySelector('.js-auto-play-button')
    .addEventListener('click', () => {
        autoPlay();
    });

// Add click animations to buttons
function addButtonClickAnimation(button) {
    button.style.transform = 'scale(0.95)';
    button.style.transition = 'transform 0.1s ease';

    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 100);
}

document.querySelector('.js-rock-button')
    .addEventListener('click', (event) => {
        addButtonClickAnimation(event.target);
        playGame('rock');
    });

document.querySelector('.js-paper-button')
    .addEventListener('click', (event) => {
        addButtonClickAnimation(event.target);
        playGame('paper');
    });

document.querySelector('.js-scissors-button')
    .addEventListener('click', (event) => {
        addButtonClickAnimation(event.target);
        playGame('scissors');
    });

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        const rockButton = document.querySelector('.js-rock-button');
        addButtonClickAnimation(rockButton);
        playGame('rock');
    } else if (event.key === 'p') {
        const paperButton = document.querySelector('.js-paper-button');
        addButtonClickAnimation(paperButton);
        playGame('paper');
    } else if (event.key === 's') {
        const scissorsButton = document.querySelector('.js-scissors-button');
        addButtonClickAnimation(scissorsButton);
        playGame('scissors');

    } else if (event.key === 'a') {
        autoPlay();

    } else if (event.key === 'Backspace') {

        showResetConfirmation();
    }
});

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose.';
        } else if (computerMove === 'paper') {
            result = 'You win.';
        } else if (computerMove === 'scissors') {
            result = 'Tie.';
        }

    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win.';
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        } else if (computerMove === 'scissors') {
            result = 'You lose.';
        }

    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You lose.';
        } else if (computerMove === 'scissors') {
            result = 'You win.';
        }
    }

    if (result === 'You win.') {
        score.wins += 1;
    } else if (result === 'You lose.') {
        score.losses += 1;
    } else if (result === 'Tie.') {
        score.ties += 1;
    }

    // Enhanced localStorage saving with error handling
    if (isLocalStorageAvailable()) {
        try {
            localStorage.setItem('score', JSON.stringify(score));
            console.log('💾 Score saved to localStorage:', score);

            // Add visual feedback for successful save
            const scoreElement = document.querySelector('.js-score');
            scoreElement.style.transform = 'scale(1.05)';
            scoreElement.style.transition = 'transform 0.2s ease';
            setTimeout(() => {
                scoreElement.style.transform = 'scale(1)';
            }, 200);

        } catch (error) {
            console.error('❌ Failed to save score to localStorage:', error);
            // Fallback: Show user that score couldn't be saved
            alert('Unable to save score. Your progress may not persist.');
        }
    } else {
        console.log('📝 Score updated in memory only (localStorage unavailable)');
    }

    updateScoreElement();

    // Add visual feedback with animations
    const resultElement = document.querySelector('.js-result');
    resultElement.innerHTML = result;

    // Remove previous result classes
    resultElement.classList.remove('win', 'lose', 'tie', 'show');

    // Add appropriate class based on result
    if (result === 'You win.') {
        resultElement.classList.add('win', 'show');
    } else if (result === 'You lose.') {
        resultElement.classList.add('lose', 'show');
    } else if (result === 'Tie.') {
        resultElement.classList.add('tie', 'show');
    }

    // Animate the moves display
    const movesElement = document.querySelector('.js-moves');
    movesElement.innerHTML = `You
  <img src="images/${playerMove}-emoji.png" class="move-icon">
  <img src="images/${computerMove}-emoji.png" class="move-icon">
  Computer`;

    // Add a subtle animation to the moves display
    movesElement.style.transform = 'scale(0.95)';
    setTimeout(() => {
        movesElement.style.transform = 'scale(1)';
    }, 100);
}

function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors';
    }

    return computerMove;
}

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    // Enhanced localStorage clearing with feedback
    if (isLocalStorageAvailable()) {
        try {
            localStorage.removeItem('score');
            console.log('🗑️ Score cleared from localStorage');

            // Add visual feedback for successful reset
            const scoreElement = document.querySelector('.js-score');
            scoreElement.style.background = 'rgba(255, 152, 0, 0.2)';
            scoreElement.style.transition = 'background 0.3s ease';
            setTimeout(() => {
                scoreElement.style.background = 'rgba(255,255,255,0.1)';
            }, 1000);

        } catch (error) {
            console.error('❌ Failed to clear score from localStorage:', error);
        }
    } else {
        console.log('🗑️ Score cleared from memory only (localStorage unavailable)');
    }

    updateScoreElement();
}

document.querySelector('.js-reset-score-button')
    .addEventListener('click', () => {

        showResetConfirmation();
    });

function showResetConfirmation() {
    document.querySelector('.js-reset-confirmation')
        .innerHTML = `
        Are you sure you want to reset the score?
        <button class="js-reset-confirm-yes reset-confirm-button">
          Yes
        </button>
        <button class="js-reset-confirm-no reset-confirm-button">
          No
        </button>
      `;

    document.querySelector('.js-reset-confirm-yes')
        .addEventListener('click', () => {
            resetScore();
            hideResetConfirmation();
        });

    document.querySelector('.js-reset-confirm-no')
        .addEventListener('click', () => {
            hideResetConfirmation();
        });
}

function hideResetConfirmation() {
    document.querySelector('.js-reset-confirmation')
        .innerHTML = '';
}