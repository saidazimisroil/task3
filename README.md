# Generalized Rock-Paper-Scissors Game

This is an implementation of a generalized Rock-Paper-Scissors game that supports an arbitrary odd number of moves. The game uses cryptographic functions to ensure fairness and transparency. It generates a secure HMAC (Hash-based Message Authentication Code) to verify that the moves have not been tampered with.

## Features

- **Dynamic Move Support**: The game can be initialized with any odd number of unique, non-repeating moves.
- **Security**: Utilizes cryptographic HMAC to ensure that the computer's move is secured and verifiable.
- **Interactive Console Game**: Play directly from the console with easy-to-use commands.

## Requirements

- Node.js
- npm (Node Package Manager)

## Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/saidazimisroil/task3.git
cd task3
```

Install the necessary packages:

```bash
npm install
```

## Usage

Run the game by providing an odd number of moves as command-line arguments:

```bash
node index.js Rock Paper Scissors Lizard Spock
```
