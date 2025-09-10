"use client"

import type React from "react"

interface WordCounterProps {
  content: string
}

export const WordCounter: React.FC<WordCounterProps> = ({ content }) => {
  // Remove HTML tags and count words
  const textContent = content
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  const wordCount = textContent ? textContent.split(" ").length : 0
  const charCount = textContent.length

  return (
    <div className="flex justify-between items-center px-4 py-2 bg-muted/30 border-t border-border text-sm text-muted-foreground">
      <div className="flex gap-4">
        <span>Words: {wordCount}</span>
        <span>Characters: {charCount}</span>
      </div>
    </div>
  )
}
