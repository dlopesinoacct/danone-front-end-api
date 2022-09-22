import { normalizeError } from '../utils'

export async function getMDPostalCode(ctx: Context, next: () => Promise<any>) {
  try {
    const {
      clients: { clientMD },
    } = ctx

    const path = ctx.request.url
    const paramsArray = path.split('?')
    const [, positionTwo] = paramsArray
    const [, value] = positionTwo.split('=')
    const [postalCode] = value.split('&')

    const endpoint = `PC/search?_where=postalCode=${postalCode}&_fields=postalCode,salesChannel`

    ctx.body = await clientMD.getDataentitiesInfo(endpoint)
    ctx.status = 200
    await next()
  } catch (error) {
    ctx.status = parseInt(error?.response?.status, 10) || 500
    ctx.body = normalizeError(error)
  }
}
