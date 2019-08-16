// @flow
import S2Point from './S2Point'

export type Face = 0 | 1 | 2 | 3 | 4 | 5

export function linearSTtoUV (s: number) {
  return 2 * s - 1
}

export function linearUVtoST (u: number) {
  return 0.5 * (u + 1)
}

export function tanSTtoUV (s: number) {
  return Math.tan(Math.PI / 2 * s - Math.PI / 4)
}

export function tanUVtoST (u: number) {
  return (2 * (1 / Math.PI)) * (Math.atan(u) + Math.PI / 4)
}

export function quadraticSTtoUV (s: number) {
  if (s >= 0.5) return (1 / 3) * (4 * s * s - 1)
  return (1 / 3) * (1 - 4 * (1 - s) * (1 - s))
}

export function quadraticUVtoST (u: number) {
  if (u >= 0) return 0.5 * Math.sqrt(1 + 3 * u)
  return 1 - 0.5 * Math.sqrt(1 - 3 * u)
}

export function faceUVtoXYZ (face: Face, u: number, v: number): S2Point {
  switch (face) {
    case 0: return new S2Point(1, u, v)
    case 1: return new S2Point(-u, 1, v)
    case 2: return new S2Point(-u, -v, 1)
    case 3: return new S2Point(-1, -v, -u)
    case 4: return new S2Point(v, -1, -u)
    default: return new S2Point(v, u, -1)
  }
}

export function faceXYZtoUV (face: Face, x: number, y: number, z: number): [number, number] {
  switch (face) {
    case 0: return [y / x, z / x]
    case 1: return [-x / y, z / y]
    case 2: return [-x / z, -y / z]
    case 3: return [z / x, y / x]
    case 4: return [z / y, -x / y]
    default: return [-y / z, -x / z]
  }
}

export function xyzToLonLat (x: number, y: number, z: number, radius?: number = 1): [number, number] {
  return [
    radToDeg(Math.atan2(z, x)),
    radToDeg(Math.atan2(y, Math.sqrt(x * x + z * z)))
  ]
}

export function lonLatToXYZ (lon: number, lat: number, radius?: number = 1): [number, number, number] {
  lon = degToRad(lon)
  lat = degToRad(lat)
  return [
    radius * Math.cos(lat) * Math.cos(lon), // x
    radius * Math.sin(lat), // y
    radius * Math.cos(lat) * Math.sin(lon) // z
  ]
}

export function radToDeg (radians: number): number {
  return radians * 180 / Math.PI
}

export function degToRad (deg: number): number {
  return deg * Math.PI / 180
}

export default {
  linearSTtoUV,
  linearUVtoST,
  tanSTtoUV,
  tanUVtoST,
  quadraticSTtoUV,
  quadraticUVtoST,
  faceUVtoXYZ,
  faceXYZtoUV,
  xyzToLonLat,
  lonLatToXYZ,
  radToDeg,
  degToRad
}
