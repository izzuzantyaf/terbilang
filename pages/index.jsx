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
    <div className="homepage">
      <Head>
        <title>Terbilang</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto min-h-screen grid grid-cols-12 grid-rows-3">
        <div className="col-span-full place-self-center">
          <input type="text" className="number-input border rounded-md p-2 focus:outline-none focus:ring" placeholder="Masukkan angka" autoFocus onChange={numToText} maxLength="15" />
        </div>
        <div className="output col-span-full rounded-t-3xl row-span-2 p-6 bg-white shadow text-lg font-semibold">
          {textedNum}
        </div>
      </div>

    </div>
  )
}
