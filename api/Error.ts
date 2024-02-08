import type { IError } from './types'

export class CustomError extends Error {
  public message: string
  public description: string
  public statusCode: number

  constructor(error: IError) {
    super()
    this.message = error.message
    this.description = error.description
    this.statusCode = error.statusCode
  }

  toUser() {
    return {
      message: this.message,
      description: this.description,
    }
  }
}
