const { S2Point } = require('./lib')

// const point = S2Point.fromLonLat(-98.26171875, 39.027718840211605)
//
// console.log(point)
// console.log(point.toUV())
// console.log(point.toST())

const point = S2Point.fromUV(5, 0.8190858328059994, -0.14520193630962516)

console.log(point)
console.log(point.toLonLat())
