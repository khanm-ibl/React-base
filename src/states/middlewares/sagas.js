import { all } from 'redux-saga/effects'
import commonSagas from './effects'
import { moduleSagas } from '../modules/index'

export default getState => {
  function * rootSaga () {
    yield all([
      ...commonSagas,
      ...moduleSagas
    ])
  }
  return rootSaga
}
