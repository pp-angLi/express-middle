const router = require('./route/use')

const express = require('express', ' 4.17.1')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const port = 3000

// app.use()
// app.json()

// const jsonParser = bodyParser.json()
// app.use(jsonParser)
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001/');
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials: true");
  // res.header("Content-Type", "application/json;charset=utf-8");
  next()
})

app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use('/', router)

app.listen(port, () => console.log(`Example app listening on port ${port}`))