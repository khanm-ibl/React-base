import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default Page => {
  return props =>
    <ReactCSSTransitionGroup
      transitionAppear
      transitionAppearTimeout={500}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
      transitionName='SlideIn'
    >
      <Page {...props} />
    </ReactCSSTransitionGroup>
}
