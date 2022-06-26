const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const User = require('../models/user')

const signup = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422))
  }

  const { name, email, password } = req.body

  let existingUser
  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    console.log(err)
    const error = new HttpError('Singing up failed, please try again', 500)
    return next(error)
  }

  if (existingUser) {
    const error = new HttpError('User already exists', 422)
    return next(error)
  }

  const newUser = new User({
    name,
    email,
    password,
    contacts: [],
  })

  try {
    await newUser.save()
  } catch (err) {
    const error = new HttpError('Failed to create account, please try again', 500)
    return next(error)
  }

  res.status(201).json({ user: newUser.toObject({ getters: true }) })
}

const login = async (req, res, next) => {
  const { email, password } = req.body

  let existingUser

  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    console.log(err)
    const error = new HttpError('Logging in failed, please try again', 500)
    return next(error)
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError('Invalid email or Password')
    return next(error)
  }

  res.json({ message: 'Successful login' })
}

exports.signup = signup
exports.login = login
