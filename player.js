const players = [];
const playerOrder = [];

class Player {
    constructor(color) {
        this.id = null;
        this.move = 3;
        this.translate = 0;
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

    /*moveOn(direction) {

        if (this.move > 0) {
            switch (direction) {
                case 'up':
                    if (this.canMove) {
                        this.x--;
                    } else {
                        this.x -= 2;
                        this.canMove = true;
                    }
                    break;

                case 'right':
                    if (this.canMove) {
                        this.y++;
                    } else {
                        this.y += 2;
                        this.canMove = true;
                    }
                    break;

                case 'down':
                    if (this.canMove) {
                        this.x++;
                    } else {
                        this.x += 2;
                        this.canMove = true;
                    }

                    break;

                case 'left':
                    if (this.canMove) {
                        this.y--;
                    } else {
                        this.y -= 2;
                        this.canMove = true;
                    }
                    break;

                default:
                    console.log('wrong type');
            }

            if (this.stepCounter) {
                this.move--;
            }

        } else {
            console.log("no player or can't move anymore")
        }
    }*/

    moveUp() {
        if (this.translate <= 0) {
            this.translate -= cellSize;
            
            this.spanPlayer.style.transform = `translateY(-${Math.abs(this.translate)}px)`;
            
            console.log('up: ' + this.translate);
            
        } else {
            this.translate -= cellSize;
            
            this.spanPlayer.style.transform = `translateY(${this.translate}px)`;
            
            console.log('up0: ' + this.translate);
        }
        
        this.id -= mapSize;
        
    }
    
    moveDown() {
        if (this.translate < 0) {
            this.translate += cellSize;
            
            this.spanPlayer.style.transform = `translateY(-${Math.abs(this.translate)}px)`;
            
            console.log('down: ' + Math.abs(this.translate));
            
        } else {
            this.translate += cellSize;
            
            this.spanPlayer.style.transform = `translateY(${this.translate}px)`;
            
            console.log('down0: ' + this.translate);
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
