import { IOClients } from '@vtex/api'

import ClientMD from './clientMD'
import RouterNektria from './routerNektria'
import YieldNektria from './yieldNektria'
import Danone from './danone'
import Nexica from './nexica'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get clientMD() {
    return this.getOrSet('clientMD', ClientMD)
  }

  public get danone() {
    return this.getOrSet('danone', Danone)
  }

  public get yieldNektria() {
    return this.getOrSet('yieldNektria', YieldNektria)
  }

  public get routerNektria() {
    return this.getOrSet('routerNektria', RouterNektria)
  }

  public get nexica() {
    return this.getOrSet('nexica', Nexica)
  }

}
