const width = 1350, height = 630
const barWidth = 2
const increment = height / (width / barWidth)
const barCount = Math.floor(width / barWidth)

let values = []
let states = []
let valuesAndColours = []
let delay = 0

const shuffle = async (array) => { 
  await sleep(2);
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
}; 

async function setup() {
  createCanvas(width, height);
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

  await sleep(2000)
  valuesAndColours = await shuffle(valuesAndColours)
  await sleep(2000)
  shellSort(valuesAndColours)
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

async function shellSort(array) {
  let N = array.length

  // Start with a big gap, then reduce the gap
  for(let gap = Math.floor(N / 2); gap > 0; gap = Math.floor(gap/2)) {
    // Do a gapped insertion sort for this gap size.
    for (let i = gap; i < N; i++) {
      let temp = array[i].value
      let tempColour = array[i].colour
      let j
      for(j = i; j >= gap && array[j - gap].value > temp; j -= gap) {
        await sleep(delay)
        array[j].value = array[j - gap].value
        array[j].colour = array[j - gap].colour
      }
      // await sleep(delay)
      array[j].value = temp
      array[j].colour = tempColour
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
