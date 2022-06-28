import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '@mui/material'

import ContactTable from '../components/ContactTable'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorCard from '../../shared/components/UIElements/ErrorCard'
import { AuthContext } from '../../shared/context/auth-context'

const PopulatedContacts = (props) => {
  const { query } = props

  const [loadedContacts, setloadedContacts] = useState()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const auth = useContext(AuthContext)

  const id = useParams().userId

  useEffect(() => {
    const fetchContacts = async () => {
      if (!query || query.length === 0) {
        try {
          const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL, 'GET', null, {
            Authorization: 'Bearer ' + auth.token,
          })
          console.log(responseData)
          setloadedContacts(responseData.contacts)
        } catch (err) {}
      } else {
        try {
          const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/contact/?search=${query}`, 'GET', null, {
            Authorization: 'Bearer ' + auth.token,
          })
          console.log(responseData)
          setloadedContacts(responseData.contacts)
        } catch (err) {}
      }
    }
    fetchContacts()
  }, [sendRequest, id, query])

  return (
    <>
      {isLoading && (
        <Container align='center'>
          <LoadingSpinner />
        </Container>
      )}
      {!isLoading && !loadedContacts && <ErrorCard message='No results for this query!' />}
      {!isLoading && loadedContacts && <ContactTable items={loadedContacts} />}
    </>
  )
}

export default PopulatedContacts
