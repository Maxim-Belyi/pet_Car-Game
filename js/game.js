(function () {
  let isPause = true;
  let animationId = null;

  let score = 0;
  let blueCarMoveSpeed = 5;
  let treesMoveSpeed = 6;
  let signsMoveSpeed = 4;

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

  const coinAlt = document.querySelector(".coin-alt");
  const coinAltInfo = createElementInfo(coinAlt);

 const danger = document.querySelector(".danger");
 const dangerInfo = createElementInfo(danger);
  
 const arrow = document.querySelector(".arrow");
 const arrowInfo = createElementInfo(arrow);

 let gameScore = document.querySelector(".game-score__value");

  const roadWidth = road.clientWidth;

  let negativeRandom100 = Math.floor(Math.random() * -100 - window.innerHeight);
  let negativeRandom500 = Math.floor(Math.random() * -500 - window.innerHeight);
  let negativeRandom900 = Math.floor(Math.random() * -900 - 200 - window.innerHeight);

  const treesCoords = [];
 
  for (let i = 0; i < trees.length; i++) {
    const tree = trees[i];
    const coordsTree = getCoords(tree);
    treesCoords.push(coordsTree);
  }

  function createElementInfo (element) {
    return {
      width: element.clientWidth,
      height: element.clientHeight,
      coords: getCoords(element),
      visible: true
  };
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
   
    if (blueCarInfo.coords.x < -(roadWidth / 2)) {
      return;
    }

    blueCar.style.transform = `translate(${blueCarInfo.coords.x}px, ${blueCarInfo.coords.y}px)`;
    blueCarInfo.move.left = requestAnimationFrame(moveLeft);
  }

  function moveRight() {
    blueCarInfo.coords.x += blueCarMoveSpeed;
 
    if (blueCarInfo.coords.x > roadWidth / 2 - blueCarInfo.width * 0.7) {
      return;
    }
    blueCar.style.transform = `translate(${blueCarInfo.coords.x}px, ${blueCarInfo.coords.y}px)`;

    blueCarInfo.move.right = requestAnimationFrame(moveRight);
  }

  document.addEventListener("keydown", (event) => {
    if (isPause) return;
   

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


      if (newYCoord > (window.innerHeight / 10)) {
        newYCoord = elemInitialYCoord;

        const directionX = Math.floor(Math.random() * 2);
        const randomXCoord = Math.floor(Math.random() * Math.max((roadWidth / 2) - elemInfo.width * 2));
        
        elem.style.display = 'initial';
        elemInfo.visible = true;
        newXcoord = directionX === 0
        ? -randomXCoord
        : randomXCoord;
      }

      elemInfo.coords.y = newYCoord;
      elemInfo.coords.x = newXcoord;

      elem.style.transform = `translate(${newXcoord}px, ${newYCoord}px)`;
  }

  function startGame() {
    if (!isPause) {

      treesAnimation();
      elementAnimation(coin, coinInfo, negativeRandom100);
      elementAnimation(coinAlt, coinAltInfo, negativeRandom900);
      elementAnimation(arrow, arrowInfo, negativeRandom500);
      elementAnimation(danger, dangerInfo, negativeRandom900);

      if (coinAltInfo.visible && hasCollision(blueCarInfo, coinAltInfo)) {
        score++;
         gameScore.innerText = score;
         coinAlt.style.display = 'none';
         coinAltInfo.visible = false;

         if (score % 3 === 0) {
          blueCarMoveSpeed++;
          signsMoveSpeed++;
          treesMoveSpeed++;
         }
      }

      if (coinInfo.visible && hasCollision(blueCarInfo, coinInfo)) {
         score++;
         gameScore.innerText = score;
         coin.style.display = 'none';
         coinInfo.visible = false;

         if (score % 3 === 0) {
          blueCarMoveSpeed++;
          signsMoveSpeed++;
          treesMoveSpeed++;
         }

         console.log('Скорость машины:', blueCarMoveSpeed)
         console.log('Скорость элементов:', signsMoveSpeed)
      };

      animationId = requestAnimationFrame(startGame);
    }
  }

  function getCoords(element) {
    const matrix = window.getComputedStyle(element).transform;
    const array = matrix.split(",");
    const y = array[array.length - 1];
    const x = array[array.length - 2];
    const numericY = parseFloat(y);
    const numericX = parseFloat(x);

    return { x: numericX, y: numericY };
  }

  function hasCollision(elem1Info, elem2info) {
    const carBlueYTop = elem1Info.coords.y;
    const carBlueYBottom = elem1Info.coords.y +elem1Info.height;

    const carBlueXLeft = elem1Info.coords.x - elem1Info.width * 0.5;
    const carBlueXRight = elem1Info.coords.x + elem1Info.width * 0.5;
    const coinYTop = elem2info.coords.y;
    const coinYBottom = elem2info.coords.y + elem2info.height;

    const coinXLeft = elem2info.coords.x - elem2info.width * 0.5;
    const coinXRight = elem2info.coords.x + elem2info.width * 0.5;

    // console.log('Левая часть монетки:' ,coinXLeft)
    // console.log('Правая часть монетки:' ,coinXRight)
    // console.log('Верх монетки:' ,coinYTop)
    // console.log('Низ монетки:' ,coinYBottom)

    // console.log('Левая часть машины:',carBlueXLeft)
    // console.log('Правая часть машины:',carBlueXRight)
    // console.log('Верх машины:',carBlueYTop)
    // console.log('Низ машины:',carBlueYBottom)
    // console.log(carBlueHeight)

    if (carBlueYTop > coinYBottom || carBlueYBottom < coinYTop) {
      return false;
    } 

    if (carBlueXLeft > coinXRight || carBlueXRight < coinXLeft) {
      return false;
    }

    return true;
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
})();
