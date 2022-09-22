import type { InstanceOptions, IOContext, RequestConfig } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import { getSettings, statusToError } from '../utils'

export default class YieldNektria extends ExternalClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(`https://yieldmanager.staging.nektria.net/api/v1`, ctx, {
      ...options,
      headers: {
        ...{ Accept: 'application/json' },
        ...{ 'Content-Type': 'application/json' },
      },
    })
  }

  private getCredentialHeaders = async () => {
    const { nektriaApiKey, apiKey, apiToken } = await getSettings(this.context)

    return {
      'X-API-ID': nektriaApiKey,
      'X-VTEX-API-AppKey': apiKey,
      'X-VTEX-API-AppToken': apiToken,
    }
  }

  private get routes() {
    return {
      getWindowsNektria: () => `/time-windows/generate`,
    }
  }

  protected post = async <T>(
    url: string,
    body?: TimeWindows,
    config: RequestConfig = {}
  ) => {
    config.headers = {
      ...config.headers,
      ...(await this.getCredentialHeaders()),
    }

    return this.http
      .post<T>(url, body, config)
      .catch(statusToError) as Promise<T>
  }

  public getWindowsNektria = (body?: TimeWindows) => {
    return this.post(this.routes.getWindowsNektria(), body)
  }
}
