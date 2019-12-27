const players = [];
const playerOrder = [];

class Player {
    constructor(color) {
        this.id = null;
        this.move = 3;
        this.canMove = true;
        this.translateY = 0;
        this.translateX = 0;
        this.health = 100;
        this.gun = "none";
        this.color = color;
        this.active = false;
        this.canMove = true;
        this.stepCounter = true;
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

    detect(nearby) {
        nearby.forEach(near => {   
            if (near.isDisable) {
                this.canMove = false;
            }
        })
    }

    moveUp() {
        if (this.move > 0 && this.canMove) {
            if (this.translateY <= 0) {
                this.translateY -= cellSize;
                this.spanPlayer.style.transform = `translate(${this.translateX}px, -${Math.abs(this.translateY)}px)`;

            } else {
                this.translateY -= cellSize;
                this.spanPlayer.style.transform = `translate(${this.translateX}px, ${this.translateY}px)`;
            }
            this.id -= mapSize;
            this.move--;
        }
    }

    down() {
        if (this.translateY < 0) {
            this.translateY += cellSize;
            this.spanPlayer.style.transform = `translate(${this.translateX}px, -${Math.abs(this.translateY)}px)`;

        } else {
            this.translateY += cellSize;
            this.spanPlayer.style.transform = `translate(${this.translateX}px, ${this.translateY}px)`;
        }
        this.id += mapSize;
    }

    moveRight() {
        if (this.translateX < 0) {
            this.translateX += cellSize;
            this.spanPlayer.style.transform = `translate(-${Math.abs(this.translateX)}px, ${this.translateY}px)`;

        } else {
            this.translateX += cellSize;
            this.spanPlayer.style.transform = `translate(${this.translateX}px, ${this.translateY}px)`;
        }
        this.id += mapSize;
    }

    moveLeft() {
        if (this.translateX < 0) {
            this.translateX -= cellSize;
            this.spanPlayer.style.transform = `translate(-${Math.abs(this.translateX)}px, ${this.translateY}px)`;

        } else {
            this.translateX -= cellSize;
            this.spanPlayer.style.transform = `translate(${this.translateX}px, ${this.translateY}px)`;
        }
        this.id += mapSize;
    }


    get playerColor() {
        return this.color;
    }
}

const playerOne = new Player('red');
const playerTwo = new Player('yellow');

players.push(playerOne);
players.push(playerTwo);

let defineStartPlayer = (number = 2) => {
    i = 0;

    while (i < number) {
        let playerArr = [randomizer(players), randomizer(players)];

        if (playerArr[0].color != playerArr[1].color) {
            playerOrder.push(playerArr[0]);
            playerOrder.push(playerArr[1]);
            i++;
        }
    }

}
