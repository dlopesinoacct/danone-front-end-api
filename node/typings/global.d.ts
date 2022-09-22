interface Settings {
  apiKey?: string
  apiToken?: string
  nektriaApiKey?: string
  fvecUser?: string
  fvecPassword?: string
}

interface File {
  EjercicioPedido?: string
  SeriePedido?: string
  NumeroPedido?: string
  FechaPedido?: string
  FormadePago?: string
  CodigoPostalEnvios?: string
  MunicipioEnvios?: string
  ProvinciaEnvios?: string
  NacionEnvios?: string
  DomicilioEnvios?: string
  CIF?: string
  CodigoPostal?: string
  Municipio?: string
  Provincia?: string
  Nacion?: string
  Domicilio?: string
  Telefono?: string
  Email?: string
  CodigoArticulo?: string
  DescripcionArticulo?: string
  Unidades?: string
  Precio?: string
  EjercicioPedidoAbono?: string
  SeriePedidoAbono?: string
  NumeroPedidoAbono?: string
}

interface CSVItem {
  CodigoArticulo?: string
  DescripcionArticulo?: string
  Unidades?: string
  Precio?: string
  Descuento?: string
}

interface CSV {
  EjercicioPedido?: string
  SeriePedido?: string
  NumeroPedido?: string
  FechaPedido?: string
  FormadePago?: string
  DomicilioEnvios?: string
  CodigoPostalEnvios?: string
  MunicipioEnvios?: string
  ProvinciaEnvios?: string
  NacionEnvios?: string
  CIF?: string
  Domicilio?: string
  CodigoPostal?: string
  Municipio?: string
  Provincia?: string
  Nacion?: string
  Telefono?: string
  Email?: string
  CodigoArticulo?: string
  DescripcionArticulo?: string
  Unidades?: string
  Precio?: string
  Descuento?: string
  EjercicioPedidoAbono?: string
  SeriePedidoAbono?: string
  NumeroPedidoAbono?: string
}

interface Order {
  startTime: string
  endTime: string
  weight: number
  pickingShiftId: string
  warehouseId?: string
  address: {
    addressLine1: string
    addressLine2: string
    postalCode: string
    city: string
    countryCode: string
    elevator: boolean
    latitude: number
    longitude: number
  }
}

interface TimeWindows {
  address: {
    addressLine1: string
    addressLine2: string
    postalCode: string
    city: string
    countryCode: string
    elevator: boolean
    latitude: number
    longitude: number
  }
  weight: number
  area: string
  timeRange: {
    startTime: string
    endTime: string
  }
  productLines: number
}

interface Notes {
  value: string
}

interface AuthenticatedUser {
  user: string
  userId: string
  userType: string
}

interface Client {
  address: string
  corporateDocument: string
  corporateName: string
}
