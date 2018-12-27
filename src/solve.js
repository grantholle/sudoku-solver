const { head } = require('lodash')
const getPossibilities = require('./getPossibilities')
const checkForUniquePossibility = require('./checkForUniquePossibility')

let attempts = 0

const solve = grid => {
  let solved = true

  for (const coord in grid) {
    // Skip squares with values
    if (grid[coord].value) {
      continue
    }

    solved = false

    const square = grid[coord]
    getPossibilities(grid, square)

    // Check the square's possibilities to see whether
    // one of them is unique to one of groups
    if (attempts > 1 && square.possibilities.length > 1) {
      checkForUniquePossibility(grid, square)
    }

    // Set the value if there's only one possibility
    if (!square.value && square.possibilities && square.possibilities.length === 1) {
      square.value = head(square.possibilities)
      attempts = 0
    }
  }

  if (!solved && attempts++ < 2) {
    return solve(grid)
  }

  // Return a concatenated string of the solution
  return Object.keys(grid).map(c => grid[c].value || 'X').join(' ')
}

module.exports = solve
