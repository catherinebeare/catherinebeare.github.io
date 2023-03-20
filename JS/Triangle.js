let powerEl, inputEl, resultEl;

/**
 * The term debounce comes from old electronics. When you press a button, 
 * (like on a remote control) it "bounces" registering multiple clicks.
 * In programming, we assume the user will do things quickly... so we wait
 * for them to finish before firing out the function.
 *
 * @param {Function} callback
 * @param {Number} timeout
 */
const debounce = (callback, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback.apply(callback, args), timeout);
  };
};

/**
 * Creates a specific row in pascals triangle
 *
 * @parm {Number} n
 * @param {Number} p
 *
 *      n(n - 1)    n(n - 1)(n - 2)   n(n - 1)(n - 2)(n- 3)
 * 1,n ----------, ----------------, ----------------------, ...
 *          2             2 * 3              2 * 3 * 4
 *
 *
 */
const createPascalRow = (n, p) => {
  const row = [];
  while (row.length <= n) {
    row.unshift(parseFloat(p, 10));
    for (let i = 1; i < row.length-1; i++) {
      row[i] += row[i + 1];
    }
  }
  return row;
};

/**
 * Creates pascal's triangle as an two dimensional array, loops through it
 * to create elements, add them to the dom and animate them after a certain
 * interval between each.
 */
const createPascalsTriangle = (totalRows, power) => {
  console.log(totalRows, power)

  // Create an array representation of the triangle.
  // First we create an empty array, fill it with
  // zeroes then fill each row with an array representation
  // of the row using the createPascalRow function above
  //
  const triangle = new Array(parseInt(totalRows, 0)).fill(0).map((r, i) => createPascalRow(i, power));

  console.log(resultEl)
  // Clear out the result div element to get it
  // ready to add new elements
  //
  resultEl.innerHTML = '';

  triangle.forEach(cells => {
    const rowEl = document.createElement('div');
    rowEl.classList.add('row');

    cells.forEach(cell => {
      const isOdd = cell % 2 !== 0;
      const cellEl = document.createElement('div');

      cellEl.classList.add('cell');
      cellEl.classList.add(`cell-${isOdd ? 'odd' : 'even'}`);
      cellEl.innerHTML = `<div><span></span><span>${parseFloat(cell.toFixed(1)).toString()}</span><span></span></div>`;

      rowEl.appendChild(cellEl);
    });

    resultEl.appendChild(rowEl);
  });

  // Now we animate them!
  Array.from(document.querySelectorAll('.cell')).
  forEach((el, i) => {
    setTimeout(() => {el.classList.add('animate');}, i * 100);
  });
};

const init = () => { 
  console.log("init")
  powerEl = document.getElementById('powerInput');
  inputEl = document.getElementById('totalInput');
  resultEl = document.getElementById('result');

  const go = debounce(() => createPascalsTriangle(inputEl.value, parseFloat(powerEl.value)));

  inputEl.addEventListener('change', go);
  document.getElementById('calculate').addEventListener('click', e => {
    e.preventDefault();
    go(e);
  });

  go();
};

window.onload = init();