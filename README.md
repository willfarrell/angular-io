# Angular.io [![Build Status](https://travis-ci.org/willfarrell/angular-io.png?branch=master)](https://travis-ci.org/willfarrell/angular-io) [![Dependencies](https://david-dm.org/willfarrell/angular-io.png)](https://david-dm.org/willfarrell/angular-io) [![devDependency Status](https://david-dm.org/willfarrell/angular-io/dev-status.png)](https://david-dm.org/willfarrell/angular-io#info=devDependencies)

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

### Setup Component Files

Some components need to be compiled (Twitter Bootstrap) and moved into place (AngularJS, fonts).

```bash
$ grunt setup
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
- selectSize (no tests)
- signature (no tests)
- **To Do**
 - formChange

### Factories
- fluid (no tests)
- rest (no tests)
- localstorage (no tests)
- time
- **To Do**
 - function (to delete)
 

### Filters
- colorHash
- duration
- format
- markdown
- objectArray
- ordinal
- pad
- phone
- range
- truncate

### Bootstrap
- alert (no tests)
- modal (no tests)
- **To Do** 
 - tab
 - tooltip
 - popover


### Modules
- 404 (no tests)
- accessibility (no tests)
- **To Do**
 - htmlEntities (IE8 bug)
 - filepicker (requires backend)
 - follow (requires backend)
 - message (requires backend)

## Contribs
[@willfarrell](http://willfarrell.ca)

## License
Pick your poison [Apache Public License 2.0](http://www.apache.org/licenses/LICENSE-2.0.html) / [MIT](http://opensource.org/licenses/MIT) / [GNU General Public License v2.0](http://www.gnu.org/licenses/gpl-2.0.html).