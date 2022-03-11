
let playerX;
let playerO;

let playerXWins = 0;
let playerOWins = 0;

let vsComputer = false;

const setNamesAndMode = () =>{
    const gameMode = prompt("One or Two Player? (enter 1 or 2)");
    if (gameMode === "1"){
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
        score.innerHTML = '<span class = playerX>' + playerX+ '</span>: ' + playerXWins + '   ' + '<span class = playerO>'+ playerO + "</span>: " + playerOWins;
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

        if (!board.includes("") && !roundWon){
            isGameOn = false;
            announceResult("tie");
        }
   }

   const announceResult = function(result){
    switch (result){
        case "X":
            announcement.innerHTML = '<span class="playerX">' + playerX + '</span> won!';
            playerXWins++
            if (vsComputer === true){
                var audio = new Audio('amigo-quit-audio.mp3')
                audio.play();
            }
            updateScore();
        break;
        case "O":
            announcement.innerHTML = '<span class="playerO">' + playerO + '</span> won!';
            playerOWins++
            if (vsComputer === true){
                var audio = new Audio('amigo-smash-the-like-button.mp3')
                audio.play();
            }
            updateScore();
        break;
        case "tie":
            announcement.innerText = 'Tie!';
    }
    announcement.classList.remove("hide")
    // console.log(playerX+": " + playerXWins + "   " + playerO + ": " + playerOWins);
   }

    const validateMove = function(index){
        if (board[index] == ""){
            return true;
        } else if (board[index] !== "") {
            console.log("not available") 
            return false;
        }
    }

    // const randomNum = () => Math.floor(Math.random() * 9);
    // returns an index of a space on our board that's free ("")
    // will prioritise the middle square, if not available, randomly picks an available one
    const computerFindMove = function(){
        if (board[4] === ""){
            return 4;
        }
        let possibleMoves = []
        for (let i=0; i< board.length; i++){
            if (board[i] === ""){
                possibleMoves.push(i)
            }
        }
        return possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
    }

   const changePlayer = function(){
       
       whoseTurn.classList.remove("player" + currentPlayer)

       currentPlayer = currentPlayer === "X" ? "O" : "X";

       let currentPlayerName = currentPlayer === "X" ? playerX : playerO;

       whoseTurn.innerText = currentPlayerName + "'s";
       
       whoseTurn.classList.add("player" + currentPlayer); 

       if (vsComputer && currentPlayer === "O"){

            let move = computerFindMove(); 

            setTimeout(function(){
            userAction(tiles[move], move);
            }, 1000);
       }
   }

   const updateBoard = function(index){
       board[index] = currentPlayer;
   }

   const userAction = function(tile, index){

        if (validateMove(index) && isGameOn && tile.innerText === ""){
            if (vsComputer && currentPlayer === "X"){
                const iphoneDing = new Audio('iphone-ding-v3.mp3')
                iphoneDing.volume = 0.2;
                iphoneDing.play();
            }
            tile.innerText = currentPlayer;
            tile.classList.add("player" + currentPlayer);
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

