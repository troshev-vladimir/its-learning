import type { Responce } from '../types'

export interface CourcePreview {
  title: string
  progress: number
  isStarted: boolean
  startDate?: string
  diplomas?: ILink[]
  planEndDate?: string
  realEndDate?: string
  isEnded?: boolean
  docs?: ILink[]
  averageScore?: number
  shouldPay: boolean
  academ?: {
    state: boolean
    date: string
  }
  trial?: {
    state: boolean
    days: number
  }
  couchAwilableTill: string
}

export interface CourceFull extends CourcePreview {
  statistics: {
    tests: CourceStaisticItem
    video: CourceStaisticItem
    tasks: CourceStaisticItem
  }
  modules: CourceModule[]
}

type ModuleStatuses = 'active' | 'locked' | 'ended'

export interface CourceModule {
  id?: string
  title?: string
  status?: ModuleStatuses
  averageScore?: number
  lessonsPreviews: {
    count: number
    passed: number
    value: LessonPreview[]
  }
}

export interface LessonPreview {
  id?: string
  title?: string
  passed?: boolean
  edgeDate: string
}

export interface CourceLesson {
  videoLink: string
  text: string
  presentations: ILink[]
  testID: string
  taskID: string
  result: string
  legend: LegendItem[]
}

export interface LegendItem {
  date: string
  title: string
}

export interface CourceStaisticItem {
  score: number
  total: number
}

interface ILink {
  name: string
  link: string
}

export interface AbstractCourceService {
  courcePreview: (userId: string) => Promise<Responce<CourcePreview>>
  cource: (userId: string) => Promise<Responce<CourceFull>>
  lesson: (lessonId: string) => Promise<Responce<CourceLesson>>
}
