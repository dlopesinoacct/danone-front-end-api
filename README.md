# Name 

Danonees front end api

## Description
Application developed to process requests related to master-data and VTEX apis.

## Installation
You will then install this application from the command console:

```cmd
vtex install danonees.danonees-front-end-api@x.x.x
```

## Set configuration

Depending on the needs:
- **process request to VTEX master data**
  set `Front end Api Key` and `Front end Api Token` *[Getting Started Autnetication](https://developers.vtex.com/vtex-rest-api/docs/getting-started-authentication)*
- **process request to NEKTRIA Orders**
  set `Nektria Api Key` *credentials provided by DANONE*
- **config policy access**
  In order to access the nektria api it is necessary to add the domains to the policies in the manifest file, distinguishing between two types of environment.

- **Develop environment**
```
  {
    "name": "outbound-access",
    "attrs": {
      "host": "yieldmanager.staging.nektria.net",
      "path": "*"
    }
  },
  {
    "name": "outbound-access",
    "attrs": {
      "host": "routemanager.staging.nektria.net",
      "path": "*"
    }
  },
```
- **Production environment**
```
  {
    "name": "outbound-access",
    "attrs": {
      "host": "yieldmanager.nektria.net",
      "path": "*"
    }
  },
  {
    "name": "outbound-access",
    "attrs": {
      "host": "routemanager.nektria.net",
      "path": "*"
    }
  },
```


For more settings, go to [SettingsSchema](./manifest.json) properties.
- [Documentation](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-4-configuringyourappsettings)


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


