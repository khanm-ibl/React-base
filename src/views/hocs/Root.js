import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import Routes from '../../routes'
import PageLoading from '../components/PageLoading'
import ProgressLoading from '../components/ProgressLoading'
import Modal from '../components/Modal'

export default function Root ({ store, persistor, history }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
          <ProgressLoading.Component />
          <PageLoading.Component type='bars' />
          <Modal.Component global />
        </div>
      </PersistGate>
    </Provider>
  )
}
