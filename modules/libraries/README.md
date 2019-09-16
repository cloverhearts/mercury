[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

# Javascript Module Boilerplate
The Javascript Module Boilerplate based on Javascript Standard.

Based on [Babel7](https://babeljs.io/), [Jest](https://jestjs.io) and [Javascript Standard](https://standardjs.com/)
with [JSDoc3](http://usejsdoc.org/)

## Author
CloverHearts

## Support Features
### Transpiling from es6 javascript to es5

### Support Javascript documentation

### Support create single module file

### Support Jest Testcase

### Support es6 module import

## Npm Operations
### clean
```bash
npm run clean
```
Clear for all outputs.

### build or build:module
```bash
npm run build
```
Execute to npm chain operation with build:module.

This operation make a new module from your source.

### Generate Document for JS Module.
```bash
npm run build
```
or

```bash
npm run build:doc
```

### test
```base
npm run test
```
Execute to npm chanin operation with unit-test and checkstyle for Javascript Standard

Unit test has using Jest Test framework.

#### test:unit-test
```bash
npm run test:unit-test
```
Test for your code with Jest Test Framework.

#### test:checkstyle
```bash
npm run test:checkstyle
```
Test for Your code with Javascript Standard style.

