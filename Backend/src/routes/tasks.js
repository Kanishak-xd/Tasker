import express from 'express'
import Task from '../models/Task.js'

const router = express.Router()

// POST /tasks - create task for logged-in user
router.post('/', async (req, res) => {
  try {
    const { title } = req.body
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Task title is required' })
    }

    const task = await Task.create({
      title: title.trim(),
      user: req.userId,
    })

    res.status(201).json(task)
  } catch (error) {
    console.error('Create task error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET /tasks - fetch tasks for logged-in user
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 })
    res.json(tasks)
  } catch (error) {
    console.error('Fetch tasks error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// DELETE /tasks/:id - delete a task that belongs to the user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Task.findOneAndDelete({ _id: id, user: req.userId })

    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' })
    }

    res.json({ message: 'Task deleted' })
  } catch (error) {
    console.error('Delete task error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router

