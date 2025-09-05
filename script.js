if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
        console.log('Service Worker зарегистрирован с областью:', registration.scope);
      })
      .catch(error => {
        console.log('Ошибка регистрации Service Worker:', error);
      });
  });
}

const questions = [
    {
    question: "Что делает оператор '===' в JavaScript?",
     options: [
      "Присваивает значение",
      "Сравнивает значения и типы",
      "Сравнивает только значения",
      "Останавливает выполнение"
    ],
       correctAnswer: 1
  },
  {
    question: "Как объявить переменную?",
    options: ["let", "def", "var", "int"],
    correctAnswer: 0
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