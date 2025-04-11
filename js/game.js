(function () {
  let isPause = true;
  let animationId = null;

  const carMoveSpeed = 7;
  const treesMoveSpeed = 6;


  const car = document.querySelector(".car");
  const trees = document.querySelectorAll(".tree");
  const road = document.querySelector(".road")

  const roadHeight = road.clientHeight;
  const roadWidht = road.clientWidth;
  console.log('Road height:', roadHeight)
  console.log('Road width:' ,roadWidht)

  const carBlueHeight = car.clientHeight;
  const carBlueWidth = car.clientWidth;
  console.log('Blue car Height:', carBlueHeight);
  console.log('Blue car Width:', carBlueWidth)

  const treesCoords = [];
  const carCoords = getCoords(car);

  for (let i = 0; i < trees.length; i++) {
    const tree = trees[i];
    const coordsTree = getCoords(tree);
    treesCoords.push(coordsTree);
  }

  const activeAnimations = {
    up: null,
    down: null,
    left: null,
    right: null,
  };

  function stopCarAnimations() {
    Object.values(activeAnimations).forEach(id => {
      if (id) cancelAnimationFrame(id);
    });
    Object.keys(activeAnimations).forEach(key => {
      activeAnimations[key] = null;
    });
  }

  function moveUp() {
    carCoords.y -= carMoveSpeed;

    if (carCoords.y < -roadHeight) {
      return;
    }
    car.style.transform = `translate(${carCoords.x}px, ${carCoords.y}px)`;
    console.log('current coords Y:',carCoords.y); 
    activeAnimations.up = requestAnimationFrame(moveUp);
  }

  function moveDown() {
    carCoords.y += carMoveSpeed;

    if (carCoords.y > -carBlueHeight) {
      return;
    }
    car.style.transform = `translate(${carCoords.x}px, ${carCoords.y}px)`;
    console.log('current coords Y:', carCoords.y); 

    activeAnimations.down = requestAnimationFrame(moveDown);
  }

  function moveLeft() {
    carCoords.x -= carMoveSpeed;

    if (carCoords.x < - (roadWidht / 2)) {
      return;
    }
    car.style.transform = `translate(${carCoords.x}px, ${carCoords.y}px)`;
    console.log('current coords X:', carCoords.x); 
    activeAnimations.left = requestAnimationFrame(moveLeft);
  }

  function moveRight() {
    carCoords.x += carMoveSpeed;

    if (carCoords.x > ((roadWidht / 2) - (carBlueWidth * 0.7))) {
      return;
    }
    car.style.transform = `translate(${carCoords.x}px, ${carCoords.y}px)`;
    console.log('current coords X:', carCoords.x); 
    activeAnimations.right = requestAnimationFrame(moveRight);
  }

  document.addEventListener('keydown', (event) => {
    if (isPause) return; 

    switch (event.code) {
      
      case 'ArrowUp':
        case 'KeyW':
        if (!activeAnimations.up) {
          stopCarAnimations();
          activeAnimations.up = requestAnimationFrame(moveUp);
        }
        break;

      case 'ArrowDown':
        case 'KeyS':
        if (!activeAnimations.down) {
          stopCarAnimations();
          activeAnimations.down = requestAnimationFrame(moveDown);
        }
        break;

      case 'ArrowLeft':
        case 'KeyA':
        if (!activeAnimations.left) {
          stopCarAnimations();
          activeAnimations.left = requestAnimationFrame(moveLeft);
        }
        break;

      case 'ArrowRight':
        case 'KeyD':
        if (!activeAnimations.right)  {
          stopCarAnimations();
          activeAnimations.right = requestAnimationFrame(moveRight);
        }
        break;
    }
  });

  document.addEventListener('keyup', (event) => {
    switch (event.code) {
      case 'ArrowUp':
        case 'KeyW':
        if (activeAnimations.up) {
          cancelAnimationFrame(activeAnimations.up);
          activeAnimations.up = null;
        }
        break;

      case 'ArrowDown':
        case 'KeyS':
        if (activeAnimations.down) {
          cancelAnimationFrame(activeAnimations.down);
          activeAnimations.down = null;
        }
        break;

      case 'ArrowLeft':
        case 'KeyA':
        if (activeAnimations.left) {
          cancelAnimationFrame(activeAnimations.left);
          activeAnimations.left = null;
        }
        break;

      case 'ArrowRight':
        case 'KeyD':
        if (activeAnimations.right) {
          cancelAnimationFrame(activeAnimations.right);
          activeAnimations.right = null;
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

  function startGame() {
    if (!isPause) {
      treesAnimation();
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