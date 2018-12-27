const gridBuilder = require('./src/grid')
const solve = require('./src/solve')
const print = require('./src/print')
const { red } = require('colors')
const { promisify } = require('util')
const fs = require('fs')
const read = promisify(fs.readFile)
const getInput = async () => {
  let inputs = process.argv.slice(2)

  // If there's only one argument, assume it's a file
  if (inputs.length === 1) {
    inputs = await read(inputs[0], 'utf8')
  }

  return inputs
}

getInput().then(inputs => {
  try {
    const grid = gridBuilder(inputs)
    solve(grid)
    print(grid)
  } catch (err) {
    console.error(red(err))
  }
}).catch(err => {
  console.error(red(err))
})
