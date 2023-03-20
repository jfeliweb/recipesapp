import { useEffect, useState } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'

export const SavedRecipes = () => {
	const [savedRecipes, setSavedRecipes] = useState([])

	const userID = useGetUserID()

	useEffect(() => {
		const fetchSavedRecipe = async () => {
			try {
				const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`)
				setSavedRecipes(response.data.savedRecipes)
			} catch (error) {
				console.log(error)
			}
		}

		fetchSavedRecipe()
	}, [])

	return (
		<div>
			<h2>Saved Recipes</h2>
			<ul>
				{savedRecipes.map(recipe => {
					return (
						<li key={recipe._id}>
							<img src={recipe.imageUrl} alt={recipe.name} />
							<div>
								<h3>{recipe.name}</h3>
							</div>
							<div>
								<p>{recipe.description}</p>
							</div>
							<div className='instructions'>
								<p>{recipe.instructions}</p>
							</div>
							<p>{recipe.ingredients}</p>
							<p>Prep Time: {recipe.prepTime} (minutes)</p>
							<p>Cooking Time: {recipe.cookingTime} (minutes)</p>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
