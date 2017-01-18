
# redux-ava

> Write [AVA](https://github.com/sindresorhus/ava) tests for [redux](https://github.com/reactjs/redux) pretty quickly

[![Build Status](https://travis-ci.org/sotojuan/redux-ava.svg?branch=master)](https://travis-ci.org/sotojuan/redux-ava)

**Note:** Tests that use this module and fail will not have [`power-assert`](https://github.com/power-assert-js/power-assert) enhancements. This is a current AVA issue, but it'll be fixed in the future.

## Install

```
npm install --save-dev redux-ava
```

## API

*Note:* If you are using a dispatch inside the action (as with redux-thunk) you should set the test to be async. 

### actionTest(actionCreator, data, type, [description])

| Param         | Type                | Description                         |
| ------------- | ------------------- | ----------------------------------- |
| actionCreator | `function`          | The action creator you want to test. |
| data          | any                 | The data your action creator function takes in. If it doesn't take any data, use `null`. |
| type          | `object` or `array` | The type you expect your action creator to return. It you are using a dispatch inside the action (as with redux-thunk) should be an array with expected types. |
| description   | `string`            | Optional test description. |


### reducerTest(reducer, stateBefore, action, stateAfter, [description])

| Param         | Type          | Description                         |
| ------------- | ------------- | ----------------------------------- |
| reducer       | `function`    | The reducer you want to test. |
| stateBefore   | `object`      | The state you expect before the reducer is ran. |
| action        | `object`      | The action you want to give to the reducer. This is different from `actionTest` in that you pass an action object, not an action creator function. You may use a call to your action creator function as an argument provided it returns an action object. See the examples below. |
| stateAfter    | `object` or `array` | The state you expect after the reducer is ran. It you are using a dispatch inside the action (as with redux-thunk) should be an array with expected states. |
| description   | `string`      | Optional test description. |


## Examples

This is an AVA port of [tape-redux](https://github.com/KaleoSoftware/tape-redux). For more documentation, check there.

Let's test an action creator:

```js
import test from 'ava'
import {actionTest} from 'redux-ava'

import {openMenu, getUser, showArtist, loadUsers} from '../actions'

// Without parameter
test('openMenu action', actionTest(openMenu, {type: 'OPEN_MENU'}))

// With single parameter
test('getUser action', actionTest(getUser, 1, {type: 'GET_USER', id: 1}))

// With multiple parameters
test('showArtist action', actionTest(
  showArtist, 'bob-dylan', 'Bob Dylan',
  {type: 'SHOW_ARTIST', slug: 'bob-dylan', name: 'Bob Dylan'}
))

// With redux-thunk dispatch inside action
test('loadUsers', async t => {
  actionTest(
    loadUsers,
    [ // When using thunk you should specify types inside an array
      { type: 'IS_LOADING' },
      { type: 'SET_USERS', users: [...] },
      { type: 'IS_LOADED' }
    ]
  )(t)
})
```

And now a reducer:

```js
import test from 'ava'
import {reducerTest} from 'redux-ava'

import app from '../reducers'
import {openMenu, getUser, loadUsers} from '../actions'

test('app reducer handles openMenu', reducerTest(
  app,
  {menuOpen: false, user: null},
  openMenu(),
  {menuOpen: true, user: null}
))

test('app reducer handles getUser', reducerTest(
  app,
  {menuOpen: false, user: null},
  getUser(1),
  {menuOpen: false, user: 1}
))

// With redux-thunk dispatch inside action
test('loadUsers', async t => {
  actionTest(
    loadUsers,
    [ // When using thunk you should specify all expected returned states
      { isLoading: true },
      { isLoading: true, users: [...] },
      { users: [...] }
    ]
  )
})(t)
```

## License

MIT © [Juan Soto](http://juansoto.me)
