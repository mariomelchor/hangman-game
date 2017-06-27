window.onload = function () {

  // Define variables/arrays
  var wins = 0;
  var losses = 0;
  var guesses = 12;
  var correctGuesses = 0;
  var guessesArray = [];
  // var words = ['Niva' , 'Mario', 'Rosa', 'Matthew', 'Angel'];
  var words = ['Rampage', 'Tempest', 'Centipede', 'Xevious', 'Donkey Kong', 'Defender', 'Frogger', 'Zaxxon', 'Frogger', 'Pac Man', 'Donkey Kong', 'Burgertime', 'Tron', 'Ms Pac Man', 'Galaga', 'Super Mario'];
  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  // var audio = new Audio('audio/illusion-castle-short.wav');
  // audio.addEventListener('ended', function() {
  //     this.currentTime = 0;
  //     this.play();
  // }, false);
  // audio.play();

  // Randomly chooses a word from the words array.
  // var randomWord = words[Math.floor(Math.random() * words.length)];
  // randomWord = randomWord.toLowerCase();

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

    guesses--;
    document.querySelector(".game-stats-guesses").innerHTML = guesses;

    // Check if guessed correct letter
    if ( randomWord.indexOf( guess ) > -1 ) {

       var pos = randomWord.indexOf(guess);

       while ( pos !== -1 ) {
         pos = randomWord.indexOf( guess, pos + 1);
         correctGuesses++;
         guessesArray.push(guess);
       }

       // correctGuesses++;
       // guessesArray.push(guess);

       // Add to correct guesses counter and add to guessesArray if guess doesn't exist
       // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
       // if ( guessesArray.indexOf(guess) === -1 ) {
       //   correctGuesses++;
       //   guessesArray.push(guess);
       // }

       // letter = document.getElementById('word-letter-' + guess );
       // letter.innerHTML = guess;

       letterGuess = document.querySelectorAll('.word-letter-' + guess);

       for ( var i = 0; i < letterGuess.length; i++ ) {
        letterGuess[i].innerHTML = guess;
       }

    } else {
       console.log( 'There is no ' + guess );
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
    if ( guesses < 0 ) {
      losses++

      // Display You Loose
      document.querySelector(".loose-heading").style.display = "block";
      document.querySelector(".game-stats-losses").innerHTML = losses;
      document.querySelector(".game-start").style.display = "block";

    }

    console.log('Correct Guesses : ' + correctGuesses);
    console.log(guessesArray);

  }

  function resetGame(){
    correctGuesses = 0;
    guessesArray = [];
    guesses = 12;
    document.querySelector(".game-stats-guesses").innerHTML = guesses;

    // Generate New Word
    wordsList();

    // var testLetter = document.getElementsByClassName('letter');
      for ( var i = 0; i < alphabetLetter.length; i++) {
      alphabetLetter[i].classList.remove('active');
    }
  }

}