import { json } from 'co-body'

import { normalizeError } from '../utils'

export async function updateCustomOrderForm(
  ctx: Context,
  next: () => Promise<any>
) {
  try {
    const {
      clients: { danone },
    } = ctx

    const { orderFormId, data, sustainable } = await json(ctx.req)

    data.sustainable = sustainable
    // peticion que actualiza la configuracion del orderForm
    await danone.updateOrderformConfig()

    const sender = { value: JSON.stringify(data) }

    /* peticion que guarda los datos en el orderform apartado customData
      si esta misma peticion se utiliza sin enviar el objeto sender
      eliminaria los datos en custom data (usar esto es caso de cancelacion de pedido) */
    ctx.body = await danone.updateNotesOrderform(orderFormId, sender)
    ctx.status = 200
    await next()
  } catch (error) {
    ctx.status = parseInt(error?.response?.status, 10) || 500
    ctx.body = normalizeError(error)
  }
}
