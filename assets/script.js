// define HTML elements as variables
var startButton = document.getElementById('start');
var timeEl = document.getElementById('timer');
var quizCard = document.getElementById('quiz-card');
var main = document.getElementById('main');
var done = document.getElementById('done');
var highscores = document.getElementById('highscores');
var user = document.getElementById('user'); // access input with user.value
var question = document.getElementById('question');
var option1 = document.getElementById('option1');
var option2 = document.getElementById('option2');
var option3 = document.getElementById('option3');
var option4 = document.getElementById('option4');

// Define quiz questions as array
var questionList = [
    'Commonly used data types include all but the following:',
    'The condition of an if/else statement is enclosed with ____',
    'Arrays in JavaScript can be used to store ____',
    'String values must be enclosed by ____'
];

// Page states to store question number
var questionNumber = 0;
// saves locally stored score as variable
var highscores = localStorage.getItem('score');

// Quiz Function
function quiz() {
    // hide main, show quiz card
    main.setAttribute('style', 'display:none;');
    quizCard.setAttribute('style', 'display:block;');
    question.textContent = questionList[questionNumber];
    option1.value = 'boolean';
    option2.value = 'string';
    option3.value = 'array';
    option4.value = 'orientation';
    // start timer
    var timeLeft = 15;
    var timeInterval = setInterval(function() {
        timeLeft--;
        timeEl.textContent = 'time: ' + timeLeft;
        // if timer reaches 0, hide #quiz-card, show #done, set score to 0
        if (timeLeft === 0) {
            clearInterval(timeInterval);
            quizCard.setAttribute('style', 'display:none;');
            timeEl.textContent = 'time: 0';
            return; 
        }
    }, 1000);

    // if correct button is clicked, show #correct, then display question as h1 and answers as buttons 1-4. else, show wrong
    
};

var displayQuestion = function() {
    // display question as h1 and answers as buttons 1-4
    question.textContent = questionList[questionNumber];
    if (questionNumber === 1) {
        option1.value = '[brackets]';
        option2.value = '(parenthasis)';
        option3.value = '"quotes';
        option4.value = '`backticks`';
    } else if (questionNumber === 2) {
        option1.value = 'objects';
        option2.value = 'other arrays';
        option3.value = 'functions';
        option4.value = 'singular data values';
    } else if (questionNumber === 3) {
        option1.value = '[brackets]';
        option2.value = '(parenthasis)';
        option3.value = '"quotes';
        option4.value = '`backticks`';  
    };
    
    if (questionNumber === questionList.length) {
        quizCard.setAttribute('style', 'display: none;');
        done.setAttribute('style', 'display:block;');
    };
};

var nextQuestion = function() {
    questionNumber++;
    displayQuestion(); 
    console.log(questionNumber);

}

// populate #done with score 


// function to set local storage with highscores
var storeHighscore = function () {
    localStorage.setItem('score', score);
    localStorage.setItem('user', user.value);
};

// event listeners
startButton.addEventListener('click', quiz); // starts quiz
option1.addEventListener('click', nextQuestion) // answer question with option 1
option2.addEventListener('click', nextQuestion) // answer question with option 2
option3.addEventListener('click', nextQuestion) // answer question with option 3
option4.addEventListener('click', nextQuestion) // answer question with option 4

