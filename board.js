const board = document.getElementById('board');
const cells = [];

const mapSize = 8;
let cellId = 1;

class Cell {
    constructor() {
        this.id = cellId++;
        this.hasGun = false;
        this.hasPlayer = false;
        this.nearBy = [];
        this.divCell = document.createElement('div');
        this.divCell.id = `cell-${this.id}`;
        this.divCell.classList.add('cell');
    }

    addGun(gun) {
        this.divCell.appendChild(gun.spanGun);
        gun.id = this.id;

        this.hasGun = true;
    }

    addPlayer(player) {
        this.divCell.appendChild(player.spanPlayer);
        player.id = this.id;

        this.hasPlayer = true;
    }

    disable() {
        this.divCell.classList.add('disabled');
    }

    checkPlayer(player) {
        if (this.id === player.id) {
            this.hasPlayer = true;
        } else {
            this.hasPlayer = false;
        }
    }

    checkGun(gun) {
        if (this.id === gun.id) {
            this.hasGun = true;
        } else {
            this.hasGun = false;
        }
    }

    findNearBy() {
        let cellN = (this.id - mapSize);
        this.nearBy.push(cellN);

        let cellE = (this.id + 1);
        this.nearBy.push(cellE);

        let cellS = (this.id + mapSize);
        this.nearBy.push(cellS);

        let cellO = (this.id - 1);
        this.nearBy.push(cellO);
    }

    get allNearBy() {
        let neighbourg = [];

        cells.forEach(cell => {
            this.nearBy.forEach(nearCell => {
                if (cell.id === nearCell) {
                    neighbourg.push(cell.divCell);
                }
            })
        })

        this.nearBy = neighbourg;
    }

    /*movePlayer(player) {

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
    }*/

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
        cells.push(new Cell());
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


            if (!cell.isDisabled && !cell.hasGun) {
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
            if (!cell.isDisabled && !cell.hasGun && !cell.hasPlayer) {
                cell.addPlayer(players[index]);
                i++
            }
        })
    }
}

const renderBoard = () => {
    cells.forEach(cell => {
        board.appendChild(cell.divCell);
        cell.findNearBy();
        cell.allNearBy;
    });

    randomDisabledCells();
    randomGuns();
    randomPlayers();
}

renderBoard();

cells.forEach(cell => {
    cell.divCell.addEventListener('click', function () {
        cell.nearBy.forEach(near => {
            console.log(near);
            this.style.backgroundColor = 'blue';
            near.style.backgroundColor = 'red';
        })
    })
})
