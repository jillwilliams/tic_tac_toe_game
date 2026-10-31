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
const playAgainButtonEl = document.getElementById("play-again-button")

const choices = ["images/pumpkin_img.png", "images/ghost_img.png"];

const squares = [squareOneEl, squareTwoEl, squareThreeEl, squareFourEl, squareFiveEl, squareSixEl, squareSevenEl, squareEightEl, squareNineEl];


const handleSquareClick = (e) => {
    const squareElement = e.target;
    
    if (squareElement.innerHTML !== "") return; 
    
    const play = choices[0];
    squareElement.innerHTML = `<img src="${play}" style="width: 150px; height: 150px;" />`;
    
    computerPlay();
};

const computerPlay = () => {
    const emptySquares = Array.from(squares).filter(square => square.innerHTML === "");
    
    if (emptySquares.length === 0) return; 
    
    const randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    
    const computerChoice = choices[1];
    randomSquare.innerHTML = `<img src="${computerChoice}" style="width: 150px; height: 150px;" />`;
    
    const WINNING_COMBINATIONS = [[0,1,2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    checkWin();
};


const checkWin = () => {
    const WINNING_COMBINATIONS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]            
    ];

    const squaresArray = Array.from(squares);

    const winnerFound = WINNING_COMBINATIONS.some(combination => {
        const [a, b, c] = combination;
        const valA = squaresArray[a].innerHTML.trim();
        const valB = squaresArray[b].innerHTML.trim();
        const valC = squaresArray[c].innerHTML.trim();

        if (valA !== "" && valA === valB && valA === valC) {
        console.log("We have a winner");
        winReturnEl.innerHTML = "We have a winner!";

        squares.forEach(square => square.removeEventListener("click", handleSquareClick));

        return true;
        }
        return false;
    });

    if (winnerFound) return true;
    
    
    const isDraw = squaresArray.every(square => square.innerHTML.trim() !== "");
    if (isDraw) {
        console.log("We have a draw");
        winReturnEl.innerHTML = "We have a draw!";
        return true;
    };
    return false;
}


const playAgain = () => {
    squareOneEl.innerHTML = "";
    squareTwoEl.innerHTML = "";
    squareThreeEl.innerHTML = "";
    squareFourEl.innerHTML = "";
    squareFiveEl.innerHTML = "";
    squareSixEl.innerHTML = "";
    squareSevenEl.innerHTML = "";
    squareEightEl.innerHTML = "";
    squareNineEl.innerHTML = "";
    winReturnEl.innerHTML = "";
    squares.forEach(square => square.addEventListener("click", handleSquareClick))
}

squares.forEach(square => {
    square.addEventListener("click", handleSquareClick);
});


playAgainButtonEl.addEventListener("click", playAgain);