const express = require('express')
const { check } = require('express-validator')

const contactsController = require('../controllers/contacts-controller')

const router = express.Router()

router.get('/', contactsController.searchContact)

router.post('/create', [check('name').not().isEmpty()], contactsController.createContact)

router.put('/:id', contactsController.updateContact)

router.delete('/:id', contactsController.deleteContact)

module.exports = router
