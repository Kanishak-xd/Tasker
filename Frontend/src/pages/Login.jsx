import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { postJSON } from '../services/api.js'

export default function Login({ onAuth = () => {} }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await postJSON('/login', { email, password })
      localStorage.setItem('token', data.token)
      onAuth(data.token)
      navigate('/tasks')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-neutral-900/80 backdrop-blur border border-neutral-800 shadow-xl rounded-lg p-6">
        <h1 className="text-2xl font-bold text-neutral-50 mb-2">Welcome back</h1>
        <p className="text-sm text-neutral-300 mb-4">
          Log in with your email and password to access your tasks.
        </p>

        {error ? (
          <div className="mb-4 rounded border border-red-400/30 bg-red-950/60 px-3 py-2 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-neutral-200 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-200 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
              placeholder="Your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-amber-500 px-4 py-2 text-neutral-950 font-semibold hover:bg-amber-400 transition-colors disabled:opacity-70"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-neutral-300 mt-4">
          Need an account?{' '}
          <Link className="text-amber-400 hover:text-amber-300" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

