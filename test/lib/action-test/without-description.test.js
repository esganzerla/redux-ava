const test = require('ava')
const m = require('../../..')
const actionTest = m.actionTest

const utils = require('../_utils')
const testSpy = utils.testSpy
const testAction = utils.testAction
const actionCreator = utils.actionCreator

test('without parameters', (t) => {
  const expected = { type: testAction, name: 'John Doe', age: 42 }
  const tester = actionTest(actionCreator, expected)

  const spy = testSpy()
  tester(spy)
  const result = spy.result

  t.deepEqual(result.actual, actionCreator(), 'is action with default parameters')
  t.is(result.expected, expected)
  t.is(typeof result.description, 'undefined')
})

test('single parameter', (t) => {
  const expected = {type: testAction, name: 'John Doe', age: 42}
  const tester = actionTest(actionCreator, 'Jane Doe', expected)

  const spy = testSpy()
  tester(spy)
  const result = spy.result

  t.deepEqual(result.actual, actionCreator('Jane Doe'), 'is action with given name and default age')
  t.is(result.expected, expected)
  t.is(typeof result.description, 'undefined')
})

test('multiple parameter', (t) => {
  const expected = { type: testAction, name: 'John Doe', age: 42 }
  const tester = actionTest(actionCreator, 'Jane Doe', 35, expected)

  const spy = testSpy()
  tester(spy)
  const result = spy.result

  t.deepEqual(result.actual, actionCreator('Jane Doe', 35), 'is action with given name and age')
  t.is(result.expected, expected)
  t.is(typeof result.description, 'undefined')
})
