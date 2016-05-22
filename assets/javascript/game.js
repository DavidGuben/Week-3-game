// global vars
var prevWord = "";
var currWord = "";
var currGuesses = 0;
var maxGuesses = 10;

// elements
var btnReset = document.getElementById("restart");
var btnGuess = document.getElementById("guess");
var output = document.getElementById("output");
var man = document.getElementById("man");
var letters = document.getElementById("letters");
var guessInput = document.getElementById("letter");

// event listeners
btnReset.onclick = actionReset;
btnGuess.onclick = actionGuess;

// word associations
var wordTemplates;
var attempts = new Array();
var numSolved = 0;
var words = ["unicorn", "phoenix", "centaur", "mermaid", "dragon", "hydra", "siren"];

// display messages
var display = {
    win: {
        message: 'You win!',
        className: "win"
    },
    lose: {
        message: 'Game over!',
        className: 'error'
    },
    guessed: {
        message: 'You guessed that already',
        className: 'error'
    },
    invalidLetter: {
        message: 'Please enter a valid letter',
        className: 'error'
    },
    clear: {
        message: "",
        className: ""
    }
};

// start game on window init
window.onload = actionReset;

// resets the game
function actionReset() {
    resetWord();
    resetView();
    updateGuesses();
}

// event for each guess
function actionGuess() {
    // clearing any displays
    setOutput(display.clear);

    // collecting value
    guess = guessInput.value.toLowerCase();

    // making sure the char is between a & z
    if (guess.length != 1 || guess.charCodeAt(0) < 97 ||  guess.charCodeAt(0) > 122) {
        setOutput(display.invalidLetter);
        return;
    }

    // checking if user already guessed this word
    if (attempts.indexOf(guess) >= 0) {
        setOutput(display.guessed);
        return;
    }

    // incrementing num of guesses
    attempts.push(guess);

    // looking for matching letter in internal array
    var isResolved = false;
    for (var temp of wordTemplates) {
        if (temp.letter == guess) {
            temp.resolved = true;
            temp.element.innerHTML = temp.letter.toUpperCase();
            numSolved++;
            isResolved = true;
        }
    }

    // incrementing guesses if user didn't resolve a letter this round
    if (!isResolved)
        currGuesses++;

    // updating the guesses display
    updateGuesses();

    // resetting element views
    resetView();

    // perform outcome check if max guesses or num solved is reached
    if (maxGuesses - currGuesses <= 0 || currWord.length == numSolved) {
        checkOutcome();
        return;
    }

    return false;
}

// checks if user won or lose
function checkOutcome() {
    if (currWord.length == numSolved)
        setOutput(display.win);
    else
        setOutput(display.lose);

    // hiding guess button
    btnGuess.style.display = 'none';
}

// Function resets the current word and ensures it's not the same as the previous word
function resetWord() {
    // reset attemps
    attempts = new Array();

    // resetting current guesses
    currGuesses = 0;

    // resetting current num of solved
    numSolved = 0;

    // updating previous word
    prevWord = currWord;

    // choosing a new word that is not the same as the old word
    while (currWord == prevWord)
        currWord = words[Math.floor(Math.random() * words.length)]

    // resetting the word templates array
    wordTemplates = new Array();

    // clearing list elements (the faster way)
    while (letters.firstChild)
        letters.removeChild(letters.firstChild);

    for (var i=0; i<currWord.length; i++) {
        // creating new list item and adding to DOM
        ele = document.createElement("li");
        ele.className = " letter ";
        ele.appendChild(document.createTextNode(" "));
        letters.appendChild(ele);

        // creating internal letter association object
        var template = {
            "letter": currWord[i],  // curr letter
            "element": ele,         // the element inside DOM
            "resolved": false       // whether the letter has been chosen
        }

        // adding template for current letter to word templates array
        wordTemplates.push(template);
    }
}

// resets the elements' display
function resetView() {
    btnGuess.style.display = 'inline-block';
    guessInput.value = "";
    setOutput(display.clear);
    guessInput.focus();
}

// sets the output display message
function setOutput(status) {
    output.innerHTML = '<h3>' + status.message + '<h3>';
    output.className = "output " + status.className;
    guessInput.focus();
}

// resetting the number of guesses
function updateGuesses() {
    var remaining = maxGuesses - currGuesses;
    var classNames = ["text-danger", "text-warning", "text-info"];

    if (remaining <= (maxGuesses/3))
        className = classNames[0];
    else if (remaining <= (maxGuesses/3*2))
        className = classNames[1];
    else
        className = classNames[2];

    man.innerHTML = 'You have <span class="'+className+'">'+remaining+'</span> guesses remaining';
}