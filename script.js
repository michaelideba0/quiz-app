const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "HyperText Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "HighText Machine Language", correct: false }
    ]
  },
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Python", correct: false },
      { text: "C", correct: false },
      { text: "JavaScript", correct: true },
      { text: "Java", correct: false }
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Computer Style Sheets", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Colorful Style Sheets", correct: false },
      { text: "Creative Style System", correct: false }
    ]
  },
  {
    question: "Which company developed JavaScript?",
    answers: [
      { text: "Netscape", correct: true },
      { text: "Microsoft", correct: false },
      { text: "Google", correct: false },
      { text: "Sun Microsystems", correct: false }
    ]
  }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.style.display = 'none';
  restartButton.style.display = 'none';
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('answer-btn');
    button.addEventListener('click', () => selectAnswer(button, answer.correct));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = 'none';
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(button, correct) {
  const allButtons = document.querySelectorAll('.answer-btn');
  allButtons.forEach(btn => btn.disabled = true);

  if (correct) {
    button.classList.add('correct');
    score++;
  } else {
    button.classList.add('wrong');
  }

  nextButton.style.display = 'block';
}

function showScore() {
  resetState();
  questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
  restartButton.style.display = 'block';
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', startQuiz);

startQuiz();