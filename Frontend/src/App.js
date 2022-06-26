import React, { useState, useCallback } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import UserContacts from './contacts/pages/UserContacts'

function App() {
  return (
    <Router>
      <Route path='/'>
        <UserContacts />
      </Route>
    </Router>
  )
}

export default App
