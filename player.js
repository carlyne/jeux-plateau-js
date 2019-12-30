const players = [];
const playerOrder = [];
let busyNearX = null;
let busyNearY = null;


let currentPlayer = null;
let secondPlayer = null;

class Player {
    constructor(color) {
        this.x = 0;
        this.y = 0;
        this.move = 3;
        this.translateY = 0;
        this.translateX = 0;
        this.health = 100;
        this.stuff = basicGun;
        this.color = color;
        this.active = false;
        this.spanPlayer = document.createElement('span');
        this.spanPlayer.classList.add('player');
        this.spanPlayer.style.backgroundColor = this.color;
    }

    newTurn() {
        this.active = true;
        this.spanPlayer.classList.add('playing');
        this.move = 3;
    }

    endTurn() {
        this.active = false;
        this.spanPlayer.classList.remove('playing');
    }

    stuffed(lootGuns) {
        let newStuff = null;
        let currentStuff = this.stuff;

        lootGuns.forEach((lootGun, index) => {
            if (this.x === lootGun.x && this.y === lootGun.y) {
                newStuff = lootGun;
                change = true;
                
                lootGuns.splice(index, 0, currentStuff);
                
                this.stuff = newStuff;
            } else {
                change = false;
            }    
        })
    }

    moveUp() {
        if (this.move > 0) {
            let up = (this.x - 1);

            if (up === busyNearX && this.y === busyNearY || up < 0) {
                console.log('no move');

            } else {
                if (this.translateY <= 0) {
                    this.translateY -= cellSize;
                    this.spanPlayer.style.transform = `translate(${this.translateX}px, -${Math.abs(this.translateY)}px)`;

                } else {
                    this.translateY -= cellSize;
                    this.spanPlayer.style.transform = `translate(${this.translateX}px, ${this.translateY}px)`;
                }

                this.move--;
                this.x = up;

                if (loot) {
                    this.stuffed(toLoot);
                }

            }
        } else {
            console.log('no more move');
        }
    }

    moveDown() {
        if (this.move > 0) {
            let down = (this.x + 1);

            if (down === busyNearX && this.y === busyNearY || down > (mapSize - 1)) {
                console.log('no move');

            } else {
                if (this.translateY < 0) {
                    this.translateY += cellSize;
                    this.spanPlayer.style.transform = `translate(${this.translateX}px, -${Math.abs(this.translateY)}px)`;

                } else {
                    this.translateY += cellSize;
                    this.spanPlayer.style.transform = `translate(${this.translateX}px, ${this.translateY}px)`;
                }
                this.x = down;
                this.move--;

                if (loot) {
                    this.stuffed(toLoot);
                }
            }
        } else {
            console.log('no more move');
        }
    }

    moveRight() {
        if (this.move > 0) {
            let right = (this.y + 1);

            if (this.x === busyNearX && right === busyNearY || right > (mapSize - 1)) {
                console.log('no move');

            } else {
                if (this.translateX < 0) {
                    this.translateX += cellSize;
                    this.spanPlayer.style.transform = `translate(-${Math.abs(this.translateX)}px, ${this.translateY}px)`;

                } else {
                    this.translateX += cellSize;
                    this.spanPlayer.style.transform = `translate(${this.translateX}px, ${this.translateY}px)`;
                }
                this.y = right;
                this.move--;

                if (loot) {
                    this.stuffed(toLoot);
                }
            }
        } else {
            console.log('no more move');
        }
    }

    moveLeft() {
        if (this.move > 0) {
            let left = (this.y - 1);

            if (this.x === busyNearX && left === busyNearY || left < 0) {
                console.log('no move');

            } else {
                if (this.translateX < 0) {
                    this.translateX -= cellSize;
                    this.spanPlayer.style.transform = `translate(-${Math.abs(this.translateX)}px, ${this.translateY}px)`;

                } else {
                    this.translateX -= cellSize;
                    this.spanPlayer.style.transform = `translate(${this.translateX}px, ${this.translateY}px)`;
                }
                this.y = left;
                this.move--;

                if (loot) {
                    this.stuffed(toLoot);
                }
            }
        } else {
            console.log('no more move');
        }
    }

    get injured() {
        if (attack) {
            if (currentPlayer.stuff === basicGun) {
                console.log('missed');
            } else {
                console.log('outch');
                this.health--;
            }
            attack = false;
        }
    }


    get playerColor() {
        return this.color;
    }
}

const playerOne = new Player('red');
const playerTwo = new Player('yellow');

players.push(playerOne);
players.push(playerTwo);

let defineStartPlayer = () => {
    i = 0;

    while (i < 2) {
        let playerArr = [randomizer(players), randomizer(players)];

        if (playerArr[0].color != playerArr[1].color) {
            playerOrder.push(playerArr[0]);
            playerOrder.push(playerArr[1]);
            i++;
        }
    }

    currentPlayer = playerOrder[0];
    secondPlayer = playerOrder[1];
}
