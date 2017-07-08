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

function reducer (state, action) {
  state = state || {}

  switch (action.type) {
    case testAction:
      const name = action.name
      const age = action.age
      return Object.assign({}, state, { name, age })
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
