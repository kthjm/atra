'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

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

var assign = Object.assign,
  values = Object.values,
  keys = Object.keys
var isArray = Array.isArray

var isObject = function isObject(target) {
  return (
    (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object'
  )
}

var Atra = function Atra(immutables) {
  throwIfNotPureObj('immutables', immutables)
  values(immutables).forEach(function(immutable) {
    return throwIfNotPureObj('immutable', immutable)
  })

  var atra = function atra(name, mutable) {
    if (typeof name !== 'string') {
      throw new TypeError('first argument must be string')
    }

    if (!mutable) {
      return immutables[name] || {}
    }

    throwIfNotPureObj('mutable', mutable)

    var clone = assign({}, immutables[name])
    keys(mutable).forEach(function(attrName) {
      clone[attrName] = shouldAssign(attrName, clone, mutable)
        ? assign(clone[attrName], mutable[attrName])
        : mutable[attrName]
    })
    return clone
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

exports.default = Atra
