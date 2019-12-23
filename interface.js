const mainButton = document.getElementById('main-button');

const upButton = document.getElementById('up-button');
const rightButton = document.getElementById('right-button');
const downButton = document.getElementById('down-button');
const leftButton = document.getElementById('left-button');

const cellUpdate = (player) => {
    cells.forEach(cell => {
        cell.movePlayer(player);
    });
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

upButton.addEventListener('click', e => {
    players.forEach(player => {
        player.moveOn('up');
        cellUpdate(player);
    })
})
