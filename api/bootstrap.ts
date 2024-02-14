import instance from './axios'
import { EventController } from './events/controller'
import { EventServices } from './events'
import { UserController, UserServices } from './user'

const isDev = process.env.NODE_ENV === 'development'

const eventService = isDev
  ? new EventServices.Mock()
  : new EventServices.Default(instance)
const userService = isDev
  ? new UserServices.Mock()
  : new UserServices.Default(instance)

class Api {
  constructor() {}
  event = new EventController(eventService)
  user = new UserController(userService)
}
export const api = new Api()
