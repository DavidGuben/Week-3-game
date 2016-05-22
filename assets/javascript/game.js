(function globalFunction () {
    //FIRST IM DEFINING IMPORTANT VARIABLES GLOBALLY
       var alphabet = "abcdefghijklmnopqrstuvwxyz";
       var words = ["unicorn", "phoenix", "centaur", "mermaid","dragon","hydra","siren"];
       var guessesLeft = 4;
       var guessOutput = document.getElementById("guessOutput");
       var hangedMan = document.getElementById("hangedMan");
       var guessInput = document.getElementById("letter");
       var lettersGuessed = lettersMatched = '';
       var guessButton = document.getElementById("guess");
       var numLettersMatched = 0;
    //  NEXT I CREATE AN OBJECT WITH THE PROMPTS THAT WILL POP UP
    function prompts() {
        promptMessages = {
            win: "<h3>You won</h3>",
            lose: "<h3>Game over!</h3>",
            guessedAlready: " <h3>You guessed that already</h3>",
            validLetter: "<h3>Enter a valid letter</h3>"
        };
        //THEN I DISPLAY A WORD AT RANDOM AND LIMIT TO THE LENGTH OF THE RANDOM WORD
        currentWord = words[Math.floor(Math.random() * words.length)];
        //CREATING A VARIABLE THAT SUBTRACTS GUESSES FROM HANGEDMAN
        hangedMan.innerHTML = 'You have ' + guessesLeft + ' guesses remaining';
        guessOutput.innerHTML = '';
        document.getElementById("letter").value = '';
        var letters = document.getElementById("letters");
        letters.innerHTML = '<li class="currentWord">Current word: </li>';
        var letter, i;
        for (i = 0; i < currentWord.length; i++) {
            letter = '<li class="letter letter' + currentWord.charAt(i).toUpperCase() + '">' + currentWord.charAt(i).toUpperCase() + '</li>';
            letters.insertAdjacentHTML('beforeend', letter);
        }
    }
    //CREATING A IF/ELSE STATEMENT THAT DEFINES WIN OR LOSE
    function gameOver(win) {
        if (win) {
            guessOutput.innerHTML = promptMessages.win;
            guessOutput.classList.add('win');
        } else {
            guessOutput.innerHTML = promptMessages.lose;
            guessOutput.classList.add('error');
        }
        //RESETS GUESS INPUT VALUE TO NOTHING IF WIN OR LOSE
        guessInput.value = '';
    }
    //STARTS THE GAME ON LOAD OF DOCUMENT
    document.onload = prompts();
    //CALLS THE GLOBAL FUNCTION TO RESET THE GAME
    document.getElementById("restart").onclick = globalFunction;
    //EVERYTIME YOU CLICK IN THE INPUT THIS WILL REPLACE THE VALUE OF THE INPUT TO NOTHING
    //SO I DONT HAVE TO KEEP ERASING THE LETTER
    guessInput.onclick = function () {
        this.value = '';
    };
    //GUESS FUNCTION
    document.getElementById('hangman').onsubmit = function (i) {
        if (i.preventDefault) i.preventDefault();
        guessOutput.innerHTML = '';
        guessOutput.classList.remove('error', 'warning');
        guess = guessInput.value;

        //IF STATEMENT
        if (guess) {
            //CHECK IF LETTER IS VALID
            if (alphabet.indexOf(guess) > -1) {
                //CHECK IF LETTER HAS BEEN GUESSED ALREADY
                if ((lettersMatched && lettersMatched.indexOf(guess) > -1) || (lettersGuessed && lettersGuessed.indexOf(guess) > -1)) {
                    guessOutput.innerHTML = '"' + guess.toUpperCase() + '"' + promptMessages.guessedAlready;
                    guessOutput.classList.add("warning");
                }
                //ADDS LETTERS TO OUTPUT IF GUESSED CORRECTLY
                else if (currentWord.indexOf(guess) > -1) {
                    var lettersToShow;
                    lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());
                    for (var i = 0; i < lettersToShow.length; i++) {
                        lettersToShow[i].classList.add("correct");
                    }
                    //CHECKS IF LETTER APPEARS MULTIPLE TIMES IN THE WORD
                    for (var l = 0; l < currentWord.length; l++) {
                        if (currentWord.charAt(l) === guess) {
                            numLettersMatched += 1;
                        }
                    }
                    //CHECKS IF NUMBERS OF LETTERS MATCHED EQUALS THE EXACT CURRENTWORD LENGTH SO IT
                    //DISPLAYS A WINNING MESSAGE
                    lettersMatched += guess;
                    if (numLettersMatched === currentWord.length) {
                        gameOver(true);
                    }
                }
                //CHECKS GUESSES LEFT AND IF ITS 0 DISPLAYS A GAME OVER MESSAGE
                else {
                    lettersGuessed += guess;
                    guessesLeft--;
                    hangedMan.innerHTML = 'You have ' + guessesLeft + ' guesses remaining';
                    if (guessesLeft === 0) gameOver();
                }
            }
            /* not a valid letter, error */
            else {
                guessOutput.classList.add('error');
                guessOutput.innerHTML = promptMessages.validLetter;
            }
        }
        /* no letter entered, error */
        else {
            guessOutput.classList.add('error');
            guessOutput.innerHTML = promptMessages.validLetter;
        }
        return false;
    };
}());