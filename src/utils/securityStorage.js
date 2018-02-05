const { remote } = require('electron')
const keytar = remote.require('keytar')

export default class SecurityStorage {
  constructor () {
    this.serviceName = 'quanta-security-storeage'
  }

  get (id) {
    return (keytar && keytar.getPassword(this.serviceName, id)) || undefined
  }

  set (id, value) {
    try {
      keytar.replacePassword(this.serviceName, id, value)
      return true
    } catch (error) {
      return false
    }
  }
}
