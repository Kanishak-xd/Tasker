import { useEffect, useState } from 'react'
import { getJSON, postJSON, deleteJSON } from '../services/api.js'

export default function Tasks({ token, onLogout }) {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setError('')
        const data = await getJSON('/tasks', token)
        setTasks(data)
      } catch (err) {
        setError(err.message)
      }
    }
    fetchTasks()
  }, [token])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    setLoading(true)
    setError('')
    try {
      const newTask = await postJSON('/tasks', { title }, token)
      setTasks((prev) => [newTask, ...prev])
      setTitle('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    setLoading(true)
    setError('')
    try {
      await deleteJSON(`/tasks/${id}`, token)
      setTasks((prev) => prev.filter((t) => t._id !== id))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Your Tasks</h1>
            <p className="text-gray-600">Add, view, and delete your tasks.</p>
          </div>
          <button
            onClick={onLogout}
            className="text-sm text-red-600 hover:underline font-semibold"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleAdd} className="mb-6 flex gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Add a new task"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-70"
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
        </form>

        {error ? (
          <div className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
          {tasks.length === 0 ? (
            <div className="p-4 text-gray-600">No tasks yet. Add your first task.</div>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
              >
                <span className="text-gray-800">{task.title}</span>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-sm text-red-600 hover:underline"
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

