// export default function handleError(error: any): never {
//   if (!error.response) {
//     throw new HttpError(error.message)
//   } else if (error.response.status === 401) {
//     throw new Unauthorized(error.response.data)
//   } else if (error.response.status === 403) {
//     throw new Forbidden(error.response.data)
//   } else {
//     throw error
//   }
// }
