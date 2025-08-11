// Variables globales
let currentSection = 'home';
let missionCount = 0;
let energy = 100;
let shields = 80;
let coordinates = { x: 0, y: 0, z: 0 };
let quizScore = 0;
let currentQuestionIndex = 0;
let quizQuestions = [];

// Datos de planetas
const planetData = {
  mercury: {
    name: 'Mercurio',
    description:
      'El planeta más cercano al Sol. Extremadamente caliente durante el día y frío durante la noche.',
    facts: [
      '🌡️ Temperatura: -173°C a 427°C',
      '⏰ Día: 59 días terrestres',
      '📏 Distancia al Sol: 57.9 millones km',
      '🎯 Dato curioso: No tiene atmósfera',
    ],
  },
  venus: {
    name: 'Venus',
    description:
      "Conocido como el 'gemelo malvado' de la Tierra debido a su atmósfera tóxica y efecto invernadero extremo.",
    facts: [
      '🌡️ Temperatura: 462°C constante',
      '☁️ Atmósfera: 96% dióxido de carbono',
      '🔄 Rotación: Sentido contrario al resto',
      '✨ Dato curioso: Es el planeta más brillante',
    ],
  },
  earth: {
    name: 'Tierra',
    description:
      'Nuestro hogar. El único planeta conocido que alberga vida en el universo.',
    facts: [
      '🌍 71% cubierto de agua',
      '🛡️ Campo magnético protector',
      '🌬️ Atmósfera: 78% nitrógeno, 21% oxígeno',
      '🧬 Dato curioso: Hogar de 8.7 millones de especies',
    ],
  },
  mars: {
    name: 'Marte',
    description:
      "El 'Planeta Rojo' debido al óxido de hierro en su superficie. Objetivo principal de futuras misiones humanas.",
    facts: [
      '🔴 Color rojo por óxido de hierro',
      '🏔️ Monte Olimpo: volcán más alto del sistema solar',
      '❄️ Casquetes polares de hielo',
      '🤖 Dato curioso: Explorado por rovers desde 1997',
    ],
  },
  jupiter: {
    name: 'Júpiter',
    description:
      'El gigante gaseoso más grande del sistema solar. Tiene más de 80 lunas conocidas.',
    facts: [
      '🌪️ Gran Mancha Roja: tormenta gigante',
      '🌙 Más de 80 lunas conocidas',
      '⚖️ Masa: más que todos los planetas juntos',
      '🛡️ Dato curioso: Protege la Tierra de asteroides',
    ],
  },
  saturn: {
    name: 'Saturno',
    description:
      'Famoso por sus espectaculares anillos compuestos principalmente de hielo y roca.',
    facts: [
      '💍 Anillos espectaculares de hielo',
      '🎈 Densidad menor que el agua',
      '🌙 Titán: luna con atmósfera densa',
      '⭐ Dato curioso: Podría flotar en el océano',
    ],
  },
};

// Preguntas del quiz
const quizData = [
  {
    question: '¿Cuál es el planeta más cercano al Sol?',
    options: ['Venus', 'Mercurio', 'Tierra', 'Marte'],
    correct: 1,
  },
  {
    question: "¿Qué planeta es conocido como el 'Planeta Rojo'?",
    options: ['Venus', 'Júpiter', 'Marte', 'Saturno'],
    correct: 2,
  },
  {
    question: '¿Cuál es el planeta más grande del sistema solar?',
    options: ['Saturno', 'Júpiter', 'Neptuno', 'Urano'],
    correct: 1,
  },
  {
    question: '¿Qué planeta tiene los anillos más visibles?',
    options: ['Júpiter', 'Urano', 'Neptuno', 'Saturno'],
    correct: 3,
  },
  {
    question: '¿Cuántas lunas tiene la Tierra?',
    options: ['0', '1', '2', '3'],
    correct: 1,
  },
  {
    question: '¿Cuál es la temperatura promedio en Venus?',
    options: ['100°C', '300°C', '462°C', '600°C'],
    correct: 2,
  },
  {
    question: '¿Qué porcentaje de la Tierra está cubierto por agua?',
    options: ['65%', '71%', '80%', '85%'],
    correct: 1,
  },
  {
    question: '¿Cuál es el volcán más alto del sistema solar?',
    options: ['Monte Everest', 'Monte Olimpo', 'Monte Fuji', 'Kilimanjaro'],
    correct: 1,
  },
  {
    question: '¿En qué planeta se encuentra la Gran Mancha Roja?',
    options: ['Marte', 'Júpiter', 'Saturno', 'Venus'],
    correct: 1,
  },
  {
    question: '¿Cuánto dura un día en Mercurio?',
    options: ['24 horas', '30 días', '59 días', '100 días'],
    correct: 2,
  },
];

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
  initializeApp();
  setupEventListeners();
  updateMissionCounter();
});

