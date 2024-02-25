import express from 'express'
import dotenv from 'dotenv'
import { notesRoute } from '@/routes'
import { initDB } from '@/services/db.service'

dotenv.config()

const app = express()

initDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/notes', notesRoute)

export { app }
