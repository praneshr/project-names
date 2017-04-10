import express from 'express'
import generator from './generator'

const app = express()
const port = process.env.PORT || 3030

app.get('/names', (req, res) => {
  const { words, numbered, separator } = req.query
  const name = generator.constructNames(words, numbered === 'false' ? false : true).joinNames(separator)
  res.send(name)
})
app.get('/names/raw', (req, res) => {
  const { words, numbered, separator } = req.query
  const name = generator.constructNames(words, numbered === 'false' ? false : true).rawNames()
  res.json(name)
})

app.get('/names/list', (req, res) => {
  const { limit, ...options } = req.query
  options.numbered = options.numbered === 'false' ? false : true
  const name = generator.nameList(limit, options)
  res.json(name)
})

app.get('/names/list/raw', (req, res) => {
  const { limit, ...options } = req.query
  options.numbered = options.numbered === 'false' ? false : true
  const name = generator.nameListRaw(limit, options)
  res.json(name)
})

app.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Not Found',
  })
})

app.listen(port, () => {
  console.log('App running in ' + port)
})

export {
  app,
}