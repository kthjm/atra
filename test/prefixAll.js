import assert from 'power-assert'
import Atra from '../index.js'

describe(`prefixAll`, () => {
  const userAgent =
    'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'

  const createStyleIn = () => ({
    display: 'flex',
    userSelect: 'none'
  })

  const createStyleOut = () => ({
    display: 'flex',
    WebkitUserSelect: 'none'
  })

  it(`on immutable`, () => {
    const style = createStyleIn()
    const atra = Atra({ NAME: { style } }, { userAgent })
    assert.deepEqual(style, createStyleOut())
  })

  it(`on mutable`, () => {
    const { style } = Atra({}, { userAgent })('NAME', {
      style: createStyleIn()
    })
    assert.deepEqual(style, createStyleOut())
  })
})
