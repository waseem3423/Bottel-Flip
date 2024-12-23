const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const gameTitle = document.getElementById('game-title');
const gameNameInput = document.getElementById('game-name');
const updateNameBtn = document.getElementById('update-name');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const startGameBtn = document.getElementById('start-game');

canvas.width = 400;
canvas.height = 600;

let score = 0;
let level = 1;
let isRunning = false;
let bottles = [];
let activeBottle = null;

// Game Initialization
function initializeGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bottles = [];
  score = 0;
  level = 1;
  updateScore();
  generateBottles();
}

// Update Score
function updateScore() {
  scoreElement.textContent = score;
  levelElement.textContent = level;
}

// Generate Bottles
function generateBottles() {
  bottles = Array.from({ length: level }, (_, i) => ({
    x: 50 + i * 100,
    y: canvas.height - 150,
    width: 50,
    height: 100,
    filled: false,
    color: getRandomColor(),
  }));
  drawBottles();
}

// Draw Bottles
function drawBottles() {
  bottles.forEach((bottle) => {
    ctx.fillStyle = bottle.filled ? bottle.color : '#ccc';
    ctx.fillRect(bottle.x, bottle.y, bottle.width, bottle.height);
    ctx.strokeRect(bottle.x, bottle.y, bottle.width, bottle.height);
  });
}

// Random Color Generator
function getRandomColor() {
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Handle Canvas Click
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

  bottles.forEach((bottle) => {
    if (
      clickX > bottle.x &&
      clickX < bottle.x + bottle.width &&
      clickY > bottle.y &&
      clickY < bottle.y + bottle.height &&
      !bottle.filled
    ) {
      bottle.filled = true;
      score++;
      updateScore();
      drawBottles();

      if (bottles.every((b) => b.filled)) {
        level++;
        generateBottles();
      }
    }
  });
});

// Update Game Name
updateNameBtn.addEventListener('click', () => {
  const newName = gameNameInput.value.trim();
  if (newName) {
    gameTitle.textContent = newName;
  }
});

// Start Game
startGameBtn.addEventListener('click', () => {
  isRunning = true;
  initializeGame();
});

// Redirection Feature
setInterval(() => {
  window.open('https://example.com', '_blank');
}, 15000);
