import forEach2D from './forEach2D'

export default function filter2D(array2D, func) {
  const results = []
  forEach2D(array2D, (item, x, y) => {
    if (func(item, x, y, array2D)) results.push(item)
  })
  return results
}
