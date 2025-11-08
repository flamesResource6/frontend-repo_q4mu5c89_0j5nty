import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(false)

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/tasks`)
      const data = await res.json()
      setTasks(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addTask = async (payload) => {
    const res = await fetch(`${API_BASE}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const created = await res.json()
    setTasks((prev) => [created, ...prev])
  }

  const toggleTask = async (id) => {
    const res = await fetch(`${API_BASE}/api/tasks/${id}/toggle`, { method: 'PATCH' })
    const updated = await res.json()
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
  }

  const deleteTask = async (id) => {
    await fetch(`${API_BASE}/api/tasks/${id}`, { method: 'DELETE' })
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const remaining = useMemo(() => tasks.filter((t) => !t.completed).length, [tasks])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50">
      <div className="max-w-3xl mx-auto px-4">
        <Header remaining={remaining} total={tasks.length} />

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <TaskForm onAdd={addTask} />

          <div className="flex items-center justify-between mt-6 mb-3">
            <div className="text-sm text-gray-600">
              {loading ? 'Loading tasks...' : `Showing ${tasks.length} tasks`}
            </div>
            <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden">
              {['all', 'active', 'completed'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 text-sm ${
                    filter === f ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'
                  }`}
                >
                  {f[0].toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} filter={filter} />
        </div>
      </div>
    </div>
  )
}
