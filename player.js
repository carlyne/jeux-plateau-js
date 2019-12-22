const players = [];
const playerOrder = [];

class Player {
    constructor(color) {
        this.move = 4;
        this.health = 100;
        this.gun = "none";
        this.color = color;
        this.active = false;
        this.x = null;
        this.y = null;
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.spanPlayer = document.createElement('span');
        this.spanPlayer.classList.add('player');
        this.spanPlayer.style.backgroundColor = this.color;
    }

    newTurn() {
        this.active = true;
        this.spanPlayer.classList.add('playing');
    }

    endTurn() {
        this.active = false;
        this.spanPlayer.classList.remove('playing');
    }

    moveCost() {
        if (this.move > 0) {
            this.move -= 1;
        } else {
            console.log("can't move anymore")
        }
    }

    movePlayer() {
        if (this.up) {
            this.x -= 1;
        }
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
