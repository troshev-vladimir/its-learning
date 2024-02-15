import { CustomError } from '~/api/Error'
import type { AbstractUserService, User } from '../types'
import type { api, Responce } from '~/api/types'

export class UserMockService implements AbstractUserService {
  constructor() {}

  getAll() {
    return new Promise<Responce<User[]>>((res, rej) => {
      setTimeout(() => {
        res({
          data: [
            {
              name: 'user-name',
              surname: 'user-surname',
              thirdname: 'user-thirdname',
              id: 'id',
              photoUrl: 'userPhotoUrl',
              age: 21,
              phone: '+79042314535',
              email: 'testtest@gmail.com',
              city: 'UserCity',
            },
            {
              name: 'user-name',
              surname: 'user-surname',
              thirdname: 'user-thirdname',
              id: 'id',
              photoUrl: 'userPhotoUrl',
              age: 21,
              phone: '+79042314535',
              city: 'UserCity',
              email: 'testtest@gmail.com',
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
        // rej(
        //   new CustomError({
        //     message: 'Не авторизован или нет доступа',
        //     description: 'asdasd',
        //     statusCode: 401,
        //   })
        // )
        res({
          data: {
            name: 'user-name',
            surname: 'user-surname',
            thirdname: 'user-thirdname',
            id: 'id',
            photoUrl: 'userPhotoUrl',
            age: 21,
            phone: '+79042314535',
            city: 'UserCity',
            email: 'testtest@gmail.com',
          },
          message: 'string',
          description: 'string',
          success: true,
        })
      }, 1000)
    })
  }

  async delete(id: string) {
    return new Promise<Responce<User>>((res) => {
      setTimeout(() => {
        res({
          data: {
            name: 'user-name',
            surname: 'user-surname',
            thirdname: 'user-thirdname',
            id: 'id',
            photoUrl: 'userPhotoUrl',
            age: 21,
            phone: '+79042314535',
            city: 'UserCity',
            email: 'testtest@gmail.com',
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
            name: 'user-name',
            surname: 'user-surname',
            thirdname: 'user-thirdname',
            id: 'id',
            photoUrl: 'userPhotoUrl',
            age: 21,
            city: 'UserCity',
            phone: '+79042314535',
            email: 'testtest@gmail.com',
          },
          message: 'string',
          success: true,
          description: 'string',
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
