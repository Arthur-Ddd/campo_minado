const boardSize = 10; // Tamanho do campo
const minesCount = 10; // Número de minas

// Função para gerar o campo
function generateBoard() {
  const board = [];
  for (let i = 0; i < boardSize; i++) {
    const row = [];
    for (let j = 0; j < boardSize; j++) {
      row.push({ hasMine: false, revealed: false, neighboringMines: 0 });
    }
    board.push(row);
  }
  placeMines(board);
  return board;
}

// Função para colocar as minas
function placeMines(board) {
  let minesPlaced = 0;
  while (minesPlaced < minesCount) {
    const row = Math.floor(Math.random() * boardSize);
    const col = Math.floor(Math.random() * boardSize);
    if (!board[row][col].hasMine) {
      board[row][col].hasMine = true;
      minesPlaced++;
    }
  }
}

// Renderiza o tabuleiro no HTML
function renderBoard(board) {
  const boardElement = document.getElementById('game-board');
  boardElement.innerHTML = '';
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', () => handleCellClick(board, i, j));
      boardElement.appendChild(cell);
    }
  }
}

// Lógica do clique na célula
function handleCellClick(board, row, col) {
  if (board[row][col].hasMine) {
    alert("Game Over!");
    // Recriar o jogo
    const newBoard = generateBoard();
    renderBoard(newBoard);
  } else {
    alert("Safe!");
  }
}

// Inicializa o jogo
const board = generateBoard();
renderBoard(board);
