import { push } from 'react-router-redux'
import { setUrl, setResponse } from './actions'
import { wait } from '../../../utils/async'
import { fetch, loading } from '../../middlewares/effects'
import initialize from '../../utils/initialize'

export function getDataFromUrl ({ url, dispatch = null }) {
  return fetch({
    url,
    dispatch
  })
}

export default (dispatch, props) => ({
  changeUrl: (url) => {
    dispatch(setUrl(url))
  },
  changeLanguage: async (value) => {
    await initialize(dispatch, value)
  },
  fetchData: async (url) => {
    try {
      const result = await getDataFromUrl({ url, dispatch })
      dispatch(setResponse(result.data))
      loading(dispatch, async () => {
        await wait(10000)
        dispatch(push('/result'))
      })
    } catch (error) {
    }
  },
  hightProcessWork: async () => {
    loading(dispatch, async () => {
      wait(10000)
    })
  }
})
