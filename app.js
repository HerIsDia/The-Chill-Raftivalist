const intro = document.querySelector('#intro')
const raft = document.querySelectorAll('#raft')
const startBtn = document.querySelector('#start')
const loading = document.querySelector('#loading')

const push = [intro, ...raft]
const musics = ['Intro', '1', '2', '3', '4']

let datamusic = [
  { isLoaded: false, percentage: [0, 0] },
  { isLoaded: false, percentage: [0, 0] },
  { isLoaded: false, percentage: [0, 0] },
  { isLoaded: false, percentage: [0, 0] },
  { isLoaded: false, percentage: [0, 0] },
]

musics.forEach((music, index) => {
  const req = new XMLHttpRequest()
  req.open('GET', `./music/${music}.wav`, true)
  req.responseType = 'blob'
  req.onprogress = (e) => {
    datamusic[index].percentage = [e.loaded, e.total]
    const prct = Math.floor(
      ((datamusic[0].percentage[0] +
        datamusic[1].percentage[0] +
        datamusic[2].percentage[0] +
        datamusic[3].percentage[0] +
        datamusic[4].percentage[0]) *
        100) /
        (datamusic[0].percentage[1] +
          datamusic[1].percentage[1] +
          datamusic[2].percentage[1] +
          datamusic[3].percentage[1] +
          datamusic[4].percentage[1])
    )
    loading.textContent = `Loading... (${prct}%)`
  }
  req.onloadend = (e) => {
    const result = e.target.response
    var r = URL.createObjectURL(result)
    push[index].src = r
    datamusic[index].isLoaded = true
    if (datamusic.filter((e) => e.isLoaded).length == 5) {
      loading.setAttribute('hidden', '')
      startBtn.removeAttribute('hidden', '')
    }
  }
  req.send()
})

const musicSwitch = [10.19, 68.5, 54.7, 54.7, 20.49]

let isPlaying = [false, -1]
let interval

startBtn.addEventListener('click', () => {
  if (!isPlaying[0]) {
    intro.currentTime = 0
    intro.play()
    isPlaying = [true, 0]
    startBtn.textContent = '> STOP <'
    interval = setInterval(switcher, 10)
  } else {
    startBtn.textContent = '> START <'
    clearInterval(interval)
    push[isPlaying[1]].pause()
    isPlaying = [false, -1]
  }
})

const switcher = () => {
  const i = isPlaying[1]
  const nextraf = i + 1 > 4 ? 1 : i + 1
  if (
    push[i].currentTime >= musicSwitch[i] &&
    push[nextraf].paused &&
    isPlaying[0]
  ) {
    push[nextraf].currentTime = 0
    isPlaying = [true, nextraf]
    push[nextraf].play()
  }
}
