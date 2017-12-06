// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 400) + 100);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt; // multiplication by the dt parameter, same speed for all computers
    if (this.x > 480) { // if and when a bug reaches the right edge
        this.x = -50; // new bug appears on left edge
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

function randomSpeed(min, max) { // fixed the indentation
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
    this.sprite = 'images/char-princess-girl.png';
    this.x = x;
    this.y = y;
    this.lives = lives;
    this.score = score;
};

// This class requires an update(), render() and
// a handleInput() method.

// when reaching water, colliding with bug, collecting a star
Player.prototype.update = function () { // UPDATE
    if (this.y <= 50) { // when player reaches edge of water
        this.y = 303; // player's position on vertical axis is reset
        this.score += 10; // user's score inscreases
    }
};

// player is drawn on the screen
Player.prototype.render = function () { // RENDER
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    this.drawText(); // score is shown above canvas
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

for (var i = 0; i < 3; i++) { // ok so how did i TOTALLY miss I had an l instead of a semicolon here lolol
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

/* GEM */

// appearance and starting position

var Gem = function () {
    this.sprite = 'images/Gem Orange.png';
    this.x = colWidth * Math.random() * (5);
    this.y = rowHeight * Math.random() * (5 - 1) - 10;
};

// starting position and location reset after collision
var colWidth = 101,
    rowHeight = 83;

Star.prototype.update = function (low, high) {
    this.collection();
};

// how the stars are drawn
Star.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// collectible star object
var Star = new Star();

//colision method that works for enemies and stars, all variables
Player.prototype.collide = function (b) {
    return this.x < (b.x + 50) &&
        (this.x + 50) > b.x &&
        this.y < (b.y + 50) &&
        (this.y + 50) > b.y;
};

// user score and player live on collision with an enemy bug
Player.prototype.collision = function () {
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.collide(allEnemies[i])) {
            this.lives -= 1; // lose a life
            this.y = 303; // vertical location is reset
        }
    }
};

if (this.score % 15 === 0 &&
    this.lives === 0) {
    alert('SCORE IS A MULTIPLE OF 15 - ' +
        'EXTRA LIFE & BONUS POINSTS!');
    this.lives += 1; // gain bonus life
    this.score += 5; // gain bonus points
    this.y = 303; // vertical location reset
};

// user score increase when player collides with a star
Player.prototype.collection = function () {
    if (this.collide(star)) {
        this.score = +5;
    }
};

var Star = function () { // defining star ? is this similar to line 166?
        // here goes.... something, i think
    }
    // star relocation after collection
Star.prototype.collection = function () {
    if (this.collide(player)) {
        this.x = colWidth * random(0, 5);
        this.y = rowHeight * random(1, 3) - 11;
    }
};

// document ????
Player.prototype.drawText = function () {
    ctx.fillStyle = '#333333';
    ctx.font = '30px Boogaloo';
    ctx.clearRect(0, 0, 160, 40);
    ctx.fillText('Score ' + this.score, 10, 30);
    ctx.clearRect(420, 0, 160, 40);
    ctx.fillText('Lives ' + this.lives, 10, 30);
    ctx.font = 'bold 12px Arial';
    ctx.clearRect(0, 601, 505, 656);
    ctx.fillText('Use the arrow keys to move your player.' + 'Get 10 points for reachingthe water and', 0, 611);
    ctx.fillText('5 points for collecting a star' +
        'Test your luck to get extra lives and points. Good luck!', 0, 631);
};

//blue background color behind the game canvas
document.body.style.backgroundColor = '#1ac6ff';
