import type { InstanceOptions, IOContext, RequestConfig } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import Client from 'ssh2-sftp-client';

import { getSettings, statusToError } from '../utils';

export default class Nexica extends ExternalClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(`https://uesnexb000.housings.nexica.net`, ctx, {
      ...options,
      headers: {
        ...{ "x-vtex-use-https": "true", },
        ...{ Accept: 'application/json', },
        ...{ 'content-type': 'application/json', },
      },
    })
  }

  private getCredentialHeaders = async () => {
    const { fvecUser, fvecPassword } = await getSettings(this.context)

    return {
      'username': fvecUser,
      'password': fvecPassword,
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

  public sendCsvFile = async (data: string, remotePath: string /*, config: RequestConfig = {}*/ ) => {
    
    // config.headers = {
    //   ...config.headers,
    //   ...(await this.getCredentialHeaders()), 
    // }

    const params = {
      host: 'uesnexb000.housings.nexica.net',
      port: 22,
      ...(await this.getCredentialHeaders()),
      debug: (msg: any) => {
        console.log(`SFTPLOG ${msg}`);
      },
    }

    console.log('[ Params ]', params);
    const sftp = new Client(' SFTP service ')

    try {
      await sftp.connect(params)
      await sftp.append(Buffer.from(data), remotePath)
      await sftp.end()
      return { status: 200, message: 'Saved' }
    } catch (error) {
      console.error(error.message)
        return error.message
    }
  }
}
