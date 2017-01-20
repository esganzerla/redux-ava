const ActionTypes = require('./constants')

const actionCreator = (name, age) => {
  return {
    type: ActionTypes.testAction,
    name: name || 'John Doe',
    age: age || 42
  }
}
const actionCreatorWithThunk = (name, age) => {
  return dispatch => dispatch({
    type: ActionTypes.testAction,
    name: name || 'John Doe',
    age: age || 42
  })
}
const actionCreatorWithMultipleDispatches = (name, age) => {
  return dispatch => {
    dispatch({
      type: ActionTypes.loadingAction
    })
    return dispatch({
      type: ActionTypes.testAction,
      name: name || 'John Doe',
      age: age || 42
    })
  }
}

module.exports = {
  actionCreator,
  actionCreatorWithThunk,
  actionCreatorWithMultipleDispatches
}
