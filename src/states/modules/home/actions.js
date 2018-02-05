import { createAction } from 'redux-actions'
import { MODULE_NAME } from './models'

export const setUrl = createAction(`${MODULE_NAME}_SET_URL`)
export const setResponse = createAction(`${MODULE_NAME}_SET_RESPONSE`)
