import test from 'ava'
import testSpy from '../_utils/spy'
import { reducerTest } from '../../../'
import { actionCreator } from '../_utils/actions'
import reducer from '../_utils/reducers'
import ActionTypes from '../_utils/constants'

test('without parameters', t => {
  const expected = { name: 'John Doe', age: 42 }
  const action = actionCreator()
  const tester = reducerTest({
    reducer,
    action,
    expected,
    description: 'has description'
  })

  const spy = testSpy()
  tester(spy)
  const result = spy.result

  t.deepEqual(result.actual, expected)
  t.is(result.expected, expected)
  t.is(result.description, 'has description')
})

test('single parameter', t => {
  const expected = { name: 'Jane Doe', age: 42}
  const action = actionCreator('Jane Doe')
  const tester = reducerTest({
    reducer,
    action,
    expected,
    description: 'has description'
  })

  const spy = testSpy()
  tester(spy)
  const result = spy.result

  t.deepEqual(result.actual, expected)
  t.is(result.expected, expected)
  t.is(result.description, 'has description')
})

test('multiple parameter', t => {
  const expected = { name: 'Jane Doe', age: 35 }
  const action = actionCreator('Jane Doe', 35)
  const tester = reducerTest({
    reducer,
    action,
    expected,
    description: 'has description'
  })

  const spy = testSpy()
  tester(spy)
  const result = spy.result

  t.deepEqual(result.actual, expected)
  t.is(result.expected, expected)
  t.is(result.description, 'has description')
})
