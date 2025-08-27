let boardItem = { 
        11: "", 12: "", 13: "",
        21: "", 22: "", 23: "",
        31: "", 32: "", 33: "",
    }   

const startInteraction = (function() { 
    let playerOneName = "";
    let playerTwoName = "";

    document.querySelector(".starter-form").addEventListener("submit", (e) => { 
        e.preventDefault();

        playerOneName = document.querySelector("#player-1-name").value;
        playerTwoName = document.querySelector("#player-2-name").value;

        if (playerOneName === "" || playerTwoName === "") { 
            return;
        }
        
        document.querySelector(".starter-section").style.display = "none";
        document.querySelector(".game-section").style.display = "block";
    });

    return { 
        getPlayerOneName: () => playerOneName,
        getPlayerTwoName: () => playerTwoName,
    }
})();


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
            // first find who won by finding the currentChar and the player associated 
            // declare a winner with a popup dialog with "Play again" button and "restart button"
            switcher(currentChar);

            winnerHandler(currentChar);
        }
    })


})()


const someoneWon = function () { 

    const b = boardItem; 

    function isWinningLine(a, b, c) {
        return (a === b && b === c && (a === "X" || a === "O"));
    }

    if (
        isWinningLine(b[11], b[12], b[13]) ||
        isWinningLine(b[21], b[22], b[23]) ||
        isWinningLine(b[31], b[32], b[33]) ||
        isWinningLine(b[11], b[21], b[31]) ||
        isWinningLine(b[12], b[22], b[32]) ||
        isWinningLine(b[13], b[23], b[33]) ||
        isWinningLine(b[11], b[22], b[33]) ||
        isWinningLine(b[13], b[22], b[31])
    ) {
        return true;
    }

    return false;

};

function winnerHandler() { 
    
}





// player names must have a significance (add on top whose turn it is (with some animation))

// button to restart game 

// show display at the end of game 