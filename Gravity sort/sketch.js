const width = 1350, height = 630
const barWidth = 10
const increment = height / (width / barWidth)
const barCount = Math.floor(width / barWidth)

let values = []
let states = []
let delay = 10

const shuffle = (array) => { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
}; 

function setup() {
  createCanvas(width, height);
  frameRate(60)

  let step = 0

  for (let i = 0; i < barCount; i++) {
    values.push(step)
    step += increment
    states.push(-1)
  }

  values = shuffle(values)
  beadSort(values, values.length)
}

function draw() {
  background(20)
  drawGraph()
}

function drawGraph() {
  stroke(0)
  fill(255)
  values.forEach((value, index) => {
    if (states[index] === 1) {
      fill([255, 0, 0])
    } else {
      fill(255)
    }
    rect(index * barWidth, height - value, barWidth, value)
  })
}

async function beadSort(a, len) {
	// Find the maximum element
	let max = a[0];
	for (let i = 1; i < len; i++) {
		if (a[i] > max) {
			max = a[i];
		}
	}

	// allocating memory
	const beads = new Array(len).fill().map(() => new Array(max).fill(0));

	// mark the beads
	for (let i = 0; i < len; i++) {
		for (let j = 0; j < a[i]; j++) {
			beads[i][j] = 1;
		}
	}

	// move down the beads
	for (let j = 0; j < max; j++) {
		let sum = 0;
		for (let i = 0; i < len; i++) {
      // await sleep(delay)
			sum += beads[i][j];
			beads[i][j] = 0;
		}
		for (let i = len-1; i >= len-sum; i--) {
      await sleep(delay)
			beads[i][j] = 1;
		}
	}

	// to get sorted array
	const result = new Array(len);
	for (let i = 0; i < len; i++) {
		let sum = 0;
		for (let j = 0; j < max; j++) {
      // await sleep(delay)
			sum += beads[i][j];
		}
		result[i] = sum;
	}

  // return result
	
  let index = 0
  while(result.length) {
    await sleep(delay)
    a[index++] = result.shift()
  }

  console.log(a)
}

function swap(array, i, j) {
  let temp = array[i]
  array[i] = array[j]
  array[j] = temp
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
