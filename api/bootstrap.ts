import { EventController } from './events/controller'
import { EventServices } from './events'
import instance from './axios'
import { UserController } from './user/controller'
import { UserService } from './user'

const isDev = process.env.NODE_ENV === 'dev'

const eventService = isDev
  ? new EventServices.Mock()
  : new EventServices.Default(instance)
const userService = new UserService.Default(instance)

class api {
  constructor() {}

  event = new EventController(eventService)
  user = new UserController(userService)
}

export default new api()
