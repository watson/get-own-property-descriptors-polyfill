'use strict'

const test = require('tape')
const polyfill = require('../../')

test(function (t) {
  t.equal(polyfill, Object.getOwnPropertyDescriptors)
  t.end()
})
