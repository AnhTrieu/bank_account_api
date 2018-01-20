let express = require('express')
let app = express()
let morgan = require('morgan')
let bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000

app.disable('x-powered-by')
app.use(morgan('dev'))
app.use(bodyParser.json())

let routes = require('./src/routes/router')
app.use('/accounts', routes)

app.use((err, req, res, next) => {
  let status = err.status
  res.status(status).json({
    error: err
  })
})

app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    message: "Not Found!"
  })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})