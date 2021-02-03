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

const musicSwitch = {
  intro: 10,
  raft: [68.32, 54.62, 54.6, 20.25],
}

let isPlaying = [false, -1]

startBtn.addEventListener('click', () => {
  if (!isPlaying[0]) {
    intro.currentTime = 0
    intro.play()
    raft[0].load()
    isPlaying = [true, -1]
    startBtn.textContent = '> STOP <'
  } else {
    startBtn.textContent = '> START <'
    if (isPlaying[1] > -1) {
      raft[isPlaying[1]].pause()
    } else {
      intro.pause()
    }
    isPlaying = [false, -1]
  }
})

intro.addEventListener('timeupdate', () => {
  if (
    intro.currentTime >= musicSwitch.intro &&
    raft[0].paused &&
    isPlaying[0]
  ) {
    raft[0].currentTime = 0
    raft[0].play()
    isPlaying = [true, 0]
  }
})

raft.forEach((rafting, i) => {
  rafting.addEventListener('timeupdate', () => {
    const nextraf = i + 1 > 3 ? 0 : i + 1
    if (
      raft[i].currentTime >= musicSwitch.raft[i] &&
      raft[nextraf].paused &&
      isPlaying[0]
    ) {
      raft[nextraf].currentTime = 0
      isPlaying = [true, nextraf]
      raft[nextraf].play()
    }
  })
})
