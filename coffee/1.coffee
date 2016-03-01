canvas = document.getElementById('canvas')
context = canvas.getContext('2d')
bg = document.getElementById('bg')
balloonEl = document.getElementById('balloon')
balloons = []

class Balloon
  constructor: (x, y) ->
    this.x = x
    this.y = y
    this.created = Date.now()

canvas.height = window.innerHeight
canvas.width = window.innerWidth

canvas.addEventListener('click', (e) ->
  balloons.push new Balloon(e.clientX, e.clientY))

drawLoop = ->
  context.clearRect 0, 0, canvas.width, canvas.height
  context.drawImage bg, 0, 0
  for balloon, i in balloons
    x = balloon?.x
    y = balloon?.y
    timeSinceCreation = Date.now() - balloon?.created
    context.drawImage balloonEl, x, y
    if timeSinceCreation < 500
      balloon.y -= 4
    if timeSinceCreation >= 500 && timeSinceCreation < 1000
      balloon.y -= 5
    if timeSinceCreation >= 1000
      balloon.y -= 7
    if y <= -151
      balloons.splice i, 1
  requestAnimationFrame(drawLoop)

drawLoop()
