import { createAction } from 'redux-actions'

export const fetchStart = createAction('API_FETCH_START')
export const fetchSuccess = createAction('API_FETCH_SUCCESS')
export const fetchFailure = createAction('API_FETCH_FAILURE')
