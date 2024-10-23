import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDb from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'


// API config

const PORT = process.env.PORT || 4000
const app = express()


// Initilize Middleware
app.use(express.json())
app.use(cors())
await connectDb()

// API routes
app.get('/',(req,res) => res.send("API Working for Clear Bg"))
app.use("/api/user", userRouter)
app.listen(PORT,()=>console.log("Server Running on port " + PORT))