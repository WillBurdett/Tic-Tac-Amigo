
let playerX;
let playerO;

const setNames = () =>{
    let currentName = "Player X's";
    playerX = prompt("Please enter  " + currentName + " name");
    currentName = "Player 0's";
    playerO = prompt("Please enter  " + currentName + " name");
}

const start = function(){

    setNames();

   let display = document.querySelector(".display")
   display.innerHTML = ' <span class = "playerX">' + playerX + '\'s' + '</span> turn!'

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
        }

        if (!board.includes("")){
            isGameOn = false;
            announceResult("tie");
        }
   }

   const announceResult = function(result){
    switch (result){
        case "X":
            announcement.innerHTML('<span class="playerX">' + playerX + '</span> won!')
        break;
        case "O":
            announcement.innerHTML('<span class="playerO">' + playerO + '</span> won!')
        break;
        case "tie":
            announcement.innerHTML('Tie!')
        break;
    }
    announcement.classList.remove("hide")
   }

   const validateMove = function(index){
        if (board[index] === ""){
            return true
        }
        return false;
   }

}

start();

console.log(playerX)
console.log(playerO)
