/* eslint-disable no-console */
import { normalizeError } from '../utils'

export async function getMDClientData(ctx: Context, next: () => Promise<any>) {
  try {
    const {
      clients: { clientMD },
    } = ctx

    const path = ctx.request.url
    const paramsArray = path.split('?')
    const [, positionTwo] = paramsArray
    const [, value] = positionTwo.split('=')
    const [email] = value.split('&')
    const endpoint = `CL/search?_where=email=${email}&_fields=address,corporateDocument,corporateName,email`

    ctx.body = await clientMD.getDataentitiesInfo(endpoint)
    ctx.status = 200
    await next()
  } catch (error) {
    ctx.status = parseInt(error?.response?.status, 10) || 500
    ctx.body = normalizeError(error)
  }
}
