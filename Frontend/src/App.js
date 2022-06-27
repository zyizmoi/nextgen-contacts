import React, { useState, useCallback } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import ContactItem from './contacts/components/ContactItem'
import ContactsPage from './contacts/pages/ContactsPage'
import ContactForm from './contacts/components/ContactForm'
import Auth from './users/pages/Auth'
import NavBar from './shared/components/NavBar'
import { AuthContext } from './shared/context/auth-context'

import './App.css'

function App() {
  const [token, setToken] = useState(true)
  const [userId, setUserId] = useState(false)

  const login = useCallback((uid, token) => {
    setToken(token)
    setUserId(uid)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
  }, [])

  let routes

  if (token) {
    routes = (
      <Router>
        <NavBar path='/' />
        <Route exact path='/'>
          <ContactsPage header='All Contacts' />
        </Route>
        <Route exact path='/contact/search/:query'>
          <ContactsPage header='Search Results' />
        </Route>
        <Route exact path='/contact/find/:id'>
          <ContactItem />
        </Route>
        <Route exact path='/contact/update/:id'>
          <ContactForm />
        </Route>
        <Route exact path='/contact/create'>
          <ContactForm />
        </Route>
      </Router>
    )
  } else {
    routes = (
      <Router>
        <Route path='/'>
          <Auth />
        </Route>
      </Router>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <div className='main-window'>{routes}</div>
    </AuthContext.Provider>
  )
}

export default App
