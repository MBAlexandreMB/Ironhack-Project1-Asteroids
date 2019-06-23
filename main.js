let game = {
  space: new Space(),
  ship: 0,
  img: [new Image(), new Image()],
  interval: 0,
  frames: 0,
};

const startGame = () => {
  game.img[0].src = './images/ship.png';
  game.img[0].alt = 'spaceship by Zach Bogart from the Noun Project';
  game.img[1].src = './images/shipwfire.png'
  game.img[1].alt = 'spaceship by Zach Bogart and Fire by Bohdan Burmich from the Noun Project';
  game.img[0].onload = () => {
    game.ship = new Ship(
      game.space.canvas.width / 2, 
      game.space.canvas.height / 2, 
      game.space.canvas,
      game.space.ctx, 
      game.img
      );
      game.space.bigBang();
      game.interval = setInterval(() => {
        animateIt();
        game.frames += 1;
      }, 15);
    };
  }
  
  const animateIt = () => {
    game.space.wipeOut();
    game.ship.update();
    game.asteroid.createNew();
    game.asteroid.update();
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
      game.ship.fireThruster(1);
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
  