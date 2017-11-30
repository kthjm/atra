'use strict'

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var prefixAll = _interopDefault(require('inline-style-prefixer/static'))

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
var assign = Object.assign
var keys = Object.keys
var isArray = Array.isArray

var isObject = function isObject(target) {
  return (
    (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object'
  )
}

var prefixInitiation = function prefixInitiation(attributes) {
  if (isObject(attributes['style'])) {
    attributes['style'] = prefixAll(attributes['style'])
  }
  return attributes
}

var Atra = function Atra(immutables) {
  throwIfNotPureObj('immutables', immutables)

  keys(immutables).forEach(function(key) {
    throwIfNotPureObj('immutable', immutables[key])
    immutables[key] = prefixInitiation(immutables[key])
  })

  var atra = function atra(name, mutable) {
    if (typeof name !== 'string') {
      throw new TypeError('first argument must be string')
    }

    var attributes = void 0

    if (!mutable) {
      attributes = immutables[name] || {}
    } else {
      throwIfNotPureObj('mutable', mutable)

      var clone = assign({}, immutables[name])
      mutable = prefixInitiation(mutable)
      keys(mutable).forEach(function(attrName) {
        clone[attrName] = shouldAssign(attrName, clone, mutable)
          ? assign({}, clone[attrName], mutable[attrName])
          : mutable[attrName]
      })
      attributes = clone
    }

    return attributes
  }

  return atra
}

var throwIfNotPureObj = function throwIfNotPureObj(what, attrObj) {
  if (!attrObj || !isObject(attrObj) || isArray(attrObj)) {
    throw new TypeError(what + ' must be pure object')
  }
}

var shouldAssign = function shouldAssign(attrName, clone, mutable) {
  return (
    attrName in clone &&
    isObject(clone[attrName]) &&
    isObject(mutable[attrName])
  )
}

module.exports = Atra
