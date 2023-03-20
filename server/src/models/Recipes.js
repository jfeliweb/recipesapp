import mongoose from 'mongoose'

// Create a schema for the recipe
const RecipeSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: false },
	ingredients: [{ type: String, required: true }],
	instructions: { type: String, required: true },
	imageUrl: { type: String, required: true },
	prepTime: { type: Number, required: true },
	cookingTime: { type: Number, required: true },
	userOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
})

// Create a model for the recipe
const RecipeModel = mongoose.model('recipes', RecipeSchema)

// Export the model

export { RecipeModel }
