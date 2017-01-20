import test from 'ava'
import testSpy from '../_utils/spy'
import { actionTest } from '../../../'
import { actionCreator } from '../_utils/actions'
import ActionTypes from '../_utils/constants'

test('without parameters', t => {
  const expected = { type: ActionTypes.testAction, name: 'John Doe', age: 42 }
  const action = actionCreator()
  const tester = actionTest({
    action,
    expected,
    description: 'has description'
  })

  const spy = testSpy()
  tester(spy)
  const result = spy.result

  t.deepEqual(result.actual, action, 'is action with default parameters')
  t.is(result.expected, expected)
  t.is(result.description, 'has description')
})

test('single parameter', t => {
  const expected = { type: ActionTypes.testAction, name: 'John Doe', age: 42 }
  const action = actionCreator('Jane Doe')
  const tester = actionTest({
    action,
    expected,
    description: 'has description'
  })

  const spy = testSpy()
  tester(spy)
  const result = spy.result

  t.deepEqual(result.actual, action, 'is action with given name and default age')
  t.is(result.expected, expected)
  t.is(result.description, 'has description')
})

test('multiple parameter', t => {
  const expected = { type: ActionTypes.testAction, name: 'John Doe', age: 42 }
  const action = actionCreator('Jane Doe', 35)
  const tester = actionTest({
    action,
    expected,
    description: 'has description'
  })

  const spy = testSpy()
  tester(spy)
  const result = spy.result

  t.deepEqual(result.actual, action, 'is action with given name and age')
  t.is(result.expected, expected)
  t.is(result.description, 'has description')
})
