import PouchDB from 'pouchdb'
import { config } from '../configs'

class Database {
  constructor (name = 'walletDB') {
    this.name = name
    this.db = new PouchDB(name, {adapter: 'websql'})
  }

  info () {
    return this.db && this.db.info()
  }

  put (id, data) {
    return this.db.put({
      _id: id,
      ...data
    })
  }

  index (fields) {
    return this.db.createIndex({
      index: {
        fields
      }
    })
  }

  // Query :
  // {
  //   selector: {
  //     name: 'Mario',
  //     balance: { $gt: 1190 }
  //   },
  //   fields: ['_id', 'name'],
  //   sort: ['name'],
  //   limit: 100,
  //   skip: 0
  // }
  // Selector Defines a selector to filter the results. Required.
  //   $lt Match fields “less than” this one.
  //   $gt Match fields “greater than” this one.
  //   $lte Match fields “less than or equal to” this one.
  //   $gte Match fields “greater than or equal to” this one.
  //   $eq Match fields equal to this one.
  //   $ne Match fields not equal to this one.
  //   $exists True if the field should exist, false otherwise.
  //   $type One of: “null”, “boolean”, “number”, “string”, “array”, or “object”.
  //   $in The document field must exist in the list provided.
  //   $and Matches if all the selectors in the array match.
  //   $nin The document field must not exist in the list provided.
  //   $all Matches an array value if it contains all the elements of the argument array.
  //   $size Special condition to match the length of an array field in a document.
  //   $or Matches if any of the selectors in the array match. All selectors must use the same index.
  //   $nor Matches if none of the selectors in the array match.
  //   $not Matches if the given selector does not match.
  //   $mod Matches documents where (field % Divisor == Remainder) is true, and only when the document field is an integer.
  //   $regex A regular expression pattern to match against the document field.
  //   $elemMatch Matches all documents that contain an array field with at least one element that matches all the specified query criteria.
  find (query = {}) {
    return (this.db && this.db.find(query)) || []
  }

  query (func) {
    return (this.db && this.db.query(func)) || { offset: 0, rows: [], total_rows: 0 }
  }

  post (data) {
    return this.db.post(data)
  }

  update (id, data) {
    return this.db.get(id).then((doc) => {
      return this.db.put({
        ...data,
        _id: id,
        _rev: doc._rev
      })
    })
  }

  get (id) {
    return (this.db && this.db.get(id)) || undefined
  }

  bulk (arr = []) {
    return (this.db && this.db.bulkDocs(arr)) || undefined
  }

  delete (id) {
    if (!this.db) {
      return false
    }
    return this.db.get(id).then((doc) => {
      return this.db.remove(doc)
    })
  }

  // Event database change : 'change', 'complete', 'error'
  // onChange.on(EVENT)
  // Cancel event listener onChange.cancel()
  onChange (option = {
    timeout: config.timeout,
    since: 'now',
    live: true,
    include_docs: true
  }) {
    return (this.db && this.db.changes(option)) || undefined
  }

  destroy () {
    if (this.db) {
      return this.db.destroy()
    }
    return false
  }

  close () {
    return this.db && this.db.close()
  }
}

export default new Database()
