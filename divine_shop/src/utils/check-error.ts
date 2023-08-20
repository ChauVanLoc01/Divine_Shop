import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { FailResponse } from 'src/Types/responses.type'

export const isFetchBaseQueryError = (err: unknown): err is FetchBaseQueryError => {
  return typeof err === 'object' && err !== null && 'status' in err
}

export const isSerializedError = (err: unknown): err is SerializedError => {
  return typeof err === 'object' && err !== null && 'message' in err
}

export const isValidationError = (err: unknown): err is FetchBaseQueryError => {
  return isFetchBaseQueryError(err) && 'errors' in (err.data as Object) && Object.keys(err.data as Object).length === 3
}

export const isCommonError = (err: unknown): err is FailResponse => {
  return isFetchBaseQueryError(err) && Object.keys(err.data as Object).length === 2
}
