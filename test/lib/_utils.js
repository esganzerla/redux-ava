const testAction = 'action/test'

function actionCreator (name, age) {
  return {
    type: testAction,
    name: name || 'John Doe',
    age: age || 42
  }
}

const testSpy = () => ({
  deepEqual (actual, expected, description) {
    this.result = {actual, expected, description}
  },

  true: (actual, description) => {
    this.result = {actual, expected: true, description}
  }
})

function reducer(state = {}, action) {
  switch (action.type) {
    case testAction:
      const { name, age } = action
      return Object.assign({}, state, { name, age })
    case loadingAction:
      return Object.assign({}, state, { isLoading: true })
    default:
      return state
  }
}

module.exports = {
  reducer,
  testAction,
  actionCreator,
  testSpy
}
