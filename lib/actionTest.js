module.exports = function actionTest ({ action, expected, state, description }) {
  return t => {
    const fromAction = action

    if (typeof fromAction === 'function') {
      if (expected.constructor !== Array) throw new Error('"expected" should be an array when action is thuked')

      return new
        Promise(resolve => {
          const fromInnerActions = []

          const thunkGetState = () => state || {}
          const thunkDispatch = action => {
            fromInnerActions.push(action)

            if (fromInnerActions.length === expected.length) {
              t.deepEqual(fromInnerActions, expected, description)
              resolve(t)
            }
          }

          fromAction(thunkDispatch, thunkGetState)
        })
    }

    t.deepEqual(fromAction, expected, description)
  }
}
