class Asteroid {
  constructor(x, y, speedX, speedY, size, canvas, canvasContext, img) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.size = size;
    this.set = false;
    this.gameCanvas = canvas;
    this.ctx = canvasContext;
    this.img = img;
  }
  
  move() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  
  update() {
    this.move();
    this.ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
    // this.ctx.beginPath();
    // this.ctx.arc(this.x, this.y, this.size / 2, 0, 2 * Math.PI, false);
    // // this.ctx.fill();
    // this.ctx.stroke();
    // this.ctx.closePath();
  }
  
  remove() {
    if (this.x > this.gameCanvas.width ||
      this.x + this.size < 0 ||
      this.y > this.gameCanvas.height ||
      this.y + this.size < 0) {
        return true;
      }
      return false;
    }
    
    breakInHalf() {
      if (this.size >= 70) {
        game.asteroidSound.pause();
        game.asteroidSound.currentTime = 0;
        game.asteroidSound.play();
        return true;
      }
      return false;
    }
    
    checkShot(shot) {   
      if (this.x < shot.x && this.x + this.size > shot.x) {
        if (this.y < shot.y && this.y + this.size > shot.y) {
          return true;
        }
      }
      return false;
    }
  }