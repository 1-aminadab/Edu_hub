const express = require("express")
const app = express()
const connectDB = require('./db/connect')
require('dotenv').config()
const users = require('./routes/tasks')
const cookieParser = require("cookie-parser")
const cors = require("cors")
// ! middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(cors({credentials:true, origin:"http://localhost:3000"}))

// !routes
app.use('/api/v1',users)

//!port
const port = 5000

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log("server listening at port 5000...")
        })
    }catch(error){
        console.log(error);
    }

}
start()