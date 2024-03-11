import type { Event } from './../types'
import type { Responce } from '~/api/types'

export class EventMockService {
  constructor() {}

  async getAll(): Promise<Responce<Event[]>> {
    return new Promise((res) => {
      setTimeout(() => {
        res({
          data: [
            {
              title: 'Вебинар',
              date: '03-05-2024 8:00',
              description:
                'Не следует, однако, забывать, что высокотехнологичная концепция общественного уклада требует анализа кластеризации усилий. Таким образом, высокотехнологичная концепция общественного уклада напрямую зависит от соответствующих условий активизации.',
              external: false,
              link: 'https://demopage.edgevideo.ru/streams/79470_201693',
            },
            {
              title: 'Созвон с наставником',
              date: '03-26-2024 18:00',
              external: true,
              description:
                'Предварительные выводы неутешительны: синтетическое тестирование предполагает независимые способы реализации.',
            },
          ],
          message: '',
          description: '',
        })
      }, 2000)
    })
  }
}
