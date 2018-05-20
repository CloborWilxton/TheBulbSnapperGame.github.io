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

          console.log("HERO: " + this.X + " " + this.Y);

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
        super (X, Y, moveSpeed, health);
        this.isCharging = false;
        this.timeElapsed = performance.now ();
      }

      movementHandler ()
      {
        if ((performance.now () - this.timeElapsed) > 5000)
        {
          this.timeElapsed = performance.now ()
          this.changeCharging ();
        }
        if (this.isCharging == true)
        {
          this.move (3);
        }
        else
        {
          this.move (0);
        }
        this.checkForOverlap ();
      }

      move (movementModifier)
      {
        var movement = this.moveSpeed + movementModifier;
        console.log("ENEMY: " + this.X + " " + this.Y);
        if ((hero.X - this.X) > 0)
        {
          this.X += movement;
        }
        else
        {
          this.X -= movement;
        }
        if ((hero.Y - this.Y) > 0)
        {
          this.Y += movement;
        }
        else
        {
          this.Y -= movement;
        }
      }

      checkForOverlap ()
      {
        if (this.checkForOverlapX () && this.checkForOverlapY ())
        {
          hero.health -= 1;
        }
      }

      checkForOverlapX ()
      {
        if ((enemy.X + 32) > hero.X && (enemy.X + 32) < (hero.X + 32) || (hero.X + 32) > enemy.X && (hero.X + 32) < (enemy.X + 32) )
        {
          return true
        }
      }

      checkForOverlapY ()
      {
        if ((enemy.Y + 32) > hero.Y && (enemy.Y + 32) < (hero.Y + 32) || (hero.Y + 32) > enemy.Y && (hero.Y + 32) < (enemy.Y + 32) )
        {
          return true
        }
      }

      changeCharging ()
      {
        console.log ("CHANGED");
        this.isCharging = (!this.isCharging);
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
var hero = new Hero (234, 234, 2, 500);
console.log (hero.health);
var enemy = new Enemy (100, 100, .75, 50);
var bullet = new Bullet ();

function draw ()
{
    var c = canvas.getContext("2d");
    drawBasics (c);
    if (hero.health <= 0)
    {
      c.fillText ("GAME OVER REFRESH BROWSER TO RESTART", 0, 250);
    }
    else {
    c.drawImage(heroImage, hero.X, hero.Y);
    c.drawImage(enemyImage, enemy.X, enemy.Y);
    c.fillStyle = "yellow;"
    c.fillText(hero.health, hero.X, hero.Y);
    c.fillText(" " + enemy.health, enemy.X, enemy.Y);
      if (bullet.shotFired == true)
      {
          c.fillStyle = "orange";
          c.fillRect(bullet.X, bullet.Y, bullet.width, bullet.height);
      }
    }

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
}

onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    keyArray[e.keyCode] = e.type == 'keydown';
}

window.onload = function ()
{
    draw ();
    var framesPerSecond = 60;
    setInterval (function () { draw (), hero.move (), enemy.movementHandler (),
      bullet.manageBullet () }, 1000/framesPerSecond);
}
