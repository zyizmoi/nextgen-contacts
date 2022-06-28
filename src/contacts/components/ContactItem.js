import React, { useState, useContext, useEffect } from 'react'
import { useHistory, useRouteMatch, Link } from 'react-router-dom'

import { Card, CardContent, Button, Typography, Container, createTheme, Avatar } from '@mui/material'
import { ThemeProvider } from '@mui/system'

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../shared/context/auth-context'
import './ContactItem.css'

const ContactItem = () => {
  const [contact, setContact] = useState()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const auth = useContext(AuthContext)

  const id = useRouteMatch().params.id

  const history = useHistory()

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/contact/${id}`, 'GET', null, {
          Authorization: 'Bearer ' + auth.token,
        })
        setContact(responseData.contact)
      } catch (err) {
        console.log(err)
      }
    }
    console.log('here?')
    fetchContact()
  }, [sendRequest, id])

  const onDelete = async () => {
    if (window.confirm('Delete contact?')) {
      await deleteContact()
      history.push('/')
    }
  }

  const deleteContact = async () => {
    try {
      await sendRequest(process.env.REACT_APP_BACKEND_URL + `/contact/${id}/delete`, 'DELETE', null, {
        Authorization: 'Bearer ' + auth.token,
      })
    } catch (err) {}
  }

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 370,
        md: 800,
        lg: 1200,
      },
    },
  })

  console.log(contact)
  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && contact && (
        <ThemeProvider theme={theme}>
          <Container sx={{ minWidth: '300px' }}>
            <Card sx={{ maxWidth: { md: '50%' }, margin: 'auto', borderRadius: '10px' }}>
              <Avatar alt='ZY' src='/static/images/avatar/2.jpg' />
              <CardContent>
                <Typography gutterBottom variant='h3' fontWeight='bold' component='div' align='center'>
                  {contact.name}
                </Typography>
                <Container align='center'>
                  {/* <Typography variant='h6' component='div' align='center'>
                      Name: {contact.name}
                    </Typography> */}
                  <Typography variant='h6' component='div' align='center'>
                    Number: {contact.number}
                  </Typography>
                  <Typography variant='h6' component='div' align='center'>
                    Email: {contact.email}
                  </Typography>
                </Container>
                <Container align='center' sx={{ marginTop: '20px' }}>
                  {/* {auth.userId === props.creatorId && <Button to={`/places/${props.id}`}>EDIT</Button>} */}
                  <Button variant='text' component={Link} to='/'>
                    BACK
                  </Button>
                  <Button variant='text' component={Link} to={{ pathname: `/contact/update/${contact.id}`, state: { id: id } }}>
                    EDIT
                  </Button>
                  <Button variant='text' onClick={onDelete}>
                    DELETE
                  </Button>
                </Container>
              </CardContent>
            </Card>
          </Container>
        </ThemeProvider>
      )}
    </>
  )
}

export default ContactItem
