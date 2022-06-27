import React, { useState, useCallback } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import ContactItem from './contacts/components/ContactItem'
import ContactsPage from './contacts/pages/ContactsPage'
import ContactForm from './contacts/components/ContactForm'
import NavBar from './shared/components/NavBar'

import './App.css'

function App() {
  return (
    <div className='main-window'>
      <Router>
        <NavBar path='/' />
        <Route exact path='/'>
          <ContactsPage header='All Contacts' />
        </Route>
        <Route exact path='/contact/search/:query'>
          <ContactsPage header='Search Results' />
        </Route>
        <Route exact path='/contact/:id'>
          <ContactItem />
        </Route>
        <Route path='/contact/update/:id'>
          <ContactForm />
        </Route>
      </Router>
    </div>
  )
}

export default App
