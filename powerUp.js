class PowerUp {
  constructor (x, y, speedX, speedY, type, img, canvasContext, canvas) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.size = 25;
    this.img = img;
    this.ctx = canvasContext;
    this.gameCanvas = canvas;
    this.type = type;
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  update() {
    this.move();
    this.ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
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
}