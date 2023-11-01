const width = 1350, height = 630
const barWidth = 2
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

  let step = increment

  for (let i = 0; i < barCount; i++) {
    values.push(step)
    step += increment
    states.push(-1)
  }

  values = shuffle(values)
  heapSort()
}

function draw() {
  background(20)
  drawGraph()
}

function drawGraph() {
  noStroke()
  values.forEach((value, index) => {
    if (states[index] === 1) {
      fill([255, 0, 0])
    } else {
      fill(255)
    }
    rect(index * barWidth, height - value, barWidth, value)
  })
}

async function heapify(array, N, i) {
  // Assume that the root node is the larger one
  let largest = i
  let left = 2*i + 1
  let right = left + 1
  
  if (left < N && array[left] > array[largest]) {
    largest = left
  }
  
  if (right < N && array[right] > array[largest]) {
    largest = right
  }
  
  // if largest is not the root
  if (largest !== i) {
    // states[i] = 1
    // await sleep(0)
    swap(array, i, largest)
    // states[i] = -1
    await heapify(array, N, largest)
  }
}

async function buildMaxHeap(array) {
  const N = array.length

  for (let i = Math.floor(N / 2) - 1; i >= 0; i--) {
    await sleep(delay)
    await heapify(array, N, i)
  }
}

// Heapify the array
async function heapSort() {
  await buildMaxHeap(values)
  
  // Perform the sort
  for (let i = values.length - 1; i > 0; i--) {
    states[i] = 1
    await sleep(delay)
    swap(values, 0, i)
    states[i] = -1
    await heapify(values, i, 0)
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
