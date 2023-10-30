const width = 1350, height = 630
const barWidth = 10
const increment = height / (width / barWidth)
const barCount = Math.floor(width / barWidth)

let values = []
let i = 0;
let j = 0;
let frequency = 8

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
  }

  values = shuffle(values)
}

function draw() {
  background(20)
  bubbleSort()
  drawGraph()
}

function bubbleSort() {
  for (k = 0; k < frequency; k++) {
    if (i < values.length) {
      if (values[j] > values[j + 1]) {
        swap(values, j, j + 1)
      }
      j++;

      if (j >= values.length - i - 1) {
        j = 0;
        i++;
      }
    } else {
      noLoop()
    }
  }
}

function drawGraph() {
  stroke(0)
  fill(255)
  values.forEach((value, index) => {
    rect(index * barWidth, height - value, barWidth, value)
  })
}

function swap(array, i, j) {
  let temp = array[i]
  array[i] = array[j]
  array[j] = temp
}