const width = 1350, height = 630
const barWidth = 2
const increment = height / (width / barWidth)
const barCount = Math.floor(width / barWidth)

let states = []
let valuesAndColours = []
let delay = 1
let radix = 4

const shuffle = (array) => { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
}; 

let sorting = false;
let currentDigit = 0;

function setup() {
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

  let step = 0

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

  asyncRadixSort(valuesAndColours)
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
}

const logBase = (n, base) => Math.log(n) / Math.log(base);

function getDigit(number, digit) {
  return Math.floor(Math.abs(number) / Math.pow(radix, digit)) % radix
}

function digitCount(number) {
  if (number === 0) return 1
  return Math.floor(logBase(Math.abs(number), radix)) + 1
}

function mostDigits(nums) {
  let maxDigits = 0
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]))
  }
  return maxDigits
}

async function asyncRadixSort(array) {
  const maxCount = mostDigits(array.map(obj => obj.value))
  
  for (let k = 0; k < maxCount; k++) {
  // for (let k = maxCount - 1; k >= -5; k--) {
    let buckets = Array.from({ length: radix }, () => [])

    for (let i = 0; i < array.length; i++) {
      let digit = getDigit(array[i].value, k)
      buckets[digit].push(array[i])
    }

    let index = 0;
    for (let i = 0; i < buckets.length; i++) {
      while (buckets[i].length > 0) {
        array[index++] = buckets[i].shift()
        states[index] = 1
        await sleep(delay)
        states[index] = -1
      }
    }
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
