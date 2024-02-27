import type { Responce } from '~/api/types'
import type {
  AbstractCourceService,
  CourceDetail,
  CourceFull,
  CourceLesson,
  CourcePreview,
} from '../types'

export class CourceMockService implements AbstractCourceService {
  async courcePreview() {
    return new Promise<Responce<CourcePreview>>((res, rej) => {
      setTimeout(() => {
        res({
          data: {
            title: 'title',
            academ: {
              state: true,
              date: '01.02.1999',
            },
            trial: {
              state: true,
              days: 20,
            },
            couchAwilableTill: '01.02.1999',
            averageScore: 23,
            isStarted: true,
            startDate: '01.02.1999',
            isEnded: true,
            planEndDate: '01.02.1999',
            realEndDate: '01.02.1999',
            progress: 20,
            docs: [
              {
                name: 'link',
                link: 'asdasd',
              },
              {
                name: 'link2',
                link: 'asdasd',
              },
            ],
            diplomas: [
              {
                name: 'link2',
                link: 'http://asdasd/asd',
              },
              {
                name: 'link',
                link: 'asdasd',
              },
            ],
            shouldPay: true,
          },
          message: '',
          description: '',
        })
      }, 2000)
    })
  }

  async cource() {
    return new Promise<Responce<CourceFull>>((res, rej) => {
      setTimeout(() => {
        res({
          data: {
            title: 'title',
            academ: {
              state: true,
              date: '01.02.1999',
            },
            trial: {
              state: true,
              days: 20,
            },
            progress: 20,
            averageScore: 23,
            isStarted: true,
            startDate: '01.02.1999',
            isEnded: false,
            planEndDate: '01.02.1999',
            couchAwilableTill: '01.02.1999',
            realEndDate: '01.02.1999',
            docs: [
              {
                name: 'link',
                link: 'asdasd',
              },
              {
                name: 'link2',
                link: 'asdasd',
              },
            ],
            diplomas: [
              {
                name: 'link2',
                link: 'asdasd',
              },
              {
                name: 'link',
                link: 'asdasd',
              },
            ],
            shouldPay: true,
            statistics: {
              tests: {
                score: 2,
                total: 3,
              },
              video: {
                score: 2,
                total: 3,
              },
              tasks: {
                score: 3,
                total: 3,
              },
            },
            modules: [
              {
                id: '2',
                title: 'string2',
                status: 'ended',
                averageScore: 123,
                lessonsPreviews: {
                  count: 2,
                  passed: 1,
                  value: [
                    {
                      id: '1',
                      title: 'title',
                      result: '4,2',
                      status: 'result',
                      type: 'task',
                      edgeDate: '01.02.1999',
                    },

                    {
                      id: '2',
                      title: 'title2',
                      result: 'Зачёт',
                      status: 'result',
                      type: 'test',
                      edgeDate: '01.02.1999',
                    },

                    {
                      id: '5',
                      title: 'title3',
                      result: '',
                      status: 'studying',
                      type: 'test',
                      edgeDate: '01.02.1999',
                    },
                  ],
                },
              },
              {
                id: '5',
                title: 'string2',
                status: 'ended',
                averageScore: 123,
                lessonsPreviews: {
                  count: 2,
                  passed: 1,
                  value: [
                    {
                      id: '1',
                      title: 'title',
                      result: '4,2',
                      status: 'result',
                      type: 'task',
                      edgeDate: '01.02.1999',
                    },

                    {
                      id: '2',
                      title: 'title2',
                      result: 'Зачёт',
                      status: 'result',
                      type: 'test',
                      edgeDate: '01.02.1999',
                    },

                    {
                      id: '5',
                      title: 'title3',
                      result: '',
                      status: 'studying',
                      type: 'test',
                      edgeDate: '01.02.1999',
                    },
                  ],
                },
              },
              {
                id: '2',
                title: 'string',
                status: 'active',
                averageScore: 123,
                lessonsPreviews: {
                  count: 2,
                  passed: 1,
                  value: [
                    {
                      id: '1',
                      title: 'title',
                      result: '4,2',
                      status: 'result',
                      type: 'task',
                      edgeDate: '01.02.1999',
                    },

                    {
                      id: '2',
                      title: 'title2',
                      result: 'Зачёт',
                      status: 'result',
                      type: 'test',
                      edgeDate: '01.02.1999',
                    },

                    {
                      id: '5',
                      title: 'title3',
                      result: '',
                      status: 'studying',
                      type: 'test',
                      edgeDate: '01.02.1999',
                    },
                  ],
                },
              },

              {
                id: '1',
                title: 'string3',
                status: 'locked',
                averageScore: 123,
                lessonsPreviews: {
                  count: 2,
                  passed: 1,
                  value: [
                    {
                      id: '1',
                      title: 'title',
                      result: '4,2',
                      status: 'result',
                      type: 'task',
                      edgeDate: '01.02.1999',
                    },

                    {
                      id: '2',
                      title: 'title2',
                      result: 'Зачёт',
                      status: 'result',
                      type: 'test',
                      edgeDate: '01.02.1999',
                    },

                    {
                      id: '5',
                      title: 'title3',
                      result: '',
                      status: 'studying',
                      type: 'test',
                      edgeDate: '01.02.1999',
                    },
                  ],
                },
              },
            ],
          },
          message: '',
          description: '',
        })
      }, 2000)
    })
  }

