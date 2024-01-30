export interface IQuestion {
  id?: number
  text?: string
  multiple?: boolean
  required?: boolean
  answers?: {
    text?: string
    id?: number
  }[]
}

export type TypeAnswer = string | string[] | number | number[]

export interface IAnswer {
  id: number // id вопроса
  answer: TypeAnswer
}
