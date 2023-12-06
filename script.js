const gameBoard = (function(){ 
    let player1Nombre = "Player 1";
    let player2Nombre = "Player 2";

    let player1Input = document.querySelector("#player1Input")
    let player2Input = document.querySelector("#player2Input")

    let buttonDiv = document.querySelector("#buttonDiv")

    let theDialog = document.querySelector("#theDialog")
    let dialogText = document.querySelector("#modalDiv")
    
    let startButton = document.querySelector("#start")

    function gameOver(list){
        if (list[0] === list[1] && list[1] === list[2] || list[3] === list[4] && list[4] === list[5] || 
            list[6] === list[7] && list[7] === list[8] || list[0] === list[3] && list[3] === list[6] || 
            list[1] === list[4] && list[4] === list[7] || list[2] === list[5] && list[5] === list[8] ||
            list[0] === list[4] && list[4] === list[8] || list[6] === list[4] && list[4] === list[2])
            {
                gameFlow.updateModal();
                theDialog.showModal();
            }
        else if(gameFlow.getStep() === 10){
            gameFlow.updateModal();
            theDialog.showModal();
        }
    }

    function populateBoard(list, square){
        gameFlow.player1Name.style.textDecoration = "none";
        gameFlow.player2Name.style.textDecoration = "none";
        if(list[square.id[6] - 1] === 'X'){
            gameFlow.player2Name.style.textDecoration = "underline";
            square.textContent = 'X';
        }
        else if (list[square.id[6] - 1] === 'O'){
            gameFlow.player1Name.style.textDecoration = "underline";
            square.textContent = 'O';
        }
        }
    return {startButton, player1Input, player2Input, buttonDiv, theDialog, dialogText, player1Nombre, player2Nombre, populateBoard, gameOver}
})();

const gameFlow = function(){
    let started = false;
    
    let player1Name = document.querySelector("#player1Name")
    let player2Name = document.querySelector("#player2Name")

    let topContainer = document.querySelector("#topContainer")

    let step = 1;

    let theList = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    let allSquares = document.querySelectorAll(".boardSquares")

    let mainReset = document.createElement("button")
    mainReset.id = 'mainReset'
    mainReset.textContent = "Reset";
    mainReset.classList.add('resetButton')

    let sideReset = document.querySelector("#sideReset")

    allSquares.forEach(function(square){
        square.addEventListener('click', function(){
            if(getStarted() === true && typeof theList[square.id[6] - 1] === 'number'){
                step += 1;
                populateList(square.id);
                gameBoard.gameOver(theList);
                gameBoard.populateBoard(theList, square);
            };
        });
    })

    function populateList(squareID){
        let tempIndex = squareID[6];

        if(gameFlow.getStep() % 2 === 0){
            theList[tempIndex - 1] = 'X';
        }
        else{
            theList[tempIndex - 1] = 'O';
        }
    }

    function resetButtons(){
        mainReset.remove();
        gameBoard.buttonDiv.appendChild(gameBoard.startButton);
        player1Name.textContent = "Player 1 name:"
        player2Name.textContent = "Player 2 name:"
        gameBoard.player1Input.value = "";
        gameBoard.player2Input.value = "";
        topContainer.appendChild(player1Name);
        topContainer.appendChild(gameBoard.player1Input);
        topContainer.appendChild(player2Name);
        topContainer.appendChild(gameBoard.player2Input);
    }
    
    function resetAll(){
        resetButtons();
        gameBoard.theDialog.close();
        theList = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        step = 1;
        started = false;
        player1Name.style.textDecoration = "none";
        player2Name.style.textDecoration = "none";
        allSquares.forEach(function(square){
            square.textContent = '';
            gameBoard.player1Nombre = "Player 1";
            gameBoard.player2Nombre = "Player 2";
        });
    };

    mainReset.addEventListener('click', function(){
        resetAll();
    })

    sideReset.addEventListener('click', function(){
        resetAll();
    })

    function updateModal(){
        gameBoard.theDialog.classList.add("dialogPanel")
        if(step === 10){
            gameBoard.dialogText.textContent = "Draw";
        }
        else if(step % 2 !== 0){
            gameBoard.dialogText.textContent = `${gameBoard.player2Nombre} wins`;
        }
        else{
            gameBoard.dialogText.textContent = `${gameBoard.player1Nombre} wins`;
        }
    };

    gameBoard.startButton.addEventListener('click', function(){
        player1Name.style.textDecoration = "underline";
        if(gameBoard.player1Input.value.length !== 0){
            player1Name.textContent = gameBoard.player1Input.value;
            gameBoard.player1Nombre = gameBoard.player1Input.value;
        }
        else{
            player1Name.textContent = "Player 1";
        }
        if(gameBoard.player2Input.value.length !== 0){
            player2Name.textContent = gameBoard.player2Input.value;
            gameBoard.player2Nombre = gameBoard.player2Input.value;
        }
        else {
            player2Name.textContent = "Player 2";
        }
        gameBoard.startButton.remove();
        gameBoard.buttonDiv.appendChild(mainReset);
        gameBoard.player1Input.remove();
        gameBoard.player2Input.remove();
        started = true;
    });

    function getStarted(){
        return started;
    }

    function getStep(){
        return step;
    }
    
    return{updateModal, getStarted, resetAll, resetButtons, getStep, player1Name, player2Name}
}();
