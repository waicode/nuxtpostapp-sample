const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const filePath = '../../store/data/initial_data.json'
const initialData = require(filePath)

const responseError = (res, err) => {
  return res.status(422).send(err)
}

const writeFile = (res, data) => {
  fs.writeFile(
    path.join(__dirname, filePath),
    JSON.stringify(data, null, 2),
    function (err) {
      if (err) {
        return responseError(res, err)
      }
      return res.json('File successfully updated')
    }
  )
}

app.use(bodyParser.json())

app.get('/posts', function (req, res) {
  return res.json(initialData.posts)
})

app.post('/posts', function (req, res) {
  const post = req.body
  initialData.posts.push(post)
  return writeFile(res, initialData)
})

app.patch('/posts/:id', function (req, res) {
  const post = req.body
  const index = initialData.posts.findIndex((p) => p._id === post._id)
  initialData.posts[index] = post

  if (index !== -1) {
    return writeFile(res, initialData)
  } else {
    return responseError(res, { error: 'Post cannot be updated!' })
  }
})

app.delete('/posts/:id', function (req, res) {
  const id = req.params.id
  const index = initialData.posts.findIndex((p) => p._id === id)

  if (index !== -1) {
    initialData.posts.splice(index, 1)
    return writeFile(res, initialData)
  } else {
    return responseError(res, { error: 'Post cannot be deleted!' })
  }
})

module.exports = {
  path: '/api',
  handler: app,
}
