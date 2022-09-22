import { json } from 'co-body'

import { normalizeError } from '../utils'

export async function updateMDClientData(
  ctx: Context,
  next: () => Promise<any>
) {
  try {
    const {
      clients: { clientMD },
    } = ctx

    const body = await json(ctx.req)
    const { email, address, corporateDocument, corporateName } = body
    const endpoint = `CL/search?_where=email=${email}&_fields=id,email`
    const client = await clientMD.getDataentitiesInfo(endpoint)
    const updatePath = `CL/documents/${client[0].id}`

    ctx.body = await clientMD.patchDataentities(updatePath, {
      address,
      corporateDocument,
      corporateName,
    })

    ctx.status = 200
    await next()
  } catch (error) {
    ctx.status = parseInt(error?.response?.status, 10) || 500
    ctx.body = normalizeError(error)
  }
}
