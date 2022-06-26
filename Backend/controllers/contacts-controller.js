const { v4: uuid } = require('uuid')
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const Contact = require('../models/contact')

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

const searchContact = async (req, res, next) => {
  const filter = req.query.search

  if (!filter || filter.length === 0) {
    return next(new HttpError('No search term', 400))
  }

  let contacts
  try {
    contacts = await Contact.find({
      $or: [{ name: { $regex: filter, $options: 'i' } }, { number: { $regex: filter, $options: 'i' } }, { email: { $regex: filter, $options: 'i' } }],
    })
  } catch (err) {
    const error = new HttpError('Something went wrong, could not find a contact', 500)
    console.log(err)
    return next(error)
  }

  if (!contacts || contacts.length === 0) {
    return next(new HttpError('Could not find a matching contact', 404))
  }

  console.log('GET request for contacts')
  res.json({ contacts: contacts.map((contact) => contact.toObject({ getters: true })) })
}

const createContact = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new HttpError('Please check your inputs', 422))
  }

  console.log(req.body)
  const { name, number, email, creator } = req.body
  const strNumber = number.toString()
  console.log(typeof strNumber)
  const newContact = new Contact({
    name,
    strNumber,
    email,
    creator,
  })

  try {
    await newContact.save()
  } catch (err) {
    const error = new HttpError('Failed to create a contact, please try again', 500)
    return next(error)
  }

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

  updatedContact.name = name ? name : updatedContact.name
  updatedContact.number = number ? number : updatedContact.number
  updatedContact.email = email ? email : updatedContact.email

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
