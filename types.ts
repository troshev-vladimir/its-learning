export interface IDoc {
  name: string
  link: string
}

export interface Lesson {
  id: string
  title: string
  description?: string
  presentations?: IDoc[]
  video?: string
  estimatedDate?: string | number
  estimation: boolean
}

export interface LessonWithTest extends Lesson {
  test?: { id: string; questions: IQuestion[] }
  comletionDate?: string
  testResult?: number | string
}

export interface LessonWithTask extends Lesson {
  task: LessonTask
}

export interface LessonTask {
  docs?: IDoc[]
  description?: string
  status?: 'none' | 'taken' | 'verification'
  receptDate?: number | string
  acceptanceDate?: number | string
  uploadedFiles?: string
  result?: number | string
}
