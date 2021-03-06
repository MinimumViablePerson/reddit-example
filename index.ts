import express from 'express'
import cors from 'cors'
import Database from 'better-sqlite3'

const app = express()
app.use(cors())
app.use(express.json())

const db = new Database('./data.db', {
  verbose: console.log
})

const createUser = db.prepare(`
INSERT INTO users (name, email, password, displayName) VALUES (?, ?, ?, ?);
`)

const getUserById = db.prepare(`
SELECT * FROM users WHERE id=?;
`)

// app.get('/users')
// app.get('/posts')
// app.post('/posts')
// app.delete('/posts/:id')
// app.get('/subreddits')

app.post('/sign-in', (req, res) => {
  // to sign in, the user needs to send us their email and passowrd
  const { email, password } = req.body
  // check if the email exists
  // check if the password matches
  // give them back the user if they match
  // give them back an error if they don't
  res.send({ error: 'Poop' })
})

app.post('/users', (req, res) => {
  const { name, email, password, displayName } = req.body
  const info = createUser.run(name, email, password, displayName)
  const user = getUserById.get(info.lastInsertRowid)
  res.send(user)
})

app.listen(4000, () => {
  console.log(`Running on: http://localhost:4000`)
})
