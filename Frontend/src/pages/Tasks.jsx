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
    <div className="min-h-screen bg-neutral-950">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-neutral-50">Your Tasks</h1>
            <p className="text-neutral-300">Add, view, and delete your tasks.</p>
          </div>
          <button
            onClick={onLogout}
            className="text-sm text-red-400 hover:text-red-300 font-semibold"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleAdd} className="mb-6 flex gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
            placeholder="Add a new task"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-amber-500 px-4 py-2 text-neutral-950 font-semibold hover:bg-amber-400 transition-colors disabled:opacity-70"
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
        </form>

        {error ? (
          <div className="mb-4 rounded border border-red-400/30 bg-red-950/60 px-3 py-2 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <div className="bg-neutral-900/70 backdrop-blur border border-neutral-800 shadow-sm rounded-lg divide-y divide-neutral-800">
          {tasks.length === 0 ? (
            <div className="p-4 text-neutral-300">No tasks yet. Add your first task.</div>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="flex items-center justify-between px-4 py-3 hover:bg-neutral-800/70"
              >
                <span className="text-neutral-100">{task.title}</span>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-sm text-red-400 hover:text-red-300"
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

