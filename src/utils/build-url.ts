function buildUrl(
  baseUrl: string,
  path: string,
  params?: Record<string, string>
): string {
  const url = new URL(`${baseUrl}${path}`)
  if (params) {
    Object.entries(params).map(([key, value]: [string, string]) =>
      url.searchParams.append(key, value)
    )
  }
  return url.toString()
}

export default buildUrl
