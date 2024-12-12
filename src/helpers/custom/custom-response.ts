import { Response } from 'express'

interface IExecute {
  res: Response
  message: string
  data?: any
  status?: number
}

export class CustomResponse {
  constructor() {}

  static execute(props: IExecute) {
    const { res, message, data, status = 200 } = props
    res.status(status).json({ message, data })
  }
}
