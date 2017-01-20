const ActionTypes = require('./constants')

module.exports =  (state, action) => {
  state = state || {}

  switch (action.type) {
    case ActionTypes.testAction:
      const name = action.name
      const age = action.age
      return Object.assign({}, state, { name, age })
    case ActionTypes.loadingAction:
      return Object.assign({}, state, { isLoading: true })
    default:
      return state
  }
}
