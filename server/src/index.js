import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import { usersRouter } from './routes/users.js'
import { recipesRouter } from './routes/recipes.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth', usersRouter)
app.use('/recipes', recipesRouter)

// Connect to database
mongoose.connect(`${process.env.MONGODB_URL}`, { useNewUrlParser: true })

app.listen(3001, () => console.log('Server is running on port 3001'))
