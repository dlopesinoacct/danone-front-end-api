import type { InstanceOptions, IOContext, RequestConfig } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import { getSettings, statusToError } from '../utils'

export default class ClientMD extends ExternalClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(`http://${ctx.account}.vtexcommercestable.com.br`, ctx, {
      ...options,
      headers: {
        ...{
          Accept: 'application/json',
        },
        ...{
          'content-type': 'application/json',
        },
        ...{
          Host: `${ctx.account}.vtexcommercestable.com.br`,
        },
        ...{
          'Proxy-Authorization': ctx.authToken,
        },
      },
    })
  }

  private getCredentialHeaders = async () => {
    const { apiKey, apiToken } = await getSettings(this.context)

    return {
      'X-VTEX-API-AppKey': apiKey,
      'X-VTEX-API-AppToken': apiToken,
    }
  }

  public get = async (path: string, config: RequestConfig = {}) => {
    config.headers = {
      ...config.headers,
      ...(await this.getCredentialHeaders()),
    }
    config.metric = '...'

    return this.http.get(path, config).catch(statusToError)
  }

  protected patch = async <T>(
    url: string,
    body?: any,
    config: RequestConfig = {}
  ) => {
    config.headers = {
      ...config.headers,
      ...(await this.getCredentialHeaders()),
    }

    return this.http
      .patch<T>(url, body, config)
      .catch(statusToError) as Promise<T>
  }

  private get routes() {
    const endpointBase = '/api/dataentities'

    return {
      dataentitiesPath: (path: string) => `${endpointBase}/${path}`,
    }
  }

  public getDataentitiesInfo = (path: string) => {
    return this.get(this.routes.dataentitiesPath(path))
  }

  public patchDataentities = (path: string, body: Client) => {
    return this.patch(this.routes.dataentitiesPath(path), body)
  }
}
