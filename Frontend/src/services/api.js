const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function postJSON(path, data) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const payload = await res.json().catch(() => ({}))
  if (!res.ok) {
    const message = payload?.error || 'Something went wrong'
    throw new Error(message)
  }
  return payload
}

