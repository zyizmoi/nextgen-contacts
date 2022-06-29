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
  const [tokenExpirationDate, setTokenExpirationDate] = useState()

  const [loggingin, setLoggingin] = useState(true)

  let logoutTimer

  const login = useCallback((uid, token, name, expirationDate) => {
    setToken(token)
    setUserId(uid)
    setName(name)
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
    setTokenExpirationDate(tokenExpirationDate)
    localStorage.setItem('userData', JSON.stringify({ userId: uid, token: token, name: name, expiration: tokenExpirationDate.toISOString() }))
    setLoggingin(false)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setName(null)
    setTokenExpirationDate(null)
    localStorage.removeItem('userData')
  }, [])

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, logout, tokenExpirationDate])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date().getTime()) {
      login(storedData.userId, storedData.token, storedData.name)
      setLoggingin(false)
    }
  }, [login])

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
