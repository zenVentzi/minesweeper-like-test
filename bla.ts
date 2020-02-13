import util from "util";

const checkIsOverLeftElement = (current: Current, clicked: Clicked) => {
  const currentLocation = current.location;
  const clickedLocation = clicked.location;

  const isOverSameRow = currentLocation.row === clickedLocation.row;
  const isOverSameColumn = currentLocation.col === clickedLocation.col;

  const leftColumnExists = clickedLocation.col - 1 >= 0;
  const isOverLeftColumn =
    leftColumnExists && clickedLocation.col - 1 === currentLocation.col;
  const isOverLeftElement = isOverSameRow && isOverLeftColumn;
  return isOverLeftElement;
};

const checkIsOverRightElement = (current: Current, clicked: Clicked) => {
  const currentLocation = current.location;
  const clickedLocation = clicked.location;

  const isOverSameRow = currentLocation.row === clickedLocation.row;
  const isOverSameColumn = currentLocation.col === clickedLocation.col;

  const rightColumnExists = clickedLocation.col + 1 <= current.rowLength - 1;
  const isOverRightColumn =
    rightColumnExists && clickedLocation.col + 1 === currentLocation.col;
  const isOverRightElement = isOverSameRow && isOverRightColumn;
  return isOverRightElement;
};

const checkIsOverTopElement = (current: Current, clicked: Clicked) => {
  const currentLocation = current.location;
  const clickedLocation = clicked.location;

  // const isOverSameRow = currentLocation.row === clickedLocation.row;
  const isOverSameColumn = currentLocation.col === clickedLocation.col;

  const topRowExists = clickedLocation.row - 1 >= 0;
  const isOverTopRow =
    topRowExists && clickedLocation.row - 1 === currentLocation.row;
  const isOverTopElement = isOverSameColumn && isOverTopRow;
  return isOverTopElement;
};

const checkIsOverBottomElement = (current: Current, clicked: Clicked) => {
  const currentLocation = current.location;
  const clickedLocation = clicked.location;

  // const isOverSameRow = currentLocation.row === clickedLocation.row;
  const isOverSameColumn = currentLocation.col === clickedLocation.col;

  const bottomRowExists = clickedLocation.row + 1 <= current.rowLength - 1;
  const isOverBottomRow =
    bottomRowExists && clickedLocation.row + 1 === currentLocation.row;
  const isOverBottomElement = isOverSameColumn && isOverBottomRow;
  return isOverBottomElement;
};

const isChecked = (current: Current, clicked: Clicked) => {
  const currentLocation = current.location;
  const currentNumber = current.number;
  const clickedLocation = clicked.location;
  const clickedNumber = clicked.number;

  const isOverSameRow = currentLocation.row === clickedLocation.row;
  const isOverSameColumn = currentLocation.col === clickedLocation.col;

  const isOverClickedElement = isOverSameRow && isOverSameColumn;

  if (clickedNumber !== 0) {
    if (isOverClickedElement) {
      return true;
    }

    return false;
  }

  if (isOverClickedElement) {
    return true;
  }

  const isOverLeftElement = checkIsOverLeftElement(current, clicked);
  const isOverRightElement = checkIsOverRightElement(current, clicked);
  const isOverTopElement = checkIsOverTopElement(current, clicked);
  const isOverBottomElement = checkIsOverBottomElement(current, clicked);

  return (
    isOverLeftElement ||
    isOverRightElement ||
    isOverTopElement ||
    isOverBottomElement
  );
};

const getArr = (
  arr: MineArray,
  currentRow: number,
  currentColumn: number,
  newArr: ModifiedArray,
  clickedLocation: Locationn
): ModifiedArray => {
  const isLastColumn = arr[currentRow].length - 1 === currentColumn;
  const isLastRow = arr.length - 1 === currentRow;
  const currentNumber = arr[currentRow][currentColumn];
  const clickedNumber = arr[clickedLocation.row][clickedLocation.col];

  if (!newArr[currentRow]) {
    newArr[currentRow] = new Array();
  }

  const currentLocation = { row: currentRow, col: currentColumn };
  const current: Current = {
    location: currentLocation,
    number: currentNumber,
    rowLength: arr[currentRow].length,
    colLength: arr.length // this could be different if mine is not a rectangle form
  };
  const clicked: Clicked = { location: clickedLocation, number: clickedNumber };

  const checked = isChecked(current, clicked);
  const modifiedElement: ModifiedElement = {
    location: currentLocation,
    checked,
    num: currentNumber
  };

  newArr[currentRow].push(modifiedElement);

  if (isLastColumn && isLastRow) {
    return newArr;
  } else if (isLastColumn) {
    currentRow += 1;
    currentColumn = 0;
  } else {
    currentColumn += 1;
  }

  return getArr(arr, currentRow, currentColumn, newArr, clickedLocation);
};

const getModifiedArr = (
  arr: MineArray,
  clickedLocation: Locationn
): ModifiedArray => {
  return getArr(arr, 0, 0, [], clickedLocation);
};

const clickedLocationExternal = { row: 1, col: 3 };
let externalArr: MineArray = [
  [1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1]
];

const modifiedArr = getModifiedArr(externalArr, clickedLocationExternal);

console.dir(util.inspect(modifiedArr, true, null));

// console.log({ num: 1, checked: false, location: { row: 1, col: 2 } });
