import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'

import { usersRouter } from './routes/users.js'
import { recipesRouter } from './routes/recipes.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth', usersRouter)
app.use('/recipes', recipesRouter)

mongoose.connect(
	'mongodb+srv://jfelisme:GGu2jq40Ur7PlhEO@recipes.xyl6ydf.mongodb.net/recipes?retryWrites=true&w=majority',
	{
		// useNewUrlParser: true,
		// useUnifiedTopology: true,
		// useCreateIndex: true,
		// useFindAndModify: false,
	},
)

app.listen(3001, () => console.log('Server is running on port 3001'))
