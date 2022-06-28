import React, { useState, useContext, useEffect } from 'react'
import { useRouteMatch, useParams } from 'react-router-dom'
import { Container, Typography, Card, createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/system'

import { useHttpClient } from '../../shared/hooks/http-hook'
import ContactTable from '../components/ContactTable'
import { AuthContext } from '../../shared/context/auth-context'
import ErrorCard from '../../shared/components/UIElements/ErrorCard'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

import './ContactsPage.css'

const ContactsPage = (props) => {
  const query = useRouteMatch().params.query
  const { header } = props

  const [loadedContacts, setloadedContacts] = useState()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const auth = useContext(AuthContext)

  const id = useParams().userId

  useEffect(() => {
    const fetchContacts = async () => {
      if (!query || query.length === 0) {
        try {
          const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL, 'GET', null, {
            Authorization: 'Bearer ' + auth.token,
          })
          console.log(responseData)
          setloadedContacts(responseData.contacts)
        } catch (err) {}
      } else {
        try {
          const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/contact/?search=${query}`, 'GET', null, {
            Authorization: 'Bearer ' + auth.token,
          })
          console.log(responseData)
          setloadedContacts(responseData.contacts)
        } catch (err) {}
      }
    }
    fetchContacts()
  }, [sendRequest, id, query])

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 370,
        md: 800,
        lg: 1200,
      },
    },
  })

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && !loadedContacts && <ErrorCard message='No results for this query!' />}
      {!isLoading && loadedContacts && (
        <ThemeProvider theme={theme}>
          <Card sx={{ margin: 'auto', maxHeight: '90vh', width: { lg: '75%', md: '90%' }, maxWidth: 'lg', minWidth: 'xs', borderRadius: '10px' }}>
            <Typography variant='h5' sx={{ ml: { lg: 7, xs: 0 }, mt: 4, textAlign: { lg: 'left', xs: 'center' }, fontWeight: 'bold' }}>
              {header}
            </Typography>
            <Container width='100%' align='center'>
              <ContactTable items={loadedContacts} />
            </Container>
          </Card>
        </ThemeProvider>
      )}
    </>
  )
}

export default ContactsPage
