import React from 'react'
import { Card, CardHeader, CardContent, Button, Typography, TextField, Grid } from '@mui/material'

const ContactForm = () => {
  const onSubmit = (e) => {
    e.preventDefault()
    alert('Submit')
  }

  return (
    <Grid container spacing={0} direction='column' alignItems='center' justifyContent='center'>
      <Card sx={{ minWidth: '40%', padding: '5%', justifyContent: 'center', display: 'flex' }}>
        <form onSubmit={onSubmit}>
          <TextField label='Name' />
          <TextField label='Number' />
          <TextField label='Email' type='password' />
          <Button type='submit'>Update Contact</Button>
        </form>
      </Card>
    </Grid>
  )
}

export default ContactForm
