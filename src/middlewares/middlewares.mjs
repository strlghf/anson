export function loggingMiddleware (req, res, next) {
  console.log(`${req.method} - ${req.url}`)
  next()
}

export function resolveIndexByUserId (req, res, next) {
  const { params: { id } } = req

  const parsedId = +id
  if (isNaN(parsedId)) return res.sendStatus(400)

  const findUserIndex = users.findIndex(user => user.id === parsedId)
  if (findUserIndex === -1) return res.sendStatus(404)

  req.findUserIndex = findUserIndex
  next()
}