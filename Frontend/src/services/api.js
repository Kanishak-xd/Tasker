const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function authHeaders(token) {
  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {}
}

async function handleResponse(res) {
  const payload = await res.json().catch(() => ({}))
  if (!res.ok) {
    const message = payload?.error || 'Something went wrong'
    throw new Error(message)
  }
  return payload
}

export async function postJSON(path, data, token) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(token),
    },
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

export async function getJSON(path, token) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      ...authHeaders(token),
    },
  })
  return handleResponse(res)
}

export async function deleteJSON(path, token) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'DELETE',
    headers: {
      ...authHeaders(token),
    },
  })
  return handleResponse(res)
}

