const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Connecting database "ecap_database"

// import { Pool, Client } from 'pg'
//
// const pool = new Pool({
//   user: 'jasonnam',
//   host: 'localhost',
//   database: 'ecap_database',
//   password: 'jay0416hee',
//   port: 5432,
// })
//
// console.log(await pool.query('SELECT NOW()'))
//
// const client = new Client({
//   user: 'jasonnam',
//   host: 'localhost',
//   database: 'ecap_database',
//   password: 'jay0416hee',
//   port: 5432,
// })
//
// await client.connect()
//
// console.log(await client.query('SELECT NOW()'))
//
// await client.end()
