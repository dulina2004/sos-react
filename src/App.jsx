import { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [board, setBoard] = useState(Array(9).fill(""));
    const [currentPlayer, setCurrentPlayer] = useState("S");
    const [scores, setScores] = useState({ player1: 0, player2: 0 });
    const [playerTurn, setPlayerTurn] = useState(1);
    const [gameOver, setGameOver] = useState(false);

    // Check for SOS combinations
    const checkSOS = (newBoard, index) => {
        const rows = 3;
        const cols = 3;
        const row = Math.floor(index / cols);
        const col = index % cols;
        let sosFound = false;

        // Check horizontal SOS
        if (col >= 1 && col <= cols - 2) {
            if (
                newBoard[row * cols + col - 1] === "S" &&
                newBoard[row * cols + col] === "O" &&
                newBoard[row * cols + col + 1] === "S"
            ) {
                sosFound = true;
            }
        }

        // Check vertical SOS
        if (row >= 1 && row <= rows - 2) {
            if (
                newBoard[(row - 1) * cols + col] === "S" &&
                newBoard[row * cols + col] === "O" &&
                newBoard[(row + 1) * cols + col] === "S"
            ) {
                sosFound = true;
            }
        }

        // Check diagonal SOS (top-left to bottom-right)
        if (row >= 1 && row <= rows - 2 && col >= 1 && col <= cols - 2) {
            if (
                newBoard[(row - 1) * cols + col - 1] === "S" &&
                newBoard[row * cols + col] === "O" &&
                newBoard[(row + 1) * cols + col + 1] === "S"
            ) {
                sosFound = true;
            }
        }

        // Check diagonal SOS (top-right to bottom-left)
        if (row >= 1 && row <= rows - 2 && col >= 1 && col <= cols - 2) {
            if (
                newBoard[(row - 1) * cols + col + 1] === "S" &&
                newBoard[row * cols + col] === "O" &&
                newBoard[(row + 1) * cols + col - 1] === "S"
            ) {
                sosFound = true;
            }
        }

        // Check if S is in the middle
        if (newBoard[index] === "S") {
            // Check horizontal OSO
            if (col >= 1 && col <= cols - 2) {
                if (
                    newBoard[row * cols + col - 1] === "O" &&
                    newBoard[row * cols + col + 1] === "O"
                ) {
                    sosFound = true;
                }
            }

            // Check vertical OSO
            if (row >= 1 && row <= rows - 2) {
                if (
                    newBoard[(row - 1) * cols + col] === "O" &&
                    newBoard[(row + 1) * cols + col] === "O"
                ) {
                    sosFound = true;
                }
            }
        }

        return sosFound;
    };

    const handleClick = (index) => {
        if (board[index] !== "" || gameOver) return;

        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);

        const sosFound = checkSOS(newBoard, index);

        if (sosFound) {
            // Update score for current player
            const newScores = { ...scores };
            if (playerTurn === 1) {
                newScores.player1 += 1;
            } else {
                newScores.player2 += 1;
            }
            setScores(newScores);

            // Check if board is full
            if (!newBoard.includes("")) {
                setGameOver(true);
            }
        } else {
            // Switch player turn
            setPlayerTurn(playerTurn === 1 ? 2 : 1);
        }

        // Toggle between S and O
        setCurrentPlayer(currentPlayer === "S" ? "O" : "S");
    };

    const resetGame = () => {
        setBoard(Array(9).fill(""));
        setCurrentPlayer("S");
        setPlayerTurn(1);
        setGameOver(false);
    };

    const newGame = () => {
        resetGame();
        setScores({ player1: 0, player2: 0 });
    };

    useEffect(() => {
        if (!board.includes("") && !gameOver) {
            setGameOver(true);
        }
    }, [board, gameOver]);

    return (
        <div className="sos-game">
            <h1>SOS Game</h1>

            <div className="game-info">
                <div className="player-info">
                    <div
                        className={`player ${playerTurn === 1 ? "active" : ""}`}
                    >
                        Player 1: {scores.player1}
                    </div>
                    <div
                        className={`player ${playerTurn === 2 ? "active" : ""}`}
                    >
                        Player 2: {scores.player2}
                    </div>
                </div>

                <div className="current-letter">
                    Current Letter:{" "}
                    <span className="letter">{currentPlayer}</span>
                </div>
            </div>

            <div className="board">
                {board.map((cell, index) => (
                    <div
                        key={index}
                        className="cell"
                        onClick={() => handleClick(index)}
                    >
                        {cell}
                    </div>
                ))}
            </div>

            {gameOver && (
                <div className="game-over">
                    <h2>
                        {scores.player1 === scores.player2
                            ? "It's a tie!"
                            : `Player ${
                                  scores.player1 > scores.player2 ? "1" : "2"
                              } wins!`}
                    </h2>
                    <div className="final-score">
                        Player 1: {scores.player1} | Player 2: {scores.player2}
                    </div>
                </div>
            )}

            <div className="buttons">
                <button onClick={resetGame}>Reset Game</button>
                <button onClick={newGame}>New Game</button>
            </div>
        </div>
    );
}

export default App;
