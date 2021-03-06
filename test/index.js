import assert from 'power-assert'
import Atra from '../index.js'

const immutableName = 'name'
const immutableValue = {
  attribute1: 'string',
  attribute2: {
    property1: 'string',
    property2: 3,
    property3: true
  }
}

const atra = Atra({ [immutableName]: immutableValue })

describe(`without mutable`, () => {
  it(`name exist`, () => {
    const expect = immutableValue
    const result = atra(immutableName)
    assert.deepEqual(result, expect)
  })

  it(`name not exist`, () => {
    const expect = {}
    const result = atra('not exist name')
    assert.deepEqual(result, expect)
  })
})

describe(`with mutable`, () => {
  const { assign } = Object

  it(`value not assign because !(attrName in clone)`, () => {
    const mutable = { attribute3: 'value' }

    const expect = assign({}, immutableValue, mutable)
    const result = atra(immutableName, mutable)
    assert.deepEqual(result, expect)
  })

  it(`value not assign because !isObject(clone[attrName])`, () => {
    const mutable = { attribute1: 'value' }

    const expect = assign({}, immutableValue, mutable)
    const result = atra(immutableName, mutable)
    assert.deepEqual(result, expect)
  })

  it(`value assigned because attrName in clone && isObject(clone[attrName]) && isObject(mutable[attrName])`, () => {
    const mutable = { attribute2: { property4: null } }

    const snapshotAttr2 = assign({}, immutableValue.attribute2)
    const expectAttr2 = assign({}, snapshotAttr2, mutable.attribute2)
    const expect = assign({}, immutableValue, { attribute2: expectAttr2 })

    const result = atra(immutableName, mutable)

    assert.deepEqual(result, expect)

    /**
     * assign(clone[attrName], mutable[attrName])
     * => assign({}, clone[attrName], mutable[attrName])
     */
    assert.deepEqual(immutableValue.attribute2, snapshotAttr2)
  })
})
