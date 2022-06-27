import React from 'react'
import { useHistory } from 'react-router-dom'

import { Box, Card, Container, Button, Typography, TextField, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useHttpClient } from '../../shared/hooks/http-hook'

const ContactForm = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data) => {
    addNewContact(data)
  }
  const history = useHistory()

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

  return (
    <Container maxWidth='md'>
      <Box mb={2}>
        <Typography variant='h5' component='div'>
          New Contact
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
          Add Contact
        </Button>
      </form>
    </Container>
  )
}

export default ContactForm
