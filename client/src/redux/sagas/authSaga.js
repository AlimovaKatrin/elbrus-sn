import { call, put, takeEvery } from 'redux-saga/effects'
import { hideLoaderAC, showErrorAC, showLoaderAC } from '../actionCreators/appAC'
import { auth } from '../actionCreators/authAC'
import { authUserAC, registrationUserAC } from '../actionCreators/profileAC'
import { GET_DEFAULT_USER, REGISTRATION_DEFAULT_USER } from '../actionTypes/types'

function * authSagaWorker ({ user }) {
  yield put(showLoaderAC())
  const response = yield call(async () => {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password
      })
    })
    return await response.json()
  })
  if (response.error) {
    yield put(hideLoaderAC())
    return yield put(showErrorAC(response.message))
  }
  yield put(authUserAC(response.user))
  yield put(auth())
  yield localStorage.setItem('userData', JSON.stringify({
    token: response.token,
    user: response.user
  }))
  yield put(hideLoaderAC())
}

export function * authSagaWatcher () {
  yield takeEvery(GET_DEFAULT_USER, authSagaWorker)
}

function * registrationSagaWorker ({ user }) {
  yield put(showLoaderAC())
  const response = yield call(async () => {
    const response = await fetch('/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password
      })
    })
    return await response.json()
  })
  if (response.errors) {
    yield put(hideLoaderAC())
    return yield put(showErrorAC(response.message))
  }
  yield put(registrationUserAC(response.user))
  yield put(auth())
  yield localStorage.setItem('userData', JSON.stringify({
    token: response.token,
    user: response.user
  }))
  yield put(hideLoaderAC())
}

export function * registrationSagaWatcher () {
  yield takeEvery(REGISTRATION_DEFAULT_USER, registrationSagaWorker)
}


