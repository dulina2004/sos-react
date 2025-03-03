# SOS Game

A simple implementation of the classic SOS game with a dark theme, built with React and Vite.

## Game Rules

1. The game is played on a 3x3 grid.
2. Players take turns placing either an "S" or an "O" in an empty cell.
3. The goal is to complete the sequence "SOS" horizontally, vertically, or diagonally.
4. When a player completes an SOS, they score a point and get another turn.
5. The game ends when the grid is full.
6. The player with the most points wins.

## Features

-   Dark theme UI
-   Score tracking for both players
-   Turn indicator
-   Game reset and new game options
-   Responsive design

## How to Play

1. Click on any empty cell to place the current letter (S or O).
2. The current letter and active player are displayed above the game board.
3. Complete SOS sequences to score points.
4. The game will automatically detect when the board is full and declare a winner.

## Development

This project was built with:

-   React 19
-   Vite 6
-   CSS for styling

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Enjoy the game!
