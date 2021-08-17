
let graphCalculator;
let drawingMachine;

function setup() {
  createCanvas(windowWidth*0.85, windowHeight).parent('p5');
  drawingMachine = new DrawingMachine();


  document.querySelector('#calculate').addEventListener('click', () => {
    let from = document.querySelector('#from');
    let to = document.querySelector('#to');

    let startPoint = parseInt(from.value);
    let endPoint = parseInt(to.value);

    if(isNaN(startPoint) || isNaN(endPoint) || Math.max(startPoint, endPoint) >= drawingMachine.pointsArray.length) {
      from.value = '';
      to.value = '';
    }
    else
      drawingMachine.calculateRoute(startPoint, endPoint);
  });

  document.querySelector('#generate').addEventListener('click', () => {

    drawingMachine.openGraphToCopy();

  });
}

function draw() {
  background(51);

  drawingMachine.drawGraph();
}

function windowResized() {
  resizeCanvas(windowWidth*0.85, windowHeight);
}


function mouseClicked() {
  if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let clickCoords = [mouseX, mouseY]
    drawingMachine.addPoint(clickCoords);
    drawingMachine.addLine(clickCoords);
  }
}

function keyPressed() {
  if(keyCode === 13) {
    drawingMachine.generateGraphArray();
  }
  if(keyCode === 27) {
    drawingMachine.breakLine();
  }
}
