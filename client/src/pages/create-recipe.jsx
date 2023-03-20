import React, { useState } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

export const CreateRecipe = () => {
	const userID = useGetUserID()
	const [cookies, _] = useCookies(['access_token'])

	const [recipe, setRecipe] = useState({
		name: '',
		description: '',
		ingredients: [],
		instructions: '',
		imageUrl: '',
		prepTime: 0,
		cookingTime: 0,
		userOwner: userID,
	})

	const navigate = useNavigate()

	const handleChange = e => {
		const { name, value } = e.target
		setRecipe({ ...recipe, [name]: value })
	}

	const handleIngredientChange = (e, index) => {
		const { value } = e.target
		const ingredients = recipe.ingredients
		ingredients[index] = value
		setRecipe({ ...recipe, ingredients })
	}

	const addIngredient = e => {
		e.preventDefault()
		setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] })
	}

	const onSubmit = async e => {
		e.preventDefault()
		try {
			await axios.post('https://recipesapp-ywao.onrender.com/recipes', recipe, {
				headers: { authorization: cookies.access_token },
			})
			alert('Recipe created!')
			navigate('/')
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className='create-recipe'>
			<h2>Create Recipe</h2>
			<form onSubmit={onSubmit}>
				<label htmlFor='name'>Name</label>
				<input type='text' name='name' id='name' onChange={handleChange} />
				<label htmlFor='description'>Description</label>
				<textarea
					type='text'
					name='description'
					id='description'
					onChange={handleChange}></textarea>
				<label htmlFor='ingredients'>Ingredients</label>
				{recipe.ingredients.map((ingredient, index) => (
					<input
						type='text'
						name='ingredients'
						key={index}
						value={ingredient}
						onChange={e => handleIngredientChange(e, index)}
					/>
				))}
				<button type='button' onClick={addIngredient}>
					Add Ingredient
				</button>
				<label htmlFor='instructions'>Instructions</label>
				<textarea
					type='text'
					name='instructions'
					id='instructions'
					onChange={handleChange}></textarea>
				<label htmlFor='imageUrl'>Image URL</label>
				<input type='text' name='imageUrl' id='imageUrl' onChange={handleChange} />
				<label htmlFor='prepTime'>Prep Time</label>
				<input type='number' name='prepTime' id='prepTime' onChange={handleChange} />
				<label htmlFor='cookingTime'>Cooking Time</label>
				<input type='number' name='cookingTime' id='cookingTime' onChange={handleChange} />
				<button type='submit'>Create Recipe</button>
			</form>
		</div>
	)
}
