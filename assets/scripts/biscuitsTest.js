const questionData = './assets/data/questions.json';
const reactionData = './assets/data/reactions.json';

const submit = document.querySelector('#submit');
submit.addEventListener('click', (event) => {
  event.preventDefault();
  changeQuestion();
});

let reactionText = document.querySelector('#reaction');
let questionText = document.querySelector('#question');
let labels = document.querySelectorAll('.answer-label');
let radioInputs = document.querySelectorAll('.radio-input');
radioInputs.forEach((input) => {
  input.addEventListener('input', () => {
    submit.removeAttribute('disabled');
  });
});

let reactionImage = document.querySelector('#reaction-img');

var questions;
var reactions;
let questionNumber = 0;
const numQuestions = 3;

function changeQuestion() {
  questionNumber += 1;
  let answer = document.querySelector('input[name="potential-answer"]:checked');

  if (questionNumber < numQuestions) {
    reactionText.textContent = reactions[answer.value].text;
    reactionImage.src = reactions[answer.value].img;
    reaction.alt = reactions[answer.value].alt;
    answer.checked = false;

    submit.setAttribute('disabled', 'disabled');
    loadQuestion();
  } else if (questionNumber === numQuestions) {
    displayFinalReaction(answer);
  } else {
    changeDisplay();
  }
}

function changeDisplay() {
  let quiz = document.querySelector('#entry-quiz');
  let message = document.querySelector('#message');

  quiz.style.display = 'none';
  message.style.display = 'flex';
}

function displayFinalReaction(answer) {
  let answerDiv = document.querySelector('#answers');
  questionText.style.display = 'none';
  answerDiv.style.display = 'none';

  reactionText.textContent = reactions[answer.value].text;
  reactionImage.src = reactions[answer.value].img;
  reaction.alt = reactions[answer.value].alt;
}

function loadQuestion() {
  let currentQuestion = questions[questionNumber];
  questionText.textContent = currentQuestion.question;

  let inputNumber = 0;
  radioInputs.forEach((input) => {
    input.value = currentQuestion.answers[inputNumber].value;
    labels[inputNumber].textContent = currentQuestion.answers[inputNumber].text;
    inputNumber += 1;
  });
}

async function fetchData(fileName) {
  return fetch(fileName).then((response) => {
    return response.json();
  });
}

async function initiateQuiz() {
  questions = await fetchData(questionData);
  reactions = await fetchData(reactionData);

  loadQuestion();
}

initiateQuiz();
