const width = 1350, height = 630
const barWidth = 10
const increment = height / (width / barWidth)
const barCount = Math.floor(width / barWidth)

let values = []
let states = []
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
  createCanvas(width, height);
  frameRate(60)
  colorMode(RGB)

  const colourList = [
    color(255, 0, 0),    // Red
    color(255, 165, 0),  // Orange
    color(255, 255, 0),  // Yellow
    color(0, 255, 0),    // Green
    color(0, 0, 255),    // Blue,
    color(255, 0, 255),  // Fuchsia
    color(255, 0, 0),    // Red
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
  cocktailSort(valuesAndColours)
}

function draw() {
  background(20)
  drawGraph()
}

function drawGraph() {
  noStroke()
  valuesAndColours.forEach((obj, index) => {
    const { value, colour } = obj
    fill(colour)
    rect(index * barWidth, height - value, barWidth, value)
  })
  // stroke(0)
  // fill(255)
  // valuesAndColours.forEach((obj, index) => {
  //   if (states[index] === 1) {
  //     fill([255, 0, 0])
  //   } else {
  //     fill(255)
  //   }
  //   rect(index * barWidth, height - obj.value, barWidth, obj.value)
  // })
}

async function cocktailSort(array) {
  let i
  let swapped = true
  while(swapped) {
    swapped = false
    for(let i = 0; i < array.length - 2; i++) {
      if (array[i].value > array[i+1].value) {
        states[i] = 1
        await sleep(delay)
        swap(array, i, i+1)
        states[i] = -1
        swapped = true
      }
    }
    if (!swapped) {
      break
    }
    swapped = false
    for(let i = array.length - 2; i > 0; i--) {
      if (array[i].value > array[i+1].value) {
        states[i+1] = 1
        await sleep(delay)
        swap(array, i, i+1)
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
