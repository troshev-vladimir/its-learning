import type { AbstractUserService, User } from '../types'
import type { api, Error, Responce } from '~/api/types'

export class UserMockService implements AbstractUserService {
  constructor() {}

  getAll() {
    return new Promise<Responce<User[]>>((res, rej) => {
      setTimeout(() => {
        res({
          data: [
            {
              name: 'string',
              id: 'string',
              photoUrl: 'string',
              age: 21,
            },
            {
              name: 'string',
              id: 'string',
              photoUrl: 'string',
              age: 21,
            },
          ],
          message: 'string',
          description: 'string',
          success: true,
        })
      }, 1000)
    })
  }

  async get() {
    return new Promise<Responce<User>>((res, rej) => {
      setTimeout(() => {
        rej({
          message: 'error from server',
          description: 'Проблема на беке',
          statusCode: 400,
        })
        // res({
        //   data: {
        //     name: 'string',
        //     id: 'string',
        //     photoUrl: 'string',
        //     age: 21,
        //   },
        //   message: 'string',
        //   description: 'string',
        //   success: true,
        // })
      }, 1000)
    })
  }

  async delete(id: string) {
    return new Promise<Responce<User>>((res) => {
      setTimeout(() => {
        res({
          data: {
            name: 'string',
            id: 'string',
            photoUrl: 'string',
            age: 21,
          },
          message: 'string',
          description: 'string',
          success: true,
        })
      }, 1000)
    })
  }

  async update() {
    return new Promise<Responce<User>>((res) => {
      setTimeout(() => {
        res({
          data: {
            name: 'string',
            id: 'string',
            photoUrl: 'string',
            age: 21,
          },
          message: 'string',
          description: 'string',
          success: true,
        })
      }, 1000)
    })
  }

  async add() {
    return new Promise<Responce<User['id']>>((res) => {
      setTimeout(() => {
        res({
          data: '1',
          message: 'string',
          description: 'string',
          success: true,
        })
      }, 1000)
    })
  }
}
