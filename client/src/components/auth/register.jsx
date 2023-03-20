import React, { useState } from 'react'
import axios from 'axios'

import { Form } from '../form/'

export const Register = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const onSubmit = async event => {
		event.preventDefault()
		try {
			await axios.post('https://recipesapp-ywao.onrender.com/auth/register', { username, password })
			alert('Successfully registered! Now you can login.')
		} catch (error) {
			console.error(error)
			alert('Error registering. Please try again.')
		}
	}
	return (
		<Form
			label='Register'
			username={username}
			setUsername={setUsername}
			password={password}
			setPassword={setPassword}
			onSubmit={onSubmit}
		/>
	)
}
