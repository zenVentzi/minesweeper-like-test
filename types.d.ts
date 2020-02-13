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

/* 

    [1, 1, 1, 1, 1]
    [1, 1, 1, 0, 1]
    [1, 1, 0, 1, 1]
    [1, 1, 1, 1, 1]



    [1, 1, 1]
    [1, 1, 1]
    [1, 1, 0]



    [0, 1],
    [1, 1],


*/
/* 
Mark element as checked.
Check if element is 0. 
Yes? Recurse the function, passing the left element
Yes? Go around the array and find adjacent elements.
    For each adjacent element check if it is 0
No? Do nothing.

if end, return array with the indexes of the checked elements

*/
