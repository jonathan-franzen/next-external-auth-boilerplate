import ky from 'ky'

import { BACKEND_URL } from '@/config/env.config'
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
  throwHttpErrors: false,
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set('x-discounts-correlation-id', crypto.randomUUID())
      },
    ],
  },
})
