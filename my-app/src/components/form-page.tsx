'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function FormPageComponent() {
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [output, setOutput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = JSON.stringify({ city, country }, null, 2)
    setOutput(data)
    console.log(data) // This will log the JSON to the console
  }

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
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
            Where are you traveling?
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-indigo-700 mb-1">
                City
              </label>
              <Input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="w-full border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter city name"
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-indigo-700 mb-1">
                Country
              </label>
              <Input
                id="country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="w-full border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter country name"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
            >
              Start learning!
            </Button>
          </form>
          {output && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-indigo-600 mb-2">Output:</h2>
              <pre className="bg-white p-4 rounded-md shadow-md overflow-x-auto">
                {output}
              </pre>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}