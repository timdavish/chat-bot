import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET

export const createToken = (id: string, email: string, expiresIn: string) => {
  const token = jwt.sign(
    {id, email},
    jwtSecret,
    {expiresIn}
  )

  return token
}
