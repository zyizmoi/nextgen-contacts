import React, { useCallback } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import { useHistory } from 'react-router-dom'

import Card from '../../shared/components/UIElements/Card'
import ContactItem from './ContactItem'
import Button from '../../shared/components/FormElements/Button'
import './ContactList.css'

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
  fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
  },
  '& .MuiDataGrid-cell': {
    color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },
}))

const ContactList = (props) => {
  const history = useHistory()
  const handleOnRowClick = (props) => history.push(`/contact/${props.id}`)

  if (props.items.length === 0) {
    return (
      <div className='place-list center'>
        <Card>
          <h2>No contacts found.</h2>
        </Card>
      </div>
    )
  }

  const rows = props.items.map((contact) => {
    return { id: contact.id, name: contact.name, number: contact.number, email: contact.email }
  })
  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'number', headerName: 'Number', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
  ]

  return (
    <div className='contact-table'>
      <StyledDataGrid rows={rows} columns={columns} onRowClick={handleOnRowClick} />
    </div>
  )

  //   return (
  //     <ul className='place-list'>
  //       {props.items.map((contact) => (
  //         <ContactItem key={contact.id} name={contact.name} number={contact.number} email={contact.email} />
  //       ))}
  //     </ul>
  //   )
}

export default ContactList
