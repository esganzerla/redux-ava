import test from 'ava'
import testSpy from '../_utils/spy'
import { reducerTest } from '../../../'
import { actionCreatorWithThunk, actionCreatorWithMultipleDispatches } from '../_utils/actions'
import reducer from '../_utils/reducers'
import ActionTypes from '../_utils/constants'

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
  const tester = reducerTest({
    reducer,
    action,
    expected,
    description: 'has description'
  })

  const spy = testSpy()
  tester(spy).then(testWithThunk(action, expected))
})

test('multiple dispatch', async t => {
  const expected = [{ isLoading: true }, { name: 'Jane Doe', age: 35, isLoading: true }]
  const action = actionCreatorWithMultipleDispatches('Jane Doe', 35)
  const tester = reducerTest({
    reducer,
    action,
    expected,
    description: 'has description'
  })

  const spy = testSpy()
  tester(spy).then(testWithThunk(action, expected))
})
