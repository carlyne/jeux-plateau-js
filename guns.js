const guns = [];

class Gun {
    constructor(name, damage, color) {
        this.x = 0;
        this.y = 0;
        this.color = color;
        this.damage = damage;
        this.name = name;
        this.spanGun = document.createElement('span');
        this.spanGun.id = this.id;
        this.spanGun.classList.add('guns');
        this.spanGun.style.backgroundColor = this.color;
    }
}

const justAGun = guns.push(new Gun('Just a Gun', 10, 'green'));
const goodGun = guns.push(new Gun('Good Gun', 15, 'blue'));
const betterGun = guns.push(new Gun('Better Gun', 30, 'purple'));
const mustHaveGun = guns.push(new Gun('Must have Gun', 50, 'orange'));