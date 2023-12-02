import { entriesString } from './list.js'

const isAlphanumeric = (...values) => {
  for (const value of values) {
    if (!/^[a-zA-Z0-9]+$/.test(value)) return false
  }
  return true
}

const isValidEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)

const isValidAge = (age) => {
  const ageAsNumber = Number(age)
  return Number.isInteger(ageAsNumber)
}

const exist = (...values) => {
  for (const value of values) {
    if (value === '') return false
  }
  return true
}

const isString = (value) => typeof value === 'string'

function analyzeEntries ({ entries }) {
  const invalidEntries = entries.filter(entry => {
    const [id, username, email, age, location] = entry.split(',')
    if (!exist(id, username) || !isAlphanumeric(id, username)) return true
    if (!exist(email) || !isValidEmail(email)) return true
    if (!isValidAge(age)) return true
    if (!isString(location)) return true

    return false
  })

  const hiddenMessage = invalidEntries.reduce((msg, invalidEntry) => {
    const [, username] = invalidEntry.split(',')
    return msg.concat(username[0], '')
  }, '')

  return { invalidEntries, hiddenMessage }
}

const entries = entriesString.split('\n')
const result = analyzeEntries({
  entries
})
console.log(result)
