import React, { useState, useContext, useEffect } from 'react'
import { useParams, useRouteMatch } from 'react-router-dom'

import { Card, CardHeader, CardContent, Button, Typography, Grid } from '@mui/material'

const ErrorCard = (props) => {
  const { message } = props

  return (
    <Grid container spacing={0} direction='column' alignItems='center' justifyContent='center'>
      <Card sx={{ minWidth: '40%', padding: '5%', justifyContent: 'center' }}>
        <Typography gutterBottom variant='h4' component='div'>
          {message}
        </Typography>
      </Card>
    </Grid>
  )
}

export default ErrorCard
