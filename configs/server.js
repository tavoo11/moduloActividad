require('dotenv').config()
const express = require('express')

const cors = require('cors')



const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


//rutas

app.use('/activity', require('../routes/activity') )
app.use('/user',require('../routes/user'))
app.use('/category', require('../routes/category'))
app.use('/sub-category', require('../routes/subCategory'))




app.use((req, res) => res.json({info: `Unable to ${req.method} ${req.path}`}))

module.exports = app