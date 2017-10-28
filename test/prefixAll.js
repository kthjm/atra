import assert from 'power-assert'
import Atra from '../src'

const styleIn = {
  animation: '3s ease-in 1s 2 reverse both paused slidein',
  transition: '200ms all linear',
  boxSizing: 'border-box',
  display: 'flex',
  color: 'blue'
}

const styleOut = {
  animation: '3s ease-in 1s 2 reverse both paused slidein',
  WebkitAnimation: '3s ease-in 1s 2 reverse both paused slidein',
  transition: '200ms all linear',
  WebkitTransition: '200ms all linear',
  MozTransition: '200ms all linear',
  boxSizing: 'border-box',
  display: ['-webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex', 'flex'],
  color: 'blue'
}

describe(`prefixAll`, () => {
  it(`on immutable`, () => {
    const atra = Atra({ NAME: { style: styleIn } })
    assert.deepEqual(styleIn, styleOut)
  })

  it(`on mutable`, () => {
    const atra = Atra({})
    const result = atra('', { style: styleIn })
    assert.deepEqual(result.style, styleOut)
  })
})
