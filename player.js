const players = [];
const playerOrder = [];

class Player {
    constructor(color) {
        this.move = 3;
        this.health = 100;
        this.gun = "none";
        this.color = color;
        this.active = false;
        this.x = null;
        this.y = null;
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

    moveOn(direction) {

        if (this.move > 0 && this.active) {
            this.move -= 1;

            switch (direction) {
                case 'up':
                    this.x --;
                    break;
                case 'right' :
                    this.y ++;
                    break;
                case 'down':
                    this.x ++;
                    break;
                case 'left':
                    this.y --;
                    break;
                default:
                    console.log('wrong type');
            }
            
        } else {
            console.log("no player or can't move anymore")
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
