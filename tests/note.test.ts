import supertest from 'supertest'
import { app } from '../src/app'

describe('Test the root path', () => {
  let id: number
  // Test GET /notes path
  test('It should response the GET method', async () => {
    const response = await supertest(app).get('/notes')
    expect(response.statusCode).toBe(200)
  })

  // Test POST /notes path and save the id
  test('It should response the POST method', async () => {
    const response = await supertest(app).post('/notes').send({
      title: 'Test Title',
      body: 'Test Body',
    })
    id = Number(response.body.id)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      id: response.body.id,
      title: 'Test Title',
      body: 'Test Body',
    })
  })

  // Test GET /notes path shouldn't be empty
  test("It should response the GET method and notes shouldn't be empty", async () => {
    const response = await supertest(app).get('/notes')
    expect(response.statusCode).toBe(200)
    expect(response.body).not.toEqual([])
  })

  // Test GET /notes/:id path
  test('Test GET /notes/:id of the recently created note', async () => {
    const response = await supertest(app).get(`/notes/${id}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      id: id,
      title: 'Test Title',
      body: 'Test Body',
    })
  })

  // Test PUT /notes/:id path
  test('Test Update Note', async () => {
    const response = await supertest(app).put(`/notes/${id}`).send({
      title: 'Updated Title',
      body: 'Updated Body',
    })
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      id: id,
      title: 'Updated Title',
      body: 'Updated Body',
    })
  })

  // Test GET /notes/:id path after being updated
  test('Note should now be updated', async () => {
    const response = await supertest(app).get(`/notes/${id}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      id: id,
      title: 'Updated Title',
      body: 'Updated Body',
    })
  })

  // Test DELETE /notes/:id path
  test('Note should now be deleted', async () => {
    const response = await supertest(app).delete(`/notes/${id}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      message: `Note with id ${id} deleted`,
    })
  })

  // Test GET /notes/:id path after being deleted
  test('Note should not be found', async () => {
    const response = await supertest(app).get(`/notes/${id}`)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({ error: 'Note not found' })
  })
})
