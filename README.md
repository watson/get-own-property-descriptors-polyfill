# get-own-property-descriptors-polyfill

A polyfill for
[`Object.getOwnPropertyDescriptors`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors)
which wasn't included in Node.js until v7.0.0.

[![npm](https://img.shields.io/npm/v/get-own-property-descriptors-polyfill.svg)](https://www.npmjs.com/package/get-own-property-descriptors-polyfill)
[![build status](https://travis-ci.org/watson/get-own-property-descriptors-polyfill.svg?branch=master)](https://travis-ci.org/watson/get-own-property-descriptors-polyfill)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Installation

```
npm install get-own-property-descriptors-polyfill --save
```

## Usage

```js
const assert = require('assert')
const getOwnPropertyDescriptors = require('get-own-property-descriptors-polyfill')

function getter () { return 'hello' }

const obj = Object.defineProperties({}, {
  foo: { value: 42, enumerable: false },
  bar: { get: getter }
})

const descriptors = getOwnPropertyDescriptors(obj)

assert.deepStrictEqual(descriptors, {
  foo: { value: 42, writable: false, enumerable: false, configurable: false },
  bar: { get: getter, set: undefined, enumerable: false, configurable: false }
})
```

## License

[MIT](LICENSE)
