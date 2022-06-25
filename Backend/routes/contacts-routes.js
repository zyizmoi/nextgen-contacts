const express = require('express')

const contactsController = require('../controllers/contacts-controller')

const router = express.Router()

router.get('/', contactsController.searchContact)

router.post('/create', contactsController.createContact)

router.put('/:id', contactsController.updateContact)

router.delete('/:id', contactsController.deleteContact)

module.exports = router
