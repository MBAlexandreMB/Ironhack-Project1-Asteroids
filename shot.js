class Shot {
  constructor(x, y, degree, canvas, canvasContext) {
    this.x = x;
    this.y = y;
    this.degree = degree - 90;
    this.speedX = 10 * Math.cos(this.degree * Math.PI / 180);
    this.speedY = 10 * Math.sin(this.degree * Math.PI / 180);

    this.gameCanvas = canvas;
    this.ctx = canvasContext;
    this.radius = 2;
  }

  update() {
    console.log('entrou');
    this.move();
    this.ctx.beginPath();
    this.ctx.fillStyle = 'blue';
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fill();
    this.ctx.closePath();
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  remove() {
    let r = this.radius * 2;

      if (this.x + r > this.gameCanvas.width ||
        this.x + r < 0 ||
        this.y + r > this.gameCanvas.height ||
        this.y + r < 0) {
          return true;
        }
      return false;
  }
}