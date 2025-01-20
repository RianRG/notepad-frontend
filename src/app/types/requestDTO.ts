export interface RegisterStudentDTO{
  username: string,
  email: string,
  password: string
}

export interface RegisterNoteDTO{
  title: string,
  content: string,
  isPrivate: boolean
}

export interface LoginStudentDTO{
  email: string,
  password: string
}