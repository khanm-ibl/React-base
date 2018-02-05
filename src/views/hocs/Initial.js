import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import initialize from '../../states/utils/initialize'
import { push } from 'react-router-redux'

class Initial extends PureComponent {
  async componentDidMount () {
    const { dispatch, setting } = this.props
    try {
      await initialize(dispatch, setting.language || undefined)
      dispatch(push('/home'))
    } catch (error) {
      console.log('Fatal Error. Cannot Initialize.', error)
    }
  }

  render () {
    return (
      <div />
    )
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  dispatch
})

const mapStateToProps = state => ({
  setting: state.common.setting
})

export default connect(mapStateToProps, mapDispatchToProps)(Initial)
