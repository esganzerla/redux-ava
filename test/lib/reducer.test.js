const test = require('ava')
const m = require('../..')
const reducerTest = m.reducerTest

const utils = require('./_utils')
const testSpy = utils.testSpy
const reducer = utils.reducer
const testAction = utils.testAction
const actionCreator = utils.actionCreator

test('with description', (t) => {
  const expected = { name: 'John Doe', age: 42 }
  const action = actionCreator()
  const tester = reducerTest(reducer, {}, action, expected, 'has description')

  const spy = testSpy()
  tester(spy)
  const result = spy.result

  t.deepEqual(result.actual, expected)
  t.is(result.expected, expected)
  t.is(result.description, 'has description')
})

test('without description', (t) => {
  const expected = { name: 'John Doe', age: 42 }
  const action = actionCreator()
  const tester = reducerTest(reducer, {}, actionCreator(), expected)

  const spy = testSpy()
  tester(spy)
  const result = spy.result

  t.deepEqual(result.actual, expected)
  t.is(result.expected, expected)
  t.is(typeof result.description, 'undefined')
})
