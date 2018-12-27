const { table } = require('table')
const { green, red, blue } = require('colors')
const { x, y } = require('./coordinates')

module.exports = grid => {
  const data = []

  data.push(['', ...x.map(c => red(c))])
  for (const yCoord of y) {
    const row = [red(yCoord)]

    for (const xCoord of x) {
      const square = grid[xCoord + yCoord]
      const value = square.value ? square.isOriginal ? square.value : green(square.value) : blue(square.possibilities)
      row.push(value)
    }

    data.push(row)
  }

  console.log(table(data))
}
