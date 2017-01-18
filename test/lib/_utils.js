const testAction = 'action/test'
const loadingAction = 'action/loading'

function actionCreator (name, age) {
  return {
    type: testAction,
    name: name || 'John Doe',
    age: age || 42
  }
}
function actionCreatorWithThunk (name, age) {
  return dispatch => dispatch({
    type: testAction,
    name: name || 'John Doe',
    age: age || 42
  })
}
function actionCreatorWithMultipleDispatches (name, age) {
  return dispatch => {
    dispatch({
      type: loadingAction
    })
    return dispatch({
      type: testAction,
      name: name || 'John Doe',
      age: age || 42
    })
  }
}

function reducer(state, action) {
  state = state || {}
  
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

const testSpy = () => ({
  deepEqual (actual, expected, description) {
    this.result = {actual, expected, description}
  },

  true: (actual, description) => {
    this.result = {actual, expected: true, description}
  }
})

module.exports = {
  testAction,
  loadingAction,
  actionCreator,
  actionCreatorWithThunk,
  actionCreatorWithMultipleDispatches,
  reducer,
  testSpy
}
