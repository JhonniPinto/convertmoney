const express = require('express')
const path    = require('path')
const app     = express()
const routes  = require('./routes/index')

app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', routes)

const port = process.env.PORT || 3000
app.listen(port, (err) => err ? console.log('ERRO:', err) : console.log(`Converts is running on port ${port}`))