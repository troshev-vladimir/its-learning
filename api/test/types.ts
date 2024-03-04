import type { Responce } from '../types'

export type TargetTestStatus = 'clear' | 'in_process' | 'waiting' | 'result'

export interface Question {
  id: string
  text: string
  image?: string
  multiple?: boolean
  required?: boolean
  variants: Variant[]
}
export interface Variant {
  text: string
  id: string
}

export type Answers = Record<Test['id'], Variant['id']>

export interface ResultDetail {
  name: string
  value: number
  satisfyes: boolean
}

export interface TestResult {
  details: ResultDetail[]
  passed: boolean
}

export interface Test {
  id: string
  timeToEnd?: string | number
  status: TargetTestStatus
  results: TestResult
  questions: Question[]
}

export interface AbstractTestService {
  test: (courceId: string) => Promise<Responce<Test>>
  answers: (courceId: string, answers: Answers) => Promise<Responce<TestResult>>
}
