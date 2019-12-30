const mainButton = document.getElementById('main-button');

const upButton = document.getElementById('up-button');
const rightButton = document.getElementById('right-button');
const downButton = document.getElementById('down-button');
const leftButton = document.getElementById('left-button');
const fightButton = document.getElementById('fight-button');

let currentNearby = [];
let moveField = false;
let actionField = [];
let toLoot = [];
let change = false;

let loot = false;

let attack = false;

const findActive = () => {
    playerOrder.forEach(player => {
        if (player.active) {
            currentPlayer = player;

        } else {
            secondPlayer = player;
        }
    })
}

const findCurrentNearby = (currentPl, secondPl) => {
    cells.forEach(cell => {
        if (cell.x === currentPl.x && cell.y === currentPl.y) {
            currentNearby = cell.nearby;

        } else {
            cell.checkPlayer(secondPl);
        }
    })
}

const nearbyOfNearby = allNearby => {
    allNearby.forEach(near => {
        actionField.push(near.nearby);
    })
}

const detectAround = allNearby => {
    allNearby.forEach(near => {
        if (near.hasPlayer && near.x === secondPlayer.x && near.y === secondPlayer.y) {
            console.log('an ennemi !');
            busyNearX = near.x;
            busyNearY = near.y;
            fightButton.style.display = 'block';

        } else if (near.hasGun) {
            loot = true;

            if (toLoot.length >= 1) {
                toLoot.forEach(lootGun => {
                    if (lootGun === near.loot || lootGun === lootGun) {
                        console.log('already scanned');
                    } else if (change) {
                        near.loot = lootGun;
                    } else {
                        toLoot.push(near.loot);
                    }
                })
            } else {
                toLoot.push(near.loot);
            }

            fightButton.style.display = 'none';

        } else if (near.isDisabled) {
            console.log('disabled !');
            busyNearX = near.x;
            busyNearY = near.y;
            fightButton.style.display = 'none';
        }
    })
}

const colorize = allNearby => {
    allNearby.forEach(near => {
        if (near.isDisable || near.hasPlayer && near.x === secondPlayer.x && near.y === secondPlayer.y) {
            near.divCell.style.backgroundColor = 'rgba(231, 76, 60, 0.5)';
        } else {
            near.divCell.style.backgroundColor = 'rgba(123, 239, 178, 0.5)';
        }
    })
}

const decolorize = allNearby => {
    allNearby.forEach(near => {
        near.divCell.style.backgroundColor = '';
    })
}

const playerAction = () => {
    actionField.forEach(near => {
        decolorize(near);
    })
    actionField = [];

    decolorize(currentNearby);

    findCurrentNearby(currentPlayer, secondPlayer);
    nearbyOfNearby(currentNearby);

    detectAround(currentNearby);

    actionField.forEach(near => {
        detectAround(near);
        colorize(near);
    })

    colorize(currentNearby);

    console.log('loot');
    console.log(toLoot);
    console.log('player stuff');
    console.log(currentPlayer.stuff);
}

defineStartPlayer();

mainButton.addEventListener('click', function () {
    this.innerHTML = "end turn";

    actionField.forEach(near => {
        decolorize(near);
    })

    actionField = [];

    decolorize(currentNearby);

    currentPlayer.endTurn();
    secondPlayer.newTurn();

    findActive();

    findCurrentNearby(currentPlayer, secondPlayer);
    nearbyOfNearby(currentNearby);

    detectAround(currentNearby);

    actionField.forEach(near => {
        detectAround(near);
        colorize(near);
    })
    colorize(currentNearby);

    console.log('loot');
    console.log(toLoot);
})

upButton.addEventListener('click', function () {
    currentPlayer.moveUp();
    playerAction();
})

downButton.addEventListener('click', function () {
    currentPlayer.moveDown();
    playerAction();
})

rightButton.addEventListener('click', function () {
    currentPlayer.moveRight();
    playerAction();
})

leftButton.addEventListener('click', function () {
    currentPlayer.moveLeft();
    playerAction();
})

fightButton.addEventListener('click', function () {
    attack = true;
    secondPlayer.injured;
})
