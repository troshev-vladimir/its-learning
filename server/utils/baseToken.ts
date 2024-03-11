export default function baseAuthToken() {
  const encoder = new TextEncoder()
  const charCodes = encoder.encode('Http_Service_Test:XI5su3ce')
  const authStr = String.fromCharCode(...charCodes)
  //Authorization: 'Basic ' + btoa(authStr),
  const authToken = Buffer.from(`Http_Service_Test:XI5su3ce`).toString('base64')

  return authToken
}
