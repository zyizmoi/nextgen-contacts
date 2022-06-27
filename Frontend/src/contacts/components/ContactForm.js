import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

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
    <Container maxWidth='md'>
      {isLoading && <LoadingSpinner asOverlay />}
      {((!isLoading && contact) || !id) && (
        <>
          <Box mb={2}>
            <Typography variant='h5' component='div'>
              {id ? 'Edit Contact' : 'New Contact'}
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={2}>
              <TextField label='Name' fullWidth {...register('name', { required: 'Required' })} error={!!errors?.name} helperText={errors?.name ? errors.name.message : null} />
            </Box>
            <Box mb={2}>
              <TextField label='Number' fullWidth {...register('number')} />
            </Box>
            <Box mb={2}>
              <TextField
                label='Email'
                fullWidth
                {...register('email', {
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Invalid email address',
                  },
                })}
                error={!!errors?.email}
                helperText={errors?.email ? errors.email.message : null}
              />
            </Box>
            <Button type='submit' variant='contained' color='primary'>
              {id ? 'Update Contact' : 'Add Contact'}
            </Button>
          </form>
        </>
      )}
    </Container>
  )
}

export default ContactForm
