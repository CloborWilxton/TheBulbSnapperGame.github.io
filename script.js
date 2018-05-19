var heroImage = document.createElement("IMG");
heroImage.src = 'Assets/hero.png';
var enemyImage = document.createElement("IMG");
enemyImage.src = 'Assets/Enemy.jpg'
var keyArray = [];
var textPos1 = 10;

// for Hero X = 234, y = 234, moveSpeed = 2, movementY = 0, movementX = 0
class GameCharacter {
    constructor (X, Y, moveSpeed, health)
    {
    this.X = X;
    this.Y = Y;
    this.moveSpeed = moveSpeed;
    this.movementX = 0;
    this.movementY = 0;
    this.health = health;
    }
}


class Hero extends GameCharacter {
      constructor (X, Y, moveSpeed, health)
      {
        super (X, Y, moveSpeed, health)
      }

      move ()
      {

          console.log(this.X + " " + this.Y);

          this.moveX ();
          this.moveY ();

      }

      moveY ()
      {
          if (keyArray[87] == true && this.Y > 0)
          {
              console.log ("W presssed");
              this.Y -= this.moveSpeed;
              this.movementY = (-1);
          }
          else if (keyArray[83] == true && this.Y < canvas.height - 32)
          {
              console.log ("S pressed");
              this.Y += this.moveSpeed;
              this.movementY = 1;
          }
          else
          {
              this.movementY = 0;
          }
      }

      moveX ()
      {
          if (keyArray[68] == true && this.X < canvas.width - 32)
          {
              console.log ("D pressed");
              this.X += this.moveSpeed;
              this.movementX = 1;
          }
          else if (keyArray[65] == true && this.X > 0)
          {
              console.log ("A pressed");
              this.X -= this.moveSpeed;
              this.movementX = (-1);
          }
          else
          {
              this.movementX = 0;
          }
      }
}

class Enemy extends GameCharacter {

      constructor (X, Y, moveSpeed, health)
      {
        super (X, Y, moveSpeed, health)
      }

      movementHandler ()
      {
        this.move ();
      }

      move ()
      {
        if ((hero.X - this.X) > 0)
        {
          this.X += this.moveSpeed;
        }
        else
        {
          this.X -= this.moveSpeed;
        }
        if ((hero.Y - this.Y) > 0)
        {
          this.Y += this.moveSpeed;
        }
        else
        {
          this.Y -= this.moveSpeed;
        }

      }


}

class Bullet {

    constructor ()
    {
    this.X = 100;
    this.Y = 100;
    this.moveSpeed = 4;
    this.height = 16;
    this.width = 16;
    this.shotFired = false;
    this.shotDirectionX = 0;
    this.shotDirectionY = 0;
    }

    checkForShot ()
    {
        if (keyArray [39] == true)
        {
            this.shotFired = true;
            this.X = hero.X;
            this.Y = hero.Y;
            this.shotDirectionX = hero.movementX;
            this.shotDirectionY = hero.movementY;
        }
        if (keyArray [37] == true)
        {
          this.shotFired = false;
        }
    }

    moveShot ()
    {
        if (this.shotFired == true)
        {
            if (this.X < 0 || this.X > canvas.width - this.width)
            {
                this.shotDirectionX *= (-1);
            }
            if (this.Y < 0 || this.Y > canvas.height - this.height)
            {
                this.shotDirectionY *= (-1);
            }
            this.X += (this.moveSpeed * this.shotDirectionX);
            this.Y += (this.moveSpeed * this.shotDirectionY);
        }
    }

    manageBullet ()
    {
        this.checkForShot ();
        this.moveShot ();
    }
}

var canvas = document.getElementById("gameCanvas");
var hero = new Hero (234, 234, 2, 100);
console.log (hero.health);
var enemy = new Enemy (100, 100, .75, 50);
var bullet = new Bullet ();

function draw ()
{
    var c = canvas.getContext("2d");
    drawBasics (c);
    c.drawImage(heroImage, hero.X, hero.Y);
    c.drawImage(enemyImage, enemy.X, enemy.Y);

    if (bullet.shotFired == true)
    {
        c.fillStyle = "orange";
        c.fillRect(bullet.X, bullet.Y, bullet.width, bullet.height);
    }

    console.log("Canvas Drawn")
}

function drawBasics (c)
{
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    c.fillStyle = "blue";
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.font = "16px Arial";
    c.fillStyle = "yellow";
    c.fillText("WASD to move and right arrow key to shoot!", textPos1, 50);
    c.fillText(hero.health, hero.X, hero.Y);
    c.fillText(" " + enemy.health, enemy.X, enemy.Y);
}

onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    keyArray[e.keyCode] = e.type == 'keydown';
}

window.onload = function ()
{
    draw ();
    var framesPerSecond = 60;
    setInterval (function () { draw (); hero.move (), enemy.movementHandler (),
      bullet.manageBullet () }, 1000/framesPerSecond);
}
