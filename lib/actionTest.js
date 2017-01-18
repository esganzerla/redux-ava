'use strict'

module.exports = function actionTest (actionCreator) {
  const params = [].slice.call(arguments, 1)
  const length = params.length
  const hasDescription = typeof params[length - 1] === 'string'
  const offset = hasDescription ? 2 : 1
  const expected = params[length - offset]
  const args = params.slice(0, length - offset)
  let description

  if (hasDescription) {
    description = params[length - 1]
  }

  return t => {
    const createdAction = actionCreator.apply(null, args)

    if (typeof createdAction === 'function') {
      if (expected.constructor !== Array) throw new Error('"expected" should be an array when action is thuked')

      return new
        Promise(resolve => {
          const createdActions = []

          const thunkGetState = {}
          const thunkDispatch = action => {
            createdActions.push(action)

            if (createdActions.length === expected.length) {
              t.deepEqual(createdActions, expected, description)
              resolve(t)
            }
          }

          createdAction(thunkDispatch, thunkGetState)
        })
    }

    t.deepEqual(createdAction, expected, description)
  }
}
