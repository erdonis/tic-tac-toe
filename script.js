// Made this Tic-Tac-Toe game with 2 options: ai using the minimax algorithm 
// and 2 players. I couldn't get the minimax algorithm to work on the original 
// board array that creates and controls the grid so I created another board 
// which imitates the original gameboard on every move and I generated the best
// move from that one



//create the original gameboard grid
const gameBoard = (() => {
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]
    let container = document.querySelector("#container");

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            board[i][j] = document.createElement("div");
            board[i][j].classList.add("gameSpace");
            container.appendChild(board[i][j])
        }
    }

    return board;
})();

//player factory function
const player = (name, type, play) => {
    return {name, type, play}
}


//the main module that controls everything on the page
const displayController = (() => {
    let container = document.querySelector("#container");
    let playBtn = document.querySelector("#playBtn");
    let userInput = document.querySelector("#userInput");
    let body = document.querySelector("body");
    

    //the first player object with the play function that plays X when called
    let firstPlayer = player();
    let move = false; //boolean to determine which player""s turn it is
    firstPlayer.play = function(){
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
            gameBoard[i][j].addEventListener("click", addMove);

            function addMove(){
                if (!move){
                    if(!gameBoard[i][j].textContent){
                        gameBoard[i][j].textContent = "X";
                        displayBoard();
                        move = true;
                    }
                }else{
                    secondPlayer.play();
                }
               displayName(secondPlayer)
            }
        }}
    } 

    //the second player object with the play function that plays O when called
    let secondPlayer = player();
    secondPlayer.play = function(){
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
            gameBoard[i][j].addEventListener("click", addMove);

            function addMove(){
                if (move){
                    if(!gameBoard[i][j].textContent){
                        gameBoard[i][j].textContent = "O";
                        displayBoard();
                        move = false;
                        if (firstPlayer.type === "computer"){
                            computerPlay();
                        }
                    }
                }else{
                    firstPlayer.play();
                }
                displayName(firstPlayer)
            }
        }}
    } 

    //function that gets the board ready for the first player when 
    //2 players option is selected
    let play = (function(){
        playBtn.addEventListener("click", () => {
            let form = document.querySelector("#form");

            firstPlayerInput = document.querySelector("#firstPlayer");
            secondPlayerInput = document.querySelector("#secondPlayer");

            firstPlayer.name = firstPlayerInput.value;
            secondPlayer.name = secondPlayerInput.value;

            firstPlayerInput.value = "";
            secondPlayerInput.value = "";
            userInput.textContent = "";

            firstPlayer.play();
            container.style.display = "grid";
            displayName(firstPlayer)
        });
    })();

    //function that get the new board to imitate the original gameboard
    function displayBoard(){
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(gameBoard[i][j].textContent === "X" || gameBoard[i][j].textContent === "O"){
                    board[i][j] = gameBoard[i][j].textContent;
                }
            }
        }
    }

    


    //function that checks if there's a winner and displays it if there is one
    let setWinner = function(){
      let winnerDisplay = document.createElement("div");
      body.appendChild(winnerDisplay);
      winnerDisplay.classList.add("winnerDisplay")
      let playAgainBtn = document.createElement("button")

      let roundWinner = checkWinner();

      if (roundWinner == "X"){
        container.style.display = "none"
        winnerDisplay.textContent = `${firstPlayer.name} wins`
        winnerDisplay.appendChild(playAgainBtn)
        playersTurn.style.display = "none";
      }
      if (roundWinner == "O"){
        container.style.display = "none"
        winnerDisplay.textContent = `${secondPlayer.name} wins`
        winnerDisplay.appendChild(playAgainBtn)
        playersTurn.style.display = "none";
      }
      if (roundWinner == "tie"){
        container.style.display = "none"
        winnerDisplay.textContent = "It's a TIE"
        winnerDisplay.appendChild(playAgainBtn)
        playersTurn.style.display = "none";
      }


      playAgainBtn.classList.add("playAgainBtn")
      playAgainBtn.textContent = "PLAY AGAIN"
  
      playAgainBtn.addEventListener("click", () => {
        location.reload(); //reloads the page if the user wants to play again
      })
       
    }

    //function that checks for winner on each click on the gameboard
    function checkForWinner(){
      for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
        gameBoard[i][j].addEventListener("click", () => {
          displayBoard();
          setWinner();
        });
    }}}

    //function that displays whose turn it is on each turn when 2 players mode is selected
    let playersTurn = document.createElement("p");
    let content = document.querySelector("#content")
    content.appendChild(playersTurn);


    function displayName(player){
      if(firstPlayer.type !== "computer"){
      if (firstPlayer.name && secondPlayer.name){
          playersTurn.textContent = `${player.name}'s turn`;
        }else{
          if (player === firstPlayer){
            player.name = "X"
          }else if(player === secondPlayer){
            player.name = "O"
          }
          playersTurn.textContent = `${player.name}'s turn`;
        }
      }
    }
    

    //module that gets the choice in which player mode the user wants to play
    const userChoice = (() => {
          let userChoiceDiv = document.querySelector("#userChoice");
          
          let onePlayer = document.querySelector("#onePlayer");
          let twoPlayers = document.querySelector("#twoPlayers");
   
          onePlayer.addEventListener("click", () => {
          firstPlayer.name = "X";
          secondPlayer.name = "O";

          let randomNum = [Math.round(Math.random() * 2), Math.round(Math.random() * 2)];
          gameBoard[randomNum[0]][randomNum[1]].textContent = "X";
          board[randomNum[0]][randomNum[1]] = "X";

          displayBoard();
          move = true;
          secondPlayer.play();
          firstPlayer.type = "computer";
          
          container.style.display = "grid";
          userChoiceDiv.style.display = "none";

          checkForWinner();
        })

         twoPlayers.addEventListener("click", () => {
         userInput.style.display = "flex";
         userChoiceDiv.style.display = "none";
         firstPlayer.play();
         secondPlayer.play();
         checkForWinner();
           })   

   })();

   //the new board which is used to determine the best and 
   //which imitates the original board on every move
   let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]
  
  //function that checks for a winner on the new board
  function evaluate(a, b, c) {
    return a == b && b == c && a != "";
  }

  function checkWinner() {
    
    let winner = null;

    // horizontal
    for (let i = 0; i < 3; i++) {
      if (evaluate(board[i][0], board[i][1], board[i][2])) {
        winner = board[i][0];
      }
    }
  
    // Vertical
    for (let i = 0; i < 3; i++) {
      if (evaluate(board[0][i], board[1][i], board[2][i])) {
        winner = board[0][i];
      }
    }
  
    // Diagonal
    if (evaluate(board[0][0], board[1][1], board[2][2])) {
      winner = board[0][0];
    }
    if (evaluate(board[2][0], board[1][1], board[0][2])) {
      winner = board[2][0];
    }
  
    //the available moves
    let openSpots = 0;
  
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === "") {
            openSpots++;
          }
        }
      }
    if (winner == null && openSpots == 0) {
      return "tie";
    } else {
      return winner;
    }
  }

   function computerPlay(){
    
    //function that calls the minimax function recursevly and 
    //gets the best move from that
    function getBestMove() {
      let bestScore = -Infinity;
      let move;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == "") {
            board[i][j] = "X";
            let score = minimax(board, 1, false);
            board[i][j] = "";
            if (score > bestScore) {
              bestScore = score;
              move = { i, j };
            }
          }
        }
      }
      return move;
    }
    
    //play the game for both players until one of them wins or its a tie
    //mark the case where X wins with the highest value
    //undo each move recursevly and return the highest value
    function minimax(board, depth, isMaximizing) {
      let result = checkWinner();

      if (result == "X"){
        return 10;
      }
      if (result == "O"){
        return -10;
      }
      if (result == "tie"){
        return 0;
      }
    
      //if its X player's turn, in this case the computer's turn
      if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[i][j] == "") {
              board[i][j] = "X";
              let score = minimax(board, depth + 1, false);
              board[i][j] = "";
              bestScore = Math.max(score, bestScore) - depth; //get the highest possible value
            }
          }
        }
        return bestScore;
      } else { //if it's O's turn
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[i][j] == "") {
              board[i][j] = "O";
              let score = minimax(board, depth + 1, true);
              board[i][j] = "";
              bestScore = Math.min(score, bestScore) + depth; //assume the opponent chooses the lowest possible value
            }
          }
        }
        return bestScore;
      }
    }
     
    displayBoard();
    let bestMove = getBestMove();
      
    gameBoard[bestMove.i][bestMove.j].textContent = "X" 
    move = true;
  }


    return  {
        play,
        userChoice
    };
})()