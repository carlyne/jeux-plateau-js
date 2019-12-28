const mainButton = document.getElementById('main-button');

const upButton = document.getElementById('up-button');
const rightButton = document.getElementById('right-button');
const downButton = document.getElementById('down-button');
const leftButton = document.getElementById('left-button');

let currentPlayer = null;
let secondPlayer = null;
let currentNearBy = null;
let actionField = [];

const findActive = () => {
    players.forEach(player => {
        if (player.active) {
            currentPlayer = player;

        } else {
            secondPlayer = player;
        }
    })
}

const findCurrentNearBy = (currentP, secondP) => {
    cells.forEach(cell => {
        if (cell.id === currentP.id) {
            currentNearBy = cell.nearBy;
        }
        cell.checkPlayer(secondP);
    })
}

const nearByOf = nearby => {
    nearby.forEach(near => {
        actionField.push(near.nearBy);
    })
}

const detectAround = nearBy => {
    nearBy.forEach(near => {
        if (near.hasPlayer) {
            console.log('an ennemi !');
            busyNear = near.id;
        } else if (near.hasGun) {
            console.log('oh a gun');
        } else if (near.isDisabled) {
            busyNear = near.id;
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

    findActive();

    findCurrentNearBy(currentPlayer, secondPlayer);
    detectAround(currentNearBy);
    nearByOf(currentNearBy);
    
    console.log('current');
    console.log(currentNearBy);
    console.log('current near');
    console.log(actionField);

    currentNearBy.forEach(a => {
        a.divCell.style.backgroundColor = 'green';
    });
    
    actionField.forEach(a => {
        a.forEach(b => {
            b.divCell.style.backgroundColor = 'green';
        })
    })


})


upButton.addEventListener('click', function () {
    currentPlayer.moveUp(currentNearBy);
})

rightButton.addEventListener('click', e => {
    findActive();
    //findCurrentNearBy(currentPlayer);



    currentPlayer.moveRight(currentNearBy);

})

downButton.addEventListener('click', e => {
    findActive();

    //findCurrentNearBy(currentPlayer);


    currentPlayer.moveDown(currentNearBy);
    console.log('id: ' + currentPlayer.id);
})

leftButton.addEventListener('click', e => {
    findActive();

    //findCurrentNearBy(currentPlayer);

    currentPlayer.moveLeft(currentNearBy);
    console.log('id: ' + currentPlayer.id);
})
