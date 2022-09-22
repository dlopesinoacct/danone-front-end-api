import { normalizeError } from '../utils'

export async function cancelOrderNektria(
  ctx: Context,
  next: () => Promise<any>
) {
  try {
    const {
      clients: { routerNektria },
    } = ctx

    const path = ctx.request.url
    const paramsArray = path.split('?')
    const [, positionTwo] = paramsArray
    const [, nektriaOrderId] = positionTwo.split('=')

    ctx.status = 200
    ctx.body = await routerNektria.cancelOrderNektria(nektriaOrderId)
    await next()
  } catch (error) {
    ctx.status = parseInt(error?.response?.status, 10) || 500
    ctx.body = normalizeError(error)
  }
}
