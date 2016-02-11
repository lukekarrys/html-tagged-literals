import test from 'tape'
import {minify, unindent} from '../src/index'

const css = '/path/to/file.css'
const js = '/path/to/file.js'

// tons of indent
const minifiedTemplate = (context) => minify`
              <!DOCTYPE html>
              <html>
                <head>
                  <link rel="stylesheet" href="${context.css}">
                </head>
                <body>
                  <div id="container">
                  </div>
                </body>
                ${!context.js ? '' : `<script src="${context.js}"></script>`}
              </html>
`

const unindentTemplate = (context) => unindent`
              <!DOCTYPE html>
              <html>
                <head>
                  <link rel="stylesheet" href="${context.css}">
                </head>
                <body>
                  <div id="container">
                  </div>
                </body>
                ${!context.js ? '' : `<script src="${context.js}"></script>`}
              </html>
`

test('minify', (t) => {
  t.equal(
    minifiedTemplate({css, js}),
    '<!DOCTYPE html><html><head><link rel="stylesheet" href="/path/to/file.css"></head><body><div id="container"></div></body><script src="/path/to/file.js"></script></html>'
  )

  t.equal(
    minifiedTemplate({css}),
    '<!DOCTYPE html><html><head><link rel="stylesheet" href="/path/to/file.css"></head><body><div id="container"></div></body></html>'
  )

  t.end()
})

test('unindent', (t) => {
  const s = (count = 0) => `\n${new Array(count + 1).join(' ')}`

  t.equal(
    unindentTemplate({css, js}),
    `<!DOCTYPE html>${s()}<html>${s(2)}<head>${s(4)}<link rel="stylesheet" href="/path/to/file.css">${s(2)}</head>${s(2)}<body>${s(4)}<div id="container">${s(4)}</div>${s(2)}</body>${s(2)}<script src="/path/to/file.js"></script>${s()}</html>`
  )

  t.equal(
    unindentTemplate({css}),
    `<!DOCTYPE html>${s()}<html>${s(2)}<head>${s(4)}<link rel="stylesheet" href="/path/to/file.css">${s(2)}</head>${s(2)}<body>${s(4)}<div id="container">${s(4)}</div>${s(2)}</body>${s()}</html>`
  )

  t.end()
})

test('empty', (t) => {
  t.equal(unindent``, '')
  t.equal(minify``, '')
  t.equal(unindent(), '')
  t.equal(minify(), '')

  t.end()
})
