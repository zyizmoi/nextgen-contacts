import React, { useState, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'

import { Button, Menu, MenuItem, Container, Tooltip, Avatar } from '@mui/material'

import { AuthContext } from '../../shared/context/auth-context'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

export default function NavBar(props) {
  const { name } = props

  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const [input, setInput] = useState()
  const history = useHistory()
  const auth = useContext(AuthContext)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleAllContacts = (e) => {
    history.push('/')
    handleCloseNavMenu()
  }

  const handleNewContact = (e) => {
    history.push('/contact/create')
    handleCloseNavMenu()
  }

  const onChange = async (e) => {
    setInput(e.target.value)
    if (!input || input.length === 0) {
      return history.push('/')
    }
    history.push(`/contact/search/${input}`)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // alert(input)
    // if (!input || input.length === 0) {
    //   return history.push('/')
    // }
    // history.push(`/contact/search/${input}`)
  }

  const handleLogout = (e) => {
    auth.logout()
    handleCloseUserMenu()
  }

  return (
    <Box sx={{ flexGrow: 1, marginBottom: '2rem' }}>
      <AppBar position='static' sx={{ backgroundColor: '#a3a3a3', boxShadow: 'none', borderRadius: '10px' }}>
        <Container width='100%'>
          <Toolbar disableGutters>
            <Typography
              variant='h6'
              noWrap
              component={Link}
              to='/'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              NXTContacts
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton size='large' aria-label='account of current user' aria-controls='menu-appbar' aria-haspopup='true' onClick={handleOpenNavMenu} color='inherit'>
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem key='All Contacts' onClick={handleAllContacts}>
                  <Typography textAlign='center'>All Contacts</Typography>
                </MenuItem>
                <MenuItem key='New Contact' onClick={handleNewContact}>
                  <Typography textAlign='center'>New Contact</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              variant='h5'
              noWrap
              component={Link}
              to='/'
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              NXTContacts
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button key={'All Contacts'} onClick={handleAllContacts} sx={{ my: 2, color: 'white', display: 'block' }}>
                All Contacts
              </Button>
              <Button key={'New Contact'} onClick={handleNewContact} sx={{ my: 2, color: 'white', display: 'block' }}>
                New Contact
              </Button>
            </Box>

            <Box sx={{ flexGrow: 1, padding: '0 1em' }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <form onSubmit={onSubmit}>
                  <StyledInputBase placeholder='Search???' inputProps={{ 'aria-label': 'search' }} onChange={onChange} />
                </form>
              </Search>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={name}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>{name && name[0]}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key='Logout' onClick={handleLogout}>
                  <Typography textAlign='center'>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}
