import { CoinSound } from "./sound.js";
import { ArrowSound } from "./sound.js";
import { MusicManager } from "./sound.js";

(function () {
  let isPause = true;
  let animationId = null;

  let score = 0;
  let blueCarMoveSpeed = 6;
  let treesMoveSpeed = 7;
  let signsMoveSpeed = 5;

  // const backgroundAudio = new Audio("../sounds/background-music.wav");


  const trees = document.querySelectorAll(".tree");
  const road = document.querySelector(".road");

  const blueCar = document.querySelector(".car__blue");
  const blueCarInfo = {
    ...createElementInfo(blueCar),
    moveSpeed: blueCarMoveSpeed,

    move: {
      up: null,
      down: null,
      left: null,
      right: null,
    },
  };

  const coin = document.querySelector(".coin");
  const coinInfo = createElementInfo(coin);

  const danger = document.querySelector(".danger");
  const dangerInfo = createElementInfo(danger);

  const arrow = document.querySelector(".arrow");
  const arrowInfo = createElementInfo(arrow);

  let gameScoreWrapper = document.querySelector(".game-score");
  let gameScoreValue = document.querySelector(".game-score__value");
  let backdropEndGame = document.querySelector(".end-game");
  const restartButton = document.querySelector(".end-game__button");

  const roadWidth = road.clientWidth;

  let negativeRandom100 =
    -window.innerHeight - Math.floor(Math.random() * (500 - 100) + 100);
  let negativeRandom500 =
    -window.innerHeight - Math.floor(Math.random() * (900 - 500) + 500);
  let negativeRandom900 =
    -window.innerHeight - Math.floor(Math.random() * (1200 - 900) + 900);

  const treesCoords = [];

  for (let i = 0; i < trees.length; i++) {
    const tree = trees[i];
    const coordsTree = getCoords(tree);
    treesCoords.push(coordsTree);
  }

  function stopCarAnimations() {
    Object.values(blueCarInfo.move).forEach((id) => {
      if (id) cancelAnimationFrame(id);
    });
    Object.keys(blueCarInfo.move).forEach((key) => {
      blueCarInfo.move[key] = null;
    });
  }

  function moveUp() {
    blueCarInfo.coords.y -= blueCarMoveSpeed;
    blueCar.style.transform = `translate(${blueCarInfo.coords.x}px, ${blueCarInfo.coords.y}px)`;
    blueCarInfo.move.up = requestAnimationFrame(moveUp);
  }

  function moveDown() {
    blueCarInfo.coords.y += blueCarMoveSpeed;
    if (blueCarInfo.coords.y > -blueCarInfo.height) {
      return;
    }

    blueCar.style.transform = `translate(${blueCarInfo.coords.x}px, ${blueCarInfo.coords.y}px)`;
    blueCarInfo.move.down = requestAnimationFrame(moveDown);
  }

  function moveLeft() {
    blueCarInfo.coords.x -= blueCarMoveSpeed;

    if (blueCarInfo.coords.x > roadWidth || blueCarInfo.coords.x < 0) {
      return;
    }

    blueCar.style.transform = `translate(${blueCarInfo.coords.x}px, ${blueCarInfo.coords.y}px)`;
    blueCarInfo.move.left = requestAnimationFrame(moveLeft);
  }

  function moveRight() {
    blueCarInfo.coords.x += blueCarMoveSpeed;

    if (blueCarInfo.coords.x > roadWidth - blueCarInfo.width) {
      return;
    }

    blueCar.style.transform = `translate(${blueCarInfo.coords.x}px, ${blueCarInfo.coords.y}px)`;
    blueCarInfo.move.right = requestAnimationFrame(moveRight);
  }

  document.addEventListener("keydown", (event) => {
    if (isPause) {
      return;
    }

    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        if (!blueCarInfo.move.up) {
          stopCarAnimations();
          blueCarInfo.move.up = requestAnimationFrame(moveUp);
        }
        break;

      case "ArrowDown":
      case "KeyS":
        if (!blueCarInfo.move.down) {
          stopCarAnimations();
          blueCarInfo.move.down = requestAnimationFrame(moveDown);
        }
        break;

      case "ArrowLeft":
      case "KeyA":
        if (!blueCarInfo.move.left) {
          stopCarAnimations();
          blueCarInfo.move.left = requestAnimationFrame(moveLeft);
        }
        break;

      case "ArrowRight":
      case "KeyD":
        if (!blueCarInfo.move.right) {
          stopCarAnimations();
          blueCarInfo.move.right = requestAnimationFrame(moveRight);
        }
        break;
    }
  });

  document.addEventListener("keyup", (event) => {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        if (blueCarInfo.move.up) {
          cancelAnimationFrame(blueCarInfo.move.up);
          blueCarInfo.move.up = null;
        }
        break;

      case "ArrowDown":
      case "KeyS":
        if (blueCarInfo.move.down) {
          cancelAnimationFrame(blueCarInfo.move.down);
          blueCarInfo.move.down = null;
        }
        break;

      case "ArrowLeft":
      case "KeyA":
        if (blueCarInfo.move.left) {
          cancelAnimationFrame(blueCarInfo.move.left);
          blueCarInfo.move.left = null;
        }
        break;

      case "ArrowRight":
      case "KeyD":
        if (blueCarInfo.move.right) {
          cancelAnimationFrame(blueCarInfo.move.right);
          blueCarInfo.move.right = null;
        }
        break;
    }
  });

  function treesAnimation() {
    for (let i = 0; i < trees.length; i++) {
      const tree = trees[i];
      const coords = treesCoords[i];

      let newYCoord = coords.y + treesMoveSpeed;

      if (newYCoord > window.innerHeight / 3) {
        newYCoord = -window.innerHeight * 1.5;
      }

      treesCoords[i].y = newYCoord;
      tree.style.transform = `translate(${coords.x}px, ${newYCoord}px)`;
    }
  }

  function elementAnimation(elem, elemInfo, elemInitialYCoord) {
    let newYCoord = elemInfo.coords.y + signsMoveSpeed;
    let newXcoord = elemInfo.coords.x;

    if (newYCoord > window.innerHeight / 10) {
      newYCoord = elemInitialYCoord;

      const directionX = Math.random() * (roadWidth - elemInfo.width);

      elem.style.display = "initial";
      elemInfo.visible = true;
      newXcoord = directionX;
    }

    elemInfo.coords.y = newYCoord;
    elemInfo.coords.x = newXcoord;

    elem.style.transform = `translate(${newXcoord}px, ${newYCoord}px)`;
  }

  function startGame() {
    if (!isPause) {
      treesAnimation();
      elementAnimation(coin, coinInfo, negativeRandom100);
      elementAnimation(arrow, arrowInfo, negativeRandom500);
      elementAnimation(danger, dangerInfo, negativeRandom900);

      if (dangerInfo.visible && hasCollision(blueCarInfo, dangerInfo)) {
        finishGame();
        return;
      }

      if (coinInfo.visible && hasCollision(blueCarInfo, coinInfo)) {
        score++;
        gameScoreValue.innerText = score;
        coin.style.display = "none";
        coinInfo.visible = false;
        CoinSound.play("coin");

        if (score % 4 === 0) {
          blueCarMoveSpeed++;
          signsMoveSpeed++;
          treesMoveSpeed++;
        }
      }

      if (arrowInfo.visible && hasCollision(blueCarInfo, arrowInfo)) {
        arrow.style.display = "none";
        arrowInfo.visible = false;
        danger.style.opacity = 0.2;
        dangerInfo.visible = false;
        ArrowSound.play("arrow");

        blueCarMoveSpeed += 6;
        treesMoveSpeed += 4;
        signsMoveSpeed += 3;

        setTimeout(() => {
          coinInfo.visible = true;
          danger.style.opacity = 1;
          blueCarMoveSpeed -= 6;
          treesMoveSpeed -= 4;
          signsMoveSpeed -= 3;

          setTimeout(() => {
            dangerInfo.visible = true;
          }, 1000);
        }, 2000);
      }

      animationId = requestAnimationFrame(startGame);
    }
  }

  function finishGame() {
    cancelAnimationFrame(animationId);
    stopCarAnimations();
    backdropEndGame.style.display = "initial";
    const scoreEndGame = backdropEndGame.querySelector(".end-game__score");
    scoreEndGame.innerText = score;
    gameScoreWrapper.style.display = "none";
    gameButton.style.display = "none";
  }

  const gameButton = document.querySelector(".game-button");
  gameButton.addEventListener("click", () => {
    isPause = !isPause;
    if (isPause) {
      cancelAnimationFrame(animationId);
      stopCarAnimations();
      gameButton.children[1].classList.add("visually-hidden");
      gameButton.children[0].classList.remove("visually-hidden");
    } else {
      animationId = requestAnimationFrame(startGame);
      gameButton.children[1].classList.remove("visually-hidden");
      gameButton.children[0].classList.add("visually-hidden");
    }
  });

  const musicToggle = document.querySelector(".background-sound__btn");

  musicToggle.addEventListener("click", () => {
    MusicManager.toggle();
      if (!MusicManager.isPlaying) {
        musicToggle.children[0].classList.add("visually-hidden");
        musicToggle.children[1].classList.remove("visually-hidden");
      } else {
        musicToggle.children[1].classList.add("visually-hidden");
        musicToggle.children[0].classList.remove("visually-hidden");
      }
      console.log(musicToggle.children[1].classList)
      
    },
  );

  restartButton.addEventListener("click", () => {
    window.location.reload();
  });
})();
