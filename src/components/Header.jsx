import { CheckSquare } from 'lucide-react'

export default function Header({ remaining, total }) {
  return (
    <header className="flex items-center justify-between py-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
          <CheckSquare className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Your Tasks</h1>
      </div>
      <div className="text-sm text-gray-600">
        {remaining} remaining · {total} total
      </div>
    </header>
  )
}
