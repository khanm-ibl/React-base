import { handleActions } from 'redux-actions'
import * as actions from './actions'
import { loadEnd, loadStart } from '../../middlewares/effects'

const updateFetching = (fetching, payload, upDown) => {
  const { config } = payload
  const key = config.key || config.url
  if (upDown < 0 && fetching[key] + upDown === 0) {
    delete fetching[key]
  } else {
    fetching[key] = (fetching[key] || 0) + upDown
  }
  return fetching
}

const defaultState = {
  fetching: {},
  loadingCount: 0,
  isLoading: false,
  notifications: {},
  setting: {}
}

const handlers = {
  [actions.fetchStart]: (state, action) => ({
    ...state,
    ...{ fetching: updateFetching(state.fetching, action.payload, 1) }
  }),
  [actions.fetchSuccess]: (state, action) => ({
    ...state,
    ...{ fetching: updateFetching(state.fetching, action.payload, -1) }
  }),
  [actions.fetchFailure]: (state, action) => ({
    ...state,
    ...{ fetching: updateFetching(state.fetching, action.payload, -1) }
  }),
  [loadStart]: (state, action) => ({
    ...state,
    ...{
      loadingCount: state.loadingCount + 1,
      isLoading: true
    }
  }),
  [loadEnd]: (state, action) => ({
    ...state,
    ...{
      loadingCount: state.loadingCount - 1,
      isLoading: state.loadingCount > 1
    }
  }),
  [actions.notification]: (state, action) => ({
    ...state,
    ...{
      notifications: {
        ...state.notification,
        ...{
          [action.payload.key]: action.payload
        }
      }
    }
  }),
  [actions.setUserLanguage]: (state, action) => ({
    ...state,
    setting: { ...state.setting, language: action.payload }
  })
}

export default handleActions(handlers, defaultState)
