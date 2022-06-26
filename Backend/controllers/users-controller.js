const { v4: uuid } = require('uuid')
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')

let DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Zhen Yi Ang',
    email: 'angzhenyi@gmail.com',
    password: 'testing',
  },
]

const signup = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422)
  }

  const { name, email, password } = req.body
  console.log(name)

  const newUser = {
    id: uuid(),
    name,
    email,
    password,
  }

  DUMMY_USERS.push(newUser)
  res.status(201).json({ user: newUser })
}

const login = (req, res, next) => {
  const { email, password } = req.body

  const loginUser = DUMMY_USERS.find((user) => user.email === email)
  if (!loginUser || loginUser.password !== password) {
    throw new HttpError('Invalid email or password', 401)
  }

  res.json({ message: 'Successful login' })
}

exports.signup = signup
exports.login = login
