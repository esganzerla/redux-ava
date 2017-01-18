'use strict'

const deepFreeze = require('deep-freeze')
const Immutable = require('immutable')

const isIterable = Immutable.Iterable.isIterable

function test (t, reducedState, stateAfter, description) {
  if (isIterable(reducedState) && isIterable(stateAfter)) {
    return t.true(Immutable.is(reducedState, stateAfter), description)
  }

  t.deepEqual(reducedState, stateAfter, description)
}

module.exports = (reducer, stateBefore, action, stateAfter, description) => {
  return t => {
    deepFreeze(action)

    if (typeof action === 'function') {
      const reducedStates = []

      return new Promise(resolve => {
        const thunkGetState = () => stateBefore
        const thunkDispatch = action => {
          stateBefore = reducedStates.length > 0 ? reducedStates.slice(-1)[0] : stateBefore

          deepFreeze(stateBefore)

          const reducedState = reducer(stateBefore, action)
          reducedStates.push(reducedState)

          if (reducedStates.length === stateAfter.length) {
            test(t, reducedStates, stateAfter, description)
            resolve(t)
          }
        }

        action(thunkDispatch, thunkGetState)
      })
    }

    deepFreeze(stateBefore)
    const reducedState = reducer(stateBefore, action)
    test(t, reducedState, stateAfter, description)
  }
}
