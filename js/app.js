// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 350) + 120);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt; // multiply all movement by the dt parameter
    if (this.x > 480) {
        this.x = -50;
        this.speed = randomSpeed();
    } else {
        this.x = this.x += this.speed * dt;
    }

    if (player.x + 70 >= this.x &&
        player.x <= this.x + 70 &&
        player.y + 50 <= this.y + 100 &&
        player.y + 100 >= this.y + 50
    ) {
        player.resetPosition();
    }
};

function randomSpeed(min, max) {
    min = 50;
    max = 400;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function (x, y, lives, score) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
    this.lives = lives;
    this.score = score;
};
// This class requires an update(), render() and
// a handleInput() method.

//func for when player bumps into a bug, makes to to the water, or gains a star
Player.prototype.update = function () {
    if (this.y <= 50) { // when the player makes it to the water,
        this.y = 303; // their position on y axis is reset to the starter position and,
        this.score += 10; // their points increase
    }
};

// player is printed to the screen
Player.prototype.render = function () { // RENDER
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    this.drawText(); // score is printed above canvas
    this.collision();

};

Player.prototype.handleInput = function (key) { // HANDLEINPUT
    switch (key) {
        case 'left':
            if (this.x === 0) {
                this.x = 0;
            } else {
                this.x -= 101;
                console.log("left", this.x, this.y);
            }
            break;

        case 'right':
            if (this.x === 400) {
                this.x += 400;
            } else {
                this.x += 101;
                console.log("right", this.x, this.y);
            }
            break;

        case 'up':
            if (this.y === 60) {
                this.resetPosition();
            } else {
                this.y = -83;
                console.log("up", this.x, this.y);
            }
            break;

        case 'down':
            if (this.y === 392) {
                this.y = 392;
            } else {
                this.y += 83;
                console.log("down", this.x, this.y);
            }
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [];

for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy(-50, 60 + (83 * i), randomSpeed())); //60
}

// Place the player object in a variable called player

var player = new Player(200, 392);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
