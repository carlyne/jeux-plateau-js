const board = document.getElementById('board');
const cells = [];

const mapSize = 8;
let cellId = 0;

class Cell {
    constructor(x, y) {
        this.id = cellId++;
        this.x = x;
        this.y = y;
        this.hasItem = false;
        this.hasPlayer = false;
        this.hasPlayerPlaying = 0;
        this.divCell = document.createElement('div');
        this.divCell.id = `cell-${this.id}`;
        this.divCell.classList.add('cell');
    }


    addGun(gun) {
        this.divCell.appendChild(gun.spanGun);
        this.hasItem = true;
    }

    addPlayer(player) {
        this.divCell.appendChild(player.spanPlayer);
        this.player = player.spanPlayer;

        player.x = this.x;
        player.y = this.y;

        this.hasPlayer = true;
        this.hasPlayerPlaying++;
    }

    movePlayer(player) {

        if (this.x === player.x && this.y === player.y && !this.isDisabled && this.hasPlayerPlaying < 1) {
            this.addPlayer(player);
            player.stepCounter = true;    
            
            console.log(this.hasPlayerPlaying);
            
        } else if (this.x === player.x && this.y === player.y && this.isDisabled) {
            player.canMove = false;
            player.stepCounter = false;
            console.log('try another button');
            
        } else if (this.x === player.x && this.y === player.y && this.hasPlayerPlaying >= 1) {
            player.canMove = false;
            player.stepCounter = false;
            console.log('fight');
        }
    }

    disable() {
        this.divCell.classList.add('disabled');
    }

    get isDisabled() {
        if (this.divCell.classList.contains('disabled')) {
            return true;
        } else {
            return false;
        }
    }
}


for (let x = 0; x < mapSize; x++) {
    for (let y = 0; y < mapSize; y++) {
        cells.push(new Cell(x, y));
    }
}


const randomizer = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const randomDisabledCells = (number = 2) => {
    let i = 0;

    while (i < number) {
        const cell = randomizer(cells);
        if (!cell.isDisabled) {
            cell.disable();
            i++;
        }
    }
}


const randomGuns = (number = 4) => {
    let i = 0;

    while (i < number) {
        const cellArr = [randomizer(cells), randomizer(cells), randomizer(cells), randomizer(cells)];

        cellArr.forEach((cell, index) => {
            if (!cell.isDisabled && !cell.hasItem) {
                cell.addGun(guns[index]);
                i++
            }
        })
    }
}

const randomPlayers = (number = 2) => {
    let i = 0;

    while (i < number) {
        const cellArr = [randomizer(cells), randomizer(cells)];

        cellArr.forEach((cell, index) => {
            if (!cell.isDisabled && !cell.hasItem && !cell.hasPlayer) {
                cell.addPlayer(players[index]);
                i++
            }
        })
    }
}

const renderBoard = () => {
    cells.forEach(cell => {
        board.appendChild(cell.divCell);
    })

    randomDisabledCells();
    randomGuns();
    randomPlayers();
}

renderBoard();
