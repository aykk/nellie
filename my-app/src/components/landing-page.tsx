'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function LandingPageComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-indigo-300">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-start">
          <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
            Nellie
          </Link>
        </div>
      </nav>
      <main className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[calc(100vh-88px)]">
        <h1 className="text-5xl md:text-7xl font-extrabold text-center text-indigo-600 mb-4">
          Nellie
        </h1>
        <p className="text-lg md:text-xl text-center text-indigo-800 mb-8 max-w-2xl">
          Smarter journeys, inspired by Nellie!
        </p>
        <Link href="/functionality">
          <Button className="text-lg px-8 py-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Get Started
          </Button>
        </Link>
      </main>
    </div>
  )
}