  async lesson(id: string) {
    if (id === '1') {
      return new Promise<Responce<CourceLesson>>((res, rej) => {
        setTimeout(() => {
          res({
            data: {
              id: '1',
              videoLink:
                'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              text: 'string',
              type: 'task',
              status: 'result',
              presentations: [
                {
                  name: 'link',
                  link: 'asdasd',
                },
                {
                  name: 'link',
                  link: 'asdasd',
                },
              ],
              testID: 'string',
              taskID: 'string',
              result: 'Красава!!!',
              legend: [
                { date: 'string', title: 'string' },
                { date: 'string', title: 'string' },
                { date: 'string', title: 'string' },
              ],
            },
            message: '',
            description: '',
          })
        }, 2000)
      })
    } else {
      return new Promise<Responce<CourceLesson>>((res, rej) => {
        setTimeout(() => {
          res({
            data: {
              id: '2',
              type: 'task',
              text: 'string',
              status: 'exam',
              presentations: [
                {
                  name: 'link',
                  link: 'asdasd',
                },
                {
                  name: 'link',
                  link: 'asdasd',
                },
              ],
              testID: 'string',
              taskID: 'string',
              result: 'string',
              legend: [{ date: 'string', title: 'string' }],
            },
            message: '',
            description: '',
          })
        }, 2000)
      })
    }
  }

  async detail() {
    return new Promise<Responce<CourceDetail>>((res, rej) => {
      setTimeout(() => {
        res({
          data: {
            title: 'title',
            content: `<p>
            В нашей программе только нужная теория и никакой воды. Объем
            практических заданий увеличен в 5 раз. Все они основаны на реальных
            коммерческих проектах IT-компании с 12-летним опытом в разработке и
            внедрении 1С. В нашей программе только нужная теория и никакой воды.
            Объем практических заданий увеличен в 5 раз. Все они основаны на
            реальных коммерческих проектах IT-компании с 12-летним опытом в
            разработке и внедрении 1С. В нашей программе только нужная теория и
            никакой воды. Объем практических заданий увеличен в 5 раз. Все они
            основаны на реальных коммерческих проектах IT-компании с 12-летним
            опытом в разработке и внедрении 1С.
          </p>
  
          <h3>Введение</h3>
  
          <p>Система 1С:Предприятие:</p>
  
          <ul>
            <li>Знакомство с основными понятиями.</li>
            <li>Обзор системы.</li>
            <li>Изучение документов и журналов программы.</li>
          </ul>`,
          },
          message: '',
          description: '',
        })
      }, 2000)
    })
  }
}
