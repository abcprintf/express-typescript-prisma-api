import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { jwtGenerate, jwtRefreshTokenGenerate } from '../../lib/jwt'
import authMiddleware from '../../middleware/auth.middleware'
import RequestWithUser from '../../interfaces/requestWithUser.interface'
import Signup from '../../interfaces/auth/signup.interface'
import { encryptPassword, comparePassword } from '../../lib/bcrypt'

const prisma = new PrismaClient()

const router = Router()

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (typeof email === 'undefined') {
    res.json({
      status: `error`,
      message: `email not found`
    })
  }

  if (typeof password === 'undefined') {
    res.json({
      status: `error`,
      message: `password not found`
    })
  }

  const user = await prisma.user.findFirst({
    where: {
      email: email
    }
  })

  /**
   * verify user
   * compare password
   */
  if (!user) {
    res.status(401).json({
      status: `error`,
      message: `Login fail`
    })
    return
  }

  const valid = await comparePassword(password, user.password)
  if (!valid) {
    res.status(401).json({
      status: `error`,
      message: `Login fail`
    })
    return
  }

  /**
   * Create token with jwt
   */
  const token = jwtGenerate(user)

  /**
   * Create refresh token
   */
  const refreshToken = jwtRefreshTokenGenerate(user)

  res.status(200).json({
    status: 'success',
    userInfo: user,
    access_token: token,
    refresh_token: refreshToken
  })
})

router.post('/signup', async (req: Request, res: Response) => {
  const { name, email, password }: Signup = req.body

  if (typeof name === 'undefined') {
    res.json({
      status: `error`,
      message: `name not found`
    })
  }

  if (typeof email === 'undefined') {
    res.json({
      status: `error`,
      message: `email not found`
    })
  }

  if (typeof password === 'undefined') {
    res.json({
      status: `error`,
      message: `password not found`
    })
  }

  /**
   * generate password hash
   */
  const passwordHash = await encryptPassword(password)

  /**
   * Prisma create user
   */
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: passwordHash
    }
  })

  res.status(200).json({
    status: 'success',
    message: 'signup successfully',
    userInfo: user
  })
})

router.post('/verify', authMiddleware, (request: RequestWithUser, res: Response) => {
  /**
   * if authMiddleware pass
   * return 200 && json message
   */
  const user = request.user
  res.json({
    status: 'success',
    userInfo: user
  })
})

router.post('/logout', authMiddleware, (req: Request, res: Response) => {
  res.json({
    status: 'success',
    message: 'logout successfully'
  })
})

export default router
