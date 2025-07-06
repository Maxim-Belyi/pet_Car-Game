export function hasCollision(elem1Info, elem2Info) {
    const elem1YTop = elem1Info.coords.y;
    const elem1YBottom = elem1Info.coords.y + elem1Info.height;

    const elem1XLeft = elem1Info.coords.x - elem1Info.width * 0.3;
    const elem1XRight = elem1Info.coords.x + elem1Info.width * 0.3;

    const elem2YTop = elem2Info.coords.y;
    const elem2YBottom = elem2Info.coords.y + elem2Info.height;

    const elem2XLeft = elem2Info.coords.x - elem2Info.width * 0.5;
    const elem2XRight = elem2Info.coords.x + elem2Info.width * 0.5;

    if (elem1YTop > elem2YBottom || elem1YBottom < elem2YTop) {
      return false;
    }

    if (elem1XLeft > elem2XRight || elem1XRight < elem2XLeft) {
      return false;
    }

    return true;
  }