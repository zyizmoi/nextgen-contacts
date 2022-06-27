import React, { useEffect, useState } from 'react'
import { useParams, useRouteMatch } from 'react-router-dom'
import { Stack, Typography, Grid } from '@mui/material'

import PopulatedContacts from './PopulatedContacts'

const ContactsPage = (props) => {
  const query = useRouteMatch().params.query
  const { header } = props
  return (
    <>
      <Grid container spacing={0} direction='column' alignItems='center' justifyContent='center'>
        <Typography variant='h6'>{header}</Typography>
      </Grid>
      <PopulatedContacts query={query} />
    </>
  )
}

export default ContactsPage
