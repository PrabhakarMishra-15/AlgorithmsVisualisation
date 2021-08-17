let count=0;
let element_input;
let key_input;
let arr=[];
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function element()
{
  let new_elements=element_input.value().split(',');
  console.log(new_elements)
  for(let e of new_elements)
  {
    arr[count]=parseInt(e)
    rect(100+count*100,100,100,100)
    textSize(42)
    text(e,135+count*100,160)
    count++
  }
  console.log(arr)
}
async function binary_search()
{
  let n=arr.length;
  let key=parseInt(key_input.value());
  let start=0, end=n-1;
  while(start<=end)
  {
    let mid=Math.floor((start+end)/2);
    console.log(mid);
    if(arr[mid]===key)
    {
      fill(0,255,0)
      await sleep(500);
      rect(100+mid*100,100,100,100)
      fill(0,0,0)
      textSize(42)
      text(arr[mid],135+mid*100,160)
      textSize(60)
      text("ELEMENT PRESENT AT INDEX "+ mid,100,300)
      return  mid
    }
    else if(arr[mid]<key)
    {
      console.log(arr[mid]);
      for(let i=start;i<=mid;i++)
      {
        fill(255,0,0)
        rect(100+i*100,100,100,100)
        fill(0,0,0)
        textSize(42)
        text(arr[i],135+i*100,160) 
        await sleep(500);
      }
    start=mid+1;
    }
    else
    {
      for(let i=mid;i<=end;i++)
      {
        fill(255,0,0)
        rect(100+i*100,100,100,100)
        fill(0,0,0)
        textSize(42)
        text(arr[i],135+i*100,160)
        await sleep(500);
      }
    end=mid-1;
    }
  }
  textSize(60)
  text("ELEMENT NOT PRESENT IN THE ARRAY",100,300)
  return -1;
}
function setup() {
  createCanvas(2000, 1000);
  background(220);
element_input=createInput();
  element_input.position(300,100)
  element_input.size(150,50)
let element_add=createButton("ADD");
  element_add.position(460,100)
  element_add.size(50,50)
element_add.mousePressed(element)
 key_input=createInput();
key_input.position(650,100)
  key_input.size(50,50)
  let key_button=createButton("SEARCH")
  key_button.position(720,100)
  key_button.size(100,50)
 key_button.mousePressed(binary_search);
  }
  function draw() 
  {
            
  }
