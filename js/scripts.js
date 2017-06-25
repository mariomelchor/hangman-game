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

  // Creates a div for each letter in randomWord
  var wordsList = function () {

    var wordWrap = document.querySelector('#word-wrap');

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
      checkGuess( letterClicked, randomWord );
    })
  }

  // Get which key was pressed
  document.onkeypress = function(e) {
     var keyPressed = String.fromCharCode(e.keyCode);
     checkGuess( keyPressed, randomWord );
  }

  // Checks if letter exist in word
  function checkGuess( guess, word ) {

    document.querySelector('#letter-' + guess ).classList.add('active');

    document.querySelector(".loose-heading").style.display = "none";
    document.querySelector(".win-heading").style.display = "none";

    guesses--;
    document.querySelector(".game-stats-guesses").innerHTML = guesses;

    if ( word.indexOf( guess ) > -1 ) {
       // console.log( 'Yes ' + guess );
       // console.log( word.indexOf( guess ) );

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
    // console.log(guessesArray);

  }

}