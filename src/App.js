import React, { useState, useCallback, useEffect } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import ContactItem from './contacts/components/ContactItem'
import ContactsPage from './contacts/pages/ContactsPage'
import ContactForm from './contacts/components/ContactForm'
import Auth from './users/pages/Auth'
import NavBar from './shared/components/NavBar'
import { AuthContext } from './shared/context/auth-context'
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner'

import './App.css'

function App() {
  const [token, setToken] = useState(false)
  const [userId, setUserId] = useState(false)
  const [name, setName] = useState(false)

  const [loggingin, setLoggingin] = useState(true)

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token, storedData.name)
      setLoggingin(false)
    }
  }, [])

  const login = useCallback((uid, token, name) => {
    setToken(token)
    setUserId(uid)
    setName(name)
    localStorage.setItem('userData', JSON.stringify({ userId: uid, token: token, name: name }))
    setLoggingin(false)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setName(null)
    localStorage.removeItem('userData')
  }, [])

  let routes

  if (token) {
    routes = loggingin ? (
      <LoadingSpinner asOverlay />
    ) : (
      <Router>
        <NavBar path='/' name={name} />
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
