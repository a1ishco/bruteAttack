const alphabet = ` abcdefghijklmnopqrstuvwyxzABCDEFGHIJKLMNOPQRSTUWYXZ0123456789!?@#$%^*()_+"':;{}[]|\~/,.`
const $result = document.querySelector('.result')
const $input = document.querySelector('.input')
const $form = document.querySelector('form')
const $time = document.querySelector('.time')
let timeout

$form.addEventListener('submit', event => {
  event.preventDefault()
  clearTimeout(timeout)
  validate()
  start($input.value.toLowerCase(), alphabet)
})

function randomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)]
}

async function start(string, dict) {
  $result.innerHTML = $time.innerHTML = ''
  const start = performance.now()
  for (let i in string) {
    await bruteForce(string[i], dict)
  }
  const end = performance.now()
  updateTime(start, end)
}

function validate() {
  const input = $input.value.toLowerCase()
  const regex = new RegExp(`[^${alphabet}]`, 'g')
  $input.value = input.replace(regex, '')
}

async function bruteForce(letter, dict) {
  await sleep(10)
  const attempt = randomFromArray(dict)
  let result = $result.innerHTML
  $result.textContent = result.substr(0, result.length - 1) + attempt
  if (attempt === letter) {
    $result.textContent += ' '
  } else {
    dict = dict.replace(attempt, '')
  }
  return attempt !== letter
    ? bruteForce(letter, dict)
    : attempt
}

function updateTime(start, end) {
  const diff = end - start
  const seconds = diff / 1000
  const str = seconds.toString()
  const arr = str.split('.')
  const s = arr[0]
  const ms = parseInt(arr[1].substr(0, 3))
  $time.innerHTML = `${s} saniyə, ${ms} ms`
}

function sleep(duration) {
  return new Promise(resolve => timeout = setTimeout(() => resolve(), duration))
}
function visibleCode() {  
  document.getElementById("codes").style.display="block";

}


start($input.value.toLowerCase(), alphabet)