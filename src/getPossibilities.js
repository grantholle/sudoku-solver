module.exports = (grid, square) => {
  const possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  // Check all the groups
  for (const groupName in square.groups) {
    const group = square.groups[groupName]

    // Check each square of the group
    for (const groupCoord of group) {
      const value = grid[groupCoord].value

      if (!value) {
        continue
      }

      // If this group coord has a value,
      // remove it from the list of possibilities
      const index = possibilities.findIndex(v => v === value)

      if (index !== -1) {
        possibilities.splice(index, 1)
      }
    }
  }

  square.possibilities = possibilities
}
