import { handleActions } from 'redux-actions'

import * as actions from './actions'

const defaultState = {
  url: '',
  response: ''
}

const handlers = {
  [actions.setUrl]: (state, action) => ({
    ...state,
    ...{ url: action.payload }
  }),
  [actions.setResponse]: (state, action) => ({
    ...state,
    ...{ response: action.payload }
  })
}

export default handleActions(handlers, defaultState)
