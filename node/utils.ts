import {
  AuthenticationError,
  ForbiddenError,
  UserInputError,
  Apps,
} from '@vtex/api'
import type { IOContext } from '@vtex/api'
import type { AxiosError } from 'axios'
import { pathOr } from 'ramda'
import { parse } from 'json2csv'

declare let process: {
  env: {
    VTEX_APP_ID: string
  }
}

export const getSettings = async (ctx: IOContext): Promise<Settings> =>
  new Apps(ctx).getAppSettings(process.env.VTEX_APP_ID)

export const statusToError = (e: AxiosError) => {
  if (!e.response) {
    throw e
  }

  const {
    response: { status },
  } = e

  switch (status) {
    case 401: {
      throw new AuthenticationError(e)
    }

    case 403: {
      throw new ForbiddenError(e)
    }

    case 400: {
      throw new UserInputError(e)
    }

    default:
      throw e
  }
}

export const normalizeError = (error: any) => {
  if (error.response) {
    return {
      error: pathOr(
        'An unexpected error occurred',
        ['response', 'data'],
        error
      ),
      message: error.toString(),
      status: pathOr(200, ['response', 'status'], error),
    }
  }

  return {
    error: error.message,
    status: 500,
  }
}

export const paymentConfiguration = {
  paymentConfiguration: {
    requiresAuthenticationForPreAuthorizedPaymentOption: false,
    allowInstallmentsMerge: null,
    blockPaymentSession: null,
    paymentSystemToCheckFirstInstallment: null,
    defaultPaymentSystemToApplyOnUserOrderForm: null,
  },
  taxConfiguration: null,
  minimumQuantityAccumulatedForItems: 1,
  decimalDigitsPrecision: 2,
  minimumValueAccumulated: 0,
  apps: [
    {
      fields: ['notes'],
      id: 'nektriaFields',
      major: 1,
    },
  ],
  allowMultipleDeliveries: true,
  allowManualPrice: false,
  savePersonalDataAsOptIn: false,
  maxNumberOfWhiteLabelSellers: null,
  maskFirstPurchaseData: null,
  recaptchaValidation: 'never',
  maskStateOnAddress: true,
}

export const csvGenerator = (data: any) => {
  const itemFields = [
    'CodigoArticulo',
    'DescripcionArticulo',
    'Unidades',
    'Precio',
    'Descuento',
  ]

  const fields = [
    ...Object.keys(data).filter((field) => field !== 'itemsData'),
    ...itemFields,
  ]

  const { itemsData } = data

  delete data.itemsData

  const dataValues = Object.values(data)
  const dataKeys = Object.keys(data)

  const csvArray: CSV[] = itemsData.map((item: CSVItem) => {
    const csv: CSV = {}

    for (let j = 0; j < dataKeys.length; j++) {
      Object.defineProperty(csv, dataKeys[j], {
        value: dataValues[j],
      })
    }

    csv.CodigoArticulo = item?.CodigoArticulo
    csv.DescripcionArticulo = item?.DescripcionArticulo?.replace(/[',]+/g, '.')
    csv.Unidades = item?.Unidades
    csv.Precio = item?.Precio
    csv.Descuento = item?.Descuento

    return csv
  })

  const options = { fields }
  const csvFile = parse(csvArray, options)

  return csvFile.replace(/['"]+/g, '').replace(/[',]+/g, ';')
}

export const NEXICA_TYPE = {
  ORDER: 'order',
  RETURN: 'return',
}
