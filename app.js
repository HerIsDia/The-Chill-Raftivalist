const intro = document.querySelector('#intro')
const raft = document.querySelectorAll('#raft')
const startBtn = document.querySelector('#start')

const musicSwitch = {
  intro: 10,
  raft: [68.32, 54.62, 54.6, 20.25],
}

let isPlaying = [false, -1]

startBtn.addEventListener('click', () => {
  if (!isPlaying[0]) {
    intro.currentTime = 0
    intro.play()
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
