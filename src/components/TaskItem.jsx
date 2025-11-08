import { Check, Trash2 } from 'lucide-react'

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="group flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300">
      <button
        onClick={() => onToggle(task.id)}
        className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${
          task.completed ? 'bg-green-600 border-green-600 text-white' : 'border-gray-300'
        }`}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {task.completed && <Check className="w-4 h-4" />}
      </button>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>{task.title}</h3>
          <button
            onClick={() => onDelete(task.id)}
            className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 transition"
            aria-label="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        {task.notes && <p className="text-sm text-gray-600 mt-1">{task.notes}</p>}
        {task.due_at && (
          <p className="text-xs text-gray-500 mt-1">Due {new Date(task.due_at).toLocaleString()}</p>
        )}
      </div>
    </div>
  )
}
