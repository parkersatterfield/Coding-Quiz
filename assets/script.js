// define HTML elements as variables
var startButton = document.getElementById('start');
var timeEl = document.getElementById('timer');
var quizCard = document.getElementById('quiz-card');
var main = document.getElementById('main');
var done = document.getElementById('done');
var highscoresEl = document.getElementById('highscores');
var user = document.getElementById('user'); // access input with user.value
var question = document.getElementById('question');
var option1 = document.getElementById('option1');
var option2 = document.getElementById('option2');
var option3 = document.getElementById('option3');
var option4 = document.getElementById('option4');
var correct = document.getElementById('correct');
var wrong = document.getElementById('wrong');
var firstPlace = document.getElementById('first place');
var secondPlace = document.getElementById('second place');
var thirdPlace = document.getElementById('third place');
var fourthPlace = document.getElementById('fourth place');
var fifthPlace = document.getElementById('fifth place');
var submitButton = document.getElementById('submit');
var correctAnswerButton = document.querySelector('.correct');
var incorrectAnswerButton = document.querySelectorAll('incorrect');
var yourScore = document.getElementById('your-score');
var home = document.getElementById('home');
var viewHighscoresEl = document.getElementById('view-highscores');
var score = 0;
// initialize quiz time variable
var timeLeft = 15;

// Define quiz questions as array
var questionList = [
    'Commonly used data types include all but the following:',
    'The condition of an if/else statement is enclosed with ____',
    'Arrays in JavaScript can be used to store ____',
    'String values must be enclosed by ____'
];

// Page state to store question number
var questionNumber = 0;

// Quiz Function
function quiz() {
    // hide main, show quiz card
    main.setAttribute('style', 'display:none;');
    quizCard.setAttribute('style', 'display:block;');
    // display q1
    question.textContent = questionList[questionNumber];
    option1.textContent = 'boolean';
    option1.className = 'incorrect'
    option2.textContent = 'string';
    option2.className = 'incorrect'
    option3.textContent = 'array';
    option3.className = 'incorrect'
    option4.textContent = 'orientation';
    option4.className = 'correct';
    updateEventListeners();
    updateCorrectAnswer();
    // start timer
    var timeInterval = setInterval(function() {
        timeLeft--;
        timeEl.textContent = 'time: ' + timeLeft;
        // if timer reaches 0, hide #quiz-card, show #done, set score to 0
        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            quizCard.setAttribute('style', 'display:none;');
            done.setAttribute('style', 'display: block');
            timeEl.textContent = 'time: 0';
            yourScore.textContent = 'Your score is 0';
            return; 
        }
        if (questionNumber === questionList.length) {
            clearInterval(timeInterval);
            return;
        }
    }, 1000);
};

var displayQuestion = function() {
    // display question as h1 and answers as buttons 1-4
    question.textContent = questionList[questionNumber];
    if (questionNumber === 1) {
        option1.textContent = '[brackets]';
        option2.textContent = '(parenthasis)';
        option3.textContent = '"quotes';
        option4.textContent = '`backticks`';
    } else if (questionNumber === 2) {
        option1.textContent = 'objects';
        option2.textContent = 'other arrays';
        option3.textContent = 'functions';
        option4.textContent = 'singular data values';
    } else if (questionNumber === 3) {
        option1.textContent = '[brackets]';
        option2.textContent = '(parenthasis)';
        option3.textContent = '"quotes';
        option4.textContent = '`backticks`';  
    };
    // Designates end of quiz
    if (questionNumber === questionList.length) {
        quizCard.setAttribute('style', 'display: none;');
        done.setAttribute('style', 'display:block;');
        score = timeLeft;
        yourScore.textContent = 'Your score is ' + score;
    };
};

// Hard codes correct answers by changing button classes
var updateCorrectAnswer = function () {
    if (questionNumber === 0) {
        option1.className = 'incorrect';
        option2.className = 'incorrect';
        option3.className = 'incorrect';
        option4.className = 'correct';
    } else if (questionNumber === 1) {
        option1.className = 'incorrect';
        option2.className = 'correct';
        option3.className = 'incorrect';
        option4.className = 'incorrect';
    } else if (questionNumber === 2) {
        option1.className = 'incorrect';
        option2.className = 'incorrect';
        option3.className = 'incorrect';
        option4.className = 'correct';
    } else if (questionNumber === 3) {
        option1.className = 'incorrect';
        option2.className = 'incorrect';
        option3.className = 'correct';
        option4.className = 'incorrect';
    }
};

var wrongAnswer = function() {
    wrong.setAttribute('style', 'display: block;');
    correct.setAttribute('style', 'display:none;');
    timeLeft = timeLeft - 2;
    console.log('wrong answer');
}

var nextQuestion = function() {
    questionNumber++;
    correct.setAttribute('style', 'display:block;');
    wrong.setAttribute('style', 'display: none;');
    displayQuestion(); 
    updateCorrectAnswer();
    updateEventListeners();
}

// function to set local storage with highscores
var highscoresUnsorted = [JSON.parse(localStorage.getItem("highscores"))];
var storeHighscore = function () {
    highscoresUnsorted.push(user.value + ': ' + score); // when storing a score, the score and name input are pushed to he high scores array as an array
    var highscores = highscoresUnsorted.sort(); // stores a new array as the sorted version of the high scores array
    localStorage.setItem("highscores", JSON.stringify(highscores)); // sets sorted high scores array to local storage
    highscoresEl.setAttribute('style', 'display: block;');
    initScores();
};

// populates highscore list 
var initScores = function () {
    var highscores = [JSON.parse(localStorage.getItem("highscores"))];
    firstPlace.textContent = highscores[0][1];
    secondPlace.textContent = highscores[0][2];
    thirdPlace.textContent = highscores[0][3];
    fourthPlace.textContent = highscores[0][4];
    fifthPlace.textContent = highscores[4];
};
initScores();

// event listeners
startButton.addEventListener('click', quiz); // starts quiz
submitButton.addEventListener('click', storeHighscore);
home.addEventListener('click', function() {
    done.setAttribute('style', 'display:none');
    highscoresEl.setAttribute('style', 'display:none');
    main.setAttribute('style', 'display:block');
    questionNumber = 0;
    timeLeft = 15;
})

viewHighscoresEl.addEventListener('click', function () {
    highscoresEl.setAttribute('style', 'display: block')
})

// update event listeners function for dynamically generated elements
var updateEventListeners = function () {
    // remove old event listeners
    correctAnswerButton = document.querySelector('.correct');
    correctAnswerButton.removeEventListener('click', wrongAnswer);
    incorrectAnswerButton = document.querySelectorAll('.incorrect');
    for (var i = 0; i < incorrectAnswerButton.length; i++) {
        incorrectAnswerButton[i].removeEventListener('click', nextQuestion);
    };

    // add new listeners to dynamically updated element classes
    correctAnswerButton = document.querySelector('.correct');
    correctAnswerButton.addEventListener('click', nextQuestion);
    incorrectAnswerButton = document.querySelectorAll('.incorrect');
    for (var i = 0; i < incorrectAnswerButton.length; i++) {
        incorrectAnswerButton[i].addEventListener('click', wrongAnswer);
    };
};
