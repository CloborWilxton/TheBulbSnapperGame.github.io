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

          //console.log("HERO: " + this.X + " " + this.Y);

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
        if (this.isCharging == false && (performance.now () - this.timeElapsed) > 5000)
        {
          this.timeElapsed = performance.now ()
          this.changeCharging ();
        }
        else if (this.isCharging == true && (performance.now () - this.timeElapsed) > 500)
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
        /*this.checkForOverlap ();
        this.takeDamage ();*/
      }

      move (movementModifier)
      {
        var movement = this.moveSpeed + movementModifier;
        //console.log("ENEMY: " + this.X + " " + this.Y);
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

      checkForOverlap (arrayIndex)
      {
        if (this.checkForOverlapX (arrayIndex) && this.checkForOverlapY (arrayIndex))
        {
          hero.health -= 1;
        }
      }

      checkForOverlapX (arrayIndex)
      {
        if ((enemyArray[arrayIndex].X + 32) > hero.X && (enemyArray[arrayIndex].X + 32) < (hero.X + 32) || (hero.X + 32) > enemyArray[arrayIndex].X && (hero.X + 32) < (enemyArray[arrayIndex].X + 32) )
        {
          return true
        }
      }

      checkForOverlapY (arrayIndex)
      {
        if ((enemyArray[arrayIndex].Y + 32) > hero.Y && (enemyArray[arrayIndex].Y + 32) < (hero.Y + 32) || (hero.Y + 32) > enemyArray[arrayIndex].Y && (hero.Y + 32) < (enemyArray[arrayIndex].Y + 32) )
        {
          return true
        }
      }

      takeDamage (arrayIndex)
      {
        if (this.checkForBulletOverlapX (arrayIndex) && this.checkForBulletOverlapY (arrayIndex))
        {
          this.health -= 1;
        }
      }

      checkForBulletOverlapX (arrayIndex)
      {
        if ((bullet.X + 16) > enemyArray[arrayIndex].X && (bullet.X + 16) < (enemyArray[arrayIndex].X + 32) || (enemyArray[arrayIndex].X + 32) > bullet.X && (enemyArray[arrayIndex].X + 32) < (bullet.X + 32) )
        {
          return true
        }
      }

      checkForBulletOverlapY (arrayIndex)
      {
        if ((bullet.Y + 16) > enemyArray[arrayIndex].Y && (bullet.Y + 16) < (enemyArray[arrayIndex].Y + 32) || (enemyArray[arrayIndex].Y + 32) > bullet.Y && (enemyArray[arrayIndex].Y + 32) < (bullet.Y + 32) )
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
    this.X;
    this.Y;
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
        else
        {
          this.X = undefined;
          this.Y = undefined;
        }
    }

    manageBullet ()
    {
        this.checkForShot ();
        this.moveShot ();
    }
}

var canvas;
var hero;
var enemyArray = new Array ();
var bullet;
var roundNumber = 1;

function initializeData ()
{
  canvas = document.getElementById("gameCanvas");
  hero = new Hero (234, 234, 2, 500);
  enemyArray.push(new Enemy (100, 100, .75, 50));
  enemyArray.push(new Enemy (300, 150, 1.25, 50));
  bullet = new Bullet ();
}

function removeDeadEnemies ()
{
  for (var i = 0; i < enemyArray.length; i ++)
  {
    if (enemyArray[i].health <= 0)
    {
    enemyArray[i].X = undefined;
    enemyArray[i].Y = undefined;
    }
  }
}

function enemiesAlive ()
{
  var enemiesLeft;

  for (var i = 0; i < enemyArray.length; i ++)
  {
    if (enemyArray[i].health > 0)
    {
      return true;
    }
  }
  return false;
}

function spawnEnemies ()
{
  if (enemiesAlive () == false)
  {
    roundNumber ++;

    for (var i = 0; i < roundNumber + 2; i ++)
    {
      var X = (Math.random () * canvas.width);
      var Y = (Math.random () * canvas.height);
        if (enemyArray[i] != undefined)
        {
          enemyArray[i] = new Enemy (X, Y, 1, 75);
        }
    }
  }
}

function moveEnemies ()
{
  for (var i = 0; i < enemyArray.length; i ++)
  {
    enemyArray[i].movementHandler ();
    console.log (enemyArray[i].health);
    enemyArray[i].checkForOverlap (i);
    enemyArray[i].takeDamage (i);
  }
}

function draw ()
{
    //console.log (bullet.X + " " + bullet.Y);
    var c = canvas.getContext("2d");
    drawBasics (c);
    if (hero.health <= 0)
    {
      c.fillText ("GAME OVER REFRESH BROWSER TO RESTART", 0, 250);
    }
    else {
    c.drawImage(heroImage, hero.X, hero.Y);
    for (var i = 0; i < enemyArray.length; i ++){
    c.drawImage(enemyImage, enemyArray[i].X, enemyArray[i].Y);
    c.fillText(" " + enemyArray[i].health, enemyArray[i].X, enemyArray[i].Y);
  }
    c.fillStyle = "yellow;"
    c.fillText(hero.health, hero.X, hero.Y);
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
    c.font = "32px Arial";
    c.textAlign = "center";
    c.fillText("Round : " + roundNumber, 350, 250);
    c.textAlign = "left";
    c.font = "16px Arial";
}

onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    keyArray[e.keyCode] = e.type == 'keydown';
}

window.onload = function ()
{
    initializeData ();
    draw ();
    var framesPerSecond = 60;
    setInterval (function () { draw (), hero.move (), bullet.manageBullet (),
      moveEnemies (), removeDeadEnemies (), spawnEnemies () }, 1000/framesPerSecond);
}
