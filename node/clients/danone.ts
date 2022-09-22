import type { InstanceOptions, IOContext, RequestConfig } from '@vtex/api'
import { JanusClient } from '@vtex/api'

import { getSettings, paymentConfiguration, statusToError } from '../utils'

export default class Danone extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
        Accept: 'application/vnd.vtex.ds.v10+json',
        'content-type': 'application/json',
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

  public get = async (path: string, config: RequestConfig = {}) => {
    config.headers = {
      ...config.headers,
      ...(await this.getCredentialHeaders()),
    }
    config.metric = '...'

    return this.http.get(path, config).catch(statusToError)
  }

  private get routes() {
    const endpointCheckout = '/api/checkout'

    return {
      updateOrderformConfiguration: () =>
        `${endpointCheckout}/pvt/configuration/orderForm`,
      updateNotesOrderform: (orderFormId: string) =>
        `${endpointCheckout}/pub/orderForm/${orderFormId}/customData/nektriaFields/notes`,
    }
  }

  public updateOrderformConfig = () => {
    return this.post(
      this.routes.updateOrderformConfiguration(),
      paymentConfiguration
    )
  }

  public updateNotesOrderform = (orderFormId: string, body: Notes) => {
    return this.put(this.routes.updateNotesOrderform(orderFormId), body)
  }
}
