import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../errors/custom-error'
import { HandleError } from '../errors/handle-error'
import { JwtAuth } from '../../config/jwtauth'

interface IPayload {
  id: string
}

export class AuthMiddleware {
  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization

    try {
      if (!authorization) {
        throw CustomError.unauthorized('Token is required')
      }
      if (!authorization?.startsWith('Bearer ')) {
        throw CustomError.unauthorized('Invalid token')
      }

      const token = authorization?.split(' ')[1] || ''
      // Verificar el token
      const payload = await JwtAuth.verifyToken<IPayload>(token)
      // Si el token es invalido
      if (!payload) {
        throw CustomError.badRequest('Invalid token')
      }
      req.body.payload = payload
      next()
    } catch (error) {
      HandleError.execute(error, 'Error verifying token', res)
    }
  }
}
