import React, { useState, useContext, useEffect } from 'react'
import { useHistory, useRouteMatch, Link } from 'react-router-dom'

import { Card, Grid, Button, Typography, Container, createTheme, Avatar } from '@mui/material'
import { ThemeProvider } from '@mui/system'

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../shared/context/auth-context'
import './ContactItem.css'

const ContactItem = () => {
  const [contact, setContact] = useState()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const auth = useContext(AuthContext)

  console.log(auth)

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

  function stringToColor(string) {
    let hash = 0
    let i

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.slice(-2)
    }
    /* eslint-enable no-bitwise */

    return color
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    }
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
          <Container width='500px'>
            <Card sx={{ maxWidth: { md: '50%' }, margin: 'auto', borderRadius: '10px' }}>
              <Grid container spacing={6}>
                <Grid item xs={12} md={4}>
                  <Container align='center' margin='auto'>
                    <Avatar {...stringAvatar(contact.name)} sx={{ width: 130, height: 130, margin: 4 }} />
                  </Container>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Container mt={4} sx={{ paddingTop: '20px' }}>
                    <Typography gutterBottom variant='h3' fontWeight='bold' component='div' sx={{ paddingLeft: '30px' }}>
                      {contact.name}
                    </Typography>
                  </Container>
                  <Container sx={{ align: { xs: 'center' } }}>
                    {/* <Typography variant='h6' component='div' >
                      Name: {contact.name}
                    </Typography> */}
                    <Typography variant='h6' component='div' sx={{ paddingLeft: '30px', margin: { xs: 'auto' } }}>
                      Number: {contact.number}
                    </Typography>
                    <Typography variant='h6' component='div' sx={{ paddingLeft: '30px', margin: { xs: 'auto' } }}>
                      Email: {contact.email}
                    </Typography>
                  </Container>
                  <Container sx={{ marginTop: '20px', paddingLeft: '35px' }}>
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
                </Grid>
              </Grid>
            </Card>
          </Container>
        </ThemeProvider>
      )}
    </>
  )
}

export default ContactItem
