import { useState } from 'react'
import { Plus } from 'lucide-react'

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [due, setDue] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    const payload = {
      title: title.trim(),
      notes: notes.trim() || undefined,
      due_at: due ? new Date(due).toISOString() : undefined,
    }
    if (!payload.title) return
    await onAdd(payload)
    setTitle('')
    setNotes('')
    setDue('')
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-6 gap-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="md:col-span-2 px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes (optional)"
        className="md:col-span-2 px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="datetime-local"
        value={due}
        onChange={(e) => setDue(e.target.value)}
        className="md:col-span-1 px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="md:col-span-1 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        <Plus className="w-4 h-4" /> Add
      </button>
    </form>
  )
}
