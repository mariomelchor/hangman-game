window.onload = function () {

  // Define variables/arrays
  var wins = 0;
  var losses = 0;
  var guesses = 10;
  var correctGuesses = 0;
  var guessesArray = [];
  var words = ['Niva' , 'Mario', 'Rosa', 'Matthew', 'Angel'];
  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  // Randomly chooses a word from the words array.
  var randomWord = words[Math.floor(Math.random() * words.length)];
  randomWord = randomWord.toLowerCase();

  // Checks if element has class
  // https://gist.github.com/sonnyt/8585696
  Element.prototype.hasClass = function(className) {
      return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
  };

  // Creates a div for each letter in randomWord
  var wordsList = function () {

    var wordWrap = document.querySelector('#word-wrap');

    while ( wordWrap.firstChild ) {
      wordWrap.removeChild( wordWrap.firstChild );
    }

    for ( var i = 0; i < randomWord.length; i++ ) {
      var wordLetter = document.createElement('div');
      var character = randomWord.charAt(i);
      // console.log(character);

      wordLetter.id = 'word-letter-' + character;
      wordLetter.className = 'word-letter word-letter-' + character;
      // wordLetter.innerHTML = character;
      wordWrap.appendChild(wordLetter);

    }
  }

  // Call function
  wordsList();

  // Create a div for each letter in alphabet array
  var alphabetList = function () {
    var alphabetWrap = document.querySelector('#alphabet-wrap');

    while ( alphabetWrap.firstChild ) {
      alphabetWrap.removeChild( alphabetWrap.firstChild );
    }

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
  var alphabetLetter = document.querySelectorAll('.letter');

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
     var keyPressed = String.fromCharCode(e.keyCode).toLowerCase();
     console.log(keyPressed);

     var letterClicked = document.querySelector('#letter-' + keyPressed );

     if ( ! letterClicked.hasClass('active') ){
       checkGuess( keyPressed );
     }

     letterClicked.classList.add('active');
  }

  // Checks if letter exist in word
  function checkGuess( guess ) {

    document.querySelector(".loose-heading").style.display = "none";
    document.querySelector(".win-heading").style.display = "none";

    guesses--;
    document.querySelector(".game-stats-guesses").innerHTML = guesses;

    // Check if guessed correct word
    if ( randomWord.indexOf( guess ) > -1 ) {
       // console.log( randomWord.indexOf( guess ) );

       // Add to correct guesses counter and add to guessesArray if guess doesn't exist
       // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
       if ( guessesArray.indexOf(guess) === -1 ) {
         correctGuesses++;
         guessesArray.push(guess);
       }

       letter = document.getElementById('word-letter-' + guess );
       letter.innerHTML = guess;

    } else {
       console.log( 'There is no ' + guess );
    }

    // You Win
    if ( correctGuesses === randomWord.length ) {
      wins++
      correctGuesses = 0;
      guessesArray = [];
      guesses = 10;

      // Display You Win
      document.querySelector(".win-heading").style.display = "block";
      document.querySelector(".game-stats-wins").innerHTML = wins;

      //Start New
      wordsList();
      alphabetList();

    }

    // You Loose === 0
    if ( guesses === 0 ) {
      losses++
      correctGuesses = 0;
      guessesArray = [];
      guesses = 10;

      // Display You Loose
      document.querySelector(".loose-heading").style.display = "block";
      document.querySelector(".game-stats-losses").innerHTML = losses;
      document.querySelector(".game-stats-guesses").innerHTML = guesses;

      //Start New
      wordsList();
      alphabetList();

    }

    console.log('Correct Guesses : ' + correctGuesses);
    console.log(guessesArray);

  }

}