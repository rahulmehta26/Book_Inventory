import { useState, useEffect, useMemo } from "react"
import { bookThoughts } from "../utils/bookThoughts"

export function useRandomThought() {
  const [currentThoughtId, setCurrentThoughtId] = useState(0)

  useEffect(() => {
    const getRandomThought = () => {
      const randomIndex = Math.floor(Math.random() * bookThoughts.length)
      setCurrentThoughtId(randomIndex)
    }

    getRandomThought()
    const interval = setInterval(getRandomThought, 60000)

    return () => clearInterval(interval)
  }, [])

  return useMemo(() => bookThoughts[currentThoughtId], [currentThoughtId])
}