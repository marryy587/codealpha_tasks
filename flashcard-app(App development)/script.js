const flashcards = [
  {
    question: "What is HTML?",
    answer: "HTML stands for HyperText Markup Language."
  },
  {
    question: "What is CSS?",
    answer: "CSS stands for Cascading Style Sheets."
  },
  {
    question: "What is JavaScript?",
    answer: "JavaScript is used to add interactivity to web pages."
  }
];

let currentIndex = 0;
let isEditing = false;

const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const showAnswerBtn = document.getElementById("showAnswerBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const deleteBtn = document.getElementById("deleteBtn");
const editBtn = document.getElementById("editBtn");

const newQuestionInput = document.getElementById("newQuestion");
const newAnswerInput = document.getElementById("newAnswer");
const addCardBtn = document.getElementById("addCardBtn");

function displayCard() {
  if (flashcards.length === 0) {
    questionElement.textContent = "No flashcards available.";
    answerElement.textContent = "";
    answerElement.classList.add("hidden");
    return;
  }

  questionElement.textContent = flashcards[currentIndex].question;
  answerElement.textContent = flashcards[currentIndex].answer;
  answerElement.classList.add("hidden");
}

showAnswerBtn.addEventListener("click", function () {
  if (flashcards.length > 0) {
    answerElement.classList.remove("hidden");
  }
});

nextBtn.addEventListener("click", function () {
  if (currentIndex < flashcards.length - 1) {
    currentIndex++;
    displayCard();
  }
});

prevBtn.addEventListener("click", function () {
  if (currentIndex > 0) {
    currentIndex--;
    displayCard();
  }
});

deleteBtn.addEventListener("click", function () {
  if (flashcards.length === 0) {
    return;
  }

  flashcards.splice(currentIndex, 1);

  if (currentIndex >= flashcards.length) {
    currentIndex = flashcards.length - 1;
  }

  displayCard();
});

editBtn.addEventListener("click", function () {
  if (flashcards.length === 0) {
    return;
  }

  newQuestionInput.value = flashcards[currentIndex].question;
  newAnswerInput.value = flashcards[currentIndex].answer;
  addCardBtn.textContent = "Update Flashcard";
  isEditing = true;
});

addCardBtn.addEventListener("click", function () {
  const newQuestion = newQuestionInput.value.trim();
  const newAnswer = newAnswerInput.value.trim();

  if (newQuestion === "" || newAnswer === "") {
    alert("Please enter both question and answer.");
    return;
  }

  if (isEditing) {
    flashcards[currentIndex].question = newQuestion;
    flashcards[currentIndex].answer = newAnswer;
    isEditing = false;
    addCardBtn.textContent = "Add Flashcard";
    displayCard();
  } else {
    flashcards.push({
      question: newQuestion,
      answer: newAnswer
    });

    currentIndex = flashcards.length - 1;
    displayCard();
  }

  newQuestionInput.value = "";
  newAnswerInput.value = "";
});

displayCard();