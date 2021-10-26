# PoCz Project API

[![Production Build](https://github.com/gugazimmermann/pocz-projects-api/actions/workflows/main.yml/badge.svg)](https://github.com/gugazimmermann/pocz-projects-api/actions/workflows/main.yml)

<https://api.iustitia.io>

## Tech

Created using Serverless / Node / Sequelize / PostgreSQL

## Sctructure

- Base API - need to run first to create API Gateway and configure domain
  - Auth API - need to run before other modules to create the API Gateway Verify Auth Token lambda
  - Subscriptions API

# Tests

  `yarn test` - will start a docker container, populate the test database and then run all the tests.

  ![Tests Coverage](./readme-imgs/tests.png)
  