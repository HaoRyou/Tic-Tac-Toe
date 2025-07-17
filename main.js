const Gameboard = (() => {
    let gameboard = ['','','',
                     '','','', 
                     '','',''];
    const winCombos = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // diagonal
        [2, 4, 6]  // diagonal
    ];

    const placement = document.getElementById('display_game');

    function connections(){
        gameboard.forEach((element, index) => {
            const button = document.createElement('button');
            button.classList.add('box');
            button.id = `cell-${index}`;
            button.textContent=element;
            placement.appendChild(button);
        });
    }
    connections();

    function iswon(gameboard,mark){
        return winCombos.some(combo =>
            combo.every(index => gameboard[index] === mark)
        );
    }

    function clearBoard() {
        for (let i = 0; i < gameboard.length; i++) {
            gameboard[i] = '';
            const button = document.getElementById(`cell-${i}`);
            if (button) button.textContent = '';
        }

    }

    return{
        gameboard,
        refresh: connections,
        clearBoard,
        iswon
    }
})();


const createplayer = (name, mark) => {
    return { name, mark};
};

const gamestart = (() =>{
    let players = [];
    let playerindex = 0;
    let gameend = false;
    document.getElementById('start').addEventListener('click', () =>{
        players = [
            createplayer(document.querySelector('#player1').value,'X'),
            createplayer(document.querySelector('#player2').value,'O')
        ];
        playerindex = 0;
        gameend = false;
        Gameboard.clearBoard();
    });


    document.querySelectorAll('.box').forEach((button, index)=> {
        button.addEventListener('click', () => {
            if (!button.textContent && !gameend) {
                const marks = players[playerindex].mark;
                button.textContent = marks;
                Gameboard.gameboard[index] = marks;
                // toggle player
                if(Gameboard.iswon(Gameboard.gameboard,marks)){
                    alert(`Player: ${players[playerindex].name} won`);
                }
                else if(!Gameboard.gameboard.includes('')){
                    alert("Tie");
                    gameend=true;
                    return;
                }

                playerindex = (playerindex + 1) % 2;

            }
        });
    });

    document.getElementById('reset').addEventListener('click', () =>{
            gameend = false;
            Gameboard.clearBoard();
    });
       


    return {
        // roundchange,
        getcurrentplayer: () => players[playerindex],
    };
})();