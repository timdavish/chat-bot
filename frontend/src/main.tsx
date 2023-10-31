import React from 'react'
import ReactDOM from 'react-dom/client'

import {ThemeProvider, createTheme} from '@mui/material'
import {Toaster} from 'react-hot-toast'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from './context/AuthContext.tsx'
import {App} from './App.tsx'

import './index.css'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5100/api/v1'
axios.defaults.withCredentials = true

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto Slab, serif',
    allVariants: {
      color: 'white',
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster position='top-right' />

          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
