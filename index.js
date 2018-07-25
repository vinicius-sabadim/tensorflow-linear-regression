const tf = require('@tensorflow/tfjs')
require('@tensorflow/tfjs-node')

const x_vals = []
const y_vals = []

for (i = 0; i < 10; i++) {
  x_vals.push(Math.random())
  y_vals.push(Math.random())
}

const xs = tf.tensor1d(x_vals)
const ys = tf.tensor1d(y_vals)

let m = tf.variable(tf.scalar(Math.random()))
let b = tf.variable(tf.scalar(Math.random()))

const optimizer = tf.train.sgd(0.2)

const loss = (pred, labels) => pred.sub(labels).square().mean()

const f = (xs) => xs.mul(m).add(b)

f(tf.tensor1d([0, 1])).print()

for (let i = 0; i < 1000; i++) {
  optimizer.minimize(() => loss(f(xs), ys))
}

f(tf.tensor1d([0, 1])).print()