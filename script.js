const gameBoard = (function(){
    let started = false;

    let player1Name = document.querySelector("#player1Name")
    let player2Name = document.querySelector("#player2Name")

    let player1Nombre = "Player 1";
    let player2Nombre = "Player 2";

    let player1Input = document.querySelector("#player1Input")
    let player2Input = document.querySelector("#player2Input")

    let topContainer = document.querySelector("#topContainer")

    let buttonDiv = document.querySelector("#buttonDiv")

    let theDialog = document.querySelector("#theDialog")
    let dialogText = document.querySelector("#modalDiv")

    let mainReset = document.createElement("button")
    mainReset.id = 'mainReset'
    mainReset.textContent = "Reset";
    mainReset.classList.add('resetButton')
    let sideReset = document.querySelector("#sideReset")
    
    let startButton = document.querySelector("#start")

    let step = 1;
    
    let allSquares = document.querySelectorAll(".boardSquares")

    let theList = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    function gameOver(list){
        if (list[0] === list[1] && list[1] === list[2] || list[3] === list[4] && list[4] === list[5] || 
            list[6] === list[7] && list[7] === list[8] || list[0] === list[3] && list[3] === list[6] || 
            list[1] === list[4] && list[4] === list[7] || list[2] === list[5] && list[5] === list[8] ||
            list[0] === list[4] && list[4] === list[8] || list[6] === list[4] && list[4] === list[2])
            {
                updateModal();
                theDialog.showModal();
            }
        else if(step === 10){
            updateModal();
            theDialog.showModal();
        }
    }

    function updateModal(){
        theDialog.classList.add("dialogPanel")
        if(step === 10){
            dialogText.textContent = "Draw";
        }
        else if(step % 2 !== 0){
            dialogText.textContent = `${player2Nombre} wins`;
        }
        else{
            dialogText.textContent = `${player1Nombre} wins`;
        }
    };

    function populateList(squareID){
        let tempIndex = squareID[6];

        if(step % 2 === 0){
            theList[tempIndex - 1] = 'X';
        }
        else{
            theList[tempIndex - 1] = 'O';
        }
    }

    function populateBoard(list, square){
        player1Name.style.textDecoration = "none";
        player2Name.style.textDecoration = "none";
        if(list[square.id[6] - 1] === 'X'){
            player2Name.style.textDecoration = "underline";
            square.textContent = 'X';
        }
        else if (list[square.id[6] - 1] === 'O'){
            player1Name.style.textDecoration = "underline";
            square.textContent = 'O';
        }
        }

    allSquares.forEach(function(square){
        square.addEventListener('click', function(){
            if(started === true && typeof theList[square.id[6] - 1] === 'number'){
                step += 1;
                populateList(square.id);
                gameOver(theList);
                populateBoard(theList, square);
            };
        });
    })
    startButton.addEventListener('click', function(){
        player1Name.style.textDecoration = "underline";
        if(player1Input.value.length !== 0){
            player1Name.textContent = player1Input.value;
            player1Nombre = player1Input.value;
        }
        else{
            player1Name.textContent = "Player 1";
        }
        if(player2Input.value.length !== 0){
            player2Name.textContent = player2Input.value;
            player2Nombre = player2Input.value;
        }
        else {
            player2Name.textContent = "Player 2";
        }
        startButton.remove();
        buttonDiv.appendChild(mainReset);
        player1Input.remove();
        player2Input.remove();
        started = true;
    });

    function resetButtons(){
        mainReset.remove();
        buttonDiv.appendChild(startButton);
        player1Name.textContent = "Player 1 name:"
        player2Name.textContent = "Player 2 name:"
        player1Input.value = "";
        player2Input.value = "";
        topContainer.appendChild(player1Name);
        topContainer.appendChild(player1Input);
        topContainer.appendChild(player2Name);
        topContainer.appendChild(player2Input);
    }
    
    function resetAll(){
        resetButtons();
        theDialog.close();
        theList = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        step = 1;
        started = false;
        player1Name.style.textDecoration = "none";
        player2Name.style.textDecoration = "none";
        allSquares.forEach(function(square){
        square.textContent = '';
        player1Nombre = "Player 1";
        player2Nombre = "Player 2";
        });
    };

    mainReset.addEventListener('click', function(){
        resetAll();
    })
    sideReset.addEventListener('click', function(){
        resetAll()
    })
})();

