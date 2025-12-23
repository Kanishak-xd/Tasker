import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

function PlaceholderTasks() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Tasks coming soon</h1>
        <p className="text-gray-600 mb-4">We will add task management in the next phase.</p>
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
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold text-gray-800">
            Tasker
          </Link>
          <nav className="space-x-4 text-sm font-medium">
            <Link className="text-blue-600 hover:underline" to="/login">
              Login
            </Link>
            <Link className="text-blue-600 hover:underline" to="/register">
              Register
            </Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<PlaceholderTasks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<PlaceholderTasks />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
