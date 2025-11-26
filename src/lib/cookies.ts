export const getSetCookieValue = (setCookieHeader: string[], key: string) => {
  if (!setCookieHeader) {
    return
  }

  for (const cookie of setCookieHeader) {
    if (cookie.includes(key)) {
      const match = cookie.match(new RegExp(`${key}=([^;]*)`))
      if (match) {
        return match[1]
      }
    }
  }
}
