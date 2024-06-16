// Requiring Modules
const express = require('express')
const noteRouter = require('./Routes/notesRoute')
const DBConnection = require('./DBConnection')
const cors = require('cors')

// Server App
const app = express();

// Enviorment
require('dotenv').config()
const PORT = process.env.PORT

// Middleware to Excess JSON Data
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

// Database connection
DBConnection()

// Routing Middleware
app.use('/api/notes', noteRouter)

// Home Route
app.get('/',(req,res)=>{
    res.json({message:"Express Server Reply"})
})

// Serve the Application
app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`)
})