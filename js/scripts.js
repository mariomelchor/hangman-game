window.onload = function () {

  // Define variables/arrays
  var wins = 0;
  var losses = 0;
  var guesses = 9;
  var correctGuesses = 0;
  var wrong = 0;
  var guessesArray = [];
  var hangman = document.getElementById('hangman-img');
  var words = [ 'Centipede', 'Defender', 'Tron', 'Galaxy', 'Asteroid', 'Cluster', 'Comet', 'Dust', 'Earth', 'Saturn', 'Meteor', 'Nebula', 'Quasar', 'Supernova', 'Sputnik', 'Blackhole' ];
  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  var wawa = new Audio('audio/wawa.mp3');

  // Guess SFX
  function playGuessSond(){
   wawa.play();
  }

  // Randomly chooses a word from the words array.
  function generateRandomWord() {
    var randomW = words[Math.floor(Math.random() * words.length)];
    randomWord = randomW.toLowerCase();
    return randomWord;
  }

  // console.log(randomWord);

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

    var wordWrap = document.getElementById('word-wrap');

    // Delete children next time function is called
    while ( wordWrap.firstChild ) {
      wordWrap.removeChild( wordWrap.firstChild );
    }

    for ( var i = 0; i < randomWord.length; i++ ) {
      var wordLetter = document.createElement('div');
      var character = randomWord.charAt(i);

      wordLetter.id = 'word-letter-' + character;
      wordLetter.className = 'word-letter word-letter-' + character;
      wordWrap.appendChild(wordLetter);
    }
  }

  // Call function
  wordsList();

  // Create a div for each letter in alphabet array
  var alphabetList = function() {

    var alphabetWrap = document.getElementById('alphabet-wrap');

    for ( var i = 0; i < alphabet.length; i++ ) {
      var letter = document.createElement('div');
      letter.id = 'letter-' + alphabet[i];
      letter.className = 'letter';
      letter.innerHTML = alphabet[i];
      alphabetWrap.appendChild(letter);
    }
  }

  // Call function
  alphabetList();

  // Get all elements with class letter loop through track click
  var alphabetLetter = document.getElementsByClassName('letter');

  for ( var i = 0; i < alphabetLetter.length; i++ ) {

    alphabetLetter[i].addEventListener('click', function() {
      letterClicked = this.innerHTML;

      if ( ! this.hasClass('active') ){
        checkGuess( letterClicked );
      }

      this.classList.add('active');

    })
  }

  // Get which key was pressed
  document.onkeyup = function(e) {

    // Only track letters
    if ( e.keyCode <= 90 && e.keyCode >= 65 ) {
      var keyPressed = String.fromCharCode(e.keyCode).toLowerCase();
      var letterClicked = document.getElementById('letter-' + keyPressed );

      if ( ! letterClicked.hasClass('active') ){
        checkGuess( keyPressed );
      }

      letterClicked.classList.add('active');
    }

    // When Enter Rest Game
    if ( e.keyCode === 13 ) {
      resetGame();
    }

  }

  // Checks if letter exist in word
  function checkGuess( guess ) {

    // Check if guessed correct letter
    if ( randomWord.indexOf( guess ) > -1 ) {

      playGuessSond();

       var pos = randomWord.indexOf(guess);

       while ( pos !== -1 ) {
         pos = randomWord.indexOf( guess, pos + 1);
         correctGuesses++;
         guessesArray.push( guess );
       }

       letterGuess = document.querySelectorAll('.word-letter-' + guess);

       for ( var i = 0; i < letterGuess.length; i++ ) {
        letterGuess[i].innerHTML = guess;
       }

    } else {
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

    }

    // console.log('Correct Guesses : ' + correctGuesses);
    // console.log(guessesArray);

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
    for ( var i = 0; i < alphabetLetter.length; i++) {
      alphabetLetter[i].classList.remove('active');
    }
  }

}