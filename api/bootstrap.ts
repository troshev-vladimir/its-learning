import instance from './axios'
import { EventController } from './events/controller'
import { EventServices } from './events'
import { UserController, UserServices } from './user'
import { CourceController, CourceServices } from './cource'
import { TestController, TestServices } from './test'

const isDev = process.env.NODE_ENV === 'development'

const eventService = isDev
  ? new EventServices.Mock()
  : new EventServices.Default(instance)
const userService = isDev
  ? new UserServices.Mock()
  : new UserServices.Default(instance)
const courceService = isDev
  ? new CourceServices.Mock()
  : new CourceServices.Default(instance)
const testService = isDev
  ? new TestServices.Mock()
  : new TestServices.Default(instance)

class Api {
  constructor() {}
  event = new EventController(eventService)
  user = new UserController(userService)
  cource = new CourceController(courceService)
  test = new TestController(testService)
}

export const api = new Api()
