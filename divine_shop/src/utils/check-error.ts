import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { FailResponse, ValidationFailResponse } from 'src/Types/responses.type'

export const isFetchBaseQueryError = (err: unknown): err is FetchBaseQueryError => {
  return typeof err === 'object' && err !== null && 'status' in err
}

export const isSerializedError = (err: unknown): err is SerializedError => {
  return typeof err === 'object' && err !== null && 'message' in err
}

export const isValidationError = <T>(err: unknown): err is ValidationFailResponse<T> => {
  return isFetchBaseQueryError(err) && 'errors' in err && Object.keys(err).length === 3
}

export const isCommonError = (err: unknown): err is FailResponse => {
  return isFetchBaseQueryError(err) && Object.keys(err).length === 2
}
