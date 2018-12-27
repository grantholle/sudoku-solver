module.exports = (coords, set) => {
  return set.find(s => s.indexOf(coords) !== -1).filter(c => c !== coords)
}
