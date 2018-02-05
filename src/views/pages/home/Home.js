import I18n from 'i18n-js'
import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import './Home.css'
import handlers from '../../../states/modules/home/handlers'
import { SUPPORT_LANGUAGE } from '../../../states/modules/common/models'
import Menu from '../../layouts/Menu'
import Modal from '../../components/Modal'
import { SimpleModal } from './SimpleModal'
import { MODULE_NAME } from '../../../states/modules/home/models'

class Home extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      url: props.url
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
    this.onChangeLanguage = this.onChangeLanguage.bind(this)
  }

  onChangeText (evt) {
    this.setState({
      url: evt.target.value
    })
  }
  // Recommend concept
  // onSubmit () {
  //   // changeUrl(url)
  //   Modal.show(<SimpleModal deactivateModal={async () => {
  //     const { url } = this.state
  //     const { fetchData, changeUrl } = this.props

  //     changeUrl(url)
  //     await fetchData(url)
  //     Modal.hide()
  //   }} />, 'KKKSSS')
  // }

  // Saga concept
  onSubmit () {
    Modal.show(<SimpleModal deactivateModal={async () => {
      const { url } = this.state
      const { changeUrl } = this.props

      changeUrl(url)
    }} />, 'KKKSSS')
  }

  onChangeLanguage ({ target: { value } }) {
    const { changeLanguage, setting } = this.props
    if (setting.language !== value) {
      changeLanguage(value)
    }
  }

  render () {
    const { url } = this.state
    const { setting: { language } } = this.props

    return (
      <div>
        <div className='container' data-tid='container'>
          <h2>{I18n.t('app_name')}</h2>
          <Menu active='home' />
          <p> { 'FETCH' } </p>
          <div className='input-container'>
            <input className='clear-input' value={url} onChange={this.onChangeText} />
          </div>
          <div className='select-container'>
            <div className='styled-select blue semi-square'>
              <select value={language} onChange={this.onChangeLanguage}>
                {SUPPORT_LANGUAGE.map(item => (
                  <option key={item.value} value={item.value}>{ I18n.t(`language.${item.value}`) }</option>
                ))}
              </select>
            </div>
          </div>
          <div className='button-container'>
            <button onClick={this.onSubmit} className='button'>
              <span>{I18n.t('common.change')}</span>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  setting: state.common.setting,
  url: state[MODULE_NAME].url
})

export default connect(mapStateToProps, handlers)(Home)
