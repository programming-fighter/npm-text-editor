"use client"

import type React from "react"
import { useRef, useCallback, useState, useEffect } from "react"
import { Toolbar } from "./toolbar"
import { WordCounter } from "./wordCounter"

export interface EditorProps {
  initialContent?: string
  onChange?: (content: string) => void
  placeholder?: string
}

export const Editor: React.FC<EditorProps> = ({ initialContent = "", onChange, placeholder = "Start typing..." }) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [content, setContent] = useState(initialContent)

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && initialContent) {
      editorRef.current.innerHTML = initialContent
    }
  }, [initialContent])

  // Handle content changes
  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML
      setContent(newContent)
      onChange?.(newContent)
    }
  }, [onChange])

  // Execute editor commands
  const executeCommand = useCallback(
    (command: string, value?: string) => {
      if (!editorRef.current) return

      editorRef.current.focus()

      switch (command) {
        case "bold":
          document.execCommand("bold", false)
          break
        case "italic":
          document.execCommand("italic", false)
          break
        case "underline":
          document.execCommand("underline", false)
          break
        case "undo":
          document.execCommand("undo", false)
          break
        case "redo":
          document.execCommand("redo", false)
          break
        case "createLink":
          if (value) {
            document.execCommand("createLink", false, value)
          }
          break
        case "insertHTML":
          if (value) {
            document.execCommand("insertHTML", false, value)
          }
          break
        case "formatBlock":
          if (value) {
            document.execCommand("formatBlock", false, value)
          }
          break
        default:
          break
      }

      handleInput()
    },
    [handleInput],
  )

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "b":
            e.preventDefault()
            executeCommand("bold")
            break
          case "i":
            e.preventDefault()
            executeCommand("italic")
            break
          case "u":
            e.preventDefault()
            executeCommand("underline")
            break
          case "z":
            e.preventDefault()
            if (e.shiftKey) {
              executeCommand("redo")
            } else {
              executeCommand("undo")
            }
            break
          default:
            break
        }
      }
    },
    [executeCommand],
  )

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <Toolbar onCommand={executeCommand} />
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[400px] p-4 focus:outline-none"
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        data-placeholder={placeholder}
        style={{
          wordWrap: "break-word",
          whiteSpace: "pre-wrap",
        }}
        suppressContentEditableWarning={true}
      />
      <WordCounter content={content} />
    </div>
  )
}
