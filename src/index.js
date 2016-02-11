const taggedLiteral = (literals = [], ...values) => {
  return literals.reduce((result, literal, index) => {
    result += literal
    if (index < values.length) result += values[index]
    return result
  }, '')
}

const initialWhitespace = (str = '') => {
  const stripped = str.replace(newlines, '').replace(emptyLines, '\n')
  let count = 0

  for (let i = 0, m = stripped.length; i < m; i++) {
    if (stripped[i] === ' ') {
      count++
    } else {
      return count
    }
  }

  return count
}

const newlines = /\n/g
const emptyLines = /\n\s*\n/g
const whitespaceAfterNewlines = /\n\s*/g
const trailingNewline = /\n$/
const stripNewlineWhitespace = (str) => new RegExp(`\\n\\s{${initialWhitespace(str)}}`, 'g')
const stripFirstNewlineWhitespace = (str) => new RegExp(`^\\n\\s{${initialWhitespace(str)}}`)

export const minify = (...args) =>
  taggedLiteral(...args)
  // Strip all newlines followed by any number of spaces
  .replace(whitespaceAfterNewlines, '')

export const unindent = (literals = [], ...args) =>
  taggedLiteral(literals, ...args)
  // Strip leading newline + initial whitespace
  .replace(stripFirstNewlineWhitespace(literals[0]), '')
  // Replace all other newlines + initial whitespace with newlines
  .replace(stripNewlineWhitespace(literals[0]), '\n')
  // Replace empty blank lines with newlines
  .replace(emptyLines, '\n')
  // Strip trailing newline
  .replace(trailingNewline, '')
