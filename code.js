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
        const playerOneInput = document.querySelector("#player-1-name");
        const playerTwoInput = document.querySelector("#player-2-name");
        playerOneName = playerOneInput.value;
        playerTwoName = playerTwoInput.value;

        if (playerOneName === "" || playerTwoName === "") { 
            return;
        }

        playerOneInput.value = "";
        playerTwoInput.value = "";
        
        document.querySelector(".starter-section").style.display = "none";
        document.querySelector(".game-section").style.display = "block";

        document.querySelector(".player-name-one-display").textContent = "Player " + playerOneName + " (X)";
        document.querySelector(".player-name-two-display").textContent = "Player " + playerTwoName + " (O)";
        document.querySelector(".player-turn-display").textContent = playerOneName + "'s Turn!";
    });

    return { 
        getPlayerOneName: () => playerOneName,
        getPlayerTwoName: () => playerTwoName,

        setPlayerOneName: (name) => playerOneName = name,
        setPlayerTwoName: (name) => playerTwoName = name,
    }
})();

const gameInteraction = (function () { 
    let currentChar = "X";
    const gameBoard = document.querySelector(".game-board");
    
    const switcher = () => { 
        if (currentChar == "X") { 
            currentChar = "O";
            document.querySelector(".player-turn-display").textContent = startInteraction.getPlayerTwoName() + "'s turn";
        } else { 
            currentChar = "X";
            document.querySelector(".player-turn-display").textContent = startInteraction.getPlayerOneName() + "'s turn";
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
            
        } else if (drawCheck()) { 
            drawHandler();
        }
    })
})()

const drawCheck = function() {
    for (let key of Object.keys(boardItem)) {
        if (boardItem[key] === "") {
            return false; // exit the whole function
        }
    }
    return true;
};

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

const startRestartBtnHandlers = (function() { 
    function resetGameBoardObject() { 
        Object.keys(boardItem).forEach(key => {
            boardItem[key] = "";
        });
    }

    function resetPlayerNames() { 
        startInteraction.setPlayerOneName("");
        startInteraction.setPlayerTwoName("");
    }

    function resetGameBoardCellContent() { 
        const cells = document.querySelectorAll(".game-board .cell");

        cells.forEach(cell => {
            cell.textContent = "";
        });
    }

    const restartBtns = document.querySelectorAll(".restart-btn");
    const replay = document.querySelector(".replay-btn");

    restartBtns.forEach(btn => {
        btn.addEventListener("click", (e) => { 
            resetGameBoardObject();
            resetPlayerNames();
            resetGameBoardCellContent();
            document.querySelector("#end-dialog").close();
            document.querySelector(".game-section").style.display = "none";
            document.querySelector(".starter-section").style.display = "block";
        });
    });

    replay.addEventListener("click", (e) => { 
        resetGameBoardObject();
        resetGameBoardCellContent();
        document.querySelector("#end-dialog").close();
    })
})();

function winnerHandler(winnerSign) { 
    document.querySelector("#end-dialog").showModal();
    const dialogWinnerDisplay = document.querySelector(".dialog-header");

    if (winnerSign == "X") { 
        dialogWinnerDisplay.textContent = "Player " + startInteraction.getPlayerOneName() + " Won!";
    } else { 
        dialogWinnerDisplay.textContent = "Player " + startInteraction.getPlayerTwoName() + " Won!";
    }
}

function drawHandler() { 
    document.querySelector("#end-dialog").showModal();
    document.querySelector(".dialog-header").textContent = "Game Drawn!";
}



