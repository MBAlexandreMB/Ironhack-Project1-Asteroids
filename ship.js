class Ship {
  constructor(x, y, canvas, canvasContext, image) {
    this.x = x;
    this.y = y;
    // Front speed parameters
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 3;
    this.speedingUp = false;
    // Turn parameters
    this.radian = 0;
    this.turnSpeed = 0;
    this.maxTurnSpeed = 0.0475;
    
    this.width = 25;
    this.height = 25;
    this.perimeter = (2 * Math.PI) * (this.width / 2);
    this.gameCanvas = canvas;
    this.ctx = canvasContext;
    this.img = image;
    this.inertiaInterval = 0;
  }
  
  update() {
    this.move();
    this.ctx.save();    
    // move to the center of the canvas
    this.ctx.translate(this.x + this.width / 2 - 13, this.y + this.height / 2 - 13);
    // rotate the canvas to the specified degrees
    this.ctx.rotate(this.radian*Math.PI);
    // draw the image
    // since the ctx is rotated, the image will be rotated also
    if (this.speedingUp === false) {
      this.ctx.drawImage(this.img[0], 0, 0, this.width, this.height);
    } else {
      this.ctx.drawImage(this.img[1], 0, 0, this.width, this.height + 9);
    }
    // if (this.speedingUp === false) {
    //   this.ctx.drawImage(this.img[0], this.x, this.y, this.width, this.height);
    // } else {
    //   this.ctx.drawImage(this.img[1], this.x, this.y, this.width, this.height + 9);
    // }
    // we’re done with the rotating so restore the unrotated ctx
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
    
    // Corrige os degrees
    if (this.radian + this.turnSpeed > 1.99999999) {
      this.radian = 0;
    } else if (this.radian + this.turnSpeed < 0) {
      this.radian = 1.99999999;
    } else {
      this.radian += this.turnSpeed;
    }
  }
  
  fireThruster(value) {
    this.speedingUp = true;
    let radian = this.radian * Math.PI;
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
    //   let stopCounter = 0;
    //   this.inertiaInterval = setInterval(() => {
    //     if (this.speedX > 0) {
    //       this.speedX -= 1;
    //     } else if (this.speedX < 0) {
    //       this.speedX += 1;
    //     } else {
    //       stopCounter += 1;
    //     }
    
    //     if (this.speedY > 0) {
    //       this.speedY -= 1;
    //     } else if (this.speedY < 0) {
    //       this.speedY += 1;
    //     } else {
    //       stopCounter += 1;
    //     }
    
    //     if (stopCounter === 2) {
    //       clearInterval(this.inertiaInterval);
    //     }
    //     console.log(`Sx: ${this.speedX} | Sy: ${this.speedY}`);
    //   }, 15);
    // }  
  }

  checkForImpact(asteroid) {
    let sizeX = this.width / 2;
    let sizeY = this.height / 2;
    let x = this.x + (sizeX * -Math.cos(this.radian));
    let y = this.y - (sizeY * Math.sin(this.radian));

    let astXSized = asteroid.x + asteroid.size;
    let astYSized = asteroid.y + asteroid.size;

    // Se o x + size de um asteroid tocar o x - size da nave
    // Ou se o x de um asteroid tocar o x + size da nave
    if ((x - sizeX < astXSized && x - sizeX > asteroid.x) || 
    (x + sizeX > asteroid.x && x + sizeX < astXSized)) {

      if ((y - sizeY < astYSized && y - sizeY > asteroid.y) || 
      (y + sizeY > asteroid.y && y + sizeY < astYSized)) {
        return true;
      }
    }
    return false;
  }
}