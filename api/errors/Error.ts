import type { Error } from '../types'

export class CustomError extends Error {
  public message: string
  public description: string
  public statusCode: number

  constructor(error: any) {
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
