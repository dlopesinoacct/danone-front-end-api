import { json } from 'co-body'

import { normalizeError } from '../utils'

export async function sendOrderNektria(ctx: Context, next: () => Promise<any>) {
  try {
    const {
      clients: { routerNektria },
    } = ctx

    const { nektriaOrderId, data } = await json(ctx.req)

    ctx.status = 200
    ctx.body = await routerNektria.sendOrderNektria(nektriaOrderId, data)
    await next()
  } catch (error) {
    ctx.status = parseInt(error?.response?.status, 10) || 500
    ctx.body = normalizeError(error)
  }
}
