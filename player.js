const players = [];

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

    playerTurn() {
        this.active = true;
        this.spanPlayer.classList.add('playing');
    }
    
    playerEndTurn() {
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

/* 
> si le player a bougé en haut, delete span de la cellule et has player = false
> sur la cellule +y, créer le span dans cette cellule
> 

*/
