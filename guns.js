const guns = [];

class Gun {
    constructor(name, damage, color) {
        this.x = 0;
        this.y = 0;
        this.color = color;
        this.damage = damage;
        this.name = name;
        this.spanGun = document.createElement('span');
        this.spanGun.id = this.name;
        this.spanGun.classList.add('guns');
        this.spanGun.style.backgroundColor = this.color;
    }
}

const basicGun = new Gun('basic-gun', 5, 'grey');
const justAGun = guns.push(new Gun('just-a-gun', 10, 'green'));
const goodGun = guns.push(new Gun('good-gun', 15, 'blue'));
const betterGun = guns.push(new Gun('better-gun', 30, 'purple'));
const mustHaveGun = guns.push(new Gun('must-have-gun', 50, 'orange'));