import { createAction } from 'redux-actions'

export const notification = createAction('NOTIFICATION')
export const setUserLanguage = createAction('SET_USER_LANGUAGE')
export const setSession = createAction('SET_SESSION')

export const fetchStart = createAction('API_FETCH_START')
export const fetchSuccess = createAction('API_FETCH_SUCCESS')
export const fetchFailure = createAction('API_FETCH_FAILURE')
