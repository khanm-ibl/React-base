import { takeEvery, call, select, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { setUrl, setResponse } from './actions'
import { MODULE_NAME } from './models'
import { getDataFromUrl } from './handlers'
import Modal from '../../../views/components/Modal'

function * onUrlChange (action) {
  // TODO: Do something in redux when have url
  const url = yield select(state => state[MODULE_NAME].url)

  const result = yield call(getDataFromUrl, { url })

  yield put({ type: setResponse.toString(), payload: result })
  Modal.hide()
  yield put(push('/result'))
}

function * watchUrlChange () {
  yield takeEvery(setUrl.toString(), onUrlChange)
}

export default [ watchUrlChange() ]
