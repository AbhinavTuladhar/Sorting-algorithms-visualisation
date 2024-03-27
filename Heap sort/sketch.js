const width = 1350, height = 630
const barWidth = 1
const increment = height / (width / barWidth)
const barCount = Math.floor(width / barWidth)

let valuesAndColours = []
let delay = 0

const shuffle = (array) => { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
}; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60)
  colorMode(RGB)

  const colourList = [
    color(255, 0, 0),
    color(255, 127, 0),
    color(255, 255, 0),
    color(0, 255, 0),
    color(0, 0, 255),
    color(255, 0, 255)
  ]

  let step = increment

  for (let i = 0; i < barCount; i++) {
    step += increment

    const fromColourIndex = floor(i / (barCount / (colourList.length - 1)))
    const toColourIndex = ceil(i / (barCount / (colourList.length - 1)))
    const pct = (i % (barCount / (colourList.length - 1))) / (barCount / (colourList.length - 1))
    const interColour = lerpColor(colourList[fromColourIndex], colourList[toColourIndex], pct)

    valuesAndColours.push({
      value: step, colour: interColour
    })
  }

  valuesAndColours = shuffle(valuesAndColours)
  heapSort(valuesAndColours)
}

function draw() {
  background(20)
  drawGraph()
}

function drawGraph() {
  noStroke()
  valuesAndColours.forEach((obj, i) => {
    const { value, colour } = obj
    fill(colour)
    rect(i * barWidth, height - value, barWidth, value)
  })
}

/**
 * Convert an array into heap
 * @param {Array<{ value: number, color: color}> } array An array of objects with two keys - the value itself and the corresponding colour
 * @param {Number}                                N      The length of the array
 * @param {Number}                                i      The index of the parent element.
 */
async function heapify(array, N, i) {
  // Assume that the root node is the larger one
  let largest = i
  let left = 2*i + 1
  let right = left + 1
  
  if (left < N && array[left].value > array[largest].value) {
    largest = left
  }
  
  if (right < N && array[right].value > array[largest].value) {
    largest = right
  }
  
  // if largest is not the root
  if (largest !== i) {
    swap(array, i, largest)
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

async function heapSort(array) {
  // Heapify the array
  await buildMaxHeap(array)
  
  // Perform the sort
  for (let i = array.length - 1; i > 0; i--) {
    await sleep(delay)
    swap(array, 0, i)
    await heapify(array, i, 0)
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
