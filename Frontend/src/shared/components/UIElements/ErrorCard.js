import React, { useState, useContext, useEffect } from 'react'
import { useParams, useRouteMatch } from 'react-router-dom'

import { Card, Container, Typography, Box } from '@mui/material'

const ErrorCard = (props) => {
  const { message } = props

  return (
    <Container sx={{ width: '80%', marginTop: '20px' }}>
      <Card sx={{ minWidth: '40%', padding: '5%' }}>
        <Typography gutterBottom variant='h4' component='div' textAlign='center'>
          {message}
        </Typography>
      </Card>
    </Container>
  )
}

export default ErrorCard
