class GraphCalculator {
  /**
  * @constructor
  * @desc class to preform operations on graphs
  * @param {array} graph - graph to work with
  */
  constructor(graph) {
    this.graph = graph;
    this.Q = graph;
    this.S = [];
    this.d = new Array(graph.length).fill(10000);
    this.p = new Array(graph.length).fill(-1);
    this.graphLength = graph.length;
  }
  /**
  * @desc calculates the shortes route from a point to all available points
  * @param {int} startPoint - index of a start point
  * @returns the recursive array with paths to previous points
  */
  calculate(startPoint) {
    this.d[startPoint] = 0;

    let tmp = 0;
    while(this.S.length < this.graphLength) {
      let lowIndex = this.minIndex();

      this.S.push(this.Q[lowIndex]);
      delete this.Q[lowIndex];

      for(let w in this.S[this.S.length -1]) {
        if(this.S[this.S.length -1][w] > 0) {
          if(this.d[w] > this.d[lowIndex] + this.S[this.S.length -1][w]) {
            this.d[w] = this.d[lowIndex] + this.S[this.S.length -1][w];
            this.p[w] = lowIndex;
          }
        }
      }
    }

    return this.p;
  }
  /**
  * @returns the index of a minumum d
  */
  minIndex() {
    let minIndex = this.d.indexOf(this.d.filter((el, index) => this.Q[index] !== undefined)[0]);

    for(let w in this.d) {
      if(this.Q[w] !== undefined) {
        minIndex = this.d[w] < this.d[minIndex] ? w : minIndex;
      }
    }
    return minIndex;
  }
}
