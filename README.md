html-tagged-literals
==================

[![NPM](https://nodei.co/npm/html-tagged-literals.png)](https://nodei.co/npm/html-tagged-literals/)
[![Build Status](https://travis-ci.org/lukekarrys/html-tagged-literals.png?branch=master)](https://travis-ci.org/lukekarrys/html-tagged-literals)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Install

```sh
npm install html-tagged-literals --save
```

## Usage

ES2015 template strings are nice for generating HTML, but can be annoying because of stuff like this:

```js
const html = () => {
  const css = '/path/to/theme.css'
  const js = '/path/to/app.js'

  // The code looks readable and nice but now the html will have leading and
  // trailing newlines and each line will be indented by 4 extra spaces
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="${context.css}">
      </head>
      <body>
        <div id="container">
        </div>
      </body>
      <script src="${js}"></script>
    </html>
  `
}
```

This module gives you a few tagged template literals for either stripping all newlines+whitespace or just unindenting:

```js
import {minify, unindent} from 'html-tagged-literals'

const html = () => {
  const css = '/path/to/theme.css'
  const js = '/path/to/app.js'

  // This will now be a single line of html.
  // Use unindent to preserve the original indentation but to get rid of
  // leading/trailing newlines and the first 4 spaces before each line.
  return minify`
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="${css}">
      </head>
      <body>
        <div id="container">
        </div>
      </body>
      <script src="${js}"></script>
    </html>
  `
}
```

## API

- `minify`

This will take the template string and remove all newlines followed by any number of spaces.

- `unindent`

This will take the template string and do the following:

* Remove leading/trailing newliens
* Remove empty lines
* Count the number of whitespace before the first non-empty line and remove those from the start of each line


### LICENSE

MIT
