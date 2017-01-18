const test = require('ava')
const m = require('../../..')
const reducerTest = m.reducerTest

const utils = require('../_utils')
const testSpy = utils.testSpy
const reducer = utils.reducer
const testAction = utils.testAction
const loadingAction = utils.loadingAction
const actionCreatorWithThunk = utils.actionCreatorWithThunk
const actionCreatorWithMultipleDispatches = utils.actionCreatorWithMultipleDispatches

function testWithThunk(action, expected) {
  return t => {
    const { result } = t
    let numReceivedStates = 0;

    action(action => {
      if (++numReceivedStates === expected.length) {
        t.deepEqual(result.actual, expected)
      }
    })
  }
}

test('single dispatch', async t => {
  const expected = [{ name: 'Jane Doe', age: 35 }]
  const action = actionCreatorWithThunk('Jane Doe', 35)
  const tester = reducerTest(reducer, {}, action, expected, 'has description')

  const spy = testSpy()
  tester(spy).then(testWithThunk(action, expected))
})

test('multiple dispatch', async t => {
  const expected = [{ isLoading: true }, { name: 'Jane Doe', age: 35, isLoading: true }]
  const action = actionCreatorWithMultipleDispatches('Jane Doe', 35)
  const tester = reducerTest(reducer, {}, action, expected, 'has description')

  const spy = testSpy()
  tester(spy).then(testWithThunk(action, expected))
})
