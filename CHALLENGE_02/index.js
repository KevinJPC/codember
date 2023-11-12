const decodifier = {
  '#': (acc) => ({ ...acc, value: acc.value + 1 }),
  '@': (acc) => ({ ...acc, value: acc.value - 1 }),
  '*': (acc) => ({ ...acc, value: acc.value * acc.value }),
  '&': ({ value, result }) => ({ value, result: result.concat(value) })
}

function compile ({ code }) {
  const codeCharacters = Array.from(code)
  const initialAccumulator = { value: 0, result: '' }

  const { value, result } = codeCharacters.reduce((acc, character) => {
    const decodifierFunction = decodifier[character]
    if (!decodifierFunction) return character

    return decodifierFunction(acc)
  }, initialAccumulator)

  return result
}

// const code = '&##&*&@&'
const code = '&###@&*&###@@##@##&######@@#####@#@#@#@##@@@@@@@@@@@@@@@*&&@@@@@@@@@####@@@@@@@@@#########&#&##@@##@@##@@##@@##@@##@@##@@##@@##@@##@@##@@##@@##@@##@@##@@&'
const compiledCode = compile({ code })
console.log(compiledCode)
