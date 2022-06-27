import React, { useEffect, useState } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'

import { Box, Card, Container, Button, Typography, TextField, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useHttpClient } from '../../shared/hooks/http-hook'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const ContactForm = () => {
  const [contact, setContact] = useState()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  let id
  let location = useLocation()
  if (location.state) {
    id = location.state.id
  }

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    setValue,
  } = useForm()

  const onSubmit = async (data) => {
    if (id) {
      return updateContact(data)
    }
    addNewContact(data)
  }

  const history = useHistory()

  useEffect(() => {
    const fetchContact = async () => {
      if (id) {
        try {
          const responseData = await sendRequest(`http://localhost:5000/contact/${id}`)
          setContact(responseData.contact)
          setValue('name', responseData.contact.name)
          setValue('number', responseData.contact.number)
          setValue('email', responseData.contact.email)
        } catch (err) {
          console.log(err)
        }
      }
    }
    fetchContact()
  }, [])

  const addNewContact = async (data) => {
    try {
      await sendRequest(
        'http://localhost:5000/contact/create',
        'POST',
        JSON.stringify({
          name: data.name,
          number: data.number,
          email: data.email,
          creator: '62b84b79f754efcabdf3327d',
        }),
        { 'Content-Type': 'application/json' }
      )
      history.push('/')
    } catch (err) {
      alert('An error occured, please try again')
    }
  }

  const updateContact = async (data) => {
    try {
      await sendRequest(
        `http://localhost:5000/contact/${id}/update`,
        'PUT',
        JSON.stringify({
          name: data.name,
          number: data.number,
          email: data.email,
        }),
        { 'Content-Type': 'application/json' }
      )
      history.push('/')
    } catch (err) {
      alert('An error occured, please try again')
    }
  }

  return (
    <Grid item container spacing={4} direction='column' align='center' justifyContent='center' maxWidth='50%' margin='auto'>
      {isLoading && <LoadingSpinner asOverlay />}
      {((!isLoading && contact) || !id) && (
        <Card>
          <Grid item mt={2} mb={2} align='center'>
            <Typography variant='h5' component='div'>
              {id ? 'Edit Contact' : 'New Contact'}
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid mb={2} xs={6} flexGrow={2} align='center'>
              <TextField fullWidth label='Name' {...register('name', { required: 'Required' })} error={!!errors?.name} helperText={errors?.name ? errors.name.message : null} />
            </Grid>
            <Grid mb={2} xs={6} align='center'>
              <TextField fullWidth label='Number' {...register('number')} />
            </Grid>
            <Grid mb={2} xs={6} align='center'>
              <TextField
                fullWidth
                flexGrow={2}
                label='Email'
                {...register('email', {
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Invalid email address',
                  },
                })}
                error={!!errors?.email}
                helperText={errors?.email ? errors.email.message : null}
              />
            </Grid>
            <Grid item mb={2} align='center'>
              <Button type='submit' variant='contained' color='primary' sx={{ marginRight: '5px' }}>
                {id ? 'Update Contact' : 'Add Contact'}
              </Button>
              <Button variant='contained' color='error' component={Link} to='/'>
                Cancel
              </Button>
            </Grid>
          </form>
        </Card>
      )}
    </Grid>
  )
}

export default ContactForm
