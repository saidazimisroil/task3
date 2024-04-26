const crypto = require("crypto");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Helper function to generate a random key
function generateKey() {
  return crypto.randomBytes(32); // 256 bits
}

// Helper function to calculate HMAC
function generateHMAC(key, message) {
  const hmac = crypto.createHmac("sha256", key);
  hmac.update(message);
  return hmac.digest("hex");
}

// Determine the winner based on game rules
function determineWinner(computerMove, userMove, moves) {
  if (computerMove === userMove) {
    return "It's a tie!";
  }
  const indexComputer = moves.indexOf(computerMove);
  const indexUser = moves.indexOf(userMove);
  const n = moves.length;
  const winRange = Math.floor(n / 2);

  if ((indexUser - indexComputer + n) % n <= winRange) {
    return "You win!";
  }
  return "Computer wins!";
}

// Main game logic
function main() {
  const moves = process.argv.slice(2);
  if (moves.length < 3 || moves.length % 2 === 0 || new Set(moves).size !== moves.length) {
    console.error("Error: Please provide an odd number (≥ 3) of unique, non-repeating moves.");
    process.exit(1);
  }

  const key = generateKey();
  const computerMove = moves[Math.floor(Math.random() * moves.length)];
  const hmac = generateHMAC(key, computerMove);

  console.log(`HMAC: ${hmac}`);
  console.log("Available moves:");
  moves.forEach((move, index) => console.log(`${index + 1} - ${move}`));
  console.log("0 - exit");
  console.log("? - help");

  rl.question("Enter your move: ", (input) => {
    if (input === "0") {
      console.log("Game exited.");
      rl.close();
      return;
    }

    if (input === "?") {
      displayHelpTable(moves);
      rl.close();
      return;
    }

    const userMove = moves[parseInt(input) - 1];
    if (!userMove) {
      console.error("Invalid move. Please try again.");
      rl.close();
      return;
    }

    console.log(`Your move: ${userMove}`);
    console.log(`Computer move: ${computerMove}`);
    console.log(determineWinner(computerMove, userMove, moves));
    console.log(`HMAC key: ${key.toString("hex")}`);
    rl.close();
  });
}

// Display the help table
function displayHelpTable(moves) {
  let header = "v PC/User > | " + moves.join(" | ") + " |";
  console.log(header);
  console.log("-".repeat(header.length));
  moves.forEach((move, i) => {
    let row = moves.map((_, j) => determineWinner(move, moves[j], moves)).join(" | ");
    console.log(`${move} | ${row}`);
  });
}

main();
