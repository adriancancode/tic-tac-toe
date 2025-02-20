const board = document.getElementById("game-board");
const status = document.getElementById("status");
let cells = [];
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
        
function createBoard() {
    board.innerHTML = "";
    gameBoard.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.addEventListener("click", handleMove);
        board.appendChild(cell);
        cells.push(cell);
    });
}
function handleMove(event) {
    const index = event.target.dataset.index;
    if (gameBoard[index] === "") {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.classList.add("taken");
        if (checkWinner()) {
            status.textContent = `Player ${currentPlayer} wins!`;
            endGame();
            return;
        }
        if (!gameBoard.includes("")) {
            status.textContent = "It's a draw!";
            endGame();
            return;
        }
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => 
        pattern.every(index => gameBoard[index] === currentPlayer)
    );
}

function endGame() {
    cells.forEach(cell => cell.removeEventListener("click", handleMove));
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    status.textContent = "Player X's turn";
    createBoard();
}

createBoard();