// @flow
/** COMPONENTS **/
import {
  quadraticSTtoUV as STtoUV,
  quadraticUVtoST as UVtoST,
  faceUVtoXYZ,
  faceXYZtoUV,
  lonLatToXYZ,
  xyzToLonLat
} from './S2Projection'
import S2LonLat from './S2LonLat'

/** TYPES **/
import type { Face } from './S2Projection'

export default class S2Point {
  x: number
  y: number
  z: number
  constructor (x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
  }

  toUV (): [Face, number, number] {
    // get the face from the x, y, z
    const face: Face = this.getFace()
    let [u, v] = faceXYZtoUV(face, this.x, this.y, this.z)
    return [face, u, v]
  }

  toST (): [Face, number, number] {
    const [face, u, v] = this.toUV()

    return [face, UVtoST(u), UVtoST(v)]
  }

  toLonLat (): [number, number] {
    return xyzToLonLat(this.x, this.y, this.z)
  }

  getFace (): Face {
    let face = this._largestAbsComponent()
    const temp = [this.x, this.y, this.z]
    if (temp[face] < 0) face += 3

    return face
  }

  _largestAbsComponent (): Face {
    let temp = [Math.abs(this.x), Math.abs(this.y), Math.abs(this.z)]

    return (temp[0] > temp[1])
      ? (temp[0] > temp[2]) ? 0 : 2
      : (temp[1] > temp[2]) ? 1 : 2
  }

  static fromS2LonLat (lonlat: S2LonLat): S2Point {
    // convert to x, y, z
    const [x, y, z] = lonLatToXYZ(lonlat.lon, lonlat.lat)
    // create the point
    return new S2Point(x, y, z)
  }

  static fromLonLat (lon: number, lat: number): S2Point {
    // convert to x, y, z
    const [x, y, z] = lonLatToXYZ(lon, lat)
    // create the point
    return new S2Point(x, y, z)
  }

  static fromUV (face: Face, u: number, v: number): S2Point {
    return faceUVtoXYZ(face, u, v)
  }

  static fromST (face: Face, s: number, t: number): S2Point {
    const [u, v] = [STtoUV(s), STtoUV(t)]

    return this.fromUV(face, u, v)
  }
}
