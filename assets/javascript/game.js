(function () {
    //FIRST IM DEFINING IMPORTANT VARIABLES GLOBALLY
       var alphabet = "abcdefghijklmnopqrstuvwxyz";
       var words = ["unicorn", "phoenix", "centaur", "mermaid","dragon","hydra","siren"];
       var guessesLeft = 10;
       var guessOutput = document.getElementById("guessOutput");
       var hangedMan = document.getElementById("hangedMan");
       var guessInput = document.getElementById("letter");
       var lettersGuessed = lettersMatched = '';
       var numLettersMatched = 0;
    //  NEXT I CREATE AN OBJECT WITH THE PROMPTS THAT WILL POP UP
    function prompts() {
        promptMessages = {
            win: '<h3>You win!</h3>',
            lose: '<h3>Game over!</h3>',
            guessed: ' <h3>You guessed that already</h3>',
            validLetter: '<h3>Please enter a valid letter</h3>'
        };
        //THEN I DISPLAY A WORD AT RANDOM
        currentWord = words[Math.floor(Math.random() * words.length)];
        //CREATING A VARIABLE THAT SUBTRACTS GUESSES FROM HANGEDMAN
        hangedMan.innerHTML = 'You have ' + guessesLeft + ' guesses remaining';
        guessOutput.innerHTML = '';

        document.getElementById("letter").value = '';

        /* make sure guess button is enabled */
        var guessButton = document.getElementById("guess");

        //DISPLAYS
        letters = document.getElementById("letters");
        letters.innerHTML = '<li class="current-word">Current word:</li>';

        var letter, i;
        for (i = 0; i < currentWord.length; i++) {
            letter = '<li class="letter letter' + currentWord.charAt(i).toUpperCase() + '">' + currentWord.charAt(i).toUpperCase() + '</li>';
            letters.insertAdjacentHTML('beforeend', letter);
        }
    }

    function gameOver(win) {
        if (win) {
            guessOutput.innerHTML = promptMessages.win;
            guessOutput.classList.add('win');
        } else {
            guessOutput.innerHTML = promptMessages.lose;
            guessOutput.classList.add('error');
        }

        guessInput.style.display = guessButton.style.display = 'none';
        guessInput.value = '';
    }

    /* Start game - should ideally check for existing functions attached to window.onload */
    window.onload = prompts();

    /* buttons */
    document.getElementById("restart").onclick = prompts;

    /* reset letter to guess on click */
    guessInput.onclick = function () {
        this.value = '';
    };

    /* main guess function when user clicks #guess */
    document.getElementById('hangman').onsubmit = function (e) {
        if (e.preventDefault) e.preventDefault();
        guessOutput.innerHTML = '';
        guessOutput.classList.remove('error', 'warning');
        guess = guessInput.value;

        /* does guess have a value? if yes continue, if no, error */
        if (guess) {
            /* is guess a valid letter? if so carry on, else error */
            if (alphabet.indexOf(guess) > -1) {
                /* has it been guessed (missed or matched) already? if so, abandon & add notice */
                if ((lettersMatched && lettersMatched.indexOf(guess) > -1) || (lettersGuessed && lettersGuessed.indexOf(guess) > -1)) {
                    guessOutput.innerHTML = '"' + guess.toUpperCase() + '"' + promptMessages.guessed;
                    guessOutput.classList.add("warning");
                }
                /* does guess exist in current word? if so, add to letters already matched, if final letter added, game over with win message */
                else if (currentWord.indexOf(guess) > -1) {
                    var lettersToShow;
                    lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());

                    for (var i = 0; i < lettersToShow.length; i++) {
                        lettersToShow[i].classList.add("correct");
                    }

                    /* check to see if letter appears multiple times */
                    for (var j = 0; j < currentWord.length; j++) {
                        if (currentWord.charAt(j) === guess) {
                            numLettersMatched += 1;
                        }
                    }

                    lettersMatched += guess;
                    if (numLettersMatched === currentWord.length) {
                        gameOver(true);
                    }
                }
                /* guess doesn't exist in current word and hasn't been guessed before, add to lettersGuessed, reduce guessesLeft & update user */
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