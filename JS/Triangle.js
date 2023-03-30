let powerEl, inputEl, resultEl;
const multiplesOf2 = document.getElementById('times2');
const multiplesOf3 = document.getElementById('times3');
const multiplesOf4 = document.getElementById('times4');
const multiplesOf5 = document.getElementById('times5');

const debounce = (callback, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback.apply(callback, args), timeout);
  };
};

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

const createPascalsTriangle = (totalRows, power, multiple) => {
  console.log(totalRows, power)


  const triangle = new Array(parseInt(totalRows, 0)+1).fill(0).map((r, i) => createPascalRow(i, power));

  console.log(resultEl)

  resultEl.innerHTML = '';

  triangle.forEach(cells => {
    const rowEl = document.createElement('div');
    rowEl.classList.add('row');

    cells.forEach(cell => {
      const isOdd = cell % 2 !== 0;
      const cellEl = document.createElement('div');

      cellEl.classList.add('cell');
      cellEl.classList.add(`cell-${isOdd ? 'odd' : 'even'}`);
      if (multiple != null) {
        const isMultiple = cell % multiple == 0;
        cellEl.classList.add(`cell-${isMultiple ? mapValueToColor(multiple) : 'white'}`);
      } else {
        cellEl.classList.add(`cell-white`);
      }
      cellEl.innerHTML = `<div><span></span><span>${parseFloat(cell.toFixed(1)).toString()}</span><span></span></div>`;

      rowEl.appendChild(cellEl);
    });

    resultEl.appendChild(rowEl);
  });

  Array.from(document.querySelectorAll('.cell')).
  forEach((el, i) => {
    setTimeout(() => {el.classList.add('animate');}, i * 100);
  });
};

function getCheckedValue() {
  if (multiplesOf2.checked) {
    return 2;
  } else if (multiplesOf3.checked) {
    return 3;
  } else if (multiplesOf4.checked) {
    return 4;
  } else if (multiplesOf5.checked) {
    return 5;
  }
    return null
}

function mapValueToColor(value) {
  switch(value) {
    case 2:
      return "purple";
    case 3:
      return "green";
    case 4:
      return "pink";
    case 5:
      return "blue";
    default:
      return null;
  }
}

const init = () => { 
  console.log("init")
  powerEl = document.getElementById('powerInput');
  inputEl = document.getElementById('totalInput');
  multipleVal = getCheckedValue();
  resultEl = document.getElementById('result');
  console.log(`multiple ${multipleVal}`);
  const go = debounce(() => createPascalsTriangle(inputEl.value, parseFloat(powerEl.value), getCheckedValue()));

  inputEl.addEventListener('change', go);
  document.getElementById('calculate').addEventListener('click', e => {
    e.preventDefault();
    go(e);
  });

  go();
};

window.onload = init();