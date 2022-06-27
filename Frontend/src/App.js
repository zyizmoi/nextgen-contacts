import React, { useState, useCallback } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import ContactItem from './contacts/components/ContactItem'
import ContactsPage from './contacts/pages/ContactsPage'
import NavBar from './shared/components/NavBar'

function App() {
  return (
    <>
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
      </Router>
    </>
  )
}

export default App
