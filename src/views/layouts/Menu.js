import I18n from 'i18n-js'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Menu extends Component {
  constructor (props) {
    super(props)
    this.menu = [
      {
        translate: 'menu.home',
        id: 'home'
      },
      {
        translate: 'menu.result',
        id: 'result'
      }
    ]
  }
  render () {
    const { active } = this.props
    return (
      <div className='menu-container'>
        <ul className='menu'>
          {this.menu && this.menu.map(item => (
            <li key={item.id} className='menu-item'>
              <Link className={`link ${item.id === active ? 'active' : ''}`} to={`/${item.id}`}>
                { I18n.t(item.translate) }
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
