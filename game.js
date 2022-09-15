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
  const message = document.querySelector('#message');
  const wordSpaces = document.querySelector('#spaces');

  class Game {
    constructor() {
      this.word = randomWord();
      this.wrongGuesses = 0;
      this.allGuesses = [];
      this.maxWrongGuesses = 6;
    }

    allWordsChosen() {
      return this.word === undefined;
    }

    resetGame() {
      this.word = randomWord();
      this.wrongGuesses = 0;
      this.allGuesses = [];
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
  }

  const game = new Game();
  game.startGame();
  console.log(game.word);
  setTimeout(() => {
    game.startGame();
    console.log(game.word);
  }, 1000);
  setTimeout(() => {
    game.startGame();
    console.log(game.word);
  }, 2000);
  setTimeout(() => {
    game.startGame();
    console.log(game.word);
  }, 3000);
  setTimeout(() => {
    game.startGame();
    console.log(game.word);
  }, 4000);

});

