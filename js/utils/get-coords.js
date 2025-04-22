function getCoords(element) {
    const matrix = window.getComputedStyle(element).transform;
    const array = matrix.split(",");
    const y = array[array.length - 1];
    const x = array[array.length - 2];
    const numericY = parseFloat(y);
    const numericX = parseFloat(x);

    return { x: numericX, y: numericY };
  }
