const mainButton = document.getElementById('main-button');

const upButton = document.getElementById('up-button');
const rightButton = document.getElementById('right-button');
const downButton = document.getElementById('down-button');
const leftButton = document.getElementById('left-button');
const fightButton = document.getElementById('fight-button');

let currentPlayer = null;
let secondPlayer = null;
let attack = false;

let busyNearX = null;
let busyNearY = null;

let currentCell = null;
let moveField = [];

let storeGun = [];

const findActive = () => {
    playerOrder.forEach(player => {
        if (player.active) {
            currentPlayer = player;

        } else {
            secondPlayer = player;
        }
    })
}

const findCurrentCell = (currentPl, secondPl) => {
    cells.forEach(cell => {
        if (cell.x === currentPl.x && cell.y === currentPl.y) {
            currentCell = cell;

        } else {
            cell.checkPlayer(secondPl);
        }
    })
}

const findNearGroup = cell => {
    let allNearbyPlus = [];
    let nearGroup = [];

    cell.nearby.forEach(near => {
        nearGroup.push(near);
        allNearbyPlus.push(near.nearby);
    })

    allNearbyPlus.forEach(neargroup => {
        neargroup.forEach(near => {
            nearGroup.push(near);
        })
    })

    return nearGroup;
}

const removeDupplicate = (element, array) => {
    let newArray = [];

    for (let i = 0; i < element.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (element[i] === j) {
                array.splice(j, 1, null);
            }
        }
    }

    for (let i = 0; i < array.length; i++) {
        if (array[i] !== null) {
            newArray.push(array[i]);
        }
    }

    return newArray;
}

const findMoveField = () => {
    let toReduce = findNearGroup(currentCell);
    let output = [];
    let ind = [];

    toReduce.forEach(e => {
        output.push(e);
    })

    for (let i = 0; i < toReduce.length; i++) {
        let counter = 0;

        for (let j = 0; j < output.length; j++) {
            if (toReduce[i].id === output[j].id) {
                indice = j;
                counter++;

                if (counter > 1) {
                    ind.push(indice);
                }
            }
        }
    }

    let out = [];
    let obj = {};
    let x;

    for (x = 0; x < ind.length; x++) {
        obj[ind[x]] = 0;
    }

    for (x in obj) {
        out.push(Number(x));
    }

    ind = out;

    let store = removeDupplicate(ind, output);

    moveField = store;
}

const detectAround = neargroup => { 
    neargroup.forEach(near => {
        near.checkGun;
        
        if (near.hasPlayer && near.x === secondPlayer.x && near.y === secondPlayer.y) {
            console.log('an ennemi !');
            
            busyNearX = near.x;
            busyNearY = near.y;
            
            fightButton.style.display = 'block';

        } else if (near.hasGun) {
            console.log('oh a gun')

            storeGun.push(near.loot);
            near.loot = null;
            
            fightButton.style.display = 'none';

        } else if (near.isDisabled) {
            console.log('disabled !');
            
            busyNearX = near.x;
            busyNearY = near.y;
            
            fightButton.style.display = 'none';
        }
    })
}

const colorize = neargroup => {
    neargroup.forEach(near => {
        if (near.isDisable || near.hasPlayer && near.x === secondPlayer.x && near.y === secondPlayer.y) {
            near.divCell.style.backgroundColor = 'rgba(231, 76, 60, 0.5)';

        } else {
            near.divCell.style.backgroundColor = 'rgba(123, 239, 178, 0.5)';
        }
    })
}

const decolorize = neargroup => {
    neargroup.forEach(near => {
        near.divCell.style.backgroundColor = '';
    })
}

const playerAction = () => {
    decolorize(moveField);
    moveField = [];

    findCurrentCell(currentPlayer, secondPlayer);
    findMoveField(currentCell);
    colorize(moveField);

    detectAround(moveField);
    console.log(storeGun);
}

defineStartPlayer();

mainButton.addEventListener('click', function () {
    this.innerHTML = "end turn";

    decolorize(moveField);
    moveField = [];

    currentPlayer.endTurn();
    secondPlayer.newTurn();

    findActive();
    findCurrentCell(currentPlayer, secondPlayer);
    findMoveField(currentCell);
    colorize(moveField);

    detectAround(moveField);
    console.log(storeGun);
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
