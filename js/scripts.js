window.onload = function () {

  // Define variables/arrays
  var wins = 0;
  var losses = 0;
  var guesses = 10;
  var words = ['Niva' , 'Mario', 'Rosa', 'Matthew', 'Angel'];
  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  // Randomly chooses a word from the words array.
  var randomWord = words[Math.floor(Math.random() * words.length)];
  randomWord = randomWord.toLowerCase();

  // Create a div for each letter in randomWord
  var wordsList = function () {
    var wordWrap = document.getElementById('word-wrap');

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
      alphabetLetter[i].onclick = function() {

      letterClicked = this.innerHTML;
      checkGuess( letterClicked, randomWord );

    }
  }

  // Get which key was pressed
  document.onkeypress = function(e) {
     var keyPressed = String.fromCharCode(e.keyCode);
     // console.log(keyPressed );

     checkGuess( keyPressed, randomWord );

  }

  // Checks if letter exist in word
  function checkGuess( guess, word ) {

    document.getElementById('letter-' + guess ).classList.add('active');

    if ( word.indexOf( guess ) > -1 ) {
       console.log( 'Yes ' + guess );
       // console.log( word.indexOf( guess ) );

       letter = document.getElementById('word-letter-' + guess );
       letter.innerHTML = guess;
    } else {
       console.log( 'No ' + guess );
       guesses--
       console.log( "Guesses Remaining " + guesses );
    }

    if ( guesses === 0 ) {
      alert('You Lose');
      losses++
      guesses = 10;
      console.log( "Total Losses " + losses );
    }
  }


}