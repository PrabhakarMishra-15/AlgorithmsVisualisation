class Node
{
  constructor(value, x, y)
  {
    this.value = value
    this.x = x
    this.y = y
    this.color = color(255);
  }

  highlight() {
    this.color = color(255, 255, 0);
  }

  reset() {
    this.color = color(255);
  }

  show()
  {
    fill(this.color);
    circle(this.x, this.y, 50)

    fill(0)
    textSize(25)
    textAlign(CENTER, CENTER)
    text(this.value,this.x,this.y)
  }
}

class Graph {
  constructor() {
    this.nodes = [];
    this.edges = [];
    this.adj = {};
  }

  addNode() {
    const value = this.nodes.length;
    const node = new Node(value, mouseX, mouseY);
    this.nodes.push(node);
    this.adj[value] = [];
  }

  addEdge(u, v) {
    if(u < this.nodes.length && v < this.nodes.length && u !== v) {
      this.edges.push([u, v]);
      this.adj[u].push(v);
      this.adj[v].push(u);
    }
  }

  highlight(x) {
    this.nodes[x].highlight();
  }

  reset() {
    for(const node of this.nodes)
      node.reset();
  }

  async BFS(source) {
    this.reset();
    
    let queue = [source];
    let visited = {};
    
    while (queue.length > 0) {
      const node = queue.shift();
      visited[node] = true;
      this.highlight(node);

      await sleep(800);

      this.adj[node].forEach(neighbor => {
        if (!visited[neighbor])
          queue.push(neighbor)
      })
    }
  }

  show() {
    for(const [u, v] of this.edges) {
      const start = this.nodes[u];
      const end = this.nodes[v];

      line(start.x, start.y, end.x, end.y);
    }

    for(const node of this.nodes)
      node.show();
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function mouseClicked() {
  if(mouseY < 100)
    return;

  graph.addNode();
}

function addEdge() {
  const u = inp1.value();
  const v = inp2.value();
  graph.addEdge(u, v);
}

function performBFS()
{
  const source = inp3.value();
  graph.BFS(source);
}

let graph;
let inp1, inp2;

function setup() {
  graph = new Graph();

  createCanvas(windowWidth, windowHeight);
  background(220);

  inp1=createInput()
  inp1.position(300, 100)
  inp1.size(50, 50)
  inp1.style("text-align", "center");

  inp2=createInput()
  inp2.position(400, 100)
  inp2.size(50, 50)
  inp2.style("text-align", "center");

  button=createButton("ADD EDGE")
  button.position(500, 100)
  button.size(100, 50)
  button.mouseClicked(addEdge);
  
  inp3=createInput()
  inp3.position(650, 100)
  inp3.size(50, 50)
  inp3.style("text-align", "center");

  button=createButton("START")
  button.position(750, 100)
  button.size(100, 50)
  button.mouseClicked(performBFS)
  }
  
  function draw() {
    graph.show();
  }