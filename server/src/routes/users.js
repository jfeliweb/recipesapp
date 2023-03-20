import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/user.js'

const router = express.Router()
// Register a new user
router.post('/register', async (req, res) => {
	const { username, password } = req.body
	const user = await UserModel.findOne({ username })

	if (user) {
		return res.status(400).json({ message: 'User already exists!' })
	}

	const hashedPassword = await bcrypt.hash(password, 10)
	const newUser = new UserModel({ username, password: hashedPassword })
	await newUser.save()

	res.json({ message: 'User created!' })
})

// Login a user
router.post('/login', async (req, res) => {
	const { username, password } = req.body
	const user = await UserModel.findOne({ username })

	if (!user) {
		return res.status(400).json({ message: 'User does not exist!' })
	}

	const isPasswordCorrect = await bcrypt.compare(password, user.password)

	if (!isPasswordCorrect) {
		return res.status(400).json({ message: 'Username or Passwoard is not correct' })
	}

	const token = jwt.sign({ id: user._id }, `${process.env.JWT_SECRET}`, {})
	res.json({ token, userID: user._id })
})

export { router as usersRouter }

// Middleware
export const verifyToken = (req, res, next) => {
	const token = req.headers.authorization
	if (token) {
		jwt.verify(token, `${process.env.JWT_SECRET}`, error => {
			if (error) {
				return res.status(403).json({ message: 'Invalid token' })
				next()
			}
		})
	} else {
		return res.status(401).json({ message: 'No token provided' })
	}
}
