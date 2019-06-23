class Asteroid {
  constructor(x, y, speedX, speedY, size, canvas, canvasContext, img) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.size = size;
    this.set = false;
    this.canvas = canvas;
    this.ctx = canvasContext;
    this.img = img;
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  update() {
    this.move();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size / 2, 0, 2 * Math.PI, false);
    // this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
    //this.ctx.drawImage(this.img, this.x, this.y, this.size / 2, this.size / 2);
  }

  remove() {
    if (this.x > this.canvas.width ||
      this.x + this.size < 0 ||
      this.y > this.canvas.height ||
      this.y + this.size < 0) {
        return true;
      }
    return false;
  }
}