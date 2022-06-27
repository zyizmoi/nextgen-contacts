import React, { useState, useContext, useEffect } from 'react'
import { useParams, useRouteMatch, Link } from 'react-router-dom'

import { Card, CardHeader, CardContent, Button, Typography } from '@mui/material'

// import Modal from '../../shared/components/UIElements/Modal';
// import Map from '../../shared/components/UIElements/Map';
// import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hook'
// import { AuthContext } from '../../shared/context/auth-context'
import './ContactItem.css'

const ContactItem = () => {
  const [contact, setContact] = useState()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const id = useRouteMatch().params.id

  useEffect(() => {
    console.log('trying')
    const fetchContact = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/contact/${id}`)
        console.log(['res?', responseData])
        // console.log(responseData.contact)
        setContact(responseData.contact)
      } catch (err) {
        console.log(err)
      }
    }
    console.log('here?')
    fetchContact()
  }, [sendRequest, id])

  console.log(contact)
  return (
    <div style={{ display: 'flex', justifyContent: 'center', minWidth: '40%' }}>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {/* <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className='map-container'>
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header='Are you sure?'
        footerClass='place-item__modal-actions'
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>Do you want to proceed and delete this place? Please note that it can't be undone thereafter.</p>
      </Modal> */}
      <Card sx={{ minWidth: '40%', margin: '10% 0%' }}>
        <CardContent>
          {isLoading && <LoadingSpinner asOverlay />}
          {/* <div className='place-item__image'>
            <img src={contact.image} alt={contact.title} />
          </div> */}
          {!isLoading && contact && (
            <>
              <Typography gutterBottom variant='h2' component='div'>
                {contact.name}
              </Typography>
              <Typography variant='body1' component='div'>
                <p>Name: {contact.name}</p>
                <p>Number: {contact.number}</p>
                <p>Email: {contact.email}</p>
              </Typography>
              <div>
                {/* {auth.userId === props.creatorId && <Button to={`/places/${props.id}`}>EDIT</Button>} */}
                <Button component={Link} to='/'>
                  BACK
                </Button>
                <Button component={Link} to={`/contact/update/${contact.id}`}>
                  EDIT
                </Button>
                <Button danger>DELETE</Button>
              </div>
            </>
          )}

          {/* {auth.userId === props.creatorId && <Button danger>DELETE</Button>} */}
        </CardContent>
      </Card>
    </div>
  )
}

export default ContactItem
