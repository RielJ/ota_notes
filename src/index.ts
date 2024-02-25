// src/index.js
import express from 'express'
import dotenv from 'dotenv'
import { notesRoute } from '@/routes'
import { initDB } from './services/db.service'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

initDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/notes', notesRoute)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
