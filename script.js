document.onreadystatechange = function() {
  switch (document.readyState) {
    case 'loading':
      break;
    case 'interactive':
      break;
    case 'complete':
      main();
      break;
  }
}

function main() {
  const fieldCanvas = document.getElementById('field');
  const game = createGame(fieldCanvas);
  game.start();
}

function createGame(fieldCanvas) {
  const glider = [
    [0,1,0],
    [0,0,1],
    [1,1,1]
  ];
  const fieldCtx = fieldCanvas.getContext('2d');
  const cellWidth = 10;
  const lineWidth = 1;
  const fieldWidth = Math.floor((fieldCanvas.clientWidth - lineWidth) / (lineWidth + cellWidth));
  const fieldHeight = Math.floor((fieldCanvas.clientHeight - lineWidth) / (lineWidth + cellWidth));  
  return {
    start: start
  }

  function start() {
    let currentGeneration = createGeneration(glider, fieldWidth, fieldHeight);
    drawField(currentGeneration, cellWidth, lineWidth, fieldCtx);
    document.addEventListener('keyup', function(event) {
      currentGeneration = getNextGeneration(currentGeneration);
      fieldCtx.clearRect(0, 0, fieldCanvas.clientWidth, fieldCanvas.clientHeight);
      drawField(currentGeneration, cellWidth, lineWidth, fieldCtx);
    });  
  }
}

function drawField(generation, cellWidth, lineWidth, context) {
  drawVerticalLines();
  drawHorizontalLines();
  drawLiveCells();

  function drawVerticalLines() {
    context.strokeStyle = '#757472';
    context.lineWidth = lineWidth;
    context.beginPath();
    let y = (lineWidth + cellWidth) * generation.length + lineWidth;
    for (let i=0; i<=generation[0].length; i++) {
      let x = (lineWidth + cellWidth) * i + lineWidth/2;
      context.moveTo(x, 0);
      context.lineTo(x, y);
    }
    context.closePath();
    context.stroke();
  }
  
  function drawHorizontalLines() {
    context.strokeStyle = '#757472';
    context.lineWidth = lineWidth;
    context.beginPath();
    let x = (lineWidth + cellWidth) * generation[0].length + lineWidth;
    for (let i=0; i<=generation.length; i++) {
      let y = (lineWidth + cellWidth) * i + lineWidth/2;
      context.moveTo(0, y);
      context.lineTo(x, y);
    }
    context.closePath();
    context.stroke();
  }

  function drawLiveCells() {
    context.fillStyle = '#171717';
    for (let i=0; i<generation.length; i++) {
      for (let j=0; j<generation[i].length; j++) {
        if (generation[i][j] == 1) {
          let x = (lineWidth + cellWidth) * j + lineWidth;
          let y = (lineWidth + cellWidth) * i + lineWidth;
          context.fillRect(x, y, cellWidth, cellWidth);  
        }
      }
    }
  }
}

function createGeneration(initGeneration, width, height) {
  let result = getEmptyGeneration();
  initialization();
  return result;

  function getEmptyGeneration() {
    let result = [];
    for (let i=0; i<height; i++) {
      result[i] = [];
      for (let j=0; j<width; j++) {
        result[i][j] = 0;
      }
    }
    return result;
  }
  
  function initialization() {
    for (let i=0; i<initGeneration.length; i++) {
      for (let j=0; j<initGeneration[i].length; j++) {
        result[i][j] = initGeneration[i][j];
      }
    }
  }
}

function getNextGeneration(currentGeneration) {
  let result = [];
  for (let i=0; i<currentGeneration.length; i++) {
    result[i] = [];
    for (let j=0; j<currentGeneration[i].length; j++) {
      result[i][j] = getNextState(i, j);
    }
  }
  return result;

  function getNextState(i, j) {
    let countNeighbours = getCountLiveNeighbours(i,j);
    if (currentGeneration[i][j] === 0) {
      if (countNeighbours === 3) {
        return 1;
      }
      return 0;
    }
    if (countNeighbours === 2 || countNeighbours === 3) {
      return 1;
    }
    return 0;
  }

  function getCountLiveNeighbours(i, j) {
    let result = 0;
    calcLiveNeighbours(i-1, j-1);
    calcLiveNeighbours(i, j-1);
    calcLiveNeighbours(i+1, j-1);

    calcLiveNeighbours(i-1, j);
    calcLiveNeighbours(i+1, j);

    calcLiveNeighbours(i-1, j+1);
    calcLiveNeighbours(i, j+1);
    calcLiveNeighbours(i+1, j+1);
    return result;

    function calcLiveNeighbours(i, j) {
      if (i<0 || i>=currentGeneration.length || j<0 || j>=currentGeneration[i].length) {
        return;
      }
      if (currentGeneration[i][j] === 1) {
        result++;
      }
    }
  } 
}