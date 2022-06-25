const uuid = require('uuid')
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')

let DUMMY_CONTACTS = [
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

const allContacts = (req, res, next) => {
  res.json(DUMMY_CONTACTS)
}

const searchContact = (req, res, next) => {
  const filter = req.query.search

  if (!filter) {
    console.log('GET request for contacts')
    res.json(DUMMY_CONTACTS)
  }

  const filteredContacts = DUMMY_CONTACTS.filter((contact) => {
    let isValid = false

    for (property in contact) {
      isValid = contact[property].toLowerCase().search(filter.toLowerCase()) >= 0

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

const createContact = (req, res, next) => {
  console.log(req.body)
  const { name, number, email } = req.body
  const newContact = {
    id: uuid(),
    name,
    number,
    email,
  }

  DUMMY_CONTACTS.push(newContact)

  res.status(201).json({ contact: newContact })
}

const updateContact = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422)
  }

  const { name, number, email } = req.body
  const id = req.params.id

  if (!DUMMY_CONTACTS.find((contact) => contact.id === id)) {
    throw new HttpError('Could not find a contact with that id.', 404)
  }

  const updatedContact = { ...DUMMY_CONTACTS.find((contact) => contact.id === id) }
  const contactIndex = DUMMY_CONTACTS.findIndex((contact) => contact.id === id)
  updatedContact.name = name
  updatedContact.number = number
  updatedContact.email = email

  DUMMY_CONTACTS[contactIndex] = updatedContact

  res.status(200).json({ contact: updatedContact })
}

const deleteContact = (req, res, next) => {
  const id = req.params.id

  if (!DUMMY_CONTACTS.find((contact) => contact.id === id)) {
    throw new HttpError('Could not find a contact with that id.', 404)
  }

  DUMMY_CONTACTS = DUMMY_CONTACTS.filter((contact) => contact.id !== id)
  res.status(200).json({ message: 'Deleted contact' })
}

exports.searchContact = searchContact
exports.createContact = createContact
exports.updateContact = updateContact
exports.deleteContact = deleteContact
exports.allContacts = allContacts
