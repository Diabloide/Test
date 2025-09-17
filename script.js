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

const allQuestions = [
  //1
  {
    question: "В школе 800 учеников, из них 30% — ученики начальной школы. Среди учеников средней и старшей школы 20% изучают немецкий язык. Сколько учеников в школе изучают немецкий язык, если в начальной школе немецкий язык не изучается?", 
    options: ["112", "121", "111", "222" ],
    correctAnswer: 0 
  },

  //2
  {
    question: "В школе 1050 учеников, из них 30% — ученики начальной школы. Среди учеников средней и старшей школы 20% изучают французский язык. Сколько учеников в школе изучают французский язык, если в начальной школе французский язык не изучается?", 
    options: ["741", "147", "471", "417" ],
    correctAnswer: 1 
  },
  
  //3
  {
    question: "В школе 1240 учеников, из них 25% — ученики начальной школы. Среди учеников средней и старшей школы 40% изучают французский язык. Сколько учеников в школе изучают французский язык, если в начальной школе французский язык не изучается?",
    options: ["372", "252", "525", "273" ],
    correctAnswer: 0
  },

  //4
  {
    question: "В школе 1400 учеников, из них 30% — ученики начальной школы. Среди учеников средней и старшей школы 30% изучают французский язык. Сколько учеников в школе изучают французский язык, если в начальной школе французский язык не изучается?",
    options: ["832", "293", "392", "294" ],
    correctAnswer: 3
  },

  //5
  {
    question: "В школе 400 учеников, из них 30% — ученики начальной школы. Среди учеников средней и старшей школы 15% изучают немецкий язык. Сколько учеников в школе изучают немецкий язык, если в начальной школе немецкий язык не изучается?",
    options: ["52", "32", "42", "22" ],
    correctAnswer: 2
  },

  //6
  {
    question: "Ежемесячная плата за телефон составляет 200 рублей в месяц. В следующем году она увеличится на 2%. Сколько рублей будет составлять ежемесячная плата за телефон в следующем году?",
    options: ["105", "342", "204", "208" ],
    correctAnswer: 2
  },

  //7
  {
    question: "Ежемесячная плата за телефон составляет 250 рублей в месяц. В следующем году она увеличится на 4%. Сколько рублей будет составлять ежемесячная плата за телефон в следующем году?",
    options: ["200", "260", "373", "157" ],
    correctAnswer: 1
  },

  //8
  {
    question: "Ежемесячная плата за телефон составляет 260 рублей в месяц. В следующем году она увеличится на 4%. Сколько рублей будет составлять ежемесячная плата за телефон в следующем году?",
    options: ["270,4", "35,5", "253", "176" ],
    correctAnswer: 0
  },
]



  function getRandomQuestions(sourceArray, numberOfQuestions) {
  const shuffled = [...sourceArray].sort(() => 0.5 - Math.random()); // Перемешиваем копию массива
  return shuffled.slice(0, numberOfQuestions); // Возвращаем первые N (20) вопросов
}

  function loadQuiz(selectedQuestions) {
  const container = document.getElementById("quiz-container"); // Получаем контейнер из HTML
  container.innerHTML = ""; // Очищаем его содержимое

  selectedQuestions.forEach((q, index) => { // Перебираем вопросы
    const questionEl = document.createElement("div"); // Создаём div для вопроса
    questionEl.innerHTML = `<p><strong>${q.question}</strong></p>`; // Вставляем текст вопроса

    q.options.forEach((option, i) => { // Перебираем варианты ответа
      const id = `q${index}_opt${i}`; // Уникальный id для радиокнопки

      questionEl.innerHTML += `
        <label>
          <input type="radio" name="q${index}" value="${i}" id="${id}">
          ${option}
        </label><br>
      `; // Добавляем радио-кнопку и текст варианта
    });

    container.appendChild(questionEl); // Добавляем вопрос на страницу
    container.appendChild(document.createElement("hr")); // Горизонтальная линия
  });
}

  const selectedQuestions = getRandomQuestions(allQuestions, 1); // Выбираем 20 случайных вопросов
loadQuiz(selectedQuestions); // Загружаем их на страницу

  function submitQuiz() {
  let score = 0;

  selectedQuestions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && parseInt(selected.value) === q.correctAnswer) {
      score++;
    }
  });

  const resultEl = document.getElementById("result");
  resultEl.textContent = `Ты набрал ${score} из ${selectedQuestions.length} баллов`;
}