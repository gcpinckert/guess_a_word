const randomWord = (function() {
  const words = ['apple', 'banana', 'orange', 'pear'];

  function randomIndex() {
    return Math.floor(Math.random() * words.length);
  }

  return function() {
    let deletedWord = words.splice(randomIndex(), 1);
    return deletedWord.length === 0 ? undefined : deletedWord[0];
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const message = document.querySelector('#message');
  const wordSpaces = document.querySelector('#spaces');
  const guesses = document.querySelector('#guesses');
  const newGameLink = document.querySelector('a');
  const apples = document.querySelector('#apples');

  class Game {
    constructor() {
      this.word;
      this.wrongGuesses = 0;
      this.allGuesses = [];
      this.maxWrongGuesses = 6;
      this.end = false;
    }

    allWordsChosen() {
      return this.word === undefined;
    }

    resetGame() {
      this.word = randomWord();
      this.wrongGuesses = 0;
      this.allGuesses = [];
      this.end = false;

      document.querySelectorAll('span').forEach(span => {
        span.remove();
      });

      message.textContent = '';
      newGameLink.classList.add('hidden');
      apples.classList.remove(apples.classList[0]);
      body.classList.remove(body.classList[0]);
    }

    startGame() {
      this.resetGame();
      if (this.allWordsChosen()) {
        message.textContent = "Sorry, I've run out of words!";
      } else {
        let letters = this.word.length;
        for (let i = 0; i < letters; i += 1) {
          wordSpaces.appendChild(document.createElement('span'));
        }
      }
    }

    singleTurn(event) {
      if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
        this.userGuessesLetter(event.key);
        if (this.end) {
          document.removeEventListener('keyup', this.singleTurn);
          newGameLink.classList.remove('hidden');
        }
      }
    }

    userGuessesLetter(letter) {
      if (this.allGuesses.includes(letter)) {
        return;
      }

      this.allGuesses.push(letter);
      const guess = document.createElement('span');
      guess.textContent = letter;
      guesses.appendChild(guess);

      this.word.includes(letter) ? this.correctGuess(letter) : this.wrongGuess();
    }

    correctGuess(letter) {
      const matchingIdx = [];
      this.word.split('').forEach((char, idx) => {
        if (char === letter) {
          matchingIdx.push(idx);
        }
      });

      const wordBlanks = Array.prototype.slice.call(document.querySelectorAll('#spaces span'));

      matchingIdx.forEach(idx => {
        wordBlanks[idx].textContent = letter;
      });

      if (wordBlanks.every(span => span.textContent)) {
        this.won();
      }
    }

    wrongGuess() {
      apples.classList.remove(`guess_${this.wrongGuesses}`);

      this.wrongGuesses += 1;
      apples.classList.add(`guess_${this.wrongGuesses}`);

      if (this.wrongGuesses === this.maxWrongGuesses) {
        this.lose();
      }
    }

    lose() {
      body.classList.add('lose');
      message.textContent = "Sorry, you didn't guess the word."
      this.end = true;
    }

    won() {
      body.classList.add('win');
      message.textContent = `You won! The word is ${this.word.toUpperCase()}`;
      this.end = true;
    }
  }

  
  const game = new Game();
  game.startGame();

  document.addEventListener('keyup', game.singleTurn.bind(game));

  newGameLink.addEventListener('click', event => {
    event.preventDefault();
    game.startGame();
  });
});

