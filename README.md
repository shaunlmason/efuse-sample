# @shaunlmason/efuse-sample

This repository is an example written at the behest of the [eFuse](https://efuse.gg/) team.

Please see the following:

-   [Specifications](https://github.com/shaunlmason/efuse-sample/blob/master/docs/SPECS.md)
-   [Implementation](https://github.com/shaunlmason/efuse-sample/blob/master/docs/IMPLEMENTATION.md)
-   [Prerequisite Software](#prerequisite-software)
-   [Local Development Tools](#local-development-tools)
-   [Installing NPM Modules](#installing-npm-modules)
-   [Building](#building)
-   [Cleanup](#cleanup)
-   [Running Tests](#running-tests)
-   [Serving](#serving)
-   [Future Improvements](#future-improvements)

> NOTE: All development was done on macos and I cannot say with certainty that this will work on Windows.

## Prerequisite Software

Before you can build and run this example, you must install and configure the following:

-   [Git](http://git-scm.com)
-   [Node.js](https://nodejs.org), the version is specified in the `engines` fields of [`package/json`](../package.json) which is used to
    run the web server.
-   [Yarn](https://yarnpkg.com), the version is specified in the `engines` fields of [`package/json`](../package.json) which is used to
    install dependencies.

## Local Development Tools

The following tools need to be installed locally:

-   [mongodb](https://www.mongodb.com/)
-   [redis](https://redis.io/)

NOTE: You can validate your tooling by running:

```shell
./setup.sh
```

## Installing NPM Modules

Next, install the dependencies needed to build and test the sample:

```shell
yarn install
```

## Building

To build the sample:

```shell
yarn run build
```

## Cleanup

To clean up `dist` folder:

```shell
yarn run clean
```

## Running Tests

To run the included tests:

```shell
yarn run tests
```

## Serving

To run the example locally:

```shell
yarn run serve
```

## Future Improvements

If this project turned into a production application I would implement the following:

### Code Quality

1. Make unit test granular
2. Add e2e tests
3. Add CI/CD implementation to automatically validate formatting, code coverage, tests, etc.
4. Far more robust parameter checking
5. Invest time in robust `eslint` standard configuration.

### Security

1. Additional security hardening
2. Authentication layer

### Architectural Improvements

1. Implement reusable feature flags
2. Add generic controller and service layer
3. Add far more robust parameter checking

### Deployment

1. Turn `docker` images into `kubernetes` nodes.
