// @flow
import Prefixer from 'inline-style-prefixer'

const commonPrefixer = new Prefixer()
const { assign, keys } = Object
const { isArray } = Array

const isObject = (target: any): boolean =>
  typeof target === 'object' &&
  !isArray(target) &&
  target !== null

const asserts = (condition, message, isType) => {
  if (!condition) {
    throw isType
      ? new TypeError(message)
      : new Error(message)
  }
}

const Atra: AtraWrap = (immutables, config) => {

  asserts(immutables && isObject(immutables), 'Atra immutables must be pure object')

  const prefixer = isObject(config) ? new Prefixer(config) : commonPrefixer

  keys(immutables)
  .forEach((key: string) => {
    const immutable = immutables[key]

    asserts(isObject(immutable), 'Atra immutable must be pure object')

    if (isObject(immutable.style)) {
      immutable.style = prefixer.prefix(immutable.style)
    }
  })

  const atra: AtraExec = (name, mutable) => {
    asserts(typeof name === 'string', 'Atra first argument must be string', true)

    if (!mutable) return immutables[name] || {}

    asserts(isObject(mutable), 'Atra mutable must be pure object')

    const result = assign({}, immutables[name])

    if (isObject(mutable.style)) {
      mutable = assign({}, mutable, { style: prefixer.prefix(mutable.style) })
    }

    keys(mutable)
    .forEach(attrName =>
      result[attrName] =
      shouldAssign(attrName, result, mutable)
        ? assign({}, result[attrName], mutable[attrName])
        : mutable[attrName]
    )

    return result
  }

  return atra
}

const shouldAssign = (
  attrName: string,
  result: Attributes,
  mutable: Attributes
): boolean =>
  attrName in result &&
  (isObject(result[attrName]) || isObject(mutable[attrName]))

type AttributeName = string
type AttributeValue = any
type Attributes = { [attrName: AttributeName]: AttributeValue }

type AtraName = string
type Mutable = Attributes
type Immutable = Attributes
type Immutables = { [name: AtraName]: Immutable }
type PrefixConfig = { userAgent?: string, keepUnprefixed?: boolean }

type AtraWrap = (
  immutables: Immutables,
  prefixConfig?: PrefixConfig
) => AtraExec
type AtraExec = (name: AtraName, mutable: Mutable) => Attributes

export default Atra