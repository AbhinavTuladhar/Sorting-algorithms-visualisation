const width = 1350, height = 630
const barWidth = 2
const increment = height / (width / barWidth)
const barCount = Math.floor(width / barWidth)

let values = []
let states = []
let delay = 0
let radix = 2

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

  let step = 0

  for (let i = 0; i < barCount; i++) {
    values.push(step)
    step += increment
    states.push(-1)
  }

  // Shuffle the array
  values = shuffle(values)

  asyncRadixSort()
}

function draw() {
  background(20)
  drawGraph()
}

function drawGraph() {
  noStroke()
  for(let i = 0; i < values.length; i++) {
    if (states[i] === 1) {
      fill([255, 0, 0])
    } else {
      fill(255)
    }
    rect(i * barWidth, height - values[i], barWidth, values[i])
  }
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

async function asyncRadixSort() {
  const maxCount = mostDigits(values)
  
  for (let k = 0; k < maxCount; k++) {
  // for (let k = maxCount - 1; k >= -5; k--) {
    let buckets = Array.from({ length: radix }, () => [])

    for (let i = 0; i < values.length; i++) {
      let digit = getDigit(values[i], k)
      buckets[digit].push(values[i])
    }

    let index = 0;
    for (let i = 0; i < buckets.length; i++) {
      while (buckets[i].length > 0) {
        values[index++] = buckets[i].shift()
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
