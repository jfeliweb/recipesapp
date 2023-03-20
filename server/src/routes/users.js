import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/User.js'

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
	const authHeader = req.headers.authorization
	if (authHeader) {
		jwt.verify(authHeader, `${process.env.JWT_SECRET}`, err => {
			if (err) {
				return res.sendStatus(403)
			}
			next()
		})
	} else {
		res.sendStatus(401)
	}
}
