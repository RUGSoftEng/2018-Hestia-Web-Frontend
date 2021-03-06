# hestia-frontend

> The frontend for the hestia web server.

The frontend is built using the [vue framework](http://vuejs.org). For the project management we are using [yarn](http://yarnpkg.com).

## Setting up yarn

Before using yarn you first need to setup node and npm. Install node and npm [here](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

Now install yarn (**make sure to run this as admin**)
```bash
npm install --global yarn
```

## Build Setup
`cd` to the frontend directory. Then you can run the build command you want.

## Quick Start

```bash
# you only have to install once unless you change dependencies
npm install
```
Select all automatic installation options.
```bash
# serve with hot reload at localhost:8080
yarn start
```

### Additional build commands
```bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn start

# run all tests (right now it is configured to only run the unit tests)
yarn test

# run only unit tests
yarn unit

# run only e2e tests
yarn e2e

# build for production with minification
yarn build

# build for production and view the bundle analyzer report
npm run build --report
```

## Development tools for vue
Checkout [the vue browser dev tools](https://github.com/vuejs/vue-devtools)
