let values=[];
let w = 80;
let states = [];

function setup() {
	height = 650
	width = 1 * windowWidth;
	let canvas = createCanvas(width, height);

   // values = new Array(floor(width / w))
	//for (let i = 0; i < values.length; i++) {
	//	values[i] = random(300)
		//values[i] = 12*i*i-7*i

		//states[i] = -1
	//}

	setupGUI();
}

/*
white - an element lyeing in the range start to end
Grey - an element lyeing outside this range
*/
async function quickSort(arr, start, end) {
	if (start >= end) {
		return
	}
    for (let i = start; i <= end; i++) 
	   states[i]=Colors.WHITE

	for (let i = 0; i < start; i++) 
		states[i] = Colors.GREY;
    for (let i = end+1; i < arr.length; i++) 
		states[i] = Colors.GREY;
      await sleep(500)
	let index = await partition(arr, start, end);

	/*await Promise.all([
		quickSort(arr, start, index - 1),
		quickSort(arr, index + 1, end)
	]);
	*/
	 
	await quickSort(arr, start, index - 1)
	await quickSort(arr, index + 1, end)
	if(start===0 && end===arr.length-1)
	{
		for (let i = start; i <= end; i++) 
		states[i] = Colors.WHITE;
	}
	/*for (let i = 0; i < start; i++) 
		states[i] = -1;
    for (let i = end+1; i < arr.length; i++) 
		states[i] = -1;
*/
}

/*
 Orange - Pivot Color
 Light Blue - Element <  Pivot
 Dark Blue - Element >= Pivot
*/

async function partition(arr, start, end) {
	//for (let i = start; i <= end; i++) {
		//states[i] = 1;
	//}
	let pivotIndex = start;
	let pivotValue = arr[end];
	states[end] = Colors.ORANGE;
	
	for (let i = start; i < end; i++) {
		await sleep(800)
		if (arr[i] < pivotValue) {
			await swap(arr, i, pivotIndex)
			states[i]=Colors.DARK_BLUE;
			states[pivotIndex]=Colors.LIGHT_BLUE;
			//states[pivotIndex] = -1;
			pivotIndex++;
			//states[pivotIndex] = 0;
		}
		else{
			states[i]=Colors.DARK_BLUE;
		}
	}
	await sleep(800)
	 await swap(arr, pivotIndex, end);
	states[pivotIndex]=Colors.ORANGE;
	states[end]=Colors.DARK_BLUE;

	
    await sleep(4500)
	/*for (let i = start; i <= end; i++) {
		states[i] = -1;
	}*/
	/*j=j+20;
    for(let i = 0; i < values.length; i++)
	fill(255);
	text(values[i] , 20,80+j);*/
	return pivotIndex;
}

async function swap(arr, a, b) {
	if(a===b)
	return
	states[a]=Colors.VIOLET
	states[b]=Colors.VIOLET
	await sleep(600)
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
	await sleep(600)

}

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
const Colors ={ 
	GREY:0,
	WHITE:1,
	ORANGE:2,
	LIGHT_BLUE:3,
	DARK_BLUE:4,
	VIOLET:5
     };
Object.freeze(Colors);

function draw() {
	background(2);
	if(values.length === 0)
		return;

	let xOffset= (width-w*values.length)/2;
	let max =  Math.max(...values);
	for (let i = 0; i < values.length; i++) {
		stroke(0)
		strokeWeight(0.5)
		colorMode(HSB)
		fill(values[i], 100, 100);
		//rect(i * w, 100, w, 100)
		colorMode(RGB)
		if (states[i] === Colors.GREY) {
			fill(40)
		} else if (states[i] === Colors.WHITE) {
			fill(255)
		} else if (states[i] === Colors.ORANGE){
		     fill(255,165,0)
   
		} else if (states[i] === Colors.LIGHT_BLUE){
		     fill(0,255,255)
        }else if (states[i] === Colors.DARK_BLUE){
		     fill(0,0,255)
       }
        else if (states[i] === Colors.VIOLET){
		     fill(127,0,255)
       }
		rect(xOffset+ i* w, 500, w, -(values[i]/max)*400)
		fill(0);
		text(values[i],xOffset+ i* w+40,480)
		
	}
	/*let s ="Hello WOrld";
	fill(255);
	Text(s,1000,40, 1000,1000);*/
	//rect(1100, 500, 300, 200);
	//text("foo", 0, 0);
	let s1 = 'White - An element lying in the range start to end ';
	let s2 = 'Grey  - An element lying outside this range.';
	let s3 = 'Orange     - Pivot Color';
    let s4 = 'Light Blue - Element <  Pivot';
    let s5 = 'Dark Blue  - Element >= Pivot';
	let s6 = 'Violet         - Swapping Values (Rectangles)';
fill(255);
text(s1 , 1040, 510, 290, 20); // Text wraps within text box
fill(80);
text(s2 , 1040, 530, 290, 20)
fill(255,165,0);
text(s3 , 1040, 550, 290, 20)
fill(0,255,255);
text(s4 , 1040, 570, 290, 20)
fill(0,50,255);
text(s5 , 1040, 590, 290, 20)
fill(157,0,255);
text(s6 , 1040, 610, 290, 20)
}
let inputElem;
function setupGUI() {

	sortButton = createButton('Sort');
	sortButton.mousePressed(sortPressed);
	sortButton.position(240, 40)
	inputElem = createInput(''); 
    //inputElem.input(onInput); 
    inputElem.position(20, 40)
	addButton = createButton("Add");
	addButton.mousePressed(createArray)
	addButton.position(200,40)
	//values = inputElem;
	//sizeButton = createButton('Size');
	//sizeButton.position(100, 20)

}

function createArray()
{
    let input = inputElem.value().split(' ');
	 values = input.map(x => parseInt(x)).filter(x => !isNaN(x));
	 states=[];
	 for (let i = 0; i < values.length; i++)
	 {
		 states.push(Colors.WHITE);
	 }

}

function sortPressed() {
	//createArray()
	quickSort(values, 0, values.length - 1)

}

function reset_values() {
	console.log('reset')

}