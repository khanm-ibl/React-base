import commonReducers from './common/reducers'
import homeReducers from './home/reducers'
import homeSagas from './home/sagas'
import { MODULE_NAME as HOME_MODULE } from './home/models'

export const moduleReducers = {
  common: commonReducers,
  [HOME_MODULE]: homeReducers
}

export const moduleSagas = [
  ...homeSagas
]