function initializeApp() {
  // Crear estrellas adicionales dinámicamente
  createStars();

  // Inicializar quiz
  quizQuestions = [...quizData];

  // Actualizar displays
  updateSpaceshipStatus();
  updateCoordinates();
}

function createStars() {
  const starsContainer = document.querySelector('.stars');

  // Crear estrellas adicionales para más efecto
  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.style.position = 'absolute';
    star.style.width = Math.random() * 3 + 'px';
    star.style.height = star.style.width;
    star.style.backgroundColor = '#fff';
    star.style.borderRadius = '50%';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animation = `twinkle ${Math.random() * 4 + 2}s infinite linear`;
    starsContainer.appendChild(star);
  }
}

function setupEventListeners() {
  // Navegación
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => switchSection(btn.dataset.section));
  });

  // Planetas
  document.querySelectorAll('.planet').forEach((planet) => {
    planet.addEventListener('click', () =>
      showPlanetInfo(planet.dataset.planet)
    );
  });

  // Efectos de sonido simulados con vibración (en móviles)
  document.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    });
  });
}

function switchSection(sectionName) {
  // Ocultar todas las secciones
  document.querySelectorAll('.section').forEach((section) => {
    section.classList.remove('active');
  });

  // Mostrar sección seleccionada
  document.getElementById(sectionName).classList.add('active');

  // Actualizar navegación
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.classList.remove('active');
  });

  document
    .querySelector(`[data-section="${sectionName}"]`)
    .classList.add('active');
  currentSection = sectionName;
}

function startMission() {
  missionCount++;
  updateMissionCounter();

  // Efecto visual
  const button = event.target;
  button.style.transform = 'scale(0.95)';
  button.innerHTML = '🚀 ¡MISIÓN INICIADA!';

  setTimeout(() => {
    button.style.transform = 'scale(1)';
    button.innerHTML = '🚀 INICIAR MISIÓN';
  }, 1000);

  // Cambiar a la sección de planetas
  setTimeout(() => {
    switchSection('planets');
  }, 1500);
}

function updateMissionCounter() {
  document.getElementById('missionCount').textContent = missionCount;
}

function showPlanetInfo(planetKey) {
  const planet = planetData[planetKey];
  const infoPanel = document.getElementById('planetInfo');

  document.getElementById('planetTitle').textContent = planet.name;
  document.getElementById('planetDetails').innerHTML = `
        <p style="margin-bottom: 1rem; font-size: 1.1rem;">${
          planet.description
        }</p>
        <ul style="list-style: none; padding: 0;">
            ${planet.facts
              .map(
                (fact) =>
                  `<li style="margin: 0.5rem 0; padding: 0.5rem; background: rgba(0,255,255,0.1); border-radius: 5px;">${fact}</li>`
              )
              .join('')}
        </ul>
    `;

  infoPanel.classList.remove('hidden');
}

function closePlanetInfo() {
  document.getElementById('planetInfo').classList.add('hidden');
}

function visitPlanet() {
  // Simular visita al planeta
  energy = Math.max(0, energy - 10);
  updateSpaceshipStatus();

  // Generar coordenadas aleatorias
  coordinates = {
    x: Math.floor(Math.random() * 1000) - 500,
    y: Math.floor(Math.random() * 1000) - 500,
    z: Math.floor(Math.random() * 1000) - 500,
  };
  updateCoordinates();

  closePlanetInfo();
  switchSection('spaceship');

  // Mostrar mensaje de éxito
  setTimeout(() => {
    alert('¡Planeta visitado con éxito! Has ganado experiencia espacial.');
    missionCount++;
    updateMissionCounter();
  }, 500);
}

