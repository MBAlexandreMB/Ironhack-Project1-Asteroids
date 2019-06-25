let game = {
  space: new Space(),
  ship: 0,
  shipImgs: [new Image(), new Image(), new Image(), new Image()],
  shipChangeFactor: 9,
  shipCrashSound: new Audio('./sounds/Crash.mp3'),
  shotSound: new Audio('./sounds/Laser-Shot-1.mp3'),
  backgroundMusic: new Audio(),
  gameOverMusic: new Audio('./sounds/music/Beginnings_Intro.mp3'),
  asteroidImg: [new Image(), new Image()],
  asteroidBelt: [],
  asteroidSound: new Audio('./sounds/Big Explosion Effect Sound.mp3'),
  shots: [],
  cannonCooled: true,
  interval: 0,
  frames: 0,
  randomCounter: 0,
  score: 0,
  pause: true,
};

const loadSFX = () => {
  let randomShip = Math.random();
  let easterEggChance = 0.15;
  // let easterEggChance = 1;
  let possibleMusics = ['./sounds/music/H4rdcore Secret - Anamanaguchi.mp3', './sounds/music/Epic Music - Asteroid.mp3', './sounds/music/Star Wars - Millennium Falcon Suite (Theme).mp3'];
  if (randomShip > easterEggChance) {
    if (randomShip > ((1 - easterEggChance) / 2 + easterEggChance)) {
      game.backgroundMusic.src = possibleMusics[0];
      game.backgroundMusic.volume = 0.5;
    } else {
      game.backgroundMusic.src = possibleMusics[1];
      game.backgroundMusic.volume = 1;
    }
  } else {
    game.backgroundMusic.src = possibleMusics[2];
    game.backgroundMusic.volume = 0.5;
  }
  game.backgroundMusic.preload = 'auto';
  game.backgroundMusic.autoplay = true;
  
  
  if(randomShip > easterEggChance) { 
    game.shipChangeFactor = 9;
    game.shipImgs[0].src = './images/shipr.png';
    game.shipImgs[0].alt = 'spaceship by Zach Bogart from the Noun Project';
    game.shipImgs[1].src = './images/shipwfirer.png';  
    game.shipImgs[1].alt = 'spaceship by Zach Bogart and Fire by Bohdan Burmich from the Noun Project';
    game.asteroidImg[0].src = './images/Asteroid1.png';
    game.asteroidImg[1].src = './images/Asteroid2.png';
  } else {
    game.shipImgs[0].src = './images/millenium.png';
    game.shipImgs[1].src = './images/milleniumwfire.png'; 
    game.asteroidImg[0].src = './images/deathstar.png';
    game.asteroidImg[0].alt = 'Death Star by habione 404 from the Noun Project';
    game.asteroidImg[1].src = './images/starfighter.png';
    game.asteroidImg[1].alt = 'Tie Fighter by Linker from the Noun Project';
    game.shipChangeFactor = 2;
  } 
}

