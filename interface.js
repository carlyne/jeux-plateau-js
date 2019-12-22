const mainButton = document.getElementById('main-button');
const upButton = document.getElementById('up-button');

mainButton.addEventListener('click', function () {

    this.innerHTML = "end turn"

    if (playerOne.active) {
        playerTwo.playerTurn();
        playerOne.playerEndTurn();
    } else if (!playerOne.active) {
        playerOne.playerTurn();
        playerTwo.playerEndTurn()
    }
})

upButton.addEventListener('click', e => {
    if (playerOne.active) {
        playerOne.moveCost();
        if (playerOne.move <= 0) {
            console.log("can't move anymore")
        } else {
            playerOne.up = true;
            playerOne.movePlayer();

            cells.forEach(cell => {
                if (cell.hasPlayer) {
                    cell.removePlayer(playerOne);
                }
            });

            cells.forEach(cell => {
                if (cell.x === playerOne.x && cell.y === playerOne.y) {
                    cell.addPlayer(playerOne);
                }
            });
        };

    } else {
        console.log('no player active')
    }

})
