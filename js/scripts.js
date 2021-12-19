window.onload = function () {
  class Hangman {
    constructor() {
      this.wins = 0;
      this.losses = 0;
      this.guesses = 9;
      this.correctGuesses = 0;
      this.wrong = 0;
      this.guessesArray = [];
      this.words = [
        'Centipede',
        'Defender',
        'Tron',
        'Galaxy',
        'Asteroid',
        'Cluster',
        'Comet',
        'Dust',
        'Earth',
        'Saturn',
        'Meteor',
        'Nebula',
        'Quasar',
        'Supernova',
        'Sputnik',
        'Blackhole',
      ];
      this.alphabet = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
      ];
      this.wawa = new Audio('audio/wawa.mp3');
      this.randomWord = '';

      // Dom Elements
      this.hangman = document.getElementById('hangman-img');
      this.alphabetWrap = document.getElementById('alphabet-wrap');
      this.wordWrap = document.getElementById('word-wrap');
      this.statGuesses = document.querySelector('.game-stats-guesses');
        }

    playGuessSond() {
      this.wawa.play();
    }

    generateRandomWord() {
      this.randomWord =
        this.words[Math.floor(Math.random() * this.words.length)].toLowerCase();
    }

    // Creates a div for each letter in randomWord
    generateCurrentWord() {
      document.querySelector('.loose-heading').style.display = 'none';
      document.querySelector('.win-heading').style.display = 'none';
      document.querySelector('.game-start').style.display = 'none';

      this.generateRandomWord();
      this.hangman.src = 'images/robot-hangman-0.png';
      this.wordWrap.innerHTML = '';

      this.randomWord.split('').forEach((letter) => {
        var div = document.createElement('div');
        div.id = `word-letter-${letter}`;
        div.className = `word-letter word-letter-${letter}`;
        this.wordWrap.appendChild(div);
      });
    }

    // Create a div for each letter in alphabet array
    alphabetList() {
      this.alphabet.forEach((letter) => {
        var div = document.createElement('div');
        div.id = `letter-${letter}`;
        div.className = 'letter';
        div.innerHTML = letter;
        this.alphabetWrap.appendChild(div);
      });
    }

    // Checks if letter exist in word
    checkGuess(guess) {
      var letterGuess = document.querySelectorAll('.word-letter-' + guess);

      // loop through randomWord and see if guess matches
      this.randomWord.split('').forEach((letter) => {
        if (letter === guess) {
          this.playGuessSond();
          this.correctGuesses++;
          this.guessesArray.push(guess);

          letterGuess.forEach((letter) => {
            letter.innerHTML = guess;
          });
        }
      });

      // if guess doesnt exist in randomWord
      if (this.randomWord.indexOf(guess) === -1) {
        this.wrong++;
        this.hangman.src = `images/robot-hangman-${this.wrong}.png`;
        this.guesses--;
        this.statGuesses.innerHTML = this.guesses;
      }

      // You Win
      if (this.correctGuesses === this.randomWord.length) {
        this.wins++;

        document.querySelector('.win-heading').style.display = 'block';
        document.querySelector('.game-stats-wins').innerHTML = this.wins;
        document.querySelector('.game-start').style.display = 'block';
      }

      // You Loose
      if (this.guesses === 0) {
        this.losses++;

        document.querySelector('.loose-heading').style.display = 'block';
        document.querySelector('.game-stats-losses').innerHTML = this.losses;
        document.querySelector('.game-start').style.display = 'block';

        this.wordWrap.innerHTML = '';

        this.randomWord.split('').forEach((letter) => {
          var div = document.createElement('div');
          div.id = `word-letter-${letter}`;
          div.className = `word-letter word-letter-${letter}`;

          if (this.guessesArray.indexOf(letter) === -1) {
            div.classList.add('word-letter-missing');
          }

          div.innerHTML = letter;
          this.wordWrap.appendChild(div);
        });
      }
    }

    letterGuessed(letter) {
      var guess = document.getElementById('letter-' + letter);

      if (
        !guess.classList.contains('active') &&
        this.guesses > 0 &&
        this.correctGuesses !== this.randomWord.length
      ) {
        this.checkGuess(letter);
      }

      guess.classList.add('active');
    }

    eventListeners() {
      // Get all elements with class letter loop through track click
      document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('letter')) {
          this.letterGuessed(e.target.innerHTML);
        }
      });

      // Get which key was pressed
      document.addEventListener('keyup', (e) => {
        // Only track letters
        if (e.keyCode <= 90 && e.keyCode >= 65) {
          this.letterGuessed(String.fromCharCode(e.keyCode).toLowerCase());
        }
      });

      // Reset game when enter is clicked
      document.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
          this.resetGame();
        }
      });
    }

    // Reset Game
    resetGame() {
      this.correctGuesses = 0;
      this.guessesArray = [];
      this.guesses = 9;
      this.wrong = 0;

      this.statGuesses.innerHTML = this.guesses;
      var alphabetLetter = document.querySelectorAll('.letter');

      alphabetLetter.forEach((letter) => {
        letter.classList.remove('active');
      });

      // Generate New Word
      this.generateCurrentWord();
    }

    // Start Game
    start() {
      this.alphabetList();
      this.eventListeners();
      this.resetGame();
    }
  }

  const game = new Hangman();
  game.start();
};
