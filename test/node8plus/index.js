'use strict'

const test = require('tape')

const getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors
Object.getOwnPropertyDescriptors = null

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
  d: { get: dGet, set: dSet },
  ['__proto__']: { value: 'not-a-prototype' }
})

test('got polyfill', function (t) {
  t.equal(typeof polyfill, 'function')
  t.notEqual(polyfill, getOwnPropertyDescriptors)
  t.end()
})

test('expected values', function (t) {
  const descriptors = polyfill(obj)
  t.deepEqual(Object.keys(descriptors), ['__proto__', 'a', 'b', 'c', 'd'])
  t.deepEqual(descriptors.a, { value: 1, writable: false, enumerable: false, configurable: false })
  t.deepEqual(descriptors.b, { value: 2, writable: true, enumerable: true, configurable: true })
  t.deepEqual(descriptors.c, { get: cGet, set: undefined, enumerable: false, configurable: false })
  t.deepEqual(descriptors.d, { get: dGet, set: dSet, enumerable: false, configurable: false })
  t.deepEqual(descriptors.__proto__, { value: 'not-a-prototype', writable: false, enumerable: false, configurable: false }) // eslint-disable-line no-proto
  t.end()
})

test('same as native', function (t) {
  t.deepEqual(polyfill(obj), getOwnPropertyDescriptors(obj))
  t.end()
})

test('no args', function (t) {
  t.plan(2)
  try {
    getOwnPropertyDescriptors()
  } catch (expected) {
    try {
      polyfill()
    } catch (actual) {
      t.ok(actual instanceof expected.constructor)
      t.equal(actual.message, expected.message)
    }
  }
  t.end()
})

const args = [undefined, null, '', NaN, 0, true, [], new RegExp()]

args.forEach(function (arg) {
  test(`arg: ${String(arg)}`, function (t) {
    let expected

    try {
      expected = getOwnPropertyDescriptors(arg)
    } catch (expected) {
      t.plan(2)
      try {
        polyfill(arg)
      } catch (actual) {
        t.ok(actual instanceof expected.constructor)
        t.equal(actual.message, expected.message)
      }
    }

    if (expected !== undefined) {
      t.plan(1)
      t.deepEqual(polyfill(arg), expected)
    }

    t.end()
  })
})
