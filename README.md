# Angular.io [![Build Status](https://travis-ci.org/willfarrell/angular-io.png?branch=master)](https://travis-ci.org/willfarrell/angular-io)

***

## Usage

This is a subset of [angular-io-app](https://github.com/willfarrell/angular-io-app).

### Requirements

* **AngularJS v1.0.0+** is currently required.

## Installation

The repository comes with the modules pre-built and compressed into the `build/` directory.

```javascript
angular.module('app', ['io']);
```

The modules can be found in the [Directives](https://github.com/willfarrell/angular-io/tree/master/src/scripts/directives) and [Filters](https://github.com/willfarrell/angular-io/tree/master/src/scripts/filters) folders. Check out the readme file associated with each module for specific module usage information.

## Development

You do not need to build the project to use it - see above - but if you are working on it then this is what you need to know.

### Requirements

0. Install [Node.js](http://nodejs.org/) and NPM (should come with)

1. Install global dependencies `grunt`, `bower`, and `karma`:

```bash
$ npm install -g karma grunt-cli bower
```

2. Install local dependencies:

```bash
$ npm install && bower install
```

### Build Files & Run Tests

Before you commit, always run `grunt` to build and test everything once.

```bash
$ grunt
```

## Modules
### Directives
- 

### Filters
- colorHash (dev)
- duration
- format
- ordinal
- pad
- range
- truncate


