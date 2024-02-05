export interface IQuestion {
  id: string
  text: string
  multiple?: boolean
  required?: boolean
  answers: {
    text: string
    id: string
  }[]
}

export type TypeAnswer = string | string[]

export interface IAnswer {
  id: string // id вопроса
  answer: TypeAnswer
}
