const mainButton = document.getElementById('main-button');

const upButton = document.getElementById('up-button');
const rightButton = document.getElementById('right-button');
const downButton = document.getElementById('down-button');
const leftButton = document.getElementById('left-button');

const cellUpdate = player => {
    cells.forEach(cell => {
        cell.movePlayer(player);
    });
}

const playerUpdate = (direction, player) => {
    if (player.active) {
        player.moveOn(direction);
        cellUpdate(player);
    }
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
    players.forEach(player => {
        playerUpdate('up', player);
    })
})

rightButton.addEventListener('click', e => {
    players.forEach(player => {
        playerUpdate('right', player);
    })
})

downButton.addEventListener('click', e => {
    players.forEach(player => {
        playerUpdate('down', player);
    })
})

leftButton.addEventListener('click', e => {
    players.forEach(player => {
        playerUpdate('left', player);
    })
})
