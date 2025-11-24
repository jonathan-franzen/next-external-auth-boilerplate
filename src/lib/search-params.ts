import { OrderDirection } from '@/types/general.types'
import { getUsersOrderBy } from '@/validators/user/get-users.validator'

export const parsePage = (value: string | null | undefined) => {
  if (value == null) {
    return 0
  }
  const num = Number(value)

  if (Number.isNaN(num) || num <= 1) {
    return 0
  }

  return num - 1
}

export const parseOrderBy = (
  orderByValue: string | null | undefined,
  orderValue: string | null | undefined
) => {
  const validOrderBy = Object.keys(getUsersOrderBy.shape)

  if (!orderByValue || !validOrderBy.includes(orderByValue)) {
    return { orderBy: null, order: null }
  }

  const normalizedOrder =
    orderValue === OrderDirection.ASC || orderValue === OrderDirection.DESC
      ? orderValue
      : OrderDirection.ASC

  return {
    orderBy: orderByValue,
    order: normalizedOrder,
  }
}
