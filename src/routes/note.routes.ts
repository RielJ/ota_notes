import { NoteController } from '@/controllers'
import { Router, Request, Response } from 'express'

// Note Routes
export const notesRoute = Router()

// GET /notes
notesRoute.get('/', async (req: Request, res: Response) => {
  try {
    const notes = await NoteController.getAll()
    res.json(notes)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message })
    } else {
      return res.status(500).json({ error: 'An unknown error occurred' })
    }
  }
})

// GET /notes/:id
notesRoute.get('/:id', async (req: Request, res: Response) => {
  try {
    const note = await NoteController.getById(req.params.id)
    res.json(note)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message })
    } else {
      return res.status(500).json({ error: 'An unknown error occurred' })
    }
  }
})

// POST /notes
notesRoute.post('/', async (req: Request, res: Response) => {
  try {
    const note = await NoteController.create(req.body.title, req.body.body)
    res.json(note)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message })
    } else {
      return res.status(500).json({ error: 'An unknown error occurred' })
    }
  }
})

// PUT /notes/:id
notesRoute.put('/:id', async (req: Request, res: Response) => {
  try {
    const note = await NoteController.update(
      req.params.id,
      req.body.title,
      req.body.body
    )
    res.json(note)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message })
    } else {
      return res.status(500).json({ error: 'An unknown error occurred' })
    }
  }
})

// DELETE /notes/:id
notesRoute.delete('/:id', async (req: Request, res: Response) => {
  try {
    await NoteController.delete(req.params.id)
    res.json({ message: `Note with id ${req.params.id} deleted` })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message })
    } else {
      return res.status(500).json({ error: 'An unknown error occurred' })
    }
  }
})
