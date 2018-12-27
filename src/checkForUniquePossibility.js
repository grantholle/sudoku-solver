const { uniq } = require('lodash')

module.exports = (grid, square) => {
  for (const groupName in square.groups) {
    const group = square.groups[groupName]
    let unique = []

    for (const groupCoord of group) {
      if (!grid[groupCoord].value && grid[groupCoord].possibilities) {
        unique.push(...grid[groupCoord].possibilities)
      }
    }

    unique = uniq(unique)

    for (const possibility of square.possibilities) {
      if (unique.indexOf(possibility) === -1) {
        square.possibilities = [possibility]
        break
      }
    }

    if (square.possibilities.length === 1) {
      break
    }
  }
}
