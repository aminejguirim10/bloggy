import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getFallback(username: string | null) {
  if (!username) return "NA"
  const words = username.split(" ")

  // Get the first two words
  const firstWord = words[0]
  const secondWord = words.length > 1 ? words[1] : ""

  // Extract the first letters of the first two words
  const firstLetterFirstWord = firstWord.charAt(0)
  const firstLetterSecondWord = secondWord.charAt(0)

  // Concatenate the first letters to form the fallback
  const fallback =
    firstLetterFirstWord.toUpperCase() + firstLetterSecondWord.toUpperCase()

  return fallback
}
