import { useEffect, useState } from 'react'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Tasks from './pages/Tasks.jsx'

function ProtectedRoute({ token, children }) {
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      <div className="bg-neutral-900/80 backdrop-blur shadow-lg border border-neutral-800 rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-neutral-50 mb-2">Welcome to Tasker</h1>
        <p className="text-neutral-300 mb-4">Manage your tasks securely.</p>
        <div className="space-x-3">
          <Link className="text-amber-400 hover:text-amber-300 font-semibold" to="/login">
            Login
          </Link>
          <span className="text-neutral-500">•</span>
          <Link className="text-amber-400 hover:text-amber-300 font-semibold" to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

function App() {
  const navigate = useNavigate()
  const [token, setToken] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('token')
    if (stored) {
      setToken(stored)
    }
  }, [])

  const handleAuth = (newToken) => {
    setToken(newToken)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken('')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="bg-neutral-950/80 backdrop-blur border-b border-neutral-900">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold text-white">
            Tasker
          </Link>
          <nav className="space-x-4 text-sm font-medium">
            {token ? (
              <>
                <Link className="text-amber-400 hover:text-amber-300" to="/tasks">
                  Tasks
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="text-amber-400 hover:text-amber-300" to="/login">
                  Login
                </Link>
                <Link className="text-amber-400 hover:text-amber-300" to="/register">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onAuth={handleAuth} />} />
        <Route path="/register" element={<Register onAuth={handleAuth} />} />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute token={token}>
              <Tasks token={token} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
