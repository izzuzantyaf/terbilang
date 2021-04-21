export default class NumberToTextConverter {

  #numTextMap = {
    0: '', 1: 'satu', 2: 'dua', 3: 'tiga', 4: 'empat',
    5: 'lima', 6: 'enam', 7: 'tujuh', 8: 'delapan', 9: 'sembilan'
  }

  #pointUnit = {
    0: '',
    1: 'ribu',
    2: 'juta',
    3: 'milyar',
    4: 'triliun',
  }

  #conventionMap = {
    'satu puluh': 'sepuluh',
    'satu puluh satu': 'sebelas',
    'satu puluh dua': 'dua belas',
    'satu puluh tiga': 'tiga belas',
    'satu puluh empat': 'empat belas',
    'satu puluh lima': 'lima belas',
    'satu puluh enam': 'enam belas',
    'satu puluh tujuh': 'tujuh belas',
    'satu puluh delapan': 'delapan belas',
    'satu puluh sembilan': 'sembilan belas',
    'satu ratus': 'seratus',
    'satu ribu': 'seribu',
  }

  convert(numStr = '') {

    // check if string only contains number
    if (!/^\d+$/.test(numStr)) return

    // 000012345678 ---> ['0','0','0','0','1','2'...]
    const numStrArr = numStr.split('')

    // if string just contains zero then return 'nol'
    if (numStrArr.every(char => char == '0')) return 'nol'

    // remove 0's prefix (['0','0','0','0','1','2'...] --> ['1','2'...])
    const normalizedNumStr = []
    for (let i = 0; i < numStrArr.length; i++) {
      if (numStrArr[i] == '0') continue
      for (let j = i; j < numStrArr.length; j++) normalizedNumStr.push(numStrArr[j])
      break
    }

    // [['1','2'],['3','4','5'],['6','7','8']]
    const chunkedNum = []
    let tempArr = []
    let counter = 0
    for (let i = normalizedNumStr.length - 1; i >= 0; i--) {
      const num = normalizedNumStr[i]
      tempArr.unshift(num)
      counter++
      if (counter == 3 || i == 0) {
        chunkedNum.unshift(tempArr)
        counter = 0
        tempArr = []
      }
    }

    const unit = ['', 'puluh', 'ratus']

    // ['d',['3','4','5'],['6','7','8']]
    let numTextArr = chunkedNum.map((numText, index) => {
      numText.reverse()
      let tempStr = ''
      numText.forEach((char, index) => {
        if (char != '0') {
          tempStr = this.#numTextMap[char] + ' ' + unit[index] + ' ' + tempStr
          tempStr = tempStr.trim()
          if (char == '1' && index == 1)
            tempStr = this.#conventionMap[tempStr]
          else if (char == '1' && index == 2)
            tempStr = tempStr.replace('satu ratus', this.#conventionMap['satu ratus'])
        }
      })
      return tempStr.trim()
    })

    return numTextArr
      .reverse()
      .map((numText, index) =>
        numText.split('').every(char => char == '0') ? numText : numText.concat(' ' + this.#pointUnit[index]).replace('satu ribu', this.#conventionMap['satu ribu']))
      .reverse()
      .join(' ')
      .concat('.')
  }
}