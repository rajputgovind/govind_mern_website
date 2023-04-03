const dotenv = require('dotenv')
const express = require('express')
const mongoose = require("mongoose")
const app = express()

const cookieParser = require("cookie-parser")
// const cors = require('cors')
app.use(cookieParser());
// app.use(cors())
dotenv.config({path:'./config.env'})

const PORT  = process.env.PORT || 5000
app.use(express.json())

app.use(require('./src/routers/UserRouter'))


app.listen(PORT, ()=>{
    console.log(`server is listnning on port ${PORT}`)
    require('./db/DbConfig')

})