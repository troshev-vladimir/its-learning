export interface IQuestion {
  id: string
  text: string
  multiple?: boolean
  required?: boolean
  answers: QuestionAnswer[]
}

export type TypeAnswer = string | string[]
export interface QuestionAnswer {
  text: string
  id: number
}
export interface IAnswer {
  id: string // id вопроса
  answer: TypeAnswer
}
