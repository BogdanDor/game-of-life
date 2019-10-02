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
  let fieldCanvas = document.getElementById('field');
  let fieldCtx = fieldCanvas.getContext('2d');
  fieldCtx.fillStyle = 'rgb(0, 0, 200)';
  fieldCtx.fillRect(0, 0, fieldCanvas.clientWidth, fieldCanvas.clientWidth);
}