type MineArray = number[][];
type ModifiedElement = { location: Locationn; num: number; checked: boolean };
type ModifiedArray = ModifiedElement[][];
type Current = {
  location: Locationn;
  number: number;
  rowLength: number;
  colLength: number;
};
type Clicked = { location: Locationn; number: number };
type Locationn = { row: number; col: number };
