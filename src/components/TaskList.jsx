import TaskItem from './TaskItem'

export default function TaskList({ tasks, onToggle, onDelete, filter }) {
  const filtered = tasks.filter((t) => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  if (filtered.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">No tasks found.</div>
    )
  }

  return (
    <div className="space-y-3">
      {filtered.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />)
      )}
    </div>
  )
}
