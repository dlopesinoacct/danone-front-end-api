import type { InstanceOptions, IOContext, RequestConfig } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import { getSettings, statusToError } from '../utils'

export default class RouterNektria extends ExternalClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(`https://routemanager.staging.nektria.net/api`, ctx, {
      ...options,
      headers: {
        ...{
          Accept: 'application/json',
        },
        ...{
          'content-type': 'application/json',
        },
      },
    })
  }

  private getCredentialHeaders = async () => {
    const { nektriaApiKey } = await getSettings(this.context)

    return {
      'X-API-ID': nektriaApiKey,
    }
  }

  protected get = async (path: string, config: RequestConfig = {}) => {
    config.headers = {
      ...config.headers,
      ...(await this.getCredentialHeaders()),
    }
    config.metric = '...'

    return this.http.get(path, config).catch(statusToError)
  }

  protected post = async <T>(
    url: string,
    body?: any,
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

  protected put = async <T>(
    url: string,
    body?: any,
    config: RequestConfig = {}
  ) => {
    config.headers = {
      ...config.headers,
      ...(await this.getCredentialHeaders()),
    }

    return this.http
      .put<T>(url, body, config)
      .catch(statusToError) as Promise<T>
  }

  private get routes() {
    return {
      sendOrderNektria: (orderId: string) => `/orders/${orderId} `,
      cancelOrderNektria: (orderId: string) => `/orders/${orderId}/status `,
    }
  }

  public sendOrderNektria = (orderId: string, body: Order) => {
    return this.put(this.routes.sendOrderNektria(orderId), body)
  }

  public cancelOrderNektria = (orderId: string) => {
    return this.put(this.routes.cancelOrderNektria(orderId), {
      status: 'cancelled',
    })
  }
}
