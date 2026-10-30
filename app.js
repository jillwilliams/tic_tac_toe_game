const squareOneEl = document.getElementById("cell1");
const squareTwoEl = document.getElementById("cell2");
const squareThreeEl = document.getElementById("cell3");
const squareFourEl = document.getElementById("cell4");
const squareFiveEl = document.getElementById("cell5");
const squareSixEl = document.getElementById("cell6");
const squareSevenEl = document.getElementById("cell7");
const squareEightEl = document.getElementById("cell8");
const squareNineEl = document.getElementById("cell9");
const tableEl = document.getElementById("table");
const winReturnEl = document.getElementById("return-win");

const choices = ["images/pumpkin_img.png", "images/ghost_img.png"];

const squares = [squareOneEl, squareTwoEl, squareThreeEl, squareFourEl, squareFiveEl, squareSixEl, squareSevenEl, squareEightEl, squareNineEl];



const handleSquareClick = (e) => {
    const squareElement = e.target;
    
    // 1. Guard clause: Ignore clicks on already filled squares
    if (squareElement.innerHTML !== "") return; 
    
    // 2. Human Player's turn
    const play = choices[0];
    squareElement.innerHTML = `<img src="${play}" style="width: 150px; height: 150px;" />`;
    
    // 3. Trigger computer's turn right after
    computerPlay();
};

const computerPlay = () => {
  // 1. Filter all squares to find which ones are still empty
    const emptySquares = Array.from(squares).filter(square => square.innerHTML === "");
    
    // Guard clause: If no empty squares are left, game over (draw)
    if (emptySquares.length === 0) return; 
    
    // 2. Simple AI: Pick a random empty square
    const randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    
    // 3. Computer Player's turn
    const computerChoice = choices[1];
    randomSquare.innerHTML = `<img src="${computerChoice}" style="width: 150px; height: 150px;" />`;
    
  // (Optional) You can check for a win condition here!
    const WINNING_COMBINATIONS = [[0,1,2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    // const WINNING_COMBINATIONS = [[squareOneEl,squareTwoEl, squareThreeEl], [squareFourEl, squareFiveEl, squareSixEl], [squareSevenEl, squareEightEl, squareNineEl], [squareOneEl, squareFourEl, squareSevenEl], [squareTwoEl, squareFiveEl, squareEightEl], [squareThreeEl, squareSixEl, squareNineEl], [squareOneEl, squareFiveEl,squareNineEl], [squareThreeEl, squareFiveEl, squareSevenEl]];
    checkWin();
};


const checkWin = () => {
    const WINNING_COMBINATIONS = [[0,1,2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    const squaresArray = Array.from(squares);

    const winnerFound = WINNING_COMBINATIONS.some(combination => {
        const [a, b, c] = combination;

        
        const valA = squaresArray[a].innerHTML.trim();
        const valB = squaresArray[b].innerHTML.trim();
        const valC = squaresArray[c].innerHTML.trim();

        if (valA !== "" && valA === valB && valA === valC) {
            console.log("We have a winner");
            winReturnEl.innerHTML = "We have a winner!";
            return true;
        }
        return false;
    });

    if (winnerFound) return true;

    

  // 2. Check for a draw only if no winner was found
    const isDraw = squaresArray.every(square => square.innerHTML.trim() !== "");
        if (isDraw) {
        console.log("We have a draw");
        winReturnEl.innerHTML = "We have a draw!";
        return true;
        }

    return false;
};





// Initialize event listeners once at the start of your game setup
squares.forEach(square => {
    square.addEventListener("click", handleSquareClick);
});