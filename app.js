var readlineSync = require('readline-sync');

var ranNumInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var Shopper = function (name, hp, cart) {
    this.name = name;
    this.hp = hp || 100;
    this.cart = [];
    this.print = function () {
        console.log("Name: " + this.name + " HP: " + this.hp);
        console.log("Cart: " + this.cart);
    }
};

var Enemy = function (type, hitPoints) {
    this.type = type;
    this.hitPoints = hitPoints;
    this.print = function () {
        console.log("The " + this.type + " has appeard and has a dirty score of " + this.hitPoints);
    }
};

var genWalPeep = function () {
    var enemyTypes = ["Harry Butt Crack Guy", "Sneezy McSprayer", "Stinky Minky"];
    var randomType = enemyTypes[ranNumInRange(0, enemyTypes.length - 1)];
    var randomHitPoints = 0;
    if (randomType === "Harry Butt Crack Guy") {
        randomHitPoints = ranNumInRange(80, 100);
    } else if (randomType === "Sneezy McSprayer") {
        randomHitPoints = ranNumInRange(50, 79);
    } else {
        randomHitPoints = ranNumInRange(20, 49);
    }
    var randomEnemy = new Enemy(randomType, randomHitPoints);
    return randomEnemy;
};


console.log("You are on your way to a child's birthday party and you realized that you forgot the gift at home. Home is over an hour away now and don't have time to go back. Just ahead you see the terrifying and tantilizing letters of blue and yellow. It's your only option. You will brave the people of WAL-MART to find the gift you seek? ");


var name = readlineSync.question("What should I call you? ");
var user = new Shopper(name);

console.log("Ok " + user.name + " enter 's' to shop around or 'p' to print your status.");

while (true) {
    var question = readlineSync.question(">> ");
    var input = question.toLowerCase();
    if (input === "s") {
        var chance = ranNumInRange(0, 100);
        if (chance >= 50) {
            var monster = genWalPeep();
            monster.print();
            while (user.hp > 0 && monster.hitPoints > 0) {
                console.log("Do you want to lysol or flee?");
                var input = readlineSync.question(">>");
                if (input == "lysol") {
                    var damage = ranNumInRange(20, 68);
                    monster.hitPoints -= damage;
                    console.log("You hit " + monster.type + " for " + damage + " points");
                } else {
                    var flee = ranNumInRange(1, 2);
                    if (flee == 1) {
                        console.log("You got away without contamination!!");
                        break;
                    }
                }
                var monsterAttack = ranNumInRange(10, 25);
                user.hp -= monsterAttack;
                console.log("The " + monster.type + " got " + monsterAttack + " cooties on you.");
            }
            if (monster.hitPoints <= 0) {
                user.cart.push("Lysol");
                console.log("The " + monster.type + " is clean")
                console.log("You get a new lysol can in your cart.")
            };

            if (user.cart.length >= 3) {
                console.log("Congratulations!! You have survived the people of WAL-Mart.");
                break;
            }

            if (user.hp <= 0) {
                console.log("Now you got the MRSA  :( ");
                break;
            };
            console.log("Enter 's' to shop around or 'p' to print your status.");

        } else {
            console.log("Shop on.")
        }
    } else if (input == "p") {
        user.print();
        console.log("Enter 's' to shop around or 'p' to print your status.");
    }
};