import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDb from './config/mongodb.js'


// API config

const PORT = process.env.PORT || 4000
const app = express()


// Initilize Middleware
app.use(express.json())
app.use(cors())
await connectDb()

// API routes
app.get('/',(req,res) => res.send("API Working for Clear Bg"))

app.listen(PORT,()=>console.log("Server Running on port " + PORT))