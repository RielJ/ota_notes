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

  // Test GET /notes/:id invalid ID
  test('Test GET /notes/:id invalid ID', async () => {
    const response = await supertest(app).get(`/notes/asdasd`)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({ error: 'Invalid ID' })
  })

  // Test POST /notes invalid body
  test('Test POST /notes invalid body', async () => {
    const response = await supertest(app).post('/notes').send({
      title: 'Test Title',
    })
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({ error: 'Body is required' })
  })

  // Test POST /notes title exceeds 100 characters
  test('Test POST /notes title exceeds 100 characters', async () => {
    const response = await supertest(app)
      .post('/notes')
      .send({
        title: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac
        condimentum libero. In hac habitasse platea dictumst. Phasellus
        fermentum, nunc in fermentum fermentum, purus libero fermentum
        sapien, eget fermentum libero libero fermentum libero fermentum
        fermentum fermentum fermentum fermentum fermentum fermentum
        fermentum fermentum fermentum fermentum fermentum fermentum
        fermentum fermentum fermentum fermentum fermentum fermentum
        fermentum fermentum fermentum fermentum fermentum fermentum
        `,
        body: 'Test Body',
      })

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({ error: 'Title is too long' })
  })
})
