const mainButton = document.getElementById('main-button');

const upButton = document.getElementById('up-button');
const rightButton = document.getElementById('right-button');
const downButton = document.getElementById('down-button');
const leftButton = document.getElementById('left-button');

let currentNearBy = [];
let moveField = false;
let actionField = [];

const findActive = () => {
    playerOrder.forEach(player => {
        if (player.active) {
            currentPlayer = player;

        } else {
            secondPlayer = player;
        }
    })
}

const findCurrentNearBy = (currentPl, secondPl) => {
    cells.forEach(cell => {
        if (cell.id === currentPl.id) {
            currentNearBy = cell.nearBy;

        } else {
            cell.checkPlayer(secondPl);
        }
    })
}

const nearByOf = nearby => {
    nearby.forEach(near => {
        actionField.push(near.nearBy);
    })
}

const colorize = nearby => {
    nearby.forEach(near => {
        near.divCell.style.backgroundColor = 'green';
    });
}

const decolorize = nearby => {
    nearby.forEach(near => {
        near.divCell.style.backgroundColor = '';
    });
}

const detectAround = nearBy => {
    nearBy.forEach(near => {
        if (near.hasPlayer) {
            console.log('an ennemi !');
            busyNear = near.id;
        } else if (near.hasGun) {
            console.log('oh a gun');
        } else if (near.isDisabled) {
            console.log('disabled !');
            busyNear = near.id;
        }
    })
}

defineStartPlayer();

mainButton.addEventListener('click', function () {

    this.innerHTML = "end turn";

    decolorize(currentNearBy);

    currentPlayer.endTurn();
    secondPlayer.newTurn();

    findActive();

    findCurrentNearBy(currentPlayer, secondPlayer);
    nearByOf(currentNearBy);

    colorize(currentNearBy);
    
    detectAround(currentNearBy);

})


upButton.addEventListener('click', function () {
    detectAround(currentNearBy);
    
    currentPlayer.moveUp();
    
    findCurrentNearBy(currentPlayer, secondPlayer);
    nearByOf(currentNearBy);

    colorize(currentNearBy);
})

rightButton.addEventListener('click', e => {
    detectAround(currentNearBy);
    currentPlayer.moveRight();

    findCurrentNearBy(currentPlayer, secondPlayer);
    nearByOf(currentNearBy);
})

downButton.addEventListener('click', e => {
    detectAround(currentNearBy);
    currentPlayer.moveDown();

    findCurrentNearBy(currentPlayer, secondPlayer);
    nearByOf(currentNearBy);
})

leftButton.addEventListener('click', e => {
    detectAround(currentNearBy);
    currentPlayer.moveLeft();

    findCurrentNearBy(currentPlayer, secondPlayer);
    nearByOf(currentNearBy);
})
