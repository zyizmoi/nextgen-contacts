const express = require('express')

const router = express.Router()

const DUMMY_CONTACTS = [
  {
    name: 'John Smith',
    number: '92834728',
    email: 'jsmith@blabla.com',
  },
  {
    name: 'Jane Doe',
    number: '32476283',
    email: 'jdoe@blabla.com',
  },
]

router.get('/', (req, res, next) => {
  const filters = req.query
  const filteredContacts = DUMMY_CONTACTS.filter((contact) => {
    let isValid = true

    for (key in filters) {
      isValid = isValid && contact[key].search(filters[key]) >= 0
    }

    return isValid
  })

  console.log('GET request for contacts')
  res.json(filteredContacts)
})

module.exports = router
