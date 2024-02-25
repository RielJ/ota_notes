import { dbConfig } from '@/config'
import { open } from 'sqlite'
import { cached } from 'sqlite3'

export const openDB = async () => {
  const db = await open({
    filename: dbConfig.filename,
    driver: cached.Database,
  })

  return db
}

export const initDB = async () => {
  const db = await openDB()
  await db.exec(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      body TEXT
    )
  `)
  return db
}
