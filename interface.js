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
        if (near.id != busyNear) {
            near.divCell.style.backgroundColor = 'green';
        }
    });
}

const decolorize = nearby => {
    nearby.forEach(near => {
        near.divCell.style.backgroundColor = '';
    });
}

const detectAround = nearBy => {
    nearBy.forEach(near => {
        if (near.hasPlayer && near.id != currentPlayer.id) {
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