function updateSpaceshipStatus() {
  document.getElementById('energyBar').style.width = energy + '%';
  document.getElementById('shieldBar').style.width = shields + '%';

  // Cambiar colores según el nivel
  const energyBar = document.getElementById('energyBar');
  const shieldBar = document.getElementById('shieldBar');

  if (energy < 30) {
    energyBar.style.background = 'linear-gradient(45deg, #ff0000, #cc0000)';
  } else if (energy < 60) {
    energyBar.style.background = 'linear-gradient(45deg, #ffff00, #cc9900)';
  } else {
    energyBar.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
  }

  if (shields < 30) {
    shieldBar.style.background = 'linear-gradient(45deg, #ff0000, #cc0000)';
  } else {
    shieldBar.style.background = 'linear-gradient(45deg, #00ffff, #0088ff)';
  }
}

function updateCoordinates() {
  document.getElementById('coordX').textContent = coordinates.x;
  document.getElementById('coordY').textContent = coordinates.y;
  document.getElementById('coordZ').textContent = coordinates.z;
}

function rechargeEnergy() {
  energy = Math.min(100, energy + 25);
  updateSpaceshipStatus();

  // Efecto visual
  const button = event.target;
  button.innerHTML = '⚡ ¡RECARGANDO!';
  setTimeout(() => {
    button.innerHTML = '🔋 Recargar';
  }, 1000);
}

function repairShields() {
  shields = Math.min(100, shields + 20);
  updateSpaceshipStatus();

  // Efecto visual
  const button = event.target;
  button.innerHTML = '🔧 ¡REPARANDO!';
  setTimeout(() => {
    button.innerHTML = '🔧 Reparar';
  }, 1000);
}

function randomJump() {
  // Consumir energía
  energy = Math.max(0, energy - 15);

  // Generar nuevas coordenadas
  coordinates = {
    x: Math.floor(Math.random() * 2000) - 1000,
    y: Math.floor(Math.random() * 2000) - 1000,
    z: Math.floor(Math.random() * 2000) - 1000,
  };

  updateSpaceshipStatus();
  updateCoordinates();

  // Efecto visual
  const spaceship = document.querySelector('.spaceship');
  spaceship.style.animation = 'none';
  spaceship.style.transform = 'scale(1.5) rotate(360deg)';

  setTimeout(() => {
    spaceship.style.animation = 'float 3s infinite ease-in-out';
    spaceship.style.transform = 'none';
  }, 1000);

  // Mensaje
  setTimeout(() => {
    const messages = [
      '¡Salto cuántico exitoso!',
      '¡Has llegado a una nueva región del espacio!',
      '¡Coordenadas actualizadas!',
      '¡Exploración espacial en progreso!',
    ];
    alert(messages[Math.floor(Math.random() * messages.length)]);
  }, 1200);
}

function startQuiz() {
  quizScore = 0;
  currentQuestionIndex = 0;

  // Mezclar preguntas
  quizQuestions = [...quizData].sort(() => Math.random() - 0.5);

  document.getElementById('startQuiz').classList.add('hidden');
  document.getElementById('quizScore').textContent = `${quizScore}/10`;

  showQuestion();
}

function showQuestion() {
  if (currentQuestionIndex >= quizQuestions.length) {
    endQuiz();
    return;
  }

  const question = quizQuestions[currentQuestionIndex];
  document.getElementById('question').textContent = question.question;

  const optionsContainer = document.getElementById('options');
  optionsContainer.innerHTML = '';

  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'quiz-option';
    button.textContent = option;
    button.addEventListener('click', () => selectAnswer(index));
    optionsContainer.appendChild(button);
  });

  document.getElementById('quizResult').classList.add('hidden');
  document.getElementById('nextQuestion').classList.add('hidden');
}

