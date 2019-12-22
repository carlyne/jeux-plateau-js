const board = document.getElementById('board');
const cells = [];

const mapSize = 10;
let cellId = 0;

class Cell {
    constructor(x, y) {
        this.id = cellId++;
        this.x = x;
        this.y = y;
        this.hasItem = false;
        this.hasPlayer = false;
        this.divCell = document.createElement('div');
        this.divCell.id = `cell-${this.id}`;
        this.divCell.classList.add('cell');
        this.divCell.textContent = `${x},${y}`;
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
    }
    
    removePlayer(player) {
        if (this.divCell.contains(player.spanPlayer)) {
            this.divCell.removeChild(player.spanPlayer);
        }
        this.hasPlayer = false;
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

const randomDisabledCells = (number = 2) => {
    let cellsTargeted = [];
    let counter = 0;

    while (counter < number) {
        counter++;
        cellsTargeted.push(cells[Math.floor(Math.random() * cells.length)]);
    }

    cellsTargeted.forEach(cell => {
        cell.disable();
    })
}

const randomGuns = (number = 4) => {
    let cellsTargeted = []
    let counter = 0;

    while (counter < number) {
        counter++;
        cellsTargeted.push(cells[Math.floor(Math.random() * cells.length)]);
    }

    cellsTargeted.forEach((cell, index) => {
        if (!cell.isDisabled && !cell.hasItem && !cell.hasPlayer) {
            cell.addGun(guns[index]);
        }
    })
}

const randomPlayers = (number = 2) => {
    let cellsTargeted = []
    let counter = 0
    
    while (counter < number) {
        counter++;
        cellsTargeted.push(cells[Math.floor(Math.random() * cells.length)]);
    }
    
    cellsTargeted.forEach((cell, index) => {
        if (!cell.isDisabled && !cell.hasPlayer && !cell.hasItem) {
            cell.addPlayer(players[index]);
        }
    })
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

/* 

obtenir la position du joueur :

> le joueur apparait aléatoirement dans une cellule
> je cible la cellule qui contient le joueur
> je récupère la position x de ma cellule
> je récupère la position y de ma cellule
> je définie les valeur x et y du joueur en fonction de ma cellule








comportement cellule :

je veux modifier :
- le contenu html pour rendre une case occupée ou libre


je veux savoir :
- si la case est libre ou occupée
- la position x de ma case
- la position y de ma case

si les id des joueurs sont sur des y x adjacents le bouton fight apparait


board :

- initialisation aléatoire des cases occupées par des joueurs

Interface (4):
le bouton passe tour est appellé "start" et s'appelle passe tour uniquement une fois que "start" a été passé

lorsque bouton passe tour s'active, le joeur est indiqué comme actif ou non.

si joueurs adjacents, apparition de boutons "fight" et "protect". fight permet d'infliger des degats, protect porpose un bonus de -50% ax degats reçus.

une fois qu'un joueur a perdu, texte "fin de la partie" le texte bouton passe tour change en "start"


en fonction de l'arme le jour inflige x degats, l'autre joueurs perd le nb de points de vie en dégats (ou seulement 50% si protect a été enclenché)

si vie = 0 le joueur perd et met fin à la partie


*/
