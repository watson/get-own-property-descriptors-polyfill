'use strict'

module.exports = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors (obj) {
  if (obj === null || obj === undefined) {
    throw new TypeError('Cannot convert undefined or null to object')
  }

  const descriptors = {}

  for (const name of Object.getOwnPropertyNames(obj)) {
    descriptors[name] = Object.getOwnPropertyDescriptor(obj, name)
  }

  return descriptors
}
