import {sign} from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET

export const createToken = (id: string, email: string, expiresIn: string) => {
  const token = sign(
    {id, email},
    jwtSecret,
    {expiresIn}
  )

  return token
}
