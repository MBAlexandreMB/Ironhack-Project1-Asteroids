let game = {
  space: new Space(),
  ship: 0,
  shipImgs: [new Image(), new Image()],
  asteroidImg: [new Image(), new Image()],
  asteroidBelt: [],
  interval: 0,
  frames: 0,
  randomCounter: 0,
};

const startGame = () => {
  game.shipImgs[0].src = './images/shipr.png';
  // game.shipImgs[0].src = './images/shipback.png';
  game.shipImgs[0].alt = 'spaceship by Zach Bogart from the Noun Project';
  game.shipImgs[1].src = './images/shipwfirer.png'
  game.shipImgs[1].alt = 'spaceship by Zach Bogart and Fire by Bohdan Burmich from the Noun Project';
  game.asteroidImg[0].src = './images/Asteroid1.png';
  game.asteroidImg[1].src = './images/Asteroid2.png';
  game.shipImgs[0].onload = () => {
    game.ship = new Ship(
      game.space.canvas.width / 2, 
      game.space.canvas.height / 2, 
      game.space.canvas,
      game.space.ctx, 
      game.shipImgs
      );
      game.space.bigBang();
      game.frames = 400;
      for (let x = 0; x < 5; x += 1){
        createNewAsteroid();
      }
      game.frames = 0;
      game.interval = setInterval(() => {
        animateIt();
        if (game.frames > 400) {
          game.frames = 0;
        } else {
          game.frames += 1;
        }
      }, 15);
    };
  };
  
  const createNewAsteroid = () => {
    let randomSize = Math.floor(Math.random() * (100 - 20) + 20);
    let randomX = Math.floor(Math.random() * game.space.canvas.width);
    let randomY = Math.floor(Math.random() * game.space.canvas.height);
    let randomSpeedX = 0;
    let randomSpeedY = 0;
    let luckyDirection = Math.random() < 0.5 ? -1 : 1;
    
    if (game.randomCounter === 0) {
      if (randomX < game.space.canvas.width / 2) {
        randomX = 0 - randomSize;
        randomSpeedX = Math.random() * (1 - 0.5) + 0.5;
        randomSpeedY = (Math.random() * (1 - 0.5) + 0.5) * luckyDirection;
      } else {
        randomX = game.space.canvas.width + randomSize;
        randomSpeedX = -(Math.random() * (1 - 0.5) + 0.5);
        randomSpeedY = (Math.random() * (1 - 0.5) + 0.5) * luckyDirection;
      }
      game.randomCounter = 1;
    } else {
      if (randomY < game.space.canvas.height / 1) {
        randomY = 0 - randomSize;
        randomSpeedY = Math.random() * (1 - 0.5) + 0.5;
        randomSpeedX = (Math.random() * (1 - 0.5) + 0.5) * luckyDirection;
      } else {
        randomY = game.space.canvas.height + randomSize;
        randomSpeedY = -(Math.random() * (1 - 0.5) + 0.5);
        randomSpeedX = (Math.random() * (1 - 0.5) + 0.5) * luckyDirection;
      }
      game.randomCounter = 0;
    }      
    game.asteroidBelt.push(new Asteroid(
      randomX, 
      randomY, 
      randomSpeedX, 
      randomSpeedY, 
      randomSize, 
      game.space.canvas,
      game.space.ctx, 
      game.asteroidImg[Math.floor(Math.random() * 2)]));  
  };
  
  
  const animateIt = () => {
    game.space.wipeOut();
    game.space.setBackground();
    // game.space.setLines();
    game.ship.update();
    if (game.frames % 400 == 0) {
      for (let x = 0; x < 5; x += 1){
        createNewAsteroid();
      }
    }
    game.asteroidBelt.forEach((asteroid, index) => { 
      asteroid.update(); 
      asteroid.remove() ? game.asteroidBelt.splice(index, 1) : false;
      game.ship.checkForImpact(asteroid) ? gameOver() : false; 
    });
  }

  const gameOver = () => {
    clearInterval(game.interval);
  }
  
  startGame();
  
  document.onkeydown = (e) => {
    switch(e.keyCode) {
      case 65: // "A"
      case 37: // ARROW LEFT 
      clearInterval(game.ship.inertiaInterval);
      game.ship.fireTurnThruster(-0.0375 * Math.PI);
      break;
      case 87: // "W" 
      case 38: // ARROW UP
      clearInterval(game.ship.inertiaInterval);
      game.ship.fireThruster(0.7);
      break;
      case 68: // "D"
      case 39: // ARROW RIGHT
      clearInterval(game.ship.inertiaInterval);
      game.ship.fireTurnThruster(0.0375 * Math.PI);
      break;
      // case 83: // "S"
      // case 40: // ARROW DOWN
      //   game.ship.fireThruster(1);
      //   break;
      default:
      break;
    }
  };
  
  document.onkeyup = (e) => {
    switch(e.keyCode) {
      case 65: // "A"
      case 37: // ARROW LEFT 
      case 87: // "W" 
      case 38: // ARROW UP
      case 68: // "D"
      case 39: // ARROW RIGHT
      game.ship.inertia();
      break;
      default:
      break;
    }
  };
  