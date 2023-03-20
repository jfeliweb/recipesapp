import { useEffect, useState } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'
import { useCookies } from 'react-cookie'

export const Home = () => {
	const [recipes, setRecipes] = useState([])
	const [savedRecipes, setSavedRecipes] = useState([])

	// const [cookies, _] = useCookies(['access_token'])
	const [cookies, setCookies] = useCookies(['access_token'])

	const userID = useGetUserID()

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const response = await axios.get('https://recipesapp-ywao.onrender.com/recipes')
				setRecipes(response.data)
			} catch (error) {
				console.log(error)
			}
		}

		const fetchSavedRecipe = async () => {
			try {
				const response = await axios.get(
					`https://recipesapp-ywao.onrender.com/recipes/savedRecipes/ids/${userID}`,
				)
				setSavedRecipes(response.data.savedRecipes)
			} catch (error) {
				console.log(error)
			}
		}

		fetchRecipes()
		if (cookies.access_token) {
			fetchSavedRecipe()
		}
	}, [])

	const saveRecipe = async recipeID => {
		try {
			const response = await axios.put(
				'https://recipesapp-ywao.onrender.com/recipes',
				{ recipeID, userID },
				{ headers: { authorization: cookies.access_token } },
			)
			setSavedRecipes(response.data.savedRecipes)
		} catch (error) {
			console.log(error)
		}
	}

	const isRecipeSaved = id => savedRecipes.includes(id)

	return (
		<div>
			<h2>Home</h2>
			<ul>
				{recipes.map(recipe => {
					return (
						<li key={recipe._id}>
							<div>
								<h3>{recipe.name}</h3>
								<button onClick={() => saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>
									{isRecipeSaved(recipe._id) ? 'Saved' : 'Save'}
								</button>
							</div>
							<img src={recipe.imageUrl} alt={recipe.name} />
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
