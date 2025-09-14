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

  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 1rem",
    backgroundColor: "rgba(243, 244, 246, 0.3)", // muted/30
    borderTop: "1px solid #d1d5db", // border-t border-border
    fontSize: "0.875rem", // text-sm
    color: "rgba(247, 248, 249, 1)", // text-muted-foreground
  }

  const statsStyle: React.CSSProperties = {
    display: "flex",
    gap: "1rem",
  }

  return (
    <div style={containerStyle}>
      <div style={statsStyle}>
        <span>Words: {wordCount}</span>
        <span>Characters: {charCount}</span>
      </div>
    </div>
  )
}
