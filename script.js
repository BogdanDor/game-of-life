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

const initState = [
  [0,1,0],
  [1,0,1],
  [0,1,0]
];

function main() {
  const fieldCanvas = document.getElementById('field');
  const fieldCtx = fieldCanvas.getContext('2d');
  const cellWidth = 10;
  const lineWidth = 1;
  const fieldWidth = Math.floor((fieldCanvas.clientWidth - lineWidth) / (lineWidth + cellWidth));
  const fieldHeight = Math.floor((fieldCanvas.clientHeight - lineWidth) / (lineWidth + cellWidth));
  drawField(fieldWidth, fieldHeight, cellWidth, lineWidth, fieldCtx);
  drawLiveCells(cellWidth, lineWidth, fieldCtx, initState);
}

function drawField(fieldWidth, fieldHeight, cellWidth, lineWidth, context) {
  context.strokeStyle = '#757472';
  context.lineWidth = lineWidth;
  context.beginPath();
  drawVerticalLines();
  drawHorizontalLines();
  context.closePath();
  context.stroke();

  function drawVerticalLines() {
    let height = (lineWidth + cellWidth) * fieldWidth + lineWidth;
    for (let i=0; i<=fieldWidth; i++) {
      let x = (lineWidth + cellWidth) * i + lineWidth/2;
      context.moveTo(x, 0);
      context.lineTo(x, height);
    }
  }
  
  function drawHorizontalLines() {
    let width = (lineWidth + cellWidth) * fieldHeight + lineWidth;
    for (let i=0; i<=fieldHeight; i++) {
      let y = (lineWidth + cellWidth) * i + lineWidth/2;
      context.moveTo(0, y);
      context.lineTo(width, y);
    }
  }
}

function drawLiveCells(cellWidth, lineWidth, context, state) {
  context.fillStyle = '#171717';
  for (let i=0; i<state.length; i++) {
    for (let j=0; j<state[i].length; j++) {
      if (state[i][j] == 1) {
        let x = (lineWidth + cellWidth) * j + lineWidth;
        let y = (lineWidth + cellWidth) * i + lineWidth;
        context.fillRect(x, y, cellWidth, cellWidth);  
      }
    }
  }
}