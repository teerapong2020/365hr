"use client"
import React from 'react'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-800">
      <div className="flex flex-col items-center space-y-4 animate-fade-in">
        <img
          src="/logo.png"
          width="300px"
          className="rounded-full max-md:w-[200px] animate-bounce"
        />
        <p className="text-white text-6xl max-md:text-2xl animate-fade-up">
          website สุดสนุก
        </p>
        <Link href="/login">
          <button className="bg-blue-600 hover:bg-black px-5 py-2 rounded-xl text-white text-5xl max-md:text-2xl  duration-300 hover:scale-105">
            let go
          </button>
        </Link>
      </div>
    </div>
  )
}
