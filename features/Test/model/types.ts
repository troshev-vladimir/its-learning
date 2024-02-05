export interface QuestionAnswer {
  text: string
  id: string
}

export interface IQuestion {
  id: string
  text: string
  multiple?: boolean
  required?: boolean
  answers: QuestionAnswer[]
}

export type TypeAnswer = string

export interface IAnswer {
  id: string // id вопроса
  answer: TypeAnswer | TypeAnswer[]
}
