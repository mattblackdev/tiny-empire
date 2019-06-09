export default function forEach2D(array2D, func) {
  let i = 0
  array2D.forEach((col, j) => col.forEach((item, k) => func(item, j, k, i++)))
}
