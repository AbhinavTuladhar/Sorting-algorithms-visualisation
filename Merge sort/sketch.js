const width = 1350, height = 630
const barWidth = 10
const increment = height / (width / barWidth)
const barCount = Math.floor(width / barWidth)

let values = []
let states = []
const delay = 20

// const shuffle = (array) => { 
//   let j
//   for (let i = array.length - 1; i > 0; i--) { 
//     j = Math.floor(Math.random() * (i + 1))
//     [array[i], array[j]] = [array[j], array[i]]
//   } 
//   return array
// }; 

let sorting = false;

function setup() {
  createCanvas(width, height);
  frameRate(60)

  let step = 0
  for (let i = 0; i < barCount; i++) {
    values.push(step)
    states.push(-1)
    step += increment
  }

  values = shuffle(values)
  mergeSort(values)
}

function draw() {
  background(20)
  drawGraph()
}

// async function mSort(array) {
//   sorting = true
//   await mergeSort(array)
//   sorting = false
// }

function drawGraph() {
  stroke(0)
  fill(255)
  values.forEach((value, index) => {
    rect(index * barWidth, height - value, barWidth, value)
  });
}

async function mergeSort(array) {
  if (array.length <= 1) {
    return;
  }

  const middle = Math.floor(array.length / 2)
  const leftArray = array.slice(0, middle)
  const rightArray = array.slice(middle)

  await mergeSort(leftArray)
  await mergeSort(rightArray)
  await merge(leftArray, rightArray, array)
}

async function merge(leftArray, rightArray, array) {
  let leftSize = leftArray.length
  let rightSize = rightArray.length
  let l = 0, r = 0
  let sorted = []

  while (l < leftSize && r < rightSize) {
    if (leftArray[l] < rightArray[r]) {
      sorted.push(leftArray[l++])
    } else {
      sorted.push(rightArray[r++])
    }
    await sleep(delay)
  }

  while (l < leftSize) {
    sorted.push(leftArray[l++])
    await sleep(delay)
  }

  while (r < rightSize) {
    sorted.push(rightArray[r++])
    await sleep(delay)
  }

  let index = 0
    while (sorted.length > 0) {
      array[index++] = sorted.shift()
      await sleep(delay)
    }

  // for (let i = 0; i < array.length; i++) {
  //   // array[i] = sorted[index++]
  //   array[i] = sorted.shift()
  //   await sleep(delay)
  // }  
}

async function sleep(value) {
  return new Promise(resolve => setTimeout(resolve, value))
}