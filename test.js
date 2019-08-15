const { S2Point } = require('./lib')

let point = S2Point.fromLonLat(135, 0)

console.log(point)
console.log(point.toUV())
console.log(point.toST())
