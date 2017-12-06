// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // The enemies reset every time one of them moves off of the canvas
    if (this.x > 506) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 508);
    }

    // This function controls what happens when the player runs into an enemy
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        player.x = 200;
        player.y = 400;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.speed = speed;

};

Player.prototype.update = function (dt) {
    //Blocks the player from moving out of bounds
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // function to monitor when the player was successful
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
    }

};

// Draw the player on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle user input for controlling the player
Player.prototype.handleInput = function (keyStroke) {
    switch (keyStroke) {
        case 'left':
            this.x -= this.speed + 20;
            break;
        case 'up':
            this.y -= this.speed + 40;
            break;
        case 'right':
            this.x += this.speed + 20;
            break;
        case 'down':
            this.y += this.speed + 10;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// Sets the enemy's position
var enemyPosition = [50, 150, 210];
var player = new Player(200, 380, 50);
var enemy;

enemyPosition.forEach(function (posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 500));
    allEnemies.push(enemy);
});

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
