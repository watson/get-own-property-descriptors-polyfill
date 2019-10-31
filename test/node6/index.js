'use strict'

const test = require('tape')

test('no Object.getOwnPropertyDescriptors', function (t) {
  t.equal(Object.getOwnPropertyDescriptors, undefined)
  t.end()
})

const polyfill = require('../../')

function cGet () {
  return 3
}

function dGet () {
  return obj._d
}

function dSet (d) {
  obj._d = d
}

const obj = Object.defineProperties({}, {
  a: { value: 1, writable: false, configurable: false, enumerable: false },
  b: { value: 2, writable: true, configurable: true, enumerable: true },
  c: { get: cGet },
  d: { get: dGet, set: dSet }
})

test('expected values', function (t) {
  const descriptors = polyfill(obj)
  t.deepEqual(Object.keys(descriptors), ['a', 'b', 'c', 'd'])
  t.deepEqual(descriptors.a, { value: 1, writable: false, enumerable: false, configurable: false })
  t.deepEqual(descriptors.b, { value: 2, writable: true, enumerable: true, configurable: true })
  t.deepEqual(descriptors.c, { get: cGet, set: undefined, enumerable: false, configurable: false })
  t.deepEqual(descriptors.d, { get: dGet, set: dSet, enumerable: false, configurable: false })
  t.end()
})

test('no args', function (t) {
  t.throws(function () {
    polyfill()
  }, TypeError)
  t.end()
})

test('arg: undefined', function (t) {
  t.throws(function () {
    polyfill(undefined)
  }, TypeError)
  t.end()
})

test('arg: null', function (t) {
  t.throws(function () {
    polyfill(null)
  }, TypeError)
  t.end()
})
