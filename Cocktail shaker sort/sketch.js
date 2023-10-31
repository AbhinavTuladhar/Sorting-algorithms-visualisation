const width = 1350, height = 630
const barWidth = 10
const increment = height / (width / barWidth)
const barCount = Math.floor(width / barWidth)

let values = []
let states = []
let delay = 5

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

  let step = increment

  for (let i = 0; i < barCount; i++) {
    values.push(step)
    step += increment
    states.push(-1)
  }

  values = shuffle(values)
  cocktailSort()
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

async function cocktailSort() {
  let i
  let swapped = true
  while(swapped) {
    swapped = false
    for(let i = 0; i < values.length - 2; i++) {
      if (values[i] > values[i+1]) {
        states[i] = 1
        await sleep(delay)
        swap(values, i, i+1)
        states[i] = -1
        swapped = true
      }
    }
    if (!swapped) {
      break
    }
    swapped = false
    for(let i = values.length - 2; i > 0; i--) {
      if (values[i] > values[i+1]) {
        states[i+1] = 1
        await sleep(delay)
        swap(values, i, i+1)
        states[i+1] = -1
        swapped = true
      }
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
