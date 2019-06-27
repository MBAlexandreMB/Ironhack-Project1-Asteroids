class Space {
  constructor () {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 800;
    this.canvas.height = 550;
    this.ctx = this.canvas.getContext('2d');
    this.img = new Image();
    this.img.src = "./images/Asteroid-Belt.jpg"
    this.music = 0;
    this.bhInterval = 0;
    this.loadingMusicOn = false;
  }
  
  bigBang() {
    let div = document.createElement('div');
    div.id = 'canvas';
    this.canvas.style.border = '1px solid black';
    this.canvas.style.margin = '0 auto';
    div.appendChild(this.canvas);
    document.querySelector('body').appendChild(div);
  }
  
  wipeOut() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
  setBackground() {
    this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
  }
  
  printScore(score) {
    this.ctx.beginPath();
    this.ctx.font = "20px Verdana bold";
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(`SCORE: ${score}`, 10, 25);
    this.ctx.closePath();
  }
  
  timeWarp(pause) {
    game.loadingMusic.pause();
    if(game.endGame === false) {
      if (pause === false) {
        clearInterval(game.interval);
        this.ctx.beginPath();
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = "40px Verdana bold";
        this.ctx.fillStyle = 'white';
        this.ctx.fillText('PAUSED', this.canvas.width / 2 - 70, this.canvas.height / 2);
        this.ctx.closePath();
        game.backgroundMusic.pause();
        return false;
      } else {
        game.backgroundMusic.play();
        return setInterval(() => {
          animateIt();
          if (game.frames > 400) {
            game.frames = 0;
          } else {
            game.frames += 1;
          }
        }, 15);
      }
    }
  }
  
  blackHole (score) {
    game.endGame = true;
    keydown = 0;
    keyup = 0;
    let counter = 0;
    this.checkRestartButton();
    this.bhInterval = setInterval(() => {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.font = '30px Verdana';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText(`SCORE: ${score}`, this.canvas.width / 2 - 65, this.canvas.height / 2 - 10);
      this.ctx.closePath();
      counter += 1;
      if(counter >= 5) {
        this.ctx.fillStyle = 'rgb(0, 0, 0)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.drawImage(game.logo, 150, 100, 500, 115);
        this.ctx.font = '30px Verdana';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`SCORE: ${score}`, 335, 267.5);
        this.ctx.closePath();
        
        this.ctx.fillStyle = 'tomato';
        this.ctx.fillRect(300, 297.5, 200, 50);
        this.ctx.font = '30px Verdana';
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.fillText('Restart', 357, 331);
        this.ctx.closePath();
      }
    }, 1000);
  }
  
  setLoadingPage(logo, music) {
    let promise = music.play();

    if (promise !== undefined) {
      promise.then( () => {
      }).catch(error => {
        if (this.loadingMusicOn === false) {
          this.ctx.fillStyle = 'white'
          this.ctx.font = '20px Verdana';
          this.ctx.fillText('audio off', this.canvas.width - 110, 40);
          this.canvas.addEventListener('mouseup', (e) => {
            if (e.clientX > this.canvas.width - 50 && e.clientX < this.canvas.width + 30) {
              if (e.clientY > 0 && e.clientY < 50) {
                if (this.loadingMusicOn === false) {
                  music.play();
                  this.ctx.clearRect(0, 0, this.canvas.width, 50);
                  this.ctx.fillStyle = 'black';
                  this.ctx.fillRect(0, 0, this.canvas.width, 50);
                } 
              }
            }
          });
        }
      });
    }
    this.ctx.beginPath();
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(logo, 150, 150, 500, 115);
    this.ctx.font = '20px Verdana';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText('Press ENTER to start', 312, 350);
    this.ctx.closePath();
  }
  
  checkRestartButton() {
    keydown = document.onkeydown = (e) => {
      if(e.keyCode === 13) {
        e.preventDefault();
        restart();
      } 
    };
    
    this.canvas.addEventListener('mouseup', (e) => {
      if(e.clientY >= 308 && 
        e.clientY <= 347 && 
        e.clientX >= 354 && 
        e.clientX <= 550) {
          restart();
        }
      });
    }    
  }