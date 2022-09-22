# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.4] - 2022-09-20
### Added

- middleware `./node/middlewares/get-client-data.ts` to retrieve customer data through the '/masterdata/client/getdata' endpoint

- middleware `./node/middlewares/update-client-data.ts` to store customer billing data through the '/masterdata/client/updatedata' endpoint


## [0.0.3] - 2022-09-09
## Added

- Add status 200 when the request is correct

## [0.0.2] - 2022-08-30
### Added
- `./node/clients/clientMD.ts` to master data access
- `./node/clients/danone.ts` to vtex api access
- `./node/clients/yieldNektria.ts` and `./node/clients/routerNektria.ts` to api nektria access
- middleware `./node/middlewares/get-postal-code.ts` to check if a postal code is stored and return your commercial policy
- middleware `./node/middlewares/get-windows-nektria.ts` to retrieve windows date list 
- middleware `./node/middlewares/send-order-nektria.ts` to create/update windows date 
- middleware `./node/middlewares/update-custom-order-form.ts` to update customData in the orderform
- middleware `./node/middlewares/cancel-order-nektria.ts` to calcel orders in the nektria api
- utils to getSettings
- manifest policies and settings to set apiKey and apiToken
- husky and commitlint configuration

### Changed
- Setup current linter and prettier presets.
- [README](/README.md) Information

## [0.2.0] - 2020-10-29
### Changed 
- Update documentation to include Route Params.

## [0.1.1] - 2020-06-26
### Changed
- Adding Github Actions and using vtex/typescript settings.

## [0.1.0] - 2020-06-08
### Changed
- Update to node builder `6.x`

## [0.0.7] - 2020-03-24

## [0.0.6] - 2020-01-11
- Improving the documentation and adding more examples on the handlers.

## [0.0.5] - 2019-11-18

## [0.0.4] - 2019-09-18

## [0.0.3] - 2019-04-26

## [0.0.2] - 2019-04-26

### Changed
- Using new IOClient

## [0.0.1] - 2019-03-29

### Added
- Initial example
