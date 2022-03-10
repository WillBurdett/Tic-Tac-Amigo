
let playerX;
let playerO;

let playerXWins = 0;
let playerOWins = 0;

let vsComputer = false;

const setNamesAndMode = () =>{
    const gameMode = prompt("Please enter PVP or PC");
    if (gameMode === "PC"){
        vsComputer = true;
        // start game against computer function
        playerX = prompt("Please enter your name");
        if (playerX === null){
            playerX = "Player 1";
        }
        playerO = "Nelson"
    } else {
        let currentName = "Player X's";
        playerX = prompt("Please enter  " + currentName + " name");
        currentName = "Player O's";
        playerO = prompt("Please enter  " + currentName + " name")
        if (playerX === null){
            playerX = "Player 1";
        }
        if (playerO === null){
            playerO = "Player 2";
        }
    }
}

const start = function(){

    setNamesAndMode();

    const score = document.querySelector(".current-score")

    const updateScore = function(){
        score.innerText = playerX+ ": " + playerXWins + "   " + playerO + ": " + playerOWins;
    }
    let display = document.querySelector(".display");
   display.innerHTML = '<span class = "display-player playerX">' + playerX + '\'s' + '</span> turn!';
    updateScore();

   

   const tiles = Array.from(document.querySelectorAll(".tile"));

   const whoseTurn = document.querySelector(".display-player");

   const restart = document.querySelector("#restart");

   const announcement = document.querySelector(".announcement");

   let board = ["", "", "", "", "", "", "", "", ""];

    // [0,1,2]
    // [3,4,5] 
    // [6,7,8]

   let currentPlayer = 'X';

   let isGameOn = true;

   const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [6,4,2]
   ];

   const checkForWinner = function(){
       let roundWon = false;
       for (let i = 0; i < winningConditions.length; i++) {
           const winningCondition = winningConditions[i];
           const a = board[winningCondition[0]]
           const b = board[winningCondition[1]]
           const c = board[winningCondition[2]]

            if (a === "" || b === "" || c === ""){
                continue;
            }

            if (a === b && b === c){
                roundWon = true;
                break;
            }  
        }
        if (roundWon){
            isGameOn = false;
            announceResult(currentPlayer);
            console.log("winner")
        }

        if (!board.includes("")){
            isGameOn = false;
            announceResult("tie");
        }
   }

   const announceResult = function(result){
    switch (result){
        case "X":
            announcement.innerHTML = '<span class="playerX">' + playerX + '</span> won!';
            playerXWins++
            updateScore();
        break;
        case "O":
            announcement.innerHTML = '<span class="playerO">' + playerO + '</span> won!';
            playerOWins++
            updateScore();
        break;
        case "tie":
            announcement.innerText = 'Tie!';
    }
    announcement.classList.remove("hide")
    // console.log(playerX+": " + playerXWins + "   " + playerO + ": " + playerOWins);
   }

   const validateMove = function(index){
        if (board[index] === ""){
            return true
        }
        return false;
   }

   const changePlayer = function(){
       // removes class attributes of current player so design is distinct for both players
       whoseTurn.classList.remove("player" + currentPlayer)

       currentPlayer = currentPlayer === "X" ? "O" : "X";

       let currentPlayerName = currentPlayer === "X" ? playerX : playerO;

       whoseTurn.innerText = currentPlayerName + "'s";
       
       whoseTurn.classList.add("player" + currentPlayer); 
   }

   const updateBoard = function(index){
       board[index] = currentPlayer;
   }

   const userAction = function(tile, index){

    if (validateMove(index) && isGameOn && tile.innerText === ""){
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        checkForWinner();
        changePlayer();
    }
   }
   tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index))
    });

    const resetBoard = function(){
        board = ["", "", "", "", "", "", "", "", ""];
        isGameOn = true;
        announcement.classList.add("hide");
        if (currentPlayer === "O"){
            changePlayer();
        }
        tiles.forEach(tile => {
            tile.innerText = "";
            tile.classList.remove("playerX");
            tile.classList.remove("playerO");
        })
    }

    restart.addEventListener("click", () => resetBoard());
    

}

start();

console.log(playerX)
console.log(playerO)
