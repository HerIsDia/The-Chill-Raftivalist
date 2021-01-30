const intro = document.querySelector('#intro')
const raft = document.querySelectorAll('#raft')
const startBtn = document.querySelector('button')

const musicSwitch = {
  intro: 10,
  raft: [68.32, 54.62, 54.6, 20.25],
}

startBtn.addEventListener('click', () => {
  intro.play()
})

intro.addEventListener('timeupdate', () => {
  if (intro.currentTime >= musicSwitch.intro) {
    raft[0].play()
  }
})

raft.forEach((rafting, i) => {
  rafting.addEventListener('timeupdate', () => {
    const nextraf = i + 1 > 3 ? 0 : i + 1
    if (raft[i].currentTime >= musicSwitch.raft[i] && raft[nextraf].paused) {
      raft[nextraf].currentTime = 0
      raft[nextraf].play()
    }
  })
})
