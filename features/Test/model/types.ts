interface QuestionAnswer {
  text?: string
  id?: number
}

export interface IQuestion {
  id: number | string
  text?: string
  multiple?: boolean
  required?: boolean
  answers?: QuestionAnswer[]
}

export type TypeAnswer = string | number | boolean

export interface IAnswer {
  id: number // id вопроса
  answer: TypeAnswer | TypeAnswer[]
}
