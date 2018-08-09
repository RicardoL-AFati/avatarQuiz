// Keeping track of current question, score, and failed attempts
let count = 0;
let score = 0;
let tries = 0;

// DOM selectors
const scoreDisplay = document.querySelector('.score');
const domAnswers = document.querySelectorAll('.answers');
const quizBtn = document.querySelector('.startGame');
const quizContainer = document.querySelector('.container');
const question = document.querySelector('.question');
const message = document.querySelector('.message');
const bio = document.querySelector('.bio');

// Questions and Answers for Quiz
const questions = [
  'Which air temple is Aang from?',
  'Who was Sokka trained by on Kyoshi Island?',
  'Where did Zuko go on vacation with Azula, Ty Lee, and Mai?',
  'What celestial event enhances firebenders ability?',
  'What caused Iroh to retire from being a general?',
  'What religion does Avatar draw inspiration from?',
  'Who was the avatar before Korra?',
  'From whom did the original earthbenders learn from?',
  'Who was Avatar Aangs first child?',
];
const answers = [
  [0, ['Southern', 'Eastern', 'Western', 'Northern']],
  [2, ['Bumi', 'Long Feng', 'Suki', 'Zhao']],
  [3, ['Capital City', 'Omashu', 'Lake Laogai', 'Ember Island']],
  [1, ['Full moon', 'Comets', 'Lightning Storm', 'Half moon']],
  [1, ['Old age', 'The death of his son', "Zuko's - his nephew - banishment", "Sozin's Coment"]],
  [0, ['Buddhism', 'Islam', 'Christianity', 'Sikhism']],
  [1, ['Roku', 'Aang', 'Yangchen', 'Kuruk']],
  [2, ['Lion turtles', 'Raava', 'Badger Moles', 'Ancient spirits']],
  [3, ['Tenzin', 'Kya', 'Toph', 'Bumi']],
];

// Run on page load and to reset game
const addEventListeners = () => {
  quizBtn.addEventListener('click', initializeQuiz);
  domAnswers.forEach((answer) => answer.addEventListener('click', onAnswerClick));
};
// Run when game is over
const removeEventListeners = () => {
  quizBtn.removeEventListener('click', initializeQuiz);
  domAnswers.forEach((answer) => answer.removeEventListener('click', onAnswerClick));
};
// Starts Game
const initializeQuiz = () => {
  addEventListeners();
  /* Resetting score,
     showing quiz grid and rendering grid contents,
     hiding start button */
  score = 0;
  quizContainer.style.display = 'grid';
  quizBtn.style.display = 'none';
  bio.style.display = 'inline';
  renderQuiz();
};
// Renders Grid Content
const renderQuiz = () => {
  /* removing restart class (if present) from question div,
     resetting score, rendering question and it's answers */
  question.classList.remove('clickMe');
  scoreDisplay.innerHTML = `Current Score: ${score}`;
  question.innerHTML = questions[count];
  answers[count][1].forEach((answer, index) => {
    domAnswers[index].innerHTML = answer;
  });
};
// Render Grid Content - for Game over
const renderGameOver = () => {
  /* Removing click events,
     adding restart class to question div,
     changing grid content - score and empty answer divs */
  removeEventListeners();
  question.classList.add('clickMe');
  question.addEventListener('click', initializeQuiz);
  domAnswers.forEach((answer) => (answer.innerHTML = ''));
  question.innerHTML = 'Play Again?';
  scoreDisplay.innerHTML = `Final Score: ${score}`;
};
// Renders Grid Content - for continuing game
const continueQuiz = () => {
  // Removes any previous wrong answer styling
  domAnswers.forEach((answer) => {
    answer.classList.remove('wrong');
  });
  // Incrementing count for Q&A pair, resseting failed attempts
  count++;
  tries = 0;
  // Game is over after 8 questions
  if (count === 8) {
    count = 0;
    renderGameOver();
  } else {
    renderQuiz();
  }
};
// When answer div is clicked
function onAnswerClick() {
  // First index of [answers] is the correct answer index
  const correctIndex = answers[count][0];
  // Second index is array of possible answers
  const clickedIndex = answers[count][1].findIndex((answer) => answer === this.innerHTML);
  // If clicked answer is correct
  if (clickedIndex === correctIndex) {
    // show message and change back after 1 sec
    message.innerHTML = "That's correct!";
    setTimeout(() => {
      message.innerHTML = '';
    }, 1000);
    // Add 10 to score
    score += 10;
    continueQuiz();
  } else {
    // show message and change clicked div's styling
    message.innerHTML = 'Not correct, try again!';
    this.classList.add('wrong');
    // decrement score by 5 unless there has been two failed attempts
    score = tries > 1 ? score : score - 5;
    // increment failed attempts var
    tries++;
  }
}

addEventListeners();
