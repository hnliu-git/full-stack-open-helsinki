
# Overview

Understand the best-practice project structure and know how to setup test for Node backend

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
├── package-lock.json
├── package.json
├── utils
│   ├── ... 
```

Explanations
- The index.js is the entrypoint and load app from app.js
- Route handlers are moved into /controllers
- In models/, we define  the data model
- In utils/, logger and middlewares are saved there

## Setup jest

Dependency
```shell
npm install --save-dev jest
```

In package.json
```json
"scripts": {
    "test": "jest --verbose"
    // ...
},
"jest": {
    "testEnvironment": "node"
}
```

Create files with format like 'xxx.test.js'. In it, we have:
```js
const reverse = require('../utils/for_testing').reverse

test('reverse of a', () => {
  const result = reverse('a')

  expect(result).toBe('a')
})
```

Can also create a block of test
```js
describe('average', () => {
  test('of one value is the value itself', () => {
    expect(average([1])).toBe(1)
  })

  test('of many is calculated right', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
  })

  test('of empty array is zero', () => {
    expect(average([])).toBe(0)
  })
})
```

## From Promise to Async/Await
- Sequential Promises could give birth to callback hell
- ES7 introduce async syntax to make the code easier to understand

FROM
```js
notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})
```

TO
```js
notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})
```



## Testing the backend

