import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ContactList from '../components/ContactList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hook'

const UserContacts = () => {
  const [loadedContacts, setloadedContacts] = useState()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const id = useParams().userId

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/`)
        setloadedContacts(responseData.contacts)
      } catch (err) {}
    }
    fetchContacts()
  }, [sendRequest, id])

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedContacts && <ContactList items={loadedContacts} />}
    </>
  )
}

export default UserContacts
