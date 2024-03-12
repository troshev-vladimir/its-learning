import type { Responce } from '~/api/types'
import type { AbstractTestService, Test, TestResult } from '../types'

export class TestMockService implements AbstractTestService {
  async test() {
    return new Promise<Responce<Test>>((res, rej) => {
      setTimeout(() => {
        res({
          data: {
            id: '1',
            timeToEnd: 123123123,
            status: 'clear',
            results: {
              passed: false,
              details: [
                {
                  name: 'за храбрость',
                  satisfyes: true,
                  value: 20,
                },
                {
                  name: 'за мозг',
                  satisfyes: false,
                  value: 10,
                },
              ],
            },

            questions: [
              {
                text: 'Лишь стремящиеся вытеснить традиционное производство, нанотехнологии являются только методом политического участия и ассоциативно распределены по отраслям. В частности, начало повседневной работы по формированию позиции является качественно новой ступенью первоочередных требований. Не следует, однако, забывать, что новая модель организационной деятельности создаёт предпосылки для благоприятных перспектив. Господа, постоянное информационно-пропагандистское обеспечение нашей деятельности создаёт предпосылки для экономической целесообразности принимаемых решений.',
                image:
                  'https://on-desktop.com/wps/2018Animals___Cats_Large_gray_cat_with_a_surprised_look_123712_.jpg',
                id: 'id111',
                required: true,
                variants: [
                  {
                    text: 'Противоположная точка зрения подразумевает, что ключевые особенности структуры проекта лишь добавляют фракционных разногласий и разоблачены.',
                    id: '1',
                  },
                  {
                    text: 'А также представители современных социальных резервов лишь добавляют фракционных разногласий и объективно рассмотрены соответствующими инстанциями.',
                    id: '2',
                  },
                  {
                    text: 'Как уже неоднократно упомянуто, элементы политического процесса освещают чрезвычайно интересные особенности картины в целом, однако конкретные выводы, разумеется, указаны как претенденты на роль ключевых факторов.',
                    id: '3',
                  },
                  {
                    text: 'Есть над чем задуматься: базовые сценарии поведения пользователей набирают популярность среди определенных слоев населения, а значит, должны быть представлены в исключительно положительном свете.',
                    id: '4',
                  },
                ],
              },
              {
                text: 'Второй вопрос?',
                id: 'id222',
                multiple: true,
                required: true,
                variants: [
                  { text: 'Первый ответ', id: '1' },
                  { text: 'Второй ответ', id: '2' },
                  { text: 'Третий ответ', id: '3' },
                  { text: 'Четвертый ответ', id: '4' },
                ],
              },
              {
                text: 'Третий вопрос?',
                id: 'id333',
                multiple: true,
                required: true,
                variants: [
                  { text: 'Первый ответ', id: '1' },
                  { text: 'Второй ответ', id: '2' },
                  { text: 'Третий ответ', id: '3' },
                  { text: 'Четвертый ответ', id: '4' },
                ],
              },
            ],
          },
          message: '',
          description: '',
        })
      }, 2000)
    })
  }

  async answers() {
    return new Promise<Responce<TestResult>>((res, rej) => {
      setTimeout(() => {
        res({
          data: {
            details: [
              {
                name: 'за храбрость',
                satisfyes: true,
                value: 20,
              },
              {
                name: 'за мозг',
                satisfyes: false,
                value: 10,
              },
            ],
            passed: true,
          },

          message: '',
          description: '',
        })
      }, 2000)
    })
  }
}
