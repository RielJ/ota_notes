export const validateTitle = (title: string) => {
  if (!title) {
    throw new Error('Title is required')
  }
  if (title.length > 100) {
    throw new Error('Title is too long')
  }
}

export const validateBody = (body: string) => {
  if (!body) {
    throw new Error('Body is required')
  }
  if (body.length > 1000) {
    throw new Error('Body is too long')
  }
}

export const validateID = (id: string) => {
  if (isNaN(Number(id)) || Number(id) < 0 || id === '') {
    throw new Error('Invalid ID')
  }
}
