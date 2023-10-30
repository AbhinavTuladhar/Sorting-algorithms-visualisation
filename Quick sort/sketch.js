const width = 1350, height = 630
const barWidth = 2
const increment = height / (width / barWidth)
const barCount = Math.floor(width / barWidth)

/**
 * Version 1 is for the single pointer version,
 * Version 2 is for the double pointer version with the middle element as the pivot element.
 */

/**
 * 0 denotes the pivot element
 * 1 denotes the elements that are being considered for sorting.
 */
const colourMappings = new Map([
  [0, '#E0777D'],
  // [2, 'greenyellow'],
  [1, [0, 255, 0]]
])

let values = []
let states = []
let delay = 20
let sortFlag = false
let sweepInProgress = false

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

  // Shuffle the array
  let valuesShuffled = shuffle(values)

  // quickSortV1(values, 0, values.length)
  quickSortV2(valuesShuffled, 0, valuesShuffled.length - 1)
}

function draw() {
  background(20)
  drawGraph();
}

function drawGraph() {
  noStroke()
  values.forEach((value, index) => {
    if (states[index] === 0) {
      fill(colourMappings.get(0))
    } else if (states[index] === 1) {
      fill(colourMappings.get(1))
    } else {
      fill(230)
    }
    rect(index * barWidth, height - value, barWidth, value)
  })
}

async function quickSortV1(arr, start, end) {
  if (start >= end) {
    return
  }

  const index = await partition(arr, start, end)
  states[index] = -1
  await Promise.all([
    quickSortV1(arr, start, index - 1),
    quickSortV1(arr, index + 1, end)
  ])
}

async function quickSortV2(arr, start, end) {
  if (start >= end) {
    sortFlag = true
    return
  }

  const index = await partitionV2(arr, start, end)
  states[index] = -1
  await Promise.all([
    quickSortV2(arr, start, index - 1),
    quickSortV2(arr, index, end)
  ])
  // await quickSortV2(arr, start, index - 1)
  // await quickSortV2(arr, index, end)
}

async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    // identify the elements being considered currently
    states[i] = 1;
  }

  let pivotIndex = start
  let pivotValue = arr[end]
  states[pivotIndex] = 0
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex)
      states[pivotIndex] = -1
      pivotIndex++;
      states[pivotIndex] = 0
    }
  }
  await swap(arr, pivotIndex, end)
  return pivotIndex
}

async function partitionV2(arr, start, end) {
  for (let i = start; i < end; i++) {
    // identify the elements being considered currently
    states[i] = 1;
  }

  let pivotIndex = Math.floor((start + end) / 2)
  let pivotValue = arr[pivotIndex]
  let leftPointer = start
  let rightPointer = end
  states[leftPointer] = 0
  states[rightPointer] = 0
  states[pivotIndex] = 0

  while (leftPointer <= rightPointer) {
    while (arr[leftPointer] < pivotValue) {
      states[leftPointer] = -1
      leftPointer++;
      states[leftPointer] = 0
    }

    while (arr[rightPointer] > pivotValue) {
      states[rightPointer] = -1
      rightPointer--;
      states[rightPointer] = 0
    }

    if (leftPointer <= rightPointer) {
      await swap(arr, leftPointer, rightPointer)
      states[leftPointer] = -1
      leftPointer++;
      states[leftPointer] = 0
      states[rightPointer] = -1
      rightPointer--;
      states[rightPointer] = 0
    }
    states[leftPointer] = -1
    states[rightPointer] = -1
  }
  return leftPointer
}

async function swap(array, i, j) {
  await sleep(delay)
  let temp = array[i]
  array[i] = array[j]
  array[j] = temp
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}