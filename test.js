const { S2Point } = require('./lib')

// let point = S2Point.fromLonLat(135, 0)
//
// console.log(point)
// console.log(point.toUV())
// console.log(point.toST())

const point = S2Point.fromUV(4, -0.8190858328059994, -0.14520193630962516)

console.log(point)
console.log(point.toLonLat())
