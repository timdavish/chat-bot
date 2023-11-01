import {ReactNode, createContext, useContext, useEffect, useState} from 'react'

import * as api from '../helpers/api'

import type {User} from '../types'

interface AuthContextValue {
  isLoggedIn: boolean
  logIn: (email: string, password: string) => Promise<void>
  logOut: () => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  user: User | null
}

const AuthContext = createContext<AuthContextValue | null>(null)

interface Props {
  children: ReactNode
}

export const AuthProvider = ({children}: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getAuthStatus = async () => {
      const data = await api.getAuthStatus()

      if (data) {
        setIsLoggedIn(true)
        setUser({email: data.email, id: data.id, name: data.name})
      } else {
        setIsLoggedIn(false)
        setUser(null)
      }
    }

    getAuthStatus()
  }, [])

  const logIn = async (email: string, password: string) => {
    const data = await api.logIn(email, password)

    if (data) {
      setIsLoggedIn(true)
      setUser({email: data.email, id: data.id, name: data.name})
    }
  }

  const logOut = async () => {}

  const signUp = async (name: string, email: string, password: string) => {}

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        logIn,
        logOut,
        signUp,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
