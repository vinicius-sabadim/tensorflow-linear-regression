import * as tf from'@tensorflow/tfjs'

let m = tf.variable(tf.scalar(Math.random()))
let b = tf.variable(tf.scalar(Math.random()))

// f = mx + b
const f = (x_vals) => {
  return tf.tidy(() => {
    const xs = tf.tensor1d(x_vals)
    return xs.mul(m).add(b)
  })
}

const loss = (pred, labels) => pred.sub(labels).square().mean()

const optimizer = tf.train.sgd(0.2)

const train = (x_vals, y_vals) => {
  const ys = tf.tensor1d(y_vals.map((value) => 1 - value))
  for (let i = 0; i < 100; i++) {
    optimizer.minimize(() => loss(f(x_vals), ys))
  }
  ys.dispose()
}

export const predict = (x_vals, y_vals) => {
  return tf.tidy(() => {
    train(x_vals, y_vals)
    const pred = f([0, 1])
    return pred.dataSync()
  })
}