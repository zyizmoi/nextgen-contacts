import React, { useCallback } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import { useHistory } from 'react-router-dom'

import { Card, CardHeader, CardContent, Button, Typography } from '@mui/material'
import ContactItem from './ContactItem'
import './ContactTable.css'

// const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
//   border: 0,
//   color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
//   fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(','),
//   WebkitFontSmoothing: 'auto',
//   letterSpacing: 'normal',
//   '& .MuiDataGrid-columnsContainer': {
//     backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
//   },
//   '& .MuiDataGrid-iconSeparator': {
//     display: 'none',
//   },
//   '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
//     borderRight: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
//   },
//   '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
//     borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
//   },
//   '& .MuiDataGrid-cell': {
//     color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
//   },
//   '& .MuiPaginationItem-root': {
//     borderRadius: 0,
//   },
// }))

const ContactTable = (props) => {
  const history = useHistory()
  const handleOnRowClick = (props) => history.push(`/contact/find/${props.id}`)

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
    { field: 'name', headerName: 'Name', minWidth: 200, flex: 1, cellClassName: 'name-column', headerClassName: 'column-header' },
    { field: 'number', headerName: 'Number', minWidth: 200, flex: 1, headerClassName: 'column-header' },
    { field: 'email', headerName: 'Email', minWidth: 200, flex: 1, headerClassName: 'column-header' },
  ]

  return (
    <div className='contact-table'>
      <DataGrid rows={rows} columns={columns} onRowClick={handleOnRowClick} AutoGenerateColumns='False' density='comfortable' autoPageSize={true} rowsPerPageOptions={[10, 20, 50]} />
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

export default ContactTable
