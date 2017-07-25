var tileSizeX = 101;
var tileSizeY = 83;

var score = 0;

var Drawable = function() {};

Drawable.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Drawable.prototype.getRow = function() {
    return Math.ceil(this.y / tileSizeY);
};

// Enemies our player must avoid
var Enemy = function(locY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    Drawable.call(this);
    this.sprite = 'images/enemy-bug.png';
    this.x = -tileSizeX;
    this.y = locY*tileSizeY - .33*tileSizeY;
    this.speed = this.newSpeed();
};

Enemy.prototype = Object.create(Drawable.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
    if(this.x > tileSizeX * 5) {
        this.x = -tileSizeX;
        this.speed = this.newSpeed();
    }
};

Enemy.prototype.newSpeed = function() {
    return Math.floor(Math.random() * (500 - 200)) + 200;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    Drawable.call(this);
    this.sprite = 'images/char-boy.png';
    this.x = 2*tileSizeX;
    this.y = 5*tileSizeY - .5*tileSizeY;
}

Player.prototype = Object.create(Drawable.prototype);
Player.prototype.constructor = Player;

Player.prototype.handleInput = function(input) {
    var shift = [0, 0];
    switch (input) {
        case 'left':
            shift = [-tileSizeX, 0];
            break;
        case 'right':
            shift = [tileSizeX, 0];
            break;
        case 'up':
            shift = [0, -tileSizeY];
            break;
        case 'down':
            shift = [0, tileSizeY];
            break;
        default:
            return;
    }
    this.update(shift[0], shift[1]);
};

Player.prototype.update = function(dX, dY) {
    var newX = this.x + dX;
    if (newX <= 0) {this.x = 0;}
    if (newX > 0 && newX < 5*tileSizeX) {
        this.x = newX;
    }

    var newY = this.y + dY;
    if (newY < 0) {
        player = new Player();
        score += 10;
    }
    if (newY > 0 && newY < 5*tileSizeY) {
        this.y = newY;
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(1), new Enemy(2), new Enemy(3)];
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
