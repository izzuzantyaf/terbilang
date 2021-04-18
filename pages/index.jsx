import Head from 'next/head'
import { useState } from 'react'
import NumToText from '../app/number-to-text'

export default function Home() {

  const numToTextConverter = new NumToText

  const [textedNum, setTextedNum] = useState([])

  const numToText = (e) => {
    setTextedNum(numToTextConverter.convert(e.target.value))
  }

  return (
    <div className="homepage p-6">
      <Head>
        <title>Terbilang</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <input type="text" className="number-input border rounded-md p-2" placeholder="Masukkan angka" autoFocus onChange={numToText} maxLength="15" />
        <div className="output">
          {textedNum}
        </div>
      </div>

    </div>
  )
}
