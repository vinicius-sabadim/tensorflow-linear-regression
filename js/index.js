import { predict } from './model'

const canvas = document.querySelector('#my-canvas')
const ctx = canvas.getContext('2d')

const canvasWidth = canvas.width
const canvasHeight = canvas.height

const x_vals = []
const y_vals = []

canvas.addEventListener('click', (e) => {
  const pos = getMousePos(e)
  const posx = pos.x
  const posy = pos.y

  x_vals.push(posx / canvasWidth)
  y_vals.push(posy / canvasHeight)

  const data = predict(x_vals, y_vals)
  drawLine(data)

  x_vals.forEach((_, index) => drawCircle(x_vals[index], y_vals[index]))
})

const drawCircle = (x, y) => {
  ctx.fillStyle = '#000000'
  ctx.beginPath()
  ctx.arc(x * canvasWidth, y * canvasHeight, 2, 0, 2 * Math.PI)
  ctx.fill()
}

const drawLine = (data) => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  ctx.moveTo(0, (1 - data[0]) * canvasHeight)
  ctx.lineTo(canvasWidth, Math.abs(1 - data[1]) * canvasHeight)
  ctx.lineWidth = 2
  ctx.strokeStyle = 'pink'
  ctx.stroke()
}

const getMousePos = (e) => {
  const rect = canvas.getBoundingClientRect()
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }
}