import React, { useEffect, useState } from 'react'
import { useParams, useRouteMatch } from 'react-router-dom'
import { Box, Typography, Grid } from '@mui/material'

import BasicModal from '../../shared/components/UIElements/BasicModal'
import PopulatedContacts from './PopulatedContacts'

const ContactsPage = (props) => {
  const query = useRouteMatch().params.query
  const { header } = props
  return (
    <>
      <Grid container spacing={0} direction='column' alignItems='center' justifyContent='center'>
        <Box sx={{ width: '75%' }}>
          <Typography variant='h6'>{header}</Typography>
        </Box>
      </Grid>
      <PopulatedContacts query={query} />
    </>
  )
}

export default ContactsPage
