const questions = [
    {
    question: "Какой язык мы используем?",
     options: [
      "JavaScript",
      "Python",
      "C#",
      "C++"
    ],
       correctAnswer: 0
  },
  {
    question: "сколько будет 2+2?",
    options: ["2", "4", "22", "83"],
    correctAnswer: 1
  }
];
function loadQuiz() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";
  questions.forEach((q, index) => {
    const questionEl = document.createElement("div");
    questionEl.innerHTML = `<p><strong>${q.question}</strong></p>`;
    q.options.forEach((option, i) => {
      const id = `q${index}_opt${i}`;
      questionEl.innerHTML += `
        <label>
          <input type="radio" name="q${index}" value="${i}" id="${id}">
          ${option}
        </label><br>
      `;
    });
        container.appendChild(questionEl);
    container.appendChild(document.createElement("hr"));
  });
}
function submitQuiz() {
  let score = 0;
  questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && parseInt(selected.value) === q.correctAnswer) {
      score++;
    }
  });
    const resultEl = document.getElementById("result");
  resultEl.textContent = `Ты набрал ${score} из ${questions.length} баллов`;
}
loadQuiz();