window.onload = function () {

  // Define variables/arrays
  var wins = 0;
  var losses = 0;
  var guesses = 9;
  var correctGuesses = 0;
  var wrong = 0;
  var guessesArray = [];
  var words = [ 'Centipede', 'Defender', 'Tron', 'Galaxy', 'Asteroid', 'Cluster', 'Comet', 'Dust', 'Earth', 'Saturn', 'Meteor', 'Nebula', 'Quasar', 'Supernova', 'Sputnik', 'Blackhole' ];
  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  var wawa = new Audio('audio/wawa.mp3');
  var randomWord;
  
  // Dom Elements
  var hangman = document.getElementById('hangman-img');
  var alphabetWrap = document.getElementById('alphabet-wrap');
  var wordWrap = document.getElementById('word-wrap');

  // Guess SFX
  function playGuessSond(){
    wawa.play();
  }

  // Randomly chooses a word from the words array.
  function generateRandomWord() {
    randomWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
  }

  // Checks if element has class
  // https://gist.github.com/sonnyt/8585696
  Element.prototype.hasClass = function(className) {
    return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
  };

  // Creates a div for each letter in randomWord
  var wordsList = function() {

    document.querySelector(".loose-heading").style.display = "none";
    document.querySelector(".win-heading").style.display = "none";
    document.querySelector(".game-start").style.display = "none";
    hangman.src = "images/robot-hangman-0.png";

    generateRandomWord();

    // Delete children next time function is called
    wordWrap.innerHTML = '';

    // Generate div for each letter in randomWord
    randomWord.split('').forEach(function(letter) {
      var div = document.createElement('div');

      div.id = 'word-letter-' + letter;
      div.className = 'word-letter word-letter-' + letter;
      wordWrap.appendChild(div);
    });
    
  }

  // Call function
  wordsList();

  // Create a div for each letter in alphabet array
  var alphabetList = function() {

    alphabet.forEach(function(letter) {
      var div = document.createElement('div');
      div.id = 'letter-' + letter;
      div.className = 'letter';
      div.innerHTML = letter;
      alphabetWrap.appendChild(div);
    });

  }

  // Call function
  alphabetList();

  var alphabetLetter = document.querySelectorAll('.letter');

  // Get all elements with class letter loop through track click
  alphabetLetter.forEach(function(letter) {
    letter.addEventListener('click', function() {
      var letterClicked = this.innerHTML;

      if ( ! this.hasClass('active') && guesses > 0 && correctGuesses !== randomWord.length ) {
        checkGuess( letterClicked );
      }

      this.classList.add('active');

    });
  });

  // Get which key was pressed
  document.addEventListener('keyup', function(e) {
    // Only track letters
    if ( e.keyCode <= 90 && e.keyCode >= 65 ) {
      var keyPressed = String.fromCharCode(e.keyCode).toLowerCase();
      var letterClicked = document.getElementById('letter-' + keyPressed );

      if ( ! letterClicked.hasClass('active') && guesses > 0 && correctGuesses !== randomWord.length ){
        checkGuess( keyPressed );
      }

      letterClicked.classList.add('active');
    }
  });

  // Reset game when enter is clicked
  document.addEventListener('keyup', function(e) {
    if ( e.keyCode === 13 ) {
      resetGame();
    }
  });

  // Checks if letter exist in word
  function checkGuess( guess ) {

    var letterGuess = document.querySelectorAll('.word-letter-' + guess);

    // loop through randomWord and see if guess matches
    randomWord.split('').forEach(function(letter) {
      if( letter === guess ) {
        playGuessSond();
        correctGuesses++;
        guessesArray.push( guess );
       
        letterGuess.forEach(function(letter) {
          letter.innerHTML = guess;
        });
      }
    });

    // if guess doesnt exist in randomWord
    if ( randomWord.indexOf(guess) === -1 ) {
      wrong++;
      hangman.src = "images/robot-hangman-"+ wrong + ".png";

      guesses--;
      document.querySelector(".game-stats-guesses").innerHTML = guesses;
    }

    // You Win
    if ( correctGuesses === randomWord.length ) {
      wins++

      // Display You Win
      document.querySelector(".win-heading").style.display = "block";
      document.querySelector(".game-stats-wins").innerHTML = wins;
      document.querySelector(".game-start").style.display = "block";

    }

    // You Loose
    if ( guesses === 0 ) {
      losses++

      // Display You Loose
      document.querySelector(".loose-heading").style.display = "block";
      document.querySelector(".game-stats-losses").innerHTML = losses;
      document.querySelector(".game-start").style.display = "block";

      wordWrap.innerHTML = '';

      randomWord.split('').forEach(function(element) {

          var div = document.createElement('div');
    
          div.id = 'word-letter-' + element;
          div.className = 'word-letter word-letter-' + element;

          if ( guessesArray.indexOf( element ) === -1 ){
            div.classList.add('word-letter-missing');
          }
           
          div.textContent = element;
          wordWrap.appendChild(div);
      });

    }

  }

  // Reset Game
  function resetGame(){
    correctGuesses = 0;
    guessesArray = [];
    guesses = 9;
    wrong = 0;

    document.querySelector(".game-stats-guesses").innerHTML = guesses;

    // Generate New Word
    wordsList();

    // Removes active class from alphabet array
    alphabetLetter.forEach(function(letter) {
      letter.classList.remove('active');
    });

  }

}