import { Note } from '@/models'
import { validateBody, validateID, validateTitle } from '@/utils'

export const NoteController = {
  getAll: async () => {
    return await Note.getNotes()
  },
  getById: async (id: string) => {
    validateID(id)
    return await Note.getNoteById(id)
  },
  create: async (title: string, body: string) => {
    validateTitle(title)
    validateBody(body)
    const note = await Note.createNote({
      title,
      body,
    })
    return note
  },
  update: async (id: string, title: string, body: string) => {
    validateID(id)
    validateTitle(title)
    validateBody(body)
    const note = await Note.updateNote({
      id: Number(id),
      title,
      body,
    })
    return note
  },
  delete: async (id: string) => {
    validateID(id)
    await Note.deleteNote({
      id,
    })
  },
}
