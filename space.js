class Space {
  constructor () {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 800;
    this.canvas.height = 550;
    this.ctx = this.canvas.getContext('2d');
  }

  bigBang() {
    let div = document.createElement('div');
    this.canvas.style.border = '1px solid black';
    this.canvas.style.margin = '0 auto';
    div.appendChild(this.canvas);
    document.querySelector('body').appendChild(div);
  }

  wipeOut() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}