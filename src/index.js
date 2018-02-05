import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import './views/styles/App.css'
import Root from './views/hocs/Root'
import store, { history } from './states/store'
import registerServiceWorker from './registerServiceWorker'

render(
  <AppContainer>
    <Root {...store} history={history} />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./views/hocs/Root', () => {
    const NextRoot = require('./views/hocs/Root')
    render(
      <AppContainer>
        <NextRoot {...store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}

registerServiceWorker()
