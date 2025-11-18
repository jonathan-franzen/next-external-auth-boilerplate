import ky from 'ky'

import { BACKEND_URL } from '@/constants/environment.constants'
import { version } from '@@/package.json'

const baseHeaders = {
  'Content-Type': 'application/json',
  'x-discounts-extension-app-version': version,
  'x-discounts-client': 'discounts-extension',
}

export const api = ky.create({
  prefixUrl: BACKEND_URL,
  timeout: 6_000,
  headers: baseHeaders,
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set('x-discounts-correlation-id', crypto.randomUUID())
      },
    ],
  },
})
