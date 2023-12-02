import { fileListString } from './list.js'

function analizeFiles ({ fileList }) {
  const initialValue = {
    realFiles: [],
    fakeFiles: []
  }
  return fileList.reduce(
    (accumulator, file) => {
      const [alphanumericString, checksum] = file.split('-')

      const stringOfUniqueCharacters = Array.from(alphanumericString).filter((character, index) => {
        const stringWithoutFirstCharacterOcurrence = alphanumericString.replace(character, '')
        return !stringWithoutFirstCharacterOcurrence.includes(character)
      }).join('')

      if (stringOfUniqueCharacters === checksum) {
        accumulator.realFiles.push(file)
      } else {
        accumulator.fakeFiles.push(file)
      }

      return accumulator
    }, initialValue
  )
}
const fileList = fileListString.split('\n')
const { realFiles, fakeFiles } = analizeFiles({ fileList })
realFiles.forEach((file, index) => console.log(index, file))
