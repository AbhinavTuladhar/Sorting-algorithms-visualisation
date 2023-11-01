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
  oddEvenSort(values)
}

function draw() {
  background(20)
  drawGraph()
}

async function oddEvenSort(array) {
  let N = array.length
  let sorted = false
  while (!sorted) {
    sorted = true
    let temp = 0

    // Perform bubble sort on odd indexed element
    for(let i = 1; i <= N - 2; i += 2) {
      if (array[i] > array[i+1]) {
        states[i] = 1
        await sleep(delay)
        swap(array, i, i+1)
        states[i] = -1
        sorted = false
      }
    }

    // Perform bubble sort on odd indexed element
    for(let i = 0; i <= N - 2; i += 2) {
      if (array[i] > array[i+1]) {
        states[i] = 1
        await sleep(delay)
        swap(array, i, i+1)
        states[i] = -1
        sorted = false
      }
    }
  }
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

function swap(array, i, j) {
  let temp = array[i]
  array[i] = array[j]
  array[j] = temp
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
