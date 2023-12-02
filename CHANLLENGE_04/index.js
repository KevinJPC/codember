import { fileListString } from './list.js'

function analizeFiles ({ fileList }) {
  const initialValue = {
    realFiles: [],
    fakeFiles: []
  }
  const { realFiles, fakeFiles } = fileList.reduce(
    (accumulator, file) => {
      const [alphanumericString, checksum] = file.split('-')
      const uniqueCharactersOnString = new Set()

      Array.from(alphanumericString).forEach(character => {
        if (!uniqueCharactersOnString.has(character)) return uniqueCharactersOnString.add(character)
        return uniqueCharactersOnString.delete(character)
      })

      const isRealFile = Array.from(uniqueCharactersOnString).join('') === checksum
      accumulator[isRealFile ? 'realFiles' : 'fakeFiles'].push(file)

      return accumulator
    }, initialValue
  )

  return { realFiles, fakeFiles }
}

const fileList = fileListString.split('\n')
const { realFiles, fakeFiles } = analizeFiles({ fileList })
realFiles.forEach((file, index) => console.log(index, file))
