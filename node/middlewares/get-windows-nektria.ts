import { json } from 'co-body'

import { normalizeError } from '../utils'

export async function getWindowsNektria(
  ctx: Context,
  next: () => Promise<any>
) {
  try {
    const {
      clients: { yieldNektria },
    } = ctx

    const body = await json(ctx.req)

    ctx.status = 200
    ctx.body = await yieldNektria.getWindowsNektria(body)
    await next()
  } catch (error) {
    ctx.status = parseInt(error?.response?.status, 10) || 500
    ctx.body = normalizeError(error)
  }
}
