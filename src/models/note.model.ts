// Note Model Sqlite3

import { openDB } from '@/services/db.service'
import { NoteType } from '@/types'

type ICreateNote = {
  title: string
  body: string
}

type IUpdateNote = {
  id: string
  title: string
  body: string
}

type IDeleteNote = {
  id: string
}

export const Note = {
  async getNotes(): Promise<NoteType[]> {
    try {
      const db = await openDB()
      const notes = await db.all('SELECT * FROM notes')
      return notes
    } catch (error) {
      throw new Error('Failed to get notes')
    }
  },
  async getNoteById(id: string): Promise<NoteType> {
    try {
      const db = await openDB()
      const note = await db.get('SELECT * FROM notes WHERE id = ?', id)
      if (!note) {
        throw new Error('Note not found')
      }
      return note
    } catch (error) {
      throw new Error('Note not found')
    }
  },
  async createNote({ title, body }: ICreateNote): Promise<NoteType> {
    try {
      const db = await openDB()
      const result = await db.run(
        'INSERT INTO notes (title, body) VALUES (?, ?)',
        title,
        body
      )
      return {
        id: result.lastID?.toString() || '0',
        title,
        body,
      }
    } catch (error) {
      throw new Error('Failed to create note')
    }
  },
  async updateNote({ id, title, body }: IUpdateNote): Promise<NoteType> {
    try {
      const db = await openDB()
      await db.run(
        'UPDATE notes SET title = ?, body = ? WHERE id = ?',
        title,
        body,
        id
      )
      return {
        id,
        title,
        body,
      }
    } catch (error) {
      throw new Error('Failed to update note')
    }
  },
  async deleteNote({ id }: IDeleteNote): Promise<string> {
    try {
      const db = await openDB()
      await db.run('DELETE FROM notes WHERE id = ?', id)
      return id
    } catch (error) {
      throw new Error('Failed to delete note')
    }
  },
}
