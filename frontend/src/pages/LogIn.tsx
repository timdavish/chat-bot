import {FormEvent} from 'react'

import {Box, Button, Typography} from '@mui/material'
import {IoIosLogIn} from 'react-icons/io'
import {TextField} from '../components'

import {toast} from 'react-hot-toast'

import {useAuthContext} from '../context/AuthContext'

const LOG_IN_TOAST_ID = 'logIn'

export const LogIn = () => {
  const authContext = useAuthContext()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      toast.loading('Logging in...', {id: LOG_IN_TOAST_ID})
      await authContext?.logIn(email, password)
      toast.success('Successfully logged in.', {id: LOG_IN_TOAST_ID})
    } catch (error) {
      console.error(error)
      toast.error('Failed to log in.', {id: LOG_IN_TOAST_ID})
    }
  }

  return (
    <Box display='flex' flex={1} height='100%' width='100%'>
      <Box display={{md: 'flex', sm: 'none', xs: 'none'}} marginTop={8} padding={8}>
        <img alt='AI Robot' src='airobot.png' style={{width: '400px'}} />
      </Box>

      <Box
        alignItems='center'
        display='flex'
        flex={{md: 0.5, xs: 1}}
        justifyContent='center'
        marginLeft='auto'
        marginTop={16}
        padding={2}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            border: 'none',
            borderRadius: '10px',
            boxShadow: '10px 10px 20px #000000',
            margin: 'auto',
            padding: '30px',
          }}
        >
          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Typography fontWeight={600} padding={2} textAlign='center' variant='h4'>
              Log In
            </Typography>

            <TextField label='Email' name='email' type='email' />

            <TextField label='Password' name='password' type='password' />

            <Button
              endIcon={<IoIosLogIn />}
              sx={{
                backgroundColor: '#00fffc',
                borderRadius: 2,
                marginTop: 2,
                paddingX: 2,
                paddingY: 1,
                width: '400px',

                ':hover': {
                  backgroundColor: '#ffffff',
                  color: '#000000',
                },
              }}
              type='submit'
            >
              Log In
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}
