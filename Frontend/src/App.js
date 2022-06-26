import React, { useState, useCallback } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import ContactItem from './contacts/components/ContactItem'
import UserContacts from './contacts/pages/UserContacts'

function App() {
  return (
    <Router>
      <Route exact path='/'>
        <UserContacts />
      </Route>
      <Route path='/contact/:id'>
        <ContactItem />
      </Route>
    </Router>
  )
}

export default App
