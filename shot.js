class Shot {
  constructor(x, y, degree, canvas, canvasContext, gunType, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.degree = degree - 90;
    this.speedX = speedX || 5 * Math.cos(this.degree * Math.PI / 180);
    this.speedY = speedY || 5 * Math.sin(this.degree * Math.PI / 180);
    this.type = gunType;

    this.gameCanvas = canvas;
    this.ctx = canvasContext;
    this.radius = 3;
  }

  update() {
    this.move();
    switch(this.type) {
      case 0:
        this.frontNBackShot();
        break;
      case 1:
        this.doubleShot();
        break;
      case 3: 
      default:
        this.simpleShot();
        break;
    }
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

  simpleShot() {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'blue';
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fill();
    this.ctx.closePath();
  }

  doubleShot() {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'green';
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fill();
    this.ctx.closePath();
  }

  frontNBackShot(){
    this.ctx.beginPath();
    this.ctx.fillStyle = 'yellow';
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fill();
    this.ctx.closePath();
  }
}