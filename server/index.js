const fs = require('fs')
const path = require('path')
const consola = require('consola')

const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const bodyParser = require('body-parser')

const filePath = '../store/data/initial_data.json'
const initialData = require(filePath)

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
// const { resolveSoa } = require('dns')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const host = 'localhost'
  const port = 3000

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(bodyParser.json())

  app.get('/api/posts', function (req, res) {
    return res.json('OK')
  })

  app.post('/api/posts', function (req, res) {
    const post = req.body
    initialData.posts.push(post)
    fs.writeFile(
      path.join(__dirname, filePath),
      JSON.stringify(initialData, null, 2),
      function (err) {
        if (err) {
          return res.status(422).send(err)
        }
        return res.json('OK')
      }
    )
  })

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  })
}
start()
