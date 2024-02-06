import { EventController } from './events/controller'
import { EventServices } from './events'
import instance from './axios'
import { UserController } from './user/controller'
import { UserService } from './user'

const isDev = process.env.NODE_ENV === 'development'
console.log(process.env.NODE_ENV)

const eventService = isDev
  ? new EventServices.Mock()
  : new EventServices.Default(instance)
const userService = isDev
  ? new UserService.Mock()
  : new UserService.Default(instance)

class Api {
  constructor() {}

  event = new EventController(eventService)
  user = new UserController(userService)
}
export const api = new Api()
