const decoder = {
  '#': ({ value }) => ({ value: value + 1 }),
  '@': ({ value }) => ({ value: value - 1 }),
  '*': ({ value }) => ({ value: value * value }),
  '&': ({ value, result }) => ({ result: result.concat(value) })
}

function compile ({ code }) {
  const codeCharacters = Array.from(code)
  const initialAccumulator = { value: 0, result: '' }

  const { result } = codeCharacters.reduce((acc, character) => {
    const decoderFunction = decoder[character]

    const newAcc = decoderFunction ? decoderFunction(acc) : acc
    return { ...acc, ...newAcc }
  }, initialAccumulator)

  return result
}

// const code = '&##&*&@&'
const code = '&###@&*&###@@##@##&######@@#####@#@#@#@##@@@@@@@@@@@@@@@*&&@@@@@@@@@####@@@@@@@@@#########&#&##@@##@@##@@##@@##@@##@@##@@##@@##@@##@@##@@##@@##@@##@@##@@&'
const compiledCode = compile({ code })
console.log(compiledCode)
