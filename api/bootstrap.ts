import { EventController } from './events/controller'
import { EventService } from './events/services/event'
import { EventMockService } from './events/services/mock'
import instance from './axios'
import UserController from './user/controller'
import { UserService } from './user/sevices/user'

const isDev = process.env.NODE_ENV === 'dev'

const eventService = isDev ? new EventMockService() : new EventService(instance)
const userService = new UserService(instance)

class api {
  constructor() {}

  event = new EventController(eventService)
  user = new UserController(userService)
}

export default new api()
