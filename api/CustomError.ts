export class CustomError extends Error {
  public description?: string
  public error: string
  public status: number

  constructor(error: string, status: number, ...params: any) {
    super(...params)
    this.error = error
    this.status = status
    this.name = 'CustomError'
    this.message = params
  }

  toUser() {
    return {
      message: this.message,
      description: this.description,
      data: {
        auth: this.status === 401 || this.status === 403,
      },
      type: 'error',
    }
  }

  toConsole() {
    console.log(
      'Error occures with name ' + this.name + this.cause,
      'stack ' + this.stack
    )
  }
}
