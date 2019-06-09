export default function map2D(array2D, func) {
  let i = 0
  return array2D.map((col, x) => col.map((item, y) => func(item, x, y, i++)))
}
