const mainButton = document.getElementById('main-button');

const upButton = document.getElementById('up-button');
const rightButton = document.getElementById('right-button');
const downButton = document.getElementById('down-button');
const leftButton = document.getElementById('left-button');

let currentPlayer = null;
let currentNearBy = null;

const findActive = () => {
    players.forEach(player => {
        if (player.active)
            return currentPlayer = player;
    })
}

const findCurrentNearBy = (player) => {
    cells.forEach(cell => {
        if (cell.id === player.id) {
            currentNearBy = cell.nearBy;
        }
    })
}


mainButton.addEventListener('click', function () {

    this.innerHTML = "end turn";
    defineStartPlayer(2);

    if (playerOrder[0].active) {
        playerOrder[0].endTurn();
        playerOrder[1].newTurn();

    } else if (!playerOrder[0].active) {
        playerOrder[0].newTurn();
        playerOrder[1].endTurn();
    }
})


upButton.addEventListener('click', function () {
    findActive();

    findCurrentNearBy(currentPlayer);
    currentPlayer.moveUp(currentNearBy);
})

rightButton.addEventListener('click', e => {
    findActive();
    currentPlayer.moveRight();
})

downButton.addEventListener('click', e => {
    findActive();
    currentPlayer.down();
})

leftButton.addEventListener('click', e => {
    findActive();
    currentPlayer.moveLeft();
})
