import axios from 'axios'
import { config } from './configs'
import { createAction } from 'redux-actions'
import { takeEvery, select } from 'redux-saga/effects'
import { fetchStart, fetchSuccess, fetchFailure } from './api'
import PageLoading from '../../views/components/PageLoading'
import ProgressLoading from '../../views/components/ProgressLoading'

function * onFetchStart ({ payload: { config } }) {
  ProgressLoading.show()
  // console.log('Fetch Start', config)
}

function * onFetchSuccess ({ payload: { response, config } }) {
  ProgressLoading.hide()
  // console.log('Fetch Success', config)
}

function * onFetchFailure ({ payload: { error, config } }) {
  ProgressLoading.hide()
  // Notification.error(error.message)
}

function * watchFetchStart () {
  yield takeEvery(fetchStart.toString(), onFetchStart)
}
function * watchFetchSuccess () {
  yield takeEvery(fetchSuccess.toString(), onFetchSuccess)
}
function * watchFetchFailure () {
  yield takeEvery(fetchFailure.toString(), onFetchFailure)
}

function * onLoadingChanged () {
  // TODO: Do something in redux when loading
  const isLoading = yield select(state => state.common.isLoading)
  const loadingCount = yield select(state => state.common.loadingCount)

  if (isLoading) {
    PageLoading.show()
  } else if (loadingCount === 0) {
    PageLoading.hide()
  }
}

export const loadStart = createAction('loading_start')
export const loadEnd = createAction('loading_end')

function * watchLoadStart () {
  yield takeEvery(loadStart.toString(), onLoadingChanged)
}

function * watchLoadEnd () {
  yield takeEvery(loadEnd.toString(), onLoadingChanged)
}

export async function loading (dispatch, fetchingProcess, done = undefined) {
  dispatch(loadStart({config: {key: 'loading'}}))
  try {
    const ret = await fetchingProcess()
    dispatch(loadEnd({config: {key: 'loading'}}))
    if (done) {
      await done()
    }
    return ret
  } catch (error) {
    dispatch(loadEnd({config: {key: 'loading'}}))
    console.log('ERROR', error)
    throw error
  }
}

export function fetch ({ url, options = {} }, dispatch = null) {
  if (!url) {
    return false
  }
  dispatch && dispatch(fetchStart({config: { key: url }}))
  return axios({
    method: 'get',
    timeout: config.timeout,
    url,
    ...options
  }).then((response) => {
    dispatch && dispatch(fetchSuccess({config: { key: url }}))
    return response
  }).catch(() => {
    dispatch && dispatch(fetchFailure({config: { key: url }}))
    throw new Error('Timeout')
  })
}

export default [
  watchFetchStart(),
  watchFetchSuccess(),
  watchFetchFailure(),
  watchLoadStart(),
  watchLoadEnd()
]
