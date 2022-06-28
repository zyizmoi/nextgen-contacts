import React, { useContext, useState } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'

import { Card, Button, Typography, TextField, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useHttpClient } from '../../shared/hooks/http-hook'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { AuthContext } from '../../shared/context/auth-context'

const Auth = () => {
  const auth = useContext(AuthContext)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const onChangeAuth = () => {
    setIsLoginMode(!isLoginMode)
  }

  const history = useHistory()

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    setValue,
  } = useForm()

  const onSubmit = async (data) => {
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + '/users/login',
          'POST',
          JSON.stringify({
            email: data.email,
            password: data.password,
          }),
          {
            'Content-Type': 'application/json',
          }
        )
        auth.login(responseData.userId, responseData.token)
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + '/users/signup',
          'POST',
          JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
          }),
          {
            'Content-Type': 'application/json',
          }
        )

        auth.login(responseData.userId, responseData.token)
      } catch (err) {}
    }
  }

  return (
    <Grid item container spacing={4} direction='column' align='center' justifyContent='center' maxWidth='50%' margin='auto'>
      {isLoading && <LoadingSpinner asOverlay />}
      <Card sx={{ borderRadius: '10px' }}>
        <Grid item mt={2} mb={2}>
          <Typography variant='h5' component='div'>
            {isLoginMode ? 'Login' : 'Sign Up'}
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          {!isLoginMode && (
            <Grid item mb={2} xs={9} flexGrow={2} align='center'>
              <TextField fullWidth label='Name' {...register('name', { required: 'Required' })} error={!!errors?.name} helperText={errors?.name ? errors.name.message : null} />
            </Grid>
          )}

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
          <Grid item mb={2} xs={9} align='center'>
            <TextField fullWidth type='password' label='Password' {...register('password')} />
          </Grid>
          <Grid item mb={2} align='center'>
            <Button type='submit' variant='contained' color='primary' sx={{ marginRight: '5px' }}>
              {isLoginMode ? 'Login' : 'Sign Up'}
            </Button>
          </Grid>
          <Grid item mb={2} align='center'>
            <Button variant='text' onClick={onChangeAuth}>
              {isLoginMode ? 'Sign up instead' : 'Login instead'}
            </Button>
          </Grid>
        </form>
      </Card>
    </Grid>
  )
}

export default Auth
