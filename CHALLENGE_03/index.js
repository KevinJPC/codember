import { keyListString } from './list.js'

function getInvalidEncriptationKeys ({ keys = [], number }) {
  const invalidEncriptationKeys = []
  for (const key of keys) {
    const [policy, encryptionKey] = key.split(':')
    const [occurrences, character] = policy.split(' ')
    const [minOccurrences, maxOccurrences] = occurrences.split('-')

    const characterOcurrences = (encryptionKey.match(new RegExp(character, 'g')) || []).length
    const isInvalid = characterOcurrences < minOccurrences || characterOcurrences > maxOccurrences
    if (isInvalid) invalidEncriptationKeys.push(encryptionKey)
  }

  return number ? (invalidEncriptationKeys[number - 1] || null) : invalidEncriptationKeys
}

const keys = keyListString.split('\n')
const invalidKeys = getInvalidEncriptationKeys({ keys, number: 42 })
console.log(invalidKeys)
