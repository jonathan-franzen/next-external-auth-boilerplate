// Response
export interface MessageResponse {
  message: string
}

export interface DataResponse<T> {
  message: string
  data: T
}

export interface PaginationResponse<T> {
  message: string
  data: T[]
  count: number
  pageSize: number
  page: number
}

export interface ErrorResponse {
  message: string
  error: string
}
