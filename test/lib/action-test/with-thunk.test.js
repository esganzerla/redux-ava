import test from 'ava'
import testSpy from '../_utils/spy'
import { actionTest } from '../../../'
import { actionCreatorWithThunk, actionCreatorWithMultipleDispatches } from '../_utils/actions'
import ActionTypes from '../_utils/constants'

test('single dispatch', async t => {
  const expected = [{ type: ActionTypes.testAction, name: 'Jane Doe', age: 35 }]
  const action = actionCreatorWithThunk('Jane Doe', 35)
  const tester = actionTest({ action, expected })

  const spy = testSpy()
  tester(spy).then(({ result }) => {
    t.deepEqual(result.actual, expected)
    t.is(result.expected, expected)
  })
})

test('multiple dispatch', async t => {
  const expected = [
    { type: ActionTypes.loadingAction },
    { type: ActionTypes.testAction, name: 'Jane Doe', age: 35 }
  ]
  const action = actionCreatorWithMultipleDispatches('Jane Doe', 35)
  const tester = actionTest({ action, expected })

  const spy = testSpy()
  tester(spy).then(({ result }) => {
    t.deepEqual(result.actual, expected)
    t.is(result.expected, expected)
  })
})
