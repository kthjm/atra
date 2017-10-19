import assert from 'power-assert'
import Atra from '../src'

describe(`until wrap`, () => {
  const notPureObject = ['string', 1, true, undefined, null, []]

  it(`immutables is not pure object`, () => {
    const expect = /immutables must be pure object/
    notPureObject.forEach(type => assert.throws(() => Atra(type), expect))
  })

  it(`immutable is not pure object`, () => {
    const expect = /immutable must be pure object/
    notPureObject.forEach(type => assert.throws(() => Atra(a(type)), expect))
    function a(value) {
      return { name: value }
    }
  })
})

describe(`until exec`, () => {
  const atra = Atra({})

  it(`first argument is not string`, () => {
    const notString = [1, true, undefined, null, [], {}]
    const expect = /first argument must be string/
    notString.forEach(type => assert.throws(() => atra(type), expect))
  })

  it(`mutable is not pure object`, () => {
    const notPureObject = [1, true, []]
    const expect = /mutable must be pure object/
    notPureObject.forEach(type => assert.throws(() => atra('s', type), expect))
  })
})
