const board = document.getElementById('board');
const cells = [];

const mapSize = 10;
const cellSize = 64;
let cellId = 1;

class Cell {
    constructor() {
        this.id = cellId++;
        this.hasGun = false;
        this.hasPlayer = false;
        this.isDisable = false;
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

    disable() {
        this.divCell.classList.add('disabled');
        this.isDisable = true;
    }

    get isDisabled() {
        if (this.divCell.classList.contains('disabled')) {
            return true;
        } else {
            return false;
        }
    }

    findNearBy() {
        let n = (this.id - mapSize);
        this.nearBy.push(n);

        let e = (this.id + 1);
        this.nearBy.push(e);

        let s = (this.id + mapSize);
        this.nearBy.push(s);

        let o = (this.id - 1);
        this.nearBy.push(o);
    }

    get allNearBy() {
        let neighbourg = [];

        cells.forEach(cell => {
            this.nearBy.forEach(nearCell => {
                if (cell.id === nearCell) {
                    neighbourg.push(cell);
                }
            })
        })

        this.nearBy = neighbourg;
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
