function drawArrow(start, end, diameter, myColor) {
  let radius = diameter / 2;
  push();
  fill(myColor);

  end.x -= start.x;
  end.y -= start.y;
  let distance = mag(end.x, end.y);
  distance -= radius;
  end.setMag(distance);

  translate(start.x, start.y);
  line(0, 0, end.x, end.y);

  rotate(end.heading());
  let arrowSize = 7;
  translate(end.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

class DrawingMachine {
  /**
  * @constructor
  */
  constructor() {
    this.previousPoint = 0;
    this.lineArray = [];
    this.pointsArray = [];
    this.pointR = 50;
  }
  /**
  * @desc adds a pint with given coordinations
  * @param coords - coordinations of a point - example [0, 10]
  */
  addPoint(coords) {
    if(this.pointsArray.findIndex(el => this.targetsPreviousPoint(el)) === -1)
      this.pointsArray.push(coords);
  }
  /**
  * @desc create line if two vectors are specified or assing coords to begin of the line
  * @param coords - coordinations of a point - example [0, 10]
  */
  addLine(coords) {
    /*If the mouse clicked coords are already in points
    array asign them to adjust with existing ones */
    let possiblePreviousCoordsIndex = this.pointsArray.findIndex(el => this.targetsPreviousPoint(el));
    coords = possiblePreviousCoordsIndex === -1 ? coords : this.pointsArray[possiblePreviousCoordsIndex];


    if(this.previousPoint) {
      this.lineArray.push([this.previousPoint, coords, 'black']);
      this.previousPoint = coords;
    }
    else
      this.previousPoint = coords;
  }
  /**
  * @desc sets the begin of a line to 0/null;
  */
  breakLine() {
    this.previousPoint = 0;
  }
  getPoints() {
    return this.pointsArray;
  }
  getLines() {
    return this.lineArray;
  }
  /**
  * @desc draws a graph with given points and lines
  */
  drawGraph() {
    this.lineArray.forEach(el => {
      stroke(el[2]);
      strokeWeight(2);
      drawArrow(createVector(el[0][0], el[0][1]), createVector(el[1][0], el[1][1]), this.pointR, el[2]);
    });
    this.pointsArray.forEach((el, index) => {
      stroke(1);
      let color = 'green';
        if(this.targetsPreviousPoint(el))  {
          color = 'red';
        }
      fill(color);
      ellipse(el[0],el[1],this.pointR);
      
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(this.pointR/2);
      text(index, el[0], el[1]);
    });
  }
  targetsPreviousPoint(el) {
    if(mouseX > el[0] - this.pointR/2 && mouseX < el[0] + this.pointR/2) {
      if(mouseY > el[1] - this.pointR/2 && mouseY < el[1] + this.pointR/2)  {
        return [el[0], el[1]];
      }
    }
    return false;
  }
  /**
  * @desc generates a array from visualisation
  */
  generateGraphArray() {
    let pointsCount = this.pointsArray.length;

    let theGraph = this.pointsArray.map((point, index) => {
      let lines = this.lineArray.filter(line => line[0][0] === point[0] && line[0][1] === point[1]);
      let graphLevel = new Array(pointsCount).fill(0);
      graphLevel[index] = -1;
      lines.forEach(line => graphLevel[this.pointsArray.findIndex(point => point === line[1])] = this.getLineLength(line));
      return graphLevel;
    });

    return theGraph;
  }
  /**
  * @returns a length of the line
  * @param line - line to measure - example: [[0,10],[5,20]]
  */
  getLineLength(line) {
    return sqrt((pow(line[1][0] - line[0][0],2) + pow(line[1][1] - line[0][1],2)));
  }
  /**
  * @returns a angle of the line
  * @param line - line to get angle from - example: [[0,10],[5,20]]
  */
  getAngle(line) {
    return Math.atan2(line[1][1] - line[0][1], line[1][0] - line[0][0]); // / PI * 180) %360;
  }
  /**
  * @desc draws a red point saying in which direction the line is going
  * @param line - line to measure - example: [[0,10],[5,20]]
  */
  drawArrow(line) {
    push();
    let bX = line[0][0];
    let bY = line[0][1];

    let angle = this.getAngle(line);
    let length = this.getLineLength(line) - 10;
    let h = this.getLineLength(line) - length;

    let px = cos(angle) * length;
    let py = sin(angle) * length;

    strokeWeight(10);
    stroke(0);

    fill('red');
    stroke('red');
    point(bX + px, bY +py);
    pop();
  }
  /**
  * @desc calculates the shortes route between two points
  * @param {int} startPoint - index of a start point
  * @param {int} endPoint - index of a end point
  */
  calculateRoute(startPoint, endPoint) {
    this.lineArray = this.lineArray.map(line => {
      line[2] = 'black';
      return line;
    });
    let graph = this.generateGraphArray();
    let graphCalculator = new GraphCalculator(graph);
    let p = graphCalculator.calculate(startPoint).map(el => parseInt(el));
    this.changeColors(endPoint, p);
  }
  /**
  * @desc changes a colors of a lines recursively
  * @param {int} end - index of a end point
  * @param {array} p - array generated by caclulateRoute
  */
  changeColors(end, p) {
    if(p[end] === -1)
      return;
    else {
      let p1 = this.pointsArray[p[end]];
      let p2 = this.pointsArray[end];
      let indx = this.lineArray.findIndex(line => line[0] === p1 && line[1] === p2);
      this.lineArray[indx][2] = 'blue';
      return this.changeColors(p[end], p);
    }
  }
  /**
  * @desc opens new window with graph array ready to copy
  */
  openGraphToCopy() {
    let frog = window.open("","wildebeast","width=100vw,height=100vh,scrollbars=1,resizable=1")

    let text = 'let graph = [ </br>';
    this.generateGraphArray().forEach((level,index) => {
      text += '[';
      level.forEach((val, index, self) => {
        text += index < self.length ? `${Math.round(val)}, ` : `${Math.round(val)} `;
      });
      text += '] </br>';
    });
    text += ']';

    let html = "<html><head></head><body> <b>"+ text +"</body></html>"

    frog.document.open()
    frog.document.write(html)
    frog.document.close()
  }
}