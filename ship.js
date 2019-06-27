class Ship {
  constructor(x, y, canvas, canvasContext, image) {
    this.x = x;
    this.y = y;

    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 3;
    this.speedingUp = false;

    this.degree = 0;
    this.turnSpeed = 0;
    this.maxTurnSpeed = 15;
    
    this.width = 25;
    this.height = 25;

    this.gameCanvas = canvas;
    this.ctx = canvasContext;
    this.img = image;
    this.inertiaInterval = 0;

    this.sizeX = this.width / 2;
    this.sizeY = this.height / 2;

    this.gun = 3;
  }
  
  update() {
    this.move();
    this.ctx.save();    
    this.ctx.translate(this.x - 12.5, this.y - 12.5);
    this.ctx.rotate(this.degree * Math.PI / 180);

    if (this.speedingUp === false) {
      this.ctx.drawImage(this.img[0],  -12.5, -12.5, this.width, this.height);
    } else {
      this.ctx.drawImage(this.img[1], -12.5, -12.5, this.width, this.height + game.shipChangeFactor);
    }

    this.ctx.restore();
  }
  
  move() {
    this.y += this.speedY;
    this.x += this.speedX;
    
    // Mapa infinito
    if (this.x + this.width < 0) {
      this.x = this.gameCanvas.width;
    } else if (this.x > this.gameCanvas.width) {
      this.x = 0 - this.width;
    }
    
    if (this.y + this.height < 0) {
      this.y = this.gameCanvas.height;
    } else if (this.y > this.gameCanvas.height) {
      this.y = 0 - this.height;
    }
    
  }
  
  fireTurnThruster(value) {
    if(this.turnSpeed + value >= this.maxTurnSpeed) {
      this.turnSpeed = this.maxTurnSpeed; 
    } else if (this.turnSpeed + value <= -this.maxTurnSpeed) {
      this.turnSpeed = -this.maxTurnSpeed;
    } else { 
      this.turnSpeed += value;
    }

    this.degree += this.turnSpeed;
  }
  
  fireThruster(value) {
    this.speedingUp = true;
    let radian = this.degree * Math.PI / 180;
    let seno = Math.sin(radian);
    let cosseno = Math.cos(radian);
    
    if(this.speedX + value * seno >= this.maxSpeed) {
      this.speedX = this.maxSpeed; 
    } else if (this.speedX + value * seno <= -this.maxSpeed) {
      this.speedX = -this.maxSpeed;
    } else { 
      this.speedX += value * seno;
    }
    
    if(this.speedY + value * -cosseno >= this.maxSpeed) {
      this.speedY = this.maxSpeed; 
    } else if (this.speedY + value * -cosseno <= -this.maxSpeed) {
      this.speedY = -this.maxSpeed;
    } else { 
      this.speedY += value * -cosseno;
    }
  }
  
  inertia() {
    this.speedingUp = false;
    this.turnSpeed = 0;
  }

  checkForImpact(asteroid) {
    let x = this.x - 12.5;
    let y = this.y - 12.5;
    let astXSized = asteroid.x + asteroid.size;
    let astYSized = asteroid.y + asteroid.size;

    if (x + 12.5 > asteroid.x && x - 12.5 < astXSized) {
      if(y + 12.5 < astYSized && y - 12.5 > asteroid.y) {
        this.ctx.strokeStyle = 'yellow';
        this.ctx.strokeRect(asteroid.x, asteroid.y, asteroid.size, asteroid.size);
        return true;
      }
    }
  
    return false;
  }

  checkForPowerUp(pwrUp) {
    let x = this.x - 12.5;
    let y = this.y - 12.5;
    let puXSized = pwrUp.x + pwrUp.size;
    let puYSized = pwrUp.y + pwrUp.size;

    if (x - 12.5 < puXSized && x + 12.5 > pwrUp.x) {
      if (y - 12.5 < puYSized && y + 12.5 > pwrUp.y) {
        this.gun = pwrUp.type;
        return true;
      }
    }
    return false;
  }

  pewPewPew(shotSound) {
    shotSound.pause();
    shotSound.currentTime = 0;
    shotSound.play();
    switch(this.gun) {
      case 0:
          game.shots.push(new Shot(this.x - 12.5, this.y - 12.5, this.degree, this.gameCanvas, this.ctx, this.gun));

          game.shots.push(new Shot(
            this.x - 12.5, 
            this.y - 12.5, 
            this.degree, 
            this.gameCanvas, 
            this.ctx, 
            this.gun, 
            5 * Math.cos((this.degree + 90) * Math.PI / 180), 
            5 * Math.sin((this.degree + 90) * Math.PI / 180)
            ));
        break;
      case 1:
          game.shots.push(new Shot(this.x - 12.5 - 10, this.y - 12.5, this.degree, this.gameCanvas, this.ctx, this.gun));

          game.shots.push(new Shot(this.x - 12.5 + 10, this.y - 12.5, this.degree, this.gameCanvas, this.ctx, this.gun));
        break;
      case 3: 
      default:
          game.shots.push(new Shot(this.x - 12.5, this.y - 12.5, this.degree, this.gameCanvas, this.ctx, this.gun));
        break;
    }
  }
}