
# Overview on this part

This part talks about common backend application structure and how to test the backend app. And the later sections introduces how to add user administration to your app and how to authenticate user with token.

# What you can do after it

- You should be able to start a project with well-defined structure
- You know how to test your backend app by validate its functions and requesting api
  - Test function using `jest`
  - Test API using `supertest` in a async style with proper initialization and post-processing
- You know how to add basic user administration with username, password, and token
- You understand middleware goal and know when to add one during development



# Notes

## Project structure

```
├── index.js
├── app.js
├── build
│   └── ...
├── controllers
│   └── ...
├── models
│   └── ...
|── tests
│   └── ...
├── package-lock.json
├── package.json
├── utils
│   ├── ... 
```

Explanations
- The index.js is the entrypoint and load app from app.js
- The app.js setup database, middleware, and routers
- Route handlers are moved into /controllers
- In models/, we define  the data model
- In utils/, logger and middlewares are saved there
- In tests/, you put all kinds of test script here

Inside router folder, you can define routers for different purposes
```js
const router = require('express').Router()
```

## Testing your backend application

### Library Setup

If you want to use `.env` file configs , install [dotenv](https://www.npmjs.com/package/dotenv) and run the following ASAP
```shell
require('dotenv').config()
```
This line load all the `.env` into `process.env`

Install jest library and update package.json
```json
"scripts": {
    "test": "jest --verbose"
    // ...
},
"jest": {
    "testEnvironment": "node"
}
```

The convention in Node is to define the execution mode of the application with the NODE_ENV environment variable. Next, let's change the scripts in our package.json so that when tests are run, NODE_ENV gets the value test:
```json
"scripts": {
    "start": "NODE_ENV=production node index.js",
    "dev": "NODE_ENV=development nodemon index.js",
    "test": "NODE_ENV=test jest --verbose --runInBand"
    // ...
}
```

## Testing Node by requesting API

Use `supertest` library
```js
const api = supertest(app)
await api.get()
expect().toHaveLength()
```

The `express-async-errors` library helps remove try...catch block. You just need to include it in `app.js`
```js
requrie('express-async-errors`)
```

## User administration

`bcrypt` package is used for generating password hashes. `jsonwebtoken` is used for generating and verifying tokens.
