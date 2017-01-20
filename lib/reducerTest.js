'use strict'

const deepFreeze = require('deep-freeze')
const Immutable = require('immutable')

const isIterable = Immutable.Iterable.isIterable

function test (t, reducedState, expected, description) {
  if (isIterable(reducedState) && isIterable(expected)) {
    return t.true(Immutable.is(reducedState, expected), description)
  }

  t.deepEqual(reducedState, expected, description)
}

module.exports = ({ reducer, initialState, action, expected, description }) => {
  initialState = initialState || {}

  return t => {
    deepFreeze(action)

    if (typeof action === 'function') {
      const reducedStates = []

      return new Promise(resolve => {
        const thunkGetState = () => initialState
        const thunkDispatch = action => {
          initialState = reducedStates.length > 0 ? reducedStates.slice(-1)[0] : initialState

          deepFreeze(initialState)

          const reducedState = reducer(initialState, action)
          reducedStates.push(reducedState)

          if (reducedStates.length === expected.length) {
            test(t, reducedStates, expected, description)
            resolve(t)
          }
        }

        action(thunkDispatch, thunkGetState)
      })
    }

    deepFreeze(initialState)
    const reducedState = reducer(initialState, action)
    test(t, reducedState, expected, description)
  }
}
