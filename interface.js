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
        if (cell.x === currentPl.x && cell.y === currentPl.y) {
            currentNearBy = cell.nearby;

        } else {
            cell.checkPlayer(secondPl);
        }
    })
}

const nearByOf = allNearby => {
    allNearby.forEach(near => {
        actionField.push(near.nearby);
    })
}

const detectAround = allNearby => {
    allNearby.forEach(near => {
        if (near.hasPlayer && near.x != currentPlayer.x && near.y != currentPlayer.y) {
            console.log('an ennemi !');
            busyNearX = near.x;
            busyNearY = near.y;
        } else if (near.hasGun) {
            console.log('oh a gun');
        } else if (near.isDisabled) {
            console.log('disabled !');
            busyNearX = near.x;
            busyNearY = near.y;
        }
    })
}

const colorize = allNearby => {
    allNearby.forEach(near => {
        if (near.x != busyNearX && near.y != busyNearY) {
            near.divCell.style.backgroundColor = 'green';
        }
    });
}

const decolorize = allNearby => {
    allNearby.forEach(near => {
        near.divCell.style.backgroundColor = '';
    });
}

defineStartPlayer();

mainButton.addEventListener('click', function () {
    this.innerHTML = "end turn";

    decolorize(currentNearBy);
    actionField.forEach(field => {
        decolorize(field);
    });

    actionField = [];

    currentPlayer.endTurn();
    secondPlayer.newTurn();

    findActive();

    findCurrentNearBy(currentPlayer, secondPlayer);
    nearByOf(currentNearBy);
    detectAround(currentNearBy);

    colorize(currentNearBy);
    actionField.forEach(field => {
        detectAround(field);
        colorize(field);
    })
})


upButton.addEventListener('click', function () {
    decolorize(currentNearBy);
    actionField.forEach(field => {
        decolorize(field);
    });

    actionField = [];

    detectAround(currentNearBy);
    
    currentPlayer.moveUp();
    findCurrentNearBy(currentPlayer, secondPlayer);
    nearByOf(currentNearBy);

    detectAround(currentNearBy);
    colorize(currentNearBy);
    actionField.forEach(field => {
        detectAround(field);
        colorize(field);
    })
})

rightButton.addEventListener('click', e => {
    decolorize(currentNearBy);
    actionField.forEach(field => {
        decolorize(field);
    });

    actionField = [];

    detectAround(currentNearBy);
    currentPlayer.moveRight();
    findCurrentNearBy(currentPlayer, secondPlayer);
    nearByOf(currentNearBy);

    detectAround(currentNearBy);
    colorize(currentNearBy);
    actionField.forEach(field => {
        detectAround(field);
        colorize(field);
    })
})

downButton.addEventListener('click', e => {
    decolorize(currentNearBy);
    actionField.forEach(field => {
        decolorize(field);
    });

    actionField = [];

    detectAround(currentNearBy);
    currentPlayer.moveDown();
    findCurrentNearBy(currentPlayer, secondPlayer);
    nearByOf(currentNearBy);

    detectAround(currentNearBy);
    colorize(currentNearBy);
    actionField.forEach(field => {
        detectAround(field);
        colorize(field);
    })
})

leftButton.addEventListener('click', e => {
    decolorize(currentNearBy);
    actionField.forEach(field => {
        decolorize(field);
    });

    actionField = [];

    detectAround(currentNearBy);
    currentPlayer.moveLeft();
    findCurrentNearBy(currentPlayer, secondPlayer);
    nearByOf(currentNearBy);

    colorize(currentNearBy);
    actionField.forEach(field => {
        detectAround(field);
        colorize(field);
    })
})

console.log(cells);