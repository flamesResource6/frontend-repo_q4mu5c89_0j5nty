import { useCallback, useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import FilterBar from './components/FilterBar'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchTasks = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/api/tasks`)
      if (!res.ok) throw new Error('Failed to load')
      const data = await res.json()
      setTasks(data)
    } catch (e) {
      setError('Could not load tasks')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const addTask = async (payload) => {
    try {
      const res = await fetch(`${API_BASE}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Create failed')
      const created = await res.json()
      setTasks((prev) => [created, ...prev])
    } catch (e) {
      setError('Could not add task')
    }
  }

  const toggleTask = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/tasks/${id}/toggle`, { method: 'PATCH' })
      if (!res.ok) throw new Error('Toggle failed')
      const updated = await res.json()
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
    } catch (e) {
      setError('Could not update task')
    }
  }

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/tasks/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      setTasks((prev) => prev.filter((t) => t.id !== id))
    } catch (e) {
      setError('Could not delete task')
    }
  }

  const remaining = useMemo(() => tasks.filter((t) => !t.completed).length, [tasks])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50">
      <div className="max-w-3xl mx-auto px-4">
        <Header remaining={remaining} total={tasks.length} />

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <TaskForm onAdd={addTask} />

          <FilterBar
            filter={filter}
            setFilter={setFilter}
            total={tasks.length}
            loading={loading}
            error={error}
            onRefresh={fetchTasks}
          />

          <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} filter={filter} />
        </div>
      </div>
    </div>
  )
}
