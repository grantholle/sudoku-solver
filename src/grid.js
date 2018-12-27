const { x, y } = require('./coordinates')
const groups = require('./groups')

module.exports = rawInput => {
  const grid = {}
  let index = 0

  const input = typeof rawInput === 'object' ? rawInput : rawInput.split(' ')

  if (input.length % 9 !== 0) {
    throw new Error('Invalid input detected')
  }

  for (const xCoord of x) {
    for (const yCoord of y) {
      if (!input[index]) {
        throw new Error('Invalid input detected')
      }

      const coord = xCoord + yCoord
      const parsed = parseFloat(input[index++])
      const value = isNaN(parsed) ? '' : parsed

      grid[coord] = {
        value,
        isOriginal: !!value,
        groups: groups[coord]
      }
    }
  }

  return grid
}
