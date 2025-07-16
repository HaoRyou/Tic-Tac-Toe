

const Gameboard = (() => {
    let gameboard = ['','','','','','','','',''];

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

    return{
        gameboard,
        refresh: connections
    }
})();


const createplayer = (name, mark) => {
    return { name, mark };
};

const gamestart = (() =>{

    const players = [
            createplayer(document.querySelector('#player1').value,'X'),
            createplayer(document.querySelector('#player2').value,'O')
        ];
    let playerindex = 0;
    let gameend = false;
    let round = 3;
    let win = Math.floor(Number(round/2))+1;


    function roundchange(num){
        round = num;
        this.win = Math.floor(this.round/2)+1;
    }
    
    document.querySelectorAll('.box').forEach(button => {
        button.addEventListener('click', () => {
            if (!button.textContent && !gameend) {
                button.textContent = players[playerindex].mark;
                // toggle player
                playerindex = (playerindex + 1) % 2;
            }
        });
    });

    return {
        roundchange,
        getcurrentplayer: () => player[playerindex],
    };
})

