import {AppBar, Toolbar} from '@mui/material'
import {Logo} from './Logo'
import {NavigationLink} from './NavigationLink'

import {useAuthContext} from '../context/AuthContext'

export const Header = () => {
  const authContext = useAuthContext()

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

        <div>
          {authContext?.isLoggedIn ? (
            <>
              <NavigationLink
                backgroundColor='#00fffc'
                text='Go to Chat'
                textColor='#000000'
                to='/chat'
              />

              <NavigationLink
                backgroundColor='#51538f'
                onClick={authContext?.logOut}
                text='Log Out'
                textColor='#ffffff'
                to='/'
              />
            </>
          ) : (
            <>
              <NavigationLink
                backgroundColor='#00fffc'
                text='Log In'
                textColor='#000000'
                to='/log-in'
              />

              <NavigationLink
                backgroundColor='#51538f'
                text='Sign Up'
                textColor='#ffffff'
                to='/sign-up'
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}
