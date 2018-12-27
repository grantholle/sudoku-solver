/* global describe, it */
const assert = require('assert')
const gridBuilder = require('../src/grid')
const solve = require('../src/solve')
const { promisify } = require('util')
const exec = promisify(require('child_process').exec)

const testCases = {
  easy: // 1
    '1 5 2 9 x x 6 x 7 ' +
    '4 x x 1 7 x 2 x x ' +
    'x 6 9 5 x x x 4 1 ' +
    '8 x 5 3 x x x x 4 ' +
    '9 7 4 x x x 3 1 5 ' +
    '3 x x x x 7 9 x 2 ' +
    '5 8 x x x 1 4 7 x ' +
    'x x 7 x 6 5 x x 3 ' +
    '6 x 1 x x 4 5 2 8',
  medium: // 75
    'x 6 x x x 3 4 x x ' +
    'x 9 5 x x x x x 3 ' +
    'x x x x 5 1 x 7 x ' +
    '1 5 6 x x 2 x x x ' +
    'x x x 5 x 8 x x x ' +
    'x x x 6 x x 7 5 9 ' +
    'x 1 x 3 6 x x x x ' +
    '4 x x x x x 3 2 x ' +
    'x x 3 4 x x x 1 x',
  hard: // 100
    'x x x x x 6 x x 5 ' +
    'x x x x x 3 9 7 x ' +
    '7 1 6 x x x x x x ' +
    'x 6 x 7 5 x x 2 x ' +
    'x x 2 x x x 8 x x ' +
    'x 7 x x 9 1 x 6 x ' +
    'x x x x x x 7 9 1 ' +
    'x 2 3 9 x x x x x ' +
    '9 x x 8 x x x x x',
  expert: // 116
    'x x x x x x 8 6 3 ' +
    '7 4 x x x 5 x x x ' +
    '1 x x x 2 9 x x x ' +
    'x x x x x 2 x 7 x ' +
    'x 2 9 x x x 1 8 x ' +
    'x 7 x 9 x x x x x ' +
    'x x x 7 9 x x x 8 ' +
    'x x x 3 x x x 4 9 ' +
    '9 5 6 x x x x x x'
}

const solutions = {
  easy:
    '1 5 2 9 4 8 6 3 7 ' +
    '4 3 8 1 7 6 2 5 9 ' +
    '7 6 9 5 2 3 8 4 1 ' +
    '8 2 5 3 1 9 7 6 4 ' +
    '9 7 4 6 8 2 3 1 5 ' +
    '3 1 6 4 5 7 9 8 2 ' +
    '5 8 3 2 9 1 4 7 6 ' +
    '2 4 7 8 6 5 1 9 3 ' +
    '6 9 1 7 3 4 5 2 8',
  medium:
    '2 6 1 8 7 3 4 9 5 ' +
    '7 9 5 2 4 6 1 8 3 ' +
    '8 3 4 9 5 1 6 7 2 ' +
    '1 5 6 7 9 2 8 3 4 ' +
    '9 4 7 5 3 8 2 6 1 ' +
    '3 2 8 6 1 4 7 5 9 ' +
    '5 1 2 3 6 7 9 4 8 ' +
    '4 7 9 1 8 5 3 2 6 ' +
    '6 8 3 4 2 9 5 1 7',
  hard:
    '2 3 9 4 7 6 1 8 5 ' +
    '8 5 4 1 2 3 9 7 6 ' +
    '7 1 6 5 8 9 2 4 3 ' +
    '4 6 1 7 5 8 3 2 9 ' +
    '5 9 2 6 3 4 8 1 7 ' +
    '3 7 8 2 9 1 5 6 4 ' +
    '6 8 5 3 4 2 7 9 1 ' +
    '1 2 3 9 6 7 4 5 8 ' +
    '9 4 7 8 1 5 6 3 2',
  expert:
    '5 9 2 1 4 7 8 6 3 ' +
    '7 4 8 6 3 5 2 9 1 ' +
    '1 6 3 8 2 9 7 5 4 ' +
    '8 3 1 4 6 2 9 7 5 ' +
    '4 2 9 5 7 3 1 8 6 ' +
    '6 7 5 9 1 8 4 3 2 ' +
    '3 1 4 7 9 6 5 2 8 ' +
    '2 8 7 3 5 1 6 4 9 ' +
    '9 5 6 2 8 4 3 1 7'
}

describe('Sudoku Solver', () => {
  for (const level in testCases) {
    it(`should solve level ${level} puzzles`, () => {
      const test = testCases[level]
      const solution = solutions[level]

      const grid = gridBuilder(test)
      const answer = solve(grid)

      assert.strictEqual(answer, solution)
    })
  }

  it('should run by using arguments', async () => {
    const { stdout, stderr } = await exec('node index.js x x x x x 6 x x 5 x x x x x 3 9 7 x 7 1 6 x x x x x x x 6 x 7 5 x x 2 x x x 2 x x x 8 x x x 7 x x 9 1 x 6 x x x x x x x 7 9 1 x 2 3 9 x x x x x 9 x x 8 x x x x x')

    if (stderr) {
      throw new Error(stderr)
    }

    console.log(stdout)
  })

  it('should run by using a file', async () => {
    const { stdout, stderr } = await exec('node index.js test/test.txt')

    if (stderr) {
      throw new Error(stderr)
    }

    console.log(stdout, stderr)
  })
})
