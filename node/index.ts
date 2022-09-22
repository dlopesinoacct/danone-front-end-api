import type { ClientsConfig, ServiceContext, RecorderState } from '@vtex/api'
import { LRUCache, method, Service } from '@vtex/api'

import { Clients } from './clients'
import { getMDPostalCode } from './middlewares/get-postal-code'
import { getWindowsNektria } from './middlewares/get-windows-nektria'
import { sendOrderNektria } from './middlewares/send-order-nektria'
import { cancelOrderNektria } from './middlewares/cancel-order-nektria'
import { updateCustomOrderForm } from './middlewares/update-custom-order-form'
import { getMDClientData } from './middlewares/get-client-data'
import { updateMDClientData } from './middlewares/update-client-data'
import { invoiceOrder } from './middlewares/invoice-order'
import { invoiceReturn } from './middlewares/invoice-return'

const TIMEOUT_MS = 800

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    // This key will be merged with the default options and add this cache to our Status client.
    status: {
      memoryCache,
    },
  },
}

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients, State>

  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  interface State extends RecorderState {
    authenticatedUser: AuthenticatedUser | undefined
    id: string
    queryString: string
  }
}

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  routes: {
    getMDPostalCode: method({
      GET: [getMDPostalCode],
    }),
    getWindowsNektria: method({
      POST: [getWindowsNektria],
    }),
    sendOrderNektria: method({
      POST: [sendOrderNektria],
    }),
    cancelOrderNektria: method({
      GET: [cancelOrderNektria],
    }),
    updateCustomOrderForm: method({
      POST: [updateCustomOrderForm],
    }),
    getMDClientData: method({
      GET: [getMDClientData],
    }),
    updateMDClientData: method({
      POST: [updateMDClientData],
    }),
    invoiceOrder: method({
      POST: [invoiceOrder],
    }),
    invoiceReturn: method({
      POST: [invoiceReturn],
    }),
  },
})
