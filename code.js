let boardItem = { 
        11: "", 12: "", 13: "",
        21: "", 22: "", 23: "",
        31: "", 32: "", 33: "",
    }   


const gameInteraction = (function () { 
    let currentChar = "X";
    

    const gameBoard = document.querySelector(".game-board");
    
    const switcher = () => { 
        if (currentChar == "X") { 
            currentChar = "O";
        } else { 
            currentChar = "X";
        }
    }

    gameBoard.addEventListener("click", (e) => { 
        if (e.target.textContent == "") { 
            e.target.textContent = currentChar;
            switcher(currentChar);
        }

        boardItem[e.target.id] = currentChar;
        // call the winner handler for checking :) 

        if (someoneWon()) {
            // declare a winner with a popup dialog with "Play again" button and "restart button"
            
            

        }
    })


})()


const someoneWon = (function () { 

    if (boardItem[11] == boardItem[12] == boardItem[13] ||
        boardItem[21] == boardItem[22] == boardItem[23] ||
        boardItem[31] == boardItem[32] == boardItem[33] ||
        boardItem[11] == boardItem[21] == boardItem[31] ||
        boardItem[12] == boardItem[22] == boardItem[32] ||
        boardItem[13] == boardItem[23] == boardItem[33] ||
        boardItem[11] == boardItem[22] == boardItem[33] ||
        boardItem[13] == boardItem[22] == boardItem[31]) {
            
            return true;
    }
    return false;

})



const playerManager = (function() { 
    let playerOneScore = 0;
    let playerTwoScore = 0;

    function addScore(player) { 
        if (player == "X") { 
            playerOneScore++;
        } else { 
            playerTwoScore++;
        }
    }

    const resetScore = () => { 
        playerOneScore = 0;
        playerTwoScore = 0;
    }


    return { 
        addScore,
        getPlayerOneScore: () => playerOneScore,
        getPlayerTwoScore: () => playerTwoScore,
        resetScore,
    }

    
})() 



const windowLogic = (function () { 

})



// player names must have a significance (add on top whose turn it is (with some animation))

// button to restart game 

// show display at the end of game 