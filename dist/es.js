import Prefixer from 'inline-style-prefixer'

var _typeof =
  typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
    ? function(obj) {
        return typeof obj
      }
    : function(obj) {
        return obj &&
          typeof Symbol === 'function' &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? 'symbol'
          : typeof obj
      }

//
var commonPrefixer = new Prefixer()
var assign = Object.assign
var keys = Object.keys
var isArray = Array.isArray

var isObject = function isObject(target) {
  return (
    (typeof target === 'undefined' ? 'undefined' : _typeof(target)) ===
      'object' &&
    !isArray(target) &&
    target !== null
  )
}

var asserts = function asserts(condition, message, isType) {
  if (!condition) {
    throw isType ? new TypeError(message) : new Error(message)
  }
}

var Atra = function Atra(immutables, config) {
  asserts(
    immutables && isObject(immutables),
    'Atra immutables must be pure object'
  )

  var prefixer = isObject(config) ? new Prefixer(config) : commonPrefixer

  keys(immutables).forEach(function(key) {
    var immutable = immutables[key]

    asserts(isObject(immutable), 'Atra immutable must be pure object')

    if (isObject(immutable.style)) {
      immutable.style = prefixer.prefix(immutable.style)
    }
  })

  var atra = function atra(name, mutable) {
    asserts(
      typeof name === 'string',
      'Atra first argument must be string',
      true
    )

    if (!mutable) return immutables[name] || {}

    asserts(isObject(mutable), 'Atra mutable must be pure object')

    var result = assign({}, immutables[name])

    if (isObject(mutable.style)) {
      mutable = assign({}, mutable, { style: prefixer.prefix(mutable.style) })
    }

    keys(mutable).forEach(function(attrName) {
      return (result[attrName] = shouldAssign(attrName, result, mutable)
        ? assign({}, result[attrName], mutable[attrName])
        : mutable[attrName])
    })

    return result
  }

  return atra
}

var shouldAssign = function shouldAssign(attrName, result, mutable) {
  return (
    attrName in result &&
    (isObject(result[attrName]) || isObject(mutable[attrName]))
  )
}

export default Atra
