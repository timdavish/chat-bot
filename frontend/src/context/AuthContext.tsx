import {ReactNode, createContext, useContext, useEffect, useState} from 'react'

import {logIn as apiLogIn} from '../helpers/api'

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
    // TODO: fetch user cookies
  }, [])

  const logIn = async (email: string, password: string) => {
    const data = await apiLogIn(email, password)

    if (data) {
      setUser({email: data.email, id: data.id, name: data.name})
      setIsLoggedIn(true)
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
