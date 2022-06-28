import React, { useState, useContext, useEffect } from 'react'
import { useHistory, useRouteMatch, Link } from 'react-router-dom'

import { Card, CardHeader, CardContent, Button, Typography } from '@mui/material'

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

  console.log(contact)
  return (
    <div style={{ display: 'flex', justifyContent: 'center', minWidth: '40%' }}>
      <Card sx={{ minWidth: '40%', margin: '5% 0%' }}>
        <CardContent>
          {isLoading && <LoadingSpinner asOverlay />}

          {!isLoading && contact && (
            <>
              <Typography gutterBottom variant='h2' component='div' align='center'>
                {contact.name}
              </Typography>
              <Typography variant='body1' component='div' align='center'>
                <p>Name: {contact.name}</p>
                <p>Number: {contact.number}</p>
                <p>Email: {contact.email}</p>
              </Typography>
              <div align='center'>
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
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ContactItem
