import React, { useEffect, useState, useContext } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'

import { Card, Button, Typography, TextField, Grid, createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/system'

import { useForm } from 'react-hook-form'
import { useHttpClient } from '../../shared/hooks/http-hook'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { AuthContext } from '../../shared/context/auth-context'

const ContactForm = () => {
  const [contact, setContact] = useState()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const auth = useContext(AuthContext)

  let id
  let location = useLocation()
  if (location.state) {
    id = location.state.id
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
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
          const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/contact/${id}`, 'GET', null, {
            Authorization: 'Bearer ' + auth.token,
          })
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
        process.env.REACT_APP_BACKEND_URL + '/contact/create',
        'POST',
        JSON.stringify({
          name: data.name,
          number: data.number,
          email: data.email,
          creator: '62ba24df090857c77941d687',
        }),
        {
          Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json',
        }
      )
      history.push('/')
    } catch (err) {
      console.log(err)
      alert('An error occured, please try again')
    }
  }

  const updateContact = async (data) => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/contact/${id}/update`,
        'PUT',
        JSON.stringify({
          name: data.name,
          number: data.number,
          email: data.email,
          creator: '62ba24df090857c77941d687',
        }),
        {
          Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json',
        }
      )
      history.push('/')
    } catch (err) {
      alert('An error occured, please try again')
    }
  }

  const handleOnClickBack = () => {
    history.goBack()
  }

  return (
    <Grid item container spacing={4} direction='column' align='center' justifyContent='center'>
      {isLoading && <LoadingSpinner asOverlay />}
      {((!isLoading && contact) || !id) && (
        <Card sx={{ borderRadius: '10px', margin: 'auto', mt: '5%', minWidth: { xl: '50%', md: '70%', xs: '90%' }, maxWidth: '50%' }}>
          <Grid item mt={2} mb={2}>
            <Typography variant='h5' fontWeight='bold' component='div'>
              {id ? 'Edit Contact' : 'New Contact'}
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item mb={2} xs={9} flexGrow={2} align='center'>
              <TextField fullWidth label='Name' {...register('name', { required: 'Required' })} error={!!errors?.name} helperText={errors?.name ? errors.name.message : null} />
            </Grid>
            <Grid item mb={2} xs={9} align='center'>
              <TextField fullWidth label='Number' {...register('number')} />
            </Grid>
            <Grid item mb={2} xs={9} align='center'>
              <TextField
                fullWidth
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
              <Button type='submit' variant='text' color='primary' sx={{ marginRight: '5px' }} component={Link} to={`/contact/find/${id}`}>
                {id ? 'Update Contact' : 'Add Contact'}
              </Button>
              <Button variant='text' color='error' component={Link} onClick={handleOnClickBack}>
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
