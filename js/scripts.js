window.onload = function () {

  // Create Alphabet Array
  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  // Create Alphabet List Dynamically
  var alphabetList = function () {
    alphabetWrap = document.getElementById('alphabet-wrap');

    for ( var i = 0; i < alphabet.length; i++ ) {
      letter = document.createElement('div');
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
    }
  }

}