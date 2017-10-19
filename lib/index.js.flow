// @flow
type AttributeName = string
type AttributeValue = any
type Attributes = { [attrName: AttributeName]: AttributeValue }

type AtraName = string
type Mutable = Attributes
type Immutable = Attributes
type Immutables = { [name: AtraName]: Immutable }

type AtraWrap = (immutables: Immutables) => AtraExec
type AtraExec = (name: AtraName, mutable: Mutable) => Attributes

const { assign, values, keys } = Object
const { isArray } = Array
const isObject = (target: any): boolean => typeof target === 'object'

const Atra: AtraWrap = immutables => {
  throwIfNotPureObj('immutables', immutables)
  values(immutables).forEach(immutable =>
    throwIfNotPureObj('immutable', immutable)
  )

  const atra: AtraExec = (name, mutable) => {
    if (typeof name !== 'string') {
      throw new TypeError(`first argument must be string`)
    }

    if (!mutable) {
      return immutables[name] || {}
    }

    throwIfNotPureObj('mutable', mutable)

    const clone = assign({}, immutables[name])
    keys(mutable).forEach(attrName => {
      clone[attrName] = shouldAssign(attrName, clone, mutable)
        ? assign(clone[attrName], mutable[attrName])
        : mutable[attrName]
    })
    return clone
  }

  return atra
}

const throwIfNotPureObj = (what: string, attrObj: any): void => {
  if (!attrObj || !isObject(attrObj) || isArray(attrObj)) {
    throw new TypeError(`${what} must be pure object`)
  }
}

const shouldAssign = (
  attrName: string,
  clone: Attributes,
  mutable: Attributes
): boolean =>
  attrName in clone && isObject(clone[attrName]) && isObject(mutable[attrName])

export default Atra
