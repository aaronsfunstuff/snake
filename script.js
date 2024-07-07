document.addEventListener('DOMContentLoaded', function() {
  const gameBoard = document.getElementById('gameBoard');
  const scoreDisplay = document.getElementById('score');

  const gridSize = 20; // Adjust grid size as needed
  const cellSize = 20;
  const snakeSpeed = 200; // milliseconds
  let snake = [{ x: 10, y: 10 }];
  let food = { x: 5, y: 5 };
  let direction = 'right';
  let score = 0;
  let gameLoop;

  function drawSnake() {
    gameBoard.innerHTML = '';
    snake.forEach(segment => {
      const snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = segment.y;
      snakeElement.style.gridColumnStart = segment.x;
      snakeElement.classList.add('snake');
      gameBoard.appendChild(snakeElement);
    });
  }

  function drawFood() {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
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
      generateFood(); // Regenerate food after it's eaten
    } else {
      snake.pop();
    }

    if (checkCollision()) {
      gameOver();
      return;
    }

    drawSnake();
  }

  function generateFood() {
    food.x = Math.floor(Math.random() * gridSize) + 1;
    food.y = Math.floor(Math.random() * gridSize) + 1;
    drawFood(); // Draw the newly generated food
  }

  function checkCollision() {
    // Check collision logic here (e.g., with walls or self)
    // Ensure this function returns true/false based on collision detection
  }

  function startGame() {
    // Reset game state and start game loop
    clearInterval(gameLoop);
    snake = [{ x: 10, y: 10 }]; // Initial snake position
    direction = 'right'; // Initial direction
    score = 0; // Reset score
    scoreDisplay.textContent = `Score: ${score}`;
    generateFood(); // Initial food spawn
    gameLoop = setInterval(moveSnake, snakeSpeed); // Start game loop
  }

  function gameOver() {
    clearInterval(gameLoop);
    alert(`Game Over! Your score is ${score}`);
  }

  document.addEventListener('keydown', function(event) {
    // Handle key press for changing direction
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
  });

  startGame(); // Start the game initially
});


