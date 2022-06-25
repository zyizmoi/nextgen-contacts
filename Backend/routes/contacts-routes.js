const express = require('express')

const contactsController = require('../controllers/contacts-controller')

const router = express.Router()

router.get('/', contactsController.searchContact)

module.exports = router
