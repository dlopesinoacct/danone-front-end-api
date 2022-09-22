/* eslint-disable no-console */
import { json } from 'co-body'

import { csvGenerator, NEXICA_TYPE, normalizeError } from '../utils'

export async function invoiceOrder(ctx: Context, next: () => Promise<any>) {
  try {
    const {
      clients: { nexica },
    } = ctx

    const { data, type } = await json(ctx.req)

    const isValid = Object.values(NEXICA_TYPE).some((value) => value === type)

    if (isValid) {
      const csvGenerado = csvGenerator(data)
      // console.log('[ csvGenerado ]', csvGenerado)

      const remotePath = `${type}-${data.NumeroPedido}`

      const result = await nexica.sendCsvFile( csvGenerado, remotePath );
      console.log('[ sendCsvFile result ]', result);

      ctx.body = csvGenerado
      ctx.status = 200
    } else {
      console.log('[ petición incorrecta ]')
      ctx.body = { message: 'Invalid url' }
      ctx.status = 404
    }

    await next()
  } catch (error) {
    ctx.status = parseInt(error?.response?.status, 10) || 500
    ctx.body = normalizeError(error)
  }
}
