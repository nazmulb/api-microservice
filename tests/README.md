## Jest
Jest is an open JavaScript testing library from Facebook. Its slogan is "Delightful JavaScript Testing". While Jest can be used to test any JavaScript library, it shines when it comes to React and React Native.

## Getting Started
Install Jest using `npm`
```sh
npm install --save-dev jest
```
After installing you can define config file if you want but jest is pretty flexible so by default it can grab the test defined files. But here we have a config file.

`jest-config.js`
```js
module.exports = {
    verbose: true,
    testFilePath: "./tests"
}
```
that's simple for your simple api test.

### Writting our first test
We have api right? So we are gonna test these by importing the express `app` instance
```js
const request = require('supertest');
const app = require('../../app');


describe('Test the root path', () => {
    test('It should response the GET method', () => {
        return request(app).get('/').expect(200);
    });
})
```

In our test file we used `describe` and `test`, Jest puts each of these methods and objects into the global environment. You don't have to require or import anything to use them.

- `describe(name, fn)`: describe(name, fn) creates a block that groups together several related tests.
- `test(name, fn, timeout)`: All you need in a test file is the test method which runs a test. It also under the alias: it(name, fn, timeout). 
- there have lot more methods. Here is the [link](https://jestjs.io/docs/en/api)

### Run your test
Thst's simple, just hit the command
```sh
npm test
```


