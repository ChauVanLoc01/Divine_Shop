export type SuccessResponse<T> = {
  message: string
  data: T
}

export type FailResponse = {
  status_code: number
  message: string
}

export type ValidationFailResponse<T> = {
  status_code: number
  message: string
  errors: T
}
