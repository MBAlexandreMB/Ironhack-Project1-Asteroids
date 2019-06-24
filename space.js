class Space {
  constructor () {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 800;
    this.canvas.height = 550;
    this.ctx = this.canvas.getContext('2d');
    this.img = new Image();
  }

  bigBang() {
    let div = document.createElement('div');
    this.canvas.style.border = '1px solid black';
    this.canvas.style.margin = '0 auto';
    div.appendChild(this.canvas);
    this.img.src = './images/Asteroid-Belt.jpg';
    this.img.onload = () => {
      document.querySelector('body').appendChild(div);
    }
  }

  wipeOut() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  setBackground() {
    this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
  }

  setLines() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'yellow';
    this.ctx.moveTo(0, 100);
    this.ctx.lineTo(this.canvas.width, 100);
    this.ctx.moveTo(0, 200);
    this.ctx.lineTo(this.canvas.width, 200);
    this.ctx.moveTo(0, 300);
    this.ctx.lineTo(this.canvas.width, 300);
    this.ctx.moveTo(0, 400);
    this.ctx.lineTo(this.canvas.width, 400);
    this.ctx.moveTo(100, 0);
    this.ctx.lineTo(100, this.canvas.height);
    this.ctx.moveTo(200, 0);
    this.ctx.lineTo(200, this.canvas.height);
    this.ctx.moveTo(300, 0);
    this.ctx.lineTo(300, this.canvas.height);
    this.ctx.moveTo(400, 0);
    this.ctx.lineTo(400, this.canvas.height);
    this.ctx.moveTo(500, 0);
    this.ctx.lineTo(500, this.canvas.height);
    this.ctx.moveTo(600, 0);
    this.ctx.lineTo(600, this.canvas.height);
    this.ctx.moveTo(700, 0);
    this.ctx.lineTo(700, this.canvas.height);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}