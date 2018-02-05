import React from 'react'
import { Route, Switch } from 'react-router'
import Page from '../views/hocs/Page'
import {
  HomePage,
  ResultPage
} from '../views/pages/index'
import Initial from '../views/hocs/Initial'

export default () => {
  return (
    <Switch>
      <Route exact path='/' component={Initial} />
      <Route path='/home' component={Page(HomePage)} />
      <Route path='/result' component={Page(ResultPage)} />
    </Switch>
  )
}