const startGame = () => {
  loadSFX();
  game.shipImgs[0].onload = () => {
    game.ship = new Ship(
      game.space.canvas.width / 2, 
      game.space.canvas.height / 2, 
      game.space.canvas,
      game.space.ctx, 
      game.shipImgs
      );
      game.space.bigBang(game.backgroundMusic);
      game.frames = 400;
      for (let x = 0; x < 5; x += 1){
        createNewAsteroid();
      }
      game.frames = 0;
      game.interval = game.space.timeWarp(game.pause);
      game.pause = false; 
    };
  };
  
  const createNewAsteroid = (
    randomX = Math.floor(Math.random() * game.space.canvas.width),
    randomY = Math.floor(Math.random() * game.space.canvas.height),
    randomSize = Math.floor(Math.random() * (100 - 35) + 35),
    randomlyCreated = true
    ) => {
      let randomSpeedX = 0;
      let randomSpeedY = 0;
      let luckyDirection = Math.random() < 0.5 ? -1 : 1;
      
      if (randomlyCreated === true) {
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
      } else {
        randomSpeedX = Math.random() * (1 - 0.5) + 0.5 * luckyDirection;
        luckyDirection = Math.random() < 0.5 ? -1 : 1;
        randomSpeedY = (Math.random() * (1 - 0.5) + 0.5) * luckyDirection;
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
        if (game.frames % 100 == 0) {
          // for (let x = 0; x < 5; x += 1){
          createNewAsteroid();
          // }
        }
        game.asteroidBelt.forEach((asteroid, index) => { 
          asteroid.update(); 
          asteroid.remove() ? game.asteroidBelt.splice(index, 1) : false; 
          if(game.ship.checkForImpact(asteroid)) {
            gameOver();
            return;
          } 
        });
        
        game.shots.forEach((shot, sindex) => {
          shot.update();
          shot.remove() ? game.shots.splice(sindex, 1) : false;
          game.asteroidBelt.some((asteroid, aindex) => {
            if (asteroid.checkShot(shot)) { 
              if(asteroid.breakInHalf()) {
                createNewAsteroid(asteroid.x, asteroid.y, asteroid.size / 2, false);
                createNewAsteroid(asteroid.x, asteroid.y, asteroid.size / 2, false);
              }
              game.asteroidBelt.splice(aindex, 1);
              game.shots.splice(sindex, 1);
              game.score += 1;
            }
            
          });
        });
        game.space.printScore(game.score);
      }

      const credits = (score) => {
        game.space.blackHole(score);
        setTimeout(() => {
          // restart();
        }, 15000);
      }

      const restart = () => {
        game.gameOverMusic.currentTime = 0;
        game.gameOverMusic.pause();

        game = {
          space: new Space(),
          ship: 0,
          shipImgs: [new Image(), new Image(), new Image(), new Image()],
          shipChangeFactor: 9,
          shipCrashSound: new Audio('./sounds/Crash.mp3'),
          shotSound: new Audio('./sounds/Laser-Shot-1.mp3'),
          backgroundMusic: new Audio(),
          gameOverMusic: new Audio('./sounds/music/Beginnings_Intro.mp3'),
          asteroidImg: [new Image(), new Image()],
          asteroidBelt: [],
          asteroidSound: new Audio('./sounds/Big Explosion Effect Sound.mp3'),
          shots: [],
          cannonCooled: true,
          interval: 0,
          frames: 0,
          randomCounter: 0,
          score: 0,
          pause: true,
        };

        document.querySelector('body').removeChild(document.getElementById('canvas'));
        startGame();
      }
      
      const gameOver = () => {
        clearInterval(game.interval);
        game.shipCrashSound.play();
        game.backgroundMusic.pause();
        game.gameOverMusic.play();

        credits(game.score);
      }
      
      startGame();
      
      document.onkeydown = (e) => {
        if (e.keyCode === 32 || e.keyCode === 18) {
          e.preventDefault();
        }
        
        switch(e.keyCode) {
          case 65: // "A"
          case 37: // ARROW LEFT 
          clearInterval(game.ship.inertiaInterval);
          game.ship.fireTurnThruster(-7.5);
          break;
          case 87: // "W" 
          case 38: // ARROW UP
          clearInterval(game.ship.inertiaInterval);
          game.ship.fireThruster(0.7);
          break;
          case 68: // "D"
          case 39: // ARROW RIGHT
          clearInterval(game.ship.inertiaInterval);
          game.ship.fireTurnThruster(7.5);
          break;
          case 32: // SPACE
          if (game.cannonCooled === true) {
            game.shots.push(game.ship.pewPewPew(game.shotSound));
            game.cannonCooled = false;
            setTimeout(() => {
              game.cannonCooled = true;
            }, 500);
          }
          break;
          case 13:
          game.interval = game.space.timeWarp(game.pause);
          game.pause = game.pause ? false : true;   
          break;
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