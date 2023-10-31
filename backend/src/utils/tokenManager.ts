import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const createToken = (id: string, email: string, expiresIn: string) => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET not set.')
  }

  const token = jwt.sign({id, email}, JWT_SECRET, {expiresIn})

  return token
}
