import { json } from 'co-body'

import { normalizeError } from '../utils'

export async function invoiceReturn(ctx: Context, next: () => Promise<any>) {
  try {
    // const {
    //   clients: { danone },
    // } = ctx

    const body = await json(ctx.req)

    const { codigoCliente, address, numPedido, importe, unidades } = body

    // eslint-disable-next-line no-console
    console.log(codigoCliente, address, numPedido, importe, unidades)

    ctx.body = body
    ctx.status = 200
    await next()
  } catch (error) {
    ctx.status = parseInt(error?.response?.status, 10) || 500
    ctx.body = normalizeError(error)
  }
}
