const HttpError = require('../models/http-error')

const DUMMY_CONTACTS = [
  {
    id: '23482734792',
    name: 'John Smith',
    number: '92834728',
    email: 'jsmith@blabla.com',
  },
  {
    id: '23482734795',
    name: 'Jane Doe',
    number: '32476283',
    email: 'jdoe@blabla.com',
  },
]

const searchContact = (req, res, next) => {
  const filter = req.query.search
  const filteredContacts = DUMMY_CONTACTS.filter((contact) => {
    let isValid = false

    for (property in contact) {
      isValid = contact[property].search(filter) >= 0

      if (isValid === true) {
        return isValid
      }
    }

    return isValid
  })

  if (filteredContacts.length == 0) {
    const error = new HttpError('No name or number', 404)
    return next(error)
  }

  console.log('GET request for contacts')
  res.json(filteredContacts)
}

exports.searchContact = searchContact
