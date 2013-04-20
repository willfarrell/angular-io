# Angular.io [![Build Status](https://travis-ci.org/willfarrell/angular-io.png?branch=master)](https://travis-ci.org/willfarrell/angular-io)

***

## Usage

This is a subset of [angular-io-app](https://github.com/willfarrell/angular-io-app).

### Requirements

* **AngularJS v1.0.0+** is currently required.

## Installation

Include `io` in your app dependencies, and you're good to go.

```js
angular.module('app', ['io']);
```

The modules can be found in the [Directives](https://github.com/willfarrell/angular-io/tree/master/src/scripts/directives) and [Filters](https://github.com/willfarrell/angular-io/tree/master/src/scripts/filters) folders.

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
- inputMask (requires: $filter('format'))
- passwordCheck

### Filters
- colorHash
- duration
- format
- markdown
- ordinal
- pad
- range
- truncate

## Contribs
[@willfarrell](http://willfarrell.ca)

## License
Your choice of [Apache Public License 2.0](http://www.apache.org/licenses/LICENSE-2.0.html) / [MIT](http://opensource.org/licenses/MIT) / [GNU General Public License v2.0](http://www.gnu.org/licenses/gpl-2.0.html).