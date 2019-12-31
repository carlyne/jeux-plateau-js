const board = document.getElementById('board');
const cells = [];

const mapSize = 10;
const cellSize = 64;
let cellId = 1;

class Cell {
    constructor(x, y) {
        this.id = cellId++;
        this.hasGun = false;
        this.loot = null;
        this.hasPlayer = false;
        this.isDisable = false;
        this.x = x;
        this.y = y;
        this.nearby = [];
        this.divCell = document.createElement('div');
        this.divCell.id = `cell-${this.id}`;
        this.divCell.classList.add('cell');
    }

    addGun(gun) {
        this.divCell.appendChild(gun.spanGun);

        gun.x = this.x;
        gun.y = this.y;

        this.hasGun = true;
        this.loot = gun;
    }

    addPlayer(player) {
        this.divCell.appendChild(player.spanPlayer);

        player.x = this.x;
        player.y = this.y;

        this.hasPlayer = true;
    }

    checkPlayer(player) {
        if (this.x === player.x && this.y === player.y) {
            this.hasPlayer = true;
        } else {
            this.hasPlayer = false;
        }
    }

    get checkGun() {
        if (this.loot === null) {
            this.hasGun = false;
        } else {
            this.hasGun = true;
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
        let n = [(this.x - 1), this.y];
        this.nearby.push(n);

        let e = [this.x, (this.y + 1)];
        this.nearby.push(e);

        let s = [(this.x + 1), this.y];
        this.nearby.push(s);

        let o = [this.x, (this.y - 1)];
        this.nearby.push(o);
    }

    get allNearBy() {
        let neighbourg = [];

        cells.forEach(cell => {
            this.nearby.forEach(value => {
                if (cell.x === value[0] && cell.y === value[1]) {
                    neighbourg.push(cell);
                }
            })
        })

        this.nearby = neighbourg;
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
