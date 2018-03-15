import assert from 'power-assert'
import Atra from '../index.js'

describe(`until wrap`, () => {
  const notPureObject = ['string', 1, true, undefined, null, []]
  it(`immutables is not pure object`, () =>
    notPureObject.forEach(value =>
      assert.throws(() => Atra(value), /immutables must be pure object/)
    ))
  it(`immutable is not pure object`, () =>
    notPureObject.forEach(value =>
      assert.throws(
        () => Atra({ NAME: value }),
        /immutable must be pure object/
      )
    ))
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
