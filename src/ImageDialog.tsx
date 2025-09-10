"use client"

import type React from "react"
import { useState } from "react"

interface ImageDialogProps {
  open: boolean
  onClose: () => void
  onInsert: (src: string, alt: string) => void
}

export const ImageDialog: React.FC<ImageDialogProps> = ({ open, onClose, onInsert }) => {
  const [url, setUrl] = useState("")
  const [alt, setAlt] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [tab, setTab] = useState<"url" | "upload">("url")

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onInsert(url.trim(), alt.trim() || "Image")
      handleClose()
    }
  }

  const handleFileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onInsert(result, alt.trim() || file.name)
        handleClose()
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClose = () => {
    setUrl("")
    setAlt("")
    setFile(null)
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
        <h2 className="text-lg font-bold mb-4">Insert Image</h2>

        {/* Tabs */}
        <div className="flex mb-4 border-b">
          <button
            className={`flex-1 py-2 ${tab === "url" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
            onClick={() => setTab("url")}
          >
            From URL
          </button>
          <button
            className={`flex-1 py-2 ${tab === "upload" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
            onClick={() => setTab("upload")}
          >
            Upload File
          </button>
        </div>

        {/* Tab Content */}
        {tab === "url" && (
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <div>
              <label htmlFor="image-url" className="block font-medium">
                Image URL
              </label>
              <input
                id="image-url"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label htmlFor="image-alt" className="block font-medium">
                Alt Text
              </label>
              <input
                id="image-alt"
                placeholder="Describe the image"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={handleClose} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Insert Image
              </button>
            </div>
          </form>
        )}

        {tab === "upload" && (
          <form onSubmit={handleFileSubmit} className="space-y-4">
            <div>
              <label htmlFor="image-file" className="block font-medium">
                Select Image
              </label>
              <input
                id="image-file"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="file-alt" className="block font-medium">
                Alt Text
              </label>
              <input
                id="file-alt"
                placeholder="Describe the image"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={handleClose} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button
                type="submit"
                disabled={!file}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Insert Image
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
