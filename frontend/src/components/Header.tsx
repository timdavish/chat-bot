import {AppBar, Toolbar} from '@mui/material'
import {Logo} from './Logo'

export const Header = () => {
  return (
    <AppBar
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        position: 'static',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
        }}
      >
        <Logo />
      </Toolbar>
    </AppBar>
  )
}
