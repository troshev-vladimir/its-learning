import { CustomError } from './Error'

export function ErrorHandler(error: CustomError | Error) {
  console.log(error)

  if (error) {
    throw error
  } else {
    throw new CustomError({
      message: 'Что то пошло не так',
      description: 'На фронте',
      statusCode: 404,
    })
  }
}
