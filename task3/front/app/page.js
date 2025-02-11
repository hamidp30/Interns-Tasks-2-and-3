'use client';
import Image from 'next/image'
import React, { useState } from 'react'

export default function Home() {
  // Handles the submit event on form submit.
  const [showResult, setShowResult] = useState(null);
  const [sendBtnClass, setSendBtnClass] = useState("m-5 bg-neutral-600 text-white p-2 rounded-md");
  const [sendBtn, setSendBtn] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault()
    setSendBtn(true)
    setSendBtnClass("m-5 bg-red-400 text-white p-2 rounded-md")
    setShowResult("Loading...")
    const data = { question: event.target.question_input.value, }
    const JSONdata = JSON.stringify(data)
    const endpoint = 'http://127.0.0.1:8000/api/req/'
    const options = { method: 'POST', headers: { 'Content-Type': 'application/json', },
    // Body of the request is the JSON data we created above.
     body: JSONdata }
    const response = await fetch(endpoint, options)
    const result = await response.json()
    setShowResult(result.message)
    setSendBtn(false)
    setSendBtnClass("m-5 bg-neutral-600 text-white p-2 rounded-md")
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Ask AI about ASUS gaming laptops
        </p>
      </div>

      <div className="mb-10">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid justify-center text-center">
        <p className="m-1" >Type your question in the box below:</p>
        <form className="m-1" onSubmit={handleSubmit}>
          <label className="m-5 text-neutral-600 " htmlFor="question_input">Question:</label>
          <input
            className="p-2 text-neutral-600 rounded-md"
            type="search"
            id="question_input"
            name="question_input"
            required
            pattern="[a-zA-Z0-9\?' ']{8,38}"
            placeolder="question?"
            title="question should digits (0 to 9) or alphabets (a to z) and Length (8-38)"
          />
          <button className={sendBtnClass} disabled={sendBtn} type="submit">Send</button>
        </form>
        <p className="m-0 max-w-[50ch] text-sm !text-red-800 text-left ">
          {showResult}
        </p>
      </div>
    </main>
  )
}
