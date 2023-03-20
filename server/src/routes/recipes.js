import express from 'express'
import mongoose from 'mongoose'
import { RecipeModel } from '../models/Recipes.js'
import { UserModel } from '../models/User.js'
import { verifyToken } from './users.js'

const router = express.Router()
// List all recipes
router.get('/', async (req, res) => {
	try {
		const response = await RecipeModel.find({})
		res.json(response)
	} catch (error) {
		res.json(error)
	}
})
// Create a new recipe
router.post('/', verifyToken, async (req, res) => {
	const recipe = new RecipeModel({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		description: req.body.description,
		ingredients: req.body.ingredients,
		instructions: req.body.instructions,
		imageUrl: req.body.imageUrl,
		prepTime: req.body.prepTime,
		cookingTime: req.body.cookingTime,
		userOwner: req.body.userOwner,
	})
	try {
		const response = await recipe.save()
		res.json(response)
	} catch (error) {
		res.json(error)
	}
})

// Save a Recipe
router.put('/', async (req, res) => {
	const recipe = await RecipeModel.findById(req.body.recipeID)
	const user = await UserModel.findById(req.body.userID)
	try {
		user.savedRecipes.push(recipe)
		await user.save()
		res.status(201).json({ savedRecipes: user.savedRecipes })
	} catch (err) {
		res.status(500).json(err)
	}
})

// Get id of saved recipes
router.get('/savedRecipes/ids/:userId', async (req, res) => {
	try {
		const user = await UserModel.findById(req.params.userId)
		res.status(201).json({ savedRecipes: user?.savedRecipes })
	} catch (err) {
		console.log(err)
		res.status(500).json(err)
	}
})

// Get saved recipes
router.get('/savedRecipes/:userId', async (req, res) => {
	try {
		const user = await UserModel.findById(req.params.userId)
		const savedRecipes = await RecipeModel.find({
			_id: { $in: user.savedRecipes },
		})

		console.log(savedRecipes)
		res.status(201).json({ savedRecipes })
	} catch (err) {
		console.log(err)
		res.status(500).json(err)
	}
})

export { router as recipesRouter }