function selectAnswer(selectedIndex) {
  const question = quizQuestions[currentQuestionIndex];
  const options = document.querySelectorAll('.quiz-option');

  // Deshabilitar todas las opciones
  options.forEach((option) => (option.disabled = true));

  // Mostrar respuesta correcta e incorrecta
  options[question.correct].classList.add('correct');
  if (selectedIndex !== question.correct) {
    options[selectedIndex].classList.add('incorrect');
  }

  // Actualizar puntuación
  if (selectedIndex === question.correct) {
    quizScore++;
    document.getElementById('quizResult').innerHTML = '🎉 ¡Correcto! +1 punto';
    document.getElementById('quizResult').style.background =
      'rgba(0, 255, 0, 0.2)';
  } else {
    document.getElementById('quizResult').innerHTML =
      '❌ Incorrecto. La respuesta correcta era: ' +
      question.options[question.correct];
    document.getElementById('quizResult').style.background =
      'rgba(255, 0, 0, 0.2)';
  }

  document.getElementById('quizResult').classList.remove('hidden');
  document.getElementById('quizScore').textContent = `${quizScore}/10`;
  document.getElementById('nextQuestion').classList.remove('hidden');
}

function nextQuestion() {
  currentQuestionIndex++;
  showQuestion();
}

function endQuiz() {
  const percentage = (quizScore / quizQuestions.length) * 100;
  let message = '';
  let background = '';

  if (percentage >= 80) {
    message = '🏆 ¡Excelente! Eres un verdadero explorador espacial.';
    background = 'rgba(255, 215, 0, 0.2)';
  } else if (percentage >= 60) {
    message = '👍 ¡Bien hecho! Tienes buenos conocimientos del espacio.';
    background = 'rgba(0, 255, 0, 0.2)';
  } else if (percentage >= 40) {
    message = '📚 No está mal, pero puedes aprender más sobre el espacio.';
    background = 'rgba(255, 165, 0, 0.2)';
  } else {
    message = '🚀 ¡Sigue explorando y aprendiendo sobre el universo!';
    background = 'rgba(255, 0, 0, 0.2)';
  }

  document.getElementById('question').textContent = '¡Quiz Completado!';
  document.getElementById('options').innerHTML = '';
  document.getElementById('quizResult').innerHTML = `
        <h3>Puntuación Final: ${quizScore}/${
    quizQuestions.length
  } (${percentage.toFixed(1)}%)</h3>
        <p>${message}</p>
    `;
  document.getElementById('quizResult').style.background = background;
  document.getElementById('quizResult').classList.remove('hidden');
  document.getElementById('nextQuestion').classList.add('hidden');
  document.getElementById('startQuiz').classList.remove('hidden');
  document.getElementById('startQuiz').textContent = '🔄 Reiniciar Quiz';

  // Incrementar misiones si el quiz fue exitoso
  if (percentage >= 60) {
    missionCount++;
    updateMissionCounter();
  }
}

// Efectos adicionales
document.addEventListener('mousemove', function (e) {
  // Efecto de parallax sutil en la nebulosa
  const nebula = document.querySelector('.nebula');
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  nebula.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
});

// Easter egg: Konami Code
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // UP UP DOWN DOWN LEFT RIGHT LEFT RIGHT B A

document.addEventListener('keydown', function (e) {
  konamiCode.push(e.keyCode);

  if (konamiCode.length > konami.length) {
    konamiCode.shift();
  }

  if (konamiCode.join(',') === konami.join(',')) {
    // Easter egg activado
    energy = 100;
    shields = 100;
    missionCount += 10;
    updateSpaceshipStatus();
    updateMissionCounter();

    alert(
      '🎉 ¡CÓDIGO SECRETO ACTIVADO! \n🚀 Energía y escudos al máximo \n🏆 +10 misiones completadas'
    );
    konamiCode = [];
  }
});

// Guardar progreso en localStorage
function saveProgress() {
  const progress = {
    missionCount,
    energy,
    shields,
    coordinates,
    quizScore,
  };
  localStorage.setItem('spaceExplorerProgress', JSON.stringify(progress));
}

function loadProgress() {
  const saved = localStorage.getItem('spaceExplorerProgress');
  if (saved) {
    const progress = JSON.parse(saved);
    missionCount = progress.missionCount || 0;
    energy = progress.energy || 100;
    shields = progress.shields || 80;
    coordinates = progress.coordinates || { x: 0, y: 0, z: 0 };

    updateMissionCounter();
    updateSpaceshipStatus();
    updateCoordinates();
  }
}

// Cargar progreso al iniciar
window.addEventListener('load', loadProgress);

// Guardar progreso cada 30 segundos
setInterval(saveProgress, 30000);
