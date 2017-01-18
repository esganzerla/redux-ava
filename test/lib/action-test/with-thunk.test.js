const test = require('ava')
const m = require('../../..')
const actionTest = m.actionTest

const utils = require('../_utils')
const testSpy = utils.testSpy
const testAction = utils.testAction
const loadingAction = utils.loadingAction
const actionCreatorWithThunk = utils.actionCreatorWithThunk
const actionCreatorWithMultipleDispatches = utils.actionCreatorWithMultipleDispatches

test('single dispatch', async t => {
  const expected = [{ type: testAction, name: 'Jane Doe', age: 35 }]
  const action = actionCreatorWithThunk
  const tester = actionTest(action, 'Jane Doe', 35, expected)

  const spy = testSpy()
  tester(spy).then(({ result }) => {
    t.deepEqual(result.actual, expected)
    t.is(result.expected, expected)
  })
})

test('multiple dispatch', async t => {
  const expected = [
    { type: loadingAction },
    { type: testAction, name: 'Jane Doe', age: 35 }
  ]
  const action = actionCreatorWithMultipleDispatches
  const tester = actionTest(action, 'Jane Doe', 35, expected)

  const spy = testSpy()
  tester(spy).then(({ result }) => {
    t.deepEqual(result.actual, expected)
    t.is(result.expected, expected)
  })
})
