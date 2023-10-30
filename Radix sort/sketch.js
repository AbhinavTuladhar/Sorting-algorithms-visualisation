const width = 1350, height = 630
const barWidth = 2
const increment = height / (width / barWidth)
const barCount = Math.floor(width / barWidth)

let values = []
let delay = 100
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
  frameRate(2000)

  let step = 0

  for (let i = 0; i < barCount; i++) {
    values.push(step)
    step += increment
  }

  // Shuffle the array
  values = shuffle(values)
}

function draw() {
  background(20)
  drawGraph();

  if (!sorting && currentDigit < digitCount(Math.max(...values))) {
    sorting = true;
    radixSort(values, currentDigit)
      .then(result => {
        values = result;
        sorting = false;
        currentDigit++;
      });
  }
}

function drawGraph() {
  noStroke()
  values.forEach((value, index) => {
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

async function radixSort(array, digit) {
  const maxCount = digitCount(Math.max(...array));
  const buckets = Array.from({ length: radix }, () => [])
  let result

  for (let i = 0; i < array.length; i++) {
    let kthDigit = getDigit(array[i], digit)
    buckets[kthDigit].push(array[i])
  }
  await sleep(delay);
  result = [].concat(...buckets);

  return result;
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
