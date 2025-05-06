import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

// Função para verificar o token e extrair o ID do usuário
const getUserFromToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    return decoded.userId
  } catch (err) {
    throw new Error('Invalid token')
  }
}

// Controlador para criar uma nova tarefa
export const createTask = async (req: Request, res: Response) => {
  const { title, description } = req.body
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  try {
    const userId = getUserFromToken(token)

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId
      }
    })

    res.status(201).json(task)
  } catch (err) {
    res.status(400).json({ error: 'Error creating task' })
  }
}

// Controlador para buscar todas as tarefas do usuário logado
export const getAllTasks = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  try {
    const userId = getUserFromToken(token)

    // Buscar todas as tarefas associadas ao usuário logado
    const tasks = await prisma.task.findMany({
      where: {
        userId
      }
    })

    res.json(tasks)
  } catch (err) {
    res.status(500).json({ error: 'Error fetching tasks' })
  }
}

// Controlador para buscar uma tarefa específica pelo ID
export const getTaskById = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  try {
    const userId = getUserFromToken(token)
    const id = req.params.id

    const task = await prisma.task.findUnique({
      where: {
        id
      }
    })

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    if (task.userId !== userId) {
      return res.status(403).json({ error: 'You do not have permission to access this task' })
    }

    res.json(task)
  } catch (err) {
    res.status(500).json({ error: 'Error fetching task' })
  }
}

// Controlador para atualizar uma tarefa
export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, description, done } = req.body
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  try {
    const userId = getUserFromToken(token)

    const task = await prisma.task.findUnique({
      where: {
        id
      }
    })

    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }

    if (task.userId !== userId) {
      return res.status(403).json({ error: 'You do not have permission to update this task' })
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { title, description, done }
    })

    res.json(updatedTask)
  } catch (err) {
    res.status(500).json({ error: 'Error updating task' })
  }
}

// Controlador para deletar uma tarefa
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  try {
    const userId = getUserFromToken(token)

    const task = await prisma.task.findUnique({
      where: { id }
    })

    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }

    if (task.userId !== userId) {
      return res.status(403).json({ error: 'You do not have permission to delete this task' })
    }

    await prisma.task.delete({ where: { id } })
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ error: 'Error deleting task' })
  }
}
