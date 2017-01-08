# readr

Recursively list all files and directories within a target directory.

Similar to [recursive-readdir](https://github.com/jergason/recursive-readdir) but it includes paths of subdirectories in the files list (and it returns a Promise instead of using a callback).

[![Build Status](https://img.shields.io/travis/frctl/readr/master.svg?style=flat-square)](https://travis-ci.org/frctl/readr)
[![NPM Version](https://img.shields.io/npm/v/@frctl/readr.svg?style=flat-square)](https://www.npmjs.com/package/@frctl/readr)

## Install

Installation using [Yarn](http://yarnpkg.com) is recommended.

```
yarn add @frctl/readr
```

## Usage

`readr` returns a `Promise` that is resolved with an array of file/directory paths.

```js
const readr = require('@frctl/readr');

readr('path/to/files').then(files => {
    // do something with the files list.
});
```

<!--
You can also provide a filter function to ignore certain files:

```js
const readr = require('@frctl/readr');

const filter = (path, stat) => stat.isFile(); // filter out directories

readr('path/to/files', filter).then(files => {
    console.log(files); // no directories here!
});
```
-->

## Requirements

`@frctl/readr` requires Node >= v6.0
