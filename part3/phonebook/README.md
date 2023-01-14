# Summary

This part a backend based on Express is compelted. The backend is connected to the MongoDB. The logic interact with the frontend and backend is finished. ESLint and Cloud deployment are also introduced in this part.

## Backend Development

### Libraries

Express is a library with a more pleasing interface to work with NodeJS. To use it, we:
```shell
npm install express
```

To restart app automatecally to see the changes
```shell
npm install --save-dev nodemon
nodemon index.js
```

For a simple JSON database, use json-server. In VSCode, use REST client to mock requests

### Middleware

Middleware are functions that can be used for handling request and response objects. It is like some pipelines. For example, like json-parser used for the request and logger handling request or response.

The order of the middleware in Express is important as you need the parser first to understand requests then to logger.

## Deployment

Flyio is used for deployment. Use:
```shell
fly launch
fly deploy
```

### Frontend build

Building frontend into static files and integrate with the backend
```shell
npm run build
```
Copy the built files to the backend and use them
```js
app.use(express.static('build'))
```

## MongoDB

deal with MongoDB, use
```shell
npm install mongoose
```

### Validation

Document Databases like Mongo are schemaless , meaning that the database itself does not care about the structure of the data that is stored in the database. It is possible to store documents with completely different fields in the same collection.

The idea behind Mongoose is that the data stored in the database is given a schema at the **level of the application** that defines the shape of the documents stored in any given collection.

## Debuging

With Chrome Developer Console
```shell
node --inspect index.js
```

