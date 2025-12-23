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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Tasker</h1>
        <p className="text-gray-600 mb-4">Manage your tasks securely.</p>
        <div className="space-x-2">
          <Link className="text-blue-600 hover:underline" to="/login">
            Login
          </Link>
          <span className="text-gray-400">•</span>
          <Link className="text-blue-600 hover:underline" to="/register">
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold text-gray-800">
            Tasker
          </Link>
          <nav className="space-x-4 text-sm font-medium">
            {token ? (
              <>
                <Link className="text-blue-600 hover:underline" to="/tasks">
                  Tasks
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:underline font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="text-blue-600 hover:underline" to="/login">
                  Login
                </Link>
                <Link className="text-blue-600 hover:underline" to="/register">
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
