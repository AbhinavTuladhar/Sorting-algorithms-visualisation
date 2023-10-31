const width = 1350, height = 630
const barWidth = 10
const increment = height / (width / barWidth)
const barCount = Math.floor(width / barWidth)

let values = []
let states = []
let i = 0;
let j = i + 1;
let frequency = 32
let delay = 0

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
  asyncSelectionSort()
}

function draw() {
  background(20)
  // selectionSort()
  drawGraph()
}

function drawGraph() {
  stroke(0)
  values.forEach((value, index) => {
    if (states[index] === 1) {
      fill([255, 0, 0])
    } else {
      fill(255)
    }
    rect(index * barWidth, height - value, barWidth, value)
  })
}

async function asyncSelectionSort() {
  let min
  for (let i = 0; i < values.length; i++) {
    for(let j = i + 1; j < values.length; j++) {
      min = i
      if (values[j] < values[min]) {
        min = j
      }
      if (min !== i) {
        states[min] = 1
        await sleep(delay)
        swap(values, i, min)
        states[min] = -1
      }
    }
  }
}

function selectionSort() {
  for (let k = 0; k < frequency; k++) {
    if (i <= values.length) {
      min = i
      j++;

      if (values[j] < values[min]) {
        min = j
      }
      
      if (min !== i) {
        //swap
        [values[i], values[min]] = [values[min], values[i]];
      }

      if (j >= values.length) {
        j = i + 1
        i++
      }
    } else {
      noLoop()
    }
  }
}

function selectionSortActual(array) {
  let min = 0

  for (let i = 0; i < array.length; i++) {
    // Assume that the current element is the minimum
    min = i

    // Iterate through the rest of the array to find the smallest element
    for(let j = i + 1; j < array.length; j++) {
      if (arr[j] < arr[min]) {
        min = j
      }

    }
    if (min !== i) {
      //swap
      [array[i], array[min]] = [array[min], array[i]];
    }
  }
}

function swap(array, i, j) {
  let temp = array[i]
  array[i] = array[j]
  array[j] = temp
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
