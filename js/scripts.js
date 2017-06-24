window.onload = function () {

  // Define variables
  var wins = 0;
  var losses = 0;

  // Create Words Array
  var words = ['Niva' , 'Mario', 'Rosa', 'Matthew', 'Angel'];

  // Create Alphabet Array
  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  // Randomly chooses a word from the words array.
  var randomWord = words[Math.floor(Math.random() * words.length)];
  // console.log(randomWord);

  // Create Alphabet List Dynamically
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

  // Call function that writes alphabetList to DOM
  alphabetList();

  // Get all elements with class letter
  var alphabetLetter = document.getElementsByClassName('letter');

  // Loop all elements with class letter and log clicked
  for ( var i = 0; i < alphabetLetter.length; i++ ) {
      alphabetLetter[i].onclick = function() {
      console.log(this.innerHTML);
      this.classList.add('active');
    }
  }

  // Create Word List Dynamically
  var wordsList = function () {
    var wordWrap = document.getElementById('word-wrap');

    for ( var i = 0; i < randomWord.length; i++ ) {
      var wordLetter = document.createElement('div');
      var character = randomWord.charAt(i);

      wordLetter.id = 'word-letter-' + character;
      wordLetter.className = 'word-letter';
      // wordLetter.innerHTML = character;
      wordWrap.appendChild(wordLetter);

      console.log(randomWord.charAt(i));
    }
  }

  // Call function that writes word List to DOM
  wordsList();

  // Get which key was pressed
  document.onkeypress = function(e) {
     var keyPressed = String.fromCharCode(e.keyCode);
     // console.log(keyPressed );

     document.getElementById('letter-' + keyPressed ).classList.add('active');
  };


}