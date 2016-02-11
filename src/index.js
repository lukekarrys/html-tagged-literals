const taggedLiteral = (literals = [], ...values) => {
  return literals.reduce((result, literal, index) => {
    result += literal
    if (index < values.length) result += values[index]
    return result
  }, '')
}

const initialWhitespace = (str = '') => {
  const stripped = str.replace(/\n/g, '').replace(/\n\s*\n/g, '\n')
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

const stripAll = /\n\s*/g
const stripNewlineWhitespace = (str) => new RegExp(`\\n\\s{${initialWhitespace(str)}}`, 'g')
const stripFirstNewlineWhitespace = (str) => new RegExp(`^\\n\\s{${initialWhitespace(str)}}`)

export const minify = (...args) =>
  taggedLiteral(...args)
  // Strip all newlines followed by any number of spaces
  .replace(stripAll, '')

export const unindent = (literals = [], ...args) =>
  taggedLiteral(literals, ...args)
  // Strip leading newline + initial whitespace
  .replace(stripFirstNewlineWhitespace(literals[0]), '')
  // Replace all other newlines + initial whitespace with newlines
  .replace(stripNewlineWhitespace(literals[0]), '\n')
  // Replace empty blank lines with newlines
  .replace(/\n\s*\n/g, '\n')
  // Strip trailing newline
  .replace(/\n$/, '')
