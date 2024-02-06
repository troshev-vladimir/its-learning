import type { Error } from '../types'

export class CustomError extends Error {
  public message: string
  public description: string

  constructor(error: Error) {
    super()
    this.message = error.message
    this.description = error.description
  }

  toUser() {
    return {
      message: this.message,
      description: this.description,
    }
  }
}
