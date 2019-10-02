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
  const fieldCtx = fieldCanvas.getContext('2d');
  const cellWidth = 10;
  const lineWidth = 1;
  const fieldWidth = Math.floor((fieldCanvas.clientWidth - lineWidth) / (lineWidth + cellWidth));
  const fieldHeight = Math.floor((fieldCanvas.clientHeight - lineWidth) / (lineWidth + cellWidth));
  drawField(fieldWidth, fieldHeight, cellWidth, lineWidth, fieldCtx);
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