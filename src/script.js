// Maze generation using Depth-First Search (DFS) algorithm

const rows = 10; // Number of rows in the maze
const cols = 10; // Number of columns in the maze
const maze = [];
const stack = [];

// Initialize the maze with walls
for (let r = 0; r < rows; r++) {
  maze[r] = [];
  for (let c = 0; c < cols; c++) {
    maze[r][c] = {
      visited: false,
      top: true,
      right: true,
      bottom: true,
      left: true
    };
  }
}

// Utility function to get unvisited neighbors
function getUnvisitedNeighbors(row, col) {
  const neighbors = [];

  if (row > 0 && !maze[row - 1][col].visited) neighbors.push([row - 1, col]);
  if (row < rows - 1 && !maze[row + 1][col].visited) neighbors.push([row + 1, col]);
  if (col > 0 && !maze[row][col - 1].visited) neighbors.push([row, col - 1]);
  if (col < cols - 1 && !maze[row][col + 1].visited) neighbors.push([row, col + 1]);

  return neighbors;
}

// Utility function to remove walls between two cells
function removeWalls(current, next) {
  const x = current[1] - next[1];
  const y = current[0] - next[0];

  if (x === 1) {
    maze[current[0]][current[1]].left = false;
    maze[next[0]][next[1]].right = false;
  } else if (x === -1) {
    maze[current[0]][current[1]].right = false;
    maze[next[0]][next[1]].left = false;
  }

  if (y === 1) {
    maze[current[0]][current[1]].top = false;
    maze[next[0]][next[1]].bottom = false;
  } else if (y === -1) {
    maze[current[0]][current[1]].bottom = false;
    maze[next[0]][next[1]].top = false;
  }
}

// Depth-First Search (DFS) algorithm to generate the maze
function generateMaze(row, col) {
  maze[row][col].visited = true;
  stack.push([row, col]);

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const neighbors = getUnvisitedNeighbors(current[0], current[1]);

    if (neighbors.length > 0) {
      const next = neighbors[Math.floor(Math.random() * neighbors.length)];
      removeWalls(current, next);
      maze[next[0]][next[1]].visited = true;
      stack.push(next);
    } else {
      stack.pop();
    }
  }
}

// Function to render the maze on the game board
function renderMaze() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';
  gameBoard.style.display = 'grid';
  gameBoard.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  gameBoard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement('div');
      cell.style.borderTop = maze[r][c].top ? '1px solid black' : 'none';
      cell.style.borderRight = maze[r][c].right ? '1px solid black' : 'none';
      cell.style.borderBottom = maze[r][c].bottom ? '1px solid black' : 'none';
      cell.style.borderLeft = maze[r][c].left ? '1px solid black' : 'none';
      gameBoard.appendChild(cell);
    }
  }
}

function ScapeFromMaze() {
  let player_x = 0;
  let player_y = 0;
  const scape_x = rows - 1;
  const scape_y = cols - 1;

  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowUp':
        player_x - 1 >= 0 ? player_x-- : player_x;
        break;
      case 'ArrowRight':
        player_y + 1 < cols ? player_y++ : player_y;
        break;
      case 'ArrowDown':
        player_x + 1 < rows ? player_x++ : player_x;
        break;
      case 'ArrowLeft':
        player_y - 1 >= 0 ? player_y-- : player_y;
        break;
    }
    updateGrid(player_x, player_y);

    if (player_x === scape_x && player_y === scape_y) {
      const message = document.createElement('div');
      message.innerText = 'You have reached the end of the maze!';
      document.body.appendChild(message);
    }
  });
}

function updateGrid(x, y) {
  const gameBoard = document.getElementById('game-board');
  const cells = gameBoard.children;
  const cell = cells[x * cols + y];
  cell.style.backgroundColor = 'red';
}

// Start maze generation from the top-left corner
generateMaze(0, 0);

// Render the generated maze
renderMaze();

ScapeFromMaze();