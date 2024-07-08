document.addEventListener('DOMContentLoaded', function() {
  const gameBoard = document.getElementById('gameBoard');
  const scoreDisplay = document.getElementById('score');

  const gridSize = 20;
  const cellSize = 20;
  const snakeSpeed = 200; // milliseconds
  let snake = [{ x: 10, y: 10 }];
  let food = { x: 5, y: 5 };
  let direction = 'right';
  let score = 0;
  let gameLoop;

  function drawSnake() {
    // Clear existing snake elements only, not the entire game board
    const snakeElements = document.querySelectorAll('.snake');
    snakeElements.forEach(element => element.remove());

    snake.forEach(segment => {
      const snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = segment.y;
      snakeElement.style.gridColumnStart = segment.x;
      snakeElement.classList.add('snake');
      gameBoard.appendChild(snakeElement);
    });
  }

  function drawFood() {
    // Clear existing food element if any
    const existingFood = document.querySelector('.food');
    if (existingFood) {
      existingFood.remove();
    }

    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);

    console.log(`Food element created at (${food.x}, ${food.y}) with classes:`, foodElement.classList);
  }

  function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y };

    switch (direction) {
      case 'up':
        head.y--;
        break;
      case 'down':
        head.y++;
        break;
      case 'left':
        head.x--;
        break;
      case 'right':
        head.x++;
        break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      generateFood();
    } else {
      snake.pop();
    }

    if (checkCollision()) {
      gameOver();
      return;
    }

    drawSnake();
    drawFood(); // Ensure food is drawn after moving the snake
  }

  function generateFood() {
    food.x = Math.floor(Math.random() * gridSize) + 1;
    food.y = Math.floor(Math.random() * gridSize) + 1;
    drawFood();
  }

  function checkCollision() {
    if (snake[0].x < 1 || snake[0].x > gridSize || snake[0].y < 1 || snake[0].y > gridSize) {
      return true; // Wall collision
    }

    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
        return true; // Self collision
      }
    }

    return false;
  }

  function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== 'right') {
      direction = 'left';
    } else if (key === 38 && direction !== 'down') {
      direction = 'up';
    } else if (key === 39 && direction !== 'left') {
      direction = 'right';
    } else if (key === 40 && direction !== 'up') {
      direction = 'down';
    }
  }

  function startGame() {
    clearInterval(gameLoop); // Clear any existing game loop
    snake = [{ x: 10, y: 10 }]; // Reset snake position
    direction = 'right';
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    generateFood();
    gameLoop = setInterval(moveSnake, snakeSpeed);
  }

  function gameOver() {
    clearInterval(gameLoop);
    alert(`Game Over! Your score is ${score}`);
  }

  const startButton = document.getElementById('startButton');
  if (startButton) {
    startButton.addEventListener('click', startGame);
  } else {
    console.error('Element with ID "startButton" not found.');
  }

  document.addEventListener('keydown', changeDirection);
  
  startGame(); // Start the game initially
});
// Draws grid
function drawBoard() {
  for (let y = 1; y <= gridSize; y++) {
    for (let x = 1; x <= gridSize; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.style.gridRowStart = y;
      cell.style.gridColumnStart = x;
      gameBoard.appendChild(cell);
    }
  }
}

// Call drawBoard() once to initialize the grid
drawBoard();

