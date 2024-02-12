import instance from './axios'
import { EventController } from './events/controller'
import { EventServices } from './events'
import { UserController, UserServices } from './user'
import { PaymentController, PaymentServices } from './paymentParams'

const isDev = process.env.NODE_ENV === 'development'

const eventService = isDev
  ? new EventServices.Mock()
  : new EventServices.Default(instance)
const userService = isDev
  ? new UserServices.Mock()
  : new UserServices.Default(instance)

const paymentServices = new PaymentServices.Default(instance)

class Api {
  constructor() {}
  event = new EventController(eventService)
  user = new UserController(userService)
  payment = new PaymentController(paymentServices)
}
export const api = new Api()
