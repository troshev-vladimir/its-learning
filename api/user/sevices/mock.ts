import { CustomError } from '~/api/CustomError'
import type {
  AbstractUserService,
  AuthorizeRequest,
  AuthorizeResponce,
  User,
} from '../types'
import type { Responce } from '~/api/types'

export class UserMockService implements AbstractUserService {
  constructor() {}

  getAll() {
    return new Promise<Responce<User[]>>((res, rej) => {
      setTimeout(() => {
        res({
          data: [
            {
              name: 'Виктор',
              surname: 'Андреевич',
              thirdname: 'Иванов',
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
        })
      }, 1000)
    })
  }

  async get() {
    return new Promise<Responce<User>>((res, rej) => {
      console.log('start')

      setTimeout(() => {
        // rej(new CustomError('AUTH_ERR', 402, 'Не авторизован или нет доступа'))
        res({
          // data: undefined,
          data: {
            name: 'Виктор',
            surname: 'Иванов',
            thirdname: 'Андреевич',
            id: 'id',
            photoUrl:
              'https://mindfulness.demo.zigzagpress.com/wp-content/uploads/sites/20/2010/08/team_02.jpg',
            age: 21,
            phone: '+79042314535',
            city: 'UserCity',
            email: 'testtest@gmail.com',
          },
          message: 'string',
          description: 'string',
        })

        console.log('res')
      }, 5000)
    })
  }

  async delete(id: string) {
    return new Promise<Responce<User>>((res) => {
      setTimeout(() => {
        res({
          data: {
            name: 'Виктор',
            surname: 'Иванов',
            thirdname: 'Андреевич',
            id: 'id',
            photoUrl: 'userPhotoUrl',
            age: 21,
            phone: '+79042314535',
            city: 'UserCity',
            email: 'testtest@gmail.com',
          },
          message: 'string',
          description: 'string',
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
          description: 'string',
        })
      }, 1000)
    })
  }

  async add() {
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
          description: 'string',
        })
      }, 1000)
    })
  }

  async auth(params: AuthorizeRequest) {
    return new Promise<Responce<AuthorizeResponce>>((res) => {
      setTimeout(() => {
        res({
          data: {
            id: '1',
          },
          message: 'string',
          description: 'string',
        })
      }, 1000)
    })
  }
}
