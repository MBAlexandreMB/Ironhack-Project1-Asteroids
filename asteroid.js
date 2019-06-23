class Asteroid {
  constructor(x, y, speedX, speedY, size, canvasContext) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.size = size;
    this.set = false;
    this.ctx = canvasContext;
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  update() {
    this.move();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size / 2, 0, 2 * Math.PI, false);
    this.ctx.fill();
    this.ctx.closePath();
  }




}