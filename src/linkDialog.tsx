
import type React from "react"
import { useState } from "react"


interface LinkDialogProps {
  open: boolean
  onClose: () => void
  onInsert: (url: string, text?: string) => void
}

export const LinkDialog: React.FC<LinkDialogProps> = ({ open, onClose, onInsert }) => {
  const [url, setUrl] = useState("")
  const [text, setText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onInsert(url.trim(), text.trim() || undefined)
      setUrl("")
      setText("")
    }
  }

  const handleClose = () => {
    setUrl("")
    setText("")
    onClose()
  }
  if (!open) return null

  return (
    <div  onChange={handleClose}>
      <div className="sm:max-w-md">
        <div>
          <h3>Insert Link</h3>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="url">URL</label>
            <input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="text">Link Text (optional)</label>
            <input
              id="text"
              placeholder="Leave empty to use selected text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit">Insert Link</button>
          </div>
        </form>
      </div>
    </div>
  )
}
