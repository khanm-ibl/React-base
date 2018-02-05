import React, { Component } from 'react'
import { connect } from 'react-redux'
import Menu from '../layouts/Menu'

class ResultPage extends Component {
  render () {
    const { response } = this.props
    return (
      <div className='container'>
        <Menu active='result' />
        <div className='response-container'>
          { `${JSON.stringify(response)}` }
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  response: state.home.response
})

export default connect(mapStateToProps, {})(ResultPage)
