const mainButton = document.getElementById('main-button');

const upButton = document.getElementById('up-button');
const rightButton = document.getElementById('right-button');
const downButton = document.getElementById('down-button');
const leftButton = document.getElementById('left-button');
const fightButton = document.getElementById('fight-button');

/*let currentNearby = [];
let actionField = [];
let toLoot = [];
let change = false;
let loot = false;*/

let currentPlayer = null;
let secondPlayer = null;

let busyNearX = null;
let busyNearY = null;

let currentCell = null;
let moveField = [];

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

const findCurrentCell = (currentPl, secondPl) => {
    cells.forEach(cell => {
        if (cell.x === currentPl.x && cell.y === currentPl.y) {
            currentCell = cell;

        } else {
            cell.checkPlayer(secondPl);
        }
    })
}

const removeDupplicate = (element, array) => {
    let counter = 0;
    for (let i in element) {
        if (counter > 0) {
            array.splice(i--, 1);
        } else {
            array.splice(i, 1);
            counter++;
        }
    }
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

const findMoveField = () => {
    let toReduce = findNearGroup(currentCell);
    let output = [];
    let ind = [];

    toReduce.forEach(e => {
        output.push(e);
    })
    
    console.log(output);

    for (let i = 0; i < toReduce.length; i++) {
        let counter = 0;

        for (let j = 0; j < output.length; j++) {
            if (toReduce[i].id === output[j].id) {
                indice = (j + 1);
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
        out.push(x);
    }

    ind = out;
    console.log(ind);
    removeDupplicate(ind, output);
    console.log(output);
}




const detectAround = neargroup => {
    neargroup.forEach(near => {
        if (near.hasPlayer && near.x === secondPlayer.x && near.y === secondPlayer.y) {
            console.log('an ennemi !');
            busyNearX = near.x;
            busyNearY = near.y;
            fightButton.style.display = 'block';

        } else if (near.hasGun) {
            console.log('oh a gun')
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
    //decolorize(moveField);
    //moveField = [];

    findCurrentCell(currentPlayer, secondPlayer);
    findMoveField(currentCell);

    //colorize(moveField);

    //detectAround(moveField);
}

defineStartPlayer();

mainButton.addEventListener('click', function () {
    this.innerHTML = "end turn";

    //decolorize(moveField);
    //moveField = [];

    currentPlayer.endTurn();
    secondPlayer.newTurn();

    findActive();
    findCurrentCell(currentPlayer, secondPlayer);
    findMoveField(currentCell);

    //colorize(moveField);

    //detectAround(moveField);
    //console.log(moveField);
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
